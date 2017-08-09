
/*
Copyright(c) 2011 Company Name
*/
Ext.define('MyApp.model.NotificationInfos', {
    extend: 'Ext.data.Model',
 
    config:{
        fields: [
            {name:'deviceId',type:'string'}, 
            {name:'os',type:'string'},
            {name:'pushNotificationId',type:'string'}
        ],
        proxy: {
            type: 'ajax',
            appendId: false,
            api:{
                // TEST
                // create:"http://acheterlouer/acheterlouer_logRequest.php"
                
                // PRODUCTION
                create:"http://iphone.acheter-louer.fr/perl/agences/smartphones/setNotificationInfos.pl"
            },
            writer:{
                type:'json'
            }
        }
    }
});

Ext.define('MyApp.profile.Phone', {
    extend:'Ext.app.Profile',

    config:{
        name:'phone',
        views: ['Main'],
        controllers:['Main'],
    },

    isActive: function(){
        // TESTING IN SAFARI
        // var res = (Ext.os.is.Phone || Ext.os.is.Desktop);
        var res = (Ext.os.is.Phone);
        return res; 
    },
    
    launch: function(){
        // console.log('MyApp.profile.Phone - launch()');
		Ext.create('MyApp.view.phone.Main');
    }
});
Ext.define('MyApp.profile.Tablet', {
    extend:'Ext.app.Profile',

    config:{
        name:'tablet',
        views: ['Main'],
        controllers:['Main'],
    },

    isActive: function(){
        // var res = (Ext.os.is.Tablet);
        var res = (Ext.os.is.Tablet || Ext.os.is.Desktop);
        // console.log('tablet isActive ? :'+res);
        return res;     
    },
    
    launch:function(){
        // console.log('tablet profile launching');
		Ext.create('MyApp.view.tablet.Main');
    }
    
});
Ext.define('MyApp.model.AgencyHighlight', {
	extend: 'Ext.data.Model',
	config:
	{
		fields: [
			{name:'idagence',type:'string'},
			{name:'idannonce',type:'int'},
			{name:'ville',type:'string'},
			{name:'prix',type:'string'},
			{name:'typebien',type:'string'},
			{name:'photo',type:'string'},
			{name:'nom',type:'string'},
			/* "coup de coeur" or "exclusivite" */
			{name:'flag',type:'string'},
			{name:'lat',type:'string'},
			{name:'lng',type:'string'},
		],
	}
});

Ext.define('MyApp.model.AgencyDetail', {
    extend: 'Ext.data.Model',
    config:{
        fields: [
            {name:'idagence',type:'string'},

            {name:'nom',type:'string'},
            {name:'adresse',type:'string'},
            {name:'ville',type:'string'},
            {name:'email',type:'string'},
            {name:'cp',type:'string'},
            {name:'lat',type:'string'},
            {name:'lng',type:'string'},
            {name:'tel',type:'string'},
            {name:'directeur',type:'string'},
            {name:'web',type:'string'},
            {name:'logo',type:'string'},
            {name:'vitrine',type:'string'},
            {name:'twitter',type:'string'},
            {name:'facebook',type:'string'},
            {name:'rcs',type:'string'},

            /* device storage */
            {name:'logo_path', type:'string'},
            {name:'vitrine_path',type:'string'},
        ],
    }
});

Ext.define('MyApp.model.Search', {
    extend: 'Ext.data.Model',
    config:
    {
        fields: [
            { name:'idagence', type:'int' },

            { name:'localisation', type:'string' },

            /* Bien */
            { name:'vente', type:'int' },
            { name:'location', type:'int' },
            { name:'locationsaisonniere', type:'int' },
            { name:'viager', type:'int' },

            /* Type de bien */
            { name:'maison', type:'int' },
            { name:'appartement', type:'int' },
            { name:'villa', type:'int' },
            { name:'mas', type:'int' },
            { name:'terrain', type:'int' },
            { name:'immeuble', type:'int' },
            { name:'loft', type:'int' },
            { name:'parking', type:'int' },
            { name:'batiment', type:'int' },
            { name:'bureau', type:'int' },
            { name:'chateau', type:'int' },
            { name:'hotel', type:'int' },
            { name:'boutique', type:'int' },
            { name:'duplex', type:'int' },

            /* nombre de pieces */
            { name:'F1', type:'int' },
            { name:'F2', type:'int' },
            { name:'F3', type:'int' },
            { name:'F4', type:'int' },
            { name:'F5', type:'int' },

            { name:'surfaceh_min', type:'int' },
            { name:'surfaceh_max', type:'int' },

            { name:'surfaceterr_min', type:'int' },
            { name:'surfaceterr_max', type:'int' },

            { name:'prixa', type:'int' },
            { name:'prixb', type:'int' },

            { name:'nbrannonces_par_page', type:'int' , defaultValue:7 },

            { name:'tri', type:'int' },

            { name:'searchnotificationserverid', type:'string' },
            
            { name:'latest', type:'string', defaultValue:"2001-01-01" },
            { name:'latestid', type:'int', defaultValue:0 },

            { name:'needrefresh', type:'int', defaultValue:1 },
            { name:'flaghasnew', type:'int', defaultValue:1 }   
        ],
    },
    
    /* complex accessors */
    typesDeBiens: function(){
        return ['maison','appartement','villa','mas','terrain', 'immeuble','loft','parking','batiment','bureau','chateau','hotel', 
                'boutique', 'duplex'];
    },

    biens: function(){
        return ['vente','location','locationsaisonniere','viager'];
    },    
    
    /* Fillers */
    fillFromForm: function(formValues){
        /*
        TODO : 
        try 
        formValues.updateRecord(this) instead of all those lines once webservice accepts boolean 'true/false/null' instead of '1' for flags.
        */
    
        if (formValues['localisation'] === "TOUTES LOCALITES"){
            this.set('localisation', null);
        }else{
            this.set('localisation', formValues['localisation']);
        }
    
        // searchnotificationserverid
        if (formValues['searchnotificationserverid']){
            this.set('searchnotificationserverid', formValues['searchnotificationserverid']);
        }

        // Transaction
        if (formValues['vente'] === true){
            this.set('vente', 1);           
        }
        if (formValues['location'] === true){
            this.set('location', 1);            
        }
        if (formValues['locationsaisonniere'] === true){
            this.set('locationsaisonniere', 1);         
        }
        if (formValues['viager'] === true){
            this.set('viager', 1);          
        }
        
        // Type de biens
        if (formValues['maison'] === true){
            this.set('maison', 1);          
        }
        if (formValues['appartement'] === true){
            this.set('appartement', 1);         
        }
        if (formValues['villa'] === true){
            this.set('villa', 1);           
        }
        if (formValues['mas'] === true){
            this.set('mas', 1);         
        }
        if (formValues['terrain'] === true){
            this.set('terrain', 1);         
        }
        if (formValues['immeuble'] === true){
            this.set('immeuble', 1);            
        }
        if (formValues['loft'] === true){
            this.set('loft', 1);            
        }
        if (formValues['parking'] === true){
            this.set('parking', 1);         
        }
        if (formValues['batiment'] === true){
            this.set('batiment', 1);            
        }
        if (formValues['bureau'] === true){
            this.set('bureau', 1);          
        }
        if (formValues['chateau'] === true){
            this.set('chateau', 1);         
        }
        if (formValues['hotel'] === true){
            this.set('hotel', 1);           
        }
        if (formValues['boutique'] === true){
            this.set('boutique', 1);            
        }
        if (formValues['duplex'] === true){
            this.set('duplex', 1);          
        }

        // Pieces
        if (formValues['F1'] === true){
            this.set('F1', 1);          
        }
        if (formValues['F2'] === true){
            this.set('F2', 1);          
        }
        if (formValues['F3'] === true){
            this.set('F3', 1);          
        }
        if (formValues['F4'] === true){
            this.set('F4', 1);          
        }
        if (formValues['F5'] === true){
            this.set('F5', 1);          
        }
        
        // Surface
        if (formValues['surfaceh_min'] > 0){
            // console.log(formValues['surfaceh_min']);
            this.set('surfaceh_min', formValues['surfaceh_min']);           
        }
        if (formValues['surfaceh_max'] > 0){
            // console.log(formValues['surfaceh_max']);
            this.set('surfaceh_max', formValues['surfaceh_max']);           
        }

        if (formValues['surfaceterr_min'] > 0){
            // console.log(formValues['surfaceterr_min']);
            this.set('surfaceterr_min', formValues['surfaceterr_min']);         
        }
        if (formValues['surfaceterr_max'] > 0){
            // console.log(formValues['surfaceterr_max']);
            this.set('surfaceterr_max', formValues['surfaceterr_max']);         
        }

        // Prix
        if (formValues['prixa'] > 0){
            // console.log(formValues['prixa']);
            this.set('prixa', formValues['prixa']);         
        }
        if (formValues['prixb'] > 0){
            // console.log(formValues['prixb']);
            this.set('prixb', formValues['prixb']);         
        }
        if(formValues['tri'] < 4){
			this.set('tri',formValues['tri']);
		}
    }

});

Ext.define('MyApp.model.SearchDetail', {
    extend: 'Ext.data.Model',
    config:{
        fields: [
        	{ name:'idagence', type:'int' }, 
    		{ name:'idannonce', type:'int' },
        ]
    }
});

Ext.define('MyApp.model.SearchResults', {
    extend: 'Ext.data.Model',
    
    config: {
        fields: [
    		{ name:'returncode', type:'string' },
    		{ name:'returnmessage', type:'string' },
            { name:'latestid', type:'int' },
            { name:'latest', type:'string' },
    		{ name:'page', type:'int' },
    		{ name:'max', type:'int' },
    		{ name:'nbpages', type:'int' },
    		{ name:'nbannonces', type:'int' },
        ],
    	hasMany: { model:'MyApp.model.RealEstate', name:'realestates', associationKey:'data' }
    }
});

Ext.define('MyApp.model.SearchNotificationJsonWriter', {
    extend:'Ext.data.writer.Json',

    getRecordData: function(record){
        var data = this.superclass.getRecordData.call(this,record);
        
        if (record.searchModel){            
            data["search"] = this.getRecordData.call(this,record.searchModel);
        }
        return data;
    }         
});

var searchNotificationJsonWriter = Ext.create('MyApp.model.SearchNotificationJsonWriter',{});

/*
    SENCHA touch api bug : 
    USING model.save() instead of store.sync() as long as sync() don't allow success/error callback
    http://www.sencha.com/forum/showthread.php?152446-store.sync()-callbacks
*/


// TODO :use hasone association instead of custom JsonWriter 

Ext.define('MyApp.model.SearchNotification', {
    extend: 'Ext.data.Model',
    config:{
        fields: [
            { name:'deviceId', type:'string' },
        ],
        proxy:{
            type: 'rest',
            appendId: false,
            // TEST URLS
            api:{
                // TEST 
                // create:"http://acheterlouer/acheterlouer_addFavorite.php",
                // destroy:"http://acheterlouer/acheterlouer_removeFavorite.php"   
                
                // PRODUCTION
                create:"http://iphone.acheter-louer.fr/perl/agences/smartphones/pushNotification.pl",
            },
            writer:searchNotificationJsonWriter,
            reader:{
                type:'json'
            }
        }
    },

    searchModel:null,
    
    removeFromServer:function(config){
        var newConf = Ext.apply(
            {
                url: 'http://iphone.acheter-louer.fr/perl/agences/smartphones/deleteNotification.pl',
                method:'GET',
                params: {
                    id: this.searchModel.get('searchnotificationserverid')
                },
            },
            config
        );
        Ext.Ajax.request(newConf);
    }
});
Ext.define('MyApp.model.RealEstate', {
	extend: 'Ext.data.Model',

	config:{
		fields: [
			{name:'consommation',type:'float'}, /* DPE */
			{name:'emission',type:'float'}, /* DPE */
			{name:'prix',type:'string'},
			{name:'cp',type:'int'},
			{name:'ville',type:'string'},
			{name:'descriptif',type:'string'},
			{name:'date',type:'string'},
			{name:'reference',type:'string'},
			{name:'bien',type:'string'},
			{name:'typebien',type:'string'},
			{name:'typesurface',type:'int'},
			{name:'Nbre de chambres',type:'string'},
			{name:'surfaceh',type:'int'},
			{name:'nbphoto',type:'int'},
			{name:'surfaceterr',type:'int'},
			{name:'logo',type:'string'},
			{name:'agence',type:'string'},
			{name:'adresseAgence',type:'string'},
			{name:'telAgence',type:'string'},
			{name:'villeAgence',type:'string'},
			{name:'cpAgence',type:'int'},
			{name:'rcsAgence',type:'string'},

			{name:'idagence',type:'int'},
			{name:'idannonce',type:'int'},

			{name:'img',type:'string'},
			{name:'img1',type:'string'},
			{name:'img2',type:'string'},
			{name:'img3',type:'string'},
			{name:'img4',type:'string'},

			{name:'img_cache',type:'string'},
			{name:'img1_cache',type:'string'},
			{name:'img2_cache',type:'string'},
			{name:'img3_cache',type:'string'},

			{name:'lat',type:'string'},
			{name:'lng',type:'string'},

			{name:'additionalinfo',type:'string'},
		],
	},

	generateOptionalFields: function(){
		// console.log("MyApp.view.RealEstateDetail - saveOptionalFields()");

		var
			record=this,
			kfound=false,
			kval=null,
			optionalFields = "",
			excludedOptionalFields = {
				"returncode":""
			};

		for (var kraw in record.raw){
			kfound = false;
			kval = record.raw[kraw];

			if (kraw.substring(0,"img".length)=== "img" ||
				kraw in excludedOptionalFields ||
				! (typeof kval === "string") ||
				kval.trim().length == 0){
				continue;
			}

			for (var kdata in record.data){
				if (kraw===kdata){
					kfound = true;
					break;
				}
			}
			if (!kfound){
				//add to optionnal
				if(kraw.match('Surface')){
					optionalFields+=""+kraw+" : " + record.raw[kraw]+" m&sup2;\n";
				}else{
					optionalFields+=""+kraw+" : " + record.raw[kraw]+"\n";
				}
			}
		}

		if (optionalFields){
			// console.log('set field additionalinfo to optionalFields='+optionalFields);
			record.set('additionalinfo', optionalFields);
		}
	},
});

Ext.define('MyApp.model.Location', {
    extend: 'Ext.data.Model',
    config: {
        fields: [
    	    { name:'localisation', type:'string' },
    	]
    }
});

Ext.define('MyApp.model.RealEstateThumbnails', {
	extend: 'Ext.data.Model',
	config:
	{
		fields: [
			{name:'img',type:'string'},
			{name:'idphoto', type:'int'},
		],
	}
});

