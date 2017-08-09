


 
    	
    	document.addEventListener("deviceready", onDeviceReady, false);
    
	    function onDeviceReady() {
	        console.log("We got device ready");
	        navigator.splashscreen.hide();
	        
	    }
    
    

F2013 = {}

F2013.homes = [{
               xtype: 'schedulecontainer'
               }]

F2013.cerror_IT = 'Attenzione! per consultare la sezione/pagina atitvare la conessione dati.'

F2013.cerror_EN = 'Warning! to refer to the section/page activate the data connection.'

F2013.mapload = true;

F2013.languages = {
	'EN' : {
    homeNewsLabel: 'News',
    homeProgramsLabel: 'Schedule',
    homeXCLabel: 'Cross Country',
    homeSJLabel: 'Ski Jumping',
    homeCNLabel: 'Nordic Combined',
    homeEventiCollateraliLabel: 'Festival',
    homePlacesLabel: 'Venues',
    homeInfoLabel: 'Info',
    homePhotoLabel: 'Photo',
		
    Luoghi: 'Venues',
    viewinfo: 'Info',
		
    itemPlaceLabel:'Venue',
    News: 'News',
		
    scheduleAllLabel: 'All',
		
    specialityNewsLabel: 'News',
    specialityResultLabel: 'Results',
    specialityCalendarLabel: 'Calendar',
    specialityPhotogalleryLabel: 'Photo',
    specialityMostreLabel: 'Exhibitions'
	},
	
	'IT' : {
    homeNewsLabel: 'News',
    homeProgramsLabel: 'Programma',
    homePhotoLabel: 'Foto',
    homeXCLabel: 'Sci di Fondo',
    homeSJLabel: 'Salto Speciale',
    homeCNLabel: 'Combinata Nordica',
    homeEventiCollateraliLabel: 'Festival',
    homePlacesLabel: 'Luoghi',
    homeInfoLabel: 'Info',
        
    itemPlaceLabel:'Luogo',
		
    Luoghi:'Luoghi',
    Info: 'Info',
    News: 'News',
		
    scheduleAllLabel: 'Tutto',
		
    specialityNewsLabel: 'Notizie',
    specialityResultLabel: 'Risultati',
    specialityCalendarLabel: 'Calendario',
    specialityPhotogalleryLabel: 'Foto  ',
    specialityMostreLabel: 'Esposizioni'
	}
}

F2013.days = {
    'IT' : ['Domenica','Luned&igrave;','Marted&igrave;','Mercoled&igrave;','Gioved&igrave;','Venerd&#236;','Sabato'],
    'EN' : ['Sunday','Monday;','Tuesday','Wednesday','Thursday;','Friday','Saturday']
},

F2013.months = {
    'IT' : ['Gennaio','Febbraio','Marzo','Aprile','Maggio','Giugno','Luglio','Agosto','Settembre','Ottobre','Novembre','Dicembre'],
    'EN' : ['January','February','March','April','May','June','July','August','September','October','November','December']
},

F2013.lang  = '',

F2013.timecache = 60000,

F2013.placesPosition = {
	'XC' : {
    latitude: 46.282856,
    longitude: 11.523424
	},
	'SJ' : {
    latitude: 46.328713,
    longitude: 11.601369
	}
}

F2013.centerPlaces = { "latitude": 46.296899, "longitude": 11.524045}

F2013.albumid={"XC":757,"SJ":1525,"CN":1529,"EventiCollaterali":1533}

F2013.map = {
	'EN':{
    mypos: 'My Position',
    center: 'Val di Fiemme',
    cancel: 'Cancel'
	},
	'IT':{
    mypos: 'La mia posizione',
    center: 'Val di Fiemme',
    cancel: 'Annulla'
	}
}

F2013.places = [
                {
                "name": 		{
                'IT':"Stadio del Fondo",
                'EN':"Cross Country Stadium"
                },
                "description":	"...a Lago di Tesero",
                "image": 		"img/icons_map/Ico-map_xc.png",
                "latitude": 	46.282821,
                "longitude": 	11.523498,
                "x_ico":		32,
                "y_ico":		67,
                "tag":			"XC"
                },
                {
                "name": 		{
                'IT':"Stadio del Salto",
                'EN': 'Ski Jumping Stadium'
                },
                "description":	"...a Predazzo",
                "image": 		"img/icons_map/Ico-map_sj.png",
                "latitude": 	46.328713,
                "longitude": 	11.601369,
                "x_ico":		34,
                "y_ico":		66,
                "tag":			"SJ"
                }
                ]


Ext.define('F2013.store.Calendar', {
    extend: 'Ext.data.Store',
    xtype: 'storecalendar',
    name: 'MyStoreCalendar',
    
    config: {
    	pageSize: 50,
	    autoLoad: false,
	    grouper: {
	        groupFn: function(record) {
	        	var str = record.get('S_DATE');
	        	var d = new Date(str.substring(0,4), parseInt(str.substring(4,6))-1,str.substring(6,8));
	        	var days = F2013.days[F2013.lang];
	        	//console.log('ENTER IN d days' + str + ' - ' + d +  ' - ' + d.getDay());
	        	var stamp = F2013.days[F2013.lang][d.getDay()]+ '<br>' + str.substring(6,8) + ' ' + F2013.months[F2013.lang][d.getMonth()]
	            //console.log('ENTER IN store grouped di calendar - ' + stamp );
	            return stamp;
	            
	        },
            sortProperty: 'S_DATE_C'
	    },
		listeners: {
						
			load: function(store, record, successful, operation, eOpts) {
				var d = new Date().getTime();
                if (store.config.proxy.extraParams.metatype == 'Guestbook'){
                    tag = 'Guestbook'
                }
                else
                {
                    tag = store.config.proxy.extraParams.tag
                }
				console.log('ENTER in store calendar ' + Ext.encode(operation['_response']));
				window.localStorage.removeItem('schedule-' + tag + '-'+ store.config.proxy.extraParams.lang);
				window.localStorage.setItem('schedule-' + tag + '-'+ store.config.proxy.extraParams.lang +'-time',d);
				window.localStorage.setItem('schedule-' + tag + '-'+ store.config.proxy.extraParams.lang, Ext.encode(operation['_response']));
			}
		},
	    model: 'F2013.model.Calendar',
	    proxy: {
			type: 'jsonp',
			callbackKey: 'jsoncallback',
			extraParams: {
				RefOwner: '72DF9D84F4194F3CBB4993433B7A3E40',
				metatype: 'EventHTML',
				lang: 'IT',
				s_date: '20120101',
				e_date: '20170401',
				format: 'json',
			    tag: '',
			    limit:50,
                system: F2013.os
			},
			url: Ext.String.format('http://apps.fiemme2013.com/v4web/events'),
			reader: {
				type: 'json'
			}
		}
    }
});


Ext.define('F2013.store.Luoghi', {
    extend: 'Ext.data.Store',
    xtype: 'storeluoghi',

    config: {
	   autoLoad: false,
	   model: 'F2013.model.Luoghi',
	   proxy : {
		    type : 'ajax',
		    url:'',
		    reader : {
		    	type : 'json',
		    	root : 'results',
		    	totalCount : 'total'
		    }
		 }

    }
});


Ext.define('F2013.store.Result', {
    extend: 'Ext.data.Store',
    xtype: 'storeresult',
    name: 'MyStoreResult',
    
    config: {
    	pageSize: 50,
	    autoLoad: false,
	    model: 'F2013.model.Result',
	    listeners: {
			load: function(store, record, successful, operation, eOpts) {
				var d = new Date().getTime();
                var p = {"UUID": "BB843CD4EC1C49669049E733AD0F1266", "C_TIME": 160635, "LABEL1": "Tour de Ski 2013 - 9 Km maschile Winner of the Day", "ABSTRACT": "Winner of the Day - Final Climb", "P_DATE": 20130106, "REAL_DATE": "20130106", "PRIORITY": 10, "TAG": "XC", "REAL_DATE_F": "06.01.2013", "REAL_TIME": "160635", "IMAGE": "http://storage.fiemme2013.com/x00001/public/72DF9D84F4194F3CBB4993433B7A3E40/WebElements/BB843CD4EC1C49669049E733AD0F1266THUMB.jpg"};
                var res = []
                //res.push(p);
                res.push(operation['_response']);
                console.log(res)
				window.localStorage.setItem('result-' + store.config.proxy.extraParams.tag + '-'+ store.config.proxy.extraParams.lang +'-time',d);
				window.localStorage.setItem('result-' + store.config.proxy.extraParams.tag + '-'+ store.config.proxy.extraParams.lang, Ext.encode(res));
			}
		},
	    proxy: {
            type: 'jsonp',
			callbackKey: 'jsoncallback',
			extraParams: {
				tag: '',
				lang: 'IT',
                system: F2013.os

			},
			url: 'http://apps.fiemme2013.com/v4web/taggedobjects?RefOwner=72DF9D84F4194F3CBB4993433B7A3E40&metatype=EventTXT',
			reader: {
				type: 'json'
            }
           
        }

    }
});


Ext.define('F2013.store.News', {
    extend: 'Ext.data.Store',
    xtype: 'storenews',
    name: 'MyStoreNews',
    
    config: {
    	pageSize: 50,
	    autoLoad: false,
		listeners: {
			load: function(store, record, successful, operation, eOpts) {
				var d = new Date().getTime();
				window.localStorage.setItem('news-' + store.config.proxy.extraParams.tag + '-'+ store.config.proxy.extraParams.lang +'-time',d);
				window.localStorage.setItem('news-' + store.config.proxy.extraParams.tag + '-'+ store.config.proxy.extraParams.lang, Ext.encode(operation['_response']));
			
			}
		},
	    model: 'F2013.model.News',
	   
		proxy: {
            type: 'jsonp',
			callbackKey: 'jsoncallback',
			extraParams: {
				tag: '',
                lang: 'IT',
                system: F2013.os

			},
			url: 'http://apps.fiemme2013.com/v4web/taggedobjects?RefOwner=72DF9D84F4194F3CBB4993433B7A3E40&CATEGORYID=248&CATEGORYID=249&CATEGORYID=3019',
			reader: {
				type: 'json'
			}
        }
    }
});


Ext.define('F2013.store.Meteo', {
    extend: 'Ext.data.Store',
    xtype: 'storemeteo',
    name: 'MyMeteoStore',

    config: {
    	pageSize: 5,
	    autoLoad: true,
		model: 'F2013.model.Meteo',
	    proxy: {
			type: 'jsonp',
			callbackKey: 'jsoncallback',
			extraParams: {
				tag: '',
                lang: 'IT',
                system: F2013.os

			},
			url: Ext.String.format('http://apps.fiemme2013.com/v4web/meteo'),
			reader: {
				type: 'json'
			}
		}
    }
});


Ext.define('F2013.store.Info', {
    extend: 'Ext.data.Store',
	alias: 'widget.storeinfo',

    config: {
       pageSize: 50,
           autoLoad: false,
           model: 'F2013.model.Info',
           proxy : {
                type : 'ajax',
                reader : {
                        type : 'json',
                        root : 'results',
                        totalCount : 'total'
                }
           }

    }
});


Ext.define('F2013.model.Calendar', {
    extend: 'Ext.data.Model',
    name: 'ModelCalendar',
    config: {
        idProperty: 'CalendarId',
        fields: [
			'ABSTRACT',
			'EVENT_TYPE',
			'E_DATE',
			'E_TIME',
			'IMAGE',
			'LABEL1',
			'PLACE',
			'PRIORITY',
			'P_DATE',
			'S_DATE',
			'S_DATE_F',
			'S_TIME',
			'S_DATE_C',
			'TAG',
			'UUID'
		]
    }
});


Ext.define('F2013.model.Luoghi', {
    extend: 'Ext.data.Model',
    config: {
        fields: [
			'name',
			'description',
			'image',
			'latitude',
			'longituge',
			'tag',
			'config'
		]
    }
});


Ext.define('F2013.model.Result', {
    extend: 'Ext.data.Model',
    config: {
        fields: [
                 'ABSTRACT', 
                 'C_TIME', 
                 'IMAGE',
                 'LABEL1',
                 'OID',
                 'PRIORITY',
                 'P_DATE',
                 'REAL_DATE',
                 'REAL_DATE_F',
                 'REAL_TIME',
                 'TAG',
                 'UUID'
        ],
        
    }
});

Ext.define('F2013.model.News', {
    extend: 'Ext.data.Model',
    name: 'ModelNews',
    config: {
        fields: [
                 'ABSTRACT',
                 'C_TIME',
                 'IMAGE',
                 'LABEL1',
                 'OID',
                 'PRIORITY',
                 'P_DATE',
                 'REAL_DATE',
                 'REAL_DATE_F',
                 'REAL_TIME',
                 'TAG',
                 'UUID'
         ]

    }
});

Ext.define('F2013.model.Meteo', {
    extend: 'Ext.data.Model',
    name: 'ModelMeteo',
    config: {
        fields: [
			'icona',
			'ventovel',
			'probprec',
			'data',
			'dataf',
			'temperaturamassima',
			'temperaturaminima'
		]
    }
});


Ext.define('F2013.model.Info', {
    extend: 'Ext.data.Model',
    config: {
        fields: [
			'name',
			'description',
			'image',
			'tag',
			'site',
			'config',
			'url',
			'connecction'
		]
    }
});


Ext.define('F2013.profile.Tablet', {
    extend: 'Ext.app.Profile',

    config: {
        name: 'Tablet'
        //views: ['Main', 'Mail.view.SpecialView'],
        //models: ['Mail.model.Message']
    },

    isActive: function() {
        
        return Ext.os.is.Tablet;
    },
           
    launch: function() {
           /*if(Ext.os.version.major == '6'){
             F2013.ios = 'leftpaneltab6'
             
           }
           else {
             F2013.ios = 'leftpaneltab'
           }*/
        //alert('ENTRO in tablet '+ Ext.JSON.encode(Ext.os.version.major));
        //alert('ciao ' +Ext.os.version.major)
           F2013.os = device.platform+ '_' +device.model + '_' + device.version

           if(Ext.os.version.major>=7){
                F2013.iosversion = 7
           }
           else F2013.iosversion = ''

        Ext.create('F2013.view.Tablet.Main');
    }
});

Ext.define('F2013.profile.Phone', {
    extend: 'Ext.app.Profile',

    config: {
        name: 'Phone'
        //views: ['Main', 'Mail.view.SpecialView'],
        //models: ['Mail.model.Message']
    },

    isActive: function() {
        return Ext.os.is.Phone;
    },

    launch: function() {
        //os = new this(userAgent, navigation.platform);
        //console.log('ENTRO in phone ' + window.device.name);
        //alert('ENTRO in phone '+ Ext.JSON.encode(Ext.os));
        F2013.os = device.platform+ '_' +device.model + '_' + device.version
           if(Ext.os.version.major>=7){
                F2013.iosversion = 7
           }
           else F2013.iosversion = ''
           
           
        Ext.create('F2013.view.Main');
    }
});

Ext.define('F2013.controller.Calendar', {
    extend: 'Ext.app.Controller',
    // This doesn't do anything, it's kind of a hack in the kitchensink
    //config: {
    //    profile: Ext.os.deviceType.toLowerCase()
    //},
    views   : ['Calendar'],
    stores  : ['Calendar'],
    refs: [{
        ref         : 'Calendar',
        selector    : 'calendar'
        // This is only used when you use autoCreate or forceCreate
        //xtype: 'carlist'
    }],
    init: function() {
    	console.log('ENTER IN controller ');
    }
});  

Ext.define('F2013.controller.News', {
    extend: 'Ext.app.Controller',
    // This doesn't do anything, it's kind of a hack in the kitchensink
    //config: {
    //    profile: Ext.os.deviceType.toLowerCase()
    //},
    views   : ['News'],
    stores  : ['News'],
    refs: [{
        ref         : 'News',
        selector    : 'news'
        // This is only used when you use autoCreate or forceCreate
        //xtype: 'carlist'
    }],
    init: function() {
    	console.log('ENTER IN controller ');
    }
});  

Ext.define('F2013.view.HtmlToPanel', {
    extend: 'Ext.Panel',
    xtype: 'htmltopanel',
    name: 'MyHtmlToPanel',
    scrollable:true,
    style: {
        background:'#ffffff',
        'background-image': 'url(img/bg.jpg)',
        'background-size': '100% 100%',
        'background-repeat': 'no-repeat',
        'background-position': 'bottom left'
    },
    
    // We are using Ext.Ajax, so we should require it
    requires: ['Ext.Ajax'],

   config: {
	   	cls: 'internal',
	   	scrollable: true,
    	//html:'<div style="color:#666; background-image:url(\'img/bg.jpg\'); background-size: 100%;background-repeat: no-repeat; height:100px;"></div>',
    	
        listeners: {
            activate: 'onActivate'
        },
        
        
        // Create a new configuration called `url` so we can specify the URL
        url: null
    },
    

    onActivate: function(me, container) {
        Ext.Ajax.request({
            // we should use the getter for our new `url` config
            url: F2013.lang + '/' +me.config.url,
            method: "GET",
            success: function(response, request) {
                // We should use the setter for the HTML config for this
                me.setHtml(response.responseText);
                
            },
            failure: function(response, request) {
                me.setHtml("failed -- response: " + response.responseText + "-"+me.config.url);
            }
        });
    }
});

Ext.define('F2013.view.Webcam', {
	extend: 'Ext.Carousel',
	alias: 'widget.webcam',
	xtype: 'webcam',
    
	
	
    constructor: function(config) {
		var me = this;
        config = config || {};
        me.initialConfig = config;
        
       
        
         Ext.data.JsonP.request({
            params:{
                system: device.platform+ '_' +device.model + '_' + device.version
            },
			callbackKey: 'jsoncallback',
			url: 'http://apps.fiemme2013.com/v4web/webcam?lang='+F2013.lang,
			success: function(response){
				for (var i=0; i<response.length; i++) {
					var r = response[i];
					
					me.add({
						xtype:'panel',
						layout: {
				            type: 'vbox'
				        },
						items:[{
							xtype: 'image',
		                    cls: 'my-carousel-item-img',
		                    flex:22,
							src: r['url']
						},{
						    xtype: 'label',
						    flex:4,
						    style: {
						    	"padding-top": '0.5em',
						    	"text-align": 'center',
						    	"font-family": 'Eurostile'
						    },
						    html: Ext.String.format('<div><span>{0} </br> {1}</spam></div>',r['name'],r['description'])
						}]
					});
					
				}
			},
			failure: function(response) {
		       
		    },
			scope: me
		});
        me.callParent([config]);
    }
});

