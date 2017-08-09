






























	$(document).ready(function(){
		
		$("#mrkLeft").bind("tap", function(){
			//$(this).text($(this).text()+'!');
			//画像の数を数えて
			var box=document.getElementById("detailImgUl");
			var tags=box.getElementsByTagName("li");
			var len=tags.length;
			var idx=0;
			//２枚以上のとき最初に右アイコンを表示
			//画像表示制御
			for(var i=1; i < tags.length; i++){
				var disp = tags[i].style.display;
				if(disp == "block"){
					tags[i-1].style.display = "block";
					idx = i;
				}
				tags[i].style.display = "none";
			}
			
			//右アイコン制御
			if(len >= idx){
				$("#mrkRight").css({"display":"inherit"});
			}
			else{
				$("#mrkRight").css({"display":"none"});
			}				
			//左アイコン制御
			if(1 < idx){
				$("#mrkLeft").css({"display":"inherit"});
			}
			else{
				$("#mrkLeft").css({"display":"none"});
			}
		});
		$("#mrkRight").bind("tap", function(){
			//$(this).text($(this).text()+'!');
			//画像の数を数えて
			var box=document.getElementById("detailImgUl");
			var tags=box.getElementsByTagName("li");
			var len=tags.length-1;
			var idx=0;
			//２枚以上のとき最初に右アイコンを表示
			//画像表示制御
			for(var i=tags.length-1; i >= 0; i--){
				var disp = tags[i].style.display;
				if(disp == "block"){
					tags[i+1].style.display = "block";
					idx = i+1;
				}
				tags[i].style.display = "none";
			}
			//右アイコン制御
			if(len > idx){
				$("#mrkRight").css({"display":"inherit"});
			}
			else{
				$("#mrkRight").css({"display":"none"});
			}				
			//左アイコン制御
			if(0 < idx){
				$("#mrkLeft").css({"display":"inherit"});
			}
			else{
				$("#mrkLeft").css({"display":"none"});
			}
			
		});
		$("#detailImgUl").bind("swiperight", function(){
			//$(this).text($(this).text()+'!');
			//画像の数を数えて
			var box=document.getElementById("detailImgUl");
			var tags=box.getElementsByTagName("li");
			var len=tags.length;
			var idx=0;
			//２枚以上のとき最初に右アイコンを表示
			//画像表示制御
			for(var i=1; i < tags.length; i++){
				var disp = tags[i].style.display;
				if(disp == "block"){
					tags[i-1].style.display = "block";
					idx = i;
				}
				tags[i].style.display = "none";
			}
			
			//右アイコン制御
			if(len >= idx){
				$("#mrkRight").css({"display":"inherit"});
			}
			else{
				$("#mrkRight").css({"display":"none"});
			}				
			//左アイコン制御
			if(1 < idx){
				$("#mrkLeft").css({"display":"inherit"});
			}
			else{
				$("#mrkLeft").css({"display":"none"});
			}
		});
		$("#detailImgUl").bind("swipeleft", function(){
			//$(this).text($(this).text()+'!');
			//画像の数を数えて
			var box=document.getElementById("detailImgUl");
			var tags=box.getElementsByTagName("li");
			var len=tags.length-1;
			var idx=0;
			//２枚以上のとき最初に右アイコンを表示
			//画像表示制御
			for(var i=tags.length-1; i >= 0; i--){
				var disp = tags[i].style.display;
				if(disp == "block"){
					tags[i+1].style.display = "block";
					idx = i+1;
				}
				tags[i].style.display = "none";
			}
			//右アイコン制御
			if(len > idx){
				$("#mrkRight").css({"display":"inherit"});
			}
			else{
				$("#mrkRight").css({"display":"none"});
			}				
			//左アイコン制御
			if(0 < idx){
				$("#mrkLeft").css({"display":"inherit"});
			}
			else{
				$("#mrkLeft").css({"display":"none"});
			}
		});

	});
	
    


















	$(document).ready(function(){
		
		$("#mrkLeft").bind("tap", function(){
			//$(this).text($(this).text()+'!');
			//画像の数を数えて
			var box=document.getElementById("detailImgUl");
			var tags=box.getElementsByTagName("li");
			var len=tags.length;
			var idx=0;
			//２枚以上のとき最初に右アイコンを表示
			//画像表示制御
			for(var i=1; i < tags.length; i++){
				var disp = tags[i].style.display;
				if(disp == "block"){
					tags[i-1].style.display = "block";
					idx = i;
				}
				tags[i].style.display = "none";
			}
			
			//右アイコン制御
			if(len >= idx){
				$("#mrkRight").css({"display":"inherit"});
			}
			else{
				$("#mrkRight").css({"display":"none"});
			}				
			//左アイコン制御
			if(1 < idx){
				$("#mrkLeft").css({"display":"inherit"});
			}
			else{
				$("#mrkLeft").css({"display":"none"});
			}
		});
		$("#mrkRight").bind("tap", function(){
			//$(this).text($(this).text()+'!');
			//画像の数を数えて
			var box=document.getElementById("detailImgUl");
			var tags=box.getElementsByTagName("li");
			var len=tags.length-1;
			var idx=0;
			//２枚以上のとき最初に右アイコンを表示
			//画像表示制御
			for(var i=tags.length-1; i >= 0; i--){
				var disp = tags[i].style.display;
				if(disp == "block"){
					tags[i+1].style.display = "block";
					idx = i+1;
				}
				tags[i].style.display = "none";
			}
			//右アイコン制御
			if(len > idx){
				$("#mrkRight").css({"display":"inherit"});
			}
			else{
				$("#mrkRight").css({"display":"none"});
			}				
			//左アイコン制御
			if(0 < idx){
				$("#mrkLeft").css({"display":"inherit"});
			}
			else{
				$("#mrkLeft").css({"display":"none"});
			}
			
		});
		$("#detailImgUl").bind("swiperight", function(){
			//$(this).text($(this).text()+'!');
			//画像の数を数えて
			var box=document.getElementById("detailImgUl");
			var tags=box.getElementsByTagName("li");
			var len=tags.length;
			var idx=0;
			//２枚以上のとき最初に右アイコンを表示
			//画像表示制御
			for(var i=1; i < tags.length; i++){
				var disp = tags[i].style.display;
				if(disp == "block"){
					tags[i-1].style.display = "block";
					idx = i;
				}
				tags[i].style.display = "none";
			}
			
			//右アイコン制御
			if(len >= idx){
				$("#mrkRight").css({"display":"inherit"});
			}
			else{
				$("#mrkRight").css({"display":"none"});
			}				
			//左アイコン制御
			if(1 < idx){
				$("#mrkLeft").css({"display":"inherit"});
			}
			else{
				$("#mrkLeft").css({"display":"none"});
			}
		});
		$("#detailImgUl").bind("swipeleft", function(){
			//$(this).text($(this).text()+'!');
			//画像の数を数えて
			var box=document.getElementById("detailImgUl");
			var tags=box.getElementsByTagName("li");
			var len=tags.length-1;
			var idx=0;
			//２枚以上のとき最初に右アイコンを表示
			//画像表示制御
			for(var i=tags.length-1; i >= 0; i--){
				var disp = tags[i].style.display;
				if(disp == "block"){
					tags[i+1].style.display = "block";
					idx = i+1;
				}
				tags[i].style.display = "none";
			}
			//右アイコン制御
			if(len > idx){
				$("#mrkRight").css({"display":"inherit"});
			}
			else{
				$("#mrkRight").css({"display":"none"});
			}				
			//左アイコン制御
			if(0 < idx){
				$("#mrkLeft").css({"display":"inherit"});
			}
			else{
				$("#mrkLeft").css({"display":"none"});
			}
		});

	});
	
    





var NativeGeolocationPlugin = { 
    callNativeFunction: function (success, fail, resultType) { 
      return PhoneGap.exec( success, fail, 
                           "com.holonglobe.phonegap.plugin.nativegeolocation.NativeGeolocation", 
                           "getCurrentPosition", [resultType]); 
    } 
};



    var savedAccuracy;
    var savedPos;
	var retryCount	= 0;
	var startTime	= new Date();
	var _watchId		="";
	var _watchFlg	= false;


	/** 位置情報の取得 **/
	//とりあえず今はこっちしか使ってないはず
	function getMyPos(successFunc,errorFunc) {
		_watchFlg	= false;
		_watchId	= navigator.geolocation.watchPosition(successFunc,errorFunc,{enableHighAccuracy:1,timeout:_gpsTimeOut,maximumAge:_maximumAge});
	}

	/** スタンプスポットと位置情報の判定 **/
	function resultStampPos(pos){
		var timerId = setTimeout(function() {
			clearTimeout(timerId);			
			//alert("timeout!");
			navigator.geolocation.clearWatch(_watchId);

			//
			var lat	=savedPos.coords.latitude;
			var lng	=savedPos.coords.longitude;
			var latlng = lat.toString()+","+lng.toString();
			
			//距離計算
			var distance = Math.floor(geoDistance(lat,lng,_selectedDetailCache.base.lat,_selectedDetailCache.base.lng,5));

			if(!_watchFlg){

				alert("位置情報の精度が低いため正確な場所を特定できませんでした。ご利用の機種や天候・屋内などの環境によってはGPSの精度が出ない場合がありますので再度お試しください。");
				hideModal();
				return;

				//alert("A:スポットまでの距離:"+distance+"m");
				 
				//500m以内
				if(distance < _stampAreaDistance){
					//保存
					saveStamp(_selectedDetailCache.base.id,latlng);
				}
				else{
					//スタンプ不可
					var km = Math.floor(distance/100);
					km = km/10;
					alert("現在位置が違います。ご利用の機種や天候・屋内などの環境によってはGPSの精度が出ない場合がありますので再度お試しください。\nスポットまでの距離:"+km+"km");
				}
				//ローディング表示
				hideModal();
				$.mobile.loadingMessage	= "データの読み込み中・・・";
				$.mobile.loadingMessageTextVisible = true;
				$.mobile.changePage('#entryStampComment',{transition: "none"});

				_watchFlg	= true;
			}

		},_gpsTimeOut);//end setTimeout

		//任意の精度以下になったら取得をやめる
		savedAccuracy = pos.coords.accuracy;
		savedPos = pos;
		if(pos.coords.accuracy < _accuracyVal ){
			//alert("GPS精度:"+pos.coords.accuracy);
	
			navigator.geolocation.clearWatch(_watchId);
			//$("#startPl").val(pos.coords.latitude + "," + pos.coords.longitude);

			//
			var lat	= pos.coords.latitude;
			var lng	= pos.coords.longitude;
			var latlng = lat.toString()+","+lng.toString();
	
			//距離計算
			var distance = Math.floor(geoDistance(lat,lng,_selectedDetailCache.base.lat,_selectedDetailCache.base.lng,5));
			//alert("スポットまでの距離:"+distance+"m");
	
			if(!_watchFlg){
				//alert("B:スポットまでの距離:"+distance+"m");
	
				//500m以内
				if(distance < _stampAreaDistance){
					//保存
					saveStamp(_selectedDetailCache.base.id,latlng);
					navigator.geolocation.clearWatch(_watchId);
				}
				else{
					var km = Math.floor(distance/100);
					km = km/10;
					//スタンプ不可
					alert("現在位置が違います。ご利用の機種や天候・屋内などの環境によってはGPSの精度が出ない場合がありますので再度お試しください。\nスポットまでの距離:"+km+"km");
					navigator.geolocation.clearWatch(_watchId);
				}
				//ローディング表示
				hideModal();
				$.mobile.loadingMessage = "データの読み込み中・・・";
				$.mobile.loadingMessageTextVisible = true;
				$.mobile.changePage('#entryStampComment',{transition: "none"});
				_watchFlg = true;
			}
		}
	}
	
	/** error function **/
	function errorPos(error){
	var message = "";
	
	switch (error.code) {
		
		// 位置情報が取得できない場合
		case error.POSITION_UNAVAILABLE:
		message = "位置情報の取得ができませんでした。ご利用の機種の位置情報取得設定をご確認ください。";
		break;
		
		// Geolocationの使用が許可されない場合
		case error.PERMISSION_DENIED:
		message = "位置情報取得の使用許可がされませんでした。ご利用の機種の位置情報取得設定をご確認ください。";
		break;
		
		// タイムアウトした場合
		case error.PERMISSION_DENIED_TIMEOUT:
		message = "位置情報取得中にタイムアウトしました。ご利用の機種の位置情報取得設定をご確認ください。";
		break;
		default:
		message = "位置情報取得中にタイムアウトしました。ご利用の機種の位置情報取得設定をご確認ください。("+error.code+")"+error.message;
		break;
	}

	navigator.geolocation.clearWatch(_watchId);


	//ローディング表示
	hideModal();
	$.mobile.loadingMessage = "データの読み込み中・・・";
	$.mobile.loadingMessageTextVisible = true;
	//$.mobile.changePage('#entryStampComment',{transition: "none"});

	_watchFlg = true;
	alert("ERR2:"+message);
}



//******************************************************************************	
// Wait for PhoneGap to load
//******************************************************************************	
    // PhoneGap is ready
	/*
	document.addEventListener('DOMContentLoaded', function(){
        document.addEventListener('deviceready', onDeviceReady);
    });
 
    function onDeviceReady() {
      // PhoneGap開始後の処理を記述する
		alert("deviceready");
		// Geolocationに関する処理を記述
		// 現在の位置情報を取得
		retryCount = 0;
		startTime = new Date();
		getMyPos(resultStampPos,errorPos);	//success function  and  error function


    }
	*/
//******************************************************************************	
// webintent
//******************************************************************************	
function open_maps(latlng,q) {
    var address = q;
    window.webintent.startActivity({
        action: WebIntent.ACTION_VIEW,
        url: 'geo:"+latlng+"?q=' + address}, 
        function() {}, 
        function() {alert('地図を開くことができませんでした。')}
    );
  }
function open_url(urls) {
    window.webintent.startActivity({
        action: WebIntent.ACTION_VIEW,
        url: urls}, 
        function() {}, 
        function() {alert('ページを開くことができませんでした。')}
    );
  }

  function open_mail() {
      var extras = {};
      extras[WebIntent.EXTRA_SUBJECT] = "サブジェクト";
      extras[WebIntent.EXTRA_TEXT] = "テキスト";
      window.webintent.startActivity({
        action: WebIntent.ACTION_SEND,
        type: 'text/plain',
        extras: extras
      }, function() {}, function() {alert('Failed to send email via Android Intent');});
  }
  function open_Acrobat() {
      window.webintent.startActivity(
      {
      action: WebIntent.ACTION_VIEW,
      type: 'application/pdf'
      },
      function(){},
      function(){alert('Failed to send acrobat via Android Intent');}
    );
  }
//*****************************************************************************


