





LoginForm = Ext.extend(Ext.form.FormPanel, {
    floating: true,
    modal: true,
    centered: true,
	id:'theloginform',
    width: 300,
	height:380,
    scroll: 'vertical',
    items: [
        {
            xtype: 'fieldset',
            title: 'Inscrivez-vous !',
            instructions: 'Rejoignez les premiers avertis et recevez gratuitement la prochaine version (localisation, trams, sauvegarde..)',
			text:'test',
            defaults: {
                required: true,
                labelAlign: 'left'
            },
            items: [
                {
                    xtype: 'textfield',
                    name: 'nom',
                    label: 'Nom'
                },
                {
                    xtype: 'emailfield',
                    name: 'email',
                    label: 'Mail',
					placeHolder:"mail@adresse.fr"
                }
            ]
        },
        {
            xtype: 'button',
            text: 'Valider',
            ui: 'confirm',
            handler: function() {
				Ext.getCmp("theloginform").hide();
                var form = this.ownerCt;
				var fvalue = form.getValues();
				fvalue.donnes = localStorage;
				
				Ext.Ajax.request({
					url: 'http://www.flxcreations.fr/apps/vcub/data/inscription.php',
					params: fvalue,
					success: function(response, opts) {
						Ext.Msg.alert('Création réussie', response.responseText, Ext.emptyFn);
					}
				});

            }
        }
    ]
});