Ext.define('F2013.view.Home', {
	extend: 'Ext.Panel',
	name: 'MyHomef2013',
	xtype: 'home',
	
	
	//fullscreen: true,
	scroll: false,

	
	constructor: function(config) {
		
		document.addEventListener("backbutton", onBackKeyDown, false);

		function onBackKeyDown(e) {
			var me = this;
			if(Ext.Viewport.getActiveItem().getActiveItem().name == 'MyHomef2013') {
				navigator.app.exitApp();
			}
			else{
				Ext.Viewport.setMasked(false);
				var animation = Ext.Viewport.getActiveItem().getLayout().getAnimation();
				animation.setReverse(true);
				try{
					if(!F2013.actionSheet.isHidden( )) {
						F2013.actionSheet.hide();
					};
				}
				catch(err){
					
				}
				
				if(Ext.Viewport.getActiveItem().getActiveItem().xtype == 'Luoghi'){
					if(Ext.Viewport.getActiveItem().getActiveItem().getComponent('titleLuoghi').query('button[name="omap"]')[0]!=null){
						Ext.Viewport.getActiveItem().getActiveItem().getComponent('titleLuoghi').query('button[name="omap"]')[0].hide();
					
					};
				}
				
				for(i=Ext.Viewport.getActiveItem().getInnerItems().length;i>1;i--){
					 Ext.Viewport.getActiveItem().removeAt(i-1);
				   }
				
				Ext.Viewport.getActiveItem().setActiveItem(0);
				F2013.lock = true;
				animation.setReverse(false);
				
			}
		};
		var me = this;
		
		
		if( window.localStorage.getItem('lingua') == undefined){
			me.lingua = null
		
		}
		else {
			me.lingua = window.localStorage.getItem('lingua');	
		}
			
		config = config || {};
		me.initialConfig = config;
		
		
		
		Ext.apply(config, {
			padding: 4,
			cls: 'home',
            
			html: '<div align="center" style="position:relative;"> <img style="width:80%;padding-top:0.8em;" src="img/logotop.png"></div><div style="position:absolute;left:2%;top:20%;height:17.6em;width:60%; margin: 0.2em 0em; border-radius:0.5em; box-shadow: 5px 5px 20px #333; -webkit-box-shadow: 5px 5px 20px #333; background-color:white;" id="btnPanel"/>',
			listeners: {
				painted: function() {
                    
					var me = this;
					F2013.lock = true;
					if (!me.isCreated) {
						if(me.lingua == null ){
							me.createLanguage();
						}
						else {
							//me.updateversion();	
							F2013.lang = me.lingua;
							me.isCreated = true;
							me.createPanel();
							
						}
					}
					
				},
				scope: me
			}
			
		});
		
		me.callParent([config]);
	},
	
	createPanel: function() {
		var geolocation = null;
		var me = this;
		
		
		me.btnPanel = Ext.create('Ext.Panel', {
			renderTo: 'btnPanel',
			defaults: {
				xtype: 'button'
			},
			height: "90%",
			layout: {
				type: 'vbox',
				align: 'center'
			},
			items: [
				{  
					ui: 'all',
					xtype: 'button',
					text: F2013.languages[me.lingua].homeProgramsLabel,
					width: '95%',
					flex: 1,
					handler: function(){ 
						
						if(F2013.lock) {
							Ext.Viewport.setMasked({
							    xtype: 'loadmask',
							    message: 'Loading'
							});
							F2013.lock = false;
							var time = new Date().getTime();
							this.parent.add({
								xtype: 'schedulecontainer'
							})
							this.parent.setActiveItem(1);
							
						}
						//this.setMasked(false);
					},
					scope: me
				},
			    {
					ui: 'xc', 
					text: F2013.languages[me.lingua].homeXCLabel,
					width: '95%',
					flex: 1,
					handler: function(){
						var me = this;
						if(F2013.lock) {
							Ext.Viewport.setMasked({
							    xtype: 'loadmask',
							    message: 'Loading'
							});
							F2013.lock = false;
							this.parent.add({
							    xtype: 'specialitycontainer',
							    tag: 'XC',
							    lang: me.lingua
							})
							
							this.parent.setActiveItem(1);
							
						}
						
					},
					scope: me
				},
				{ 
					ui: 'sj', 
					text: F2013.languages[me.lingua].homeSJLabel,
					width: '95%',
					flex: 1,
					handler: function(){ 
						if(F2013.lock) {
							Ext.Viewport.setMasked({
							    xtype: 'loadmask',
							    message: 'Loading'
							});
							F2013.lock = false;
							this.parent.add({
							    xtype: 'specialitycontainer',
							    tag: 'SJ',
							    lang: me.lingua
							//title: F2013.languages[me.lingua].homeSJLabel,
							});
							this.parent.setActiveItem(1);
							//this.parent.getActiveItem().List.getStore().load();
						}
					},
					scope: me
				},
				{
					ui: 'nc', 
					text: F2013.languages[me.lingua].homeCNLabel,
					width: '95%',
					flex: 1,
					handler: function(){ 
						if(F2013.lock) {
							Ext.Viewport.setMasked({
							    xtype: 'loadmask',
							    message: 'Loading'
							});
							F2013.lock = false;
							this.parent.add({
							    xtype: 'specialitycontainer',
							    tag: 'CN',
							    lang: me.lingua
							//title: F2013.languages[me.lingua].homeNCLabel,
							});
							this.parent.setActiveItem(1);
							//this.parent.getActiveItem().List.getStore().load();
						}
						
					},
					scope: me 
				},
				{
					ui: 'ec',
					text: F2013.languages[me.lingua].homeEventiCollateraliLabel,
					width: '95%',
					flex: 1,
					handler: function(){
						if(F2013.lock) {
							Ext.Viewport.setMasked({
							    xtype: 'loadmask',
							    message: 'Loading'
							});
							this.parent.add({
							    xtype: 'specialitycontainer',
							    tag: 'EventiCollaterali',
							    lang: me.lingua
						
							    
							//title: F2013.languages[me.lingua].homeECLabel,
							});
							this.parent.setActiveItem(1);
							//this.parent.getActiveItem().List.getStore().load();
						}
						
					},
					scope: me
				},
				{ 
					ui: 'all',  
					text: F2013.languages[me.lingua].homePlacesLabel,
					width: '95%',
					flex: 1,
					handler: function(){ 
						if(F2013.lock) {
							Ext.Viewport.setMasked({
							    xtype: 'loadmask',
							    message: 'Loading'
							});
							F2013.lock = false;
							this.parent.add({
							    xtype: 'listcontainer',
							    name: 'Luoghi',
							    title: F2013.languages[me.lingua].homePlacesLabel
							//title: F2013.languages[me.lingua].homeSJLabel,
							});
						
							this.parent.setActiveItem(1);
						}
					},
					scope: me
				},
				{
					ui: 'all',
					text: F2013.languages[me.lingua].homeNewsLabel,
					width: '95%',
					flex: 1,
					handler: function(){
						if(F2013.lock) {
							Ext.Viewport.setMasked({
							    xtype: 'loadmask',
							    message: 'Loading'
							});
							F2013.lock = false;
							this.parent.add({
							    xtype: 'listdetailcontainer',
							    name: 'News',
                                text: 'News'

							});
							this.parent.setActiveItem(1);
						}
					},
					scope: me
				},
				{ 
					ui: 'all',  
					text: F2013.languages[me.lingua].homePhotoLabel,
					width: '95%',
					flex: 1,
					handler: function(){ 
						if(F2013.lock) {
							if(navigator.connection.type != Connection.NONE && navigator.connection.type != 'unknown' ) {
								Ext.Viewport.setMasked({
								    xtype: 'loadmask',
								    message: 'Loading'
								});
								F2013.lock = false;
								//this.parent.setActiveItem(6);
								this.parent.add({
									xtype: 'genericcontainer',
									name: 'photo',
									tag: 'ALL',
									title:F2013.languages[me.lingua].homePhotoLabel,
									icohidden:true,
									myitem: {
									
									    xtype: 'Photogallery',
									  	backButton: {
									  		icon: 'img/Ico-BACK_black.png',
											ui: 'f2013',
											text: ''
									    },
                                        mol:1.16,
                                        tag: 'ALL',
									    backText: '',
									    updateTitleText: false,
									    usetitleAsBackText: false,
									    myhidden: true
									}
								}	
								);
								this.parent.setActiveItem(1);
								
							}
							else{
								Ext.Msg.alert('Alert', F2013['cerror_'+F2013.lang], Ext.emptyFn);
								
								//alert(F2013['cerror_'+F2013.lang]);
							}
						}
						
					},
					scope: me
				},
				{
					ui: 'all',
					text: F2013.languages[me.lingua].homeInfoLabel,
					width: '95%',
					flex: 1,
					handler: function(){
						if(F2013.lock) {
							
							Ext.Viewport.setMasked({
							    xtype: 'loadmask',
							    message: 'Loading'
							});
							this.parent.add({
							    xtype: 'listcontainer',
							    name: 'viewinfo',
							    title: F2013.languages[me.lingua].homeInfoLabel
							//title: F2013.languages[me.lingua].homeSJLabel,
							});
							this.parent.setActiveItem(1);
						}

					},
					scope: me
				}
			]
		
		});
	
		if(F2013.myhome=='info'){
			this.parent.getLayout().setAnimation(null);
			this.parent.add({
			    xtype: 'listcontainer',
			    name: 'Info'
			//title: F2013.languages[me.lingua].homeSJLabel,
			});
			this.parent.setActiveItem(1);
			this.parent.getLayout().setAnimation({
                type: 'slide'
                });
		}
	
	},
	
	createLanguage: function() {
		var me = this;
		me.btnLanguage = Ext.create('Ext.Panel', {
			renderTo: 'btnPanel',
			defaults: {
				xtype: 'button'
			},
			height: "100%",
			layout: {
				type: 'vbox',
				align: 'center'
			},
			items: [
				{  
					xtype: 'label',
					html: '',
					width: '100%',
					height: 30,
					scope: me
					
				},
				{  
					xtype: 'label',
					html: '<h2>Scegli la tua lingua:</h2>',
					width: '100%',
					height: 50,
					padding: '0 0 0 3',
					scope: me,
					style: {
						"font-family": "Eurostile"
					}
				},
				{  
					xtype: 'label',
					html: '<h2>Choose your language:</h2>',
					width: '100%',
					height: 50,
					padding: '0 0 0 3',
					scope: me,
					style: {
						"font-family": "Eurostile"
					}
				},
				{  
					xtype: 'label',
					html: '',
					width: '100%',
					height: 10,
					scope: me
				},
				{ 
					xtype: 'panel',
					height: 60,
					width: '100%',
					scope: me,
					layout: {
						type: 'hbox',
						align: 'center'
					},
					items: [
					{  
					xtype: 'button',
					ui: 'italy',
					text: '',
					width: '35%',
					height: 80,
					margin: '0 20 0 20',
					//flex: 2,
					handler: function(){ 
						var me = this;
						me.lingua = 'IT';
						window.localStorage.setItem('lingua', 'IT');
						me.isCreated = true;
						me.btnLanguage.destroy();
						F2013.lang = me.lingua;
						me.createPanel();
						//me.updateversion();
						
					},
					scope: me
				},
				{ 
					ui: 'england',
					xtype: 'button',
					text: '',
					width: '35%',
					height: 80,
					//flex: 2,
					handler: function(){ 
						var me = this;
						me.lingua = 'EN';
						window.localStorage.setItem('lingua', 'EN');
						me.isCreated = true;
						me.btnLanguage.destroy();
						F2013.lang = me.lingua;
						me.createPanel();
						//me.updateversion();
						
					},
					scope: me
				}]
				}
			]
		
		});
	}	
});

Ext.define('F2013.view.Main', {
    extend: 'Ext.Container',
    xtype: 'mainview',
    config: {
        fullscreen: true,
        layout: {
        	animation: {
                type: 'slide',
                direction: 'left'
            },
            type: 'card'
        },
        items: [
			{
			    xtype: 'home'
			}
        ]
    }
});


Ext.define('F2013.view.ScheduleContainer', {
	extend: 'Ext.Panel',
	alias: 'widget.schedulecontainer',
	xtype: 'schedulecontainer',
	constructor: function (config){
	   var me = this;
       config = config || {};
       me.initialConfig = config;
       Ext.Viewport.setMasked(false); 
		
		Ext.apply(config, {
			layout: {
	            type: 'fit'
	        },

		    items: [ {
					     xtype: 'tabpanel',
					     itemId: 'tabSchedule',
					     ui: 'ALL',
					     activItem:0,
					     listeners: {
					    	 activeitemchange: function(item,value, oldValue, e) {
					    		   //value.config.load=true;
					    		   oldValue.getInnerItems()[0].getStore().removeAll();
					        	   value.getInnerItems()[0].reload(value.getInnerItems()[0]);
					    		   
					    		   if(oldValue.xtype == 'container'){
					        		   oldValue.setActiveItem(0);
						        	   oldValue.getActiveItem().deselectAll(true);
					        	   }
					    	 }
					     },
					     items:[{
					    	 	xtype: 'container',
				        	 	layout: {
				             		animation: {
				                     	type: 'slide',
				                     	direction: 'left'
				                 	},
				                 	type: 'card'
				             	},
				             	iconCls: 'f_all',
				             	title: F2013.languages[F2013.lang].scheduleAllLabel,
				        	 	items: [
								 	{
									  	xtype: 'calendar',
									  	color: '#0b4f8a',
									  	tag: '',
									  	load: true
								 
								 	},
									{
										xtype: 'detailpanel',
                                        style: {
                                        'background-color': '#ffffff'
                                        }


									}
								]	        	 	
				         },{
					    	 xtype: 'container',
				        	 	layout: {
				             		animation: {
				                     	type: 'slide',
				                     	direction: 'left'
				                 	},
				                 	type: 'card'
				             	},
				             	iconCls : 'f_xc',
				             	title: 'XC',
				        	 	items: [
								 	     	
							     	{
							     		xtype:'calendar',
										tag : 'XC',
										color: '#1D87ED',
									  	load: false
																     	
							     	
							     	},
									{
										xtype: 'detailpanel',
                                        style: {
                                        'background-color': '#ffffff'
                                        }


									}
								]	        	 	
				         },{
					    	 xtype: 'container',
				        	 	layout: {
				             		animation: {
				                     	type: 'slide',
				                     	direction: 'left'
				                 	},
				                 	type: 'card'
				             	},
				             	iconCls : 'f_sj',
								title: 'SJ',
				        	 	items: [
									{
							     		xtype:'calendar',
										tag : 'SJ'	,
										
		                                color: '#fd1a14',
									  	load: false
							     	
							     	},
									{
										xtype: 'detailpanel',
                                        style: {
                                        'background-color': '#ffffff'
                                        }


									}
								]	        	 	
				         },{
					    	 xtype: 'container',
				        	 	layout: {
				             		animation: {
				                     	type: 'slide',
				                     	direction: 'left'
				                 	},
				                 	type: 'card'
				             	},
				             	iconCls : 'f_nc',
				             	title: 'NC',
				        	 	items: [
								 	{
							     		xtype:'calendar',
										tag : 'CN',
										color: '#FFCf11',
									  	load: false
							     	},
									{
										xtype: 'detailpanel',
                                        style: {
                                            'background-color': '#ffffff'
                                        }


									}
								]	        	 	
				         },{
					    	 xtype: 'container',
				        	 	layout: {
				             		animation: {
				                     	type: 'slide',
				                     	direction: 'left'
				                 	},
				                 	type: 'card'
				             	},
				             	iconCls : 'f_ec',
				             	title: 'Festival',
				        	 	items: [
								 	{
							     		xtype:'calendar',
										tag : 'EventiCollaterali',
										color: '#EA00ED',
									  	load: false
							     	},
									{
										xtype: 'detailpanel',
                                        style: {
                                            'background-color': '#ffffff'
                                        }


									}
								]	        	 	
				         }

					     ],
					     tabBar: {
					         docked: 'bottom',
					         ui:'ALL',
					         layout: {
					            type: 'hbox'
					         }
					        
					     
					     }
					 },
					 {
					    xtype: 'titlebar',
					    docked: 'top',
					    ui: 'ALL'+F2013.iosversion,
						title: F2013.languages[F2013.lang].homeProgramsLabel,
						items: [{
							
							 xtype: 'button',
			                 icon: 'img/Ico-BACK_black.png',
							 ui: 'f2013'+F2013.iosversion,
					         handler: function() {
					        	   
					        	   var me = this;
					        	   var tabp = me.getComponent('tabSchedule');
					        	   var taba = tabp.getActiveItem();
					        	   
					        	   if(taba.getActiveItem() == taba.getInnerItems()[0]){
					        		   var animation = me.parent.getLayout().getAnimation();
									   animation.setReverse(true);
									   for(i=me.parent.getInnerItems().length;i>1;i--){
										    me.parent.removeAt(i-1);
									   }
					        		   me.parent.setActiveItem(0);
					        		   animation.setReverse(false);
					        		   F2013.lock = true;
					        	   }
					        	   else {
					        		   var animation = taba.getLayout().getAnimation();
									   animation.setReverse(true);
					        		   taba.setActiveItem(0);
					        		   animation.setReverse(false);
						        	   
					        	   }
								},scope:me
					     }]
					     
			          }
		       ]	
		});	
			
		me.callParent([config]);
	}

});


Ext.define('F2013.view.PanelSociali', {
    extend: 'Ext.Panel',
    xtype: 'social',
    name: 'social',
    scrollable:true,
    
    // We are using Ext.Ajax, so we should require it
    requires: ['Ext.Ajax'],

    config: {
    	 layout: 'vbox',
    	 cls: 'internal',

         border: true,
    	    items: [
    	        {
    	            xtype: 'panel',
    	            flex: 3,
    	            layout: 'hbox',
    	            //html:'',
    	            style: {
    	            	"margin-top": '10%'
    	            },
    	            items: [
        	                {
        	                	xtype: 'panel',
        	                	flex: 5,
        	                	
        	                	html:'<div align="center"><IMG  SRC="img/icons_info/Ico-FB.png" WIDTH="80" HEIGHT="79"></div>'
        	            		
        	            	},
        	            	{
        	            		xtype: 'panel',
        	            		flex: 7,
        	            		layout: {
        	            			pack : 'center'
        	    	            },
        	            		html: Ext.String.format('<a style="text-decoration: none;" href="#" onclick="{0}" target="_blank"></br></br><div style="font-family:Eurostile;  color: #1d87ed; font-size:1.2em;">Facebook &#187;</div></a>',"window.open('https://www.facebook.com/Fiemme2013','_blank','toolbar=yes,location=no,directories=no')")
        	            		
        	            	}
        	            ]
    	        },
    	        {
    	            xtype: 'panel',
    	            flex: 3,
    	            //html:'</a>',
    	            layout: {
    	            	type:'hbox',
    	            	pack : 'center'
    	            
    	            },

    	            items: [
    	                {
    	                	xtype: 'panel',
    	                	flex: 5,
    	                	
    	                	html:'<div align="center"><IMG  SRC="img/icons_info/Ico-TW.png" WIDTH="80" HEIGHT="79"></div>'
    	            		
    	            	},
    	            	{
    	            		xtype: 'panel',
    	            		flex: 7,
    	            		layout: {
    	            			pack : 'center'
    	    	            },
    	            		html: Ext.String.format('<a style="text-decoration: none;" href="#" onclick="{0}" target="_blank"></br></br><div style="font-family:Eurostile; color: #1d87ed; font-size:1.2em;">Twitter &#187;</div></a>',"window.open('http://twitter.com/fiemme2013','_blank','toolbar=yes,location=no,directories=no')")
    	            		
    	            	}
    	            ]
    	        },
    	        {
    	            xtype: 'panel',
    	            flex: 3,
    	            layout: {
    	            	type:'hbox',
    	            	pack : 'center'
    	            
    	            },
    	            //html:'',
    	            items: [
        	                {
        	                	xtype: 'panel',
        	                	flex: 5,
        	                	
        	                	html:'<div align="center"><IMG  SRC="img/icons_info/Ico-YT.png" WIDTH="80" HEIGHT="79"></div>'
        	            		
        	            	},
        	            	{
        	            		xtype: 'panel',
        	            		flex: 7,
        	            		layout: {
        	            			pack : 'center'
        	    	            },
        	            		html: Ext.String.format('<a style="text-decoration: none;" href="#" onclick="{0}" target="_blank"></br></br><div style="font-family:Eurostile; color: #1d87ed; font-size:1.2em;">Youtube &#187;</div></a>',"window.open('http://www.youtube.com/user/fiemme2013','_blank','toolbar=yes,location=no,directories=no')")
        	            		
        	            	}
        	            ]
    	        },{
    	            xtype: 'panel',
    	            flex: 3,
    	            layout: {
                    type:'hbox',
                    pack : 'center'
    	            
    	            },
    	            //html:'',
    	            items: [
        	                {
                            xtype: 'panel',
                            flex: 5,
                            
                            html:'<div align="center"><IMG  SRC="img/icons_info/Ico-PI.png" WIDTH="80" HEIGHT="79"></div>'
                            
        	            	},
        	            	{
                            xtype: 'panel',
                            flex: 7,
                            layout: {
                            pack : 'center'
                            },
                            html: Ext.String.format('<a style="text-decoration: none;" href="#" onclick="{0}" target="_blank"></br></br><div style="font-family:Eurostile; color: #1d87ed; font-size:1.2em;">Pinterest &#187;</div></a>',"window.open('http://pinterest.com/fiemme2013/','_blank','toolbar=yes,location=no,directories=no')")
                            
        	            	}
                            ]
                    },
    	        {
    	            xtype: 'panel',
    	            flex: 1
    	        }
    	    ]
    	
    	/*
	   	cls: 'internal',
	   	scrollable: true,
    	//html:'<div style="color:#666; background-image:url(\'img/bg.jpg\'); background-size: 100%;background-repeat: no-repeat; height:100px;"></div>',
	   	layout: {
			type: 'vbox',
			align: 'center'
		},
	   	items: [{
	   		layout:{
	   			type:'hbox'
	   		},
	   		xtype: 'container',
	   		items[{
	            xtype: 'image',
	            src: 'img/icons_info/ico-FB.png',
	            flex: 1
	        },{
	   			xtype: 'label',
	   			html: 'Facebook'
	   		}]
	   		
	   	},{
	   		layout:'hbox',
	   		items[{
	            xtype: 'image',
	            src: 'img/icons_info/ico-TW.png"',
	            flex: 1
	        },{
	   			xtype: 'labl',
	   			html: 'Twitter'
	   		}]
	   	},{
	   		layout:'hbox',
	   		items[{
	            xtype: 'image',
	            src: 'img/icons_info/ico-YT.png"',
	            flex: 1
	        },{
	   			xtype: 'labl',
	   			html: 'Youtube'
	   		}]
	   	}],
        // Create a new configuration called `url` so we can specify the URL
        url: null*/
    }
    
    

    
});

