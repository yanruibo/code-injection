
// window.plugins.emailComposer

function EmailComposer() {
    
}


EmailComposer.prototype.shareImage = function(aFile, aNom, aDescription){
    
    aFile = "http://www.comfilm-rhone-alpes.fr/application/lyon/" + aFile;
    
    
    console.log (aFile);
    
    var message = {
        text : aNom + " - " + aDescription,
        activityTypes : ["Mail", "PostToFacebook", "PostToTwitter", "Message"],
        image : aFile
    }
    window.socialmessage.send(message);
};

// showEmailComposer : all args optional

cordova.addConstructor(function()  {
    if(!window.plugins){
        window.plugins = {};
    }
                       
    window.plugins.emailComposer = new EmailComposer();
                       
});






Ext.application({
	name: 'Cdfra',

	requires: [
		'Ext.MessageBox',
		'Ext.TitleBar',
	],

	controllers : [
		'Main',
		'decors.Decors',
		'lyon.Filmo', 'lyon.Histoire','lyon.Region', 'lyon.Quartiers', 'lyon.Commission',
		'production.Pratique', 'production.Prestataires', 'production.Bible',  'production.Equipes', 
		'coeur.Sorties', 'coeur.Restaurants', 'coeur.Specialites'
	],

	models:['MenuAccueil'],

	stores:['menu.MenuLyon','menu.MenuDecors','menu.MenuProduction','menu.MenuCoeur'],

	views: ['Cdfra.view.accueil.Splash','Main', 'Cdfra.view.accueil.Accueil'],

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
	viewport:{
		layout:{
			type: 'card',
			animation: {
				type: 'slide'
			}
		},
		autoDestroy:false,
		_viewTab:[],
        /**
         * ajout d'une vue à droite de l'actuelle et transition
         */
		payeTaView:function(aView){
			this.animateActiveItem(aView, {type: 'slide', direction: 'left'});
			this._viewTab.push(this.getActiveItem());
		},
        /**
         * transition de la vue active vers la vue précédente et destruction
         */
		degageTaView:function(){

			this.animateActiveItem(this._viewTab[this._viewTab.length-2], {type: 'slide', direction: 'right'});
			if (this._viewTab.length > 1){
				this._viewTab.pop();
			}
		},
		initAppli:function(){
			var vView = Ext.create('Cdfra.view.accueil.Accueil');
			//this._viewTab.push(vView);
			this.animateActiveItem(vView, {});
		},
		showAppli:function(n){
			var vView = Ext.create('Cdfra.view.Main');
			vView.setActiveItem(n);
			this._viewTab.push(vView);
			this.animateActiveItem(vView, {});
		}
	},


	launch: function() {
		// Destroy the #appLoadingIndicator element
		Ext.fly('appLoadingIndicator').destroy();
		Ext.fly('loadingSplash').destroy();
		// Initialize the main view
		Ext.Viewport.add(Ext.create('Cdfra.view.accueil.Splash'));
		
		
	},

	/*onUpdated: function() {
		Ext.Msg.confirm(
			"Mise à jour de l'application",
			"La mise à jour de l'application Commission du Film Rhône Alpes a été effectuée avec succès. Voulez-vous relancer l'application ?",
			function(buttonId) {
				if (buttonId === 'yes') {
					window.location.reload();
				}
			}
		);
	}*/
});


/**
 * cordova Web Intent plugin
 * Copyright (c) Boris Smus 2010
 *
 */
var Cdfra = function() { 

};

Cdfra.prototype.share = function(params, success, fail) {
	// console.log(params);
	return cordova.exec(function(args) {
        success(args);
    }, function(args) {
        fail(args);
    }, 'Cdfra', 'share', [params]);
};


cordova.addConstructor(function() {
	window.cdfra = new Cdfra();
	
	// backwards compatibility	
	window.plugins = window.plugins || {};
	window.plugins.cdfra = window.cdfra;
});







Ext.define('Cdfra.store.decors.Decors', {
    extend: 'Ext.data.Store',
    config:{
    	storeId:'decors.Decors',
	    model: 'Cdfra.model.decors.Decors',
	    autoLoad:true,
	    proxy:{
	    	type:'ajax',
	    	url:'data/decors/decors.json',
	    	reader:{
	    		type:"json",
	    		rootProperty:"items"
	    	}
	    }
	}
});

Ext.define('Cdfra.store.lyon.Quartiers', {
    extend: 'Ext.data.Store',
    config:{
    	storeId:'lyon.Quartiers',
	    model: 'Cdfra.model.lyon.Quartiers',
	    autoLoad:true,
	    proxy:{
	    	type:'ajax',
	    	url:'data/lyon/quartiers.json',
	    	reader:{
	    		type:"json",
	    		rootProperty:"items"
	    	}
	    }
	}
});

Ext.define('Cdfra.store.lyon.Histoire', {
    extend: 'Ext.data.Store',
    config:{
    	storeId:'lyon.Histoire',
	    model: 'Cdfra.model.lyon.Histoire',
	    autoLoad:true,
	    proxy:{
	    	type:'ajax',
	    	url:'data/lyon/histoire.json',
	    	reader:{
	    		type:"json"
	    	}
	    }
	}
});

Ext.define('Cdfra.store.lyon.Commission', {
    extend: 'Ext.data.Store',
    config:{
    	storeId:'lyon.Commission',
	    model: 'Cdfra.model.lyon.Commission',
	    autoLoad:true,
	    proxy:{
	    	type:'ajax',
	    	url:'data/lyon/commission.json',
	    	reader:{
	    		type:"json"
	    	}
	    }
	}
});

Ext.define('Cdfra.store.lyon.Filmo', {
    extend: 'Ext.data.Store',
    config:{
    	storeId:'lyon.Filmo',
	    model: 'Cdfra.model.lyon.Filmo',
	    autoLoad:true,
	    sorters: 'annee',
		grouper: {
		   groupFn: function(record) {
		       return record.get('annee');
		   }
		},
	    proxy:{
	    	type:'ajax',
	    	url:'data/lyon/filmo.json',
	    	reader:{
	    		type:"json",
	    		rootProperty:"items"
	    	}
	    }
	}
});

Ext.define('Cdfra.store.coeur.Sorties', {
    extend: 'Ext.data.Store',
    config:{
    	storeId:'coeur.Sorties',
	    model: 'Cdfra.model.coeur.Sorties',
	    autoLoad:true,
	    proxy:{
	    	type:'ajax',
	    	url:'data/coeur/sorties.json',
	    	reader:{
	    		type:"json",
	    		rootProperty:"items"
	    	}
	    }
	}
});

Ext.define('Cdfra.store.coeur.Specialites', {
    extend: 'Ext.data.Store',
    config:{
    	storeId:'coeur.Specialites',
	    model: 'Cdfra.model.coeur.Specialites',
	    autoLoad:true,
	    proxy:{
	    	type:'ajax',
	    	url:'data/coeur/specialites.json',
	    	reader:{
	    		type:"json",
	    		rootProperty:"items"
	    	}
	    }
	}
}); 

Ext.define('Cdfra.store.coeur.Restaurants', {
    extend: 'Ext.data.Store',
    config:{
    	storeId:'coeur.Restaurants',
	    model: 'Cdfra.model.coeur.Restaurants',
	    autoLoad:true,
	    proxy:{
	    	type:'ajax',
	    	url:'data/coeur/restaurants.json',
	    	reader:{
	    		type:"json",
	    		rootProperty:"items"
	    	}
	    }
	}
});

Ext.define('Cdfra.store.production.Pratique', {
    extend: 'Ext.data.TreeStore',
    config:{
    	storeId:'production.Pratique',
	    model: 'Cdfra.model.production.Pratique',
	    autoLoad:true,
	    proxy:{
	    	type:'ajax',
	    	url:'data/production/pratique.json',
	    	reader:{
	    		type:"json",
	    		rootProperty:"items"
	    	}
	    }
	}
});

Ext.define('Cdfra.store.production.Prestataires', {
    extend: 'Ext.data.TreeStore',
    config:{
    	storeId:'production.Prestataires',
	    model: "Cdfra.model.production.Prestataires",
	    autoLoad:true,
	    proxy:{
	    	type:'ajax',
	    	url:'data/production/prestataires.json',
	    	reader:{
	    		type:"json",
	    		rootProperty:"items"
	    	}
	    }
	}
});

Ext.define('Cdfra.store.production.Bible', {
    extend: 'Ext.data.TreeStore',
    config:{
    	storeId:'production.Bible',
	    model: 'Cdfra.model.production.Bible',
	    autoLoad:true,
	    proxy:{
	    	type:'ajax',
	    	url:'data/production/bible.json',
	    	reader:{
	    		type:"json",
	    		rootProperty:"items"
	    	}
	    }
	}
});

Ext.define('Cdfra.store.menu.MenuLyon', {
    extend: 'Ext.data.TreeStore',
    config:{
	    model: 'Cdfra.model.MenuAccueil',
	    data:[
			{
				nom:"La Commission du Film Rhône-Alpes",
				source:"lyon.Commission",
				leaf:true
			},
			{
				nom:"Histoire et patrimoine",
				source:"lyon.Histoire",
				leaf:true
			},
			{
				nom:"La ville et ses quartiers",
				source:"lyon.Quartiers",
				leaf:true
			},
			{
				nom:"Lyon en région Rhône-Alpes",
				source:"lyon.Region",
				leaf:true
			},
			{
				nom:"Filmographie",
				source:"lyon.Filmo",
				leaf:true
			}
		]
	}
});

Ext.define('Cdfra.store.menu.MenuDecors', {
    extend: 'Ext.data.TreeStore',
    config:{
	    model: 'Cdfra.model.MenuAccueil',
	    data:[
			{
				nom:"Diaporama",
				source:"decors.Diaporama",
				leaf:true
			}
		]
	}
});

Ext.define('Cdfra.store.menu.MenuCoeur', {
    extend: 'Ext.data.TreeStore',
    config:{
	    model: 'Cdfra.model.MenuAccueil',
	    data:[
			{
				nom:"Restaurants",
				source:"coeur.Restaurants",
				leaf:true
			},
			{
				nom:"Sorties",
				source:"coeur.Sorties",
				leaf:true
			},
			{
				nom:"Spécialités",
				source:"coeur.Specialites",
				leaf:true
			}
		]
	}
});

Ext.define('Cdfra.store.menu.MenuProduction', {
    extend: 'Ext.data.TreeStore',
    config:{
	    model: 'Cdfra.model.MenuAccueil',
	    data:[
			{
				nom:"Lyon pratique",
				source:"production.Pratique",
				leaf:true
			},
			{
				nom:"Bible de tournage",
				source:"production.Bible",
				leaf:true
			},
			{
				nom:"Annuaire des prestataires",
				source:"production.Prestataires",
				leaf:true
			},
			{
				nom:"Equipes techniques",
				source:"production.Equipes",
				leaf:true
			}
		]
	}
});

Ext.define('Cdfra.model.MenuAccueil', {
    extend: 'Ext.data.Model',
    config: {
        fields: [
        	{name:'nom', type:'string'},
        	{name:'icone', type:'string'},
        	{name:'source', type:'string'},
        	{name:'leaf', type:'boolean'},
        ]
    }
});

Ext.define('Cdfra.model.decors.Decors', {
    extend: 'Ext.data.Model',
    config: {
        fields: [
        	{name:'id', type:'int'},
        	{name:'nom', type:'string'},
            {name:'description', type:'string'},
        	{
                name:'coordonnees', 
                convert:function(value, record){
                    return value.split(',');
                },
                defaultValue:"45.75387,4.830182"
            },
            {
                name:'image',
                convert:function(value, record){
                    return value=='' ? null : value;
                }
            },
            {
                name:'gf', 
                convert:function(value, record){
                    var vImage = record.get('image');
                    return vImage == null ? '' : 'resources/images/decors/gf/'+vImage;
                }
            },
            {
                name:'vignette',  
                convert:function(value, record){
                    return record.get('image');
                }
            }
        ]
    }
});

Ext.define('Cdfra.model.lyon.Quartiers', {
    extend: 'Ext.data.Model',
    config: {
        fields: [
            {name:'nom', type:'string'},
        	{name:'description', type:'string'},
            {
                name:'coordonnees', 
                type:'string',
                convert:function(value, record){
                    return value.split(',');
                },
                defaultValue:"45.75387,4.830182"
            },
        	{
        		name:'image',
        		convert:function(value, record){
                    return value=='' ? null : value;
                }
           	},
            {
                name:'gf', 
                convert:function(value, record){
                    var vImage = record.get('image');
                    return vImage == null ? '' : 'resources/images/quartiers/gf/'+vImage;
                }
            },
            {
                name:'mf',  
                convert:function(value, record){
                    var vImage = record.get('image');
                    return vImage == null ? '' : 'resources/images/quartiers/mf/'+vImage;
                }
            },
        	{
        		name:'vf',  
                convert:function(value, record){
                    var vImage = record.get('image');
                    return vImage == null ? '' : '<img src="resources/images/quartiers/vf/'+vImage+'"/>';
                }
        	}
        ]
    }
});

Ext.define('Cdfra.model.lyon.Histoire', {
    extend: 'Ext.data.Model',
    config: {
        fields: [
            {name:'titre', type:'string'},
        	{name:'texte', type:'string'},
        	{
                name:'image'
            },
        	{
        		name:'mf', 
                convert:function(value, record){
                    // récup des images
                    var vImage = record.get('image');
                    if(vImage == '' || vImage == null){
                        return "";
                    }
        			
                    return '<img src="resources/images/histoire/' + vImage + '"/>';
        			
        		}
        	}
        ]
    }
});


Ext.define('Cdfra.model.lyon.Commission', {
    extend: 'Ext.data.Model',
    config: {
        fields: [
        	{
                name:'texte', 
                type:'string',
                convert:function(value, record){
                    if (value != null){
                        return value.replace(new RegExp("\n|\r", "g"), "<br/>"); 
                    }
                }
            },
        	{
                name:'images'
            },
        	{
        		name:'mf', 
                convert:function(value, record){
                    // récup des images
                    var vTab = record.get('images');
                    vTab = vTab==null||vTab.length==0 ? [] : vTab;

        			var vStr = "";
        			for (var i=0, l=vTab.length; i<l; i++){
        				vStr+='<img src="resources/images/commission/'+vTab[i]+'"/><br/><br/>';
        			}
        			return vStr;
        			
        		}
        	}
        ]
    }
});