// JavaScript Document
	var _spotData;
	var _detailDataTmp;
	var _initFlg	= false;
	

		
	var _categoryListCache	= [];
	var _selectedCategoryId	= "";
	var _selectedDetailCache= [];
	var _detailImagesCache	= [];
	var _selectedId			= "";
	var _imagelist			= [];

	var _nearDistance		= 10000;	//近隣スポットの判定半径m(現在地と比べてこの範囲内であれば近隣スポットとして表示)
	var _stampAreaDistance	= 1000;		//スタンプを押せる距離の誤差(m)
	var _accuracyVal		= 500;		//GPS精度-許容できる誤差範囲(m)
	var _maximumAge			= 300000;	//GPSキャッシュ時間(GPS) msec -3分以内にGPSで値が取得されていればそれを使う
	var _gpsTimeOut			= 30000;	//GPSのタイムアウト秒数

	var _date 		= new Date();
	var _dateStr	= "";
	var _day		= "";
	var _month		= "";
	if(_date.getDate() < 10){
		_day = "0"+_date.getDate().toString();
	}
	else{
		_day = _date.getDate().toString();
	}
	if((_date.getMonth()+1) < 10){
		_month = "0"+(_date.getMonth()+1).toString();
	}
	else{
		_month = (_date.getMonth()+1).toString();
	}
	_dateStr		= _date.getFullYear()+"-"+_month+"-"+_day;
	

 
	function onDeviceReady() {
		//起動画面の表示
		cordova.exec(null, null, "SplashScreen", "hide", []);
		//callNativePlugin('success');
		
		document.addEventListener("menubutton", doMenu, false);
	}

	//戻るボタンの処理
	document.addEventListener("backbutton", handleBackButton, true);
	function handleBackButton(){
		hideModal();
	};


    $(document).bind("mobileinit", function() {
      //  $.mobile.page.prototype.options.addBackBtn = true;
		$.mobile.defaultTransition = "none";	//ページ切り替え
		$.mobile.loadingMessage = "読み込み中・・・";
		$.mobile.pageLoadErrorMessage = "読み込みに失敗しました";
		$.mobile.buttonMarkup.hoverDelay = 50;

		//クロスドメイン
		$.mobile.allowCrossDomainPages = true;
		$.support.cors	= true;
    });

	function getNewData(){
		//スポットデータの読み込み
		$.getJSON("http://apisoraichi.artful.jp/update/list.json?rn="+Math.random()*999999,
			function(data,status,xhr){
				if(xhr.status == 200){
					var json = $.toJSON(data);
					window.localStorage.setItem('soraichi.json', json);
					_spotData		= data.spots;
					_categoryData 	= dataSetCategories(data.categories);
					alert("最新のデータにアップデートいたしました。");
					hideModal();
					$.mobile.loadingMessage = "読み込み中・・・";
					$.mobile.loadingMessageTextVisible = true;

				}
				else{
					hideModal();
					$.mobile.loadingMessage = "読み込み中・・・";
					$.mobile.loadingMessageTextVisible = true;

					//alert("インターネットに接続されていません。再度アプリを起動しなおしてください。");

					getJSONError();
				}
			}
		);

		//内部HTMLの読み込み
	}

	//差分のイメージファイルを取得する
	/*
	function getNewImage(){
		$.getJSON("http://apisoraichi.artful.jp/update/imagelist.json?rn="+Math.random()*999999,
			function(data,status,xhr){
				if(xhr.status == 200){
					var json = $.toJSON(data);
					//最新リストを保存
					window.localStorage.setItem('soraichi.json', json);
					
					//差分ファイルを取得する
					for(var i=0; i < _imagelist.length ; i++){
						var idx = json.indexOf(_imagelist[i]);
						if(idx != -1){
							json.splice(idx,1);
						}
					}

					//画像ファイルを取得して保存する
					for(i=0; i < json.length ; i++){
						var getUrl = "http://apisoraichi.artful.jp/images/archives/"+json[i];
						$.ajax({ 
						  url: getUrl,
						  dataType:'text', 
						  data: "",
						  success: function(data){
							  //
						  }, 
						  timeout: 30000, //3 second timeout, 
						  error: function(jqXHR, status, errorThrown){   //the status returned will be "timeout" 
						  } 
						});
					}

				}
				else{
				}
			}
		);
	}*/

	//最初のデータを読み込み
	function localInitData(){
		$.getJSON("list.json",
			function(data,status){
				var json = $.toJSON(data);
				window.localStorage.setItem('soraichi.json', json);
			}
		);
	}
	
	//初回でネットも繋がっていないときはローカルのlist.jsonを表示
	function loadInitJSON(){
		$.getJSON("list.json",
			function(data){
				//alert("初回読み込みend");
				_spotData		= data.spots;
				_categoryData 	= dataSetCategories(data.categories);
		});
	}

	/** 回線などで取得できない場合 **/	
	function getJSONError(){
		var lastupdate = window.localStorage.getItem("soraichi.version");
		if(lastupdate == undefined){
			//alert("初回読み込みstart");
			loadInitJSON();
		}
		else{
			//alert("cache");
			//キャッシュから読み込み
			getCacheData();
		}
	}
	
	//キャッシュからデータを読み込み
	function getCacheData(){
		var data = "";
		if(data = $.evalJSON(window.localStorage.getItem("soraichi.json"))){
			_spotData		= data.spots;
			_categoryData 	= dataSetCategories(data.categories);
			//alert("キャッシュからデータを読み込みました。");		
		}
		else{
			var lastupdate = window.localStorage.getItem("soraichi.version");
			if(lastupdate == undefined){
				//初回でネットも繋がっていないときはローカルのlist.jsonを表示
				$.getJSON("list.json",
					function(data){
						_spotData		= data.spots;
						_categoryData 	= dataSetCategories(data.categories);
				});
			}
			//alert("スポットデータがありません。一度インターネット環境下にて本アプリを起動して3分ほど待ちデータを取得してください。");
		}
	}


	document.addEventListener('deviceready',onDeviceReady,false);
	$(document).ready(function() {
		//データのバージョンを確認

		$.ajax({ 
			url: "http://apisoraichi.artful.jp/update/", 
			dataType:'json', 
			success: function(data,status,xhr){
				if(xhr.status == 200){
					var resstr	= data.update;
					var lastupdate = window.localStorage.getItem("soraichi.version");
					
					if(lastupdate == undefined){
						lastupdate = "2012/12/21 15:00:00";
					}
					
					//alert("VERSION:"+resstr+":"+lastupdate);
					//現在のバージョンと違うとき
					if(resstr != lastupdate){
						//サーバーから読み込み
						//getCacheData();
						
						if(confirm("サーバー上に最新のアップデータがあります。更新しますか？\n※回線速度によっては更新に1～3分の時間がかかることがあります。")){
							window.localStorage.setItem('soraichi.version', resstr);

							$.mobile.loadingMessage = "更新中・・・";
							$.mobile.loadingMessageTextVisible = true;
							showModal();
							getNewData();
						}
						else{
							//キャッシュから読み込み
							getCacheData();
						}
					}
					else{
						//キャッシュから読み込み
						getCacheData();
					}
				}
				else{
				}
			},
			timeout: 10000, //10 second timeout, 
			error: function(jqXHR, status, errorThrown){
					getJSONError();
			} 
		});

		//画像のスライド
		setTimeout('randomImg()',4000);

		//navbarの制御
		$("#detail,#category,#search,#searchResult,#cat-food,#cat-drive,#about,#map,#stamp,#bookmark").bind('pageinit',function(){
			$(this).find("[data-role=header] , [data-role=footer]").fixedtoolbar({ tapToggle: false }); 
		});
		$("#home").bind('pageinit',function(){
			$(this).find("[data-role=footer]").fixedtoolbar({ tapToggle: false }); 
		});

		//***************************************************************************
		//* ページの基本制御
		//***************************************************************************
		$("#registar").bind("pagebeforeshow", function() {
			//ボタン処理
			$("#selectBox1").css("display","none");
			$("#selectBox2").css("display","none");
		});
		/** 住所のセレクト分岐 **/
		$("#registarAddress").bind("change", function() {
			//ボタン処理
			var sel = $("#registarAddress").val();
			switch(sel){
				case "0":
					$("#selectBox1").css("display","none");
					$("#selectBox2").css("display","none");
					break;
				case "1":
					$("#selectBox1").css("display","inherit");
					$("#selectBox2").css("display","none");
					break;
				case "2":	
					$("#selectBox1").css("display","none");
					$("#selectBox2").css("display","inherit");
					break;
			}
		});

		$("#bookmark").bind("pagebeforeshow", function() {
			//戻る操作対策
			showBookmark();
		});

		$("#stamp").bind("pagebeforeshow", function() {
			//戻る操作対策
			//showModal();
			//showStamp();
		});


		$("#init").bind("pagebeforeshow", function() {
				if(enableUserRegistar()){
					$.mobile.changePage('#home',{transition: "none"});
				}
				else{
					$.mobile.changePage('#registar',{transition: "none"});
				}
				_initFlg = true;
		});

		$('#detail').live('pagebeforeshow',function(){

			//別アプリ遷移のときのidキャッシュ
			if(_selectedId == ""){
				param = window.localStorage.getItem("soraichi.cacheDetailId");
				switchDetailPage(param);
				//$.mobile.changePage('#detail',{transition: "none"});
			}
			else{
				window.localStorage.setItem("soraichi.cacheDetailId",_selectedId);
			}
	
		});

		$('#category').live('pagebeforeshow',function(){
	
			//別アプリ遷移のときのidキャッシュ
			if(_selectedCategoryId == ""){
				param = window.localStorage.getItem("soraichi.cacheCategoryId");
				switchCategoryPage(param);
				//$.mobile.changePage('#categry',{transition: "none"});
			}
			else{
				window.localStorage.setItem("soraichi.cacheCategoryId",_selectedCategoryId);
			}
		});


		//***************************************************************************
	});
	
	
	/** アプリの終了 **/
	function appExit(){
		if(confirm("このアプリを終了してもよろしいですか？")){
			//navigator.device.exitApp();
			//navigator.app.exitApp();
			navigator.device.exitApp();
			//callNativePlugin('success');

		}
	}

	/****************************************/
	/** 地図に現在地を表示 **/
	/****************************************/
	function showMapHereIcon(){
		// 現在地を取得する。
		if (navigator.geolocation) {
			//alert("位置情報(GPS)機能を利用して現在地を判定いたします。取得まで少し時間が掛かりますのでしばらくお待ちください。");
			// Geolocationに関する処理を記述
			_showRouteFlg = false;
			// 現在の位置情報を取得
			getMyPos(showMapHereIconSet,errorPos);	//success function  and  error function
		}
		else{
			//alert("本端末ではGeolocationが使えません。");
		}			
	}	
	function showMapHereIconSet(pos){
		var lat	=pos.coords.latitude;
		var lng	=pos.coords.longitude;
		var myLatlng = new google.maps.LatLng(lat,lng);

		//現在地マーカーの表示
		var image = 'images/icon/icon_now2.png';
		$('#map_canvas').gmap('addMarker', { 'position':myLatlng,'icon':image, "zIndex" : 999,'bounds': true}).click(function() {
		});
	}
	
	/****************************************/
	/** カテゴリ一覧地図表示 **/
	/****************************************/
	function showMap(cat){
		_selectedCategoryId	= cat;

		//マップ表示
		$.mobile.changePage('#map',{transition: "none"});
		
		//地図タイトル反映
		$('#categoryMapTitle').text(_categoryData[cat].title);

		showMapView();
	}

	var _currentInfoWindow = null;	//最後に開いた情報ウィンドウを記憶
	var _mapInit = false;
	/** 一覧地図表示 **/	
	function showMapView(centerLatlng){
		var list = getList(_selectedCategoryId);
		var latlng = "";
		//ドライブルートなどの特殊マーカーの場合を判別
		if(_categoryData[_selectedCategoryId] != undefined &&_categoryData[_selectedCategoryId].otherlist != undefined && _categoryData[_selectedCategoryId].otherlist != ""){
			//リスト表示の指定otherlistがされているとき
			var ar	= _categoryData[_selectedCategoryId].otherlist.split("\n");
			for(var i=0; i < ar.length; i++){
				var liob		= ar[i].split(":");
				var con 		= liob[1].replace(/\r/g,"");
				var frontStr	= "";	//先頭付属用
				if(liob[2] != undefined){
					frontStr	= liob[2].replace(/\r/g,"");
					frontStr	= frontStr.replace(/\)/g,"");
				}
				switch(liob[0]){
					case "li.id":
						for(var j=0; j < list.length; j++){
							//idが一致したなら
							if(list[j].base.id == con){
								list[j].base.mapLabel = frontStr;
							}
						}
						break;
				}
			}
		}

		if(centerLatlng == undefined){
			alat = 43.376606;
			alng = 141.867142;
		}
		else{
			var md = centerLatlng.split(",");
			alat = md[0];
			alng = md[1];
		}
		
		//インターネットに繋がっていない場合(googlemapにアクセスできない場合)
		var myLatlng = "";

		try{
			myLatlng	= new google.maps.LatLng(alat,alng);
		}
		catch(e){
			//読み込みできないので終了
			alert("インターネットに接続されていないため地図を表示することができません。");
			//alert(e);
			hideModal();
			history.back();
			return;
		}

		//マップ表示
		
		$.mobile.changePage('#map',{transition: "none"});
		//マップの初期化
		if(_mapInit){
			$('#map_canvas').gmap('clear', 'markers');
			$('#map_canvas').gmap('destroy');
		}
		_mapInit = true;
		//マップの表示
        $("#map_canvas").gmap({"center":myLatlng, "zoom":11, 'callback': function(){/*alert('Google map loaded!');*/}});

		//表示データの生成
		var data = new Array();//マーカー位置の緯度経度
		for(var j=0; j < list.length; j++){
			var lat = list[j].base.lat;
			var lng = list[j].base.lng;
			var thumb = "";
			//緯度経度なしまたはセンターポイントと同一の場合
			if(lat == 0 || lng == 0 || list[j].base.latlng == centerLatlng){
				continue;
			}
			if(list[j].base.thumbnail != "" && list[j].base.thumbnail != undefined){
				thumb = '<img src="images/archives/thumbnail/'+list[j].base.thumbnail+'" />';
			}
			
			if(list[j].base.mapLabel != undefined){
				//マップのラベル指定
				data.push({position: new google.maps.LatLng(lat,lng),label:list[j].base.mapLabel, content:'<div class="mapbox">'+thumb+'<h3>'+list[j].base.title+'</h3><a onClick="switchDetailPage('+list[j].base.id+')"  href="#"><strong>詳細をみる</strong></a>'});
			}
			else{
				data.push({position: new google.maps.LatLng(lat,lng), content:'<div class="mapbox">'+thumb+'<h3>'+list[j].base.title+'</h3><a onClick="switchDetailPage('+list[j].base.id+')"  href="#"><strong>詳細をみる</strong></a>'});
			}
		
		}



		for (var i=0; i < data.length; i++) {
			if(data[i].label != undefined){
				var icon = 'http://www.google.com/mapfiles/marker' + data[i].label + '.png';
				$('#map_canvas').gmap('addMarker', { 'position':data[i].position,'icon':icon, 'bounds': true,'content':data[i].content }).click(function() {
						$('#map_canvas').gmap('openInfoWindow', { 'content':this.content}, this);
				});
			}
			else{
				$('#map_canvas').gmap('addMarker', { 'position':data[i].position, 'bounds': true,'content':data[i].content }).click(function() {
						$('#map_canvas').gmap('openInfoWindow', { 'content':this.content}, this);
				});
			}

		}

		//引数があればセンターマーカーを表示
		if(centerLatlng != undefined){
			//現在地マーカーの表示
            var image = 'images/icon/icon_now.png';
			$('#map_canvas').gmap('addMarker', { 'position':myLatlng,'icon':image, "zIndex" : 999,'bounds': true}).click(function() {
			});
		}
		else{
			//現在地が重要でない地図は取得できた段階で中心地を表示
			showMapHereIcon();
		}
	}
	var _markers = [];
	var _info_window = [];
	function attachMessageEx(index, msg) {
		google.maps.event.addListener(_markers[index], 'click', function(event) {
			close_other_info_window(index);
			if (_info_window[index]){
				_info_window[index].close();
				_info_window[index] = null;
				return;
			}
			_info_window[index] = new google.maps.InfoWindow({
				content: msg,
				maxWidth: 200
			});
			_info_window[index].open(_markers[index].getMap(), _markers[index]);

		});
	}
	function close_other_info_window(index){
		var makers_count = _markers.length;
		for (var i=0;i<makers_count;i++){
			if ( i == index ) continue;
			if (_info_window[i]){
				_info_window[i].close();
				_info_window[i] = null;
			}
		}
	}

	
	//*********************************************************
	//お気に入りの表示
	//*********************************************************
	function showBookmark(){
		var bookmarkList = readBookmark();
		var src = "";
		if(bookmarkList != undefined){
			var bkmAry = bookmarkList.split(",");
			var list = [];
			for(var i=0; i < _spotData.length ; i++){
				if(bkmAry.indexOf(_spotData[i].base.id.toString(),0) >= 0){
					list.push(_spotData[i]);
				}
			}
	
			for(var i=0; i < list.length ; i++){
				thumbnail	= "";
				if(list[i].base.thumbnail != undefined && list[i].base.thumbnail != ""){
					thumbnail = '<img src="images/archives/thumbnail/'+list[i].base.thumbnail+'" />';
				}
				else{
					thumbnail = '<img src="images/th_noimg.png" />';
				}
				src	+= '<li><a href="#" onclick="switchDetailPage('+list[i].base.id+')" data-transition="none">'+thumbnail+'<h3>'+list[i].base.title+'</h3><p>'+list[i].base.body+'</p></a></li>';
				//リストに表示
			}
			src = '<li data-role="list-divider">登録済みのお気に入り一覧</li> '+src;
		}
		else{
			//登録がない場合
			src	= '<li>現在お気に入りの登録はありません。</li>';			
		}
		
		//*********************************************
		//ページ内容を反映
		//*********************************************
		//ページ遷移を開始
		$.mobile.changePage('#bookmark',{transition: "none"});

		$("#ul-bookmark-list li").remove();
		$("#ul-bookmark-list").append(src);
		$("#ul-bookmark-list").listview();
		$("#ul-bookmark-list").listview("refresh");
		
	}


	//***************************************************
	/** 詳細ページへの遷移 **/
	//***************************************************
	function switchDetailPage(param) {

		detailData	= getDetail(param);

		//カスタムフィールド部分
		var customField		= detailData.custom_field;
		var customFieldSrc	= "";
		var images			= [];

		_selectedId			= detailData.base.id;
		_commentFlowMode 	= "spotDetail";

		for(var i=0; i < customField.length ; i++){
			var csrc = "";
			
			//画像の場合以外は表示
			if(customField[i].title != "画像"){
				csrc = '<li data-role="list-divider">'+customField[i].title+'</li>';
			}
			//住所が空のとき
			if(customField[i].title == "住所" && customField[i].item[0].action == "" && customField[i].item[0].body == ""){
				csrc = "";
			}

			for(var j=0; j < customField[i].item.length ; j++){
				if(customField[i].item[j].action == "" && customField[i].item[j].body == ""){
					continue;
				}
				switch(customField[i].item[j].type){
					case "url":
						if(customField[i].item[j].action != undefined && customField[i].item[j].action != ""){
							csrc += '<li><a  data-transition="none" href="#" onClick="open_url(\''+customField[i].item[j].action+'\')" ><h2>'+customField[i].item[j].body+'</h2></a></li>';
						}
						else{
							csrc += '<li>'+customField[i].item[j].body+'</li>';
						}
						break;
					case "map":
						if(customField[i].item[j].action != undefined && customField[i].item[j].action != ""){
							csrc += '<li><a  data-transition="none" href="#" onClick="open_url(\'http://maps.google.com/maps?q=loc:'+customField[i].item[j].action+'%28'+detailData.base.title+'%29\')" rel="external" ><h2>'+customField[i].item[j].body+'</h2></a></li>';
						}
						else{
							csrc += '<li>'+customField[i].item[j].body+'</li>';
						}
						break;
					case "id":
						if(customField[i].item[j].action != undefined && customField[i].item[j].action != ""){
							csrc += '<li><a  data-transition="none" href="#" onclick="switchDetailPage('+customField[i].item[j].action+')"><h2>'+customField[i].item[j].body+'</h2></a></li>';
						}
						else{
							csrc += '<li>'+customField[i].item[j].body+'</li>';
						}
						break;
					case "image":
						var obj = {};
						obj.action	= customField[i].item[j].action;
						obj.body	= customField[i].item[j].body;
						images.push(obj);
						break;
					case "tel":
						if(customField[i].item[j].action != undefined && customField[i].item[j].action != ""){
							csrc += '<li><a  data-transition="none" href="tel:'+customField[i].item[j].action+'" ><h2>'+customField[i].item[j].body+'</h2></a></li>';
						}
						else{
							csrc += '<li>'+customField[i].item[j].body+'</li>';
						}
						break;
					case "mail":
						if(customField[i].item[j].action != undefined && customField[i].item[j].action != ""){
							csrc += '<li><a  data-transition="none" href="mail:'+customField[i].item[j].action+'" ><h2>'+customField[i].item[j].body+'</h2></a></li>';
						}
						else{
							csrc += '<li>'+customField[i].item[j].body+'</li>';
						}
						break;
					default:
						csrc += '<li>'+customField[i].item[j].body+'</li>';
						break;
				}
			}
			customFieldSrc	+= csrc;
		}
		
		//*********************************************
		//ページ内容を反映
		//*********************************************
		$('#detailTitle').text(detailData.base.title);
		$('#detailTitleCont').text(detailData.base.title);
		$('#detailBody').html(detailData.base.body.replace(/\n/g,'<br/><br/>'));
		
		//キャッシュに保存
		_selectedDetailCache	= detailData;
		
		//twitterつぶやき
		//$('#btnDetailTwitter').attr("onClick","open_url('http://twitter.com/?status="+detailData.base.title+"%20%23soraichi')");

		//スタンプボタンの制御
		//showBtnStamp(detailData.base.id);
		
		//お気に入りボタンの状態設定
		showBtnBookmark(detailData.base.id);
		
		//周辺スポットボタンの設定
		$("#btnNearSpot").attr("onClick","showNearSpotResultView("+detailData.base.lat+","+detailData.base.lng+")");
		
		//住所がないもの
		//地図設定
		if(detailData.base.latlng != undefined && detailData.base.latlng != ""){
			$("#detailMap").attr('onClick','open_url("http://maps.google.com/maps?q=loc:'+detailData.base.latlng+'%28'+detailData.base.title+'%29")');
			$("#detailMap").css("display","inherit");
			$("#btnRoute").css("display","inherit");
			$("#btnNearSpot").css("display","inherit");
		}
		else{
			$("#detailMap").css("display","none");
			$("#btnRoute").css("display","none");
			$("#btnNearSpot").css("display","none");
		}
		
		//画像を表示
		if(images.length > 0){
			_detailImagesCache = images;
			$('#slider').css({"display":"inherit"});

			var imgs = "";
			_detailImgsTmp = imgs;
			for(var i=0; i < _detailImagesCache.length; i++){
				//画像のあり無しチェック
				var imgUrl 	= 'images/archives/'+_detailImagesCache[i].action;
				$.ajax({
					url: imgUrl,
					dataType:'text', 
					data: "",
					timeout: 30000, //3 second timeout, 
					success: getImageFunc(i,true), 
					error: getImageFunc(i,false)
				});

				//imgs += '<li><img src="images/archives/'+_detailImagesCache[i].action+'" /></li>';
			}
			
			//２枚以上のとき最初に右アイコンを表示
			if(images.length > 1){
				$("#mrkLeft").css({"display":"none"});
				$("#mrkRight").css({"display":"inherit"});
			}
			else{
				$("#mrkLeft").css({"display":"none"});
				$("#mrkRight").css({"display":"none"});
			}
			

		}
		else{
			$('#slider').css({"display":"none"});
		}
		
		//$("#").attr("onclick","showComment()");
		$("#btnDetailShowComment").attr("onClick","showComment("+_selectedId+")");
		
		//ページ遷移を開始
		$.mobile.changePage('#detail',{transition: "none"});
		$.mobile.silentScroll(0);

		//$("#detailImgUl").html(imgs);
		
		//リストを表示
		$("#ul-detail-list li").remove();
		$("#ul-detail-list").append(customFieldSrc);
		$("#ul-detail-list").listview();
		$("#ul-detail-list").listview("refresh");
		
	}
	
	var _detailImgsTmp = "";
	function getImageFunc(no,flg){
		return function(jqXHR, status, errorThrown){
			if(flg){
				//ファイルがある場合はそれを
				if(no==0){
					_detailImgsTmp += '<li style="display:block"><img width="100%" src="'+this.url+'" /></li>';
				}
				else{
					_detailImgsTmp += '<li style="display:none"><img width="100%" src="'+this.url+'" /></li>';
				}
				$("#detailImgUl").html(_detailImgsTmp);
			}
			else{
				if(no==0){
					_detailImgsTmp += '<li style="display:block"><img width="100%" src="http://apisoraichi.artful.jp/'+this.url+'" /></li>';
				}
				else{
					_detailImgsTmp += '<li style="display:none"><img width="100%" src="http://apisoraichi.artful.jp/'+this.url+'" /></li>';
				}
				$("#detailImgUl").html(_detailImgsTmp);
			}
		}
	}
	
	/** 検索画面 **/
	function searchKwd(){

		var kwd 	= $("#searchInputKwd").val();
		var result	= [];

		//データを検索
		for(var i=0; i < _spotData.length ; i++){
			if(_spotData[i].base.title.indexOf(kwd.toString(),0) >= 0 || _spotData[i].base.body.indexOf(kwd.toString(),0) >= 0 ){
				result.push(_spotData[i]);
			}
		}
		
		var src = "";
		for(var i=0; i < result.length ; i++){
			thumbnail	= "";
			if(result[i].base.thumbnail != undefined && result[i].base.thumbnail != ""){
				thumbnail = '<img src="images/archives/thumbnail/'+result[i].base.thumbnail+'" />';
			}
			else{
				thumbnail = '<img src="images/th_noimg.png" />';
			}
			src	+= '<li><a href="#" onclick="switchDetailPage('+result[i].base.id+')" data-transition="none">'+thumbnail+'<h3>'+result[i].base.title+'</h3><p>'+result[i].base.body.slice(0,130)+'</p></a></li>';
		}
		
		//*********************************************
		//ページ内容を反映
		//*********************************************
		//ページ遷移を開始
		$.mobile.changePage("#searchResult", {transition: "none"});
		showModal();

		if(kwd == undefined || kwd == ""){
			$('#searchResultTitle').text("キーワードを入力してください。");
			hideModal();
			return;
		}
		else if(src == ""){
			$('#searchResultTitle').text("キーワード「"+kwd+"」を検索した結果、該当する結果がありませんでした。");
			hideModal();
			return;
		}
		else{
			$('#searchResultTitle').text("キーワード「"+kwd+"」の検索結果");
		}
		$("#ul-search-result li").remove();
		$("#ul-search-result").append(src);
		$("#ul-search-result").listview();
		$("#ul-search-result").listview("refresh");


		hideModal();
	}





	//************************************************
	//* お気に入りの登録
	//************************************************
	function saveBookmark(id){
		var list 	= readBookmark();
		if(list == undefined){
			list = "";
		}

		var bmkAry	= list.split(",");
		if(bmkAry.indexOf(id.toString(),0) == -1){
			bmkAry.push(id);
			var bmkData	= bmkAry.join(",");
			window.localStorage.setItem('soraichi.bmk', bmkData);
			//window.localStorage.setItem('count', count);
			alert("お気に入りに登録しました。");
			//アイコンを登録済みに変更
			showBtnBookmark(id);
		}
	}

	function deleteBookmark(id){
		var list 	= readBookmark();
		var bmkAry	= list.split(",");
		var idx		= bmkAry.indexOf(id.toString(),0);

		bmkAry.splice(idx,1);	//削除
		var bmkData	= bmkAry.join(",");
		window.localStorage.setItem('soraichi.bmk', bmkData);
		//window.localStorage.setItem('count', count);
		alert("お気に入りを解除しました。");

		//アイコンを登録済みに変更
		showBtnBookmark(id);
	}


	//ブックマークの読み込み
	function readBookmark(){
		var msg = window.localStorage.getItem("soraichi.bmk");
		return msg;
	}

	//ブックマークの登録があるか
	function enableBookmark(id){
		var list 	= readBookmark();
		if(list == undefined){
			return false;
		}
		var bmkAry	= list.split(",");
		if(bmkAry.indexOf(id.toString(),0) >= 0){
			return true;
		}
		else{
			return false;
		}
	}
	
	/** お気に入りボタンの制御 **/
	function showBtnBookmark(id){
		//お気に入りの状態反映
		if(enableBookmark(id)){
			//登録済みならボタンデザイン変更
			$('#btnSaveBookmarkImg').attr("src","images/btn_favorite/btn_bookmark_on.png");
			//登録解除ボタンイベント設定
			$('#btnSaveBookmark').attr("onClick","deleteBookmark("+id+")");
		}
		else{
			//ボタンデザイン変更
			$('#btnSaveBookmarkImg').attr("src","images/btn_favorite/btn_bookmark.png");
			//登録ボタンイベント設定
			$('#btnSaveBookmark').attr("onClick","saveBookmark("+id+")");
		}
	}


	//******************************************
	//スポットまでのルート表示
	//******************************************
	var _showRouteFlg = false;
	function showRoute(){
		// 現在地を取得する。
		if (navigator.geolocation) {
			alert("位置情報(GPS)機能を利用して現在地を判定いたします。取得まで少し時間が掛かりますのでしばらくお待ちください。");
			// Geolocationに関する処理を記述
			_showRouteFlg = false;
			// 現在の位置情報を取得
			showModal();
			getMyPos(showRouteResult,errorPos);	//success function  and  error function
		}
		else{
			alert("本端末ではGeolocationが使えません。");
		}			
	}
	//現在地を取得してgoogle mapのURLを開いてやる
	function showRouteResult(pos){
		var timerId = setTimeout(function() {
			clearTimeout(timerId);
			//alert("timeout!");
			navigator.geolocation.clearWatch(_watchId);

			var lat	=savedPos.coords.latitude;
			var lng	=savedPos.coords.longitude;

			if(!_showRouteFlg){
				alert("位置情報の精度が低いため正確な場所を特定できませんでした。ご利用の機種や天候・屋内などの環境によってはGPSの精度が出ない場合がありますので再度お試しください。");
				hideModal();
				return;


				alert("スポットまでの距離:"+distance+"m");
				var obj	= getDetail(_selectedId);
				//★★★★google開くように書き換える			showNearSpotResultView(lat,lng);
				var ahref = "http://maps.google.com/maps?saddr="+lat+","+lng+"&daddr="+obj.base.lat+","+obj.base.lng+"("+obj.base.title+")&dirflg=";
				var src	=  "<p>目的地までのアクセス方法を選択してください。</p><ul><li><a href='"+ahref+"d' rel='external'>車で行く</a></li>";
				src 	+= "<li><a href='"+ahref+"w' rel='external'>徒歩で行く</a></li>";
				src 	+= "<li><a href='"+ahref+"t' rel='external'>電車で行く</a></li></ul>";
				
				$.mobile.changePage("#popupDialog",{transition:'none',role:'dialog'});
				$("#popupTitle").text("経路の表示");
				$("#popupContents").html(src);
				_showRouteFlg = true;
			}
		},_gpsTimeOut);//end setTimeout

		//任意の精度以下になったら取得をやめる
		savedAccuracy = pos.coords.accuracy;
		savedPos = pos;
		if(pos.coords.accuracy < _accuracyVal ){
			//alert("GPS精度:"+pos.coords.accuracy);
			navigator.geolocation.clearWatch(_watchId);
			//$("#startPl").val(pos.coords.latitude + "," + pos.coords.longitude);
			//
			var lat	= pos.coords.latitude;
			var lng	= pos.coords.longitude;
			var obj	= getDetail(_selectedId);
	
			//alert("スポットまでの距離:"+distance+"m");
			//★★★★google開くように書き換える			showNearSpotResultView(lat,lng);
			if(!_showRouteFlg){
				var ahref = "http://maps.google.com/maps?saddr="+lat+","+lng+"&daddr="+obj.base.lat+","+obj.base.lng+"("+obj.base.title+")&dirflg=";
				hideModal();
				$.mobile.changePage("#popupDialog",{transition:'none',role:'dialog'});
				$("#popupTitle").text("経路の表示");
				var src	=  "<p>目的地までのアクセス方法を選択してください。</p><ul><li><a href='#' onClick='open_url(\""+ahref+"d\")'>車で行く</a></li>";
				src 	+= "<li><a href='#' onClick='open_url(\""+ahref+"w\")'>徒歩で行く</a></li>";
				src 	+= "<li><a href='#' onClick='open_url(\""+ahref+"t\")'>電車で行く</a></li></ul>";
				$("#popupContents").html(src);
				_showRouteFlg = true;
			}
		}
	}

	//******************************************
	//近隣スポットの検索
	//******************************************
	var _showNearSpotFlg = false;
	function showNearSpot(){
		// 現在地を取得する。
		if (navigator.geolocation) {
			alert("位置情報(GPS)機能を利用して現在地を判定いたします。取得まで少し時間が掛かりますのでしばらくお待ちください。");
			// Geolocationに関する処理を記述
			$.mobile.loadingMessageTextVisible = true;
			showModal();

			// 現在の位置情報を取得
			_showNearSpotFlg = false;
			getMyPos(showNearSpotResult,errorPos);	//success function  and  error function
		}
		else{
			alert("本端末ではGeolocationが使えません。");
		}			
	}


	function showNearSpotResult(pos){
		var timerId = setTimeout(function() {
			clearTimeout(timerId);
			//alert("timeout!");
			navigator.geolocation.clearWatch(_watchId);


			//
			var lat	=savedPos.coords.latitude;
			var lng	=savedPos.coords.longitude;

			if(!_showNearSpotFlg){
				alert("位置情報の精度が低いため正確な場所を特定できませんでした。ご利用の機種や天候・屋内などの環境によってはGPSの精度が出ない場合がありますので再度お試しください。");
				hideModal();
				return;


				//alert("スポットまでの距離:"+distance+"m");
				showNearSpotResultView(lat,lng);
				_showNearSpotFlg = true;
			}

		},_gpsTimeOut);//end setTimeout

		//任意の精度以下になったら取得をやめる(誤差1000m = _accuracyVal)
		savedAccuracy = pos.coords.accuracy;
		savedPos = pos;
		if(pos.coords.accuracy < _accuracyVal ){
			//alert("GPS精度:"+pos.coords.accuracy);
			navigator.geolocation.clearWatch(_watchId);
			//$("#startPl").val(pos.coords.latitude + "," + pos.coords.longitude);
			//
			var lat	= pos.coords.latitude;
			var lng	= pos.coords.longitude;
	
			//alert("スポットまでの距離:"+distance+"m");
			if(!_showNearSpotFlg){
				showNearSpotResultView(lat,lng);
				_showNearSpotFlg = true;
			}
			hideModal();
		}
	}

	function removeMarkers() {
		//ボタンが押されたら、マーカーの配列に対して
		//setMap(null)を実行し、地図から削除
		_markers.forEach(function(marker, idx) {
			marker.setMap(null);
		});
	}


	/** 周辺地図の表示 **/
	function showNearSpotResultView(myLat,myLng){
		var list = _spotData;

		//googlemapが使えるかテスト - start
		var checkLat = "";
		try{
			checkLat = new google.maps.LatLng(myLat,myLng);
		}
		catch(e){
			//読み込みできないので終了
			alert("インターネットに接続されていないため地図を表示することができません。");
			//alert(e);
			hideModal();
			return;
		}
		//googlemapが使えるかテスト - end



		//表示データの生成
		var data = new Array();//マーカー位置の緯度経度
		for(var j=0; j < list.length; j++){
			var lat = list[j].base.lat;
			var lng = list[j].base.lng;
			var thumb = "";
			if(lat == 0 || lng == 0 || (lat == myLat && lng == myLng)){
				continue;
			}

			//距離計算
			var distance = geoDistance(lat,lng,myLat,myLng,5);
			

			//[dis]m以内
			if(distance < _nearDistance){
				if(list[j].base.thumbnail != "" && list[j].base.thumbnail != undefined){
					thumb = '<img src="images/archives/thumbnail/'+list[j].base.thumbnail+'" />';
				}
				data.push({position: new google.maps.LatLng(lat,lng), content:'<div class="mapbox">'+thumb+'<h3>'+list[j].base.title+'</h3><a onClick="switchDetailPage('+list[j].base.id+')"  href="#"><strong>詳細をみる</strong></a>'});
			}
		}

		if(data.length == 0){
			alert("近隣にそらいちスポットはありません。");
		}
		else{
			//マップ表示
			$.mobile.changePage('#map',{transition: "none"});
			//マップの初期化
			if(_mapInit){
				$('#map_canvas').gmap('clear', 'markers');
				$('#map_canvas').gmap('destroy');
			}
			_mapInit = true;
			//マップの表示
			var myLatlng = new google.maps.LatLng(myLat,myLng);
	        $("#map_canvas").gmap({"center":myLatlng, "zoom":11});

			for (var i=0; i < data.length; i++) {
				if(data[i].label != undefined){
					var icon = 'http://www.google.com/mapfiles/marker' + data[i].label + '.png';
					$('#map_canvas').gmap('addMarker', { 'position':data[i].position,'icon':icon, 'bounds': true,'content':data[i].content }).click(function() {
							$('#map_canvas').gmap('openInfoWindow', { 'content':this.content}, this);
					});
				}
				else{
					$('#map_canvas').gmap('addMarker', { 'position':data[i].position, 'bounds': true,'content':data[i].content }).click(function() {
							$('#map_canvas').gmap('openInfoWindow', { 'content':this.content}, this);
					});
				}
	
			}
		}

		//センターマーカーを表示
		//現在地マーカーの表示
		var image = 'images/icon/icon_now.png';
		if(!_showNearSpotFlg){
			image = 'images/icon/icon_now.png';
		}
		else{
			image = 'images/icon/icon_now.png';
		}

		$('#map_canvas').gmap('addMarker', { 'position':myLatlng,'icon':image,"zIndex" : 999, 'bounds': true}).click(function() {
		});

		hideModal();
	}