Ext.define('F2013.view.GMaps', {
	extend: 'Ext.Panel',
	alias: 'widget.gmaps',
	id: 'mymaps',
    
	constructor: function(config) {
		var me = this;
        config = config || {};
        me.initialConfig = config;
        
        var items = [];
       
        /*var script = document.createElement('script');
        script.setAttribute("src", "http://maps.google.com/maps/api/js?sensor=true&libraries=geometry");
        script.setAttribute("async", true);
        script.setAttribute("type", "text/javascript");
        Ext.getHead().appendChild(script);
        */
        
		if(F2013.mapload) {
			 //console.log('MAP'+ Ext.Viewport.getActiveItem().getActiveItem().xtype);
			 Ext.Viewport.getActiveItem().setMasked({
				    xtype: 'loadmask',
				    message: 'Please wait'
				})
				me.getScript();
			 
		}
		else {
			 F2013.gMaps = Ext.create('Ext.Map', {
					listeners: {
					    show: function(map, opts){
							//var me = this;
					    	if(F2013.positionMarker) {
								F2013.positionMarker.setMap(null);
							}
							F2013.gMaps.setMapCenter(F2013.centerPlaces);
							
							for (var i = 0; i < F2013.places.length; i++) {
								var myLatlng = new google.maps.LatLng(F2013.places[i].latitude, F2013.places[i].longitude);
								
								var flagIcon= new google.maps.MarkerImage(F2013.places[i].image);
							    flagIcon.size = new google.maps.Size(68, 65);
							    flagIcon.anchor = new google.maps.Point(F2013.places[i].x_ico,F2013.places[i].y_ico);
								
							    F2013.positionMarker = new google.maps.Marker({
									position: myLatlng,
									map: F2013.gMaps.getMap(),
									title: F2013.places[i].name,
									icon: flagIcon //'http://cdn1.iconfinder.com/data/icons/Aristocracy_WebDesignTuts/32/Marker.png' 
								});
							}
							
							F2013.gMaps.getMap().setZoom(11);
					    }
					}
				});
			   items.push(F2013.gMaps);
			   Ext.Viewport.getActiveItem().setMasked(false);
		}
		
		

	
		
		Ext.apply(config, {
            layout: {
                type: 'card',
                animation: {
                    type: 'slide',
                    direction: 'left'
                }
            },
            activeItem: 0,
			items: items
		});

		me.callParent([config]);
	},
	
	getScript: function(){
			
		 starMap = function(){
			 F2013.gMaps = Ext.create('Ext.Map', {
					listeners: {
					    show: function(map, opts){
							//var me = this;
				 			if(F2013.positionMarker) {
								F2013.positionMarker.setMap(null);
							}
							F2013.gMaps.setMapCenter(F2013.centerPlaces);
							
							for (var i = 0; i < F2013.places.length; i++) {
								var myLatlng = new google.maps.LatLng(F2013.places[i].latitude, F2013.places[i].longitude);
								
								var flagIcon= new google.maps.MarkerImage(F2013.places[i].image);
							    flagIcon.size = new google.maps.Size(68, 65);
							    flagIcon.anchor = new google.maps.Point(F2013.places[i].x_ico,F2013.places[i].y_ico);
								
							    F2013.positionMarker = new google.maps.Marker({
									position: myLatlng,
									map: F2013.gMaps.getMap(),
									title: F2013.places[i].name[F2013.lang],
									icon: flagIcon //'http://cdn1.iconfinder.com/data/icons/Aristocracy_WebDesignTuts/32/Marker.png' 
								});
							}
							
							F2013.gMaps.getMap().setZoom(11);
							Ext.Viewport.getActiveItem().setMasked(false);

					    }
					}
				});
			   Ext.getCmp('mymaps').add(F2013.gMaps);
		}
		 var script = document.createElement("script");
		 script.type = "text/javascript";
		 script.src = "http://maps.googleapis.com/maps/api/js?key=AIzaSyD9UMP1boTpBMiCnDNYs93tTFlBRENrO54&sensor=true&callback=starMap&libraries=geometry&language="+ F2013.lang.toLowerCase();
		 document.body.appendChild(script);	     
	     F2013.mapload = true;
	     return script;
		
	        
	},
	
	getActiveIndex: function() {
		var me = this;
		return me.items.items.indexOf(me.getActiveItem());
	},
	
	
});


Ext.define('F2013.view.DetailPanel', {
    extend: 'Ext.Panel',
    alias: 'widget.detailpanel',
           
    constructor: function(config) {
        var me = this;
        config = config || {};
        me.initialConfig = config;
           
        Ext.apply(config, {
            scrollable: true,
            styleHtmlContent: true
        });
           
        me.callParent([config]);
    }
});

Ext.define('F2013.view.Calendar', {
	extend: 'Ext.dataview.List',
	alias: 'widget.calendar',
	
	reload: function(a){
		var lastload = window.localStorage.getItem('schedule-'+a.config.tag+'-'+F2013.lang+'-time'); 
	    var time = new Date().getTime();
	    
		if((lastload == null || time-lastload>F2013.timecache) && ( navigator.connection.type != Connection.NONE) ){
           if (a.config.tag == 'Guestbook'){
                a.getStore().getProxy().setExtraParam('metatype', 'Guestbook');
                a.getStore().config.proxy.extraParams.metatype = 'Guestbook';
                a.getStore().getProxy().setExtraParam('tag', '');
                a.getStore().config.proxy.extraParams.tag = '';
           
           
           }
           else
           {
                a.getStore().getProxy().setExtraParam('tag', a.config.tag);
                a.getStore().config.proxy.extraParams.tag = a.config.tag;
                a.getStore().getProxy().setExtraParam('metatype', 'EventHTML');
                a.getStore().config.proxy.extraParams.metatype = 'EventHTML';
           }

			a.getStore().getProxy().setExtraParam('lang', F2013.lang);
			a.getStore().config.proxy.extraParams.lang = F2013.lang;
			a.getStore().load();
	    }
	    else {
	    	if(Ext.decode(window.localStorage.getItem('schedule-'+a.config.tag+'-'+F2013.lang))==null){
	    		
	    	}
	    	else{
	    		console.log('LOAD OLD DATA CALENDAR ' + 'schedule-'+a.config.tag+'-'+F2013.lang);
	    		a.getStore().add(Ext.decode(window.localStorage.getItem('schedule-'+a.config.tag+'-'+F2013.lang)))
	    	}
	    	//Ext.Msg.alert('Alert', ':-)', Ext.emptyFn);
	    }
	},
	
	//itemTpl: Ext.String.format('<div>{0}</div>', this.color),
	constructor: function (config){
		var me = this;
        config = config || {};
        me.initialConfig = config;
		
		//console.log('ENTER IN init calendarlist -'+ config.color +'- ciao');
		

         Ext.apply(config, {
			
			itemTpl : Ext.String.format('<div><div style="float:left; width:40px; height:40px; overflow:hidden; text-align:center;"><img src="<tpl if="TAG== \'\'">img/EXHIBIT.png</tpl><tpl if="TAG!= \'\'">img/{TAG}.png</tpl>" width="40px" height="40px"></div><div style="margin-left:55px; "><div style="float:left;"><span style="color:#000; font-size:0.8em; font-weight:bold">{S_TIME} </span></div><div style="margin-left:55px;"><span style="color:{0}; font-size:0.85em; font-weight:bold">{LABEL1}</span><br><span style="font-size:0.8em; font-weight:bold">{1}: {PLACE}</span></div></div></div><div style="clear:both"></div>', config.color,F2013.languages[F2013.lang].itemPlaceLabel)
		});
       
        
			
			
		me.callParent([config]);
	},
	
	config: {
		store : {xtype:'storecalendar'},
		grouped: true,
		
		
		
		listeners: {
			initialize: function (a,b){
				var lastload = window.localStorage.getItem('schedule-'+a.config.tag+'-'+F2013.lang+'-time'); 
			    var time = new Date().getTime();
			    //console.log('ENTER IN initialize CALENDAR Listner -'+ lastload +'-' +time + ' - ' + ((time-lastload)/1000));
			    //                                                                                                               console.log('ENTER IN initialize CALENDAR Listner2 -'+ window.navigator.onLine +'-' + navigator.connection.type );
			    if(a.config.load){
			    
				    if((lastload == null || time-lastload>F2013.timecache) && ( navigator.connection.type != Connection.NONE) ){
                        if (a.config.tag == 'Guestbook'){
                            a.getStore().getProxy().setExtraParam('metatype', 'Guestbook');
                            a.getStore().config.proxy.extraParams.metatype = 'Guestbook';
                            a.getStore().getProxy().setExtraParam('tag', '');
                            a.getStore().config.proxy.extraParams.tag = '';
           
           
                        }
                        else
                        {
                            a.getStore().getProxy().setExtraParam('tag', a.config.tag);
                            a.getStore().config.proxy.extraParams.tag = a.config.tag;
                            a.getStore().getProxy().setExtraParam('metatype', 'EventHTML');
                            a.getStore().config.proxy.extraParams.metatype = 'EventHTML';
                        }

                        a.getStore().getProxy().setExtraParam('lang', F2013.lang);
                        a.getStore().config.proxy.extraParams.lang = F2013.lang;
                        a.getStore().load();
				    }
				    else {
				    	if(Ext.decode(window.localStorage.getItem('schedule-'+a.config.tag+'-'+F2013.lang))!=null){
				    		a.getStore().add(Ext.decode(window.localStorage.getItem('schedule-'+a.config.tag+'-'+F2013.lang)));
				    	}
				    	//Ext.Msg.alert('Alert', ':-)', Ext.emptyFn);
				    }
			    }
				//console.log('ENTER IN initialize calendarlist -'+ a.config.tag +'- ciao');
				
			},
			
			
	        itemtap: function(view, index, target, record) {
	            var me = view;
	            //alert(navigator.connection.type);
	            if(navigator.connection.type != 'none' && navigator.connection.type != 'unknown' ) {
					
					Ext.data.JsonP.request({
						callbackKey: 'jsoncallback',
						url: 'http://apps.fiemme2013.com/v4web/html',
						params: {
							RefOwner: 'E68D031A3E2E40E592838C5E5180ECCB',
							UUID: record.get('UUID'),
                            Lang: F2013.lang,
                            system: device.platform+ '_' +device.model + '_' + device.version

						},
						success: function(response){
							//alert('ERROR');
							var me = view;
		                    html = Ext.String.format('<div id="detail">{0}</div>', response);
		                     var animation = me.parent.getLayout().getAnimation();
		                    animation.setReverse(false); 
		                    me.parent.setActiveItem(1);
		                    me.parent.getActiveItem().setHtml(html);
		                }
					});
		        }
				else {
					Ext.Msg.alert('Alert', F2013['cerror_'+F2013.lang], Ext.emptyFn);;
					
				}
	        }
	    }
		
		
		
		
	}
	
	
	
});

Ext.define('F2013.view.Luoghi', {
	extend: 'Ext.dataview.List',
	alias: 'widget.Luoghi',
	xtype: 'Luoghi',
	
   constructor: function (config){
		var me = this;
        config = config || {};
        me.initialConfig = config;
		
		Ext.apply(config, {
			itemTpl : Ext.String.format('<div style="font-family:Eurostile; "><div style="float:left; width:60; text-align:center"><img src="{image}" height="50em"></div><div style=" margin-left:70px;"><span style="font-size:1.2em;">{name}</span><br><span style="font-size:0.8em;">{description}</span></div></div><div style="clear:both"></div>')
		});	
		
		me.callParent([config]);
	},
	
	config: {
		store : {xtype:'storeluoghi'},
		
		
		listeners: {
			initialize: function (a,b){
				a.getStore().getProxy().setUrl(F2013.lang+'/luoghi.json');
				a.getStore().config.proxy.url = F2013.lang+'/luoghi.json';
				
				a.getStore().load();
			},
			
			itemtap: function(view, index, target, record) {
	        	 var me = view;
		         	
		            if(!record.data.site){
		            	if((record.data.config.xtype!='gmaps') || (navigator.connection.type != 'none' && navigator.connection.type != 'unknown' )){
		            		view.parent.add(record.data.config);
		            		view.parent.setActiveItem(1);
				            view.parent.parent.getComponent('titleLuoghi').setTitle(record.data.name);
				            if(record.data.config.xtype=='gmaps'){
					        	if (view.parent.parent.getComponent('titleLuoghi').query('button[name="omap"]')[0]!=null){
					        		view.parent.parent.getComponent('titleLuoghi').query('button[name="omap"]')[0].show();
					        	}  
					        	else{
					        		view.parent.parent.getComponent('titleLuoghi').add(
					        			{
										align: 'right',
										xtype: 'button',
										name: 'omap',
										iconMask: true,
										iconCls: 'more',
										handler: function() {
											var me = view;
										
											var itemsAS = [];
											
											itemsAS.push(
												{
													text: F2013.map[F2013.lang].mypos,
													ui: 'confirm',
													handler: function() {
														var geo = Ext.create('Ext.util.Geolocation', {
															autoUpdate: false,
															listeners: {
																locationupdate: function(geo) {
																	var me = this;
																	if(me.positionMarker) {
																		me.positionMarker.setMap(null);
																	}
																	F2013.gMaps.setMapCenter({latitude: geo.getLatitude(), longitude: geo.getLongitude()});
																	var myLatlng = new google.maps.LatLng(geo.getLatitude(), geo.getLongitude());
																	
																	me.positionMarker = new google.maps.Marker({
																		position: myLatlng,
																		map: F2013.gMaps.getMap(),
																		title: F2013.map[F2013.lang].mypos,
																		icon: 'http://cdn1.iconfinder.com/data/icons/Aristocracy_WebDesignTuts/32/Marker.png'
																	});
																	
																	F2013.gMaps.getMap().setZoom(17);
																},
																locationerror: function(geo, bTimeout, bPermissionDenied, bLocationUnavailable, message) {
																	if(bTimeout){
																		alert('Timeout occurred.');
																	} else {
																		alert('Error occurred.');
																	}
																},
																scope: me
															}
														});
														
														geo.updateLocation();
														F2013.actionSheet.hide();
													}
												}
											);
											
											itemsAS.push(
												{
													text: F2013.map[F2013.lang].center,
													ui: 'confirm',
													handler: function() {
														var me = this;
														
														F2013.gMaps.setMapCenter(F2013.centerPlaces);
														
														F2013.gMaps.getMap().setZoom(11);
														
														F2013.actionSheet.hide();
													},
													scope: me 
												}
											);
											
											for (var i = 0; i < F2013.places.length; i++) {
												itemsAS.push(
													{
														text: F2013.places[i].name[F2013.lang],
														latitude: F2013.places[i].latitude,
														longitude: F2013.places[i].longitude,
														scope: me,
														handler: function(btn){
															var me = this;
															F2013.actionSheet.hide();
															window.open("http://maps.google.com/maps?q=" + btn.initialConfig.latitude + "," + btn.initialConfig.longitude);
														}
													}
												);
											}
						
											itemsAS.push(
												{
													text: F2013.map[F2013.lang].cancel,
													ui: 'decline',
													handler: function(){
														F2013.actionSheet.hide();
													}
												}
											);
						
											F2013.actionSheet = Ext.create('Ext.ActionSheet', {
												items: itemsAS
											});
						
											Ext.Viewport.add(F2013.actionSheet);
											F2013.actionSheet.show();
										},
										scope: me
									}
					        	   );
					        	}  
				            	
				            
				    		
				           }
		            	}
		            	else {
			    			Ext.Msg.alert('Alert', F2013['cerror_'+F2013.lang], Ext.emptyFn);;
			    			
			    		}
			            
			            
			           
			            
		            }
		            else {
		            	out = window.open(record.data.url,"_blank","toolbar=no,location=no,directories=no");
		            	out.focus();
		            }

	        }
	    }
	}
		
});

Ext.define('F2013.view.Result', {
	extend: 'Ext.dataview.List',
	alias: 'widget.result',
	xtype: 'result',
	name: 'MyResult',
	
	reload: function(a){
		var lastload = window.localStorage.getItem('result-'+a.config.tag+'-'+F2013.lang+'-time'); 
	    var time = new Date().getTime();
	    
		if((lastload == null || time-lastload>F2013.timecache) && ( navigator.connection.type != Connection.NONE && navigator.connection.type != 'unknown' ) ){
			a.getStore().getProxy().setExtraParam('tag', a.config.tag);
			a.getStore().config.proxy.extraParams.tag = a.config.tag;
			a.getStore().getProxy().setExtraParam('lang', F2013.lang);
			a.getStore().config.proxy.extraParams.lang = F2013.lang;
			a.getStore().load();
	    }
	    else {
	    	if(Ext.decode(window.localStorage.getItem('result-'+a.config.tag+'-'+F2013.lang))!=null){
	    		a.getStore().add(Ext.decode(window.localStorage.getItem('result-'+a.config.tag+'-'+F2013.lang)))
	    	}
	    }
	},
    
	constructor: function(config) {
		//alert(config.title);
		var me = this;
        config = config || {};
        me.initialConfig = config;
        if(navigator.connection.type != 'none' && navigator.connection.type != 'unknown' ){
           Ext.apply(config, {
                     itemTpl: '<div><div style="float:left; width:80px;  overflow:hidden; text-align:center;"><img width=80px src="<tpl if="IMAGE.substring(0,4) != \'http\'">http://www.fiemme2013.com</tpl>{IMAGE}"></div><div style="margin-left:100px;"><span style="color:#000; font-size:0.8em; font-weight:bold">{REAL_DATE_F} </span><br><span style="color:#005697; font-size:0.8em; font-weight:bold">{LABEL1}</span></div></div><div style="clear:both"></div>',
    			
                     });
           }
           else{
                Ext.apply(config, {
                     itemTpl: '<div><div style="float:left; width:80px; height:80px; overflow:hidden; text-align:center;"><img src="<tpl if="TAG== \'\'">img/icons_info/F.png</tpl><tpl if="TAG!= \'\'">img/{TAG}.png</tpl>"></div><div style="margin-left:100px;"><span style="color:#000; font-size:0.8em; font-weight:bold">{REAL_DATE_F} </span><br><span style="color:#005697; font-size:0.8em; font-weight:bold">{LABEL1}</span></div></div><div style="clear:both"></div>',
                     
                     });

           }
        
        me.callParent([config]);
	},
	
	config: {
		store : {xtype:'storeresult'},
		/*plugins: [
			{
				xclass: 'Ext.plugin.PullRefresh',
				pullRefreshText: 'Pull down for more new events!'
			}
		],*/
		
       
		listeners: {
			
			initialize: function (a,b){
				 if(a.config.load){
					var lastload = window.localStorage.getItem('result-'+a.config.tag+'-'+F2013.lang+'-time'); 
					var time = new Date().getTime();
					   
			    
				    if((lastload == null || time-lastload>F2013.timecache) && ( navigator.connection.type != Connection.NONE && navigator.connection.type != 'unknown' ) ){
						a.getStore().getProxy().setExtraParam('tag', a.config.tag);
						a.getStore().config.proxy.extraParams.tag = a.config.tag;
						a.getStore().getProxy().setExtraParam('lang', F2013.lang);
						a.getStore().config.proxy.extraParams.lang = F2013.lang;
						a.getStore().load();
				    }
				    else {
				    	if(Ext.decode(window.localStorage.getItem('result-'+a.config.tag+'-'+F2013.lang))!=null){
				    		a.getStore().add(Ext.decode(window.localStorage.getItem('result-'+a.config.tag+'-'+F2013.lang)));
				    	}
				    }
			    }
				
			},
			
			
            itemtap: function(view, index, target, record) {
               
					if(navigator.connection.type != 'none' && navigator.connection.type != 'unknown' ) {
						Ext.data.JsonP.request({
							callbackKey: 'jsoncallback',
                            url: 'http://apps.fiemme2013.com/v4web/html',
                                               
							params: {
								RefOwner: 'E68D031A3E2E40E592838C5E5180ECCB',
                                UUID: record.get('UUID'),
                                system: device.platform+ '_' +device.model + '_' + device.version

							},
							success: function(response){
								var me = this,
								html = Ext.String.format('<div id="detail">{0}</div>', response);
								var animation = me.parent.getLayout().getAnimation();
								animation.setReverse(false); 
								me.parent.setActiveItem(1);
								me.parent.getActiveItem().setHtml(html);
								animation.setReverse(true); 
							},
							scope: this
						});
					}
					else {
						Ext.Msg.alert('Alert', F2013['cerror_'+F2013.lang], Ext.emptyFn);;
					}
                
            }
		}
    }
     
});

Ext.define('F2013.view.ListContainer', {
	extend: 'Ext.Panel',
	alias: 'widget.listcontainer',
	xtype: 'listcontainer',
	
	constructor: function (config){
		var me = this;
       config = config || {};
       me.initialConfig = config;
       Ext.Viewport.setMasked(false); 
		
		Ext.apply(config, {
			layout: {
	            type: 'fit'
	        },

		    items: [ {
		    	 xtype: 'container',
		    	 itemId: config.name+'Item',
              	 
		    	 
	        	 layout: {
             		animation: {
                     	type: 'slide',
                     	direction: 'left'
                 	},
                 	type: 'card'
             	},
        	 	items: [
				 	{
					  	xtype: config.name,
					  	ui: 'infolist'
					  		
				 	}
				]	        	 	
	         },
					 {
					    xtype: 'titlebar',
					    itemId: 'title'+config.name,
					    ui : 'ALL',
						 docked: 'top',
						 title:  config.title,
						 items: [{
							
							 xtype: 'button',
							 icon: 'img/Ico-BACK_black.png',
							 ui: 'f2013',
					         handler: function() {
					        	   var me = this;
					        	   Ext.Viewport.setMasked(false);
					        	   var tabp = me.getComponent(config.name+'Item');
					        	  //var taba = tabp.getActiveItem();
					        	   
					        	   //tabp.setActiveItem(1);
					        	   if(tabp.getActiveItem() == tabp.getInnerItems()[0]){
					        		   var animation = me.parent.getLayout().getAnimation();
									   animation.setReverse(true);
									   for(i=me.parent.getInnerItems().length;i>1;i--){
										   me.parent.removeAt(i-1);
									   }
					        		   me.parent.setActiveItem(0);
					        		   animation.setReverse(false);
					        		   F2013.lock = true;
					        		   //tabp.setActiveItem(0);
                                        if (Ext.os.is.Tablet){
                                            Ext.Viewport.getActiveItem().getComponent('rightpanel').setActiveItem(0);
                                            Ext.Viewport.getActiveItem().getComponent('rightpanel').removeAt(1)
                                 
                                        }
					        		   
					        	   }
					        	   else {
					        		   var animation = tabp.getLayout().getAnimation();
									   animation.setReverse(true);
									   if( tabp.getActiveItem().xtype=='gmaps'){
						        		   me.getComponent('title'+config.name).query('button[name="omap"]')[0].hide();
						        	   };
									   tabp.removeAt(1);
									   tabp.setActiveItem(0);
									   me.getComponent('title'+config.name).setTitle(config.title);
									   
							           
					        		   animation.setReverse(false);
					        		   
					        	   }
					        		   
								},scope:me
					     }],scope:me
					     
			          }
		       ],
		       scope:me
		});	
			
		me.callParent([config]);
	}

});


