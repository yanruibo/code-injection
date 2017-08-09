


























			var webIntent;

			document.addEventListener("deviceready",onDeviceReady,true);

			/* PhoneGap has been initialized and is ready to roll */
			function onDeviceReady() {
				//webIntent = WebIntent.install();
			}
		

/** *** NEWS **** */
function setNewsImages(id, campo, url) {
	LogWrite('FUNCTIONS "cache" [setNewsImages]: imposto la news ' + id
			+ ', setto nel campo ' + campo + ' il valore ' + url);
	var news = app.stores.News.getById(id);
	news.set(campo, dataUrl);
	app.stores.News.sync();
}

function checkNewsUrl() {
	app.stores.News.each(function(record) {
				var id = record.getId();
				var mini = this.get('mini');
				var immagine = this.get('immagine');

				if (app_image_cache) {
					// MINI
					var mininew = "http://src.sencha.io/data.setNewsImages-"
							+ id + "/mini/" + mini;
					var script_mini = document.createElement("script");
					script_mini.setAttribute("src", mininew);
					script_mini.setAttribute("type", "text/javascript");
					document.body.appendChild(script_mini);
				}
				record.set('mini', mini);
				record.set('immagine', immagine);
			});
	app.stores.News.sync();
}

function LogWrite(commento) {
	if (app_debug)
		console.log(commento);
}

// APPLICAZIONE
var app_name = 'Run5.30';
var app_version = '1.2.1';
var app_title = 'Run5.30';
var app_slogan = 'Don\'t Dream it. Be it!';
// IMMAGINI APPLICAZIONE
var res_image = 'resources/images/';
var app_icon = res_image + 'logo_run.png';
var app_image_home = res_image + 'home_schermata.png';
var app_image_startup_phone = res_image + 'phone_startup.png';
var app_image_startup_tablet = res_image + 'tablet_startup.png';
var logo_bonsai = res_image + 'logo_bonsai.png';
// IMPOSTAZIONI APPLICAZIONE
var app_debug = false;
var app_store_offline = false;
var app_image_cache = false;

var remote_host = 'http://www.run530.it/'; // 'http://192.168.1.3/run530.it/';
											// //'http://www.run530.it/';
// XML
var xml_path = remote_host + 'xml_app/';
var xml_news = xml_path + 'generate.php?sezione=news';
var xml_run = xml_path + 'generate.php?sezione=run';
var xml_run_photosgallery = xml_path + 'generate.php?sezione=run_immagini';
var xml_video = xml_path + 'generate.php?sezione=video';
// JSON
var json_path = remote_host + 'xml_app/new/';
var json_news = json_path + 'generate.php?sezione=news&format=json';

// TOOLBAR
var topToolbar = new Ext.Toolbar({
			title : app_name,
			ui : 'light'
		});

// PROXY
/*
 * Ext.data.ProxyMgr.registerType("offlineajax", Ext.extend(Ext.data.Proxy, {
 * createRequestCallback: function(request, operation, callback, scope) { var me =
 * this;
 * 
 * return function(options, success, response) { // returns status === 0 ,
 * success. var reader = me.getReader(), result = reader.read(response);
 * 
 * Ext.apply(operation, { response : response, resultSet: result });
 * 
 * operation.setCompleted(); operation.setSuccessful();
 * 
 * if (typeof callback == 'function') { callback.call(scope || me, operation); }
 * 
 * me.afterRequest(request, true); }; } }) );
 */
var OfflineAjaxProxy = Ext.extend(Ext.data.AjaxProxy, {
			// based on AjaxProxy::createRequestCallback
			createRequestCallback : function(request, operation, callback,
					scope) {
				var me = this;

				return function(options, success, response) {
					// returns status === 0 , success.
					var reader = me.getReader(), result = reader.read(response);

					Ext.apply(operation, {
								response : response,
								resultSet : result
							});

					operation.setCompleted();
					operation.setSuccessful();

					if (typeof callback == 'function') {
						callback.call(scope || me, operation);
					}

					me.afterRequest(request, true);
				};
			}
		});

Ext.data.ProxyMgr.registerType('offlineajax', OfflineAjaxProxy);

// PROXY
Ext.data.PullRefreshProxy = Ext.extend(Ext.data.AjaxProxy, {
	perPage : 25,
	filterParam : undefined,

	constructor : function(config) {
		config = config || {};

		Ext.applyIf(config, {
					extraParams : {
						suppress_response_codes : true
					}
				});

		Ext.data.PullRefreshProxy.superclass.constructor.call(this, config);
	},

	/**
	 * We need to add a slight customization to buildRequest - we're just
	 * checking for a filter on the Operation and adding it to the request
	 * params/url, and setting the start/limit if paging
	 */
	buildRequest : function(operation) {
		var request = Ext.data.PullRefreshProxy.superclass.buildRequest.apply(
				this, arguments), filter = operation.filters[0], params = request.params;

		Ext.apply(params, {
					rpp : operation.limit,
					page : operation.page || 1
				});
		Ext.apply(params, {
					limit : params.rpp * params.page
				});

		if (filter) {
			Ext.apply(params, {
						q : filter.value
					});

			// as we're modified the request params, we need to regenerate the
			// url now
			request.url = this.buildUrl(request);
		}
		// alert('url:'+request.url+'\nfilter:'+filter+'\npage:'+params.page+'\nquery:'+params.q+'\nrpp:'+params.rpp+'\nlimit:'+params.limit);

		return request;
	}
});

Ext.data.ProxyMgr.registerType('pullrefresh', Ext.data.PullRefreshProxy);

Ext.regApplication('app', {
			name : 'app',
			useHistory : true,

			// Ext.setup config options
			icon : app_icon,
			tabletStartupScreen : app_image_startup_tablet,
			phoneStartupScreen : app_image_startup_phone,
			glossOnIcon : false,

			// Avvio,
			launch : function() {
				this.launched = true;
				this.mainLaunch();
			},
			mainLaunch : function() {
				var device = false;
				// Controllo se � in debug su Chrome
				app.is_chrome = navigator.userAgent.toLowerCase()
						.indexOf('chrome');
				if (app.is_chrome)
					device = true;

				// Avvio tutto quando tutto � stato caricato
				if (!device || !this.launched) {
					return;
				}
				LogWrite('APP [mainLaunch]: inizializzazione Viewport');
				this.views.viewport = new this.views.Viewport();
			}
		});