Ext.define('Cdfra.model.lyon.Filmo', {
    extend: 'Ext.data.Model',
    config: {
        fields: [
        	{name:'annee', type:'string'},
        	{name:'images'},
        	{
        		name:'gf', 
        		convert:function(value, record){
                    // récup des images
                    var vTab = record.get('images');
                    vTab = vTab==null||vTab.length==0 ? [] : vTab;
                    
        			var vStr = "";
        			for (var i=0, l=vTab.length; i<l; i++){
        				vStr+='<img src="resources/images/filmo/'+vTab[i]+'"/>';
        			}
        			return vStr;
        			
        		}
        	}
        ]
    }
});

Ext.define('Cdfra.model.coeur.Sorties', {
    extend: 'Ext.data.Model',
    config: {
        fields: [
        	{name:'id', type:'int', defaultValue:""},
        	{name:'nom', type:'string', defaultValue:""},
        	{name:'adresse', type:'string', defaultValue:""},
        	{name:'cp', type:'string', defaultValue:""},
        	{name:'ville', type:'string', defaultValue:""},
            {name:'tel', type:'string', defaultValue:""},
        	{name:'web', type:'string', defaultValue:""},
            {name:'description', type:'string', defaultValue:"",
                convert:function(value, record){
                    if (value != null){
                        return value.replace(new RegExp("\n|\r", "g"), "<br/>"); 
                    }
                }
            },
            {name:'coordonnees', type:'string', defaultValue:null, 
                convert:function(value, record){
                    if(value == null) return null;
                    return value.split(',');
                }
            },
        	{name:'image', type:'string', defaultValue:""},

            {
                name:'telRef', 
                type:'string',
                convert:function(value, record){
                    var vTel = record.get("tel");
                    return vTel == "" ? vTel : "<a href='tel:"+vTel+"'>"+vTel+"</a>";
                }, 
                defaultValue:""
            },
            {
                name:'webRef', 
                type:'string',
                convert:function(value, record){
                    var vWeb = record.get("web");
                    var vUrl = vWeb;
                    if (vUrl == null) {return'';}

                    if (vUrl.substr(0,4) != "http"){
                        vUrl = "http://"+vUrl;
                    }
                    else {
                        vWeb = vWeb.replace(new RegExp("http://|https://", "gi"), "");
                    }
                    return vWeb == "" || vWeb == null ? vWeb : "<a href='"+vUrl+"' target='_blank'>"+vWeb+"</a>";
                }, 
                defaultValue:""
            },
            {
                name:'adresseMap', 
                convert:function(value, record){
                    var vTab = [];
                    var vNom = record.get("nom");
                    if (vNom != ''){
                        vTab.push(vNom);
                    }
                    var vAdresse = record.get("adresse");
                    if (vAdresse != ''){
                        vTab.push(vAdresse);
                    }
                    var vCodePostal = record.get("cp");
                    if (vCodePostal != ''){
                        vTab.push(vCodePostal);
                    }
                    var vVille = record.get("ville");
                    if (vVille != ""){
                        vTab.push(vVille);
                    }

                    return vTab.join(", ");
                }
            },
            {
                name:'moyenFormat',
                convert:function(value, record){
                    var vImage = record.get('image');
                    return vImage==""||vImage==null ? 'defaut.jpg' : vImage;
                }
            },
            {
                name:'vf',  
                convert:function(value, record){
                    var vImage = record.get('image');
                    return vImage == null ? '' : '<img src="resources/images/sorties/vf/'+vImage+'"/>';
                }
            }

        ]
    }
});

Ext.define('Cdfra.model.coeur.Specialites', {
    extend: 'Ext.data.Model',
    config: {
        fields: [
        	{name:'id', type:'int', defaultValue:""},
        	{name:'nom', type:'string', defaultValue:""},
        	{name:'adresse', type:'string', defaultValue:"",
                convert:function(value, record){
                    if (value != null){
                        return value.replace(new RegExp("\n|\r", "g"), "<br/>"); 
                    }
                }
            },
        	{name:'cp', type:'string', defaultValue:""},
        	{name:'ville', type:'string', defaultValue:""},
        	{name:'tel', type:'string', defaultValue:""},
            {name:'email', type:'string', defaultValue:""},
        	{name:'web', type:'string', defaultValue:""},
            {name:'description', type:'string', defaultValue:"",
                convert:function(value, record){
                    if (value != null){
                        return value.replace(new RegExp("\n|\r", "g"), "<br/>"); 
                    }
                }
            },
            {name:'coordonnees', type:'string', defaultValue:null, 
                convert:function(value, record){
                    if(value == null) return null;
                    return value.split(',');
                }
            },
        	{name:'image', type:'string', defaultValue:""},

            {
                name:'telRef', 
                type:'string',
                convert:function(value, record){
                    var vTel = record.get("tel");
                    return vTel == "" ? vTel : "<a href='tel:"+vTel+"'>"+vTel+"</a>";
                }, 
                defaultValue:""
            },

            {
                name:'emailRef', 
                type:'string',
                convert:function(value, record){
                    var vMail = record.get("email");
                    return vMail == "" || vMail == null ? vMail : "<a href='mailto:"+vMail+"'>"+vMail+"</a>";
                }, 
                defaultValue:""
            },
            {
                name:'webRef', 
                type:'string',
                convert:function(value, record){
                    var vWeb = record.get("web");
                    var vUrl = vWeb;
                    if (vUrl == null) {return'';}

                    if (vUrl.substr(0,4) != "http"){
                        vUrl = "http://"+vUrl;
                    }
                    else {
                        vWeb = vWeb.replace(new RegExp("http://|https://", "gi"), "");
                    }
                    return vWeb == "" || vWeb == null ? vWeb : "<a href='"+vUrl+"' target='_blank'>"+vWeb+"</a>";
                }, 
                defaultValue:""
            },
            {
                name:'adresseMap', 
                convert:function(value, record){
                    var vTab = [];
                    var vNom = record.get("nom");
                    if (vNom != ''){
                        vTab.push(vNom);
                    }
                    var vAdresse = record.get("adresse");
                    if (vAdresse != ''){
                        vTab.push(vAdresse);
                    }
                    var vCodePostal = record.get("cp");
                    if (vCodePostal != ''){
                        vTab.push(vCodePostal);
                    }
                    var vVille = record.get("ville");
                    if (vVille != ""){
                        vTab.push(vVille);
                    }

                    return vTab.join(", ");
                }
            },
            {
                name:'moyenFormat',
                convert:function(value, record){
                    var vImage = record.get('image');
                    return vImage==""||vImage==null ? 'defaut.jpg' : vImage;
                }
            },
            {
                name:'vf',  
                convert:function(value, record){
                    var vImage = record.get('image');
                    return vImage == null ? '' : '<img src="resources/images/specialites/vf/'+vImage+'"/>';
                }
            }

        ]
    }
});

Ext.define('Cdfra.model.coeur.Restaurants', {
    extend: 'Ext.data.Model',
    config: {
        fields: [
        	{name:'id', type:'int', defaultValue:""},
        	{name:'nom', type:'string', defaultValue:""},
        	{name:'adresse', type:'string', defaultValue:""},
        	{name:'cp', type:'string', defaultValue:""},
        	{name:'ville', type:'string', defaultValue:""},
        	{name:'tel', type:'string', defaultValue:""},
        	{name:'web', type:'string', defaultValue:""},
            {name:'description', type:'string', defaultValue:"",
                convert:function(value, record){
                    if (value != null){
                        return value.replace(new RegExp("\n|\r", "g"), "<br/>"); 
                    }
                }
            },
            {name:'coordonnees', type:'string', defaultValue:null, 
                convert:function(value, record){
                    if(value == null) return null;
                    return value.split(',');
                }
            },
        	{name:'image', type:'string', defaultValue:""},

            {
                name:'telRef', 
                type:'string',
                convert:function(value, record){
                    var vTel = record.get("tel");
                    return vTel == "" ? vTel : "<a href='tel:"+vTel+"'>"+vTel+"</a>";
                }, 
                defaultValue:""
            },

            {
                name:'emailRef', 
                type:'string',
                convert:function(value, record){
                    var vMail = record.get("email");
                    return vMail == "" || vMail == null ? vMail : "<a href='mailto:"+vMail+"'>"+vMail+"</a>";
                }, 
                defaultValue:""
            },
            {
                name:'webRef', 
                type:'string',
                convert:function(value, record){
                    var vWeb = record.get("web");
                    var vUrl = vWeb;
                    if (vUrl == null) {return'';}

                    if (vUrl.substr(0,4) != "http"){
                        vUrl = "http://"+vUrl;
                    }
                    else {
                        vWeb = vWeb.replace(new RegExp("http://|https://", "gi"), "");
                    }
                    return vWeb == "" || vWeb == null ? vWeb : "<a href='"+vUrl+"' target='_blank'>"+vWeb+"</a>";
                }, 
                defaultValue:""
            },
            {
                name:'adresseMap', 
                convert:function(value, record){
                    var vTab = [];
                    var vNom = record.get("nom");
                    if (vNom != ''){
                        vTab.push(vNom);
                    }
                    var vAdresse = record.get("adresse");
                    if (vAdresse != ''){
                        vTab.push(vAdresse);
                    }
                    var vCodePostal = record.get("cp");
                    if (vCodePostal != ''){
                        vTab.push(vCodePostal);
                    }
                    var vVille = record.get("ville");
                    if (vVille != ""){
                        vTab.push(vVille);
                    }

                    return vTab.join(", ");
                }
            },
            {
                name:'moyenFormat',
                convert:function(value, record){
                    var vImage = record.get('image');
                    return vImage==""||vImage==null ? 'defaut.jpg' : vImage;
                }
            },
            {
                name:'vf',  
                convert:function(value, record){
                    var vImage = record.get('image');
                    return vImage == null ? '' : '<img src="resources/images/restaurants/vf/'+vImage+'"/>';
                }
            }

        ]
    }
});

Ext.define('Cdfra.model.production.Pratique', {
    extend: 'Cdfra.model.production.Bible',
    config:{
    	
    }
});

Ext.define('Cdfra.model.production.Prestataires', {
    extend: 'Cdfra.model.production.Bible',
    config:{
    	
    }
});

Ext.define('Cdfra.model.production.Bible', {
    extend: 'Ext.data.Model',
    config: {
        fields: [
        	{name:'id', type:'int'},
        	{name:'nom', type:'string', defaultValue:""},
        	{name:'genre', type:'string', defaultValue:""},
        	{name:'contact', type:'string', defaultValue:""},
        	{name:'adresse', type:'string', defaultValue:"",
                convert:function(value, record){
                    if (value != null){
                        return value.replace(new RegExp("\n|\r", "g"), "<br/>"); 
                    }
                }
            },
        	{name:'cp', type:'string', defaultValue:""},
        	{name:'ville', type:'string', defaultValue:""},
        	{name:'tel1', type:'string', defaultValue:""},
        	{name:'tel2', type:'string', defaultValue:""},
            {name:'email', type:'string', defaultValue:""},
            {name:'web', type:'string', defaultValue:""},
            {name:'coordonnees', type:'string', defaultValue:null, 
                convert:function(value, record){
                    if(value == null) return null;
                    return value.split(',');
                }
            },
            {
                name:'adresseMap', 
                convert:function(value, record){
                    var vTab = [];
                    var vNom = record.get("nom");
                    if (vNom != ''){
                        vTab.push(vNom);
                    }
                    var vAdresse = record.get("adresse");
                    if (vAdresse != ''){
                        vTab.push(vAdresse);
                    }
                    var vCodePostal = record.get("cp");
                    if (vCodePostal != ''){
                        vTab.push(vCodePostal);
                    }
                    var vVille = record.get("ville");
                    if (vVille != ""){
                        vTab.push(vVille);
                    }

                    return vTab.join(", ");
                }
            },

            {
                name:'emailRef', 
                type:'string',
                convert:function(value, record){
                    var vMail = record.get("email");
                    if (vMail == ""){
                        return "";
                    }
                    var vTab = vMail.split("\n");
                    
                    if (vTab.length == 0){
                        return "";
                    }

                    for (var i=0, l=vTab.length; i<l; i++){
                        vMail = vTab[i];
                        vTab[i] = "<a href='mailto:"+vMail+"'>"+vMail+"</a>";
                    }

                    return vTab.join("<br/>");
                }, 
                defaultValue:""
            },
        	{
                name:'webRef', 
                type:'string',
                convert:function(value, record){
                    var vWeb = record.get("web");
                    var vUrl = vWeb;
                    if (vUrl == null) {return'';}

                    if (vUrl.substr(0,4) != "http"){
                        vUrl = "http://"+vUrl;
                    }
                    else {
                        vWeb = vWeb.replace(new RegExp("http://|https://", "gi"), "");
                    }
                    return vWeb == "" || vWeb == null ? vWeb : "<a href='"+vUrl+"' target='_blank'>"+vWeb+"</a>";
                }, 
                defaultValue:""
            },
        	{name:'description', type:'string', defaultValue:"",
                convert:function(value, record){
                    if (value != null){
                        return value.replace(new RegExp("\n|\r", "g"), "<br/>"); 
                    }
                }
            },
        	{name:'images', type:'array'},
            {
                name:'telephone1',
                convert:function(value, record){
                    var vTel = record.get("tel1");
                    return vTel == "" ? vTel : "<a href='tel:"+vTel+"'>"+vTel+"</a>";
                }, 
                defaultValue:""
            },
            {
                name:'telephone2',
                convert:function(value, record){
                    var vTel = record.get("tel2");
                    return vTel == "" ? vTel : "<a href='tel:"+vTel+"'>"+vTel+"</a>";
                }, 
                defaultValue:""
            },
            {
                name:'telephone',
                convert:function(value, record){
                    var vTel1 = record.get("telephone1");
                    var vTel2 = record.get("telephone2");
                    return vTel1 + (vTel2!="" ? " / "+vTel2 : "");
                }, 
                defaultValue:""
            },
            {
                name:'contact_complet',
                convert:function(value, record){
                    var vGenre = record.get("genre");
                    var vNom = record.get("contact");
                    return (vGenre!="" ? vGenre+" " : "") + vNom;
                }, 
                defaultValue:""
            },
            {
                name:'moyenFormat',
                convert:function(value, record){
                    var vTab = record.get('images');
                    return vTab==undefined||vTab.length==0||vTab[0]=="" ? 'defaut.jpg' : vTab[0];
                }, 
                defaultValue:""
            }
        ]
    }
});

