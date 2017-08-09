

		setTimeout(function () {
			window.location = "app.html";
		}, 100);
	



		$(document).bind("mobileinit", function() {
			$.support.cors = true;
			$.mobile.allowCrossDomainPages = true;
		});
	











app.initialize();

if(!Array.prototype.forEach){Array.prototype.forEach=function(d,c){c=c||this;for(var b=0,a=this.length;b<a;b++){d.call(c,this[b],b,this)}}}if(typeof Prototype!="undefined"||!Array.prototype.map){Array.prototype.map=function(d,c){c=c||this;var e=[];for(var b=0,a=this.length;b<a;b++){e.push(d.call(c,this[b],b,this))}return e}}if(typeof Prototype!="undefined"||!Array.prototype.filter){Array.prototype.filter=function(d,c){c=c||this;var e=[];for(var b=0,a=this.length;b<a;b++){if(d.call(c,this[b],b,this)){e.push(this[b])}}return e}}["forEach","map","filter","slice","concat"].forEach(function(a){if(!Array[a]){Array[a]=function(b){return this.prototype[a].apply(b,Array.prototype.slice.call(arguments,1))}}});Date.ISO8601PartMap={Year:1,Month:3,Date:5,Hours:7,Minutes:8,Seconds:9};Date.matchISO8601=function(a){return a.match(/^(\d{4})(-?(\d{2}))?(-?(\d{2}))?(T(\d{2}):?(\d{2})(:?(\d{2}))?)?(Z?(([+\-])(\d{2}):?(\d{2})))?$/)};Date.parseISO8601=function(e){var b=this.matchISO8601(e);if(b){var a=new Date,c,d=0;for(var f in this.ISO8601PartMap){if(part=b[this.ISO8601PartMap[f]]){a["set"+f]((f=="Month")?parseInt(part)-1:parseInt(part))}else{a["set"+f]((f=="Date")?1:0)}}if(b[11]){d=(parseInt(b[14])*60)+parseInt(b[15]);d*=((parseInt[13]=="-")?1:-1)}d-=a.getTimezoneOffset();a.setTime(a.getTime()+(d*60*1000));return a}};


var vCardParse = function(input) {
	var fields = {};
    var regexps = {
      simple: /^(version|fn|title|org)\:(.+)$/i,
      complex: /^([^\:\;]+);([^\:]+)\:(.+)$/,
      key: /item\d{1,2}\./,
      properties: /((type=)?(.+);?)+/
    }
 
    var lines = input.split('\n');
    for (n in lines) {
      line = lines[n];
      
      if(regexps['simple'].test(line))
      {
        results = line.match(regexps['simple']);
        key = results[1].toLowerCase();
        value = results[2];
        
        fields[key] = value;
      }
      
      else if(regexps['complex'].test(line))
      {
        results = line.match(regexps['complex']);
        key = results[1].replace(regexps['key'], '').toLowerCase();
        
        properties = results[2].split(';');
        properties = Array.filter(properties, function(p) { return ! p.match(/[a-z]+=[a-z]+/) });
        properties = Array.map(properties, function(p) { return p.replace(/type=/g, '') });
        
        type = properties.pop() || 'default';
        type = type.toLowerCase();
        
        value = results[3];
        value = /;/.test(value) ? [value.split(';')] : value;

        fields[key] = fields[key] || {};
        fields[key][type] = fields[key][type] || [];
        fields[key][type] = fields[key][type].concat(value);
      }
    }
    return fields;
};

var meCardParse = function(input) {
	input = input.replace(/^MECARD:/i, "");
	var fields = {};
    var regexps = {
      simple: /^(n|adr|tel|email|url)\:(.+)$/i
    }
 
    var lines = input.split(';');
    for (n in lines) {
      line = lines[n];
      
      if(regexps['simple'].test(line))
      {
        results = line.match(regexps['simple']);
        key = results[1].toLowerCase();
        value = results[2];
        if (!fields[key])
        	fields[key] = value;
      }
    }
    return fields;
};