app.checkConnection = function() {
	var networkState = Connection.NONE;
	if (app_debug) {
		networkState = Connection.WIFI;
	} else {
		networkState = navigator.network.connection.type;
	}
	LogWrite('APP [checkConnection]: connessione=' + networkState);

	/*
	 * STATI CONNESSIONE Connection.UNKNOWN = 'Unknown connection';
	 * Connection.ETHERNET = 'Ethernet connection'; Connection.WIFI = 'WiFi
	 * connection'; Connection.CELL_2G = 'Cell 2G connection';
	 * Connection.CELL_3G = 'Cell 3G connection'; Connection.CELL_4G = 'Cell 4G
	 * connection'; Connection.NONE = 'No network connection';
	 */

	if (networkState == Connection.UNKNOWN
			|| networkState == Connection.CELL_2G
			|| networkState == Connection.NONE || networkState == null) {
		Ext.Msg
				.alert(
						"Connession assente o limitata",
						app_title
								+ " richiede una connessione 3G o Wi-Fi per poter funzionare!");
	}
};

// MODEL
app.models.Run = Ext.regModel("app.models.Run", {
			fields : ["id", "immagine", "medium", "mini", "titolo", "data",
					"luogo", "testo", "link_percorso", "url", "anno", "mese",
					"foto"]
		});
app.models.RunPhotosGallery = Ext.regModel("app.models.RunPhotosGallery", {
			fields : ["id", "idrun", "immagine", "medium", "mini"]
		});

// STORE
app.stores.Run = new Ext.data.Store({
	model : "app.models.Run",
	// autoLoad: true,
	getGroupString : function(record) {
		return record.get('anno');
	},
	proxy : {
		type : 'offlineajax',
		url : xml_run,
		reader : {
			type : 'xml',
			root : 'elencorun',
			record : 'run'
		}
	},
	timeout : 3000,
	listeners : {
		exception : function() {
			LogWrite("STORE \"Run\" [exception]: timeout dello store, recupero il localstorage");
			var lst = Ext.getCmp('listaRun');
			lst.bindStore(app.stores.RunOffline);
			app.stores.RunOffline.load();
		},
		load : function() {
			Ext.getCmp('mainTabPanel').checkBadgeRun();
		}
	}
});
app.stores.RunOffline = new Ext.data.Store({
			model : "app.models.Run",
			getGroupString : function(record) {
				return record.get('anno');
			},
			proxy : {
				type : 'localstorage',
				id : 'RunOffline'
			}
		});
app.stores.RunPhotosGallery = new Ext.data.Store({
			model : "app.models.RunPhotosGallery",
			proxy : {
				type : 'offlineajax',
				url : xml_run_photosgallery,
				reader : {
					type : 'xml',
					root : 'elencorun_immagini',
					record : 'run_immagini'
				}
			}
		});

// MODEL
app.models.Video = Ext.regModel("app.models.Video", {
			fields : ["id", "nome", "data", "anno", "mese", "descrizione",
					"immagine", "link_youtube", "codice_video"]
		});

// STORE
app.stores.Video = new Ext.data.Store({
	model : "app.models.Video",
	// autoLoad: true,
	getGroupString : function(record) {
		return record.get('anno');
	},
	proxy : {
		type : 'offlineajax',
		url : xml_video,
		reader : {
			type : 'xml',
			root : 'elencovideo',
			record : 'video'
		}
	},
	timeout : 3000,
	listeners : {
		exception : function() {
			LogWrite("STORE \"Video\" [exception]: timeout dello store, recupero il localstorage");
			var lst = Ext.getCmp('listaVideo');
			lst.bindStore(app.stores.VideoOffline);
			app.stores.VideoOffline.load();
		},
		load : function() {
			Ext.getCmp('mainTabPanel').checkBadgeVideo();
		}
	}
});
app.stores.VideoOffline = new Ext.data.Store({
			model : "app.models.Video",
			getGroupString : function(record) {
				return record.get('anno');
			},
			proxy : {
				type : 'localstorage',
				id : 'VideoOffline'
			}
		});

// MODEL
/** * OLD XML ** */
/*
 * app.models.News = Ext.regModel("app.models.News", { fields: ["id", "titolo",
 * "testo", "data", "immagine", "mini", "url", "anno", "mese"] });
 *  // STORE app.stores.News = new Ext.data.Store({ model: "app.models.News",
 * getGroupString : function(record) { return record.get('mese')+'
 * '+record.get('anno'); }, proxy: { type: 'offlineajax', url : xml_news,
 * reader: { type: 'xml', root: 'elenconews', record: 'news' } } });
 */
/** *** XML **** */
app.models.News = Ext.regModel("app.models.News", {
			fields : ["id", "titolo", "testo", "data", "immagine", "mini",
					"url", "anno", "mese"]
		});

// STORE
app.stores.News = new Ext.data.Store({
	model : "app.models.News",
	// autoLoad: true,
	getGroupString : function(record) {
		return record.get('mese') + ' ' + record.get('anno');
	},
	proxy : {
		type : 'pullrefresh',
		url : xml_news,
		reader : {
			type : 'xml',
			root : 'elenconews',
			record : 'news'
		}
	},
	timeout : 3000,
	listeners : {
		exception : function() {
			LogWrite("STORE \"News\" [exception]: timeout dello store, recupero il localstorage");
			var lst = Ext.getCmp('listaNews');
			lst.bindStore(app.stores.NewsOffline);
			app.stores.NewsOffline.load();
		},
		load : function() {
			Ext.getCmp('mainTabPanel').checkBadgeNews();
			checkNewsUrl();
		}
	}
});
app.stores.NewsOffline = new Ext.data.Store({
			model : "app.models.News",
			getGroupString : function(record) {
				return record.get('mese') + ' ' + record.get('anno');
			},
			proxy : {
				type : 'localstorage',
				id : 'NewsOffline'
			}
		});

