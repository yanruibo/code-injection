




































(function(removeClassRE) {

	jQuery.fn.removeClassRE = function( value ) {
				
		for ( var i = 0, l = this.length; i < l; i++ ) {
			var elem = this[i];

			if ( elem.nodeType === 1 && elem.className ) {
				var classNames = elem.className.split( /\s+/ );

				for ( var n = classNames.length; n--; ) {
					if ( value.test(classNames[n]) ) {
						classNames.splice(n, 1);
					}
				}
				elem.className = jQuery.trim( classNames.join(" ") );
			}
		}
		return this;		
	}

})(jQuery.fn.removeClassRE);


/**
 * Phonegap/Cordova File Upload plugin
 * Multiplatform iOS/Android version
 * Copyright (c) Matt Kane 2011
 * Additional Android/iOS multiplatform stuff by Michal Zelinka 2012
 *
 */
var FileUploader = function() { 

}


/**
 * Given a file:// or content:// url, uploads the file to the server as a multipart/mime request
 *
 * @param server URL of the server that will receive the file
 * @param file file:// or content:// uri of the file to upload
 * @param params Object with key: value params to send to the server
 * @param fileKey Parameter name of the file
 * @param fileName Filename to send to the server. Defaults to image.jpg
 * @param mimeType Mimetype of the uploaded file. Defaults to image/jpeg
 * @param callback Success callback. Passed the response data from the server as a string. Also receives progress messages during upload.
 * @param fail Error callback. Passed the error message.
 */
FileUploader.prototype.uploadByUri = function(server, file, params, fileKey, fileName, mimeType, callback, fail) {
	this._doUpload('uploadByUri', server, file, params, fileKey, fileName, mimeType, callback, fail);
};

/**
 * Given absolute path, uploads the file to the server as a multipart/mime request
 *
 * @param server URL of the server that will receive the file
 * @param file Absolute path of the file to upload
 * @param params Object with key: value params to send to the server
 * @param fileKey Parameter name of the file
 * @param fileName Filename to send to the server. Defaults to image.jpg
 * @param mimeType Mimetype of the uploaded file. Defaults to image/jpeg
 * @param callback Success callback. Passed the response data from the server as a string. Also receives progress messages during upload.
 * @param fail Error callback. Passed the error message.
 */
FileUploader.prototype.upload = function(server, file, params, fileKey, fileName, mimeType, callback, fail) {
	this._doUpload('upload', server, file, params, fileKey, fileName, mimeType, callback, fail);
};

FileUploader.prototype._doUpload = function(method, server, file, params, fileKey, fileName, mimeType, callback, fail) {
	if (!params) params = {};
	return cordova.exec(callback, fail, 'FileUploader', method, [server, file, params, fileKey, fileName, mimeType]);
}

FileUploader.Status = {
	PROGRESS: "PROGRESS",
	COMPLETE: "COMPLETE"
}

cordova.addConstructor(function()  {
	//////
	if(!window.plugins) {
		window.plugins = {};
	}
	window.plugins.fileUploader = new FileUploader();
	////// OR:
	//// / cordova.addPlugin('fileUploader', new FileUploader());
	////// ?
});



var Settings = {
	buildVersion : 1,
	serverUrl : 'http://www.ceff.info/api/index.php',
	dataServerUrl : 'http://ceff.tk',
	ajaxTimeout : 10000, // in milliseconds
	fileSystem : null,
	documentPath : null
};

