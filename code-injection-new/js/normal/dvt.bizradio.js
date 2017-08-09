
















	    
	    Ext.Loader.setConfig({ disableCaching: false });
	    Ext.Ajax.setDisableCaching(false); 

    // Wait for Cordova to load
    //
    document.addEventListener("deviceready", onDeviceReady, false);

    // Cordova is ready
    //
    function onDeviceReady() {
        //if(isIOS()){
        //    ChildBrowser.install();
        //}
        //getContacts();
    }
    
	function goBack()
	{
		window.history.back()
	}
	
    

﻿var currentStatus = null;

/*Ext.Loader.setConfig({ disableCaching: false });
Ext.Ajax.setDisableCaching(false);*/
Ext.application({
    name: "BizRadio",
    models: ["User", "Podcast", "Favourite"],
    stores: ["Users", "Podcasts", "Favourites"],
    controllers: ["PodcastsController"],

    views: ["PodcastsView", "FavouritesView", "LogoToolbar", "AboutView"],
            
    profiles: ['Phone', 'Tablet'],

    launch: function () {

	var podcastsView = {
		xtype: "podcastsView"
    };
	
	var favouritesView = {
		xtype: "favouritesView"
    };
	
	var aboutView = {
        xtype: "aboutView"
	};
	
	this.redirectTo('home');
	
	Ext.Viewport.add([podcastsView, favouritesView, aboutView]);

    }
});

﻿Ext.define("BizRadio.store.Podcasts", {
    extend: "Ext.data.Store",
    requires: "Ext.data.proxy.LocalStorage",
    config: {
        model: "BizRadio.model.Podcast",
        proxy: {
            type: 'localstorage',
            id: 'podcast-app-store'
        },
    }
});


﻿Ext.define("BizRadio.store.Users", {
    extend: "Ext.data.Store",
    requires: "Ext.data.proxy.LocalStorage",
    config: {
        model: "BizRadio.model.User",
        proxy: {
            type: 'localstorage',
            id: 'user-app-store'
        },
        sorters: [{ property: 'name', direction: 'DESC'}]
    }
});


Ext.define("BizRadio.store.Favourites", {
    extend: "Ext.data.Store",
    requires: "Ext.data.proxy.LocalStorage",
    config: {
        model: "BizRadio.model.Favourite",
        proxy: {
            type: 'localstorage',
            id: 'favourites-store'
        },
    }
});

Ext.define("BizRadio.model.Favourite", {
    extend: "Ext.data.Model",
    config: {
        fields: [{
            name: 'title',
            type: 'string'
        },
        {
            name: 'link',
            type: 'string'
        },
        {
            name: 'description',
            type: 'string'
        },
        {
            name: 'pubDate',
            type: 'string'
        },
        {
            name: 'url',
            type: 'string'
        },
        {
            name: 'fileName',
            type: 'string'
        }],
    }
});

﻿Ext.define("BizRadio.model.User", {
    extend: "Ext.data.Model",
    config: {
        fields: [
            {
                name: 'name',
                type: 'string'
            },
            {
                name: 'surname',
                type: 'string'
            }
        ],
    }
});

﻿Ext.define("BizRadio.model.Podcast", {
    extend: "Ext.data.Model",
    config: {
        fields: [
            {
                name: 'title',
                type: 'string'
            },
            {
                name: 'link',
                type: 'string'
            },
            {
                name: 'description',
                type: 'string'
            },
            {
                name: 'pubDate',
                type: 'string'
            },
            {
                name: 'url',
                type: 'string'
            },
            {
                name: 'fileName',
                type: 'string'
            }
        ],
    }
});

Ext.define('BizRadio.profile.Tablet', {
    extend: 'Ext.app.Profile',

    config: {
    	name: 'Tablet',
    	controllers: ['BizRadio.controller.tablet.Main'],
        views: ['LandingPage']
    },

    isActive: function() {
//        return Ext.os.is.Tablet;
        return Ext.os.is.Tablet || Ext.os.is.Desktop;
    },

    launch: function() {
    	console.log('launching Tablet profile');
    	
    	this.loadLandingPage();

        this.callParent();
    },
    
    loadLandingPage: function() {
    	var landingPage = null;
    	
    	landingPage = Ext.create('BizRadio.view.tablet.LandingPage');
        
    	if (landingPage) {
        	Ext.Viewport.add(landingPage);
        }
    }
});

Ext.define('BizRadio.profile.Phone', {
    extend: 'Ext.app.Profile',

    config: {
        name: 'Phone',
        controllers: ['Main'],
        views: ['LandingPage']
    },

    isActive: function() {
        return Ext.os.is.Phone;
//        return Ext.os.is.Phone || Ext.os.is.Desktop;
    },

/*    isActive: function() {
        return Ext.os.is.Phone; // || Ext.os.is.Desktop;
    },*/

    launch: function() {
    	console.log('launching Phone profile');
    	
    	this.loadLandingPage();
        
        this.callParent();
    },
    
    loadLandingPage: function() {
    	var landingPage = null;
    	
    	landingPage = Ext.create('BizRadio.view.phone.LandingPage');
        if (landingPage) {
        	Ext.Viewport.add(landingPage);
        }
    }
});

﻿var timeoutLimit = 30;
var currentHistoryPath = '';

