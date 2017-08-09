


 
    
	document.addEventListener("deviceready", onDeviceReady, false);
	
     /*function apriFinestra() {
		var url = window.location.toString();
	    url.match(/\?(.+)$/);
	    var params = RegExp.$1;
	    // split up the query string and store in an
	    // associative array
	    var params = params.split("&");
	    var queryStringList = {};
	    	 
	    for(var i=0;i<params.length;i++)
    	{
    	    var tmp = params[i].split("=");
    	    queryStringList[tmp[0]] = unescape(tmp[1]);
    	}
	    try{
    		F2013.myhome = queryStringList['type']
	    }
	    catch(err)
	    {
	    	  //Handle errors here
	   	}

    	//console.log("LOAD"+ queryStringList['type']);
	        
	};*/
	
    function onDeviceReady() {
        console.log("We got device ready");
        navigator.splashscreen.hide();
        
    }
    
        

Ext.define('F2013.store.News', {
    extend: 'Ext.data.Store',
    xtype: 'storenews',
    name: 'MyStoreNews',
    
    config: {
    	pageSize: 25,
	    autoLoad: false,
		listeners: {
			load: function(store, record, successful, operation, eOpts) {
				var d = new Date().getTime();
				window.localStorage.setItem('MLFF-news-' + store.config.proxy.extraParams.tag + '-'+ store.config.proxy.extraParams.lang +'-time',d);
				window.localStorage.setItem('MLFF-news-' + store.config.proxy.extraParams.tag + '-'+ store.config.proxy.extraParams.lang, Ext.encode(operation['_response']));
			
			}
		},
	    model: 'F2013.model.News',
	   
		proxy: {
            type: 'jsonp',
			callbackKey: 'jsoncallback',
			extraParams: {
				tag: '',
				lang: 'IT',
				limit: 25
			},
			url: 'http://apps.marcialonga.it/v4web/taggedobjects?RefOwner=2515269149A94BAA8A3CEB39F8D038D7',
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
		listeners: {
			load: function(store, record, successful, operation, eOpts) {
				console.log('METEOSTORE ' + Ext.encode(operation['_response']))
				//var d = new Date().getTime();
				//window.localStorage.setItem('MLFF-news-' + store.config.proxy.extraParams.tag + '-'+ store.config.proxy.extraParams.lang +'-time',d);
				//window.localStorage.setItem('MLFF-news-' + store.config.proxy.extraParams.tag + '-'+ store.config.proxy.extraParams.lang, Ext.encode(operation['_response']));
			
			}
		},
	    proxy: {
			type: 'jsonp',
			callbackKey: 'jsoncallback',
			extraParams: {
				tag: '',
				lang: 'IT'
			},
			url: Ext.String.format('http://apps.marcialonga.it/v4web/meteo'),
			reader: {
				type: 'json'
			}
		}
    }
});


Ext.define('MLFF.store.Luoghi', {
    extend: 'Ext.data.Store',
    xtype: 'storestartlist',

    config: {
	   autoLoad: false,
	   listeners: {
			load: function(store, record, successful, operation, eOpts) {
				//var d = new Date().getTime();
				//window.localStorage.setItem('MLFF-news-' + store.config.proxy.extraParams.tag + '-'+ store.config.proxy.extraParams.lang +'-time',d);
				//window.localStorage.setItem('MLFF-news-' + store.config.proxy.extraParams.tag + '-'+ store.config.proxy.extraParams.lang, Ext.encode(operation['_response']));
				console.log('LOAD DATA ' + operation['_response'])
			}
		},
	   model: 'MLFF.model.StartList',
	   proxy : {
		  type : 'jsonp',
		  callbackKey: 'jsoncallback',
		  extraParams: {
			tag: '',
			race: ''
		  },
		  url:'',
		  reader : {
			  type : 'json'
		  }
		 }

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


Ext.define('MLFF.model.StartList', {
    extend: 'Ext.data.Model',
    config: {
        fields: [
			'name',
			'bib',
			'nation',
			'gender',
			'category',
			'born',
            'id'
		]
    }
});


Ext.define('F2013.view.HtmlToPanel', {
    extend: 'Ext.Panel',
    xtype: 'htmltopanel',
    name: 'MyHtmlToPanel',
    scrollable:true,
    /*style: {
        'background':'#ffffff',
        //'background-image': 'url(img/bg.jpg)',
        //'background-size': '100% 100%',
        //'background-repeat': 'no-repeat',
        //'background-position': 'bottom left'
    },*/
    
    // We are using Ext.Ajax, so we should require it
    requires: ['Ext.Ajax'],

   config: {
	   	
	   	scrollable: true,
    	//html:'<div style="color:#666; background-image:url(\'img/bg.jpg\'); background-size: 100%;background-repeat: no-repeat; height:100px;"></div>',
    	
        listeners: {
            activate: 'onActivate' 
        },
        
        
        // Create a new configuration called `url` so we can specify the URL
        url: null
    },
    

    onActivate: function(me, container) {
    	console.log('HTMLTOPAGE - rquest page ' + me.config.url)
        Ext.Ajax.request({
            // we should use the getter for our new `url` config
        	
            url: me.config.url,
            method: "GET",
            success: function(response, request) {
                // We should use the setter for the HTML config for this
            	if( me.config.myclass){
            		//console.log('MY CLASS HTP' + me.config.myclass)
            		me.setHtml('<div  id="' + me.config.myclass + '">' +response.responseText + '</div>');
            		//console.log('HTML##### '  + me.getHtml())
            	}
            	else{
            		me.setHtml(response.responseText);
            	}
                
            },
            failure: function(response, request) {
                //me.setHtml("failed -- response: " + response.responseText + "-"+me.config.url);
            }
        });
    }
});




Ext.define('MLFF.view.Home', {
	extend: 'Ext.Panel',
	name: 'MyHomeMLFF',
	xtype: 'home',
	
	
	//fullscreen: true,
	scroll: false,
	

	
	

	
	
	constructor: function(config) {
		 
		document.addEventListener("backbutton", onBackKeyDown, false);
        
        this.altezza_1 = window.innerWidth*0.59;
        this.altezza_2 = window.innerHeight-this.altezza_1;
        //console.log('larghezza screen ' + screen.width + ' - ' +screen.height)
        //console.log('altezza ' + this.altezza_1 + ' - ' +this.altezza_2)
        //console.log('altezza inner' + window.innerWidth + ' - ' +window.innerHeight)
        //console.log('detail: ' + device.name + ' - ' + device.cordova + ' - ' +device.platform + ' - ' +device.uuid + ' - ' +device.version + ' - ' + device.model) 
		function onBackKeyDown(e) {
			var me = this;
			if(Ext.Viewport.getActiveItem().getActiveItem().getActiveItem().name == 'MyHomeMLFF') {
				navigator.app.exitApp();
			}
			else{
				var animation = Ext.Viewport.getActiveItem().getActiveItem().getLayout().getAnimation();
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
				MLFF.lock = true;
				animation.setReverse(false);
				
			}
		};
		var me = this;
		
		Ext.Viewport.element.dom.addEventListener('click',function(e){
			console.log('#####CLICK TAG: '+ e.target.tagName)
			if (e.target.tagName !== 'A') {
                return;
            };
            console.log('PRE PREVENT')
           
            console.log('POST PREVENT')
            var href = e.target.getAttribute('href');
            console.log('PRE HREF ' + href)
            if (href.substring(0,3)=='jav'){
            	return;
            }
            if (href.substring(0,3)=='tel'){
            	return;
            }
            if (href.substring(0,3)=='mai'){
            	return;
            }
            console.log('#####HREF: '+ href)
            
            e.preventDefault();
            	//console.log('#####HREF: '+ href.substring(0,3))
            out = window.open(href,'_blank');
            out.focus();
            
        }, false);
		
		
		if(window.localStorage.getItem('MLFF_lingua') == undefined){
			me.lang = MLFF.lang = 'EN'
		    window.localStorage.setItem('MLFF_lingua', 'EN');
		}
		else {
			me.lang  = MLFF.lang = window.localStorage.getItem('MLFF_lingua');	
		}
		console.log('LANG START ' + MLFF.lang)
		
		config = config || {};
		me.initialConfig = config;
		if (MLFF.lang == 'EN'){
			this.opIT = 0;
			this.opEN = 0.6;
		}
		else {
			this.opIT = 0.6;
			this.opEN = 0;
		}
		
		
		
		Ext.apply(config, {
			padding: 4,

			listeners: {
				painted: function() {
					var me = this;
					MLFF.lock = true;
				}
			},
			items:[
				{
					xtype:'panel',
					itemId: 'myhome',
					layout:{
						type:'vbox'
					},
					style: {
				        'background':'#ffffff	',
				        'background-image': 'url(images/bg-top-home-flags.jpg)',
				        'background-size': '100%',
				        'background-repeat': 'no-repeat',
				        'background-position': 'top left'
				    },
				    items: [
				            {
				              xtype:'panel',
				              
				              height:this.altezza_1,
				              layout:{
					            	type:'vbox'
					            },
				              items :[
				                      {
				                    	  xtype:'panel',
				                    	  flex: 41.5
				            	  
				                      },
				                      {
				                    	  xtype:'panel',
				                    	  flex: 7,
				                    	  layout:{
								            	type:'hbox'
								          },
				                    	  items:[
				                    	        {
				                    	        	xtype:'panel',
				                    	        	flex: 14
					            	  
				                    	        },
				                    	        {
				                    	        	xtype:'button',
				                    	        	flex: 10,
				                    	        	style: {
				                				        'background':'#ffffff',
				                				        'opacity':this.opIT,
				                				        'border-width': 0
				                    	        	},
				                    	        	handler:function (){
				                    	        		console.log(MLFF.lang);
				                    	        		
				                    	        		if(MLFF.lang == 'EN'){
				                    	        			Ext.Viewport.setMasked({
				                							    xtype: 'loadmask',
				                							    message: 'Loading'
				                							});
				                    	        			MLFF.lang == 'IT';
				                    	        			window.localStorage.setItem('MLFF_lingua', 'IT');
				                    	        			window.location.href = "index.html";
				                    	        			}
				                    	        	}
					            	  
				                    	        },
				                    	        {
				                    	        	xtype:'panel',
				                    	        	flex: 14
					            	  
				                    	        },
				                    	        {
				                    	        	xtype:'button',
				                    	        	itemId :'flagEN',
				                    	        	flex: 11,
				                    	        	style: {
				                				        'background':'#ffffff',
				                				        'opacity':this.opEN,
				                				        'border-width': 0
				                    	        	},
				                    	        	handler:function (){
				                    	        		console.log('click lang! ' + MLFF.lang)
				                    	        		if(MLFF.lang == 'IT'){
				                    	        			Ext.Viewport.setMasked({
				                							    xtype: 'loadmask',
				                							    message: 'Loading'
				                							});
				                    	        			MLFF.lang == 'EN';
				                    	        			window.localStorage.setItem('MLFF_lingua', 'EN');
				                    	        			window.location.href = "index.html";
				                    	        			//console.log(me.xtype)
				                    	        		}
				                    	        	}
					            	  
				                    	        },
				                    	        {
				                    	        	xtype:'panel',
				                    	        	flex: 420
					            	  
				                    	        }
				                    	        
				                    	        
				                    	  ]
				                      
				                      },
				                      {
				                    	  xtype:'panel',
				                    	  flex: 6
				                      }
				                  ]
				            },
				            {
				            	xtype:'panel',
					            height:this.altezza_2,
					            layout:{
					            	type:'vbox'
					            },
					            items:[ 
					                   {
					                	   	xtype:'button',
					                	   	ui: 'Skiing',
					                	    icon: 'images/button-skiing-logo.png',
					                	    iconAlign:'right',
					                	   	flex:1,
					                	   	text: MLFF.languages[MLFF.lang].Skiing,
					                	   	handler: function(){ 
					                	   		if(MLFF.lock) {
					                	   			MLFF.lock = false;
					                	   			var time = new Date().getTime();
					                	   			this.parent.add({
					   									xtype: 'specialitycontainer',
					   									tag: 'Skiing',
					   									color: '#2361AB',
					   									lang:'IT'
					                	   			})
					                	   			this.parent.setActiveItem(1);
					   						 	}
					   						},
					   						scope:me			                  
					                   },
					                   {
					                	   xtype:'button',
					                	   ui: 'Cycling',
					                	   flex:1,
					                	   iconAlign:'right',
					                	   icon: 'images/button-cycling-logo.png',					
					                	   text: MLFF.languages[MLFF.lang].Cycling,
					                	   	handler: function(){ 
					                	   		if(MLFF.lock) {
					                	   			MLFF.lock = false;
					                	   			var time = new Date().getTime();
					                	   			this.parent.add({
					   									xtype: 'specialitycontainer',
					   									tag: 'Cycling',
					   									color: '#727576',
					   									lang:'IT'
					                	   			})
					                	   			this.parent.setActiveItem(1);
					   						 	}
					   						},
					   						scope:me		                  
					                   },
					                   {
					                	   xtype:'button',
					                	   ui: 'Running',
					                	   icon: 'images/button-running-logo.png',	
					                	   iconAlign:'right',
					                	   flex:1,
					                	   text: MLFF.languages[MLFF.lang].Running,
					                	   	handler: function(){ 
					                	   		if(MLFF.lock) {
					                	   			MLFF.lock = false;
					                	   			var time = new Date().getTime();
					                	   			this.parent.add({
					   									xtype: 'specialitycontainer',
					   									tag: 'Running',
					   									color: '#036738',
					   									lang:'IT'
					                	   			})
					                	   			this.parent.setActiveItem(1);
					   						 	}
					   						},
					   						scope:me
					                   },
					                   {
					                	   xtype:'button',
					                	   itemId: 'buttoncompi',
					                	   ui: 'combi',
					                	   icon: 'images/button-combi-logo.png',
					                	   iconAlign:'right',
					                	   flex:1,
					                	   text: MLFF.languages[MLFF.lang].combi,
					                	   handler: function(){ 
					                	   		if(MLFF.lock) {
					                	   			MLFF.lock = false;
					                	   			var time = new Date().getTime();
					                	   			this.parent.add({
					   									xtype: 'combicontainer',
					   									text: MLFF.languages[MLFF.lang].combi,
					   									tag: 'all',
					   									color: '#003369',
					   									lang:'IT'
					                	   			})
					                	   			this.parent.setActiveItem(1);
					   						 	}
					   						 	
					   						},scope:me
					                   },
					                   {
					                	   xtype:'button',
					                	   
					                	   ui: 'all',
					                	   flex:1,
					                	   icon: 'images/button-info-logo.png',
					                	   iconAlign:'right',
					                	   text: MLFF.languages[MLFF.lang].all,
					                	   handler: function(){ 
					                	   		if(MLFF.lock) {
					                	   			MLFF.lock = false;
					                	   			var time = new Date().getTime();
					                	   			this.parent.add({
					   									xtype: 'infocontainer',
					   									text: 'Info',
					   									tag: 'all',
					   									color: '#003369',
					   									lang:'IT'
					                	   			})
					                	   			this.parent.setActiveItem(1);
					   						 	}
					   						},
					   						scope:me
					                   }
					                    
					            ],
		   						scope:me
				            }
				            
				    ],
					scope:me
				}
		    ],
		    scope:me
		    
			
		});
		
		me.callParent([config]);
	}/*,

	choiseupdate:function(bt,value,o){
		var me = this;
		console.log(bt)
		if(bt == 'no') {
			me.createPanel();
		}
		else {
			out = window.open('https://play.google.com/store/apps/details?id=it.visittrentino.android.it.fiemme&feature=search_result#?t=W251bGwsMSwxLDEsIml0LnZpc2l0dHJlbnRpbm8uYW5kcm9pZC5pdC5maWVtbWUiXQ..','_blank','toolbar=no,location=no,directories=no');
        	out.focus();
		}
	},
	
	updateversion: function(){
		var me = this;
		if (navigator.network.connection.type != Connection.NONE && navigator.network.connection.type != 'unknown' ){
			Ext.data.JsonP.request({
	            url: 'http://storage.fiemme2013.com/v4web/version?os=android',
	            callbackKey: 'jsoncallback',
	            type: 'jsonp',
	            success: function(result, request) {
	                // Unmask the viewport
	            	
	            	F2013.lang = me.lingua;
					me.isCreated = true;
	                //if(result.version==100){
	                if(true){
	                	me.createPanel();
	                }
	                else{
	                	Ext.Msg.confirm("Update aviable!", "A new version is aviable! Would you update it?", me.choiseupdate,me);
	                	/*Ext.Msg.show({
	                		title:'Update aviable!',
	              		    msg: 'A new version is aviable! Would you update it?',
	              		    buttons: Ext.Msg.YESNOCANCEL
	            		});
	                	/*Ext.Msg.show({
	                		   title:'Update aviable!',
	                		   msg: 'A new version is aviable! Would you update it?',
	                		   buttons: Ext.Msg.YESNO,
	                		   fn: function({
	                			   me.createPanel();
	                		   });
	                		});*//*
	                }
	            },scope:me
	        });
		}
		else {
			me.createPanel();
		}
		
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
				align: 'center',
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
							F2013.lock = false;
							var time = new Date().getTime();
							this.parent.add({
								xtype: 'schedulecontainer'
							})
							this.parent.setActiveItem(1);
							
						}
						
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
							F2013.lock = false;
							this.parent.add({
							    xtype: 'listdetailcontainer',
							    name: 'News'
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
							if(navigator.network.connection.type != Connection.NONE && navigator.network.connection.type != 'unknown' ) {
								
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
	}	*/
});


var h_img = this.width/18.28571428571429;

Ext.define('MLFF.view.Main', {
    extend: 'Ext.Panel',
    xtype: 'mainview',
    config: {
        fullscreen: true,
        style: {
	        'background':'#fffffff'
        },
        layout: {
        	type:'vbox'
        },/*
        layout: {
        	animation: {
                type: 'slide',
                direction: 'left'
            },
            type: 'card'
        },*/
        items: [{
        	items:[{
        		xtype:'home',
        		layout:{
        			type:'fit'
        		}
        	}],
        	layout: {
	        	animation: {
	                type: 'slide',
	                direction: 'left'
	            },
	            type: 'card'
	        },
	        flex:23
        	
        }
        ]
    }
});

/*Ext.define('UHC.view.Main', {
    extend: 'Ext.Container',
    xtype: 'mainview',
    config: {
        fullscreen: true,
        items: [
              {
				    xtype: 'container',
				    layout: 'fit',
				    //html: '<div align="center" style="position:relative; "> <img src="immagini/bg_top_interno.jpg"></div>'
				    style: {
				        'background':'#ffffff',
				        'background-image': 'url(img/bg.jpg)',
				        'background-size': '100% 100%',
				        'background-repeat': 'no-repeat',
				        'background-position': 'bottom top'
				    },
				    items: [
				            {
	         			    xtype: 'home'
	         			}
				    ]
			}/*,{
            	xtype: 'panel',
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
            }/*,
            {
			    xtype: 'panel'
			    html: '<div align="center" style="position:relative; "> <img src="immagini/bg_top_interno.jpg"></div>'
			}
			
        ]
    }
});*/


Ext.define('F2013.view.DetailPanel', {
	extend: 'Ext.Panel',
	alias: 'widget.detailpanel',
    
	constructor: function(config) {
		var me = this;
        config = config || {};
        me.initialConfig = config;
		
		Ext.apply(config, {
            scrollable: true,
			style: {
				"background-color": "#fff"
			},
            styleHtmlContent: true
		});

		me.callParent([config]);
	}
});

Ext.define('MLFF.view.CombinataContainer', {
	extend: 'Ext.Panel',
	alias: 'widget.combicontainer',
	xtype: 'combicontainer',
	
	constructor: function (config){
		var me = this;
       config = config || {};
       me.initialConfig = config;
        
       if (MLFF.lang == 'EN' ) {
    	   me.urlcclas = 'http://storage.marcialonga.it/x00001/public/2515269149A94BAA8A3CEB39F8D038D7/WebElements/D314D2CEDA8143E2B03B438E28401C97.php';
           me.urlcinfo = 'http://storage.marcialonga.it/x00001/public/2515269149A94BAA8A3CEB39F8D038D7/WebElements/4B324B54A40540C191E68E5418BB85F6.php';
                   
       }
       else{
    	   me.urlcclas = 'http://storage.marcialonga.it/x00001/public/2515269149A94BAA8A3CEB39F8D038D7/WebElements/0969C90F924745DD9334642743EDED27.php';
           me.urlcinfo = 'http://storage.marcialonga.it/x00001/public/2515269149A94BAA8A3CEB39F8D038D7/WebElements/B768B7AC48BB4422ABE52A1083F918B4.php';
       }
		
		Ext.apply(config, {
			layout: {
	            type: 'fit'
	        },

		    items: [ {
					     xtype: 'tabpanel',
					     itemId: 'tabSpeciality',
					     ui: config.tag,
					     activItem: 0,
                         items:[{
                            xtype: 'container',
                            title: 'Info',
                            layout: {
                                animation: {
                                    type: 'slide',
                                    direction: 'left'
                                },
                                type: 'card'
                            },
                            iconCls: 'icon-info-mlff',
                            iconMask: true,
                            items: [{
                            		xtype:'htmltopanel',
                            		url: MLFF.lang+'/pages/combi_info.html',
                                    serverurl :me.urlcinfo,
                                    localname: 'combi_info_' + MLFF.lang,
                                    myclass: 'htmltopanellocal',
                            		color: config.color,
			        	 			ui: 'infolist',
			        	 			tag: config.tag,
			        	 			lang: 'IT'
			        	 		}
							]
							
                        },
                        {
                            xtype: 'container',
                            title: MLFF.languages[MLFF.lang].classif,
                            layout: {
                                animation: {
                                    type: 'slide',
                                    direction: 'left'
                                },
                                type: 'card'
                            },
                            iconCls: 'icon-list-mlff',
                            iconMask: true,
                                items: [{
                            		xtype:'htmltopanel',
                            		url:  MLFF.lang+'/pages/combi_info.html',
                                    serverurl:  me.urlcclas,
                                    localname: 'combi_classifi_' + MLFF.lang,
                                    myclass: 'htmltopanellocal',
                            		color: config.color,
			        	 			ui: 'infolist',
			        	 			tag: config.tag,
			        	 			lang: 'IT'
                                    }
                            ]
                        }
					     	
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
						title: config.text,//F2013.languages[F2013.lang]['home'+config.tag+'Label'],
						items: [{
							
							 xtype: 'button',
							 icon: 'images/icon-back-'+config.tag+ '.png',
							 ui: 'mlff',
					         handler: function() {
					        	   var me = this;
					        	   var tabp = me.getComponent('tabSpeciality');
					        	   var taba = tabp.getActiveItem();
					        	  if(taba.getActiveItem().xtype == "Photogallery" ){
					        		   ida = taba.getActiveItem().getActiveItem().id
					        		   idinner = taba.getActiveItem().getInnerItems()[0].id 
					        	   }
					        	   else {
					        		   ida = null
					        		   idinner = null
					        	   }
					        	   if (taba.getActiveItem().xtype == "Photogallery" && (ida  !=  idinner)){
					        		   //taba.getActiveItem().fireEvent('back', this);
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
						        		   MLFF.lock = true;
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
					    	 	"padding-top": "11%",
					    	 	"padding-right": "10%" 
					    	 },
					    	 html: '<img src="images/ico-combi.png" whidt="80%" height="80%">',
					    	 align:'right'
					    }],scope:me
					     
			          }
		       ],
		       scope:me
		});	
			
		me.callParent([config]);
	}

});


Ext.define('MLFF.view.News', {
	extend: 'Ext.dataview.List',
	alias: 'widget.News',
	xtype: 'News',
	name: 'MyNews',
	 
	reload: function(a){
		var lastload = window.localStorage.getItem('news-'+a.config.tag+'-'+MLFF.lang+'-time'); 
	    var time = new Date().getTime();
	    
		if((lastload == null || time-lastload>MLFF.timecache) && ( navigator.network.connection.type != Connection.NONE && navigator.network.connection.type != 'unknown' ) ){
			a.getStore().getProxy().setExtraParam('tag', a.config.tag);
			a.getStore().config.proxy.extraParams.tag = a.config.tag;
			a.getStore().getProxy().setExtraParam('lang', MLFF.lang);
			a.getStore().config.proxy.extraParams.lang = MLFF.lang;
			a.getStore().load();
	    }
	    else {
	    	if(Ext.decode(window.localStorage.getItem('news-'+a.config.tag+'-'+MLFF.lang))==null){
	    		
	    	}
	    	else{
	    		a.getStore().add(Ext.decode(window.localStorage.getItem('news-'+a.config.tag+'-'+MLFF.lang)))
	    	}
	    }
	},
    
	constructor: function(config) {
		//alert(config.title);
		var me = this;
        config = config || {};
        me.initialConfig = config;
       
        
        if(navigator.network.connection.type != 'none' && navigator.network.connection.type != 'unknown' ){
            
	        Ext.apply(config, {
	        	itemTpl: Ext.String.format('<div><div style="border:1px solid {0}; float:left; width:80px; height:60px; overflow:hidden; text-align:center; vertical-align:middle;"><img src="<tpl if="IMAGE.substring(0,4) != \'http\'">http://www.marcialonga.it</tpl>{IMAGE}"></div><div style="margin-left:100px; line-height:0.8em;"><span style="color:#000; font-size:0.7em; font-weight:bold; font-style:italic">{REAL_DATE_F} </span><br><span style="color:{0}; font-size:0.8em; font-weight:bold">{LABEL1}</span><br><span style=" color:#000; font-size:0.6em; font-weight:bold">{ABSTRACT}</span></div></div><div style="clear:both"></div>', config.color)
	    			
			});	
        }
        else{
        	Ext.apply(config, {
	        	itemTpl: '<div><div style="float:left; width:70px; height:70px; overflow:hidden; text-align:center;"><img src="<tpl if="TAG== \'\'">images/ico-info.png</tpl><tpl if="TAG!= \'\'">images/ico-{TAG}.png</tpl>"> </div><div style="margin-left:100px;"><span style="color:#000; font-size:0.8em; font-weight:bold">{REAL_DATE_F}</span><br><span style="color:#005697; font-size:0.8em; font-weight:bold">{LABEL1}</span></div></div><div style="clear:both"></div>'
	    			
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
				console.log('ENtro qui in ' + a.config.tag + ' - ' + MLFF.lang);
				var lastload = window.localStorage.getItem('MLFF-news-'+a.config.tag+'-'+MLFF.lang+'-time'); 
			    var time = new Date().getTime();
			    var t = MLFF.timecache;
			   
			   
			    if ((lastload == null || (time-lastload)>MLFF.timecache) && ( navigator.network.connection.type != Connection.NONE && navigator.network.connection.type != 'unknown' )){
			    	a.getStore().getProxy().setExtraParam('tag', a.config.tag);
					a.getStore().getProxy().setExtraParam('lang', MLFF.lang);
					a.getStore().config.proxy.extraParams.tag = a.config.tag;
					a.getStore().config.proxy.extraParams.lang = MLFF.lang;
					a.getStore().load();
					console.log('Entro qui');
			    }
			    else {
			    	if(Ext.decode(window.localStorage.getItem('MLFF-news-'+a.config.tag+'-'+MLFF.lang))!=null){
			    		var wc = Ext.decode(window.localStorage.getItem('MLFF-news-'+a.config.tag+'-'+MLFF.lang));
			    		a.getStore().add(wc);
						    	
			    	}
			    }
			},
			
			
            itemtap: function(view, index, target, record) {
                	//var me = view;
					if(navigator.network.connection.type != 'none' && navigator.network.connection.type != 'unknown' ) {
						Ext.data.JsonP.request({
							callbackKey: 'jsoncallback',
							url: 'http://apps.marcialonga.it/v4web/html',
							params: {
								RefOwner: '2515269149A94BAA8A3CEB39F8D038D7',
								UUID: record.get('UUID')
							},
							success: function(response){
								var me = view;
			                    html = Ext.String.format('<div id="detail" width={0}>{1}</div>',window.innerWidth,response);
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
						Ext.Msg.alert('Alert', MLFF['cerror_'+MLFF.lang], Ext.emptyFn);;
						
					}
               
            }
		}
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
				a.getStore().getProxy().setExtraParam('lang', MLFF.lang);
				a.getStore().config.proxy.extraParams.lang = MLFF.lang;
				
			}
		}
		
		
	}
	
	
	
});

Ext.define('F2013.view.HtmlToPanellocal', {
    extend: 'Ext.Panel',
    xtype: 'htmltopanellocal',
    name: 'MyHtmlToPanellocal',
    scrollable:true,
    /*style: {
        'background':'#ffffff',
        //'background-image': 'url(img/bg.jpg)',
        //'background-size': '100% 100%',
        //'background-repeat': 'no-repeat',
        //'background-position': 'bottom left'
    },*/
    
    // We are using Ext.Ajax, so we should require it
    requires: ['Ext.Ajax'],

   config: {
	   	
	   	scrollable: true,
    	//html:'<div style="color:#666; background-image:url(\'img/bg.jpg\'); background-size: 100%;background-repeat: no-repeat; height:100px;"></div>',
    	
        listeners: {
            activate: 'onActivate' 
        },
        
        
        // Create a new configuration called `url` so we can specify the URL
        url: null
    },
    

    onActivate: function(me, container) {
    	//console.log('HTMLTOPAGE - rquest page ' + me.config.url)
    	if ( navigator.network.connection.type != Connection.NONE && navigator.network.connection.type != 'unknown' ){
    		 Ext.Ajax.request({
                 url: me.config.serverurl,
                 method: "GET",
                 success: function(response, request) {
                 // We should use the setter for the HTML config for this
                 if( me.config.myclass){
                 //console.log('MY CLASS HTPLOC ' + me.config.myclass)
                 //console.log('TEXT' + response.responseText )
                 me.setHtml('<div  id="' + me.config.myclass + '">' +response.responseText + '</div>');
                 window.localStorage.setItem('MLFF_'+me.config.localname, '<div  id="' + me.config.myclass + '">' +response.responseText + '</div>');
                 //console.log('HTML##### '  + me.getHtml())
                 }
                 else{
                 me.setHtml(response.responseText);
                 }
                 },
                 failure: function(response, request) {
                 //me.setHtml("failed -- response: " + response.responseText + "-"+me.config.url);
                 }
                 });
    		
    	}
    	else if (window.localStorage.getItem('MLFF_'+me.config.localname) == null){
    		 Ext.Ajax.request({
                 url: me.config.url,
                 method: "GET",
                 success: function(response, request) {
                 // We should use the setter for the HTML config for this
                 if( me.config.myclass){
                 //console.log('MY CLASS HTPLOC ' + me.config.myclass)
                 //console.log('TEXT' + response.responseText )
                 me.setHtml('<div  id="' + me.config.myclass + '">' +response.responseText + '</div>');
                 window.localStorage.setItem('MLFF_'+me.config.localname, '<div  id="' + me.config.myclass + '">' +response.responseText + '</div>');
                 //console.log('HTML##### '  + me.getHtml())
                 }
                 else{
                 me.setHtml(response.responseText);
                 }
                 },
                 failure: function(response, request) {
                 //me.setHtml("failed -- response: " + response.responseText + "-"+me.config.url);
                 }
                 });
    	}
    	else {
            me.setHtml(window.localStorage.getItem('MLFF_'+me.config.localname));
    	}
    }
});

Ext.define('F2013.view.Luoghi', {
	extend: 'Ext.dataview.List',
	alias: 'widget.startlist',
	xtype: 'startlist',
	
   constructor: function (config){
		var me = this;
        config = config || {};
        me.initialConfig = config;
		
		Ext.apply(config, {
			itemTpl : Ext.String.format('<div style="font-family:Arial; "><div style="float:left; width:60; text-align:center; color: #557481;"><span style="font-size:1.2em;"><b>{bib}</b></span></div><div style=" margin-left:70px;"><span style="font-size:1.2em;">{name}</span></div><div style="clear:both"></div>')
		});	
		
		me.callParent([config]);
	},
	
	config: {
		store : {xtype:'storestartlist'},
		
		
		listeners: {
			initialize: function (a,b){
				console.log('initialize')
				//a.getStore().getProxy().setUrl(MLFF.lang+'/JSON/'+a.config.tag+'.json');
				//a.getStore().config.proxy.url = MLFF.lang+'/JSON/'+a.config.tag+'.json';
				//console.log('LOAD -'+ MLFF.lang+'/JSON/'+a.config.tag+'.json');
				//a.getStore().load();
				//console.log('meteo 2');
			},
			
			itemtap: function(view, index, target, record) {
            	//var me = view;
				if(navigator.network.connection.type != 'none' && navigator.network.connection.type != 'unknown' ) {
					Ext.Ajax.request({
	                    url: 'http://www.marcialonga.it/apps/form.php',
	                    method: "GET",
	                    params: {
	                        id:record.get('id'),
	                        race:this.getStore().config.proxy.extraParams.race,
	                        lang:MLFF.lang,
	                        tag: this.getStore().config.proxy.extraParams.tag,
                            
	                    },
	                    success: function(result, request) {
		                    html = Ext.String.format('<div id="detail" style="padding:10px; background-color:#fff"><h1>{0}</h1>{1}</div>',MLFF.languages[MLFF.lang].scheda,result.responseText);
		                    view.parent.setActiveItem(2);
		                    view.parent.getActiveItem().setHtml(html);
	                    },
	                    failure: function(){
	                    	panelmask.setMasked(false);
	                    	alert('ERROR');
	                    }
	                });
				}
				else {
					Ext.Msg.alert('Alert', F2013['cerror_'+MLFF.lang], Ext.emptyFn);;
					
				}
           
        }
	    }
	},
	
	load: function (url,parameters){
		alert(me.store.xtype);
		
	}
	
	
		
});

Ext.define('MLFF.view.CombinataContainer', {
           extend: 'Ext.Panel',
           alias: 'widget.combicontainer',
           xtype: 'combicontainer',
           
           constructor: function (config){
           var me = this;
           config = config || {};
           me.initialConfig = config;
           
           if (MLFF.lang == 'EN' ) {
        	   me.urlcclas = 'http://storage.marcialonga.it/x00001/public/2515269149A94BAA8A3CEB39F8D038D7/WebElements/D314D2CEDA8143E2B03B438E28401C97.php';
        	   me.urlcinfo = 'http://storage.marcialonga.it/x00001/public/2515269149A94BAA8A3CEB39F8D038D7/WebElements/4B324B54A40540C191E68E5418BB85F6.php';
           
           }
           else{
        	   me.urlcclas = 'http://storage.marcialonga.it/x00001/public/2515269149A94BAA8A3CEB39F8D038D7/WebElements/0969C90F924745DD9334642743EDED27.php';
        	   me.urlcinfo = 'http://storage.marcialonga.it/x00001/public/2515269149A94BAA8A3CEB39F8D038D7/WebElements/B768B7AC48BB4422ABE52A1083F918B4.php';
           }
           
           Ext.apply(config, {
                     layout: {
                     type: 'fit'
                     },
                     
                     items: [ {
                             xtype: 'tabpanel',
                             itemId: 'tabSpeciality',
                             ui: config.tag,
                             activItem: 0,
                             /*listeners: {
                              activeitemchange: function(item,value, oldValue, e) {
                              
                              if(value.getInnerItems()[0].xtype=='Photogallery' &&  (navigator.network.connection.type == Connection.NONE && navigator.network.connection.type != 'unknown' ) ) {
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
                              },*/
                             items:[{
                                    xtype: 'container',
                                    title: 'Info',
                                    layout: {
                                    animation: {
                                    type: 'slide',
                                    direction: 'left'
                                    },
                                    type: 'card'
                                    },
                                    iconCls: 'icon-info-mlff',
                                    iconMask: true,
                                    items: [{
                                            xtype:'htmltopanellocal',
                                            url: MLFF.lang+'/pages/combi_info.html',
                                            serverurl :me.urlcinfo,
                                            localname: 'combi_info_' + MLFF.lang,
                                            myclass: 'htmltopanellocal'
                                            }
                                            ]
                                    
                                    },
                                    {
                                    xtype: 'container',
                                    title: MLFF.languages[MLFF.lang].classif,
                                    layout: {
                                    animation: {
                                    type: 'slide',
                                    direction: 'left'
                                    },
                                    type: 'card'
                                    },
                                    iconCls: 'icon-list-mlff',
                                    iconMask: true,
                                    items: [
                                            {
                                            xtype:'htmltopanel',
                                            myclass:'mytable',
                                            url: me.urlcclas
                                            }
                                            ]
                                    }
                                    
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
                             title: config.text,//F2013.languages[F2013.lang]['home'+config.tag+'Label'],
                             items: [{
                                     
                                     xtype: 'button',
                                     icon: 'images/icon-back-'+config.tag+ '.png',
                                     ui: 'mlff',
                                     handler: function() {
                                     var me = this;
                                     var tabp = me.getComponent('tabSpeciality');
                                     var taba = tabp.getActiveItem();
                                     if(taba.getActiveItem().xtype == "Photogallery" ){
                                     ida = taba.getActiveItem().getActiveItem().id
                                     idinner = taba.getActiveItem().getInnerItems()[0].id
                                     }
                                     else {
                                     ida = null
                                     idinner = null
                                     }
                                     if (taba.getActiveItem().xtype == "Photogallery" && (ida  !=  idinner)){
                                     //taba.getActiveItem().fireEvent('back', this);
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
                                     MLFF.lock = true;
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
                                     "padding-top": "11%",
                                     "padding-right": "10%" 
                                     },
                                     html: '<img src="images/ico-combi.png" whidt="80%" height="80%">',
                                     align:'right'
                                     }],scope:me
                             
                             }
                             ],
                     scope:me
                     });	
           
           me.callParent([config]);
           }
           
           });


Ext.define('MLFF.view.SpecialityContainer', {
	extend: 'Ext.Panel',
	alias: 'widget.specialitycontainer',
	xtype: 'specialitycontainer',
	
	constructor: function (config){
		var me = this;
		config = config || {};
		me.initialConfig = config;
		//this.altezza_1 = window.innerWidth*0.35;
		this.altezza_1 = (window.innerHeight-(window.innerWidth*1.47))*0.5;
		this.larghezza_1 = window.innerWidth*0.15;
		//this.larghezza_2 = (window.innerWidth-this.larghezza_1);
		//this.larghezza_3 = window.innerWidth*1;
		//this.larghezza_4 = (window.innerWidth-this.larghezza_3);
		me.form = {
          xtype: 'formpanel',
      	  //height:this.altezza_2,
      	  //width:this.larghezza_1,
      	  items:[
				
				{
				    xtype: 'fieldset',
				    //width:this.larghezza_1*1.2,
				    title:  MLFF.entry[MLFF.lang].ricerca,
				    defaults: { xtype: 'radiofield' },
				    items: [
				            { name: 'criteria', label:  MLFF.entry[MLFF.lang].nome, labelWidth:'50%', value: 'n' },
				            { name: 'criteria', label:  MLFF.entry[MLFF.lang].posizione, labelWidth:'50%', checked: true, value: 'p'}
				    ]
				},
				{
				    xtype: 'fieldset',
				    //width:this.larghezza_1*1.2,
				    title: MLFF.entry[MLFF.lang].race,
				    items: [
		                    {
		                        xtype: 'selectfield',
		                        name: 'race',
		                        options: MLFF.ckbox[MLFF.lang][config.tag]
		                    }
		                ]
				},
				{
				    xtype: 'fieldset',
				    title: '',
				    //width:this.larghezza_1,
				    items: [
						{
						    xtype: 'textfield',
						    name: 'text',
						    label: '',
						    autoCapitalize: false
						}
					]
				},
				{
					xtype:'panel',
					height:this.altezza_1,
				    //,html:'<div style="font-family: Arial, Verdana, Helvetica, Sans-serif;">In caso di ricerca nominale, inserisci almeno tre caratteri.<br><br><div>'
				},
				{
					xtype:'button',
					text:MLFF.entry[MLFF.lang].cerca,
					ui: config.tag,
					//width:this.larghezza_3,
					height:this.larghezza_1,
					style:{
						'padding-left':this.larghezza_4+'px',
						'text-align':'center',
						'font-family':'Padaloma'
					},
			        handler: this.mysearch
			        	 
			        	 
			         
				}
      	         ]
        	
        	
      };
       
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
					    	 initialize: function(t,e){
					    		 MLFF.config = config;
					    	 }
					     },
					     items:[{
                            xtype: 'container',
                            title: 'News',
                            layout: {
                                animation: {
                                    type: 'slide',
                                    direction: 'left'
                                },
                                type: 'card'
                            },
                            iconCls: 'icon-news-mlff',
                            iconMask: true,
                            items: [{
			        	 			xtype: 'News',
			        	 			color: config.color,
			        	 			ui: 'infolist',
			        	 			tag: config.tag,
			        	 			lang: 'IT'
			        	 			//load:true
							 
			        	 		},
			        	 		{
			        	 			xtype: 'detailpanel'
                                }
							]
							
                        },
                        {
                            xtype: 'container',
                            title: 'Info',
                            layout: {
                                animation: {
                                    type: 'slide',
                                    direction: 'left'
                                },
                                type: 'card'
                            },
                            iconCls: 'icon-info-mlff',
                            iconMask: true,
                            items: [
                                    {
                                    	xtype:'htmltopanel',
                                    	//cls: 'internal'+config.tag,
                                    	url: MLFF.lang+'/pages/' + config.tag +'_info.html'
                                    	//url: MLFF.lang+'/pages/' + 'accrediti.html'
                                    }
                            ]
                        },
                        {
                            xtype: 'container',
                            title: 'Tracks',
                            layout: {
                                animation: {
                                    type: 'slide',
                                    direction: 'left'
                                },
                                type: 'card'
                            },
                            iconCls: 'icon-track-mlff',
                            iconMask: true,
                            items: [
                                    {
                                    	xtype:'htmltopanel',
                                    	//cls: 'internal'+config.tag,
                                    	url: MLFF.lang+'/pages/' + config.tag +'_tracks.html'
                                   	}
                            ]
                        },
                        {
                            xtype: 'container',
                            title: 'Start List',
                            layout: {
                                animation: {
                                    type: 'slide',
                                    direction: 'left'
                                },
                                type: 'card'
                            },
                            iconCls: 'icon-list-mlff',
                            iconMask: true,
                            items: [
                                me.form,
								{
									xtype: 'startlist',
									tag:config.tag
								},{
                                	xtype:'panel',
                                	style: {
                        				"background-color": "#fff"
                        			}
                                	//cls: 'internal'+config.tag,
                                	//url: MLFF.lang+'/pages/' + config.tag +'_tracks.html'
                               	}
                            ]
                        }
                                                    
                                                    
                                                 
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
						title: MLFF.languages[MLFF.lang][config.tag+'Title'],
						items: [{
							
							 xtype: 'button',
							 icon: 'images/icon-back-'+config.tag+ '.png',
							 ui: 'mlff',
					         handler: function() {
					        	   var me = this;
					        	   var tabp = me.getComponent('tabSpeciality');
					        	   var taba = tabp.getActiveItem();
					        	  if(taba.getActiveItem().xtype == "Photogallery" ){
					        		   ida = taba.getActiveItem().getActiveItem().id
					        		   idinner = taba.getActiveItem().getInnerItems()[0].id 
					        	   }
					        	   else {
					        		   ida = null
					        		   idinner = null
					        	   }
					        	   if (taba.getActiveItem().xtype == "Photogallery" && (ida  !=  idinner)){
					        		   //taba.getActiveItem().fireEvent('back', this);
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
						        		   //me.parent.setActiveItem(0);
						        		   animation.setReverse(false);
						        		   MLFF.lock = true;
						        		   //tabp.setActiveItem(0);
						        	   }
						        	   else {
						        		  var animation = taba.getLayout().getAnimation();
										   animation.setReverse(true);
										   if(MLFF.isload){
											   if(taba.getActiveItem() == taba.getInnerItems()[1]){ 
												   taba.setActiveItem(0);
											   }
											   else{
												   taba.setActiveItem(1);
											   }
										   }
										   else {
											   taba.setActiveItem(0);
										   }
						        		   animation.setReverse(false);
							        	   
						        	   } 
					        	   }
					        		   
								},scope:me
					     },
					     {
					    	 xtype: 'container',
					    	 style:{
					    	 	//"padding-top": (MLFF.iosversion != 7) ?  "11%" : "5%",
					    	 	//"padding-right": (MLFF.iosversion != 7) ? "3%" : "10%"
                                "padding-top": "11%",
					    	 	"padding-right": "3%"//,
                                //"margin": "10px"
					    	 },
                             //width: 2,
                             //width: (MLFF.iosversion != 7) ? '100%': '20%',
					    	 //html: (MLFF.iosversion != 7) ? '<img src="images/ico-'+config.tag+'.png"  height="80%">' : '<img src="images/ico-'+config.tag+'.png" width:"50%" height="50%">',
                             html: '<img src="images/ico-'+config.tag+'.png" >',
					    	 align:'right'
					    }],scope:me
					     
			          }
		       ],
		       scope:me
		});	
			
		me.callParent([config]);
	},
	
	mysearch: function() {
		if (navigator.network.connection.type != Connection.NONE && navigator.network.connection.type != 'unknown' ){
			form = this.parent
	   	 	panelmask = form.parent.parent.parent.parent;
	   	 	panelmask.setMasked({
	               xtype: 'loadmask',
	               message: 'Loading...'
	        });
	   	    //alert('click ' + JSON.stringify(form.getValues()));
			obj = form.getValues();
			config = MLFF.config;
			switch(obj.criteria)
			{
				case 'n':
					if(obj.text.length>2){
						MLFF.isload=true;
						mystart = form.parent.getInnerItems()[1];
		        		mystore = mystart.getStore();
		        		urltocall = Ext.String.format('http://www.marcialonga.it/apps/search.php?criteria={0}&race={1}&lang={2}',obj.text,obj.race,MLFF.lang);
		        		console.log('CHIAMO ' + urltocall)
		        		mystore.getProxy().setUrl(urltocall);
		        		//mystart = form.parent.getInnerItems()[1];
		        		//mystore = mystart.getStore();
		        		//mystore.getProxy().setExtraParam('criteria:', obj.text);
		        		//mystore.config.proxy.extraParams.criteria = obj.text;
		        		mystore.getProxy().setExtraParam('tag', config.tag);
		        		mystore.config.proxy.extraParams.tag = config.tag;
		        		mystore.getProxy().setExtraParam('race', obj.race);
		        		mystore.config.proxy.extraParams.race = obj.race;
		        	    //mystore.getProxy().setExtraParam('lang', MLFF.lang);
		        		//mystore.config.proxy.extraParams.lang = MLFF.lang;*/
		        		mystore.load();
		        		form.parent.setActiveItem(1);
		        		panelmask.setMasked(false);
					}
					else{
						Ext.Msg.alert('Alert',MLFF.msg[MLFF.lang].trec, Ext.emptyFn);
						panelmask.setMasked(false);
					}
				  break;
				case 'p':
					if(obj.text.length>0){
						if(!isNaN(obj.text)){
						 Ext.Ajax.request({
		                    url: 'http://www.marcialonga.it/apps/form.php',
		                    method: "GET",
		                    params: {
		                        bib:obj.text,
		                        race:obj.race,
		                        lang:MLFF.lang,
		                        tag: config.tag
		                    },
		                    success: function(result, request) {
		                        // Unmask the viewport
                                //var me = view;
                                html = Ext.String.format('<div id="detail" style="padding:10px; background-color:#fff"><h1>{0}</h1>{1}</div>',MLFF.languages[MLFF.lang].scheda,result.responseText);
			                    //var animation = me.parent.getLayout().getAnimation();
			                    //animation.setReverse(false);
			                    MLFF.isload=false;
			                    form.parent.setActiveItem(2);
			                    form.parent.getActiveItem().setHtml(html);
			                   // me.parent.getActiveItem().getScrollable().scrollTo({ x: 0, y: 0 });
			                    //animation.setReverse(true); 
			                    panelmask.setMasked(false);
		                    },
		                    failure: function(){
		                    	panelmask.setMasked(false);
		                    	Ext.Msg.alert('Alert',MLFF.msg[MLFF.lang].generic, Ext.emptyFn);
		                    }
		                });
						}
						else{
							panelmask.setMasked(false);
							Ext.Msg.alert('Alert',MLFF.msg[MLFF.lang].onumber, Ext.emptyFn);
							//alert('Immettere solo nuemeri!')
						}
					}
					else {
						panelmask.setMasked(false);
						Ext.Msg.alert('Alert',MLFF.msg[MLFF.lang].alnumber, Ext.emptyFn);
						//alert('Immettere almeno 1 numero!')
					}
				  break;
			}
		}
		else {
			Ext.Msg.alert('Alert', MLFF['cerror_'+MLFF.lang], Ext.emptyFn);;
		}
	 	
   	 	//if(form.)
   	 	
	
	}

});


Ext.define('MLFF.view.InfoContainer', {
	extend: 'Ext.Panel',
	alias: 'widget.infocontainer',
	xtype: 'infocontainer',
	
	constructor: function (config){
		var me = this;
       config = config || {};
       me.initialConfig = config;
        
		
		Ext.apply(config, {
			layout: {
	            type: 'fit'
	        },

		    items: [ {
					     xtype: 'tabpanel',
					     itemId: 'tabSpeciality',
					     ui: config.tag,
					     activItem: 0,
					     /*listeners: {
						     activeitemchange: function(item,value, oldValue, e) {
						    	
						    	  if(value.getInnerItems()[0].xtype=='Photogallery' &&  (navigator.network.connection.type == Connection.NONE && navigator.network.connection.type != 'unknown' ) ) {
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
					     },*/
					     items:[{
                            xtype: 'container',
                            title: MLFF.languages[MLFF.lang].contacts,
                            layout: {
                                animation: {
                                    type: 'slide',
                                    direction: 'left'
                                },
                                type: 'card'
                            },
                            iconCls: 'icon-contacts-mlff',
                            iconMask: true,
                            items: [{
                        		xtype:'htmltopanel',
                        		//cls: 'internal'+config.tag,
                        		url: MLFF.lang+'/pages/general_info.html',
                        		 
		        	 		}]
							
                        },
                        {
                            xtype: 'container',
                            title: MLFF.languages[MLFF.lang].acco,
                            layout: {
                                animation: {
                                    type: 'slide',
                                    direction: 'left'
                                },
                                type: 'card'
                            },
                            iconCls: 'icon-accomodation-mlff',
                            iconMask: true,
                            items: [{
                        		xtype:'htmltopanel',
                        		//cls: 'internal'+config.tag,
                        		url: MLFF.lang+'/pages/general_contacts.html',
                        		 
		        	 		}]/*,
			        	 	items: [{
			        	 			xtype: 'container',
			        	 			//color: '#0b4f8a',
			        	 			//tag: config.tag,
			        	 			lang: 'EN'
			        	 			//load:true
							 
			        	 		},
			        	 		{
			        	 			xtype: 'detailpanel'
                                }
							]
							*/
                        },
                        {
                            xtype: 'container',
                            title: 'Meteo',
                            layout: {
                                animation: {
                                    type: 'slide',
                                    direction: 'left'
                                },
                                type: 'card'
                            },
                            iconCls: 'icon-meteo-mlff',
                            iconMask: true,
                            items: [{
            				  	xtype: 'meteo',
            			  	 	ui: 'meteo',
            				    width: '100%',
            				    disableSelection: true
            			 
            			 	}]
                        }],
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
						title: config.text,//F2013.languages[F2013.lang]['home'+config.tag+'Label'],
						items: [{
							
							 xtype: 'button',
							 icon: 'images/icon-back-'+config.tag+ '.png',
							 ui: 'mlff',
					         handler: function() {
					        	   var me = this;
					        	   var tabp = me.getComponent('tabSpeciality');
					        	   var taba = tabp.getActiveItem();
					        	  if(taba.getActiveItem().xtype == "Photogallery" ){
					        		   ida = taba.getActiveItem().getActiveItem().id
					        		   idinner = taba.getActiveItem().getInnerItems()[0].id 
					        	   }
					        	   else {
					        		   ida = null
					        		   idinner = null
					        	   }
					        	   if (taba.getActiveItem().xtype == "Photogallery" && (ida  !=  idinner)){
					        		   //taba.getActiveItem().fireEvent('back', this);
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
						        		   MLFF.lock = true;
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
					    	 	"padding-top": "11%",
					    	 	"padding-right": "10%" 
					    	 },
					    	 html: '<img src="images/ico-info.png" whidt="80%" height="80%">',
					    	 align:'right'
					    }],scope:me
					     
			          }
		       ],
		       scope:me
		});	
			
		me.callParent([config]);
	}

});


































































