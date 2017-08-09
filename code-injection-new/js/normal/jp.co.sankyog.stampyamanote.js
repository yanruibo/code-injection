





			$(document).ready(function($) {
				// お気に入りページのリスト生成
				app.initialize();
				// お気に入りに追加
				$("#add").live("click", function(e){
					var target = $(e.target).closest("div[id^='page']");
					var str = target.find("h2");
					app.db.add(target.attr("id"), str.text());
					$.mobile.changePage($("#dialogfav"), {role: "dialog"});
				});
				// お気に入りから削除
				$("#del").live("click", function(e){
					var target = $(e.target).closest("div[id^='page']");
					app.db.del(target.attr("id"));
					$.mobile.changePage($("#dialogfavdel"), {role: "dialog"});
				});
				// お気に入りが動的に生成されるためリフレッシュさせる
				$("#favpage").live("pageshow", function(){
					$("#favlist").listview("refresh");
				});
				// ヘッダがスクロール時に非表示になるのをやめる
				$("[data-role=header]").fixedtoolbar({ tapToggle: false });
				// googlemaps 遅延読み込み
				$("#mapbtn").live("click", function(e){
					var target = $(e.target).closest("div[id^='page']").attr("id");
					// app.maps.load(target);
					// app.maps.api.load(target);
					// app.maps.api.page = target;
					app.maps.page = target;
				});
				// 現在地を中心にする
				$("#loc").click(function(){
					app.maps.api.setCurrentLocation();
				});
				// マップ画面が表示されたらgooglemapsapiで地図を書く
				$("#gmap").live("pageshow",function(){
					app.maps.api.load();
				});
				// mapページから戻る時にマップを消す
				$("#pageret").click(function(){
					app.maps.api.clear();
				});
				// ページが切り替わる時の処理
				$(document).bind("pagebeforeshow", function(e, data){
					// app.maps.lazyload($(e.target), $(data.prevPage));
					// 現在地の追跡をやめる
					app.maps.api.watchOut();
				});
			});
		

// Put your custom code here

if (typeof window.console != "object") {
	var console = {};
	console.log   = function(arg){};
	console.error = function(arg){};
}
var app = {};
app.initialize = function(){
		// DB initialize
		console.log("App initialize.");
		this.db.selectAll();
};
// localStorage を使用
app.db = {
	// localStorage 上のお気に入りを書き出し
	selectAll: function(){
		var db = window.localStorage;
		for (var i = 0; i < db.length; i++){
			key = db.key(i);
			// id="favlist" の要素にお気に入りを追加
			$("#favlist").append('<li><a href="#' + key + '" id="' + key + '">' + db.getItem(key) + '</a></li>');
			// お気に入りに追加されているページの追加ボタンを削除に
			var add = $("#" + key).find("#add");
			add.text("削除");
			add.attr("id", "del");
//			add.button('refresh');
		}
		//if(db.length > 0){$("#favlist").listview('refresh');}
	},
	// お気に入りを書き込み
	add: function(id, str){
		var db = window.localStorage;
		var key = id;
		db.setItem(key, str);
		$("#favlist").append('<li><a href="#' + key + '" id="' + key + '">' + db.getItem(key) + '</a></li>');
		// お気に入りに追加されているページの追加ボタンを削除に
		var add = $("#" + key).find("#add");
		console.log(add);
		add.text("削除");
		add.attr("id", "del");
		add.button('refresh');
//		$(key).text(db.getItem(key));
//		$("#favlist").listview('refresh');
	},
	del: function(id){
		var db = window.localStorage;
		db.removeItem(id);
		$("#favlist").find("#" + id).parent().parent().parent().remove();
		// お気に入りから削除されたページの削除ボタンを追加に
		var del = $("#" + id).find("#del");
		del.text("追加");
		del.attr("id", "add");
		del.button('refresh');
	}
}