app.controllers.Run = new Ext.Controller({
	list : function(options) {
		if (!app.views.runList)
			app.views.runList = new app.views.RunList();

		LogWrite('CONTROLLER "Run" [list]: visualizzo la view "runList"');
		app.views.viewport.setActiveItem(app.views.runList, options.animation);
	},
	show : function(options) {
		if (!app.views.runDetail)
			app.views.runDetail = new app.views.RunDetail();

		var id = parseInt(options.run.data.id);
		var run = options.run; // app.stores.News.getById(id);
		if (run) {
			LogWrite('CONTROLLER "Run" [show]: aggiorno la view con il record');
			app.views.runDetail.updateWithRecord(run);

			LogWrite('CONTROLLER "Run" [show]: visualizzo la view "runDetail"');
			app.views.viewport.setActiveItem(app.views.runDetail,
					options.animation);

			if (app.stores.RunOffline.getById(id) === null) {
				app.stores.RunOffline.add(run);
				app.stores.RunOffline.sync();
				LogWrite('CONTROLLER "Run" [show]: non trovo la run nel localstorage, la aggiungo');
			}
			Ext.getCmp('mainTabPanel').checkBadgeRun();
		} else {
			LogWrite('CONTROLLER "Run" [show]: blog non recuperata');
		}
	},
	gallery : function(options) {
		if (!app.views.runPhotosGallery)
			app.views.runPhotosGallery = new app.views.RunPhotosGallery();

		// var id = parseInt(options.run.data.id);
		var run = options.run; // app.stores.News.getById(id);
		if (run) {
			// MODELS IMMAGINI
			app.stores.RunPhotosGallery.proxy.url = xml_run_photosgallery
					+ '&idrun=' + run.data.id;
			LogWrite('CONTROLLER "Run" [gallery]: recupero store su '
					+ app.models.RunPhotosGallery.proxy.url);
			app.stores.RunPhotosGallery.load();

			LogWrite('CONTROLLER "Run" [gallery]: aggiorno la view con il record');
			app.views.runPhotosGallery.updateWithRecord(run);

			LogWrite('CONTROLLER "Run" [gallery]: visualizzo la view "runPhotosGallery"');
			app.views.viewport.setActiveItem(app.views.runPhotosGallery,
					options.animation);
		} else {
			LogWrite('CONTROLLER "Run" [gallery]: blog non recuperata');
		}
	},
	viewcarousel : function(options) {
		if (!app.views.runPhotosCarousel)
			app.views.runPhotosCarousel = new app.views.RunPhotosCarousel();

		var imgs = options.imgdata;
		if (imgs) {
			LogWrite('CONTROLLER "Run" [viewcarousel]: aggiorno la view con il record');
			app.views.runPhotosCarousel.updateWithRecord(imgs, options.run,
					options.index);
			/*
			 * LogWrite('CONTROLLER "Run" [carousel]: aggiungo le immagini al
			 * carousel'); for(var i=0; i<options.imgdata.length; i++) {
			 * app.views.runPhotosCarousel.carousel.add({ html: '<div
			 * class="img_carousel"><img
			 * src="'+remote_host+options.imgdata[i].data.immagine+'" /></div>'
			 * }); }
			 */
			LogWrite('CONTROLLER "Run" [viewcarousel]: visualizzo la view "runPhotosCarousel"');
			app.views.viewport.setActiveItem(app.views.runPhotosCarousel,
					options.animation);
			/*
			 * var ind = 0; if (options.index>0) ind=options.index;
			 * LogWrite('CONTROLLER "Run" [carousel]: imposto il carousel
			 * sull\'item '+ind);
			 * app.views.runPhotosCarousel.carousel.setActiveItem(ind);
			 */
		} else {
			LogWrite('CONTROLLER "Run" [viewcarousel]: nessuna imamgine recuperata');
		}
	}
});

app.controllers.Video = new Ext.Controller({
	list : function(options) {
		if (!app.views.videoList)
			app.views.videoList = new app.views.VideoList();

		app.views.viewport
				.setActiveItem(app.views.videoList, options.animation);
		LogWrite('CONTROLLER "Video" [list]: imposto la lista');
	},
	show : function(options) {
		var id = options.id;
		if (app.stores.VideoOffline.getById(id) === null) {
			app.stores.VideoOffline.add(options.video);
			app.stores.VideoOffline.sync();
			LogWrite('CONTROLLER "Video" [show]: non trovo il video nel localstorage, lo aggiungo');
		}
		Ext.getCmp('mainTabPanel').checkBadgeVideo();

		LogWrite('CONTROLLER "Video" [show]: richiamo il controller per visualizzare la video');
		var url = options.video.data.link_youtube;
		// Ext.Msg.alert('Link', url);
		window.plugins.videoPlayer.play(url);
		/*
		 * if (!app.views.videoDetail) app.views.videoDetail = new
		 * app.views.VideoDetail();
		 * 
		 * var id = parseInt(options.video.data.id); LogWrite('CONTROLLER
		 * "Video" [show]: recupero i dati per visualizzare il record con
		 * id='+id); var video = options.video; //app.stores.News.getById(id);
		 * if (video) { LogWrite('CONTROLLER "Video" [show]: impostazioni per la
		 * visualizzazione dei dettagli');
		 * app.views.videoDetail.updateWithRecord(video);
		 * app.views.viewport.setActiveItem( app.views.videoDetail,
		 * options.animation ); LogWrite('CONTROLLER "Video" [show]:
		 * visualizzazione dei dettagli'); if
		 * (app.stores.VideoOffline.getById(id) === null) {
		 * app.stores.VideoOffline.add(video); app.stores.VideoOffline.sync();
		 * LogWrite('CONTROLLER "Video" [show]: non trovo il video nel
		 * localstorage, lo aggiungo'); }
		 * Ext.getCmp('mainTabPanel').checkBadgeVideo(); } else {
		 * LogWrite('CONTROLLER "Video" [show]: video non recuperato'); }
		 */
	}
});