Ext.define('MyApp.store.AgencyHighlight', {
    extend:'Ext.data.Store',
    config:{
        model:'MyApp.model.AgencyHighlight',

        proxy:{
            type:'ajax',

            // PRODUCTION
            url:'http://iphone.acheter-louer.fr/perl/agences/smartphones/gallerie.pl',

            sortParam:null,
            filterParam:null,
            directionParam:null,
            limitParam:null,
            startParam:null,
            pageParam:null,
            noCache:false,
            remoteFilter:true,
            reader:{
                type: 'json',
                rootProperty: 'data'
            }
        },
    },
});
Ext.define('MyApp.store.AgencyDetailServer', {
    extend:'Ext.data.Store',
    config:{
        model:'MyApp.model.AgencyDetail',
        
        proxy: {
                type:'ajax',
                filterParam:null,
                groupParam:null,
                limitParam:null,
                directionParam:null,
                api:{
                    // TEST 
                    // read:"http://acheterlouer/acheterlouer_logRequest.php"

                    // PRODUCTION
                    read:"http://iphone.acheter-louer.fr/perl/agences/smartphones/info.pl",
                    
                },
                reader:{
                    type: 'json',
                    rootProperty: 'data'
                }
            }
    },
});
Ext.define('MyApp.store.AgencyDetailCache', {
    extend: 'Ext.data.Store',
    config: {
        model: 'MyApp.model.AgencyDetail',
        autoLoad: true,
    	autoSync: true,

    	proxy: {
	        type: 'localstorage',
	        id: 'AgencyDetailCache'
    	},
    }
});
Ext.define('MyApp.store.SearchResults', {
    extend:'Ext.data.Store',
    // itemId:'SearchResults',

    config:{
        
        model:'MyApp.model.SearchResults',

        autoLoad:true,

        proxy: {
            type:'ajax',

            // TEST ON LOCAL FILE
            // url:'app/data/search_results.js',

            // TEST USING REVERSE PROXY
            // url:'/labs/acheterlouer/searchresults2.json',
            // url:'/perl/agences/smartphones/search.pl',

            // PRODUCTION
            url:'http://iphone.acheter-louer.fr/perl/agences/smartphones/search.pl',

            noCache:false,

            writer:{
                type:'json'                
            },
            reader:{
                type:'json',
            },
        }
    },
});
Ext.define('MyApp.store.SearchDetail', {
    extend:'Ext.data.Store',

    config:{
        itemId:'SearchDetail',
        model:'MyApp.model.RealEstate',
        proxy: {
            type:'ajax',

            // PRODUCTION
            url: 'http://iphone.acheter-louer.fr/perl/agences/smartphones/searchfiche_1.1.pl',

            sortParam:null,
            filterParam:null,
            directionParam:null,
            limitParam:null,
            startParam:null,
            pageParam:null,
            noCache:false,
            remoteFilter:true,
            
            reader:{
                type:'json'
            }
        }       
    },

});
Ext.define('MyApp.store.FavoriteRealEstate', {
	extend: 'Ext.data.Store',

	config: {
		model: 'MyApp.model.RealEstate',
		autoLoad: true,
		autoSync: true,

		proxy: {
			type: 'localstorage',
			id: 'FavoriteRealEstate'
		},
	}
});
Ext.define('MyApp.store.FavoriteSearch', {
    extend: 'Ext.data.Store',
    
    config: {
        model: 'MyApp.model.Search',
        autoLoad: true,
    	autoSync: true,

    	proxy: {
	        type: 'localstorage',
	        id: 'FavoriteSearch'
    	},  
    },
});
Ext.define('MyApp.store.Location', {
    extend: 'Ext.data.Store',
    // itemId:'Location',
    config:{
        model: 'MyApp.model.Location',
    	proxy: {
    		type:'ajax',

    		// PRODUCTION
    		url:'http://iphone.acheter-louer.fr/perl/agences/smartphones/ville.pl',

    		noCache:true,
    		remoteFilter:true,
    		reader:{
    			type: 'json',
    			rootProperty: 'data'
    		}
    	},
    },
});
Ext.define('MyApp.store.RealEstateThumbnails', {
	extend:'Ext.data.Store',
	config:{
		model:'MyApp.model.RealEstateThumbnails',

		proxy:{
			type:'ajax',

			// PRODUCTION
			url:'http://iphone.acheter-louer.fr/perl/agences/smartphones/thumbnail.pl',

			sortParam:null,
			filterParam:null,
			directionParam:null,
			limitParam:null,
			startParam:null,
			pageParam:null,
			noCache:false,
			remoteFilter:true,
			reader:{
				type: 'json',
				rootProperty: 'data'
			}
		},
	},
});
Ext.define('MyApp.model.CustomModelBase', {
    extend: 'Ext.data.Model',
    
    //adding an initializer to let custom validators access "self"
    //inspired by http://stackoverflow.com/questions/7414115/how-to-add-a-custom-validation-rule-to-a-model-in-sencha-touch
    init: function(){
        var i, len;
        if (this.config.validations) {
            for (i = 0, len = this.config.validations.length; i < len; i++) {
                this.config.validations[i].self = this;
            }
        }
    }
});
Ext.define('MyApp.controller.Main', {
	extend: 'Ext.app.Controller',
	config: {
		refs: {
			appTabPanel:'#apptabpanel',
			/* HOME SECTION */
			homeNavigationView:'#homesection',
			homepage:'#homepage',
			homepageAgencyName:'#homepageagencyname',
			carousel:'#highlight-carousel',
			buttonHighlightGo:'#highlight-go',
			highlightRequestAdMoreInfo:'#highlightmoreinfo',

			/* SEARCH SECTION */
			searchNavigationView:'#searchsectionnavigationview',
			searchSection:'#searchsectionnavigationview',
			searchFormLogo:'#searchformlogo',
			searchResultsListLogo:'#searchresultslistlogo',
			searchResultListAgencyName:'#searchresultlistagencyname',
			searchForm:'#searchform',
			searchFormAgencyName:'#searchformagencyname',
			searchResultsListPanel:'#searchresultslistpanel',
			searchResultsList:'list#searchresultslist',
			searchResultsListView:'#searchresultslistview',
			searchResultsMap:'#searchresultsmap',
			searchResultsDetail:'#searchresultsdetail',
			realEstateDetailShowMapButton:'button#realEstateDetailShowMapButton',
			searchDetailCall:'#buttoncall',
			searchResultRequestAdMoreInfo:'#searchrequestadmoreinfo',
			searchResultPreviousButton:'button#searchresultslistbuttonpreviouspage',
			searchResultNextButton:'button#searchresultslistbuttonnextpage',
			searchResultToggleListMapButton:'button#searchresultslistbuttontogglelistmap',
			searchResultSaveSearchButton:'button#searchresultslistbuttonsave',
			searchResultListButtonToggleTri:'button#searchresultlistbuttontoggletri',
			fieldSetLocalisation:'#fieldsetlocalisation',

			/* THUMBNAIL */
			realEstateThumbnailView:'#realestatethumbnail',

			/* FAVORITE SEARCH SECTION */
			favoriteSearchNavigationView:'#favoritesearchsection',
			favoriteSearchList:'#favoritesearchlist',
			favoriteSearchSectionAgencyName:'#favoritesearchsectionagencyname',

			/* FAVORITE REAL ESTATE SECTION */
			favoriteRealEstateNavigationView:'#favoriterealestatesection',
			favoriteRealEstatesList:'dataview#favoriterealestateslist',
			favoriteRealEstateDetail:'#favoriterealestatedetail',
			favoriteRealEstateAgencyName:'#favoriterealestateagencyname',
			favoriteRealEstateRequestAdMoreInfo:'#favoriterealestatemoreinfo',

			/* AGENCY SECTION */
			agencyPage:'#agencypage',
			agencyNavigationView:'#agencysection',
			agencyLogo:'#agencyLogo',
			agencyDetail:'#agencyDetail',
			butAgencyEmail:'button#butAgencyEmail',
			requestAppraisalForm:'#requestappraisalform',
			requestAdDepositForm:'#requestaddeposit',
			requestSearchMandateForm:'#requestsearchmandate',
			agencyRequestInfo:'#agencyrequestinfo',
			butAgencyFacebook:'button#butAgencyFacebook',
			butAgencyTwitter:'button#butAgencyTwitter',
			butAgencyPhone:'button#butAgencyPhone',
			imageAgencyTwitter:'image#butAgencyTwitter',
			imageAgencyfacebook:'image#butAgencyFacebook',
			imageShowAgencyMap:'image#butShowAgencyMap',
		},

		control:{

			/* HOME SECTION */
			'carousel#highlight-carousel':{
				activeitemchange: function(carousel,value, oldValue, eOpts){
					this.getHomepage().setActiveHighlight(value.config.model);
				}
			},

			// go to search tab
			'button#homegotosearch':{
				tap:function(button){
					this.getAppTabPanel().setActiveItem(1);
				}
			},
// 			'button#buttoncall':{
// 				tap:function(button){
// 					var agencyDetailStore = Ext.getStore("AgencyDetailCache"),
// 					agencyDetailModel = agencyDetailStore.getAt(0);
// 					document.location = 'tel:' + agencyDetailModel.get('tel');
// 				},
// 			},
			// go to highlight
			'button#highlight-go':{
				tap: 'onTapButtonHighlightGo'
			},

			//button that pushes new views
			'button#buttonShowAgencyMap':{
				tap: 'onTapButtonShowAgencyMap'
			},
			'button#buttonRequestAppraisal':{
				tap: 'onTapButtonRequestAppraisal'
			},
			'button#buttonRequestAppraisal':{
				tap: 'onTapButtonRequestAppraisal'
			},
			'button#buttonRequestAdDeposit':{
				tap: 'onTapButtonRequestAdDeposit'
			},
			'button#buttonRequestSearchMandate':{
				tap: 'onTapButtonRequestSearchMandate'
			},
			'button#butAgencyEmail':{
				tap:'onTapButtonAgencyEmail'
			},
			'button#realEstateDetailShowMapButton':{
				tap:'onTapRealEstateDetailMapButton'
			},
			'button#butAgencyFacebook':{
				tap:'onTapButAgencyFacebook'
			},
			'button#butAgencyTwitter':{
				tap:'onTapButAgencyTwitter'
			},
			'image#butAgencyFacebook':{
				tap:'onTapButAgencyFacebook'
			},
			'image#butAgencyTwitter':{
				tap:'onTapButAgencyTwitter'
			},
			'image#butShowAgencyMap':{
				tap: 'onTapButtonShowAgencyMap'
			},
			'button#butAgencyPhone':{
				tap:'onTapButAgencyPhone'
			},
			// Agency Map Button

			//submit buttons
			'button#submit-request-appraisal':{
				tap: function(){

					this.submitFormToModelAndPop(   this.getRequestAppraisalForm(),
													'MyApp.model.RequestAppraisal',
													"Demande envoy&eacute;e",
													this.getAgencyNavigationView(),
													function(form,model){
														// console.log(form);
														var values = form.getValues();
														//fill basic fields
														form.updateRecord(model);
														//then fill the flags from the various selectfields
														if (values['Typebien']!='')
														{
															model.set(values['Typebien'],true);
														}
														if (values['Typesurface']!='')
														{
															model.set(values['Typesurface'] , true);
														}
												});
				}
			},

			'button#submit-request-addeposit':{
				tap: function(){
					this.submitFormToModelAndPop(   this.getRequestAdDepositForm(),
													'MyApp.model.RequestAdDeposit',
													"Annonce envoy&eacute;e",
													this.getAgencyNavigationView(),
													function(form,model){
														var values = form.getValues();
														//fill basic fields
														form.updateRecord(model);
														//then fill the flags from the various selectfields
														if (values['Bien']!=''){
															model.set(values['Bien'], true);
														}
														if (values['Typebien']!=''){
															model.set(values['Typebien'],true);
														}
														if (values['Typesurface']!=''){
															model.set(values['Typesurface'] , true);
														}
												});
				}
			},

			'button#submit-request-searchmandate':{
				tap: function(){
					this.submitFormToModelAndPop(   this.getRequestSearchMandateForm(),
													'MyApp.model.RequestSearchMandate',
													"Mandat envoy&eacute;",
													this.getAgencyNavigationView(),
													function(form,model){
														var values = form.getValues();
														//fill basic fields
														form.updateRecord(model);
														//then fill the flags from the various selectfields
														if (values['Bien']!=''){
															model.set(values['Bien'], true);
														}
														if (values['Typebien']!=''){
															model.set(values['Typebien'],true);
														}
														if (values['Typesurface']!=''){
															model.set(values['Typesurface'] , true);
														}
													}
												);
				}
			},

			'#highlight-detail #buttonrequestmoreinfo':{
				tap: 'onTapButtonHighlightDetailRequestMoreInfo'
			},

			// Request More Info from Highlight
			'#highlightmoreinfo button#submit-request-moreinfo':{
				scope:this,
				tap: function(button){
					// console.log('button#submit-request-moreinfo');
					this.submitFormToModelAndPop(   this.getHighlightRequestAdMoreInfo(),
													'MyApp.model.RequestAdMoreInfo',
													"Demande envoy&eacute;e",
													null
												);
				}
			},
			'#agencyrequestinfo button#submit-request-info':{
				scope:this,
				tap: function(button){
					// console.log('button#submit-request-info');
					this.submitFormToModelAndPop(   this.getAgencyRequestInfo(),
													'MyApp.model.RequestAgencyInfo',
													"Demande envoy&eacute;e",
													null
												);
				}
			},
			// Request More Info from Search Section
			'#searchrequestadmoreinfo button#submit-request-moreinfo':{
				scope:this,
				tap: function(){
					// console.log('button#submit-request-moreinfo');
					this.submitFormToModelAndPop(   this.getSearchResultRequestAdMoreInfo(),
													'MyApp.model.RequestAdMoreInfo',
													"Demande envoy&eacute;e",
													null
												);
				}
			},

			// Request More Info from Favorite RealEstate Section
			'#favoriterealestatemoreinfo button#submit-request-moreinfo':{
				scope:this,
				tap: function(){
					// console.log('button#submit-request-moreinfo');
					this.submitFormToModelAndPop(   this.getFavoriteRealEstateRequestAdMoreInfo(),
													'MyApp.model.RequestAdMoreInfo',
													"Demande envoy&eacute;e",
													null
												);
				}
			},

			// Highlight detail View
			// Configure the handler for button 'Add To Favorite' in SearchResultsDetail
			'#highlight-detail #buttonaddtofavorite':{
				tap: 'onTapButtonHighlightDetailAddRealEstateToFavorite'
			},

			/* SEARCH SECTION */
			'searchsection_phone':{
				push: 'onSearchNavigationViewPush',
				pop: 'onSearchNavigationViewPop',
				back: 'onSearchNavigationViewBack'
			},

			'button#submit-search':{
				tap: 'onStartSearch'
			},
			'button#searchresultlistbuttontoggletri':{
				tap:'onToggleTri'
			},

			realEstateDetailImage1:{
				tap: 'onRealEstateImage1Tap'
			},
			// Configure the handler for button 'Request More Information' in SearchDetail.js
			searchResultsList:{
				select: 'onSearchResultsListItemSelect',
				itemtap: 'onListItemTapDoDeselect',
			},

			// Configure the handler for button toggle List/Map in SearchResultsList
			searchResultToggleListMapButton:{
				tap: 'onSearchResultsListToggleListMap'
			},

			// Configure the handler for button 'Save To FavoriteSearch' in SearchResultsList
			searchResultSaveSearchButton:{
				tap: 'onSearchResultsListAddSearchToFavorite'
			},

			'button#searchresultslistbuttonpreviouspage':{
				tap: 'onSearchResultsListPreviousPage'
			},

			'button#searchresultslistbuttonnextpage':{
				tap: 'onSearchResultsListNextPage'
			},

			// Configure the handler for button 'Add To Favorite' in SearchResultsDetail
			'#searchresultsdetail #buttonaddtofavorite':{
				tap: 'onSearchResultsDetailAddRealEstateToFavorite'
			},

			// Configure the handler for button 'Request More Information' in SearchDetail.js
			'#searchresultsdetail #buttonrequestmoreinfo':{
				tap: 'onSearchResultsDetailRequestMoreInfo'
			},
			// Configure the handler for button 'Call' in SearchDetail.js
			'#buttoncall':{
				tap: 'onSearchResultsDetailCall'
			},

			// Configure the handler for button 'Choose a Location' in Search.js
			'button#buttonchoosealocation':{
				tap: 'onChooseALocation'
			},

			/* FAVORITE SEARCH */
			'dataview#favoritesearchlist':{
				itemtap: 'onFavoriteSearchListItemSelect',
			},
			'button[cls=favoritesearchlist-buttondelete-tablet]':{
				tap: function(b){
					this.removeFavoriteSearch(b.up("dataitem").getRecord());
				}
			},

			'button[cls=favoritesearchlist-buttondelete-phone]':{
				tap: function(b){
					// console.log('DELETE FAVORITE SEARCH PHONE');
					this.removeFavoriteSearch(b.up("dataitem").getRecord());
				}
			},
			'button[cls=favoritesearchlist-buttonupdate-phone]':{
				tap: function(b,e,eOpts){
					var item = b.up("dataitem");
					this.onFavoriteSearchListUpdateSearch(b.up("#dataview"),0,item,item.getRecord(),e,eOpts,true );
				}
			},

			/* FAVORITE REAL ESTATE */
			favoriteRealEstatesList:{
				itemtap: 'onFavoriteRealEstateListItemSelect'
			},

			'#favoriterealestatedetail #buttonrequestmoreinfo':{
				tap: 'onFavoriteRealEstateRequestMoreInfo'
			},

			'button[cls=favoriterealestateitem-buttondelete-tablet]':{
				tap: function(b){
					this.removeFavoriteRealEstate(b.up("dataitem").getRecord());
				}
			},

			'button[cls=favoriterealestateitem-buttondelete-phone]':{
				tap: function(b){
					this.removeFavoriteRealEstate(b.up("dataitem").getRecord());
					//var button=this.getMyButton();
					//button.show();
				}
			},

		}
	},

	global_idagence: 2078,

	global_pickerlocation: null,

	global_maprenderconfigured: false,
	global_mapmarkersarray: [],

	global_searchloadingoverlay: null,

	global_section : null,


	// -----------------------------------------------------------------------
	// Initialization
	init: function(){
		// console.log('MyApp.controller.Main - init()');
		var locationStore = Ext.getStore('Location');

		// Ask server the list of cities for global_idagence
		locationStore.load({
			scope: this,
			params: {
				idagence: this.global_idagence,
			},
			callback: this.onLocationStoreLoad,
		});

		this.startBackgroundProcess();
	},

	launch: function(){
		//console.log("MyApp.controller.Main launch");

		var agencyHighlightStore = Ext.getStore('AgencyHighlight'),
			agencyDetailCacheStore = Ext.getStore('AgencyDetailCache'),
			agencyDetailServerStore = Ext.getStore('AgencyDetailServer'),
			agencyDetail = Ext.create('MyApp.model.AgencyDetail',{}),
			alias = this; //for callbacks that don't support "scope" for this.

		this.updateAgencyDetail(agencyDetail);

		agencyHighlightStore.load({
			scope: this,
			params: {
				idagence: this.global_idagence,
			},
			callback: function(records,operation,success){
				// console.log(". agencyHighlightStore.load callback");
				if (success){
					this.onAgencyHightlightStoreLoad();
				}
			}
		});

		agencyDetailServerStore.load({
			scope:this,
			params:{
				idagence : this.global_idagence,
			},
			callback: function(records,operation,success){
				if (success){
					//console.log("agencyDetailServerStore.load success");
					var currentModel = records[0],
						currentCachedModel = agencyDetailCacheStore.getAt(0),
						cachedLogoUrl = null,
						cachedLogoPath = null;

					if (currentCachedModel){
						cachedLogoUrl = currentCachedModel.get('logo');
						cachedLogoPath = currentCachedModel.get('logo_path');
						cachedVitrinePath = currentCachedModel.get('vitrine_path');
					}

					if (currentModel){
						agencyDetailCacheStore.removeAll();
					}
					agencyDetailCacheStore.add(currentModel);
					if (!cachedLogoPath || !cachedVitrinePath || currentModel.get('logo') != currentLogoUrl){
						//console.log("logo different or no logo_cache property, get the file");
						if (gIMAGECACHE_DIR){
							//get the new agency logo
							var fileTransfer = new FileTransfer(),
								d = new Date();

							fileTransfer.download(
								currentModel.get('logo'),
								gIMAGECACHE_DIR+'/'+d.getTime(),
								function(entry){
									// console.log("file transfer success to : "+entry.fullPath);
									currentModel.set('logo_path',entry.fullPath);
									alias.updateAgencyDetail();
								},
								function(error){
									//console.log("download error source " + error.source);
									//console.log("download error target " + error.target);
									//console.log("download error code" + error.code);
								}
							);
							fileTransfer.download(
								currentModel.get('vitrine'),
								gIMAGECACHE_DIR+'/v'+d.getTime(),
								function(entry){
									// console.log("file transfer success to : "+entry.fullPath);
									currentModel.set('vitrine_path',entry.fullPath);
									alias.updateAgencyDetail();
								},
								function(error){
									// console.log("download error source " + error.source);
									// console.log("download error target " + error.target);
									// console.log("download error code" + error.code);
								}
							);
						}else{
							// console.log("no cache dir => no persistent caching mechanism");
							alias.updateAgencyDetail(currentModel);
						}
					}
					else{
						// console.log("no need for logo transfer, reuse the same path");
						currentModel.set('logo_path',cachedLogoPath);
						currentModel.set('vitrine_path',cachedVitrinePath);
						alias.updateAgencyDetail();
					}
				}else{
			//console.log('failed load agencydetails');
		}
			}
		});
	},
	onRealEstateImage1Tap:function(){
		//console.log('realestatedetailimage1 tapped');
	},
	showRealEstateThumbnailView:function(realEstateThumbnailStore,indice,section){
		//console.log('MyApp.controller.Main showRealEstateThumbnailView() - need override');
	},
	// Common tool function
	didTapOnButton:function(e){
		var clsname = e.target.className;
		if (clsname.indexOf('x-button-label') != -1){
			//console.log('clicked on a button, ignore general itemtap');
			return true;
		}
		if (clsname.indexOf('x-button') != -1 ){
			//console.log('clicked on a button, ignore general itemtap');
			return true;
		}
		return false;
	},

	// -----------------------------------------------------------------------
	// Background Request Processing

	startBackgroundProcess: function(){
		// console.log('MyApp.controller.Main - startBackgroundProcess() @start');

		var favoriteSearchStore = Ext.getStore('FavoriteSearch');
		var favoriteSearchCount = favoriteSearchStore.getCount();

		for (var i = 0; i < favoriteSearchCount; i++){

			var aFavoriteSearchRecord = favoriteSearchStore.getAt(i);
			var aSearchResultsStore = Ext.create('MyApp.store.SearchResults');

			// Save searchnotificationserverid
			aSearchResultsStore.searchnotificationserverid = aFavoriteSearchRecord.getData()['searchnotificationserverid'];

			// Call the webservice
			aSearchResultsStore.load({
				params: aFavoriteSearchRecord.getData(),
				callback: function(data){

					// Find the record identified by searchnotificationserverid in favoritesearchstore
					var favoriteSearchStore = Ext.getStore('FavoriteSearch');
					var recordindex = favoriteSearchStore.find('searchnotificationserverid', this.searchnotificationserverid, 0, false, false, true);
					var record = favoriteSearchStore.getAt(recordindex);
					if (record){
						var locallatestvalue = record.getData()['latest'];
						var serverlatestvalue = this.getAt(0).getData()['latest'];

						if (locallatestvalue === serverlatestvalue){
							// NO UPDATES AVAILABLE
							// console.log('NO UPDATES for searchnotificationserverid : '+this.searchnotificationserverid);
							// Set needrefresh to true for this favorite search on the next start of the application
							record.set('needrefresh', 1);
						}else{
							// NEW UPDATES AVAILABLE
							// console.log('NEW UPDATES AVAILABLE for searchnotificationserverid : '+this.searchnotificationserverid);
							// Save the new server latest value
							record.set('latest', serverlatestvalue);
							// Set needrefresh to false for this favorite search on the next start of the application
							record.set('needrefresh', 0);
							// Set flaghasnew to true
							record.set('flaghasnew', 1);
						}
					}
				}
			});
		};
	},

	// Background Request
	// -----------------------------------------------------------------------

	customLaunch: function(){
		//console.log('MyApp.controller.Main - customLaunch()');
	},

	// Initialization
	// -----------------------------------------------------------------------

	// -----------------------------------------------------------------------
	// LOADING OVERLAY
	doShowLoadingOverlay: function(){
		if (this.global_searchloadingoverlay===null){

			this.global_searchloadingoverlay = Ext.Viewport.add({
				xtype: 'loadmask',
				message: 'Loading',
			});

		}
		this.global_searchloadingoverlay.show();
	},

	doHideLoadingOverlay: function(){
		if (this.global_searchloadingoverlay){
			this.global_searchloadingoverlay.hide();
		}
	},
	// LOADING OVERLAY
	// -----------------------------------------------------------------------

	// -----------------------------------------------------------------------
	// HOME SECTION
	updateAgencyDetail: function(serverAgencyDetail){
		//console.log('MyApp.controller.Main - updateAgencyDetail()');
		var agencyDetailStore = Ext.getStore("AgencyDetailCache"),
			homepageagencyname = this.getHomepageAgencyName(),
			searchformagencyname = this.getSearchFormAgencyName(),
			agencypage = this.getAgencyPage(),
			homenavigationview = this.getHomeNavigationView(),
			searchformlogo = this.getSearchFormLogo(),
			favoritesearchsectionagencyname = this.getFavoriteSearchSectionAgencyName(),
			favoriterealestateagencyname = this.getFavoriteRealEstateAgencyName(),
			agencyDetailModel = agencyDetailStore.getAt(0);
		if (!agencyDetailModel && serverAgencyDetail){
			//console.log("no agency detail model found in cache store, use one given in parameter ");
			agencyDetailModel = serverAgencyDetail;
		}
		//console.log('item is ' + homenavigationview.getAt(0).setTitle);
		//homenavigationview.getAt(0).setTitle(agencyDetailModel.get('nom'));
		//console.log(homenavigationview.getNavigationBar());
		homepageagencyname.setHtml('<h1>' + agencyDetailModel.get('nom') + '</1>');
		searchformagencyname.setHtml('<h1>' + agencyDetailModel.get('nom') + '</1>');
		agencypage.setAgencyModel(agencyDetailModel);
		favoritesearchsectionagencyname.setHtml('<h1>' + agencyDetailModel.get('nom') + '</1>');
		favoriterealestateagencyname.setHtml('<h1>' + agencyDetailModel.get('nom') + '</1>');
	},

	// fillModelFunction is updateRecord by default, but one may want to do that manually
	submitFormToModelAndPop: function(theForm, modelName, onSuccessMessage, navigationView, fillModelFunction){
		//console.log('MyApp.controller.Main - submitFormToModelAndPop()');

		var model = Ext.create(modelName, { 'idagence':this.global_idagence }),
			alias = this,
			validationErrors = null,
			error = null,
			errorfield = null;

		if (fillModelFunction){
			fillModelFunction(theForm, model);
		}else{
			theForm.updateRecord(model);
		}

		validationErrors = model.validate();

		if (validationErrors.length == 0){
			model.save({
				success: function(record, operation){
					var responseJson = Ext.JSON.decode(operation.getResponse().responseText);
					if (responseJson["returncode"]=="ok" || responseJson["returncode"]=="success"){
						alias.removeFromContainer(theForm, navigationView);
						Ext.Msg.alert('', onSuccessMessage, Ext.emptyFn);
					}else{
						Ext.Msg.alert('Echec', 'Reessayez plus tard', Ext.emptyFn);
					}
				},
				failure: function(e){
					Ext.Msg.alert('Echec', 'Reessayez plus tard', Ext.emptyFn);
				}
			});
		}else{
			//reset previous error
			var previous_errors = theForm.query("panel[cls='fielderrortext']");
			for (var i=0; i<previous_errors.length;i++){
				previous_errors[i].setHidden(true);
			}

			validationErrors.each(function(){
				errortextfield = theForm.down('#'+this.getField()+'_error');
				if (errortextfield){
					errortextfield.setHtml(this.getMessage());
					errortextfield.setHidden(false);
					// console.log("set textfield not hidden with message"+this.getMessage());
					// console.log(errortextfield);
				}
				return true;
			});
		}
	},

	removeFromContainer: function(form, container){
		//console.log('MyApp.controller.Main - removeFromContainer() - need override');
		// Override
	},
	onTapButAgencyFacebook:function(){
		//console.log('MyApp.controller.Main - onTapButAgencyFacebook()');
		var agencypage = Ext.ComponentQuery.query('#agencypage')[0];
		var agencyDetailModel=agencypage.model;
		window.plugins.childBrowser.openExternal(agencyDetailModel.get('facebook'));

	},
	onTapButAgencyTwitter:function(){
		//console.log('MyApp.controller.Main - onTapButAgencyTwitter()');
		var agencypage = Ext.ComponentQuery.query('#agencypage')[0];
		var agencyDetailModel=agencypage.model;
		window.plugins.childBrowser.openExternal(agencyDetailModel.get('twitter'));

	},
	onTapButAgencyPhone:function(){
		//console.log('MyApp.controller.Main - onTapButAgencyPhone()');
		var agencypage = Ext.ComponentQuery.query('#agencypage')[0];
		var agencyDetailModel=agencypage.model;
		var MB = Ext.MessageBox;
		Ext.apply(MB, {
				YES: { text: 'Appeler', itemId: 'yes', ui: 'action' }
		});
		Ext.apply(MB, {
				NO: { text: 'Annuler', itemId: 'no' }
		});
		Ext.apply(MB, {
				YESNO: [Ext.MessageBox.NO, Ext.MessageBox.YES]
		});
		var msg = Ext.Msg.confirm(agencyDetailModel.get('tel'),'',
			function(r){
				if(r == 'yes'){
					var regExp=/ /g;
					var tel=agencyDetailModel.get('tel').replace(regExp,'');
					if (device.platform=='iPhone'){
						window.plugins.PhoneDialer.dial(tel);
						//window.plugins.PhoneDialer.dial('0160929604');
					}else{
						document.location.href = 'tel:' + agencyDetailModel.get('tel');
					}
				}
			}
		);
	},
	// Highligth detail view
	onTapButtonHighlightGo:function(){
		//console.log('MyApp.controller.Main - onTapButtonHighlightGo() - need override');
	},
	// Fired when the user click on button 'Add To Favorite' in SearchResultsDetail
	onTapButtonHighlightDetailAddRealEstateToFavorite: function(button, event,opts){
		// console.log('MyApp.controller.Main - onTapButtonHighlightDetailAddRealEstateToFavorite()');

		// Get the current record
		var highlightDetail = button.up("#highlight-detail"),
			recordToAdd = highlightDetail.getRecord();

		highlightDetail.hideButtonAddToFavorite();

		this.addToFavoriteRealEstate(recordToAdd);
	},
	onTapButtonShowAgencyMap: function(){
		//console.log('MyApp.controller.Main - onTapButtonShowAgencyMap() - need override');
		// Override
	},

	onTapButtonRequestAppraisal: function(){
		//console.log('MyApp.controller.Main - onTapButtonRequestAppraisal() - need override');
		// Override
	},
	onTapButtonHighlightDetailRequestMoreInfo: function(){
		//console.log('MyApp.controller.Main - onTapButtonHighlightDetailRequestMoreInfo() - need override');
		// Override
	},

	getHighlightDetailView: function(){
		//console.log('MyApp.controller.Main - getHighlightDetailView() - need override');
		// Override
	},

	showHighlightView: function(highlightDetailView){
		//console.log('MyApp.controller.Main - showHighlightView() - need override');
		// Override
	},

	// Home section
	// -----------------------------------------------------------------------

	// -----------------------------------------------------------------------
	// FavoriteRealEstateStore
	loadRealEstateImagesInCacheIfNeeded:function(record){
		var favoriteStore = Ext.getStore('FavoriteRealEstate');
		//save the image in the cache
		if (gIMAGECACHE_DIR){
			// console.log("cache favorite search image");
			//get the new agency logo
			var fileTransfer = new FileTransfer(),
				d = new Date(),
				field = 'img',
				field_cache ='img_cache'

			for (var i=0;i++;i<4){
				if (i>0){
					field = 'img'+i;
					field_cache = field+'_cache';
				}
				if (!record.get(field_cache)){
					fileTransfer.download(
						record.get(field),
						gIMAGECACHE_DIR+'/'+d.getTime()+'_'+field,
						function(entry){
							// console.log("file transfer successful");
							record.set(field_cache,entry.fullPath);
						},
						function(error){
							// console.log("download error source " + error.source);
							// console.log("download error target " + error.target);
							// console.log("download error code" + error.code);
						}
					);
				}
			}
		}else{
			// console.log("no cache dir => no persistent caching mechanism");
		}
	},

	addToFavoriteRealEstate: function(record){
		// console.log('MyApp.controller.Main - addToFavoriteRealEstate()');

		if (this.isRealEstateInFavorite(record) === false){
			var favoritestore = Ext.getStore('FavoriteRealEstate');
			favoritestore.add(record);
		}
	},
	// FavoriteRealEstateStore
	// -----------------------------------------------------------------------

	// -----------------------------------------------------------------------
	// FavoriteRealEstateList

	// Returns true if the idannonce is in the favorite list
	isRealEstateInFavorite: function(idannonce){
		// if the record is already saved as favorite
		var favoriteRealEstateStore = Ext.getStore('FavoriteRealEstate'),
			result = favoriteRealEstateStore.find('idannonce', idannonce);
		if (result === -1){
			return false;
		}else{
			return true;
		}
	},

	// Fired when a real estate is selected in FavoriteRealEstateList
	onFavoriteRealEstateListItemSelect: function(dataview, index, item, record, e, eOpts){
		//console.log('MyApp.controller.Main - onFavoriteRealEstateListItemSelect() - need override');
		//override
	},

	removeFavoriteRealEstate: function(recordToDelete,callback){
		this.removeModelFromStoreWithConfirm(recordToDelete,Ext.getStore('FavoriteRealEstate'),callback);
	},

	removeModelFromStoreWithConfirm: function(record,store,callback){
		// console.log('MyApp.controller.Main - removeModelFromStoreWithConfirm()');
		// Ask for confirmation
		var actionsheet = Ext.Viewport.add({
			xtype: 'actionsheet',
			items: [
				{
					xtype: 'button', text: 'Supprimer', ui: 'decline', scope: this,
					handler: function(){
						// Get the current record to delete
						// Remove the current record from the store FavoriteRealEstate
						store.remove(record);
						if (callback){
							callback();
						}
						// Hide Action Sheet
						actionsheet.hide();
					}
				},
				{
					xtype: 'button', text: 'Annuler', scope: this,
					handler: function(){
						// Hide Action Sheet
						actionsheet.hide();
					}
				}
			]
		});
		actionsheet.show();
	},

	// Fired when the user click on button 'Remove From Favorite' in RealEstateDetail
	onRemoveRealEstateFromFavorite: function(){
		// console.log('MyApp.controller.Main - onRemoveRealEstateFromFavorite()');
		var realEstateDetail = this.getFavoriteRealEstateDetail(),
			recordToDelete = realEstateDetail.getRecord();

		this.removeFavoriteRealEstate(
			recordToDelete,
			function(){
			}
		)
	},

	// "request more info" button
	onFavoriteRealEstateRequestMoreInfo: function(){
		// console.log('MyApp.controller.Main - onFavoriteRealEstateRequestMoreInfo()');

		//console.log("todo override");

		var favoriteRealEstateDetail = this.getFavoriteRealEstateDetail();
			realEstateModel = favoriteRealEstateDetail.getRecord(),
			favoriteRealEstatesNavigationView = this.getFavoriteRealEstateNavigationView(),
			moreInfoForm = this.getFavoriteRealEstateRequestAdMoreInfo();

		moreInfoForm.setRealEstateAd(realEstateModel);

		favoriteRealEstatesNavigationView.push(moreInfoForm);
	},

	// -----------------------------------------------------------------------
	// Locations

	// Fired when locations has been loaded from server.
	onLocationStoreLoad: function(){
		// console.log('MyApp.controller.Main - onLocationStoreLoad()');

		var locationStore = Ext.getStore('Location');

		// Create a new record of Location
		var locationRecord = Ext.create('MyApp.model.Location', {
			localisation: "TOUTES LOCALITES",
		});

		locationStore.insert(0, [locationRecord]);
	},

	onAgencyHightlightStoreLoad: function(){
		// console.log('MyApp.controller.Main - onAgencyHightlightStoreLoad()');

		var agencyHighlightStore = Ext.getStore('AgencyHighlight'),
			homepage = this.getHomepage();

		// Fill the homepage view
		if (homepage){
			homepage.setAgencyHighlights(agencyHighlightStore.getData());
		}
	},

	onChooseALocation: function(){
		// console.log('MyApp.controller.Main - onChooseALocation()');

		var locationStore = Ext.getStore('Location');

		if (this.global_pickerlocation === null){
			this.global_pickerlocation = Ext.Viewport.add({
				xtype: 'picker',
				fullscreen: true,
				height:400,
				slots: [
					{
						name : 'localisation',
						title: 'Localite',
						displayField: 'localisation',
						valueField: 'localisation',
						store: locationStore,
					}
				]
			});
			this.global_pickerlocation.on({
				scope: this,
				change: this.onChooseALocationSelect,
			});
		}

		this.global_pickerlocation.show();
	},

	onChooseALocationSelect: function(picker, selectedObject, eOpts){
		// console.log('MyApp.controller.Main - onChooseALocationSelect()');

		// if (selectedObject['localisation'] === "TOUTES LOCALITES"){
		//     // console.log("JE VEUX TOUTES LES LOCALITES");
		// }

		var searchForm = this.getSearchForm();
		searchForm.setValues({
			localisation: selectedObject['localisation'],
		});
		var fieldsetlocalisation = this.getFieldSetLocalisation();
		fieldsetlocalisation.setHidden(false);
	},

	// Locations

	// -----------------------------------------------------------------------
	// SEARCH SECTION

	onStartSearch: function(){
		// console.log('MyApp.controller.Main - onStartSearch()');

		// Load page 1
		this.doRequestSearchForPage(1);
		this.showSearchResultList();
	},
	
	showSearchResultList: function(){
		//console.log('MyApp.controller.Main - showSearchResultList() - need override');
		// Override
	},

	onSearchResultsListPreviousPage: function(){
		// console.log('MyApp.controller.Main - onSearchResultsListPreviousPage()');

		var currentpage = Ext.getStore('SearchResults').getAt(0).get('page');

		if (currentpage<=1){
			// alert('Premiere page');
		}else{
			this.doRequestSearchForPage(currentpage-1);
		}
	},

	onSearchResultsListNextPage: function(){
		// console.log('MyApp.controller.Main - onSearchResultsListNextPage()');

		var searchResults = Ext.getStore('SearchResults').getAt(0),
			currentpage = searchResults.get('page'),
			nbpages = searchResults.get('nbpages')

		if (currentpage===nbpages){
			// alert('Derniere page');
		}else{
			this.doRequestSearchForPage(currentpage+1);
		}
	},
	onToggleTri:function(){
		var picker = Ext.create('Ext.Picker', {
			height:'300px',
			width:'200px',
			align:'right',
			hideOnMaskTap:true,
			cancelButton:'Fermer',
			slots: [
				{
					name : 'Tri',
					title: 'Tri',
					data : [
						{text: 'Prix', value: 0},
						{text: 'Ville', value: 1},
						{text: 'Nbre de pièce', value: 2},
						{text: 'Surface habitable', value: 3}
					]
				}
			]
		});
		picker.on({
			scope: this,
			change: this.onChooseTri,
		});
		Ext.Viewport.add(picker);
		picker.show();
	},
	onChooseTri:function(picker, selectedObject, eOpts){
		var searchForm = this.getSearchForm();
		searchForm.setValues({
			tri: selectedObject['Tri'],
		});
		this.doRequestSearchForPage(1);
	},
	doRequestSearchForPage: function(page){
		// console.log('MyApp.controller.Main - doRequestSearchForPage()');
		var formValues = this.getSearchForm().getValues(),
			searchResultsStore = Ext.getStore('SearchResults'),
			searchParams = Ext.create('MyApp.model.Search', {
			idagence: this.global_idagence,
		});
		searchParams.fillFromForm(formValues);
		searchParams.set('page', page);

		// Show Loading Overlay
		this.doShowLoadingOverlay();

		// Call the webservice
		searchResultsStore.load({
			scope: this,
			params: searchParams.data,
			callback: this.onSearchResultsLoaded,
		});
	},

	// Fired when get results from server
	onSearchResultsLoaded: function(){
		// console.log('MyApp.controller.Main - onSearchResultsLoaded()');

		var searchResults = Ext.getStore('SearchResults').getAt(0),
			currentpage = searchResults.get('page'),
			nbpages = searchResults.get('nbpages'),
			nbannonces = searchResults.get('nbannonces');

		// Configure SearchResultList View
		var pagetext = Ext.ComponentQuery.query('#searchresultslistpagetext')[0];

		// Test if there are results
		if (currentpage === null){
			currentpage = 0;
		}
		if (nbpages === null){
			nbpages = 0;
		}
		if (nbannonces === null){
			nbannonces = 0;
		}

		//hide/show previous/next button depending on page
		var nextButton = this.getSearchResultNextButton(),
			previousButton = this.getSearchResultPreviousButton();

		if (nbpages===1){
			nextButton.setDisabled(true);
			previousButton.setDisabled(true);
		}else{
			if (currentpage < nbpages && nbpages > 0){
				nextButton.setDisabled(false);
			}
			if (currentpage===nbpages || nbpages===0){
				nextButton.setDisabled(true);
			}
			if (currentpage <= 1){
				previousButton.setDisabled(true);
			}
			if (currentpage > 1){
				previousButton.setDisabled(false);
			}
		}

		pagetext.setHtml('Page '+currentpage+'/'+nbpages+' (Annonces:'+nbannonces+')');

		// Set Store
		this.getSearchResultsList().setStore(searchResults.realestates());

		// Hide Loading Overlay
		this.doHideLoadingOverlay();

		if (this.getSearchResultsListPanel().getActiveItem()===this.getSearchResultsList()){
		}else{
			if (this.global_maprenderconfigured===true){
				this.onSearchResultsMapRender();
			}
		}

	},

	// Toggle List/Map in SearchResultsList
	onSearchResultsListToggleListMap: function(){
		// console.log('MyApp.controller.Main - onSearchResultsListToggleListMap()');

		if (this.getSearchResultsListPanel().getActiveItem()===this.getSearchResultsList()){
			// Go to Map mode
			this.getSearchResultsListPanel().setActiveItem(1);
			this.getSearchResultToggleListMapButton().setText('Liste');

			var gMap = this.getSearchResultsMap();

			if (this.global_maprenderconfigured === false){
				// console.log('Main.js - gMap.addListener for event maprender');
				this.global_maprenderconfigured = true;
				gMap.addListener('maprender', this.onSearchResultsMapRender());
				gMap.getMap().setOptions({
					center : new google.maps.LatLng(46.227638, 2.213749),
					zoom : 5,
					mapTypeId : google.maps.MapTypeId.ROADMAP,
					navigationControl : true,
					navigationControlOptions : {
						style : google.maps.NavigationControlStyle.DEFAULT
					}
				});
				this.onSearchResultsMapRender();
			}else{
				this.onSearchResultsMapRender();
			}
		}else{
			// Go to List mode
			this.getSearchResultsListPanel().setActiveItem(0);
			this.getSearchResultToggleListMapButton().setText('Carte');
		}
	},

	// Deletes all markers in the array global_mapmarkersarray by removing references to them
	deleteMarkersFromMap: function(){
		// console.log('MyApp.controller.Main - deleteMarkersFromMap()');
		if (this.global_mapmarkersarray){
			for (i in this.global_mapmarkersarray){
			this.global_mapmarkersarray[i].setMap(null);
			}
			this.global_mapmarkersarray.length = 0;
		}
	},

	onSearchResultsMapRender: function(){
		// console.log('MyApp.controller.Main - onSearchResultsMapRender()');

		var gMap = this.getSearchResultsMap();

		// Delete existing markers
		this.deleteMarkersFromMap();

		// Create and add the markers from SearchResults
		var realestates = Ext.getStore('SearchResults').getAt(0).realestates();

		if (realestates.getCount() > 0){
			var realestate, lat, lng;
			// http://blog.shamess.info/2009/09/29/zoom-to-fit-all-markers-on-google-maps-api-v3/
			var bounds = new google.maps.LatLngBounds();
			var hasMarkers = 0;

			for (var i=0; i < realestates.getCount(); i++){
				realestate = realestates.getAt(i);
				lat = realestate.get('lat');
				lng = realestate.get('lng');
				if (lat && lng){

					// Add marker
					var marker = new google.maps.Marker({
						position: new google.maps.LatLng(lat, lng),
						// animation: google.maps.Animation.DROP,
						title: realestate.get('idannonce').toString(),
						map: gMap.getMap()
					});
					marker.realestate = realestate;

					// And increase the bounds to take this point
					bounds.extend(marker.get('position'));

					hasMarkers = 1;

					var alias = this;

					if (Ext.os.is.iOS || Ext.os.is.Android){
						google.maps.event.addListener(marker, 'mousedown', function(){
							alias.onSearchResultsListItemSelect(null, this.realestate, null);
						});
					}else{
						google.maps.event.addListener(marker, 'mousedown', function(){
							alias.onSearchResultsListItemSelect(null, this.realestate, null);
						});
					}

					this.global_mapmarkersarray.push(marker);
				}

				realestate = null;
			};

			if (hasMarkers===1){
				//  Fit these bounds to the map
				gMap.getMap().fitBounds(bounds);
			}else{
				Ext.Msg.alert('Annonces', 'Aucune annonce geolocalise.', Ext.emptyFn);
			}
		}else{
			Ext.Msg.alert('Annonces', 'Aucune annonce geolocalise.', Ext.emptyFn);
		}
	},

	// Fired when a real estate is selected in SearchResultsList
	onSearchResultsListItemSelect: function(dataview, record, eOpts){
		// console.log('MyApp.controller.phone.Main - onSearchResultsListItemSelect()');

		// // Create RealEstateDetail View and push it
		// var realEstateView = this.createRealEstateDetailView();
		// realEstateView.setItemId('searchresultsdetail');
		// this.showRealEstateDetailView(realEstateView);

		var searchDetailStore = Ext.getStore('SearchDetail');
		searchDetailStore.load({
			scope: this,
			params: {
				idagence: this.global_idagence,
				idannonce: record.get('idannonce'),
			},
			callback: function(){
				var searchDetailRecord = searchDetailStore.getData().getAt(0);

				searchDetailRecord.set('idagence', this.global_idagence);
				searchDetailRecord.set('idannonce', record.get('idannonce'));
				searchDetailRecord.set('img', record.get('img'));

				// Create RealEstateDetail View and push it
				var realEstateView = this.createRealEstateDetailView();

				if (realEstateView){
					realEstateView.setItemId('searchresultsdetail');
					realEstateView.setWithNewRecord(searchDetailRecord);
					this.showRealEstateDetailView(realEstateView);
				}

				// Hide Loading Overlay
				this.doHideLoadingOverlay();
			},
		});

		// Show Loading Overlay
		this.doShowLoadingOverlay();
	},

	// Save the search in favorite
	onSearchResultsListAddSearchToFavorite: function(){
		// console.log('MyApp.controller.Main - onSearchResultsListAddSearchToFavorite()');
		var formValues = this.getSearchForm().getValues(),
			searchResultsStore = Ext.getStore('SearchResults'),
			searchNotificationModel = Ext.create('MyApp.model.SearchNotification',{
				deviceId: device.uuid
			});
		var searchModel = Ext.create('MyApp.model.Search', {
			idagence: this.global_idagence
		});
		searchModel.fillFromForm(formValues);
		var favoriteSearchStore = Ext.getStore('FavoriteSearch');
		//@TODO FIX
		searchNotificationModel.searchModel = searchModel;
		searchNotificationModel.save({
			success: function(record, operation){
				var responseJson = Ext.decode(operation.getResponse().responseText);
				if (responseJson["result"] =="success"){
					// Save searchnotificationserverid
					searchModel.set("searchnotificationserverid",responseJson["id"]);
					// Save latest
					searchModel.set("latest",searchResultsStore.getAt(0).get('latest'));
					// Save latestid
					searchModel.set("latestid",searchResultsStore.getAt(0).get('latestid'));
					favoriteSearchStore.add(searchModel);
					favoriteSearchStore.sync();
					Ext.Msg.alert('Recherche', 'Sauvegarde effectu&eacute;e.', Ext.emptyFn);
				}else{
					Ext.Msg.alert('Recherche', 'Pas de sauvegarde possible, reessayez plus tard', Ext.emptyFn);
				}
			},
			failure: function(record,operation){
				Ext.Msg.alert('Recherche', 'Pas de sauvegarde possible, reessayez plus tard', Ext.emptyFn);
			}
		});
	},
	// Fired when the user click on button 'Add Real Estate To Favorite' in SearchResultsDetail
	onSearchResultsDetailAddRealEstateToFavorite: function(){
		// console.log('MyApp.controller.Main - onSearchResultsDetailAddRealEstateToFavorite()');

		var searchResultsDetail = this.getSearchResultsDetail(),
			recordToAdd = searchResultsDetail.getRecord();

		searchResultsDetail.hideButtonAddToFavorite();

		this.addToFavoriteRealEstate(recordToAdd);

		Ext.Msg.alert('Annonce', 'Sauvegarde effectu&eacute;e.', Ext.emptyFn);
	},

	// SearchResultsDetail "request more info" button
	onSearchResultsDetailRequestMoreInfo: function(){
		//console.log('MyApp.controller.Main - onSearchResultsDetailRequestMoreInfo() - need override');
		// OVERRIDE
	},
	onSearchResultsDetailCall: function(){
		//console.log('MyApp.controller.Main - onSearchResultsDetailCall()');

// 		var realEstateModel = this.getSearchResultsDetail().getRecord(),
// 		moreInfoForm = Ext.create("MyApp.view.phone.RequestAdMoreInfo",{});
// 		moreInfoForm.setItemId("searchrequestadmoreinfo");
// 		moreInfoForm.setRealEstateAd(realEstateModel);
// 
// 		this.getSearchNavigationView().push(moreInfoForm);
	},
	showMoreInfoForm: function(moreInfoForm){
		//console.log('MyApp.controller.Main - showMoreInfoForm() - need override');
		//Override on profile
	},

	// SEARCH SECTION
	// -----------------------------------------------------------------------

	// -----------------------------------------------------------------------
	// FAVORITE SEARCH SECTION

	// Returns true if the idannonce is in the favorite list
	isRealEstateInFavorite: function(idannonce){
		// if the record is already saved as favorite
		var result = Ext.getStore('FavoriteRealEstate').find('idannonce', idannonce);
		if (result === -1){
			return false;
		}else{
			return true;
		}
	},

	onListItemTapDoDeselect: function(list, index, item, e){
		// console.log('MyApp.controller.Main - onListItemTapDoDeselect()');
		setTimeout(function(){list.deselect(index);},500);
	},

	// Fired when a favorite search is selected in FavoriteSearchList
	onFavoriteSearchListItemSelect: function(dataview, index, item, record, e, eOpts,bypassButtonCheck){
		// console.log('MyApp.controller.Main - onFavoriteSearchListItemSelect()');

		if (!(bypassButtonCheck==true)&& this.didTapOnButton(e)){
			return;
		}

		// Reset the flag
		// Reset flaghasnew to true and needrefresh to true
		if (record){
			if (item.down('#favoritesearchlistbuttonnew')){
				if (!item.down('#favoritesearchlistbuttonnew').isHidden()){
					// console.log('Hide Flag');
					item.down('#favoritesearchlistbuttonnew').setCls('favoritesearchlist-buttonnewgrey');
				}
			}

			record.set('flaghasnew', 0);
			record.set('needrefresh', 1);
		}

		// Deselect the item
		setTimeout(function(){dataview.deselect(index);},500);

		var tabpanel = Ext.ComponentQuery.query('#apptabpanel')[0];
		if (tabpanel){

			// Fill up the form with the current record
			this.getSearchForm().setRecord(record);

			// Reset the Search Section if needed
			this.resetSearchSectionToForm();

			this.onStartSearch();
			
			// Show the search section
			tabpanel.setActiveItem(this.getSearchSection());
			
		}
	},
	onFavoriteSearchListUpdateSearch:function(dataview, index, item, record, e, eOpts,bypassButtonCheck){
		// console.log('MyApp.controller.Main - onFavoriteSearchListItemSelect()');

		var tabpanel = Ext.ComponentQuery.query('#apptabpanel')[0];
		if (tabpanel){

			// Fill up the form with the current record
			this.getSearchForm().setRecord(record);

			// Reset the Search Section if needed
			this.resetSearchSectionToForm();

			// Show the search section
			tabpanel.setActiveItem(this.getSearchSection());
		}
	},
	resetSearchSectionToForm:function(){
		//console.log('MyApp.controller.Main - resetSearchSectionToForm() - need override');
	},

	removeFavoriteSearch: function(recordToDelete, callback){
		//remove on the server first, then in the callback remove locally
		//create a SearchNotification object
		var searchNotification = MyApp.model.SearchNotification.create({
				deviceId : device.uuid
			});

		searchNotification.searchModel = recordToDelete;

		var actionsheet = Ext.Viewport.add({
			xtype: 'actionsheet',
			items:[
				{
					xtype: 'button', text: 'Supprimer', ui: 'decline', scope: this,
					handler: function(){
						// console.log('removeFavoriteSearch - Confirm Delete Record');
						searchNotification.removeFromServer({
							success: function(response){
								// console.log('removeFavoriteSearch success : '+response.responseText);

								var decode = Ext.decode(response.responseText);
								if (decode.result=='success' || decode.response==''){
									var localStore = Ext.getStore('FavoriteSearch');
									localStore.remove(recordToDelete);
								}else{
									// console.log("base result code in response");
									Ext.Msg.alert('Recherche Favorite', 'Une erreur est survenue. Veuillez essayer plus tard.', Ext.emptyFn);
								}

							},
							failure: function(response,e){
								// console.log('removeFavoriteSearch error :');
								Ext.Msg.alert('Recherche Favorite', 'Une erreur est survenue. Veuillez essayer plus tard.', Ext.emptyFn);

							}
						});
						// Hide Action Sheet
						actionsheet.hide();
					}
				},
				{
					xtype: 'button', text: 'Annuler', scope: this,
					handler: function(){
						// console.log('removeFavoriteSearch - Cancel Delete Record');
						// Hide Action Sheet
						actionsheet.hide();
					}
				}
			]
		});
		actionsheet.show();

	},

	// FAVORITE SEARCH SECTION
	// -----------------------------------------------------------------------


});