var app = {

	__page : null,     // Page identifier
	__pageParameters : null, // Page parameters
	documentsPath : null,

	// Page options
	page   : function () { return this.__page; },
	pageParameters : function () { return this.__pageParameters; },
	setPageID : function (page) {
		this.__page = page;
		$('body').removeClassRE(/^page/);
		$('body').addClass('page-'+page);
	},
	setPageParameters : function(parms) {
		this.__pageParameters = parms;
	},
	openPage : function (id, parameters, opts) {

		opts = (opts || { });

		if (opts.needsUpAndRunning && !app.account.loggedIn()) {
			app.dialog.compose({
				controls:[{type:'para',value:'Tato funkce vyžaduje přihlášení'}],
				buttons:[{text:'Nastavení',fnc:function(){
					setTimeout(function(){app.openPage('settings');}, 500);
				}},{text:'Zavřít'}]});
			return;
		}

		// Process parameters if required
		if (typeof(this.paramsProcessor[id]) == "function") {
			parameters = this.paramsProcessor[id](parameters);
			if (parameters) parameters.processed = true; }

		this.template.load(id, parameters, function (id, parameters) {

			// Update cache of the current page before opening new one
			app.history.updateCache();

			// Set page ID and log state in history, but prevent
			// multiple pages of same type in a row by updating
			// except when we need full addition explicitely
			if (id == app.page() && !['foods--groups'].contains(id))
				app.history.update({parameters: parameters});
			else {
				app.setPageID(id); app.setPageParameters(parameters);
				app.history.add({id:id, parameters:parameters});
			}

			// Toggle display of search field, title bar etc.
			app.pageElements.toggle(id);

			// Scroll to top for new page
			window.scrollTo(0,0);

			// Request for further content if needed...
			if (app.contentRequest[id]) {
				// ...show loading message...
				app.setContentMessage('loading');
				// ..and get it...
				app.contentRequest[id](parameters);
			}
			// ...otherwise fill in content element with template
			else
				$('#content').html(app.template.get(id).render(parameters));

			// Build some content according to page stage
			app.builder[id](parameters);

			// Refit content element to current screen coords
			app.refit();

			// Try to cache current page
			app.history.cachePage();

			if (typeof opts.onloaded == 'function')
				opts.onloaded();

		});

	},

	updatePage : function (template, parameters) {

		// Prevent overwriting of current page by late response
		// after hang inet connection or something similar...
		if (template.indexOf(this.__page) != 0)
			return;

		// Process parameters if required
		if (typeof(this.paramsProcessor[template]) == "function")
			parameters = this.paramsProcessor[template](parameters);

		this.template.load(template, parameters, function (template, parameters) {

			// Update parameters
			app.setPageParameters(parameters);

			// Fill in content element with template
			$('#content').html(app.template.get(template).render(parameters));

			if (typeof(app.builder[template]) == 'function')
				app.builder[template](parameters);

			// Refit content element to current screen coords
			app.refit();

			// Try to cache current page
			app.history.cachePage();
		});

	},

	// Opening of external links in ChildBrowser plugin activity
	openChild : function (url) {
		var cb = window.plugins.childBrowser;
		if(cb != null) {
			cb.onLocationChange = function(loc){};
			cb.onClose = function(){};
			cb.onOpenExternal = function(){};
			cb.showWebPage(url);
		}
	},

	refreshPage : function () {
		this.openPage(this.history.currentState().id, this.history.currentState().parameters); },

	reportBug : function () {
		var limit = 20;
		var bug = $('textarea')[0].value;
		if (!bug || bug.length < limit) {
			Alert('Popis je příliš krátký, použijte prosím alespoň '+limit+' znaků');
			return;
		}
		this.connection.post('nahlasit_chybu',{text:bug},function (){
			Alert('Váš podnět byl přijat, děkujeme!',null,null,
				function(){ setTimeout(function(){history.back();},500); });
		});
	},

	updateDatabase : function () {
		var db = app.database.__db;
		$.get(Settings.dataServerUrl + '/database.json', function (data) {
			app.dialog.compose({heading:"Aktualizace databáze…",controls:[{type:'progress'}]});
			$.each(data, function(i,v) { db[i] = v; });

			///// Modify some data, download according files (images), …

			$.each(db.news, function(i,n) { n.date = isoDateToStr(n.date); });
			$.each(db.foods, function(i,f) {
				var lang = app.settings.get('lang');
				var category = app.database.get('$.food_groups[?(@.id == '+ f.group +')]')[0];
				var subcategory = app.database.get('$.food_groups[?(true)].subgroups[?(@.id == '+ f.subgroup +')]')[0];
				f.certification_date = isoDateToStr(f.certification_date);
				f.search_term = (f.name[0] +' '+ f.name[1] +' '+ f.name[2]).toLowerCase(); // TODO: Add cathegories name
				if (f.basename) f.search_term += (' '+ f.basename[0] +' '+ f.basename[1] +' '+ f.basename[2]).toLowerCase();
//				if (category) f.search_term += ' '+ category.name[lang].toLowerCase();
				if (subcategory) f.search_term += ' '+ subcategory.name[lang].toLowerCase();
			});
			$.each(db.chemicals, function(i,ch) {
				ch.search_term = (ch.code +' E'+ ch.ordinal +' '+' E '+ ch.ordinal +' '+ ch.name[0] +' '+ ch.name[1] +' '+ ch.name[2] +' '+ ch.basename[0] +' '+ ch.basename[1] +' '+ ch.basename[2]).toLowerCase();
			});
			// Sort
			var id_sort = function (a,b) { return a.id - b.id };
			db.food_groups = db.food_groups.sort(id_sort);
			db.foods = db.foods.sort(id_sort);
			db.chemicals = db.chemicals.sort(id_sort);
			db.producers = db.producers.sort(id_sort);
			db.sellers = db.sellers.sort(id_sort);
			db.news = db.news.sort(function(a,b){return b.id - a.id});

			app.database.save();

			// Load images, download when necessary
			var progress_update = function() { app.dialog.update({type:'progress',increment:true}); };
			var items_count = 2*db.foods.length + db.sellers.length + db.food_groups.length + db.lists_categories.length;
			app.dialog.update({type:'progress',max:(items_count)});
			try {
				Log('Updating foods...');
				$.each(db.foods, function(i,f) {
					if (!f.img) { progress_update(); progress_update(); return true; }
					app.images.download('food-'+ f.id +'-s', f.img, f, progress_update);
					app.images.download('food-'+ f.id +'-l', f.img.replace('/male/','/velke/'), f, progress_update);
				});
				Log('Updating sellers...');
				$.each(db.sellers, function(i,s) {
					if (!s.img) { progress.update(); return true; }
					app.images.download('seller-'+s.id, s.img, s, progress_update);
				});
				Log('Updating food groups...');
				$.each(db.food_groups, function (i,g) {
					if (!g.img) { progress_update(); return true; }
					app.images.download('foodgroup-'+g.id, g.img, g, progress_update);
				});
				Log('Updating lists categories...');
				$.each(db.lists_categories, function (i,c) {
					if (!c.img) { progress_update(); return true; }
					app.images.download('listscategory-'+c.id, c.img, c, progress_update);
				});
			}
			catch(err) {
				Log('Error: '+ err.message);
				app.dialog.close();
			}

		},'json');
	},

	checkForUpdates : function (opts) {
		var db = app.database.__db; opts = (opts || {all:true});

		if ((opts.all || opts.app_data) && app.connection.available()) {
			var ts = (app.database.get('update_timestamp') || 0);
			if (ts < parseInt(unix_timestamp()/86400)*86400) {
				app.dialog.compose({heading:"Kontrola aktualizace…",controls:[]});
				$.get(Settings.dataServerUrl + '/timestamp', function (server_ts) {
					var database_ts = app.database.get('database_timestamp');
					if (server_ts != database_ts) {
						app.updateDatabase();
						app.database.databaseTimestampUpdate(parseInt(server_ts));
					}
					else history.back();
				},'html').fail(function() {
					history.back();
				});
				app.database.set('update_timestamp',unix_timestamp());
			}
		}
		if ((opts.all || opts.app_data) && app.database.get('update_timestamp') == 0)
			Alert('Databáze dosud nebyla aktualizována, některý obsah (např. obrázky) se tedy nemusí zobrazit. Před příštím spuštěním aplikace připojte zařízení k internetu.');

		if ((opts.all || opts.lists) && app.account.loggedIn()) {
			var count = db.lists.cardinality();
			Log('Checking Lists (got '+(count-1)+' on device)...');
			app.connection.post('lists',
			{count: count, timestamp: db.lists_timestamp},
			function(resp){
				if ($.isNumeric(resp)) return;
				Log('Lists TS: '+db.lists_timestamp+', server TS: '+resp.unixtime);
				if (resp.unixtime != db.lists_timestamp) {
					Log('Lists not synchronized, updating!');
					db.lists_timestamp = resp.unixtime;
					var server_lists = [ ], lists = app.database.get('lists');
					$.each(resp.lists, function(i,l){
						server_lists.push(l.id);
						var list = app.lists.find(l.id);
						if (list) {
							if (list.unixtime < l.unixtime) {
								list.name = l.name;
								list.unixtime = l.unixtime;
								Log('List '+lists[l.id].name+' has been updated from server');
							}
							else if (list.unixtime > l.unixtime) {
								app.connection.post('edit_list',
									{id:list.id,name:list.name});
									Log('List '+list.name+' has been updated on server');
							}
						}
						else {
							lists[l.id] = l;
							l.items = { };
							Log('List '+lists[l.id].name+' has been added from server');
						}
					});
					$.each(db.lists, function(i,l){
						if (l.id < 0) {
							app.connection.post('add_list',
							{name:l.name},function(r){
								if ($.isNumeric(r)) return;
								l.id = parseInt(r.id);
								lists[l.id] = l; delete lists[i];
								Log('List '+l.name+' has been added to server');
							});
							return true;
						}
						if (l.id > 0 && !server_lists.contains(l.id) && !l.readonly) {
							Log('Deleting list '+l.name);
							delete db.lists[l.id]; return true; }
					});

					Log('Lists sync finished');
					app.database.touch();
					if (app.page() == 'lists') app.lists.loadDialog();
				}
			});
		}

		if ((opts.list_items && $.isNumeric(opts.list_id)) && app.account.loggedIn()) {
			if (opts.list_id < 0) return;
			var list = app.lists.find(opts.list_id);
			var count = list.items.cardinality();
			app.connection.post('list_items',
			{list_id:list.id,count:count,unixtime:list.unixtime},function(r){
				if ($.isNumeric(r)) return;
				if (r.items && (list.unixtime != r.unixtime ||
					count != r.items.cardinality()))
				{
					Log('List items of '+ list.name +' not synchronized, updating!');
					if (r.unixtime > list.unixtime)
						db.lists_timestamp = list.unixtime = r.unixtime;
					if (list.readonly) list.name = r.name;
					var server_items = [ ], items = list.items;
					var p = { }, d = { }, a = { }; // for item updates
					if (r.items) $.each(r.items, function(ind,i) {
						r.id = parseInt(r.id);
						i.id = parseInt(i.item_id); delete i.item_id;
						server_items.push(i.id);
						var item = list.items[i.id];
						if (item) {
							if (item.unixtime < i.unixtime) {
								item.unixtime = i.unixtime;
								item.desc = i.desc; item.price = i.price;
								item.amount = i.amount; item.bought = i.bought > 0;
								Log('Item '+ (item.zp_name || item.desc) +' has been updated from server');
							}
							else if (item.unixtime > i.unixtime) {
								p[i.id] = item.price; d[i.id] = item.desc; a[i.id] = item.amount;
								app.connection.post('bought_list_item',
									{list_id:opts.list_id,item_id:i.id,bought:(item.bought)?1:0});
								Log('Item '+(item.zp_name||item.desc)+' has been updated on server');
							}
						} else {
							items[i.id] = i;
							i.bought = i.bought > 0;
							i.price = parseInt(i.unitprice); delete i.unitprice;
							i.amount = parseInt(i.amount);
							Log('Item '+(items[i.id].zp_name || items[i.id].desc)+' has been added from server');
						}

					});
					$.each(items, function(d,i){
						if (i.id < 0) {
							app.connection.post('add_list_item',
							{list_id:opts.list_id,amount:i.amount,unit:'ks',unitprice:i.price,
							desc:i.desc},function(r){
								if ($.isNumeric(r)) return;
								i.id = parseInt(r.item_id);
								items[i.id] = i; delete items[d];
								Log('Item '+ i.desc +' has been added to server');
							});
							return true;
						}
						if (i.id > 0 && !server_items.contains(i.id)) {
							Log('Deleting item '+(i.zp_name || i.desc));
							delete items[i.id]; return true; }
					});
					if (p.cardinality() > 0)
						app.connection.post('edit_list_item',
						    {list_id:opts.list_id,price:p,desc:d,amount:a});
					Log('Items sync finished');
					app.database.touch();
					if (app.page() == 'lists') app.lists.loadList();
				}
			});
		}

	},

	// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
	// Template processing & caching
	// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

	template : {

		cache : { },

		load : function (name, parameters, func) {

			var filename = name.replace('--ready','');
			if(!this.cache[filename]) {
				$.get('tpl/'+filename+'.html', null, function(resp, status) {
					var html = Hogan.compile(''+resp);
					app.template.set(filename, html);
					func(name, parameters);
				}, 'html');
			}
			else func(name, parameters);
		},

		get : function(name) {
			return this.cache[name.replace('--ready','')];
		},

		set : function(name, content) {
			this.cache[name] = content;
		}

	},

	// ~~~~~~~~~~~~~~
	// Screen options
	// ~~~~~~~~~~~~~~

	screen : {
		orientation : function () { return (this.ratio() > 1.3) ? 'landscape' : 'portrait'; },
		width       : function () { return window.innerWidth; },
		height      : function () { return window.innerHeight; },
		ratio       : function () { return this.width()/this.height(); },
		imageSize   : function () {
			var size = (app.settings.get('picture_loading') == 'lowres') ? 1 : 3;
			if (Math.max(this.width(), this.height()) >= 800) size += 2;
			return size;
		}
	},

	setHeader : function (title) {
		$('h1').html(title);
	},

	setContentMessage : function(type) {
		var message, img;
		switch (type) {
			case 'loading':
				message = 'Načítání dat…';
				img = 'loading';
				break;
			case 'loading_error':
				message = 'Data se nepodařilo načíst';
				img = 'noconnection';
				break;
			case 'no_connection':
				message = 'Připojení není k&nbsp;dispozici';
				img = 'noconnection';
				break;
			case 'error':
				message = 'V&nbsp;aplikaci došlo k&nbsp;chybě';
				img = 'error';
				break;
			case 'not_implemented':
				message = 'Tato část ještě není dokončena';
				img = 'error';
				break;
		}
		$('#content').html('<div id="contentMessage"><img src="img/infoimage-'+ img +
			'.png"><div>'+ message +'</div></div>');
	},

	// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
	// Parameters processing for pages which require some data
	// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

	paramsProcessor : {

		'chemicals--detail' : function (chemical_id) {
			var resp = clone(app.database.chemicalsGet("[?(@.id == "+chemical_id+")]")[0]);
			resp.groups = clone(app.database.chemicalInGroupsGet(chemical_id));
			$.each(resp.groups, function(i,g){ g.name = g.name[app.settings.get('lang')]; });
			resp.name = resp.name[app.settings.get('lang')];
			resp.desc = resp.desc[app.settings.get('lang')];
			return resp;
		},

		'foods--groups' : function (parms) {
			if (parms.type == 'categories') {
//				// TODO: Subgroups if possible
//				if (typeof parms.cathegory == 'number') {
//					resp.groupName = app.database.get("$.foods_groups[?(@.id == "+cathegory+")].name")[0];
//					var def = [ {id: cathegory, name: "Vše"} ];
//					resp.subgroups = def.concat(app.database.get("$.foods_groups[?(@.id == "+cathegory+")].subgroups")[0]);
//				}
//				else
//					resp.groups = app.database.get("$.foods_groups")[0];
//				//
				parms.categories = true;
				parms.groups = clone(app.database.get("$.food_groups")[0]);
				$.each(parms.groups, function(i,v) {v.name = v.name[app.settings.get('lang')]; });
			}
			else if (parms.type == 'sellers') {
				parms.sellers = true;
				parms.groups = clone(app.database.get("$.sellers")[0]);
			}
			return parms;
		},

		'foods--subgroups' : function (resp) {
			resp.group = app.database.get("$.food_groups[?(@.id == "+ resp.group_id +")]")[0].name[app.settings.get('lang')];
//			resp.foods = clone(app.database.get('$.foods[?(@.group == '+ resp.id +')]'));
			resp.subgroups = clone(app.database.get("$.food_groups[?(@.id == "+ resp.group_id +")].subgroups")[0]);
			$.each(resp.subgroups, function(i,v) {Log(v); v.name = v.name[app.settings.get('lang')]; });
			return resp;
		},

		'foods--list' : function (resp) {
			if (resp.type == 'categories') {
				resp.group = app.database.get("$.food_groups[?(@.id == "+ resp.id +")]")[0].name[app.settings.get('lang')];
				resp.foods = clone(app.database.get('$.foods[?(@.group == '+ resp.id +')]'));
			}
			else if (resp.type == 'subgroups') {
				resp.group = app.database.get("$.food_groups[?(true)].subgroups[?(@.id == "+ resp.id +")]")[0].name[app.settings.get('lang')];
				resp.foods = clone(app.database.get('$.foods[?(@.subgroup == '+ resp.id +')]'));
			}
			else if (resp.type == 'sellers') {
				resp.group = app.database.get("$.sellers[?(@.id == "+ resp.id +")]")[0].name;
				resp.foods = clone(app.database.get('$.foods[?(@.sellers.indexOf('+ resp.id +') != -1)]'));
			}
			if (!resp.foods) resp.foods = [ ];
			resp.foods = resp.foods.filter(function(f){ return f.lang == app.settings.get('lang'); });
			$.each(resp.foods, function(i,f) {
				f.name = f.name[app.settings.get('lang')];
				if (app.settings.get('picture_loading') == 'deny') delete f.img;
			});
			resp.foods = resp.foods.sort(function(a,b){ return a.name > b.name });
			return resp;
		},

		'new-products' : function () {
			var foods = clone(app.database.newProductsGet());
			$.each(foods, function(i,f) {
				f.name = f.name[f.lang];
				f.desc = f.desc[f.lang];
			});
			return {foods: foods};
		},

		'foods--search' : function () {
			return {properties: food_logos.concat(food_properties)};
		},

		'foods--scan-result' : function (ean) {
			ean = ''+ean;
			var parms = {ean: ean, ean_letters: []};
			$.each(ean, function(i,l) {
				parms.ean_letters.push(l); });
			return parms;
		},

		'chemicals--groups' : function () {
			var groups = clone(app.database.chemicalGroupsGet());
			$.each(groups, function (i,ch) { ch.name = ch.name[app.settings.get('lang')]; });
			return { groups: groups };
		},

		'chemicals--list' : function (options) {
			var ret = { text: null, options: options };

			if (options == undefined) {
				// Return all chemicals
				ret.list = clone(app.database.chemicalsGet()[0]);
				ret.options = { all: true };
			}
			else if (options.group != undefined) {
				// Return only chemicals in group
				var group = clone(app.database.chemicalGroupsGet("[?(@.id == "+options.group+")]"));
				ret.options.groupName = group.name[app.settings.get('lang')].capitalize();
				if (group.html && group.html.length) ret.text = group.html.split('<br>');
				var ids = app.database.chemicalsOfGroup(options.group);
				ret.list = clone(app.database.chemicalsGet("[?( ["+ids.toString()+"].contains(@.id) )]"));
			}
			else if (options.search != undefined) {
				ret.list = options.list;
			}
			else if (options.unapproved == true) {
				ret.list = clone(app.database.chemicalsGet("[?(@.ceff != true)]"));
			}
			else throw "Unknown list request";

			$.each(ret.list, function (index, value) { value.name = value.name[app.settings.get('lang')]; });

			return ret;
		},

		'foods--detail' : function (id) {
			var food = clone(app.database.foodGet(id));
			food.name = food.name[app.settings.get('lang')];
			food.desc = food.desc[app.settings.get('lang')];
			if (food.price) food.price = priceToPriceStr(food.price);
			if (app.settings.get('picture_loading') == 'deny')
				delete food.img;
			else {
				food.thumb = food.img;
				food.img = food.img.replace('male','velke');
			}
			food.sellers = app.database.sellersGet(food.sellers);
			food.producer = app.database.get('$.producers[?(@.id == '+ food.producer +')]')[0];
			return food;
		},

		'news' : function () {
			var news = app.database.get('news');
			return {news: news};
		},

		'contest' : function () {
			var contest = app.database.get('$.contests[?(@.lang == '+ app.settings.get('lang') +')]')[0];
			if (contest.show_always) return {contest: contest};
			if (contest.from_to) {
				var from = isoDateToTimestamp(contest.from);
				var to = isoDateToTimestamp(contest.to) + 86399;
				var now = unix_timestamp();
				if (now < from || now > to) return { };
			}
			return {contest: contest};
		}

	},

	// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
	// Layout builder for each page
	// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

	builder : {

		'main-page' : function () {
			app.setHeader('CEFF');
			id('search-field').placeholder = "Hledání éček";
		},

		'news' : function () {
			app.setHeader('Novinky');
		},

		'foods' : function () {
			app.setHeader('Nakupování');
			id('search-field').placeholder = "Hledání potravin";
		},

		'foods--groups' : function (params) {
			if (params.type == 'categories') app.setHeader('Kategorie potravin');
			else if (params.type == 'sellers') app.setHeader('Prodejci potravin');
			else app.setHeader(params.groupName);
		},

		'foods--subgroups' : function (params) {
			app.setHeader(params.group);
		},

		'foods--detail' : function (parms) {
			app.setHeader('Detail potraviny');
			$.each($('am'), function(i,v){ v.innerHTML = v.innerHTML.replace('.',','); });
		},

		'foods--search' : function () {
			app.setHeader('Rozšířené hledání');
		},

		'foods--add' : function (parms) {
			app.setHeader('Přidat potravinu');
			if (parms.ean) $('#ean').attr('value',parms.ean);
		},

		'foods--filters' : function () {
			app.setHeader('Filtry potravin');
		},

		'foods--scan-result' : function () {
			app.setHeader('Skenování kódu');
		},

		'foods--list' : function (param) {
			if (param && param.group) app.setHeader(param.group);
			else app.setHeader('Seznam');
		},

		'chemicals' : function () {
			app.setHeader('Éčka');
			id('search-field').placeholder = "Hledání éček";
		},

		'new-products' : function () {
			app.setHeader('Nové výrobky');
			app.foods.showNew({first:true});
		},

		'chemicals--list' : function (param) {
			app.chemicals.fill();
			if (param.options.group) app.setHeader(param.options.groupName);
			else if (param.options.search) app.setHeader('Hledání éček');
			else app.setHeader('Seznam éček');
		},

		'chemicals--detail' : function (ch) {
			app.setHeader(ch.code);
		},

		'chemicals--groups' : function () {
			app.setHeader('Skupiny Éček');
		},

		'chemicals--scale' : function () {
			app.setHeader('Stupnice škodlivosti');
		},

		'lists' : function () {
			app.setHeader('Seznamy');
			app.checkForUpdates({lists:true});
			app.lists.loadDialog();
		},

		'search' : function () {
			if (['chemicals'].contains(app.search.__lastSearchInitiator))
				app.setHeader('Hledání Éček');
			else if (['foods','foods--search'].contains(app.search.__lastSearchInitiator))
				app.setHeader('Hledání potravin');
			else app.setHeader('Hledání');
		},

		'more' : function () {
			app.setHeader('Další volby');
		},

		'copyright' : function () {
			app.setHeader('Autorská práva');
		},

		'test' : function () {
			app.setHeader('Test');
		},

		'settings' : function () {
			app.setHeader('Nastavení');
			id('username').value = app.settings.get('username');
			id('logged_username').value = app.settings.get('username');
			id('password').value = app.settings.get('password');
			id('font_zoom').value = app.settings.get('font_zoom');
			id('allow_connection').value = app.settings.get('allow_connection');
			id('photo_quality').value = app.settings.get('photo_quality');
			id('picture_loading').value = app.settings.get('picture_loading');
//			id('lang').value = app.settings.get('lang');
		},

		'project' : function () {
			app.setHeader('O iniciativě CEFF');
		},

		'about' : function () {
			app.setHeader('O aplikaci');
		},

		'contest' : function () {
			app.setHeader('Soutěž');
		},

		'vrbova' : function () {
			app.setHeader('Tereza Vrbová');
		},

		'default' : function () {
			app.setHeader('Chyba');
			app.setContentMessage('not_implemented');
		}

	},

	// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
	// Content request for AJAX data loading
	// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

	contentRequest : {

//		'discussions--thread' : function(params) {
//			app.connection.post('forum', {forum_id: params, thumb_size: app.screen.imageSize()},
//			function (resp) { app.updatePage('discussions--thread--ready', resp); }, true);
//		}

	},

	// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
	// Content refitting for specific pages
	// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

	refit : function () {
		if (this.__page == null)
			return;

		// Fix for Android pop up keyboard -- TODO: test if still required
		$('body').toggleClass('realLandscape', this.screen.orientation() == 'landscape');
		app.forms.gallery.recalculate();

	},

	// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
	// Application database and storage
	// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

	database : {

		__db : null,
		__dbFileEntry : null,

		__databasesCount : 2, // offline file + general file

		initialize : function () {

			this.checkDBStructure();

			// Initialize chemicals DB

			$.get('db/offline_data.json', function (offline_data) {
				if (offline_data != null) { // TODO: typeof, another check?
					$.each(offline_data, function (index, value){
						if (app.database.__db[index] === undefined)
							app.database.__db[index] = value;
					});
					Log("Offline DB loaded.");
					app.preload.invoke();
				}
				else
					throw "Offline DB load failed!";
			},'json');

			// Initialize general DB

			if (typeof(window.requestFileSystem) != 'function') {
				Log("This platform doesn't support File writing, General DB won't be saved.");
				//////// BROWSER-SAVING
//				var data = app.settings.get('database_json');
//				if (data && data.length) {
//					data = JSON.parse(data);
//					$.each(data, function (index, value){
//						app.database.__db[index] = value;});
//				}
				////////
				app.preload.invoke();
			}
			else {
				var fsType = (app.device.isIOS()) ? LocalFileSystem.PERSISTENT : LocalFileSystem.TEMPORARY;
				window.requestFileSystem(fsType, 0, function (fileSystem) {
					Log('Filesystem loaded');
					Settings.fileSystem = fileSystem;
					Settings.documentPath = fileSystem.root.fullPath;
					fileSystem.root.getFile("database.json", {create: true, exclusive: false}, function (fileEntry) {
						Log('File entry loaded');
						app.database.__dbFileEntry = fileEntry;
						fileEntry.file(function (file) {
							Log('File object loaded');
							var reader = new FileReader();
							reader.onloadend = function (evt) {
								var data = $.parseJSON(evt.target.result);
								if (data != null)
									$.each(data, function (index, value){
										app.database.__db[index] = value;});
								Log("General DB loaded.");
								app.preload.invoke();
							};
							Log('Reading file…');
							reader.readAsText(file);
						}, null);
					}, null);
				}, null);
			}
		},

		checkDBStructure : function () {
			if (!this.__db) this.__db = { };
			var db = this.__db;
			// Insert all default tables we need
			if (!db.lists) db.lists = {};
			if (!db.lists_timestamp) db.lists_timestamp = 0;
		},

		get : function (query) {
			if (query.indexOf('$.') == 0) return jsonPath(this.__db, query);
			else return this.__db[query];
		},

		set : function (key, value) {
			this.__db[key] = value;
		},

		chemicalsGet : function (query) {
			return jsonPath(this.__db, "$.chemicals"+((query != null)?query:''));
		},

		foodsGet : function (query) {
			return jsonPath(this.__db, "$.foods"+((query != null)?query:''));
		},

		foodGet : function (id) {
			return jsonPath(this.__db, "$.foods[?(@.id == "+id+")]")[0];
		},

		sellersGet : function(ar) {
			return jsonPath(this.__db, "$.sellers[?(["+ar.toString()+"].contains(@.id))]");
		},

		chemicalGroupsGet : function (query) {
			return jsonPath(this.__db, "$.chemical_groups"+((query != null)?query:''))[0];
		},

		databaseTimestampUpdate : function (val) {
			this.__db['database_timestamp'] = val;
		},

		newProductsGet : function () {
			var ret = [ ];
			var foods = app.database.get('foods');
			for (var i = 1; i <= 5; i++)
				ret.push(clone(foods[foods.length-i]));
			$.each(ret, function(i,f) { f.img = f.img.replace('/male/','/velke/'); });
			return ret;
		},

		chemicalCodeGetId : function (code) {
			return jsonPath(this.__db, "$.chemicals[?(@.cd == '"+code+"')].id")[0];
		},

		chemicalsOfGroup : function (id) {
			return jsonPath(this.__db, "$.chemicals[?(@.groups.indexOf("+id+") != -1)].id");
		},

		chemicalInGroupsGet : function (id) {
			var group_ids = jsonPath(this.__db, "$.chemicals[?(@.id == "+ id +")].groups")[0];
			return jsonPath(this.__db, "$.chemical_groups[?(["+group_ids.toString()+"].indexOf(@.id) != -1)]");
		},

		__touched : false,
		__saveCounter : 0,
		touch : function () {
			this.__touched = true;
		},

		save : function () {
			if (this.__dbFileEntry == null) return; ///// ! BROWSER-SAVING
			if (!this.__touched && this.__saveCounter++ % 12 != 11) return;
			this.__touched = false; this.__saveCounter %= 12;
			///// BROWSER-SAVING
//			if (this.__dbFileEntry == null) {
//				var db_to_save = {};
//				app.settings.set('database_json',JSON.stringify(app.database.__db));
//			}
//			else
			/////
			this.__dbFileEntry.createWriter(function (writer) {
				writer.onwriteend = function (evt) { Log('General DB saved'); };
				var db_to_save = {};
				writer.write(JSON.stringify(app.database.__db));
			}, null);
		}

	},

	storage : {

		get : function (key) {
			return window.localStorage.getItem(key);
		},

		set : function (key, value) {
			window.localStorage.setItem(key, value);
		},

		remove : function (key) {
			window.localStorage.removeItem(key);
		}

	},

	// ~~~~~~~~~~~~~~~~~~~
	// Settings processing
	// ~~~~~~~~~~~~~~~~~~~

	// Note: Settings are stored in storage module. This interface only
	//       wraps correct values according to setting name (element ID)
	//       back and forth.

	settings : {

		__defaults : {
			"lang" : 0, // 0 - czech, 1 - slovak, 2 - english
			"username" : null,
			"password" : null,
			"font_zoom" : 1.0,
			"allow_connection" : 'wifi', // never, wifi, always
			"photo_quality" : 75, // 50, 65, 75, 85, 100
			"picture_loading" : 'lowres', // deny, lowres, fullres
			'first_run' : false
		},

		__deviceFontSize : null,
		deviceFontSize : function () {
			if (!this.__deviceFontSize) {
				var size = Math.max(app.screen.width(), app.screen.height());
				if      (size <= 320)  this.__deviceFontSize = 0.61; // Android entry
				else if (size <= 480)  this.__deviceFontSize = 0.87; // iPhone 2G, Android legacy
				else if (size <= 854)  this.__deviceFontSize = 1.09; // Android standard
				else if (size <= 1280) this.__deviceFontSize = 1.35; // iPhone Retina, iPad 1/2, Android tablets
				else this.__deviceFontSize = Math.round(size / 640);  // iPad Retina
			}
			return this.__deviceFontSize;
		},

		setFontSize : function () {
			if (app.settings.get('first_run') == false && app.device.isIOS() && !app.device.isIphone5())
				app.settings.set('font_zoom', 1.2);
			var font_size = this.deviceFontSize() * this.get('font_zoom'); // apply font-zooming constant
			document.body.style.fontSize = ''+(font_size*100)+'%';
		},

		get : function (key) {
			return (app.storage.get(key) || this.__defaults[key]);
		},

		set : function(key, value) { app.storage.set(key, value); },

		update : function (elm) {
			// Store the setting
			var value = elm.value;
			if ($.isNumeric(value)) value = parseFloat(value);
			if (elm.id == 'username') value = value.trim();
			app.storage.set(elm.id, value);

			this.setFontSize();
			if (elm.id == 'allow_connection') app.connection.update();
		}

	},

	// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~
	// Account credentials handling
	// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~

	account : {

		session_id : null,

		loggedIn : function () {
			return (app.account.session_id != null);
		},

		invokeLogin : function () {
			var username = app.storage.get('username');
			var password = app.storage.get('password');
			if (!username || !password) {
				Alert("Zadané přihlašovací údaje jsou neplatné");
				return; }
			Processing('Přihlašování…');
			app.connection.post('login',
				{username: username, password: password},
				app.account.loginResponse, app.account.loginFailure);
		},

		loginResponse : function (resp) {
			if (resp == 1001) {
				Alert('Tento účet ještě není aktivovaný. Zkontrolujte svoji e-mailovou schránku a aktivujte jej pomocí odkazu.');
				return; }
			else if (resp == 1411) {
				Alert("Přihlašovací údaje jsou chybné. Zkontrolujte je a zkuste to znovu.");
				return; }
			else if (resp == 1412) {
				Alert('Neočekávaná chyba při pokusu o přihlášení');
				return; }
			history.back(); // Close Processing()
			app.account.session_id = resp.session_id;
			if (app.page() == 'settings')
   			id('logged_username').value = app.settings.get('username');
			app.account.update();
		},

		silentUpdate : function () {
			if (!app.connection.available()) {
				app.account.session_id = null;
				app.account.update();
				return; }
			var username = app.storage.get('username');
			var password = app.storage.get('password');
			if (!username || !password) return;
			app.connection.post('login',
				{username: username, password: password},
				function (resp) {
					if ($.isNumeric(resp)) return;
					if (!resp.session_id) return;
					app.account.session_id = resp.session_id;
					app.account.update();
			});
		},

		invokeRegister : function () {
			var username = app.storage.get('username');
			var password = app.storage.get('password');
			if (!username || !password) {
				Alert("Zadané přihlašovací údaje jsou neplatné");
				return; }
			var fnc = function() {
				var password_confirm = $('#password_confirm').attr('value');
				if (password_confirm != password)
					Alert('Hesla se neshodují, zkuste to znovu.');
				else {
					Processing('Probíhá registrace…');
					app.connection.post('add_user', {
						username: username,
						password: password,
						souhlas_op: 1
					}, app.account.registerResponse, app.account.loginFailure);
				}
			};
			app.dialog.compose({heading:'',controls:[
			{type:"input",input_type:'password',placeholder:"Potvrzení hesla",
			id:'password_confirm'}],buttons:[{text:"Registrovat",fnc:fnc,
			dont_close:true},{text:'Zpět'}]});
		},

		registerResponse : function (resp) {
			if (resp == 1413) {
				Alert('Přihlašovací jméno již existuje, vyberte si prosím jiné.');
				return; }
				Alert('Registrace proběhla úspěšně.');
			if (!resp.session_id) return;
			app.account.session_id = resp.session_id;
			if (app.page() == 'settings')
				id('logged_username').value = app.settings.get('username');
			app.account.update();
		},

		update : function () {
			$('body').toggleClass('upAndRunning', app.connection.available() && this.loggedIn());
			$('body').toggleClass('loggedIn', this.loggedIn());
		},

		loginFailure : function () {
			Alert("Chyba při pokusu o přihlášení");
		},

		logout : function () {
			app.storage.remove('username');
			app.storage.remove('password');
			app.account.session_id = null;
			if (app.page() == 'settings') {
				id('username').value = id('password').value = '';
			}
			this.update();
		},

		sessionID : function () { return app.account.session_id; }

	},

	// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~
	// Connection handling
	// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~

	connection : {

		__updateInterval : null,

		// Options: Connection.UNKNOWN, Connection.ETHERNET, Connection.WIFI,
		//          Connection.CELL_2G, Connection.CELL_3G, Connection.CELL_4G,
		//          Connection.NONE

		available : function () {
			var nw = navigator.network;
			if (nw == undefined)
				return true;
			if (nw.connection.type == Connection.UNKNOWN)
				return allow == 'always';
			var allow = app.settings.get('allow_connection');
			if (nw.connection.type == Connection.NONE || allow == 'never')
				return false;
			else if (allow == 'wifi' && nw.connection.type != Connection.WIFI)
				return false;
			return true;
		},

		update : function () {
			$('body').toggleClass('online', this.available());
			app.account.silentUpdate();
		},

		get : function (action, succ, err) {
			if (!this.available()) { this.handleError(err, 'no_connection'); return; }
			if (!params) params = { };
			var addr = Settings.serverUrl +'?action='+ action;
			if (app.account.loggedIn()) params.session_id = app.account.sessionID();
			var from_page = app.page();
			$.get(addr, function(resp) {
				app.connection.validate(action,from_page,resp,succ,err);
			}).error(function (){
				app.connection.handleError(err, 'loading_error', from_page);});
		},

		post : function (action, params, succ, err) {
			if (!this.available()) { this.handleError(err, 'no_connection'); return; }
			if (!params) params = { };
			var addr = Settings.serverUrl +'?action='+ action;
			if (app.account.loggedIn()) params.session_id = app.account.sessionID();
			var from_page = app.page();
			$.post(addr, params, function(resp) {
				app.connection.validate(action,from_page,resp,succ,err);
			}).error(function (){
				app.connection.handleError(err, 'loading_error', from_page);});
		},

		validate : function (action, from_page, resp, succ, err) {
			if (resp == '0') {
				Log('['+ action +'] Not implemented');
				this.handleError(err, 'not_implemented', from_page);
				return;
			}
			if (typeof resp == 'string') resp = JSON.parse(resp);
			if (resp.result != 1) {
				Log('['+ action +'] Error '+ resp.result_code +': '+ resp.result_message);
				resp = resp.result_code;
				this.handleError(err);
				return;
			}
			else resp = resp.result_data;
			if (succ) succ(resp);
		},

		handleError : function (err, message, from_page) {
			if (typeof err == 'function') err();
			else if (from_page && from_page != app.page()) return;
			else if (err === true) app.setContentMessage(message);
		}

	},

	// ~~~~~~~~~~~~~~~~~~~~~~~

	pageElements : {

		toggle : function (val) {
			if (typeof(val) == "string") {
				$('body').toggleClass('searchEnabled', ['main-page','search','foods','chemicals'].contains(val));
				$('body').toggleClass('noTitleBar', val == 'main-page');
//				$('body').toggleClass('hasTitleActionButton', val == 'lists');
				$('body').toggleClass('absoluteContent', val == 'foods');
				switch (val) {
					case 'lists':
						$('.header-button.action').html('<img src="img/buttonicon-add-light.png">');
						break;
				}
			}
		},

		actionButtonClicked : function () {
			var action = app.page();
			if (action == 'lists') app.lists.addList();
		}

	},

	// ~~~~~~~~~~~~~~~~~~~~~~~
	// Application-wide search
	// ~~~~~~~~~~~~~~~~~~~~~~~

	search : {

		refresh : function (state) {
			if (!state)
				if ($('#search-field').attr('value') != "")
					this.request();
		},

		__lastSearchInitiator : null,

		request : function () {

			var options = { }; options.text = id('search-field').value.toLowerCase(); options.values = options.text.split(' ');
			if (app.page() != 'search') {
				this.__lastSearchInitiator = app.page();
				$('body').removeClassRE(/^search-/);
				$('body').addClass('search-'+this.__lastSearchInitiator);
			}
			$('#search-field').attr('value',null);
			if (['main-page','chemicals'].contains(this.__lastSearchInitiator)) {
				var chemicals = clone(app.database.chemicalsGet(
					'[?(@.search_term.containsAll('+JSON.stringify(options.values)+'))]'));
//				$.each(chemicals, function(i,ch) { ch.name = ch.name[app.settings.get('lang')] });
				if (chemicals.length == 1) app.openPage('chemicals--detail',chemicals[0].id);
//				else this.callback({chemicals: chemicals});
				else app.openPage('chemicals--list',{search:true, list:chemicals});
			}
			if (['foods'].contains(this.__lastSearchInitiator)) {
				var foods = clone(app.database.foodsGet(
					'[?(@.search_term.containsAll('+JSON.stringify(options.values)+'))]'));
				$.each(foods, function(i,f) { f.name = f.name[app.settings.get('lang')] });
				this.callback({foods: foods});
			}
		},

		callback : function (response, try_) {
			try_ = (try_ || 0);
			if (try_ == 0) $('#foods ul li:not(.emptyList)').remove();
			if (app.page() != 'search') app.openPage('search');
			$.each(response, function (cathegory,values){
				if ($('#'+ cathegory +'.section').length == 0 && try_ < 3) {
					var next_try = { }; next_try[cathegory] = values;
					setTimeout(function(){app.search.callback(next_try,try_+1);},500); return true;
				}
				if (try_ > 2) return;
				var list = {chemicals: $('#chemicals ul'), foods: $('#foods ul')};
				$.each(values, function (index,value){
					var cont = value.name;
					if (value.img && app.settings.get('picture_loading') == 'deny') delete value.img;
					if (cathegory == 'chemicals') cont = 'E'+ value.ordinal + " – " + value.name;
					else if (['foods'].contains(cathegory)) {
						cont = '<t>'+cont+'</t>';
						cont = '<img src="' + (value.img ? value.img :'img/no-image.png') + '">' + cont;
					}
					var li = '<li onclick="app.openPage(\''+cathegory+'--detail\','+value.id+')">'+cont+'</li>';
					list[cathegory].append(li);
				});
			});
		}

	},

	// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
	// Some stuff for chemicals pages
	// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

	chemicals : {

		__emptyList : null,

		fill : function() {
			var list = id('chemicals_list');
			this.__emptyList = (this.__emptyList || list.innerHTML);
			var html = '';
			var chemicals = app.pageParameters().list;
			if (!chemicals.length) html = this.__emptyList;
			else $.each(chemicals, function(i,v) {
				var line = '<li onclick="app.openPage(\'chemicals--detail\','+ v.id +')"><pro>';
				if (!v.kids) line += '<img src="img/i-kids.png">';
				if (v.alergen) line += '<img src="img/i-alergen.png">';
				if (v.gmo) line += '<img src="img/i-gmo.png">';
				if (v.animal) line += '<img src="img/i-animal.png">';
				line += '<img src="img/i-'+ (v.ceff ? 'ceff' : 'noceff') +'.png">';
				line += '</pro><code>E'+ v.ordinal +'</code><name>'+ v.name +'</name></li>';
				html += line;
			});
			list.innerHTML = html;
 		}

	},

	// ~~~~~~~~~~~~~~~~~~~~
	// App-wide forms stuff
	// ~~~~~~~~~~~~~~~~~~~~

	forms : {

		check : {
			click : function (elm) {
				var check = $(elm).find('input');
				var checked = check.attr('checked') == 'checked';
				check.attr('checked', checked ? null : 'checked');
				$(elm).toggleClass('checked', !checked);
			}
		},

		photoList : {

			__lastList : null,

			addInvoke : function(list) {
				this.__lastList = list;
				if (!$.browser.mobile)
					this.uploadPhoto('file:///');
				else if (app.picture.hasCamera()) {
					app.dialog.compose({heading:'Zdroj obrázku',
						buttons:[{text:'Fotoaparát',fnc:function(){app.forms.photoList.addPhoto(navigator.camera.PictureSourceType.CAMERA);}},
						{text:'Galerie',fnc:function(){app.forms.photoList.addPhoto(navigator.camera.PictureSourceType.PHOTOLIBRARY);}}]});
				}
				else this.addPhoto(navigator.camera.PictureSourceType.PHOTOLIBRARY);
			},

			addPhoto : function (sourceType) {
				navigator.camera.getPicture(this.uploadPhoto,function(){},{
					quality: app.settings.get('photo_quality'),
					sourceType: sourceType,
					destinationType: navigator.camera.DestinationType.FILE_URI
				});
			},

			uploadPhoto : function (uri) {
				window.plugins.fileUploader.uploadByUri(Settings.serverUploadUrl,
				uri,{},'file','image.jpg','image/jpeg',
				function(result){
					if (result.status == FileUploader.Status.PROGRESS)
						app.dialog.update({type:'progress',value:(result.progress/result.total)});
					else {
						app.dialog.update({type:'progress',value:1});
						var response = JSON.parse(result.result);
						app.forms.photoList.addPhotoSuccess(response.id);
					}
				},function(){ Alert('Nahrávání selhalo'); });
				app.dialog.compose({heading:"Nahrávání…",controls:[{type:'progress'}]});
			},

			addPhotoSuccess : function (id) {
				var list = this.__lastList;
				var line = '<li class="photo" data-id="'+id+'"><div class="removeItem" onclick="app.forms.list.remove(this.parentNode)"></div></li>';
				$('#'+list).html(line+$('#'+list).html().trim());
				$('li[data-id='+id+']').css('background-image','url("http://potravina.tk/files/'+id+'_thumb.jpg")');
			}

		},

		list : {
			remove : function (elm) {
				$(elm).remove();
			}
		},

		gallery : {

			__currentList : null,
			__position : 0,

			open : function (list) {
				if (!$('body').hasClass('galleryDisplayed')) {
					this.__currentList = list;
					this.go();
					history.pushState(null, 'Image Gallery', '#gallery');
					$('body').addClass('galleryDisplayed');
					$('#gallery_wrapper').toggleClass('multiple', list.length > 1);
				}
			},

			go : function (parm) {
				parm = (parm || 0);
				this.__position += parm;
				if (this.__position >= 0) this.__position %= this.__currentList.length;
				else this.__position += this.__currentList.length;
				var url = this.__currentList[this.__position];
				var container = $('#gallery_wrapper #img_container');
				// clear
				container.html('');
				// insert image
				var i = new Image();
				i.onclick = function() { history.back(); };
				i.className = 'transparent';
				i.onload = function() { app.forms.gallery.recalculate(); };
				if (app.settings.get('picture_loading') == 'lowres')
					url = url.replace('velke','male');
				i.src = url;
				container.append(i);
			},

			recalculate : function () {
				if (!$('body').hasClass('galleryDisplayed')) return;
				var width = app.screen.width(), height = app.screen.height(),
				buttons = $('#gallery_wrapper left, #gallery_wrapper right');
				// place buttons
				buttons.css('top',(height-buttons[0].offsetHeight)/2+'px');
				// place image
				var img = $('#gallery_wrapper img')[0];
				$(img).attr('style',null);
				if ((img.offsetWidth/img.offsetHeight) > app.screen.ratio())
					img.style.width = '80%';
				else
					img.style.height = '80%';
				img.style.marginTop = (height-img.offsetHeight)/2+'px';
				// show
				$(img).removeClass('transparent');
			},

			checkClose : function () {
				if (['gallery_wrapper','img_container'].contains(event.srcElement.id))
					history.back();
			},

			close : function () {
				$('body').removeClass('galleryDisplayed');
			}

		},

		collapser : {

			toggle : function (elm) {
				$(elm).toggleClass('closed');
				var closed = $(elm).hasClass('closed');
				var section = $(elm).next('.section');
				section.toggleClass('hidden', closed);
			}

		}

	},

	// ~~~~~~~~~~~
	// Foods stuff
	// ~~~~~~~~~~~

	foods : {

		switchListType : function (type) {
			app.history.backTo('foods');
			setTimeout(function(){ app.openPage('foods--groups',{type:type}); }, 250);
		},

		__lastNewShownIndex : 0,
		showNew : function (opts) {
			if (opts.first) this.__lastNewShownIndex = 0;
			if (opts.next) this.__lastNewShownIndex++;
			if (opts.prev) this.__lastNewShownIndex--;
			if (this.__lastNewShownIndex < 0) this.__lastNewShownIndex = 4;
			if (this.__lastNewShownIndex > 4) this.__lastNewShownIndex = 0;
			var food = app.pageParameters().foods[this.__lastNewShownIndex];
			$('#product').css('background-image','url("'+ food.img +'")');
			$('#productTitle').html(food.name);
		},

		openNew : function () {
			var food = app.pageParameters().foods[this.__lastNewShownIndex];
			app.openPage('foods--detail',food.id);
		},

		scanCommand : function () {
			window.plugins.barcodeScanner.scan(
				function (result) {
					if (result.cancelled) return;
					var ean = result.text;
					app.connection.post('najdi_potravinu_ean',{ean:ean},
						function(resp){
							if (resp == 4102)
								app.openPage('foods--scan-result',ean);
							else if ($.isNumeric(resp)) return;
							else if (resp.error_code == 0)
								app.openPage('foods--detail',resp.result.id);
						},
						function(){ Alert('Požadavek nemohl být odeslán'); }
					);
				},
				function(error){ Alert('Skenování selhalo'); }
			);
		},

		quickScanBarcode : function () {
			window.plugins.barcodeScanner.scan(
				function (result) {
					if (result.cancelled) return;
					var ean = parseInt(result.text);
					$('#ean').attr('value',ean);
				},
				function(error){ Alert('Skenování selhalo'); }
			);
		},

		addToList : function () {
			var lists = app.database.__db.lists;
			var options = [ ];
			$.each(lists, function(i,l) { if (!l.readonly) options.push({name:l.name,value:l.id}); });
			var fnc = function () {
				var list = lists[id('listToAdd').value],
				    food = app.pageParameters(), found = false;
				$.each(list.items,function(ind,i){
					if (i.desc == food.name) { found = true; return false; } });
				if (found) return;
				var timestamp = unix_timestamp();
				var item = {id:-timestamp};
				item.desc = food.name;
				if (!item.desc) return;
				item.price = (parseFloat(food.price) || 0);
				item.amount = 1;
				item.bought = false;
				list.items[item.id] = item;
				list.unixtime = timestamp;
				app.database.touch();
				var server_item = {list_id:list.id,amount:item.amount,unit:'ks',unitprice:item.price,desc:item.desc};
				app.connection.post('add_list_item', server_item,
				function(r){
					if ($.isNumeric(r)) return;
					item.id = parseInt(r.item_id);
					list.items[item.id] = item;
					delete list.items[-timestamp];
					app.database.touch();
				});
			};
			app.dialog.compose({heading:'Výběr seznamu',
				controls:[{type:'label',value:'Vyberte seznam, na který chcete potravinu přidat'},
				{type:'select',options:options,id:'listToAdd'}],
				buttons:[{text:'Přidat',fnc:fnc},{text:'Zpět'}]});
		},

		showPictures : function () {
			var parms = app.pageParameters();
			var images = [parms.img];
			app.forms.gallery.open(images);
		}

	},

	// ~~~~~~~~~~~~~~~~~~
	// Lists manipulation
	// ~~~~~~~~~~~~~~~~~~

	lists : {

		addList : function () {
			Prompt('', function (name){
				name = name.trim();
				if (name == '') {
					Alert('Neplatný název seznamu'); return; }
				var new_id = -unix_timestamp(), sel = $('#lists'), lists = app.database.__db.lists,
				    list = { id: new_id, name: name, timestamp: -new_id, items: { } };
				lists[new_id] = list; app.database.__db.lists_timestamp = -new_id;
				sel.append('<option value="'+new_id+'">'+name+'</option>').attr('value',new_id);
				app.database.touch();
				app.lists.changed();
				app.refreshPage();
				if (app.account.loggedIn())
					app.connection.post('add_list', {name:name},function(r){
						if ($.isNumeric(r)) return;
						list.id = parseInt(r.id);
						delete lists[new_id]; lists[list.id] = list;
						app.database.touch();
						sel.find('option[value="'+new_id+'"]').attr('value',list.id);
						sel.attr('value',list.id); app.lists.changed();
						app.lists.toggleEditMode(true);
					});
			},['Přidat','Zrušit'],' ','Název nového seznamu');
		},

		renameList : function () {
			var id = parseInt($('#lists').attr('value'));
			if (id == 0) { Alert('Hlavní seznam nelze přejmenovat'); return; }
			var list = app.lists.find(id);
			if (list.readonly) { Alert('Seznam je jen ke čtení'); return; }
			Prompt('', function (name){
				name = name.trim();
				if (name == '') { Alert('Neplatný název seznamu'); return; }
				var option = $('#lists option[value="'+id+'"]');
				list.name = name;
				list.unixtime = app.database.__db.lists_timestamp = unix_timestamp();
				app.database.touch();
				option.html(name);
				if (app.account.loggedIn())
					app.connection.post('edit_list', {id:id,name:name});
			},['Přejmenovat','Zrušit'],' ','Nový název seznamu');
		},

		deleteList : function () {
			var id = $('#lists').attr('value');
			if (id == 0) { Alert('Hlavní seznam nelze smazat'); return; }
			Confirm('Opravdu chcete seznam smazat?', function () {
				var readonly = app.database.__db.lists[id].readonly;
				delete app.database.__db.lists[id];
				app.database.__db.lists_timestamp = unix_timestamp();
				app.database.touch();
				$("#lists option[value="+id+"]").remove();
				app.lists.changed();
				if (!readonly && app.account.loggedIn())
					app.connection.post('delete_list', {id:id});
			},['Smazat','Zpět']);
		},

		loadDialog : function () {
			var select = $('#lists');
			select.html('');
			$.each(app.database.get('lists'), function(i,v){
				select.append('<option value="'+v.id+'">'+v.name+(v.readonly ? ' (cizí)':'')+'</option>'); });
			var last = app.storage.get('last_seen_list');
			select.attr('value', last || 0);
			if (select.attr('value') != last) select.attr('value', 0);
			this.changed();
		},

		changed : function () {
			var list_id = parseInt($('#lists').attr('value'));
			app.storage.set('last_seen_list',list_id);
			this.toggleEditMode(false);
			this.loadList();
			app.checkForUpdates({list_items:true,list_id:list_id});
		},

		loadList : function () {
			var ul = $('#itemsList');
			var id = parseInt($('#lists').attr('value'));
			var list = this.find(id);
			if (list) {
				ul.find('li.item').remove();
				$.each(list.items, function(i,v){
					if (!v) return true;
					var name = v.desc;
					ul.append('<li class="item' + ((v.bought) ? ' bought':'') +
						'" data-id="'+v.id+
						'" data-price="'+v.price+'" data-amount="'+v.amount+
						'" onclick="app.lists.itemClicked(this)"><div class="removeItem" '+
						'onclick="app.lists.itemClicked(this)"></div><ch></ch><name>'+name+
						'</name><info>'+
						((v.amount > 0) ? '<amount>'+v.amount+'&#8201;ks</amount>':'')+
						((v.price > 0) ? '<price>'+v.price.toDecString()+'&#8201;Kč/ks</price>':'')+
						'</info></li>');
				});
				this.recalculate();
				$('#work_buttons').css('display','block');
				$('.removeItem').css('display',list.readonly ? 'none':'block');
				$('#summary').css('display','block');
			}
			else {
				$('#work_buttons').css('display','none');
				$('#summary').css('display','none');
				$('#itemsList .emptyList').html('Žádný seznam není vybrán');
			}
		},

		recalculate : function () {
			var marked_sum = 0, total_sum = 0;
			$.each($('#itemsList li.item'), function(i,v){
				total_sum += ($(v).attr('data-price') * $(v).attr('data-amount') || 0); });
			$.each($('#itemsList li.item.bought'), function(i,v){
				marked_sum += ($(v).attr('data-price') * $(v).attr('data-amount') || 0); });
			$('#markedSum').html(marked_sum.toDecString()+'&#8201;Kč').closest('li').toggleClass('hidden',marked_sum == 0);
			$('#totalSum').html(total_sum.toDecString()+'&#8201;Kč').closest('li').toggleClass('hidden',total_sum == 0);
		},

		__editedItem : null,

		addEditItem : function (itm) {
			var list = app.lists.find(parseInt($('#lists').attr('value')));
			if (list.readonly) { Alert('Seznam je jen ke čtení'); return; }
			var object_item = typeof itm == 'object' && itm != null;
			this.__editedItem = (typeof itm == 'object') ? (itm || null) : null;

			app.dialog.compose({
				heading:(object_item)?'Úprava položky':'Přidání položky',
				controls:[{type:'custom',value:'<div id="itemAddEditDialogs"></div>'}
				],buttons:[{text:(object_item)?'Upravit':'Přidat',fnc:app.lists.addEditItemFinished,dont_close:true},{text:'Zpět'}]});

			// Final III. dialog -- input fields
			$('#itemAddEditDialogs').append('<div id="s3" class="shrinkedElmsV"><input me id="addedit_desc" type="text" placeholder="Název položky"><ul class="suggestions"></ul><div class="relative"><lbl>Kč/ks</lbl></div><input me id="addedit_price" type="tel" placeholder="Cena za 1 kus/balení"><div class="relative"><lbl>ks</lbl></div><input me id="addedit_amount" type="tel" placeholder="Množství"></div>');

			if (!object_item) {

				// I. dialog -- icons of categories
				$('#itemAddEditDialogs').append('<div id="s1"></div>');
				$.each(app.database.get('lists_categories'), function(i,c){
					$('#s1').append('<div data-id="'+c.id+'" class="command" onclick=""><img src="'+c.img+'"><span>'+c.name+'</span>');
				});

				$('#s1 .command').click(function(){
					// Fill #s2 with items
					var foods = app.database.get('$.lists_foods[?(@.category == '+ $(this).attr('data-id') +')]');
					$.each(foods, function(i,f){ $('#s2 ul').append('<li>'+ f.name +'</li>'); });
					////
					$('#s2 li').click(function(){
						$('#addedit_desc').attr('value',$(this).html());
						$('#s2').hide();
						$('#s3').show(); $('#dialog').removeClass('intermediate');
					});
					// Show/Hide
					$('#s1').hide();
					$('#s2').show();
				});

				// II. dialog -- list of items in category
				$('#itemAddEditDialogs').append('<div id="s2"><ul class="selectable fullBorder highPadding list"></ul></div>');
				$('#s2').hide();
				$('#s3').hide();
				$('#dialog').addClass('intermediate');

			}

			itm = (itm || {desc: '', price: 0, amount: 1 });
			if (typeof itm == 'string') itm = {desc: itm, price: 0, amount: 1};

			if (itm) {
				$('#addedit_desc').attr('value',itm.desc);
				$('#addedit_price').attr('value',itm.price.toDecString());
				$('#addedit_amount').attr('value',itm.amount);
			}
			$('#addedit_desc').on('keyup',function(){
				var sf = $(this).next('ul.suggestions');
				sf.html('');
				var val = $(this).attr('value').trim().toLowerCase();
				if (!val.trim || val.length < 3) return;
				var suggestions = [ ]; // flat string array!

				// Add strings to suggestions
				$.each(app.database.get(
					'$.lists_foods[?(@.name.toLowerCase().containsAll(['+JSON.stringify(val.toLowerCase())+']))]'),
					function(i,f){ suggestions.push({ text: f.name }); });
				var lang = app.settings.get('lang');
				$.each(app.database.get('foods'),
					function(i,f){
						Log(f.name[lang]);
						if (f.name[lang] &&
							f.name[lang].toLowerCase().containsAll([val.toLowerCase()]))
							{ suggestions.push({ text: f.name[lang], ceff: true }); Log(f); }
				});

				// Show 'em up!
				$.each(suggestions, function(i,s) {
					var li = document.createElement('li');
					$(li).html(s.text.replace(''+val,'<strong>'+val+'</strong>'));
					if (s.ceff) $(li).attr('style','background: url("img/i-ceff.png") 98% center no-repeat; background-size: auto 1.7em;');
					$(li).click(function() {
						$('#addedit_desc').attr('value',s.text);
						$('.suggestions').html('');
					});
					sf.append(li);
				});
			});

		},

		itemClicked : function (elm) {
			var list = app.lists.find(parseInt($('#lists').attr('value')));
			if (!list.readonly && $(elm).hasClass('removeItem')) {
				this.removeItem(elm.parentNode);
				this.recalculate();
				event.cancelBubble = true; return false;
			}
			var item_id = parseInt($(elm).attr('data-id'));
			var list_id = parseInt($('#lists').attr('value'));
			item = this.find(list_id).items[item_id];
			if (!list.readonly && $('body').hasClass('editMode'))
				this.addEditItem(item);
			else
				this.toggleItemShopped(elm, item);
		},

		toggleItemShopped : function (elm, itm) {
			var list = app.lists.find(parseInt($('#lists').attr('value')));
			itm.bought = !itm.bought;
			itm.unixtime = unix_timestamp();
			list.unixtime = unix_timestamp();
			app.database.touch();
			$(elm).toggleClass('bought', itm.bought);
			this.recalculate();
			if (!list.readonly && app.account.loggedIn())
				app.connection.post('bought_list_item',
					{item_id:itm.id,list_id:list.id,bought:(itm.bought)?1:0});
		},

		addEditItemFinished : function () {
			var desc = $('#addedit_desc').attr('value').trim();
			var price = parseFloat($('#addedit_price').attr('value').trim().replace(',','.'));
			if (isNaN(price)) price = 0;
			if (price < 0) { Alert('Cena je zadána chybně'); return; }
			var amount = parseInt($('#addedit_amount').attr('value').trim());
			if (isNaN(amount)) amount = 0;
			if (amount < 0) { Alert('Množství je zadáno chybně'); return; }
			var timestamp = unix_timestamp();
			var list = app.lists.find(parseInt($('#lists').attr('value')));
			var item = (app.lists.__editedItem || {id: -timestamp});
			item.price = price;
			item.amount = amount;
			item.desc = desc;
			item.bought = (item.bought || false);
			if (item.id < 0) {
				if (!desc.length) { Alert('Popis je zadán chybně'); return; }
				list.items[item.id] = item;
				app.connection.post('add_list_item',
				{list_id:list.id,amount:amount,price:price,desc:desc},
				function(r){
					if ($.isNumeric(r)) return;
					item.id = parseInt(r.item_id);
					list.items[item.id] = item; delete list.items[-timestamp];
					app.database.touch();
				});
			} else {
				app.connection.post('edit_list_item',{list_id:list.id,item_id:item.id,
				unit:'ks',unitprice:price,desc:desc,amount:amount});
			}
			app.database.__db.lists_timestamp = list.unixtime = timestamp;
			history.back();
			app.database.touch();
			app.lists.changed();
			app.lists.toggleEditMode(true);
		},

		removeItem : function (li) {
			var list = this.find(parseInt($('#lists').attr('value')));
			var id = parseInt($(li).attr('data-id'));
			delete list.items[id];
			app.database.touch();
			$(li).remove();
			app.connection.post('delete_list_item',{list_id:list.id,item_id:id});
		},

		find : function(id) {
			return (app.database.__db.lists[id] || null);
		},

		toggleEditMode : function (state) {
			var list = app.lists.find(parseInt($('#lists').attr('value')));
			if (state === undefined) state = !$('body').hasClass('editMode');
			$('body').toggleClass('editMode', state);
			$('#editList').attr('value', (state) ? 'Hotovo' : 'Upravit seznam');
			$('#lists').attr('disabled', (state) ? 'disabled' : null);
			$('#addList').attr('disabled', (state) ? 'disabled' : null);
			$('#addItem').attr('disabled', (!list || list.readonly) ? 'disabled' : null);
			$('#renameList').attr('disabled', (!list || list.readonly) ? 'disabled' : null);
			$('#shareList').attr('disabled', (!list || list.readonly) ? 'disabled' : null);
		},

		showForeign : function () {
			if (!app.account.loggedIn()) {
				app.dialog.compose({
					controls:[{type:'para',value:'Tato funkce vyžaduje přihlášení'}],
					buttons:[{text:'Nastavení',fnc:function(){
						setTimeout(function(){app.openPage('settings');}, 500);
					}},{text:'Zavřít'}]});
				return;
			}
			var showForeignCompleted = function () {
				var fid = parseInt($('#foreign_id').attr('value'));
				if (fid <= 0) { Alert('Neplatné ID seznamu'); return; }
				if (app.lists.find(fid)) { Alert('Seznam je již zařazen'); return; }
				if (!app.connection.available()) { Alert('Nejste připojeni k síti'); return; }
				app.connection.post('list_items',
				{list_id:fid,count:0,unixtime:0},function(r){
					if ($.isNumeric(r)) return;
					delete r.session_id;
					r.readonly = true; r.id = fid;
					var items = { }
					$.each(r.items, function(i,itm){
						itm.id = itm.item_id; delete itm.item_id;
						itm.bought = itm.bought > 0;
						items[itm.id] = itm;
					});
					r.items = items;
					var lists = app.database.get('lists');
					lists[fid] = r;
					Alert('Sdílený seznam byl úspěšně přidán');
					app.lists.loadDialog();
					$('#lists').attr('value',fid);
					app.lists.changed();
				},function(){ Alert('Neplatné ID seznamu'); });
			};

			app.dialog.compose({
				heading:'Zobrazení cizího seznamu',
				controls:[{type:'custom',value:'<input me id="foreign_id" type="text" placeholder="ID seznamu">'}
				],buttons:[{text:'Zobrazit',fnc:showForeignCompleted,dont_close:true},{text:'Zpět'}]});

		},

		share : function () {
			if (!app.account.loggedIn()) {
				Alert('Sdílet seznamy mohou jen přihlášení uživatelé'); return; }
			var list = app.lists.find(parseInt($('#lists').attr('value')));
			if (list.readonly) { Alert('Seznam je jen pro čtení'); return; }
			var sendSMS = function() {
				var message = "Sdílím nákupní seznam z aplikace CEFF http://ceff.info/seznam/"+ list.id +" – můžete jej zobrazit na webu nebo v aplikaci po zadání čísla lístku: "+ list.id;
				if (app.device.isIOS())
					window.plugins.smsComposer.showSMSComposer('', message);
				else if (app.device.isAndroid())
					window.open('smsto://?body='+ message);
			};
			app.dialog.compose({
				heading:'Sdílení seznamu',
				controls:[{type:'custom',value:'<div style="text-align: center;">ID seznamu:</div><div style="text-align: center; font-size: 2.5em; font-weight: bold;">'+ list.id +'</div><div style="text-align: center; font-size: .8em; color: #999;">Sdělte jej osobě, které chcete povolit jeho zobrazení</div>'}
				],buttons:[{text:'Poslat SMS',fnc:sendSMS},{text:'Zavřít'}]});
		}

	},

	// ~~~~~~~~~~~~~~
	// Contest helper
	// ~~~~~~~~~~~~~~

	contest : {

		submit : function () {
			Alert('TODO');
		}

	},

	// ~~~~~~~~~~~~~~~~~~
	// History processing
	// ~~~~~~~~~~~~~~~~~~

	history : {
		__stash : [ ],
		__noLoad : false,

		add: function (state) {
			var page_hash = this.hash();
			state.order = this.__stash.length;
			if (state.order === 0 || (page_hash == state.id && this.hashId() == state.order))
				history.replaceState(state.order, state.id, '#'+state.id+'|'+state.order);
			else
				history.pushState(state.order, state.id, '#'+state.id+'|'+state.order);
			this.__stash.push(state);
			this.updateGUI();
		},

		currentState : function () {
			return this.__stash[this.__stash.length-1];
		},

		hash : function () {
			return window.location.hash.substr(1).replace(/\|.*/,'');
		},

		hashId : function () {
			var hash = window.location.hash;
			return hash.substr(hash.lastIndexOf('|')+1);
		},

		update : function (options) {
			var state = this.currentState();
			if (options.id) state.id = options.id;
			if (options.parameters) state.parameters = options.parameters;
			history.replaceState(state.order, state.id, '#'+state.id+'|'+state.order);
		},

		updateGUI : function () {
			$('body').toggleClass('hasHistory', this.__stash.length > 1);
		},

		backTo : function (page, andThenOpen) {
			var x = 0;
			while (x < this.__stash.length && this.__stash[this.__stash.length-1-x].id != page)
				x++;
			history.go(-x);
		},

		changed : function (evt) { // 'Back' pressed

			var id = this.hash();
			this.updateGUI();

			// At first, take care of possible modal layers
			if ($('body').hasClass('dialog')) { app.dialog.close(); return; }
			if ($('body').hasClass('galleryDisplayed')) { app.forms.gallery.close(); return; }

			if (history.state == Math.max(this.__stash.length-1, 0)) return; // TODO: ??

			if (this.__stash.length < 1) return;

			while (this.currentState().id != id || this.currentState().order != this.hashId())
				this.__stash.pop();

			var state = this.__stash.pop();
			// If cache available, simulate openPage() and fill in content
			if (state.cache) this.openPageFromCache(state);
			// Otherwise do a normal load
			else app.openPage(state.id, state.parameters);
		},

		backClicked : function () {
			if (navigator.app && this.__stash.length == 1) navigator.app.exitApp();
			else history.back();
		},

		cachePage : function () {
			// Disable caching for certain pages
			if (['lists'].contains(app.page())) return;
			if (!this.__stash.length) return;
			// Create and fill in page cache
			this.currentState().cache = { };
			this.updateCache();
		},

		updateCache : function (option) {
			if (!this.__stash.length) return;
			var state = this.currentState();
			if (state.id != app.page()) return;
			if (!state.cache) return;
			if (!option || option.style) state.cache.style = {scrollTop: document.body.scrollTop};
			if (!option || option.content) state.cache.content = $('#content').html();
			if (!option || option.parameters) state.cache.parameters = app.pageParameters();
		},

		openPageFromCache : function (state) {
			app.history.add(state);
			app.setPageID(state.id);
			app.pageElements.toggle(state.id);
			app.setPageParameters(state.cache.parameters);
			$('#content').html(''+state.cache.content);
			app.builder[state.id](state.cache.parameters);
			app.refit();
			window.scrollTo(0,state.cache.style.scrollTop);
		}

	},

	// ~~~~~~~~~~~~~~~~~~~~~~~~~~~
	// Offline images manipulation
	// ~~~~~~~~~~~~~~~~~~~~~~~~~~~

	images : {

		// Content: { url: '', filename: '', object: null, onFinished: null }
		__downloadStack : [ ],
		__downloadsInProgress : 0,

		downloadStep : function () {

			if (!this.__downloadStack.length) return;

			if (this.__downloadsInProgress > 2) return;
			this.__downloadsInProgress++;

			var item = this.__downloadStack.pop();

			if (!item || !Settings.fileSystem) { app.images.finishDownloadStep(item); return; };

			Settings.fileSystem.root.getDirectory("Images", {create: true, exclusive: false},
			function(dir){

				dir.getFile(
					item.filename +".png", {create: true, exclusive: false},
					function gotFileEntry(fileEntry) {
						var fileTransfer = new FileTransfer();
//						fileEntry.remove();

						fileTransfer.download(
							encodeURI(item.url),
//							item.filename +".png",
							fileEntry.fullPath,
							function(theFile) {
								if (item.object) item.object.img = theFile.toURL();
								app.images.finishDownloadStep(item);
							},
							function(error) {
								Log("Download error source: " + error.source);
								Log("Download error target: " + error.target);
								Log("Download error code: " + error.code);
								app.images.finishDownloadStep(item);
							}
						);
					},
					function() { Log('Cannot get file, aborting.'); app.images.finishDownloadStep(item); });

			}, function(){ Log('Cannot get directory, aborting.'); app.images.finishDownloadStep(item); });

		},

		finishDownloadStep : function (obj)
		{
			if (obj.onFinished) obj.onFinished();
			this.__downloadsInProgress--;
			setTimeout(function(){ app.images.downloadStep(); }, 500);
		},

		download : function (image_name, url, object, fnc)
		{
			var item = {url: url, filename: image_name, object: object, onFinished: fnc };

			if (!item || !Settings.fileSystem) { item.onFinished(); return; };

			Settings.fileSystem.root.getDirectory("Images", {create: true, exclusive: false},
			function(dir){
				dir.getFile(image_name+'.png', {create: false},
					function (fileEntry) {
						if (item.object) item.object.img = fileEntry.toURL();
						item.onFinished();
					},
					function () {
						app.images.__downloadStack.push(item);
						app.images.downloadStep();
					}
				);
			});
		}

	},

	// ~~~~~~~~~~~~~~~~~~~~~~~~~
	// Modal dialog manipulation
	// ~~~~~~~~~~~~~~~~~~~~~~~~~

	dialog : {

		show : function () {
			if (!$('body').hasClass('dialog')) {
				document.body.oldScrollTop = parseInt(document.body.scrollTop);
				$('body').addClass('dialog');
				history.pushState(null, 'Modal Dialog', '#dialog'); }
		},

		update : function (parms) {
			if (parms.type == 'progress') {
				if (parseInt($('#dialog prog status').html()) == 100 &&
					parms.value == 1) return;
				if (typeof parms.max != 'undefined') {
					$('#dialog prog').attr('data-actual', 0);
					$('#dialog prog').attr('data-max', parms.max);
					return;
				}
				var value = 0;
				if (parms.increment) {
					$('#dialog prog').attr('data-actual',parseInt($('#dialog prog').attr('data-actual'))+1);
					value = Math.floor($('#dialog prog').attr('data-actual') / $('#dialog prog').attr('data-max') * 100);
				}
				else value = Math.floor(100*parms.value);
				$('#dialog prog bar').css('width',value+'%');
				$('#dialog prog status').html(value+' %');
				if (value == 100) setTimeout(function(){history.back();}, 1200);
			}
		},

		compose : function(opts) {
			var dc = $('#dialog'); dc.html('');
			dc.attr('class', (opts.dialog_class || ''));
			if (opts.heading) dc.append('<h2>'+opts.heading+'</h2>');
			if (opts.controls) {
				$.each(opts.controls, function(i,c){
					c.value = (c.value || '');
					c.id = (c.id || 'dialogCtl_'+ i);
					if (c.type == 'para' || c.type == 'label')
						dc.append('<p id="'+ c.id +'">'+c.value+'</p>');
					else if (c.type == 'textarea')
						dc.append('<textarea me id="'+ c.id +'">'+c.value+'</textarea>');
					else if (c.type == 'input') {
						c.input_type = (c.input_type || 'text');
						c.placeholder = (c.placeholder || '');
						dc.append('<input me id="'+ c.id +'" type="'+c.input_type+'" value="'+c.value+'" placeholder="'+c.placeholder+'">');
					}
					else if (c.type == 'select') {
						var html = '<select me id="'+ c.id +'">';
						$.each(c.options, function(oi,ov){
							html += '<option value="'+ov.value+'">'+ov.name+'</option>';
						});
						html += '</select>';
						dc.append(html);
					}
					else if (c.type == 'progress') {
						dc.append('<prog id="'+ c.id +'"><bar style="width: 0%"></bar><status>0 %</status></prog>');
						$('#dialog prog').attr('data-actual', 0);
						$('#dialog prog').attr('data-max', 100);
					}
					else if (c.type == 'custom') {
						dc.append(c.value);
					}
				});
			}
			if (opts.buttons) {
				dc.append('<div id="dialogButtons" class="shrinkedElmsH"></div>');
				$.each(opts.buttons, function(i,v){
					$('#dialogButtons').append('<input id="dialogBtn_'+i+'" type="button" value="'+v.text+'">');
					$('#dialogBtn_'+i).click(function(){
						if (!v.dont_close) history.back();
						if (v.fnc) v.fnc($('#dialog *[me]'));
					}).css('width',100/opts.buttons.length+'%');
				});
			}
			this.show();
		},

		close : function () {
			$('body').removeClass('dialog');
			setTimeout(function(){ document.body.scrollTop = document.body.oldScrollTop; }, 750);
		}

	},

	// ~~~~~~~~~~~~~~~~~~~
	// Device capabilities
	// ~~~~~~~~~~~~~~~~~~~

	device : {

		hasCamera : function() {
			if (window.plugins && window.plugins.Capabilities) return window.plugins.Capabilities.camera;
			return false;
		},

		beep : function () {
			if (navigator.notification) navigator.notification.beep(1);
			else new Audio("beep.wav").play();
		},

		isIOS : function() {
			return (navigator.userAgent||navigator.vendor).search(/i(phone|pad|pod|os)/i) != -1; },
		isIphone5 : function() {
			return (app.screen.height() == 548); },
		isAndroid : function() {
			return (navigator.userAgent||navigator.vendor).search(/android/i) != -1; },
		androidVersion : function() {
			if (!app.device.isAndroid()) return 0;
			return parseFloat((navigator.userAgent||navigator.vendor).replace(/.*Android /,'').replace(/;.*/,''));
		}

	},

	// ~~~~~~~~~~~~~~~~~~~~~~~~~~~
	// Start-up preloading process
	// ~~~~~~~~~~~~~~~~~~~~~~~~~~~

	preload : {

		__images : [],
		__counter : 0,

		all : function () {

			$.each(this.__images, function (index,value) {
				var img = new Image();
				img.src = value;
				img.onload = function (e) { app.preload.invoke(); };
				id('hidden-container').appendChild(img);
			});

			// If running as native mobile app
			if (!cordova.available && $.browser.mobile && (''+window.location).indexOf('potravina.tk') == -1)
				document.addEventListener('deviceready', function (){ app.database.initialize(); }, false);
			else
				app.database.initialize();

		},

		invoke : function () {

			// Increment the counter
			this.__counter++;

			// Check if everything is preloaded and ready
			if (this.__counter != this.__images.length + app.database.__databasesCount)
				return;

			// Progress to finishing app launch
			setTimeout(function(){ app.checkForUpdates() }, 100);
			$('#splash').remove();
			$('body').removeClass('notYetLoaded');
			$.ajaxSetup({timeout: Settings.ajaxTimeout});
			app.database.__savingInterval = setInterval(function (){ app.database.save(); }, 5000);
			app.connection.update();
			app.account.update();
			$('body').toggleClass('hasCamera', app.device.hasCamera());
			app.settings.set('first_run', true);
			// FIXME: Show document location
//			Log('Location: '+document.location);
		}

	},

	// ~~~~~~~~~~~~~~~~~~~~~~~
	// Application initializer
	// ~~~~~~~~~~~~~~~~~~~~~~~

	init : function () {

		// Set parent object in all application modules
		var this_ = this;
		$.each(this, function (i,v) { if (v && typeof v == 'object') v.parent = this_; });

		// Add floating except for mobile browsers not supporting fixed positioning
		if ((navigator.userAgent||navigator.vendor).search(
			/iphone os (3|4)|cpu os 4|android (1|2)/i) == -1 ||
				!$.browser.mobile) {
			$('body').addClass('floatingContent');
		}

		// App-wide font size setting
		this.settings.setFontSize();

		// Set notifications last update for last 2 days
		app.storage.set('notifications_last_update',
			Math.max((app.storage.get('notifications_last_update') || 0), unix_timestamp()-172800));

		// Open main page
		this.openPage('main-page');

		// Let's preload some stuff!
		this.preload.all();

	}
};

