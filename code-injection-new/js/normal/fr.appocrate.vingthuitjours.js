

		    	function setAlerts(al) {
		    		al = JSON.parse(al);
					for(var k in al) {
						d = k.split("-");
						val = new Date(d[2],(parseFloat(d[1])-1),d[0]);
						Ext.getCmp("calView").getDateCell(val).addCls("check");
						Ext.getCmp("calView").getDateCell(val).dom.children[0].innerHTML = "Prise effectuée";
					}
				}
				var myAlert;
				


//function loadApp() {
	//<debug>
	Ext.Loader.setPath({
	    'Ext': 'touch/src',
	    'MyApp': 'app',
	    'MyData': 'MyData'
	});
	//</debug>
	
	MyData = {};
	
	Ext.application({
	    name: 'MyApp',
	
	    requires: [
			'Ext.device.Device',
	        'Ext.MessageBox'
	    ],
	
	    views: ['Main','Article','listDrugs','Drug'],
	
	    icon: {
	        '57': 'resources/icons/Icon.png',
	        '72': 'resources/icons/Icon~ipad.png',
	        '114': 'resources/icons/Icon@2x.png',
	        '144': 'resources/icons/Icon~ipad@2x.png'
	    },
	
	    isIconPrecomposed: true,
	
	    startupImage: {
	        '320x460': 'resources/startup/320x460.jpg',
	        '640x920': 'resources/startup/640x920.png',
	        '768x1004': 'resources/startup/768x1004.png',
	        '748x1024': 'resources/startup/748x1024.png',
	        '1536x2008': 'resources/startup/1536x2008.png',
	        '1496x2048': 'resources/startup/1496x2048.png'
	    },
	
	    launch: function() {
			
			console.log("launch");

	        document.addEventListener('deviceready', this.onDeviceReady, false);

			var browserLang = window.navigator.language; // get the browsers language
			var locales = [ 'fr', 'es', 'pt', 'pt-BR', 'pt-PT' ]; // available locale files
			var locale = 'fr'; // default locale
			
			// check browser language against available locale files
			for (var i = locales.length - 1; i >= 0; i--) {
			    if (browserLang === locales[i]) {
			        locale = browserLang;
			        break;
			    }
			};
			
			// Insert src attribute to extlocale
			if(locale) {
				Ext.require('MyData.lang.Fr');
			}
			
	        // Initialize the main view
	        Ext.Viewport.add(Ext.create('MyApp.view.Main'));
	    },

		onDeviceReady: function() {

	        Ext.fly('appLoadingIndicator').destroy();
			console.log("device ready");
			if (Ext.os.is.iOS) {
				console.log("device ready");
    			myAppNative.iOsPushInit();
			} else if (Ext.os.is.Android) {
				console.log("device ready");
    			myAppNative.androidPushInit();
			}

		},
	
	    onUpdated: function() {
	        Ext.Msg.confirm(
	            "Application Update",
	            "This application has just successfully been updated to the latest version. Reload now?",
	            function(buttonId) {
	                if (buttonId === 'yes') {
	                    window.location.reload();
	                }
	            }
	        );
	    }
	});
/*
}
 
loadApp();
*/


                   /**
                    * The picker with hours and minutes slots
                    */
                   Ext.define('Ext.ux.picker.Time', {
                              extend:'Ext.picker.Picker',
                              xtype:'timepicker',
                              
                              
                              config:{
                              /**
                               * @cfg {Number} increment The number of minutes between each minute value in the list.
                               * Defaults to: 5
                               */
                              increment:5,
                              
                              
                              /**
                               * @cfg {Number} start value of hours
                               */
                              minHours:0,
                              
                              
                              /**
                               * @cfg {Number} end value of hours.
                               */
                              maxHours:23,
                              
                              
                              /**
                               * @cfg {String} title to show above hour slot
                               * Note: for titles to show set the {useTitle} config to true.
                               */
                              hoursTitle:'Hours',
                              
                              
                              /**
                               * @cfg {String} title to show above hour slot
                               * Note: for this to show set the {useTitle} config to true.
                               */
                              minutesTitle:'Minutes',
                              
                              
                              /**
                               * @cfg {boolean} show/hide title headers.
                               * Note: defaults to false (framework default 'Ext.picker.Picker')
                               */
                              
                              
                              slots: []
                              },
                              
                              
                              /**
                               *
                               * @param value
                               * @param animated
                               */
                              setValue:function (value, animated) {
                              var increment = this.getInitialConfig().increment,
                              modulo;
                              
                              if (Ext.isDate(value)) {
                              value = {
                              hours:value.getHours(),
                              minutes:value.getMinutes()
                              };
                              }
                              
                              
                              //Round minutes
                              modulo = value.minutes % increment;
                              if (modulo > 0) {
                              value.minutes = Math.round(value.minutes / increment) * increment;
                              }
                              this.callParent([value, animated]);
                              },
                              
                              
                              /**
                               * @override
                               * @returns {Date} A date object containing the selected hours and minutes. Year, month, day default to the current date..
                               */
                              getValue:function () {
                              var value = this.callParent(arguments),
                              date = new Date();
                              console.log("idic");
                              value = new Date(date.getFullYear(), date.getMonth(), date.getDate(), value.hours, value.minutes);
                              return value;
                              },
                              
                              
                              applySlots:function (slots) {
                              var me = this,
                              hours = me.createHoursSlot(),
                              minutes = me.createMinutesSlot();
                              
                              
                              return [hours, minutes];
                              },
                              
                              
                              createHoursSlot:function () {
                              var me = this,
                              initialConfig = me.getInitialConfig(),
                              title = initialConfig.hoursTitle ,
                              minHours = initialConfig.minHours,
                              maxHours = initialConfig.maxHours,
                              hours = [],
                              slot;
                              
                              
                              for (var i = minHours; i <= maxHours; i++) {
                              var text = (i < 10) ? ('0' + i) : i; //Add leading zero
                              hours.push({text:text, value:i});
                              }
                              
                              
                              slot = {
                              name:'hours',
                              align:'center',
                              title:title,
                              data:hours,
                              flex:1
                              };
                              
                              
                              return slot;
                              },
                              
                              
                              createMinutesSlot:function () {
                              var me = this,
                              initialConfig = me.getInitialConfig(),
                              title = initialConfig.minutesTitle ,
                              increment = initialConfig.increment,
                              minutes = [],
                              slot;
                              
                              
                              for (var j = 0; j < 60; j += increment) {
                              var text;
                              text = (j < 10) ? ('0' + j) : j; //Add leading zero
                              minutes.push({text:text, value:j});
                              }
                              
                              
                              slot = {
                              name:'minutes',
                              align:'center',
                              title:title,
                              data:minutes,
                              flex:1
                              };
                              return slot;
                              }
                              });

                   
    /**
     * TimePickerfield. Extends from datepickerfield
     */
                   Ext.define('Ext.ux.field.TimePicker', {
                              extend:'Ext.field.DatePicker',
                              xtype:'timepickerfield',
                              
                              
                              requires:['Ext.ux.picker.Time'],
                              
                              
                              config:{
                              dateFormat:'H:i', //Default format show time only
                              picker:true
                              },
                              
                              
                              /**
                               * @override
                               * @param value
                               * Source copied, small modification
                               */
                              applyValue:function (value) {
                              if (!Ext.isDate(value) && !Ext.isObject(value)) {
                              value = null;
                              }
                              
                              
                              // Begin modified section
                              if (Ext.isObject(value)) {
                              console.log("la");
                              var date = new Date(),
                              year = value.year || date.getFullYear(), // Defaults to current year if year was not supplied etc..
                              month = value.month || date.getMonth(),
                              day = value.day || date.getDate();
                              console.log("la");
                              
                              
                              value = new Date(year, month, day, value.hours, value.minutes); //Added hour and minutes
                              }
                              console.log(value);
                              // End modfied section!
                              return value;
                              },
                              
                              
                              
                              applyPicker:function (picker) {
                              picker = Ext.factory(picker, 'Ext.ux.picker.Time');
                              picker.setHidden(true); // Do not show picker on creeation
                              Ext.Viewport.add(picker);
                              return picker;
                              },
                              
                              
                              updatePicker:function (picker) {
                              picker.on({
                                        scope:this,
                                        change:'onPickerChange',
                                        hide:'onPickerHide'
                                        });
                            //  picker.setValue(this.getValue());
                              return picker;
                              }
                              });
                   
Ext.define('MyApp.view.Main', {
    extend: 'Ext.navigation.View',
    requires: [
	    'Ext.device.Connection',
    	'Ext.Ajax',
    	'Ext.dataview.List',
    	'Ext.Img',
        'Ext.util.DelayedTask',
    	'Ext.field.Search',
    	'Ext.form.Panel',
    	'Ext.field.Select',
    	'Ext.field.DatePicker',
    	'Ext.ux.TouchCalendarView'
    ],
    config: {
        id: 'navigation',
           defaultBackButtonText: 'Retour',
        listeners: {
			initialize: function() {
				Ext.require('MyData.Articles');
				Ext.require('MyData.IndexSpecialites');
			}
		},
        items: [
            {
                xtype: 'container',
                title: '28 jours',
                id: 'home',
                layout: {
                    type: 'vbox'
                },
                items: [
                    {
                        xtype: 'container',
                        height: '300px',
                        margin: '20 10 0 10',
                        style: {
                        	'text-align' : 'center'
                        },
                        items: {
                        	html: '<img style="width:90%;" src="resources/images/logo@2x.png" />'
                        }
                    },
                    {
                        xtype: 'container',
                        docked: 'bottom',
						defaults: {
							padding: 15,
							margin: 0
                        },
                        items: [
                            {
                                xtype: 'button',
                                ui: 'blue',
                                handler: function(button, event) {
                                	nextView = Ext.create("MyApp.view.Article", {
                                		id: 'menu'
                                	});
									Ext.getCmp("navigation").push(nextView)
                                },
                                text: 'Les moyens de contraception'
                            },
                            {
                                xtype: 'button',
                                ui: 'rose',
                                handler: function(button, event) {
                                	nextView = Ext.create("MyApp.view.listDrugs", {
                                		id: 'recherche',
                                		title: 'Recherche',
 										atc: 'G03AA,G03AB,G03AC,G03AD,G02BB',
										nopk: ''
	                               	});
									Ext.getCmp("navigation").push(nextView);
                                },
                                text: 'Recherche'
                            },
                            {
                                xtype: 'button',
                                ui: 'blue',
                                handler: function(button, event) {
							       var calendarView = Ext.create('Ext.ux.TouchCalendarView', {
							            viewMode: 'month',
							            weekStart: 1,
							            flex:1,
                                        id: 'calView',
							            selectedItemCls: 'on',
							            value: new Date(),
							            listeners: {
							            	periodchange: function(cmp, start, end) {
												lo = window.localStorage.getItem("alerte");
												if(lo==null) {
													myAppNative.myAlert = { prises : {} };
												} else {
													myAppNative.myAlert = JSON.parse(lo);
												}
										
												for(a in myAppNative.myAlert.prises) {
													val = Ext.Date.parse(a, 'd-m-Y');
													if(cmp.getDateCell(val)!=null) {
										   				cmp.getDateCell(val).addCls("check");
														cmp.getDateCell(val).dom.children[0].innerHTML = "Prise effectuée";
													}
												}
                                            },
							            	selectionchange: function(cmp, val) {
							            		if(cmp.getDateCell(val).hasCls("check")) {
                                                    myAppNative.removePrise({ prise: Ext.Date.format(val, 'd-m-Y') });
							            			cmp.getDateCell(val).removeCls("check");
							            			cmp.getDateCell(val).dom.children[0].innerHTML = "A prendre";
							            		} else {
                                                    myAppNative.setPrise({ prise: Ext.Date.format(val, 'd-m-Y') });
							            			cmp.getDateCell(val).addCls("check");
							            			cmp.getDateCell(val).dom.children[0].innerHTML = "Prise effectuée";
							            		}
							            	}
							            }
							        });
							
									atcs = ['G03AA','G03AB','G03AC','G03AD'];
									options = [];
									options.push({text: "", value: 0});					
									for(o in MyData.IndexSpecialites) {
										for(k in atcs) {
											atc = atcs[k];
											if(MyData.IndexSpecialites[o].atc.substring(0,atc.length)==atc) {
												options.push({text: MyData.IndexSpecialites[o].nom, value: MyData.IndexSpecialites[o].id});					
											} else if(MyData.IndexSpecialites[o].id=="16606") {
												options.push({text: MyData.IndexSpecialites[o].nom, value: MyData.IndexSpecialites[o].id});					
											}
										}
									}
							        var panel = Ext.create('Ext.Container', {
							            fullscreen: true,
							            layout: 'vbox',
							            title: 'Alertes',
							            items: [
							            	calendarView,
											{
				                                xtype: 'button',
				                                docked: 'bottom',
				                                padding:10,
				                                ui: 'blue',
				                                handler: function(button, event) {
													var nextView = Ext.create('Ext.form.Panel', {
													    layout: 'vbox',
                                                        scrollable: { direction: 'vertical' },
													    id: 'alform',
                                                        padding: 10,
													    defaults: {
													    	labelAlign: 'top',
													    	margin: '0px 0px 10px 0px'
													    },
													    items: [
													        {
																xtype: 'selectfield',
                                                                name: 'drug',
											                    label: 'Médicament',
											                    options: options
													        },
													        {
													            xtype: 'datepickerfield',
													            name: 'regles',
													            dateFormat: 'l d F Y',
													            picker: Ext.create('Ext.picker.Date', {
																	yearFrom: 2012,
																	yearTo  : 2015,
																	monthText: 'Mois',
																	slotOrder : ['day','month','year']
																}),
													            label: 'Date des dernières règles'
													        },
                                                            {
                                                                xtype: 'timepickerfield',
                                                                label: 'Heure d\'alerte',
                                                                value: {hours:13, minutes:00}, // object also possible {hours:12, minutes:25},
                                                                name: 'xtime',
                                                                picker:{
                                                                    height:300
                                                                }
                                                            },
                                                            {
													            xtype: 'textfield',
													            name: 'message',
													            value: 'Vous devez prendre votre pilule.',
													            label: 'Message à afficher'
                                                            },
                                                           
                                                            {
                                                                xtype: 'button',
                                                                width: '100%',
                                                                padding: 10,
                                                                ui: 'rose',
                                                                text: 'Valider',
                                                                handler: function() {
                                                                    val = Ext.getCmp("alform").getValues();
                                                                    start = Ext.Date.format(val.regles, 'Y-d-m');
                                                                		myAppNative.setAlert({ start: start, heure: val.xtime, message: val.message, drug: val.drug, prises:{} });
																		Ext.getCmp("navigation").pop();
 														        	}
														        }, {
                                                                xtype: 'button',
                                                                padding: 10,
                                                                text: 'Supprimer les alertes',
                                                                handler: function() {
                                                                	myAppNative.removeAlert({});
                                                                	Ext.getCmp("navigation").pop();
                                                                }
                                                                }
													    ]
													});
													Ext.getCmp("navigation").push(nextView)
				                                },
				                                text: 'Programmer mes alertes'
				                            }	
                            			]
							        });

									Ext.getCmp("navigation").push(panel)

									lo = window.localStorage.getItem("alerte");
									if(lo==null) {
										myAppNative.myAlert = { prises : {} };
									} else {
										myAppNative.myAlert = JSON.parse(lo);
									}
							
									for(a in myAppNative.myAlert.prises) {
										val = Ext.Date.parse(a, 'd-m-Y');
										if(Ext.getCmp('calView').getDateCell(val)!=null) {
							   				Ext.getCmp('calView').getDateCell(val).addCls("check");
											Ext.getCmp('calView').getDateCell(val).dom.children[0].innerHTML = "Prise effectuée";
										}
									}

                                },
                                text: 'Mes alertes'
                            }
                        ]
                    }
                ]
            }
        ]
    }

});


Ext.define('MyApp.view.listDrugs', {
    extend: 'Ext.Container',
    getList: function() {
		liste = [];
		atcs = this.config.atc.split(",");
		for(o in MyData.IndexSpecialites) {
			if(this.config.atc!="") {
				for(k in atcs) {
					atc = atcs[k];
					if(MyData.IndexSpecialites[o].atc.substring(0,atc.length)==atc) {
						if(this.config.nopk.indexOf(MyData.IndexSpecialites[o].id)=="-1") {
							liste.push({title: MyData.IndexSpecialites[o].nom, stitle: MyData.IndexSpecialites[o].sa, type: 'drug', pk: MyData.IndexSpecialites[o].id});					
						}
					}
				}
			} else {
				if(this.config.pk == MyData.IndexSpecialites[o].id) {
					liste.push({title: MyData.IndexSpecialites[o].nom, stitle: MyData.IndexSpecialites[o].sa, type: 'drug', pk: MyData.IndexSpecialites[o].id});					
				}
			}
		}
		return liste;
    }, 
    searchList: function(s) {
		liste = [];
		atcs = this.config.atc.split(",");
		for(o in MyData.IndexSpecialites) {
			if(this.atc!="") {
				for(k in atcs) {
					atc = atcs[k];
					if(MyData.IndexSpecialites[o].atc.substring(0,atc.length)==atc) {
						if(this.config.nopk.indexOf(MyData.IndexSpecialites[o].id)=="-1") {
							if(MyData.IndexSpecialites[o].nom.toLowerCase().indexOf(s.toLowerCase())>-1) {
								liste.push({title: MyData.IndexSpecialites[o].nom, stitle: MyData.IndexSpecialites[o].sa, type: 'drug', pk: MyData.IndexSpecialites[o].id});					
							}
						}
					}
				}
			} else {
				if(this.config.pk.indexOf(MyData.IndexSpecialites[o].id)>-1) {
					if(MyData.IndexSpecialites[o].nom.toLowerCase().indexOf(s.toLowerCase())>-1) {
						liste.push({title: MyData.IndexSpecialites[o].nom, stitle: MyData.IndexSpecialites[o].sa, type: 'drug', pk: MyData.IndexSpecialites[o].id});					
					}
				}
			}
		}
		return liste;
    }, 
	config: {
		id: "list",
		title: "",
		layout: 'vbox',
		listeners: {
			initialize: function() {
				ime = this;

				liste = this.getList();
				me = this;
				this.add({
					xtype: 'toolbar',
					docked: 'top',
					items: [
						{
							xtype: 'searchfield',
							id: 'drugssearch',
							flex: 1,
							labelAlign: 'bottom',
							placeHolder: 'recherche rapide',
							listeners: {
								change: function(a,v) {
									if(v.length>2) {
										liste = me.searchList(v);
										Ext.getCmp('results').getStore().setData(liste);
									}
									if(v.length==0) {
										liste = me.getList();
										Ext.getCmp('results').getStore().setData(liste);
									}
								}
							}
						}
					]
				});
				
				newView = Ext.create('Ext.List', {
					flex: 1,
					id: 'results',
					cls: "druglist",
				    store: {
				        fields: ['title', 'stitle', 'type','pk'],
				        data: liste
				    },
				    itemTpl: '<span class="nom">{title}</span><br/><span class="molecule">{stitle}</span>',
				    listeners: {
				    	select: function(view, record) { ime.onSelect(record); }
				    }
				});
				this.add(newView);
			}
		}
	},
	
	onSelect: function(record) {
		newView = Ext.create('MyApp.view.Drug', {
			pk: record.get('pk'),
			title: record.get('title'),
			sa: record.get('stitle')
		});
		Ext.getCmp('navigation').add(newView);
	}

});


Ext.define('MyApp.view.Article', {
    extend: 'Ext.Container',
	config: {
		id: "",
		title: "Les moyens",
		layout: 'vbox',
		listeners: {
			initialize: function() {
				xxme = this;
				switch(this.id) {
					case "menu":
						liste = [];
						for(o in MyData.Articles) {
							liste.push({title: MyData.Articles[o].title, type: 'section', key: o});
						}
						newView = Ext.create('Ext.List', {
							flex: 1,
						    store: {
						        fields: ['title', 'key', 'type'],
						        data: liste
						    },
						    itemTpl: '{title}',
						    listeners: {
						    	itemtap: function(view, index, target, record) { xxme.onSelectArticle(record); }
						    }
						});
						this.add(newView);
						break;
				
				}
			}
		}
	},
	
	onSelectArticle: function(record) {
		if(record.get('type')=='section') {
			liste = [];
			for(o in MyData.Articles[record.get('key')].content) {
				liste.push({title: MyData.Articles[record.get('key')].content[o].title, xparent: record.get('title'), type: record.get('key'), key: o});
			}
			xme = this;
			newView = Ext.create('Ext.Container', {
				title: record.get('title'),
				layout:'vbox',
				items: [{
					xtype:'list',
					flex: 1,
				    store: {
				        fields: ['title', 'key', 'type','xparent'],
				        data: liste
				    },
				    itemTpl: '{title}',
				    listeners: {
						itemtap: function(view, index, target, record) { xme.onSelectArticle(record); }
				    }					
				}]
			});
			Ext.getCmp('navigation').add(newView);
		} else {
			if(record.get('key')=="lespilules" || record.get('key')=="RW4gY2FzIGQnb3VibGkN") {
				nextView = Ext.create("MyApp.view.listDrugs", {
					id: 'lespilules',
					atc: 'G03AA,G03AB,G03AC',
					nopk : '16226',
					title: 'Les pilules'
				});
				Ext.getCmp("navigation").push(nextView)		
			} else if(record.get('key')=="lespatchs") {
				nextView = Ext.create("MyApp.view.listDrugs", {
					id: 'lespatchs',
					atc : '',
					nopk: '',
					pk: '16226',
					title: 'Les patchs'
				});
				Ext.getCmp("navigation").push(nextView)		
			} else if(record.get('key')=="lesanneaux") {
				nextView = Ext.create("MyApp.view.listDrugs", {
					id: 'lesanneaux',
					atc: '',
					pk: '16606',
					title: 'Les anneaux vagniaux'
				});
				Ext.getCmp("navigation").push(nextView)		
			} else if(record.get('key')=="urgence") {
				nextView = Ext.create("MyApp.view.listDrugs", {
					id: 'urgence',
					atc: 'G03AD',
					nopk: '',
					title: 'Les contraceptifs d\'urgence'
				});
				Ext.getCmp("navigation").push(nextView)		
			} else {
				text = MyData.Articles[record.get('type')].content[record.get('key')].data;
				newView = Ext.create('Ext.Container', {
					title: record.get('xparent'),
					cls : 'page',
					scrollable: {
						direction: 'vertical'
					},
					layout:'auto',
					html: "<h1>"+record.get('title')+"</h1><div class='content'>"+text+"</div>",
				});
				Ext.getCmp('navigation').add(newView);
			}
		}
	}

});


MyDrug = {};

Ext.define('MyApp.view.Drug', {
    extend: 'Ext.Container',
	config: {
		id: "",
		layout: 'vbox',
		listeners: {
			initialize: function() {
				Ext.getCmp('drugheader').setHtml('<h1>'+this.title+'</h1><span>'+this.sa+'</span>');
				var pk = this.config.pk;
				Ext.Ajax.request({
					url: 'MyData/drugs/'+this.config.pk.substring(0,1)+'/'+this.config.pk.substring(1,2)+'/'+this.config.pk.substring(2,3)+'/data.json',
					success: function(response, opts) {
						data = JSON.parse(response.responseText);
						MyDrug = data[pk];
					},
					failure: function(response, opts) {
						//iOS in phonegap returns response.status=0 on success
						if(response.status == 0 && response.responseText != ''){

						} else {

						}
					}
				});

			}
		},
		items : [{
			id: 'drugheader',
			height:'66px',
			cls: 'header',
			html: '<div></div>'
		}
		/*,{
			xtype: 'container',
			height:'15%',
			items: [{
				xtype: 'button',
              	handler: function(button, event) {
                	nextView = Ext.create("MyApp.view.Article", {
                     	id: 'menu'
                   	});
					Ext.getCmp("navigation").push(nextView)
				},
				margin:10,
				padding: 10,
				text: 'Posologie'
			},
			{
				xtype: 'button',
              	handler: function(button, event) {
                	nextView = Ext.create("MyApp.view.Article", {
                     	id: 'menu'
                   	});
					Ext.getCmp("navigation").push(nextView)
				},
				margin: 10,
				text: 'Les moyens de contraception'
			}
			]
		}
		*/, {
			xtype: 'list',
			flex:1,
			store: {
				fields: ['title', 'key'],
		        data: [
		        	{ title: "En cas d'oubli", key: "retard" },
		        	{ title: "Indications", key: "indications" },
		        	{ title: "Composition", key: "composition" },

		        	{ title: "Posologie", key: "posoad" },
		        	{ title: "Présentations", key: "presentations" },
		        	{ title: "Génériques", key: "generiques" },

		        	{ title: "Effets indésirables", key: "effetsindpatients" },
		        	{ title: "Précautions d'emploi", key: "precautions" },
		        	{ title: "Contre-Indications", key: "contreindications" },
		        	{ title: "Surdosage", key: "surdosage" }
		        ]
			},
			itemTpl: '{title}',
			listeners: {
				itemtap: function(view, index, target, record) { view.parent.onSelect(record,MyDrug); }
			}
		}
		]
	},
	
	onSelect: function(record, MyDrug) {

		var me = this;
		nom = MyDrug.data.nom;
		sa = MyDrug.data.sa;
		data = MyDrug.data[record.get('key')];
		
		xitems = [];
		index = 0;
		
		xitems.push({
			xtype: 'panel',
			cls: [
				'header'
			],
			html: '<h1>'+nom+'</h1><span>'+sa+'</span>'
		});

		switch(record.get('key')) {
			case "posobb":
			case "posoen":
			case "posoad":
			case "pososa":
				xhtml = "<h2>"+data.title+"</h2>";
				for(var o in data.data) {
					xhtml += "<div class='zone'>";
					xhtml += "<h3>"+data.data[o].title+"</h3>";
					
					for(p in data.data[o].data) {
					
						dd = data.data[o].data[p];
						
						xhtml += "<h4>"+dd.title+"</h4>";

						for(j in dd.data) {
	
							xhtml += "<ul class='poso'>";
								xhtml += "<h5>"+dd.data[j].title+"</h5>";
								xhtml += "<li>"+dd.data[j].texte.replace("\n","<li></li>")+"</li>";
							xhtml += "</ul>";
						
						}
						
						xhtml += "<div style='font-size:14px; margin-top:5px;'>"+dd.fulltext.replace(/\n/g,"<br/>")+"</div>";						
												
					}				

					xhtml += "</div>";		
					xitems.push({
						xtype: 'panel',
						cls: ['section'],
						html: xhtml
					});
		
				}			
			
				break;
			case "composition":
				delete data.sa;
				for(var o in data) {
					xhtml = "<h2>"+data[o].title+"</h2>";
					
					for(p in data[o].data) {
						
						xhtml += "<div class='zone'>";
						xhtml += "<h3>"+data[o].data[p].title+"</h3>";
						xhtml += "<table>";
						xhtml += "<tr>";
						for(var j in data[o].data[p].htable) {
							xhtml += "<td>"+data[o].data[p].htable[j]+"</td>";
						}
						xhtml += "</tr>";
	
						for(var j in data[o].data[p].table) {
							xhtml += "<tr>";
							dd = data[o].data[p].table[j];
							for(var k in dd.champs) {
								xhtml += "<td>"+dd.champs[k]+"</td>";
							}		
							xhtml += "</tr>";
						}					
						xhtml += "</table>";
						xhtml += "</div>";
					}				
		
					xitems.push({
						xtype: 'panel',
						cls: ['section'],
						html: xhtml
					});
		
				}			
			
				break;
			default: 
			
				for(var o in data) {
					xhtml = "<h2>"+data[o].title+"</h2>";
					xhtml += "<ul class='zone'>";
					for(var j in data[o].data) {
						xhtml += "<li>";
						dd = data[o].data[j];
						if(typeof(dd.title)!="undefined") {
							xhtml += "<h3>"+dd.title+"</h3>";
						}
						if(typeof(dd.stitle)!="undefined") {
							xhtml += "<span class='stitle'>["+dd.stitle+"]</span>";
						}

						if(typeof(dd.points)!="undefined") {
							xhtml += "<ul>";
							for(k in dd.points) {
								xhtml += "<li>"+dd.points[k]+"</li>";
							}
							xhtml += "</ul>";
						}
						
						if(typeof(dd.text)!="undefined") {
							xhtml += "<div class='content'>"+dd.text+"</div>";
						}

						if(typeof(dd.data)!="undefined") {
							for(k in dd.data) {
								if(typeof(dd.data[k].points)!="undefined") {
									xhtml += "<ul>";
									for(l in dd.data[k].points) {
										xhtml += "<li>"+dd.data[k].points[l]+"</li>";
									}
									xhtml += "</ul>";
								} else {
									xhtml += "<div class='content'><strong>"+dd.data[k].title+" : </strong>"+dd.data[k].text+"</div>";							
								}
							}
						}
		
						xhtml += "</li>";
					}
					xhtml += "</ul>";
		
					xitems.push({
						xtype: 'panel',
						cls: ['section'],
						html: xhtml
					});
		
				}
				break;
		
		}
		
		Ext.getCmp('navigation').push({
			xtype: 'container',
			title: nom,
			id: 'DrugDetails',
			cls: ['drugdetails'], 
			scrollable: true,
			layout: {
				type: 'vbox'
			},
			items: xitems
		});
	
	}

});