Ext.define('MyApp.view.phone.SearchForm', {
	extend:'Ext.form.Panel',
	xtype:'searchform_phone',
	config:{
		title: 'Recherche',
		cls:['searchform','phone'],
		itemId:'searchform',
		standardSubmit:false,
		items : [
			{
				xtype:'panel',
				width:'100%',
				height:'100%',
				itemId:'searchformagencyname',
				cls:'searchform-agency-name',
				html:'',
			},
				{
					xtype:'panel',
					layout:{
						type:'vbox',
					},
					items:[
						// Button Submit
						{ xtype:'button', itemId:'submit-search', text:'Lancer la recherche', cls:['submit-search']},
					],
				},

				// searchnotificationserverid
				{ xtype: 'textfield', name: 'searchnotificationserverid', label: "searchnotificationserverid", hidden: true, readOnly: true },
				{ xtype: 'numberfield', name: 'tri', label: "tri", hidden: true, readOnly: true },

				{ xtype:'spacer', height:20 },
				// Localite
				{
					xtype: 'panel',
					html: 'Localit&eacute;',
					cls:['h2','phone'],
				},
				{ xtype: 'button', itemId:'buttonchoosealocation', cls:'small-button-request-more-info', text: 'Choisir une localit&eacute;' },
				{ xtype:'spacer',
					height:5,
					width:'100%'
				},
				{
					xtype: 'fieldset',
					itemId:'fieldsetlocalisation',
					hidden:true,
					items: [
						// Location
						{ xtype: 'textfield', name: 'localisation', itemId:'searchformlocalisation', readOnly: true, cls: 'searchformlocalisation' },
					]
				},

				// Transaction
				{
					xtype: 'panel',
					html: 'Transaction',
					cls:['h2','phone'],
				},
				{
					xtype: 'fieldset',
					items: [
						{ xtype: 'checkboxfield', name: 'vente', label: 'Vente', checked: false, labelWidth:"50%" },
						{ xtype: 'checkboxfield', name: 'location', label: 'Location', checked: false, labelWidth:"50%"  },
						{ xtype: 'checkboxfield', name: 'locationsaisonniere', label: 'Location Saisonniere', checked: false, labelWidth:"50%" },
						{ xtype: 'checkboxfield', name: 'viager', label: 'Viager', checked: false, labelWidth:"50%"  },
					]
				},

				// Biens
				{
					xtype: 'panel',
					html: 'Type de bien',
					cls:['h2','phone'],
				},
				{
					xtype: 'fieldset',
					items: [
						// maison
						{ xtype: 'checkboxfield', name: 'maison', label: 'Maison', checked: false, labelWidth:"50%" },
						// appartement
						{ xtype: 'checkboxfield', name: 'appartement', label: 'Appartement', checked: false, labelWidth:"50%" },
						// villa
						{ xtype: 'checkboxfield', name: 'villa', label: 'Villa', checked: false, labelWidth:"50%" },
						// mas
						{ xtype: 'checkboxfield', name: 'mas', label: 'Mas', checked: false, labelWidth:"50%" },
						// terrain
						{ xtype: 'checkboxfield', name: 'terrain', label: 'Terrain', checked: false, labelWidth:"50%" },
						// immeuble
						{ xtype: 'checkboxfield', name: 'immeuble', label: 'Immeuble', checked: false, labelWidth:"50%" },
						// loft
						{ xtype: 'checkboxfield', name: 'loft', label: 'Loft', checked: false, labelWidth:"50%" },
						// parking
						{ xtype: 'checkboxfield', name: 'parking', label: 'Parking', checked: false, labelWidth:"50%" },
						// batiment
						{ xtype: 'checkboxfield', name: 'batiment', label: 'Batiment', checked: false, labelWidth:"50%" },
						// bureau
						{ xtype: 'checkboxfield', name: 'bureau', label: 'Bureau', checked: false, labelWidth:"50%" },
						// chateau
						{ xtype: 'checkboxfield', name: 'chateau', label: 'Chateau', checked: false, labelWidth:"50%" },
						// hotel
						{ xtype: 'checkboxfield', name: 'hotel', label: 'Hotel', checked: false, labelWidth:"50%" },
						// boutique
						{ xtype: 'checkboxfield', name: 'boutique', label: 'Boutique', checked: false, labelWidth:"50%" },
						// duplex
						{ xtype: 'checkboxfield', name: 'duplex', label: 'Duplex', checked: false, labelWidth:"50%" },
					]
				},

				{
					xtype: 'panel',
					html: 'Nombre de pi&egrave;ces',
					cls:['h2','phone'],
				},
				{
					xtype: 'fieldset',
					items: [
						// F1
						{ xtype: 'checkboxfield', name: 'F1', label: 'F1', checked: false, labelWidth:"50%" },
						// F2
						{ xtype: 'checkboxfield', name: 'F2', label: 'F2', checked: false, labelWidth:"50%" },
						// F3
						{ xtype: 'checkboxfield', name: 'F3', label: 'F3', checked: false, labelWidth:"50%" },
						// F4
						{ xtype: 'checkboxfield', name: 'F4', label: 'F4', checked: false, labelWidth:"50%" },
						// F5
						{ xtype: 'checkboxfield', name: 'F5', label: 'F5', checked: false, labelWidth:"50%" },
					]
				},

				{
					xtype: 'panel',
					html: 'Surface en m&sup2;',
					cls:['h2','phone'],
				},
				{
					xtype: 'fieldset',
					items: [
						// surfaceh_min
						{ xtype: 'numberfield', name: 'surfaceh_min', label: 'Surface min', labelWidth:"50%" },
						// surfaceh_max
						{ xtype: 'numberfield', name: 'surfaceh_max', label: 'Surface max', labelWidth:"50%" },
						// surfaceterr_min
						{ xtype: 'numberfield', name: 'surfaceterr_min', label: 'Surface ter min', labelWidth:"50%" },
						// surfaceterr_max
						{ xtype: 'numberfield', name: 'surfaceterr_max', label: 'Surface ter max', labelWidth:"50%" },
					]
				},
				{
					xtype: 'panel',
					html: 'Budget en euros',
					cls:['h2','phone'],
				},
				{
					xtype: 'fieldset',
					items: [
						// prixa
						{ xtype: 'numberfield', name: 'prixa', label: 'Prix minimum', labelWidth:"50%" },
						// prixb
						{ xtype: 'numberfield', name: 'prixb', label: 'Prix maximum', labelWidth:"50%" }
					]
				},


				// Button Submit
				{ xtype:'button', itemId:'submit-search', cls:['submit-search'], text:'Lancer la recherche',  },
		]
	},
	setAgencyModel: function(agencyDetailModel){
		if (agencyDetailModel){
			if (agencyDetailModel.get('logo')){
				this.down('#searchLogo').setSrc(agencyDetailModel.get('logo'));
			}
		}
	}
});
Ext.define('MyApp.view.phone.SearchResultsList', {
	extend:'Ext.Panel',
	xtype:'searchresultslist_phone',
	config:{
		//itemId:'searchresultslistview',
		title:'Resultats',
		layout:'fit',
		items:[
			{
				xtype:'toolbar',
				cls:['searchtoolbar','phone'],
				docked:'bottom',
				items:[
					{ xtype:'spacer'},
					{ xtype:'button', ui:'tri', text:'Tri', width:40, itemId:'searchresultlistbuttontoggletri', },
					{ xtype:'button', text:' - ', ui:'back', width:20, itemId:'searchresultslistbuttonpreviouspage'},
					{ xtype:'spacer', width:5 },
					{ xtype:'panel', html:'Page 0/0', cls:['searchresultslistpagetext','phone'], width:80, itemId:'searchresultslistpagetext'},
					{ xtype:'spacer', width:5 },
					{ xtype:'button', text:' + ', ui:'forward', width:20, itemId:'searchresultslistbuttonnextpage'},
					{ xtype:'spacer', width:5 },
					{ xtype:'button', ui:'map', text:'Carte', width:60, itemId:'searchresultslistbuttontogglelistmap', },
					{ xtype:'spacer'},
				],
			},
			{
				xtype:'panel',
				itemId:'searchresultslistpanel',
				layout:'card',
				items: [
					{
						xtype:'list',
						itemId:'searchresultslist',
						mode:'SINGLE',
						allowDeselect:true,
						itemTpl: [
							'<div class="listItem">',
							'<img src={img} class="searchresultslistitemimg">',
								'<div>',
								'<div class="realestatedetailpricetext phone">{prix} &#8364;',
								'<tpl if="bien== &quot;Location&quot;">',
								'<span class="realestatedetailbien phone">Location','</span>',
								"</tpl>",
								'</div>',
									'<div class="realestatedetaillocationtext phone">',
										"<tpl if='ville' != null>",
											'{ville}',
										"</tpl>",
										"<tpl if='cp' != null>",
											'({cp})',
										"</tpl>",
									'</div>',
									'<div class="searchresultslistitemtypebientext phone">{typebien}',
									'</div>',
									'<div class="searchresultslistitemtypebientext phone">',
										"<tpl if='typesurface' != null>",
											'{typesurface}  piece(s)',
											"<tpl if='surfaceh' != null>",
											' - {surfaceh} m&sup2;',
											"</tpl>",
										"<tpl else>",
											"<tpl if='surfaceterr' != null>",
											'{surfaceterr} m&sup2;',
											"</tpl>",
										"</tpl>",
									'</div>',
								'</div>',
								'</br>',
							'</div>'
						],
						items: [
							{
								xtype:'panel',
								width:'100%',
								height:'100%',
								itemId:'searchresultlistagencyname',
								cls:'searchresultlist-agency-name',
								html:'',
							},
						]

					},
					{
						xtype:'map',
						itemId:'searchresultsmap',
					},
			]
		},
		]
	},
});

Ext.define('MyApp.view.phone.Thumbnails', {
	extend:'Ext.Carousel',

	config:{
		title:'Photos',
		direction:'horizontal',
		directionLock: true,
		indicator:true,
		fullscreen:true,
		itemId:'thumbnail-carousel',
		ui:'light',
		cls:['thumbnail-carousel'],
// 		listeners:{
// 			activeitemchange: function(){
// 				var nbphotoArray = this.getItems();
// 				var nbphoto = nbphotoArray.length;
// 				this.config.title='';
// 				this.config.title=(this.getActiveIndex() + 1) + ' sur ' + nbphoto;
// 			}
// 		}
	},
	fillCarousel: function(realEstateThumbnailStore,indice){
		var carousel=this,
			i=0,
			items=[],
			elem=null;
		for (;i<realEstateThumbnailStore.length;i++){
			elem = realEstateThumbnailStore.items[i];
			//console.log(elem.data['idphoto']);
			//console.log(elem.data['img']);
			items.push(
				{
					xtype:'image',
					itemId:elem.data['idphoto'],
					cls:['thumbnail','phone'],
					src:elem.get('img'),
					model:elem,
// 					mode:'image'
				}
			);
		}
		carousel.setItems(items);
		carousel.setActiveItem(indice);
	},
});
Ext.define('MyApp.view.phone.RealEstateMap', {
	extend:'Ext.Panel',    
	xtype:'realestatemap_phone',
	config:{
		layout:{
			type:'fit',
		},
		title:'Geolocalisation',
		items:[
			{
				xtype:'map',
				itemId:'realEstateMap',
			},
		],
	},

	initGMapWithRealEstateModel:function(model){
		//console.log('MyApp.view.phone.RealEstateMap - initGMapWithRealEstateModel model is ');
// 		console.log(model);
		var sencha_map = this.down("#realEstateMap");
		var map = sencha_map.getMap(),
			pos = new google.maps.LatLng(model.get("lat"),model.get("lng"));
		this.pos = pos;
		if (!this.agencyMarker){
			this.agencyMarker = new google.maps.Marker({
				map: map,
				position: pos,
				animation:google.maps.Animation.DROP,
				title: model.get("ville"),
				visible:true
			});
		}
		map.panTo(pos);
	},
	mapPanToCenter: function(){
		var sencha_map = this.down("#realEstateMap");
		var map = sencha_map.getMap();
		map.panTo(this.pos);
	},
});
Ext.define('MyApp.view.phone.AgencyMap', {
    extend:'Ext.Panel',    
    xtype:'agencymap_phone',
    
    config:{
        layout:{
            type:'fit',
        },
        title:'Agence',
        items:[
            {
                xtype:'map',
                itemId:'agencyMap',
            },
        ],
    },

    initGMapWithAgencyModel:function(model){
    	// console.log('MyApp.view.phone.AgencyMap - initGMapWithAgencyModel()');
    	// console.log(model);
        var sencha_map = this.down("#agencyMap");
        var agencyDetailModel = model;
        var map = sencha_map.getMap(),
            pos = new google.maps.LatLng(agencyDetailModel.get("lat"),agencyDetailModel.get("lng"));

        if (!this.agencyInfoWindow)
        {
            this.agencyInfoWindow = new google.maps.InfoWindow({
                map: map,
                position: pos,
                content: agencyDetailModel.get("nom"),
                visible:true
            });
        }
        if (!this.agencyMarker){
                this.agencyMarker = new google.maps.Marker({
                    map: map,
                    position: pos,
                    // animation:google.maps.Animation.DROP,
                    title: agencyDetailModel.get("nom"),
                    visible:true
                });
            }
        map.panTo(pos);
    },

});

