














<!--

window.addEventListener('load', function() {
	new FastClick(document.body);
}, false);


//-->





(function(cordova){
    var WebIntent = function() {

    };

	// 起動
	WebIntent.prototype.startActivity = function(params, success, fail, plugin) {

		return cordova.exec(
			function(args) {
				success(args);
			},
			function(args) {
				console.log("fail!!" + args);
				fail(args);
			},
			plugin, 'startActivity', [params]
		);
    };

	cordova.addConstructor(function() {
		window.webintent = new WebIntent();
		// backwards compatibility
		window.plugins = window.plugins || {};
		window.plugins.webintent = window.webintent;
	});
})(window.PhoneGap || window.Cordova || window.cordova);


/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
        //this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
};

app.initialize();


var cordova_deviceready = false;


// enable check for GPS Sensors
var NETWORK_PROVIDER = "network";
var GPS_PROVIDER = "gps";
var PASSIVE_PROVIDER = "passive";


// ①
//var SERVER = "scoopboxfront.cloud.yahoo.co.jp";
var SERVER = "scoopbox.nhk.or.jp";
//var SERVER = "nhkippou.jp"; //Sandbox

var os = "";
var on_service = "";		// サービス判定フラグ(on/off) サーバーから取得
var provide_ver = "0";		// 最新のアプリバージョン	　サーバーから取得
var local_ver = "1.0";		// このアプリのバージョン(iOS)

var webIntentMode = false;	// cordovaのnavigator.camera.getPicture()で動画が選べない時用

var ft = null;
var sTime = 0;				// アップロード開始時刻保持
var onTransfer = false;
var onServerError = false;	// アップロードサーバー上でのエラー有無

var cache_disable = true;	// 入力フォームを記憶しない系
var up_log_disable = true;	// 投稿履歴を記憶しない系
var gps_disable = true;		// GPS位置情報を投稿しない系
var gps_setting_count = 0;		// GPS設定回数

var persistentURL = "";		// 外部ストレージのhomeディレクトリを示すパス
var uploadFileURL = "";		// アップロードするファイルのパス
var uploadMimeType = "";


// 数字の先頭0埋め処理
function zero_padding(num, digits) {

	if (!digits) {
		digits = 2;
	}

	var subtract = digits - num.toString().length;

	if (subtract <= 0) {
		return num;
	}

	var result = "";
	for (i = 0; i < subtract; i++) {
		result += "0";
	}

	return "" + result + num;
}


// 日時を yyyy-mm-dd H:i で表記
function date_time_format(date) {

	var target = null;
	if (date) {
		target = date;
	} else {
		target = new Date();
	}

	trTime = "";
	trTime += target.getFullYear() + "-" + zero_padding(target.getMonth() + 1) + "-" + zero_padding(target.getDate());
	trTime += " " + zero_padding(target.getHours()) + ":" + zero_padding(target.getMinutes());

	return trTime;
}

// パスからファイル名を取得
function getFileName(file_path) {
	file_name = file_path.substring(file_path.lastIndexOf('/')+1, file_path.length);
	return file_name;
}


// バージョン形式表記のコード比較処理
// 返り値
//	  1 : target_ver > base_ver
//	  0 : target_ver = base_ver
//	 -1 : target_ver < base_ver
function judge_qualified_version(target_ver, base_ver) {

	var i = 0;
	var cnt_tar = target_ver.length;

	// base_verの区切り数を基準にループ
	for(i = 0; i < base_ver.length; i++) {
		// target_verの方が区切りが少なかったら
		if ( cnt_tar <= i ) {
			// 2.1 と 2.1.x みたいな感じ。x > 0 なら target < base 確定
			if (base_ver[i] > 0) {
				return -1;
			}

			// base_verが 3.1.0.0. ・・・みたいなふざけた指定されてても、一応最後まで走査
			for(var j = i + 1; j < base_ver.length; j++) {
				if (base_ver[i] > 0) {
					return -1;
				}
			}

			// 2.2 と 2.2.0.0.0.0 の様な不毛な結果だとここに来る
			return 0;
		}

		// 同じ階層の比較はここ
		if (target_ver[i] > base_ver[i]) {
			return 1;
		} else if (target_ver[i] < base_ver[i]) {
			return -1;
		}
	}

	// 2.0.1.0.1 と 2.0.1 みたいな判定
	for(; i < cnt_tar;	i++) {
		if (target_ver[i] > 0) {
			return 1;
		}
	}	// base_verには、もう桁がないので全て0と判断

	return 0;
}

// バージョン記述形式の文字列を配列に分割する
function ver_split(ver_cd) {

	var result = ("" + ver_cd).split('.');
	for (var i = 0; i < result.length; i++) {
		if (isNaN(result[i])) {
			result[i] = 0;

		} else {
			result[i] = parseInt(result[i]);
		}
	}

	return result;
}