MyData.Articles = {
  "la-pilule":{
    "title":"La pilule",
    "content":{
      "TGEgcGlsdWxlLCBjJ2VzdCBxdW9pID8N":{
        "title":"La pilule, c'est quoi ?",
        "data":"La pilule est un m\u00e9dicament disponible en pharmacie sur ordonnance.<br \/><br \/>Il en existe 2 types : les pilules combin\u00e9es, dites oestro-progestatives qui contiennent de l'oestrog\u00e8ne et de la progest\u00e9rone et les pilules progestatives (ou microprogestatives) contenant uniquement de la progest\u00e9rone.<br \/><div class='attention'>Attention, la pilule ne prot\u00e8ge pas des Infections Sexuellement Transmissibles (IST).<\/div>"
      },
      "TcOpY2FuaXNtZSBkJ2FjdGlvbg0=":{
        "title":"M\u00e9canisme d'action",
        "data":"La pilule oestro-progestative (dite \"combin\u00e9e\") agit principalement en bloquant l'ovulation, elle modifie l'endom\u00e8tre (muqueuse tapissant l'int\u00e9rieur de l'ut\u00e9rus) de fa\u00e7on \u00e0 ce qu'il ne puisse pas accueillir un \u00e9ventuel oeuf et modifiant la glaire pour emp\u00eacher les spermatozo\u00efdes de franchir le col.<br \/><br \/>La micropilule (microdoses de progestatif) agit uniquement en modifiant la glaire pour emp\u00eacher les spermatozo\u00efdes de franchir le col -  Certaines  micropilules peuvent aussi bloquer l'ovulation.<br \/><div class='attention'>Attention, la pilule ne prot\u00e8ge pas des Infections Sexuellement Transmissibles.<\/div>"
      },
      "VXRpbGlzYXRpb24N":{
        "title":"Utilisation",
        "data":"<li>Si la boite contient 28 comprim\u00e9s, il faut prendre un comprim\u00e9 tous les jours \u00e0 heure fixe, sans s'arr\u00eater entre les plaquettes.<\/li><li>Si la boite contient 21 comprim\u00e9s, il faut prendre un comprim\u00e9 par jour \u00e0 heure fixe pendant 21 jours, puis s'arr\u00eater pendant 7 jours (p\u00e9riode des r\u00e8gles) avant de recommencer une nouvelle plaquette.<\/li><br \/>Pour commencer la pilule et donc la premi\u00e8re plaquette, le premier comprim\u00e9 doit \u00eatre pris le premier jour des r\u00e8gles. D\u00e8s le premier comprim\u00e9, vous \u00eates prot\u00e9g\u00e9e d'une \u00e9ventuelle grossesse.<br \/><br \/>Sinon, vous pouvez commencer la pilule \u00e0 n'importe quel jour du cycle mais il faudra attendre 7 jours de prise pour \u00eatre prot\u00e9g\u00e9e d'une \u00e9ventuelle grossesse. Pendant les 7 premiers jours utilisez des pr\u00e9servatifs."
      },
      "RWZmaWNhY2l0w6kN":{
        "title":"Efficacit\u00e9",
        "data":"Efficacit\u00e9 excellente<br \/><br \/>Elle peut cependant \u00eatre compromise dans les cas suivants :<li>Oublis (plus ou moins graves selon le type de pilule et la p\u00e9riode du cycle)<\/li><li>Non absorption du comprim\u00e9 et diminution d'efficacit\u00e9 en cas de vomissements ou de diarrh\u00e9es<\/li><li>Interaction avec certains m\u00e9dicaments<\/li>"
      },
      "QXZhbnRhZ2VzDQ==":{
        "title":"Avantages",
        "data":"<li>Efficacit\u00e9 excellente<\/li><li>Tol\u00e9rance excellente<\/li><li>R\u00e9versibilit\u00e9<\/li><li>R\u00e9gularit\u00e9 des cycles<\/li><li>Diminution du volume et des douleurs des r\u00e8gles <\/li>"
      },
      "SW5jb252w6luaWVudHMN":{
        "title":"Inconv\u00e9nients",
        "data":"N\u00e9cessit\u00e9 d'une bonne observance (prise du comprim\u00e9 \u00e0 heure fixe sans oubli)"
      },
      "Q29udHJlLWluZGljYXRpb25zLCBQcsOpY2F1dGlvbnMgZCdlbXBsb2kN":{
        "title":"Contre-indications, Pr\u00e9cautions d'emploi",
        "data":"<li>Anomalie de la coagulation sanguine<\/li><li>Ant\u00e9c\u00e9dent d'accident thrombo-embolique ou de thrombose art\u00e9rielle<\/li><li>Certains cancers<\/li><li>Certaines migraines<\/li><li>Certaines affections h\u00e9patiques<\/li><li>Hypercholest\u00e9rol\u00e9mie<\/li><li>Hypertension art\u00e9rielle<\/li><li>Tabagisme<\/li><li>Varices<\/li><li>Certaines interactions m\u00e9dicamenteuses<\/li>"
      },
      "RWZmZXRzIGluZMOpc2lyYWJsZXMN":{
        "title":"Effets ind\u00e9sirables",
        "data":"<h2>Migraine<\/h2>Un mauvais dosage peut provoquer des migraines. Si cela persiste parlez-en \u00e0 votre m\u00e9decin.<h2>Prise de poids<\/h2>La prise de poids est possible mais souvent tr\u00e8s mod\u00e9r\u00e9e, r\u00e9versible, et peut \u00eatre parfaitement maitris\u00e9e.<h2>Spottings : saignements en dehors des r\u00e8gles<\/h2>Il faut continuer normalement la prise de la pilule car cet effet est g\u00e9n\u00e9ralement transitoire. Si cela persiste plus de trois mois, consultez votre m\u00e9decin.<h2>Naus\u00e9es<\/h2>Prendre la pilule au milieu des repas. Si cela persiste, consultez votre m\u00e9decin.<h2>Douleurs et gonflements des seins<\/h2>Sans danger, si cela persiste consultez votre m\u00e9decin pour revoir la prescription."
      },
      "SWTDqWVzIHJlw6d1ZXMN":{
        "title":"Id\u00e9es re\u00e7ues",
        "data":"<h2>La pilule fait grossir<\/h2>Oui avec les anciennes pilules fortement dos\u00e9es.Non avec les nouvelles pilules faiblement dos\u00e9es.En fait, il y a une possibilit\u00e9 d'augmentation de l'app\u00e9tit les premiers mois de la prise mais la prise de poids reste minime.<h2>La pilule donne des boutons<\/h2>Non, en g\u00e9n\u00e9ral elle est bien tol\u00e9r\u00e9e et m\u00eame certaines pilules peuvent am\u00e9liorer l'acn\u00e9.<h2>Il y a un risque de cancer<\/h2>La contraception orale n'est pas associ\u00e9e \u00e0 un risque accru de cancer. Les femmes prenant la pilule ont une meilleure surveillance m\u00e9dicale donc un meilleur d\u00e9pistage. En revanche, la contraception orale est contre-indiqu\u00e9e en cas de certains cancers (le sein par exemple)<h2>La pilule prot\u00e8ge des Infections Sexuellement Transmissibles<\/h2>Non, en cas de rapport \u00e0 risque d'Infections Sexuellement Transmissibles utiliser des pr\u00e9servatifs.<h2>La pilule rend st\u00e9rile<\/h2>Aucun effet sur la fertilit\u00e9, elle est r\u00e9tablie d\u00e8s l'arr\u00eat de la pilule.<h2>La pilule doit \u00eatre arr\u00eat\u00e9e quelques mois avant une grossesse<\/h2>D\u00e8s l'arr\u00eat de la pilule, une grossesse peut survenir puisque des cycles ovulatoires peuvent revenir d\u00e8s le mois suivant.On observe parfois une p\u00e9riode d'am\u00e9norrh\u00e9e (sans r\u00e8gles) de quelques cycles apr\u00e8s l'arr\u00eat de la pilule.Si une grossesse survient sous pilule (oubli) ou juste apr\u00e8s l'arr\u00eat, la grossesse ne comporte pas de risque sp\u00e9cifique.<h2>On doit arr\u00eater la pilule de temps en temps<\/h2>Non, on peut la prendre aussi longtemps que n\u00e9cessaire mais son renouvellement doit \u00eatre r\u00e9guli\u00e8rement rediscut\u00e9.<h2>Il y a un \u00e2ge pour commencer la pilule<\/h2>Non, on peut la prendre d\u00e8s que l'on fait la demande d'une contraception. Elle peut \u00eatre \u00e9galement prescrite dans un but th\u00e9rapeutique (r\u00e9gularisation des cycles), et \u00eatre commenc\u00e9e \u00e0 un plus jeune \u00e2ge tel que le d\u00e9but de l'adolescence.<h2>On ne peut pas prendre la pilule si on fume<\/h2>L'association pilule et tabac augmentent certains risques cardiovasculaires. Ce risque est major\u00e9 avec l'\u00e2ge. Avant 35 ans, la prise de pilule est possible mais avec certaines pr\u00e9cautions. Apr\u00e8s 35 ans, elle est vivement d\u00e9conseill\u00e9e. Dans tous les cas il faut en parler \u00e0 votre m\u00e9decin."
      },
      "SW5mb3JtYXRpb25zIGNvbXBsw6ltZW50YWlyZXMN":{
        "title":"Informations compl\u00e9mentaires",
        "data":"<li>Disponible en pharmacie sur ordonnance<\/li><li>La pilule co\u00fbte entre 1,70 euros \u00e0 15 euros \u00e0 chaque cycle.<\/li><li>Certaines pilules sont rembours\u00e9es par l'assurance maladie.<\/li>"
      },
      "lespilules":{
        "title":"Les diff\u00e9rentes pilules",
        "data":"Cette partie sera li\u00e9e directement \u00e0 la section m\u00e9dicaments de l'application. Donn\u00e9es officielles ANSM (AFSSAPS)."
      },
      "RW4gY2FzIGQnb3VibGkN":{
        "title":"En cas d'oubli",
        "data":"Cette partie sera li\u00e9e directement \u00e0 la section m\u00e9dicaments de l'application. Donn\u00e9es officielles ANSM (AFSSAPS)."
      }
    }
  },
  "le-preservatif-masculin-":{
    "title":"Le pr\u00e9servatif masculin ",
    "content":{
      "TGUgcHLDqXNlcnZhdGlmIG1hc2N1bGluLCBjJ2VzdCBxdW9pID8N":{
        "title":"Le pr\u00e9servatif masculin, c'est quoi ?",
        "data":"Le pr\u00e9servatif masculin est un \u00e9tui mince et souple en latex ou en polyur\u00e9thane (en cas d'allergie au latex). "
      },
      "TcOpY2FuaXNtZSBkJ2FjdGlvbg0=":{
        "title":"M\u00e9canisme d'action",
        "data":"De part sa structure imperm\u00e9able il emp\u00eache le passage des spermatozo\u00efdes dans le vagin, et donc la f\u00e9condation.<br \/><br \/>Il est le seul contraceptif \u00e0 prot\u00e9ger des infections sexuellement transmissibles"
      },
      "VXRpbGlzYXRpb24N":{
        "title":"Utilisation",
        "data":"Il est \u00e0 usage unique, il faut utiliser un pr\u00e9servatif \u00e0 chaque rapport sexuel.<br \/><br \/>Il se d\u00e9roule sur le p\u00e9nis en \u00e9rection avant la p\u00e9n\u00e9tration et retient le sperme. Avant la fin de l'\u00e9rection, il faut se retirer en retenant le pr\u00e9servatif \u00e0 la base du p\u00e9nis, puis faire un noeud et le jeter \u00e0 la poubelle."
      },
      "RWZmaWNhY2l0w6kN":{
        "title":"Efficacit\u00e9",
        "data":"Sous r\u00e9serve d'\u00eatre correctement utilis\u00e9, l'efficacit\u00e9 du pr\u00e9servatif masculin est bonne.<br \/><br \/>Pour \u00eatre efficace le pr\u00e9servatif doit \u00eatre utilis\u00e9 pour TOUS les rapports sexuels, \u00e0 TOUT moment du cycle, car il n'y a pas de p\u00e9riode \"sans risque\"."
      },
      "QXZhbnRhZ2VzDQ==":{
        "title":"Avantages",
        "data":"<li>Protection des infections sexuellement transmissibles<\/li><li>Facilit\u00e9 de procuration (pharmacies, grandes surfaces)<\/li><li>Disponibilit\u00e9 pour des rapports non planifi\u00e9s<\/li><li>Sans ordonnance m\u00e9dicale<\/li>"
      },
      "SW5jb252w6luaWVudHMN":{
        "title":"Inconv\u00e9nients",
        "data":"<li>Peut diminuer la spontan\u00e9it\u00e9 du rapport sexuel<\/li><li>L'efficacit\u00e9 contraceptive est inf\u00e9rieure \u00e0 celui de la pilule et du st\u00e9rilet<\/li>"
      },
      "Q29udHJlLUluZGljYXRpb25zDQ==":{
        "title":"Contre-Indications",
        "data":"<li>Aucune<\/li><li>Si allergie au latex : existence de pr\u00e9servatif en polyur\u00e9thane<\/li>"
      },
      "UHLDqWNhdXRpb25zIGQnZW1wbG9pDQ==":{
        "title":"Pr\u00e9cautions d'emploi",
        "data":"<li>Ne pas utiliser le pr\u00e9servatif apr\u00e8s la date de p\u00e9remption<\/li><li>Usage unique<\/li><li>Manipuler le pr\u00e9servatif avec soin lors de l'ouverture (ne pas le d\u00e9chirer, attention aux ongles)<\/li><li>Ne jamais utiliser deux pr\u00e9servatifs l'un sur l'autre<\/li><li>Utiliser du lubrifiant aqueux ou hydrosoluble adapt\u00e9 (ne pas utiliser de la vaseline, l'huile...qui peuvent rendre le latex poreux et diminue son efficacit\u00e9)<\/li><li>Conserver le pr\u00e9servatif dans un endroit frais et sec<\/li><li>Enlever de sa pochette avec les mains (pas de ciseaux ou d'ustensiles coupants)<\/li>"
      },
      "SW5mb3JtYXRpb25zIGNvbXBsw6ltZW50YWlyZXMN":{
        "title":"Informations compl\u00e9mentaires",
        "data":"<li>Co\u00fbte entre 20 centimes \u00e0 1€ l'unit\u00e9.<\/li><li>D\u00e9livr\u00e9 en pharmacies, grandes surfaces, station-service ou dans les distributeurs automatiques.<\/li><li>Gratuit dans les centres de planification et d'\u00e9ducation familiale (CPEF).<\/li>"
      },
      "RW4gY2FzIGRlIHByb2Jsw6htZQ0=":{
        "title":"En cas de probl\u00e8me",
        "data":"<li>Si le pr\u00e9servatif est perc\u00e9 ou fuit, vous n'\u00eates plus prot\u00e9g\u00e9 ni d'une \u00e9ventuelle grossesse ni d'une infection sexuellement transmissible.<\/li><li>Il faut prendre une contraception d'urgence, faire un d\u00e9pistage des infections sexuellement transmissibles ou consulter un m\u00e9decin.<\/li>"
      }
    }
  },
  "le-preservatif-feminin-":{
    "title":"Le pr\u00e9servatif f\u00e9minin ",
    "content":{
      "TGUgcHLDqXNlcnZhdGlmIGbDqW1pbmluLCBjJ2VzdCBxdW9pID8N":{
        "title":"Le pr\u00e9servatif f\u00e9minin, c'est quoi ?",
        "data":"Le pr\u00e9servatif f\u00e9minin est une gaine en nitrile ou en polyur\u00e9thane munie d'un anneau souple aux deux extr\u00e9mit\u00e9s."
      },
      "TcOpY2FuaXNtZSBkJ2FjdGlvbg0=":{
        "title":"M\u00e9canisme d'action",
        "data":"Le pr\u00e9servatif f\u00e9minin, plac\u00e9 dans le vagin, emp\u00eache le passage des spermatozo\u00efdes.<br \/><br \/>Le pr\u00e9servatif est le seul contraceptif \u00e0 prot\u00e9ger des infections sexuellement transmissibles"
      },
      "VXRpbGlzYXRpb24N":{
        "title":"Utilisation",
        "data":"Le pr\u00e9servatif f\u00e9minin se place dans le vagin, afin de recevoir le sexe masculin au moment de la p\u00e9n\u00e9tration. Il peut \u00eatre mis en place plusieurs heures avant le rapport sexuel et doit \u00eatre chang\u00e9 \u00e0 chaque rapport.<br \/><br \/>Mode d'emploi :<li>Se mettre dans une position confortable et sortir le pr\u00e9servatif avec pr\u00e9caution.<\/li><li>Presser l'anneau interne entre le pouce et l'index et l'ins\u00e9rer au fond du vagin aussi loin que possible.<\/li><li>Passer l'index \u00e0 l'int\u00e9rieur du pr\u00e9servatif et pousser l'anneau encore plus au fond du vagin.<\/li><li>L'anneau externe doit rester \u00e0 l'ext\u00e9rieur sur la vulve.<\/li><li>Pour retirer le pr\u00e9servatif, tirer le en le vrillant.<\/li>"
      },
      "RWZmaWNhY2l0w6kN":{
        "title":"Efficacit\u00e9",
        "data":"Sous r\u00e9serve d'\u00eatre correctement utilis\u00e9, l'efficacit\u00e9 du pr\u00e9servatif f\u00e9minin est bonne.<br \/><br \/>Pour \u00eatre efficace le pr\u00e9servatif doit \u00eatre utilis\u00e9 pour TOUS les rapports sexuels, \u00e0 TOUT moment du cycle, car il n'y a pas de p\u00e9riode \"sans risque\"."
      },
      "QXZhbnRhZ2VzDQ==":{
        "title":"Avantages",
        "data":"<li>Prot\u00e8ge des infections sexuellement transmissibles<\/li><li>Sans ordonnance m\u00e9dicale<\/li><li>La mise en place peut se faire avant le rapport sexuel<\/li><li>Disponible pour des rapports non planifi\u00e9s<\/li>"
      },
      "SW5jb252w6luaWVudHMN":{
        "title":"Inconv\u00e9nients",
        "data":"<li>Son aspect peut d\u00e9courager certains<\/li><li>La mise en place peut \u00eatre d\u00e9licate<\/li><li>L'efficacit\u00e9 contraceptive est inf\u00e9rieure \u00e0 celui de la pilule et du st\u00e9rilet<\/li>"
      },
      "Q29udHJlLUluZGljYXRpb25zDQ==":{
        "title":"Contre-Indications",
        "data":"Aucune"
      },
      "UHLDqWNhdXRpb25zIGQnZW1wbG9pDQ==":{
        "title":"Pr\u00e9cautions d'emploi",
        "data":"<li>Ne pas utiliser le pr\u00e9servatif apr\u00e8s la date de p\u00e9remption<\/li><li>Usage unique<\/li><li>Manipuler le pr\u00e9servatif avec soin lors de l'ouverture (ne pas le d\u00e9chirer, attention aux ongles)<\/li><li>Conserver le pr\u00e9servatif dans un endroit frais et sec<\/li><li>Enlever de sa pochette avec les mains (pas de ciseaux ou d'ustensiles coupants)<\/li><li>Ne pas l'utiliser avec un pr\u00e9servatif masculin<\/li>"
      },
      "SW5mb3JtYXRpb25zIGNvbXBsw6ltZW50YWlyZXMN":{
        "title":"Informations compl\u00e9mentaires",
        "data":"<li>Le prix d'une boite de 3 pr\u00e9servatifs varie d'une pharmacie \u00e0 l'autre et avoisine les 7€.<\/li><li>D\u00e9livr\u00e9 en pharmacies ou sur internet.<\/li><li>Gratuit dans les centres de planification et d'\u00e9ducation familiale (CPEF).<\/li>"
      },
      "RW4gY2FzIGRlIHByb2Jsw6htZQ0=":{
        "title":"En cas de probl\u00e8me",
        "data":"Si le pr\u00e9servatif est perc\u00e9 ou fuit vous n'\u00eates plus prot\u00e9g\u00e9e ni d'une \u00e9ventuelle grossesse ni d'une infection sexuellement transmissible.<br \/><br \/>Il faut prendre une contraception d'urgence, faire un d\u00e9pistage des infections sexuellement transmissibles ou consulter un m\u00e9decin."
      }
    }
  },
  "les-methodes-naturelles":{
    "title":"Les m\u00e9thodes naturelles",
    "content":{
      "TGVzIG3DqXRob2RlcyBuYXR1cmVsbGVzLCBjJ2VzdCBxdW9pID8N":{
        "title":"Les m\u00e9thodes naturelles, c'est quoi ?",
        "data":"On qualifie de \"naturelles\" toutes les m\u00e9thodes qui visent \u00e0 identifier la p\u00e9riode de l'ovulation de mani\u00e8re \u00e0 \u00e9viter d'avoir des rapports sexuels f\u00e9condants \u00e0 ce moment-l\u00e0. Ces m\u00e9thodes vont des plus simples aux plus sophistiqu\u00e9es."
      },
      "QXZhbnRhZ2VzDQ==":{
        "title":"Avantages",
        "data":"<li>Gratuit<\/li><li>Pas de materiel<\/li>"
      },
      "SW5jb252w6luaWVudHMN":{
        "title":"Inconv\u00e9nients",
        "data":"<li>N\u00e9cessite de bien se conna\u00eetre<\/li><li>Peut \u00eatre contraignant<\/li><li>Fiabilit\u00e9 discutable<\/li><li>Davantage pour l'espacement des naissances<\/li><li>Ne prot\u00e8ge pas des infections sexuellement transmissibles<\/li>"
      },
      "TGUgcmV0cmFpdA0=":{
        "title":"Le retrait",
        "data":"L'homme se retire du vagin de sa partenaire avant d'avoir \u00e9jacul\u00e9. Si l'\u00e9jaculation n'a pas lieu dans le vagin (ni juste \u00e0 l'entr\u00e9e du vagin), il ne peut pas y avoir de grossesse, car les spermatozo\u00efdes ne peuvent pas entrer dans l'ut\u00e9rus."
      },
      "TCdhYnN0aW5lbmNlIHDDqXJpb2RpcXVlIG91IG3DqXRob2RlIE9naW5vDQ==":{
        "title":"L'abstinence p\u00e9riodique ou m\u00e9thode Ogino",
        "data":"Elle consiste, pour une femme dont le cycle est r\u00e9gulier, \u00e0 \u00e9viter les rapports sexuels non prot\u00e9g\u00e9s pendant les jours \"fertiles\" qui pr\u00e9c\u00e8dent ou suivent l'ovulation. M\u00e9thode de calcul de la p\u00e9riode f\u00e9conde \u00ab th\u00e9orique \u00bb pendant laquelle il faut \u00e9viter les rapports sexuels non prot\u00e9g\u00e9s :<li>Au pr\u00e9alable, il faut avoir compt\u00e9 la dur\u00e9e de ses cycles sur 1 an.<\/li><li>Le premier jour de la p\u00e9riode f\u00e9conde correspond \u00e0 10 + longueur cycle le plus court - 28<\/li><li>Le dernier jour de la p\u00e9riode f\u00e9conde correspond \u00e0 17 + longueur du cycle le plus long - 28<\/li>Il ne faudra pas avoir de rapports entre ces 2 jours du cycle"
      },
      "TGEgIm3DqXRob2RlIGRlcyB0ZW1ww6lyYXR1cmVzIiAN":{
        "title":"La \"m\u00e9thode des temp\u00e9ratures\" ",
        "data":"En seconde partie de cycle, il y a \u00e9l\u00e9vation de la temp\u00e9rature chez la femme. Le moment de l'\u00e9l\u00e9vation de la temp\u00e9rature correspond \u00e0 l'ovulation, avec un \u00e9cart possible de 5 jours.<br /><br />La p\u00e9riode de f\u00e9condit\u00e9 est de 3 jours avant le pic et un jour apr\u00e8s.<br /><br />Prendre chaque matin avant de se lever la temp\u00e9rature, et \u00e9valuer le moment d'\u00e9valuation de la temp\u00e9rature.Des applications mobiles ou internet permettent de suivre le relev\u00e9 de temp\u00e9ratures."
      },
      "TCdvYnNlcnZhdGlvbiBkZSBsYSBnbGFpcmUgY2VydmljYWxlIG91ICJtw6l0aG9kZSBkZSBCaWxsaW5ncyIN":{
        "title":"L'observation de la glaire cervicale ou \"m\u00e9thode de Billings\"",
        "data":"C'est une m\u00e9thode o\u00f9 la femme appr\u00e9cie les sensations au niveau de la vulve et l'aspect de la glaire cervicale. A l'approche de l'ovulation, les s\u00e9cr\u00e9tions du col de l'ut\u00e9rus (ou \"glaire cervicale\") se modifient ; elle deviennent plus abondantes, plus fluides et provoquent un \u00e9coulement vaginal (ou \"pertes blanches\") caract\u00e9ristique. <br /><br />C'est pendant cette p\u00e9riode qu'il ne faut pas avoir de rapports sexuels. <br /><br /> Cette m\u00e9thode n\u00e9cessite un apprentissage."
      },
      "TGEgbcOpdGhvZGUgTUFNQSAobcOpdGhvZGUgZGUgbCdhbGxhaXRlbWVudCBtYXRlcm5lbCBldCBkZSBsJ2Ftw6lub3JyaMOpZSkN":{
        "title":"La m\u00e9thode MAMA (m\u00e9thode de l'allaitement maternel et de l'am\u00e9norrh\u00e9e)",
        "data":"La succion du sein par le b\u00e9b\u00e9 supprime l'ovulation dans certaines conditions:<li>En cas d'allaitement exclusif <\/li><li>absence de r\u00e8gles depuis l'accouchement<\/li><li>Ne marche plus au-del\u00e0 de 6 mois d'allaitement<\/li><li>les t\u00e9t\u00e9s doivent \u00eatre longues, espac\u00e9es de moins de 6h, et au nombre de 6 minimum le jour comme la nuit.<\/li>"
      }
    }
  },  
  "le-patch":{
    "title":"Le patch",
    "content":{
      "TGUgcGF0Y2gsIGMnZXN0IHF1b2kgPw0=":{
        "title":"Le patch, c'est quoi ?",
        "data":"Le patch est un timbre de 20cm2, couleur chair, qui se colle sur la peau.<br \/><br \/><div class='attention'>Attention il ne prot\u00e8ge pas des infections sexuellement transmissibles.<\/div>"
      },
      "TcOpY2FuaXNtZSBkJ2FjdGlvbg0=":{
        "title":"M\u00e9canisme d'action",
        "data":"Le patch d\u00e9livre une association oestro-progestative et agit comme la pilule.<br \/><br \/>Il bloque l'ovulation, et modifie l'endom\u00e8tre (muqueuse tapissant l'int\u00e9rieur de l'ut\u00e9rus) de fa\u00e7on \u00e0 ce qu'il ne puisse pas accueillir un \u00e9ventuel oeuf et modifiant la glaire pour emp\u00eacher les spermatozo\u00efdes de franchir le col."
      },
      "VXRpbGlzYXRpb24N":{
        "title":"Utilisation",
        "data":"Placer le patch sur la hanche, la fesse, le ventre, la cuisse ou l'\u00e9paule mais pas sur les seins.<br \/><br \/>Utiliser un patch pour une semaine (remplacement du patch \u00e0 heure et jour fixe de la semaine).<br \/><br \/>Mettre pendant 3 semaines un patch par semaine, puis une semaine sans patch, celle o\u00f9 les r\u00e8gles arrivent.<br \/><br \/>Pour commencer le patch, le premier patch doit \u00eatre plac\u00e9 le premier jour des r\u00e8gles.<br \/><br \/>Bien veiller au non d\u00e9collement du patch, voir Pr\u00e9cautions d'emploi"
      },
      "RWZmaWNhY2l0w6kN":{
        "title":"Efficacit\u00e9",
        "data":"Tr\u00e8s efficace si il est bien utilis\u00e9 sans oubli."
      },
      "QXZhbnRhZ2VzDQ==":{
        "title":"Avantages",
        "data":"<li>Efficacit\u00e9 excellente<\/li><li>Tol\u00e9rance excellente<\/li><li>Diminution des oublis par rapport \u00e0 la pilule<\/li><li>Bonne adh\u00e9sion cutan\u00e9e<\/li><li>Cycles r\u00e9guliers avec diminution du volume et des douleurs des r\u00e8gles<\/li><li>R\u00e9versibilit\u00e9<\/li>"
      },
      "SW5jb252w6luaWVudHMN":{
        "title":"Inconv\u00e9nients",
        "data":"<h2>Adolescents<\/h2>Pas d'autorisation de mise sur le march\u00e9 pour les adolescents.<h2>En cas de surpoids<\/h2>Echec de m\u00e9thode en cas de surpoids, revoir la prescription.<h2>Visible<\/h2>Visible par le partenaire ou quand on porte un maillot de bain.<h2>Prix<\/h2>Une bo\u00eete co\u00fbte environs 15€ par mois non rembours\u00e9 par la Sécurité Sociale."
      },
      "Q29udHJlLWluZGljYXRpb25zDQ==":{
        "title":"Contre-indications",
        "data":"<li>Anomalie de la coagulation sanguine<\/li><li>Ant\u00e9c\u00e9dent d'accident thrombo-embolique ou de thrombose art\u00e9rielle<\/li><li>Certains cancers<\/li><li>Certaines migraines<\/li><li>Certaines affections h\u00e9patiques<\/li><li>Hypercholest\u00e9rol\u00e9mie<\/li><li>Hypertension art\u00e9rielle<\/li><li>Tabagisme<\/li><li>Varices<\/li><li>Certaines interactions m\u00e9dicamenteuses<\/li>"
      },
      "UHLDqWNhdXRpb25zIGQnZW1wbG9pDQ==":{
        "title":"Pr\u00e9cautions d'emploi",
        "data":"Bien veiller au non d\u00e9collement du patch. Que dois-je faire si le patch se d\u00e9colle ?<li>moins de 24 heures, essayer de le recoller \u00e0 la m\u00eame place s'il colle toujours (ne jamais utiliser d'adh\u00e9sif) sinon utiliser un nouveau patch que vous collerez \u00e0 un autre endroit. Il n'y a pas de risque de grossesse.<\/li><li>plus de 24 heures (ou si vous ne savez pas combien de temps) entamer un nouveau cycle en collant un nouveau patch (cela correspondra au d\u00e9but d'un nouveau cycle) et si vous avez eu un rapport sexuel dans les 5 jours pr\u00e9c\u00e9dant le d\u00e9collement utiliser la contraception d'urgence. Lors des rapports sexuels au cours des 7 jours suivant le d\u00e9collement, utiliser des pr\u00e9servatifs.<\/li>"
      },
      "RWZmZXRzIEluZMOpc2lyYWJsZXMN":{
        "title":"Effets Ind\u00e9sirables",
        "data":"<h2>Naus\u00e9es<\/h2>Elles s'estompent souvent apr\u00e8s quelques cycles sinon parlez en a votre m\u00e9decin.<h2>Prise de poids<\/h2>La prise de poids est souvent mod\u00e9r\u00e9e, r\u00e9versible, et peut \u00eatre parfaitement maitris\u00e9e.<h2>Migraine<\/h2>Si cela persiste parlez-en \u00e0 votre m\u00e9decin.<h2>Spottings : saignements en dehors des r\u00e8gles<\/h2>Poursuivez l'utilisation du patch. Si cela persiste plus de trois mois, consultez votre m\u00e9decin.<h2>Prise de poids<\/h2>La prise de poids est possible mais souvent tr\u00e8s mod\u00e9r\u00e9e, r\u00e9versible, et peut \u00eatre parfaitement maitris\u00e9e.<h2>Douleurs et gonflements des seins<\/h2>Sans danger, si cela persiste consultez votre m\u00e9decin pour revoir la prescription."
      },
      "SW5mb3JtYXRpb25zIGNvbXBsw6ltZW50YWlyZXMN":{
        "title":"Informations compl\u00e9mentaires",
        "data":"<li>N\u00e9cessite une ordonnance <\/li><li>1 boite contient 3 patchs soit un mois de traitement. Le prix d'une boite varie d'une pharmacie \u00e0 une autre il avoisine 15€ qui ne sont pas rembours\u00e9s par l'assurance maladie<\/li>"
      },
      "lespatchs":{
        "title":"Les patchs",
        "data":"Cette partie sera li\u00e9e directement \u00e0 la section m\u00e9dicaments de l'application. Donn\u00e9es officielles ANSM (AFSSAPS)."
      },
      "RW4gY2FzIGQnb3VibGkN":{
        "title":"En cas d'oubli",
        "data":"En cas d'oubli de changer le patch il est efficace encore 24 H, au-del\u00e0 vous n'\u00eates plus prot\u00e9g\u00e9e.<li>Si oubli de moins de 24H, mettre un nouveau patch vous \u00eates donc prot\u00e9g\u00e9e d'une \u00e9ventuelle grossesse.<\/li><li>Si oubli de plus de 24H, mettre un patch tout de suite.<\/li><br \/><br \/>Si vous avez eu un rapport sexuel dans les 5 jours pr\u00e9c\u00e9dant l'oubli utilisez la contraception d'urgence. Lors des rapports sexuels au cours des 7 jours suivant l'oubli, utilisez des pr\u00e9servatifs.<br \/><br \/>En cas d'oubli de remettre un nouveau patch au del\u00e0 des 7 jours d'arr\u00eat, vous n'\u00eates plus prot\u00e9g\u00e9e d'une \u00e9ventuelle grossesse.Mettre le nouveau patch (que vous garderez 7 jours)<div class='attention'>Attention, si vous n'\u00eates plus prot\u00e9g\u00e9e et que vous avez eu un rapport sexuel dans les 5 jours pr\u00e9c\u00e9dant l'oubli utilisez la contraception d'urgence. Lors des rapports sexuels au cours des 7 jours suivant l'oubli, utilisez des pr\u00e9servatifs.<\/div>"
      }
    }
  },  
  "lanneau-vaginal":{
    "title":"L'anneau vaginal",
    "content":{
      "TCdhbm5lYXUgdmFnaW5hbCwgYydlc3QgcXVvaSA\/DQ==":{
        "title":"L'anneau vaginal, c'est quoi ?",
        "data":"L'anneau vaginal ou anneau contraceptif est un anneau souple de 5,5 cm de diam\u00e8tre qui se place dans le vagin. Il contient une association d'hormones (estrog\u00e8ne et progestatif) qu'il lib\u00e8re tout le long du cycle, comme une pilule combin\u00e9e.<br \/><br \/>Il ne prot\u00e8ge pas des Infections Sexuellement Transmissibles."
      },
      "TcOpY2FuaXNtZSBkJ2FjdGlvbg0=":{
        "title":"M\u00e9canisme d'action",
        "data":"L'anneau vaginal agit comme la pilule, en bloquant l'ovulation et en modifiant la glaire cervicale pour emp\u00eacher les spermatozo\u00efdes de franchir le col.<br \/><br \/>Attention, il ne prot\u00e8ge pas des Infections Sexuellement Transmissibles."
      },
      "VXRpbGlzYXRpb24N":{
        "title":"Utilisation",
        "data":"Le premier anneau est ins\u00e9r\u00e9 le jour 1 du cycle soit le premier jour des r\u00e8gles et retir\u00e9 au jour 21 pour permettre l'apparition des r\u00e8gles.<br \/><br \/>Il faut l'ins\u00e9rer comme un tampon, le plus profond\u00e9ment possible mais sa position dans le vagin n'a pas d'importance en soi.<br \/><br \/>Au bout de 3 semaines, on enl\u00e8ve l'anneau ensuite, les r\u00e8gles apparaissent habituellement 2 \u00e0 3 jours apr\u00e8s le retrait.<br \/><br \/>Il faut replacer un nouvel anneau 7 jours apr\u00e8s le retrait de l'anneau pr\u00e9c\u00e9dent.<div class='attention'>Attention aux erreurs d'utilisation :<\/div>S'il est expuls\u00e9 (apr\u00e8s un rapport sexuel par exemple), le remettre en place imm\u00e9diatement apr\u00e8s l'avoir rinc\u00e9 \u00e0 l'eau froide ou ti\u00e8de.<br \/><br \/>Il est conseill\u00e9 de le garder tout le temps, y compris pendant les rapports sexuels.<br \/><br \/>S'il est expuls\u00e9 depuis plus de 3 heures, vous n'\u00eates plus prot\u00e9g\u00e9e d'une \u00e9ventuelle grossesse (voir \"Que faire en cas d'oubli\")."
      },
      "RWZmaWNhY2l0w6kN":{
        "title":"Efficacit\u00e9",
        "data":"C'est aussi efficace qu'une pilule combin\u00e9e, avec une s\u00e9curit\u00e9 suppl\u00e9mentaire qui est le fait de l'avoir toujours sur soi, sans y penser pendant 3 semaines.<br \/><br \/>Cette efficacit\u00e9 peut cependant \u00eatre compromise dans les cas suivants :<li>oublis (il faut remettre un anneau apr\u00e8s la semaine d'arr\u00eat)<\/li><li>l'expulsion de l'anneau (il est facile de v\u00e9rifier sa pr\u00e9sence au doigt)<\/li>"
      },
      "QXZhbnRhZ2VzDQ==":{
        "title":"Avantages",
        "data":"<li>Mise en place et retrait faciles <\/li><li>Oublis rares<\/li><li>Excellente tol\u00e9rance<\/li><li>Excellente efficacit\u00e9 <\/li><li>R\u00e9versibilit\u00e9 \u00e0 l'arr\u00eat<\/li><li>R\u00e9gularit\u00e9 des cycles<\/li><li>R\u00e8gles moins abondantes, moins longues et moins douloureuses<\/li>"
      },
      "SW5jb252w6luaWVudHMN":{
        "title":"Inconv\u00e9nients",
        "data":"<li>Non rembours\u00e9 par l'assurance maladie<\/li><li>Risque expulsion<\/li><li>Appr\u00e9hension \u00e0 la mise en place<\/li><li>Un seul dosage actuellement<\/li><li>Contre-indications, <\/li><li>Anomalie de la coagulation sanguine<\/li><li>Ant\u00e9c\u00e9dent d'accident thrombo-embolique ou de thrombose art\u00e9rielle<\/li><li>Certains cancers<\/li><li>Certaines migraines<\/li><li>Certaines affections h\u00e9patiques<\/li><li>Hypercholest\u00e9rol\u00e9mie<\/li><li>Hypertension art\u00e9rielle<\/li><li>Tabagisme <\/li><li>Varices<\/li><li>Attention aux interactions m\u00e9dicamenteuses<\/li><li>Post partum (apr\u00e8s l'accouchement)<\/li>"
      },
      "UHLDqWNhdXRpb25zIGQnZW1wbG9pDQ==":{
        "title":"Pr\u00e9cautions d'emploi",
        "data":"Se conserve au r\u00e9frig\u00e9rateur<br \/><br \/>En cas de conservation \u00e0 temp\u00e9rature ambiante, l'utiliser dans les 4 mois."
      },
      "RWZmZXRzIGluZMOpc2lyYWJsZXMN":{
        "title":"Effets ind\u00e9sirables",
        "data":"<h2>Spottings : saignements en dehors des r\u00e8gles<\/h2>Il faut continuer normalement l'utilisation de l'anneau. Si cela persiste pendant plus de trois mois, consultez votre m\u00e9decin.<h2>Douleurs gonflements des seins tension mammaires<\/h2>Sans danger, si cela persiste consultez votre m\u00e9decin pour revoir la prescription.<h2>Prise de poids<\/h2>La prise de poids est possible mais souvent tr\u00e8s mod\u00e9r\u00e9e, r\u00e9versible, et peut \u00eatre parfaitement maitris\u00e9e.<h2>Naus\u00e9es<\/h2>Elles s'estompent souvent apr\u00e8s quelques cycles, sinon consultez votre m\u00e9decin traitant.<h2>Migraine<\/h2>Si cela persiste parlez-en \u00e0 votre m\u00e9decin."
      },
      "SWTDqWVzIHJlw6d1ZXMN":{
        "title":"Id\u00e9es re\u00e7ues",
        "data":"<h2>Je vais ressentir l'anneau<\/h2>Si l'anneau est bien plac\u00e9, vous ne le sentez pas car il se positionne dans la partie haute du vagin qui est peu sensible au toucher.Si l'anneau est ressenti, c'est qu'il s'est d\u00e9plac\u00e9 dans le vagin, il faut alors de le repousser un peu.<h2>Mon partenaire va ressentir l'anneau.<\/h2>Dans la majorit\u00e9 des cas, il ne devrait rien sentir. Rarement, s'il le ressent, il ne devrait pas \u00eatre g\u00ean\u00e9 par sa pr\u00e9sence car l'anneau est souple et flexible."
      },
      "SW5mb3JtYXRpb25zIGNvbXBsw6ltZW50YWlyZXMN":{
        "title":"Informations compl\u00e9mentaires",
        "data":"<li>D\u00e9livr\u00e9 en pharmacie sur ordonnance<\/li><li>Le prix varie d'une pharmacie \u00e0 l'autre et avoisine 16€ pour un anneau et donc pour un cycle, non rembours\u00e9 par l'assurance maladie.<\/li>"
      },
      "lesanneaux":{
        "title":"Les diff\u00e9rents anneaux",
        "data":"Cette partie sera li\u00e9e directement \u00e0 la section m\u00e9dicaments de l'application. Donn\u00e9es officielles ANSM (AFSSAPS)."
      },
      "RW4gY2FzIGQnb3VibGkN":{
        "title":"En cas d'oubli",
        "data":"Cette partie sera li\u00e9e directement \u00e0 la section m\u00e9dicaments de l'application. Donn\u00e9es officielles ANSM (AFSSAPS)."
      }
    }
  },
  "limplant":{
    "title":"L'implant",
    "content":{
      "TCdpbXBsYW50LCBjJ2VzdCBxdW9pID8N":{
        "title":"L'implant, c'est quoi ?",
        "data":"L'implant est un petit b\u00e2tonnet plastique de 4cm plac\u00e9 sous la peau, au niveau de la face interne du bras.<br \/><br \/>Il agit pendant 3 ans."
      },
      "TcOpY2FuaXNtZSBkJ2FjdGlvbg0=":{
        "title":"M\u00e9canisme d'action",
        "data":"L'implant est un dispositif d\u00e9livrant r\u00e9guli\u00e8rement le m\u00eame type de substance que les pilules progestatives.<br \/><br \/>Il agit principalement en bloquant l'ovulation, il modifie l'endom\u00e8tre (muqueuse tapissant l'int\u00e9rieur de l'ut\u00e9rus) de fa\u00e7on \u00e0 ce qu'il ne puisse pas accueillir un \u00e9ventuel ovocyte f\u00e9cond\u00e9 et modifie la glaire pour emp\u00eacher les spermatozo\u00efdes de franchir le col.<br \/><br \/><div class='attention'>Attention, il ne prot\u00e8ge pas des Infections Sexuellement Transmissibles.<\/div>"
      },
      "VXRpbGlzYXRpb24N":{
        "title":"Utilisation",
        "data":"Il est ins\u00e9r\u00e9 par un m\u00e9decin ou une sage-femme sous anesth\u00e9sie locale, sous la peau, au niveau du bras.<br \/><br \/>Une fois en place, l'implant est invisible et indolore.<br \/><br \/>L'implant est efficace pendant 3 ans. Mais il peut \u00eatre retir\u00e9 plus t\u00f4t si vous le d\u00e9sirez."
      },
      "RWZmaWNhY2l0w6kN":{
        "title":"Efficacit\u00e9",
        "data":"L'implant est une m\u00e9thode de contraception tr\u00e8s efficace."
      },
      "QXZhbnRhZ2VzDQ==":{
        "title":"Avantages",
        "data":"<li>Tranquillit\u00e9 car pas de prise quotidienne et donc aucun risque d'oubli<\/li><li>Discr\u00e9tion<\/li><li>Longue dur\u00e9e d'action (3 ans)<\/li>"
      },
      "SW5jb252w6luaWVudHMN":{
        "title":"Inconv\u00e9nients",
        "data":"<li>Retrait parfois difficile<\/li><li>Am\u00e9norrh\u00e9e (absence de r\u00e8gles)<\/li><li>Cycles irr\u00e9guliers avec parfois saignements peu importants mais continus (spottings)<\/li>"
      },
      "Q29udHJlLUluZGljYXRpb25zDQ==":{
        "title":"Contre-Indications",
        "data":"<li>Maladie thromboembolique en cours<\/li><li>Certains cancers<\/li><li>H\u00e9morragie g\u00e9nitale non expliqu\u00e9e<\/li><li>Ant\u00e9c\u00e9dents de pathologie h\u00e9patique s\u00e9v\u00e8re ou en cours<\/li><li>Certaines pathologies ovariennes<\/li><li>Certaines interactions m\u00e9dicamenteuses <\/li>"
      },
      "RWZmZXRzIGluZMOpc2lyYWJsZXMN":{
        "title":"Effets ind\u00e9sirables",
        "data":"<h2>Naus\u00e9es<\/h2>Elles s'estompent souvent apr\u00e8s quelques cycles, sinon consultez votre m\u00e9decin traitant.<h2>Spotting : saignements en dehors des r\u00e8gles<\/h2>Il faut pers\u00e9v\u00e9rer. Si cela persiste pendant plus de 3 mois, consultez votre m\u00e9decin.<h2>Douleurs, gonflements des seins, et tensions mammaires<\/h2>Sans danger, si cela persiste consultez votre m\u00e9decin pour revoir la prescription.<h2>Prise de poids<\/h2>La prise de poids est possible mais souvent tr\u00e8s mod\u00e9r\u00e9e, r\u00e9versible, et peut \u00eatre parfaitement maitris\u00e9e. <h2>Migraine<\/h2>Si cela persiste parlez-en \u00e0 votre m\u00e9decin."
      },
      "SW5mb3JtYXRpb25zIGNvbXBsw6ltZW50YWlyZXMN":{
        "title":"Informations compl\u00e9mentaires",
        "data":"<li>Co\u00fbte 138€ et utilisable 3 ans, rembours\u00e9 65% par l'assurance maladie.<\/li><li>Sur ordonnance, il doit \u00eatre pos\u00e9 par un m\u00e9decin ou une sage-femme sous anesth\u00e9sie locale.<\/li>"
      }
    }
  },
  "le-diaphragme":{
    "title":"Le diaphragme",
    "content":{
      "TGEgZGlhcGhyYWdtZSwgYydlc3QgcXVvaSA\/DQ==":{
        "title":"La diaphragme, c'est quoi ?",
        "data":"Le diaphragme est un dispositif vaginal en silicone.Il ne prot\u00e8ge pas des infections sexuellement transmissibles."
      },
      "TcOpY2FuaXNtZSBkJ2FjdGlvbg0=":{
        "title":"M\u00e9canisme d'action",
        "data":"Il emp\u00eache le passage des spermatozo\u00efdes dans l'ut\u00e9rus."
      },
      "VXRpbGlzYXRpb24N":{
        "title":"Utilisation",
        "data":"<li>Mettre du spermicide sur les 2 faces du diaphragme.<\/li><li>Placer le \u00e0 l'avance dans le vagin, entre le cul-de-sac post\u00e9rieur et l'os du pubis.<\/li><li>Enlever le diaphragme au minimum 6H apr\u00e8s le rapport sexuel.<\/li><li>Si le diaphragme est plac\u00e9 depuis plus de 8H, remettre du spermicide sans enlever le diaphragme.<\/li><li>Bien le laver, r\u00e9utilisable pendant 2 ans.<\/li>"
      },
      "RWZmaWNhY2l0w6kN":{
        "title":"Efficacit\u00e9",
        "data":"Efficacit\u00e9 variable : de moyennement efficace \u00e0 efficace.Les principales causes d'\u00e9chec sont :<li>le manque d'habitude<\/li><li>les erreurs de manipulation<\/li><li>la non utilisation \u00e0 certains moments du cycle (Il n'y a pas de p\u00e9riode \"sans risque\").<\/li>"
      },
      "QXZhbnRhZ2VzDQ==":{
        "title":"Avantages",
        "data":"<li>Mise en place \u00e0 l'avance<\/li><li>R\u00e9utilisable<\/li><li>Peu co\u00fbteux<\/li>"
      },
      "SW5jb252w6luaWVudHMN":{
        "title":"Inconv\u00e9nients",
        "data":"<li>Insertion parfois d\u00e9licate<\/li><li>Ne prot\u00e8ge pas des infections sexuellement transmissibles<\/li>"
      },
      "Q29udHJlLWluZGljYXRpb25zDQ==":{
        "title":"Contre-indications",
        "data":"<li>Prolapsus<\/li><li>R\u00e9troversion ut\u00e9rine<\/li><li>Post-partum (apr\u00e8s l'accouchement)<\/li><li>Infections vaginales<\/li><li>Infections urinaires \u00e0 r\u00e9p\u00e9tition<\/li>"
      },
      "UHLDqWNhdXRpb25zIGQnZW1wbG9pDQ==":{
        "title":"Pr\u00e9cautions d'emploi",
        "data":"La taille doit \u00eatre adapt\u00e9e \u00e0 la cavit\u00e9 vaginale de 60 \u00e0 90mm."
      },
      "SW5mb3JtYXRpb25zIGNvbXBsw6ltZW50YWlyZXMN":{
        "title":"Informations compl\u00e9mentaires",
        "data":"<li>N\u00e9cessite une prescription m\u00e9dicale<\/li><li>La premi\u00e8re pose est faite par le m\u00e9decin ou la sage-femme<\/li><li>Se trouve en pharmacie sur commandes, ou au Mouvement fran\u00e7ais pour le planning familial<\/li><li>Environ 33€ en latex, et 42€ en silicone. Il est rembours\u00e9 sur la base de 3,14€<\/li>"
      }
    }
  },
  "le-dispositif-intra-uterin-hormonal-":{
    "title":"Le dispositif intra-ut\u00e9rin hormonal ",
    "content":{
      "TGUgRElVIGhvcm1vbmFsLCBjJ2VzdCBxdW9pID8N":{
        "title":"Le DIU hormonal, c'est quoi ?",
        "data":"C'est un dispositif contraceptif qui est ins\u00e9r\u00e9 dans l'ut\u00e9rus. Il contient un r\u00e9servoir de progestatif, le levonorgestrel, il mesure 3,5 cm de long et se pr\u00e9sente en forme de T.<br \/><br \/><div class='attention'>Attention il ne prot\u00e8ge pas des infections sexuellement transmissibles.<\/div>"
      },
      "TcOpY2FuaXNtZSBkJ2FjdGlvbg0=":{
        "title":"M\u00e9canisme d'action",
        "data":"Le DIU hormonal r\u00e9duit la capacit\u00e9 d'implantation d'un \u00e9ventuel oeuf f\u00e9cond\u00e9. Il agit au niveau des spermatozo\u00efdes en ralentissant leur progression, en \u00e9paississant la glaire cervicale et en diminuant leur capacit\u00e9 \u00e0 f\u00e9conder.<br \/><br \/>Il r\u00e9duit \u00e9galement le d\u00e9veloppement de l'endom\u00e8tre ce qui permet de rendre les r\u00e8gles moins douloureuses et moins abondantes.<br \/><br \/>Il inhibe parfois l'ovulation."
      },
      "VXRpbGlzYXRpb24N":{
        "title":"Utilisation",
        "data":"Il est mis en place par un m\u00e9decin g\u00e9n\u00e9raliste, un gyn\u00e9cologue ou une sage-femme.<br \/><br \/>En principe, l'insertion d'un DIU est peu ou pas douloureuse.<br \/><br \/>Le m\u00e9decin peut prescrire \u00e0 la patiente des m\u00e9dicaments anti douleur 2 heures avant la pose."
      },
      "RWZmaWNhY2l0w6kN":{
        "title":"Efficacit\u00e9",
        "data":"<li>Excellente efficacit\u00e9<\/li><li>Avantages<\/li><li>Confort<\/li><li>Efficacit\u00e9<\/li><li>Simplicit\u00e9<\/li><li>Non contraignant<\/li><li>Diminution du volume des r\u00e8gles voire am\u00e9norrh\u00e9e (pas de r\u00e8gle)<\/li>"
      },
      "SW5jb252w6luaWVudHMN":{
        "title":"Inconv\u00e9nients",
        "data":"<li>Trouble du cycle avec soit une am\u00e9norrh\u00e9e (pas de r\u00e8gle) soit des spottings (saignement en dehors des r\u00e8gles)<\/li><li>Acn\u00e9e<\/li><li>C\u00e9phal\u00e9es (mal de t\u00eate)<\/li><li>Kystes ovariens<\/li><li>Risque de douleur \u00e0 la pose<\/li>"
      },
      "Q29udHJlLUluZGljYXRpb25zDQ==":{
        "title":"Contre-Indications",
        "data":"<li>Grossesse<\/li><li>Saignements g\u00e9nitaux anormaux inexpliqu\u00e9s<\/li><li>D\u00e9formation ou malformation cavit\u00e9 ut\u00e9rine <\/li><li>Infection g\u00e9nitale en cours, tuberculose g\u00e9nito-urinaire<\/li><li>Dysplasie cervicale, cancer de l'endom\u00e8tre<\/li><li>Maladie trophoblastique<\/li><li>Post-avortum septique (attendre au moins 4 semaines apr\u00e8s l'IVG)<\/li><li>Apr\u00e8s l'accouchement (attendre au moins 4 semaines)<\/li><li>Pathologie thromboembolique en cours <\/li><li>Pathologie h\u00e9patique en cours<\/li>"
      },
      "RWZmZXRzIEluZMOpc2lyYWJsZXMN":{
        "title":"Effets Ind\u00e9sirables",
        "data":"<h2>Prise de poids<\/h2>Exceptionnelle et souvent tr\u00e8s mod\u00e9r\u00e9e, r\u00e9versible et peut \u00eatre parfaitement maitris\u00e9e sinon revoir la prescription<h2>Expulsion<\/h2>L'expulsion du DIU peut arriver ; il faut alors en discuter avec votre m\u00e9decin pour prendre un autre moyen de contraception.<h2>Naus\u00e9es<\/h2>Elles s'estompent souvent apr\u00e8s quelques cycles sinon parlez-en \u00e0 votre m\u00e9decin<h2>Migraine<\/h2>Si cela persiste parlez-en \u00e0 votre m\u00e9decin<h2>Spottings : saignements en dehors des r\u00e8gles<\/h2>Cela peut arriver dans les cycles qui suivent la pose mais sont g\u00e9n\u00e9ralement transitoires. Si cela persiste plus de trois mois, consultez votre m\u00e9decin"
      },
      "SW5mb3JtYXRpb25zIGNvbXBsw6ltZW50YWlyZXMN":{
        "title":"Informations compl\u00e9mentaires",
        "data":"<li>Le DIU est prescrit et pos\u00e9 par un m\u00e9decin ou une sage-femme.<\/li><li>Il est d\u00e9livr\u00e9 en pharmacie pour environ 125€.<\/li><li>Il est rembours\u00e9 \u00e0 65 % par l'Assurance maladie.<\/li>"
      }
    }
  },
  "le-dispositif-intra-uterin-en-cuivre":{
    "title":"Le dispositif intra-ut\u00e9rin en cuivre",
    "content":{
      "TGUgRElVIGVuIGN1aXZyZSwgYydlc3QgcXVvaSA\/DQ==":{
        "title":"Le DIU en cuivre, c'est quoi ?",
        "data":"C'est un dispositif contraceptif qui est ins\u00e9r\u00e9 dans l'ut\u00e9rus. Il est en cuivre, mesure 3,5 cm de long et se pr\u00e9sente le plus souvent en forme de T.<br \/><br \/>Il peut \u00eatre utilis\u00e9 comme contraception d'urgence s'il est mis en place rapidement apr\u00e8s le rapport \u00e0 risque (5 jours).<br \/><br \/><div class='attention'>Attention il ne prot\u00e8ge pas des infections sexuellement transmissibles.<\/div>"
      },
      "TcOpY2FuaXNtZSBkJ2FjdGlvbi4N":{
        "title":"M\u00e9canisme d'action.",
        "data":"Il r\u00e9duit la capacit\u00e9 d'implantation d'un \u00e9ventuel ovocyte f\u00e9cond\u00e9 en ayant une r\u00e9action inflammatoire sur l'endom\u00e8tre.<br \/><br \/>Il diminue la capacit\u00e9 \u00e0 f\u00e9conder des spermatozo\u00efdes."
      },
      "VXRpbGlzYXRpb24N":{
        "title":"Utilisation",
        "data":"Il est mis en place par un m\u00e9decin g\u00e9n\u00e9raliste, un gyn\u00e9cologue ou une sage-femme.<br \/><br \/>En principe, l'insertion d'un DIU est peu ou pas douloureuse.<br \/><br \/>Le m\u00e9decin peut prescrire \u00e0 la patiente des antalgiques 2 heures avant la pose."
      },
      "RWZmaWNhY2l0w6kN":{
        "title":"Efficacit\u00e9",
        "data":"<li>Efficacit\u00e9 imm\u00e9diate d\u00e8s le jour de son insertion<\/li><li>Excellente efficacit\u00e9 de 4 \u00e0 10 ans selon le mod\u00e8le<\/li>"
      },
      "QXZhbnRhZ2VzDQ==":{
        "title":"Avantages",
        "data":"<li>Absence d'hormones : les cycles ne sont pas modifi\u00e9s<\/li><li>Confort<\/li><li>Efficacit\u00e9<\/li><li>Simplicit\u00e9<\/li><li>Non contraignant<\/li>"
      },
      "SW5jb252w6luaWVudHMN":{
        "title":"Inconv\u00e9nients",
        "data":"<li>Augmentation du volume des r\u00e8gles<\/li><li>Risque de douleur \u00e0 la pose ou de douleur chronique<\/li><li>Risque d'expulsion<\/li><li>Risque d'infection au d\u00e9cours de la pose ou en cas de contraction d'une IST<\/li><li>Perforation lors de la pose, migration intra-abdominale<\/li><li>Grossesse extra-ut\u00e9rine et intra-ut\u00e9rine<\/li>"
      },
      "Q29udHJlLUluZGljYXRpb25zDQ==":{
        "title":"Contre-Indications",
        "data":"<li>Allergie au cuivre<\/li><li>Grossesse<\/li><li>Cancer du col de l'ut\u00e9rus ou de l'endom\u00e8tre<\/li><li>Infections g\u00e9nitales hautes<\/li><li>Malformations de l'ut\u00e9rus<\/li><li>Fibromes ut\u00e9rins<\/li><li>Saignements vaginaux inexpliqu\u00e9s<\/li><li>Apr\u00e8s l'accouchement<\/li><li>Tuberculose g\u00e9nitale<\/li>"
      },
      "SW5mb3JtYXRpb25zIGNvbXBsw6ltZW50YWlyZXMN":{
        "title":"Informations compl\u00e9mentaires",
        "data":"<li>Le DIU est prescrit et pos\u00e9 par un m\u00e9decin ou une sage-femme.<\/li><li>Il est d\u00e9livr\u00e9 en pharmacie pour environ 30€.<\/li><li>Il est rembours\u00e9 \u00e0 65 % par l'Assurance maladie.<\/li>"
      }
    }
  },
  "le-spermicide":{
    "title":"Le spermicide",
    "content":{
      "TGUgc3Blcm1pY2lkZSwgYydlc3QgcXVvaSA\/DQ==":{
        "title":"Le spermicide, c'est quoi ?",
        "data":"Le spermicide est une substance \u00e0 administrer localement prenant la forme de cr\u00e8me, de gel, d'\u00e9ponge, d'ovule ou de mousse.<br \/><br \/>Il ne prot\u00e8ge pas contre les infections sexuellement transmissibles"
      },
      "TcOpY2FuaXNtZSBkJ2FjdGlvbg0=":{
        "title":"M\u00e9canisme d'action",
        "data":"Ils inactivent ou d\u00e9truisent les spermatozo\u00efdes."
      },
      "VXRpbGlzYXRpb24N":{
        "title":"Utilisation",
        "data":"Chaque spermicide a une utilisation bien particuli\u00e8re, nous vous recommandons de lire attentivement la notice et bien respecter chaque indication.<br \/><br \/>Il peut \u00eatre utilis\u00e9 seuls ou de pr\u00e9f\u00e9rence en association avec une autre m\u00e9thode comme le pr\u00e9servatifs, le diaphragme, ou la cape cervicale."
      },
      "RWZmaWNhY2l0w6kN":{
        "title":"Efficacit\u00e9",
        "data":"L'efficacit\u00e9 des spermicides est al\u00e9atoire. Elle d\u00e9pend largement de l'usage qui en est fait. Elle augmente si il est associ\u00e9 \u00e0 un autre moyen contraceptif."
      },
      "QXZhbnRhZ2VzDQ==":{
        "title":"Avantages",
        "data":"<li>Discrets<\/li><li>Augmente l'efficacit\u00e9 des autres contraceptifs<\/li>"
      },
      "SW5jb252w6luaWVudHMN":{
        "title":"Inconv\u00e9nients",
        "data":"<li>Utilisation parfois d\u00e9licate<\/li><li>Efficacit\u00e9 moindre en utilisation seule<\/li>"
      },
      "Q29udHJlLUluZGljYXRpb25zDQ==":{
        "title":"Contre-Indications",
        "data":"<li>Infections sexuellement transmissible<\/li><li>Mycose vaginale<\/li><li>L\u00e9sions du col de l'ut\u00e9rus<\/li><li>Infections urinaires \u00e0 r\u00e9p\u00e9tition<\/li><li>Plaie du vagin<\/li><li>Utilisation de m\u00e9dicaments administr\u00e9s par voie vaginales<\/li>"
      },
      "UHLDqWNhdXRpb25zIGQnZW1wbG9pDQ==":{
        "title":"Pr\u00e9cautions d'emploi",
        "data":"Ne pas utiliser de savon pendant 6 \u00e0 8H"
      },
      "SW5mb3JtYXRpb25zIGNvbXBsw6ltZW50YWlyZXMN":{
        "title":"Informations compl\u00e9mentaires",
        "data":"<li>En pharmacie, sans ordonnance<\/li><li>Entre 7 et 19€ la bo\u00eete de 6 \u00e0 20 spermicides<\/li><li>Non rembours\u00e9 par l'Assurance maladie<\/li>"
      }
    }
  },
  "les-progestatifs-injectables":{
    "title":"Les progestatifs injectables",
    "content":{
      "TGVzIHByb2dlc3RhdGlmcyBpbmplY3RhYmxlcywgYydlc3QgcXVvaSA\/DQ==":{
        "title":"Les progestatifs injectables, c'est quoi ?",
        "data":"Un progestatif de synth\u00e8se (m\u00e9droxyprogest\u00e9rone) est inject\u00e9 par piq\u00fbre intramusculaire tous les trois mois. Pendant 12 semaines, le produit assure une contraception constante."
      },
      "TcOpY2FuaXNtZSBkJ2FjdGlvbg0=":{
        "title":"M\u00e9canisme d'action",
        "data":"Il agit en emp\u00eachant l'ovulation, en modifiant la glaire cervicale ainsi que l'endom\u00e8tre.<br \/><br \/><div class='attention'>Attention ils ne prot\u00e8gent pas des infections sexuellement transmissibles.<\/div>"
      },
      "VXRpbGlzYXRpb24N":{
        "title":"Utilisation",
        "data":"Piq\u00fbre intramusculaire \u00e0 faire tous les 3 mois par un m\u00e9decin, une sage-femme ou une infirmi\u00e8re"
      },
      "RWZmaWNhY2l0w6kN":{
        "title":"Efficacit\u00e9",
        "data":"L'efficacit\u00e9 est tr\u00e8s bonne si l'intervalle d'injection est respect\u00e9.<br \/><br \/>Cette efficacit\u00e9 augmente avec l'\u00e2ge de l'utilisatrice mais peut \u00eatre diminu\u00e9e par certains m\u00e9dicaments."
      },
      "QXZhbnRhZ2VzDQ==":{
        "title":"Avantages",
        "data":"Moins de risque d'oubli"
      },
      "SW5jb252w6luaWVudHMN":{
        "title":"Inconv\u00e9nients",
        "data":"Les effets ind\u00e9sirables sont nombreux :<li>Troubles du cycle<\/li><li>Prise de poids<\/li><li>Manifestations androg\u00e9niques : pilosit\u00e9<\/li><li>Maux de t\u00eate, vertiges, \u00e9tat d\u00e9pressif<\/li>"
      },
      "Q29udHJlLUluZGljYXRpb25zDQ==":{
        "title":"Contre-Indications",
        "data":"<li>Maladie thromboembolique en cours<\/li><li>Tumeur sensible \u00e0 la progest\u00e9rone (cancer du sein, cancer de l'endom\u00e8tre)<\/li><li>H\u00e9morragie g\u00e9nitale non expliqu\u00e9e<\/li><li>Ant\u00e9c\u00e9dent de pathologie h\u00e9patique s\u00e9v\u00e8re ou en cours<\/li><li>Dystrophie ovarienne<\/li><li>Interaction m\u00e9dicamenteuse avec le millepertuis, les inducteurs enzymatiques (anticonvulsivants, trith\u00e9rapie, rifampicine)<\/li>"
      },
      "UHLDqWNhdXRpb25zIGQnZW1wbG9pDQ==":{
        "title":"Pr\u00e9cautions d'emploi",
        "data":"<li>Attention \u00e0 l'utilisation chez les adolescentes et jeunes adultes<\/li><li>Facteurs de risques d'ost\u00e9oporose<\/li>"
      },
      "RWZmZXRzIEluZMOpc2lyYWJsZXMN":{
        "title":"Effets Ind\u00e9sirables",
        "data":"<h2>Naus\u00e9es<\/h2>Elles s'estompent souvent apr\u00e8s quelques cycles sinon parlez en a votre m\u00e9decin.<h2>Tensions mammaires<\/h2>Elles s'estompent souvent apr\u00e8s quelques cycles sinon parlez en a votre m\u00e9decin.<h2>Migraine<\/h2>Si cela persiste, parlez-en \u00e0 votre m\u00e9decin.<h2>Spottings : saignements en dehors des r\u00e8gles<\/h2>Poursuivez l'utilisation du progestatif injectable. Si cela persiste plus de trois mois, consultez votre m\u00e9decin."
      },
      "SW5mb3JtYXRpb25zIGNvbXBsw6ltZW50YWlyZXMN":{
        "title":"Informations compl\u00e9mentaires",
        "data":"<li>Sur prescription m\u00e9dicale, en pharmacie<\/li><li>Co\u00fbte 3,33€ l'injection donc pour 3 mois de traitement<\/li><li>Rembours\u00e9e \u00e0 65% par l'Assurance maladie<\/li>"
      }
    }
  },
  "la-cape-cervicale":{
    "title":"La cape cervicale",
    "content":{
      "TGEgY2FwZSBjZXJ2aWNhbGUsIGMnZXN0IHF1b2kgPw0=":{
        "title":"La cape cervicale, c'est quoi ?",
        "data":"C'est une cupule en silicone qui encapuchonne le col de l'ut\u00e9rus."
      },
      "TcOpY2FuaXNtZSBkJ2FjdGlvbg0=":{
        "title":"M\u00e9canisme d'action",
        "data":"Emp\u00eache le passage des spermatozo\u00efdes dans l'ut\u00e9rus."
      },
      "VXRpbGlzYXRpb24N":{
        "title":"Utilisation",
        "data":"<h2>Ins\u00e9rer la cape au niveau du col, de fa\u00e7on \u00e0 encapuchonner le col de l'ut\u00e9rus.<\/h2>Peut se poser \u00e0 l'avance, au maximum 48h avant le rapport sexuel.Il est conseill\u00e9 de mettre du spermicide \u00e0 l'int\u00e9rieur de la cape.<h2>L'enlever au minimum 8h apr\u00e8s le rapport sexuel.<\/h2>Il n'est pas n\u00e9cessaire de changer la cape \u00e0 chaque rapport ni de remettre spermicide si la cape est en place."
      },
      "RWZmaWNhY2l0w6kN":{
        "title":"Efficacit\u00e9",
        "data":"Efficacit\u00e9 variable : de moyennement efficace \u00e0 efficace.<br \/><br \/>Il est plus efficace chez les femmes n'ayant jamais eu d'enfant.<br \/><br \/>Les principales causes d'\u00e9chec sont :<li>le manque d'habitude<\/li><li>les erreurs de manipulation<\/li><li>la non utilisation \u00e0 certains moments du cycle (Il n'y a pas de p\u00e9riode \"sans risque\").<\/li>"
      },
      "QXZhbnRhZ2VzDQ==":{
        "title":"Avantages",
        "data":"<li>Mise en place \u00e0 l'avance<\/li><li>R\u00e9utilisable<\/li><li>Peu co\u00fbteux<\/li><li>Aucune contre-indication m\u00e9dicamenteuse<\/li>"
      },
      "SW5jb252w6luaWVudHMN":{
        "title":"Inconv\u00e9nients",
        "data":"<li>Insertion parfois d\u00e9licate<\/li><li>Ne prot\u00e8ge pas des infections sexuellement transmissibles.<\/li>"
      },
      "Q29udHJlLUluZGljYXRpb25zDQ==":{
        "title":"Contre-Indications",
        "data":"<li>Apr\u00e8s un accouchement<\/li><li>Dysplasie du col<\/li><li>Pendant les r\u00e8gles (emp\u00eache l'\u00e9coulement)<\/li><li>Prolapsus g\u00e9nital<\/li><li>Infection cervico-vaginale en cours<\/li>"
      },
      "UHLDqWNhdXRpb25zIGQnZW1wbG9pDQ==":{
        "title":"Pr\u00e9cautions d'emploi",
        "data":"Il existe 2 tailles : une petite pour les femmes n'ayant jamais eu d'enfant et une plus grande pour les femmes ayant eu des enfants.<br \/><br \/>Il est utilisable pendant 1 an."
      },
      "SW5mb3JtYXRpb25zIGNvbXBsw6ltZW50YWlyZXMN":{
        "title":"Informations compl\u00e9mentaires",
        "data":"<li>La premi\u00e8re pose est faite par le m\u00e9decin ou la sage-femme.<\/li><li>Elle co\u00fbte environ 60€ et utilisable 1 an<\/li><li>N\u00e9cessite une prescription m\u00e9dicale<\/li><li>Se trouve en pharmacie sur commandes ou au Mouvement fran\u00e7ais pour le planning familial.<\/li>"
      }
    }
  },
  "la-contraception-durgence":{
    "title":"La contraception d'urgence",
    "content":{
      "TGEgY29udHJhY2VwdGlvbiBkJ3VyZ2VuY2UsIGMnZXN0IHF1b2kgPw0=":{
        "title":"La contraception d'urgence, c'est quoi ?",
        "data":"M\u00e9thode de rattrapage, exceptionnelle, \u00e0 utiliser lorsqu'il y a eu un rapport sexuel non ou mal prot\u00e9g\u00e9.<br \/><br \/>Il est \u00e9galement possible d'utiliser un dispositif intra-ut\u00e9rin jusqu'\u00e0 5 jours apr\u00e8s le rapport sexuel non prot\u00e9g\u00e9. C'est la m\u00e9thode la plus efficace.<br \/><br \/>Elle ne prot\u00e8ge pas des infections sexuellement transmissibles."
      },
      "TcOpY2FuaXNtZSBkJ2FjdGlvbg0=":{
        "title":"M\u00e9canisme d'action",
        "data":"La pilule de la contraception d'urgence emp\u00eache l'ovulation (ou la retarde).Cette pilule est inefficace une fois que la nidation (l'ovocyte f\u00e9cond\u00e9 s'est implant\u00e9) a commenc\u00e9."
      },
      "VXRpbGlzYXRpb24N":{
        "title":"Utilisation",
        "data":"A prendre le plus t\u00f4t possible apr\u00e8s le rapport sexuel \u00e0 risque.<li>Norlevo\u00ae (levonorgestrel) au plus tard jusqu'\u00e0 3 jours apr\u00e8s le rapport \u00e0 risque.<\/li><li>Ella one\u00ae au plus tard jusqu'\u00e0 5 jours apr\u00e8s le rapport \u00e0 risque.<\/li><br \/><br \/>Peut \u00eatre pris lors des oublis de pilule, anneau vaginal et patch ou lors des accidents d'utilisation du pr\u00e9servatif"
      },
      "RWZmaWNhY2l0w6kN":{
        "title":"Efficacit\u00e9",
        "data":"D'autant plus efficace si elle est prise t\u00f4t"
      },
      "Q29udHJlLUluZGljYXRpb25zDQ==":{
        "title":"Contre-Indications",
        "data":"<li>Aucune<\/li><li>Pr\u00e9cautions d'emploi<\/li><li>Ne peut \u00eatre une contraception r\u00e9guli\u00e8re (inadapt\u00e9)<\/li><li>Efficacit\u00e9 non garantie si utilis\u00e9e \u00e0 plusieurs reprises<\/li>"
      },
      "RWZmZXRzIEluZMOpc2lyYWJsZXMN":{
        "title":"Effets Ind\u00e9sirables",
        "data":"<li>Retarde les r\u00e8gles<\/li><li>Saignements<\/li><li>Naus\u00e9es<\/li><li>Vomissements : Si le comprim\u00e9 a \u00e9t\u00e9 pris moins de 4H avant les vomissements, il faut en reprendre un autre.<\/li>"
      },
      "SW5mb3JtYXRpb25zIGNvbXBsw6ltZW50YWlyZXMN":{
        "title":"Informations compl\u00e9mentaires",
        "data":"<h2>Norlevo\u00ae<\/h2>Co\u00fbte 7,5€ le comprim\u00e9.<br \/><br \/>D\u00e9livr\u00e9 sans prescription m\u00e9dicale en pharmacie.<br \/><br \/>Gratuitement et dans l'anonymat pour les mineurs en pharmacie, \u00e0 l'infirmerie dans leurs \u00e9tablissements scolaires, ou dans un centre de planification.<h2>Ella one\u00ae<\/h2>D\u00e9livr\u00e9 avec prescription m\u00e9dicale en pharmacieCo\u00fbte entre 30€ et 35€ le comprim\u00e9."
      },
      "urgence":{
        "title":"Les contraceptifs d'urgence",
        "data":"Cette partie sera li\u00e9e directement \u00e0 la section m\u00e9dicaments de l'application. Donn\u00e9es officielles ANSM (AFSSAPS)."
      }
    }
  }
}