// JavaScript Document


	var _kanaAry = [["あ","い","う","え","お"],
					 ["か","き","く","け","こ"],
 					 ["さ","し","す","せ","そ"],
 					 ["た","ち","つ","て","と"],
					 ["な","に","ぬ","ね","の"],
					 ["は","ひ","ふ","へ","ほ"],
				 	 ["ま","み","む","め","も"],
					 ["や","ゆ","よ"],
					 ["ら","り","る","れ","ろ"],
					 ["わ","を","ん"]];
					 
	var _areaAry = ["赤平市","芦別市","妹背牛町","岩見沢市","歌志内市","浦臼町","雨竜町","上砂川町","栗山町","新十津川町","砂川市","滝川市","秩父別町","月形町","奈井江町","長沼町","南幌町","沼田町","美唄市","深川市","北竜町","三笠市","夕張市","由仁町"];
	var _eventmonthAry = ["1","2","3","4","5","6","7","8","9","10","11","12"];


function onDeviceReady() {
    // ファイルシステム情報を取得します。
    // 取得に成功したときのコールバック関数としてgotFSを呼んでいます。失敗したときにはfailが呼ばれます。
    window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, gotFS, fail);
 }
 
 // ファイルシステム情報取得後に呼ばれるメソッド
//  扱う対象のファイル情報を取得します
 function gotFS(fileSystem) {
   // 読み込みと違い、書き込みの場合は、新規作成するのかとかのオプションを設定します。
   // 新規作成のの場合は{create:true}だけでも大丈夫です。
 // 成功したらgotFileEntryをコールバック関数として呼びます。
   fileSystem.root.getFile("user.data", {create: true, exclusive: false}, gotFileEntry, fail);
 }
 
// 扱う対象がゲットできたら呼ばれます
 // 書き込み処理の準備を開始します
 function gotFileEntry(fileEntry) {
   // 準備完了したらgotFileWriterをコールバック関数として呼びます。
   fileEntry.createWriter(gotFileWriter, fail);
 }
 
 // 書き込み準備完了したら呼ばれるメソッドです
 // 実際に書き込みを実施します
 function gotFileWriter(writer) {
      // イベントリスナーです
      writer.onwriteend = function(evt) {
         console.log("contents of file now 'some sample text'");
         writer.truncate(11);
         writer.onwriteend = function(evt) {
             console.log("contents of file now 'some sample'");
             writer.seek(4);
             writer.write(" different text");
             writer.onwriteend = function(evt){
                 console.log("contents of file now 'some different text'");
             }
         };
     };
    // 書き込み処理を実施します。
    writer.write("some sample text");
	alert("書き込みました！");
 }
 
 // 失敗したときにコールバックで呼ばれる関数です
 // エラー情報をコンソールに出力しています
 function fail(error) {
     console.log(error.code);
 }


	//ラベリング
	function listSortLabeling(list,mode,cat){
		//ソート
		var resAry = [];
		var kidx = 0;
		var tmpAry = [];

		var tmpList	= getList(cat);
		list = sortSpotData(tmpList,mode);
		
		//ラベル貼り
		if(mode == "area"){
			//市町村ごとにまとめる
			for(var i=0; i < list.length ; i++){
				if(tmpAry[list[i].base.area] == undefined){
					tmpAry[list[i].base.area] = [];
				}
				tmpAry[list[i].base.area].push(list[i]);
			}
			//
			for(var j=0; j < _areaAry.length ; j++){
				if(tmpAry[_areaAry[j]] != undefined){
					resAry.push({"label":_areaAry[j]});	//セクション行追加
					resAry = resAry.concat(tmpAry[_areaAry[j]]);
				}
			}
		}
		else if(mode == "eventmonth"){
			//市町村ごとにまとめる
			for(var i=0; i < list.length ; i++){
				if(tmpAry[list[i].base.eventmonth] == undefined){
					tmpAry[list[i].base.eventmonth] = [];
				}
				tmpAry[list[i].base.eventmonth].push(list[i]);
			}
			//
			for(var j=0; j < _eventmonthAry.length ; j++){
				if(tmpAry[_eventmonthAry[j]] != undefined){
					resAry.push({"label":_eventmonthAry[j]+"月"});	//セクション行追加
					resAry = resAry.concat(tmpAry[_eventmonthAry[j]]);
				}
			}
		}
		else if(mode == "name"){
			list.reverse();
			for(var i=0; i < list.length ; i++){
				for(var m=kidx; m < _kanaAry.length ; m++){
					if(checkKana(_kanaAry[m],list[i].base.kana)){
						resAry.push({"label":_kanaAry[m][0]+"行"});
						kidx = m+1;
						break;
					}
				}
				resAry.push(list[i]);
			}
		}
		return resAry;
	}
	
	function checkKana(ary,val){
		var str = val.substr(0,1);
		if(ary.indexOf(str) >= 0){
			return true;
		}
		return false;
	}
	
	function initJsonDataFunc(data){
		var obj = data.data;
		var msg = obj.msg;
		var list = obj.list;
		$('#msg').text(msg);
		for(key in list){
			$('<li>').text(list[key]).appendTo('#place');
		}
		$('#place').listview();		
		$('#place').listview('refresh');		
	}

	/** ソート **/
	function sortSpotData(aryData,mode){
		switch(mode){
			case "area":
				aryData.sort(
					function(a,b){
						var aName = a["base"].area;
						var bName = b["base"].area;
						if( aName < bName ) return 1;
						if( aName > bName ) return -1;
						return 0;
				});
				break;
			default:
				aryData.sort(
					function(a,b){
						var aName = a["base"].kana;
						var bName = b["base"].kana;
						if( aName < bName ) return 1;
						if( aName > bName ) return -1;
						return 0;
				});
		}
		return aryData;
	}
	
	
	//random image
	function randomImg(){
		var imgname = "images/topslide/0"+Math.floor(Math.random()*6).toString()+".jpg";
		$("#topImage").attr("src",imgname);
		setTimeout('randomImg()',4000);
	}
	
	/** カテゴリデータの整形 **/
	function dataSetCategories(ary){
		res = [];
		for(var i=0; i < ary.length; i++){
			var obj 	= [];
			obj.title	= ary[i].name; 
			obj.body	= ary[i].body.replace(/\n/g,'<br/><br/>'); 
			obj.image	= ary[i].thumbnail; 
			obj.otherlist	= ary[i].otherlist; 
			res[ary[i].id] = obj;
		}
		return res;
	}

		//カテゴリデータを取得
	function getList(cat,mode){
		list = [];

		//途中でデータがなくなっているとき
		if(_spotData == undefined){
			var data = "";
			if(data = $.evalJSON(window.localStorage.getItem("soraichi.json"))){
				_spotData		= data.spots;
				_categoryData 	= dataSetCategories(data.categories);
				//alert("キャッシュからデータを読み込みました。");		
			}
			else{
				alert("スポットデータがありません。一度インターネット環境下にて本アプリを起動して3分ほど待ちデータを取得してください。");
			}
		}

		//データ作成
		for(var i=0; i < _spotData.length ; i++){
			if(-1 != _spotData[i].base.categories.indexOf(cat.toString(),0)){
				list.push(_spotData[i]);
			}
		}
		
		return list;
	}
	
	

	//詳細データを取得
	function getDetail(id){
		list = [];
		
		//途中でデータがなくなっているとき
		if(_spotData == undefined){
			var data = "";
			if(data = $.evalJSON(window.localStorage.getItem("soraichi.json"))){
				_spotData		= data.spots;
				_categoryData 	= dataSetCategories(data.categories);
				//alert("キャッシュからデータを読み込みました。");		
			}
			else{
				alert("スポットデータがありません。一度インターネット環境下にて本アプリを起動して3分ほど待ちデータを取得してください。");
			}
		}
		
		//データ作成
		for(var i=0; i < _spotData.length ; i++){
			if(id == _spotData[i].base.id){
				list = _spotData[i];
			}
		}
		
		return list;
	}	
	
	/** モーダル **/
	function showModal(){
		$("body").append('<div class="modalWindow"/>');
		$.mobile.showPageLoadingMsg();
		setTimeout('hideModal()', 60000);
	}
	
	function hideModal(){
		$(".modalWindow").remove();
		$.mobile.hidePageLoadingMsg();	
	}

	

	//*************************************************************
	/** カテゴリページへの遷移 **/
	//*************************************************************
	function switchCategoryPage(param) {


		
		var list = [];
		var src = "";

		//カテゴリに属する配列データを取得
		list	= getList(param);


		_selectedCategoryId	= param;

		if(_categoryData[param].otherlist != undefined && _categoryData[param].otherlist != ""){
			list = [];
			//リスト表示の指定otherlistがされているとき
			var ar	= _categoryData[param].otherlist.split("\n");
			for(var i=0; i < ar.length; i++){
				var liob		= ar[i].split(":");
				var con 		= liob[1].replace(/\r/g,"");
				var frontStr	= "";	//先頭付属用
				if(liob[2] != undefined){
					frontStr	= liob[2].replace(/\r/g,"");
				}
				switch(liob[0]){
					case "li.div":
						list.push({"label":con});
						break;
					case "li.id":
						var obj = getDetail(con)
						obj.base.frontStr = frontStr;
						list.push(obj);
						break;
					default:
						list.push({"text":con});
				}
			}
		}
		else{
			//通常
			//ソート＆ラベリング-市町村別など area or name
			if(_selectedCategoryId == "05"){
				list = listSortLabeling(list,"eventmonth",param);
			}
			else{
				list = listSortLabeling(list,"area",param);
			}
		}
		_categoryListCache	= list;
		
		//通常の表示
		for(var i=0; i < list.length ; i++){
			if(list[i] == undefined){
				continue;
			}
			//ラベルの場合
			if(list[i].label != undefined){
				src += '<li data-role="list-divider">'+list[i].label+'</li>';
				continue;
			}
			//通常テキストの場合
			if(list[i].text != undefined){
				src += '<li>'+list[i].text+'</li>';
				continue;
			}
			thumbnail	= "";
			var test = list[i].base.thumbnail;
			if(list[i].base.thumbnail != undefined && list[i].base.thumbnail != ""){
				thumbnail = '<img src="images/archives/thumbnail/'+list[i].base.thumbnail+'" />';
			}
			else{
				thumbnail = '<img src="images/th_noimg.png" />';
			}
			var fstr="";
			if(list[i].base.frontStr != undefined && (_categoryData[param].otherlist != undefined && _categoryData[param].otherlist != "")){
				fstr=list[i].base.frontStr;
			}
			src	+= '<li><a href="#" onclick="switchDetailPage('+list[i].base.id+')" data-transition="none">'+thumbnail+'<h3>'+fstr+list[i].base.title+'</h3><p>'+list[i].base.body+'</p></a></li>';
			//リストに表示
		}
		
		//*********************************************
		//ページ内容を反映
		//*********************************************
		$('#categoryTitle').text(_categoryData[param].title);
		$('#cateogryTitleCont').text(_categoryData[param].title);
		$('#categoryBody').html(_categoryData[param].body);
		
		//画像を表示
		if(_categoryData[param].image != undefined && _categoryData[param].image != ""){
			$('#categoryImg').attr("src","images/category/"+_categoryData[param].image);
			$('#categoryImg').css({"display":"inherit"});
		}
		else{
			$('#categoryImg').attr("src","images/th_noimg.png");
			$('#categoryImg').css({"display":"none"});
		}
		
		//ページ遷移を開始
		$.mobile.changePage('#category',{transition: "none"});

		$("#ul-category-list li").remove();
		$("#ul-category-list").append(src);
		$("#ul-category-list").listview();
		$("#ul-category-list").listview("refresh");


		//マップリンク設定
		$("#btnCategoryMap").attr("onClick","showMap('"+param+"')");

		//切り替え設定
		if(_selectedCategoryId == "05"){
			$("#categorySelectSwich").attr("onClick","switchCategoryList('area')");
			$("#categorySelectSwich").text("市町村ごとで表示");
		}
		else{
			$("#categorySelectSwich").attr("onClick","switchCategoryList('name')");
			$("#categorySelectSwich").text("50音順で表示");
		}
		
		//
		if(src == "" || (_categoryData[param].otherlist != undefined && _categoryData[param].otherlist != "")){
			$("#categorySelecterBox").css("display","none");
		}
		else{
			$("#categorySelecterBox").css("display","inherit");
		}

	}
	//*************************************************************
	/** 50音順/市町村表示切替 **/
	//*************************************************************
	function switchCategoryList(mode) {
		//カテゴリに属する配列データを取得
		var list	= [];

		//ソート＆ラベリング-市町村別など area or name
		list = listSortLabeling(list,mode,_selectedCategoryId);


		var src = "";
		for(var i=0; i < list.length ; i++){
			//ラベルの場合
			if(list[i].label != undefined){
				src += '<li data-role="list-divider">'+list[i].label+'</li>';
				continue;
			}

			thumbnail	= "";
			var test = list[i].base.thumbnail;
			if(list[i].base.thumbnail != undefined && list[i].base.thumbnail != ""){
				thumbnail = '<img src="images/archives/thumbnail/'+list[i].base.thumbnail+'" />';
			}
			else{
				thumbnail = '<img src="images/th_noimg.png" />';
			}
			src	+= '<li><a href="#" onclick="switchDetailPage('+list[i].base.id+')" data-transition="none">'+thumbnail+'<h3>'+list[i].base.title+'</h3><p>'+list[i].base.body.slice(0,130)+'</p></a></li>';
		}

		//リストに表示
		$("#ul-category-list li").remove();
		$("#ul-category-list").append(src);
		$("#ul-category-list").listview();
		$("#ul-category-list").listview("refresh");

		//catがイベントのとき
		if(_selectedCategoryId == "05"){
			if(mode == "area"){
				$("#categorySelectSwich").attr("onClick","switchCategoryList('name')");
				$("#categorySelectSwich").text("50音順で表示");
			}
			else if(mode == "eventmonth"){
				$("#categorySelectSwich").attr("onClick","switchCategoryList('area')");
				$("#categorySelectSwich").text("市町村ごとで表示");
			}
			else{
				$("#categorySelectSwich").attr("onClick","switchCategoryList('eventmonth')");
				$("#categorySelectSwich").text("開催月で表示");
			}
		}
		else{
			if(mode == "area"){
				$("#categorySelectSwich").attr("onClick","switchCategoryList('name')");
				$("#categorySelectSwich").text("50音順で表示");
			}
			else{
				$("#categorySelectSwich").attr("onClick","switchCategoryList('area')");
				$("#categorySelectSwich").text("市町村ごとで表示");
			}
		}
	}


//******************************************************************************	
// Wait for PhoneGap to load
//******************************************************************************	
    // PhoneGap is ready
	/*
	document.addEventListener('DOMContentLoaded', function(){
        document.addEventListener('deviceready', onDeviceReady);
    });
 
    function onDeviceReady() {
      // PhoneGap開始後の処理を記述する
		alert("deviceready");
		// Geolocationに関する処理を記述
		// 現在の位置情報を取得
		retryCount = 0;
		startTime = new Date();
		getMyPos(resultStampPos,errorPos);	//success function  and  error function


    }
	*/
//******************************************************************************	
// webintent
//******************************************************************************	
function open_maps(latlng,q) {
    var address = q;
    window.webintent.startActivity({
        action: WebIntent.ACTION_VIEW,
        url: 'geo:"+latlng+"?q=' + address}, 
        function() {}, 
        function() {alert('地図を開くことができませんでした。')}
    );
  }
function open_url(urls) {
    window.webintent.startActivity({
        action: WebIntent.ACTION_VIEW,
        url: urls}, 
        function() {}, 
        function() {alert('ページを開くことができませんでした。')}
    );
  }

  function open_mail() {
      var extras = {};
      extras[WebIntent.EXTRA_SUBJECT] = "サブジェクト";
      extras[WebIntent.EXTRA_TEXT] = "テキスト";
      window.webintent.startActivity({
        action: WebIntent.ACTION_SEND,
        type: 'text/plain',
        extras: extras
      }, function() {}, function() {alert('Failed to send email via Android Intent');});
  }
  function open_Acrobat() {
      window.webintent.startActivity(
      {
      action: WebIntent.ACTION_VIEW,
      type: 'application/pdf'
      },
      function(){},
      function(){alert('Failed to send acrobat via Android Intent');}
    );
  }
//*****************************************************************************