// ~~~~~~~~~~~~~~~~~
// DIALOG GENERATION -- presets for most often used ones
// ~~~~~~~~~~~~~~~~~

function Alert(message, title, button, callback) {
	title = (title || 'Upozornění');
	button = (button || "Zavřít");
	app.dialog.compose({heading:title,
	    controls:[{type:"label",value:message}],
	    buttons:[{text:button,fnc:callback}]});
}

function Confirm(message, callback, buttons, title) {
	title = (title || 'Potvrzení');
	buttons = (buttons || ['Potvrdit','Zamítnout']);
	app.dialog.compose({heading:title,
	    controls:[{type:"label",value:message}],
	    buttons:[{text:buttons[0],fnc:callback},{text:buttons[1]}]});
}

function Prompt(message, callback, buttons, title, placeholder) {
	title = (title || 'Potvrzení');
	buttons = (buttons || ['Potvrdit','Zpět']);
	placeholder = (placeholder || '');
	var fnc = function() {
		var result = id('prompt_value').value;
		callback(result);
	};
	app.dialog.compose({heading:title,
	    controls:[{type:"label",value:message},{id:'prompt_value',type:'input',
	    placeholder:placeholder}],buttons:[{text:buttons[0],fnc:fnc},{text:buttons[1]}]});
}