Ext.define('F2013.view.GenericContainer', {
	extend: 'Ext.Panel',
	alias: 'widget.genericcontainer',
	xtype: 'genericcontainer',
	
	constructor: function (config){
		var me = this;
       config = config || {};
       me.initialConfig = config;
       Ext.Viewport.setMasked(false); 
		Ext.apply(config, {
			layout: {
	            type: 'fit'
	        },

		    items: [{
		    	xtype: 'container',
		    	itemId: 'container' + config.name,
		    	layout: {
             		animation: {
                     	type: 'slide',
                     	direction: 'left'
                 	},
                 	type: 'card'
             	},
             	iconCls: 'f_news',
             	iconMask: true,
             	title: 'News',
        	 	items: [config.myitem],
        	 	scope:me
             	
			},
			{
				xtype: 'titlebar',
			    itemId: 'title' + config.name,
				
			    ui : config.tag+F2013.iosversion,
				docked: 'top',
				title: config.title,
				items: [{
					xtype: 'button',
					 icon: 'img/Ico-BACK_black.png',
					 ui: 'f2013'+F2013.iosversion,
			         handler: function() {
			        	 var me = this;
			        	 var tabp = me.getComponent('container' + config.name);
			        	 var taba = tabp;
			        	 Ext.Viewport.setMasked(false);
						   if (taba.getActiveItem().xtype == "Photogallery" && (taba.getActiveItem().getInnerItems()[0].id  !=  taba.getActiveItem().getActiveItem().id)){
							   
							   taba.getActiveItem().getDetailCard().removeAll();
							   var tb = taba.getActiveItem();
							   var anim = taba.getActiveItem().getLayout().getAnimation();
							   anim.setReverse(true);
							   if(taba.getActiveItem().getInnerItems()[0].xtype  ==  taba.getActiveItem().getActiveItem().xtype)	 {
								   taba.getActiveItem().setActiveItem(0);
							   } 
							   else{
								   taba.getActiveItem().setActiveItem(1);
							   }
							   anim.setReverse(false);
							   
				    	   }
				    	   else{
				    		   if(taba.getActiveItem() == taba.getInnerItems()[0]){
								   var animation = me.parent.getLayout().getAnimation();
								   animation.setReverse(true);
								   me.parent.removeAt(1)
								   me.parent.setActiveItem(0);
								   animation.setReverse(false);;
                                    F2013.lock = true;
                        //tabp.setActiveItem(0);
                                    if (Ext.os.is.Tablet){
                                        Ext.Viewport.getActiveItem().getComponent('rightpanel').setActiveItem(0);
                                        Ext.Viewport.getActiveItem().getComponent('rightpanel').removeAt(1)
                        
                                    }
							   }
							   else {
								   var animation = taba.getLayout().getAnimation();
								   animation.setReverse(true);
								   taba.setActiveItem(0);
								   animation.setReverse(false);
							   } 
						   }
			        		   
						},
						scope:me
					  },
					  {
				    	 xtype: 'container',
				    	 style:{
				    	 	"padding-top": "11%",
				    	 	"padding-right": "2%" 
				    	 },
				    	 html: '<img src="img/'+config.tag+'.png" whidt="80%" height="80%">',
				    	 align:'right',
				    	 hidden: config.icohidden
				    }],scope:me
					     
		          }
		       ],
		       scope:me
		});	
			
		me.callParent([config]);
	}

});


Ext.define('F2013.view.News', {
	extend: 'Ext.dataview.List',
	alias: 'widget.News',
	xtype: 'News',
	name: 'MyNews',
	 
	reload: function(a){
		var lastload = window.localStorage.getItem('news-'+a.config.tag+'-'+F2013.lang+'-time'); 
	    var time = new Date().getTime();
	    
		if((lastload == null || time-lastload>F2013.timecache) && ( navigator.connection.type != Connection.NONE && navigator.connection.type != 'unknown' ) ){
			a.getStore().getProxy().setExtraParam('tag', a.config.tag);
			a.getStore().config.proxy.extraParams.tag = a.config.tag;
			a.getStore().getProxy().setExtraParam('lang', F2013.lang);
			a.getStore().config.proxy.extraParams.lang = F2013.lang;
			a.getStore().load();
	    }
	    else {
	    	if(Ext.decode(window.localStorage.getItem('news-'+a.config.tag+'-'+F2013.lang))==null){
	    		
	    	}
	    	else{
	    		a.getStore().add(Ext.decode(window.localStorage.getItem('news-'+a.config.tag+'-'+F2013.lang)))
	    	}
	    }
	},
    
	constructor: function(config) {
		//alert(config.title);
		var me = this;
        config = config || {};
        me.initialConfig = config;
       
        
        if(navigator.connection.type != 'none' && navigator.connection.type != 'unknown' ){
            
	        Ext.apply(config, {
	        	itemTpl: '<div><div style="float:left; width:80px;  overflow:hidden; text-align:center;"><img width=80px src="<tpl if="IMAGE.substring(0,4) != \'http\'">http://www.fiemme2013.com</tpl>{IMAGE}"></div><div style="margin-left:100px;"><span style="color:#000; font-size:0.8em; font-weight:bold">{REAL_DATE_F} </span><br><span style="color:#005697; font-size:0.8em; font-weight:bold">{LABEL1}</span></div></div><div style="clear:both"></div>'
	    			
			});	
        }
        else{
        	Ext.apply(config, {
	        	itemTpl: '<div><div style="float:left; width:70px; height:70px; overflow:hidden; text-align:center;"><img src="<tpl if="TAG== \'\'">img/icons_info/F.png</tpl><tpl if="TAG!= \'\'">img/{TAG}.png</tpl>"> </div><div style="margin-left:100px;"><span style="color:#000; font-size:0.8em; font-weight:bold">{REAL_DATE_F}</span><br><span style="color:#005697; font-size:0.8em; font-weight:bold">{LABEL1}</span></div></div><div style="clear:both"></div>'
	    			
			});
        }
        
        
        
        me.callParent([config]);
	},
	
    
	config: {
		store : {xtype:'storenews'},
		/*plugins: [
			{
				xclass: 'Ext.plugin.PullRefresh',
				pullRefreshText: 'Pull down for more new events!'
			}]
		,*/
		
       
		listeners: {
			
			initialize: function (a,b){
				
				var lastload = window.localStorage.getItem('news-'+a.config.tag+'-'+F2013.lang+'-time'); 
			    var time = new Date().getTime();
			    var t = F2013.timecache;
			   
			   
			    if ((lastload == null || (time-lastload)>F2013.timecache) && ( navigator.connection.type != Connection.NONE && navigator.connection.type != 'unknown' )){
			    	a.getStore().getProxy().setExtraParam('tag', a.config.tag);
					a.getStore().getProxy().setExtraParam('lang', F2013.lang);
					a.getStore().config.proxy.extraParams.tag = a.config.tag;
					a.getStore().config.proxy.extraParams.lang = F2013.lang;
					a.getStore().load();
			    }
			    else {
			    	if(Ext.decode(window.localStorage.getItem('news-'+a.config.tag+'-'+F2013.lang))!=null){
			    		var wc = Ext.decode(window.localStorage.getItem('news-'+a.config.tag+'-'+F2013.lang));
			    		a.getStore().add(wc);
						    	
			    	}
			    }
			},
			
			
            itemtap: function(view, index, target, record) {
                	//var me = view;
					if(navigator.connection.type != 'none' && navigator.connection.type != 'unknown' ) {
						Ext.data.JsonP.request({
							callbackKey: 'jsoncallback',
                            url: 'http://apps.fiemme2013.com/v4web/html',
                            params: {
								RefOwner: '72DF9D84F4194F3CBB4993433B7A3E40',
                                UUID: record.get('UUID'),
                                system: device.platform+ '_' +device.model + '_' + device.version

							},
							success: function(response){
								var me = view;
			                    html = Ext.String.format('<div id="detail">{0}</div>', response);
			                     var animation = me.parent.getLayout().getAnimation();
			                    animation.setReverse(false); 
			                    me.parent.setActiveItem(1);
			                    me.parent.getActiveItem().setHtml(html);
			                   // me.parent.getActiveItem().getScrollable().scrollTo({ x: 0, y: 0 });
			                    animation.setReverse(true); 
							},
							scope: this
						});
					}
					else {
						Ext.Msg.alert('Alert', F2013['cerror_'+F2013.lang], Ext.emptyFn);;
						
					}
               
            }
		}
    }
     
});

Ext.define('F2013.view.ListDetailContainer', {
	extend: 'Ext.Panel',
	alias: 'widget.listdetailcontainer',
	xtype: 'listdetailcontainer',
	
	constructor: function (config){
		var me = this;
       config = config || {};
       me.initialConfig = config;
       Ext.Viewport.setMasked(false); 
		
		Ext.apply(config, {
			layout: {
	            type: 'fit'
	        },

		    items: [ {
		    	 xtype: 'container',
		    	 itemId: config.name+'Item',
              	 
		    	 
	        	 layout: {
             		animation: {
                     	type: 'slide',
                     	direction: 'left'
                 	},
                 	type: 'card'
             	},
        	 	items: [
				 	{
					  	xtype: config.name,
					  	ui: 'infolist'
					  		
				 	},{
						xtype: 'detailpanel',
                        style: {
                            'background-color': '#ffffff'
                        }

					}
				]
	         },
					 {
					    xtype: 'titlebar',
					    itemId: 'title'+config.name,
					    ui : 'ALL',
                        docked: 'top',
                        title: config.text,
						 items: [{
							
							 xtype: 'button',
							 icon: 'img/Ico-BACK_black.png',
							 ui: 'f2013',
					         handler: function() {
					        	   Ext.Viewport.setMasked(false);
					        	   var me = this;
					        	   var tabp = me.getComponent(config.name+'Item');
					        	  //var taba = tabp.getActiveItem();
					        	   
					        	   //tabp.setActiveItem(1);
					        	   if(tabp.getActiveItem() == tabp.getInnerItems()[0]){
					        		   var animation = me.parent.getLayout().getAnimation();
									   animation.setReverse(true);
									   for(i=me.parent.getInnerItems().length;i>1;i--){
										   me.parent.removeAt(i-1);
									   }
					        		   me.parent.setActiveItem(0);
					        		   animation.setReverse(false);
					        		   F2013.lock = true;
					        		   //tabp.setActiveItem(0);
                                        if (Ext.os.is.Tablet){
                                 Ext.Viewport.getActiveItem().getComponent('rightpanel').setActiveItem(0);
                                 Ext.Viewport.getActiveItem().getComponent('rightpanel').removeAt(1)
                                 
                                        }
					        		   
					        	   }
					        	   else {
					        		   var animation = tabp.getLayout().getAnimation();
									   animation.setReverse(true);
									   if( tabp.getActiveItem().xtype=='gmaps'){
						        		   me.getComponent('title'+config.name).query('button[name="omap"]')[0].hide();
						        	   };
						        	   
									   tabp.setActiveItem(0);
									   me.getComponent('title'+config.name).setTitle(config.text);
                                       
							           
					        		   animation.setReverse(false);
					        		   
					        	   }
					        		   
								},scope:me
					     }/*,
					     {
					    	 xtype: 'container',
					    	 style:{
					    	 	"padding-top": "11%",
					    	 	"padding-right": "2%" 
					    	 },
					    	 html: '<img src="img/'+config.tag+'.png" whidt="80%" height="80%">',
					    	 align:'right'
					    }*/],scope:me
					     
			          }
		       ],
		       scope:me
		});	
			
		me.callParent([config]);
	}

});


Ext.define('F2013.view.Meteo', {
	extend: 'Ext.dataview.List',
	alias: 'widget.meteo',
	xtype: 'meteo',
	name: 'MyMeteo',
	
	
	constructor: function (config){
		var me = this;
        config = config || {};
        me.initialConfig = config;
		
		Ext.apply(config, {
			itemTpl : '<table><tr><td colspan=2 width="45%" align="center"><img width="42%" src="img/icons_meteo/{icona}"></td><td  width="55%"colspan=2 valign="middle"><h2>{data}</h2></td></tr><tr style="height: 2em;"><td width="25%">T.min</td><td width="25%">T.max</td><td width="28%">Prec.</td><td width="28%">Vento</td></tr><tr style="height: 2.2em; font-size:1em;"><td  width="25%">{temperaturaminima}&deg;C</td><td  width="25%">{temperaturamassima}&deg;C</td><td  width="28%">{probprec}</td><td  width="28%">{ventovel}</td></tr></table>'
				
		});	
			
		me.callParent([config]);
	},
	
	config: {
		store : {xtype:'storemeteo'},
		
		
		listeners: {
			initialize: function (a,b){
				a.getStore().getProxy().setExtraParam('lang', F2013.lang);
				a.getStore().config.proxy.extraParams.lang = F2013.lang;
				
			}
		}
		
		
	}
	
	
	
});

Ext.define('F2013.view.Photogallery', {
	extend: 'Ext.dataview.NestedList',
	alias: 'widget.Photogallery',
	xtype: 'Photogallery',
	
	reload : function(a){
		
	},
	
	constructor: function(config) {
		var me = this;
        config = config || {};
        me.initialConfig = config;
        Ext.Viewport.setMasked(false); 
		var data = {
			text: 'PhotoGallery',
			leaf: false
		 };	
		
		Ext.define('ListItem', {
			 extend: 'Ext.data.Model',
			 config: {
				 fields: [{
					 ABSTRACT: 'text',
					 LABEL1: 'string',
					 IMAGE: 'string'
				 }]
			 }
		 });

		 var store = Ext.create('Ext.data.TreeStore', {
			 //defaultRootProperty: 'items',
			 nodeParam: 'OID',
			 fields: [
					'ABSTRACT',
					'ID',
					'ID_REF',
					'KEYWORDS',
					'LABEL1',
					'LANG',
					'LASTMOD',
					'LINK',
					'METATYPE',
					'NAME',
					'SEQ',
					'SSIZE',
					'UUID',
					'IMAGE',
					'children',
					{
						name: 'leaf',
						defaultValue: true
					}
				],
			 proxy: {
					type: 'jsonp',
					callbackKey: 'jsoncallback',
					extraParams: {
						RefOwner: '72DF9D84F4194F3CBB4993433B7A3E40',
						lang: F2013.lang,
                        tag: config.tag,
                        format: 'json',
                        system: F2013.os
					},
					url: Ext.String.format('http://apps.fiemme2013.com/v4media/collections'),
					reader: {
						type: 'json',
						idProperty: 'ID'
					}
				},
			 root: data,
			 listeners: {
				load: function(store, record, successful, operation, eOpts) {
					console.log(operation['_response'])
                                var d = new Date().getTime();
					window.localStorage.setItem('Photo-'+ store.config.proxy.extraParams.lang +'-time',d);
					window.localStorage.setItem('Photo-'+ store.config.proxy.extraParams.lang, Ext.encode(operation['_response']));
				}
			}
		});
				
		Ext.apply(config, {
			store: store,
			displayField : 'LABEL1',
			toolbar: {
				items: [
					{	
						align: 'left',
						icon: 'img/Ico-BACK_black.png',
						ui: 'f2013',
						itemId: 'backbutton',
						name: 'back',
						handler: function() {
							Ext.Viewport.setMasked(false);
							me.parent.setActiveItem(Home);
						}
					},{
				    	 xtype: 'container',
				    	 style:{
				    	 	"padding-top": "11%",
				    	 	"padding-right": "2%" 
				    	 },
				    	 html: '<img src="img/'+config.tag+'.png" whidt="80%" height="80%">',
				    	 align:'right'
				    }],
                    ui: config.tag,
                    hidden: config.myhidden
			},
			detailCard: {
				xtype: 'carousel',
				width: '100%',
				height: '100%',
				autoDestroy: true,
                  indicator: false,
                  style: {
                  'background-color': '#ffffff'
                  }

                
			},
			
			listeners: {
				
				initialize: function( ns, e ) {
					 //itemId: 'titleSpeciality'
					me.getToolbar( ).setTitle(F2013.languages[F2013.lang]['home'+config.tag+'Label']);
					
				},
				
				activeitemchange: function(card, newActiveItem, oldActiveItem) {
					var me = this;
					var index = 0;
					//me.getComponent('infoItem').xtype;
					//ns.getToolbar( ).getItems( )[0].hide();
					//var index = me.getActiveIndex(newActiveItem);
					if (index > 1) {
						me.getToolbar( ).query('button[name="back"]')[0].show();
					}
					else {
						me.getToolbar( ).query('button[name="back"]')[0].hide();
					}
				},
				
				
				leafitemtap: function(nestedList, list, index, element, record) {
					var me = this;
                  
					Ext.data.JsonP.request({
						callbackKey: 'jsoncallback',
						url: 'http://apps.fiemme2013.com/v4media/albumphotos',
						params: {
							RefOwner: '72DF9D84F4194F3CBB4993433B7A3E40',
							lang: F2013.lang,
							OID: record.get('ID'),
                            tag: config.tag,
                            order:'seq',
                            system: F2013.os
						},
						success: function(response){
							//me.getToolbar( ).query('button[ui="back"]')[0].setText('');
							var me = this;
							me.getToolbar( ).query('button[name="back"]')[0].setText('');
							var rs = Ext.decode(response.responseText);
							 Ext.Viewport.getActiveItem().setMasked({
								    xtype: 'loadmask',
								    message: 'Please wait'
								})
							for (var i=0; i<response.length; i++) {
								var r = response[i];
								//console.log(JSON.encode(r));
                                var mimg = 1;//
                                var conf = r['CONF']['Vortex4'];
                                var wi = conf['width'];
                                var hi = conf['height'];
                                var rp = wi/hi
                                var rp2 = window.innerWidth/window.innerHeight
                                this.altezza_1 = (window.innerHeight-130)*0.92*config.mol;
                                //console.log('DIM '+ wi + ' - ' + hi)
                                //console.log('DIM2 '+ window.innerWidth + ' - ' + window.innerHeight)
                                //console.log('RP '+ rp + ' - ' + rp2)
                                me.wt = window.innerWidth;
                                //me.getDetailCard().width
                                if (wi>hi){
                                    me.wt = window.innerWidth;
                                    me.ht = me.wt/rp;
                                    me.wt = me.wt-1;
                                    if(me.ht>this.altezza_1){
                                        me.ht = this.altezza_1
                                        me.wt = me.ht*rp
                                    }
                                        
                                }
                                else {
                                    me.wt =  this.altezza_1*rp;
                                }
								//ri = wi<hi;
								//wt = (me.getDetailCard().width/26)*22;
								//ht = (me.getDetailCard().height/26)*22;
								//if(ri>1) {
								//console.log('RRR wi '+ wi +' hi '+ hi +' ri '+ ri +' wt '+ wt + ' ht ' + ht)
								//}
								//else {
									//console.log('NNN wi '+ wi +' hi '+ hi +' ri '+ ri +' wt '+ wt + ' ht ' + ht)
								//}
								//this.altezza_1 = window.innerHeight-this.altezza_1;
								
								me.getDetailCard().add({
									xtype:'panel',
									layout: {
							            type: 'vbox'
							        },
                                    items:[
                                        {
                                           xtype:'panel',
                                           height: this.altezza_1,
                                           items:[                        
                                                  {
                                                  xtype: 'image',
                                                  cls: 'my-carousel-item-img',
                                                  centered: true,
                                                  width: me.wt,
                                                  height: this.altezza_1,
                                                  src: Ext.String.format('http://storage.fiemme2013.com/x00001/public/72DF9D84F4194F3CBB4993433B7A3E40/Vortex4/{0}.jpg',r['UUID'])
                                                  }
                                            ]
                                           }
                                      ,{
									    xtype: 'label',
									    //height: '4em',
									    flex:4,
									    style: {
									    	"padding-top": '0.5em',
                                            "padding-left": '0.15em',
                                            "padding-right": '0.15em',
									    	"text-align": 'center',
									    	"font-family": 'Eurostile'
									    },
									    html: Ext.String.format('<div><span>{0} - {1}/{2}</spam></div>',r['LABEL1'],i+1,response.length)
									}]
								});
								
							}
							Ext.Viewport.getActiveItem().setMasked(false);
							me.getDetailCard().setActiveItem(0);
						},
						scope: me
					});
				}
				
			},
			
            getItemTextTpl: function(node) {
                return '<div style="font-size:0.8em; font-family:Eurostile;  vertical-align:middle;"><div style="float:left; width:80px; height:60px; overflow:hidden;  vertical-align:middle; "><img height="60px" src="<tpl if="values.IMAGE == \'\'">http://www.fiemme2013.com/immagini/news_logo.jpg</tpl><tpl if="values.IMAGE != \'\'">{IMAGE}</tpl>"></div><div style="margin-left:90px; "><div style="float:left; width:160px; vertical-align:middle;"><span>{LABEL1}</span></div><div style="margin-left:170px; vertical-align:middle;"><img style=" vertical-align:middle;"  height="30em" src="img/Ico-BACK_forward.png"></div></div></div><div style="clear:both"></div>'
            }        
		});
		
		me.callParent([config]);
	}

});

Ext.define('F2013.view.Info', {
	extend: 'Ext.dataview.List',
    xtype: 'viewinfo',
    
	constructor: function (config){
		var me = this;
        config = config || {};
        me.initialConfig = config;
		
		Ext.apply(config, {
			itemTpl : Ext.String.format('<div style="font-size:0.6em;"><div style="float:left; width:80; text-align:center; "><img  src="{image}" height="60em"></div><div style="margin-left:80px;"><span style="font-size:1.5em; font-family:Eurostile;">{name}</span><br><br>{description}<br></div></div><div style="clear:both"></div>')
		});	
		
		me.callParent([config]);
	},
	
	config: {
		store : {xtype:'storeinfo'},
		
		
		listeners: {
			initialize: function (a,b){
				a.getStore().getProxy().setUrl(F2013.lang+'/info.json');
				a.getStore().config.proxy.url = F2013.lang+'/info.json';
				console.log('LOAD -'+ F2013.lang+'/info.js');
				a.getStore().load();
				//console.log('meteo 2');
			},
			
			itemtap: function(view, index, target, record) {
	            
	            if(!record.data.site){
	            	
	            	
	            	if((!record.data.connecction) || (navigator.network.connection.type != Connection.NONE && navigator.network.connection.type != 'unknown' )) {
	            		console.log(record.data.config.xtype);
	            		if(record.data.config.xtype == 'panel'){
	            			view.parent.parent.getComponent('titleviewinfo').setHidden(true);
	            		}
			            view.parent.add(record.data.config);
			            view.parent.setActiveItem(1);
			            view.parent.parent.getComponent('titleviewinfo').setTitle(record.data.name);
	            	}
	            	else{
	            		Ext.Msg.alert('Alert', F2013['cerror_'+F2013.lang], Ext.emptyFn);;
	            	}
	            }
	            else {
	            	out = window.open(record.data.url,'_blank');
	            	out.focus();
	            }
	        }
		}
    }
	
});