// JavaScript Document
	var _spotData;
	var _detailDataTmp;
	var _initFlg	= false;
	

		
	var _categoryListCache	= [];
	var _selectedCategoryId	= "";
	var _selectedDetailCache= [];
	var _detailImagesCache	= [];
	var _selectedId			= "";

	var _nearDistance		= 10000;	//近隣スポットの判定半径m(現在地と比べてこの範囲内であれば近隣スポットとして表示)
	var _stampAreaDistance	= 1000;		//スタンプを押せる距離の誤差(m)
	var _accuracyVal		= 500;		//GPS精度-許容できる誤差範囲(m)
	var _maximumAge			= 300000;	//GPSキャッシュ時間(GPS) msec -3分以内にGPSで値が取得されていればそれを使う
	var _gpsTimeOut			= 30000;	//GPSのタイムアウト秒数

	var _date 		= new Date();
	var _dateStr	= "";
	var _day		= "";
	var _month		= "";
	if(_date.getDate() < 10){
		_day = "0"+_date.getDate().toString();
	}
	else{
		_day = _date.getDate().toString();
	}
	if((_date.getMonth()+1) < 10){
		_month = "0"+(_date.getMonth()+1).toString();
	}
	else{
		_month = (_date.getMonth()+1).toString();
	}
	_dateStr		= _date.getFullYear()+"-"+_month+"-"+_day;
	

 
	function onDeviceReady() {
		//起動画面の表示
		cordova.exec(null, null, "SplashScreen", "hide", []);
		//callNativePlugin('success');
		
		document.addEventListener("menubutton", doMenu, false);
	}

	//戻るボタンの処理
	document.addEventListener("backbutton", handleBackButton, true);
	function handleBackButton(){
		hideModal();
	};


    $(document).bind("mobileinit", function() {
      //  $.mobile.page.prototype.options.addBackBtn = true;
		$.mobile.defaultTransition = "none";	//ページ切り替え
		$.mobile.loadingMessage = "読み込み中・・・";
		$.mobile.pageLoadErrorMessage = "読み込みに失敗しました";
		$.mobile.buttonMarkup.hoverDelay = 50;

		//クロスドメイン
		$.mobile.allowCrossDomainPages = true;
		$.support.cors	= true;
    });

	function getNewData(){
		$.getJSON("http://apisoraichi.artful.jp/update/list.json?rn="+Math.random()*999999,
			function(data,status,xhr){
				if(xhr.status == 200){
					var json = $.toJSON(data);
					window.localStorage.setItem('soraichi.json', json);
					_spotData		= data.spots;
					_categoryData 	= dataSetCategories(data.categories);
					alert("最新のデータにアップデートいたしました。");
				}
				else{
					//alert("インターネットに接続されていません。再度アプリを起動しなおしてください。");
					getJSONError();
				}
			}
		);
	}

	//最初のデータを読み込み
	function localInitData(){
		$.getJSON("list.json",
			function(data,status){
				var json = $.toJSON(data);
				window.localStorage.setItem('soraichi.json', json);
			}
		);
	}
	
	//初回でネットも繋がっていないときはローカルのlist.jsonを表示
	function loadInitJSON(){
		$.getJSON("list.json",
			function(data){
				//alert("初回読み込みend");
				_spotData		= data.spots;
				_categoryData 	= dataSetCategories(data.categories);
		});
	}

	/** 回線などで取得できない場合 **/	
	function getJSONError(){
		var lastupdate = window.localStorage.getItem("soraichi.version");
		if(lastupdate == undefined){
			//alert("初回読み込みstart");
			loadInitJSON();
		}
		else{
			//alert("cache");
			//キャッシュから読み込み
			getCacheData();
		}
	}
	
	//キャッシュからデータを読み込み
	function getCacheData(){
		var data = "";
		if(data = $.evalJSON(window.localStorage.getItem("soraichi.json"))){
			_spotData		= data.spots;
			_categoryData 	= dataSetCategories(data.categories);
			//alert("キャッシュからデータを読み込みました。");		
		}
		else{
			var lastupdate = window.localStorage.getItem("soraichi.version");
			if(lastupdate == undefined){
				//初回でネットも繋がっていないときはローカルのlist.jsonを表示
				$.getJSON("list.json",
					function(data){
						_spotData		= data.spots;
						_categoryData 	= dataSetCategories(data.categories);
				});
			}
			//alert("スポットデータがありません。一度インターネット環境下にて本アプリを起動して3分ほど待ちデータを取得してください。");
		}
	}


	document.addEventListener('deviceready',onDeviceReady,false);
	$(document).ready(function() {
		//データのバージョンを確認

		$.ajax({ 
			url: "http://apisoraichi.artful.jp/update/", 
			dataType:'json', 
			success: function(data,status,xhr){
				if(xhr.status == 200){
					var resstr	= data.update;
					var lastupdate = window.localStorage.getItem("soraichi.version");
					
					//alert("VERSION:"+resstr+":"+lastupdate);
					//現在のバージョンと違うとき
					if(resstr != lastupdate){
						//サーバーから読み込み
						//getCacheData();
						
						if(confirm("サーバー上に最新のアップデータがあります。更新しますか？")){
							window.localStorage.setItem('soraichi.version', resstr);
							getNewData();
						}
						else{
							//キャッシュから読み込み
							getCacheData();
						}
					}
					else{
						//キャッシュから読み込み
						getCacheData();
					}
				}
				else{
				}
			},
			timeout: 10000, //10 second timeout, 
			error: function(jqXHR, status, errorThrown){
					getJSONError();
			} 
		});

		//画像のスライド
		setTimeout('randomImg()',4000);

		//navbarの制御
		$("#detail,#category,#search,#searchResult,#cat-food,#cat-drive,#about,#map,#stamp,#bookmark").bind('pageinit',function(){
			$(this).find("[data-role=header] , [data-role=footer]").fixedtoolbar({ tapToggle: false }); 
		});
		$("#home").bind('pageinit',function(){
			$(this).find("[data-role=footer]").fixedtoolbar({ tapToggle: false }); 
		});

		//***************************************************************************
		//* ページの基本制御
		//***************************************************************************
		$("#registar").bind("pagebeforeshow", function() {
			//ボタン処理
			$("#selectBox1").css("display","none");
			$("#selectBox2").css("display","none");
		});
		/** 住所のセレクト分岐 **/
		$("#registarAddress").bind("change", function() {
			//ボタン処理
			var sel = $("#registarAddress").val();
			switch(sel){
				case "0":
					$("#selectBox1").css("display","none");
					$("#selectBox2").css("display","none");
					break;
				case "1":
					$("#selectBox1").css("display","inherit");
					$("#selectBox2").css("display","none");
					break;
				case "2":	
					$("#selectBox1").css("display","none");
					$("#selectBox2").css("display","inherit");
					break;
			}
		});

		$("#bookmark").bind("pagebeforeshow", function() {
			//戻る操作対策
			showBookmark();
		});

		$("#stamp").bind("pagebeforeshow", function() {
			//戻る操作対策
			//showModal();
			//showStamp();
		});


		$("#init").bind("pagebeforeshow", function() {
				if(enableUserRegistar()){
					$.mobile.changePage('#home',{transition: "none"});
				}
				else{
					$.mobile.changePage('#registar',{transition: "none"});
				}
				_initFlg = true;
		});

		$('#detail').live('pagebeforeshow',function(){

			//別アプリ遷移のときのidキャッシュ
			if(_selectedId == ""){
				param = window.localStorage.getItem("soraichi.cacheDetailId");
				switchDetailPage(param);
				//$.mobile.changePage('#detail',{transition: "none"});
			}
			else{
				window.localStorage.setItem("soraichi.cacheDetailId",_selectedId);
			}
	
		});

		$('#category').live('pagebeforeshow',function(){
	
			//別アプリ遷移のときのidキャッシュ
			if(_selectedCategoryId == ""){
				param = window.localStorage.getItem("soraichi.cacheCategoryId");
				switchCategoryPage(param);
				//$.mobile.changePage('#categry',{transition: "none"});
			}
			else{
				window.localStorage.setItem("soraichi.cacheCategoryId",_selectedCategoryId);
			}
		});


		//***************************************************************************
	});
	
	
	/** アプリの終了 **/
	function appExit(){
		if(confirm("このアプリを終了してもよろしいですか？")){
			//navigator.device.exitApp();
			//navigator.app.exitApp();
			navigator.device.exitApp();
			//callNativePlugin('success');

		}
	}

	/****************************************/
	/** 地図に現在地を表示 **/
	/****************************************/
	function showMapHereIcon(){
		// 現在地を取得する。
		if (navigator.geolocation) {
			//alert("位置情報(GPS)機能を利用して現在地を判定いたします。取得まで少し時間が掛かりますのでしばらくお待ちください。");
			// Geolocationに関する処理を記述
			_showRouteFlg = false;
			// 現在の位置情報を取得
			getMyPos(showMapHereIconSet,errorPos);	//success function  and  error function
		}
		else{
			//alert("本端末ではGeolocationが使えません。");
		}			
	}	
	function showMapHereIconSet(pos){
		var lat	=pos.coords.latitude;
		var lng	=pos.coords.longitude;
		var myLatlng = new google.maps.LatLng(lat,lng);

		//現在地マーカーの表示
		var image = 'images/icon/icon_now2.png';
		$('#map_canvas').gmap('addMarker', { 'position':myLatlng,'icon':image, "zIndex" : 999,'bounds': true}).click(function() {
		});
	}
	
	/****************************************/
	/** カテゴリ一覧地図表示 **/
	/****************************************/
	function showMap(cat){
		_selectedCategoryId	= cat;

		//マップ表示
		$.mobile.changePage('#map',{transition: "none"});
		
		//地図タイトル反映
		$('#categoryMapTitle').text(_categoryData[cat].title);

		showMapView();
	}

	var _currentInfoWindow = null;	//最後に開いた情報ウィンドウを記憶
	var _mapInit = false;
	/** 一覧地図表示 **/	
	function showMapView(centerLatlng){
		var list = getList(_selectedCategoryId);
		var latlng = "";
		//ドライブルートなどの特殊マーカーの場合を判別
		if(_categoryData[_selectedCategoryId] != undefined &&_categoryData[_selectedCategoryId].otherlist != undefined && _categoryData[_selectedCategoryId].otherlist != ""){
			//リスト表示の指定otherlistがされているとき
			var ar	= _categoryData[_selectedCategoryId].otherlist.split("\n");
			for(var i=0; i < ar.length; i++){
				var liob		= ar[i].split(":");
				var con 		= liob[1].replace(/\r/g,"");
				var frontStr	= "";	//先頭付属用
				if(liob[2] != undefined){
					frontStr	= liob[2].replace(/\r/g,"");
					frontStr	= frontStr.replace(/\)/g,"");
				}
				switch(liob[0]){
					case "li.id":
						for(var j=0; j < list.length; j++){
							//idが一致したなら
							if(list[j].base.id == con){
								list[j].base.mapLabel = frontStr;
							}
						}
						break;
				}
			}
		}

		if(centerLatlng == undefined){
			alat = 43.376606;
			alng = 141.867142;
		}
		else{
			var md = centerLatlng.split(",");
			alat = md[0];
			alng = md[1];
		}
		
		//インターネットに繋がっていない場合(googlemapにアクセスできない場合)
		var myLatlng = "";

		try{
			myLatlng	= new google.maps.LatLng(alat,alng);
		}
		catch(e){
			//読み込みできないので終了
			alert("インターネットに接続されていないため地図を表示することができません。");
			//alert(e);
			hideModal();
			history.back();
			return;
		}

		//マップ表示
		
		$.mobile.changePage('#map',{transition: "none"});
		//マップの初期化
		if(_mapInit){
			$('#map_canvas').gmap('clear', 'markers');
			$('#map_canvas').gmap('destroy');
		}
		_mapInit = true;
		//マップの表示
        $("#map_canvas").gmap({"center":myLatlng, "zoom":11, 'callback': function(){/*alert('Google map loaded!');*/}});

		//表示データの生成
		var data = new Array();//マーカー位置の緯度経度
		for(var j=0; j < list.length; j++){
			var lat = list[j].base.lat;
			var lng = list[j].base.lng;
			var thumb = "";
			//緯度経度なしまたはセンターポイントと同一の場合
			if(lat == 0 || lng == 0 || list[j].base.latlng == centerLatlng){
				continue;
			}
			if(list[j].base.thumbnail != "" && list[j].base.thumbnail != undefined){
				thumb = '<img src="images/archives/thumbnail/'+list[j].base.thumbnail+'" />';
			}
			
			if(list[j].base.mapLabel != undefined){
				//マップのラベル指定
				data.push({position: new google.maps.LatLng(lat,lng),label:list[j].base.mapLabel, content:'<div class="mapbox">'+thumb+'<h3>'+list[j].base.title+'</h3><a onClick="switchDetailPage('+list[j].base.id+')"  href="#"><strong>詳細をみる</strong></a>'});
			}
			else{
				data.push({position: new google.maps.LatLng(lat,lng), content:'<div class="mapbox">'+thumb+'<h3>'+list[j].base.title+'</h3><a onClick="switchDetailPage('+list[j].base.id+')"  href="#"><strong>詳細をみる</strong></a>'});
			}
		
		}



		for (var i=0; i < data.length; i++) {
			if(data[i].label != undefined){
				var icon = 'http://www.google.com/mapfiles/marker' + data[i].label + '.png';
				$('#map_canvas').gmap('addMarker', { 'position':data[i].position,'icon':icon, 'bounds': true,'content':data[i].content }).click(function() {
						$('#map_canvas').gmap('openInfoWindow', { 'content':this.content}, this);
				});
			}
			else{
				$('#map_canvas').gmap('addMarker', { 'position':data[i].position, 'bounds': true,'content':data[i].content }).click(function() {
						$('#map_canvas').gmap('openInfoWindow', { 'content':this.content}, this);
				});
			}

		}

		//引数があればセンターマーカーを表示
		if(centerLatlng != undefined){
			//現在地マーカーの表示
            var image = 'images/icon/icon_now.png';
			$('#map_canvas').gmap('addMarker', { 'position':myLatlng,'icon':image, "zIndex" : 999,'bounds': true}).click(function() {
			});
		}
		else{
			//現在地が重要でない地図は取得できた段階で中心地を表示
			showMapHereIcon();
		}
	}
	var _markers = [];
	var _info_window = [];
	function attachMessageEx(index, msg) {
		google.maps.event.addListener(_markers[index], 'click', function(event) {
			close_other_info_window(index);
			if (_info_window[index]){
				_info_window[index].close();
				_info_window[index] = null;
				return;
			}
			_info_window[index] = new google.maps.InfoWindow({
				content: msg,
				maxWidth: 200
			});
			_info_window[index].open(_markers[index].getMap(), _markers[index]);

		});
	}
	function close_other_info_window(index){
		var makers_count = _markers.length;
		for (var i=0;i<makers_count;i++){
			if ( i == index ) continue;
			if (_info_window[i]){
				_info_window[i].close();
				_info_window[i] = null;
			}
		}
	}

	
	//*********************************************************
	//お気に入りの表示
	//*********************************************************
	function showBookmark(){
		var bookmarkList = readBookmark();
		var src = "";
		if(bookmarkList != undefined){
			var bkmAry = bookmarkList.split(",");
			var list = [];
			for(var i=0; i < _spotData.length ; i++){
				if(bkmAry.indexOf(_spotData[i].base.id.toString(),0) >= 0){
					list.push(_spotData[i]);
				}
			}
	
			for(var i=0; i < list.length ; i++){
				thumbnail	= "";
				if(list[i].base.thumbnail != undefined && list[i].base.thumbnail != ""){
					thumbnail = '<img src="images/archives/thumbnail/'+list[i].base.thumbnail+'" />';
				}
				else{
					thumbnail = '<img src="images/th_noimg.png" />';
				}
				src	+= '<li><a href="#" onclick="switchDetailPage('+list[i].base.id+')" data-transition="none">'+thumbnail+'<h3>'+list[i].base.title+'</h3><p>'+list[i].base.body+'</p></a></li>';
				//リストに表示
			}
			src = '<li data-role="list-divider">登録済みのお気に入り一覧</li> '+src;
		}
		else{
			//登録がない場合
			src	= '<li>現在お気に入りの登録はありません。</li>';			
		}
		
		//*********************************************
		//ページ内容を反映
		//*********************************************
		//ページ遷移を開始
		$.mobile.changePage('#bookmark',{transition: "none"});

		$("#ul-bookmark-list li").remove();
		$("#ul-bookmark-list").append(src);
		$("#ul-bookmark-list").listview();
		$("#ul-bookmark-list").listview("refresh");
		
	}


	//***************************************************
	/** 詳細ページへの遷移 **/
	//***************************************************
	function switchDetailPage(param) {

		detailData	= getDetail(param);

		//カスタムフィールド部分
		var customField		= detailData.custom_field;
		var customFieldSrc	= "";
		var images			= [];

		_selectedId			= detailData.base.id;
		_commentFlowMode 	= "spotDetail";

		for(var i=0; i < customField.length ; i++){
			var csrc = "";
			
			//画像の場合以外は表示
			if(customField[i].title != "画像"){
				csrc = '<li data-role="list-divider">'+customField[i].title+'</li>';
			}
			//住所が空のとき
			if(customField[i].title == "住所" && customField[i].item[0].action == "" && customField[i].item[0].body == ""){
				csrc = "";
			}

			for(var j=0; j < customField[i].item.length ; j++){
				if(customField[i].item[j].action == "" && customField[i].item[j].body == ""){
					continue;
				}
				switch(customField[i].item[j].type){
					case "url":
						if(customField[i].item[j].action != undefined && customField[i].item[j].action != ""){
							csrc += '<li><a  data-transition="none" href="#" onClick="open_url(\''+customField[i].item[j].action+'\')" ><h2>'+customField[i].item[j].body+'</h2></a></li>';
						}
						else{
							csrc += '<li>'+customField[i].item[j].body+'</li>';
						}
						break;
					case "map":
						if(customField[i].item[j].action != undefined && customField[i].item[j].action != ""){
							csrc += '<li><a  data-transition="none" href="#" onClick="open_url(\'http://maps.google.com/maps?q=loc:'+customField[i].item[j].action+'%28'+detailData.base.title+'%29\')" rel="external" ><h2>'+customField[i].item[j].body+'</h2></a></li>';
						}
						else{
							csrc += '<li>'+customField[i].item[j].body+'</li>';
						}
						break;
					case "id":
						if(customField[i].item[j].action != undefined && customField[i].item[j].action != ""){
							csrc += '<li><a  data-transition="none" href="#" onclick="switchDetailPage('+customField[i].item[j].action+')"><h2>'+customField[i].item[j].body+'</h2></a></li>';
						}
						else{
							csrc += '<li>'+customField[i].item[j].body+'</li>';
						}
						break;
					case "image":
						var obj = {};
						obj.action	= customField[i].item[j].action;
						obj.body	= customField[i].item[j].body;
						images.push(obj);
						break;
					case "tel":
						if(customField[i].item[j].action != undefined && customField[i].item[j].action != ""){
							csrc += '<li><a  data-transition="none" href="tel:'+customField[i].item[j].action+'" ><h2>'+customField[i].item[j].body+'</h2></a></li>';
						}
						else{
							csrc += '<li>'+customField[i].item[j].body+'</li>';
						}
						break;
					case "mail":
						if(customField[i].item[j].action != undefined && customField[i].item[j].action != ""){
							csrc += '<li><a  data-transition="none" href="mail:'+customField[i].item[j].action+'" ><h2>'+customField[i].item[j].body+'</h2></a></li>';
						}
						else{
							csrc += '<li>'+customField[i].item[j].body+'</li>';
						}
						break;
					default:
						csrc += '<li>'+customField[i].item[j].body+'</li>';
						break;
				}
			}
			customFieldSrc	+= csrc;
		}
		
		//*********************************************
		//ページ内容を反映
		//*********************************************
		$('#detailTitle').text(detailData.base.title);
		$('#detailTitleCont').text(detailData.base.title);
		$('#detailBody').html(detailData.base.body.replace(/\n/g,'<br/><br/>'));
		
		//キャッシュに保存
		_selectedDetailCache	= detailData;
		
		//twitterつぶやき
		//$('#btnDetailTwitter').attr("onClick","open_url('http://twitter.com/?status="+detailData.base.title+"%20%23soraichi')");

		//スタンプボタンの制御
		//showBtnStamp(detailData.base.id);
		
		//お気に入りボタンの状態設定
		showBtnBookmark(detailData.base.id);
		
		//周辺スポットボタンの設定
		$("#btnNearSpot").attr("onClick","showNearSpotResultView("+detailData.base.lat+","+detailData.base.lng+")");
		
		//住所がないもの
		//地図設定
		if(detailData.base.latlng != undefined && detailData.base.latlng != ""){
			$("#detailMap").attr('onClick','open_url("http://maps.google.com/maps?q=loc:'+detailData.base.latlng+'%28'+detailData.base.title+'%29")');
			$("#detailMap").css("display","inherit");
			$("#btnRoute").css("display","inherit");
			$("#btnNearSpot").css("display","inherit");
		}
		else{
			$("#detailMap").css("display","none");
			$("#btnRoute").css("display","none");
			$("#btnNearSpot").css("display","none");
		}
		
		//画像を表示
		if(images.length > 0){
			_detailImagesCache = images;
			//$('#detailImg').attr("src","images/archives/"+images[0].action);
			$('#slider').css({"display":"inherit"});
//			$('#detailImg').bind("tap",function(){


			var imgs = "";
			for(var i=0; i < _detailImagesCache.length; i++){
				if(i==0){
					imgs += '<li style="display:block"><img width="100%" src="images/archives/'+_detailImagesCache[i].action+'" /></li>';
				}
				else{
					imgs += '<li style="display:none"><img width="100%" src="images/archives/'+_detailImagesCache[i].action+'" /></li>';
				}
				//imgs += '<li><img src="images/archives/'+_detailImagesCache[i].action+'" /></li>';
			}
			
			//２枚以上のとき最初に右アイコンを表示
			if(images.length > 1){
				$("#mrkLeft").css({"display":"none"});
				$("#mrkRight").css({"display":"inherit"});
			}
			else{
				$("#mrkLeft").css({"display":"none"});
				$("#mrkRight").css({"display":"none"});
			}
			

		}
		else{
			$('#slider').css({"display":"none"});
		}
		
		//$("#").attr("onclick","showComment()");
		$("#btnDetailShowComment").attr("onClick","showComment("+_selectedId+")");
		
		//ページ遷移を開始
		$.mobile.changePage('#detail',{transition: "none"});
		$.mobile.silentScroll(0);

		$("#detailImgUl").html(imgs);
		
		//リストを表示
		$("#ul-detail-list li").remove();
		$("#ul-detail-list").append(customFieldSrc);
		$("#ul-detail-list").listview();
		$("#ul-detail-list").listview("refresh");
		
	}
	
	/** 検索画面 **/
	function searchKwd(){

		var kwd 	= $("#searchInputKwd").val();
		var result	= [];

		//データを検索
		for(var i=0; i < _spotData.length ; i++){
			if(_spotData[i].base.title.indexOf(kwd.toString(),0) >= 0 || _spotData[i].base.body.indexOf(kwd.toString(),0) >= 0 ){
				result.push(_spotData[i]);
			}
		}
		
		var src = "";
		for(var i=0; i < result.length ; i++){
			thumbnail	= "";
			if(result[i].base.thumbnail != undefined && result[i].base.thumbnail != ""){
				thumbnail = '<img src="images/archives/thumbnail/'+result[i].base.thumbnail+'" />';
			}
			else{
				thumbnail = '<img src="images/th_noimg.png" />';
			}
			src	+= '<li><a href="#" onclick="switchDetailPage('+result[i].base.id+')" data-transition="none">'+thumbnail+'<h3>'+result[i].base.title+'</h3><p>'+result[i].base.body.slice(0,130)+'</p></a></li>';
		}
		
		//*********************************************
		//ページ内容を反映
		//*********************************************
		//ページ遷移を開始
		$.mobile.changePage("#searchResult", {transition: "none"});
		showModal();

		if(kwd == undefined || kwd == ""){
			$('#searchResultTitle').text("キーワードを入力してください。");
			hideModal();
			return;
		}
		else if(src == ""){
			$('#searchResultTitle').text("キーワード「"+kwd+"」を検索した結果、該当する結果がありませんでした。");
			hideModal();
			return;
		}
		else{
			$('#searchResultTitle').text("キーワード「"+kwd+"」の検索結果");
		}
		$("#ul-search-result li").remove();
		$("#ul-search-result").append(src);
		$("#ul-search-result").listview();
		$("#ul-search-result").listview("refresh");


		hideModal();
	}


	//************************************************
	//* お気に入りの登録
	//************************************************
	function saveBookmark(id){
		var list 	= readBookmark();
		if(list == undefined){
			list = "";
		}

		var bmkAry	= list.split(",");
		if(bmkAry.indexOf(id.toString(),0) == -1){
			bmkAry.push(id);
			var bmkData	= bmkAry.join(",");
			window.localStorage.setItem('soraichi.bmk', bmkData);
			//window.localStorage.setItem('count', count);
			alert("お気に入りに登録しました。");
			//アイコンを登録済みに変更
			showBtnBookmark(id);
		}
	}

	function deleteBookmark(id){
		var list 	= readBookmark();
		var bmkAry	= list.split(",");
		var idx		= bmkAry.indexOf(id.toString(),0);

		bmkAry.splice(idx,1);	//削除
		var bmkData	= bmkAry.join(",");
		window.localStorage.setItem('soraichi.bmk', bmkData);
		//window.localStorage.setItem('count', count);
		alert("お気に入りを解除しました。");

		//アイコンを登録済みに変更
		showBtnBookmark(id);
	}


	//ブックマークの読み込み
	function readBookmark(){
		var msg = window.localStorage.getItem("soraichi.bmk");
		return msg;
	}

	//ブックマークの登録があるか
	function enableBookmark(id){
		var list 	= readBookmark();
		if(list == undefined){
			return false;
		}
		var bmkAry	= list.split(",");
		if(bmkAry.indexOf(id.toString(),0) >= 0){
			return true;
		}
		else{
			return false;
		}
	}
	
	/** お気に入りボタンの制御 **/
	function showBtnBookmark(id){
		//お気に入りの状態反映
		if(enableBookmark(id)){
			//登録済みならボタンデザイン変更
			$('#btnSaveBookmarkImg').attr("src","images/btn_favorite/btn_bookmark_on.png");
			//登録解除ボタンイベント設定
			$('#btnSaveBookmark').attr("onClick","deleteBookmark("+id+")");
		}
		else{
			//ボタンデザイン変更
			$('#btnSaveBookmarkImg').attr("src","images/btn_favorite/btn_bookmark.png");
			//登録ボタンイベント設定
			$('#btnSaveBookmark').attr("onClick","saveBookmark("+id+")");
		}
	}


	//******************************************
	//スポットまでのルート表示
	//******************************************
	var _showRouteFlg = false;
	function showRoute(){
		// 現在地を取得する。
		if (navigator.geolocation) {
			alert("位置情報(GPS)機能を利用して現在地を判定いたします。取得まで少し時間が掛かりますのでしばらくお待ちください。");
			// Geolocationに関する処理を記述
			_showRouteFlg = false;
			// 現在の位置情報を取得
			showModal();
			getMyPos(showRouteResult,errorPos);	//success function  and  error function
		}
		else{
			alert("本端末ではGeolocationが使えません。");
		}			
	}
	//現在地を取得してgoogle mapのURLを開いてやる
	function showRouteResult(pos){
		var timerId = setTimeout(function() {
			clearTimeout(timerId);
			//alert("timeout!");
			navigator.geolocation.clearWatch(_watchId);

			var lat	=savedPos.coords.latitude;
			var lng	=savedPos.coords.longitude;

			if(!_showRouteFlg){
				alert("位置情報の精度が低いため正確な場所を特定できませんでした。ご利用の機種や天候・屋内などの環境によってはGPSの精度が出ない場合がありますので再度お試しください。");
				hideModal();
				return;


				alert("スポットまでの距離:"+distance+"m");
				var obj	= getDetail(_selectedId);
				//★★★★google開くように書き換える			showNearSpotResultView(lat,lng);
				var ahref = "http://maps.google.com/maps?saddr="+lat+","+lng+"&daddr="+obj.base.lat+","+obj.base.lng+"("+obj.base.title+")&dirflg=";
				var src	=  "<p>目的地までのアクセス方法を選択してください。</p><ul><li><a href='"+ahref+"d' rel='external'>車で行く</a></li>";
				src 	+= "<li><a href='"+ahref+"w' rel='external'>徒歩で行く</a></li>";
				src 	+= "<li><a href='"+ahref+"t' rel='external'>電車で行く</a></li></ul>";
				
				$.mobile.changePage("#popupDialog",{transition:'none',role:'dialog'});
				$("#popupTitle").text("経路の表示");
				$("#popupContents").html(src);
				_showRouteFlg = true;
			}
		},_gpsTimeOut);//end setTimeout

		//任意の精度以下になったら取得をやめる
		savedAccuracy = pos.coords.accuracy;
		savedPos = pos;
		if(pos.coords.accuracy < _accuracyVal ){
			//alert("GPS精度:"+pos.coords.accuracy);
			navigator.geolocation.clearWatch(_watchId);
			//$("#startPl").val(pos.coords.latitude + "," + pos.coords.longitude);
			//
			var lat	= pos.coords.latitude;
			var lng	= pos.coords.longitude;
			var obj	= getDetail(_selectedId);
	
			//alert("スポットまでの距離:"+distance+"m");
			//★★★★google開くように書き換える			showNearSpotResultView(lat,lng);
			if(!_showRouteFlg){
				var ahref = "http://maps.google.com/maps?saddr="+lat+","+lng+"&daddr="+obj.base.lat+","+obj.base.lng+"("+obj.base.title+")&dirflg=";
				hideModal();
				$.mobile.changePage("#popupDialog",{transition:'none',role:'dialog'});
				$("#popupTitle").text("経路の表示");
				var src	=  "<p>目的地までのアクセス方法を選択してください。</p><ul><li><a href='#' onClick='open_url(\""+ahref+"d\")'>車で行く</a></li>";
				src 	+= "<li><a href='#' onClick='open_url(\""+ahref+"w\")'>徒歩で行く</a></li>";
				src 	+= "<li><a href='#' onClick='open_url(\""+ahref+"t\")'>電車で行く</a></li></ul>";
				$("#popupContents").html(src);
				_showRouteFlg = true;
			}
		}
	}

	//******************************************
	//近隣スポットの検索
	//******************************************
	var _showNearSpotFlg = false;
	function showNearSpot(){
		// 現在地を取得する。
		if (navigator.geolocation) {
			alert("位置情報(GPS)機能を利用して現在地を判定いたします。取得まで少し時間が掛かりますのでしばらくお待ちください。");
			// Geolocationに関する処理を記述
			$.mobile.loadingMessageTextVisible = true;
			showModal();

			// 現在の位置情報を取得
			_showNearSpotFlg = false;
			getMyPos(showNearSpotResult,errorPos);	//success function  and  error function
		}
		else{
			alert("本端末ではGeolocationが使えません。");
		}			
	}


	function showNearSpotResult(pos){
		var timerId = setTimeout(function() {
			clearTimeout(timerId);
			//alert("timeout!");
			navigator.geolocation.clearWatch(_watchId);


			//
			var lat	=savedPos.coords.latitude;
			var lng	=savedPos.coords.longitude;

			if(!_showNearSpotFlg){
				alert("位置情報の精度が低いため正確な場所を特定できませんでした。ご利用の機種や天候・屋内などの環境によってはGPSの精度が出ない場合がありますので再度お試しください。");
				hideModal();
				return;


				//alert("スポットまでの距離:"+distance+"m");
				showNearSpotResultView(lat,lng);
				_showNearSpotFlg = true;
			}

		},_gpsTimeOut);//end setTimeout

		//任意の精度以下になったら取得をやめる(誤差1000m = _accuracyVal)
		savedAccuracy = pos.coords.accuracy;
		savedPos = pos;
		if(pos.coords.accuracy < _accuracyVal ){
			//alert("GPS精度:"+pos.coords.accuracy);
			navigator.geolocation.clearWatch(_watchId);
			//$("#startPl").val(pos.coords.latitude + "," + pos.coords.longitude);
			//
			var lat	= pos.coords.latitude;
			var lng	= pos.coords.longitude;
	
			//alert("スポットまでの距離:"+distance+"m");
			if(!_showNearSpotFlg){
				showNearSpotResultView(lat,lng);
				_showNearSpotFlg = true;
			}
			hideModal();
		}
	}

	function removeMarkers() {
		//ボタンが押されたら、マーカーの配列に対して
		//setMap(null)を実行し、地図から削除
		_markers.forEach(function(marker, idx) {
			marker.setMap(null);
		});
	}


	/** 周辺地図の表示 **/
	function showNearSpotResultView(myLat,myLng){
		var list = _spotData;

		//googlemapが使えるかテスト - start
		var checkLat = "";
		try{
			checkLat = new google.maps.LatLng(myLat,myLng);
		}
		catch(e){
			//読み込みできないので終了
			alert("インターネットに接続されていないため地図を表示することができません。");
			//alert(e);
			hideModal();
			return;
		}
		//googlemapが使えるかテスト - end



		//表示データの生成
		var data = new Array();//マーカー位置の緯度経度
		for(var j=0; j < list.length; j++){
			var lat = list[j].base.lat;
			var lng = list[j].base.lng;
			var thumb = "";
			if(lat == 0 || lng == 0 || (lat == myLat && lng == myLng)){
				continue;
			}

			//距離計算
			var distance = geoDistance(lat,lng,myLat,myLng,5);
			

			//[dis]m以内
			if(distance < _nearDistance){
				if(list[j].base.thumbnail != "" && list[j].base.thumbnail != undefined){
					thumb = '<img src="images/archives/thumbnail/'+list[j].base.thumbnail+'" />';
				}
				data.push({position: new google.maps.LatLng(lat,lng), content:'<div class="mapbox">'+thumb+'<h3>'+list[j].base.title+'</h3><a onClick="switchDetailPage('+list[j].base.id+')"  href="#"><strong>詳細をみる</strong></a>'});
			}
		}

		if(data.length == 0){
			alert("近隣にそらいちスポットはありません。");
		}
		else{
			//マップ表示
			$.mobile.changePage('#map',{transition: "none"});
			//マップの初期化
			if(_mapInit){
				$('#map_canvas').gmap('clear', 'markers');
				$('#map_canvas').gmap('destroy');
			}
			_mapInit = true;
			//マップの表示
			var myLatlng = new google.maps.LatLng(myLat,myLng);
	        $("#map_canvas").gmap({"center":myLatlng, "zoom":11});

			for (var i=0; i < data.length; i++) {
				if(data[i].label != undefined){
					var icon = 'http://www.google.com/mapfiles/marker' + data[i].label + '.png';
					$('#map_canvas').gmap('addMarker', { 'position':data[i].position,'icon':icon, 'bounds': true,'content':data[i].content }).click(function() {
							$('#map_canvas').gmap('openInfoWindow', { 'content':this.content}, this);
					});
				}
				else{
					$('#map_canvas').gmap('addMarker', { 'position':data[i].position, 'bounds': true,'content':data[i].content }).click(function() {
							$('#map_canvas').gmap('openInfoWindow', { 'content':this.content}, this);
					});
				}
	
			}
		}

		//センターマーカーを表示
		//現在地マーカーの表示
		var image = 'images/icon/icon_now.png';
		if(!_showNearSpotFlg){
			image = 'images/icon/icon_now.png';
		}
		else{
			image = 'images/icon/icon_now.png';
		}

		$('#map_canvas').gmap('addMarker', { 'position':myLatlng,'icon':image,"zIndex" : 999, 'bounds': true}).click(function() {
		});

		hideModal();
	}


	//************************************************
	//* 初回起動時の登録
	//************************************************
	
	//ユーザー登録されているか
	function enableUserRegistar(){
		var appkey 	= readUserRegistar();
		if(appkey == undefined){
			return false;
		}
		return true;
	}

	//ユーザー登録
	function saveUserRegistar(){
		$.mobile.loadingMessage = "登録中・・・";
		$.mobile.loadingMessageTextVisible = true;

		showModal();
		//バリデーション
		var age		= $("#registarAge").val();
		var address	= "";
		var sex		= $("input[name=registarSex1]:checked").val();
		var mail	= $("#registarMail").val();
		
		var box1 = document.getElementById("selectBox1");
		var sel1 = box1.style.display;
		var box2 = document.getElementById("selectBox2");
		var sel2 = box2.style.display;
		
		//住所が選択されていない場合
		if(sel1 == "none" && sel2 == "none"){
			
			/*
			alert("住所を選択してください。");
			hideModal();
			return;
			*/
			address = "-1";
		}
		else if($("#registarAddress").val() == 1){
			address = "北海道内";
		}
		else if($("#registarAddress").val() == 2){
			address = "北海道外";
		}
/*		if($("#registarAddress1").val() == "0" && $("#registarAddress2").val() == "0"){
			alert("地域を選択してください。");
			hideModal();
			return;
		}
*/
		if($("#registarAddress").val() == 2 && $("#registarAddress2").val() != 0){
			address = $("#registarAddress2").val();
		}
		else if($("#registarAddress").val() == 1 && $("#registarAddress1").val() != 0){
			address = $("#registarAddress1").val();
		}
		
		/*
		if(age == "0" || age == 0 || age == undefined || sex == undefined || address == undefined || address == "0" || address == "" || address == 0){
			alert("必須情報を入力してください。");
			hideModal();
			return;
		}
		*/

		var appkey 	= readUserRegistar();
		if(appkey == undefined){
			//サーバーにデータを投げてappkeyを取得
			//POSTメソッドで送るデータを定義します var data = {パラメータ名 : 値};
            var data = {"sex":sex,"address":address,"age":age,"mail":mail};

			$.ajax({ 
			  url: "http://apisoraichi.artful.jp/activation/index.json", 
			  dataType:'json', 
			  data: data,
			  type:"POST",
			  success: callbackGetActivation, 
			  timeout: 10000, //3 second timeout, 
			  error: function(jqXHR, status, errorThrown){   //the status returned will be "timeout" 
				alert('ご利用の端末がインターネットに繋がっていないため登録できません。次回起動時に再度登録画面が開かれます。');
				//登録失敗後、homeを表示
				doneRegistar();
			  } 
			});
		}
	}
	
	function callbackGetActivation(data){
		hideModal();
		$.mobile.loadingMessage = "読み込み中・・・";
		$.mobile.loadingMessageTextVisible = true;
		if(data != "false"){
			appkey = data;
			window.localStorage.setItem('soraichi.user', appkey);
			//window.localStorage.setItem('count', count);
			alert("登録が完了しました。そらいちの旅をお楽しみください！");
		
			//登録完了後、homeを表示
			doneRegistar();
		}
		else{
			alert('登録に失敗しました。ご利用の端末がインターネットに繋がっているかご確認ください。次回起動時に再度登録画面が開かれます。\n\nERROR_CODE:' + errorThrown);
			//登録失敗後、homeを表示
			doneRegistar();
		}

	}
	
	function doneRegistar(){
		_initFlg = true;
		hideModal();
		$.mobile.changePage('#home',{transition: "none"});
	}

	//ユーザー登録情報の読み込み
	function readUserRegistar(){
		var msg = window.localStorage.getItem("soraichi.user");
		return msg;
	}


	//******************************************
	//スタンプ帳登録	
	//******************************************
	function checkin(id){
		// 現在地を取得する。
		if (navigator.geolocation) {
			alert("位置情報(GPS)機能を利用して現在地を判定いたします。取得まで少し時間が掛かりますのでしばらくお待ちください。");
			// Geolocationに関する処理を記述
			// 現在の位置情報を取得
			retryCount = 0;
			startTime = new Date();

			//ローディング表示
			$.mobile.loadingMessage = "位置情報を取得中です。しばらくお待ちください・・・";
			$.mobile.loadingMessageTextVisible = true;
			showModal();

			getMyPos(resultStampPos,errorPos);	//success function  and  error function
			//test
			//getMyCurrentPos();
		}
		else{
			alert("本端末ではGeolocationが使えません。");
		}
	}

	//* スタンプ帳保存
	function saveStamp(id,latlng){
		var list	= readStamp();
		if(list == undefined){
			list	= "";
		}
		var bmkAry	= list.split(",");

		//サーバーにスタンプ登録を送信
		_stampedId = id;
		var params = {"latlng":latlng,"user_id":readUserRegistar(),"spot_id":_selectedId};
		$.post("http://apisoraichi.artful.jp/stamp/index.json", params, callbackCheckinStamp, "json")
		.success(function() {
				alert("☆スタンプGET！");
				
				//ローカルにスタンプ帳キャッシュ保存
				bmkAry.push(id+"@"+_dateStr);
				var bmkData	= bmkAry.join(",");
				window.localStorage.setItem('soraichi.stamp', bmkData);

				//登録済みボタンデザイン変更
				$('#rate').selectmenu('enable');
				$('#imgSaveStamp').attr("src","images/btn_favorite/btn_stamp_on.png");
				$('#btnSaveStamp').attr("onClick","");

			})
		.error(function() {
			hideModal();
			alert("スタンプ帳のご利用は端末がインターネットに繋がっている必要があります。お手数ですが再度お試しください。");
		})
		.complete(function() {
			hideModal();
		});
	}
	
	var _stampedId = 0;
	
	/** スタンプ帳がサーバーに無事送信 **/
	function callbackCheckinStamp(data){
	}

	// スタンプ帳の読み込み
	function readStamp(){
		var msg = window.localStorage.getItem("soraichi.stamp");
		return msg;
	}

	// スタンプ帳の登録があるか
	function enableStamp(id,date){
		var list 	= readStamp();
		if(list == undefined){
			return false;
		}

		if(date == undefined){
			date	= "";
		}

		var bmkAry	= list.split(",");
		
		if(bmkAry.indexOf(id.toString()+"@"+date,0) >= 0){
			return true;
		}
		else{
			return false;
		}
	}


	/** スタンプ帳ボタンの制御 **/
	function showBtnStamp(id){

		//反映
		if(enableStamp(id,_dateStr)){
			$('#rate').selectmenu('enable');
			//登録済みならボタンデザイン変更
			$('#imgSaveStamp').attr("src","images/btn_favorite/btn_stamp_on.png");
			//登録解除ボタンイベント設定
			$('#btnSaveStamp').attr("onClick","");
		}
		else{
			$('#rate').selectmenu('disable');
			//ボタンデザイン変更
			$('#imgSaveStamp').attr("src","images/btn_favorite/btn_stamp.png");
			//登録ボタンイベント設定
			$('#btnSaveStamp').attr("onClick","checkin("+id+")");
		}
	}

	function onGetCurrentLocationError(){
		alert("現在地が取得できません。位置情報(GPS)機能がオンになっているか確認してください(解除方法はヘルプにて)。屋内などではオンになっていてもデータを取得できない場合がございます。");
	}


	//*********************************************************
	//スタンプ帳の表示
	//*********************************************************
	function showStamp(){
		//表示
		$.mobile.changePage('#stamp',{transition: "none"});

		var params = {"user_id":readUserRegistar()};
		
		if(readUserRegistar() == undefined){
			alert("スタンプ帳機能のご利用には初回登録が必要になります。ご利用の機種がインターネットを使える環境にてアプリを再起動して初回登録をお済ませください。");
		}
		else{
			showModal();
			$.post("http://apisoraichi.artful.jp/stamp/list.json", params, callbackGetStamp, "json")
			.success(function() {})
		    .error(function() { hideModal(); alert("スタンプ帳のご利用は端末がインターネットに繋がっている必要があります。"); })
		    .complete(function() {hideModal();});

			$.mobile.loadingMessageTextVisible = true;
		}
	}
	function callbackGetStamp(data){
		hideModal();

		var list 	= data.stamp;
		var src = "";
		
		if(data.cnt == 0){
			src	= '<li>現在スタンプ済みのスポットはありません。</li>';			
		}
		else{
			for(var i=0; i < list.length ; i++){
				var detail	= getDetail(list[i].spot_id);
				thumbnail	= "";
				//スポットが削除されたりIDの変更等があった場合
				if(detail.base == undefined){
					continue;
				}

				if(detail.base.thumbnail != undefined && detail.base.thumbnail != ""){
					thumbnail = '<img src="images/archives/thumbnail/'+detail.base.thumbnail+'" />';
				}
				else{
					thumbnail = '<img src="images/th_noimg.png" />';
				}

				//スタンプアイコン
				var icnStamp = '<img src="images/icon/icon_stamp.png" />';

				//評価アイコン
				var icnStar = "0";
				if(list[i].permission != undefined && list[i].permission == 1){
					icnStar = '<img src="images/icon/star'+list[i].rate+'.png" />';
				}
				else{
					icnStar = '<img src="images/icon/star0.png" />';
				}
				//公開範囲
				var icnPerm = false;
				if(list[i].permission != undefined && list[i].permission == 1){
					icnPerm = '<img src="images/icon/icon_share.png" />';
				}
				else{
					icnPerm = '<img src="images/icon/icon_share_off.png" />';
				}
				//コメント
				var icnCom = false;
				if(list[i].comment != undefined && list[i].comment.length > 0){
					icnCom = '<img src="images/icon/icon_comment.png" />';
				}
				else{
					icnCom = '<img src="images/icon/icon_comment_off.png" />';
				}


				src	+= '<li><a href="#" onclick="switchDetailPage('+list[i].spot_id+')" data-transition="none">'+thumbnail+'<h3>'+detail.base.title+'</h3><p>'+icnStamp+icnStar+icnPerm+icnCom+"<br/>スタンプ日時:"+list[i].created_at+'</p></a></li>';
				//リストに表示
			}
			src = '<li data-role="list-divider">登録済みのスタンプ一覧</li> '+src;
		}

		
		//*********************************************
		//ページ内容を反映
		//*********************************************
		//ページ遷移を開始
		//$.mobile.changePage('#stamp',{transition: "none"});

		$("#ul-stamp-list li").remove();
		$("#ul-stamp-list").append(src);
		$("#ul-stamp-list").listview();
		$("#ul-stamp-list").listview("refresh");
		
	}