MyData.IndexSpecialites = [{"id":"5053","atc":"G03AA07","nom":"Adepal Cpr","liste":"LISTE I","sa":"ethinylestradiol"},{"id":"10604","atc":"G02BB","nom":"Alpagelle 0,9% Creme Vaginal Unidose","liste":"SANS LISTE","sa":"miristalkonium chlorure"},{"id":"2394","atc":"G02BB","nom":"Alpagelle 0,9% Creme Vaginale 80g","liste":"SANS LISTE","sa":"miristalkonium chlorure"},{"id":"25026","atc":"G03AB03","nom":"Amarance Cpr","liste":"LISTE I","sa":"ethinylestradiol"},{"id":"29426","atc":"G03AA12","nom":"Belanette 0,02mg\/3mg Cpr","liste":"LISTE I","sa":"drospirenone"},{"id":"19470","atc":"G03AB07","nom":"Belara 0,03mg\/2mg Cpr","liste":"LISTE I","sa":"ethinylestradiol"},{"id":"20364","atc":"G03AA10","nom":"Carlin 75microg\/20microg Cpr","liste":"LISTE I","sa":"ethinylestradiol"},{"id":"20367","atc":"G03AA10","nom":"Carlin 75microg\/30microg Cpr","liste":"LISTE I","sa":"ethinylestradiol"},{"id":"12609","atc":"G03AC09","nom":"Cerazette 0,075mg Cpr","liste":"LISTE I","sa":"desogestrel"},{"id":"2916","atc":"G03AA11","nom":"Cilest Cpr","liste":"LISTE I","sa":"norgestimate"},{"id":"29787","atc":"G03AA12","nom":"Convuline 0,03mg\/3mg Cpr","liste":"LISTE I","sa":"ethinylestradiol"},{"id":"3902","atc":"G03AA09","nom":"Cycleane 30microg Cpr","liste":"LISTE I","sa":"ethinylestradiol"},{"id":"14948","atc":"G03AB03","nom":"Daily Cpr","liste":"LISTE I","sa":"ethinylestradiol"},{"id":"27806","atc":"G03AA09","nom":"Desobel 150microg\/20microg Cpr","liste":"LISTE I","sa":"ethinylestradiol"},{"id":"27807","atc":"G03AA09","nom":"Desobel 150microg\/30microg Cpr","liste":"LISTE I","sa":"ethinylestradiol"},{"id":"16233","atc":"G03AA09","nom":"Desogestrel Ethinyl BGA 150\/20 Cpr","liste":"LISTE I","sa":"ethinylestradiol"},{"id":"16236","atc":"G03AA09","nom":"Desogestrel Ethinyl BGA 150\/30 Cpr","liste":"LISTE I","sa":"ethinylestradiol"},{"id":"31457","atc":"G03AA09","nom":"Desogestrel RTP 75mcg Cpr","liste":"LISTE I","sa":"desogestrel"},{"id":"31177","atc":"G03AA12","nom":"Drospibel 0,02mg\/3mg Cpr","liste":"LISTE I","sa":"drospirenone"},{"id":"31181","atc":"G03AA12","nom":"Drospibel 0,03mg\/3mg Cpr","liste":"LISTE I","sa":"ethinylestradiol"},{"id":"30548","atc":"G03AA10","nom":"Edenelle Cpr","liste":"LISTE I","sa":"ethinylestradiol"},{"id":"20435","atc":"G03AA10","nom":"Efezial 75microg\/20microg Cpr","liste":"LISTE I","sa":"ethinylestradiol"},{"id":"20434","atc":"G03AA10","nom":"Efezial 75microg\/30microg Cpr","liste":"LISTE I","sa":"ethinylestradiol"},{"id":"8832","atc":"G03AA11","nom":"Effiprev Cpr","liste":"LISTE I","sa":"norgestimate"},{"id":"26233","atc":"G03AD02","nom":"Ellaone 30mg Cpr","liste":"LISTE I","sa":"ulipristal acetate"},{"id":"30274","atc":"G03AA12","nom":"Ethinylestradiol DR BGA 0,02\/3mg Cpr","liste":"LISTE I","sa":"drospirenone"},{"id":"30275","atc":"G03AA12","nom":"Ethinylestradiol DR BGA 0,03\/3mg Cpr","liste":"LISTE I","sa":"drospirenone"},{"id":"31185","atc":"G03AA12","nom":"Ethinylestradiol DR Bgacontinu Cpr","liste":"LISTE I","sa":"drospirenone"},{"id":"25113","atc":"G03AB03","nom":"Evanecia Cpr","liste":"LISTE I","sa":"ethinylestradiol"},{"id":"16226","atc":"G03AA13","nom":"Evra Disp Transderm","liste":"LISTE I","sa":"ethinylestradiol"},{"id":"21689","atc":"G03AA10","nom":"Felixita 75microg\/20microg Cpr GE","liste":"LISTE I","sa":"gestodene"},{"id":"21691","atc":"G03AA10","nom":"Felixita 75microg\/30microg Cpr GE","liste":"LISTE I","sa":"ethinylestradiol"},{"id":"24537","atc":"G03AA10","nom":"Gestodene Ethi ACT 75\/20microg Cpr","liste":"LISTE I","sa":"gestodene"},{"id":"24554","atc":"G03AA10","nom":"Gestodene Ethi ACT 75\/30microg Cpr","liste":"LISTE I","sa":"ethinylestradiol"},{"id":"31762","atc":"G03AA10","nom":"Gestodene Ethi ARW 60\/15microg Cpr","liste":"LISTE I","sa":"ethinylestradiol"},{"id":"21692","atc":"G03AA10","nom":"Gestodene Ethi ARW 75\/20microg Cpr","liste":"LISTE I","sa":"gestodene"},{"id":"21695","atc":"G03AA10","nom":"Gestodene Ethi ARW 75\/30microg Cpr","liste":"LISTE I","sa":"gestodene"},{"id":"29843","atc":"G03AA10","nom":"Gestodene Ethi BGA 60\/15microg Cpr","liste":"LISTE I","sa":"ethinylestradiol"},{"id":"20392","atc":"G03AA10","nom":"Gestodene Ethi BGA 75\/20microg Cpr","liste":"LISTE I","sa":"gestodene"},{"id":"20403","atc":"G03AA10","nom":"Gestodene Ethi BGA 75\/30microg Cpr","liste":"LISTE I","sa":"ethinylestradiol"},{"id":"21584","atc":"G03AA10","nom":"Gestodene Ethi EG 75\/20microg Cpr","liste":"LISTE I","sa":"gestodene"},{"id":"21585","atc":"G03AA10","nom":"Gestodene Ethi EG 75\/30microg Cpr","liste":"LISTE I","sa":"gestodene"},{"id":"22215","atc":"G03AA10","nom":"Gestodene Ethi RBX 75\/20microg Cpr","liste":"LISTE I","sa":"ethinylestradiol"},{"id":"22217","atc":"G03AA10","nom":"Gestodene Ethi RBX 75\/30microg Cpr","liste":"LISTE I","sa":"ethinylestradiol"},{"id":"21696","atc":"G03AA10","nom":"Gestodene Ethi RTP 75\/20microg Cpr","liste":"LISTE I","sa":"gestodene"},{"id":"21697","atc":"G03AA10","nom":"Gestodene Ethi RTP 75\/30microg Cpr","liste":"LISTE I","sa":"gestodene"},{"id":"21701","atc":"G03AA10","nom":"Gestodene Ethi SDZ 75\/20microg Cpr","liste":"LISTE I","sa":"gestodene"},{"id":"21703","atc":"G03AA10","nom":"Gestodene Ethi SDZ 75\/30microg Cpr","liste":"LISTE I","sa":"gestodene"},{"id":"29844","atc":"G03AA10","nom":"Gestodene Ethi TVC 60\/15microg Cpr","liste":"LISTE I","sa":"ethinylestradiol"},{"id":"21788","atc":"G03AA10","nom":"Gestodene Ethi TVC 75\/20microg Cpr","liste":"LISTE I","sa":"ethinylestradiol"},{"id":"21793","atc":"G03AA10","nom":"Gestodene Ethi TVC 75\/30microg Cpr","liste":"LISTE I","sa":"ethinylestradiol"},{"id":"31892","atc":"G03AA10","nom":"Gestodene Ethi Zen 60\/15microg Cpr","liste":"LISTE I","sa":"ethinylestradiol"},{"id":"21771","atc":"G03AA10","nom":"Gestodene Ethi Zen 75\/20microg Cpr","liste":"LISTE I","sa":"ethinylestradiol"},{"id":"21782","atc":"G03AA10","nom":"Gestodene Ethi Zen 75\/30microg Cpr","liste":"LISTE I","sa":"ethinylestradiol"},{"id":"22221","atc":"G03AA10","nom":"Gestodene Ethi ZYD 75\/20microg Cpr","liste":"LISTE I","sa":"ethinylestradiol"},{"id":"22222","atc":"G03AA10","nom":"Gestodene Ethi ZYD 75\/30microg Cpr","liste":"LISTE I","sa":"ethinylestradiol"},{"id":"8927","atc":"G03AA10","nom":"Harmonet 75microg\/20microg Cpr","liste":"LISTE I","sa":"ethinylestradiol"},{"id":"28194","atc":"G03AA10","nom":"Harmonet 75microg\/20microg Cpr (be)","liste":"LISTE I","sa":"ethinylestradiol"},{"id":"14572","atc":"G03AA12","nom":"Jasmine 0,03mg\/3mg Cpr","liste":"LISTE I","sa":"ethinylestradiol"},{"id":"20964","atc":"G03AA12","nom":"Jasminelle 0,02mg\/3mg Cpr","liste":"LISTE I","sa":"drospirenone"},{"id":"22921","atc":"G03AA12","nom":"Jasminellecontinu 0,02mg\/3mg Cpr","liste":"LISTE I","sa":"drospirenone"},{"id":"28114","atc":"G03AA07","nom":"Leeloo 0,1mg\/0,02mg Cpr G\u00e9","liste":"LISTE I","sa":"ethinylestradiol"},{"id":"22224","atc":"G03AD01","nom":"Levonorgestrel BGA 1,5mg Cpr","liste":"SANS LISTE","sa":"levonorgestrel"},{"id":"28802","atc":"G03AA07","nom":"Lovavulo 20microg\/100microg Cpr Pell","liste":"LISTE I","sa":"levonorgestrel"},{"id":"14953","atc":"G03AA07","nom":"Ludeal Cpr","liste":"LISTE I","sa":"ethinylestradiol"},{"id":"8928","atc":"G03AA10","nom":"Meliane 75microg\/20microg Cpr","liste":"LISTE I","sa":"gestodene"},{"id":"12150","atc":"G03AA10","nom":"Melodia Cpr","liste":"LISTE I","sa":"ethinylestradiol"},{"id":"2890","atc":"G03AA09","nom":"Mercilon Cpr","liste":"LISTE I","sa":"ethinylestradiol"},{"id":"514","atc":"G03AD01","nom":"Microval 0,03mg Cpr","liste":"LISTE I","sa":"levonorgestrel"},{"id":"12031","atc":"G03AA10","nom":"Minesse Cpr","liste":"LISTE I","sa":"ethinylestradiol"},{"id":"4631","atc":"G03AA07","nom":"Minidril 0,15\/0,03mg Cpr","liste":"LISTE I","sa":"ethinylestradiol"},{"id":"3907","atc":"G03AA10","nom":"Minulet 75microg\/30microg Cpr","liste":"LISTE I","sa":"ethinylestradiol"},{"id":"3898","atc":"G03AA10","nom":"Moneva 75microg\/30microg Cpr","liste":"LISTE I","sa":"gestodene"},{"id":"13563","atc":"G03AC08","nom":"Nexplanon 68mg Implant","liste":"LISTE I","sa":"etonogestrel"},{"id":"17178","atc":"G03AD01","nom":"Norlevo 1,5mg Cpr","liste":"SANS LISTE","sa":"levonorgestrel"},{"id":"16606","atc":"G02BB01","nom":"Nuvaring 15\/120microg\/24h Syst Vag","liste":"LISTE I","sa":"etonogestrel"},{"id":"31554","atc":"G03AA12","nom":"Optilova 20\/100mcg Cpr","liste":"LISTE I","sa":"levonorgestrel"},{"id":"31190","atc":"G03AA10","nom":"Optinesse 60mcg\/15mcg Cpr","liste":"LISTE I","sa":"ethinylestradiol"},{"id":"25592","atc":"G03AA07","nom":"Pacilia Cpr G\u00e9","liste":"LISTE I","sa":"ethinylestradiol"},{"id":"19942","atc":"G03AB06","nom":"Perleane Cpr","liste":"LISTE I","sa":"ethinylestradiol"},{"id":"677","atc":"G03AB06","nom":"Phaeva Cpr","liste":"LISTE I","sa":"ethinylestradiol"},{"id":"2403","atc":"G02BB","nom":"Pharmatex 1,2% CR Vaginale Avec Appl","liste":"SANS LISTE","sa":"benzalkonium chlorure"},{"id":"10530","atc":"G02BB","nom":"Pharmatex 1,2% CR Vaginale SS Appl","liste":"SANS LISTE","sa":"benzalkonium chlorure"},{"id":"13883","atc":"G02BB","nom":"Pharmatex 18,9mg Capsule Vaginale","liste":"SANS LISTE","sa":"benzalkonium chlorure"},{"id":"2893","atc":"G02BB","nom":"Pharmatex 18,9mg Mini Ovule","liste":"SANS LISTE","sa":"benzalkonium chlorure"},{"id":"2406","atc":"G02BB","nom":"Pharmatex 18,9mg Ovule","liste":"SANS LISTE","sa":"benzalkonium chlorure"},{"id":"10531","atc":"G02BB","nom":"Pharmatex 54mg CR Vaginale Unidose","liste":"SANS LISTE","sa":"benzalkonium chlorure"},{"id":"31192","atc":"G03AA12","nom":"Rimendia 0,02mg\/3mg Cpr","liste":"LISTE I","sa":"drospirenone"},{"id":"7504","atc":"G03AA06","nom":"Stediril 0,5mg\/0,05mg Cpr","liste":"LISTE I","sa":"ethinylestradiol"},{"id":"30906","atc":"G03AA10","nom":"Sylviane Cpr","liste":"LISTE I","sa":"ethinylestradiol"},{"id":"2917","atc":"G03AB06","nom":"Tri Minulet Cpr","liste":"LISTE I","sa":"ethinylestradiol"},{"id":"15451","atc":"G03AA11","nom":"Triafemi Cpr","liste":"LISTE I","sa":"ethinylestradiol"},{"id":"15450","atc":"G03AA11","nom":"Tricilest Cpr","liste":"LISTE I","sa":"ethinylestradiol"},{"id":"7047","atc":"G03AA05","nom":"Triella Cpr","liste":"LISTE I","sa":"ethinylestradiol"},{"id":"500","atc":"G03AB03","nom":"Trinordiol Cpr","liste":"LISTE I","sa":"ethinylestradiol"},{"id":"9109","atc":"G03AA09","nom":"Varnoline Continu Cpr","liste":"LISTE I","sa":"ethinylestradiol"},{"id":"511","atc":"G03AA09","nom":"Varnoline Cpr","liste":"LISTE I","sa":"desogestrel"},{"id":"24451","atc":"G03AA12","nom":"Yaz 0,02mg\/3mg Cpr","liste":"LISTE I","sa":"drospirenone"}]