Ext.define('F2013.view.SpecialityContainer', {
	extend: 'Ext.Panel',
	alias: 'widget.specialitycontainer',
	xtype: 'specialitycontainer',
	
	constructor: function (config){
		var me = this;
       config = config || {};
       me.initialConfig = config;
       Ext.Viewport.setMasked(false); 
		
		Ext.apply(config, {
			layout: {
	            type: 'fit'
	        },

		    items: [ {
					     xtype: 'tabpanel',
					     itemId: 'tabSpeciality',
					     ui: config.tag,
					     activItem: 0,
					     listeners: {
						     activeitemchange: function(item,value, oldValue, e) {
						    	/* if (value.getInnerItems()[0].xtype!='Photogallery') {
					    			   console.log('Remove '+ oldValue.getInnerItems()[0].xtype)
					    			   
					    		   } */
						    	  if(value.getInnerItems()[0].xtype=='Photogallery' &&  (navigator.connection.type == Connection.NONE && navigator.connection.type != 'unknown' ) ) {
						    			  Ext.Msg.alert('Alert', F2013['cerror_'+F2013.lang], Ext.emptyFn);;
						    			  oldValue.getInnerItems()[0].getStore().removeAll(); 
						    			  oldValue.parent.setActiveItem(oldValue);
						    			  console.log(oldvalue.getInnerItems()[0].xtype);
						    		  }
							    	 else if( oldValue.getInnerItems()[0].xtype!='Photogallery'){
							    		 //console.log('Arrivo prima qui')
							    		 oldValue.getInnerItems()[0].getStore().removeAll(); 
							    		 
							    	 }
							    			
							    	 value.getInnerItems()[0].reload(value.getInnerItems()[0]);
					    			 if(oldValue.xtype == 'container'){
						        		  oldValue.setActiveItem(0);
						        		   
						        		  try{
						        			  oldValue.getActiveItem().deselectAll(true);
						        		  }
						        		  catch(err)
						        		  {
						        		   
						        		  }
							        	   
						        	   }
						    	
				    			   
					        	   
					    	 },
					    	 
					    	 deactivate: function( tab,  newActiveItem,  oldActiveItem, eOpts ){
					    		 console.log('Active');
					    	 }
					     },
					     items:[{
					    	 xtype: 'container',
				        	 layout: {
			             		animation: {
			                     	type: 'slide',
			                     	direction: 'left'
			                 	},
			                 	type: 'card'
			             	},
			             	iconCls: 'f_news',
			             	iconMask: true,
			             	title: 'News',
			        	 	items: [
							 	{
								  	xtype: 'News',
								  	color: '#0b4f8a',
								  	tag: config.tag,
								  	lang: 'EN',
								  	load:true
							 
							 	},
								{
									xtype: 'detailpanel',
                                    style: {
                                        'background-color': '#ffffff'
                                    }
								}
							]	        	 	
				         },
				         {
					    	 xtype: 'container',
				        	 layout: {
			             		animation: {
			                     	type: 'slide',
			                     	direction: 'left'
			                 	},
			                 	type: 'card'
			             	},
			             	iconCls: 'calendar2',
			             	iconMask: true,
			             	title: F2013.languages[F2013.lang].specialityCalendarLabel,
			        	 	items: [
							 	{
								  	xtype: 'calendar',
								  	//color: '#0b4f8a',
								  	tag: config.tag,
								  	load: false
							 
							 	},
								{
									xtype: 'detailpanel',
                                    style: {
                                        'background-color': '#ffffff'
                                    }

								}
							]	        	 	
				         },
				         {
					    	 xtype: 'container',
				        	 layout: {
			             		animation: {
			                     	type: 'slide',
			                     	direction: 'left'
			                 	},
			                 	type: 'card'
			             	},
			             	iconCls: 'f_res',
			             	hidden: config.tag == 'EventiCollaterali',
			             	iconMask: true,
			             	title: F2013.languages[F2013.lang].specialityResultLabel,
			        	 	items: [
							 	{
								  	xtype: 'result',
								  	//color: '#0b4f8a',
								  	tag: config.tag,
								  	load: false
							 
							 	},
								{
									xtype: 'detailpanel',
                                    style: {
                                        'background-color': '#ffffff'
                                    }

								}
							]	        	 	
				         },

				         {
					    	 xtype: 'container',
				        	 layout: {
			             		animation: {
			                     	type: 'slide',
			                     	direction: 'left'
			                 	},
			                 	type: 'card'
			             	},
			             	iconCls: 'f_photo',
			             	iconMask: true,
			             	title: F2013.languages[F2013.lang].specialityPhotogalleryLabel,
			        	 	items: [
							 	{
								  	xtype: 'Photogallery',
								  	tag: config.tag,
								  	backButton: {
								  		icon: 'img/Ico-BACK_black.png',
										ui: 'f2013',
										text: ''
								    },
                                    mol:1,
								    backText: '',
								    updateTitleText: false,
								    usetitleAsBackText: false,
								    myhidden: true
							 	},
								{
									xtype: 'detailpanel',
                                    style: {
                                        'background-color': '#ffffff'
                                    }

								}
							]	        	 	
				         }
					     	/*,{
					     		xtype: 'info',
					     		title: 'Info',
					     		iconCls : 'info'
					     		
					     	}*/
					     	
					     ],
					     tabBar: {
					         docked: 'bottom',
					         ui: config.tag,
					         layout: {
					            type: 'hbox'
					         }
					        
					     
					     },
				         scope:me
					 },
					 {
					    xtype: 'titlebar',
					    itemId: 'titleSpeciality',
						
					    ui : config.tag+F2013.iosversion,
						docked: 'top',
						title: F2013.languages[F2013.lang]['home'+config.tag+'Label'],
						items: [{
							
							 xtype: 'button',
							 icon: 'img/Ico-BACK_black.png',
							 ui: 'f2013'+F2013.iosversion,
					         handler: function() {
					        	   Ext.Viewport.setMasked(false);
					        	   var me = this;
					        	   var tabp = me.getComponent('tabSpeciality');
					        	   var taba = tabp.getActiveItem();
					        	   if(taba.getActiveItem().xtype == "PhotogalleryInternal" ){
					        		   ida = taba.getActiveItem().getActiveItem().id
					        		   idinner = taba.getActiveItem().getInnerItems()[0].id 
					        	   }
					        	   else {
					        		   ida = null
					        		   idinner = null
					        	   }
					        	   if (taba.getActiveItem().xtype == "PhotogalleryInternal" && (ida  !=  idinner)){
					        		   //taba.getActiveItem().fireEvent('back', this);
					        		   taba.getActiveItem().getDetailCard().removeAll();
									   
					        		   var tb = taba.getActiveItem();
					        		   var anim = taba.getActiveItem().getLayout().getAnimation();
					        		   anim.setReverse(true);
					        		   if(taba.getActiveItem().getInnerItems()[0].xtype  ==  taba.getActiveItem().getActiveItem().xtype)	 {
							        	   taba.getActiveItem().setActiveItem(0);
							           } 
							           else{
							        	   taba.getActiveItem().setActiveItem(0);
							           }
					        		   anim.setReverse(false);
					        		   //
						        	   	
					        	   
					        	    
						        	  
					        	   }
					        	   else{
					        		   //tabp.setActiveItem(1);
						        	   if(taba.getActiveItem() == taba.getInnerItems()[0]){
						        		   var animation = me.parent.getLayout().getAnimation();
										   animation.setReverse(true);
										   for(i=me.parent.getInnerItems().length;i>1;i--){
											   me.parent.removeAt(i-1)
										   }
						        		   me.parent.setActiveItem(0);
						        		   animation.setReverse(false);
						        		   F2013.lock = true;
						        		   //tabp.setActiveItem(0);
						        	   }
						        	   else {
						        		  var animation = taba.getLayout().getAnimation();
										   animation.setReverse(true);
						        		   taba.setActiveItem(0);
						        		   animation.setReverse(false);
							        	   
						        	   } 
					        	   }
					        		   
								},scope:me
					     },
					     {
					    	 xtype: 'container',
					    	 style:{
					    	 	"padding-top": (F2013.iosversion != 7) ?  "11%" : "25%",
					    	 	"padding-left": (F2013.iosversion != 7) ? "3%" : "40%"
                                
					    	 },
                             width: (F2013.iosversion != 7) ? '100%': '90%',
                             html: (F2013.iosversion != 7) ? '<img src="img/'+config.tag+'.png"  height="80%">' : '<img src="img/'+config.tag+'.png" width="100%" height="100%">',
					    	 align:'right'
					    }],scope:me
					     
			          }
		       ],
		       scope:me
		});	
			
		me.callParent([config]);
	}

});


Ext.define('F2013.view.Tablet.HtmlToPanel', {
    extend: 'Ext.Panel',
    xtype: 'htmltopanelTablet',
    name: 'MyHtmlToPanelTablet',
    scrollable:true,
    
    // We are using Ext.Ajax, so we should require it
    requires: ['Ext.Ajax'],

   config: {
	   	//cls: 'internal',
	   	scrollable: true,
    	//html:'<div style="color:#666; background-image:url(\'img/bg.jpg\'); background-size: 100%;background-repeat: no-repeat; height:100px;"></div>',
    	
        listeners: {
            activate: 'onActivate'
        },
        
        
        // Create a new configuration called `url` so we can specify the URL
        url: null
    },
    

    onActivate: function(me, container) {
        Ext.Ajax.request({
            // we should use the getter for our new `url` config
            url: F2013.lang + '/' +me.config.url,
            method: "GET",
            success: function(response, request) {
                // We should use the setter for the HTML config for this
                me.setHtml(response.responseText);
                
            },
            failure: function(response, request) {
                me.setHtml("failed -- response: " + response.responseText + "-"+me.config.url);
            }
        });
    }
});

Ext.define('F2013.view.Tablet.Webcam', {
	extend: 'Ext.Carousel',
	alias: 'widget.webcamTablet',
	xtype: 'webcamTablet',
           style: {
            'backgroud-color':'transparent'
           },
    
	
	
    constructor: function(config) {
		var me = this;
        config = config || {};
        me.initialConfig = config;
        
       
        
         Ext.data.JsonP.request({
            params:{
                system: device.platform+ '_' +device.model + '_' + device.version
            },
			callbackKey: 'jsoncallback',
			url: 'http://apps.fiemme2013.com/v4web/webcam?lang='+F2013.lang,
			success: function(response){
				for (var i=0; i<response.length; i++) {
					var r = response[i];
					
					me.add({
						xtype:'panel',
						layout: {
				            type: 'vbox'
				        },
						items:[{
							xtype: 'image',
		                    cls: 'my-carousel-item-img',
		                    flex:22,
							src: r['url']
						},{
						    xtype: 'label',
						    flex:4,
						    style: {
						    	"padding-top": '0.5em',
						    	"text-align": 'center',
						    	"font-family": 'Eurostile'
						    },
						    html: Ext.String.format('<div><span>{0} </br> {1}</spam></div>',r['name'],r['description'])
						}]
					});
					
				}
			},
			failure: function(response) {
		       
		    },
			scope: me
		});
        me.callParent([config]);
    }
});

Ext.define('F2013.view.Tablet.Home', {
	extend: 'Ext.Panel',
	name: 'MyHomef2013',
	xtype: 'homeTablet',
	
	
	//fullscreen: true,
	scroll: false,

	
	constructor: function(config) {
		
		document.addEventListener("backbutton", onBackKeyDown, false);

		function onBackKeyDown(e) {
			var me = this;
			if(Ext.Viewport.getActiveItem().getActiveItem().name == 'MyHomef2013') {
				navigator.app.exitApp();
			}
			else{
				Ext.Viewport.setMasked(false);
				var animation = Ext.Viewport.getActiveItem().getLayout().getAnimation();
				animation.setReverse(true);
				try{
					if(!F2013.actionSheet.isHidden( )) {
						F2013.actionSheet.hide();
					};
				}
				catch(err){
					
				}
				
				if(Ext.Viewport.getActiveItem().getActiveItem().xtype == 'Luoghi'){
					if(Ext.Viewport.getActiveItem().getActiveItem().getComponent('titleLuoghi').query('button[name="omap"]')[0]!=null){
						Ext.Viewport.getActiveItem().getActiveItem().getComponent('titleLuoghi').query('button[name="omap"]')[0].hide();
					
					};
				}
				
				for(i=Ext.Viewport.getActiveItem().getInnerItems().length;i>1;i--){
					 Ext.Viewport.getActiveItem().removeAt(i-1);
				   }
				
				Ext.Viewport.getActiveItem().setActiveItem(0);
				F2013.lock = true;
				animation.setReverse(false);
				
			}
		};
		var me = this;
		//localStorage.removeItem('lingua');
		
		
		if( window.localStorage.getItem('lingua') == undefined){
			me.lingua = null
		
		}
		else {
			me.lingua = window.localStorage.getItem('lingua');	
		}
			
		config = config || {};
		me.initialConfig = config;
		
		
		
		Ext.apply(config, {
			//padding: 4,
                  html: '<div id="btnPanel" ></div>',
            
			/*cls: 'home',
            
			
			html: '<div align="center" style="position:relative; "> <img style="width:80%" src="img/logotop.png"></div><div style="position:absolute;left:2%;top:20%;height:17.6em;width:60%; margin: 0.2em 0em; border-radius:0.5em; box-shadow: 5px 5px 20px #333; -webkit-box-shadow: 5px 5px 20px #333; background-color:white;" id="btnPanel"/>',*/
			listeners: {
				painted: function() {
                  
					var me = this;
					F2013.lock = true;
					if (!me.isCreated) {
                        //alert('ciao');
						if(me.lingua == null ){
							me.createLanguage();
						}
						else {
							//me.updateversion();	
							F2013.lang = me.lingua;
							me.isCreated = true;
							me.createPanel();
							
						}
					}
					
				},
				scope: me
			}
			
		});
		
		me.callParent([config]);
	},
	
	createPanel: function() {
		var geolocation = null;
		var me = this;
		
		
		me.btnPanel = Ext.create('Ext.Panel', {
			renderTo: 'btnPanel',
			defaults: {
				xtype: 'button'
			},
           
			//height: "140%",
			layout: {
				type: 'vbox',
				align: 'center'
			},
            style:{
              'font-size':'1em'             
            },
			items: [
				{  
					ui: 'all-tablet',
					xtype: 'button',
					text: F2013.languages[me.lingua].homeProgramsLabel,
					width: '95%',
					flex: 1,
                    height: '100%',
					handler: function(){ 
						
						if(F2013.lock) {
							Ext.Viewport.setMasked({
							    xtype: 'loadmask',
							    message: 'Loading'
							});
							F2013.lock = false;
							var time = new Date().getTime();
							this.parent.add({
								xtype: 'schedulecontainertablet'
							})
							this.parent.setActiveItem(1);
							
						}
						//this.setMasked(false);
					},
					scope: me
				},
			    {
					ui: 'xc-tablet', 
					text: F2013.languages[me.lingua].homeXCLabel,
					width: '95%',
					flex: 1,
                    height: '100%',
					handler: function(){
						var me = this;
						if(F2013.lock) {
							Ext.Viewport.setMasked({
							    xtype: 'loadmask',
							    message: 'Loading'
							});
							F2013.lock = false;
							this.parent.add({
							    xtype: 'specialitycontainertablet',
							    tag: 'XC',
							    lang: me.lingua
							})
							
							this.parent.setActiveItem(1);
							
						}
						
					},
					scope: me
				},
				{ 
					ui: 'sj-tablet', 
					text: F2013.languages[me.lingua].homeSJLabel,
					width: '95%',
					flex: 1,
                    height: '100%',
					handler: function(){ 
						if(F2013.lock) {
							Ext.Viewport.setMasked({
							    xtype: 'loadmask',
							    message: 'Loading'
							});
							F2013.lock = false;
							this.parent.add({
							    xtype: 'specialitycontainertablet',
							    tag: 'SJ',
							    lang: me.lingua
							//title: F2013.languages[me.lingua].homeSJLabel,
							});
							this.parent.setActiveItem(1);
							//this.parent.getActiveItem().List.getStore().load();
						}
					},
					scope: me
				},
				{
					ui: 'nc-tablet', 
					text: F2013.languages[me.lingua].homeCNLabel,
					width: '95%',
					flex: 1,
                    height: '120%',
					handler: function(){ 
						if(F2013.lock) {
							Ext.Viewport.setMasked({
							    xtype: 'loadmask',
							    message: 'Loading'
							});
							F2013.lock = false;
							this.parent.add({
							    xtype: 'specialitycontainertablet',
							    tag: 'CN',
							    lang: me.lingua
							//title: F2013.languages[me.lingua].homeNCLabel,
							});
							this.parent.setActiveItem(1);
							//this.parent.getActiveItem().List.getStore().load();
						}
						
					},
					scope: me 
				},
				{
					ui: 'ec-tablet',
					text: F2013.languages[me.lingua].homeEventiCollateraliLabel,
					width: '95%',
					flex: 1,
                    height: '100%',
					handler: function(){
						if(F2013.lock) {
							Ext.Viewport.setMasked({
							    xtype: 'loadmask',
							    message: 'Loading'
							});
							this.parent.add({
							    xtype: 'specialitycontainertablet',
							    tag: 'EventiCollaterali',
							    lang: me.lingua
						
							    
							//title: F2013.languages[me.lingua].homeECLabel,
							});
							this.parent.setActiveItem(1);
							//this.parent.getActiveItem().List.getStore().load();
						}
						
					},
					scope: me
				},
				{
					ui: 'all-tablet',  
					text: F2013.languages[me.lingua].homePlacesLabel,
					width: '95%',
					flex: 1,
                    height: '100%',
					handler: function(){ 
						if(F2013.lock) {
							Ext.Viewport.setMasked({
							    xtype: 'loadmask',
							    message: 'Loading'
							});
							F2013.lock = false;
							this.parent.add({
							    xtype: 'listcontainer',
							    name: 'LuoghiTablet',
							    title: F2013.languages[me.lingua].homePlacesLabel
							//title: F2013.languages[me.lingua].homeSJLabel,
							});
						
							this.parent.setActiveItem(1);
						}
					},
					scope: me
				},
				{
					ui: 'all-tablet',
					text: F2013.languages[me.lingua].homeNewsLabel,
					width: '95%',
					flex: 1,
                    height: '125%',
					handler: function(){
						if(F2013.lock) {
							Ext.Viewport.setMasked({
							    xtype: 'loadmask',
							    message: 'Loading'
							});
							F2013.lock = false;
							this.parent.add({
							    xtype: 'listdetailcontainer',
							    name: 'Newstablet',
                                text: 'News'
							});
							this.parent.setActiveItem(1);
						}
					},
					scope: me
				},
				{ 
					ui: 'all-tablet',  
					text: F2013.languages[me.lingua].homePhotoLabel,
					width: '95%',
					flex: 1,
                    height: '125%',
					handler: function(){ 
						if(F2013.lock) {
							if(navigator.connection.type != Connection.NONE && navigator.connection.type != 'unknown' ) {
								Ext.Viewport.setMasked({
								    xtype: 'loadmask',
								    message: 'Loading'
								});
								F2013.lock = false;
								//this.parent.setActiveItem(6);
								this.parent.add({
									xtype: 'genericcontainertablet',
									name: 'photo',
									tag: 'ALL',
									title:F2013.languages[me.lingua].homePhotoLabel,
									icohidden:true,
									myitem: {
									
									    xtype: 'Photogallerytablet',
									  	backButton: {
									  		icon: 'img/Ico-BACK_black.png',
											ui: 'f2013',
											text: ''
									    },
                                        tag: 'ALL',
									    backText: '',
									    updateTitleText: false,
									    usetitleAsBackText: false,
									    myhidden: true
									}
								}	
								);
								this.parent.setActiveItem(1);
								
							}
							else{
								Ext.Msg.alert('Alert', F2013['cerror_'+F2013.lang], Ext.emptyFn);
								
								//alert(F2013['cerror_'+F2013.lang]);
							}
						}
						
					},
					scope: me
				},
				{
					ui: 'all-tablet',
					text: F2013.languages[me.lingua].homeInfoLabel,
					width: '95%',
					flex: 1,
                    height: '125%',
					handler: function(){
						if(F2013.lock) {
							
							Ext.Viewport.setMasked({
							    xtype: 'loadmask',
							    message: 'Loading'
							});
							this.parent.add({
							    xtype: 'listcontainer',
							    name: 'viewinfotablet',
							    title: F2013.languages[me.lingua].homeInfoLabel
							//title: F2013.languages[me.lingua].homeSJLabel,
							});
							this.parent.setActiveItem(1);
						}

					},
					scope: me
				}
			]
		
		});
	
		if(F2013.myhome=='info'){
			this.parent.getLayout().setAnimation(null);
			this.parent.add({
			    xtype: 'listcontainer',
			    name: 'Info'
			//title: F2013.languages[me.lingua].homeSJLabel,
			});
			this.parent.setActiveItem(1);
			this.parent.getLayout().setAnimation({
                type: 'slide'
                });
		}
	
	},
	
	createLanguage: function() {
		var me = this;
		me.btnLanguage = Ext.create('Ext.Panel', {
			renderTo: 'btnPanel',
			defaults: {
				xtype: 'button'
			},
			height: "100%",
			layout: {
				type: 'vbox',
				align: 'center'
			},
			items: [
				{  
					xtype: 'label',
					html: '',
					width: '100%',
					height: 30,
					scope: me
					
				},
				{  
					xtype: 'label',
					html: '<h2>Scegli la tua lingua:</h2>',
					width: '100%',
					height: 50,
					padding: '0 0 0 5',
					scope: me,
					style: {
						"font-family": "Eurostile",
                        "font-size":'1.2em'
					}
				},
				{  
					xtype: 'label',
					html: '<h2>Choose your language:</h2>',
					width: '100%',
					height: 50,
					padding: '0 0 0 5',
					scope: me,
					style: {
						"font-family": "Eurostile",
                        "font-size":'1.2em'
					}
				},
				{  
					xtype: 'label',
					html: '',
					width: '100%',
					height: 10,
					scope: me
				},
				{ 
					xtype: 'panel',
					height: 100,
					width: '100%',
					scope: me,
					layout: {
						type: 'hbox',
						align: 'center'
					},
					items: [
                            {
                                xtype:'panel',
                                width:'5%'
                            },
					{  
					xtype: 'button',
					ui: 'italy',
					text: '',
					width: '30%',
					height: 100,
					margin: '0 20 0 20',
					//flex: 2,
					handler: function(){ 
						var me = this;
						me.lingua = 'IT';
						window.localStorage.setItem('lingua', 'IT');
						me.isCreated = true;
						me.btnLanguage.destroy();
						F2013.lang = me.lingua;
						me.createPanel();
						//me.updateversion();
						
					},
					scope: me
				},
                            {
                            xtype:'panel',
                            width:'5%'
                            },
				{
					ui: 'england',
					xtype: 'button',
					text: '',
					width: '30%',
					height: 100,
					//flex: 2,
					handler: function(){ 
						var me = this;
						me.lingua = 'EN';
						window.localStorage.setItem('lingua', 'EN');
						me.isCreated = true;
						me.btnLanguage.destroy();
						F2013.lang = me.lingua;
						me.createPanel();
						//me.updateversion();
						
					},
					scope: me
				}]
				}
			]
		
		});
	}	
});