// JavaScript Document

	var _commentFlowMode 	= "list";	//list or detail - 画面遷移元
	var _commentEditFlg		= false;	//コメント投稿画面で編集かどうか
	var _commentViewMode 	= "all";	//コメントの表示モード(全体かスポットのコメントか)
	var _selectedCommentSpotId = 0;
	var _commentData = [];
	var _anum	= 5;	//みんなのコメント初期limit
	var _snum	= 5;	//自分のコメント初期limit

	/** スタンプ・コメント投稿を開く **/
	function showEntryStampComment(comment_id){
		//とりあえずスタンプ帳の状態を無効に
		$('#btnSaveStamp').attr("onClick","");

		//その日に既にコメント済みか確認
		//ページ遷移を開始
		$.mobile.changePage('#entryStampComment',{transition: "none"});
		clearCommentEntry();
		
		//ローディング表示
		$.mobile.loadingMessageTextVisible = true;
		//showModal();
		showModal();
		
		var params = {"user_id":readUserRegistar(),"spot_id":_selectedId};
		//既にコメント済みの場合は編集にするため
		if(comment_id == undefined){
			//日付を渡してコメント済みかチェック
			params["date"] = _dateStr;
		//alert("uid"+params["user_id"]+"\nsid"+params["spot_id"]+"\ndate:"+_dateStr);
		}
		else{
			params["id"] = comment_id;
		//alert("uid"+params["user_id"]+"\nsid"+params["spot_id"]+"\ncomment_id:"+comment_id);
		}

//alert("id:"+params["id"]+"¥nspot_id:"+params["spot_id"]+"¥ndate:"+params["date"]+"¥ndate:"+params["user_id"]);

		$.ajax({ 
		  url: "http://apisoraichi.artful.jp/comment/getComment.json", 
		  dataType:'json', 
		  data: params, 
		  cache:false,
		  success: callbackGetDetailComment, 
		  timeout: 10000, //3 second timeout, 
		  error: function(jqXHR, status, errorThrown){   //the status returned will be "timeout" 
			hideModal();
			alert('ご利用の端末がインターネットに繋がっていないためこの機能はご利用できません。');
			history.back();
		  } 
		});


	}

	/** 投稿画面のコメントデータを取得したとき **/
	function callbackGetDetailComment(data){
		hideModal();
		/*
		hideModal();
		$.mobile.loadingMessageTextVisible = true;
*/
		//ページ遷移を開始
		$.mobile.changePage('#entryStampComment',{transition: "none"});
		$("btnEntryComment").css("display","inherit");
//alert("id:"+data.id+"¥nname:"+data.name+"¥ncomment:"+data.comment);
		if(data == "false" || data.commented == false){
			$("#btnEntryComment").attr("onClick","saveComment()");
			$("#btnEntryComment").html("投稿");
			$("#ti_comment").attr("value","");

			$('#rate').selectmenu();
			$("#rate").val(0);
			$('#rate').selectmenu('refresh',true);
			$("#permission1").attr("checked",true).checkboxradio("refresh");
			$("#permission2").attr("checked",false).checkboxradio("refresh");


			_commentEditFlg = false;
		}
		else{
			//編集
			_commentEditFlg = true;
			$("#ti_nickname").attr("value",data.name);
			$("#ti_comment").attr("value",data.comment);

			
			//select menu
			var seld = parseInt(data.rate);
			$('#rate').selectmenu();
//			$("#rate").selectedIndex = seld;
			$("#rate").val(seld);
			$('#rate').selectmenu('refresh',true);
			$("#btnEntryComment").html("更新");
			$("#btnEntryComment").attr("onClick","saveComment("+data.id+")");

			if(data.permission == 0){
				$("#permission1").attr("checked",true).checkboxradio("refresh");
				$("#permission2").attr("checked",false).checkboxradio("refresh");
			}
			else{
				$("#permission1").attr("checked",false).checkboxradio("refresh");
				$("#permission2").attr("checked",true).checkboxradio("refresh");
			}

			
			//showBtnStamp(data.spot_id);
		}
		
		var dd = getDetail(_selectedId);
		//緯度経度・住所あるか
		if(dd.base.latlng == undefined || dd.base.latlng == ""){
			$('#imgSaveStamp').css("display","none");
			$('#rateBox').css("display","none");
		}
		else{
			$('#imgSaveStamp').css("display","inherit");
			$('#rateBox').css("display","inherit");
		}
		
		//編集の場合で過去の日付のもののときはスタンプしてないものはスタンプ帳ボタンを非表示に
		if(data.created_at != undefined){
			var created_at = data.created_at.split(" ");
			if(created_at[0] != _dateStr && data.stamped == false){
				$('#imgSaveStamp').css("display","none");
				$('#rateBox').css("display","none");
			}
		}

		//スタンプ済みか確認
		if(enableStamp(_selectedId,_dateStr)){
			$('#rate').selectmenu('enable');
			//登録済みならボタンデザイン変更
			$('#imgSaveStamp').attr("src","images/btn_favorite/btn_stamp_on.png");
			//登録解除ボタンイベント設定
			$('#btnSaveStamp').attr("onClick","");
		}
		else{
			$('#rate').selectmenu('disable');
			//ボタンデザイン変更
			$('#imgSaveStamp').attr("src","images/btn_favorite/btn_stamp.png");
			//登録ボタンイベント設定
			$('#btnSaveStamp').attr("onClick","checkin("+_selectedId+")");
		}
	}

	function btnCommentTwitter(){
		var dt 		= getDetail(_selectedId);
		var comment	= $("#ti_comment").val();
		open_url("http://twitter.com/?status="+encodeURIComponent(comment)+"-"+encodeURIComponent(dt.base.title)+"%20%23soraichi");
	}
	function btnCommentFacebook(){
		var dt 		= getDetail(_selectedId);
		var comment	= $("#ti_comment").val();
		open_url("http://www.facebook.com/dialog/feed?app_id=397259723688392&redirect_uri=http://soraichi.jp/facebook/post.json&link=http://soraichi.jp&caption="+encodeURIComponent(dt.base.title)+"&description="+encodeURIComponent(comment)+"&display=touch");
	}
	function btnCommentMixi(){
		var dt 		= getDetail(_selectedId);
		var comment	= $("#ti_comment").val();
		open_url("https://mixi.jp/simplepost/voice?status="+encodeURIComponent(comment)+"-"+encodeURIComponent(dt.base.title)+"%20%23soraichi");
	}
	

	/** コメント表示 **/
	function showComment(id,reloadFlg){
		//他のページのコメントが開かれたときに初期化
		if(_selectedCommentSpotId != id){
			_selectedCommentSpotId = id;
			_anum = 5;
			_snum = 5;
		}
		if(id == undefined){
			_selectedCommentSpotId	= undefined;
			_commentViewMode		= "all";
		}
		else{
			_commentViewMode		= "detail";
		}

		//表示(削除・投稿後の反映のみの場合はページ遷移させない)
		if(reloadFlg != true){
			$.mobile.changePage('#comment',{transition: "none"});
			clearCommentList();
		}

		var params = {"user_id":readUserRegistar(),"anum":_anum,"snum":_snum};

		//コメントデータ取得 idがないときは全て
		if(id != undefined){
			params["spot_id"]	= id.toString();
		}
		$.post("http://apisoraichi.artful.jp/comment/list.json", params, callbackGetComment, "json")
		.success(function()	{})
	    .error(function()		{
			//コメントが削除・ないときはひとつ前の画面に戻る
			history.back();
			alert("コメント一覧を取得することができませんでした。インターネット回線がご利用できる環境下でお試しください。");
			hideModal();
			})
	    .complete(function() 	{});

		$.mobile.loadingMessageTextVisible = true;
		showModal();

		//タイトル反映
		//$('#categoryMapTitle').text(_categoryData[cat].title);
	}

	/** コメントデータを取得したとき **/
	function callbackGetComment(data){
		hideModal();
		$.mobile.loadingMessageTextVisible = true;

		_commentData	= data;
		var allData		= data.all;
		var selfData	= data.self;
		var srcAll		= "";
		var srcSelf		= "";

		//ページ遷移を開始
		//$.mobile.changePage('#comment',{transition: "none"});

		//自分のコメント
		if(selfData != undefined){
			srcSelf = '<li data-role="list-divider">自分のコメント</li>';
			for(var i=0; i < selfData.length ; i++){
				var dd	= getDetail(selfData[i].spot_id);
				var tmp	= selfData[i].created_at.split(" ");
				var thumb = "";
				if(dd.base.thumbnail != "" && dd.base.thumbnail != undefined){
					thumb = '<img src="images/archives/thumbnail/'+dd.base.thumbnail+'" />';
				}
				else{
					thumb = '<img src="images/th_noimg.png" />';
				}
				
				//スタンプアイコン
				var icnStamp = "";
				if(selfData[i].stamped){
					icnStamp = '<img src="images/icon/icon_stamp.png" />';
				}
				else{
					icnStamp = '<img src="images/icon/icon_stamp_off.png" />';
				}

				//公開アイコン
				var icnPermission = "";
				if(selfData[i].permission){
					icnPermission = '<img src="images/icon/icon_share.png" />';
				}
				else{
					icnPermission = '<img src="images/icon/icon_share_off.png" />';
				}


				//評価アイコン
				var icnStar = '<img src="images/icon/star'+selfData[i].rate+'.png" />';
				var ttl		= "";
				if(_commentViewMode == "all"){
					ttl = "<br/>"+dd.base.title;
				}
				srcSelf	+= '<li class="li_nowrap"><a href="#" onclick="showDetailComment('+selfData[i].id+')" data-transition="none">'+thumb+'<h4 style="white-space:norwap">'+icnStamp+icnStar+icnPermission+"<br/>"+selfData[i].comment+'</h4><p>投稿日時:'+tmp[0]+ttl+'</p></a></li>';
			}
			if(selfData.length == 0){
				srcSelf += "<li>まだあなたのコメントがありません。</li>";
			}

			//もっとみる表示の有無
			if(selfData.length < _commentData.self_cnt){
				_snum+=10;
				srcSelf	+= '<li class="li_nowrap"><a href="#" onclick="showComment('+_selectedCommentSpotId+')" data-transition="none"><p>▼もっとみる</p></a></li>';
			}

			$("#ul-comment-self-list li").remove();
			$("#ul-comment-self-list").append(srcSelf);
			$("#ul-comment-self-list").listview();
			$("#ul-comment-self-list").listview("refresh");
		}

		//みんなのコメント
		if(allData != undefined){
			srcAll = '<li data-role="list-divider">みんなのコメント</li>';
			for(var i=0; i < allData.length ; i++){
				var dd	= getDetail(allData[i].spot_id);
				var tmp	= allData[i].created_at.split(" ");
				var thumb = "";
				if(dd.base == undefined){
					continue;
				}
				if(dd.base.thumbnail != "" && dd.base.thumbnail != undefined){
					thumb = '<img src="images/archives/thumbnail/'+dd.base.thumbnail+'" />';
				}
				else{
					thumb = '<img src="images/th_noimg.png" />';
				}

				//スタンプアイコン
				var icnStamp = "";
				if(allData[i].stamped){
					icnStamp = '<img src="images/icon/icon_stamp.png" />';
				}
				else{
					icnStamp = '<img src="images/icon/icon_stamp_off.png" />';
				}
				//評価アイコン
				var icnStar = '<img src="images/icon/star'+allData[i].rate+'.png" />';
				var ttl		= "";
				if(_commentViewMode == "all"){
					ttl = "<br/>"+dd.base.title;
				}

				srcAll	+= '<li class="li_nowrap"><a href="#" onclick="showDetailComment('+allData[i].id+')" data-transition="none">'+thumb+'<h4 style="white-space:norwap">'+icnStamp+icnStar+"<br/>"+allData[i].comment+'</h4><p>投稿日時:'+tmp[0]+ttl+'</p></a></li>';
			}
			if(allData.length == 0){
				srcAll += "<li>まだみんなのコメントがありません。</li>";
			}
			
			//もっとみる表示の有無
			if(allData.length < _commentData.all_cnt){
				_anum+=10;
				srcAll	+= '<li class="li_nowrap"><a href="#" onclick="showComment('+_selectedCommentSpotId+',true)" data-transition="none"><p>▼もっとみる</p></a></li>';
			}
			
			
			$("#ul-comment-all-list li").remove();
			$("#ul-comment-all-list").append(srcAll);
			$("#ul-comment-all-list").listview();
			$("#ul-comment-all-list").listview("refresh");
		}
	}

	/** 個別コメント表示の場合 **/
	function showDetailComment(id,reloadFlg){
		clearCommentDetail();
		//idがなければ取得、更新させない
		if(id == undefined){
			return;
		}
		
		
		$.mobile.loadingMessageTextVisible = true;
			
		if(reloadFlg == undefined){
			$.mobile.changePage('#commentDetail',{transition: "none"});
		}
		showModal();

		//コメントの取得
		var params = {"user_id":readUserRegistar(),"id":id.toString(),"anum":_anum.toString(),"snum":_snum.toString()};
		$.post("http://apisoraichi.artful.jp/comment/list.json", params,function(data){
			hideModal();
			
			var obj = {};
			$("#btnCommentDetailEdit").css("display"	,"none");
			$("#btnCommentDetailDelete").css("display"	,"none");
			//みんなのコメントの場合
			if(data.all != undefined){
				for(var i=0; i < data.all.length ; i++){
					if(data.all[i].id == id){
						obj = data.all[i];
					}
				}
			}
			//自分コメントの場合
			if(data.self != undefined){
				for(var i=0; i < data.self.length ; i++){
					if(data.self[i].id == id){
						obj = data.self[i];
						//編集・削除ボタンを表示するかどうか				
						if(data.self[i].user_id == readUserRegistar()){
							_selectedId = data.self[i].spot_id;
							_commentFlowMode = "commentDetail";
							$("#btnCommentDetailEdit").css("display","inherit");
							$("#btnCommentDetailEdit").attr("onClick","showEntryStampComment("+id+")");
							$("#btnCommentDetailDelete").css("display","inherit");
							$("#btnCommentDetailDelete").attr("onClick","deleteComment("+id+")");
							
						}
					}
				}
			}


			//コメントデータがなければ初期化
			if(obj.spot_id == undefined){
				clearCommentDetail();
				return;
			}

	
			//スタンプアイコン
			var icnStamp 	= "";
			var icnShare 	= "";
			var icnComment 	= "";
			if(obj.stamped){
				icnStamp = 'images/icon/icon_stamp.png';
			}
			else{
				icnStamp = 'images/icon/icon_stamp_off.png';
			}
			//評価アイコン
			var icnStar = 'images/icon/star'+obj.rate+'.png';
	
			//公開アイコン
			if(obj.permission == 1){
				icnShare = 'images/icon/icon_share.png';
			}
			else{
				icnShare = 'images/icon/icon_share_off.png';
			}
			//コメントアイコン
			if(obj.comment.length > 0){
				icnComment = 'images/icon/icon_comment.png';
			}
			else{
				icnComment = 'images/icon/icon_comment_off.png';
			}
	
			var nname = "by 匿名";
			if(obj.name != ""){
				nname = "by "+obj.name;
			}
			
			var dt = getDetail(obj.spot_id);

			$("#btnCommentDetailShow").attr("onClick"	,"switchDetailPage("+obj.spot_id+")");

			$("#commentDetailTitle").text(dt.base.title);
			$("#commentDetailContent").text(obj.comment);
			$("#commentDetailNickname").text(nname);
			$("#commentDetailDate").text(obj.created_at);

			$("#commentDetailRate").attr("src",icnStar);
			$("#commentDetailStamped").attr("src",icnStamp);
			$("#commentDetailPermission").attr("src",icnShare);
			$("#commentDetailComment").attr("src",icnComment);
			
		}, "json")
		.success(function()	{})
	    .error(function()		{
				history.back();
				alert("コメント一覧を取得することができませんでした。インターネット回線がご利用できる環境下でお試しください。");
				hideModal();
			})
	    .complete(function() 	{});
	}

	//コメント詳細画面のクリア
	function clearCommentDetail(){
			//icon
			var icnStamp	= 'images/icon/icon_stamp_off.png';
			var icnStar 	= 'images/icon/star0.png';
			var icnShare 	= 'images/icon/icon_share_off.png';
			var icnComment 	= 'images/icon/icon_comment_off.png';


			$("#commentDetailTitle").text("");
			$("#commentDetailContent").text("");
			$("#commentDetailNickname").text("");
			$("#commentDetailDate").text("");
			$("#commentDetailRate").attr("src",icnStar);
			$("#commentDetailStamped").attr("src",icnStamp);
			$("#commentDetailPermission").attr("src",icnShare);
			$("#commentDetailComment").attr("src",icnComment);
			$("#btnCommentDetailEdit").css("display"	,"none");
			$("#btnCommentDetailDelete").css("display"	,"none");
	}

	//コメント投稿画面のクリア
	function clearCommentEntry(){
			$("#ti_comment").text("");
			$('#rate').selectmenu();
			$("#rate").val(0);
			$('#rate').selectmenu('refresh',true);
			$("#permission1").attr("checked",true).checkboxradio("refresh");
			$("#permission2").attr("checked",false).checkboxradio("refresh");
	}

	//コメント一覧画面のクリア
	function clearCommentList(){
			$("#ul-comment-all-list li").remove();
			$("#ul-comment-all-list").listview();
			$("#ul-comment-all-list").listview("refresh");
			$("#ul-comment-self-list li").remove();
			$("#ul-comment-self-list").listview();
			$("#ul-comment-self-list").listview("refresh");
	}


	/** コメントの投稿 **/
	function saveComment(id){
		//バリデーション
		var rate		= $("#rate").val();
		var nickname	= $("#ti_nickname").val();
		var comment		= $("#ti_comment").val();
		var permission	= $("input[name=permission1]:checked").val();
		var appkey 		= readUserRegistar();
		var spot_id		= _selectedId;

		//POSTメソッドで送るデータを定義します var data = {パラメータ名 : 値};
		var data = {"rate":rate,"name":nickname,"comment":comment,"permission":permission,"user_id":appkey,"spot_id":spot_id};

		//idが付与されている場合はコメント編集
		if(id != undefined){
			data["id"] = id.toString();
		}

 		
		if(appkey == undefined){
			alert("初回登録がまだの方はコメント・評価機能はご利用になれません。インターネットの繋がる環境で登録をお済ませください。");
			return;
		}

		if((comment == "" || comment == undefined) && (rate == undefined && rate == 0)){
			alert("コメントまたは評価のどちらかを入力してください。");
			return;
		}
		
		_postCommentId = id;

		$.post("http://apisoraichi.artful.jp/comment/entry.json", data, callbackEntryComment, "json")
		.success(function()	{})
	    .error(function()		{
				history.back();
				alert("コメントを投稿することができませんでした。インターネット回線がご利用できる環境下でお試しください。");
				hideModal();
			})
	    .complete(function() 	{history.back();});

		showModal();

	}
	
	function callbackEntryComment(data) { /** Ajax通信が成功した場合に呼び出される */
		hideModal();
		if(data != "false"){
			//window.localStorage.setItem('count', count);
			if(_commentEditFlg){
				alert("コメントを更新しました。");
				//状態反映
				showDetailComment(_postCommentId,true);
			}
			else{
				alert("コメントを投稿しました。");
			}
			//history.back();
			showComment(_selectedCommentSpotId,true);
			hideModal();
		}
		else{
			alert("コメントの投稿に失敗しました。");
		}
	}


	/** コメント削除 **/
	function deleteComment(id){
		if(!confirm("本当にこのコメントを削除しても良いですか？")){
			return;
		}

		var params = {"user_id":readUserRegistar(),"id":id.toString()};

		$.post("http://apisoraichi.artful.jp/comment/delete.json", params, callbackDeleteComment, "json")
		.success(function()	{})
	    .error(function()		{
				history.back();
				alert("コメントを削除することができませんでした。インターネット回線がご利用できる環境下でお試しください。");
				hideModal();
			})
	    .complete(function() 	{});
		
		
		$.mobile.loadingMessageTextVisible = true;
		showModal();
	}
	function callbackDeleteComment(data) { /** Ajax通信が成功した場合に呼び出される */
		hideModal();
		if(data != "false"){
			//window.localStorage.setItem('count', count);
			alert("コメントを削除しました。");
			switch(_commentFlowMode){
				case "commentDetail":
					//一覧から削除した場合、一つ前の画面に戻って、リストの一覧を更新させる
					history.back();
//					$.mobile.changePage('#comment',{transition: "none"});
					break;
				default:
					history.back();
					history.back();
			}
			//状態反映
			clearCommentDetail();
			showComment(_selectedCommentSpotId,true);
		}
		else{
			alert("コメントの削除に失敗しました。");
		}
	}