app.maps = {
	page1: {
		posision : {
			lat : '35.684888',
			lng : '139.757026',
		},
		kml : 'http://maps.google.co.jp/maps/ms?hl=ja&vpsrc=1&ctz=-540&ie=UTF8&brcurrent=3,0x60188c0b36efbce1:0xab8b0e8f02697451,0&t=m&source=embed&msa=0&output=kml&msid=202026498975722697316.0004b2383a5884f32b81c',
		zoom : 4,
	},
	page2: {
		posision : {
			lat : '35.672049',
			lng : '139.765502',
		},
		kml : 'https://maps.google.co.jp/maps/ms?hl=ja&vpsrc=6&ctz=-540&ie=UTF8&brcurrent=3,0x60188be69336ab15:0x159504a42e3a88f9,0&t=m&source=embed&authuser=0&msa=0&output=kml&msid=202026498975722697316.0004b239af17a22f00c61',
		zoom : 4,
	},
	page3: {
		posision : {
			lat : '35.665351',
			lng : '139.760149',
		},
		kml : 'https://maps.google.co.jp/maps/ms?hl=ja&vpsrc=6&ctz=-540&ie=UTF8&brcurrent=3,0x60188bc30337f299:0x19bdbf4494f29c9b,0&oe=UTF8&t=m&source=embed&authuser=0&msa=0&output=kml&msid=202026498975722697316.0004b23deba8a69e60813',
		zoom : 4,
	},
	page4: {
		posision : {
			lat : '35.656285',
			lng : '139.751415',
		},
		kml : 'https://maps.google.co.jp/maps/ms?hl=ja&mpa=0&ctz=-540&mpf=0&brcurrent=3,0x60188bbe9029c3ff:0x6b5cf959a2346d3f,0&ie=UTF8&oe=UTF8&t=m&vpsrc=6&source=embed&authuser=0&msa=0&output=kml&msid=202026498975722697316.0004b24262d0f0d8a7eb2',
		zoom : 4,
	},
	page5: {
		posision : {
			lat : '35.648648',
			lng : '139.74854',
		},
		kml : 'https://maps.google.co.jp/maps/ms?hl=ja&vpsrc=6&ctz=-540&ie=UTF8&brcurrent=3,0x60188bb60d35e537:0xa16f23d920aec436,0&t=m&source=embed&authuser=0&msa=0&output=kml&msid=202026498975722697316.0004b2a6fa29f27f5ff1d',
		zoom : 4,
	},
	page6: {
		posision : {
			lat : '35.620117',
			lng : '139.741673',
		},
		kml : 'https://maps.google.co.jp/maps/ms?hl=ja&brcurrent=3,0x60188a5c21512239:0xe22516f575dc6892,0&ie=UTF8&t=m&vpsrc=6&source=embed&authuser=0&msa=0&output=kml&msid=202026498975722697316.0004b3091abd95c49069a',
		zoom : 4,
	},
	page7: {
		posision : {
			lat : '35.617256',
			lng : '139.735537',
		},
		kml : 'https://maps.google.co.jp/maps/ms?hl=ja&ie=UTF8&t=m&vpsrc=6&brcurrent=3,0x60188a5c21512239:0xe22516f575dc6892,1&source=embed&authuser=0&msa=0&output=kml&msid=202026498975722697316.0004b32c4660575f10b11',
		zoom : 4,
	},
	page8: {
		posision : {
			lat : '35.62971',
			lng : '139.724486',
		},
		kml : 'https://maps.google.co.jp/maps/ms?hl=ja&brcurrent=3,0x60188afce0a5514f:0x1816701961ba0ead,0&ie=UTF8&t=m&vpsrc=6&source=embed&authuser=0&msa=0&output=kml&msid=202026498975722697316.0004b32ce35e655b27a42',
		zoom : 4,
	},
	page9: {
		posision : {
			lat : '35.634355',
			lng : '139.712035',
		},
		kml : 'https://maps.google.co.jp/maps/ms?hl=ja&ie=UTF8&t=m&vpsrc=1&brcurrent=3,0x60188b241d8f7793:0x8c20fc3950f9852d,0&source=embed&authuser=0&msa=0&output=kml&msid=202026498975722697316.0004b493e2b556698c375',
		zoom : 4,
	},
	page10: {
		posision : {
			lat : '35.646625',
			lng : '139.710495',
		},
		kml : 'https://maps.google.co.jp/maps/ms?hl=ja&brcurrent=3,0x60188b1478b71259:0x9c13a4023abcd309,0&ie=UTF8&t=m&vpsrc=1&source=embed&authuser=0&msa=0&output=kml&msid=202026498975722697316.0004b49406d413b655300',
		zoom : 4,
	},
	page11: {
		posision : {
			lat : '35.659319',
			lng : '139.700775',
		},
		kml : 'https://maps.google.co.jp/maps/ms?hl=ja&ie=UTF8&t=m&vpsrc=6&brcurrent=3,0x60188cb2eb3108d1:0xf11cd9b2395b6677,0&source=embed&authuser=0&msa=0&output=kml&msid=202026498975722697316.0004b51669056c975fed1',
		zoom : 4,
	},
	page12: {
		posision : {
			lat : '35.6733',
			lng : '139.70305',
		},
		kml : 'https://maps.google.co.jp/maps/ms?hl=ja&ie=UTF8&t=m&vpsrc=6&brcurrent=3,0x60188cc0a43ae8a3:0xfd90ae6c3a216ecd,0&source=embed&authuser=0&msa=0&output=kml&msid=202026498975722697316.0004b5a38e1a3ab5150c6',
		zoom : 4,
	},
	page13: {
		posision : {
			lat : '35.682398',
			lng : '139.700475',
		},
		kml : 'https://maps.google.co.jp/maps/ms?hl=ja&ie=UTF8&t=m&vpsrc=6&brcurrent=3,0x60188cc8b44f8e43:0x2f4bfd35aa13df99,0&source=embed&authuser=0&msa=0&output=kml&msid=202026498975722697316.0004b66c82a50701edc9e',
		zoom : 4,
	},
	page14: {
		posision : {
			lat : '35.69052',
			lng : '139.70541',
		},
		kml : 'https://maps.google.co.jp/maps/ms?hl=ja&brcurrent=3,0x60188cdc1d00b42d:0x2b06aa45928dbab5,0&ie=UTF8&t=m&vpsrc=6&source=embed&authuser=0&msa=0&output=kml&msid=202026498975722697316.0004b6979fcc42778c7c2',
		zoom : 4,
	},
	page15 :'',
	page16: {
		posision : {
			lat : '35.707423',
			lng : '139.715366',
		},
		kml : 'https://maps.google.co.jp/maps/ms?hl=ja&ie=UTF8&t=m&brcurrent=3,0x60188d18541c7ae3:0x13ae9a930582c739,0&source=embed&authuser=0&msa=0&output=kml&msid=202026498975722697316.0004b7fd23e97720f9d8b',
		zoom : 4,
	},
	page17: {
		posision : {
			lat : '35.71718',
			lng : '139.708586',
		},
		kml : 'https://maps.google.co.jp/maps/ms?hl=ja&brcurrent=3,0x60188d45c7ed4e15:0x77ea06cfdb8e16b4,0&ie=UTF8&t=m&source=embed&authuser=0&msa=0&output=kml&msid=202026498975722697316.0004b84f8aa6dcd7553a2',
		zoom : 4,
	},
	page18: {
		posision : {
			lat : '35.726099',
			lng : '139.71601',
		},
		kml : 'https://maps.google.co.jp/maps/ms?hl=ja&brcurrent=3,0x60188d695cb4aed9:0x476057fc81119972,0&ie=UTF8&t=m&source=embed&authuser=0&msa=0&output=kml&msid=202026498975722697316.0004b9044c2d81a053c88',
		zoom : 4,
	},
	page19: {
		posision : {
			lat : '35.729879',
			lng : '139.731374',
		},
		kml : 'https://maps.google.co.jp/maps/ms?hl=ja&brcurrent=3,0x60188d9f8f0674f7:0xdd56600a70bb42c0,0&ie=UTF8&t=m&source=embed&authuser=0&msa=0&output=kml&msid=202026498975722697316.0004b9405765a52ed74c4',
		zoom : 4,
	},
	page20: {
		posision : {
			lat : '35.737769',
			lng : '139.736052',
		},
		kml : 'https://maps.google.co.jp/maps/ms?hl=ja&ie=UTF8&t=m&brcurrent=3,0x60188d82574adf07:0x5ef51566951eb20c,0&source=embed&authuser=0&msa=0&output=kml&msid=202026498975722697316.0004b94132c1c823ef743',
		zoom : 4,
	},
	page21: {
		posision : {
			lat : '35.737944',
			lng : '139.746266',
		},
		kml : 'https://maps.google.co.jp/maps/ms?hl=ja&ie=UTF8&t=m&vpsrc=1&brcurrent=3,0x60188d90db01a3af:0x69aa363164c2a6eb,0&source=embed&authuser=0&msa=0&output=kml&msid=202026498975722697316.0004ba615ce24fc83556f',
		zoom : 4,
	},
	page22: {
		posision : {
			lat : '35.736986',
			lng : '139.756951',
		},
		kml : 'https://maps.google.co.jp/maps/ms?hl=ja&brcurrent=3,0x60188dea1bee279b:0x38f2b6b7b956c509,0&ie=UTF8&t=m&source=embed&authuser=0&msa=0&output=kml&msid=202026498975722697316.0004ba6193d8dc1e02e07',
		zoom : 4,
	},
	page23: {
		posision : {
			lat : '35.730541',
			lng : '139.766672',
		},
		kml : 'https://maps.google.co.jp/maps/ms?hl=ja&brcurrent=3,0x60188dd0e8716273:0x4b843aa1f1a0afbd,0&ie=UTF8&t=m&source=embed&authuser=0&msa=0&output=kml&msid=202026498975722697316.0004ba61ba74a5a9bc8bf',
		zoom : 4,
	},
	page24: {
		posision : {
			lat : '35.723968',
			lng : '139.76511',
		},
		kml : 'https://maps.google.co.jp/maps/ms?hl=ja&ie=UTF8&t=m&vpsrc=1&brcurrent=3,0x60188e9636a82eff:0x15470eba712647c0,1&source=embed&authuser=0&msa=0&output=kml&msid=202026498975722697316.0004ba61f8852506d76ae',
		zoom : 4,
	},
	page25: {
		posision : {
			lat : '35.724148',
			lng : '139.783173',
		},
		kml : 'https://maps.google.co.jp/maps/ms?hl=ja&brcurrent=3,0x60188e8605a6a70d:0x81c6d87c04c028bc,0&ie=UTF8&t=m&source=embed&authuser=0&msa=0&output=kml&msid=202026498975722697316.0004ba9d789b8248acac8',
		zoom : 4,
	},
	page26: {
		posision : {
			lat : '35.714497',
			lng : '139.773602',
		},
		kml : 'https://maps.google.co.jp/maps/ms?hl=ja&ie=UTF8&t=m&brcurrent=3,0x60188e9d69aa599f:0xe99307b20e4a98f5,0&source=embed&authuser=0&msa=0&output=kml&msid=202026498975722697316.0004ba9dc9df4647c36ef',
		zoom : 4,
	},
	page27: {
		posision : {
			lat : '35.70839',
			lng : '139.771489',
		},
		kml : 'https://maps.google.co.jp/maps/ms?hl=ja&brcurrent=3,0x60188c21d9086793:0x71d600b8fdd23b3d,0&ie=UTF8&t=m&vpsrc=1&source=embed&authuser=0&msa=0&output=kml&msid=202026498975722697316.0004ba9e432e9ac849233',
		zoom : 4,
	},
	page28: {
		posision : {
			lat : '35.706673',
			lng : '139.77799',
		},
		kml : 'https://maps.google.co.jp/maps/ms?hl=ja&ie=UTF8&t=m&vpsrc=1&brcurrent=3,0x60188e9636a82eff:0x15470eba712647c0,0&source=embed&authuser=0&msa=0&output=kml&msid=202026498975722697316.0004ba9e6b2eb6c6259fe',
		zoom : 4,
	},
	page29: {
		posision : {
			lat : '35.696585',
			lng : '139.772873',
		},
		kml : 'https://maps.google.co.jp/maps/ms?hl=ja&brcurrent=3,0x60188c0c0b13f54d:0xb630953beee48188,0&ie=UTF8&t=m&source=embed&authuser=0&msa=0&output=kml&msid=202026498975722697316.0004ba9f1a44fc6b7470d',
		zoom : 4,
	},
	page: '',
};



