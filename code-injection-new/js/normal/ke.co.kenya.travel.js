





















Ext.regApplication({
    name: 'app',
	//dataUrl: 'http://localhost/kenya_app',
	//dataUrl: 'http://192.168.43.185/kenya_app',
	dataUrl: 'http://travel.kenya.co.ke',
    launch: function(profile) {
		this.views.viewport = new KenyaApp.views.Viewport();
    }
});

Ext.override(Ext.Sheet, {
    doHide: function(el, options){
        var parent = this.el.parent();
 
        this.el.hide();
 
        if (parent && this.floating && this.modal) {
            parent.unmask();
        }
        if (options && options.fireHideEvent) {
            this.fireEvent('hide', this);
        }
 
        if (Ext.isObject(el)) {
            if (!(this instanceof Ext.MessageBox)) {
               this.destroy();
            }
        }
    }
});
 
Ext.override(Ext.form.Select, {
 
    getPicker: function() {
        if (this.picker) {
            this.picker.destroy();
            this.picker = null;
        }
        this.picker = new Ext.Picker({
            slots: [{
                align       : 'center',
                name        : this.name,
                valueField  : this.valueField,
                displayField: this.displayField,
                value       : this.getValue(),
                store       : this.store
            }],
            listeners: {
                change: this.onPickerChange,
                scope: this
            }
        });
 
        return this.picker;
    }
 
});
 
Ext.override(Ext.form.DatePicker, {
    onPickerHide: function(){
        if (this.datePicker){
            this.datePicker.destroy();
            this.datePicker = null;
        }
    }
});

// model field definition
Ext.regModel('Area', {
    fields: ['id','name']
});

app.stores.Area = new Ext.data.Store({
	//autoDestroy: true,
	sorters: 'name',
    getGroupString : function(record) {
        return record.get('name')[0];
    },
	getGroupId : function(group) {
		console.log(group);
        return group.name.toLowerCase();
    },
    storeId: 'AreaStore',
	model: 'Area',
	proxy: {
		type: 'scripttag',
		url: app.dataUrl + '/area/listjson',
		reader: {
			root: 'areas',
	    	idProperty: 'id'
		},
	},
	idProperty: 'id'
});
app.stores.Area.load();

// model field definition
Ext.regModel('Section', {
    fields: ['id','name', 'parent_id', 'content_id', 'leaf', 'grand_parent_id', 'grand_parent_title', 'slug', 'price', 'area', 'img_url']
});

// model field definition
Ext.regModel('Content', {
    fields: ['id', 'name', 'intro', 'content', 'contacts', 'images', 'price', 'map_filename']
});

// model field definition
Ext.regModel('HomeNav', {
    fields: ['name', 'action']
});

app.stores.Content = new Ext.data.Store({
	autoDestroy: true,
    storeId: 'ContentStore',
	model: 'Content',
	proxy: {
		type: 'scripttag',
		url: app.dataUrl + '/content/showjson',
		reader: {
			root: 'content',
	    	idProperty: 'id'
		}
	},
	idProperty: 'id'
});

app.stores.Search = new Ext.data.Store({
	autoDestroy: true,
    storeId: 'SearchStore',
	model: 'Content',
	sorters: 'name',
    getGroupString : function(record) {
        return record.get('name')[0];
    },
	proxy: {
		type: 'scripttag',
		url: app.dataUrl + '/content/searchjson',
		reader: {
			root: 'content',
	    	idProperty: 'id'
		},
		/*listeners: {
			exception: function(){
				console.log(arguments);
				this.model.setLoading(false);
			}
		},*/
	},
});
//app.stores.Search.load({params: {q: ''}});

app.stores.OnTheGo = new Ext.data.Store({
    storeId: 'onTheGoStore',
	model: 'Section',
	proxy: {
		type: 'scripttag',
		url: app.dataUrl + '/section/listjson',
		reader: {
	    	type: 'json',
			root: 'sections',
	    	//idProperty: 'id'
		},
		extraParams: {
			parent_id: 146
		}
	},
	idProperty: 'id'
});

//app.stores.OnTheGo.load();

app.stores.Info = new Ext.data.Store({
    storeId: 'infoStore',
	model: 'Section',
	proxy: {
		type: 'scripttag',
		url: app.dataUrl + '/section/listjson',
		reader: {
	    	type: 'json',
			root: 'sections',
	    	//idProperty: 'id'
		},
		extraParams: {
			parent_id: 148
		}
	},
	idProperty: 'id'
});

//app.stores.Info.load();

app.stores.Tools = new Ext.data.Store({
    storeId: 'toolsStore',
	model: 'Section',
	proxy: {
		type: 'scripttag',
		url: app.dataUrl + '/section/listjson',
		reader: {
	    	type: 'json',
			root: 'sections',
	    	//idProperty: 'id'
		},
		extraParams: {
			parent_id: 149
		}
	},
	idProperty: 'id'
});

//app.stores.Tools.load();

app.stores.HomeNavStore = new Ext.data.Store({
	model: 'HomeNav',
	data: [
		{name: 'On the Go', action: 'onthego'},
		{name: 'Information', action: 'information'},
		{name: 'Tools', action: 'tools'},
		{name: 'Search', action: 'search'}
	]
});

app.controllers.main = new Ext.Controller({
	index: function(options) {
		
	},

	/// load data for on the go and show the controller
	onthego: function(options) {
		app.views.viewport.setActiveItem(app.views.contentScreen, {type: 'slide', direction: 'left'});
		app.views.contentScreen.setActiveItem(app.views.onTheGoScreen);
	},
	
	information: function(options) {
		app.views.viewport.setActiveItem(app.views.contentScreen, {type: 'slide', direction: 'left'});
		app.views.contentScreen.setActiveItem(app.views.infoScreen);
	},
	
	tools: function(options) {
		app.views.viewport.setActiveItem(app.views.contentScreen, {type: 'slide', direction: 'left'});
		app.views.contentScreen.setActiveItem(app.views.toolsScreen);
	},
	
	search: function(options) {
		app.views.viewport.setActiveItem(app.views.contentScreen, {type: 'slide', direction: 'left'});
		app.views.contentScreen.setActiveItem(app.views.searchScreen);
	}
});

Ext.ns('KenyaApp.views');
KenyaApp.views.ToolsScreen = Ext.extend(Ext.Panel, {
	layout: 'fit',
	initComponent: function() {
        //put instances of cards into app.views namespace
        Ext.apply(this, {
			toolsTree: new KenyaApp.views.SectionTree({
				store: app.stores.Tools,
				title: 'Tools'
			})
        });
        
        //put instances of cards into viewport
        Ext.apply(this, {
            items: [
                this.toolsTree
            ]
        });
		
        KenyaApp.views.ToolsScreen.superclass.initComponent.apply(this, arguments);
    }
});

Ext.ns('KenyaApp.views');
Ext.regModel('LocationType', {
    fields: ['type', 'label']
});