Ext.define('MyApp.view.HomePage', {
    extend: 'Ext.Container',
    firstTimePainted:true,
    initialize: function() {
        //console.log("MyApp.view.Homepage.js - initialize()");
        this.callParent();
        this.addListener('painted', function(){
            //do the centering once the view is painted, otherwise the map is not centered properly
            this.refreshScreenFromModel();
        })
    },
        
        
    refreshScreenFromModel:function(){
        //Override
    },
    
    setAgencyHighlights:function(agencyHighlights){
        // console.log("MyApp.view.HomePage - setAgencyHighlights()");
        this.agencyHighlights = agencyHighlights;
        var carousel = this.down('carousel'),
            i=0,
            items=[],
            elem=null,
            button = null;
        
        for (;i<agencyHighlights.length;i++){
            elem = agencyHighlights.items[i];            
            items.push(
                {
                    xtype:'image',
                    itemId:elem.data['idannonce'],
                    cls:'highlight',
                    src:elem.get('photo'),
                    model:elem
                }
            );
        }
        carousel.setItems(items);
    },
    
    setActiveHighlight:function(highlightModel){
        // console.log("MyApp.view.HomePage - setActiveHighlight()");
        this.down('#highlight-title').setHtml(highlightModel.get('typebien') + " - " + highlightModel.get('ville'));
    },
});
Ext.define('MyApp.view.RealEstateDetail', {
	extend: 'Ext.form.Panel',

	// Returns true if the idannonce is in the favorite list
	isRealEstateInFavorite: function(idannonce){
		// console.log("MyApp.view.RealEstateDetail - isRealEstateInFavorite()");

		// if the record is already saved as favorite
		var favoriteRealEstateStore = Ext.getStore('FavoriteRealEstate');
		var result = favoriteRealEstateStore.find('idannonce', idannonce);

		if (result === -1){
			return false;
		}else{
			return true;
		}
	},

	setWithNewRecord: function(record){
		// console.log("MyApp.view.RealEstateDetail - setWithNewRecord()");

		// compile the optional fields
		record.generateOptionalFields();
		this.setRecord(record);

		// image initialization
		var imagetop = this.down('#realestatedetailimage'),
			image1 = this.down('#realestatedetailimage1'),
			image2 = this.down('#realestatedetailimage2'),
			image3 = this.down('#realestatedetailimage3'),
			image4 = this.down('#realestatedetailimage4'),
			optionalfields = this.down('#optionalfields'),
			realestatedetailshowmapbutton = this.down('#realEstateDetailShowMapButton');
			realestatedetailoptionalfieldset = this.down('#realestatedetailoptionalfieldset');
			realestatedetailoptionalfieldsetspacerbellow = this.down('#realestatedetailoptionalfieldsetspacerbellow');
			realestatedetailbien = this.down('#realestatedetailbientext'),
			realestatedetailpricetext = this.down('#realestatedetailpricetext'),
			realestatedetaillocationtext = this.down('#realestatedetaillocationtext'),
			realestatedetailtypebientext = this.down('#realestatedetailtypebientext'),
			realestatedetailsurfacenbpiecetext = this.down('#realestatedetailsurfacenbpiecetext'),
			realestatedetaildescriptiftext = this.down('#realestatedetaildescriptiftext'),
			realestatedetailoptionalfieldstext = this.down('#realestatedetailoptionalfieldstext'),
			realestatedetailoptionalfieldset = this.down('#realestatedetailoptionalfieldset'),
			realestatedetaillogo = this.down('#realestatedetaillogo'),
			realestatedetailcarousel = this.down('#realestatedetailcarousel');
			nbphoto = this.down('#nbPhoto');
			nbphotocount = this.down('#nbPhotoCount');
			agence = this.down('#agence'),
			agencercs = this.down('#agencercs'),
			agenceadresse = this.down('#agenceadresse'),
			agencelocalisation = this.down('#agencelocalisation'),
			agencetel = this.down('#agencetel'),
			DPE = this.down("#DPE"),
			dpeconso = this.down("#dpeconso"),
			dpeemission = this.down("#dpeemission");
			mensualite = this.down("#mensualite");
			imgspacer = this.down('#imgspacer');
			showimgspacer = false;
			mensualite.hide();
			financement = this.down("#financement");
			financement.hide();

		var agencyDetailStore = Ext.getStore("AgencyDetailCache");
		var agencyDetailModel = agencyDetailStore.getAt(0);

		//Logo
		realestatedetaillogo.setSrc(agencyDetailModel.get('logo'));

		// Agence
		agence.setHtml(record.get('agence'));

		//Adresse
		agenceadresse.setHtml(record.get('adresseAgence'));

		//Localisation
		agencelocalisation.setHtml(record.get('villeAgence') + '(' + record.get('cpAgence') + ')');

		//Tel
		agencetel.setHtml(record.get('telAgence'));

		//Rcs
		if(record.get('rcsAgence')){
			agencercs.setHtml('Rcs : ' + record.get('rcsAgence'));
		}else{
			agencercs.hide();
		}
		
		// DPE
		if (DPE && (record.get('consommation') || record.get('emission'))){

			DPE.show();

			// Consommation
			if (dpeconso && record.get('consommation')){
				dpeconso.setDPEconso(record.get('consommation'));
				dpeconso.show();
			}
			else{
				if (dpeconso){
					dpeconso.hide();
				}
			}

			// Emission
			if (dpeemission && record.get('emission')){
				dpeemission.setDPEemission(record.get('emission'));
				dpeemission.show();
			}
			else{
				if (dpeemission){
					dpeemission.hide();
				}
			}
		}
		else{
			if (DPE){
				DPE.hide();
			}
		}

		// Bien
		if (record.get('bien') == 'Location'){
			if (realestatedetailbien){
				realestatedetailbien.setHtml(' - ' + record.get('bien'));
			}
		}else{
// 			console.log('Bien is ' + record.get('bien'));
			mensualite.on({
				tap: function(){
					if (Ext.os.is.Desktop){
						document.location = 'http://www.cafpi.fr/iphone/calculatrices-montantmois.php';
					}else{
						window.plugins.childBrowser.openExternal('http://www.cafpi.fr/iphone/calculatrices-montantmois.php');
					}
				}
			});
			mensualite.show();
			financement.on({
				tap: function(){
					if (Ext.os.is.Desktop){
						document.location = 'http://www.cafpi.fr/iphone/demande-credit-immobilier.php?Apporteurbis=6910050';
					}else{
						window.plugins.childBrowser.openExternal('http://www.cafpi.fr/iphone/demande-credit-immobilier.php?Apporteurbis=6910050');
					}
				}
			});
			financement.show();
		}

		// Prix
		if (record.get('prix')){
			var pricetext = record.get('prix')+' &#8364;';
			if (record.get('bien')==='Location'){
				pricetext += ' **';
				var realestatedetailbienlocation = this.down('#realestatedetailbienlocation');
				if (realestatedetailbienlocation){
					realestatedetailbienlocation.show();
				}
			}else{
				if (record.get('bien')==='Vente'){
					pricetext += ' *';
				}

				var realestatedetailbienvente = this.down('#realestatedetailbienvente');
				if (realestatedetailbienvente){
					realestatedetailbienvente.show();
				}
			}
		}else{
			pricetext = ('Prix non indique');
		}
		realestatedetailpricetext.setHtml(pricetext);

		// Localite
		var localite = '';
		if (record.get('ville')){
			localite = record.get('ville');
			if (record.get('cp')){
				localite += ' ('+record.get('cp')+')';
			}
		}else{
			if (record.get('cp')){
				localite = record.get('cp');
			}else{
				localite = 'Lieu non indique'
			}
		}
		realestatedetaillocationtext.setHtml(localite);

		// typebien
		if (record.get('typebien')){
			realestatedetailtypebientext.setHtml(record.get('typebien'));
		}else{
			realestatedetailtypebientext.setHtml('Bien non indique');
		}

		// surfaceh
		var surfaceh= '';
		if (record.get('surfaceh')){
			if (record.get('typesurface')){
				surfaceh = record.get('typesurface')+' pi&egrave;ce';
				if (record.get('typesurface')>1){
					surfaceh += 's';
				}
			}
			surfaceh += ' - ' + record.get('surfaceh')+' m&sup2;';
		}else if(record.get('surfaceterr') && record.get('typebien') == 'Terrain'){
			surfaceh = record.get('surfaceterr') + ' m&sup2;';
		}else{
			surfaceh = 'Surface non indique';
		}
		
		realestatedetailsurfacenbpiecetext.setHtml(surfaceh);
		// descriptif
		realestatedetaildescriptiftext.setHtml(record.get('descriptif'));

		// additionalinfo
		var additionalinfo = record.get('additionalinfo');
		if (additionalinfo){
			var fieldSet=realestatedetailoptionalfieldset;
			var optionalInfoForm = Ext.create('Ext.form.Panel', {
				fullscreen: true,
			});
			var items=[];
			var tabInfo=additionalinfo.split('\n');
			for(var i=0;i<tabInfo.length;i++){
				var elem=tabInfo[i].split(':');
				if(elem[0] != '' && elem[1] != ''){
					items.push(
						{
							xtype:'panel',
							layout:'vbox',
							cls:['realestatedetailoptionalvbox','tablet'],
							items:[
								{
									xtype:'panel',
									layout:'hbox',
									items:[
										{xtype:'panel', flex:1, html:elem[0], cls:['additionalInfoName','phone']},
										{xtype:'panel', flex:0.7, html:elem[1],cls:['additionalInfoValue','phone']},
									],
								},
							],
						}
					);
				}
			}
			//additionalinfo = additionalinfo.replace(/\n/g, "<br />" );
			realestatedetailoptionalfieldset.setItems(items);
		}else{
			realestatedetailoptionalfieldset.hide();
			if(realestatedetailoptionalfieldsetspacerbellow){
				realestatedetailoptionalfieldsetspacerbellow.hide();
			}
		}

		// Photo
		var img = record.get('img_cache')?'file://'+record.get('img_cache'):record.get('img'),
			img1 = record.get('img1_cache')?'file://'+record.get('img1_cache'):record.get('img1'),
			img2 = record.get('img2_cache')?'file://'+record.get('img2_cache'):record.get('img2'),
			img3 = record.get('img3_cache')?'file://'+record.get('img3_cache'):record.get('img3'),
			img4 = record.get('img4_cache')?'file://'+record.get('img4_cache'):record.get('img4'),
			src = img?img:img1?img1:img2?img2:img3;

		if (imagetop){
			imagetop.setSrc(src);
		}

		// img1
		if (image1){
			if (img1){
				image1.setSrc(img1);
				image1.on({
					tap: this.onTapImage,
				});
				showimgspacer=true;
			}else{
				image1.hide();
			}
		}
		// img2
		if (image2){
			if (img2){
				image2.setSrc(img2);
				image2.on({
					tap: this.onTapImage,
				});
			}else{
				image2.hide();
			}
		}

		// img3
		if (image3){
			if (img3){
				image3.setSrc(img3);
				image3.on({
					tap: this.onTapImage,
				});
			}else{
				image3.hide();
			}
		}

		// img4
		if (image4){
			if (img4){
				image4.setSrc(img4);
				image4.on({
					tap: this.onTapImage,
				});
			}else{
				image4.hide();
			}
		}
		if(!showimgspacer){
			if(imgspacer){
				imgspacer.hide();
			}
		}
		if(img.match('default')){
			if(realestatedetailcarousel){
				realestatedetailcarousel.hide();
			}
		}
		var isFavorite = this.isRealEstateInFavorite(record.get('idannonce'));

		if (isFavorite == true){
			this.hideButtonAddToFavorite();
		}else{
			this.showButtonAddToFavorite();
		}

		// Geolocalisation
		if(record.get('lat') && record.get('lng')){
			if(realestatedetailshowmapbutton){
				realestatedetailshowmapbutton.show();
			}
		}else{
			if(realestatedetailshowmapbutton){
				realestatedetailshowmapbutton.hide();
			}
		}

		// nbPhoto && nbPhotoCount
		if(record.get('nbphoto') > 0 && nbphoto && nbphotocount){
			nbphoto.setHtml('Photos');
			nbphotocount.setHtml('(' + record.get('nbphoto') + ')');
		}
	},

	onTapImage: function(){
		//console.log("MyApp.view.RealEstateDetail - onTapImage() - need override");
	},

	showButtonAddToFavorite: function(){
		var button = this.query('#buttonaddtofavorite')[0];
		button.show();
	},

	hideButtonAddToFavorite: function(){
		var button = this.query('#buttonaddtofavorite')[0];
		button.hide();
	},
	
});
Ext.define('MyApp.view.RequestAdMoreInfo', {
    extend:'Ext.form.Panel',
    config: {
		title:'Informations',
        itemId:'requestadmoreinfo',
        cls:'form',
        standardSubmit: false,
        hideOnMaskTap:true,
        items : [
        
            { 
                xtype: 'hiddenfield', 
                name: 'idannonce' 
            },
            {
                xtype:'fieldset', title:'Informations de contact' , instructions:'Les champs contenant un (*) sont obligatoires',
                items:[
                    { xtype: 'selectfield', name: 'civilite', label: 'Civilit&eacute;', labelWidth:"50%", options:[{text:'Monsieur', value:'Mr.'},{text:'Madame', value:'Mme'}] },
                    { xtype: 'textfield', name: 'nom', label: 'Nom (*)', labelWidth:"50%" },
                    { xtype: 'panel', hidden:true , itemId:'nom_error' , cls:'fielderrortext', html:''},
                    { xtype: 'textfield', name: 'prenom', label: 'Pr&eacute;nom (*)', labelWidth:"50%" },
                    { xtype: 'panel', hidden:true , itemId:'prenom_error' , cls:'fielderrortext', html:''},
                    { xtype: 'textfield', name: 'email', label: 'E-mail (*)', labelWidth:"50%" },
                    { xtype: 'panel', hidden:true , itemId:'email_error' , cls:'fielderrortext', html:''},
                    { xtype: 'textfield', name: 'tel', label: 'T&eacute;l&eacute;phone (*)', labelWidth:"50%" },
                    { xtype: 'panel', hidden:true , itemId:'tel_error' , cls:'fielderrortext', html:''},
                ],
            },
            {
                xtype:'fieldset', 
                title:'Demande' , 
                items:[
                    { xtype: 'textareafield', name: 'message', label: 'Message (*)', labelWidth:"50%" },
                    { xtype: 'panel', hidden:true , itemId:'message_error' , cls:'fielderrortext', html:''},
                ]
            },
            
            // Button Submit
            { xtype:'button', ui:'action', itemId:'submit-request-moreinfo', text:'Envoyer' }
        ]
    },
    
    setRealEstateAd: function(realEstateModel){
//         console.log("MyApp.view.RequestAdMoreInfo - setRealEstateAd(): " + realEstateModel.get('idannonce'));
        this.setValues({
            'idannonce':realEstateModel.get('idannonce')
        });
    }
       
});
Ext.define('MyApp.view.FavoriteSearchListItem', {
	extend:'Ext.dataview.component.DataItem',

	updateRecord: function(r){
		// console.log("MyApp.view.phone.FavoriteSearchListItem - updateRecord()");
		// console.log(r);
		this.callParent(arguments);

		// HAS NEW UPDATE?
		var favoritesearchlistbuttonnew = this.down('#favoritesearchlistbuttonnew');
		if (r.get('flaghasnew')===1){
			favoritesearchlistbuttonnew.setCls('favoritesearchlist-buttonnew');
		}else{
			favoritesearchlistbuttonnew.setCls('favoritesearchlist-buttonnewgrey');
		}

		var localisation = r.get('localisation'),
			ville = this.down('#favoritesearchlistville'),
			description = this.down('#favoritesearchlistdescription'),
			bien = [],
			bien_all = r.biens(),
			bien_str='',
			typebien =[],
			typebien_str='',
			typebien_all = r.typesDeBiens(),
			nbpieces = [],
			nbpieces_str = '',
			i = 0,
			tmp=null;

		if (r.get("F1")){nbpieces.push("1");};
		if (r.get("F2")){nbpieces.push("2");};
		if (r.get("F3")){nbpieces.push("3");};
		if (r.get("F4")){nbpieces.push("4");};
		if (r.get("F5")){nbpieces.push("5");};
		nbpieces_str = (nbpieces.length==0||nbpieces.length==5?null:"nombre de pieces : "+nbpieces.join(','));

		for (i=0;i< typebien_all.length;i++){
			tmp = typebien_all[i];
			if (r.get(tmp)){
				typebien.push(tmp.charAt(0).toUpperCase() + tmp.slice(1));
			}
		}
		typebien_str = ((typebien.length == typebien_all.length) || (typebien.length ==0))?'Tous types de biens':typebien.join(',');

		for (i=0;i< bien_all.length;i++){
			tmp = bien_all[i];
			if (r.get(tmp)){
				if (tmp=='locationsaisonniere'){
					tmp = 'location saisonni&egrave;re';
				}
				bien.push(tmp.charAt(0).toUpperCase() + tmp.slice(1));
			}
		}
		bien_str = (bien.length == bien_all.length || bien.length==0)?'Tous biens':bien.join(',');

		description.setHtml(bien_str+' - '+typebien_str+(nbpieces_str?(' - '+nbpieces_str):''));

		if (localisation && localisation.length > 0){
			ville.setHtml(localisation);
		}else{
			ville.setHtml("Toutes localites");
		}
	}
});
Ext.define('MyApp.view.RealEstateListItem', {
	extend:'Ext.dataview.component.DataItem',


	adaptDescriptif:function(descriptif){
		return (descriptif);
	},

	updateRecord: function(newRecord) {
		// console.log('MyApp.view.phone.RealEstateListItem - updateRecord()');
		this.callParent(arguments);

		// IMAGE
		var realestatelistitemimage = this.down('#realestatelistitemimage'),
			favoriterealestateitempricetext = this.down('#favoriterealestateitempricetext'),
			favoriterealestateslistlocationtext = this.down('#favoriterealestateslistlocationtext'),
			favoriterealestateslisttypebientext = this.down('#favoriterealestateslisttypebientext'),
			favoriterealestateslistsurfacetext = this.down('#favoriterealestateslistsurfacetext');
			surface = '';
			descriptif = this.down('#favoriterealestateitemdescriptif');

		//IMAGE
		realestatelistitemimage.setSrc(newRecord.get('img'));

		// PRIX
		favoriterealestateitempricetext.setHtml(newRecord.get('prix')+' &#8364;');

		// LOCALITE
		var localite = '';
		if (newRecord.get('ville')){
			if (newRecord.get('cp')){
				localite = newRecord.get('ville')+' ('+newRecord.get('cp')+')';
			}else{
				localite = newRecord.get('ville');
			}
		}else{
			if (newRecord.get('cp')){
				localite = newRecord.get('cp');
			}
		}
		favoriterealestateslistlocationtext.setHtml(localite);

		// BIEN
		if (newRecord.get('typebien')){
			favoriterealestateslisttypebientext.setHtml(newRecord.get('typebien'));
		}

		// SURFACE
		if (newRecord.get('typesurface')){
			surface += newRecord.get('typesurface')+' piece';
			if (newRecord.get('typesurface')>1){
				surface += 's';
			}
			if (newRecord.get('surfaceh')){
				surface += ' - '+newRecord.get('surfaceh')+'m&sup2;';
			}
		}else{
			if (newRecord.get('surfaceh')){
				surface = newRecord.get('surfaceh')+'m&sup2;';
			}
		}
		favoriterealestateslistsurfacetext.setHtml(surface);

		//DESCRIPTIF
		if (descriptif){
			descriptif.setHtml(this.adaptDescriptif(newRecord.get('descriptif')));
		}
	},

});
Ext.define('MyApp.view.RequestSearchMandate', {
    extend:'Ext.form.Panel',
    
    config: {
        title:"Mandat Recherche",
        cls:'form',
        standardSubmit: false,
        hideOnMaskTap:true,
        items : [
            {xtype:'fieldset',title:'Informations de contact' , instructions:'Les champs contenant un (*) sont obligatoires',
                items:[
                    { xtype: 'selectfield', name: 'civilite', label: 'Civilit&eacute;', labelWidth:"50%", options:[{text:'Monsieur', value:'Mr.'},{text:'Madame', value:'Mme'}] },
                    { xtype: 'textfield', name: 'nom', label: 'Nom', labelWidth:"50%" },
                    { xtype: 'panel', hidden:true , itemId:'nom_error' , cls:'fielderrortext', html:''},
                    { xtype: 'textfield', name: 'prenom', label: 'Pr&eacute;nom', labelWidth:"50%" },
                    { xtype: 'panel', hidden:true , itemId:'prenom_error' , cls:'fielderrortext', html:''},
                    { xtype: 'textfield', name: 'email', label: 'E-mail', labelWidth:"50%" },
                    { xtype: 'panel', hidden:true , itemId:'email_error' , cls:'fielderrortext', html:''},
                    { xtype: 'textfield', name: 'tel', label: 'T&eacute;l&eacute;phone', labelWidth:"50%" },
                    { xtype: 'panel', hidden:true , itemId:'tel_error' , cls:'fielderrortext', html:''},
                ]
            },
            {xtype:'fieldset',title:'Description du bien' , instructions:'Les champs contenant un (*) sont obligatoires',
                items:[
                    { xtype: 'selectfield', name: 'Bien', label: 'Transaction', labelWidth:"50%", options:[{text:'Vente', value:'vente'},{text:'Location', value:'location'}]},
            
                    { xtype: 'checkboxfield', name: 'maison', label: 'maison', labelWidth:"50%" },
                    { xtype: 'panel', hidden:true , itemId:'maison_error' , cls:'fielderrortext', html:''},

                    { xtype: 'checkboxfield', name: 'appartement', label: 'appartement', labelWidth:"50%" },
                    { xtype: 'checkboxfield', name: 'villa', label: 'villa', labelWidth:"50%" },
                    { xtype: 'checkboxfield', name: 'mas', label: 'mas', labelWidth:"50%" },
                    { xtype: 'checkboxfield', name: 'terrain', label: 'terrain', labelWidth:"50%" },
                    { xtype: 'checkboxfield', name: 'immeuble', label: 'immeuble', labelWidth:"50%" },
                    { xtype: 'checkboxfield', name: 'loft', label: 'loft', labelWidth:"50%" },
                    { xtype: 'checkboxfield', name: 'parking', label: 'parking', labelWidth:"50%" },
                    { xtype: 'checkboxfield', name: 'batiment', label: 'batiment', labelWidth:"50%" },
                    { xtype: 'checkboxfield', name: 'bureau', label: 'bureau', labelWidth:"50%" },
                    { xtype: 'checkboxfield', name: 'chateau', label: 'chateau', labelWidth:"50%" },
                    { xtype: 'checkboxfield', name: 'boutique', label: 'boutique', labelWidth:"50%" },
                    { xtype: 'checkboxfield', name: 'duplex', label: 'duplex', labelWidth:"50%" },

                      /* au moins 1 */
                    { xtype: 'checkboxfield', name: 'F1', label: 'F1', labelWidth:"50%" },
                    { xtype: 'panel', hidden:true , itemId:'F1_error' , cls:'fielderrortext', html:''},
                    { xtype: 'checkboxfield', name: 'F2', label: 'F2', labelWidth:"50%" },
                    { xtype: 'checkboxfield', name: 'F3', label: 'F3', labelWidth:"50%" },
                    { xtype: 'checkboxfield', name: 'F4', label: 'F4', labelWidth:"50%" },
                    { xtype: 'checkboxfield', name: 'F5', label: 'F5', labelWidth:"50%" },

                      /* obligatoire */
                    { xtype: 'numberfield', name: 'surfaceh', label: 'Surface m2 (*)', labelWidth:"50%" },
                    { xtype: 'panel', hidden:true , itemId:'surfaceh_error' , cls:'fielderrortext', html:''},
                    { xtype: 'textfield', name: 'secteur', label: 'secteur', labelWidth:"50%" },
                    { xtype: 'panel', hidden:true , itemId:'secteur_error' , cls:'fielderrortext', html:''},
                    { xtype: 'numberfield', name: 'prixa', label: 'Prix minimum', labelWidth:"50%" },
                    { xtype: 'panel', hidden:true , itemId:'prixa_error' , cls:'fielderrortext', html:''},
                    { xtype: 'numberfield', name: 'prixb', label: 'Prix maximum', labelWidth:"50%" },
                    { xtype: 'panel', hidden:true , itemId:'prixb_error' , cls:'fielderrortext', html:''},
                ]
            },

            // Button Submit
            { xtype:'button', ui:'action', itemId:'submit-request-searchmandate', text:'Envoyer' }
        ]
    },
});
Ext.define('MyApp.model.RequestAgencyInfo', {
    extend: 'MyApp.model.CustomModelBase',
    config:
    {
        fields: [
			{name:'idagence',type:'int',defaultValue:''},
            {name:'civilite',type:'string' , defaultValue:''},
            {name:'nom',type:'string' , defaultValue:''},
            {name:'prenom',type:'string' , defaultValue:''},
            {name:'email',type:'string' , defaultValue:''},
            {name:'tel',type:'string' , defaultValue:''},
            {name:'message',type:'string' , defaultValue:''}    
        ],
        validations:[
            {type:'email',field:'email', message:'Veuillez entrer une adresse email valide'},
            {type:'presence',field:'prenom', min:1, message:'Veuillez entrer votre pr&eacute;nom'},
            {type:'presence',field:'nom', min:1 , message:'Veuillez entrer votre nom'},
            {type:'length',field:'tel', min:10, message:'Veuillez entrer un num&eacute;ro de t&eacute;l&eacute;phone valide'},
            {type:'presence',field:'message', min:1 , message:'Veuillez poser votre question dans le champs message'},
        ],
        proxy: {
                type: 'rest',
                appendId: false,
                actionMethods:{
                    create: "POST"
                    },
                api:{
                    // TEST SITE
                    // create:"http://acheterlouer/acheterlouer_logRequest.php"
                
                    // PRODUCTION
                    create:"http://iphone.acheter-louer.fr/perl/agences/smartphones/demandeinfo-agence.pl",
                },
                reader:{
                    type:'json'
                }
            }
    }
});