function Processing(title, callback) {
	title = '<img id="loading_circle" src="img/loading.gif">' + (title || 'Zpracování…');
	app.dialog.compose({heading:title});
}

function Share(title,text) {
	var fnc = function() {
		var email = $('#share_email').attr('value');
		var message = $('#share_message').attr('value');
		app.connection.post('sdilet',{email:email,title:title,text:text,
		user_text:message},function(r){
			if (r == 1201) { Alert('Formát e-mailu je špatný'); return; }
			if (r == 1202) { Alert('Chyba při odesílání e-mailu'); return; }
			Alert('Váš tip byl úspěšně odeslán');
		});
	};
	app.dialog.compose({heading:'Sdílet',
	    controls:[{type:'input', placeholder:'E-mail příjemce',id:'share_email'},
	    {type:"label",value:'Zpráva pro příjemce'},{type:'textarea',id:
	    'share_message',placeholder:'Zpráva pro příjemce'}],
	    buttons:[{text:'Sdílet',fnc:fnc},{text:"Zpět"}]});
}

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// Globals, window hooks and listeners
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

function deviceReady() {
	document.addEventListener("menubutton", function() {
		}, false);
	document.addEventListener("searchbutton", function() {
		if ($('body').hasClass('searchEnabled'))
			$('#search-field').focus(); }, false);
	document.addEventListener("backbutton", function() {
			app.history.backClicked(); }, false);
}
//++//
if (!cordova.available) document.addEventListener('deviceready', deviceReady, false);
else deviceReady();