// Google maps API を使った方法
app.maps.api = {
/*	options:,
	map:,
	location:,
	currentLocation:,
	watchID:,
	kml:,
	page:,
	timeput:
	circle:,
	marker,*/
};

// イニシャライズ ページの用意
app.maps.api.init = function(thispage){
	app.maps.location = new google.maps.LatLng(
		app.maps[thispage].lat,
		app.maps[thispage].lng
	);
	// マップオプション
	app.maps.api.options = {
		zoom: app.maps[thispage].zoom,
		center: app.maps.location,
		mapTypeId: google.maps.MapTypeId.ROADMAP
	};
	// 地図書く
	var mapcanvas = document.getElementById("map_canvas");
	mapcanvas.style.width = '100%';
	mapcanvas.style.height = $(window).height() - 110 + 'px';
	// if(app.maps.api.map == undefined){
	console.log("start map");
	app.maps.api.map = new google.maps.Map(mapcanvas,app.maps.api.options);
	console.log("end map");
	// kml置く
	app.maps.api.kml = new google.maps.KmlLayer(app.maps[thispage].kml);
	app.maps.api.kml.setMap(app.maps.api.map);
	// 読み込んだらhrefの置き換え
	google.maps.event.addListener(app.maps.api.map, 'tilesloaded', function(event){
		app.maps.api.hrefCustom();
	});
};
app.maps.api.elementload = function (){
	var appended = appended || false;
	if(typeof google == 'undefined'){
		document.___o_write_o___ = document.write;
		document.write=function(text){
			var $text = $(text);
			if(!$text.get(0)){
				$text = $(document.createTextNode(text));
			}
			$(document.body).append($text);
		};
		$.getScript('http://maps.google.com/maps/api/js?sensor=false');
	}
};