Ext.define("BizRadio.controller.Main", {

    extend: "Ext.app.Controller",
    
    config: {
    	routes: {
			'': 'activateLandingPage',
            'home': 'activateLandingPage',
            'home/podcasts': 'activatePodcastsView',
            'home/favourites' : 'activateFavouritesView',
            'home/about': 'activateAboutView'
        },
    	
        refs: {
            // We're going to lookup our views by xtype.
            landingPage: "landingpage",
            podcastsView: "podcastsView",
            favouritesView: "favouritesView",
            aboutView: "aboutView"
        },
        control: {
        	landingPage: {
        		// The commands fired by the notes list container.
    	    	viewPodcastsView: "onViewPodcastsView",
    	    	viewFavouritesView: "onViewFavouritesView",
    	    	viewAboutPage: "onViewAboutPage",
    	    	playButtonTap: "onPlayButtonTap",
    	    	pauseButtonTap: "onPauseButtonTap",
    	    	stopButtonTap: "onStopButtonTap"
            },
            podcastsView : {
                playPodcast: "onPlayPodcast"
            },
            favouritesView : {
                playFavourite: "onPlayFavourite"
            }
        }
    },
    // Transitions
    slideLeftTransition: { type: 'slide', direction: 'left' },
    slideRightTransition: { type: 'slide', direction: 'right' },

    goHome: function() {
    	this.redirectTo('home');
    },
    
    clearOverlayforms: function() {
    	this.closeAllFloatingPanels();
    },
    
    activateLandingPage: function () {
    	console.log("activateLandingPage");
    	var homePage = this.getLandingPage();
    	if (homePage) {
    		
    		Ext.Viewport.animateActiveItem(homePage, this.slideRightTransition);	
    	} else {
    		this.activateRegistration();
    	}
    },
    
    activatePodcastsView: function () {
        console.log("activatePodcastsView");
        
    	var podcastsView = this.getPodcastsView();
        if (podcastsView) {
        
            var favouriteStore = Ext.getStore("Favourites");
            favouriteStore.load();
	            this.getApplication().getController('PodcastsController').getRSSFeed();
	        	this.showView(podcastsView);
        }
    },
    
    activateFavouritesView: function () {
    	var favouritesView = this.getFavouritesView();
    	if (favouritesView) {
    	    var favouritesStore = Ext.getStore("Favourites");
    	    favouritesStore.load();
    		this.showView(favouritesView);
    	}
    },
    
    activateAboutView: function () {
        console.log("activateAboutPage");
        
        var aboutView = this.getAboutView();
        if (aboutView) {
            this.showView(aboutView);
        }
    },
    
    onViewPodcastsView: function () {
        console.log('onViewPodcastsView');
        
        this.redirectTo('home/podcasts');  
    },

    onViewFavouritesView : function() {
        console.log('onViewFavouritesView');

        this.redirectTo('home/favourites');
    },
    
    onViewAboutPage: function () {
        console.log('onViewAboutPage');
        
        this.redirectTo('home/about');  
    },
    
    onPlayPodcast: function () {
        console.log("onPlayPodcast");
        var landingPage = this.getLandingPage();
        if (landingPage) {
            playSound(landingPage);
        }
        this.goHome();
    },
    
    onPlayFavourite: function() {
        console.log("onPlayFavourite");
        var landingPage = this.getLandingPage();
        if (landingPage) {
            playSound(landingPage);
        }
        this.goHome();
    },
    
    onPlayButtonTap : function () {
        console.log("onPlayButtonTap");
        var landingPage = this.getLandingPage();
        if (landingPage) {
            playSound(landingPage);
        }
    },
    
    onPauseButtonTap : function () {
        pauseSound();
    },
    
    onStopButtonTap : function () {
        stopSound();
    },
    
    onGoHomeCommand: function () {
        
        this.getApplication().getHistory().add(Ext.create('Ext.app.Action', {
            url: 'home'
        }));
    },
    
    updateLastAction: function() {
    	/*var userStore = Ext.getStore("User");
    	userStore.load();
    	if (userStore) {
        	var firstUser = userStore.first();
            if (firstUser) {
            	
            	if (this.isUserSessionValid()) {
            		
            		firstUser.data.lastAction = new Date();
            		console.log('User session valid lastAction updated');
            	} else {
            		
            		firstUser.data.status = false;
            		console.log('User session timed out status set to false');
            	}
            	
            	userStore.sync();
            }
        }*/
    },

    clearOverlayforms: function() {
    	this.closeAllFloatingPanels();
    },

    closeAllFloatingPanels: function() {
    	Ext.each(Ext.query('.x-floating'), function(el,idx) {
            var cmp = Ext.getCmp(el.id);
            if(!cmp.isHidden()) {
                cmp.hide();
//                done = true;
            }
        });
    },
    
    clearTextFields: function(view) {
    	
    	var numberAndTextFields = view.query('textfield, numberfield');
//    	var viewComponents = Ext.ComponentQuery.query('view[xtype=textfield]');
    	
    	var i = 0, l = numberAndTextFields.length;
        for (; i < l; i++) {
        	console.log('COMPONENT: ' + i);
        	var type = numberAndTextFields[i].getXTypes();
        	console.log(numberAndTextFields[i].getXTypes());
        	
        	if (type == 'component/field/textfield') {
        		numberAndTextFields[i].setValue('');
        	} else if (type == 'component/field/textfield/numberfield') {
        		numberAndTextFields[i].setValue(0);
        	}
        }
    },
    
    clearPhotos: function() {
    	var cameraStore = Ext.getStore("CameraShots");
		if (cameraStore) {
			cameraStore.removeAll();
			cameraStore.sync();
//			cameraStore.load();
		}
    },

    // Base Class functions.
    launch: function () {
        this.callParent(arguments);
    },
    
    init: function () {
        this.callParent(arguments);
    }
});