// ローカルのバージョンと最新のバージョンを比較
function collate_version() {

//	alert(local_ver + " <> " + provide_ver);
	if ( judge_qualified_version(ver_split(provide_ver), ver_split(local_ver)) < 1) {
		return;
	}

	navigator.notification.alert("アプリケーションストアにてアップデートが可能です", function(){}, "新バージョンの案内", "閉じる");
}

// サービス終了をアナウンスする
function alert_service_off(func) {
	navigator.notification.alert("サービスは終了しました", function(){}, "NHKスクープBOX", "閉じる");
}

// サーバーから最新の提供バージョンNoを取得
function get_newest_version(url) {

	url = (url) ? url : "http://www3.nhk.or.jp/news/app/scoopbox/ios/config.txt";

	$.post(url, function(data) {
		var res = JSON.parse(data);
		on_service = res.service;

		// it's 整数対策 >> "" +
		if (os.match(/Android/i)) {
			provide_ver = "" + res.androidVer;

		} else if (os.match(/(iPhone|iPad|iPod)/i)) {
			provide_ver = "" + res.iOSver;
		}

		if (on_service == "off") {
			alert_service_off();
			return;
		}

		collate_version();
	});
}

// アプリのバージョンチェックを行う
function check_version() {
	// NHKのサーバーから最新のバージョンを取得
	get_newest_version();
//	get_newest_version("http://scoopbox.nhk.or.jp/sp/config.txt");

	os = device.platform.toString();
	if (os.match(/Android/i)) {

		// Actibity呼び出しで付与したGETパラメータからローカルのバージョンを取得
		if (document.location.search.length > 1) {
			var params = document.location.search.substring(1).split('&');
			for (var i = 0; i < params.length; i++ ) {
				var param = params[i].split('=');
				if (param[0] == 'ver') {
					local_ver = param[1];
					break;
				}
			}
		}

	} else if (os.match(/(iPhone|iPad|iPod)/i)) {
		// GETパラメータを付けると404食らうので、一旦local_verの初期値にバージョンを記述
	}

	console.log(os);
}


// 設定の内容を読み出す
function read_config() {
	cache_disable = (window.localStorage.getItem('cache_disable') != 0);
	$("#save_personal").attr("checked", !cache_disable);

	up_log_disable = (window.localStorage.getItem('up_log_disable') != 0);
	$("#save_log").attr("checked", !cache_disable);

	gps_disable = (window.localStorage.getItem('gps_disable') != 0);
	$("#save_gps").attr("checked", !gps_disable);

	gps_setting_count = window.localStorage.getItem('gps_setting_count');
}


// ファイルシステムのオブジェクトが取得できた
function getFilesSystemSuccess(fileSystem) {
	displayLog(fileSystem.root.toURL());
	persistentURL = fileSystem.root.toURL();
	$("#album").attr("disabled", false);
}

// ファイルシステムの取得に失敗
function getFilesSystemError() {
	displayLog("CRITICAL ERROR!! : getFilesSystemError");
}

// バックキーの制御
function onBackKeyDown() {

	// 通信中は画面を移動させない
	if (onTransfer) {
		//change('upload');
		return ;
	}

	if( $("#page_top").css("display") != "none") {
		navigator.app.exitApp();

	} else {
		change('top');
	}
}

// アプリ復帰時のイベント
function onResume() {
	if (onTransfer) {
		//	絶賛通信中;
		$("#album").attr("disabled", true);
		$("#submit_btn").attr("disabled", true);
		display_sending();
	}
}

// 利用規約と個人情報保護方針の本文をサーバーからダウンロード
function get_contents() {
	$.get("https://" + SERVER + "/sp/rule.php", function(data) {
		$("#body_rule").html(data);
		$("#body_rule2").html(data);
		$("#toupload").attr("disabled", false);
		$("#toupload2").attr("disabled", false);
		$("#toupload").css("display", "block");
		$("#toupload2").css("display", "block");
	});

	$.get("https://" + SERVER + "/sp/sec.php",  function(data) {
		$("#body_sec").append(data);
	});

}


// 全ページを非表示化する
function resetAll() {
	$("#main > div").each(function(){$(this).hide();});
}