app.controllers.News = new Ext.Controller({
	list : function(options) {
		if (!app.views.newsList)
			app.views.newsList = new app.views.NewsList();

		app.views.viewport.setActiveItem(app.views.newsList, options.animation);
	},
	show : function(options) {
		if (!app.views.newsDetail)
			app.views.newsDetail = new app.views.NewsDetail();

		var id = parseInt(options.news.data.id);
		LogWrite('CONTROLLER "News" [show]: recupero i dati per visualizzare il record con id='
				+ id);
		var notizia = options.news; // app.stores.News.getById(id);
		if (notizia) {
			LogWrite('CONTROLLER "News" [show]: impostazioni per la visualizzazione dei dettagli');
			app.views.newsDetail.updateWithRecord(notizia);
			app.views.viewport.setActiveItem(app.views.newsDetail,
					options.animation);
			LogWrite('CONTROLLER "News" [show]: visualizzazione dei dettagli');

			if (app.stores.NewsOffline.getById(id) === null) {
				app.stores.NewsOffline.add(notizia);
				app.stores.NewsOffline.sync();
				LogWrite('CONTROLLER "News" [show]: non trovo la news nel localstorage, lo aggiungo');
			}
			Ext.getCmp('mainTabPanel').checkBadgeNews();
		} else {
			LogWrite('CONTROLLER "News" [show]: news non recuperata');
		}
	}
});

app.views.VideoList = Ext.extend(Ext.Panel, {
	initComponent : function() {
		LogWrite('VIEWS "VideoList" [initComponent]: inizializzazione della lista delle video');

		Ext.apply(this, {
					dockedItems : [{
								xtype : 'toolbar',
								title : 'Video'
							}],
					layout : 'fit'
				});

		app.stores.Video.load();
		this.listaVideo = new Ext.List({
			id : 'listaVideo',
			store : app.stores.Video,
			cls : 'listaImg',
			grouped : true,
			/* indexBar: true, */
			emptyText : '</pre> <div style="margin: <span class=;">5px;">Nessun Video.</div> <pre> <pre>',
			itemTpl : [
					'<div class="list-image">',
					'<div class="l_immagine"><img src="'
							+ '{immagine}" /></div>',
					'<div class="l_dettagli">',
					'<span class="l_data">{data}</span><br />',
					'<span class="l_titolo">{nome}</span>', '</div>', '</div>'],
			onItemDisclosure : false,
			listeners : {
				scope : this,
				itemtap : this.onItemTap,
				disclose : this.onItemTap
			}
				/*
				 * onItemDisclosure: function (record) { Ext.dispatch({
				 * controller: app.controllers.News, action: 'show', news:
				 * record }); }
				 */
		});
		/*
		 * if(Ext.IndexBar){ Ext.override(Ext.IndexBar, { 'letters':
		 * ['2011','2010','2009','2008'], dock : 'right', overlay : true,
		 * alphabet: false }); }
		 */
		this.on('deactivate', function(c) {
					LogWrite('VIEWS "VideoList" [deactivate]: distruggo vista');
					if (app.views.videoList)
						app.views.viewport.remove(app.views.videoList, true);
					c.destroy();
					app.views.videoList = null;
				});

		this.items = [this.listaVideo];

		app.views.VideoList.superclass.initComponent.call(this);
		LogWrite('VIEWS "VideoList" [initComponent]: superclass creata');
	},

	onItemTap : function(dView, index, item, e) {
		var record = this.listaVideo.store.getAt(index);
		LogWrite('VIEWS "VideoList" [onItemTap]: richiamo il controller per visualizzare la Run');
		Ext.dispatch({
					controller : app.controllers.Video,
					action : 'show',
					video : record,
					id : record.getId()
				});
		/*
		 * var record = this.listaVideo.store.getAt(index); LogWrite('VIDEO
		 * LIST: richiamo il controller per visualizzare la video');
		 * LogWrite(record); var url=record.data.link_youtube;
		 * //Ext.Msg.alert('Link', url); window.plugins.videoPlayer.play(url); /*
		 * Ext.dispatch({ controller: app.controllers.Video, action: 'show',
		 * video: record, id: record.getId() });
		 */
	}
});

app.views.Home = Ext.extend(Ext.Panel, {
			initComponent : function() {
				Ext.apply(this, {
							dockedItems : [{
								xtype : 'toolbar',
								title : app_title + ' <small>ver. '
										+ app_version + '</small>'
							}],
							html : ['<div class="home_content">',
									'<img src="' + app_image_home + '" />',
									'</div>'],
							layout : 'fit'
						});

				this.on('deactivate', function(c) {
							LogWrite('VIEWS "Home" [deactivate]: distruggo vista');
							if (app.views.home)
								app.views.viewport.remove(app.views.home, true);
							c.destroy();
							app.views.home = null;
						});

				LogWrite('VIEWS "Home" [initComponent]: caricamento componenti');
				app.views.Home.superclass.initComponent.call(this);
			}
		});

app.views.RunList = Ext.extend(Ext.Panel, {
	initComponent : function() {
		LogWrite('VIEWS "RunList" [initComponent]: inizializzazione della lista delle Run');

		Ext.apply(this, {
					dockedItems : [{
								xtype : 'toolbar',
								title : 'Run'
							}],
					layout : 'fit'
				});

		app.stores.Run.load();
		this.listaRun = new Ext.List({
			id : 'listaRun',
			store : app.stores.Run,
			cls : 'listaImg',
			grouped : true,
			emptyText : '</pre> <div style="margin: <span class=;">5px;">Nessun Run.</div> <pre> <pre>',
			itemTpl : '<div class="list-image"><div class="l_immagine"><img src="{mini}" /></div><div class="l_dettagli"><span class="l_data">{data}, {luogo}</span><br /><span class="l_titolo">{titolo}</span></div></div>',
			onItemDisclosure : false,
			listeners : {
				scope : this,
				itemtap : this.onItemTap,
				disclose : this.onItemTap
			}
		});

		this.on('deactivate', function(c) {
					LogWrite('VIEWS "deactivate" [initComponent]: distruggo vista');
					if (app.views.runList)
						app.views.viewport.remove(app.views.runList, true);
					c.destroy();
					app.views.runList = null;
				});

		this.items = [this.listaRun];

		app.views.RunList.superclass.initComponent.call(this);
		LogWrite('VIEWS "RunList" [initComponent]: superclass creata');
	},

	onItemTap : function(dView, index, item, e) {
		var record = this.listaRun.store.getAt(index);
		LogWrite('VIEWS "RunList" [onItemTap]: richiamo il controller per visualizzare la Run');
		Ext.dispatch({
					controller : app.controllers.Run,
					action : 'show',
					run : record,
					id : record.getId()
				});
	}
});