// -*- coding: utf-8 -*-

	function attachMessage(marker, msg) {
		google.maps.event.addListener(marker, 'click', function(event) {
			new google.maps.InfoWindow({
				content: msg
			}).open(marker.getMap(), marker);
		});
	}


	//
	// 測地線航海算法の公式
	//
	function geoDistance(lat1, lng1, lat2, lng2, precision) {
	  // 引数 precision は小数点以下の桁数(距離の精度)
	  var distance = 0;
	  if ((Math.abs(lat1 - lat2) < 0.00001) && (Math.abs(lng1 - lng2) < 0.00001)) {
		distance = 0;
	  } else {
		lat1 = lat1 * Math.PI / 180;
		lng1 = lng1 * Math.PI / 180;
		lat2 = lat2 * Math.PI / 180;
		lng2 = lng2 * Math.PI / 180;
	 
		var A = 6378140;
		var B = 6356755;
		var F = (A - B) / A;
	 
		var P1 = Math.atan((B / A) * Math.tan(lat1));
		var P2 = Math.atan((B / A) * Math.tan(lat2));
	 
		var X = Math.acos(Math.sin(P1) * Math.sin(P2) + Math.cos(P1) * Math.cos(P2) * Math.cos(lng1 - lng2));
		var L = (F / 8) * ((Math.sin(X) - X) * Math.pow((Math.sin(P1) + Math.sin(P2)), 2) / Math.pow(Math.cos(X / 2), 2) - (Math.sin(X) - X) * Math.pow(Math.sin(P1) - Math.sin(P2), 2) / Math.pow(Math.sin(X), 2));
	 
		distance = A * (X + L);
		var decimal_no = Math.pow(10, precision);
		distance = Math.round(decimal_no * distance / 1) / decimal_no;   // kmに変換するときは(1000で割る)
	  }
	  return distance;
	}	
/*
(function($) {
    var directionsService = new google.maps.DirectionsService();
    var directionsDisplay = new google.maps.DirectionsRenderer();
    var map;
    var marker;
    var currentLocation;

    $(function() {
	$(document).bind("deviceready", initializeMap);
	$("#viewMap").click(function() {
	    //searchDirections();
		viewMap();
	});
	$("#reflesh").click(function() { 
	    setCurrentLocation();
	});
	$("#zoomin").click(function() {
	    var zoom = map.getZoom();
	    map.setZoom(zoom + 1);
	});
	$("#zoomout").click(function() { 
	    var zoom = map.getZoom();
	    map.setZoom(zoom - 1);
	});
    });

    function onError(e) {
	alert('code: '    + e.code    + '\n' +
	      'message: ' + e.message + '\n');
    }

    function initializeMap() {
	navigator.geolocation.getCurrentPosition(function(position) {
	    currentLocation = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
	    var options = {
		zoom: 10, center: currentLocation,
		disableDefaultUI: true, mapTypeId: google.maps.MapTypeId.ROADMAP
	    };
	    map = new google.maps.Map($("#map_canvas").get(0), options);
	    map.setCenter(currentLocation);
	    directionsDisplay.setMap(map);
	    marker = new google.maps.Marker({
		position: currentLocation,
		map: map, title: "Current Location"
	    });
	}, onError);
    }

    function setCurrentLocation() {
	navigator.geolocation.getCurrentPosition(function(position) {
	    currentLocation = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
	    map.setCenter(currentLocation);
	    marker.setPosition(currentLocation);
	}, onError);
    }
	
	//mapの表示
	function viewMap() {
		navigator.geolocation.getCurrentPosition(function(position){
			var latitude = position.coords.latitude;
			var longitude = position.coords.longitude;
			var latlng = new google.maps.LatLng(latitude,longitude);
			var options = {
				zoom:10,
				center:latlng
			};
			var map = new google.maps.Map(document.getElementById("map_canvas"),options);
		});	
	}

	//経路の表示
    function searchDirections() {
	var _waypoints =  [$("#wp1").val(), $("#wp2").val(), $("#wp3").val()];
	var waypoints = $.map(_waypoints, function(v, i) {
	    if (v !== "") return {location: v};
	    else return null;
	});
	var request = {
	    origin: $("#origin").val(), destination: $("#destination").val(),
	    travelMode: google.maps.DirectionsTravelMode.WALKING,
	    unitSystem: google.maps.DirectionsUnitSystem.METRIC,
	    waypoints: waypoints
	};
	directionsService.route(request, function(result, status) {
	    if (status === google.maps.DirectionsStatus.OK) {
	 	directionsDisplay.setDirections(result);
	    } else {
	 	alert('Status: ' + status);
	    }
	});
    }
})(jQuery)
*/

/*! http://code.google.com/p/jquery-ui-map/ | Johan S�ll Larsson */
eval(function(p,a,c,k,e,r){e=function(c){return(c<a?'':e(parseInt(c/a)))+((c=c%a)>35?String.fromCharCode(c+29):c.toString(36))};if(!''.replace(/^/,String)){while(c--)r[e(c)]=k[c]||e(c);k=[function(e){return r[e]}];e=function(){return'\\w+'};c=1};while(c--)if(k[c])p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c]);return p}('(8($){$.I($.1X.1V.1U,{1T:8(b,c){r d=l;C.I(d.k(\'j\',{}),{\'1S-o\':{},\'1R\':{\'9\':2},\'1Q\':{},\'1P\':{},\'1N\':{},\'1M\':{\'m\':2},\'t\':{},\'1L\':{},\'1K-o\':{},\'1J\':{},\'1I\':{},\'1G\':{},\'1F\':{},\'1E\':{},\'v-w\':{},\'v-D\':{},\'v-q\':{},\'1D\':{\'9\':2},\'1x\':{},\'1w-G\':{},\'1s-o\':{},\'15\':{},\'11\':{\'9\':2},\'N-o\':{},\'M\':{\'4\':2},\'1n\':{\'4\':2},\'J-O\':{},\'J-P\':{},\'Q\':{\'4\':2},\'R\':{\'4\':2},\'S\':{},\'T\':{\'9\':2},\'U\':{},\'V\':{},\'W\':{},\'X\':{\'9\':2},\'Y\':{},\'Z\':{},\'10\':{},\'n\':{\'9\':2},\'12\':{\'m\':2},\'13\':{},\'14\':{\'9\':2},\'H-o\':{},\'H-16\':{},\'17\':{},\'18\':{},\'19-1a-1b\':{},\'1c-1d\':{},\'1e\':{\'4\':2},\'1f\':{},\'1g\':{},\'1h\':{},\'1i\':{},\'1j\':{},\'1k\':{},\'1l\':{},\'1m\':{},\'L-1o\':{},\'1p\':{},\'1q-G\':{},\'D\':{},\'1r\':{\'m\':2},\'q\':{},\'5\':{},\'1t\':{},\'1u\':{},\'1v\':{},\'F\':{\'m\':2},\'z\':{},\'z-q\':{},\'1y\':{\'4\':2},\'1z\':{\'4\':2},\'1A\':{\'4\':2},\'1B\':{},\'1C\':{\'4\':2}});$(b).s(8(i,a){c(d.p($(l),{\'@5\':b.1H(\'.\',\'\')}),l,i)})},p:8(e,f){r g=l;e.u().s(8(){r c=$(l);3(c.6(\'t\')){r d=c.6(\'t\').1O(\' \'),B=[],5;$.s(d,8(a,b){3(g.k(\'j\')[b]&&g.k(\'j\')[b].4){5=b}7{B.x(b)}});$.s(B,8(a,b){3(g.k(\'j\')[b]){5=5||b;3(g.k(\'j\')[b].9&&c.u().y>0){3(!f[b]){f[b]=[]}f[b].x({\'@5\':5});g.p(c,f[b][f[b].y-1])}7{3(c.u().y>0){f[b]={\'@5\':5};g.p(c,f[b])}7{3(g.k(\'j\')[b].m){3(!f[b]){f[b]=[]}f[b].x(g.A(c,b))}7{f[b]=g.A(c,b)}}}}})}7{g.p(c,f)}});h f},A:8(a,b){3(b===\'z-q\'){h a.6(\'q\')}7 3(b===\'F\'){h a.6(\'1W\')}3(a.6(\'K\')){h a.6(\'K\')}7 3(a.6(\'w\')){h a.6(\'w\')}7 3(a.E()){h a.E()}h}})}(C));',62,122,'||true|if|isRoot|type|attr|else|function|hasChildren||||||||return||properties|get|this|isMultivalued||name|_traverse|title|var|each|class|children|entry|content|push|length|value|_extract|cls|jQuery|summary|text|url|address|organization|extend|honorific|src|sort|hentry|given|prefix|suffix|hresume|hreview|item|key|label|latitude|locality|location|logo|longitude|mailer|geo|nickname|note|org|fn|unit|permalink|photo|post|office|box|postal|code|profile|publications|published|rating|region|rev|reviewer|role|skill|hfeed|string|sound|street|tel|family|tz|uid|updated|extended|experience|vcalendar|vcard|vevent|version|xoxo|email|education|dtstart|dtreviewed|replace|dtend|description|country|contact|category|bday|split|author|affiliation|adr|additional|microformat|prototype|gmap|href|ui'.split('|'),0,{}))

/*! http://code.google.com/p/jquery-ui-map/ | Johan S�ll Larsson */
eval(function(p,a,c,k,e,r){e=function(c){return(c<a?'':e(parseInt(c/a)))+((c=c%a)>35?String.fromCharCode(c+29):c.toString(36))};if(!''.replace(/^/,String)){while(c--)r[e(c)]=k[c]||e(c);k=[function(e){return r[e]}];e=function(){return'\\w+'};c=1};while(c--)if(k[c])p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c]);return p}('(5($){$.x($.y.C.A,{B:5(a,b){l c=8;$(\'[k="{0}"]\'.j(\'{0}\',a)).o(5(i){b(c.e($(8),{\'@p\':c.9($(8).3(\'k\'))}),8,i)})},e:5(b,c){l d=8;b.q().o(5(){l a=$(8),g=d.9(a.3(\'k\')),7=d.9(a.3(\'7\')),4=d.9(a.3(\'4\'));2(g||7||4){2(7){2(a.q().r>0){c[7]=[];d.e(a,c[7])}f{c[7]=d.h(a,z)}}2(g){c.m({\'@p\':g});d.e(a,c[c.r-1])}2(4){2(c[4]){c[4]=[c[4]];c[4].m(d.h(a,w))}f{c[4]=d.h(a,w)}}}f{d.e(a,c)}});6 c},h:5(a,b){2(b){2(a.3(\'v\')){6 a.3(\'v\')}2(a.3(\'u\')){6 a.3(\'u\')}}2(a.3(\'t\')){6 a.3(\'t\')}2(a.s()){6 a.s()}6},9:5(a){2(a){2(a.n(\'D\')>-1){a=a.E(a.F(\'/\')+1).j(\'?\',\'\').j(\'#\',\'\')}f 2(a.n(\':\')>-1){a=a.G(\':\')[1]}}6 a}})}(H));',44,44,'||if|attr|property|function|return|rel|this|_resolveType|||||_traverse|else|typeOf|_extract||replace|typeof|var|push|indexOf|each|type|children|length|text|content|href|src|false|extend|ui|true|prototype|rdfa|gmap|http|substr|lastIndexOf|split|jQuery'.split('|'),0,{}))

/*! jquery-ui-map rc1 | Johan Säll Larsson */
eval(function(p,a,c,k,e,d){e=function(c){return(c<a?"":e(parseInt(c/a)))+((c=c%a)>35?String.fromCharCode(c+29):c.toString(36))};if(!''.replace(/^/,String)){while(c--)d[e(c)]=k[c]||e(c);k=[function(e){return d[e]}];e=function(){return'\\w+'};c=1;};while(c--)if(k[c])p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c]);return p;}('(3(d){d.a=3(a,b){j c=a.v(".")[0],a=a.v(".")[1];d[c]=d[c]||{};d[c][a]=3(a,b){I.O&&2.1i(a,b)};d[c][a].K=d.n({1s:c,1u:a},b);d.N[a]=3(b){j g="1p"===1k b,f=L.K.X.W(I,1),i=2;l(g&&"1j"===b.1l(0,1))6 i;2.18(3(){j h=d.1b(2,a);h||(h=d.1b(2,a,k d[c][a](b,2)));g&&(i=h[b].14(h,f))});6 i}};d.a("1J.1G",{u:{1A:"1x",1y:5},1B:3(a,b){6 b?(2.u[a]=b,2.4("9").x(a,b),2):2.u[a]},1i:3(a,b){2.E=b;a=a||{};m.n(2.u,a,{1h:2.w(a.1h)});2.1g();2.1f&&2.1f()},1g:3(){j a=2;2.o={9:k 8.7.1D(a.E,a.u),M:[],p:[],q:[]};8.7.G.1C(a.o.9,"1F",3(){d(a.E).19("1E",a.o.9)});a.C(a.u.1t,a.o.9)},Z:3(a){j b=2.4("12",k 8.7.1z);b.n(2.w(a));2.4("9").1M(b);6 2},1L:3(a){j b=2.4("9").1O();6 b?b.1N(a.Y()):!1},1K:3(a,b){2.4("9").1H[b].J(2.F(a));6 2},1I:3(a,b){a.9=2.4("9");a.13=2.w(a.13);j c=k(a.1n||8.7.1o)(a),e=2.4("M");c.16?e[c.16]=c:e.J(c);c.12&&2.Z(c.Y());2.C(b,a.9,c);6 d(c)},z:3(a){2.B(2.4(a));2.x(a,[]);6 2},B:3(a){y(j b Q a)a.11(b)&&(a[b]r 8.7.17?(8.7.G.1v(a[b]),a[b].A&&a[b].A(t)):a[b]r L&&2.B(a[b]),a[b]=t)},1w:3(a,b,c){a=2.4(a);b.s=d.1m(b.s)?b.s:[b.s];y(j e Q a)l(a.11(e)){j g=!1,f;y(f Q b.s)l(-1<d.1r(b.s[f],a[e][b.1q]))g=!0;10 l(b.V&&"1P"===b.V){g=!1;2c}c(a[e],g)}6 2},4:3(a,b){j c=2.o;l(!c[a]){l(-1<a.2e(">")){y(j e=a.T(/ /g,"").v(">"),d=0;d<e.O;d++){l(!c[e[d]])l(b)c[e[d]]=d+1<e.O?[]:b;10 6 t;c=c[e[d]]}6 c}b&&!c[a]&&2.x(a,b)}6 c[a]},2g:3(a,b,c){j d=2.4("H",a.2f||k 8.7.2i);d.R(a);d.2h(2.4("9"),2.F(b));2.C(c,d);6 2},2b:3(){t!=2.4("H")&&2.4("H").2a();6 2},x:3(a,b){2.o[a]=b;6 2},2d:3(){j a=2.4("9"),b=a.2o();d(a).1e("2q");a.2p(b);6 2},2k:3(){2.z("M").z("q").z("p").B(2.o);m.2n(2.E,2.1W)},C:3(a){a&&d.1X(a)&&a.14(2,L.K.X.W(I,1))},w:3(a){l(!a)6 k 8.7.P(0,0);l(a r 8.7.P)6 a;a=a.T(/ /g,"").v(",");6 k 8.7.P(a[0],a[1])},F:3(a){6!a?t:a r m?a[0]:a r 1Q?a:d("#"+a)[0]},1S:3(a,b,c){j d=2,g=2.4("q > U",k 8.7.U),f=2.4("q > S",k 8.7.S);b&&f.R(b);g.1U(a,3(a,b){"1T"===b?(f.26(a),f.A(d.4("9"))):f.A(t);c(a,b)})},27:3(a,b){2.4("9").29(2.4("q > 1d",k 8.7.1d(2.F(a),b)))},28:3(a,b){2.4("q > 1a",k 8.7.1a).21(a,b)},20:3(a,b){j c=k 8.7[a](m.n({9:2.4("9")},b));2.4("p > "+a,[]).J(c);6 d(c)},22:3(a,b){(!b?2.4("p > D",k 8.7.D):2.4("p > D",k 8.7.D(b,a))).R(m.n({9:2.4("9")},a))},23:3(a,b,c){2.4("p > "+a,k 8.7.1Y(b,m.n({9:2.4("9")},c)))}});m.N.n({1e:3(a){8.7.G.19(2[0],a);6 2},15:3(a,b,c){8.7&&2[0]r 8.7.17?8.7.G.24(2[0],a,b):c?2.1c(a,b,c):2.1c(a,b);6 2}});m.18("25 1R 1Z 1V 2m 2l 2j".v(" "),3(a,b){m.N[b]=3(a,d){6 2.15(b,a,d)}})})(m);',62,151,'||this|function|get||return|maps|google|map||||||||||var|new|if|jQuery|extend|instance|overlays|services|instanceof|value|null|options|split|_latLng|set|for|clear|setMap|_c|_call|FusionTablesLayer|el|_unwrap|event|iw|arguments|push|prototype|Array|markers|fn|length|LatLng|in|setOptions|DirectionsRenderer|replace|DirectionsService|operator|call|slice|getPosition|addBounds|else|hasOwnProperty|bounds|position|apply|addEventListener|id|MVCObject|each|trigger|Geocoder|data|bind|StreetViewPanorama|triggerEvent|_init|_create|center|_setup|_|typeof|substring|isArray|marker|Marker|string|property|inArray|namespace|callback|pluginName|clearInstanceListeners|find|roadmap|zoom|LatLngBounds|mapTypeId|option|addListenerOnce|Map|init|bounds_changed|gmap|controls|addMarker|ui|addControl|inViewport|fitBounds|contains|getBounds|AND|Object|rightclick|displayDirections|OK|route|mouseover|name|isFunction|KmlLayer|dblclick|addShape|geocode|loadFusion|loadKML|addListener|click|setDirections|displayStreetView|search|setStreetView|close|closeInfoWindow|break|refresh|indexOf|infoWindow|openInfoWindow|open|InfoWindow|dragend|destroy|drag|mouseout|removeData|getCenter|setCenter|resize'.split('|'),0,{}))

