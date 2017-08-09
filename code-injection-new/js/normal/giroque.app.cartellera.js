


 
    
	


// Category Collection
// ===================

// Includes file dependencies
define([ "jquery","backbone","models/CinemesModel" ], function( $, Backbone, CinemesModel ) {

    // Extends Backbone.Router
    var Collection = Backbone.Collection.extend( {

        // The Collection constructor
        initialize: function( models, options ) {

            // Sets the type instance property (ie. animals)
            this.type = options.type;

        },

        // Sets the Collection model property to be a Category Model
        model: CinemesModel,

 
        url :"http://www.giroque.com/api/?cinemes=1&callback=?"

    } );

    // Returns the Model class
    return Collection;

} );

// Category Collection
// ===================

// Includes file dependencies
define([ "jquery","backbone","models/FilmsModel" ], function( $, Backbone, FilmsModel ) {

    // Extends Backbone.Router
    var Collection = Backbone.Collection.extend( {

        // The Collection constructor
        initialize: function( models, options ) {

            // Sets the type instance property (ie. animals)
            this.type = options.type;
            

        },

        // Sets the Collection model property to be a Category Model
        model: FilmsModel,

        url : 'http://www.giroque.com/api/?callback=?',


    } );

    // Returns the Model class
    return Collection;

} );

// Category Collection
// ===================

// Includes file dependencies
define([ "jquery","backbone","models/FilmSessionModel" /*, "backbonecachingsync"*/  ], function( $, Backbone, FilmSessionModel ) {

    // Extends Backbone.Router
    var Collection = Backbone.Collection.extend( {

        // The Collection constructor
        initialize: function( models, options ) {

            // Sets the type instance property (ie. animals)
            this.type = options.type;
            this.data = options.data;

        },

        // Sets the Collection model property to be a Category Model
        model: FilmSessionModel,

        url : 'http://www.giroque.com/api/?',
        /*  url: function() {
            return 'http://www.giroque.com/api/?'+ this.data +"&callback=?";
          }*/
        //sync: Backbone.cachingSync(Backbone.sync, 'giroque', 120),
       

    } );

    // Returns the Model class
    return Collection;

} );

// Category Collection
// ===================

// Includes file dependencies
define([ "jquery","backbone","models/CiutatsModel" ], function( $, Backbone, CiutatsModel ) {

    // Extends Backbone.Router
    var Collection = Backbone.Collection.extend( {

        // The Collection constructor
        initialize: function( models, options ) {

            // Sets the type instance property (ie. animals)
            this.type = options.type;

        },

        // Sets the Collection model property to be a Category Model
        model: CiutatsModel,

 
        url :"http://www.giroque.com/api/?poblacions=1&callback=?"

    } );

    // Returns the Model class
    return Collection;

} );

// Category Model
// ==============

// Includes file dependencies
define([ "jquery", "backbone" ], function( $, Backbone ) {

    // The Model constructor
    var Model = Backbone.Model.extend( {

    } );

    // Returns the Model class
    return Model;

} );

// Category Model
// ==============

// Includes file dependencies
define([ "jquery", "backbone" ], function( $, Backbone ) {

    // The Model constructor
    var Model = Backbone.Model.extend( {

    } );

    // Returns the Model class
    return Model;

} );

// Category Model
// ==============

// Includes file dependencies
define([ "jquery", "backbone" ], function( $, Backbone ) {

    // The Model constructor
    var Model = Backbone.Model.extend( {

    } );

    // Returns the Model class
    return Model;

} );

// Category Model
// ==============

// Includes file dependencies
define([ "jquery", "backbone" ], function( $, Backbone ) {

    // The Model constructor
    var Model = Backbone.Model.extend( {

    } );

    // Returns the Model class
    return Model;

} );

// Category Model
// ==============

// Includes file dependencies
define([ "jquery", "backbone" ], function( $, Backbone ) {

    // The Model constructor
    var Model = Backbone.Model.extend( {

    } );

    // Returns the Model class
    return Model;

} );

// Mobile Router
// =============