Ext.define('Cdfra.controller.Main', {
	extend: 'Ext.app.Controller',
	config: {
		refs:{
			nav:'#menuAccueil',

			splash:'#splash image',
			accueillyon:'accueillyon',
			listeDecors:'accueildecors',
			accueilproduction:'accueilproduction',
			accueilcoeur:'accueilcoeur',
			btnAccueil1:"#btnAccueil1",
			btnAccueil2:"#btnAccueil2",
			btnAccueil3:"#btnAccueil3",
			btnAccueil4:"#btnAccueil4"
		},
		control: {
			splash:{
				tap:'initAppli'
			},
			listeDecors:{
				itemtap:'onOuvreDecors'
			},
			accueilproduction:{
				itemtap:'onTapAccueilproduction'
			},
			accueillyon:{
				leafitemtap:'onLeafitemtapLyon'
			},
			accueilcoeur:{
				leafitemtap:'onLeafitemtapCoeur'
			},
			btnAccueil1:{
				tap:"setAccueil1"
			},
			btnAccueil2:{
				tap:"setAccueil2"
			},
			btnAccueil3:{
				tap:"setAccueil3"
			},
			btnAccueil4:{
				tap:"setAccueil4"
			}
		}
	},
	launch:function(){
	},
	init:function(){
		
	},
	setAccueil1:function(){
		Ext.Viewport.showAppli(0);
	},
	setAccueil2:function(){
		Ext.Viewport.showAppli(1);
	},
	setAccueil3:function(){
		Ext.Viewport.showAppli(2);
	},
	setAccueil4:function(){
		Ext.Viewport.showAppli(3);
	},
	initAppli:function(){
		Ext.Viewport.initAppli();
	},
	onOuvreDecors:function(refThis, index, target, record, e, eOpts){
        this.getApplication().getController("decors.Decors").show(record);
	},
	onLeafitemtapLyon:function(refThis, list, index, target, record, e, eOpts){
    	this.getApplication().getController(record.data.source).show(record);
    	//refThis.setDetailCard(this.getApplication().getController(record.data.source).view);

    },
    onTapAccueilproduction:function(refThis, list, index, target, record, e, eOpts){
    	this.getApplication().getController(record.data.source).show(record);
    },
    onLeafitemtapCoeur:function(refThis, list, index, target, record, e, eOpts){
    	this.getApplication().getController(record.data.source).show(record);
    }
});

Ext.define("Cdfra.controller.decors.Decors", {
	extend:'Ext.app.Controller',
	config: {
		models:['decors.Decors'],
		stores:['decors.Decors'],
		views:["Cdfra.view.decors.Diaporama"],

		nbItems:0,
		record:null,

		refs:{

			diaporama:"#decorsDiaporama",
			carousel:"#decorsDiaporama carousel",
			image:"#decorsDiaporama carousel image",
			titre:"#decorsDiaporama titlebar",
			btnRetour:"#decorsDiaporama #btnRetour",

			footer:"#decorsDiaporama #ext-container-4",
			btnMap:"#decorsDiaporama #btnMap",
			btnPrev:"#decorsDiaporama #btnPrev",
			btnNext:"#decorsDiaporama #btnNext",
			btnInfos:"#decorsDiaporama #btnInfos",
			btnEnvoi:"#decorsDiaporama #btnShare",
			
			infos:"#decorsDiaporama #infosContainer",
			infosBtnRetour:"#decorsDiaporama #btnFermerInfos",

			map:"#decorsDiaporama #map",
			mapBtnClose:"#decorsDiaporama #map #btnFermer",

			fullscreen:".imageFullscreen"

		},
		control:{
			btnRetour:{
				tap:"retourDecors"
			},
			carousel:{
				activeitemchange:"updateInfos"
			},
			image:{
				tap:"toggleFullscreen"
			},
			btnInfos:{
				tap:"toggleInfos"
			},
			infosBtnRetour:{
				tap:"toggleInfos"
			},
			btnNext:{
				tap:"next"
			},
			btnPrev:{
				tap:"prev"
			},
			btnEnvoi:{
				tap:"share"
			},
			btnMap:{
				tap:"toggleMap"
			},
			mapBtnClose:{
				tap:"toggleMap"
			},
			fullscreen:{
				tap:"onTapFullscreen"
			}
		}
	},
	
	_tabItems:[],

	_addItem:function(aRecord){
		this._tabItems.push(aRecord);
	},

	_fullscreenSwitch:false,

	toggleFullscreen:function(){

		if (this._fullscreenSwitch){
			this.getTitre().show('fadeIn');
			this.getFooter().show('fadeIn');
		}
		else {
			this.getTitre().hide('fadeOut');
			this.getFooter().hide('fadeOut');
		}

		this._fullscreenSwitch = ! this._fullscreenSwitch;
	},

	onTapFullscreen:function(){
		
	},

	show:function(aRecord){

		// stockage des décors
		this._tabItems = [];
		var vStore = Ext.getStore("decors.Decors");
		vStore.each(function(aRecord){this._addItem(aRecord)}, this);


		var vChildren = this._tabItems;

		// préparation des données
		var vTab = [];
		var vIndex = 0;
		var vChild;
		for (var i=0, l=vChildren.length; i<l; i++){
			vChild = vChildren[i];
			if (vChild == aRecord){
				vIndex = i;
			}
			vTab.push({

				width:"100%",
				height:"100%",
				items:[{
					xtype:'image',
					src:vChild.get('gf'),
					//mode:"image",
					centered:true,
					width:"100%",
					height:"100%",
					style:"background-position:center;background-size:contain;"
				}]
			});
		}

		this.setNbItems(l);

		// affichage des données

		this.getTitre().setTitle(aRecord.get("nom"));
		this.getCarousel().setItems(vTab);
		this.getCarousel().setActiveItem(vIndex);

		//this.updateInfos();

		Ext.Viewport.payeTaView(this.diaporama);

	},


	//---------------------------------------------------------------------------------------
	// UPDATE INFOS DE LA FICHE
	//---------------------------------------------------------------------------------------

	updateInfos:function(){
		
		var aRecord = this._tabItems[this.getCarousel().getActiveIndex()];

		this.setRecord(aRecord);

		// mise à jour des boutons de nav
		this.updateBtns();


		this.getDiaporama().setTitle(aRecord.get("nom"));
		// mise à jour des infos texte
		var vInfos = this.getInfos()
		vInfos.getComponent(0).setHtml("<b>"+aRecord.get("nom")+"</b><br/>"+aRecord.get("description"));

		// mise à jour de la carte
		var vCoords = aRecord.get('coordonnees');
		var vNom = aRecord.get("nom");
		if (vCoords != null && window.google != undefined){
			this.getMap().setTitle(vNom);
			this.getMap().setCoordonnees(vCoords);
			this.getBtnMap().setDisabled(false);
		}
		else{
			this.getBtnMap().setDisabled(true);
		}
	},

	//---------------------------------------------------------------------------------------
	// INFOS
	//---------------------------------------------------------------------------------------
	
	toggleInfos:function(){

		var vInfos = this.getInfos();
		vInfos[vInfos.getHidden() ? "show" : "hide"]();
		
	},
	//---------------------------------------------------------------------------------------
	// MAP
	//---------------------------------------------------------------------------------------
	
	toggleMap:function(){

		if (window.google == undefined){
			return alert("Cette fonctionne n'est pas accessible en mode hors ligne. Connectez-vous à internet et relancez l'application.")
		}
		
		this.getInfos().hide();

		var vMap = this.getMap();
		vMap[vMap.getHidden() ? "show" : "hide"]();
		
	},
	//---------------------------------------------------------------------------------------
	// CAROUSEL
	//---------------------------------------------------------------------------------------
	next:function(){
		this.getCarousel().next();
	},
	prev:function(){
		this.getCarousel().previous();
	},

	//---------------------------------------------------------------------------------------
	// TOOLBAR
	//---------------------------------------------------------------------------------------

	updateBtns:function(){

		var vCarousel = this.getCarousel();
		//var vToolBar = this.getView().getComponent(2);
		
		//if(vToolBar == null) return;
		
		var vBtnPrev = this.getBtnPrev();
		var vBtnNext = this.getBtnNext();

		var vIndex = this.getCarousel().getActiveIndex(); 
		
		// param des boutons et autre
		vBtnPrev[vIndex==0 ? "disable" : "enable"]();
		vBtnNext[vIndex==this.getNbItems()-1 ? "disable" : "enable"]();
		
	},
	share:function(){
	

		var aRecord = this._tabItems[this.getCarousel().getActiveIndex()],
			vNom = aRecord.get("nom"),
			vDescription = aRecord.get("description"),
			vFile = this.getCarousel().getActiveItem().getItems().items[0].getSrc()
		;

		// envoi sur android
		if (window.cdfra != undefined){
			window.cdfra.share(
				{
					image:vFile
				}, 
			    function() {
			    	navigator.notification.alert('Votre message a été envoyé', function(){},'Partage');
			    }, 
			    function() {
			    	navigator.notification.alert('Erreur dans la fonction de partage', function(){},'Partage');
			    }
			);
		}
           
        

		// envoi sur ios
		if (window.plugins != undefined && window.plugins.emailComposer != undefined){
			vFile = "decors" + vFile.substr(vFile.lastIndexOf('/'));
			window.plugins.emailComposer.shareImage(vFile, vNom, vDescription);
		}

	},

	/**
	 * retour à la mozaique des décors
	 */
	retourDecors:function(){
		Ext.Viewport.degageTaView();
	},



	launch:function(){
		this.diaporama = Ext.create(
			"Cdfra.view.templates.Template8", 
			{
				id:'decorsDiaporama'
			}
		);

	}
});

	

Ext.define("Cdfra.controller.lyon.Quartiers", {
	extend:'Ext.app.Controller',
	config: {
		models:['lyon.Quartiers'],
		stores:['lyon.Quartiers'],
		views:["Cdfra.view.templates.Template2","Cdfra.view.templates.Template4","Cdfra.view.templates.Template8"],

		nbItems:0,
		record:null,

		refs:{
			view:"#lyonQuartiers",
			liste:"#lyonQuartiers #liste",
			btnRetourListe:"#lyonQuartiers #btnRetour",
			
			card:"#lyonQuartiersCard",
			btnRetourCard:"#lyonQuartiersCard #btnRetour",

			diaporama:"#lyonQuartiersDiaporama",
			carousel:"#lyonQuartiersDiaporama carousel",
			titre:"#lyonQuartiersDiaporama titlebar",
			btnRetour:"#lyonQuartiersDiaporama #btnRetour",

			image:"#lyonQuartiersDiaporama carousel image",

			btnMap:"#lyonQuartiersDiaporama #btnMap",
			btnPrev:"#lyonQuartiersDiaporama #btnPrev",
			btnNext:"#lyonQuartiersDiaporama #btnNext",
			btnInfos:"#lyonQuartiersDiaporama #btnInfos",
			btnEnvoi:"#lyonQuartiersDiaporama #btnShare",
			
			infos:"#lyonQuartiersDiaporama #infosContainer",
			infosBtnRetour:"#lyonQuartiersDiaporama #btnFermerInfos",

			map:"#lyonQuartiersDiaporama #map",
			mapBtnClose:"#lyonQuartiersDiaporama #map #btnFermer",

			footer:"#lyonQuartiersDiaporama #ext-container-29",
		},
		control:{
			liste:{
				itemtap:'onItemtap'
			},
			btnRetourListe:{
				tap:"retourLyon"
			},
			btnRetourCard:{
				tap:"retourLyon"
			},
			btnRetour:{
				tap:"retourLyon"
			},
			carousel:{
				activeitemchange:"updateInfos"
			},
			btnInfos:{
				tap:"toggleInfos"
			},
			infosBtnRetour:{
				tap:"toggleInfos"
			},
			btnNext:{
				tap:"next"
			},
			btnPrev:{
				tap:"prev"
			},
			btnEnvoi:{
				tap:"share"
			},
			btnMap:{
				tap:"toggleMap"
			},
			image:{
				tap:"toggleFullscreen"
			},
			mapBtnClose:{
				tap:"toggleMap"
			}
		},
		
	},
	/**
	 * tap sur un item de la liste des quartiers
	 */
	onItemtap:function(list, index, target, record, e, eOpts){
		
		this.titre = record.get("nom");
		this.showCard(record);
	},
	show:function(aRecord){

		Ext.Viewport.payeTaView(this.getView());
	},

	_fullscreenSwitch:false,

	toggleFullscreen:function(){

		if (this._fullscreenSwitch){
			this.getTitre().show('fadeIn');
			this.getFooter().show('fadeIn');
		}
		else {
			this.getTitre().hide('fadeOut');
			this.getFooter().hide('fadeOut');
		}

		this._fullscreenSwitch = ! this._fullscreenSwitch;
	},

	//---------------------------------------------------------------------------------------
	// INITIALISATION DE LA CARTE
	//---------------------------------------------------------------------------------------
	showCard:function(aRecord){

		var vItems = aRecord.raw.items;
		var vChildren = [];
		for (var i=0, l=vItems.length; i<l; i++){
			vChildren.push(Ext.create('Cdfra.model.lyon.Quartiers', vItems[i]));
		}

		this.children = vChildren;
		this.setRecord(aRecord);

		var vCard = this.getCard()
		
		// titre
		var vTitle = vCard.getComponent(0);
		vTitle.setTitle(this.titre);

		// contenu
		var vBody = vCard.getComponent(1);

			// texte
		var vHtml = '';
		vHtml += aRecord.get("description");

			// images
		var vTab = [];
		var vImage;
		for (var i=0, l=vChildren.length; i<l; i++){
			vImage = Ext.create('Ext.Img',{
				src:vChildren[i].get('mf'),
				mode:"image",
			});
			vImage.on({
				tap:{
					fn:this.showDiaporama,
					scope:this
				}
			});

			vTab.push(vImage);
		}

		this.images = vTab;

		vBody.setHtml(vHtml);
		vBody.setItems(vTab);

		Ext.Viewport.payeTaView(this.card);

	},
	//---------------------------------------------------------------------------------------
	// INITIALISATION DU DIAPORAMA
	//---------------------------------------------------------------------------------------
	/**
	 * initialisation de la vue de carte de la commune (diaporama)
	 */
	showDiaporama:function(aItem){

		var vIndex = 0;
		for (var i = this.images.length - 1; i > 0; i--) {
			if(this.images[i] == aItem){
				vIndex = i;
				break;
			}
		}

		aRecord = this.getRecord();
		var vChildren = this.children;

		// stockage des données d'input pour utilisation asynchrone (map)
		this.getDiaporama().setRecord(aRecord);

		// préparation des données
		var vTab = [];

		for (var i=0, l=vChildren.length; i<l; i++){
			vChild = vChildren[i];

			vTab.push({

				width:"100%",
				height:"100%",
				items:[{
					xtype:'image',
					src:vChild.get('gf'),
					centered:true,
					width:"100%",
					height:"100%",
					style:"background-position:center;background-size:contain;"
				}]
			});
		}

		this.setNbItems(vChildren.length);

		// affichage des données

		this.getTitre().setTitle(this.titre);
		this.getCarousel().setItems(vTab);
		this.getCarousel().setActiveItem(vIndex);

		//this.updateInfos();

		Ext.Viewport.payeTaView(this.diaporama);

	},


	//---------------------------------------------------------------------------------------
	// UPDATE INFOS DE LA FICHE
	//---------------------------------------------------------------------------------------

	updateInfos:function(){
		

		var aRecord = this.children[this.getCarousel().getActiveIndex()];
		this.setRecord(aRecord);

		// mise à jour des boutons de nav
		this.updateBtns();

		// mise à jour des infos texte
		var vInfos = this.getInfos()
		vInfos.getComponent(0).setHtml("<b>"+aRecord.get("nom")+"</b><br/>"+aRecord.get("description"));

		// mise à jour de la carte
		var vCoords = aRecord.get('coordonnees');
		var vNom = aRecord.get("nom");
		if (vCoords != null && window.google != undefined){
			this.getMap().setTitle(vNom);
			this.getMap().setCoordonnees(vCoords);
			this.getBtnMap().setDisabled(false);
		}
		else{
			this.getBtnMap().setDisabled(true);
		}
	},

	//---------------------------------------------------------------------------------------
	// INFOS
	//---------------------------------------------------------------------------------------
	
	toggleInfos:function(){

		var vInfos = this.getInfos();
		vInfos[vInfos.getHidden() ? "show" : "hide"]();
		
	},
	//---------------------------------------------------------------------------------------
	// MAP
	//---------------------------------------------------------------------------------------
	
	toggleMap:function(){
		if (window.google == undefined){
			return alert("Cette fonctionne n'est pas accessible en mode hors ligne. Connectez-vous à internet et relancez l'application.")
		}

		this.getInfos().hide();

		var vMap = this.getMap();
		vMap[vMap.getHidden() ? "show" : "hide"]();
		
	},
	

	//---------------------------------------------------------------------------------------
	// CAROUSEL
	//---------------------------------------------------------------------------------------
	next:function(){
		this.getCarousel().next();
	},
	prev:function(){
		this.getCarousel().previous();
	},

	//---------------------------------------------------------------------------------------
	// TOOLBAR
	//---------------------------------------------------------------------------------------

	updateBtns:function(){

		var vCarousel = this.getCarousel();
		var vToolBar = this.getView().getComponent(2);
		
		//if(vToolBar == null) return;
		
		var vBtnPrev = this.getBtnPrev();
		var vBtnNext = this.getBtnNext();

		var vIndex = this.getCarousel().getActiveIndex(); 
		
		// param des boutons et autre
		vBtnPrev[vIndex==0 ? "disable" : "enable"]();
		vBtnNext[vIndex==this.getNbItems()-1 ? "disable" : "enable"]();
		
	},
	share:function(){
	

		var aRecord = this.children[this.getCarousel().getActiveIndex()],
			vNom = aRecord.get("nom"),
			vDescription = aRecord.get("description"),
			vFile = this.getCarousel().getActiveItem().getItems().items[0].getSrc()
		;

		// envoi sur android
		if (window.cdfra != undefined){
			window.cdfra.share(
				{
					image:vFile
				}, 
			    function() {
			    	navigator.notification.alert('Votre message a été envoyé', function(){},'Partage');
			    }, 
			    function() {
			    	navigator.notification.alert('Erreur dans la fonction de partage', function(){},'Partage');
			    }
			);
		}

		// envoi sur ios
		if (window.plugins != undefined && window.plugins.emailComposer != undefined){
			vFile = "quartiers" + vFile.substr(vFile.lastIndexOf('/'));
			window.plugins.emailComposer.shareImage(vFile, vNom, vDescription);
		}

	},

	/**
	 * retour à la mozaique des décors
	 */
	retourLyon:function(){
		Ext.Viewport.degageTaView();
	},



	launch:function(){
		this.view = Ext.create(
			"Cdfra.view.templates.Template2", 
			{
        		id:'lyonQuartiers',
        		cls:'listeTpl2',
        		titre:'La ville et ses quartiers',
				//itemTpl : '',
				store : 'lyon.Quartiers'
			}
		);
		this.card = Ext.create(
			"Cdfra.view.templates.Template4", 
			{
				id:'lyonQuartiersCard'
			}
		);
		this.diaporama = Ext.create(
			"Cdfra.view.templates.Template8", 
			{
				id:'lyonQuartiersDiaporama'
			}
		);

	}
});

	