// ページ切り替え処理
function change(page) {
	resetAll();
	$("#page_" + page).show();
	$("footer").show();

	if (page == "top") {
		$('link[rel=stylesheet]').each(
			function(){
				if ( !$(this).attr("href").match(/(.*)reset5\.css/) && !$(this).attr("href").match(/(.*)iphone\.css/) ) {
					$(this).attr("href", "css/index.css");
				}
			}
		);
		$("footer").hide();

	} else	if (page == "upload") {
		$('link[rel=stylesheet]').each(
			function(){
				if ( !$(this).attr("href").match(/(.*)reset5\.css/) && !$(this).attr("href").match(/(.*)iphone\.css/) ) {
					$(this).attr("href", "css/upload.css");
				}
			}
		);

		$("#album").focus();


	} else	if ((page == "before_upload") || (page == "rule") || (page == "sec")) {
		$('link[rel=stylesheet]').each(
			function(){
				if ( !$(this).attr("href").match(/(.*)reset5\.css/) && !$(this).attr("href").match(/(.*)iphone\.css/) ) {
					$(this).attr("href", "css/rule.css");
				}
			}
		);

	} else	if (page == "thanks") {
		$('link[rel=stylesheet]').each(
			function(){
				if ( !$(this).attr("href").match(/(.*)reset5\.css/) && !$(this).attr("href").match(/(.*)iphone\.css/) ) {
					$(this).attr("href", "css/thanks.css");
				}
			}
		);

	} else	if (page == "log") {
		$('link[rel=stylesheet]').each(
			function(){
				if ( !$(this).attr("href").match(/(.*)reset5\.css/) && !$(this).attr("href").match(/(.*)iphone\.css/) ) {
					$(this).attr("href", "css/howto.css");
				}
			}
		);

		read_log();

	} else	if (page == "config") {
		$('link[rel=stylesheet]').each(
			function(){
				if ( !$(this).attr("href").match(/(.*)reset5\.css/) && !$(this).attr("href").match(/(.*)iphone\.css/) ) {
					$(this).attr("href", "css/config.css");
				}
			}
		);

	} else {
		$('link[rel=stylesheet]').each(
			function(){
				if ( !$(this).attr("href").match(/(.*)reset5\.css/) && !$(this).attr("href").match(/(.*)iphone\.css/) ) {
					$(this).attr("href", "css/howto.css");
				}
			}
		);

	}

	$('body').scrollTop(0);
}


// ファイル選択ダイアログの呼び出し
function selectFile() {

	if (on_service == "off") {
		alert_service_off();
		return;
	}

	// このロジックだと別にフラグ要らないんだけど、一応ね
	webIntentMode = $("#restriction").attr("checked") ? true : false;

	if (webIntentMode) {
		// androidのIntentをPluginから呼び出す
		window.plugins.webintent.startActivity(
			{action: "", type: 'text/plain', extras: ""},
			set_upload_file,
			noset_upload_file,
			'MediaSelector'
		);

	} else {
		// API名が奇妙だけどこれでいいらしい
		navigator.camera.getPicture(
			set_upload_file,
			noset_upload_file,
			{
				quality : 50,
				destinationType : Camera.DestinationType.FILE_URI,
				sourceType : Camera.PictureSourceType.SAVEDPHOTOALBUM,
				mediaType  : Camera.MediaType.ALLMEDIA
			}
		);
	}
}

function startMovie() {
	// androidのIntentをPluginから呼び出す
	window.plugins.webintent.startActivity(
		{action: "", type: 'text/plain', extras: {'cameraType': 333}},
		null,
		null,
		'CustomCamera'
	);
}

// Camera機能の呼び出し
function startCamera() {
	// androidのIntentをPluginから呼び出す
	window.plugins.webintent.startActivity(
		{action: "", type: 'text/plain', extras: {'cameraType': 222}},
		function(){ setTimeout("startMovie()", 300) },
		null,
		'CustomCamera'
	);

}



function startMoviePlayer(src) {
	// androidのIntentをPluginから呼び出す
	window.plugins.webintent.startActivity(
		{action: "", type: 'text/plain', extras: {'src': src}},
		null,
		null,
		'MoviePlayer'
	);
}
function set_upload_file(imageUri) {
	// ファイルが選ばれたら、OSでのフルパスを取得する
	//window.resolveLocalFileSystemURI(imageUri,
	window.resolveLocalFileSystemURL(imageUri,
		function(fileEntry) {
			var file = fileEntry.file(
				function (file) {
					// 500MBサイズ制限
					if (file.size <= 524288000) {
						uploadSize = file.size;
						uploadFileURL = fileEntry.toURL();
						$("#filepath").text(getFileName(uploadFileURL));
						displayLog("【選択したファイル】<br>" + uploadFileURL);

						// ファイルオブジェクト取得完了
						uploadMimeType = file.type;
						$("#submit_btn").attr("disabled", false);
					} else {
						navigator.notification.alert("500MBを超える動画は投稿できません", function(){}, "ファイルサイズエラー", "閉じる");
						$("#submit_btn").attr("disabled", true);
						$("#filepath").text("");
					}
				},
				function(error) {
					// ファイルオブジェクトが得られなかった
					displayLog("Failed to get mimetype" + error.code);
					$("#submit_btn").attr("disabled", true);
					$("#filepath").text("動画の種類が特定できませんでした");
				}
			);

		},
		function(evt){
			console.log(evt.target.error.code);
		}
	);
}
/*
function set_upload_file(imageUri) {
	alert(imageUri);
	// ファイルが選ばれたら、OSでのフルパスを取得する
	//window.resolveLocalFileSystemURI(imageUri,
	window.resolveLocalFileSystemURL(imageUri,
		function(fileEntry) {
			var file = fileEntry.file(
				function (file) {
					// 500MBサイズ制限
					if (file.size <= 524288000) {
						uploadSize = file.size;
						uploadFileURL = file.fullPath;
						$("#filepath").text(file.name);
						displayLog("【選択したファイル】<br>" + uploadFileURL);
						displayLog("【選択したファイル】<br>" + uploadSize);

						// ファイルオブジェクト取得完了
						uploadMimeType = file.type;
						$("#submit_btn").attr("disabled", false);
					} else {
						navigator.notification.alert("500MBを超える動画は投稿できません", function(){}, "ファイルサイズエラー", "閉じる");
						$("#submit_btn").attr("disabled", true);
						$("#filepath").text("");
					}
				},
				function(error) {
					// ファイルオブジェクトが得られなかった
					displayLog("Failed to get mimetype" + error.code);
					$("#submit_btn").attr("disabled", true);
					$("#filepath").text("動画の種類が特定できませんでした");
				}
			);

		},
		function(evt){
			console.log(evt.target.error.code);
		}
	);
}
*/