app.stores.LocationTypeStore = new Ext.data.JsonStore({
    model  : 'LocationType',
    data: [
		{type: 'city', label: 'Pick a city'},
		{type: 'aroundme', label: 'Activate around me'}
	]
});
KenyaApp.views.LocationPicker = Ext.extend(Ext.Panel, {
	layout: 'card',
	cls: 'location-picker',
	initComponent: function() {		
		Ext.apply(this, {
			locationTypeList: new Ext.List({
				store: app.stores.LocationTypeStore,
				itemTpl: '{label}'
			}),
			areaList: new Ext.List({
				store: app.stores.Area,
				itemTpl: '{name}',
				grouped : true,
    			indexBar: true
			}),
			backButton: new Ext.Button({
				text: 'Back',
                ui: 'back',
                handler: this.onBackTap,
                scope: this,
                // First stack doesn't show back
                hidden: true
			})
		});
		this.locationTypeList.on('itemtap', this.onListItemTap, this);
		this.areaList.on('itemtap', this.onAreaItemTap, this);
		this.areaList.on('activate', this.onAreaListActivate, this);
		this.areaList.on('deactivate', this.onAreaListDeActivate, this);
		this.areaList.store.proxy.on('exception', function(){
			console.log("Failed in areas");
			this.areaList.setLoading(false);
		}, this);
		
		 //put instances of cards into viewport
        Ext.apply(this, {
        	/*dockedItems: [
	        	{
        			xtype: 'toolbar',
        			title: 'Pick a location',
					ui: 'light',
					cls: 'location-picker-toolbar',
        			items: [
        				this.backButton,
        			]
	        	}
        	],*/
        	items: [
                //this.locationTypeList,
                this.areaList
            ]
        });
	
		KenyaApp.views.LocationPicker.superclass.initComponent.apply(this, arguments);
	},
	
	onListItemTap: function( dataView, index, item, evt )
	{
		var type = dataView.store.getAt(index).data.type;
		if(type == 'city')
		{
			/// show area list
			this.setActiveItem(this.areaList, {type: 'slide', direction: 'left'});
		}
		else if(type == 'aroundme')
		{
			app.views.onTheGoScreen.pickedLocation = null;
			app.views.onTheGoScreen.aroundMe = true;
			app.views.onTheGoScreen.onLocationChanged();
		}
	},
	
	onAreaItemTap: function(dataView, index, item, evt)
	{
		var areaId = dataView.store.getAt(index).data.id;
		
		app.views.onTheGoScreen.pickedLocation = areaId;
		app.views.onTheGoScreen.aroundMe = false;
		//this.setActiveItem(this.locationTypeList);
		app.views.onTheGoScreen.onLocationChanged();
	},
	
	onAreaListActivate: function()
	{
		//this.backButton.show();
	},
	
	onAreaListDeActivate: function()
	{
		//this.backButton.hide();
	},
	
	onBackTap: function()
	{
		this.setActiveItem(this.locationTypeList, {type: 'slide', direction: 'right'});
	}
});

Ext.ns('KenyaApp.views');
KenyaApp.views.InfoScreen = Ext.extend(KenyaApp.views.SectionScreen, {
	defaultId: 148,
	currentId: 148,
	defaultTitle: "Information",
	currentTitle: "Information",
	store: app.stores.info
});

Ext.ns('KenyaApp.views');
KenyaApp.views.DetailPanel = Ext.extend(Ext.Panel, {
	cls: 'detail-panel',
	tpl:
	[
		'<h1>{name}</h1>',
		'{intro}',
		'<tpl for="images">',
		  '<div class = "photos">',
          '<img src="{.}" height="200" />',
          '</div>',
		'</tpl>',
		'{content}',
		'<tpl if="contacts.Tel || contacts.Cel">',
		  '<h2>Contacts</h2>',
		'</tpl>',
		'<tpl if="contacts.Tel">',
		  '<div class="contacts">',
		    '<span class="contact-icon contact-tels"></span>',
		    '<span class="contact-nos">',
		      '<tpl for="contacts.Tel">',
		        '{[xindex > 1 ? ","  : ""]} <a href="tel:{.}">{.}</a>',
		      '</tpl>',
		    '</span>',
		  '</div>',
		'</tpl>',
		'<tpl if="contacts.Cel">',
		  '<div class="contacts">',
		    '<span class="contact-icon contact-cels"></span>',
		    '<span class="contact-nos">',
		      '<tpl for="contacts.Cel">',
		        '{[xindex > 1 ? ","  : ""]} <a href="tel:{.}">{.}</a>',
		      '</tpl>',
		    '</span>',
		  '</div>',
		'</tpl>',
		'<tpl if="price &gt;= 0">',
		  '<div class="price">',
		    '<span class="avg-price">Average Price (per person): </span>',
		    '<span class="amount">',
		      '<tpl if="price == 0">',
		        'Free',
		      '</tpl>',
		      '<tpl if="price &gt; 0">',
		        '{price} USD',
		      '</tpl>',
		    '</span>',
		  '</div>',
		'</tpl>',
		'<tpl if="map_filename != &quot;&quot;">',
		  '<div class="map">',
		    
		  '</div>',
		'</tpl>',
		'<p></p>'
	],
	scroll: 'vertical'
});