Log('User Agent: '+(navigator.userAgent||navigator.vendor));
$.browser.mobile = ((navigator.userAgent||navigator.vendor||window.opera).search(/android|aspen|ip(hone|od|ad)|symbian/i) > -1 ? true : false);

if (app.device.isIOS()) $('body').addClass('ios');
else if (app.device.isAndroid()) {
	$('body').addClass('android');
	if (app.device.androidVersion() < 3) $('body').addClass('androidLegacy');
	$('li, input, button, div, .listHeader *, left, right').live(
		'touchstart', function() { $(this).addClass('touched'); });
	$(document).on('scrollstart scrollend touchend touchmove touchcancel',function(e){
		$('.touched').removeClass('touched'); });
//	$('li, input, button, div, .listHeader *, left, right').live(
//		'scrollend touchend touchmove touchcancel', function() { $('.touched').removeClass('touched'); });
}

$(document).ajaxError(function(event, request, settings){
	// Failure of template (unavailable or incorrect)
	if (settings.url.indexOf('tpl/') == 0)
		app.openPage('default');
});

document.addEventListener("touchstart", function() {},false); // enables :active pseudo-class on iOS
document.addEventListener("online", function () { app.connection.update(); }, false);
document.addEventListener("offline", function () { app.connection.update(); }, false);
window.addEventListener("popstate", function (evt) { app.history.changed(evt); }, false);
window.onresize = function (event) { app.refit(); };
window.onorientationchange = function () { app.refit(); };

