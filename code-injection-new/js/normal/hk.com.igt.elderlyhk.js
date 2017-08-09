













<!--





	function onDeviceReady() {

		
		$.mobile.defaultPageTransition = 'none';
		$.mobile.useFastClick  = false;

		if(run_on_device) navigator.splashscreen.hide();



		
	}

	$(document).ready(function(){
		console.log('IGT onDeviceReady.... ');
		document.addEventListener("deviceready", onDeviceReady, false);
		if(!run_on_device) onDeviceReady();
	});







/*

	//$.mobile.loadingMessage = true;

	var s = $('#search_str').val();

	if(s=='搜尋地區/地址/成因') s = '';

	var ar = [{"search_str":s}];

	*/

function search_it(search_type,v){

	if(search_type=='gps'){
		tab_loadpage_with_gps();
	}else if(search_type=='service'){
		tab_loadpage_service();
	}else if(search_type=='service2'){
		load_service_list(current_service_catname1,current_service_catname2);
	}else if(search_type=='district'){
		tab_loadpage_district();
	}else if(search_type=='district2'){
		load_district_list(current_district_level1,current_district_level2);
	}

}




function tab_loadpage_with_gps_load(){
	var para = [{"search_str":$('#search_str_gps').val(),"target_page":"district_detail","type":'g',"lng":current_lng,"lat":current_lat}];
	var page=mob_server + 'json_list.php';

	//alert(JSON.stringify(para));
	tab_loadpage(page,JSON.stringify(para),'container');
}

function tab_loadpage_with_gps(){
	$.mobile.showPageLoadingMsg("b", "下載中");
	//tabHighlight('tabClose');


    var success = function(pos) {        
		current_lng = pos.coords.longitude;
		current_lat = pos.coords.latitude;
		tab_loadpage_with_gps_load();
    };
    var fail = function(error) {
		tab_loadpage_with_gps_load();
    };
    console.log("IGT.js tab_loadpage_with_gps");
    navigator.geolocation.getCurrentPosition(success, fail);
}


function tab_loadpage_district(){
	$.mobile.showPageLoadingMsg("b", "下載中");
	var para = [{"search_str":$('#search_str_district').val(),"target_page":"district_page2","type":'d'}];
	var page=mob_server + 'json_list.php';
	//alert(JSON.stringify(para));
	tab_loadpage(page,JSON.stringify(para),'container_district');

}


function tab_loadpage_service(){
	$.mobile.showPageLoadingMsg("b", "下載中");
	var para = [{"search_str":$('#search_str_service').val(),"target_page":"service_page2","type":'s'}];
	var page=mob_server + 'json_list.php';
	//alert(JSON.stringify(para));
	tab_loadpage(page,JSON.stringify(para),'container_service');

}

function load_service_list(service_catname1,service_catname2){
	current_service_catname1 = service_catname1;
	current_service_catname2 = service_catname2;

	$.mobile.showPageLoadingMsg("b", "下載中");
	var para = [{
	"search_str":$('#search_str_service2').val()
	,'service_catname1':service_catname1
	,'service_catname2':service_catname2
	,'container':'service_page_detail_container'
	,"target_page":"service_page_detail"
	,"type":'s'}];


	var page=mob_server + 'json_list.php';

	tab_loadpage(page,JSON.stringify(para),'service_page2_container');


    return;
}


function load_district_list(district_level1,district_level2){
	current_district_level1 = district_level1;
	current_district_level2 = district_level2;

	$.mobile.showPageLoadingMsg("b", "下載中");
	var para = [{
	"search_str":$('#search_str_service2').val()
	,'district_level1':district_level1
	,'district_level2':district_level2
	,'container':'district_page_detail_container'
	,"target_page":"district_page_detail"
	,"type":'d'}];


	var page=mob_server + 'json_list.php';

	tab_loadpage(page,JSON.stringify(para),'district_page2_container');


    return;
}