Ext.define('MyApp.view.RequestAdDeposit', {
    extend:'Ext.form.Panel',

    config: {
        itemId:'requestaddeposit',
        title:"Depot Annonce",
		cls:'form',
		standardSubmit: false,
        hideOnMaskTap:true,
		items : [
		    {xtype:'fieldset', title:'Informations de contact' , instructions:'Les champs contenant un (*) sont obligatoires',
		        items:[
        		    { xtype: 'selectfield', name: 'civilite', label: 'Civilit&eacute;', labelWidth:"50%", options:[{text:'Monsieur', value:'Mr.'},{text:'Madame', value:'Mme'}] },
        		    { xtype: 'textfield', name: 'nom', label: 'Nom (*)', labelWidth:"50%" },
        		    { xtype: 'panel', hidden:true , itemId:'nom_error' , cls:'fielderrortext', html:''},
        		    { xtype: 'textfield', name: 'prenom', label: 'Pr&eacute;nom (*)', labelWidth:"50%" },
        		    { xtype: 'panel', hidden:true , itemId:'prenom_error' , cls:'fielderrortext', html:''},
        		    { xtype: 'textfield', name: 'email', label: 'E-mail (*)', labelWidth:"50%" },
        		    { xtype: 'panel', hidden:true , itemId:'email_error' , cls:'fielderrortext', html:''},
        		    { xtype: 'textfield', name: 'tel', label: 'T&eacute;l&eacute;phone (*)', labelWidth:"50%" },
        		    { xtype: 'panel', hidden:true , itemId:'tel_error' , cls:'fielderrortext', html:''},
        		],
        	},
        	{xtype:'fieldset',title:'Description du bien' , 
        	    items:[
        	        /* au moins 1 */
        		    { xtype: 'selectfield', name: 'Bien', label: 'Transaction', labelWidth:"50%" , options:[{text:'Vente', value:'vente'},{text:'Location', value:'location'}]},
                        /* Au moins 1 */
                    { xtype: 'selectfield', name: 'Typebien', label: 'Type de bien', labelWidth:"50%" , options:[
                        {text:'maison', value:'maison'},
                        {text:'mas', value:'mas'},
                        {text:'appartement', value:'appartement'},
                        {text:'terrain', value:'terrain'},
                        {text:'immeuble', value:'immeuble'},
                        {text:'loft', value:'loft'},
                        {text:'parking', value:'parking'},
                        {text:'batiment', value:'batiment'},
                        {text:'bureau', value:'bureau'},
                        {text:'chateau', value:'chateau'},
                        {text:'hotel', value:'hotel'},
                        {text:'boutique', value:'boutique'},
                        {text:'duplex', value:'duplex'}
                        ]
                    },

                    /* au moins 1 */
                    { xtype: 'selectfield', name: 'Typesurface', label: 'Type de surface', labelWidth:"50%", options:[{text:'F1', value:'F1'},{text:'F2', value:'F2'},{text:'F3', value:'F3'},{text:'F4', value:'F4'},{text:'F5', value:'F5'}]},

                    /* obligatoire */
                    { xtype: 'numberfield', name: 'surfaceh', label: 'Surface m2 (*)', labelWidth:"50%" },
                    { xtype: 'panel', hidden:true , itemId:'surfaceh_error' , cls:'fielderrortext', html:''},
                    { xtype: 'textfield', name: 'secteur', label: 'Secteur (*)', labelWidth:"50%" },
                    { xtype: 'panel', hidden:true , itemId:'secteur_error' , cls:'fielderrortext', html:''},
                    { xtype: 'numberfield', name: 'prix', label: 'Prix en euros (*)', labelWidth:"50%" },
                    { xtype: 'panel', hidden:true , itemId:'prix_error' , cls:'fielderrortext', html:''},
                ]
            },
        
            // Button Submit
            { xtype:'button', ui:'action', itemId:'submit-request-addeposit', text:'Envoyer' }
        ]
    },
});
Ext.define('MyApp.view.RequestAppraisal', {
    extend:'Ext.form.Panel',
    
    config: {
        itemId:'requestappraisal',
        title:"Estimation",
        cls:'form',
        standardSubmit: false,
        hideOnMaskTap:true,
        items : [
        {xtype:'fieldset',title:'Informations de contact' , instructions:'Les champs contenant un (*) sont obligatoires',
    	    items:[
        		    {
                        xtype: 'selectfield', name: 'civilite', label: 'Civilit&eacute;', labelWidth:"50%",
                        options:[
                            {text:'Monsieur', value:'Mr.'},
                            {text:'Madame', value:'Mme'}
                        ]
                    },
                    { xtype: 'textfield', name: 'nom', label: 'Nom (*)', labelWidth:"50%" },
                    { xtype: 'panel', hidden:true , itemId:'nom_error' , cls:'fielderrortext', html:''},
                    { xtype: 'textfield', name: 'prenom', label: 'Pr&eacute;nom  (*)', labelWidth:"50%" },
                    { xtype: 'panel', hidden:true , itemId:'prenom_error' , cls:'fielderrortext', html:''},
                    { xtype: 'textfield', name: 'email', label: 'E-mail  (*)', labelWidth:"50%" },
                    { xtype: 'panel', hidden:true , itemId:'email_error' , cls:'fielderrortext', html:''},
                    { xtype: 'textfield', name: 'tel', label: 'T&eacute;l&eacute;phone  (*)', labelWidth:"50%" },
                    { xtype: 'panel', hidden:true , itemId:'tel_error' , cls:'fielderrortext', html:''},
                ]
            },

        {xtype:'fieldset',title:'Description du bien' , instructions:'Les champs contenant un (*) sont obligatoires',
            items:[
                 {
                    xtype: 'selectfield', name: 'Typebien', label: 'Type de bien', labelWidth:"50%",
                    options:[
                        {text:'maison', value:'maison'},
                        {text:'mas', value:'mas'},
                        {text:'appartement', value:'appartement'},
                        {text:'terrain', value:'terrain'},
                        {text:'immeuble', value:'immeuble'},
                        {text:'loft', value:'loft'},
                        {text:'parking', value:'parking'},
                        {text:'batiment', value:'batiment'},
                        {text:'bureau', value:'bureau'},
                        {text:'chateau', value:'chateau'},
                        {text:'hotel', value:'hotel'},
                        {text:'boutique', value:'boutique'},
                        {text:'duplex', value:'duplex'}
                    ]
                },

                {
                    xtype: 'selectfield', name: 'Typesurface', label: 'Type de surface', labelWidth:"50%",
                    options:[
                        {text:'F1', value:'F1'},
                        {text:'F2', value:'F2'},
                        {text:'F3', value:'F3'},
                        {text:'F4', value:'F4'},
                        {text:'F5', value:'F5'}
                    ]
                },
              
                  /* obligatoire */
                { xtype: 'numberfield', name: 'surfaceh', label: 'Surface m2 (*)', labelWidth:"50%" },
                { xtype: 'panel', hidden:true , itemId:'surfaceh_error', cls:'fielderrortext', html:''},
                { xtype: 'textfield', name: 'secteur', label: 'Secteur  (*)', labelWidth:"50%" },
                { xtype: 'panel', hidden:true , itemId:'secteur_error', cls:'fielderrortext', html:''},
            ]
        },

            // Button Submit
            { xtype:'button', ui:'action', itemId:'submit-request-appraisal', text:'Envoyer' }
        ]
    },
});
Ext.define('MyApp.view.tablet.SearchForm', {
	extend:'Ext.form.Panel',
	xtype:'searchform_tablet',
	config:{
		cls:['searchform','tablet'],
		standardSubmit: false,
		items : [
			{
				xtype:'panel',
				width:'100%',
				height:'100%',
				itemId:'searchformagencyname',
				cls:'searchform-agency-name',
				html:'',
			},
				// Button Submit
				{ xtype:'button',  cls:['submit-search','tablet'], itemId:'submit-search', text:'Lancer la recherche' },

				// searchnotificationserverid
				{ xtype: 'textfield', name: 'searchnotificationserverid', label: "searchnotificationserverid", hidden: true, readOnly: true },

				{
					xtype:'spacer',
					height:30
				},
				{ xtype: 'numberfield', name: 'tri', label: "tri", hidden: true, readOnly: true },
				// Localite
				{
					xtype: 'panel',
					html: 'Localit&eacute;',
					cls:['h2','phone'],
				},
				{ xtype: 'button', itemId:'buttonchoosealocation', cls:'small-button-request-more-info', text: 'Choisir une localit&eacute;' },
				{ xtype:'spacer',
					height:5,
					width:'100%'
				},
				{
					xtype: 'fieldset',
					itemId:'fieldsetlocalisation',
					hidden:true,
					items: [
						// Location
						{ xtype: 'textfield', name: 'localisation', itemId:'searchformlocalisation', readOnly: true, cls: 'searchformlocalisation' },
					]
				},

				// Transaction
				{
					xtype: 'fieldset',
					title: 'Transaction',
					items: [
						{ xtype: 'checkboxfield', name: 'vente', label: 'Vente', checked: false, labelWidth:"50%" },
						{ xtype: 'checkboxfield', name: 'location', label: 'Location', checked: false, labelWidth:"50%"  },
						{ xtype: 'checkboxfield', name: 'locationsaisonniere', label: 'Location Saisonniere', checked: false, labelWidth:"50%"  },
						{ xtype: 'checkboxfield', name: 'viager', label: 'Viager', checked: false, labelWidth:"50%"  },
					]
				},

				// Biens
				{
					xtype: 'fieldset',
					title: 'Type de bien',
					items: [
						// maison
						{ xtype: 'checkboxfield', name: 'maison', label: 'Maison', checked: false, labelWidth:"50%" },
						// appartement
						{ xtype: 'checkboxfield', name: 'appartement', label: 'Appartement', checked: false, labelWidth:"50%", labelWidth:"50%" },
						// villa
						{ xtype: 'checkboxfield', name: 'villa', label: 'Villa', checked: false, labelWidth:"50%" },
						// mas
						{ xtype: 'checkboxfield', name: 'mas', label: 'Mas', checked: false, labelWidth:"50%" },
						// terrain
						{ xtype: 'checkboxfield', name: 'terrain', label: 'Terrain', checked: false, labelWidth:"50%" },
						// immeuble
						{ xtype: 'checkboxfield', name: 'immeuble', label: 'Immeuble', checked: false, labelWidth:"50%" },
						// loft
						{ xtype: 'checkboxfield', name: 'loft', label: 'Loft', checked: false, labelWidth:"50%" },
						// parking
						{ xtype: 'checkboxfield', name: 'parking', label: 'Parking', checked: false, labelWidth:"50%" },
						// batiment
						{ xtype: 'checkboxfield', name: 'batiment', label: 'Batiment', checked: false, labelWidth:"50%" },
						// bureau
						{ xtype: 'checkboxfield', name: 'bureau', label: 'Bureau', checked: false, labelWidth:"50%" },
						// chateau
						{ xtype: 'checkboxfield', name: 'chateau', label: 'Chateau', checked: false, labelWidth:"50%" },
						// hotel
						{ xtype: 'checkboxfield', name: 'hotel', label: 'Hotel', checked: false, labelWidth:"50%" },
						// boutique
						{ xtype: 'checkboxfield', name: 'boutique', label: 'Boutique', checked: false, labelWidth:"50%" },
						// duplex
						{ xtype: 'checkboxfield', name: 'duplex', label: 'Duplex', checked: false, labelWidth:"50%" },
					]
				},

				{
					xtype: 'fieldset',
					title: 'Nombre de pieces',
					items: [
						// F1
						{ xtype: 'checkboxfield', name: 'F1', label: 'F1', checked: false, labelWidth:"50%" },
						// F2
						{ xtype: 'checkboxfield', name: 'F2', label: 'F2', checked: false, labelWidth:"50%" },
						// F3
						{ xtype: 'checkboxfield', name: 'F3', label: 'F3', checked: false, labelWidth:"50%" },
						// F4
						{ xtype: 'checkboxfield', name: 'F4', label: 'F4', checked: false, labelWidth:"50%" },
						// F5
						{ xtype: 'checkboxfield', name: 'F5', label: 'F5', checked: false, labelWidth:"50%" },
					]
				},

				{
					xtype: 'fieldset',
					title: 'Surface en m2',
					items: [
						// surfaceh_min
						{ xtype: 'numberfield', name: 'surfaceh_min', label: 'Surface min', labelWidth:"50%" },
						// surfaceh_max
						{ xtype: 'numberfield', name: 'surfaceh_max', label: 'Surface max', labelWidth:"50%" },

						// surfaceterr_min
						{ xtype: 'numberfield', name: 'surfaceterr_min', label: 'Surface ter min', labelWidth:"50%" },
						// surfaceterr_max
						{ xtype: 'numberfield', name: 'surfaceterr_max', label: 'Surface ter max', labelWidth:"50%" },
					]
				},

				{
					xtype: 'fieldset',
					title: 'Budget en euros',
					items: [
						// prixa
						{ xtype: 'numberfield', name: 'prixa', label: 'Prix minimum', labelWidth:"50%" },
						// prixb
						{ xtype: 'numberfield', name: 'prixb', label: 'Prix maximum', labelWidth:"50%" }
					]
				},

				// Button Submit
				{ xtype:'button', cls:['submit-search','tablet'], itemId:'submit-search', text:'Lancer la recherche' },

		]
	},

	initialize: function(){
		this.callParent();
	}

});
Ext.define('MyApp.view.tablet.SearchResultsList', {
	extend:'Ext.Container',
	xtype:'searchresultslist_tablet',

		config:{
		layout: 'fit',
		items:[
			{
				xtype:'toolbar',
				cls:['searchtoolbar','tablet'],
				docked:'top',
			
				items:[
					{ xtype:'spacer'},
					{ xtype:'button', ui:'tri', text:'Tri', cls:['toolbar_button','tablet'], width:40, itemId:'searchresultlistbuttontoggletri', },
					{ xtype:'button', text:' << ', cls:['toolbar_button','tablet'], width:60, itemId:'searchresultslistbuttonpreviouspage'},
					{ xtype:'spacer', width:10 },
					{ xtype:'panel', html:'Page 0/0', cls:['searchresultslistpagetext','tablet'], itemId:'searchresultslistpagetext'},
					{ xtype:'spacer', width:10 },
					{ xtype:'button', text:' >> ', cls:['toolbar_button','tablet'], width:60, itemId:'searchresultslistbuttonnextpage'},
					{ xtype:'spacer', width:10 },
					{ xtype:'button', cls:['toolbar_button','tablet'], text:'Carte', width:60, itemId:'searchresultslistbuttontogglelistmap', },
					{xtype:'button',cls:['toolbar_button','tablet'] ,itemId:'searchresultslistbuttonsave', text:'Ajouter la recherche &agrave; mes favoris' ,align:'right'},
				],

			},
			{
				xtype:'panel',
				itemId:'searchresultslistpanel',
				layout:'card',
				items:[
					{
						xtype:'list',
						itemId:'searchresultslist',
						mode:'SINGLE',
						allowDeselect: true,
						itemTpl: [
							'<div>',
								'<img src={img} class="searchresultslistitemimg">',
								'<div>',
									'<div class="searchresultslistitemtpricetext tablet">{prix} &#8364;',
									'<tpl if="bien== &quot;Location&quot;">',
										'<span class="realestatedetailbien phone">Location','</span>',
									"</tpl>",
									'</div>',
									'<div class="searchresultslistitemlocationtext tablet">',
								"<tpl if='ville' != null>",
								'{ville}',
								"</tpl>",
								"<tpl if='cp &lt; 10000'>",
								'(0{cp})',
								"<tpl elseif='cp &gt; 9999'>",
								'({cp})',
								"</tpl>",
									'</div>',
									'<div class="searchresultslistitemtypebientext tablet">{typebien}',
									'</div>',
									'<div class="searchresultslistitemtypesurfacetext tablet">',
										"<tpl if='typesurface' != null>",
											'{typesurface}  piece(s)',
											"<tpl if='surfaceh' != null>",
											' - {surfaceh} m&sup2;',
											"</tpl>",
										"<tpl else>",
											"<tpl if='surfaceterr' != null>",
											'{surfaceterr} m&sup2;',
											"</tpl>",
										"</tpl>",
									'</div>',
								'</div>',
								'</br>',
							'</div>'
						]
						
					},
					{
						xtype:'map',
						itemId:'searchresultsmap',
						hidden:true,
					},
				]
			},
		]
	},
});

Ext.define('MyApp.view.DPEconso', {
    extend: 'Ext.Panel',    
    
    //consoLevel is in kwh
    setDPEconso: function(consoLevel){
        var arrow_height = 0,
            arrow_zero_height = 20,
            category_height = 23;
        if (consoLevel > 50 && consoLevel < 90){
            arrow_height = 1;
        }else if (consoLevel > 90 && consoLevel < 150){
            arrow_height = 2;
        }else if (consoLevel > 150 && consoLevel < 230){
            arrow_height = 3;
        }else if (consoLevel > 230 && consoLevel < 330){
            arrow_height = 4;
        }else if (consoLevel > 330 && consoLevel < 450){
            arrow_height = 5;            
        }else if (consoLevel > 450){
            arrow_height = 6;            
        }
        var arrow = this.down('#arrow'),
            arrow_text = this.down('#arrow_text'),
            title = this.down('#DPE_title');
            
        arrow.setStyle('margin-top:'+(arrow_zero_height + arrow_height*category_height)+'px;');
        arrow_text.setHtml(consoLevel);
        title.setHtml('Consommations (kWh/m&sup2;.an) : '+consoLevel+' kWh');
    }
    

});
Ext.define('MyApp.view.DPEemission', {
    extend: 'Ext.Panel',    

    //emissionLevel is in kwh
    setDPEemission: function(emissionLevel){
        var arrow_height = 0,
            arrow_zero_height = 20,
            category_height = 23;
        if (emissionLevel > 5 && emissionLevel < 10)
        {
            arrow_height = 1;
        }
        else if (emissionLevel > 10 && emissionLevel < 20)
        {
            arrow_height = 2;
        }
        else if (emissionLevel > 20 && emissionLevel < 35)
        {
            arrow_height = 3;
        }
        else if (emissionLevel > 35 && emissionLevel < 55)
        {
            arrow_height = 4;
        }
        else if (emissionLevel > 55 && emissionLevel < 80)
        {
            arrow_height = 5;            
        }
        else if (emissionLevel > 80)
        {
            arrow_height = 6;            
        }
        var arrow = this.down('#arrow'),
            arrow_text = this.down('#arrow_text'),
            title = this.down('#DPE_title');
            
        arrow.setStyle('margin-top:'+(arrow_zero_height + arrow_height*category_height)+'px;');
        arrow_text.setHtml(emissionLevel);
        title.setHtml('Emissions (kg CO2/m&sup2;.an) : '+emissionLevel+' kg');
    }

});
Ext.define('MyApp.view.RequestAgencyInfo', {
    extend:'Ext.form.Panel',
    config: {
		title:'Informations',
        itemId:'requestagencyinfo',
        cls:'form',
        standardSubmit: false,
        hideOnMaskTap:true,
        items : [
			 {
                xtype: 'hiddenfield',
                name: 'idagence'
            },
            {
                xtype:'fieldset', title:'Informations de contact' , instructions:'Les champs contenant un (*) sont obligatoires',
                items:[
                    { xtype: 'selectfield', name: 'civilite', label: 'Civilit&eacute;', labelWidth:"50%", options:[{text:'Monsieur', value:'Mr.'},{text:'Madame', value:'Mme'}] },
                    { xtype: 'textfield', name: 'nom', label: 'Nom (*)', labelWidth:"50%" },
                    { xtype: 'panel', hidden:true , itemId:'nom_error' , cls:'fielderrortext', html:''},
                    { xtype: 'textfield', name: 'prenom', label: 'Pr&eacute;nom (*)', labelWidth:"50%" },
                    { xtype: 'panel', hidden:true , itemId:'prenom_error' , cls:'fielderrortext', html:''},
                    { xtype: 'textfield', name: 'email', label: 'E-mail (*)', labelWidth:"50%" },
                    { xtype: 'panel', hidden:true , itemId:'email_error' , cls:'fielderrortext', html:''},
                    { xtype: 'textfield', name: 'tel', label: 'T&eacute;l&eacute;phone (*)', labelWidth:"50%" },
                    { xtype: 'panel', hidden:true , itemId:'tel_error' , cls:'fielderrortext', html:''},
                ],
            },
            {
                xtype:'fieldset', 
                title:'Demande' , 
                items:[
                    { xtype: 'textareafield', name: 'message', label: 'Message (*)', labelWidth:"50%" },
                    { xtype: 'panel', hidden:true , itemId:'message_error' , cls:'fielderrortext', html:''},
                ]
            },
            
            // Button Submit
            { xtype:'button', ui:'action', itemId:'submit-request-info', text:'Envoyer' }
        ]
    },
	setIdAgence: function(idagence){
        //console.log("MyApp.view.RequestAgencyInfo - setIdAgence(): " + idagence);
        this.setValues({
            'idagence':idagence
        });
    }
});
Ext.define('MyApp.model.RequestAdDeposit', {
    extend: 'MyApp.model.CustomModelBase',
    config:
    {
        fields: [
            {name:'idagence',type:'string'},

            /* obligatoire */
            {name:'civilite',type:'string'},
            {name:'nom',type:'string'},
            {name:'prenom',type:'string'},
            {name:'email',type:'string'},
            {name:'tel',type:'string'},
    
            /* 1 parmis */
            {name:'vente',type:'bool' /* bool */},
            {name:'location',type:'bool' /* bool */},
    
            /* 1 parmis */
            {name:'maison',type:'bool' /* bool */},
            {name:'appartement',type:'bool' /* bool */},
            {name:'villa',type:'bool' /* bool */},
            {name:'mas',type:'bool' /* bool */},
            {name:'terrain',type:'bool' /* bool */},
            {name:'immeuble',type:'bool' /* bool */},
            {name:'loft',type:'bool' /* bool */},
            {name:'parking',type:'bool' /* bool */},
            {name:'batiment',type:'bool' /* bool */},
            {name:'bureau',type:'bool' /* bool */},
            {name:'chateau',type:'bool' /* bool */},
            {name:'boutique',type:'bool' /* bool */},
            {name:'duplex',type:'bool' /* bool */},
    
            /* 1 */
            {name:'F1',type:'bool' /* bool */},
            {name:'F2',type:'bool' /* bool */},
            {name:'F3',type:'bool' /* bool */},
            {name:'F4',type:'bool' /* bool */},
            {name:'F5',type:'bool' /* bool */},

            /* obligatoire */
            {name:'surfaceh',type:'int'},
            {name:'secteur',type:'string'},
            {name:'prix',type:'int'}
        ],
        
        validations:[
            {type:'email',field:'email', message:'Veuillez entrer une adresse email valide'},
            {type:'presence',field:'prenom', min:1, message:'Veuillez entrer votre pr&eacute;nom'},
            {type:'presence',field:'nom', min:1 , message:'Veuillez entrer votre nom'},
            {type:'length',field:'tel', min:10, message:'Veuillez entrer un num&eacute;ro de t&eacute;l&eacute;phone valide'},
            {type:'gte',field:'surfaceh',min:1,  message:'Veuillez entrer une surface habitable (en m2)'},
            {type:'presence',field:'secteur'  , message:'Veuillez donner le nom d\'un secteur'},
            {type:'gte',field:'prix', min:1 , message:'Veuillez indiquer un prix en euros (uniquement les chiffres)'}
        ],
        proxy: {
                type: 'rest',
                appendId: false,
                actionMethods:{
                    create: "POST"
                    },
                // TEST URLS
                api:{
                    // TEST
                    // create:"http://acheterlouer/acheterlouer_logRequest.php"

                    // PRODUCTION
                    create:"http://iphone.acheter-louer.fr/perl/agences/smartphones/depot.pl",
                },
                reader:{
                    type:'json'
                }
            }
    },

});

Ext.define('MyApp.model.RequestAdMoreInfo', {
    extend: 'MyApp.model.CustomModelBase',
    config:
    {
        fields: [
            {name:'idannonce',type:'string' , defaultValue:''},
            {name:'civilite',type:'string' , defaultValue:''},
            {name:'nom',type:'string' , defaultValue:''},
            {name:'prenom',type:'string' , defaultValue:''},
            {name:'email',type:'string' , defaultValue:''},
            {name:'tel',type:'string' , defaultValue:''},
            {name:'message',type:'string' , defaultValue:''}    
        ],
        validations:[
            {type:'email',field:'email', message:'Veuillez entrer une adresse email valide'},
            {type:'presence',field:'prenom', min:1, message:'Veuillez entrer votre pr&eacute;nom'},
            {type:'presence',field:'nom', min:1 , message:'Veuillez entrer votre nom'},
            {type:'length',field:'tel', min:10, message:'Veuillez entrer un num&eacute;ro de t&eacute;l&eacute;phone valide'},
            {type:'presence',field:'message', min:1 , message:'Veuillez poser votre question dans le champs message'},
        ],
        proxy: {
                type: 'rest',
                appendId: false,
                actionMethods:{
                    create: "POST"
                    },
                api:{
                    // TEST SITE
                    // create:"http://acheterlouer/acheterlouer_logRequest.php"
                
                    // PRODUCTION
                    create:"http://iphone.acheter-louer.fr/perl/agences/smartphones/demandeinfo.pl",
                },
                reader:{
                    type:'json'
                }
            }
    }
});

Ext.define('MyApp.model.RequestSearchMandate', {
    extend: 'MyApp.model.CustomModelBase',
    config:
    {
        fields: [
            {name:'idagence',type:'string', defaultValue:''},

            {name:'civilite',type:'string', defaultValue:''},
            {name:'nom',type:'string', defaultValue:''},
            {name:'prenom',type:'string', defaultValue:''},
            {name:'email',type:'string', defaultValue:''},
            {name:'tel',type:'string', defaultValue:''},
    
    
            {name:'vente',type:'bool' /* bool */},
            {name:'location',type:'bool' /* bool */},
    
            /* Au moins 1 */
            {name:'maison',type:'bool' /* bool */},
            {name:'appartement',type:'bool' /* bool */},
            {name:'villa',type:'bool' /* bool */},
            {name:'mas',type:'bool' /* bool */},
            {name:'terrain',type:'bool' /* bool */},
            {name:'immeuble',type:'bool' /* bool */},
            {name:'loft',type:'bool' /* bool */},
            {name:'parking',type:'bool' /* bool */},
            {name:'batiment',type:'bool' /* bool */},
            {name:'bureau',type:'bool' /* bool */},
            {name:'chateau',type:'bool' /* bool */},
            {name:'boutique',type:'bool' /* bool */},
            {name:'duplex',type:'bool' /* bool */},
    
            /* au moins 1 */
            {name:'F1',type:'bool' /* bool */},
            {name:'F2',type:'bool' /* bool */},
            {name:'F3',type:'bool' /* bool */},
            {name:'F4',type:'bool' /* bool */},
            {name:'F5',type:'bool' /* bool */},

            /* obligatoire */
            {name:'surfaceh',type:'int', defaultValue:0},
            {name:'secteur',type:'string', defaultValue:''},
            {name:'prixa',type:'int', defaultValue:0},
            {name:'prixb',type:'int', defaultValue:0}
        ],
        validations:[
            {type:'email',field:'email', message:'Veuillez entrer une adresse email valide'},
            {type:'presence',field:'prenom', min:1, message:'Veuillez entrer votre pr&eacute;nom'},
            {type:'presence',field:'nom', min:1 , message:'Veuillez entrer votre nom'},
            {type:'length',field:'tel', min:10, message:'Veuillez entrer un num&ecaute;ro de t&eacute;l&eacute;phone valide'},
            {type:'format',field:'surfaceh', matcher:/[0-9]+/ , message:'Veuillez entrer une surface habitable (en m2)'},
            {type:'presence',field:'secteur'  , message:'Veuillez donner le nom d\'un secteur'},
            {type:'gte',field:'prixa', min:1 , message:'Veuillez indiquer un prix minimum en euros (uniquement les chiffres)'},
            {type:'gte',field:'prixb', min:1 , message:'Veuillez indiquer un prix maximum en euros (uniquement les chiffres)'}
        ],
        proxy: {
            type: 'rest',
            appendId: false,
            actionMethods:{
                create: "POST"
                },
            // TEST URLS
            api:{
                // TEST SITE 
                // create:"http://acheterlouer/acheterlouer_logRequest.php"
                
                // PRODUCTION
                create:"http://iphone.acheter-louer.fr/perl/agences/smartphones/mandat.pl",
            },
            reader:{
                type:'json'
            }
        },
    },

    validate:function(){
        // console.log("validate override");
        var errors = this.callParent(),
            appartement =this.get("appartement"),
            hasFx = (this.get("F1") || this.get("F2") || this.get("F3") || this.get("F4") || this.get("F5"));

        /* add custom field validate */
        // console.log(appartement);
        // console.log(hasFx);
        
        if (/*this.get("appartement") && */!(hasFx)){
            // console.log("appartment and no Fx selection");
            errors.add(Ext.create('Ext.data.Error', {
                field  : "F1",
                message: "Veuillez selectionner au moins un type de surface pour le bien"
            }));
        }
        // console.log(errors);
        return errors;
    }
});

Ext.define('MyApp.model.RequestAppraisal', {
    extend: 'MyApp.model.CustomModelBase',
    config: {
        fields: [
            {name:'idagence',type:'string'},

            /* obligatoire */
            {name:'civilite',type:'string' },
            {name:'nom',type:'string' },
            {name:'prenom',type:'string' },
            {name:'email',type:'string' },
            {name:'tel',type:'string' },

            /* 1 parmis */
            {name:'maison',type:'bool' /* bool */},
            {name:'appartement',type:'bool' /* bool */},
            {name:'villa',type:'bool' /* bool */},
            {name:'mas',type:'bool' /* bool */},
            {name:'terrain',type:'bool' /* bool */},
            {name:'immeuble',type:'bool' /* bool */},
            {name:'loft',type:'bool' /* bool */},
            {name:'parking',type:'bool' /* bool */},
            {name:'batiment',type:'bool' /* bool */},
            {name:'bureau',type:'bool' /* bool */},
            {name:'chateau',type:'bool' /* bool */},
            {name:'boutique',type:'bool' /* bool */},
            {name:'duplex',type:'bool' /* bool */},

            /* 1 parmis */
            {name:'F1',type:'bool' /* bool */},
            {name:'F2',type:'bool' /* bool */},
            {name:'F3',type:'bool' /* bool */},
            {name:'F4',type:'bool' /* bool */},
            {name:'F5',type:'bool' /* bool */},

            /* obligatoire */
            {name:'surfaceh',type:'int', defaultValue:0},
            {name:'secteur',type:'string' , defaultValue:''}
    	],
    	validations:[
        	{type:'email',field:'email', message:'Veuillez entrer une adresse email valide'},
    	    {type:'presence',field:'prenom', min:1, message:'Veuillez entrer votre pr&eacute;nom'},
    	    {type:'presence',field:'nom', min:1 , message:'Veuillez entrer votre nom'},
    	    {type:'length',field:'tel', min:10, message:'Veuillez entrer un num&eacute;ro de t&eacute;l&eacute;phone valide'},
    	    {type:'format',field:'surfaceh', matcher:/[0-9]+/ , message:'Veuillez entrer une surface habitable (en m2)'},
    	    {type:'presence',field:'secteur'  , message:'Veuillez donner le nom d\'un secteur'},
    	],
    	
    	proxy: {
            type: 'rest',
            appendId: false,
            actionMethods:{
                create: "POST"
            },
            api: {
                // TEST SITE 
            	//create:"http://acheterlouer/acheterlouer_logRequest.php"
                
            	// PRODUCTION
            	create:"http://iphone.acheter-louer.fr/perl/agences/smartphones/estimation.pl",
                
            },
            reader: {
                type:'json'
            }
        }
    }
});