Ext.define("Cdfra.controller.lyon.Histoire", {
	extend:'Ext.app.Controller',
	config: {
		models:['lyon.Histoire'],
		stores:['lyon.Histoire'],
		views:["templates.Template9"],
		
		refs:{
			view:"#lyonHistoire",
			liste:"#lyonHistoire #liste",
			btnRetourListe:"#lyonHistoire #btnRetour"
		},

		control:{
			btnRetourListe:{
				tap:"retourLyon"
			}
		}
	},
	/**
	 * retour à la mozaique des décors
	 */
	retourLyon:function(){
		Ext.Viewport.degageTaView();
	},

	show:function(aRecord){

		Ext.Viewport.payeTaView(this.view);

	},
	launch:function(){
		this.view = Ext.create("Cdfra.view.templates.Template9", {
        	id:'lyonHistoire',
        	titre:'Histoire & patrimoine',
        	store:'lyon.Histoire'
        });

	}
});

Ext.define("Cdfra.controller.lyon.Commission", {
	extend:'Ext.app.Controller',
	config: {
		models:['lyon.Commission'],
		stores:['lyon.Commission'],
		views:["templates.Template3"],
		
		refs:{
			view:"#lyonCommission",
			liste:"#lyonCommission #liste",
			btnRetourListe:"#lyonCommission #btnRetour"
		},

		control:{
			btnRetourListe:{
				tap:"retourLyon"
			}
		}
	},
	/**
	 * retour à la mozaique des décors
	 */
	retourLyon:function(){
		Ext.Viewport.degageTaView();
	},

	show:function(aRecord){

		Ext.Viewport.payeTaView(this.view);

	},
	launch:function(){
		this.view = Ext.create("Cdfra.view.templates.Template3", {
        	id:'lyonCommission',
        	titre:'La Commission du Film Rhône-Alpes',
        	store:'lyon.Commission'
        });

	}
});

Ext.define("Cdfra.controller.lyon.Region", {
	extend:'Ext.app.Controller',
	config: {
		views:["lyon.Region"],
		refs:{
			view:"#lyonRegion",
			btnRetourListe:"#lyonRegion #btnRetour"
		},

		control:{
			btnRetourListe:{
				tap:"retourLyon"
			}
		}
		
	},
	/**
	 * retour à la mozaique des décors
	 */
	retourLyon:function(){
		Ext.Viewport.degageTaView();
	},
	show:function(){
		Ext.Viewport.payeTaView(this.view);
	},
	launch:function(){
		this.view = Ext.create("Cdfra.view.lyon.Region", {});
	}
});

Ext.define("Cdfra.controller.lyon.Filmo", {
	extend:'Ext.app.Controller',
	config: {
		models:['lyon.Filmo'],
		stores:['lyon.Filmo'],
		views:["lyon.Filmo"],
		
		refs:{
			view:"#lyonFilmo",
			btnRetourListe:"#lyonFilmo #btnRetour"
		},

		control:{
			btnRetourListe:{
				tap:"retourLyon"
			}
		}
		
	},
	/**
	 * retour à la mozaique des décors
	 */
	retourLyon:function(){
		Ext.Viewport.degageTaView();
	},
	show:function(){

		Ext.Viewport.payeTaView(this.view);
	},
	launch:function(){
		this.view = Ext.create("Cdfra.view.lyon.Filmo", {});
	}
});

Ext.define("Cdfra.controller.coeur.Sorties", {
	extend:'Ext.app.Controller',
	config: {
		models:['coeur.Sorties'],
		stores:['coeur.Sorties'],
		views:["Cdfra.view.templates.Template2","coeur.SortiesCard"],

		nbItems:0,
		record:null,

		refs:{
			view:"#coeurSorties",
			liste:"#coeurSorties #liste",
			btnRetourListe:"#coeurSorties #btnRetour",
			
			card:"#coeurSortiesCard",
			btnRetourCard:"#coeurSortiesCard #btnRetour",

			btnShare:'#coeurSortiesCard #btnShare',
			btnMap:'#coeurSortiesCard #btnMap',

		},
		control:{
			liste:{
				itemsingletap:'onItemtap'
			},
			btnRetourListe:{
				tap:"retourLyon"
			},
			btnRetourCard:{
				tap:"retourLyon"
			},
			btnMap:{
				tap:"toggleMap"
			},
			btnShare:{
				tap:"save"	
			},
		},
		
	},
	/**
	 * tap sur un item de la liste des quartiers
	 */
	onItemtap:function(list, index, target, record, e, eOpts){
		
		this.showCard(record);
	},
	show:function(aRecord){

		Ext.Viewport.payeTaView(this.getView());
	},

	//---------------------------------------------------------------------------------------
	// INITIALISATION DE LA CARTE
	//---------------------------------------------------------------------------------------
	showCard:function(aRecord){
		this.record = aRecord;
		this.card.setRecord(aRecord);
		this.card.setTitle(aRecord.get("nom"));
		Ext.Viewport.payeTaView(this.card);

	},

	/**
	 * retour à la mozaique des décors
	 */
	retourLyon:function(){
		Ext.Viewport.degageTaView();
	},



	launch:function(){
		this.view = Ext.create(
			"Cdfra.view.templates.Template2", 
			{
        		id:'coeurSorties',
        		cls:'listeTpl2',
        		titre:'Sorties',
				store : 'coeur.Sorties'
			}
		);
		this.card = Ext.create(
			"Cdfra.view.coeur.SortiesCard", 
			{
				id:'coeurSortiesCard'
			}
		);

	},
	//---------------------------------------------------------------------------------------
	// MAP
	//---------------------------------------------------------------------------------------
	
	toggleMap:function(){
		if (this.record == null){return;}
		var vMap = Ext.create("Cdfra.view.templates.Template10",
			{
				cls:"mapSorties",
			}
		);
		vMap.setTitle(this.record.get("nom"));
		if (this.record.get("coordonnees") != ""){
			vMap.setCoordonnees(this.record.get("coordonnees"));
		}
		else {
			vMap.setAdresse(this.record.get("adresseMap"));
		}
		Ext.Viewport.add(vMap);
		vMap.show();
		vMap.on({
			close:function(){
				this.hide();
			},
			hide:function(){
				Ext.Viewport.remove(this);
			}
		})
	},
	
	//---------------------------------------------------------------------------------------
	// CONTACT
	//---------------------------------------------------------------------------------------
	
	/**
	 * enregistrement dans les contacts
	 */
	save:function(){
		var vThis = this;
		navigator.notification.confirm('Souhaitez-vous enregistrer cette fiche dans vos contacts ?', function(aBtn){ if(aBtn == 1) vThis.doSave();},'Ajout aux contacts','Oui,Non');
	},
	doSave:function(){


		if (navigator.contacts == null){
			return;

		}

		console.log("save 2");

		var vRecord = this.record;
		//console.log(ContactName);

		var contact = navigator.contacts.create();
		var vNomContact = vRecord.get("nom");
		contact.name = new ContactName(vNomContact,vNomContact,'','','','');
		contact.displayName = vNomContact;

		
		var vAdresse = new ContactAddress();
		vAdresse.type = "work";
		vAdresse.formatted = vRecord.get("adresse")+" "+vRecord.get("cp")+" "+vRecord.get("ville");
		vAdresse.streetAddress = vRecord.get("adresse");
		vAdresse.locality = vRecord.get("ville");
		vAdresse.postalCode = vRecord.get("cp");

		contact.addresses = [vAdresse];

		

		var vTel = vRecord.get("tel");
		if (vTel != null){
			contact.phoneNumbers = [
				new ContactField('work', vTel, true)
			];
		}

		var vWeb = vRecord.get("web");
		if (vWeb != null){
			contact.urls = [
				new ContactField('work', vWeb, true)
			];
		}

		contact.save(
			function(contact) {
			    //navigator.notification.alert('La fiche a été enregistrée dans vos contacts.', function(){},'Ajout aux contacts');
			},
			function(contactError) {
    			//alert("Une erreur est survenue lors de l'enregistrement dans vos contacts" + contactError.code);
			}
		);

	}
});

	