var ui = {
	initialize: function () {
		console.log("ui.initialize");
		ui.bindEvents(true);
		ui.buildIndexPage();
	},
	bindPageEvent: function ($$, init, handler) {
		var event;
		if (init) {
			event = "pageinit";
		} else {
			$$.unbind("pageinit");
			event = "pagebeforeshow";
		}
		$$.one(event, function () {
			handler();
		});
	},
	bindEvents: function (init) {
		console.log("ui.bindEvents");
		
		if (init) {
			ui.bindPageEvent($("#add"), init, ui.buildAddPage);
			ui.bindPageEvent($("#ship"), init, ui.buildShipPage);
			ui.bindPageEvent($("#return"), init, ui.buildReturnPage);
			ui.bindPageEvent($("#report"), init, ui.buildReportPage);
			ui.bindPageEvent($("#data"), init, ui.buildDataPage);
			ui.bindPageEvent($("#options"), init, ui.buildOptionsPage);
		}
	
		ui.bindPageEvent($("#add-product-finder-brewery"), init, ui.buildAddProductFinderBrewery);
		ui.bindPageEvent($("#add-product-finder-size"), init, ui.buildAddProductFinderSize);
		ui.bindPageEvent($("#add-product-finder-search"), init, ui.buildAddProductFinderSearch);
		
		ui.bindPageEvent($("#ship-shipment-finder-date"), init, ui.buildShipShipmentFinderDate);
		ui.bindPageEvent($("#ship-shipment-finder-customer"), init, ui.buildShipShipmentFinderCustomer);
		ui.bindPageEvent($("#ship-shipment-finder-search"), init, ui.buildShipShipmentFinderSearch);
	},
	buildIndexPage: function () {
		console.log("ui.buildIndexPage");
		$("#customize [data-key]").each(function () {
			var key = $(this).attr("data-key");
			$(this).val(data.get(key));
		}).change(function () {
			var key = $(this).attr("data-key");
			data.set(key, $(this).val());
		});
		$("#customize [data-colorpicker]").each(function () {
			var input = $("[data-key=" + $(this).attr("data-colorpicker") + "]");
			$(this).farbtastic(input);
			$(this).get(0).farbtastic.input = input;
			$(this).get(0).farbtastic.linkTo(function (fb) {
				fb.input.css({
					backgroundColor: fb.color,
					color: fb.hsl[2] > 0.5 ? '#000' : '#fff'
				});
				fb.input.each(function() {
					if (this.value && this.value != fb.color) {
						this.value = fb.color;
					}
				});
				fb.input.change();
			});
		});
		$("#regenerate").bind("tap", function () {
			data.download();
		});
		$("#scan").bind("tap", function () {
			scan.qrscan(function (text) {
				text = text.replace(/[\r]/g, "");
				if (text.match(/^BEGIN:VCARD/i)) {
					var vc = vCardParse(text);
					console.log(vc);
					if (confirm("Add " + vc.fn + " to contacts?")) {
						var c = navigator.contacts.create();
						if (vc.fn) {
							c.displayName = vc.fn;
							c.nickname = vc.fn;
							var n = new ContactName();
							n.givenName = vc.fn;
							c.name = n;
						}
						for (var f in vc) {
							var h = [];
							var n = false;
							if (f == "tel") {
								n = "phoneNumbers";
							} else if (f == "email") {
								n = "emails";
							} else if (f == "adr") {
								n = "addresses";
							} else if (f == "url") {
								n = "urls";
							}
							if (!n) continue;
							for (var i in vc[f]) {
								for (var j = 0; j < vc[f][i].length; j++) {
									h.push(new ContactField(i, vc[f][i][j], true));
								}
							}
							c[n] = h;
						}
						c.save(function () {
							alert("Contact Saved");
						}, function (e) {
							alert("Could not save contact: Error " + e.code);
						});
					}
				} else if (text.match(/^MECARD:/i)) {
					var me = meCardParse(text);
					console.log(me);
					if (confirm("Add " + me.n + " to contacts?")) {
						var c = navigator.contacts.create();
						if (me.n) {
							c.displayName = me.n;
							c.nickname = me.n;
							var n = new ContactName();
							n.givenName = me.n;
							c.name = n;
						}
						if (me.tel) c.phoneNumbers = [new ContactField('mobile', me.tel, true)];
						if (me.email) c.emails = [new ContactField('work', me.email, true)];
						if (me.adr) c.addresses = [new ContactField('work', me.adr, true)];
						if (me.url) c.urls = [new ContactField('work', me.url, true)];
						
						c.save(function () {
							alert("Contact Saved");
						}, function (e) {
							alert("Could not save contact: Error " + e.code);
						})
					}
				} else {
					alert("The QR scanned does not contain contact information.");
				}
			});
		});
	},
	onUpdateQR: function (fullpath) {
		$("#meqard").empty().append('<img src="' + fullpath + '?nc=' + (new Date()).getTime() + '" />');
		$("#home").css("background-color", data.get("optionset-bgcolor"));
		$("#info h1, #info h3").css("color", data.get("optionset-fgcolor"));
		$("[data-value]").each(function () {
			var key = $(this).attr("data-value");
			$(this).text(data.get(key));
		});
		$.mobile.changePage("#home");
	}
}