MyData.lang=  {};
MyData.lang.Fr = function() {

Ext.onReady(function() {
	
	Ext.Date.dayNames = [
	        "Dimanche",
	        "Lundi",
	        "Mardi",
	        "Mercredi",
	        "Jeudi",
	        "Vendredi",
	        "Samedi"
	];
	
	Ext.Date.monthNames = [
	        "Janvier",
	        "Février",
	        "Mars",
	        "Avril",
	        "Mai",
	        "Juin",
	        "Juillet",
	        "Août",
	        "Septembre",
	        "Octobre",
	        "Novembre",
	        "Décembre"
	];
	
	Ext.Date.monthNumbers = {
	    'Jan': 0,
	    'Feb': 1,
	    'Mar': 2,
	    'Apr': 3,
	    'May': 4,
	    'Jun': 5,
	    'Jul': 6,
	    'Aug': 7,
	    'Sep': 8,
	    'Oct': 9,
	    'Nov': 10,
	    'Dec': 11
	};
	
	if (Ext.picker.Picker){
	    Ext.override(Ext.picker.Picker, {
	        doneText: 'Done'    
	    });
	}
	
	if (Ext.picker.Date) {
	    Ext.override(Ext.picker.Date, {
	        'dayText': 'Jour',
	        'monthText': 'Mois',
	        'yearText': 'Année',
	        'slotOrder': ['day', 'month', 'year']    
	    });
	}
	
	if(Ext.IndexBar){
	    Ext.override(Ext.IndexBar, {
	        'letters': ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']    
	    });
	}
	
	if(Ext.NestedList){
	    Ext.override(Ext.NestedList, {
	        'backText': 'Retour',
	        'loadingText': 'Chargement...',
	        'emptyText': 'No items available.'
	    });
	}
	
	if(Ext.util.Format){
	    Ext.util.Format.defaultDateFormat = 'd/m/Y';
	}
	
	if(Ext.MessageBox){
	    Ext.MessageBox.OK.text = 'OK';
	    Ext.MessageBox.CANCEL.text = 'Annuler';
	    Ext.MessageBox.YES.text = 'Oui';
	    Ext.MessageBox.NO.text = 'Non';
	}

});

}