// ~~~~~~~~~~~~~~~~~~
// App Initiazer Call
// ~~~~~~~~~~~~~~~~~~

/*@(#*$JHE@PURHFP)QWUHRF)(Q&#WH)*&UW#H_)(*@QUR#Q)WE(*RHF)Q#&RH)*Q&#WRH)*Q&WU@E
O)RU@)(W#J)(JF)WQJ#)IRJ)QW#JID)Q(EUJ)@(*UE)@(EUJH(EWHJQ)(@RJQ)R*IJQ)RJQW)#()@E
/*!#%$(*!&$(@()!&%*(&@$)(@*)#(!*/ app.init(); /*!#(*!&$(@()!&%*(@$&)(@*)#+(!@$
E)(QWJD)(@JER)Q(#JI)@Q(EW#JDM)Q(WJ#N)Q(WJDM)WQM)QWJMDN)QW(#JMQ)(E*RH@)E(R)E@()
E)(W@QJ(QUHW#(IJQW)QWNF(QWNFE O)WFNW(OQWIEJ)PWQIJEFQWJRWQOFIJWQDHQW)Q*@@$R$@*/


// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

// Useful functions

Array.prototype.contains = function (obj) {
	var i = this.length;
	while (i--)
		if (this[i] === obj)
			return true;
	return false;
};