Ext.ns('KenyaApp.views');
KenyaApp.views.SectionScreen = Ext.extend(Ext.Panel, {
	layout: 'card',
	defaultId: null,
	currentId: null,
	defaultTitle: null,
	currentTitle: null,
	parentTitle: null,
	parentId: null,
	store: null,
	loadedFirstTime: false,
	initComponent: function() {
        //put instances of cards into app.views namespace
        Ext.apply(this, {
			homeButton: new Ext.Button({
				ui: 'plain',
				scope: this,
				hidden: true,
				iconMask: true,
				iconCls: 'home',
				cls: 'home-button',
				handler: this.onHomeTap
			}),
			backButton: new Ext.Button({
				ui: 'back',
				hidden: true
			}),
			toolbar: new Ext.Toolbar({
				cls: 'section-tree-toolbar',
				title: this.currentTitle,	
			}),
			sectionList: new KenyaApp.views.SectionList({
				store: this.store,
			}),
			detailPanel: new KenyaApp.views.DetailPanel(),
        });
        
        //put instances of cards into viewport
        Ext.apply(this, {
            dockedItems: [
				this.toolbar
			],
			items: [
                this.sectionList,
				this.detailPanel
            ]
        });
		
		this.sectionList.store.proxy.on('exception', function(){
			this.sectionList.setLoading(false);
			Ext.Msg.alert('Error', 'Could not connect to the server, please try again..', function(){
				app.views.viewport.setActiveItem(app.views.homeScreen, {type: 'slide', direction: 'right'});	
				app.views.contentScreen.setActiveItem(app.views.searchScreen);
			});
		}, this);
		this.sectionList.on('itemtap', this.itemtap, this);
		this.toolbar.add(this.homeButton);
		this.toolbar.add(this.backButton);
		this.backButton.on('tap', this.backButtonTap, this);
		
        KenyaApp.views.SectionScreen.superclass.initComponent.apply(this, arguments);
    },
	
	itemtap : function( dataView, index, element, evt ) {
		/// check if its a leaf item
		var record = dataView.store.getAt(index).data;
		if(record.leaf == true)
		{
			this.loadContent(record);
		}
		else
		{
			this.loadSections(record.id, record.name, false);			
		}
	},
	
	backButtonTap: function(button, evt) {
		if(this.getActiveItem() == this.detailPanel)
		{
			this.setActiveItem(this.infoList, {type: 'slide', direction: 'right'});
			this.homeButton.show();
			this.toolbar.setTitle(this.currentTitle);
		}
		else if(this.parentId)
			this.loadSections(this.parentId, this.parentTitle, true);
	},
	
	onHomeTap: function(){
		this.loadSections(this.defaultId, this.defaultTitle, true);
	},
	
	loadSections: function(id, title, isBack){
		var parentView = this;
		this.sectionList.setLoading(true);
		this.sectionList.store.load({
			params: {parent_id: id},
			callback:function(records, operation, success){
				parentView.loadedFirstTime = true;
				parentView.sectionList.setLoading(false);
				if(!isBack)
				{
					parentView.parentId = parentView.currentId;
					parentView.parentTitle = parentView.currentTitle;
					parentView.currentTitle = title;
					parentView.homeButton.show();
					parentView.backButton.show();
				}
				else
				{
					if(records.length > 0)
					{
						parentView.parentId = records[0].data.grand_parent_id;
						parentView.currentTitle = parentView.parentTitle;
						parentView.parentTitle = records[0].data.grand_parent_title;
						if(!parentView.parentId)
						{
							parentView.homeButton.hide();
							parentView.backButton.hide();
							parentView.currentTitle = parentView.defaultTitle;
						}
						else
							parentView.homeButton.show();	
					}
				}
				parentView.currentId = id;
				parentView.toolbar.setTitle(parentView.currentTitle);
				parentView.sectionList.scroller.scrollTo({x:0, y:0});
			}
		});
	},
	
	loadContent: function(record) {
		var parentView = this;
		this.sectionList.setLoading(true);
		app.stores.Content.load({
			params: {id: record.content_id},
			callback:function(){
				parentView.sectionList.setLoading(false);
				var data = app.stores.Content.getAt(0);
				var title = data.data.name;
				parentView.detailPanel.update(data.data);
				/*
				if(title.length > 18)
					title = title.substr(0, 18) + "..";*/
				parentView.homeButton.hide();
				parentView.toolbar.setTitle('');
				parentView.setActiveItem(parentView.detailPanel, {type: 'slide', direction: 'left'});
			}
		});
	},
	
	listeners: {
		activate: function(){
			if(!this.loadedFirstTime)
			{
				console.log("Activated");
				this.loadSections(this.defaultId, this.defaultTitle, false);
			}
		}
	}
});

Ext.ns('KenyaApp.views');
KenyaApp.views.SearchScreen = Ext.extend(Ext.Panel, {
	layout: 'card',
	searchList: new KenyaApp.views.SearchList({}),
	initComponent: function() {
		
		//put instances of cards into app.views namespace
        Ext.apply(app.views, {
			detailPanel: new KenyaApp.views.DetailPanel({
				
			})
        });
        
        //put instances of cards into viewport
        Ext.apply(this, {
            dockedItems: [
	            {
	            	xtype: 'toolbar',
	            	title: 'Search',
					ui: 'light',
					cls: 'search-screen-toolbar',
	            	items:[
		            	{
	            			ui: 'back',
		            		text: 'Back',
		            		hidden: true,
		            		listeners: {
		            			tap: function(){
		            				app.views.searchScreen.showBackButton(false);
		            				app.views.searchScreen.setActiveItem(0, {type: 'slide', direction: 'right'});
		            			}
		            		}
		            	}
	            	]
	            }
            ],
            items: [
	            {
	            	xtype: 'panel',
	            	layout: 'fit',
	            	dockedItems:[
	            		{
			            	xtype: 'toolbar',
							cls: 'search-toolbar',
			            	layout: {
			            		pack: 'center'
			            	},
			            	items:[
				            	{
				            		xtype: 'searchfield',
				            		placeholder: 'Search',
				            		name: 'searchfield',
				            		listeners: {
				            			action: function(textField, evt){
				            				//if(textField.getValue().length > 2)
				            				app.stores.Search.load({limit: 25, params: {q: textField.getValue()}, callback:function(records, operation, success){
												app.views.searchScreen.searchList.scroller.scrollTo({x:0, y:0});
											}});
				            			}
				            		}
				            	}
			            	]
			            }
	            	],
	            	items:
		            [
		            	this.searchList
		            ],
		            listeners: {
		            	activate: function(){
		            		app.views.searchScreen.setToolbarTitle("Search");
		            	}
		            }
	            },
	            app.views.detailPanel
            ]
        });
        
        app.views.detailPanel.on('activate', function(){
        	app.views.searchScreen.showBackButton(true);
	        app.views.searchScreen.setToolbarTitle(this.data.name);
        });
		
        KenyaApp.views.SearchScreen.superclass.initComponent.apply(this, arguments);
    },
    
    showBackButton: function(show){
		if(show)
			this.dockedItems.items[0].items.items[0].show();
		else
			this.dockedItems.items[0].items.items[0].hide();
	},
	
	setToolbarTitle: function(title){
		if(title.length > 18)
			title = title.substr(0, 18) + "..";
		this.dockedItems.items[0].setTitle(title);
	}
});

Ext.ns('KenyaApp.views');
KenyaApp.views.OnTheGoScreen = Ext.extend(Ext.Panel, {
	layout: 'card',
	pickedLocation: null,
	aroundMe: false,
	showLocationPicker: function()
	{
		this.setActiveItem(this.locationPicker, {type: 'slide', direction: 'left'});
	},
	hideLocationPicker: function()
	{
		this.setActiveItem(this.onTheGoTree, {type: 'slide', direction: 'right'});
	},
	listeners: 
	{
		activate: function()
		{
			this.shouldShowLocationPicker();
		},
		show: function()
		{
			this.shouldShowLocationPicker();
		}
	},
	shouldShowLocationPicker: function(){
		if(this.pickedLocation === null && this.aroundMe == false && app.views.contentScreen.getActiveItem() == this)
			this.showLocationPicker();
	},
	showLoader: function()
	{
		this.loadMask.show();
	},
	hideLoader: function()
	{
		this.loadMask.hide();
	},
	onLocationChanged: function()
	{
		var areaId = this.pickedLocation;
		var params = {};
		if(this.aroundMe == true)
		{
			navigator.geolocation.getCurrentPosition(
				function(){
					console.log(arguments);
				}
				, 
				function(){
					console.log(arguments);
				}
			);
			params = {lat: -1.259459, lon: 36.81841, radius: 2}
		}
		else if(areaId != "")
		{
			params = {area_id: areaId}
		}
		
		app.views.onTheGoScreen.hideLocationPicker();
		this.showLoader();
		
		/// need to re-load the store
		app.stores.OnTheGo.load({
			params: params,
			callback: function(){
				app.views.onTheGoScreen.hideLoader();
			}
		});
	},
	initComponent: function() {
        //put instances of cards into app.views namespace
        Ext.apply(this, {
			onTheGoTree: new KenyaApp.views.SectionScreen({
				defaultId: 146,
				currentId: 146,
				defaultTitle: "On The Go",
				currentTitle: "On The Go",
				store: app.stores.OnTheGo
			}),
			locationPicker: new KenyaApp.views.LocationPicker(),
			loadMask: new Ext.LoadMask(Ext.getBody(), {
				msg:"Loading..."
			})
        });
        
        //put instances of cards into viewport
        Ext.apply(this, {
        	items: [
        	    this.locationPicker,
                this.onTheGoTree
            ]
        });
		
        KenyaApp.views.OnTheGoScreen.superclass.initComponent.apply(this, arguments);
        
        this.onTheGoTree.toolbar.add({
        	xtype: 'spacer'
        });
		/// add a button
        this.onTheGoTree.toolbar.add({
        	xtype: 'button',
        	text: 'Where',
        	listeners:
	        {
	        	tap: function()
		        {
		        	app.views.onTheGoScreen.showLocationPicker();
		        }
	        }
        });
    }
});