Ext.define("Cdfra.controller.coeur.Specialites", {
	extend:'Ext.app.Controller',
	config: {
		models:['coeur.Specialites'],
		stores:['coeur.Specialites'],
		views:["Cdfra.view.templates.Template2","coeur.SpecialitesCard"],

		nbItems:0,
		record:null,

		refs:{
			view:"#coeurSpecialites",
			liste:"#coeurSpecialites #liste",
			btnRetourListe:"#coeurSpecialites #btnRetour",
			
			card:"#coeurSpecialitesCard",
			btnRetourCard:"#coeurSpecialitesCard #btnRetour",

			btnShare:'#coeurSpecialitesCard #btnShare',
			btnMap:'#coeurSpecialitesCard #btnMap',

		},
		control:{
			liste:{
				itemsingletap:'onItemtap'
			},
			btnRetourListe:{
				tap:"retourLyon"
			},
			btnRetourCard:{
				tap:"retourLyon"
			},
			btnMap:{
				tap:"toggleMap"
			},
			btnShare:{
				tap:"save"	
			},
		},
		
	},
	/**
	 * tap sur un item de la liste des quartiers
	 */
	onItemtap:function(list, index, target, record, e, eOpts){
		
		this.showCard(record);
	},
	show:function(aRecord){

		Ext.Viewport.payeTaView(this.getView());
	},

	//---------------------------------------------------------------------------------------
	// INITIALISATION DE LA CARTE
	//---------------------------------------------------------------------------------------
	showCard:function(aRecord){
		this.record = aRecord;
		this.card.setRecord(aRecord);
		this.card.setTitle(aRecord.get("nom"));
		Ext.Viewport.payeTaView(this.card);

	},

	/**
	 * retour à la mozaique des décors
	 */
	retourLyon:function(){
		Ext.Viewport.degageTaView();
	},



	//---------------------------------------------------------------------------------------
	// MAP
	//---------------------------------------------------------------------------------------
	
	toggleMap:function(){
		if (this.record == null){return;}
		var vMap = Ext.create("Cdfra.view.templates.Template10",
			{
				cls:"mapSorties",
			}
		);
		vMap.setTitle(this.record.get("nom"));
		if (this.record.get("coordonnees") != ""){
			vMap.setCoordonnees(this.record.get("coordonnees"));
		}
		else {
			vMap.setAdresse(this.record.get("adresseMap"));
		}
		Ext.Viewport.add(vMap);
		vMap.show();
		vMap.on({
			close:function(){
				this.hide();
			},
			hide:function(){
				Ext.Viewport.remove(this);
			}
		})
	},
	
	//---------------------------------------------------------------------------------------
	// CONTACT
	//---------------------------------------------------------------------------------------
	
	/**
	 * enregistrement dans les contacts
	 */
	save:function(){
		var vThis = this;
		navigator.notification.confirm('Souhaitez-vous enregistrer cette fiche dans vos contacts ?', function(aBtn){ if(aBtn == 1) vThis.doSave();},'Ajout aux contacts','Oui,Non');
	},
	doSave:function(){


		if (navigator.contacts == null){
			return;

		}

		console.log("save 2");

		var vRecord = this.record;
		//console.log(ContactName);

		var contact = navigator.contacts.create();
		var vNomContact = vRecord.get("nom");
		contact.name = new ContactName(vNomContact,vNomContact,'','','','');
		contact.displayName = vNomContact;

		
		var vAdresse = new ContactAddress();
		vAdresse.type = "work";
		vAdresse.formatted = vRecord.get("adresse")+" "+vRecord.get("cp")+" "+vRecord.get("ville");
		vAdresse.streetAddress = vRecord.get("adresse");
		vAdresse.locality = vRecord.get("ville");
		vAdresse.postalCode = vRecord.get("cp");

		contact.addresses = [vAdresse];

		

		var vTel = vRecord.get("tel");
		if (vTel != null){
			contact.phoneNumbers = [
				new ContactField('work', vTel, true)
			];
		}

		var vWeb = vRecord.get("web");
		if (vWeb != null){
			contact.urls = [
				new ContactField('work', vWeb, true)
			];
		}

		contact.save(
			function(contact) {
			    //alert("La fiche a été enregistrée dans vos contacts.");
			    //navigator.notification.alert('La fiche a été enregistrée dans vos contacts.', function(){},'Ajout aux contacts');
			},
			function(contactError) {
    			//alert("Une erreur est survenue lors de l'enregistrement dans vos contacts" + contactError.code);
			}
		);

	},

	launch:function(){
		this.view = Ext.create(
			"Cdfra.view.templates.Template2", 
			{
        		id:'coeurSpecialites',
        		cls:'listeTpl2',
        		titre:'Spécialités',
				//itemTpl : '',
				store : 'coeur.Specialites'
			}
		);
		this.card = Ext.create(
			"Cdfra.view.coeur.SpecialitesCard", 
			{
				id:'coeurSpecialitesCard'
			}
		);

	},
});

	

Ext.define("Cdfra.controller.coeur.Restaurants", {
	extend:'Ext.app.Controller',
	config: {
		models:['coeur.Restaurants'],
		stores:['coeur.Restaurants'],
		views:["Cdfra.view.templates.Template2","coeur.RestaurantsCard"],

		nbItems:0,
		record:null,

		refs:{
			view:"#coeurRestaurants",
			liste:"#coeurRestaurants #liste",
			btnRetourListe:"#coeurRestaurants #btnRetour",
			
			card:"#coeurRestaurantsCard",
			btnRetourCard:"#coeurRestaurantsCard #btnRetour",

			btnShare:'#coeurRestaurantsCard #btnShare',
			btnMap:'#coeurRestaurantsCard #btnMap',

		},
		control:{
			liste:{
				itemsingletap:'onItemtap'
			},
			btnRetourListe:{
				tap:"retourLyon"
			},
			btnRetourCard:{
				tap:"retourLyon"
			},
			btnMap:{
				tap:"toggleMap"
			},
			btnShare:{
				tap:"save"	
			},
		},
		
	},
	/**
	 * tap sur un item de la liste des quartiers
	 */
	onItemtap:function(list, index, target, record, e, eOpts){
		
		this.showCard(record);
	},
	show:function(aRecord){

		Ext.Viewport.payeTaView(this.getView());
	},

	//---------------------------------------------------------------------------------------
	// INITIALISATION DE LA CARTE
	//---------------------------------------------------------------------------------------
	showCard:function(aRecord){
		this.record = aRecord;
		this.card.setRecord(aRecord);
		this.card.setTitle(aRecord.get("nom"));
		Ext.Viewport.payeTaView(this.card);

	},

	/**
	 * retour à la mozaique des décors
	 */
	retourLyon:function(){
		Ext.Viewport.degageTaView();
	},



	launch:function(){
		this.view = Ext.create(
			"Cdfra.view.templates.Template2", 
			{
        		id:'coeurRestaurants',
        		cls:'listeTpl2',
        		titre:'Restaurants',
				//itemTpl : '',
				store : 'coeur.Restaurants'
			}
		);
		this.card = Ext.create(
			"Cdfra.view.coeur.RestaurantsCard", 
			{
				id:'coeurRestaurantsCard'
			}
		);

	},
	//---------------------------------------------------------------------------------------
	// MAP
	//---------------------------------------------------------------------------------------
	
	toggleMap:function(){
		if (this.record == null){return;}
		var vMap = Ext.create("Cdfra.view.templates.Template10",
			{
				cls:"mapSorties",
			}
		);
		vMap.setTitle(this.record.get("nom"));
		if (this.record.get("coordonnees") != ""){
			vMap.setCoordonnees(this.record.get("coordonnees"));
		}
		else {
			vMap.setAdresse(this.record.get("adresseMap"));
		}
		Ext.Viewport.add(vMap);
		vMap.show();
		vMap.on({
			close:function(){
				this.hide();
			},
			hide:function(){
				Ext.Viewport.remove(this);
			}
		})
	},
	
	//---------------------------------------------------------------------------------------
	// CONTACT
	//---------------------------------------------------------------------------------------
	
	/**
	 * enregistrement dans les contacts
	 */
	save:function(){
		var vThis = this;
		navigator.notification.confirm('Souhaitez-vous enregistrer cette fiche dans vos contacts ?', function(aBtn){ if(aBtn == 1) vThis.doSave();},'Ajout aux contacts','Oui,Non');
	},
	doSave:function(){


		if (navigator.contacts == null){
			return;

		}

		console.log("save 2");

		var vRecord = this.record;
		//console.log(ContactName);

		var contact = navigator.contacts.create();
		var vNomContact = vRecord.get("nom");
		contact.name = new ContactName(vNomContact,vNomContact,'','','','');
		contact.displayName = vNomContact;

		
		var vAdresse = new ContactAddress();
		vAdresse.type = "work";
		vAdresse.formatted = vRecord.get("adresse")+" "+vRecord.get("cp")+" "+vRecord.get("ville");
		vAdresse.streetAddress = vRecord.get("adresse");
		vAdresse.locality = vRecord.get("ville");
		vAdresse.postalCode = vRecord.get("cp");

		contact.addresses = [vAdresse];

		

		var vTel = vRecord.get("tel");
		if (vTel != null){
			contact.phoneNumbers = [
				new ContactField('work', vTel, true)
			];
		}

		var vWeb = vRecord.get("web");
		if (vWeb != null){
			contact.urls = [
				new ContactField('work', vWeb, true)
			];
		}

		contact.save(
			function(contact) {
			   // navigator.notification.alert('La fiche a été enregistrée dans vos contacts.', function(){},'Ajout aux contacts');
			},
			function(contactError) {
    			//alert("Une erreur est survenue lors de l'enregistrement dans vos contacts" + contactError.code);
			}
		);

	}
});

	

Ext.define("Cdfra.controller.production.Pratique", {
	extend:'Ext.app.Controller',
	config: {

		models:['production.Pratique'],
		stores:['production.Pratique'],
		views:["production.Pratique"],

		refs:{
			view:'#productionPratique',
			btnRetour:'#productionPratique button',


			card:'productionPratiquecard',

			btnShare:'productionPratiquecard #btnShare',
			btnMap:'productionPratiquecard #btnMap',


		},
		control:{
			view:{
				initialize:'onInitialize',
	            back:'onBack',
	            itemtap:'onItemtap',
	            leafitemtap:'onLeafitemtap'
			},
			btnRetour:{
				tap:'onTapBtnRetour'
			},
			btnMap:{
				tap:"toggleMap"
			},
			btnShare:{
				tap:"save"	
			},

		},
		retourAccueil:true
		
	},

	onTapBtnRetour:function(refThis){
		if (this.getRetourAccueil()){
			this.retourMenu();
		}
	},
	onInitialize:function(refThis, aOpts){
   		this.initBackBtn();
    },
    onBack:function(refThis){
        this.initBackBtn();
    },
    onItemtap:function(refThis){
    	this.setRetourAccueil(false);
	    this.getView().getBackButton().un('tap', this.retourMenu);
	},
	onLeafitemtap:function(nestedList, list, index, target, record){

		this.record = record;

		this.getBtnMap().setDisabled(record.get("coordonnees") == "");

		var vCard = this.getCard();
        nestedList.getDetailCard().setRecord(record);

    },

    getCard:function(){
    	return this.getView().getDetailCard();
    },

    /**
     * affichage du bouton retour lorsqu'on est au premier
     * niveau de la liste pour revenir vers la vue précédente (accueil lyon)
     */
    initBackBtn:function(){
        var vBackBtn = this.getBtnRetour();
        if (vBackBtn.getHidden()){
        	this.setRetourAccueil(true);
            vBackBtn.setHidden(false);
        }
    },
    /**
     * retour à la vue précédente
     */
    retourMenu:function(){
    	Ext.Viewport.degageTaView();
    },

    /**
     * affichage de la vue
     */
	show:function(aRecord){
		Ext.Viewport.payeTaView(this.getView());
	},

	/**
	 * création de la vue
	 */
	launch:function(){
		Ext.create("Cdfra.view.production.Pratique", {});
	},
	//---------------------------------------------------------------------------------------
	// MAP
	//---------------------------------------------------------------------------------------
	
	toggleMap:function(){
		var vMap = Ext.create("Cdfra.view.templates.Template10",
			{
				cls:"mapPratique",
			}
		);
		vMap.setTitle(this.record.get("nom"));
		if (this.record.get("coordonnees") != ""){
			vMap.setCoordonnees(this.record.get("coordonnees"));
		}
		else {
			vMap.setAdresse(this.record.get("adresseMap"));
		}
		Ext.Viewport.add(vMap);
		vMap.show();
		vMap.on({
			close:function(){
				this.hide();
			},
			hide:function(){
				Ext.Viewport.remove(this);
			}
		})
	},
	
	//---------------------------------------------------------------------------------------
	// CONTACT
	//---------------------------------------------------------------------------------------
	
	/**
	 * enregistrement dans les contacts
	 */
	save:function(){
		var vThis = this;
		navigator.notification.confirm('Souhaitez-vous enregistrer cette fiche dans vos contacts ?', function(aBtn){ if(aBtn == 1) vThis.doSave();},'Ajout aux contacts','Oui,Non');
	},
	doSave:function(){


		console.log("save 1");
		if (navigator.contacts == null){
			return;

		}

		console.log("save 2");

		var vRecord = this.record;
		//console.log(ContactName);

		var vNomContact = vRecord.get("nom")+" "+vRecord.get("contact");

		var contact = navigator.contacts.create();
		contact.name = new ContactName(vNomContact,vNomContact,'','','','');
		contact.displayName = vNomContact;

		
		var vAdresse = new ContactAddress();
		vAdresse.type = "work";
		vAdresse.formatted = vRecord.get("adresse")+" "+vRecord.get("cp")+" "+vRecord.get("ville");
		vAdresse.streetAddress = vRecord.get("adresse");
		vAdresse.locality = vRecord.get("ville");
		vAdresse.postalCode = vRecord.get("cp");

		contact.addresses = [vAdresse];

		

		var vTel = vRecord.get("tel1");
		if (vTel != null){
			contact.phoneNumbers = [
				new ContactField('work', vTel, true)
			];
		}

		var vWeb = vRecord.get("web");
		if (vWeb != null){
			contact.urls = [
				new ContactField('work', vWeb, true)
			];
		}

		contact.save(
			function(contact) {
			    //navigator.notification.alert('La fiche a été enregistrée dans vos contacts.', function(){},'Ajout aux contacts');
			},
			function(contactError) {
    			//alert("Une erreur est survenue lors de l'enregistrement dans vos contacts" + contactError.code);
			}
		);

	}
});