var data = {
	initialize: function () {
		console.log("data.initialize");
		this.storage = window.localStorage;
		
		if (!this.get("app-setup")) {
			if (!this.get("optionset-fgcolor"))
				this.set("optionset-fgcolor", "#333333");
			if (!this.get("optionset-bgcolor"))
				this.set("optionset-bgcolor", "#ffffff");
			if (!this.get("optionset-dotshape"))
				this.set("optionset-dotshape", "blob");
			if (!this.get("contact-firstname"))
				this.set("contact-firstname", "me");
			if (!this.get("contact-lastname"))
				this.set("contact-lastname", "Qard");
			this.set("app-setup", 1);
		}
		
	    window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function (fileSystem) {
	    	fileSystem.root.getDirectory("data", {create: true, exclusive: false}, function (d) {
	    		data.directory = d;
	    		data.reader = data.directory.createReader();
	    		data.reader.readEntries(function (entries) {
	    			for (var i = 0; i < entries.length; i++) {
	    				if (entries[i].name == "meQard.png") {
	    					ui.onUpdateQR(entries[i].fullPath);
	    					return;
	    				}
	    				console.log(entries[i].name + ' ' + entries[i].isDirectory);
	    			}
    				data.download();
	    		}, function (e) {
	    			alert("Error: Could not read directory entries");
	    			console.log(e);
	    		});
	    	}, function (e) {
	    		alert("Error: Could not create application directory");
    			console.log(e);
	    	});
		}, function (e) {
	    	alert("Error: Could not request file system access");
			console.log(e);
	    });    
	},
	set: function (key, value) {
		return this.storage.setItem(key, value);
	},
	get: function (key) {
		var value = this.storage.getItem(key);
		if (value == null) {
			return "";
		}
		return value;
	},
	download: function () {
		if (navigator.network.connection.type == "none") {
			alert("You must be connected to the internet to generate your meQard. Please re-connect and try again.");
			return false;
		}
		
		$.mobile.loading("show", {theme: "a", text: "Generating meQard"});
		
		var ft = new FileTransfer();
		var path = data.directory.fullPath + "/meQard.png";
		console.log("Downloading to " + path);
		
		var url = "http://qr.jts.ec/meqard/";
		url+= "?fgcolor=" + escape(data.get("optionset-fgcolor"));
		url+= "&bgcolor=" + escape(data.get("optionset-bgcolor"));
		url+= "&dotshape=" + escape(data.get("optionset-dotshape"));
		url+= "&firstname=" + escape(data.get("contact-firstname"));
		url+= "&lastname=" + escape(data.get("contact-lastname"));
		url+= "&mobile=" + escape(data.get("contact-mobile"));
		url+= "&address1=" + escape(data.get("contact-address1"));
		url+= "&address2=" + escape(data.get("contact-address2"));
		url+= "&email=" + escape(data.get("contact-email"));
		url+= "&website=" + escape(data.get("contact-website"));
		url+= "&version=1.0";
		
		ft.download(url, path, function(e) {
			$.mobile.loading("hide");
			console.log("Successful download " + e.fullPath);
			ui.onUpdateQR(e.fullPath);
		}, function () {
			$.mobile.loading("hide");
			alert("Error: Could not generate QR card");
		});
	}
}


var scan = {
	qrscan: function (callback) {
		if (this.timeout) {
			clearTimeout(this.timeout);
		}
		this.timeout = setTimeout(function () {
			console.log("scan.qrscan");
			window.plugins.barcodeScanner.scan(function (result) {
				if (!result.cancelled && result.format == "QR_CODE") {
					callback(result.text);
				}
			}, function (error) {
				alert("Scanning failed: " + error);
			});
		}, 500);
	}
}


var app = {
	initialize: function() {
		console.log("app.initialize");
		this.bindEvents();
	},
	bindEvents: function() {
		// Bind any events that are required on startup. Common events are:
		// 'load', 'deviceready', 'offline', and 'online'.
		document.addEventListener("deviceready", this.onDeviceReady, false);
	},
	onDeviceReady: function() {
		console.log("app.onDeviceReady");
		navigator.splashscreen.hide();
		document.addEventListener("backbutton", app.onBackButton, false); // Adding the back button listener
		data.initialize();
		ui.initialize();
	},
	onBackButton: function () {
		var page = $(".ui-page-active").attr("id");
		switch (page) {
		case "home":
			navigator.app.exitApp();
			break;
		default:
			$.mobile.changePage("#home");
			break;
		}
	}
};