Ext.ns('KenyaApp.views');
KenyaApp.views.Viewport = Ext.extend(Ext.Panel, {
    fullscreen: true,
    layout: 'card',
	padding: 5,
	cls: 'main-container',

	initComponent: function() {
        //put instances of cards into app.views namespace
        Ext.apply(app.views, {
			homeScreen: new KenyaApp.views.HomeScreen(),
			contentScreen: new KenyaApp.views.ContentScreen()
        });
        
        //put instances of cards into viewport
        Ext.apply(this, {
            items: [
                app.views.homeScreen,
                app.views.contentScreen
            ]
        });
		/// call controller index method
		/*Ext.dispatch({
			controller: app.controllers.section,
			action: 'index',
			parent_id: 0,
		});*/
		
        KenyaApp.views.Viewport.superclass.initComponent.apply(this, arguments);
    }
});

Ext.ns('KenyaApp.views');
KenyaApp.views.ContentScreen = Ext.extend(Ext.TabPanel, {
	cls: 'content-screen',
	tabBar: {
        dock: 'bottom',
		cls: 'bottom-tabbar',
        scroll: {
            direction: 'horizontal',
            useIndicators: false
        },
        layout: {
            pack: 'center'
        }
    },
    listeners: {
    	beforecardswitch: function(thisComp, newCard, oldCard, newIndex, bAnimated){
    		/// if we're requesting the home screen, switch back to home
    		/*if(newCard == app.views.homeTabScreen)
    			app.views.viewport.setActiveItem(app.views.homeScreen, {type: 'slide', direction: 'right'});*/
    	}
    },
	initComponent: function() {
        //put instances of cards into app.views namespace
        Ext.apply(app.views, {
			/*homeTabScreen: new Ext.Panel({
				iconCls: 'home',
	        	title: 'Home'
			}),*/
        	onTheGoScreen: new KenyaApp.views.OnTheGoScreen({
				iconCls: 'download',
	        	title: 'On the Go',
			}),
        	infoScreen: new KenyaApp.views.SectionScreen({
        		iconCls: 'info',
	        	title: 'Information',
				defaultId: 148,
				currentId: 148,
				defaultTitle: "Information",
				currentTitle: "Information",
				store: app.stores.Info
        	}),
        	toolsScreen: new KenyaApp.views.SectionScreen({
				iconCls: 'settings',
	        	title: 'Tools',
				defaultId: 149,
				currentId: 149,
				defaultTitle: "Tools",
				currentTitle: "Tools",
				store: app.stores.Tools
			}),
        	searchScreen: new KenyaApp.views.SearchScreen({
        		iconCls: 'search',
	        	title: 'Search',
        	})
        });
        
        //put instances of cards into viewport
        Ext.apply(this, {
            items: [
                //app.views.homeTabScreen,
                app.views.onTheGoScreen,
                app.views.infoScreen,
				app.views.toolsScreen,
                app.views.searchScreen
            ]
        });
		var tabBar = this.getTabBar();
        KenyaApp.views.ContentScreen.superclass.initComponent.apply(this, arguments);
    }
})

Ext.ns('KenyaApp.views');
KenyaApp.views.SectionList = Ext.extend(Ext.List, {
	itemTpl : [
    '<tpl if="leaf">',
		'<div class="x-list-item-listing">',
		  '<div class="x-list-item-image">',
            '<img src="{img_url}" width="47" height="45" title=""/>',
			'<a></a>',
		  '</div>',
		  '<a></a>',
		  '<div class="x-list-item-body-list-listing">',
          '<div class="name">{name}</div>',
          '<tpl if="area">',
		    '<div class="area">Area: {area}</div>',
            '</tpl>',
            '<tpl if="price">',
		    '<div class="dollar">Avg. Price: $ {price}</div>',
            '</tpl>',
          '</div>',
        '</div>',
 '</tpl>',
 '<tpl if="!leaf">',
 '<div class="{slug}">{name}</div>',
 '</tpl>',
	],
	emptyText: 'Nothing To See Here Yet…',
	loadingText: 'Loading...'
});

Ext.ns('KenyaApp.views');
KenyaApp.views.HomeScreen = Ext.extend(Ext.Panel, {
	layout: {
        type: 'vbox',
        align: 'stretch'
    },
	cls: 'home-screen',
	initComponent: function() {
        //put instances into app.views namespace
        Ext.apply(this, {
			imagePanel: new Ext.Panel({
				flex: 6,
				cls: 'home-image-panel'
			}),
			homeNavList: new Ext.List({
				flex: 5,
				cls: 'home-nav-list',
				itemTpl: '{name}',
				store: app.stores.HomeNavStore,
				selModel: {
			        mode: 'SINGLE',
			        allowDeselect: false
			    },
			    listeners: {
	        		itemtap: function(dataView, idx, elem, evt) {
						//app.views.viewport.setActiveItemByName(dataView.store.getAt(idx).get('target'));
	        			Ext.dispatch({
							controller: app.controllers.main,
							action: dataView.store.getAt(idx).get('action')
						});
			    	}
	        	}
			})
        });
        
        //put instances of  viewport
        Ext.apply(this, {
            items: [
                this.imagePanel,
                this.homeNavList
            ]
        });
		/// call controller index method
		/*Ext.dispatch({
			controller: app.controllers.section,
			action: 'index',
			parent_id: 0,
		});*/
		
        KenyaApp.views.HomeScreen.superclass.initComponent.apply(this, arguments);
    }
});