function noset_upload_file(message) {
	// ファイルが選ばれなかった
	displayLog(message);
	$("#submit_btn").attr("disabled", true);
	$("#filepath").text("");
}


// 空チェック
function isEmpty(value) {
	if (value == null) {
		return true;
	}

	if (value == "") {
		return true;
	}

	return false;
}


// 入力チェック
function checkFormValue() {

	if (isEmpty(uploadFileURL)) {
		navigator.notification.alert("ファイルを選択してください", function(){}, "入力エラー", "閉じる");
		$("#album").focus();
		return false;
	}

	if (isEmpty($("#username").val())) {
		navigator.notification.alert("お名前を入力してください", function(){}, "入力エラー", "閉じる");
		$("#username").focus();
		return false;
	}

	if (isEmpty($("#phoneno").val())) {
		navigator.notification.alert("電話番号を入力してください", function(){}, "入力エラー", "閉じる");
		$("#phoneno").focus();
		return false;
	}

	if ( !$("#phoneno").val().match(/^[0-9\-]{10,13}$/) ) {
		navigator.notification.alert("電話番号を正しく入力してください", function(){}, "入力エラー", "閉じる");
		$("#phoneno").focus();
		return false;
	}

	if (isEmpty($("#email").val())) {
		navigator.notification.alert("メールアドレスを入力してください", function(){}, "入力エラー", "閉じる");
		$("#email").focus();
		return false;
	}

	if ( !$("#email").val().match(/^([a-zA-Z0-9])+([a-zA-Z0-9\._-])*@([a-zA-Z0-9_-])+([a-zA-Z0-9\._-])+([a-zA-Z0-9_-])+$/) ) {
		navigator.notification.alert("メールアドレスを正しく入力してください", function(){}, "入力エラー", "閉じる");
		$("#email").focus();
		return false;
	}

	if (isEmpty($("#title").val())) {
		navigator.notification.alert("タイトルを入力してください", function(){}, "入力エラー", "閉じる");
		$("#title").focus();
		return false;
	}

	if (isEmpty($("#description").val())) {
		navigator.notification.alert("内容を入力してください", function(){}, "入力エラー", "閉じる");
		$("#description").focus();
		return false;
	}

	return true;
}

// アップロード事前処理
function confirm_upload() {

	if (checkFormValue() == false) {
		return ;
	}

	navigator.notification.confirm("この内容で送信します。\nよろしいですか？",
			function(btn_id){
				if (btn_id == 1) {
					upload_file();
				}
			},
	"投稿の確認", ["同意して送信","キャンセル"]);

	return;
}


// アップロード開始
function upload_file() {

	ft = new FileTransfer();
	var name = uploadFileURL.substr(uploadFileURL.lastIndexOf('/')+1);

	var uploadOptions = new FileUploadOptions();
	uploadOptions.fileKey  = 'file';
	uploadOptions.fileName = name;

	if (uploadMimeType) {
		uploadOptions.mimeType = uploadMimeType;
	} else {
		uploadOptions.mimeType = "application/octet-stream";
	}

	sTime = (new Date()).getTime();

	var params = new Object();
	params.username		= $("#username").val();
	params.email		= $("#email").val();
	params.phoneno		= $("#phoneno").val();
	params.pref		=	$("#pref").val();
	params.title		= $("#title").val();
	params.description	= $("#description").val();
	params.PHP_SESSION_UPLOAD_PROGRESS = sTime;
	if (!gps_disable){
		params.gpslatitude	= $("#gpslatitude").val();
		params.gpslongitude	= $("#gpslongitude").val();
	}


	uploadOptions.params = params;

	// ②
	//var uri = encodeURI('http://'+SERVER+'/upload/receive_app.php'); //httpの方はデバッグ用
	var uri = encodeURI('https://'+SERVER+'/upload/receive_app.php');

	$("#album").attr("disabled", true);
	$("#submit_btn").attr("disabled", true);
	$("#cancel").show();

	// uploadスタート
	ft.onprogress = check_progress;
	ft.upload(uploadFileURL , uri, uploadSuccess , uploadFail, uploadOptions);

	onTransfer = true;
	display_sending();
	displayLog("送信中... >> " + uri);

	$("#progress").html("<div id='status'></div><div id='base'><div id='done'></div></div>");
}