app.views.NewsList = Ext.extend(Ext.Panel, {
	initComponent : function() {
		LogWrite('VIEWS "NewsList" [initComponent]: caricamento dello stores News');

		Ext.apply(this, {
					dockedItems : [{
								xtype : 'toolbar',
								title : 'News'
							}],
					layout : 'fit'
				});

		app.stores.News.load();
		this.listaNews = new Ext.List({
			id : 'listaNews',
			cls : 'listaImg',
			store : app.stores.News,
			grouped : true,
			/* indexBar: true, */
			plugins : [{
						ptype : 'listpaging',
						autoPaging : true,
						loadMoreText : 'Carica altre news...'
					}, {
						ptype : 'pullrefresh',
						pullRefreshText : 'Tirare verso il basso per aggiornare...',
						releaseRefreshText : 'Rilascia per aggiornare...',
						loadingText : 'Carico...'
					}],
			emptyText : '</pre> <div style="margin: <span class=;">5px;">Nessuna news.</div> <pre> <pre>',
			itemTpl : '<div class="list-image"><div class="l_immagine"><img src="{mini}" id="news_mini_{id}" /></div><div class="l_dettagli"><span class="l_data">{data}</span><br /><span class="l_titolo">{titolo}</span></div></div>',
			onItemDisclosure : false,
			listeners : {
				scope : this,
				itemtap : this.onItemTap,
				disclose : this.onItemTap
			}
				/*
				 * onItemDisclosure: function (record) { Ext.dispatch({
				 * controller: app.controllers.News, action: 'show', news:
				 * record }); }
				 */
		});

		this.on('deactivate', function(c) {
					LogWrite('VIEWS "NewsList" [deactivate]: distruggo vista');
					if (app.views.newsList)
						app.views.viewport.remove(app.views.newsList, true);
					c.destroy();
					app.views.newsList = null;
				});

		this.items = [this.listaNews];

		app.views.NewsList.superclass.initComponent.call(this);
		LogWrite('VIEWS "NewsList" [initComponent]: superclass creata');
	},

	onItemTap : function(dView, index, item, e) {
		var record = this.listaNews.store.getAt(index);
		LogWrite('VIEWS "NewsList" [itemtap]: richiamo il controller per visualizzare la news');
		LogWrite(record);
		Ext.dispatch({
					controller : app.controllers.News,
					action : 'show',
					news : record,
					id : record.getId()
				});
	}
});

app.views.RunPhotosCarousel = Ext.extend(Ext.Panel, {
	initComponent : function() {
		LogWrite('VIEWS "RunPhotosCarousel" [initComponent]: inizializzo i componenti');

		this.on('deactivate', function(c) {
			LogWrite('VIEWS "RunPhotosCarousel" [deactivate]: distruggo vista');
			if (app.views.runPhotosCarousel)
				app.views.viewport.remove(app.views.runPhotosCarousel, true);
			c.destroy();
			app.views.runPhotosCarousel = null;
		});

		LogWrite('VIEWS "RunPhotosCarousel" [initComponent]: genero la toolbar');
		this.topToolbar = new Ext.Toolbar({
					xtype : 'toolbar',
					dock : 'top',
					title : 'Slide Foto Run',
					items : [{
								text : 'indietro',
								ui : 'back',
								id : 'btnBackCarousel',
								// iconMask: true,
								itemId : 'btnBackCarousel'
							}, {
								xtype : 'spacer'
							}]
				});
		this.dockedItems = [this.topToolbar];
		Ext.apply(this, {
					id : 'runPhotosCarousel',
					layout : 'fit'
				});

		LogWrite('VIEWS "RunPhotosCarousel" [initComponent]: carico il carousel');
		this.carousel = new Ext.Carousel({
			indicator : true,
			centered : true,
			direction : 'horizontal',
			defaults : {
				cls : 'card',
				layout : 'fit'
			},
			id : 'carousel',
			updateWithRecord : function(imgs, index) {
				LogWrite('VIEWS "RunPhotosCarousel" this.carousel [updateWithRecord]: aggiungo '
						+ imgs.length + ' items al carousel');
				for (var i = 0; i < imgs.length; i++) {
					this.add({
								html : '<div class="img_carousel"><figure><img src="'
										+ imgs[i].data.medium
										+ '" /></figure></div>'
							});
				}
				if (index > 0) {
					Ext.apply(this, {
								activeItem : index
							});
				}
			}
		});
		this.items = this.carousel;

		LogWrite('VIEWS "RunPhotosCarousel" [initComponent]: superclass');
		app.views.RunPhotosCarousel.superclass.initComponent.apply(this,
				arguments);
	},

	updateWithRecord : function(imgs, run, index) {
		// BOTTONE INDIETRO
		LogWrite('VIEWS "RunPhotosCarousel" [updateWithRecord]: aggiorno il bottone btnBack');
		if (Ext.getCmp('btnBackCarousel').events['tap'].isEvent) {
			Ext.getCmp('btnBackCarousel').events['tap'].clearListeners();
		}
		Ext.getCmp('btnBackCarousel').addListener('tap', function() {
					Ext.dispatch({
								controller : app.controllers.Run,
								action : 'gallery',
								run : run,
								id : run.getId(),
								animation : {
									type : 'slide',
									direction : 'right'
								}
							});
				});

		LogWrite('VIEWS "RunPhotosCarousel" [updateWithRecord]: avvio il carousel dalla foto selezionata, index='
				+ index);
		this.carousel.updateWithRecord(imgs, index);
	}
});