Array.prototype.anyLike = function (str) {
	var i = this.length;
	while (i--)
		if (this[i].indexOf(str) !== -1)
			return true;
	return false;
};

Array.prototype.containsAll = function (obj) {
	var vals = this, ret = true;
	$.each(obj, function (index,value){
		if (!vals.anyLike(value))
			ret = false; });
	return ret;
};

String.prototype.containsAll = function (obj) {
	var str = this, ret = true;
	$.each(obj, function(i,v){
		if (str.indexOf(v) == -1)
			ret = false; });
	return ret;
}

Array.prototype.lastMember = function () {
	return this[this.length-1];
};

Number.prototype.times = function (fnc) {
	var i = 0;
	while (i < this) fnc(i++);
};

Number.prototype.toDecString = function () {
	if (this == Math.round(this)) return this.toString();
	else return Math.roundDecimal(this,1).toString().replace('.',',') + '0';
};

Object.defineProperty(Object.prototype, 'cardinality',{
	value: function(){
		var len = 0;
		for (var k in this)
			if (this.hasOwnProperty(k)) len++;
		return len;
	},
	writable: true,
	configurable: true,
	enumerable: false
});

String.prototype.capitalize = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
};

Math.toRad = function (num) { return num*(Math.PI/180); };

Math.roundDecimal = function (num, dec) {
	var result = Math.round(num*Math.pow(10,dec))/Math.pow(10,dec);
	return result;
};