Ext.ns('KenyaApp.views');
KenyaApp.views.OnTheGoScreen = Ext.extend(KenyaApp.views.SectionScreen, {
	defaultId: 146,
	currentId: 146,
	defaultTitle: "On The Go",
	currentTitle: "On The Go",
	store: app.stores.OnTheGo,
	pickedLocation: null,
	aroundMe: false,
	showLocationPicker: function()
	{
		this.setActiveItem(this.locationPicker, {type: 'slide', direction: 'left'});
	},
	hideLocationPicker: function()
	{
		this.setActiveItem(this.onTheGoTree, {type: 'slide', direction: 'right'});
	},
	listeners: 
	{
		activate: function()
		{
			this.shouldShowLocationPicker();
		},
		show: function()
		{
			this.shouldShowLocationPicker();
		}
	},
	shouldShowLocationPicker: function(){
		if(this.pickedLocation === null && this.aroundMe == false && app.views.contentScreen.getActiveItem() == this)
			this.showLocationPicker();
	},
	showLoader: function()
	{
		this.loadMask.show();
	},
	hideLoader: function()
	{
		this.loadMask.hide();
	},
	onLocationChanged: function()
	{
		var areaId = this.pickedLocation;
		var params = {};
		if(this.aroundMe == true)
		{
			navigator.geolocation.getCurrentPosition(
				function(){
					console.log(arguments);
				}
				, 
				function(){
					console.log(arguments);
				}
			);
			params = {lat: -1.259459, lon: 36.81841, radius: 2}
		}
		else if(areaId != "")
		{
			params = {area_id: areaId}
		}
		
		app.views.onTheGoScreen.hideLocationPicker();
		//this.showLoader();
		
		/// need to re-load the store
		/*app.stores.OnTheGo.load({
			params: params,
			callback: function(){
				app.views.onTheGoScreen.hideLoader();
			}
		});*/
		this.loadSections(this.defaultId, this.defaultTitle, true);
	},
	initComponent: function() {
        //put instances of cards into app.views namespace
		this.locationPicker = new KenyaApp.views.LocationPicker();
		this.loadMask = new Ext.LoadMask(Ext.getBody(), {
			msg:"Loading..."
		});
		
        KenyaApp.views.OnTheGoScreen.superclass.initComponent.apply(this, arguments);
        
		//put instances of cards into viewport
		this.add(this.locationPicker);
		
        this.toolbar.add({
        	xtype: 'spacer'
        });
		/// add a button
        this.toolbar.add({
        	xtype: 'button',
        	text: 'Where',
        	listeners:
	        {
	        	tap: function()
		        {
		        	app.views.onTheGoScreen.showLocationPicker();
		        }
	        }
        });
    },
	
	loadSections: function(id, title, isBack){
		var parentView = this;
		this.sectionList.setLoading(true);
		this.sectionList.store.load({
			params: {parent_id: id, area_id: parentView.pickedLocation},
			callback:function(records, operation, success){
				parentView.sectionList.setLoading(false);
				if(!isBack)
				{
					parentView.parentId = parentView.currentId;
					parentView.parentTitle = parentView.currentTitle;
					parentView.currentTitle = title;
					parentView.homeButton.show();
					parentView.backButton.show();
				}
				else
				{
					if(records.length > 0)
					{
						parentView.parentId = records[0].data.grand_parent_id;
						parentView.currentTitle = parentView.parentTitle;
						parentView.parentTitle = records[0].data.grand_parent_title;
						if(!parentView.parentId)
						{
							parentView.homeButton.hide();
							parentView.backButton.hide();
							parentView.currentTitle = parentView.defaultTitle;
						}
						else
							parentView.homeButton.show();	
					}
				}
				parentView.currentId = id;
				parentView.toolbar.setTitle(parentView.currentTitle);
				parentView.sectionList.scroller.scrollTo({x:0, y:0});
			}
		});
	},
});

Ext.ns('KenyaApp.views');
KenyaApp.views.SearchList = Ext.extend(Ext.List, {
	store: app.stores.Search,
	grouped : true,
    indexBar: true,
	itemTpl: '{name}',
	listeners: {
		itemtap: function(thisDataView, index, item, evt){
			var ds = thisDataView.getStore();
			var record  = ds.getAt(index);
			console.log(record);
			
            app.stores.Content.load({
        		params: {id: record.get('id')},
        		callback:function(){
        			var data = app.stores.Content.getAt(0);
        			app.views.detailPanel.update(data.data);
        			app.views.searchScreen.setActiveItem(app.views.detailPanel, {type: 'slide', direction: 'left'});
        		}
        	});
		}
	}
});

Ext.ns('KenyaApp.views');
KenyaApp.views.SectionTree = Ext.extend(Ext.NestedList, {
	displayField: 'name',
	useTitleAsBackText: true,
	grouped : true,
    indexBar: true,
	toolbar: {
		cls: 'section-tree-toolbar'
	},
	//store: app.stores.Section,
	/*getTitleTextTpl: function(record){
		var title = record.attributes.record.data.name;
		if(title.length > 18)
			title = title.substr(0, 18) + "..";
		return title;
	},
	getItemTextTpl: function(){
		return '<div><h2>{name}</h2></div><p style="font-size:60%"></p>';
	},*/
	
	getDetailCard: function(record, parentRecord){
		detailCard = new KenyaApp.views.DetailPanel();
		return detailCard;
	},
	
	listeners: {
		leafitemtap: function(subList, subIdx, el, e, detailCard){
			var ds = subList.getStore();
			var record  = ds.getAt(subIdx);
			var toolbar = this.toolbar;
			
            app.stores.Content.load({
        		params: {id: record.get('id')},
        		callback:function(){
        			var data = app.stores.Content.getAt(0);
        			var title = data.data.name;
        			detailCard.update(data.data);
        			/*
					if(title.length > 18)
						title = title.substr(0, 18) + "..";*/
        			toolbar.setTitle('');
        		}
        	});
		}
	},
	
	initComponent: function(){
		KenyaApp.views.SectionTree.superclass.initComponent.apply(this, arguments);
		this.homeButton = new Ext.Button({
			 ui: 'plain',
			 scope: this,
			 hidden: true,
			 iconMask: true,
			 iconCls: 'home',
			 cls: 'home-button',
			 handler: this.onHomeTap
		});
		
		if (this.useToolbar) {
			this.toolbar.items.items.unshift(this.homeButton);
		}
	},
	
	onHomeTap: function()
	{
		this.setActivePath("/root");
	},
	
	setActivePath: function(path) {
        // a forward leading slash indicates to go
        // to root, otherwise its relative to current
        // position
        var gotoRoot = path.substr(0, 1) === "/",
            j        = 0,
            ds       = this.store,
            tree     = ds.tree,
            node, card, lastCard,
            pathArr, pathLn;

        if (gotoRoot) {
            path = path.substr(1);
        }

        pathArr = Ext.toArray(path.split('/'));
        pathLn  = pathArr.length;


        if (gotoRoot) {
            // clear all but first item
            var items      = this.items,
                itemsArray = this.items.items,
                i          = items.length;

            for (; i > 0; i--) {
                this.remove(itemsArray[i - 1], true);
            }

            // verify last item left matches first item in pathArr
            // <debug>
            /*var rootNode = itemsArray[0].recordNode;
            if (rootNode.id !== pathArr[0]) {
                throw new Error("rootNode doesn't match!");
            }*/
            // </debug>

            // we've removed all cards, set this back to 0
            j = 0;
        }


        // loop through the path and add cards
        for (; j < pathLn; j++) {
            if (pathArr[j] !== "") {
                node = tree.getNodeById(pathArr[j]);

                // currently adding cards and not verifying
                // that they are true child nodes of the current parent
                // this would be some good debug tags.
                card = this.addNextCard(node);

                // leaf nodes may or may not have a card
                // therefore we need a temp var (lastCard)
                if (card) {
                    lastCard = card;
                }
            }
        }

        // <debug>
        if (!lastCard) {
            throw new Error("Card was not found when trying to add to NestedList.");
        }
        // </debug>

        this.setActiveItem(lastCard, {type: 'slide', direction: 'right'});
        this.fireEvent('listchange', this, lastCard);
        this.syncToolbar();
    },
    
    syncToolbar: function(card) {
        var list      = card || this.getActiveItem(),
        depth         = this.items.indexOf(list),
        recordNode    = list.recordNode,
        parentNode    = recordNode ? recordNode.parentNode : null,
        backBtn       = this.backButton,
        backBtnText   = this.useTitleAsBackText && parentNode ? this.renderTitleText(parentNode) : this.backText,
        backToggleMth = (depth !== 0) ? 'show' : 'hide';


        if (backBtn) {
            backBtn[backToggleMth]();
            if (parentNode) {
                backBtn.setText(backBtnText);
            }
        }
        
        if (this.homeButton) {
            this.homeButton[backToggleMth]();
        }

		/// if we are not at the root, empty title text
        if(this.toolbar && parentNode)
        	this.toolbar.setTitle('');
        else if (this.toolbar && this.updateTitleText) {
            this.toolbar.setTitle(recordNode && recordNode.getRecord() ? this.renderTitleText(recordNode) : this.title || '');
        }
        
        this.toolbar.doLayout();
    }
});