app.views.RunPhotosGallery = Ext.extend(Ext.Panel, {
	initComponent : function() {
		Ext.apply(this, {
					id : 'runPhotosGallery',
					layout : 'fit'
				});

		this.on('deactivate', function(c) {
					LogWrite('VIEWS "RunPhotosGallery" [deactivate]: distruggo vista');
					if (app.views.runPhotosGallery)
						app.views.viewport.remove(app.views.runPhotosGallery,
								true);
					c.destroy();
					app.views.runPhotosGallery = null;
				});

		LogWrite('VIEWS "RunPhotosGallery" [initComponent]: genero toolbar');
		this.backButton = new Ext.Button({
					text : 'indietro',
					ui : 'back',
					id : 'btnBack',
					scope : this
				});
		this.topToolbar = new Ext.Toolbar({
					dock : 'top',
					title : 'Foto Run',
					items : [this.backButton, {
								xtype : 'spacer'
							}]
				});
		this.dockedItems = [this.topToolbar];

		this.xtpl = new Ext.XTemplate(
				'<div id="gellery" style="padding:10px 5px 5px 5px;">',
				'<tpl for=".">',
				'<div class="node" style="background:url(\'{mini}\') no-repeat;">',
				'</div>', '</tpl>', '</div>');

		this.dataView = new Ext.DataView({
			store : app.stores.RunPhotosGallery,
			tpl : this.xtpl,
			multiSelect : false,
			autoHeight : true,
			emptyText : 'Nessuna foto di questa Run',
			loadingText : 'Attendere...',
			itemSelector : 'div.node',
			listeners : {
				itemtap : function(list, index, item, e) {
					var imgdata = app.views.runPhotosGallery.dataView.store.data.items;
					LogWrite('VIEWS "RunPhotosGallery" [itemtap]: richiamo controller per il carousel');
					// this.viewCarousel(list, index, imgdata, record);
					Ext.dispatch({
								controller : app.controllers.Run,
								action : 'viewcarousel',
								list : list,
								index : index,
								imgdata : imgdata,
								record : item,
								run : this.recordRun,
								animation : {
									type : 'slide',
									direction : 'left'
								}
							});
				},
				itemswipe : function(list, index, item, e) {
					var imgdata = app.views.runPhotosGallery.dataView.store.data.items;
					LogWrite('VIEWS "RunPhotosGallery" [itemswipe]: aggiorno vista gallery');
					app.views.runPhotosGallery
							.update('<div class="img_carousel" style="background:url(\''
											+ imgdata[index].data.medium
											+ '\') no-repeat;">'
											+ '<img src="'
											+ imgdata[index].data.medium
											+ '" />' + '</div>');
				},
				scope : this
			}
		});

		this.items = [this.dataView];

		LogWrite('VIEWS "RunPhotosGallery" [initComponent]: carico carousel nella vista');

		// app.views.RunPhotosGallery.superclass.initComponent.call(this);
		app.views.RunPhotosGallery.superclass.initComponent.apply(this,
				arguments);
	},

	updateWithRecord : function(recordRun) {
		LogWrite('VIEWS "RunPhotosGallery" [updateWithRecord]: update record');
		this.recordRun = recordRun;

		// BOTTONE INDIETRO
		Ext.getCmp('btnBack').show();
		if (Ext.getCmp('btnBack').events['tap'].isEvent) {
			Ext.getCmp('btnBack').events['tap'].clearListeners();
		}
		Ext.getCmp('btnBack').addListener('tap', function() {
					Ext.dispatch({
								controller : app.controllers.Run,
								action : 'show',
								run : recordRun,
								id : recordRun.getId(),
								animation : {
									type : 'slide',
									direction : 'right'
								}
							});
				});
	}
});