Ext.define("BizRadio.controller.PodcastsController", {

    extend: "Ext.app.Controller",
    
    config: {
    	routes: {
//            'home': 'activateLandingPage',
//            'home/podcastsView': 'activatePodcastsView'
        },
    	
        refs: {
            // We're going to lookup our views by xtype.
//            landingPage: "landingpage",
            podcastsView: "podcastsView",
            favouritesView: "favouritesView"
        },
        control: {
        	podcastsView: {
        		// The commands fired by the notes list container.
    	    	addPodcastToFavoritesCommand: "addPodcastToFavorites",
    	    	addPodcastInfoToHistory: "addPodcastInfoToHistory",
            },
            favouritesView: {
        		// The commands fired by the notes list container.
            	addfavouritesInfoToHistory: "addfavouritesInfoToHistory",
            },
        }
    },
    // Transitions
    slideLeftTransition: { type: 'slide', direction: 'left' },
    slideRightTransition: { type: 'slide', direction: 'right' },

    goHome: function() {
    	this.redirectTo('home');
    },
    
    clearOverlayforms: function() {
    	this.closeAllFloatingPanels();
    },
    
    activateLandingPage: function () {
    	
    	var homePage = this.getLandingPage();
    	if (homePage) {
    		
    		Ext.Viewport.animateActiveItem(homePage, this.slideRightTransition);	
    	} else {
    		this.activateRegistration();
    	}
    },
    
//    onViewPodcastsView: function () {
//        console.log('onViewPodcastsView');
//        
//        this.redirectTo('home/podcastsView');  
//    },
    
    
    onGoHomeCommand: function () {
        
        this.getApplication().getHistory().add(Ext.create('Ext.app.Action', {
            url: 'home'
        }));
    },

    closeAllFloatingPanels: function() {
    	Ext.each(Ext.query('.x-floating'), function(el,idx) {
            var cmp = Ext.getCmp(el.id);
            if(!cmp.isHidden()) {
                cmp.hide();
//                done = true;
            }
        });
    },

    getRSSFeed: function() {

		Ext.Ajax.request({
			url: 'http://www.bizradio.co.za/feed/',
			method : "GET",
	      
			success: function(response) {
			    console.log("Worked");
			},
		
			failure: function(response) {
			    console.log("RSS Feed failed horribly pieces all over the place");
			},
	  
			callback : function(options, success, response) {
	
		            if (success) {
		            	
		            	if (response.responseText.length > 1) {
//		            		console.log(response.responseText);

		          		var podcastStore = Ext.getStore("Podcasts");
		                	if (podcastStore) {
		                		podcastStore.removeAll();	
		                		podcastStore.sync();
		                	} else {
		                		console.log('podcastStore failed to load');
		                	}             
		                	              	
		              	  $(response.responseXML).find('item').each(function() {
		                      var title = $(this).find('title').text();
//			            		console.log('Title: ' + title);
		                      var link = $(this).find('link').text();
//			            		console.log('Link: ' + link);
		                      var description = $(this).find('description').text();
//			            		console.log('description: ' + description);
		                      var pubDate = $(this).find('pubDate').text();
//			            		console.log('pubDate: ' + pubDate);
			            	  var url = $(this).find('enclosure').attr('url');
//			            		console.log('url: ' + url);
		                                        
		            		  
		            		  if(url != null) {

			            		  var titleIndex = url.lastIndexOf('/') + 1;
			            		  var podcastTitle = url.slice(titleIndex);
			            		  
			                      var instance = Ext.create('BizRadio.model.Podcast', {
				                  	title: title,
			                  		link: link,
			                  		description: description,
			                  		pubDate: pubDate,
			                  		url: url,
			                  		fileName: podcastTitle,
			                      });
			                        podcastStore.add(instance);
		            		  }
		                  });
		              	  podcastStore.sync();
		                  
		                } else {
//		                   navigator.notification.alert("We are unable to communicate with our service provider, please try again later.");
		                }
		            }
			}
		});
    },
    
    addPodcastToFavorites: function(title, url, fileName) {

    	var favouritesStore = Ext.getStore("Favourites");
    	var size = favouritesStore.getCount();
    	if(size > 19) {
//    		navigator.notification.alert('Your Favourites list is full. Please remove some items before adding more to Favourites.', alertDismissed, 'Please note');
    	} else {
    		
    		var instance = Ext.create('BizRadio.model.Favourite', {
              	title: title,
//          		link: link,
//          		description: description,
//          		pubDate: pubDate,
          		url: url,
          		fileName: fileName,
              });
		 	
		 	if(favouritesStore.findExact('title', title, 0) == -1) {

		 		favouritesStore.add(instance);
//		 		navigator.notification.alert(fileName + ' added to Favourites', alertDismissed, 'Please note');
		 	} else {
//		 		navigator.notification.alert(fileName + ' already added to Favourites', alertDismissed, 'Please note');
		 	}
		 	
	 		favouritesStore.sync();

    	}
 		
 		
    }, 
    
    clearPhotos: function() {
    	var cameraStore = Ext.getStore("CameraShots");
		if (cameraStore) {
			cameraStore.removeAll();
			cameraStore.sync();
//			cameraStore.load();
		}
    },
    
    addPodcastInfoToHistory: function() {
    	// console.log("showRetirementInfo adding history stack stuff");
    	
    	this.getApplication().getHistory().add(Ext.create('Ext.app.Action', {
            url: 'home/podcastsView/info'
        }));   	
    },
    
    addfavouritesInfoToHistory: function() {
    	// console.log("showRetirementInfo adding history stack stuff");
    	
    	this.getApplication().getHistory().add(Ext.create('Ext.app.Action', {
            url: 'home/favouritesView/info'
        }));   	
    },

    // Base Class functions.
    launch: function () {
        this.callParent(arguments);
    },
    
    init: function () {
        this.callParent(arguments);
    }
});

Ext.define('BizRadio.controller.tablet.Main', {
    extend: 'BizRadio.controller.Main',

    showView: function(view) {
    	
    	this.closeAllFloatingPanels();
    	this.clearTextFields(view);
    	
    	if (!isIOS()) {
//    		view.query
    		var logoTB = view.query("#logoTB");
    		if (logoTB) {
    			logoTB = logoTB[0];
    			logoTB.setHidden(true);
    		}
    	} 
    	
    	Ext.Viewport.animateActiveItem(view, this.slideLeftTransition);
    	
    	/*var mainList = Ext.getCmp("mainList");
    	if (mainList) {
    		
    		mainList.getDetailContainer().add(view);
    		mainList.setDetailCard(view);
    		mainList.getDetailContainer().setActiveItem(view);	
    		view.setHidden(false);
    	}
    	
    	var logoTB = view.getComponent('logoTB');
    	if (logoTB) {
    		var backBtn = logoTB.getComponent('backBtn');
    		if (backBtn)
    			backBtn.setHidden(true);
    		var locationLbl = logoTB.getComponent('locationLbl');
    		if (locationLbl)
    			locationLbl.setHidden(false);
    	}
    	
    	var locationTB = view.getComponent('locationTB');
    	if (locationTB) {
    		locationTB.setHidden(true);
    	}*/
    	//landingPage.setMasked(false);
    },
    
 // Base Class functions.
    launch: function () {
        this.callParent(arguments);
    },
    init: function () {
        this.callParent(arguments);
    }

//    showMenuById: Ext.emptyFn
});