Ext.ns('KenyaApp.views');
KenyaApp.views.SectionTree = Ext.extend(Ext.NestedList, {
	displayField: 'name',
	useTitleAsBackText: true,
	grouped : true,
    indexBar: true,
	toolbar: {
		cls: 'section-tree-toolbar'
	},
	//store: app.stores.Section,
	/*getTitleTextTpl: function(record){
		var title = record.attributes.record.data.name;
		if(title.length > 18)
			title = title.substr(0, 18) + "..";
		return title;
	},
	getItemTextTpl: function(){
		return '<div><h2>{name}</h2></div><p style="font-size:60%"></p>';
	},*/
	
	getDetailCard: function(record, parentRecord){
		detailCard = new KenyaApp.views.DetailPanel();
		return detailCard;
	},
	
	listeners: {
		leafitemtap: function(subList, subIdx, el, e, detailCard){
			var ds = subList.getStore();
			var record  = ds.getAt(subIdx);
			var toolbar = this.toolbar;
			
            app.stores.Content.load({
        		params: {id: record.get('id')},
        		callback:function(){
        			var data = app.stores.Content.getAt(0);
        			var title = data.data.name;
        			detailCard.update(data.data);
        			/*
					if(title.length > 18)
						title = title.substr(0, 18) + "..";*/
        			toolbar.setTitle('');
        		}
        	});
		}
	},
	
	initComponent: function(){
		KenyaApp.views.SectionTree.superclass.initComponent.apply(this, arguments);
		this.homeButton = new Ext.Button({
			 ui: 'plain',
			 scope: this,
			 hidden: true,
			 iconMask: true,
			 iconCls: 'home',
			 cls: 'home-button',
			 handler: this.onHomeTap
		});
		
		if (this.useToolbar) {
			this.toolbar.items.items.unshift(this.homeButton);
		}
	},
	
	onHomeTap: function()
	{
		this.setActivePath("/root");
	},
	
	setActivePath: function(path) {
        // a forward leading slash indicates to go
        // to root, otherwise its relative to current
        // position
        var gotoRoot = path.substr(0, 1) === "/",
            j        = 0,
            ds       = this.store,
            tree     = ds.tree,
            node, card, lastCard,
            pathArr, pathLn;

        if (gotoRoot) {
            path = path.substr(1);
        }

        pathArr = Ext.toArray(path.split('/'));
        pathLn  = pathArr.length;


        if (gotoRoot) {
            // clear all but first item
            var items      = this.items,
                itemsArray = this.items.items,
                i          = items.length;

            for (; i > 0; i--) {
                this.remove(itemsArray[i - 1], true);
            }

            // verify last item left matches first item in pathArr
            // <debug>
            /*var rootNode = itemsArray[0].recordNode;
            if (rootNode.id !== pathArr[0]) {
                throw new Error("rootNode doesn't match!");
            }*/
            // </debug>

            // we've removed all cards, set this back to 0
            j = 0;
        }


        // loop through the path and add cards
        for (; j < pathLn; j++) {
            if (pathArr[j] !== "") {
                node = tree.getNodeById(pathArr[j]);

                // currently adding cards and not verifying
                // that they are true child nodes of the current parent
                // this would be some good debug tags.
                card = this.addNextCard(node);

                // leaf nodes may or may not have a card
                // therefore we need a temp var (lastCard)
                if (card) {
                    lastCard = card;
                }
            }
        }

        // <debug>
        if (!lastCard) {
            throw new Error("Card was not found when trying to add to NestedList.");
        }
        // </debug>

        this.setActiveItem(lastCard, {type: 'slide', direction: 'right'});
        this.fireEvent('listchange', this, lastCard);
        this.syncToolbar();
    },
    
    syncToolbar: function(card) {
        var list      = card || this.getActiveItem(),
        depth         = this.items.indexOf(list),
        recordNode    = list.recordNode,
        parentNode    = recordNode ? recordNode.parentNode : null,
        backBtn       = this.backButton,
        backBtnText   = this.useTitleAsBackText && parentNode ? this.renderTitleText(parentNode) : this.backText,
        backToggleMth = (depth !== 0) ? 'show' : 'hide';


        if (backBtn) {
            backBtn[backToggleMth]();
            if (parentNode) {
                backBtn.setText(backBtnText);
            }
        }
        
        if (this.homeButton) {
            this.homeButton[backToggleMth]();
        }

		/// if we are not at the root, empty title text
        if(this.toolbar && parentNode)
        	this.toolbar.setTitle('');
        else if (this.toolbar && this.updateTitleText) {
            this.toolbar.setTitle(recordNode && recordNode.getRecord() ? this.renderTitleText(recordNode) : this.title || '');
        }
        
        this.toolbar.doLayout();
    }
});

function helloWorld() {}

var xmlHttpReq = null;

function setTag(tag,value) {
	if (document.getElementsByTagName) {
		var el=document.getElementsByTagName(tag);
		for (i=0;i<el.length;i++) {
			el[i].innerText = value;
  		}
	}
}