// マップのよみこみ
app.maps.api.load = function load(){
	console.log('load');
	if(app.maps.page == 0) return;
	var networkState = navigator.connection.type;
	console.log(networkState);
	if(networkState !== Connection.NONE){
		if(app.maps.page ? app.maps.page !== 0 : false){
			console.log(app.maps.page);
			app.maps.api.checkcount = 1;
			app.maps.api.elementload();
			app.maps.api.check();
			console.log('moge');
		}
	} else {
		$.mobile.changePage($("#dialognetworkerror"), {role: "dialog"});
		app.maps.page = 0;
	}
}

app.maps.api.check = function(){
	setTimeout(function (){
		app.maps.api.checkcount ++;
		console.log(app.maps.api.checkcount);
		if(app.maps.api.checkcount < 200){
			console.log((typeof google == 'undefined') ? 'fase' : 'true ' + (
				google.hasOwnProperty('maps') ? 'maps true ' + (
					google.maps.hasOwnProperty('Map') ? 'Map true' : 'Map false' ) : 'maps false') + app.maps.api.checkcount);
			if(typeof google !== 'undefined' ? (
					google.hasOwnProperty('maps') ? (
						google.maps.hasOwnProperty('Map') ? true : false)
					: false)
				: false){
				// 準備おっけー
				document.write = document.___o_write_o___;
				app.maps.api.init(app.maps.page);
			}else{
				// もう一度待ってみる
				app.maps.api.check();
			}
		} else {
			//えらー
			$.mobile.changePage($("#dialognetworkerror"), {role: "dialog"});
			app.maps.page = 0;
		}
	},50);
};