Ext.define('MyApp.controller.phone.Main', {
	extend: 'MyApp.controller.Main',

	/* Generic form hidding , phone is using navigationview as screen container */
	removeFromContainer: function(theForm, navigationView){
		// console.log('MyApp.controller.phone.Main - removeFromContainer()');
		// console.log(navigationView);
		if (navigationView){
			// console.log('MyApp.controller.phone.Main - navigationView.pop()');
			navigationView.reset();
		}
		// console.log(navigationView);
	},

	showSearchResultList: function(){
		//console.log('MyApp.controller.phone.Main - showSearchResultList()');

		var newview = Ext.create('MyApp.view.phone.SearchResultsList');
		newview.setItemId('searchresultslist');

		var searchresultlistagencyname = this.getSearchResultListAgencyName();
		var agencyDetailStore = Ext.getStore("AgencyDetailCache");
		var agencyDetailModel = agencyDetailStore.getAt(0);
		searchresultlistagencyname.setHtml('<h1>' + agencyDetailModel.get('nom') + '</1>');

		// Show List Mode
		// console.log(this.getSearchResultsListPanel());
		this.getSearchResultsListPanel().setActiveItem(0);
		this.getSearchResultToggleListMapButton().setText('Carte');
		this.getSearchNavigationView().push(newview);
	},
	onTapButtonHighlightGo: function(){
		//console.log('MyApp.controller.phone.Main - onTapButtonHighlightGo()');
		var carousel = this.getCarousel(),
			idannonce = carousel.getActiveItem().config.model.get('idannonce'),
			highlightDetailStore = Ext.create('MyApp.store.SearchDetail', { itemId:'highlightDetail' });

		highlightDetailStore.load({
			scope:this,
			params:{
				idagence:this.global_idagence,
				idannonce:idannonce,
			},
			callback: function(){
				//set the model on the view
				var record = highlightDetailStore.getAt(0);
				record.set("idannonce",idannonce);
				var newview = this.getHighlightDetailView();
				newview.setItemId('highlight-detail');
				newview.setWithNewRecord(record);
				this.showHighlightView(newview);
			},
		});
	},
	// SearchResultsDetail "request more info" button
	onSearchResultsDetailRequestMoreInfo: function(){
		// console.log('MyApp.controller.phone.Main - onSearchResultsDetailRequestMoreInfo()');

		var realEstateModel = this.getSearchResultsDetail().getRecord(),
		moreInfoForm = Ext.create("MyApp.view.phone.RequestAdMoreInfo",{});
		moreInfoForm.setItemId("searchrequestadmoreinfo");
		moreInfoForm.setRealEstateAd(realEstateModel);

		this.getSearchNavigationView().push(moreInfoForm);
	},
	onTapButtonAgencyEmail:function(){
		//console.log('onTapButtonAgencyEmail');
		var moreInfoForm = Ext.create("MyApp.view.phone.RequestAgencyInfo",{});
		moreInfoForm.setItemId('agencyrequestinfo');
		moreInfoForm.setIdAgence(this.global_idagence);
		this.getAgencyNavigationView().push(moreInfoForm);
	},
	onTapRealEstateDetailMapButton:function(button, event, opts){
		//console.log('MyApp.controller.phone.Main - onTapFavoriteRealEstateDetailMapButton()');
		var realEstateModel;
		if(global_section == 'search'){
			realEstateModel = this.getSearchResultsDetail().getRecord();
		}else if(global_section == 'homepage'){
			var highlightDetail = button.up("#highlight-detail"),
			realEstateModel = highlightDetail.getRecord();
		}else if(global_section == "favorite"){
			var favoriteRealEstateDetail = this.getFavoriteRealEstateDetail();
			realEstateModel = favoriteRealEstateDetail.getRecord()
		}
		var realEstateMap = Ext.create("MyApp.view.phone.RealEstateMap",{});
		realEstateMap.initGMapWithRealEstateModel(realEstateModel);
		if(global_section == 'homepage'){
			this.getHomeNavigationView().push(realEstateMap);
		}else if(global_section == 'search'){
			this.getSearchNavigationView().push(realEstateMap);
		}else if(global_section == 'favorite'){
			this.getFavoriteRealEstateNavigationView().push(realEstateMap);
		}
		realEstateMap.mapPanToCenter();
	},
	showMoreInfoForm: function(form){
		// console.log('MyApp.controller.phone.Main - showMoreInfoForm()');
		// console.log(form);

		this.getSearchNavigationView().push(form);
	},

	getHighlightDetailView: function(){
		global_section='homepage';
		return Ext.create('MyApp.view.phone.RealEstateDetail');
	},

	showHighlightView: function(highlightDetailView){
		// console.log('MyApp.controller.phone.Main - showHighlightView()');
		this.getHomeNavigationView().push(highlightDetailView);
	},
	showRealEstateThumbnailView:function(realEstateThumbnailStore,indice){
		//console.log(realEstateThumbnailStore);
		var realestatethumbnail = this.getRealEstateThumbnailView();
		var thumbnail = Ext.create('MyApp.view.phone.Thumbnails',{});
		thumbnail.fillCarousel(realEstateThumbnailStore,indice);
		if(global_section == 'homepage'){
			this.getHomeNavigationView().push(thumbnail);
		}else if(global_section == 'search'){
			this.getSearchNavigationView().push(thumbnail);
		}else if(global_section == 'favorite'){
			this.getFavoriteRealEstateNavigationView().push(thumbnail);
		}
	},   
	onTapButtonHighlightDetailRequestMoreInfo: function(button){
		//console.log('MyApp.controller.phone.Main - onTapButtonHighlightDetailRequestMoreInfo()');

		var favoriteRealEstateDetail = button.up('#highlight-detail'),
		realEstateModel = favoriteRealEstateDetail.getRecord(),
		favoriteRealEstatesNavigationView = this.getFavoriteRealEstateNavigationView(),
		moreInfoForm = Ext.create("MyApp.view.phone.RequestAdMoreInfo",{});

		moreInfoForm.setItemId("highlightmoreinfo");
		moreInfoForm.setRealEstateAd(realEstateModel);

		this.getHomeNavigationView().push(moreInfoForm);
	},

	onTapButtonShowAgencyMap: function(){
		// console.log('MyApp.controller.phone.Main - onTapButtonShowAgencyMap()');
		var newview = Ext.create('MyApp.view.phone.AgencyMap');
		var agencymodel = Ext.ComponentQuery.query('#agencypage')[0].model;
		newview.initGMapWithAgencyModel(agencymodel);
		this.getAgencyNavigationView().push(newview);
	},

	onTapButtonRequestAppraisal: function(){
		// console.log('MyApp.controller.phone.Main - onTapButtonRequestAppraisal()');
		var newview = Ext.create('MyApp.view.phone.RequestAppraisal');
		newview.setItemId('requestappraisalform');
		this.getAgencyNavigationView().push(newview);
	},

	onTapButtonRequestAdDeposit: function(){
		// console.log('MyApp.controller.phone.Main - onTapButtonRequestAdDeposit()');
		var newview = Ext.create('MyApp.view.phone.RequestAdDeposit');
		newview.setItemId('requestaddeposit');
		this.getAgencyNavigationView().push(newview);
	},

	onTapButtonRequestSearchMandate: function(){
		// console.log('MyApp.controller.phone.Main - onTapButtonRequestSearchMandate()');
		var newview = Ext.create('MyApp.view.phone.RequestSearchMandate');
		newview.setItemId('requestsearchmandate');
		this.getAgencyNavigationView().push(newview);
	},

	onSearchNavigationViewPush: function(view, item){
		//console.log('MyApp.controller.phone.Main - onSearchNavigationViewPush()');
		if (item.xtype == "searchresultslist_phone"){
			this.showSearchresultsListButtonSave();
		}else{
			this.hideSearchresultsListButtonSave();
		}
	},

	onSearchNavigationViewPop: function(view, item){
		// console.log('MyApp.controller.phone.Main - onSearchNavigationViewPop()');
		if (item.xtype == "searchresultslist_phone"){
			this.hideSearchresultsListButtonSave();
		}else{
			this.showSearchresultsListButtonSave();
		}
	},

	onSearchNavigationViewBack: function(view){
		// console.log('MyApp.controller.phone.Main - onSearchNavigationViewBack()');
		var item = view.getActiveItem();
		if (item.xtype == "searchresultslist_phone"){
			this.showSearchresultsListButtonSave();
		}else{
			this.hideSearchresultsListButtonSave();
		}
	},

	showSearchresultsListButtonSave: function(){
		// console.log('MyApp.controller.phone.Main - showSearchresultsListButtonSave()');
		var saveButton = this.getSearchResultSaveSearchButton();

		if (!saveButton.isHidden()){
			return;
		}

		// Show the save button
		saveButton.show();
		Ext.Animator.run({
			element: saveButton.element,
			from: {
				opacity: 0
			},
			to: {
				opacity: 1
			}
		});
	},

	hideSearchresultsListButtonSave: function(){
		// console.log('MyApp.controller.phone.Main - hideSearchresultsListButtonSave()');
		var saveButton = this.getSearchResultSaveSearchButton();

		if (saveButton.isHidden()){
			return;
		}

		// Fade the save button out then hide it
		Ext.Animator.run({
			element: saveButton.element,
			from: {
				opacity: 1
			},
			to: {
				opacity: 0
			},
			onEnd: function() {
				saveButton.hide();
			}
		});
	},

	// Fired when a real estate is selected in SearchResultsList
	createRealEstateDetailView: function(){
	return Ext.create('MyApp.view.phone.RealEstateDetail');
	},

	showRealEstateDetailView:function(view){
		global_section='search';
		this.getSearchNavigationView().push(view);

	},

	resetSearchSectionToForm:function(){
		this.getSearchNavigationView().reset();
	},

	// Fired when a real estate is selected in FavoriteRealEstateList
	onFavoriteRealEstateListItemSelect: function(dataview, index, item, record, e, eOpts){
		// console.log('MyApp.controller.phone.Main - onFavoriteRealEstateListItemSelect()');
		global_section='favorite';
		if (this.didTapOnButton(e)){
			return;
		}

		var realEstateDetail = Ext.create("MyApp.view.phone.RealEstateDetail",this.popupconf);
		realEstateDetail.setItemId("favoriterealestatedetail");
		this.loadRealEstateImagesInCacheIfNeeded(record);

		// Setup RealEstateDetail
		realEstateDetail.setWithNewRecord(record);

		// Show RealEstateDetail
		var favoriteRealEstatesNavigationView = this.getFavoriteRealEstateNavigationView();
		favoriteRealEstatesNavigationView.push(realEstateDetail);
	},

	onFavoriteRealEstateRequestMoreInfo: function(){
		// console.log('MyApp.controller.phone.Main - onFavoriteRealEstateRequestMoreInfo()');

		var favoriteRealEstateDetail = this.getFavoriteRealEstateDetail();
			realEstateModel = favoriteRealEstateDetail.getRecord(),
			favoriteRealEstatesNavigationView = this.getFavoriteRealEstateNavigationView(),
			moreInfoForm = Ext.create("MyApp.view.phone.RequestAdMoreInfo",{});

		moreInfoForm.setItemId("favoriterealestatemoreinfo");

		moreInfoForm.setRealEstateAd(realEstateModel);

		favoriteRealEstatesNavigationView.push(moreInfoForm);
	},

});
Ext.define('MyApp.controller.tablet.Main', {
	extend: 'MyApp.controller.Main',

	overlay: null,
	popupconf : {
		modal:true,
		centered:true,
		hidden:true,
		width:'85%',
		height:'85%',
		cls:['popupform','tablet']
		},

	init: function(){
		this.callParent(arguments);
		this.popupconf_realestatedetail = Ext.clone(this.popupconf);
		this.popupconf_realestatedetail.cls.push('realestatedetail');
	},



	popupPanel: function(panel, donoterase){
		var alias = this;
		this.overlay = panel;
		panel.on({
			erased:function(component, eOpts){
				if(donoterase){
					//console.log("component flagged as do not erase.")
				}else{
					component.destroy();
				}
				return true;
			}
		});
		Ext.Viewport.add(this.overlay);
		this.overlay.show();
	},

	removeOverlay: function(donoterase){
		Ext.Viewport.remove(this.overlay,!donoterase);
		this.overlay = null;
	},

	/* Generic form hidding , tablet is using modal view */
	removeFromContainer: function(theForm,container){
		if (this.overlay === theForm){
			this.removeOverlay();
		}
	},

	getHighlightDetailView:function(){
		return this.createRealEstateDetailView();
	},

	showHighlightView:function(highlightDetailView){
		this.popupPanel(highlightDetailView);
	},

	onTapButtonHighlightGo: function(){
		//console.log('MyApp.controller.tablet.Main - onTapButtonHighlightGo()');
		var carousel = this.getCarousel(),
			idannonce = carousel.getActiveItem().config.model.get('idannonce'),
			highlightDetailStore = Ext.create('MyApp.store.SearchDetail', { itemId:'highlightDetail' });

		highlightDetailStore.load({
			scope:this,
			params:{
				idagence:this.global_idagence,
				idannonce:idannonce,
			},
			callback: function(){
				//set the model on the view
				var record = highlightDetailStore.getAt(0);
				record.set("idannonce",idannonce);
				var realEstateThumbnailStore = Ext.getStore('RealEstateThumbnails');
				realEstateThumbnailStore.load({
					scope: this,
					params: {
						img:record.get('img'),
					},
					callback: function(records,operation,success){
						// Create RealEstateDetail View and push it
						var newview = this.getHighlightDetailView();
						if (newview){
							newview.setItemId('highlight-detail');
							newview.setWithNewRecord(record);
							this.showHighlightView(newview);
							newview.fillCarousel(realEstateThumbnailStore.getData());
							newview.initGMapWithRealEstateModel(record);
							this.showHighlightView(newview);
							newview.mapPanToCenter();
						}
						// Hide Loading Overlay
						this.doHideLoadingOverlay();
					}
				});
			},
		});
	},
	// SearchResultsDetail "request more info" button
	onSearchResultsDetailRequestMoreInfo: function(){
		//console.log('MyApp.controller.phone.Main - onSearchResultsDetailRequestMoreInfo()');

		var realEstateModel = this.getSearchResultsDetail().getRecord(),
			moreInfoForm = Ext.create("MyApp.view.tablet.RequestAdMoreInfo",this.popupconf);
		moreInfoForm.setItemId("searchrequestadmoreinfo");
		moreInfoForm.setRealEstateAd(realEstateModel);

		this.popupPanel(moreInfoForm);
	},

	showMoreInfoForm:function(form){
		this.popupPanel(form);
	},

	showSearchResultList: function(){
		//do nothing. tablet already show it.
	},

	resetSearchSectionToForm:function(){
		//do nothing.
	},

	createRealEstateDetailView:function(){
		return Ext.create('MyApp.view.tablet.RealEstateDetail',this.popupconf_realestatedetail);
	},
	onSearchResultsListItemSelect: function(dataview, record, eOpts){
		//console.log('MyApp.controller.tablet.Main - onSearchResultsListItemSelect()');

		// // Create RealEstateDetail View and push it
		// var realEstateView = this.createRealEstateDetailView();
		// realEstateView.setItemId('searchresultsdetail');
		// this.showRealEstateDetailView(realEstateView);
		
		var searchDetailStore = Ext.getStore('SearchDetail');
		searchDetailStore.load({
			scope: this,
			params: {
				idagence: this.global_idagence,
				idannonce: record.get('idannonce'),
			},
			callback: function(){
				var searchDetailRecord = searchDetailStore.getData().getAt(0);
				searchDetailRecord.set('idagence', this.global_idagence);
				searchDetailRecord.set('idannonce', record.get('idannonce'));
				searchDetailRecord.set('img', record.get('img'));
				var realEstateThumbnailStore = Ext.getStore('RealEstateThumbnails');
				realEstateThumbnailStore.load({
					scope: this,
					params: {
						img:record.get('img'),
					},
					callback: function(records,operation,success){
							// Create RealEstateDetail View and push it
							var realEstateView = this.createRealEstateDetailView();
							if (realEstateView){
								//console.log('MyApp.controller.tablet.Main - onSearchResultsListItemSelect(): if(realEstateView)');
								realEstateView.setItemId('searchresultsdetail');
								realEstateView.setWithNewRecord(searchDetailRecord);
								realEstateView.fillCarousel(realEstateThumbnailStore.getData());
								realEstateView.initGMapWithRealEstateModel(record);
								this.showRealEstateDetailView(realEstateView);
								realEstateView.mapPanToCenter();
							}
							// Hide Loading Overlay
							this.doHideLoadingOverlay();
						}
				});
			},
		});
		
		// Show Loading Overlay
		this.doShowLoadingOverlay();
	},
	showRealEstateDetailView:function(view){
		//console.log("showRealEstateDetailView :"+view);
		this.popupPanel(view);
	},


	// Fired when a real estate is selected in FavoriteRealEstateList
	onFavoriteRealEstateListItemSelect: function(dataview ,index ,item ,record ,e ,eOpts){
		//console.log('app.controller.tablet.Main - onFavoriteRealEstateListItemSelect()');
		if (this.didTapOnButton(e)){
			return;
		}
		var realEstateThumbnailStore = Ext.getStore('RealEstateThumbnails');
		realEstateThumbnailStore.load({
			scope: this,
			params: {
				img:record.get('img'),
			},
			callback: function(records,operation,success){
				var realEstateDetail = this.createRealEstateDetailView();
				realEstateDetail.setItemId("favoriterealestatedetail");
				this.loadRealEstateImagesInCacheIfNeeded(record);

				// Setup RealEstateDetail
				realEstateDetail.setWithNewRecord(record);
				realEstateDetail.fillCarousel(realEstateThumbnailStore.getData());
				realEstateDetail.initGMapWithRealEstateModel(record);
				// Show RealEstateDetail
				this.popupPanel(realEstateDetail);
				realEstateDetail.mapPanToCenter();
			}
		});
	},

	onFavoriteRealEstateRequestMoreInfo: function(){
		//console.log('app.controller.tablet.Main - onFavoriteRealEstateRequestMoreInfo()');

		var favoriteRealEstateDetail = this.getFavoriteRealEstateDetail();
			realEstateModel = favoriteRealEstateDetail.getRecord(),
			moreInfoForm = Ext.create("MyApp.view.tablet.RequestAdMoreInfo",this.popupconf);

		moreInfoForm.setItemId("favoriterealestatemoreinfo");

		moreInfoForm.setRealEstateAd(realEstateModel);

		this.popupPanel(moreInfoForm);
	},

	onTapButtonHighlightDetailRequestMoreInfo: function(button){
		// Override
		var highlightDetailView = button.up('#highlight-detail'),
			realEstateModel = highlightDetailView.getRecord(),
			moreInfoForm = Ext.create("MyApp.view.phone.RequestAdMoreInfo",this.popupconf);

		moreInfoForm.setItemId("highlightmoreinfo");
		moreInfoForm.setRealEstateAd(realEstateModel);

		this.popupPanel(moreInfoForm);
	},
	onTapButtonAgencyEmail:function(){
		var newview = Ext.create('MyApp.view.tablet.RequestAgencyInfo',this.popupconf);
		newview.setItemId('agencyrequestinfo');
		newview.setIdAgence(this.global_idagence);
		this.popupPanel(newview);
	},
	onTapButtonRequestAppraisal: function(){
		//console.log('MyApp.controller.tablet.Main - onTapButtonRequestAppraisal()');
		var newview = Ext.create('MyApp.view.tablet.RequestAppraisal',this.popupconf);
		newview.setItemId('requestappraisalform');
		this.popupPanel(newview);
	},

	onTapButtonRequestAdDeposit: function(){
		//console.log('MyApp.controller.tablet.Main - onTapButtonRequestAdDeposit()');
		var newview = Ext.create('MyApp.view.tablet.RequestAdDeposit',this.popupconf);
		newview.setItemId('requestaddeposit');
		this.popupPanel(newview);
	},

	onTapButtonRequestSearchMandate: function(){
		//console.log('MyApp.controller.tablet.Main - onTapButtonRequestSearchMandate()');
		var newview = Ext.create('MyApp.view.tablet.RequestSearchMandate',this.popupconf);
		newview.setItemId('requestsearchmandate');
		this.popupPanel(newview);
	},

});
Ext.define('MyApp.view.phone.HomePage', {
	extend:'MyApp.view.HomePage',
	xtype:'homepage_phone',

	config:{
		firstTimePainted:true,
		scrollable:{
			direction:'vertical',
			directionLock:true
		},
		layout:{
			type:'vbox',
		},
		cls:'homepage-phone',
		items:[
			{
				xtype:'panel',
				width:'100%',
				height:'100%',
				itemId:'homepageagencyname',
				cls:'homepage-agency-name',
				html:'',
			},
			// SEARCH BUTTON
			{
				xtype:'panel',
				layout:{
					type:'vbox',
					align:'center',
				},
				items:[
					{
						xtype:'button',
						itemId:'homegotosearch',
						cls:'homegotosearch',
						text:'Recherche',
					},
				],
			},

			// SPACER
			{ xtype:'spacer', height:20},

			// NOTRE SELECTION
			{
				xtype:'panel',
				layout:{
					type:'vbox',
				},
				items:[
					{
						xtype:'panel',
						html:'NOTRE SELECTION',
						cls:'homepage-selection-title',
					},
				],
			},

			// CAROUSEL
			{
				xtype:'panel',
				layout:{
					type:'vbox',
					align:'middle',
				},
				cls:['bottomsection','phone'],
				items:[
					{
						xtype:'carousel',
						itemId:'highlight-carousel',
						cls:['highlight-carousel','phone'],
						direction:'horizontal',
						directionLock: true,
						indicator:true,
					},
					{
						xtype:'panel',
						itemId:'highlight-title',
						cls:['highlight-title','phone'],
						html:"Chargement..."
					},
					{
						xtype:'panel',
						itemId:'highlight-location',
						cls:['highlight-location','phone'],
					},
					{
						xtype:'button',
						itemId:'highlight-go',
						text:'Afficher',
						cls:['highlight-go','phone'],
					},
				],
			},
		],
	},

	// OVERRIDE PARENT
	setActiveHighlight: function(highlightModel){
		// console.log("MyApp.view.phone.HomePage.js - setActiveHighlight()");
		this.down('#highlight-title').setHtml(highlightModel.get('typebien'));
		this.down('#highlight-location').setHtml(highlightModel.get('ville'));
	},

	// OVERRIDE PARENT
	setAgencyHighlights:function(agencyHighlights){
		// console.log("MyApp.view.phone.HomePage.js - setAgencyHighlights()");
		this.agencyHighlights = agencyHighlights;
		var carousel = this.down('carousel'),
			i=0,
			items=[],
			elem=null,
			button = null;

		for (;i<agencyHighlights.length;i++){
			elem = agencyHighlights.items[i];
			// console.log(elem);

			items.push(
				{
					xtype:'image',
					itemId:elem.data['idannonce'],
					cls:['highlight','phone'],
					src:elem.get('photo'),
					model:elem
				}
			);
		}
		carousel.setItems(items);
	},
});
Ext.define('MyApp.view.phone.RequestAdMoreInfo', {
	extend:'MyApp.view.RequestAdMoreInfo',
    xtype: 'requestadmoreinfo_phone',
});
Ext.define('MyApp.view.phone.FavoriteSearchListItem', {
	extend:'MyApp.view.FavoriteSearchListItem',
	xtype:'favoritesearchlistitem_phone',
	requires: [
		'Ext.Img'
	],

	config: {

		layout: {
			type: 'vbox'
		},

		items:[

			{
				xtype:'panel',
				layout:{
					type:'hbox',
				},
				items:[
					{
						xtype:'panel',
						layout:{
							type:'vbox',
						},
						items:[
							{ xtype:'button', ui:'round', itemId:'favoritesearchlistbuttonnew', cls:'favoritesearchlist-buttonnew'},
						]
					},
					{
						flex:1,
						xtype:'panel',
						layout:{
							type:'vbox',
						},
						items:[
							{ xtype:'panel', html:'0', itemId:'favoritesearchlistdescription', cls:['favoritesearchlistdescription','phone'] },
							{ xtype:'panel', html:'0', itemId:'favoritesearchlistville', cls:['favoritesearchlistville','phone'] },
						],
					},
					{
						xtype:'panel',
						layout:{
							type:'vbox',
						},
						items:[
							{ xtype:'button', ui:'decline', text:'Supprimer', cls:'favoritesearchlist-buttondelete-phone', },
							{ xtype:'button', ui:'update', text:'Modifier', cls:'favoritesearchlist-buttonupdate-phone', },
						],
					},
				],
			},

			{ xtype:'spacer', height:1, width:'100%', cls:'shadow' },

		],

	},
});
Ext.define('MyApp.view.phone.FavoriteSearchSection', {
	extend:'Ext.Panel',
	xtype:'favoritesearchsection_phone',
	requires:[
		'MyApp.view.phone.FavoriteSearchListItem'
	],

	config:{
		itemId:'favoritesearchsection',
		layout:{
			type:'card',
		},
		autoDestroy:true,
		cls:'favoritesearchsection',
		items: [
			{
				xtype:'toolbar',
				title: 'Mes Recherches',
				docked:'top',
				layout:{
					pack: 'center'
				},
			},
			{
				xtype: 'dataview',
				itemId:'favoritesearchlist',
				cls:'favoritesearchlist',
				defaultType: 'favoritesearchlistitem_phone',
				allowDeselect:false,
				useComponents: true,             
				store: 'FavoriteSearch',
				items: [
					{
						xtype:'panel',
						width:'100%',
						height:'100%',
						itemId:'favoritesearchsectionagencyname',
						cls:'favorite-search-section-agency-name',
						html:'',
					},
				]
			}
		],
	},
});
Ext.define('MyApp.view.phone.RealEstateListItem', {
	extend:'MyApp.view.RealEstateListItem',
	xtype:'realestatelistitem_phone',

	requires: [
		'Ext.Img'
	],

	config: {
		layout:{
			type:'vbox',
		},
		items:[
			{
				xtype:'panel',
				cls:['realestatelistitemcontent','phone'],
				layout:{
					type:'hbox',
				},
				items:[
					{ xtype:'button', text:'X', hidden:true, width:40, height: 40, itemId:'hiddenButtonDelete' },
					{ xtype:'image', itemId:'realestatelistitemimage', cls:['favoriterealestateslistphoto','phone'] },
					{
						xtype:'panel',
						layout:{
							type:'vbox',
						},
						cls:['realestatelistitemcontenttext','phone'],
						items:[
							{ xtype:'panel', align:'left', itemId:'favoriterealestateitempricetext', cls:['realestatedetailpricetext','phone'] },
							{ xtype:'panel', html:'', itemId:'favoriterealestateslistlocationtext', cls:['locationtext','phone'] },
							{ xtype:'panel', html:'', itemId:'favoriterealestateslisttypebientext', cls:['typebientext','phone'] },
							{ xtype:'panel', html:'', itemId:'favoriterealestateslistsurfacetext', cls:['surfacetext','phone'] },
						],
					},
				],
			},
			{ xtype:'button', ui:'decline', text:'Supprimer', cls:'favoriterealestateitem-buttondelete-phone' },
			{ xtype:'spacer', height:1, width:'100%', cls:'shadow' },
		],
	},
});
Ext.define('MyApp.view.phone.FavoriteRealEstateList', {
	extend:'Ext.dataview.DataView',
	xtype:'favoriterealestatelist',

	requires: [
		'MyApp.view.phone.RealEstateListItem',
	],

	config: {
		cls:'favoriterealestateslist',
		title:'Mes annonces',
		defaultType:'realestatelistitem_phone',
		allowDeselect:false,
		useComponents:true,
		store:'FavoriteRealEstate',
		items:[
			{
				xtype:'panel',
				width:'100%',
				height:'100%',
				itemId:'favoriterealestateagencyname',
				cls:'favorite-realestate-agency-name',
				html:'',
			},
		]
	}
});
Ext.define('MyApp.view.phone.RequestSearchMandate', {
	extend:'MyApp.view.RequestSearchMandate',
    xtype:'requestsearchmandate_phone',
});
Ext.define('MyApp.view.phone.RequestAdDeposit', {
	extend:'MyApp.view.RequestAdDeposit',
    xtype: 'requestaddeposit_phone',
});
Ext.define('MyApp.view.phone.RequestAppraisal', {
	extend:'MyApp.view.RequestAppraisal',
    xtype: 'requestappraisal_phone'
});
Ext.define('MyApp.view.tablet.HomePage', {
	extend:'MyApp.view.HomePage',
	xtype:'homepage_tablet',
	config:{
		firstTimePainted:true,
		layout:{
			type:'vbox',
			align:'middle'
		},

		items:[
			/* Top section */
			{
				xtype:'panel',
				cls:'topsection',
				layout:{type:'vbox',align:'middle'},
				width:'100%',
				items:[
					/* agency name */
					{
						xtype:'panel',
						width:'100%',
						height:'100%',
						itemId:'homepageagencyname',
						cls:'agencyTitle',
						flex:1
					},
					/* search button */
					{
						xtype:'button',
						itemId:'homegotosearch',
						cls:'homegotosearch',
						text:'Recherche',
					}
				]
			},
			
			/* bottom section : highlight */
			{
				/* Bottom is split in two : */
				xtype:'panel',
				flex:1,
				cls:'bottomsection',
				layout:{type:'vbox',align:'middle'},
				width:'100%',
				items:[
					/* carousel */
					{
						xtype:'carousel',
						itemId:'highlight-carousel',
						width:546,
						height:400,
						cls:['highlight-carousel','tablet'],
						direction:'horizontal',
						directionLock: true,
						indicator:false,
					// itemTpl:'{idannonce}',
					},
					/* carousel menu displaying title and go button */
					{
						xtype:'panel',
						itemId:'carousel-menu',
						width:'100%',
						cls:['carousel-menu','tablet'],
						layout:{
							type:'hbox',
							pack:'center'
						},
						items:[
							{xtype:'panel',itemId:'highlight-title',cls:['highlight-title','tablet'],html:"Chargement..."},
							{xtype:'button',text:'Plus de details',itemId:'highlight-go',cls:['highlight-go','tablet']}
						]
					},
				]
			}
		],
	},

	refreshScreenFromModel:function(){
		//Override
		if (this.model){
			var agencyDetailModel = this.model;
			var logo = this.down('#agencyLogo');
			if (agencyDetailModel.get('logo_path')){
				logo.setSrc("src","file://"+agencyDetailModel.get('logo_path'));
			}else{
				if (gIMAGECACHE_DIR==null){
					logo.setSrc(agencyDetailModel.get('logo'));
				}else{
					//console.log("caching dir found, let's wait for the download&cache mechanism to load the resource");
				}
			}
		}
	},

	setAgencyModel:function(agencyDetailModel){
		this.callParent(arguments);
		if (!agencyDetailModel){
			//console.log("no model provided");
			return;
		}
		this.model = agencyDetailModel;
		this.refreshScreenFromModel();
	}
});
Ext.define('MyApp.view.tablet.TwoPanesSearchAndList', {
	extend:'Ext.Panel',
    xtype:'twopanessearchandlist_tablet',

    requires:[
        'MyApp.view.tablet.SearchForm',
        'MyApp.view.tablet.SearchResultsList',
    ],    

    config:{
        itemId:'twopanessearchandlist',
        layout:'hbox',
        items: [
            {
                xtype:'searchform_tablet',
                itemId:'searchform',    
                flex:0.5,
        	},
        	{
                xtype:'searchresultslist_tablet',
                itemId:'searchresultslistview',
                flex:1,
        	},
        ],
    },

});