Ext.define("Cdfra.controller.production.Prestataires", {
	extend:'Ext.app.Controller',
	config: {

		models:['production.Prestataires'],
		stores:['production.Prestataires'],
		views:["production.Prestataires"],

		refs:{
			view:'#productionPrestataires',
			btnRetour:'#productionPrestataires button',


			card:'productionPrestatairescard',

			btnShare:'productionPrestatairescard #btnShare',
			btnMap:'productionPrestatairescard #btnMap',


		},
		control:{
			view:{
				initialize:'onInitialize',
	            back:'onBack',
	            itemtap:'onItemtap',
	            leafitemtap:'onLeafitemtap'
			},
			btnRetour:{
				tap:'onTapBtnRetour'
			},
			btnMap:{
				tap:"toggleMap"
			},
			btnShare:{
				tap:"save"	
			},

		},
		retourAccueil:true
		
	},

	onTapBtnRetour:function(refThis){
		if (this.getRetourAccueil()){
			this.retourMenu();
		}
	},
	onInitialize:function(refThis, aOpts){
   		this.initBackBtn();
    },
    onBack:function(refThis){
        this.initBackBtn();
    },
    onItemtap:function(refThis){
    	this.setRetourAccueil(false);
	    this.getView().getBackButton().un('tap', this.retourMenu);
	},
	onLeafitemtap:function(nestedList, list, index, target, record){

		this.record = record;
		
		this.getBtnMap().setDisabled(record.get("coordonnees") == "");

		var vCard = this.getCard();
        nestedList.getDetailCard().setRecord(record);

    },

    getCard:function(){
    	return this.getView().getDetailCard();
    },

    /**
     * affichage du bouton retour lorsqu'on est au premier
     * niveau de la liste pour revenir vers la vue précédente (accueil lyon)
     */
    initBackBtn:function(){
        var vBackBtn = this.getBtnRetour();
        if (vBackBtn.getHidden()){
        	this.setRetourAccueil(true);
            vBackBtn.setHidden(false);
        }
    },
    /**
     * retour à la vue précédente
     */
    retourMenu:function(){
    	Ext.Viewport.degageTaView();
    },

    /**
     * affichage de la vue
     */
	show:function(aRecord){
		Ext.Viewport.payeTaView(this.getView());
	},

	/**
	 * création de la vue
	 */
	launch:function(){
		Ext.create("Cdfra.view.production.Prestataires", {});
	},
	//---------------------------------------------------------------------------------------
	// MAP
	//---------------------------------------------------------------------------------------
	
	toggleMap:function(){
		var vMap = Ext.create("Cdfra.view.templates.Template10",
			{
				cls:"mapPrestataires",
			}
		);
		vMap.setTitle(this.record.get("nom"));
		if (this.record.get("coordonnees") != ""){
			vMap.setCoordonnees(this.record.get("coordonnees"));
		}
		else {
			vMap.setAdresse(this.record.get("adresseMap"));
		}
		Ext.Viewport.add(vMap);
		vMap.show();
		vMap.on({
			close:function(){
				this.hide();
			},
			hide:function(){
				Ext.Viewport.remove(this);
			}
		})
	},
	
	//---------------------------------------------------------------------------------------
	// CONTACT
	//---------------------------------------------------------------------------------------
	
	/**
	 * enregistrement dans les contacts
	 */
	save:function(){
		var vThis = this;
		navigator.notification.confirm('Souhaitez-vous enregistrer cette fiche dans vos contacts ?', function(aBtn){ if(aBtn == 1) vThis.doSave();},'Ajout aux contacts','Oui,Non');
	},
	doSave:function(){


		console.log("save 1");
		if (navigator.contacts == null){
			return;

		}

		console.log("save 2");

		var vRecord = this.record;
		//console.log(ContactName);

		var vNomContact = vRecord.get("nom")+" "+vRecord.get("contact");

		var contact = navigator.contacts.create();
		contact.name = new ContactName(vNomContact,vNomContact,'','','','');
		contact.displayName = vNomContact;

		
		var vAdresse = new ContactAddress();
		vAdresse.type = "work";
		vAdresse.formatted = vRecord.get("adresse")+" "+vRecord.get("cp")+" "+vRecord.get("ville");
		vAdresse.streetAddress = vRecord.get("adresse");
		vAdresse.locality = vRecord.get("ville");
		vAdresse.postalCode = vRecord.get("cp");

		contact.addresses = [vAdresse];

		

		var vTel = vRecord.get("tel1");
		if (vTel != null){
			contact.phoneNumbers = [
				new ContactField('work', vTel, true)
			];
		}

		var vWeb = vRecord.get("web");
		if (vWeb != null){
			contact.urls = [
				new ContactField('work', vWeb, true)
			];
		}

		contact.save(
			function(contact) {
			    //navigator.notification.alert('La fiche a été enregistrée dans vos contacts.', function(){},'Ajout aux contacts');
			},
			function(contactError) {
    			//alert("Une erreur est survenue lors de l'enregistrement dans vos contacts" + contactError.code);
			}
		);

	}
});

Ext.define("Cdfra.controller.production.Equipes", {
	extend:'Ext.app.Controller',
    config: {
        views:["production.Equipes"],
        refs:{
            view:"#productionEquipes",
            btnRetourListe:"#productionEquipes #btnRetour"
        },

        control:{
            btnRetourListe:{
                tap:"retourProduction"
            }
        }
        
    },
    /**
     * retour à la mozaique des décors
     */
    retourProduction:function(){
        Ext.Viewport.degageTaView();
    },
    show:function(){
        Ext.Viewport.payeTaView(this.view);
    },
    launch:function(){
        this.view = Ext.create("Cdfra.view.production.Equipes", {});
    }
});

Ext.define("Cdfra.controller.production.Bible", {
	extend:'Ext.app.Controller',
	config: {

		models:['production.Bible'],
		stores:['production.Bible'],
		views:["production.Bible"],

		refs:{

			view:'#productionBible',
			btnRetour:'#productionBible button',

			card:'productionBiblecard',

			btnShare:'productionBiblecard #btnShare',
			btnMap:'productionBiblecard #btnMap',

		},
		control:{
			view:{
				initialize:'onInitialize',
	            back:'onBack',
	            itemtap:'onItemtap',
	            leafitemtap:'onLeafitemtap'
			},
			btnRetour:{
				tap:'onTapBtnRetour'
			},
			btnMap:{
				tap:"toggleMap"
			},
			btnShare:{
				tap:"save"	
			},

		},
		retourAccueil:true
		
	},

	onTapBtnRetour:function(refThis){
		if (this.getRetourAccueil()){
			this.retourMenu();
		}
	},
	onInitialize:function(refThis, aOpts){
   		this.initBackBtn();
    },
    onBack:function(refThis){
        this.initBackBtn();
    },
    onItemtap:function(refThis){
    	this.setRetourAccueil(false);
	    this.getView().getBackButton().un('tap', this.retourMenu);
	},
	onLeafitemtap:function(nestedList, list, index, target, record){
		this.record = record;

		this.getBtnMap().setDisabled(record.get("coordonnees") == "");
		
		var vCard = this.getCard();
        nestedList.getDetailCard().setRecord(record);

    },

    getCard:function(){
    	return this.getView().getDetailCard();
    },

    /**
     * affichage du bouton retour lorsqu'on est au premier
     * niveau de la liste pour revenir vers la vue précédente (accueil lyon)
     */
    initBackBtn:function(){
        var vBackBtn = this.getBtnRetour();
        if (vBackBtn.getHidden()){
        	this.setRetourAccueil(true);
            vBackBtn.setHidden(false);
        }
    },
    /**
     * retour à la vue précédente
     */
    retourMenu:function(){
    	Ext.Viewport.degageTaView();
    },

    /**
     * affichage de la vue
     */
	show:function(aRecord){
		Ext.Viewport.payeTaView(this.getView());
	},

	/**
	 * création de la vue
	 */
	launch:function(){
		Ext.create("Cdfra.view.production.Bible", {});
	},
	//---------------------------------------------------------------------------------------
	// MAP
	//---------------------------------------------------------------------------------------
	
	toggleMap:function(){
		if (this.record == null){return;}
		var vMap = Ext.create("Cdfra.view.templates.Template10",
			{
				cls:"mapBible",
			}
		);
		vMap.setTitle(this.record.get("nom"));
		vMap.setCoordonnees(this.record.get("coordonnees"));
		Ext.Viewport.add(vMap);
		vMap.show();
		vMap.on({
			close:function(){
				this.hide();
			},
			hide:function(){
				Ext.Viewport.remove(this);
			}
		})
	},
	
	//---------------------------------------------------------------------------------------
	// CONTACT
	//---------------------------------------------------------------------------------------
	
	/**
	 * enregistrement dans les contacts
	 */
	save:function(){
		var vThis = this;
		navigator.notification.confirm('Souhaitez-vous enregistrer cette fiche dans vos contacts ?', function(aBtn){ if(aBtn == 1) vThis.doSave();},'Ajout aux contacts','Oui,Non');
	},
	doSave:function(){

		if (navigator.contacts == null){
			return;

		}


		var vRecord = this.record;
		//console.log(ContactName);

		var vNomContact = vRecord.get("nom")+" "+vRecord.get("contact");

		var contact = navigator.contacts.create();
		contact.name = new ContactName(vNomContact,vNomContact,'','','','');
		contact.displayName = vNomContact;

		
		var vAdresse = new ContactAddress();
		vAdresse.type = "work";
		vAdresse.formatted = vRecord.get("adresse")+" "+vRecord.get("cp")+" "+vRecord.get("ville");
		vAdresse.streetAddress = vRecord.get("adresse");
		vAdresse.locality = vRecord.get("ville");
		vAdresse.postalCode = vRecord.get("cp");

		contact.addresses = [vAdresse];

		

		var vTel = vRecord.get("tel1");
		if (vTel != null){
			contact.phoneNumbers = [
				new ContactField('work', vTel, true)
			];
		}

		var vWeb = vRecord.get("web");
		if (vWeb != null){
			contact.urls = [
				new ContactField('work', vWeb, true)
			];
		}

		contact.save(
			function(contact) {
			    //navigator.notification.alert('La fiche a été enregistrée dans vos contacts.', function(){},'Ajout aux contacts');
			},
			function(contactError) {
    			//alert("Une erreur est survenue lors de l'enregistrement dans vos contacts" + contactError.code);
			}
		);

	}
});


Ext.define("Cdfra.view.Main", {

    extend: 'Ext.TabPanel',

    requires:['Cdfra.view.accueil.Lyon', 'Cdfra.view.accueil.Decors', 'Cdfra.view.accueil.Production', 'Cdfra.view.accueil.Coeur'],

    config: { 
        xtype:'accueil',
        id:'menuAccueil',
        fullscreen:true,
        tabBar:{
            ui: 'tabAccueil',
            layout: {
                type:'hbox',
                pack: 'center' 
            },

            defaults:{
                flex:1,
                margin:"0 .2em 0 .2em",
                //padding:"1.3em"

            }
        },
        tabBarPosition: 'bottom', 
        layout: {
            type: 'card',
            animation: null

        },
        items:[
           
            {
                iconCls: 'lyon',
                ui:'normal ',
                cls:'btnAccueil',
                iconMask: true,
                xtype:'accueillyon',
                
            },
            {
                iconCls: 'decors',
                cls:'btnAccueil',
                iconMask: true,
                xtype:'accueildecors',
            },
            {
                iconCls: 'production',
                cls:'btnAccueil',
                iconMask: true,
                xtype:'accueilproduction',
            },
            {
                iconCls: 'coeur',
                cls:'btnAccueil',
                iconMask: true,
                xtype:'accueilcoeur',
            }
        ]
        
    }

});

/**
 * Diaporama d'un décors + infos et map
 */
Ext.define("Cdfra.view.decors.Diaporama", {
	extend:'Cdfra.view.templates.Template8'
});

/**
 * Lyon en région Rhône-Alpes
 */
Ext.define("Cdfra.view.lyon.Region", {
    extend:'Ext.Container',
    xtype:'lyonRegion',
    id:'lyonRegion',
    fullscreen:true,
    config: { 
        scrollable:true,
        items:[
            {
                xtype:'titlebar',
                docked: 'top',
                title:'Lyon en région Rhône-Alpes',
                items:[
                    {
                        xtype:"image",
                        mode:"image",
                        itemId:'btnRetour',
                        cls:"btnRetour",
                        src:'resources/images/btnPrev.png'
                    }
                ]
            },
            {
                html:"\
                    Lyon, préfecture du département du Rhône et de la Région Rhône-Alpes, compte avec la communauté          \
                    urbaine du Grand Lyon, plus de 2 millions d’habitants.<br/>                                              \
                    <br/>                                                                                                    \
                    La Région Rhône-Alpes s’étend sur 43 698 km², et offre une variété et une richesse unique de            \
                    paysages à travers de ses 8 départements&nbsp;: l’Ain, l’Ardèche, la Drôme, l’Isère, la Loire, le Rhône,      \
                    la Savoie, la Haute-Savoie… <br/>                                                                        \
                    <br/>                                                                                                    \
                    Traversée par 2 fleuves, le Rhône et la Loire, la région Rhône-Alpes compte 7000 km de cours d’eau,      \
                    400 km2 de glaciers, 2 parcs naturels nationaux, 6 parcs naturels régionaux et plus de 2000 monuments    \
                    historiques, des sites archéologiques et historiques majeurs… 5 villes sont labellisées «&nbsp;d’Art et       \
                    d’Histoire&nbsp;» et 13 villages classés parmi les «&nbsp;Plus beaux villages de France&nbsp;».                         \
                "
            },
            {
                xtype:'img',
                src:'resources/images/region/carte.png',
                mode:"image",
                width:"100%"
            }
        ]

    }
});

/**
 * Filmographie
 */
Ext.define("Cdfra.view.lyon.Filmo", {
    extend:'Ext.Container',
    xtype:'filmo',
    id:'lyonFilmo',
    fullscreen:true,
    config: { 
        layout:'fit',
        items:[
            {
                xtype:'titlebar',
                docked: 'top',
                title:'Filmographie',
                items:[
                    {
                        xtype:"image",
                        mode:"image",
                        itemId:'btnRetour',
                        cls:"btnRetour",
                        src:'resources/images/btnPrev.png'
                    }
                ]
            },
            {
                xtype:'list',
                itemTpl: '<div class="annee">{annee}</div>{gf}',
                store: 'lyon.Filmo',
                disableSelection:true
            }
        ]
    }
});

/**
 * Fiche d'item de la Restaurants
 */
Ext.define("Cdfra.view.coeur.RestaurantsCard", {
	extend:'Cdfra.view.templates.Template72',
	xtype:'coeurRestaurantscard',
	populate:function(aRecord){
		if (aRecord != null){

			// préparation des données
			var vTab = {
				"Téléphone":aRecord.get("telRef"),
				"Email":aRecord.get("emailRef"),
				"Site web":aRecord.get("webRef")
			};
			

			// composition du html
			var vHtml = '<div class="header">\
					<img class="image" src="resources/images/restaurants/mf/'+aRecord.get("moyenFormat")+'"/>\
					<div class="exergue">\
						<div class="title">'+aRecord.get("nom")+'</div>\
						<div class="adresse">'+aRecord.get("adresse")+'</div>\
						<div class="cp">'+aRecord.get("cp")+' '+aRecord.get("ville")+'</div>\
					</div>\
					<div class="description">'+aRecord.get("description")+'</div>\
				</div>\
				<div class="items">\
			';
			var vVal, vClass, vTarget;
			for (var i in vTab){
				vVal = vTab[i];
				if (vVal != "" && vVal!=null){
					vClass = /*i == "Téléphone" ? "value tel" : */"value";
					vHtml += '<div class="item"><span class="key">'+i+'</span><span class="'+vClass+'">'+vVal+'</span></div>';
					
				}
			}
			vHtml += '</div>';


			this.setHtml(vHtml);
		}	
		
	}
});

Ext.define("Cdfra.view.coeur.Sorties", {
    extend:'Cdfra.view.templates.Template1',
    requires: ['Cdfra.view.coeur.SortiesCard'],
    xtype:'coeurSorties',
    id:'coeurSorties',
    config: { 
        title:"Sorties",
        displayField: 'nom',
        store:'coeur.Sorties',
        detailCard:{xtype:"coeurSortiescard"},
    }

});


/**
 * Fiche d'item de la Bible de tournage
 */