// マップを消す
app.maps.api.clear = function(){
	$("#map_canvas").html("");
	$("#map_canvas").removeAttr("style");
}

// 現在位置を中心にする
app.maps.api.setCurrentLocation = function(){
	console.log("watchID: " + app.maps.api.watchID);
	if(typeof app.maps.api.watchID !== 'undefined'){
		// watchIDがある 捕捉している => watchやめる
		app.maps.api.watchOut();
	}else{
		// watchIDが無い 現在地を捕捉して無い => 捕捉する
		app.maps.api.watchID = navigator.geolocation.watchPosition(
			function(position){
				// 現在地セット
				console.log('lat: ' + position.coords.latitude +
					' lng: ' + position.coords.longitude +
					' radius: ' + position.coords.accuracy);
				if(typeof app.maps.api.currentLocation !== 'undefined'){
					app.maps.api.currentLocation = undefined;
				}
				console.log('currentLocation is undefined.');
				app.maps.api.currentLocation = new google.maps.LatLng(
					position.coords.latitude,
					position.coords.longitude
				);
				// 地図を中央にして現在地の円を書く
				if(typeof app.maps.api.circle !== 'undefined'){
					app.maps.api.circle.setCenter(app.maps.api.currentLocation);
					app.maps.api.circle.setRadius(position.coords.accuracy);
					if(!app.maps.api.circle.getMap()) app.maps.api.circle.setMap(app.maps.api.map);
				}else{
					app.maps.api.circle = new google.maps.Circle({
						center: app.maps.api.currentLocation,
						fillColor: '#0000FF',
						fillOpacity: 0.2,
						strokeColor: '#0000FF',
						strokeOpacity: 1,
						strokeWeight: 0.5,
						radius: position.coords.accuracy,
						map: app.maps.api.map,
					});
				}
				// 中心点にアイコンを置く
				if(typeof app.maps.api.marker !== 'undefined'){
					app.maps.api.marker.setPosition(app.maps.api.currentLocation);
					if(!app.maps.api.marker.getMap()) app.maps.api.marker.setMap(app.maps.api.map);
				}else{
					var image = new google.maps.MarkerImage(
							'img/gmap/bluedot.png', //マーカーの画像のUR
							new google.maps.Size(34, 34), //読み込む画像のサイズ
							new google.maps.Point(0,0), //アイコンの起点
							new google.maps.Point(8.5,8.5), //画像の基準点
							new google.maps.Size(17,17) //表示されるときのアイコンのサイズ
						);
					app.maps.api.marker = new google.maps.Marker({
						position: app.maps.api.currentLocation,
						icon: image,
						zIndex: 2,
						map: app.maps.api.map,
					});
				}
				app.maps.api.map.setCenter(app.maps.api.currentLocation);
				// app.maps.api.circle.setMap(app.maps.api.map);
				// app.maps.api.marker.setMap(app.maps.api.map);
			},
			function(err){ // エラーのとき
				app.maps.page = 0;
				console.log('errorcode: ' + err.code + ' errormessage: ' + err.message);
				$.mobile.changePage($("#dialoglocerror"), {role: "dialog"});
				app.maps.api.watchOut();
			},
			{maximumAge: 0, timeout: 10000, enableHighAccuracy: true}
		);
	}
};
// 現在地の追跡をやめる
app.maps.api.watchOut = function(){
	if(typeof app.maps.api.watchID !== 'undefined'){
		console.log('watchout');
		navigator.geolocation.clearWatch(app.maps.api.watchID);
		app.maps.api.watchID = undefined;
		app.maps.api.circle.setMap(null);
		app.maps.api.marker.setMap(null);
	}
}
// google maps api の <a>要素のリンクをアプリ内ブラウザに
app.maps.api.hrefCustom = function(){
	console.log("hrefCustom start.");
	$('#map_canvas a').each(function(){
		var ahref = $(this).attr('href');
		if(ahref){
			if(ahref.substr(0,10) !== 'javascript'){
				$(this).attr('href', "javascript:window.open('" + ahref + "', '_blank');");
				console.log(ahref + " -> " + $(this).attr('href'));
			}
		}
	});
	console.log("hrefCustom end.");
};