Ext.define('MyApp.view.tablet.RequestAdMoreInfo', {
	extend:'MyApp.view.RequestAdMoreInfo',
    xtype: 'requestadmoreinfo_tablet',
});
Ext.define('MyApp.view.tablet.FavoriteSearchListItem', {
	extend:'MyApp.view.FavoriteSearchListItem',
	xtype:'favoritesearchlistitem_tablet',

	requires: [
		'Ext.Img'
	],
	config: {
		layout: {
			type: 'vbox'
		},
		items:[
			{
				xtype:'panel',
				layout:{
					type:'hbox',
					align:'center'
				},
				items:[
					{ xtype:'button', ui:'round', text:'', itemId:'favoritesearchlistbuttonnew', cls:'favoritesearchlist-buttonnew'},
					{
						flex:1,
						xtype:'panel',
						layout:{
							type:'vbox',
						},
						items:[
							{ xtype:'panel', html:'0', itemId:'favoritesearchlistville', cls:['favoritesearchlistitemlocationtext','tablet'] },
							{ xtype:'panel', html:'0', itemId:'favoritesearchlistdescription', cls:['favoritesearchlistdescription','tablet'] },
						],
					},
					{
						xtype:'panel',
						layout:{
							type:'vbox',
						},
						items:[
							{ xtype:'button', ui:'decline', text:'Supprimer', cls:'favoritesearchlist-buttondelete-tablet', },
						],
					},
				],
			},
			{ xtype:'spacer', height:1, width:'100%', cls:'shadow' },
		],
	},
});
Ext.define('MyApp.view.tablet.FavoriteSearchSection', {
    extend:'Ext.Panel',
    xtype:'favoritesearchsection_tablet',
    requires:['MyApp.view.tablet.FavoriteSearchListItem'],

    config:{
        itemId:'favoritesearchsection',
        layout:'fit',
        items: [
            {
                xtype:'dataview',
                itemId:'favoritesearchlist',
                title:'Mes Recherches',
    			cls:'favoritesearchlist',
    			defaultType:'favoritesearchlistitem_tablet',
    			useComponents: true,
                store: 'FavoriteSearch',
				items: [
					{
						xtype:'panel',
						width:'100%',
						height:'100%',
						itemId:'favoritesearchsectionagencyname',
						cls:'favorite-search-section-agency-name',
						html:'',
					},
				]
            }
    	],
    },

    initialize: function() {
        //console.log("MyApp.view.tablet.FavoriteSearchSection - initialize()");
        this.callParent();
    }

});

Ext.define('MyApp.view.tablet.RealEstateListItem', {
	extend:'MyApp.view.RealEstateListItem',
	xtype:'realestatelistitem_tablet',

	requires: [
		'Ext.Img'
	],

	config: {
		layout:{
			type:'vbox',
		},
		items:[
			{
				xtype:'panel',
				cls:['realestatelistitemcontent','tablet'],
				width:'100%',
				layout:{
					type:'hbox',
				},
				items:[
					{ xtype:'image', itemId:'realestatelistitemimage', cls:['favoriterealestateslistphoto','tablet'] },
					{
						xtype:'panel',
						layout:{
							type:'vbox',
						},
						flex:1,
						items:[
							{ xtype:'panel', html:'', itemId:'favoriterealestateitempricetext', cls:['searchresultslistitemtpricetext','tablet']},
							{ xtype:'panel', html:'', itemId:'favoriterealestateslistlocationtext', cls:['searchresultslistitemlocationtext','tablet'] },
							{
								xtype:'panel',
								layout:{
									type:'hbox'
								},
								items:[
									{ xtype:'panel', itemId:'favoriterealestateslisttypebientext', cls:['searchresultslistitemtypebientext','tablet'] },
									{ xtype:'spacer',width:10},
									{ xtype:'panel', itemId:'favoriterealestateslistsurfacetext', cls:['searchresultslistitemtypesurfacetext','tablet'] },
								]
							},
							{ xtype:'panel',flex:1, html:'', itemId:'favoriterealestateitemdescriptif', cls:['favoriterealestatedetaildescriptiftext','tablet']},
						]
					},
				],
			},
			{ xtype:'button', ui:'decline', text:'Supprimer', cls:'favoriterealestateitem-buttondelete-tablet',},
			{ xtype:'spacer', height:1, width:'100%', cls:'shadow' },
		],
	},
	adaptDescriptif:function(descriptif){
		if (descriptif.length > 300){
			return (descriptif.substring(0,300)+"...");
		}
		return (descriptif);
	},

});
Ext.define('MyApp.view.tablet.FavoriteRealEstateSection', {
    extend:'Ext.Panel',
    xtype:'favoriterealestatesection_tablet',

    requires:['MyApp.view.tablet.RealEstateListItem'],    
    
    config:{
        itemId:'favoriterealestatesection',
        layout:'fit',
        items: [
            {
                title:'Mes annonces',
                xtype:'dataview',
				itemId:'favoriterealestateslist',
				cls:'favoriterealestateslist',
				defaultType:'realestatelistitem_tablet',
				useComponents:true,
				store:'FavoriteRealEstate',
				items:[
					{
						xtype:'panel',
						width:'100%',
						height:'100%',
						itemId:'favoriterealestateagencyname',
						cls:'favorite-realestate-agency-name',
						html:'',
					},
				]
            },
        ],
    },

    initialize: function() {
        //console.log("MyApp.view.tablet.FavoriteRealEstateSection - initialize()");
        this.callParent();
    }

});

Ext.define('MyApp.view.tablet.RequestAppraisal', {
	extend:'MyApp.view.RequestAppraisal',
    xtype: 'requestappraisal_tablet'
});
Ext.define('MyApp.view.tablet.RequestAdDeposit', {
	extend:'MyApp.view.RequestAdDeposit',
    xtype: 'requestaddeposit_tablet'
   
});
Ext.define('MyApp.view.tablet.RequestSearchMandate', {
	extend:'MyApp.view.RequestSearchMandate',
    xtype:'requestsearchmandate_tablet',
       
});
Ext.define('MyApp.view.phone.DPEconso', {
    extend: 'MyApp.view.DPEconso',    
    xtype: 'dpeconso_phone',
    
    config:{
        cls:'dpeconso',
        layout:{
            type:'vbox',
        },
        items:[
            { 
                xtype:'panel',
                itemId:'DPE_title',
                cls:['DPE_title','phone'],
            },
            
            {
                xtype:'panel',
                layout:'hbox',
                items:[
                    {
                        xtype:'image',
                        cls:'bareme',
                        src:'theming/images/dpe-kwh.png',
                        width:200,
                        height:200

                    },

                    {
                        xtype:'panel',
                        layout:'vbox',
                        items:[
                            {
                                xtype:'image',
                                itemId:'arrow',
                                cls:'arrow',
                                src:'theming/images/arrow.png',
                                width:45,
                                height:22,
                            },
                            {
                                xtype:'panel',
                                itemId:'arrow_text',
                                cls:'arrow_text',
                                width:45,
                                height:22
                            }
                        ]
                    }
                ]
            }
        ],
    },

});
Ext.define('MyApp.view.phone.DPEemission', {
    extend: 'MyApp.view.DPEemission',    
    xtype: 'dpeemission_phone',

    config:{
        cls:'dpeemission',
        layout:{
            type:'vbox',
        },
        items:[
            { 
                xtype:'panel',
                itemId:'DPE_title',
                cls:['DPE_title','phone'],
            },
            
            {
                xtype:'panel',
                layout:'hbox',
                items:[
                    {
                        xtype:'image',
                        cls:'bareme',
                        src:'theming/images/dpe-ges.png',
                        width:200,
                        height:200

                    },
                    {
                        xtype:'panel',
                        layout:'vbox',
                        items:[
                            {
                                xtype:'image',
                                itemId:'arrow',
                                cls:'arrow',
                                src:'theming/images/arrow.png',
                                width:45,
                                height:22,
                            },
                            {
                                xtype:'panel',
                                itemId:'arrow_text',
                                cls:'arrow_text',
                                width:45,
                                height:22
                            }
                        ]
                    }
                ]
            }
        ],
    },
});
Ext.define('MyApp.view.phone.RealEstateDetail', {
	extend: 'MyApp.view.RealEstateDetail',
	xtype: 'realestatedetail_phone',

	requires:[
		'MyApp.view.phone.DPEconso',
		'MyApp.view.phone.DPEemission',
		'MyApp.view.phone.Thumbnails',
		'MyApp.view.phone.RealEstateMap',
	],

	config:{
		title:'Annonce',
		cls:['realestatedetail','phone'],
		layout:{
			type:'vbox',
		},
		items:[
			{
				xtype:'panel',
				layout:'hbox',
				items:[
					{ flex:1, xtype:'image', width:105, height:84, itemId:'realestatedetailimage', cls:'realestatedetailimage', },
					{ flex:1, xtype:'panel',
						layout:{
							type:'vbox',
							align:'left'
						},
						items:[
							{
								xtype:'panel',
								layout:'hbox',
								items:[
									{ xtype:'panel', readOnly:true, itemId:'realestatedetailpricetext', cls:['realestatedetailpricetext','phone'] },
									{ xtype:'panel', readOnly:true, itemId:'realestatedetailbientext', cls:['realestatedetailbien','phone'] },
								]
							},
							
							{ xtype:'panel', readOnly:true, itemId:'realestatedetaillocationtext', cls:['realestatedetaillocationtext','phone'] },
							{ xtype:'panel', readOnly:true, itemId:'realestatedetailtypebientext', cls:['realestatedetailtypebientext','phone'] },
							{ xtype:'panel', readOnly:true, itemId:'realestatedetailsurfacenbpiecetext', cls:['realestatedetailsurfacenbpiecetext','phone'] },
						]
					},
					{
						xtype:'button', 
						ui:'round', 
						itemId:'realEstateDetailShowMapButton', 
						cls:['realEstateDetailShowMapButton','phone'],
						docked:'right',
					},
				],
			},

			// *Prix net, hors frais notariÃ©s, d'enregistrement et de publicitÃ© fonciÃ¨re
			// **Loyer mensuel charges comprises
			{ xtype:'panel', readOnly:true, itemId:'realestatedetailbienvente', html:"*Prix net, hors frais notari&eacute;s, d'enregistrement et de publicit&eacute; fonci&egrave;re", cls:['realestatedetailbienetoile','phone'], hidden:true },
			{ xtype:'panel', readOnly:true, itemId:'realestatedetailbienlocation', html:"**Loyer mensuel charges comprises", cls:['realestatedetailbienetoile','phone'], hidden:true },

			{ xtype:'spacer', height:5, width:'100%' },
			{ xtype:'spacer', height:1, width:'100%', cls:'shadow' },
			{ xtype:'spacer', height:5, width:'100%' },
			// Images
			{
				xtype:'panel',
				layout:{
					type:'hbox',
				},
				cls:['blocNbPhoto','phone'],
				items:[
					{ xtype:'panel', itemId:'nbPhoto', cls:['nbPhoto','phone']},
					{ xtype:'spacer', height:1, width:5 },
					{ xtype:'panel', itemId:'nbPhotoCount', cls:['nbPhotoCount','phone']},
				]
			},
			{
				xtype:'panel',
				layout:{
				type:'hbox',
				},
				items:[
					{ flex:1, xtype:'image', width:64, height:49, itemId:'realestatedetailimage1', cls:['realestatedetailimage','phone'] },
					{ flex:1, xtype:'spacer', width:2 },
					{ flex:1, xtype:'image', width:64, height:49, itemId:'realestatedetailimage2', cls:['realestatedetailimage','phone'] },
					{ flex:1, xtype:'spacer', width:2 },
					{ flex:1, xtype:'image', width:64, height:49, itemId:'realestatedetailimage3', cls:['realestatedetailimage','phone'] },
					{ flex:1, xtype:'spacer', width:2 },
					{ flex:1, xtype:'image', width:64, height:49, itemId:'realestatedetailimage4', cls:['realestatedetailimage','phone'] },
				],
			},

			{ xtype:'panel',
				layout:{
					type:'vbox',
				},
				itemId:'imgspacer',
				items:[
					{ xtype:'spacer', height:5, width:'100%' },
					{ xtype:'spacer', height:1, width:'100%', cls:'shadow' },
				]
			},
			{
				xtype:'panel',
				readOnly:true, 
				layout:'vbox',
				items:[
					{
						xtype: 'panel',
						html: 'Description',
						cls:['h2','phone'],
					},
					{
						xtype: 'panel',
						itemId:'realestatedetaildescriptiftext', 
						cls:['boxDetails','phone'],
					},
				]
			},
			
			{
				xtype:'panel',
				itemId:'DPE',
				layout:'vbox',
				items:[
						{
						xtype: 'panel',
						html: 'Performance &eacute;nerg&eacute;tique (DPE)',
						cls:['h2','phone'],
						},
						{
						xtype: 'panel',
						cls:['boxDetails','phone'],
						items: [
							{
								xtype:'panel',
								layout:{
									type:'vbox',
								},
								items:[
									{
										xtype:'dpeconso_phone',
										itemId:'dpeconso',
										cls:'dpeconso',
									},
									{ xtype:'spacer',width:10 },
									{
										xtype:'dpeemission_phone',
										itemId:'dpeemission',
										cls:'dpeemission',
									},
								]
							},
						]
					},
				]
			},
			{
				xtype: 'panel',
				html: 'Informations additionnelles',
				cls:['h2','phone'],
			},
			{
				xtype: 'fieldset',
				itemId:'realestatedetailoptionalfieldset',
			},
			{ xtype:'spacer', height:1, width:'100%', cls:'shadow' },
			{ xtype:'spacer', height:5, width:'100%' },
			{
				xtype:'panel',
				layout:{
					type:'vbox',
				},
				items:[
					{ xtype:'button', itemId:'buttonaddtofavorite', width:'100%', text:'Ajouter aux favoris', cls:['buttongreen','phone']},
					{ xtype:'spacer', width:10 },
					{ xtype:'button', itemId:'buttonrequestmoreinfo', width:'100%', text:"Demande d'information", cls:['buttongreen','phone'] },
					{ xtype:'spacer', width:10 },
					{ xtype:'button', itemId:'mensualite', width:'100%', text:"Simulez vos mensualit&eacute;s", cls:['buttongreen','phone'] },
					{ xtype:'button', itemId:'financement', width:'100%', text:"Demande de financement", cls:['buttongreen','phone'] },
				],
			},
			{ xtype:'spacer', height:10, width:'100%' },
			{ xtype:'spacer', height:1, width:'100%', cls:'shadow' },
			{
				xtype: 'panel',
				html: 'Informations agence',
				cls:['h2','phone'],
			},
			{
				xtype: 'fieldset',
				items: [
					{ xtype:'image', itemId:'realestatedetaillogo', mode: 'image', cls:['realEstateDetailLogo'] },
					{ xtype:'panel', padding:'0 0 1 10', readOnly:true, itemId:'agence', cls:['agencyName','phone'] },
					{ xtype:'panel', padding:'0 0 1 10', readOnly:true, itemId:'agenceadresse', cls:['agencyAddress','phone'] },
					{ xtype:'panel', padding:'0 0 1 10', readOnly:true, itemId:'agencelocalisation', cls:['agencyLocalisation','phone'] },
					{
						xtype:'panel',
						padding:'0 0 2 10',
						layout:'hbox',
						items:[
							{ xtype:'image', padding:'0 0 3 0', cls:['realEstateDetailAgencyPictoTel','phone']},
							{ xtype:'panel', readOnly:true, itemId:'agencetel', cls:['agencyTel','phone'] },
						],
					},
					{ xtype:'panel', readOnly:true, itemId:'agencercs', cls:['realeEstateDetailagencyRCS','phone'] },
					{ xtype:'panel',
						layout:{
							type:'hbox',
						},
						padding:'0 10 10 0',
						items:[
							{ xtype:'button', flex:1, text:'Appeler', itemId:'butAgencyPhone', cls:['buttongreenPhone','phone'],},
							{ xtype:'button', flex:1, itemId:'buttonrequestmoreinfo', text:"E-mail", cls:['buttongreenEmail','phone'] },
						],
					}
				]
			},
		]
	},
	onTapImage: function(){
		//console.log('MyApp.view.phone.RealEstateDetail');
		var realEstateThumbnailStore = Ext.getStore('RealEstateThumbnails');
		realEstateThumbnailStore.load({
			scope: this,
			params: {
				img:this.getSrc(),
			},
			callback: function(records,operation,success){
				var itemId=this.getItemId();
				//console.log('itemId is ' + itemId);
				var indice = itemId.replace('realestatedetailimage','');
				indice--;
				//console.log(". agencyHighlightStore.load callback indice is " + indice);
				if (success){
					MyApp.app.getControllerInstances()['MyApp.controller.phone.Main'].showRealEstateThumbnailView(realEstateThumbnailStore.getData(),indice);
				}else{
					//console.log('MyApp.view.phone.Thumbnails - error');
				}
			}
        });
	},
});
Ext.define('MyApp.view.phone.HomeSection', {
	extend:'Ext.navigation.View',
	xtype:'homesection_phone',

	requires:[
		'MyApp.view.phone.HomePage',
		'MyApp.view.phone.RealEstateDetail',
	],

	config:{
		itemId:'homesection',
		cls:['homesection','phone'],
		autoDestroy:true,
		items:[
			{
				xtype:'homepage_phone',
				itemId:'homepage',
				title:'Accueil'
			},
		],
	},
});

Ext.define('MyApp.view.phone.SearchSection', {
	extend:'Ext.navigation.View',
	xtype:'searchsection_phone',

	requires:[
		'MyApp.view.phone.SearchForm',
		'MyApp.view.phone.SearchResultsList',
		'MyApp.view.phone.RealEstateDetail',
		'MyApp.view.phone.RequestAdMoreInfo',
		'MyApp.view.phone.Thumbnails',
		'MyApp.view.phone.RealEstateMap',
	],

	config:{
		itemId:'searchsectionnavigationview',
		defaultBackButtonText:'Retour',
		autoDestroy:true,

		navigationBar: {
			items: [
				{
					xtype:'button',
					itemId:'searchresultslistbuttonsave',
					text:'Enregistrer',
					align:'right',
					hidden:true,
				},
			]
		},
		items: [
			{
				xtype:'searchform_phone',
				itemId:'searchform',
			},
		],
	},
});

Ext.define('MyApp.view.phone.FavoriteRealEstateSection', {
	extend:'Ext.navigation.View',
	xtype:'favoriterealestatesection_phone',

	requires:[
		'MyApp.view.phone.FavoriteRealEstateList',
		'MyApp.view.phone.RealEstateListItem',
		'MyApp.view.phone.RealEstateDetail',
		'MyApp.view.phone.RequestSearchMandate',
	],

	config:{
		itemId:'favoriterealestatesection',
		layout:{
			type:'card',
		},
		autoDestroy:true,
		items:[
			{
				xtype:'favoriterealestatelist',
				itemId:'favoriterealestateslist',
			},
		],
	},
});

Ext.define('MyApp.view.phone.RequestAgencyInfo', {
	extend:'MyApp.view.RequestAgencyInfo',
    xtype: 'requestagencyinfo_phone',
});
Ext.define('MyApp.view.phone.AgencyPage', {
	extend: 'Ext.Panel',
	xtype: 'agencypage_phone',
	requires:[
		'MyApp.view.phone.RequestAgencyInfo',
		'MyApp.model.RequestAgencyInfo'
	],
	config:{
		cls:'agencypage',
		scrollable:{
			direction:'vertical',
			directionLock:true,
		},
		layout:{
			type:'vbox',
		},
		itemId:'agencypage',
		items:[
			{
				xtype:'panel',
				itemId:'agencyDetail',
				cls:['agencyDetail','phone'],
				layout:{
					type:'vbox',
				},
				items:[
					{
						xtype:'panel',
						layout:{
							type:'hbox'
						},
						items:[
							{ xtype:'image', flex:1, itemId:'agencyLogoImage', mode:'image', docked:'left', cls:['agencyLogo','phone']},
							{ xtype:'image', flex:1, itemId:'agencyShopImage', mode:'image', docked:'right', cls:['agencyShopImage','phone']},
						]
					},
					{
						xtype:'panel',
						itemId:'agencyCoordonnees',
						layout:{
							type:'vbox',
							align:'left',
						},
						items:[
							{ xtype:'panel', itemId:'agencyName', cls:['agencyPageAgencyName','phone'] },
							{ xtype:'panel', itemId:'agencyContact', cls:['agencyPageAgencyContact','phone'] },
							{ xtype:'panel', itemId:'agencyAddress', cls:['agencyPageAgencyAddress','phone'] },
							{ xtype:'panel', itemId:'agencyLocation', cls:['agencyPageAgencyLocalisation','phone'] },
							{ xtype:'panel', itemId:'agencyRCS', cls:['agencyPageAgencyRCS','phone'] },
							{
								xtype:'panel',
								layout:'hbox',
								items:[
									{ xtype:'image', padding:'0 0 3 5', cls:['agencyPictoTel','phone']},
									{ xtype:'panel', readOnly:true, itemId:'agencyTel', cls:['agencyTel','phone'] },
								],
							},
						]
					},
				]
			},
			{
				xtype:'panel',
				layout:{
					type:'hbox',
				},
				cls:['blocButtonGreenPhoneAndEmail','phone'],
				items:[
					{ xtype:'button', flex:1, text:'Appeler', itemId:'butAgencyPhone', cls:['buttongreenPhone','phone'],},
					{ xtype:'button', flex:1, text:'E-mail', itemId:'butAgencyEmail', cls:['buttongreenEmail','phone'],},
				]
			},
			{
				xtype:'panel',
				cls:['blocSocial','phone'],
				layout:{type:'hbox'},
                itemId:'panelBlocSocial',
				items:[
					{
						xtype:'panel',
						layout:{
							type:'hbox',
						},
						flex:1,
						items:[
							{ xtype:'image', itemId:'butShowAgencyMap', cls:['butShowAgencyMap','phone'],},
							{ xtype:'panel', html:"Localiser", cls:['localiserText','phone']},
						]
					},
                    
                    { xype: 'panel',
                        itemId:'panelFacebook',
                        hidden:true,
                        items:[
                            { xtype:'panel',
                                layout:{
                                    type:'hbox',
                                },
                                flex:1,
                                items:[
                                    { xtype:'image', itemId:'butAgencyFacebook', cls:['butAgencyFacebook','phone'],},
                                    { xtype:'panel', html:"Facebook", cls:['facebookText','phone']},
                                ]
                            }
                        ]
					},
                    
                    
                  { xype: 'panel',
                        itemId:'panelTwitter',
                        hidden:true,
                        items:[  
                            { xtype:'panel',
                                layout:{
                                    type:'hbox',
                            },
                            flex:1,
                            items:[
                                    { xtype:'image', itemId:'butAgencyTwitter', cls:['butAgencyTwitter','phone'],},
                                    { xtype:'panel', html:"Twitter", cls:['twitterText','phone']}
                                ]
                            }
                   
                         ]
					},
                    
  
                    
				]
			},
            
            
            
            
            
			{ xtype:'spacer', height:'20px'},
			{
				xtype:'panel',
				html:'Services',
				cls:'agencyservicestitle',
			},
			{ xtype:'spacer', height:'1px'},
			{
				xtype:'panel',
				cls:['agencypageformspanel','phone','shadow'],
				layout:{
					type:'vbox',
					align:'middle',
				},
				items:[
					{ xtype:'spacer', height:'20px'},
					{ xtype:'button', text:"Demande d'estimation", itemId:'buttonRequestAppraisal', width:'100%', cls:['buttongreen','phone'] },
					{ xtype:'button', text:"D&eacute;p&ocirc;t d'annonce", itemId:'buttonRequestAdDeposit', width:'100%', cls:['buttongreen','phone'] },
					{ xtype:'button', text:"Mandat de recherche", itemId:'buttonRequestSearchMandate', width:'100%', cls:['buttongreen','phone'] },
				],
			},
		],
	},
	
	setAgencyModel: function(agencyDetailModel){
		this.model=agencyDetailModel;
		if (agencyDetailModel){
            //var blocSocial=false;
			this.down('#agencyName').setHtml(agencyDetailModel.get('nom'));
			this.down('#agencyAddress').setHtml(agencyDetailModel.get('adresse'));
			this.down('#agencyLocation').setHtml(agencyDetailModel.get('ville') + '(' + agencyDetailModel.get('cp') + ')');
			this.down('#agencyTel').setHtml(agencyDetailModel.get('tel'));
			if (agencyDetailModel.get('rcs')){
				this.down('#agencyRCS').setHtml('RCS '+agencyDetailModel.get('rcs'));
				this.down('#agencyRCS').show();
			}else{
				this.down('#agencyRCS').hide();
			}
			
			this.down('#agencyContact').setHtml("Responsable "+agencyDetailModel.get('directeur'));
			
			if(agencyDetailModel.get('logo')){
				this.down('#agencyLogoImage').setSrc(agencyDetailModel.get('logo'));
				this.down('#agencyLogoImage').show();
			}else{
				this.down('#agencyLogoImage').hide();
			}
			if (agencyDetailModel.get('vitrine')){
				this.down('#agencyShopImage').setSrc(agencyDetailModel.get('vitrine'));
				this.down('#agencyShopImage').show();
				//console.log('MyApp.view.phone.AgencyPage - setAgencyModel vitrine is ' + agencyDetailModel.get('vitrine'));
			}else{
				this.down('#agencyShopImage').hide();
			}
			
			// Button Email
			var but;
			but = this.down('#butAgencyEmail');
			if (agencyDetailModel.get('email')){
				but.show();
			}else{
				but.hide();
			}
			
			// Button Facebook
			but = this.down('#butAgencyFacebook');
            var panelFacebook=this.down('#panelFacebook');
			if (but && agencyDetailModel.get('facebook')){
				but.show();
                panelFacebook.show();
         
			}else{
				if (but){
					but.hide();
				}
               
			}
			
			// Button Twitter
			but = this.down('#butAgencyTwitter');
            var panelTwitter=this.down('#panelTwitter');
			if (but && agencyDetailModel.get('twitter')){
				but.show();
                panelTwitter.show();
			}else{
				if (but){
					but.hide();
				}
                 
			}
         
		}
	},
});
Ext.define('MyApp.view.phone.AgencySection', {
	extend:'Ext.navigation.View',
	xtype:'agencysection_phone',

	requires:[
		'MyApp.view.phone.AgencyPage',
		'MyApp.view.phone.AgencyMap',
		'MyApp.view.phone.RequestAdDeposit',
		'MyApp.view.phone.RequestAppraisal',
		'MyApp.view.phone.RequestSearchMandate',
	],
	config:{
		itemId:'agencysection',
		cls:['agencysection','phone'],
		autoDestroy:true,
		items:[
			{
				xtype:'agencypage_phone',
				itemId:'agencypage',
				title:'Agence',
			},
		],
	},
});