app.TabPanel = Ext.extend(Ext.TabPanel, {
	initComponent : function() {
		Ext.apply(this, {
			id : 'mainTabPanel',
			dock : "bottom",
			ui : "light",
			tabBar : {
				dock : 'bottom',
				layout : {
					pack : 'center'
				}
			},
			listeners : {},
			items : [{
						xtype : 'button',
						title : 'Home',
						iconCls : 'home',
						owner : this,
						listeners : {
							beforeactivate : function() {
								var dett = this.owner.getActiveItem();
								if (dett.title != 'Home') {
									if (!app.views.home)
										app.views.home = new app.views.Home();
									app.views.viewport.setActiveItem(
											app.views.home, {
												type : 'flip',
												direction : 'up'
											});
								}
							}
						}
					}, {
						xtype : 'button',
						id : 'news',
						title : 'News',
						iconCls : 'news',
						// badgeText: '4',
						listeners : {
							beforeactivate : function() {
								if (!app.views.newsList) {
									app.views.newsList = new app.views.NewsList();
								}
								app.views.viewport.setActiveItem(
										app.views.newsList, {
											type : 'flip',
											direction : 'down'
										});
							}
						}

					}, {
						xtype : 'button',
						id : 'run',
						title : 'Run',
						iconCls : 'run',
						listeners : {
							beforeactivate : function() {
								if (!app.views.runList) {
									app.views.runList = new app.views.RunList();
								}
								app.views.viewport.setActiveItem(
										app.views.runList, {
											type : 'flip',
											direction : 'down'
										});
							}
						}

					}, {
						xtype : 'button',
						id : 'video',
						title : 'Video',
						iconCls : 'video',
						listeners : {
							beforeactivate : function() {
								if (!app.views.videoList) {
									app.views.videoList = new app.views.VideoList();
								}
								app.views.viewport.setActiveItem(
										app.views.videoList, {
											type : 'flip',
											direction : 'down'
										});
							}
						}

					}, {
						xtype : 'button',
						title : 'Info',
						iconCls : 'info',
						owner : this,
						listeners : {
							beforeactivate : function() {
								if (!app.views.info)
									app.views.info = new app.views.Info();
								app.views.viewport.setActiveItem(
										app.views.info, {
											type : 'flip',
											direction : 'down'
										});
							}
						}
					}]
		});
		app.TabPanel.superclass.initComponent.apply(this, arguments);
	},
	checkAppConnection : function() {
		var net = app.checkConnection();
		if (net == "No network connection" || net == "Connection.UNKNOWN"
				|| net == null) {
			Ext.Msg.alert('Nessuna connession', 'Nessuna connessione attivata');
		}
	},
	checkBadgeNews : function() {
		var numBadge = 0;

		LogWrite('VIEWS "Viewport" [checkBadgeNews]: carico localstore delle news');
		app.stores.NewsOffline.load();
		var c = app.stores.NewsOffline.getCount();
		var id = 0;
		var n;
		if (c > 0) {
			LogWrite('VIEWS "Viewport" [checkBadgeNews]: il localstorage ha '
					+ c + ' news, controllo news non lette');
			app.stores.News.each(function(record) {
						id = record.data.id;
						n = app.stores.NewsOffline.getById(id);
						if (n === null) {
							numBadge += 1;
						}
					});
		} else {
			LogWrite('VIEWS "Viewport" [checkBadgeNews]: localstorage vuoto, lo riempio');
			var AllNews = new Ext.data.Store({
						model : "app.models.News",
						getGroupString : function(record) {
							return record.get('mese') + ' '
									+ record.get('anno');
						},
						proxy : {
							type : 'offlineajax',
							url : xml_news,
							reader : {
								type : 'xml',
								root : 'elenconews',
								record : 'news'
							}
						}
					});
			AllNews.each(function(record) {
						app.stores.NewsOffline.add(record);
						app.stores.NewsOffline.sync();
					});
		}
		LogWrite('VIEWS "Viewport" [checkBadgeNews]: trovate ' + numBadge
				+ ' nuove news');
		Ext.getCmp('news').tab.setBadge(numBadge);
	},
	checkBadgeVideo : function() {
		var numBadge = 0;

		LogWrite('VIEWS "Viewport" [checkBadgeVideo]: carico localstore dei video');
		app.stores.VideoOffline.load();
		var c = app.stores.VideoOffline.getCount();
		var id = 0;
		var n;
		if (c > 0) {
			LogWrite('VIEWS "Viewport" [checkBadgeVideo]: il localstorage ha '
					+ c + ' video, controllo video non visti');
			app.stores.Video.each(function(record) {
						id = record.data.id;
						n = app.stores.VideoOffline.getById(id);
						if (n === null) {
							numBadge += 1;
						}
					});
		} else {
			LogWrite('VIEWS "Viewport" [checkBadgeVideo]: localstorage vuoto, lo riempio');
			app.stores.Video.each(function(record) {
						app.stores.VideoOffline.add(record);
						app.stores.VideoOffline.sync();
					});
		}
		LogWrite('VIEWS "Viewport" [checkBadgeVideo]: trovati ' + numBadge
				+ ' nuovi video');
		Ext.getCmp('video').tab.setBadge(numBadge);
	},
	checkBadgeRun : function() {
		var numBadge = 0;

		LogWrite('VIEWS "Viewport" [checkBadgeRun]: carico localstore delle run');
		app.stores.RunOffline.load();
		var c = app.stores.RunOffline.getCount();
		var id = 0;
		var n;
		if (c > 0) {
			LogWrite('VIEWS "Viewport" [checkBadgeRun]: il localstorage ha '
					+ c + ' run, controllo run non viste');
			app.stores.Run.each(function(record) {
						id = record.data.id;
						n = app.stores.RunOffline.getById(id);
						if (n === null) {
							numBadge += 1;
						}
					});
		} else {
			LogWrite('VIEWS "Viewport" [checkBadgeRun]: localstorage vuoto, lo riempio');
			app.stores.Run.each(function(record) {
						app.stores.RunOffline.add(record);
						app.stores.RunOffline.sync();
					});
		}
		LogWrite('VIEWS "Viewport" [checkBadgeRun]: trovate ' + numBadge
				+ ' nuove run');
		Ext.getCmp('run').tab.setBadge(numBadge);
	}
});

app.views.Viewport = Ext.extend(Ext.Panel, {
	fullscreen : true,
	layout : 'card',
	cardSwitchAnimation : 'slide',
	initComponent : function() {
		LogWrite('VIEWS "Viewport" [initComponent]: Inizializzazione componenti');

		this.dockedItems = [new app.TabPanel];
		// BADGE
		// Ext.getCmp('news').tab.setBadge('4');

		// put instances of cards into app.views namespace
		Ext.apply(app.views, {
					home : new app.views.Home(),
					newsList : new app.views.NewsList(),
					newsDetail : new app.views.NewsDetail(),
					runList : new app.views.RunList(),
					runDetail : new app.views.RunDetail(),
					runPhotosGallery : new app.views.RunPhotosGallery(),
					runPhotosCarousel : new app.views.RunPhotosCarousel(),
					videoList : new app.views.VideoList(),
					info : new app.views.Info()
				});
		// put instances of cards into viewport
		Ext.apply(this, {
					items : [app.views.home]
				});
		LogWrite('VIEWS "Viewport" [initComponent]: creazione superclasse');
		app.views.Viewport.superclass.initComponent.apply(this, arguments);

		app.checkConnection();
	}
});