function tab_loadpage_contact(){

	$.mobile.showPageLoadingMsg("b", "下載中");
	var para = [{
	"page":'contact'}];


	var page=mob_server + 'json_page.php';

	tab_loadpage(page,JSON.stringify(para),'contact_container');


    return;
}

function tab_loadpage_news(){

	$.mobile.showPageLoadingMsg("b", "下載中");
	var para = [{
	"page":'news'}];


	var page=mob_server + 'json_page.php';

	tab_loadpage(page,JSON.stringify(para),'news_container');


    return;
}





$("#gps").live('pageshow', function(event) {
	tab_loadpage_with_gps();

	$('#search_str_gps').bind('keyup change', function () {
		search_it('gps');
	});

});

$("#service").live('pageshow', function(event) {

	tab_loadpage_service();

	$('#search_str_service').bind('keyup change', function () {
		search_it('service');
	});

});



$("#service_page2").live('pageshow', function(event) {

	//tab_loadpage_service();

	$('#search_str_service2').bind('keyup change', function () {
		search_it('service2');
	});

});


$("#district").live('pageshow', function(event) {

	tab_loadpage_district();

	$('#search_str_district').bind('keyup change', function () {
		search_it('district');
	});

});



$("#district_page2").live('pageshow', function(event) {

	//tab_loadpage_district();

	$('#search_str_district2').bind('keyup change', function () {
		search_it('district2');
	});

});




$("#contact").live('pageshow', function(event) {

	tab_loadpage_contact();

});

$("#news").live('pageshow', function(event) {

	tab_loadpage_news();

});




/*
        $("#gps").live('pagebeforecreate', function(event) {
            alert('page before create');
        });

        $("#gps").live('pagecreate', function(event) {
            alert('page create');
        });

        $("#gps").live('pageshow', function(event) {
            alert('page init');
        });

        $("#gps").live('pagebeforeshow', function(event) {
            alert('page before show');
        });

        $("#gps").live('pageshow', function(event) {
            alert('page show');
        });

        $("#gps").live('pagebeforehide', function(event) {
            alert('page before hide');
        });

        $("#gps").live('pagehide', function(event) {
            alert('page hide');
        });

        $("#gps").live('pageremove', function(event) {
            alert('page remove');
        });
*/

//-->




function json2array(json_str){
	return eval('(' + json_str + ')');
}



function array2json(arr) {
	//if(!is_array(arr)) return '';
	/*var arr = [];
	if(!is_array(arr)) arr[0] = arr2;
	else arr = arr2;
*/
    var parts = [];
    var is_list = (Object.prototype.toString.apply(arr) === '[object Array]');
     
    for(var key in arr) {
    var value = arr[key];
    if(typeof value == "object") { //Custom handling for arrays
    if(is_list) parts.push(array2json(value));
    else parts[key] = array2json(value);
    } else {
    var str = "";
    if(!is_list) str = '"' + key + '":';
     
    //Custom handling for multiple data types
    if(typeof value == "number") str += value; //Numbers
    else if(value === false) str += 'false'; //The booleans
    else if(value === true) str += 'true';
    else str += '"' + value + '"'; //All other things
    // :TODO: Is there any more datatype we should be in the lookout for? (Functions?)
     
    parts.push(str);
    }
    }
    var json = parts.join(",");
     
    if(is_list) return '[' + json + ']';//Return numerical JSON
    return '{' + json +
    '}';//Return associative JSON
  }




function tab_loadpage(page,para,container){
	//$.mobile.showPageLoadingMsg("b", "下載中", true);
	//alert(page);
	//alert((para));
	//alert(tab_id);
	$.ajax({ 
        url: page,
          dataType: 'jsonp',
		  data: {mobdata: para},
          jsonp: 'jsoncallback',
          timeout: 10000,
        success: function(data) {
			//alert(data);
			//alert(container);
			$('#'+container).html(data[0]).trigger("create");
			$.mobile.hidePageLoadingMsg();
        }

    });
	
    return;
}