function GCM_Event(e) {

	console.log('<li>EVENT -> RECEIVED:' + e.event + '</li>');
	switch( e.event ) {
		case 'registered':
			var deviceToken = e.regid;
			window.localStorage.setItem("token",deviceToken);
			console.log('registerDevice: ' + deviceToken);
			break

  case 'message':
			console.log("ICI");
			var alertDismissed = function() {
			
			}
	        navigator.notification.alert(
	            e.message,  // message
	            alertDismissed,         // callback
	            '28 jours',            // title
	            'Merci'                  // buttonName
	        );

    break;


  case 'error':

   alert(e.msg);

    break;



  default:


    break;
  }
} 

var myAppNative = {

	setAlert: function(e) {
		window.localStorage.setItem("alerte", JSON.stringify(e));
		f = e;
		var urlString = "http://push.appocrate.fr/apns.php?task=register";
   		urlString += "&appname=28jours";
   		urlString += "&appversion=1";
		if(window.device!=null) {
	   		urlString += "&deviceuuid="+Ext.device.Device.uuid;
	   		urlString += "&devicetoken="+window.localStorage.getItem("token");
	   		urlString += "&devicename="+Ext.device.Device.name;
	   		urlString += "&deviceplatform="+Ext.device.Device.platform;
		}
   		urlString += "&regles="+encodeURI(f.start);
   		urlString += "&heure="+encodeURI(f.heure);
   		urlString += "&message="+encodeURI(f.message);
   		urlString += "&drug="+encodeURI(f.drug);

		Ext.Ajax.request({
		    url: urlString,
		    method: 'GET',
		
		    callback: function(response) {
				 navigator.notification.confirm(
				        'C\'est fait',
				        function() { },
				        'Message',
						'Merci'
				    );
		    }
		});

	},

	setPrise: function(d) {
		pp = JSON.parse(window.localStorage.getItem("alerte"));
		console.log(pp);
		if(pp==null) {
			pp = { prises : {} };
		}
		pp.prises[d.prise] = true;
		window.localStorage.setItem("alerte", JSON.stringify(pp))
	},

	removePrise: function(d) {
		pp = JSON.parse(Ti.App.Properties.getObject("alerte"));
		delete pp.prises[d.prise];
		window.localStorage.setItem("alerte", JSON.stringify(pp));
	},

	removeAlert: function(name, key) {

		var urlString = "http://push.appocrate.fr/apns.php?task=unregister";
   		urlString += "&appname=28jours";
   		urlString += "&devicetoken="+window.localStorage.getItem("token");
   		urlString += "&devicename="+Ext.device.Device.name;

		Ext.Ajax.request({
		    url: urlString,
		    method: 'GET',
		
		    params: {
		        username: 'Ed',
		        password: 'not a good place to put a password'
		    },
		
		    callback: function(response) {
				 navigator.notification.confirm(
				        'C\'est supprimé',
				        function() { },
				        'Message',
						'Merci'
				    );
		    }
		});

	},

	iOsPushInit: function() {
		console.warn("pushinit");
	    var pushNotification = window.plugins.pushNotification;
	    pushNotification.onDeviceReady();
	 
	    pushNotification.registerDevice({
	    		alert:true, 
	    		badge:true, 
	    		sound:true, 
	    		pw_appid:"PUSHWOOSH_APP_ID", 
	    		appname:"APP_NAME"
	    	},
	        function(status) {
	            var deviceToken = status['deviceToken'];
				window.localStorage.setItem("token",deviceToken);
	            console.warn('registerDevice: ' + deviceToken);
	        },
	        function(status) {
	            console.warn('failed to register : ' + JSON.stringify(status));
	            navigator.notification.alert(JSON.stringify(['failed to register ', status]));
	        }
	    );
	 
	    pushNotification.setApplicationIconBadgeNumber(0);
	 
	    document.addEventListener('push-notification', function(event) {
	        var notification = event.notification;
	        navigator.notification.alert(notification.aps.alert);
	        pushNotification.setApplicationIconBadgeNumber(0);
	    });
	},

	androidPushInit: function() {

		window.GCM.register("461723125949", "GCM_Event", GCM_Success, GCM_Fail );
		
	},

};

function GCM_Success(a) {

}

function GCM_Fail(a) {

}



		    	function setAlerts(al) {
		    		al = JSON.parse(al);
					for(var k in al) {
						d = k.split("-");
						val = new Date(d[2],(parseFloat(d[1])-1),d[0]);
						Ext.getCmp("calView").getDateCell(val).addCls("check");
						Ext.getCmp("calView").getDateCell(val).dom.children[0].innerHTML = "Prise effectuée";
					}
				}
				var myAlert;
				
(function(h){function f(c,d){document.write('<meta name="'+c+'" content="'+d+'">')}if("undefined"===typeof g)var g=h.Ext={};g.blink=function(c){var d=c.js||[],c=c.css||[],b,e,a;f("viewport","width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no");f("apple-mobile-web-app-capable","yes");f("apple-touch-fullscreen","yes");b=0;for(e=c.length;b<e;b++)a=c[b],"string"!=typeof a&&(a=a.path),document.write('<link rel="stylesheet" href="'+a+'">');b=0;for(e=d.length;b<
e;b++)a=d[b],"string"!=typeof a&&(a=a.path),document.write('<script src="'+a+'"><\/script>')}})(this);;Ext.blink({"id":"d78b9ca6-a38b-4f05-894c-e9a755676563","js":[{"path":"resources/js/cordova-2.5.0.js","type":"js"},{"path":"resources/js/GCMPlugin.js","type":"js"},{"path":"resources/js/native.js","type":"js"},{"path":"app.js","type":"js"}],"css":[{"path":"resources/css/app.css","update":"delta","type":"css"},{"path":"resources/css/28jours.css","update":"delta","type":"css"},{"path":"resources/css/Ext.ux.TouchCalendarView.css","update":"delta","type":"css"}]})