// Includes file dependencies
define([ "jquery","backbone", 
        "../models/FilmsModel", "../collections/FilmsCollection", "../views/FilmsView",
        "../models/CinemesModel", "../collections/CinemesCollection", "../views/CinemesView",
        "../models/CiutatsModel", "../collections/CiutatsCollection", "../views/CiutatsView",
        "../models/FilmSessionModel", "../collections/FilmSessionCollection", "../views/FilmView",
        "../views/CinemaView", "../views/CiutatView",
        ], function( $, Backbone, 
                     FilmsModel, FilmsCollection, FilmsView, 
                     CinemesModel, CinemesCollection, CinemesView, 
                     CiutatsModel,  CiutatsCollection, CiutatsView,
                     FilmsSessionModel, FilmSessionCollection, FilmView, 
                     CinemaView, CiutatView  ) {

    // Extends Backbone.Router
    var CategoryRouter = Backbone.Router.extend( {

        // The Router constructor
        initialize: function() {

            
            this.FilmsView = new FilmsView({ el: "#portada", collection: new FilmsCollection( [], { } ) } );
            this.CinemesView = new CinemesView( { el: "#cinemes", collection: new CinemesCollection( [] , {  } ) } );
            this.CiutatsView = new CiutatsView( { el: "#ciutats", collection: new CiutatsCollection( [] , {  } ) } );

            this.FilmView = new FilmView( { el: "#page-film", collection: new FilmSessionCollection( [] , {  } ) } );
            this.CinemaView = new CinemaView( { el: "#page-cinema", collection: new FilmSessionCollection( [] , {  } ) } );
            this.CiutatView = new CiutatView( { el: "#page-poblacio", collection: new FilmSessionCollection( [] , {  } ) } );


            // Tells Backbone to start watching for hashchange events
            Backbone.history.start();

        },

        // Backbone.js Routes
        routes: {

            // When there is no hash bang on the url, the home method is called
            "": "home",
            "portada": "home",

            // When #category? is on the url, the category method is called
            "cinemes": "cinemes",
            "ciutats" :"ciutats",
            "page-film=:id" : "film",
            "page-cinema=:id" : "cinema",
            "page-poblacio=:id" : "ciutat",           
            "*actions" : "defaultRoute"

        },

        defaultRoute :  function(r){
            $.mobile.changePage( "#"+r , { reverse: false, changeHash: false } );
        },

        // Home method
        home : function(){
            this.changePage("FilmsView");
        },

        ciutats : function(){
            this.changePage("CiutatsView");
        },
 
        cinemes : function(){
            this.changePage("CinemesView");
        },

        film : function(id){
            var currentView = this.FilmsView, self = this, current;
            if(currentView.collection && currentView.collection.length) {
                viewFilm(self, id);    
            } else {
                currentView.collection.fetch().done( function() {
                    viewFilm(self, id);
                });
            }

            function viewFilm(self, id){
                //current = currentView.collection.models[0].get("result")[id];
                current = _.findWhere(currentView.collection.models[0].get("result"), {codi: id});
                codi = current.codi;
                self.FilmView.options.film = current;
                self.changePage("FilmView", {data: "pelicula="+ codi + "&callback=?"}, true);
            }
        },

        cinema : function(id){
            this.changePage("CinemaView", {data: "cinema="+ id + "&callback=?"}, true);
        },

        ciutat : function(id){
            this.changePage("CiutatView", {data: "poblacio="+ id + "&callback=?"}, true);
        },

        // Category method that passes in the type that is appended to the url hash
        changePage: function(view, params, reload) {
            params = $.extend({},params,{cache : true,  processData:true});

            // Stores the current Category View  inside of the currentView variable
            var currentView = this[ view ];

            if(!currentView.collection.length || reload) {
                $.mobile.loading( "show" );
                currentView.collection.fetch(params).done( function() {
                    $.mobile.changePage( currentView.$el, { reverse: false, changeHash: false } );
                } );
            }
            else {
                $.mobile.changePage( currentView.$el , { reverse: false, changeHash: false } );
            }
        }

    } );

    // Returns the Router class
    return CategoryRouter;

} );

// Category View
// =============

// Includes file dependencies
define([ "jquery", "backbone","models/CinemesModel" ], function( $, Backbone, CinemesModel ) {

    // Extends Backbone.View
    var CinemesView = Backbone.View.extend( {

        // The View Constructor
        initialize: function() {

            // The render method is called when Category Models are added to the Collection
            this.collection.bind("reset", this.render, this);
            this.collection.bind("change", this.render, this);

        },

        // Renders all of the Category models on the UI
        render: function() {

            // Sets the view's template property
            //this.template = _.template( $( "script#categoryItems" ).html(), { "collection": this.collection } );
            this.template = $( "#tmpl_cinemes" ).tmpl( this.collection.toJSON()[0] );

            // Renders the view's template inside of the current listview element
            this.$el.find("ul.cinemes").html(this.template);

            // Maintains chainability
            return this;

        }

    } );

    // Returns the View class
    return CinemesView;

} );

// Category View
// =============

// Includes file dependencies
define([ "jquery", "backbone", "models/FilmsModel", "jquerytmpl" ], function( $, Backbone, CinemaModel ) {

    // Extends Backbone.View
    var CinemaView = Backbone.View.extend( {

        firstTime :  true,

        // The View Constructor
        initialize: function() {

            // The render method is called when Category Models are added to the Collection
            //this.collection.on( "added", this.render, this );
            //this.collection.listenTo(CinemaModel,"change", this.render)
            this.collection.bind("reset", this.render, this);
            this.collection.bind("change", this.render, this);
            this.collection.bind("update", this.render, this);

        },

        // Renders all of the Category models on the UI
        render: function() {
            var data = this.collection.toJSON()[0];
            // Sets the view's template property
            //this.template = _.template( $( "script#categoryItems" ).html(), { "collection": this.collection } );
            this.template = $( "#sessions" ).tmpl( data );

            // Renders the view's template inside of the current listview element
            this.$el.find("#cinema-content").html(this.template);

            if(this.firstTime){
                this.firstTime = false;
            } else {
                this.$el.trigger("create");
            }
            //this.$el.trigger("create");
            // $.mobile.loading( "hide" );

            // Maintains chainability
            return this;

        }

    } );

    // Returns the View class
    return CinemaView;

} );