// 進捗状況のイベント処理
function check_progress(progressEvent) {

	if (progressEvent.lengthComputable) {
		var remaining_times = (progressEvent.total - progressEvent.loaded) / (progressEvent.loaded / ((new Date()).getTime() - sTime));
		var percent = Math.floor((progressEvent.loaded / progressEvent.total) * 100) + "%";

		// プログレスバーの表示
		$("#done").css("width", percent);

		var txt = "";
		if (remaining_times > 1000) {
			txt = "完了まで 約";
			if (remaining_times >= 3600000) {
				txt += Math.floor(remaining_times / 3600000) + "時間";
				remaining_times %= 3600000;
			}
			if (remaining_times >= 60000) {
				txt += Math.floor(remaining_times / 60000) + "分";
				remaining_times %= 60000;
			}
			// 秒だけを繰り上げたら「1分60秒」とか素敵な表示が見れた
			txt += Math.floor(remaining_times / 1000) + "秒";
			txt += "<span style='float:right;'>" + percent + "</span>";

		} else if (remaining_times == 0) {
			// 0のときは表示更新をやめてみる

		} else {
			// 0秒表示対策　必要性は不明
			txt = "まもなく終了します";
		}

		// 残り時間、進捗率の表示
		if (txt) $("#status").html(txt);

	} else {
		console.log("ここは何ぞ？");
	}
}


// アップロードをキャンセルする
function cancel_upload() {
	navigator.notification.confirm("アップロードを中断します\nよろしいですか？",
		function(btn_id){
			if (btn_id == 1) {
				ft.abort();
			}
		},
	"送信のキャンセル", ["中断する","中断しない"]);
}


// アップロードの通信が完了した
function uploadSuccess(uploadResult){

	onTransfer = false;

	// 転送時間計算はほぼデバッグ用
	var date = new Date();
	var eTime = date.getTime();

	// UTC開始の1900/01/01 00:00:00 を利用して経過時間を部分分けする
	date.setTime(eTime - sTime);
	trTime = "";
	if (date.getUTCHours() > 0) {
		// 時間だけは UTC+9h の影響があるためUTCの値を使う
		trTime += date.getUTCHours() + "時間";
	}
	if (date.getMinutes() > 0) {
		trTime += date.getMinutes() + "分";
	}
	if (date.getSeconds() > 0) {
		trTime += date.getSeconds() + "秒";
	}

	displayLog('転送処理時間: ' + trTime);

	displayLog(uploadResult.response);
	var result = JSON.parse(uploadResult.response);

	if ((uploadResult.responseCode >= 200) && (uploadResult.responseCode < 300) && (result.code != "error")) {
		displayLog('アップロード通信に成功');
		success_processing();

	} else {
		displayLog('アップロード通信が失敗。レスポンスコード：' + uploadResult.responseCode);
		navigator.notification.alert("アップロードが正常に完了できませんでした", function(){}, "送信失敗", "閉じる");
		write_log(date_time_format(new Date()), "失敗", $("#filepath").text());

		if (result.message) {
			$("#progress").html("<b style='color:red;'>" + result.message.replace(/\n/g, "<br>") + "</b>");
		} else {
			$("#progress").empty();
		}

		$("#submit_btn").attr("disabled", false);
	}

	// パーツをもとの状態に　画面切り換えは進捗表示のスレッドで制御
	changeback_display();
}


// アップロードの通信が完了できなかった
function uploadFail(error){

	onTransfer = false;

	displayLog("Error uploading file <br>\ncode :" + error.code );
	displayLog("source URI :" + error.source);
	displayLog("target URI :" + error.target );
	displayLog("http_status :" + error.http_status);

	switch(error.code) {
	case FileTransferError.FILE_NOT_FOUND_ERR:
		navigator.notification.alert("選択されたファイルが見つかりません", function(){}, "送信失敗", "閉じる");
		write_log(date_time_format(new Date()), "失敗", $("#filepath").text());
		break;

	case FileTransferError.INVALID_URL_ERR:
		navigator.notification.alert("アップロード先へ接続できませんでした\nアプリの管理者へお問い合わせください", function(){}, "送信中断", "閉じる");
		write_log(date_time_format(new Date()), "失敗", $("#filepath").text());
		break;

	case FileTransferError.CONNECTION_ERR:
		navigator.notification.alert("通信が途絶えたため、アップロードに失敗しました", function(){}, "通信中断", "閉じる");
		write_log(date_time_format(new Date()), "失敗", $("#filepath").text());
		break;

	case FileTransferError.ABORT_ERR:
		navigator.notification.alert("アップロードはキャンセルされました", function(){}, "送信中断", "閉じる");
		write_log(date_time_format(new Date()), "中断", $("#filepath").text());
		break;

	default:
		navigator.notification.alert("アップロードに失敗しました", function(){}, "送信失敗", "閉じる");
		write_log(date_time_format(new Date()), "失敗", $("#filepath").text());
		break;
	}

	changeback_display();
	$("#progress").empty();

	// 送信ボタンは使えるようにしておく
	$("#submit_btn").attr("disabled", false);

}