Ext.setup({
     phoneStartupScreen: 'img/startup.png',
     icon: 'img/icon.png',
     glossOnIcon: true,
     onReady: function() {
		 var stations = [];
		 var scopeactual = this;
		 var stationsFavorites = [];
		 var listeAlreadyLoaded = false;
		 var showingStation = {};
		 var lf = new LoginForm();
		 var sf = new Ext.Panel({
				floating: true,
				modal: true,
				centered: true,
				id:'thesearchform',
				width: 300,
				height:230,
				scroll: 'vertical',
				items: [
					{
						xtype: 'fieldset',
						title: 'Quelle station recherchez-vous ?',
						defaults: {
							labelAlign: 'left'
						},
						items: [
							{
								xtype: 'textfield',
								name: 'station',
								id:'stationtosearch',
								label: 'Station'
							}
						]
					},
					{
						xtype: 'button',
						text: 'Valider',
						ui: 'confirm',
						handler: function() {
							var t = Ext.getCmp("stationtosearch").getValue();	
							var r = Ext.getCmp("listedestations").getStore().findRecord("title", t, 0,true);
							if(r!=null) {
								showDetailStation(r);								
							}
							else {
								Ext.Msg.alert('Aucun résultat', "Aucune station de ce nom. Avez-vous essayé sans accent ?", Ext.emptyFn);								
							}
							sf.hide();
						}
					}
				],
				listeners: {
					show: function() {
						sf.doLayout();	
					}
				}
			});
		 lf.hide();
		 sf.hide();
		 var modelListFavoris,storeListFavoris;
		 
		 
		modelListFavoris = Ext.regModel("ListFavoris", {
			 fields: [
			   {name: "id", type: "int"},
			   {name: "title", type: "string"},
			   {name: "stationid", type: "int"}	
			 ],
			 proxy: {
			   type: 'localstorage',
			   id: 'mesfavoris'
			 }
		});
		
		
		storeListFavoris = new Ext.data.Store({
		 model: "ListFavoris"
		});
		//localStorage.clear();
		//Ext.Msg.alert('Favori', listetotal, Ext.emptyFn);
		 var megaThis = this;
		 
		
		var askDelete = new Ext.ActionSheet({
				items: [{
					text: 'Confirmer la suppression',
					ui: 'decline',
					handler: function() {
						var station = Ext.getCmp("carouselFavoris").getActiveItem();
						var node = storeListFavoris.findRecord("title", station.stationData.title);
						storeListFavoris.remove(node);
						storeListFavoris.sync();
						loadFavoris();
						askDelete.hide();
						Ext.getCmp("carouselFavoris").doLayout();
						getData();										
					}
				},{
					text : 'Annuler',
					ui:'action',
					handler : function() {
						askDelete.hide();	
					}
				}]
			});
		
		var askEmptyStorage = new Ext.ActionSheet({
				items: [{
					text: 'Supprimer tous les favoris',
					ui: 'decline',
					handler: function() {
						localStorage.clear();
						storeListFavoris.sync();
						askEmptyStorage.hide();
						Ext.Msg.alert('Favoris vides', "Vous n'avez plus aucun favoris enregistré.", Ext.emptyFn);
						getData();	
					}
				},{
					text : 'Annuler',
					ui:'action',
					handler : function() {
						askEmptyStorage.hide();	
					}
				}]
			});
		var loadStations = function(donnees){
			stations = [];
			for(var i=0;i<donnees.length;i++) {
				stations[stations.length] = {
					"title": donnees[i].title,
					"first":donnees[i].title.substr(0,1),
					"pubDate":  donnees[i].pubDate,
					"description":  donnees[i].description,
					"guid": donnees[i].guid,
					"georss:point": donnees[i]['georss:point'],
					"geo:Point": donnees[i]['geo:Point'],
					"bikes-station-id": donnees[i]['bikes:station-id'],
					"bikes-available-slots": donnees[i]['bikes:available-slots'],
					"bikes-available-vehicules": donnees[i]['bikes:available-vehicules'],
					"bikes-total-slots": donnees[i]['bikes:total-slots'],
					"bikes-station-type": donnees[i]['bikes:station-type'],
					"bikes-station-has-payment-terminal": donnees[i]['bikes:station-has-payment-terminal'],
					"bikes-station-online": donnees[i]['bikes:station-online'] 
				};
			}
			list.getStore().loadData(stations);
		};
		var loadFavoris = function(){
			storeListFavoris.sync();
			storeListFavoris.load();	
			storeListFavoris.sync();
				stationsFavorites = [];
				var cb, ids;
				
				storeListFavoris.each(function() {
					for(var i=0;i<stations.length;i++) {
						if(stations[i].data['bikes-station-id'] == this.data.stationid) {
							ids = this.data.id;
							if (stations[i].data['bikes:station-has-payment-terminal'] == "1") {
								cb = "Oui";
							}
							else {
								cb = "Non";
							}
							stationsFavorites[stationsFavorites.length] = {
								stationData:stations[i].data,
								layout:{type:'hbox', align:'stretch'},
								defaults:{flex:1},
								style:"background:#FFF;",
								items:[
									{
										ids:ids,
										html:'<p class="station_title">'+stations[i].data.title+'</p><p><img src="http://maps.google.com/maps/api/staticmap?center='+stations[i].data['geo:Point']['geo:lat']+','+stations[i].data['geo:Point']['geo:long']+'&zoom=15&maptype=satellite&size=150x230&sensor=false&markers=color:blue%7Clabel:'+'S'+'%7C'+stations[i].data['geo:Point']['geo:lat']+','+stations[i].data['geo:Point']['geo:long']+'" /></p>'				
								},
								{
									ids:ids,
									html:'<div class="station_detail"><p><span>Vélos : </span>'+stations[i].data['bikes-available-vehicules']+'</p><p><span class="places">Places : </span>'+stations[i].data['bikes-available-slots']+'</p><p><span class="places">Total : </span>'+stations[i].data['bikes-total-slots']+'</p><p><span class="places">Carte Bleue : </span>'+cb+'</p><p><span class="places">Type : </span>'+stations[i].data['bikes-station-type']+'</p></div>'
								}]
								
							};
							break;				
						}
					}
				});
				
							
				Ext.getCmp("carouselFavoris").removeAll();
				Ext.getCmp("carouselFavoris").add(stationsFavorites);
				Ext.getCmp("carouselFavoris").doLayout();
		};
		
		 Ext.regModel('Station', {
			fields: [
				'title',
				'first',
				'pubDate',
				'description',
				'guid',
				"georss:point",
				"geo:Point",
				"bikes-station-id",
				"bikes-availableslots",
				"bikes-available-vehicules",
				"bikes-total-slots",
				"bikes-station-type",
				"bikes-station-has-payment-terminal",
				"bikes-station-online"
			],
			idProperty:'bikes-station-id'
		});
		
		this.storeStations = new Ext.data.JsonStore({
			model  : 'Station',
			sorters: 'first',
			emptyText:'Vide',
			id:'storestation',
			getGroupString : function(record) {
				return record.get('first')[0];
			}
		});
		
		var list = new Ext.List({
			autoHeight:true,
			iconMask:true,
			title:'Liste',
			emptyText:'Vide',
			cls:'station',
			id:'listedestations',
			itemTpl : new Ext.XTemplate(
					'<div class="station_list" id="{bikes-station-id}">{title:this.renderTitle} <span class="velosdispo">{bikes-available-vehicules}</span></div>',
					
					{
                        renderTitle: function(title) {
							if(title.length > 19) {
								return title.substr(0,16)+"..";
							}
							else {
								return title;
							}
                        }
                    }
			),
			grouped : true,
			indexBar: true,
			itemSelector:'.station_list',			
			store: this.storeStations,
			listeners: {
				itemtap: function(t, index, item, e) {
						var stationSelected = Ext.getStore("storestation").getAt(index);
						if(stationSelected) {
//						Ext.Msg.alert('Station', 'Vous avez cliqué sur la station'+stationSelected.dom.id, Ext.emptyFn);
							showDetailStation(stationSelected);
							showingStation = stationSelected.data;
						}
						else {
							Ext.Msg.alert('Erreur', 'Erreur sur cette station', Ext.emptyFn);
						}
				}
			}
		});
		
		
		 
		var getData = function() {
			var panel = liste;			
			var maskList = new Ext.LoadMask(Ext.getBody(), {msg:"Chargement des stations..."});
			maskList.show();	
			Ext.Ajax.request({
				url: 'http://www.flxcreations.fr/apps/vcub/data/vcub.php',
				success: function(response, opts) {
					var d=JSON.parse(response.responseText);
					loadStations(d.items);
					loadFavoris();
					maskList.hide();
				}
			});
		};
		/*
		var getFavoris = function() {
			
			var maskFavoris = new Ext.LoadMask(Ext.getBody(), {msg:"Chargement des favoris..."});
			
			Ext.Ajax.request({
				url: 'data/favoris.php',
				success: function(response, opts) {
					var d=JSON.parse(response.responseText);
					loadFavoris(d);
					maskFavoris.hide();
				}
			});	
		}();*/
				
		var addFavoris = function(station) {
			var newFavoris = {
				stationid:station['bikes-station-id'],
				title:station.title	
			};
			storeListFavoris.add(newFavoris);
			storeListFavoris.sync();
			Ext.Msg.confirm("Station ajoutée", "Voulez-vous actualiser les stations favorites ?", function(result) {
				if(result == "yes") {
					getData();
					onglets.setActiveItem(0,{type:'cube',direction:'right'});	
				}
			});
		};
		
		var showDetailStation = function(s) {
				if (s.data['bikes-station-has-payment-terminal'] == "1") {
					cb = "Oui";
				}
				else {
					cb = "Non";
				}
			
			Ext.getCmp("detailstation_titre").update(s.data.title);
			Ext.getCmp("detailstation_map").update('<p><img src="http://maps.google.com/maps/api/staticmap?center='+s.data['geo:Point']['geo:lat']+','+s.data['geo:Point']['geo:long']+'+&zoom=15&size=150x260&sensor=false&markers=color:blue%7Clabel:'+'S'+'%7C'+s.data['geo:Point']['geo:lat']+','+s.data['geo:Point']['geo:long']+'" /></p>');
			Ext.getCmp("detailstation_info").update('<div class="station_detail"><p><span>Vélos : </span>'+s.data['bikes-available-vehicules']+'</p><p><span class="places">Places : </span>'+s.data['bikes-available-slots']+'</p><p><span class="places">Total : </span>'+s.data['bikes-total-slots']+'</p><p><span class="places">Carte Bleue : </span>'+cb+'</p><p><span class="places">Type : </span>'+s.data['bikes-station-type']+'</p></div>');
			liste.setActiveItem(1,{type:'slide',direction:'left'});	
			Ext.getCmp("backbutton").show();		
		};
		
		var searchStationGo = function(text) {		
//			Ext.Msg.alert('Recherche', text, Ext.emptyFn);
		};
		var searchStation = function() {
			sf.show();
		};
          var onglets;
		  var accueil;
		  var detailStation;
		  var mapStations;
		  var aboutPanel;
		  
		  
		  var carouselFavoris = new Ext.Carousel({
				flex:1.5,
				direction:'vertical',
				style:'margin-left:10px;',
				id:'carouselFavoris',
				items:[{
					html:'<p class="station_title">Aucune station favorite. Ajoutez-en à partir de la liste !</p>'
				}]
		 });
		 
		  accueil = new Ext.Panel({
			 layout:{type:'vbox',align:'stretch'},
			 iconCls:'home',
			 title:'Accueil',
			style:"background: #FFF",
			 dockedItems:[
				new Ext.Toolbar({
					ui:'light',
					title:'Vélos',
					items:[
						{xtype: 'spacer'},
						{xtype:'button',ui:'confirm',dock:'right',text:'Inscription', iconCls:'user',iconMask:true, handler:function() {
							lf.show('pop');
						}}
					]
				})
			],	
			 items:[
			 
			 //	{html:'<h2>Actualités VCUB</h2>',cls:'paneltitre', flex:0.2},
			 //actualitePanel,/*	
			 /*{
					style:'text-align: center;background:#5E99CC;font-size: 20px;font-weight: bold;color: #CCC;text-shadow: 0 1px 0 #000;',
					html:'<h1>Actualités du réseau</h1>',
					flex:0.4
				},*/
				
			 	{html:'<h2>Vos Stations favorites</h2>',cls:'paneltitre',flex:0.2},			
				carouselFavoris,
			 	{
					style:'border-top:1px solid #ccc;background:#EEE;',
					xtype:'toolbar',
					items:[
						{
							xtype:'button',
							iconCls:'info',
							iconMask:true,
							ui:'action',
							text:'Réseau',
							handler:function() {
								Ext.Msg.alert('Etat du réseau', "L'ensemble du réseau circule normalement.", Ext.emptyFn);
						}
						},
						{xtype: 'spacer'},
						{
							xtype:'button',
							text:'Retirer', 
							ui:'decline',
							iconCls:'delete',
							iconMask:true,
							handler:function() {
								askDelete.show();
							}
						}],
					ui:'white'
				}
			 ]					
		  });
		  
		  Ext.regModel('AboutPanelModel', {
			fields: ['action', 'label']
		});
		  
		  
		  var aboutPanelStore = new Ext.data.Store({
			model: 'AboutPanelModel',
			sorters: 'label',
			data: [
				{action: 'apropos', label: 'Informations'},
				{action:'viderlesfavoris',label:'Vider les favoris'}
			]
		});
		  
		  var aboutPanelDetailScreen = new Ext.Panel({
			 id:'aboutPanelDetailScreen',
			 cls:'aboutPanelDetailScreen',
			 layout:{type:'vbox', align:'center'},
			 defaults:{flex:1},
			 autoHeight:true,
			 scroll:'vertical',
			 dockedItems:[
				new Ext.Toolbar({
					dock:'top',
					ui:'light',
					items:[
						{xtype:'button',text:'Retour',ui:'back',handler:function() {
								Ext.getCmp("aboutpanel").setActiveItem(0, {type:'slide',direction:'right'});								
						}}
					]
				})					
			],
			 items:[{
				 html:'<p style="width:90%"><br /><br /><img src="img/flxcreations.png" alt=""  /><br /><br />Application non officielle affichant en temps réel les informations sur les stations de VCUB à Bordeaux. L\'auteur n\'est aucunement affilié au réseau TBC et VCUB/TBC sont des marques déposées.</p>'
			 },{
				 flex:0.3,
				 html:'<p class="site"><a href="http://www.flxcreations.fr">www.flxcreations.fr</a></p><p class="site"><a href="http://www.florentlamoureux.fr">www.florentlamoureux.fr</a></p><p class="copyright">Tout droits réservés</p>'
			 }]			 		  
		  });
		  
		  aboutPanel = {
			  	layout:'card',
				id:'aboutpanel',
				title: 'A Propos',
				iconCls:'info',
				items:[{
					layout:  {
						type: 'vbox',
						align: 'stretch'
					},
					dockedItems:[
						new Ext.Toolbar({
							dock:'top',
							ui:'light',
							title:"A Propos"
						})
					
					],
					cls: 'demo-list',
					items: [{
						autoHeight:true,
						xtype: 'list',
						store: aboutPanelStore, //getRange(0, 9),
						itemTpl: '<div class="menu_info_item" id="{action}"><strong>{label}</strong></div>',
						itemSelector:'.menu_info_item',
						listeners: {
							itemtap: function(t, index, item, e) {
								if(item.id == "apropos") {
									Ext.getCmp("aboutpanel").setActiveItem(1, 'slide');	
								}
								else if (item.id == "apropos") {
									Ext.getCmp("aboutpanel").setActiveItem(2, 'slide');	
								}
								else if (item.id == "viderlesfavoris") {									
									askEmptyStorage.show();
								}
							}
						}
					}]
				},aboutPanelDetailScreen]
			};
		  
		  
		  detailStation = new Ext.Panel({
			 layout:{type:'vbox',align:'stretch'},
			 defaults:{flex:1},
			style:'margin-left:10px;',
			dockedItems:[{
				style:'border-top:1px solid #ccc;background:#EEE;',
				xtype:'toolbar',
				dock:'bottom',
				items:[{xtype: 'spacer'},
					{
						xtype:'button',
						iconCls:'add',
						iconMask:true,
						ui:'confirm',
						text:'Ajouter en favoris',
						handler:function() {
							addFavoris(showingStation);
						}
					},{xtype: 'spacer'}
				]}],
			items:[{
					flex:0.2,
					id:'detailstation_titre',cls:'paneltitre'
				},
				{
					id:'infosStation',
					layout:{type:'hbox',align:'stretch'},
					defaults:{flex:1},
					style:"background:#FFF",
					items:[
						{
							id:'detailstation_map'
						},
						{
							id:'detailstation_info'
						}
					]
				}
			]
		 });
		 
		  
		mapStations = new Ext.Map({
			title: 'Carte',   
			align:'center',
			iconCls:'locate',    // Gets user's current location
			mapOptions: {        // Used in rendering map
			  zoom: 15,
		      center: new google.maps.LatLng(44.83826, -0.57648)
			}
		});
		
		panelMapStations = new Ext.TabPanel({
			title: 'Carte',   
			iconCls:'locate',
			items:[mapStations]
		});
		
			
		var addMarkers = function() {
			panelMapStations.setLoading(true);
			if(stations.length != 0) {					
				for(var dm = 0;dm<stations.length;dm++) {
					var position = new google.maps.LatLng(stations[dm]['data']['geo:Point']['geo:lat'], stations[dm]['data']['geo:Point']['geo:long']);
					addMarker(position,stations[dm]['data'].title);
				}
			}
			else {
				Ext.Msg.alert('Données vides', "Vous devez aller dans la liste, récupérer les données et réessayer.", Ext.emptyFn);
			}
			panelMapStations.setLoading(false);
		};
		
		 var tabBar = panelMapStations.getTabBar();
		tabBar.addDocked({
				xtype: 'button', 
				ui:'confirm',        // CSS class for the button
				dock: 'left', 
				iconCls:'add',
				iconMask:true,
				text:'Voir les stations',
				handler:function() {
					addMarkers();	
				}// Refreshes the current card when users tap
			});
        // These are all Google Maps APIs
        var addMarker = function(position,titre) {
            var marker = new google.maps.Marker({
                map: mapStations.map,
                position: position,
				title:titre,
				clickable:true,
				icon:'img/velo.jpg'
            });
        };
		
		  var liste = new Ext.Panel({
			title:'Liste',
			layout:'card',
			iconCls:'bookmarks',
			
			dockedItems: [
				{
					dock : 'top',
					xtype: 'toolbar',
					defaults:{iconMask:true,usePlain:true},
					items: [
						{
							text: 'Retour',
							ui:'back',
							id:'backbutton',
							hidden:true,
							handler: function() {
								liste.setActiveItem(0);	
								Ext.getCmp("backbutton").hide();
							}
						},
						{
							text: 'Actualiser',
							ui:'confirm',
							iconCls:'refresh',
							dock:"left",
							id:'actubutton',
							handler: function() {
								getData();	
							}
						},{xtype: 'spacer'},
						{
							text: 'Chercher',
							dock:"right",
							ui:'action',
							iconCls:'search',
							handler: function() {
								searchStation();	
							}
						}
					]
				}
			],
			items:[list, detailStation]
		});
			
		  onglets = new Ext.TabPanel({ 
				tabBar: {
					dock: 'bottom',
					layout: {
						pack: 'center'
					}
				},
				ui:'light',
				id:'onglets',
				//cardSwitchAnimation:{type:"slide",cover:true},
				cardSwitchAnimation:'slide',
				fullscreen:true,
				layout:{type:'vbox', align:'center'},
				items:[accueil,liste,panelMapStations,aboutPanel],
				listeners: {
					afterrender: function() {
						getData();	
					}
				}
		   });
    }
});
