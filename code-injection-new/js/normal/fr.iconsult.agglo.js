



















// -*- coding: utf-8 -*-
var serveur_ajax = 'http://www.perpignanmediterranee.com/iphone/' ;
//~ var serveur_ajax = '' ;

var global_no_datas_alaune = false ;
var global_no_datas_circuits = false ;
var global_no_datas_depart_circuits = false ;
var global_no_datas_competences = false ;
var global_no_datas_economies = false ;
var global_no_datas_communes = false ;

var global_etat_connection = true ;

// Espaces de noms
Ext.ns('agglo2011', 'agglo2011.panel', 'agglo2011.liste', 'agglo2011.store', 'agglo2011.storage', 'agglo2011.template');

// Définition des données à mémoriser localement
agglo2011.storage.CURRENT_TAB = 'aggloCurrentTab';

// Modèles de données
Ext.regModel('ALaUne', {
    fields: ['id', 'image', 'titre', 'rubrique', 'ref']
});

Ext.regModel('Actualites', {
    fields: ['id', 'image', 'titre', 'stitre', 'description', 'date']
});

Ext.regModel('Competences', {
    fields: ['id', 'image', 'vignette', 'theme', 'titre', 'description']
});

Ext.regModel('Economie', {
    fields: ['id', 'image', 'vignette', 'titre', 'stitre', 'description']
});

Ext.regModel('Lignes', {
    fields: ['id', 'num', 'libelle', 'is_aller', 'plan', 'date_deb', 'date_fin', 'tad', 'couleur']
});
Ext.regModel('Periodes', {
    fields: ['num', 'libelle', 'page_aller', 'page_retour']
});
Ext.regModel('LignesScolaires', {
    fields: ['id', 'ligne', 'images', 'couleur']
});


Ext.regModel('Circuits', {
    fields: ['id', 'image', 'vignette', 'titre', 'stitre', 'description']
});

Ext.regModel('DepartsCircuits', {
    fields: ['circuit', 'lat', 'lon']
});

Ext.regModel('Communes', {
    fields: ['id', 'image', 'nom',  'description', 'contenu']
});

// Sources de données
agglo2011.store.ALaUne = new Ext.data.JsonStore({
	model: 'ALaUne',
	storeId: 'id',
	//~ sorters: 'id',
	proxy: {
        type: 'ajax',
        url : serveur_ajax+'datas/datas_alaune.php',
        reader:  new Ext.data.JsonReader({}),
		timeout: 2000,
		listeners: {
			exception:function () {
				global_no_datas_alaune = true;
			}
		}
    },
    autoLoad: true,
    listeners: {
		load : function (self, records) {
			//~ console.log('store ALaUne => load');
			// Nbre de vignettes dans un item du Caroussel
			var nbVignettes = 3;
			// Création des items du Caroussel
			for (var i=0; i < records.length; i+=nbVignettes)
			{
				var j=0;
				var s = '<div class="region-une">';
				do
				{
					var item = records[i+j].data;
					var id = item.rubrique + '_' + item.ref;
					s += '<div class="vignette-une" id="' + id + '" onclick="agglo2011.carousel1.showDetailUne(this);">';
					s += 	'<div class="region-vignette-une">';
					s += 		'<div class="vignette">';
					s += 			'<img src="images/' + item.image + '">';
					s += 		'</div>';
					s += 		'<span>' + item.titre + '</span>';
					s += 	'</div>';
					s += '</div>';
					j++;
				} while (j < nbVignettes);
				s += '</div>';
				var o = new Ext.Component({
					html: s,
					cls: 'a-la-une'
				});
				agglo2011.carousel1.items.add(id, o);
			}
			global_no_datas_alaune = false;
		}
    }
});

agglo2011.store.Actualites = new Ext.data.JsonStore({
	model: 'Actualites',
	storeId: 'id',
	//~ sorters: 'id',
	//~ data : actualites,
	proxy: {
        type: 'ajax',
        url : serveur_ajax+'datas/datas_actualites.php',
        reader: {
            type: 'json'
        }
    },
    autoLoad: true
});
	
agglo2011.store.Competences = new Ext.data.JsonStore({
	model: 'Competences',
	storeId: 'id',
	//~ sorters: 'theme',
	//~ data : competences,
	proxy: {
        type: 'ajax',
        url : serveur_ajax+'datas/datas_competences.php',
        reader:  new Ext.data.JsonReader({}),
		timeout: 2000,
		listeners: {
			exception:function () {
				//~ Ext.Msg.alert('Title', 'The quick brown fox jumped over the lazy dog.', Ext.emptyFn);
				global_no_datas_competences = true;
			}
		}
    },
    autoLoad: true,
	listeners: {
		load : function (self, records) {
			global_no_datas_competences = false;
		}
	}
});

agglo2011.store.Economie = new Ext.data.JsonStore({
	model: 'Economie',
	storeId: 'id',
	//~ sorters: 'titre',
	//~ data : economie,
	proxy: {
        type: 'ajax',
        url : serveur_ajax+'datas/datas_economies.php',
        reader:  new Ext.data.JsonReader({}),
		timeout: 2000,
		listeners: {
			exception:function () {
				global_no_datas_economies = true;
			}
		}
    },
    autoLoad: true,
	listeners: {
		load : function (self, records) {
			global_no_datas_economies = false;
		}
	}
});


agglo2011.store.Lignes = new Ext.data.JsonStore({
	model: 'Lignes',
	//~ storeId: 'id',
	//~ sorters: 'titre',
	//~ data : circuits,
	proxy: {
        type: 'ajax',
        url : serveur_ajax+'datas/datas_lignes.php',
        reader: {
            type: 'json'
        }
    },
    autoLoad: true
});
agglo2011.store.Periodes = new Ext.data.JsonStore({
	model: 'Periodes',
	//~ storeId: 'id',
	//~ sorters: 'titre',
	//~ data : circuits,
	proxy: {
        type: 'ajax',
        url : serveur_ajax+'datas/datas_periodes.php',
        reader: {
            type: 'json'
        }
    },
    autoLoad: true
});
agglo2011.store.LignesScolaires = new Ext.data.JsonStore({
	model: 'LignesScolaires',
	proxy: {
        type: 'ajax',
        url : serveur_ajax+'datas/datas_lignes_scolaires.php',
        reader: {
            type: 'json'
        }
    },
    autoLoad: true
});

agglo2011.store.Circuits = new Ext.data.JsonStore({
	model: 'Circuits',
	storeId: 'id',
	//~ sorters: 'titre',
	//~ data : circuits,
	proxy: {
        type: 'ajax',
        url : serveur_ajax+'datas/datas_circuits.php',
        reader:  new Ext.data.JsonReader({}),
		timeout: 2000,
		listeners: {
			exception:function () {
				global_no_datas_circuits = true;
			}
		}
    },
    autoLoad: true,
	listeners: {
		load : function (self, records) {
			global_no_datas_circuits = false;
		}
	}
});

agglo2011.store.DepartsCircuits = new Ext.data.JsonStore({
	model: 'DepartsCircuits',
	storeId: 'id',
	//~ sorters: 'titre',
	//~ data : circuits,
	proxy: {
        type: 'ajax',
        url : serveur_ajax+'datas/datas_departs_circuits.php',
        reader:  new Ext.data.JsonReader({}),
		timeout: 2000,
		listeners: {
			exception:function () {
				global_no_datas_depart_circuits = true;
			}
		}
    },
    autoLoad: true,
	listeners: {
		load : function (self, records) {
			global_no_datas_depart_circuits = false;
		}
	}
});

agglo2011.store.Communes = new Ext.data.JsonStore({
	model: 'Communes',
	storeId: 'id',
	//~ sorters: 'nom',
	//~ data : communes,
	proxy: {
        type: 'ajax',
        url : serveur_ajax+'datas/datas_communes.php',
        reader:  new Ext.data.JsonReader({}),
		timeout: 2000,
		listeners: {
			exception:function () {
				global_no_datas_communes = true;
			}
		}
    },
    autoLoad: true,
	listeners: {
		load : function (self, records) {
			global_no_datas_communes = false;
		}
	}
});

// Templates
agglo2011.template.Actualites = new Ext.XTemplate(
    '<tpl for=".">',
        '<div class="bloc-actualites">',
			'<img src="{image}" style="float:left; width:33%; margin-right:5px;"/>',
			'<span class="date-actualites">{date}</span>',
			'<span class="rubrique-actualites">{titre}</span><br />',
			'<span class="content-actualites">{stitre}</span>',
		'</div>',
    '</tpl>'
);
agglo2011.template.detailActualites = new Ext.XTemplate(
	'<tpl for=".">',
		'<div class="actualites-detail">',
			'<div class="titre-actualites"><span class="date-actualites">{date}</span>{stitre}</div>',
			'<img src="{image}" style="float:left; width:100%;margin-top:5px;margin-bottom:5px"/>',
			'<div class="content-actualites">{description}</div>',
		'</div>',
	'</tpl>'
);
agglo2011.template.Competences = new Ext.XTemplate(
    '<tpl for=".">',
        '<div class="competences">',
			'<img src="{vignette}" style="float:left; width:33%;margin-right:5px"/>',
			'<span class="competences-theme vert">{theme}</span><br />',
			'<span class="competences-titre ">{titre}</span>',
		'</div>',
    '</tpl>'
);
agglo2011.template.CompetencesDetail = new Ext.XTemplate(
    '<tpl for=".">',
        '<div class="competences-detail">',
			'<div class="competences-titre">{titre}</div>',
			'<img src="{image}" style="float:left; width:100%;margin-top:5px;margin-bottom:5px"/>',
			'<div class="competences-descr">{description}</div>',
		'</div>',
    '</tpl>'
);
agglo2011.template.Economie = new Ext.XTemplate(
    '<tpl for=".">',
        '<div class="economie">',
			'<img src="{vignette}" style="float:left; width:33%;margin-right:5px"/>',
			'<span class="economie-titre orange">{titre}</span><br />',
			'<span class="economie-sous-titre ">{stitre}</span>',
		'</div>',
    '</tpl>'
);
agglo2011.template.EconomieDetail = new Ext.XTemplate(
    '<tpl for=".">',
        '<div class="economie-detail">',
			'<div class="economie-sous-titre ">{stitre}</div>',
			'<img src="{image}" style="float:left; width:100%;margin-top:5px;margin-bottom:5px"/>',
			'<div class="economie-texte">{description}</div>',
		'</div>',
    '</tpl>'
);
agglo2011.template.Lignes = new Ext.XTemplate(
    '<tpl for=".">',
		'<table style="width:100%;border-bottom:2px solid {couleur} !important;padding:0!important;margin:0!important;" cellpadding="0" cellspacing="0" border="0">',
			'<tr>',
				'<td class="ic-ligne" style="important;background-color:{couleur} !important;">{num}</td>',
				'<td class="libelle-ligne">{libelle}</td>',
			'</tr>',
		'</table>',
    '</tpl>'
);
agglo2011.template.LignesScolaires = new Ext.XTemplate(
    '<tpl for=".">',
		'<table style="width:100%;border-bottom:2px solid {couleur} !important;padding:0!important;margin:0!important;" cellpadding="0" cellspacing="0" border="0">',
			'<tr>',
				'<td class="ic-ligne" style="important;background-color:{couleur} !important;">&nbsp;</td>',
				'<td class="libelle-ligne">{ligne}</td>',
			'</tr>',
		'</table>',
    '</tpl>'
);
agglo2011.template.Circuits = new Ext.XTemplate(
    '<tpl for=".">',
        '<div class="circuit">',
			'<img src="{vignette}" style="float:left; width:33%;margin-right:5px"/>',
			'<span class="circuit-titre rouge">{titre}</span><br />',
			'<span class="circuit-sous-titre ">{stitre}</span>',
		'</div>',
    '</tpl>'
);
agglo2011.template.CircuitsDetail = new Ext.XTemplate(
    '<tpl for=".">',
        '<div class="circuit-detail">',
			'<div class="circuit-sous-titre">{stitre}</div>',
			'<img src="{image}" style="float:left;width:100%;margin-top:5px;margin-bottom:5px"/>',
			'<div class="circuit-texte">{description}</div>',
		'</div>',
    '</tpl>'
);
agglo2011.template.Communes = new Ext.XTemplate(
    '<tpl for=".">',
        '<div class="commune" >',
			'<div class="vignettecommune">',
				'<div style="height:75px;background-image:url({image});background-repeat:no-repeat;background-size:100%;background-position:center bottom;">&nbsp;</div>',
			'</div>',
			'<div class="commune-titre">{nom}</div>',
		'</div>',
    '</tpl>'
);
agglo2011.template.CommunesDetail = new Ext.XTemplate(
    '<tpl for=".">',
        '<div class="commune-detail">',
			'<span class="commune-descr">{description}</span>',
			'<img src="{image}" style="float:left; width:100%;margin-top:5px;margin-bottom:5px"/>',
			'{contenu}',
		'</div>',
    '</tpl>'
);


// -*- coding: utf-8 -*-

// Fonction utilisée par la page HTML des BUS ...
function visibilite(thingId)
{
	 var i;
	 var targetElement;
	 var divs = document.getElementsByTagName('DIV');
	 for (var i=0; i<divs.length; i++)
		if (divs[i].className == 'tous-les-divs')
			divs[i].style.display = 'none';
	 document.getElementById("divid" + thingId).style.display = "" ;
}

function addslashes(str)
{
     str=str.replace(/\'/g,'\\\'');
     str=str.replace(/\"/g,'\\"');
     str=str.replace(/\\/g,'\\\\');
     str=str.replace(/\0/g,'\\0');
     return str;
}

function isConnected(etat)
{
	if(etat == global_etat_connection)
		return ;
	global_etat_connection = etat ;
	if(etat)
	{
		console.log("ONLINE");
		location.reload();
	}
	else
	{
		console.log("OFFLINE");
		if(agglo2011.panel.main)
		{
			agglo2011.panel.main.setActiveItem(agglo2011.panel.AccueilGlobal);
			agglo2011.panel.main.disable();
		}
		agglo2011.panel.AccueilGlobal.setActiveItem(agglo2011.panel.NoConnection, {type:'pop'});
	}
}

function verifyConnection()
{
	global_no_datas = false ;
	if(global_no_datas_alaune || global_no_datas_circuits || global_no_datas_depart_circuits || global_no_datas_competences || global_no_datas_economies || global_no_datas_communes)
		global_no_datas = true ;
	
	if(global_no_datas || !navigator.onLine)
		isConnected(false) ;
	else
		isConnected(true) ;
	
	if(global_no_datas_alaune)
		agglo2011.store.ALaUne.load();
	if(global_no_datas_circuits)
		agglo2011.store.Circuits.load();
	if(global_no_datas_depart_circuits)
		agglo2011.store.DepartsCircuits.load();
	if(global_no_datas_competences)
		agglo2011.store.Competences.load();
	if(global_no_datas_economies)
		agglo2011.store.Economie.load();
	if(global_no_datas_communes)
		agglo2011.store.Communes.load();
	
	window.setTimeout('verifyConnection()', 2000);
}

// Instances d'objets utilisés dans l'application
agglo2011.carousel1 = new Ext.Carousel({
	ui : 'dark',
	direction: 'horizontal',
	indicator: true,
	layout: {
		type: 'hbox',
		align: 'center'
	},
	height: 140,
	showDetailUne: function (el) {
		var tab = el.id.split('_') ;
		var categorie = tab[0] ;
		var id_element = tab[1] ;
		
		var panelDetail = null ;
		var panelMaitre = null;
		var storeData = null;
		var record = null;
		var title = '';
		switch (categorie)
		{
			case 'actualites':
				storeData = agglo2011.store.ALaUne;
				record = storeData.getById(id_element) ;
				if(record)
					title = record.data.titre ;
				panelDetail = agglo2011.panel.ActualitesDetail;
				panelMaitre = agglo2011.panel.AccueilGlobal;
				break;
			case 'mobilites':
				storeData = agglo2011.store.Circuits;
				record = storeData.getById(id_element) ;
				if(record)
					title = record.data.titre ;
				panelDetail = agglo2011.panel.CircuitsDetail;
				panelMaitre = agglo2011.panel.Mobilite;
				break;
			case 'competences':
				storeData = agglo2011.store.Competences;
				record = storeData.getById(id_element) ;
				if(record)
					title = record.data.theme ;
				panelDetail = agglo2011.panel.CompetencesDetail;
				panelMaitre = agglo2011.panel.Competences;
				break;
			case 'economie':
				storeData = agglo2011.store.Economie;
				record = storeData.getById(id_element) ;
				if(record)
					title = record.data.titre ;
				panelDetail = agglo2011.panel.EconomieDetail;
				panelMaitre = agglo2011.panel.Economie;
				break;
			case 'communes':
				storeData = agglo2011.store.Communes;
				record = storeData.getById(id_element) ;
				if(record)
					title = record.data.nom ;
				panelDetail = agglo2011.panel.CommunesDetail;
				panelMaitre = agglo2011.panel.Communes;
				break;
		}
		agglo2011.panel.main.setActiveItem(panelMaitre);
		if (id_element != 0)
		{
			if (record)
			{
				panelMaitre.setActiveItem(panelDetail) ;
				panelDetail.update(record.data);
				panelDetail.dockedItems.items[0].setTitle(title);
			}
		}
	}
});

// ============= Rubrique Actualités (ALaUne)
agglo2011.liste.Actualites = new Ext.List({
	id: 'listeALaUne',
	scroll: false,
	store: agglo2011.store.Actualites,
	itemTpl: agglo2011.template.Actualites,
	//~ onItemDisclosure: function (record) {
		//~ agglo2011.panel.ActualitesDetail.update(record.data);
		//~ agglo2011.panel.AccueilGlobal.setActiveItem(agglo2011.panel.ActualitesDetail);
	//~ },
	listeners : {
		itemtap: function (self, index, item, event) {
			var record = self.getRecord(item);
			agglo2011.panel.ActualitesDetail.update(record.data);
			agglo2011.panel.AccueilGlobal.setActiveItem(agglo2011.panel.ActualitesDetail, {type:'pop'});
		}
	}
});
agglo2011.panel.ActualitesListe = new Ext.Panel({
	title: 'A la Une ...',
	animation: false,
	iconCls: 'user',
	//~ fullscreen: false,
	//~ layout: 'fit',
	//~ layout: 'card',
	cardSwitchAnimation: 'slide',
	dockedItems: [ {
		dock: 'top',
		items: new Ext.Container({
			html: '<div class="onglet-actualites-titre">Actualités</div>'
		})
	}],
	items: [ agglo2011.liste.Actualites ]
});
agglo2011.panel.ActualitesDetail = new Ext.Panel({
	id: 'detailActualites',
	title: 'détail actualités',
	fullscreen:true,
	modal: true,
	scroll:'vertical',
	layout:'fit',
	tpl: agglo2011.template.detailActualites,
	//~ floating: true,
	dockedItems: [
		{
			xtype: 'toolbar',
			dock: 'top',
			titleCls:'x-toolbar-title actualite-rubrique-toolbar',
			defaults: {
				ui: 'plain',
				iconMask: true
			},
			items: [{
				//~ text: 'Retour',
				//~ ui: 'back',
				text: 'Retour',
				ui: 'back',
				handler: function() {
					agglo2011.panel.AccueilGlobal.setActiveItem(agglo2011.panel.Accueil, {type:'slide', direction:'right'});
				}
			}]
		}
	],
	listeners:{
		beforeshow:function(self){
			if(self.data && self.data.titre)
				self.dockedItems.items[0].setTitle(self.data.titre);
		}
	}
});
agglo2011.panel.NoConnection = new Ext.Panel({
	id: 'NoConnection',
	title: 'Pas de connexion',
	fullscreen:true,
	modal: true,
	layout:'fit',
	html:'<div style="width:100%;margin-top:100px;vertical-align:middle;text-align:center;font-weight:bold;font-size:1.2em;">L\'application nécessite un accès internet pour récupérer ses données. <br/><br/>Veuillez vérifier la connexion de votre appareil, puis relancer l\'application.</div>'
});
// ============= Rubrique Compétences
agglo2011.liste.Competences = new Ext.List({
	id: 'listeCompetences',
	scroll: 'vertical',
	store: agglo2011.store.Competences,
	itemTpl: agglo2011.template.Competences,
	listeners : {
		itemtap: function (self, index, item, event) {
			var record = self.getRecord(item);
			agglo2011.panel.CompetencesDetail.update(record.data);
			agglo2011.panel.Competences.setActiveItem(agglo2011.panel.CompetencesDetail, {type:'pop'});
		}
	}
});
agglo2011.panel.CompetencesListe = new Ext.Panel({
	title: 'Compétences',
	animation: false,
	iconCls: 'user',
	layout:'fit',
	dockedItems: [ {
		dock: 'top',
		items: new Ext.Container({
			html: '<div class="onglet-competences-titre vert">Les missions de l\'Agglo au service de la population</div>'
		})
	}],
	items: [ agglo2011.liste.Competences ]
});
agglo2011.panel.CompetencesDetail = new Ext.Panel({
	id: 'detailCompetences',
	title: 'détail compétences',
	fullscreen:true,
	scroll:'vertical',
	layout:'fit',
	modal: true,
	tpl: agglo2011.template.CompetencesDetail,
	dockedItems: [
		{
			titleCls:'x-toolbar-title competence-theme-toolbar vert',
			xtype: 'toolbar',
			items: [{
				text: 'Retour',
				ui: 'back',
				handler: function() {
					agglo2011.panel.Competences.setActiveItem(agglo2011.panel.CompetencesListe, {type:'slide', direction:'right'});
				}
			}]
		}
	],
	listeners:{
		beforeshow:function(self){
			if(self.data && self.data.theme)
				self.dockedItems.items[0].setTitle(self.data.theme);
		}
	}
});
// ============= Rubrique Economie
agglo2011.liste.Economie = new Ext.List({
	id: 'listeEconomie',
	scroll: 'vertical',
	store: agglo2011.store.Economie,
	itemTpl: agglo2011.template.Economie,
	listeners : {
		itemtap: function (self, index, item, event) {
			var record = self.getRecord(item);
			agglo2011.panel.EconomieDetail.update(record.data);
			agglo2011.panel.Economie.setActiveItem(agglo2011.panel.EconomieDetail, {type:'pop'});
		}
	}
});
agglo2011.panel.EconomieListe = new Ext.Panel({
	title: 'Economie',
	animation: false,
	iconCls: 'user',
	layout:'fit',
	dockedItems: [ {
		dock: 'top',
		items: new Ext.Container({
			html: '<div class="onglet-economie-titre orange">Des filières d\'excellence sur un territoire remarquable</div>'
		})
	}],
	items: [ agglo2011.liste.Economie ]
});
agglo2011.panel.EconomieDetail = new Ext.Panel({
	id: 'detailEconomie',
	title: 'détail économie',
	fullscreen:true,
	modal: true,
	layout:'fit',
	scroll:'vertical',
	tpl: agglo2011.template.EconomieDetail,
	dockedItems: [
		{
			titleCls:'x-toolbar-title economie-titre-toolbar orange',
			xtype: 'toolbar',
			items: [{
				text: 'Retour',
				ui: 'back',
				handler: function() {
					agglo2011.panel.Economie.setActiveItem(agglo2011.panel.EconomieListe, {type:'slide', direction:'right'});
				}
			}]
		}
	],
	listeners:{
		beforeshow:function(self){
			if(self.data && self.data.titre)
				self.dockedItems.items[0].setTitle(self.data.titre);
		}
	}
});
// ============= Rubrique Communes
agglo2011.liste.Communes = new Ext.List({
	id: 'listeCommunes',
	itemCls: 'item-liste-communes',
	store: agglo2011.store.Communes,
	itemTpl: agglo2011.template.Communes,
	fullscreen: true,
	scroll: true,
	layout: 'fit',
	grouped : false,
	indexBar: false,
	listeners : {
		itemtap: function (self, index, item, event) {
			var record = self.getRecord(item);
			agglo2011.panel.CommunesDetail.update(record.data);
			agglo2011.panel.Communes.setActiveItem(agglo2011.panel.CommunesDetail, {type:'pop'});
		}
	}
});
agglo2011.panel.CommunesListe = new Ext.Panel({
	id: 'liste-des-communes',
	title: 'Communes',
	animation: false,
	fullscreen: true,
	layout:'fit',
	dockedItems: [ {
		dock: 'top',
		items: new Ext.Container({
			html: '<div class="onglet-communes-titre bleu">36 communes unies</div><div class="onglet-communes-sous-titre bleu">L\'Archipel Perpignan Méditerranée</div>'
		})
	}],
	items: [ agglo2011.liste.Communes ]
});
agglo2011.panel.CommunesDetail = new Ext.Panel({
	id: 'detailCommunes',
	title: 'détail communes',
	fullscreen:true,
	modal: true,
	scroll:'vertical',
	tpl: agglo2011.template.CommunesDetail,
	dockedItems: [
		{
			titleCls:'x-toolbar-title commune-nom-toolbar bleu',
			xtype: 'toolbar',
			items: [{
				text: 'Retour',
				ui: 'back',
				handler: function() {
					agglo2011.panel.Communes.setActiveItem(agglo2011.panel.CommunesListe, {type:'slide', direction:'right'});
				}
			}]
		}
	],
	listeners:{
		beforeshow:function(self){
			if(self.data && self.data.nom)
				self.dockedItems.items[0].setTitle(self.data.nom);
		}
	}
});
// ============= Rubrique Mobilités
agglo2011.panel.MobiliteMenu = new Ext.Panel({				// Menu mobilité (BUS ou VELOS)
	id: 'mobilite_menu',
	layout: {
		type: 'vbox',
		align: 'stretch'
	},
	scroll: 'vertical',
	fullscreen: false,
	animation: false,
	iconCls: 'more',
	items: [
		new Ext.Container({
			html: '<div class="onglet-mobilites-titre rouge">Bouger autrement sur le territoire de l\'Agglo, c\'est possible ...</div>\
					<h5 class="conteneur-transports rouge">&nbsp;Transports</h5>\
					<div>\
						<img src="images/Module-BUS.jpg" style="float:left; width:40%; margin-right:5px;">\
						<span class="titre">Des lignes de bus pour rejoindre toutes les communes de l\'Agglo</span><br />\
					</div>\
					<table class="bus lien-transports">\
						<tr onclick="agglo2011.panel.Mobilite.setActiveItem(agglo2011.panel.LignesListe, {type:\'slide\', direction:\'left\'});">\
							<td>&nbsp;&nbsp;Tous les horaires de bus</td>\
							<td class="chevron-bus">></td>\
						</tr>\
						<tr style="border-top:2px solid white;" onclick="agglo2011.panel.Mobilite.setActiveItem(agglo2011.panel.LignesScolairesListe, {type:\'slide\', direction:\'left\'});">\
							<td>&nbsp;&nbsp;Les lignes scolaires</td>\
							<td class="chevron-bus">></td>\
						</tr>\
					</table>\
					<h5 class="conteneur-transports rouge">&nbsp;Vélo</h5>\
					<div>\
						<img src="images/Module-VELO1.jpg" style="float:left;width:40%; margin-right:5px;">\
						<span class="titre">Des circuits de balades sur l\'Agglo pour découvrir tout le territoire</span>\
					</div>\
					<table class="bus lien-transports">\
						<tr style="border-top:2px solid white;" onclick="agglo2011.panel.Mobilite.setActiveItem(agglo2011.panel.CircuitsListe, {type:\'slide\', direction:\'left\'});">\
							<td>&nbsp;&nbsp;Tous les parcours cyclables</td>\
							<td class="chevron-bus">></td>\
						</tr>\
					</table>\
					<br/>\
					<br/>'
		})
	]
});
agglo2011.liste.Lignes = new Ext.List({
	id: 'listeLignesBus',
	scroll: 'vertical',
	itemCls: 'item-liste-ligne',
	store: agglo2011.store.Lignes,
	itemTpl: agglo2011.template.Lignes,
	listeners : {
		itemtap: function (self, index, item, event) {
			var record = self.getRecord(item);
			
			var periode_index = -1 ;
			var periode_record = null ;
			
			var html_content = '<div style="width:100%">';
			html_content += '<div style="width:100%;font-weight:bold;padding:5px;">';
			html_content += record.data.libelle ;
			html_content += '</div>';
			html_content += '<img style="width:100%" src="http://www.perpignanmediterranee.com/iphone/bus/jpg/bus_'+record.data.plan+'.jpg" onclick="majPanelImageLigneDetail(\'http://www.perpignanmediterranee.com/iphone/bus/jpg/bus_'+record.data.plan+'.jpg\', \'Arrets ligne '+record.data.num+'\');"/>';
			html_content += '<div style="width:100%">';
			html_content += '<ul>';
			do{
				
				periode_index = agglo2011.store.Periodes.findExact("num", record.data.num, periode_index+1);
				if(periode_index > -1)
				{
					periode_record = agglo2011.store.Periodes.getAt(periode_index) ;
					if(record.data.is_aller)
					{
						html_content += '<li>'
						html_content += '<table class="periode lien-transports">';
						html_content += '<tr onclick="majPanelImageLigneDetail(\'http://www.perpignanmediterranee.com/iphone/bus/jpg/bus_'+periode_record.data.page_aller+'.jpg\', \''+addslashes(periode_record.data.libelle)+'\');">';
						html_content += '<td class="periode-td">'+periode_record.data.libelle+'</td>';
						html_content += '<td class="chevron-periode">></td>';
						html_content += '</tr>';
						html_content += '</table>';
						html_content += '</li>' ;
					}
					else
					{
						html_content += '<li>'
						html_content += '<table class="periode lien-transports">';
						html_content += '<tr onclick="majPanelImageLigneDetail(\'http://www.perpignanmediterranee.com/iphone/bus/jpg/bus_'+periode_record.data.page_retour+'.jpg\', \''+addslashes(periode_record.data.libelle)+'\');">';
						html_content += '<td class="periode-td">'+periode_record.data.libelle+'</td>';
						html_content += '<td class="chevron-periode">></td>';
						html_content += '</tr>';
						html_content += '</table>';
						html_content += '</li>' ;
					}
				}
				
			}while(periode_index > -1);
			html_content += '</ul>';
			html_content += '</div>';
			html_content += '</div>';
			if(record.data.is_aller)
				agglo2011.panel.LignesDetail.dockedItems.items[0].setTitle("Ligne "+record.data.num+' aller');
			else
				agglo2011.panel.LignesDetail.dockedItems.items[0].setTitle("Ligne "+record.data.num+' retour');
			agglo2011.panel.LignesDetail.update(html_content);
			agglo2011.panel.Mobilite.setActiveItem(agglo2011.panel.LignesDetail, {type:'pop'});
		}
	}
});
function majPanelImageLigneDetail(img, title)
{
	agglo2011.panel.LigneImageDetail.dockedItems.items[0].setTitle(title);
	agglo2011.panel.LigneImageDetail.update('<img id="img_detail_ligne" src="'+img+'"/>');
	agglo2011.panel.Mobilite.setActiveItem(agglo2011.panel.LigneImageDetail, {type:'slide', direction:'left'});
}
agglo2011.panel.LignesListe = new Ext.Panel({				// Liste des Circuits vélo
	id: 'lignes_bus',
	title: 'Lignes',
	animation: false,
	iconCls: 'user',
	fullscreen: true,
	layout: 'fit',
	//~ layout: 'card',
	cardSwitchAnimation: 'slide',
	dockedItems: [ {
		dock: 'top',
		items: [
			new Ext.Toolbar({
				title:'Transports',
				defaults: {
					ui: 'plain',
					iconMask: true
				},
				items: [{
					//~ text: 'Retour',
					//~ ui: 'back',
					text: 'Retour',
					ui: 'back',
					handler: function() {
						agglo2011.panel.Mobilite.setActiveItem(agglo2011.panel.MobiliteMenu, {type:'slide', direction:'right'});
					}
				}]
			})
		]
	}],
	items: [ agglo2011.liste.Lignes ]
});
agglo2011.panel.LignesDetail = new Ext.Panel({
	id: 'detailLigne',
	title: 'détail ligne',
	fullscreen:true,
	modal: true,
	scroll:'vertical',
	layout:'fit',
	dockedItems: [
		{
			titleCls:'x-toolbar-title ligne-titre-toolbar',
			xtype: 'toolbar',
			layout: 'hbox',
			items: [{
					text: 'Retour',
					ui: 'back',
					handler: function() {
						agglo2011.panel.Mobilite.setActiveItem(agglo2011.panel.LignesListe, {type:'slide', direction:'right'});
					}
				}
			]
		}
	],
	listeners:{}
});
agglo2011.panel.LigneImageDetail = new Ext.Panel({
	id: 'detailImageLigne',
	fullscreen:true,
	modal: true,
	scroll:'both',
	//~ layout:'fit',
	dockedItems: [
		{
			titleCls:'x-toolbar-title ligne-titre-toolbar',
			xtype: 'toolbar',
			layout: 'hbox',
			items: [{
					text: 'Retour',
					ui: 'back',
					handler: function() {
						agglo2011.panel.Mobilite.setActiveItem(agglo2011.panel.LignesDetail, {type:'slide', direction:'right'});
					}
				}
			]
		}
	],
	listeners:{
		show:function(self){
			var image_ligne=Ext.select('#img_detail_ligne');
			var min = self.width;
			var max = image_ligne.elements[0].clientWidth;
			var current = image_ligne.elements[0].clientWidth;
			var imgRatio = image_ligne.elements[0].clientHeight / image_ligne.elements[0].clientWidth;
			var imgScaleDirection;
			var dblTappZoom = -1;
			
			image_ligne.on('pinch', function(event){
				agglo2011.panel.LigneImageDetail.setScrollable(false);
				if(event.deltaScale > 0)
				{
					current += 6 ;
					current = Math.min(max, current); 
					imgScaleDirection=1;
				}
				else
				{
					current -= 6 ;
					current = Math.max(min, current);
					imgScaleDirection=-1;
				}
				image_ligne.setStyle('width', current + 'px');
				image_ligne.setStyle('height', parseInt(current*imgRatio) + 'px');
			}, null,  null);
			
			image_ligne.on('doubletap', function(event){
				if(current < max &&  dblTappZoom> 0 )
				{
					current+=150; 
					current = Math.min(max, current);
					if (current==max) dblTappZoom = -1;
						imgScaleDirection=1;
				}
				else
				{
					current-=150;
					current = Math.max(min, current);
					if (current==min) dblTappZoom = 1;
						imgScaleDirection=-1;
				}
				image_ligne.setStyle('width', current + 'px');
				image_ligne.setStyle('height', parseInt(current*imgRatio) + 'px');
			}, null,  null);
			
			image_ligne.on('pinchend', function(event){
				if (imgScaleDirection <0 ) 
					agglo2011.panel.LigneImageDetail.doLayout();
				agglo2011.panel.LigneImageDetail.setScrollable('both');
			}, null, null);	
		}
	}
});
agglo2011.liste.LignesScolaires = new Ext.List({
	id: 'listeLignesScolairesBus',
	scroll: 'vertical',
	itemCls: 'item-liste-ligne',
	store: agglo2011.store.LignesScolaires,
	itemTpl: agglo2011.template.LignesScolaires,
	listeners : {
		itemtap: function (self, index, item, event) {
			var record = self.getRecord(item);
			
			var periode_index = -1 ;
			var periode_record = null ;
			
			var html_content = '<div style="width:100%">';
			html_content += '<div style="width:100%">';
			html_content += '<ul>';
			for(var i=0 ; i<record.data.images.length ; i++)
			{
				html_content += '<li>'
				html_content += '<table class="periode lien-transports">';
				html_content += '<tr onclick="majPanelImageLigneScolaireDetail(\'http://www.perpignanmediterranee.com/iphone/bus/scolaire/scolaire_'+record.data.images[i]+'.jpg\', \''+addslashes(record.data.ligne)+' grille '+(i+1)+'\');">';
				html_content += '<td class="periode-td">Voir la grille horaire '+(i+1)+'</td>';
				html_content += '<td class="chevron-periode">></td>';
				html_content += '</tr>';
				html_content += '</table>';
				html_content += '</li>' ;
			}
			html_content += '</ul>';
			html_content += '</div>';
			html_content += '</div>';
			agglo2011.panel.LignesScolairesDetail.dockedItems.items[0].setTitle("Ligne "+record.data.ligne);
			agglo2011.panel.LignesScolairesDetail.update(html_content);
			agglo2011.panel.Mobilite.setActiveItem(agglo2011.panel.LignesScolairesDetail, {type:'pop'});
		}
	}
});
function majPanelImageLigneScolaireDetail(img, title)
{
	agglo2011.panel.LigneScolairesImageDetail.dockedItems.items[0].setTitle(title);
	agglo2011.panel.LigneScolairesImageDetail.update('<img id="img_detail_ligne_scolaire" src="'+img+'"/>');
	agglo2011.panel.Mobilite.setActiveItem(agglo2011.panel.LigneScolairesImageDetail, {type:'slide', direction:'left'});
}
agglo2011.panel.LignesScolairesListe = new Ext.Panel({				// Liste des Circuits vélo
	id: 'lignes_scolaires_bus',
	title: 'Lignes scolaires',
	animation: false,
	iconCls: 'user',
	fullscreen: true,
	layout: 'fit',
	cardSwitchAnimation: 'slide',
	dockedItems: [ {
		dock: 'top',
		items: [
			new Ext.Toolbar({
				title:'Transports scolaires',
				defaults: {
					ui: 'plain',
					iconMask: true
				},
				items: [{
					text: 'Retour',
					ui: 'back',
					handler: function() {
						agglo2011.panel.Mobilite.setActiveItem(agglo2011.panel.MobiliteMenu, {type:'slide', direction:'right'});
					}
				}]
			})
		]
	}],
	items: [ agglo2011.liste.LignesScolaires ]
});
agglo2011.panel.LignesScolairesDetail = new Ext.Panel({
	id: 'detailLigneScolaires',
	title: 'détail ligne scolaire',
	fullscreen:true,
	modal: true,
	scroll:'vertical',
	layout:'fit',
	dockedItems: [
		{
			titleCls:'x-toolbar-title ligne-titre-toolbar',
			xtype: 'toolbar',
			layout: 'hbox',
			items: [{
					text: 'Retour',
					ui: 'back',
					handler: function() {
						agglo2011.panel.Mobilite.setActiveItem(agglo2011.panel.LignesScolairesListe, {type:'slide', direction:'right'});
					}
				}
			]
		}
	],
	listeners:{}
});
agglo2011.panel.LigneScolairesImageDetail = new Ext.Panel({
	id: 'detailImageLigneScolaires',
	fullscreen:true,
	modal: true,
	scroll:'both',
	//~ layout:'fit',
	dockedItems: [
		{
			titleCls:'x-toolbar-title ligne-titre-toolbar',
			xtype: 'toolbar',
			layout: 'hbox',
			items: [{
					text: 'Retour',
					ui: 'back',
					handler: function() {
						agglo2011.panel.Mobilite.setActiveItem(agglo2011.panel.LignesScolairesDetail, {type:'slide', direction:'right'});
					}
				}
			]
		}
	],
	listeners:{
		show:function(self){
			var image_ligne=Ext.select('#img_detail_ligne_scolaire');
			var min = self.width;
			var max = image_ligne.elements[0].clientWidth;
			var current = image_ligne.elements[0].clientWidth;
			var imgRatio = image_ligne.elements[0].clientHeight / image_ligne.elements[0].clientWidth;
			var imgScaleDirection;
			var dblTappZoom = -1;
			
			image_ligne.on('pinch', function(event){
				agglo2011.panel.LigneScolairesImageDetail.setScrollable(false);
				if(event.deltaScale > 0)
				{
					current += 6 ;
					current = Math.min(max, current); 
					imgScaleDirection=1;
				}
				else
				{
					current -= 6 ;
					current = Math.max(min, current);
					imgScaleDirection=-1;
				}
				image_ligne.setStyle('width', current + 'px');
				image_ligne.setStyle('height', parseInt(current*imgRatio) + 'px');
			}, null,  null);
			
			image_ligne.on('doubletap', function(event){
				if(current < max &&  dblTappZoom> 0 )
				{
					current+=100; 
					current = Math.min(max, current);
					if (current==max) dblTappZoom = -1;
						imgScaleDirection=1;
				}
				else
				{
					current-=150;
					current = Math.max(min, current);
					if (current==min) dblTappZoom = 1;
						imgScaleDirection=-1;
				}
				image_ligne.setStyle('width', current + 'px');
				image_ligne.setStyle('height', parseInt(current*imgRatio) + 'px');
			}, null,  null);
			
			image_ligne.on('pinchend', function(event){
				if (imgScaleDirection <0 ) 
					agglo2011.panel.LigneScolairesImageDetail.doLayout();
				agglo2011.panel.LigneScolairesImageDetail.setScrollable('both');
			}, null, null);	
		}
	}
});

agglo2011.liste.Circuits = new Ext.List({
	id: 'listeCircuitsVelo',
	scroll: 'vertical',
	itemCls: 'item-liste-circuit',
	store: agglo2011.store.Circuits,
	itemTpl: agglo2011.template.Circuits,
	listeners : {
		itemtap: function (self, index, item, event) {
			var record = self.getRecord(item);
			agglo2011.mapVelo.updateCircuit(record.data);
			agglo2011.panel.CircuitsDetail.update(record.data);
			agglo2011.panel.Mobilite.setActiveItem(agglo2011.panel.CircuitsDetail, {type:'pop'});
		}
	}
});
agglo2011.panel.CircuitsListe = new Ext.Panel({				// Liste des Circuits vélo
	id: 'circuits_velo',
	title: 'Circuits',
	animation: false,
	iconCls: 'user',
	fullscreen: true,
	layout: 'fit',
	//~ layout: 'card',
	cardSwitchAnimation: 'slide',
	dockedItems: [ {
		dock: 'top',
		items: [
			new Ext.Toolbar({
				title:'Vélo',
				defaults: {
					ui: 'plain',
					iconMask: true
				},
				items: [{
					//~ text: 'Retour',
					//~ ui: 'back',
					text: 'Retour',
					ui: 'back',
					handler: function() {
						agglo2011.panel.Mobilite.setActiveItem(agglo2011.panel.MobiliteMenu, {type:'slide', direction:'right'});
					}
				}]
			}),
			new Ext.Container({
				html: '<div class="onglet-circuit-titre rouge">Les parcours cyclables de l\'Agglo</div>'
			})
		]
	}],
	items: [ agglo2011.liste.Circuits ]
});
agglo2011.panel.CircuitsDetail = new Ext.Panel({
	id: 'detailCircuit',
	title: 'détail circuit',
	fullscreen:true,
	modal: true,
	scroll:'vertical',
	layout:'fit',
	tpl: agglo2011.template.CircuitsDetail,
	dockedItems: [
		{
			titleCls:'x-toolbar-title circuit-titre-toolbar rouge',
			xtype: 'toolbar',
			layout: 'hbox',
			items: [{
					text: 'Retour',
					ui: 'back',
					handler: function() {
						agglo2011.mapVelo.updateCircuit(null);
						agglo2011.panel.Mobilite.setActiveItem(agglo2011.panel.CircuitsListe, {type:'slide', direction:'right'});
					}
				},{
					xtype: 'spacer'
				},{
					//~ text: 'Cartographie',
					//~ iconMask: true,
					//~ iconMaskCls: 'blue-button',
					text:'Plan',
					icon: 'images/maps_blanc.png',
					cls: 'bouton-map',
					handler: function() {
						agglo2011.panel.Mobilite.setActiveItem(agglo2011.panel.CircuitsCarto, {type:'slide', direction:'left'});
					}
				}
			]
		}
	],
	listeners:{
		beforeshow:function(self){
			if(self.data && self.data.titre)
				self.dockedItems.items[0].setTitle(self.data.titre);
		}
	}
});
agglo2011.panel.CircuitsCarto = new Ext.Panel({
	id: 'cartoCircuit',
	title: 'carto circuit',
	fullscreen:true,
	modal: true,
	items: agglo2011.mapVelo,
	dockedItems: [
		{
			xtype: 'toolbar',
			layout: 'hbox',
			items: [{
				text: 'Retour',
				ui: 'back',
				handler: function() {
					agglo2011.mapVelo.updateCircuit(null);
					//~ agglo2011.panel.Mobilite.setActiveItem(agglo2011.panel.CircuitsListe, {type:'slide', direction:'right'});
					agglo2011.panel.Mobilite.setActiveItem(agglo2011.panel.CircuitsDetail,{type:'slide', direction:'right'});
				}
			}]
		}
	],
	listeners : {
		beforeshow : function(self) {
			//~ console.log('CircuitsCarto->beforeshow');
			if (agglo2011.mapVelo.circuit)
				self.dockedItems.items[0].setTitle(agglo2011.mapVelo.circuit.titre);
		},
		show: function (self) {
			agglo2011.mapVelo.fixPosition();
			//~ console.log('CircuitsCarto->show');
		}
	}
});
// =========================== Panels ==========================
agglo2011.panel.enTete = new Ext.Panel({				// En-tête des différents onglets
	id: 'entete',
	height: 58,
	html: '<div class="region-header">\
				<img src="images/pmca-logo.png" id="logo" >\
				<div id="div_container_logo_contacts" onclick="agglo2011.panel.main.setActiveItem(agglo2011.panel.AccueilGlobal);agglo2011.panel.AccueilGlobal.setActiveItem(agglo2011.panel.Credits, {type:\'pop\'});">\
					<img src="images/btn-contacts-agglo.png" id="contacts-agglo">\
				</div>\
			</div>'
});
agglo2011.panel.Credits = new Ext.Panel({			// Affichage des 'Contacts'
	id: 'credits',
	width: Ext.is.Phone ? 260 : 400,
	height: Ext.is.Phone ? 220 : 400,
	modal: true,
	fullscreen: true,
	layout:'fit',
	scroll:'vertical',
	//~ showAnimation: 'flip',
	dockedItems: [{
			dock: 'top',
			xtype: 'toolbar',
			title: 'Contacts Agglo',
			items: [{
				xtype: 'button',
				text: 'Retour',
				ui: 'back',
				style: 'float: right;',
				handler: function () {
					agglo2011.panel.AccueilGlobal.setActiveItem(agglo2011.panel.Actualites, {type:'slide', direction:'right'});
				}
			}]
		}
	],
	listeners: {
		'beforerender' : function(self) {
			agglo2011.panel.Credits.setLoading(true, true);
			Ext.Ajax.request({
				url: serveur_ajax+'datas/datas_contacts.php',
				success: function(response, opts) {
					agglo2011.panel.Credits.update(response.responseText);
					agglo2011.panel.Credits.setLoading(false);
				}
			});
		}
	}
});
agglo2011.panel.Accueil = new Ext.Panel({			// Panel d'accueil => Caroussel + liste des actualités
	id: 'accueil',
	title: 'Accueil',
	layout: {
		type: 'vbox',
		align: 'stretch'
	},
	fullscreen: false,
	animation: false,
	iconCls: 'more',
	scroll: 'vertical',
	items: [ agglo2011.carousel1, agglo2011.panel.ActualitesListe ],
	listeners: {
		show: function (self) {
			agglo2011.panel.enTete.hide();
			agglo2011.panel.enTete.show();
		}
	}
});
agglo2011.panel.AccueilGlobal = new Ext.Panel({	// Panel englobant le caroussel et la liste des actualités
	id: 'accueilGlobal',
	title: 'Accueil',
	layout: 'card',
	iconCls: 'icone-accueil',
	items: [
		agglo2011.panel.Accueil,
		agglo2011.panel.ActualitesDetail
	],
	listeners: {
		show: function (self) {
			agglo2011.panel.enTete.hide();
			agglo2011.panel.enTete.show();
		}
	}
});
agglo2011.panel.Mobilite = new Ext.Panel({			// Panel Mobilité durable
	id: 'mobilite',
	title: 'Mobilités',
	layout: 'card',
	fullscreen: false,
	animation: false,
	iconCls: 'icone-mobilite',
	items: [
		agglo2011.panel.MobiliteMenu,
		agglo2011.panel.CircuitsListe,
		agglo2011.panel.CircuitsDetail,
		agglo2011.panel.CircuitsCarto
	],
	listeners: {
		show: function (self) {
			agglo2011.panel.enTete.hide();
			agglo2011.panel.enTete.show();
		}
	}
});
agglo2011.panel.Competences = new Ext.Panel({	// Panel Compétences
	id: 'competences',
	title: 'Compétences',
	layout: 'card',
	fullscreen: false,
	iconCls: 'icone-competence',
	items: [
		agglo2011.panel.CompetencesListe,
		agglo2011.panel.CompetencesDetail
	],
	listeners: {
		//~ show: function (self) {
			//~ agglo2011.panel.enTete.hide();
			//~ agglo2011.panel.enTete.show();
		//~ }
	}
});
agglo2011.panel.Economie = new Ext.Panel({		// Panel Economie Entreprises
	id: 'economie',
	title: 'Economie',
	layout: 'card',
	fullscreen: true,
	iconCls: 'icone-economie',
	items: [
		agglo2011.panel.EconomieListe,
		agglo2011.panel.EconomieDetail
	],
	listeners: {
		show: function (self) {
			agglo2011.panel.enTete.hide();
			agglo2011.panel.enTete.show();
		}
	}
});
agglo2011.panel.Communes = new Ext.Panel({		// Panel de présentation des 36 communes
	id: 'communes',
	title: 'Communes',
	scroll: 'vertical',
	layout: 'card',
	fullscreen: false,
	iconCls: 'icone-communes',
	items: [
		agglo2011.panel.CommunesListe,
		agglo2011.panel.CommunesDetail
	],
	listeners: {
		show: function (self) {
			agglo2011.panel.enTete.hide();
			agglo2011.panel.enTete.show();
		}
	}
});
// =================== Initialisation de l'application ==========================
Ext.setup({
	icon: 'startup/pmca_logo_iphone-72x72.png',
	tabletStartupScreen: 'startup/pmca_phone_startup.png',
	phoneStartupScreen: 'startup/pmca_phone_startup.png',
	glossOnIcon: false,
	fullscreen: true,
	onReady: function() {					// Contruction de la page principale...
		//~ document.getElementsByTagName('BODY')[0].style.backgroundImage = '' ;
		agglo2011.panel.main = new Ext.TabPanel({
			id:'main',
			fullscreen: true,
			animation: false,
			tabBar: {
				dock: 'bottom',
				style:'font-size:17px',
				layout: { pack: 'center'}
			},
			items: [		// Les différents panneaux de l'application ...
				agglo2011.panel.AccueilGlobal,
				agglo2011.panel.Mobilite,
				agglo2011.panel.Competences,
				agglo2011.panel.Economie,
				agglo2011.panel.Communes
			],
			dockedItems: [{
				dock: 'top',
				items: agglo2011.panel.enTete
			}],
			showCredits: function () {
				agglo2011.panel.Credits.show();
			},
			listeners: {
				orientationchange : function ()  {
					this.el.parent().setSize(window.innerWidth, window.innerHeight);
				},
				cardswitch : function(self, newCard, oldCard, index, animated) {
					//~ console.log('Main => cardswitch de ' + oldCard.id + ' vers ' + newCard.id);
					switch(oldCard.id)
					{
						case 'accueilGlobal' :
							agglo2011.panel.AccueilGlobal.setActiveItem(agglo2011.panel.Accueil);
							break;
						case 'mobilite' :
							agglo2011.panel.Mobilite.setActiveItem(agglo2011.panel.MobiliteMenu);
							break;
						case 'competences' :
							agglo2011.panel.Competences.setActiveItem(agglo2011.panel.CompetencesListe);
							break;
						case 'economie' :
							agglo2011.panel.Economie.setActiveItem(agglo2011.panel.EconomieListe);
							break;
						case 'communes' :
							agglo2011.panel.Communes.setActiveItem(agglo2011.panel.CommunesListe);
							break;
					}
				},
				afterrender: function(self) {
					console.log('Main => afterrender');
					var pos = self.getTabBar().el.dom.offsetTop;
					console.log('Position du toolBar : ' + pos + ' pixels');
					//~ window.setTimeout('alert("pos=' + pos + ' pixels");', 500);
					var curTab = parseInt(localStorage.getItem(agglo2011.storage.CURRENT_TAB));
					if (curTab)
						self.setCard(curTab);
					
				},
				show: function (self) {
					console.log('Main => show');
					//~ console.log('Hauteur du composant EnTete: ' + agglo2011.panel.enTete.getHeight() + ' pixels');
				},
				beforeactivate: function (self) {
					console.log('Main => beforeactivate');
					//~ console.log('Hauteur du composant EnTete: ' + agglo2011.panel.enTete.getHeight() + ' pixels');
					//~ agglo2011.panel.enTete.hide();
					//~ agglo2011.panel.enTete.show();
				},
				activate: function (self) {
					console.log('Main => activate');
					//~ console.log('Hauteur du composant EnTete: ' + agglo2011.panel.enTete.getHeight() + ' pixels');
					//~ agglo2011.panel.enTete.hide();
					//~ agglo2011.panel.enTete.show();
				},
			}
		});
		verifyConnection();
	}
});

// -*- coding: utf-8 -*-
agglo2011.mapVelo = new Ext.Map({
	mapOptions : {
		center : new google.maps.LatLng(42.8, 2.55),
		zoom : 10,
		mapTypeId : google.maps.MapTypeId.ROADMAP,
		streetViewControl: false,
		zoomControlOptions: {
			position: google.maps.ControlPosition.TOP_LEFT,
			style: google.maps.ZoomControlStyle.SMALL
		},
		//~ navigationControl: true,
		navigationControlOptions: {
			style: google.maps.NavigationControlStyle.DEFAULT
		}
	},
/*
	plugins : [
	new Ext.plugin.GMap.Tracker({
	trackSuspended : true,   //suspend tracking initially
	highAccuracy   : false,
	marker : new google.maps.Marker({
	position: position,
	title : 'My Current Location',
	shadow: shadow,
	icon  : image
	})
	}),
	new Ext.plugin.GMap.Traffic({ hidden : true })
	],
*/
	pLines : null,
	circuit : null,
	pLines : null,
	center : null,
	mDepart : null,
	image : new google.maps.MarkerImage(
		'images/arrow.png',
		new google.maps.Size(39, 34),
		new google.maps.Point(0,0),
		new google.maps.Point(11, 33)
	),
	ombre : new google.maps.MarkerImage(
		'images/arrowshadow.png',
		new google.maps.Size(39, 34),
		new google.maps.Point(0,0),
		new google.maps.Point(11, 33)
	),
	zoom : 10,
	largLigne : 1,
	fixPosition : function () {
		this.map.panTo(this.center);
		this.map.setZoom(this.zoom);
	},
	addPolyline : function (tab) {
		var path = new google.maps.Polyline({
			path: tab,
			'map' : this.map,
			strokeColor: "#FF0000",
			strokeOpacity: 0.5,
			strokeWeight: this.largLigne
		});
		this.pLines.push(path);
		//~ google.maps.event.addListener(path, 'click', function () { alert('Segment de circuit 2');})
	},
	updateCircuit : function(c) {
		if (! c || typeof(c) == 'undefined')
		{
			this.circuit = null;
			this.pLines.forEach(function (el, index) {
				el.setMap(null);
			});
			this.pLines = new google.maps.MVCArray();
			return;
		}
		this.circuit = c;
		switch(this.circuit.id)
		{
			case '1532':
				tabCircuit = [ circuit_6 ];
				numCircuit = 1;
				this.center = new google.maps.LatLng(42.7989923671646, 3.0028427124023027);
				this.zoom=12;
				break;
			case '1533':
				tabCircuit = [ circuit_7, circuit_75 ];
				numCircuit = 2;
				this.center = new google.maps.LatLng(42.705210794530046 ,2.960614013671834);
				this.zoom=11;
				break;
			case '1534':
				tabCircuit = [ circuit_5, circuit_75 ];
				numCircuit = 3;
				this.center = new google.maps.LatLng(42.74909403316478, 3.011425781249959);
				this.zoom=12;
				break;
			case '1535':
				tabCircuit = [ circuit_1 ];
				numCircuit = 4;
				this.center = new google.maps.LatLng(42.68477180115707, 2.764405059814412);
				this.zoom=13;
				break;
			case '1536':
				tabCircuit = [ circuit_2, circuit_3, circuit_23 ]; 
				numCircuit = 5;
				this.center = new google.maps.LatLng(42.746194662279805, 2.8049171447753496);
				this.zoom=12;
				break;
			case '1537':
				tabCircuit = [ circuit_4 ]; 
				numCircuit = 6;
				this.center = new google.maps.LatLng(42.655363182514684, 2.8622520446776933);
				this.zoom=12;
				break;
			case '1538':
				tabCircuit = [ circuit_8 ];
				numCircuit = 7;
				this.center = new google.maps.LatLng(42.77997021955175, 2.856415557861287);
				this.zoom=13;
				break;
			case '1539':
				tabCircuit = [ circuit_9 ];
				numCircuit = 8;
				this.center = new google.maps.LatLng(42.832487360736444, 2.750500488281209);
				this.zoom=12;
				break;
			case '1540':
				tabCircuit = [ circuit_10 ];
				numCircuit = 9;
				this.center = new google.maps.LatLng(42.76409295999479, 2.6883590698241777);
				this.zoom=13;
				break;
			default :
				tabCircuit = null;
				numCircuit = -1;
		}
		if (tabCircuit)
		{
			this.pLines = new google.maps.MVCArray();
			for (var i=0; i < tabCircuit.length; i++)
				for (var j=0; j < tabCircuit[i].length; j++)
					this.addPolyline(tabCircuit[i][j]);
			
			var depart = null;
			for( var i=0; i< agglo2011.store.DepartsCircuits.data.items.length; i++)
			{
				if ( agglo2011.store.DepartsCircuits.data.items[i].data.circuit == numCircuit)
					depart = agglo2011.store.DepartsCircuits.data.items[i].data;
			}
			if (depart)
			{
				var pos = new google.maps.LatLng(depart.lat, depart.lon);
				this.mDepart = new google.maps.Marker({
					position: pos,
					shadow: this.ombre,
					icon  : this.image,
					title : 'Départ',
					map: this.map,
				});
			}
		}
	},
	listeners : {
		maprender : function(self, map){
			self.pLines.forEach(function (el, index) {
					el.setMap(map);
			});
			if (this.mDepart)
				this.mDepart.setMap(map);

			//~ google.maps.event.addListener(marker, 'click', function() {
			//~ infowindow.open(map, marker);
			//~ });

			//~ setTimeout( function(){ map.panTo (position); } , 1000);
		},
		zoomchange : function(self, map, zoomLevel) {
			var w = zoomLevel - 8;
			if (w < 1)
				w = 1;
			self.pLines.forEach(function (el, index) {
				el.setOptions({strokeWeight: w});
			});
		}
		//~ centerchange : function( self, map, center)  {
			//~ var cx = center.lng();
			//~ var cy = center.lat();
			//~ var z = map.getZoom();
			//~ console.log('Lat=' + cy + ' - lon=' + cx + ' - zoom=' + z);
		//~ }
	}
});


var circuit_75 = [
	[
		new google.maps.LatLng(42.727045108954307, 3.011375855660868),
		new google.maps.LatLng(42.727026221195651, 3.011433170747615),
		new google.maps.LatLng(42.727010032466445, 3.011480728679756),
		new google.maps.LatLng(42.726995638410258, 3.011550239424995),
		new google.maps.LatLng(42.726980325773013, 3.011806340097724),
		new google.maps.LatLng(42.726975758574653, 3.012434400676999),
		new google.maps.LatLng(42.726953155560288, 3.013466122824372)
	],
	[
		new google.maps.LatLng(42.726953155560288, 3.013466122824372),
		new google.maps.LatLng(42.726937765177048, 3.014283209035966)
	],
	[
		new google.maps.LatLng(42.726937765177048, 3.014283209035966),
		new google.maps.LatLng(42.72693865980915, 3.014313698260497),
		new google.maps.LatLng(42.726936837376641, 3.014494188572627)
	],
	[
		new google.maps.LatLng(42.726936837376641, 3.014494188572627),
		new google.maps.LatLng(42.726935915743198, 3.014661265580873)
	],
	[
		new google.maps.LatLng(42.726935915743198, 3.014661265580873),
		new google.maps.LatLng(42.726934980546076, 3.014923465528244)
	],
	[
		new google.maps.LatLng(42.726934980546076, 3.014923465528244),
		new google.maps.LatLng(42.726934977029096, 3.014950294982705),
		new google.maps.LatLng(42.726933164247711, 3.015050296904373)
	],
	[
		new google.maps.LatLng(42.726933164247711, 3.015050296904373),
		new google.maps.LatLng(42.726928645592068, 3.015214932082512)
	],
	[
		new google.maps.LatLng(42.726928645592068, 3.015214932082512),
		new google.maps.LatLng(42.726927740852872, 3.015255177259645),
		new google.maps.LatLng(42.726925016744595, 3.0154417653344)
	],
	[
		new google.maps.LatLng(42.726925016744595, 3.0154417653344),
		new google.maps.LatLng(42.726925014429618, 3.015458838398886),
		new google.maps.LatLng(42.726913312792917, 3.015545423082602),
		new google.maps.LatLng(42.726899816116557, 3.015611274663385)
	],
	[
		new google.maps.LatLng(42.726899816116557, 3.015611274663385),
		new google.maps.LatLng(42.726890819714072, 3.015651516550175),
		new google.maps.LatLng(42.726851233828064, 3.015812484282419),
		new google.maps.LatLng(42.726802657903981, 3.015972229639259)
	],
	[
		new google.maps.LatLng(42.726802657903981, 3.015972229639259),
		new google.maps.LatLng(42.726779268679977, 3.016052712992577),
		new google.maps.LatLng(42.72668751937654, 3.016308789091004)
	],
	[
		new google.maps.LatLng(42.72668751937654, 3.016308789091004),
		new google.maps.LatLng(42.726653337508097, 3.016408780777299)
	],
	[
		new google.maps.LatLng(42.726653337508097, 3.016408780777299),
		new google.maps.LatLng(42.726579577369264, 3.016614860384122),
		new google.maps.LatLng(42.726536397180325, 3.016757532914859)
	],
	[
		new google.maps.LatLng(42.726536397180325, 3.016757532914859),
		new google.maps.LatLng(42.726505810548183, 3.016863623093307),
		new google.maps.LatLng(42.726428447016986, 3.017109944528895),
		new google.maps.LatLng(42.726418550743794, 3.017144088867056),
		new google.maps.LatLng(42.726347481615704, 3.017381874919883),
		new google.maps.LatLng(42.726349271980389, 3.017430655678077)
	],
	[
		new google.maps.LatLng(42.726349271980389, 3.017430655678077),
		new google.maps.LatLng(42.726360954808406, 3.017464806006104),
		new google.maps.LatLng(42.72638882172506, 3.017503839070288),
		new google.maps.LatLng(42.726519177217327, 3.017609978049465),
		new google.maps.LatLng(42.726532662482228, 3.017619738207864),
		new google.maps.LatLng(42.726555137684528, 3.017635598939463)
	],
	[
		new google.maps.LatLng(42.726555137684528, 3.017635598939463),
		new google.maps.LatLng(42.726698081177226, 3.017742960714736),
		new google.maps.LatLng(42.726793376008658, 3.017813722272745)
	],
	[
		new google.maps.LatLng(42.726793376008658, 3.017813722272745),
		new google.maps.LatLng(42.72685810506082, 3.017862523988142),
		new google.maps.LatLng(42.727109828830272, 3.018046751058375),
		new google.maps.LatLng(42.727317499346967, 3.018206576760483),
		new google.maps.LatLng(42.727438865251713, 3.01830051995812),
		new google.maps.LatLng(42.727469429446288, 3.018337115147784),
		new google.maps.LatLng(42.727485603957071, 3.018395658782809)
	],
	[
		new google.maps.LatLng(42.727485603957071, 3.018395658782809),
		new google.maps.LatLng(42.727476599636503, 3.018467609791391),
		new google.maps.LatLng(42.727460404692891, 3.018529800935219)
	],
	[
		new google.maps.LatLng(42.727460404692891, 3.018529800935219),
		new google.maps.LatLng(42.727445111460213, 3.01857735883619)
	],
	[
		new google.maps.LatLng(42.727445111460213, 3.01857735883619),
		new google.maps.LatLng(42.727431618319244, 3.018616379431551),
		new google.maps.LatLng(42.727426212191475, 3.018677355102589),
		new google.maps.LatLng(42.727428904964974, 3.018704185584115)
	],
	[
		new google.maps.LatLng(42.727428904964974, 3.018704185584115),
		new google.maps.LatLng(42.727435189850958, 3.018757848047647),
		new google.maps.LatLng(42.727502594080512, 3.018926167080537),
		new google.maps.LatLng(42.727524164959412, 3.018976175939731),
		new google.maps.LatLng(42.727779405112358, 3.019594573334698),
		new google.maps.LatLng(42.727854898410783, 3.019775093071342)
	],
	[
		new google.maps.LatLng(42.727854898410783, 3.019775093071342),
		new google.maps.LatLng(42.728023863322363, 3.020150774548995),
		new google.maps.LatLng(42.72826293885845, 3.020632585219639),
		new google.maps.LatLng(42.728391466185542, 3.020878983229527)
	],
	[
		new google.maps.LatLng(42.728391466185542, 3.020878983229527),
		new google.maps.LatLng(42.728441798141247, 3.020975346564305),
		new google.maps.LatLng(42.728569435795144, 3.021170523915655),
		new google.maps.LatLng(42.728695285118093, 3.021313259685354),
		new google.maps.LatLng(42.72894159211026, 3.021581657463847)
	],
	[
		new google.maps.LatLng(42.729095339722377, 3.021597568468823),
		new google.maps.LatLng(42.729075563174568, 3.021576828226637),
		new google.maps.LatLng(42.729052188498386, 3.021559746431788),
		new google.maps.LatLng(42.729023418757997, 3.021551198374042),
		new google.maps.LatLng(42.728993747144337, 3.021551186828254),
		new google.maps.LatLng(42.728965872170015, 3.021562153730206),
		new google.maps.LatLng(42.72894159211026, 3.021581657463847)
	],
	[
		new google.maps.LatLng(42.729122274342096, 3.021787834141256),
		new google.maps.LatLng(42.729132173168367, 3.021747590791007),
		new google.maps.LatLng(42.729133979558263, 3.021707345812752),
		new google.maps.LatLng(42.729130388366379, 3.021679294250312),
		new google.maps.LatLng(42.729123201767713, 3.021650021537412),
		new google.maps.LatLng(42.729110619682018, 3.021621966844395),
		new google.maps.LatLng(42.729095339722377, 3.021597568468823)
	],
	[
		new google.maps.LatLng(42.729122274342096, 3.021787834141256),
		new google.maps.LatLng(42.729235536882058, 3.021923249809649),
		new google.maps.LatLng(42.729380257387419, 3.022112340649886),
		new google.maps.LatLng(42.729578011190178, 3.02237340881634),
		new google.maps.LatLng(42.729871036506822, 3.022799161232695),
		new google.maps.LatLng(42.729914180546082, 3.022866255202009),
		new google.maps.LatLng(42.729966311332092, 3.022949209025134)
	],
	[
		new google.maps.LatLng(42.729966311332092, 3.022949209025134),
		new google.maps.LatLng(42.730137987785945, 3.023216369703975),
		new google.maps.LatLng(42.730174838717012, 3.023274924906817)
	],
	[
		new google.maps.LatLng(42.730174838717012, 3.023274924906817),
		new google.maps.LatLng(42.730339321448383, 3.023537206191851),
		new google.maps.LatLng(42.730443585301309, 3.023695797931274),
		new google.maps.LatLng(42.730454371851451, 3.023710437471535),
		new google.maps.LatLng(42.730467854303399, 3.023731176445183)
	],
	[
		new google.maps.LatLng(42.730551392988069, 3.024090995957762),
		new google.maps.LatLng(42.730529852081638, 3.023917802253652),
		new google.maps.LatLng(42.730493912572719, 3.023803144840587),
		new google.maps.LatLng(42.730467854303399, 3.023731176445183)
	],
	[
		new google.maps.LatLng(42.730592707226982, 3.024292249716684),
		new google.maps.LatLng(42.73056394730331, 3.024238573937787),
		new google.maps.LatLng(42.730547779286553, 3.024167830282864),
		new google.maps.LatLng(42.730551392988069, 3.024090995957762)
	],
	[
		new google.maps.LatLng(42.730592707226982, 3.024292249716684),
		new google.maps.LatLng(42.730527050650245, 3.024380034105159)
	],
	[
		new google.maps.LatLng(42.730527050650245, 3.024380034105159),
		new google.maps.LatLng(42.730510862271288, 3.024400760337907),
		new google.maps.LatLng(42.730494672988087, 3.024421487780722)
	],
	[
		new google.maps.LatLng(42.730494672988087, 3.024421487780722),
		new google.maps.LatLng(42.730455998610779, 3.024472694647202),
		new google.maps.LatLng(42.730436211472188, 3.024499517801099)
	],
	[
		new google.maps.LatLng(42.730436211472188, 3.024499517801099),
		new google.maps.LatLng(42.730563867811078, 3.024588603302108),
		new google.maps.LatLng(42.730662764490447, 3.024619135860465),
		new google.maps.LatLng(42.730761666017045, 3.024631373244824),
		new google.maps.LatLng(42.730842582665524, 3.02464970194446),
		new google.maps.LatLng(42.730915397748241, 3.024714372675232),
		new google.maps.LatLng(42.7310151630032, 3.024877844580883),
		new google.maps.LatLng(42.731266839090466, 3.025218228081629),
		new google.maps.LatLng(42.7314798609641, 3.025517130095322),
		new google.maps.LatLng(42.731536483039093, 3.025615944496388),
		new google.maps.LatLng(42.731549957928387, 3.025664735644239),
		new google.maps.LatLng(42.731547247205469, 3.025720838539598),
		new google.maps.LatLng(42.731515743685875, 3.025863521045588),
		new google.maps.LatLng(42.731496830178834, 3.025994012920506)
	],
	[
		new google.maps.LatLng(42.731496830178834, 3.025994012920506),
		new google.maps.LatLng(42.731490504831015, 3.026124511246924),
		new google.maps.LatLng(42.731469806121801, 3.026198899504748),
		new google.maps.LatLng(42.731423038586648, 3.026253761242888),
		new google.maps.LatLng(42.731308833419902, 3.026317130167023),
		new google.maps.LatLng(42.731131691683068, 3.026374372367422),
		new google.maps.LatLng(42.731015694286882, 3.026413348650388),
		new google.maps.LatLng(42.7309338609248, 3.026463315108321),
		new google.maps.LatLng(42.730802559832973, 3.026580339307607),
		new google.maps.LatLng(42.730647869806745, 3.026740038158284),
		new google.maps.LatLng(42.730450012823233, 3.026935084239032),
		new google.maps.LatLng(42.730231477703406, 3.027121583027095),
		new google.maps.LatLng(42.730034527622188, 3.027286137655636),
		new google.maps.LatLng(42.729874450468266, 3.027411681397708),
		new google.maps.LatLng(42.729704485899838, 3.02752868195783),
		new google.maps.LatLng(42.729551610128354, 3.027622518629721),
		new google.maps.LatLng(42.729432011314543, 3.027679782410879),
		new google.maps.LatLng(42.729387054821565, 3.027680980999905),
		new google.maps.LatLng(42.729321427094824, 3.02765046025487)
	],
	[
		new google.maps.LatLng(42.718060579677157, 3.02859986378507),
		new google.maps.LatLng(42.71800753771786, 3.028576670298456),
		new google.maps.LatLng(42.717707273379467, 3.028425324191266),
		new google.maps.LatLng(42.717357565757432, 3.028241033350181),
		new google.maps.LatLng(42.717201142836537, 3.0281507265781),
		new google.maps.LatLng(42.716997075422071, 3.028031134212149),
		new google.maps.LatLng(42.71673367743098, 3.027866398511956),
		new google.maps.LatLng(42.716389370347088, 3.027656512114148),
		new google.maps.LatLng(42.716205977818667, 3.02755156418116)
	],
	[
		new google.maps.LatLng(42.729321427094824, 3.02765046025487),
		new google.maps.LatLng(42.729297140650061, 3.027688255331156),
		new google.maps.LatLng(42.729252164848624, 3.027761408429556)
	],
	[
		new google.maps.LatLng(42.723267104969793, 3.029603597313593),
		new google.maps.LatLng(42.723534143003754, 3.029604952053284),
		new google.maps.LatLng(42.723874017078487, 3.029583175310679),
		new google.maps.LatLng(42.724409012565737, 3.029518814185264),
		new google.maps.LatLng(42.724913441060203, 3.029442241714838),
		new google.maps.LatLng(42.725283902670448, 3.029359502934186),
		new google.maps.LatLng(42.725387307838517, 3.029336385074974),
		new google.maps.LatLng(42.725903436975074, 3.029217132255466),
		new google.maps.LatLng(42.726028425329595, 3.029181829404315),
		new google.maps.LatLng(42.726387202426793, 3.029080788105712),
		new google.maps.LatLng(42.726855690198896, 3.028920043747929),
		new google.maps.LatLng(42.727221669632826, 3.028784856639755),
		new google.maps.LatLng(42.727721646559026, 3.028547290204802),
		new google.maps.LatLng(42.728215326229915, 3.028321913403885),
		new google.maps.LatLng(42.728664952198564, 3.028081876813908),
		new google.maps.LatLng(42.729058834537646, 3.027834491085743),
		new google.maps.LatLng(42.72919012356725, 3.027768696346222),
		new google.maps.LatLng(42.729252164848624, 3.027761408429556)
	],
	[
		new google.maps.LatLng(42.720501476365207, 3.029369285739012),
		new google.maps.LatLng(42.719450075900546, 3.029150050796732),
		new google.maps.LatLng(42.719217619536401, 3.029060136436958),
		new google.maps.LatLng(42.71891195136125, 3.02894170452626),
		new google.maps.LatLng(42.718766309353782, 3.028887979759777),
		new google.maps.LatLng(42.718594594681541, 3.028824488035285),
		new google.maps.LatLng(42.718327585393844, 3.028719491699476),
		new google.maps.LatLng(42.718060579677157, 3.02859986378507)
	],
	[
		new google.maps.LatLng(42.721118232119643, 3.029512268117188),
		new google.maps.LatLng(42.721008544174268, 3.029496360496468),
		new google.maps.LatLng(42.72071454382948, 3.029454750856514),
		new google.maps.LatLng(42.72059047382848, 3.029422983794282),
		new google.maps.LatLng(42.720501476365207, 3.029369285739012)
	],
	[
		new google.maps.LatLng(42.721118232119643, 3.029512268117188),
		new google.maps.LatLng(42.721320525587451, 3.029544075379977),
		new google.maps.LatLng(42.721738605915192, 3.029582089524121),
		new google.maps.LatLng(42.722158485933114, 3.029612788925806),
		new google.maps.LatLng(42.722199845625099, 3.029612809919761),
		new google.maps.LatLng(42.722500150264281, 3.02962027941266),
		new google.maps.LatLng(42.722841817805062, 3.029611917816478),
		new google.maps.LatLng(42.723089971234771, 3.02962667744979)
	],
	[
		new google.maps.LatLng(42.723089971234771, 3.02962667744979),
		new google.maps.LatLng(42.723267104969793, 3.029603597313593)
	]
];

var circuit_7 = [
	[
		new google.maps.LatLng(42.698492512792079, 2.89154349763967),
		new google.maps.LatLng(42.698395588830174, 2.89172042447367),
		new google.maps.LatLng(42.698295073838921, 2.891903452252503)
	],
	[
		new google.maps.LatLng(42.69860770243686, 2.891646893559083),
		new google.maps.LatLng(42.698585204391264, 2.891627432696858),
		new google.maps.LatLng(42.698492512792079, 2.89154349763967)
	],
	[
		new google.maps.LatLng(42.699012647916305, 2.891993542157006),
		new google.maps.LatLng(42.69898295197352, 2.891967999508974),
		new google.maps.LatLng(42.698652696718533, 2.891685816549613),
		new google.maps.LatLng(42.698625700203287, 2.891662706851956),
		new google.maps.LatLng(42.69860770243686, 2.891646893559083)
	],
	[
		new google.maps.LatLng(42.698657717023707, 2.892206296692846),
		new google.maps.LatLng(42.698340071246804, 2.891944812590388),
		new google.maps.LatLng(42.698295073838921, 2.891903452252503)
	],
	[
		new google.maps.LatLng(42.699012647916305, 2.891993542157006),
		new google.maps.LatLng(42.699122433805371, 2.892088416480798),
		new google.maps.LatLng(42.699296108449488, 2.892235589583323)
	],
	[
		new google.maps.LatLng(42.698780096836828, 2.89230724302224),
		new google.maps.LatLng(42.698657717023707, 2.892206296692846)
	],
	[
		new google.maps.LatLng(42.700544069225906, 2.893138986078983),
		new google.maps.LatLng(42.700451395923324, 2.893073331195164),
		new google.maps.LatLng(42.699647933749858, 2.892510423860013),
		new google.maps.LatLng(42.699377999292139, 2.892307356072131),
		new google.maps.LatLng(42.699350101239766, 2.892281809997915),
		new google.maps.LatLng(42.699296108449488, 2.892235589583323)
	],
	[
		new google.maps.LatLng(42.700377364973242, 2.893670766777769),
		new google.maps.LatLng(42.700280186968861, 2.893595368032622),
		new google.maps.LatLng(42.700269388243925, 2.893585635600061),
		new google.maps.LatLng(42.700052510373581, 2.893389777213115),
		new google.maps.LatLng(42.699875244122026, 2.893246263235594),
		new google.maps.LatLng(42.699862646647546, 2.893236534026634),
		new google.maps.LatLng(42.699704271403206, 2.893102738001122),
		new google.maps.LatLng(42.699550394433778, 2.892972591615548),
		new google.maps.LatLng(42.699373106100786, 2.892807138516515),
		new google.maps.LatLng(42.699149016807326, 2.892594233977648),
		new google.maps.LatLng(42.698958265048859, 2.892453187601102),
		new google.maps.LatLng(42.698945669557354, 2.892444677997482),
		new google.maps.LatLng(42.698849384581223, 2.892364405378005),
		new google.maps.LatLng(42.698780096836828, 2.89230724302224)
	],
	[
		new google.maps.LatLng(42.701074632619772, 2.89323187524508),
		new google.maps.LatLng(42.70106923736251, 2.893231884541591),
		new google.maps.LatLng(42.701010791530152, 2.893227116415627),
		new google.maps.LatLng(42.700972125303089, 2.893222310551887),
		new google.maps.LatLng(42.700644811648296, 2.893182684066097),
		new google.maps.LatLng(42.700589953445487, 2.893169375702544)
	],
	[
		new google.maps.LatLng(42.701222996048124, 2.893243792336334),
		new google.maps.LatLng(42.701074632619772, 2.89323187524508)
	],
	[
		new google.maps.LatLng(42.701341190850911, 2.893658036153816),
		new google.maps.LatLng(42.701222996048124, 2.893243792336334)
	],
	[
		new google.maps.LatLng(42.701436615760421, 2.893778544359122),
		new google.maps.LatLng(42.701341190850911, 2.893658036153816)
	],
	[
		new google.maps.LatLng(42.700469120612304, 2.893718140147874),
		new google.maps.LatLng(42.700377364973242, 2.893670766777769)
	],
	[
		new google.maps.LatLng(42.700703896590582, 2.893828639868951),
		new google.maps.LatLng(42.700613949949904, 2.893792234642121),
		new google.maps.LatLng(42.700469120612304, 2.893718140147874)
	],
	[
		new google.maps.LatLng(42.701491764321723, 2.894084413631446),
		new google.maps.LatLng(42.701464646517138, 2.893938182757946),
		new google.maps.LatLng(42.701461033185922, 2.893921122880886),
		new google.maps.LatLng(42.701436615760421, 2.893778544359122)
	],
	[
		new google.maps.LatLng(42.700703896590582, 2.893828639868951),
		new google.maps.LatLng(42.700871195825336, 2.893895379158007),
		new google.maps.LatLng(42.700882888440447, 2.893900234061833),
		new google.maps.LatLng(42.700904474479778, 2.893907508271119),
		new google.maps.LatLng(42.700932357641264, 2.893918428512181)
	],
	[
		new google.maps.LatLng(42.700932357641264, 2.893918428512181),
		new google.maps.LatLng(42.701004296813871, 2.893929268464264)
	],
	[
		new google.maps.LatLng(42.701004296813871, 2.893929268464264),
		new google.maps.LatLng(42.701166162617866, 2.893957010733756)
	],
	[
		new google.maps.LatLng(42.701166162617866, 2.893957010733756),
		new google.maps.LatLng(42.701288493022737, 2.89401042347459)
	],
	[
		new google.maps.LatLng(42.701288493022737, 2.89401042347459),
		new google.maps.LatLng(42.701408111484092, 2.89404799558804),
		new google.maps.LatLng(42.701431495331953, 2.89405526683653),
		new google.maps.LatLng(42.701471973845692, 2.894074697515321),
		new google.maps.LatLng(42.701491764321723, 2.894084413631446)
	],
	[
		new google.maps.LatLng(42.701491764321723, 2.894084413631446),
		new google.maps.LatLng(42.701631634591692, 2.894601018150117)
	],
	[
		new google.maps.LatLng(42.701533136755941, 2.894098966622619),
		new google.maps.LatLng(42.701568215238431, 2.89411231103362),
		new google.maps.LatLng(42.701730158874724, 2.894218070871671),
		new google.maps.LatLng(42.701753550635082, 2.894233875279812)
	],
	[
		new google.maps.LatLng(42.701753550635082, 2.894233875279812),
		new google.maps.LatLng(42.701836327349696, 2.894293457019456)
	],
	[
		new google.maps.LatLng(42.701836327349696, 2.894293457019456),
		new google.maps.LatLng(42.701902906724619, 2.894339658436957),
		new google.maps.LatLng(42.702002795861354, 2.894429684407389),
		new google.maps.LatLng(42.702043312022802, 2.894486904763495)
	],
	[
		new google.maps.LatLng(42.702043312022802, 2.894486904763495),
		new google.maps.LatLng(42.702066721351571, 2.894519775551793),
		new google.maps.LatLng(42.702120773207348, 2.894626951140069)
	],
	[
		new google.maps.LatLng(42.701631634591692, 2.894601018150117),
		new google.maps.LatLng(42.701653298375916, 2.894687528789528),
		new google.maps.LatLng(42.701682178590033, 2.894798405840421)
	],
	[
		new google.maps.LatLng(42.702272141929612, 2.894952156641665),
		new google.maps.LatLng(42.702136086679381, 2.894656180127675),
		new google.maps.LatLng(42.702131584017479, 2.894648874025843),
		new google.maps.LatLng(42.702120773207348, 2.894626951140069)
	],
	[
		new google.maps.LatLng(42.701682178590033, 2.894798405840421),
		new google.maps.LatLng(42.701726397506619, 2.894964111017901)
	],
	[
		new google.maps.LatLng(42.702272141929612, 2.894952156641665),
		new google.maps.LatLng(42.702400086034189, 2.895228643103193),
		new google.maps.LatLng(42.702433446374748, 2.895324886589186),
		new google.maps.LatLng(42.702478530758306, 2.895456460006729),
		new google.maps.LatLng(42.702605670025825, 2.895831692357983),
		new google.maps.LatLng(42.702803103576734, 2.896377465482608),
		new google.maps.LatLng(42.702857195356678, 2.896528529390893),
		new google.maps.LatLng(42.702939239335699, 2.896761219927415),
		new google.maps.LatLng(42.703031237505733, 2.897062158064985),
		new google.maps.LatLng(42.703083612933327, 2.897298559733928),
		new google.maps.LatLng(42.70310900571171, 2.897526474386049),
		new google.maps.LatLng(42.703126312872413, 2.897760499496095),
		new google.maps.LatLng(42.703131815235444, 2.8978738603563),
		new google.maps.LatLng(42.703133648539655, 2.897910429150008)
	],
	[
		new google.maps.LatLng(42.701726397506619, 2.894964111017901),
		new google.maps.LatLng(42.701927628927912, 2.895712222792657)
	],
	[
		new google.maps.LatLng(42.701927628927912, 2.895712222792657),
		new google.maps.LatLng(42.702058475580039, 2.896202033456871)
	],
	[
		new google.maps.LatLng(42.702058475580039, 2.896202033456871),
		new google.maps.LatLng(42.702155034527422, 2.896568785147483),
		new google.maps.LatLng(42.702221848619153, 2.89686001226631)
	],
	[
		new google.maps.LatLng(42.702221848619153, 2.89686001226631),
		new google.maps.LatLng(42.702291373052269, 2.897164644915401),
		new google.maps.LatLng(42.70231134668164, 2.897365747980607),
		new google.maps.LatLng(42.702300661080365, 2.897474260282907)
	],
	[
		new google.maps.LatLng(42.701874094414535, 2.898953672876079),
		new google.maps.LatLng(42.701990637541542, 2.898593860911188),
		new google.maps.LatLng(42.702100922461945, 2.898273067806265),
		new google.maps.LatLng(42.702184307076919, 2.898029118473374),
		new google.maps.LatLng(42.702256037709304, 2.897821759005262),
		new google.maps.LatLng(42.702296371800472, 2.89769003475908),
		new google.maps.LatLng(42.702306229588977, 2.897655884673839),
		new google.maps.LatLng(42.70230978179319, 2.897609554960028),
		new google.maps.LatLng(42.702308822928927, 2.897547386994371),
		new google.maps.LatLng(42.702300661080365, 2.897474260282907)
	],
	[
		new google.maps.LatLng(42.703133648539655, 2.897910429150008),
		new google.maps.LatLng(42.703146354549581, 2.898034747774753),
		new google.maps.LatLng(42.703162642981603, 2.898144432805622),
		new google.maps.LatLng(42.703180693563283, 2.898216324990889)
	],
	[
		new google.maps.LatLng(42.703180693563283, 2.898216324990889),
		new google.maps.LatLng(42.703209595175139, 2.898354025580134),
		new google.maps.LatLng(42.703279121029865, 2.898664760476617),
		new google.maps.LatLng(42.703286341930664, 2.898694005458816)
	],
	[
		new google.maps.LatLng(42.703286341930664, 2.898694005458816),
		new google.maps.LatLng(42.703389274205264, 2.899154624159877)
	],
	[
		new google.maps.LatLng(42.701799688101623, 2.899186633337723),
		new google.maps.LatLng(42.701874094414535, 2.898953672876079)
	],
	[
		new google.maps.LatLng(42.703389274205264, 2.899154624159877),
		new google.maps.LatLng(42.703410979274899, 2.899288681612278),
		new google.maps.LatLng(42.703438090383095, 2.899436140032849),
		new google.maps.LatLng(42.703447158759168, 2.89951780017671),
		new google.maps.LatLng(42.703449023430252, 2.899588501149227),
		new google.maps.LatLng(42.703445475791419, 2.899640926112112)
	],
	[
		new google.maps.LatLng(42.701628446126897, 2.899705007800984),
		new google.maps.LatLng(42.701771894976652, 2.899270793591425),
		new google.maps.LatLng(42.701799688101623, 2.899186633337723)
	],
	[
		new google.maps.LatLng(42.703445475791419, 2.899640926112112),
		new google.maps.LatLng(42.703445482235388, 2.899648240013095),
		new google.maps.LatLng(42.703438332492105, 2.899693358110503),
		new google.maps.LatLng(42.703433854669392, 2.899712869526606)
	],
	[
		new google.maps.LatLng(42.701269832067737, 2.900807601732755),
		new google.maps.LatLng(42.701315557592679, 2.900668556788892),
		new google.maps.LatLng(42.701533413226706, 2.899995294757503),
		new google.maps.LatLng(42.701628446126897, 2.899705007800984)
	],
	[
		new google.maps.LatLng(42.70354457045643, 2.899846774848981),
		new google.maps.LatLng(42.703520244177426, 2.899793177940817),
		new google.maps.LatLng(42.703503139570884, 2.899770045676031),
		new google.maps.LatLng(42.703484244651229, 2.899755449629613),
		new google.maps.LatLng(42.703433854669392, 2.899712869526606)
	],
	[
		new google.maps.LatLng(42.703586080733807, 2.900008837225463),
		new google.maps.LatLng(42.703564424207869, 2.899925978984545),
		new google.maps.LatLng(42.70354457045643, 2.899846774848981)
	],
	[
		new google.maps.LatLng(42.703890400798954, 2.901434608133389),
		new google.maps.LatLng(42.703885874459502, 2.901400481877729),
		new google.maps.LatLng(42.703841589563346, 2.901153089851549),
		new google.maps.LatLng(42.703747666731061, 2.900703418520488),
		new google.maps.LatLng(42.703675441800975, 2.900384151220122),
		new google.maps.LatLng(42.703654672269316, 2.900287881605131),
		new google.maps.LatLng(42.703640232180447, 2.900229392147545),
		new google.maps.LatLng(42.703626687145999, 2.900166023692311),
		new google.maps.LatLng(42.703607726844069, 2.900081942819782),
		new google.maps.LatLng(42.703586080733807, 2.900008837225463)
	],
	[
		new google.maps.LatLng(42.708734176863203, 2.907809909649665),
		new google.maps.LatLng(42.706830866412687, 2.90185510266988),
		new google.maps.LatLng(42.70668029376403, 2.90139696986571),
		new google.maps.LatLng(42.706569388134312, 2.901054587333058),
		new google.maps.LatLng(42.706481018154854, 2.900776781327726),
		new google.maps.LatLng(42.706424220120198, 2.900609860027541),
		new google.maps.LatLng(42.705466722041855, 2.901639185407021)
	],
	[
		new google.maps.LatLng(42.70108782656844, 2.901362553797954),
		new google.maps.LatLng(42.701128173057839, 2.901239367311141),
		new google.maps.LatLng(42.701269832067737, 2.900807601732755)
	],
	[
		new google.maps.LatLng(42.700892372952779, 2.901961410427354),
		new google.maps.LatLng(42.700943476532082, 2.901802855280345),
		new google.maps.LatLng(42.701033132181372, 2.901525992763792),
		new google.maps.LatLng(42.70108782656844, 2.901362553797954)
	],
	[
		new google.maps.LatLng(42.703915718528798, 2.901589385444849),
		new google.maps.LatLng(42.703904870529207, 2.90152601212545),
		new google.maps.LatLng(42.703890400798954, 2.901434608133389)
	],
	[
		new google.maps.LatLng(42.705118931580238, 2.901817757712142),
		new google.maps.LatLng(42.705115309971546, 2.901789725221894),
		new google.maps.LatLng(42.705116153158848, 2.901728769726434),
		new google.maps.LatLng(42.705125102427175, 2.901683649008609),
		new google.maps.LatLng(42.705141247909097, 2.901642172688781),
		new google.maps.LatLng(42.705163690096995, 2.901603123978337),
		new google.maps.LatLng(42.705194224858914, 2.901565281809294),
		new google.maps.LatLng(42.705223871686179, 2.901539630402379),
		new google.maps.LatLng(42.705251733184227, 2.901527393071348),
		new google.maps.LatLng(42.705271505408909, 2.901518825650828),
		new google.maps.LatLng(42.70528678896158, 2.901517580709269)
	],
	[
		new google.maps.LatLng(42.70528678896158, 2.901517580709269),
		new google.maps.LatLng(42.705324552302109, 2.901518735231695),
		new google.maps.LatLng(42.70535692745829, 2.901525995468244),
		new google.maps.LatLng(42.705385714507301, 2.901543014415583),
		new google.maps.LatLng(42.705416304639115, 2.901566125227),
		new google.maps.LatLng(42.70544420676115, 2.901597773909333),
		new google.maps.LatLng(42.705466722041855, 2.901639185407021),
		new google.maps.LatLng(42.705483850165059, 2.901687919635236),
		new google.maps.LatLng(42.705491992634229, 2.901742765302917),
		new google.maps.LatLng(42.705493842563243, 2.901800058602529),
		new google.maps.LatLng(42.705485797861201, 2.901851274079471),
		new google.maps.LatLng(42.705467862884937, 2.90190250642264),
		new google.maps.LatLng(42.705449017131123, 2.901941548303652),
		new google.maps.LatLng(42.70542387240512, 2.901974506632795)
	],
	[
		new google.maps.LatLng(42.703974477133968, 2.901934279271521),
		new google.maps.LatLng(42.703940139843375, 2.901747821288874),
		new google.maps.LatLng(42.703931991062888, 2.901685663035474),
		new google.maps.LatLng(42.703915718528798, 2.901589385444849)
	],
	[
		new google.maps.LatLng(42.704752245147766, 2.901980512793208),
		new google.maps.LatLng(42.704792676434657, 2.901948748830318),
		new google.maps.LatLng(42.704836707548637, 2.901921855584611),
		new google.maps.LatLng(42.704899613499173, 2.901887614669852),
		new google.maps.LatLng(42.704965222770696, 2.901859466513191),
		new google.maps.LatLng(42.705022747854244, 2.901839863405574),
		new google.maps.LatLng(42.705066791400469, 2.901826379964818),
		new google.maps.LatLng(42.705118931580238, 2.901817757712142)
	],
	[
		new google.maps.LatLng(42.70542387240512, 2.901974506632795),
		new google.maps.LatLng(42.705399615639458, 2.901995271666721),
		new google.maps.LatLng(42.705369964515306, 2.902016046435883),
		new google.maps.LatLng(42.705339402641698, 2.902024630772918),
		new google.maps.LatLng(42.705307939311403, 2.902030778890042),
		new google.maps.LatLng(42.705271970648006, 2.90202596293402),
		new google.maps.LatLng(42.705237794560205, 2.902015049453408),
		new google.maps.LatLng(42.705199106989895, 2.901987076030667),
		new google.maps.LatLng(42.705167604091187, 2.901949337087116),
		new google.maps.LatLng(42.705143291254025, 2.901909147948247),
		new google.maps.LatLng(42.70512255093093, 2.901842133154652),
		new google.maps.LatLng(42.705118931580238, 2.901817757712142)
	],
	[
		new google.maps.LatLng(42.704087432430562, 2.902555808918596),
		new google.maps.LatLng(42.704057639672932, 2.902421761601294),
		new google.maps.LatLng(42.704000681263224, 2.902076864006688),
		new google.maps.LatLng(42.703974477133968, 2.901934279271521)
	],
	[
		new google.maps.LatLng(42.700538646163842, 2.902531271316787),
		new google.maps.LatLng(42.700661692042708, 2.90238722525925),
		new google.maps.LatLng(42.700737127628891, 2.902289580071286),
		new google.maps.LatLng(42.700793683026419, 2.902193185007895),
		new google.maps.LatLng(42.700834966154659, 2.90211022420537),
		new google.maps.LatLng(42.700855601406488, 2.902061428946538),
		new google.maps.LatLng(42.700892372952779, 2.901961410427354)
	],
	[
		new google.maps.LatLng(42.704462065278335, 2.902233348652917),
		new google.maps.LatLng(42.704628268283592, 2.90208921858031),
		new google.maps.LatLng(42.7047315807215, 2.901996395468868),
		new google.maps.LatLng(42.704752245147766, 2.901980512793208)
	],
	[
		new google.maps.LatLng(42.704087432430562, 2.902555808918596),
		new google.maps.LatLng(42.704302150578357, 2.902371370999666),
		new google.maps.LatLng(42.704446793079462, 2.902246783839313)
	],
	[
		new google.maps.LatLng(42.700442540635777, 2.902638703042277),
		new google.maps.LatLng(42.700538646163842, 2.902531271316787)
	],
	[
		new google.maps.LatLng(42.699937744648615, 2.903189303481558),
		new google.maps.LatLng(42.700146133354039, 2.902965883756206),
		new google.maps.LatLng(42.700240442275145, 2.902858457089688),
		new google.maps.LatLng(42.700442540635777, 2.902638703042277)
	],
	[
		new google.maps.LatLng(42.699390721501885, 2.903777750680236),
		new google.maps.LatLng(42.699605398765009, 2.903545793566326),
		new google.maps.LatLng(42.699892832364561, 2.903236917450018),
		new google.maps.LatLng(42.699937744648615, 2.903189303481558)
	],
	[
		new google.maps.LatLng(42.701007790840876, 2.903316738099841),
		new google.maps.LatLng(42.700973707013546, 2.903406999503575),
		new google.maps.LatLng(42.700968326094504, 2.903422855693013)
	],
	[
		new google.maps.LatLng(42.699333233756903, 2.903838794521371),
		new google.maps.LatLng(42.699390721501885, 2.903777750680236)
	],
	[
		new google.maps.LatLng(42.698534664963525, 2.904656804248615),
		new google.maps.LatLng(42.698566127553278, 2.904650658138286),
		new google.maps.LatLng(42.698598476233748, 2.904628663463253),
		new google.maps.LatLng(42.698655068110597, 2.904571280352397),
		new google.maps.LatLng(42.69897124748136, 2.904230674740847),
		new google.maps.LatLng(42.699323354691359, 2.903851000520579),
		new google.maps.LatLng(42.699333233756903, 2.903838794521371)
	],
	[
		new google.maps.LatLng(42.698749328228729, 2.905420731930758),
		new google.maps.LatLng(42.6987096343804, 2.905269647062052),
		new google.maps.LatLng(42.698637482650469, 2.905017443354719),
		new google.maps.LatLng(42.698589682591091, 2.904850525489329),
		new google.maps.LatLng(42.698534664963525, 2.904656804248615)
	],
	[
		new google.maps.LatLng(42.698829504386737, 2.905597349642507),
		new google.maps.LatLng(42.698790718228388, 2.905456015042742),
		new google.maps.LatLng(42.698749328228729, 2.905420731930758)
	],
	[
		new google.maps.LatLng(42.698829504386737, 2.905597349642507),
		new google.maps.LatLng(42.69894753667397, 2.905881173558698),
		new google.maps.LatLng(42.698988099105428, 2.905998127324691),
		new google.maps.LatLng(42.69900340675197, 2.90602492026037),
		new google.maps.LatLng(42.699016901488804, 2.906033431266939),
		new google.maps.LatLng(42.699035782643151, 2.906033400193802),
		new google.maps.LatLng(42.699043872169568, 2.906030949315737),
		new google.maps.LatLng(42.699053759515472, 2.906028495710602),
		new google.maps.LatLng(42.699069924485777, 2.906006528571856),
		new google.maps.LatLng(42.69908157252619, 2.905960189475407),
		new google.maps.LatLng(42.699098410746394, 2.905682240160169)
	],
	[
		new google.maps.LatLng(42.699103250810516, 2.906074735997345),
		new google.maps.LatLng(42.699118586258294, 2.906132001866841),
		new google.maps.LatLng(42.69912402449598, 2.906181970568062),
		new google.maps.LatLng(42.699121383112022, 2.906245360218887),
		new google.maps.LatLng(42.699116019750242, 2.906281937773735),
		new google.maps.LatLng(42.699113354456358, 2.906318511243273),
		new google.maps.LatLng(42.699113384325138, 2.906352642022985),
		new google.maps.LatLng(42.699118805536003, 2.906383106737316),
		new google.maps.LatLng(42.699135934642754, 2.906435493980748),
		new google.maps.LatLng(42.699255755669213, 2.906710785475305),
		new google.maps.LatLng(42.69933410837394, 2.906861812047571),
		new google.maps.LatLng(42.699374637128273, 2.906940979550563),
		new google.maps.LatLng(42.699543874725791, 2.907178406417757),
		new google.maps.LatLng(42.699723895679298, 2.907410942414769),
		new google.maps.LatLng(42.699847219476069, 2.907580182757177),
		new google.maps.LatLng(42.699880526163689, 2.907626451442788),
		new google.maps.LatLng(42.699935435776567, 2.907701940754567),
		new google.maps.LatLng(42.699964235654043, 2.907734807384516),
		new google.maps.LatLng(42.700013732173836, 2.907788363210349),
		new google.maps.LatLng(42.700079436139795, 2.907868711639143),
		new google.maps.LatLng(42.700136145296369, 2.907945418061084),
		new google.maps.LatLng(42.700176664518921, 2.908014835130417),
		new google.maps.LatLng(42.700221695252885, 2.908102530644035),
		new google.maps.LatLng(42.700319860732996, 2.908292535920355),
		new google.maps.LatLng(42.700426141836424, 2.908511785249142),
		new google.maps.LatLng(42.700521604644919, 2.908696920885231),
		new google.maps.LatLng(42.700567504095361, 2.90874926514306),
		new google.maps.LatLng(42.700620593747608, 2.908799161443572),
		new google.maps.LatLng(42.700682676223757, 2.908851479614285),
		new google.maps.LatLng(42.700786117521289, 2.908903734644669),
		new google.maps.LatLng(42.700802305395342, 2.908908585764603),
		new google.maps.LatLng(42.700989370532852, 2.908969242547669),
		new google.maps.LatLng(42.701332901527145, 2.909056473721748),
		new google.maps.LatLng(42.701464200252978, 2.909091620278928),
		new google.maps.LatLng(42.70166474339738, 2.9091425048666),
		new google.maps.LatLng(42.701890463257278, 2.909194571027494),
		new google.maps.LatLng(42.701994767042031, 2.909204159651649),
		new google.maps.LatLng(42.702045115806946, 2.909202862847369),
		new google.maps.LatLng(42.702090063482082, 2.909194258984475),
		new google.maps.LatLng(42.702177247070921, 2.909158772014665),
		new google.maps.LatLng(42.702267113380707, 2.909107432878107),
		new google.maps.LatLng(42.702326426914098, 2.909075645913831),
		new google.maps.LatLng(42.702363283043184, 2.909067055015036),
		new google.maps.LatLng(42.70239745165258, 2.90906943995137),
		new google.maps.LatLng(42.702431622280912, 2.909075481782776),
		new google.maps.LatLng(42.702513483186308, 2.909125334005322),
		new google.maps.LatLng(42.702608847313229, 2.909194669250585),
		new google.maps.LatLng(42.702650234258279, 2.90922873770768)
	],
	[
		new google.maps.LatLng(42.709622994671072, 2.909445854203931),
		new google.maps.LatLng(42.709581615641078, 2.909422754929098),
		new google.maps.LatLng(42.709447578499244, 2.909340059605166),
		new google.maps.LatLng(42.709275754876018, 2.909229382315322),
		new google.maps.LatLng(42.709220869649933, 2.909183139824883),
		new google.maps.LatLng(42.709175878471328, 2.909140538978592),
		new google.maps.LatLng(42.709149771334921, 2.909101566558293),
		new google.maps.LatLng(42.709125453316247, 2.909052837956149),
		new google.maps.LatLng(42.709084917294625, 2.908962683539686),
		new google.maps.LatLng(42.709052473707807, 2.908873735619725),
		new google.maps.LatLng(42.709020015481784, 2.908767718453074),
		new google.maps.LatLng(42.708978544913379, 2.908637333211613),
		new google.maps.LatLng(42.708946986806495, 2.908532535686987),
		new google.maps.LatLng(42.708927132269167, 2.908446006144353),
		new google.maps.LatLng(42.708921727215369, 2.908433822796253),
		new google.maps.LatLng(42.708909114465271, 2.908404583214707),
		new google.maps.LatLng(42.708868543740252, 2.90827419711686),
		new google.maps.LatLng(42.708855017921877, 2.908229109127483),
		new google.maps.LatLng(42.708822555162875, 2.90811821709244),
		new google.maps.LatLng(42.708766653548231, 2.907935431643086),
		new google.maps.LatLng(42.708734176863203, 2.907809909649665)
	],
	[
		new google.maps.LatLng(42.702650234258279, 2.90922873770768),
		new google.maps.LatLng(42.702639461015465, 2.909247040469781),
		new google.maps.LatLng(42.702627794236001, 2.909272658347837),
		new google.maps.LatLng(42.702620619464717, 2.909293392137874),
		new google.maps.LatLng(42.702613450583954, 2.909322660322931),
		new google.maps.LatLng(42.70260358832747, 2.909355589347074),
		new google.maps.LatLng(42.702600910409366, 2.909377535917726)
	],
	[
		new google.maps.LatLng(42.702600910409366, 2.909377535917726),
		new google.maps.LatLng(42.70260093846116, 2.909411668621281),
		new google.maps.LatLng(42.702600957711013, 2.909433611246234),
		new google.maps.LatLng(42.702604579377805, 2.909464081793585)
	],
	[
		new google.maps.LatLng(42.710099949423721, 2.911026394880868),
		new google.maps.LatLng(42.710090054465788, 2.911021533441917),
		new google.maps.LatLng(42.710072956858866, 2.911003271265539),
		new google.maps.LatLng(42.710058541287736, 2.91096793804021),
		new google.maps.LatLng(42.710028789768636, 2.910870448372298),
		new google.maps.LatLng(42.709986398419517, 2.910710799758693),
		new google.maps.LatLng(42.709925977357955, 2.910493878289433),
		new google.maps.LatLng(42.709864655623669, 2.910276958547045),
		new google.maps.LatLng(42.709840311263619, 2.910195311745252),
		new google.maps.LatLng(42.70977718150732, 2.909966203721134),
		new google.maps.LatLng(42.709769064081705, 2.909935736152553),
		new google.maps.LatLng(42.709723971414462, 2.909773656190181),
		new google.maps.LatLng(42.709686996928042, 2.909642042723435),
		new google.maps.LatLng(42.709622994671072, 2.909445854203931)
	],
	[
		new google.maps.LatLng(42.702604579377805, 2.909464081793585),
		new google.maps.LatLng(42.70260999684897, 2.909490891594881),
		new google.maps.LatLng(42.702616310836888, 2.909515262561025),
		new google.maps.LatLng(42.702627124521236, 2.909543282649231),
		new google.maps.LatLng(42.702634334954162, 2.909563995411645),
		new google.maps.LatLng(42.702647842970194, 2.90958957405331),
		new google.maps.LatLng(42.702665841141027, 2.909609050493624)
	],
	[
		new google.maps.LatLng(42.702665841141027, 2.909609050493624),
		new google.maps.LatLng(42.702689238434139, 2.909633394137797),
		new google.maps.LatLng(42.702709933710146, 2.909651648514293),
		new google.maps.LatLng(42.702728825495434, 2.90966502802089),
		new google.maps.LatLng(42.70274861367308, 2.909673531157175),
		new google.maps.LatLng(42.702767498689404, 2.90967837747947),
		new google.maps.LatLng(42.702779186763038, 2.909678359221167)
	],
	[
		new google.maps.LatLng(42.702779186763038, 2.909678359221167),
		new google.maps.LatLng(42.702779280076754, 2.909789290823976),
		new google.maps.LatLng(42.702791382345062, 2.910281760760241),
		new google.maps.LatLng(42.702794139754019, 2.910353679385741),
		new google.maps.LatLng(42.702801490331822, 2.910541399451446),
		new google.maps.LatLng(42.702824469104755, 2.911143565307212),
		new google.maps.LatLng(42.702830008321499, 2.911317878632595)
	],
	[
		new google.maps.LatLng(42.710099949423721, 2.911026394880868),
		new google.maps.LatLng(42.710054188619715, 2.911139849288894),
		new google.maps.LatLng(42.710010179063403, 2.911195998176034),
		new google.maps.LatLng(42.709947300688192, 2.911268026550401),
		new google.maps.LatLng(42.709900609025915, 2.911342466990204),
		new google.maps.LatLng(42.709891672056443, 2.911408316704016),
		new google.maps.LatLng(42.710061284770873, 2.912111527247574),
		new google.maps.LatLng(42.710256091284805, 2.912843965037979),
		new google.maps.LatLng(42.710388633396683, 2.913303401679483),
		new google.maps.LatLng(42.710444506068868, 2.913461813517393),
		new google.maps.LatLng(42.710604051451135, 2.913961446509595),
		new google.maps.LatLng(42.710847399771502, 2.914696263869972),
		new google.maps.LatLng(42.710997075794744, 2.915230056601967),
		new google.maps.LatLng(42.711144961410717, 2.915776044895126),
		new google.maps.LatLng(42.711186406697863, 2.915885713349349),
		new google.maps.LatLng(42.711288251693304, 2.916198903232246),
		new google.maps.LatLng(42.71143875489782, 2.9166497961224),
		new google.maps.LatLng(42.711688391065969, 2.917400476075004),
		new google.maps.LatLng(42.711890230067816, 2.917970785563095),
		new google.maps.LatLng(42.711988465792352, 2.91827423436732),
		new google.maps.LatLng(42.712071423919411, 2.918589897386303),
		new google.maps.LatLng(42.712341067016517, 2.919660005387853),
		new google.maps.LatLng(42.712754943986639, 2.921254200356812),
		new google.maps.LatLng(42.713120128642487, 2.922687541220853),
		new google.maps.LatLng(42.713176034698783, 2.922910589270865),
		new google.maps.LatLng(42.713346435888745, 2.923563882780485),
		new google.maps.LatLng(42.713558346112976, 2.924435373593338),
		new google.maps.LatLng(42.714160644669484, 2.92687069203517),
		new google.maps.LatLng(42.714414351762855, 2.928024754196724),
		new google.maps.LatLng(42.714727918685931, 2.929451197591979),
		new google.maps.LatLng(42.715331091437228, 2.932025615269051),
		new google.maps.LatLng(42.715364413759495, 2.93211336493738),
		new google.maps.LatLng(42.715398606163774, 2.932153561726978),
		new google.maps.LatLng(42.715448073544046, 2.93217910996929),
		new google.maps.LatLng(42.715510122535193, 2.932194887450382),
		new google.maps.LatLng(42.71561263024401, 2.932209399837842),
		new google.maps.LatLng(42.71581226180303, 2.932253062604013),
		new google.maps.LatLng(42.715869821587745, 2.932278601029014),
		new google.maps.LatLng(42.715919299980001, 2.932321219590559),
		new google.maps.LatLng(42.715941806240444, 2.932366306943942),
		new google.maps.LatLng(42.715945452499874, 2.932445558658417)
	],
	[
		new google.maps.LatLng(42.702830008321499, 2.911317878632595),
		new google.maps.LatLng(42.702830928509989, 2.911343476968451),
		new google.maps.LatLng(42.702833752293984, 2.911495851472269),
		new google.maps.LatLng(42.702837456411594, 2.911626283218699),
		new google.maps.LatLng(42.702848602614836, 2.912060240940506),
		new google.maps.LatLng(42.702853315981891, 2.912325983470259)
	],
	[
		new google.maps.LatLng(42.702861530935202, 2.912475911696083),
		new google.maps.LatLng(42.702865189126065, 2.91255148614814),
		new google.maps.LatLng(42.702872577094638, 2.912790405971244),
		new google.maps.LatLng(42.702884521774457, 2.913106117257459),
		new google.maps.LatLng(42.702894597438117, 2.913335280853516)
	],
	[
		new google.maps.LatLng(42.702894597438117, 2.913335280853516),
		new google.maps.LatLng(42.702898252278736, 2.913407198477776),
		new google.maps.LatLng(42.702899164585141, 2.913423044275233),
		new google.maps.LatLng(42.702907403964957, 2.913605887472277),
		new google.maps.LatLng(42.702916587540926, 2.913844805084051),
		new google.maps.LatLng(42.702920242980454, 2.913917940923534)
	],
	[
		new google.maps.LatLng(42.702920242980454, 2.913917940923534),
		new google.maps.LatLng(42.702936658436172, 2.914206828620324),
		new google.maps.LatLng(42.702954874622826, 2.914499369689646),
		new google.maps.LatLng(42.70295943814471, 2.91458469574221),
		new google.maps.LatLng(42.702964927415323, 2.914702934092876),
		new google.maps.LatLng(42.702972219851546, 2.914828483839681),
		new google.maps.LatLng(42.70298681520589, 2.915092992956391),
		new google.maps.LatLng(42.703000510581234, 2.915356285263812),
		new google.maps.LatLng(42.703008697133718, 2.915475738243213)
	],
	[
		new google.maps.LatLng(42.703030471437806, 2.915724390797983),
		new google.maps.LatLng(42.70303952903803, 2.915808490332853),
		new google.maps.LatLng(42.703054918990148, 2.915942562620886),
		new google.maps.LatLng(42.703076595314869, 2.916066872604604),
		new google.maps.LatLng(42.703098284060871, 2.916208250386783),
		new google.maps.LatLng(42.703132602144699, 2.916403247099513),
		new google.maps.LatLng(42.703156068638101, 2.916517802339856),
		new google.maps.LatLng(42.703181326590304, 2.916623823211793),
		new google.maps.LatLng(42.703211992167283, 2.916748121608341),
		new google.maps.LatLng(42.703230922343266, 2.916810265412468)
	],
	[
		new google.maps.LatLng(42.703282295162893, 2.916969886304316),
		new google.maps.LatLng(42.703299419382091, 2.917023499383293),
		new google.maps.LatLng(42.703361600142451, 2.917207486662317),
		new google.maps.LatLng(42.703420179646571, 2.917385384596048),
		new google.maps.LatLng(42.703499476686446, 2.917614452714829),
		new google.maps.LatLng(42.703570660602011, 2.917815494652533),
		new google.maps.LatLng(42.703640955353919, 2.918029947918684),
		new google.maps.LatLng(42.703697716441702, 2.918183467998066),
		new google.maps.LatLng(42.703708526217596, 2.918210271913963)
	],
	[
		new google.maps.LatLng(42.703708526217596, 2.918210271913963),
		new google.maps.LatLng(42.70374906193382, 2.918310177289008),
		new google.maps.LatLng(42.70380220513097, 2.918435665024385),
		new google.maps.LatLng(42.703860763490255, 2.918589183512874),
		new google.maps.LatLng(42.703901308476198, 2.918701280935255),
		new google.maps.LatLng(42.703941852481684, 2.918812157883349),
		new google.maps.LatLng(42.703982407691427, 2.918937664128545),
		new google.maps.LatLng(42.70401666468107, 2.919058303593936),
		new google.maps.LatLng(42.704084248642289, 2.919258134151839),
		new google.maps.LatLng(42.704141929029298, 2.919440913665521),
		new google.maps.LatLng(42.704167170402116, 2.919529870632218)
	],
	[
		new google.maps.LatLng(42.704167170402116, 2.919529870632218),
		new google.maps.LatLng(42.704179790671233, 2.919572520033827),
		new google.maps.LatLng(42.704225756626315, 2.919721181657295),
		new google.maps.LatLng(42.704261807172664, 2.919836943297466),
		new google.maps.LatLng(42.704290654242811, 2.919938085139277),
		new google.maps.LatLng(42.704326702001758, 2.920050190023352),
		new google.maps.LatLng(42.704355554910499, 2.920158647300193),
		new google.maps.LatLng(42.704375391074748, 2.920234201973459),
		new google.maps.LatLng(42.704392521480806, 2.920297569732624),
		new google.maps.LatLng(42.704411479591414, 2.920401164748488),
		new google.maps.LatLng(42.704425934902737, 2.920495012757297),
		new google.maps.LatLng(42.704441304842788, 2.920609583528061),
		new google.maps.LatLng(42.704454887029314, 2.920738785920865),
		new google.maps.LatLng(42.704463083234266, 2.920878967513932),
		new google.maps.LatLng(42.704478531649215, 2.921100817319136),
		new google.maps.LatLng(42.704481261862433, 2.921145918665746),
		new google.maps.LatLng(42.704493994002931, 2.921342171712168),
		new google.maps.LatLng(42.704503090445442, 2.921486009348891),
		new google.maps.LatLng(42.704504914427382, 2.921521359018149),
		new google.maps.LatLng(42.704511310111187, 2.921660323690335)
	],
	[
		new google.maps.LatLng(42.704511310111187, 2.921660323690335),
		new google.maps.LatLng(42.704520404478487, 2.921801723810875),
		new google.maps.LatLng(42.704529449165854, 2.921874855210813),
		new google.maps.LatLng(42.704542102873624, 2.921966268403443),
		new google.maps.LatLng(42.7045782123148, 2.9221649288282),
		new google.maps.LatLng(42.704602585609379, 2.922300212943151),
		new google.maps.LatLng(42.704610708942646, 2.922342868843664),
		new google.maps.LatLng(42.704639579654, 2.922479366887544),
		new google.maps.LatLng(42.704672916888931, 2.922576847935482),
		new google.maps.LatLng(42.704695440348729, 2.922640209911458),
		new google.maps.LatLng(42.704720650950875, 2.922690158657715),
		new google.maps.LatLng(42.704798082244352, 2.922840001678316),
		new google.maps.LatLng(42.70482958902609, 2.922892380369994)
	],
	[
		new google.maps.LatLng(42.704856594036556, 2.922937449416986),
		new google.maps.LatLng(42.70490971558371, 2.923039781717679),
		new google.maps.LatLng(42.704930425173529, 2.923082422301418),
		new google.maps.LatLng(42.704960151374713, 2.923159184544544),
		new google.maps.LatLng(42.704997097784386, 2.923274948443498),
		new google.maps.LatLng(42.705054817739175, 2.923523564887658),
		new google.maps.LatLng(42.705073759752082, 2.92360887553976)
	],
	[
		new google.maps.LatLng(42.705073759752082, 2.92360887553976),
		new google.maps.LatLng(42.705107144509249, 2.923773406633424),
		new google.maps.LatLng(42.705146802218827, 2.923909891967478),
		new google.maps.LatLng(42.705160320120278, 2.923953761257341),
		new google.maps.LatLng(42.705228848572283, 2.924231622243457),
		new google.maps.LatLng(42.705292862671072, 2.924482670469988),
		new google.maps.LatLng(42.705352368233662, 2.924715438135203),
		new google.maps.LatLng(42.705392032051961, 2.924862897032741),
		new google.maps.LatLng(42.705402844273195, 2.924895797551923),
		new google.maps.LatLng(42.705419059776808, 2.92494088340026),
		new google.maps.LatLng(42.70546231262464, 2.925077365819607),
		new google.maps.LatLng(42.705508260886049, 2.925211406311303)
	],
	[
		new google.maps.LatLng(42.705555113941799, 2.925353979502788),
		new google.maps.LatLng(42.705592058916054, 2.92547096403444),
		new google.maps.LatLng(42.70567314714657, 2.925713459712502),
		new google.maps.LatLng(42.705765934926589, 2.925973008063223),
		new google.maps.LatLng(42.705810966053953, 2.926082669526982),
		new google.maps.LatLng(42.705825379205379, 2.926122881597652),
		new google.maps.LatLng(42.705876701535665, 2.926228877466402),
		new google.maps.LatLng(42.705918136666703, 2.9263397630274),
		new google.maps.LatLng(42.705959597885709, 2.926488440396771),
		new google.maps.LatLng(42.705974919688558, 2.92654328121658),
		new google.maps.LatLng(42.706019086565419, 2.926704146418426),
		new google.maps.LatLng(42.706131753261538, 2.927112402560153),
		new google.maps.LatLng(42.706250726420429, 2.927540159075502),
		new google.maps.LatLng(42.706410246671481, 2.928101969314418),
		new google.maps.LatLng(42.706523810009351, 2.928513887891833),
		new google.maps.LatLng(42.706617532945927, 2.928838056896088),
		new google.maps.LatLng(42.706695948973511, 2.929129328843559),
		new google.maps.LatLng(42.706734701657666, 2.929267041587893),
		new google.maps.LatLng(42.70675993156992, 2.929349910220136),
		new google.maps.LatLng(42.706769851592277, 2.92939500539382),
		new google.maps.LatLng(42.706781568661, 2.929438880298643),
		new google.maps.LatLng(42.706800503977995, 2.929520537986668),
		new google.maps.LatLng(42.70682033694208, 2.929600975246604),
		new google.maps.LatLng(42.706843773308009, 2.92969116169532),
		new google.maps.LatLng(42.706856386465141, 2.929731377315723),
		new google.maps.LatLng(42.706872604710227, 2.929782560336204),
		new google.maps.LatLng(42.706909531326268, 2.929880044757468),
		new google.maps.LatLng(42.706953666222482, 2.929999465337649),
		new google.maps.LatLng(42.707035589610705, 2.930160290537374),
		new google.maps.LatLng(42.707111226666782, 2.930332095964918),
		new google.maps.LatLng(42.707140046228325, 2.930406428913487),
		new google.maps.LatLng(42.707165275310807, 2.930489298551945),
		new google.maps.LatLng(42.707173415802139, 2.930563654813668),
		new google.maps.LatLng(42.707173455643719, 2.93062461093117),
		new google.maps.LatLng(42.707169009198509, 2.930701421449885),
		new google.maps.LatLng(42.707157363858173, 2.93076726848021),
		new google.maps.LatLng(42.707129557611708, 2.930869707686719)
	],
	[
		new google.maps.LatLng(42.730006436734605, 2.929087533558496),
		new google.maps.LatLng(42.73003793981546, 2.929138719275266),
		new google.maps.LatLng(42.730084736686777, 2.929203300530586),
		new google.maps.LatLng(42.730114435085007, 2.929243511623903)
	],
	[
		new google.maps.LatLng(42.730114435085007, 2.929243511623903),
		new google.maps.LatLng(42.730172032223081, 2.929323935979682),
		new google.maps.LatLng(42.73025122751524, 2.929433604163804),
		new google.maps.LatLng(42.730271928016563, 2.92946406880512),
		new google.maps.LatLng(42.730424018352757, 2.92967487752207),
		new google.maps.LatLng(42.73049512479313, 2.929789434247062)
	],
	[
		new google.maps.LatLng(42.73049512479313, 2.929789434247062),
		new google.maps.LatLng(42.730533828275192, 2.929851588229268),
		new google.maps.LatLng(42.730550929733099, 2.929879618594307),
		new google.maps.LatLng(42.730658924747488, 2.930031940853441),
		new google.maps.LatLng(42.730804740039851, 2.930272030349922),
		new google.maps.LatLng(42.730914571514759, 2.930484112671261),
		new google.maps.LatLng(42.730989307396698, 2.930651110892648),
		new google.maps.LatLng(42.731036135018002, 2.930763260717668),
		new google.maps.LatLng(42.731063181163336, 2.930875434011884),
		new google.maps.LatLng(42.731092956443391, 2.931037608306188),
		new google.maps.LatLng(42.73110832548641, 2.931166870248934),
		new google.maps.LatLng(42.731113844004085, 2.931360783937812),
		new google.maps.LatLng(42.731115821410135, 2.931640076366172),
		new google.maps.LatLng(42.731111420816191, 2.931790094318661)
	],
	[
		new google.maps.LatLng(42.707577917533094, 2.931811563403494),
		new google.maps.LatLng(42.707559920806219, 2.931789640027243),
		new google.maps.LatLng(42.70753201775301, 2.931740907732612),
		new google.maps.LatLng(42.707467202790689, 2.931616632180848),
		new google.maps.LatLng(42.707428491568486, 2.931538653238484),
		new google.maps.LatLng(42.707297073541213, 2.931307174098164),
		new google.maps.LatLng(42.707185465208788, 2.931123218399067),
		new google.maps.LatLng(42.707144969273756, 2.931065968118768),
		new google.maps.LatLng(42.707116178360948, 2.931036742783667),
		new google.maps.LatLng(42.707095491850815, 2.931025795520704)
	],
	[
		new google.maps.LatLng(42.708557879083131, 2.934587643476745),
		new google.maps.LatLng(42.70850925981577, 2.93447675528194),
		new google.maps.LatLng(42.708439039939087, 2.934330537144091),
		new google.maps.LatLng(42.708331009576803, 2.934107554967049),
		new google.maps.LatLng(42.708221172273568, 2.933871164815724),
		new google.maps.LatLng(42.708099628456729, 2.933605530209826),
		new google.maps.LatLng(42.708012295971585, 2.933414225015561),
		new google.maps.LatLng(42.707961876840692, 2.933303340654497),
		new google.maps.LatLng(42.707922255078515, 2.93320585422523),
		new google.maps.LatLng(42.707897933959501, 2.933132734882918),
		new google.maps.LatLng(42.707873607593243, 2.93305229873093),
		new google.maps.LatLng(42.707833956540007, 2.932908487116744),
		new google.maps.LatLng(42.707780781437158, 2.932704951860603),
		new google.maps.LatLng(42.707723101404447, 2.932486794254901),
		new google.maps.LatLng(42.707672629423776, 2.932293010126954),
		new google.maps.LatLng(42.7076311721558, 2.932138228617344),
		new google.maps.LatLng(42.70758879839947, 2.931956627234687),
		new google.maps.LatLng(42.707577069012146, 2.931892027580382),
		new google.maps.LatLng(42.707577917533094, 2.931811563403494)
	],
	[
		new google.maps.LatLng(42.731111420816191, 2.931790094318661),
		new google.maps.LatLng(42.731107887877577, 2.931888888625975),
		new google.maps.LatLng(42.731103458962366, 2.931995001080681),
		new google.maps.LatLng(42.731086463960104, 2.932134058238119),
		new google.maps.LatLng(42.7310497270742, 2.93233533894586),
		new google.maps.LatLng(42.731017439673508, 2.932463436815054),
		new google.maps.LatLng(42.730977025975129, 2.932539099678685),
		new google.maps.LatLng(42.730973433233089, 2.932543982105437),
		new google.maps.LatLng(42.730921321878419, 2.932605023282551),
		new google.maps.LatLng(42.730959286851984, 2.932925740181274)
	],
	[
		new google.maps.LatLng(42.728932891084369, 2.931876798085799),
		new google.maps.LatLng(42.728908633121385, 2.931906096093028),
		new google.maps.LatLng(42.728762991904205, 2.931933097461634),
		new google.maps.LatLng(42.728519356252228, 2.931976067307022),
		new google.maps.LatLng(42.728389900580595, 2.93200426923348),
		new google.maps.LatLng(42.728304502284033, 2.932034857571809),
		new google.maps.LatLng(42.728140010063647, 2.932109443297481),
		new google.maps.LatLng(42.728015961220194, 2.932157150748939),
		new google.maps.LatLng(42.727927858448098, 2.93217554657959)
	],
	[
		new google.maps.LatLng(42.728932891084369, 2.931876798085799),
		new google.maps.LatLng(42.729035469108119, 2.93199863695101),
		new google.maps.LatLng(42.729299108826488, 2.93230688344338)
	],
	[
		new google.maps.LatLng(42.72614935818666, 2.932125179024035),
		new google.maps.LatLng(42.725906590910988, 2.932119364206352),
		new google.maps.LatLng(42.725694393700955, 2.932113514707533),
		new google.maps.LatLng(42.725528952127462, 2.932108828940997),
		new google.maps.LatLng(42.725402177405257, 2.932111416094175),
		new google.maps.LatLng(42.725314066628378, 2.932116396841579),
		new google.maps.LatLng(42.72526911624071, 2.932126205897517)
	],
	[
		new google.maps.LatLng(42.726814727664063, 2.932153672584475),
		new google.maps.LatLng(42.726634896351804, 2.932142905590811),
		new google.maps.LatLng(42.726240170489433, 2.932127511861541),
		new google.maps.LatLng(42.72614935818666, 2.932125179024035)
	],
	[
		new google.maps.LatLng(42.724772897940944, 2.932280439804082),
		new google.maps.LatLng(42.724838536151793, 2.932284021373666),
		new google.maps.LatLng(42.724879891473286, 2.932276657279678),
		new google.maps.LatLng(42.724932933397916, 2.932266839546143),
		new google.maps.LatLng(42.724974281291146, 2.932248498319262),
		new google.maps.LatLng(42.725053381437753, 2.932211822169332),
		new google.maps.LatLng(42.725109106565995, 2.932180049573523),
		new google.maps.LatLng(42.725129781319232, 2.932171489426955),
		new google.maps.LatLng(42.72518101435162, 2.932144600955389)
	],
	[
		new google.maps.LatLng(42.72148024228607, 2.93216354712577),
		new google.maps.LatLng(42.7215674544629, 2.932159786265317),
		new google.maps.LatLng(42.721660066972127, 2.932164556510013),
		new google.maps.LatLng(42.72181741835437, 2.932172909030893)
	],
	[
		new google.maps.LatLng(42.727124039910095, 2.932174043259366),
		new google.maps.LatLng(42.727022434217503, 2.932166845159208),
		new google.maps.LatLng(42.726814727664063, 2.932153672584475)
	],
	[
		new google.maps.LatLng(42.72181741835437, 2.932172909030893),
		new google.maps.LatLng(42.721963979408734, 2.932180054873118),
		new google.maps.LatLng(42.722077272479225, 2.932186019853674)
	],
	[
		new google.maps.LatLng(42.727927858448098, 2.93217554657959),
		new google.maps.LatLng(42.72782985800464, 2.932182978011475),
		new google.maps.LatLng(42.727692297342529, 2.932191675042419),
		new google.maps.LatLng(42.727467517116132, 2.932193156870807),
		new google.maps.LatLng(42.72734613313213, 2.932189638719919),
		new google.maps.LatLng(42.727213955198209, 2.932178816906661),
		new google.maps.LatLng(42.727124039910095, 2.932174043259366)
	],
	[
		new google.maps.LatLng(42.722077272479225, 2.932186019853674),
		new google.maps.LatLng(42.722427941106652, 2.93220512288233),
		new google.maps.LatLng(42.722509762556854, 2.932207466758129)
	],
	[
		new google.maps.LatLng(42.722509762556854, 2.932207466758129),
		new google.maps.LatLng(42.722807379806042, 2.932220534108023)
	],
	[
		new google.maps.LatLng(42.722807379806042, 2.932220534108023),
		new google.maps.LatLng(42.722886504804009, 2.932224100743305),
		new google.maps.LatLng(42.723017779801026, 2.932228825221222)
	],
	[
		new google.maps.LatLng(42.723017779801026, 2.932228825221222),
		new google.maps.LatLng(42.723270439375383, 2.932239506059934)
	],
	[
		new google.maps.LatLng(42.718059150907656, 2.932249229355738),
		new google.maps.LatLng(42.718179626581119, 2.932240553714403),
		new google.maps.LatLng(42.71840981422595, 2.932262234298993),
		new google.maps.LatLng(42.718515033920376, 2.932298692796783)
	],
	[
		new google.maps.LatLng(42.723270439375383, 2.932239506059934),
		new google.maps.LatLng(42.723394522752294, 2.93224667803528),
		new google.maps.LatLng(42.723857579393403, 2.932260773633782)
	],
	[
		new google.maps.LatLng(42.718059150907656, 2.932249229355738),
		new google.maps.LatLng(42.717939573690693, 2.932257903980808),
		new google.maps.LatLng(42.717829902112463, 2.932290953911893),
		new google.maps.LatLng(42.717637503886642, 2.932311905940149),
		new google.maps.LatLng(42.717349816020892, 2.932357356454912),
		new google.maps.LatLng(42.717216755627099, 2.932372142585596),
		new google.maps.LatLng(42.7170711262496, 2.932414988443614),
		new google.maps.LatLng(42.716990219487577, 2.93243703056243),
		new google.maps.LatLng(42.716870645313982, 2.932449362418769),
		new google.maps.LatLng(42.71679511392302, 2.932440914526454),
		new google.maps.LatLng(42.716665604672315, 2.932383756546933),
		new google.maps.LatLng(42.716633232417308, 2.932376478857596),
		new google.maps.LatLng(42.716603558061252, 2.932370416660209),
		new google.maps.LatLng(42.716555006014488, 2.932371691757002),
		new google.maps.LatLng(42.716536126329594, 2.932374152887404),
		new google.maps.LatLng(42.716455237109216, 2.932424238201698),
		new google.maps.LatLng(42.716313290507564, 2.932603641781238),
		new google.maps.LatLng(42.716270161469119, 2.932648806988555),
		new google.maps.LatLng(42.716206349679965, 2.932689118475006)
	],
	[
		new google.maps.LatLng(42.723857579393403, 2.932260773633782),
		new google.maps.LatLng(42.724028415333933, 2.932265452559701),
		new google.maps.LatLng(42.724217233933452, 2.93227011062677)
	],
	[
		new google.maps.LatLng(42.724217233933452, 2.93227011062677),
		new google.maps.LatLng(42.724487873963497, 2.932277112764801),
		new google.maps.LatLng(42.724772897940944, 2.932280439804082)
	],
	[
		new google.maps.LatLng(42.718515033920376, 2.932298692796783),
		new google.maps.LatLng(42.71861214886205, 2.932314431642636),
		new google.maps.LatLng(42.718843238738479, 2.932340988004693),
		new google.maps.LatLng(42.719024868523647, 2.932354190430956),
		new google.maps.LatLng(42.719683937992862, 2.932379032138562),
		new google.maps.LatLng(42.720066974566855, 2.932398097755686),
		new google.maps.LatLng(42.720173069513287, 2.932395535202696),
		new google.maps.LatLng(42.720280054780481, 2.932380778101574),
		new google.maps.LatLng(42.720482335251418, 2.932346400046984),
		new google.maps.LatLng(42.720658550207567, 2.932326684574614),
		new google.maps.LatLng(42.720721488917853, 2.932327830661905),
		new google.maps.LatLng(42.720787134393511, 2.932343606927887),
		new google.maps.LatLng(42.72084110863176, 2.932386224017133),
		new google.maps.LatLng(42.720922074657537, 2.93245807562507),
		new google.maps.LatLng(42.720965241009196, 2.932471438333149),
		new google.maps.LatLng(42.721010186930044, 2.932455533969105),
		new google.maps.LatLng(42.721093779992984, 2.932415196311743)
	],
	[
		new google.maps.LatLng(42.729299108826488, 2.93230688344338),
		new google.maps.LatLng(42.729542946502519, 2.932584667457355),
		new google.maps.LatLng(42.7297705954281, 2.932853934279433),
		new google.maps.LatLng(42.729890267169075, 2.932995269181264)
	],
	[
		new google.maps.LatLng(42.715945452499874, 2.932445558658417),
		new google.maps.LatLng(42.715900533651471, 2.932504136779571),
		new google.maps.LatLng(42.715885270896393, 2.932539514321737),
		new google.maps.LatLng(42.715873612781202, 2.932587080623321)
	],
	[
		new google.maps.LatLng(42.715873612781202, 2.932587080623321),
		new google.maps.LatLng(42.715867357649863, 2.932649273002868),
		new google.maps.LatLng(42.715876386542888, 2.932709008274627),
		new google.maps.LatLng(42.715894400535639, 2.932758979160735),
		new google.maps.LatLng(42.715941201885059, 2.932834521474958)
	],
	[
		new google.maps.LatLng(42.716127324497755, 2.932844062156483),
		new google.maps.LatLng(42.71616147207564, 2.932814758615114),
		new google.maps.LatLng(42.716191107923343, 2.932758636347179),
		new google.maps.LatLng(42.716206349679965, 2.932689118475006)
	],
	[
		new google.maps.LatLng(42.715941201885059, 2.932834521474958),
		new google.maps.LatLng(42.715985273857264, 2.932860076332313),
		new google.maps.LatLng(42.716017646984177, 2.932867355418145),
		new google.maps.LatLng(42.716076988461353, 2.932867286226866),
		new google.maps.LatLng(42.716127324497755, 2.932844062156483)
	],
	[
		new google.maps.LatLng(42.730959286851984, 2.932925740181274),
		new google.maps.LatLng(42.730964706680268, 2.932965981125208),
		new google.maps.LatLng(42.730983669166086, 2.933095239394425),
		new google.maps.LatLng(42.731002562629889, 2.933114731825669),
		new google.maps.LatLng(42.731039430152222, 2.933119568086462),
		new google.maps.LatLng(42.731250709950857, 2.933094932598493),
		new google.maps.LatLng(42.731441312066963, 2.933073980338192),
		new google.maps.LatLng(42.731475480083887, 2.933076379638906),
		new google.maps.LatLng(42.731505158843419, 2.933088542124727),
		new google.maps.LatLng(42.731523162624633, 2.933121451404581),
		new google.maps.LatLng(42.731539375549929, 2.933167778365401)
	],
	[
		new google.maps.LatLng(42.730207914219235, 2.933403471241427),
		new google.maps.LatLng(42.730015337742124, 2.933141477238418),
		new google.maps.LatLng(42.729974846115823, 2.933092740266023),
		new google.maps.LatLng(42.729890267169075, 2.932995269181264)
	],
	[
		new google.maps.LatLng(42.731814470972594, 2.933107700282169),
		new google.maps.LatLng(42.731742551481616, 2.933123638516757)
	],
	[
		new google.maps.LatLng(42.731814470972594, 2.933107700282169),
		new google.maps.LatLng(42.731831598652626, 2.933177200645396)
	],
	[
		new google.maps.LatLng(42.731742551481616, 2.933123638516757),
		new google.maps.LatLng(42.731563648325583, 2.933161652446088),
		new google.maps.LatLng(42.731539375549929, 2.933167778365401)
	],
	[
		new google.maps.LatLng(42.731539375549929, 2.933167778365401),
		new google.maps.LatLng(42.731196853235112, 2.933241349149707),
		new google.maps.LatLng(42.731088072634222, 2.93326342769434)
	],
	[
		new google.maps.LatLng(42.731831598652626, 2.933177200645396),
		new google.maps.LatLng(42.731859570513052, 2.933336941315127),
		new google.maps.LatLng(42.731900134201119, 2.933501545972809),
		new google.maps.LatLng(42.731934385816771, 2.933638107246163),
		new google.maps.LatLng(42.731970404919991, 2.933725879640683)
	],
	[
		new google.maps.LatLng(42.731088072634222, 2.93326342769434),
		new google.maps.LatLng(42.730904673719536, 2.933300226948679),
		new google.maps.LatLng(42.730892087741616, 2.933302680367346)
	],
	[
		new google.maps.LatLng(42.730892087741616, 2.933302680367346),
		new google.maps.LatLng(42.730806681980823, 2.933321072518875)
	],
	[
		new google.maps.LatLng(42.730806681980823, 2.933321072518875),
		new google.maps.LatLng(42.730742851643846, 2.933334561681157),
		new google.maps.LatLng(42.730731165022654, 2.933337014118399),
		new google.maps.LatLng(42.730697003429334, 2.933345590386074)
	],
	[
		new google.maps.LatLng(42.730697003429334, 2.933345590386074),
		new google.maps.LatLng(42.730628678814391, 2.933360304261905),
		new google.maps.LatLng(42.730579236205536, 2.933374995350622)
	],
	[
		new google.maps.LatLng(42.730579236205536, 2.933374995350622),
		new google.maps.LatLng(42.730521701889799, 2.933390916264587),
		new google.maps.LatLng(42.730308647895718, 2.933454580047895)
	],
	[
		new google.maps.LatLng(42.730308647895718, 2.933454580047895),
		new google.maps.LatLng(42.730305036217885, 2.933430191625137),
		new google.maps.LatLng(42.730296032327864, 2.933409468763922),
		new google.maps.LatLng(42.730283434755115, 2.933393628232861),
		new google.maps.LatLng(42.7302672435017, 2.933382670031642),
		new google.maps.LatLng(42.730250158068522, 2.933379031093191),
		new google.maps.LatLng(42.730233076913038, 2.933382709224139),
		new google.maps.LatLng(42.730216899392943, 2.933393704672387),
		new google.maps.LatLng(42.730207914219235, 2.933403471241427)
	],
	[
		new google.maps.LatLng(42.731970404919991, 2.933725879640683),
		new google.maps.LatLng(42.731996518654135, 2.933789272195743)
	],
	[
		new google.maps.LatLng(42.731996518654135, 2.933789272195743),
		new google.maps.LatLng(42.73206220074394, 2.933862376077414),
		new google.maps.LatLng(42.732082014140751, 2.933916017083218)
	],
	[
		new google.maps.LatLng(42.732082014140751, 2.933916017083218),
		new google.maps.LatLng(42.732096439015599, 2.933978203558656),
		new google.maps.LatLng(42.732108252986606, 2.934181869879439)
	],
	[
		new google.maps.LatLng(42.732108252986606, 2.934181869879439),
		new google.maps.LatLng(42.732114596557587, 2.934263579435993),
		new google.maps.LatLng(42.7321147289856, 2.934479456570883),
		new google.maps.LatLng(42.73211476162858, 2.934533121171472)
	],
	[
		new google.maps.LatLng(42.73211476162858, 2.934533121171472),
		new google.maps.LatLng(42.73211124959294, 2.934670944500216)
	],
	[
		new google.maps.LatLng(42.707648362695039, 2.935215300005102),
		new google.maps.LatLng(42.707675315264495, 2.935179914375514),
		new google.maps.LatLng(42.707694191349852, 2.935172578996263),
		new google.maps.LatLng(42.707736438440115, 2.935153025615937),
		new google.maps.LatLng(42.707800258787415, 2.935126133979213),
		new google.maps.LatLng(42.707878460904858, 2.935093129827558),
		new google.maps.LatLng(42.707929697974976, 2.935073566913938),
		new google.maps.LatLng(42.707975536513729, 2.935046693963117),
		new google.maps.LatLng(42.708106744741627, 2.934945358820583),
		new google.maps.LatLng(42.708281993340783, 2.934818372593595),
		new google.maps.LatLng(42.708422188762157, 2.934710930769167),
		new google.maps.LatLng(42.708500373972967, 2.93464866653823),
		new google.maps.LatLng(42.708557879083131, 2.934587643476745)
	],
	[
		new google.maps.LatLng(42.73211124959294, 2.934670944500216),
		new google.maps.LatLng(42.732111275159163, 2.934712413208574),
		new google.maps.LatLng(42.732097102343495, 2.935063686256401),
		new google.maps.LatLng(42.732097115057051, 2.935084420605966)
	],
	[
		new google.maps.LatLng(42.732097115057051, 2.935084420605966),
		new google.maps.LatLng(42.732091784015509, 2.935189315512281)
	],
	[
		new google.maps.LatLng(42.70784415641581, 2.936359852029346),
		new google.maps.LatLng(42.707807161665684, 2.936140447566231),
		new google.maps.LatLng(42.707744931274512, 2.935818663979561),
		new google.maps.LatLng(42.707734106874483, 2.93576015743401),
		new google.maps.LatLng(42.707667392637518, 2.935461543195851),
		new google.maps.LatLng(42.707636727419185, 2.935301871639258),
		new google.maps.LatLng(42.707634906327755, 2.935264079610523),
		new google.maps.LatLng(42.707638485819466, 2.935237254763784),
		new google.maps.LatLng(42.707648362695039, 2.935215300005102)
	],
	[
		new google.maps.LatLng(42.732091784015509, 2.935189315512281),
		new google.maps.LatLng(42.732082905419091, 2.935375931583592)
	],
	[
		new google.maps.LatLng(42.732082905419091, 2.935375931583592),
		new google.maps.LatLng(42.732082026322381, 2.935410081483767),
		new google.maps.LatLng(42.732083865739462, 2.935477160019879)
	],
	[
		new google.maps.LatLng(42.732083865739462, 2.935477160019879),
		new google.maps.LatLng(42.73192472894354, 2.935493192520872),
		new google.maps.LatLng(42.731798855437717, 2.935500649431873),
		new google.maps.LatLng(42.731757502005543, 2.935511672040705),
		new google.maps.LatLng(42.731732334097394, 2.935523896511641),
		new google.maps.LatLng(42.731710764787614, 2.935539775850121),
		new google.maps.LatLng(42.731701781500391, 2.93555320096396)
	],
	[
		new google.maps.LatLng(42.731701781500391, 2.93555320096396),
		new google.maps.LatLng(42.731686526092851, 2.935603223701605),
		new google.maps.LatLng(42.73168207217001, 2.935672747025921),
		new google.maps.LatLng(42.731686659416951, 2.93582519663957),
		new google.maps.LatLng(42.73168586444698, 2.935999606012004),
		new google.maps.LatLng(42.731682304850075, 2.936060591193051),
		new google.maps.LatLng(42.731673350659726, 2.936122803099717),
		new google.maps.LatLng(42.731647340204781, 2.936230159606581),
		new google.maps.LatLng(42.731562121740986, 2.93656565168204),
		new google.maps.LatLng(42.73153433360401, 2.936708379473585),
		new google.maps.LatLng(42.731507443744931, 2.936851104999854),
		new google.maps.LatLng(42.731494017984517, 2.936954788271021),
		new google.maps.LatLng(42.731477029720175, 2.937117017751757),
		new google.maps.LatLng(42.731465395485557, 2.937209723272151),
		new google.maps.LatLng(42.73146271399434, 2.937236557414582),
		new google.maps.LatLng(42.731451955748177, 2.937290232376601),
		new google.maps.LatLng(42.731438492027252, 2.937330495571473),
		new google.maps.LatLng(42.731414261944259, 2.937409796798269),
		new google.maps.LatLng(42.731386432600154, 2.937484224271258),
		new google.maps.LatLng(42.731342424617651, 2.937568426294357),
		new google.maps.LatLng(42.7312660640453, 2.937680714487063),
		new google.maps.LatLng(42.731032485771728, 2.938017579460943),
		new google.maps.LatLng(42.730967806418406, 2.938116438042381),
		new google.maps.LatLng(42.730921995282564, 2.938193322471737),
		new google.maps.LatLng(42.730861826190598, 2.938319007362506),
		new google.maps.LatLng(42.730795385231943, 2.938483726235146),
		new google.maps.LatLng(42.730733445831703, 2.938659415991052),
		new google.maps.LatLng(42.730702044537011, 2.938777752042521),
		new google.maps.LatLng(42.730683242541843, 2.938916808210907),
		new google.maps.LatLng(42.730702244409429, 2.939129000807212)
	],
	[
		new google.maps.LatLng(42.708055165630888, 2.937409301942457),
		new google.maps.LatLng(42.708026311934645, 2.937267912713229),
		new google.maps.LatLng(42.707997449759816, 2.937113112993265),
		new google.maps.LatLng(42.707938826771716, 2.936805952641421),
		new google.maps.LatLng(42.707853177025001, 2.936409826727417),
		new google.maps.LatLng(42.70784415641581, 2.936359852029346)
	],
	[
		new google.maps.LatLng(42.708248071533689, 2.938263715353196),
		new google.maps.LatLng(42.708205709770503, 2.938084545720953),
		new google.maps.LatLng(42.708104760283305, 2.937654295958777),
		new google.maps.LatLng(42.708055165630888, 2.937409301942457)
	],
	[
		new google.maps.LatLng(42.708656163391815, 2.939660432708145),
		new google.maps.LatLng(42.708624661999814, 2.939601946010693),
		new google.maps.LatLng(42.708530128351335, 2.939376500574539),
		new google.maps.LatLng(42.708478798512537, 2.939235132612529),
		new google.maps.LatLng(42.70845986976056, 2.939151031984545),
		new google.maps.LatLng(42.708449943824625, 2.939087646560608),
		new google.maps.LatLng(42.708440915659857, 2.939023040783401),
		new google.maps.LatLng(42.708399470402348, 2.93887191009521),
		new google.maps.LatLng(42.708341803082519, 2.938653742127869),
		new google.maps.LatLng(42.708290429479185, 2.938438008506887),
		new google.maps.LatLng(42.708273304133968, 2.938363657593173),
		new google.maps.LatLng(42.708256180482401, 2.938294184663848)
	],
	[
		new google.maps.LatLng(42.730702244409429, 2.939129000807212),
		new google.maps.LatLng(42.730689658957417, 2.939132672960671),
		new google.maps.LatLng(42.730672582176986, 2.939144887798632),
		new google.maps.LatLng(42.730662697804433, 2.939155874415583),
		new google.maps.LatLng(42.730655512805747, 2.93916929701103),
		new google.maps.LatLng(42.730649227565081, 2.939185158574159),
		new google.maps.LatLng(42.730645644299749, 2.939208335823016)
	],
	[
		new google.maps.LatLng(42.730373209787743, 2.939209839030304),
		new google.maps.LatLng(42.730360669943352, 2.939294005161908),
		new google.maps.LatLng(42.730334638478595, 2.939370867381594),
		new google.maps.LatLng(42.730261898409736, 2.939528272796975),
		new google.maps.LatLng(42.730131750578593, 2.939929657307867),
		new google.maps.LatLng(42.730092255543639, 2.940047999399091)
	],
	[
		new google.maps.LatLng(42.730373209787743, 2.939209839030304),
		new google.maps.LatLng(42.73048560069298, 2.939209722608818)
	],
	[
		new google.maps.LatLng(42.73048560069298, 2.939209722608818),
		new google.maps.LatLng(42.730507179875595, 2.93920969898567)
	],
	[
		new google.maps.LatLng(42.730507179875595, 2.93920969898567),
		new google.maps.LatLng(42.73056292499836, 2.939208421901765),
		new google.maps.LatLng(42.730645644299749, 2.939208335823016)
	],
	[
		new google.maps.LatLng(42.7091988665779, 2.940625449212781),
		new google.maps.LatLng(42.709047664570761, 2.940353730662742),
		new google.maps.LatLng(42.708881165116928, 2.940058863864016),
		new google.maps.LatLng(42.708745265559266, 2.939820049839499),
		new google.maps.LatLng(42.708656163391815, 2.939660432708145)
	],
	[
		new google.maps.LatLng(42.730092255543639, 2.940047999399091),
		new google.maps.LatLng(42.729894777993657, 2.94064214741623)
	],
	[
		new google.maps.LatLng(42.709840563459899, 2.94177569977876),
		new google.maps.LatLng(42.709689366082259, 2.941507631707287),
		new google.maps.LatLng(42.709457168439698, 2.941092127461241),
		new google.maps.LatLng(42.709235766507824, 2.940691246395179),
		new google.maps.LatLng(42.7091988665779, 2.940625449212781)
	],
	[
		new google.maps.LatLng(42.729894777993657, 2.94064214741623),
		new google.maps.LatLng(42.729858877481064, 2.940758046559446),
		new google.maps.LatLng(42.729819359528399, 2.940837360245183),
		new google.maps.LatLng(42.729783413112415, 2.940870326050015),
		new google.maps.LatLng(42.72973845945824, 2.940875249825937),
		new google.maps.LatLng(42.7296881092918, 2.940877740150593),
		new google.maps.LatLng(42.729566724968578, 2.94087298494776),
		new google.maps.LatLng(42.729502894630173, 2.940886464834862),
		new google.maps.LatLng(42.729417489531905, 2.940908504601731),
		new google.maps.LatLng(42.729368946931217, 2.940928066904628),
		new google.maps.LatLng(42.729242201658685, 2.94098429705979)
	],
	[
		new google.maps.LatLng(42.729216295514462, 2.941290439445359),
		new google.maps.LatLng(42.729214511519416, 2.941317271585349),
		new google.maps.LatLng(42.72919930142686, 2.941455100346177),
		new google.maps.LatLng(42.729180498036406, 2.941597809578447),
		new google.maps.LatLng(42.729130309253009, 2.941896658458422),
		new google.maps.LatLng(42.729094442756356, 2.942078411506049),
		new google.maps.LatLng(42.729075612038969, 2.942172337918608),
		new google.maps.LatLng(42.729010118736163, 2.942438271427892),
		new google.maps.LatLng(42.728931143851334, 2.942713974771194),
		new google.maps.LatLng(42.728868304960947, 2.942900631196584),
		new google.maps.LatLng(42.728824317654869, 2.943032389470046),
		new google.maps.LatLng(42.728704003799962, 2.943350815406154),
		new google.maps.LatLng(42.728563019471352, 2.943689993303604),
		new google.maps.LatLng(42.728404040090382, 2.944006015469372)
	],
	[
		new google.maps.LatLng(42.709323960649577, 2.942489428546883),
		new google.maps.LatLng(42.709482080648918, 2.942260068757162),
		new google.maps.LatLng(42.709840563459899, 2.94177569977876)
	],
	[
		new google.maps.LatLng(42.709248492263484, 2.94259557118686),
		new google.maps.LatLng(42.709265562401505, 2.942571171352567),
		new google.maps.LatLng(42.709279039070587, 2.942552869927326),
		new google.maps.LatLng(42.709288921944875, 2.942538230347203)
	],
	[
		new google.maps.LatLng(42.709084978453198, 2.942827373237735),
		new google.maps.LatLng(42.709118219463662, 2.94277857342195),
		new google.maps.LatLng(42.709248492263484, 2.94259557118686)
	],
	[
		new google.maps.LatLng(42.708654638489442, 2.943454440149984),
		new google.maps.LatLng(42.708704950688279, 2.94338246111377),
		new google.maps.LatLng(42.708802876870905, 2.943238506383257),
		new google.maps.LatLng(42.708987949421349, 2.942967672387782)
	],
	[
		new google.maps.LatLng(42.708495587778387, 2.943628933450145),
		new google.maps.LatLng(42.708541423504251, 2.943592314315667),
		new google.maps.LatLng(42.708600731520725, 2.943530080824805),
		new google.maps.LatLng(42.708654638489442, 2.943454440149984)
	],
	[
		new google.maps.LatLng(42.708495587778387, 2.943628933450145),
		new google.maps.LatLng(42.708519885588494, 2.943670360622051),
		new google.maps.LatLng(42.708554979623095, 2.943725188768691),
		new google.maps.LatLng(42.70859006821567, 2.943769045209433),
		new google.maps.LatLng(42.708637746627765, 2.943817764594944)
	],
	[
		new google.maps.LatLng(42.708637746627765, 2.943817764594944),
		new google.maps.LatLng(42.708689905294904, 2.943838440162222),
		new google.maps.LatLng(42.708755545941848, 2.943849348800144),
		new google.maps.LatLng(42.708843677788295, 2.943885839209865),
		new google.maps.LatLng(42.708934510701212, 2.943928422335023),
		new google.maps.LatLng(42.709064921396156, 2.944005103644976),
		new google.maps.LatLng(42.709225025536789, 2.944124427733931),
		new google.maps.LatLng(42.709345547037678, 2.944203557737853),
		new google.maps.LatLng(42.709455270520486, 2.944265630726809),
		new google.maps.LatLng(42.709551506290332, 2.944324058741389),
		new google.maps.LatLng(42.709629761127843, 2.944386161618791),
		new google.maps.LatLng(42.709719713819752, 2.944466542006291),
		new google.maps.LatLng(42.709813264177853, 2.944549355999181),
		new google.maps.LatLng(42.709899623178785, 2.944635836445321),
		new google.maps.LatLng(42.710006672342168, 2.944741803677979),
		new google.maps.LatLng(42.710047158439558, 2.944792970377999),
		new google.maps.LatLng(42.710084945564908, 2.944840482201796),
		new google.maps.LatLng(42.710201006944075, 2.944989113245489),
		new google.maps.LatLng(42.71028919315382, 2.945131675561455),
		new google.maps.LatLng(42.710373783818191, 2.945276679294226),
		new google.maps.LatLng(42.710464675604953, 2.945437526874346)
	],
	[
		new google.maps.LatLng(42.728404040090382, 2.944006015469372),
		new google.maps.LatLng(42.72830703845429, 2.944204897364618),
		new google.maps.LatLng(42.728288174955239, 2.944239063688528),
		new google.maps.LatLng(42.72816241017231, 2.944457485036356),
		new google.maps.LatLng(42.728014174143404, 2.9446881231002),
		new google.maps.LatLng(42.727854248693099, 2.944918771676296),
		new google.maps.LatLng(42.727728466156513, 2.945103043548641),
		new google.maps.LatLng(42.727682644698163, 2.945170161065594),
		new google.maps.LatLng(42.727477772902702, 2.945421580818923),
		new google.maps.LatLng(42.727282783489485, 2.945659575434819),
		new google.maps.LatLng(42.726883801325052, 2.946112395678045),
		new google.maps.LatLng(42.726868524812438, 2.946129483242865),
		new google.maps.LatLng(42.726737321988729, 2.9462686309579)
	],
	[
		new google.maps.LatLng(42.710464675604953, 2.945437526874346),
		new google.maps.LatLng(42.710549261801638, 2.945573997161242),
		new google.maps.LatLng(42.710609541146482, 2.945650750338994),
		new google.maps.LatLng(42.710672518197597, 2.945728719615875),
		new google.maps.LatLng(42.710739988772069, 2.945801809421728),
		new google.maps.LatLng(42.71084882044228, 2.945879736517671),
		new google.maps.LatLng(42.710958550839599, 2.945956444784883),
		new google.maps.LatLng(42.711087164638201, 2.946038011379966),
		new google.maps.LatLng(42.711195092747033, 2.946107405746647),
		new google.maps.LatLng(42.711222074722457, 2.946123231471375),
		new google.maps.LatLng(42.711331808981875, 2.946208473793265),
		new google.maps.LatLng(42.711389381192319, 2.946266942569944),
		new google.maps.LatLng(42.711470356903021, 2.946377817155902),
		new google.maps.LatLng(42.711487460633634, 2.94641925483692),
		new google.maps.LatLng(42.711505464281068, 2.946461910092443),
		new google.maps.LatLng(42.711541486155241, 2.946576483781756),
		new google.maps.LatLng(42.711552324166178, 2.946674010442609),
		new google.maps.LatLng(42.711543374993077, 2.946759363512648),
		new google.maps.LatLng(42.711523637045765, 2.946844727035419),
		new google.maps.LatLng(42.711486812300571, 2.946922790283539),
		new google.maps.LatLng(42.711421231749831, 2.947032578974386),
		new google.maps.LatLng(42.711358338883201, 2.947124076814286),
		new google.maps.LatLng(42.711295447408091, 2.947216794013067),
		new google.maps.LatLng(42.711245142386218, 2.947309499098083),
		new google.maps.LatLng(42.711190346232549, 2.947410742211403),
		new google.maps.LatLng(42.711158921973563, 2.947500991896123)
	],
	[
		new google.maps.LatLng(42.726737321988729, 2.9462686309579),
		new google.maps.LatLng(42.726626818976371, 2.946446784314999),
		new google.maps.LatLng(42.726590893584628, 2.946526087127109)
	],
	[
		new google.maps.LatLng(42.726590893584628, 2.946526087127109),
		new google.maps.LatLng(42.726596312043149, 2.946573643060945),
		new google.maps.LatLng(42.726584656648356, 2.946639508981227)
	],
	[
		new google.maps.LatLng(42.726584656648356, 2.946639508981227),
		new google.maps.LatLng(42.726558608482158, 2.946693192458856),
		new google.maps.LatLng(42.726532541144955, 2.946707850603877),
		new google.maps.LatLng(42.726513666869707, 2.946722501328144)
	],
	[
		new google.maps.LatLng(42.726513666869707, 2.946722501328144),
		new google.maps.LatLng(42.726491239772237, 2.946824963195154),
		new google.maps.LatLng(42.726473278822773, 2.94686766219516)
	],
	[
		new google.maps.LatLng(42.726473278822773, 2.94686766219516),
		new google.maps.LatLng(42.726431029792586, 2.946887213499982),
		new google.maps.LatLng(42.726381579405654, 2.946890916654809),
		new google.maps.LatLng(42.726331237948429, 2.946910474851182),
		new google.maps.LatLng(42.726275520073884, 2.946966624303506),
		new google.maps.LatLng(42.726017613839062, 2.947253445507872),
		new google.maps.LatLng(42.725579992004448, 2.947766035734446),
		new google.maps.LatLng(42.725474874301298, 2.947929544324251),
		new google.maps.LatLng(42.725432647701162, 2.947996654288423),
		new google.maps.LatLng(42.72541200949356, 2.948082038533899),
		new google.maps.LatLng(42.725394972746372, 2.948178394457855),
		new google.maps.LatLng(42.72538872274724, 2.948268643424301),
		new google.maps.LatLng(42.725386048608911, 2.948317425163193),
		new google.maps.LatLng(42.725378011724445, 2.948432065950981),
		new google.maps.LatLng(42.725378057985601, 2.948528406308354),
		new google.maps.LatLng(42.725380805539125, 2.948632062144027),
		new google.maps.LatLng(42.72538446826217, 2.948771082341279),
		new google.maps.LatLng(42.725387218330269, 2.948880834871336),
		new google.maps.LatLng(42.725425360075555, 2.949680796818699),
		new google.maps.LatLng(42.725469958749464, 2.95084782546318),
		new google.maps.LatLng(42.725499931580792, 2.951508772565177),
		new google.maps.LatLng(42.725526109924111, 2.951739238160795)
	],
	[
		new google.maps.LatLng(42.710800212479512, 2.949443499486019),
		new google.maps.LatLng(42.710835125833597, 2.94912281946046),
		new google.maps.LatLng(42.710896976262987, 2.94872896405594),
		new google.maps.LatLng(42.710955226375084, 2.948327794851383),
		new google.maps.LatLng(42.711011740626503, 2.948059519631432),
		new google.maps.LatLng(42.711100575515552, 2.947697337574605),
		new google.maps.LatLng(42.711114041243967, 2.947653433666196),
		new google.maps.LatLng(42.711158921973563, 2.947500991896123)
	],
	[
		new google.maps.LatLng(42.710683599380594, 2.950021499913835),
		new google.maps.LatLng(42.71072307407082, 2.949837367159104),
		new google.maps.LatLng(42.710778683881877, 2.949549588591639),
		new google.maps.LatLng(42.710800212479512, 2.949443499486019)
	],
	[
		new google.maps.LatLng(42.708901049984142, 2.952852696394951),
		new google.maps.LatLng(42.709008023582065, 2.952807500779366),
		new google.maps.LatLng(42.709084438443078, 2.952785493970422),
		new google.maps.LatLng(42.709115004127263, 2.952776935376632),
		new google.maps.LatLng(42.70942426472299, 2.952702315700392),
		new google.maps.LatLng(42.709583381128724, 2.952643666184371),
		new google.maps.LatLng(42.709684956729326, 2.952589939681857),
		new google.maps.LatLng(42.709809874501303, 2.952456947287211),
		new google.maps.LatLng(42.709944652096745, 2.952258111034163),
		new google.maps.LatLng(42.71012794350117, 2.95197389051998),
		new google.maps.LatLng(42.710192629847363, 2.951862891746605),
		new google.maps.LatLng(42.710247433059763, 2.951768968909713),
		new google.maps.LatLng(42.710340848545101, 2.95156528642074),
		new google.maps.LatLng(42.710410900012533, 2.951390884241047),
		new google.maps.LatLng(42.710458483825008, 2.951238446005954),
		new google.maps.LatLng(42.710471931873933, 2.951154309842291),
		new google.maps.LatLng(42.710492555271273, 2.951031153996941),
		new google.maps.LatLng(42.710524799862831, 2.950761685450409),
		new google.maps.LatLng(42.710541847264381, 2.9506848621934),
		new google.maps.LatLng(42.710584020575716, 2.95049950859551),
		new google.maps.LatLng(42.710665654669285, 2.950101981632199),
		new google.maps.LatLng(42.710683599380594, 2.950021499913835)
	],
	[
		new google.maps.LatLng(42.725526109924111, 2.951739238160795),
		new google.maps.LatLng(42.725519854526567, 2.951823389051871),
		new google.maps.LatLng(42.725515391349667, 2.951896562542945),
		new google.maps.LatLng(42.725523577533387, 2.952106311327222),
		new google.maps.LatLng(42.725539063490672, 2.95255751667965),
		new google.maps.LatLng(42.725549976730278, 2.952837993957663),
		new google.maps.LatLng(42.725586351653824, 2.95377820525508),
		new google.maps.LatLng(42.725596338013922, 2.954000147800442),
		new google.maps.LatLng(42.725643676571046, 2.955381814396282),
		new google.maps.LatLng(42.725698183596677, 2.956745185529667),
		new google.maps.LatLng(42.725722705123715, 2.957357361876764)
	],
	[
		new google.maps.LatLng(42.708342795935266, 2.95306406087127),
		new google.maps.LatLng(42.708638553947246, 2.952952879981047),
		new google.maps.LatLng(42.7088632942448, 2.952868576160119),
		new google.maps.LatLng(42.708901049984142, 2.952852696394951)
	],
	[
		new google.maps.LatLng(42.707168752035507, 2.953502672190175),
		new google.maps.LatLng(42.707263125115709, 2.953427011527661),
		new google.maps.LatLng(42.707375485828663, 2.953363526896303),
		new google.maps.LatLng(42.707506735053364, 2.953315876042391),
		new google.maps.LatLng(42.707782736145617, 2.953257135631033),
		new google.maps.LatLng(42.708016474094954, 2.953188676874032),
		new google.maps.LatLng(42.708295150914203, 2.953082386827576),
		new google.maps.LatLng(42.708342795935266, 2.95306406087127)
	],
	[
		new google.maps.LatLng(42.707168752035507, 2.953502672190175),
		new google.maps.LatLng(42.707017732560637, 2.953573502100523),
		new google.maps.LatLng(42.706915251652816, 2.953613814959969),
		new google.maps.LatLng(42.706801975160467, 2.953639505933567),
		new google.maps.LatLng(42.706747132903018, 2.95364564547273)
	],
	[
		new google.maps.LatLng(42.70635511345337, 2.953625232551086),
		new google.maps.LatLng(42.706407238263111, 2.953571549955166),
		new google.maps.LatLng(42.706466564083065, 2.953537368198088),
		new google.maps.LatLng(42.706508816319548, 2.953522705533433),
		new google.maps.LatLng(42.706558266701002, 2.953522665997061),
		new google.maps.LatLng(42.706582545101632, 2.953527523156093)
	],
	[
		new google.maps.LatLng(42.706582545101632, 2.953527523156093),
		new google.maps.LatLng(42.706622109607814, 2.953536024774964),
		new google.maps.LatLng(42.706697655993217, 2.95358716693856),
		new google.maps.LatLng(42.706747132903018, 2.95364564547273)
	],
	[
		new google.maps.LatLng(42.707095957732115, 2.953579534696831),
		new google.maps.LatLng(42.707034845499102, 2.953641759622568),
		new google.maps.LatLng(42.706889255167084, 2.953791826640383),
		new google.maps.LatLng(42.706808369217377, 2.953871133400406)
	],
	[
		new google.maps.LatLng(42.706288645771238, 2.953778892390203),
		new google.maps.LatLng(42.706313785173315, 2.953695973152012),
		new google.maps.LatLng(42.70635511345337, 2.953625232551086)
	],
	[
		new google.maps.LatLng(42.706747132903018, 2.95364564547273),
		new google.maps.LatLng(42.706752530237182, 2.953652955732435),
		new google.maps.LatLng(42.706790333398729, 2.953746797587521),
		new google.maps.LatLng(42.706809262245386, 2.953857722363676),
		new google.maps.LatLng(42.706808369217377, 2.953871133400406)
	],
	[
		new google.maps.LatLng(42.705760086479074, 2.954047512785407),
		new google.maps.LatLng(42.705822107163108, 2.9540072338707),
		new google.maps.LatLng(42.705911097975239, 2.953958399978332),
		new google.maps.LatLng(42.705995594346732, 2.953913226393226),
		new google.maps.LatLng(42.706079202025407, 2.953889997222062),
		new google.maps.LatLng(42.70615022383123, 2.953872873362191),
		new google.maps.LatLng(42.706213148257426, 2.953843564696606),
		new google.maps.LatLng(42.706288645771238, 2.953778892390203)
	],
	[
		new google.maps.LatLng(42.706288645771238, 2.953778892390203),
		new google.maps.LatLng(42.706278803177412, 2.953889838910751),
		new google.maps.LatLng(42.706281513590021, 2.953920314530166),
		new google.maps.LatLng(42.706292335558111, 2.953995890251953)
	],
	[
		new google.maps.LatLng(42.706808369217377, 2.953871133400406),
		new google.maps.LatLng(42.706799419982708, 2.953967450346223),
		new google.maps.LatLng(42.70676709509047, 2.954067442965535)
	],
	[
		new google.maps.LatLng(42.705760086479074, 2.954047512785407),
		new google.maps.LatLng(42.705935390064568, 2.953994952933121),
		new google.maps.LatLng(42.705990231852589, 2.953987595563121),
		new google.maps.LatLng(42.706036983579892, 2.953983901295634),
		new google.maps.LatLng(42.706130493843425, 2.953991141187566),
		new google.maps.LatLng(42.706230301678062, 2.954005691882352),
		new google.maps.LatLng(42.706292335558111, 2.953995890251953)
	],
	[
		new google.maps.LatLng(42.706317544205668, 2.954075112458721),
		new google.maps.LatLng(42.706292335558111, 2.953995890251953)
	],
	[
		new google.maps.LatLng(42.703840810952279, 2.954786554321644),
		new google.maps.LatLng(42.703994539061455, 2.954742548545914),
		new google.maps.LatLng(42.704381998340558, 2.95461302639829),
		new google.maps.LatLng(42.704711917480921, 2.95448842500717),
		new google.maps.LatLng(42.704777540714723, 2.954462772695905),
		new google.maps.LatLng(42.705011269760845, 2.954372378317501),
		new google.maps.LatLng(42.70509667096168, 2.954338176439529),
		new google.maps.LatLng(42.70544455793052, 2.954181860993472),
		new google.maps.LatLng(42.705575803182604, 2.954125679769187),
		new google.maps.LatLng(42.705655809047038, 2.954091482457864),
		new google.maps.LatLng(42.705760086479074, 2.954047512785407)
	],
	[
		new google.maps.LatLng(42.70676709509047, 2.954067442965535),
		new google.maps.LatLng(42.706724869140785, 2.954143061009311),
		new google.maps.LatLng(42.706678134989325, 2.954188205670345),
		new google.maps.LatLng(42.706634088769363, 2.954212622439278),
		new google.maps.LatLng(42.706582848897447, 2.954233387348109),
		new google.maps.LatLng(42.706559472825468, 2.954235843520857)
	],
	[
		new google.maps.LatLng(42.706484846103677, 2.954232245171685),
		new google.maps.LatLng(42.706460567732861, 2.954227387744164),
		new google.maps.LatLng(42.706408406120119, 2.954196951022082),
		new google.maps.LatLng(42.706358934318501, 2.954148225512633),
		new google.maps.LatLng(42.706317544205668, 2.954075112458721)
	],
	[
		new google.maps.LatLng(42.706559472825468, 2.954235843520857),
		new google.maps.LatLng(42.706518115450123, 2.954239533645248),
		new google.maps.LatLng(42.706484846103677, 2.954232245171685)
	],
	[
		new google.maps.LatLng(42.701540345444243, 2.955601416293927),
		new google.maps.LatLng(42.701585292342543, 2.955581878072579),
		new google.maps.LatLng(42.701663499951039, 2.955547686134283),
		new google.maps.LatLng(42.701916101120496, 2.955434125063236),
		new google.maps.LatLng(42.702186672069701, 2.95529251199925),
		new google.maps.LatLng(42.702433875794419, 2.955174076567696),
		new google.maps.LatLng(42.702637037715895, 2.955089807327817),
		new google.maps.LatLng(42.702833019908049, 2.955037238068422),
		new google.maps.LatLng(42.703099129875426, 2.954976080615172),
		new google.maps.LatLng(42.703416482775602, 2.954903912053166),
		new google.maps.LatLng(42.70362145521824, 2.95484767680886)
	],
	[
		new google.maps.LatLng(42.700315105377761, 2.956176488698154),
		new google.maps.LatLng(42.700523651626632, 2.956064185675447),
		new google.maps.LatLng(42.700735789629519, 2.955942127079809),
		new google.maps.LatLng(42.701025246183285, 2.955810256549261),
		new google.maps.LatLng(42.701357859735204, 2.955679570825821),
		new google.maps.LatLng(42.701540345444243, 2.955601416293927)
	],
	[
		new google.maps.LatLng(42.698697855943081, 2.956750609747804),
		new google.maps.LatLng(42.698755402503778, 2.95676031909351),
		new google.maps.LatLng(42.698882177690798, 2.95676388243155),
		new google.maps.LatLng(42.698978376736086, 2.956754058439868),
		new google.maps.LatLng(42.699115022324193, 2.956710075374257),
		new google.maps.LatLng(42.699288523440778, 2.95664655982788),
		new google.maps.LatLng(42.699507864010108, 2.956547661467886),
		new google.maps.LatLng(42.699546518287107, 2.95653056639734),
		new google.maps.LatLng(42.699871038398591, 2.956395018511361),
		new google.maps.LatLng(42.700156898957495, 2.956263155695837),
		new google.maps.LatLng(42.700243193167481, 2.956215550742732)
	],
	[
		new google.maps.LatLng(42.697574157012035, 2.957187819118945),
		new google.maps.LatLng(42.697620004015931, 2.957169500733119),
		new google.maps.LatLng(42.697896877399565, 2.957047404328945),
		new google.maps.LatLng(42.698153969174939, 2.956920445876289),
		new google.maps.LatLng(42.69819262166758, 2.956898476701987),
		new google.maps.LatLng(42.698410157280378, 2.956782515810344),
		new google.maps.LatLng(42.698500948110919, 2.956738567665328),
		new google.maps.LatLng(42.698562982266701, 2.956728769993522)
	],
	[
		new google.maps.LatLng(42.698562982266701, 2.956728769993522),
		new google.maps.LatLng(42.698610637177097, 2.956734828314907),
		new google.maps.LatLng(42.698630419092837, 2.956738471172359),
		new google.maps.LatLng(42.698697855943081, 2.956750609747804)
	],
	[
		new google.maps.LatLng(42.695370706753039, 2.957792782169844),
		new google.maps.LatLng(42.695443529741553, 2.957782977477855),
		new google.maps.LatLng(42.695733017078403, 2.957725480879138),
		new google.maps.LatLng(42.695923609866696, 2.95768511948724),
		new google.maps.LatLng(42.695972157309512, 2.957675332382044),
		new google.maps.LatLng(42.696089928917552, 2.957649650204378),
		new google.maps.LatLng(42.696483698224881, 2.957559166030161),
		new google.maps.LatLng(42.696757891251593, 2.957478518075821),
		new google.maps.LatLng(42.697050963559931, 2.957392980586566),
		new google.maps.LatLng(42.697329641860918, 2.95728673069947),
		new google.maps.LatLng(42.697574157012035, 2.957187819118945)
	],
	[
		new google.maps.LatLng(42.725722705123715, 2.957357361876764),
		new google.maps.LatLng(42.725739960883118, 2.957793934471351),
		new google.maps.LatLng(42.725789437071398, 2.959051576117518),
		new google.maps.LatLng(42.725790813537529, 2.959086580336607),
		new google.maps.LatLng(42.725793527393378, 2.959128043041841)
	],
	[
		new google.maps.LatLng(42.694056295742492, 2.957965591639331),
		new google.maps.LatLng(42.694213635252645, 2.957960603194967),
		new google.maps.LatLng(42.694395243095336, 2.957936094508406),
		new google.maps.LatLng(42.694706311593883, 2.95788833380244),
		new google.maps.LatLng(42.695084809147723, 2.957831992154893),
		new google.maps.LatLng(42.695370706753039, 2.957792782169844)
	],
	[
		new google.maps.LatLng(42.693316361748472, 2.958023410203405),
		new google.maps.LatLng(42.693436822098761, 2.95797700776178),
		new google.maps.LatLng(42.693487170097931, 2.957972096838549),
		new google.maps.LatLng(42.693553700738434, 2.957965954513968),
		new google.maps.LatLng(42.693771286167049, 2.957976767533018),
		new google.maps.LatLng(42.69399425920799, 2.957969292555276),
		new google.maps.LatLng(42.694056295742492, 2.957965591639331)
	],
	[
		new google.maps.LatLng(42.693066176188964, 2.959745794422433),
		new google.maps.LatLng(42.693058934662538, 2.959616603135377),
		new google.maps.LatLng(42.693065168924598, 2.959459370307558),
		new google.maps.LatLng(42.693104613890561, 2.95915707376964),
		new google.maps.LatLng(42.693188045196742, 2.958676796002888),
		new google.maps.LatLng(42.693269700363047, 2.958256241421466),
		new google.maps.LatLng(42.693294820646564, 2.958117276924113),
		new google.maps.LatLng(42.693316361748472, 2.958023410203405)
	],
	[
		new google.maps.LatLng(42.725793527393378, 2.959128043041841),
		new google.maps.LatLng(42.725820772530824, 2.959846316786077),
		new google.maps.LatLng(42.725840744482618, 2.960359717693161),
		new google.maps.LatLng(42.725848923467787, 2.960596297678648),
		new google.maps.LatLng(42.725873464245247, 2.961320672337888),
		new google.maps.LatLng(42.725889726173925, 2.96153773510973)
	],
	[
		new google.maps.LatLng(42.693663647532787, 2.961022725259487),
		new google.maps.LatLng(42.693569188452358, 2.960872871030579),
		new google.maps.LatLng(42.693456732943325, 2.960686465023629),
		new google.maps.LatLng(42.693355972879722, 2.960519553221917),
		new google.maps.LatLng(42.693280392136813, 2.96036603085681),
		new google.maps.LatLng(42.693201194995034, 2.960158883921964),
		new google.maps.LatLng(42.693121984998484, 2.95991882920513),
		new google.maps.LatLng(42.693066176188964, 2.959745794422433)
	],
	[
		new google.maps.LatLng(42.693729611776021, 2.961939250164377),
		new google.maps.LatLng(42.693733191114227, 2.961890493380155),
		new google.maps.LatLng(42.693744802716239, 2.961675970414476),
		new google.maps.LatLng(42.69374923945216, 2.961513861589757),
		new google.maps.LatLng(42.693740200044275, 2.961378576232454),
		new google.maps.LatLng(42.693732087669972, 2.961322513942426),
		new google.maps.LatLng(42.693718568877472, 2.961231110451002),
		new google.maps.LatLng(42.693697845140164, 2.961110459270554),
		new google.maps.LatLng(42.693663647532787, 2.961022725259487)
	],
	[
		new google.maps.LatLng(42.725889726173925, 2.96153773510973),
		new google.maps.LatLng(42.725933259868171, 2.96259746550217),
		new google.maps.LatLng(42.725937792336929, 2.962703560254418),
		new google.maps.LatLng(42.725976817621522, 2.963760856470947),
		new google.maps.LatLng(42.725986812257531, 2.964070606936869),
		new google.maps.LatLng(42.726004965559177, 2.964584012831638)
	],
	[
		new google.maps.LatLng(42.693737999684544, 2.962781463492759),
		new google.maps.LatLng(42.693730741100808, 2.962592547958867),
		new google.maps.LatLng(42.693718951864852, 2.962304909309198),
		new google.maps.LatLng(42.69371800948624, 2.962180588098831),
		new google.maps.LatLng(42.693717971116413, 2.962073330256434),
		new google.maps.LatLng(42.693729611776021, 2.961939250164377)
	],
	[
		new google.maps.LatLng(42.693743678609877, 2.963609053111738),
		new google.maps.LatLng(42.693747141752397, 2.963219021628399),
		new google.maps.LatLng(42.693742538850344, 2.962905782599103),
		new google.maps.LatLng(42.693737999684544, 2.962781463492759)
	],
	[
		new google.maps.LatLng(42.693742828328865, 2.963751658568506),
		new google.maps.LatLng(42.693743684572027, 2.963624897832596),
		new google.maps.LatLng(42.693743678609877, 2.963609053111738)
	],
	[
		new google.maps.LatLng(42.693756549934221, 2.964453702679614),
		new google.maps.LatLng(42.693743844025285, 2.964099027590394),
		new google.maps.LatLng(42.693742828328865, 2.963751658568506)
	],
	[
		new google.maps.LatLng(42.693798116741931, 2.965085037281022),
		new google.maps.LatLng(42.693790896041506, 2.965000942082882),
		new google.maps.LatLng(42.693761991941464, 2.964595085358122),
		new google.maps.LatLng(42.693756549934221, 2.964453702679614)
	],
	[
		new google.maps.LatLng(42.726004965559177, 2.964584012831638),
		new google.maps.LatLng(42.726035799169686, 2.965388875780115),
		new google.maps.LatLng(42.726063860080416, 2.965974227834536),
		new google.maps.LatLng(42.726083796697843, 2.96647055990104)
	],
	[
		new google.maps.LatLng(42.693866838011445, 2.96630384018709),
		new google.maps.LatLng(42.693872210898391, 2.966234363443428),
		new google.maps.LatLng(42.693880241947355, 2.966043000315477),
		new google.maps.LatLng(42.693881098917053, 2.965910145756258),
		new google.maps.LatLng(42.693869364252215, 2.965763890576071),
		new google.maps.LatLng(42.693859445769121, 2.965676140308779),
		new google.maps.LatLng(42.693836010741663, 2.965493327868194),
		new google.maps.LatLng(42.693798116741931, 2.965085037281022)
	],
	[
		new google.maps.LatLng(42.693843510229115, 2.966458647641946),
		new google.maps.LatLng(42.693864153983455, 2.966345282337921),
		new google.maps.LatLng(42.693866838011445, 2.96630384018709)
	],
	[
		new google.maps.LatLng(42.693621743551837, 2.967464316816347),
		new google.maps.LatLng(42.693668433473562, 2.967255869082232),
		new google.maps.LatLng(42.693761814465091, 2.966849941816494),
		new google.maps.LatLng(42.693836329882494, 2.966498872998792),
		new google.maps.LatLng(42.693843510229115, 2.966458647641946)
	],
	[
		new google.maps.LatLng(42.726083796697843, 2.96647055990104),
		new google.maps.LatLng(42.726086517180526, 2.966543729116397),
		new google.maps.LatLng(42.726123675340538, 2.967498591735217),
		new google.maps.LatLng(42.72621793710131, 2.970082704821078),
		new google.maps.LatLng(42.726218845100099, 2.970115631506131),
		new google.maps.LatLng(42.726223369293578, 2.970216849159874)
	],
	[
		new google.maps.LatLng(42.693540136011954, 2.968162756626927),
		new google.maps.LatLng(42.693557150232913, 2.967932386820614),
		new google.maps.LatLng(42.693596601944357, 2.967571588889422),
		new google.maps.LatLng(42.693621743551837, 2.967464316816347)
	],
	[
		new google.maps.LatLng(42.693780286987931, 2.96847342946911),
		new google.maps.LatLng(42.693597739896958, 2.968368707959262),
		new google.maps.LatLng(42.693541081919619, 2.968319986106709),
		new google.maps.LatLng(42.693537452328215, 2.968207854847007),
		new google.maps.LatLng(42.693540136011954, 2.968162756626927)
	],
	[
		new google.maps.LatLng(42.693927716536543, 2.968399000105158),
		new google.maps.LatLng(42.693892656664957, 2.96841486396591),
		new google.maps.LatLng(42.693780286987931, 2.96847342946911)
	],
	[
		new google.maps.LatLng(42.693898168071435, 2.968813423530767),
		new google.maps.LatLng(42.693905331273761, 2.96871103611282),
		new google.maps.LatLng(42.693927716536543, 2.968399000105158)
	],
	[
		new google.maps.LatLng(42.693831036041779, 2.969861664833515),
		new google.maps.LatLng(42.693844454555325, 2.969621544997608),
		new google.maps.LatLng(42.693898168071435, 2.968813423530767)
	],
	[
		new google.maps.LatLng(42.693881393901201, 2.969892109437313),
		new google.maps.LatLng(42.693856214166445, 2.969873839733209),
		new google.maps.LatLng(42.693831036041779, 2.969861664833515)
	],
	[
		new google.maps.LatLng(42.69410352304304, 2.970078479243547),
		new google.maps.LatLng(42.694082838342005, 2.970060207226644),
		new google.maps.LatLng(42.693941645882177, 2.969937176078997),
		new google.maps.LatLng(42.693881393901201, 2.969892109437313)
	],
	[
		new google.maps.LatLng(42.694763226365332, 2.972563400688425),
		new google.maps.LatLng(42.69476231877762, 2.972529272681109),
		new google.maps.LatLng(42.694765898524963, 2.972463452713114),
		new google.maps.LatLng(42.694784755462884, 2.972370810395747),
		new google.maps.LatLng(42.694842260363536, 2.972225738831143),
		new google.maps.LatLng(42.694897969046288, 2.972091637153249),
		new google.maps.LatLng(42.69495097318233, 2.971928283621198),
		new google.maps.LatLng(42.694995884329245, 2.97176005781719),
		new google.maps.LatLng(42.695019231754401, 2.971651566618347),
		new google.maps.LatLng(42.695033599417741, 2.971584522154261),
		new google.maps.LatLng(42.695080282483339, 2.971322442672711),
		new google.maps.LatLng(42.69514851975584, 2.970971374711427),
		new google.maps.LatLng(42.695153897046467, 2.970907990634736),
		new google.maps.LatLng(42.695148484362065, 2.970843392395463),
		new google.maps.LatLng(42.695138580977954, 2.970792205350636),
		new google.maps.LatLng(42.695119689207836, 2.970754429186739),
		new google.maps.LatLng(42.695079219343945, 2.970714227229891),
		new google.maps.LatLng(42.694962320702686, 2.970655780451006),
		new google.maps.LatLng(42.694784280718039, 2.970590051238278),
		new google.maps.LatLng(42.694715043135432, 2.970564490250919),
		new google.maps.LatLng(42.694672781688475, 2.970548666584113),
		new google.maps.LatLng(42.694630516815415, 2.970523091638511),
		new google.maps.LatLng(42.69460623749108, 2.970508477460456),
		new google.maps.LatLng(42.694475837735247, 2.970398846796577),
		new google.maps.LatLng(42.694256405612784, 2.970206379814435),
		new google.maps.LatLng(42.69410352304304, 2.970078479243547)
	],
	[
		new google.maps.LatLng(42.726223369293578, 2.970216849159874),
		new google.maps.LatLng(42.726232416510811, 2.97041928573323),
		new google.maps.LatLng(42.726266791355464, 2.971182689284513)
	],
	[
		new google.maps.LatLng(42.726266791355464, 2.971182689284513),
		new google.maps.LatLng(42.726295769738087, 2.971958290873515),
		new google.maps.LatLng(42.726334700822648, 2.973007062576976),
		new google.maps.LatLng(42.726353715665596, 2.973538766336432),
		new google.maps.LatLng(42.726361828217478, 2.973621690179323),
		new google.maps.LatLng(42.726383419260102, 2.973672900953919),
		new google.maps.LatLng(42.726427487427948, 2.973718003009834),
		new google.maps.LatLng(42.726654108800489, 2.973891074010388),
		new google.maps.LatLng(42.726712563569677, 2.973938610063343)
	],
	[
		new google.maps.LatLng(42.695121276192509, 2.973389625783432),
		new google.maps.LatLng(42.695116624770307, 2.97337903917511),
		new google.maps.LatLng(42.695098785603605, 2.973338443770181),
		new google.maps.LatLng(42.695025921956663, 2.973192213199285),
		new google.maps.LatLng(42.694944064329775, 2.973033798305351),
		new google.maps.LatLng(42.694828923442742, 2.972809581170627),
		new google.maps.LatLng(42.694783040337043, 2.972695028714496),
		new google.maps.LatLng(42.694771339648803, 2.972646279690196),
		new google.maps.LatLng(42.694764132789892, 2.972588996594693),
		new google.maps.LatLng(42.694763226365332, 2.972563400688425)
	],
	[
		new google.maps.LatLng(42.695525304505878, 2.974766774617724),
		new google.maps.LatLng(42.695499208514974, 2.974672932223979),
		new google.maps.LatLng(42.695404722016235, 2.974332907329553),
		new google.maps.LatLng(42.695304839024381, 2.973988010032409),
		new google.maps.LatLng(42.695217546383702, 2.973660171601024),
		new google.maps.LatLng(42.695153661523676, 2.973463962825637),
		new google.maps.LatLng(42.695121276192509, 2.973389625783432)
	],
	[
		new google.maps.LatLng(42.726416896511644, 2.974537528683924),
		new google.maps.LatLng(42.726451055951379, 2.974509465550325),
		new google.maps.LatLng(42.72648701663892, 2.974488717050046),
		new google.maps.LatLng(42.72652566976997, 2.974450894460396),
		new google.maps.LatLng(42.726557126535994, 2.97439844152487),
		new google.maps.LatLng(42.726585878884237, 2.974317939283409),
		new google.maps.LatLng(42.726712563569677, 2.973938610063343)
	],
	[
		new google.maps.LatLng(42.726416896511644, 2.974537528683924),
		new google.maps.LatLng(42.726409716596564, 2.974592411157237),
		new google.maps.LatLng(42.726383653004341, 2.97463998351103),
		new google.maps.LatLng(42.726344994843053, 2.974659513150367)
	],
	[
		new google.maps.LatLng(42.726344994843053, 2.974659513150367),
		new google.maps.LatLng(42.72634770979672, 2.974731463191544),
		new google.maps.LatLng(42.72635042677048, 2.974816829060714),
		new google.maps.LatLng(42.726353167463095, 2.975002195132298),
		new google.maps.LatLng(42.726351416049425, 2.975202198684688),
		new google.maps.LatLng(42.726347874097151, 2.97543756737056),
		new google.maps.LatLng(42.726346118150097, 2.975624156294556)
	],
	[
		new google.maps.LatLng(42.695841139154972, 2.975857540217316),
		new google.maps.LatLng(42.695833940899917, 2.975833165514056),
		new google.maps.LatLng(42.695748459892911, 2.975540669162098),
		new google.maps.LatLng(42.695705269087242, 2.975390764970976),
		new google.maps.LatLng(42.695660278302626, 2.975235985975786),
		new google.maps.LatLng(42.695578395788118, 2.974959335004353),
		new google.maps.LatLng(42.695525304505878, 2.974766774617724)
	],
	[
		new google.maps.LatLng(42.726346118150097, 2.975624156294556),
		new google.maps.LatLng(42.726347929113722, 2.975681472290754),
		new google.maps.LatLng(42.726359699040984, 2.97604244700318),
		new google.maps.LatLng(42.726373272093987, 2.976430250377951),
		new google.maps.LatLng(42.726394971181051, 2.976981467119999),
		new google.maps.LatLng(42.726410347256731, 2.977407074417588),
		new google.maps.LatLng(42.726410353297894, 2.977437563174205)
	],
	[
		new google.maps.LatLng(42.695998730661266, 2.976992260064664),
		new google.maps.LatLng(42.695998705567142, 2.976872809481229),
		new google.maps.LatLng(42.695998652201943, 2.976629031336594),
		new google.maps.LatLng(42.695985122396728, 2.976429138924906),
		new google.maps.LatLng(42.695963516190048, 2.976303602838653),
		new google.maps.LatLng(42.695923022039359, 2.976146382319008),
		new google.maps.LatLng(42.695841139154972, 2.975857540217316)
	],
	[
		new google.maps.LatLng(42.696093380602029, 2.978158700985015),
		new google.maps.LatLng(42.696077176969368, 2.978061196283533),
		new google.maps.LatLng(42.696050145827002, 2.977778423827398),
		new google.maps.LatLng(42.696037532252511, 2.977654101921703),
		new google.maps.LatLng(42.69602491896142, 2.977527341575839),
		new google.maps.LatLng(42.696014092765161, 2.977351826693488),
		new google.maps.LatLng(42.696010481971392, 2.977284789066279),
		new google.maps.LatLng(42.696000549694915, 2.977088551657255),
		new google.maps.LatLng(42.695998744102646, 2.977054423235383),
		new google.maps.LatLng(42.695998730661266, 2.976992260064664)
	],
	[
		new google.maps.LatLng(42.726410353297894, 2.977437563174205),
		new google.maps.LatLng(42.726412159494025, 2.977475367894437),
		new google.maps.LatLng(42.726419392469992, 2.977664390956261)
	],
	[
		new google.maps.LatLng(42.726419392469992, 2.977664390956261),
		new google.maps.LatLng(42.726447411319441, 2.978379022693026),
		new google.maps.LatLng(42.726464578630029, 2.97879731345825)
	],
	[
		new google.maps.LatLng(42.696321988805558, 2.97935313256209),
		new google.maps.LatLng(42.696276090889917, 2.979126434442103),
		new google.maps.LatLng(42.696206793943801, 2.978788825932961),
		new google.maps.LatLng(42.696149194198576, 2.97849996937379),
		new google.maps.LatLng(42.696114085635493, 2.978285457543232),
		new google.maps.LatLng(42.696093380602029, 2.978158700985015)
	],
	[
		new google.maps.LatLng(42.726464578630029, 2.97879731345825),
		new google.maps.LatLng(42.726481741279684, 2.979203409671595)
	],
	[
		new google.maps.LatLng(42.726481741279684, 2.979203409671595),
		new google.maps.LatLng(42.726491674954296, 2.979427799205589),
		new google.maps.LatLng(42.72649980753868, 2.979636336300291)
	],
	[
		new google.maps.LatLng(42.696363389711188, 2.979576175964457),
		new google.maps.LatLng(42.696329187630909, 2.979384820932337),
		new google.maps.LatLng(42.696321988805558, 2.97935313256209)
	],
	[
		new google.maps.LatLng(42.696404957190154, 2.980699984982506),
		new google.maps.LatLng(42.696401351060707, 2.98064879213932),
		new google.maps.LatLng(42.696402229162111, 2.980529339275337),
		new google.maps.LatLng(42.69641567169802, 2.980292869546519),
		new google.maps.LatLng(42.696420141246534, 2.980151475048342),
		new google.maps.LatLng(42.696421033966672, 2.980118564693651),
		new google.maps.LatLng(42.69642192155839, 2.98005640080933),
		new google.maps.LatLng(42.696418306998716, 2.979958891023784),
		new google.maps.LatLng(42.696410194549749, 2.979845536085792),
		new google.maps.LatLng(42.696390391232391, 2.979727309211858),
		new google.maps.LatLng(42.696368790653445, 2.979607864973314),
		new google.maps.LatLng(42.696363389711188, 2.979576175964457)
	],
	[
		new google.maps.LatLng(42.72649980753868, 2.979636336300291),
		new google.maps.LatLng(42.726508841649, 2.979864384576308)
	],
	[
		new google.maps.LatLng(42.726508841649, 2.979864384576308),
		new google.maps.LatLng(42.726516069121068, 2.98004974989715)
	],
	[
		new google.maps.LatLng(42.726516069121068, 2.98004974989715),
		new google.maps.LatLng(42.726552985483302, 2.980331447995102)
	],
	[
		new google.maps.LatLng(42.726552985483302, 2.980331447995102),
		new google.maps.LatLng(42.726530510143348, 2.980344870993536),
		new google.maps.LatLng(42.726516128426915, 2.980370486207187),
		new google.maps.LatLng(42.726507142163705, 2.980397318325438),
		new google.maps.LatLng(42.726507151445645, 2.980446099923963),
		new google.maps.LatLng(42.726513451634219, 2.98048390215365),
		new google.maps.LatLng(42.726529640656999, 2.980508287862234),
		new google.maps.LatLng(42.72654402824822, 2.980516819814488)
	],
	[
		new google.maps.LatLng(42.726563927032458, 2.981177796923542),
		new google.maps.LatLng(42.726563924009298, 2.981159504112465),
		new google.maps.LatLng(42.72654403428978, 2.980552185578956),
		new google.maps.LatLng(42.72654402824822, 2.980516819814488)
	],
	[
		new google.maps.LatLng(42.69649678300415, 2.981365472867024),
		new google.maps.LatLng(42.696448174010463, 2.981036385433658),
		new google.maps.LatLng(42.696418467130833, 2.980831621043943),
		new google.maps.LatLng(42.696408564661482, 2.980764584730201),
		new google.maps.LatLng(42.696404957190154, 2.980699984982506)
	],
	[
		new google.maps.LatLng(42.726576547218343, 2.981360722466941),
		new google.maps.LatLng(42.726563927032458, 2.981177796923542)
	],
	[
		new google.maps.LatLng(42.697029327011663, 2.98303642832398),
		new google.maps.LatLng(42.696959185956558, 2.982964532939333),
		new google.maps.LatLng(42.696881848656965, 2.982871918350637),
		new google.maps.LatLng(42.696838678555963, 2.982789046147154),
		new google.maps.LatLng(42.696790109956289, 2.982679359161901),
		new google.maps.LatLng(42.696727140903874, 2.98248313341467),
		new google.maps.LatLng(42.696661471866165, 2.982271064589125),
		new google.maps.LatLng(42.696626384854078, 2.98213699662351),
		new google.maps.LatLng(42.69659849160103, 2.982013895147267),
		new google.maps.LatLng(42.696592192867989, 2.981982206072493),
		new google.maps.LatLng(42.696548090578261, 2.981709186203992),
		new google.maps.LatLng(42.696498583918419, 2.981378880464391),
		new google.maps.LatLng(42.69649678300415, 2.981365472867024)
	],
	[
		new google.maps.LatLng(42.726580150924441, 2.981404624875427),
		new google.maps.LatLng(42.726576547218343, 2.981360722466941)
	],
	[
		new google.maps.LatLng(42.726588288732913, 2.9816680397614),
		new google.maps.LatLng(42.726588284495477, 2.981647308470695),
		new google.maps.LatLng(42.726580150924441, 2.981404624875427)
	],
	[
		new google.maps.LatLng(42.726592830239532, 2.981942433167298),
		new google.maps.LatLng(42.726592827145581, 2.981922920500721),
		new google.maps.LatLng(42.726588288732913, 2.9816680397614)
	],
	[
		new google.maps.LatLng(42.726593733267435, 2.981965603891796),
		new google.maps.LatLng(42.726592830239532, 2.981942433167298)
	],
	[
		new google.maps.LatLng(42.726583927219032, 2.982470491451155),
		new google.maps.LatLng(42.726590206107026, 2.98238024420137),
		new google.maps.LatLng(42.726597378779587, 2.98225463088104),
		new google.maps.LatLng(42.726596457224339, 2.982124141699801),
		new google.maps.LatLng(42.726593733267435, 2.981965603891796)
	],
	[
		new google.maps.LatLng(42.72658034057693, 2.982529030456885),
		new google.maps.LatLng(42.726583927219032, 2.982470491451155)
	],
	[
		new google.maps.LatLng(42.726481570567714, 2.98337175249782),
		new google.maps.LatLng(42.726495932191561, 2.983216868612974),
		new google.maps.LatLng(42.726534541553796, 2.98287782892571),
		new google.maps.LatLng(42.726554294080216, 2.982704650480857),
		new google.maps.LatLng(42.72658034057693, 2.982529030456885)
	],
	[
		new google.maps.LatLng(42.697302700195863, 2.983334983197188),
		new google.maps.LatLng(42.697193890273795, 2.983213122249202),
		new google.maps.LatLng(42.697063499152279, 2.983072985955588),
		new google.maps.LatLng(42.697029327011663, 2.98303642832398)
	],
	[
		new google.maps.LatLng(42.697443892458672, 2.98355069067029),
		new google.maps.LatLng(42.697425003335773, 2.98350193941842),
		new google.maps.LatLng(42.697389029971198, 2.983441003698773),
		new google.maps.LatLng(42.697302700195863, 2.983334983197188)
	],
	[
		new google.maps.LatLng(42.72645643672557, 2.983642495078318),
		new google.maps.LatLng(42.726481570567714, 2.98337175249782)
	],
	[
		new google.maps.LatLng(42.697610771202882, 2.987603560342804),
		new google.maps.LatLng(42.697593684501662, 2.987564559130532),
		new google.maps.LatLng(42.697550516343227, 2.987468273119414),
		new google.maps.LatLng(42.697525331533939, 2.987386611213426),
		new google.maps.LatLng(42.697513635102965, 2.987319573022857),
		new google.maps.LatLng(42.697500136439189, 2.987213529436208),
		new google.maps.LatLng(42.697492023946829, 2.987044102049397),
		new google.maps.LatLng(42.697487501127732, 2.986817383933978),
		new google.maps.LatLng(42.697481191048212, 2.986684523477535),
		new google.maps.LatLng(42.697464088306333, 2.986527286021632),
		new google.maps.LatLng(42.697453288555089, 2.98644196486579),
		new google.maps.LatLng(42.697443389097167, 2.986372487989841),
		new google.maps.LatLng(42.697419090639769, 2.98618965613388),
		new google.maps.LatLng(42.697408281834903, 2.986039731967649),
		new google.maps.LatLng(42.697401061513986, 2.985833736376104),
		new google.maps.LatLng(42.697398340543643, 2.985650899859593),
		new google.maps.LatLng(42.697409109226285, 2.985499751516105),
		new google.maps.LatLng(42.697445049777457, 2.985326655133133),
		new google.maps.LatLng(42.697500762429911, 2.98510479870711),
		new google.maps.LatLng(42.697520530388481, 2.985015812534567),
		new google.maps.LatLng(42.697551080539924, 2.984878066096891),
		new google.maps.LatLng(42.697576235345196, 2.984734226914182),
		new google.maps.LatLng(42.697585218640207, 2.984684249033275),
		new google.maps.LatLng(42.697605875311602, 2.984525783160021),
		new google.maps.LatLng(42.697612153843934, 2.984420954327426),
		new google.maps.LatLng(42.697604941608404, 2.984288094075751),
		new google.maps.LatLng(42.697591440744944, 2.984193020816295),
		new google.maps.LatLng(42.697577045083058, 2.984124765792767),
		new google.maps.LatLng(42.697553651981949, 2.984010194078824),
		new google.maps.LatLng(42.697494270277019, 2.98373960987003),
		new google.maps.LatLng(42.697448389572706, 2.98356531709414),
		new google.maps.LatLng(42.697443892458672, 2.98355069067029)
	],
	[
		new google.maps.LatLng(42.726442973881419, 2.983797378530439),
		new google.maps.LatLng(42.726452848259768, 2.983692496207535),
		new google.maps.LatLng(42.72645643672557, 2.983642495078318)
	],
	[
		new google.maps.LatLng(42.726430406878968, 2.98393518875441),
		new google.maps.LatLng(42.726442973881419, 2.983797378530439)
	],
	[
		new google.maps.LatLng(42.726407075816972, 2.984244954419277),
		new google.maps.LatLng(42.72640796684292, 2.984191294517395),
		new google.maps.LatLng(42.726430406878968, 2.98393518875441)
	],
	[
		new google.maps.LatLng(42.726443082046274, 2.984530313057361),
		new google.maps.LatLng(42.726414292761589, 2.984412027179658),
		new google.maps.LatLng(42.726407083055641, 2.984297394248578),
		new google.maps.LatLng(42.726407075816972, 2.984244954419277)
	],
	[
		new google.maps.LatLng(42.72674163467957, 2.984837556413163),
		new google.maps.LatLng(42.726689479879148, 2.984796105308436),
		new google.maps.LatLng(42.726550999117897, 2.98468638489534),
		new google.maps.LatLng(42.726497944081359, 2.984638836264113),
		new google.maps.LatLng(42.72647006376522, 2.984583964826254),
		new google.maps.LatLng(42.726443082046274, 2.984530313057361)
	],
	[
		new google.maps.LatLng(42.726863929733945, 2.984935086575605),
		new google.maps.LatLng(42.726829759734166, 2.98490948532862),
		new google.maps.LatLng(42.72674163467957, 2.984837556413163)
	],
	[
		new google.maps.LatLng(42.726901696743539, 2.984964346536603),
		new google.maps.LatLng(42.726863929733945, 2.984935086575605)
	],
	[
		new google.maps.LatLng(42.727140889867719, 2.985148434487885),
		new google.maps.LatLng(42.726990719694314, 2.985032617258057),
		new google.maps.LatLng(42.726901696743539, 2.984964346536603)
	],
	[
		new google.maps.LatLng(42.727414258069111, 2.985400811009336),
		new google.maps.LatLng(42.727344116107361, 2.985322778368551),
		new google.maps.LatLng(42.727298254405476, 2.985275226873342),
		new google.maps.LatLng(42.727241602453319, 2.98522280102519),
		new google.maps.LatLng(42.727140889867719, 2.985148434487885)
	],
	[
		new google.maps.LatLng(42.727414258069111, 2.985400811009336),
		new google.maps.LatLng(42.727409764796718, 2.985414228119943),
		new google.maps.LatLng(42.727405270310285, 2.985425204281924),
		new google.maps.LatLng(42.727405274206014, 2.985455693528941),
		new google.maps.LatLng(42.727414269408946, 2.985482521079544),
		new google.maps.LatLng(42.727430456895071, 2.985503248858989),
		new google.maps.LatLng(42.727436751222506, 2.985508125619029)
	],
	[
		new google.maps.LatLng(42.727436751222506, 2.985508125619029),
		new google.maps.LatLng(42.727432266748878, 2.985591056628504),
		new google.maps.LatLng(42.727433187097446, 2.985750817019511)
	],
	[
		new google.maps.LatLng(42.727433187097446, 2.985750817019511),
		new google.maps.LatLng(42.727433197731209, 2.985828867524377),
		new google.maps.LatLng(42.727422440155884, 2.986073999015515),
		new google.maps.LatLng(42.72742154898549, 2.986133756643298)
	],
	[
		new google.maps.LatLng(42.72742154898549, 2.986133756643298),
		new google.maps.LatLng(42.727417079935655, 2.986341080661548),
		new google.maps.LatLng(42.727411708989436, 2.98653011178342)
	],
	[
		new google.maps.LatLng(42.727370617779663, 2.988866769988905),
		new google.maps.LatLng(42.727380461824367, 2.988430171011781),
		new google.maps.LatLng(42.72738045909702, 2.98840334136418),
		new google.maps.LatLng(42.727395640625851, 2.987488678325256),
		new google.maps.LatLng(42.727407241346192, 2.986755728800508),
		new google.maps.LatLng(42.727411708989436, 2.98653011178342)
	],
	[
		new google.maps.LatLng(42.697897765060425, 2.989277087816189),
		new google.maps.LatLng(42.697890569218544, 2.989247834838223),
		new google.maps.LatLng(42.697869876240986, 2.989110099891506),
		new google.maps.LatLng(42.697868976297613, 2.989104006083021),
		new google.maps.LatLng(42.697838387909641, 2.988915077841647),
		new google.maps.LatLng(42.697829390395178, 2.988856571062488),
		new google.maps.LatLng(42.697786199215976, 2.988527469677895),
		new google.maps.LatLng(42.697724115251042, 2.988104514743147),
		new google.maps.LatLng(42.697719616417004, 2.988076480742841),
		new google.maps.LatLng(42.697682724681421, 2.987821733219434),
		new google.maps.LatLng(42.697660236388344, 2.987731536740642),
		new google.maps.LatLng(42.697641348504824, 2.987669375658293),
		new google.maps.LatLng(42.697610771202882, 2.987603560342804)
	],
	[
		new google.maps.LatLng(42.72735720887357, 2.989644842890956),
		new google.maps.LatLng(42.727370617779663, 2.988866769988905)
	],
	[
		new google.maps.LatLng(42.698005690571385, 2.989622025270098),
		new google.maps.LatLng(42.697954427439448, 2.989469668613903),
		new google.maps.LatLng(42.69791305552414, 2.989339250264545),
		new google.maps.LatLng(42.697897765060425, 2.989277087816189)
	],
	[
		new google.maps.LatLng(42.698465250882343, 2.990948150017649),
		new google.maps.LatLng(42.698461650552531, 2.990900612755701),
		new google.maps.LatLng(42.698458049321282, 2.990842104302514),
		new google.maps.LatLng(42.698449951960342, 2.990781157938862),
		new google.maps.LatLng(42.69842296981399, 2.990676333317842),
		new google.maps.LatLng(42.698378904012294, 2.990558104062468),
		new google.maps.LatLng(42.698295270762628, 2.990365525144),
		new google.maps.LatLng(42.698199945989316, 2.990147352094351),
		new google.maps.LatLng(42.698191853073538, 2.990131507520843),
		new google.maps.LatLng(42.698132497213876, 2.989968180154916),
		new google.maps.LatLng(42.698071342507795, 2.989806072683394),
		new google.maps.LatLng(42.698005690571385, 2.989622025270098)
	],
	[
		new google.maps.LatLng(42.72735720887357, 2.989644842890956),
		new google.maps.LatLng(42.727351841755542, 2.989938753581821),
		new google.maps.LatLng(42.727351845558438, 2.98997168130532),
		new google.maps.LatLng(42.727334850087303, 2.990968052098652),
		new google.maps.LatLng(42.72730977171959, 2.992201015388665),
		new google.maps.LatLng(42.72729992857257, 2.9928790834468)
	],
	[
		new google.maps.LatLng(42.698353022466733, 2.993077652722592),
		new google.maps.LatLng(42.698355716972443, 2.993033770147385),
		new google.maps.LatLng(42.698366498252689, 2.992913094490941),
		new google.maps.LatLng(42.698367389062994, 2.992791200651673),
		new google.maps.LatLng(42.698366482471002, 2.992677839619665),
		new google.maps.LatLng(42.698363778316697, 2.992583981363985),
		new google.maps.LatLng(42.698358376032701, 2.992463307581968),
		new google.maps.LatLng(42.698355670065645, 2.99234507084943),
		new google.maps.LatLng(42.698352065432452, 2.992225614948915),
		new google.maps.LatLng(42.698357450846991, 2.992108596499292),
		new google.maps.LatLng(42.69837182226069, 2.991911126824581),
		new google.maps.LatLng(42.698393384894061, 2.991705122274289),
		new google.maps.LatLng(42.69840416647537, 2.991607605538952),
		new google.maps.LatLng(42.698430223929783, 2.991406477321972),
		new google.maps.LatLng(42.698455383415308, 2.991216319039117),
		new google.maps.LatLng(42.69846526588254, 2.991127334861822),
		new google.maps.LatLng(42.698467955905208, 2.991035914330073),
		new google.maps.LatLng(42.698465250882343, 2.990948150017649)
	],
	[
		new google.maps.LatLng(42.727363848105462, 2.994237648415611),
		new google.maps.LatLng(42.727371915414913, 2.993793733788749),
		new google.maps.LatLng(42.727377287080714, 2.993405917132443),
		new google.maps.LatLng(42.727381759411372, 2.993040053150743),
		new google.maps.LatLng(42.727381754240483, 2.992955904618299),
		new google.maps.LatLng(42.727382648456121, 2.992887610531834),
		new google.maps.LatLng(42.72729992857257, 2.9928790834468)
	],
	[
		new google.maps.LatLng(42.698494284527094, 2.994910922700233),
		new google.maps.LatLng(42.698467309219353, 2.994873137808369),
		new google.maps.LatLng(42.698425947801567, 2.994817069643425),
		new google.maps.LatLng(42.698391779551756, 2.994763439528767),
		new google.maps.LatLng(42.698343223746789, 2.99468055626478),
		new google.maps.LatLng(42.698308156108126, 2.994608641904716),
		new google.maps.LatLng(42.698280279297556, 2.994528195626331),
		new google.maps.LatLng(42.69826049558629, 2.994462374063188),
		new google.maps.LatLng(42.698252401601522, 2.994412398581222),
		new google.maps.LatLng(42.698246103781813, 2.994329511911702),
		new google.maps.LatLng(42.69824879293531, 2.994188115640479),
		new google.maps.LatLng(42.69827035813789, 2.993952857889361),
		new google.maps.LatLng(42.698302706922739, 2.993617647609905),
		new google.maps.LatLng(42.698308995416369, 2.993540853650496),
		new google.maps.LatLng(42.698319777515401, 2.993425052893887),
		new google.maps.LatLng(42.698331458427461, 2.993301939917655),
		new google.maps.LatLng(42.698345835876253, 2.993170292782424),
		new google.maps.LatLng(42.698353022466733, 2.993077652722592)
	],
	[
		new google.maps.LatLng(42.727338743181193, 2.995746227646299),
		new google.maps.LatLng(42.727339631065284, 2.995471830753819),
		new google.maps.LatLng(42.727341428663621, 2.995443781129708),
		new google.maps.LatLng(42.727347935426586, 2.995369210338541),
		new google.maps.LatLng(42.727349516443091, 2.995351094233771),
		new google.maps.LatLng(42.727346805733525, 2.995051086581256),
		new google.maps.LatLng(42.727363848105462, 2.994237648415611)
	],
	[
		new google.maps.LatLng(42.699020280351931, 2.995409427222226),
		new google.maps.LatLng(42.698897998766938, 2.995319234802382),
		new google.maps.LatLng(42.698817077158971, 2.995257074914253),
		new google.maps.LatLng(42.698755935453704, 2.995202228227889),
		new google.maps.LatLng(42.69870018903633, 2.995148599304664),
		new google.maps.LatLng(42.698627358298289, 2.995073030596984),
		new google.maps.LatLng(42.698577006021964, 2.995015744801909),
		new google.maps.LatLng(42.698516762695121, 2.99494139344649),
		new google.maps.LatLng(42.698494284527094, 2.994910922700233)
	],
	[
		new google.maps.LatLng(42.700352795913446, 2.996714849315643),
		new google.maps.LatLng(42.7003186287413, 2.996667311914807),
		new google.maps.LatLng(42.700248495872813, 2.996580767786123),
		new google.maps.LatLng(42.700174767222173, 2.996491787844066),
		new google.maps.LatLng(42.700097441444271, 2.996414996693996),
		new google.maps.LatLng(42.699994940562661, 2.996305295257299),
		new google.maps.LatLng(42.699832197728412, 2.996141963663024),
		new google.maps.LatLng(42.699817811066573, 2.996127337602633),
		new google.maps.LatLng(42.699710813833079, 2.996012761375338),
		new google.maps.LatLng(42.699561557602713, 2.995855525748415),
		new google.maps.LatLng(42.699423989026869, 2.995716573646521),
		new google.maps.LatLng(42.699331378481489, 2.995626377938714),
		new google.maps.LatLng(42.699293614924571, 2.995594687099707),
		new google.maps.LatLng(42.699227079403585, 2.995549590850985),
		new google.maps.LatLng(42.699118285561731, 2.995480118966237),
		new google.maps.LatLng(42.699020280351931, 2.995409427222226)
	],
	[
		new google.maps.LatLng(42.727334275851845, 2.996536493103546),
		new google.maps.LatLng(42.72733427562919, 2.996529176376407),
		new google.maps.LatLng(42.727337858126397, 2.996121847403388),
		new google.maps.LatLng(42.727338743181193, 2.995746227646299)
	],
	[
		new google.maps.LatLng(42.727277679440505, 2.998693868922587),
		new google.maps.LatLng(42.727300154898529, 2.998514595298993),
		new google.maps.LatLng(42.727318123129656, 2.997699940025894),
		new google.maps.LatLng(42.727334275851845, 2.996536493103546)
	],
	[
		new google.maps.LatLng(42.701271720217264, 2.998628625995745),
		new google.maps.LatLng(42.701095489708493, 2.998178820970662),
		new google.maps.LatLng(42.701019062639212, 2.997997193520109),
		new google.maps.LatLng(42.700927350327099, 2.997798501155034),
		new google.maps.LatLng(42.700878795752807, 2.997666851917924),
		new google.maps.LatLng(42.700835636917198, 2.99756445828586),
		new google.maps.LatLng(42.700805065314952, 2.997497415355734),
		new google.maps.LatLng(42.700767301160305, 2.997415744389198),
		new google.maps.LatLng(42.700734033104681, 2.997345044928676),
		new google.maps.LatLng(42.700695369947205, 2.997282878700109),
		new google.maps.LatLng(42.700644118774342, 2.997198771166429),
		new google.maps.LatLng(42.700600060714002, 2.997118320222016),
		new google.maps.LatLng(42.700539818325787, 2.997026898600347),
		new google.maps.LatLng(42.700438214494376, 2.996844057369609)
	],
	[
		new google.maps.LatLng(42.701425470711285, 2.999015045944682),
		new google.maps.LatLng(42.701389506333108, 2.99892971637267),
		new google.maps.LatLng(42.701271720217264, 2.998628625995745)
	],
	[
		new google.maps.LatLng(42.727263301493728, 3.000214639218962),
		new google.maps.LatLng(42.727263301644207, 3.000108539469688),
		new google.maps.LatLng(42.727267796252121, 2.99968535786753),
		new google.maps.LatLng(42.727274086153976, 2.999017047743314),
		new google.maps.LatLng(42.727277679440505, 2.998693868922587)
	],
	[
		new google.maps.LatLng(42.701425470711285, 2.999015045944682),
		new google.maps.LatLng(42.701363433327799, 2.999071121175969),
		new google.maps.LatLng(42.701317579739651, 2.999106473230508),
		new google.maps.LatLng(42.701225871478123, 2.999156453156398),
		new google.maps.LatLng(42.701076620506107, 2.999230814461091),
		new google.maps.LatLng(42.700982215984013, 2.999292983805919),
		new google.maps.LatLng(42.700910288247073, 2.999357591410014),
		new google.maps.LatLng(42.700806892043701, 2.999458768352269),
		new google.maps.LatLng(42.700725074052968, 2.999548974425881),
		new google.maps.LatLng(42.700634265190551, 2.999673311955015),
		new google.maps.LatLng(42.700550648386525, 2.999804962660825),
		new google.maps.LatLng(42.70047961978311, 2.999956116221822),
		new google.maps.LatLng(42.700382516583268, 3.000212102561323),
		new google.maps.LatLng(42.700280018240328, 3.000515627240386),
		new google.maps.LatLng(42.700257540165644, 3.000591204671755)
	],
	[
		new google.maps.LatLng(42.72720929168171, 3.00364886964741),
		new google.maps.LatLng(42.727219202715226, 3.002997635097623),
		new google.maps.LatLng(42.727229109276962, 3.002339082403512),
		new google.maps.LatLng(42.727233610092718, 3.00208541771944),
		new google.maps.LatLng(42.727241711337008, 3.001529306039125),
		new google.maps.LatLng(42.727248909938659, 3.00103783089876),
		new google.maps.LatLng(42.727250710146919, 3.000858557922515),
		new google.maps.LatLng(42.727257006399185, 3.000396351941935),
		new google.maps.LatLng(42.727260603190153, 3.000313422235822)
	],
	[
		new google.maps.LatLng(42.700329467308059, 3.000756986626553),
		new google.maps.LatLng(42.700326770463562, 3.000704570055629),
		new google.maps.LatLng(42.700313283914994, 3.000661905571506),
		new google.maps.LatLng(42.700292605134983, 3.000625336459504),
		new google.maps.LatLng(42.700257540165644, 3.000591204671755)
	],
	[
		new google.maps.LatLng(42.701184507519486, 3.001367715254303),
		new google.maps.LatLng(42.70115753411612, 3.001350648694104),
		new google.maps.LatLng(42.701091001743059, 3.001309200501914),
		new google.maps.LatLng(42.701026266233868, 3.001271410466406),
		new google.maps.LatLng(42.700890503306674, 3.00119095436757),
		new google.maps.LatLng(42.700823969973719, 3.001149506525454),
		new google.maps.LatLng(42.700759235393335, 3.001103183892146),
		new google.maps.LatLng(42.700694499870835, 3.001059300029735),
		new google.maps.LatLng(42.700628865881839, 3.001014195687993),
		new google.maps.LatLng(42.700563231833051, 3.000973968779899),
		new google.maps.LatLng(42.700498497089953, 3.000938616862431),
		new google.maps.LatLng(42.700438257375396, 3.000898388976666),
		new google.maps.LatLng(42.70039330327166, 3.000844753620027),
		new google.maps.LatLng(42.700329467308059, 3.000756986626553)
	],
	[
		new google.maps.LatLng(42.701147643069085, 3.001415254288877),
		new google.maps.LatLng(42.701203387674262, 3.001449387517076),
		new google.maps.LatLng(42.701297791708328, 3.001517653739165),
		new google.maps.LatLng(42.701395793090875, 3.001589578314067),
		new google.maps.LatLng(42.701589098555303, 3.001732206275148),
		new google.maps.LatLng(42.701682603879576, 3.001805349532673),
		new google.maps.LatLng(42.701863320663811, 3.001951636511664),
		new google.maps.LatLng(42.70194783505152, 3.002018685762486),
		new google.maps.LatLng(42.702026955105183, 3.002082076924557),
		new google.maps.LatLng(42.702169012448572, 3.002139376038436)
	],
	[
		new google.maps.LatLng(42.702330847363541, 3.002299073844169),
		new google.maps.LatLng(42.702169012448572, 3.002139376038436)
	],
	[
		new google.maps.LatLng(42.702781289052602, 3.002709905046228),
		new google.maps.LatLng(42.702631141462717, 3.002569709388116),
		new google.maps.LatLng(42.702585288551269, 3.002527041591278),
		new google.maps.LatLng(42.702578994992471, 3.002519727530585),
		new google.maps.LatLng(42.702553820672456, 3.002494126982711),
		new google.maps.LatLng(42.702536738602646, 3.002477059950423),
		new google.maps.LatLng(42.702464811236467, 3.002400257392267),
		new google.maps.LatLng(42.702330847363541, 3.002299073844169)
	],
	[
		new google.maps.LatLng(42.702984480502991, 3.002929340473742),
		new google.maps.LatLng(42.702813655328399, 3.002742819924984),
		new google.maps.LatLng(42.702781289052602, 3.002709905046228)
	],
	[
		new google.maps.LatLng(42.703604839472312, 3.003664457111775),
		new google.maps.LatLng(42.703536510622222, 3.00357911997015),
		new google.maps.LatLng(42.703364788711262, 3.003370653008263),
		new google.maps.LatLng(42.70322453289176, 3.003206074529979),
		new google.maps.LatLng(42.703170589220534, 3.003143900149557),
		new google.maps.LatLng(42.702984480502991, 3.002929340473742)
	],
	[
		new google.maps.LatLng(42.727179104945144, 3.011123436718285),
		new google.maps.LatLng(42.727200690787477, 3.011055146810464),
		new google.maps.LatLng(42.727201594161009, 3.011013682756841),
		new google.maps.LatLng(42.727189010981917, 3.010969776595433),
		new google.maps.LatLng(42.727096428246469, 3.010706338269734),
		new google.maps.LatLng(42.727087443419556, 3.010641701406085),
		new google.maps.LatLng(42.727085665788834, 3.01043315933685),
		new google.maps.LatLng(42.727095580336858, 3.010184374922737),
		new google.maps.LatLng(42.727112740446415, 3.009340456351836),
		new google.maps.LatLng(42.727129905838616, 3.008340435845275),
		new google.maps.LatLng(42.727131712712243, 3.008228238497347),
		new google.maps.LatLng(42.72714436582951, 3.007331877902228),
		new google.maps.LatLng(42.727147078273966, 3.007105044490774),
		new google.maps.LatLng(42.727174122862358, 3.005942824134618),
		new google.maps.LatLng(42.727178641602258, 3.00552452177929),
		new google.maps.LatLng(42.727186765679669, 3.004848896642786),
		new google.maps.LatLng(42.727206590294351, 3.003778140357027),
		new google.maps.LatLng(42.72720929168171, 3.00364886964741)
	],
	[
		new google.maps.LatLng(42.703719020997127, 3.003810751180103),
		new google.maps.LatLng(42.70365788423792, 3.003731508688257),
		new google.maps.LatLng(42.703604839472312, 3.003664457111775)
	],
	[
		new google.maps.LatLng(42.70426834863482, 3.004466641854888),
		new google.maps.LatLng(42.704106516804693, 3.004282551411956),
		new google.maps.LatLng(42.703749588802737, 3.003853419757072),
		new google.maps.LatLng(42.703719020997127, 3.003810751180103)
	],
	[
		new google.maps.LatLng(42.704551553312335, 3.004779963530697),
		new google.maps.LatLng(42.7044760318716, 3.004703156749442),
		new google.maps.LatLng(42.70426834863482, 3.004466641854888)
	],
	[
		new google.maps.LatLng(42.70460010224204, 3.004829949821901),
		new google.maps.LatLng(42.704551553312335, 3.004779963530697)
	],
	[
		new google.maps.LatLng(42.7048491425981, 3.005088414019048),
		new google.maps.LatLng(42.704742154372106, 3.004975031209734),
		new google.maps.LatLng(42.70460010224204, 3.004829949821901)
	],
	[
		new google.maps.LatLng(42.705183591233251, 3.005473672513088),
		new google.maps.LatLng(42.705102674889098, 3.005399301259975),
		new google.maps.LatLng(42.705014568303177, 3.005282262014983),
		new google.maps.LatLng(42.7048491425981, 3.005088414019048)
	],
	[
		new google.maps.LatLng(42.705209627654952, 3.006161236977189),
		new google.maps.LatLng(42.705206049593421, 3.005827207914805),
		new google.maps.LatLng(42.705199769344716, 3.00557607641193),
		new google.maps.LatLng(42.705183591233251, 3.005473672513088)
	],
	[
		new google.maps.LatLng(42.705215907025078, 3.006405053243398),
		new google.maps.LatLng(42.705209627654952, 3.006161236977189)
	],
	[
		new google.maps.LatLng(42.705221277662041, 3.006798817382211),
		new google.maps.LatLng(42.705220387982372, 3.00665009001294),
		new google.maps.LatLng(42.705215907025078, 3.006405053243398)
	],
	[
		new google.maps.LatLng(42.705223059239749, 3.007051168010741),
		new google.maps.LatLng(42.705221277662041, 3.006798817382211)
	],
	[
		new google.maps.LatLng(42.705445047640893, 3.00831294874055),
		new google.maps.LatLng(42.70539381253829, 3.00813129812368),
		new google.maps.LatLng(42.705345275905977, 3.007939895165723),
		new google.maps.LatLng(42.705316515508891, 3.007780191566262),
		new google.maps.LatLng(42.705290455083826, 3.007588791875116),
		new google.maps.LatLng(42.705260803894504, 3.007316932927965),
		new google.maps.LatLng(42.705223059239749, 3.007051168010741)
	],
	[
		new google.maps.LatLng(42.70547381135804, 3.00841779438482),
		new google.maps.LatLng(42.705445047640893, 3.00831294874055)
	],
	[
		new google.maps.LatLng(42.705579876428324, 3.008787193317144),
		new google.maps.LatLng(42.705550213226658, 3.008688443138504),
		new google.maps.LatLng(42.705498080718741, 3.008500695841948),
		new google.maps.LatLng(42.70547381135804, 3.00841779438482)
	],
	[
		new google.maps.LatLng(42.705639199040974, 3.009006638894713),
		new google.maps.LatLng(42.705614032215209, 3.008904232081681),
		new google.maps.LatLng(42.705579876428324, 3.008787193317144)
	],
	[
		new google.maps.LatLng(42.705861205495701, 3.009828343432774),
		new google.maps.LatLng(42.705808169397876, 3.009712520170226),
		new google.maps.LatLng(42.705776707840712, 3.009629616705665),
		new google.maps.LatLng(42.705747950409901, 3.009473568298943),
		new google.maps.LatLng(42.705702113604218, 3.009266315818526),
		new google.maps.LatLng(42.705664365069261, 3.009106608141668),
		new google.maps.LatLng(42.705639199040974, 3.009006638894713)
	],
	[
		new google.maps.LatLng(42.705990665618458, 3.009952712807654),
		new google.maps.LatLng(42.705958300003829, 3.00992588723693),
		new google.maps.LatLng(42.705861205495701, 3.009828343432774)
	],
	[
		new google.maps.LatLng(42.705990665618458, 3.009952712807654),
		new google.maps.LatLng(42.706000548669259, 3.010024641915647),
		new google.maps.LatLng(42.706002340352207, 3.010094130844804),
		new google.maps.LatLng(42.706013105084871, 3.010351361576281)
	],
	[
		new google.maps.LatLng(42.706013105084871, 3.010351361576281),
		new google.maps.LatLng(42.706020283650531, 3.010500093188614),
		new google.maps.LatLng(42.706027447698133, 3.010791459273558),
		new google.maps.LatLng(42.70603104041907, 3.010831690504076),
		new google.maps.LatLng(42.706064301137367, 3.010891431926557)
	],
	[
		new google.maps.LatLng(42.706087534514573, 3.012219036193869),
		new google.maps.LatLng(42.706087535037575, 3.012214159641544),
		new google.maps.LatLng(42.706077668742438, 3.012005691524616),
		new google.maps.LatLng(42.706048963298812, 3.011398574491326),
		new google.maps.LatLng(42.706045389469381, 3.011187670106546),
		new google.maps.LatLng(42.70604449250164, 3.011163287199788),
		new google.maps.LatLng(42.706051700370018, 3.01102065400194),
		new google.maps.LatLng(42.706057102799903, 3.010946289712168)
	],
	[
		new google.maps.LatLng(42.727179104945144, 3.011123436718285),
		new google.maps.LatLng(42.727203378096426, 3.011156368722901),
		new google.maps.LatLng(42.727211465792124, 3.011195395903888),
		new google.maps.LatLng(42.727213259705238, 3.011244178384942),
		new google.maps.LatLng(42.727208760439709, 3.011278323854238),
		new google.maps.LatLng(42.727190771552316, 3.011331980931539)
	],
	[
		new google.maps.LatLng(42.706081181799881, 3.012724961023602),
		new google.maps.LatLng(42.706096480736171, 3.012604273444247),
		new google.maps.LatLng(42.706094691523283, 3.012526250674731),
		new google.maps.LatLng(42.706097399620994, 3.012434818597225),
		new google.maps.LatLng(42.706087534514573, 3.012219036193869)
	],
	[
		new google.maps.LatLng(42.705770623922561, 3.01550442511343),
		new google.maps.LatLng(42.705818350661595, 3.014983884744318),
		new google.maps.LatLng(42.7058705712587, 3.014453591552211),
		new google.maps.LatLng(42.70589218206014, 3.014217092482881),
		new google.maps.LatLng(42.705908388412759, 3.014043984585487),
		new google.maps.LatLng(42.705985789064052, 3.013440550819999),
		new google.maps.LatLng(42.706034395470994, 3.012994371242086),
		new google.maps.LatLng(42.706081181799881, 3.012724961023602)
	],
	[
		new google.maps.LatLng(42.705352297786646, 3.017092780853324),
		new google.maps.LatLng(42.705578994360259, 3.016311411273562),
		new google.maps.LatLng(42.705712129120812, 3.015860384437547),
		new google.maps.LatLng(42.70574451370608, 3.015747018089271),
		new google.maps.LatLng(42.705756217862849, 3.015643398236425),
		new google.maps.LatLng(42.705770623922561, 3.01550442511343)
	],
	[
		new google.maps.LatLng(42.705286626462119, 3.017319511558524),
		new google.maps.LatLng(42.705352297786646, 3.017092780853324)
	],
	[
		new google.maps.LatLng(42.705236248080261, 3.01749504362733),
		new google.maps.LatLng(42.705286626462119, 3.017319511558524)
	],
	[
		new google.maps.LatLng(42.705236248080261, 3.01749504362733),
		new google.maps.LatLng(42.705204765256518, 3.017581589563431),
		new google.maps.LatLng(42.705200267098071, 3.017596216514219),
		new google.maps.LatLng(42.705164281855808, 3.017724209310672),
		new google.maps.LatLng(42.705085107708122, 3.01803870760844)
	],
	[
		new google.maps.LatLng(42.704734194331202, 3.019534399997548),
		new google.maps.LatLng(42.704823273958972, 3.019154078179952),
		new google.maps.LatLng(42.704868265499883, 3.018954164696861),
		new google.maps.LatLng(42.704903356792173, 3.018801791878574),
		new google.maps.LatLng(42.704996035943509, 3.018393430883582),
		new google.maps.LatLng(42.705029325149425, 3.018263000404041),
		new google.maps.LatLng(42.705058115588081, 3.018149635507482),
		new google.maps.LatLng(42.705085107708122, 3.01803870760844)
	],
	[
		new google.maps.LatLng(42.704477788675462, 3.020396192928982),
		new google.maps.LatLng(42.704506574285411, 3.02032184023412),
		new google.maps.LatLng(42.704592934908298, 3.020075618975882),
		new google.maps.LatLng(42.704651412689891, 3.019883025279583),
		new google.maps.LatLng(42.704698200955413, 3.019691646921001),
		new google.maps.LatLng(42.704734194331202, 3.019534399997548)
	],
	[
		new google.maps.LatLng(42.704239419261448, 3.020948344668744),
		new google.maps.LatLng(42.70437793989656, 3.020646065797704),
		new google.maps.LatLng(42.704477788675462, 3.020396192928982)
	],
	[
		new google.maps.LatLng(42.703984862265969, 3.02150536171016),
		new google.maps.LatLng(42.7041026960976, 3.021248182775883),
		new google.maps.LatLng(42.704239419261448, 3.020948344668744)
	],
	[
		new google.maps.LatLng(42.705017014725208, 3.021603268853347),
		new google.maps.LatLng(42.704947793950659, 3.021554480090456),
		new google.maps.LatLng(42.704627759470746, 3.021320299753132),
		new google.maps.LatLng(42.70447763163294, 3.021201995685024),
		new google.maps.LatLng(42.704357175800567, 3.021081264689141),
		new google.maps.LatLng(42.704306837757976, 3.021022731834943),
		new google.maps.LatLng(42.704239419261448, 3.020948344668744)
	],
	[
		new google.maps.LatLng(42.703579173794168, 3.022441439575017),
		new google.maps.LatLng(42.703732994568625, 3.02208431695451),
		new google.maps.LatLng(42.703803158438149, 3.021919772013192),
		new google.maps.LatLng(42.703984862265969, 3.02150536171016)
	],
	[
		new google.maps.LatLng(42.706105692328691, 3.022285148993318),
		new google.maps.LatLng(42.706077823373874, 3.022269289871138),
		new google.maps.LatLng(42.705058367564938, 3.021634979726051),
		new google.maps.LatLng(42.705017014725208, 3.021603268853347)
	],
	[
		new google.maps.LatLng(42.706819489245646, 3.022734056305935),
		new google.maps.LatLng(42.706810501023696, 3.022720642637211),
		new google.maps.LatLng(42.706740386471225, 3.022646249631579),
		new google.maps.LatLng(42.706598345961446, 3.02256085673165),
		new google.maps.LatLng(42.706105692328691, 3.022285148993318)
	],
	[
		new google.maps.LatLng(42.710344862151231, 3.022884173755472),
		new google.maps.LatLng(42.710388913510023, 3.022907356175115),
		new google.maps.LatLng(42.710447354450224, 3.022913475429108),
		new google.maps.LatLng(42.710515687851434, 3.022908625021757),
		new google.maps.LatLng(42.710568739336615, 3.022890357770012),
		new google.maps.LatLng(42.710665865979834, 3.022785545522591),
		new google.maps.LatLng(42.710691047593976, 3.022756294515663),
		new google.maps.LatLng(42.710772886419583, 3.022662448419084),
		new google.maps.LatLng(42.710869117111763, 3.022539346964817),
		new google.maps.LatLng(42.710932078211201, 3.022427204055253),
		new google.maps.LatLng(42.710967156693464, 3.022363819019688)
	],
	[
		new google.maps.LatLng(42.703292321699571, 3.022620528389024),
		new google.maps.LatLng(42.703324709886971, 3.022523017174129),
		new google.maps.LatLng(42.703348094414189, 3.022485235589368),
		new google.maps.LatLng(42.703367879745215, 3.022460862297728),
		new google.maps.LatLng(42.70340834543191, 3.022434058918552),
		new google.maps.LatLng(42.703444313532898, 3.022415787175561),
		new google.maps.LatLng(42.703505453873561, 3.022410935386474),
		new google.maps.LatLng(42.703544113454669, 3.02241704511499),
		new google.maps.LatLng(42.703579173794168, 3.022441439575017)
	],
	[
		new google.maps.LatLng(42.703579173794168, 3.022441439575017),
		new google.maps.LatLng(42.703617828084809, 3.022474368687244),
		new google.maps.LatLng(42.70364119774564, 3.022507292288395),
		new google.maps.LatLng(42.703661868045451, 3.022551185830597),
		new google.maps.LatLng(42.703677142033236, 3.022604830159734),
		new google.maps.LatLng(42.703684324040665, 3.022656032764088),
		new google.maps.LatLng(42.703682512036899, 3.0227182042067),
		new google.maps.LatLng(42.703671712193589, 3.022769399000101),
		new google.maps.LatLng(42.703646523968153, 3.02283156059234),
		new google.maps.LatLng(42.703618641223009, 3.022880312679147),
		new google.maps.LatLng(42.703586266646447, 3.022913213378329),
		new google.maps.LatLng(42.703544003764179, 3.022936358897148),
		new google.maps.LatLng(42.703517029181761, 3.022941224041432),
		new google.maps.LatLng(42.703477469040998, 3.022941209394139),
		new google.maps.LatLng(42.703446000931443, 3.022938758960365),
		new google.maps.LatLng(42.703418130834621, 3.022928994737001),
		new google.maps.LatLng(42.703376776878855, 3.022904597738038)
	],
	[
		new google.maps.LatLng(42.709496139910975, 3.022710717866421),
		new google.maps.LatLng(42.709529416683843, 3.022663183783061),
		new google.maps.LatLng(42.709569884334499, 3.022626624217863),
		new google.maps.LatLng(42.709639123862203, 3.022587637290163),
		new google.maps.LatLng(42.709718249526503, 3.022569380741329),
		new google.maps.LatLng(42.709817153765783, 3.022560885037134),
		new google.maps.LatLng(42.70990706620838, 3.022552384812076),
		new google.maps.LatLng(42.709959217314896, 3.022538993964385)
	],
	[
		new google.maps.LatLng(42.709959217314896, 3.022538993964385),
		new google.maps.LatLng(42.71002035255912, 3.022559744395158),
		new google.maps.LatLng(42.710118353572334, 3.022570754563742),
		new google.maps.LatLng(42.710191177125253, 3.022590289817143),
		new google.maps.LatLng(42.71024781379878, 3.022624448628251),
		new google.maps.LatLng(42.710272080579436, 3.02266834942685),
		new google.maps.LatLng(42.710292752020443, 3.022706152532274),
		new google.maps.LatLng(42.710314310453128, 3.022801257863641),
		new google.maps.LatLng(42.710344862151231, 3.022884173755472)
	],
	[
		new google.maps.LatLng(42.710418660047928, 3.022550145413199),
		new google.maps.LatLng(42.710665865979834, 3.022785545522591),
		new google.maps.LatLng(42.710779130460509, 3.022892879458902),
		new google.maps.LatLng(42.7108510442838, 3.022963620869965),
		new google.maps.LatLng(42.710988579811513, 3.023096568722172),
		new google.maps.LatLng(42.711053203915334, 3.023159379035079),
		new google.maps.LatLng(42.711242076069865, 3.02334294900807),
		new google.maps.LatLng(42.711371519971578, 3.023469798959822),
		new google.maps.LatLng(42.711382307323511, 3.023480775311736),
		new google.maps.LatLng(42.711685241275937, 3.023779606261654)
	],
	[
		new google.maps.LatLng(42.703300382781315, 3.022764377666679),
		new google.maps.LatLng(42.703292299760321, 3.022721708313401),
		new google.maps.LatLng(42.703285115840686, 3.022680258688485),
		new google.maps.LatLng(42.703292321699571, 3.022620528389024)
	],
	[
		new google.maps.LatLng(42.709496139910975, 3.022710717866421),
		new google.maps.LatLng(42.709528487543821, 3.022803388146793),
		new google.maps.LatLng(42.70954735190314, 3.022882641357228),
		new google.maps.LatLng(42.709559918310568, 3.022982619096637),
		new google.maps.LatLng(42.709565291801127, 3.023081373464261),
		new google.maps.LatLng(42.709564374465167, 3.023165496237604),
		new google.maps.LatLng(42.70956345233688, 3.023272783625493),
		new google.maps.LatLng(42.709550838129744, 3.023394695852511),
		new google.maps.LatLng(42.70952653546653, 3.023517821883579),
		new google.maps.LatLng(42.709497735506943, 3.023647042433227),
		new google.maps.LatLng(42.709460846017294, 3.023761629304295),
		new google.maps.LatLng(42.709420361540786, 3.023872557347499),
		new google.maps.LatLng(42.709344798854495, 3.024040771424545),
		new google.maps.LatLng(42.709204466001601, 3.02436013441234),
		new google.maps.LatLng(42.709066822980205, 3.024705100462226),
		new google.maps.LatLng(42.708988547923575, 3.024933049904893),
		new google.maps.LatLng(42.708895869985867, 3.025230484809877),
		new google.maps.LatLng(42.708808582622204, 3.025541331849639),
		new google.maps.LatLng(42.708739278414527, 3.025842433215961),
		new google.maps.LatLng(42.708678086086273, 3.026063072681533),
		new google.maps.LatLng(42.708638499506037, 3.026166682459288),
		new google.maps.LatLng(42.708585434581572, 3.026241027115283),
		new google.maps.LatLng(42.708512591856767, 3.026299513522194),
		new google.maps.LatLng(42.708472130403436, 3.026308029116329)
	],
	[
		new google.maps.LatLng(42.707038251354163, 3.025486913979461),
		new google.maps.LatLng(42.706998752901704, 3.025226005047219),
		new google.maps.LatLng(42.706972803928224, 3.024687144207186),
		new google.maps.LatLng(42.706971015084697, 3.024645692817216),
		new google.maps.LatLng(42.706935257864181, 3.02372890225189),
		new google.maps.LatLng(42.706891362504024, 3.022993756669648),
		new google.maps.LatLng(42.706870715089359, 3.022841359392554),
		new google.maps.LatLng(42.706857239693051, 3.022788931139331),
		new google.maps.LatLng(42.706819489245646, 3.022734056305935)
	],
	[
		new google.maps.LatLng(42.703376776878855, 3.022904597738038),
		new google.maps.LatLng(42.70335520270357, 3.022883866244135),
		new google.maps.LatLng(42.703333632360419, 3.022848504538284),
		new google.maps.LatLng(42.703312961930514, 3.022805830518012),
		new google.maps.LatLng(42.703300382781315, 3.022764377666679)
	],
	[
		new google.maps.LatLng(42.702064776050825, 3.027602167731936),
		new google.maps.LatLng(42.702114256262284, 3.027486384264302),
		new google.maps.LatLng(42.70216646223097, 3.027258453086796),
		new google.maps.LatLng(42.702340182135103, 3.026490551277476),
		new google.maps.LatLng(42.702537287945134, 3.025660483916158),
		new google.maps.LatLng(42.70266418660966, 3.025132700488161),
		new google.maps.LatLng(42.702740689654711, 3.024792625305058),
		new google.maps.LatLng(42.702789291060327, 3.024576877028103),
		new google.maps.LatLng(42.702843287199507, 3.024357473616165),
		new google.maps.LatLng(42.702854085274815, 3.024322126836315),
		new google.maps.LatLng(42.702898177365057, 3.024161232297307),
		new google.maps.LatLng(42.702974656170539, 3.023918677110936),
		new google.maps.LatLng(42.703052027455655, 3.023698063247259),
		new google.maps.LatLng(42.703195063956279, 3.023338503948004),
		new google.maps.LatLng(42.70329311811269, 3.023102049127009),
		new google.maps.LatLng(42.703376776878855, 3.022904597738038)
	],
	[
		new google.maps.LatLng(42.711798706710915, 3.022966433220949),
		new google.maps.LatLng(42.711847258862797, 3.022965232883906),
		new google.maps.LatLng(42.711889513856796, 3.022981099132575),
		new google.maps.LatLng(42.711920078560993, 3.023007934644645),
		new google.maps.LatLng(42.711954233062684, 3.023059155368727),
		new google.maps.LatLng(42.711961420210734, 3.023088420133004),
		new google.maps.LatLng(42.711967708328856, 3.023111586773442),
		new google.maps.LatLng(42.711967698672005, 3.023159137364332),
		new google.maps.LatLng(42.7119577983391, 3.023204243911886),
		new google.maps.LatLng(42.711937107284818, 3.023259101642144),
		new google.maps.LatLng(42.711892140799513, 3.023309070749441),
		new google.maps.LatLng(42.711855264325642, 3.023366360175447),
		new google.maps.LatLng(42.711832772468668, 3.023430969868711),
		new google.maps.LatLng(42.711827363148778, 3.023499243441678),
		new google.maps.LatLng(42.711830045069867, 3.023568739637076),
		new google.maps.LatLng(42.711845320589603, 3.023612638499949),
		new google.maps.LatLng(42.711881272271917, 3.023669956748029),
		new google.maps.LatLng(42.711949589576243, 3.023738261045029),
		new google.maps.LatLng(42.71214735072833, 3.023930978876629),
		new google.maps.LatLng(42.712227354533809, 3.024010261917866),
		new google.maps.LatLng(42.712503319336754, 3.024285922012377),
		new google.maps.LatLng(42.713032773062828, 3.024823830062039)
	],
	[
		new google.maps.LatLng(42.713319384466416, 3.025695716695521),
		new google.maps.LatLng(42.713212414918807, 3.02559081377905),
		new google.maps.LatLng(42.712640699659794, 3.025084579636216),
		new google.maps.LatLng(42.712031227978308, 3.024540543255776),
		new google.maps.LatLng(42.711755260022393, 3.02427829556728),
		new google.maps.LatLng(42.711579971977869, 3.024109970286809),
		new google.maps.LatLng(42.711491870141188, 3.024057507572369),
		new google.maps.LatLng(42.711393870441121, 3.024045275260465),
		new google.maps.LatLng(42.711312053808101, 3.024033049265157),
		new google.maps.LatLng(42.711259013843218, 3.024000108296848),
		new google.maps.LatLng(42.711243738728214, 3.023954991429988),
		new google.maps.LatLng(42.711241956657794, 3.023884276677654),
		new google.maps.LatLng(42.711257260793488, 3.023795281425039),
		new google.maps.LatLng(42.711296850276774, 3.023667279720892),
		new google.maps.LatLng(42.71135712829188, 3.023496614996739),
		new google.maps.LatLng(42.711371519971578, 3.023469798959822),
		new google.maps.LatLng(42.71138681025198, 3.023446639451695),
		new google.maps.LatLng(42.711423694271382, 3.02335277504663),
		new google.maps.LatLng(42.711488458119845, 3.023224783374064),
		new google.maps.LatLng(42.711564907175955, 3.023110208410986),
		new google.maps.LatLng(42.711671021951481, 3.02302002791577),
		new google.maps.LatLng(42.711733967639439, 3.022982257325204),
		new google.maps.LatLng(42.711768136263203, 3.022972517222081),
		new google.maps.LatLng(42.711798706710915, 3.022966433220949)
	],
	[
		new google.maps.LatLng(42.713032773062828, 3.024823830062039),
		new google.maps.LatLng(42.71327907005044, 3.025081196455617),
		new google.maps.LatLng(42.713650318284643, 3.025442256920555),
		new google.maps.LatLng(42.713900215072208, 3.025678904006759),
		new google.maps.LatLng(42.714070108967647, 3.025839921399413),
		new google.maps.LatLng(42.714465629766075, 3.026207099329503),
		new google.maps.LatLng(42.714746091660309, 3.026458397365601)
	],
	[
		new google.maps.LatLng(42.707176623740693, 3.025863684187814),
		new google.maps.LatLng(42.707202705165443, 3.025831997523673),
		new google.maps.LatLng(42.707224300760636, 3.025763737201441),
		new google.maps.LatLng(42.707227017834853, 3.025679618388924),
		new google.maps.LatLng(42.707211749216185, 3.025612559772181),
		new google.maps.LatLng(42.707182993488566, 3.025546715092591),
		new google.maps.LatLng(42.707139845837517, 3.025506464754593),
		new google.maps.LatLng(42.707088603090405, 3.025482059281634),
		new google.maps.LatLng(42.707038251354163, 3.025486913979461)
	],
	[
		new google.maps.LatLng(42.708472130403436, 3.026308029116329),
		new google.maps.LatLng(42.708452348765221, 3.026312897455195),
		new google.maps.LatLng(42.708388509641665, 3.026320183611918),
		new google.maps.LatLng(42.708296802467878, 3.02631404599814),
		new google.maps.LatLng(42.708090024843429, 3.026242023343561),
		new google.maps.LatLng(42.707764572611637, 3.026140688493667),
		new google.maps.LatLng(42.707451707158889, 3.02604179893872),
		new google.maps.LatLng(42.70734472425756, 3.025996643419284),
		new google.maps.LatLng(42.707280897515119, 3.025957602245643),
		new google.maps.LatLng(42.707218870242023, 3.025911248773845),
		new google.maps.LatLng(42.707176623740693, 3.025863684187814)
	],
	[
		new google.maps.LatLng(42.714746091660309, 3.026458397365601),
		new google.maps.LatLng(42.714791936123696, 3.026498654462319),
		new google.maps.LatLng(42.715146113797566, 3.026793883584761),
		new google.maps.LatLng(42.715313316128949, 3.026924425247064)
	],
	[
		new google.maps.LatLng(42.715313316128949, 3.026924425247064),
		new google.maps.LatLng(42.715447257711688, 3.027030565420414),
		new google.maps.LatLng(42.715655812476442, 3.027186732647548),
		new google.maps.LatLng(42.715719637319616, 3.02723553498672),
		new google.maps.LatLng(42.716057649136033, 3.027455168661096),
		new google.maps.LatLng(42.716205977818667, 3.02755156418116)
	],
	[
		new google.maps.LatLng(42.702064776050825, 3.027602167731936),
		new google.maps.LatLng(42.702089939094428, 3.027647283226932),
		new google.maps.LatLng(42.702105210969684, 3.027696051212265),
		new google.maps.LatLng(42.702106990378368, 3.027767973791099),
		new google.maps.LatLng(42.70208629442886, 3.027833790673504),
		new google.maps.LatLng(42.702055712955691, 3.027880099340282),
		new google.maps.LatLng(42.702004458456607, 3.027902016267286),
		new google.maps.LatLng(42.701966696131947, 3.027901998042075)
	],
	[
		new google.maps.LatLng(42.701758704467302, 3.029025825455978),
		new google.maps.LatLng(42.701914423900192, 3.028373731797593),
		new google.maps.LatLng(42.701966641877817, 3.028108011643513),
		new google.maps.LatLng(42.701977452225563, 3.028027561818466),
		new google.maps.LatLng(42.701966696131947, 3.027901998042075)
	],
	[
		new google.maps.LatLng(42.70159662729241, 3.029891238879072),
		new google.maps.LatLng(42.701607477570008, 3.0296730417903),
		new google.maps.LatLng(42.701684891968092, 3.029339074000863),
		new google.maps.LatLng(42.701758704467302, 3.029025825455978)
	],
	[
		new google.maps.LatLng(42.70159662729241, 3.029891238879072),
		new google.maps.LatLng(42.701570556187839, 3.029882692041729),
		new google.maps.LatLng(42.701543582263803, 3.029883897166439),
		new google.maps.LatLng(42.70152649790208, 3.02989120260701),
		new google.maps.LatLng(42.701510310719705, 3.029903384668914),
		new google.maps.LatLng(42.701496819755889, 3.029919224864511),
		new google.maps.LatLng(42.701484226609189, 3.029937502971908),
		new google.maps.LatLng(42.701476128398298, 3.029959441302641),
		new google.maps.LatLng(42.701471626082125, 3.029983818851917)
	],
	[
		new google.maps.LatLng(42.701640636688019, 3.030058265473049),
		new google.maps.LatLng(42.701649637813411, 3.030022918280662),
		new google.maps.LatLng(42.701649648347221, 3.02998634859143),
		new google.maps.LatLng(42.701637073091426, 3.029940019193462),
		new google.maps.LatLng(42.701619099555323, 3.029911973879011),
		new google.maps.LatLng(42.70159662729241, 3.029891238879072)
	],
	[
		new google.maps.LatLng(42.701471626082125, 3.029983818851917),
		new google.maps.LatLng(42.701471616449389, 3.030020388436427),
		new google.maps.LatLng(42.701476105021307, 3.030044771559636),
		new google.maps.LatLng(42.701484190772447, 3.030066717726558),
		new google.maps.LatLng(42.701494974343632, 3.030086227723879),
		new google.maps.LatLng(42.70150845605869, 3.030102080979324),
		new google.maps.LatLng(42.701524636496693, 3.030115498066975)
	],
	[
		new google.maps.LatLng(42.701524636496693, 3.030115498066975),
		new google.maps.LatLng(42.701532727070592, 3.030119160060246),
		new google.maps.LatLng(42.701550708484113, 3.030124044996377),
		new google.maps.LatLng(42.701577681510415, 3.030122839975633),
		new google.maps.LatLng(42.701594766787188, 3.030115534593331),
		new google.maps.LatLng(42.701610953992166, 3.030103352570245),
		new google.maps.LatLng(42.701624444659309, 3.030088731740889),
		new google.maps.LatLng(42.701640636688019, 3.030058265473049)
	],
	[
		new google.maps.LatLng(42.701382492358654, 3.030417737639682),
		new google.maps.LatLng(42.701424780659046, 3.030311706548261),
		new google.maps.LatLng(42.701524636496693, 3.030115498066975)
	],
	[
		new google.maps.LatLng(42.701270925364362, 3.030694391989702),
		new google.maps.LatLng(42.701382492358654, 3.030417737639682)
	],
	[
		new google.maps.LatLng(42.700995619082512, 3.031317151979654),
		new google.maps.LatLng(42.701270925364362, 3.030694391989702)
	],
	[
		new google.maps.LatLng(42.700758102745283, 3.031838751339424),
		new google.maps.LatLng(42.700995619082512, 3.031317151979654)
	],
	[
		new google.maps.LatLng(42.700601554092529, 3.032189733298257),
		new google.maps.LatLng(42.700680729177485, 3.032008148152086),
		new google.maps.LatLng(42.700758102745283, 3.031838751339424)
	],
	[
		new google.maps.LatLng(42.701186398722093, 3.033719898808404),
		new google.maps.LatLng(42.700883506157538, 3.033383281320754),
		new google.maps.LatLng(42.700695662835649, 3.033162537446791),
		new google.maps.LatLng(42.700604895573036, 3.03302717803088),
		new google.maps.LatLng(42.700552781541603, 3.0329174406702),
		new google.maps.LatLng(42.70052045459807, 3.03278455273171),
		new google.maps.LatLng(42.700505213786151, 3.032638266149438),
		new google.maps.LatLng(42.700509749341329, 3.032509057017713),
		new google.maps.LatLng(42.700534062781159, 3.032382295649718),
		new google.maps.LatLng(42.700570963041706, 3.032260418073519),
		new google.maps.LatLng(42.700601554092529, 3.032189733298257)
	],
	[
		new google.maps.LatLng(42.659327935263676, 3.033025713923315),
		new google.maps.LatLng(42.659541013403462, 3.033028270569753),
		new google.maps.LatLng(42.659823330946459, 3.032993104218345),
		new google.maps.LatLng(42.660020232493373, 3.032976161666236),
		new google.maps.LatLng(42.660047205442751, 3.032972522837389),
		new google.maps.LatLng(42.660251301655762, 3.032947057848927),
		new google.maps.LatLng(42.660517432150108, 3.0329252812719),
		new google.maps.LatLng(42.660643291502794, 3.032957024295854),
		new google.maps.LatLng(42.66071611509377, 3.032961938427772),
		new google.maps.LatLng(42.66087435077803, 3.032962027427036),
		new google.maps.LatLng(42.661002915618603, 3.032968190996834),
		new google.maps.LatLng(42.661238470254723, 3.032971979247807),
		new google.maps.LatLng(42.661440758905364, 3.032976965960981),
		new google.maps.LatLng(42.661701496963317, 3.032951531737044),
		new google.maps.LatLng(42.661803993504165, 3.032943062301458),
		new google.maps.LatLng(42.662281411834527, 3.032900696096938),
		new google.maps.LatLng(42.662430650584177, 3.032921490008893),
		new google.maps.LatLng(42.66253583161712, 3.032956876335147),
		new google.maps.LatLng(42.662640107430363, 3.033009317663907),
		new google.maps.LatLng(42.662767761382966, 3.033052026564105),
		new google.maps.LatLng(42.662849568971055, 3.033077654526994),
		new google.maps.LatLng(42.662936778912574, 3.033078923307325),
		new google.maps.LatLng(42.663034773166672, 3.033092378931658),
		new google.maps.LatLng(42.663121971030463, 3.033128973662461),
		new google.maps.LatLng(42.663214557412523, 3.033188718681751),
		new google.maps.LatLng(42.663342212548109, 3.033230210964829),
		new google.maps.LatLng(42.663642469547774, 3.03333392921959),
		new google.maps.LatLng(42.663895091437531, 3.033386456880139),
		new google.maps.LatLng(42.664025450305687, 3.03340845972598),
		new google.maps.LatLng(42.664154919460557, 3.033397570461073),
		new google.maps.LatLng(42.664291583144582, 3.033381811759643),
		new google.maps.LatLng(42.664403973916372, 3.03335994802833),
		new google.maps.LatLng(42.664524467489109, 3.033302760623299),
		new google.maps.LatLng(42.664657542984017, 3.033261415813646),
		new google.maps.LatLng(42.664742960236275, 3.033241973314408),
		new google.maps.LatLng(42.66487692172538, 3.0332432674321),
		new google.maps.LatLng(42.665012673563879, 3.033270146540874),
		new google.maps.LatLng(42.665179891576074, 3.03329947994381),
		new google.maps.LatLng(42.665370484738162, 3.033332481998201),
		new google.maps.LatLng(42.665535895789162, 3.033389833859347),
		new google.maps.LatLng(42.665694121049057, 3.033425253789852),
		new google.maps.LatLng(42.665865838148093, 3.033443626150969),
		new google.maps.LatLng(42.666013284131225, 3.033449802622482),
		new google.maps.LatLng(42.666177813318804, 3.033453551025232),
		new google.maps.LatLng(42.666389986433089, 3.033478038762349),
		new google.maps.LatLng(42.66655720563373, 3.033506154712527),
		new google.maps.LatLng(42.666711844165384, 3.033511116620737),
		new google.maps.LatLng(42.666862886686062, 3.033517295281419),
		new google.maps.LatLng(42.66699415562536, 3.033502751914835),
		new google.maps.LatLng(42.667139812196545, 3.033483342769091),
		new google.maps.LatLng(42.667284567425462, 3.033467587865953),
		new google.maps.LatLng(42.667404145918695, 3.033464002469613),
		new google.maps.LatLng(42.667549795492143, 3.033465303431824),
		new google.maps.LatLng(42.667690044055846, 3.033486095614183),
		new google.maps.LatLng(42.667879748347254, 3.033486204178382),
		new google.maps.LatLng(42.668018203564408, 3.033494812263938),
		new google.maps.LatLng(42.668148565958454, 3.033504633491658),
		new google.maps.LatLng(42.668276238875663, 3.033491305333778),
		new google.maps.LatLng(42.66840840823518, 3.033473107180081),
		new google.maps.LatLng(42.66854597286595, 3.033454910640393),
		new google.maps.LatLng(42.668664655564491, 3.033439141250678),
		new google.maps.LatLng(42.668752763927252, 3.033440409923296),
		new google.maps.LatLng(42.668858848768501, 3.033459964082519),
		new google.maps.LatLng(42.668999094636305, 3.033492938948786),
		new google.maps.LatLng(42.669156427459214, 3.033507649770626),
		new google.maps.LatLng(42.66927420470207, 3.033512590744621),
		new google.maps.LatLng(42.669385688748072, 3.033518747056396),
		new google.maps.LatLng(42.669485484499326, 3.033522458402942),
		new google.maps.LatLng(42.669615851006206, 3.033521315049846),
		new google.maps.LatLng(42.669760604961937, 3.033512870758273),
		new google.maps.LatLng(42.669870294583021, 3.033504405037201),
		new google.maps.LatLng(42.670008754798367, 3.033495956050968),
		new google.maps.LatLng(42.67012203881486, 3.033494803403022),
		new google.maps.LatLng(42.670261394446605, 3.033499756089871),
		new google.maps.LatLng(42.670383668125673, 3.033499827042786),
		new google.maps.LatLng(42.670601241642551, 3.033509699456066),
		new google.maps.LatLng(42.670708243928992, 3.033470773236682),
		new google.maps.LatLng(42.670803553796674, 3.033446460689112),
		new google.maps.LatLng(42.67093752435288, 3.033419733845725),
		new google.maps.LatLng(42.671064301988864, 3.033395438081162),
		new google.maps.LatLng(42.67118657906245, 3.033386979973359),
		new google.maps.LatLng(42.671310654316081, 3.033377304041026),
		new google.maps.LatLng(42.671423040572748, 3.033373713145791),
		new google.maps.LatLng(42.671520143598045, 3.033365240177246),
		new google.maps.LatLng(42.671600160025193, 3.033367723212797),
		new google.maps.LatLng(42.671678375412718, 3.033381170523792),
		new google.maps.LatLng(42.671790757378965, 3.033392199956335),
		new google.maps.LatLng(42.671918421485834, 3.033405675205702),
		new google.maps.LatLng(42.672240286815757, 3.033421698856968)
	],
	[
		new google.maps.LatLng(42.672240286815757, 3.033421698856968),
		new google.maps.LatLng(42.672307722030808, 3.033405898407977),
		new google.maps.LatLng(42.672464155833545, 3.033425481997086),
		new google.maps.LatLng(42.672779718634892, 3.033468307291351),
		new google.maps.LatLng(42.672975713548517, 3.033481822258187)
	],
	[
		new google.maps.LatLng(42.672975713548517, 3.033481822258187),
		new google.maps.LatLng(42.672972098525612, 3.033541522809649),
		new google.maps.LatLng(42.672972982977917, 3.033589041533735),
		new google.maps.LatLng(42.672985557138084, 3.033628037496702),
		new google.maps.LatLng(42.673015224210253, 3.033637801492157),
		new google.maps.LatLng(42.673108726375048, 3.033643947421477),
		new google.maps.LatLng(42.673295727098996, 3.033668423656591),
		new google.maps.LatLng(42.673553758168147, 3.033681975515183),
		new google.maps.LatLng(42.674027572962238, 3.033681031226368)
	],
	[
		new google.maps.LatLng(42.675054307269086, 3.033729144310184),
		new google.maps.LatLng(42.674810654852671, 3.033735094896469),
		new google.maps.LatLng(42.674513062139759, 3.033726393869808),
		new google.maps.LatLng(42.674341338345528, 3.033725075522611),
		new google.maps.LatLng(42.674135451393958, 3.033717645743294),
		new google.maps.LatLng(42.674027572962238, 3.033681031226368)
	],
	[
		new google.maps.LatLng(42.701575404950773, 3.034673385776746),
		new google.maps.LatLng(42.701573649093753, 3.034544169832952),
		new google.maps.LatLng(42.701562907916419, 3.034393006631501),
		new google.maps.LatLng(42.701534183070699, 3.034250366579376),
		new google.maps.LatLng(42.70149375647658, 3.03414672730661),
		new google.maps.LatLng(42.701437146169994, 3.034041859925886),
		new google.maps.LatLng(42.70136794360193, 3.033952832513768),
		new google.maps.LatLng(42.701296942605943, 3.033862584968523),
		new google.maps.LatLng(42.701186398722093, 3.033719898808404)
	],
	[
		new google.maps.LatLng(42.680063986405152, 3.033750322707867),
		new google.maps.LatLng(42.679970481951074, 3.03374905042521),
		new google.maps.LatLng(42.679888670832128, 3.033733161038165),
		new google.maps.LatLng(42.679552298955223, 3.034094874373737),
		new google.maps.LatLng(42.679278979780136, 3.03408740321826),
		new google.maps.LatLng(42.678779099291546, 3.034054210536232),
		new google.maps.LatLng(42.678592992819603, 3.034044353411744),
		new google.maps.LatLng(42.678545324465752, 3.034096721694049),
		new google.maps.LatLng(42.678391584218538, 3.034086883497821),
		new google.maps.LatLng(42.677761339987427, 3.034048741692462),
		new google.maps.LatLng(42.677635472036677, 3.034035264834638),
		new google.maps.LatLng(42.677577049695167, 3.03398039768669),
		new google.maps.LatLng(42.677481750310946, 3.033969375519528),
		new google.maps.LatLng(42.676910842439412, 3.033939798814263),
		new google.maps.LatLng(42.676709454908611, 3.033917748972315),
		new google.maps.LatLng(42.676466706956575, 3.03390664152259),
		new google.maps.LatLng(42.676272506529621, 3.033901654990136),
		new google.maps.LatLng(42.676210452752052, 3.03395766766875),
		new google.maps.LatLng(42.676016255593169, 3.033941714993051),
		new google.maps.LatLng(42.675452545637967, 3.033898740812178),
		new google.maps.LatLng(42.675454359038952, 3.033852440496834),
		new google.maps.LatLng(42.675402217675902, 3.033834133086864),
		new google.maps.LatLng(42.675343786008867, 3.033807292846547),
		new google.maps.LatLng(42.675283556149637, 3.0337816705142),
		new google.maps.LatLng(42.675202645274027, 3.033759691037128),
		new google.maps.LatLng(42.675054307269086, 3.033729144310184)
	],
	[
		new google.maps.LatLng(42.680054897555991, 3.034061048821276),
		new google.maps.LatLng(42.680063986405152, 3.033750322707867)
	],
	[
		new google.maps.LatLng(42.683649337709781, 3.034390962470508),
		new google.maps.LatLng(42.682882436779401, 3.03432592332725),
		new google.maps.LatLng(42.682044509238153, 3.034262061843136),
		new google.maps.LatLng(42.682016637496794, 3.034260827466671),
		new google.maps.LatLng(42.680991707367824, 3.034176142439589),
		new google.maps.LatLng(42.680971028716307, 3.034174912088678),
		new google.maps.LatLng(42.680243685133654, 3.034124524975977),
		new google.maps.LatLng(42.680115119301064, 3.034113482584411),
		new google.maps.LatLng(42.680054897555991, 3.034061048821276)
	],
	[
		new google.maps.LatLng(42.684525021342083, 3.034478003601564),
		new google.maps.LatLng(42.684122243651821, 3.034435112935118),
		new google.maps.LatLng(42.683649337709781, 3.034390962470508)
	],
	[
		new google.maps.LatLng(42.685406995986433, 3.034573581515393),
		new google.maps.LatLng(42.684727308903135, 3.034500058545587),
		new google.maps.LatLng(42.684711125637214, 3.03449761149188),
		new google.maps.LatLng(42.684525021342083, 3.034478003601564)
	],
	[
		new google.maps.LatLng(42.686298860178418, 3.034674042677214),
		new google.maps.LatLng(42.686204460500434, 3.03465936245939),
		new google.maps.LatLng(42.685727061780405, 3.034605456389717),
		new google.maps.LatLng(42.685406995986433, 3.034573581515393)
	],
	[
		new google.maps.LatLng(42.701541968602434, 3.035195100401513),
		new google.maps.LatLng(42.701575404950773, 3.034673385776746)
	],
	[
		new google.maps.LatLng(42.687152060937763, 3.034785453013109),
		new google.maps.LatLng(42.686776252152264, 3.034749885588082),
		new google.maps.LatLng(42.68636988477558, 3.034685052690774),
		new google.maps.LatLng(42.686298860178418, 3.034674042677214)
	],
	[
		new google.maps.LatLng(42.687737345233607, 3.034856487066798),
		new google.maps.LatLng(42.687669917951077, 3.034843041694765),
		new google.maps.LatLng(42.687577318518684, 3.034823486810074),
		new google.maps.LatLng(42.68727523375631, 3.034791619952103),
		new google.maps.LatLng(42.687152060937763, 3.034785453013109)
	],
	[
		new google.maps.LatLng(42.687737345233607, 3.034856487066798),
		new google.maps.LatLng(42.68774631956515, 3.034907678934225),
		new google.maps.LatLng(42.68778047252642, 3.034946697848373),
		new google.maps.LatLng(42.687811035667011, 3.0349637785935),
		new google.maps.LatLng(42.687841604570991, 3.034965016143389)
	],
	[
		new google.maps.LatLng(42.68973768585272, 3.035280593636802),
		new google.maps.LatLng(42.689632464610888, 3.035363404580085),
		new google.maps.LatLng(42.689557830160915, 3.03539260984442),
		new google.maps.LatLng(42.689481402050411, 3.035408407391706),
		new google.maps.LatLng(42.689404080025142, 3.035409578669091),
		new google.maps.LatLng(42.688977023980179, 3.035371538702866),
		new google.maps.LatLng(42.688313513848655, 3.035311418328717),
		new google.maps.LatLng(42.688211026117763, 3.035285762672556),
		new google.maps.LatLng(42.688078887839239, 3.035200371954777),
		new google.maps.LatLng(42.68792338735188, 3.03507231255912),
		new google.maps.LatLng(42.687866768099482, 3.034999154952919),
		new google.maps.LatLng(42.687841604570991, 3.034965016143389)
	],
	[
		new google.maps.LatLng(42.690164848064278, 3.034998098709164),
		new google.maps.LatLng(42.690069523682617, 3.035060198448081),
		new google.maps.LatLng(42.689993983942173, 3.035108902475808),
		new google.maps.LatLng(42.689780853670449, 3.035247712886916),
		new google.maps.LatLng(42.68973768585272, 3.035280593636802)
	],
	[
		new google.maps.LatLng(42.690164848064278, 3.034998098709164),
		new google.maps.LatLng(42.690203507012541, 3.03500421497442),
		new google.maps.LatLng(42.690448952004651, 3.035026300489259)
	],
	[
		new google.maps.LatLng(42.692210221592944, 3.035195556092728),
		new google.maps.LatLng(42.692681333054516, 3.03523849859652),
		new google.maps.LatLng(42.692714600780477, 3.035237299553537),
		new google.maps.LatLng(42.692738881976233, 3.035219032972041),
		new google.maps.LatLng(42.692873804984089, 3.035041166241767),
		new google.maps.LatLng(42.692900785204856, 3.035016805142529),
		new google.maps.LatLng(42.692925061869325, 3.035013163747824),
		new google.maps.LatLng(42.693333243548054, 3.03503778553749),
		new google.maps.LatLng(42.693373701205445, 3.035043904377712)
	],
	[
		new google.maps.LatLng(42.690448952004651, 3.035026300489259),
		new google.maps.LatLng(42.690991090382035, 3.035072940558011),
		new google.maps.LatLng(42.691210461979885, 3.035095010640123)
	],
	[
		new google.maps.LatLng(42.693373701205445, 3.035043904377712),
		new google.maps.LatLng(42.69338988092219, 3.035054883827785),
		new google.maps.LatLng(42.693504013949862, 3.03521340112029)
	],
	[
		new google.maps.LatLng(42.691210461979885, 3.035095010640123),
		new google.maps.LatLng(42.691980060779244, 3.035172258788872),
		new google.maps.LatLng(42.692210221592944, 3.035195556092728)
	],
	[
		new google.maps.LatLng(42.701464367946279, 3.036030069803126),
		new google.maps.LatLng(42.701489614095784, 3.035815540627718),
		new google.maps.LatLng(42.701541968602434, 3.035195100401513)
	],
	[
		new google.maps.LatLng(42.693504013949862, 3.03521340112029),
		new google.maps.LatLng(42.693519291796314, 3.035235349228186),
		new google.maps.LatLng(42.693527371500792, 3.035270700748557),
		new google.maps.LatLng(42.693517375583994, 3.035590029219178),
		new google.maps.LatLng(42.6935164628837, 3.035632688350376),
		new google.maps.LatLng(42.693523644386168, 3.035666820207823),
		new google.maps.LatLng(42.6935532958164, 3.035722904456687),
		new google.maps.LatLng(42.693584758187043, 3.03573998769454),
		new google.maps.LatLng(42.693668369323738, 3.035753445883362),
		new google.maps.LatLng(42.694073849422253, 3.035791480120401),
		new google.maps.LatLng(42.694398415037902, 3.035814837512368)
	],
	[
		new google.maps.LatLng(42.694398415037902, 3.035814837512368),
		new google.maps.LatLng(42.695207582291054, 3.035875059605905)
	],
	[
		new google.maps.LatLng(42.695207582291054, 3.035875059605905),
		new google.maps.LatLng(42.695954712097752, 3.035936464099863)
	],
	[
		new google.maps.LatLng(42.695954712097752, 3.035936464099863),
		new google.maps.LatLng(42.696691053099521, 3.03599786380727)
	],
	[
		new google.maps.LatLng(42.696691053099521, 3.03599786380727),
		new google.maps.LatLng(42.696958078305229, 3.036018750071011),
		new google.maps.LatLng(42.697384242467677, 3.036045830311515),
		new google.maps.LatLng(42.697448974431367, 3.036055620932132)
	],
	[
		new google.maps.LatLng(42.701453545633704, 3.036127583609719),
		new google.maps.LatLng(42.701464367946279, 3.036030069803126)
	],
	[
		new google.maps.LatLng(42.697448974431367, 3.036055620932132),
		new google.maps.LatLng(42.697772633716461, 3.036103359944192),
		new google.maps.LatLng(42.698152034794148, 3.036158446477477)
	],
	[
		new google.maps.LatLng(42.70135806662168, 3.036640723058649),
		new google.maps.LatLng(42.701400349252573, 3.036567610185688),
		new google.maps.LatLng(42.70142108533031, 3.036400620087361),
		new google.maps.LatLng(42.701453545633704, 3.036127583609719)
	],
	[
		new google.maps.LatLng(42.698152034794148, 3.036158446477477),
		new google.maps.LatLng(42.698647413812459, 3.036233110215385),
		new google.maps.LatLng(42.698892856051252, 3.036271049646964)
	],
	[
		new google.maps.LatLng(42.698892856051252, 3.036271049646964),
		new google.maps.LatLng(42.699571639950641, 3.03637874182229),
		new google.maps.LatLng(42.699628280720781, 3.036387310289118)
	],
	[
		new google.maps.LatLng(42.699628280720781, 3.036387310289118),
		new google.maps.LatLng(42.700309765402487, 3.036488911179168),
		new google.maps.LatLng(42.700609148631123, 3.036540295909952)
	],
	[
		new google.maps.LatLng(42.700609148631123, 3.036540295909952),
		new google.maps.LatLng(42.70088335811959, 3.036588008248363),
		new google.maps.LatLng(42.700995741821743, 3.036600269260644),
		new google.maps.LatLng(42.701071261772299, 3.03661494478372),
		new google.maps.LatLng(42.701151270331152, 3.036646688960728),
		new google.maps.LatLng(42.701237575071978, 3.03667356077554),
		new google.maps.LatLng(42.701304109213893, 3.036672383246557),
		new google.maps.LatLng(42.70135806662168, 3.036640723058649)
	]
];

var circuit_1 = [
	[
		new google.maps.LatLng(42.682051048175197, 2.736850866694815),
		new google.maps.LatLng(42.682024333932937, 2.736955787626855),
		new google.maps.LatLng(42.681977922434001, 2.737094917222934),
		new google.maps.LatLng(42.681945741619089, 2.737170615482578)
	],
	[
		new google.maps.LatLng(42.681945741619089, 2.737170615482578),
		new google.maps.LatLng(42.681915354854965, 2.73724508708447),
		new google.maps.LatLng(42.681823141593107, 2.737405140119416)
	],
	[
		new google.maps.LatLng(42.681823141593107, 2.737405140119416),
		new google.maps.LatLng(42.681740046931537, 2.737617550263566),
		new google.maps.LatLng(42.681707080281718, 2.73773955870543)
	],
	[
		new google.maps.LatLng(42.681707080281718, 2.73773955870543),
		new google.maps.LatLng(42.681706384357575, 2.737822425952706),
		new google.maps.LatLng(42.681710233740993, 2.737925989139531),
		new google.maps.LatLng(42.681714158521082, 2.738060017720147)
	],
	[
		new google.maps.LatLng(42.681714158521082, 2.738060017720147),
		new google.maps.LatLng(42.681714313279471, 2.73812338396495)
	],
	[
		new google.maps.LatLng(42.681714313279471, 2.73812338396495),
		new google.maps.LatLng(42.681722485390566, 2.738892281440012),
		new google.maps.LatLng(42.681722539287925, 2.73891421534781)
	],
	[
		new google.maps.LatLng(42.681722539287925, 2.73891421534781),
		new google.maps.LatLng(42.681719611451179, 2.739557648453784)
	],
	[
		new google.maps.LatLng(42.68172346202396, 2.743009914274369),
		new google.maps.LatLng(42.681719405357839, 2.742444503712995),
		new google.maps.LatLng(42.681718935356166, 2.742249530327066),
		new google.maps.LatLng(42.681716037469911, 2.7414208981259),
		new google.maps.LatLng(42.681716055683935, 2.741056537193629),
		new google.maps.LatLng(42.681717386872066, 2.740121867474207),
		new google.maps.LatLng(42.681719611451179, 2.739557648453784)
	],
	[
		new google.maps.LatLng(42.68041845933746, 2.74774493684944),
		new google.maps.LatLng(42.680595000686033, 2.747499239271844),
		new google.maps.LatLng(42.680856680194694, 2.7471374060746),
		new google.maps.LatLng(42.680900589057515, 2.747075067652589),
		new google.maps.LatLng(42.681147028711401, 2.746732794040529),
		new google.maps.LatLng(42.681208866689559, 2.746648442933731),
		new google.maps.LatLng(42.681379056790831, 2.746379613326019),
		new google.maps.LatLng(42.681439963481743, 2.746281861639793),
		new google.maps.LatLng(42.681495466693868, 2.746180476213326),
		new google.maps.LatLng(42.681523213740491, 2.746127955612296),
		new google.maps.LatLng(42.681579554590527, 2.746000976720683),
		new google.maps.LatLng(42.681617909017959, 2.745871638287245),
		new google.maps.LatLng(42.681628617044979, 2.74583747183236),
		new google.maps.LatLng(42.681670390076469, 2.745633784057272),
		new google.maps.LatLng(42.681696901770792, 2.745439911658397),
		new google.maps.LatLng(42.681705457732754, 2.745257084834601),
		new google.maps.LatLng(42.681713198559173, 2.745109600440255),
		new google.maps.LatLng(42.681718446353656, 2.744670882866092),
		new google.maps.LatLng(42.681720005647989, 2.744570951450851),
		new google.maps.LatLng(42.681719909912857, 2.744154191182618),
		new google.maps.LatLng(42.681720853585375, 2.743797139036074),
		new google.maps.LatLng(42.681722648858681, 2.743420584716719),
		new google.maps.LatLng(42.681722330564078, 2.743287758617056),
		new google.maps.LatLng(42.68172346202396, 2.743009914274369)
	],
	[
		new google.maps.LatLng(42.68206826906917, 2.743199713845292),
		new google.maps.LatLng(42.682012420791708, 2.743156090186216),
		new google.maps.LatLng(42.68185396288056, 2.743065394666094),
		new google.maps.LatLng(42.68172346202396, 2.743009914274369)
	],
	[
		new google.maps.LatLng(42.682619747921954, 2.744467080406931),
		new google.maps.LatLng(42.682605272524434, 2.744429366133863),
		new google.maps.LatLng(42.682571779332214, 2.744334461137521),
		new google.maps.LatLng(42.682406163841335, 2.743881865635259),
		new google.maps.LatLng(42.682359067444203, 2.743738276488931),
		new google.maps.LatLng(42.682321942422007, 2.743628764366451),
		new google.maps.LatLng(42.682299322238869, 2.743569152268112),
		new google.maps.LatLng(42.682231466993407, 2.743392752950459),
		new google.maps.LatLng(42.682139431176267, 2.743255456603017),
		new google.maps.LatLng(42.68206826906917, 2.743199713845292)
	],
	[
		new google.maps.LatLng(42.682619747921954, 2.744467080406931),
		new google.maps.LatLng(42.682627892256669, 2.744488978840385),
		new google.maps.LatLng(42.68279954073423, 2.744833095522047),
		new google.maps.LatLng(42.682880995048919, 2.74505818346592),
		new google.maps.LatLng(42.682945450988711, 2.745318686567262),
		new google.maps.LatLng(42.683031869131568, 2.745741171512753),
		new google.maps.LatLng(42.683043698592293, 2.745800831799288),
		new google.maps.LatLng(42.683101431398988, 2.746260001765641),
		new google.maps.LatLng(42.683086258347956, 2.746686586890109),
		new google.maps.LatLng(42.683070414936857, 2.746830452894454),
		new google.maps.LatLng(42.683062516632738, 2.746912134688878)
	],
	[
		new google.maps.LatLng(42.68271313131671, 2.74820904266844),
		new google.maps.LatLng(42.682757784643144, 2.748080894193848),
		new google.maps.LatLng(42.682804206866841, 2.747940553315185),
		new google.maps.LatLng(42.682872956265861, 2.747736745994798),
		new google.maps.LatLng(42.682980038937231, 2.747393849693811),
		new google.maps.LatLng(42.682986260543714, 2.747363356802436),
		new google.maps.LatLng(42.683017336897208, 2.747197489539956),
		new google.maps.LatLng(42.68302532830613, 2.747154803101274),
		new google.maps.LatLng(42.683049303341825, 2.747027961490759),
		new google.maps.LatLng(42.683062516632738, 2.746912134688878)
	],
	[
		new google.maps.LatLng(42.68041845933746, 2.74774493684944),
		new google.maps.LatLng(42.68035498374276, 2.747897532482184),
		new google.maps.LatLng(42.680306691829571, 2.748007411671197),
		new google.maps.LatLng(42.680286379613662, 2.74816347600797)
	],
	[
		new google.maps.LatLng(42.680300087369339, 2.748257247077122),
		new google.maps.LatLng(42.680286379613662, 2.74816347600797)
	],
	[
		new google.maps.LatLng(42.682147094188238, 2.75184049475314),
		new google.maps.LatLng(42.682189229959384, 2.751787914862914),
		new google.maps.LatLng(42.682210742628158, 2.751759794641381),
		new google.maps.LatLng(42.682243790834953, 2.751665821606684),
		new google.maps.LatLng(42.682256952061174, 2.75152562525323),
		new google.maps.LatLng(42.682261134139466, 2.751004043749189),
		new google.maps.LatLng(42.682262499957758, 2.750432511189818),
		new google.maps.LatLng(42.682259211840844, 2.750179054717925),
		new google.maps.LatLng(42.682251793518923, 2.749697737721766),
		new google.maps.LatLng(42.682254528241195, 2.749329705825813),
		new google.maps.LatLng(42.682278449318325, 2.749178495798549),
		new google.maps.LatLng(42.682282861950966, 2.749143137273643),
		new google.maps.LatLng(42.682299778696297, 2.749072385010689),
		new google.maps.LatLng(42.682316684651965, 2.748996758048802),
		new google.maps.LatLng(42.682366709908301, 2.748858839783979),
		new google.maps.LatLng(42.682470537640555, 2.74865975885423),
		new google.maps.LatLng(42.682619189218109, 2.748405645814233),
		new google.maps.LatLng(42.682666636926839, 2.748318918494926),
		new google.maps.LatLng(42.682683651061154, 2.74828959857023),
		new google.maps.LatLng(42.68271313131671, 2.74820904266844)
	],
	[
		new google.maps.LatLng(42.680738738209286, 2.748595334160413),
		new google.maps.LatLng(42.680521785166839, 2.748479286839661),
		new google.maps.LatLng(42.680390332818099, 2.748400647515577),
		new google.maps.LatLng(42.680356064800321, 2.748356927866961),
		new google.maps.LatLng(42.680300087369339, 2.748257247077122)
	],
	[
		new google.maps.LatLng(42.682247855116664, 2.749167659768522),
		new google.maps.LatLng(42.682181263415622, 2.749142356334525),
		new google.maps.LatLng(42.681357857484919, 2.748827849634612),
		new google.maps.LatLng(42.680738738209286, 2.748595334160413)
	],
	[
		new google.maps.LatLng(42.6823198474248, 2.749195378145541),
		new google.maps.LatLng(42.682278449318325, 2.749178495798549),
		new google.maps.LatLng(42.682247855116664, 2.749167659768522)
	],
	[
		new google.maps.LatLng(42.682434133598285, 2.749238756387271),
		new google.maps.LatLng(42.6823198474248, 2.749195378145541)
	],
	[
		new google.maps.LatLng(42.682596114226058, 2.749300208357468),
		new google.maps.LatLng(42.682434133598285, 2.749238756387271)
	],
	[
		new google.maps.LatLng(42.682949770193986, 2.749433953170656),
		new google.maps.LatLng(42.682844480335653, 2.749392973376002),
		new google.maps.LatLng(42.682839981767465, 2.749391773793846),
		new google.maps.LatLng(42.682788691680969, 2.749373714622966),
		new google.maps.LatLng(42.682770692946661, 2.749366480783768),
		new google.maps.LatLng(42.682734695473911, 2.749352011897848),
		new google.maps.LatLng(42.682596114226058, 2.749300208357468)
	],
	[
		new google.maps.LatLng(42.6830874520222, 2.749485762160978),
		new google.maps.LatLng(42.682949770193986, 2.749433953170656)
	],
	[
		new google.maps.LatLng(42.683471805570377, 2.749674215847031),
		new google.maps.LatLng(42.683374516164157, 2.749594204686542),
		new google.maps.LatLng(42.683295328222954, 2.749565297889203),
		new google.maps.LatLng(42.6830874520222, 2.749485762160978)
	],
	[
		new google.maps.LatLng(42.683508374184896, 2.751090110756872),
		new google.maps.LatLng(42.683511746720306, 2.750993823928276),
		new google.maps.LatLng(42.683528610363211, 2.750899917216442),
		new google.maps.LatLng(42.683572089698004, 2.750652349002604),
		new google.maps.LatLng(42.683588074189188, 2.750566976244698),
		new google.maps.LatLng(42.683639416994467, 2.750221882166928),
		new google.maps.LatLng(42.683642694237506, 2.75008538043843),
		new google.maps.LatLng(42.683613593662244, 2.74994414427438),
		new google.maps.LatLng(42.683554794548677, 2.74979084783467),
		new google.maps.LatLng(42.683471805570377, 2.749674215847031)
	],
	[
		new google.maps.LatLng(42.68397377016349, 2.751720597374169),
		new google.maps.LatLng(42.683807301189098, 2.751661593722103),
		new google.maps.LatLng(42.683704641906886, 2.751591350162303),
		new google.maps.LatLng(42.683599103487829, 2.751443127609968),
		new google.maps.LatLng(42.683537649187002, 2.75130690285507),
		new google.maps.LatLng(42.683507599228996, 2.751143734197278),
		new google.maps.LatLng(42.683508374184896, 2.751090110756872)
	],
	[
		new google.maps.LatLng(42.684444315191882, 2.751858737780736),
		new google.maps.LatLng(42.684391288974211, 2.751844019195238),
		new google.maps.LatLng(42.684310264659075, 2.751821529988176),
		new google.maps.LatLng(42.684146518623606, 2.751773482330462),
		new google.maps.LatLng(42.684061049068518, 2.751749473612201),
		new google.maps.LatLng(42.68397377016349, 2.751720597374169)
	],
	[
		new google.maps.LatLng(42.682147094188238, 2.75184049475314),
		new google.maps.LatLng(42.682205718710094, 2.751919453385538),
		new google.maps.LatLng(42.682218624950139, 2.752057101203648),
		new google.maps.LatLng(42.682260236953177, 2.752555335181514),
		new google.maps.LatLng(42.682277888220376, 2.752801418159664),
		new google.maps.LatLng(42.68227944235484, 2.753085347693341),
		new google.maps.LatLng(42.682324665744879, 2.75359209646105),
		new google.maps.LatLng(42.682404362600622, 2.754233967443471),
		new google.maps.LatLng(42.682548715865636, 2.755236277112889),
		new google.maps.LatLng(42.682676740424846, 2.756178947195984),
		new google.maps.LatLng(42.682826649700488, 2.757260452736769),
		new google.maps.LatLng(42.682894553792273, 2.757865824497832),
		new google.maps.LatLng(42.682916693747053, 2.75811433070849),
		new google.maps.LatLng(42.682937893209726, 2.75834456196964),
		new google.maps.LatLng(42.682956279303752, 2.758523623714064),
		new google.maps.LatLng(42.682995385468246, 2.75872087760595),
		new google.maps.LatLng(42.683033544470241, 2.758897419841099),
		new google.maps.LatLng(42.683077745304494, 2.75936153268107),
		new google.maps.LatLng(42.683144599734881, 2.759904763902921),
		new google.maps.LatLng(42.683223424943819, 2.760575902140567),
		new google.maps.LatLng(42.683315748290518, 2.761254299194592),
		new google.maps.LatLng(42.683400641868488, 2.761827926804039),
		new google.maps.LatLng(42.683423650360631, 2.762066683514123),
		new google.maps.LatLng(42.683410513585727, 2.762223941270268),
		new google.maps.LatLng(42.683371118663501, 2.76229843805061),
		new google.maps.LatLng(42.683356479659636, 2.762476282849989),
		new google.maps.LatLng(42.683315117995008, 2.762814510710678),
		new google.maps.LatLng(42.683436820735693, 2.762978538322425),
		new google.maps.LatLng(42.683507478604284, 2.763168735333257),
		new google.maps.LatLng(42.683527576065778, 2.763618851808179),
		new google.maps.LatLng(42.683534825321857, 2.764034386281978),
		new google.maps.LatLng(42.683465353428218, 2.764415583702606),
		new google.maps.LatLng(42.683383444350092, 2.764961320646315),
		new google.maps.LatLng(42.68332040930401, 2.765368462884104),
		new google.maps.LatLng(42.683199477034663, 2.765576701822881),
		new google.maps.LatLng(42.683044655966675, 2.765516934335451)
	],
	[
		new google.maps.LatLng(42.684604462904318, 2.751905582492121),
		new google.maps.LatLng(42.684550480465838, 2.751889970776241),
		new google.maps.LatLng(42.684444315191882, 2.751858737780736)
	],
	[
		new google.maps.LatLng(42.685522064704493, 2.752910738425042),
		new google.maps.LatLng(42.685239699294222, 2.752500025622541),
		new google.maps.LatLng(42.685025006903537, 2.752193833996999),
		new google.maps.LatLng(42.684897902525591, 2.752050573328499),
		new google.maps.LatLng(42.684798842674837, 2.751981531295175),
		new google.maps.LatLng(42.684644050365449, 2.751917600873662),
		new google.maps.LatLng(42.684604462904318, 2.751905582492121)
	],
	[
		new google.maps.LatLng(42.691379386697328, 2.752397153607095),
		new google.maps.LatLng(42.691162424405171, 2.752276196485933),
		new google.maps.LatLng(42.690974398770777, 2.75222702633731),
		new google.maps.LatLng(42.690650670062176, 2.752204028030547),
		new google.maps.LatLng(42.689811798411903, 2.752197846339473),
		new google.maps.LatLng(42.689360582891396, 2.752254609716093),
		new google.maps.LatLng(42.688921180089075, 2.752364946404247),
		new google.maps.LatLng(42.688415334730578, 2.752514564219807),
		new google.maps.LatLng(42.68814845787837, 2.752581509897321)
	],
	[
		new google.maps.LatLng(42.693071954402754, 2.757310388548805),
		new google.maps.LatLng(42.692965577122969, 2.757185292018306),
		new google.maps.LatLng(42.692864477631773, 2.757008983969562),
		new google.maps.LatLng(42.69274516047264, 2.756729151355996),
		new google.maps.LatLng(42.69265357964094, 2.756389481778924),
		new google.maps.LatLng(42.692616403218317, 2.756251910243639),
		new google.maps.LatLng(42.692168836085621, 2.754365840477129),
		new google.maps.LatLng(42.692138883633177, 2.754242866559007),
		new google.maps.LatLng(42.691884734714449, 2.753199420006904),
		new google.maps.LatLng(42.691829580633829, 2.75306558487656),
		new google.maps.LatLng(42.691713845010149, 2.752783311871458),
		new google.maps.LatLng(42.691570416136045, 2.752579162295779),
		new google.maps.LatLng(42.691379386697328, 2.752397153607095)
	],
	[
		new google.maps.LatLng(42.68814845787837, 2.752581509897321),
		new google.maps.LatLng(42.687873493016276, 2.752649707588367),
		new google.maps.LatLng(42.687424975269778, 2.752706453914119),
		new google.maps.LatLng(42.686947724156028, 2.752779164415982),
		new google.maps.LatLng(42.686706041324349, 2.752854530607421),
		new google.maps.LatLng(42.686535412534553, 2.752940563787744),
		new google.maps.LatLng(42.68618268710911, 2.753208951834802),
		new google.maps.LatLng(42.686075825617074, 2.753265464849051),
		new google.maps.LatLng(42.685963473683472, 2.753280565156699),
		new google.maps.LatLng(42.685847427398215, 2.753253026778491),
		new google.maps.LatLng(42.685751109516019, 2.753203468301703),
		new google.maps.LatLng(42.685651061061456, 2.753095430133207)
	],
	[
		new google.maps.LatLng(42.685651061061456, 2.753095430133207),
		new google.maps.LatLng(42.685582503046987, 2.752997008187731),
		new google.maps.LatLng(42.685522064704493, 2.752910738425042)
	],
	[
		new google.maps.LatLng(42.69513753426682, 2.757860027957543),
		new google.maps.LatLng(42.69481921409772, 2.75784306757915),
		new google.maps.LatLng(42.694330887960547, 2.757792687370997),
		new google.maps.LatLng(42.693700315111556, 2.757658798719841),
		new google.maps.LatLng(42.693419583714011, 2.757564896649041),
		new google.maps.LatLng(42.693216124077054, 2.75744873530345),
		new google.maps.LatLng(42.693071954402754, 2.757310388548805)
	],
	[
		new google.maps.LatLng(42.695873275794327, 2.757982514628194),
		new google.maps.LatLng(42.695709597380194, 2.75796369234578),
		new google.maps.LatLng(42.695400184985154, 2.757910129107992),
		new google.maps.LatLng(42.69513753426682, 2.757860027957543)
	],
	[
		new google.maps.LatLng(42.695873275794327, 2.757982514628194),
		new google.maps.LatLng(42.69590124728289, 2.75802627878048),
		new google.maps.LatLng(42.695921054520596, 2.758038385376266)
	],
	[
		new google.maps.LatLng(42.695921054520596, 2.758038385376266),
		new google.maps.LatLng(42.69595030760776, 2.758251570129812),
		new google.maps.LatLng(42.695972552113389, 2.758546450130834),
		new google.maps.LatLng(42.695978303884061, 2.758704882535891),
		new google.maps.LatLng(42.695980403688786, 2.758838951515612)
	],
	[
		new google.maps.LatLng(42.695980403688786, 2.758838951515612),
		new google.maps.LatLng(42.695970484746617, 2.759225382262406),
		new google.maps.LatLng(42.695905344921776, 2.759846067762513),
		new google.maps.LatLng(42.695830462371973, 2.76053383106728),
		new google.maps.LatLng(42.695736832994164, 2.761283831752651),
		new google.maps.LatLng(42.695730645228785, 2.761331393914717),
		new google.maps.LatLng(42.695657341862699, 2.761925292534194),
		new google.maps.LatLng(42.695552918547023, 2.763083660048262),
		new google.maps.LatLng(42.695530006305859, 2.763293400841833),
		new google.maps.LatLng(42.695480642471637, 2.763739712618061),
		new google.maps.LatLng(42.695454151288082, 2.764366326618076),
		new google.maps.LatLng(42.695460710785248, 2.764486968494635),
		new google.maps.LatLng(42.695482145878415, 2.764830607562518)
	],
	[
		new google.maps.LatLng(42.693127622619876, 2.760068378657792),
		new google.maps.LatLng(42.693073594976688, 2.760032036479217),
		new google.maps.LatLng(42.692977127227117, 2.759914207152818),
		new google.maps.LatLng(42.692941865475333, 2.759826596285937),
		new google.maps.LatLng(42.69292283656123, 2.759760858226147)
	],
	[
		new google.maps.LatLng(42.680748517214127, 2.763943247218112),
		new google.maps.LatLng(42.680708040131613, 2.763934880930658),
		new google.maps.LatLng(42.680078265582679, 2.764155555651001),
		new google.maps.LatLng(42.679736875001602, 2.764275137146732),
		new google.maps.LatLng(42.679561662333967, 2.764324588583443)
	],
	[
		new google.maps.LatLng(42.682158291289312, 2.765580213857942),
		new google.maps.LatLng(42.681956929174852, 2.765595647024524),
		new google.maps.LatLng(42.681753768341181, 2.765611088112943),
		new google.maps.LatLng(42.681484086662394, 2.765631669911187),
		new google.maps.LatLng(42.681439118836074, 2.765625758549487),
		new google.maps.LatLng(42.681353674049497, 2.765611478506694),
		new google.maps.LatLng(42.681262714813492, 2.765542385698725),
		new google.maps.LatLng(42.681167038670374, 2.765372169174924),
		new google.maps.LatLng(42.680977032874964, 2.764827010553466),
		new google.maps.LatLng(42.680938011590058, 2.764662659706564),
		new google.maps.LatLng(42.680788243763658, 2.764018637899777),
		new google.maps.LatLng(42.680748517214127, 2.763943247218112)
	],
	[
		new google.maps.LatLng(42.679561662333967, 2.764324588583443),
		new google.maps.LatLng(42.679615646047345, 2.764750862666545),
		new google.maps.LatLng(42.679641253767315, 2.764948164662855),
		new google.maps.LatLng(42.679678784733973, 2.765252650744528),
		new google.maps.LatLng(42.679711715734989, 2.765509633437707),
		new google.maps.LatLng(42.679756546412065, 2.765864051666781),
		new google.maps.LatLng(42.679769352757106, 2.765963922626126)
	],
	[
		new google.maps.LatLng(42.695482145878415, 2.764830607562518),
		new google.maps.LatLng(42.695441681492312, 2.764828332410221),
		new google.maps.LatLng(42.695415647801489, 2.764846720998889),
		new google.maps.LatLng(42.695401331624588, 2.764878469403398),
		new google.maps.LatLng(42.695389734539283, 2.764919958936891)
	],
	[
		new google.maps.LatLng(42.695389734539283, 2.764919958936891),
		new google.maps.LatLng(42.695390764360845, 2.764979679362011),
		new google.maps.LatLng(42.695414255782033, 2.765031996754802),
		new google.maps.LatLng(42.69545655678143, 2.765051328316254)
	],
	[
		new google.maps.LatLng(42.69545655678143, 2.765051328316254),
		new google.maps.LatLng(42.695424472508286, 2.765180658696352),
		new google.maps.LatLng(42.695377109449311, 2.765312488942058),
		new google.maps.LatLng(42.695265685221237, 2.766575696680807),
		new google.maps.LatLng(42.695254001372803, 2.766990162124991)
	],
	[
		new google.maps.LatLng(42.683044655966675, 2.765516934335451),
		new google.maps.LatLng(42.682449551226355, 2.765559543893136),
		new google.maps.LatLng(42.682158291289312, 2.765580213857942)
	],
	[
		new google.maps.LatLng(42.679769352757106, 2.765963922626126),
		new google.maps.LatLng(42.679810521861533, 2.766289110729283),
		new google.maps.LatLng(42.679887413745348, 2.766916358743045),
		new google.maps.LatLng(42.679938679723357, 2.767337775414445),
		new google.maps.LatLng(42.679997262792973, 2.767817653480573)
	],
	[
		new google.maps.LatLng(42.695254001372803, 2.766990162124991),
		new google.maps.LatLng(42.695264020978456, 2.767049847435224),
		new google.maps.LatLng(42.695266744878381, 2.767062024663824)
	],
	[
		new google.maps.LatLng(42.695143830536487, 2.767596383629574),
		new google.maps.LatLng(42.69521236090479, 2.767274326974726),
		new google.maps.LatLng(42.695266744878381, 2.767062024663824)
	],
	[
		new google.maps.LatLng(42.695032078614503, 2.767889359437229),
		new google.maps.LatLng(42.695036534535717, 2.767871059172503),
		new google.maps.LatLng(42.695143830536487, 2.767596383629574)
	],
	[
		new google.maps.LatLng(42.679997262792973, 2.767817653480573),
		new google.maps.LatLng(42.680067748691641, 2.768397407758521),
		new google.maps.LatLng(42.680072325913322, 2.768435164252179)
	],
	[
		new google.maps.LatLng(42.695014353081447, 2.768007660628015),
		new google.maps.LatLng(42.695021412973432, 2.767946688557273),
		new google.maps.LatLng(42.695032078614503, 2.767889359437229)
	],
	[
		new google.maps.LatLng(42.694831479050769, 2.768673891516146),
		new google.maps.LatLng(42.694859284614942, 2.768643309488358),
		new google.maps.LatLng(42.694928301184405, 2.768544306535176),
		new google.maps.LatLng(42.694966682977025, 2.768414954191557),
		new google.maps.LatLng(42.695014353081447, 2.768007660628015)
	],
	[
		new google.maps.LatLng(42.680072325913322, 2.768435164252179),
		new google.maps.LatLng(42.680116262300601, 2.768795684645379),
		new google.maps.LatLng(42.680123670823519, 2.768895576905841),
		new google.maps.LatLng(42.680131123086376, 2.769016184858501),
		new google.maps.LatLng(42.680134817376619, 2.769061257128922)
	],
	[
		new google.maps.LatLng(42.694655696678481, 2.768878140833654),
		new google.maps.LatLng(42.694711293061701, 2.768809663039208),
		new google.maps.LatLng(42.694831479050769, 2.768673891516146)
	],
	[
		new google.maps.LatLng(42.694655696678481, 2.768878140833654),
		new google.maps.LatLng(42.694687195750305, 2.768892641832336),
		new google.maps.LatLng(42.694752256951574, 2.769043523267717),
		new google.maps.LatLng(42.694765864595155, 2.76909953737854)
	],
	[
		new google.maps.LatLng(42.680134817376619, 2.769061257128922),
		new google.maps.LatLng(42.680139430774283, 2.769116073819255),
		new google.maps.LatLng(42.680150632458911, 2.769307344285793),
		new google.maps.LatLng(42.680154459708575, 2.769414562389911),
		new google.maps.LatLng(42.680158245589297, 2.769502283758048),
		new google.maps.LatLng(42.680157710600504, 2.769671665621078),
		new google.maps.LatLng(42.68015715475471, 2.769831299716632),
		new google.maps.LatLng(42.680155489231218, 2.770311419691297),
		new google.maps.LatLng(42.68014932333967, 2.770790338557078),
		new google.maps.LatLng(42.680149401427116, 2.770826895411565)
	],
	[
		new google.maps.LatLng(42.694765864595155, 2.76909953737854),
		new google.maps.LatLng(42.694816613056624, 2.769284604744034),
		new google.maps.LatLng(42.694826959732858, 2.769496646906781)
	],
	[
		new google.maps.LatLng(42.69477563827995, 2.769880792454173),
		new google.maps.LatLng(42.694794312169293, 2.769784428697074),
		new google.maps.LatLng(42.694812034616589, 2.769663690001038),
		new google.maps.LatLng(42.694826959732858, 2.769496646906781)
	],
	[
		new google.maps.LatLng(42.694723831643493, 2.770039451028396),
		new google.maps.LatLng(42.694754240720663, 2.769964978896549),
		new google.maps.LatLng(42.694763161514267, 2.769932035250753)
	],
	[
		new google.maps.LatLng(42.694397994681857, 2.770289384249166),
		new google.maps.LatLng(42.694481521581785, 2.77024761384695),
		new google.maps.LatLng(42.694552474265599, 2.770211987283908),
		new google.maps.LatLng(42.694618886534208, 2.770155656804181),
		new google.maps.LatLng(42.694672722121631, 2.770104252195428),
		new google.maps.LatLng(42.694723831643493, 2.770039451028396)
	],
	[
		new google.maps.LatLng(42.694397994681857, 2.770289384249166),
		new google.maps.LatLng(42.694414510530763, 2.770444114908861),
		new google.maps.LatLng(42.694422055839844, 2.770608631383034),
		new google.maps.LatLng(42.694441681100024, 2.770955928643798)
	],
	[
		new google.maps.LatLng(42.68013298388685, 2.772825401698761),
		new google.maps.LatLng(42.680133182730835, 2.772803687051588),
		new google.maps.LatLng(42.680134443288956, 2.772665764393806),
		new google.maps.LatLng(42.680135790561025, 2.772453729056452),
		new google.maps.LatLng(42.68013930801871, 2.771994317124625),
		new google.maps.LatLng(42.680140763815452, 2.771833462075708),
		new google.maps.LatLng(42.68015055354816, 2.771365495585251),
		new google.maps.LatLng(42.680150111279474, 2.771158341292492),
		new google.maps.LatLng(42.680149401427116, 2.770826895411565)
	],
	[
		new google.maps.LatLng(42.694441681100024, 2.770955928643798),
		new google.maps.LatLng(42.694461098398698, 2.771206937879232)
	],
	[
		new google.maps.LatLng(42.694461098398698, 2.771206937879232),
		new google.maps.LatLng(42.694467671131946, 2.771337331003079)
	],
	[
		new google.maps.LatLng(42.694467671131946, 2.771337331003079),
		new google.maps.LatLng(42.694472327722714, 2.771412882222446),
		new google.maps.LatLng(42.69449008470049, 2.771728496947327),
		new google.maps.LatLng(42.694494093814988, 2.771922280736027),
		new google.maps.LatLng(42.694479196211539, 2.772103949204694),
		new google.maps.LatLng(42.694461453211886, 2.772216154528646)
	],
	[
		new google.maps.LatLng(42.694461453211886, 2.772216154528646),
		new google.maps.LatLng(42.694431114490193, 2.772324750849357),
		new google.maps.LatLng(42.694383726746288, 2.772449260717951),
		new google.maps.LatLng(42.6943372047756, 2.77255791984467)
	],
	[
		new google.maps.LatLng(42.694330089240694, 2.772594513907635),
		new google.maps.LatLng(42.694317642250631, 2.77266038138713),
		new google.maps.LatLng(42.694298148890347, 2.772795750451298),
		new google.maps.LatLng(42.694292207376087, 2.772961537958599)
	],
	[
		new google.maps.LatLng(42.680111463148982, 2.774553404385256),
		new google.maps.LatLng(42.680118838689097, 2.774213397920122),
		new google.maps.LatLng(42.68012035109826, 2.774078131913015),
		new google.maps.LatLng(42.680126217110832, 2.77345054958516),
		new google.maps.LatLng(42.68013298388685, 2.772825401698761)
	],
	[
		new google.maps.LatLng(42.693769400533924, 2.773182968878946),
		new google.maps.LatLng(42.693832190138238, 2.773113249172819),
		new google.maps.LatLng(42.693907610190614, 2.773064201061433),
		new google.maps.LatLng(42.693992044756392, 2.77302608781765),
		new google.maps.LatLng(42.69409085723256, 2.772984261724277),
		new google.maps.LatLng(42.694187925609498, 2.77296803926998),
		new google.maps.LatLng(42.694292207376087, 2.772961537958599)
	],
	[
		new google.maps.LatLng(42.693483345917819, 2.773541202305493),
		new google.maps.LatLng(42.693562270005494, 2.773448263144996),
		new google.maps.LatLng(42.693649247346961, 2.773337011132108),
		new google.maps.LatLng(42.693719167361024, 2.77323801204856),
		new google.maps.LatLng(42.693769400533924, 2.773182968878946)
	],
	[
		new google.maps.LatLng(42.693396279082421, 2.773609795556967),
		new google.maps.LatLng(42.693429488490061, 2.77358285308848),
		new google.maps.LatLng(42.693483345917819, 2.773541202305493)
	],
	[
		new google.maps.LatLng(42.692924301762986, 2.774058941245187),
		new google.maps.LatLng(42.692948515566492, 2.77402959486619),
		new google.maps.LatLng(42.693033692344599, 2.773917132151102),
		new google.maps.LatLng(42.693131469415064, 2.773810714217133),
		new google.maps.LatLng(42.693215836778499, 2.773740912202971),
		new google.maps.LatLng(42.693367556488077, 2.773633065235634),
		new google.maps.LatLng(42.693396279082421, 2.773609795556967)
	],
	[
		new google.maps.LatLng(42.692858845208988, 2.7741432940565),
		new google.maps.LatLng(42.692892021513366, 2.774100506446036),
		new google.maps.LatLng(42.692908161640119, 2.774079723851024),
		new google.maps.LatLng(42.692924301762986, 2.774058941245187)
	],
	[
		new google.maps.LatLng(42.691849271179031, 2.775479363583321),
		new google.maps.LatLng(42.691995434422054, 2.775293542124909),
		new google.maps.LatLng(42.692152340017635, 2.775085738125053),
		new google.maps.LatLng(42.692290418325264, 2.774903601722321),
		new google.maps.LatLng(42.692401618322371, 2.774766664490137),
		new google.maps.LatLng(42.692568384838381, 2.774545412141193),
		new google.maps.LatLng(42.692710937042435, 2.77435350476433),
		new google.maps.LatLng(42.692796086662781, 2.774227635639752),
		new google.maps.LatLng(42.692858845208988, 2.7741432940565)
	],
	[
		new google.maps.LatLng(42.68014389940695, 2.775441611003315),
		new google.maps.LatLng(42.680127952323765, 2.775126065395221),
		new google.maps.LatLng(42.680110149924957, 2.774783718623507),
		new google.maps.LatLng(42.680111463148982, 2.774553404385256)
	],
	[
		new google.maps.LatLng(42.68014389940695, 2.775441611003315),
		new google.maps.LatLng(42.68015769008165, 2.775586567014341),
		new google.maps.LatLng(42.680164141671071, 2.77566209216356),
		new google.maps.LatLng(42.680174254246083, 2.775768068986185),
		new google.maps.LatLng(42.680191694096408, 2.775938599886003),
		new google.maps.LatLng(42.680201783039784, 2.776033608880766)
	],
	[
		new google.maps.LatLng(42.691677956236305, 2.77567625134861),
		new google.maps.LatLng(42.691700399958265, 2.775660320969898),
		new google.maps.LatLng(42.691849271179031, 2.775479363583321)
	],
	[
		new google.maps.LatLng(42.691289117642576, 2.775900788858665),
		new google.maps.LatLng(42.691510947596207, 2.775782930181878),
		new google.maps.LatLng(42.691551363478766, 2.775762054549537),
		new google.maps.LatLng(42.691677956236305, 2.77567625134861)
	],
	[
		new google.maps.LatLng(42.689724622375955, 2.777160912872446),
		new google.maps.LatLng(42.689759651329389, 2.777143716711899),
		new google.maps.LatLng(42.689789288318678, 2.777127759049419),
		new google.maps.LatLng(42.689872731237244, 2.777044564336551),
		new google.maps.LatLng(42.690125460697331, 2.776653589774762),
		new google.maps.LatLng(42.690293143135158, 2.776438443022653),
		new google.maps.LatLng(42.690365824083905, 2.7763686936198),
		new google.maps.LatLng(42.691203798025697, 2.775946212207426),
		new google.maps.LatLng(42.691289117642576, 2.775900788858665)
	],
	[
		new google.maps.LatLng(42.680193879657651, 2.776123813238188),
		new google.maps.LatLng(42.680201783039784, 2.776033608880766)
	],
	[
		new google.maps.LatLng(42.680248481383693, 2.776437992530777),
		new google.maps.LatLng(42.680238513367151, 2.776400256015314),
		new google.maps.LatLng(42.680195833506858, 2.776198138227917),
		new google.maps.LatLng(42.680193879657651, 2.776123813238188)
	],
	[
		new google.maps.LatLng(42.680286538188383, 2.776579201057425),
		new google.maps.LatLng(42.680248481383693, 2.776437992530777)
	],
	[
		new google.maps.LatLng(42.680335802824111, 2.77692142874686),
		new google.maps.LatLng(42.680302455565666, 2.776882562196939),
		new google.maps.LatLng(42.680269944341482, 2.77681322894961),
		new google.maps.LatLng(42.680264404817692, 2.776743791306344),
		new google.maps.LatLng(42.68026780562959, 2.776649948772608),
		new google.maps.LatLng(42.680286538188383, 2.776579201057425)
	],
	[
		new google.maps.LatLng(42.680384507087126, 2.777426947172342),
		new google.maps.LatLng(42.680355485437083, 2.777306420122444),
		new google.maps.LatLng(42.680341639395841, 2.777133436370813),
		new google.maps.LatLng(42.680335802824111, 2.77692142874686)
	],
	[
		new google.maps.LatLng(42.68908816196798, 2.777641097315823),
		new google.maps.LatLng(42.689111201638219, 2.777478916490619),
		new google.maps.LatLng(42.689169368397295, 2.777347068889401),
		new google.maps.LatLng(42.689272571073559, 2.777254048914503),
		new google.maps.LatLng(42.689422614729871, 2.777203506206827),
		new google.maps.LatLng(42.689619457081662, 2.777174722114608),
		new google.maps.LatLng(42.689724622375955, 2.777160912872446)
	],
	[
		new google.maps.LatLng(42.680384507087126, 2.777426947172342),
		new google.maps.LatLng(42.680387331448578, 2.777487864603368),
		new google.maps.LatLng(42.68042502096116, 2.777886192990025),
		new google.maps.LatLng(42.680507344649762, 2.778564621759776),
		new google.maps.LatLng(42.680532005961524, 2.778750968749434),
		new google.maps.LatLng(42.680572217571346, 2.779066425942273),
		new google.maps.LatLng(42.680600541980333, 2.779285662059572)
	],
	[
		new google.maps.LatLng(42.688555159438934, 2.778586435139105),
		new google.maps.LatLng(42.688644202348591, 2.77860193975358),
		new google.maps.LatLng(42.688699963809292, 2.778610259647881),
		new google.maps.LatLng(42.688742210639205, 2.77860522376602),
		new google.maps.LatLng(42.688812346942193, 2.778608613456142),
		new google.maps.LatLng(42.688898583584695, 2.778571723576968),
		new google.maps.LatLng(42.688938052896262, 2.77852769825851),
		new google.maps.LatLng(42.688983583328721, 2.778371525962048),
		new google.maps.LatLng(42.689022585538204, 2.77810203479689),
		new google.maps.LatLng(42.68908816196798, 2.777641097315823)
	],
	[
		new google.maps.LatLng(42.688352943123206, 2.778624985016317),
		new google.maps.LatLng(42.688489531771445, 2.778589122445899),
		new google.maps.LatLng(42.688555159438934, 2.778586435139105)
	],
	[
		new google.maps.LatLng(42.688166089297532, 2.778701255853771),
		new google.maps.LatLng(42.688211909546808, 2.778685237896294),
		new google.maps.LatLng(42.688352943123206, 2.778624985016317)
	],
	[
		new google.maps.LatLng(42.686928111498865, 2.778737645407853),
		new google.maps.LatLng(42.686959544165575, 2.778720463755201),
		new google.maps.LatLng(42.687125855102508, 2.778710081984303),
		new google.maps.LatLng(42.687333551746697, 2.778712950042401),
		new google.maps.LatLng(42.687697696931615, 2.778718878955168),
		new google.maps.LatLng(42.687833913483615, 2.778717130807087),
		new google.maps.LatLng(42.687967418503163, 2.778715416738956),
		new google.maps.LatLng(42.688127456469978, 2.77871480871669),
		new google.maps.LatLng(42.688166089297532, 2.778701255853771)
	],
	[
		new google.maps.LatLng(42.686378376447536, 2.778984690222617),
		new google.maps.LatLng(42.686420548732272, 2.778943094217826),
		new google.maps.LatLng(42.686506837888679, 2.778931799025439),
		new google.maps.LatLng(42.686656889422075, 2.778884918584775),
		new google.maps.LatLng(42.686888592043189, 2.778757294050527),
		new google.maps.LatLng(42.686928111498865, 2.778737645407853)
	],
	[
		new google.maps.LatLng(42.685959695449057, 2.780877675120865),
		new google.maps.LatLng(42.685940814592612, 2.780439020181352),
		new google.maps.LatLng(42.685967983466639, 2.780096468068682),
		new google.maps.LatLng(42.68603583776035, 2.779864660956949),
		new google.maps.LatLng(42.686070804625082, 2.779817000992372),
		new google.maps.LatLng(42.686101292977355, 2.779777887826492),
		new google.maps.LatLng(42.686190767718337, 2.779566715930704),
		new google.maps.LatLng(42.686315926280201, 2.779220133848608),
		new google.maps.LatLng(42.686332913481252, 2.779173760085263),
		new google.maps.LatLng(42.686357873865227, 2.77907007673981),
		new google.maps.LatLng(42.686367680665413, 2.779029822581889),
		new google.maps.LatLng(42.686378376447536, 2.778984690222617)
	],
	[
		new google.maps.LatLng(42.680600541980333, 2.779285662059572),
		new google.maps.LatLng(42.680666287170801, 2.779776497775599),
		new google.maps.LatLng(42.680717132045494, 2.780017582258616),
		new google.maps.LatLng(42.680797838081197, 2.780352386248063),
		new google.maps.LatLng(42.680834109554816, 2.780502133728315),
		new google.maps.LatLng(42.680955644532823, 2.781018353931587),
		new google.maps.LatLng(42.681068049569731, 2.781467587760566),
		new google.maps.LatLng(42.681085278942945, 2.781539418544884),
		new google.maps.LatLng(42.681142554995795, 2.781849943231522),
		new google.maps.LatLng(42.681181101167766, 2.782234871189969),
		new google.maps.LatLng(42.681210864558594, 2.782723411342112),
		new google.maps.LatLng(42.681275060701061, 2.783789433909797)
	],
	[
		new google.maps.LatLng(42.686058073275809, 2.782827201181067),
		new google.maps.LatLng(42.6859998833581, 2.78250812325558),
		new google.maps.LatLng(42.685950383263148, 2.782041551688693),
		new google.maps.LatLng(42.685941698756864, 2.781750319345713),
		new google.maps.LatLng(42.685934966746075, 2.78153585599591),
		new google.maps.LatLng(42.685956034850761, 2.781285946997706),
		new google.maps.LatLng(42.685959695449057, 2.780877675120865)
	],
	[
		new google.maps.LatLng(42.686280540721754, 2.784354608555365),
		new google.maps.LatLng(42.686227262727762, 2.783794208535067),
		new google.maps.LatLng(42.68612264030795, 2.783187691819404),
		new google.maps.LatLng(42.686111720511647, 2.783123142107454),
		new google.maps.LatLng(42.686058073275809, 2.782827201181067)
	],
	[
		new google.maps.LatLng(42.681275060701061, 2.783789433909797),
		new google.maps.LatLng(42.681293731270003, 2.784130568842935)
	],
	[
		new google.maps.LatLng(42.681293731270003, 2.784130568842935),
		new google.maps.LatLng(42.681317062531278, 2.784554550202721)
	],
	[
		new google.maps.LatLng(42.68726012595171, 2.787286855360292),
		new google.maps.LatLng(42.686994195572481, 2.786935621144604),
		new google.maps.LatLng(42.686495653695829, 2.786262287221503),
		new google.maps.LatLng(42.68625899659164, 2.78571474610886),
		new google.maps.LatLng(42.686257983129622, 2.785657471014986),
		new google.maps.LatLng(42.686298177378951, 2.785077226425055),
		new google.maps.LatLng(42.686316451646853, 2.78477492447245),
		new google.maps.LatLng(42.686307225175263, 2.784657963546825),
		new google.maps.LatLng(42.686280540721754, 2.784354608555365)
	],
	[
		new google.maps.LatLng(42.681317062531278, 2.784554550202721),
		new google.maps.LatLng(42.681333864026392, 2.784861572170751),
		new google.maps.LatLng(42.681338545668588, 2.784954166401892)
	],
	[
		new google.maps.LatLng(42.681338545668588, 2.784954166401892),
		new google.maps.LatLng(42.68135252818329, 2.785201488800932),
		new google.maps.LatLng(42.681341566411767, 2.785563449423501),
		new google.maps.LatLng(42.681302562968156, 2.786291088481965)
	],
	[
		new google.maps.LatLng(42.681302562968156, 2.786291088481965),
		new google.maps.LatLng(42.681260071758061, 2.787076012569977),
		new google.maps.LatLng(42.681256569488276, 2.787123550565988)
	],
	[
		new google.maps.LatLng(42.681256569488276, 2.787123550565988),
		new google.maps.LatLng(42.681251391352774, 2.787232022714669),
		new google.maps.LatLng(42.681233357722675, 2.787658593079442),
		new google.maps.LatLng(42.681233376803739, 2.787668342239049),
		new google.maps.LatLng(42.681232508785691, 2.787684186787718)
	],
	[
		new google.maps.LatLng(42.687259358509195, 2.78735266861104),
		new google.maps.LatLng(42.68726012595171, 2.787286855360292)
	],
	[
		new google.maps.LatLng(42.687257671667524, 2.787408734840792),
		new google.maps.LatLng(42.687259411273793, 2.78737947957515),
		new google.maps.LatLng(42.687259358509195, 2.78735266861104)
	],
	[
		new google.maps.LatLng(42.687253330367696, 2.787486748667339),
		new google.maps.LatLng(42.687257671667524, 2.787408734840792)
	],
	[
		new google.maps.LatLng(42.687253330367696, 2.787486748667339),
		new google.maps.LatLng(42.687401322523762, 2.787759200309059)
	],
	[
		new google.maps.LatLng(42.681232508785691, 2.787684186787718),
		new google.maps.LatLng(42.681242224870395, 2.788049726308423),
		new google.maps.LatLng(42.68128651800162, 2.789080488522388),
		new google.maps.LatLng(42.681314778371309, 2.789734766284541),
		new google.maps.LatLng(42.681316633792107, 2.789764005262275)
	],
	[
		new google.maps.LatLng(42.687401322523762, 2.787759200309059),
		new google.maps.LatLng(42.687579087678046, 2.788083950023805),
		new google.maps.LatLng(42.687857189374725, 2.788681331120076)
	],
	[
		new google.maps.LatLng(42.687857189374725, 2.788681331120076),
		new google.maps.LatLng(42.688261700650969, 2.789552474614658),
		new google.maps.LatLng(42.68828893851726, 2.789687655504388)
	],
	[
		new google.maps.LatLng(42.683482043455783, 2.790887080527076),
		new google.maps.LatLng(42.683475480568831, 2.790749399355085),
		new google.maps.LatLng(42.683389853414859, 2.790640029644368),
		new google.maps.LatLng(42.683303970007394, 2.790400269719228),
		new google.maps.LatLng(42.683301854824222, 2.790238198847625),
		new google.maps.LatLng(42.683300685502687, 2.790100498656316),
		new google.maps.LatLng(42.683368462106799, 2.789360547180706)
	],
	[
		new google.maps.LatLng(42.68828893851726, 2.789687655504388),
		new google.maps.LatLng(42.687303122951775, 2.789937394750106),
		new google.maps.LatLng(42.686584197666186, 2.790115479044943),
		new google.maps.LatLng(42.686538365916185, 2.790126611915063),
		new google.maps.LatLng(42.685895824629192, 2.790284918823209)
	],
	[
		new google.maps.LatLng(42.681316633792107, 2.789764005262275),
		new google.maps.LatLng(42.68134073966857, 2.790135587999716)
	],
	[
		new google.maps.LatLng(42.68134073966857, 2.790135587999716),
		new google.maps.LatLng(42.681390382754941, 2.790693522315748),
		new google.maps.LatLng(42.681405075751982, 2.790850666255929)
	],
	[
		new google.maps.LatLng(42.685895824629192, 2.790284918823209),
		new google.maps.LatLng(42.685289245274284, 2.790441873277821)
	],
	[
		new google.maps.LatLng(42.685289245274284, 2.790441873277821),
		new google.maps.LatLng(42.685136472050168, 2.790478982829977),
		new google.maps.LatLng(42.685115802978892, 2.790483931280167),
		new google.maps.LatLng(42.685060087673449, 2.790498755343012),
		new google.maps.LatLng(42.684941468034438, 2.790529649157027),
		new google.maps.LatLng(42.68473477907748, 2.790581576114143),
		new google.maps.LatLng(42.684249504036075, 2.790701528782963),
		new google.maps.LatLng(42.684175814553178, 2.790720073843531),
		new google.maps.LatLng(42.684139868498008, 2.790728733205156),
		new google.maps.LatLng(42.684120097872793, 2.790733678458894)
	],
	[
		new google.maps.LatLng(42.684120097872793, 2.790733678458894),
		new google.maps.LatLng(42.684067976825091, 2.790747270910586),
		new google.maps.LatLng(42.684019450970666, 2.790759632189553),
		new google.maps.LatLng(42.684014057958294, 2.790760869408669)
	],
	[
		new google.maps.LatLng(42.684014057958294, 2.790760869408669),
		new google.maps.LatLng(42.683939470005846, 2.790779417361072)
	],
	[
		new google.maps.LatLng(42.683939470005846, 2.790779417361072),
		new google.maps.LatLng(42.683911613231814, 2.79078682911926),
		new google.maps.LatLng(42.683828935087689, 2.790806624544792),
		new google.maps.LatLng(42.683805571063409, 2.790812800885564)
	],
	[
		new google.maps.LatLng(42.683805571063409, 2.790812800885564),
		new google.maps.LatLng(42.683650100526528, 2.790849918956923),
		new google.maps.LatLng(42.683482043455783, 2.790887080527076)
	],
	[
		new google.maps.LatLng(42.681405075751982, 2.790850666255929),
		new google.maps.LatLng(42.681439963648806, 2.791220992214539),
		new google.maps.LatLng(42.681462782736666, 2.791396387389399)
	],
	[
		new google.maps.LatLng(42.681838440787899, 2.791313395987632),
		new google.maps.LatLng(42.681922007658585, 2.791288725435664),
		new google.maps.LatLng(42.682133175435197, 2.791228256499188),
		new google.maps.LatLng(42.682720888317235, 2.791078698916598),
		new google.maps.LatLng(42.682835911593088, 2.791047820605052),
		new google.maps.LatLng(42.682877250689828, 2.791037923218329),
		new google.maps.LatLng(42.683116297041096, 2.790981009362553),
		new google.maps.LatLng(42.683482043455783, 2.790887080527076)
	],
	[
		new google.maps.LatLng(42.681838440787899, 2.791313395987632),
		new google.maps.LatLng(42.681739596018538, 2.791341778470032),
		new google.maps.LatLng(42.681628152656053, 2.791364112099664)
	],
	[
		new google.maps.LatLng(42.681628152656053, 2.791364112099664),
		new google.maps.LatLng(42.681462782736666, 2.791396387389399)
	]
];

var circuit_10 = [
	[
		new google.maps.LatLng(42.753873897528017, 2.674385890869448),
		new google.maps.LatLng(42.75410902307388, 2.674236940830138),
		new google.maps.LatLng(42.754248798939095, 2.67407510262651),
		new google.maps.LatLng(42.754281877997599, 2.674012691657394),
		new google.maps.LatLng(42.754375756484343, 2.673837688174379),
		new google.maps.LatLng(42.754499990132963, 2.673591746707936),
		new google.maps.LatLng(42.754577037818173, 2.673499805029414),
		new google.maps.LatLng(42.754674003114232, 2.673452896097162),
		new google.maps.LatLng(42.75471805428537, 2.673450209484659),
		new google.maps.LatLng(42.754773793378966, 2.673447456331314),
		new google.maps.LatLng(42.754948497725344, 2.67353554569162),
		new google.maps.LatLng(42.75510430182274, 2.673617640429316),
		new google.maps.LatLng(42.755152933678112, 2.673642990849265),
		new google.maps.LatLng(42.75532571323037, 2.67368960685856),
		new google.maps.LatLng(42.755394928469968, 2.673683117926119),
		new google.maps.LatLng(42.755456861497692, 2.673647386939856),
		new google.maps.LatLng(42.755501665877183, 2.67359710962858)
	],
	[
		new google.maps.LatLng(42.757449609354971, 2.674309753303141),
		new google.maps.LatLng(42.75740637633195, 2.674285591034062),
		new google.maps.LatLng(42.757219002315708, 2.674170722403091),
		new google.maps.LatLng(42.757175773654325, 2.674147781978363),
		new google.maps.LatLng(42.75707489534873, 2.674090997917914),
		new google.maps.LatLng(42.75693088792552, 2.674044218205852),
		new google.maps.LatLng(42.756775165429339, 2.673988962133644),
		new google.maps.LatLng(42.756587040366483, 2.673922906418303),
		new google.maps.LatLng(42.756321504544232, 2.673829221743478),
		new google.maps.LatLng(42.756133405624411, 2.673771708705251),
		new google.maps.LatLng(42.756060526541333, 2.67375625516865),
		new google.maps.LatLng(42.755968747289081, 2.673734807650649),
		new google.maps.LatLng(42.755807726545896, 2.673711307482617),
		new google.maps.LatLng(42.755629614796305, 2.673685462773733),
		new google.maps.LatLng(42.755556728710822, 2.673667568647419),
		new google.maps.LatLng(42.755501665877183, 2.67359710962858)
	],
	[
		new google.maps.LatLng(42.759363059914165, 2.675806022553302),
		new google.maps.LatLng(42.759323427178792, 2.675783058917214),
		new google.maps.LatLng(42.759281086882716, 2.675756449213168),
		new google.maps.LatLng(42.759207216575255, 2.675710492610076),
		new google.maps.LatLng(42.758684457158651, 2.675298533798236),
		new google.maps.LatLng(42.758649301879984, 2.675269444812869),
		new google.maps.LatLng(42.758356273823466, 2.675005075671344),
		new google.maps.LatLng(42.758297607480493, 2.674932191463029),
		new google.maps.LatLng(42.758224473160588, 2.674832543829985),
		new google.maps.LatLng(42.758131595108928, 2.674745207389656),
		new google.maps.LatLng(42.757944172696085, 2.674614473783348),
		new google.maps.LatLng(42.75751355952724, 2.674346000279415),
		new google.maps.LatLng(42.757449609354971, 2.674309753303141)
	],
	[
		new google.maps.LatLng(42.753873897528017, 2.674385890869448),
		new google.maps.LatLng(42.753240919897479, 2.674690797052515),
		new google.maps.LatLng(42.752864758343136, 2.674883233736688),
		new google.maps.LatLng(42.752512833401887, 2.675062111960259),
		new google.maps.LatLng(42.752430319587845, 2.675130897694413),
		new google.maps.LatLng(42.752377403897952, 2.675175115798202),
		new google.maps.LatLng(42.752295837246166, 2.675259756088749),
		new google.maps.LatLng(42.752254646889021, 2.675316110001218),
		new google.maps.LatLng(42.752170471763364, 2.675430046146468),
		new google.maps.LatLng(42.7521239270366, 2.675499850624841),
		new google.maps.LatLng(42.75198966605722, 2.675701910702637),
		new google.maps.LatLng(42.751885783270581, 2.675840357336711),
		new google.maps.LatLng(42.751702002302018, 2.67602073068619),
		new google.maps.LatLng(42.751342359127136, 2.676324087619223),
		new google.maps.LatLng(42.751277783646522, 2.676378128832827),
		new google.maps.LatLng(42.750938808741978, 2.676677706558312),
		new google.maps.LatLng(42.750828579090602, 2.676799103768308)
	],
	[
		new google.maps.LatLng(42.761066630472854, 2.676587259871125),
		new google.maps.LatLng(42.760634433436422, 2.676388320333513),
		new google.maps.LatLng(42.760508379945918, 2.676331669639226),
		new google.maps.LatLng(42.760039287748683, 2.676123177245731),
		new google.maps.LatLng(42.759951053330035, 2.676084620329489),
		new google.maps.LatLng(42.759519772965007, 2.675891785606385),
		new google.maps.LatLng(42.759363059914165, 2.675806022553302)
	],
	[
		new google.maps.LatLng(42.762323080625769, 2.676396012028445),
		new google.maps.LatLng(42.762295427311457, 2.67638587530253),
		new google.maps.LatLng(42.762277172608655, 2.676379183742849),
		new google.maps.LatLng(42.762232523715149, 2.676373018705016),
		new google.maps.LatLng(42.762124251765691, 2.676358068180765),
		new google.maps.LatLng(42.761995629590281, 2.676344140442845),
		new google.maps.LatLng(42.761863454290484, 2.676344875510444),
		new google.maps.LatLng(42.761835387597777, 2.676348638703754),
		new google.maps.LatLng(42.761711557766326, 2.676365244899861)
	],
	[
		new google.maps.LatLng(42.761711557766326, 2.676365244899861),
		new google.maps.LatLng(42.761682799697681, 2.676370285994726),
		new google.maps.LatLng(42.761640555015347, 2.676375402480212),
		new google.maps.LatLng(42.761395213869932, 2.676418256850241),
		new google.maps.LatLng(42.761261403039008, 2.676472691808241),
		new google.maps.LatLng(42.761066630472854, 2.676587259871125)
	],
	[
		new google.maps.LatLng(42.764525891616309, 2.676350810167324),
		new google.maps.LatLng(42.764324541827953, 2.676371456081211)
	],
	[
		new google.maps.LatLng(42.764525891616309, 2.676350810167324),
		new google.maps.LatLng(42.764533407340025, 2.676357906331359),
		new google.maps.LatLng(42.764628689804972, 2.676447866134362),
		new google.maps.LatLng(42.764661188407743, 2.676490396707524),
		new google.maps.LatLng(42.764724228109287, 2.676522995534974)
	],
	[
		new google.maps.LatLng(42.764324541827953, 2.676371456081211),
		new google.maps.LatLng(42.764237350076087, 2.676380483010927),
		new google.maps.LatLng(42.764110633374294, 2.676401933501647),
		new google.maps.LatLng(42.763973214814548, 2.676452731627831),
		new google.maps.LatLng(42.763942680630727, 2.676465104480261),
		new google.maps.LatLng(42.763868077670708, 2.676496495457516),
		new google.maps.LatLng(42.763781036228607, 2.676533120840234),
		new google.maps.LatLng(42.763683179893448, 2.676583698259003),
		new google.maps.LatLng(42.763606822724547, 2.676607307883223),
		new google.maps.LatLng(42.763394701606771, 2.676634114276051),
		new google.maps.LatLng(42.763288616745953, 2.676639584987753),
		new google.maps.LatLng(42.763208596276769, 2.676641249240565),
		new google.maps.LatLng(42.763099770041109, 2.676632092226003),
		new google.maps.LatLng(42.762912592777681, 2.676581879330487),
		new google.maps.LatLng(42.762588601229943, 2.676484837046759)
	],
	[
		new google.maps.LatLng(42.762588601229943, 2.676484837046759),
		new google.maps.LatLng(42.762418489681636, 2.676428429330836),
		new google.maps.LatLng(42.762323080625769, 2.676396012028445)
	],
	[
		new google.maps.LatLng(42.764724228109287, 2.676522995534974),
		new google.maps.LatLng(42.764787882655995, 2.676759387662426),
		new google.maps.LatLng(42.764820620367864, 2.676881239761123),
		new google.maps.LatLng(42.764851547982531, 2.676999440825413),
		new google.maps.LatLng(42.765101685916811, 2.677952363121015)
	],
	[
		new google.maps.LatLng(42.750828579090602, 2.676799103768308),
		new google.maps.LatLng(42.750559082637572, 2.677180033884897)
	],
	[
		new google.maps.LatLng(42.750559082637572, 2.677180033884897),
		new google.maps.LatLng(42.750451642234744, 2.677331914515379),
		new google.maps.LatLng(42.750290355353307, 2.677518253924144),
		new google.maps.LatLng(42.75012713552438, 2.677659461590418),
		new google.maps.LatLng(42.74978888719221, 2.677902900756333),
		new google.maps.LatLng(42.749592430985622, 2.678055270425143),
		new google.maps.LatLng(42.749539551300487, 2.678111684446658)
	],
	[
		new google.maps.LatLng(42.765101685916811, 2.677952363121015),
		new google.maps.LatLng(42.765114390677589, 2.677991344484222)
	],
	[
		new google.maps.LatLng(42.765114390677589, 2.677991344484222),
		new google.maps.LatLng(42.765133449590778, 2.678049815327875),
		new google.maps.LatLng(42.765150687307667, 2.678100974427129)
	],
	[
		new google.maps.LatLng(42.749539551300487, 2.678111684446658),
		new google.maps.LatLng(42.749280518140878, 2.67838518067428),
		new google.maps.LatLng(42.749234757042764, 2.678417153561206),
		new google.maps.LatLng(42.749213225514922, 2.678433132980529),
		new google.maps.LatLng(42.749048830031057, 2.678482841489169)
	],
	[
		new google.maps.LatLng(42.765150687307667, 2.678100974427129),
		new google.maps.LatLng(42.765185147995645, 2.678198411543465),
		new google.maps.LatLng(42.765278371997098, 2.678401694383924),
		new google.maps.LatLng(42.765354307276219, 2.678536733667303),
		new google.maps.LatLng(42.765434766645129, 2.678681511100838),
		new google.maps.LatLng(42.765649722734551, 2.679000057410609),
		new google.maps.LatLng(42.765864702856852, 2.679327148990358)
	],
	[
		new google.maps.LatLng(42.749316256102297, 2.680713991356194),
		new google.maps.LatLng(42.749303639620393, 2.680402957272104),
		new google.maps.LatLng(42.749285707820277, 2.680118792552081),
		new google.maps.LatLng(42.749275171878033, 2.679902907155573),
		new google.maps.LatLng(42.749263616739242, 2.679646768114671),
		new google.maps.LatLng(42.749201771979536, 2.67911152364626),
		new google.maps.LatLng(42.749190824897056, 2.679059123315469),
		new google.maps.LatLng(42.749126145619165, 2.678778877577957),
		new google.maps.LatLng(42.749048830031057, 2.678482841489169)
	],
	[
		new google.maps.LatLng(42.765864702856852, 2.679327148990358),
		new google.maps.LatLng(42.765895408553213, 2.679372133688734),
		new google.maps.LatLng(42.765970436471271, 2.679504740159061),
		new google.maps.LatLng(42.766044673146155, 2.679673961492099),
		new google.maps.LatLng(42.766118113368236, 2.679877359013257),
		new google.maps.LatLng(42.766183446299969, 2.680075918817642),
		new google.maps.LatLng(42.766217937907925, 2.680184342999213)
	],
	[
		new google.maps.LatLng(42.766217937907925, 2.680184342999213),
		new google.maps.LatLng(42.766261498340725, 2.680318344073652),
		new google.maps.LatLng(42.766404025061163, 2.680773980835221),
		new google.maps.LatLng(42.766573782491065, 2.681316117045005),
		new google.maps.LatLng(42.766644601224037, 2.681546379808363)
	],
	[
		new google.maps.LatLng(42.749456609898196, 2.682255325381338),
		new google.maps.LatLng(42.749343797583364, 2.682114418705204),
		new google.maps.LatLng(42.749243458052028, 2.681934404919342),
		new google.maps.LatLng(42.749195195252312, 2.681729707022658),
		new google.maps.LatLng(42.749191210787913, 2.681599187062461),
		new google.maps.LatLng(42.749226432760487, 2.681348891729987),
		new google.maps.LatLng(42.749269910005637, 2.681153451323914),
		new google.maps.LatLng(42.749311609605321, 2.680965340400381),
		new google.maps.LatLng(42.749320186741031, 2.680826212138733)
	],
	[
		new google.maps.LatLng(42.766644601224037, 2.681546379808363),
		new google.maps.LatLng(42.766734484176062, 2.681837559095907),
		new google.maps.LatLng(42.766747169681182, 2.681870440363578)
	],
	[
		new google.maps.LatLng(42.766747169681182, 2.681870440363578),
		new google.maps.LatLng(42.766763488409715, 2.681915504559294),
		new google.maps.LatLng(42.766775275444246, 2.681948390474945),
		new google.maps.LatLng(42.76677798370028, 2.681952037279884)
	],
	[
		new google.maps.LatLng(42.76677798370028, 2.681952037279884),
		new google.maps.LatLng(42.766672902080629, 2.681992884189224),
		new google.maps.LatLng(42.766411611476734, 2.682116349305095),
		new google.maps.LatLng(42.766313712569129, 2.682153495672799),
		new google.maps.LatLng(42.766086405535589, 2.682214535063412),
		new google.maps.LatLng(42.766008234022472, 2.682233267880306),
		new google.maps.LatLng(42.765833906731459, 2.682270830574836),
		new google.maps.LatLng(42.765539228659627, 2.682354204362428),
		new google.maps.LatLng(42.765406263209208, 2.682391540758105),
		new google.maps.LatLng(42.765342477622113, 2.682410194446222),
		new google.maps.LatLng(42.765312866836396, 2.682431101780081),
		new google.maps.LatLng(42.765293208449172, 2.682472701217614),
		new google.maps.LatLng(42.7652907176033, 2.682542274576175),
		new google.maps.LatLng(42.76529895053595, 2.682589823031652),
		new google.maps.LatLng(42.765484049305805, 2.683153837385829),
		new google.maps.LatLng(42.765630908403814, 2.683558196277423),
		new google.maps.LatLng(42.765640925163986, 2.683600854730271),
		new google.maps.LatLng(42.765641021994348, 2.68363380378318),
		new google.maps.LatLng(42.765634843909027, 2.68367288802965),
		new google.maps.LatLng(42.765605279605936, 2.683709660293513),
		new google.maps.LatLng(42.765475115309911, 2.683782367762624),
		new google.maps.LatLng(42.764952631010061, 2.684063446342816),
		new google.maps.LatLng(42.764925729008475, 2.684087999538793),
		new google.maps.LatLng(42.764915964420972, 2.684130764643839),
		new google.maps.LatLng(42.764915154987264, 2.684161276713571),
		new google.maps.LatLng(42.764959492977248, 2.684561308471051),
		new google.maps.LatLng(42.765013616497754, 2.684925898109063),
		new google.maps.LatLng(42.765027397601592, 2.685025892566151),
		new google.maps.LatLng(42.765042912142839, 2.685103909654232),
		new google.maps.LatLng(42.765043049210398, 2.685150282486615),
		new google.maps.LatLng(42.76503554447055, 2.685350459668684),
		new google.maps.LatLng(42.765022257228033, 2.685418870534833),
		new google.maps.LatLng(42.76500979499928, 2.685461650423932),
		new google.maps.LatLng(42.764984697224293, 2.685488633868431),
		new google.maps.LatLng(42.76494967385441, 2.685503466492365),
		new google.maps.LatLng(42.764872375776655, 2.685513647323964),
		new google.maps.LatLng(42.764583848685504, 2.685549376891307)
	],
	[
		new google.maps.LatLng(42.751192916934137, 2.682877832411212),
		new google.maps.LatLng(42.751160515226573, 2.68286702875577),
		new google.maps.LatLng(42.75107407491862, 2.682826017902339),
		new google.maps.LatLng(42.750694035677476, 2.682624341846823),
		new google.maps.LatLng(42.750064501725006, 2.682277625883975),
		new google.maps.LatLng(42.749929540460585, 2.682247861881093),
		new google.maps.LatLng(42.749832495588429, 2.682269133356924),
		new google.maps.LatLng(42.749643980909994, 2.682372643449696),
		new google.maps.LatLng(42.749618119241852, 2.682444765822869)
	],
	[
		new google.maps.LatLng(42.749560383449875, 2.682380419816278),
		new google.maps.LatLng(42.74950714936864, 2.682318490223901),
		new google.maps.LatLng(42.749456609898196, 2.682255325381338)
	],
	[
		new google.maps.LatLng(42.749618119241852, 2.682444765822869),
		new google.maps.LatLng(42.749560383449875, 2.682380419816278)
	],
	[
		new google.maps.LatLng(42.751498749540417, 2.682918868079771),
		new google.maps.LatLng(42.751229817880493, 2.682889832152655),
		new google.maps.LatLng(42.751192916934137, 2.682877832411212)
	],
	[
		new google.maps.LatLng(42.752911787343614, 2.683077101131836),
		new google.maps.LatLng(42.752454840560723, 2.683017365303717),
		new google.maps.LatLng(42.751576104490489, 2.682928206595817),
		new google.maps.LatLng(42.751498749540417, 2.682918868079771)
	],
	[
		new google.maps.LatLng(42.753596306374604, 2.683166100944751),
		new google.maps.LatLng(42.753469502369278, 2.683158249941076),
		new google.maps.LatLng(42.752911787343614, 2.683077101131836)
	],
	[
		new google.maps.LatLng(42.755851353913421, 2.683763897690352),
		new google.maps.LatLng(42.755810752117213, 2.683716532702888),
		new google.maps.LatLng(42.755729660633115, 2.683659627111207),
		new google.maps.LatLng(42.755337205567791, 2.683516563524669),
		new google.maps.LatLng(42.754756701347333, 2.683330600804018),
		new google.maps.LatLng(42.75474140495389, 2.683327023923634),
		new google.maps.LatLng(42.754679317535881, 2.683311499402709),
		new google.maps.LatLng(42.754517374766564, 2.683279437923787),
		new google.maps.LatLng(42.754216928993053, 2.68323592889086),
		new google.maps.LatLng(42.753651164215256, 2.683169461822181),
		new google.maps.LatLng(42.753596306374604, 2.683166100944751)
	],
	[
		new google.maps.LatLng(42.755906374826473, 2.683822166885921),
		new google.maps.LatLng(42.755851353913421, 2.683763897690352)
	],
	[
		new google.maps.LatLng(42.755939750437378, 2.683858589897789),
		new google.maps.LatLng(42.755921703458824, 2.683836725249357),
		new google.maps.LatLng(42.755906374826473, 2.683822166885921)
	],
	[
		new google.maps.LatLng(42.756539002884281, 2.684609396161211),
		new google.maps.LatLng(42.756312505882562, 2.684334868406228),
		new google.maps.LatLng(42.756265578471073, 2.684276554654438),
		new google.maps.LatLng(42.755965020166563, 2.683890176265675),
		new google.maps.LatLng(42.755939750437378, 2.683858589897789)
	],
	[
		new google.maps.LatLng(42.757146739844998, 2.685189348845604),
		new google.maps.LatLng(42.756933083763421, 2.685000157006182),
		new google.maps.LatLng(42.756539002884281, 2.684609396161211)
	],
	[
		new google.maps.LatLng(42.75915794012473, 2.686957549145114),
		new google.maps.LatLng(42.758911375538077, 2.68658304929124),
		new google.maps.LatLng(42.758815734380747, 2.686470084101739),
		new google.maps.LatLng(42.758685932687854, 2.686359744306866),
		new google.maps.LatLng(42.758527340348394, 2.686243459463952),
		new google.maps.LatLng(42.758439937912335, 2.686180480091651),
		new google.maps.LatLng(42.758348035340951, 2.686116305676475),
		new google.maps.LatLng(42.758047898629691, 2.685871444178444),
		new google.maps.LatLng(42.757718042742496, 2.685610883317097),
		new google.maps.LatLng(42.757146739844998, 2.685189348845604)
	],
	[
		new google.maps.LatLng(42.765393632915256, 2.688504352851669),
		new google.maps.LatLng(42.765326943199881, 2.688452234845559),
		new google.maps.LatLng(42.765271765609967, 2.688339037893233),
		new google.maps.LatLng(42.765228777953965, 2.688089097545279),
		new google.maps.LatLng(42.765181688093378, 2.687974637265427),
		new google.maps.LatLng(42.765048866022504, 2.687753246838023),
		new google.maps.LatLng(42.764977185673878, 2.687531529162088),
		new google.maps.LatLng(42.764761118017823, 2.68713119759969),
		new google.maps.LatLng(42.764721620706013, 2.686845850993718),
		new google.maps.LatLng(42.764673979779822, 2.686543463611766),
		new google.maps.LatLng(42.764652207944415, 2.686477683160749),
		new google.maps.LatLng(42.7646322515469, 2.686417994140471),
		new google.maps.LatLng(42.764583848685504, 2.685549376891307)
	],
	[
		new google.maps.LatLng(42.75915794012473, 2.686957549145114),
		new google.maps.LatLng(42.759194038019949, 2.68700250303226),
		new google.maps.LatLng(42.759200124077452, 2.687011789094669),
		new google.maps.LatLng(42.75930241981203, 2.687167870953114)
	],
	[
		new google.maps.LatLng(42.75930241981203, 2.687167870953114),
		new google.maps.LatLng(42.759338549553696, 2.687223806969187),
		new google.maps.LatLng(42.759473213367514, 2.687459807698324),
		new google.maps.LatLng(42.759677482816095, 2.687823559028417)
	],
	[
		new google.maps.LatLng(42.759677482816095, 2.687823559028417),
		new google.maps.LatLng(42.759869323895451, 2.688242291024382),
		new google.maps.LatLng(42.760000778290895, 2.688612539314208),
		new google.maps.LatLng(42.760073656062723, 2.688937953736097),
		new google.maps.LatLng(42.7601668593989, 2.689451177623638)
	],
	[
		new google.maps.LatLng(42.766427537047889, 2.690630810551605),
		new google.maps.LatLng(42.766404861068231, 2.690251395316113),
		new google.maps.LatLng(42.766386740303425, 2.690203896940665),
		new google.maps.LatLng(42.766372255190255, 2.690169803759345),
		new google.maps.LatLng(42.765818489827417, 2.689279448375395),
		new google.maps.LatLng(42.765783125956425, 2.68917712738791),
		new google.maps.LatLng(42.765669783020869, 2.688850676453202),
		new google.maps.LatLng(42.765562224377497, 2.688658435621829),
		new google.maps.LatLng(42.765403549080034, 2.688512842403735),
		new google.maps.LatLng(42.765393632915256, 2.688504352851669)
	],
	[
		new google.maps.LatLng(42.7601668593989, 2.689451177623638),
		new google.maps.LatLng(42.760261926990175, 2.689677635333613),
		new google.maps.LatLng(42.760333330491989, 2.689805380690162)
	],
	[
		new google.maps.LatLng(42.760333330491989, 2.689805380690162),
		new google.maps.LatLng(42.760414687315468, 2.689955037324753),
		new google.maps.LatLng(42.760765478538907, 2.690307041858389)
	],
	[
		new google.maps.LatLng(42.760765478538907, 2.690307041858389),
		new google.maps.LatLng(42.761259598514393, 2.690785195591174),
		new google.maps.LatLng(42.761748954146526, 2.691170643497781),
		new google.maps.LatLng(42.761839898018053, 2.691215311022414),
		new google.maps.LatLng(42.76220728062178, 2.691397623677065),
		new google.maps.LatLng(42.762265767994691, 2.69141195680088),
		new google.maps.LatLng(42.762752557420747, 2.691531404790987),
		new google.maps.LatLng(42.762858730943059, 2.691556468568954),
		new google.maps.LatLng(42.763171855375951, 2.691631687300249),
		new google.maps.LatLng(42.763425717562527, 2.691735288750383),
		new google.maps.LatLng(42.763475233899165, 2.691756991862881),
		new google.maps.LatLng(42.76392358867168, 2.691955969734399),
		new google.maps.LatLng(42.764226951832072, 2.692076396317286)
	],
	[
		new google.maps.LatLng(42.766427537047889, 2.690630810551605),
		new google.maps.LatLng(42.766857538920334, 2.691324141536681),
		new google.maps.LatLng(42.766960520076502, 2.691489568051109),
		new google.maps.LatLng(42.767215263521024, 2.691899488259414)
	],
	[
		new google.maps.LatLng(42.767215263521024, 2.691899488259414),
		new google.maps.LatLng(42.767264944673414, 2.691978550658475),
		new google.maps.LatLng(42.767305581949216, 2.692039354425438)
	],
	[
		new google.maps.LatLng(42.767305581949216, 2.692039354425438),
		new google.maps.LatLng(42.76743653737654, 2.692240026248792),
		new google.maps.LatLng(42.767581928101777, 2.692457709140977),
		new google.maps.LatLng(42.767627046896486, 2.692513608614426),
		new google.maps.LatLng(42.767692020415659, 2.69259503252312),
		new google.maps.LatLng(42.767899570034309, 2.692853880856166),
		new google.maps.LatLng(42.76807644030837, 2.693075061732618),
		new google.maps.LatLng(42.768294785771118, 2.693336298698674),
		new google.maps.LatLng(42.768421107028544, 2.693489405127933)
	],
	[
		new google.maps.LatLng(42.764226951832072, 2.692076396317286),
		new google.maps.LatLng(42.764252156342891, 2.692086024717415),
		new google.maps.LatLng(42.764306206500038, 2.692121128764968),
		new google.maps.LatLng(42.764852128685149, 2.69247946077963),
		new google.maps.LatLng(42.765129388349756, 2.69259026744667),
		new google.maps.LatLng(42.765709966580559, 2.692805642748533)
	],
	[
		new google.maps.LatLng(42.765709966580559, 2.692805642748533),
		new google.maps.LatLng(42.765843222142244, 2.692868397894708),
		new google.maps.LatLng(42.765878334951339, 2.692884078408748),
		new google.maps.LatLng(42.766014438814807, 2.692999293500694),
		new google.maps.LatLng(42.766161549164906, 2.693190115564667),
		new google.maps.LatLng(42.766365252684892, 2.693362333944033),
		new google.maps.LatLng(42.766519119204695, 2.693400574805374),
		new google.maps.LatLng(42.766661146784003, 2.693386402652788),
		new google.maps.LatLng(42.76673482846941, 2.693368929065297),
		new google.maps.LatLng(42.766825583415034, 2.693347704020609),
		new google.maps.LatLng(42.766875032567292, 2.693346222503663),
		new google.maps.LatLng(42.766985628063416, 2.693345640369435),
		new google.maps.LatLng(42.767068430956833, 2.693373272161839),
		new google.maps.LatLng(42.767165058517968, 2.693519209726907),
		new google.maps.LatLng(42.767268342950523, 2.693792033771816),
		new google.maps.LatLng(42.767361085007018, 2.6941515604793),
		new google.maps.LatLng(42.767435300640038, 2.694636888119523),
		new google.maps.LatLng(42.767525984404273, 2.695222201953433),
		new google.maps.LatLng(42.767535159757159, 2.695286834746727),
		new google.maps.LatLng(42.767689194841196, 2.695700964426251),
		new google.maps.LatLng(42.767748874871025, 2.69581903041929)
	],
	[
		new google.maps.LatLng(42.768421107028544, 2.693489405127933),
		new google.maps.LatLng(42.768471634521305, 2.693550159607182),
		new google.maps.LatLng(42.76877750069108, 2.693917116576865),
		new google.maps.LatLng(42.76935231821119, 2.694635369086971)
	],
	[
		new google.maps.LatLng(42.76935231821119, 2.694635369086971),
		new google.maps.LatLng(42.76944255362104, 2.694747174487931),
		new google.maps.LatLng(42.769697885993303, 2.695052166653596)
	],
	[
		new google.maps.LatLng(42.769697885993303, 2.695052166653596),
		new google.maps.LatLng(42.769848554921595, 2.695230781560816)
	],
	[
		new google.maps.LatLng(42.769848554921595, 2.695230781560816),
		new google.maps.LatLng(42.769982989668279, 2.695392397061288),
		new google.maps.LatLng(42.770278952326443, 2.695756984203291),
		new google.maps.LatLng(42.770410693331492, 2.695919835919748)
	],
	[
		new google.maps.LatLng(42.767748874871025, 2.69581903041929),
		new google.maps.LatLng(42.767786850560221, 2.695893276363342),
		new google.maps.LatLng(42.76802335607708, 2.696219108905904),
		new google.maps.LatLng(42.768093870000008, 2.696352986741002),
		new google.maps.LatLng(42.768141777154362, 2.696441825468767),
		new google.maps.LatLng(42.768170715831168, 2.696500255139126),
		new google.maps.LatLng(42.768342511957918, 2.696837413399068),
		new google.maps.LatLng(42.768477981606686, 2.697047838375296),
		new google.maps.LatLng(42.768591836815155, 2.697246174162602),
		new google.maps.LatLng(42.76877947094264, 2.697461212756667),
		new google.maps.LatLng(42.768921881764953, 2.697582514698013),
		new google.maps.LatLng(42.769028154045365, 2.697642983577925),
		new google.maps.LatLng(42.769476509796569, 2.697845686425492),
		new google.maps.LatLng(42.76961721185134, 2.697998731117023)
	],
	[
		new google.maps.LatLng(42.770410693331492, 2.695919835919748),
		new google.maps.LatLng(42.770812224826059, 2.696414466688215),
		new google.maps.LatLng(42.770948484358115, 2.696585841710905)
	],
	[
		new google.maps.LatLng(42.770948484358115, 2.696585841710905),
		new google.maps.LatLng(42.771233643065941, 2.696946834590472)
	],
	[
		new google.maps.LatLng(42.777377170427172, 2.696768354389416),
		new google.maps.LatLng(42.777280665422495, 2.696982463255759),
		new google.maps.LatLng(42.776540525996971, 2.697895655312084),
		new google.maps.LatLng(42.77641696825517, 2.698083045289425),
		new google.maps.LatLng(42.776298249629868, 2.698392468716448),
		new google.maps.LatLng(42.776112294387488, 2.699094043895213),
		new google.maps.LatLng(42.775988233223011, 2.699744030033405),
		new google.maps.LatLng(42.775926513174632, 2.700502323809781),
		new google.maps.LatLng(42.775913745863015, 2.700759931179111),
		new google.maps.LatLng(42.775845232427308, 2.701019044463533),
		new google.maps.LatLng(42.775570873051869, 2.700978954886235)
	],
	[
		new google.maps.LatLng(42.771233643065941, 2.696946834590472),
		new google.maps.LatLng(42.771445699819395, 2.697213014662772),
		new google.maps.LatLng(42.771568294624011, 2.697322220526841)
	],
	[
		new google.maps.LatLng(42.771614293267739, 2.697372020343801),
		new google.maps.LatLng(42.771568294624011, 2.697322220526841)
	],
	[
		new google.maps.LatLng(42.771690945634973, 2.697450953560085),
		new google.maps.LatLng(42.771614293267739, 2.697372020343801)
	],
	[
		new google.maps.LatLng(42.771690945634973, 2.697450953560085),
		new google.maps.LatLng(42.771754981176763, 2.69752018755892),
		new google.maps.LatLng(42.771827933542141, 2.697562525376916)
	],
	[
		new google.maps.LatLng(42.771827933542141, 2.697562525376916),
		new google.maps.LatLng(42.772037808569046, 2.697693246775891),
		new google.maps.LatLng(42.772146695756021, 2.697724414165066)
	],
	[
		new google.maps.LatLng(42.772146695756021, 2.697724414165066),
		new google.maps.LatLng(42.772354569372396, 2.69778313901302),
		new google.maps.LatLng(42.772462689077443, 2.697860688308224),
		new google.maps.LatLng(42.772671805023506, 2.69804145727),
		new google.maps.LatLng(42.772720497260579, 2.698090024604315)
	],
	[
		new google.maps.LatLng(42.769988468833908, 2.697963851695849),
		new google.maps.LatLng(42.769811422224933, 2.697995282209879),
		new google.maps.LatLng(42.76961721185134, 2.697998731117023)
	],
	[
		new google.maps.LatLng(42.770206086578796, 2.698289803114764),
		new google.maps.LatLng(42.769988468833908, 2.697963851695849)
	],
	[
		new google.maps.LatLng(42.772720497260579, 2.698090024604315),
		new google.maps.LatLng(42.772784525947941, 2.69815682013907)
	],
	[
		new google.maps.LatLng(42.772784525947941, 2.69815682013907),
		new google.maps.LatLng(42.772749727651103, 2.698252200933428),
		new google.maps.LatLng(42.772695463108818, 2.698459968408232)
	],
	[
		new google.maps.LatLng(42.770206086578796, 2.698289803114764),
		new google.maps.LatLng(42.770480356150401, 2.698617904069667),
		new google.maps.LatLng(42.770973805080843, 2.699188967957723),
		new google.maps.LatLng(42.771042367084689, 2.699269165086555),
		new google.maps.LatLng(42.771101496991868, 2.699512953304507)
	],
	[
		new google.maps.LatLng(42.772695463108818, 2.698459968408232),
		new google.maps.LatLng(42.772675887285722, 2.698533299793699)
	],
	[
		new google.maps.LatLng(42.772675887285722, 2.698533299793699),
		new google.maps.LatLng(42.772625177324606, 2.698726401546448),
		new google.maps.LatLng(42.772507019222211, 2.69923596265242),
		new google.maps.LatLng(42.77249899577496, 2.699260414390255)
	],
	[
		new google.maps.LatLng(42.77249899577496, 2.699260414390255),
		new google.maps.LatLng(42.772463333499019, 2.699369222997869)
	],
	[
		new google.maps.LatLng(42.772463333499019, 2.699369222997869),
		new google.maps.LatLng(42.772443716687839, 2.699427908581355)
	],
	[
		new google.maps.LatLng(42.772443716687839, 2.699427908581355),
		new google.maps.LatLng(42.772419645303202, 2.699501262408549),
		new google.maps.LatLng(42.772358916542281, 2.699649256614312)
	],
	[
		new google.maps.LatLng(42.772847435375759, 2.699745595652231),
		new google.maps.LatLng(42.772782651365333, 2.699730063213467),
		new google.maps.LatLng(42.772603448844578, 2.699634568227393),
		new google.maps.LatLng(42.772443716687839, 2.699427908581355)
	],
	[
		new google.maps.LatLng(42.771101496991868, 2.699512953304507),
		new google.maps.LatLng(42.771135155622304, 2.699651913089815),
		new google.maps.LatLng(42.771194519817215, 2.699979914423781)
	],
	[
		new google.maps.LatLng(42.772358916542281, 2.699649256614312),
		new google.maps.LatLng(42.772330337734992, 2.699718972298205),
		new google.maps.LatLng(42.772319695454186, 2.6997715091082)
	],
	[
		new google.maps.LatLng(42.773259317157304, 2.699767879744901),
		new google.maps.LatLng(42.773008486205185, 2.699781378766524),
		new google.maps.LatLng(42.772847435375759, 2.699745595652231)
	],
	[
		new google.maps.LatLng(42.773567741433901, 2.699771170145317),
		new google.maps.LatLng(42.773511966076711, 2.699761694027425),
		new google.maps.LatLng(42.773259317157304, 2.699767879744901)
	],
	[
		new google.maps.LatLng(42.772319695454186, 2.6997715091082),
		new google.maps.LatLng(42.772310860579907, 2.699827696957466),
		new google.maps.LatLng(42.77232107656463, 2.69994359112675),
		new google.maps.LatLng(42.772331076654787, 2.699982595846146)
	],
	[
		new google.maps.LatLng(42.774012020895285, 2.699803051611593),
		new google.maps.LatLng(42.773812356243695, 2.699785774293404),
		new google.maps.LatLng(42.773567741433901, 2.699771170145317)
	],
	[
		new google.maps.LatLng(42.774766360965216, 2.700422859427197),
		new google.maps.LatLng(42.774716811565632, 2.700388938779759),
		new google.maps.LatLng(42.774344656783619, 2.700104029341808),
		new google.maps.LatLng(42.774067115104877, 2.699890645850652),
		new google.maps.LatLng(42.774012020895285, 2.699803051611593)
	],
	[
		new google.maps.LatLng(42.771194519817215, 2.699979914423781),
		new google.maps.LatLng(42.771227299588801, 2.700126202112006)
	],
	[
		new google.maps.LatLng(42.77171855231488, 2.700235954429033),
		new google.maps.LatLng(42.77179940783914, 2.700211127129216),
		new google.maps.LatLng(42.772045588723493, 2.700142732304065),
		new google.maps.LatLng(42.772152448001819, 2.700092140505085),
		new google.maps.LatLng(42.772273640053548, 2.700021948207782),
		new google.maps.LatLng(42.772331076654787, 2.699982595846146)
	],
	[
		new google.maps.LatLng(42.771227299588801, 2.700126202112006),
		new google.maps.LatLng(42.771249135421051, 2.700217624547417),
		new google.maps.LatLng(42.771289826422446, 2.700299186196611),
		new google.maps.LatLng(42.77138281472488, 2.700432959611386)
	],
	[
		new google.maps.LatLng(42.771517341308893, 2.700629985291276),
		new google.maps.LatLng(42.771594306795123, 2.700500218062034),
		new google.maps.LatLng(42.77171855231488, 2.700235954429033)
	],
	[
		new google.maps.LatLng(42.77138281472488, 2.700432959611386),
		new google.maps.LatLng(42.771517341308893, 2.700629985291276)
	],
	[
		new google.maps.LatLng(42.775509659212943, 2.700953637894287),
		new google.maps.LatLng(42.775097915251415, 2.700659159851871),
		new google.maps.LatLng(42.774915924470434, 2.700530717636059),
		new google.maps.LatLng(42.774766360965216, 2.700422859427197)
	],
	[
		new google.maps.LatLng(42.775509659212943, 2.700953637894287),
		new google.maps.LatLng(42.775570873051869, 2.700978954886235)
	]
];

var circuit_8 = [
	[
		new google.maps.LatLng(42.777667434394338, 2.836196595881131),
		new google.maps.LatLng(42.777472772619959, 2.836496190572721),
		new google.maps.LatLng(42.777372294580132, 2.83664660716516),
		new google.maps.LatLng(42.777187587361368, 2.836988891411709)
	],
	[
		new google.maps.LatLng(42.777667434394338, 2.836196595881131),
		new google.maps.LatLng(42.777817928955123, 2.836414660420013),
		new google.maps.LatLng(42.777821530714782, 2.836418312254479)
	],
	[
		new google.maps.LatLng(42.777821530714782, 2.836418312254479),
		new google.maps.LatLng(42.777918782929646, 2.83651080518246),
		new google.maps.LatLng(42.778285936242405, 2.836702630978914)
	],
	[
		new google.maps.LatLng(42.778285936242405, 2.836702630978914),
		new google.maps.LatLng(42.778339840990149, 2.836673184211519)
	],
	[
		new google.maps.LatLng(42.778339840990149, 2.836673184211519),
		new google.maps.LatLng(42.778360613522558, 2.836732936115908),
		new google.maps.LatLng(42.778427273653051, 2.836813309628977),
		new google.maps.LatLng(42.778463266773251, 2.836830298367036)
	],
	[
		new google.maps.LatLng(42.778463266773251, 2.836830298367036),
		new google.maps.LatLng(42.778500153100815, 2.836843620930641),
		new google.maps.LatLng(42.778666615249747, 2.836920053237076)
	],
	[
		new google.maps.LatLng(42.778666615249747, 2.836920053237076),
		new google.maps.LatLng(42.778746699051609, 2.836957668619691),
		new google.maps.LatLng(42.778880770673531, 2.837020765708993)
	],
	[
		new google.maps.LatLng(42.777187587361368, 2.836988891411709),
		new google.maps.LatLng(42.777071020862181, 2.837202821748633)
	],
	[
		new google.maps.LatLng(42.779220027681113, 2.837198027584958),
		new google.maps.LatLng(42.779168732658334, 2.837170096825015),
		new google.maps.LatLng(42.778880770673531, 2.837020765708993)
	],
	[
		new google.maps.LatLng(42.777071020862181, 2.837202821748633),
		new google.maps.LatLng(42.776933726257369, 2.837386293250322),
		new google.maps.LatLng(42.776750648344674, 2.837618716394717),
		new google.maps.LatLng(42.776681544119413, 2.837705570995517)
	],
	[
		new google.maps.LatLng(42.780287512078473, 2.83849870134425),
		new google.maps.LatLng(42.780225362842394, 2.83842807663168),
		new google.maps.LatLng(42.780024323949348, 2.838080749426471),
		new google.maps.LatLng(42.779873830872702, 2.837861450943991),
		new google.maps.LatLng(42.77946929484915, 2.837327938781371),
		new google.maps.LatLng(42.779220027681113, 2.837198027584958)
	],
	[
		new google.maps.LatLng(42.776681544119413, 2.837705570995517),
		new google.maps.LatLng(42.776585510770666, 2.83782301440549),
		new google.maps.LatLng(42.776525399841319, 2.837911063380849)
	],
	[
		new google.maps.LatLng(42.776525399841319, 2.837911063380849),
		new google.maps.LatLng(42.77621960843652, 2.838457511797696)
	],
	[
		new google.maps.LatLng(42.77621960843652, 2.838457511797696),
		new google.maps.LatLng(42.776041153112395, 2.838775355154433)
	],
	[
		new google.maps.LatLng(42.780511560591847, 2.838601835490733),
		new google.maps.LatLng(42.780450373126357, 2.838572710323534),
		new google.maps.LatLng(42.780301922374825, 2.838514530651309),
		new google.maps.LatLng(42.780287512078473, 2.83849870134425)
	],
	[
		new google.maps.LatLng(42.781167393789005, 2.838825840899672),
		new google.maps.LatLng(42.780911009737551, 2.83874598782266),
		new google.maps.LatLng(42.780657321049169, 2.838664906243141),
		new google.maps.LatLng(42.780511560591847, 2.838601835490733)
	],
	[
		new google.maps.LatLng(42.776041153112395, 2.838775355154433),
		new google.maps.LatLng(42.775809790047674, 2.839189766737535),
		new google.maps.LatLng(42.775764057208818, 2.839272891443749),
		new google.maps.LatLng(42.775504733556659, 2.83963001062004),
		new google.maps.LatLng(42.77547153183383, 2.839675263055156),
		new google.maps.LatLng(42.775370108991119, 2.839797598301088)
	],
	[
		new google.maps.LatLng(42.781634982732299, 2.838839193595844),
		new google.maps.LatLng(42.781568442502603, 2.838838156954215),
		new google.maps.LatLng(42.781502843996769, 2.838865194400556),
		new google.maps.LatLng(42.78143991669441, 2.838875134254464),
		new google.maps.LatLng(42.781303218955479, 2.838859643783287),
		new google.maps.LatLng(42.781167393789005, 2.838825840899672)
	],
	[
		new google.maps.LatLng(42.781634982732299, 2.838839193595844),
		new google.maps.LatLng(42.781652081508255, 2.838848911652927),
		new google.maps.LatLng(42.781865359193432, 2.838964286759296),
		new google.maps.LatLng(42.782210935256067, 2.839159861922606),
		new google.maps.LatLng(42.782277529818195, 2.839197519853156)
	],
	[
		new google.maps.LatLng(42.782506107166981, 2.839322620320026),
		new google.maps.LatLng(42.782277529818195, 2.839197519853156)
	],
	[
		new google.maps.LatLng(42.782949481859639, 2.839377547682993),
		new google.maps.LatLng(42.782735430327747, 2.839345180256029),
		new google.maps.LatLng(42.782506107166981, 2.839322620320026)
	],
	[
		new google.maps.LatLng(42.784129615074782, 2.839656279776079),
		new google.maps.LatLng(42.784116081897487, 2.839625798820316),
		new google.maps.LatLng(42.784013503389779, 2.839577252317478),
		new google.maps.LatLng(42.783485538864511, 2.839477388034475),
		new google.maps.LatLng(42.783336230599318, 2.839447281712556),
		new google.maps.LatLng(42.783087087450149, 2.839399140945874),
		new google.maps.LatLng(42.782949481859639, 2.839377547682993)
	],
	[
		new google.maps.LatLng(42.784154875840045, 2.83971236369104),
		new google.maps.LatLng(42.784129615074782, 2.839656279776079)
	],
	[
		new google.maps.LatLng(42.78486516503915, 2.840275614832823),
		new google.maps.LatLng(42.784662600185612, 2.84010770776188),
		new google.maps.LatLng(42.784489744329889, 2.839964134975167),
		new google.maps.LatLng(42.784215204074748, 2.839768351958763),
		new google.maps.LatLng(42.784154875840045, 2.83971236369104)
	],
	[
		new google.maps.LatLng(42.775370108991119, 2.839797598301088),
		new google.maps.LatLng(42.775263295941912, 2.83992360829144),
		new google.maps.LatLng(42.775143008958111, 2.840058200756427)
	],
	[
		new google.maps.LatLng(42.775143008958111, 2.840058200756427),
		new google.maps.LatLng(42.774786630854301, 2.840454636215576),
		new google.maps.LatLng(42.77459454379094, 2.840679741845073),
		new google.maps.LatLng(42.774445491455047, 2.840820511776882),
		new google.maps.LatLng(42.774146383637159, 2.841032480796579),
		new google.maps.LatLng(42.773940656969629, 2.84115509600727)
	],
	[
		new google.maps.LatLng(42.78495700166858, 2.840357154205496),
		new google.maps.LatLng(42.78486516503915, 2.840275614832823)
	],
	[
		new google.maps.LatLng(42.787502160412366, 2.843126287049829),
		new google.maps.LatLng(42.787303101810878, 2.842893650168286),
		new google.maps.LatLng(42.787248161024962, 2.842831537155318),
		new google.maps.LatLng(42.787105024035398, 2.842717169221939),
		new google.maps.LatLng(42.786987153873369, 2.842663772419782),
		new google.maps.LatLng(42.786907974744729, 2.842628583200932),
		new google.maps.LatLng(42.786782910632404, 2.842575207484576),
		new google.maps.LatLng(42.786658742471189, 2.842519386414951),
		new google.maps.LatLng(42.786416622677123, 2.84235523589121),
		new google.maps.LatLng(42.786379701471418, 2.842317491540073),
		new google.maps.LatLng(42.786286946532122, 2.842222522109846),
		new google.maps.LatLng(42.786113963533118, 2.841991043469036),
		new google.maps.LatLng(42.785990501627552, 2.841804600111862),
		new google.maps.LatLng(42.785861626356748, 2.84160596484525),
		new google.maps.LatLng(42.785836395459782, 2.84156940991989),
		new google.maps.LatLng(42.785742582175125, 2.841367017817982),
		new google.maps.LatLng(42.785683920409809, 2.841221905424439),
		new google.maps.LatLng(42.785645113114882, 2.841125570621476),
		new google.maps.LatLng(42.785572940449001, 2.840964626363025),
		new google.maps.LatLng(42.785518904766178, 2.840907398512837),
		new google.maps.LatLng(42.785285647779403, 2.840657779959283),
		new google.maps.LatLng(42.785223505930738, 2.84059080792863),
		new google.maps.LatLng(42.78495700166858, 2.840357154205496)
	],
	[
		new google.maps.LatLng(42.773940656969629, 2.84115509600727),
		new google.maps.LatLng(42.773736682792702, 2.841247191337721),
		new google.maps.LatLng(42.773343108360365, 2.841422799177556),
		new google.maps.LatLng(42.773294580495474, 2.841441238726865),
		new google.maps.LatLng(42.772944112093064, 2.841580110885362)
	],
	[
		new google.maps.LatLng(42.772863369475466, 2.841703600988324),
		new google.maps.LatLng(42.772944112093064, 2.841580110885362)
	],
	[
		new google.maps.LatLng(42.772196323432155, 2.84301744121399),
		new google.maps.LatLng(42.772338813656624, 2.842692405321031),
		new google.maps.LatLng(42.772640924661317, 2.84207523841687),
		new google.maps.LatLng(42.772686643436813, 2.841981135642783),
		new google.maps.LatLng(42.772728807246118, 2.841915114367425),
		new google.maps.LatLng(42.772863369475466, 2.841703600988324)
	],
	[
		new google.maps.LatLng(42.772019091545005, 2.844803486631709),
		new google.maps.LatLng(42.772022042177085, 2.844358002831341),
		new google.maps.LatLng(42.772027770461143, 2.843968652786861),
		new google.maps.LatLng(42.772031898741339, 2.843716000783588),
		new google.maps.LatLng(42.772040793818654, 2.843650071543897),
		new google.maps.LatLng(42.772067490672661, 2.843459604487365),
		new google.maps.LatLng(42.772148832079417, 2.843129853284738),
		new google.maps.LatLng(42.772196323432155, 2.84301744121399)
	],
	[
		new google.maps.LatLng(42.787502160412366, 2.843126287049829),
		new google.maps.LatLng(42.787305365649281, 2.843827558808673),
		new google.maps.LatLng(42.787284789077795, 2.843899641430192),
		new google.maps.LatLng(42.787036086795332, 2.844773180899401)
	],
	[
		new google.maps.LatLng(42.772006936130062, 2.845726204143242),
		new google.maps.LatLng(42.772015740297824, 2.845595589443863),
		new google.maps.LatLng(42.772019091545005, 2.844803486631709)
	],
	[
		new google.maps.LatLng(42.787036086795332, 2.844773180899401),
		new google.maps.LatLng(42.787620172208854, 2.845132982049077),
		new google.maps.LatLng(42.787851459330071, 2.845270317795045)
	],
	[
		new google.maps.LatLng(42.787851459330071, 2.845270317795045),
		new google.maps.LatLng(42.788133147404359, 2.845440483879374),
		new google.maps.LatLng(42.788201542758543, 2.845480588576315),
		new google.maps.LatLng(42.788267240046288, 2.845520701320138),
		new google.maps.LatLng(42.788610120835564, 2.845724891196225),
		new google.maps.LatLng(42.788857609331536, 2.845874396866858),
		new google.maps.LatLng(42.788876506196601, 2.845884113522277),
		new google.maps.LatLng(42.789038497874664, 2.845981352443284)
	],
	[
		new google.maps.LatLng(42.771977670087288, 2.846008213856374),
		new google.maps.LatLng(42.771980498398484, 2.845985332846507),
		new google.maps.LatLng(42.772001667871926, 2.845814093734901),
		new google.maps.LatLng(42.772006936130062, 2.845726204143242)
	],
	[
		new google.maps.LatLng(42.771910738540328, 2.846361110114947),
		new google.maps.LatLng(42.771967885826648, 2.846082688879116),
		new google.maps.LatLng(42.771977670087288, 2.846008213856374)
	],
	[
		new google.maps.LatLng(42.789038497874664, 2.845981352443284),
		new google.maps.LatLng(42.789583864219367, 2.846304654729432),
		new google.maps.LatLng(42.789631538159945, 2.846316736224499),
		new google.maps.LatLng(42.789703433830681, 2.846289687486734)
	],
	[
		new google.maps.LatLng(42.789703433830681, 2.846289687486734),
		new google.maps.LatLng(42.789783403595258, 2.846250408898822),
		new google.maps.LatLng(42.789852644296467, 2.846252668034857),
		new google.maps.LatLng(42.790122623745049, 2.84641066702796),
		new google.maps.LatLng(42.790650009574556, 2.846736467967875),
		new google.maps.LatLng(42.7907148334507, 2.846794898824989)
	],
	[
		new google.maps.LatLng(42.771731625743726, 2.848763483218788),
		new google.maps.LatLng(42.771724352847812, 2.848707360463749),
		new google.maps.LatLng(42.771714966551876, 2.848427895444117),
		new google.maps.LatLng(42.771724394477779, 2.848100782878957),
		new google.maps.LatLng(42.771726175124037, 2.84808857356773),
		new google.maps.LatLng(42.771754452847077, 2.847739442442506),
		new google.maps.LatLng(42.771804131985718, 2.847265767178913),
		new google.maps.LatLng(42.771861793532395, 2.846716398877265),
		new google.maps.LatLng(42.771887521908383, 2.846473455212335),
		new google.maps.LatLng(42.771910738540328, 2.846361110114947)
	],
	[
		new google.maps.LatLng(42.7907148334507, 2.846794898824989),
		new google.maps.LatLng(42.790739144375152, 2.846818032453466),
		new google.maps.LatLng(42.790882280472147, 2.846934858815919),
		new google.maps.LatLng(42.790991166867265, 2.846994396143352)
	],
	[
		new google.maps.LatLng(42.790991166867265, 2.846994396143352),
		new google.maps.LatLng(42.791731869184773, 2.847469818501806),
		new google.maps.LatLng(42.791903773523394, 2.847582910301053)
	],
	[
		new google.maps.LatLng(42.791903773523394, 2.847582910301053),
		new google.maps.LatLng(42.791941573474553, 2.847607230151575),
		new google.maps.LatLng(42.791982982236519, 2.847640085444722)
	],
	[
		new google.maps.LatLng(42.792003685799301, 2.847655903151738),
		new google.maps.LatLng(42.791982982236519, 2.847640085444722)
	],
	[
		new google.maps.LatLng(42.793195776192711, 2.84940725338006),
		new google.maps.LatLng(42.792992139564234, 2.849107434605443),
		new google.maps.LatLng(42.792693844006394, 2.848634491958719),
		new google.maps.LatLng(42.79262354843523, 2.848521129914677),
		new google.maps.LatLng(42.792371189241138, 2.848105456830285),
		new google.maps.LatLng(42.792189170877492, 2.847834890784853),
		new google.maps.LatLng(42.792072998528894, 2.847709441863369),
		new google.maps.LatLng(42.792003685799301, 2.847655903151738)
	],
	[
		new google.maps.LatLng(42.771412887520412, 2.85628973516863),
		new google.maps.LatLng(42.771444143453479, 2.856129775934182),
		new google.maps.LatLng(42.771455670826818, 2.856008921014994),
		new google.maps.LatLng(42.771437449362345, 2.855831997504238),
		new google.maps.LatLng(42.771422900589826, 2.855711206998703),
		new google.maps.LatLng(42.771418230149031, 2.855581848375587),
		new google.maps.LatLng(42.771439363735304, 2.855251047722105),
		new google.maps.LatLng(42.77147904608735, 2.854674887259802),
		new google.maps.LatLng(42.77150817513224, 2.85427449875057),
		new google.maps.LatLng(42.771514356408616, 2.854191491381277),
		new google.maps.LatLng(42.77153387562425, 2.853998607219141),
		new google.maps.LatLng(42.771572039693346, 2.853632369916621),
		new google.maps.LatLng(42.771583452139382, 2.853429742374464),
		new google.maps.LatLng(42.7715892718454, 2.853083112981901),
		new google.maps.LatLng(42.771570717209862, 2.852666977933585),
		new google.maps.LatLng(42.771591427943463, 2.852035940232399),
		new google.maps.LatLng(42.7716188392493, 2.851701460167729),
		new google.maps.LatLng(42.771681468563528, 2.851475512763818),
		new google.maps.LatLng(42.771773734320099, 2.851225078886679),
		new google.maps.LatLng(42.77183823515265, 2.851052826295444),
		new google.maps.LatLng(42.771900903294444, 2.850856167810656),
		new google.maps.LatLng(42.771933886672592, 2.850651042687989),
		new google.maps.LatLng(42.771937206248452, 2.850452095181661),
		new google.maps.LatLng(42.771909794773464, 2.850139722321964),
		new google.maps.LatLng(42.771890628424579, 2.849937172044221),
		new google.maps.LatLng(42.771784284051051, 2.849123387195797),
		new google.maps.LatLng(42.771770666493822, 2.849030666196759),
		new google.maps.LatLng(42.771731625743726, 2.848763483218788)
	],
	[
		new google.maps.LatLng(42.793706544654597, 2.850072563563013),
		new google.maps.LatLng(42.793659692144551, 2.850004312292091),
		new google.maps.LatLng(42.793429992590994, 2.84971310200945),
		new google.maps.LatLng(42.793195776192711, 2.84940725338006)
	],
	[
		new google.maps.LatLng(42.793706544654597, 2.850072563563013),
		new google.maps.LatLng(42.793729063522413, 2.850100587406212)
	],
	[
		new google.maps.LatLng(42.793729063522413, 2.850100587406212),
		new google.maps.LatLng(42.793809225224592, 2.850196835387409)
	],
	[
		new google.maps.LatLng(42.794283261831737, 2.850962370817307),
		new google.maps.LatLng(42.794176058902963, 2.85081857366278),
		new google.maps.LatLng(42.794111127652585, 2.850681994727585),
		new google.maps.LatLng(42.794087677404065, 2.850630775224808),
		new google.maps.LatLng(42.79402184907665, 2.850495418804939),
		new google.maps.LatLng(42.793926326403778, 2.850345488931648),
		new google.maps.LatLng(42.793809225224592, 2.850196835387409)
	],
	[
		new google.maps.LatLng(42.795667029146983, 2.852207887378787),
		new google.maps.LatLng(42.795578825404299, 2.85214706207923),
		new google.maps.LatLng(42.79477842675405, 2.851405532211023),
		new google.maps.LatLng(42.794283261831737, 2.850962370817307)
	],
	[
		new google.maps.LatLng(42.794459950251102, 2.853901976588135),
		new google.maps.LatLng(42.794476950041485, 2.853839665674839),
		new google.maps.LatLng(42.794588969284213, 2.853562226482572),
		new google.maps.LatLng(42.794693912611748, 2.853371492993929),
		new google.maps.LatLng(42.794909321157995, 2.853082802274124),
		new google.maps.LatLng(42.795050275029432, 2.852923720297582),
		new google.maps.LatLng(42.79524689180964, 2.852702227469802),
		new google.maps.LatLng(42.795544996501015, 2.852393785450411),
		new google.maps.LatLng(42.795573574527054, 2.85235025127667),
		new google.maps.LatLng(42.795667029146983, 2.852207887378787)
	],
	[
		new google.maps.LatLng(42.794459950251102, 2.853901976588135),
		new google.maps.LatLng(42.794363636937661, 2.853827741074726),
		new google.maps.LatLng(42.79423409014003, 2.853780449140884),
		new google.maps.LatLng(42.794186433564249, 2.853780569104662),
		new google.maps.LatLng(42.794100227274185, 2.853865030579712),
		new google.maps.LatLng(42.793936846404627, 2.854063234863367),
		new google.maps.LatLng(42.793902713546224, 2.854090181244812),
		new google.maps.LatLng(42.79375901293011, 2.854213856173151),
		new google.maps.LatLng(42.793537135004868, 2.854375575700228),
		new google.maps.LatLng(42.793140092542615, 2.854667151386229),
		new google.maps.LatLng(42.792932623521097, 2.854845923942267),
		new google.maps.LatLng(42.792721624271984, 2.855073541116583),
		new google.maps.LatLng(42.792665068227542, 2.855142053184859),
		new google.maps.LatLng(42.79241998987829, 2.85543690375586),
		new google.maps.LatLng(42.79214618531261, 2.85576722962099)
	],
	[
		new google.maps.LatLng(42.79214618531261, 2.85576722962099),
		new google.maps.LatLng(42.791829285782335, 2.856147714433765)
	],
	[
		new google.maps.LatLng(42.791829285782335, 2.856147714433765),
		new google.maps.LatLng(42.791614755560374, 2.856426609009987),
		new google.maps.LatLng(42.791560888169073, 2.856489007952081),
		new google.maps.LatLng(42.791442383087698, 2.856628481552416),
		new google.maps.LatLng(42.791347218492028, 2.856739817146367),
		new google.maps.LatLng(42.791151485480874, 2.856955175514139),
		new google.maps.LatLng(42.79102668220844, 2.857092220828302),
		new google.maps.LatLng(42.790771596055933, 2.857302839167977)
	],
	[
		new google.maps.LatLng(42.771324169762096, 2.856513299383626),
		new google.maps.LatLng(42.77135912565798, 2.856430222075238),
		new google.maps.LatLng(42.771412887520412, 2.85628973516863)
	],
	[
		new google.maps.LatLng(42.771234559246551, 2.856741747937457),
		new google.maps.LatLng(42.771324169762096, 2.856513299383626)
	],
	[
		new google.maps.LatLng(42.769914273444712, 2.861983124088999),
		new google.maps.LatLng(42.769951891732575, 2.86186953436162),
		new google.maps.LatLng(42.770092533521868, 2.86146157191024),
		new google.maps.LatLng(42.770112242965006, 2.861405385078362),
		new google.maps.LatLng(42.770143566104402, 2.86129180874311),
		new google.maps.LatLng(42.770153411427302, 2.861256392281482),
		new google.maps.LatLng(42.770211520954319, 2.860997519517472),
		new google.maps.LatLng(42.770298140875383, 2.860535983356598),
		new google.maps.LatLng(42.770382920674315, 2.860045160310616),
		new google.maps.LatLng(42.770391838981588, 2.859988997173465),
		new google.maps.LatLng(42.770472187607631, 2.859548222165774),
		new google.maps.LatLng(42.770484687746823, 2.859481066764474),
		new google.maps.LatLng(42.770515980072105, 2.85934552086723),
		new google.maps.LatLng(42.770633099175136, 2.85883508801416),
		new google.maps.LatLng(42.770808446931184, 2.85816218981921),
		new google.maps.LatLng(42.770874707130417, 2.857952109320371),
		new google.maps.LatLng(42.770977676175185, 2.857624774093328),
		new google.maps.LatLng(42.771043922274025, 2.857404929120488),
		new google.maps.LatLng(42.771124492296842, 2.857138670352627),
		new google.maps.LatLng(42.771191605008767, 2.856895632171387),
		new google.maps.LatLng(42.771234559246551, 2.856741747937457)
	],
	[
		new google.maps.LatLng(42.790771596055933, 2.857302839167977),
		new google.maps.LatLng(42.790719550679619, 2.857383544101031),
		new google.maps.LatLng(42.790250800353476, 2.857851064181847),
		new google.maps.LatLng(42.790123277277985, 2.857972241285294)
	],
	[
		new google.maps.LatLng(42.790123277277985, 2.857972241285294),
		new google.maps.LatLng(42.789749695330613, 2.858332085738367)
	],
	[
		new google.maps.LatLng(42.789749695330613, 2.858332085738367),
		new google.maps.LatLng(42.789312383046664, 2.858777538797175),
		new google.maps.LatLng(42.789239670539878, 2.858869278703905),
		new google.maps.LatLng(42.78901345769674, 2.859157946162457),
		new google.maps.LatLng(42.788758521114687, 2.859485747465407),
		new google.maps.LatLng(42.788719923870715, 2.859537115314225),
		new google.maps.LatLng(42.788587988121819, 2.859723000482306),
		new google.maps.LatLng(42.788579911675178, 2.859735228277159)
	],
	[
		new google.maps.LatLng(42.788579911675178, 2.859735228277159),
		new google.maps.LatLng(42.788460572213801, 2.859927185759613),
		new google.maps.LatLng(42.788125991435578, 2.860550610105125),
		new google.maps.LatLng(42.787718792617028, 2.861342674034605),
		new google.maps.LatLng(42.787457681666055, 2.8617681375915),
		new google.maps.LatLng(42.78726472818704, 2.862054263775247),
		new google.maps.LatLng(42.787223444433387, 2.862115401894926),
		new google.maps.LatLng(42.787051068600704, 2.862322124742761),
		new google.maps.LatLng(42.786974755819969, 2.862413866352724),
		new google.maps.LatLng(42.786446761718722, 2.862976676827)
	],
	[
		new google.maps.LatLng(42.769376048122275, 2.863679575547019),
		new google.maps.LatLng(42.769410883184271, 2.863496429170759),
		new google.maps.LatLng(42.769543444287265, 2.863093375871996),
		new google.maps.LatLng(42.769559565352317, 2.863043300255538),
		new google.maps.LatLng(42.769770969772559, 2.862420380774486),
		new google.maps.LatLng(42.769807697410783, 2.862312894615833),
		new google.maps.LatLng(42.769914273444712, 2.861983124088999)
	],
	[
		new google.maps.LatLng(42.786446761718722, 2.862976676827),
		new google.maps.LatLng(42.786374927238469, 2.863054975524044),
		new google.maps.LatLng(42.78609566685487, 2.863354724308477),
		new google.maps.LatLng(42.785773303947458, 2.863700960272188),
		new google.maps.LatLng(42.785554204687664, 2.863937080875192),
		new google.maps.LatLng(42.785086359756043, 2.864430141496616),
		new google.maps.LatLng(42.785047744863974, 2.86446929568206),
		new google.maps.LatLng(42.784631053363945, 2.864885320181127),
		new google.maps.LatLng(42.784420906890489, 2.865092113876759),
		new google.maps.LatLng(42.784069759031631, 2.865433513742212),
		new google.maps.LatLng(42.783977256111626, 2.865522841536023),
		new google.maps.LatLng(42.783834459910864, 2.865659893942969),
		new google.maps.LatLng(42.783755434866194, 2.865741865965323)
	],
	[
		new google.maps.LatLng(42.769397135400936, 2.864709567231564),
		new google.maps.LatLng(42.769363499027911, 2.864419183385964),
		new google.maps.LatLng(42.769347021215324, 2.864187340701075),
		new google.maps.LatLng(42.769345842894431, 2.863967666534078),
		new google.maps.LatLng(42.76935818215464, 2.863771149644555),
		new google.maps.LatLng(42.769376048122275, 2.863679575547019)
	],
	[
		new google.maps.LatLng(42.769413497396769, 2.864849878109261),
		new google.maps.LatLng(42.769397135400936, 2.864709567231564)
	],
	[
		new google.maps.LatLng(42.769435307707703, 2.865032891652362),
		new google.maps.LatLng(42.769429862110606, 2.864992630440404),
		new google.maps.LatLng(42.769422585635851, 2.864926744794409),
		new google.maps.LatLng(42.769413497396769, 2.864849878109261)
	],
	[
		new google.maps.LatLng(42.769579349043227, 2.865889300670486),
		new google.maps.LatLng(42.769489781983168, 2.865450152447371),
		new google.maps.LatLng(42.769464381598404, 2.865272029186397),
		new google.maps.LatLng(42.769435307707703, 2.865032891652362)
	],
	[
		new google.maps.LatLng(42.783755434866194, 2.865741865965323),
		new google.maps.LatLng(42.783425852077677, 2.866072220634421),
		new google.maps.LatLng(42.783195951177056, 2.866302246055143),
		new google.maps.LatLng(42.783001970216645, 2.866495564699444),
		new google.maps.LatLng(42.782784554771766, 2.866643769459053),
		new google.maps.LatLng(42.782392867514062, 2.866926648984126),
		new google.maps.LatLng(42.782337167667052, 2.866965839079616),
		new google.maps.LatLng(42.782143097150524, 2.867087130926776),
		new google.maps.LatLng(42.782017281580949, 2.867142349617651)
	],
	[
		new google.maps.LatLng(42.769579349043227, 2.865889300670486),
		new google.maps.LatLng(42.769478664987297, 2.865906619538924),
		new google.maps.LatLng(42.769309659736713, 2.865936299361915),
		new google.maps.LatLng(42.769253025465545, 2.865946192433593),
		new google.maps.LatLng(42.769067850688195, 2.865988113909358)
	],
	[
		new google.maps.LatLng(42.769035488345708, 2.865994291069557),
		new google.maps.LatLng(42.769011218379923, 2.866000448259811),
		new google.maps.LatLng(42.768981555529791, 2.866007839025801)
	],
	[
		new google.maps.LatLng(42.768981555529791, 2.866007839025801),
		new google.maps.LatLng(42.768931205420081, 2.8660103967227),
		new google.maps.LatLng(42.76886377639979, 2.866016653431764),
		new google.maps.LatLng(42.768740629658097, 2.866047447981828),
		new google.maps.LatLng(42.768585122890038, 2.866085638926708),
		new google.maps.LatLng(42.768354161329398, 2.866183802123663),
		new google.maps.LatLng(42.768138476498933, 2.866274608802549),
		new google.maps.LatLng(42.767796986556512, 2.866427942595539),
		new google.maps.LatLng(42.767750257615354, 2.86645001653196),
		new google.maps.LatLng(42.76737280942951, 2.866609534038994),
		new google.maps.LatLng(42.767325184853341, 2.866634050919361)
	],
	[
		new google.maps.LatLng(42.767325184853341, 2.866634050919361),
		new google.maps.LatLng(42.766828251708588, 2.866876823299517),
		new google.maps.LatLng(42.766572129490065, 2.866988463052031),
		new google.maps.LatLng(42.766184802591233, 2.867157759248638)
	],
	[
		new google.maps.LatLng(42.766184802591233, 2.867157759248638),
		new google.maps.LatLng(42.765765143193796, 2.867357634473733),
		new google.maps.LatLng(42.765452407706256, 2.867496246269139),
		new google.maps.LatLng(42.765366123081044, 2.867524511174063),
		new google.maps.LatLng(42.765252909363085, 2.867589447044763),
		new google.maps.LatLng(42.765072319637589, 2.867703348562251),
		new google.maps.LatLng(42.764879168809294, 2.867839244648459),
		new google.maps.LatLng(42.764693232939109, 2.867993428599811),
		new google.maps.LatLng(42.764624980965699, 2.868061922752811)
	],
	[
		new google.maps.LatLng(42.782017281580949, 2.867142349617651),
		new google.maps.LatLng(42.782001105378001, 2.867149711213792),
		new google.maps.LatLng(42.781865385011621, 2.867193966129911),
		new google.maps.LatLng(42.781499545744502, 2.867293677210855),
		new google.maps.LatLng(42.781155274968306, 2.867383571057658),
		new google.maps.LatLng(42.780828083044234, 2.867469764575854),
		new google.maps.LatLng(42.780423636906612, 2.867615944648908)
	],
	[
		new google.maps.LatLng(42.77753410592922, 2.867211178747779),
		new google.maps.LatLng(42.777541293263162, 2.867206279915061),
		new google.maps.LatLng(42.777623117231535, 2.867206093340635)
	],
	[
		new google.maps.LatLng(42.777623117231535, 2.867206093340635),
		new google.maps.LatLng(42.777684301665005, 2.867238909265188),
		new google.maps.LatLng(42.777750907772706, 2.867293684161929),
		new google.maps.LatLng(42.777864323563662, 2.86739107424422),
		new google.maps.LatLng(42.777929129474224, 2.867444633681504),
		new google.maps.LatLng(42.777947131745655, 2.867459239340246)
	],
	[
		new google.maps.LatLng(42.777466765234109, 2.867289450388164),
		new google.maps.LatLng(42.777509848189979, 2.86722710187479),
		new google.maps.LatLng(42.77753410592922, 2.867211178747779)
	],
	[
		new google.maps.LatLng(42.777384532568689, 2.867686331979948),
		new google.maps.LatLng(42.777387191100154, 2.867654590314639),
		new google.maps.LatLng(42.777386156106111, 2.867544739277796),
		new google.maps.LatLng(42.777386995139061, 2.867495913271384),
		new google.maps.LatLng(42.777412038650148, 2.86738844316675),
		new google.maps.LatLng(42.777466765234109, 2.867289450388164)
	],
	[
		new google.maps.LatLng(42.779273094079031, 2.868667087845505),
		new google.maps.LatLng(42.77914705188352, 2.868537985586833),
		new google.maps.LatLng(42.778806757098124, 2.868205523747426),
		new google.maps.LatLng(42.778357577970255, 2.867803739062559),
		new google.maps.LatLng(42.778051542010544, 2.867545665208466),
		new google.maps.LatLng(42.777947131745655, 2.867459239340246)
	],
	[
		new google.maps.LatLng(42.780423636906612, 2.867615944648908),
		new google.maps.LatLng(42.780127121328299, 2.867786289474762),
		new google.maps.LatLng(42.779982502949331, 2.86790624184705),
		new google.maps.LatLng(42.779818123869298, 2.8680433283669),
		new google.maps.LatLng(42.779491315703879, 2.86844199786253),
		new google.maps.LatLng(42.779273094079031, 2.868667087845505)
	],
	[
		new google.maps.LatLng(42.777384532568689, 2.867686331979948),
		new google.maps.LatLng(42.777381049437921, 2.867777884812631),
		new google.maps.LatLng(42.777379295883861, 2.867814506712357)
	],
	[
		new google.maps.LatLng(42.777379295883861, 2.867814506712357),
		new google.maps.LatLng(42.777377525858029, 2.867837701745023),
		new google.maps.LatLng(42.777350758372691, 2.868006204290733),
		new google.maps.LatLng(42.777288993895745, 2.868232154970694),
		new google.maps.LatLng(42.77723696364869, 2.868331139670759),
		new google.maps.LatLng(42.777171482224837, 2.8684594506468),
		new google.maps.LatLng(42.776659161139634, 2.869361397485283)
	],
	[
		new google.maps.LatLng(42.764624980965699, 2.868061922752811),
		new google.maps.LatLng(42.764502811767152, 2.868156164125681),
		new google.maps.LatLng(42.764384241825226, 2.868252838651978),
		new google.maps.LatLng(42.764288111800688, 2.868317733372922),
		new google.maps.LatLng(42.764211696013518, 2.868327669207215),
		new google.maps.LatLng(42.764149645652836, 2.868320487442964),
		new google.maps.LatLng(42.764075891906813, 2.868302348972366),
		new google.maps.LatLng(42.764026428386082, 2.868293918660146),
		new google.maps.LatLng(42.763976084737699, 2.868301355397663),
		new google.maps.LatLng(42.763934744099558, 2.868318532756917),
		new google.maps.LatLng(42.763881752487706, 2.86836624457049)
	],
	[
		new google.maps.LatLng(42.764083188278981, 2.869119944864519),
		new google.maps.LatLng(42.764038817885783, 2.868864998439298),
		new google.maps.LatLng(42.764027907913771, 2.868767397872857),
		new google.maps.LatLng(42.764008053290311, 2.868707647146544),
		new google.maps.LatLng(42.763987295064325, 2.868644237841664),
		new google.maps.LatLng(42.763934936098877, 2.868474732934064),
		new google.maps.LatLng(42.76390426603286, 2.868394261567659),
		new google.maps.LatLng(42.763881752487706, 2.86836624457049)
	],
	[
		new google.maps.LatLng(42.764765485251907, 2.868986615020063),
		new google.maps.LatLng(42.764573981547017, 2.869000468907511),
		new google.maps.LatLng(42.764384294267977, 2.869028963540178),
		new google.maps.LatLng(42.764218893436862, 2.869064725274955),
		new google.maps.LatLng(42.764083188278981, 2.869119944864519)
	],
	[
		new google.maps.LatLng(42.765260962656278, 2.869020888252659),
		new google.maps.LatLng(42.765158438318508, 2.869004035005557),
		new google.maps.LatLng(42.765002870823622, 2.868993401997668),
		new google.maps.LatLng(42.764974095003829, 2.868991026578221),
		new google.maps.LatLng(42.764765485251907, 2.868986615020063)
	],
	[
		new google.maps.LatLng(42.765680106645632, 2.869132217609655),
		new google.maps.LatLng(42.765383274777747, 2.869042579697252),
		new google.maps.LatLng(42.765260962656278, 2.869020888252659)
	],
	[
		new google.maps.LatLng(42.766206319538682, 2.869300663761067),
		new google.maps.LatLng(42.765705291549374, 2.869139483190702),
		new google.maps.LatLng(42.765680106645632, 2.869132217609655)
	],
	[
		new google.maps.LatLng(42.766794486192389, 2.8693969728766),
		new google.maps.LatLng(42.767059587605793, 2.869273118494265),
		new google.maps.LatLng(42.767146756208049, 2.869232650576182),
		new google.maps.LatLng(42.767179130830684, 2.869236239236665),
		new google.maps.LatLng(42.767262868126878, 2.86933124003753)
	],
	[
		new google.maps.LatLng(42.766794486192389, 2.8693969728766),
		new google.maps.LatLng(42.76679175367849, 2.869367689375704),
		new google.maps.LatLng(42.766780905097647, 2.869320119512656),
		new google.maps.LatLng(42.76675478687919, 2.869284787093315),
		new google.maps.LatLng(42.766728696137058, 2.869272641907272),
		new google.maps.LatLng(42.766709808617541, 2.869267802907272),
		new google.maps.LatLng(42.766672046670621, 2.869270328827783)
	],
	[
		new google.maps.LatLng(42.766672046670621, 2.869270328827783),
		new google.maps.LatLng(42.766631617343414, 2.869297267019515),
		new google.maps.LatLng(42.76660828281819, 2.869332711101479),
		new google.maps.LatLng(42.766599338530824, 2.869371783031768),
		new google.maps.LatLng(42.766602997354887, 2.86942302984285)
	],
	[
		new google.maps.LatLng(42.766602997354887, 2.86942302984285),
		new google.maps.LatLng(42.766459080673762, 2.869380640576471),
		new google.maps.LatLng(42.766206319538682, 2.869300663761067)
	],
	[
		new google.maps.LatLng(42.767262868126878, 2.86933124003753),
		new google.maps.LatLng(42.767420448105824, 2.869517606196245),
		new google.maps.LatLng(42.767500587256883, 2.869611395894562)
	],
	[
		new google.maps.LatLng(42.776659161139634, 2.869361397485283),
		new google.maps.LatLng(42.776164763234121, 2.870220569020245),
		new google.maps.LatLng(42.776031973284304, 2.870457655349092),
		new google.maps.LatLng(42.775977242556046, 2.870555422212083),
		new google.maps.LatLng(42.775946759373426, 2.870628724244174),
		new google.maps.LatLng(42.775931532956491, 2.870677580355315)
	],
	[
		new google.maps.LatLng(42.766759547776786, 2.869502003310711),
		new google.maps.LatLng(42.766769429583846, 2.869494658635561),
		new google.maps.LatLng(42.76678915556824, 2.869449460673525),
		new google.maps.LatLng(42.766796296982001, 2.869406731738114),
		new google.maps.LatLng(42.766794486192389, 2.8693969728766)
	],
	[
		new google.maps.LatLng(42.766602997354887, 2.86942302984285),
		new google.maps.LatLng(42.766621041715197, 2.869473024465385),
		new google.maps.LatLng(42.766648057832391, 2.869507134356828),
		new google.maps.LatLng(42.766675049300282, 2.869520498365531),
		new google.maps.LatLng(42.766711019528174, 2.869524078347978),
		new google.maps.LatLng(42.766742478526787, 2.869514244472825),
		new google.maps.LatLng(42.766759547776786, 2.869502003310711)
	],
	[
		new google.maps.LatLng(42.767500587256883, 2.869611395894562),
		new google.maps.LatLng(42.767742809421911, 2.869897645289866),
		new google.maps.LatLng(42.767957115599046, 2.87014978911041)
	],
	[
		new google.maps.LatLng(42.767957115599046, 2.87014978911041),
		new google.maps.LatLng(42.768101184008181, 2.870317882636302),
		new google.maps.LatLng(42.768219139373528, 2.870454303971435)
	],
	[
		new google.maps.LatLng(42.768219139373528, 2.870454303971435),
		new google.maps.LatLng(42.768263259612986, 2.870505463869878),
		new google.maps.LatLng(42.768455047328885, 2.870725929976571)
	],
	[
		new google.maps.LatLng(42.775931532956491, 2.870677580355315),
		new google.maps.LatLng(42.775910857882167, 2.870682508062454),
		new google.maps.LatLng(42.775817401679788, 2.870730317714206),
		new google.maps.LatLng(42.775616162964646, 2.870874791741313),
		new google.maps.LatLng(42.775315220897433, 2.871106143928233),
		new google.maps.LatLng(42.774947790163957, 2.871379139339571),
		new google.maps.LatLng(42.77469085463143, 2.871567669851335),
		new google.maps.LatLng(42.774575006078649, 2.87168753830714),
		new google.maps.LatLng(42.774553488756069, 2.871740069714768)
	],
	[
		new google.maps.LatLng(42.768455047328885, 2.870725929976571),
		new google.maps.LatLng(42.768500069564219, 2.870779528507016),
		new google.maps.LatLng(42.768812511208104, 2.871138857205066)
	],
	[
		new google.maps.LatLng(42.768561268858335, 2.871573879658956),
		new google.maps.LatLng(42.768812511208104, 2.871138857205066)
	],
	[
		new google.maps.LatLng(42.771134311948899, 2.871276508467165),
		new google.maps.LatLng(42.771025487022968, 2.87125478131629)
	],
	[
		new google.maps.LatLng(42.771130778796206, 2.872080802073775),
		new google.maps.LatLng(42.771095507715067, 2.871910014950972),
		new google.maps.LatLng(42.77107198788655, 2.871791681404448),
		new google.maps.LatLng(42.771032921638927, 2.87145614014185),
		new google.maps.LatLng(42.771025487022968, 2.87125478131629)
	],
	[
		new google.maps.LatLng(42.772470844157468, 2.871589658018717),
		new google.maps.LatLng(42.772299054301378, 2.871548540739761),
		new google.maps.LatLng(42.772062504355681, 2.871490479932343),
		new google.maps.LatLng(42.771961770482115, 2.871467513312207),
		new google.maps.LatLng(42.77184214918573, 2.871439706702765),
		new google.maps.LatLng(42.771584017824019, 2.871380474518872),
		new google.maps.LatLng(42.771476088144716, 2.871355082967649),
		new google.maps.LatLng(42.771158594592436, 2.871281335983631),
		new google.maps.LatLng(42.771134311948899, 2.871276508467165)
	],
	[
		new google.maps.LatLng(42.768587417017358, 2.871634842098819),
		new google.maps.LatLng(42.768561268858335, 2.871573879658956)
	],
	[
		new google.maps.LatLng(42.772721781464249, 2.871648909286696),
		new google.maps.LatLng(42.772470844157468, 2.871589658018717)
	],
	[
		new google.maps.LatLng(42.768622607161618, 2.871737279079734),
		new google.maps.LatLng(42.768619888981497, 2.871720200126896),
		new google.maps.LatLng(42.768587417017358, 2.871634842098819)
	],
	[
		new google.maps.LatLng(42.772721781464249, 2.871648909286696),
		new google.maps.LatLng(42.772910646241151, 2.871682665936184),
		new google.maps.LatLng(42.773125574955252, 2.871706602643521),
		new google.maps.LatLng(42.773337805127255, 2.871729324340263),
		new google.maps.LatLng(42.773538321263985, 2.871731322202043),
		new google.maps.LatLng(42.773605747819332, 2.871722630924237),
		new google.maps.LatLng(42.773728012211599, 2.87170405363012)
	],
	[
		new google.maps.LatLng(42.773728012211599, 2.87170405363012),
		new google.maps.LatLng(42.773747790727455, 2.871701568630409),
		new google.maps.LatLng(42.774018398074894, 2.871666796401532),
		new google.maps.LatLng(42.774237775977184, 2.871651666391429),
		new google.maps.LatLng(42.774303417979752, 2.87165396328445)
	],
	[
		new google.maps.LatLng(42.774303417979752, 2.87165396328445),
		new google.maps.LatLng(42.774366363295442, 2.871657485342676),
		new google.maps.LatLng(42.774482391642657, 2.871687742540796),
		new google.maps.LatLng(42.774553488756069, 2.871740069714768)
	],
	[
		new google.maps.LatLng(42.768586901073945, 2.872710025340831),
		new google.maps.LatLng(42.768591276615318, 2.872608722222427),
		new google.maps.LatLng(42.76861944116682, 2.872097308271328),
		new google.maps.LatLng(42.768624695904101, 2.871980136883044),
		new google.maps.LatLng(42.768634463744718, 2.871877600589096),
		new google.maps.LatLng(42.768631657398835, 2.871786076403831),
		new google.maps.LatLng(42.768622607161618, 2.871737279079734)
	],
	[
		new google.maps.LatLng(42.771365240940348, 2.872651466753667),
		new google.maps.LatLng(42.771339130582376, 2.872622231504864),
		new google.maps.LatLng(42.771308511179804, 2.872582023883587),
		new google.maps.LatLng(42.771248125306926, 2.872462549801643),
		new google.maps.LatLng(42.771247223224293, 2.872460111425553),
		new google.maps.LatLng(42.771227381475924, 2.87241011590331),
		new google.maps.LatLng(42.771176857365454, 2.872266210920899),
		new google.maps.LatLng(42.771175953911111, 2.872262551826245),
		new google.maps.LatLng(42.771130778796206, 2.872080802073775)
	],
	[
		new google.maps.LatLng(42.771397696247853, 2.872723402355034),
		new google.maps.LatLng(42.771390483712828, 2.872707552568201),
		new google.maps.LatLng(42.771365240940348, 2.872651466753667)
	],
	[
		new google.maps.LatLng(42.768582517275355, 2.87280400685016),
		new google.maps.LatLng(42.768586901073945, 2.872710025340831)
	],
	[
		new google.maps.LatLng(42.771397696247853, 2.872723402355034),
		new google.maps.LatLng(42.771455341151658, 2.87280626918785),
		new google.maps.LatLng(42.771517513587213, 2.87291597568807),
		new google.maps.LatLng(42.77155272521447, 2.873037946286171),
		new google.maps.LatLng(42.771551898290319, 2.873098971263762)
	],
	[
		new google.maps.LatLng(42.768558016993182, 2.87337521232201),
		new google.maps.LatLng(42.768575554048169, 2.872998067060798),
		new google.maps.LatLng(42.768582517275355, 2.87280400685016)
	],
	[
		new google.maps.LatLng(42.771551898290319, 2.873098971263762),
		new google.maps.LatLng(42.771435099890901, 2.873177336376958)
	],
	[
		new google.maps.LatLng(42.771435099890901, 2.873177336376958),
		new google.maps.LatLng(42.771516260510914, 2.873377316640547),
		new google.maps.LatLng(42.771575726213086, 2.873479707388422),
		new google.maps.LatLng(42.77161088717768, 2.873558961331655),
		new google.maps.LatLng(42.771567960699016, 2.873756771399451),
		new google.maps.LatLng(42.771550080790504, 2.873844683639235),
		new google.maps.LatLng(42.771543844721002, 2.87389351716776),
		new google.maps.LatLng(42.771542961113354, 2.873906943379133)
	],
	[
		new google.maps.LatLng(42.768721815440855, 2.873502999604124),
		new google.maps.LatLng(42.768622805708922, 2.873416565678266),
		new google.maps.LatLng(42.768558016993182, 2.87337521232201)
	],
	[
		new google.maps.LatLng(42.768878430182966, 2.873639345779125),
		new google.maps.LatLng(42.768721815440855, 2.873502999604124)
	],
	[
		new google.maps.LatLng(42.769052148685525, 2.873792741245919),
		new google.maps.LatLng(42.769039546029141, 2.873780563760314),
		new google.maps.LatLng(42.768993640269819, 2.873739170003167),
		new google.maps.LatLng(42.768878430182966, 2.873639345779125)
	],
	[
		new google.maps.LatLng(42.769142162345375, 2.873875535086539),
		new google.maps.LatLng(42.769052148685525, 2.873792741245919)
	],
	[
		new google.maps.LatLng(42.769476043989272, 2.874124999136519),
		new google.maps.LatLng(42.769306867665954, 2.874010644748633),
		new google.maps.LatLng(42.769239377063442, 2.87396563497101),
		new google.maps.LatLng(42.769142162345375, 2.873875535086539)
	],
	[
		new google.maps.LatLng(42.771542961113354, 2.873906943379133),
		new google.maps.LatLng(42.771641886348412, 2.873921374787669),
		new google.maps.LatLng(42.771731783412463, 2.873905313513478)
	],
	[
		new google.maps.LatLng(42.771731783412463, 2.873905313513478),
		new google.maps.LatLng(42.771802870533854, 2.873950317713196),
		new google.maps.LatLng(42.771831650277782, 2.873956357912088),
		new google.maps.LatLng(42.771857851985331, 2.87406370283018),
		new google.maps.LatLng(42.771857982694229, 2.874174766729724)
	],
	[
		new google.maps.LatLng(42.77110599248924, 2.873927417762294),
		new google.maps.LatLng(42.771164431545834, 2.873922409707646)
	],
	[
		new google.maps.LatLng(42.771577197833793, 2.874731909590129),
		new google.maps.LatLng(42.771486348086896, 2.874702814201328),
		new google.maps.LatLng(42.771386494527597, 2.874662754215208),
		new google.maps.LatLng(42.77124434678656, 2.87459471427998),
		new google.maps.LatLng(42.771234434666411, 2.874576428329086),
		new google.maps.LatLng(42.77119663859785, 2.874549659916032),
		new google.maps.LatLng(42.771167821265273, 2.874511886791143),
		new google.maps.LatLng(42.77115158454783, 2.87446798577572),
		new google.maps.LatLng(42.771137070763722, 2.874359395016044),
		new google.maps.LatLng(42.771126927050076, 2.87414339475302),
		new google.maps.LatLng(42.771147472888757, 2.874028626681857),
		new google.maps.LatLng(42.771164431545834, 2.873922409707646)
	],
	[
		new google.maps.LatLng(42.770724853420518, 2.874017337091387),
		new google.maps.LatLng(42.770872283471626, 2.873990167694591),
		new google.maps.LatLng(42.770885767024033, 2.873986478079112),
		new google.maps.LatLng(42.770932510449022, 2.873975392743979),
		new google.maps.LatLng(42.770946892452606, 2.87397170007027),
		new google.maps.LatLng(42.77110599248924, 2.873927417762294)
	],
	[
		new google.maps.LatLng(42.77053289241131, 2.874409518472349),
		new google.maps.LatLng(42.770636307182187, 2.87441905847419),
		new google.maps.LatLng(42.770665812284612, 2.87427620160783),
		new google.maps.LatLng(42.770697139714386, 2.87415408820996),
		new google.maps.LatLng(42.770724853420518, 2.874017337091387)
	],
	[
		new google.maps.LatLng(42.769899858537023, 2.87438891709989),
		new google.maps.LatLng(42.769476043989272, 2.874124999136519)
	],
	[
		new google.maps.LatLng(42.771905640352173, 2.874944786591347),
		new google.maps.LatLng(42.771823631404622, 2.874786300113291),
		new google.maps.LatLng(42.771778406604291, 2.874558168423615),
		new google.maps.LatLng(42.771816180290038, 2.874565410192444),
		new google.maps.LatLng(42.771848528761382, 2.874547033528714),
		new google.maps.LatLng(42.771871863552612, 2.874510368895638),
		new google.maps.LatLng(42.771890689029846, 2.874461508413385),
		new google.maps.LatLng(42.771903205573373, 2.874400458177292),
		new google.maps.LatLng(42.771906742011339, 2.874349189636472),
		new google.maps.LatLng(42.771902180667269, 2.874293057014911),
		new google.maps.LatLng(42.771876961110735, 2.874256497010038),
		new google.maps.LatLng(42.771885879684994, 2.874194233318194),
		new google.maps.LatLng(42.771863381953132, 2.874178416752866),
		new google.maps.LatLng(42.771857982694229, 2.874174766729724)
	],
	[
		new google.maps.LatLng(42.769899858537023, 2.87438891709989),
		new google.maps.LatLng(42.77009244584508, 2.874531292602395)
	],
	[
		new google.maps.LatLng(42.770191445323199, 2.874609187873508),
		new google.maps.LatLng(42.77036023242907, 2.874391583820127),
		new google.maps.LatLng(42.77053289241131, 2.874409518472349)
	],
	[
		new google.maps.LatLng(42.77009244584508, 2.874531292602395),
		new google.maps.LatLng(42.770155441694087, 2.874577533431937),
		new google.maps.LatLng(42.770191445323199, 2.874609187873508)
	],
	[
		new google.maps.LatLng(42.771577197833793, 2.874731909590129),
		new google.maps.LatLng(42.771682462229826, 2.874785384526348),
		new google.maps.LatLng(42.771714045423387, 2.874881733240536),
		new google.maps.LatLng(42.77180417650186, 2.875065832582897)
	],
	[
		new google.maps.LatLng(42.771867064631977, 2.875020539456594),
		new google.maps.LatLng(42.771905640352173, 2.874944786591347)
	],
	[
		new google.maps.LatLng(42.77180417650186, 2.875065832582897),
		new google.maps.LatLng(42.771867064631977, 2.875020539456594)
	]
];

var circuit_5 = [
	[
		new google.maps.LatLng(42.761770781365925, 2.982215837626828),
		new google.maps.LatLng(42.761697934969753, 2.982126779995146),
		new google.maps.LatLng(42.761635882615906, 2.982060904767175),
		new google.maps.LatLng(42.761601712207472, 2.982047492429356),
		new google.maps.LatLng(42.761542369036228, 2.982052391782441),
		new google.maps.LatLng(42.761493819456142, 2.982082913118391),
		new google.maps.LatLng(42.761440780247348, 2.98214760331668),
		new google.maps.LatLng(42.761325717876865, 2.982322135841601),
		new google.maps.LatLng(42.761282572652981, 2.982406346446249),
		new google.maps.LatLng(42.761270888627138, 2.982438076225488)
	],
	[
		new google.maps.LatLng(42.763345896285323, 2.987077029135759),
		new google.maps.LatLng(42.763344989442182, 2.987011133140123),
		new google.maps.LatLng(42.763349468062174, 2.986868357122754),
		new google.maps.LatLng(42.763336854052319, 2.986662128494229),
		new google.maps.LatLng(42.763325139894256, 2.986463223177896),
		new google.maps.LatLng(42.763287345535687, 2.98622405346321),
		new google.maps.LatLng(42.76323875450791, 2.985945836825157),
		new google.maps.LatLng(42.763156884329845, 2.985591971469583),
		new google.maps.LatLng(42.763081316622625, 2.985307661927411),
		new google.maps.LatLng(42.762977869685187, 2.984986750235434),
		new google.maps.LatLng(42.762890617601066, 2.984747596171457),
		new google.maps.LatLng(42.762744901553283, 2.984376667541906),
		new google.maps.LatLng(42.762627966242512, 2.984069187529709),
		new google.maps.LatLng(42.762593784439311, 2.983972794361131),
		new google.maps.LatLng(42.762512825476612, 2.983744624105963),
		new google.maps.LatLng(42.762391392228423, 2.9834347065387),
		new google.maps.LatLng(42.76224386956369, 2.983039379602586),
		new google.maps.LatLng(42.762028886505256, 2.982507402936376),
		new google.maps.LatLng(42.761969518206669, 2.98236098862803),
		new google.maps.LatLng(42.761770781365925, 2.982215837626828)
	],
	[
		new google.maps.LatLng(42.761270888627138, 2.982438076225488),
		new google.maps.LatLng(42.761257407532867, 2.982474688621966),
		new google.maps.LatLng(42.761223261962677, 2.982611367038674),
		new google.maps.LatLng(42.761141507117706, 2.983036039601176),
		new google.maps.LatLng(42.761109162283951, 2.983197122618707),
		new google.maps.LatLng(42.761086690449403, 2.9832422784328),
		new google.maps.LatLng(42.76105162692302, 2.983264252506173),
		new google.maps.LatLng(42.761009367128722, 2.983264265153073),
		new google.maps.LatLng(42.760874491759033, 2.983245999888009),
		new google.maps.LatLng(42.760842123246874, 2.983253330558063),
		new google.maps.LatLng(42.760831334042834, 2.983255774520218),
		new google.maps.LatLng(42.760789080154439, 2.983296054585178),
		new google.maps.LatLng(42.76075402659491, 2.983386362987344),
		new google.maps.LatLng(42.760719872511778, 2.983471790191075),
		new google.maps.LatLng(42.760633586391251, 2.983689017745847),
		new google.maps.LatLng(42.760327074386225, 2.984349251191255),
		new google.maps.LatLng(42.760272244399218, 2.984474949550707),
		new google.maps.LatLng(42.760013372712613, 2.985064390370731),
		new google.maps.LatLng(42.759840786198858, 2.985437823810325),
		new google.maps.LatLng(42.759783257843047, 2.985563520847164),
		new google.maps.LatLng(42.759533379810243, 2.98621517986361),
		new google.maps.LatLng(42.75949382952227, 2.986317688284722),
		new google.maps.LatLng(42.75940933639108, 2.98653246619196),
		new google.maps.LatLng(42.759400349424808, 2.986565414140071),
		new google.maps.LatLng(42.759353614507098, 2.986735034871442),
		new google.maps.LatLng(42.759299689374267, 2.986931501571353),
		new google.maps.LatLng(42.75926553193478, 2.987010823579948),
		new google.maps.LatLng(42.759203494840264, 2.987046223464203),
		new google.maps.LatLng(42.759145052872498, 2.987069420086557),
		new google.maps.LatLng(42.759127969550306, 2.987076745361646),
		new google.maps.LatLng(42.759096502903667, 2.987108477274386),
		new google.maps.LatLng(42.759070435878392, 2.987179256285349),
		new google.maps.LatLng(42.758911370967844, 2.987907754355178),
		new google.maps.LatLng(42.758860145945597, 2.988143263786743),
		new google.maps.LatLng(42.758732534280526, 2.98877047459855),
		new google.maps.LatLng(42.758712756680808, 2.988808304510922)
	],
	[
		new google.maps.LatLng(42.764457816680356, 2.993207683748253),
		new google.maps.LatLng(42.764388555073388, 2.992803764655966),
		new google.maps.LatLng(42.764183460448635, 2.991601778360089),
		new google.maps.LatLng(42.76404131338181, 2.990637750571418),
		new google.maps.LatLng(42.763907265714316, 2.989832367347828),
		new google.maps.LatLng(42.763754325693476, 2.98897817756314),
		new google.maps.LatLng(42.763658953782333, 2.988399770359874),
		new google.maps.LatLng(42.763638258355769, 2.988264320735103),
		new google.maps.LatLng(42.763580669062776, 2.987877495848797),
		new google.maps.LatLng(42.76353478726034, 2.987656630858253),
		new google.maps.LatLng(42.763490712854072, 2.987518746540169),
		new google.maps.LatLng(42.763424155525207, 2.987350358791016),
		new google.maps.LatLng(42.763377385907944, 2.987233220328783),
		new google.maps.LatLng(42.763345896285323, 2.987077029135759)
	],
	[
		new google.maps.LatLng(42.758712756680808, 2.988808304510922),
		new google.maps.LatLng(42.758303649884617, 2.98887305370512)
	],
	[
		new google.maps.LatLng(42.758303649884617, 2.98887305370512),
		new google.maps.LatLng(42.757949390409166, 2.988930469453618),
		new google.maps.LatLng(42.757923315873775, 2.98893535597345),
		new google.maps.LatLng(42.757543881211234, 2.989007418527682),
		new google.maps.LatLng(42.7574251942983, 2.989008661278806),
		new google.maps.LatLng(42.75731010241752, 2.989003802347458),
		new google.maps.LatLng(42.75727683452061, 2.989014789877525),
		new google.maps.LatLng(42.757256154978151, 2.989017234449412)
	],
	[
		new google.maps.LatLng(42.757256154978151, 2.989017234449412),
		new google.maps.LatLng(42.757238178461918, 2.989080686421337),
		new google.maps.LatLng(42.757175273794324, 2.989441868740719),
		new google.maps.LatLng(42.757168084471779, 2.989482135024908)
	],
	[
		new google.maps.LatLng(42.757168084471779, 2.989482135024908),
		new google.maps.LatLng(42.757079116084789, 2.989975099833231)
	],
	[
		new google.maps.LatLng(42.757079116084789, 2.989975099833231),
		new google.maps.LatLng(42.757028788583931, 2.990249646183636),
		new google.maps.LatLng(42.757000926131589, 2.99037166708785)
	],
	[
		new google.maps.LatLng(42.757000926131589, 2.99037166708785),
		new google.maps.LatLng(42.756919133617572, 2.990710886423172)
	],
	[
		new google.maps.LatLng(42.756919133617572, 2.990710886423172),
		new google.maps.LatLng(42.756888573994992, 2.990839008300913)
	],
	[
		new google.maps.LatLng(42.756888573994992, 2.990839008300913),
		new google.maps.LatLng(42.756847227136696, 2.9910098373617),
		new google.maps.LatLng(42.756783410875101, 2.991290484728739),
		new google.maps.LatLng(42.756772627524221, 2.99137223751072)
	],
	[
		new google.maps.LatLng(42.756772627524221, 2.99137223751072),
		new google.maps.LatLng(42.756767236782188, 2.991419824486838),
		new google.maps.LatLng(42.756755555890123, 2.991527200507207),
		new google.maps.LatLng(42.756728600650014, 2.99177611669571)
	],
	[
		new google.maps.LatLng(42.756728600650014, 2.99177611669571),
		new google.maps.LatLng(42.756724108920011, 2.99182126382429),
		new google.maps.LatLng(42.756677388669324, 2.992304452970993),
		new google.maps.LatLng(42.756668410503501, 2.992494799903979),
		new google.maps.LatLng(42.756676508361736, 2.99256434688439)
	],
	[
		new google.maps.LatLng(42.756676508361736, 2.99256434688439),
		new google.maps.LatLng(42.756532649986561, 2.992644895895768),
		new google.maps.LatLng(42.756388791552332, 2.992725444532791)
	],
	[
		new google.maps.LatLng(42.7528335684014, 2.992823495054971),
		new google.maps.LatLng(42.752537746038911, 2.992767408750732),
		new google.maps.LatLng(42.75232194975932, 2.992747914405767),
		new google.maps.LatLng(42.751663773096283, 2.992717495193482),
		new google.maps.LatLng(42.751353567212583, 2.992702892549959),
		new google.maps.LatLng(42.751307711007932, 2.992705338622447),
		new google.maps.LatLng(42.751263653905426, 2.992713884923131),
		new google.maps.LatLng(42.751233085564216, 2.99275414971867),
		new google.maps.LatLng(42.751198922070451, 2.992816377199911),
		new google.maps.LatLng(42.75114318620286, 2.992988409979977),
		new google.maps.LatLng(42.75096158638037, 2.993409345667772),
		new google.maps.LatLng(42.750932817632361, 2.993484990651329),
		new google.maps.LatLng(42.750823139143307, 2.993770492129336),
		new google.maps.LatLng(42.750752117409071, 2.993944963926065),
		new google.maps.LatLng(42.750708962526566, 2.994026711404677),
		new google.maps.LatLng(42.750687384527637, 2.99404867439058),
		new google.maps.LatLng(42.750665806460965, 2.994069417040016),
		new google.maps.LatLng(42.750577693540308, 2.994132867436815),
		new google.maps.LatLng(42.750386182420925, 2.994247569612898),
		new google.maps.LatLng(42.750163202239776, 2.994389114686973),
		new google.maps.LatLng(42.750048115284272, 2.994463546869265)
	],
	[
		new google.maps.LatLng(42.756388791552332, 2.992725444532791),
		new google.maps.LatLng(42.756306072604907, 2.992770600479886),
		new google.maps.LatLng(42.756189187452577, 2.992835283488419)
	],
	[
		new google.maps.LatLng(42.752972937401701, 2.992842999881285),
		new google.maps.LatLng(42.752926181921957, 2.992846665162104),
		new google.maps.LatLng(42.7528335684014, 2.992823495054971)
	],
	[
		new google.maps.LatLng(42.756189187452577, 2.992835283488419),
		new google.maps.LatLng(42.756121753967477, 2.992867015111692)
	],
	[
		new google.maps.LatLng(42.752972937401701, 2.992842999881285),
		new google.maps.LatLng(42.752975637151735, 2.992869840309009),
		new google.maps.LatLng(42.752984632256492, 2.992923523203624),
		new google.maps.LatLng(42.753009812443757, 2.992996725270996),
		new google.maps.LatLng(42.753112325642206, 2.993146783695059),
		new google.maps.LatLng(42.753242711363718, 2.993310260026044)
	],
	[
		new google.maps.LatLng(42.756121753967477, 2.992867015111692),
		new google.maps.LatLng(42.756073201009507, 2.992890203948433),
		new google.maps.LatLng(42.756026446530413, 2.992909731262152)
	],
	[
		new google.maps.LatLng(42.756026446530413, 2.992909731262152),
		new google.maps.LatLng(42.755976994350846, 2.992920719537842),
		new google.maps.LatLng(42.755892475322526, 2.992930490153749),
		new google.maps.LatLng(42.755797165446232, 2.992934162304729),
		new google.maps.LatLng(42.755771989037868, 2.992936606022034)
	],
	[
		new google.maps.LatLng(42.755771989037868, 2.992936606022034),
		new google.maps.LatLng(42.75570635174968, 2.9929427143923)
	],
	[
		new google.maps.LatLng(42.75570635174968, 2.9929427143923),
		new google.maps.LatLng(42.755655999907724, 2.992948821008646),
		new google.maps.LatLng(42.755614640425229, 2.992964688720629),
		new google.maps.LatLng(42.755553500290191, 2.992991538747753),
		new google.maps.LatLng(42.755458193099102, 2.993039134755713),
		new google.maps.LatLng(42.755380869032059, 2.993080628981288),
		new google.maps.LatLng(42.75536108881532, 2.993098933734325)
	],
	[
		new google.maps.LatLng(42.75536108881532, 2.993098933734325),
		new google.maps.LatLng(42.755346703535309, 2.993112356221777),
		new google.maps.LatLng(42.755315235563486, 2.993150183971383),
		new google.maps.LatLng(42.755252301134135, 2.993236820616909)
	],
	[
		new google.maps.LatLng(42.765421907028923, 2.997930298725917),
		new google.maps.LatLng(42.765300511567695, 2.997498302227104),
		new google.maps.LatLng(42.765260045551962, 2.997320134050243),
		new google.maps.LatLng(42.765084687189045, 2.996537907003025),
		new google.maps.LatLng(42.764899428504819, 2.995629991175833),
		new google.maps.LatLng(42.764757333618533, 2.99498566785342),
		new google.maps.LatLng(42.764691676565953, 2.994618355104633),
		new google.maps.LatLng(42.764583742823689, 2.993947185945819),
		new google.maps.LatLng(42.76452707602391, 2.993612823117225),
		new google.maps.LatLng(42.764457816680356, 2.993207683748253)
	],
	[
		new google.maps.LatLng(42.755252301134135, 2.993236820616909),
		new google.maps.LatLng(42.755208248537791, 2.993322234639089),
		new google.maps.LatLng(42.755188469846871, 2.993367382184563)
	],
	[
		new google.maps.LatLng(42.753242711363718, 2.993310260026044),
		new google.maps.LatLng(42.753329935479265, 2.993420057365377),
		new google.maps.LatLng(42.753414462112922, 2.993526196612919),
		new google.maps.LatLng(42.753484599601904, 2.99359573365524),
		new google.maps.LatLng(42.753504381274361, 2.993601832273364)
	],
	[
		new google.maps.LatLng(42.755188469846871, 2.993367382184563),
		new google.maps.LatLng(42.755171387881894, 2.993405208175388),
		new google.maps.LatLng(42.75512284011527, 2.993505263683309),
		new google.maps.LatLng(42.755103959809013, 2.993534549365675)
	],
	[
		new google.maps.LatLng(42.755103959809013, 2.993534549365675),
		new google.maps.LatLng(42.755088675811422, 2.993560173430893),
		new google.maps.LatLng(42.755053611030064, 2.993595560351743),
		new google.maps.LatLng(42.755002362265877, 2.993629729712299)
	],
	[
		new google.maps.LatLng(42.753504381274361, 2.993601832273364),
		new google.maps.LatLng(42.753576313876614, 2.993623785546784),
		new google.maps.LatLng(42.753773229246214, 2.993649385969296)
	],
	[
		new google.maps.LatLng(42.754660684628639, 2.993600485042759),
		new google.maps.LatLng(42.754635508203037, 2.993602927222591),
		new google.maps.LatLng(42.754618424316568, 2.993607810584535),
		new google.maps.LatLng(42.75457077132031, 2.993628557388154),
		new google.maps.LatLng(42.754507833192413, 2.993671267987194)
	],
	[
		new google.maps.LatLng(42.754874687311357, 2.993699291230805),
		new google.maps.LatLng(42.75485130952854, 2.993700514013802),
		new google.maps.LatLng(42.754809048693915, 2.993682215934958),
		new google.maps.LatLng(42.754742508814083, 2.993630978073675),
		new google.maps.LatLng(42.754691255867904, 2.993606581442367),
		new google.maps.LatLng(42.754660684628639, 2.993600485042759)
	],
	[
		new google.maps.LatLng(42.755002362265877, 2.993629729712299),
		new google.maps.LatLng(42.754961003297446, 2.993656576790229),
		new google.maps.LatLng(42.754916047169523, 2.993688305819445),
		new google.maps.LatLng(42.75488727559231, 2.993699289949651),
		new google.maps.LatLng(42.754874687311357, 2.993699291230805)
	],
	[
		new google.maps.LatLng(42.753773229246214, 2.993649385969296),
		new google.maps.LatLng(42.753935975944643, 2.993668890560075),
		new google.maps.LatLng(42.754194931684793, 2.993696924515973),
		new google.maps.LatLng(42.754297435860558, 2.993715215086187),
		new google.maps.LatLng(42.75432351188703, 2.993733513452932),
		new google.maps.LatLng(42.754379263415331, 2.993807934768957)
	],
	[
		new google.maps.LatLng(42.754507833192413, 2.993671267987194),
		new google.maps.LatLng(42.75447276783526, 2.993696893785985),
		new google.maps.LatLng(42.754379263415331, 2.993807934768957)
	],
	[
		new google.maps.LatLng(42.749719934306519, 2.994583138998366),
		new google.maps.LatLng(42.749765790036122, 2.994569714090784),
		new google.maps.LatLng(42.749796360308054, 2.994556291728812),
		new google.maps.LatLng(42.749889868984646, 2.994517242266991),
		new google.maps.LatLng(42.749965395730939, 2.994492834315872),
		new google.maps.LatLng(42.750041821768583, 2.994467207137361),
		new google.maps.LatLng(42.750048115284272, 2.994463546869265)
	],
	[
		new google.maps.LatLng(42.749719934306519, 2.994583138998366),
		new google.maps.LatLng(42.749691161496351, 2.994589241804369)
	],
	[
		new google.maps.LatLng(42.749691161496351, 2.994589241804369),
		new google.maps.LatLng(42.749603945161084, 2.994600229686228),
		new google.maps.LatLng(42.749424117802157, 2.994614886487943),
		new google.maps.LatLng(42.749186744695038, 2.994639309311296),
		new google.maps.LatLng(42.749093234427505, 2.99464541763733)
	],
	[
		new google.maps.LatLng(42.749093234427505, 2.99464541763733),
		new google.maps.LatLng(42.74895296860246, 2.994655190846426),
		new google.maps.LatLng(42.748711998880609, 2.994658872496259),
		new google.maps.LatLng(42.748365829557628, 2.994679643384649),
		new google.maps.LatLng(42.748295696975262, 2.994682089960155),
		new google.maps.LatLng(42.748107776834317, 2.994689427725498),
		new google.maps.LatLng(42.747954923664786, 2.994719940202552),
		new google.maps.LatLng(42.747796676819789, 2.994765093719812),
		new google.maps.LatLng(42.74770316798331, 2.99480292122423),
		new google.maps.LatLng(42.747667203670325, 2.99482366381377)
	],
	[
		new google.maps.LatLng(42.747667203670325, 2.99482366381377),
		new google.maps.LatLng(42.747622247864825, 2.994850507212657),
		new google.maps.LatLng(42.747470296995026, 2.994948118525719),
		new google.maps.LatLng(42.747431635754616, 2.994974961238019),
		new google.maps.LatLng(42.74719157216709, 2.995136016222822),
		new google.maps.LatLng(42.747001859245714, 2.995264127960357),
		new google.maps.LatLng(42.746731226633031, 2.995460561482019),
		new google.maps.LatLng(42.746553203308707, 2.995615509616981),
		new google.maps.LatLng(42.746493862276679, 2.995670411139459),
		new google.maps.LatLng(42.746381473511541, 2.995771675446447),
		new google.maps.LatLng(42.746262791224204, 2.995880258769207),
		new google.maps.LatLng(42.746164787771455, 2.995964440570997),
		new google.maps.LatLng(42.746088363549958, 2.996026662677678),
		new google.maps.LatLng(42.745983166601512, 2.996101086295019),
		new google.maps.LatLng(42.745879768111806, 2.996169409635123)
	],
	[
		new google.maps.LatLng(42.745879768111806, 2.996169409635123),
		new google.maps.LatLng(42.745797948254022, 2.996223092396498),
		new google.maps.LatLng(42.74566937357978, 2.996306055845475),
		new google.maps.LatLng(42.74551382553846, 2.996395120400149),
		new google.maps.LatLng(42.745348386825441, 2.996471985347207),
		new google.maps.LatLng(42.745235995746391, 2.996520789327834),
		new google.maps.LatLng(42.745125402880205, 2.996553732717683),
		new google.maps.LatLng(42.745039985176909, 2.996569597763934),
		new google.maps.LatLng(42.744934786050855, 2.996583022219202),
		new google.maps.LatLng(42.744823292897216, 2.996585468784105),
		new google.maps.LatLng(42.744722589212849, 2.996584255354716),
		new google.maps.LatLng(42.744579624928754, 2.99655864512085),
		new google.maps.LatLng(42.744469929857651, 2.99654035311597),
		new google.maps.LatLng(42.744360234476162, 2.996541579441977),
		new google.maps.LatLng(42.744271220204375, 2.996556223092235),
		new google.maps.LatLng(42.744157930147473, 2.996589167275513)
	],
	[
		new google.maps.LatLng(42.742576341552436, 2.996448976089412),
		new google.maps.LatLng(42.742479234637905, 2.996456301396311),
		new google.maps.LatLng(42.742377632358625, 2.996451427800621),
		new google.maps.LatLng(42.742234668874183, 2.996424599909525),
		new google.maps.LatLng(42.74211328412229, 2.996384351649929),
		new google.maps.LatLng(42.742009881718943, 2.996335563874552),
		new google.maps.LatLng(42.741928058658381, 2.996292874491975),
		new google.maps.LatLng(42.741878605369649, 2.996281898562574),
		new google.maps.LatLng(42.74183185054914, 2.996283121517113),
		new google.maps.LatLng(42.741794087429859, 2.996309960898236),
		new google.maps.LatLng(42.741762619411489, 2.996352658105403),
		new google.maps.LatLng(42.741725757705971, 2.996445368096204),
		new google.maps.LatLng(42.741676312275004, 2.996663722988036),
		new google.maps.LatLng(42.741617877534871, 2.996955269461353),
		new google.maps.LatLng(42.74160259422068, 2.997037000228273),
		new google.maps.LatLng(42.741565733657836, 2.997198021641696),
		new google.maps.LatLng(42.74153246682782, 2.997250475786272),
		new google.maps.LatLng(42.741491107793756, 2.997274874324903),
		new google.maps.LatLng(42.741442554275906, 2.997277316740651),
		new google.maps.LatLng(42.741393101138179, 2.997268780388129),
		new google.maps.LatLng(42.741312177779314, 2.997226088936059),
		new google.maps.LatLng(42.741206978396185, 2.99719681896163),
		new google.maps.LatLng(42.740979495083053, 2.997124859888125),
		new google.maps.LatLng(42.74085091753885, 2.99708583153825),
		new google.maps.LatLng(42.740467883179306, 2.99697972596864),
		new google.maps.LatLng(42.740421127055988, 2.996966310600132),
		new google.maps.LatLng(42.740357288449182, 2.996949236959512)
	],
	[
		new google.maps.LatLng(42.743528532647318, 2.996563586702588),
		new google.maps.LatLng(42.743422432970675, 2.996537976170596),
		new google.maps.LatLng(42.743185957748729, 2.99647333605641),
		new google.maps.LatLng(42.743060077560244, 2.996446506784151),
		new google.maps.LatLng(42.742941390762937, 2.996430655062116),
		new google.maps.LatLng(42.742762463156254, 2.99644042547866),
		new google.maps.LatLng(42.742576341552436, 2.996448976089412)
	],
	[
		new google.maps.LatLng(42.743626538859701, 2.996584319480823),
		new google.maps.LatLng(42.743595967782852, 2.996579441660932),
		new google.maps.LatLng(42.743528532647318, 2.996563586702588)
	],
	[
		new google.maps.LatLng(42.744157930147473, 2.996589167275513),
		new google.maps.LatLng(42.74404823628084, 2.996611131867416),
		new google.maps.LatLng(42.743941238027986, 2.996611138944736),
		new google.maps.LatLng(42.743807266053494, 2.996603826381861),
		new google.maps.LatLng(42.743626538859701, 2.996584319480823)
	],
	[
		new google.maps.LatLng(42.738452064757425, 3.000176867715509),
		new google.maps.LatLng(42.738454762836767, 3.000171988622061),
		new google.maps.LatLng(42.738601321280321, 2.999946329759934),
		new google.maps.LatLng(42.73872989759122, 2.999746285611255),
		new google.maps.LatLng(42.73884138932825, 2.999537701360546),
		new google.maps.LatLng(42.738921411442739, 2.999357171437669),
		new google.maps.LatLng(42.738993340649834, 2.999148587606672),
		new google.maps.LatLng(42.739059875199615, 2.998947321496027),
		new google.maps.LatLng(42.739142592691259, 2.998689943727651),
		new google.maps.LatLng(42.739209124872396, 2.998439883811656),
		new google.maps.LatLng(42.739276555861707, 2.998189824553382),
		new google.maps.LatLng(42.739352078093773, 2.997905609056803),
		new google.maps.LatLng(42.739424903127805, 2.997654328335497),
		new google.maps.LatLng(42.739446480743425, 2.997579919728136),
		new google.maps.LatLng(42.739485140326728, 2.997448180293293),
		new google.maps.LatLng(42.739608309432242, 2.996984649527809),
		new google.maps.LatLng(42.739636179178177, 2.996868767612096),
		new google.maps.LatLng(42.739659555131993, 2.996799237580102)
	],
	[
		new google.maps.LatLng(42.740357288449182, 2.996949236959512),
		new google.maps.LatLng(42.740181056347254, 2.996900453269807),
		new google.maps.LatLng(42.739997631131068, 2.996850451333726),
		new google.maps.LatLng(42.739754863860036, 2.996808991061034),
		new google.maps.LatLng(42.739659555131993, 2.996799237580102)
	],
	[
		new google.maps.LatLng(42.7679402397373, 3.006990427293763),
		new google.maps.LatLng(42.767899787835965, 3.006824448258584),
		new google.maps.LatLng(42.767396357755281, 3.005049950929521),
		new google.maps.LatLng(42.76680748682525, 3.002969164635823),
		new google.maps.LatLng(42.766507193801274, 3.001831769000519),
		new google.maps.LatLng(42.766431669318685, 3.001547421804834),
		new google.maps.LatLng(42.766164629314481, 3.00059431452165),
		new google.maps.LatLng(42.766046840462693, 3.000170849551832),
		new google.maps.LatLng(42.765699761205042, 2.99893829601679),
		new google.maps.LatLng(42.765490247724905, 2.998171924156514),
		new google.maps.LatLng(42.765452480712518, 2.998038907803727),
		new google.maps.LatLng(42.765421907028923, 2.997930298725917)
	],
	[
		new google.maps.LatLng(42.737349628217579, 3.004622868926464),
		new google.maps.LatLng(42.737326253952745, 3.004532606065008),
		new google.maps.LatLng(42.737215678507972, 3.004091047538451),
		new google.maps.LatLng(42.737151851613952, 3.003790984301397),
		new google.maps.LatLng(42.737107800804978, 3.003577524654701),
		new google.maps.LatLng(42.737085330354169, 3.003340892792557),
		new google.maps.LatLng(42.737075445103251, 3.00316646736093),
		new google.maps.LatLng(42.737075450620175, 3.002995702623216),
		new google.maps.LatLng(42.737078151270623, 3.002860311011065),
		new google.maps.LatLng(42.737089843679435, 3.002718820735335),
		new google.maps.LatLng(42.737112326403825, 3.002537078837721),
		new google.maps.LatLng(42.737150094739775, 3.002334602562371),
		new google.maps.LatLng(42.73718786179267, 3.00218091483246),
		new google.maps.LatLng(42.737221131739545, 3.002083335924331),
		new google.maps.LatLng(42.737275081864659, 3.001960142475977),
		new google.maps.LatLng(42.737358703780224, 3.001816214796043),
		new google.maps.LatLng(42.73746480438394, 3.001649111058282),
		new google.maps.LatLng(42.737671609296378, 3.001341737078271),
		new google.maps.LatLng(42.737936857211913, 3.00092824276361),
		new google.maps.LatLng(42.738117585784309, 3.000661115221289),
		new google.maps.LatLng(42.73830190937295, 3.00038910827494),
		new google.maps.LatLng(42.738452064757425, 3.000176867715509)
	],
	[
		new google.maps.LatLng(42.737675941498445, 3.006053675685725),
		new google.maps.LatLng(42.737671448771934, 3.006010982735101),
		new google.maps.LatLng(42.737632795936499, 3.005825575598698),
		new google.maps.LatLng(42.737468291920322, 3.005091265259111),
		new google.maps.LatLng(42.737349628217579, 3.004622868926464)
	],
	[
		new google.maps.LatLng(42.737858260997932, 3.008972591656172),
		new google.maps.LatLng(42.737833995847211, 3.008840853728227),
		new google.maps.LatLng(42.737814229711674, 3.008654226910071),
		new google.maps.LatLng(42.737795371989378, 3.008352942067146),
		new google.maps.LatLng(42.737783704024203, 3.008087031748435),
		new google.maps.LatLng(42.737779215874689, 3.007977253193473),
		new google.maps.LatLng(42.737751391308947, 3.007296620890061),
		new google.maps.LatLng(42.737718168900685, 3.006606231757123),
		new google.maps.LatLng(42.737685827883169, 3.006125642195895),
		new google.maps.LatLng(42.737675941498445, 3.006053675685725)
	],
	[
		new google.maps.LatLng(42.769453903847705, 3.012663156210607),
		new google.maps.LatLng(42.769371228218588, 3.012257956949297),
		new google.maps.LatLng(42.769216646866781, 3.011590353500025),
		new google.maps.LatLng(42.768862506653548, 3.010333255570808),
		new google.maps.LatLng(42.768401383259487, 3.008696609548019),
		new google.maps.LatLng(42.767979791218622, 3.007155185779198),
		new google.maps.LatLng(42.7679402397373, 3.006990427293763)
	],
	[
		new google.maps.LatLng(42.738171091913706, 3.009745975257335),
		new google.maps.LatLng(42.738118951925458, 3.009637407332846),
		new google.maps.LatLng(42.738047931241212, 3.009522737544104),
		new google.maps.LatLng(42.737973317129274, 3.009358056768553),
		new google.maps.LatLng(42.73791488672363, 3.009204356979748),
		new google.maps.LatLng(42.737867248018695, 3.009021384728812),
		new google.maps.LatLng(42.737858260997932, 3.008972591656172)
	],
	[
		new google.maps.LatLng(42.738171091913706, 3.009745975257335),
		new google.maps.LatLng(42.738140520928191, 3.00975694867342),
		new google.maps.LatLng(42.738121638299248, 3.009764263700147)
	],
	[
		new google.maps.LatLng(42.738121638299248, 3.009764263700147),
		new google.maps.LatLng(42.738044309963719, 3.009793525920571),
		new google.maps.LatLng(42.737989460782288, 3.009815472426048),
		new google.maps.LatLng(42.737962485628699, 3.00982400620437)
	],
	[
		new google.maps.LatLng(42.737962485628699, 3.00982400620437),
		new google.maps.LatLng(42.737930115815253, 3.009836198108261)
	],
	[
		new google.maps.LatLng(42.737930115815253, 3.009836198108261),
		new google.maps.LatLng(42.737887855559634, 3.009850828565403)
	],
	[
		new google.maps.LatLng(42.737887855559634, 3.009850828565403),
		new google.maps.LatLng(42.737820417853115, 3.009875211872759),
		new google.maps.LatLng(42.737814990986443, 3.009876525114605),
		new google.maps.LatLng(42.737694536687947, 3.009905684891137),
		new google.maps.LatLng(42.737615411561244, 3.009922748246508),
		new google.maps.LatLng(42.737577647236222, 3.009926401164195)
	],
	[
		new google.maps.LatLng(42.737577647236222, 3.009926401164195),
		new google.maps.LatLng(42.737443675554765, 3.00993491645062),
		new google.maps.LatLng(42.737286327093685, 3.009940987831345),
		new google.maps.LatLng(42.736999502247343, 3.009951916149451),
		new google.maps.LatLng(42.736863731568526, 3.009973849111338),
		new google.maps.LatLng(42.736796295050262, 3.009994572959116),
		new google.maps.LatLng(42.736718065570358, 3.010043348756168),
		new google.maps.LatLng(42.736638935557096, 3.01011530025038),
		new google.maps.LatLng(42.736580484090112, 3.01019091387222),
		new google.maps.LatLng(42.736532822181964, 3.010276287039674),
		new google.maps.LatLng(42.736495948577662, 3.01037507867945),
		new google.maps.LatLng(42.736474356768689, 3.010503147678643),
		new google.maps.LatLng(42.736445567080686, 3.010681223601852),
		new google.maps.LatLng(42.736444667265872, 3.010686102389475),
		new google.maps.LatLng(42.736418576206603, 3.010845882893082),
		new google.maps.LatLng(42.736393386163762, 3.010986147666991),
		new google.maps.LatLng(42.73637089699362, 3.011095919150239),
		new google.maps.LatLng(42.73634391200919, 3.011194713052642),
		new google.maps.LatLng(42.736321425899945, 3.01127155187955),
		new google.maps.LatLng(42.736284552648385, 3.011358145874714),
		new google.maps.LatLng(42.736245880983454, 3.011441079323073),
		new google.maps.LatLng(42.736183829672335, 3.011549624185861),
		new google.maps.LatLng(42.736064227003986, 3.011715482475567),
		new google.maps.LatLng(42.735884375042296, 3.011943535440062),
		new google.maps.LatLng(42.73572790493666, 3.012130120530554),
		new google.maps.LatLng(42.735580425770578, 3.012321585341255),
		new google.maps.LatLng(42.73538978138545, 3.012564267935131),
		new google.maps.LatLng(42.73529266170101, 3.01268499829447)
	],
	[
		new google.maps.LatLng(42.727190771552316, 3.011331980931539),
		new google.maps.LatLng(42.727180879491854, 3.011350272115607),
		new google.maps.LatLng(42.727159298107104, 3.011372219501613),
		new google.maps.LatLng(42.727133222702612, 3.011384409626816),
		new google.maps.LatLng(42.727093660599358, 3.011386840847622),
		new google.maps.LatLng(42.727045108954307, 3.011375855660868)
	],
	[
		new google.maps.LatLng(42.727190771552316, 3.011331980931539),
		new google.maps.LatLng(42.727255501305393, 3.011401507700572),
		new google.maps.LatLng(42.727323830368732, 3.011442984575505),
		new google.maps.LatLng(42.727447004633333, 3.01149666912829),
		new google.maps.LatLng(42.727663683978008, 3.011588178694396),
		new google.maps.LatLng(42.727786857048514, 3.011652839001406),
		new google.maps.LatLng(42.727821920892772, 3.011673578524096),
		new google.maps.LatLng(42.727856984733208, 3.011694318070178),
		new google.maps.LatLng(42.727879461008129, 3.011707738467222),
		new google.maps.LatLng(42.728006228901585, 3.011788254629769),
		new google.maps.LatLng(42.728111417415633, 3.011869985642524),
		new google.maps.LatLng(42.728267852578156, 3.01198221771546),
		new google.maps.LatLng(42.728459351000701, 3.012118848771386),
		new google.maps.LatLng(42.728571735076834, 3.012174972082711),
		new google.maps.LatLng(42.728650853969484, 3.012211576934077)
	],
	[
		new google.maps.LatLng(42.728650853969484, 3.012211576934077),
		new google.maps.LatLng(42.728687717734118, 3.012220120977703)
	],
	[
		new google.maps.LatLng(42.728687717734118, 3.012220120977703),
		new google.maps.LatLng(42.72873087404205, 3.012231106052162),
		new google.maps.LatLng(42.728768636131647, 3.012240871406932)
	],
	[
		new google.maps.LatLng(42.728768636131647, 3.012240871406932),
		new google.maps.LatLng(42.728802801950501, 3.012248195060246)
	],
	[
		new google.maps.LatLng(42.728802801950501, 3.012248195060246),
		new google.maps.LatLng(42.728882822015535, 3.012267725494687),
		new google.maps.LatLng(42.729196609323196, 3.012338527093205),
		new google.maps.LatLng(42.729286520004401, 3.012354401263121),
		new google.maps.LatLng(42.729601207830278, 3.012405690327904),
		new google.maps.LatLng(42.729656952561051, 3.012415459531262),
		new google.maps.LatLng(42.73002019344311, 3.012471638644219),
		new google.maps.LatLng(42.730101113620748, 3.012483851657548),
		new google.maps.LatLng(42.730334881826863, 3.012525368753738),
		new google.maps.LatLng(42.730398718696421, 3.012537578441058),
		new google.maps.LatLng(42.730530886747303, 3.012568097204201),
		new google.maps.LatLng(42.730739475679776, 3.012641319376773)
	],
	[
		new google.maps.LatLng(42.730739475679776, 3.012641319376773),
		new google.maps.LatLng(42.730891419960798, 3.012709650687117)
	],
	[
		new google.maps.LatLng(42.769996353124348, 3.01726677056037),
		new google.maps.LatLng(42.770046711131677, 3.017239935243712),
		new google.maps.LatLng(42.770106065312959, 3.017177710506225),
		new google.maps.LatLng(42.770137546324619, 3.017111815826063),
		new google.maps.LatLng(42.770133978933146, 3.016928749395051),
		new google.maps.LatLng(42.770085521929332, 3.016297766499995),
		new google.maps.LatLng(42.770036129373672, 3.015890126607431),
		new google.maps.LatLng(42.769945407272445, 3.015249371937272),
		new google.maps.LatLng(42.769865451996594, 3.014750192318675),
		new google.maps.LatLng(42.769821432381434, 3.014460937272821),
		new google.maps.LatLng(42.769776506752144, 3.014219281102222),
		new google.maps.LatLng(42.769514112527425, 3.012954851810923),
		new google.maps.LatLng(42.769453903847705, 3.012663156210607)
	],
	[
		new google.maps.LatLng(42.73529266170101, 3.01268499829447),
		new google.maps.LatLng(42.735269280680257, 3.012713046589031),
		new google.maps.LatLng(42.735166764630193, 3.012842313030327),
		new google.maps.LatLng(42.735067845727322, 3.012956943293933),
		new google.maps.LatLng(42.734982418904295, 3.013039864269953),
		new google.maps.LatLng(42.734911380887489, 3.013091076333347),
		new google.maps.LatLng(42.734834949205364, 3.013136188309208),
		new google.maps.LatLng(42.734767511113184, 3.013165445647734),
		new google.maps.LatLng(42.734752225071396, 3.013170321207703)
	],
	[
		new google.maps.LatLng(42.730891419960798, 3.012709650687117),
		new google.maps.LatLng(42.730895915578003, 3.012712091473135),
		new google.maps.LatLng(42.73106763604013, 3.012818235429961),
		new google.maps.LatLng(42.731233960531341, 3.012937795729128),
		new google.maps.LatLng(42.731374211214792, 3.013045154204321),
		new google.maps.LatLng(42.731414667881609, 3.01307687388948),
		new google.maps.LatLng(42.731595373977797, 3.013233027213499),
		new google.maps.LatLng(42.731810241247246, 3.01342577877814)
	],
	[
		new google.maps.LatLng(42.734752225071396, 3.013170321207703),
		new google.maps.LatLng(42.734719855031237, 3.013181290723483)
	],
	[
		new google.maps.LatLng(42.734719855031237, 3.013181290723483),
		new google.maps.LatLng(42.734675795900678, 3.013193477743959),
		new google.maps.LatLng(42.734625442924489, 3.013206883410206)
	],
	[
		new google.maps.LatLng(42.734625442924489, 3.013206883410206),
		new google.maps.LatLng(42.734602963679095, 3.013212976197608)
	],
	[
		new google.maps.LatLng(42.734602963679095, 3.013212976197608),
		new google.maps.LatLng(42.734281963531998, 3.013303160727793),
		new google.maps.LatLng(42.733687615159418, 3.013485976110539),
		new google.maps.LatLng(42.733615682094118, 3.013506694090565),
		new google.maps.LatLng(42.733342337394788, 3.013584689987857),
		new google.maps.LatLng(42.733167001655573, 3.013627337270726),
		new google.maps.LatLng(42.732981778148471, 3.013649247476443),
		new google.maps.LatLng(42.732832521257912, 3.013660189425316)
	],
	[
		new google.maps.LatLng(42.731810241247246, 3.01342577877814),
		new google.maps.LatLng(42.731841715260714, 3.013386758180199),
		new google.maps.LatLng(42.731874985546035, 3.013368470991141),
		new google.maps.LatLng(42.731917245133261, 3.013363602748071),
		new google.maps.LatLng(42.731957705331368, 3.013372148704679),
		new google.maps.LatLng(42.731985575356838, 3.013396548901369),
		new google.maps.LatLng(42.732014341966405, 3.013436802607348),
		new google.maps.LatLng(42.732026024975575, 3.013479493762329),
		new google.maps.LatLng(42.732026020497031, 3.01351730256564),
		new google.maps.LatLng(42.732021517794166, 3.013574624762095)
	],
	[
		new google.maps.LatLng(42.732832521257912, 3.013660189425316),
		new google.maps.LatLng(42.732803749011765, 3.013660183079022),
		new google.maps.LatLng(42.732626619082545, 3.013672337561836),
		new google.maps.LatLng(42.732428810785414, 3.013672291450411),
		new google.maps.LatLng(42.732285850222873, 3.013661281479095),
		new google.maps.LatLng(42.7321671696903, 3.013627102616239),
		new google.maps.LatLng(42.732057481650898, 3.01358682974862),
		new google.maps.LatLng(42.732021517794166, 3.013574624762095)
	],
	[
		new google.maps.LatLng(42.769996353124348, 3.01726677056037),
		new google.maps.LatLng(42.770008014009463, 3.017444958519016),
		new google.maps.LatLng(42.770016987471109, 3.017552359679473),
		new google.maps.LatLng(42.770017009051287, 3.017552528311148),
		new google.maps.LatLng(42.770026865996158, 3.017628030182508),
		new google.maps.LatLng(42.770035844927222, 3.01770491993373),
		new google.maps.LatLng(42.770039436323493, 3.017737872617503),
		new google.maps.LatLng(42.77006636869698, 3.017994173145392)
	],
	[
		new google.maps.LatLng(42.770218965854269, 3.019481941401387),
		new google.maps.LatLng(42.770215441445785, 3.01907675363469),
		new google.maps.LatLng(42.770216454975099, 3.01842625776901),
		new google.maps.LatLng(42.770203892360577, 3.018272476779575),
		new google.maps.LatLng(42.770157145327303, 3.018218762930496),
		new google.maps.LatLng(42.770100512538967, 3.018136976168125),
		new google.maps.LatLng(42.770072652217465, 3.018052756540898),
		new google.maps.LatLng(42.77006636869698, 3.017994173145392)
	],
	[
		new google.maps.LatLng(42.770225598115211, 3.022352427919913),
		new google.maps.LatLng(42.770224919332598, 3.021269894014919),
		new google.maps.LatLng(42.770224937717018, 3.021180801966191),
		new google.maps.LatLng(42.77022603196842, 3.020165392884098),
		new google.maps.LatLng(42.770218965854269, 3.019481941401387)
	],
	[
		new google.maps.LatLng(42.754632684417288, 3.021293477266825),
		new google.maps.LatLng(42.754934812075447, 3.021221600472724),
		new google.maps.LatLng(42.755400589138517, 3.021130260801828),
		new google.maps.LatLng(42.755804323840557, 3.021040116651363),
		new google.maps.LatLng(42.75615141255345, 3.020954831430179),
		new google.maps.LatLng(42.756467925824076, 3.020889057029525)
	],
	[
		new google.maps.LatLng(42.756467925824076, 3.020889057029525),
		new google.maps.LatLng(42.756463401447469, 3.021034254351586),
		new google.maps.LatLng(42.756437291861189, 3.021206286509296),
		new google.maps.LatLng(42.75643814767912, 3.021424694593625),
		new google.maps.LatLng(42.756443526389319, 3.02150766772289),
		new google.maps.LatLng(42.756454285974925, 3.021656530373037),
		new google.maps.LatLng(42.756500107230622, 3.021831029700464),
		new google.maps.LatLng(42.756765159706312, 3.022774313123234),
		new google.maps.LatLng(42.756914302313319, 3.023313684723165),
		new google.maps.LatLng(42.756943032850714, 3.023507702324296)
	],
	[
		new google.maps.LatLng(42.753818022762083, 3.02146643288071),
		new google.maps.LatLng(42.753941211680846, 3.021434756556881),
		new google.maps.LatLng(42.754567944517667, 3.021297113751252),
		new google.maps.LatLng(42.75460121393737, 3.021294685619997),
		new google.maps.LatLng(42.754632684417288, 3.021293477266825)
	],
	[
		new google.maps.LatLng(42.752909877576805, 3.02130314728419),
		new google.maps.LatLng(42.752911712591782, 3.021316029552089),
		new google.maps.LatLng(42.752938651490666, 3.021495391109124),
		new google.maps.LatLng(42.752969182249387, 3.021693055915435),
		new google.maps.LatLng(42.753042017128152, 3.02167600116866),
		new google.maps.LatLng(42.753333355760603, 3.021598024896891),
		new google.maps.LatLng(42.753818022762083, 3.02146643288071)
	],
	[
		new google.maps.LatLng(42.752911712591782, 3.021316029552089),
		new google.maps.LatLng(42.752880241193459, 3.021322118097959),
		new google.maps.LatLng(42.752867652225738, 3.021325773634894)
	],
	[
		new google.maps.LatLng(42.752867652225738, 3.021325773634894),
		new google.maps.LatLng(42.752706698231229, 3.021363537184523)
	],
	[
		new google.maps.LatLng(42.752706698231229, 3.021363537184523),
		new google.maps.LatLng(42.752605989189483, 3.021387901072888),
		new google.maps.LatLng(42.752485498581031, 3.021413478397643),
		new google.maps.LatLng(42.752294871414946, 3.021454891043684),
		new google.maps.LatLng(42.752251710390404, 3.021464635242297)
	],
	[
		new google.maps.LatLng(42.752251710390404, 3.021464635242297),
		new google.maps.LatLng(42.752255289900575, 3.021550041621906),
		new google.maps.LatLng(42.752246284766358, 3.021615921639106),
		new google.maps.LatLng(42.752241770133125, 3.021709865206254),
		new google.maps.LatLng(42.752235464605754, 3.021767206112834),
		new google.maps.LatLng(42.752214776456185, 3.021806240325128),
		new google.maps.LatLng(42.752134740087016, 3.021867213767219),
		new google.maps.LatLng(42.752025932469664, 3.021918415298146),
		new google.maps.LatLng(42.751934213888035, 3.02194888293402),
		new google.maps.LatLng(42.751793041986652, 3.021976891014583),
		new google.maps.LatLng(42.751552063071443, 3.022014621318017),
		new google.maps.LatLng(42.751254435844722, 3.02206453081475),
		new google.maps.LatLng(42.750902859538165, 3.022120518527062),
		new google.maps.LatLng(42.750642097084267, 3.022169221093074),
		new google.maps.LatLng(42.750435287124667, 3.022203302473386),
		new google.maps.LatLng(42.750211391793094, 3.02224347782975),
		new google.maps.LatLng(42.750146651067638, 3.022255654016743),
		new google.maps.LatLng(42.749932644497108, 3.022303153177065),
		new google.maps.LatLng(42.749509128064794, 3.02239815091784),
		new google.maps.LatLng(42.749240271787414, 3.022457828479658),
		new google.maps.LatLng(42.749113488346033, 3.022482178534593),
		new google.maps.LatLng(42.749055041041011, 3.022495576832104),
		new google.maps.LatLng(42.748668391853855, 3.022580826770719),
		new google.maps.LatLng(42.748563187355664, 3.022601525830791)
	],
	[
		new google.maps.LatLng(42.773984057174957, 3.029890599426584),
		new google.maps.LatLng(42.773738658410437, 3.029629282444086),
		new google.maps.LatLng(42.773135490204282, 3.029007738265685),
		new google.maps.LatLng(42.773094140397461, 3.028962559187784),
		new google.maps.LatLng(42.772666258855622, 3.028514424924428),
		new google.maps.LatLng(42.772556591792842, 3.028398423642333),
		new google.maps.LatLng(42.772031626843052, 3.027845289018035),
		new google.maps.LatLng(42.771608251693699, 3.027338590366863),
		new google.maps.LatLng(42.77126128877007, 3.02688929618717),
		new google.maps.LatLng(42.77125230109317, 3.026875866726968),
		new google.maps.LatLng(42.771032093527751, 3.026525493292351),
		new google.maps.LatLng(42.770820000044516, 3.026083591432531),
		new google.maps.LatLng(42.770790343053768, 3.026020113812318),
		new google.maps.LatLng(42.770619604521499, 3.025597761493495),
		new google.maps.LatLng(42.770473168027387, 3.025059479426114),
		new google.maps.LatLng(42.770459694172409, 3.0250008920345),
		new google.maps.LatLng(42.770369875220901, 3.024581019560664),
		new google.maps.LatLng(42.770298947122711, 3.024115999244916),
		new google.maps.LatLng(42.770292665429814, 3.02406351733883),
		new google.maps.LatLng(42.770244205588995, 3.023637563288185),
		new google.maps.LatLng(42.77022001221814, 3.023251892555986),
		new google.maps.LatLng(42.770225551173141, 3.02257698910396),
		new google.maps.LatLng(42.770225598115211, 3.022352427919913)
	],
	[
		new google.maps.LatLng(42.748563187355664, 3.022601525830791),
		new google.maps.LatLng(42.748439101770394, 3.022622216700381),
		new google.maps.LatLng(42.748341086191175, 3.022663658039744),
		new google.maps.LatLng(42.748011086452316, 3.022730628832415),
		new google.maps.LatLng(42.747735937411051, 3.022789079705416),
		new google.maps.LatLng(42.747449997365962, 3.022849966592926),
		new google.maps.LatLng(42.747160459528565, 3.022916950404875),
		new google.maps.LatLng(42.746894302462572, 3.022969302970125),
		new google.maps.LatLng(42.746684792062347, 3.023018019083194),
		new google.maps.LatLng(42.746586780923316, 3.023041158674233),
		new google.maps.LatLng(42.746439313501781, 3.023076479706687),
		new google.maps.LatLng(42.746213619624619, 3.023122747366418),
		new google.maps.LatLng(42.745962746908084, 3.02317998488168),
		new google.maps.LatLng(42.745688498429871, 3.023231112044565),
		new google.maps.LatLng(42.745627354096371, 3.023243287659568),
		new google.maps.LatLng(42.745406156764247, 3.023285896364333),
		new google.maps.LatLng(42.745114821049619, 3.023351655036959),
		new google.maps.LatLng(42.7447920137529, 3.023423500994719),
		new google.maps.LatLng(42.744611276982489, 3.023468564218528),
		new google.maps.LatLng(42.744508769094253, 3.023495361215414),
		new google.maps.LatLng(42.744055580299751, 3.023601309231345),
		new google.maps.LatLng(42.743716586357358, 3.023685343428152),
		new google.maps.LatLng(42.74336410559048, 3.023769371527619),
		new google.maps.LatLng(42.743043993493835, 3.023853412361037),
		new google.maps.LatLng(42.742810208482815, 3.023896012251051),
		new google.maps.LatLng(42.742768845923109, 3.02390575395009)
	],
	[
		new google.maps.LatLng(42.756943032850714, 3.023507702324296),
		new google.maps.LatLng(42.756946623582543, 3.02353576781695),
		new google.maps.LatLng(42.756950193048688, 3.023657785593871),
		new google.maps.LatLng(42.756931285676465, 3.023771254080804),
		new google.maps.LatLng(42.756894382138476, 3.023944501433573)
	],
	[
		new google.maps.LatLng(42.740751987531411, 3.024328205142827),
		new google.maps.LatLng(42.740947113038359, 3.024268514985676),
		new google.maps.LatLng(42.741311280742245, 3.02419181717188),
		new google.maps.LatLng(42.741662853628554, 3.024145608598514),
		new google.maps.LatLng(42.742035112090598, 3.024076232006248),
		new google.maps.LatLng(42.742455027792097, 3.023992234806608),
		new google.maps.LatLng(42.742710399058957, 3.023920368474424)
	],
	[
		new google.maps.LatLng(42.756894382138476, 3.023944501433573),
		new google.maps.LatLng(42.756879963917335, 3.024088475240295),
		new google.maps.LatLng(42.756881737312533, 3.024199510664311),
		new google.maps.LatLng(42.756900590471169, 3.024326416133234),
		new google.maps.LatLng(42.756927544896264, 3.024415498422618),
		new google.maps.LatLng(42.756967077703905, 3.024546073586102),
		new google.maps.LatLng(42.757124322819706, 3.025001263092098),
		new google.maps.LatLng(42.757208772345564, 3.025302681226102),
		new google.maps.LatLng(42.757243780538779, 3.02554917165701),
		new google.maps.LatLng(42.757243724542619, 3.025785884148266),
		new google.maps.LatLng(42.75722207395421, 3.026076275169621),
		new google.maps.LatLng(42.757169829919185, 3.026456945454545)
	],
	[
		new google.maps.LatLng(42.740417332806167, 3.025089232720864),
		new google.maps.LatLng(42.740499166928799, 3.025036815332111),
		new google.maps.LatLng(42.740550436502673, 3.024955108652486),
		new google.maps.LatLng(42.740590926111757, 3.024833144448295),
		new google.maps.LatLng(42.740632335383218, 3.024620913291052),
		new google.maps.LatLng(42.740672825421072, 3.024495288334318),
		new google.maps.LatLng(42.740751987531411, 3.024328205142827)
	],
	[
		new google.maps.LatLng(42.737296490942732, 3.02486345204002),
		new google.maps.LatLng(42.737306381704833, 3.024861017116343),
		new google.maps.LatLng(42.737353136583188, 3.024861037107788),
		new google.maps.LatLng(42.737432254366105, 3.024887905316835),
		new google.maps.LatLng(42.73750956505561, 3.024948926056047),
		new google.maps.LatLng(42.73758418077847, 3.025003847984146),
		new google.maps.LatLng(42.737645319898093, 3.025012411901959),
		new google.maps.LatLng(42.737773900667648, 3.024989292328796),
		new google.maps.LatLng(42.73862272567348, 3.024807909520335),
		new google.maps.LatLng(42.739861793261078, 3.02454617909197),
		new google.maps.LatLng(42.73989056680054, 3.024540091174086),
		new google.maps.LatLng(42.739987678425464, 3.024519396323192),
		new google.maps.LatLng(42.740026359690638, 3.024511475417716),
		new google.maps.LatLng(42.740094680535684, 3.024497483985981)
	],
	[
		new google.maps.LatLng(42.740094680535684, 3.024497483985981),
		new google.maps.LatLng(42.740127886516717, 3.024768296398242),
		new google.maps.LatLng(42.740142230552053, 3.024948835028039),
		new google.maps.LatLng(42.740152978042218, 3.025128152167942),
		new google.maps.LatLng(42.740165551707449, 3.025190368447742)
	],
	[
		new google.maps.LatLng(42.737101362654684, 3.024934114846427),
		new google.maps.LatLng(42.73713733141458, 3.024918273502488),
		new google.maps.LatLng(42.737185890339696, 3.024893899255956),
		new google.maps.LatLng(42.737253331262494, 3.024869532554031),
		new google.maps.LatLng(42.737296490942732, 3.02486345204002)
	],
	[
		new google.maps.LatLng(42.737022228496656, 3.024977991438308),
		new google.maps.LatLng(42.737046509752581, 3.024959705323218),
		new google.maps.LatLng(42.737101362654684, 3.024934114846427)
	],
	[
		new google.maps.LatLng(42.736900819409634, 3.025090156542338),
		new google.maps.LatLng(42.736961976056612, 3.025023096819837),
		new google.maps.LatLng(42.737022228496656, 3.024977991438308)
	],
	[
		new google.maps.LatLng(42.740417332806167, 3.025089232720864),
		new google.maps.LatLng(42.740357983463717, 3.025117262843391)
	],
	[
		new google.maps.LatLng(42.736900819409634, 3.025090156542338),
		new google.maps.LatLng(42.736984416962059, 3.02518167352883),
		new google.maps.LatLng(42.737098580788292, 3.02529393926915),
		new google.maps.LatLng(42.737191169676763, 3.025386680564624),
		new google.maps.LatLng(42.737258584148393, 3.025473312715257),
		new google.maps.LatLng(42.737304424847949, 3.025535539874961),
		new google.maps.LatLng(42.73734486925175, 3.025606302865364),
		new google.maps.LatLng(42.737391597060316, 3.025718542035416),
		new google.maps.LatLng(42.737464377802191, 3.025919833502934),
		new google.maps.LatLng(42.737700680393402, 3.02661398376821),
		new google.maps.LatLng(42.737883958173825, 3.027191016152342),
		new google.maps.LatLng(42.738039391610776, 3.027646062749661),
		new google.maps.LatLng(42.738200216967769, 3.028107213236031),
		new google.maps.LatLng(42.738329601553048, 3.028450032115867),
		new google.maps.LatLng(42.738344875154375, 3.028493952189461),
		new google.maps.LatLng(42.738502105194428, 3.028936807912655),
		new google.maps.LatLng(42.738619803975901, 3.029257669268471),
		new google.maps.LatLng(42.738706054487402, 3.029500449661271),
		new google.maps.LatLng(42.738795901646363, 3.029740792283281),
		new google.maps.LatLng(42.738888438148216, 3.030005533804596),
		new google.maps.LatLng(42.738909998736183, 3.030072633306452)
	],
	[
		new google.maps.LatLng(42.740215009495181, 3.025168432597258),
		new google.maps.LatLng(42.7402833489137, 3.025144066588559),
		new google.maps.LatLng(42.740357983463717, 3.025117262843391)
	],
	[
		new google.maps.LatLng(42.740165551707449, 3.025190368447742),
		new google.maps.LatLng(42.740215009495181, 3.025168432597258)
	],
	[
		new google.maps.LatLng(42.757169829919185, 3.026456945454545),
		new google.maps.LatLng(42.757097782540328, 3.0269217966634),
		new google.maps.LatLng(42.757019446900642, 3.027356140175085),
		new google.maps.LatLng(42.756995991233161, 3.027656289916373),
		new google.maps.LatLng(42.756999526185112, 3.027894223524266),
		new google.maps.LatLng(42.756997692153796, 3.028030880901983)
	],
	[
		new google.maps.LatLng(42.716205977818667, 3.02755156418116),
		new google.maps.LatLng(42.716145713912582, 3.027642983617546),
		new google.maps.LatLng(42.716119613300073, 3.027744174076661),
		new google.maps.LatLng(42.716063839167333, 3.027856324207041),
		new google.maps.LatLng(42.716022447473811, 3.027979453716282)
	],
	[
		new google.maps.LatLng(42.716278206386818, 3.029791476635277),
		new google.maps.LatLng(42.716255752481885, 3.029707332412217),
		new google.maps.LatLng(42.716182972236417, 3.029532933869167),
		new google.maps.LatLng(42.716093121233143, 3.029312193523992),
		new google.maps.LatLng(42.716076085028831, 3.029139042983777),
		new google.maps.LatLng(42.716066264175431, 3.028884202025193),
		new google.maps.LatLng(42.716045634777892, 3.028695199584761),
		new google.maps.LatLng(42.716003467789115, 3.028352553195843),
		new google.maps.LatLng(42.715984631705112, 3.028181840407541),
		new google.maps.LatLng(42.715990954912471, 3.028069667085632),
		new google.maps.LatLng(42.716022447473811, 3.027979453716282)
	],
	[
		new google.maps.LatLng(42.756997692153796, 3.028030880901983),
		new google.maps.LatLng(42.756981491136187, 3.028093101643075),
		new google.maps.LatLng(42.756953605979163, 3.028139454914165),
		new google.maps.LatLng(42.756853779509662, 3.028218717585087),
		new google.maps.LatLng(42.756780030720535, 3.028287010387265),
		new google.maps.LatLng(42.756685597254751, 3.028374815705697),
		new google.maps.LatLng(42.756599248819903, 3.028488248790875),
		new google.maps.LatLng(42.756568657812196, 3.028561442649726)
	],
	[
		new google.maps.LatLng(42.756568657812196, 3.028561442649726),
		new google.maps.LatLng(42.756563233192409, 3.028674915186761),
		new google.maps.LatLng(42.75660631816384, 3.028950691923096),
		new google.maps.LatLng(42.756731108072209, 3.029651126978251),
		new google.maps.LatLng(42.756822667856639, 3.030202686321264),
		new google.maps.LatLng(42.756878329654974, 3.030504095903278),
		new google.maps.LatLng(42.7568998859836, 3.030585857962963),
		new google.maps.LatLng(42.756960994143284, 3.030704246927312),
		new google.maps.LatLng(42.757092198867284, 3.030952010416907),
		new google.maps.LatLng(42.757158705536121, 3.031056980320907),
		new google.maps.LatLng(42.757218942967157, 3.031075314854746),
		new google.maps.LatLng(42.757265698985741, 3.031074119095128),
		new google.maps.LatLng(42.757309770037494, 3.031031437602687),
		new google.maps.LatLng(42.757410516914312, 3.030885070238584),
		new google.maps.LatLng(42.757491461947929, 3.030810682359726),
		new google.maps.LatLng(42.757523833193773, 3.030804598631508)
	],
	[
		new google.maps.LatLng(42.720154184485182, 3.030201956803284),
		new google.maps.LatLng(42.719962673677358, 3.03019697967933),
		new google.maps.LatLng(42.719565263972811, 3.030194334322071),
		new google.maps.LatLng(42.719241582125846, 3.030194166779814),
		new google.maps.LatLng(42.719088731959616, 3.030192867692473),
		new google.maps.LatLng(42.718637383423697, 3.030162150557736),
		new google.maps.LatLng(42.718353270537399, 3.030135176712873),
		new google.maps.LatLng(42.718228297406938, 3.030121699410951),
		new google.maps.LatLng(42.718136586460382, 3.030124090514223),
		new google.maps.LatLng(42.717960364015838, 3.030108147795809),
		new google.maps.LatLng(42.717650169227589, 3.030106768813368),
		new google.maps.LatLng(42.717545875040379, 3.03009330176743),
		new google.maps.LatLng(42.71746046893707, 3.030060335367677),
		new google.maps.LatLng(42.717376862247754, 3.0300212740451),
		new google.maps.LatLng(42.717336402539672, 3.030018813886714),
		new google.maps.LatLng(42.717296834219113, 3.030043180666647),
		new google.maps.LatLng(42.717210508932894, 3.030078496797763),
		new google.maps.LatLng(42.717119695084044, 3.030089423543061),
		new google.maps.LatLng(42.717035182930395, 3.030073528149267),
		new google.maps.LatLng(42.716912916536721, 3.030027130394708),
		new google.maps.LatLng(42.716602752067857, 3.029917232278818),
		new google.maps.LatLng(42.716335749424601, 3.02979394481932),
		new google.maps.LatLng(42.716278206386818, 3.029791476635277)
	],
	[
		new google.maps.LatLng(42.720896909378077, 3.030013333289808),
		new google.maps.LatLng(42.720783628496648, 3.029984009702618),
		new google.maps.LatLng(42.720700913531871, 3.029970552622944),
		new google.maps.LatLng(42.720636174242905, 3.029980275474726),
		new google.maps.LatLng(42.720580421344764, 3.030007072753123),
		new google.maps.LatLng(42.720522863290697, 3.030058258774143),
		new google.maps.LatLng(42.720468902714948, 3.030105787269485),
		new google.maps.LatLng(42.720404153092467, 3.030154530155243),
		new google.maps.LatLng(42.720338506676036, 3.03019351593176),
		new google.maps.LatLng(42.720289049700291, 3.030211781563581),
		new google.maps.LatLng(42.720253085253553, 3.030211762801755),
		new google.maps.LatLng(42.720208129989558, 3.030208081711944)
	],
	[
		new google.maps.LatLng(42.775326102686073, 3.031318112601524),
		new google.maps.LatLng(42.775009691837248, 3.030989616801508),
		new google.maps.LatLng(42.774302266120436, 3.030230069682846),
		new google.maps.LatLng(42.7741081054901, 3.030022479521887)
	],
	[
		new google.maps.LatLng(42.722517966196754, 3.030214158071139),
		new google.maps.LatLng(42.722341739701569, 3.030210407937019),
		new google.maps.LatLng(42.7220387391448, 3.030201714530298),
		new google.maps.LatLng(42.721727654549198, 3.030161312283135),
		new google.maps.LatLng(42.721505579805424, 3.030133149972192),
		new google.maps.LatLng(42.721286203125892, 3.030104990395462),
		new google.maps.LatLng(42.720976027416889, 3.030031665229324),
		new google.maps.LatLng(42.720896909378077, 3.030013333289808)
	],
	[
		new google.maps.LatLng(42.738909998736183, 3.030072633306452),
		new google.maps.LatLng(42.738957609928107, 3.030225131114356),
		new google.maps.LatLng(42.738998936564876, 3.030345912246167),
		new google.maps.LatLng(42.739036667927252, 3.030458152346495),
		new google.maps.LatLng(42.739063620957253, 3.030531354066975),
		new google.maps.LatLng(42.739097770844801, 3.030593581010292),
		new google.maps.LatLng(42.73914989948657, 3.030666795329587),
		new google.maps.LatLng(42.739266754068005, 3.030782737959298),
		new google.maps.LatLng(42.739406082187671, 3.030913329769719),
		new google.maps.LatLng(42.739507660007291, 3.03099633027834),
		new google.maps.LatLng(42.739674862646929, 3.031123279217381),
		new google.maps.LatLng(42.739831268301018, 3.031273398113976),
		new google.maps.LatLng(42.739971492182057, 3.031414972447468),
		new google.maps.LatLng(42.740155768625044, 3.031571207578156),
		new google.maps.LatLng(42.740238466216752, 3.031649320056449),
		new google.maps.LatLng(42.740324759263196, 3.031731094938233),
		new google.maps.LatLng(42.740447901115019, 3.031862902905883),
		new google.maps.LatLng(42.740476665491393, 3.031890974372442)
	],
	[
		new google.maps.LatLng(42.72310151944594, 3.030129098535242),
		new google.maps.LatLng(42.723046657879607, 3.030182726173547),
		new google.maps.LatLng(42.722996301813126, 3.030203430505593),
		new google.maps.LatLng(42.722898293061107, 3.030218013901479),
		new google.maps.LatLng(42.72265642953333, 3.03021788736207),
		new google.maps.LatLng(42.722517966196754, 3.030214158071139)
	],
	[
		new google.maps.LatLng(42.723135654868123, 3.030240086940863),
		new google.maps.LatLng(42.723104207587092, 3.030163245089092),
		new google.maps.LatLng(42.72310151944594, 3.030129098535242)
	],
	[
		new google.maps.LatLng(42.720208129989558, 3.030208081711944),
		new google.maps.LatLng(42.720181157075778, 3.030205629116587),
		new google.maps.LatLng(42.720154184485182, 3.030201956803284)
	],
	[
		new google.maps.LatLng(42.722832307358587, 3.03143377181025),
		new google.maps.LatLng(42.722847609214689, 3.031377684656328),
		new google.maps.LatLng(42.723135654868123, 3.030240086940863)
	],
	[
		new google.maps.LatLng(42.757951666628131, 3.034296997941769),
		new google.maps.LatLng(42.757944508369455, 3.034187177795914),
		new google.maps.LatLng(42.75791578108263, 3.034043178911375),
		new google.maps.LatLng(42.75790957480919, 3.033767412907237),
		new google.maps.LatLng(42.757895384111819, 3.033141450141311),
		new google.maps.LatLng(42.757896337817101, 3.032963303240886),
		new google.maps.LatLng(42.757923348338529, 3.032847400381095),
		new google.maps.LatLng(42.757988134922769, 3.032688813311311),
		new google.maps.LatLng(42.758033150119964, 3.032500929209271),
		new google.maps.LatLng(42.758070079868261, 3.032287416908856),
		new google.maps.LatLng(42.75808094895892, 3.032021421743668),
		new google.maps.LatLng(42.7580675215195, 3.031822523839058),
		new google.maps.LatLng(42.75800286909746, 3.031529643520432),
		new google.maps.LatLng(42.757928326381624, 3.03123431789446),
		new google.maps.LatLng(42.757866338952475, 3.031047596053055),
		new google.maps.LatLng(42.757807022673596, 3.030952389806768),
		new google.maps.LatLng(42.757717124945927, 3.030892553297665),
		new google.maps.LatLng(42.757619134126898, 3.030835152626667),
		new google.maps.LatLng(42.757588567530128, 3.030819275115274)
	],
	[
		new google.maps.LatLng(42.777931307592347, 3.036020068101076),
		new google.maps.LatLng(42.777826259007803, 3.035557393835076),
		new google.maps.LatLng(42.777663705708996, 3.034962861991895),
		new google.maps.LatLng(42.77760891344888, 3.034789504179323),
		new google.maps.LatLng(42.777473276217435, 3.034363435614933),
		new google.maps.LatLng(42.777452611921198, 3.034312158235861),
		new google.maps.LatLng(42.777261239715678, 3.033838455624084),
		new google.maps.LatLng(42.777214512155048, 3.033746883818923),
		new google.maps.LatLng(42.777024008045913, 3.03336595083796),
		new google.maps.LatLng(42.776848758532942, 3.033083895407207),
		new google.maps.LatLng(42.776788544524713, 3.032986214632575),
		new google.maps.LatLng(42.776555758326538, 3.032665071658626),
		new google.maps.LatLng(42.776506325481343, 3.032595470427515),
		new google.maps.LatLng(42.776233080057729, 3.032260881430562),
		new google.maps.LatLng(42.776004768507484, 3.032008097688201),
		new google.maps.LatLng(42.775755776213714, 3.031750423157451),
		new google.maps.LatLng(42.775486104379205, 3.031486636123666),
		new google.maps.LatLng(42.775326102686073, 3.031318112601524)
	],
	[
		new google.maps.LatLng(42.722832307358587, 3.03143377181025),
		new google.maps.LatLng(42.722824205507507, 3.031467911569968),
		new google.maps.LatLng(42.722620768419901, 3.032260441837861),
		new google.maps.LatLng(42.722531650794714, 3.032605494267432),
		new google.maps.LatLng(42.722514547719946, 3.032671335574417),
		new google.maps.LatLng(42.722342602642541, 3.033361441685738),
		new google.maps.LatLng(42.72233360085491, 3.033395580438432)
	],
	[
		new google.maps.LatLng(42.740476665491393, 3.031890974372442),
		new google.maps.LatLng(42.740468508515079, 3.032108097861364),
		new google.maps.LatLng(42.740432418235088, 3.032520377006504)
	],
	[
		new google.maps.LatLng(42.740432418235088, 3.032520377006504),
		new google.maps.LatLng(42.740430610815345, 3.032550871720326),
		new google.maps.LatLng(42.740414338554238, 3.032839959387055),
		new google.maps.LatLng(42.740400775486876, 3.03308513505771),
		new google.maps.LatLng(42.740447490585161, 3.033215682321351)
	],
	[
		new google.maps.LatLng(42.740447490585161, 3.033215682321351),
		new google.maps.LatLng(42.740422192539505, 3.033608449517512)
	],
	[
		new google.maps.LatLng(42.72233360085491, 3.033395580438432),
		new google.maps.LatLng(42.722234582321271, 3.033765013363507),
		new google.maps.LatLng(42.72220757203845, 3.033879625620918),
		new google.maps.LatLng(42.722212049974324, 3.033936940954371),
		new google.maps.LatLng(42.722226423043573, 3.033974752875341)
	],
	[
		new google.maps.LatLng(42.738902686769649, 3.033503890361015),
		new google.maps.LatLng(42.738986317932039, 3.033467345086039),
		new google.maps.LatLng(42.739069941381281, 3.033453975365681),
		new google.maps.LatLng(42.739220099620582, 3.033445523143696),
		new google.maps.LatLng(42.739457465473791, 3.033462736415758),
		new google.maps.LatLng(42.739864754230332, 3.033525180819475)
	],
	[
		new google.maps.LatLng(42.738872083500503, 3.033607554494608),
		new google.maps.LatLng(42.738883777477319, 3.033590484477938),
		new google.maps.LatLng(42.738890976825608, 3.033572191928608),
		new google.maps.LatLng(42.738899074987096, 3.033552679772665),
		new google.maps.LatLng(42.738903577334376, 3.03353072670657),
		new google.maps.LatLng(42.738902686769649, 3.033503890361015)
	],
	[
		new google.maps.LatLng(42.739864754230332, 3.033525180819475),
		new google.maps.LatLng(42.74005446350413, 3.033553346107994),
		new google.maps.LatLng(42.740422192539505, 3.033608449517512)
	],
	[
		new google.maps.LatLng(42.738765980424006, 3.033624570799379),
		new google.maps.LatLng(42.738775869572734, 3.033628235208849),
		new google.maps.LatLng(42.738786657718443, 3.033633120194993),
		new google.maps.LatLng(42.738799245298146, 3.03363556720662),
		new google.maps.LatLng(42.738813630691901, 3.03363801519582),
		new google.maps.LatLng(42.738824420637094, 3.033636802190286),
		new google.maps.LatLng(42.73883610993979, 3.033635588451498),
		new google.maps.LatLng(42.738847800681945, 3.033629496801762),
		new google.maps.LatLng(42.738859492143639, 3.033620964972826),
		new google.maps.LatLng(42.738872083500503, 3.033607554494608)
	],
	[
		new google.maps.LatLng(42.738358076001028, 3.03547595387684),
		new google.maps.LatLng(42.738388646423431, 3.035474752531901),
		new google.maps.LatLng(42.738434503217164, 3.035473561163758),
		new google.maps.LatLng(42.738477665735118, 3.035460169881186),
		new google.maps.LatLng(42.738521731401484, 3.035434581940422),
		new google.maps.LatLng(42.738543325496444, 3.035389462237015),
		new google.maps.LatLng(42.73855233633352, 3.035330919296253),
		new google.maps.LatLng(42.738617511820365, 3.033979440565335),
		new google.maps.LatLng(42.738638226837409, 3.033867233484449),
		new google.maps.LatLng(42.738676919866393, 3.033773332519416),
		new google.maps.LatLng(42.738729098674447, 3.033679438771704),
		new google.maps.LatLng(42.738765980424006, 3.033624570799379)
	],
	[
		new google.maps.LatLng(42.767120517818974, 3.033743469840583),
		new google.maps.LatLng(42.767101442324702, 3.03435242830778),
		new google.maps.LatLng(42.767046316617069, 3.035206659339587),
		new google.maps.LatLng(42.767050761684324, 3.0353592094273),
		new google.maps.LatLng(42.76706052749936, 3.035735091675666),
		new google.maps.LatLng(42.767052304458694, 3.036126827038712),
		new google.maps.LatLng(42.767022528680506, 3.036431903419075),
		new google.maps.LatLng(42.767013507807, 3.036517323616567)
	],
	[
		new google.maps.LatLng(42.767120517818974, 3.033743469840583),
		new google.maps.LatLng(42.76719151047304, 3.033872871483084),
		new google.maps.LatLng(42.767294865626766, 3.034025479869773),
		new google.maps.LatLng(42.7673658564972, 3.034159763579933),
		new google.maps.LatLng(42.767412564730762, 3.034308677075115),
		new google.maps.LatLng(42.767518574961144, 3.034589428740005),
		new google.maps.LatLng(42.767625505416255, 3.034805501794149),
		new google.maps.LatLng(42.767692905950568, 3.034916597493485),
		new google.maps.LatLng(42.767765720483787, 3.034969118331514),
		new google.maps.LatLng(42.767839443490651, 3.034994790175729),
		new google.maps.LatLng(42.767980611546143, 3.03499487609893),
		new google.maps.LatLng(42.7681208748497, 3.035009604609425),
		new google.maps.LatLng(42.768211680104322, 3.03504138965481),
		new google.maps.LatLng(42.768291683103286, 3.03510856073831),
		new google.maps.LatLng(42.768358186621668, 3.035211113983693),
		new google.maps.LatLng(42.768413906306286, 3.035297797457866),
		new google.maps.LatLng(42.768453450609094, 3.03535395992698),
		new google.maps.LatLng(42.768504695298986, 3.035375957646975),
		new google.maps.LatLng(42.768560444331328, 3.03537355060554)
	],
	[
		new google.maps.LatLng(42.723100955413734, 3.034944730415522),
		new google.maps.LatLng(42.722887907927941, 3.034810463154771),
		new google.maps.LatLng(42.722426747436828, 3.034535813024887),
		new google.maps.LatLng(42.722248751274151, 3.034445468524796),
		new google.maps.LatLng(42.72224968923355, 3.034323525859982),
		new google.maps.LatLng(42.722255148886411, 3.034121102176963),
		new google.maps.LatLng(42.722245289616609, 3.03402354147129),
		new google.maps.LatLng(42.722226423043573, 3.033974752875341)
	],
	[
		new google.maps.LatLng(42.757951666628131, 3.034296997941769),
		new google.maps.LatLng(42.757911922201416, 3.034860700883116),
		new google.maps.LatLng(42.757862312564924, 3.035337762893553),
		new google.maps.LatLng(42.757865812154826, 3.035631829352352)
	],
	[
		new google.maps.LatLng(42.723062980745382, 3.035587360820794),
		new google.maps.LatLng(42.723021682165324, 3.035405636757205),
		new google.maps.LatLng(42.723025315684254, 3.03529222889485),
		new google.maps.LatLng(42.723073968237351, 3.03498617542441),
		new google.maps.LatLng(42.723100955413734, 3.034944730415522)
	],
	[
		new google.maps.LatLng(42.733865185176981, 3.035256113217813),
		new google.maps.LatLng(42.733763559034031, 3.035330451447243),
		new google.maps.LatLng(42.733684422127965, 3.035373092403644),
		new google.maps.LatLng(42.733607988441058, 3.035396219917895),
		new google.maps.LatLng(42.733444340940004, 3.035411976382461),
		new google.maps.LatLng(42.733103565511968, 3.035428844085633),
		new google.maps.LatLng(42.732758294561748, 3.035444489061629),
		new google.maps.LatLng(42.732618028496269, 3.035451721252268),
		new google.maps.LatLng(42.732415721291744, 3.035461355369642)
	],
	[
		new google.maps.LatLng(42.733928101195751, 3.035326892669216),
		new google.maps.LatLng(42.733898432010037, 3.035321995781151),
		new google.maps.LatLng(42.733876861521047, 3.035293929802001),
		new google.maps.LatLng(42.733865185176981, 3.035256113217813)
	],
	[
		new google.maps.LatLng(42.768560444331328, 3.03537355060554),
		new google.maps.LatLng(42.768633288848626, 3.035334542836188),
		new google.maps.LatLng(42.768714223097732, 3.035304080662914),
		new google.maps.LatLng(42.768814932214497, 3.035294378781899),
		new google.maps.LatLng(42.76902262787651, 3.035327455665173),
		new google.maps.LatLng(42.769072076885443, 3.035339690731576)
	],
	[
		new google.maps.LatLng(42.769072076885443, 3.035339690731576),
		new google.maps.LatLng(42.76939394889822, 3.035422875361658),
		new google.maps.LatLng(42.769506337444831, 3.035443690239099),
		new google.maps.LatLng(42.769639404596525, 3.035468180348869),
		new google.maps.LatLng(42.76987318442125, 3.03547442514756),
		new google.maps.LatLng(42.770131248998069, 3.035456275921264),
		new google.maps.LatLng(42.770468432571555, 3.035463804348521),
		new google.maps.LatLng(42.770796616133822, 3.035492075022815),
		new google.maps.LatLng(42.770947671062395, 3.035505592021916)
	],
	[
		new google.maps.LatLng(42.733928101195751, 3.035326892669216),
		new google.maps.LatLng(42.733929879946778, 3.035385438625398),
		new google.maps.LatLng(42.733932547778174, 3.035476916319605),
		new google.maps.LatLng(42.733949531350866, 3.035775748367016),
		new google.maps.LatLng(42.733952212296664, 3.035824537384778)
	],
	[
		new google.maps.LatLng(42.728540523321847, 3.035337038174405),
		new google.maps.LatLng(42.728491071989701, 3.035334568970198),
		new google.maps.LatLng(42.728173682176418, 3.035331937152507),
		new google.maps.LatLng(42.727725018246041, 3.035332885205137),
		new google.maps.LatLng(42.727529008591837, 3.035332766061264)
	],
	[
		new google.maps.LatLng(42.726333172957531, 3.035334478394918),
		new google.maps.LatLng(42.72593126553361, 3.035333015849341),
		new google.maps.LatLng(42.725746045823882, 3.035331683033283),
		new google.maps.LatLng(42.725678611580371, 3.035332861953648),
		new google.maps.LatLng(42.725618365341397, 3.035347459415368),
		new google.maps.LatLng(42.725538333319591, 3.03537911823663),
		new google.maps.LatLng(42.72546729027539, 3.035416880018564)
	],
	[
		new google.maps.LatLng(42.727529008591837, 3.035332766061264),
		new google.maps.LatLng(42.727170257566193, 3.035334986470951),
		new google.maps.LatLng(42.72701021322564, 3.035334890281749),
		new google.maps.LatLng(42.726779138492233, 3.035334749907475)
	],
	[
		new google.maps.LatLng(42.726779138492233, 3.035334749907475),
		new google.maps.LatLng(42.72656604641687, 3.035334619793222),
		new google.maps.LatLng(42.726333172957531, 3.035334478394918)
	],
	[
		new google.maps.LatLng(42.728826430071294, 3.035383555936859),
		new google.maps.LatLng(42.728785073434807, 3.03537377440909),
		new google.maps.LatLng(42.728650213924084, 3.035344422525601),
		new google.maps.LatLng(42.728540523321847, 3.035337038174405)
	],
	[
		new google.maps.LatLng(42.730144484940844, 3.035577054623794),
		new google.maps.LatLng(42.729957462920389, 3.035590355248667),
		new google.maps.LatLng(42.729750660907307, 3.035596327409116),
		new google.maps.LatLng(42.72959960838466, 3.035596234487362),
		new google.maps.LatLng(42.729471935773617, 3.035583960850141),
		new google.maps.LatLng(42.729344269908523, 3.035555832214402),
		new google.maps.LatLng(42.729204022946121, 3.035504524511877),
		new google.maps.LatLng(42.7290359053397, 3.035445881716779),
		new google.maps.LatLng(42.728913637572802, 3.035405561386197),
		new google.maps.LatLng(42.728826430071294, 3.035383555936859)
	],
	[
		new google.maps.LatLng(42.72546729027539, 3.035416880018564),
		new google.maps.LatLng(42.725468168104804, 3.035480294321603),
		new google.maps.LatLng(42.725451067177353, 3.035533942154711),
		new google.maps.LatLng(42.725419583520328, 3.035576605720864),
		new google.maps.LatLng(42.725380015945177, 3.035594874236457),
		new google.maps.LatLng(42.725335959472758, 3.035593627874799),
		new google.maps.LatLng(42.725312585886549, 3.035582638488362)
	],
	[
		new google.maps.LatLng(42.732415721291744, 3.035461355369642),
		new google.maps.LatLng(42.731969745555745, 3.035483037183518),
		new google.maps.LatLng(42.731904108025525, 3.035487875720715)
	],
	[
		new google.maps.LatLng(42.738358076001028, 3.03547595387684),
		new google.maps.LatLng(42.738403900439309, 3.035569905505688),
		new google.maps.LatLng(42.738429037213194, 3.035685799475555),
		new google.maps.LatLng(42.738434392645978, 3.035804121042527),
		new google.maps.LatLng(42.738432593682241, 3.03580777902196),
		new google.maps.LatLng(42.738375008904178, 3.035927281728296),
		new google.maps.LatLng(42.738337206129344, 3.036044356791895),
		new google.maps.LatLng(42.738325485255835, 3.036139491642288),
		new google.maps.LatLng(42.738347021429185, 3.036266361853761),
		new google.maps.LatLng(42.738400028929533, 3.036389592852689),
		new google.maps.LatLng(42.738417079215289, 3.036487184845499),
		new google.maps.LatLng(42.738412558074657, 3.036560368656386),
		new google.maps.LatLng(42.738351405619234, 3.036593264907109),
		new google.maps.LatLng(42.738221022222199, 3.036621237398951),
		new google.maps.LatLng(42.737900918000136, 3.036656409362106),
		new google.maps.LatLng(42.737261599920949, 3.036757245607629),
		new google.maps.LatLng(42.736933415246781, 3.036760697529844)
	],
	[
		new google.maps.LatLng(42.770947671062395, 3.035505592021916),
		new google.maps.LatLng(42.771049273826996, 3.03551419659236),
		new google.maps.LatLng(42.77140082807319, 3.035568112888138),
		new google.maps.LatLng(42.771591440613683, 3.035597520043782),
		new google.maps.LatLng(42.771746969367904, 3.035675725668463),
		new google.maps.LatLng(42.771918694067871, 3.035720988383125),
		new google.maps.LatLng(42.772019405997398, 3.035705184189826)
	],
	[
		new google.maps.LatLng(42.731904108025525, 3.035487875720715),
		new google.maps.LatLng(42.731356529178868, 3.035518033611321),
		new google.maps.LatLng(42.730918646708275, 3.035539719290522)
	],
	[
		new google.maps.LatLng(42.730918646708275, 3.035539719290522),
		new google.maps.LatLng(42.730597652932971, 3.035555378254951),
		new google.maps.LatLng(42.730398042854894, 3.035565013268281)
	],
	[
		new google.maps.LatLng(42.730398042854894, 3.035565013268281),
		new google.maps.LatLng(42.730190341251863, 3.035574643571763),
		new google.maps.LatLng(42.730144484940844, 3.035577054623794)
	],
	[
		new google.maps.LatLng(42.725312585886549, 3.035582638488362),
		new google.maps.LatLng(42.725262193330124, 3.035708215677399),
		new google.maps.LatLng(42.725237884158261, 3.035806980251256),
		new google.maps.LatLng(42.725235158324814, 3.035892344119863)
	],
	[
		new google.maps.LatLng(42.723062980745382, 3.035587360820794),
		new google.maps.LatLng(42.723044049588793, 3.035738560800515),
		new google.maps.LatLng(42.723005270332635, 3.036086081909026),
		new google.maps.LatLng(42.722996257160069, 3.036150707704941),
		new google.maps.LatLng(42.722974650717767, 3.036233616651343),
		new google.maps.LatLng(42.722936858197031, 3.036320174154136),
		new google.maps.LatLng(42.722808247572466, 3.036426185985774)
	],
	[
		new google.maps.LatLng(42.758429099301004, 3.037047602121378),
		new google.maps.LatLng(42.758285259618702, 3.036976739684247),
		new google.maps.LatLng(42.758169303083747, 3.036876610266511),
		new google.maps.LatLng(42.758064168602097, 3.03668375413529),
		new google.maps.LatLng(42.757902580958472, 3.035919816496865),
		new google.maps.LatLng(42.757865812154826, 3.035631829352352)
	],
	[
		new google.maps.LatLng(42.772117418715283, 3.035693039399602),
		new google.maps.LatLng(42.772191151842406, 3.035685762334814),
		new google.maps.LatLng(42.772364683402778, 3.03570783709835),
		new google.maps.LatLng(42.772622733423745, 3.035736066993674),
		new google.maps.LatLng(42.772823247703755, 3.035731308292031),
		new google.maps.LatLng(42.773065107957528, 3.035775395393493),
		new google.maps.LatLng(42.77324761460401, 3.035847517566685),
		new google.maps.LatLng(42.773328517977447, 3.035909812607663)
	],
	[
		new google.maps.LatLng(42.772019405997398, 3.035705184189826),
		new google.maps.LatLng(42.772085047503403, 3.035695460996577),
		new google.maps.LatLng(42.772117418715283, 3.035693039399602)
	],
	[
		new google.maps.LatLng(42.734005811283865, 3.036853984879247),
		new google.maps.LatLng(42.733998681236322, 3.036669808107014),
		new google.maps.LatLng(42.733952212296664, 3.035824537384778)
	],
	[
		new google.maps.LatLng(42.724851235453933, 3.0358847905588),
		new google.maps.LatLng(42.724762223152659, 3.035882296925103),
		new google.maps.LatLng(42.724655224728629, 3.035890766275868),
		new google.maps.LatLng(42.724551811941076, 3.035930946549051)
	],
	[
		new google.maps.LatLng(42.773328517977447, 3.035909812607663),
		new google.maps.LatLng(42.773386049801921, 3.035955007122618),
		new google.maps.LatLng(42.773497499123273, 3.036092994613965),
		new google.maps.LatLng(42.773627816240733, 3.036274931740245)
	],
	[
		new google.maps.LatLng(42.725235158324814, 3.035892344119863),
		new google.maps.LatLng(42.724851235453933, 3.0358847905588)
	],
	[
		new google.maps.LatLng(42.724551811941076, 3.035930946549051),
		new google.maps.LatLng(42.72448525599745, 3.035993098487525),
		new google.maps.LatLng(42.724436667112137, 3.036101602336945),
		new google.maps.LatLng(42.724405150837732, 3.036240604991449),
		new google.maps.LatLng(42.72439880416389, 3.036395474853773),
		new google.maps.LatLng(42.724393355855341, 3.036552784822204),
		new google.maps.LatLng(42.724365452554004, 3.036641789569156)
	],
	[
		new google.maps.LatLng(42.778125181861341, 3.037034513875808),
		new google.maps.LatLng(42.778110825211385, 3.036946621511222),
		new google.maps.LatLng(42.77797889164853, 3.03623248265562),
		new google.maps.LatLng(42.777931307592347, 3.036020068101076)
	],
	[
		new google.maps.LatLng(42.773627816240733, 3.036274931740245),
		new google.maps.LatLng(42.773714104095241, 3.036370185721418),
		new google.maps.LatLng(42.773809399989695, 3.036414183610168),
		new google.maps.LatLng(42.773895724642415, 3.036399592380164),
		new google.maps.LatLng(42.773944282191813, 3.036392298700311),
		new google.maps.LatLng(42.774064783773895, 3.036353317951726),
		new google.maps.LatLng(42.774164589678485, 3.03635582181201),
		new google.maps.LatLng(42.774350700247403, 3.036403538220023),
		new google.maps.LatLng(42.774618618767612, 3.036498907940841),
		new google.maps.LatLng(42.774853286039033, 3.03654177427574),
		new google.maps.LatLng(42.775114037486915, 3.036561465977703),
		new google.maps.LatLng(42.775486279400411, 3.036597096730064),
		new google.maps.LatLng(42.775762307609305, 3.036643650974122),
		new google.maps.LatLng(42.776013141767528, 3.036739013767913),
		new google.maps.LatLng(42.776094051830704, 3.036781784486149)
	],
	[
		new google.maps.LatLng(42.723656037280008, 3.03666573272197),
		new google.maps.LatLng(42.72348428036171, 3.036738792560768),
		new google.maps.LatLng(42.723326917405572, 3.036787470998779),
		new google.maps.LatLng(42.723220814207096, 3.036805696145825),
		new google.maps.LatLng(42.723169564278287, 3.036805663250783),
		new google.maps.LatLng(42.723061683568211, 3.036766572371525),
		new google.maps.LatLng(42.722960105589742, 3.036699439075321),
		new google.maps.LatLng(42.722897192943975, 3.036626232436635),
		new google.maps.LatLng(42.722828009600853, 3.036481073958293),
		new google.maps.LatLng(42.722808247572466, 3.036426185985774)
	],
	[
		new google.maps.LatLng(42.767013507807, 3.036517323616567),
		new google.maps.LatLng(42.766973802559839, 3.036932227134416),
		new google.maps.LatLng(42.766956651806133, 3.037126255079876)
	],
	[
		new google.maps.LatLng(42.724365452554004, 3.036641789569156),
		new google.maps.LatLng(42.724324072347144, 3.036702736894182),
		new google.maps.LatLng(42.72426741369614, 3.036741724751527),
		new google.maps.LatLng(42.72420268143582, 3.036730709374495),
		new google.maps.LatLng(42.724065142937555, 3.036651355641695),
		new google.maps.LatLng(42.723968956901111, 3.036591540961877),
		new google.maps.LatLng(42.723906022049512, 3.03658174665055),
		new google.maps.LatLng(42.723871851124784, 3.03659513931359)
	],
	[
		new google.maps.LatLng(42.723824189780203, 3.036617058873439),
		new google.maps.LatLng(42.723871851124784, 3.03659513931359)
	],
	[
		new google.maps.LatLng(42.723656037280008, 3.03666573272197),
		new google.maps.LatLng(42.723824189780203, 3.036617058873439)
	],
	[
		new google.maps.LatLng(42.776094051830704, 3.036781784486149),
		new google.maps.LatLng(42.776259468137773, 3.036870990878554),
		new google.maps.LatLng(42.776611873961699, 3.03706406556092),
		new google.maps.LatLng(42.77682135135553, 3.037147198164578),
		new google.maps.LatLng(42.777007466022702, 3.037183935102631),
		new google.maps.LatLng(42.777194496057625, 3.03717428927622),
		new google.maps.LatLng(42.777545182986373, 3.03713789638454),
		new google.maps.LatLng(42.777691756261632, 3.037112357401705)
	],
	[
		new google.maps.LatLng(42.736933415246781, 3.036760697529844),
		new google.maps.LatLng(42.73643797772602, 3.03680673446123)
	],
	[
		new google.maps.LatLng(42.73643797772602, 3.03680673446123),
		new google.maps.LatLng(42.7358724085734, 3.036849067610658)
	],
	[
		new google.maps.LatLng(42.7358724085734, 3.036849067610658),
		new google.maps.LatLng(42.735397653266467, 3.03689023772858)
	],
	[
		new google.maps.LatLng(42.734012946978311, 3.037019866683759),
		new google.maps.LatLng(42.734005811283865, 3.036853984879247)
	],
	[
		new google.maps.LatLng(42.735397653266467, 3.03689023772858),
		new google.maps.LatLng(42.735378770866468, 3.036891445279421),
		new google.maps.LatLng(42.734944474334732, 3.036939957720992),
		new google.maps.LatLng(42.734501191926313, 3.036970168957299),
		new google.maps.LatLng(42.734012946978311, 3.037019866683759)
	],
	[
		new google.maps.LatLng(42.777691756261632, 3.037112357401705),
		new google.maps.LatLng(42.777896778984328, 3.037077090124931),
		new google.maps.LatLng(42.777957026245119, 3.037067364232422),
		new google.maps.LatLng(42.778125181861341, 3.037034513875808)
	],
	[
		new google.maps.LatLng(42.759936051154021, 3.03712177577035),
		new google.maps.LatLng(42.759331830863815, 3.037094545510611),
		new google.maps.LatLng(42.758714124486403, 3.037062427008851),
		new google.maps.LatLng(42.758429099301004, 3.037047602121378)
	],
	[
		new google.maps.LatLng(42.764786087919269, 3.037123649521606),
		new google.maps.LatLng(42.764662902916818, 3.037124791352309),
		new google.maps.LatLng(42.76421512083806, 3.037131827995558),
		new google.maps.LatLng(42.763734074285466, 3.037127859368058),
		new google.maps.LatLng(42.763356432904274, 3.037115416147581),
		new google.maps.LatLng(42.76319008676127, 3.037122631264324),
		new google.maps.LatLng(42.763034524211243, 3.037148158845212),
		new google.maps.LatLng(42.762743169243144, 3.037233392615366),
		new google.maps.LatLng(42.762583107094279, 3.037267458475935),
		new google.maps.LatLng(42.762487796667628, 3.03726861676201)
	],
	[
		new google.maps.LatLng(42.766026925419091, 3.037119560098607),
		new google.maps.LatLng(42.765830010343791, 3.0371182140596),
		new google.maps.LatLng(42.765490126982861, 3.037124098650178)
	],
	[
		new google.maps.LatLng(42.766956651806133, 3.037126255079876),
		new google.maps.LatLng(42.766883820285358, 3.037126208951358),
		new google.maps.LatLng(42.766747149677322, 3.037121240756359),
		new google.maps.LatLng(42.766204058685169, 3.037119673655139),
		new google.maps.LatLng(42.766026925419091, 3.037119560098607)
	],
	[
		new google.maps.LatLng(42.765490126982861, 3.037124098650178),
		new google.maps.LatLng(42.765402908078151, 3.037125263286333),
		new google.maps.LatLng(42.764975810269362, 3.037121330652603),
		new google.maps.LatLng(42.764786087919269, 3.037123649521606)
	],
	[
		new google.maps.LatLng(42.760651763959387, 3.037158840059207),
		new google.maps.LatLng(42.760542967875686, 3.037153889022517),
		new google.maps.LatLng(42.76006372841055, 3.03712917903936),
		new google.maps.LatLng(42.759936051154021, 3.03712177577035)
	],
	[
		new google.maps.LatLng(42.761353089718909, 3.03719589533863),
		new google.maps.LatLng(42.761093239872579, 3.037182306074476),
		new google.maps.LatLng(42.760651763959387, 3.037158840059207)
	],
	[
		new google.maps.LatLng(42.762487796667628, 3.03726861676201),
		new google.maps.LatLng(42.762453629278156, 3.03726859496937),
		new google.maps.LatLng(42.762266609224959, 3.037255052655708),
		new google.maps.LatLng(42.761986079541344, 3.037239009412181),
		new google.maps.LatLng(42.761573378630466, 3.037207018642237),
		new google.maps.LatLng(42.761353089718909, 3.03719589533863)
	]
];

var circuit_9 = [
	[
		new google.maps.LatLng(42.819634112417212, 2.712246499807624),
		new google.maps.LatLng(42.819723901047411, 2.71219719604044),
		new google.maps.LatLng(42.819810142095562, 2.712166231588483),
		new google.maps.LatLng(42.820054523334925, 2.712090509476349),
		new google.maps.LatLng(42.820302524370788, 2.712023320603909),
		new google.maps.LatLng(42.820328617140142, 2.712029299055652)
	],
	[
		new google.maps.LatLng(42.820328617140142, 2.712029299055652),
		new google.maps.LatLng(42.820347513877472, 2.712034090539387),
		new google.maps.LatLng(42.820374568151017, 2.712063273229313),
		new google.maps.LatLng(42.820381905693374, 2.712116983040148),
		new google.maps.LatLng(42.820386507310559, 2.712156048815708),
		new google.maps.LatLng(42.820418876634562, 2.712490580459457),
		new google.maps.LatLng(42.820430994531101, 2.712650538133518),
		new google.maps.LatLng(42.820457336278061, 2.712749349429673),
		new google.maps.LatLng(42.820497057656048, 2.71280778604422),
		new google.maps.LatLng(42.820753966100561, 2.713044711748902),
		new google.maps.LatLng(42.821005368233216, 2.713240135152972),
		new google.maps.LatLng(42.82114227514252, 2.71332496562232),
		new google.maps.LatLng(42.821296292250608, 2.713419484836336),
		new google.maps.LatLng(42.821482674104224, 2.713511402576947),
		new google.maps.LatLng(42.821585243998101, 2.713534105996062),
		new google.maps.LatLng(42.82165087912238, 2.713531338932416),
		new google.maps.LatLng(42.82171108572571, 2.713516384598548),
		new google.maps.LatLng(42.82177395788672, 2.713489200571324),
		new google.maps.LatLng(42.821842163324646, 2.713438781298642)
	],
	[
		new google.maps.LatLng(42.819387299506175, 2.712421172640955),
		new google.maps.LatLng(42.819423201776445, 2.712396564652316),
		new google.maps.LatLng(42.819486923251169, 2.712351054913725),
		new google.maps.LatLng(42.819602702914224, 2.712269862930221),
		new google.maps.LatLng(42.819634112417212, 2.712246499807624)
	],
	[
		new google.maps.LatLng(42.819029764971148, 2.713560136088355),
		new google.maps.LatLng(42.819068240893365, 2.713489100553598),
		new google.maps.LatLng(42.819085065038827, 2.713391299344064),
		new google.maps.LatLng(42.819106230768945, 2.713236067608305),
		new google.maps.LatLng(42.819112230968621, 2.71312610457725),
		new google.maps.LatLng(42.819136951070291, 2.712954975574391),
		new google.maps.LatLng(42.819163537759223, 2.712809488153078),
		new google.maps.LatLng(42.819183120475657, 2.712734880826371),
		new google.maps.LatLng(42.819242091056211, 2.712594119644458),
		new google.maps.LatLng(42.819299407187238, 2.71250711136399),
		new google.maps.LatLng(42.819387299506175, 2.712421172640955)
	],
	[
		new google.maps.LatLng(42.814717136480574, 2.714218949286308),
		new google.maps.LatLng(42.814957761114044, 2.714083412872429),
		new google.maps.LatLng(42.814998143379093, 2.714052678912393),
		new google.maps.LatLng(42.815051994733096, 2.714014551817803),
		new google.maps.LatLng(42.81518394402547, 2.713927183534302),
		new google.maps.LatLng(42.815398375229535, 2.71374780304705),
		new google.maps.LatLng(42.815577819178877, 2.713599129691162),
		new google.maps.LatLng(42.815699848663677, 2.713500816114701),
		new google.maps.LatLng(42.815852400736773, 2.713384030377476),
		new google.maps.LatLng(42.81600941998321, 2.713256228794133),
		new google.maps.LatLng(42.816102779206915, 2.713197141094086),
		new google.maps.LatLng(42.816124337470043, 2.71318848489143),
		new google.maps.LatLng(42.816157571322243, 2.71317488560834),
		new google.maps.LatLng(42.816210610425259, 2.713169737248147),
		new google.maps.LatLng(42.816288016506412, 2.713197448689527),
		new google.maps.LatLng(42.816461711261823, 2.713252776895982),
		new google.maps.LatLng(42.816526488778315, 2.713265893678983)
	],
	[
		new google.maps.LatLng(42.816526488778315, 2.713265893678983),
		new google.maps.LatLng(42.816616486012492, 2.713294763750926),
		new google.maps.LatLng(42.816695651222098, 2.713307809024663),
		new google.maps.LatLng(42.816719046802184, 2.713313800172061),
		new google.maps.LatLng(42.81683505552266, 2.713318113492643),
		new google.maps.LatLng(42.816955556994515, 2.713321184367808),
		new google.maps.LatLng(42.817063532248767, 2.713347523225967),
		new google.maps.LatLng(42.817167044157763, 2.713386099266795),
		new google.maps.LatLng(42.817210231798718, 2.713395657578673),
		new google.maps.LatLng(42.817270516539139, 2.713410017131822),
		new google.maps.LatLng(42.817351450108902, 2.713412060922252),
		new google.maps.LatLng(42.817433251447461, 2.713401886684756),
		new google.maps.LatLng(42.817536596084338, 2.713378169565848),
		new google.maps.LatLng(42.817588716538424, 2.713365698075278),
		new google.maps.LatLng(42.817719011529974, 2.713332076594005),
		new google.maps.LatLng(42.817815212827796, 2.713326715939691),
		new google.maps.LatLng(42.817964569986493, 2.713360179858686),
		new google.maps.LatLng(42.81822643155008, 2.713432176598545),
		new google.maps.LatLng(42.818277724644993, 2.713446581753888),
		new google.maps.LatLng(42.81829841911587, 2.713451365182022),
		new google.maps.LatLng(42.818508078085451, 2.713505297846678),
		new google.maps.LatLng(42.818688960363595, 2.713558151049095),
		new google.maps.LatLng(42.818779840616727, 2.713580911326988),
		new google.maps.LatLng(42.818868861228438, 2.713580472143647),
		new google.maps.LatLng(42.81895876405472, 2.713573921716518),
		new google.maps.LatLng(42.819029764971148, 2.713560136088355)
	],
	[
		new google.maps.LatLng(42.821842163324646, 2.713438781298642),
		new google.maps.LatLng(42.822029333030564, 2.713489163330341),
		new google.maps.LatLng(42.822039227971452, 2.713490335554944),
		new google.maps.LatLng(42.822122885859436, 2.713502139670589),
		new google.maps.LatLng(42.822130982112242, 2.713503320231973),
		new google.maps.LatLng(42.822244368651347, 2.71353574402605),
		new google.maps.LatLng(42.822312737329689, 2.713546400989819),
		new google.maps.LatLng(42.822410720138322, 2.713534923297682),
		new google.maps.LatLng(42.822447564546763, 2.71352619184881),
		new google.maps.LatLng(42.822478117514358, 2.713518711280667),
		new google.maps.LatLng(42.822562574273938, 2.713492642549267),
		new google.maps.LatLng(42.822622699686441, 2.713447148294865)
	],
	[
		new google.maps.LatLng(42.822622699686441, 2.713447148294865),
		new google.maps.LatLng(42.822627388146422, 2.713519197495127)
	],
	[
		new google.maps.LatLng(42.822627388146422, 2.713519197495127),
		new google.maps.LatLng(42.822631069742108, 2.713550939785023),
		new google.maps.LatLng(42.822637501109547, 2.713602213651412),
		new google.maps.LatLng(42.822643919291828, 2.713648600594587),
		new google.maps.LatLng(42.82264851028792, 2.713684002713411)
	],
	[
		new google.maps.LatLng(42.82264851028792, 2.713684002713411),
		new google.maps.LatLng(42.822659734191582, 2.713846414015531),
		new google.maps.LatLng(42.822663164249512, 2.714121246434926),
		new google.maps.LatLng(42.822666066731827, 2.714198189759227),
		new google.maps.LatLng(42.822677693224307, 2.714512071796175),
		new google.maps.LatLng(42.822696450202109, 2.714802710267227),
		new google.maps.LatLng(42.822708604165229, 2.714977332657317),
		new google.maps.LatLng(42.822712298456118, 2.715013960792384)
	],
	[
		new google.maps.LatLng(42.814622837966972, 2.714263381819816),
		new google.maps.LatLng(42.81468031519718, 2.714236229040632),
		new google.maps.LatLng(42.814717136480574, 2.714218949286308)
	],
	[
		new google.maps.LatLng(42.813559996370067, 2.714606923449685),
		new google.maps.LatLng(42.813721431044421, 2.714448574911818),
		new google.maps.LatLng(42.81379861854407, 2.714394455842701),
		new google.maps.LatLng(42.813867803827726, 2.714374574038088),
		new google.maps.LatLng(42.81396126168238, 2.714352129597349),
		new google.maps.LatLng(42.814090774050541, 2.714362485315606),
		new google.maps.LatLng(42.814224753822053, 2.71436182742766),
		new google.maps.LatLng(42.81431915867941, 2.714357699782037),
		new google.maps.LatLng(42.814428808134984, 2.714337618648554),
		new google.maps.LatLng(42.814539317534788, 2.714302876854371),
		new google.maps.LatLng(42.814622837966972, 2.714263381819816)
	],
	[
		new google.maps.LatLng(42.812202650106649, 2.716471234373737),
		new google.maps.LatLng(42.812223334462736, 2.716472354984491),
		new google.maps.LatLng(42.81229518903924, 2.716441471100608),
		new google.maps.LatLng(42.812356221118222, 2.71639842620402),
		new google.maps.LatLng(42.812449604163071, 2.716347896242919),
		new google.maps.LatLng(42.812786348501952, 2.716175264665385),
		new google.maps.LatLng(42.812984830146561, 2.71608391578079),
		new google.maps.LatLng(42.813063774902687, 2.716013913506614),
		new google.maps.LatLng(42.813121086700775, 2.715924473997671),
		new google.maps.LatLng(42.81317376674977, 2.715783761023487),
		new google.maps.LatLng(42.813190682580696, 2.715720168187751),
		new google.maps.LatLng(42.81319424772925, 2.715707937404765),
		new google.maps.LatLng(42.813245895230814, 2.715517153304389),
		new google.maps.LatLng(42.813253023682549, 2.715492691699958),
		new google.maps.LatLng(42.813301100523766, 2.715311694962629),
		new google.maps.LatLng(42.813401875353179, 2.714997313082698),
		new google.maps.LatLng(42.81345711203538, 2.714804066835997),
		new google.maps.LatLng(42.81349732583233, 2.714709825563017),
		new google.maps.LatLng(42.813559996370067, 2.714606923449685)
	],
	[
		new google.maps.LatLng(42.822712298456118, 2.715013960792384),
		new google.maps.LatLng(42.822737300244128, 2.715286244566035),
		new google.maps.LatLng(42.8227437923221, 2.715360728010327),
		new google.maps.LatLng(42.822760419033088, 2.715526777809012),
		new google.maps.LatLng(42.822755395556584, 2.715667281470686),
		new google.maps.LatLng(42.822725292348387, 2.715844554093502),
		new google.maps.LatLng(42.822656694385451, 2.71608675600271)
	],
	[
		new google.maps.LatLng(42.822656694385451, 2.71608675600271),
		new google.maps.LatLng(42.822625587691441, 2.716224944134346),
		new google.maps.LatLng(42.82261067631493, 2.716366716974045),
		new google.maps.LatLng(42.822606729720128, 2.71657439918686),
		new google.maps.LatLng(42.822613550050221, 2.716773479825411),
		new google.maps.LatLng(42.822636580644861, 2.716982252965732),
		new google.maps.LatLng(42.822674353053586, 2.717325324341803),
		new google.maps.LatLng(42.822686438179936, 2.717475517366764),
		new google.maps.LatLng(42.822699461418281, 2.71764036349244),
		new google.maps.LatLng(42.822713524754604, 2.717858953373962),
		new google.maps.LatLng(42.822714815838175, 2.718007976511688),
		new google.maps.LatLng(42.822701684047658, 2.718143632256951),
		new google.maps.LatLng(42.822687640694156, 2.718274407545195),
		new google.maps.LatLng(42.822643155680318, 2.718455411854939),
		new google.maps.LatLng(42.822623549355065, 2.718522692369394)
	],
	[
		new google.maps.LatLng(42.810446436049112, 2.719176419901106),
		new google.maps.LatLng(42.810479606916331, 2.719138400100761),
		new google.maps.LatLng(42.810559433072378, 2.7190610727301),
		new google.maps.LatLng(42.810721622905604, 2.718845339991405),
		new google.maps.LatLng(42.810863118052843, 2.71862482031135),
		new google.maps.LatLng(42.810913328709759, 2.718569618751275),
		new google.maps.LatLng(42.810974299857691, 2.718503373246948),
		new google.maps.LatLng(42.811027988217987, 2.718402965567939),
		new google.maps.LatLng(42.811072610993321, 2.718274512603346),
		new google.maps.LatLng(42.811097284845857, 2.718082647191919),
		new google.maps.LatLng(42.811131087951104, 2.71794325316664),
		new google.maps.LatLng(42.811173837544722, 2.717786718086164),
		new google.maps.LatLng(42.811205148250863, 2.717725500319303),
		new google.maps.LatLng(42.811245383505423, 2.717638592207553),
		new google.maps.LatLng(42.811309858415228, 2.717536910105001),
		new google.maps.LatLng(42.811334030138347, 2.717496489389792),
		new google.maps.LatLng(42.811420085589674, 2.717394702276281),
		new google.maps.LatLng(42.811533067788908, 2.717274462755017),
		new google.maps.LatLng(42.811644296257548, 2.717171331028502),
		new google.maps.LatLng(42.811748318663952, 2.717063349428834),
		new google.maps.LatLng(42.811850485038107, 2.716933390768355),
		new google.maps.LatLng(42.811942766339669, 2.716805923680832),
		new google.maps.LatLng(42.812021595188249, 2.716691955982608),
		new google.maps.LatLng(42.812074295294003, 2.716558574091733),
		new google.maps.LatLng(42.812124575298306, 2.716530238457099),
		new google.maps.LatLng(42.812162303252151, 2.716515398488752),
		new google.maps.LatLng(42.812202650106649, 2.716471234373737)
	],
	[
		new google.maps.LatLng(42.822623549355065, 2.718522692369394),
		new google.maps.LatLng(42.822611955471906, 2.718559395129858),
		new google.maps.LatLng(42.822552228716674, 2.7187575752314),
		new google.maps.LatLng(42.822461319894401, 2.71906706687925),
		new google.maps.LatLng(42.822381111943336, 2.719342302689976),
		new google.maps.LatLng(42.822372196903174, 2.719371662537332),
		new google.maps.LatLng(42.822294589014881, 2.719610238412258),
		new google.maps.LatLng(42.822214216924635, 2.719823175784911),
		new google.maps.LatLng(42.822165101746435, 2.719954117034758),
		new google.maps.LatLng(42.822031915752348, 2.72025892149498),
		new google.maps.LatLng(42.821962236703961, 2.720435159179961),
		new google.maps.LatLng(42.821911320045501, 2.720564887036223)
	],
	[
		new google.maps.LatLng(42.810446436049112, 2.719176419901106),
		new google.maps.LatLng(42.810463638406915, 2.719221525362224),
		new google.maps.LatLng(42.810470285029801, 2.719355835389884),
		new google.maps.LatLng(42.810481391590159, 2.719476689852052)
	],
	[
		new google.maps.LatLng(42.810481391590159, 2.719476689852052),
		new google.maps.LatLng(42.810487928667577, 2.71956947771764),
		new google.maps.LatLng(42.81049352761206, 2.719647612976058)
	],
	[
		new google.maps.LatLng(42.81049352761206, 2.719647612976058),
		new google.maps.LatLng(42.810524572527413, 2.720172622097944),
		new google.maps.LatLng(42.810534813608847, 2.720306914878476),
		new google.maps.LatLng(42.810574751154952, 2.720449614270375),
		new google.maps.LatLng(42.810625452236295, 2.720582493135813),
		new google.maps.LatLng(42.810664356430117, 2.720673902645103),
		new google.maps.LatLng(42.810691436328831, 2.720714075584768)
	],
	[
		new google.maps.LatLng(42.821911320045501, 2.720564887036223),
		new google.maps.LatLng(42.82182284310786, 2.720774194461391),
		new google.maps.LatLng(42.821797821423189, 2.720834169843521),
		new google.maps.LatLng(42.82170396466001, 2.721049610636336),
		new google.maps.LatLng(42.821688780358187, 2.721088772025803),
		new google.maps.LatLng(42.821619989514467, 2.721261337381373),
		new google.maps.LatLng(42.821600352888069, 2.721317622918558),
		new google.maps.LatLng(42.821528906018706, 2.721506079728865),
		new google.maps.LatLng(42.821450318331486, 2.721715337558502),
		new google.maps.LatLng(42.821388768642343, 2.721906191166771),
		new google.maps.LatLng(42.821311307184757, 2.722203391032976),
		new google.maps.LatLng(42.821268021456497, 2.722502871678549),
		new google.maps.LatLng(42.821262768043574, 2.72255786535842),
		new google.maps.LatLng(42.821227690625406, 2.722902501375214),
		new google.maps.LatLng(42.821204036757777, 2.723144476086705),
		new google.maps.LatLng(42.821175122616857, 2.723439000728023),
		new google.maps.LatLng(42.821172488287068, 2.723463443223256),
		new google.maps.LatLng(42.8211385426644, 2.72389968736646),
		new google.maps.LatLng(42.821130654138045, 2.723979123269349),
		new google.maps.LatLng(42.821098210793046, 2.724300537015986),
		new google.maps.LatLng(42.821063121318645, 2.724642728946515),
		new google.maps.LatLng(42.821051180829727, 2.724895639558584),
		new google.maps.LatLng(42.821068688271446, 2.725060461680712)
	],
	[
		new google.maps.LatLng(42.810691436328831, 2.720714075584768),
		new google.maps.LatLng(42.810716715436335, 2.720753036399462),
		new google.maps.LatLng(42.810777177452636, 2.72083579458881),
		new google.maps.LatLng(42.810826925259775, 2.720947915195651),
		new google.maps.LatLng(42.810885715975694, 2.721079534567463),
		new google.maps.LatLng(42.810962794240631, 2.721328310550581),
		new google.maps.LatLng(42.810966423248878, 2.721340506931604),
		new google.maps.LatLng(42.811035500457223, 2.721624739959856),
		new google.maps.LatLng(42.811070129068135, 2.721801664115016)
	],
	[
		new google.maps.LatLng(42.811070129068135, 2.721801664115016),
		new google.maps.LatLng(42.811079314032824, 2.72187611961991),
		new google.maps.LatLng(42.811084899496855, 2.72194937225327),
		new google.maps.LatLng(42.81108872669958, 2.722038508894117),
		new google.maps.LatLng(42.811091722346099, 2.722153297535562),
		new google.maps.LatLng(42.811103718444464, 2.722271707888849),
		new google.maps.LatLng(42.811113083280276, 2.722415777137178),
		new google.maps.LatLng(42.811134109089295, 2.72254879921169),
		new google.maps.LatLng(42.811169742811678, 2.722767244052618),
		new google.maps.LatLng(42.811218018246365, 2.723006391072709),
		new google.maps.LatLng(42.811228947124789, 2.723060076904314),
		new google.maps.LatLng(42.81123440904021, 2.723085698315655),
		new google.maps.LatLng(42.811291836371311, 2.723387089167179),
		new google.maps.LatLng(42.811345593900192, 2.723660408006428),
		new google.maps.LatLng(42.811363910453274, 2.723789779742519),
		new google.maps.LatLng(42.811365825725858, 2.723834960294436)
	],
	[
		new google.maps.LatLng(42.811365825725858, 2.723834960294436),
		new google.maps.LatLng(42.811369585798019, 2.723898450605072),
		new google.maps.LatLng(42.811363504815951, 2.723981529248949),
		new google.maps.LatLng(42.81134150341709, 2.724167273545913),
		new google.maps.LatLng(42.811325653544962, 2.724298029023286),
		new google.maps.LatLng(42.811314321794939, 2.724437312528471),
		new google.maps.LatLng(42.811311884726479, 2.724538692788063),
		new google.maps.LatLng(42.811306054341131, 2.72471947499286),
		new google.maps.LatLng(42.811300515459571, 2.725013838042684),
		new google.maps.LatLng(42.811299722480697, 2.725055366050365),
		new google.maps.LatLng(42.811293885393837, 2.725233705149049),
		new google.maps.LatLng(42.811294361077984, 2.725419342885996),
		new google.maps.LatLng(42.811287714647712, 2.725633103599769),
		new google.maps.LatLng(42.811274813251813, 2.725862771796476)
	],
	[
		new google.maps.LatLng(42.821068688271446, 2.725060461680712),
		new google.maps.LatLng(42.821085178060819, 2.72517887171782),
		new google.maps.LatLng(42.821128187694143, 2.725470611311867),
		new google.maps.LatLng(42.821193020551874, 2.725857526638139),
		new google.maps.LatLng(42.821199421119346, 2.725899028169895),
		new google.maps.LatLng(42.821225956637662, 2.726078467946191),
		new google.maps.LatLng(42.821236931626096, 2.726150484933737),
		new google.maps.LatLng(42.82124157036921, 2.726206653747101),
		new google.maps.LatLng(42.821254505301695, 2.726342181790338),
		new google.maps.LatLng(42.821246727686294, 2.726465591632206),
		new google.maps.LatLng(42.821221979680423, 2.726634278887202),
		new google.maps.LatLng(42.82120792861398, 2.726766268382472),
		new google.maps.LatLng(42.821185952838015, 2.726964258316),
		new google.maps.LatLng(42.821172224016649, 2.727223285442577),
		new google.maps.LatLng(42.821178971667763, 2.727401596095542),
		new google.maps.LatLng(42.821168466825455, 2.727514024640426)
	],
	[
		new google.maps.LatLng(42.811274813251813, 2.725862771796476),
		new google.maps.LatLng(42.811341606004035, 2.725961382592751),
		new google.maps.LatLng(42.811382231733937, 2.726024699923223),
		new google.maps.LatLng(42.811538453300649, 2.726282882765069),
		new google.maps.LatLng(42.811680339021684, 2.726561897548899),
		new google.maps.LatLng(42.811825195537047, 2.72694837594973),
		new google.maps.LatLng(42.811882394771168, 2.727164282639055),
		new google.maps.LatLng(42.811915089230254, 2.727291146384415),
		new google.maps.LatLng(42.811940660395031, 2.727446135775577),
		new google.maps.LatLng(42.811965304860657, 2.727590136764034),
		new google.maps.LatLng(42.812003852210566, 2.727897730947176),
		new google.maps.LatLng(42.812035120917628, 2.728172383293059),
		new google.maps.LatLng(42.812046993042017, 2.728244386003354),
		new google.maps.LatLng(42.812086249012062, 2.728477476204215),
		new google.maps.LatLng(42.812144434306681, 2.728728799443946),
		new google.maps.LatLng(42.812226779412036, 2.728933598686935),
		new google.maps.LatLng(42.812323470576153, 2.729122454352396),
		new google.maps.LatLng(42.812434638563943, 2.729346662309841),
		new google.maps.LatLng(42.812498900320804, 2.729512465108621),
		new google.maps.LatLng(42.812521527399234, 2.729570984563161),
		new google.maps.LatLng(42.81256239789122, 2.729732011178331),
		new google.maps.LatLng(42.812580556860794, 2.729801543012253),
		new google.maps.LatLng(42.812638637575262, 2.730012564904373),
		new google.maps.LatLng(42.812716455858627, 2.730206396929976),
		new google.maps.LatLng(42.812788855558104, 2.730390484303418),
		new google.maps.LatLng(42.812861134380498, 2.730526940560974)
	],
	[
		new google.maps.LatLng(42.821168466825455, 2.727514024640426),
		new google.maps.LatLng(42.821136328958957, 2.727605790221852),
		new google.maps.LatLng(42.821081725590297, 2.727703766881818),
		new google.maps.LatLng(42.821054830048801, 2.727735652383394),
		new google.maps.LatLng(42.820981313016503, 2.72782150344637),
		new google.maps.LatLng(42.820806539784222, 2.728047079836203),
		new google.maps.LatLng(42.820647917799064, 2.72825914274278),
		new google.maps.LatLng(42.820503549134422, 2.728418613524951),
		new google.maps.LatLng(42.820434555355746, 2.728515434821323),
		new google.maps.LatLng(42.820389749634714, 2.728576719132853),
		new google.maps.LatLng(42.820353927708709, 2.72863429760409),
		new google.maps.LatLng(42.820347661141987, 2.728645320425221)
	],
	[
		new google.maps.LatLng(42.820347661141987, 2.728645320425221),
		new google.maps.LatLng(42.820320793270646, 2.72868819788916),
		new google.maps.LatLng(42.820306504789542, 2.728727352586095)
	],
	[
		new google.maps.LatLng(42.820306504789542, 2.728727352586095),
		new google.maps.LatLng(42.820298473264778, 2.728751820626134),
		new google.maps.LatLng(42.820271680422579, 2.728824014838469),
		new google.maps.LatLng(42.820235078492374, 2.728929234229974),
		new google.maps.LatLng(42.82022169507313, 2.728970827027469),
		new google.maps.LatLng(42.820166500919697, 2.72919095517427),
		new google.maps.LatLng(42.820137123278883, 2.729308355861201),
		new google.maps.LatLng(42.820102430148793, 2.729457540164613),
		new google.maps.LatLng(42.820039116907267, 2.729667931811716),
		new google.maps.LatLng(42.819958648336815, 2.729850308759076),
		new google.maps.LatLng(42.819862969163488, 2.730063293954429),
		new google.maps.LatLng(42.819807587955012, 2.730210130149636),
		new google.maps.LatLng(42.819761354375935, 2.730419218983374)
	],
	[
		new google.maps.LatLng(42.819761354375935, 2.730419218983374),
		new google.maps.LatLng(42.819737361984373, 2.730532929776316),
		new google.maps.LatLng(42.819665480795813, 2.73091314547091),
		new google.maps.LatLng(42.819599876669621, 2.731287224564138),
		new google.maps.LatLng(42.819543050168981, 2.731575757717668),
		new google.maps.LatLng(42.819489770793112, 2.731844730435888),
		new google.maps.LatLng(42.819421304647555, 2.732154081603171),
		new google.maps.LatLng(42.819349213611616, 2.732452455064427),
		new google.maps.LatLng(42.819257457675818, 2.732798557137211),
		new google.maps.LatLng(42.81923523030774, 2.73290004164321)
	],
	[
		new google.maps.LatLng(42.812861134380498, 2.730526940560974),
		new google.maps.LatLng(42.812909024232411, 2.730619540791012),
		new google.maps.LatLng(42.812985814810574, 2.73076208205703)
	],
	[
		new google.maps.LatLng(42.812985814810574, 2.73076208205703),
		new google.maps.LatLng(42.813049963617729, 2.730883920744632),
		new google.maps.LatLng(42.813154695990789, 2.731053203250938),
		new google.maps.LatLng(42.813165528429472, 2.73107025188266),
		new google.maps.LatLng(42.813224214834705, 2.731165246737079),
		new google.maps.LatLng(42.813400169528229, 2.731408704506036),
		new google.maps.LatLng(42.813589525339019, 2.731617902805637),
		new google.maps.LatLng(42.813702235492826, 2.731741962632912),
		new google.maps.LatLng(42.813776176989585, 2.731824673409548),
		new google.maps.LatLng(42.813822179375016, 2.731881865894172),
		new google.maps.LatLng(42.813849238100737, 2.731914717644511),
		new google.maps.LatLng(42.8138871262545, 2.731963398071346),
		new google.maps.LatLng(42.813911483153724, 2.73199504124669),
		new google.maps.LatLng(42.813984631786269, 2.73212050511248),
		new google.maps.LatLng(42.814012628857967, 2.732169231049184),
		new google.maps.LatLng(42.814100390522022, 2.732385009359698),
		new google.maps.LatLng(42.814121282068967, 2.732469187159071)
	],
	[
		new google.maps.LatLng(42.820512240434077, 2.732233338856169),
		new google.maps.LatLng(42.82042862156338, 2.732236167551908),
		new google.maps.LatLng(42.820367597893942, 2.732285308442776),
		new google.maps.LatLng(42.820301179037322, 2.732334473810573),
		new google.maps.LatLng(42.820134559503671, 2.732588091387847),
		new google.maps.LatLng(42.820043437560216, 2.732827924447786),
		new google.maps.LatLng(42.820025755328103, 2.732948934072936),
		new google.maps.LatLng(42.819998919075331, 2.733005245505433),
		new google.maps.LatLng(42.819924443697928, 2.733069106132918),
		new google.maps.LatLng(42.819900217171948, 2.733089981936942),
		new google.maps.LatLng(42.819837373548523, 2.733130580016606),
		new google.maps.LatLng(42.819802311137586, 2.733133184485744),
		new google.maps.LatLng(42.819752837264886, 2.733126082505892),
		new google.maps.LatLng(42.819690741149223, 2.733105602538434),
		new google.maps.LatLng(42.819675436054681, 2.733098343346423),
		new google.maps.LatLng(42.819599809768377, 2.733060824317174),
		new google.maps.LatLng(42.81939366825987, 2.732971381660113),
		new google.maps.LatLng(42.81923523030774, 2.73290004164321)
	],
	[
		new google.maps.LatLng(42.821516865983, 2.732678232976441),
		new google.maps.LatLng(42.821508645399156, 2.732626967052262),
		new google.maps.LatLng(42.821481621084061, 2.732607546078028),
		new google.maps.LatLng(42.821395203425716, 2.73257007688779),
		new google.maps.LatLng(42.82130970031271, 2.732538711230947),
		new google.maps.LatLng(42.821102696154632, 2.732463928511358),
		new google.maps.LatLng(42.82080118764042, 2.732354158628839),
		new google.maps.LatLng(42.820641874712649, 2.732292596021769),
		new google.maps.LatLng(42.82056172958734, 2.732246547453639),
		new google.maps.LatLng(42.820512240434077, 2.732233338856169)
	],
	[
		new google.maps.LatLng(42.814121282068967, 2.732469187159071),
		new google.maps.LatLng(42.814155789350373, 2.732604601498492),
		new google.maps.LatLng(42.814210492587257, 2.732906029522998),
		new google.maps.LatLng(42.81429090037016, 2.733419858578066),
		new google.maps.LatLng(42.814364019191956, 2.733895860988138),
		new google.maps.LatLng(42.814448915500051, 2.734408451725956),
		new google.maps.LatLng(42.81448271181285, 2.734620817404487),
		new google.maps.LatLng(42.81449733455208, 2.734716017642757),
		new google.maps.LatLng(42.814544460310685, 2.73486481130228),
		new google.maps.LatLng(42.81461783289226, 2.735081883385043),
		new google.maps.LatLng(42.814663238560762, 2.735262440201474)
	],
	[
		new google.maps.LatLng(42.820498453707444, 2.736469585364163),
		new google.maps.LatLng(42.820551503201358, 2.736468124146103),
		new google.maps.LatLng(42.820603653347234, 2.736466665535018),
		new google.maps.LatLng(42.82063599433409, 2.736454304524499),
		new google.maps.LatLng(42.820668287478966, 2.736422398813373),
		new google.maps.LatLng(42.820697796248638, 2.736355081485964),
		new google.maps.LatLng(42.820923922448678, 2.735797045392119),
		new google.maps.LatLng(42.821152671427029, 2.735209676408374),
		new google.maps.LatLng(42.821185730731095, 2.735124019428562),
		new google.maps.LatLng(42.82129292793654, 2.734837693475693),
		new google.maps.LatLng(42.821347449684104, 2.734704299330834),
		new google.maps.LatLng(42.821352718372403, 2.734652971734118),
		new google.maps.LatLng(42.821351652895949, 2.734585792592597),
		new google.maps.LatLng(42.821340777615021, 2.7345516396129),
		new google.maps.LatLng(42.821292130485027, 2.734515215137893),
		new google.maps.LatLng(42.821158810219423, 2.734419324308821),
		new google.maps.LatLng(42.821030015927612, 2.734335627938657),
		new google.maps.LatLng(42.820999289584776, 2.734273470801305),
		new google.maps.LatLng(42.820997348200393, 2.734216068312471),
		new google.maps.LatLng(42.82100981621317, 2.734167151001851),
		new google.maps.LatLng(42.821032090097823, 2.73408398591347),
		new google.maps.LatLng(42.821194689419912, 2.733658152958251),
		new google.maps.LatLng(42.821401837251997, 2.733067207626374),
		new google.maps.LatLng(42.821492900845016, 2.732804160797929),
		new google.maps.LatLng(42.821508967588294, 2.732756447758812),
		new google.maps.LatLng(42.821516865983, 2.732678232976441)
	],
	[
		new google.maps.LatLng(42.814663238560762, 2.735262440201474),
		new google.maps.LatLng(42.814678983192493, 2.73544801907755),
		new google.maps.LatLng(42.814672992614575, 2.735571406970729),
		new google.maps.LatLng(42.814659047818942, 2.735751013407994),
		new google.maps.LatLng(42.814609156830663, 2.73593933292099),
		new google.maps.LatLng(42.814528779606931, 2.736163210673857),
		new google.maps.LatLng(42.814484189317902, 2.736313642570616),
		new google.maps.LatLng(42.814432459344651, 2.736486091986229),
		new google.maps.LatLng(42.814408412176185, 2.736580246699432)
	],
	[
		new google.maps.LatLng(42.819872430436234, 2.737866147057067),
		new google.maps.LatLng(42.819913724942673, 2.73783786695543),
		new google.maps.LatLng(42.819985362115027, 2.73771539377181),
		new google.maps.LatLng(42.820064891541506, 2.737511045371741),
		new google.maps.LatLng(42.820237341301272, 2.73706319688618),
		new google.maps.LatLng(42.820378572537571, 2.736719316258476),
		new google.maps.LatLng(42.820460846030336, 2.73653449595955),
		new google.maps.LatLng(42.820498453707444, 2.736469585364163)
	],
	[
		new google.maps.LatLng(42.814408412176185, 2.736580246699432),
		new google.maps.LatLng(42.814344251991869, 2.736817485182643),
		new google.maps.LatLng(42.814284796718169, 2.73714019682276),
		new google.maps.LatLng(42.814243420049905, 2.737501910705742),
		new google.maps.LatLng(42.814227852770735, 2.737754806202503),
		new google.maps.LatLng(42.814240160124406, 2.73800757493344),
		new google.maps.LatLng(42.814272100712643, 2.738199186459317),
		new google.maps.LatLng(42.814314726105529, 2.738348002473215),
		new google.maps.LatLng(42.814425025966671, 2.73859300354766),
		new google.maps.LatLng(42.814537919187266, 2.738795245098292),
		new google.maps.LatLng(42.814657151166877, 2.739015779590946),
		new google.maps.LatLng(42.814750218965351, 2.739201012539977)
	],
	[
		new google.maps.LatLng(42.819872430436234, 2.737866147057067),
		new google.maps.LatLng(42.819969704828615, 2.737931669570399),
		new google.maps.LatLng(42.820141558983693, 2.737974868640601),
		new google.maps.LatLng(42.820344926729931, 2.738035027275185),
		new google.maps.LatLng(42.820374621120948, 2.738043443626252),
		new google.maps.LatLng(42.820383622077657, 2.738047068162476),
		new google.maps.LatLng(42.820582469730866, 2.738097475202784),
		new google.maps.LatLng(42.820711100019466, 2.7381152181851),
		new google.maps.LatLng(42.820828960491227, 2.738141560049978),
		new google.maps.LatLng(42.820936965400165, 2.738182605531016),
		new google.maps.LatLng(42.821042246138589, 2.738212668466553),
		new google.maps.LatLng(42.821082796089613, 2.738247910698794),
		new google.maps.LatLng(42.821113464344535, 2.738286861171502),
		new google.maps.LatLng(42.821129820295774, 2.73835641396033),
		new google.maps.LatLng(42.821149828575642, 2.738449159088097),
		new google.maps.LatLng(42.821200636142045, 2.738634601470509),
		new google.maps.LatLng(42.821223223154099, 2.738678474458262),
		new google.maps.LatLng(42.821235877308915, 2.738705291482389),
		new google.maps.LatLng(42.821287289948103, 2.738769800993139),
		new google.maps.LatLng(42.821460467954388, 2.73898767614318),
		new google.maps.LatLng(42.8215550975236, 2.739075200659461),
		new google.maps.LatLng(42.821647899518844, 2.739150519542403),
		new google.maps.LatLng(42.821809208906082, 2.739295157861713),
		new google.maps.LatLng(42.821868737625032, 2.739369404441589),
		new google.maps.LatLng(42.821884071111221, 2.73938888020051),
		new google.maps.LatLng(42.821976103442246, 2.739517950944686),
		new google.maps.LatLng(42.822270404115812, 2.739995476892054),
		new google.maps.LatLng(42.822434706538537, 2.740262261054445),
		new google.maps.LatLng(42.822556616040217, 2.74047548725959)
	],
	[
		new google.maps.LatLng(42.814750218965351, 2.739201012539977),
		new google.maps.LatLng(42.814780034927786, 2.739259504895229),
		new google.maps.LatLng(42.814878528087711, 2.739456927993876),
		new google.maps.LatLng(42.814924653721462, 2.739566646664314)
	],
	[
		new google.maps.LatLng(42.814924653721462, 2.739566646664314),
		new google.maps.LatLng(42.814934601277066, 2.739589807748605),
		new google.maps.LatLng(42.814938224643655, 2.739600784404249),
		new google.maps.LatLng(42.814963579813984, 2.739673953832577),
		new google.maps.LatLng(42.814981744764744, 2.739748377618241)
	],
	[
		new google.maps.LatLng(42.815100202425874, 2.740392742512391),
		new google.maps.LatLng(42.815073738390204, 2.740232858507791),
		new google.maps.LatLng(42.815024465402367, 2.739937502583564),
		new google.maps.LatLng(42.814981744764744, 2.739748377618241)
	],
	[
		new google.maps.LatLng(42.815126654229957, 2.740547741531267),
		new google.maps.LatLng(42.815113888650089, 2.740474515057746),
		new google.maps.LatLng(42.815100202425874, 2.740392742512391)
	],
	[
		new google.maps.LatLng(42.822556616040217, 2.74047548725959),
		new google.maps.LatLng(42.822473131949806, 2.740534493558038),
		new google.maps.LatLng(42.822394194452315, 2.740614246578892),
		new google.maps.LatLng(42.822345818100679, 2.740688976945705),
		new google.maps.LatLng(42.822269897024952, 2.740900642870796),
		new google.maps.LatLng(42.822236836162347, 2.740987519991767),
		new google.maps.LatLng(42.822197530535121, 2.74109519027636),
		new google.maps.LatLng(42.82206797492136, 2.741439019707609),
		new google.maps.LatLng(42.822048292437373, 2.741480639789327),
		new google.maps.LatLng(42.822037558278268, 2.741503896412031),
		new google.maps.LatLng(42.822009806501505, 2.741555324055563),
		new google.maps.LatLng(42.821969371772013, 2.741567720162861),
		new google.maps.LatLng(42.821929801389501, 2.741565453065653),
		new google.maps.LatLng(42.821691953594168, 2.741375951532553),
		new google.maps.LatLng(42.821063225750798, 2.740928008516506),
		new google.maps.LatLng(42.820998368396417, 2.740880659019183),
		new google.maps.LatLng(42.820945268997484, 2.740861351204655),
		new google.maps.LatLng(42.820911989433554, 2.740857835300042),
		new google.maps.LatLng(42.820873385770675, 2.740883659139341),
		new google.maps.LatLng(42.820853756999661, 2.740947265517829),
		new google.maps.LatLng(42.820740475778173, 2.741327659995944),
		new google.maps.LatLng(42.820535343145274, 2.74202727376675),
		new google.maps.LatLng(42.820510420583531, 2.742133656300083)
	],
	[
		new google.maps.LatLng(42.81520979690513, 2.741464637463063),
		new google.maps.LatLng(42.815194832342954, 2.741225310389361),
		new google.maps.LatLng(42.815190135538714, 2.741142277126202),
		new google.maps.LatLng(42.815177170144999, 2.74098599594955),
		new google.maps.LatLng(42.815164200865254, 2.740828494476982),
		new google.maps.LatLng(42.815126654229957, 2.740547741531267)
	],
	[
		new google.maps.LatLng(42.815189944634177, 2.742182906382952),
		new google.maps.LatLng(42.815215522118983, 2.741975155780022),
		new google.maps.LatLng(42.815214954640631, 2.741739428356617),
		new google.maps.LatLng(42.815209976486607, 2.741539142117428),
		new google.maps.LatLng(42.81520979690513, 2.741464637463063)
	],
	[
		new google.maps.LatLng(42.820510420583531, 2.742133656300083),
		new google.maps.LatLng(42.820558442399012, 2.742284909716664),
		new google.maps.LatLng(42.820655934547162, 2.742442052420237),
		new google.maps.LatLng(42.820745183746652, 2.742536934954733),
		new google.maps.LatLng(42.820833530765995, 2.742630599805851),
		new google.maps.LatLng(42.821144318948072, 2.742864976842537),
		new google.maps.LatLng(42.821365878968948, 2.743013022543728),
		new google.maps.LatLng(42.821589975703809, 2.743093874818469),
		new google.maps.LatLng(42.821669175005653, 2.743122841595961),
		new google.maps.LatLng(42.821976938361367, 2.743220425834971),
		new google.maps.LatLng(42.822109196341295, 2.743251601466077),
		new google.maps.LatLng(42.822283737330736, 2.743291141655254),
		new google.maps.LatLng(42.822525750345854, 2.743343820430241),
		new google.maps.LatLng(42.82260228445795, 2.743386237014248),
		new google.maps.LatLng(42.822634699351582, 2.743404416482863),
		new google.maps.LatLng(42.822670755516768, 2.743440904634425),
		new google.maps.LatLng(42.822712215072144, 2.743481033214616),
		new google.maps.LatLng(42.822798015870355, 2.743638234182694),
		new google.maps.LatLng(42.822941793676314, 2.743974750299783),
		new google.maps.LatLng(42.823034993768353, 2.744218651848054),
		new google.maps.LatLng(42.823083754476599, 2.744303946177507)
	],
	[
		new google.maps.LatLng(42.81496114425299, 2.743139047616096),
		new google.maps.LatLng(42.815019032215588, 2.742905505465743),
		new google.maps.LatLng(42.815062674075833, 2.742730653941566),
		new google.maps.LatLng(42.815135713369145, 2.742440860498624),
		new google.maps.LatLng(42.815168663362776, 2.742307582367244)
	],
	[
		new google.maps.LatLng(42.814684777488466, 2.74376073135212),
		new google.maps.LatLng(42.814704478180055, 2.743726445199164),
		new google.maps.LatLng(42.814819989574858, 2.743523185842503),
		new google.maps.LatLng(42.814903164349033, 2.743334725173628),
		new google.maps.LatLng(42.814905850495073, 2.743329827648561),
		new google.maps.LatLng(42.81496114425299, 2.743139047616096)
	],
	[
		new google.maps.LatLng(42.8146229809537, 2.743864821204345),
		new google.maps.LatLng(42.814684777488466, 2.74376073135212)
	],
	[
		new google.maps.LatLng(42.814173302174716, 2.744586190373119),
		new google.maps.LatLng(42.814380235878517, 2.744257952516189),
		new google.maps.LatLng(42.814562977533313, 2.743966460249949),
		new google.maps.LatLng(42.8146229809537, 2.743864821204345)
	],
	[
		new google.maps.LatLng(42.823083754476599, 2.744303946177507),
		new google.maps.LatLng(42.823140633843522, 2.744400199228343),
		new google.maps.LatLng(42.823267796011038, 2.744557221920366),
		new google.maps.LatLng(42.823380481037226, 2.744676440189155),
		new google.maps.LatLng(42.823443521716506, 2.744716474851762),
		new google.maps.LatLng(42.823474140440688, 2.744735885664942),
		new google.maps.LatLng(42.82353707281019, 2.744730722932425),
		new google.maps.LatLng(42.823608028295439, 2.744696207124758),
		new google.maps.LatLng(42.823692436635199, 2.744646973251751),
		new google.maps.LatLng(42.823727488362785, 2.74463949056349),
		new google.maps.LatLng(42.823795792223457, 2.744624531370006),
		new google.maps.LatLng(42.823859720428452, 2.744659675498851),
		new google.maps.LatLng(42.82394711718316, 2.744732586765922),
		new google.maps.LatLng(42.824165362882631, 2.745000376584942),
		new google.maps.LatLng(42.824489951400146, 2.745367872469952),
		new google.maps.LatLng(42.824576474671787, 2.745451782697411),
		new google.maps.LatLng(42.824640384472772, 2.745479599925816),
		new google.maps.LatLng(42.824695232741924, 2.745478137713032),
		new google.maps.LatLng(42.824794148025546, 2.745478926692975),
		new google.maps.LatLng(42.824849973692196, 2.745510443912618),
		new google.maps.LatLng(42.824877889696502, 2.745527424322067),
		new google.maps.LatLng(42.824968032906533, 2.745621092306118),
		new google.maps.LatLng(42.825194128590631, 2.745787462891795),
		new google.maps.LatLng(42.825375241363574, 2.74594425731541),
		new google.maps.LatLng(42.825622045037115, 2.746121534070885),
		new google.maps.LatLng(42.825903735540756, 2.746221698648425),
		new google.maps.LatLng(42.826049472851473, 2.746249159473312),
		new google.maps.LatLng(42.826174412097636, 2.746227846539838)
	],
	[
		new google.maps.LatLng(42.813782849447009, 2.745258434920445),
		new google.maps.LatLng(42.813830276802733, 2.745161740193963),
		new google.maps.LatLng(42.813866099811449, 2.745100513900609),
		new google.maps.LatLng(42.81397803719873, 2.744905825649242),
		new google.maps.LatLng(42.814173302174716, 2.744586190373119)
	],
	[
		new google.maps.LatLng(42.813748813238888, 2.745314767395947),
		new google.maps.LatLng(42.813782849447009, 2.745258434920445)
	],
	[
		new google.maps.LatLng(42.814854340844818, 2.745487025617112),
		new google.maps.LatLng(42.814827281477697, 2.745451723005748),
		new google.maps.LatLng(42.814658674166346, 2.745259482834356)
	],
	[
		new google.maps.LatLng(42.814178330801468, 2.745566930831128),
		new google.maps.LatLng(42.814134209287317, 2.74554147507148),
		new google.maps.LatLng(42.814035208564604, 2.745504046500378),
		new google.maps.LatLng(42.813919015850814, 2.745421501535318),
		new google.maps.LatLng(42.813854181184055, 2.745382702501734),
		new google.maps.LatLng(42.813748813238888, 2.745314767395947)
	],
	[
		new google.maps.LatLng(42.815034703661816, 2.745707306845591),
		new google.maps.LatLng(42.814953564760422, 2.745618500679815),
		new google.maps.LatLng(42.814854340844818, 2.745487025617112)
	],
	[
		new google.maps.LatLng(42.814286480079858, 2.745670275166426),
		new google.maps.LatLng(42.814225155791576, 2.745594817445799),
		new google.maps.LatLng(42.814178330801468, 2.745566930831128)
	],
	[
		new google.maps.LatLng(42.814488764803485, 2.74603458265075),
		new google.maps.LatLng(42.814407452167742, 2.745872494712393),
		new google.maps.LatLng(42.814310830454176, 2.745700702372174),
		new google.maps.LatLng(42.814286480079858, 2.745670275166426)
	],
	[
		new google.maps.LatLng(42.81525493504197, 2.747197667057561),
		new google.maps.LatLng(42.815262079302975, 2.747176873078855),
		new google.maps.LatLng(42.815280729210151, 2.747077858109779),
		new google.maps.LatLng(42.815298508572212, 2.746991062662626),
		new google.maps.LatLng(42.815320490197912, 2.746779664856961),
		new google.maps.LatLng(42.815339801422169, 2.746580492647867),
		new google.maps.LatLng(42.815363623500382, 2.746387408609293),
		new google.maps.LatLng(42.815379552061202, 2.746278634016489),
		new google.maps.LatLng(42.815373014975492, 2.746176065700308),
		new google.maps.LatLng(42.815324181353866, 2.746059024057326),
		new google.maps.LatLng(42.815138383261356, 2.745821664394194),
		new google.maps.LatLng(42.815034703661816, 2.745707306845591)
	],
	[
		new google.maps.LatLng(42.814606185919331, 2.746256361106437),
		new google.maps.LatLng(42.814511345370157, 2.746077232008076),
		new google.maps.LatLng(42.814488764803485, 2.74603458265075)
	],
	[
		new google.maps.LatLng(42.814661302096965, 2.746368486978928),
		new google.maps.LatLng(42.814635089874827, 2.746311196908433),
		new google.maps.LatLng(42.814606185919331, 2.746256361106437)
	],
	[
		new google.maps.LatLng(42.826174412097636, 2.746227846539838),
		new google.maps.LatLng(42.826205077609877, 2.746266804177161),
		new google.maps.LatLng(42.826242060242031, 2.74631550803633),
		new google.maps.LatLng(42.826355614694698, 2.746422515911619),
		new google.maps.LatLng(42.826548549108374, 2.746635459599944),
		new google.maps.LatLng(42.826675768664465, 2.746818151211581),
		new google.maps.LatLng(42.826819321408443, 2.747063074160011),
		new google.maps.LatLng(42.826957382900027, 2.747267709999694),
		new google.maps.LatLng(42.827032243919668, 2.747363893438409),
		new google.maps.LatLng(42.827114322136495, 2.747469819872186),
		new google.maps.LatLng(42.827146770597338, 2.74750266347816),
		new google.maps.LatLng(42.827272070325748, 2.747634057810968),
		new google.maps.LatLng(42.82728288136056, 2.747642561668034),
		new google.maps.LatLng(42.827407197880355, 2.747738532079885),
		new google.maps.LatLng(42.827546890432195, 2.747872307552984),
		new google.maps.LatLng(42.827622679059388, 2.747980706089593),
		new google.maps.LatLng(42.827658767904381, 2.748031859421756),
		new google.maps.LatLng(42.827761529502602, 2.748138920523266),
		new google.maps.LatLng(42.827822063167666, 2.748260823436405),
		new google.maps.LatLng(42.827888143591935, 2.748447451096684),
		new google.maps.LatLng(42.827948716406119, 2.748586459104333),
		new google.maps.LatLng(42.82804621682795, 2.74875096157737),
		new google.maps.LatLng(42.828171517793741, 2.748883582196158),
		new google.maps.LatLng(42.828253502304811, 2.74895041963594),
		new google.maps.LatLng(42.828273321903751, 2.748966215987813),
		new google.maps.LatLng(42.828377864288683, 2.749065941314074),
		new google.maps.LatLng(42.828390479276621, 2.749076881973892),
		new google.maps.LatLng(42.828568024996045, 2.749248370953492),
		new google.maps.LatLng(42.828861776178833, 2.749508543695923),
		new google.maps.LatLng(42.82898340559494, 2.749609418673819),
		new google.maps.LatLng(42.82912575911466, 2.749728530950034),
		new google.maps.LatLng(42.82943935809282, 2.750016721550389),
		new google.maps.LatLng(42.829532177754643, 2.750103063304677),
		new google.maps.LatLng(42.8296790274686, 2.750222158386776),
		new google.maps.LatLng(42.829884432340116, 2.750387427418164),
		new google.maps.LatLng(42.830088913591204, 2.750541705448723)
	],
	[
		new google.maps.LatLng(42.8150993726792, 2.747579418286033),
		new google.maps.LatLng(42.815034092747503, 2.747351302358542),
		new google.maps.LatLng(42.814933611566786, 2.747067154593167),
		new google.maps.LatLng(42.814848456492726, 2.746800041191101),
		new google.maps.LatLng(42.814756219931972, 2.746580594715086),
		new google.maps.LatLng(42.814661302096965, 2.746368486978928)
	],
	[
		new google.maps.LatLng(42.81525493504197, 2.747197667057561),
		new google.maps.LatLng(42.815349422238043, 2.747227791571925),
		new google.maps.LatLng(42.815362019388623, 2.747231401228848),
		new google.maps.LatLng(42.815391713118927, 2.747239821317129)
	],
	[
		new google.maps.LatLng(42.815391713118927, 2.747239821317129),
		new google.maps.LatLng(42.815444802459211, 2.747255469318999),
		new google.maps.LatLng(42.815524914533185, 2.747290541623312),
		new google.maps.LatLng(42.815551919237173, 2.747302637570317),
		new google.maps.LatLng(42.815595152725123, 2.747332985227721),
		new google.maps.LatLng(42.815631241009839, 2.747384127015099),
		new google.maps.LatLng(42.815665499045039, 2.747421842302489),
		new google.maps.LatLng(42.815694342973593, 2.747451030915613),
		new google.maps.LatLng(42.815845669006158, 2.747561521061152),
		new google.maps.LatLng(42.815869076300039, 2.747573633094341),
		new google.maps.LatLng(42.815992421676711, 2.747639054117843),
		new google.maps.LatLng(42.816048269310642, 2.747680339199136),
		new google.maps.LatLng(42.816120324946652, 2.747731326296235),
		new google.maps.LatLng(42.81627165699927, 2.74784426110539),
		new google.maps.LatLng(42.816371594055155, 2.747897569611727),
		new google.maps.LatLng(42.816416553214289, 2.74789737534225),
		new google.maps.LatLng(42.816450659960083, 2.74787035567889),
		new google.maps.LatLng(42.816477494562079, 2.747810390311763),
		new google.maps.LatLng(42.816571392901331, 2.747590126766508),
		new google.maps.LatLng(42.816634038108774, 2.747462826635085),
		new google.maps.LatLng(42.816669930826372, 2.747430912826689),
		new google.maps.LatLng(42.816709469582079, 2.747419749352301),
		new google.maps.LatLng(42.816746402208722, 2.747447681350522),
		new google.maps.LatLng(42.816763533014253, 2.747467148931925),
		new google.maps.LatLng(42.816814028776022, 2.747526780701736),
		new google.maps.LatLng(42.816971738363918, 2.747675110334608),
		new google.maps.LatLng(42.817177197612537, 2.7478623189112),
		new google.maps.LatLng(42.817191615919526, 2.747875692049023),
		new google.maps.LatLng(42.817233071244139, 2.747914598417758),
		new google.maps.LatLng(42.817313271226837, 2.747987537012518),
		new google.maps.LatLng(42.817431321853185, 2.748095733387971),
		new google.maps.LatLng(42.817514256593633, 2.74818453904158)
	],
	[
		new google.maps.LatLng(42.815114793921687, 2.747636757021087),
		new google.maps.LatLng(42.8150993726792, 2.747579418286033)
	],
	[
		new google.maps.LatLng(42.815230775676284, 2.748012442623938),
		new google.maps.LatLng(42.815162879560951, 2.747818536317094),
		new google.maps.LatLng(42.815155631708009, 2.747795360376314),
		new google.maps.LatLng(42.815114793921687, 2.747636757021087)
	],
	[
		new google.maps.LatLng(42.815676406217477, 2.749003512989057),
		new google.maps.LatLng(42.815587924565499, 2.748849998418609),
		new google.maps.LatLng(42.815482982700104, 2.748579300262556),
		new google.maps.LatLng(42.815360904139737, 2.748286693684991),
		new google.maps.LatLng(42.815249793181387, 2.748069765716151),
		new google.maps.LatLng(42.815230775676284, 2.748012442623938)
	],
	[
		new google.maps.LatLng(42.817514256593633, 2.74818453904158),
		new google.maps.LatLng(42.817400666696322, 2.748443976514193),
		new google.maps.LatLng(42.81726917540513, 2.748738912132703),
		new google.maps.LatLng(42.817104552692449, 2.749093839959126),
		new google.maps.LatLng(42.817097401814451, 2.74911219230929),
		new google.maps.LatLng(42.817022286559514, 2.749290846097693),
		new google.maps.LatLng(42.817000842768984, 2.74934956664136),
		new google.maps.LatLng(42.816981186011205, 2.749403394585573)
	],
	[
		new google.maps.LatLng(42.816041884858485, 2.749175375815221),
		new google.maps.LatLng(42.815993311305881, 2.749168256564444),
		new google.maps.LatLng(42.815798931130644, 2.749103139003297),
		new google.maps.LatLng(42.815680014346, 2.749008383561325),
		new google.maps.LatLng(42.815676406217477, 2.749003512989057)
	],
	[
		new google.maps.LatLng(42.816981186011205, 2.749403394585573),
		new google.maps.LatLng(42.816820960494802, 2.749332021321156),
		new google.maps.LatLng(42.81660500601491, 2.749269437985757),
		new google.maps.LatLng(42.816518640319792, 2.74925148940605),
		new google.maps.LatLng(42.816396286524103, 2.749225146434865),
		new google.maps.LatLng(42.816185813087699, 2.749199182919665),
		new google.maps.LatLng(42.816041884858485, 2.749175375815221)
	],
	[
		new google.maps.LatLng(42.818274068751506, 2.750100159481255),
		new google.maps.LatLng(42.817934608293776, 2.749902522609091),
		new google.maps.LatLng(42.817876985102224, 2.749871012223642),
		new google.maps.LatLng(42.817623975621302, 2.749727970317106),
		new google.maps.LatLng(42.817305244105285, 2.749551012959412),
		new google.maps.LatLng(42.817030692872393, 2.7494251663185),
		new google.maps.LatLng(42.816981186011205, 2.749403394585573)
	],
	[
		new google.maps.LatLng(42.818542387999493, 2.750252911020758),
		new google.maps.LatLng(42.8184505470456, 2.750200782135926),
		new google.maps.LatLng(42.818274068751506, 2.750100159481255)
	],
	[
		new google.maps.LatLng(42.819857885684769, 2.750622256868354),
		new google.maps.LatLng(42.819673396522937, 2.750557088331156),
		new google.maps.LatLng(42.819254101184789, 2.750442847101731),
		new google.maps.LatLng(42.818828551308947, 2.750345734850816),
		new google.maps.LatLng(42.818629677817036, 2.750281850417553),
		new google.maps.LatLng(42.818542387999493, 2.750252911020758)
	],
	[
		new google.maps.LatLng(42.830088913591204, 2.750541705448723),
		new google.maps.LatLng(42.830093417421367, 2.750545351738097),
		new google.maps.LatLng(42.830139354241524, 2.750578140458264),
		new google.maps.LatLng(42.830324043462475, 2.750728839961632),
		new google.maps.LatLng(42.830407768607813, 2.750771240816535),
		new google.maps.LatLng(42.830468911412851, 2.75076975656677),
		new google.maps.LatLng(42.830512047803332, 2.750758577012399),
		new google.maps.LatLng(42.830601917949366, 2.750736199685387),
		new google.maps.LatLng(42.830726890016187, 2.750728333870587),
		new google.maps.LatLng(42.830813265135504, 2.750749954323188),
		new google.maps.LatLng(42.830843891710259, 2.750773036128696),
		new google.maps.LatLng(42.83089524052675, 2.750813132618414),
		new google.maps.LatLng(42.831170020102462, 2.751036752493853),
		new google.maps.LatLng(42.831218670794335, 2.751076861498935),
		new google.maps.LatLng(42.831284437402552, 2.751130335428754),
		new google.maps.LatLng(42.831333088060859, 2.751170444581597),
		new google.maps.LatLng(42.831650217659771, 2.75143176112067),
		new google.maps.LatLng(42.831925027939839, 2.751668826358043),
		new google.maps.LatLng(42.832159276958386, 2.751864526563226),
		new google.maps.LatLng(42.832167384331818, 2.751870601256605),
		new google.maps.LatLng(42.832429589604423, 2.752101614927597),
		new google.maps.LatLng(42.832611546009431, 2.752237675848348),
		new google.maps.LatLng(42.832724056571394, 2.75228484543129),
		new google.maps.LatLng(42.832811294450927, 2.752290582423647),
		new google.maps.LatLng(42.832918305431072, 2.752292569475034),
		new google.maps.LatLng(42.833033499841349, 2.752333618880595),
		new google.maps.LatLng(42.833155939389094, 2.752396628490203),
		new google.maps.LatLng(42.833356778041157, 2.752532612632339),
		new google.maps.LatLng(42.833392805602386, 2.752558116126334),
		new google.maps.LatLng(42.833551320271013, 2.752667400881763),
		new google.maps.LatLng(42.833838637466727, 2.752870216246502),
		new google.maps.LatLng(42.833880968291332, 2.752899359628036),
		new google.maps.LatLng(42.834173708452248, 2.753114372795851),
		new google.maps.LatLng(42.834272799083855, 2.753190923734146),
		new google.maps.LatLng(42.834472777082013, 2.753344021624791),
		new google.maps.LatLng(42.834786277835263, 2.753593160824904),
		new google.maps.LatLng(42.834961889493464, 2.753708488867519),
		new google.maps.LatLng(42.834998816128575, 2.753733990126641),
		new google.maps.LatLng(42.835154584117873, 2.753822522659924),
		new google.maps.LatLng(42.835533659178516, 2.754042065928979),
		new google.maps.LatLng(42.835575983529189, 2.754068766931546),
		new google.maps.LatLng(42.835874929889847, 2.754245889492907),
		new google.maps.LatLng(42.836163968314636, 2.75441572348291),
		new google.maps.LatLng(42.836264822503644, 2.754477611442447),
		new google.maps.LatLng(42.836308942805296, 2.754503082687232),
		new google.maps.LatLng(42.836351250379103, 2.754522453523403),
		new google.maps.LatLng(42.83650338178419, 2.754593899790643),
		new google.maps.LatLng(42.836554729224865, 2.754634004347239),
		new google.maps.LatLng(42.83658085654745, 2.754655886048862),
		new google.maps.LatLng(42.836607961232865, 2.754711976858471)
	],
	[
		new google.maps.LatLng(42.820914559691381, 2.751055025407708),
		new google.maps.LatLng(42.820848880980542, 2.751039427112474),
		new google.maps.LatLng(42.820694990191178, 2.750985118667972),
		new google.maps.LatLng(42.820273734722399, 2.750801254644614),
		new google.maps.LatLng(42.819901980214922, 2.750636725923295),
		new google.maps.LatLng(42.819865084881926, 2.750624668776718),
		new google.maps.LatLng(42.819857885684769, 2.750622256868354)
	],
	[
		new google.maps.LatLng(42.821380573971624, 2.751151973202626),
		new google.maps.LatLng(42.82121145040189, 2.751120937975058),
		new google.maps.LatLng(42.821131384886328, 2.751105401106039),
		new google.maps.LatLng(42.820914559691381, 2.751055025407708)
	],
	[
		new google.maps.LatLng(42.822527420796362, 2.751305864669563),
		new google.maps.LatLng(42.822499548273285, 2.751307204618405),
		new google.maps.LatLng(42.822290936281711, 2.751309319098517),
		new google.maps.LatLng(42.82201387300389, 2.751262865135526),
		new google.maps.LatLng(42.821696328607267, 2.751209255077779),
		new google.maps.LatLng(42.821380573971624, 2.751151973202626)
	],
	[
		new google.maps.LatLng(42.82304810200263, 2.751323181827161),
		new google.maps.LatLng(42.82291048481715, 2.751306668603519),
		new google.maps.LatLng(42.822698265708901, 2.751303911836254),
		new google.maps.LatLng(42.822527420796362, 2.751305864669563)
	],
	[
		new google.maps.LatLng(42.824130536453936, 2.751619059420053),
		new google.maps.LatLng(42.823912759852249, 2.751546695073432),
		new google.maps.LatLng(42.82388666384761, 2.751538256080239),
		new google.maps.LatLng(42.823619377194873, 2.751442894847995),
		new google.maps.LatLng(42.823506898131903, 2.75140917179428),
		new google.maps.LatLng(42.823382724056735, 2.751373056028241),
		new google.maps.LatLng(42.823137148469662, 2.751333795097106),
		new google.maps.LatLng(42.82304810200263, 2.751323181827161)
	],
	[
		new google.maps.LatLng(42.825957365635155, 2.751849468714575),
		new google.maps.LatLng(42.82574155986552, 2.751851611574897),
		new google.maps.LatLng(42.825548251836267, 2.751860988850757),
		new google.maps.LatLng(42.825308190404229, 2.751873007052791),
		new google.maps.LatLng(42.825059102753158, 2.751870405956817),
		new google.maps.LatLng(42.824970972537649, 2.751867117442455),
		new google.maps.LatLng(42.824801846579341, 2.751834856678192),
		new google.maps.LatLng(42.824585897191362, 2.75177469885885),
		new google.maps.LatLng(42.824223227253462, 2.751650425224069),
		new google.maps.LatLng(42.824130536453936, 2.751619059420053)
	],
	[
		new google.maps.LatLng(42.826625439419352, 2.751831957047622),
		new google.maps.LatLng(42.826540001037301, 2.751826212830708),
		new google.maps.LatLng(42.826329590449113, 2.751828332916788),
		new google.maps.LatLng(42.826231591410959, 2.751834859767641)
	],
	[
		new google.maps.LatLng(42.826231591410959, 2.751834859767641),
		new google.maps.LatLng(42.826145279390943, 2.751840115434508),
		new google.maps.LatLng(42.826017609145481, 2.751847990469848),
		new google.maps.LatLng(42.825957365635155, 2.751849468714575)
	],
	[
		new google.maps.LatLng(42.828859362246376, 2.752341632867992),
		new google.maps.LatLng(42.828720700839199, 2.752262814577583),
		new google.maps.LatLng(42.828561361615982, 2.752185306267504),
		new google.maps.LatLng(42.828405617914669, 2.752107783942343),
		new google.maps.LatLng(42.828187004379259, 2.752062292179143),
		new google.maps.LatLng(42.827927982424058, 2.752041407155587),
		new google.maps.LatLng(42.827892006099574, 2.752037895652536),
		new google.maps.LatLng(42.827659955545371, 2.752014452858475),
		new google.maps.LatLng(42.827531326622562, 2.751996676527012),
		new google.maps.LatLng(42.827411692893698, 2.7519800848082),
		new google.maps.LatLng(42.82712195773194, 2.751898248941426),
		new google.maps.LatLng(42.827024801329429, 2.751880339383739),
		new google.maps.LatLng(42.82683049116649, 2.75184574103304),
		new google.maps.LatLng(42.826625439419352, 2.751831957047622)
	],
	[
		new google.maps.LatLng(42.831182054706602, 2.754699446817394),
		new google.maps.LatLng(42.831100061284438, 2.754627710982656),
		new google.maps.LatLng(42.830905430980955, 2.754452604128),
		new google.maps.LatLng(42.830722411026315, 2.75424324252366),
		new google.maps.LatLng(42.830595292149809, 2.754099616914535),
		new google.maps.LatLng(42.830458257506912, 2.753945039132995),
		new google.maps.LatLng(42.830434821889675, 2.753920704160877),
		new google.maps.LatLng(42.830316740009295, 2.75379658937821),
		new google.maps.LatLng(42.830271670027805, 2.753749133176942),
		new google.maps.LatLng(42.830255442300249, 2.753730876683966),
		new google.maps.LatLng(42.830051685967923, 2.753498394660502),
		new google.maps.LatLng(42.829855151215028, 2.753278099352279),
		new google.maps.LatLng(42.829673038997981, 2.75307362746669),
		new google.maps.LatLng(42.829511667766937, 2.752894723638192),
		new google.maps.LatLng(42.829469301631278, 2.752849701666753),
		new google.maps.LatLng(42.829361128982811, 2.752734100723623),
		new google.maps.LatLng(42.829179112135726, 2.752571169357918),
		new google.maps.LatLng(42.829025968605485, 2.752450874216601),
		new google.maps.LatLng(42.828859362246376, 2.752341632867992)
	],
	[
		new google.maps.LatLng(42.832657061202312, 2.755615650732834),
		new google.maps.LatLng(42.83243840543193, 2.755551816953499),
		new google.maps.LatLng(42.832321436218358, 2.755520543250724),
		new google.maps.LatLng(42.832285443418925, 2.755509699138903),
		new google.maps.LatLng(42.832142321650011, 2.755445547795503),
		new google.maps.LatLng(42.831968534844378, 2.755341209020351),
		new google.maps.LatLng(42.831908179373308, 2.75529381581497),
		new google.maps.LatLng(42.831747838770895, 2.755171094499648),
		new google.maps.LatLng(42.831594667388565, 2.755037349328803),
		new google.maps.LatLng(42.831309093937357, 2.754808866523181),
		new google.maps.LatLng(42.831182054706602, 2.754699446817394)
	],
	[
		new google.maps.LatLng(42.836607961232865, 2.754711976858471),
		new google.maps.LatLng(42.836612621834931, 2.754784046707177),
		new google.maps.LatLng(42.836603945618883, 2.754922151332083),
		new google.maps.LatLng(42.836598703721343, 2.754989374789201),
		new google.maps.LatLng(42.836591669241365, 2.755059049381325),
		new google.maps.LatLng(42.836582084589118, 2.755193492673065),
		new google.maps.LatLng(42.836579595650861, 2.755285140735639)
	],
	[
		new google.maps.LatLng(42.836579595650861, 2.755285140735639),
		new google.maps.LatLng(42.836586026590197, 2.755344984588284),
		new google.maps.LatLng(42.836609943493968, 2.75558069997314),
		new google.maps.LatLng(42.836626474885371, 2.755732138570749)
	],
	[
		new google.maps.LatLng(42.834563209895379, 2.75671825130322),
		new google.maps.LatLng(42.834462268142168, 2.756617264488697),
		new google.maps.LatLng(42.834326215508447, 2.756498098839182),
		new google.maps.LatLng(42.834264056632811, 2.756448265850377),
		new google.maps.LatLng(42.834185680868444, 2.756385061247909),
		new google.maps.LatLng(42.834037084318865, 2.756285497640382),
		new google.maps.LatLng(42.8338453054185, 2.756177562025592),
		new google.maps.LatLng(42.83377059051368, 2.756142444093068),
		new google.maps.LatLng(42.833671563793672, 2.756092767131864),
		new google.maps.LatLng(42.833651759148175, 2.756083075659577),
		new google.maps.LatLng(42.833557236951243, 2.756037044555849),
		new google.maps.LatLng(42.833280893731811, 2.755912361428225),
		new google.maps.LatLng(42.832989235384865, 2.755775526508986),
		new google.maps.LatLng(42.832689454900034, 2.755625288474135),
		new google.maps.LatLng(42.832657061202312, 2.755615650732834)
	],
	[
		new google.maps.LatLng(42.836088189678996, 2.75588468652876),
		new google.maps.LatLng(42.836349748138602, 2.755834714379979),
		new google.maps.LatLng(42.836516024654401, 2.755799804440591),
		new google.maps.LatLng(42.836568117351064, 2.755772704418862),
		new google.maps.LatLng(42.836626474885371, 2.755732138570749)
	],
	[
		new google.maps.LatLng(42.837150629303373, 2.757675128963438),
		new google.maps.LatLng(42.837116247296429, 2.757581189224318),
		new google.maps.LatLng(42.837113510238531, 2.7575640951692),
		new google.maps.LatLng(42.837100720061436, 2.757474952861271),
		new google.maps.LatLng(42.837101478892272, 2.757412634795076),
		new google.maps.LatLng(42.837121952801674, 2.757320910563806),
		new google.maps.LatLng(42.837145135961826, 2.757234062543041),
		new google.maps.LatLng(42.837153970453727, 2.757164379286674),
		new google.maps.LatLng(42.837158355987484, 2.757115486836407),
		new google.maps.LatLng(42.837146586426513, 2.75708010267026),
		new google.maps.LatLng(42.837084391313688, 2.757014381772749),
		new google.maps.LatLng(42.836944717445974, 2.756884228618708),
		new google.maps.LatLng(42.836833037711621, 2.756806497177792),
		new google.maps.LatLng(42.836783479310434, 2.756761496719904),
		new google.maps.LatLng(42.836772649839062, 2.756744435855291),
		new google.maps.LatLng(42.836721205684917, 2.756661565032472),
		new google.maps.LatLng(42.836622845286037, 2.756509246996132),
		new google.maps.LatLng(42.836475844602177, 2.756320477645268),
		new google.maps.LatLng(42.836471333942157, 2.756314386546485),
		new google.maps.LatLng(42.836423556578886, 2.756262048833323),
		new google.maps.LatLng(42.83639645877453, 2.756208401524368),
		new google.maps.LatLng(42.836421427531505, 2.756116657759559),
		new google.maps.LatLng(42.836418683323771, 2.756095899155115),
		new google.maps.LatLng(42.836414117733462, 2.756065371587348),
		new google.maps.LatLng(42.836391523488508, 2.756015371432053),
		new google.maps.LatLng(42.836334800556195, 2.755983841173677),
		new google.maps.LatLng(42.836269092108083, 2.755954792919988),
		new google.maps.LatLng(42.836205203239764, 2.755935512439565),
		new google.maps.LatLng(42.836153920848098, 2.75592350942001),
		new google.maps.LatLng(42.836088189678996, 2.75588468652876)
	],
	[
		new google.maps.LatLng(42.834563209895379, 2.75671825130322),
		new google.maps.LatLng(42.834676792721922, 2.756842400317375),
		new google.maps.LatLng(42.834822846316314, 2.757010397795938),
		new google.maps.LatLng(42.835004096304928, 2.75723445352059)
	],
	[
		new google.maps.LatLng(42.835004096304928, 2.75723445352059),
		new google.maps.LatLng(42.835013113126209, 2.757245412367026),
		new google.maps.LatLng(42.835189792232143, 2.757436498436587),
		new google.maps.LatLng(42.83539264716287, 2.757671462702576),
		new google.maps.LatLng(42.835471982194804, 2.757761546742186),
		new google.maps.LatLng(42.835636968172707, 2.757951463144767),
		new google.maps.LatLng(42.835742442605799, 2.758069541944685),
		new google.maps.LatLng(42.835830791460168, 2.758169362910682),
		new google.maps.LatLng(42.835984050764239, 2.758343447315232),
		new google.maps.LatLng(42.835998476470436, 2.758360492962868),
		new google.maps.LatLng(42.836273412081312, 2.758659921821744),
		new google.maps.LatLng(42.836485298410075, 2.758913184399714),
		new google.maps.LatLng(42.836557473939422, 2.759019185808754)
	],
	[
		new google.maps.LatLng(42.837353921685967, 2.760508995129331),
		new google.maps.LatLng(42.837452673877046, 2.760436497605976),
		new google.maps.LatLng(42.837643857059156, 2.76027931083521),
		new google.maps.LatLng(42.837907725780639, 2.760054619861501),
		new google.maps.LatLng(42.838181462658881, 2.75982011098109),
		new google.maps.LatLng(42.838111070243464, 2.759706767835226),
		new google.maps.LatLng(42.837916193938334, 2.759419212347321),
		new google.maps.LatLng(42.837759215758759, 2.759190150847146),
		new google.maps.LatLng(42.837694297154748, 2.759112221020729),
		new google.maps.LatLng(42.83770311383784, 2.759033984401415),
		new google.maps.LatLng(42.837729870648502, 2.758936123875471),
		new google.maps.LatLng(42.837731503692559, 2.758862805830117),
		new google.maps.LatLng(42.837701711665879, 2.758810388805924),
		new google.maps.LatLng(42.837662958186371, 2.758771449277369),
		new google.maps.LatLng(42.837621431534643, 2.75869953280846),
		new google.maps.LatLng(42.837569115416031, 2.758627659782123),
		new google.maps.LatLng(42.837523091170354, 2.758554539042006),
		new google.maps.LatLng(42.837493320581054, 2.758511897356248),
		new google.maps.LatLng(42.837457289197701, 2.758483944642846),
		new google.maps.LatLng(42.837404172084668, 2.758456062383156),
		new google.maps.LatLng(42.837346528905321, 2.758414759116487),
		new google.maps.LatLng(42.837292490840433, 2.758377105499199),
		new google.maps.LatLng(42.837278881480728, 2.758323400117336),
		new google.maps.LatLng(42.837265197729451, 2.758236704981665),
		new google.maps.LatLng(42.837261375511922, 2.758136528917107),
		new google.maps.LatLng(42.837260032187672, 2.757939815813697),
		new google.maps.LatLng(42.837252618419747, 2.75784209791298),
		new google.maps.LatLng(42.837217370124499, 2.757762824513841),
		new google.maps.LatLng(42.837181257947542, 2.757699438585665),
		new google.maps.LatLng(42.837150629303373, 2.757675128963438)
	],
	[
		new google.maps.LatLng(42.836557473939422, 2.759019185808754),
		new google.maps.LatLng(42.836654917857452, 2.759165402339678),
		new google.maps.LatLng(42.836794805234909, 2.759392087037414),
		new google.maps.LatLng(42.836959138557013, 2.75969320316343),
		new google.maps.LatLng(42.837008808434803, 2.759788302794481),
		new google.maps.LatLng(42.837107243466356, 2.759976060738299),
		new google.maps.LatLng(42.837192170970873, 2.760155323554984)
	],
	[
		new google.maps.LatLng(42.840013004574949, 2.761354597620264),
		new google.maps.LatLng(42.84019618040611, 2.761235319339243),
		new google.maps.LatLng(42.840830108706079, 2.760820923468164),
		new google.maps.LatLng(42.840893868282407, 2.760782781683695),
		new google.maps.LatLng(42.840939616274248, 2.760732493338307),
		new google.maps.LatLng(42.840979920275402, 2.760660232925006),
		new google.maps.LatLng(42.841050497417783, 2.76045343527897),
		new google.maps.LatLng(42.841084419259268, 2.760342099078127),
		new google.maps.LatLng(42.841087947994723, 2.760311536291725),
		new google.maps.LatLng(42.841087795299494, 2.760243108450126),
		new google.maps.LatLng(42.84104065385165, 2.760072231328361),
		new google.maps.LatLng(42.840966385093083, 2.759834260968801),
		new google.maps.LatLng(42.840952811650638, 2.759796436900613),
		new google.maps.LatLng(42.840945536168498, 2.759759809260129),
		new google.maps.LatLng(42.840943697107193, 2.759741487229582),
		new google.maps.LatLng(42.840943647215006, 2.759719493144983),
		new google.maps.LatLng(42.840951644973437, 2.759676691936245),
		new google.maps.LatLng(42.840996411441793, 2.759589749377483),
		new google.maps.LatLng(42.841072633098491, 2.759495345545727),
		new google.maps.LatLng(42.841106759734238, 2.75947565288351),
		new google.maps.LatLng(42.841166985207437, 2.759465628212644),
		new google.maps.LatLng(42.841253279396369, 2.759451829631067),
		new google.maps.LatLng(42.841292831307015, 2.759445556596024),
		new google.maps.LatLng(42.841318023079666, 2.759451561810846),
		new google.maps.LatLng(42.841334233522119, 2.759462491663346),
		new google.maps.LatLng(42.841365777458876, 2.759494131729994),
		new google.maps.LatLng(42.841407248518614, 2.759541615847519),
		new google.maps.LatLng(42.841451430453965, 2.759595198854783),
		new google.maps.LatLng(42.841505542051465, 2.759665848111615),
		new google.maps.LatLng(42.841519983883664, 2.759690227021309),
		new google.maps.LatLng(42.841538078121118, 2.759739030476361),
		new google.maps.LatLng(42.841567921256342, 2.759814667621641),
		new google.maps.LatLng(42.8415823828512, 2.759847600136617),
		new google.maps.LatLng(42.841619363089869, 2.759897547565224),
		new google.maps.LatLng(42.841690559310706, 2.759968126050753),
		new google.maps.LatLng(42.841741000350432, 2.760005798922429),
		new google.maps.LatLng(42.841786015264653, 2.760030051989633),
		new google.maps.LatLng(42.841832821153815, 2.760050631763435),
		new google.maps.LatLng(42.841903897087732, 2.760067444877804),
		new google.maps.LatLng(42.841967782646392, 2.76008551051044),
		new google.maps.LatLng(42.842027177524493, 2.760106039089115),
		new google.maps.LatLng(42.842057791894874, 2.760124242458575),
		new google.maps.LatLng(42.84212172892132, 2.760165524823973),
		new google.maps.LatLng(42.8421307377509, 2.760172818994417),
		new google.maps.LatLng(42.842226234784043, 2.760253075087562),
		new google.maps.LatLng(42.842339787108266, 2.760365027176411),
		new google.maps.LatLng(42.842437981130587, 2.760445272163139),
		new google.maps.LatLng(42.84251188618763, 2.760520729052556),
		new google.maps.LatLng(42.842570542742536, 2.760613356361552),
		new google.maps.LatLng(42.842711394979858, 2.76087061219154),
		new google.maps.LatLng(42.842917186971881, 2.761215584727231),
		new google.maps.LatLng(42.842994858835247, 2.761368012935343),
		new google.maps.LatLng(42.843034576534428, 2.761436280420075)
	],
	[
		new google.maps.LatLng(42.837192170970873, 2.760155323554984),
		new google.maps.LatLng(42.8372192703848, 2.760210195305385),
		new google.maps.LatLng(42.837329484410823, 2.760438227559674),
		new google.maps.LatLng(42.837353921685967, 2.760508995129331)
	],
	[
		new google.maps.LatLng(42.837353921685967, 2.760508995129331),
		new google.maps.LatLng(42.837401888173396, 2.760646867836883),
		new google.maps.LatLng(42.837471769779896, 2.760934938696825),
		new google.maps.LatLng(42.837534436366411, 2.761213265413678)
	],
	[
		new google.maps.LatLng(42.838315911186356, 2.761236935408666),
		new google.maps.LatLng(42.838410231311506, 2.761192561156457),
		new google.maps.LatLng(42.838531594723733, 2.761178621570456),
		new google.maps.LatLng(42.838607071463194, 2.761152650807743),
		new google.maps.LatLng(42.838675308184364, 2.761105938994534),
		new google.maps.LatLng(42.838730953324813, 2.76105805734775),
		new google.maps.LatLng(42.838870923060853, 2.76091940810962),
		new google.maps.LatLng(42.839048561145496, 2.760736614274277),
		new google.maps.LatLng(42.839167066328343, 2.760650593408449),
		new google.maps.LatLng(42.839252497347751, 2.760652686018689),
		new google.maps.LatLng(42.839300223874552, 2.760683036015496),
		new google.maps.LatLng(42.839390311718638, 2.760757200988599),
		new google.maps.LatLng(42.839477745145345, 2.760850928490681),
		new google.maps.LatLng(42.839484067043941, 2.760863121159669),
		new google.maps.LatLng(42.839500321007677, 2.760893601717269),
		new google.maps.LatLng(42.839526596856679, 2.760982692374984),
		new google.maps.LatLng(42.839553850641423, 2.761107214776386),
		new google.maps.LatLng(42.839596423790361, 2.761246336984526),
		new google.maps.LatLng(42.839652425323131, 2.761358522960184),
		new google.maps.LatLng(42.839713748460071, 2.761437694788921),
		new google.maps.LatLng(42.83977134953215, 2.76146067500862),
		new google.maps.LatLng(42.839818114176964, 2.761462926510734),
		new google.maps.LatLng(42.839895375988583, 2.761430839452718),
		new google.maps.LatLng(42.840013004574949, 2.761354597620264)
	],
	[
		new google.maps.LatLng(42.837534436366411, 2.761213265413678),
		new google.maps.LatLng(42.837579469837557, 2.761246070705823),
		new google.maps.LatLng(42.837600246872547, 2.761288750934556),
		new google.maps.LatLng(42.837641958917182, 2.761444978347946),
		new google.maps.LatLng(42.837699008065279, 2.761624358328557),
		new google.maps.LatLng(42.837757777173039, 2.761768297595229),
		new google.maps.LatLng(42.837784802470324, 2.761790180495655),
		new google.maps.LatLng(42.837797412773469, 2.761799903383682),
		new google.maps.LatLng(42.837839686707007, 2.761804617689013),
		new google.maps.LatLng(42.837881879648506, 2.761772676999891),
		new google.maps.LatLng(42.83791321909672, 2.761712675876813),
		new google.maps.LatLng(42.837939073757823, 2.76161237679072),
		new google.maps.LatLng(42.837976601775004, 2.761504697847267),
		new google.maps.LatLng(42.83804377362393, 2.761383456915264),
		new google.maps.LatLng(42.838120027597448, 2.761302499814035),
		new google.maps.LatLng(42.83819185229099, 2.761252108517734),
		new google.maps.LatLng(42.838237734738271, 2.761261694316223)
	],
	[
		new google.maps.LatLng(42.837534436366411, 2.761213265413678),
		new google.maps.LatLng(42.837545330105016, 2.761259652334863),
		new google.maps.LatLng(42.837660474815038, 2.761684388241527),
		new google.maps.LatLng(42.837726459887591, 2.761838072363811),
		new google.maps.LatLng(42.837758972391292, 2.761901476345505)
	],
	[
		new google.maps.LatLng(42.838237734738271, 2.761261694316223),
		new google.maps.LatLng(42.838259326497109, 2.761266493043421),
		new google.maps.LatLng(42.838315911186356, 2.761236935408666)
	],
	[
		new google.maps.LatLng(42.842204962435119, 2.762007898528442),
		new google.maps.LatLng(42.842227234510482, 2.761913715845866),
		new google.maps.LatLng(42.842884978068646, 2.761693509717615),
		new google.maps.LatLng(42.843034576534428, 2.761436280420075)
	],
	[
		new google.maps.LatLng(42.837796882567879, 2.761966080434746),
		new google.maps.LatLng(42.837782443760872, 2.761942923274103),
		new google.maps.LatLng(42.837758972391292, 2.761901476345505)
	],
	[
		new google.maps.LatLng(42.838812910054678, 2.763143485590939),
		new google.maps.LatLng(42.838745323286439, 2.763077778721049),
		new google.maps.LatLng(42.838702066943881, 2.763035189379708),
		new google.maps.LatLng(42.838620959518238, 2.762954875952798),
		new google.maps.LatLng(42.838365923473823, 2.762702987048324),
		new google.maps.LatLng(42.838201888168747, 2.762532593931956),
		new google.maps.LatLng(42.83815591234945, 2.762480240591953),
		new google.maps.LatLng(42.83808109050036, 2.762396237066992),
		new google.maps.LatLng(42.83796656336952, 2.762248859401341),
		new google.maps.LatLng(42.837886251678057, 2.762122113201545),
		new google.maps.LatLng(42.837796882567879, 2.761966080434746)
	],
	[
		new google.maps.LatLng(42.842276780544928, 2.762359529502254),
		new google.maps.LatLng(42.842173734457127, 2.762118003328854),
		new google.maps.LatLng(42.842188643788226, 2.762065434620887),
		new google.maps.LatLng(42.842204962435119, 2.762007898528442)
	],
	[
		new google.maps.LatLng(42.842801383702536, 2.763741880035925),
		new google.maps.LatLng(42.8428165485767, 2.763278690248946),
		new google.maps.LatLng(42.84279741153734, 2.763163902718541),
		new google.maps.LatLng(42.842740486195929, 2.763039493958325),
		new google.maps.LatLng(42.84252407168178, 2.76276787815612),
		new google.maps.LatLng(42.842276780544928, 2.762359529502254)
	],
	[
		new google.maps.LatLng(42.839310428721056, 2.763664431021173),
		new google.maps.LatLng(42.838917448422571, 2.763246920507714),
		new google.maps.LatLng(42.838812910054678, 2.763143485590939)
	],
	[
		new google.maps.LatLng(42.839328462018422, 2.763686352115982),
		new google.maps.LatLng(42.839310428721056, 2.763664431021173)
	],
	[
		new google.maps.LatLng(42.839414110423803, 2.763787421721702),
		new google.maps.LatLng(42.839371657536553, 2.763737515464541),
		new google.maps.LatLng(42.839365426141001, 2.763730189690549),
		new google.maps.LatLng(42.839328462018422, 2.763686352115982)
	],
	[
		new google.maps.LatLng(42.84385639444146, 2.766306226028469),
		new google.maps.LatLng(42.843850091538492, 2.766302585805651),
		new google.maps.LatLng(42.843781564550973, 2.766217321511826),
		new google.maps.LatLng(42.843687702782319, 2.766060061582256),
		new google.maps.LatLng(42.843488050422536, 2.765636835840378),
		new google.maps.LatLng(42.84335080289835, 2.765378328900368),
		new google.maps.LatLng(42.843007056522602, 2.764856710392698),
		new google.maps.LatLng(42.842853517171335, 2.764550615326413),
		new google.maps.LatLng(42.842823577590053, 2.764429761445172),
		new google.maps.LatLng(42.842836319438625, 2.764090001713036),
		new google.maps.LatLng(42.842801383702536, 2.763741880035925)
	],
	[
		new google.maps.LatLng(42.840013119755227, 2.765074107341178),
		new google.maps.LatLng(42.839978764872228, 2.76498993332327),
		new google.maps.LatLng(42.839903712408727, 2.764799619460315),
		new google.maps.LatLng(42.839764423855435, 2.764431165408383),
		new google.maps.LatLng(42.839695737592209, 2.764273818738173),
		new google.maps.LatLng(42.839563004739134, 2.764025087635832),
		new google.maps.LatLng(42.839481763565395, 2.763883676909436),
		new google.maps.LatLng(42.839414110423803, 2.763787421721702)
	],
	[
		new google.maps.LatLng(42.840013119755227, 2.765074107341178),
		new google.maps.LatLng(42.840137930274317, 2.765402297546727),
		new google.maps.LatLng(42.840173180785378, 2.765485246519167),
		new google.maps.LatLng(42.840236353528425, 2.765588854293978),
		new google.maps.LatLng(42.840304026108726, 2.765694888193353),
		new google.maps.LatLng(42.840387872433503, 2.765794748122804),
		new google.maps.LatLng(42.840570831617278, 2.765985853856943),
		new google.maps.LatLng(42.840807899605473, 2.766248835818216),
		new google.maps.LatLng(42.840974650742275, 2.766430233449157),
		new google.maps.LatLng(42.841095417662018, 2.766554386012977),
		new google.maps.LatLng(42.841153128921476, 2.766628692462122),
		new google.maps.LatLng(42.841182002116966, 2.766673788181474),
		new google.maps.LatLng(42.841212692357999, 2.766727429432626)
	],
	[
		new google.maps.LatLng(42.844402585358765, 2.766885704331944),
		new google.maps.LatLng(42.844293291141049, 2.766661293922327),
		new google.maps.LatLng(42.844193118696786, 2.766496726492215),
		new google.maps.LatLng(42.8441083636801, 2.766391974217863),
		new google.maps.LatLng(42.844053437353772, 2.766357979384818),
		new google.maps.LatLng(42.843933806654881, 2.766342573934092),
		new google.maps.LatLng(42.84385639444146, 2.766306226028469)
	],
	[
		new google.maps.LatLng(42.841212692357999, 2.766727429432626),
		new google.maps.LatLng(42.841294985543392, 2.766940938867278),
		new google.maps.LatLng(42.841351965096479, 2.767092232196437),
		new google.maps.LatLng(42.841439634421107, 2.767297167535377),
		new google.maps.LatLng(42.841528110207022, 2.767459331132561),
		new google.maps.LatLng(42.841600264417139, 2.767559243057267),
		new google.maps.LatLng(42.841648940890643, 2.7676140359509),
		new google.maps.LatLng(42.84168046923169, 2.76763957099875)
	],
	[
		new google.maps.LatLng(42.84493692962392, 2.768225337335221),
		new google.maps.LatLng(42.844915954878068, 2.768089776526101),
		new google.maps.LatLng(42.844783896633885, 2.767733475004485),
		new google.maps.LatLng(42.844624832304227, 2.76736384120065),
		new google.maps.LatLng(42.84445588328812, 2.766997915530617),
		new google.maps.LatLng(42.844402585358765, 2.766885704331944)
	],
	[
		new google.maps.LatLng(42.84168046923169, 2.76763957099875),
		new google.maps.LatLng(42.841737241339523, 2.767695553282694)
	],
	[
		new google.maps.LatLng(42.841737241339523, 2.767695553282694),
		new google.maps.LatLng(42.841862417752452, 2.767780590142771),
		new google.maps.LatLng(42.841988471762058, 2.767855847023005),
		new google.maps.LatLng(42.842094737907736, 2.767928740346693),
		new google.maps.LatLng(42.842203781027344, 2.768038281367327),
		new google.maps.LatLng(42.842306592697859, 2.768177174933967),
		new google.maps.LatLng(42.84241667693346, 2.76835269847714),
		new google.maps.LatLng(42.842520471352124, 2.768530691696611),
		new google.maps.LatLng(42.842620711331726, 2.768728251844216),
		new google.maps.LatLng(42.842677620578797, 2.768847778293072)
	],
	[
		new google.maps.LatLng(42.844977373075977, 2.77030627390402),
		new google.maps.LatLng(42.844985143949472, 2.770155935515259),
		new google.maps.LatLng(42.844962098059561, 2.769892070346328),
		new google.maps.LatLng(42.844929094436765, 2.769597693931342),
		new google.maps.LatLng(42.844909661911963, 2.769342369802598),
		new google.maps.LatLng(42.844903795801521, 2.769123652177843),
		new google.maps.LatLng(42.844909617354467, 2.768903666267854),
		new google.maps.LatLng(42.844936893043652, 2.768624937515177),
		new google.maps.LatLng(42.84495441072675, 2.768408570509967),
		new google.maps.LatLng(42.844951501738365, 2.768310819895153),
		new google.maps.LatLng(42.844948701580336, 2.768263172434268),
		new google.maps.LatLng(42.84493692962392, 2.768225337335221)
	],
	[
		new google.maps.LatLng(42.842677620578797, 2.768847778293072),
		new google.maps.LatLng(42.842788724038215, 2.769079511571555),
		new google.maps.LatLng(42.842892680324823, 2.769333268539876),
		new google.maps.LatLng(42.842968655952454, 2.76953825941266),
		new google.maps.LatLng(42.843003976987603, 2.769655429534268),
		new google.maps.LatLng(42.843016668437855, 2.769703036262555)
	],
	[
		new google.maps.LatLng(42.843016668437855, 2.769703036262555),
		new google.maps.LatLng(42.843035756777397, 2.76979827444038),
		new google.maps.LatLng(42.843048685798088, 2.769957080033926),
		new google.maps.LatLng(42.843049019117245, 2.770112270976619)
	],
	[
		new google.maps.LatLng(42.843049019117245, 2.770112270976619),
		new google.maps.LatLng(42.843044724438847, 2.770206380214097)
	],
	[
		new google.maps.LatLng(42.843044724438847, 2.770206380214097),
		new google.maps.LatLng(42.8430372194561, 2.770481354981188),
		new google.maps.LatLng(42.84303771079616, 2.770711084176515),
		new google.maps.LatLng(42.84305985300356, 2.770973722628306),
		new google.maps.LatLng(42.843091899622273, 2.771242431696058),
		new google.maps.LatLng(42.843127380518808, 2.771435364775425),
		new google.maps.LatLng(42.843168130797046, 2.771569622665746)
	],
	[
		new google.maps.LatLng(42.845029502580395, 2.771135820242939),
		new google.maps.LatLng(42.845019391381591, 2.771033209758588),
		new google.maps.LatLng(42.844998521901509, 2.770945306651518),
		new google.maps.LatLng(42.844976786694531, 2.770873292803639),
		new google.maps.LatLng(42.844956855035811, 2.770803716693536),
		new google.maps.LatLng(42.844942313582635, 2.770731675040401),
		new google.maps.LatLng(42.844940374257376, 2.770665693932066),
		new google.maps.LatLng(42.844941142744375, 2.770604590303259),
		new google.maps.LatLng(42.84495086999344, 2.770527563764944),
		new google.maps.LatLng(42.844969549264043, 2.770432173596429),
		new google.maps.LatLng(42.844977373075977, 2.77030627390402)
	],
	[
		new google.maps.LatLng(42.845671847862981, 2.772544738313069),
		new google.maps.LatLng(42.845662718178467, 2.772480006261859),
		new google.maps.LatLng(42.845623875404257, 2.772397060403357),
		new google.maps.LatLng(42.845511063464883, 2.772204421076455),
		new google.maps.LatLng(42.845344142386239, 2.771938673569431),
		new google.maps.LatLng(42.845233151244848, 2.771757027734463),
		new google.maps.LatLng(42.845170873705335, 2.771648513230673),
		new google.maps.LatLng(42.845128414935253, 2.771557027804364),
		new google.maps.LatLng(42.845089509175793, 2.771444754589699),
		new google.maps.LatLng(42.845062228168267, 2.771301886232368),
		new google.maps.LatLng(42.845029502580395, 2.771135820242939)
	],
	[
		new google.maps.LatLng(42.843168130797046, 2.771569622665746),
		new google.maps.LatLng(42.843183526811444, 2.771620885151773),
		new google.maps.LatLng(42.84324596576112, 2.771805159259578),
		new google.maps.LatLng(42.843321026942562, 2.772005270302115),
		new google.maps.LatLng(42.843381570050227, 2.772144338539035),
		new google.maps.LatLng(42.843455572720153, 2.772269912513977),
		new google.maps.LatLng(42.843588231907766, 2.772493016717022),
		new google.maps.LatLng(42.843697418349791, 2.772672222571258),
		new google.maps.LatLng(42.843773360963347, 2.77286500112528),
		new google.maps.LatLng(42.843840476960558, 2.77313602132618),
		new google.maps.LatLng(42.843894939071916, 2.773376541684132),
		new google.maps.LatLng(42.843970474441697, 2.773802724172164),
		new google.maps.LatLng(42.844049164251388, 2.774019933403809),
		new google.maps.LatLng(42.84418548863934, 2.774277246022504),
		new google.maps.LatLng(42.844270328751804, 2.774426001027202)
	],
	[
		new google.maps.LatLng(42.845671847862981, 2.772544738313069),
		new google.maps.LatLng(42.845668380310443, 2.772605853788074),
		new google.maps.LatLng(42.845657740149193, 2.772676773240612),
		new google.maps.LatLng(42.845638991265069, 2.772740392944648),
		new google.maps.LatLng(42.845617536118873, 2.772800355955835),
		new google.maps.LatLng(42.845596071217059, 2.772855431385802),
		new google.maps.LatLng(42.845568311788632, 2.772910531123967),
		new google.maps.LatLng(42.845540527132712, 2.772953411366181),
		new google.maps.LatLng(42.845515420778256, 2.772987726347927),
		new google.maps.LatLng(42.845485813740027, 2.773019614655488),
		new google.maps.LatLng(42.84545977554184, 2.773038046886902),
		new google.maps.LatLng(42.84542743708122, 2.773054059062849),
		new google.maps.LatLng(42.845391493961927, 2.773066420314418),
		new google.maps.LatLng(42.845363634308171, 2.773073860651546)
	],
	[
		new google.maps.LatLng(42.845363634308171, 2.773073860651546),
		new google.maps.LatLng(42.845312469375713, 2.773116831381818),
		new google.maps.LatLng(42.845288262314654, 2.773151142870343),
		new google.maps.LatLng(42.845273019262656, 2.773171976092775)
	],
	[
		new google.maps.LatLng(42.845273019262656, 2.773171976092775),
		new google.maps.LatLng(42.845234777033497, 2.773372537639148)
	],
	[
		new google.maps.LatLng(42.845234777033497, 2.773372537639148),
		new google.maps.LatLng(42.845233107724219, 2.773433646043323),
		new google.maps.LatLng(42.845298010743591, 2.773509158492357),
		new google.maps.LatLng(42.845438639616461, 2.7736748057036),
		new google.maps.LatLng(42.845520693230618, 2.773780803499568),
		new google.maps.LatLng(42.845582050657285, 2.773880771174882),
		new google.maps.LatLng(42.845653359107914, 2.774008807165894),
		new google.maps.LatLng(42.845730074040866, 2.774141710060408),
		new google.maps.LatLng(42.845808539512419, 2.774252610893219),
		new google.maps.LatLng(42.845922987061982, 2.774369481913735),
		new google.maps.LatLng(42.846135547371375, 2.774532410072056),
		new google.maps.LatLng(42.846444446560838, 2.774753624022841),
		new google.maps.LatLng(42.846668662842163, 2.77490062356257),
		new google.maps.LatLng(42.846828083492582, 2.775023433834273)
	],
	[
		new google.maps.LatLng(42.844270328751804, 2.774426001027202),
		new google.maps.LatLng(42.844323569815302, 2.774515001021826)
	],
	[
		new google.maps.LatLng(42.844323569815302, 2.774515001021826),
		new google.maps.LatLng(42.844522047190296, 2.774823398895681),
		new google.maps.LatLng(42.844607777803652, 2.774968485675424),
		new google.maps.LatLng(42.844663742347919, 2.775069696076431),
		new google.maps.LatLng(42.844701732269513, 2.775175864430627),
		new google.maps.LatLng(42.844733440517047, 2.775288166662256),
		new google.maps.LatLng(42.84493343294352, 2.77589229231186),
		new google.maps.LatLng(42.845009436018657, 2.776116850430872)
	],
	[
		new google.maps.LatLng(42.847072246148002, 2.775248569454924),
		new google.maps.LatLng(42.846828083492582, 2.775023433834273)
	],
	[
		new google.maps.LatLng(42.847788547440729, 2.775925274013602),
		new google.maps.LatLng(42.847673198867852, 2.77580717761861),
		new google.maps.LatLng(42.847263256699996, 2.775427474648323),
		new google.maps.LatLng(42.847072246148002, 2.775248569454924)
	],
	[
		new google.maps.LatLng(42.848132732534474, 2.776682862368498),
		new google.maps.LatLng(42.84807932691939, 2.776514419248842),
		new google.maps.LatLng(42.84800692830796, 2.776293500742052),
		new google.maps.LatLng(42.847953614680705, 2.776169053934958),
		new google.maps.LatLng(42.847902159831278, 2.776073929597771),
		new google.maps.LatLng(42.847857952699925, 2.776004442612387),
		new google.maps.LatLng(42.847820076296358, 2.775952038071409),
		new google.maps.LatLng(42.847788547440729, 2.775925274013602)
	],
	[
		new google.maps.LatLng(42.845009436018657, 2.776116850430872),
		new google.maps.LatLng(42.845143387013827, 2.776531822029347),
		new google.maps.LatLng(42.84520123941963, 2.776677020681707)
	],
	[
		new google.maps.LatLng(42.84520123941963, 2.776677020681707),
		new google.maps.LatLng(42.845248202747214, 2.776774601967456),
		new google.maps.LatLng(42.845286988581044, 2.7768318878746),
		new google.maps.LatLng(42.84531763312367, 2.776865987667281),
		new google.maps.LatLng(42.84534284875032, 2.776884221004534),
		new google.maps.LatLng(42.845355458655739, 2.776893948156854),
		new google.maps.LatLng(42.845411240274416, 2.776908398505463),
		new google.maps.LatLng(42.845475999192622, 2.776915482078007),
		new google.maps.LatLng(42.845549720184302, 2.776907866941106),
		new google.maps.LatLng(42.845606358747524, 2.776901539306514),
		new google.maps.LatLng(42.8456549336804, 2.776909907171131),
		new google.maps.LatLng(42.845694520270307, 2.776919530910094),
		new google.maps.LatLng(42.845724217378013, 2.776930416220378)
	],
	[
		new google.maps.LatLng(42.848132732534474, 2.776682862368498),
		new google.maps.LatLng(42.84815448647214, 2.77676587965889),
		new google.maps.LatLng(42.84819510622733, 2.776840271922316),
		new google.maps.LatLng(42.848282574414696, 2.776957255701455)
	],
	[
		new google.maps.LatLng(42.845724217378013, 2.776930416220378),
		new google.maps.LatLng(42.845772828433915, 2.776955892388781),
		new google.maps.LatLng(42.845823278161859, 2.777000913557975),
		new google.maps.LatLng(42.845869268167611, 2.777063060530959),
		new google.maps.LatLng(42.845918011350427, 2.777152082529475),
		new google.maps.LatLng(42.84598846239696, 2.777302123349885),
		new google.maps.LatLng(42.846167310682908, 2.777688825664993),
		new google.maps.LatLng(42.846235937655976, 2.777826654580432),
		new google.maps.LatLng(42.846298216448687, 2.777938845015678),
		new google.maps.LatLng(42.846365842444754, 2.778027795621693),
		new google.maps.LatLng(42.84638566362559, 2.778046050333633)
	],
	[
		new google.maps.LatLng(42.848282574414696, 2.776957255701455),
		new google.maps.LatLng(42.848502476930172, 2.777193498122433)
	],
	[
		new google.maps.LatLng(42.848502476930172, 2.777193498122433),
		new google.maps.LatLng(42.848551143969367, 2.777245861445281),
		new google.maps.LatLng(42.848697114548692, 2.777388287334849)
	],
	[
		new google.maps.LatLng(42.848697114548692, 2.777388287334849),
		new google.maps.LatLng(42.848822360484306, 2.777510017348963)
	],
	[
		new google.maps.LatLng(42.848727463127481, 2.777713248193924),
		new google.maps.LatLng(42.848822360484306, 2.777510017348963)
	],
	[
		new google.maps.LatLng(42.848655839463085, 2.777865062324303),
		new google.maps.LatLng(42.848666579517314, 2.777840579748382),
		new google.maps.LatLng(42.848727463127481, 2.777713248193924)
	],
	[
		new google.maps.LatLng(42.84837747717237, 2.778493059608297),
		new google.maps.LatLng(42.84853050468675, 2.778134402035251),
		new google.maps.LatLng(42.848644200062935, 2.777889549346619)
	],
	[
		new google.maps.LatLng(42.84638566362559, 2.778046050333633),
		new google.maps.LatLng(42.846446027070989, 2.778102034748974),
		new google.maps.LatLng(42.846563080201996, 2.77817613198166),
		new google.maps.LatLng(42.846832209875984, 2.778302199215533),
		new google.maps.LatLng(42.847212918248765, 2.778464502740102)
	],
	[
		new google.maps.LatLng(42.847212918248765, 2.778464502740102),
		new google.maps.LatLng(42.84736322155284, 2.778528699686318)
	],
	[
		new google.maps.LatLng(42.848066306624546, 2.778910976005227),
		new google.maps.LatLng(42.848117398203328, 2.778831345841185),
		new google.maps.LatLng(42.848308463625898, 2.778603309690254),
		new google.maps.LatLng(42.84837747717237, 2.778493059608297)
	],
	[
		new google.maps.LatLng(42.84736322155284, 2.778528699686318),
		new google.maps.LatLng(42.847476623653392, 2.778577149825777)
	],
	[
		new google.maps.LatLng(42.847476623653392, 2.778577149825777),
		new google.maps.LatLng(42.847682727555203, 2.77866435416871)
	],
	[
		new google.maps.LatLng(42.847682727555203, 2.77866435416871),
		new google.maps.LatLng(42.847821330709166, 2.778723708666181),
		new google.maps.LatLng(42.847902343406695, 2.778763728287865)
	],
	[
		new google.maps.LatLng(42.847902343406695, 2.778763728287865),
		new google.maps.LatLng(42.84792934793515, 2.7787770677762),
		new google.maps.LatLng(42.847974384304571, 2.778813559313974),
		new google.maps.LatLng(42.848008617612024, 2.778843980765089),
		new google.maps.LatLng(42.848066306624546, 2.778910976005227)
	],
	[
		new google.maps.LatLng(42.847932722979536, 2.77910579573496),
		new google.maps.LatLng(42.847996391865536, 2.779020007262333),
		new google.maps.LatLng(42.848066306624546, 2.778910976005227)
	],
	[
		new google.maps.LatLng(42.84778396220311, 2.779354442593495),
		new google.maps.LatLng(42.847814433111452, 2.779304221854265),
		new google.maps.LatLng(42.847888784528351, 2.779165843964861),
		new google.maps.LatLng(42.847932722979536, 2.77910579573496)
	],
	[
		new google.maps.LatLng(42.84778396220311, 2.779354442593495),
		new google.maps.LatLng(42.847684251781828, 2.779404926276889),
		new google.maps.LatLng(42.84756403753105, 2.779542254532484)
	],
	[
		new google.maps.LatLng(42.84771357961138, 2.779673671882809),
		new google.maps.LatLng(42.847721499236762, 2.779589318782439),
		new google.maps.LatLng(42.847743739151554, 2.779471914048645),
		new google.maps.LatLng(42.847768730733428, 2.779381386293935),
		new google.maps.LatLng(42.84778396220311, 2.779354442593495)
	],
	[
		new google.maps.LatLng(42.84756403753105, 2.779542254532484),
		new google.maps.LatLng(42.847546993173694, 2.779561872350631),
		new google.maps.LatLng(42.847424160658335, 2.779738317194376),
		new google.maps.LatLng(42.847254699825172, 2.77997848464679),
		new google.maps.LatLng(42.847083476883327, 2.780236988031011),
		new google.maps.LatLng(42.846966933113862, 2.780410960967357),
		new google.maps.LatLng(42.846902414419347, 2.780521190426775),
		new google.maps.LatLng(42.84684329871817, 2.780635064707255),
		new google.maps.LatLng(42.846750151877963, 2.780817502691596),
		new google.maps.LatLng(42.846600635250397, 2.781138244485373),
		new google.maps.LatLng(42.846486942238677, 2.781387971938988)
	],
	[
		new google.maps.LatLng(42.847795250353123, 2.780473822644052),
		new google.maps.LatLng(42.847778921922995, 2.780404226263674),
		new google.maps.LatLng(42.847748920275038, 2.780244247284264),
		new google.maps.LatLng(42.847721600508393, 2.780076926692912),
		new google.maps.LatLng(42.84770412725792, 2.779887570850936),
		new google.maps.LatLng(42.847709189138001, 2.779725015545063),
		new google.maps.LatLng(42.84771357961138, 2.779673671882809)
	],
	[
		new google.maps.LatLng(42.847942919437372, 2.781009758907059),
		new google.maps.LatLng(42.84785697746976, 2.780757112676099),
		new google.maps.LatLng(42.847815206100627, 2.780558070655737),
		new google.maps.LatLng(42.847795250353123, 2.780473822644052)
	],
	[
		new google.maps.LatLng(42.847942919437372, 2.781009758907059),
		new google.maps.LatLng(42.847836039678825, 2.781072487876841),
		new google.maps.LatLng(42.847601733862135, 2.781265236143605),
		new google.maps.LatLng(42.847529915906804, 2.781324166240686)
	],
	[
		new google.maps.LatLng(42.847529915906804, 2.781324166240686),
		new google.maps.LatLng(42.847423982470616, 2.781410109704743),
		new google.maps.LatLng(42.847196042860702, 2.781638271494355),
		new google.maps.LatLng(42.847016489963814, 2.781781927162398)
	],
	[
		new google.maps.LatLng(42.846486942238677, 2.781387971938988),
		new google.maps.LatLng(42.84646188374245, 2.781446724501528)
	],
	[
		new google.maps.LatLng(42.847016489963814, 2.781781927162398),
		new google.maps.LatLng(42.847004819892071, 2.78179174740014),
		new google.maps.LatLng(42.846942830648906, 2.781820087204134),
		new google.maps.LatLng(42.846893380995688, 2.781823939422132),
		new google.maps.LatLng(42.846860105136223, 2.78182161975879),
		new google.maps.LatLng(42.846823224900689, 2.781815648595594),
		new google.maps.LatLng(42.846780027343037, 2.781798702179495),
		new google.maps.LatLng(42.846702495158013, 2.781701228742281),
		new google.maps.LatLng(42.846486942238677, 2.781387971938988)
	],
	[
		new google.maps.LatLng(42.84646188374245, 2.781446724501528),
		new google.maps.LatLng(42.846418907797343, 2.781538538945011)
	],
	[
		new google.maps.LatLng(42.846418907797343, 2.781538538945011),
		new google.maps.LatLng(42.846375942031599, 2.781635243307164),
		new google.maps.LatLng(42.846128949101967, 2.782222752067707)
	],
	[
		new google.maps.LatLng(42.84604215604088, 2.782435712263874),
		new google.maps.LatLng(42.846128949101967, 2.782222752067707)
	],
	[
		new google.maps.LatLng(42.845859739512207, 2.784727714879535),
		new google.maps.LatLng(42.84584772807802, 2.784567672423933),
		new google.maps.LatLng(42.845826385500963, 2.784239024139104),
		new google.maps.LatLng(42.84581055855881, 2.783970234981883),
		new google.maps.LatLng(42.845803005364644, 2.783791845378481),
		new google.maps.LatLng(42.845801845332957, 2.783662314232451),
		new google.maps.LatLng(42.84580615895095, 2.783571867093017),
		new google.maps.LatLng(42.845811366307046, 2.783478973626711),
		new google.maps.LatLng(42.845815662649287, 2.783379972318528),
		new google.maps.LatLng(42.845821787228097, 2.783295628585202),
		new google.maps.LatLng(42.845827010082679, 2.783210067016717),
		new google.maps.LatLng(42.845840308009073, 2.783115920451225),
		new google.maps.LatLng(42.845853605857812, 2.783021773845229),
		new google.maps.LatLng(42.845870488483321, 2.78292150358681),
		new google.maps.LatLng(42.845907104671348, 2.782796718611922),
		new google.maps.LatLng(42.845951775415131, 2.782653573299926),
		new google.maps.LatLng(42.846002791538368, 2.782534844709278),
		new google.maps.LatLng(42.84604215604088, 2.782435712263874)
	],
	[
		new google.maps.LatLng(42.845889600488775, 2.786621761947917),
		new google.maps.LatLng(42.845892149269488, 2.786547208431074),
		new google.maps.LatLng(42.845897408359463, 2.786478755348169),
		new google.maps.LatLng(42.845909817398301, 2.786388279075856),
		new google.maps.LatLng(42.84591863675459, 2.786301481793073),
		new google.maps.LatLng(42.845918493672947, 2.786229381947154),
		new google.maps.LatLng(42.845919280544173, 2.786173165110209),
		new google.maps.LatLng(42.845915535429796, 2.786098634539679),
		new google.maps.LatLng(42.845909106880185, 2.786031446498882),
		new google.maps.LatLng(42.845895430438681, 2.78593739994813),
		new google.maps.LatLng(42.845874504646247, 2.785815272738452),
		new google.maps.LatLng(42.845853566353895, 2.78568703585632),
		new google.maps.LatLng(42.845841683725133, 2.785590538835506),
		new google.maps.LatLng(42.845838829787532, 2.785512339911871),
		new google.maps.LatLng(42.845839619502705, 2.785457345331086),
		new google.maps.LatLng(42.845839491967986, 2.785393799728285),
		new google.maps.LatLng(42.84584468931422, 2.785294795384639),
		new google.maps.LatLng(42.845859587366263, 2.785100436380691),
		new google.maps.LatLng(42.845868430556017, 2.785025859721183),
		new google.maps.LatLng(42.845874622099061, 2.784974510484394),
		new google.maps.LatLng(42.845871818788311, 2.784921973997992),
		new google.maps.LatLng(42.845868989221223, 2.784855994580176),
		new google.maps.LatLng(42.845862507958955, 2.784763143052303),
		new google.maps.LatLng(42.845859739512207, 2.784727714879535)
	],
	[
		new google.maps.LatLng(42.845576860257637, 2.788079571464946),
		new google.maps.LatLng(42.845586665062108, 2.788035542361262),
		new google.maps.LatLng(42.845607226598716, 2.78797436678518),
		new google.maps.LatLng(42.845639475492113, 2.787911925200414),
		new google.maps.LatLng(42.845670821836208, 2.787848264447314),
		new google.maps.LatLng(42.845740676454298, 2.787703809772053),
		new google.maps.LatLng(42.84578720338898, 2.787586324624867),
		new google.maps.LatLng(42.845816730395946, 2.787511672422525),
		new google.maps.LatLng(42.845840863570196, 2.787438262123255),
		new google.maps.LatLng(42.845861388843446, 2.787358754378146),
		new google.maps.LatLng(42.845881011540165, 2.787278027481145),
		new google.maps.LatLng(42.845898821828186, 2.787189975987827),
		new google.maps.LatLng(42.84590857484001, 2.787120284049359),
		new google.maps.LatLng(42.845914755029426, 2.787062825227465),
		new google.maps.LatLng(42.845915520893406, 2.786995611075908),
		new google.maps.LatLng(42.845911790900139, 2.786928412418759),
		new google.maps.LatLng(42.845899959934336, 2.786857577532268),
		new google.maps.LatLng(42.845891702575187, 2.786774509520261),
		new google.maps.LatLng(42.845887954669621, 2.786698756752692),
		new google.maps.LatLng(42.845889600488775, 2.786621761947917)
	]
];

var circuit_4 = [
	[
		new google.maps.LatLng(42.634638419888759, 2.808218381050201),
		new google.maps.LatLng(42.634215497331624, 2.808513213961958),
		new google.maps.LatLng(42.633869794894501, 2.808754215324992)
	],
	[
		new google.maps.LatLng(42.640402011977983, 2.813173846019851),
		new google.maps.LatLng(42.640022931529778, 2.812842622627596),
		new google.maps.LatLng(42.639818513072711, 2.812652098246813),
		new google.maps.LatLng(42.639750077300803, 2.812590213857655),
		new google.maps.LatLng(42.639673538108248, 2.812522268272421),
		new google.maps.LatLng(42.639548383501953, 2.812415512602979),
		new google.maps.LatLng(42.639412441159877, 2.812310009363125),
		new google.maps.LatLng(42.639154989305688, 2.812125747221307),
		new google.maps.LatLng(42.638688696261639, 2.811793601683431),
		new google.maps.LatLng(42.638162998892327, 2.811423904653517),
		new google.maps.LatLng(42.63778042591926, 2.811153601414063),
		new google.maps.LatLng(42.637549052753521, 2.810974135737045),
		new google.maps.LatLng(42.637498624203815, 2.810928027303296),
		new google.maps.LatLng(42.637370720730047, 2.81079328175342),
		new google.maps.LatLng(42.63708599557026, 2.810439866601435),
		new google.maps.LatLng(42.636827375220477, 2.81010585192674),
		new google.maps.LatLng(42.636569705705085, 2.809801061275945),
		new google.maps.LatLng(42.636362555496099, 2.809593518932853),
		new google.maps.LatLng(42.636123040717443, 2.809387302818263),
		new google.maps.LatLng(42.635785425868129, 2.809122962011336),
		new google.maps.LatLng(42.63538478828147, 2.808808909670411),
		new google.maps.LatLng(42.635067880682804, 2.808561554188861),
		new google.maps.LatLng(42.634797768943173, 2.808339618497168),
		new google.maps.LatLng(42.634638419888759, 2.808218381050201)
	],
	[
		new google.maps.LatLng(42.633869794894501, 2.808754215324992),
		new google.maps.LatLng(42.633252940485136, 2.809197003038475),
		new google.maps.LatLng(42.633032047945228, 2.80934992278828),
		new google.maps.LatLng(42.632942244272677, 2.809406224744806)
	],
	[
		new google.maps.LatLng(42.632942244272677, 2.809406224744806),
		new google.maps.LatLng(42.63260902532484, 2.809589948850822),
		new google.maps.LatLng(42.632481483091659, 2.809658549533098)
	],
	[
		new google.maps.LatLng(42.632481483091659, 2.809658549533098),
		new google.maps.LatLng(42.632112262505089, 2.809820472051233),
		new google.maps.LatLng(42.631732267833122, 2.809989732332914),
		new google.maps.LatLng(42.631486161789418, 2.810120812450009),
		new google.maps.LatLng(42.631375703739501, 2.810190571624328),
		new google.maps.LatLng(42.631301182500557, 2.81024682167345),
		new google.maps.LatLng(42.63097441385959, 2.810519394344831),
		new google.maps.LatLng(42.630710521170137, 2.810760105286596),
		new google.maps.LatLng(42.630460969206702, 2.810976416169875),
		new google.maps.LatLng(42.630315542456998, 2.811099857088292),
		new google.maps.LatLng(42.630249993717598, 2.811146335343345),
		new google.maps.LatLng(42.630024524273267, 2.811254206321825),
		new google.maps.LatLng(42.629683132443724, 2.811392889818872),
		new google.maps.LatLng(42.629493581605821, 2.811476293397626),
		new google.maps.LatLng(42.629317502738061, 2.811552346701016),
		new google.maps.LatLng(42.628997647035099, 2.811667824572382)
	],
	[
		new google.maps.LatLng(42.628997647035099, 2.811667824572382),
		new google.maps.LatLng(42.628642722631128, 2.811779762413008),
		new google.maps.LatLng(42.62854926522062, 2.811804414163162)
	],
	[
		new google.maps.LatLng(42.62854926522062, 2.811804414163162),
		new google.maps.LatLng(42.628406414807891, 2.811859661204995),
		new google.maps.LatLng(42.628354324616929, 2.811890265919865)
	],
	[
		new google.maps.LatLng(42.628354324616929, 2.811890265919865),
		new google.maps.LatLng(42.62824658568389, 2.811973402378028),
		new google.maps.LatLng(42.627973718832209, 2.81222508124577),
		new google.maps.LatLng(42.627568065330152, 2.812631802463327)
	],
	[
		new google.maps.LatLng(42.627568065330152, 2.812631802463327),
		new google.maps.LatLng(42.627454970247427, 2.812736866425347)
	],
	[
		new google.maps.LatLng(42.627454970247427, 2.812736866425347),
		new google.maps.LatLng(42.627300605198897, 2.812890761879277)
	],
	[
		new google.maps.LatLng(42.627300605198897, 2.812890761879277),
		new google.maps.LatLng(42.627239578551013, 2.81295304768359)
	],
	[
		new google.maps.LatLng(42.627239578551013, 2.81295304768359),
		new google.maps.LatLng(42.627091561645067, 2.813138575979177),
		new google.maps.LatLng(42.626940838354322, 2.813319241189213)
	],
	[
		new google.maps.LatLng(42.642996278386896, 2.814491698961156),
		new google.maps.LatLng(42.642884685781986, 2.814428728833217),
		new google.maps.LatLng(42.642388000194494, 2.814194062144804),
		new google.maps.LatLng(42.641554801551983, 2.813805819565259),
		new google.maps.LatLng(42.640946541271845, 2.813519157384114),
		new google.maps.LatLng(42.640771962675338, 2.813425949639497),
		new google.maps.LatLng(42.640696368891525, 2.81338357067763),
		new google.maps.LatLng(42.640667569453463, 2.81336661528237),
		new google.maps.LatLng(42.640571264857819, 2.813306037400473),
		new google.maps.LatLng(42.640514563316728, 2.813270904688007),
		new google.maps.LatLng(42.640458741336971, 2.813224809645918),
		new google.maps.LatLng(42.640402011977983, 2.813173846019851)
	],
	[
		new google.maps.LatLng(42.626940838354322, 2.813319241189213),
		new google.maps.LatLng(42.62689689395927, 2.813381471166936),
		new google.maps.LatLng(42.626861049080617, 2.813448545817336),
		new google.maps.LatLng(42.626672063249167, 2.813856993497877),
		new google.maps.LatLng(42.626582496664, 2.814050853286252)
	],
	[
		new google.maps.LatLng(42.625574355907752, 2.813869019371987),
		new google.maps.LatLng(42.625692204328324, 2.813911253316614),
		new google.maps.LatLng(42.625814555709873, 2.813958342953075),
		new google.maps.LatLng(42.625972886888732, 2.814016273558494),
		new google.maps.LatLng(42.626140230662266, 2.814086351320541),
		new google.maps.LatLng(42.626219407068518, 2.814121404422115)
	],
	[
		new google.maps.LatLng(42.62557576952981, 2.814164848725979),
		new google.maps.LatLng(42.625574355907752, 2.813869019371987)
	],
	[
		new google.maps.LatLng(42.626582496664, 2.814050853286252),
		new google.maps.LatLng(42.626537739456396, 2.814162999719002)
	],
	[
		new google.maps.LatLng(42.626219407068518, 2.814121404422115),
		new google.maps.LatLng(42.626323782283698, 2.814170986914344),
		new google.maps.LatLng(42.626498355739827, 2.814262955961334)
	],
	[
		new google.maps.LatLng(42.625562775234734, 2.81444733077877),
		new google.maps.LatLng(42.62557576952981, 2.814164848725979)
	],
	[
		new google.maps.LatLng(42.626537739456396, 2.814162999719002),
		new google.maps.LatLng(42.626498355739827, 2.814262955961334)
	],
	[
		new google.maps.LatLng(42.625547963851673, 2.81472008010894),
		new google.maps.LatLng(42.625562775234734, 2.81444733077877)
	],
	[
		new google.maps.LatLng(42.643096207567254, 2.814569319023676),
		new google.maps.LatLng(42.643071897364251, 2.814548694377473),
		new google.maps.LatLng(42.64299824518455, 2.81449318077716),
		new google.maps.LatLng(42.642996278386896, 2.814491698961156)
	],
	[
		new google.maps.LatLng(42.643096207567254, 2.814569319023676),
		new google.maps.LatLng(42.643227665573569, 2.814682154917409),
		new google.maps.LatLng(42.643342046941605, 2.814798699359252),
		new google.maps.LatLng(42.643350155252612, 2.814808415970702),
		new google.maps.LatLng(42.643375304851745, 2.814838688894524),
		new google.maps.LatLng(42.643424849020519, 2.814898323713541),
		new google.maps.LatLng(42.643425834040947, 2.814899509721462),
		new google.maps.LatLng(42.643508725649454, 2.815002759458561),
		new google.maps.LatLng(42.643572726073423, 2.815099979581498),
		new google.maps.LatLng(42.643634046851602, 2.815206951196339),
		new google.maps.LatLng(42.643678850304312, 2.81529615377177),
		new google.maps.LatLng(42.643713436865269, 2.815365013716709),
		new google.maps.LatLng(42.64376045771256, 2.81546541901603),
		new google.maps.LatLng(42.643772091629131, 2.815490260984642),
		new google.maps.LatLng(42.643824470110793, 2.815625271704425),
		new google.maps.LatLng(42.643946428716987, 2.815965870510468),
		new google.maps.LatLng(42.64402212337906, 2.816168757926271),
		new google.maps.LatLng(42.644039460151774, 2.816215227170179),
		new google.maps.LatLng(42.644088189385585, 2.816319805184496),
		new google.maps.LatLng(42.644149542246033, 2.816446263132663),
		new google.maps.LatLng(42.644420911768599, 2.816886256923739)
	],
	[
		new google.maps.LatLng(42.625525949713591, 2.814986765130201),
		new google.maps.LatLng(42.62553739474432, 2.814846725528644),
		new google.maps.LatLng(42.625547963851673, 2.81472008010894)
	],
	[
		new google.maps.LatLng(42.62549133165313, 2.815243749474115),
		new google.maps.LatLng(42.625525949713591, 2.814986765130201)
	],
	[
		new google.maps.LatLng(42.625484294730612, 2.815333860510934),
		new google.maps.LatLng(42.62549133165313, 2.815243749474115)
	],
	[
		new google.maps.LatLng(42.625457636968605, 2.815515340242888),
		new google.maps.LatLng(42.625484294730612, 2.815333860510934)
	],
	[
		new google.maps.LatLng(42.62544697080596, 2.81558598474219),
		new google.maps.LatLng(42.625457636968605, 2.815515340242888)
	],
	[
		new google.maps.LatLng(42.6253069261303, 2.816751492818711),
		new google.maps.LatLng(42.625368000544455, 2.816192507512585),
		new google.maps.LatLng(42.625421249290966, 2.815789374432307),
		new google.maps.LatLng(42.62544697080596, 2.81558598474219)
	],
	[
		new google.maps.LatLng(42.625301677997982, 2.816836727918254),
		new google.maps.LatLng(42.6253069261303, 2.816751492818711)
	],
	[
		new google.maps.LatLng(42.625171233668929, 2.817313145867494),
		new google.maps.LatLng(42.625191837977617, 2.817270472423489),
		new google.maps.LatLng(42.62520884075002, 2.817224157211443),
		new google.maps.LatLng(42.625227637415172, 2.817175400973996),
		new google.maps.LatLng(42.625246432105541, 2.817125429293844),
		new google.maps.LatLng(42.625262528682569, 2.817075464319715),
		new google.maps.LatLng(42.625275928950678, 2.817025508491006),
		new google.maps.LatLng(42.625287526553755, 2.81697312346201),
		new google.maps.LatLng(42.62529553239861, 2.816923183509793),
		new google.maps.LatLng(42.625301677997982, 2.816836727918254)
	],
	[
		new google.maps.LatLng(42.644420911768599, 2.816886256923739),
		new google.maps.LatLng(42.644567830397392, 2.817103785050362),
		new google.maps.LatLng(42.644687712546997, 2.817283646728953),
		new google.maps.LatLng(42.644998686749247, 2.817752752400187),
		new google.maps.LatLng(42.645436721864073, 2.81839561768763),
		new google.maps.LatLng(42.645674575559028, 2.818750040422064),
		new google.maps.LatLng(42.64580536772668, 2.81894493355465)
	],
	[
		new google.maps.LatLng(42.625140881992785, 2.817439851938289),
		new google.maps.LatLng(42.625155262488974, 2.817437371472713),
		new google.maps.LatLng(42.625179499314967, 2.817415382404191),
		new google.maps.LatLng(42.625190227797432, 2.817380043977289),
		new google.maps.LatLng(42.625186567054776, 2.817342315848086),
		new google.maps.LatLng(42.625171233668929, 2.817313145867494)
	],
	[
		new google.maps.LatLng(42.625080460384815, 2.817857612193159),
		new google.maps.LatLng(42.625096538836374, 2.817796691785772),
		new google.maps.LatLng(42.625111698384941, 2.81772359915911),
		new google.maps.LatLng(42.625122370679733, 2.81765539110432),
		new google.maps.LatLng(42.625131252916837, 2.817592058489463),
		new google.maps.LatLng(42.625136557941545, 2.817539693415123),
		new google.maps.LatLng(42.62513918813746, 2.817500727729388),
		new google.maps.LatLng(42.625140942244634, 2.817475156147188),
		new google.maps.LatLng(42.625140881992785, 2.817439851938289)
	],
	[
		new google.maps.LatLng(42.624780643847849, 2.819722393429112),
		new google.maps.LatLng(42.624810743264661, 2.819444731597208),
		new google.maps.LatLng(42.624857634536589, 2.818996581364065),
		new google.maps.LatLng(42.624888645125701, 2.81872743867984),
		new google.maps.LatLng(42.62491089128153, 2.818592237381259),
		new google.maps.LatLng(42.624970634870088, 2.81830230907917),
		new google.maps.LatLng(42.625053695961782, 2.817979437091668),
		new google.maps.LatLng(42.625080460384815, 2.817857612193159)
	],
	[
		new google.maps.LatLng(42.64580536772668, 2.81894493355465),
		new google.maps.LatLng(42.645933387663746, 2.819154004762884),
		new google.maps.LatLng(42.646156090644254, 2.8195308476024)
	],
	[
		new google.maps.LatLng(42.624650515956866, 2.820930455976563),
		new google.maps.LatLng(42.624661138642686, 2.820831813963165),
		new google.maps.LatLng(42.624703583430851, 2.820409246207459),
		new google.maps.LatLng(42.624761140574087, 2.81988558559142),
		new google.maps.LatLng(42.624780643847849, 2.819722393429112)
	],
	[
		new google.maps.LatLng(42.646326498567433, 2.819818951463868),
		new google.maps.LatLng(42.646356253078416, 2.819870009253697),
		new google.maps.LatLng(42.646370679617419, 2.819894321813686),
		new google.maps.LatLng(42.646484289540446, 2.820090044983913),
		new google.maps.LatLng(42.646716915053247, 2.820487567998999),
		new google.maps.LatLng(42.646803472752516, 2.820635880582278)
	],
	[
		new google.maps.LatLng(42.646803472752516, 2.820635880582278),
		new google.maps.LatLng(42.646924313620758, 2.820854724417636),
		new google.maps.LatLng(42.6470010024183, 2.821015246894817),
		new google.maps.LatLng(42.647049760674932, 2.821140538328053),
		new google.maps.LatLng(42.647146393489436, 2.821399647460464),
		new google.maps.LatLng(42.647326131611266, 2.821894771661517),
		new google.maps.LatLng(42.647692815327865, 2.822898403248335),
		new google.maps.LatLng(42.648066720885225, 2.82392516665014),
		new google.maps.LatLng(42.648364743499023, 2.824736602158392),
		new google.maps.LatLng(42.648631171455378, 2.825473849971984),
		new google.maps.LatLng(42.648858748990499, 2.826096735971626)
	],
	[
		new google.maps.LatLng(42.62460621474218, 2.821858250924964),
		new google.maps.LatLng(42.62460955668621, 2.821706065627954),
		new google.maps.LatLng(42.624618055780338, 2.821411428857538),
		new google.maps.LatLng(42.62463026797446, 2.821187389482519),
		new google.maps.LatLng(42.62464080122443, 2.82103518212423)
	],
	[
		new google.maps.LatLng(42.62458408528024, 2.822066493860787),
		new google.maps.LatLng(42.62460621474218, 2.821858250924964)
	],
	[
		new google.maps.LatLng(42.624109821351269, 2.824501500880187),
		new google.maps.LatLng(42.624206995281853, 2.824002078826144),
		new google.maps.LatLng(42.624245248457775, 2.823756050078692),
		new google.maps.LatLng(42.6243871399572, 2.823116489423794),
		new google.maps.LatLng(42.624480796369511, 2.822668202863387),
		new google.maps.LatLng(42.624533362845355, 2.8223807367605),
		new google.maps.LatLng(42.624570782362525, 2.822176100156045),
		new google.maps.LatLng(42.62458408528024, 2.822066493860787)
	],
	[
		new google.maps.LatLng(42.624022600017625, 2.825041065926408),
		new google.maps.LatLng(42.624109821351269, 2.824501500880187)
	],
	[
		new google.maps.LatLng(42.623804372805409, 2.826844664911033),
		new google.maps.LatLng(42.623840377387083, 2.826317430882025),
		new google.maps.LatLng(42.623873957494638, 2.825958202616807),
		new google.maps.LatLng(42.623889889643522, 2.825804764953148),
		new google.maps.LatLng(42.623927232420826, 2.825549002155058),
		new google.maps.LatLng(42.624022600017625, 2.825041065926408)
	],
	[
		new google.maps.LatLng(42.651376538534521, 2.830276563994127),
		new google.maps.LatLng(42.651082956892644, 2.829969277479118),
		new google.maps.LatLng(42.650867638320911, 2.829690995145342),
		new google.maps.LatLng(42.650639677781136, 2.829378650200605),
		new google.maps.LatLng(42.650499143061765, 2.829202459872651),
		new google.maps.LatLng(42.650126102157685, 2.82868349651697),
		new google.maps.LatLng(42.649853991841326, 2.828312828918639),
		new google.maps.LatLng(42.649849486745325, 2.82830675213048),
		new google.maps.LatLng(42.649681904104902, 2.828084365373185),
		new google.maps.LatLng(42.649616118817555, 2.827988344371475),
		new google.maps.LatLng(42.64957195508655, 2.827920270626405),
		new google.maps.LatLng(42.649531377750925, 2.827846097793248),
		new google.maps.LatLng(42.649474571216082, 2.827742742342244),
		new google.maps.LatLng(42.649414114631497, 2.827606514472714),
		new google.maps.LatLng(42.649317514390376, 2.827358345011013),
		new google.maps.LatLng(42.649108915644909, 2.826791416566772),
		new google.maps.LatLng(42.648946359209695, 2.826343709711052),
		new google.maps.LatLng(42.648858748990499, 2.826096735971626)
	],
	[
		new google.maps.LatLng(42.62370618328201, 2.828958328824249),
		new google.maps.LatLng(42.623700582200016, 2.828829302208969),
		new google.maps.LatLng(42.62369215556226, 2.828619937361552),
		new google.maps.LatLng(42.62370764448, 2.828187722182248),
		new google.maps.LatLng(42.623753411090824, 2.827576461815231),
		new google.maps.LatLng(42.623804372805409, 2.826844664911033)
	],
	[
		new google.maps.LatLng(42.624796513245023, 2.831662635237241),
		new google.maps.LatLng(42.62472613129578, 2.831499705489331),
		new google.maps.LatLng(42.624658450814586, 2.831339204456465),
		new google.maps.LatLng(42.624593478137008, 2.831186001029922),
		new google.maps.LatLng(42.624530306693678, 2.831035226265116),
		new google.maps.LatLng(42.624468940107057, 2.830888099192254),
		new google.maps.LatLng(42.624411179849794, 2.830748265955759),
		new google.maps.LatLng(42.624357039525862, 2.830623031071123),
		new google.maps.LatLng(42.624308312482803, 2.830509955121587),
		new google.maps.LatLng(42.624264093948561, 2.830405388229048),
		new google.maps.LatLng(42.624222585219542, 2.830309335272333),
		new google.maps.LatLng(42.624151331933767, 2.830164673599275),
		new google.maps.LatLng(42.62410262715742, 2.830066206238447),
		new google.maps.LatLng(42.623941146598483, 2.829718504887729),
		new google.maps.LatLng(42.623832783307627, 2.829418127768546),
		new google.maps.LatLng(42.623765919848893, 2.829208934239351),
		new google.maps.LatLng(42.623736962871035, 2.829090932266666),
		new google.maps.LatLng(42.62370618328201, 2.828958328824249)
	],
	[
		new google.maps.LatLng(42.652180339070682, 2.830868595978437),
		new google.maps.LatLng(42.651733924316247, 2.830565399793942),
		new google.maps.LatLng(42.651505320896462, 2.83041260094145),
		new google.maps.LatLng(42.65146479690906, 2.830371307861168),
		new google.maps.LatLng(42.651376538534521, 2.830276563994127)
	],
	[
		new google.maps.LatLng(42.654266574890585, 2.832270571533864),
		new google.maps.LatLng(42.653589776304315, 2.831823074753797),
		new google.maps.LatLng(42.652597946301732, 2.831148737668022),
		new google.maps.LatLng(42.652180339070682, 2.830868595978437)
	],
	[
		new google.maps.LatLng(42.625497669945808, 2.833324820487809),
		new google.maps.LatLng(42.625428184388937, 2.833158233466215),
		new google.maps.LatLng(42.625356896285027, 2.832989215951851),
		new google.maps.LatLng(42.625285607931474, 2.832820200045008),
		new google.maps.LatLng(42.625214320226746, 2.832651184524255),
		new google.maps.LatLng(42.625144834573511, 2.832485815651154),
		new google.maps.LatLng(42.625075347786563, 2.832319230516605),
		new google.maps.LatLng(42.625006761013729, 2.832153859952536),
		new google.maps.LatLng(42.624936376175214, 2.83198849584195),
		new google.maps.LatLng(42.624866896757439, 2.831826780760997),
		new google.maps.LatLng(42.624796513245023, 2.831662635237241)
	],
	[
		new google.maps.LatLng(42.655651697851788, 2.833205700244984),
		new google.maps.LatLng(42.655157576840352, 2.83286362691814),
		new google.maps.LatLng(42.654529367614387, 2.832440338706977),
		new google.maps.LatLng(42.654266574890585, 2.832270571533864)
	],
	[
		new google.maps.LatLng(42.656087297116009, 2.833495569066075),
		new google.maps.LatLng(42.655651697851788, 2.833205700244984)
	],
	[
		new google.maps.LatLng(42.62609866316668, 2.834763322159644),
		new google.maps.LatLng(42.625802670515341, 2.834048316505457),
		new google.maps.LatLng(42.625747635365819, 2.833923078337251),
		new google.maps.LatLng(42.625689885080526, 2.833786891753193),
		new google.maps.LatLng(42.625630327004124, 2.833644623386951),
		new google.maps.LatLng(42.625566256795153, 2.833491410293984),
		new google.maps.LatLng(42.625497669945808, 2.833324820487809)
	],
	[
		new google.maps.LatLng(42.656156585155834, 2.83353434823916),
		new google.maps.LatLng(42.656121489675378, 2.833513742000702),
		new google.maps.LatLng(42.656087297116009, 2.833495569066075)
	],
	[
		new google.maps.LatLng(42.656845094341506, 2.834000121909201),
		new google.maps.LatLng(42.656437388062166, 2.833723564606652),
		new google.maps.LatLng(42.656156585155834, 2.83353434823916)
	],
	[
		new google.maps.LatLng(42.65794906189349, 2.834524412986049),
		new google.maps.LatLng(42.657905912265051, 2.834528189731369),
		new google.maps.LatLng(42.657815105605209, 2.834527229419491),
		new google.maps.LatLng(42.65773059000189, 2.834525032607501),
		new google.maps.LatLng(42.657668541476163, 2.834516682157144),
		new google.maps.LatLng(42.657592989289519, 2.834497407435159),
		new google.maps.LatLng(42.657414807562049, 2.834389504635247),
		new google.maps.LatLng(42.656940502685515, 2.834069280770062),
		new google.maps.LatLng(42.656845094341506, 2.834000121909201)
	],
	[
		new google.maps.LatLng(42.657878164246455, 2.834607444163103),
		new google.maps.LatLng(42.657884560709078, 2.834674421296462),
		new google.maps.LatLng(42.657895439758626, 2.834732859451162),
		new google.maps.LatLng(42.657907203093501, 2.834781549725169),
		new google.maps.LatLng(42.657925253933065, 2.834826567773911),
		new google.maps.LatLng(42.657954093491078, 2.834871555897907)
	],
	[
		new google.maps.LatLng(42.626313675726294, 2.835438389898292),
		new google.maps.LatLng(42.62627923640067, 2.835259524062642),
		new google.maps.LatLng(42.626235859775448, 2.835114771739552),
		new google.maps.LatLng(42.626155509384866, 2.834897078423083),
		new google.maps.LatLng(42.62609866316668, 2.834763322159644)
	],
	[
		new google.maps.LatLng(42.657860032411463, 2.835092297044931),
		new google.maps.LatLng(42.65791468896338, 2.834971550854949),
		new google.maps.LatLng(42.657954093491078, 2.834871555897907)
	],
	[
		new google.maps.LatLng(42.657823613998872, 2.835965772848316),
		new google.maps.LatLng(42.657806386463179, 2.835870809882366),
		new google.maps.LatLng(42.657796373028198, 2.8357904437142),
		new google.maps.LatLng(42.657797134207442, 2.835700303496283),
		new google.maps.LatLng(42.657844033003308, 2.835211715692243),
		new google.maps.LatLng(42.657860032411463, 2.835092297044931)
	],
	[
		new google.maps.LatLng(42.625895418792474, 2.837657719626074),
		new google.maps.LatLng(42.625947098571572, 2.837352001357862),
		new google.maps.LatLng(42.626201628908966, 2.836240993862021),
		new google.maps.LatLng(42.626310573352818, 2.835759800742048),
		new google.maps.LatLng(42.626320343030088, 2.835681857528804),
		new google.maps.LatLng(42.626326535494357, 2.835616098890563),
		new google.maps.LatLng(42.626327338819927, 2.835554006938829),
		new google.maps.LatLng(42.626325445823397, 2.835491923354319),
		new google.maps.LatLng(42.626313675726294, 2.835438389898292)
	],
	[
		new google.maps.LatLng(42.65820259164061, 2.836272885870646),
		new google.maps.LatLng(42.658170041098252, 2.836152385133802),
		new google.maps.LatLng(42.65813307887575, 2.836086711724332),
		new google.maps.LatLng(42.658077231917389, 2.836018654991191),
		new google.maps.LatLng(42.658001614093465, 2.835955527126938),
		new google.maps.LatLng(42.657921570657528, 2.835938699428985),
		new google.maps.LatLng(42.657854154249705, 2.835947415821015),
		new google.maps.LatLng(42.657823613998872, 2.835965772848316)
	],
	[
		new google.maps.LatLng(42.65820259164061, 2.836272885870646),
		new google.maps.LatLng(42.658255614028128, 2.836258118927842),
		new google.maps.LatLng(42.658303248205733, 2.836247022926984),
		new google.maps.LatLng(42.658337365716719, 2.83621647382264),
		new google.maps.LatLng(42.658370576846352, 2.836181055490103),
		new google.maps.LatLng(42.658406481642842, 2.836143194205503),
		new google.maps.LatLng(42.658456838441793, 2.836149142699335),
		new google.maps.LatLng(42.658488391335794, 2.836205086360855),
		new google.maps.LatLng(42.658549658879423, 2.836290182450312),
		new google.maps.LatLng(42.65863259061792, 2.836432468441015),
		new google.maps.LatLng(42.658672259472588, 2.836504225573802),
		new google.maps.LatLng(42.658706559298473, 2.83659305126234)
	],
	[
		new google.maps.LatLng(42.658950884956894, 2.837013718387345),
		new google.maps.LatLng(42.658706559298473, 2.83659305126234)
	],
	[
		new google.maps.LatLng(42.660019760416461, 2.842971197384874),
		new google.maps.LatLng(42.659956709359797, 2.842892188679233),
		new google.maps.LatLng(42.659615347838745, 2.842474071534716),
		new google.maps.LatLng(42.659550458800702, 2.842368269395813),
		new google.maps.LatLng(42.65950266315884, 2.842269730289697),
		new google.maps.LatLng(42.659470122348182, 2.842151660926996),
		new google.maps.LatLng(42.659457352610062, 2.84202744623714),
		new google.maps.LatLng(42.659454471211433, 2.841903205165603),
		new google.maps.LatLng(42.659462426035283, 2.841810605995887),
		new google.maps.LatLng(42.659479357244358, 2.84170823687745),
		new google.maps.LatLng(42.659509741067595, 2.84158390590765),
		new google.maps.LatLng(42.659524835920472, 2.841455960758581),
		new google.maps.LatLng(42.659537256421679, 2.841343859620266),
		new google.maps.LatLng(42.659546966034952, 2.841222020796536),
		new google.maps.LatLng(42.659557640490107, 2.841145249226987),
		new google.maps.LatLng(42.659571018080911, 2.841072125074154),
		new google.maps.LatLng(42.659588914551584, 2.841014824105284),
		new google.maps.LatLng(42.659607736784785, 2.84097579259958),
		new google.maps.LatLng(42.65962565453605, 2.840933109015226),
		new google.maps.LatLng(42.65965612898011, 2.840869683015107),
		new google.maps.LatLng(42.659675826578365, 2.840814813130308),
		new google.maps.LatLng(42.659698192265026, 2.840740445927674),
		new google.maps.LatLng(42.659735608063862, 2.840508899141691),
		new google.maps.LatLng(42.659748889319232, 2.840371213316923),
		new google.maps.LatLng(42.659750554295613, 2.840282285312566),
		new google.maps.LatLng(42.659748680169635, 2.840231128784289),
		new google.maps.LatLng(42.659743214605683, 2.84018363589845),
		new google.maps.LatLng(42.659738644964037, 2.840133706082753),
		new google.maps.LatLng(42.659727770400991, 2.840076483772664),
		new google.maps.LatLng(42.659716007620197, 2.840026572535539),
		new google.maps.LatLng(42.659692526704589, 2.839955985036986),
		new google.maps.LatLng(42.659669046558996, 2.839886616122247),
		new google.maps.LatLng(42.659647374565132, 2.839823332809924),
		new google.maps.LatLng(42.659586816350391, 2.839609108308168),
		new google.maps.LatLng(42.65955155923492, 2.839480084093015),
		new google.maps.LatLng(42.659495591932782, 2.839330408444753),
		new google.maps.LatLng(42.659238552118012, 2.838795143438677),
		new google.maps.LatLng(42.659029296786308, 2.838349890888295),
		new google.maps.LatLng(42.65900214627402, 2.838231807971267),
		new google.maps.LatLng(42.658991229950779, 2.838147789114717),
		new google.maps.LatLng(42.65899106756892, 2.838040595214859),
		new google.maps.LatLng(42.658995447050074, 2.837963841450498),
		new google.maps.LatLng(42.659000686703962, 2.837861505055569),
		new google.maps.LatLng(42.659005046902408, 2.837772569780325),
		new google.maps.LatLng(42.659022869467677, 2.837667762151374),
		new google.maps.LatLng(42.659033551117673, 2.837597081974643),
		new google.maps.LatLng(42.65903796687406, 2.837544689896575),
		new google.maps.LatLng(42.659038756434668, 2.837472819529271),
		new google.maps.LatLng(42.659031450916785, 2.837398534567634),
		new google.maps.LatLng(42.659019665171691, 2.837334007096906),
		new google.maps.LatLng(42.659011523911751, 2.837301140620362),
		new google.maps.LatLng(42.65899517762935, 2.837193991618721),
		new google.maps.LatLng(42.658977974683239, 2.837114862323863),
		new google.maps.LatLng(42.658930051240624, 2.836935933140347)
	],
	[
		new google.maps.LatLng(42.625873168173008, 2.837806307863054),
		new google.maps.LatLng(42.625882947098219, 2.837733234538988),
		new google.maps.LatLng(42.625895418792474, 2.837657719626074)
	],
	[
		new google.maps.LatLng(42.625868425309207, 2.838236071872613),
		new google.maps.LatLng(42.625865516347915, 2.838096075765192),
		new google.maps.LatLng(42.625866235880203, 2.837977983295313),
		new google.maps.LatLng(42.625866140298172, 2.837914677537118),
		new google.maps.LatLng(42.625870533591936, 2.837847707659449),
		new google.maps.LatLng(42.625873168173008, 2.837806307863054)
	],
	[
		new google.maps.LatLng(42.626091357909054, 2.840009248924815),
		new google.maps.LatLng(42.626042437330419, 2.839761026710844),
		new google.maps.LatLng(42.625980757405095, 2.839397186486731),
		new google.maps.LatLng(42.62590691796678, 2.838721717331677),
		new google.maps.LatLng(42.625871203156912, 2.838289630130108),
		new google.maps.LatLng(42.625868425309207, 2.838236071872613)
	],
	[
		new google.maps.LatLng(42.626676613821772, 2.841809456456352),
		new google.maps.LatLng(42.62636966434296, 2.840949562368906),
		new google.maps.LatLng(42.626257683810003, 2.840613857022926),
		new google.maps.LatLng(42.626196245667678, 2.840410713847535),
		new google.maps.LatLng(42.626133876114636, 2.840185659057734),
		new google.maps.LatLng(42.626091357909054, 2.840009248924815)
	],
	[
		new google.maps.LatLng(42.627241794140801, 2.843427137309586),
		new google.maps.LatLng(42.627000707653991, 2.842716793793004),
		new google.maps.LatLng(42.626676613821772, 2.841809456456352)
	],
	[
		new google.maps.LatLng(42.661432206105296, 2.844206268673678),
		new google.maps.LatLng(42.661395239297114, 2.844134495419301),
		new google.maps.LatLng(42.661360028410144, 2.844033482016486),
		new google.maps.LatLng(42.661245502560085, 2.843797463941341),
		new google.maps.LatLng(42.661180625696659, 2.843698966541582),
		new google.maps.LatLng(42.661087022728708, 2.843631000936198),
		new google.maps.LatLng(42.660831506258717, 2.843507434417108),
		new google.maps.LatLng(42.660791917588405, 2.843486832326709),
		new google.maps.LatLng(42.660433798485364, 2.843289236263582),
		new google.maps.LatLng(42.660304213156849, 2.843207968840693),
		new google.maps.LatLng(42.660272719338671, 2.843189781293299),
		new google.maps.LatLng(42.660076487330933, 2.843029514389748),
		new google.maps.LatLng(42.660019760416461, 2.842971197384874)
	],
	[
		new google.maps.LatLng(42.627258960657741, 2.843485528602573),
		new google.maps.LatLng(42.627241794140801, 2.843427137309586)
	],
	[
		new google.maps.LatLng(42.627570482968686, 2.844412397485597),
		new google.maps.LatLng(42.62754433765285, 2.844362551042943),
		new google.maps.LatLng(42.627458638303445, 2.844163117041894),
		new google.maps.LatLng(42.627382775197304, 2.843927132874591),
		new google.maps.LatLng(42.627258960657741, 2.843485528602573)
	],
	[
		new google.maps.LatLng(42.661566458712251, 2.846271926597702),
		new google.maps.LatLng(42.661564449868614, 2.846125752014713),
		new google.maps.LatLng(42.661517311394583, 2.845234175548573),
		new google.maps.LatLng(42.661519857085523, 2.84512940643341),
		new google.maps.LatLng(42.661525128198861, 2.8450441202807),
		new google.maps.LatLng(42.661534835892418, 2.844918623657561),
		new google.maps.LatLng(42.661528312789741, 2.844760278460138),
		new google.maps.LatLng(42.66150465939554, 2.844569089517218),
		new google.maps.LatLng(42.66146024720765, 2.844323136795451),
		new google.maps.LatLng(42.661432206105296, 2.844206268673678)
	],
	[
		new google.maps.LatLng(42.628236312025166, 2.845404080513493),
		new google.maps.LatLng(42.628093111781588, 2.845229143356181),
		new google.maps.LatLng(42.627997646160992, 2.845113737346649),
		new google.maps.LatLng(42.627836390296771, 2.844887717724591),
		new google.maps.LatLng(42.627720135188234, 2.844695667207443),
		new google.maps.LatLng(42.627617365705653, 2.844503582388145),
		new google.maps.LatLng(42.627570482968686, 2.844412397485597)
	],
	[
		new google.maps.LatLng(42.628236312025166, 2.845404080513493),
		new google.maps.LatLng(42.628271450222321, 2.845456337720594)
	],
	[
		new google.maps.LatLng(42.628271450222321, 2.845456337720594),
		new google.maps.LatLng(42.628421835712302, 2.845626386350253)
	],
	[
		new google.maps.LatLng(42.628421835712302, 2.845626386350253),
		new google.maps.LatLng(42.62869834785257, 2.845977507631692),
		new google.maps.LatLng(42.628722704518673, 2.84603466522867),
		new google.maps.LatLng(42.628741670070418, 2.846094272095362),
		new google.maps.LatLng(42.628755234625181, 2.846149023130284),
		new google.maps.LatLng(42.62875615629148, 2.846164847776025)
	],
	[
		new google.maps.LatLng(42.62875615629148, 2.846164847776025),
		new google.maps.LatLng(42.628757167293273, 2.846242764441025),
		new google.maps.LatLng(42.628751883752237, 2.84631947877662),
		new google.maps.LatLng(42.628741207426224, 2.846397426815027),
		new google.maps.LatLng(42.62868863605199, 2.846726285477628),
		new google.maps.LatLng(42.628654932435751, 2.847047789524498),
		new google.maps.LatLng(42.628635522867981, 2.847305946792313)
	],
	[
		new google.maps.LatLng(42.660019534678923, 2.851632161351086),
		new google.maps.LatLng(42.660029419292471, 2.851628482080645),
		new google.maps.LatLng(42.660076126800647, 2.851596690706666),
		new google.maps.LatLng(42.660124592195324, 2.851535661065737),
		new google.maps.LatLng(42.660157786525183, 2.851484413804975),
		new google.maps.LatLng(42.660185556043096, 2.851411255482532),
		new google.maps.LatLng(42.660213287114921, 2.851310078017694),
		new google.maps.LatLng(42.66023465934682, 2.851162628150243),
		new google.maps.LatLng(42.660242647409781, 2.851088300996084),
		new google.maps.LatLng(42.660264119752753, 2.851012721658465),
		new google.maps.LatLng(42.660321551614459, 2.850934613849514),
		new google.maps.LatLng(42.660484974076297, 2.850785581245212),
		new google.maps.LatLng(42.660722021545261, 2.850565706622595),
		new google.maps.LatLng(42.660760598609031, 2.850505919153703),
		new google.maps.LatLng(42.660804523188034, 2.850413226276785),
		new google.maps.LatLng(42.660830459455447, 2.850315707351673),
		new google.maps.LatLng(42.66084828074387, 2.850201155490467),
		new google.maps.LatLng(42.66085712313172, 2.850095152722246),
		new google.maps.LatLng(42.660865087829194, 2.850004988393172),
		new google.maps.LatLng(42.660895501083729, 2.849894057902727),
		new google.maps.LatLng(42.660950147601419, 2.849753829312762),
		new google.maps.LatLng(42.661051416591846, 2.849522117391319),
		new google.maps.LatLng(42.661178679782566, 2.849234302315422),
		new google.maps.LatLng(42.661288850794961, 2.848940439754984),
		new google.maps.LatLng(42.661310345252787, 2.84888191214581),
		new google.maps.LatLng(42.661331811274792, 2.848802676279242),
		new google.maps.LatLng(42.661363986089235, 2.848667376068735),
		new google.maps.LatLng(42.6614202494507, 2.848400450697081),
		new google.maps.LatLng(42.661452334828255, 2.848201806755445),
		new google.maps.LatLng(42.66146919736687, 2.848047054945164),
		new google.maps.LatLng(42.66150117973114, 2.847776538558953),
		new google.maps.LatLng(42.661571455875759, 2.847250104912537),
		new google.maps.LatLng(42.661581136384825, 2.847103899024167),
		new google.maps.LatLng(42.66157819722568, 2.846934581169531),
		new google.maps.LatLng(42.661577244375373, 2.846896820054074),
		new google.maps.LatLng(42.661570420425939, 2.846526513685137),
		new google.maps.LatLng(42.661567499395552, 2.846370596447323),
		new google.maps.LatLng(42.661566458712251, 2.846271926597702)
	],
	[
		new google.maps.LatLng(42.628635522867981, 2.847305946792313),
		new google.maps.LatLng(42.628625834641916, 2.847447200892875),
		new google.maps.LatLng(42.628626903836881, 2.847566510789389),
		new google.maps.LatLng(42.628627149754031, 2.847739393018512),
		new google.maps.LatLng(42.628620148410633, 2.847873334126775),
		new google.maps.LatLng(42.628611279508583, 2.847958581175859),
		new google.maps.LatLng(42.62858547196992, 2.848144923062573),
		new google.maps.LatLng(42.628541895306981, 2.848481061304281),
		new google.maps.LatLng(42.628520649580992, 2.848714872246666),
		new google.maps.LatLng(42.62852085637207, 2.84886096977769),
		new google.maps.LatLng(42.628527263139766, 2.848941306450554),
		new google.maps.LatLng(42.62853726802134, 2.849022852303777),
		new google.maps.LatLng(42.628549070669827, 2.849104392591226),
		new google.maps.LatLng(42.628591598246686, 2.849297861918155),
		new google.maps.LatLng(42.6286908797764, 2.849572756917023),
		new google.maps.LatLng(42.628932569121716, 2.850104176428998),
		new google.maps.LatLng(42.629001977270811, 2.850234268698573),
		new google.maps.LatLng(42.629098390997818, 2.850388642562863),
		new google.maps.LatLng(42.629264163112019, 2.850637803630391),
		new google.maps.LatLng(42.629365100251476, 2.850812865507515),
		new google.maps.LatLng(42.629478698361638, 2.851041464922638),
		new google.maps.LatLng(42.629629207752998, 2.851306495437185),
		new google.maps.LatLng(42.630110289398289, 2.852022384196161),
		new google.maps.LatLng(42.630518319397993, 2.852575321589825),
		new google.maps.LatLng(42.63061735327009, 2.852676125836998),
		new google.maps.LatLng(42.630710958456824, 2.852752592556289),
		new google.maps.LatLng(42.630796429269949, 2.852797426343105),
		new google.maps.LatLng(42.630864803385634, 2.852831343989749),
		new google.maps.LatLng(42.630945744281263, 2.852850619946241),
		new google.maps.LatLng(42.631092344535155, 2.852891646630046),
		new google.maps.LatLng(42.631161619559528, 2.852926780378534),
		new google.maps.LatLng(42.631245350237741, 2.853014232091177),
		new google.maps.LatLng(42.631331819363332, 2.853130896776603),
		new google.maps.LatLng(42.631374192902598, 2.853217236201476),
		new google.maps.LatLng(42.631403072574791, 2.853297520208198),
		new google.maps.LatLng(42.631421191906973, 2.853398531679575),
		new google.maps.LatLng(42.631432128347043, 2.853506864380691),
		new google.maps.LatLng(42.631435855246394, 2.853601823694348),
		new google.maps.LatLng(42.631430672337231, 2.853756464203417),
		new google.maps.LatLng(42.631401471322718, 2.854098666294804),
		new google.maps.LatLng(42.631379294184626, 2.85431787862927)
	],
	[
		new google.maps.LatLng(42.65962061330292, 2.851823205567883),
		new google.maps.LatLng(42.659659256490229, 2.851810925459867),
		new google.maps.LatLng(42.659793130960203, 2.851748460236076),
		new google.maps.LatLng(42.659882089334452, 2.851712907542773),
		new google.maps.LatLng(42.660019534678923, 2.851632161351086)
	],
	[
		new google.maps.LatLng(42.660018682696787, 2.854282832284835),
		new google.maps.LatLng(42.659938529593852, 2.854183145711991),
		new google.maps.LatLng(42.659894377779182, 2.854111385159137),
		new google.maps.LatLng(42.659742023261785, 2.853809670488385),
		new google.maps.LatLng(42.659600420386248, 2.853481130316892),
		new google.maps.LatLng(42.659496699040375, 2.85324142037837),
		new google.maps.LatLng(42.659454311895857, 2.853146513333906),
		new google.maps.LatLng(42.65939927878491, 2.853007785277593),
		new google.maps.LatLng(42.659371288649886, 2.852921369194675),
		new google.maps.LatLng(42.659363064603667, 2.852825158066473),
		new google.maps.LatLng(42.659362897129178, 2.852703346096616),
		new google.maps.LatLng(42.659349226922913, 2.852569387069654),
		new google.maps.LatLng(42.659319315247252, 2.85239405274903),
		new google.maps.LatLng(42.659287606379841, 2.852218724100068),
		new google.maps.LatLng(42.659280261890757, 2.852109110984733),
		new google.maps.LatLng(42.659287320222091, 2.852011643885172),
		new google.maps.LatLng(42.659307892232718, 2.851934849657957),
		new google.maps.LatLng(42.659384214535393, 2.851864003837046),
		new google.maps.LatLng(42.659458810077936, 2.851844324292333),
		new google.maps.LatLng(42.659563101819323, 2.851844059238812),
		new google.maps.LatLng(42.65962061330292, 2.851823205567883)
	],
	[
		new google.maps.LatLng(42.631379294184626, 2.85431787862927),
		new google.maps.LatLng(42.631378010968774, 2.854348554166624),
		new google.maps.LatLng(42.631370586763246, 2.854526099872349),
		new google.maps.LatLng(42.631370835253449, 2.854709285849944),
		new google.maps.LatLng(42.631370934114543, 2.854781782639563),
		new google.maps.LatLng(42.631381941403369, 2.854942470029548),
		new google.maps.LatLng(42.631396497094862, 2.855069058029795),
		new google.maps.LatLng(42.631562126500164, 2.855885618666607),
		new google.maps.LatLng(42.631987305880394, 2.857849697186136),
		new google.maps.LatLng(42.632033358969942, 2.858001779345228),
		new google.maps.LatLng(42.632084765581006, 2.858123409486154),
		new google.maps.LatLng(42.632113618127029, 2.858185434204095)
	],
	[
		new google.maps.LatLng(42.660018682696787, 2.854282832284835),
		new google.maps.LatLng(42.660027683869608, 2.854290118707123),
		new google.maps.LatLng(42.660136527232552, 2.854331262837564),
		new google.maps.LatLng(42.660233702081484, 2.85438705459768),
		new google.maps.LatLng(42.660299413162882, 2.854445361143321),
		new google.maps.LatLng(42.660317456222977, 2.854490387872146),
		new google.maps.LatLng(42.660339142751113, 2.854570730476431),
		new google.maps.LatLng(42.660348242662991, 2.854651106301476),
		new google.maps.LatLng(42.660338472451066, 2.854738836412604),
		new google.maps.LatLng(42.660286488769174, 2.854858343824715),
		new google.maps.LatLng(42.66013407477665, 2.855174222289831),
		new google.maps.LatLng(42.66004986720408, 2.85539978659958),
		new google.maps.LatLng(42.660019424485512, 2.85549244094587)
	],
	[
		new google.maps.LatLng(42.660019424485512, 2.85549244094587),
		new google.maps.LatLng(42.660004260801834, 2.855581402778564),
		new google.maps.LatLng(42.659980144999693, 2.855699621785297),
		new google.maps.LatLng(42.659853178489946, 2.856220079562163)
	],
	[
		new google.maps.LatLng(42.659853178489946, 2.856220079562163),
		new google.maps.LatLng(42.659782544648266, 2.856512606212395),
		new google.maps.LatLng(42.659182064271917, 2.858611687794883),
		new google.maps.LatLng(42.659071108942868, 2.85901271810698)
	],
	[
		new google.maps.LatLng(42.632113618127029, 2.858185434204095),
		new google.maps.LatLng(42.632134355129004, 2.858230432963228),
		new google.maps.LatLng(42.632204627282093, 2.858341059698658),
		new google.maps.LatLng(42.63220822989927, 2.858345921003792)
	],
	[
		new google.maps.LatLng(42.63220822989927, 2.858345921003792),
		new google.maps.LatLng(42.632285685058783, 2.858449226084998),
		new google.maps.LatLng(42.632382918016397, 2.858552482668468),
		new google.maps.LatLng(42.632404478875067, 2.85857378806778),
		new google.maps.LatLng(42.632574665295635, 2.858741957094435),
		new google.maps.LatLng(42.632768165107024, 2.85889733679639),
		new google.maps.LatLng(42.632980526640679, 2.859039278962649),
		new google.maps.LatLng(42.633163168873658, 2.859142331491475),
		new google.maps.LatLng(42.63334578661545, 2.859227121773467),
		new google.maps.LatLng(42.633637259283397, 2.859365222000648),
		new google.maps.LatLng(42.633756046064313, 2.859451384773057),
		new google.maps.LatLng(42.633866770964801, 2.859559483268406)
	],
	[
		new google.maps.LatLng(42.659071108942868, 2.85901271810698),
		new google.maps.LatLng(42.658934489866475, 2.859042282930272),
		new google.maps.LatLng(42.658826624474308, 2.859059597116044),
		new google.maps.LatLng(42.658722358643764, 2.859079340087666),
		new google.maps.LatLng(42.658642381946073, 2.859109985867331),
		new google.maps.LatLng(42.658390801051951, 2.859229967528655),
		new google.maps.LatLng(42.658187755817757, 2.859338869155691),
		new google.maps.LatLng(42.658114128149045, 2.859412132851968),
		new google.maps.LatLng(42.658060301440919, 2.859501183470061),
		new google.maps.LatLng(42.657970624848389, 2.859676805343423)
	],
	[
		new google.maps.LatLng(42.633866770964801, 2.859559483268406),
		new google.maps.LatLng(42.633910881264427, 2.859603210391568)
	],
	[
		new google.maps.LatLng(42.633910881264427, 2.859603210391568),
		new google.maps.LatLng(42.633955907731554, 2.859659112115441)
	],
	[
		new google.maps.LatLng(42.633955907731554, 2.859659112115441),
		new google.maps.LatLng(42.634008168705634, 2.859747869682862),
		new google.maps.LatLng(42.634044197266093, 2.859798922259506)
	],
	[
		new google.maps.LatLng(42.657939295189202, 2.859781637801937),
		new google.maps.LatLng(42.657970624848389, 2.859676805343423)
	],
	[
		new google.maps.LatLng(42.634044197266093, 2.859798922259506),
		new google.maps.LatLng(42.634118981792845, 2.859924155468021),
		new google.maps.LatLng(42.634172183570655, 2.860044569205462),
		new google.maps.LatLng(42.634207343779295, 2.860118758118032),
		new google.maps.LatLng(42.634258830379295, 2.860303709852841),
		new google.maps.LatLng(42.634286901610331, 2.860457060319795),
		new google.maps.LatLng(42.634307717740931, 2.860562942198301),
		new google.maps.LatLng(42.634324011604917, 2.860648135040793),
		new google.maps.LatLng(42.634335778778279, 2.860708987157758),
		new google.maps.LatLng(42.634342117545486, 2.860744282512116),
		new google.maps.LatLng(42.634382975423151, 2.861052237884439)
	],
	[
		new google.maps.LatLng(42.657939295189202, 2.859781637801937),
		new google.maps.LatLng(42.657879092556179, 2.859808579652123),
		new google.maps.LatLng(42.657871424513132, 2.859820609975997),
		new google.maps.LatLng(42.657820773528286, 2.859900077949247)
	],
	[
		new google.maps.LatLng(42.657820773528286, 2.859900077949247),
		new google.maps.LatLng(42.657888324279561, 2.859992489626827),
		new google.maps.LatLng(42.657937965889758, 2.86013975969047),
		new google.maps.LatLng(42.657983295560527, 2.860428340446831),
		new google.maps.LatLng(42.657991483016801, 2.860501406346319),
		new google.maps.LatLng(42.658035115569163, 2.860867948583896)
	],
	[
		new google.maps.LatLng(42.658035115569163, 2.860867948583896),
		new google.maps.LatLng(42.658083268995156, 2.861255188413179),
		new google.maps.LatLng(42.658092361803519, 2.86133434379911),
		new google.maps.LatLng(42.658104176687878, 2.861431763324494),
		new google.maps.LatLng(42.658117796721662, 2.861535268923639),
		new google.maps.LatLng(42.658137786537466, 2.861698447431798)
	],
	[
		new google.maps.LatLng(42.634382975423151, 2.861052237884439),
		new google.maps.LatLng(42.634435560962928, 2.86139182420009),
		new google.maps.LatLng(42.634479975995554, 2.861671767427343),
		new google.maps.LatLng(42.634511655244317, 2.861836069701168),
		new google.maps.LatLng(42.63454958393978, 2.861966262914261),
		new google.maps.LatLng(42.634590200497094, 2.862090362552699)
	],
	[
		new google.maps.LatLng(42.659580700789107, 2.861629244202581),
		new google.maps.LatLng(42.65951148666052, 2.86164037152021),
		new google.maps.LatLng(42.659413498411602, 2.861647912313239),
		new google.maps.LatLng(42.659274141756399, 2.861647025471063),
		new google.maps.LatLng(42.65905564482987, 2.861629271797725),
		new google.maps.LatLng(42.658919873451893, 2.861619849820227),
		new google.maps.LatLng(42.658906387525491, 2.861619882356805),
		new google.maps.LatLng(42.658807495469006, 2.861623770800158),
		new google.maps.LatLng(42.658716703854282, 2.861634949794227),
		new google.maps.LatLng(42.658642106614039, 2.861654616105009),
		new google.maps.LatLng(42.658566628092601, 2.861687684288732),
		new google.maps.LatLng(42.658474105879648, 2.861751245795274),
		new google.maps.LatLng(42.65836637091472, 2.861869656725841),
		new google.maps.LatLng(42.658284716605451, 2.861994096839976),
		new google.maps.LatLng(42.658194956421823, 2.862107593002599)
	],
	[
		new google.maps.LatLng(42.660019185770494, 2.862823196094349),
		new google.maps.LatLng(42.659920876430725, 2.862581018666639),
		new google.maps.LatLng(42.659825181732323, 2.862275493114536),
		new google.maps.LatLng(42.659635668003716, 2.861725345260302),
		new google.maps.LatLng(42.659580700789107, 2.861629244202581)
	],
	[
		new google.maps.LatLng(42.658137786537466, 2.861698447431798),
		new google.maps.LatLng(42.658194956421823, 2.862107593002599)
	],
	[
		new google.maps.LatLng(42.634590200497094, 2.862090362552699),
		new google.maps.LatLng(42.634658804464763, 2.862304499836101),
		new google.maps.LatLng(42.634809473869346, 2.862715695860094)
	],
	[
		new google.maps.LatLng(42.634809473869346, 2.862715695860094),
		new google.maps.LatLng(42.634843758833739, 2.862810589637554),
		new google.maps.LatLng(42.634971008271471, 2.863187750295796),
		new google.maps.LatLng(42.635010889919698, 2.863440921121222),
		new google.maps.LatLng(42.635030878489076, 2.863605252624747),
		new google.maps.LatLng(42.63505355582037, 2.863763489305942)
	],
	[
		new google.maps.LatLng(42.660019185770494, 2.862823196094349),
		new google.maps.LatLng(42.660219356346303, 2.863274655743054),
		new google.maps.LatLng(42.660253604789538, 2.863340354732667),
		new google.maps.LatLng(42.660636637968373, 2.864069128564296),
		new google.maps.LatLng(42.660694317195521, 2.864178627889251)
	],
	[
		new google.maps.LatLng(42.635184386672385, 2.864132121425433),
		new google.maps.LatLng(42.635096928906599, 2.863935071926495),
		new google.maps.LatLng(42.635058075963443, 2.863782960838192),
		new google.maps.LatLng(42.63505355582037, 2.863763489305942)
	],
	[
		new google.maps.LatLng(42.635184386672385, 2.864132121425433),
		new google.maps.LatLng(42.63536456507785, 2.864422713761098),
		new google.maps.LatLng(42.635569009308398, 2.864707163347378),
		new google.maps.LatLng(42.635840910019652, 2.865014592908086),
		new google.maps.LatLng(42.636015513683027, 2.865163958394091),
		new google.maps.LatLng(42.636031711251633, 2.865176097763306)
	],
	[
		new google.maps.LatLng(42.660694317195521, 2.864178627889251),
		new google.maps.LatLng(42.660714143155765, 2.864215126396532)
	],
	[
		new google.maps.LatLng(42.660714143155765, 2.864215126396532),
		new google.maps.LatLng(42.660752897131957, 2.864289343999567),
		new google.maps.LatLng(42.660789845076685, 2.864357474096123),
		new google.maps.LatLng(42.661460766504568, 2.865239084489125),
		new google.maps.LatLng(42.661501332947374, 2.865325480487201),
		new google.maps.LatLng(42.661531128228319, 2.86542530179275),
		new google.maps.LatLng(42.661554634005938, 2.865528791322163),
		new google.maps.LatLng(42.661549359050333, 2.865623821857633),
		new google.maps.LatLng(42.661527141798643, 2.86583096076897),
		new google.maps.LatLng(42.661378747758569, 2.866511040154538),
		new google.maps.LatLng(42.661338403390523, 2.866602494968793),
		new google.maps.LatLng(42.661183348663648, 2.866991443600871),
		new google.maps.LatLng(42.661167289434005, 2.86709136958346),
		new google.maps.LatLng(42.661163776499677, 2.867158376025497),
		new google.maps.LatLng(42.66117196815879, 2.867238755471957),
		new google.maps.LatLng(42.66119362684752, 2.867304487038951),
		new google.maps.LatLng(42.661444915085973, 2.867665711097215),
		new google.maps.LatLng(42.661991537816547, 2.868385631239866),
		new google.maps.LatLng(42.662054583836543, 2.868475634421089)
	],
	[
		new google.maps.LatLng(42.636031711251633, 2.865176097763306),
		new google.maps.LatLng(42.636244981926112, 2.865331462033605),
		new google.maps.LatLng(42.636447475143115, 2.865496594129919),
		new google.maps.LatLng(42.636614887398125, 2.865647196087724),
		new google.maps.LatLng(42.63666891906621, 2.865717695996334),
		new google.maps.LatLng(42.636717580189064, 2.865807689628399),
		new google.maps.LatLng(42.63680241746551, 2.866068072140699),
		new google.maps.LatLng(42.636965004761713, 2.866675309373833),
		new google.maps.LatLng(42.636981320084999, 2.866781207564517)
	],
	[
		new google.maps.LatLng(42.636981320084999, 2.866781207564517),
		new google.maps.LatLng(42.636993083075829, 2.866842063453698)
	],
	[
		new google.maps.LatLng(42.636993083075829, 2.866842063453698),
		new google.maps.LatLng(42.637004036988969, 2.866974763825889),
		new google.maps.LatLng(42.637021273633252, 2.867098925394747),
		new google.maps.LatLng(42.637032129982693, 2.867153695327596)
	],
	[
		new google.maps.LatLng(42.637032129982693, 2.867153695327596),
		new google.maps.LatLng(42.637066523535779, 2.867338700295978),
		new google.maps.LatLng(42.637084617244888, 2.867429984070992),
		new google.maps.LatLng(42.637086448981044, 2.867456768342404)
	],
	[
		new google.maps.LatLng(42.637086448981044, 2.867456768342404),
		new google.maps.LatLng(42.637091894280431, 2.867498155858592),
		new google.maps.LatLng(42.637087492557569, 2.867573661126499),
		new google.maps.LatLng(42.637038118606498, 2.867633438182207),
		new google.maps.LatLng(42.636977068213177, 2.867701765432091),
		new google.maps.LatLng(42.636946562301297, 2.867751758589496),
		new google.maps.LatLng(42.636943946919395, 2.867817517611076)
	],
	[
		new google.maps.LatLng(42.636943946919395, 2.867817517611076),
		new google.maps.LatLng(42.63698272264088, 2.867912407901645),
		new google.maps.LatLng(42.637099824758153, 2.868094791327952)
	],
	[
		new google.maps.LatLng(42.637099824758153, 2.868094791327952),
		new google.maps.LatLng(42.637123244244989, 2.868131267122322),
		new google.maps.LatLng(42.637216007090508, 2.868261347093186)
	],
	[
		new google.maps.LatLng(42.637216007090508, 2.868261347093186),
		new google.maps.LatLng(42.637399728486606, 2.868517860181292)
	],
	[
		new google.maps.LatLng(42.637399728486606, 2.868517860181292),
		new google.maps.LatLng(42.63741233656966, 2.868534878244361),
		new google.maps.LatLng(42.637466374882564, 2.868612687692104)
	],
	[
		new google.maps.LatLng(42.662054583836543, 2.868475634421089),
		new google.maps.LatLng(42.66208791212906, 2.868526723319211),
		new google.maps.LatLng(42.662124834132193, 2.868575367494683),
		new google.maps.LatLng(42.662177986910265, 2.868662956075669),
		new google.maps.LatLng(42.662244693747816, 2.868806551390112),
		new google.maps.LatLng(42.66233422018405, 2.869230279220517),
		new google.maps.LatLng(42.662371324663866, 2.869428759555534),
		new google.maps.LatLng(42.662398485581562, 2.869583409037247),
		new google.maps.LatLng(42.662411256818274, 2.86973443556822),
		new google.maps.LatLng(42.662402597659501, 2.870007329091396),
		new google.maps.LatLng(42.662316566638388, 2.870237758375485),
		new google.maps.LatLng(42.6622483988412, 2.870370692377276),
		new google.maps.LatLng(42.662199993500714, 2.870490181634135),
		new google.maps.LatLng(42.662172222807158, 2.870573079971544),
		new google.maps.LatLng(42.662167889085772, 2.870707089003087),
		new google.maps.LatLng(42.662196753593932, 2.87078498874993),
		new google.maps.LatLng(42.662330963218785, 2.870990564376112),
		new google.maps.LatLng(42.662513848408246, 2.871300798058581),
		new google.maps.LatLng(42.662668796565399, 2.871557495384682),
		new google.maps.LatLng(42.662722875680394, 2.871669449884667),
		new google.maps.LatLng(42.662735535399243, 2.871730331326254),
		new google.maps.LatLng(42.662738324442991, 2.871807071240932)
	],
	[
		new google.maps.LatLng(42.637466374882564, 2.868612687692104),
		new google.maps.LatLng(42.637577153648976, 2.868771951912543)
	],
	[
		new google.maps.LatLng(42.637577153648976, 2.868771951912543),
		new google.maps.LatLng(42.637678021358255, 2.868914192782456),
		new google.maps.LatLng(42.637952720487945, 2.869314190824649)
	],
	[
		new google.maps.LatLng(42.637952720487945, 2.869314190824649),
		new google.maps.LatLng(42.638041893309548, 2.869450371173023),
		new google.maps.LatLng(42.638150026637163, 2.86965348122),
		new google.maps.LatLng(42.638225699661447, 2.869778733930152)
	],
	[
		new google.maps.LatLng(42.638944447451394, 2.870856007822331),
		new google.maps.LatLng(42.638305893520695, 2.869925893726736),
		new google.maps.LatLng(42.638225699661447, 2.869778733930152)
	],
	[
		new google.maps.LatLng(42.639031809130884, 2.870983673101524),
		new google.maps.LatLng(42.638944447451394, 2.870856007822331)
	],
	[
		new google.maps.LatLng(42.639274079673186, 2.871337489235529),
		new google.maps.LatLng(42.639254267409612, 2.871309525520577),
		new google.maps.LatLng(42.639031809130884, 2.870983673101524)
	],
	[
		new google.maps.LatLng(42.639359640231888, 2.871462723337166),
		new google.maps.LatLng(42.639274079673186, 2.871337489235529)
	],
	[
		new google.maps.LatLng(42.639502712183685, 2.871564695360181),
		new google.maps.LatLng(42.63941905351718, 2.871525913912587),
		new google.maps.LatLng(42.639359640231888, 2.871462723337166)
	],
	[
		new google.maps.LatLng(42.639502712183685, 2.871564695360181),
		new google.maps.LatLng(42.63950093450017, 2.871581748061349),
		new google.maps.LatLng(42.6395036769866, 2.871619489954409),
		new google.maps.LatLng(42.639513614414902, 2.871659653234417),
		new google.maps.LatLng(42.639539750968822, 2.871713175202179),
		new google.maps.LatLng(42.639564057675159, 2.871739910524638),
		new google.maps.LatLng(42.639594646712091, 2.871758109575977),
		new google.maps.LatLng(42.639623421451667, 2.871761699618098)
	],
	[
		new google.maps.LatLng(42.639623421451667, 2.871761699618098),
		new google.maps.LatLng(42.639659519055499, 2.871874866763354),
		new google.maps.LatLng(42.639691982570767, 2.871956382112646),
		new google.maps.LatLng(42.639882916962051, 2.872237255832337),
		new google.maps.LatLng(42.639987405990603, 2.872403854531247)
	],
	[
		new google.maps.LatLng(42.662738324442991, 2.871807071240932),
		new google.maps.LatLng(42.662714177656852, 2.871914325511804),
		new google.maps.LatLng(42.662709764793881, 2.871982555015832),
		new google.maps.LatLng(42.662700964943603, 2.872142157418036),
		new google.maps.LatLng(42.662707631514188, 2.872455217991895),
		new google.maps.LatLng(42.662709824439261, 2.872786561804745),
		new google.maps.LatLng(42.662706528795958, 2.873039953855834),
		new google.maps.LatLng(42.662702197143908, 2.873177619633456),
		new google.maps.LatLng(42.662686151013872, 2.873293382007597),
		new google.maps.LatLng(42.662652987974965, 2.873379946518983),
		new google.maps.LatLng(42.662582073752887, 2.873475119322805),
		new google.maps.LatLng(42.662355776214902, 2.873702192705478),
		new google.maps.LatLng(42.662323448280368, 2.873735154222945),
		new google.maps.LatLng(42.662258793281396, 2.873801075933109),
		new google.maps.LatLng(42.662197780682703, 2.873905972502814),
		new google.maps.LatLng(42.662087513341788, 2.874176646935639),
		new google.maps.LatLng(42.661983412249938, 2.874338889922959),
		new google.maps.LatLng(42.661961911867849, 2.874404717126261),
		new google.maps.LatLng(42.661946679197492, 2.874448604536827),
		new google.maps.LatLng(42.661952127318827, 2.874494883556807),
		new google.maps.LatLng(42.661958486424055, 2.874550905695676),
		new google.maps.LatLng(42.662027889285319, 2.874699374464941),
		new google.maps.LatLng(42.662181849619422, 2.874886643084421),
		new google.maps.LatLng(42.662324927670646, 2.874994754662902),
		new google.maps.LatLng(42.662495850534945, 2.875079661151283),
		new google.maps.LatLng(42.662668552889315, 2.875148728945708),
		new google.maps.LatLng(42.662766628896399, 2.875215518668504),
		new google.maps.LatLng(42.662830587556563, 2.875322583507347),
		new google.maps.LatLng(42.662889204663088, 2.875474732674559),
		new google.maps.LatLng(42.662946120955588, 2.875710941834051),
		new google.maps.LatLng(42.662967053596411, 2.875930172830235),
		new google.maps.LatLng(42.662980760005972, 2.876120183064833),
		new google.maps.LatLng(42.66297374820595, 2.876276127427678),
		new google.maps.LatLng(42.662972228501964, 2.876517333293485),
		new google.maps.LatLng(42.662984962758031, 2.876645217904216),
		new google.maps.LatLng(42.663004816869417, 2.876709740878982),
		new google.maps.LatLng(42.663066071663408, 2.876811939865829),
		new google.maps.LatLng(42.663162369532657, 2.876897010301994),
		new google.maps.LatLng(42.663263078412974, 2.876907761907947),
		new google.maps.LatLng(42.663372710465644, 2.876860019899594),
		new google.maps.LatLng(42.663471483739045, 2.876752608322017),
		new google.maps.LatLng(42.664534079002351, 2.8758817623833),
		new google.maps.LatLng(42.664723554256838, 2.875684003881624),
		new google.maps.LatLng(42.664815153759591, 2.875593659684424),
		new google.maps.LatLng(42.664893373024817, 2.875593491753381),
		new google.maps.LatLng(42.664957250972932, 2.875631121763579),
		new google.maps.LatLng(42.665008592938072, 2.875712634490129),
		new google.maps.LatLng(42.665069951904641, 2.875903766871878),
		new google.maps.LatLng(42.665155909666524, 2.876375044845508),
		new google.maps.LatLng(42.665204920161848, 2.876774525783542),
		new google.maps.LatLng(42.665191645824677, 2.876958508281362),
		new google.maps.LatLng(42.66515582672136, 2.877084063856889),
		new google.maps.LatLng(42.665130721637276, 2.87714381108069),
		new google.maps.LatLng(42.665099399549945, 2.877270573721923),
		new google.maps.LatLng(42.665031612918284, 2.877744612547446),
		new google.maps.LatLng(42.665014759656458, 2.877945658620789),
		new google.maps.LatLng(42.665029288419134, 2.878071106931821),
		new google.maps.LatLng(42.665069849024285, 2.878161172203238),
		new google.maps.LatLng(42.665149968873394, 2.878251155029943),
		new google.maps.LatLng(42.665457716808376, 2.878484415944287),
		new google.maps.LatLng(42.665518862306378, 2.878491598221918),
		new google.maps.LatLng(42.665584462395472, 2.878463440754521),
		new google.maps.LatLng(42.665645557463073, 2.878426766396845),
		new google.maps.LatLng(42.665764126677665, 2.878331494943052)
	],
	[
		new google.maps.LatLng(42.639987405990603, 2.872403854531247),
		new google.maps.LatLng(42.640066671629789, 2.872529105698272)
	],
	[
		new google.maps.LatLng(42.640066671629789, 2.872529105698272),
		new google.maps.LatLng(42.640106301902065, 2.872589904795503)
	],
	[
		new google.maps.LatLng(42.640106301902065, 2.872589904795503),
		new google.maps.LatLng(42.640535899656463, 2.873220968394382)
	],
	[
		new google.maps.LatLng(42.640535899656463, 2.873220968394382),
		new google.maps.LatLng(42.640747559142888, 2.873544426081259),
		new google.maps.LatLng(42.640841220549049, 2.873679391333994)
	],
	[
		new google.maps.LatLng(42.640841220549049, 2.873679391333994),
		new google.maps.LatLng(42.640878143556833, 2.87373167395565)
	],
	[
		new google.maps.LatLng(42.640878143556833, 2.87373167395565),
		new google.maps.LatLng(42.640955625653454, 2.873870328389247),
		new google.maps.LatLng(42.641028657505124, 2.874047960091422),
		new google.maps.LatLng(42.641138706910141, 2.874358247423602)
	],
	[
		new google.maps.LatLng(42.641138706910141, 2.874358247423602),
		new google.maps.LatLng(42.641303773400523, 2.874818199949114),
		new google.maps.LatLng(42.641431886324575, 2.875201516009844)
	],
	[
		new google.maps.LatLng(42.641612174107962, 2.875611513031074),
		new google.maps.LatLng(42.6415481529597, 2.875449688691889),
		new google.maps.LatLng(42.641515685280929, 2.875362079432409),
		new google.maps.LatLng(42.641431886324575, 2.875201516009844)
	],
	[
		new google.maps.LatLng(42.641750041745212, 2.875880342045255),
		new google.maps.LatLng(42.641736462700891, 2.875799999867171),
		new google.maps.LatLng(42.641718428948231, 2.875754980428146),
		new google.maps.LatLng(42.641684202731255, 2.875701472312699),
		new google.maps.LatLng(42.641649986705104, 2.875656489040583),
		new google.maps.LatLng(42.641612174107962, 2.875611513031074)
	],
	[
		new google.maps.LatLng(42.641673977904894, 2.876187378817937),
		new google.maps.LatLng(42.641704492390559, 2.876141039306232),
		new google.maps.LatLng(42.641734983838106, 2.876075215022859),
		new google.maps.LatLng(42.641751994182336, 2.87601307338333),
		new google.maps.LatLng(42.641757319027505, 2.875953392660246),
		new google.maps.LatLng(42.641750041745212, 2.875880342045255)
	],
	[
		new google.maps.LatLng(42.641584157969248, 2.876260634068434),
		new google.maps.LatLng(42.641638067272304, 2.876231293916491),
		new google.maps.LatLng(42.641673977904894, 2.876187378817937)
	],
	[
		new google.maps.LatLng(42.641584563116133, 2.876611346111435),
		new google.maps.LatLng(42.641567355839769, 2.876503002918213),
		new google.maps.LatLng(42.641560076265762, 2.87642751733532),
		new google.maps.LatLng(42.641568080415944, 2.876352000081246),
		new google.maps.LatLng(42.641584157969248, 2.876260634068434)
	],
	[
		new google.maps.LatLng(42.641584563116133, 2.876611346111435),
		new google.maps.LatLng(42.641616997679364, 2.87667094787046),
		new google.maps.LatLng(42.641672826920207, 2.876747547933276),
		new google.maps.LatLng(42.641740348185238, 2.876827777013266),
		new google.maps.LatLng(42.64180342671078, 2.876953073136012),
		new google.maps.LatLng(42.641842276911639, 2.87711982350484)
	],
	[
		new google.maps.LatLng(42.641842276911639, 2.87711982350484),
		new google.maps.LatLng(42.641866671863426, 2.87722449857486),
		new google.maps.LatLng(42.641910120948147, 2.877481355228605),
		new google.maps.LatLng(42.641946325224033, 2.877693168368181),
		new google.maps.LatLng(42.642073675030218, 2.878204361443093),
		new google.maps.LatLng(42.64213503071057, 2.878397858326434),
		new google.maps.LatLng(42.642204502814586, 2.878613257341645),
		new google.maps.LatLng(42.642377587780778, 2.879025721015788),
		new google.maps.LatLng(42.642403743368256, 2.879098732276837)
	],
	[
		new google.maps.LatLng(42.665764126677665, 2.878331494943052),
		new google.maps.LatLng(42.665950085436066, 2.878199534780617),
		new google.maps.LatLng(42.666097406269643, 2.878088364561297),
		new google.maps.LatLng(42.666183667407388, 2.878044325631845),
		new google.maps.LatLng(42.666244805504498, 2.878045416709563),
		new google.maps.LatLng(42.666345519472763, 2.878061042916801),
		new google.maps.LatLng(42.666527201754974, 2.878121576204194),
		new google.maps.LatLng(42.666654006952108, 2.878152986697812),
		new google.maps.LatLng(42.666942621060187, 2.878163347283494),
		new google.maps.LatLng(42.667180867958969, 2.878156757627933),
		new google.maps.LatLng(42.667332822795878, 2.878166186489878),
		new google.maps.LatLng(42.667422773266878, 2.878203765749316),
		new google.maps.LatLng(42.667499279990516, 2.878279139792421),
		new google.maps.LatLng(42.667574090144043, 2.878443453442313),
		new google.maps.LatLng(42.667684031604708, 2.878667391289094),
		new google.maps.LatLng(42.667759764797943, 2.878853633203795),
		new google.maps.LatLng(42.667808525840165, 2.87903993185726),
		new google.maps.LatLng(42.667863672670812, 2.879309061405904),
		new google.maps.LatLng(42.66787284606373, 2.879471077238595),
		new google.maps.LatLng(42.667856838760017, 2.879627052204397),
		new google.maps.LatLng(42.667784405184747, 2.879975636020417),
		new google.maps.LatLng(42.667726280862709, 2.880257182969991),
		new google.maps.LatLng(42.667695772443558, 2.880310850806905)
	],
	[
		new google.maps.LatLng(42.672884807527197, 2.879121992513016),
		new google.maps.LatLng(42.672858637262991, 2.879036758683035)
	],
	[
		new google.maps.LatLng(42.642403743368256, 2.879098732276837),
		new google.maps.LatLng(42.642531800465655, 2.879445532843506)
	],
	[
		new google.maps.LatLng(42.673515688738583, 2.881288251697439),
		new google.maps.LatLng(42.67347237172001, 2.881143348347209),
		new google.maps.LatLng(42.67337580259413, 2.880812136755096),
		new google.maps.LatLng(42.673150176269381, 2.880046217143717),
		new google.maps.LatLng(42.672937184931484, 2.879326576743831),
		new google.maps.LatLng(42.672906478335499, 2.879204798818735)
	],
	[
		new google.maps.LatLng(42.642531800465655, 2.879445532843506),
		new google.maps.LatLng(42.642709439772062, 2.879912790385766),
		new google.maps.LatLng(42.642854634675906, 2.880311923173503),
		new google.maps.LatLng(42.642876273799082, 2.880367896740871),
		new google.maps.LatLng(42.642967341033078, 2.880602741669342),
		new google.maps.LatLng(42.643170900302621, 2.880937215385522),
		new google.maps.LatLng(42.643416718436114, 2.881276477150203),
		new google.maps.LatLng(42.64364091062, 2.881571944154564),
		new google.maps.LatLng(42.643786807860849, 2.881798159276335)
	],
	[
		new google.maps.LatLng(42.667721085693358, 2.882055402154345),
		new google.maps.LatLng(42.667719169902384, 2.881949413947303),
		new google.maps.LatLng(42.667701920730295, 2.880986993217565),
		new google.maps.LatLng(42.667687447225681, 2.880907833044632),
		new google.maps.LatLng(42.66766572429588, 2.880777520215192),
		new google.maps.LatLng(42.667661081131129, 2.880644734778692),
		new google.maps.LatLng(42.667676157587806, 2.880458304900813),
		new google.maps.LatLng(42.667695772443558, 2.880310850806905)
	],
	[
		new google.maps.LatLng(42.673621000921941, 2.88139647738072),
		new google.maps.LatLng(42.673556208151957, 2.881342998346409),
		new google.maps.LatLng(42.673515688738583, 2.881288251697439)
	],
	[
		new google.maps.LatLng(42.673621000921941, 2.88139647738072),
		new google.maps.LatLng(42.673612123787656, 2.881498842316449),
		new google.maps.LatLng(42.673613975930223, 2.881547576361906),
		new google.maps.LatLng(42.673619413557269, 2.881586554335756),
		new google.maps.LatLng(42.673632058195601, 2.881638920540353),
		new google.maps.LatLng(42.673706055129905, 2.881884891740778),
		new google.maps.LatLng(42.673986731756159, 2.882851755274047),
		new google.maps.LatLng(42.674122136486119, 2.883348604134704)
	],
	[
		new google.maps.LatLng(42.643819231214579, 2.881850457779024),
		new google.maps.LatLng(42.643870587752843, 2.881950213836848),
		new google.maps.LatLng(42.643979677339388, 2.882226434350788),
		new google.maps.LatLng(42.644114127938643, 2.882673097225005),
		new google.maps.LatLng(42.64420340045281, 2.882916478759475)
	],
	[
		new google.maps.LatLng(42.667721085693358, 2.882055402154345),
		new google.maps.LatLng(42.667733920853479, 2.882280760980492),
		new google.maps.LatLng(42.667747577833858, 2.882436676172272),
		new google.maps.LatLng(42.667765785615174, 2.882642532052627),
		new google.maps.LatLng(42.667759684311171, 2.882817978924311),
		new google.maps.LatLng(42.667738268384667, 2.882965435770882)
	],
	[
		new google.maps.LatLng(42.670257272366975, 2.882777624156608),
		new google.maps.LatLng(42.670351988144553, 2.882770570579013),
		new google.maps.LatLng(42.670381267261597, 2.883529098583396),
		new google.maps.LatLng(42.670398624921823, 2.883782482654543),
		new google.maps.LatLng(42.670436617366882, 2.88399561828377),
		new google.maps.LatLng(42.670499754367761, 2.884181900932467),
		new google.maps.LatLng(42.67059525941395, 2.884369338672938),
		new google.maps.LatLng(42.670716865276042, 2.884582311127729),
		new google.maps.LatLng(42.670819511380039, 2.884723437761785),
		new google.maps.LatLng(42.670937437924493, 2.88485966147187),
		new google.maps.LatLng(42.671090437546226, 2.885005563363549),
		new google.maps.LatLng(42.671193933065382, 2.885100391809657),
		new google.maps.LatLng(42.671283914649351, 2.885168442643491)
	],
	[
		new google.maps.LatLng(42.669691416748869, 2.883291683648257),
		new google.maps.LatLng(42.669746257301313, 2.883289136849022),
		new google.maps.LatLng(42.669891003953353, 2.883285192292361),
		new google.maps.LatLng(42.66994674011913, 2.883278988812325),
		new google.maps.LatLng(42.669997967884385, 2.883260611344461),
		new google.maps.LatLng(42.670044675442888, 2.883220311221037),
		new google.maps.LatLng(42.67013626928226, 2.8831177867142),
		new google.maps.LatLng(42.67021530455709, 2.883040871797741),
		new google.maps.LatLng(42.670253892387578, 2.882975004140172),
		new google.maps.LatLng(42.670260094268116, 2.882890925013438),
		new google.maps.LatLng(42.670260939886049, 2.882842189687146),
		new google.maps.LatLng(42.670257272366975, 2.882777624156608)
	],
	[
		new google.maps.LatLng(42.64420340045281, 2.882916478759475),
		new google.maps.LatLng(42.644273739042575, 2.8831099687839),
		new google.maps.LatLng(42.64442515584409, 2.883454305267378),
		new google.maps.LatLng(42.644693492036922, 2.883838599369906),
		new google.maps.LatLng(42.644851976306818, 2.884069669428313),
		new google.maps.LatLng(42.644974443805111, 2.884250881853633),
		new google.maps.LatLng(42.645186945966174, 2.884551262985761),
		new google.maps.LatLng(42.645276184297288, 2.884766642744911),
		new google.maps.LatLng(42.64535290289701, 2.885044156370826),
		new google.maps.LatLng(42.645452146124221, 2.885367904321417),
		new google.maps.LatLng(42.645514331471489, 2.885507832422599),
		new google.maps.LatLng(42.645574712125189, 2.885642893552353),
		new google.maps.LatLng(42.645690897389244, 2.885836301666596),
		new google.maps.LatLng(42.645731424785112, 2.885901986146826),
		new google.maps.LatLng(42.645754381038394, 2.88594638167514),
		new google.maps.LatLng(42.645804398551029, 2.886043112628478),
		new google.maps.LatLng(42.64585752305932, 2.886118514213846)
	],
	[
		new google.maps.LatLng(42.667738268384667, 2.882965435770882),
		new google.maps.LatLng(42.667807547015975, 2.883011592087431),
		new google.maps.LatLng(42.667970416258967, 2.883136750526223)
	],
	[
		new google.maps.LatLng(42.669026977953493, 2.883272302928621),
		new google.maps.LatLng(42.669114170980244, 2.883256289334731),
		new google.maps.LatLng(42.669177971909406, 2.88322570367029),
		new google.maps.LatLng(42.669248058159525, 2.883187795001866),
		new google.maps.LatLng(42.669302880308329, 2.883168192171209),
		new google.maps.LatLng(42.669422440433365, 2.88315211369437),
		new google.maps.LatLng(42.669506046550396, 2.883144636444843),
		new google.maps.LatLng(42.669548298389103, 2.883140896966619),
		new google.maps.LatLng(42.669586945825991, 2.883128635632429),
		new google.maps.LatLng(42.669615678666361, 2.883094464428997),
		new google.maps.LatLng(42.669634512458728, 2.883051784434376)
	],
	[
		new google.maps.LatLng(42.669634512458728, 2.883051784434376),
		new google.maps.LatLng(42.669680373905017, 2.883059002970355),
		new google.maps.LatLng(42.66971007101305, 2.883084528059427),
		new google.maps.LatLng(42.669728092175262, 2.883121042530906),
		new google.maps.LatLng(42.66973174144583, 2.88316976896358),
		new google.maps.LatLng(42.669724595707663, 2.883212424530945),
		new google.maps.LatLng(42.669691416748869, 2.883291683648257)
	],
	[
		new google.maps.LatLng(42.667970416258967, 2.883136750526223),
		new google.maps.LatLng(42.668075694935261, 2.883215729546694)
	],
	[
		new google.maps.LatLng(42.668075694935261, 2.883215729546694),
		new google.maps.LatLng(42.668109887020137, 2.883241245584633),
		new google.maps.LatLng(42.668209748222708, 2.883299524586114),
		new google.maps.LatLng(42.668258313085616, 2.883312827892813),
		new google.maps.LatLng(42.668348220445331, 2.883312648912471),
		new google.maps.LatLng(42.668419239115835, 2.883305195702332),
		new google.maps.LatLng(42.668964048342829, 2.883277302371695),
		new google.maps.LatLng(42.669026977953493, 2.883272302928621)
	],
	[
		new google.maps.LatLng(42.673723666528751, 2.88401222434183),
		new google.maps.LatLng(42.673812535977021, 2.883884112344181),
		new google.maps.LatLng(42.673904095000033, 2.883748684507603),
		new google.maps.LatLng(42.673971408409784, 2.883640110789657),
		new google.maps.LatLng(42.674046779398687, 2.883501058664155),
		new google.maps.LatLng(42.674122136486119, 2.883348604134704)
	],
	[
		new google.maps.LatLng(42.673450501258152, 2.88415532312567),
		new google.maps.LatLng(42.67351971131621, 2.884138128097664),
		new google.maps.LatLng(42.673585322004399, 2.884117283344423),
		new google.maps.LatLng(42.673639230389071, 2.884084279685848),
		new google.maps.LatLng(42.673723666528751, 2.88401222434183)
	],
	[
		new google.maps.LatLng(42.673723666528751, 2.88401222434183),
		new google.maps.LatLng(42.673690500610476, 2.884276528414306),
		new google.maps.LatLng(42.673688280770051, 2.884370653988068),
		new google.maps.LatLng(42.673701744464267, 2.884493292864635),
		new google.maps.LatLng(42.673720854410476, 2.884547487489646),
		new google.maps.LatLng(42.673651451167132, 2.884694812927369),
		new google.maps.LatLng(42.673660094140907, 2.884761938570851),
		new google.maps.LatLng(42.673595333757106, 2.884790466025388),
		new google.maps.LatLng(42.673549652715444, 2.884842198214111),
		new google.maps.LatLng(42.673506848256423, 2.884912002073575),
		new google.maps.LatLng(42.673502231471979, 2.88505791568483),
		new google.maps.LatLng(42.673532823574988, 2.885159863949371),
		new google.maps.LatLng(42.673540902627103, 2.885428010295017),
		new google.maps.LatLng(42.673554122509074, 2.885495534954333),
		new google.maps.LatLng(42.673578933963277, 2.885534224915552),
		new google.maps.LatLng(42.674321661359592, 2.886044173241102),
		new google.maps.LatLng(42.674321700125397, 2.886082909424669),
		new google.maps.LatLng(42.674310313303643, 2.886129413846947),
		new google.maps.LatLng(42.674775549545387, 2.886408754347249),
		new google.maps.LatLng(42.675751657738161, 2.8870616637372),
		new google.maps.LatLng(42.67590549560169, 2.887151532038036),
		new google.maps.LatLng(42.676003556922367, 2.887209829159195),
		new google.maps.LatLng(42.676082309267095, 2.887257115028682)
	],
	[
		new google.maps.LatLng(42.673132576959503, 2.884478833554224),
		new google.maps.LatLng(42.673132551666484, 2.884455683794925),
		new google.maps.LatLng(42.673139672224828, 2.884388657468321),
		new google.maps.LatLng(42.673162965041925, 2.884311851794197),
		new google.maps.LatLng(42.673192571018127, 2.884253308912474),
		new google.maps.LatLng(42.67323476442234, 2.884194741240255),
		new google.maps.LatLng(42.673279685296336, 2.884164191008131),
		new google.maps.LatLng(42.673329116609231, 2.88414703544123),
		new google.maps.LatLng(42.673377663437407, 2.884144502231677),
		new google.maps.LatLng(42.67343161263301, 2.884148050491396),
		new google.maps.LatLng(42.673450501258152, 2.88415532312567)
	],
	[
		new google.maps.LatLng(42.673132576959503, 2.884478833554224),
		new google.maps.LatLng(42.673083037888112, 2.884396080740119),
		new google.maps.LatLng(42.673052429681057, 2.88435958862288),
		new google.maps.LatLng(42.673017343449729, 2.884338945558079),
		new google.maps.LatLng(42.672984965540451, 2.88432926294164),
		new google.maps.LatLng(42.672949001551252, 2.884328116134885),
		new google.maps.LatLng(42.672914844949233, 2.884335493839927),
		new google.maps.LatLng(42.672874409470161, 2.884357505083976),
		new google.maps.LatLng(42.672842984022751, 2.884396556460851),
		new google.maps.LatLng(42.67278289196755, 2.884531918749277),
		new google.maps.LatLng(42.672651924801215, 2.884808755289288),
		new google.maps.LatLng(42.672602567794122, 2.884894141262242),
		new google.maps.LatLng(42.672561266332217, 2.884946613500663),
		new google.maps.LatLng(42.672516358455546, 2.884989346967337),
		new google.maps.LatLng(42.672455257944328, 2.885023582582766),
		new google.maps.LatLng(42.672139824159373, 2.885157009384342),
		new google.maps.LatLng(42.671819899786222, 2.885294098227981),
		new google.maps.LatLng(42.671735406129407, 2.885312540977405),
		new google.maps.LatLng(42.671663483400074, 2.88531633765714),
		new google.maps.LatLng(42.67157985170509, 2.885299444293234),
		new google.maps.LatLng(42.671473719599781, 2.885261884611988),
		new google.maps.LatLng(42.671283914649351, 2.885168442643491)
	],
	[
		new google.maps.LatLng(42.64585752305932, 2.886118514213846),
		new google.maps.LatLng(42.645865626496345, 2.88612946001774),
		new google.maps.LatLng(42.645915131572323, 2.886182948226978),
		new google.maps.LatLng(42.645932251188675, 2.886218231760175),
		new google.maps.LatLng(42.645952071635413, 2.886257163925726),
		new google.maps.LatLng(42.6459646892297, 2.886286368102159)
	],
	[
		new google.maps.LatLng(42.6459646892297, 2.886286368102159),
		new google.maps.LatLng(42.646001642286897, 2.88637276286858),
		new google.maps.LatLng(42.646091778955821, 2.88659058173879)
	],
	[
		new google.maps.LatLng(42.646091778955821, 2.88659058173879),
		new google.maps.LatLng(42.646150367456841, 2.886731737341302),
		new google.maps.LatLng(42.646363920023994, 2.887181927957007),
		new google.maps.LatLng(42.64642246890903, 2.887286550087745),
		new google.maps.LatLng(42.646492730817386, 2.887415506842944),
		new google.maps.LatLng(42.64680065108768, 2.887837510040184),
		new google.maps.LatLng(42.646811456347109, 2.887853320805619),
		new google.maps.LatLng(42.647075250921532, 2.888207213200982),
		new google.maps.LatLng(42.647201306269857, 2.88838721553751),
		new google.maps.LatLng(42.647348973740776, 2.888600061389532),
		new google.maps.LatLng(42.647497557731576, 2.88882995538575),
		new google.maps.LatLng(42.647637133991417, 2.889044036078665),
		new google.maps.LatLng(42.64786675867002, 2.889396784542341),
		new google.maps.LatLng(42.647923488147569, 2.889483147345533),
		new google.maps.LatLng(42.64797489356225, 2.889636503204803),
		new google.maps.LatLng(42.648002882082032, 2.889750931117022),
		new google.maps.LatLng(42.648023671489959, 2.88985928406279),
		new google.maps.LatLng(42.648074178211687, 2.890013860378169),
		new google.maps.LatLng(42.648109342368734, 2.890112442853279),
		new google.maps.LatLng(42.648135470228418, 2.890165981234495),
		new google.maps.LatLng(42.648143577974103, 2.890181797522091),
		new google.maps.LatLng(42.648215573009331, 2.890249864699962),
		new google.maps.LatLng(42.648295626344819, 2.890286250315124),
		new google.maps.LatLng(42.648327107063658, 2.89029958747916),
		new google.maps.LatLng(42.648400816986999, 2.890287270335221)
	],
	[
		new google.maps.LatLng(42.676736775258846, 2.887653156962386),
		new google.maps.LatLng(42.676707977650871, 2.887627623942328),
		new google.maps.LatLng(42.676563129880684, 2.887536518123317),
		new google.maps.LatLng(42.676019751785461, 2.887220763267241)
	],
	[
		new google.maps.LatLng(42.681497932928153, 2.892523195142088),
		new google.maps.LatLng(42.681488849162115, 2.892430599195333),
		new google.maps.LatLng(42.681504913072168, 2.892311148562337),
		new google.maps.LatLng(42.681655928570528, 2.891390834678051),
		new google.maps.LatLng(42.681666643033211, 2.891317698818261),
		new google.maps.LatLng(42.681666590304999, 2.891265299329321),
		new google.maps.LatLng(42.681651245033841, 2.891205617780275),
		new google.maps.LatLng(42.681626938577914, 2.891175197349796),
		new google.maps.LatLng(42.681611632077903, 2.891153291435969),
		new google.maps.LatLng(42.680880823029476, 2.890417420941848),
		new google.maps.LatLng(42.680851093211686, 2.890358984751127),
		new google.maps.LatLng(42.680825872182631, 2.890313945396422),
		new google.maps.LatLng(42.680801507584512, 2.890226253625294),
		new google.maps.LatLng(42.680744600568481, 2.889969242277187),
		new google.maps.LatLng(42.68071206448451, 2.889804797357627),
		new google.maps.LatLng(42.680683215112275, 2.889728081986479),
		new google.maps.LatLng(42.680580426140466, 2.889444350087776),
		new google.maps.LatLng(42.68053717258968, 2.889349383952731),
		new google.maps.LatLng(42.680496647853985, 2.889286095775139),
		new google.maps.LatLng(42.680448946022388, 2.88923744412544),
		new google.maps.LatLng(42.680391377044941, 2.889210744987589),
		new google.maps.LatLng(42.680310434250949, 2.889186528001975),
		new google.maps.LatLng(42.680055935255808, 2.889130958472485),
		new google.maps.LatLng(42.679865299866435, 2.889102075675403),
		new google.maps.LatLng(42.679714220472086, 2.889070680755736),
		new google.maps.LatLng(42.679635056751763, 2.88902818205505),
		new google.maps.LatLng(42.679380471146018, 2.888888535375431),
		new google.maps.LatLng(42.679253628551521, 2.888819319896095),
		new google.maps.LatLng(42.679218530343604, 2.888786486767954),
		new google.maps.LatLng(42.679085378766835, 2.888702662148265),
		new google.maps.LatLng(42.678927962016303, 2.888628631550447),
		new google.maps.LatLng(42.678800259858249, 2.888598412712067),
		new google.maps.LatLng(42.678642010198068, 2.888587748943326),
		new google.maps.LatLng(42.678500846570337, 2.888580707560357),
		new google.maps.LatLng(42.678383939697653, 2.888555341556095),
		new google.maps.LatLng(42.678239164307655, 2.888533686113314),
		new google.maps.LatLng(42.678149211645874, 2.888491209737962),
		new google.maps.LatLng(42.678071847616231, 2.888449928504338),
		new google.maps.LatLng(42.677898200681291, 2.888330847145949),
		new google.maps.LatLng(42.677835231432105, 2.888299286565389),
		new google.maps.LatLng(42.67756714012453, 2.888141394151938),
		new google.maps.LatLng(42.676878911635903, 2.887730866752543),
		new google.maps.LatLng(42.676777232705966, 2.88765186110892),
		new google.maps.LatLng(42.676736775258846, 2.887653156962386)
	],
	[
		new google.maps.LatLng(42.64718899819627, 2.893962644361438),
		new google.maps.LatLng(42.647199763588866, 2.893939484612418),
		new google.maps.LatLng(42.647290330401091, 2.893699400144125),
		new google.maps.LatLng(42.647305572786017, 2.893657964407749),
		new google.maps.LatLng(42.647445422865488, 2.893253375115354),
		new google.maps.LatLng(42.64765519093752, 2.892642833486896),
		new google.maps.LatLng(42.64781923838629, 2.892165121613103),
		new google.maps.LatLng(42.648005702866719, 2.891631342010354),
		new google.maps.LatLng(42.648193048418342, 2.891082944073413),
		new google.maps.LatLng(42.648304156510363, 2.890714932100716),
		new google.maps.LatLng(42.648349819096296, 2.890529727209287),
		new google.maps.LatLng(42.648369519547956, 2.890452963335683),
		new google.maps.LatLng(42.648400816986999, 2.890287270335221)
	],
	[
		new google.maps.LatLng(42.681497932928153, 2.892523195142088),
		new google.maps.LatLng(42.681489900178327, 2.892581702083126),
		new google.maps.LatLng(42.681329668697231, 2.893286338113992),
		new google.maps.LatLng(42.681321752516915, 2.893463048038756),
		new google.maps.LatLng(42.681300259338016, 2.893548387537376)
	],
	[
		new google.maps.LatLng(42.681432486570493, 2.893610293197997),
		new google.maps.LatLng(42.681417183955112, 2.893592042402076),
		new google.maps.LatLng(42.681359617142618, 2.893566557758474),
		new google.maps.LatLng(42.681300259338016, 2.893548387537376)
	],
	[
		new google.maps.LatLng(42.681432486570493, 2.893610293197997),
		new google.maps.LatLng(42.681460391196154, 2.893643145011873),
		new google.maps.LatLng(42.681498229974864, 2.893721065488927),
		new google.maps.LatLng(42.681509074613707, 2.89377710078211),
		new google.maps.LatLng(42.68151540082949, 2.893809990900287)
	],
	[
		new google.maps.LatLng(42.68151540082949, 2.893809990900287),
		new google.maps.LatLng(42.681513683622697, 2.893891638588943),
		new google.maps.LatLng(42.681497585388797, 2.893976968974481),
		new google.maps.LatLng(42.681464396031998, 2.894055019648722),
		new google.maps.LatLng(42.681410517423494, 2.894122139828787),
		new google.maps.LatLng(42.681391646209825, 2.894131922510822)
	],
	[
		new google.maps.LatLng(42.646494920540356, 2.89486755510055),
		new google.maps.LatLng(42.646688914345916, 2.89466138633527),
		new google.maps.LatLng(42.646846073363726, 2.894483294513907),
		new google.maps.LatLng(42.646900844466913, 2.894411342293332),
		new google.maps.LatLng(42.647021162843842, 2.894254019207314),
		new google.maps.LatLng(42.647140546965552, 2.894061379031731),
		new google.maps.LatLng(42.64718899819627, 2.893962644361438)
	],
	[
		new google.maps.LatLng(42.681391646209825, 2.894131922510822),
		new google.maps.LatLng(42.681343125012525, 2.894161256702792),
		new google.maps.LatLng(42.681261316301722, 2.894169935185972)
	],
	[
		new google.maps.LatLng(42.681261411841277, 2.896102604648573),
		new google.maps.LatLng(42.681291497765891, 2.895606587845442),
		new google.maps.LatLng(42.68129317973348, 2.895487163892006),
		new google.maps.LatLng(42.681290409795594, 2.895412835409476),
		new google.maps.LatLng(42.68127683113434, 2.895317810252424),
		new google.maps.LatLng(42.681243354697251, 2.895103400187371),
		new google.maps.LatLng(42.681220732940155, 2.894955993726518),
		new google.maps.LatLng(42.681214351710658, 2.894867048900999),
		new google.maps.LatLng(42.681210661963298, 2.894772005970871),
		new google.maps.LatLng(42.681212353201857, 2.894663549066014),
		new google.maps.LatLng(42.681223898945305, 2.894518516500869),
		new google.maps.LatLng(42.681241700480669, 2.894335697805245),
		new google.maps.LatLng(42.681261316301722, 2.894169935185972)
	],
	[
		new google.maps.LatLng(42.646494920540356, 2.89486755510055),
		new google.maps.LatLng(42.64631888845264, 2.895054203541306),
		new google.maps.LatLng(42.646276671417581, 2.895093251024495),
		new google.maps.LatLng(42.646151820299117, 2.895212824205894),
		new google.maps.LatLng(42.645901243831389, 2.895478763798079),
		new google.maps.LatLng(42.645621966206647, 2.895815387562692),
		new google.maps.LatLng(42.64555820327994, 2.895887354591857),
		new google.maps.LatLng(42.645307637238318, 2.896165466506261),
		new google.maps.LatLng(42.644970868437753, 2.89655455212616),
		new google.maps.LatLng(42.644894526197866, 2.896635063853944),
		new google.maps.LatLng(42.644720287709916, 2.896819262997768),
		new google.maps.LatLng(42.644597234797011, 2.896941261963455),
		new google.maps.LatLng(42.644529872396213, 2.89701079737368)
	],
	[
		new google.maps.LatLng(42.681209510513156, 2.896356162240064),
		new google.maps.LatLng(42.68123193248676, 2.896298848496781),
		new google.maps.LatLng(42.681242668561239, 2.896243993404894),
		new google.maps.LatLng(42.681253385031077, 2.896169641138138),
		new google.maps.LatLng(42.681261411841277, 2.896102604648573)
	],
	[
		new google.maps.LatLng(42.68107651662816, 2.896429513207988),
		new google.maps.LatLng(42.681139436573211, 2.89641234150526),
		new google.maps.LatLng(42.681177181609392, 2.896395214287797),
		new google.maps.LatLng(42.681209510513156, 2.896356162240064)
	],
	[
		new google.maps.LatLng(42.680865329866535, 2.896531030226875),
		new google.maps.LatLng(42.680893183543304, 2.896512701943521),
		new google.maps.LatLng(42.680970461495157, 2.896467477870452),
		new google.maps.LatLng(42.68107651662816, 2.896429513207988)
	],
	[
		new google.maps.LatLng(42.679458631327833, 2.898797581956413),
		new google.maps.LatLng(42.679490887187612, 2.898680545830969),
		new google.maps.LatLng(42.679510604656443, 2.898614710154251),
		new google.maps.LatLng(42.679549144278106, 2.898486695687329),
		new google.maps.LatLng(42.679599350467115, 2.898336727416577),
		new google.maps.LatLng(42.679652271973204, 2.898206249906794),
		new google.maps.LatLng(42.679702532657707, 2.898113553464953),
		new google.maps.LatLng(42.679767162360733, 2.898003770703969),
		new google.maps.LatLng(42.679902753068426, 2.89782440528936),
		new google.maps.LatLng(42.68004014021956, 2.897643818411553),
		new google.maps.LatLng(42.680181115945146, 2.897454694695348),
		new google.maps.LatLng(42.680284369068161, 2.897307066721275),
		new google.maps.LatLng(42.680458525975411, 2.897030145925256),
		new google.maps.LatLng(42.68059858184823, 2.89682152286327),
		new google.maps.LatLng(42.680680277487852, 2.896695866112017),
		new google.maps.LatLng(42.680743144100305, 2.896623858190797),
		new google.maps.LatLng(42.680820402585717, 2.896559137345992),
		new google.maps.LatLng(42.680865329866535, 2.896531030226875)
	],
	[
		new google.maps.LatLng(42.644271214020748, 2.897290131763881),
		new google.maps.LatLng(42.644292768853639, 2.89726695581105),
		new google.maps.LatLng(42.644508315412324, 2.897031538260513),
		new google.maps.LatLng(42.644529872396213, 2.89701079737368)
	],
	[
		new google.maps.LatLng(42.643965113704901, 2.897788751534426),
		new google.maps.LatLng(42.644019848978154, 2.897676617667091),
		new google.maps.LatLng(42.644100608119537, 2.897514508013026),
		new google.maps.LatLng(42.644184096576211, 2.897385274573317),
		new google.maps.LatLng(42.644271214020748, 2.897290131763881)
	],
	[
		new google.maps.LatLng(42.642800060081385, 2.900780437448503),
		new google.maps.LatLng(42.64284755342284, 2.900611086447781),
		new google.maps.LatLng(42.642959636059388, 2.900290618246332),
		new google.maps.LatLng(42.643087009794655, 2.899977429797573),
		new google.maps.LatLng(42.64321438069355, 2.899663023077055),
		new google.maps.LatLng(42.643336366935884, 2.899359584036879),
		new google.maps.LatLng(42.643471803203717, 2.899019586496113),
		new google.maps.LatLng(42.643656555441694, 2.898540672888941),
		new google.maps.LatLng(42.643807236366932, 2.898161674726461),
		new google.maps.LatLng(42.643891564751542, 2.897970332836289),
		new google.maps.LatLng(42.643939989162369, 2.897839943639506),
		new google.maps.LatLng(42.643965113704901, 2.897788751534426)
	],
	[
		new google.maps.LatLng(42.678978521055804, 2.900718825057722),
		new google.maps.LatLng(42.678994606264588, 2.90061278453224),
		new google.maps.LatLng(42.679078758532278, 2.900223928686121),
		new google.maps.LatLng(42.679182653175964, 2.899797262061198),
		new google.maps.LatLng(42.679278523766314, 2.899443721289652),
		new google.maps.LatLng(42.679342142369947, 2.899213307257573),
		new google.maps.LatLng(42.679458631327833, 2.898797581956413)
	],
	[
		new google.maps.LatLng(42.678978521055804, 2.900718825057722),
		new google.maps.LatLng(42.678940086875365, 2.900962596633583),
		new google.maps.LatLng(42.678905301254019, 2.901264851437065),
		new google.maps.LatLng(42.678892825548388, 2.901385507924716),
		new google.maps.LatLng(42.678884797735286, 2.901454977762782),
		new google.maps.LatLng(42.678871488039803, 2.901646309016026),
		new google.maps.LatLng(42.678869892229088, 2.901866866902016),
		new google.maps.LatLng(42.678882759089376, 2.902172696268607),
		new google.maps.LatLng(42.678898292326465, 2.90244562077925),
		new google.maps.LatLng(42.678908266267747, 2.902536994001333),
		new google.maps.LatLng(42.678928243077074, 2.902753860200206),
		new google.maps.LatLng(42.678955327162321, 2.902876886163663),
		new google.maps.LatLng(42.678977855392503, 2.902932901236242),
		new google.maps.LatLng(42.679011181672081, 2.902999864771749),
		new google.maps.LatLng(42.679049002780857, 2.903065602438027),
		new google.maps.LatLng(42.6790886123432, 2.903120370833891),
		new google.maps.LatLng(42.679133614173296, 2.903172693048988),
		new google.maps.LatLng(42.679175009212301, 2.903214054400157),
		new google.maps.LatLng(42.679224491645201, 2.90325052874177),
		new google.maps.LatLng(42.679255078390341, 2.903269975118272),
		new google.maps.LatLng(42.67930365212893, 2.903295483155406),
		new google.maps.LatLng(42.679358510412619, 2.903311233745068),
		new google.maps.LatLng(42.679425954079989, 2.903324525674959),
		new google.maps.LatLng(42.679499687469182, 2.903334151062339),
		new google.maps.LatLng(42.679655244760923, 2.903352171587279)
	],
	[
		new google.maps.LatLng(42.640710311894431, 2.905351713291589),
		new google.maps.LatLng(42.640704896464264, 2.905328585079005),
		new google.maps.LatLng(42.640670487619275, 2.905052215753823),
		new google.maps.LatLng(42.640664894347857, 2.904828161329131),
		new google.maps.LatLng(42.640663937384147, 2.90476362360545),
		new google.maps.LatLng(42.640679913020605, 2.904531010145961),
		new google.maps.LatLng(42.640716564296817, 2.904295927126831),
		new google.maps.LatLng(42.640737154055856, 2.904197257385483),
		new google.maps.LatLng(42.64075057589573, 2.904125388414452),
		new google.maps.LatLng(42.640800768457161, 2.903953606297625),
		new google.maps.LatLng(42.640859953753299, 2.903784242616823),
		new google.maps.LatLng(42.640980199251004, 2.903531972961981),
		new google.maps.LatLng(42.641033164970132, 2.903445425253735),
		new google.maps.LatLng(42.641097802335736, 2.903340592814136),
		new google.maps.LatLng(42.641147193859119, 2.903278405162591),
		new google.maps.LatLng(42.641234300978724, 2.903167446432928),
		new google.maps.LatLng(42.64142204805745, 2.902996649383808),
		new google.maps.LatLng(42.641601710445478, 2.902833171804623),
		new google.maps.LatLng(42.641848753060003, 2.90261721672989),
		new google.maps.LatLng(42.642075112922321, 2.902396424616235),
		new google.maps.LatLng(42.642098465580247, 2.902372030244482),
		new google.maps.LatLng(42.642234975006197, 2.902211055927642),
		new google.maps.LatLng(42.642386663238668, 2.901936804130616),
		new google.maps.LatLng(42.642525717153411, 2.90161020695679),
		new google.maps.LatLng(42.642669203579068, 2.901217841782987),
		new google.maps.LatLng(42.642755256099441, 2.900940043181137)
	],
	[
		new google.maps.LatLng(42.679866549338776, 2.90337375475984),
		new google.maps.LatLng(42.679782924648357, 2.903362926982848),
		new google.maps.LatLng(42.679655244760923, 2.903352171587279)
	],
	[
		new google.maps.LatLng(42.679866549338776, 2.90337375475984),
		new google.maps.LatLng(42.679902620565727, 2.903493113296892),
		new google.maps.LatLng(42.679908094663958, 2.903580839599369),
		new google.maps.LatLng(42.67990095469235, 2.903639342209431)
	],
	[
		new google.maps.LatLng(42.679603624507919, 2.903937159424036),
		new google.maps.LatLng(42.679732079226341, 2.903809000008034),
		new google.maps.LatLng(42.67990095469235, 2.903639342209431)
	],
	[
		new google.maps.LatLng(42.679263153849682, 2.904252104039263),
		new google.maps.LatLng(42.679355692090631, 2.904176402813244),
		new google.maps.LatLng(42.679467082074368, 2.90406898758705),
		new google.maps.LatLng(42.679543438118209, 2.903994529824425),
		new google.maps.LatLng(42.679603624507919, 2.903937159424036)
	],
	[
		new google.maps.LatLng(42.678645906228688, 2.904725906897951),
		new google.maps.LatLng(42.678754627889859, 2.904650179799042),
		new google.maps.LatLng(42.678851665489525, 2.904579346054664),
		new google.maps.LatLng(42.678962184752905, 2.90450239798749),
		new google.maps.LatLng(42.67907628847744, 2.904413257432848),
		new google.maps.LatLng(42.679184102375494, 2.90432778300271),
		new google.maps.LatLng(42.679263153849682, 2.904252104039263)
	],
	[
		new google.maps.LatLng(42.673192055021403, 2.904699490362045),
		new google.maps.LatLng(42.673273858705087, 2.90468595415915),
		new google.maps.LatLng(42.673501296735061, 2.904652684580481),
		new google.maps.LatLng(42.673591192985732, 2.904640353384263),
		new google.maps.LatLng(42.673643334652581, 2.904634175486196),
		new google.maps.LatLng(42.67375391285789, 2.904624247589704),
		new google.maps.LatLng(42.673886973003171, 2.90462037423747),
		new google.maps.LatLng(42.673984075490523, 2.904622652698431),
		new google.maps.LatLng(42.67410815480504, 2.90462976004111),
		new google.maps.LatLng(42.674183683896331, 2.90463694697999),
		new google.maps.LatLng(42.674293383026807, 2.904650170587331),
		new google.maps.LatLng(42.674437260114097, 2.90467674017326)
	],
	[
		new google.maps.LatLng(42.674437260114097, 2.90467674017326),
		new google.maps.LatLng(42.674520889814644, 2.904693661676341),
		new google.maps.LatLng(42.674643190553802, 2.904722704715136),
		new google.maps.LatLng(42.674698048778232, 2.904739672989969),
		new google.maps.LatLng(42.674763699576175, 2.904759059928306),
		new google.maps.LatLng(42.674864423958795, 2.904790575229341),
		new google.maps.LatLng(42.674988540590029, 2.904839111047813)
	],
	[
		new google.maps.LatLng(42.672024314996463, 2.904882940183403),
		new google.maps.LatLng(42.672246352743656, 2.904843588835192),
		new google.maps.LatLng(42.672496261803175, 2.904805410748729),
		new google.maps.LatLng(42.672755161641817, 2.904765998534155),
		new google.maps.LatLng(42.673075191112972, 2.904717958038853),
		new google.maps.LatLng(42.673192055021403, 2.904699490362045)
	],
	[
		new google.maps.LatLng(42.678617149824191, 2.904741794403998),
		new google.maps.LatLng(42.678645906228688, 2.904725906897951)
	],
	[
		new google.maps.LatLng(42.678288238834789, 2.904914143617778),
		new google.maps.LatLng(42.67833047711099, 2.904893359999603),
		new google.maps.LatLng(42.678430233200615, 2.904845674724603),
		new google.maps.LatLng(42.678537171388271, 2.90478701058737),
		new google.maps.LatLng(42.678617149824191, 2.904741794403998)
	],
	[
		new google.maps.LatLng(42.668631158060052, 2.904836090622234),
		new google.maps.LatLng(42.668570020233666, 2.904834973082586),
		new google.maps.LatLng(42.66845404250347, 2.904838816981381),
		new google.maps.LatLng(42.668358751824684, 2.904851155147163),
		new google.maps.LatLng(42.668270652322249, 2.90486226475943),
		new google.maps.LatLng(42.668154699803068, 2.904894130062191)
	],
	[
		new google.maps.LatLng(42.669918809569879, 2.905032578346304),
		new google.maps.LatLng(42.669856770471355, 2.905030242019002),
		new google.maps.LatLng(42.669823502852232, 2.905027860400183),
		new google.maps.LatLng(42.669748874138492, 2.905021889620352),
		new google.maps.LatLng(42.669663454649616, 2.9050135003726),
		new google.maps.LatLng(42.669618497909028, 2.905009919173641),
		new google.maps.LatLng(42.669470122670106, 2.904978484098672),
		new google.maps.LatLng(42.669389190165759, 2.904961559455188),
		new google.maps.LatLng(42.669336132827944, 2.904948244619235),
		new google.maps.LatLng(42.669292068440988, 2.904937351016706),
		new google.maps.LatLng(42.669211133777061, 2.904916771542795),
		new google.maps.LatLng(42.669124801801765, 2.904893764188278),
		new google.maps.LatLng(42.669057359164988, 2.904880472758447),
		new google.maps.LatLng(42.668963840077545, 2.904863568890534),
		new google.maps.LatLng(42.668855936596941, 2.904846688371229),
		new google.maps.LatLng(42.668773214275326, 2.904838295345596),
		new google.maps.LatLng(42.6686860010171, 2.904834782849853),
		new google.maps.LatLng(42.668631158060052, 2.904836090622234)
	],
	[
		new google.maps.LatLng(42.674988540590029, 2.904839111047813),
		new google.maps.LatLng(42.675115363543426, 2.904898607540775),
		new google.maps.LatLng(42.675221497279175, 2.904945953729696),
		new google.maps.LatLng(42.675380697336315, 2.905016364508039),
		new google.maps.LatLng(42.675519202197357, 2.905068533235263),
		new google.maps.LatLng(42.675674787468878, 2.90511823714082),
		new google.maps.LatLng(42.675840262090979, 2.905167923726804),
		new google.maps.LatLng(42.675996734618188, 2.905204224290071),
		new google.maps.LatLng(42.676123531119757, 2.905233260934287)
	],
	[
		new google.maps.LatLng(42.671818448130232, 2.904907643649457),
		new google.maps.LatLng(42.671896659253733, 2.904897768627116),
		new google.maps.LatLng(42.672024314996463, 2.904882940183403)
	],
	[
		new google.maps.LatLng(42.668154699803068, 2.904894130062191),
		new google.maps.LatLng(42.668068413146848, 2.904921072527316),
		new google.maps.LatLng(42.667996505789567, 2.904941901837153)
	],
	[
		new google.maps.LatLng(42.670744129720845, 2.904997119542854),
		new google.maps.LatLng(42.670770203110791, 2.904997075926508),
		new google.maps.LatLng(42.671038114191468, 2.904980800811931),
		new google.maps.LatLng(42.671329401585034, 2.904965704821243),
		new google.maps.LatLng(42.671612585325327, 2.904937220788602),
		new google.maps.LatLng(42.671774398896339, 2.904913807503101),
		new google.maps.LatLng(42.671818448130232, 2.904907643649457)
	],
	[
		new google.maps.LatLng(42.678213646674457, 2.904950820030602),
		new google.maps.LatLng(42.678288238834789, 2.904914143617778)
	],
	[
		new google.maps.LatLng(42.667996505789567, 2.904941901837153),
		new google.maps.LatLng(42.667976730195839, 2.904946806936326),
		new google.maps.LatLng(42.667867081436576, 2.904989626838733),
		new google.maps.LatLng(42.667769115799622, 2.905027553931887),
		new google.maps.LatLng(42.667667565676069, 2.905078887085904),
		new google.maps.LatLng(42.667556136185745, 2.905141202144786),
		new google.maps.LatLng(42.667462679596646, 2.905194958708115),
		new google.maps.LatLng(42.66738270181343, 2.905240166170153),
		new google.maps.LatLng(42.667352148502886, 2.905257271979428),
		new google.maps.LatLng(42.667300031779632, 2.905290249913159),
		new google.maps.LatLng(42.667224542888036, 2.90532813942173),
		new google.maps.LatLng(42.667165228997355, 2.905356257160367)
	],
	[
		new google.maps.LatLng(42.677744489253172, 2.905135580299406),
		new google.maps.LatLng(42.677850549219592, 2.905098852549242),
		new google.maps.LatLng(42.677938629495372, 2.905065808881669),
		new google.maps.LatLng(42.6780258133331, 2.905035204277512),
		new google.maps.LatLng(42.678121980957108, 2.904996054782499),
		new google.maps.LatLng(42.678213646674457, 2.904950820030602)
	],
	[
		new google.maps.LatLng(42.670638042283336, 2.905000946897387),
		new google.maps.LatLng(42.670744129720845, 2.904997119542854)
	],
	[
		new google.maps.LatLng(42.670284721756538, 2.905019798697039),
		new google.maps.LatLng(42.670419575707179, 2.905011049912363),
		new google.maps.LatLng(42.670463629017583, 2.905009760009448),
		new google.maps.LatLng(42.670481609836642, 2.905008512494706),
		new google.maps.LatLng(42.670638042283336, 2.905000946897387)
	],
	[
		new google.maps.LatLng(42.670052765180024, 2.905025049752641),
		new google.maps.LatLng(42.670161554890434, 2.905027309582328),
		new google.maps.LatLng(42.670284721756538, 2.905019798697039)
	],
	[
		new google.maps.LatLng(42.67000520210977, 2.90512503199043),
		new google.maps.LatLng(42.670015984758919, 2.905117704301957),
		new google.maps.LatLng(42.670029462561494, 2.905107935016099),
		new google.maps.LatLng(42.670042930322722, 2.90508720200614),
		new google.maps.LatLng(42.670051889976953, 2.905051854728001),
		new google.maps.LatLng(42.670052765180024, 2.905025049752641)
	],
	[
		new google.maps.LatLng(42.669918809569879, 2.905032578346304),
		new google.maps.LatLng(42.66991972417545, 2.905050851834365),
		new google.maps.LatLng(42.669920632566054, 2.905060596644153),
		new google.maps.LatLng(42.669927847895416, 2.905086170442729),
		new google.maps.LatLng(42.669941351989635, 2.905106860909439),
		new google.maps.LatLng(42.669961146766177, 2.905123885558164),
		new google.maps.LatLng(42.669985426395726, 2.905128718456412),
		new google.maps.LatLng(42.67000520210977, 2.90512503199043)
	],
	[
		new google.maps.LatLng(42.677158403132232, 2.905265695059786),
		new google.maps.LatLng(42.677272569909945, 2.905247232542031),
		new google.maps.LatLng(42.677379540435396, 2.905223906661619),
		new google.maps.LatLng(42.677503591504973, 2.905199334476892),
		new google.maps.LatLng(42.677619547858455, 2.905169902701105),
		new google.maps.LatLng(42.677744489253172, 2.905135580299406)
	],
	[
		new google.maps.LatLng(42.676123531119757, 2.905233260934287),
		new google.maps.LatLng(42.676163996880824, 2.905241723737897),
		new google.maps.LatLng(42.676285391006076, 2.90526224044889),
		new google.maps.LatLng(42.676467022425086, 2.905281441456406),
		new google.maps.LatLng(42.676569520147908, 2.905283711583861)
	],
	[
		new google.maps.LatLng(42.676939042461292, 2.905283110354265),
		new google.maps.LatLng(42.677034339093666, 2.905276863057752),
		new google.maps.LatLng(42.677046925539315, 2.90527562495163),
		new google.maps.LatLng(42.677139525886588, 2.905269381753363),
		new google.maps.LatLng(42.677158403132232, 2.905265695059786)
	],
	[
		new google.maps.LatLng(42.676569520147908, 2.905283711583861),
		new google.maps.LatLng(42.676614474829286, 2.905284856877742)
	],
	[
		new google.maps.LatLng(42.676614474829286, 2.905284856877742),
		new google.maps.LatLng(42.676728663689126, 2.905290763312243),
		new google.maps.LatLng(42.676846441098903, 2.905288135864805),
		new google.maps.LatLng(42.676883302199784, 2.905286857014214)
	],
	[
		new google.maps.LatLng(42.676883302199784, 2.905286857014214),
		new google.maps.LatLng(42.676939042461292, 2.905283110354265)
	],
	[
		new google.maps.LatLng(42.640710311894431, 2.905351713291589),
		new google.maps.LatLng(42.6407590482942, 2.905564737589788),
		new google.maps.LatLng(42.640856421774338, 2.90587753733963),
		new google.maps.LatLng(42.641024051047566, 2.906340008767451),
		new google.maps.LatLng(42.641070028680168, 2.906483628016949)
	],
	[
		new google.maps.LatLng(42.667165228997355, 2.905356257160367),
		new google.maps.LatLng(42.667138270191167, 2.905370920010278),
		new google.maps.LatLng(42.667049298378565, 2.905412485921482),
		new google.maps.LatLng(42.666965716874991, 2.905449170014913),
		new google.maps.LatLng(42.666860557870962, 2.905485889343737),
		new google.maps.LatLng(42.666747304373274, 2.905520184762524),
		new google.maps.LatLng(42.666611579967153, 2.905560607625237),
		new google.maps.LatLng(42.666359890684035, 2.905618274256267),
		new google.maps.LatLng(42.666057860357135, 2.905684550044143),
		new google.maps.LatLng(42.665812463726041, 2.905740986218293),
		new google.maps.LatLng(42.665683916411702, 2.905764342089917),
		new google.maps.LatLng(42.665574242335616, 2.905779137435349)
	],
	[
		new google.maps.LatLng(42.663076609143864, 2.906790628193742),
		new google.maps.LatLng(42.663146692293203, 2.906739351416946),
		new google.maps.LatLng(42.663191624242465, 2.906714915484655),
		new google.maps.LatLng(42.663241045206135, 2.906683163593015),
		new google.maps.LatLng(42.663285967152682, 2.906646545235601),
		new google.maps.LatLng(42.663339876111039, 2.906606257478602),
		new google.maps.LatLng(42.663490791233336, 2.906458612955973),
		new google.maps.LatLng(42.663544685202083, 2.906401270522438),
		new google.maps.LatLng(42.663606667694545, 2.906340259945617),
		new google.maps.LatLng(42.663658771802609, 2.906292666443722),
		new google.maps.LatLng(42.663720764167635, 2.90624261946808),
		new google.maps.LatLng(42.663933699135306, 2.90607781738969),
		new google.maps.LatLng(42.66398849327895, 2.906021691466736),
		new google.maps.LatLng(42.66405678227818, 2.905975289036533),
		new google.maps.LatLng(42.664123274546597, 2.905931325247713),
		new google.maps.LatLng(42.664197860264878, 2.905888566479445),
		new google.maps.LatLng(42.664263459075755, 2.905850695741475),
		new google.maps.LatLng(42.664330856706449, 2.9058140408134),
		new google.maps.LatLng(42.664391071093561, 2.905787142053852),
		new google.maps.LatLng(42.664553773519515, 2.905753987005735)
	],
	[
		new google.maps.LatLng(42.664687745259826, 2.905764733944709),
		new google.maps.LatLng(42.664658975678925, 2.905765998741243),
		new google.maps.LatLng(42.664553773519515, 2.905753987005735)
	],
	[
		new google.maps.LatLng(42.665179546131647, 2.905774902956569),
		new google.maps.LatLng(42.665074352944835, 2.905772636530601),
		new google.maps.LatLng(42.664908020014359, 2.905768033086225),
		new google.maps.LatLng(42.664770458570459, 2.905763382275634),
		new google.maps.LatLng(42.664687745259826, 2.905764733944709)
	],
	[
		new google.maps.LatLng(42.665498926186217, 2.90601316355276),
		new google.maps.LatLng(42.665459399724092, 2.906049775500398),
		new google.maps.LatLng(42.665423449003939, 2.906064452488834),
		new google.maps.LatLng(42.665380293017137, 2.906063304111104),
		new google.maps.LatLng(42.665337132108178, 2.906057282392243),
		new google.maps.LatLng(42.665297559808721, 2.906042727191605),
		new google.maps.LatLng(42.66525706702177, 2.906002589264558),
		new google.maps.LatLng(42.665219270507926, 2.905962448520126),
		new google.maps.LatLng(42.665193146083531, 2.905904015397711),
		new google.maps.LatLng(42.665176912019227, 2.905846783504302),
		new google.maps.LatLng(42.665179546131647, 2.905774902956569)
	],
	[
		new google.maps.LatLng(42.665574242335616, 2.905779137435349),
		new google.maps.LatLng(42.665564427, 2.905863213375592),
		new google.maps.LatLng(42.665553685271433, 2.905916834284449),
		new google.maps.LatLng(42.665535746394276, 2.9059655927244),
		new google.maps.LatLng(42.665498926186217, 2.90601316355276)
	],
	[
		new google.maps.LatLng(42.658444347806913, 2.906491074221139),
		new google.maps.LatLng(42.658395791522878, 2.90648384372886),
		new google.maps.LatLng(42.658138578823404, 2.906392898960948),
		new google.maps.LatLng(42.657887635817737, 2.906273928601271),
		new google.maps.LatLng(42.657602479794868, 2.906100200867539),
		new google.maps.LatLng(42.657352422967442, 2.905967832914383),
		new google.maps.LatLng(42.657205828463979, 2.905914473694313),
		new google.maps.LatLng(42.657188743960688, 2.905912066311509),
		new google.maps.LatLng(42.657116815326681, 2.905908527329063),
		new google.maps.LatLng(42.65701884316087, 2.905937919490558)
	],
	[
		new google.maps.LatLng(42.65701884316087, 2.905937919490558),
		new google.maps.LatLng(42.656963119587445, 2.905958716925264),
		new google.maps.LatLng(42.656946043029215, 2.90596483521168),
		new google.maps.LatLng(42.656917283385923, 2.905977061156858)
	],
	[
		new google.maps.LatLng(42.656917283385923, 2.905977061156858),
		new google.maps.LatLng(42.656866960217208, 2.906005158752175),
		new google.maps.LatLng(42.6566728624747, 2.906118751377391),
		new google.maps.LatLng(42.656285579136544, 2.906362987961712),
		new google.maps.LatLng(42.655967487902359, 2.90656569457696),
		new google.maps.LatLng(42.655810234979178, 2.906660955179121)
	],
	[
		new google.maps.LatLng(42.641070028680168, 2.906483628016949),
		new google.maps.LatLng(42.641112400681848, 2.906617511233085),
		new google.maps.LatLng(42.641173741047758, 2.906852437453306),
		new google.maps.LatLng(42.641185467850107, 2.906897474984514),
		new google.maps.LatLng(42.641227134459704, 2.907254207851474),
		new google.maps.LatLng(42.641232796733149, 2.907563505751964),
		new google.maps.LatLng(42.641219460121768, 2.907736447039433),
		new google.maps.LatLng(42.641207918117161, 2.907905731082347),
		new google.maps.LatLng(42.641195383404664, 2.907965420422324),
		new google.maps.LatLng(42.641138974151119, 2.908234631241141),
		new google.maps.LatLng(42.641055612752055, 2.908527020373845),
		new google.maps.LatLng(42.640912042076216, 2.908852381524688),
		new google.maps.LatLng(42.64086716284227, 2.90893769318701)
	],
	[
		new google.maps.LatLng(42.655767826449654, 2.906486842235363),
		new google.maps.LatLng(42.655654571357978, 2.906517474336122),
		new google.maps.LatLng(42.655536827244518, 2.906555422569865),
		new google.maps.LatLng(42.654947300286096, 2.906852349989566),
		new google.maps.LatLng(42.654866421219829, 2.906893892231734),
		new google.maps.LatLng(42.65433889410162, 2.907150518457415),
		new google.maps.LatLng(42.654238242192235, 2.907200617246984),
		new google.maps.LatLng(42.653782609463171, 2.907421801801568),
		new google.maps.LatLng(42.653655901649174, 2.907491429527655)
	],
	[
		new google.maps.LatLng(42.655767826449654, 2.906486842235363),
		new google.maps.LatLng(42.655810234979178, 2.906660955179121)
	],
	[
		new google.maps.LatLng(42.660383166829376, 2.906984966607126),
		new google.maps.LatLng(42.660019828307199, 2.906852769088891),
		new google.maps.LatLng(42.659893915376571, 2.906803027561859),
		new google.maps.LatLng(42.659554810554177, 2.906623286468638),
		new google.maps.LatLng(42.659313791015443, 2.906543276850643),
		new google.maps.LatLng(42.65917441491704, 2.906520355753092),
		new google.maps.LatLng(42.659089893734759, 2.906509528697745),
		new google.maps.LatLng(42.65886512889923, 2.906512325358482),
		new google.maps.LatLng(42.658599907144549, 2.906515186654187),
		new google.maps.LatLng(42.658444347806913, 2.906491074221139)
	],
	[
		new google.maps.LatLng(42.662768347520291, 2.906927559280294),
		new google.maps.LatLng(42.662825884819021, 2.906923812250779),
		new google.maps.LatLng(42.662886994947925, 2.906893259314131),
		new google.maps.LatLng(42.662956192642142, 2.906857821005286),
		new google.maps.LatLng(42.663019998943334, 2.906826046510485),
		new google.maps.LatLng(42.663076609143864, 2.906790628193742)
	],
	[
		new google.maps.LatLng(42.662768347520291, 2.906927559280294),
		new google.maps.LatLng(42.662757614245969, 2.906992140019958),
		new google.maps.LatLng(42.66272531329269, 2.907067720388475)
	],
	[
		new google.maps.LatLng(42.660383166829376, 2.906984966607126),
		new google.maps.LatLng(42.660438024774592, 2.90700193298104),
		new google.maps.LatLng(42.660491078021167, 2.907011593247468)
	],
	[
		new google.maps.LatLng(42.660491078021167, 2.907011593247468),
		new google.maps.LatLng(42.660525248964902, 2.907018847189373),
		new google.maps.LatLng(42.660640348369093, 2.907040591412122),
		new google.maps.LatLng(42.660738368169518, 2.907064797200773),
		new google.maps.LatLng(42.660929913830017, 2.907115654071475),
		new google.maps.LatLng(42.661181710762648, 2.907182252578273),
		new google.maps.LatLng(42.661309393630113, 2.907199103028722),
		new google.maps.LatLng(42.661363342339698, 2.907205107786072),
		new google.maps.LatLng(42.661431668403019, 2.907201344951728),
		new google.maps.LatLng(42.661497293305352, 2.907192713103722),
		new google.maps.LatLng(42.661553919429018, 2.90717556839085),
		new google.maps.LatLng(42.661639308197728, 2.907148633239481),
		new google.maps.LatLng(42.661787605064589, 2.907092360473724),
		new google.maps.LatLng(42.662043771379793, 2.907012770286782)
	],
	[
		new google.maps.LatLng(42.662043771379793, 2.907012770286782),
		new google.maps.LatLng(42.662113908099705, 2.907023622553903),
		new google.maps.LatLng(42.662364783917333, 2.907064640392608)
	],
	[
		new google.maps.LatLng(42.662364783917333, 2.907064640392608),
		new google.maps.LatLng(42.662401678699879, 2.90710234536163)
	],
	[
		new google.maps.LatLng(42.662612108510871, 2.90715682876097),
		new google.maps.LatLng(42.662685802293659, 2.907122601539014),
		new google.maps.LatLng(42.66272531329269, 2.907067720388475)
	],
	[
		new google.maps.LatLng(42.662401678699879, 2.90710234536163),
		new google.maps.LatLng(42.662443960980085, 2.90713273201275),
		new google.maps.LatLng(42.662489832847257, 2.907154586884419),
		new google.maps.LatLng(42.66255367283398, 2.907161794274545),
		new google.maps.LatLng(42.662612108510871, 2.90715682876097)
	],
	[
		new google.maps.LatLng(42.653655901649174, 2.907491429527655),
		new google.maps.LatLng(42.653513917847199, 2.907569607392039),
		new google.maps.LatLng(42.653290156336702, 2.907691761976769),
		new google.maps.LatLng(42.652994484581129, 2.907829862999821),
		new google.maps.LatLng(42.652817441026713, 2.907912966126814),
		new google.maps.LatLng(42.652362728756891, 2.908160933782108),
		new google.maps.LatLng(42.651946676921732, 2.908410054200464),
		new google.maps.LatLng(42.651787612832592, 2.90849068976348)
	],
	[
		new google.maps.LatLng(42.651787612832592, 2.90849068976348),
		new google.maps.LatLng(42.651653712142327, 2.9085603236706),
		new google.maps.LatLng(42.651460504299919, 2.908665371285343),
		new google.maps.LatLng(42.651446125833139, 2.908673919829084)
	],
	[
		new google.maps.LatLng(42.651254714732644, 2.908777745729401),
		new google.maps.LatLng(42.651340086515425, 2.908731329502802),
		new google.maps.LatLng(42.651446125833139, 2.908673919829084)
	],
	[
		new google.maps.LatLng(42.649072790404134, 2.909947915846896),
		new google.maps.LatLng(42.649449331518113, 2.909752467942938),
		new google.maps.LatLng(42.649638047309189, 2.909649870335968),
		new google.maps.LatLng(42.649719824839615, 2.909605898430912),
		new google.maps.LatLng(42.650111634647971, 2.909393370959148),
		new google.maps.LatLng(42.650487274447272, 2.909196699381726),
		new google.maps.LatLng(42.650508842314935, 2.909185703861334),
		new google.maps.LatLng(42.650606792173406, 2.909129527160758),
		new google.maps.LatLng(42.650855711052735, 2.908987857290858),
		new google.maps.LatLng(42.651080376356639, 2.908870583081637),
		new google.maps.LatLng(42.651147775022928, 2.908833939227946),
		new google.maps.LatLng(42.651232982496438, 2.908789164961683),
		new google.maps.LatLng(42.651254714732644, 2.908777745729401)
	],
	[
		new google.maps.LatLng(42.639428251168383, 2.911639595351235),
		new google.maps.LatLng(42.639597002066552, 2.911312994306671),
		new google.maps.LatLng(42.639763052926973, 2.910983957859229),
		new google.maps.LatLng(42.639808829248565, 2.910893777784975),
		new google.maps.LatLng(42.640037699236295, 2.910429477052625),
		new google.maps.LatLng(42.640296239319461, 2.909968779395601),
		new google.maps.LatLng(42.640440764557738, 2.909705527761214),
		new google.maps.LatLng(42.640576312714366, 2.909459336092429),
		new google.maps.LatLng(42.640735207583724, 2.909179010474292),
		new google.maps.LatLng(42.640827664440792, 2.9090083825607)
	],
	[
		new google.maps.LatLng(42.649072790404134, 2.909947915846896),
		new google.maps.LatLng(42.648724119244378, 2.910142101459677),
		new google.maps.LatLng(42.648206491896332, 2.910415706848952),
		new google.maps.LatLng(42.647838045907633, 2.910616005894551)
	],
	[
		new google.maps.LatLng(42.647838045907633, 2.910616005894551),
		new google.maps.LatLng(42.647613372066324, 2.910724740819488),
		new google.maps.LatLng(42.647513599754909, 2.910751686872767)
	],
	[
		new google.maps.LatLng(42.647513599754909, 2.910751686872767),
		new google.maps.LatLng(42.647092038378617, 2.910866812222251),
		new google.maps.LatLng(42.646024216253807, 2.91117534184027),
		new google.maps.LatLng(42.644854815302175, 2.911501063606891),
		new google.maps.LatLng(42.643966766031312, 2.911763020650028),
		new google.maps.LatLng(42.643732213810502, 2.911885155406304),
		new google.maps.LatLng(42.643627084389003, 2.911957164867135),
		new google.maps.LatLng(42.643571369041297, 2.911988911444591),
		new google.maps.LatLng(42.643482404895558, 2.912040192879165),
		new google.maps.LatLng(42.642673691867088, 2.912569927592667),
		new google.maps.LatLng(42.641891052594232, 2.913104478586023),
		new google.maps.LatLng(42.641658324525551, 2.913260698393465),
		new google.maps.LatLng(42.641509157361966, 2.913353468733389),
		new google.maps.LatLng(42.641303354638531, 2.913452412171131),
		new google.maps.LatLng(42.64126650994389, 2.913471950637239),
		new google.maps.LatLng(42.640723707536587, 2.913750400533808),
		new google.maps.LatLng(42.6404136584136, 2.913903075160931),
		new google.maps.LatLng(42.640235715470283, 2.913989796126073),
		new google.maps.LatLng(42.640018250646825, 2.91412041236707),
		new google.maps.LatLng(42.639813429084853, 2.914322854918484)
	],
	[
		new google.maps.LatLng(42.639428251168383, 2.911639595351235),
		new google.maps.LatLng(42.639331336765849, 2.911861365056108),
		new google.maps.LatLng(42.639153688910383, 2.91230487706854),
		new google.maps.LatLng(42.63907031516937, 2.91259481390259),
		new google.maps.LatLng(42.638994169187555, 2.912929795790818),
		new google.maps.LatLng(42.638908225412976, 2.913379253891613),
		new google.maps.LatLng(42.638760384275621, 2.914001713717763),
		new google.maps.LatLng(42.638608926728168, 2.914602257974963),
		new google.maps.LatLng(42.638556986770368, 2.91485926665219),
		new google.maps.LatLng(42.638513094214545, 2.915061466984922)
	],
	[
		new google.maps.LatLng(42.639230383630441, 2.9148704601841),
		new google.maps.LatLng(42.639441493555516, 2.91466192446482),
		new google.maps.LatLng(42.63963374467739, 2.914478985685049),
		new google.maps.LatLng(42.639813429084853, 2.914322854918484)
	],
	[
		new google.maps.LatLng(42.639101916947254, 2.914993635618121),
		new google.maps.LatLng(42.639184566863108, 2.914914364720298),
		new google.maps.LatLng(42.639230383630441, 2.9148704601841)
	],
	[
		new google.maps.LatLng(42.639073163557228, 2.915013160168946),
		new google.maps.LatLng(42.639101916947254, 2.914993635618121)
	],
	[
		new google.maps.LatLng(42.638590533234755, 2.915213564580199),
		new google.maps.LatLng(42.638715482574725, 2.915190247074696),
		new google.maps.LatLng(42.63879907647717, 2.915168206597035),
		new google.maps.LatLng(42.638863788217762, 2.91514375930512),
		new google.maps.LatLng(42.638941972291533, 2.915102243450885),
		new google.maps.LatLng(42.639021945087308, 2.915048548666607),
		new google.maps.LatLng(42.639073163557228, 2.915013160168946)
	],
	[
		new google.maps.LatLng(42.638513094214545, 2.915061466984922),
		new google.maps.LatLng(42.638540978220469, 2.915078473887589),
		new google.maps.LatLng(42.638563467840015, 2.91509548818967),
		new google.maps.LatLng(42.638584175972007, 2.915133206829941),
		new google.maps.LatLng(42.638588690961342, 2.915158771350964),
		new google.maps.LatLng(42.638590533234755, 2.915213564580199)
	]
];

var circuit_2 = [
	[
		new google.maps.LatLng(42.758942239167972, 2.753066287660907),
		new google.maps.LatLng(42.75897183997192, 2.753035656107142),
		new google.maps.LatLng(42.758992394383988, 2.752980659357068),
		new google.maps.LatLng(42.759033678742227, 2.752947538905922),
		new google.maps.LatLng(42.759091106335958, 2.752896045365737),
		new google.maps.LatLng(42.759139564260671, 2.752854352711748),
		new google.maps.LatLng(42.759177331548507, 2.752855412651638),
		new google.maps.LatLng(42.759231476840753, 2.752940596953931),
		new google.maps.LatLng(42.759289179768288, 2.753008685146946),
		new google.maps.LatLng(42.759359446178912, 2.75306573642914),
		new google.maps.LatLng(42.759456593287418, 2.753082407810422),
		new google.maps.LatLng(42.75949076316838, 2.753083483465517)
	],
	[
		new google.maps.LatLng(42.75949076316838, 2.753083483465517),
		new google.maps.LatLng(42.759538429441072, 2.753088161906584),
		new google.maps.LatLng(42.759620226794624, 2.753076832795163),
		new google.maps.LatLng(42.759694836424423, 2.753067974556298),
		new google.maps.LatLng(42.759755073252997, 2.75306527860243),
		new google.maps.LatLng(42.759809042010566, 2.753073590986229),
		new google.maps.LatLng(42.759874755182871, 2.753106258148249),
		new google.maps.LatLng(42.759969433516552, 2.753221778890477),
		new google.maps.LatLng(42.760042441018228, 2.753298343411062),
		new google.maps.LatLng(42.760099174778695, 2.753335931208445),
		new google.maps.LatLng(42.760127067736292, 2.753344353882225),
		new google.maps.LatLng(42.760198945847321, 2.753320864269362),
		new google.maps.LatLng(42.7602743649473, 2.753272956280084),
		new google.maps.LatLng(42.760387547761532, 2.753224886635139),
		new google.maps.LatLng(42.760456706659866, 2.753191645912867),
		new google.maps.LatLng(42.760510585470136, 2.753160911974449),
		new google.maps.LatLng(42.760566259428934, 2.753128949079901),
		new google.maps.LatLng(42.760678514600698, 2.753068681071036),
		new google.maps.LatLng(42.760837568434454, 2.753026516918855),
		new google.maps.LatLng(42.760949911808545, 2.753004075962749),
		new google.maps.LatLng(42.761051552117678, 2.753019506773895),
		new google.maps.LatLng(42.761148753037411, 2.753059363567237),
		new google.maps.LatLng(42.761225292769304, 2.753107849079855),
		new google.maps.LatLng(42.761309054605654, 2.753168506389701),
		new google.maps.LatLng(42.761386515671148, 2.753226750349123)
	],
	[
		new google.maps.LatLng(42.758895572781228, 2.753105531893091),
		new google.maps.LatLng(42.758935062916997, 2.753073639223635),
		new google.maps.LatLng(42.758942239167972, 2.753066287660907)
	],
	[
		new google.maps.LatLng(42.758694073099456, 2.753848272984841),
		new google.maps.LatLng(42.758706498586562, 2.753777448886374),
		new google.maps.LatLng(42.758713380089731, 2.753641976986234),
		new google.maps.LatLng(42.758739997740086, 2.75348689747739),
		new google.maps.LatLng(42.758774763939769, 2.753356187762604),
		new google.maps.LatLng(42.758821250606346, 2.753238850430064),
		new google.maps.LatLng(42.758866963894967, 2.753176425756639),
		new google.maps.LatLng(42.758895572781228, 2.753105531893091)
	],
	[
		new google.maps.LatLng(42.762089186476082, 2.753412913501669),
		new google.maps.LatLng(42.762073783053303, 2.753361727585522),
		new google.maps.LatLng(42.762044926426789, 2.753325240696477),
		new google.maps.LatLng(42.76200259633341, 2.753294913955703),
		new google.maps.LatLng(42.761951344140613, 2.75329513165704),
		new google.maps.LatLng(42.761889359744757, 2.753319799420481),
		new google.maps.LatLng(42.76180946680342, 2.753377490796884),
		new google.maps.LatLng(42.761718813412827, 2.753447430328909),
		new google.maps.LatLng(42.761635245525156, 2.753470969370223),
		new google.maps.LatLng(42.761617259470469, 2.753469825345413),
		new google.maps.LatLng(42.761588483908213, 2.753468727956862),
		new google.maps.LatLng(42.761538932651931, 2.753426228360881),
		new google.maps.LatLng(42.761480327997901, 2.753356921579933),
		new google.maps.LatLng(42.76141991403653, 2.753282741208857),
		new google.maps.LatLng(42.761386515671148, 2.753226750349123)
	],
	[
		new google.maps.LatLng(42.761954493134084, 2.758227473506378),
		new google.maps.LatLng(42.761950847349581, 2.758205523976727),
		new google.maps.LatLng(42.761945381252396, 2.75817381961463),
		new google.maps.LatLng(42.761934486176209, 2.758127494775422),
		new google.maps.LatLng(42.761924375369269, 2.758029914856146),
		new google.maps.LatLng(42.761904895191968, 2.757765195643093),
		new google.maps.LatLng(42.76188180052511, 2.757493171134629),
		new google.maps.LatLng(42.761857067995848, 2.757291927869821),
		new google.maps.LatLng(42.761857682608863, 2.757166237221228),
		new google.maps.LatLng(42.761860720528645, 2.756919729778723),
		new google.maps.LatLng(42.761849744971279, 2.756838017009748),
		new google.maps.LatLng(42.76183887197633, 2.756801454317888),
		new google.maps.LatLng(42.761819004657013, 2.75676370887793),
		new google.maps.LatLng(42.761781837520964, 2.756630854557403),
		new google.maps.LatLng(42.761749974021193, 2.756457708882214),
		new google.maps.LatLng(42.761735260528773, 2.756313779159072),
		new google.maps.LatLng(42.761725921989964, 2.756161284520953),
		new google.maps.LatLng(42.761724919764042, 2.756116138099647),
		new google.maps.LatLng(42.76172380155581, 2.75601974148987),
		new google.maps.LatLng(42.761724300433293, 2.755844020225116),
		new google.maps.LatLng(42.761733876310913, 2.755706089015894),
		new google.maps.LatLng(42.761760458329867, 2.755533919012721),
		new google.maps.LatLng(42.761787970043144, 2.755375168745545),
		new google.maps.LatLng(42.761803904661676, 2.75526527740456),
		new google.maps.LatLng(42.7618315489973, 2.755165097953984),
		new google.maps.LatLng(42.761878068151105, 2.755061179643182),
		new google.maps.LatLng(42.761891418237219, 2.755001329753141),
		new google.maps.LatLng(42.761900329392589, 2.754965903481422),
		new google.maps.LatLng(42.761918912560994, 2.7548352556896),
		new google.maps.LatLng(42.761929442678628, 2.754721726187437),
		new google.maps.LatLng(42.761936532241805, 2.754676546348358),
		new google.maps.LatLng(42.761973989964964, 2.754542158236772),
		new google.maps.LatLng(42.762031967443363, 2.754338126943872),
		new google.maps.LatLng(42.762053376145801, 2.754263599368738),
		new google.maps.LatLng(42.762058656302386, 2.754213545587792),
		new google.maps.LatLng(42.762059107574096, 2.754018299605629),
		new google.maps.LatLng(42.762061334332351, 2.75381328337101),
		new google.maps.LatLng(42.762070008401501, 2.753675354675478),
		new google.maps.LatLng(42.762084019410125, 2.753511777994861),
		new google.maps.LatLng(42.762089186476082, 2.753412913501669)
	],
	[
		new google.maps.LatLng(42.758671885750694, 2.75397526836396),
		new google.maps.LatLng(42.758683417234138, 2.753906888839842),
		new google.maps.LatLng(42.758694073099456, 2.753848272984841)
	],
	[
		new google.maps.LatLng(42.758647925046397, 2.754113253828297),
		new google.maps.LatLng(42.758664790298774, 2.754018006178536),
		new google.maps.LatLng(42.758671885750694, 2.75397526836396)
	],
	[
		new google.maps.LatLng(42.758647925046397, 2.754113253828297),
		new google.maps.LatLng(42.758670943511241, 2.754348656001773),
		new google.maps.LatLng(42.758671067285889, 2.754402344601707)
	],
	[
		new google.maps.LatLng(42.758671067285889, 2.754402344601707),
		new google.maps.LatLng(42.758671145384582, 2.754436510521369),
		new google.maps.LatLng(42.758664127832823, 2.754513412976828),
		new google.maps.LatLng(42.758642707552994, 2.754583055717384),
		new google.maps.LatLng(42.75858725411787, 2.754711410349207),
		new google.maps.LatLng(42.758359845085053, 2.75513821918345),
		new google.maps.LatLng(42.758332967971143, 2.755181039765395)
	],
	[
		new google.maps.LatLng(42.75831863795581, 2.755205503539116),
		new google.maps.LatLng(42.758304304417216, 2.755228748060134),
		new google.maps.LatLng(42.758263957216592, 2.755278945893912),
		new google.maps.LatLng(42.758208279122236, 2.75530968520497),
		new google.maps.LatLng(42.758160644441567, 2.755318426580192),
		new google.maps.LatLng(42.758115675406074, 2.755313734643694),
		new google.maps.LatLng(42.758068875341735, 2.755294409169726),
		new google.maps.LatLng(42.75802742848618, 2.755256756711241),
		new google.maps.LatLng(42.757970614867283, 2.755183784860617),
		new google.maps.LatLng(42.757881390637515, 2.755092645319658),
		new google.maps.LatLng(42.757732679904876, 2.754939528252871),
		new google.maps.LatLng(42.757504617922422, 2.754687910409468),
		new google.maps.LatLng(42.757467660569404, 2.754647799985367),
		new google.maps.LatLng(42.757405502230952, 2.754596815143526),
		new google.maps.LatLng(42.757383004563287, 2.754588368444446),
		new google.maps.LatLng(42.757343402633204, 2.754571452460898),
		new google.maps.LatLng(42.757285860281982, 2.754572915704801),
		new google.maps.LatLng(42.757264317198896, 2.754588868268587)
	],
	[
		new google.maps.LatLng(42.757264317198896, 2.754588868268587),
		new google.maps.LatLng(42.757240076963669, 2.754604833955882),
		new google.maps.LatLng(42.757214090618753, 2.75464398909876),
		new google.maps.LatLng(42.757195342879932, 2.754702636698532),
		new google.maps.LatLng(42.75719640963505, 2.754775842679531),
		new google.maps.LatLng(42.757216346823618, 2.754844088448374),
		new google.maps.LatLng(42.757236240196711, 2.754892810803953),
		new google.maps.LatLng(42.757247990376321, 2.754919605765968),
		new google.maps.LatLng(42.757398769370724, 2.755191071065079),
		new google.maps.LatLng(42.75752427164835, 2.755418716793603),
		new google.maps.LatLng(42.757572121380228, 2.755503929584626),
		new google.maps.LatLng(42.757626367785591, 2.755634260968273),
		new google.maps.LatLng(42.757827048658555, 2.756103191224819),
		new google.maps.LatLng(42.758007865408452, 2.756536822400713),
		new google.maps.LatLng(42.75810099294344, 2.756763388370251),
		new google.maps.LatLng(42.758110031613739, 2.756784094790401),
		new google.maps.LatLng(42.758193248487977, 2.757002161968304),
		new google.maps.LatLng(42.75821051498805, 2.757082622335493)
	],
	[
		new google.maps.LatLng(42.75821051498805, 2.757082622335493),
		new google.maps.LatLng(42.758213320732644, 2.75713019886083),
		new google.maps.LatLng(42.75821609776601, 2.757165573194587),
		new google.maps.LatLng(42.758212573331193, 2.757197312042656)
	],
	[
		new google.maps.LatLng(42.758212573331193, 2.757197312042656),
		new google.maps.LatLng(42.758206420293135, 2.75725956818363),
		new google.maps.LatLng(42.758171692960531, 2.757409797038397),
		new google.maps.LatLng(42.758053116880049, 2.757856882359027),
		new google.maps.LatLng(42.757996032430384, 2.758060892506144),
		new google.maps.LatLng(42.757958691607293, 2.758248957846358),
		new google.maps.LatLng(42.75792861093003, 2.758466276122406),
		new google.maps.LatLng(42.757898614403153, 2.758721421062302),
		new google.maps.LatLng(42.757862296046603, 2.758964389349684),
		new google.maps.LatLng(42.757832928935592, 2.759099952379512),
		new google.maps.LatLng(42.757783853603812, 2.759268540861849),
		new google.maps.LatLng(42.757581941659645, 2.759846524198859),
		new google.maps.LatLng(42.757415828957896, 2.760351143764156),
		new google.maps.LatLng(42.757348846411759, 2.760553969763483)
	],
	[
		new google.maps.LatLng(42.761814581278223, 2.76281262042647),
		new google.maps.LatLng(42.761796473863718, 2.762756561817429),
		new google.maps.LatLng(42.761794567279466, 2.762707758299967),
		new google.maps.LatLng(42.761797129327718, 2.762646734639903),
		new google.maps.LatLng(42.761808742554706, 2.762612519715584),
		new google.maps.LatLng(42.761823061448709, 2.762581954817479),
		new google.maps.LatLng(42.761838277141614, 2.762550164697019),
		new google.maps.LatLng(42.761849009681839, 2.762524495714889),
		new google.maps.LatLng(42.7618579444134, 2.762498833621458),
		new google.maps.LatLng(42.761866841745416, 2.76245608767223),
		new google.maps.LatLng(42.761907745127424, 2.762249693568477),
		new google.maps.LatLng(42.761934228858266, 2.762028716593916),
		new google.maps.LatLng(42.761943759443788, 2.761866379994279),
		new google.maps.LatLng(42.761948176879649, 2.761830974422489),
		new google.maps.LatLng(42.761972878203238, 2.761617324836405),
		new google.maps.LatLng(42.761976412419337, 2.761589243483021),
		new google.maps.LatLng(42.761995432737407, 2.761247488444464),
		new google.maps.LatLng(42.762000664696643, 2.761174251169694),
		new google.maps.LatLng(42.76201550111039, 2.760972843507603),
		new google.maps.LatLng(42.762029563690206, 2.760827573052675),
		new google.maps.LatLng(42.76203304802803, 2.760777528023907),
		new google.maps.LatLng(42.762031119209112, 2.760718962505099),
		new google.maps.LatLng(42.762026542014333, 2.760682372245484),
		new google.maps.LatLng(42.76202196134772, 2.760644562676464),
		new google.maps.LatLng(42.76201820120734, 2.760571361320023),
		new google.maps.LatLng(42.762021688896716, 2.760522536822789),
		new google.maps.LatLng(42.762034976713259, 2.760433401124413),
		new google.maps.LatLng(42.762066909619975, 2.760238024814903),
		new google.maps.LatLng(42.762088828345853, 2.759987778190638),
		new google.maps.LatLng(42.762092075223435, 2.75983156921977),
		new google.maps.LatLng(42.76209871540658, 2.759585044563119),
		new google.maps.LatLng(42.762094976979689, 2.759521606284013),
		new google.maps.LatLng(42.762070173975843, 2.759287415476764),
		new google.maps.LatLng(42.762062758735432, 2.759188602899063),
		new google.maps.LatLng(42.762007252261689, 2.758496935661387),
		new google.maps.LatLng(42.761998885151939, 2.758374942655414),
		new google.maps.LatLng(42.761995219489052, 2.758344450553214),
		new google.maps.LatLng(42.761975289581109, 2.758278639466732),
		new google.maps.LatLng(42.761964442133589, 2.758253057625741),
		new google.maps.LatLng(42.761954493134084, 2.758227473506378)
	],
	[
		new google.maps.LatLng(42.757348846411759, 2.760553969763483),
		new google.maps.LatLng(42.757305087924038, 2.760688369747887),
		new google.maps.LatLng(42.757264072647857, 2.760843500591512),
		new google.maps.LatLng(42.75724102690053, 2.760992457131672),
		new google.maps.LatLng(42.75722168946956, 2.76119142448586)
	],
	[
		new google.maps.LatLng(42.75722168946956, 2.76119142448586),
		new google.maps.LatLng(42.757208484751814, 2.761318377104772),
		new google.maps.LatLng(42.757162606846343, 2.761712682519437),
		new google.maps.LatLng(42.757135919973052, 2.761842130121491),
		new google.maps.LatLng(42.757100238689802, 2.761970394184866),
		new google.maps.LatLng(42.757034945477727, 2.762125623054411),
		new google.maps.LatLng(42.756969634988884, 2.762273531403025),
		new google.maps.LatLng(42.756948172549272, 2.762326085839263)
	],
	[
		new google.maps.LatLng(42.756948172549272, 2.762326085839263),
		new google.maps.LatLng(42.756874817893426, 2.762495989040564),
		new google.maps.LatLng(42.756817611247961, 2.762648743667763),
		new google.maps.LatLng(42.756784674612881, 2.762798959240508),
		new google.maps.LatLng(42.75667644882617, 2.763464390383483),
		new google.maps.LatLng(42.756663314388462, 2.763624284566039),
		new google.maps.LatLng(42.756668916968955, 2.763718215404372),
		new google.maps.LatLng(42.756687138927084, 2.763826736121106),
		new google.maps.LatLng(42.756729008221818, 2.764057177081399),
		new google.maps.LatLng(42.756765435349955, 2.764266897594147),
		new google.maps.LatLng(42.756771131065889, 2.764403534139786),
		new google.maps.LatLng(42.756764366544203, 2.764598787305624),
		new google.maps.LatLng(42.756743138154334, 2.764758715889782),
		new google.maps.LatLng(42.756698593260957, 2.764946800694354),
		new google.maps.LatLng(42.756672652238301, 2.765007914080924),
		new google.maps.LatLng(42.756652980413563, 2.765058020850419),
		new google.maps.LatLng(42.75656523314192, 2.765226756571303),
		new google.maps.LatLng(42.756485519143432, 2.765368617782116)
	],
	[
		new google.maps.LatLng(42.76207644606562, 2.763721880558736),
		new google.maps.LatLng(42.761986856947438, 2.763462326161603),
		new google.maps.LatLng(42.761891933918221, 2.763230859399306),
		new google.maps.LatLng(42.7618493265959, 2.763073617065639),
		new google.maps.LatLng(42.761842921757619, 2.763023612614673),
		new google.maps.LatLng(42.761827314664217, 2.762878464023903),
		new google.maps.LatLng(42.761814581278223, 2.76281262042647)
	],
	[
		new google.maps.LatLng(42.760432061634461, 2.771261122365821),
		new google.maps.LatLng(42.760433765892941, 2.771217187182223),
		new google.maps.LatLng(42.760472806854992, 2.770972984275893),
		new google.maps.LatLng(42.760491459469087, 2.770865529098651),
		new google.maps.LatLng(42.760541169949647, 2.770565153258457),
		new google.maps.LatLng(42.760572304916742, 2.770408839260719),
		new google.maps.LatLng(42.760588283769501, 2.770312375909429),
		new google.maps.LatLng(42.760604214670977, 2.770193949403388),
		new google.maps.LatLng(42.760606660337281, 2.77007679588882),
		new google.maps.LatLng(42.760602888121262, 2.769995054492365),
		new google.maps.LatLng(42.760599166233327, 2.769936496721202),
		new google.maps.LatLng(42.760598878189036, 2.769802270953944),
		new google.maps.LatLng(42.760605738385358, 2.769647272162981),
		new google.maps.LatLng(42.760633199533594, 2.769455584620434),
		new google.maps.LatLng(42.760689338991874, 2.769219854832545),
		new google.maps.LatLng(42.760703581038712, 2.76915268392691),
		new google.maps.LatLng(42.760721379780414, 2.769067196748409),
		new google.maps.LatLng(42.76078702471932, 2.768653270716194),
		new google.maps.LatLng(42.760828712503063, 2.768388310817549),
		new google.maps.LatLng(42.760873060276623, 2.768106255659653),
		new google.maps.LatLng(42.760897933197995, 2.767965827464126),
		new google.maps.LatLng(42.760944979565885, 2.76768498086343),
		new google.maps.LatLng(42.760980662287686, 2.767554271088055),
		new google.maps.LatLng(42.761030728390516, 2.767422282925773),
		new google.maps.LatLng(42.761086166233866, 2.767279292016771),
		new google.maps.LatLng(42.76115958891296, 2.76713744762021),
		new google.maps.LatLng(42.761252858588151, 2.767026030551924),
		new google.maps.LatLng(42.761418789815991, 2.766836225121941),
		new google.maps.LatLng(42.761518357151488, 2.766726002717891),
		new google.maps.LatLng(42.76159721861773, 2.766604880481789),
		new google.maps.LatLng(42.761655334186202, 2.766453333627772),
		new google.maps.LatLng(42.76167500321317, 2.766402002722377),
		new google.maps.LatLng(42.761732155512725, 2.766221173395124),
		new google.maps.LatLng(42.761740037560131, 2.766124740176619),
		new google.maps.LatLng(42.761738941235635, 2.766034444812058),
		new google.maps.LatLng(42.761777687297524, 2.76566088610873),
		new google.maps.LatLng(42.761783655960329, 2.765511988767394),
		new google.maps.LatLng(42.761787170155323, 2.765474145883101),
		new google.maps.LatLng(42.76179244177964, 2.765417991820075),
		new google.maps.LatLng(42.761806654671119, 2.76533861715378),
		new google.maps.LatLng(42.761929833555456, 2.764925667258356),
		new google.maps.LatLng(42.762036093016036, 2.764588441973534),
		new google.maps.LatLng(42.762062828547215, 2.764479728388583),
		new google.maps.LatLng(42.762090025969997, 2.764172108298995),
		new google.maps.LatLng(42.762099459843434, 2.763964622592645),
		new google.maps.LatLng(42.762099293285694, 2.763888966141304),
		new google.maps.LatLng(42.762091911644077, 2.763803576474177),
		new google.maps.LatLng(42.76207644606562, 2.763721880558736)
	],
	[
		new google.maps.LatLng(42.756485519143432, 2.765368617782116),
		new google.maps.LatLng(42.756435359627559, 2.765456670998523),
		new google.maps.LatLng(42.756369055653302, 2.765563091790531),
		new google.maps.LatLng(42.756324383481015, 2.765693829451696),
		new google.maps.LatLng(42.756280704525281, 2.765867267455358),
		new google.maps.LatLng(42.756237835713414, 2.766000436321059),
		new google.maps.LatLng(42.756179647027373, 2.766117805775956),
		new google.maps.LatLng(42.756035481102401, 2.766391699053168),
		new google.maps.LatLng(42.755675273802858, 2.76696661269482),
		new google.maps.LatLng(42.755540868305232, 2.76718189579652),
		new google.maps.LatLng(42.755386690427166, 2.767400917172691),
		new google.maps.LatLng(42.755322150771725, 2.767492684877821),
		new google.maps.LatLng(42.755247709123616, 2.767579612786719),
		new google.maps.LatLng(42.755186752498851, 2.767665265799212),
		new google.maps.LatLng(42.755130307481501, 2.767758220536233),
		new google.maps.LatLng(42.755087392421295, 2.767870643647336),
		new google.maps.LatLng(42.755004584807004, 2.768246774889906),
		new google.maps.LatLng(42.754969104718029, 2.76847141930166),
		new google.maps.LatLng(42.754965826863604, 2.768619068264545),
		new google.maps.LatLng(42.754968798604295, 2.768745949329785),
		new google.maps.LatLng(42.754984462773464, 2.768921586023537),
		new google.maps.LatLng(42.755006518067518, 2.769142341974534),
		new google.maps.LatLng(42.755012349370418, 2.769344860900917),
		new google.maps.LatLng(42.755001022655321, 2.769513283212239),
		new google.maps.LatLng(42.75497531212622, 2.769682983048571),
		new google.maps.LatLng(42.754944162454855, 2.769831962098467),
		new google.maps.LatLng(42.75488257210035, 2.770042067215804)
	],
	[
		new google.maps.LatLng(42.75488257210035, 2.770042067215804),
		new google.maps.LatLng(42.754792406942308, 2.770345014240827),
		new google.maps.LatLng(42.75473171499624, 2.770555116221133),
		new google.maps.LatLng(42.754697926170508, 2.770732167229774),
		new google.maps.LatLng(42.754674051109347, 2.770920160115681),
		new google.maps.LatLng(42.75466462506219, 2.771137378150119),
		new google.maps.LatLng(42.754649014428502, 2.771828029537432),
		new google.maps.LatLng(42.754645954665065, 2.772080605847017),
		new google.maps.LatLng(42.75464065131991, 2.772546713451317),
		new google.maps.LatLng(42.754613593415208, 2.772931158126779),
		new google.maps.LatLng(42.754597646614812, 2.773043471722362),
		new google.maps.LatLng(42.754583381034308, 2.773100871962324)
	],
	[
		new google.maps.LatLng(42.761042317306959, 2.777106190663218),
		new google.maps.LatLng(42.760920766541133, 2.77659537016068),
		new google.maps.LatLng(42.760888083972638, 2.776445404817916),
		new google.maps.LatLng(42.760830082555586, 2.776227202445991),
		new google.maps.LatLng(42.760783685969407, 2.775968687272438),
		new google.maps.LatLng(42.760692365212492, 2.775297902238283),
		new google.maps.LatLng(42.760612347019475, 2.774872345463443),
		new google.maps.LatLng(42.760600470512038, 2.774783312578564),
		new google.maps.LatLng(42.760559000040701, 2.774303917339147),
		new google.maps.LatLng(42.76050448031755, 2.773607368008919),
		new google.maps.LatLng(42.760498933122399, 2.773535395969857),
		new google.maps.LatLng(42.76048440233744, 2.773467118376916),
		new google.maps.LatLng(42.760479826810197, 2.773429308800918),
		new google.maps.LatLng(42.760474318586809, 2.773375639562204),
		new google.maps.LatLng(42.7604753446495, 2.773010782457153),
		new google.maps.LatLng(42.760471357738759, 2.772826541466363),
		new google.maps.LatLng(42.760462105075476, 2.772703332341012),
		new google.maps.LatLng(42.760447438231154, 2.772571603177975),
		new google.maps.LatLng(42.760437203498697, 2.772409350933809),
		new google.maps.LatLng(42.760431551767937, 2.772288569727566),
		new google.maps.LatLng(42.760430554390013, 2.772242203477401),
		new google.maps.LatLng(42.760439102061646, 2.772033508584954),
		new google.maps.LatLng(42.760435996470598, 2.771841942622603),
		new google.maps.LatLng(42.76043586471188, 2.771779711332888),
		new google.maps.LatLng(42.760428753903206, 2.771396582790723),
		new google.maps.LatLng(42.760432061634461, 2.771261122365821)
	],
	[
		new google.maps.LatLng(42.754583381034308, 2.773100871962324),
		new google.maps.LatLng(42.754577149251531, 2.773130179582814),
		new google.maps.LatLng(42.754535194041665, 2.77327431755181),
		new google.maps.LatLng(42.754477116609394, 2.773447800285225),
		new google.maps.LatLng(42.754228409248306, 2.774042963806048),
		new google.maps.LatLng(42.75417204902854, 2.774178615005099),
		new google.maps.LatLng(42.753954718191821, 2.774730947273299),
		new google.maps.LatLng(42.753895700347982, 2.774886129471716),
		new google.maps.LatLng(42.753877863218847, 2.774955744284165)
	],
	[
		new google.maps.LatLng(42.753877863218847, 2.774955744284165),
		new google.maps.LatLng(42.753845768491658, 2.775086419288021),
		new google.maps.LatLng(42.753811115961945, 2.775284210102492),
		new google.maps.LatLng(42.753800828197605, 2.775523390847581),
		new google.maps.LatLng(42.753819431089724, 2.77581980432731),
		new google.maps.LatLng(42.75381689976745, 2.775899120370421),
		new google.maps.LatLng(42.753806268828271, 2.775974808217636),
		new google.maps.LatLng(42.753789317501131, 2.776038318694962),
		new google.maps.LatLng(42.753761599078494, 2.776112851556026),
		new google.maps.LatLng(42.753723063829582, 2.776174005318149),
		new google.maps.LatLng(42.753418319753408, 2.776637594373862),
		new google.maps.LatLng(42.753181696214718, 2.776998429420006),
		new google.maps.LatLng(42.753080407560923, 2.777150108314221),
		new google.maps.LatLng(42.753016746574204, 2.777235758609522),
		new google.maps.LatLng(42.752957511627891, 2.777288448907704),
		new google.maps.LatLng(42.752874026072625, 2.777353432454507),
		new google.maps.LatLng(42.752786006182653, 2.777400132725814),
		new google.maps.LatLng(42.752651258747754, 2.777460432177316),
		new google.maps.LatLng(42.752330473395553, 2.777561704702143),
		new google.maps.LatLng(42.752041126822817, 2.777648215378164),
		new google.maps.LatLng(42.751949500776043, 2.777690047368365),
		new google.maps.LatLng(42.751856103076072, 2.777745306990786),
		new google.maps.LatLng(42.751777117870674, 2.777812712087047),
		new google.maps.LatLng(42.751699968788621, 2.777898410726053),
		new google.maps.LatLng(42.751628234768553, 2.777993850045746),
		new google.maps.LatLng(42.75156281275877, 2.778097804036094),
		new google.maps.LatLng(42.751496578880754, 2.778244462908287),
		new google.maps.LatLng(42.751426789852637, 2.778410655974592),
		new google.maps.LatLng(42.751347955485592, 2.778551262448192),
		new google.maps.LatLng(42.751291518153536, 2.778652741358596),
		new google.maps.LatLng(42.751169580146467, 2.778820352263613),
		new google.maps.LatLng(42.750864652292641, 2.779199724164076),
		new google.maps.LatLng(42.75072291804873, 2.779360087526998),
		new google.maps.LatLng(42.750576734346822, 2.779543647264069),
		new google.maps.LatLng(42.750439517598444, 2.779714972242746),
		new google.maps.LatLng(42.750278030533032, 2.779890047364321),
		new google.maps.LatLng(42.750243039045962, 2.779926780054779)
	],
	[
		new google.maps.LatLng(42.761360639504808, 2.781041537968327),
		new google.maps.LatLng(42.761331772731225, 2.780555982943175),
		new google.maps.LatLng(42.761327813016642, 2.780379059635125),
		new google.maps.LatLng(42.761331986632598, 2.780221629931992),
		new google.maps.LatLng(42.761349503505585, 2.779994594461591),
		new google.maps.LatLng(42.761367107822302, 2.779810268772049),
		new google.maps.LatLng(42.76136969025417, 2.779754127126583),
		new google.maps.LatLng(42.76137310384113, 2.77966503536267),
		new google.maps.LatLng(42.761379784890174, 2.779416075859126),
		new google.maps.LatLng(42.761380389920227, 2.779273302676381),
		new google.maps.LatLng(42.761380193907826, 2.779178123505258),
		new google.maps.LatLng(42.761378214197038, 2.779090271476464),
		new google.maps.LatLng(42.761371840365726, 2.779051246827775),
		new google.maps.LatLng(42.761343805486625, 2.778973257025213),
		new google.maps.LatLng(42.76129147362532, 2.778885597128564),
		new google.maps.LatLng(42.761265327955208, 2.77885152899537),
		new google.maps.LatLng(42.761233721008999, 2.778785755077543),
		new google.maps.LatLng(42.761216448512506, 2.778694301226464),
		new google.maps.LatLng(42.761212763694985, 2.778651606726415),
		new google.maps.LatLng(42.761198976099074, 2.778506448014617),
		new google.maps.LatLng(42.761195299223971, 2.778467413886649),
		new google.maps.LatLng(42.761177604049536, 2.778172177932409),
		new google.maps.LatLng(42.761154544130591, 2.777891606560117),
		new google.maps.LatLng(42.761139988898101, 2.777809905131883),
		new google.maps.LatLng(42.76106502475541, 2.777215926106299),
		new google.maps.LatLng(42.761042317306959, 2.777106190663218)
	],
	[
		new google.maps.LatLng(42.750243039045962, 2.779926780054779),
		new google.maps.LatLng(42.750147882818034, 2.780001562404215),
		new google.maps.LatLng(42.750016761429102, 2.780076479604456),
		new google.maps.LatLng(42.749692499625816, 2.780237526948139)
	],
	[
		new google.maps.LatLng(42.749692499625816, 2.780237526948139),
		new google.maps.LatLng(42.749495787995684, 2.780335871344568),
		new google.maps.LatLng(42.749413210329202, 2.780405723903978),
		new google.maps.LatLng(42.749367491483589, 2.780472996439805),
		new google.maps.LatLng(42.749318216367911, 2.780559802598609),
		new google.maps.LatLng(42.749241332539626, 2.780776034741032),
		new google.maps.LatLng(42.749177225449642, 2.781084937999233),
		new google.maps.LatLng(42.749160505793036, 2.781263121203209),
		new google.maps.LatLng(42.749160679543579, 2.78134852174585),
		new google.maps.LatLng(42.749201035644205, 2.781737552429357),
		new google.maps.LatLng(42.749212063781847, 2.781854631499919),
		new google.maps.LatLng(42.749233205450231, 2.782081473644058),
		new google.maps.LatLng(42.749244151800099, 2.782158293083099),
		new google.maps.LatLng(42.749256034212571, 2.782253410055872),
		new google.maps.LatLng(42.74931451046519, 2.782711914565148),
		new google.maps.LatLng(42.74931524167701, 2.782717687346676),
		new google.maps.LatLng(42.749325475888007, 2.782798494096441)
	],
	[
		new google.maps.LatLng(42.760539651036318, 2.785009203893102),
		new google.maps.LatLng(42.760585331573203, 2.784921177520343),
		new google.maps.LatLng(42.760594266743432, 2.784893079380081),
		new google.maps.LatLng(42.760622850686531, 2.78479901455594),
		new google.maps.LatLng(42.760678850020042, 2.784476661763256),
		new google.maps.LatLng(42.760683190624853, 2.784399769600348),
		new google.maps.LatLng(42.760686691727692, 2.784352168012183),
		new google.maps.LatLng(42.760687490135368, 2.78430213479017),
		new google.maps.LatLng(42.760685591364343, 2.784252110967132),
		new google.maps.LatLng(42.760659188521203, 2.784089916284559),
		new google.maps.LatLng(42.760659063445708, 2.784027683523302),
		new google.maps.LatLng(42.76065986171097, 2.783977650319434),
		new google.maps.LatLng(42.760668756948817, 2.783930028674987),
		new google.maps.LatLng(42.760707174349768, 2.78380786058264),
		new google.maps.LatLng(42.760776089322178, 2.783648972472545),
		new google.maps.LatLng(42.760805650214984, 2.783593950410471),
		new google.maps.LatLng(42.760869257614729, 2.783479010776836),
		new google.maps.LatLng(42.760895259389009, 2.783442306463611),
		new google.maps.LatLng(42.76094004863684, 2.783359162433531),
		new google.maps.LatLng(42.76104538805933, 2.782982931644249),
		new google.maps.LatLng(42.761051581077147, 2.782932877974143),
		new google.maps.LatLng(42.76105595032864, 2.782870627832603),
		new google.maps.LatLng(42.761056658997155, 2.782776666515089),
		new google.maps.LatLng(42.761059815349, 2.782559448704442),
		new google.maps.LatLng(42.76106390272323, 2.782358090825682),
		new google.maps.LatLng(42.761065596377293, 2.782306833591346),
		new google.maps.LatLng(42.761069058945836, 2.782240927431907),
		new google.maps.LatLng(42.761109009771502, 2.781989405108829),
		new google.maps.LatLng(42.761144523844948, 2.7817671847607),
		new google.maps.LatLng(42.761189125782586, 2.781592520647687),
		new google.maps.LatLng(42.761226713650345, 2.781505741140497),
		new google.maps.LatLng(42.761260779624749, 2.781455582660716),
		new google.maps.LatLng(42.761306481712552, 2.78137975424058),
		new google.maps.LatLng(42.761335124873455, 2.781316192554972),
		new google.maps.LatLng(42.761355628448918, 2.781229477939509),
		new google.maps.LatLng(42.761359951908148, 2.781145262765675),
		new google.maps.LatLng(42.761360639504808, 2.781041537968327)
	],
	[
		new google.maps.LatLng(42.749325475888007, 2.782798494096441),
		new google.maps.LatLng(42.749329131790098, 2.782827761117808),
		new google.maps.LatLng(42.749351760976374, 2.782902096799817),
		new google.maps.LatLng(42.749453872542674, 2.783153039008191),
		new google.maps.LatLng(42.749503554542088, 2.783266315260426),
		new google.maps.LatLng(42.749637253856775, 2.783575700889717),
		new google.maps.LatLng(42.749695131339074, 2.783740188604666),
		new google.maps.LatLng(42.749701484156631, 2.78376944521521),
		new google.maps.LatLng(42.74972782516339, 2.783901109710595),
		new google.maps.LatLng(42.749758064746928, 2.784182821882067),
		new google.maps.LatLng(42.749784648152499, 2.784435266993656)
	],
	[
		new google.maps.LatLng(42.749784648152499, 2.784435266993656),
		new google.maps.LatLng(42.74981213265729, 2.78468892949485),
		new google.maps.LatLng(42.749862694564854, 2.785241412132925),
		new google.maps.LatLng(42.749864541939942, 2.785265805806372),
		new google.maps.LatLng(42.749953277304641, 2.786024332494671),
		new google.maps.LatLng(42.749990864589201, 2.786386541169564)
	],
	[
		new google.maps.LatLng(42.759967558627835, 2.786694019201763),
		new google.maps.LatLng(42.76003094863529, 2.786468044333462),
		new google.maps.LatLng(42.760115707832107, 2.786137048327074),
		new google.maps.LatLng(42.760142470299016, 2.786030789648537),
		new google.maps.LatLng(42.76022368348481, 2.785725431839825),
		new google.maps.LatLng(42.760264776120032, 2.785591053780237),
		new google.maps.LatLng(42.760300534389607, 2.785487202021624),
		new google.maps.LatLng(42.760399049683059, 2.785291599891829),
		new google.maps.LatLng(42.760514572916037, 2.785058106878809),
		new google.maps.LatLng(42.760519250566297, 2.785048984999611),
		new google.maps.LatLng(42.760520842673152, 2.785045881135361),
		new google.maps.LatLng(42.760539651036318, 2.785009203893102)
	],
	[
		new google.maps.LatLng(42.750021148675955, 2.786693876031652),
		new google.maps.LatLng(42.750035818849625, 2.78683656543781),
		new google.maps.LatLng(42.750091798322153, 2.787406112693797),
		new google.maps.LatLng(42.750095450765322, 2.787434160043331),
		new google.maps.LatLng(42.75019523941863, 2.788334176019929),
		new google.maps.LatLng(42.750199836721727, 2.788385400135669),
		new google.maps.LatLng(42.750223715023616, 2.788639079593536),
		new google.maps.LatLng(42.750232175866238, 2.788825712726247),
		new google.maps.LatLng(42.750232401769686, 2.788940394839066)
	],
	[
		new google.maps.LatLng(42.756112119953542, 2.795524971262414),
		new google.maps.LatLng(42.756116507930919, 2.795468829099472),
		new google.maps.LatLng(42.756146962948222, 2.795407714165987),
		new google.maps.LatLng(42.75619719829173, 2.795346530117825),
		new google.maps.LatLng(42.756250991061719, 2.795264590477067),
		new google.maps.LatLng(42.756320858272275, 2.795125246776872),
		new google.maps.LatLng(42.756358379559195, 2.79499821791511),
		new google.maps.LatLng(42.756372532620297, 2.794876152964961),
		new google.maps.LatLng(42.756392014750233, 2.794719904141486),
		new google.maps.LatLng(42.756406289012794, 2.794661285555781),
		new google.maps.LatLng(42.756422358854358, 2.794601441768763),
		new google.maps.LatLng(42.756505499995484, 2.794351014809162),
		new google.maps.LatLng(42.756566278644783, 2.794161675060984),
		new google.maps.LatLng(42.756608357836157, 2.794067573327838),
		new google.maps.LatLng(42.75666207902875, 2.793949027524655),
		new google.maps.LatLng(42.756765950619439, 2.793725369652004),
		new google.maps.LatLng(42.756791036884444, 2.793678914015413),
		new google.maps.LatLng(42.756841211160207, 2.793586003844961),
		new google.maps.LatLng(42.756857337069981, 2.793555442567329),
		new google.maps.LatLng(42.756937059607104, 2.793398977620968),
		new google.maps.LatLng(42.756956747001489, 2.793350101290282),
		new google.maps.LatLng(42.75701671636223, 2.793208348438353),
		new google.maps.LatLng(42.757047127610818, 2.793125268419663),
		new google.maps.LatLng(42.75714192286555, 2.792858933284943),
		new google.maps.LatLng(42.757235873702051, 2.792620665728051),
		new google.maps.LatLng(42.757311932642075, 2.792430046682785),
		new google.maps.LatLng(42.757436362531195, 2.792145300527365),
		new google.maps.LatLng(42.757474864476464, 2.79206219102308),
		new google.maps.LatLng(42.757525894000693, 2.791947311018494),
		new google.maps.LatLng(42.757590386016233, 2.791820182161604),
		new google.maps.LatLng(42.757626215983414, 2.791750502655798),
		new google.maps.LatLng(42.757722138195525, 2.791602517259477),
		new google.maps.LatLng(42.757816325371287, 2.79148748249983),
		new google.maps.LatLng(42.758051367719766, 2.791212097155024),
		new google.maps.LatLng(42.758218280244428, 2.791043111256715),
		new google.maps.LatLng(42.758269432281949, 2.790991678650875),
		new google.maps.LatLng(42.75835644238591, 2.790885209524139),
		new google.maps.LatLng(42.758405721738555, 2.790795956746072),
		new google.maps.LatLng(42.758429021101108, 2.790755607118308),
		new google.maps.LatLng(42.758493522984232, 2.790634575080595),
		new google.maps.LatLng(42.758579519466267, 2.790469537621885),
		new google.maps.LatLng(42.758660110619537, 2.790299639748262),
		new google.maps.LatLng(42.758726351873158, 2.790148094896236),
		new google.maps.LatLng(42.758795261309785, 2.789981898508958),
		new google.maps.LatLng(42.758817632248508, 2.789926908084495),
		new google.maps.LatLng(42.758827474752003, 2.78990246863014),
		new google.maps.LatLng(42.758851636708009, 2.789843810608753),
		new google.maps.LatLng(42.758887334489415, 2.789707018073371),
		new google.maps.LatLng(42.758933764876247, 2.789540902070079),
		new google.maps.LatLng(42.758951534289018, 2.789432238958554),
		new google.maps.LatLng(42.75898994090786, 2.789301536745929),
		new google.maps.LatLng(42.759026667329245, 2.789230631881368),
		new google.maps.LatLng(42.759058913640942, 2.789168284403531),
		new google.maps.LatLng(42.759132353179808, 2.789020371858876),
		new google.maps.LatLng(42.759214714210174, 2.788837040328887),
		new google.maps.LatLng(42.759243302311525, 2.788742979419108),
		new google.maps.LatLng(42.759280833213992, 2.788624482878174),
		new google.maps.LatLng(42.759348814365168, 2.788444863455133),
		new google.maps.LatLng(42.759436513952735, 2.788233445687351),
		new google.maps.LatLng(42.759528821930161, 2.788079361593069),
		new google.maps.LatLng(42.759544032494325, 2.788041478903878),
		new google.maps.LatLng(42.759578940369856, 2.787960817319883),
		new google.maps.LatLng(42.759656764788204, 2.78775797667475),
		new google.maps.LatLng(42.759670167452313, 2.787715219238661),
		new google.maps.LatLng(42.759686253623684, 2.787665132005394),
		new google.maps.LatLng(42.759731783051393, 2.787500234691485),
		new google.maps.LatLng(42.759760270443806, 2.787356143034121),
		new google.maps.LatLng(42.759766499052546, 2.787323174123786),
		new google.maps.LatLng(42.759815637685925, 2.7871643652396),
		new google.maps.LatLng(42.759851397390271, 2.787060515143205),
		new google.maps.LatLng(42.759857657345499, 2.787043408964254),
		new google.maps.LatLng(42.759906831601015, 2.786902902223484),
		new google.maps.LatLng(42.759939900754546, 2.786802721391027),
		new google.maps.LatLng(42.759967558627835, 2.786694019201763)
	],
	[
		new google.maps.LatLng(42.750232401769686, 2.788940394839066),
		new google.maps.LatLng(42.750228047262659, 2.789012392475477),
		new google.maps.LatLng(42.750200464770259, 2.78916011660239),
		new google.maps.LatLng(42.750172004826076, 2.78931882275654),
		new google.maps.LatLng(42.750071111424418, 2.789680315314112),
		new google.maps.LatLng(42.750055034254181, 2.78973527424237),
		new google.maps.LatLng(42.749885297215037, 2.790297097857386),
		new google.maps.LatLng(42.74986653246458, 2.790356946797184),
		new google.maps.LatLng(42.749729858360801, 2.790814946376385)
	],
	[
		new google.maps.LatLng(42.749729858360801, 2.790814946376385),
		new google.maps.LatLng(42.749578885747134, 2.7913193551168),
		new google.maps.LatLng(42.749546702109519, 2.791414631342024),
		new google.maps.LatLng(42.749488590778597, 2.791585641273584),
		new google.maps.LatLng(42.749440257406249, 2.791699276071361),
		new google.maps.LatLng(42.749420545284536, 2.79173472621678),
		new google.maps.LatLng(42.749223450173908, 2.792103873562739),
		new google.maps.LatLng(42.7489905465265, 2.792554887145533),
		new google.maps.LatLng(42.748904552276933, 2.792722334267503),
		new google.maps.LatLng(42.748861557067812, 2.792806667181323),
		new google.maps.LatLng(42.748777363368674, 2.792975326649296),
		new google.maps.LatLng(42.748736261978216, 2.793109672432669),
		new google.maps.LatLng(42.748722897608779, 2.793173159781181),
		new google.maps.LatLng(42.748715762619895, 2.793203684670952),
		new google.maps.LatLng(42.748704215506166, 2.793276925757445),
		new google.maps.LatLng(42.748625250201073, 2.793826203931936),
		new google.maps.LatLng(42.748606618723926, 2.793956809525009),
		new google.maps.LatLng(42.748530085584619, 2.794369437967236)
	],
	[
		new google.maps.LatLng(42.748530085584619, 2.794369437967236),
		new google.maps.LatLng(42.748442132058614, 2.794923624081731),
		new google.maps.LatLng(42.748340866266602, 2.795570575471555),
		new google.maps.LatLng(42.748320372340544, 2.79566824710594),
		new google.maps.LatLng(42.748287403477278, 2.795825741231195),
		new google.maps.LatLng(42.748261630506029, 2.795984429311513),
		new google.maps.LatLng(42.748251108193841, 2.796124765330443),
		new google.maps.LatLng(42.748254985744019, 2.796272369474467),
		new google.maps.LatLng(42.748274076460156, 2.796382102335444),
		new google.maps.LatLng(42.748308424536681, 2.796477140552809),
		new google.maps.LatLng(42.748340042192574, 2.79655511004807),
		new google.maps.LatLng(42.748377058090561, 2.796634279728467),
		new google.maps.LatLng(42.748396936171183, 2.796685449101191),
		new google.maps.LatLng(42.748406884358062, 2.796715914891028),
		new google.maps.LatLng(42.748415964160948, 2.796762242301665),
		new google.maps.LatLng(42.748420494456184, 2.796780526753501),
		new google.maps.LatLng(42.748428775948675, 2.796880536940494),
		new google.maps.LatLng(42.74842979118629, 2.796941532989395),
		new google.maps.LatLng(42.748429947944317, 2.797024492022364),
		new google.maps.LatLng(42.748433944398514, 2.797235536200438),
		new google.maps.LatLng(42.748432573055688, 2.797461238891409),
		new google.maps.LatLng(42.748436960053851, 2.797879680714111),
		new google.maps.LatLng(42.748434163282163, 2.798304247397572),
		new google.maps.LatLng(42.748448178555009, 2.798584796759358),
		new google.maps.LatLng(42.748465482163098, 2.798701855724245),
		new google.maps.LatLng(42.748479136910838, 2.798790868682716),
		new google.maps.LatLng(42.748487333740044, 2.798846959129193),
		new google.maps.LatLng(42.748541728926995, 2.799084670387801),
		new google.maps.LatLng(42.748548993110326, 2.799122464595713),
		new google.maps.LatLng(42.748583464278134, 2.799284605294034),
		new google.maps.LatLng(42.748604478217004, 2.799462652233998),
		new google.maps.LatLng(42.74861567604799, 2.799680991891067),
		new google.maps.LatLng(42.748624497952051, 2.800071360328052),
		new google.maps.LatLng(42.748630393325307, 2.800339739161298),
		new google.maps.LatLng(42.748649824414869, 2.800634910950182)
	],
	[
		new google.maps.LatLng(42.756112119953542, 2.795524971262414),
		new google.maps.LatLng(42.756187573036591, 2.795485660839416),
		new google.maps.LatLng(42.756237876414176, 2.795459860644629),
		new google.maps.LatLng(42.756317818770583, 2.795416875139842),
		new google.maps.LatLng(42.756428359978401, 2.79538842265059),
		new google.maps.LatLng(42.756513772108377, 2.795384461928993),
		new google.maps.LatLng(42.756571324645563, 2.795387919592242)
	],
	[
		new google.maps.LatLng(42.756571324645563, 2.795387919592242),
		new google.maps.LatLng(42.756525682486576, 2.795500335079428),
		new google.maps.LatLng(42.756496168856401, 2.795583409040265)
	],
	[
		new google.maps.LatLng(42.756496168856401, 2.795583409040265),
		new google.maps.LatLng(42.756499276085322, 2.795798147328092),
		new google.maps.LatLng(42.756500333028441, 2.795881114206339),
		new google.maps.LatLng(42.756496144333383, 2.796042189418576),
		new google.maps.LatLng(42.756487393968307, 2.796169117089597),
		new google.maps.LatLng(42.756485656480528, 2.796200846909092),
		new google.maps.LatLng(42.756479570776833, 2.796310683281782),
		new google.maps.LatLng(42.756478845696719, 2.796402197856299),
		new google.maps.LatLng(42.75648534367766, 2.796509548290079),
		new google.maps.LatLng(42.756488064416622, 2.796521741299709),
		new google.maps.LatLng(42.756501667182825, 2.796582701480099),
		new google.maps.LatLng(42.756530555310775, 2.796643607812079),
		new google.maps.LatLng(42.75658369351946, 2.796689789268899),
		new google.maps.LatLng(42.756696120939807, 2.796707698601571)
	],
	[
		new google.maps.LatLng(42.756696120939807, 2.796707698601571),
		new google.maps.LatLng(42.756719540572583, 2.796729579917081),
		new google.maps.LatLng(42.756733094850198, 2.79676491730534),
		new google.maps.LatLng(42.756725987703184, 2.79681008730263),
		new google.maps.LatLng(42.756724228668425, 2.796830836963304),
		new google.maps.LatLng(42.756735991630514, 2.796869840365835),
		new google.maps.LatLng(42.756749527574577, 2.796895416739543),
		new google.maps.LatLng(42.756773931440435, 2.796962441616177),
		new google.maps.LatLng(42.756781200667817, 2.797002681477178),
		new google.maps.LatLng(42.756769571869455, 2.797034446295652),
		new google.maps.LatLng(42.756741733520784, 2.797052845455503),
		new google.maps.LatLng(42.756693165344643, 2.79704569422905),
		new google.maps.LatLng(42.756606865566702, 2.797055756567887),
		new google.maps.LatLng(42.756564613306686, 2.797059563732366)
	],
	[
		new google.maps.LatLng(42.756564613306686, 2.797059563732366),
		new google.maps.LatLng(42.756574570972418, 2.797094914113824),
		new google.maps.LatLng(42.756575594778312, 2.797160798707288),
		new google.maps.LatLng(42.75656846397186, 2.79719376909622),
		new google.maps.LatLng(42.75653709779494, 2.797248785566933),
		new google.maps.LatLng(42.75653261368047, 2.797254901233336),
		new google.maps.LatLng(42.756505714603072, 2.797295260179751),
		new google.maps.LatLng(42.756488681830106, 2.797322163178166),
		new google.maps.LatLng(42.756474473584674, 2.797416165195957),
		new google.maps.LatLng(42.756474646069911, 2.79750767681124),
		new google.maps.LatLng(42.756467559029382, 2.79756382797714)
	],
	[
		new google.maps.LatLng(42.754976155277149, 2.804498122261045),
		new google.maps.LatLng(42.754982229128515, 2.804377309401438),
		new google.maps.LatLng(42.754979350629959, 2.804278488531132),
		new google.maps.LatLng(42.754973802737538, 2.804194318583662),
		new google.maps.LatLng(42.754971011245502, 2.804143082432759),
		new google.maps.LatLng(42.754985109665228, 2.803985639183036),
		new google.maps.LatLng(42.755012742250642, 2.803853771817457),
		new google.maps.LatLng(42.755077979421486, 2.80363514932797),
		new google.maps.LatLng(42.755131621940606, 2.803467809529337),
		new google.maps.LatLng(42.755160136745715, 2.803327398367034),
		new google.maps.LatLng(42.755185878089101, 2.803145511599253),
		new google.maps.LatLng(42.755206390748675, 2.803053932418607),
		new google.maps.LatLng(42.755223326701376, 2.802973345847558),
		new google.maps.LatLng(42.755259096603616, 2.802867072992827),
		new google.maps.LatLng(42.755304762611765, 2.802763206875109),
		new google.maps.LatLng(42.755329871257231, 2.8027265180488),
		new google.maps.LatLng(42.755409681522927, 2.802610335002802),
		new google.maps.LatLng(42.755526247138476, 2.802434238681674),
		new google.maps.LatLng(42.755617680128566, 2.802282631639567),
		new google.maps.LatLng(42.755709932416977, 2.802087094815346),
		new google.maps.LatLng(42.755786906552039, 2.801896490443636),
		new google.maps.LatLng(42.755834347364058, 2.801780415217264),
		new google.maps.LatLng(42.755925588161695, 2.801525093870532),
		new google.maps.LatLng(42.755952370133649, 2.801421289879047),
		new google.maps.LatLng(42.755975582817463, 2.801332139961261),
		new google.maps.LatLng(42.756041702953006, 2.801107406408966),
		new google.maps.LatLng(42.75611765471033, 2.800850914404066),
		new google.maps.LatLng(42.756166769872941, 2.800668943634761),
		new google.maps.LatLng(42.756213995210807, 2.800438172298606),
		new google.maps.LatLng(42.756242413234105, 2.800247730761288),
		new google.maps.LatLng(42.756240418915695, 2.800142805475955),
		new google.maps.LatLng(42.756239435905805, 2.800097662343411),
		new google.maps.LatLng(42.756227439156113, 2.799932982759591),
		new google.maps.LatLng(42.756237138618026, 2.799830456902342),
		new google.maps.LatLng(42.756241529615956, 2.799774314928264),
		new google.maps.LatLng(42.756260989677251, 2.799602206080004),
		new google.maps.LatLng(42.756298513806207, 2.799473959625779),
		new google.maps.LatLng(42.756334355800689, 2.799407948511342),
		new google.maps.LatLng(42.756375558955725, 2.799323615827441),
		new google.maps.LatLng(42.756402357913196, 2.799229571126788),
		new google.maps.LatLng(42.756429064486476, 2.79908672010517),
		new google.maps.LatLng(42.756460223156061, 2.798920671046931),
		new google.maps.LatLng(42.756503915422364, 2.798725294185962),
		new google.maps.LatLng(42.756528778995957, 2.79855926644859),
		new google.maps.LatLng(42.756532208179763, 2.798470182687412),
		new google.maps.LatLng(42.756523033050456, 2.798372601770742),
		new google.maps.LatLng(42.756503923932662, 2.798251872225406),
		new google.maps.LatLng(42.756480269845639, 2.798105534455431),
		new google.maps.LatLng(42.756472079141794, 2.798053096940192),
		new google.maps.LatLng(42.756444702103707, 2.79783966444871),
		new google.maps.LatLng(42.756441038337755, 2.797804292244107),
		new google.maps.LatLng(42.756433665673697, 2.797709145333488),
		new google.maps.LatLng(42.756441612617188, 2.797632247612541),
		new google.maps.LatLng(42.756467559029382, 2.79756382797714)
	],
	[
		new google.maps.LatLng(42.748649824414869, 2.800634910950182),
		new google.maps.LatLng(42.748651672761817, 2.800661743939384),
		new google.maps.LatLng(42.748689251870957, 2.801045914014),
		new google.maps.LatLng(42.748715016677792, 2.801363025021492),
		new google.maps.LatLng(42.748728054749137, 2.801605760346288),
		new google.maps.LatLng(42.748713154755343, 2.801814430607699)
	],
	[
		new google.maps.LatLng(42.747732083528888, 2.803711173330258),
		new google.maps.LatLng(42.748296087179448, 2.802862600379062),
		new google.maps.LatLng(42.748432340751108, 2.802636440291773),
		new google.maps.LatLng(42.748531774372125, 2.802434804805057),
		new google.maps.LatLng(42.748592618776797, 2.802273558850919),
		new google.maps.LatLng(42.748648888446944, 2.802069628222915),
		new google.maps.LatLng(42.748713154755343, 2.801814430607699)
	],
	[
		new google.maps.LatLng(42.747994307040543, 2.804023824866801),
		new google.maps.LatLng(42.747935793023437, 2.803986202446578),
		new google.maps.LatLng(42.747788910240054, 2.80380980067296),
		new google.maps.LatLng(42.747732083528888, 2.803711173330258)
	],
	[
		new google.maps.LatLng(42.754976155277149, 2.804498122261045),
		new google.maps.LatLng(42.754962804298955, 2.80457259472723),
		new google.maps.LatLng(42.754937883572694, 2.804712993526257),
		new google.maps.LatLng(42.754900479784311, 2.804910779742508),
		new google.maps.LatLng(42.754847747915434, 2.805085434790783),
		new google.maps.LatLng(42.754748324257193, 2.805295628158479),
		new google.maps.LatLng(42.754680370370735, 2.805505717097778),
		new google.maps.LatLng(42.754644005723577, 2.805781584988552),
		new google.maps.LatLng(42.754639544916252, 2.805801121763388),
		new google.maps.LatLng(42.754590434914213, 2.805990405119577),
		new google.maps.LatLng(42.754488347412554, 2.806220127226606),
		new google.maps.LatLng(42.754367399146737, 2.806462112735908)
	],
	[
		new google.maps.LatLng(42.754367399146737, 2.806462112735908),
		new google.maps.LatLng(42.754356649594328, 2.806484111047695),
		new google.maps.LatLng(42.754296664876669, 2.806627062896698),
		new google.maps.LatLng(42.754291294225048, 2.806640502805671),
		new google.maps.LatLng(42.754228624559076, 2.806790783877899),
		new google.maps.LatLng(42.754114982685628, 2.807096189006982),
		new google.maps.LatLng(42.754097975331518, 2.807138949616221),
		new google.maps.LatLng(42.7540290532231, 2.80731243293452),
		new google.maps.LatLng(42.753994997365794, 2.807374771494319),
		new google.maps.LatLng(42.753920621358006, 2.807515329272973),
		new google.maps.LatLng(42.753852553260344, 2.807664407383347),
		new google.maps.LatLng(42.753807770945635, 2.80776216398119),
		new google.maps.LatLng(42.753719928320109, 2.80791496649907),
		new google.maps.LatLng(42.75364543554354, 2.807990858936825),
		new google.maps.LatLng(42.753581656998833, 2.80802523109861)
	],
	[
		new google.maps.LatLng(42.753581656998833, 2.80802523109861),
		new google.maps.LatLng(42.753479161192075, 2.808029229607891),
		new google.maps.LatLng(42.753379373718282, 2.808039320374174),
		new google.maps.LatLng(42.753221155003722, 2.808056923070716),
		new google.maps.LatLng(42.753121405145897, 2.808087755085581),
		new google.maps.LatLng(42.752925496904574, 2.808146964506777),
		new google.maps.LatLng(42.752706260753911, 2.808234312985832),
		new google.maps.LatLng(42.752668533603917, 2.808255178472673),
		new google.maps.LatLng(42.752504152374904, 2.808346006480426),
		new google.maps.LatLng(42.752352386869099, 2.80845265229115)
	],
	[
		new google.maps.LatLng(42.752352386869099, 2.80845265229115),
		new google.maps.LatLng(42.752401232855355, 2.808615981581946),
		new google.maps.LatLng(42.752424000711784, 2.808778176202374),
		new google.maps.LatLng(42.752431633901047, 2.809024606552423),
		new google.maps.LatLng(42.75244474996294, 2.809321041371312),
		new google.maps.LatLng(42.752447759771933, 2.809496722338568),
		new google.maps.LatLng(42.752441554184429, 2.809546765174217),
		new google.maps.LatLng(42.752409252347803, 2.809584693219933),
		new google.maps.LatLng(42.752340096197301, 2.809628842447591),
		new google.maps.LatLng(42.752265500225512, 2.809647386932992),
		new google.maps.LatLng(42.752221574163585, 2.809721955094531),
		new google.maps.LatLng(42.752183028123085, 2.809787965363165),
		new google.maps.LatLng(42.752095186835177, 2.809943200467774),
		new google.maps.LatLng(42.752072846662109, 2.810021358145423),
		new google.maps.LatLng(42.75206849803395, 2.810104337103221),
		new google.maps.LatLng(42.752061400721253, 2.810158042139004)
	],
	[
		new google.maps.LatLng(42.752061400721253, 2.810158042139004),
		new google.maps.LatLng(42.752022795979862, 2.810191109993902),
		new google.maps.LatLng(42.751945497793237, 2.810207223734125),
		new google.maps.LatLng(42.751832218443468, 2.810214912623712),
		new google.maps.LatLng(42.751702761325205, 2.810226315773418),
		new google.maps.LatLng(42.75162097425671, 2.81024610417411),
		new google.maps.LatLng(42.751571622353417, 2.810303606629926),
		new google.maps.LatLng(42.751514201038482, 2.810373337121679),
		new google.maps.LatLng(42.751480139440034, 2.8104332307971)
	],
	[
		new google.maps.LatLng(42.751480139440034, 2.8104332307971),
		new google.maps.LatLng(42.751400018262927, 2.810378590186044)
	]
];

var circuit_3 = [
	[
		new google.maps.LatLng(42.745611544492284, 2.806977982468478),
		new google.maps.LatLng(42.74573341309916, 2.806748230368332),
		new google.maps.LatLng(42.746073229811749, 2.806217648071155),
		new google.maps.LatLng(42.746728703501432, 2.80522486240104),
		new google.maps.LatLng(42.74761013801897, 2.803895801521206)
	],
	[
		new google.maps.LatLng(42.747994307040543, 2.804023824866801),
		new google.maps.LatLng(42.747865718680828, 2.804018157399393),
		new google.maps.LatLng(42.747791059160768, 2.804001329510629),
		new google.maps.LatLng(42.747740662397391, 2.803977099584939),
		new google.maps.LatLng(42.74761013801897, 2.803895801521206)
	],
	[
		new google.maps.LatLng(42.745532665947842, 2.807114876271541),
		new google.maps.LatLng(42.745611544492284, 2.806977982468478)
	],
	[
		new google.maps.LatLng(42.745094037892997, 2.808202059020918),
		new google.maps.LatLng(42.745161276736525, 2.808092044743837),
		new google.maps.LatLng(42.74525605179317, 2.807794070374571),
		new google.maps.LatLng(42.7453035027794, 2.807680461054832),
		new google.maps.LatLng(42.74547178193275, 2.807257809934213),
		new google.maps.LatLng(42.745507595715516, 2.807173515292358),
		new google.maps.LatLng(42.745508493007605, 2.807172293496651),
		new google.maps.LatLng(42.745532665947842, 2.807114876271541)
	],
	[
		new google.maps.LatLng(42.745094037892997, 2.808202059020918),
		new google.maps.LatLng(42.745089749582725, 2.808317965813761),
		new google.maps.LatLng(42.745045984831485, 2.808481579392149),
		new google.maps.LatLng(42.744929872419831, 2.808916251946198),
		new google.maps.LatLng(42.744776233256296, 2.809485235675154),
		new google.maps.LatLng(42.744765519567018, 2.809527967373158),
		new google.maps.LatLng(42.744701247278279, 2.809790459474685),
		new google.maps.LatLng(42.744570903975593, 2.810315446326158),
		new google.maps.LatLng(42.744407446108177, 2.810929590917564)
	],
	[
		new google.maps.LatLng(42.75124374535325, 2.811499103695862),
		new google.maps.LatLng(42.751247151455544, 2.811390509093189),
		new google.maps.LatLng(42.751271137954681, 2.81122572360747),
		new google.maps.LatLng(42.751312052801403, 2.810973041608174),
		new google.maps.LatLng(42.751344025542444, 2.810748448270783),
		new google.maps.LatLng(42.75136794961535, 2.810548281209862),
		new google.maps.LatLng(42.751400018262927, 2.810378590186044)
	],
	[
		new google.maps.LatLng(42.744407446108177, 2.810929590917564),
		new google.maps.LatLng(42.744388691643231, 2.811001626585786),
		new google.maps.LatLng(42.744292103423852, 2.811295936775126),
		new google.maps.LatLng(42.744087121869441, 2.811819938261015),
		new google.maps.LatLng(42.744055763589337, 2.811883475102016),
		new google.maps.LatLng(42.743909717397088, 2.812176721927531),
		new google.maps.LatLng(42.743884631599634, 2.812228038700064),
		new google.maps.LatLng(42.743593236851638, 2.812699855095184),
		new google.maps.LatLng(42.743165384086822, 2.813294093969551),
		new google.maps.LatLng(42.743137580839708, 2.81333443872216),
		new google.maps.LatLng(42.74288105710324, 2.813696344737632),
		new google.maps.LatLng(42.742688215855296, 2.813968992877375),
		new google.maps.LatLng(42.74252228413193, 2.814204957342664),
		new google.maps.LatLng(42.742462198804901, 2.814295418665628),
		new google.maps.LatLng(42.742391485786847, 2.814479844537707)
	],
	[
		new google.maps.LatLng(42.75124374535325, 2.811499103695862),
		new google.maps.LatLng(42.75126355667674, 2.811516120753975),
		new google.maps.LatLng(42.751290587029281, 2.811547753779531)
	],
	[
		new google.maps.LatLng(42.751290587029281, 2.811547753779531),
		new google.maps.LatLng(42.751313148623481, 2.811595263593168),
		new google.maps.LatLng(42.751333017967525, 2.811645221085391),
		new google.maps.LatLng(42.751345730321553, 2.811715942453925),
		new google.maps.LatLng(42.751348659452184, 2.811847699487062),
		new google.maps.LatLng(42.75134802792207, 2.812000206979512),
		new google.maps.LatLng(42.751349316676709, 2.812222252015012),
		new google.maps.LatLng(42.751343754798533, 2.812640748197927),
		new google.maps.LatLng(42.751343139138299, 2.812803017098488),
		new google.maps.LatLng(42.751343258519256, 2.812871339764959),
		new google.maps.LatLng(42.751343614413344, 2.813075086212695),
		new google.maps.LatLng(42.751354793263509, 2.813298320540198),
		new google.maps.LatLng(42.751382086967183, 2.813481240129267),
		new google.maps.LatLng(42.751422912756539, 2.813690959284271),
		new google.maps.LatLng(42.751437405702347, 2.813751915542905),
		new google.maps.LatLng(42.751470917242607, 2.813892113534235),
		new google.maps.LatLng(42.751512481373894, 2.814009105897516)
	],
	[
		new google.maps.LatLng(42.751512481373894, 2.814009105897516),
		new google.maps.LatLng(42.751550432055865, 2.814116350197103),
		new google.maps.LatLng(42.751609212509784, 2.814310150813546),
		new google.maps.LatLng(42.751645380990077, 2.814427161111763),
		new google.maps.LatLng(42.751700518047102, 2.814594132975883),
		new google.maps.LatLng(42.751811694743019, 2.814930515589481),
		new google.maps.LatLng(42.751861411191705, 2.815082865249826),
		new google.maps.LatLng(42.751989760001543, 2.815471658818787),
		new google.maps.LatLng(42.752177754958097, 2.816037174173168),
		new google.maps.LatLng(42.752316932944844, 2.816450338171089),
		new google.maps.LatLng(42.752421726633877, 2.816737945426455),
		new google.maps.LatLng(42.752448821884805, 2.816808624073805),
		new google.maps.LatLng(42.752544555781419, 2.817057218747316),
		new google.maps.LatLng(42.752670895896316, 2.817326459060107),
		new google.maps.LatLng(42.752770129943926, 2.817518919285497)
	],
	[
		new google.maps.LatLng(42.742207216365621, 2.814510927425233),
		new google.maps.LatLng(42.74223953070446, 2.814479108956671),
		new google.maps.LatLng(42.742276358777268, 2.814458253473682),
		new google.maps.LatLng(42.742321311725746, 2.814455669907577),
		new google.maps.LatLng(42.742368984583528, 2.814466497512846),
		new google.maps.LatLng(42.742391485786847, 2.814479844537707)
	],
	[
		new google.maps.LatLng(42.742391485786847, 2.814479844537707),
		new google.maps.LatLng(42.74240318552043, 2.814485905406146),
		new google.maps.LatLng(42.742431107573672, 2.814513874485242),
		new google.maps.LatLng(42.742459041526331, 2.814549160864633),
		new google.maps.LatLng(42.742478909593046, 2.814599112161385),
		new google.maps.LatLng(42.742485388645036, 2.814706439015161)
	],
	[
		new google.maps.LatLng(42.742147301382992, 2.814700196938155),
		new google.maps.LatLng(42.742144521462301, 2.81465263137545),
		new google.maps.LatLng(42.742157013056506, 2.814596477776623),
		new google.maps.LatLng(42.742183897733824, 2.814545158010936),
		new google.maps.LatLng(42.742207216365621, 2.814510927425233)
	],
	[
		new google.maps.LatLng(42.742321205842984, 2.814914339153725),
		new google.maps.LatLng(42.742287948633852, 2.814920544241526),
		new google.maps.LatLng(42.742249264682393, 2.814908468052582),
		new google.maps.LatLng(42.742214147711891, 2.814879303894243),
		new google.maps.LatLng(42.742188007703746, 2.814841570605916),
		new google.maps.LatLng(42.742168158483153, 2.814802598378034),
		new google.maps.LatLng(42.742153681767114, 2.814750190825147),
		new google.maps.LatLng(42.742147301382992, 2.814700196938155)
	],
	[
		new google.maps.LatLng(42.742485388645036, 2.814706439015161),
		new google.maps.LatLng(42.742479211221571, 2.814773551802469),
		new google.maps.LatLng(42.74246400760358, 2.814821175072299),
		new google.maps.LatLng(42.742438901878295, 2.814861510615339),
		new google.maps.LatLng(42.742404787644368, 2.814892115427023),
		new google.maps.LatLng(42.742367051313735, 2.814908093988469),
		new google.maps.LatLng(42.742321205842984, 2.814914339153725)
	],
	[
		new google.maps.LatLng(42.742321205842984, 2.814914339153725),
		new google.maps.LatLng(42.74233676884279, 2.815075311016302),
		new google.maps.LatLng(42.742335183472854, 2.815198522601133),
		new google.maps.LatLng(42.742331700043685, 2.815264405757178)
	],
	[
		new google.maps.LatLng(42.742331700043685, 2.815264405757178),
		new google.maps.LatLng(42.74232996119342, 2.815298568094458),
		new google.maps.LatLng(42.742313934541187, 2.815390108327716),
		new google.maps.LatLng(42.74229340996834, 2.815480442978779),
		new google.maps.LatLng(42.742280882573304, 2.815515858811616),
		new google.maps.LatLng(42.742210052765735, 2.815633189082916),
		new google.maps.LatLng(42.742149090444663, 2.815737070447465),
		new google.maps.LatLng(42.741780329225932, 2.816194462003752),
		new google.maps.LatLng(42.741626006550142, 2.816386465909765),
		new google.maps.LatLng(42.741447455124877, 2.816606601460836),
		new google.maps.LatLng(42.741315485339697, 2.816725340993565),
		new google.maps.LatLng(42.741181685515627, 2.816825789480801),
		new google.maps.LatLng(42.741116125861062, 2.816871129664872),
		new google.maps.LatLng(42.7407198824895, 2.817033393830667),
		new google.maps.LatLng(42.740708202312845, 2.817038310075468)
	],
	[
		new google.maps.LatLng(42.74046021492174, 2.817140334984302),
		new google.maps.LatLng(42.740346999082703, 2.817184603428477),
		new google.maps.LatLng(42.739839356510878, 2.81740210447103),
		new google.maps.LatLng(42.739668634129913, 2.817468509562669),
		new google.maps.LatLng(42.739652461966301, 2.817475879096539),
		new google.maps.LatLng(42.739617420474559, 2.817490627323324),
		new google.maps.LatLng(42.739114246891305, 2.817692251325492),
		new google.maps.LatLng(42.738912976721394, 2.817772168199578),
		new google.maps.LatLng(42.738531105317328, 2.817925835530675),
		new google.maps.LatLng(42.738195950696841, 2.818057399871709),
		new google.maps.LatLng(42.737922797328572, 2.81816559448432),
		new google.maps.LatLng(42.737599337159189, 2.818300778456975),
		new google.maps.LatLng(42.737366622336282, 2.818395426805143),
		new google.maps.LatLng(42.737160899261021, 2.818500967300721)
	],
	[
		new google.maps.LatLng(42.752797193623728, 2.817571298158099),
		new google.maps.LatLng(42.752906353305626, 2.817784471325637)
	],
	[
		new google.maps.LatLng(42.752906353305626, 2.817784471325637),
		new google.maps.LatLng(42.752967702510524, 2.817906287400493),
		new google.maps.LatLng(42.753149982511808, 2.818290045412862),
		new google.maps.LatLng(42.753181563989102, 2.818355830911076)
	],
	[
		new google.maps.LatLng(42.753181563989102, 2.818355830911076),
		new google.maps.LatLng(42.75329706801719, 2.818599489036662),
		new google.maps.LatLng(42.753348503015921, 2.818707916454572),
		new google.maps.LatLng(42.753536164052356, 2.819085562773939),
		new google.maps.LatLng(42.753703125809132, 2.819452293171345),
		new google.maps.LatLng(42.753821334297974, 2.819702048221826),
		new google.maps.LatLng(42.753932310792216, 2.819928643984201)
	],
	[
		new google.maps.LatLng(42.737160899261021, 2.818500967300721),
		new google.maps.LatLng(42.737043234347873, 2.818573299107368),
		new google.maps.LatLng(42.736818716042592, 2.818730125873802),
		new google.maps.LatLng(42.736547576828769, 2.81896638106209)
	],
	[
		new google.maps.LatLng(42.736547576828769, 2.81896638106209),
		new google.maps.LatLng(42.736082548464367, 2.81939473256487),
		new google.maps.LatLng(42.736044832606666, 2.819422903385655),
		new google.maps.LatLng(42.735905644632297, 2.819528232102597),
		new google.maps.LatLng(42.735761921301062, 2.819610399084128),
		new google.maps.LatLng(42.735708913260211, 2.819634957740592)
	],
	[
		new google.maps.LatLng(42.735690941210869, 2.81964111267119),
		new google.maps.LatLng(42.735628049647552, 2.819669361358324),
		new google.maps.LatLng(42.735273119192115, 2.819804628916818),
		new google.maps.LatLng(42.735097904216836, 2.819873475586641)
	],
	[
		new google.maps.LatLng(42.735097904216836, 2.819873475586641),
		new google.maps.LatLng(42.734409614039855, 2.820139059392488),
		new google.maps.LatLng(42.734048377758604, 2.820267023580052),
		new google.maps.LatLng(42.733917209577157, 2.820329632498624),
		new google.maps.LatLng(42.733909125771049, 2.820334535926619)
	],
	[
		new google.maps.LatLng(42.753932310792216, 2.819928643984201),
		new google.maps.LatLng(42.754015384424321, 2.820138244704192),
		new google.maps.LatLng(42.754077754987669, 2.82033448908783),
		new google.maps.LatLng(42.754132993406884, 2.820567360204555),
		new google.maps.LatLng(42.754184677809882, 2.820825864175875),
		new google.maps.LatLng(42.754214751115946, 2.82106613367366),
		new google.maps.LatLng(42.754218402934242, 2.821099065207015),
		new google.maps.LatLng(42.754242311545354, 2.821417440903092),
		new google.maps.LatLng(42.754246006090959, 2.821475994526467),
		new google.maps.LatLng(42.75425434970763, 2.821627262766289)
	],
	[
		new google.maps.LatLng(42.733909125771049, 2.820334535926619),
		new google.maps.LatLng(42.733846241715646, 2.820367661823735),
		new google.maps.LatLng(42.733604619431858, 2.82051354854369),
		new google.maps.LatLng(42.733278726614842, 2.820807275149664),
		new google.maps.LatLng(42.733228469823906, 2.82086353477957),
		new google.maps.LatLng(42.733074115269517, 2.821040862099061),
		new google.maps.LatLng(42.733012230479616, 2.821133746901388),
		new google.maps.LatLng(42.732930615724555, 2.821257182950379),
		new google.maps.LatLng(42.732712660436661, 2.821577403908696),
		new google.maps.LatLng(42.732261509063008, 2.822245935811374),
		new google.maps.LatLng(42.732109947020831, 2.822481789808019)
	],
	[
		new google.maps.LatLng(42.75425434970763, 2.821627262766289),
		new google.maps.LatLng(42.754259004349088, 2.821722416941518),
		new google.maps.LatLng(42.754271220418211, 2.822039608740437),
		new google.maps.LatLng(42.754286171590181, 2.82237997543905),
		new google.maps.LatLng(42.754378605085812, 2.82445388695474)
	],
	[
		new google.maps.LatLng(42.732109947020831, 2.822481789808019),
		new google.maps.LatLng(42.73208483955959, 2.822523335456888),
		new google.maps.LatLng(42.732069595703685, 2.822547774628377),
		new google.maps.LatLng(42.73203731595892, 2.822601536674743)
	],
	[
		new google.maps.LatLng(42.73203731595892, 2.822601536674743),
		new google.maps.LatLng(42.731922560158971, 2.822803128590863),
		new google.maps.LatLng(42.731705832742293, 2.823324573456236)
	],
	[
		new google.maps.LatLng(42.731705832742293, 2.823324573456236),
		new google.maps.LatLng(42.731374536454254, 2.824164686030813),
		new google.maps.LatLng(42.731281531308532, 2.824472314404472),
		new google.maps.LatLng(42.731195808154069, 2.824834802686811),
		new google.maps.LatLng(42.731140419479765, 2.825053282051606),
		new google.maps.LatLng(42.731101980218178, 2.82518999564968),
		new google.maps.LatLng(42.731030330544272, 2.825362178473507),
		new google.maps.LatLng(42.730866374816593, 2.825721239039112),
		new google.maps.LatLng(42.730712224574717, 2.826029044065606),
		new google.maps.LatLng(42.730632461725399, 2.82618905197098),
		new google.maps.LatLng(42.730540144665454, 2.82636983098552),
		new google.maps.LatLng(42.730467554789762, 2.826512807337234),
		new google.maps.LatLng(42.730417356425974, 2.826611680050874)
	],
	[
		new google.maps.LatLng(42.754378605085812, 2.82445388695474),
		new google.maps.LatLng(42.754379532543474, 2.824470966219753),
		new google.maps.LatLng(42.754409001835384, 2.824896697625172),
		new google.maps.LatLng(42.75442362897099, 2.82504428776059),
		new google.maps.LatLng(42.75447166847708, 2.825279625467894),
		new google.maps.LatLng(42.75477743330385, 2.826419522295268),
		new google.maps.LatLng(42.755182733754332, 2.827958118160671),
		new google.maps.LatLng(42.755256019050165, 2.828240972434224),
		new google.maps.LatLng(42.755422483198863, 2.828878613062746)
	],
	[
		new google.maps.LatLng(42.730417356425974, 2.826611680050874),
		new google.maps.LatLng(42.730104562703737, 2.827232171869229),
		new google.maps.LatLng(42.729906471404767, 2.827614494285542),
		new google.maps.LatLng(42.729775557775532, 2.827838068408149),
		new google.maps.LatLng(42.729657147446957, 2.828009162960525),
		new google.maps.LatLng(42.729503703101997, 2.828199872559271),
		new google.maps.LatLng(42.729452536871648, 2.828252465555334)
	],
	[
		new google.maps.LatLng(42.729452536871648, 2.828252465555334),
		new google.maps.LatLng(42.729435493072842, 2.828276908486225),
		new google.maps.LatLng(42.72920120670684, 2.828517857791863),
		new google.maps.LatLng(42.729051267380498, 2.828652453158496),
		new google.maps.LatLng(42.729013562944381, 2.828689151943421),
		new google.maps.LatLng(42.728990222626066, 2.828712393318506)
	],
	[
		new google.maps.LatLng(42.728990222626066, 2.828712393318506),
		new google.maps.LatLng(42.728936360821464, 2.828766212802705),
		new google.maps.LatLng(42.728832259269588, 2.828889696435857),
		new google.maps.LatLng(42.728715626865245, 2.829048583768591),
		new google.maps.LatLng(42.728606201910985, 2.82921720729799),
		new google.maps.LatLng(42.72853271457609, 2.829368649142401),
		new google.maps.LatLng(42.728498705832685, 2.82946753414597),
		new google.maps.LatLng(42.728225749817327, 2.830272027719269),
		new google.maps.LatLng(42.728099633124216, 2.830689486508276),
		new google.maps.LatLng(42.727985147800297, 2.831071541552459),
		new google.maps.LatLng(42.727857240281089, 2.831495100106646),
		new google.maps.LatLng(42.727689962744499, 2.832041945077113),
		new google.maps.LatLng(42.727563866461665, 2.832476468631749),
		new google.maps.LatLng(42.727492344571445, 2.832737658690788),
		new google.maps.LatLng(42.727451326810986, 2.832957295326896),
		new google.maps.LatLng(42.727409495905846, 2.833231814374296),
		new google.maps.LatLng(42.727370376661945, 2.833516081013909),
		new google.maps.LatLng(42.72733748453512, 2.833757645111062),
		new google.maps.LatLng(42.727312638057164, 2.833969916767597)
	],
	[
		new google.maps.LatLng(42.755422483198863, 2.828878613062746),
		new google.maps.LatLng(42.755731835813059, 2.83003683791046),
		new google.maps.LatLng(42.756140662294591, 2.831563273241838),
		new google.maps.LatLng(42.75624288078366, 2.831954646820424),
		new google.maps.LatLng(42.756266406033006, 2.832048530732731)
	],
	[
		new google.maps.LatLng(42.756266406033006, 2.832048530732731),
		new google.maps.LatLng(42.75627284118945, 2.832073052676102),
		new google.maps.LatLng(42.756601083240859, 2.833323853095686),
		new google.maps.LatLng(42.75664368634412, 2.833544579663056)
	],
	[
		new google.maps.LatLng(42.75664368634412, 2.833544579663056),
		new google.maps.LatLng(42.756668262823446, 2.833737295768305),
		new google.maps.LatLng(42.756671985737405, 2.833819035839769)
	],
	[
		new google.maps.LatLng(42.756671985737405, 2.833819035839769),
		new google.maps.LatLng(42.7566757530792, 2.833928839861817),
		new google.maps.LatLng(42.756643995668313, 2.834324262575634),
		new google.maps.LatLng(42.756457237955949, 2.835664526950194),
		new google.maps.LatLng(42.756330115351467, 2.836616607194628),
		new google.maps.LatLng(42.756227014404907, 2.837406335855066)
	],
	[
		new google.maps.LatLng(42.727098191283595, 2.83483884338184),
		new google.maps.LatLng(42.727116085410408, 2.834781473252773),
		new google.maps.LatLng(42.727177887479385, 2.834627636454836),
		new google.maps.LatLng(42.727198450309054, 2.834551966028377),
		new google.maps.LatLng(42.727208284697717, 2.834515351241442),
		new google.maps.LatLng(42.727244914277094, 2.834364023433673),
		new google.maps.LatLng(42.727279691680486, 2.834177334149769),
		new google.maps.LatLng(42.727312638057164, 2.833969916767597)
	],
	[
		new google.maps.LatLng(42.726996174340208, 2.835152554017195),
		new google.maps.LatLng(42.727048075194453, 2.834991427558161),
		new google.maps.LatLng(42.727086555442597, 2.834873023136574),
		new google.maps.LatLng(42.727098191283595, 2.83483884338184)
	],
	[
		new google.maps.LatLng(42.726355780275625, 2.836772679639459),
		new google.maps.LatLng(42.726457075856302, 2.836572393260347),
		new google.maps.LatLng(42.726577173247975, 2.836319612817224),
		new google.maps.LatLng(42.726700802441115, 2.836025358086291),
		new google.maps.LatLng(42.726806444729597, 2.835728712618307),
		new google.maps.LatLng(42.726821665900957, 2.835687205766841),
		new google.maps.LatLng(42.726909379369637, 2.835425976495135),
		new google.maps.LatLng(42.726967539002572, 2.835241661452822),
		new google.maps.LatLng(42.726996174340208, 2.835152554017195)
	],
	[
		new google.maps.LatLng(42.725978321734189, 2.837478619354116),
		new google.maps.LatLng(42.726068894431791, 2.837321049339274),
		new google.maps.LatLng(42.726266139164572, 2.836950981179124),
		new google.maps.LatLng(42.726355780275625, 2.836772679639459)
	],
	[
		new google.maps.LatLng(42.725866221919219, 2.837670397053186),
		new google.maps.LatLng(42.725920034836882, 2.837581221423164),
		new google.maps.LatLng(42.725978321734189, 2.837478619354116)
	],
	[
		new google.maps.LatLng(42.756227014404907, 2.837406335855066),
		new google.maps.LatLng(42.756218137738827, 2.837482010132274),
		new google.maps.LatLng(42.756213697646622, 2.837518626223666),
		new google.maps.LatLng(42.756207464953661, 2.837558909533427)
	],
	[
		new google.maps.LatLng(42.756207464953661, 2.837558909533427),
		new google.maps.LatLng(42.756193252166597, 2.837673643047815)
	],
	[
		new google.maps.LatLng(42.725866221919219, 2.837670397053186),
		new google.maps.LatLng(42.725796268549253, 2.837787664872459),
		new google.maps.LatLng(42.725615940245589, 2.83804914290427),
		new google.maps.LatLng(42.725394324553136, 2.838359514110917),
		new google.maps.LatLng(42.725179895055931, 2.838664985091204),
		new google.maps.LatLng(42.724965467281386, 2.838972892363062),
		new google.maps.LatLng(42.724700777877437, 2.839340691377087),
		new google.maps.LatLng(42.724409190326583, 2.839759780165424),
		new google.maps.LatLng(42.72407541607776, 2.840227759734824),
		new google.maps.LatLng(42.723770354744914, 2.840657850471422),
		new google.maps.LatLng(42.723510154855724, 2.841025622430991),
		new google.maps.LatLng(42.723462601414433, 2.841092823023908),
		new google.maps.LatLng(42.723141383512001, 2.841543680411049),
		new google.maps.LatLng(42.723045380006461, 2.841680520525776),
		new google.maps.LatLng(42.722933225480574, 2.84184057478361),
		new google.maps.LatLng(42.722931432744588, 2.841844237471164),
		new google.maps.LatLng(42.722751078972919, 2.842094714900326),
		new google.maps.LatLng(42.722736721704351, 2.842114265429661)
	],
	[
		new google.maps.LatLng(42.756193252166597, 2.837673643047815),
		new google.maps.LatLng(42.756178142546823, 2.837789599291301),
		new google.maps.LatLng(42.756005573766288, 2.839027310901608),
		new google.maps.LatLng(42.755854382770558, 2.840139280999664),
		new google.maps.LatLng(42.75574050882301, 2.840957088973849),
		new google.maps.LatLng(42.755710264787133, 2.841178018010526)
	],
	[
		new google.maps.LatLng(42.755710264787133, 2.841178018010526),
		new google.maps.LatLng(42.755646201953546, 2.841634524750978),
		new google.maps.LatLng(42.75559651231405, 2.842083671356782),
		new google.maps.LatLng(42.755582514430543, 2.842347259214017)
	],
	[
		new google.maps.LatLng(42.722575200169182, 2.842331764451716),
		new google.maps.LatLng(42.722621864329561, 2.842270665672654),
		new google.maps.LatLng(42.722691855440445, 2.842175358638064),
		new google.maps.LatLng(42.722736721704351, 2.842114265429661)
	],
	[
		new google.maps.LatLng(42.721299134765225, 2.844028995130498),
		new google.maps.LatLng(42.721419292355854, 2.843806738880225),
		new google.maps.LatLng(42.721563710778256, 2.843573440311576),
		new google.maps.LatLng(42.721616639032803, 2.843491596757631),
		new google.maps.LatLng(42.721674955765231, 2.843404860432805),
		new google.maps.LatLng(42.721805971663485, 2.843230129916567),
		new google.maps.LatLng(42.72196036426822, 2.843055334546353),
		new google.maps.LatLng(42.722044740469229, 2.842958771967251),
		new google.maps.LatLng(42.722121038530553, 2.842871986485129),
		new google.maps.LatLng(42.722132708851056, 2.84285976048952),
		new google.maps.LatLng(42.722244914651903, 2.842733854849264),
		new google.maps.LatLng(42.722400196521782, 2.842552958350514),
		new google.maps.LatLng(42.722535716321971, 2.842384307705283),
		new google.maps.LatLng(42.722575200169182, 2.842331764451716)
	],
	[
		new google.maps.LatLng(42.755582514430543, 2.842347259214017),
		new google.maps.LatLng(42.755568422022463, 2.842547400008518),
		new google.maps.LatLng(42.75555958674947, 2.842653575796263),
		new google.maps.LatLng(42.755553464586178, 2.842770725996744),
		new google.maps.LatLng(42.755553641924152, 2.842891519002734),
		new google.maps.LatLng(42.755557411390882, 2.843009863282193),
		new google.maps.LatLng(42.755569279055393, 2.843131844650558),
		new google.maps.LatLng(42.75559282542492, 2.843246473973058),
		new google.maps.LatLng(42.755655169478523, 2.843453730392226),
		new google.maps.LatLng(42.755680504060244, 2.843562254587347),
		new google.maps.LatLng(42.75568691541848, 2.843642766714717),
		new google.maps.LatLng(42.755679862654347, 2.843739177113516),
		new google.maps.LatLng(42.755663803025207, 2.843824630078059),
		new google.maps.LatLng(42.755616356148991, 2.843967513367967),
		new google.maps.LatLng(42.755532010177667, 2.844087313603006)
	],
	[
		new google.maps.LatLng(42.721299134765225, 2.844028995130498),
		new google.maps.LatLng(42.721185288774819, 2.844264648152974),
		new google.maps.LatLng(42.721038232840144, 2.844539410462287),
		new google.maps.LatLng(42.720891169456308, 2.844810512273737),
		new google.maps.LatLng(42.720805149787303, 2.845014383246358),
		new google.maps.LatLng(42.720803356048727, 2.845018045718474),
		new google.maps.LatLng(42.720797977536286, 2.845029035568828)
	],
	[
		new google.maps.LatLng(42.755532010177667, 2.844087313603006),
		new google.maps.LatLng(42.755495180836768, 2.8441118147266),
		new google.maps.LatLng(42.755475448961661, 2.844146031234343),
		new google.maps.LatLng(42.755466500853977, 2.844175338906151)
	],
	[
		new google.maps.LatLng(42.755300993869774, 2.844131857208128),
		new google.maps.LatLng(42.755220060486593, 2.84474458008915),
		new google.maps.LatLng(42.755247183345759, 2.844846998718524),
		new google.maps.LatLng(42.755290437493599, 2.844912770709953),
		new google.maps.LatLng(42.755306734014802, 2.844989595251045),
		new google.maps.LatLng(42.755301523723368, 2.845117722521976),
		new google.maps.LatLng(42.755272038687558, 2.84524713575165),
		new google.maps.LatLng(42.755169747895813, 2.845393823796859),
		new google.maps.LatLng(42.755090883703318, 2.845574612187417),
		new google.maps.LatLng(42.7550831498245, 2.845823539002573),
		new google.maps.LatLng(42.755096884379157, 2.845995539943086),
		new google.maps.LatLng(42.755105135710018, 2.846106549924861),
		new google.maps.LatLng(42.754989539712092, 2.846381383992056),
		new google.maps.LatLng(42.754930397439772, 2.846521854380311)
	],
	[
		new google.maps.LatLng(42.755466500853977, 2.844175338906151),
		new google.maps.LatLng(42.755335177134853, 2.844142746331542),
		new google.maps.LatLng(42.755300993869774, 2.844131857208128)
	],
	[
		new google.maps.LatLng(42.720144728643682, 2.846563555220801),
		new google.maps.LatLng(42.72065009773123, 2.845357448733769),
		new google.maps.LatLng(42.720694000580195, 2.845251244348041)
	],
	[
		new google.maps.LatLng(42.720144728643682, 2.846563555220801),
		new google.maps.LatLng(42.721096261142826, 2.847376837263996),
		new google.maps.LatLng(42.721412236560823, 2.847646720444391)
	],
	[
		new google.maps.LatLng(42.754930397439772, 2.846521854380311),
		new google.maps.LatLng(42.754909121974627, 2.846734212729997)
	],
	[
		new google.maps.LatLng(42.754909121974627, 2.846734212729997),
		new google.maps.LatLng(42.754771935788654, 2.847633803351385),
		new google.maps.LatLng(42.754750576296701, 2.847788815437257),
		new google.maps.LatLng(42.754730227278571, 2.848021911203291)
	],
	[
		new google.maps.LatLng(42.744954792990988, 2.847439920436939),
		new google.maps.LatLng(42.744765019127975, 2.84740138047513),
		new google.maps.LatLng(42.744630120341725, 2.84738221531056),
		new google.maps.LatLng(42.744569900990186, 2.84739823248585),
		new google.maps.LatLng(42.744516867243377, 2.847409351114445),
		new google.maps.LatLng(42.74441533587401, 2.847459633189585),
		new google.maps.LatLng(42.744005780913113, 2.84777787983907),
		new google.maps.LatLng(42.743627656804563, 2.848069202331363),
		new google.maps.LatLng(42.743578259601094, 2.848108366966025),
		new google.maps.LatLng(42.743438196218698, 2.84825145948305),
		new google.maps.LatLng(42.743378105699861, 2.84835896545355)
	],
	[
		new google.maps.LatLng(42.745462000347885, 2.847504466160859),
		new google.maps.LatLng(42.745397257196494, 2.847500977168917),
		new google.maps.LatLng(42.74534330523398, 2.847498678160275),
		new google.maps.LatLng(42.745079809721396, 2.847465211238679),
		new google.maps.LatLng(42.744954792990988, 2.847439920436939)
	],
	[
		new google.maps.LatLng(42.745462000347885, 2.847504466160859),
		new google.maps.LatLng(42.745540306526166, 2.847561598100224),
		new google.maps.LatLng(42.745687859120878, 2.847627087908383)
	],
	[
		new google.maps.LatLng(42.721412236560823, 2.847646720444391),
		new google.maps.LatLng(42.721553573230885, 2.847769512592591)
	],
	[
		new google.maps.LatLng(42.745687859120878, 2.847627087908383),
		new google.maps.LatLng(42.745891123775472, 2.847668033960704)
	],
	[
		new google.maps.LatLng(42.748528387802274, 2.848356525467371),
		new google.maps.LatLng(42.748554452149648, 2.848349137497649),
		new google.maps.LatLng(42.748602968090879, 2.848322171227855),
		new google.maps.LatLng(42.748638907125439, 2.84830377771484),
		new google.maps.LatLng(42.74884285523224, 2.848192225774857),
		new google.maps.LatLng(42.748872502188114, 2.848175069053757),
		new google.maps.LatLng(42.748992885613504, 2.848102774285838),
		new google.maps.LatLng(42.749456450740922, 2.847825842006234),
		new google.maps.LatLng(42.749562466689476, 2.847767004522969),
		new google.maps.LatLng(42.749655905021811, 2.847715519595663),
		new google.maps.LatLng(42.749788012197889, 2.847668813265328),
		new google.maps.LatLng(42.749865321485174, 2.847656410209218),
		new google.maps.LatLng(42.749940863213077, 2.847665973368683),
		new google.maps.LatLng(42.750023643059038, 2.847707237047209),
		new google.maps.LatLng(42.750136155916337, 2.847791124010246),
		new google.maps.LatLng(42.750200976826271, 2.847849516521843),
		new google.maps.LatLng(42.750323419907232, 2.847961438322578),
		new google.maps.LatLng(42.750440466025267, 2.848072155933392),
		new google.maps.LatLng(42.75061148110256, 2.848197373276394),
		new google.maps.LatLng(42.750904852121643, 2.848373513571417)
	],
	[
		new google.maps.LatLng(42.745891123775472, 2.847668033960704),
		new google.maps.LatLng(42.746068262543687, 2.847673670007905),
		new google.maps.LatLng(42.746522367151854, 2.847700540224718),
		new google.maps.LatLng(42.746634770188628, 2.8477075656639),
		new google.maps.LatLng(42.746916267183813, 2.84775318779768),
		new google.maps.LatLng(42.747037716796001, 2.847799228196446),
		new google.maps.LatLng(42.747278108601812, 2.848025513371944),
		new google.maps.LatLng(42.747637315135123, 2.848341767077927),
		new google.maps.LatLng(42.747738092855663, 2.848393963555937),
		new google.maps.LatLng(42.747885588709231, 2.848419198723177),
		new google.maps.LatLng(42.748445695458827, 2.848377480077712),
		new google.maps.LatLng(42.748528387802274, 2.848356525467371)
	],
	[
		new google.maps.LatLng(42.721553573230885, 2.847769512592591),
		new google.maps.LatLng(42.721735500192217, 2.847983656599159)
	],
	[
		new google.maps.LatLng(42.721820108858871, 2.848048065444578),
		new google.maps.LatLng(42.721795791685189, 2.848018861978641),
		new google.maps.LatLng(42.721766988381916, 2.84799698806844),
		new google.maps.LatLng(42.721751691525704, 2.847988492214635),
		new google.maps.LatLng(42.721735500192217, 2.847983656599159)
	],
	[
		new google.maps.LatLng(42.724477636900069, 2.848486241998551),
		new google.maps.LatLng(42.72442274242713, 2.848452238799324),
		new google.maps.LatLng(42.724083470356483, 2.848238494066675),
		new google.maps.LatLng(42.723730768392038, 2.84806502923406),
		new google.maps.LatLng(42.723678594629654, 2.848048092340509),
		new google.maps.LatLng(42.723560757992615, 2.848011815822147),
		new google.maps.LatLng(42.723468145288237, 2.848009619370856),
		new google.maps.LatLng(42.723426788201387, 2.848010946744755),
		new google.maps.LatLng(42.72330904641985, 2.848041740032181)
	],
	[
		new google.maps.LatLng(42.72330904641985, 2.848041740032181),
		new google.maps.LatLng(42.723212026159345, 2.848101747386197)
	],
	[
		new google.maps.LatLng(42.72185438090338, 2.848122360824372),
		new google.maps.LatLng(42.721839940070019, 2.848083377491676),
		new google.maps.LatLng(42.721820108858871, 2.848048065444578)
	],
	[
		new google.maps.LatLng(42.754730227278571, 2.848021911203291),
		new google.maps.LatLng(42.754725800064179, 2.848070728429666),
		new google.maps.LatLng(42.754724934302992, 2.848093912108185),
		new google.maps.LatLng(42.754725105101954, 2.848214704736453),
		new google.maps.LatLng(42.754726163761525, 2.848326952366972),
		new google.maps.LatLng(42.754735398669439, 2.848498965094692)
	],
	[
		new google.maps.LatLng(42.723212026159345, 2.848101747386197),
		new google.maps.LatLng(42.723094347358433, 2.848176441332755)
	],
	[
		new google.maps.LatLng(42.72185438090338, 2.848122360824372),
		new google.maps.LatLng(42.722151506066872, 2.84841547027016)
	],
	[
		new google.maps.LatLng(42.723094347358433, 2.848176441332755),
		new google.maps.LatLng(42.723052126830886, 2.848203378741152)
	],
	[
		new google.maps.LatLng(42.722674698539421, 2.848347038961724),
		new google.maps.LatLng(42.72245619041076, 2.848331754812764),
		new google.maps.LatLng(42.722339263850905, 2.848302793612009),
		new google.maps.LatLng(42.722079267797177, 2.848197379596867)
	],
	[
		new google.maps.LatLng(42.723052126830886, 2.848203378741152),
		new google.maps.LatLng(42.722857155721549, 2.84830144346242),
		new google.maps.LatLng(42.722839180479625, 2.848306369027088)
	],
	[
		new google.maps.LatLng(42.722839180479625, 2.848306369027088),
		new google.maps.LatLng(42.722674698539421, 2.848347038961724)
	],
	[
		new google.maps.LatLng(42.743378105699861, 2.84835896545355),
		new google.maps.LatLng(42.743341381560647, 2.848457871558796),
		new google.maps.LatLng(42.743231318319729, 2.848833880846628),
		new google.maps.LatLng(42.74319194043656, 2.848964510154849),
		new google.maps.LatLng(42.743148248459434, 2.84922445783269),
		new google.maps.LatLng(42.7431278810771, 2.849446527916492),
		new google.maps.LatLng(42.743092938410122, 2.849534449523192),
		new google.maps.LatLng(42.743011240004485, 2.849622491907108),
		new google.maps.LatLng(42.742698691258646, 2.849873372795924),
		new google.maps.LatLng(42.742592682376639, 2.849937079565971),
		new google.maps.LatLng(42.742506406215369, 2.849966578655402)
	],
	[
		new google.maps.LatLng(42.750904852121643, 2.848373513571417),
		new google.maps.LatLng(42.750973236619465, 2.848408716100988)
	],
	[
		new google.maps.LatLng(42.750973236619465, 2.848408716100988),
		new google.maps.LatLng(42.751145095189628, 2.848494892513115),
		new google.maps.LatLng(42.751305234709001, 2.84855913812733),
		new google.maps.LatLng(42.751503126553267, 2.84861596484427),
		new google.maps.LatLng(42.751828764650746, 2.848720042644517),
		new google.maps.LatLng(42.751916021266545, 2.848747877891996),
		new google.maps.LatLng(42.75205727131533, 2.848807293350049),
		new google.maps.LatLng(42.752190473696551, 2.84889845302342),
		new google.maps.LatLng(42.752367819763975, 2.849050501266905),
		new google.maps.LatLng(42.752648748176227, 2.84933039092863)
	],
	[
		new google.maps.LatLng(42.725433066059558, 2.84952033575047),
		new google.maps.LatLng(42.72534659309013, 2.849408364730059),
		new google.maps.LatLng(42.725247536555052, 2.849300085327564),
		new google.maps.LatLng(42.725115008851454, 2.849046773165026),
		new google.maps.LatLng(42.725001469901791, 2.848870239817035),
		new google.maps.LatLng(42.724899710825873, 2.848758310250257),
		new google.maps.LatLng(42.724642308911015, 2.848579714532982),
		new google.maps.LatLng(42.724477636900069, 2.848486241998551)
	],
	[
		new google.maps.LatLng(42.754735398669439, 2.848498965094692),
		new google.maps.LatLng(42.754742715620388, 2.84858679548063),
		new google.maps.LatLng(42.754717691566718, 2.848694231388265),
		new google.maps.LatLng(42.754684751539294, 2.848927359896573),
		new google.maps.LatLng(42.754605376892485, 2.849388769833475),
		new google.maps.LatLng(42.754476595291671, 2.849884470784651),
		new google.maps.LatLng(42.754472145496536, 2.84991742499685)
	],
	[
		new google.maps.LatLng(42.752648748176227, 2.84933039092863),
		new google.maps.LatLng(42.752789292329872, 2.849527679627012),
		new google.maps.LatLng(42.75286769477254, 2.849653145300181)
	],
	[
		new google.maps.LatLng(42.725433066059558, 2.84952033575047),
		new google.maps.LatLng(42.725954333331693, 2.850000698316848),
		new google.maps.LatLng(42.726394503961075, 2.850356885723655),
		new google.maps.LatLng(42.726503402887417, 2.850432216510552),
		new google.maps.LatLng(42.726755402720926, 2.850607182422335)
	],
	[
		new google.maps.LatLng(42.75286769477254, 2.849653145300181),
		new google.maps.LatLng(42.753006540751159, 2.849922425456594)
	],
	[
		new google.maps.LatLng(42.754472145496536, 2.84991742499685),
		new google.maps.LatLng(42.754404125025474, 2.85014210138596),
		new google.maps.LatLng(42.754362917035145, 2.850252018455759)
	],
	[
		new google.maps.LatLng(42.753006540751159, 2.849922425456594),
		new google.maps.LatLng(42.753011047866778, 2.849930954673709),
		new google.maps.LatLng(42.753032687680047, 2.849973601727316)
	],
	[
		new google.maps.LatLng(42.742506406215369, 2.849966578655402),
		new google.maps.LatLng(42.742223296574608, 2.850051478642946),
		new google.maps.LatLng(42.741964452631194, 2.850128995773114),
		new google.maps.LatLng(42.741849439018019, 2.850182965603303),
		new google.maps.LatLng(42.74170926896204, 2.850251637835701),
		new google.maps.LatLng(42.741538654595516, 2.850410656853883)
	],
	[
		new google.maps.LatLng(42.753032687680047, 2.849973601727316),
		new google.maps.LatLng(42.753134578001678, 2.850178313769502),
		new google.maps.LatLng(42.7532256541813, 2.850365972274025),
		new google.maps.LatLng(42.753276181114479, 2.850491512094037),
		new google.maps.LatLng(42.753333995161377, 2.85068413810096)
	],
	[
		new google.maps.LatLng(42.754362917035145, 2.850252018455759),
		new google.maps.LatLng(42.754332459145665, 2.85033262356932)
	],
	[
		new google.maps.LatLng(42.754332459145665, 2.85033262356932),
		new google.maps.LatLng(42.754321711439282, 2.850363154546894),
		new google.maps.LatLng(42.754315443581696, 2.850381471958622)
	],
	[
		new google.maps.LatLng(42.754315443581696, 2.850381471958622),
		new google.maps.LatLng(42.754095721427731, 2.850789552409145),
		new google.maps.LatLng(42.754082276435483, 2.850820089689908)
	],
	[
		new google.maps.LatLng(42.741462318528562, 2.850475505114713),
		new google.maps.LatLng(42.741359934810937, 2.850559937100869)
	],
	[
		new google.maps.LatLng(42.741359934810937, 2.850559937100869),
		new google.maps.LatLng(42.741156157293361, 2.850794668081493),
		new google.maps.LatLng(42.741102317948936, 2.850872876659848)
	],
	[
		new google.maps.LatLng(42.727120520936381, 2.850659904737777),
		new google.maps.LatLng(42.727448636234648, 2.850612720842389),
		new google.maps.LatLng(42.72755381296296, 2.850597816537644),
		new google.maps.LatLng(42.727700396061053, 2.850615732927133),
		new google.maps.LatLng(42.727924386833408, 2.850693209739969),
		new google.maps.LatLng(42.728117815513976, 2.850776863807601),
		new google.maps.LatLng(42.728635082961823, 2.850970670356769)
	],
	[
		new google.maps.LatLng(42.726862497970473, 2.850678860094635),
		new google.maps.LatLng(42.727120520936381, 2.850659904737777)
	],
	[
		new google.maps.LatLng(42.753333995161377, 2.85068413810096),
		new google.maps.LatLng(42.753397807546285, 2.850664453279328),
		new google.maps.LatLng(42.753471564871823, 2.850683785542666)
	],
	[
		new google.maps.LatLng(42.753471564871823, 2.850683785542666),
		new google.maps.LatLng(42.753507839591443, 2.85090574965401)
	],
	[
		new google.maps.LatLng(42.754082276435483, 2.850820089689908),
		new google.maps.LatLng(42.75403927317145, 2.850932449615982),
		new google.maps.LatLng(42.753955024982702, 2.851127882789213)
	],
	[
		new google.maps.LatLng(42.741102317948936, 2.850872876659848),
		new google.maps.LatLng(42.740956049760577, 2.851081842141885),
		new google.maps.LatLng(42.740059511984555, 2.852310048016827),
		new google.maps.LatLng(42.740023684440509, 2.852410164446502)
	],
	[
		new google.maps.LatLng(42.753507839591443, 2.85090574965401),
		new google.maps.LatLng(42.753538721145702, 2.851128947372756),
		new google.maps.LatLng(42.753645097994934, 2.85132877190509)
	],
	[
		new google.maps.LatLng(42.728635082961823, 2.850970670356769),
		new google.maps.LatLng(42.728824009166161, 2.85104945872802),
		new google.maps.LatLng(42.729003037125985, 2.851122175553574),
		new google.maps.LatLng(42.729035424284135, 2.85113550802116),
		new google.maps.LatLng(42.729228844657712, 2.851213066707118),
		new google.maps.LatLng(42.729524820720954, 2.851330610908372),
		new google.maps.LatLng(42.729693094108988, 2.851428968396017),
		new google.maps.LatLng(42.730035995077806, 2.851669574540317),
		new google.maps.LatLng(42.730137696190923, 2.851741273199627),
		new google.maps.LatLng(42.730694797332959, 2.852132570097293)
	],
	[
		new google.maps.LatLng(42.753955024982702, 2.851127882789213),
		new google.maps.LatLng(42.753879740937499, 2.851303770161326)
	],
	[
		new google.maps.LatLng(42.753879740937499, 2.851303770161326),
		new google.maps.LatLng(42.753864505954326, 2.851340412231326),
		new google.maps.LatLng(42.753834050474929, 2.851423456924096),
		new google.maps.LatLng(42.753826869471588, 2.851432015634269)
	],
	[
		new google.maps.LatLng(42.753645097994934, 2.85132877190509),
		new google.maps.LatLng(42.753743362132603, 2.851513975637904)
	],
	[
		new google.maps.LatLng(42.753826869471588, 2.851432015634269),
		new google.maps.LatLng(42.753775697199913, 2.851489491617467),
		new google.maps.LatLng(42.753743362132603, 2.851513975637904)
	],
	[
		new google.maps.LatLng(42.730694797332959, 2.852132570097293),
		new google.maps.LatLng(42.731184361677251, 2.852449650305885)
	],
	[
		new google.maps.LatLng(42.740023684440509, 2.852410164446502),
		new google.maps.LatLng(42.739982730179456, 2.852705462134177),
		new google.maps.LatLng(42.739977592197313, 2.852892106378402),
		new google.maps.LatLng(42.739955291332649, 2.853021463143973),
		new google.maps.LatLng(42.739858437024424, 2.85320589912828),
		new google.maps.LatLng(42.739674546051596, 2.853521072455092),
		new google.maps.LatLng(42.73955979512337, 2.853768981086102),
		new google.maps.LatLng(42.739483714757853, 2.854022890819558),
		new google.maps.LatLng(42.739413008542236, 2.854262148507622),
		new google.maps.LatLng(42.739342304281749, 2.854502625743471),
		new google.maps.LatLng(42.738986085403866, 2.855713549382681),
		new google.maps.LatLng(42.738889378467086, 2.856010196975137),
		new google.maps.LatLng(42.738700391353802, 2.856554689069106)
	],
	[
		new google.maps.LatLng(42.731561303073789, 2.852599929184839),
		new google.maps.LatLng(42.731380506916672, 2.852547942224051),
		new google.maps.LatLng(42.731266246487728, 2.852490602276665),
		new google.maps.LatLng(42.731264438491586, 2.852489694374888),
		new google.maps.LatLng(42.731184361677251, 2.852449650305885)
	],
	[
		new google.maps.LatLng(42.73306354444928, 2.853104726044962),
		new google.maps.LatLng(42.732859266851747, 2.852977176988608),
		new google.maps.LatLng(42.732687452980578, 2.85291906788314),
		new google.maps.LatLng(42.732039828075898, 2.852736537859081),
		new google.maps.LatLng(42.731913902191991, 2.852701486719569),
		new google.maps.LatLng(42.731561303073789, 2.852599929184839)
	],
	[
		new google.maps.LatLng(42.735021103603188, 2.854531723101589),
		new google.maps.LatLng(42.734074286704328, 2.853848624327024),
		new google.maps.LatLng(42.73384837710686, 2.853682095530248),
		new google.maps.LatLng(42.73306354444928, 2.853104726044962)
	],
	[
		new google.maps.LatLng(42.736933712080926, 2.855974784117222),
		new google.maps.LatLng(42.736572802417641, 2.855709773287918),
		new google.maps.LatLng(42.736524665247735, 2.855671840578911),
		new google.maps.LatLng(42.736518796903916, 2.855667215889128),
		new google.maps.LatLng(42.736266777618837, 2.855472683679981),
		new google.maps.LatLng(42.736152469609216, 2.855385146863359),
		new google.maps.LatLng(42.735481039076085, 2.854884292106001),
		new google.maps.LatLng(42.735021103603188, 2.854531723101589)
	],
	[
		new google.maps.LatLng(42.737952988164871, 2.856389423077916),
		new google.maps.LatLng(42.737910717581798, 2.856380987931986),
		new google.maps.LatLng(42.737362051086372, 2.856235971546738)
	],
	[
		new google.maps.LatLng(42.738700391353802, 2.856554689069106),
		new google.maps.LatLng(42.737952988164871, 2.856389423077916)
	]
];

var circuit_23 = [
	[
		new google.maps.LatLng(42.74868826310486, 2.804415546050539),
		new google.maps.LatLng(42.748238124975607, 2.80410596232354),
		new google.maps.LatLng(42.748156214318932, 2.804057438569036),
		new google.maps.LatLng(42.748092344349878, 2.804040573962839),
		new google.maps.LatLng(42.7480455710825, 2.804030972028418),
		new google.maps.LatLng(42.747994307040543, 2.804023824866801)
	],
	[
		new google.maps.LatLng(42.74868826310486, 2.804415546050539),
		new google.maps.LatLng(42.748985301885952, 2.804591448600914),
		new google.maps.LatLng(42.749008704483074, 2.804604789400649)
	],
	[
		new google.maps.LatLng(42.749008704483074, 2.804604789400649),
		new google.maps.LatLng(42.749067215300272, 2.804641193995262),
		new google.maps.LatLng(42.749096027749012, 2.804663057375281)
	],
	[
		new google.maps.LatLng(42.749096027749012, 2.804663057375281),
		new google.maps.LatLng(42.749171664176778, 2.804722583890934)
	],
	[
		new google.maps.LatLng(42.749171664176778, 2.804722583890934),
		new google.maps.LatLng(42.749208640359697, 2.804783460073252),
		new google.maps.LatLng(42.749227578115828, 2.804813896774071),
		new google.maps.LatLng(42.749293590095391, 2.80501985665093),
		new google.maps.LatLng(42.749383186814242, 2.805339198842552),
		new google.maps.LatLng(42.749408520207346, 2.805425734823962),
		new google.maps.LatLng(42.749437564575189, 2.805575698955558),
		new google.maps.LatLng(42.749454822947449, 2.805672022860332)
	],
	[
		new google.maps.LatLng(42.749454822947449, 2.805672022860332),
		new google.maps.LatLng(42.749520175713421, 2.806010967620865),
		new google.maps.LatLng(42.749524725009323, 2.806040233286375)
	],
	[
		new google.maps.LatLng(42.749524725009323, 2.806040233286375),
		new google.maps.LatLng(42.749575535627052, 2.806293826289934)
	],
	[
		new google.maps.LatLng(42.749575535627052, 2.806293826289934),
		new google.maps.LatLng(42.749648143187656, 2.806668129981888),
		new google.maps.LatLng(42.74966808538565, 2.806757124310632)
	],
	[
		new google.maps.LatLng(42.74966808538565, 2.806757124310632),
		new google.maps.LatLng(42.749711569322031, 2.80693754252665)
	],
	[
		new google.maps.LatLng(42.749711569322031, 2.80693754252665),
		new google.maps.LatLng(42.749825739474744, 2.807425171649542),
		new google.maps.LatLng(42.749918879150314, 2.80771888864738)
	],
	[
		new google.maps.LatLng(42.750006281429997, 2.807822302150219),
		new google.maps.LatLng(42.749946907897026, 2.807805417978594),
		new google.maps.LatLng(42.749918879150314, 2.80771888864738)
	],
	[
		new google.maps.LatLng(42.750006281429997, 2.807822302150219),
		new google.maps.LatLng(42.750019092915991, 2.807946702417496),
		new google.maps.LatLng(42.750029156254847, 2.808043051410591)
	],
	[
		new google.maps.LatLng(42.750029156254847, 2.808043051410591),
		new google.maps.LatLng(42.750090553487858, 2.808185591269691),
		new google.maps.LatLng(42.7501465248004, 2.808311069917319),
		new google.maps.LatLng(42.750187137244602, 2.808395117817911),
		new google.maps.LatLng(42.750208832202475, 2.808459707851053),
		new google.maps.LatLng(42.750207170723208, 2.808536574537371),
		new google.maps.LatLng(42.750188526490739, 2.808669619656073),
		new google.maps.LatLng(42.75017345430382, 2.808789231423001)
	],
	[
		new google.maps.LatLng(42.75017345430382, 2.808789231423001),
		new google.maps.LatLng(42.750188037096898, 2.808898985419158),
		new google.maps.LatLng(42.750199858837618, 2.808973368614875)
	],
	[
		new google.maps.LatLng(42.750199858837618, 2.808973368614875),
		new google.maps.LatLng(42.750203487819341, 2.808991657261413),
		new google.maps.LatLng(42.750233315448561, 2.809079401110735),
		new google.maps.LatLng(42.750281099030111, 2.809151226802605),
		new google.maps.LatLng(42.750310826302822, 2.809182849983961)
	],
	[
		new google.maps.LatLng(42.750310826302822, 2.809182849983961),
		new google.maps.LatLng(42.750284899197538, 2.809265896781315),
		new google.maps.LatLng(42.750233904742402, 2.809410026720898),
		new google.maps.LatLng(42.750209762145886, 2.809485748379246)
	],
	[
		new google.maps.LatLng(42.750209762145886, 2.809485748379246),
		new google.maps.LatLng(42.750224272510195, 2.809555242179167),
		new google.maps.LatLng(42.750250444576359, 2.809610057580703),
		new google.maps.LatLng(42.750314375256366, 2.809661089890582),
		new google.maps.LatLng(42.75037740565886, 2.809712125072825),
		new google.maps.LatLng(42.750405305557756, 2.809726673382635)
	],
	[
		new google.maps.LatLng(42.750405305557756, 2.809726673382635),
		new google.maps.LatLng(42.750469197970794, 2.809756965495626),
		new google.maps.LatLng(42.750581651676939, 2.809790759674789),
		new google.maps.LatLng(42.750735484951441, 2.809835397589505)
	],
	[
		new google.maps.LatLng(42.750735484951441, 2.809835397589505),
		new google.maps.LatLng(42.75079217006023, 2.80985717348621),
		new google.maps.LatLng(42.750865983810847, 2.80990451394696),
		new google.maps.LatLng(42.75097763594237, 2.809993212507756),
		new google.maps.LatLng(42.750995644715516, 2.810007793881128),
		new google.maps.LatLng(42.75104695783314, 2.810043007717908)
	],
	[
		new google.maps.LatLng(42.75104695783314, 2.810043007717908),
		new google.maps.LatLng(42.751157691310659, 2.810120729041115),
		new google.maps.LatLng(42.751166695239014, 2.810128019767915),
		new google.maps.LatLng(42.751229719332756, 2.810175396361811),
		new google.maps.LatLng(42.751234219264134, 2.810177822014562),
		new google.maps.LatLng(42.751258528681866, 2.810196042751073)
	],
	[
		new google.maps.LatLng(42.751229015380943, 2.810285203059692),
		new google.maps.LatLng(42.751258528681866, 2.810196042751073)
	],
	[
		new google.maps.LatLng(42.751400018262927, 2.810378590186044),
		new google.maps.LatLng(42.751337925856753, 2.81034951057896),
		new google.maps.LatLng(42.751229015380943, 2.810285203059692)
	]
];

var circuit_6 = [
	[
		new google.maps.LatLng(42.784772268920356, 2.967012919865696),
		new google.maps.LatLng(42.78475790352595, 2.96708128972549)
	],
	[
		new google.maps.LatLng(42.785060943293651, 2.967140935495429),
		new google.maps.LatLng(42.784877482035476, 2.967045819670697),
		new google.maps.LatLng(42.784772268920356, 2.967012919865696)
	],
	[
		new google.maps.LatLng(42.78475790352595, 2.96708128972549),
		new google.maps.LatLng(42.784714807946983, 2.967292502855853),
		new google.maps.LatLng(42.784621418236092, 2.967702726968288)
	],
	[
		new google.maps.LatLng(42.785345125652924, 2.967286045102734),
		new google.maps.LatLng(42.785326239691436, 2.967275068487761),
		new google.maps.LatLng(42.785060943293651, 2.967140935495429)
	],
	[
		new google.maps.LatLng(42.785505206282068, 2.967375070863554),
		new google.maps.LatLng(42.785345125652924, 2.967286045102734)
	],
	[
		new google.maps.LatLng(42.785724640921131, 2.967497024665003),
		new google.maps.LatLng(42.785505206282068, 2.967375070863554)
	],
	[
		new google.maps.LatLng(42.786123029254476, 2.967675035520425),
		new google.maps.LatLng(42.786023215706827, 2.967656779716811),
		new google.maps.LatLng(42.78592519039654, 2.9676080025081),
		new google.maps.LatLng(42.785724640921131, 2.967497024665003)
	],
	[
		new google.maps.LatLng(42.786123029254476, 2.967675035520425),
		new google.maps.LatLng(42.786253411724751, 2.967683508459372),
		new google.maps.LatLng(42.786308264208742, 2.967693244339217)
	],
	[
		new google.maps.LatLng(42.786308264208742, 2.967693244339217),
		new google.maps.LatLng(42.786370310267891, 2.967701755456134),
		new google.maps.LatLng(42.786462937690203, 2.967744430840925)
	],
	[
		new google.maps.LatLng(42.784621418236092, 2.967702726968288),
		new google.maps.LatLng(42.784610642173028, 2.967750341455141),
		new google.maps.LatLng(42.784594480041306, 2.967827257610263),
		new google.maps.LatLng(42.784587302713319, 2.967879752925447),
		new google.maps.LatLng(42.784589115374359, 2.967926141062116)
	],
	[
		new google.maps.LatLng(42.786462937690203, 2.967744430840925),
		new google.maps.LatLng(42.786571754536631, 2.967800526805031)
	],
	[
		new google.maps.LatLng(42.787480071297516, 2.968305438190379),
		new google.maps.LatLng(42.786790290242529, 2.967922484683105),
		new google.maps.LatLng(42.786571754536631, 2.967800526805031)
	],
	[
		new google.maps.LatLng(42.784589115374359, 2.967926141062116),
		new google.maps.LatLng(42.784602616561145, 2.967971300938986),
		new google.maps.LatLng(42.784616119441509, 2.96802256456682),
		new google.maps.LatLng(42.784621524237153, 2.968056742188039)
	],
	[
		new google.maps.LatLng(42.784621524237153, 2.968056742188039),
		new google.maps.LatLng(42.78462963425082, 2.968116554345447),
		new google.maps.LatLng(42.784639555072694, 2.968216650968128),
		new google.maps.LatLng(42.784643192642491, 2.96835459301818),
		new google.maps.LatLng(42.784660365076249, 2.968654887095405)
	],
	[
		new google.maps.LatLng(42.78788476690643, 2.968531067468986),
		new google.maps.LatLng(42.787480071297516, 2.968305438190379)
	],
	[
		new google.maps.LatLng(42.787878487037453, 2.968581125372175),
		new google.maps.LatLng(42.787856055702662, 2.96874594615973),
		new google.maps.LatLng(42.787858764690924, 2.968782570325827),
		new google.maps.LatLng(42.787877655844305, 2.968813079842078),
		new google.maps.LatLng(42.787957699832383, 2.968871636779893),
		new google.maps.LatLng(42.788187025122355, 2.968994816826582),
		new google.maps.LatLng(42.788786868244799, 2.969318017523729),
		new google.maps.LatLng(42.788820142911739, 2.969336312242019),
		new google.maps.LatLng(42.789755433816566, 2.969857124346395),
		new google.maps.LatLng(42.790902960388827, 2.970488943930542),
		new google.maps.LatLng(42.7916089199529, 2.970871945106413)
	],
	[
		new google.maps.LatLng(42.784660365076249, 2.968654887095405),
		new google.maps.LatLng(42.784663976567494, 2.968706157144653),
		new google.maps.LatLng(42.784664907479375, 2.968814802947492),
		new google.maps.LatLng(42.784661335768178, 2.968899036068331),
		new google.maps.LatLng(42.784655956417367, 2.968953972396734),
		new google.maps.LatLng(42.784643387664907, 2.969022340777367),
		new google.maps.LatLng(42.78448711775134, 2.96967430088621)
	],
	[
		new google.maps.LatLng(42.78448711775134, 2.96967430088621),
		new google.maps.LatLng(42.784397307012391, 2.970050336647606)
	],
	[
		new google.maps.LatLng(42.784397307012391, 2.970050336647606),
		new google.maps.LatLng(42.78439102103151, 2.970079637253204),
		new google.maps.LatLng(42.784261660104256, 2.970515507934652)
	],
	[
		new google.maps.LatLng(42.784261660104256, 2.970515507934652),
		new google.maps.LatLng(42.784307570150268, 2.970703478604115),
		new google.maps.LatLng(42.784180903660861, 2.971134462206687),
		new google.maps.LatLng(42.784066809783496, 2.971512945903525),
		new google.maps.LatLng(42.783839519687078, 2.972278454312712),
		new google.maps.LatLng(42.78372544017823, 2.972725294863634),
		new google.maps.LatLng(42.783642780807533, 2.972982907427006),
		new google.maps.LatLng(42.783601456550549, 2.973131854578008),
		new google.maps.LatLng(42.783499909502751, 2.973368721400603),
		new google.maps.LatLng(42.783375882918342, 2.973606819222562),
		new google.maps.LatLng(42.783070278513371, 2.974074490605864),
		new google.maps.LatLng(42.782295424932748, 2.975051394063948)
	],
	[
		new google.maps.LatLng(42.7916089199529, 2.970871945106413),
		new google.maps.LatLng(42.79193896825236, 2.971057357075477),
		new google.maps.LatLng(42.792515430244492, 2.971384274065537),
		new google.maps.LatLng(42.792559496522223, 2.971408670525199),
		new google.maps.LatLng(42.792741158011616, 2.97151113883083),
		new google.maps.LatLng(42.793276248418557, 2.971808782570307),
		new google.maps.LatLng(42.793975014819132, 2.972206470835401),
		new google.maps.LatLng(42.794195344349951, 2.97232479819235),
		new google.maps.LatLng(42.79471244561153, 2.972604150962313),
		new google.maps.LatLng(42.795457973422643, 2.973023815054845),
		new google.maps.LatLng(42.795747550186455, 2.973187291885052),
		new google.maps.LatLng(42.796037127892085, 2.973351991461329),
		new google.maps.LatLng(42.796801538772016, 2.973781432950535),
		new google.maps.LatLng(42.797292559128401, 2.974054719281868)
	],
	[
		new google.maps.LatLng(42.799282708234294, 2.975129579531978),
		new google.maps.LatLng(42.799028208474994, 2.975000257226384),
		new google.maps.LatLng(42.798739534929688, 2.974850193172765),
		new google.maps.LatLng(42.798568666351315, 2.974748920766666),
		new google.maps.LatLng(42.798143295793608, 2.974507341571925),
		new google.maps.LatLng(42.797292559128401, 2.974054719281868)
	],
	[
		new google.maps.LatLng(42.782235157397984, 2.974952543907835),
		new google.maps.LatLng(42.782014026961654, 2.975235838824495),
		new google.maps.LatLng(42.781952912576457, 2.975361595482595),
		new google.maps.LatLng(42.781913376979638, 2.975482460816595),
		new google.maps.LatLng(42.781896320323611, 2.975602096196708),
		new google.maps.LatLng(42.781890938524008, 2.975660691076377)
	],
	[
		new google.maps.LatLng(42.782235157397984, 2.974952543907835),
		new google.maps.LatLng(42.782295424932748, 2.975051394063948)
	],
	[
		new google.maps.LatLng(42.802636195829663, 2.977025770996804),
		new google.maps.LatLng(42.802606509677339, 2.976965948297231),
		new google.maps.LatLng(42.802562442416566, 2.976930553034623),
		new google.maps.LatLng(42.802115490799054, 2.976673075228105),
		new google.maps.LatLng(42.801849297935867, 2.976522986126052),
		new google.maps.LatLng(42.801467097242714, 2.976310668575677),
		new google.maps.LatLng(42.801332202463271, 2.976236236780599),
		new google.maps.LatLng(42.800860072265387, 2.975976338709194),
		new google.maps.LatLng(42.800829495862267, 2.975958034588024),
		new google.maps.LatLng(42.800083978840092, 2.975552948137377),
		new google.maps.LatLng(42.799879839370291, 2.975443138192345),
		new google.maps.LatLng(42.799505732495369, 2.975243042455756),
		new google.maps.LatLng(42.799282708234294, 2.975129579531978)
	],
	[
		new google.maps.LatLng(42.781890938524008, 2.975660691076377),
		new google.maps.LatLng(42.781852313873117, 2.975837706590108),
		new google.maps.LatLng(42.781832548996242, 2.975910955796549),
		new google.maps.LatLng(42.781798396606682, 2.97598176989162),
		new google.maps.LatLng(42.781767835169951, 2.976030610583836)
	],
	[
		new google.maps.LatLng(42.781890938524008, 2.975660691076377),
		new google.maps.LatLng(42.78189726179648, 2.975791301981534),
		new google.maps.LatLng(42.781909874851053, 2.975899938480787),
		new google.maps.LatLng(42.781926080718421, 2.975991482947002),
		new google.maps.LatLng(42.781952174649099, 2.976073258577536)
	],
	[
		new google.maps.LatLng(42.781952174649099, 2.976073258577536),
		new google.maps.LatLng(42.781979155731811, 2.97610132362697),
		new google.maps.LatLng(42.781998949278993, 2.976151363490515),
		new google.maps.LatLng(42.782007951720182, 2.976202628475405),
		new google.maps.LatLng(42.782007066378625, 2.976261222905611)
	],
	[
		new google.maps.LatLng(42.782007066378625, 2.976261222905611),
		new google.maps.LatLng(42.782002581425992, 2.976313714015247),
		new google.maps.LatLng(42.781994499571731, 2.97636010301763),
		new google.maps.LatLng(42.781972029737382, 2.976401616183258),
		new google.maps.LatLng(42.78195135416275, 2.976426037944295),
		new google.maps.LatLng(42.781928880128433, 2.976451681311238)
	],
	[
		new google.maps.LatLng(42.781747247175474, 2.976449313449173),
		new google.maps.LatLng(42.781768839131431, 2.976503015357431),
		new google.maps.LatLng(42.781792232026298, 2.976567702592579),
		new google.maps.LatLng(42.781808430958534, 2.976632392593173),
		new google.maps.LatLng(42.781818338675158, 2.976709291908658),
		new google.maps.LatLng(42.781824677979074, 2.976920467411158)
	],
	[
		new google.maps.LatLng(42.781928880128433, 2.976451681311238),
		new google.maps.LatLng(42.78189563880364, 2.976581088856509),
		new google.maps.LatLng(42.781873184029472, 2.97669217937453),
		new google.maps.LatLng(42.781848929447563, 2.976798389185887),
		new google.maps.LatLng(42.781824677979074, 2.976920467411158)
	],
	[
		new google.maps.LatLng(42.780886246427698, 2.978367331795542),
		new google.maps.LatLng(42.780963565107662, 2.978317254430533),
		new google.maps.LatLng(42.781063357309662, 2.978241535823057),
		new google.maps.LatLng(42.781158656363431, 2.978175584715575),
		new google.maps.LatLng(42.781253950492534, 2.978088880134514),
		new google.maps.LatLng(42.78134834425979, 2.977997294345378),
		new google.maps.LatLng(42.781356436126124, 2.977989967131267),
		new google.maps.LatLng(42.781444532400222, 2.977883734593968),
		new google.maps.LatLng(42.781486868402411, 2.977822308807955),
		new google.maps.LatLng(42.781523636077132, 2.97776896091915),
		new google.maps.LatLng(42.781591047213773, 2.977640763374662),
		new google.maps.LatLng(42.781598237606275, 2.977627332976853),
		new google.maps.LatLng(42.781648571450319, 2.977534541036117),
		new google.maps.LatLng(42.781690811149424, 2.977433209029755),
		new google.maps.LatLng(42.78169889966216, 2.97741367481418),
		new google.maps.LatLng(42.781742032360896, 2.977285485431203),
		new google.maps.LatLng(42.781781562775805, 2.977129221807122),
		new google.maps.LatLng(42.781824677979074, 2.976920467411158)
	],
	[
		new google.maps.LatLng(42.780886246427698, 2.978367331795542),
		new google.maps.LatLng(42.780811624860661, 2.978412523209634),
		new google.maps.LatLng(42.78073818023951, 2.978459476425751),
		new google.maps.LatLng(42.780735205260406, 2.978461379105478),
		new google.maps.LatLng(42.780702839657927, 2.978482142235517),
		new google.maps.LatLng(42.780668675344756, 2.978502905968675),
		new google.maps.LatLng(42.780657361438003, 2.978510239041697),
		new google.maps.LatLng(42.780531119845499, 2.978592064311933)
	],
	[
		new google.maps.LatLng(42.780531119845499, 2.978592064311933),
		new google.maps.LatLng(42.780306358201258, 2.978747170214998),
		new google.maps.LatLng(42.780269497587419, 2.978772818214146)
	],
	[
		new google.maps.LatLng(42.78004385366917, 2.979012148138022),
		new google.maps.LatLng(42.780105884079354, 2.978949872105713),
		new google.maps.LatLng(42.78016791332513, 2.978881492655785),
		new google.maps.LatLng(42.780269497587419, 2.978772818214146)
	],
	[
		new google.maps.LatLng(42.779970138135852, 2.979095178393826),
		new google.maps.LatLng(42.780004303231202, 2.97907807669924),
		new google.maps.LatLng(42.780030372352847, 2.97904633058722),
		new google.maps.LatLng(42.78004385366917, 2.979012148138022)
	],
	[
		new google.maps.LatLng(42.77812006182895, 2.981322235212319),
		new google.maps.LatLng(42.778771779874255, 2.980325997188212),
		new google.maps.LatLng(42.77899201165296, 2.979979264509211),
		new google.maps.LatLng(42.779000101676452, 2.979965834655925),
		new google.maps.LatLng(42.779059429387694, 2.979874266469767),
		new google.maps.LatLng(42.779153817679997, 2.979743626950959),
		new google.maps.LatLng(42.779300347665199, 2.979562922087326),
		new google.maps.LatLng(42.779314730656679, 2.979545827374417),
		new google.maps.LatLng(42.779382155705818, 2.979478669716441),
		new google.maps.LatLng(42.779480145356501, 2.979377321726121),
		new google.maps.LatLng(42.779648257419659, 2.979206372485165),
		new google.maps.LatLng(42.77971927833326, 2.979136769872626),
		new google.maps.LatLng(42.779775918070108, 2.979098910354979),
		new google.maps.LatLng(42.779831662700914, 2.979079359628813),
		new google.maps.LatLng(42.779889208275534, 2.979072014789444)
	],
	[
		new google.maps.LatLng(42.779889208275534, 2.979072014789444),
		new google.maps.LatLng(42.779930574238527, 2.97909275118418),
		new google.maps.LatLng(42.779970138135852, 2.979095178393826)
	],
	[
		new google.maps.LatLng(42.77773891991751, 2.981933878902684),
		new google.maps.LatLng(42.777852183025658, 2.981749531816143),
		new google.maps.LatLng(42.777894432685919, 2.981681164740126),
		new google.maps.LatLng(42.777989717165923, 2.981523677358547),
		new google.maps.LatLng(42.778049045538296, 2.981428450799384),
		new google.maps.LatLng(42.77812006182895, 2.981322235212319)
	],
	[
		new google.maps.LatLng(42.777161804738959, 2.982848279698044),
		new google.maps.LatLng(42.777463849744159, 2.982386805231843),
		new google.maps.LatLng(42.77773891991751, 2.981933878902684)
	],
	[
		new google.maps.LatLng(42.777161804738959, 2.982848279698044),
		new google.maps.LatLng(42.776994604449719, 2.98312784228435),
		new google.maps.LatLng(42.776867853631572, 2.983332937287037),
		new google.maps.LatLng(42.776823806234894, 2.983408626383585)
	],
	[
		new google.maps.LatLng(42.776702451558187, 2.983617380098311),
		new google.maps.LatLng(42.776743802265493, 2.983550236642342),
		new google.maps.LatLng(42.776764477789619, 2.983514833015767),
		new google.maps.LatLng(42.776823806234894, 2.983408626383585)
	],
	[
		new google.maps.LatLng(42.776702451558187, 2.983617380098311),
		new google.maps.LatLng(42.776686270645449, 2.983644236627296),
		new google.maps.LatLng(42.77665570695742, 2.983700392059245),
		new google.maps.LatLng(42.776621551969349, 2.983787063095094),
		new google.maps.LatLng(42.776596385889349, 2.98385420203774)
	],
	[
		new google.maps.LatLng(42.776596385889349, 2.98385420203774),
		new google.maps.LatLng(42.776582891673037, 2.98381392664596),
		new google.maps.LatLng(42.776547817310522, 2.983766333162188),
		new google.maps.LatLng(42.776507350318099, 2.983737051169433),
		new google.maps.LatLng(42.776474080907121, 2.983733398643621)
	],
	[
		new google.maps.LatLng(42.776591015677866, 2.984018981606315),
		new google.maps.LatLng(42.776599104765175, 2.984001890304601),
		new google.maps.LatLng(42.776606288529635, 2.983935978141953),
		new google.maps.LatLng(42.776600883658098, 2.983867626357597),
		new google.maps.LatLng(42.776596385889349, 2.98385420203774)
	],
	[
		new google.maps.LatLng(42.776341950477381, 2.984044682078555),
		new google.maps.LatLng(42.776379722566467, 2.984097155737403),
		new google.maps.LatLng(42.776440869593692, 2.98412277133449),
		new google.maps.LatLng(42.776493920325393, 2.984120316063174),
		new google.maps.LatLng(42.776533480558626, 2.984097113782905),
		new google.maps.LatLng(42.776570340337948, 2.984056824185134),
		new google.maps.LatLng(42.776591015677866, 2.984018981606315)
	],
	[
		new google.maps.LatLng(42.776341950477381, 2.984044682078555),
		new google.maps.LatLng(42.776237663934992, 2.984159443343851),
		new google.maps.LatLng(42.776138774013191, 2.984285189041189),
		new google.maps.LatLng(42.776051574084825, 2.984413371813535),
		new google.maps.LatLng(42.775902344964891, 2.984636775261692)
	],
	[
		new google.maps.LatLng(42.775902344964891, 2.984636775261692),
		new google.maps.LatLng(42.77577918582309, 2.98482599450388),
		new google.maps.LatLng(42.775562534319228, 2.985161703763938)
	],
	[
		new google.maps.LatLng(42.775562534319228, 2.985161703763938),
		new google.maps.LatLng(42.775249690344779, 2.985645121413956),
		new google.maps.LatLng(42.775102258262869, 2.985874620157984),
		new google.maps.LatLng(42.774879311438589, 2.986229851368563)
	],
	[
		new google.maps.LatLng(42.774879311438589, 2.986229851368563),
		new google.maps.LatLng(42.774614111645249, 2.986652220599276)
	],
	[
		new google.maps.LatLng(42.765859017981107, 2.986917824967873),
		new google.maps.LatLng(42.765695363495404, 2.9868568445613),
		new google.maps.LatLng(42.765659395856005, 2.986843427856591),
		new google.maps.LatLng(42.765506531218904, 2.986777564305708),
		new google.maps.LatLng(42.765373448984462, 2.986721459279468),
		new google.maps.LatLng(42.765266444322002, 2.986679991298746),
		new google.maps.LatLng(42.765138760697553, 2.986653173982587),
		new google.maps.LatLng(42.765019171032208, 2.986639776787666),
		new google.maps.LatLng(42.764912172105959, 2.986639802325901),
		new google.maps.LatLng(42.764768308686506, 2.986655698724343),
		new google.maps.LatLng(42.764615457122396, 2.986694784648147),
		new google.maps.LatLng(42.764387079668431, 2.986758293513686)
	],
	[
		new google.maps.LatLng(42.774614111645249, 2.986652220599276),
		new google.maps.LatLng(42.77448465715392, 2.986856079054893),
		new google.maps.LatLng(42.774466677749125, 2.986891478467751)
	],
	[
		new google.maps.LatLng(42.765043031091871, 2.991322197019577),
		new google.maps.LatLng(42.764821723054922, 2.990001832934477),
		new google.maps.LatLng(42.764570707723365, 2.988494774166566),
		new google.maps.LatLng(42.76442584378033, 2.987599086545248),
		new google.maps.LatLng(42.764379040150324, 2.987197610471582),
		new google.maps.LatLng(42.764378133514754, 2.987132933965992),
		new google.maps.LatLng(42.764375424529547, 2.987036529789458),
		new google.maps.LatLng(42.764381700148562, 2.986886428688394),
		new google.maps.LatLng(42.764387079668431, 2.986758293513686)
	],
	[
		new google.maps.LatLng(42.774466677749125, 2.986891478467751),
		new google.maps.LatLng(42.77444690080543, 2.986929319820093),
		new google.maps.LatLng(42.774411843723122, 2.9870135433685),
		new google.maps.LatLng(42.77438668015585, 2.987119735294657),
		new google.maps.LatLng(42.774378598288756, 2.987205175086696)
	],
	[
		new google.maps.LatLng(42.765859017981107, 2.986917824967873),
		new google.maps.LatLng(42.765918366291807, 2.986948320642871),
		new google.maps.LatLng(42.766008286708995, 2.98698979189323),
		new google.maps.LatLng(42.766095508418601, 2.987017840614904),
		new google.maps.LatLng(42.766131475341524, 2.987025154384765),
		new google.maps.LatLng(42.76617373684725, 2.987032468066193),
		new google.maps.LatLng(42.766283434379119, 2.98703732515754),
		new google.maps.LatLng(42.76641561127736, 2.987042176338416),
		new google.maps.LatLng(42.766492039327346, 2.987042159116824)
	],
	[
		new google.maps.LatLng(42.767504488355172, 2.987016306113877),
		new google.maps.LatLng(42.767512576153621, 2.986976031407889),
		new google.maps.LatLng(42.767525160308345, 2.986947959835137),
		new google.maps.LatLng(42.767550335159974, 2.986933309120375),
		new google.maps.LatLng(42.76757820731342, 2.986919878478436),
		new google.maps.LatLng(42.767612376008273, 2.986923532002036),
		new google.maps.LatLng(42.767633957417637, 2.986935731556994),
		new google.maps.LatLng(42.767651043790529, 2.986955253561375),
		new google.maps.LatLng(42.76766633340138, 2.986991862701129),
		new google.maps.LatLng(42.767668134197507, 2.98701016728234)
	],
	[
		new google.maps.LatLng(42.769746990475696, 2.987006042014521),
		new google.maps.LatLng(42.769579743632548, 2.986980449879658),
		new google.maps.LatLng(42.769523095167806, 2.986973140081231),
		new google.maps.LatLng(42.769381925030061, 2.986954865548463),
		new google.maps.LatLng(42.769191301891553, 2.986942703747284),
		new google.maps.LatLng(42.76909149458789, 2.986937844508149),
		new google.maps.LatLng(42.768906268005765, 2.986945208905177)
	],
	[
		new google.maps.LatLng(42.768906268005765, 2.986945208905177),
		new google.maps.LatLng(42.768794773467434, 2.986954997851049)
	],
	[
		new google.maps.LatLng(42.768794773467434, 2.986954997851049),
		new google.maps.LatLng(42.768745320328776, 2.986959889762743),
		new google.maps.LatLng(42.768630228990261, 2.986967238062926),
		new google.maps.LatLng(42.768213921255011, 2.986989298952984),
		new google.maps.LatLng(42.767728377037862, 2.987006492666485),
		new google.maps.LatLng(42.767668134197507, 2.98701016728234)
	],
	[
		new google.maps.LatLng(42.769872875036548, 2.987023100498305),
		new google.maps.LatLng(42.769746990475696, 2.987006042014521)
	],
	[
		new google.maps.LatLng(42.767668134197507, 2.98701016728234),
		new google.maps.LatLng(42.76766454184429, 2.987046780397342),
		new google.maps.LatLng(42.76765555446039, 2.987077291352696),
		new google.maps.LatLng(42.767642968959699, 2.987101702212427),
		new google.maps.LatLng(42.767607904437675, 2.987121236338407)
	],
	[
		new google.maps.LatLng(42.767045918921411, 2.987029833056885),
		new google.maps.LatLng(42.767504488355172, 2.987016306113877)
	],
	[
		new google.maps.LatLng(42.767607904437675, 2.987121236338407),
		new google.maps.LatLng(42.767580930164158, 2.987129785312443),
		new google.maps.LatLng(42.767558451423731, 2.987127349899662),
		new google.maps.LatLng(42.767542265538083, 2.98711758925579),
		new google.maps.LatLng(42.767523379931021, 2.987093186223261),
		new google.maps.LatLng(42.767507190997961, 2.987056578552993),
		new google.maps.LatLng(42.767504488355172, 2.987016306113877)
	],
	[
		new google.maps.LatLng(42.770262218568199, 2.987082815212148),
		new google.maps.LatLng(42.770201072996784, 2.987064522264424),
		new google.maps.LatLng(42.770024834569725, 2.987040152369653),
		new google.maps.LatLng(42.769872875036548, 2.987023100498305)
	],
	[
		new google.maps.LatLng(42.766492039327346, 2.987042159116824),
		new google.maps.LatLng(42.767045918921411, 2.987029833056885)
	],
	[
		new google.maps.LatLng(42.770374612593137, 2.987074246786515),
		new google.maps.LatLng(42.770353931389792, 2.987069369489712),
		new google.maps.LatLng(42.770330552123049, 2.987064492759961),
		new google.maps.LatLng(42.770307174171776, 2.987063278159284),
		new google.maps.LatLng(42.770283796012336, 2.987068164656076),
		new google.maps.LatLng(42.770262218568199, 2.987082815212148)
	],
	[
		new google.maps.LatLng(42.770480717497222, 2.987105954584813),
		new google.maps.LatLng(42.770464530714619, 2.987096194707834),
		new google.maps.LatLng(42.770444748728778, 2.987090097719692),
		new google.maps.LatLng(42.770423168033616, 2.987083999888942),
		new google.maps.LatLng(42.770400689022296, 2.987079122960272),
		new google.maps.LatLng(42.770374612593137, 2.987074246786515)
	],
	[
		new google.maps.LatLng(42.771238719895457, 2.987191219449028),
		new google.maps.LatLng(42.770920412214096, 2.987149794263142),
		new google.maps.LatLng(42.770607499522377, 2.987114469508041),
		new google.maps.LatLng(42.770480717497222, 2.987105954584813)
	],
	[
		new google.maps.LatLng(42.771502187311143, 2.987302224661512),
		new google.maps.LatLng(42.771446433874623, 2.987255859319538),
		new google.maps.LatLng(42.771405970022904, 2.987238781094444),
		new google.maps.LatLng(42.771238719895457, 2.987191219449028)
	],
	[
		new google.maps.LatLng(42.774378598288756, 2.987205175086696),
		new google.maps.LatLng(42.77431925708337, 2.987236921723841),
		new google.maps.LatLng(42.7742985788989, 2.987258895270651),
		new google.maps.LatLng(42.774248237780078, 2.987357769769232)
	],
	[
		new google.maps.LatLng(42.774378598288756, 2.987205175086696),
		new google.maps.LatLng(42.774373214878935, 2.987302818523486),
		new google.maps.LatLng(42.774377718203461, 2.987369946320209)
	],
	[
		new google.maps.LatLng(42.771530963826564, 2.987325406568616),
		new google.maps.LatLng(42.771502187311143, 2.987302224661512)
	],
	[
		new google.maps.LatLng(42.77176117247906, 2.987521854124517),
		new google.maps.LatLng(42.771530963826564, 2.987325406568616)
	],
	[
		new google.maps.LatLng(42.774248237780078, 2.987357769769232),
		new google.maps.LatLng(42.774062167536499, 2.987852122078003)
	],
	[
		new google.maps.LatLng(42.774377718203461, 2.987369946320209),
		new google.maps.LatLng(42.774379521500137, 2.987411444219052),
		new google.maps.LatLng(42.774402018356518, 2.987562785743118),
		new google.maps.LatLng(42.774471297679625, 2.98794235584096),
		new google.maps.LatLng(42.774472206163594, 2.988029013471768),
		new google.maps.LatLng(42.774472208595668, 2.98805220360615)
	],
	[
		new google.maps.LatLng(42.7719077501689, 2.987646310735272),
		new google.maps.LatLng(42.77176117247906, 2.987521854124517)
	],
	[
		new google.maps.LatLng(42.772042636868612, 2.987761007969465),
		new google.maps.LatLng(42.7719077501689, 2.987646310735272)
	],
	[
		new google.maps.LatLng(42.772182020740999, 2.98788058536063),
		new google.maps.LatLng(42.77211277862817, 2.987822016642352),
		new google.maps.LatLng(42.772042636868612, 2.987761007969465)
	],
	[
		new google.maps.LatLng(42.774062167536499, 2.987852122078003),
		new google.maps.LatLng(42.773948007396058, 2.988153614906637),
		new google.maps.LatLng(42.773893176275045, 2.988317175605944)
	],
	[
		new google.maps.LatLng(42.772257557789807, 2.987942815224228),
		new google.maps.LatLng(42.772182020740999, 2.98788058536063)
	],
	[
		new google.maps.LatLng(42.772429313570505, 2.988086797315834),
		new google.maps.LatLng(42.772257557789807, 2.987942815224228)
	],
	[
		new google.maps.LatLng(42.774472208595668, 2.98805220360615),
		new google.maps.LatLng(42.774468620375202, 2.988122995489798),
		new google.maps.LatLng(42.774464131224526, 2.988187684806555)
	],
	[
		new google.maps.LatLng(42.772601068554032, 2.988216134827402),
		new google.maps.LatLng(42.77255610757485, 2.988194174723867),
		new google.maps.LatLng(42.772429313570505, 2.988086797315834)
	],
	[
		new google.maps.LatLng(42.774464131224526, 2.988187684806555),
		new google.maps.LatLng(42.774450664606469, 2.988374429180773),
		new google.maps.LatLng(42.774445285120393, 2.988520893236281)
	],
	[
		new google.maps.LatLng(42.772714361611861, 2.988203906918786),
		new google.maps.LatLng(42.772681094097436, 2.988217339124257),
		new google.maps.LatLng(42.772646026864685, 2.988221006842209),
		new google.maps.LatLng(42.772601068554032, 2.988216134827402)
	],
	[
		new google.maps.LatLng(42.772860954092728, 2.988472386058656),
		new google.maps.LatLng(42.772714361611861, 2.988203906918786)
	],
	[
		new google.maps.LatLng(42.77384462620256, 2.988358682678655),
		new google.maps.LatLng(42.773863505517276, 2.988333048885443),
		new google.maps.LatLng(42.773880588643991, 2.988323280655077),
		new google.maps.LatLng(42.773893176275045, 2.988317175605944)
	],
	[
		new google.maps.LatLng(42.773850039028815, 2.98852345252893),
		new google.maps.LatLng(42.773839244889515, 2.988486838516851),
		new google.maps.LatLng(42.773832945866673, 2.988442901454241),
		new google.maps.LatLng(42.773834739864903, 2.988396521327371),
		new google.maps.LatLng(42.77384462620256, 2.988358682678655)
	],
	[
		new google.maps.LatLng(42.77323590735886, 2.988499163303107),
		new google.maps.LatLng(42.772913107556995, 2.98848946331768),
		new google.maps.LatLng(42.772889728480529, 2.988485806609366),
		new google.maps.LatLng(42.772860954092728, 2.988472386058656)
	],
	[
		new google.maps.LatLng(42.773725954642615, 2.988527137866276),
		new google.maps.LatLng(42.773408547831295, 2.988504010634897),
		new google.maps.LatLng(42.77323590735886, 2.988499163303107)
	],
	[
		new google.maps.LatLng(42.774445285120393, 2.988520893236281),
		new google.maps.LatLng(42.774482166203548, 2.988668571540809),
		new google.maps.LatLng(42.774512750661117, 2.988788177843335)
	],
	[
		new google.maps.LatLng(42.773850039028815, 2.98852345252893),
		new google.maps.LatLng(42.773802384148276, 2.98853322636354),
		new google.maps.LatLng(42.773761921971946, 2.9885307923069),
		new google.maps.LatLng(42.773725954642615, 2.988527137866276)
	],
	[
		new google.maps.LatLng(42.774512750661117, 2.988788177843335),
		new google.maps.LatLng(42.774608998482172, 2.98914943703643)
	],
	[
		new google.maps.LatLng(42.774608998482172, 2.98914943703643),
		new google.maps.LatLng(42.774622490957455, 2.989200697005648)
	],
	[
		new google.maps.LatLng(42.774622490957455, 2.989200697005648),
		new google.maps.LatLng(42.774658471679111, 2.989337390365768)
	],
	[
		new google.maps.LatLng(42.774658471679111, 2.989337390365768),
		new google.maps.LatLng(42.774672863764636, 2.989392312646476),
		new google.maps.LatLng(42.774713342693751, 2.989566841572422)
	],
	[
		new google.maps.LatLng(42.774713342693751, 2.989566841572422),
		new google.maps.LatLng(42.774771812952899, 2.989821924432663)
	],
	[
		new google.maps.LatLng(42.774771812952899, 2.989821924432663),
		new google.maps.LatLng(42.774797000222208, 2.989932988384298)
	],
	[
		new google.maps.LatLng(42.774797000222208, 2.989932988384298),
		new google.maps.LatLng(42.774804201023024, 2.990011102348948),
		new google.maps.LatLng(42.774797016926229, 2.990113628466764),
		new google.maps.LatLng(42.774786236535789, 2.990219817519972)
	],
	[
		new google.maps.LatLng(42.774786236535789, 2.990219817519972),
		new google.maps.LatLng(42.774749403640378, 2.990584764399185)
	],
	[
		new google.maps.LatLng(42.774749403640378, 2.990584764399185),
		new google.maps.LatLng(42.774715264798736, 2.990925300650707)
	],
	[
		new google.maps.LatLng(42.774715264798736, 2.990925300650707),
		new google.maps.LatLng(42.774700889723626, 2.991064444080765),
		new google.maps.LatLng(42.774656861001603, 2.991428170155915)
	],
	[
		new google.maps.LatLng(42.766501800704923, 2.998306132194311),
		new google.maps.LatLng(42.766333647795783, 2.997706939352553),
		new google.maps.LatLng(42.766091751613502, 2.996828292314319),
		new google.maps.LatLng(42.766027004907414, 2.996567139500669),
		new google.maps.LatLng(42.765973947263419, 2.996357241707599),
		new google.maps.LatLng(42.765815671533069, 2.995708024171819),
		new google.maps.LatLng(42.765658287562907, 2.994969725627155),
		new google.maps.LatLng(42.765478404320582, 2.993973940956003),
		new google.maps.LatLng(42.765254428561427, 2.992605963230547),
		new google.maps.LatLng(42.765043031091871, 2.991322197019577)
	],
	[
		new google.maps.LatLng(42.774656861001603, 2.991428170155915),
		new google.maps.LatLng(42.77463619442473, 2.991617356968998),
		new google.maps.LatLng(42.774606531586329, 2.99173575349838),
		new google.maps.LatLng(42.774575968136354, 2.991838282171581)
	],
	[
		new google.maps.LatLng(42.774575968136354, 2.991838282171581),
		new google.maps.LatLng(42.774527425411655, 2.992001840452496)
	],
	[
		new google.maps.LatLng(42.774518435978628, 2.992034795654835),
		new google.maps.LatLng(42.774502255115351, 2.992090943137234),
		new google.maps.LatLng(42.774441128801371, 2.992315528660651)
	],
	[
		new google.maps.LatLng(42.774441128801371, 2.992315528660651),
		new google.maps.LatLng(42.774424948126253, 2.992376557936474)
	],
	[
		new google.maps.LatLng(42.774424948126253, 2.992376557936474),
		new google.maps.LatLng(42.774401576002923, 2.992461997734516),
		new google.maps.LatLng(42.774357530064599, 2.992653627774774)
	],
	[
		new google.maps.LatLng(42.774357530064599, 2.992653627774774),
		new google.maps.LatLng(42.774343148150166, 2.992718316588301),
		new google.maps.LatLng(42.774275731649915, 2.993034442311094)
	],
	[
		new google.maps.LatLng(42.774275731649915, 2.993034442311094),
		new google.maps.LatLng(42.774265843231589, 2.993078383187508),
		new google.maps.LatLng(42.774143597588228, 2.993730157527713),
		new google.maps.LatLng(42.774092359915294, 2.993986473416811)
	],
	[
		new google.maps.LatLng(42.774092359915294, 2.993986473416811),
		new google.maps.LatLng(42.774029435767723, 2.994302596063376)
	],
	[
		new google.maps.LatLng(42.774029435767723, 2.994302596063376),
		new google.maps.LatLng(42.774003366292085, 2.994431974409577)
	],
	[
		new google.maps.LatLng(42.774003366292085, 2.994431974409577),
		new google.maps.LatLng(42.774015959822684, 2.99452229156782),
		new google.maps.LatLng(42.774023157848411, 2.994627256170292),
		new google.maps.LatLng(42.77401776712145, 2.994704148777483),
		new google.maps.LatLng(42.774006083212498, 2.994812777332157)
	],
	[
		new google.maps.LatLng(42.774006083212498, 2.994812777332157),
		new google.maps.LatLng(42.773996196326252, 2.994886009151419)
	],
	[
		new google.maps.LatLng(42.773996196326252, 2.994886009151419),
		new google.maps.LatLng(42.773990803281151, 2.994934831067849),
		new google.maps.LatLng(42.773978217290484, 2.994986093898592)
	],
	[
		new google.maps.LatLng(42.773978217290484, 2.994986093898592),
		new google.maps.LatLng(42.773957540689125, 2.995078855340737)
	],
	[
		new google.maps.LatLng(42.773957540689125, 2.995078855340737),
		new google.maps.LatLng(42.773933265887841, 2.995133780152459),
		new google.maps.LatLng(42.773877523173852, 2.995243632643577),
		new google.maps.LatLng(42.773827174727245, 2.995354702865719)
	],
	[
		new google.maps.LatLng(42.773827174727245, 2.995354702865719),
		new google.maps.LatLng(42.773739973833628, 2.995807522073292)
	],
	[
		new google.maps.LatLng(42.773739973833628, 2.995807522073292),
		new google.maps.LatLng(42.773641984162538, 2.996311602178877),
		new google.maps.LatLng(42.773534101653652, 2.996865721857843),
		new google.maps.LatLng(42.773214034027859, 2.998426767648407)
	],
	[
		new google.maps.LatLng(42.768174160656066, 3.004333643251713),
		new google.maps.LatLng(42.768108531869906, 3.00409566027118),
		new google.maps.LatLng(42.767872082132918, 3.003243808108107),
		new google.maps.LatLng(42.767641919348478, 3.0024090494361),
		new google.maps.LatLng(42.767355106425022, 3.001363168240283),
		new google.maps.LatLng(42.767174382555488, 3.000713921937149),
		new google.maps.LatLng(42.7670574935212, 3.000288008546908),
		new google.maps.LatLng(42.766917224954199, 2.999785214720935),
		new google.maps.LatLng(42.766818316323381, 2.999431306526439),
		new google.maps.LatLng(42.766782349517378, 2.999301947225949),
		new google.maps.LatLng(42.766535970714926, 2.998426947158199),
		new google.maps.LatLng(42.766501800704923, 2.998306132194311)
	],
	[
		new google.maps.LatLng(42.773214034027859, 2.998426767648407),
		new google.maps.LatLng(42.773256295036894, 2.998453617331108),
		new google.maps.LatLng(42.773272480122387, 2.998476806611799),
		new google.maps.LatLng(42.773285968073026, 2.998502436282505)
	],
	[
		new google.maps.LatLng(42.773285968073026, 2.998502436282505),
		new google.maps.LatLng(42.773297658429215, 2.998545154308025),
		new google.maps.LatLng(42.77329945677419, 2.998587871353464),
		new google.maps.LatLng(42.773303053840749, 2.998633031118706)
	],
	[
		new google.maps.LatLng(42.773303053840749, 2.998633031118706),
		new google.maps.LatLng(42.773295861269752, 2.998672087282433),
		new google.maps.LatLng(42.773278777617996, 2.998713585177213),
		new google.maps.LatLng(42.773248206353209, 2.998756302864984)
	],
	[
		new google.maps.LatLng(42.773248206353209, 2.998756302864984),
		new google.maps.LatLng(42.77321403927504, 2.998781934746451),
		new google.maps.LatLng(42.773176273720061, 2.998792919931591)
	],
	[
		new google.maps.LatLng(42.772759964365221, 3.000942223914765),
		new google.maps.LatLng(42.772975767256227, 2.999857201495384),
		new google.maps.LatLng(42.773166384505153, 2.998889339778323),
		new google.maps.LatLng(42.773176273720061, 2.998792919931591)
	],
	[
		new google.maps.LatLng(42.772383179612312, 3.002926732774717),
		new google.maps.LatLng(42.772606198115746, 3.001720896346305),
		new google.maps.LatLng(42.772759964365221, 3.000942223914765)
	],
	[
		new google.maps.LatLng(42.772216811161179, 3.003689527525076),
		new google.maps.LatLng(42.772383179612312, 3.002926732774717)
	],
	[
		new google.maps.LatLng(42.771919983395378, 3.005988892151164),
		new google.maps.LatLng(42.771861545969614, 3.005852191814222),
		new google.maps.LatLng(42.77184626582504, 3.005748450782651),
		new google.maps.LatLng(42.771851668519325, 3.005598332161086),
		new google.maps.LatLng(42.771898442541193, 3.005249279320228),
		new google.maps.LatLng(42.77208011584743, 3.004299760367178),
		new google.maps.LatLng(42.772216811161179, 3.003689527525076)
	],
	[
		new google.maps.LatLng(42.768590399747765, 3.005846981500794),
		new google.maps.LatLng(42.768548148010737, 3.005688324125429),
		new google.maps.LatLng(42.768292832424393, 3.00475835265678),
		new google.maps.LatLng(42.768174160656066, 3.004333643251713)
	],
	[
		new google.maps.LatLng(42.769591801809462, 3.009498610523794),
		new google.maps.LatLng(42.769361687559432, 3.008663801735682),
		new google.maps.LatLng(42.768997625302255, 3.007372544639065),
		new google.maps.LatLng(42.768691983112852, 3.006230201701162),
		new google.maps.LatLng(42.768590399747765, 3.005846981500794)
	],
	[
		new google.maps.LatLng(42.771926265125664, 3.006212240604678),
		new google.maps.LatLng(42.771959536812105, 3.006160983815471),
		new google.maps.LatLng(42.771963135890708, 3.006113385043534),
		new google.maps.LatLng(42.771953248171691, 3.006067005685254),
		new google.maps.LatLng(42.771919983395378, 3.005988892151164)
	],
	[
		new google.maps.LatLng(42.773121911111268, 3.009493083920489),
		new google.maps.LatLng(42.772880057119401, 3.009248945071855),
		new google.maps.LatLng(42.772650822160713, 3.008634999486417),
		new google.maps.LatLng(42.772354159711405, 3.007834315455325),
		new google.maps.LatLng(42.771910954329179, 3.006630862513538),
		new google.maps.LatLng(42.771874994246438, 3.006527117803863),
		new google.maps.LatLng(42.771897486976123, 3.006289127221269),
		new google.maps.LatLng(42.771926265125664, 3.006212240604678)
	],
	[
		new google.maps.LatLng(42.773121911111268, 3.009493083920489),
		new google.maps.LatLng(42.773344854334759, 3.010032585341889),
		new google.maps.LatLng(42.773374515015149, 3.010154641390173),
		new google.maps.LatLng(42.77339159027305, 3.010243742025087)
	],
	[
		new google.maps.LatLng(42.771015157526818, 3.016920462462082),
		new google.maps.LatLng(42.770997191728341, 3.016813055996594),
		new google.maps.LatLng(42.770975643573856, 3.016608012883997),
		new google.maps.LatLng(42.770926277908238, 3.016030722140695),
		new google.maps.LatLng(42.770864325355753, 3.015421696578472),
		new google.maps.LatLng(42.770803252462599, 3.014924955315023),
		new google.maps.LatLng(42.770738570853837, 3.014500220611313),
		new google.maps.LatLng(42.770631655271188, 3.013859455860164),
		new google.maps.LatLng(42.77049687542187, 3.013113729334192),
		new google.maps.LatLng(42.770360280719608, 3.012463200268294),
		new google.maps.LatLng(42.770198510325109, 3.011768733615263),
		new google.maps.LatLng(42.770015157233011, 3.011058401261451),
		new google.maps.LatLng(42.769795842894133, 3.010245549208543),
		new google.maps.LatLng(42.769616071317145, 3.009590146814361)
	],
	[
		new google.maps.LatLng(42.773299875739447, 3.01024616715815),
		new google.maps.LatLng(42.77339159027305, 3.010243742025087)
	],
	[
		new google.maps.LatLng(42.773261198905168, 3.010376754695443),
		new google.maps.LatLng(42.773272890150942, 3.010360890350383),
		new google.maps.LatLng(42.773294476117933, 3.010294985964004),
		new google.maps.LatLng(42.773299875739447, 3.01024616715815)
	],
	[
		new google.maps.LatLng(42.773203647268176, 3.010428004983702),
		new google.maps.LatLng(42.77323152296006, 3.010415805684452),
		new google.maps.LatLng(42.773261198905168, 3.010376754695443)
	],
	[
		new google.maps.LatLng(42.773203647268176, 3.010428004983702),
		new google.maps.LatLng(42.773249479455849, 3.010687980992807),
		new google.maps.LatLng(42.773329462161009, 3.011106630291625),
		new google.maps.LatLng(42.773400457411867, 3.011476459215754),
		new google.maps.LatLng(42.773635002578217, 3.012682374627548),
		new google.maps.LatLng(42.7736718457585, 3.012872782734366)
	],
	[
		new google.maps.LatLng(42.7736718457585, 3.012872782734366),
		new google.maps.LatLng(42.773669123324744, 3.013079049123807),
		new google.maps.LatLng(42.773667311400082, 3.013193777132363)
	],
	[
		new google.maps.LatLng(42.7736718457585, 3.012872782734366),
		new google.maps.LatLng(42.773728475555515, 3.013021698636086),
		new google.maps.LatLng(42.773788705193851, 3.013140102256588)
	],
	[
		new google.maps.LatLng(42.773667311400082, 3.013193777132363),
		new google.maps.LatLng(42.773715871270447, 3.013153511660346),
		new google.maps.LatLng(42.773749141716984, 3.01314009385673),
		new google.maps.LatLng(42.773788705193851, 3.013140102256588)
	],
	[
		new google.maps.LatLng(42.773788705193851, 3.013140102256588),
		new google.maps.LatLng(42.773825567792947, 3.013164520753457),
		new google.maps.LatLng(42.773864226640868, 3.013202365783775)
	],
	[
		new google.maps.LatLng(42.773626833909105, 3.013312157919895),
		new google.maps.LatLng(42.77363493260038, 3.013265781241611),
		new google.maps.LatLng(42.773667311400082, 3.013193777132363)
	],
	[
		new google.maps.LatLng(42.773864226640868, 3.013202365783775),
		new google.maps.LatLng(42.773891194304944, 3.013259737161837),
		new google.maps.LatLng(42.773899278294991, 3.013331748991048)
	],
	[
		new google.maps.LatLng(42.773683461979481, 3.013470839094023),
		new google.maps.LatLng(42.77366368123203, 3.013458628263332),
		new google.maps.LatLng(42.773634016074887, 3.013404918747823),
		new google.maps.LatLng(42.773622334044312, 3.013346331289653),
		new google.maps.LatLng(42.773626833909105, 3.013312157919895)
	],
	[
		new google.maps.LatLng(42.773899278294991, 3.013331748991048),
		new google.maps.LatLng(42.773892975992354, 3.013397656271169),
		new google.maps.LatLng(42.773863295379606, 3.013459896116155)
	],
	[
		new google.maps.LatLng(42.773863295379606, 3.013459896116155),
		new google.maps.LatLng(42.773823727286533, 3.01349894262731),
		new google.maps.LatLng(42.773776969476906, 3.013509916977525),
		new google.maps.LatLng(42.773735609493087, 3.013498922185796)
	],
	[
		new google.maps.LatLng(42.773868642615682, 3.013838258047132),
		new google.maps.LatLng(42.773851583820893, 3.013642971230761),
		new google.maps.LatLng(42.773849796783026, 3.013552651565065),
		new google.maps.LatLng(42.773863295379606, 3.013459896116155)
	],
	[
		new google.maps.LatLng(42.773735609493087, 3.013498922185796),
		new google.maps.LatLng(42.77372032479704, 3.013492816194823),
		new google.maps.LatLng(42.773683461979481, 3.013470839094023)
	],
	[
		new google.maps.LatLng(42.773735609493087, 3.013498922185796),
		new google.maps.LatLng(42.773797631334489, 3.013660045332843),
		new google.maps.LatLng(42.773868642615682, 3.013838258047132)
	],
	[
		new google.maps.LatLng(42.773868642615682, 3.013838258047132),
		new google.maps.LatLng(42.774005226473292, 3.014512019427734),
		new google.maps.LatLng(42.774098674378862, 3.014980724371941),
		new google.maps.LatLng(42.774122036729288, 3.015097900829313),
		new google.maps.LatLng(42.774170555020355, 3.015354223691117)
	],
	[
		new google.maps.LatLng(42.774170555020355, 3.015354223691117),
		new google.maps.LatLng(42.774279289502807, 3.015796083866873),
		new google.maps.LatLng(42.774365553016118, 3.016173251347197)
	],
	[
		new google.maps.LatLng(42.774170555020355, 3.015354223691117),
		new google.maps.LatLng(42.774257681515785, 3.015984039139565),
		new google.maps.LatLng(42.774288220097169, 3.016206183834681)
	],
	[
		new google.maps.LatLng(42.774288220097169, 3.016206183834681),
		new google.maps.LatLng(42.774309803039088, 3.016185440987174),
		new google.maps.LatLng(42.774334980762212, 3.016176904499818),
		new google.maps.LatLng(42.774365553016118, 3.016173251347197)
	],
	[
		new google.maps.LatLng(42.774365553016118, 3.016173251347197),
		new google.maps.LatLng(42.774399719707723, 3.016184246157057),
		new google.maps.LatLng(42.774430286934013, 3.016215987354742),
		new google.maps.LatLng(42.77444826343006, 3.016258711168326)
	],
	[
		new google.maps.LatLng(42.774264828522426, 3.016296496365462),
		new google.maps.LatLng(42.774271130588467, 3.016244015194009),
		new google.maps.LatLng(42.774288220097169, 3.016206183834681)
	],
	[
		new google.maps.LatLng(42.77444826343006, 3.016258711168326),
		new google.maps.LatLng(42.774452751428228, 3.016307534183384),
		new google.maps.LatLng(42.774441052883354, 3.016368557162385),
		new google.maps.LatLng(42.774426660658278, 3.016405169717496),
		new google.maps.LatLng(42.774421257343732, 3.01646131239045),
		new google.maps.LatLng(42.774424846448085, 3.016512575516683),
		new google.maps.LatLng(42.774430234223409, 3.016557736402821),
		new google.maps.LatLng(42.774433826659511, 3.016585810644331),
		new google.maps.LatLng(42.774441913535668, 3.016623648750215),
		new google.maps.LatLng(42.774463481394861, 3.016700548459763),
		new google.maps.LatLng(42.774495841803443, 3.016762805320837),
		new google.maps.LatLng(42.774530901319778, 3.016811636714494),
		new google.maps.LatLng(42.774549774961272, 3.016867787285235)
	],
	[
		new google.maps.LatLng(42.774264828522426, 3.016296496365462),
		new google.maps.LatLng(42.774269317029223, 3.016341658100583),
		new google.maps.LatLng(42.77428549724862, 3.016373395503035),
		new google.maps.LatLng(42.774312466303947, 3.016410018931937),
		new google.maps.LatLng(42.774340334173196, 3.016450304995864),
		new google.maps.LatLng(42.774359209229416, 3.016497910986687),
		new google.maps.LatLng(42.774370890171532, 3.016552837371337),
		new google.maps.LatLng(42.774378076638833, 3.016597999926122),
		new google.maps.LatLng(42.774380769355325, 3.016628513038311),
		new google.maps.LatLng(42.774381667641194, 3.016635836791028),
		new google.maps.LatLng(42.774387057509223, 3.01666635185499),
		new google.maps.LatLng(42.774392442180961, 3.016732262475114),
		new google.maps.LatLng(42.77438164312224, 3.016790843980698),
		new google.maps.LatLng(42.774366350146515, 3.016835999233802),
		new google.maps.LatLng(42.774360046361458, 3.016898245511082)
	],
	[
		new google.maps.LatLng(42.774549774961272, 3.016867787285235),
		new google.maps.LatLng(42.774549766466876, 3.016919049557953),
		new google.maps.LatLng(42.774532674179994, 3.01697396829991),
		new google.maps.LatLng(42.774520083025493, 3.016987389888547)
	],
	[
		new google.maps.LatLng(42.77440049305995, 3.016994678133084),
		new google.maps.LatLng(42.774374423546661, 3.016958054643749),
		new google.maps.LatLng(42.774360046361458, 3.016898245511082)
	],
	[
		new google.maps.LatLng(42.771015157526818, 3.016920462462082),
		new google.maps.LatLng(42.77101154010937, 3.017054711613718),
		new google.maps.LatLng(42.771016908404093, 3.017221916644089),
		new google.maps.LatLng(42.771034872890056, 3.017335424432724),
		new google.maps.LatLng(42.771034860460936, 3.017411093363139),
		new google.maps.LatLng(42.771068073216952, 3.01775771365484)
	],
	[
		new google.maps.LatLng(42.774520083025493, 3.016987389888547),
		new google.maps.LatLng(42.774505694597934, 3.017003252560711),
		new google.maps.LatLng(42.774475120678943, 3.017017891205811),
		new google.maps.LatLng(42.774430162163888, 3.017016656831657),
		new google.maps.LatLng(42.77440049305995, 3.016994678133084)
	],
	[
		new google.maps.LatLng(42.774657492567819, 3.017984608842017),
		new google.maps.LatLng(42.774565883455942, 3.017346240922847),
		new google.maps.LatLng(42.774520083025493, 3.016987389888547)
	],
	[
		new google.maps.LatLng(42.77440049305995, 3.016994678133084),
		new google.maps.LatLng(42.774491253863935, 3.017336454899328),
		new google.maps.LatLng(42.774657492567819, 3.017984608842017)
	],
	[
		new google.maps.LatLng(42.771068073216952, 3.01775771365484),
		new google.maps.LatLng(42.771073444123658, 3.017901730038272),
		new google.maps.LatLng(42.771108404327556, 3.018529058048834),
		new google.maps.LatLng(42.771137926314111, 3.019379730092171),
		new google.maps.LatLng(42.771159311616159, 3.020428116250659),
		new google.maps.LatLng(42.771183462283027, 3.021083513470102),
		new google.maps.LatLng(42.771194188661632, 3.021403278919065),
		new google.maps.LatLng(42.771207560902717, 3.021972019809755)
	],
	[
		new google.maps.LatLng(42.774657492567819, 3.017984608842017),
		new google.maps.LatLng(42.774674560350789, 3.018082257824245),
		new google.maps.LatLng(42.774721272044879, 3.018345908332083)
	],
	[
		new google.maps.LatLng(42.774721272044879, 3.018345908332083),
		new google.maps.LatLng(42.774783255171087, 3.01869134010941)
	],
	[
		new google.maps.LatLng(42.774783255171087, 3.01869134010941),
		new google.maps.LatLng(42.774804813092004, 3.01881462148061),
		new google.maps.LatLng(42.774812897613529, 3.018862225261388)
	],
	[
		new google.maps.LatLng(42.775043677192379, 3.020523461245925),
		new google.maps.LatLng(42.774987127221159, 3.020009592870382),
		new google.maps.LatLng(42.77495660012697, 3.019769135453551),
		new google.maps.LatLng(42.774932957636778, 3.019591854085876),
		new google.maps.LatLng(42.774928764248202, 3.019560413805471),
		new google.maps.LatLng(42.774909012700093, 3.019396853449479),
		new google.maps.LatLng(42.774812897613529, 3.018862225261388)
	],
	[
		new google.maps.LatLng(42.775043677192379, 3.020523461245925),
		new google.maps.LatLng(42.775044572809968, 3.020544211510684),
		new google.maps.LatLng(42.775082272784829, 3.020881095924817),
		new google.maps.LatLng(42.775121788598547, 3.021120336643275),
		new google.maps.LatLng(42.775176585879777, 3.021382774562841),
		new google.maps.LatLng(42.775342824383607, 3.021912555079461),
		new google.maps.LatLng(42.775441663352048, 3.022247023534363),
		new google.maps.LatLng(42.775493778849885, 3.022422803593022),
		new google.maps.LatLng(42.775528821549052, 3.022539989757495),
		new google.maps.LatLng(42.77563394867768, 3.0228927723048)
	],
	[
		new google.maps.LatLng(42.771219899350072, 3.023157095512911),
		new google.maps.LatLng(42.771221774132059, 3.0228019417574),
		new google.maps.LatLng(42.771226312552983, 3.02260178702114),
		new google.maps.LatLng(42.771215573345174, 3.022360130579735),
		new google.maps.LatLng(42.771203028994059, 3.02214898562297),
		new google.maps.LatLng(42.771207560902717, 3.021972019809755)
	],
	[
		new google.maps.LatLng(42.77563394867768, 3.0228927723048),
		new google.maps.LatLng(42.775675282267258, 3.023025829483601)
	],
	[
		new google.maps.LatLng(42.775675282267258, 3.023025829483601),
		new google.maps.LatLng(42.775862172260553, 3.023650830807191),
		new google.maps.LatLng(42.775936744741038, 3.023914502569737),
		new google.maps.LatLng(42.775967285919521, 3.024051218127453)
	],
	[
		new google.maps.LatLng(42.771219899350072, 3.023157095512911),
		new google.maps.LatLng(42.771238724997446, 3.023419503859318),
		new google.maps.LatLng(42.771262057446862, 3.02363065331505),
		new google.maps.LatLng(42.771282701384365, 3.023794204507757),
		new google.maps.LatLng(42.771315030788124, 3.023977287100244),
		new google.maps.LatLng(42.771394101151756, 3.02422385509227)
	],
	[
		new google.maps.LatLng(42.775967285919521, 3.024051218127453),
		new google.maps.LatLng(42.776003216594162, 3.024209907036808),
		new google.maps.LatLng(42.77607056684306, 3.024590751713027)
	],
	[
		new google.maps.LatLng(42.771394101151756, 3.02422385509227),
		new google.maps.LatLng(42.771518492031994, 3.024593943343265),
		new google.maps.LatLng(42.771521695782475, 3.024603474639262),
		new google.maps.LatLng(42.771596271149626, 3.024843938780509)
	],
	[
		new google.maps.LatLng(42.77607056684306, 3.024590751713027),
		new google.maps.LatLng(42.776093016678885, 3.024718920130657),
		new google.maps.LatLng(42.776126240368427, 3.02491422603042)
	],
	[
		new google.maps.LatLng(42.771596271149626, 3.024843938780509),
		new google.maps.LatLng(42.771612443844901, 3.024895206337711),
		new google.maps.LatLng(42.771684339429484, 3.025053897908533)
	],
	[
		new google.maps.LatLng(42.776126240368427, 3.02491422603042),
		new google.maps.LatLng(42.776203460829962, 3.025374412773241),
		new google.maps.LatLng(42.776339939161652, 3.026183712428872),
		new google.maps.LatLng(42.776371365075079, 3.026368032897306),
		new google.maps.LatLng(42.77638842510963, 3.026468127330135)
	],
	[
		new google.maps.LatLng(42.771684339429484, 3.025053897908533),
		new google.maps.LatLng(42.771734661626056, 3.025185730961799),
		new google.maps.LatLng(42.771772410384926, 3.025254094179473),
		new google.maps.LatLng(42.771829032631793, 3.025360300766765),
		new google.maps.LatLng(42.771854201271424, 3.025395705181194)
	],
	[
		new google.maps.LatLng(42.771854201271424, 3.025395705181194),
		new google.maps.LatLng(42.772048354104115, 3.025671618978153),
		new google.maps.LatLng(42.772391733445254, 3.026089177148797),
		new google.maps.LatLng(42.772778267786158, 3.026517745251549),
		new google.maps.LatLng(42.772859173460475, 3.026595895044601),
		new google.maps.LatLng(42.773160319971602, 3.026888953028702),
		new google.maps.LatLng(42.773619682478689, 3.027322449134984),
		new google.maps.LatLng(42.774168037535865, 3.027846312550015),
		new google.maps.LatLng(42.77445839214807, 3.028135716761452),
		new google.maps.LatLng(42.774568960321702, 3.028245618812719),
		new google.maps.LatLng(42.774975282737998, 3.028621743646421),
		new google.maps.LatLng(42.775307887936684, 3.028942912330624)
	],
	[
		new google.maps.LatLng(42.77638842510963, 3.026468127330135),
		new google.maps.LatLng(42.776490780739032, 3.027065035036742),
		new google.maps.LatLng(42.776521306456772, 3.027246915565904),
		new google.maps.LatLng(42.776580561860044, 3.02759602759605)
	],
	[
		new google.maps.LatLng(42.776580561860044, 3.02759602759605),
		new google.maps.LatLng(42.776620063579458, 3.027835279615378),
		new google.maps.LatLng(42.77662904219018, 3.027885328041644),
		new google.maps.LatLng(42.776667648462578, 3.02810627118197),
		new google.maps.LatLng(42.776678422350372, 3.028166084732808),
		new google.maps.LatLng(42.776727832475721, 3.028334549486238)
	],
	[
		new google.maps.LatLng(42.776727832475721, 3.028334549486238),
		new google.maps.LatLng(42.776795231315198, 3.028481051401807),
		new google.maps.LatLng(42.776897692674375, 3.028643439535335),
		new google.maps.LatLng(42.776934548257636, 3.028682516118848)
	],
	[
		new google.maps.LatLng(42.776934548257636, 3.028682516118848),
		new google.maps.LatLng(42.777073879949292, 3.028827835235967),
		new google.maps.LatLng(42.777342666281882, 3.0290647632789),
		new google.maps.LatLng(42.777456833126053, 3.029166130305864),
		new google.maps.LatLng(42.777998900314174, 3.029641217334516),
		new google.maps.LatLng(42.778441179068793, 3.030043025426035),
		new google.maps.LatLng(42.778555345029886, 3.030144396057139)
	],
	[
		new google.maps.LatLng(42.775307887936684, 3.028942912330624),
		new google.maps.LatLng(42.775420253440849, 3.029051597367212),
		new google.maps.LatLng(42.775765442836118, 3.029383761546027)
	],
	[
		new google.maps.LatLng(42.775765442836118, 3.029383761546027),
		new google.maps.LatLng(42.775851739897021, 3.029465582657245),
		new google.maps.LatLng(42.775948824180219, 3.029559616123448),
		new google.maps.LatLng(42.776238277270807, 3.029840494154976),
		new google.maps.LatLng(42.776294909889707, 3.029894228059901),
		new google.maps.LatLng(42.776583466598083, 3.030164123743087),
		new google.maps.LatLng(42.776612232833216, 3.030189771589792),
		new google.maps.LatLng(42.776931348564389, 3.030501186278074),
		new google.maps.LatLng(42.777109331627379, 3.030681925731427),
		new google.maps.LatLng(42.77720641357687, 3.030780845172658),
		new google.maps.LatLng(42.77744191975389, 3.031040956776044),
		new google.maps.LatLng(42.777659443430196, 3.031298619556919),
		new google.maps.LatLng(42.777734045835821, 3.031396307363096),
		new google.maps.LatLng(42.777892237847269, 3.03160389562998),
		new google.maps.LatLng(42.778107945957743, 3.031914047417903),
		new google.maps.LatLng(42.778364086939348, 3.032320652625454),
		new google.maps.LatLng(42.778568076162621, 3.032722350133593),
		new google.maps.LatLng(42.778765759814966, 3.033157003220356),
		new google.maps.LatLng(42.778973308958285, 3.033663681668512),
		new google.maps.LatLng(42.779119735573822, 3.03410197257104),
		new google.maps.LatLng(42.779276019113645, 3.034635480567833),
		new google.maps.LatLng(42.779460138601024, 3.035280087218352),
		new google.maps.LatLng(42.779621819258331, 3.035792855192034),
		new google.maps.LatLng(42.779724215274129, 3.036117608772035)
	],
	[
		new google.maps.LatLng(42.778555345029886, 3.030144396057139),
		new google.maps.LatLng(42.778906831243361, 3.030455837442262),
		new google.maps.LatLng(42.779142352730823, 3.030668350307992),
		new google.maps.LatLng(42.779304161194524, 3.030813691495649),
		new google.maps.LatLng(42.779771605899654, 3.03123872370419),
		new google.maps.LatLng(42.779906445368873, 3.031362081687541),
		new google.maps.LatLng(42.780235453500666, 3.031660097780759)
	],
	[
		new google.maps.LatLng(42.780235453500666, 3.031660097780759),
		new google.maps.LatLng(42.780316356944645, 3.031733381312724),
		new google.maps.LatLng(42.780593225976453, 3.031986209196059),
		new google.maps.LatLng(42.78089796084128, 3.032264689460762),
		new google.maps.LatLng(42.781247643019768, 3.032577375878672),
		new google.maps.LatLng(42.781539792393716, 3.032841206600203),
		new google.maps.LatLng(42.781970375980919, 3.033228409123787),
		new google.maps.LatLng(42.782309270604671, 3.033525231937457)
	],
	[
		new google.maps.LatLng(42.78276515513317, 3.033510845801833),
		new google.maps.LatLng(42.782706722686633, 3.033466867176026),
		new google.maps.LatLng(42.782644683146785, 3.03345584505564),
		new google.maps.LatLng(42.782597019268067, 3.03348023219635),
		new google.maps.LatLng(42.782555642063485, 3.033531477497643),
		new google.maps.LatLng(42.782489963050722, 3.033657171538712)
	],
	[
		new google.maps.LatLng(42.782793888237869, 3.033640258141149),
		new google.maps.LatLng(42.782793908562283, 3.033574340029794),
		new google.maps.LatLng(42.78276515513317, 3.033510845801833)
	],
	[
		new google.maps.LatLng(42.782309270604671, 3.033525231937457),
		new google.maps.LatLng(42.782331744189982, 3.033544775579361),
		new google.maps.LatLng(42.782489963050722, 3.033657171538712)
	],
	[
		new google.maps.LatLng(42.782489963050722, 3.033657171538712),
		new google.maps.LatLng(42.782467453783838, 3.033752373723607),
		new google.maps.LatLng(42.782469229352614, 3.033824395989102),
		new google.maps.LatLng(42.782497081804415, 3.033892770917727),
		new google.maps.LatLng(42.782549220779373, 3.033935526617439),
		new google.maps.LatLng(42.782612159089787, 3.033945328743454),
		new google.maps.LatLng(42.782658022546102, 3.033927044507098),
		new google.maps.LatLng(42.782706599827961, 3.033858713648562)
	],
	[
		new google.maps.LatLng(42.782706599827961, 3.033858713648562),
		new google.maps.LatLng(42.782978065936142, 3.034121324277616),
		new google.maps.LatLng(42.78322886274681, 3.034347304153791)
	],
	[
		new google.maps.LatLng(42.78322886274681, 3.034347304153791),
		new google.maps.LatLng(42.783293584103305, 3.034405936610631),
		new google.maps.LatLng(42.783622584687329, 3.034705209838119),
		new google.maps.LatLng(42.783965070569984, 3.035009376566779)
	],
	[
		new google.maps.LatLng(42.82353758865478, 3.034594669855667),
		new google.maps.LatLng(42.823509724233084, 3.034561671671447),
		new google.maps.LatLng(42.823480955856233, 3.034540888148819),
		new google.maps.LatLng(42.823449488481437, 3.034526210704131),
		new google.maps.LatLng(42.823414420384005, 3.034522524631307),
		new google.maps.LatLng(42.823384746901638, 3.034523728599303)
	],
	[
		new google.maps.LatLng(42.823384746901638, 3.034523728599303),
		new google.maps.LatLng(42.823354169843377, 3.03453592664047),
		new google.maps.LatLng(42.823328987237723, 3.034550569970777),
		new google.maps.LatLng(42.823303802039952, 3.034573764347954),
		new google.maps.LatLng(42.823280413313128, 3.034604289014108),
		new google.maps.LatLng(42.823262417017197, 3.034640925446968)
	],
	[
		new google.maps.LatLng(42.823578018459393, 3.034699749171806),
		new google.maps.LatLng(42.823569937785699, 3.034664318489172),
		new google.maps.LatLng(42.823556461007541, 3.034628884794205),
		new google.maps.LatLng(42.82353758865478, 3.034594669855667)
	],
	[
		new google.maps.LatLng(42.823262417017197, 3.034640925446968),
		new google.maps.LatLng(42.823156298546266, 3.034678730526116),
		new google.maps.LatLng(42.822911693748956, 3.034743326381377)
	],
	[
		new google.maps.LatLng(42.823258751306085, 3.03485347432228),
		new google.maps.LatLng(42.823249768193968, 3.03482537381654),
		new google.maps.LatLng(42.823242585262719, 3.034792387317667),
		new google.maps.LatLng(42.823239900926716, 3.034753295810608),
		new google.maps.LatLng(42.823244410683195, 3.034710543084643),
		new google.maps.LatLng(42.823251616085265, 3.034672680101509),
		new google.maps.LatLng(42.823262417017197, 3.034640925446968)
	],
	[
		new google.maps.LatLng(42.823578018459393, 3.034699749171806),
		new google.maps.LatLng(42.823581604178408, 3.034735176115909),
		new google.maps.LatLng(42.823582491467448, 3.034771823307142),
		new google.maps.LatLng(42.823578884017927, 3.034804803911883),
		new google.maps.LatLng(42.823570780714952, 3.034837780756928),
		new google.maps.LatLng(42.823557280189036, 3.03487441982928)
	],
	[
		new google.maps.LatLng(42.823824357707913, 3.034834268100012),
		new google.maps.LatLng(42.823633757196667, 3.034738871916832),
		new google.maps.LatLng(42.823578018459393, 3.034699749171806)
	],
	[
		new google.maps.LatLng(42.820703958090029, 3.035331993934517),
		new google.maps.LatLng(42.820737235036638, 3.035311247646112),
		new google.maps.LatLng(42.821396481318175, 3.034910990143707),
		new google.maps.LatLng(42.821444150978174, 3.034876816287365),
		new google.maps.LatLng(42.821581761255388, 3.034776734807985),
		new google.maps.LatLng(42.82164830935686, 3.034753565627069),
		new google.maps.LatLng(42.821736440617741, 3.034725522845236),
		new google.maps.LatLng(42.821817375006582, 3.034707248525637)
	],
	[
		new google.maps.LatLng(42.821863202518706, 3.034803775946985),
		new google.maps.LatLng(42.821817375006582, 3.034707248525637)
	],
	[
		new google.maps.LatLng(42.821863202518706, 3.034803775946985),
		new google.maps.LatLng(42.821908171863491, 3.034776929371989),
		new google.maps.LatLng(42.821947742131009, 3.034759852324892),
		new google.maps.LatLng(42.821987310908348, 3.034747660947099),
		new google.maps.LatLng(42.822039466911704, 3.034741584049744),
		new google.maps.LatLng(42.822141980589713, 3.03472820870536),
		new google.maps.LatLng(42.822265170116864, 3.034733168490786),
		new google.maps.LatLng(42.822469286434789, 3.034741841415844),
		new google.maps.LatLng(42.822734552294925, 3.034738334994072),
		new google.maps.LatLng(42.822911693748956, 3.034743326381377)
	],
	[
		new google.maps.LatLng(42.823258751306085, 3.03485347432228),
		new google.maps.LatLng(42.823185026991851, 3.034821669654336),
		new google.maps.LatLng(42.822911693748956, 3.034743326381377)
	],
	[
		new google.maps.LatLng(42.823824357707913, 3.034834268100012),
		new google.maps.LatLng(42.823620229933759, 3.034857355567492),
		new google.maps.LatLng(42.823557280189036, 3.03487441982928)
	],
	[
		new google.maps.LatLng(42.823824357707913, 3.034834268100012),
		new google.maps.LatLng(42.823874707766691, 3.034848957654562)
	],
	[
		new google.maps.LatLng(42.823874707766691, 3.034848957654562),
		new google.maps.LatLng(42.823926858540901, 3.03485998294705),
		new google.maps.LatLng(42.824266733054188, 3.034937146288969),
		new google.maps.LatLng(42.824404301189325, 3.034968990199569)
	],
	[
		new google.maps.LatLng(42.823289302329982, 3.034920678252924),
		new google.maps.LatLng(42.823273126990443, 3.034890130157025),
		new google.maps.LatLng(42.823258751306085, 3.03485347432228)
	],
	[
		new google.maps.LatLng(42.823557280189036, 3.03487441982928),
		new google.maps.LatLng(42.823543783540636, 3.034901286034894),
		new google.maps.LatLng(42.823524892066573, 3.034926927422495),
		new google.maps.LatLng(42.823504202636862, 3.034950125483884),
		new google.maps.LatLng(42.823475421611747, 3.034970874214215),
		new google.maps.LatLng(42.823448441750458, 3.034980630571926),
		new google.maps.LatLng(42.823417867791292, 3.034985497859399)
	],
	[
		new google.maps.LatLng(42.81125262024549, 3.034909783940203),
		new google.maps.LatLng(42.811396498323063, 3.034889109095519),
		new google.maps.LatLng(42.811417180523627, 3.034886678944628),
		new google.maps.LatLng(42.811493607305174, 3.034901380309507),
		new google.maps.LatLng(42.812344210707387, 3.035010589420792)
	],
	[
		new google.maps.LatLng(42.811363864026021, 3.035690266476165),
		new google.maps.LatLng(42.811305570896131, 3.035221249498568),
		new google.maps.LatLng(42.811281345666643, 3.035058800805999),
		new google.maps.LatLng(42.811267887647318, 3.034968416814565),
		new google.maps.LatLng(42.81125262024549, 3.034909783940203)
	],
	[
		new google.maps.LatLng(42.823417867791292, 3.034985497859399),
		new google.maps.LatLng(42.823392689622352, 3.034985483615074),
		new google.maps.LatLng(42.823364816553791, 3.034978137310405),
		new google.maps.LatLng(42.823339643028454, 3.03496590674012),
		new google.maps.LatLng(42.823313572771418, 3.034945124611232),
		new google.maps.LatLng(42.823289302329982, 3.034920678252924)
	],
	[
		new google.maps.LatLng(42.824404301189325, 3.034968990199569),
		new google.maps.LatLng(42.824823299919196, 3.035062082780943),
		new google.maps.LatLng(42.82519014810994, 3.03514903801614)
	],
	[
		new google.maps.LatLng(42.812344210707387, 3.035010589420792),
		new google.maps.LatLng(42.812414344788714, 3.035019179897436),
		new google.maps.LatLng(42.8132226885173, 3.035122260474847),
		new google.maps.LatLng(42.814066998639753, 3.035229028947708),
		new google.maps.LatLng(42.814969755800817, 3.035340722534265),
		new google.maps.LatLng(42.815330319093327, 3.035388575747757)
	],
	[
		new google.maps.LatLng(42.783965070569984, 3.035009376566779),
		new google.maps.LatLng(42.78403069130934, 3.035066789944211),
		new google.maps.LatLng(42.784404636137374, 3.035403940415673),
		new google.maps.LatLng(42.78485678625956, 3.035805841903246)
	],
	[
		new google.maps.LatLng(42.82519014810994, 3.03514903801614),
		new google.maps.LatLng(42.825317825888327, 3.035178433657697),
		new google.maps.LatLng(42.825860904133329, 3.035305809131972),
		new google.maps.LatLng(42.826484006070743, 3.035454004820147),
		new google.maps.LatLng(42.826983928634412, 3.03556425714631),
		new google.maps.LatLng(42.827295929669077, 3.035636524773879),
		new google.maps.LatLng(42.827520714745496, 3.035687971518456),
		new google.maps.LatLng(42.827886663372972, 3.03577371189452),
		new google.maps.LatLng(42.828352411611341, 3.035899829914178)
	],
	[
		new google.maps.LatLng(42.81885053624908, 3.035835331813761),
		new google.maps.LatLng(42.819142762622015, 3.035875821228363),
		new google.maps.LatLng(42.819357661121302, 3.035907711933644),
		new google.maps.LatLng(42.819516815234522, 3.035922468169372),
		new google.maps.LatLng(42.819631013309433, 3.035923759853008),
		new google.maps.LatLng(42.819731729610396, 3.035906720892875),
		new google.maps.LatLng(42.819822558322237, 3.035878683411112),
		new google.maps.LatLng(42.819946668421409, 3.035818907355257),
		new google.maps.LatLng(42.820148128796681, 3.035701767247825),
		new google.maps.LatLng(42.820703958090029, 3.035331993934517)
	],
	[
		new google.maps.LatLng(42.815330319093327, 3.035388575747757),
		new google.maps.LatLng(42.815796083570994, 3.035448708305663),
		new google.maps.LatLng(42.816692548726706, 3.035556739731503),
		new google.maps.LatLng(42.81671952395358, 3.035559198489364),
		new google.maps.LatLng(42.817520674577139, 3.035668396132947),
		new google.maps.LatLng(42.817827289093934, 3.035705228478768),
		new google.maps.LatLng(42.818452209084242, 3.035777678147778),
		new google.maps.LatLng(42.818653620854619, 3.035807117021018),
		new google.maps.LatLng(42.81885053624908, 3.035835331813761)
	],
	[
		new google.maps.LatLng(42.811510067587989, 3.036769995146031),
		new google.maps.LatLng(42.811371936360054, 3.035751337305683),
		new google.maps.LatLng(42.811363864026021, 3.035690266476165)
	],
	[
		new google.maps.LatLng(42.78485678625956, 3.035805841903246),
		new google.maps.LatLng(42.784896337665501, 3.035841268797033),
		new google.maps.LatLng(42.785016790268976, 3.035951210124594)
	],
	[
		new google.maps.LatLng(42.828589791386882, 3.035932961598799),
		new google.maps.LatLng(42.828579009597107, 3.035908521822863),
		new google.maps.LatLng(42.828564627335467, 3.03589385361254),
		new google.maps.LatLng(42.828547543954336, 3.035888956262544),
		new google.maps.LatLng(42.828525961910664, 3.035890164371179),
		new google.maps.LatLng(42.828510673384109, 3.035897485420148),
		new google.maps.LatLng(42.828499877492654, 3.035912137772597),
		new google.maps.LatLng(42.828486379069076, 3.035943893326909)
	],
	[
		new google.maps.LatLng(42.828352411611341, 3.035899829914178),
		new google.maps.LatLng(42.828423443047988, 3.035916977135966),
		new google.maps.LatLng(42.828486379069076, 3.035943893326909)
	],
	[
		new google.maps.LatLng(42.828554692676178, 3.036020900338148),
		new google.maps.LatLng(42.828576276263107, 3.03601480606285),
		new google.maps.LatLng(42.828587971772208, 3.035996487433376),
		new google.maps.LatLng(42.828589776631752, 3.035976942406077),
		new google.maps.LatLng(42.828589785231173, 3.035952508896302),
		new google.maps.LatLng(42.828589791386882, 3.035932961598799)
	],
	[
		new google.maps.LatLng(42.828486379069076, 3.035943893326909),
		new google.maps.LatLng(42.828487269434845, 3.03596954917591),
		new google.maps.LatLng(42.828493554214418, 3.035997650657422),
		new google.maps.LatLng(42.828513332552667, 3.036012323240689),
		new google.maps.LatLng(42.828533111531357, 3.036022108401486),
		new google.maps.LatLng(42.828554692676178, 3.036020900338148)
	],
	[
		new google.maps.LatLng(42.785016790268976, 3.035951210124594),
		new google.maps.LatLng(42.785167804679851, 3.036089249065234)
	],
	[
		new google.maps.LatLng(42.828554692676178, 3.036020900338148),
		new google.maps.LatLng(42.828576251309812, 3.036088105353629),
		new google.maps.LatLng(42.8286544457807, 3.036196883118477),
		new google.maps.LatLng(42.829201803867484, 3.036961997120039),
		new google.maps.LatLng(42.829287188104161, 3.037078111416166)
	],
	[
		new google.maps.LatLng(42.785167804679851, 3.036089249065234),
		new google.maps.LatLng(42.785348482341966, 3.036255385502879)
	],
	[
		new google.maps.LatLng(42.779724215274129, 3.036117608772035),
		new google.maps.LatLng(42.77984098158597, 3.03648875740899),
		new google.maps.LatLng(42.780002676696967, 3.036942940734892),
		new google.maps.LatLng(42.780050288629589, 3.037069918400931),
		new google.maps.LatLng(42.780230854406497, 3.037548529424639)
	],
	[
		new google.maps.LatLng(42.785348482341966, 3.036255385502879),
		new google.maps.LatLng(42.785423091062327, 3.036322573592498)
	],
	[
		new google.maps.LatLng(42.785423091062327, 3.036322573592498),
		new google.maps.LatLng(42.785777256351942, 3.036642636996786),
		new google.maps.LatLng(42.785853662367295, 3.036713490131271)
	],
	[
		new google.maps.LatLng(42.799938491236688, 3.03647572709094),
		new google.maps.LatLng(42.79997626342842, 3.036454992252979),
		new google.maps.LatLng(42.800011333781583, 3.036448908890435),
		new google.maps.LatLng(42.800044603481062, 3.036448929714863),
		new google.maps.LatLng(42.80009045800675, 3.036462390991008),
		new google.maps.LatLng(42.800137205005214, 3.036491726009901),
		new google.maps.LatLng(42.800177651689857, 3.036541814530405),
		new google.maps.LatLng(42.800204604005565, 3.036610212168132),
		new google.maps.LatLng(42.800217163354617, 3.036694473326513),
		new google.maps.LatLng(42.800214440811331, 3.036767736189939),
		new google.maps.LatLng(42.800199132762522, 3.036832443685219)
	],
	[
		new google.maps.LatLng(42.799843974099069, 3.036774829087825),
		new google.maps.LatLng(42.799837700218809, 3.036716213154512),
		new google.maps.LatLng(42.79984491662438, 3.036649059854132),
		new google.maps.LatLng(42.799865621735712, 3.036578250638745),
		new google.maps.LatLng(42.799898911231757, 3.036522103090332),
		new google.maps.LatLng(42.799938491236688, 3.03647572709094)
	],
	[
		new google.maps.LatLng(42.796448701968288, 3.036642034742219),
		new google.maps.LatLng(42.796436991276899, 3.036704298016009),
		new google.maps.LatLng(42.796416293555907, 3.036751903684818),
		new google.maps.LatLng(42.796401000587416, 3.036772651732069),
		new google.maps.LatLng(42.796375816827968, 3.036789728995435),
		new google.maps.LatLng(42.796343444497445, 3.036795813411981)
	],
	[
		new google.maps.LatLng(42.797546594303832, 3.036670810335347),
		new google.maps.LatLng(42.797419803239734, 3.036689045277536),
		new google.maps.LatLng(42.797044850094466, 3.036669273358636),
		new google.maps.LatLng(42.796690578142311, 3.036653176395994),
		new google.maps.LatLng(42.796665400795355, 3.036653160257184),
		new google.maps.LatLng(42.796612350515225, 3.036648242694447),
		new google.maps.LatLng(42.796448701968288, 3.036642034742219)
	],
	[
		new google.maps.LatLng(42.797546594303832, 3.036670810335347),
		new google.maps.LatLng(42.797728224804658, 3.036684356632516)
	],
	[
		new google.maps.LatLng(42.797728224804658, 3.036684356632516),
		new google.maps.LatLng(42.797855905285381, 3.03669420480536),
		new google.maps.LatLng(42.797868493114414, 3.036695433523976),
		new google.maps.LatLng(42.797926039635612, 3.036699132640728)
	],
	[
		new google.maps.LatLng(42.797926039635612, 3.036699132640728),
		new google.maps.LatLng(42.798049223468453, 3.036711420719443)
	],
	[
		new google.maps.LatLng(42.798049223468453, 3.036711420719443),
		new google.maps.LatLng(42.79809777827257, 3.036715114525597),
		new google.maps.LatLng(42.798288399685525, 3.036731108932806),
		new google.maps.LatLng(42.798417878463852, 3.036742179622604)
	],
	[
		new google.maps.LatLng(42.785853662367295, 3.036713490131271),
		new google.maps.LatLng(42.785914786765026, 3.036769683380251)
	],
	[
		new google.maps.LatLng(42.798417878463852, 3.036742179622604),
		new google.maps.LatLng(42.798440357357826, 3.036743415459215),
		new google.maps.LatLng(42.799010424135375, 3.036790174714986),
		new google.maps.LatLng(42.799516648719489, 3.036839338165435),
		new google.maps.LatLng(42.79957329705698, 3.03683937312128),
		new google.maps.LatLng(42.799682099562155, 3.036837000225565),
		new google.maps.LatLng(42.799746844708629, 3.036826052062415),
		new google.maps.LatLng(42.799843974099069, 3.036774829087825)
	],
	[
		new google.maps.LatLng(42.81159976337036, 3.037417347140904),
		new google.maps.LatLng(42.811518137767102, 3.036835951124961),
		new google.maps.LatLng(42.811510067587989, 3.036769995146031)
	],
	[
		new google.maps.LatLng(42.800012955883695, 3.036964200891064),
		new google.maps.LatLng(42.799968898537216, 3.036955625508916),
		new google.maps.LatLng(42.799928443340129, 3.03693239921784),
		new google.maps.LatLng(42.799892492398641, 3.036885975978729),
		new google.maps.LatLng(42.799861937717452, 3.036833450770437),
		new google.maps.LatLng(42.799843974099069, 3.036774829087825)
	],
	[
		new google.maps.LatLng(42.785914786765026, 3.036769683380251),
		new google.maps.LatLng(42.786038834575848, 3.03688085270916),
		new google.maps.LatLng(42.786106248208874, 3.036950480047081),
		new google.maps.LatLng(42.786122379527285, 3.037106749764586)
	],
	[
		new google.maps.LatLng(42.796085146660175, 3.0374684135838),
		new google.maps.LatLng(42.796093247043856, 3.037443999031019),
		new google.maps.LatLng(42.796208469815831, 3.037078997426097),
		new google.maps.LatLng(42.796224682512197, 3.036998422513943),
		new google.maps.LatLng(42.79623912362257, 3.036842145513596),
		new google.maps.LatLng(42.796245437604327, 3.036784762915961)
	],
	[
		new google.maps.LatLng(42.796343444497445, 3.036795813411981),
		new google.maps.LatLng(42.796311072954012, 3.036799456601579),
		new google.maps.LatLng(42.796276004536949, 3.03679943452002),
		new google.maps.LatLng(42.796245437604327, 3.036784762915961)
	],
	[
		new google.maps.LatLng(42.800199132762522, 3.036832443685219),
		new google.maps.LatLng(42.800173936771522, 3.036887376089947),
		new google.maps.LatLng(42.800140656297934, 3.036917881343477),
		new google.maps.LatLng(42.800097484355739, 3.03694960195291),
		new google.maps.LatLng(42.800057017976847, 3.036958124407883),
		new google.maps.LatLng(42.800012955883695, 3.036964200891064)
	],
	[
		new google.maps.LatLng(42.800199132762522, 3.036832443685219),
		new google.maps.LatLng(42.800288131208902, 3.036892333049254),
		new google.maps.LatLng(42.800365448378628, 3.03693145592345),
		new google.maps.LatLng(42.800504815798014, 3.036949861136443)
	],
	[
		new google.maps.LatLng(42.788373970488244, 3.03694215375982),
		new google.maps.LatLng(42.788689593870444, 3.036905729618887)
	],
	[
		new google.maps.LatLng(42.788134780419441, 3.036970080674482),
		new google.maps.LatLng(42.788373970488244, 3.03694215375982)
	],
	[
		new google.maps.LatLng(42.800504815798014, 3.036949861136443),
		new google.maps.LatLng(42.80055247043861, 3.036955996127001),
		new google.maps.LatLng(42.800948100904172, 3.036987996396409),
		new google.maps.LatLng(42.801467815344608, 3.037032287010553)
	],
	[
		new google.maps.LatLng(42.787882101056887, 3.037000440195964),
		new google.maps.LatLng(42.788074533124906, 3.036977367365435),
		new google.maps.LatLng(42.788134780419441, 3.036970080674482)
	],
	[
		new google.maps.LatLng(42.787528708546056, 3.037050268636555),
		new google.maps.LatLng(42.787606942472081, 3.037033226893995),
		new google.maps.LatLng(42.787882101056887, 3.037000440195964)
	],
	[
		new google.maps.LatLng(42.801467815344608, 3.037032287010553),
		new google.maps.LatLng(42.801805899767707, 3.037061808657405),
		new google.maps.LatLng(42.801942571974358, 3.037074106312712),
		new google.maps.LatLng(42.802006412113926, 3.037077811020032),
		new google.maps.LatLng(42.802150277827756, 3.03709133440053)
	],
	[
		new google.maps.LatLng(42.829287188104161, 3.037078111416166),
		new google.maps.LatLng(42.829275499567913, 3.037074438789009),
		new google.maps.LatLng(42.829263810634615, 3.037071988035529),
		new google.maps.LatLng(42.829252121304435, 3.037070759155031),
		new google.maps.LatLng(42.829240431180878, 3.037071972795535),
		new google.maps.LatLng(42.829228740660028, 3.03707440953029),
		new google.maps.LatLng(42.829217049742596, 3.037078066912462),
		new google.maps.LatLng(42.82920625737929, 3.037084168574797),
		new google.maps.LatLng(42.829195465015694, 3.037090270235002),
		new google.maps.LatLng(42.829185570305881, 3.037098814950545),
		new google.maps.LatLng(42.829175676097989, 3.037108582757462),
		new google.maps.LatLng(42.829167579288615, 3.037119572287811),
		new google.maps.LatLng(42.829159482080662, 3.037131783685507),
		new google.maps.LatLng(42.82915318317032, 3.037145218030587),
		new google.maps.LatLng(42.829146882960352, 3.037159874242275),
		new google.maps.LatLng(42.82914238234531, 3.037174531532976),
		new google.maps.LatLng(42.829138780176429, 3.037189189361901),
		new google.maps.LatLng(42.829136076955656, 3.03720506959999),
		new google.maps.LatLng(42.829135172429268, 3.037220950919411),
		new google.maps.LatLng(42.829135166850286, 3.03723805464961),
		new google.maps.LatLng(42.829136060115573, 3.03725393705145),
		new google.maps.LatLng(42.829138752075266, 3.03726982053789),
		new google.maps.LatLng(42.829142343780198, 3.037284482698127),
		new google.maps.LatLng(42.829146834831093, 3.037299146625587),
		new google.maps.LatLng(42.829159413820534, 3.037327252341779),
		new google.maps.LatLng(42.829167503058557, 3.037339474708104),
		new google.maps.LatLng(42.8291755917949, 3.037350475206632),
		new google.maps.LatLng(42.829185479626659, 3.037360254924015),
		new google.maps.LatLng(42.82919536785765, 3.037368812773684),
		new google.maps.LatLng(42.829206156236054, 3.037374928650456),
		new google.maps.LatLng(42.829216944614586, 3.037381043306247),
		new google.maps.LatLng(42.829228633141092, 3.037384715987884),
		new google.maps.LatLng(42.829240322067676, 3.037387166799087),
		new google.maps.LatLng(42.829252011394097, 3.03738839696228)
	],
	[
		new google.maps.LatLng(42.787528708546056, 3.037050268636555),
		new google.maps.LatLng(42.787539482892214, 3.037094224281556),
		new google.maps.LatLng(42.787537670680052, 3.037135731512498),
		new google.maps.LatLng(42.787520574944061, 3.03716868222065),
		new google.maps.LatLng(42.787486401468279, 3.037182089549078)
	],
	[
		new google.maps.LatLng(42.829336630654886, 3.037119679886327),
		new google.maps.LatLng(42.829328540996258, 3.037108679388893),
		new google.maps.LatLng(42.829318653143083, 3.03709889968902),
		new google.maps.LatLng(42.829308764892048, 3.037090341865543),
		new google.maps.LatLng(42.829287188104161, 3.037078111416166)
	],
	[
		new google.maps.LatLng(42.802150277827756, 3.03709133440053),
		new google.maps.LatLng(42.802684380768447, 3.037133193908697),
		new google.maps.LatLng(42.803119575039425, 3.037168884252204)
	],
	[
		new google.maps.LatLng(42.786094478249055, 3.03718608222659),
		new google.maps.LatLng(42.78609359212868, 3.037148237405504),
		new google.maps.LatLng(42.786103490761064, 3.037125048852254),
		new google.maps.LatLng(42.786122379527285, 3.037106749764586)
	],
	[
		new google.maps.LatLng(42.806088652439314, 3.037299008553666),
		new google.maps.LatLng(42.806090469594473, 3.037245277179906),
		new google.maps.LatLng(42.806104871351124, 3.037202543659814),
		new google.maps.LatLng(42.806125566452977, 3.037163479369536),
		new google.maps.LatLng(42.806154349923567, 3.037136631622563),
		new google.maps.LatLng(42.806188523719115, 3.037121998806351),
		new google.maps.LatLng(42.806221795487225, 3.037118355743916),
		new google.maps.LatLng(42.806255961334571, 3.037128147590084),
		new google.maps.LatLng(42.806279332796905, 3.037150144706127)
	],
	[
		new google.maps.LatLng(42.787420776944657, 3.037136877514697),
		new google.maps.LatLng(42.787195074790404, 3.037163590305894),
		new google.maps.LatLng(42.78690822844743, 3.03719270700237),
		new google.maps.LatLng(42.786568328984387, 3.037225450936618),
		new google.maps.LatLng(42.786295870347097, 3.037252133665729),
		new google.maps.LatLng(42.786186168522768, 3.037259387642091)
	],
	[
		new google.maps.LatLng(42.787486401468279, 3.037182089549078),
		new google.maps.LatLng(42.787446839645995, 3.037177180366645),
		new google.maps.LatLng(42.787420776944657, 3.037136877514697)
	],
	[
		new google.maps.LatLng(42.806279332796905, 3.037150144706127),
		new google.maps.LatLng(42.806296412485274, 3.037163588125822),
		new google.maps.LatLng(42.806308993930742, 3.037184356141548),
		new google.maps.LatLng(42.806320673631681, 3.037212452139233),
		new google.maps.LatLng(42.806330553030186, 3.03724543029654),
		new google.maps.LatLng(42.806335037716167, 3.037279626632867),
		new google.maps.LatLng(42.806334123491297, 3.037322368431904),
		new google.maps.LatLng(42.806323319792746, 3.037360218578393),
		new google.maps.LatLng(42.806308921179863, 3.037393182084505)
	],
	[
		new google.maps.LatLng(42.803119575039425, 3.037168884252204),
		new google.maps.LatLng(42.803454063655067, 3.037195963768815)
	],
	[
		new google.maps.LatLng(42.829252011394097, 3.03738839696228),
		new google.maps.LatLng(42.829263701521356, 3.037387182158255),
		new google.maps.LatLng(42.829275392048451, 3.037384746704373),
		new google.maps.LatLng(42.829287082975675, 3.037381089376824),
		new google.maps.LatLng(42.829297875354683, 3.037374987758246),
		new google.maps.LatLng(42.829308668633637, 3.037368886138173),
		new google.maps.LatLng(42.829318562463705, 3.037360340225176),
		new google.maps.LatLng(42.829328457592794, 3.037350573659633),
		new google.maps.LatLng(42.82933655442465, 3.037339582907823),
		new google.maps.LatLng(42.829344651654651, 3.03732737150246),
		new google.maps.LatLng(42.829350950586289, 3.037313937134336),
		new google.maps.LatLng(42.82935724991561, 3.037299280889342),
		new google.maps.LatLng(42.829361751446832, 3.03728462355733),
		new google.maps.LatLng(42.829365352727599, 3.037269965680568),
		new google.maps.LatLng(42.829368055957318, 3.037254085386523),
		new google.maps.LatLng(42.82936896048836, 3.037238204007775),
		new google.maps.LatLng(42.829368966967564, 3.037221100213356),
		new google.maps.LatLng(42.829368072797458, 3.037205217751626),
		new google.maps.LatLng(42.829365380828833, 3.037189334209093)
	],
	[
		new google.maps.LatLng(42.786186168522768, 3.037259387642091),
		new google.maps.LatLng(42.786151998222657, 3.037263027685773),
		new google.maps.LatLng(42.786125025034849, 3.037256906338981),
		new google.maps.LatLng(42.786102556183565, 3.037227593213525),
		new google.maps.LatLng(42.786094478249055, 3.03718608222659)
	],
	[
		new google.maps.LatLng(42.803454063655067, 3.037195963768815),
		new google.maps.LatLng(42.803528693897327, 3.03720333805106),
		new google.maps.LatLng(42.803987265236408, 3.037246371687647)
	],
	[
		new google.maps.LatLng(42.786208667868451, 3.037200804340476),
		new google.maps.LatLng(42.786205062491291, 3.037225217729155),
		new google.maps.LatLng(42.786198760748334, 3.03724718744763),
		new google.maps.LatLng(42.786186168522768, 3.037259387642091)
	],
	[
		new google.maps.LatLng(42.803987265236408, 3.037246371687647),
		new google.maps.LatLng(42.804083474993725, 3.0372549816879),
		new google.maps.LatLng(42.804248921074709, 3.037269741537144),
		new google.maps.LatLng(42.804697604485909, 3.037303000327052)
	],
	[
		new google.maps.LatLng(42.805529340900172, 3.037342612492216),
		new google.maps.LatLng(42.80594657383724, 3.037318455693087),
		new google.maps.LatLng(42.805990635120651, 3.037314820481855),
		new google.maps.LatLng(42.80603020015073, 3.037312403967086),
		new google.maps.LatLng(42.806088652439314, 3.037299008553666)
	],
	[
		new google.maps.LatLng(42.804697604485909, 3.037303000327052),
		new google.maps.LatLng(42.804867547201738, 3.037315321605241),
		new google.maps.LatLng(42.80505726833367, 3.037336203424255),
		new google.maps.LatLng(42.805171464487898, 3.037341161604531)
	],
	[
		new google.maps.LatLng(42.805171464487898, 3.037341161604531),
		new google.maps.LatLng(42.805352197899197, 3.037349825397448),
		new google.maps.LatLng(42.805372879766956, 3.037348617707032)
	],
	[
		new google.maps.LatLng(42.805372879766956, 3.037348617707032),
		new google.maps.LatLng(42.805391763833207, 3.037347408930462),
		new google.maps.LatLng(42.805469993350592, 3.03734623720497),
		new google.maps.LatLng(42.805529340900172, 3.037342612492216)
	],
	[
		new google.maps.LatLng(42.829252011394097, 3.03738839696228),
		new google.maps.LatLng(42.829260090915142, 3.037427495650749),
		new google.maps.LatLng(42.829253772523707, 3.037494683796766)
	],
	[
		new google.maps.LatLng(42.806308921179863, 3.037393182084505),
		new google.maps.LatLng(42.806378157381289, 3.037396890645034),
		new google.maps.LatLng(42.806434802169889, 3.037410360528081)
	],
	[
		new google.maps.LatLng(42.806434802169889, 3.037410360528081),
		new google.maps.LatLng(42.806537301234819, 3.037434849767737),
		new google.maps.LatLng(42.807155926123606, 3.037488982000785),
		new google.maps.LatLng(42.80728270924736, 3.037497612575959)
	],
	[
		new google.maps.LatLng(42.811640110304722, 3.037749571156188),
		new google.maps.LatLng(42.811627568768216, 3.037616439380927),
		new google.maps.LatLng(42.81159976337036, 3.037417347140904)
	],
	[
		new google.maps.LatLng(42.780483540354666, 3.037493762599627),
		new google.maps.LatLng(42.780357671130396, 3.037453400077363),
		new google.maps.LatLng(42.78028392452098, 3.037496076135204),
		new google.maps.LatLng(42.780230854406497, 3.037548529424639)
	],
	[
		new google.maps.LatLng(42.795795293431276, 3.038361985192069),
		new google.maps.LatLng(42.796085146660175, 3.0374684135838)
	],
	[
		new google.maps.LatLng(42.829253772523707, 3.037494683796766),
		new google.maps.LatLng(42.829216837875052, 3.037686464664916),
		new google.maps.LatLng(42.829174499920128, 3.037899010127989),
		new google.maps.LatLng(42.829018609247996, 3.038815167355406)
	],
	[
		new google.maps.LatLng(42.80728270924736, 3.037497612575959),
		new google.maps.LatLng(42.807867170257182, 3.037535847723095),
		new google.maps.LatLng(42.808312254180841, 3.037580100107908)
	],
	[
		new google.maps.LatLng(42.780483540354666, 3.037493762599627),
		new google.maps.LatLng(42.780508589880846, 3.037856314679474)
	],
	[
		new google.maps.LatLng(42.789571453777391, 3.037572873481538),
		new google.maps.LatLng(42.789955416703705, 3.037532832467753),
		new google.maps.LatLng(42.790042640396052, 3.037521901607657)
	],
	[
		new google.maps.LatLng(42.790042640396052, 3.037521901607657),
		new google.maps.LatLng(42.790183792228717, 3.037575710751254),
		new google.maps.LatLng(42.790263799468327, 3.037633142594279),
		new google.maps.LatLng(42.790383360300837, 3.037717460539392),
		new google.maps.LatLng(42.790471450039526, 3.037801757138292)
	],
	[
		new google.maps.LatLng(42.808312254180841, 3.037580100107908),
		new google.maps.LatLng(42.80917725455263, 3.037646607343513),
		new google.maps.LatLng(42.809515338702191, 3.037681020734827),
		new google.maps.LatLng(42.809963120627302, 3.037727719971578),
		new google.maps.LatLng(42.810869488287047, 3.037785709427816)
	],
	[
		new google.maps.LatLng(42.788725297548055, 3.037661447805203),
		new google.maps.LatLng(42.78918119634919, 3.03761534988946),
		new google.maps.LatLng(42.789571453777391, 3.037572873481538)
	],
	[
		new google.maps.LatLng(42.787990644631215, 3.037736662212641),
		new google.maps.LatLng(42.788222640256926, 3.037713616967768),
		new google.maps.LatLng(42.788725297548055, 3.037661447805203)
	],
	[
		new google.maps.LatLng(42.811640110304722, 3.037749571156188),
		new google.maps.LatLng(42.811621225936172, 3.037754443281141),
		new google.maps.LatLng(42.811610433109593, 3.037761764613273),
		new google.maps.LatLng(42.811596042477937, 3.037770304046548),
		new google.maps.LatLng(42.811589743479104, 3.037783734511794),
		new google.maps.LatLng(42.811581643350721, 3.037804491790223),
		new google.maps.LatLng(42.811576242888322, 3.037820365844484),
		new google.maps.LatLng(42.811570838283465, 3.037846009632077)
	],
	[
		new google.maps.LatLng(42.787990644631215, 3.037736662212641),
		new google.maps.LatLng(42.787991529747757, 3.037776949094679),
		new google.maps.LatLng(42.787992383465983, 3.037906357269152),
		new google.maps.LatLng(42.787996834362353, 3.038033324321058),
		new google.maps.LatLng(42.787987827888337, 3.038074826182262),
		new google.maps.LatLng(42.787969834976025, 3.038100452420343),
		new google.maps.LatLng(42.787938358634598, 3.038116301883578),
		new google.maps.LatLng(42.787817863079603, 3.038133313858312),
		new google.maps.LatLng(42.787532815947912, 3.038157543268338)
	],
	[
		new google.maps.LatLng(42.810869488287047, 3.037785709427816),
		new google.maps.LatLng(42.811551056585913, 3.037844774782673)
	],
	[
		new google.maps.LatLng(42.790471450039526, 3.037801757138292),
		new google.maps.LatLng(42.790602666561085, 3.037980089891266),
		new google.maps.LatLng(42.790802202500181, 3.038210964837088),
		new google.maps.LatLng(42.790915464643021, 3.038306268326564),
		new google.maps.LatLng(42.791037733295113, 3.03836006708933),
		new google.maps.LatLng(42.791160920329652, 3.038362590592929),
		new google.maps.LatLng(42.791502619550741, 3.038329851590007),
		new google.maps.LatLng(42.791973812221869, 3.038264233927179),
		new google.maps.LatLng(42.792031367738026, 3.038241075248484),
		new google.maps.LatLng(42.792054758340825, 3.038208125099109),
		new google.maps.LatLng(42.792061090643394, 3.03810069088251)
	],
	[
		new google.maps.LatLng(42.780508589880846, 3.037856314679474),
		new google.maps.LatLng(42.780540964754849, 3.037842909357356),
		new google.maps.LatLng(42.780710901345238, 3.037861329429587),
		new google.maps.LatLng(42.781824937190713, 3.037962150991413),
		new google.maps.LatLng(42.782203474769844, 3.037997797899622)
	],
	[
		new google.maps.LatLng(42.782203474769844, 3.037997797899622),
		new google.maps.LatLng(42.782820286669036, 3.038053133091363)
	],
	[
		new google.maps.LatLng(42.782820286669036, 3.038053133091363),
		new google.maps.LatLng(42.783086431712356, 3.038078941819613),
		new google.maps.LatLng(42.783310319090283, 3.038098619922636)
	],
	[
		new google.maps.LatLng(42.792061090643394, 3.03810069088251),
		new google.maps.LatLng(42.792168956914971, 3.038200874893263),
		new google.maps.LatLng(42.792520536088901, 3.038201106635664),
		new google.maps.LatLng(42.793280340645822, 3.038205268590069)
	],
	[
		new google.maps.LatLng(42.794248748312313, 3.038232765582533),
		new google.maps.LatLng(42.794210984777997, 3.038226635122584),
		new google.maps.LatLng(42.794140861996738, 3.038189961319661),
		new google.maps.LatLng(42.794055457003395, 3.038141067626219),
		new google.maps.LatLng(42.793940373064807, 3.038109247354323),
		new google.maps.LatLng(42.793871139319656, 3.038100655271901),
		new google.maps.LatLng(42.793822567316077, 3.038145797745071),
		new google.maps.LatLng(42.79373980985801, 3.038239756105109),
		new google.maps.LatLng(42.79366695733605, 3.038292209143384),
		new google.maps.LatLng(42.79355994646108, 3.038315335314867),
		new google.maps.LatLng(42.793478124090413, 3.038307956426344),
		new google.maps.LatLng(42.793383716689291, 3.038288359349461),
		new google.maps.LatLng(42.793330674734065, 3.038261463385659),
		new google.maps.LatLng(42.793280340645822, 3.038205268590069)
	],
	[
		new google.maps.LatLng(42.783310319090283, 3.038098619922636),
		new google.maps.LatLng(42.783930727377886, 3.038153959326681),
		new google.maps.LatLng(42.784130337101566, 3.038172402011395),
		new google.maps.LatLng(42.784446856127111, 3.038143311898386)
	],
	[
		new google.maps.LatLng(42.784889158937219, 3.038397517551125),
		new google.maps.LatLng(42.784554655093125, 3.03842781517091),
		new google.maps.LatLng(42.784485418086916, 3.038431432694416),
		new google.maps.LatLng(42.784467439975515, 3.038415551129359),
		new google.maps.LatLng(42.784446856127111, 3.038143311898386)
	],
	[
		new google.maps.LatLng(42.787532815947912, 3.038157543268338),
		new google.maps.LatLng(42.787215397590344, 3.038184193342063),
		new google.maps.LatLng(42.787094005116018, 3.038193879415531)
	],
	[
		new google.maps.LatLng(42.787094005116018, 3.038193879415531),
		new google.maps.LatLng(42.786386332792631, 3.038256895613915),
		new google.maps.LatLng(42.785685852171149, 3.03832357663847)
	],
	[
		new google.maps.LatLng(42.794700118053832, 3.038285563013567),
		new google.maps.LatLng(42.794325173422578, 3.038246245817958),
		new google.maps.LatLng(42.794282914438675, 3.038238892604317)
	],
	[
		new google.maps.LatLng(42.795032809420796, 3.038300434249277),
		new google.maps.LatLng(42.794700118053832, 3.038285563013567)
	],
	[
		new google.maps.LatLng(42.795396977277449, 3.038304336750069),
		new google.maps.LatLng(42.795032809420796, 3.038300434249277)
	],
	[
		new google.maps.LatLng(42.795795293431276, 3.038361985192069),
		new google.maps.LatLng(42.795580387215857, 3.038366726986985),
		new google.maps.LatLng(42.795572317166837, 3.038305672627309),
		new google.maps.LatLng(42.795396977277449, 3.038304336750069)
	],
	[
		new google.maps.LatLng(42.785685852171149, 3.03832357663847),
		new google.maps.LatLng(42.785379224223178, 3.038352673764677),
		new google.maps.LatLng(42.784889158937219, 3.038397517551125)
	],
	[
		new google.maps.LatLng(42.829018609247996, 3.038815167355406),
		new google.maps.LatLng(42.828982564563546, 3.03902527160371),
		new google.maps.LatLng(42.828970853452418, 3.039085125898672)
	],
	[
		new google.maps.LatLng(42.828970853452418, 3.039085125898672),
		new google.maps.LatLng(42.828880762305765, 3.039549301811388)
	],
	[
		new google.maps.LatLng(42.828880762305765, 3.039549301811388),
		new google.maps.LatLng(42.828774451030448, 3.040101425326854),
		new google.maps.LatLng(42.828746550306064, 3.040168598652792),
		new google.maps.LatLng(42.828719554918564, 3.040218668888268)
	],
	[
		new google.maps.LatLng(42.828603469757681, 3.041150259421228),
		new google.maps.LatLng(42.828599607064909, 3.04114949731641),
		new google.maps.LatLng(42.828663591005125, 3.040784263479722),
		new google.maps.LatLng(42.828743786611255, 3.040344518117002),
		new google.maps.LatLng(42.828740206556368, 3.040300534857284),
		new google.maps.LatLng(42.828719554918564, 3.040218668888268)
	]
];

// -*- coding: utf-8 -*-
var depart_7={
	'lat' : 42.7675065,
	'lon' : 2.8695922,
	'nom' : '<p align="center"><span style="color: Blue;"><strong>Circuit n 7, repére 1</strong></span></p><p align="left"><br/>Départ, parking de l\'office de tourisme</p><p align="center">&nbsp;&nbsp;&nbsp;<a href=\"javascript:gotoPoint(42.7675065,2.8695922,17);\">zoom</a></p>',
	'tooltip' : 'Circuit n 7, repére 1',
	'type' : 12
};
var depart_8={
	'lat' : 42.814646294918,
	'lon' : 2.74516582489014,
	'nom' : '<p align="center"><span style="color: Blue;"><strong>Circuit n 8, repére 1</strong></span></p><p align="left"><br/>Départ, parking du Palais Des Congrés</p><p align="center">&nbsp;&nbsp;&nbsp;<a href=\"javascript:gotoPoint(42.814646294918,2.74516582489014,17);\">zoom</a></p>',
	'tooltip' : 'Circuit n 8, repére 1',
	'type' : 12
};
var depart_9={
	'lat' : 42.7734478053249,
	'lon' : 2.69956827163696,
	'nom' : '<p align="center"><span style="color: Blue;"><strong>Circuit n 9, repére 1</strong></span></p><p align="left"><br/>Départ, place Francisco Ferrer, où se trouve l\'Eglise </p><p align="center">&nbsp;&nbsp;&nbsp;<a href=\"javascript:gotoPoint(42.7734478053249,2.69956827163696,17);\">zoom</a></p>',
	'tooltip' : 'Circuit n 9, repére 1',
	'type' : 12
};