// アップロード完了後の処理
function success_processing() {
	// 履歴を残す
	write_log(date_time_format(new Date()), "成功", $("#filepath").text());

	// 入力内容をキャッシュ
	formToCache();

	// キャッシュしないモードならここも初期化しておく
	if (cache_disable) {
		$("#username").val("");
		$("#email").val("");
		$("#phoneno").val("");
	}
	// キャッシュ項目以外は必ず初期化
	$("#filepath").text("");
	$("#title").val("");
	$("#description").val("");
	uploadFileURL = "";
	uploadMimeType = "";

	$("#progress").empty();

	// ありがとうございました画面へ遷移して、投稿画面を元に戻す
	change('thanks');
}


// アップロード画面を元に戻す
function changeback_display() {

	$("#toTop").show();
	$("footer").show();

	$("#album").attr("disabled", false);
//	$("#submit_btn").attr("disabled", false);

	$("#cancel").hide();
	$("#sending").hide();

}


// 通信中の画面状態へ制御
function display_sending(){

	$("#toTop").hide();		// 「TOPへ」画像がabsoluteのため・・・
	$("footer").hide();
	$("#sending").css("left", ((screen.width - $("#sending > img").width()) / 2));
	$("#sending").css("top", ((screen.height - $("#sending > img").height()) / 2));
	$("#sending").show();
}


// キャッシュファイルからフォームへ初期値を設定する
// アプリがresumeになった時、エントリが消えてる可能性を考慮する
function cacheToForm(){

	// キャッシュ使わないモードは何もしない
	if (cache_disable) {
		return;
	}

	$("#username").attr("value", kl_decryptj(window.localStorage.getItem('username')));
	$("#phoneno").attr("value", kl_decryptj(window.localStorage.getItem('phoneno')));
	$("#email").attr("value", kl_decryptj(window.localStorage.getItem('email')));

	return;
}


// フォームからキャッシュファイルへ保存する
function formToCache() {

	// キャッシュ使わないモードは何もしない
	if (cache_disable) {
		return;
	}

	$(":text").each(function(){
		window.localStorage.setItem($(this).attr("name") , kl_encryptj($(this).attr("value")));
	});

	return;
}


// アップロード履歴の読み出し
function read_log() {

	$("#loglist tr:gt(1)").empty();

	var history = window.localStorage.getItem('upload_log');
	if (history) {
		history = JSON.parse(kl_decryptj(history));
		if (history instanceof Array) {
			for (var i = 0; i < history.length; i++) {
				$("#loglist table").append("<tr></tr>");
				$("#loglist tr:last").append("<td class='upline'>" + history[i].date + "</td>");
				$("#loglist tr:last").append("<td class='upline'>" + history[i].status + "</td>");
				$("#loglist table").append("<tr></tr>");
				$("#loglist tr:last").append("<td colspan='2'>" + history[i].name + "</td>");
			}
		}
	}

}


// アップロード履歴の書き出し
function write_log(date, status, name) {

	if (up_log_disable) {
		return;
	}

	var history = window.localStorage.getItem('upload_log');
	if (history) {
		history = JSON.parse(kl_decryptj(history));
	} else	{
		history = new Array();
	}

	var news = new Object();
	news['date'] = date;
	news['status'] = status;
	news['name'] = name;

	// ログがなかったときの判定に癖アリ
	if ((history.length == 1) && (history[0] === undefined)) {
		history[0] = news;

	} else {
		// 最大２０件保持
		if (history.length > 19) {
			history = history.slice((history.length - 19));
		}
		history.push(news);
	}

	window.localStorage.setItem('upload_log', kl_encryptj(JSON.stringify(history)));
}