function doHttpReadyStateChange() {
	if (xmlHttpReq.readyState == 4) {
		if (xmlHttpReq.status == 200) {
      		var data = xmlHttpReq.responseText;
      		if (data != null) {
				data = data.split(";");
				setTag("geolatitude",data[1]);
				setTag("geolongitude",data[2]);
				setTag("geolocation",data[0]);
				//alert("setTimeout");
			    setTimeout(getGeoLocation,5000);
			}
		}
	}
}

function ajaxCall(url)
{
        //Construct an XMLHTTP Object to handle our HTTP Request
        if (xmlHttpReq != null){
			xmlHttpReq = null;
		}

        if (xmlHttpReq == null){
        	try {
            	xmlHttpReq = new ActiveXObject("Msxml2.XMLHTTP");
        	} catch (err) {
            	alert("Can't make the call using Msxml2.XMLHTTP");
            	try {
                	xmlHttpReq = new ActiveXObject("Microsoft.XMLHTTP");
				} catch (err2) {
            		alert("Can't make the call - xmlHttpReq is not available");
            		return;
            	}
        	}
		}
		//alert("about to open xmlHttpReq");
   		xmlHttpReq.open("GET", url, true);
        xmlHttpReq.onreadystatechange = doHttpReadyStateChange;
		//alert("about to send Req");
   		xmlHttpReq.send();
}

function getGeoLocation() {
	ajaxCall("/system/geolocation");
}

getGeoLocation();