Ext.define('BizRadio.controller.phone.Main', {
    extend: 'BizRadio.controller.Main',

    showView: function(view) {

    	this.closeAllFloatingPanels();
    	this.clearTextFields(view);
    	/*if (this.isUserSessionValid()) {
    		this.showUserInfo(view, this.getUserDisplayName(), this.getUserType());
    	}*/
    	if (!isIOS()) {
//    		view.query
    		var logoTB = view.query("#logoTB");
    		if (logoTB) {
    			logoTB = logoTB[0];
    			logoTB.setHidden(true);
    		}
    	}    		
    		//logoTB
        
    	Ext.Viewport.animateActiveItem(view, this.slideLeftTransition);
    },
    
    hideOverlay: function() {
    	
    },

    /*showView: function(item) {
        var nav    = this.getNav(),
            title  = item.get('text'),
            view   = this.createView(this.getViewName(item)),
            layout = nav.getLayout(),
            anim   = item.get('animation'),
            initialAnim = layout.getAnimation(),
            newAnim;

        if (anim) {
            layout.setAnimation(anim);
            newAnim = layout.getAnimation();
        }

        nav.setDetailCard(view);
        nav.goToNode(item.parentNode);
        nav.goToLeaf(item);

        if (newAnim) {
            newAnim.on('animationend', function() {
                layout.setAnimation(initialAnim);
            }, this, { single: true });
        }

        this.getToolbar().setTitle(title);
        this.getSourceButton().setHidden(false);
    },*/
    
 // Base Class functions.
    launch: function () {
        this.callParent(arguments);
    },
    init: function () {
        this.callParent(arguments);
    }
});

var podcastSelectedItem = '';
var url;
var fileName;
var title;
var podcastsView; 

Ext.define('BizRadio.view.PodcastsView', {
    extend : 'Ext.Container',
    xtype : 'podcastsView',

    initialize : function() {
        this.callParent(arguments);

        var logoTB = {
                xtype: "logotoolbar",
                itemId: "logoTB"
        };
        
        var mainPanel = {
                xtype : 'panel',
                docked: 'top',
                height: '40px',
                padding: 10,
                layout : {
                    type: 'vbox'
                },
                items : [
                    {
                    xtype : 'panel',
                    layout : {
                        type : 'vbox',
                        pack : 'center',
                        align: 'center', 
                    },
//                    padding: 10,
                    style: 'background-color: #fff; border-radius: 10px; font-size: 0.8em',
                    items: [
                        {
                        xtype: 'label',
                        html: 'Tap an item to listen to a podcast: ',
//                        padding: 10,
                        style: 'font-size: 0.8em'
                        }
                    ]
                }]
            };
        
        var locationToolbar = {
            layout : {
                type : 'hbox',
                align: 'center', 
                pack: 'start'

            },
            docked : "top",
            height: '35px',
            style: 'background-color: #0392ce; color: #ffffff; font-size: 0.8em; padding-left: 10px',
            items: [
                {
                    xtype : 'label',
                    html: 'Podcasts'
                }
            ]
        };
               
        var podcastList = {
                xtype: 'list',
                flex: 1,
                ui: 'round',
                itemId: 'podcastList',
                hidden: false,
//                pinHeaders: false,
                id: 'podcastList',
                listeners: {
                    itemsingletap: { fn: this.onItemSingleTap, scope: this },
                },
//                store: {
//                    fields: ['title', 'url', 'filename'],
//                    data: [
//                        {title: 'retirementmatters',
//                            name: 'dummy', 
//                            url: "dummy", 
//                            filename: "dummy",}, 
//                    ]
//                },
                store: this.getStore(),
                itemTpl: '<span style="font-size:0.8em">{title}</span>',
//				store: {
//                    fields: ['event', 'title'],
//                    data: [
//	                    {
//	                    	event: 'Hello',
//	                    	title: 'World'
//	                    },]
//                },
                grouped: false,
                emptyText: '<div style="margin-top: 20px; text-align: center">No matching items</div>',
                disableSelection: true
        };
        
        var actionSheet = Ext.create('Ext.ActionSheet', {
         	id: 'podcastsactionsheet',
             defaults: {
                 handler: function (btn, evt) {
                     actionSheet.hide();
                     goBack();
                 } // handler
             }, // defaults
             
             items: [
                 {
                	xtype: 'button',
 		            text: 'Play Podcast',
 		            id: 'open_doc',
 		            ui  : 'confirm',
 		            listeners: {
 		            	tap: { fn: this.onOpenPodcastTap, scope: this }
 		            }
 		        },
 		        {
 		            text: 'Add to Favourites',
 		            ui  : 'confirm',
	            	listeners: {
 		            	tap: { fn: this.addPodcastToFavoritesTap, scope: this }
 		            }
 		        },
 		        {
 		            text: 'Cancel',
 		            ui  : 'decline'
 		        }
             ]
         });
        
        this.add([logoTB, locationToolbar, mainPanel, podcastList]);
    },
    
    config : {
        layout : {
            type : 'vbox'
        }
    },
    
    getStore: function() {
        //console.log("GETTING THE STORE");
        
        var podcastStore = Ext.getStore("Podcasts");
        //return the store instance
        return podcastStore;
    },
    
    onItemSingleTap: function (datav, index, target, record, e, options) {
//    	console.log('URL: ' + record.data.url);
    	
//    	checkFileExistance(record.data.url, record.data.fileName);
        podcastSelectedItem = record;
        podcastsView = datav.getParent();
        this.showOptionsActionsheet();
    },
    
    showOptionsActionsheet: function () {
    	
    	this.fireEvent("addPodcastInfoToHistory");
		var podcastsactionsheet = Ext.ComponentManager.get('podcastsactionsheet');
		  
		if (!this.podcastsactionsheet) {
		    Ext.Viewport.add(podcastsactionsheet);
		}
		     
		podcastsactionsheet.show();
    },
    
    onOpenPodcastTap: function(actionBtn) {
    	
    	var actionsheet = Ext.ComponentManager.get('podcastsactionsheet');
    	actionsheet.hide();
    	
        url = podcastSelectedItem.data.url;
        fileName = podcastSelectedItem.data.fileName;
        title = podcastSelectedItem.data.title;
        
        if (isPlaying() || isPaused()) {
            navigator.notification.confirm('Would you like this to replace your current track?', onButtonPressed, 'Confirm', 'Yes, No');
        } else {
        	if(isIOS()) {
    			iosAudio = new Audio(); 
            	setCurrentSource(title);
    			iosAudio.src = url;  
				mediaStatus(2);
        	} else {
	            my_media = new Media(url, onMPSuccess, onMPError, mediaStatus); 
	            console.log("setting label source from onOpenPodcastTap notIOS() podcast view");
	            setCurrentSource(title);
        	}
        	
            podcastsView.fireEvent("playPodcast");
        }
        
//        var landingPage = this.getLandingPage();
//        if (landingPage) {
//            playSound(landingPage);
//    	checkFileExistance(url, fileName);
    	
    },
    
    addPodcastToFavoritesTap: function(actionBtn) {
    	actionBtn.getParent().hide();
    	    		
        var title = podcastSelectedItem.data.title;
        var url = podcastSelectedItem.data.url;
        var fileName = podcastSelectedItem.data.fileName;
        
        this.fireEvent("addPodcastToFavoritesCommand", title, url, fileName);
    },
    
});