app.views.RunDetail = Ext.extend(Ext.Panel, {
	initComponent : function() {
		LogWrite('VIEWS "RunDetail" [initComponent]: inizializzazione componenti');

		Ext.apply(this, {
			dockedItems : [{
				itemId : 'toolbarRunDettaglio',
				xtype : 'toolbar',
				title : 'Run',
				items : [{
							text : 'indietro',
							ui : 'back',
							listeners : {
								'tap' : function() {
									Ext.dispatch({
												controller : app.controllers.Run,
												action : 'list',
												animation : {
													type : 'slide',
													direction : 'right'
												}
											});
								}
							}
						}, {
							xtype : 'spacer'
						}, {
							text : 'mappa',
							ui : 'orange',
							id : 'btnRunMappa'
						}, {
							text : 'foto',
							ui : 'orange',
							id : 'btnRunFoto'
						}]
			}],
			styleHtmlContent : true,
			scroll : 'vertical',
			items : [{
				tpl : ['<div class="dettaglio">', '<div class="dett_testata">',
						'<span class="dett_data">{data}, {luogo}</span><br />',
						'<span class="dett_titolo">{titolo}</span>', '</div>',
						'<img src="{medium}" />',
						'<div class="dett_testo">{testo}</div>',
						'<div class="clear"></div>', '</div>']
			}]
		});

		this.on('deactivate', function(c) {
					LogWrite('VIEWS "RunDetail" [deactivate]: distruggo vista');
					if (app.views.runDetail)
						app.views.viewport.remove(app.views.runDetail, true);
					c.destroy();
					app.views.runDetail = null;
				});

		app.views.RunDetail.superclass.initComponent.apply(this, arguments);
		LogWrite('VIEWS "RunDetail" [initComponent]: superclass creata');
	},
	updateWithRecord : function(record) {
		LogWrite('VIEWS "RunDetail" [updateWithRecord]: update record');
		Ext.each(this.items.items, function(item) {
					item.update(record.data);
				});

		// SETTO IL TITOLO
		// var toolbar = this.getDockedItems()[0];
		// toolbar.setTitle(record.get('data')+', '+record.get('luogo'));

		// BOTTONE MAPPA
		if (record.get('link_percorso') != '') {
			Ext.getCmp('btnRunMappa').show();
			if (Ext.getCmp('btnRunMappa').events['tap'].isEvent) {
				Ext.getCmp('btnRunMappa').events['tap'].clearListeners();
			}
			Ext.getCmp('btnRunMappa').addListener('tap', function() {
				window.plugins.childBrowser.openExternal(record
						.get('link_percorso'));
			});
		} else {
			Ext.getCmp('btnRunMappa').hide();
		}

		// BOTTONE INDIETRO
		if (record.get('foto') != '' && record.get('foto') > 0) {
			Ext.getCmp('btnRunFoto').show();
			if (Ext.getCmp('btnRunFoto').events['tap'].isEvent) {
				Ext.getCmp('btnRunFoto').events['tap'].clearListeners();
			}
			Ext.getCmp('btnRunFoto').addListener('tap', function() {
						Ext.dispatch({
									controller : app.controllers.Run,
									action : 'gallery',
									run : record,
									id : record.getId(),
									animation : {
										type : 'slide',
										direction : 'left'
									}
								});
					});
		} else {
			Ext.getCmp('btnRunFoto').hide();
		}

		LogWrite('VIEWS "RunDetail" [updateWithRecord]: aggiunti i bottoni ed il titolo alla toolbar');
	}
});

app.views.NewsDetail = Ext.extend(Ext.Panel, {
	initComponent : function() {
		LogWrite('VIEWS "NewsDetail" [initComponent]: inizializzazione componenti');

		Ext.apply(this, {
			dockedItems : [{
				itemId : 'toolbarNewsDettaglio',
				xtype : 'toolbar',
				title : 'News',
				items : [{
							text : 'indietro',
							ui : 'back',
							listeners : {
								'tap' : function() {
									Ext.dispatch({
												controller : app.controllers.News,
												action : 'list',
												animation : {
													type : 'slide',
													direction : 'right'
												}
											});
								}
							}
						}, {
							xtype : 'spacer'
						}, {
							text : 'sito',
							ui : 'orange',
							id : 'btnNewsSito'
						}]
			}],
			layout : 'fit',
			styleHtmlContent : true,
			scroll : 'vertical',
			items : [{
				tpl : ['<div class="dettaglio">', '<div class="dett_testata">',
						'<span class="dett_data">{data}</span><br />',
						'<span class="dett_titolo">{titolo}</span>', '</div>',
						'<img src="{immagine}" />',
						'<div class="dett_testo">{testo}</div>',
						'<div class="clear"></div>', '</div>']
			}]
		});

		this.on('deactivate', function(c) {
					LogWrite('VIEWS "NewsDetail" [deactivate]: distruggo vista');
					if (app.views.newsDetail)
						app.views.viewport.remove(app.views.newsDetail, true);
					c.destroy();
					app.views.newsDetail = null;
				});

		app.views.NewsDetail.superclass.initComponent.apply(this, arguments);
		LogWrite('VIEWS "NewsDetail" [initComponent]: superclass creata');
	},
	updateWithRecord : function(record) {
		LogWrite('VIEWS "NewsDetail" [updateWithRecord]: update record');
		Ext.each(this.items.items, function(item) {
					item.update(record.data);
				});

		// SETTO IL TITOLO
		// var toolbar = this.getDockedItems()[0];
		// toolbar.setTitle(record.get('data'));

		// BOTTONE DETTAGLIO
		if (record.get('url') != '') {
			Ext.getCmp('btnNewsSito').show();
			if (Ext.getCmp('btnNewsSito').events['tap'].isEvent) {
				Ext.getCmp('btnNewsSito').events['tap'].clearListeners();
			}
			Ext.getCmp('btnNewsSito').addListener('tap', function() {
						window.open(remote_host + record.get('url'));
					});
		} else {
			Ext.getCmp('btnNewsSito').hide();
		}

		LogWrite('VIEWS "NewsDetail" [updateWithRecord]: aggiunti i bottoni ed il titolo alla toolbar');
	}
});

app.views.Info = Ext.extend(Ext.Panel, {
	initComponent : function() {
		Ext.apply(this, {
			dockedItems : [{
						xtype : 'toolbar',
						title : 'Informazioni generali'
					}],
			html : [
					'<div class="center padding_content">',
					'<div class="info_content">',
					'<img src="' + app_icon + '" class="float_r" />',
					'<h1>' + app_name + '</h1>',
					'<div class="campo"><div class="label">versione:</div>'
							+ app_version + '</div>',
					'<div class="campo"><div class="label">creato da:</div>Daniele Montecchi<p align="right"><img src="'
							+ logo_bonsai + '" /></p></div>',
					'<div class="copy">&copy; Copyright 2011 by <b><i>RUN 5.30</i></b></div>',
					'<div class="clear"></div>', '</div>', '</div>'],
			layout : 'fit'
		});

		this.on('deactivate', function(c) {
					LogWrite('VIEWS "Info" [deactivate]: distruggo vista');
					if (app.views.info)
						app.views.viewport.remove(app.views.info, true);
					c.destroy();
					app.views.info = null;
				});

		LogWrite('VIEWS "Info" [initComponent]: caricamento superclass ed inizializzazione');
		app.views.Info.superclass.initComponent.call(this);
	}
});