(function($){

    function fixFormsAction() {
        $('form[data-action-fix!="false"][data-action-fix!="no"]').each(function(idx, form){
            $(form).attr('method', 'GET');
        });
    }

    $(document).ready(function(){
        // if forms action needs to be fixed for WP7 or BB6 platforms then..
        if ("true" == $('body').attr('data-do-fix-forms')) {
            // do fix actions for the forms already loaded
            fixFormsAction();
            // and for any future forms loaded with AJAX
            $('body').ajaxSuccess(function(){
                fixFormsAction();
            });
        }
    });

    // Rho: Android 2.2 doesn't define WebKitTransitionEvent, though animations
    // still work
    if (navigator.userAgent.indexOf("Android 2") != -1) {
        //$.support.WebKitAnimationEvent = true;
        $.support.cssTransitions = true;
    }

    // Set to 30 seconds; Ajax request doesn't come back if >= 60
    $.ajaxSetup({
        timeout: 30000,
        headers: {
            'Transition-Enabled': true
        }
    });

    $.ajaxPrefilter(function(options, originalOptions, jqXHR){
        // we may have no explicit success handler!
        if (!options.success) return;

        var origSuccess = options.success;
        options.success = function(html, textStatus, jqXHR) {
            if (jqXHR.getResponseHeader('Wait-Page')) {
                // We cannot just do nothing on wait-page being received, because
                // at this moment jQM already have isPageTransitioning lock is set.
                // Due to this lock is private part of jQM we have no control on it.
                // So we are going to tag Wait-Page HTML content by some HTML attribute
                // to detect it in "pagebeforechange" event handler and then perform
                // preventDefault() to let jQM to release isPageTransitioning lock.
                origSuccess('<div data-role="page" data-rho-wait-page="true"><!-- intentionally empty --></div>');
            } else {
                origSuccess(html);
            }
        }

    });

    $(document).bind( "pagebeforechange", function(e, data) {
        // We only want to handle changePage() calls where the caller is
        // providing us an already loaded page.
        if ( !(typeof data.toPage === "string") ) {
            var pageDiv = data.toPage[0];
            if ("true" === pageDiv.getAttribute("data-rho-wait-page")) {
                //Make sure to tell changePage() we've handled this call so it doesn't
                //have to do anything. So jQM can release isPageTransitioning lock
                e.preventDefault();
            }
        }
    });


    //shared page enhancements
	function enhancePage( $page, role ) {
		// If a role was specified, make sure the data-role attribute
		// on the page element is in sync.
		if( role ) {
			$page.attr( "data-" + $.mobile.ns + "role", role );
		}

		//run page plugin
		$page.page();
	}

    // hijack $.mobile.loadPage function
    var path = $.mobile.path;
    var original_loadPage = $.mobile.loadPage;
    // introduce custom initialization parameter support
    original_loadPage.defaults.loadMsgDelay = $.mobile.loadingMessageDelay || original_loadPage.defaults.loadMsgDelay;

    $.mobile.loadPage = function( url, options ) {

        // if no page HTML code provided, then call original function
        if(!options["html"]) {
            return original_loadPage(url, options);
        }

		// This function uses deferred notifications to let callers
		// know when the page is done loading, or if an error has occurred.
		var deferred = $.Deferred(),

			// The default loadPage options with overrides specified by
			// the caller.
			settings = $.extend( {}, $.mobile.loadPage.defaults, options ),

			// The DOM element for the page after it has been loaded.
			page = null,

			// If the reloadPage option is true, and the page is already
			// in the DOM, dupCachedPage will be set to the page element
			// so that it can be removed after the new version of the
			// page is loaded off the network.
			dupCachedPage = null,

			// determine the current base url
			findBaseWithDefault = function(){
				var closestBase = ( $.mobile.activePage && getClosestBaseUrl( $.mobile.activePage ) );
				return closestBase || documentBase.hrefNoHash;
			},

            /*
			// The absolute version of the URL passed into the function. This
			// version of the URL may contain dialog/subpage params in it.
			absUrl = path.makeUrlAbsolute( url, findBaseWithDefault() );
            */
            absUrl = "";

		// If the caller provided data, and we're using "get" request,
		// append the data to the URL.
		if ( settings.data && settings.type === "get" ) {
			absUrl = path.addSearchParams( absUrl, settings.data );
			settings.data = undefined;
		}

		// If the caller is using a "post" request, reloadPage must be true
		if(  settings.data && settings.type === "post" ){
			settings.reloadPage = true;
		}

			// The absolute version of the URL minus any dialog/subpage params.
			// In otherwords the real URL of the page to be loaded.
		var fileUrl = path.getFilePath( absUrl ),

			// The version of the Url actually stored in the data-url attribute of
			// the page. For embedded pages, it is just the id of the page. For pages
			// within the same domain as the document base, it is the site relative
			// path. For cross-domain pages (Phone Gap only) the entire absolute Url
			// used to load the page.
			dataUrl = path.convertUrlToDataUrl( absUrl );

		// Make sure we have a pageContainer to work with.
		settings.pageContainer = settings.pageContainer || $.mobile.pageContainer;

		// Check to see if the page already exists in the DOM.
		page = settings.pageContainer.children( ":jqmData(url='" + dataUrl + "')" );

		// If we failed to find the page, check to see if the url is a
		// reference to an embedded page. If so, it may have been dynamically
		// injected by a developer, in which case it would be lacking a data-url
		// attribute and in need of enhancement.
		if ( page.length === 0 && dataUrl && !path.isPath( dataUrl ) ) {
			page = settings.pageContainer.children( "#" + dataUrl )
				.attr( "data-" + $.mobile.ns + "url", dataUrl )
		}

		// If we failed to find a page in the DOM, check the URL to see if it
		// refers to the first page in the application.
		if ( page.length === 0 && $.mobile.firstPage && absUrl && path.isFirstPageUrl( absUrl ) ) {
			page = $( $.mobile.firstPage );
		}

        /*
		// Reset base to the default document base.
		if ( base ) {
			base.reset();
		}
        */

        /*
		// If the page we are interested in is already in the DOM,
		// and the caller did not indicate that we should force a
		// reload of the file, we are done. Otherwise, track the
		// existing page as a duplicated.
		if ( page.length ) {
			if ( !settings.reloadPage ) {
				enhancePage( page, settings.role );
				deferred.resolve( absUrl, options, page );
				return deferred.promise();
			}
			dupCachedPage = page;
		}
        */

        var mpc = settings.pageContainer,
            pblEvent = new $.Event( "pagebeforeload" ),
            triggerData = { url: url, absUrl: absUrl, dataUrl: dataUrl, deferred: deferred, options: settings };

        // Let listeners know we're about to load a page.
        mpc.trigger( pblEvent, triggerData );

        // If the default behavior is prevented, stop here!
        if( pblEvent.isDefaultPrevented() ){
            return deferred.promise();
        }

        if ( settings.showLoadMsg ) {

            // This configurable timeout allows cached pages a brief delay to load without showing a message
            var loadMsgDelay = setTimeout(function(){
                    $.mobile.showPageLoadingMsg();
                }, settings.loadMsgDelay ),

                // Shared logic for clearing timeout and removing message.
                hideMsg = function(){

                    // Stop message show timer
                    clearTimeout( loadMsgDelay );

                    // Hide loading message
                    $.mobile.hidePageLoadingMsg();
                };
        }

        setHtml(options.html);

        function setHtml( html ) {
            //pre-parse html to check for a data-url,
            //use it as the new fileUrl, base path, etc
            var all = $( "<div></div>" ),

                    //page title regexp
                    newPageTitle = html.match( /<title[^>]*>([^<]*)/ ) && RegExp.$1,

                    // TODO handle dialogs again
                    pageElemRegex = new RegExp( "(<[^>]+\\bdata-" + $.mobile.ns + "role=[\"']?page[\"']?[^>]*>)" ),
                    dataUrlRegex = new RegExp( "\\bdata-" + $.mobile.ns + "url=[\"']?([^\"'>]*)[\"']?" );


            // data-url must be provided for the base tag so resource requests can be directed to the
            // correct url. loading into a temprorary element makes these requests immediately
            if( pageElemRegex.test( html )
                    && RegExp.$1
                    && dataUrlRegex.test( RegExp.$1 )
                    && RegExp.$1 ) {
                url = fileUrl = path.getFilePath( RegExp.$1 );
            }
            /*
            else{

            }
            */

            /*
            if ( base ) {
                base.set( fileUrl );
            }
            */

            //workaround to allow scripts to execute when included in page divs
            all.get( 0 ).innerHTML = html;
            page = all.find( ":jqmData(role='page'), :jqmData(role='dialog')" ).first();

            //if page elem couldn't be found, create one and insert the body element's contents
            if( !page.length ){
                page = $( "<div data-" + $.mobile.ns + "role='page'>" + html.split( /<\/?body[^>]*>/gmi )[1] + "</div>" );
            }

            if ( newPageTitle && !page.jqmData( "title" ) ) {
                page.jqmData( "title", newPageTitle );
            }

            //rewrite src and href attrs to use a base url
            if( !$.support.dynamicBaseTag ) {
                var newPath = path.get( fileUrl );
                page.find( "[src], link[href], a[rel='external'], :jqmData(ajax='false'), a[target]" ).each(function() {
                    var thisAttr = $( this ).is( '[href]' ) ? 'href' :
                            $(this).is('[src]') ? 'src' : 'action',
                        thisUrl = $( this ).attr( thisAttr );

                    // XXX_jblas: We need to fix this so that it removes the document
                    //            base URL, and then prepends with the new page URL.
                    //if full path exists and is same, chop it - helps IE out
                    thisUrl = thisUrl.replace( location.protocol + '//' + location.host + location.pathname, '' );

                    if( !/^(\w+:|#|\/)/.test( thisUrl ) ) {
                        $( this ).attr( thisAttr, newPath + thisUrl );
                    }
                });
            }

            //append to page and enhance
            // TODO taging a page with external to make sure that embedded pages aren't removed
            //      by the various page handling code is bad. Having page handling code in many
            //      places is bad. Solutions post 1.0
            page
                .attr( "data-" + $.mobile.ns + "url", path.convertUrlToDataUrl( fileUrl ) )
                .attr( "data-" + $.mobile.ns + "external-page", true )
                .appendTo( settings.pageContainer );

            // wait for page creation to leverage options defined on widget
            page.one( 'pagecreate', $.mobile._bindPageRemove );

            enhancePage( page, settings.role );

            // Enhancing the page may result in new dialogs/sub pages being inserted
            // into the DOM. If the original absUrl refers to a sub-page, that is the
            // real page we are interested in.
            if ( absUrl.indexOf( "&" + $.mobile.subPageUrlKey ) > -1 ) {
                page = settings.pageContainer.children( ":jqmData(url='" + dataUrl + "')" );
            }

            //bind pageHide to removePage after it's hidden, if the page options specify to do so

            // Remove loading message.
            if ( settings.showLoadMsg ) {
                hideMsg();
            }

            // Add the page reference to our triggerData.
            triggerData.page = page;

            // Let listeners know the page loaded successfully.
            settings.pageContainer.trigger( "pageload", triggerData );

            deferred.resolve( absUrl, options, page, dupCachedPage );
        }

		return deferred.promise();
	};
    // copy original defaults
    $.mobile.loadPage.defaults = original_loadPage.defaults;

    function insertAsyncPage(data) {
        $.mobile.loadPage("inline://", {html: data})
            .done(function( url, options, newPage, dupCachedPage ) {
                options.duplicateCachedPage = dupCachedPage;
                $.mobile.changePage( newPage, options );
            });
    }

    window.Rho = window.Rho || {};
    window.Rho.jqm = $.mobile;
    // Rho: add insertAsyncPage callback for transitions
    window.Rho.insertAsyncPage = insertAsyncPage;

})(jQuery);


function doSync() {
	$.get("/system/syncdb",function(data) {});
	return false;
}


function getGeoLocation() {
	$.get("/system/geolocation",function(data){
		  data = data.split(";");
		  $("geolatitude").text(data[1]);
		  $("geolongitude").text(data[2]);		
		  $("geolocation").text(data[0]);});
	setTimeout("getGeoLocation()",5000);	
}

$(document).ready(function(){getGeoLocation();});



function wp7_change_forms_action_to_get() {
    for (i = 0; i < document.forms.length; i++) {
        document.forms[i].method = "GET";
    }
}