function onButtonPressed(button) {
    if (button == 1) {
    	if(isIOS()) {
        	stopAudio();
			iosAudio = new Audio(); 
        	setCurrentSource(title);
			iosAudio.src = url;  
			mediaStatus(2);
    	} else {
	        stopAudio();
	        my_media = new Media(url, onMPSuccess, onMPError, mediaStatus);   
	        setCurrentSource(title);
	    }
    	
    	podcastsView.fireEvent("playPodcast");
    } 
}; 


Ext.define("BizRadio.view.LogoToolbar", {
    extend : "Ext.Toolbar",
    xtype : "logotoolbar",

    config : {
        layout : {
            type : 'hbox',
            align: 'center', 
            pack: 'center'

        },
        showBackBtn: false,
        docked : "top",
        height: '70px',
        style: 'background-color: #cfcfcf; color: #ffffff; border-bottom: 4px ridge #cccccc',
    },

    initialize : function() {

        this.callParent(arguments);

        var backButton = {
                xtype: "button",
                itemId: "backBtn",
                ui: "back",
                hidden: this.getShowBackBtn(),
                handler: this.onBackButtonTap,
                text: "Back",
                scope: this
            };

        this.add([
                  backButton,
                  {
                	  xtype : 'spacer', flex : 1
                  }, 
          ]);
    },
    
    updateShowBackBtn: function(showBtn) {
    	var backBtn = this.getComponent('backBtn');
        if (backBtn) {
        	backBtn.setHidden(showBtn);
        }
    },
    
    onBackButtonTap : function() {
		//console.log("goBackCommand");
    	goBack();
	}    
});


var favSelectedItem = null;
var favouritesUrl = null;
var favouritesFileName = null;
var favouritesTitle = null;
var favouritesView; 