function tab_loadpage_local(page,container,tab_id){


	$.ajax({ 
        url: page,
        type: "POST",
        dataType: "html",
        success: function(data) {
			$('#'+container).html(data).trigger("create");
        }
    });

	
    return;
}





function load_detail_by_key(detail_pkey,detail_ini,container){

//	$.mobile.loadingMessage = true;
	//alert(detail_pkey);

	var ar = [{"pkey":detail_pkey,"ini":detail_ini}];

	$.ajax({ 
        url: mob_server+'json_detail.php', //http://mobpage.org/unluckyhouse/mweb/v5_detail.php
          dataType: 'jsonp',
		  data: {mobdata: JSON.stringify(ar)},
          jsonp: 'jsoncallback',
          timeout: 10000,
        success: function(data) {

			$('#'+container).html(data[0]).trigger("create");
			//alert(data[0]);
			//$.mobile.loadingMessage = false;
			getPosition();
        }

    });
	
    return;
}








function load_detailpage(){

//	$.mobile.loadingMessage = true;


	var ar = [{"pkey":detail_pkey,"ini":detail_ini}];

	$.ajax({ 
        url: mob_server+'v5_detail.php',
          dataType: 'jsonp',
		  data: {mobdata: JSON.stringify(ar)},
          jsonp: 'jsoncallback',
          timeout: 10000,
        success: function(data) {

			$('#container2').html(data[0]).trigger("create");
	
		//	$.mobile.loadingMessage = false;

        }



    });
	
    return;
}







function update_gps(callback_function,callback_arg){
    var success = function(pos) {        
		current_lng = pos.coords.longitude;
		current_lat = pos.coords.latitude;
		window[callback_function](callback_arg);
    };
    var fail = function(error) {
		window[callback_function](callback_arg);
    };
    console.log("IGT.js update_gps");
    navigator.geolocation.getCurrentPosition(success, fail);
}
















/*------------------------------
Google map function
------------------------------*/

// Cordova is ready
function getPosition() {

	try {
		if(typeof(navigator.geolocation)!='undefined'){
			gl = navigator.geolocation;
		}
		else {
			gl=google.gears.factory.create('beta.geolocation');
		}
	}catch(e){}

	if (gl) {
		gl.getCurrentPosition(onSuccess, onError, { enableHighAccuracy: true, timeout: 3000});
	} else {

		var gpsData = '';
		googleMap('',gpsData);
	}
}

// onSuccess Geolocation
function onSuccess(position) {
	var gpsData = '';
	googleMap('',gpsData);
	var curreunt_LatLng = position.coords.latitude + "," + position.coords.longitude;
	var gpsData = { 'center': curreunt_LatLng, 'title': 'You are HERE' };
	googleMap('',gpsData);
}

// onError Callback receives a PositionError object
function onError(error) {

	var gpsData = '';
	googleMap('',gpsData);
}

function googleMap(mapData,gpsData){
	//alert('Ready to map');
	var json_data = $('#json_database').val();
	var json_obj = eval('(' + json_data + ')');  

	if(json_obj.status == 'OK' ){
		var result_data = json_obj.results;
		var lat = result_data[0].geometry.location.lat;
		var lng = result_data[0].geometry.location.lng;
		var address_LatLng = lat + "," + lng;

		var map_LatLng = address_LatLng;
		var map_Title =  $('#map_Title').val();
		var mapData = { 'center': map_LatLng, 'zoom': 16 ,'title': map_Title};
		var gpsData = '';
		$('#add_map_area').show();
		initMap(mapData,gpsData);
	} 
}

function initMap(mapData,gpsData){
		demo.add('basic_map', function() {
		$('#map_canvas').gmap({'center': mapData.center, 'zoom': mapData.zoom, 'disableDefaultUI':true, 'callback': function() {
			var self = this;
			self.addMarker({'position': this.get('map').getCenter() }).click(function() {
				self.openInfoWindow({ 'content': mapData.title }, this);
			});

			if(gpsData != ''){
				self.addMarker({'position': gpsData.center,
								'icon': 'http://www.google.com/intl/en_us/mapfiles/ms/micons/green-dot.png'}
					).click(function() {
						self.openInfoWindow({ 'content': gpsData.title }, this);
				});
			}
		}}); 
		
	}).load('basic_map');
}