Ext.define('MyApp.view.phone.Main', {
    extend: 'Ext.TabPanel',
    doTabChange: function(tabBar, newTab) {
        this.setActiveItem(tabBar.indexOf(newTab));
    },
    requires: [
        'MyApp.view.phone.HomeSection',
        'MyApp.view.phone.SearchSection',
        'MyApp.view.phone.FavoriteSearchSection',
        'MyApp.view.phone.FavoriteRealEstateSection',
        'MyApp.view.phone.AgencySection',
    ],

    config:{
        fullscreen:true,
        itemId:'apptabpanel',
        tabBarPosition:'bottom',
        tabBar:{
            layout:{
                pack:'center'
            }
        },
        items:[
            {
                xtype:'homesection_phone',
                iconCls:'home',
                title:'Accueil',
            },
            {
                xtype:'searchsection_phone',
                iconCls:'search',
                title:'Rechercher',
            },
            {
                xtype:'favoritesearchsection_phone',
                iconCls:'star',
                title:'Mes recherches',
            },
            {
                xtype:'favoriterealestatesection_phone',
                iconCls:'star',
                title:'Mes annonces',
            },
            {
                xtype:'agencysection_phone',
                iconCls:'info',
                title:'Agence',
            }
        ]               
    }
});
Ext.define('MyApp.view.tablet.DPEconso', {
    extend: 'MyApp.view.DPEconso',    
    xtype: 'dpeconso_tablet',
    
    config:{
        cls:'dpeconso',
        layout:{
            type:'vbox',
        },
        items:[
            { 
                xtype:'panel',
                itemId:'DPE_title',
                cls:'DPE_title',
            },
            
            {
                xtype:'panel',
                layout:'hbox',
                items:[
                    {
                        xtype:'image',
                        cls:'bareme',
                        src:'theming/images/dpe-kwh.png',
                        width:200,
                        height:200

                    },

                    {
                        xtype:'panel',
                        layout:'vbox',
                        items:[
                            {
                                xtype:'image',
                                itemId:'arrow',
                                cls:'arrow',
                                src:'theming/images/arrow.png',
                                width:45,
                                height:22,
                            },
                            {
                                xtype:'panel',
                                itemId:'arrow_text',
                                cls:'arrow_text',
                                width:45,
                                height:22
                            }
                        ]
                    }
                ]
            }
        ],
    },

});
Ext.define('MyApp.view.tablet.DPEemission', {
    extend: 'MyApp.view.DPEemission',    
    xtype: 'dpeemission_tablet',

    config:{
        cls:'dpeemission',
        layout:{
            type:'vbox',
        },
        items:[
        { 
            xtype:'panel',
            itemId:'DPE_title',
            cls:'DPE_title',
        },
        
        {
            xtype:'panel',
            layout:'hbox',
            items:[
            {
                xtype:'image',
                cls:'bareme',
                src:'theming/images/dpe-ges.png',
                width:200,
                height:200

            },
            {
                xtype:'panel',
                layout:'vbox',
                items:[
                    {
                        xtype:'image',
                        itemId:'arrow',
                        cls:'arrow',
                        src:'theming/images/arrow.png',
                        width:45,
                        height:22,
                    },
                    {
                        xtype:'panel',
                        itemId:'arrow_text',
                        cls:'arrow_text',
                        width:45,
                        height:22
                    }
                ]
            }
            ]
        }
        ],
    },
});
Ext.define('MyApp.view.tablet.RealEstateDetail', {
	extend:'MyApp.view.RealEstateDetail',
	xtype:'realestatedetail_tablet',

	requires:[
		'MyApp.view.tablet.DPEconso',
		'MyApp.view.tablet.DPEemission'
	],

	config:{
		hideOnMaskTap:true,
		cls:['realestatedetail','tablet'],
		layout:{
			type:'vbox',
		},
		items:[
			{
				xtype:'panel',
				itemId:'estateTopBar',
				cls:['estateTopBar','tablet'],
				layout:'hbox',
				docked:'top',
				items:[
					{ xtype:'panel', readOnly: true, itemId:'realestatedetailtypebientext', cls:['realestatedetailtypebientext','tablet'] },
					{ xtype:'panel', cls:['textspacer', 'tablet'] , html:'-'},
					{ xtype:'panel', readOnly: true, itemId:'realestatedetailsurfacenbpiecetext', cls:['realestatedetailsurfacenbpiecetext','tablet'] },
					{ xtype:'panel', cls:['textspacer', 'tablet'] , html:'-'},
					{ xtype:'panel', readOnly: true, itemId:'realestatedetaillocationtext', cls:['realestatedetaillocationtext','tablet'] },
					{ xtype:'panel', readOnly: true, itemId:'realestatedetailpricetext', cls:['realestatedetailpricetext','tablet'], docked:'right' },
					{ xtype:'panel', readOnly: true, itemId:'realestatedetailbientext', cls:['realestatedetailbientext','tablet'] },
				]
			},
			{
				xtype:'panel',
				layout:{
					type:'hbox'
				},
				scrollable:{
					direction:'horizontal',
					directionLock:true
				},
				cls:['realestatedetailcarousel','tablet'],
				itemId:'realestatedetailcarousel',
			},
			{ xtype:'panel', readOnly:true, itemId:'realestatedetaildescriptiftext',cls:['realestatedetaildescriptiftext','tablet'] },
			// *Prix net, hors frais notariés, d'enregistrement et de publicité foncière
			// **Loyer mensuel charges comprises
			{ xtype:'panel', readOnly:true, itemId:'realestatedetailbienvente', html:"*Prix net, hors frais notari&eacute;s, d'enregistrement et de publicit&eacute; fonci&egrave;re", cls:['realestatedetailbienetoile','tablet'], hidden:true },
			{ xtype:'panel', readOnly:true, itemId:'realestatedetailbienlocation', html:"**Loyer mensuel charges comprises", cls:['realestatedetailbienetoile','tablet'], hidden:true },
			{ xtype:'spacer', height:15},
			// DPE
			{
				xtype:'panel',
				itemId:'DPE',
				layout:'vbox',
				items:[
					{ xtype:'panel', itemId:'DPETitle', cls:['sectionBar','tablet'], html:'Performance &eacute;nerg&eacute;tique'},
					{ xtype:'spacer', cls:['sectionBarBellow','tablet']},
					{ xtype:'spacer', height:10},
					{
						xtype:'panel',
						layout:{
							type:'hbox',
						},
						width:'100%',
						height:230,
						cls:['realeestatedetailblocdpe','tablet'],
						items:[
							{
								xtype:'dpeconso_tablet',
								itemId:'dpeconso',
								cls:['dpeconso','tablet'],
								flex:1,
							},
							{
								xtype:'dpeemission_tablet',
								itemId:'dpeemission',
								flex:1,
								cls:['dpeemission','tablet'],
							},
						]
					},
				]
			},
			// Infos additionnelles
			{
				xtype: 'panel',
				cls:['realestatedetailoptionalfieldsetbloc','tablet'],
				items:[
					{ xtype:'panel',
						itemId:'realestatedetailoptionalfieldset',
						cls:['realestatedetailoptionalfieldset','tablet'],
					}
				]
			},
			{ xtype:'panel', cls:['sectionBar','tablet','h2'], html:'Agence'},
			{ xtype:'spacer', cls:['sectionBarBellow','tablet']},
			{
				xtype: 'fieldset',
				cls:['realestatedetailinfoagence','tablet'],
				items: [
					{ xtype:'panel',
						layout:{
							type:'hbox',
						},
						items:[
							{ xtype:'panel',
								layout:{
									type:'vbox',
								},
								flex:1,
								cls:['realestatedetailblocinfoagence','tablet'],
								items:[
									{ xtype:'panel', padding:'0 0 1 10', readOnly:true, itemId:'agence', cls:['agencyName','phone'] },
									{ xtype:'panel', padding:'0 0 1 10', readOnly:true, itemId:'agenceadresse', cls:['agencyAddress','phone'] },
									{ xtype:'panel', padding:'0 0 1 10', readOnly:true, itemId:'agencelocalisation', cls:['agencyLocalisation','phone'] },
									{
										xtype:'panel',
										padding:'0 0 5 10',
										layout:'hbox',
										items:[
											{ xtype:'panel', cls:['realEstateDetailAgencyPictoTel','phone']},
											{ xtype:'panel', readOnly:true, itemId:'agencetel', cls:['agencyTel','phone'] },
										],
									},
									{ xtype:'panel', readOnly:true, itemId:'agencercs', cls:['realeEstateDetailagencyRCS','tablet'] },
								]
							},
							{ xtype:'panel',
								layout:{
									type:'vbox',
								},
								flex:1,
								docked:'right',
								cls:['realeestatedetailbloclogo','tablet'],
								items:[
									{ xtype:'image', itemId:'realestatedetaillogo', mode: 'image', cls:['realEstateDetailLogo','tablet'], docked:'top'},
									{ xtype:'button', itemId:'buttonrequestmoreinfo', cls:['realeestateButAgencyEmail','tablet'],
									docked:'right'},
								]
							}
						]
					},
				]
			},
			{
				xtype:'panel',
				layout:{
					type:'vbox'
				},
				itemId:'mapBloc',
				hidden:true,
				items:[
					{ xtype:'panel', cls:['sectionBar','tablet','h2'], html:'G&eacute;olocalisation'},
					{ xtype:'spacer', cls:['sectionBarBellow','tablet']},
					{
						xtype: 'fieldset',
						cls:['realestatedetailmapbloc','tablet'],
						items:[
							{
								xtype:'map',
								layout:'vbox',
								padding:'10 10 10 10',
								ui:'normal',
								height:300,
								itemId:'realEstateMap',
							},
						]
					},
				]
			},
			{
				xtype:'panel',
				docked:'bottom',
				cls:['custombuttonbar','tablet'],
				layout:{
					type:'hbox',
				},
				items:[
					{ xtype:'button', flex:1, ui:'action', margin:'0 10 0 0', itemId:'buttonaddtofavorite', text:'Ajouter aux favoris'},
					{ xtype:'button', flex:1, ui:'action', margin:'0 10 0 0', itemId:'mensualite', text:'Simulez vos mensualit&eacute;s' },
					{ xtype:'button', flex:1, ui:'action', margin:'0 10 0 0', itemId:'financement', text:'Demande de financement' },
				],
			},
		]
	},

	initialize: function(){
		//console.log("MyApp.view.tablet.RealEstateDetail - initialize()");
		this.callParent();
	},
	fillCarousel: function(realEstateThumbnailStore){
		var carousel=this.down('#realestatedetailcarousel'),
			i=0,
			items=[],
			left=40,
			elem=null;
		for (;i<realEstateThumbnailStore.length;i++){
			elem = realEstateThumbnailStore.items[i];
			//console.log(elem.data['idphoto']);
			//console.log(elem.data['img']);
			items.push(
				{
					xtype:'image',
					itemId:elem.data['idphoto'],
					cls:['thumbnail','tablet'],
					src:elem.get('img'),
					model:elem,
				}
			);
		}
		if(items.length == 2){
			for(i=0;i<items.length;i++){
				items[i].left = left + 'px';
				left += 400;
			}
			carousel.setScrollable(false);
		}else if(items.length == 1){
			items[0].left='250px';
			carousel.setScrollable(false);
		}
		if(items.length > 0){
			carousel.setItems(items);
		}
	},
	initGMapWithRealEstateModel:function(model){
		if(model.get("lat") != null && model.get("lng") != null){
			//console.log('MyApp.view.table.RealEstateDetail - initGMapWithRealEstateModel() lat is ' + model.get("lat"));
			//console.log('MyApp.view.table.RealEstateDetail - initGMapWithRealEstateModel() lng is ' + model.get("lng"));
			var sencha_map = this.down("#realEstateMap");
			var map = sencha_map.getMap(),
				pos = new google.maps.LatLng(model.get("lat"),model.get("lng"));
			this.pos = pos;
			if (!this.agencyMarker){
				this.agencyMarker = new google.maps.Marker({
					map: map,
					position: pos,
					animation:google.maps.Animation.DROP,
					title: model.get("ville"),
					visible:true
				});
			}
			map.panTo(pos);
			this.down('#mapBloc').setHidden(false);
		}else{
			//console.log('MyApp.view.table.RealEstateDetail - initGMapWithRealEstateModel() lat && lng are null');
			this.down('#mapBloc').setHidden(true);
		}
	},
	mapPanToCenter: function(){
		var sencha_map = this.down("#realEstateMap");
		var mapBloc=this.down('#mapBloc');
		var map = sencha_map.getMap();
		if(!mapBloc.getHidden()){
			map.panTo(this.pos);
		}
	},
});
Ext.define('MyApp.view.tablet.HomeSection', {
    extend:'Ext.Panel',
    xtype:'homesection_tablet',

    requires:[
        'MyApp.view.tablet.HomePage',
        'MyApp.view.tablet.RealEstateDetail',
    ],

    config:{
        itemId:'homesection',
        cls:'homesection',
        layout:'fit',
        items: [
            {
                xtype:'homepage_tablet',
                title:'Accueil',
                itemId:'homepage',
                flex:1
            },
            {
                xtype:'realestatedetail_tablet',
                itemId:'highlight-detail',
                title:'d&ecaute;tail highlight',
                modal:true,
                centered:true,
                hidden:true,
                width:'70%',
                height:'70%'
            },
        ],
    },

    initialize: function(){
        //console.log("MyApp.view.tablet.HomeSection - initialize()");
        this.callParent();    
    }

});

Ext.define('MyApp.view.tablet.SearchSection', {
	extend:'Ext.Panel',
    xtype:'searchsection_tablet',

    requires:[
        'MyApp.view.tablet.TwoPanesSearchAndList',
        'MyApp.view.tablet.RealEstateDetail',
        'MyApp.view.tablet.RequestAdMoreInfo',
    ],

	config:{
        itemId:'searchsectionnavigationview',
        layout:'fit',
        items: [
            {
                xtype:'twopanessearchandlist_tablet',
                title:'Votre recherche',
            },
		],
	},

});

Ext.define('MyApp.view.tablet.RequestAgencyInfo', {
	extend:'MyApp.view.RequestAgencyInfo',
    xtype: 'requestagencyinfo_phone',
});
Ext.define('MyApp.view.tablet.AgencyPage', {
	extend:'Ext.Container',
	xtype:'agencypage_tablet',
	requires:[
		'MyApp.view.tablet.RequestAgencyInfo',
	],
	config:{
		itemId:'agencypage',
		scrollable:{
			direction:'vertical',
			directionLock:true
		},
		layout:{
			type:'hbox',
		},

		items:[
			{
				xtype:'panel',
				itemId:'agencyLeftPanel',
				cls:['agencyLeftPanel','tablet'],
				flex:1,
				layout:'vbox',
				scrollable:{
					direction:'vertical',
					directionLock:true
				},
				items:[
					{
						xtype:'panel',
						itemId:'agencyLeftPanelTitle',
						cls:['agencyLeftPanelTitle','tablet'],
						html:'La vitrine de l\'agence'
					},
					{
						xtype:'panel',
						width:'100%',
						cls:['agencyLeftPanelContent','tablet'],
						layout:{type:'vbox'},
						items:[
							{
								xtype:'panel',
								itemId:'agencyLeftPanelTopSection',
								cls:['agencyLeftPanelTopSection','tablet'],
								width:'100%',
								layout:{type:'vbox'},
								items:[
									{ xtype:'panel',
										layout:{type:'hbox'},
										items:[
											{ xtype:'image', flex:1, itemId:'agencyLogoImage', docked:'left', mode:'image', cls:['agencyPageAgencyLogo','tablet']},
											{ xtype:'image', flex:1, itemId:'agencyShopImage', docked:'right', mode:'image', cls:['agencyPageAgencyShopImage','tablet']},
										]
									},
									{ xtype:'panel', itemId:'agencyName', cls:['agencyName','phone'] },
									{ xtype:'panel', itemId:'agencyContact', cls:['agencyContact','phone'] },
									{ xtype:'panel', itemId:'agencyAddress', cls:['agencyAddress','phone'] },
									{ xtype:'panel', itemId:'agencyLocation', cls:['agencyLocalisation','phone'] },
									{ xtype:'panel', itemId:'agencyRCS', cls:['agencyPageAgencyRCS','tablet'] },
									{
										xtype:'panel',
										layout:'hbox',
										items:[
											{ xtype:'image', cls:['listagencepictotel','phone']},
											{ xtype:'panel', readOnly:true, itemId:'agencyTel', cls:['agencyTel','phone'] },
										],
									},
								]
							},
							{ xtype:'spacer', height:10},
							{
								xtype:'panel',
								layout:{
									type:'hbox',
								},
								cls:['blocButtonGreenPhoneAndEmail','tablet'],
								items:[
									{ xtype:'button', flex:1, text:'E-mail', itemId:'butAgencyEmail', cls:['buttongreenEmail','tablet'],},
								]
							},
							{ xtype:'spacer', height:10},
							{
								xtype:'panel',
								cls:['blocSocial','tablet'],
                                itemId:'blocSocial',
								layout:{type:'hbox'},
								items:[
                                
                                {   xype: 'panel',
                                    itemId:'panelFacebook',
                                    hidden:true,
                                    items:[
                                
                                            { xtype:'panel',
                                                    layout:{
                                                    type:'hbox',
                                                        },
                                                    flex:1,                                        
                                                    items:[
                                                            { xtype:'image', itemId:'butAgencyFacebook', cls:['butAgencyFacebook','phone'],},
                                                            { xtype:'panel', html:"Facebook", cls:['facebookText','phone']},
                                                        ]
                                                },
                                    
                                            ]
									},
                                   
                              { xype: 'panel',
                                itemId:'panelTwitter',
                                hidden:true,
                                items:[        
                                    
                                        { xtype:'panel',
                                            layout:{
											type:'hbox',
                                            },
                                            flex:1,
                                            items:[
                                                { xtype:'image', itemId:'butAgencyTwitter', cls:['butAgencyTwitter','phone'],},
                                                { xtype:'panel', html:"Twitter", cls:['twitterText','phone']}
                                                ]
                                            }
                                        ]
                                    },
                            
                                ]
							},   
                                                                                    
						]
					},
					{
						xtype:'panel',
						layout:'vbox',
						cls:['agencypageformspanel','phone','shadow'],
						items:[
							{xtype:'spacer', height:10,},
							{xtype:'button', text:"Demande d'estimation" , itemId:'buttonRequestAppraisal', width:'100%', cls:['buttongreen','phone']},
							{xtype:'button',text:"D&eacute;p&ocirc;t d'annonce", itemId:'buttonRequestAdDeposit', width:'100%', cls:['buttongreen','phone']},
							{xtype:'button',text:"Mandat de recherche", itemId:'buttonRequestSearchMandate', width:'100%', cls:['buttongreen','phone']}
						]
					},
				]
			},
			{
				flex:2,
				xtype:'map',
				itemId:'agencyMap',
//                useCurrentLocation:true,
			},
		]
	},

	initGMapWithAgencyModel:function(model){
		var sencha_map = this.down("#agencyMap");
		var agencyDetailModel = model;
		var map = sencha_map.getMap(),
			pos = new google.maps.LatLng(agencyDetailModel.get("lat"),agencyDetailModel.get("lng"));

		if (!this.agencyInfoWindow){
			this.agencyInfoWindow = new google.maps.InfoWindow({
				map: map,
				position: pos,
				content: agencyDetailModel.get("nom"),
				visible:true
			});
		}
		if (!this.agencyMarker){
			this.agencyMarker = new google.maps.Marker({
				map: map,
				position: pos,
				// animation:google.maps.Animation.DROP,
				title: agencyDetailModel.get("nom"),
				visible:true
			});
		}
		map.panTo(pos);
	},

	initialize: function() {
		//console.log("MyApp.view.phone.AgencyPage.js - initialize()");
		this.callParent();
		this.addListener('painted', function(){
			//do the centering once the view is painted, otherwise the map is not centered properly
			if (this.model){
				this.initGMapWithAgencyModel(this.model);
			}else{
				//console.log("no agency detail model");
			}
		})
	},

	setAgencyModel: function(agencyDetailModel){
		//console.log("setAgencyModel");
		if (this.model && this.model == agencyDetailModel){
			//console.log("already initialized with model");
			return;
		}
		this.model = agencyDetailModel;
		if (agencyDetailModel){
			this.down('#agencyName').setHtml(agencyDetailModel.get('nom'));
			this.down('#agencyAddress').setHtml(agencyDetailModel.get('adresse'));
			this.down('#agencyLocation').setHtml(agencyDetailModel.get('ville') + '(' + agencyDetailModel.get('cp') + ')');
			this.down('#agencyTel').setHtml(agencyDetailModel.get('tel'));
			if (agencyDetailModel.get('rcs')){
				this.down('#agencyRCS').setHtml('RCS '+agencyDetailModel.get('rcs'));
			}else{
				this.down('#agencyRCS').hide();
			}
			
			this.down('#agencyContact').setHtml("Responsable "+agencyDetailModel.get('directeur'));

			if(agencyDetailModel.get('logo')){
// 				console.log(agencyDetailModel.get('logo'));
				this.down('#agencyLogoImage').setSrc(agencyDetailModel.get('logo'));
				this.down('#agencyLogoImage').show();
			}else{
				this.down('#agencyLogoImage').hide();
			}
			if (agencyDetailModel.get('vitrine')){
				this.down('#agencyShopImage').setSrc(agencyDetailModel.get('vitrine'));
				this.down('#agencyShopImage').show();
// 				console.log('MyApp.view.phone.AgencyPage - setAgencyModel vitrine is ' + agencyDetailModel.get('vitrine'));
			}else{
				this.down('#agencyShopImage').hide();
			}
			this.initGMapWithAgencyModel(this.model);

			// Button Facebook
			but = this.down('#butAgencyFacebook');
            var fb=false;
            var panelFacebook=this.down('#panelFacebook');
			if (but && agencyDetailModel.get('facebook')){
				but.show();
                panelFacebook.show();
                fb=true;
                
			}else{
				if (but){
					but.hide();
				}
			}

			// Button Twitter
			but = this.down('#butAgencyTwitter');
            var panelTwitter=this.down('#panelTwitter');
            var tw=false;
			if (but && agencyDetailModel.get('twitter')){
				but.show();
                panelTwitter.show();
                tw=true;
			}else{
				if (but){
					but.hide();
                    
                    
				}
             var blocSocial=this.down('#blocSocial');   
             if((!tw) &&(!fb)){
                    blocSocial.hide();

             }  
                
                
                
			}
		}
	}

});
Ext.define('MyApp.view.tablet.AgencySection', {
	extend:'Ext.Panel',
	xtype:'agencysection_tablet',

	requires:[
		'MyApp.view.tablet.AgencyPage',
		'MyApp.view.tablet.RequestAppraisal',
		'MyApp.view.tablet.RequestAdDeposit',
		'MyApp.view.tablet.RequestSearchMandate',
	],

	config:{
		itemId:'agencysection',
		cls:'agencysection',
		layout:{
			type:'fit',
		},

		items:[
			// List of favorite real estates
			{
				xtype:'agencypage_tablet',
				title:'Agence',
			},
		],
	},
	initialize: function(){
		//console.log("MyApp.view.tablet.AgencySection - initialize()");
		this.callParent();    
	}
});

Ext.define('MyApp.view.tablet.Main', {
    extend: 'Ext.TabPanel',
	doTabChange: function(tabBar, newTab) {
        this.setActiveItem(tabBar.indexOf(newTab));
    },
    requires: [
        'MyApp.view.tablet.HomeSection',
        'MyApp.view.tablet.SearchSection',
        'MyApp.view.tablet.FavoriteSearchSection',
        'MyApp.view.tablet.FavoriteRealEstateSection',
        'MyApp.view.tablet.AgencySection',
    ],

    config:{

        fullscreen:true,
        itemId:'apptabpanel',
        tabBarPosition:'top',
        tabBar:{
            cls:['myapptabbar','tablet'],
            layout:{
                pack:'center'
            }
        },
        items:[
            {
                xtype:'homesection_tablet',
                iconCls:'home',
                title:'Accueil'
            },
            {
                xtype:'searchsection_tablet',
                iconCls:'search',
                title:'Rechercher'
            },
            {
                xtype:'favoritesearchsection_tablet',
                iconCls:'star',
                title:'Mes recherches',
            },
            {
                xtype:'favoriterealestatesection_tablet',
                iconCls:'star',
                title:'Mes annonces',
            },
            {
                xtype:'agencysection_tablet',
                iconCls:'info',
                title:'Agence'
            }
        ]               
    }
});



// -----------------------------------------------------------------------
// Cache management (using phonegap)
// console.log("cache management initialized");

var gIMAGECACHE_DIR;

function initLocalCacheDir(){
    // console.log("initLocalCacheDir");
    if (device.platform=='web'){
        // console.log('web platform : no filesystem caching');
        return;
    }
	window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, onFileSystemSuccess, onFileSystemFail);
};
function onFileSystemSuccess(fileSystem){
        // console.log('onFileSystemSuccess');
        fileSystem.root.getDirectory("imagecache",{create:true,exclusive: false},gotDir,gotDirError);
};
function gotDir(d){
    gIMAGECACHE_DIR = d.fullPath;
};
function gotDirError(e){
    // console.log("gotDirError :"+e.code);
};
function onFileSystemFail(evt){
        // console.log("onFileSystemFail");
        // console.log(evt.target.error.code);
};
// Cache management
// -----------------------------------------------------------------------


// ------------
// Custom validators
if (Ext.data){
    Ext.data.validations.gte = function(config, value){
        if (config && config.min){
            //the "self" property is defined for CustomModelBase classes.
            if (config.self){
                return value >= config.min;
            }else{
                return false;
            }
        }
    };
    Ext.data.validations.gteMessage = "Please set a big enough number";
}
//-----------

Ext.Loader.setConfig({enabled: true});
Ext.Loader.setPath({
    'MyApp': 'app'
});
Ext.require(['Ext.app.Application','MyApp.model.NotificationInfos']);
Ext.application({
    name: 'MyApp',
    profiles: ['Phone','Tablet'],
    
    requires: ['MyApp.model.NotificationInfos'],

    models: [
        'AgencyHighlight','AgencyDetail','RequestAdDeposit','RequestAdMoreInfo','RequestSearchMandate','RequestAppraisal',
        'Search','SearchDetail','SearchResults','SearchNotification','RealEstate','Location','RealEstateThumbnails'
    ],
    stores: [
        'AgencyHighlight','AgencyDetailServer','AgencyDetailCache',
        'SearchResults','SearchDetail',
        'FavoriteRealEstate','FavoriteSearch',
        'Location','RealEstateThumbnails'
    ],
    controllers:[],
    viewport: {
        autoMaximize:false
    },

    // PUSH NOTIFICATION HANDLING
    
    //iOS
    registerPushiOS: function(){
        // console.log('app.js - registerPushiOS()');
        PushNotification.prototype.notificationCallback = this.onNotificationReceived;
        MyApp.myapp = this;
        window.plugins.pushNotification.register(this.registerPushiOSSuccessCallback,
                                                 this.registerPushiOSErrorCallback,
                                                 [{ alert:true, badge:true, sound:true }]);
        window.plugins.pushNotification.startNotify();
    },
    registerPushiOSSuccessCallback: function(e){
        // console.log('app.js - registerPushiOSSuccessCallback()');
        // console.log("register ios success callback. token : "+e.deviceToken);
        MyApp.pushNotificationId = e.deviceToken;
        MyApp.pushNotificationOs = 'ios';
        MyApp.myapp.updateRegisterInfos();
    },
    registerPushiOSErrorCallback: function(e){
        // console.log('app.js - registerPushiOSErrorCallback()');
    },

    //Android
    registerPushAndroid: function(){
        // console.log('app.js - registerPushAndroid()');
        MyApp.myapp = this;
        window.plugins.C2DM.register("acheterlouer.cabinetvincent@gmail.com",    // this is the SENDER GOOGLE ACCOUNT ID
                                     this.registerPushAndroidSuccessCallback,
                                     this.registerPushAndroidErrorCallback);
    },
    registerPushAndroidSuccessCallback: function(e){
        // console.log('app.js - registerPushAndroidSuccessCallback() - SUCCESS');
        // console.log(e);
        var jsonobj = Ext.JSON.decode(e);
        
        if (jsonobj['event'] === "registered"){
            // console.log('App is registered for C2DM regid ='+jsonobj['regid']);
            MyApp.pushNotificationId = jsonobj['regid'];
            MyApp.pushNotificationOs = 'android';
            MyApp.myapp.updateRegisterInfos();
        } else if (jsonobj['event'] === "message"){
            // console.log('Receiving notification from server msg='+jsonobj['msg']);
            MyApp.myapp.onNotificationReceived();
        }
    },
    registerPushAndroidErrorCallback: function(e){
        // console.log("app.js - registerPushAndroidErrorCallback() - ERROR");
        // console.log("e['msg']="+e['msg']);
    },
    
    registerWeb: function(){
        // console.log("registerWeb");
        MyApp.myapp = this;
        MyApp.pushNotificationId = "testfromweb";
        MyApp.pushNotificationOs = 'ios';
        MyApp.myapp.updateRegisterInfos();
    },
    
    //update the register infos on the server side
    updateRegisterInfos: function(){
        // console.log('app.js - updateRegisterInfos()')

        var notificationInfos = Ext.create("MyApp.model.NotificationInfos",{
            deviceId : device.uuid,
            os : MyApp.pushNotificationOs,
            pushNotificationId : MyApp.pushNotificationId
        });

        notificationInfos.save({
            success: function(record, operation){
                var responseJson = Ext.decode(operation.getResponse().responseText);
                if (responseJson["result"] =="success"){
                }else{
                    console.log('..notificationInfos.save Invalid status code for response :'+responseJson["result"]+" : "+responseJson["error"]);
                }
            },
            failure: function(record,operation){
                console.log('notificationInfos.save FAILED');
            }           
        });        
    },
    
    onNotificationReceived: function(notification){
        // console.log("app.js - onNotificationReceived()");
    },
    /** END OF PUSH NOTIFICATION HANDLING **/
    
    /** LAUNCHING AND INITIALIZATION **/
    launch: function(){
        // console.log('app.js - launch()');
        this.launched = true;

        Ext.Ajax.on('requestexception', function(connection, response){
          // get rid of any loading masks that are present
          Ext.each(Ext.query('.x-mask'), function(el) {
              new Ext.Element(el).hide()
          });
          switch(response.status) {
            case 0 :
              Ext.Msg.alert('Error Loading', 'No Internet Connection.');
              break;
            case 401 :
              Ext.Msg.alert('Login Failed', 'Check your username and password.');
              break;
            default :
              Ext.Msg.alert('Error Loading', 'Check Your Internet connection.');
          }
        });

        this.mainLaunch();
    },
    
    mainLaunch: function(){     
        // console.log('app.js - mainLaunch() start');
        
        if (!device || !this.launched){
            // console.log("phonegap device object not ready, retrying in 100ms...");
            /* 
                TODO : change that into a callback upon "deviceready". 
                The problem is to access the application singleton from outside app.js since Ext.application returns null.
                Changing to Ext.create didn't work.
            */
            setTimeout(this.mainLaunch,100);
            return;
        }
    
        // console.log("mainLaunch ok , device : "+device);
        // console.log(device);
        if (device.platform=='Android'){
            this.registerPushAndroid();
        }else if (device.platform=='iPhone'){
            this.registerPushiOS();
        }else if (device.platform ==='web'){
            this.registerWeb();
        }
        
        //initialize cache
        initLocalCacheDir();
    }
});






    		var device = {platform:'web' , uuid:'fakeuuid'};
    	

