Ext.define('BizRadio.view.FavouritesView', {
    extend : 'Ext.Container',
    xtype : 'favouritesView',

    initialize : function() {
        this.callParent(arguments);

        var logoTB = {
                xtype: "logotoolbar",
                itemId: "logoTB"
        };
        
        var mainPanel = {
                xtype : 'panel',
                docked: 'top',
                height: '40px',
                padding: 10,
                layout : {
                    type: 'vbox'
                },
                items : [
                    {
                    xtype : 'panel',
                    layout : {
                        type : 'vbox',
                        pack : 'center',
                        align: 'center', 
                    },
//                    padding: 10,
                    style: 'background-color: #fff; border-radius: 10px; font-size: 0.8em',
                    items: [
                        {
                        xtype: 'label',
                        html: 'Tap an item for options: ',
//                        padding: 10,
                        style: 'font-size: 0.8em'
                        }
                    ]
                }]
            };
        
        var favouritesActionSheet = Ext.create('Ext.ActionSheet', {
            id: 'favouritesactionsheet',
            defaults: {
                handler: function (btn, evt) {
                    favouritesActionSheet.hide();
                    goBack();
                } // handler
            }, // defaults
            
            items: [
                {
                    text: 'Play Podcast',
                    ui  : 'confirm',
                    listeners: {
                        tap: { fn: this.onOpenFavouriteTap, scope: this }
                    }
                },
                {

                    xtype: 'button',
                    text: 'Remove from Favourites',
                    ui  : 'confirm',
                    listeners: {
                        tap: { fn: this.onRemoveTap, scope: this }
                    }
                },
                {
                    text: 'Remove All',
                    ui  : 'confirm',listeners: 
                    {
                        tap: { fn: this.onRemoveAllTap, scope: this }
                    }
                },
                {
                    text: 'Cancel',
                    ui  : 'decline'
                }
            ] // items
        }); // create()
        
        var locationToolbar = {
            layout : {
                type : 'hbox',
                align: 'center', 
                pack: 'start'

            },
            docked : "top",
            height: '35px',
            style: 'background-color: #0392ce; color: #ffffff; font-size: 0.8em; padding-left: 10px',
            items: [
                {
                    xtype : 'label',
                    html: 'Favourites'
                }
            ]
        };
               
        var favouritesList = {
                xtype: 'list',
                flex: 1,
                ui: 'round',
                itemId: 'favouritesList',
                hidden: false,
//                pinHeaders: false,
                id: 'favouritesList',
                listeners: {
                    itemsingletap: { fn: this.onFavouritesItemSingleTap, scope: this },
                },
                store: this.getStore(),
//                store: {
//                    fields: ['title', 'url', 'filename'],
//                    data: [
//                        {title: 'retirementmatters',
//                            url: "dummy", 
//                            filename: "dummy",}, 
//                    ]
//                },
                itemTpl: '<span style="font-size:0.8em">{title}</span>',
//				store: {
//                    fields: ['event', 'title'],
//                    data: [
//	                    {
//	                    	event: 'Hello',
//	                    	title: 'World'
//	                    },]
//                },
                grouped: false,
                emptyText: '<div style="margin-top: 20px; text-align: center">No favourites to display</div>',
                disableSelection: true
        };
        
        this.add([logoTB, locationToolbar, mainPanel, favouritesList]);
    },
    
    config : {
        layout : {
            type : 'vbox'
        }
    },
    
    getStore: function() {
        //console.log("GETTING THE STORE");
        
        var favouriteStore = Ext.getStore("Favourites");
        //return the store instance
        return favouriteStore;
    },
    
    onFavouritesItemSingleTap: function (datav, index, target, record, e, options) {
    	console.log('URL: ' + record.data.url);
    	favSelectedItem = record;
    	favouritesView = datav.getParent();
        this.showFavouritesActionsheet(record);
    },
    
    showFavouritesActionsheet: function () {
    	this.fireEvent("addfavouritesInfoToHistory");
    	var favouritesactionsheet = Ext.ComponentManager.get('favouritesactionsheet');
        
        if (!this.favouritesactionsheet) {
            Ext.Viewport.add(favouritesactionsheet);
        }
        
        favouritesactionsheet.show();
    },
    
    onOpenFavouriteTap: function() {
    	
    	var actionsheet = Ext.ComponentManager.get('favouritesactionsheet');
    	actionsheet.hide();
    	
        favouritesUrl = favSelectedItem.data.url;
        favouritesFileName = favSelectedItem.data.fileName;
        favouritesTitle = favSelectedItem.data.title;
        
        if (isPlaying() || isPaused()) {
            navigator.notification.confirm('Would you like this to replace your current track?', onButtonPressedFavourites, 'Confirm', 'Yes, No');
        } else {
            if(isIOS()) {
                iosAudio = new Audio(); 
                setCurrentSource(favouritesTitle);
                iosAudio.src = favouritesUrl;  
                mediaStatus(2);
            } else {
                my_media = new Media(favouritesUrl, onMPSuccess, onMPError, mediaStatus); 
                console.log("setting label source from openFavouritesTap notIOS() favourites view");
                setCurrentSource(favouritesTitle);
            }
            favouritesView.fireEvent("playFavourite", this);
        }
        
        
    },
    
    onRemoveTap: function (datav, index, target, record, e, options) {
		
 		var favouritesStore = this.getStore();
 		 		
 		var fileName = favSelectedItem.data.fileName;

 		favouritesStore.remove(favSelectedItem);
 		favSelectedItem = null;
 		favouritesStore.sync();
 		
		navigator.notification.alert(fileName + ' removed from Favourites', alertDismissed, 'Please note');    
	},
	
	onRemoveAllTap: function (datav, index, target, record, e, options) {
			
	 		var favouritesStore = this.getStore();
	 		
	 		favouritesStore.removeAll();
	 		favouritesStore.sync();
	 		navigator.notification.alert('Favourites removed', alertDismissed, 'Please note');
	  
	},
	
//	showActionSheet: function (record) {
//	//	favSelectedItem = record;
//		var favouritesactionsheet = Ext.ComponentManager.get('favouritesactionsheet');
//	  
//	      if (!this.favouritesactionsheet) {
//	          Ext.Viewport.add(favouritesactionsheet);
//	      }
//	      
//	      favouritesactionsheet.show();
//	},
});

function onButtonPressedFavourites(button) {
    if (button == 1) {
        if(isIOS()) {
            stopAudio();
            iosAudio = new Audio(); 
            setCurrentSource(favouritesTitle);
            iosAudio.src = favouritesUrl;  
            mediaStatus(2);
        } else {
            stopAudio();
            my_media = new Media(favouritesUrl, onMPSuccess, onMPError, mediaStatus); 
            console.log("setting label source from openFavouritesTap notIOS() favourites view");
            setCurrentSource(favouritesTitle);
        }
        favouritesView.fireEvent("playFavourite", this);
    } 
};


Ext.define('BizRadio.view.AboutView', {
    extend : 'Ext.Container',
    xtype : 'aboutView',

    initialize : function() {
        this.callParent(arguments);
        
        var logoTB = {
                xtype: "logotoolbar",
                itemId: "logoTB"
        };

        var mainPanel = {
                xtype : 'panel',
                docked: 'top',
                padding: 10,
                layout : {
                    type: 'vbox'
                },
                items : [
                    {
                    xtype : 'panel',
                    layout : {
                        type : 'vbox',
                        pack : 'center',
                        align: 'center', 
                    },
                    padding: 10,
                    items: [{
                        xtype: 'panel',
                        style: 'font-size: 0.7em',
                        html: "<p>BizRadio is a live multi- platformed social media service providing an online forum to the business community for holding conversations on the key issues related to specific businesses as well as availing a space for cross-business collaboration in response to key issues affecting the world of business. </p><br/>"
                            + "<p>BizRadio brings thought-leaders, trend-setters, innovators, entrepreneurs and respected business leadership to your business where you are able to participate and share in what's going on in the world of business and the business of the world. </p><br/>"
                            + "<p>There's no excuse for not being on the cutting-edge and every reason why you should be!</p> <br/>"
                    }, 
                    {
                        xtype: 'panel',
                        layout : {
                            type : 'hbox',
                        },
                        items: [{
                            xtype: 'button',
                            itemId: 'bizRadioLogo',
                            html: '<img src="resources/images/aboutLogo.png" style="width: 85px;"/>',
                            ui: 'plain',
                            handler: this.onBizRadioLogoTap,
                            scope: this
                        },
                        {
                            xtype: 'button',
                            html: '<img src="resources/images/dvtLogo.jpg" width="150px"/>',
                            ui: 'plain',
                            handler: this.onDVTLogoTap,
                            scope: this
                        }]
                        
                    }]
                }]
            };
        
        var locationToolbar = {
            layout : {
                type : 'hbox',
                align: 'center', 
                pack: 'start'

            },
            docked : "top",
            height: '35px',
            style: 'background-color: #0392ce; color: #ffffff; font-size: 0.8em; padding-left: 10px',
            items: [
                {
                    xtype : 'label',
                    html: 'About'
                }
            ]
        };
               
        this.add([logoTB, locationToolbar, mainPanel]);
    },
    
    onBizRadioLogoTap: function () {
        console.log("onBizRadioTap");
        openBrowerLink('http://www.bizradio.co.za/');
    },
    
    onDVTLogoTap: function () {
        console.log("onDVTLogoTap");
        openBrowerLink('http://www.dvt.co.za/');
    },
    
    config : {
        layout : {
            type : 'vbox'
        }
    },
});