// 位置情報状態取得クラス
var LocationStatus = function LocationStatus() {
	this.enable_network = undefined;
	this.enable_gps = undefined;

};
LocationStatus.prototype = {

	requestLocationStatus : function (){

		var self = this;
		// network状態取得リクエスト
		this._sendRequest("isProviderEnabled",
					function(args) {
						console.log("NETWORK SUCEESSED:"+args);
						self.enable_network = args;
					},
					{ arg01: "network" });

		// gpsの状態取得リクエスト
		this._sendRequest("isProviderEnabled",
				function(args) {
					console.log("GPS SUCEESSED:"+args);
					self.enable_gps = args;
				},
				{ arg01: "gps" });
	},


	// 取得出来たかどうか
	isFinished : function () {
		console.log("this.network_enable:"+this.enable_network);
		console.log("this.enable_gps:"+this.enable_gps);

		if(this.enable_network === undefined) {
			return false;
		}
		if(this.enable_gps === undefined) {
			return false;
		}

		return true;
	},


	isLocationEnabled : function() {
		if(this.enable_network === undefined || this.enable_gps === undefined) {
			console.log("Location Status request has NOT yet been finisihed.");
			return undefined;
		}

		if (!this.enable_network && !this.enable_gps) {
			return false;
		}

		return true;
	},

	// 取得データのリセット
	reset : function() {
		this.enable_network = undefined;
		this.enable_gps = undefined;
	},

	_sendRequest : function(functionName, successFunction, params) {

		cordova.exec(
			successFunction,
			function(args){console.log("FAILED "+args); },
			"LocationManagerState", functionName, [params]);
	}
};



function switch_gps_disable() {
	// gps_setting_count==0 は初期状態
	// gps_setting_count >0 はアプリ内GPS初回ダイアログ表示済み
	var locationStatus = new LocationStatus();
	var check_count = 0;
	locationStatus.requestLocationStatus();
	var id = setInterval(function(){
//		alert("[locationStatus.isFinished()]:"+locationStatus.isFinished());
		if(locationStatus.isFinished())
		{
			clearInterval(id);
//			alert("[locationStatus.isLocationEnabled()]:" + locationStatus.isLocationEnabled());
			if (locationStatus.isLocationEnabled()){
				if (gps_setting_count<=0) {
					navigator.notification.confirm("NHKスクープBOXは現在位置情報を利用します。\nよろしいですか？",
								function(btn_id){
									if (btn_id == 1) {
										// 初回設定以降はダイアログを出さない
										gps_setting_count = gps_setting_count + 1;
										window.localStorage.setItem('gps_setting_count', gps_setting_count);

										// gps設定ONに
										set_gps_enable(true);
									} else {
										// 利用しない設定に初期化
										set_gps_enable(false);
									}
								},
						"現在位置情報の利用確認", ["はい","いいえ"]);
				} else {
					set_gps_enable(gps_disable);
				}
			} else {

				//android_gps.showSettingsAlert();
				set_gps_enable(false); // 利用しない設定に初期化
				cordova.exec(
					null,
					function(args){console.log("FAILED "+args); },
					"LocationManagerState", "showAlertDialog", [{ arg01: "hoge" }]);

			}
		}
		else if(20 < check_count)
		{
			clearInterval(id);
		}
		else
		{
			++check_count;
			console.log("[location status] ]not yet");
		}
	},30);

}


/*
function switch_gps_disable() {
	// gps_setting_count==0 は初期状態
	// gps_setting_count >0 はアプリ内GPS初回ダイアログ表示済み

	if (android_gps.canGetLocation()){
		if (gps_setting_count<=0) {
			navigator.notification.confirm("NHKスクープBOXは現在位置情報を利用します。\nよろしいですか？",
						function(btn_id){
							if (btn_id == 1) {
								// 初回設定以降はダイアログを出さない
								gps_setting_count = gps_setting_count + 1;
								window.localStorage.setItem('gps_setting_count', gps_setting_count);

								// gps設定ONに
								set_gps_enable(true);
							} else {
								// 利用しない設定に初期化
								set_gps_enable(false);
							}
						},
				"現在位置情報の利用確認", "はい,いいえ");
		} else {
			set_gps_enable(gps_disable);
		}
	} else {
		set_gps_enable(false); // 利用しない設定に初期化
		android_gps.showSettingsAlert();
	}
}
*/
function set_gps_enable(flag){
	$("#save_gps").attr("checked", flag);
	$("#geolocation").attr("checked", flag);
	gps_disable = !flag;
	window.localStorage.setItem('gps_disable', (gps_disable ? 1 : 0));
	if( flag ) {
		$("#check_geolocation").attr("src", "images/on.png");
	} else {
		$("#check_geolocation").attr("src", "images/off.png");
	}
}

// 入力内容を保持する機能の切り替え
function switch_cache_disable() {
	cache_disable = !cache_disable;
	window.localStorage.setItem('cache_disable', (cache_disable ? 1 : 0));
	$("#save_personal").attr("checked", !cache_disable);

	// 保持しなくしたなら現状も消さないと不自然かな
	if (cache_disable) {
		$("#username").val("");
		$("#email").val("");
		$("#phoneno").val("");

		// アプリがメモリにいる間は、こやつらもついでに消さないと・・・
		$("#filepath").text("");
		$("#title").val("");
		$("#description").val("");
	}
}

// アップロード履歴を保持機能の切り替え
function switch_up_log_disable() {
	up_log_disable = !up_log_disable;
	window.localStorage.setItem('up_log_disable', (up_log_disable ? 1 : 0));
	$("#save_log").attr("checked", !up_log_disable);
}