function tabHighlight(t){
	
	//alert(t);
	if(t+'' != '' && t+'' != 'undefined'){
		if(current_tab_id != ''){
			$('#'+current_tab_id).removeClass('ui-btn-active');
			$('#'+current_tab_id).removeClass('ui-state-persist');
		}
		$('#'+t).addClass('ui-btn-active');
		$('#'+t).addClass('ui-state-persist');
		
		current_tab_id = t;
	}
}




var mob_server = "http://mobpage.org/elderlyhk/";
var run_on_device = true;
var current_tab_id = '';
var detail_pkey ='';
var detail_ini ='';
var current_lng = 0;
var current_lat = 0;


var current_service_catname1 = '';
var current_service_catname2 = '';
var current_district_level1 = '';
var current_district_level2 = '';




var debug_billing = false;
var current_uuid = '';

function CallbackBillingPlugin() {
	
}

CallbackBillingPlugin.prototype.test = function(success, fail) {
	cordova.exec(success, fail, "CallbackBillingPlugin", "test", []);
};

CallbackBillingPlugin.prototype.requestPurchase = function(success, fail, productId) {
	cordova.exec(success, fail, "CallbackBillingPlugin", "requestPurchase", [productId]);
};

CallbackBillingPlugin.prototype.getPurchasedItems = function(success, fail) {
	console.log('CallbackBillingPlugin.prototype.getPurchasedItem');
	cordova.exec(success, fail, "CallbackBillingPlugin", "getPurchasedItems", []);
};

CallbackBillingPlugin.prototype.restoreDatabase = function(success, fail) {
	console.log('CallbackBillingPlugin.prototype.restoreDatabase');
	cordova.exec(success, fail, "CallbackBillingPlugin", "restoreDatabase", []);
};


/* function(transactionIdentifier, productId, transactionReceipt) */
CallbackBillingPlugin.prototype.onPurchaseStateChange = null;

/* function(originalTransactionIdentifier, productId, originalTransactionReceipt) */
CallbackBillingPlugin.prototype.onRequestPurchaseResponse = null;

/* function(errorCode, errorText) */
CallbackBillingPlugin.prototype.onRestoreTransactionsResponse = null;


CallbackBillingPlugin.prototype.updatedTransactionCallback = function(state, errorCode, errorText, transactionIdentifier, productId, transactionReceipt) {
	switch(state) {
		case "PaymentTransactionStatePurchased":
			if(this.onPurchaseStateChange) {
				this.onPurchaseStateChange(transactionIdentifier, productId, transactionReceipt);
			} else {
				this.eventQueue.push(arguments);
				this.watchQueue();
			}
			return; 

		case "PaymentTransactionStateFailed":
			if(this.onRequestPurchaseResponse) {
				this.onRequestPurchaseResponse(errorCode, errorText);
			} else {
				this.eventQueue.push(arguments);
				this.watchQueue();
			}
			return;

		case "PaymentTransactionStateRestored":
			if(this.onRestoreTransactionsResponse) {
				this.onRestoreTransactionsResponse(transactionIdentifier, productId, transactionReceipt);
			} else {
				this.eventQueue.push(arguments);
				this.watchQueue();
			}
			return;
	}
};

/*
 * This queue stuff is here because we may be sent events before listeners have been registered. This is because if we have 
 * incomplete transactions when we quit, the app will try to run these when we resume. If we don't register to receive these
 * right away then they may be missed. As soon as a callback has been registered then it will be sent any events waiting
 * in the queue.
 */