MyData.Articles = {
  "la-pilule":{
    "title":"La pilule",
    "content":{
      "TGEgcGlsdWxlLCBjJ2VzdCBxdW9pID8N":{
        "title":"La pilule, c'est quoi ?",
        "data":"La pilule est un m\u00e9dicament disponible en pharmacie sur ordonnance.<br \/><br \/>Il en existe 2 types : les pilules combin\u00e9es, dites oestro-progestatives qui contiennent de l'oestrog\u00e8ne et de la progest\u00e9rone et les pilules progestatives (ou microprogestatives) contenant uniquement de la progest\u00e9rone.<br \/><div class='attention'>Attention, la pilule ne prot\u00e8ge pas des Infections Sexuellement Transmissibles (IST).<\/div>"
      },
      "TcOpY2FuaXNtZSBkJ2FjdGlvbg0=":{
        "title":"M\u00e9canisme d'action",
        "data":"La pilule oestro-progestative (dite \"combin\u00e9e\") agit principalement en bloquant l'ovulation, elle modifie l'endom\u00e8tre (muqueuse tapissant l'int\u00e9rieur de l'ut\u00e9rus) de fa\u00e7on \u00e0 ce qu'il ne puisse pas accueillir un \u00e9ventuel oeuf et modifiant la glaire pour emp\u00eacher les spermatozo\u00efdes de franchir le col.<br \/><br \/>La micropilule (microdoses de progestatif) agit uniquement en modifiant la glaire pour emp\u00eacher les spermatozo\u00efdes de franchir le col -  Certaines  micropilules peuvent aussi bloquer l'ovulation.<br \/><div class='attention'>Attention, la pilule ne prot\u00e8ge pas des Infections Sexuellement Transmissibles.<\/div>"
      },
      "VXRpbGlzYXRpb24N":{
        "title":"Utilisation",
        "data":"<li>Si la boite contient 28 comprim\u00e9s, il faut prendre un comprim\u00e9 tous les jours \u00e0 heure fixe, sans s'arr\u00eater entre les plaquettes.<\/li><li>Si la boite contient 21 comprim\u00e9s, il faut prendre un comprim\u00e9 par jour \u00e0 heure fixe pendant 21 jours, puis s'arr\u00eater pendant 7 jours (p\u00e9riode des r\u00e8gles) avant de recommencer une nouvelle plaquette.<\/li><br \/>Pour commencer la pilule et donc la premi\u00e8re plaquette, le premier comprim\u00e9 doit \u00eatre pris le premier jour des r\u00e8gles. D\u00e8s le premier comprim\u00e9, vous \u00eates prot\u00e9g\u00e9e d'une \u00e9ventuelle grossesse.<br \/><br \/>Sinon, vous pouvez commencer la pilule \u00e0 n'importe quel jour du cycle mais il faudra attendre 7 jours de prise pour \u00eatre prot\u00e9g\u00e9e d'une \u00e9ventuelle grossesse. Pendant les 7 premiers jours utilisez des pr\u00e9servatifs."
      },
      "RWZmaWNhY2l0w6kN":{
        "title":"Efficacit\u00e9",
        "data":"Efficacit\u00e9 excellente<br \/><br \/>Elle peut cependant \u00eatre compromise dans les cas suivants :<li>Oublis (plus ou moins graves selon le type de pilule et la p\u00e9riode du cycle)<\/li><li>Non absorption du comprim\u00e9 et diminution d'efficacit\u00e9 en cas de vomissements ou de diarrh\u00e9es<\/li><li>Interaction avec certains m\u00e9dicaments<\/li>"
      },
      "QXZhbnRhZ2VzDQ==":{
        "title":"Avantages",
        "data":"<li>Efficacit\u00e9 excellente<\/li><li>Tol\u00e9rance excellente<\/li><li>R\u00e9versibilit\u00e9<\/li><li>R\u00e9gularit\u00e9 des cycles<\/li><li>Diminution du volume et des douleurs des r\u00e8gles <\/li>"
      },
      "SW5jb252w6luaWVudHMN":{
        "title":"Inconv\u00e9nients",
        "data":"N\u00e9cessit\u00e9 d'une bonne observance (prise du comprim\u00e9 \u00e0 heure fixe sans oubli)"
      },
      "Q29udHJlLWluZGljYXRpb25zLCBQcsOpY2F1dGlvbnMgZCdlbXBsb2kN":{
        "title":"Contre-indications, Pr\u00e9cautions d'emploi",
        "data":"<li>Anomalie de la coagulation sanguine<\/li><li>Ant\u00e9c\u00e9dent d'accident thrombo-embolique ou de thrombose art\u00e9rielle<\/li><li>Certains cancers<\/li><li>Certaines migraines<\/li><li>Certaines affections h\u00e9patiques<\/li><li>Hypercholest\u00e9rol\u00e9mie<\/li><li>Hypertension art\u00e9rielle<\/li><li>Tabagisme<\/li><li>Varices<\/li><li>Certaines interactions m\u00e9dicamenteuses<\/li>"
      },
      "RWZmZXRzIGluZMOpc2lyYWJsZXMN":{
        "title":"Effets ind\u00e9sirables",
        "data":"<h2>Migraine<\/h2>Un mauvais dosage peut provoquer des migraines. Si cela persiste parlez-en \u00e0 votre m\u00e9decin.<h2>Prise de poids<\/h2>La prise de poids est possible mais souvent tr\u00e8s mod\u00e9r\u00e9e, r\u00e9versible, et peut \u00eatre parfaitement maitris\u00e9e.<h2>Spottings : saignements en dehors des r\u00e8gles<\/h2>Il faut continuer normalement la prise de la pilule car cet effet est g\u00e9n\u00e9ralement transitoire. Si cela persiste plus de trois mois, consultez votre m\u00e9decin.<h2>Naus\u00e9es<\/h2>Prendre la pilule au milieu des repas. Si cela persiste, consultez votre m\u00e9decin.<h2>Douleurs et gonflements des seins<\/h2>Sans danger, si cela persiste consultez votre m\u00e9decin pour revoir la prescription."
      },
      "SWTDqWVzIHJlw6d1ZXMN":{
        "title":"Id\u00e9es re\u00e7ues",
        "data":"<h2>La pilule fait grossir<\/h2>Oui avec les anciennes pilules fortement dos\u00e9es.Non avec les nouvelles pilules faiblement dos\u00e9es.En fait, il y a une possibilit\u00e9 d'augmentation de l'app\u00e9tit les premiers mois de la prise mais la prise de poids reste minime.<h2>La pilule donne des boutons<\/h2>Non, en g\u00e9n\u00e9ral elle est bien tol\u00e9r\u00e9e et m\u00eame certaines pilules peuvent am\u00e9liorer l'acn\u00e9.<h2>Il y a un risque de cancer<\/h2>La contraception orale n'est pas associ\u00e9e \u00e0 un risque accru de cancer. Les femmes prenant la pilule ont une meilleure surveillance m\u00e9dicale donc un meilleur d\u00e9pistage. En revanche, la contraception orale est contre-indiqu\u00e9e en cas de certains cancers (le sein par exemple)<h2>La pilule prot\u00e8ge des Infections Sexuellement Transmissibles<\/h2>Non, en cas de rapport \u00e0 risque d'Infections Sexuellement Transmissibles utiliser des pr\u00e9servatifs.<h2>La pilule rend st\u00e9rile<\/h2>Aucun effet sur la fertilit\u00e9, elle est r\u00e9tablie d\u00e8s l'arr\u00eat de la pilule.<h2>La pilule doit \u00eatre arr\u00eat\u00e9e quelques mois avant une grossesse<\/h2>D\u00e8s l'arr\u00eat de la pilule, une grossesse peut survenir puisque des cycles ovulatoires peuvent revenir d\u00e8s le mois suivant.On observe parfois une p\u00e9riode d'am\u00e9norrh\u00e9e (sans r\u00e8gles) de quelques cycles apr\u00e8s l'arr\u00eat de la pilule.Si une grossesse survient sous pilule (oubli) ou juste apr\u00e8s l'arr\u00eat, la grossesse ne comporte pas de risque sp\u00e9cifique.<h2>On doit arr\u00eater la pilule de temps en temps<\/h2>Non, on peut la prendre aussi longtemps que n\u00e9cessaire mais son renouvellement doit \u00eatre r\u00e9guli\u00e8rement rediscut\u00e9.<h2>Il y a un \u00e2ge pour commencer la pilule<\/h2>Non, on peut la prendre d\u00e8s que l'on fait la demande d'une contraception. Elle peut \u00eatre \u00e9galement prescrite dans un but th\u00e9rapeutique (r\u00e9gularisation des cycles), et \u00eatre commenc\u00e9e \u00e0 un plus jeune \u00e2ge tel que le d\u00e9but de l'adolescence.<h2>On ne peut pas prendre la pilule si on fume<\/h2>L'association pilule et tabac augmentent certains risques cardiovasculaires. Ce risque est major\u00e9 avec l'\u00e2ge. Avant 35 ans, la prise de pilule est possible mais avec certaines pr\u00e9cautions. Apr\u00e8s 35 ans, elle est vivement d\u00e9conseill\u00e9e. Dans tous les cas il faut en parler \u00e0 votre m\u00e9decin."
      },
      "SW5mb3JtYXRpb25zIGNvbXBsw6ltZW50YWlyZXMN":{
        "title":"Informations compl\u00e9mentaires",
        "data":"<li>Disponible en pharmacie sur ordonnance<\/li><li>La pilule co\u00fbte entre 1,70 euros \u00e0 15 euros \u00e0 chaque cycle.<\/li><li>Certaines pilules sont rembours\u00e9es par l'assurance maladie.<\/li>"
      },
      "lespilules":{
        "title":"Les diff\u00e9rentes pilules",
        "data":"Cette partie sera li\u00e9e directement \u00e0 la section m\u00e9dicaments de l'application. Donn\u00e9es officielles ANSM (AFSSAPS)."
      },
      "RW4gY2FzIGQnb3VibGkN":{
        "title":"En cas d'oubli",
        "data":"Cette partie sera li\u00e9e directement \u00e0 la section m\u00e9dicaments de l'application. Donn\u00e9es officielles ANSM (AFSSAPS)."
      }
    }
  },
  "le-preservatif-masculin-":{
    "title":"Le pr\u00e9servatif masculin ",
    "content":{
      "TGUgcHLDqXNlcnZhdGlmIG1hc2N1bGluLCBjJ2VzdCBxdW9pID8N":{
        "title":"Le pr\u00e9servatif masculin, c'est quoi ?",
        "data":"Le pr\u00e9servatif masculin est un \u00e9tui mince et souple en latex ou en polyur\u00e9thane (en cas d'allergie au latex). "
      },
      "TcOpY2FuaXNtZSBkJ2FjdGlvbg0=":{
        "title":"M\u00e9canisme d'action",
        "data":"De part sa structure imperm\u00e9able il emp\u00eache le passage des spermatozo\u00efdes dans le vagin, et donc la f\u00e9condation.<br \/><br \/>Il est le seul contraceptif \u00e0 prot\u00e9ger des infections sexuellement transmissibles"
      },
      "VXRpbGlzYXRpb24N":{
        "title":"Utilisation",
        "data":"Il est \u00e0 usage unique, il faut utiliser un pr\u00e9servatif \u00e0 chaque rapport sexuel.<br \/><br \/>Il se d\u00e9roule sur le p\u00e9nis en \u00e9rection avant la p\u00e9n\u00e9tration et retient le sperme. Avant la fin de l'\u00e9rection, il faut se retirer en retenant le pr\u00e9servatif \u00e0 la base du p\u00e9nis, puis faire un noeud et le jeter \u00e0 la poubelle."
      },
      "RWZmaWNhY2l0w6kN":{
        "title":"Efficacit\u00e9",
        "data":"Sous r\u00e9serve d'\u00eatre correctement utilis\u00e9, l'efficacit\u00e9 du pr\u00e9servatif masculin est bonne.<br \/><br \/>Pour \u00eatre efficace le pr\u00e9servatif doit \u00eatre utilis\u00e9 pour TOUS les rapports sexuels, \u00e0 TOUT moment du cycle, car il n'y a pas de p\u00e9riode \"sans risque\"."
      },
      "QXZhbnRhZ2VzDQ==":{
        "title":"Avantages",
        "data":"<li>Protection des infections sexuellement transmissibles<\/li><li>Facilit\u00e9 de procuration (pharmacies, grandes surfaces)<\/li><li>Disponibilit\u00e9 pour des rapports non planifi\u00e9s<\/li><li>Sans ordonnance m\u00e9dicale<\/li>"
      },
      "SW5jb252w6luaWVudHMN":{
        "title":"Inconv\u00e9nients",
        "data":"<li>Peut diminuer la spontan\u00e9it\u00e9 du rapport sexuel<\/li><li>L'efficacit\u00e9 contraceptive est inf\u00e9rieure \u00e0 celui de la pilule et du st\u00e9rilet<\/li>"
      },
      "Q29udHJlLUluZGljYXRpb25zDQ==":{
        "title":"Contre-Indications",
        "data":"<li>Aucune<\/li><li>Si allergie au latex : existence de pr\u00e9servatif en polyur\u00e9thane<\/li>"
      },
      "UHLDqWNhdXRpb25zIGQnZW1wbG9pDQ==":{
        "title":"Pr\u00e9cautions d'emploi",
        "data":"<li>Ne pas utiliser le pr\u00e9servatif apr\u00e8s la date de p\u00e9remption<\/li><li>Usage unique<\/li><li>Manipuler le pr\u00e9servatif avec soin lors de l'ouverture (ne pas le d\u00e9chirer, attention aux ongles)<\/li><li>Ne jamais utiliser deux pr\u00e9servatifs l'un sur l'autre<\/li><li>Utiliser du lubrifiant aqueux ou hydrosoluble adapt\u00e9 (ne pas utiliser de la vaseline, l'huile...qui peuvent rendre le latex poreux et diminue son efficacit\u00e9)<\/li><li>Conserver le pr\u00e9servatif dans un endroit frais et sec<\/li><li>Enlever de sa pochette avec les mains (pas de ciseaux ou d'ustensiles coupants)<\/li>"
      },
      "SW5mb3JtYXRpb25zIGNvbXBsw6ltZW50YWlyZXMN":{
        "title":"Informations compl\u00e9mentaires",
        "data":"<li>Co\u00fbte entre 20 centimes \u00e0 1€ l'unit\u00e9.<\/li><li>D\u00e9livr\u00e9 en pharmacies, grandes surfaces, station-service ou dans les distributeurs automatiques.<\/li><li>Gratuit dans les centres de planification et d'\u00e9ducation familiale (CPEF).<\/li>"
      },
      "RW4gY2FzIGRlIHByb2Jsw6htZQ0=":{
        "title":"En cas de probl\u00e8me",
        "data":"<li>Si le pr\u00e9servatif est perc\u00e9 ou fuit, vous n'\u00eates plus prot\u00e9g\u00e9 ni d'une \u00e9ventuelle grossesse ni d'une infection sexuellement transmissible.<\/li><li>Il faut prendre une contraception d'urgence, faire un d\u00e9pistage des infections sexuellement transmissibles ou consulter un m\u00e9decin.<\/li>"
      }
    }
  },
  "le-preservatif-feminin-":{
    "title":"Le pr\u00e9servatif f\u00e9minin ",
    "content":{
      "TGUgcHLDqXNlcnZhdGlmIGbDqW1pbmluLCBjJ2VzdCBxdW9pID8N":{
        "title":"Le pr\u00e9servatif f\u00e9minin, c'est quoi ?",
        "data":"Le pr\u00e9servatif f\u00e9minin est une gaine en nitrile ou en polyur\u00e9thane munie d'un anneau souple aux deux extr\u00e9mit\u00e9s."
      },
      "TcOpY2FuaXNtZSBkJ2FjdGlvbg0=":{
        "title":"M\u00e9canisme d'action",
        "data":"Le pr\u00e9servatif f\u00e9minin, plac\u00e9 dans le vagin, emp\u00eache le passage des spermatozo\u00efdes.<br \/><br \/>Le pr\u00e9servatif est le seul contraceptif \u00e0 prot\u00e9ger des infections sexuellement transmissibles"
      },
      "VXRpbGlzYXRpb24N":{
        "title":"Utilisation",
        "data":"Le pr\u00e9servatif f\u00e9minin se place dans le vagin, afin de recevoir le sexe masculin au moment de la p\u00e9n\u00e9tration. Il peut \u00eatre mis en place plusieurs heures avant le rapport sexuel et doit \u00eatre chang\u00e9 \u00e0 chaque rapport.<br \/><br \/>Mode d'emploi :<li>Se mettre dans une position confortable et sortir le pr\u00e9servatif avec pr\u00e9caution.<\/li><li>Presser l'anneau interne entre le pouce et l'index et l'ins\u00e9rer au fond du vagin aussi loin que possible.<\/li><li>Passer l'index \u00e0 l'int\u00e9rieur du pr\u00e9servatif et pousser l'anneau encore plus au fond du vagin.<\/li><li>L'anneau externe doit rester \u00e0 l'ext\u00e9rieur sur la vulve.<\/li><li>Pour retirer le pr\u00e9servatif, tirer le en le vrillant.<\/li>"
      },
      "RWZmaWNhY2l0w6kN":{
        "title":"Efficacit\u00e9",
        "data":"Sous r\u00e9serve d'\u00eatre correctement utilis\u00e9, l'efficacit\u00e9 du pr\u00e9servatif f\u00e9minin est bonne.<br \/><br \/>Pour \u00eatre efficace le pr\u00e9servatif doit \u00eatre utilis\u00e9 pour TOUS les rapports sexuels, \u00e0 TOUT moment du cycle, car il n'y a pas de p\u00e9riode \"sans risque\"."
      },
      "QXZhbnRhZ2VzDQ==":{
        "title":"Avantages",
        "data":"<li>Prot\u00e8ge des infections sexuellement transmissibles<\/li><li>Sans ordonnance m\u00e9dicale<\/li><li>La mise en place peut se faire avant le rapport sexuel<\/li><li>Disponible pour des rapports non planifi\u00e9s<\/li>"
      },
      "SW5jb252w6luaWVudHMN":{
        "title":"Inconv\u00e9nients",
        "data":"<li>Son aspect peut d\u00e9courager certains<\/li><li>La mise en place peut \u00eatre d\u00e9licate<\/li><li>L'efficacit\u00e9 contraceptive est inf\u00e9rieure \u00e0 celui de la pilule et du st\u00e9rilet<\/li>"
      },
      "Q29udHJlLUluZGljYXRpb25zDQ==":{
        "title":"Contre-Indications",
        "data":"Aucune"
      },
      "UHLDqWNhdXRpb25zIGQnZW1wbG9pDQ==":{
        "title":"Pr\u00e9cautions d'emploi",
        "data":"<li>Ne pas utiliser le pr\u00e9servatif apr\u00e8s la date de p\u00e9remption<\/li><li>Usage unique<\/li><li>Manipuler le pr\u00e9servatif avec soin lors de l'ouverture (ne pas le d\u00e9chirer, attention aux ongles)<\/li><li>Conserver le pr\u00e9servatif dans un endroit frais et sec<\/li><li>Enlever de sa pochette avec les mains (pas de ciseaux ou d'ustensiles coupants)<\/li><li>Ne pas l'utiliser avec un pr\u00e9servatif masculin<\/li>"
      },
      "SW5mb3JtYXRpb25zIGNvbXBsw6ltZW50YWlyZXMN":{
        "title":"Informations compl\u00e9mentaires",
        "data":"<li>Le prix d'une boite de 3 pr\u00e9servatifs varie d'une pharmacie \u00e0 l'autre et avoisine les 7€.<\/li><li>D\u00e9livr\u00e9 en pharmacies ou sur internet.<\/li><li>Gratuit dans les centres de planification et d'\u00e9ducation familiale (CPEF).<\/li>"
      },
      "RW4gY2FzIGRlIHByb2Jsw6htZQ0=":{
        "title":"En cas de probl\u00e8me",
        "data":"Si le pr\u00e9servatif est perc\u00e9 ou fuit vous n'\u00eates plus prot\u00e9g\u00e9e ni d'une \u00e9ventuelle grossesse ni d'une infection sexuellement transmissible.<br \/><br \/>Il faut prendre une contraception d'urgence, faire un d\u00e9pistage des infections sexuellement transmissibles ou consulter un m\u00e9decin."
      }
    }
  },
  "les-methodes-naturelles":{
    "title":"Les m\u00e9thodes naturelles",
    "content":{
      "TGVzIG3DqXRob2RlcyBuYXR1cmVsbGVzLCBjJ2VzdCBxdW9pID8N":{
        "title":"Les m\u00e9thodes naturelles, c'est quoi ?",
        "data":"On qualifie de \"naturelles\" toutes les m\u00e9thodes qui visent \u00e0 identifier la p\u00e9riode de l'ovulation de mani\u00e8re \u00e0 \u00e9viter d'avoir des rapports sexuels f\u00e9condants \u00e0 ce moment-l\u00e0. Ces m\u00e9thodes vont des plus simples aux plus sophistiqu\u00e9es."
      },
      "QXZhbnRhZ2VzDQ==":{
        "title":"Avantages",
        "data":"<li>Gratuit<\/li><li>Pas de materiel<\/li>"
      },
      "SW5jb252w6luaWVudHMN":{
        "title":"Inconv\u00e9nients",
        "data":"<li>N\u00e9cessite de bien se conna\u00eetre<\/li><li>Peut \u00eatre contraignant<\/li><li>Fiabilit\u00e9 discutable<\/li><li>Davantage pour l'espacement des naissances<\/li><li>Ne prot\u00e8ge pas des infections sexuellement transmissibles<\/li>"
      },
      "TGUgcmV0cmFpdA0=":{
        "title":"Le retrait",
        "data":"L'homme se retire du vagin de sa partenaire avant d'avoir \u00e9jacul\u00e9. Si l'\u00e9jaculation n'a pas lieu dans le vagin (ni juste \u00e0 l'entr\u00e9e du vagin), il ne peut pas y avoir de grossesse, car les spermatozo\u00efdes ne peuvent pas entrer dans l'ut\u00e9rus."
      },
      "TCdhYnN0aW5lbmNlIHDDqXJpb2RpcXVlIG91IG3DqXRob2RlIE9naW5vDQ==":{
        "title":"L'abstinence p\u00e9riodique ou m\u00e9thode Ogino",
        "data":"Elle consiste, pour une femme dont le cycle est r\u00e9gulier, \u00e0 \u00e9viter les rapports sexuels non prot\u00e9g\u00e9s pendant les jours \"fertiles\" qui pr\u00e9c\u00e8dent ou suivent l'ovulation. M\u00e9thode de calcul de la p\u00e9riode f\u00e9conde \u00ab th\u00e9orique \u00bb pendant laquelle il faut \u00e9viter les rapports sexuels non prot\u00e9g\u00e9s :<li>Au pr\u00e9alable, il faut avoir compt\u00e9 la dur\u00e9e de ses cycles sur 1 an.<\/li><li>Le premier jour de la p\u00e9riode f\u00e9conde correspond \u00e0 10 + longueur cycle le plus court - 28<\/li><li>Le dernier jour de la p\u00e9riode f\u00e9conde correspond \u00e0 17 + longueur du cycle le plus long - 28<\/li>Il ne faudra pas avoir de rapports entre ces 2 jours du cycle"
      },
      "TGEgIm3DqXRob2RlIGRlcyB0ZW1ww6lyYXR1cmVzIiAN":{
        "title":"La \"m\u00e9thode des temp\u00e9ratures\" ",
        "data":"En seconde partie de cycle, il y a \u00e9l\u00e9vation de la temp\u00e9rature chez la femme. Le moment de l'\u00e9l\u00e9vation de la temp\u00e9rature correspond \u00e0 l'ovulation, avec un \u00e9cart possible de 5 jours.<br /><br />La p\u00e9riode de f\u00e9condit\u00e9 est de 3 jours avant le pic et un jour apr\u00e8s.<br /><br />Prendre chaque matin avant de se lever la temp\u00e9rature, et \u00e9valuer le moment d'\u00e9valuation de la temp\u00e9rature.Des applications mobiles ou internet permettent de suivre le relev\u00e9 de temp\u00e9ratures."
      },
      "TCdvYnNlcnZhdGlvbiBkZSBsYSBnbGFpcmUgY2VydmljYWxlIG91ICJtw6l0aG9kZSBkZSBCaWxsaW5ncyIN":{
        "title":"L'observation de la glaire cervicale ou \"m\u00e9thode de Billings\"",
        "data":"C'est une m\u00e9thode o\u00f9 la femme appr\u00e9cie les sensations au niveau de la vulve et l'aspect de la glaire cervicale. A l'approche de l'ovulation, les s\u00e9cr\u00e9tions du col de l'ut\u00e9rus (ou \"glaire cervicale\") se modifient ; elle deviennent plus abondantes, plus fluides et provoquent un \u00e9coulement vaginal (ou \"pertes blanches\") caract\u00e9ristique. <br /><br />C'est pendant cette p\u00e9riode qu'il ne faut pas avoir de rapports sexuels. <br /><br /> Cette m\u00e9thode n\u00e9cessite un apprentissage."
      },
      "TGEgbcOpdGhvZGUgTUFNQSAobcOpdGhvZGUgZGUgbCdhbGxhaXRlbWVudCBtYXRlcm5lbCBldCBkZSBsJ2Ftw6lub3JyaMOpZSkN":{
        "title":"La m\u00e9thode MAMA (m\u00e9thode de l'allaitement maternel et de l'am\u00e9norrh\u00e9e)",
        "data":"La succion du sein par le b\u00e9b\u00e9 supprime l'ovulation dans certaines conditions:<li>En cas d'allaitement exclusif <\/li><li>absence de r\u00e8gles depuis l'accouchement<\/li><li>Ne marche plus au-del\u00e0 de 6 mois d'allaitement<\/li><li>les t\u00e9t\u00e9s doivent \u00eatre longues, espac\u00e9es de moins de 6h, et au nombre de 6 minimum le jour comme la nuit.<\/li>"
      }
    }
  },  
  "le-patch":{
    "title":"Le patch",
    "content":{
      "TGUgcGF0Y2gsIGMnZXN0IHF1b2kgPw0=":{
        "title":"Le patch, c'est quoi ?",
        "data":"Le patch est un timbre de 20cm2, couleur chair, qui se colle sur la peau.<br \/><br \/><div class='attention'>Attention il ne prot\u00e8ge pas des infections sexuellement transmissibles.<\/div>"
      },
      "TcOpY2FuaXNtZSBkJ2FjdGlvbg0=":{
        "title":"M\u00e9canisme d'action",
        "data":"Le patch d\u00e9livre une association oestro-progestative et agit comme la pilule.<br \/><br \/>Il bloque l'ovulation, et modifie l'endom\u00e8tre (muqueuse tapissant l'int\u00e9rieur de l'ut\u00e9rus) de fa\u00e7on \u00e0 ce qu'il ne puisse pas accueillir un \u00e9ventuel oeuf et modifiant la glaire pour emp\u00eacher les spermatozo\u00efdes de franchir le col."
      },
      "VXRpbGlzYXRpb24N":{
        "title":"Utilisation",
        "data":"Placer le patch sur la hanche, la fesse, le ventre, la cuisse ou l'\u00e9paule mais pas sur les seins.<br \/><br \/>Utiliser un patch pour une semaine (remplacement du patch \u00e0 heure et jour fixe de la semaine).<br \/><br \/>Mettre pendant 3 semaines un patch par semaine, puis une semaine sans patch, celle o\u00f9 les r\u00e8gles arrivent.<br \/><br \/>Pour commencer le patch, le premier patch doit \u00eatre plac\u00e9 le premier jour des r\u00e8gles.<br \/><br \/>Bien veiller au non d\u00e9collement du patch, voir Pr\u00e9cautions d'emploi"
      },
      "RWZmaWNhY2l0w6kN":{
        "title":"Efficacit\u00e9",
        "data":"Tr\u00e8s efficace si il est bien utilis\u00e9 sans oubli."
      },
      "QXZhbnRhZ2VzDQ==":{
        "title":"Avantages",
        "data":"<li>Efficacit\u00e9 excellente<\/li><li>Tol\u00e9rance excellente<\/li><li>Diminution des oublis par rapport \u00e0 la pilule<\/li><li>Bonne adh\u00e9sion cutan\u00e9e<\/li><li>Cycles r\u00e9guliers avec diminution du volume et des douleurs des r\u00e8gles<\/li><li>R\u00e9versibilit\u00e9<\/li>"
      },
      "SW5jb252w6luaWVudHMN":{
        "title":"Inconv\u00e9nients",
        "data":"<h2>Adolescents<\/h2>Pas d'autorisation de mise sur le march\u00e9 pour les adolescents.<h2>En cas de surpoids<\/h2>Echec de m\u00e9thode en cas de surpoids, revoir la prescription.<h2>Visible<\/h2>Visible par le partenaire ou quand on porte un maillot de bain.<h2>Prix<\/h2>Une bo\u00eete co\u00fbte environs 15€ par mois non rembours\u00e9 par la Sécurité Sociale."
      },
      "Q29udHJlLWluZGljYXRpb25zDQ==":{
        "title":"Contre-indications",
        "data":"<li>Anomalie de la coagulation sanguine<\/li><li>Ant\u00e9c\u00e9dent d'accident thrombo-embolique ou de thrombose art\u00e9rielle<\/li><li>Certains cancers<\/li><li>Certaines migraines<\/li><li>Certaines affections h\u00e9patiques<\/li><li>Hypercholest\u00e9rol\u00e9mie<\/li><li>Hypertension art\u00e9rielle<\/li><li>Tabagisme<\/li><li>Varices<\/li><li>Certaines interactions m\u00e9dicamenteuses<\/li>"
      },
      "UHLDqWNhdXRpb25zIGQnZW1wbG9pDQ==":{
        "title":"Pr\u00e9cautions d'emploi",
        "data":"Bien veiller au non d\u00e9collement du patch. Que dois-je faire si le patch se d\u00e9colle ?<li>moins de 24 heures, essayer de le recoller \u00e0 la m\u00eame place s'il colle toujours (ne jamais utiliser d'adh\u00e9sif) sinon utiliser un nouveau patch que vous collerez \u00e0 un autre endroit. Il n'y a pas de risque de grossesse.<\/li><li>plus de 24 heures (ou si vous ne savez pas combien de temps) entamer un nouveau cycle en collant un nouveau patch (cela correspondra au d\u00e9but d'un nouveau cycle) et si vous avez eu un rapport sexuel dans les 5 jours pr\u00e9c\u00e9dant le d\u00e9collement utiliser la contraception d'urgence. Lors des rapports sexuels au cours des 7 jours suivant le d\u00e9collement, utiliser des pr\u00e9servatifs.<\/li>"
      },
      "RWZmZXRzIEluZMOpc2lyYWJsZXMN":{
        "title":"Effets Ind\u00e9sirables",
        "data":"<h2>Naus\u00e9es<\/h2>Elles s'estompent souvent apr\u00e8s quelques cycles sinon parlez en a votre m\u00e9decin.<h2>Prise de poids<\/h2>La prise de poids est souvent mod\u00e9r\u00e9e, r\u00e9versible, et peut \u00eatre parfaitement maitris\u00e9e.<h2>Migraine<\/h2>Si cela persiste parlez-en \u00e0 votre m\u00e9decin.<h2>Spottings : saignements en dehors des r\u00e8gles<\/h2>Poursuivez l'utilisation du patch. Si cela persiste plus de trois mois, consultez votre m\u00e9decin.<h2>Prise de poids<\/h2>La prise de poids est possible mais souvent tr\u00e8s mod\u00e9r\u00e9e, r\u00e9versible, et peut \u00eatre parfaitement maitris\u00e9e.<h2>Douleurs et gonflements des seins<\/h2>Sans danger, si cela persiste consultez votre m\u00e9decin pour revoir la prescription."
      },
      "SW5mb3JtYXRpb25zIGNvbXBsw6ltZW50YWlyZXMN":{
        "title":"Informations compl\u00e9mentaires",
        "data":"<li>N\u00e9cessite une ordonnance <\/li><li>1 boite contient 3 patchs soit un mois de traitement. Le prix d'une boite varie d'une pharmacie \u00e0 une autre il avoisine 15€ qui ne sont pas rembours\u00e9s par l'assurance maladie<\/li>"
      },
      "lespatchs":{
        "title":"Les patchs",
        "data":"Cette partie sera li\u00e9e directement \u00e0 la section m\u00e9dicaments de l'application. Donn\u00e9es officielles ANSM (AFSSAPS)."
      },
      "RW4gY2FzIGQnb3VibGkN":{
        "title":"En cas d'oubli",
        "data":"En cas d'oubli de changer le patch il est efficace encore 24 H, au-del\u00e0 vous n'\u00eates plus prot\u00e9g\u00e9e.<li>Si oubli de moins de 24H, mettre un nouveau patch vous \u00eates donc prot\u00e9g\u00e9e d'une \u00e9ventuelle grossesse.<\/li><li>Si oubli de plus de 24H, mettre un patch tout de suite.<\/li><br \/><br \/>Si vous avez eu un rapport sexuel dans les 5 jours pr\u00e9c\u00e9dant l'oubli utilisez la contraception d'urgence. Lors des rapports sexuels au cours des 7 jours suivant l'oubli, utilisez des pr\u00e9servatifs.<br \/><br \/>En cas d'oubli de remettre un nouveau patch au del\u00e0 des 7 jours d'arr\u00eat, vous n'\u00eates plus prot\u00e9g\u00e9e d'une \u00e9ventuelle grossesse.Mettre le nouveau patch (que vous garderez 7 jours)<div class='attention'>Attention, si vous n'\u00eates plus prot\u00e9g\u00e9e et que vous avez eu un rapport sexuel dans les 5 jours pr\u00e9c\u00e9dant l'oubli utilisez la contraception d'urgence. Lors des rapports sexuels au cours des 7 jours suivant l'oubli, utilisez des pr\u00e9servatifs.<\/div>"
      }
    }
  },  
  "lanneau-vaginal":{
    "title":"L'anneau vaginal",
    "content":{
      "TCdhbm5lYXUgdmFnaW5hbCwgYydlc3QgcXVvaSA\/DQ==":{
        "title":"L'anneau vaginal, c'est quoi ?",
        "data":"L'anneau vaginal ou anneau contraceptif est un anneau souple de 5,5 cm de diam\u00e8tre qui se place dans le vagin. Il contient une association d'hormones (estrog\u00e8ne et progestatif) qu'il lib\u00e8re tout le long du cycle, comme une pilule combin\u00e9e.<br \/><br \/>Il ne prot\u00e8ge pas des Infections Sexuellement Transmissibles."
      },
      "TcOpY2FuaXNtZSBkJ2FjdGlvbg0=":{
        "title":"M\u00e9canisme d'action",
        "data":"L'anneau vaginal agit comme la pilule, en bloquant l'ovulation et en modifiant la glaire cervicale pour emp\u00eacher les spermatozo\u00efdes de franchir le col.<br \/><br \/>Attention, il ne prot\u00e8ge pas des Infections Sexuellement Transmissibles."
      },
      "VXRpbGlzYXRpb24N":{
        "title":"Utilisation",
        "data":"Le premier anneau est ins\u00e9r\u00e9 le jour 1 du cycle soit le premier jour des r\u00e8gles et retir\u00e9 au jour 21 pour permettre l'apparition des r\u00e8gles.<br \/><br \/>Il faut l'ins\u00e9rer comme un tampon, le plus profond\u00e9ment possible mais sa position dans le vagin n'a pas d'importance en soi.<br \/><br \/>Au bout de 3 semaines, on enl\u00e8ve l'anneau ensuite, les r\u00e8gles apparaissent habituellement 2 \u00e0 3 jours apr\u00e8s le retrait.<br \/><br \/>Il faut replacer un nouvel anneau 7 jours apr\u00e8s le retrait de l'anneau pr\u00e9c\u00e9dent.<div class='attention'>Attention aux erreurs d'utilisation :<\/div>S'il est expuls\u00e9 (apr\u00e8s un rapport sexuel par exemple), le remettre en place imm\u00e9diatement apr\u00e8s l'avoir rinc\u00e9 \u00e0 l'eau froide ou ti\u00e8de.<br \/><br \/>Il est conseill\u00e9 de le garder tout le temps, y compris pendant les rapports sexuels.<br \/><br \/>S'il est expuls\u00e9 depuis plus de 3 heures, vous n'\u00eates plus prot\u00e9g\u00e9e d'une \u00e9ventuelle grossesse (voir \"Que faire en cas d'oubli\")."
      },
      "RWZmaWNhY2l0w6kN":{
        "title":"Efficacit\u00e9",
        "data":"C'est aussi efficace qu'une pilule combin\u00e9e, avec une s\u00e9curit\u00e9 suppl\u00e9mentaire qui est le fait de l'avoir toujours sur soi, sans y penser pendant 3 semaines.<br \/><br \/>Cette efficacit\u00e9 peut cependant \u00eatre compromise dans les cas suivants :<li>oublis (il faut remettre un anneau apr\u00e8s la semaine d'arr\u00eat)<\/li><li>l'expulsion de l'anneau (il est facile de v\u00e9rifier sa pr\u00e9sence au doigt)<\/li>"
      },
      "QXZhbnRhZ2VzDQ==":{
        "title":"Avantages",
        "data":"<li>Mise en place et retrait faciles <\/li><li>Oublis rares<\/li><li>Excellente tol\u00e9rance<\/li><li>Excellente efficacit\u00e9 <\/li><li>R\u00e9versibilit\u00e9 \u00e0 l'arr\u00eat<\/li><li>R\u00e9gularit\u00e9 des cycles<\/li><li>R\u00e8gles moins abondantes, moins longues et moins douloureuses<\/li>"
      },
      "SW5jb252w6luaWVudHMN":{
        "title":"Inconv\u00e9nients",
        "data":"<li>Non rembours\u00e9 par l'assurance maladie<\/li><li>Risque expulsion<\/li><li>Appr\u00e9hension \u00e0 la mise en place<\/li><li>Un seul dosage actuellement<\/li><li>Contre-indications, <\/li><li>Anomalie de la coagulation sanguine<\/li><li>Ant\u00e9c\u00e9dent d'accident thrombo-embolique ou de thrombose art\u00e9rielle<\/li><li>Certains cancers<\/li><li>Certaines migraines<\/li><li>Certaines affections h\u00e9patiques<\/li><li>Hypercholest\u00e9rol\u00e9mie<\/li><li>Hypertension art\u00e9rielle<\/li><li>Tabagisme <\/li><li>Varices<\/li><li>Attention aux interactions m\u00e9dicamenteuses<\/li><li>Post partum (apr\u00e8s l'accouchement)<\/li>"
      },
      "UHLDqWNhdXRpb25zIGQnZW1wbG9pDQ==":{
        "title":"Pr\u00e9cautions d'emploi",
        "data":"Se conserve au r\u00e9frig\u00e9rateur<br \/><br \/>En cas de conservation \u00e0 temp\u00e9rature ambiante, l'utiliser dans les 4 mois."
      },
      "RWZmZXRzIGluZMOpc2lyYWJsZXMN":{
        "title":"Effets ind\u00e9sirables",
        "data":"<h2>Spottings : saignements en dehors des r\u00e8gles<\/h2>Il faut continuer normalement l'utilisation de l'anneau. Si cela persiste pendant plus de trois mois, consultez votre m\u00e9decin.<h2>Douleurs gonflements des seins tension mammaires<\/h2>Sans danger, si cela persiste consultez votre m\u00e9decin pour revoir la prescription.<h2>Prise de poids<\/h2>La prise de poids est possible mais souvent tr\u00e8s mod\u00e9r\u00e9e, r\u00e9versible, et peut \u00eatre parfaitement maitris\u00e9e.<h2>Naus\u00e9es<\/h2>Elles s'estompent souvent apr\u00e8s quelques cycles, sinon consultez votre m\u00e9decin traitant.<h2>Migraine<\/h2>Si cela persiste parlez-en \u00e0 votre m\u00e9decin."
      },
      "SWTDqWVzIHJlw6d1ZXMN":{
        "title":"Id\u00e9es re\u00e7ues",
        "data":"<h2>Je vais ressentir l'anneau<\/h2>Si l'anneau est bien plac\u00e9, vous ne le sentez pas car il se positionne dans la partie haute du vagin qui est peu sensible au toucher.Si l'anneau est ressenti, c'est qu'il s'est d\u00e9plac\u00e9 dans le vagin, il faut alors de le repousser un peu.<h2>Mon partenaire va ressentir l'anneau.<\/h2>Dans la majorit\u00e9 des cas, il ne devrait rien sentir. Rarement, s'il le ressent, il ne devrait pas \u00eatre g\u00ean\u00e9 par sa pr\u00e9sence car l'anneau est souple et flexible."
      },
      "SW5mb3JtYXRpb25zIGNvbXBsw6ltZW50YWlyZXMN":{
        "title":"Informations compl\u00e9mentaires",
        "data":"<li>D\u00e9livr\u00e9 en pharmacie sur ordonnance<\/li><li>Le prix varie d'une pharmacie \u00e0 l'autre et avoisine 16€ pour un anneau et donc pour un cycle, non rembours\u00e9 par l'assurance maladie.<\/li>"
      },
      "lesanneaux":{
        "title":"Les diff\u00e9rents anneaux",
        "data":"Cette partie sera li\u00e9e directement \u00e0 la section m\u00e9dicaments de l'application. Donn\u00e9es officielles ANSM (AFSSAPS)."
      },
      "RW4gY2FzIGQnb3VibGkN":{
        "title":"En cas d'oubli",
        "data":"Cette partie sera li\u00e9e directement \u00e0 la section m\u00e9dicaments de l'application. Donn\u00e9es officielles ANSM (AFSSAPS)."
      }
    }
  },
  "limplant":{
    "title":"L'implant",
    "content":{
      "TCdpbXBsYW50LCBjJ2VzdCBxdW9pID8N":{
        "title":"L'implant, c'est quoi ?",
        "data":"L'implant est un petit b\u00e2tonnet plastique de 4cm plac\u00e9 sous la peau, au niveau de la face interne du bras.<br \/><br \/>Il agit pendant 3 ans."
      },
      "TcOpY2FuaXNtZSBkJ2FjdGlvbg0=":{
        "title":"M\u00e9canisme d'action",
        "data":"L'implant est un dispositif d\u00e9livrant r\u00e9guli\u00e8rement le m\u00eame type de substance que les pilules progestatives.<br \/><br \/>Il agit principalement en bloquant l'ovulation, il modifie l'endom\u00e8tre (muqueuse tapissant l'int\u00e9rieur de l'ut\u00e9rus) de fa\u00e7on \u00e0 ce qu'il ne puisse pas accueillir un \u00e9ventuel ovocyte f\u00e9cond\u00e9 et modifie la glaire pour emp\u00eacher les spermatozo\u00efdes de franchir le col.<br \/><br \/><div class='attention'>Attention, il ne prot\u00e8ge pas des Infections Sexuellement Transmissibles.<\/div>"
      },
      "VXRpbGlzYXRpb24N":{
        "title":"Utilisation",
        "data":"Il est ins\u00e9r\u00e9 par un m\u00e9decin ou une sage-femme sous anesth\u00e9sie locale, sous la peau, au niveau du bras.<br \/><br \/>Une fois en place, l'implant est invisible et indolore.<br \/><br \/>L'implant est efficace pendant 3 ans. Mais il peut \u00eatre retir\u00e9 plus t\u00f4t si vous le d\u00e9sirez."
      },
      "RWZmaWNhY2l0w6kN":{
        "title":"Efficacit\u00e9",
        "data":"L'implant est une m\u00e9thode de contraception tr\u00e8s efficace."
      },
      "QXZhbnRhZ2VzDQ==":{
        "title":"Avantages",
        "data":"<li>Tranquillit\u00e9 car pas de prise quotidienne et donc aucun risque d'oubli<\/li><li>Discr\u00e9tion<\/li><li>Longue dur\u00e9e d'action (3 ans)<\/li>"
      },
      "SW5jb252w6luaWVudHMN":{
        "title":"Inconv\u00e9nients",
        "data":"<li>Retrait parfois difficile<\/li><li>Am\u00e9norrh\u00e9e (absence de r\u00e8gles)<\/li><li>Cycles irr\u00e9guliers avec parfois saignements peu importants mais continus (spottings)<\/li>"
      },
      "Q29udHJlLUluZGljYXRpb25zDQ==":{
        "title":"Contre-Indications",
        "data":"<li>Maladie thromboembolique en cours<\/li><li>Certains cancers<\/li><li>H\u00e9morragie g\u00e9nitale non expliqu\u00e9e<\/li><li>Ant\u00e9c\u00e9dents de pathologie h\u00e9patique s\u00e9v\u00e8re ou en cours<\/li><li>Certaines pathologies ovariennes<\/li><li>Certaines interactions m\u00e9dicamenteuses <\/li>"
      },
      "RWZmZXRzIGluZMOpc2lyYWJsZXMN":{
        "title":"Effets ind\u00e9sirables",
        "data":"<h2>Naus\u00e9es<\/h2>Elles s'estompent souvent apr\u00e8s quelques cycles, sinon consultez votre m\u00e9decin traitant.<h2>Spotting : saignements en dehors des r\u00e8gles<\/h2>Il faut pers\u00e9v\u00e9rer. Si cela persiste pendant plus de 3 mois, consultez votre m\u00e9decin.<h2>Douleurs, gonflements des seins, et tensions mammaires<\/h2>Sans danger, si cela persiste consultez votre m\u00e9decin pour revoir la prescription.<h2>Prise de poids<\/h2>La prise de poids est possible mais souvent tr\u00e8s mod\u00e9r\u00e9e, r\u00e9versible, et peut \u00eatre parfaitement maitris\u00e9e. <h2>Migraine<\/h2>Si cela persiste parlez-en \u00e0 votre m\u00e9decin."
      },
      "SW5mb3JtYXRpb25zIGNvbXBsw6ltZW50YWlyZXMN":{
        "title":"Informations compl\u00e9mentaires",
        "data":"<li>Co\u00fbte 138€ et utilisable 3 ans, rembours\u00e9 65% par l'assurance maladie.<\/li><li>Sur ordonnance, il doit \u00eatre pos\u00e9 par un m\u00e9decin ou une sage-femme sous anesth\u00e9sie locale.<\/li>"
      }
    }
  },
  "le-diaphragme":{
    "title":"Le diaphragme",
    "content":{
      "TGEgZGlhcGhyYWdtZSwgYydlc3QgcXVvaSA\/DQ==":{
        "title":"La diaphragme, c'est quoi ?",
        "data":"Le diaphragme est un dispositif vaginal en silicone.Il ne prot\u00e8ge pas des infections sexuellement transmissibles."
      },
      "TcOpY2FuaXNtZSBkJ2FjdGlvbg0=":{
        "title":"M\u00e9canisme d'action",
        "data":"Il emp\u00eache le passage des spermatozo\u00efdes dans l'ut\u00e9rus."
      },
      "VXRpbGlzYXRpb24N":{
        "title":"Utilisation",
        "data":"<li>Mettre du spermicide sur les 2 faces du diaphragme.<\/li><li>Placer le \u00e0 l'avance dans le vagin, entre le cul-de-sac post\u00e9rieur et l'os du pubis.<\/li><li>Enlever le diaphragme au minimum 6H apr\u00e8s le rapport sexuel.<\/li><li>Si le diaphragme est plac\u00e9 depuis plus de 8H, remettre du spermicide sans enlever le diaphragme.<\/li><li>Bien le laver, r\u00e9utilisable pendant 2 ans.<\/li>"
      },
      "RWZmaWNhY2l0w6kN":{
        "title":"Efficacit\u00e9",
        "data":"Efficacit\u00e9 variable : de moyennement efficace \u00e0 efficace.Les principales causes d'\u00e9chec sont :<li>le manque d'habitude<\/li><li>les erreurs de manipulation<\/li><li>la non utilisation \u00e0 certains moments du cycle (Il n'y a pas de p\u00e9riode \"sans risque\").<\/li>"
      },
      "QXZhbnRhZ2VzDQ==":{
        "title":"Avantages",
        "data":"<li>Mise en place \u00e0 l'avance<\/li><li>R\u00e9utilisable<\/li><li>Peu co\u00fbteux<\/li>"
      },
      "SW5jb252w6luaWVudHMN":{
        "title":"Inconv\u00e9nients",
        "data":"<li>Insertion parfois d\u00e9licate<\/li><li>Ne prot\u00e8ge pas des infections sexuellement transmissibles<\/li>"
      },
      "Q29udHJlLWluZGljYXRpb25zDQ==":{
        "title":"Contre-indications",
        "data":"<li>Prolapsus<\/li><li>R\u00e9troversion ut\u00e9rine<\/li><li>Post-partum (apr\u00e8s l'accouchement)<\/li><li>Infections vaginales<\/li><li>Infections urinaires \u00e0 r\u00e9p\u00e9tition<\/li>"
      },
      "UHLDqWNhdXRpb25zIGQnZW1wbG9pDQ==":{
        "title":"Pr\u00e9cautions d'emploi",
        "data":"La taille doit \u00eatre adapt\u00e9e \u00e0 la cavit\u00e9 vaginale de 60 \u00e0 90mm."
      },
      "SW5mb3JtYXRpb25zIGNvbXBsw6ltZW50YWlyZXMN":{
        "title":"Informations compl\u00e9mentaires",
        "data":"<li>N\u00e9cessite une prescription m\u00e9dicale<\/li><li>La premi\u00e8re pose est faite par le m\u00e9decin ou la sage-femme<\/li><li>Se trouve en pharmacie sur commandes, ou au Mouvement fran\u00e7ais pour le planning familial<\/li><li>Environ 33€ en latex, et 42€ en silicone. Il est rembours\u00e9 sur la base de 3,14€<\/li>"
      }
    }
  },
  "le-dispositif-intra-uterin-hormonal-":{
    "title":"Le dispositif intra-ut\u00e9rin hormonal ",
    "content":{
      "TGUgRElVIGhvcm1vbmFsLCBjJ2VzdCBxdW9pID8N":{
        "title":"Le DIU hormonal, c'est quoi ?",
        "data":"C'est un dispositif contraceptif qui est ins\u00e9r\u00e9 dans l'ut\u00e9rus. Il contient un r\u00e9servoir de progestatif, le levonorgestrel, il mesure 3,5 cm de long et se pr\u00e9sente en forme de T.<br \/><br \/><div class='attention'>Attention il ne prot\u00e8ge pas des infections sexuellement transmissibles.<\/div>"
      },
      "TcOpY2FuaXNtZSBkJ2FjdGlvbg0=":{
        "title":"M\u00e9canisme d'action",
        "data":"Le DIU hormonal r\u00e9duit la capacit\u00e9 d'implantation d'un \u00e9ventuel oeuf f\u00e9cond\u00e9. Il agit au niveau des spermatozo\u00efdes en ralentissant leur progression, en \u00e9paississant la glaire cervicale et en diminuant leur capacit\u00e9 \u00e0 f\u00e9conder.<br \/><br \/>Il r\u00e9duit \u00e9galement le d\u00e9veloppement de l'endom\u00e8tre ce qui permet de rendre les r\u00e8gles moins douloureuses et moins abondantes.<br \/><br \/>Il inhibe parfois l'ovulation."
      },
      "VXRpbGlzYXRpb24N":{
        "title":"Utilisation",
        "data":"Il est mis en place par un m\u00e9decin g\u00e9n\u00e9raliste, un gyn\u00e9cologue ou une sage-femme.<br \/><br \/>En principe, l'insertion d'un DIU est peu ou pas douloureuse.<br \/><br \/>Le m\u00e9decin peut prescrire \u00e0 la patiente des m\u00e9dicaments anti douleur 2 heures avant la pose."
      },
      "RWZmaWNhY2l0w6kN":{
        "title":"Efficacit\u00e9",
        "data":"<li>Excellente efficacit\u00e9<\/li><li>Avantages<\/li><li>Confort<\/li><li>Efficacit\u00e9<\/li><li>Simplicit\u00e9<\/li><li>Non contraignant<\/li><li>Diminution du volume des r\u00e8gles voire am\u00e9norrh\u00e9e (pas de r\u00e8gle)<\/li>"
      },
      "SW5jb252w6luaWVudHMN":{
        "title":"Inconv\u00e9nients",
        "data":"<li>Trouble du cycle avec soit une am\u00e9norrh\u00e9e (pas de r\u00e8gle) soit des spottings (saignement en dehors des r\u00e8gles)<\/li><li>Acn\u00e9e<\/li><li>C\u00e9phal\u00e9es (mal de t\u00eate)<\/li><li>Kystes ovariens<\/li><li>Risque de douleur \u00e0 la pose<\/li>"
      },
      "Q29udHJlLUluZGljYXRpb25zDQ==":{
        "title":"Contre-Indications",
        "data":"<li>Grossesse<\/li><li>Saignements g\u00e9nitaux anormaux inexpliqu\u00e9s<\/li><li>D\u00e9formation ou malformation cavit\u00e9 ut\u00e9rine <\/li><li>Infection g\u00e9nitale en cours, tuberculose g\u00e9nito-urinaire<\/li><li>Dysplasie cervicale, cancer de l'endom\u00e8tre<\/li><li>Maladie trophoblastique<\/li><li>Post-avortum septique (attendre au moins 4 semaines apr\u00e8s l'IVG)<\/li><li>Apr\u00e8s l'accouchement (attendre au moins 4 semaines)<\/li><li>Pathologie thromboembolique en cours <\/li><li>Pathologie h\u00e9patique en cours<\/li>"
      },
      "RWZmZXRzIEluZMOpc2lyYWJsZXMN":{
        "title":"Effets Ind\u00e9sirables",
        "data":"<h2>Prise de poids<\/h2>Exceptionnelle et souvent tr\u00e8s mod\u00e9r\u00e9e, r\u00e9versible et peut \u00eatre parfaitement maitris\u00e9e sinon revoir la prescription<h2>Expulsion<\/h2>L'expulsion du DIU peut arriver ; il faut alors en discuter avec votre m\u00e9decin pour prendre un autre moyen de contraception.<h2>Naus\u00e9es<\/h2>Elles s'estompent souvent apr\u00e8s quelques cycles sinon parlez-en \u00e0 votre m\u00e9decin<h2>Migraine<\/h2>Si cela persiste parlez-en \u00e0 votre m\u00e9decin<h2>Spottings : saignements en dehors des r\u00e8gles<\/h2>Cela peut arriver dans les cycles qui suivent la pose mais sont g\u00e9n\u00e9ralement transitoires. Si cela persiste plus de trois mois, consultez votre m\u00e9decin"
      },
      "SW5mb3JtYXRpb25zIGNvbXBsw6ltZW50YWlyZXMN":{
        "title":"Informations compl\u00e9mentaires",
        "data":"<li>Le DIU est prescrit et pos\u00e9 par un m\u00e9decin ou une sage-femme.<\/li><li>Il est d\u00e9livr\u00e9 en pharmacie pour environ 125€.<\/li><li>Il est rembours\u00e9 \u00e0 65 % par l'Assurance maladie.<\/li>"
      }
    }
  },
  "le-dispositif-intra-uterin-en-cuivre":{
    "title":"Le dispositif intra-ut\u00e9rin en cuivre",
    "content":{
      "TGUgRElVIGVuIGN1aXZyZSwgYydlc3QgcXVvaSA\/DQ==":{
        "title":"Le DIU en cuivre, c'est quoi ?",
        "data":"C'est un dispositif contraceptif qui est ins\u00e9r\u00e9 dans l'ut\u00e9rus. Il est en cuivre, mesure 3,5 cm de long et se pr\u00e9sente le plus souvent en forme de T.<br \/><br \/>Il peut \u00eatre utilis\u00e9 comme contraception d'urgence s'il est mis en place rapidement apr\u00e8s le rapport \u00e0 risque (5 jours).<br \/><br \/><div class='attention'>Attention il ne prot\u00e8ge pas des infections sexuellement transmissibles.<\/div>"
      },
      "TcOpY2FuaXNtZSBkJ2FjdGlvbi4N":{
        "title":"M\u00e9canisme d'action.",
        "data":"Il r\u00e9duit la capacit\u00e9 d'implantation d'un \u00e9ventuel ovocyte f\u00e9cond\u00e9 en ayant une r\u00e9action inflammatoire sur l'endom\u00e8tre.<br \/><br \/>Il diminue la capacit\u00e9 \u00e0 f\u00e9conder des spermatozo\u00efdes."
      },
      "VXRpbGlzYXRpb24N":{
        "title":"Utilisation",
        "data":"Il est mis en place par un m\u00e9decin g\u00e9n\u00e9raliste, un gyn\u00e9cologue ou une sage-femme.<br \/><br \/>En principe, l'insertion d'un DIU est peu ou pas douloureuse.<br \/><br \/>Le m\u00e9decin peut prescrire \u00e0 la patiente des antalgiques 2 heures avant la pose."
      },
      "RWZmaWNhY2l0w6kN":{
        "title":"Efficacit\u00e9",
        "data":"<li>Efficacit\u00e9 imm\u00e9diate d\u00e8s le jour de son insertion<\/li><li>Excellente efficacit\u00e9 de 4 \u00e0 10 ans selon le mod\u00e8le<\/li>"
      },
      "QXZhbnRhZ2VzDQ==":{
        "title":"Avantages",
        "data":"<li>Absence d'hormones : les cycles ne sont pas modifi\u00e9s<\/li><li>Confort<\/li><li>Efficacit\u00e9<\/li><li>Simplicit\u00e9<\/li><li>Non contraignant<\/li>"
      },
      "SW5jb252w6luaWVudHMN":{
        "title":"Inconv\u00e9nients",
        "data":"<li>Augmentation du volume des r\u00e8gles<\/li><li>Risque de douleur \u00e0 la pose ou de douleur chronique<\/li><li>Risque d'expulsion<\/li><li>Risque d'infection au d\u00e9cours de la pose ou en cas de contraction d'une IST<\/li><li>Perforation lors de la pose, migration intra-abdominale<\/li><li>Grossesse extra-ut\u00e9rine et intra-ut\u00e9rine<\/li>"
      },
      "Q29udHJlLUluZGljYXRpb25zDQ==":{
        "title":"Contre-Indications",
        "data":"<li>Allergie au cuivre<\/li><li>Grossesse<\/li><li>Cancer du col de l'ut\u00e9rus ou de l'endom\u00e8tre<\/li><li>Infections g\u00e9nitales hautes<\/li><li>Malformations de l'ut\u00e9rus<\/li><li>Fibromes ut\u00e9rins<\/li><li>Saignements vaginaux inexpliqu\u00e9s<\/li><li>Apr\u00e8s l'accouchement<\/li><li>Tuberculose g\u00e9nitale<\/li>"
      },
      "SW5mb3JtYXRpb25zIGNvbXBsw6ltZW50YWlyZXMN":{
        "title":"Informations compl\u00e9mentaires",
        "data":"<li>Le DIU est prescrit et pos\u00e9 par un m\u00e9decin ou une sage-femme.<\/li><li>Il est d\u00e9livr\u00e9 en pharmacie pour environ 30€.<\/li><li>Il est rembours\u00e9 \u00e0 65 % par l'Assurance maladie.<\/li>"
      }
    }
  },
  "le-spermicide":{
    "title":"Le spermicide",
    "content":{
      "TGUgc3Blcm1pY2lkZSwgYydlc3QgcXVvaSA\/DQ==":{
        "title":"Le spermicide, c'est quoi ?",
        "data":"Le spermicide est une substance \u00e0 administrer localement prenant la forme de cr\u00e8me, de gel, d'\u00e9ponge, d'ovule ou de mousse.<br \/><br \/>Il ne prot\u00e8ge pas contre les infections sexuellement transmissibles"
      },
      "TcOpY2FuaXNtZSBkJ2FjdGlvbg0=":{
        "title":"M\u00e9canisme d'action",
        "data":"Ils inactivent ou d\u00e9truisent les spermatozo\u00efdes."
      },
      "VXRpbGlzYXRpb24N":{
        "title":"Utilisation",
        "data":"Chaque spermicide a une utilisation bien particuli\u00e8re, nous vous recommandons de lire attentivement la notice et bien respecter chaque indication.<br \/><br \/>Il peut \u00eatre utilis\u00e9 seuls ou de pr\u00e9f\u00e9rence en association avec une autre m\u00e9thode comme le pr\u00e9servatifs, le diaphragme, ou la cape cervicale."
      },
      "RWZmaWNhY2l0w6kN":{
        "title":"Efficacit\u00e9",
        "data":"L'efficacit\u00e9 des spermicides est al\u00e9atoire. Elle d\u00e9pend largement de l'usage qui en est fait. Elle augmente si il est associ\u00e9 \u00e0 un autre moyen contraceptif."
      },
      "QXZhbnRhZ2VzDQ==":{
        "title":"Avantages",
        "data":"<li>Discrets<\/li><li>Augmente l'efficacit\u00e9 des autres contraceptifs<\/li>"
      },
      "SW5jb252w6luaWVudHMN":{
        "title":"Inconv\u00e9nients",
        "data":"<li>Utilisation parfois d\u00e9licate<\/li><li>Efficacit\u00e9 moindre en utilisation seule<\/li>"
      },
      "Q29udHJlLUluZGljYXRpb25zDQ==":{
        "title":"Contre-Indications",
        "data":"<li>Infections sexuellement transmissible<\/li><li>Mycose vaginale<\/li><li>L\u00e9sions du col de l'ut\u00e9rus<\/li><li>Infections urinaires \u00e0 r\u00e9p\u00e9tition<\/li><li>Plaie du vagin<\/li><li>Utilisation de m\u00e9dicaments administr\u00e9s par voie vaginales<\/li>"
      },
      "UHLDqWNhdXRpb25zIGQnZW1wbG9pDQ==":{
        "title":"Pr\u00e9cautions d'emploi",
        "data":"Ne pas utiliser de savon pendant 6 \u00e0 8H"
      },
      "SW5mb3JtYXRpb25zIGNvbXBsw6ltZW50YWlyZXMN":{
        "title":"Informations compl\u00e9mentaires",
        "data":"<li>En pharmacie, sans ordonnance<\/li><li>Entre 7 et 19€ la bo\u00eete de 6 \u00e0 20 spermicides<\/li><li>Non rembours\u00e9 par l'Assurance maladie<\/li>"
      }
    }
  },
  "les-progestatifs-injectables":{
    "title":"Les progestatifs injectables",
    "content":{
      "TGVzIHByb2dlc3RhdGlmcyBpbmplY3RhYmxlcywgYydlc3QgcXVvaSA\/DQ==":{
        "title":"Les progestatifs injectables, c'est quoi ?",
        "data":"Un progestatif de synth\u00e8se (m\u00e9droxyprogest\u00e9rone) est inject\u00e9 par piq\u00fbre intramusculaire tous les trois mois. Pendant 12 semaines, le produit assure une contraception constante."
      },
      "TcOpY2FuaXNtZSBkJ2FjdGlvbg0=":{
        "title":"M\u00e9canisme d'action",
        "data":"Il agit en emp\u00eachant l'ovulation, en modifiant la glaire cervicale ainsi que l'endom\u00e8tre.<br \/><br \/><div class='attention'>Attention ils ne prot\u00e8gent pas des infections sexuellement transmissibles.<\/div>"
      },
      "VXRpbGlzYXRpb24N":{
        "title":"Utilisation",
        "data":"Piq\u00fbre intramusculaire \u00e0 faire tous les 3 mois par un m\u00e9decin, une sage-femme ou une infirmi\u00e8re"
      },
      "RWZmaWNhY2l0w6kN":{
        "title":"Efficacit\u00e9",
        "data":"L'efficacit\u00e9 est tr\u00e8s bonne si l'intervalle d'injection est respect\u00e9.<br \/><br \/>Cette efficacit\u00e9 augmente avec l'\u00e2ge de l'utilisatrice mais peut \u00eatre diminu\u00e9e par certains m\u00e9dicaments."
      },
      "QXZhbnRhZ2VzDQ==":{
        "title":"Avantages",
        "data":"Moins de risque d'oubli"
      },
      "SW5jb252w6luaWVudHMN":{
        "title":"Inconv\u00e9nients",
        "data":"Les effets ind\u00e9sirables sont nombreux :<li>Troubles du cycle<\/li><li>Prise de poids<\/li><li>Manifestations androg\u00e9niques : pilosit\u00e9<\/li><li>Maux de t\u00eate, vertiges, \u00e9tat d\u00e9pressif<\/li>"
      },
      "Q29udHJlLUluZGljYXRpb25zDQ==":{
        "title":"Contre-Indications",
        "data":"<li>Maladie thromboembolique en cours<\/li><li>Tumeur sensible \u00e0 la progest\u00e9rone (cancer du sein, cancer de l'endom\u00e8tre)<\/li><li>H\u00e9morragie g\u00e9nitale non expliqu\u00e9e<\/li><li>Ant\u00e9c\u00e9dent de pathologie h\u00e9patique s\u00e9v\u00e8re ou en cours<\/li><li>Dystrophie ovarienne<\/li><li>Interaction m\u00e9dicamenteuse avec le millepertuis, les inducteurs enzymatiques (anticonvulsivants, trith\u00e9rapie, rifampicine)<\/li>"
      },
      "UHLDqWNhdXRpb25zIGQnZW1wbG9pDQ==":{
        "title":"Pr\u00e9cautions d'emploi",
        "data":"<li>Attention \u00e0 l'utilisation chez les adolescentes et jeunes adultes<\/li><li>Facteurs de risques d'ost\u00e9oporose<\/li>"
      },
      "RWZmZXRzIEluZMOpc2lyYWJsZXMN":{
        "title":"Effets Ind\u00e9sirables",
        "data":"<h2>Naus\u00e9es<\/h2>Elles s'estompent souvent apr\u00e8s quelques cycles sinon parlez en a votre m\u00e9decin.<h2>Tensions mammaires<\/h2>Elles s'estompent souvent apr\u00e8s quelques cycles sinon parlez en a votre m\u00e9decin.<h2>Migraine<\/h2>Si cela persiste, parlez-en \u00e0 votre m\u00e9decin.<h2>Spottings : saignements en dehors des r\u00e8gles<\/h2>Poursuivez l'utilisation du progestatif injectable. Si cela persiste plus de trois mois, consultez votre m\u00e9decin."
      },
      "SW5mb3JtYXRpb25zIGNvbXBsw6ltZW50YWlyZXMN":{
        "title":"Informations compl\u00e9mentaires",
        "data":"<li>Sur prescription m\u00e9dicale, en pharmacie<\/li><li>Co\u00fbte 3,33€ l'injection donc pour 3 mois de traitement<\/li><li>Rembours\u00e9e \u00e0 65% par l'Assurance maladie<\/li>"
      }
    }
  },
  "la-cape-cervicale":{
    "title":"La cape cervicale",
    "content":{
      "TGEgY2FwZSBjZXJ2aWNhbGUsIGMnZXN0IHF1b2kgPw0=":{
        "title":"La cape cervicale, c'est quoi ?",
        "data":"C'est une cupule en silicone qui encapuchonne le col de l'ut\u00e9rus."
      },
      "TcOpY2FuaXNtZSBkJ2FjdGlvbg0=":{
        "title":"M\u00e9canisme d'action",
        "data":"Emp\u00eache le passage des spermatozo\u00efdes dans l'ut\u00e9rus."
      },
      "VXRpbGlzYXRpb24N":{
        "title":"Utilisation",
        "data":"<h2>Ins\u00e9rer la cape au niveau du col, de fa\u00e7on \u00e0 encapuchonner le col de l'ut\u00e9rus.<\/h2>Peut se poser \u00e0 l'avance, au maximum 48h avant le rapport sexuel.Il est conseill\u00e9 de mettre du spermicide \u00e0 l'int\u00e9rieur de la cape.<h2>L'enlever au minimum 8h apr\u00e8s le rapport sexuel.<\/h2>Il n'est pas n\u00e9cessaire de changer la cape \u00e0 chaque rapport ni de remettre spermicide si la cape est en place."
      },
      "RWZmaWNhY2l0w6kN":{
        "title":"Efficacit\u00e9",
        "data":"Efficacit\u00e9 variable : de moyennement efficace \u00e0 efficace.<br \/><br \/>Il est plus efficace chez les femmes n'ayant jamais eu d'enfant.<br \/><br \/>Les principales causes d'\u00e9chec sont :<li>le manque d'habitude<\/li><li>les erreurs de manipulation<\/li><li>la non utilisation \u00e0 certains moments du cycle (Il n'y a pas de p\u00e9riode \"sans risque\").<\/li>"
      },
      "QXZhbnRhZ2VzDQ==":{
        "title":"Avantages",
        "data":"<li>Mise en place \u00e0 l'avance<\/li><li>R\u00e9utilisable<\/li><li>Peu co\u00fbteux<\/li><li>Aucune contre-indication m\u00e9dicamenteuse<\/li>"
      },
      "SW5jb252w6luaWVudHMN":{
        "title":"Inconv\u00e9nients",
        "data":"<li>Insertion parfois d\u00e9licate<\/li><li>Ne prot\u00e8ge pas des infections sexuellement transmissibles.<\/li>"
      },
      "Q29udHJlLUluZGljYXRpb25zDQ==":{
        "title":"Contre-Indications",
        "data":"<li>Apr\u00e8s un accouchement<\/li><li>Dysplasie du col<\/li><li>Pendant les r\u00e8gles (emp\u00eache l'\u00e9coulement)<\/li><li>Prolapsus g\u00e9nital<\/li><li>Infection cervico-vaginale en cours<\/li>"
      },
      "UHLDqWNhdXRpb25zIGQnZW1wbG9pDQ==":{
        "title":"Pr\u00e9cautions d'emploi",
        "data":"Il existe 2 tailles : une petite pour les femmes n'ayant jamais eu d'enfant et une plus grande pour les femmes ayant eu des enfants.<br \/><br \/>Il est utilisable pendant 1 an."
      },
      "SW5mb3JtYXRpb25zIGNvbXBsw6ltZW50YWlyZXMN":{
        "title":"Informations compl\u00e9mentaires",
        "data":"<li>La premi\u00e8re pose est faite par le m\u00e9decin ou la sage-femme.<\/li><li>Elle co\u00fbte environ 60€ et utilisable 1 an<\/li><li>N\u00e9cessite une prescription m\u00e9dicale<\/li><li>Se trouve en pharmacie sur commandes ou au Mouvement fran\u00e7ais pour le planning familial.<\/li>"
      }
    }
  },
  "la-contraception-durgence":{
    "title":"La contraception d'urgence",
    "content":{
      "TGEgY29udHJhY2VwdGlvbiBkJ3VyZ2VuY2UsIGMnZXN0IHF1b2kgPw0=":{
        "title":"La contraception d'urgence, c'est quoi ?",
        "data":"M\u00e9thode de rattrapage, exceptionnelle, \u00e0 utiliser lorsqu'il y a eu un rapport sexuel non ou mal prot\u00e9g\u00e9.<br \/><br \/>Il est \u00e9galement possible d'utiliser un dispositif intra-ut\u00e9rin jusqu'\u00e0 5 jours apr\u00e8s le rapport sexuel non prot\u00e9g\u00e9. C'est la m\u00e9thode la plus efficace.<br \/><br \/>Elle ne prot\u00e8ge pas des infections sexuellement transmissibles."
      },
      "TcOpY2FuaXNtZSBkJ2FjdGlvbg0=":{
        "title":"M\u00e9canisme d'action",
        "data":"La pilule de la contraception d'urgence emp\u00eache l'ovulation (ou la retarde).Cette pilule est inefficace une fois que la nidation (l'ovocyte f\u00e9cond\u00e9 s'est implant\u00e9) a commenc\u00e9."
      },
      "VXRpbGlzYXRpb24N":{
        "title":"Utilisation",
        "data":"A prendre le plus t\u00f4t possible apr\u00e8s le rapport sexuel \u00e0 risque.<li>Norlevo\u00ae (levonorgestrel) au plus tard jusqu'\u00e0 3 jours apr\u00e8s le rapport \u00e0 risque.<\/li><li>Ella one\u00ae au plus tard jusqu'\u00e0 5 jours apr\u00e8s le rapport \u00e0 risque.<\/li><br \/><br \/>Peut \u00eatre pris lors des oublis de pilule, anneau vaginal et patch ou lors des accidents d'utilisation du pr\u00e9servatif"
      },
      "RWZmaWNhY2l0w6kN":{
        "title":"Efficacit\u00e9",
        "data":"D'autant plus efficace si elle est prise t\u00f4t"
      },
      "Q29udHJlLUluZGljYXRpb25zDQ==":{
        "title":"Contre-Indications",
        "data":"<li>Aucune<\/li><li>Pr\u00e9cautions d'emploi<\/li><li>Ne peut \u00eatre une contraception r\u00e9guli\u00e8re (inadapt\u00e9)<\/li><li>Efficacit\u00e9 non garantie si utilis\u00e9e \u00e0 plusieurs reprises<\/li>"
      },
      "RWZmZXRzIEluZMOpc2lyYWJsZXMN":{
        "title":"Effets Ind\u00e9sirables",
        "data":"<li>Retarde les r\u00e8gles<\/li><li>Saignements<\/li><li>Naus\u00e9es<\/li><li>Vomissements : Si le comprim\u00e9 a \u00e9t\u00e9 pris moins de 4H avant les vomissements, il faut en reprendre un autre.<\/li>"
      },
      "SW5mb3JtYXRpb25zIGNvbXBsw6ltZW50YWlyZXMN":{
        "title":"Informations compl\u00e9mentaires",
        "data":"<h2>Norlevo\u00ae<\/h2>Co\u00fbte 7,5€ le comprim\u00e9.<br \/><br \/>D\u00e9livr\u00e9 sans prescription m\u00e9dicale en pharmacie.<br \/><br \/>Gratuitement et dans l'anonymat pour les mineurs en pharmacie, \u00e0 l'infirmerie dans leurs \u00e9tablissements scolaires, ou dans un centre de planification.<h2>Ella one\u00ae<\/h2>D\u00e9livr\u00e9 avec prescription m\u00e9dicale en pharmacieCo\u00fbte entre 30€ et 35€ le comprim\u00e9."
      },
      "urgence":{
        "title":"Les contraceptifs d'urgence",
        "data":"Cette partie sera li\u00e9e directement \u00e0 la section m\u00e9dicaments de l'application. Donn\u00e9es officielles ANSM (AFSSAPS)."
      }
    }
  }
}