// Category View
// =============

// Includes file dependencies
define([ "jquery", "backbone", "models/FilmsModel", "jquerytmpl" ], function( $, Backbone, FilmsSessionModel ) {

    // Extends Backbone.View
    var FilmView = Backbone.View.extend( {

        firstTime :  true,

        // The View Constructor
        initialize: function() {

            // The render method is called when Category Models are added to the Collection
            //this.collection.on( "added", this.render, this );
            //this.collection.listenTo(FilmsModel,"change", this.render)
            this.collection.bind("reset", this.render, this);
            this.collection.bind("change", this.render, this);

        },

        // Renders all of the Category models on the UI
        render: function() {
            var data = this.collection.toJSON()[0];
            // Sets the view's template property
            //this.template = _.template( $( "script#categoryItems" ).html(), { "collection": this.collection } );
            this.template2 = $("#film").tmpl(this.options.film)
            this.$el.find("#film-content").html("").html(this.template2);

            this.template = $( "#sessions2" ).tmpl( data );

            // Renders the view's template inside of the current listview element "#film-content"
            this.$el.find("div.sessio").html(this.template);
            if(this.firstTime){
                this.firstTime = false;
            } else {
                this.$el.find("div.sessio").find("ul").listview();
            }

            //this.$el.trigger("create");
            // $.mobile.loading( "hide" );

            // Maintains chainability
            return this;

        }

    } );

    // Returns the View class
    return FilmView;

} );

// Category View
// =============

// Includes file dependencies
define([ "jquery", "backbone", "models/FilmsModel", "jquerytmpl" ], function( $, Backbone, FilmsModel ) {

    // Extends Backbone.View
    var FilmsView = Backbone.View.extend( {

        // The View Constructor
        initialize: function() {

            // The render method is called when Category Models are added to the Collection
            //this.collection.on( "added", this.render, this );
            //this.collection.listenTo(FilmsModel,"change", this.render)
            this.collection.bind("reset", this.render, this);
            this.collection.bind("change", this.render, this);

        },

        // Renders all of the Category models on the UI
        render: function() {
            var data = this.collection.toJSON()[0];
            // Sets the view's template property
            //this.template = _.template( $( "script#categoryItems" ).html(), { "collection": this.collection } );
           
            this.template = $( "#cartellera" ).tmpl( data );

            // Renders the view's template inside of the current listview element
            this.$el.find("ul.films").html(this.template);
            //this.$el.trigger("create");
            // $.mobile.loading( "hide" );

            // Maintains chainability
            return this;

        }

    } );

    // Returns the View class
    return FilmsView;

} );

// Category View
// =============

// Includes file dependencies
define([ "jquery", "backbone", "models/CiutatModel", "jquerytmpl" ], function( $, Backbone, FilmsModel ) {

    // Extends Backbone.View
    var CiutatView = Backbone.View.extend( {

        firstTime :  true,

        // The View Constructor
        initialize: function() {

            // The render method is called when Category Models are added to the Collection
            //this.collection.on( "added", this.render, this );
            //this.collection.listenTo(CiutatModel,"change", this.render)
            this.collection.bind("reset", this.render, this);
            this.collection.bind("change", this.render, this);

        },

        // Renders all of the Category models on the UI
        render: function() {
            var data = this.collection.toJSON()[0];
            // Sets the view's template property
            //this.template = _.template( $( "script#categoryItems" ).html(), { "collection": this.collection } );
            this.template = $( "#sessions" ).tmpl( data );

            // Renders the view's template inside of the current listview element
            this.$el.find("#poblacio-content").html(this.template);
            
            if(this.firstTime){
                this.firstTime = false;
            } else {
                this.$el.trigger("create");
            }

            // Maintains chainability
            return this;

        }

    } );

    // Returns the View class
    return CiutatView;

} );

// Category View
// =============

// Includes file dependencies
define([ "jquery", "backbone","models/CiutatsModel" ], function( $, Backbone, CiutatsModel ) {

    // Extends Backbone.View
    var CiutatsView = Backbone.View.extend( {

        // The View Constructor
        initialize: function() {

            // The render method is called when Category Models are added to the Collection
            this.collection.bind("reset", this.render, this);
            this.collection.bind("change", this.render, this);

        },

        // Renders all of the Category models on the UI
        render: function() {

            // Sets the view's template property
            //this.template = _.template( $( "script#categoryItems" ).html(), { "collection": this.collection } );
            this.template = $( "#tmpl_ciutats" ).tmpl( this.collection.toJSON()[0] );

            // Renders the view's template inside of the current listview element
            this.$el.find("ul.poblacions").html(this.template);

            // Maintains chainability
            return this;

        }

    } );

    // Returns the View class
    return CiutatsView;

} );