Ext.define('BizRadio.view.tablet.MainListItem', {
    extend: 'Ext.dataview.component.DataItem',
    xtype: 'mainlistitem',
    
    requires: [
               'Ext.Img'
           ],
 
    config: {
    	image: true,
 
        name: {
            flex: 1
        },
 
        layout: {
            type: 'hbox',
            align: 'center'
        },
        
        dataMap: {
            //this will call: this.getImage()
            /*getImage: {
                //and then this will call: this.getImage().setSrc() with the
                //'image' field value form the record
                setSrc: 'image'
            },*/

            getName: {
                setHtml: 'name'
            }
        },
        
        applyImage: function(config) {
            return Ext.factory(config, Ext.Img, this.getImage());
        },

        updateImage: function(newImage, oldImage) {
            if (newImage) {
                this.add(newImage);
            }

            if (oldImage) {
                this.remove(oldImage);
            }
        },

        applyName: function(config) {
            return Ext.factory(config, Ext.Component, this.getName());
        },

        updateName: function(newName, oldName) {
            if (newName) {
                this.add(newName);
            }

            if (oldName) {
                this.remove(oldName);
            }
        }
    }
});

﻿Ext.define("BizRadio.view.tablet.LandingPage", {
    extend: "Ext.Container",
    alias: "widget.landingpage",

    initialize: function () {

	    this.callParent(arguments);
	            
	    var bottomBar = {
	        xtype: "panel",
	        layout: 'hbox',
	        docked: "bottom",
	        height: '55px',
	        style: 'background-color: #e8e8e8; border-top: 2px groove #cfcfcf',
	        items: [
	//        {
	//            xtype: 'button',
	//            html: '<img src="resources/images/stream.png" style="width: 30px"/>',
	//            ui: 'plain',
	//            scope: this
	//        },
	        {
	            xtype: 'button',
	            html: '<img src="resources/images/favourites.png" style="width: 30px"/>',
	            handler: this.onFavouritesTap,
	            ui: 'plain',
	            scope: this
	        },
	        {
	            xtype: 'button',
	            html: '<img src="resources/images/rss.png" style="width: 30px"/>',
	            ui: 'plain',
	            handler: this.onPodcastsTap,
	            scope: this
	        },
	        {
	
	            xtype: 'button',
	            html: '<img src="resources/images/facebook.png" style="width: 30px"/>',
	            ui: 'plain',
	            handler: this.onFacebookTap,
	            scope: this
	        },
	        {
	            xtype: 'button',
	            html: '<img src="resources/images/twitter.png" style="width: 30px"/>',
	            ui: 'plain',
	            handler: this.onTwitterTap,
	            scope: this
	        },
	        {
	            xtype: 'button',
	            html: '<img src="resources/images/about.png" style="width: 30px"/>',
	            ui: 'plain',
	            handler: this.onAboutTap,
	            scope: this
	        },
	        {
	            xtype: 'spacer',
	            flex: 1
	        }]
	    };
	
	    var mainPanel = Ext.create('Ext.Panel', {
	    	id: 'mainPanel',
	    	scrollable: {
	            direction: 'vertical'
	        },
	        flex: 1,
	        items: [
	           {
	               xtype: 'panel',
	               layout: {
	                   type: 'vbox',
	                   align: 'center',
	                   pack: 'center'
	               },
	               items: [
	                   {
	                       xtype: 'panel',
	                       height: '250px',
	                       html: '<img src="resources/images/logo.png" width="250px"/>',
	                   },
	                   {
	                       xtype: 'panel',
	                       layout: {
	                           type: 'vbox',
	                           align: 'center',
	                           pack: 'center'
	                       },
	                       items: [{
	                           xtype: 'panel',
	                           height: '90px',
	                           layout: {
	                               type: 'hbox',
	                               align: 'center',
	                               pack: 'center'
	                           },
	                           items: [
	                           {
	                               xtype: 'button',
	                               itemId: 'pauseAudioButton',
	                               html: '<img src="resources/images/pauseButton.png" style="width: 60px;"/>',
	                               ui: 'plain',
	                               handler: this.onPauseButtonTap,
	                               hidden: true,
	                               scope: this
	                           },
	                           {
	                               xtype: 'button',
	                               itemId: 'playAudioButton',
	                               html: '<img src="resources/images/playButton.png" style="width: 60px"/>',
	                               ui: 'plain',
	                               handler: this.onPlayButtonTap,
	                               scope: this
	                           },
	                           {
	                               xtype: 'button',
	                               itemId: 'stopAudioButton',
	                               html: '<img src="resources/images/stopButton.png" style="width: 60px"/>',
	                               ui: 'plain',
	                               hidden: true,
	                               handler: this.onStopButtonTap,
	                               scope: this
	                           },
	                           ]
	                       },
	                       {
	                           xtype: 'label',
	                           html: '<p id="mediaStateLabel">Live BizRadio stream</p>',
	                       },
	                       {
	                           xtype: 'spacer',
	                           height: '15px'
	                       },
	                       {
	                           xtype: 'label',
	                           style: 'font-size: 0.6em; text-align: center',
	                           maxWidth: '250px',
	                           html: '<p id="currentSrc"></p>',
	                       }]
	                   },
	
	               ]
	           }
		   ]
	    });
	    this.add([mainPanel, bottomBar]);
	},
	
	onTwitterTap: function (url) {
		getContacts();
	    /*window.plugins.childBrowser.openExternal('https://twitter.com/#!/mua_insurance', {
	        showLocationBar: false
	    });*/
	},
	
	onPodcastsTap: function () {
	    this.fireEvent("viewPodcastsView", this);
	},
	
	onAboutTap: function (url) {
	    this.fireEvent("viewAboutPage", this);
	},
	
	onPlayButtonTap: function () {
	    this.fireEvent("playButtonTap", this);
	},
	
	onPauseButtonTap: function () {
	    this.fireEvent("pauseButtonTap", this);
	},
	
	onStopButtonTap: function () {
	    this.fireEvent("stopButtonTap", this);
	},
	   
	onFacebookTap: function (url) {
		openBrowerLink('http://www.facebook.com/bizradio');
	},
	
	onTwitterTap: function (url) {
		openBrowerLink('https://twitter.com/Biz_Radio');
	},
	
	onFavouritesTap: function () {
	    this.fireEvent("viewFavouritesView", this);
	},
	
	config: {
	    layout: {
	        type: 'fit'
	    }
	}
});