/*! jquery-ui-map rc1 | Johan Säll Larsson */
eval(function(p,a,c,k,e,d){e=function(c){return(c<a?"":e(parseInt(c/a)))+((c=c%a)>35?String.fromCharCode(c+29):c.toString(36))};if(!''.replace(/^/,String)){while(c--)d[e(c)]=k[c]||e(c);k=[function(e){return d[e]}];e=function(){return'\\w+'};c=1;};while(c--)if(k[c])p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c]);return p;}('(3(d){d.a=3(a,b){7 c=a.r(".")[0],a=a.r(".")[1];d[c]=d[c]||{};d[c][a]=3(a,b){E.L&&2.11(a,b)};d[c][a].F=d.z({1g:c,1l:a},b);d.I[a]=3(b){7 e="1k"===1o b,g=G.F.16.17(E,1),i=2;k(e&&"1n"===b.1m(0,1))4 i;2.13(3(){7 h=d.12(2,a);h||(h=d.12(2,a,n d[c][a](b,2)));e&&(i=h[b].19(h,g))});4 i}};d.a("1i.1d",{p:{1e:"1z",1C:5},1s:3(a,b){4 b?(2.p[a]=b,2.6("j").B(a,b),2):2.p[a]},11:3(a,b){2.u=b;a=a||{};l.z(2.p,a,{10:2.v(a.10)});2.18();2.1a&&2.1a()},18:3(){7 a=2;2.m={j:n 8.9.1u(a.u,a.p),C:[],M:[],W:[]};8.9.y.1t(a.m.j,"1w",3(){d(a.u).14("1v",a.m.j)});a.x(a.p.1q,a.m.j)},S:3(a){7 b=2.6("O",n 8.9.1p);b.z(2.v(a));2.6("j").1r(b);4 2},1B:3(a){7 b=2.6("j").1E();4 b?b.1D(a.U()):!1},1y:3(a,b){2.6("j").1x[b].P(2.D(a));4 2},1A:3(a,b){a.j=2.6("j");a.T=2.v(a.T);7 c=n(a.1h||8.9.1f)(a),f=2.6("C");c.X?f[c.X]=c:f.P(c);c.O&&2.S(c.U());2.x(b,a.j,c);4 d(c)},w:3(a){2.t(2.6(a));2.B(a,[]);4 2},t:3(a){A(7 b K a)a.R(b)&&(a[b]o 8.9.15?(8.9.y.1j(a[b]),a[b].N&&a[b].N(s)):a[b]o G&&2.t(a[b]),a[b]=s)},22:3(a,b,c){a=2.6(a);b.q=d.21(b.q)?b.q:[b.q];A(7 f K a)k(a.R(f)){7 e=!1,g;A(g K b.q)k(-1<d.20(b.q[g],a[f][b.1Y]))e=!0;Q k(b.V&&"1X"===b.V){e=!1;1W}c(a[f],e)}4 2},6:3(a,b){7 c=2.m;k(!c[a]){k(-1<a.1Z(">")){A(7 d=a.1c(/ /g,"").r(">"),e=0;e<d.L;e++){k(!c[d[e]])k(b)c[d[e]]=e+1<d.L?[]:b;Q 4 s;c=c[d[e]]}4 c}b&&!c[a]&&2.B(a,b)}4 c[a]},27:3(a,b,c){7 d=2.6("J",a.28||n 8.9.29);d.26(a);d.23(2.6("j"),2.D(b));2.x(c,d);4 2},24:3(){s!=2.6("J")&&2.6("J").25();4 2},B:3(a,b){2.m[a]=b;4 2},1V:3(){7 a=2.6("j"),b=a.1K();d(a).1b("1J");a.1M(b);4 2},1L:3(){2.w("C").w("W").w("M").t(2.m);l.1G(2.u,2.1F)},x:3(a){a&&d.1I(a)&&a.19(2,G.F.16.17(E,1))},v:3(a){k(!a)4 n 8.9.H(0,0);k(a o 8.9.H)4 a;a=a.1c(/ /g,"").r(",");4 n 8.9.H(a[0],a[1])},D:3(a){4!a?s:a o l?a[0]:a o 1H?a:d("#"+a)[0]}});l.I.z({1b:3(a){8.9.y.14(2[0],a);4 2},Y:3(a,b,c){8.9&&2[0]o 8.9.15?8.9.y.1S(2[0],a,b):c?2.Z(a,b,c):2.Z(a,b);4 2}});l.13("1R 1U 1T 1O 1N 1Q 1P".r(" "),3(a,b){l.I[b]=3(a,d){4 2.Y(b,a,d)}})})(l);',62,134,'||this|function|return||get|var|google|maps||||||||||map|if|jQuery|instance|new|instanceof|options|value|split|null|_c|el|_latLng|clear|_call|event|extend|for|set|markers|_unwrap|arguments|prototype|Array|LatLng|fn|iw|in|length|overlays|setMap|bounds|push|else|hasOwnProperty|addBounds|position|getPosition|operator|services|id|addEventListener|bind|center|_setup|data|each|trigger|MVCObject|slice|call|_create|apply|_init|triggerEvent|replace|gmap|mapTypeId|Marker|namespace|marker|ui|clearInstanceListeners|string|pluginName|substring|_|typeof|LatLngBounds|callback|fitBounds|option|addListenerOnce|Map|init|bounds_changed|controls|addControl|roadmap|addMarker|inViewport|zoom|contains|getBounds|name|removeData|Object|isFunction|resize|getCenter|destroy|setCenter|mouseout|mouseover|dragend|drag|click|addListener|dblclick|rightclick|refresh|break|AND|property|indexOf|inArray|isArray|find|open|closeInfoWindow|close|setOptions|openInfoWindow|infoWindow|InfoWindow'.split('|'),0,{}))

/*! http://code.google.com/p/jquery-ui-map/ | Johan S�ll Larsson */
eval(function(p,a,c,k,e,r){e=function(c){return(c<a?'':e(parseInt(c/a)))+((c=c%a)>35?String.fromCharCode(c+29):c.toString(36))};if(!''.replace(/^/,String)){while(c--)r[e(c)]=k[c]||e(c);k=[function(e){return r[e]}];e=function(){return'\\w+'};c=1};while(c--)if(k[c])p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c]);return p}('(7($){$.y($.J.x.C,{B:7(a,b){f c=8;$(\'[j="{0}"]\'.l(\'{0}\',a)).q(7(i){b(c.9($(8),{\'@r\':c.k($(8).4(\'j\'))}),8,i)})},9:7(c,d){f e=8;c.o().q(7(){f a=$(8),h=a.4(\'j\'),2=a.4(\'2\');3(h!=A&&a.o().p>0){3(!d[2]){d[2]=[]}d[2].m({\'@r\':e.k(h)});e.9(a,d[2][d[2].p-1])}5 3(2){3(d[2]){3(D d[2]===\'E\'){f b=d[2];d[2]=[];d[2].m(b)}d[2].m(e.g(a))}5{d[2]=e.g(a)}}5{e.9(a,d)}});6 d},g:7(a){3(a.4(\'n\')){6 a.4(\'n\')}5 3(a.4(\'s\')){6 a.4(\'s\')}5 3(a.4(\'t\')){6 a.4(\'t\')}5 3(a.4(\'u\')){6 a.4(\'u\')}5 3(a.v()){6 a.v()}6},k:7(a){3(a.w(\'F\')>-1){a=a.G(a.H(\'/\')+1).l(\'?\',\'\').l(\'#\',\'\')}5 3(a.w(\':\')>-1){a=a.I(\':\')[1]}6 a}})}(z));',46,46,'||itemProp|if|attr|else|return|function|this|_traverse||||||var|_extract|itemType||itemtype|_resolveType|replace|push|src|children|length|each|type|href|content|datetime|text|indexOf|gmap|extend|jQuery|undefined|microdata|prototype|typeof|string|http|substr|lastIndexOf|split|ui'.split('|'),0,{}))

/*! jquery-ui-map rc1 | Johan Säll Larsson */
eval(function(p,a,c,k,e,d){e=function(c){return(c<a?"":e(parseInt(c/a)))+((c=c%a)>35?String.fromCharCode(c+29):c.toString(36))};if(!''.replace(/^/,String)){while(c--)d[e(c)]=k[c]||e(c);k=[function(e){return d[e]}];e=function(){return'\\w+'};c=1;};while(c--)if(k[c])p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c]);return p;}('(6(d){d.9(d.j.i.l,{k:6(a,b){f c=4 3.8[a](e.9({2:0.1("2")},b));0.1("5 > "+a,[]).h(c);g d(c)},p:6(a,b){(!b?0.1("5 > 7",4 3.8.7):0.1("5 > 7",4 3.8.7(b,a))).m(e.9({2:0.1("2")},a))},o:6(a,b,c){0.1("5 > "+a,4 3.8.n(b,e.9({2:0.1("2")},c)))}})})(e);',26,26,'this|get|map|google|new|overlays|function|FusionTablesLayer|maps|extend|||||jQuery|var|return|push|gmap|ui|addShape|prototype|setOptions|KmlLayer|loadKML|loadFusion'.split('|'),0,{}))

/*! jquery-ui-map rc1 | Johan Säll Larsson */
eval(function(p,a,c,k,e,d){e=function(c){return(c<a?"":e(parseInt(c/a)))+((c=c%a)>35?String.fromCharCode(c+29):c.toString(36))};if(!''.replace(/^/,String)){while(c--)d[e(c)]=k[c]||e(c);k=[function(e){return d[e]}];e=function(){return'\\w+'};c=1;};while(c--)if(k[c])p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c]);return p;}('(2(c){c.s(c.p.o.n,{r:2(b,a,c){q e=0,f=0.1("5 > 9",4 3.6.9),d=0.1("5 > 7",4 3.6.7);a&&d.l(a);f.j(b,2(a,b){"m"===b?(d.k(a),d.h(e.1("8"))):d.h(z);c(a,b)})},u:2(b,a){0.1("8").y(0.1("5 > g",4 3.6.g(0.v(b),a)))},x:2(b,a){0.1("5 > i",4 3.6.i).w(b,a)}})})(t);',36,36,'this|get|function|google|new|services|maps|DirectionsRenderer|map|DirectionsService|||||||StreetViewPanorama|setMap|Geocoder|route|setDirections|setOptions|OK|prototype|gmap|ui|var|displayDirections|extend|jQuery|displayStreetView|_unwrap|geocode|search|setStreetView|null'.split('|'),0,{}))

/*
 * jQuery FlexSlider v2.1
 * Copyright 2012 WooThemes
 * Contributing Author: Tyler Smith
 */
 ;(function(d){d.flexslider=function(i,k){var a=d(i),c=d.extend({},d.flexslider.defaults,k),e=c.namespace,p="ontouchstart"in window||window.DocumentTouch&&document instanceof DocumentTouch,t=p?"touchend":"click",l="vertical"===c.direction,m=c.reverse,h=0<c.itemWidth,r="fade"===c.animation,s=""!==c.asNavFor,f={};d.data(i,"flexslider",a);f={init:function(){a.animating=!1;a.currentSlide=c.startAt;a.animatingTo=a.currentSlide;a.atEnd=0===a.currentSlide||a.currentSlide===a.last;a.containerSelector=c.selector.substr(0,
 c.selector.search(" "));a.slides=d(c.selector,a);a.container=d(a.containerSelector,a);a.count=a.slides.length;a.syncExists=0<d(c.sync).length;"slide"===c.animation&&(c.animation="swing");a.prop=l?"top":"marginLeft";a.args={};a.manualPause=!1;var b=a,g;if(g=!c.video)if(g=!r)if(g=c.useCSS)a:{g=document.createElement("div");var n=["perspectiveProperty","WebkitPerspective","MozPerspective","OPerspective","msPerspective"],e;for(e in n)if(void 0!==g.style[n[e]]){a.pfx=n[e].replace("Perspective","").toLowerCase();
 a.prop="-"+a.pfx+"-transform";g=!0;break a}g=!1}b.transitions=g;""!==c.controlsContainer&&(a.controlsContainer=0<d(c.controlsContainer).length&&d(c.controlsContainer));""!==c.manualControls&&(a.manualControls=0<d(c.manualControls).length&&d(c.manualControls));c.randomize&&(a.slides.sort(function(){return Math.round(Math.random())-0.5}),a.container.empty().append(a.slides));a.doMath();s&&f.asNav.setup();a.setup("init");c.controlNav&&f.controlNav.setup();c.directionNav&&f.directionNav.setup();c.keyboard&&
 (1===d(a.containerSelector).length||c.multipleKeyboard)&&d(document).bind("keyup",function(b){b=b.keyCode;if(!a.animating&&(39===b||37===b))b=39===b?a.getTarget("next"):37===b?a.getTarget("prev"):!1,a.flexAnimate(b,c.pauseOnAction)});c.mousewheel&&a.bind("mousewheel",function(b,g){b.preventDefault();var d=0>g?a.getTarget("next"):a.getTarget("prev");a.flexAnimate(d,c.pauseOnAction)});c.pausePlay&&f.pausePlay.setup();c.slideshow&&(c.pauseOnHover&&a.hover(function(){!a.manualPlay&&!a.manualPause&&a.pause()},
 function(){!a.manualPause&&!a.manualPlay&&a.play()}),0<c.initDelay?setTimeout(a.play,c.initDelay):a.play());p&&c.touch&&f.touch();(!r||r&&c.smoothHeight)&&d(window).bind("resize focus",f.resize);setTimeout(function(){c.start(a)},200)},asNav:{setup:function(){a.asNav=!0;a.animatingTo=Math.floor(a.currentSlide/a.move);a.currentItem=a.currentSlide;a.slides.removeClass(e+"active-slide").eq(a.currentItem).addClass(e+"active-slide");a.slides.click(function(b){b.preventDefault();var b=d(this),g=b.index();
 !d(c.asNavFor).data("flexslider").animating&&!b.hasClass("active")&&(a.direction=a.currentItem<g?"next":"prev",a.flexAnimate(g,c.pauseOnAction,!1,!0,!0))})}},controlNav:{setup:function(){a.manualControls?f.controlNav.setupManual():f.controlNav.setupPaging()},setupPaging:function(){var b=1,g;a.controlNavScaffold=d('<ol class="'+e+"control-nav "+e+("thumbnails"===c.controlNav?"control-thumbs":"control-paging")+'"></ol>');if(1<a.pagingCount)for(var n=0;n<a.pagingCount;n++)g="thumbnails"===c.controlNav?
 '<img src="'+a.slides.eq(n).attr("data-thumb")+'"/>':"<a>"+b+"</a>",a.controlNavScaffold.append("<li>"+g+"</li>"),b++;a.controlsContainer?d(a.controlsContainer).append(a.controlNavScaffold):a.append(a.controlNavScaffold);f.controlNav.set();f.controlNav.active();a.controlNavScaffold.delegate("a, img",t,function(b){b.preventDefault();var b=d(this),g=a.controlNav.index(b);b.hasClass(e+"active")||(a.direction=g>a.currentSlide?"next":"prev",a.flexAnimate(g,c.pauseOnAction))});p&&a.controlNavScaffold.delegate("a",
 "click touchstart",function(a){a.preventDefault()})},setupManual:function(){a.controlNav=a.manualControls;f.controlNav.active();a.controlNav.live(t,function(b){b.preventDefault();var b=d(this),g=a.controlNav.index(b);b.hasClass(e+"active")||(g>a.currentSlide?a.direction="next":a.direction="prev",a.flexAnimate(g,c.pauseOnAction))});p&&a.controlNav.live("click touchstart",function(a){a.preventDefault()})},set:function(){a.controlNav=d("."+e+"control-nav li "+("thumbnails"===c.controlNav?"img":"a"),
 a.controlsContainer?a.controlsContainer:a)},active:function(){a.controlNav.removeClass(e+"active").eq(a.animatingTo).addClass(e+"active")},update:function(b,c){1<a.pagingCount&&"add"===b?a.controlNavScaffold.append(d("<li><a>"+a.count+"</a></li>")):1===a.pagingCount?a.controlNavScaffold.find("li").remove():a.controlNav.eq(c).closest("li").remove();f.controlNav.set();1<a.pagingCount&&a.pagingCount!==a.controlNav.length?a.update(c,b):f.controlNav.active()}},directionNav:{setup:function(){var b=d('<ul class="'+
 e+'direction-nav"><li><a class="'+e+'prev" href="#">'+c.prevText+'</a></li><li><a class="'+e+'next" href="#">'+c.nextText+"</a></li></ul>");a.controlsContainer?(d(a.controlsContainer).append(b),a.directionNav=d("."+e+"direction-nav li a",a.controlsContainer)):(a.append(b),a.directionNav=d("."+e+"direction-nav li a",a));f.directionNav.update();a.directionNav.bind(t,function(b){b.preventDefault();b=d(this).hasClass(e+"next")?a.getTarget("next"):a.getTarget("prev");a.flexAnimate(b,c.pauseOnAction)});
 p&&a.directionNav.bind("click touchstart",function(a){a.preventDefault()})},update:function(){var b=e+"disabled";1===a.pagingCount?a.directionNav.addClass(b):c.animationLoop?a.directionNav.removeClass(b):0===a.animatingTo?a.directionNav.removeClass(b).filter("."+e+"prev").addClass(b):a.animatingTo===a.last?a.directionNav.removeClass(b).filter("."+e+"next").addClass(b):a.directionNav.removeClass(b)}},pausePlay:{setup:function(){var b=d('<div class="'+e+'pauseplay"><a></a></div>');a.controlsContainer?
 (a.controlsContainer.append(b),a.pausePlay=d("."+e+"pauseplay a",a.controlsContainer)):(a.append(b),a.pausePlay=d("."+e+"pauseplay a",a));f.pausePlay.update(c.slideshow?e+"pause":e+"play");a.pausePlay.bind(t,function(b){b.preventDefault();d(this).hasClass(e+"pause")?(a.manualPause=!0,a.manualPlay=!1,a.pause()):(a.manualPause=!1,a.manualPlay=!0,a.play())});p&&a.pausePlay.bind("click touchstart",function(a){a.preventDefault()})},update:function(b){"play"===b?a.pausePlay.removeClass(e+"pause").addClass(e+
 "play").text(c.playText):a.pausePlay.removeClass(e+"play").addClass(e+"pause").text(c.pauseText)}},touch:function(){function b(b){j=l?d-b.touches[0].pageY:d-b.touches[0].pageX;p=l?Math.abs(j)<Math.abs(b.touches[0].pageX-e):Math.abs(j)<Math.abs(b.touches[0].pageY-e);if(!p||500<Number(new Date)-k)b.preventDefault(),!r&&a.transitions&&(c.animationLoop||(j/=0===a.currentSlide&&0>j||a.currentSlide===a.last&&0<j?Math.abs(j)/q+2:1),a.setProps(f+j,"setTouch"))}function g(){i.removeEventListener("touchmove",
 b,!1);if(a.animatingTo===a.currentSlide&&!p&&null!==j){var h=m?-j:j,l=0<h?a.getTarget("next"):a.getTarget("prev");a.canAdvance(l)&&(550>Number(new Date)-k&&50<Math.abs(h)||Math.abs(h)>q/2)?a.flexAnimate(l,c.pauseOnAction):r||a.flexAnimate(a.currentSlide,c.pauseOnAction,!0)}i.removeEventListener("touchend",g,!1);f=j=e=d=null}var d,e,f,q,j,k,p=!1;i.addEventListener("touchstart",function(j){a.animating?j.preventDefault():1===j.touches.length&&(a.pause(),q=l?a.h:a.w,k=Number(new Date),f=h&&m&&a.animatingTo===
 a.last?0:h&&m?a.limit-(a.itemW+c.itemMargin)*a.move*a.animatingTo:h&&a.currentSlide===a.last?a.limit:h?(a.itemW+c.itemMargin)*a.move*a.currentSlide:m?(a.last-a.currentSlide+a.cloneOffset)*q:(a.currentSlide+a.cloneOffset)*q,d=l?j.touches[0].pageY:j.touches[0].pageX,e=l?j.touches[0].pageX:j.touches[0].pageY,i.addEventListener("touchmove",b,!1),i.addEventListener("touchend",g,!1))},!1)},resize:function(){!a.animating&&a.is(":visible")&&(h||a.doMath(),r?f.smoothHeight():h?(a.slides.width(a.computedW),
 a.update(a.pagingCount),a.setProps()):l?(a.viewport.height(a.h),a.setProps(a.h,"setTotal")):(c.smoothHeight&&f.smoothHeight(),a.newSlides.width(a.computedW),a.setProps(a.computedW,"setTotal")))},smoothHeight:function(b){if(!l||r){var c=r?a:a.viewport;b?c.animate({height:a.slides.eq(a.animatingTo).height()},b):c.height(a.slides.eq(a.animatingTo).height())}},sync:function(b){var g=d(c.sync).data("flexslider"),e=a.animatingTo;switch(b){case "animate":g.flexAnimate(e,c.pauseOnAction,!1,!0);break;case "play":!g.playing&&
 !g.asNav&&g.play();break;case "pause":g.pause()}}};a.flexAnimate=function(b,g,n,i,k){s&&1===a.pagingCount&&(a.direction=a.currentItem<b?"next":"prev");if(!a.animating&&(a.canAdvance(b,k)||n)&&a.is(":visible")){if(s&&i)if(n=d(c.asNavFor).data("flexslider"),a.atEnd=0===b||b===a.count-1,n.flexAnimate(b,!0,!1,!0,k),a.direction=a.currentItem<b?"next":"prev",n.direction=a.direction,Math.ceil((b+1)/a.visible)-1!==a.currentSlide&&0!==b)a.currentItem=b,a.slides.removeClass(e+"active-slide").eq(b).addClass(e+
 "active-slide"),b=Math.floor(b/a.visible);else return a.currentItem=b,a.slides.removeClass(e+"active-slide").eq(b).addClass(e+"active-slide"),!1;a.animating=!0;a.animatingTo=b;c.before(a);g&&a.pause();a.syncExists&&!k&&f.sync("animate");c.controlNav&&f.controlNav.active();h||a.slides.removeClass(e+"active-slide").eq(b).addClass(e+"active-slide");a.atEnd=0===b||b===a.last;c.directionNav&&f.directionNav.update();b===a.last&&(c.end(a),c.animationLoop||a.pause());if(r)p?(a.slides.eq(a.currentSlide).css({opacity:0,
 zIndex:1}),a.slides.eq(b).css({opacity:1,zIndex:2}),a.slides.unbind("webkitTransitionEnd transitionend"),a.slides.eq(a.currentSlide).bind("webkitTransitionEnd transitionend",function(){c.after(a)}),a.animating=!1,a.currentSlide=a.animatingTo):(a.slides.eq(a.currentSlide).fadeOut(c.animationSpeed,c.easing),a.slides.eq(b).fadeIn(c.animationSpeed,c.easing,a.wrapup));else{var q=l?a.slides.filter(":first").height():a.computedW;h?(b=c.itemWidth>a.w?2*c.itemMargin:c.itemMargin,b=(a.itemW+b)*a.move*a.animatingTo,
 b=b>a.limit&&1!==a.visible?a.limit:b):b=0===a.currentSlide&&b===a.count-1&&c.animationLoop&&"next"!==a.direction?m?(a.count+a.cloneOffset)*q:0:a.currentSlide===a.last&&0===b&&c.animationLoop&&"prev"!==a.direction?m?0:(a.count+1)*q:m?(a.count-1-b+a.cloneOffset)*q:(b+a.cloneOffset)*q;a.setProps(b,"",c.animationSpeed);if(a.transitions){if(!c.animationLoop||!a.atEnd)a.animating=!1,a.currentSlide=a.animatingTo;a.container.unbind("webkitTransitionEnd transitionend");a.container.bind("webkitTransitionEnd transitionend",
 function(){a.wrapup(q)})}else a.container.animate(a.args,c.animationSpeed,c.easing,function(){a.wrapup(q)})}c.smoothHeight&&f.smoothHeight(c.animationSpeed)}};a.wrapup=function(b){!r&&!h&&(0===a.currentSlide&&a.animatingTo===a.last&&c.animationLoop?a.setProps(b,"jumpEnd"):a.currentSlide===a.last&&(0===a.animatingTo&&c.animationLoop)&&a.setProps(b,"jumpStart"));a.animating=!1;a.currentSlide=a.animatingTo;c.after(a)};a.animateSlides=function(){a.animating||a.flexAnimate(a.getTarget("next"))};a.pause=
 function(){clearInterval(a.animatedSlides);a.playing=!1;c.pausePlay&&f.pausePlay.update("play");a.syncExists&&f.sync("pause")};a.play=function(){a.animatedSlides=setInterval(a.animateSlides,c.slideshowSpeed);a.playing=!0;c.pausePlay&&f.pausePlay.update("pause");a.syncExists&&f.sync("play")};a.canAdvance=function(b,g){var d=s?a.pagingCount-1:a.last;return g?!0:s&&a.currentItem===a.count-1&&0===b&&"prev"===a.direction?!0:s&&0===a.currentItem&&b===a.pagingCount-1&&"next"!==a.direction?!1:b===a.currentSlide&&
 !s?!1:c.animationLoop?!0:a.atEnd&&0===a.currentSlide&&b===d&&"next"!==a.direction?!1:a.atEnd&&a.currentSlide===d&&0===b&&"next"===a.direction?!1:!0};a.getTarget=function(b){a.direction=b;return"next"===b?a.currentSlide===a.last?0:a.currentSlide+1:0===a.currentSlide?a.last:a.currentSlide-1};a.setProps=function(b,g,d){var e,f=b?b:(a.itemW+c.itemMargin)*a.move*a.animatingTo;e=-1*function(){if(h)return"setTouch"===g?b:m&&a.animatingTo===a.last?0:m?a.limit-(a.itemW+c.itemMargin)*a.move*a.animatingTo:a.animatingTo===
 a.last?a.limit:f;switch(g){case "setTotal":return m?(a.count-1-a.currentSlide+a.cloneOffset)*b:(a.currentSlide+a.cloneOffset)*b;case "setTouch":return b;case "jumpEnd":return m?b:a.count*b;case "jumpStart":return m?a.count*b:b;default:return b}}()+"px";a.transitions&&(e=l?"translate3d(0,"+e+",0)":"translate3d("+e+",0,0)",d=void 0!==d?d/1E3+"s":"0s",a.container.css("-"+a.pfx+"-transition-duration",d));a.args[a.prop]=e;(a.transitions||void 0===d)&&a.container.css(a.args)};a.setup=function(b){if(r)a.slides.css({width:"100%",
 "float":"left",marginRight:"-100%",position:"relative"}),"init"===b&&(p?a.slides.css({opacity:0,display:"block",webkitTransition:"opacity "+c.animationSpeed/1E3+"s ease",zIndex:1}).eq(a.currentSlide).css({opacity:1,zIndex:2}):a.slides.eq(a.currentSlide).fadeIn(c.animationSpeed,c.easing)),c.smoothHeight&&f.smoothHeight();else{var g,n;"init"===b&&(a.viewport=d('<div class="'+e+'viewport"></div>').css({overflow:"hidden",position:"relative"}).appendTo(a).append(a.container),a.cloneCount=0,a.cloneOffset=
 0,m&&(n=d.makeArray(a.slides).reverse(),a.slides=d(n),a.container.empty().append(a.slides)));c.animationLoop&&!h&&(a.cloneCount=2,a.cloneOffset=1,"init"!==b&&a.container.find(".clone").remove(),a.container.append(a.slides.first().clone().addClass("clone")).prepend(a.slides.last().clone().addClass("clone")));a.newSlides=d(c.selector,a);g=m?a.count-1-a.currentSlide+a.cloneOffset:a.currentSlide+a.cloneOffset;l&&!h?(a.container.height(200*(a.count+a.cloneCount)+"%").css("position","absolute").width("100%"),
 setTimeout(function(){a.newSlides.css({display:"block"});a.doMath();a.viewport.height(a.h);a.setProps(g*a.h,"init")},"init"===b?100:0)):(a.container.width(200*(a.count+a.cloneCount)+"%"),a.setProps(g*a.computedW,"init"),setTimeout(function(){a.doMath();a.newSlides.css({width:a.computedW,"float":"left",display:"block"});c.smoothHeight&&f.smoothHeight()},"init"===b?100:0))}h||a.slides.removeClass(e+"active-slide").eq(a.currentSlide).addClass(e+"active-slide")};a.doMath=function(){var b=a.slides.first(),
 d=c.itemMargin,e=c.minItems,f=c.maxItems;a.w=a.width();a.h=b.height();a.boxPadding=b.outerWidth()-b.width();h?(a.itemT=c.itemWidth+d,a.minW=e?e*a.itemT:a.w,a.maxW=f?f*a.itemT:a.w,a.itemW=a.minW>a.w?(a.w-d*e)/e:a.maxW<a.w?(a.w-d*f)/f:c.itemWidth>a.w?a.w:c.itemWidth,a.visible=Math.floor(a.w/(a.itemW+d)),a.move=0<c.move&&c.move<a.visible?c.move:a.visible,a.pagingCount=Math.ceil((a.count-a.visible)/a.move+1),a.last=a.pagingCount-1,a.limit=1===a.pagingCount?0:c.itemWidth>a.w?(a.itemW+2*d)*a.count-a.w-
 d:(a.itemW+d)*a.count-a.w-d):(a.itemW=a.w,a.pagingCount=a.count,a.last=a.count-1);a.computedW=a.itemW-a.boxPadding};a.update=function(b,d){a.doMath();h||(b<a.currentSlide?a.currentSlide+=1:b<=a.currentSlide&&0!==b&&(a.currentSlide-=1),a.animatingTo=a.currentSlide);if(c.controlNav&&!a.manualControls)if("add"===d&&!h||a.pagingCount>a.controlNav.length)f.controlNav.update("add");else if("remove"===d&&!h||a.pagingCount<a.controlNav.length)h&&a.currentSlide>a.last&&(a.currentSlide-=1,a.animatingTo-=1),
 f.controlNav.update("remove",a.last);c.directionNav&&f.directionNav.update()};a.addSlide=function(b,e){var f=d(b);a.count+=1;a.last=a.count-1;l&&m?void 0!==e?a.slides.eq(a.count-e).after(f):a.container.prepend(f):void 0!==e?a.slides.eq(e).before(f):a.container.append(f);a.update(e,"add");a.slides=d(c.selector+":not(.clone)",a);a.setup();c.added(a)};a.removeSlide=function(b){var e=isNaN(b)?a.slides.index(d(b)):b;a.count-=1;a.last=a.count-1;isNaN(b)?d(b,a.slides).remove():l&&m?a.slides.eq(a.last).remove():
 a.slides.eq(b).remove();a.doMath();a.update(e,"remove");a.slides=d(c.selector+":not(.clone)",a);a.setup();c.removed(a)};f.init()};d.flexslider.defaults={namespace:"flex-",selector:".slides > li",animation:"fade",easing:"swing",direction:"horizontal",reverse:!1,animationLoop:!0,smoothHeight:!1,startAt:0,slideshow:!0,slideshowSpeed:7E3,animationSpeed:600,initDelay:0,randomize:!1,pauseOnAction:!0,pauseOnHover:!1,useCSS:!0,touch:!0,video:!1,controlNav:!0,directionNav:!0,prevText:"Previous",nextText:"Next",
 keyboard:!0,multipleKeyboard:!1,mousewheel:!1,pausePlay:!1,pauseText:"Pause",playText:"Play",controlsContainer:"",manualControls:"",sync:"",asNavFor:"",itemWidth:0,itemMargin:0,minItems:0,maxItems:0,move:0,start:function(){},before:function(){},after:function(){},end:function(){},added:function(){},removed:function(){}};d.fn.flexslider=function(i){void 0===i&&(i={});if("object"===typeof i)return this.each(function(){var a=d(this),c=a.find(i.selector?i.selector:".slides > li");1===c.length?(c.fadeIn(400),
 i.start&&i.start(a)):void 0==a.data("flexslider")&&new d.flexslider(this,i)});var k=d(this).data("flexslider");switch(i){case "play":k.play();break;case "pause":k.pause();break;case "next":k.flexAnimate(k.getTarget("next"),!0);break;case "prev":case "previous":k.flexAnimate(k.getTarget("prev"),!0);break;default:"number"===typeof i&&k.flexAnimate(i,!0)}}})(jQuery);