Ext.define("Cdfra.view.coeur.SortiesCard", {
	extend:'Cdfra.view.templates.Template72',
	xtype:'coeurSortiescard',
	populate:function(aRecord){
		if (aRecord != null){

			// préparation des données
			var vTab = {
				"Téléphone":aRecord.get("telRef"),
				"Email":aRecord.get("emailRef"),
				"Site web":aRecord.get("webRef")
			};
			console.log(aRecord.get("webRef"));

			// composition du html
			var vHtml = '<div class="header">\
					<img class="image" src="resources/images/sorties/mf/'+aRecord.get("moyenFormat")+'"/>\
					<div class="exergue">\
						<div class="title">'+aRecord.get("nom")+'</div>\
						<div class="adresse">'+aRecord.get("adresse")+'</div>\
						<div class="cp">'+aRecord.get("cp")+' '+aRecord.get("ville")+'</div>\
					</div>\
					<div class="description">'+aRecord.get("description")+'</div>\
				</div>\
				<div class="items">\
			';
			var vVal, vClass;
			for (var i in vTab){
				vVal = vTab[i];
				if (vVal != "" && vVal!=null){
					vClass = /*i == "Téléphone" ? "value tel" : */"value";
					vHtml += '<div class="item"><span class="key">'+i+'</span><span class="'+vClass+'">'+vVal+'</span></div>';
					
				}
			}
			vHtml += '</div>';


			this.setHtml(vHtml);
		}	
		
	}
});

Ext.define("Cdfra.view.coeur.Specialites", {
    extend:'Cdfra.view.templates.Template1',
    requires: ['Cdfra.view.coeur.SpecialitesCard'],
    xtype:'coeurSpecialites',
    id:'coeurSpecialites',
    config: { 
        title:"Spécialités",
        displayField: 'nom',
        store:'coeur.Specialites',
        detailCard:{xtype:"coeurSpecialitescard"},
    }

});

Ext.define("Cdfra.view.coeur.Restaurants", {
    extend:'Cdfra.view.templates.Template1',
    requires: ['Cdfra.view.coeur.RestaurantsCard'],
    xtype:'coeurRestaurants',
    id:'coeurRestaurants',
    config: { 
        title:"Restaurants",
        displayField: 'nom',
        store:'coeur.Restaurants',
        detailCard:{xtype:"coeurRestaurantscard"},
    }

});

/**
 * Fiche d'item de la Bible de tournage
 */
Ext.define("Cdfra.view.coeur.SpecialitesCard", {
	extend:'Cdfra.view.templates.Template72',
	xtype:'coeurSpecialitescard',
	populate:function(aRecord){
		if (aRecord != null){

			// préparation des données
			var vTab = {
				"Téléphone":aRecord.get("telRef"),
				"Email":aRecord.get("emailRef"),
				"Site web":aRecord.get("webRef")
			};

			// composition du html
			var vHtml = '<div class="header">\
					<img class="image" src="resources/images/specialites/mf/'+aRecord.get("moyenFormat")+'"/>\
					<div class="exergue">\
						<div class="title">'+aRecord.get("nom")+'</div>\
						<div class="adresse">'+aRecord.get("adresse")+'</div>\
						<div class="cp">'+aRecord.get("cp")+' '+aRecord.get("ville")+'</div>\
					</div>\
					<div class="description">'+aRecord.get("description")+'</div>\
				</div>\
				<div class="items">\
			';
			var vVal, vClass;
			for (var i in vTab){
				vVal = vTab[i];
				if (vVal != "" && vVal!=null){
					vClass = /*i == "Téléphone" ? "value tel" : */"value";
					vHtml += '<div class="item"><span class="key">'+i+'</span><span class="'+vClass+'">'+vVal+'</span></div>';
					
				}
			}
			vHtml += '</div>';


			this.setHtml(vHtml);
		}
	}
});

/**
 * Fiche d'item de la Bible de tournage
 */
Ext.define("Cdfra.view.production.PratiqueCard", {
	extend:'Cdfra.view.templates.Template7',
	xtype:'productionPratiquecard',
	populate:function(aRecord){
		if (aRecord != null){

			// préparation des données
			var vTab = {
				"Contact":aRecord.get("contact_complet"),
				"Téléphone":aRecord.get("telephone"),
				"Email":aRecord.get("emailRef"),
				"Site web":aRecord.get("webRef")
			};
			

			// composition du html
			var vHtml = '<div class="header">\
				<div class="title">'+aRecord.get("nom")+'</div>\
				<br/>\
				<div class="adresse">'+aRecord.get("adresse")+'</div>\
				<div class="cp">'+aRecord.get("cp")+' '+aRecord.get("ville")+'</div>\
				<div class="description">'+aRecord.get("description")+'</div>\
				</div>\
				<div class="items">\
			';
			var vVal, vClass;
			for (var i in vTab){
				vVal = vTab[i];
				if (vVal != "" && vVal!=null){
					vClass = /*i == "Téléphone" ? "value tel" : */"value";
					vHtml += '<div class="item"><span class="key">'+i+'</span><span class="'+vClass+'">'+vVal+'</span></div>';
					
				}
			}
			vHtml += '</div>';

			// affichage
			this.setHtml(vHtml);

		}
		
	}
});
	

/**
 * Bible de tournage
 */
Ext.define("Cdfra.view.production.Pratique", {
	extend:'Cdfra.view.templates.Template1',
    requires: ['Cdfra.view.production.PratiqueCard'],
    xtype:'productionPratique',
	id:'productionPratique',
	config: { 
        title:"Lyon Pratique",
	 	displayField: 'nom',
		store:'production.Pratique',
        detailCard:{xtype:"productionPratiquecard"},
	}

});

/**
 * Fiche d'item de la Bible de tournage
 */
Ext.define("Cdfra.view.production.PrestatairesCard", {
	extend:'Cdfra.view.templates.Template7',
	xtype:'productionPrestatairescard',
	populate:function(aRecord){
		if (aRecord != null){

			// préparation des données
			var vTab = {
				"Contact":aRecord.get("contact_complet"),
				"Téléphone":aRecord.get("telephone"),
				"Email":aRecord.get("emailRef"),
				"Site web":aRecord.get("webRef")
			};
			

			// composition du html
			var vHtml = '<div class="header">\
				<div class="title">'+aRecord.get("nom")+'</div>\
				<br/>\
				<div class="adresse">'+aRecord.get("adresse")+'</div>\
				<div class="cp">'+aRecord.get("cp")+' '+aRecord.get("ville")+'</div>\
				<div class="description">'+aRecord.get("description")+'</div>\
				</div>\
				<div class="items">\
			';
			var vVal, vClass;
			for (var i in vTab){
				vVal = vTab[i];
				if (vVal != "" && vVal!=null){
					vClass = /*i == "Téléphone" ? "value tel" : */"value";
					vHtml += '<div class="item"><span class="key">'+i+'</span><span class="'+vClass+'">'+vVal+'</span></div>';
					
				}
			}
			vHtml += '</div>';

			// affichage
			this.setHtml(vHtml);

		}	
		
	}
});
	

/**
 * Bible de tournage
 */
Ext.define("Cdfra.view.production.Prestataires", {
	extend:'Cdfra.view.templates.Template1',
    requires: ['Cdfra.view.production.PrestatairesCard'],
    xtype:'productionPrestataires',
	id:'productionPrestataires',
	config: { 
        title:"Tous les prestataires",
	 	displayField: 'nom',
		store:'production.Prestataires',
        detailCard:{xtype:"productionPrestatairescard"},
	}

});

/**
 * production en région Rhône-Alpes
 */
Ext.define("Cdfra.view.production.Equipes", {
    extend:'Ext.Container',
    xtype:'productionEquipes',
    id:'productionEquipes',
    fullscreen:true,
    config: { 
        scrollable:true,
        items:[
            {
                xtype:'titlebar',
                docked: 'top',
                title:'Équipes techniques',
                items:[
                    {
                        xtype:"image",
                        mode:"image",
                        itemId:'btnRetour',
                        cls:"btnRetour",
                        src:'resources/images/btnPrev.png'
                    }
                ]
            },
            {
                html:"\
                    <br/><img src='resources/images/commission/1.jpg' width='50%'/><br/><br/>\
                    <b>La Commission du Film Rhône-Alpes dispose d'un catalogue de plus de 500 CV de techniciens qualifiés sur l'ensemble des postes</b>&nbsp;: \
                    régie, décoration, réalisation, image, son, maquillage, coiffure, etc.<br/><br/>\
                    Répartis sur l’ensemble du territoire régional, les techniciens travaillent sur plus de 15 longs-métrages \
                    et une vingtaine de fictions et de séries télé tournés chaque année en région, depuis plus de 20 ans.<br/><br/>\
                    L'inscription et la mise à jour de ces profils se fait grâce à l'outil Base TAF, accessible \
                    depuis le site web de FilmFrance&nbsp;: <a href='http://www.filmfrance.net'>www.filmfrance.net</a><br/><br/>\
                    N'hésitez pas à nous solliciter pour être mis en relation avec les techniciens qui interviendront sur les postes que vous aurez identifiés.<br/><br/>\
                    Commission du Film Rhône-Alpes<br/>\
                    <a href='https://maps.google.com/maps?q=Commission+du+Film+Rh%C3%B4ne-Alpes,+24+Rue+Emile+Decorps,+Villeurbanne,+France&hl=fr&ie=UTF8&sll=37.0625,-95.677068&sspn=46.495626,64.863281&oq=comm&t=h&hq=Commission+du+Film&hnear=24+Rue+Emile+Decorps,+69100+Villeurbanne,+Rh%C3%B4ne,+Rh%C3%B4ne-Alpes,+France&z=16' target='_blank'>Pôle PIXEL, Bât. Production<br/>\
                    24, rue Émile Decorps<br/>\
                    69100 VILLEURBANNE<a/><br/>\
                    Tel. 04 72 98 07 98<br/>\
                    <a href='mailto:a.malfroy@comfilm-rhone-alpes.fr'>a.malfroy@comfilm-rhone-alpes.fr</a>\
                "
            }
        ]

    }
});


/**
 * Fiche d'item de la Bible de tournage
 */
Ext.define("Cdfra.view.production.BibleCard", {
	extend:'Cdfra.view.templates.Template7',
	xtype:'productionBiblecard',
	populate:function(aRecord){
		if (aRecord != null){

			// préparation des données
			var vTab = {
				"Contact":aRecord.get("contact_complet"),
				"Téléphone":aRecord.get("telephone"),
				"Email":aRecord.get("emailRef"),
				"Site web":aRecord.get("webRef")
			};
			

			// composition du html
			var vHtml = '<div class="header">\
				<div class="title">'+aRecord.get("nom")+'</div>\
				<br/>\
				<div class="adresse">'+aRecord.get("adresse")+'</div>\
				<div class="cp">'+aRecord.get("cp")+' '+aRecord.get("ville")+'</div>\
				<div class="description">'+aRecord.get("description")+'</div>\
				</div>\
				<div class="items">\
			';
			var vVal, vClass;
			for (var i in vTab){
				vVal = vTab[i];
				if (vVal != "" && vVal!=null){
					vClass = /*i == "Téléphone" ? "value tel" : */"value";
					vHtml += '<div class="item"><span class="key">'+i+'</span><span class="'+vClass+'">'+vVal+'</span></div>';
					
				}
			}
			vHtml += '</div>';

			// affichage
			this.setHtml(vHtml);


		}	
		
	}
});

/**
 * Bible de tournage
 */
Ext.define("Cdfra.view.production.Bible", {
	extend:'Cdfra.view.templates.Template1',
    requires: ['Cdfra.view.production.BibleCard'],
    xtype:'productionBible',
	id:'productionBible',
	config: { 
        title:"Bible de tournage",
	 	displayField: 'nom',
		store:'production.Bible',
        detailCard:{xtype:"productionBiblecard"},
	}

});


Ext.define("Cdfra.view.accueil.Accueil", {
	extend:'Ext.Container',
	xtype:'accueilAccueil',
	fulscreen:true,
	config: { 
		id:"accueilAccueil",
		layout:"vbox",
		cls:'container',
		items:[
			{
				flex:1,
				layout:"hbox",
				cls:'borderBottom',
				items:[
					{
						flex:1,
						cls:'borderRight container',
						items:[
							{
								id:"btnAccueil1",
								xtype:'image',
								src:"resources/images/accueil/accueil1.png",
								mode:"image",
								centered:true,
								padding:".4em"

							}
						]
					},
					{
						flex:1,
						cls:'container',
						items:[
							{
								id:"btnAccueil2",
								xtype:'image',
								src:"resources/images/accueil/accueil2.png",
								mode:"image",
								centered:true,
								padding:".4em"
							}
						]
					}
				]
			},
			{
				flex:1,
				layout:"hbox",
				items:[
					{
						flex:1,
						cls:'borderRight container',
						items:[
							{
								id:"btnAccueil3",
								xtype:'image',
								src:"resources/images/accueil/accueil3.png",
								mode:"image",
								centered:true,
								padding:".4em"
							}
						]
					},
					{
						flex:1,
						cls:'container',
						items:[
							{
								id:"btnAccueil4",
								xtype:'image',
								src:"resources/images/accueil/accueil4.png",
								mode:"image",
								centered:true,
								padding:".4em"
							}
						]
					}
				]
			}
		]
	}
});

/**
 * Lyon ville de cinéma
 */
Ext.define("Cdfra.view.accueil.Coeur", {
    extend:'Ext.NestedList',
    xtype:'accueilcoeur',
    id:'coeur',
    fullscreen:true,
    config: { 
    	useTitleAsBackText:false,
    	title:'Coups de coeur',
     	displayField: 'nom',
        store:'MenuCoeur',
        backButton:{
            ui:'retour',
            hidden:true
        },
        listConfig:{
            disableSelection:true
        }
    }
});

/**
 * Lyon ville de cinéma
 */
Ext.define("Cdfra.view.accueil.Decors", {
    extend:'Ext.dataview.DataView',
    xtype:'accueildecors',
    fullscreen:true,
    config: {
        title:'Décors remarquables',
        store:'decors.Decors',
        id:'decors',
        itemTpl: '<img src="resources/images/decors/vf/{vignette}"/>',
        items:[
            {
                xtype:'titlebar',
                docked: 'top',
                title:'Décors remarquables'
            }
        ]
    }
});

/**
 * menu Production
 */
Ext.define("Cdfra.view.accueil.Production", {
    extend:'Ext.NestedList',
    xtype:'accueilproduction',
    id:'production',
    fullscreen:true,
    config: { 
    	useTitleAsBackText:false,
    	title:'Guide de production',
     	displayField: 'nom',
        store:'MenuProduction',
        backButton:{
            ui:'retour',
            hidden:true
        },
        listConfig:{
            disableSelection:true
        }
    }
});