// 保持した入力内容を消去
function delete_form_cache() {
	navigator.notification.confirm("入力内容を消去します。\nよろしいですか？",
			function(btn_id){
				if (btn_id == 1) {
					window.localStorage.removeItem('username');
					window.localStorage.removeItem('phoneno');
					window.localStorage.removeItem('email');
					window.localStorage.removeItem('title');	// 実はタイトルも入れてたり

					// 現状の方も消さないとかな
					$("#username").val("");
					$("#email").val("");
					$("#phoneno").val("");
					// アプリがメモリにいる間は、こやつらもついでに消さないと・・・
					$("#filepath").text("");
					$("#title").val("");
					$("#description").val("");
				}
			},
	"保持した入力内容の消去", ["消去する","キャンセル"]);
}

// アップロード履歴を消去
function delete_upload_log() {
	navigator.notification.confirm("アップロード履歴を消去します。\nよろしいですか？",
			function(btn_id){
				if (btn_id == 1) {
					window.localStorage.removeItem('upload_log');
				}
			},
	"アップロード履歴の消去", ["消去する","キャンセル"]);
}


// ログ表示（画面内にも対応）
function displayLog(msg) {
//	$("#logger").append(msg + "<br />");
	console.log(msg);
}


function checkswitch() {

	if( $("#restriction").attr("checked") ) {
//		$("label").css("background-image", "url(images/on.png)");
		$("#checkview").attr("src", "images/on.png");

	} else {
//		$("label").css("background-image", "url(images/off.png)");
		$("#checkview").attr("src", "images/off.png");
	}

}

function switch_connection_check_display(i){
	if (i>=3) {
		i=0;
		$("#connection_check").html("");
	} else {
		i++;
		$("#connection_check").html($("#connection_check").html() + ".");
	}
	setTimeout("switch_connection_check_display("+i+")", 1000);
}

// Cordova起動完了時に行う処理
window.addEventListener("load", function(){
document.addEventListener("deviceready",
		function() {
			switch_connection_check_display(0);
			check_version();
			get_contents();
			window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, getFilesSystemSuccess, getFilesSystemError);
			document.addEventListener("backbutton", onBackKeyDown, false);
			document.addEventListener("resume", onResume, false);
//			$("#restriction").addEventListener("chenge", checkswitch, false);
			read_config();
			cacheToForm();
			// GPSの位置取得
//			$("#gpslatitude").val(android_gps.getLatitude());
//			$("#gpslongitude").val(android_gps.getLongitude());
			navigator.geolocation.getCurrentPosition(
					function(position){
						// geolocationSuccess
						$("#gpslatitude").val(position.coords.latitude);
						$("#gpslongitude").val(position.coords.longitude);
						console.log(position.coords.latitude);
						console.log(position.coords.longitude);
			});
		},
		false
);
document.addEventListener("resume",
	function() {
		var locationStatus = new LocationStatus();
		var check_count = 0;
		locationStatus.requestLocationStatus();
		var id = setInterval(function(){
			if(locationStatus.isFinished())
			{
				clearInterval(id);

				if (locationStatus.isLocationEnabled()){
					if (0 < gps_setting_count)
					{
						var _gps_disable = (window.localStorage.getItem('gps_disable') !== 0);
						set_gps_enable(_gps_disable);
					}
					else
					{
						set_gps_enable(false);
					}

				}
				else
				{
					set_gps_enable(false);
				}
			}
			else if(20 < check_count)
			{
				clearInterval(id);
			}
			else
			{
				++check_count;
				console.log("[location status] ]not yet");
			}
		},
		30);
},
false);

}, false);



// 参考 http://www.keynavi.net/ja/tipsj/ienc.html
//--------------------------------------
//kl_encrypt/decrypt(s)
//返り値：暗号化/複合化した文字列
//s：文字列(日本語入力時はescape()実行)
//KL_CRYPT_KEY：キーとして用いる文字列
//KL_COOKIE_CHARS：クッキーで利用可能な文字
//--------------------------------------
KL_CRYPT_KEY="ScoopBox";
KL_COOKIE_CHARS="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789%./_";
function kl_crypt(s,enc){
	if (!s) return '';

	var chars=KL_COOKIE_CHARS;
	var key=escape(KL_CRYPT_KEY);
	var t=""; var c,n,m;
	for(var i=0;i<s.length;i++){
		c=s.charAt(i);
		n=chars.indexOf(c);
		if(n>=0){
			m=chars.indexOf(key.charAt(i%key.length));
			if(enc) n=n+m; else n=n-m;
			if(n<0) n=n+chars.length;
			if(n>=chars.length) n=n-chars.length;
			c=chars.charAt(n);
		}
		t+=c;
	}
	return t;
}
function kl_encrypt(s){ return kl_crypt(s,1); }
function kl_decrypt(s){ return kl_crypt(s,0); }

//入力文字列が日本語の場合は以下を利用//
function kl_encryptj(s){ return kl_crypt(escape(s),1); }
function kl_decryptj(s){ return unescape(kl_crypt(s,0)); }