Ext.define("BizRadio.view.phone.LandingPage", {
    extend: "Ext.Container",
    alias: "widget.landingpage",

    initialize: function () {

        this.callParent(arguments);
                
        var bottomBar = {
            xtype: "panel",
            layout: 'hbox',
            docked: "bottom",
            height: '55px',
            style: 'background-color: #e8e8e8; border-top: 2px groove #cfcfcf',
            items: [
//            {
//                xtype: 'button',
//                html: '<img src="resources/images/stream.png" style="width: 30px"/>',
//                ui: 'plain',
//                scope: this
//            },
            {
                xtype: 'button',
                html: '<img src="resources/images/favourites.png" style="width: 30px"/>',
                handler: this.onFavouritesTap,
                ui: 'plain',
                scope: this
            },
            {
                xtype: 'button',
                html: '<img src="resources/images/rss.png" style="width: 30px"/>',
                ui: 'plain',
                handler: this.onPodcastsTap,
                scope: this
            },
            {

                xtype: 'button',
                html: '<img src="resources/images/facebook.png" style="width: 30px"/>',
                ui: 'plain',
                handler: this.onFacebookTap,
                scope: this
            },
            {
                xtype: 'button',
                html: '<img src="resources/images/twitter.png" style="width: 30px"/>',
                ui: 'plain',
                handler: this.onTwitterTap,
                scope: this
            },
            {
                xtype: 'button',
                html: '<img src="resources/images/about.png" style="width: 30px"/>',
                ui: 'plain',
                handler: this.onAboutTap,
                scope: this
            },
            {
                xtype: 'spacer',
                flex: 1
            }]
        };

        var mainPanel = Ext.create('Ext.Panel', {
        	id: 'mainPanel',
        	scrollable: {
                direction: 'vertical'
            },
            flex: 1,
            items: [
               {
                   xtype: 'panel',
                   layout: {
                       type: 'vbox',
                       align: 'center',
                       pack: 'center'
                   },
                   items: [
                       {
                           xtype: 'panel',
                           height: '250px',
                           html: '<img src="resources/images/logo.png" width="250px"/>',
                       },
                       {
                           xtype: 'panel',
                           layout: {
                               type: 'vbox',
                               align: 'center',
                               pack: 'center'
                           },
                           items: [{
                               xtype: 'panel',
                               height: '90px',
                               layout: {
                                   type: 'hbox',
                                   align: 'center',
                                   pack: 'center'
                               },
                               items: [
                               {
                                   xtype: 'button',
                                   itemId: 'pauseAudioButton',
                                   html: '<img src="resources/images/pauseButton.png" style="width: 60px;"/>',
                                   ui: 'plain',
                                   handler: this.onPauseButtonTap,
	                               hidden: true,
                                   scope: this
                               },
                               {
                                   xtype: 'button',
                                   itemId: 'playAudioButton',
                                   html: '<img src="resources/images/playButton.png" style="width: 60px"/>',
                                   ui: 'plain',
                                   handler: this.onPlayButtonTap,
                                   scope: this
                               },
                               {
                                   xtype: 'button',
                                   itemId: 'stopAudioButton',
                                   html: '<img src="resources/images/stopButton.png" style="width: 60px"/>',
                                   ui: 'plain',
	                               hidden: true,
                                   handler: this.onStopButtonTap,
                                   scope: this
                               },
                               ]
                           },
                           {
                               xtype: 'label',
	                           html: '<p id="mediaStateLabel">Live BizRadio stream</p>',
                           },
                           {
                               xtype: 'spacer',
                               height: '15px'
                           },
                           {
                               xtype: 'label',
                               style: 'font-size: 0.6em; text-align: center',
                               maxWidth: '250px',
                               html: '<p id="currentSrc"></p>',
                           }]
                       },

                   ]
               }
		   ]
        });
        this.add([mainPanel, bottomBar]);
    },
    
    onTwitterTap: function (url) {
    	getContacts();
        /*window.plugins.childBrowser.openExternal('https://twitter.com/#!/mua_insurance', {
            showLocationBar: false
        });*/
    },
    
    onPodcastsTap: function () {
        this.fireEvent("viewPodcastsView", this);
    },
    
    onAboutTap: function (url) {
        this.fireEvent("viewAboutPage", this);
    },
    
    onPlayButtonTap: function () {
        this.fireEvent("playButtonTap", this);
    },
    
    onPauseButtonTap: function () {
        this.fireEvent("pauseButtonTap", this);
    },
    
    onStopButtonTap: function () {
        this.fireEvent("stopButtonTap", this);
    },
       
    onFacebookTap: function (url) {
    	openBrowerLink('http://www.facebook.com/bizradio');
    },
    
    onTwitterTap: function (url) {
    	openBrowerLink('https://twitter.com/Biz_Radio');
    },
    
    onFavouritesTap: function () {
        this.fireEvent("viewFavouritesView", this);
    },
    
    config: {
        layout: {
            type: 'fit'
        }
    }
});