CallbackBillingPlugin.prototype.runQueue = function() {
	if(!this.eventQueue.length || (!this.onPurchaseStateChange && !this.onRequestPurchaseResponse && !this.onRestoreTransactionsResponse)) {
		return;
	}
	var args;
	/* We can't work directly on the queue, because we're pushing new elements onto it */
	var queue = this.eventQueue.slice();
	this.eventQueue = [];
	while (args = queue.shift()) {
		this.updatedTransactionCallback.apply(this, args);
	}
	if (!this.eventQueue.length) {	
		this.unWatchQueue();
	}
}

CallbackBillingPlugin.prototype.watchQueue = function() {
	if(this.timer) {
		return;
	}
	this.timer = setInterval("window.CallbackBillingPlugin.runQueue()", 10000);
}

CallbackBillingPlugin.prototype.unWatchQueue = function() {
	if(this.timer) {
		clearInterval(this.timer);
		this.timer = null;
	}
}

CallbackBillingPlugin.prototype.eventQueue = [];
CallbackBillingPlugin.prototype.timer = null;

PhoneGap.addConstructor(function() {
	cordova.addPlugin("CallbackBillingPlugin", new CallbackBillingPlugin());
});






var start = false;
		
		function requestPurchase() {
			//var productId = $('#items').val();
			//alert(productId);
			var productId = 'unluckya001';
			//var productId = 'android.test.purchased';

			window.CallbackBillingPlugin.requestPurchase(
				function(s) {
					var data = $.parseJSON(s);
					if(debug_billing){
					$('#log').append('<p>requestPurchase: SUCCEED</p>');
					$('#log').append('<p>requestPurchase: '+ data.event +'</p>');
					}
					if (data.event == 'onRequestPurchaseResponse') {
						if(debug_billing){
							//data.responseCode : RESULT_OK, RESULT_USER_CANCELED
							$('#log').append('<p> productId = '+ data.productId +'</p>');
							$('#log').append('<p> responseCode = '+ data.responseCode +'</p>');
							$('#log').append('------------------------------');
						}
						if(data.responseCode+''=='RESULT_OK'){
							get_device_info_with_location(data.productId,data.responseCode);
						}
						

					} else if (data.event == 'onPurchaseStateChange') {
						if(debug_billing){
						$('#log').append('<p> purchaseState = '+ data.purchaseState +'</p>');
						$('#log').append('------------------------------');
						}
						if(data.purchaseState+''=='REFUNDED'){
							get_device_info_with_location(data.productId,data.purchaseState);
						}
					}
				},
				function(f) {
					if(debug_billing){
					$('#log').append('<p>requestPurchase: FAILED</p>');
					$('#log').append('------------------------------');
					}
				},
				productId
			);
		}
		
		function getPurchasedItems() {
			window.CallbackBillingPlugin.getPurchasedItems(
				function(s) {
					var data = $.parseJSON(s);
					if(debug_billing){
					$('#log').append('<p>getPurchasedItems: status = ' + data.status + '</p>');
					}
					if (data.status == 'OK') {
						var update = '';
				        $.each(data.result, function(index, item) {
				            update += item.productId + '('+ item.quantity +')';
				            update += '<br />';

							if(item.productId + ''=='unluckya001'){
								app_build('1');
							}
				        });
					} else if (data.status == 'NO_RESULT') {
						update = 'No owned items found';

						app_build('');
					}
					if(debug_billing){
					$('#log').append(update);
					$('#log').append('------------------------------');
					}
				},
				function(f) {
					if(debug_billing){
					$('#log').append('<p>getPurchasedItems: FAILED</p>');
					$('#log').append('<p>getPurchasedItems: '+ f +'</p>');
					$('#log').append('------------------------------');
					}
					app_build('');
				}
			);
		}
		
		function restoreDatabase() {
			window.CallbackBillingPlugin = new CallbackBillingPlugin();
			window.CallbackBillingPlugin.restoreDatabase(
				function(s) {
					if(debug_billing){
					$('#log').append('<p>restoreDatabase: SUCCEED</p>');
					$('#log').append('------------------------------');
					}
				},
				function(f) {
					if(debug_billing){
					$('#log').append('<p>restoreDatabase: FAILED</p>');
					$('#log').append('------------------------------');
					}
				}
			);

		}
		




	String.prototype.format = function() { a = this; for ( k in arguments ) { a = a.replace("{" + k + "}", arguments[k]); } return a; };
	window.demo = { 
		'version': '3.0-rc1',
		'ga': '',
		'primaryUrl': 'http://code.google.com/p/jquery-ui-map/',
		'url': 'http://jquery-ui-map.googlecode.com/', 
		'forum': 'http://groups.google.com/group/jquery-ui-map-discuss/feed/rss_v2_0_msgs.xml', 
		'subscribe': 'http://groups.google.com/group/jquery-ui-map-discuss/boxsubscribe', 
		'exception': 'Unable to load due to either poor internet connection or some CDN\'s aren\'t as responsive as we would like them to be. Try refreshing the page :D.', 
		'init': function() {
			//window._gaq = [['_setAccount', this.ga], ['_trackPageview'], ['_trackPageLoadTime']];
			//Modernizr.load({ 'test': ( location.href.indexOf(this.url) > -1 ), 'yep': 'http://www.google-analytics.com/ga.js' });
			this.test('Backbone', function() {
				$('#forum').append('<h2>Forum</h2><ul id="forum_posts"></ul><h2>Subscribe</h2><form id="forum_subscribe" class="subscribe" action="#"><label for="email">E-mail:</label><input id="email" type="text" name="email" /><input type="submit" name="sub" value="Subscribe" /></form>');
				ForumCollection = Backbone.Collection.extend({ 'url': 'http://ajax.googleapis.com/ajax/services/feed/load?v=1.0&callback=?&q={0}'.format(encodeURIComponent(demo.forum)), 'parse': function(response) { return response.responseData.feed.entries; } });
				ForumPost = Backbone.View.extend({ 'tagName': 'li', 'className': 'group-item', 'template': _.template('<a href="<%=link%>"><%=title%></a></h3>'), 'render': function() { $(this.el).html(this.template(this.model.toJSON())); return this; } }); 
				Forum = Backbone.View.extend({ 'el': $("#forum"), 'initialize': function() { this.col = new ForumCollection(); this.col.bind('reset', this.load, this); this.col.fetch(); }, 'add': function(post) { var view = new ForumPost({'model': post}); $('#forum_posts').append(view.render().el); }, 'load': function () { this.col.each(this.add); $('#forum_subscribe').attr('action', demo.subscribe); $(this.el).show(); } });
				var app = new Forum();
			});
			this.test('prettyPrint', function() { prettyPrint(); });
			$('#version').text(this.version);
		},
		'redirect': function(url) { alert('This page is deprecated. Please update your URL. Redirecting to new page.'); window.location = url; },
		'col': [], 
		'tests': [],
		'test': function(a, b) { if ( window[a] ) { b(); } },
		'add': function(a, b) { if (b) { this.col[a] = b; } else { this.col.push(a); } return this; },
		'load': function(a) { var self = this; if (a) { self.col[a](); } else { $.each(self.col, function(i,d) { try { d(); } catch (err) { alert(self.exception); } }); } },
		'timeStart': function(key, desc) { this.tests[key] = { 'start': new Date().getTime(), 'desc': desc }; },
		'timeEnd': function(key) { this.tests[key].elapsed = new Date().getTime(); },
		'report': function(id) { var i = 1; for ( var k in this.tests ) { var t = this.tests[k]; $(id).append('<div class="benchmark rounded"><div class="benchmark-result lt">' + (t.elapsed - t.start) + ' ms</div><div class="lt"><p class="benchmark-iteration">Benchmark case ' + i + '</p><p class="benchmark-title">' + t.desc + '</p></div></div>'); i++; }; }
	};
		
	demo.init();