Ext.define('F2013.view.Tablet.Main', {
           extend: 'Ext.Container',
           xtype: 'mainview',
           config: {
           fullscreen: true,
        

           
           cls: 'homeTablet',
           html: '<div > <img style="width:42%; position:absolute; left:-3%;top:2%;" src="img/logotop.png"></div>',
           layout: {
             animation: {
               type: 'slide',
               direction: 'left'
              },
              type: 'hbox'
           },
           
                    items:[
                           
                          {
                            xtype: 'panel',
                            flex: 29,
                            cls: 'leftpaneltab' + Ext.os.version.major,
                           
                           layout: {
                                animation: {
                                    type: 'slide',
                                    direction: 'left'
                                },
                                type: 'card'
                            },
                            items:[
                                {
                                   xtype: 'homeTablet',
                                   style:{
                                    'background':'transparent'
                                   
                                   }
                                }
                            ]
                          },
                          {
                            xtype: 'panel',
                            flex:60,
                            itemId: 'rightpanel' ,
                            layout: {
                                animation: {
                                    type: 'slide',
                                    direction: 'left'
                                },
                                type: 'card'
                            },
                            items:[
                                {
                                   xtype:'panel',
                                   style:{
                                    'background':'transparent'

                                   }
                                }
                            ],
                            cls: 'rightpaneltab' +Ext.os.version.major

                          }
                          
                    ]
                   }
                   

});


Ext.define('F2013.view.Tablet.ScheduleContainer', {
	extend: 'Ext.Panel',
	alias: 'widget.schedulecontainertablet',
	xtype: 'schedulecontainertablet',
	constructor: function (config){
	   var me = this;
       config = config || {};
       me.initialConfig = config;
       Ext.Viewport.setMasked(false); 
		
		Ext.apply(config, {
			layout: {
	            type: 'fit'
	        },

		    items: [ {
					     xtype: 'tabpanel',
					     itemId: 'tabSchedule',
					     ui: 'ALL',
					     activItem:0,
					     listeners: {
					    	 activeitemchange: function(item,value, oldValue, e) {
					    		   //value.config.load=true;
					    		   oldValue.getInnerItems()[0].getStore().removeAll();
					        	   value.getInnerItems()[0].reload(value.getInnerItems()[0]);
					    		   
					    		   if(oldValue.xtype == 'container'){
					        		   oldValue.setActiveItem(0);
						        	   oldValue.getActiveItem().deselectAll(true);
					        	   }
					    	 }
					     },
					     items:[{
					    	 	xtype: 'container',
				        	 	layout: {
				             		animation: {
				                     	type: 'slide',
				                     	direction: 'left'
				                 	},
				                 	type: 'card'
				             	},
				             	iconCls: 'f_all',
				             	title: F2013.languages[F2013.lang].scheduleAllLabel,
				        	 	items: [
								 	{
									  	xtype: 'calendartablet',
									  	color: '#0b4f8a',
									  	tag: '',
									  	load: true
								 
								 	},
									{
										xtype: 'detailpanel',
                                        style:{
                                            'background':'transparent'
                                        }
									}
								]	        	 	
				         },{
					    	 xtype: 'container',
				        	 	layout: {
				             		animation: {
				                     	type: 'slide',
				                     	direction: 'left'
				                 	},
				                 	type: 'card'
				             	},
				             	iconCls : 'f_xc',
				             	title: 'XC',
				        	 	items: [
								 	     	
							     	{
							     		xtype:'calendartablet',
										tag : 'XC',
										color: '#1D87ED',
									  	load: false
																     	
							     	
							     	},
									{
										xtype: 'detailpanel',
                                        style:{
                                            'background':'transparent'
                                        }
									}
								]	        	 	
				         },{
					    	 xtype: 'container',
				        	 	layout: {
				             		animation: {
				                     	type: 'slide',
				                     	direction: 'left'
				                 	},
				                 	type: 'card'
				             	},
				             	iconCls : 'f_sj',
								title: 'SJ',
				        	 	items: [
									{
							     		xtype:'calendartablet',
										tag : 'SJ'	,
										
		                                color: '#fd1a14',
									  	load: false
							     	
							     	},
									{
										xtype: 'detailpanel',
                                        style:{
                                            'background':'transparent'
                                        }
									}
								]	        	 	
				         },{
					    	 xtype: 'container',
				        	 	layout: {
				             		animation: {
				                     	type: 'slide',
				                     	direction: 'left'
				                 	},
				                 	type: 'card'
				             	},
				             	iconCls : 'f_nc',
				             	title: 'NC',
				        	 	items: [
								 	{
							     		xtype:'calendartablet',
										tag : 'CN',
										color: '#FFCf11',
									  	load: false
							     	},
									{
										xtype: 'detailpanel',
                                        style:{
                                            'background':'transparent'
                                        }
									}
								]	        	 	
				         },{
					    	 xtype: 'container',
				        	 	layout: {
				             		animation: {
				                     	type: 'slide',
				                     	direction: 'left'
				                 	},
				                 	type: 'card'
				             	},
				             	iconCls : 'f_ec',
				             	title: 'Festival',
				        	 	items: [
								 	{
							     		xtype:'calendartablet',
										tag : 'EventiCollaterali',
										color: '#EA00ED',
									  	load: false
							     	},
									{
										xtype: 'detailpanel',
                                        style:{
                                            'background':'transparent'
                                        }
									}
								]	        	 	
				         }

					     ],
					     tabBar: {
					         docked: 'bottom',
					         ui:'ALL',
					         layout: {
					            type: 'hbox'
					         }
					        
					     
					     }
					 },
					 {
					    xtype: 'titlebar',
					    docked: 'top',
					    ui: 'ALL',
						title: F2013.languages[F2013.lang].homeProgramsLabel,
						items: [{
							
							 xtype: 'button',
			                 icon: 'img/Ico-BACK_black.png',
							 ui: 'f2013',
					         handler: function() {
					        	   
					        	   var me = this;
					        	   var tabp = me.getComponent('tabSchedule');
					        	   var taba = tabp.getActiveItem();
					        	   
					        	   if(taba.getActiveItem() == taba.getInnerItems()[0]){
					        		   var animation = me.parent.getLayout().getAnimation();
									   animation.setReverse(true);
									   for(i=me.parent.getInnerItems().length;i>1;i--){
										    me.parent.removeAt(i-1);
									   }
					        		   me.parent.setActiveItem(0);
					        		   animation.setReverse(false);
					        		   F2013.lock = true;
                                Ext.Viewport.getActiveItem().getComponent('rightpanel').setActiveItem(0);
                                Ext.Viewport.getActiveItem().getComponent('rightpanel').removeAt(1)
					        	   }
					        	   else {
					        		   var animation = taba.getLayout().getAnimation();
									   animation.setReverse(true);
					        		   taba.setActiveItem(0);
					        		   animation.setReverse(false);
						        	   
					        	   }
								},scope:me
					     }]
					     
			          }
		       ]	
		});	
			
		me.callParent([config]);
	}

});


Ext.define('F2013.view.Tablet.PanelSociali', {
    extend: 'Ext.Panel',
    xtype: 'socialtablet',
    name: 'socialtablet',
    scrollable:true,
    
    // We are using Ext.Ajax, so we should require it
    requires: ['Ext.Ajax'],

    config: {
    	 layout: 'vbox',
    	 //cls: 'internaltablet',

         border: true,
    	    items: [
                    {
    	            xtype: 'panel',
    	            flex: 3,
    	            layout: 'hbox',
    	            //html:'',
    	            style: {
                    "margin-top": '10%'
    	            },
    	            items: [
        	                {
                            xtype: 'panel',
                            flex: 5,
                            
                            html:'<div align="center"><IMG  SRC="img/icons_info/Ico-FB.png" WIDTH="80" HEIGHT="79"></div>'
                            
        	            	},
        	            	{
                            xtype: 'panel',
                            flex: 7,
                            layout: {
                            pack : 'center'
                            },
                            html: Ext.String.format('<a style="text-decoration: none;" href="#" onclick="{0}" target="_blank"></br></br><div style="font-family:Eurostile;  color: #1d87ed; font-size:1.2em;">Facebook &#187;</div></a>',"window.open('https://www.facebook.com/Fiemme2013','_blank','toolbar=yes,location=no,directories=no')")
                            
        	            	}
                            ]
                    },
                    {
    	            xtype: 'panel',
    	            flex: 3,
    	            //html:'</a>',
    	            layout: {
                    type:'hbox',
                    pack : 'center'
    	            
    	            },
                    
    	            items: [
                            {
    	                	xtype: 'panel',
    	                	flex: 5,
    	                	
    	                	html:'<div align="center"><IMG  SRC="img/icons_info/Ico-TW.png" WIDTH="80" HEIGHT="79"></div>'
    	            		
                            },
                            {
    	            		xtype: 'panel',
    	            		flex: 7,
    	            		layout: {
                            pack : 'center'
    	    	            },
    	            		html: Ext.String.format('<a style="text-decoration: none;" href="#" onclick="{0}" target="_blank"></br></br><div style="font-family:Eurostile; color: #1d87ed; font-size:1.2em;">Twitter &#187;</div></a>',"window.open('http://twitter.com/fiemme2013','_blank','toolbar=yes,location=no,directories=no')")
    	            		
                            }
                            ]
                    },
                    {
    	            xtype: 'panel',
    	            flex: 3,
    	            layout: {
                    type:'hbox',
                    pack : 'center'
    	            
    	            },
    	            //html:'',
    	            items: [
        	                {
                            xtype: 'panel',
                            flex: 5,
                            
                            html:'<div align="center"><IMG  SRC="img/icons_info/Ico-YT.png" WIDTH="80" HEIGHT="79"></div>'
                            
        	            	},
        	            	{
                            xtype: 'panel',
                            flex: 7,
                            layout: {
                            pack : 'center'
                            },
                            html: Ext.String.format('<a style="text-decoration: none;" href="#" onclick="{0}" target="_blank"></br></br><div style="font-family:Eurostile; color: #1d87ed; font-size:1.2em;">Youtube &#187;</div></a>',"window.open('http://www.youtube.com/user/fiemme2013','_blank','toolbar=yes,location=no,directories=no')")
                            
        	            	}
                            ]
                    },{
    	            xtype: 'panel',
    	            flex: 3,
    	            layout: {
                    type:'hbox',
                    pack : 'center'
    	            
    	            },
    	            //html:'',
    	            items: [
        	                {
                            xtype: 'panel',
                            flex: 5,
                            
                            html:'<div align="center"><IMG  SRC="img/icons_info/Ico-PI.png" WIDTH="80" HEIGHT="79"></div>'
                            
        	            	},
        	            	{
                            xtype: 'panel',
                            flex: 7,
                            layout: {
                            pack : 'center'
                            },
                            html: Ext.String.format('<a style="text-decoration: none;" href="#" onclick="{0}" target="_blank"></br></br><div style="font-family:Eurostile; color: #1d87ed; font-size:1.2em;">Pinterest &#187;</div></a>',"window.open('http://pinterest.com/fiemme2013/','_blank','toolbar=yes,location=no,directories=no')")
                            
        	            	}
                            ]
                    },
                {
    	            xtype: 'panel',
    	            flex: 1
    	        }
    	    ]
    	    }
    
    

    
});

Ext.define('F2013.view.Tablet.DetailPanel', {
           extend: 'Ext.Panel',
           alias: 'widget.detailpaneltablet',
           
           constructor: function(config) {
           var me = this;
           config = config || {};
           me.initialConfig = config;
           
           Ext.apply(config, {
                     scrollable: true,
                     
                     styleHtmlContent: true
                     });
           
           me.callParent([config]);
           }
           });

Ext.define('F2013.view.Tablet.Calendar', {
	extend: 'Ext.dataview.List',
	alias: 'widget.calendartablet',
	
	reload: function(a){
		var lastload = window.localStorage.getItem('schedule-'+a.config.tag+'-'+F2013.lang+'-time'); 
	    var time = new Date().getTime();
	    
		if((lastload == null || time-lastload>F2013.timecache) && ( navigator.connection.type != Connection.NONE) ){
            console.log('LOAD OLD DATA CALENDAR ' + 'schedule-'+a.config.tag+'-'+F2013.lang);
            if (a.config.tag == 'Guestbook'){
              a.getStore().getProxy().setExtraParam('metatype', 'Guestbook');
              a.getStore().config.proxy.extraParams.metatype = 'Guestbook';
              a.getStore().getProxy().setExtraParam('tag', '');
              a.getStore().config.proxy.extraParams.tag = '';

          
            }
            else
            {
              a.getStore().getProxy().setExtraParam('tag', a.config.tag);
              a.getStore().config.proxy.extraParams.tag = a.config.tag;
                a.getStore().getProxy().setExtraParam('metatype', 'EventHTML');
                a.getStore().config.proxy.extraParams.metatype = 'EventHTML';
            }
           
            
			a.getStore().getProxy().setExtraParam('lang', F2013.lang);
			a.getStore().config.proxy.extraParams.lang = F2013.lang;
			a.getStore().load();
	    }
	    else {
	    	if(Ext.decode(window.localStorage.getItem('schedule-'+a.config.tag+'-'+F2013.lang))==null){
	    		
	    	}
	    	else{
	    		console.log('LOAD OLD DATA CALENDAR ' + 'schedule-'+a.config.tag+'-'+F2013.lang);
	    		a.getStore().add(Ext.decode(window.localStorage.getItem('schedule-'+a.config.tag+'-'+F2013.lang)))
	    	}
	    	//Ext.Msg.alert('Alert', ':-)', Ext.emptyFn);
	    }
	},
	
	//itemTpl: Ext.String.format('<div>{0}</div>', this.color),
	constructor: function (config){
		var me = this;
        config = config || {};
        me.initialConfig = config;
		
		//console.log('ENTER IN init calendarlist -'+ config.color +'- ciao');
		
		//me.itemTpl = '<div style="font-size:0.6em; font-weight:bold"><div style="float:left; width:80; text-align:center"><img src="<tpl if="IMAGE.substring(0,4) != \'http\'">http://www.fiemme2013.com</tpl>{IMAGE}" height="50em"></div><div style="font-weight:bold; margin-left:100px;">{S_DATE_F} - {S_TIME} <br><span style="color:#00FFFF; font-size:1.2em;">{LABEL1}</span><br>{ABSTRACT}<br>Luogo: {PLACE}</div></div><div style="clear:both"></div>'
         Ext.apply(config, {
			//itemTpl : Ext.String.format('<div><div style="float:left; width:60px; height:60px; overflow:hidden; text-align:center;"><img src="<tpl if="IMAGE.substring(0,4) != \'http\'">http://www.fiemme2013.com</tpl>{IMAGE}"></div><div style="margin-left:80px;"><span style="color:#000; font-size:0.8em; font-weight:bold">{S_DATE_F} - {S_TIME} </span><br><span style="color:{0}; font-size:0.85em; font-weight:bold">{LABEL1}</span><div style="color:#333; font-size:0.8em; line-height:0.95em;">{ABSTRACT}</div><span style="color:{0}; font-size:0.8em; font-weight:bold">Luogo: {PLACE}</span></div></div><div style="clear:both"></div>', config.color)
			itemTpl : Ext.String.format('<div><div style="float:left; width:40px; height:40px; overflow:hidden; text-align:center;"><img src="<tpl if="TAG== \'\'">img/EXHIBIT.png</tpl><tpl if="TAG!= \'\'">img/{TAG}.png</tpl>" width="40px" height="40px"></div><div style="margin-left:55px; "><div style="float:left;"><span style="color:#000; font-size:0.8em; font-weight:bold">{S_TIME} </span></div><div style="margin-left:55px;"><span style="color:{0}; font-size:0.85em; font-weight:bold">{LABEL1}</span><br><span style="font-size:0.8em; font-weight:bold">{1}: {PLACE}</span></div></div></div><div style="clear:both"></div>', config.color,F2013.languages[F2013.lang].itemPlaceLabel)
		});
       
        
			
			
		me.callParent([config]);
	},
	
	config: {
		store : {xtype:'storecalendar'},
		grouped: true,
		
		
		
		listeners: {
			initialize: function (a,b){
				var lastload = window.localStorage.getItem('schedule-'+a.config.tag+'-'+F2013.lang+'-time'); 
			    var time = new Date().getTime();
			    //console.log('ENTER IN initialize CALENDAR Listner -'+ lastload +'-' +time + ' - ' + ((time-lastload)/1000));
			    //                                                                                                               console.log('ENTER IN initialize CALENDAR Listner2 -'+ window.navigator.onLine +'-' + navigator.network.connection.type );
			    if(a.config.load){
			    
				    if((lastload == null || time-lastload>F2013.timecache) && ( navigator.connection.type != Connection.NONE) ){
                            if (a.config.tag == 'Guestbook'){
                                a.getStore().getProxy().setExtraParam('metatype', 'Guestbook');
                                a.getStore().config.proxy.extraParams.metatype = 'Guestbook';
                                a.getStore().getProxy().setExtraParam('tag', '');
                                a.getStore().config.proxy.extraParams.tag = '';
           
           
                            }
                            else
                            {
                                a.getStore().getProxy().setExtraParam('tag', a.config.tag);
                                a.getStore().config.proxy.extraParams.tag = a.config.tag;
                                a.getStore().getProxy().setExtraParam('metatype', 'EventHTML');
                                a.getStore().config.proxy.extraParams.metatype = 'EventHTML';
                        }
                        a.getStore().getProxy().setExtraParam('lang', F2013.lang);
                        a.getStore().config.proxy.extraParams.lang = F2013.lang;
 						a.getStore().load();
				    }
				    else {
				    	if(Ext.decode(window.localStorage.getItem('schedule-'+a.config.tag+'-'+F2013.lang))!=null){
				    		a.getStore().add(Ext.decode(window.localStorage.getItem('schedule-'+a.config.tag+'-'+F2013.lang)));
				    	}
				    	//Ext.Msg.alert('Alert', ':-)', Ext.emptyFn);
				    }
			    }
				//console.log('ENTER IN initialize calendarlist -'+ a.config.tag +'- ciao');
				
			},
			
			
	        itemtap: function(view, index, target, record) {
	            var me = view;
                //console.log('ciao: '+ navigator.network.connection)
	            if(navigator.connection.type != 'none' && navigator.connection.type != 'unknown' ) {
                    //alert('calendarTablet');
                
					Ext.data.JsonP.request({
						callbackKey: 'jsoncallback',
						url: 'http://apps.fiemme2013.com/v4web/html',
                        params: {
							RefOwner: 'E68D031A3E2E40E592838C5E5180ECCB',
							UUID: record.get('UUID'),
							Lang: F2013.lang
						},
						success: function(response){
							console.log('Succ');
		                    myhtml = Ext.String.format('<div id="detailtablet">{0}</div>', response);
                          
                            var rpanel = Ext.Viewport.getActiveItem().getComponent('rightpanel');
		                    
                            var rp = {
                                xtype: 'detailpaneltablet',
                                style:{
                                    'background':'transparent'
                                }
                            };
                            Ext.Viewport.getActiveItem().getComponent('rightpanel').setActiveItem(0);
                            Ext.Viewport.getActiveItem().getComponent('rightpanel').removeAt(1);
                            Ext.Viewport.getActiveItem().getComponent('rightpanel').add(rp);
                            Ext.Viewport.getActiveItem().getComponent('rightpanel').setActiveItem(1)
                            Ext.Viewport.getActiveItem().getComponent('rightpanel').getActiveItem().setHtml(myhtml);
                           
		                },
                        failure: function(response,request){
                                console.log('Fail ' + response );
                                              console.log('Fail ' + request.url );
                                           }
					});
		        }
				else {
					Ext.Msg.alert('Alert', F2013['cerror_'+F2013.lang], Ext.emptyFn);;
					
				}
	        },
	    }
		
		
		
		
	}
	
	
	
});