MyData.IndexSpecialites = [{"id":"5053","atc":"G03AA07","nom":"Adepal Cpr","liste":"LISTE I","sa":"ethinylestradiol"},{"id":"10604","atc":"G02BB","nom":"Alpagelle 0,9% Creme Vaginal Unidose","liste":"SANS LISTE","sa":"miristalkonium chlorure"},{"id":"2394","atc":"G02BB","nom":"Alpagelle 0,9% Creme Vaginale 80g","liste":"SANS LISTE","sa":"miristalkonium chlorure"},{"id":"25026","atc":"G03AB03","nom":"Amarance Cpr","liste":"LISTE I","sa":"ethinylestradiol"},{"id":"29426","atc":"G03AA12","nom":"Belanette 0,02mg\/3mg Cpr","liste":"LISTE I","sa":"drospirenone"},{"id":"19470","atc":"G03AB07","nom":"Belara 0,03mg\/2mg Cpr","liste":"LISTE I","sa":"ethinylestradiol"},{"id":"20364","atc":"G03AA10","nom":"Carlin 75microg\/20microg Cpr","liste":"LISTE I","sa":"ethinylestradiol"},{"id":"20367","atc":"G03AA10","nom":"Carlin 75microg\/30microg Cpr","liste":"LISTE I","sa":"ethinylestradiol"},{"id":"12609","atc":"G03AC09","nom":"Cerazette 0,075mg Cpr","liste":"LISTE I","sa":"desogestrel"},{"id":"2916","atc":"G03AA11","nom":"Cilest Cpr","liste":"LISTE I","sa":"norgestimate"},{"id":"29787","atc":"G03AA12","nom":"Convuline 0,03mg\/3mg Cpr","liste":"LISTE I","sa":"ethinylestradiol"},{"id":"3902","atc":"G03AA09","nom":"Cycleane 30microg Cpr","liste":"LISTE I","sa":"ethinylestradiol"},{"id":"14948","atc":"G03AB03","nom":"Daily Cpr","liste":"LISTE I","sa":"ethinylestradiol"},{"id":"27806","atc":"G03AA09","nom":"Desobel 150microg\/20microg Cpr","liste":"LISTE I","sa":"ethinylestradiol"},{"id":"27807","atc":"G03AA09","nom":"Desobel 150microg\/30microg Cpr","liste":"LISTE I","sa":"ethinylestradiol"},{"id":"16233","atc":"G03AA09","nom":"Desogestrel Ethinyl BGA 150\/20 Cpr","liste":"LISTE I","sa":"ethinylestradiol"},{"id":"16236","atc":"G03AA09","nom":"Desogestrel Ethinyl BGA 150\/30 Cpr","liste":"LISTE I","sa":"ethinylestradiol"},{"id":"31457","atc":"G03AA09","nom":"Desogestrel RTP 75mcg Cpr","liste":"LISTE I","sa":"desogestrel"},{"id":"31177","atc":"G03AA12","nom":"Drospibel 0,02mg\/3mg Cpr","liste":"LISTE I","sa":"drospirenone"},{"id":"31181","atc":"G03AA12","nom":"Drospibel 0,03mg\/3mg Cpr","liste":"LISTE I","sa":"ethinylestradiol"},{"id":"30548","atc":"G03AA10","nom":"Edenelle Cpr","liste":"LISTE I","sa":"ethinylestradiol"},{"id":"20435","atc":"G03AA10","nom":"Efezial 75microg\/20microg Cpr","liste":"LISTE I","sa":"ethinylestradiol"},{"id":"20434","atc":"G03AA10","nom":"Efezial 75microg\/30microg Cpr","liste":"LISTE I","sa":"ethinylestradiol"},{"id":"8832","atc":"G03AA11","nom":"Effiprev Cpr","liste":"LISTE I","sa":"norgestimate"},{"id":"26233","atc":"G03AD02","nom":"Ellaone 30mg Cpr","liste":"LISTE I","sa":"ulipristal acetate"},{"id":"30274","atc":"G03AA12","nom":"Ethinylestradiol DR BGA 0,02\/3mg Cpr","liste":"LISTE I","sa":"drospirenone"},{"id":"30275","atc":"G03AA12","nom":"Ethinylestradiol DR BGA 0,03\/3mg Cpr","liste":"LISTE I","sa":"drospirenone"},{"id":"31185","atc":"G03AA12","nom":"Ethinylestradiol DR Bgacontinu Cpr","liste":"LISTE I","sa":"drospirenone"},{"id":"25113","atc":"G03AB03","nom":"Evanecia Cpr","liste":"LISTE I","sa":"ethinylestradiol"},{"id":"16226","atc":"G03AA13","nom":"Evra Disp Transderm","liste":"LISTE I","sa":"ethinylestradiol"},{"id":"21689","atc":"G03AA10","nom":"Felixita 75microg\/20microg Cpr GE","liste":"LISTE I","sa":"gestodene"},{"id":"21691","atc":"G03AA10","nom":"Felixita 75microg\/30microg Cpr GE","liste":"LISTE I","sa":"ethinylestradiol"},{"id":"24537","atc":"G03AA10","nom":"Gestodene Ethi ACT 75\/20microg Cpr","liste":"LISTE I","sa":"gestodene"},{"id":"24554","atc":"G03AA10","nom":"Gestodene Ethi ACT 75\/30microg Cpr","liste":"LISTE I","sa":"ethinylestradiol"},{"id":"31762","atc":"G03AA10","nom":"Gestodene Ethi ARW 60\/15microg Cpr","liste":"LISTE I","sa":"ethinylestradiol"},{"id":"21692","atc":"G03AA10","nom":"Gestodene Ethi ARW 75\/20microg Cpr","liste":"LISTE I","sa":"gestodene"},{"id":"21695","atc":"G03AA10","nom":"Gestodene Ethi ARW 75\/30microg Cpr","liste":"LISTE I","sa":"gestodene"},{"id":"29843","atc":"G03AA10","nom":"Gestodene Ethi BGA 60\/15microg Cpr","liste":"LISTE I","sa":"ethinylestradiol"},{"id":"20392","atc":"G03AA10","nom":"Gestodene Ethi BGA 75\/20microg Cpr","liste":"LISTE I","sa":"gestodene"},{"id":"20403","atc":"G03AA10","nom":"Gestodene Ethi BGA 75\/30microg Cpr","liste":"LISTE I","sa":"ethinylestradiol"},{"id":"21584","atc":"G03AA10","nom":"Gestodene Ethi EG 75\/20microg Cpr","liste":"LISTE I","sa":"gestodene"},{"id":"21585","atc":"G03AA10","nom":"Gestodene Ethi EG 75\/30microg Cpr","liste":"LISTE I","sa":"gestodene"},{"id":"22215","atc":"G03AA10","nom":"Gestodene Ethi RBX 75\/20microg Cpr","liste":"LISTE I","sa":"ethinylestradiol"},{"id":"22217","atc":"G03AA10","nom":"Gestodene Ethi RBX 75\/30microg Cpr","liste":"LISTE I","sa":"ethinylestradiol"},{"id":"21696","atc":"G03AA10","nom":"Gestodene Ethi RTP 75\/20microg Cpr","liste":"LISTE I","sa":"gestodene"},{"id":"21697","atc":"G03AA10","nom":"Gestodene Ethi RTP 75\/30microg Cpr","liste":"LISTE I","sa":"gestodene"},{"id":"21701","atc":"G03AA10","nom":"Gestodene Ethi SDZ 75\/20microg Cpr","liste":"LISTE I","sa":"gestodene"},{"id":"21703","atc":"G03AA10","nom":"Gestodene Ethi SDZ 75\/30microg Cpr","liste":"LISTE I","sa":"gestodene"},{"id":"29844","atc":"G03AA10","nom":"Gestodene Ethi TVC 60\/15microg Cpr","liste":"LISTE I","sa":"ethinylestradiol"},{"id":"21788","atc":"G03AA10","nom":"Gestodene Ethi TVC 75\/20microg Cpr","liste":"LISTE I","sa":"ethinylestradiol"},{"id":"21793","atc":"G03AA10","nom":"Gestodene Ethi TVC 75\/30microg Cpr","liste":"LISTE I","sa":"ethinylestradiol"},{"id":"31892","atc":"G03AA10","nom":"Gestodene Ethi Zen 60\/15microg Cpr","liste":"LISTE I","sa":"ethinylestradiol"},{"id":"21771","atc":"G03AA10","nom":"Gestodene Ethi Zen 75\/20microg Cpr","liste":"LISTE I","sa":"ethinylestradiol"},{"id":"21782","atc":"G03AA10","nom":"Gestodene Ethi Zen 75\/30microg Cpr","liste":"LISTE I","sa":"ethinylestradiol"},{"id":"22221","atc":"G03AA10","nom":"Gestodene Ethi ZYD 75\/20microg Cpr","liste":"LISTE I","sa":"ethinylestradiol"},{"id":"22222","atc":"G03AA10","nom":"Gestodene Ethi ZYD 75\/30microg Cpr","liste":"LISTE I","sa":"ethinylestradiol"},{"id":"8927","atc":"G03AA10","nom":"Harmonet 75microg\/20microg Cpr","liste":"LISTE I","sa":"ethinylestradiol"},{"id":"28194","atc":"G03AA10","nom":"Harmonet 75microg\/20microg Cpr (be)","liste":"LISTE I","sa":"ethinylestradiol"},{"id":"14572","atc":"G03AA12","nom":"Jasmine 0,03mg\/3mg Cpr","liste":"LISTE I","sa":"ethinylestradiol"},{"id":"20964","atc":"G03AA12","nom":"Jasminelle 0,02mg\/3mg Cpr","liste":"LISTE I","sa":"drospirenone"},{"id":"22921","atc":"G03AA12","nom":"Jasminellecontinu 0,02mg\/3mg Cpr","liste":"LISTE I","sa":"drospirenone"},{"id":"28114","atc":"G03AA07","nom":"Leeloo 0,1mg\/0,02mg Cpr G\u00e9","liste":"LISTE I","sa":"ethinylestradiol"},{"id":"22224","atc":"G03AD01","nom":"Levonorgestrel BGA 1,5mg Cpr","liste":"SANS LISTE","sa":"levonorgestrel"},{"id":"28802","atc":"G03AA07","nom":"Lovavulo 20microg\/100microg Cpr Pell","liste":"LISTE I","sa":"levonorgestrel"},{"id":"14953","atc":"G03AA07","nom":"Ludeal Cpr","liste":"LISTE I","sa":"ethinylestradiol"},{"id":"8928","atc":"G03AA10","nom":"Meliane 75microg\/20microg Cpr","liste":"LISTE I","sa":"gestodene"},{"id":"12150","atc":"G03AA10","nom":"Melodia Cpr","liste":"LISTE I","sa":"ethinylestradiol"},{"id":"2890","atc":"G03AA09","nom":"Mercilon Cpr","liste":"LISTE I","sa":"ethinylestradiol"},{"id":"514","atc":"G03AD01","nom":"Microval 0,03mg Cpr","liste":"LISTE I","sa":"levonorgestrel"},{"id":"12031","atc":"G03AA10","nom":"Minesse Cpr","liste":"LISTE I","sa":"ethinylestradiol"},{"id":"4631","atc":"G03AA07","nom":"Minidril 0,15\/0,03mg Cpr","liste":"LISTE I","sa":"ethinylestradiol"},{"id":"3907","atc":"G03AA10","nom":"Minulet 75microg\/30microg Cpr","liste":"LISTE I","sa":"ethinylestradiol"},{"id":"3898","atc":"G03AA10","nom":"Moneva 75microg\/30microg Cpr","liste":"LISTE I","sa":"gestodene"},{"id":"13563","atc":"G03AC08","nom":"Nexplanon 68mg Implant","liste":"LISTE I","sa":"etonogestrel"},{"id":"17178","atc":"G03AD01","nom":"Norlevo 1,5mg Cpr","liste":"SANS LISTE","sa":"levonorgestrel"},{"id":"16606","atc":"G02BB01","nom":"Nuvaring 15\/120microg\/24h Syst Vag","liste":"LISTE I","sa":"etonogestrel"},{"id":"31554","atc":"G03AA12","nom":"Optilova 20\/100mcg Cpr","liste":"LISTE I","sa":"levonorgestrel"},{"id":"31190","atc":"G03AA10","nom":"Optinesse 60mcg\/15mcg Cpr","liste":"LISTE I","sa":"ethinylestradiol"},{"id":"25592","atc":"G03AA07","nom":"Pacilia Cpr G\u00e9","liste":"LISTE I","sa":"ethinylestradiol"},{"id":"19942","atc":"G03AB06","nom":"Perleane Cpr","liste":"LISTE I","sa":"ethinylestradiol"},{"id":"677","atc":"G03AB06","nom":"Phaeva Cpr","liste":"LISTE I","sa":"ethinylestradiol"},{"id":"2403","atc":"G02BB","nom":"Pharmatex 1,2% CR Vaginale Avec Appl","liste":"SANS LISTE","sa":"benzalkonium chlorure"},{"id":"10530","atc":"G02BB","nom":"Pharmatex 1,2% CR Vaginale SS Appl","liste":"SANS LISTE","sa":"benzalkonium chlorure"},{"id":"13883","atc":"G02BB","nom":"Pharmatex 18,9mg Capsule Vaginale","liste":"SANS LISTE","sa":"benzalkonium chlorure"},{"id":"2893","atc":"G02BB","nom":"Pharmatex 18,9mg Mini Ovule","liste":"SANS LISTE","sa":"benzalkonium chlorure"},{"id":"2406","atc":"G02BB","nom":"Pharmatex 18,9mg Ovule","liste":"SANS LISTE","sa":"benzalkonium chlorure"},{"id":"10531","atc":"G02BB","nom":"Pharmatex 54mg CR Vaginale Unidose","liste":"SANS LISTE","sa":"benzalkonium chlorure"},{"id":"31192","atc":"G03AA12","nom":"Rimendia 0,02mg\/3mg Cpr","liste":"LISTE I","sa":"drospirenone"},{"id":"7504","atc":"G03AA06","nom":"Stediril 0,5mg\/0,05mg Cpr","liste":"LISTE I","sa":"ethinylestradiol"},{"id":"30906","atc":"G03AA10","nom":"Sylviane Cpr","liste":"LISTE I","sa":"ethinylestradiol"},{"id":"2917","atc":"G03AB06","nom":"Tri Minulet Cpr","liste":"LISTE I","sa":"ethinylestradiol"},{"id":"15451","atc":"G03AA11","nom":"Triafemi Cpr","liste":"LISTE I","sa":"ethinylestradiol"},{"id":"15450","atc":"G03AA11","nom":"Tricilest Cpr","liste":"LISTE I","sa":"ethinylestradiol"},{"id":"7047","atc":"G03AA05","nom":"Triella Cpr","liste":"LISTE I","sa":"ethinylestradiol"},{"id":"500","atc":"G03AB03","nom":"Trinordiol Cpr","liste":"LISTE I","sa":"ethinylestradiol"},{"id":"9109","atc":"G03AA09","nom":"Varnoline Continu Cpr","liste":"LISTE I","sa":"ethinylestradiol"},{"id":"511","atc":"G03AA09","nom":"Varnoline Cpr","liste":"LISTE I","sa":"desogestrel"},{"id":"24451","atc":"G03AA12","nom":"Yaz 0,02mg\/3mg Cpr","liste":"LISTE I","sa":"drospirenone"}]