window.jQuery || document.write('<script src="js/libs/jquery-1.7.min.js">\x3C/script>')


    $(function(){
      SyntaxHighlighter.all();
    });
    $(window).load(function(){
      $('.flexslider').flexslider({
        animation: "slide",
        animationLoop: false,
        itemWidth: 210,
        itemMargin: 5,
        minItems: 2,
        maxItems: 4,
        start: function(slider){
          $('body').removeClass('loading');
        }
      });
    });
  









window.jQuery || document.write('<script src="js/libs/jquery-1.7.min.js">\x3C/script>')


    $(function(){
      SyntaxHighlighter.all();
    });
    $(window).load(function(){
      $('.flexslider').flexslider({
        animation: "slide",
        animationLoop: false,
        itemWidth: 210,
        itemMargin: 5,
        start: function(slider){
          $('body').removeClass('loading');
        }
      });
    });
  









window.jQuery || document.write('<script src="js/libs/jquery-1.7.min.js">\x3C/script>')


    $(function(){
      SyntaxHighlighter.all();
    });
    $(window).load(function(){
      $('#carousel').flexslider({
        animation: "slide",
        controlNav: false,
        animationLoop: false,
        slideshow: false,
        itemWidth: 210,
        itemMargin: 5,
        asNavFor: '#slider'
      });
      
      $('#slider').flexslider({
        animation: "slide",
        controlNav: false,
        animationLoop: false,
        slideshow: false,
        sync: "#carousel",
        start: function(slider){
          $('body').removeClass('loading');
        }
      });
    });
  









window.jQuery || document.write('<script src="js/libs/jquery-1.7.min.js">\x3C/script>')


    $(function(){
      SyntaxHighlighter.all();
    });
    $(window).load(function(){
      $('.flexslider').flexslider({
        animation: "slide",
        controlNav: "thumbnails",
        start: function(slider){
          $('body').removeClass('loading');
        }
      });
    });
  









window.jQuery || document.write('<script src="js/libs/jquery-1.7.min.js">\x3C/script>')


    $(function(){
      SyntaxHighlighter.all();
    });
    $(window).load(function(){
      $('.flexslider').flexslider({
        animation: "slide",
        start: function(slider){
          $('body').removeClass('loading');
        }
      });
    });
  









window.jQuery || document.write('<script src="js/libs/jquery-1.7.min.js">\x3C/script>')


    $(function(){
      SyntaxHighlighter.all();
    });
    $(window).load(function(){  
      
      // Vimeo API nonsense
      var player = document.getElementById('player_1');
      $f(player).addEvent('ready', ready);
      
      function addEvent(element, eventName, callback) {
        (element.addEventListener) ? element.addEventListener(eventName, callback, false) : element.attachEvent(eventName, callback, false);
      }
      
      function ready(player_id) {
        var froogaloop = $f(player_id);
      
        froogaloop.addEvent('play', function(data) {
          $('.flexslider').flexslider("pause");
        });
        
        froogaloop.addEvent('pause', function(data) {
          $('.flexslider').flexslider("play");
        });
      }
    
      
      // Call fitVid before FlexSlider initializes, so the proper initial height can be retrieved.
      $(".flexslider")
        .fitVids()
        .flexslider({
          animation: "slide",
          useCSS: false,
          animationLoop: false,
          smoothHeight: true,
          start: function(slider){
            $('body').removeClass('loading');
          },
          before: function(slider){
            $f(player).api('pause');
          }
      });
    });
  










$(function(){
  var toggles = $('.toggle a'),
      codes = $('.code');
  
  toggles.on("click", function(event){
    event.preventDefault();
    var $this = $(this);
    
    if (!$this.hasClass("active")) {
      toggles.removeClass("active");
      $this.addClass("active");
      codes.hide().filter(this.hash).show();
    }
  });
  toggles.first().click();
});

var Froogaloop=function(){function e(c){return new e.fn.init(c)}function g(c,b,a){if(!a.contentWindow.postMessage)return!1;var d=a.getAttribute("src").split("?")[0],c=JSON.stringify({method:c,value:b});a.contentWindow.postMessage(c,d)}function i(c){var b,a;try{b=JSON.parse(c.data),a=b.event||b.method}catch(l){}"ready"==a&&!h&&(h=!0);if(c.origin!=j)return!1;var c=b.value,e=b.data,f=""===f?null:b.player_id;b=f?d[f][a]:d[a];a=[];if(!b)return!1;void 0!==c&&a.push(c);e&&a.push(e);f&&a.push(f);return 0<
a.length?b.apply(null,a):b.call()}function k(c,b,a){a?(d[a]||(d[a]={}),d[a][c]=b):d[c]=b}var d={},h=!1,j="";e.fn=e.prototype={element:null,init:function(c){"string"===typeof c&&(c=document.getElementById(c));this.element=c;for(var c=this.element.getAttribute("src").split("/"),b="",a=0,d=c.length;a<d;a++){if(3>a)b+=c[a];else break;2>a&&(b+="/")}j=b;return this},api:function(c,b){if(!this.element||!c)return!1;var a=this.element,d=""!==a.id?a.id:null,e=!b||!b.constructor||!b.call||!b.apply?b:null,f=
b&&b.constructor&&b.call&&b.apply?b:null;f&&k(c,f,d);g(c,e,a);return this},addEvent:function(c,b){if(!this.element)return!1;var a=this.element,d=""!==a.id?a.id:null;k(c,b,d);"ready"!=c?g("addEventListener",c,a):"ready"==c&&h&&b.call(null,d);return this},removeEvent:function(c){if(!this.element)return!1;var b=this.element,a;a:{if((a=""!==b.id?b.id:null)&&d[a]){if(!d[a][c]){a=!1;break a}d[a][c]=null}else{if(!d[c]){a=!1;break a}d[c]=null}a=!0}"ready"!=c&&a&&g("removeEventListener",c,b)}};e.fn.init.prototype=
e.fn;window.addEventListener?window.addEventListener("message",i,!1):window.attachEvent("onmessage",i,!1);return window.Froogaloop=window.$f=e}();

/* Modernizr 2.0.6 (Custom Build) | MIT & BSD */
;window.Modernizr=function(a,b,c){function D(a,b){var c=a.charAt(0).toUpperCase()+a.substr(1),d=(a+" "+o.join(c+" ")+c).split(" ");return C(d,b)}function C(a,b){for(var d in a)if(k[a[d]]!==c)return b=="pfx"?a[d]:!0;return!1}function B(a,b){return!!~(""+a).indexOf(b)}function A(a,b){return typeof a===b}function z(a,b){return y(n.join(a+";")+(b||""))}function y(a){k.cssText=a}var d="2.0.6",e={},f=!0,g=b.documentElement,h=b.head||b.getElementsByTagName("head")[0],i="modernizr",j=b.createElement(i),k=j.style,l,m=Object.prototype.toString,n=" -webkit- -moz- -o- -ms- -khtml- ".split(" "),o="Webkit Moz O ms Khtml".split(" "),p={},q={},r={},s=[],t=function(a,c,d,e){var f,h,j,k=b.createElement("div");if(parseInt(d,10))while(d--)j=b.createElement("div"),j.id=e?e[d]:i+(d+1),k.appendChild(j);f=["&shy;","<style>",a,"</style>"].join(""),k.id=i,k.innerHTML+=f,g.appendChild(k),h=c(k,a),k.parentNode.removeChild(k);return!!h},u=function(b){if(a.matchMedia)return matchMedia(b).matches;var c;t("@media "+b+" { #"+i+" { position: absolute; } }",function(b){c=(a.getComputedStyle?getComputedStyle(b,null):b.currentStyle).position=="absolute"});return c},v,w={}.hasOwnProperty,x;!A(w,c)&&!A(w.call,c)?x=function(a,b){return w.call(a,b)}:x=function(a,b){return b in a&&A(a.constructor.prototype[b],c)},p.rgba=function(){y("background-color:rgba(150,255,150,.5)");return B(k.backgroundColor,"rgba")},p.boxshadow=function(){return D("boxShadow")},p.csstransitions=function(){return D("transitionProperty")};for(var E in p)x(p,E)&&(v=E.toLowerCase(),e[v]=p[E](),s.push((e[v]?"":"no-")+v));e.addTest=function(a,b){if(typeof a=="object")for(var d in a)x(a,d)&&e.addTest(d,a[d]);else{a=a.toLowerCase();if(e[a]!==c)return;b=typeof b=="boolean"?b:!!b(),g.className+=" "+(b?"":"no-")+a,e[a]=b}return e},y(""),j=l=null,a.attachEvent&&function(){var a=b.createElement("div");a.innerHTML="<elem></elem>";return a.childNodes.length!==1}()&&function(a,b){function s(a){var b=-1;while(++b<g)a.createElement(f[b])}a.iepp=a.iepp||{};var d=a.iepp,e=d.html5elements||"abbr|article|aside|audio|canvas|datalist|details|figcaption|figure|footer|header|hgroup|mark|meter|nav|output|progress|section|summary|time|video",f=e.split("|"),g=f.length,h=new RegExp("(^|\\s)("+e+")","gi"),i=new RegExp("<(/*)("+e+")","gi"),j=/^\s*[\{\}]\s*$/,k=new RegExp("(^|[^\\n]*?\\s)("+e+")([^\\n]*)({[\\n\\w\\W]*?})","gi"),l=b.createDocumentFragment(),m=b.documentElement,n=m.firstChild,o=b.createElement("body"),p=b.createElement("style"),q=/print|all/,r;d.getCSS=function(a,b){if(a+""===c)return"";var e=-1,f=a.length,g,h=[];while(++e<f){g=a[e];if(g.disabled)continue;b=g.media||b,q.test(b)&&h.push(d.getCSS(g.imports,b),g.cssText),b="all"}return h.join("")},d.parseCSS=function(a){var b=[],c;while((c=k.exec(a))!=null)b.push(((j.exec(c[1])?"\n":c[1])+c[2]+c[3]).replace(h,"$1.iepp_$2")+c[4]);return b.join("\n")},d.writeHTML=function(){var a=-1;r=r||b.body;while(++a<g){var c=b.getElementsByTagName(f[a]),d=c.length,e=-1;while(++e<d)c[e].className.indexOf("iepp_")<0&&(c[e].className+=" iepp_"+f[a])}l.appendChild(r),m.appendChild(o),o.className=r.className,o.id=r.id,o.innerHTML=r.innerHTML.replace(i,"<$1font")},d._beforePrint=function(){p.styleSheet.cssText=d.parseCSS(d.getCSS(b.styleSheets,"all")),d.writeHTML()},d.restoreHTML=function(){o.innerHTML="",m.removeChild(o),m.appendChild(r)},d._afterPrint=function(){d.restoreHTML(),p.styleSheet.cssText=""},s(b),s(l);d.disablePP||(n.insertBefore(p,n.firstChild),p.media="print",p.className="iepp-printshim",a.attachEvent("onbeforeprint",d._beforePrint),a.attachEvent("onafterprint",d._afterPrint))}(a,b),e._version=d,e._prefixes=n,e._domPrefixes=o,e.mq=u,e.testProp=function(a){return C([a])},e.testAllProps=D,e.testStyles=t,g.className=g.className.replace(/\bno-js\b/,"")+(f?" js "+s.join(" "):"");return e}(this,this.document),function(a,b){function u(){r(!0)}a.respond={},respond.update=function(){},respond.mediaQueriesSupported=b;if(!b){var c=a.document,d=c.documentElement,e=[],f=[],g=[],h={},i=30,j=c.getElementsByTagName("head")[0]||d,k=j.getElementsByTagName("link"),l=[],m=function(){var b=k,c=b.length,d=0,e,f,g,i;for(;d<c;d++)e=b[d],f=e.href,g=e.media,i=e.rel&&e.rel.toLowerCase()==="stylesheet",!!f&&i&&!h[f]&&(!/^([a-zA-Z]+?:(\/\/)?(www\.)?)/.test(f)||f.replace(RegExp.$1,"").split("/")[0]===a.location.host?l.push({href:f,media:g}):h[f]=!0);n()},n=function(){if(l.length){var a=l.shift();s(a.href,function(b){o(b,a.href,a.media),h[a.href]=!0,n()})}},o=function(a,b,c){var d=a.match(/@media[^\{]+\{([^\{\}]+\{[^\}\{]+\})+/gi),g=d&&d.length||0,b=b.substring(0,b.lastIndexOf("/")),h=function(a){return a.replace(/(url\()['"]?([^\/\)'"][^:\)'"]+)['"]?(\))/g,"$1"+b+"$2$3")},i=!g&&c,j=0,k,l,m,n,o;b.length&&(b+="/"),i&&(g=1);for(;j<g;j++){k=0,i?(l=c,f.push(h(a))):(l=d[j].match(/@media ([^\{]+)\{([\S\s]+?)$/)&&RegExp.$1,f.push(RegExp.$2&&h(RegExp.$2))),n=l.split(","),o=n.length;for(;k<o;k++)m=n[k],e.push({media:m.match(/(only\s+)?([a-zA-Z]+)(\sand)?/)&&RegExp.$2,rules:f.length-1,minw:m.match(/\(min\-width:[\s]*([\s]*[0-9]+)px[\s]*\)/)&&parseFloat(RegExp.$1),maxw:m.match(/\(max\-width:[\s]*([\s]*[0-9]+)px[\s]*\)/)&&parseFloat(RegExp.$1)})}r()},p,q,r=function(a){var b="clientWidth",h=d[b],l=c.compatMode==="CSS1Compat"&&h||c.body[b]||h,m={},n=c.createDocumentFragment(),o=k[k.length-1],s=(new Date).getTime();if(a&&p&&s-p<i)clearTimeout(q),q=setTimeout(r,i);else{p=s;for(var t in e){var u=e[t];if(!u.minw&&!u.maxw||(!u.minw||u.minw&&l>=u.minw)&&(!u.maxw||u.maxw&&l<=u.maxw))m[u.media]||(m[u.media]=[]),m[u.media].push(f[u.rules])}for(var t in g)g[t]&&g[t].parentNode===j&&j.removeChild(g[t]);for(var t in m){var v=c.createElement("style"),w=m[t].join("\n");v.type="text/css",v.media=t,v.styleSheet?v.styleSheet.cssText=w:v.appendChild(c.createTextNode(w)),n.appendChild(v),g.push(v)}j.insertBefore(n,o.nextSibling)}},s=function(a,b){var c=t();if(!!c){c.open("GET",a,!0),c.onreadystatechange=function(){c.readyState==4&&(c.status==200||c.status==304)&&b(c.responseText)};if(c.readyState==4)return;c.send()}},t=function(){var a=!1,b=[function(){return new ActiveXObject("Microsoft.XMLHTTP")},function(){return new XMLHttpRequest}],c=b.length;while(c--){try{a=b[c]()}catch(d){continue}break}return function(){return a}}();m(),respond.update=m,a.addEventListener?a.addEventListener("resize",u,!1):a.attachEvent&&a.attachEvent("onresize",u)}}(this,Modernizr.mq("only all")),function(a,b,c){function k(a){return!a||a=="loaded"||a=="complete"}function j(){var a=1,b=-1;while(p.length- ++b)if(p[b].s&&!(a=p[b].r))break;a&&g()}function i(a){var c=b.createElement("script"),d;c.src=a.s,c.onreadystatechange=c.onload=function(){!d&&k(c.readyState)&&(d=1,j(),c.onload=c.onreadystatechange=null)},m(function(){d||(d=1,j())},H.errorTimeout),a.e?c.onload():n.parentNode.insertBefore(c,n)}function h(a){var c=b.createElement("link"),d;c.href=a.s,c.rel="stylesheet",c.type="text/css";if(!a.e&&(w||r)){var e=function(a){m(function(){if(!d)try{a.sheet.cssRules.length?(d=1,j()):e(a)}catch(b){b.code==1e3||b.message=="security"||b.message=="denied"?(d=1,m(function(){j()},0)):e(a)}},0)};e(c)}else c.onload=function(){d||(d=1,m(function(){j()},0))},a.e&&c.onload();m(function(){d||(d=1,j())},H.errorTimeout),!a.e&&n.parentNode.insertBefore(c,n)}function g(){var a=p.shift();q=1,a?a.t?m(function(){a.t=="c"?h(a):i(a)},0):(a(),j()):q=0}function f(a,c,d,e,f,h){function i(){!o&&k(l.readyState)&&(r.r=o=1,!q&&j(),l.onload=l.onreadystatechange=null,m(function(){u.removeChild(l)},0))}var l=b.createElement(a),o=0,r={t:d,s:c,e:h};l.src=l.data=c,!s&&(l.style.display="none"),l.width=l.height="0",a!="object"&&(l.type=d),l.onload=l.onreadystatechange=i,a=="img"?l.onerror=i:a=="script"&&(l.onerror=function(){r.e=r.r=1,g()}),p.splice(e,0,r),u.insertBefore(l,s?null:n),m(function(){o||(u.removeChild(l),r.r=r.e=o=1,j())},H.errorTimeout)}function e(a,b,c){var d=b=="c"?z:y;q=0,b=b||"j",C(a)?f(d,a,b,this.i++,l,c):(p.splice(this.i++,0,a),p.length==1&&g());return this}function d(){var a=H;a.loader={load:e,i:0};return a}var l=b.documentElement,m=a.setTimeout,n=b.getElementsByTagName("script")[0],o={}.toString,p=[],q=0,r="MozAppearance"in l.style,s=r&&!!b.createRange().compareNode,t=r&&!s,u=s?l:n.parentNode,v=a.opera&&o.call(a.opera)=="[object Opera]",w="webkitAppearance"in l.style,x=w&&"async"in b.createElement("script"),y=r?"object":v||x?"img":"script",z=w?"img":y,A=Array.isArray||function(a){return o.call(a)=="[object Array]"},B=function(a){return Object(a)===a},C=function(a){return typeof a=="string"},D=function(a){return o.call(a)=="[object Function]"},E=[],F={},G,H;H=function(a){function f(a){var b=a.split("!"),c=E.length,d=b.pop(),e=b.length,f={url:d,origUrl:d,prefixes:b},g,h;for(h=0;h<e;h++)g=F[b[h]],g&&(f=g(f));for(h=0;h<c;h++)f=E[h](f);return f}function e(a,b,e,g,h){var i=f(a),j=i.autoCallback;if(!i.bypass){b&&(b=D(b)?b:b[a]||b[g]||b[a.split("/").pop().split("?")[0]]);if(i.instead)return i.instead(a,b,e,g,h);e.load(i.url,i.forceCSS||!i.forceJS&&/css$/.test(i.url)?"c":c,i.noexec),(D(b)||D(j))&&e.load(function(){d(),b&&b(i.origUrl,h,g),j&&j(i.origUrl,h,g)})}}function b(a,b){function c(a){if(C(a))e(a,h,b,0,d);else if(B(a))for(i in a)a.hasOwnProperty(i)&&e(a[i],h,b,i,d)}var d=!!a.test,f=d?a.yep:a.nope,g=a.load||a.both,h=a.callback,i;c(f),c(g),a.complete&&b.load(a.complete)}var g,h,i=this.yepnope.loader;if(C(a))e(a,0,i,0);else if(A(a))for(g=0;g<a.length;g++)h=a[g],C(h)?e(h,0,i,0):A(h)?H(h):B(h)&&b(h,i);else B(a)&&b(a,i)},H.addPrefix=function(a,b){F[a]=b},H.addFilter=function(a){E.push(a)},H.errorTimeout=1e4,b.readyState==null&&b.addEventListener&&(b.readyState="loading",b.addEventListener("DOMContentLoaded",G=function(){b.removeEventListener("DOMContentLoaded",G,0),b.readyState="complete"},0)),a.yepnope=d()}(this,this.document),Modernizr.load=function(){yepnope.apply(window,[].slice.call(arguments,0))};