Ext.define('F2013.view.Tablet.Luoghi', {
	extend: 'Ext.dataview.List',
	alias: 'widget.LuoghiTablet',
	xtype: 'LuoghiTablet',
	
   constructor: function (config){
		var me = this;
        config = config || {};
        me.initialConfig = config;
		
		Ext.apply(config, {
			itemTpl : Ext.String.format('<div style="font-family:Eurostile; "><div style="float:left; width:60; text-align:center"><img src="{image}" height="50em"></div><div style=" margin-left:70px;"><span style="font-size:1.2em;">{name}</span><br><span style="font-size:0.8em;">{description}</span></div></div><div style="clear:both"></div>')
		});	
		
		me.callParent([config]);
	},
	
	config: {
		store : {xtype:'storeluoghi'},
		
		
		listeners: {
			initialize: function (a,b){
				a.getStore().getProxy().setUrl(F2013.lang+'/luoghiTablet.json');
				a.getStore().config.proxy.url = F2013.lang+'/luoghiTablet.json';
				
				a.getStore().load();
			},
			
			itemtap: function(view, index, target, record) {
	        	 var me = view;
		         	
		            if(!record.data.site){
		            	if((record.data.config.xtype!='gmaps') || (navigator.connection.type != 'none' && navigator.connection.type != 'unknown' )){
		         
                            Ext.Viewport.getActiveItem().getComponent('rightpanel').setActiveItem(0);
                            Ext.Viewport.getActiveItem().getComponent('rightpanel').removeAt(1);
                            Ext.Viewport.getActiveItem().getComponent('rightpanel').add(record.data.config);
                            Ext.Viewport.getActiveItem().getComponent('rightpanel').setActiveItem(1)
                            view.parent.parent.getComponent('titleLuoghi').setTitle(record.data.name);
				           
           
                            if(record.data.config.xtype=='gmaps'){
					        	if (view.parent.parent.getComponent('titleLuoghi').query('button[name="omap"]')[0]!=null){
					        		view.parent.parent.getComponent('titleLuoghi').query('button[name="omap"]')[0].show();
					        	}  
					        	else{
					        		view.parent.parent.getComponent('titleLuoghi').add(
					        			{
										align: 'right',
										xtype: 'button',
										name: 'omap',
										iconMask: true,
										iconCls: 'more',
										handler: function() {
											var me = view;
										
											var itemsAS = [];
											
											itemsAS.push(
												{
													text: F2013.map[F2013.lang].mypos,
													ui: 'confirm',
													handler: function() {
														var geo = Ext.create('Ext.util.Geolocation', {
															autoUpdate: false,
															listeners: {
																locationupdate: function(geo) {
																	var me = this;
																	if(me.positionMarker) {
																		me.positionMarker.setMap(null);
																	}
																	F2013.gMaps.setMapCenter({latitude: geo.getLatitude(), longitude: geo.getLongitude()});
																	var myLatlng = new google.maps.LatLng(geo.getLatitude(), geo.getLongitude());
																	
																	me.positionMarker = new google.maps.Marker({
																		position: myLatlng,
																		map: F2013.gMaps.getMap(),
																		title: F2013.map[F2013.lang].mypos,
																		icon: 'http://cdn1.iconfinder.com/data/icons/Aristocracy_WebDesignTuts/32/Marker.png'
																	});
																	
																	F2013.gMaps.getMap().setZoom(17);
																},
																locationerror: function(geo, bTimeout, bPermissionDenied, bLocationUnavailable, message) {
																	if(bTimeout){
																		alert('Timeout occurred.');
																	} else {
																		alert('Error occurred.');
																	}
																},
																scope: me
															}
														});
														
														geo.updateLocation();
														F2013.actionSheet.hide();
													}
												}
											);
											
											itemsAS.push(
												{
													text: F2013.map[F2013.lang].center,
													ui: 'confirm',
													handler: function() {
														var me = this;
														
														F2013.gMaps.setMapCenter(F2013.centerPlaces);
														
														F2013.gMaps.getMap().setZoom(11);
														
														F2013.actionSheet.hide();
													},
													scope: me 
												}
											);
											
											for (var i = 0; i < F2013.places.length; i++) {
												itemsAS.push(
													{
														text: F2013.places[i].name[F2013.lang],
														latitude: F2013.places[i].latitude,
														longitude: F2013.places[i].longitude,
														scope: me,
														handler: function(btn){
															var me = this;
															F2013.actionSheet.hide();
															window.open("http://maps.google.com/maps?q=" + btn.initialConfig.latitude + "," + btn.initialConfig.longitude,"_blank");
														}
													}
												);
											}
						
											itemsAS.push(
												{
													text: F2013.map[F2013.lang].cancel,
													ui: 'decline',
													handler: function(){
														F2013.actionSheet.hide();
													}
												}
											);
						
											F2013.actionSheet = Ext.create('Ext.ActionSheet', {
												items: itemsAS
											});
						
											Ext.Viewport.add(F2013.actionSheet);
											F2013.actionSheet.show();
										},
										scope: me
									}
					        	   );
					        	}  
				            	
				            
				    		
				           }
		            	}
		            	else {
			    			Ext.Msg.alert('Alert', F2013['cerror_'+F2013.lang], Ext.emptyFn);;
			    			
			    		}
			            
			            
			           
			            
		            }
		            else {
		            	out = window.open(record.data.url,'_blank','toolbar=no,location=no,directories=no');
		            	out.focus();
		            }

	        }
	    }
	}
		
});

Ext.define('F2013.view.Tablet.Result', {
	extend: 'Ext.dataview.List',
	alias: 'widget.resulttablet',
	xtype: 'resulttablet',
	name: 'MyResult',
	
	reload: function(a){
		var lastload = window.localStorage.getItem('result-'+a.config.tag+'-'+F2013.lang+'-time'); 
	    var time = new Date().getTime();
	    
		if((lastload == null || time-lastload>F2013.timecache) && ( navigator.connection.type != Connection.NONE && navigator.connection.type != 'unknown' ) ){
			a.getStore().getProxy().setExtraParam('tag', a.config.tag);
			a.getStore().config.proxy.extraParams.tag = a.config.tag;
			a.getStore().getProxy().setExtraParam('lang', F2013.lang);
			a.getStore().config.proxy.extraParams.lang = F2013.lang;
			a.getStore().load();
	    }
	    else {
	    	if(Ext.decode(window.localStorage.getItem('result-'+a.config.tag+'-'+F2013.lang))!=null){
	    		a.getStore().add(Ext.decode(window.localStorage.getItem('result-'+a.config.tag+'-'+F2013.lang)))
	    	}
	    }
	},
    
	constructor: function(config) {
		//alert(config.title);
		var me = this;
        config = config || {};
        me.initialConfig = config;
       
        if(navigator.connection.type != 'none' && navigator.connection.type != 'unknown' ){
           Ext.apply(config, {
                     itemTpl: '<div><div style="float:left; width:80px;  overflow:hidden; text-align:center;"><img  width:80px; src="<tpl if="IMAGE.substring(0,4) != \'http\'">http://www.fiemme2013.com</tpl>{IMAGE}"></div><div style="margin-left:100px;"><span style="color:#000; font-size:0.8em; font-weight:bold">{REAL_DATE_F} </span><br><span style="color:#005697; font-size:0.8em; font-weight:bold">{LABEL1}</span></div></div><div style="clear:both"></div>',
                     
                     });
           }
           else{
           Ext.apply(config, {
                     itemTpl: '<div><div style="float:left; width:80px; height:80px; overflow:hidden; text-align:center;"><img src="<tpl if="TAG== \'\'">img/icons_info/F.png</tpl><tpl if="TAG!= \'\'">img/{TAG}.png</tpl>"></div><div style="margin-left:100px;"><span style="color:#000; font-size:0.8em; font-weight:bold">{REAL_DATE_F} </span><br><span style="color:#005697; font-size:0.8em; font-weight:bold">{LABEL1}</span></div></div><div style="clear:both"></div>',
                     
                     });
           
           }
        
        me.callParent([config]);
	},
	
	config: {
		store : {xtype:'storeresult'},
		/*plugins: [
			{
				xclass: 'Ext.plugin.PullRefresh',
				pullRefreshText: 'Pull down for more new events!'
			}
		],*/
		
       
		listeners: {
			
			initialize: function (a,b){
				 if(a.config.load){
					var lastload = window.localStorage.getItem('result-'+a.config.tag+'-'+F2013.lang+'-time'); 
					var time = new Date().getTime();
					   
			    
				    if((lastload == null || time-lastload>F2013.timecache) && ( navigator.connection.type != Connection.NONE && navigator.connection.type != 'unknown' ) ){
						a.getStore().getProxy().setExtraParam('tag', a.config.tag);
						a.getStore().config.proxy.extraParams.tag = a.config.tag;
						a.getStore().getProxy().setExtraParam('lang', F2013.lang);
						a.getStore().config.proxy.extraParams.lang = F2013.lang;
						a.getStore().load();
				    }
				    else {
				    	if(Ext.decode(window.localStorage.getItem('result-'+a.config.tag+'-'+F2013.lang))!=null){
				    		a.getStore().add(Ext.decode(window.localStorage.getItem('result-'+a.config.tag+'-'+F2013.lang)));
				    	}
				    }
			    }
				
			},
			
			
            itemtap: function(view, index, target, record) {
               
					if(navigator.connection.type != 'none' && navigator.connection.type != 'unknown' ) {
						Ext.data.JsonP.request({
							callbackKey: 'jsoncallback',
							url: 'http://apps.fiemme2013.com/v4web/html',
							params: {
								RefOwner: 'E68D031A3E2E40E592838C5E5180ECCB',
                                UUID: record.get('UUID'),
                                system: device.platform+ '_' +device.model + '_' + device.version

							},
							success: function(response){
                                               myhtml = Ext.String.format('<div id="detailtablet">{0}</div>', response);
                                               
                                               var rpanel = Ext.Viewport.getActiveItem().getComponent('rightpanel');
                                               
                                               var rp = {
                                               xtype: 'detailpaneltablet',
                                               style:{
                                               'background':'transparent'
                                               }
                                               };
                                               Ext.Viewport.getActiveItem().getComponent('rightpanel').setActiveItem(0);
                                               Ext.Viewport.getActiveItem().getComponent('rightpanel').removeAt(1);
                                               Ext.Viewport.getActiveItem().getComponent('rightpanel').add(rp);
                                               Ext.Viewport.getActiveItem().getComponent('rightpanel').setActiveItem(1)
                                               Ext.Viewport.getActiveItem().getComponent('rightpanel').getActiveItem().setHtml(myhtml);

							},
							scope: this
						});
					}
					else {
						Ext.Msg.alert('Alert', F2013['cerror_'+F2013.lang], Ext.emptyFn);;
					}
                
            }
		}
    }
     
});

Ext.define('F2013.view.Tablet.GenericContainer', {
	extend: 'Ext.Panel',
	alias: 'widget.genericcontainertablet',
	xtype: 'genericcontainertablet',
	
	constructor: function (config){
		var me = this;
       config = config || {};
       me.initialConfig = config;
       Ext.Viewport.setMasked(false); 
		Ext.apply(config, {
			layout: {
	            type: 'fit'
	        },

		    items: [{
		    	xtype: 'container',
		    	itemId: 'container' + config.name,
		    	layout: {
             		animation: {
                     	type: 'slide',
                     	direction: 'left'
                 	},
                 	type: 'card'
             	},
             	iconCls: 'f_news',
             	iconMask: true,
             	title: 'News',
        	 	items: [config.myitem],
        	 	scope:me
             	
			},
			{
				xtype: 'titlebar',
			    itemId: 'title' + config.name,
				
			    ui : config.tag,
				docked: 'top',
				title: config.title,
				items: [{
					xtype: 'button',
					 icon: 'img/Ico-BACK_black.png',
					 ui: 'f2013',
			         handler: function() {
			        	 var me = this;
			        	 var tabp = me.getComponent('container' + config.name);
			        	 var taba = tabp;
			        	 Ext.Viewport.setMasked(false);
						   if (taba.getActiveItem().xtype == "Photogallery" && (taba.getActiveItem().getInnerItems()[0].id  !=  taba.getActiveItem().getActiveItem().id)){
							   
							   taba.getActiveItem().getDetailCard().removeAll();
							   var tb = taba.getActiveItem();
							   var anim = taba.getActiveItem().getLayout().getAnimation();
							   anim.setReverse(true);
							   if(taba.getActiveItem().getInnerItems()[0].xtype  ==  taba.getActiveItem().getActiveItem().xtype)	 {
								   taba.getActiveItem().setActiveItem(0);
							   } 
							   else{
								   taba.getActiveItem().setActiveItem(1);
							   }
							   anim.setReverse(false);
							   
				    	   }
				    	   else{
				    		   if(taba.getActiveItem() == taba.getInnerItems()[0]){
								   var animation = me.parent.getLayout().getAnimation();
								   animation.setReverse(true);
								   me.parent.removeAt(1)
								   me.parent.setActiveItem(0);
								   animation.setReverse(false);;
                                    F2013.lock = true;
                        //tabp.setActiveItem(0);
                                    if (Ext.os.is.Tablet){
                                        Ext.Viewport.getActiveItem().getComponent('rightpanel').setActiveItem(0);
                                        Ext.Viewport.getActiveItem().getComponent('rightpanel').removeAt(1)
                        
                                    }
							   }
							   else {
								   var animation = taba.getLayout().getAnimation();
								   animation.setReverse(true);
								   taba.setActiveItem(0);
								   animation.setReverse(false);
							   } 
						   }
			        		   
						},
						scope:me
					  },
					  {
				    	 xtype: 'container',
				    	 style:{
				    	 	"padding-top": "11%",
				    	 	"padding-right": "2%" 
				    	 },
				    	 html: '<img src="img/'+config.tag+'.png" whidt="80%" height="80%">',
				    	 align:'right',
				    	 hidden: config.icohidden
				    }],scope:me
					     
		          }
		       ],
		       scope:me
		});	
			
		me.callParent([config]);
	}

});


Ext.define('F2013.view.Tablet.News', {
	extend: 'Ext.dataview.List',
	alias: 'widget.Newstablet',
	xtype: 'Newstablet',
	name: 'MyNews',
	 
	reload: function(a){
		var lastload = window.localStorage.getItem('news-'+a.config.tag+'-'+F2013.lang+'-time'); 
	    var time = new Date().getTime();
	    
		if((lastload == null || time-lastload>F2013.timecache) && ( navigator.connection.type != Connection.NONE && navigator.connection.type != 'unknown' ) ){
			a.getStore().getProxy().setExtraParam('tag', a.config.tag);
			a.getStore().config.proxy.extraParams.tag = a.config.tag;
			a.getStore().getProxy().setExtraParam('lang', F2013.lang);
			a.getStore().config.proxy.extraParams.lang = F2013.lang;
			a.getStore().load();
	    }
	    else {
	    	if(Ext.decode(window.localStorage.getItem('news-'+a.config.tag+'-'+F2013.lang))==null){
	    		
	    	}
	    	else{
	    		a.getStore().add(Ext.decode(window.localStorage.getItem('news-'+a.config.tag+'-'+F2013.lang)))
	    	}
	    }
	},
    
	constructor: function(config) {
		//alert(config.title);
		var me = this;
        config = config || {};
        me.initialConfig = config;
       
        
        if(navigator.connection.type != 'none' && navigator.connection.type != 'unknown' ){
            
	        Ext.apply(config, {
	        	itemTpl: '<div><div style="float:left; width:80px;  overflow:hidden; text-align:center;"><img width=80px src="<tpl if="IMAGE.substring(0,4) != \'http\'">http://www.fiemme2013.com</tpl>{IMAGE}"></div><div style="margin-left:100px;"><span style="color:#000; font-size:0.8em; font-weight:bold">{REAL_DATE_F} </span><br><span style="color:#005697; font-size:0.8em; font-weight:bold">{LABEL1}</span></div></div><div style="clear:both"></div>',
	    			
			});	
        }
        else{
        	Ext.apply(config, {
	        	itemTpl: '<div><div style="float:left; width:70px; height:70px; overflow:hidden; text-align:center;"><img src="<tpl if="TAG== \'\'">img/icons_info/F.png</tpl><tpl if="TAG!= \'\'">img/{TAG}.png</tpl>"> </div><div style="margin-left:100px;"><span style="color:#000; font-size:0.8em; font-weight:bold">{REAL_DATE_F}</span><br><span style="color:#005697; font-size:0.8em; font-weight:bold">{LABEL1}</span></div></div><div style="clear:both"></div>'
	    			
			});
        }
        
        
        
        me.callParent([config]);
	},
	
    
	config: {
		store : {xtype:'storenews'},
		/*plugins: [
			{
				xclass: 'Ext.plugin.PullRefresh',
				pullRefreshText: 'Pull down for more new events!'
			}]
		,*/
		
       
		listeners: {
			
			initialize: function (a,b){
				
				var lastload = window.localStorage.getItem('news-'+a.config.tag+'-'+F2013.lang+'-time'); 
			    var time = new Date().getTime();
			    var t = F2013.timecache;
			   
			   
			    if ((lastload == null || (time-lastload)>F2013.timecache) && ( navigator.connection.type != Connection.NONE && navigator.connection.type != 'unknown' )){
			    	a.getStore().getProxy().setExtraParam('tag', a.config.tag);
					a.getStore().getProxy().setExtraParam('lang', F2013.lang);
					a.getStore().config.proxy.extraParams.tag = a.config.tag;
					a.getStore().config.proxy.extraParams.lang = F2013.lang;
					a.getStore().load();
			    }
			    else {
			    	if(Ext.decode(window.localStorage.getItem('news-'+a.config.tag+'-'+F2013.lang))!=null){
			    		var wc = Ext.decode(window.localStorage.getItem('news-'+a.config.tag+'-'+F2013.lang));
			    		a.getStore().add(wc);
						    	
			    	}
			    }
			},
			
			
            itemtap: function(view, index, target, record) {
                	//var me = view;
					if(navigator.connection.type != 'none' && navigator.connection.type != 'unknown' ) {
						Ext.data.JsonP.request({
							callbackKey: 'jsoncallback',
                            url: 'http://apps.fiemme2013.com/v4web/html',
                            params: {
								RefOwner: '72DF9D84F4194F3CBB4993433B7A3E40',
                                UUID: record.get('UUID'),
                                system: device.platform+ '_' +device.model + '_' + device.version

							},
							success: function(response){
                                               myhtml = Ext.String.format('<div id="detailtablet">{0}</div>', response);
                                               
                                               var rpanel = Ext.Viewport.getActiveItem().getComponent('rightpanel');
                                               
                                               var rp = {
                                               xtype: 'detailpaneltablet',
                                               style:{
                                               'background':'transparent'
                                               }
                                               };
                                               Ext.Viewport.getActiveItem().getComponent('rightpanel').setActiveItem(0);
                                               Ext.Viewport.getActiveItem().getComponent('rightpanel').removeAt(1);
                                               Ext.Viewport.getActiveItem().getComponent('rightpanel').add(rp);
                                               Ext.Viewport.getActiveItem().getComponent('rightpanel').setActiveItem(1)
                                               Ext.Viewport.getActiveItem().getComponent('rightpanel').getActiveItem().setHtml(myhtml);

							},
							scope: this
						});
					}
					else {
						Ext.Msg.alert('Alert', F2013['cerror_'+F2013.lang], Ext.emptyFn);;
						
					}
               
            }
		}
    }
     
});

Ext.define('F2013.view.Tablet.Meteo', {
	extend: 'Ext.dataview.List',
	alias: 'widget.meteotablet',
	xtype: 'meteotablet',
	name: 'MyMeteo',
	
	
	constructor: function (config){
		var me = this;
        config = config || {};
        me.initialConfig = config;
		
		Ext.apply(config, {
			itemTpl : '<table width="95%" style="padding:10px; font-size:1.5em;"><tr><td colspan=2 width="45%" align="center"><img width="42%" src="img/icons_meteo/{icona}"></td><td  width="55%"colspan=2 valign="middle"><h2>{data}</h2></td></tr><tr style="height: 2em;"><td width="25%">T.min</td><td width="25%">T.max</td><td width="28%">Prec.</td><td width="28%">Vento</td></tr><tr style="height: 2.2em; font-size:1em;"><td  width="25%">{temperaturaminima}&deg;C</td><td  width="25%">{temperaturamassima}&deg;C</td><td  width="28%">{probprec}</td><td  width="28%">{ventovel}</td></tr></table>'
				
		});	
			
		me.callParent([config]);
	},
	
	config: {
		store : {xtype:'storemeteo'},
		
		
		listeners: {
			initialize: function (a,b){
				a.getStore().getProxy().setExtraParam('lang', F2013.lang);
				a.getStore().config.proxy.extraParams.lang = F2013.lang;
				
			}
		}
		
		
	}
	
	
	
});