MyData.lang=  {};
MyData.lang.Fr = function() {

Ext.onReady(function() {
	
	Ext.Date.dayNames = [
	        "Dimanche",
	        "Lundi",
	        "Mardi",
	        "Mercredi",
	        "Jeudi",
	        "Vendredi",
	        "Samedi"
	];
	
	Ext.Date.monthNames = [
	        "Janvier",
	        "Février",
	        "Mars",
	        "Avril",
	        "Mai",
	        "Juin",
	        "Juillet",
	        "Août",
	        "Septembre",
	        "Octobre",
	        "Novembre",
	        "Décembre"
	];
	
	Ext.Date.monthNumbers = {
	    'Jan': 0,
	    'Feb': 1,
	    'Mar': 2,
	    'Apr': 3,
	    'May': 4,
	    'Jun': 5,
	    'Jul': 6,
	    'Aug': 7,
	    'Sep': 8,
	    'Oct': 9,
	    'Nov': 10,
	    'Dec': 11
	};
	
	if (Ext.picker.Picker){
	    Ext.override(Ext.picker.Picker, {
	        doneText: 'Done'    
	    });
	}
	
	if (Ext.picker.Date) {
	    Ext.override(Ext.picker.Date, {
	        'dayText': 'Jour',
	        'monthText': 'Mois',
	        'yearText': 'Année',
	        'slotOrder': ['day', 'month', 'year']    
	    });
	}
	
	if(Ext.IndexBar){
	    Ext.override(Ext.IndexBar, {
	        'letters': ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']    
	    });
	}
	
	if(Ext.NestedList){
	    Ext.override(Ext.NestedList, {
	        'backText': 'Retour',
	        'loadingText': 'Chargement...',
	        'emptyText': 'No items available.'
	    });
	}
	
	if(Ext.util.Format){
	    Ext.util.Format.defaultDateFormat = 'd/m/Y';
	}
	
	if(Ext.MessageBox){
	    Ext.MessageBox.OK.text = 'OK';
	    Ext.MessageBox.CANCEL.text = 'Annuler';
	    Ext.MessageBox.YES.text = 'Oui';
	    Ext.MessageBox.NO.text = 'Non';
	}

});

}



function GCM_Event(c){console.log("<li>EVENT -> RECEIVED:"+c.event+"</li>");switch(c.event){case"registered":var b=c.regid;window.localStorage.setItem("token",b);console.log("registerDevice: "+b);break;case"message":console.log("ICI");var a=function(){};navigator.notification.alert(c.message,a,"Game Over","Done");break;case"error":alert(c.msg);break;default:break}}var myAppNative={setAlert:function(b){window.localStorage.setItem("alerte",JSON.stringify(b));f=b;var a="http://push.appocrate.fr/apns.php?task=register";a+="&appname=28jours";a+="&appversion=1";if(window.device!=null){a+="&deviceuuid="+Ext.device.Device.uuid;a+="&devicetoken="+window.localStorage.getItem("token");a+="&devicename="+Ext.device.Device.name;a+="&deviceplatform="+Ext.device.Device.platform}a+="&regles="+encodeURI(f.start);a+="&heure="+encodeURI(f.heure);a+="&message="+encodeURI(f.message);a+="&drug="+encodeURI(f.drug);Ext.Ajax.request({url:a,method:"GET",callback:function(c){navigator.notification.confirm("C'est fait",function(){},"Message","Merci")}})},setPrise:function(a){pp=JSON.parse(window.localStorage.getItem("alerte"));console.log(pp);if(pp==null){pp={prises:{}}}pp.prises[a.prise]=true;window.localStorage.setItem("alerte",JSON.stringify(pp))},removePrise:function(a){pp=JSON.parse(Ti.App.Properties.getObject("alerte"));delete pp.prises[a.prise];window.localStorage.setItem("alerte",JSON.stringify(pp))},removeAlert:function(a,b){var c="http://push.appocrate.fr/apns.php?task=unregister";c+="&appname=28jours";c+="&devicetoken="+window.localStorage.getItem("token");c+="&devicename="+Ext.device.Device.name;Ext.Ajax.request({url:c,method:"GET",params:{username:"Ed",password:"not a good place to put a password"},callback:function(d){navigator.notification.confirm("C'est supprimé",function(){},"Message","Merci")}})},iOsPushInit:function(){console.warn("pushinit");var a=window.plugins.pushNotification;a.onDeviceReady();a.registerDevice({alert:true,badge:true,sound:true,pw_appid:"PUSHWOOSH_APP_ID",appname:"APP_NAME"},function(b){var c=b.deviceToken;window.localStorage.setItem("token",c);console.warn("registerDevice: "+c)},function(b){console.warn("failed to register : "+JSON.stringify(b));navigator.notification.alert(JSON.stringify(["failed to register ",b]))});a.setApplicationIconBadgeNumber(0);document.addEventListener("push-notification",function(b){var c=b.notification;navigator.notification.alert(c.aps.alert);a.setApplicationIconBadgeNumber(0)})},androidPushInit:function(){window.GCM.register("461723125949","GCM_Event",GCM_Success,GCM_Fail)},};function GCM_Success(b){}function GCM_Fail(b){};