function Log(message) { if (console) console.log(message); }

function id(id) { return document.getElementById(id); }

function clone(obj) { return JSON.parse(JSON.stringify(obj)); }

function unix_timestamp() { return Math.floor(new Date().getTime()/1000); }

function timestampToDate(ts) {
	var date = new Date(ts * 1000);
	return ''+date.getDate()+'. '+date.getMonth()+'. '+date.getFullYear();
}

function priceToPriceStr(p) {
	if (p % 1 !== 0) return (p + '0 Kč').replace('.',',');
	return p + ' Kč';
}

function isoDateToStr(str) {
	var pieces = str.split('-');
	return parseInt(pieces[2]) + '. ' + parseInt(pieces[1]) + '. ' + pieces[0];
}

function isoDateToTimestamp(str) {
	return (new Date(str).getTime()/1000);
}

function strpos (haystack, needle, offset) {
	var i = (haystack + '').indexOf(needle, (offset || 0));
	return i === -1 ? false : i;
}

function resize(x, y) { // for fast resolution switching during testing in Chrome
	window.resizeTo(x, y+30);
}

function rotate() { // fast portrait/landscape switching during testing in Chrome
	window.resizeTo(window.innerHeight+20, window.innerWidth+30);
}


function Capabilities() {
	this.model = null;
	this.camera = false;
	cordova.exec(null, null, "Capabilities", "start", []);
}

Capabilities.prototype.getModel = function() {
	return this.model;
}

Capabilities.prototype.hasCamera = function() {
	return this.camera;
}

Capabilities.prototype.load = function() {

};


cordova.addConstructor(function () {
  if (typeof window.plugins == 'undefined') window.plugins = {};
  if( typeof window.plugins.Capabilities == 'undefined' ) window.plugins.Capabilities = new Capabilities();
});