Ext.define('F2013.view.Tablet.Photogallery', {
	extend: 'Ext.dataview.NestedList',
	alias: 'widget.Photogallerytablet',
	xtype: 'Photogallerytablet',
	
	reload : function(a){
		
	},
	
	constructor: function(config) {
		var me = this;
        config = config || {};
        me.initialConfig = config;
        Ext.Viewport.setMasked(false); 
		var data = {
			text: 'PhotoGallery',
			leaf: false
		 };	
		
		Ext.define('ListItem', {
			 extend: 'Ext.data.Model',
			 config: {
				 fields: [{
					 ABSTRACT: 'text',
					 LABEL1: 'string',
					 IMAGE: 'string'
				 }]
			 }
		 });

		 var store = Ext.create('Ext.data.TreeStore', {
			 //defaultRootProperty: 'items',
			 nodeParam: 'OID',
			 fields: [
					'ABSTRACT',
					'ID',
					'ID_REF',
					'KEYWORDS',
					'LABEL1',
					'LANG',
					'LASTMOD',
					'LINK',
					'METATYPE',
					'NAME',
					'SEQ',
					'SSIZE',
					'UUID',
					'IMAGE',
					'children',
					{
						name: 'leaf',
						defaultValue: true
					}
				],
			 proxy: {
					type: 'jsonp',
					callbackKey: 'jsoncallback',
					extraParams: {
						RefOwner: '72DF9D84F4194F3CBB4993433B7A3E40',
						lang: F2013.lang,
                        tag: config.tag,
                        format: 'json',
                        system: device.platform+ '_' +device.model + '_' + device.version

					},
					url: Ext.String.format('http://apps.fiemme2013.com/v4media/collections'),
					reader: {
						type: 'json',
						idProperty: 'ID'
					}
				},
			 root: data,
			 listeners: {
				load: function(store, record, successful, operation, eOpts) {
					var d = new Date().getTime();
					window.localStorage.setItem('Photo-'+ store.config.proxy.extraParams.lang +'-time',d);
					window.localStorage.setItem('Photo-'+ store.config.proxy.extraParams.lang, Ext.encode(operation['_response']));
				}
			}
		});
				
		Ext.apply(config, {
			store: store,
			displayField : 'LABEL1',
			toolbar: {
				items: [
					{	
						align: 'left',
						icon: 'img/Ico-BACK_black.png',
						ui: 'f2013',
						itemId: 'backbutton',
						name: 'back',
						handler: function() {
							Ext.Viewport.setMasked(false);
							me.parent.setActiveItem(Home);
						}
					},{
				    	 xtype: 'container',
				    	 style:{
				    	 	"padding-top": "11%",
				    	 	"padding-right": "2%" 
				    	 },
				    	 html: '<img src="img/'+config.tag+'.png" whidt="80%" height="80%">',
				    	 align:'right'
				    }],
                    ui: config.tag,
                    hidden: config.myhidden
			},
			
			listeners: {
				
				initialize: function( ns, e ) {
					 //itemId: 'titleSpeciality'
					me.getToolbar( ).setTitle(F2013.languages[F2013.lang]['home'+config.tag+'Label']);
					
				},
				
				activeitemchange: function(card, newActiveItem, oldActiveItem) {
					var me = this;
					var index = 0;
					//me.getComponent('infoItem').xtype;
					//ns.getToolbar( ).getItems( )[0].hide();
					//var index = me.getActiveIndex(newActiveItem);
					if (index > 1) {
						me.getToolbar( ).query('button[name="back"]')[0].show();
					}
					else {
						me.getToolbar( ).query('button[name="back"]')[0].hide();
					}
				},
				
				
				leafitemtap: function(nestedList, list, index, element, record) {
					var me = this;
                    Ext.Viewport.getActiveItem().setMasked({
                        xtype: 'loadmask',
                        message: 'Please wait'
                    });
					Ext.data.JsonP.request({
						callbackKey: 'jsoncallback',
						url: 'http://apps.fiemme2013.com/v4media/albumphotos',
						params: {
							RefOwner: '72DF9D84F4194F3CBB4993433B7A3E40',
							lang: F2013.lang,
                            tag: config.tag,
							OID: record.get('ID'),
                            order:'seq',
                            system: device.platform+ '_' +device.model + '_' + device.version

						},
						success: function(response){
							//me.getToolbar( ).query('button[ui="back"]')[0].setText('');
							var me = this;
							me.getToolbar( ).query('button[name="back"]')[0].setText('');
							var rs = Ext.decode(response.responseText);
                            Ext.Viewport.getActiveItem().setMasked({
								    xtype: 'loadmask',
								    message: 'Please wait'
                                                                   });
                            var cr = {
                                xtype: 'carousel',
                                itemId: 'tbcarusel',
                                autoDestroy: true,
                                indicator: false,
                                           style:{
                                                'background-color':'transparent'
                                           }
                                           
                                           };
                            Ext.Viewport.getActiveItem().getComponent('rightpanel').setActiveItem(0);
                            Ext.Viewport.getActiveItem().getComponent('rightpanel').removeAt(1);
                            Ext.Viewport.getActiveItem().getComponent('rightpanel').add(cr);
                            Ext.Viewport.getActiveItem().getComponent('rightpanel').setActiveItem(1)
                                           
                            //alert(Ext.Viewport.getActiveItem().getComponent('rightpanel').getActiveItem().getSize().width);
							for (var i=0; i<response.length; i++) {
								var r = response[i];
								//console.log(JSON.encode(r));
                                var mimg = 1;//
                                var conf = r['CONF']['Vortex4'];
                                var wi = conf['width'];
                                var hi = conf['height'];
                                var rp = wi/hi
                                var rp2 = window.innerWidth/window.innerHeight
                                this.altezza_1 = (window.innerHeight-100)*0.67;
                                console.log('DIM '+ wi + ' - ' + hi)
                                console.log('DIM2 '+ window.innerWidth + ' - ' + window.innerHeight)
                                console.log('RP '+ rp + ' - ' + rp2)
                                me.wt = window.innerWidth;
                                //me.getDetailCard().width
                                if (wi>hi){
                                    
                                    me.wt = window.innerWidth;
                                    me.wt = window.innerWidth*0.6;
                                    me.ht = me.wt/rp;
                                    me.wt = me.wt-1;
                                           if(me.ht>this.altezza_1){
                                             me.ht = this.altezza_1
                                             me.wt = me.ht*rp
                                           }
                                }
                                else {
                                    me.wt =  (this.altezza_1-38)*rp;
                                }
                                
								
								Ext.Viewport.getActiveItem().getComponent('rightpanel').getActiveItem().add({
									xtype:'panel',
									layout: {
							            type: 'vbox'
							        },
                                    items:[
                                        {
                                           xtype:'panel',
                                           height: this.altezza_1,
                                           items:[                        
                                                  {
                                                  xtype: 'image',
                                                  cls: 'my-carousel-item-img',
                                                  centered: true,
                                                  width: me.wt,
                                                  height: me.ht,
                                                  style:{
                                                    'box-shadow': '5px 5px 20px #333' 
                                                  },
                                                  src: Ext.String.format('http://storage.fiemme2013.com/x00001/public/72DF9D84F4194F3CBB4993433B7A3E40/Vortex4/{0}.jpg',r['UUID'])
                                                  }
                                            ]
                                           }
                                      ,{
									    xtype: 'label',
									    //height: '4em',
									    flex:4,
									    style: {
									    	"padding-top": '0.5em',
                                            "padding-left": '0.15em',
                                            "padding-right": '0.15em',
									    	"text-align": 'center',
                                            "font-size":'1.1em',
									    	"font-family": 'Eurostile'
									    },
									    html: Ext.String.format('<div><span>{0} - {1}/{2}</spam></div>',r['LABEL1'],i+1,response.length)
									}]
								});
                                //alert('ciao2');
								
							}
                           
                            //Ext.Viewport.getActiveItem().getComponent('rightpanel').setActiveItem(1)
							Ext.Viewport.getActiveItem().setMasked(false);
							//me.getDetailCard().setActiveItem(0);
						},
                        faliure: function(response){
                            Ext.Viewport.getActiveItem().setMasked(false);
                        },
						scope: me
					});
				}
				
			},
			
            getItemTextTpl: function(node) {
                return '<div style="font-size:0.8em; font-family:Eurostile;  vertical-align:middle;"><div style="float:left; width:80px; height:60px; overflow:hidden;  vertical-align:middle; "><img height="60px" src="<tpl if="values.IMAGE == \'\'">http://www.fiemme2013.com/immagini/news_logo.jpg</tpl><tpl if="values.IMAGE != \'\'">{IMAGE}</tpl>"></div><div style="margin-left:90px; "><div style="float:left; width:160px; vertical-align:middle;"><span>{LABEL1}</span></div><div style="margin-left:170px; vertical-align:middle;"><img style=" vertical-align:middle;"  height="30em" src="img/Ico-BACK_forward.png"></div></div></div><div style="clear:both"></div>'
            }        
		});
		
		me.callParent([config]);
	}

});

Ext.define('F2013.view.Tablet.Info', {
	extend: 'Ext.dataview.List',
    xtype: 'viewinfotablet',
    
	constructor: function (config){
		var me = this;
        config = config || {};
        me.initialConfig = config;
		
		Ext.apply(config, {
			itemTpl : Ext.String.format('<div style="font-size:0.6em;"><div style="float:left; width:80; text-align:center; "><img  src="{image}" height="60em"></div><div style="margin-left:80px;"><span style="font-size:1.5em; font-family:Eurostile;">{name}</span><br><br>{description}<br></div></div><div style="clear:both"></div>')
		});	
		
		me.callParent([config]);
	},
	
	config: {
		store : {xtype:'storeinfo'},
		
		
		listeners: {
			initialize: function (a,b){
				a.getStore().getProxy().setUrl(F2013.lang+'/infoTablet.json');
				a.getStore().config.proxy.url = F2013.lang+'/infoTablet.json';
				//console.log('LOAD -'+ F2013.lang+'/infoTa.js');
				a.getStore().load();
				//console.log('meteo 2');
			},
			
			itemtap: function(view, index, target, record) {
	            
	            if(!record.data.site){
	            	
	            	
	            	if((!record.data.connecction) || (navigator.network.connection.type != Connection.NONE && navigator.network.connection.type != 'unknown' )) {
	            		console.log(record.data.config.xtype);
	            		if(record.data.config.xtype == 'panel'){
	            			view.parent.parent.getComponent('titleviewinfo').setHidden(true);
	            		}
                        Ext.Viewport.getActiveItem().getComponent('rightpanel').setActiveItem(0);
                        Ext.Viewport.getActiveItem().getComponent('rightpanel').removeAt(1);
                        Ext.Viewport.getActiveItem().getComponent('rightpanel').add(record.data.config);
                        Ext.Viewport.getActiveItem().getComponent('rightpanel').setActiveItem(1)
			            view.parent.parent.getComponent('titleviewinfo').setTitle(record.data.name);
	            	}
	            	else{
	            		Ext.Msg.alert('Alert', F2013['cerror_'+F2013.lang], Ext.emptyFn);;
	            	}
	            }
	            else {
	            	out = window.open(record.data.url,'_blank');
	            	out.focus();
	            }
	        }
		}
    }
	
});


Ext.define('F2013.view.Tablet.SpecialityContainer', {
	extend: 'Ext.Panel',
	alias: 'widget.specialitycontainertablet',
	xtype: 'specialitycontainertablet',
	
	constructor: function (config){
		var me = this;
       config = config || {};
       me.initialConfig = config;
       Ext.Viewport.setMasked(false); 
		
		Ext.apply(config, {
			layout: {
	            type: 'fit'
	        },

		    items: [ {
					     xtype: 'tabpanel',
					     itemId: 'tabSpeciality',
					     ui: config.tag,
					     activItem: 0,
					     listeners: {
						     activeitemchange: function(item,value, oldValue, e) {
						    	/* if (value.getInnerItems()[0].xtype!='Photogallery') {
					    			   console.log('Remove '+ oldValue.getInnerItems()[0].xtype)
					    			   
					    		   } */
						    	  if(value.getInnerItems()[0].xtype=='Photogallerytablet' &&  (navigator.connection.type == Connection.NONE && navigator.connection.type != 'unknown' ) ) {
						    			  Ext.Msg.alert('Alert', F2013['cerror_'+F2013.lang], Ext.emptyFn);;
						    			  oldValue.getInnerItems()[0].getStore().removeAll(); 
						    			  oldValue.parent.setActiveItem(oldValue);
						    			  console.log(oldvalue.getInnerItems()[0].xtype);
						    		  }
							    	 else if( oldValue.getInnerItems()[0].xtype!='Photogallerytablet'){
							    		 //console.log('Arrivo prima qui')
							    		 oldValue.getInnerItems()[0].getStore().removeAll(); 
							    		 
							    	 }
							    			
							    	 value.getInnerItems()[0].reload(value.getInnerItems()[0]);
					    			 if(oldValue.xtype == 'container'){
						        		  oldValue.setActiveItem(0);
						        		   
						        		  try{
						        			  oldValue.getActiveItem().deselectAll(true);
						        		  }
						        		  catch(err)
						        		  {
						        		   
						        		  }
							        	   
						        	   }
						    	
				    			   
					        	   
					    	 },
					    	 
					    	 deactivate: function( tab,  newActiveItem,  oldActiveItem, eOpts ){
					    		 console.log('Active');
					    	 }
					     },
					     items:[{
					    	 xtype: 'container',
				        	 layout: {
			             		animation: {
			                     	type: 'slide',
			                     	direction: 'left'
			                 	},
			                 	type: 'card'
			             	},
			             	iconCls: 'f_news',
			             	iconMask: true,
			             	title: 'News',
			        	 	items: [
							 	{
								  	xtype: 'Newstablet',
								  	color: '#0b4f8a',
								  	tag: config.tag,
								  	lang: 'EN',
								  	load:true
							 
							 	},
								{
									xtype: 'detailpanel',
                                    style:{
                                        'background':'transparent'
                                    }
								}
							]	        	 	
				         },
				         {
					    	 xtype: 'container',
				        	 layout: {
			             		animation: {
			                     	type: 'slide',
			                     	direction: 'left'
			                 	},
			                 	type: 'card'
			             	},
			             	iconCls: 'calendar2',
			             	iconMask: true,
			             	title: F2013.languages[F2013.lang].specialityCalendarLabel,
			        	 	items: [
							 	{
								  	xtype: 'calendartablet',
								  	//color: '#0b4f8a',
								  	tag: config.tag,
								  	load: false
							 
							 	},
								{
									xtype: 'detailpanel',
                                    style:{
                                        'background':'transparent'
                                    }
								}
							]	        	 	
				         },
				         {
					    	 xtype: 'container',
				        	 layout: {
			             		animation: {
			                     	type: 'slide',
			                     	direction: 'left'
			                 	},
			                 	type: 'card'
			             	},
			             	iconCls: 'f_res',
			             	hidden: config.tag == 'EventiCollaterali',
			             	iconMask: true,
			             	title: F2013.languages[F2013.lang].specialityResultLabel,
			        	 	items: [
							 	{
								  	xtype: 'resulttablet',
								  	//color: '#0b4f8a',
								  	tag: config.tag,
								  	load: false
							 
							 	},
								{
									xtype: 'detailpanel',
                                    style:{
                                        'background':'transparent'
                                    }
								}
							]	        	 	
				         },
                                
				         {
					    	 xtype: 'container',
				        	 layout: {
			             		animation: {
			                     	type: 'slide',
			                     	direction: 'left'
			                 	},
			                 	type: 'card'
			             	},
			             	iconCls: 'f_photo',
			             	iconMask: true,
			             	title: F2013.languages[F2013.lang].specialityPhotogalleryLabel,
			        	 	items: [
							 	{
								  	xtype: 'Photogallerytablet',
								  	tag: config.tag,
								  	backButton: {
								  		icon: 'img/Ico-BACK_black.png',
										ui: 'f2013',
										text: ''
								    },
								    backText: '',
								    updateTitleText: false,
								    usetitleAsBackText: false,
								    myhidden: true
							 	},
								{
									xtype: 'detailpanel',
                                    style:{
                                        'background':'transparent'
                                    }
								}
							]	        	 	
				         }
					     	/*,{
					     		xtype: 'info',
					     		title: 'Info',
					     		iconCls : 'info'
					     		
					     	}*/
					     	
					     ],
					     tabBar: {
					         docked: 'bottom',
					         ui: config.tag,
					         layout: {
					            type: 'hbox'
					         }
					        
					     
					     },
				         scope:me
					 },
					 {
					    xtype: 'titlebar',
					    itemId: 'titleSpeciality',
						
					    ui : config.tag,
						docked: 'top',
						title: F2013.languages[F2013.lang]['home'+config.tag+'Label'],
						items: [{
							
							 xtype: 'button',
							 icon: 'img/Ico-BACK_black.png',
							 ui: 'f2013',
					         handler: function() {
					        	   Ext.Viewport.setMasked(false);
					        	   var me = this;
					        	   var tabp = me.getComponent('tabSpeciality');
					        	   var taba = tabp.getActiveItem();
					        	   if(taba.getActiveItem().xtype == "PhotogalleryInternal" ){
					        		   ida = taba.getActiveItem().getActiveItem().id
					        		   idinner = taba.getActiveItem().getInnerItems()[0].id 
					        	   }
					        	   else {
					        		   ida = null
					        		   idinner = null
					        	   }
					        	   if (taba.getActiveItem().xtype == "PhotogalleryInternal" && (ida  !=  idinner)){
					        		   //taba.getActiveItem().fireEvent('back', this);
					        		   taba.getActiveItem().getDetailCard().removeAll();
									   
					        		   var tb = taba.getActiveItem();
					        		   var anim = taba.getActiveItem().getLayout().getAnimation();
					        		   anim.setReverse(true);
					        		   if(taba.getActiveItem().getInnerItems()[0].xtype  ==  taba.getActiveItem().getActiveItem().xtype)	 {
							        	   taba.getActiveItem().setActiveItem(0);
							           } 
							           else{
							        	   taba.getActiveItem().setActiveItem(0);
							           }
					        		   anim.setReverse(false);
					        		   //
						        	   	
					        	   
					        	    
						        	  
					        	   }
					        	   else{
					        		   //tabp.setActiveItem(1);
						        	   if(taba.getActiveItem() == taba.getInnerItems()[0]){
						        		   var animation = me.parent.getLayout().getAnimation();
										   animation.setReverse(true);
										   for(i=me.parent.getInnerItems().length;i>1;i--){
											   me.parent.removeAt(i-1)
										   }
						        		   me.parent.setActiveItem(0);
						        		   animation.setReverse(false);
						        		   F2013.lock = true;
                                            Ext.Viewport.getActiveItem().getComponent('rightpanel').setActiveItem(0);
                                            Ext.Viewport.getActiveItem().getComponent('rightpanel').removeAt(1)
						        		   //tabp.setActiveItem(0);
						        	   }
						        	   else {
						        		  var animation = taba.getLayout().getAnimation();
										   animation.setReverse(true);
						        		   taba.setActiveItem(0);
						        		   animation.setReverse(false);
							        	   
						        	   } 
					        	   }
					        		   
								},scope:me
					     },
                                {
                                xtype: 'container',
                                style:{
					    	 	"padding-top": (F2013.iosversion != 7) ?  "11%" : "7%",
					    	 	"padding-left": (F2013.iosversion != 7) ? "3%" : "40%"
                                
                                },
                                width: (F2013.iosversion != 7) ? '100%': '90%',
                                html: (F2013.iosversion != 7) ? '<img src="img/'+config.tag+'.png"  height="80%">' : '<img src="img/'+config.tag+'.png" width="100%" height="100%">',
                                align:'right'
                                }],scope:me
					     
			          }
		       ],
		       scope:me
		});	
			
		me.callParent([config]);
	}

});










	$( document ).bind( "mobileinit", function(){ $.mobile.page.prototype.options.degradeInputs.date = 'text'; });
        
        
	

	
      
    	
    var index_URLWebServiceMuseo = "http://www7.anyticket.it/STOLMuseoTest/";   //Fabio 30/01/2012
    
	/*function onBodyLoad()
	{		
		$.mobile.changePage("#pageHome");
        
	}*/	
	
	
	function richiamaPaginaServer(){
		var htmlString="<iframe style='height:350px; width:312px;' src='" + index_URLWebServiceMuseo +"AcquistaIngressi.aspx?IdEvento=52127&IdPartner=MNCC'></iframe>";
		$('#contenitore').html(htmlString).page();
		$.mobile.changePage("#pageContenitore");
	}
	
	function def(){
		
		//$.mobile.changePage( "index.html",{reloadPage:true});
		window.location.href = "../../index.html?type=info";
		//this.getComponent('iframeinfo').setHtml("");
		//Ext.getCmp('iframe').setHtml("");
	}
	
	
		
	
                            
    


        $("#buttonbt").click( function()
           {
             alert('button clicked');
           }
        );
    




















	$( document ).bind( "mobileinit", function(){ $.mobile.page.prototype.options.degradeInputs.date = 'text'; });
        
        
	

	
      
    	
    var index_URLWebServiceMuseo = "http://www7.anyticket.it/STOLMuseoTest/";   //Fabio 30/01/2012
    
	/*function onBodyLoad()
	{		
		$.mobile.changePage("#pageHome");
        
	}*/	
	
	
	function richiamaPaginaServer(){
		var htmlString="<iframe style='height:350px; width:312px;' src='" + index_URLWebServiceMuseo +"AcquistaIngressi.aspx?IdEvento=52127&IdPartner=MNCC'></iframe>";
		$('#contenitore').html(htmlString).page();
		$.mobile.changePage("#pageContenitore");
	}
	
	function def(){
		
		//$.mobile.changePage( "index.html",{reloadPage:true});
		window.location.href = "../../index.html?type=info";
		//this.getComponent('iframeinfo').setHtml("");
		//Ext.getCmp('iframe').setHtml("");
	}
	
	
		
	
                            
    


        $("#buttonbt").click( function()
           {
             alert('button clicked');
           }
        );
    