/**
 * Ecran d'accueil
 */
Ext.define("Cdfra.view.accueil.Splash", {
	extend:'Ext.Container',
	xtype:'accueilsplash',
	fulscreen:true,
	config: { 
		id:"splash",
		items:[
			{
				xtype:'image',
				src:"resources/images/accueil/splash.png",
				mode:"image",
				width:"100%",
				centered:true
			}
		]
	}
});

/**
 * Lyon ville de cinéma
 */
Ext.define("Cdfra.view.accueil.Lyon", {
    extend:'Ext.NestedList',
    xtype:'accueillyon',
    id:'lyon',
    fullscreen:true,
    config: { 
    	useTitleAsBackText:false,
    	title:'Lyon, ville de cinéma',
     	displayField: 'nom',
        store:'MenuLyon',
        backButton:{
            ui:'retour',
            hidden:true
        },
        listConfig:{
            disableSelection:true
        }
    }
});

/**
 * CARTE (BIBLE/RESTAU ...)
 */
Ext.define("Cdfra.view.templates.Template72", {
	extend:'Ext.Container',
	xtype:'template7',
	fullscreen:true,

	config:{
		scrollable:true,
		cls:'template7',

		title:null,

		layout: {
			type: 'card'
		},
		items:[
			{
				xtype:'titlebar',
				docked: 'top',
				items:[
					{
						xtype:"image",
						mode:"image",
						itemId:'btnRetour',
						cls:"btnRetour",
						src:'resources/images/btnPrev.png'
					}
				]
			},
			{
				xtype:'container',
				cls:'toolbar',
				docked: 'bottom',
				itemId:'barNav',
				layout:'hbox',
				items:[
					{
						xtype:"container",
						flex:4,
						disabled:true,
						border:0
					},
					{
						xtype:'image',
						src:'resources/images/separateur.png',
						width:"2px"
					},
					{
						flex:1,
						items:[{
							xtype:'image',
							src:'resources/images/btnMap.png',
							mode:'image',
							itemId:'btnMap',
							centered:true
						}]
					},
					{
						xtype:'image',
						src:'resources/images/separateur.png',
						width:"2px"
					},
					{
						flex:1,
						items:[{

							xtype:'image',
							src:'resources/images/btnShare.png',
							mode:'image',
							itemId:'btnShare',
							centered:true
						}]
					}
				]
			}
		]
	},

	applyTitle:function(aValue, aOldValue){
		if (aValue.length > 30){
			aValue = aValue.substring(0,29) + "...";
		}
		this.getComponent(0).setTitle(aValue);
	},

	setRecord:function(aRecord){
		if (aRecord != null){
			
			// affichage
			this.populate(aRecord);

		}
		else {
			this.setHtml("");
		}
		
	},
	populate:function(aRecord){
		
	}

});


Ext.define("Cdfra.view.templates.Template3", {
    extend:'Cdfra.view.templates.Template2',
    xtype:'template3',
    fullscreen:true,
    config: { 

    	itemTpl:'{mf}<div>{texte}</div><br/>',

    }
});

Ext.define("Cdfra.view.templates.Template1", {

	extend:'Ext.NestedList',
	xtype:'template1',
	fullscreen:true,
	config: { 
		useTitleAsBackText:false,
        backButton:{
            ui:'retour',
            hidden:true
        },
        listConfig:{
            disableSelection:true
        }
	}
});

/**
 * DIAPORAMA
 */
Ext.define("Cdfra.view.templates.Template8", {
	extend:'Ext.Container',
	requires:["Ext.Carousel", "Ext.Img", "Cdfra.view.templates.Template10"],
	xtype:'template8',
	fullscreen:true,
	config:{
		
		nbItems:0,

		title:null,

		layout: {
			type: 'card'
		},
		items:[
			{
				fullscreen:true,
				layout:{
					type:"fit"
				},
				items:[
					{
						xtype:'titlebar',
						docked: 'top',
						items:[
							{
								xtype:"image",
								mode:"image",
								itemId:'btnRetour',
								cls:"btnRetour",
								src:'resources/images/btnPrev.png'
							}
						]
					},
					{
						xtype:'carousel',
						height:"100%"
					},
					{
						xtype:'container',
						cls:'toolbar',
						docked: 'bottom',
						itemId:'barNav',
						layout:'hbox',
						items:[
							{
								flex:1,
								items:[{
									xtype:'image',
									src:'resources/images/btnMap.png',
									mode:'image',
									itemId:'btnMap',
									centered:true
								}]
							},
							{
								xtype:'image',
								src:'resources/images/separateur.png',
								width:"2px"
							},
							{
								flex:1,
								items:[{
									xtype:'image',
									src:'resources/images/btnPrev.png',
									mode:'image',
									itemId:'btnPrev',
									centered:true
								}]
							},
							{
								xtype:'image',
								src:'resources/images/separateur.png',
								width:"2px"
							},
							{
								flex:1,
								items:[{

									xtype:'image',
									src:'resources/images/btnInfos.png',
									mode:'image',
									itemId:'btnInfos',
									centered:true
								}]
							},
							{
								xtype:'image',
								src:'resources/images/separateur.png',
								width:"2px"
							},
							{
								flex:1,
								items:[{

									xtype:'image',
									src:'resources/images/btnNext.png',
									mode:'image',
									itemId:'btnNext',
									centered:true
								}]
							},
							{
								xtype:'image',
								src:'resources/images/separateur.png',
								width:"2px"
							},
							{
								flex:1,
								items:[{

									xtype:'image',
									src:'resources/images/btnShare.png',
									mode:'image',
									itemId:'btnShare',
									centered:true
								}]
							}
						]
						
					},
					{

						hidden:true,
						itemId:'infosContainer',
						cls:'infosContainer',
						showAnimation:{
							type:'slide',
							direction:'up'
						},
						hideAnimation:{
							type:'slide', 
							direction:'down',
							out:'true'
						},
						bottom:0,
						layout:{
							type: 'vbox'
						},
						width:"100%",
						items:[
							
							/*{
								xtype:"image",
								itemId:'btnFermerInfos',
								mode:"image",
								width:23,
								height:23,
								src:'resources/images/btn_fermer.png',
								right:0
							},*/
							{
								itemId:'infos',
								cls:'infosTF'

							}
						]
					}
				]
			},
			{
				xtype:"template10",
				itemId:"map"
			}
		]
	},
	applyTitle:function(aValue, aOldValue){
		this.getComponent(0).getComponent(0).setTitle(aValue);
	},
});


Ext.define("Cdfra.view.templates.Template9", {
    extend:'Cdfra.view.templates.Template2',
    xtype:'template9',
    fullscreen:true,
    config: { 
    	cls:"template9",
    	itemTpl:'<div class="titre">{titre}</div><div>{mf}</div><div>{texte}</div>',

    }
});

/**
 * LA CARTE 
 */
Ext.define("Cdfra.view.templates.Template10", {

	extend:'Ext.Container',
	requires:['Ext.Map'],
	xtype:'template10',

	config:{

		itemId:'map',
		cls:"tpl10",

		hidden:true,

		showAnimation:{
			type:'slide', 
			direction:'up'
		},
		hideAnimation:{
			type:'slide', 
			direction:'down',
			out:'true'
		},

		bottom:0,
		height:"100%",
		width:"100%",

		title:null,
		coordonnees:null,
		adresse:null,
		mapOptions:{
		    zoom : 12,
            mapTypeId : "roadmap",
            navigationControl:false,
            scaleControl:false,
            rotateControl:false,
            panControl:false,
            streetViewControl:false,
            mapTypeControl:false,
            zoomControl:true
		},

		items:[
			{
			
				xtype:"titlebar",
				cls:"titlebarMap",
				itemId:"bareDeTitre",
				docked:"top",
				layout:'fit',
				items:[
					{
						xtype:"image",
						itemId:"btnFermer",
						width:47,
						height:47,
						mode:"image",
						src:'resources/images/btn_fermer.png',
						right:0,
						margin:'0',
						listeners:{
							tap:function(){
								var refThis = this.getParent().getParent().getParent();
								refThis.fireCloseEvent(arguments)
							}
						}
					}
				]
			},
			{
				xtype:'map',
				itemId:'map',
				fullscreen:true,
				height:"100%",
				width:"100%"
			}
		],

		listeners:{
			initialize:function(){
		        this.titleBar = this.getComponent(0);
		        this.map = this.getComponent(1);
			}
		}
	},
	fireCloseEvent:function(){
		this.fireEvent('close', arguments);
	},

	applyTitle:function(aValue, aOldValue){
		this.titleBar.setTitle(aValue);
	},

	applyAdresse:function(aValue, aOldValue){
		var geocoder = new google.maps.Geocoder();
		var map = this.map.getMap();
		window.refObjRetourGeoloc = this;
		geocoder.geocode( 
			{ 'address': aValue, latLng:new google.maps.LatLng(45.759859,4.838001)}, 
			this._retourGeoloc
		);
	},
	_retourGeoloc:function(results, status) {
		if (status == google.maps.GeocoderStatus.OK) {
			var vResult = results[0].geometry.location;
			refObjRetourGeoloc.setCoordonnees([vResult.Xa, vResult.Ya]);
			/*
			//In this case it creates a marker, but you can get the lat and lng from the location.LatLng
			map.setCenter(results[0].geometry.location);
			var marker = new google.maps.Marker({
				map: map, 
				position: results[0].geometry.location
			});*/
		} else {
			//refObjRetourGeoloc.disableBtnMap();
			refObjRetourGeoloc.setCoordonnees([45.759859,4.838001]);
			//alert("Problème de localisation sur la carte");
		}
	},
	disableBtnMap:function(){
		//console.log("Pas de géoloc");
	},
	applyCoordonnees:function(aValue, aOldValue){
		var vCoords = aValue;
		
		var vOptions = this.getMapOptions();
		vOptions.center = new google.maps.LatLng(vCoords[0], vCoords[1]);
		this.map.setMapOptions(vOptions);

		var map = this.map.getMap();
		var vMarkers = map.markers;

		if (this.marker){
		    this.marker.setMap(null);		
		}

		var marker = new google.maps.Marker({
            position: vOptions.center,
            title :this.getTitle(),
            map: map
    	});

    	this.marker = marker;

	},


});


Ext.define("Cdfra.view.templates.Template4", {

	extend:'Ext.Container',
	requires:['Ext.Img'],
	xtype:'template4',
	fullscreen:true,
	config:{
		cls:"tpl4",
		scrollable: {
		    direction: 'vertical',
		    directionLock: true
		},
		items:[
			{
				xtype:'titlebar',
				docked: 'top',
				items:[
					{
						xtype:"image",
						mode:"image",
						itemId:'btnRetour',
						cls:"btnRetour",
						src:'resources/images/btnPrev.png'
					}
				]
			},
			{
				xtype:'container'
			}
		]
	}
});


Ext.define("Cdfra.view.templates.Template2", {
    extend:'Ext.Container',
    xtype:'template2',
    fullscreen:true,
    config: {
    	
    	titre:null,
    	store:null,
    	itemTpl:'{vf}<span class="nom">{nom}</span>',

        disableSelection:true,
        layout:'fit',
        items:[
       		{
				xtype:'titlebar',
				docked: 'top',
				items:[
					{
						xtype:"image",
						mode:"image",
						itemId:'btnRetour',
						cls:"btnRetour",
						src:'resources/images/btnPrev.png'
					}
				]
			},
			{
				xtype:'list',
				itemId:'liste',
				disableSelection:true,
			}
		]
    },
    applyTitre: function(aValue, aOldValue) {
    	this.getComponent(0).setTitle(aValue);
    },
    applyStore: function(aValue, aOldValue) {
    	this.getComponent(1).setStore(aValue);
    },
    applyItemTpl: function(aValue, aOldValue) {
    	this.getComponent(1).setItemTpl(aValue);
    }
});

/**
 * CARTE (BIBLE/RESTAU)
 */
Ext.define("Cdfra.view.templates.Template7", {
	extend:'Ext.Container',
	xtype:'template7',
	fullscreen:true,

	config:{
		scrollable:true,
		cls:'template7',
		layout: {
			type: 'card'
		},
		items:[
			{
				xtype:'container',
				cls:'toolbar',
				docked: 'bottom',
				itemId:'barNav',
				layout:'hbox',
				items:[
					{
						xtype:"container",
						flex:4,
						disabled:true,
						border:0
					},
					{
						xtype:'image',
						src:'resources/images/separateur.png',
						width:"2px"
					},
					{
						flex:1,
						items:[{
							xtype:'image',
							src:'resources/images/btnMap.png',
							mode:'image',
							itemId:'btnMap',
							centered:true
						}]
					},
					{
						xtype:'image',
						src:'resources/images/separateur.png',
						width:"2px"
					},
					{
						flex:1,
						items:[{

							xtype:'image',
							src:'resources/images/btnShare.png',
							mode:'image',
							itemId:'btnShare',
							centered:true
						}]
					}
				]
			}
		]
	},

	setRecord:function(aRecord){
		if (aRecord != null){
			
			// affichage
			this.populate(aRecord);

		}
		else {
			this.setHtml("");
		}
		
	},
	populate:function(aRecord){
		
	}
});











































        describe("Basic Suite", function() {
            it("Should pass a basic truthiness test.", function() {
                expect(true).toEqual(true);
            });
            
            it("Should fail when it hits an inequal statement.", function() {
                expect(1+1).toEqual(3);
            });
        });
        
        describe("Another Suite", function() {
            it("Should pass this test as well.", function() {
                expect(0).toEqual(0);
            });
        });
        
        jasmine.getEnv().addReporter(new jasmine.ConsoleReporter());
        jasmine.getEnv().addReporter(new jasmine.TrivialReporter());
        jasmine.getEnv().execute();
    






        jasmine.getEnv().addReporter(new jasmine.TrivialReporter());
        jasmine.getEnv().addReporter(new jasmine.JUnitXmlReporter());
        jasmine.getEnv().execute();
    


<!--/*--><![CDATA[/*><!--*/
 function CodeHighlightOn(elem, id)
 {
   var target = document.getElementById(id);
   if(null != target) {
     elem.cacheClassElem = elem.className;
     elem.cacheClassTarget = target.className;
     target.className = "code-highlighted";
     elem.className   = "code-highlighted";
   }
 }
 function CodeHighlightOff(elem, id)
 {
   var target = document.getElementById(id);
   if(elem.cacheClassElem)
     elem.className = elem.cacheClassElem;
   if(elem.cacheClassTarget)
     target.className = elem.cacheClassTarget;
 }
/*]]>*///-->

