



    ga_storage._setAccount('UA-1864002-7'); //Replace with your own
    ga_storage._setDomain('none');
    ga_storage._trackPageview('/help.html');
    










    ga_storage._setAccount('UA-1864002-7'); //Replace with your own
    ga_storage._setDomain('none');
    ga_storage._trackPageview('/color.html');
    















    ga_storage._setAccount('UA-1864002-7'); //Replace with your own
    ga_storage._setDomain('none');
    ga_storage._trackPageview('/select.html');
    











    ga_storage._setAccount('UA-1864002-7'); //Replace with your own
    ga_storage._setDomain('none');
    ga_storage._trackPageview('/index.html');
    






// JavaScript Document

var page;

// 着物名表示切り替えパネルオブジェクト関数
var titlePanel = function(param){
	if (!param) param = {};
	var _id = '#titleView';
	var _wrapperName = _id + ' .titleWrapper';
	$wrapper = null;
	var _images = param.images || [];	// 着物名画像配列
	var _len = 0;
	var _width = param.width || 768;
	var _height = param.height || 240;
	var _currentIndex = param.startIndex || 0;	// 今選ばれている着物のインデックス

	var that = {};	// この関数（titlePanel()）が返すtitlePanelオブジェクト
	
	// 初期化関数
	var init = function(){
		$wrapper = $(_wrapperName);
		_len = _images.length;
		for (var i=0; i<_len; i++){
			var $d = $('<div class="imgDiv"><img src="' + _images[i] + '" alt="" width="100%" /></div>');
			$d.css({opacity: 0});
			$wrapper.append($d);
		}
		$wrapper.find('div:nth-child(' + (_currentIndex + 1).toString() + ')').animate({opacity: 1}, 'normal');
	};
	that.init = init;
	
	// 選択されている着物の変更通知を受け取る関数
	// 一旦、全ての画像を非表示（透明）にしてから、選択された着物のタイトルを表示する
	var selChanged = function(newIndex){
		_currentIndex = newIndex;
		$wrapper.find('div.imgDiv').stop().css({opacity: 0});
		$wrapper.find('div:nth-child(' + (_currentIndex + 1).toString() + ')').animate({opacity: 1}, 'slow');
	};
	that.selChanged = selChanged;
	
	return that;
};

// 着物選択ページコントロールオブジェクト関数 extends kyozomePage()
var selectPage = function(my){
	var _kimonoId = 0;	// 初期選択着物ID
	var _coverflow = null;	//カバーフローオブジェクト
	var _title = null;	//タイトルパネルオブジェクト
	var _kimonoImages = [];	//着物画像配列
	var _titleImages = [];	//着物名画像配列
	var _nscale = 1;
	var _height = 1024;
	my = my || {};
	var that = kyozomePage(my);	//この関数（selectPage()）が返すオブジェクト

	
	// 先読みしておく画像リスト配列を取得
	var _getPreLoadImages = function() {
		var imgs = [];
		for (var i=0; i<kimono.length; i++){
			imgs.push(KIMONO_PATH + kimono[i].title);
			//imgs.push(KIMONO_PATH + kimono[i].image);
			imgs.push(KIMONO_PATH + kimono[i].cover);
		}
		return imgs;
	};
	
	
	// クリックイベント登録
	var _registerEvents = function(){
		//戻るボタン
		$("#tabBar .btnReturn").bind('click', function(){
			//location.href = "index.html";
			//history.back();
			navigator.app.backHistory();
		});
		//使い方ボタン
		$("#tabBar .btnHelp").bind('click', function(){
			my.sm.setKimonoId(_coverflow.getCurrentIndex());
			location.href = "help.html";
		});
	};
	
	var _setHeight = function(nscale,height){
		// タブバー:1, タイトル:4, カバーフロー:11
		$("#tabBar").css("height", (1*nscale) + "px");
		var pHeight = $("#tabBar").height() - 8;
		$("#tabBar p").css({"height": pHeight + "px", "font-size": Math.round(pHeight*0.4) + "px", "line-height": pHeight + "px"});
		$("#tabBar span").css({"height": (1*nscale) + "px", "font-size": Math.round(pHeight*0.6) + "px", "line-height": (1*nscale) + "px", "left":"50%", "top":0});
		var sWidth = Math.round($("#tabBar span").width()/2);
		$("#tabBar span").css({"left":($("#tabBar span").position().left - sWidth) + "px"});
		$("#titleView").css("height", (4*nscale) + "px");
		$("#selectView").css("height", (11*nscale) + "px");
		var labelHeight = 3*nscale;
		$("#selectView .label").css({"height":labelHeight + "px", "font-size": Math.round(labelHeight*0.15) + "px", "line-height": labelHeight + "px"});
		//端末解像度ごとの調整用マージン
		var exMargin = height - 16*nscale;
		if(exMargin>0){
			$("#selectView").css("height", ($("#selectView").height() + exMargin) + "px");
			$("#selectView .label").css("margin-bottom", Math.floor(exMargin*0.5) + "px");
		}
	};
	
	//以下publicメソッド
	//色替えページオブジェクト初期化
	var init = function(page){
		my.resize();
		_kimonoId = my.sm.getKimonoId();
		_nscale = my.sm.getNScale();
		_height = my.sm.getHeight();
		_setHeight(_nscale, _height);
		//最初に必要な画像をロードしておく（canvasで描画するため)
		my._preloadimages(_getPreLoadImages()).done(function(){
			for (var i=0; i<kimono.length; i++){
				//_kimonoImages.push(KIMONO_PATH + kimono[i].image);
				_kimonoImages.push(KIMONO_PATH + kimono[i].cover);
				_titleImages.push(KIMONO_PATH + kimono[i].title);
			}
			
			//カバーフローオブジェクトの生成・初期化
			_coverflow = coverFlow({
				images: _kimonoImages,
				width: Math.round(6*_nscale),
				height: Math.round(9*_nscale),
				margin: Math.round(0),
				wrapperWidth: $("#selectView").width(),
				wrapperHeight: $("#selectView").height(),
				startIndex: _kimonoId
			});
			_coverflow.init(page);
			
			//タイトルパネルオブジェクトの生成・初期化
			_title = titlePanel({
				images: _titleImages,
				startIndex: _kimonoId
			});
			_title.init();
			
			// ボタンクリックイベント登録
			_registerEvents();
			
			// Loading画像消す
			$("#loading").css("display", "none");
			
		});
	};
	that.init = init;
	
	// カバーフローオブジェクトから、選択着物の変更通知を受け取る
	// タイトルパネルに知らせる
	var selChanged = function(){
		_title.selChanged(_coverflow.getCurrentIndex());
	};
	that.selChanged = selChanged;
		
	return that;
};

document.addEventListener('DOMContentLoaded', function(){
	if (typeof device === 'undefined'){
		document.addEventListener("deviceready", onDeviceReady, false);
	} else {
		onDeviceReady();
	}
});

function onDeviceReady(){
	document.addEventListener("backbutton", function(e){
	    e.preventDefault();
	    navigator.app.backHistory();
	}, true);
	page = selectPage();
	page.init(page);
}

//onDeviceReady();

var kimono = [
			  {"name":"振袖　富貴吉祥　宝尽し","title":"img_itemtitle_00.png","image":"img_itemimage_00.png","cover":"img_coverimage_00.png","color":"rgb(0, 0, 0)","shadow":"img_baseshadow_hurisode.png","mask":"img_basemask_hurisode.png","pattern":["img_itempattern_00_00.png"],"magnifyParam":{"left":0.5,"top":0.5,"width":0.55,"height":0.55}},
			  {"name":"振袖　篭目に四季折枝　貝桶文様","title":"img_itemtitle_01.png","image":"img_itemimage_01.png","cover":"img_coverimage_01.png","color":"rgb(249, 248, 243)","shadow":"img_baseshadow_hurisode.png","mask":"img_basemask_hurisode.png","pattern":["img_itempattern_01_00.png"],"magnifyParam":{"left":0.5,"top":0.5,"width":0.55,"height":0.55}},
			  {"name":"振袖　のしに御所車","title":"img_itemtitle_02.png","image":"img_itemimage_02.png","cover":"img_coverimage_02.png","color":"rgb(255, 0, 0)","shadow":"img_baseshadow_hurisode.png","mask":"img_basemask_hurisode.png","pattern":["img_itempattern_02_00.png","img_itempattern_02_01.png","img_itempattern_02_02.png","img_itempattern_02_03.png","img_itempattern_02_04.png","img_itempattern_02_05.png"],"magnifyParam":{"left":0.5,"top":0.5,"width":0.55,"height":0.55}},
			  {"name":"留袖　古鏡","title":"img_itemtitle_03.png","image":"img_itemimage_03.png","cover":"img_coverimage_03.png","color":"rgb(0, 0, 0)","shadow":"img_baseshadow_tome.png","mask":"img_basemask_tome.png","pattern":["img_itempattern_03_00.png"],"magnifyParam":{"left":0.5,"top":0.5,"width":0.55,"height":0.55}},
			  {"name":"留袖　香ノ図宝づくし","title":"img_itemtitle_04.png","image":"img_itemimage_04.png","cover":"img_coverimage_04.png","color":"rgb(77, 64, 64)","shadow":"img_baseshadow_tome.png","mask":"img_basemask_tome.png","pattern":["img_itempattern_04_00.png","img_itempattern_04_01.png","img_itempattern_04_02.png","img_itempattern_04_03.png","img_itempattern_04_04.png","img_itempattern_04_05.png"],"magnifyParam":{"left":0.5,"top":0.5,"width":0.55,"height":0.55}},
			  {"name":"訪問着　遠山に四季の折枝","title":"img_itemtitle_05.png","image":"img_itemimage_05.png","cover":"img_coverimage_05.png","color":"rgb(255, 227, 181)","shadow":"img_baseshadow_houmon.png","mask":"img_basemask_houmon.png","pattern":["img_itempattern_05_00.png"],"magnifyParam":{"left":0.5,"top":0.5,"width":0.55,"height":0.55}},
			  {"name":"訪問着　琳派菊に流れ草花","title":"img_itemtitle_06.png","image":"img_itemimage_06.png","cover":"img_coverimage_06.png","color":"rgb(242, 242, 242)","shadow":"img_baseshadow_houmon.png","mask":"img_basemask_houmon.png","pattern":["img_itempattern_06_00.png"],"magnifyParam":{"left":0.5,"top":0.5,"width":0.55,"height":0.55}},
			  {"name":"訪問着　更紗調唐草文様","title":"img_itemtitle_07.png","image":"img_itemimage_07.png","cover":"img_coverimage_07.png","color":"rgb(214, 199, 199)","shadow":"img_baseshadow_houmon.png","mask":"img_basemask_houmon.png","pattern":["img_itempattern_07_00.png"],"magnifyParam":{"left":0.5,"top":0.5,"width":0.55,"height":0.55}},
			  {"name":"モダン地割れ草花","title":"img_itemtitle_08.png","image":"img_itemimage_08.png","cover":"img_coverimage_08.png","color":"rgb(255, 235, 181)","shadow":"img_baseshadow_houmon.png","mask":"img_basemask_houmon.png","pattern":["img_itempattern_08_00.png"],"magnifyParam":{"left":0.5,"top":0.5,"width":0.55,"height":0.55}},
			  {"name":"小紋　枝桜","title":"img_itemtitle_09.png","image":"img_itemimage_09.png","cover":"img_coverimage_09.png","color":"rgb(0, 0, 0)","shadow":"img_baseshadow_komon.png","mask":"img_basemask_komon.png","pattern":["img_itempattern_09_00.png"],"magnifyParam":{"left":0.5,"top":0.5,"width":0.55,"height":0.55}},
			  {"name":"染帯　飛石草花文型絵","title":"img_itemtitle_10.png","image":"img_itemimage_10.png","cover":"img_coverimage_10.png","color":"rgb(38, 51, 77)","shadow":"img_baseshadow_obi.png","mask":"img_basemask_obi.png","pattern":["img_itempattern_10_00.png"],"magnifyParam":{"left":0.5,"top":0.5,"width":0.55,"height":0.55}}
			  ];

// JavaScript Document

// 柄選択オブジェクト関数
var patternChanger = function(param){
	if(!param) param = {};
	var _page = null;	//コントローラオブジェクト（colorPage）
	var _patterns = param.pattern || [];	//柄画像名配列
	var _current = 0;	//現在の柄画像配列のインデックス
	var _color = param.color || 'rgb(255, 255, 255)';	//下地色
	var _id = "#patternSelectView";
	var _wrapperName = "#patternSelectView .selectItemsWrapper";	//柄選択DIVラッパークラス名
	var _listName = "#patternSelectView .selectItemsWrapper .selectItems";	//柄選択リストDIVクラス名
	var _leftBtnName = "#patternSelectView .btn_left .btn_image";	//←ボタンクラス名
	var _rightBtnName = "#patternSelectView .btn_right .btn_image";	//→ボタンクラス名
	var _sliderName = "#patternSelectView .patternSlider";	//スライダーDIVクラス名
	var _sliderHandleName = ".slider-handle";	//スライダーハンドルクラス名（スライダーDIVのチャイルド要素）
	var $wrapper;	//柄選択DIVのjqueryオブジェクト
	var $list;	//柄選択リストDIVのjqueryオブジェクト
	var $btnLeft;	//←ボタンのjqueryオブジェクト
	var $btnRight;	//→ボタンのjqueryオブジェクト
	var _width = param.width || 1200;	//柄選択リストDIVの幅（アイテムが全部入る幅）
	var _height = param.height || 150;	//柄選択リストDIVの高さ
	var _length = 6;	//柄画像配列の長さ
	var _band = param.band || 4;	// 1度に表示するアイテム数
	var _currentLeft = 0; // 今一番左に表示されてるアイテムのインデックス
	var _itemWidth = param.width || 150;	//柄画像一個の幅（ボーダー含む）
	var _margin = param.margin || 20;	//画像間のマージン
	var _isSlide = true;	//スライドするかフラグ
	var _slider = null;	//commonStepSliderオブジェクト
	var _nscale = param.nscale || 24;
	
	var that = {};	//この関数（patternChanger()）が返すpatternChangerオブジェクト
	
	// 選択状態の更新
	var _updateCurrent = function(){
		$list.find(".current").removeClass('current');
		$list.find("div:nth-child(" + (_current+1) + ")").addClass('current');		
	};
	
	// ←・→ボタンの状態（enable・disable）を更新
	var _updateButtonState = function(){
		// スライドしない（柄が全部表示されている）なら両ボタンともdisable
		if (!_isSlide) {
			$btnLeft.addClass('disabled');
			$btnRight.addClass('disabled');
			return false;
		}
		
		// 一番左が表示されていれば←ボタンはdisable
		$btnLeft.removeClass('disabled');
		if (_currentLeft == 0){
			$btnLeft.addClass('disabled');
		}
		
		// 一番右が表示されていれば→ボタンはdisable
		$btnRight.removeClass('disabled');
		if (_currentLeft == _length - _band){
			$btnRight.addClass('disabled');
		}
	};
	
	// 現在の一番左の画像を引数（inc）分スライド
	var _incrementCurrentLeftIndex = function(inc){
		var save = _currentLeft;
		_currentLeft += inc;
		if(_currentLeft<0) _currentLeft = 0;
		if(_currentLeft>_length - _band) _currentLeft = _length - _band;
		
		if(save != _currentLeft){
			_updateButtonState();
			_slideToCurrentLeft();
			if (_slider) _slider.setCurrentPos(_currentLeft);
		}
	};
	// 現在の一番左の画像を引数（idx）のインデックスの画像にスライド
	// スライダーから呼ばれるので、スライダーには通知しない
	var _setCurrentLeftIndex = function(idx){
		var save = _currentLeft;
		_currentLeft = idx;
		if(_currentLeft<0) _currentLeft = 0;
		if(_currentLeft>_length - _band) _currentLeft = _length - _band;
		
		if(save != _currentLeft){
			_updateButtonState();
			_slideToCurrentLeft();
		}
	};
	
	// マウスドラッグに追随（DIVをドラッグ）
	var _trackChanging = function(difX){
		if(!_isSlide) return false;
		//$list.css({'left': '-=' + difX + 'px'});
		difX *= 2;
		var nextX = $list.position().left - difX;
		$list.removeClass('slideanime');
		$list.css('transform', 'translateX(' + nextX + 'px)');
	};
	
	// ドラッグ終了
	var _trackFinished = function(curX, difX, timeSpan, rollbackL) {
		if ((!_isSlide) || Math.abs(difX) < 50){	// ドラッグが一定量以下ならクリックとみなす
			// クリックなのでスライドしない（元に戻す）
			//$list.css({'left': rollbackL + 'px'});
			$list.css('transform', 'translateX(' + rollbackL + ')');
			
			//柄画像がクリックされたかチェックしクリックされたのであれば画像更新
			if(_hittest(curX)){
				// コントロールオブジェクト（colorPage）に通知
				_page.patternChanged();
				_updateCurrent();
			}
		} else { // ドラッグされた
			// フリックされたとき余分にスライドする
			difX *= 2;
			var velocity = 0;
			if (timeSpan > 0) velocity = Math.ceil(difX / timeSpan * 15);
			var dest = $list.position().left + velocity;
			
			// 画像の左端がDIVの左端にそろうように座標を正規化
			var dest_n = _normalizeL(dest);
			
			// 正規化された座標位置までスライド			
			//$list.animate({'left': dest + 'px'}, 50).animate({'left': dest_n + 'px'}, 70);
			$list.css('transform', 'translateX(' + dest_n + 'px)');
		}
	};
	
	// クリック位置がアイテム画像の上かどうかをヒットテスト
	var _hittest = function(curX){
		// クリック位置がアイテム配列の何番目に相当するか
		var pos = Math.floor(curX / (_itemWidth + _margin));
		
		// アイテム画像の左端からの座標
		var pos_x = curX % (_itemWidth + _margin);
		
		// クリック位置がアイテム配列の長さ以内であり、余白部分ではない（画像の上をクリックしている）、
		// かつ、現在選択されている画像と異なる画像が選択された場合、選択画像のインデックスを更新し、trueを返す
		if (pos >= 0 && pos < _length && pos_x <= _itemWidth && _current != pos) {
			_current = pos;
			return true;
		}
		return false;
	};
	
	// DIVリストの左端を、アイテムの左端がDIVラッパーの左端に揃うように正規化
	var _normalizeL = function(relX){
		// relXは現在の画像リストDIVのposition.left()。左（マイナス）にいくほど、表示される画像配列はプラス
		relX = -1 * relX;
		var pos = Math.floor(relX / (_itemWidth + _margin));
		
		// アイテム幅の半分以上スライドされていたら次（右）の画像を一番左に表示する
		var pos_x = relX % (_itemWidth + _margin);
		if (pos_x > (_itemWidth + _margin)/2) pos++;
		
		if (pos < 0) pos = 0;	// 左端
		if (pos > _length - _band) pos = _length - _band; // 右端
		
		//今見えている一番左の画像配列インデックスを更新し、←・→ボタンの状態も更新
		_currentLeft = pos;
		_updateButtonState();
		if (_slider) _slider.setCurrentPos(_currentLeft);
		
		//一番左の画像がDIVラッパーの左端に揃うposition().leftの値を返す
		return (_itemWidth + _margin) * pos * (-1);
	};
	
	// 現在の左位置の座標までスライド（←・→ボタンが押されたときよう）
	var _slideToCurrentLeft = function(){
		var dest = (_itemWidth + _margin) * _currentLeft * -1;
		//$list.stop().animate({'left': dest + 'px'}, 'normal');
		$list.removeClass('slideanime');
		$list.addClass('slideanime');
		$list.css('transform', 'translateX(' + dest + 'px)');
	};
	
	// スライドエリアのドラッグ・クリックイベント、←・→ボタンのクリックイベント、マウスホイールイベントを登録
	var _registerEvents = function(){
		var startX = 0;	//ドラッグ開始時のx座標
		var currentX = 0;	//ドラッグ中のx座標
		var startTime = 0;	//ドラッグ開始時刻
		var endX = 0;	//ドラッグ終了時のx座標
		var endTime = 0;	//ドラッグ終了時刻
		var left = $wrapper.offset().left;	//ラッパーDIVのdocumentに対する左x座標
		var rollBackLeft = 0; //ドラッグ開始時の画像リストDIVのposition().left
		var timerid = 0;	//setTimeoutのid
		
		// タッチパネル（スマホ）とマウスで登録するイベントが違う（内部処理はほぼ同じ）
		if(isTouch){
			$wrapper.bind('touchstart', function(ev){
				ev.preventDefault();
				clearTimeout(timerid);
				
				var pageX = event.changedTouches[0].pageX;
				startX = pageX - left;
				currentX = pageX - left;
				startTime = (new Date()).getTime();
				rollbackLeft = $list.position().left;
				$(document).bind('touchmove', _touchmove).bind('touchend', _touchend);
			});
			var _touchmove = function(ev){
				ev.stopPropagation();
				ev.preventDefault();
				clearTimeout(timerid);
				
				var pageX = event.changedTouches[0].pageX;
				var nowX = pageX - left;
				var difX = currentX - nowX;
				
				timerid = setTimeout(function(){ _trackChanging(difX); }, 5);
				currentX = nowX;
				return false;
			};
			var _touchend = function(ev){
				ev.stopPropagation();
				ev.preventDefault();
				$(document).unbind('touchend', _touchend).unbind('touchmove', _touchmove);
				clearTimeout(timerid);
				
				var pageX = event.changedTouches[0].pageX;
				endX = pageX - left;
				endTime = (new Date()).getTime();
				var relX = endX - $list.position().left;
				var difX = endX - startX;
				var span = endTime - startTime;
				timerid = setTimeout(function(){ _trackFinished(relX, difX, span, rollbackLeft); }, 10);
				return false;
			};
		} else {
			$wrapper.bind('mousedown', function(ev){
				ev.preventDefault();
				clearTimeout(timerid);
				
				startX = ev.pageX - left;
				currentX = ev.pageX - left;
				startTime = (new Date()).getTime();
				rollbackLeft = $list.position().left;
				$(document).bind('mousemove', _mousemove).bind('mouseup', _mouseup);
			});
			
			var _mousemove = function(ev){
				ev.stopPropagation();
				ev.preventDefault();
				clearTimeout(timerid);
				
				var nowX = ev.pageX - left;
				var difX = currentX - nowX;

				timerid = setTimeout(function(){ _trackChanging(difX); }, 0);
				currentX = nowX;
				return false;
			};
			var _mouseup = function(ev){
				ev.stopPropagation();
				ev.preventDefault();
				$(document).unbind('mouseup', _mouseup).unbind('mousemove', _mousemove);
				clearTimeout(timerid);
				
				endX = ev.pageX - left;
				endTime = (new Date()).getTime();
				var relX = endX - $list.position().left;
				var difX = endX - startX;
				var span = endTime - startTime;
				timerid = setTimeout(function(){ _trackFinished(relX, difX, span, rollbackLeft); }, 0);
				return false;
			};
		}
		
		if(_isSlide){
			// ←ボタンクリックイベント
			$btnLeft.bind('click', function(){
				if ($(this).hasClass('disabled')) return false;
				_incrementCurrentLeftIndex(-1);
			});
			// →ボタンクリックイベント
			$btnRight.bind('click', function(){
				if ($(this).hasClass('disabled')) return false;
				_incrementCurrentLeftIndex(1);
			});
			
			//マウスホイールイベント
			$(_id).bind('mousewheel', function(event, delta){
				if ( delta < 0){
					_incrementCurrentLeftIndex(1);
				} else {
					_incrementCurrentLeftIndex(-1);
				}
				
				return false;
			});
		}
	};
	
	// 以下publicメソッド
	// 初期化関数
	var init = function(page){
		_page = page;	//コントローラオブジェクト（colorPage）登録
		$wrapper = $(_wrapperName);
		$list = $(_listName);
		
		//幅・高さ調整
		$("#patternSelectView").css("padding-top", Math.round(0.5*_nscale) + "px");
		$("#patternSelectView .btn_image").css({width: Math.round(0.5*_nscale) + "px", margin: Math.round(0.15*_nscale) + "px" });
		var wrapperWidth = Math.ceil($("#selectView").width() - 1.8 * _nscale);
		_itemWidth = Math.round(wrapperWidth/4.6);
		_margin = Math.round(0.2*_itemWidth);
		$wrapper.css({width:  wrapperWidth + "px", height: _itemWidth + "px", "margin-top": Math.round(0.3*_nscale) + "px" });
		
		// 画像配列の長さ
		_length = _patterns.length;
		// 画像配列の長さが要素表示数以下ならスライドしない
		_isSlide = (_length <= _band)?false:true;
		
		// 画像数分のDIVを画像リストDIVにアペンド
		for (var i=0; i<_length; i++){
			var $di = $('<div class="item"><img src="' + KIMONO_PATH + "thumb_" + _patterns[i] + '" alt="" width="' + _itemWidth + '" /></div>');
			if (i!=_length-1){
				$di.css('margin-right', _margin + 'px');
			}
			$list.append($di);
			
			// 一つ目の柄をデフォルト選択
			if (i == 0) $di.addClass('current');
		}
		
		// 画像リストDIVの幅は（画像アイテムの幅×配列の長さ）＋（マージン×（配列の長さ-1））
		_width = (_itemWidth * _length) + (_margin * (_length - 1));
		$list.css("width", _width + "px");
		
		// 下地色セット
		$list.find("div.item").css("background-color", _color);
		
		// ←・→ボタン準備
		$btnLeft = $(_leftBtnName);
		$btnRight = $(_rightBtnName);
		_updateButtonState();
		
		// // commonStepSliderオブジェクト生成・初期化
		if(_isSlide){
			_slider = commonStepSlider({
				name: _sliderName,
				handleName: _sliderHandleName,
				length: _length - _band + 1,
				startIndex: 0
			});
			_slider.init(that);
		} else {
			$(_sliderName).css("display", "none");
		}
		
		// ドラッグ・クリック・マウスホイールイベント登録
		_registerEvents();
		
	};
	that.init = init;
	
	// 現在選択されている柄の画像名を返す
	var getPattern = function(){
		return _patterns[_current];
	};
	that.getPattern = getPattern;
	// 現在選択されている柄のインデックスを返す
	var getPatternIndex = function(){
		return _current;
	};
	that.getPatternIndex = getPatternIndex;
	
	// 選択されている柄画像配列のインデックスを更新
	var setPattern = function(idx){
		if (_current != idx) {
			_current = idx;
			_updateCurrent();
		}
	};
	that.setPattern = setPattern;
	
	// 下地色を設定
	var setColor = function(color){
		_color = color;
		$list.find("div.item").css("background-color", _color);
	};
	that.setColor = setColor;
	
	// 一番左の画像のインデックスをセット（スライダーから呼ばれる）
	var setCurrentIndex = function(idx){
		_setCurrentLeftIndex(idx);
	};
	that.setCurrentIndex = setCurrentIndex;
	
	return that;
};

// JavaScript Document

// 着物描画オブジェクト関数
var kimonoPainter = function(param){
	if(!param) param = {};
	var _id = 'kimonoPainter';	//DIVのID
	var _mainName = 'kimonoCanvas';	//着物部分のDIVクラス名
	var _mirrorName = 'mirrorCanvas'; //鏡像部分のDIVクラス名
	var _magnifyName = '#kimonoView .magnifyCanvas'; //拡大画像のDIVクラス名
	var _magnifyButtonName = '#kimonoView .button .icon-magnify';	//拡大ボタンのクラス名
	var _curColor = param.color || 'rgb(255, 0, 0)';	//下地色
	var _curPattern = KIMONO_PATH + param.pattern || '';	//柄画像パス
	var _curPatternIndex = param.patternIndex || 0;	//現在の柄画像のインデックス
	var _patternImages = param.patternImages || [];	//柄画像配列
	var _patternImageObjects = [];	//柄画像Imageオブジェクト配列
	/*var _curShadow = '';	//影画像パス
	if (param.shadow) {	//スマホ用の影画像は単純透過画像
		_curShadow = (isTouch) ? KIMONO_PATH + '_' + param.shadow : KIMONO_PATH + param.shadow;
	}*/
	var _curShadow = KIMONO_PATH + param.shadow;	//影画像パス
	var _shadowImage = null;	//影画像Imageオブジェクト
	var _curMask = KIMONO_PATH + param.mask || '';	//マスク画像パス
	var _maskImage = null;	//マスク画像Imageオブジェクト
	var $main = null;	//着物部分DIVのjqueryオブジェクト
	var _canvas = null; //着物canvas要素
	var _context = null; //着物canvasの2dコンテキスト
	var _width = param.width || 512;	//着物canvasの幅
	var _height = param.height || 512;	//着物canvasの高さ
	var $mirror = null;	//鏡像部分DIVのjqueryオブジェクト
	var _mirrorCanvas = null;	//鏡像canvas要素
	var _mirrorContext = null;	//鏡像canvasの2dコンテキスト
	var _mirrorWidth = param.width || 512;	//鏡像canvasの幅（着物canvasと同じ）
	var _mirrorHeight = param.height || 512;	//鏡像canvasの高さ着物canvasと同じ）
	var _shadowCache = null;	// 影画像のピクセルデータのキャッシュ
	var $magnify = null;	//拡大画像DIVのjqueryオブジェクト
	/*var _magnifyCanvas = null;	//拡大画像canvas
	var _magnifyContext = null; //拡大画像canvasの2dコンテキスト*/
	var $magnifyContainer = null;	//下記拡大画像レイヤーのコンテナ
	var $magnifyColor = null;	//拡大下地レイヤー
	var $magnifyPattern = null;	//拡大パターンレイヤー
	var $magnifyShadow = null;	//拡大影レイヤー
	var $magnifyMask = null;	//拡大マスクレイヤー
	var _magnifyWidth = 1000;
	var _magnifyHeight = 1000;
	var $magnifyButton = null;	//拡大ボタンspanのjqueryオブジェクト
	var _magnifyLeft = 0;//拡大コンテナのposition().leftの最大値
	var _magnifyRight = 0;//拡大コンテナのposition().leftの最小値
	var _magnifyTop = 0;//拡大コンテナのposition().topの最大値
	var _magnifyBottom = 0;//拡大コンテナのposition().bottomの最小値
	var _magnifyParam = param.magnifyParam || {"left":0.5,"top":0.5,"width":0.55,"height":0.55};//拡大画像パラメータ
	
	var that = {}; // この関数（kimonoPainter()）で返すkimonoPainterオブジェクト
	
	// 影画像のピクセルデータをキャッシュ
	var _cacheShadowImage = function() {
		if ( ! _canvas || ! _context ) return;
		
		var imgShadow = new Image();
		imgShadow.src = _curShadow;
		_context.drawImage(imgShadow, 0,0, _width,_height);
		_shadowCache = _context.getImageData(0,0, _width,_height).data;
	};
	// 影画像を乗算ブレンド
	var _paintShadowBlend = function(){
		var sRA, sGA, sBA, dRA, dGA, dBA, dA;
		
		var srcImage = _context.getImageData(0, 0, _width, _height);
		var src = srcImage.data;
		
		var ptr = 0;
		var len = _width*_height*4;
		for (var ptr=0;ptr<len;ptr+=4){				
			
			sRA = src[ptr+0]/255;
			dRA = _shadowCache[ptr+0]/255;
			sGA = src[ptr+1]/255;
			dGA = _shadowCache[ptr+1]/255;
			sBA = src[ptr+2]/255;
			dBA = _shadowCache[ptr+2]/255;
			dA  = _shadowCache[ptr+3]/255;			
			
			src[ptr+0] = (dA===0)?sRA*255:(sRA*dRA) * 255;
			src[ptr+1] = (dA===0)?sGA*255:(sGA*dGA) * 255;
			src[ptr+2] = (dA===0)?sBA*255:(sBA*dBA) * 255;
			src[ptr+3] = 255;

		}
		srcImage.data= src;
		_context.putImageData(srcImage, 0, 0);
	};
	// 影画像を乗算ブレンド（拡大画像用）
	var _paintMagnifyShadowBlend = function(){
		var sRA, sGA, sBA, dRA, dGA, dBA, dA;
		
		var srcImage = _magnifyContext.getImageData(0, 0, _magnifyWidth, _magnifyHeight);
		var src = srcImage.data;
		
		var ptr = 0;
		var sptr = 0;
		var len = _magnifyWidth*_magnifyHeight*4;
		for (var ptr=0;ptr<len;ptr+=4){				
			sptr = (ptr%8==0) ? ptr / 2 : (ptr - 4) / 2; 
			
			sRA = src[ptr+0]/255;
			dRA = _shadowCache[sptr+0]/255;
			sGA = src[ptr+1]/255;
			dGA = _shadowCache[sptr+1]/255;
			sBA = src[ptr+2]/255;
			dBA = _shadowCache[sptr+2]/255;
			dA  = _shadowCache[sptr+3]/255;			
			
			src[ptr+0] = (dA===0)?sRA*255:(sRA*dRA) * 255;
			src[ptr+1] = (dA===0)?sGA*255:(sGA*dGA) * 255;
			src[ptr+2] = (dA===0)?sBA*255:(sBA*dBA) * 255;
			src[ptr+3] = 255;
			
		}
		
		srcImage.data= src;
		_magnifyContext.putImageData(srcImage, 0, 0);
	};
	
	// 引数で与えられたコンテキストに引数で与えられたimgを乗算レイヤーとしてブレンド
	var _paintBlend = function(ctx, w, h, img){
		var sA, dA;
		var sRA, sGA, sBA, dRA, dGA, dBA, dA2;
		var demultiply;
		
		var srcImage = ctx.getImageData(0, 0, w, h);
		var src = srcImage.data;
		ctx.clearRect(0,0, w,h);
		ctx.drawImage(img, 0, 0, w, h);
		var dstImage = ctx.getImageData(0, 0, w, h);
		var dst = dstImage.data;
		
		var ptr = 0;
		var len = w*h*4;
		for (var ptr=0;ptr<len;ptr+=4){				
			sA = src[ptr+3]/255;
			dA = dst[ptr+3]/255;
			dA2 = (sA + dA - sA*dA);
			dst[ptr+3] = dA2*255;
			
			sRA = src[ptr+0]/255*sA;
			dRA = dst[ptr+0]/255*dA;
			sGA = src[ptr+1]/255*sA;
			dGA = dst[ptr+1]/255*dA;
			sBA = src[ptr+2]/255*sA;
			dBA = dst[ptr+2]/255*dA;
			
			demultiply = 255 / dA2;

			dst[ptr+0] = (dA===0)?sRA*255:(sRA*dRA + sRA*(1-dA) + dRA*(1-sA)) * demultiply;
			dst[ptr+1] = (dA===0)?sGA*255:(sGA*dGA + sGA*(1-dA) + dGA*(1-sA)) * demultiply;
			dst[ptr+2] = (dA===0)?sBA*255:(sBA*dBA + sBA*(1-dA) + dBA*(1-sA)) * demultiply;			
		}
		dstImage.data= dst;
		ctx.putImageData(dstImage, 0, 0);
	};
	
	// スマホ用の透過影画像を作成（本サイトでは使わない）
	var _makeShadow = function(ctx, w, h, img){
		ctx.drawImage(img, 0, 0, w, h);
		var image1 = ctx.getImageData(0, 0, w, h);
		var imageData1 = image1.data;
		
		for(var y=0; y<h; y++){
			for(var x=0; x<w; x++){
				var ptr =(y*w + x) * 4;
				var aR = imageData1[ptr + 0];
				var aG = imageData1[ptr + 1];
				var aB = imageData1[ptr + 2];
				var aA = imageData1[ptr + 3];			
				
				var av = (aR + aG + aB)/3;
				var dA = (1 - (aR/255)*(aG/255)*(aB/255)) * aA * 0.3;
				imageData1[ptr + 0] = av/255;
				imageData1[ptr + 1] = av/255;
				imageData1[ptr + 2] = av/255;
				imageData1[ptr + 3] = dA;
			}
		}
		image1.data= imageData1;
		ctx.putImageData(image1, 0, 0);
	};
	
	// マスク用透過画像を作成（本サイトでは使わない）
	var _makeMask = function(ctx, w, h, img){
		ctx.drawImage(img, 0, 0, w, h);
		var image1 = ctx.getImageData(0, 0, w, h);
		var imageData1 = image1.data;
		
		for(var y=0; y<h; y++){
			for(var x=0; x<w; x++){
				var ptr =(y*w + x) * 4;
				var aR = imageData1[ptr + 0];
				var aG = imageData1[ptr + 1];
				var aB = imageData1[ptr + 2];
				var aA = imageData1[ptr + 3];				
				
				//var dA = (aR*aG*aB)/(255*255*255)*255;
				var dA = (aR)/(255)*255;
				//dA = (dA < 25) ? 0 : dA; 
				imageData1[ptr + 0] = 255;
				imageData1[ptr + 1] = 255;
				imageData1[ptr + 2] = 255;
				imageData1[ptr + 3] = dA;
			}
		}
		image1.data= imageData1;
		ctx.putImageData(image1, 0, 0);
	};
	
	// 着物canvasに現在設定で描画
	var _paintKimono = function(){
		if ( ! _canvas || ! _context ) return;
		
		// 一旦クリア
		_context.clearRect(0,0, _width, _height);
		
		// 下地色
		_context.fillStyle = _curColor;
		_context.fillRect(0, 0, _width, _height);
		
		// 柄画像を描画
		_context.drawImage(_patternImageObjects[_curPatternIndex], 0, 0, _width, _height);
		
		// 影画像を描画
		_context.drawImage(_shadowImage, 0, 0, _width, _height);
		
		// 以下、処理が重いのでいったんボツ
		/*// 影画像を乗算ブレンド。（スマホは透過画像をのせるだけ：処理が重いので）
		var imgShadow = new Image();
		imgShadow.src = _curShadow;
		if (isTouch){
			_context.drawImage(imgShadow, 0, 0, _width, _height);
		} else {			
			//_paintBlend(_context, _width, _height, imgShadow);
			_paintShadowBlend();
		}*/
		
		// マスク画像を描画
		_context.drawImage(_maskImage, 0,0, _width,_height);
	};
	
	
	// 鏡像を描画：着物画像を上下反転して透過させて描画
	var _paintMirror = function(){
		if ( ! _canvas || ! _context ) return;
		if ( ! _mirrorCanvas || ! _mirrorContext ) return;

		_mirrorContext.clearRect(0, 0, _mirrorWidth, _mirrorHeight);
		_mirrorContext.save();
		_mirrorContext.globalAlpha = 0.2;
		_mirrorContext.scale(1, -1);
		_mirrorContext.translate(0, -_mirrorHeight);
		_mirrorContext.drawImage(_canvas, 0, 0);
		_mirrorContext.restore();
	};
	
	
	// 拡大画像を描画（canvasに描画すると、Webkit系ブラウザで border-radiusが効かないみたいなので DIVを重ねる）
	var _paintMagnify = function(scope){
		if (scope == 'all' || scope == 'color'){
			$magnifyColor.css('background-color', _curColor);
		}
		if (scope == 'all' || scope == 'pattern'){
			//$magnifyPattern.css('background-image', 'url(' + _curPattern + ')');
			$magnifyPattern.css('background-image', 'url(' + _patternImageObjects[_curPatternIndex].src + ')');
		}
		if (scope == 'all'){
			$magnifyShadow.css('background-image', 'url(' + _curShadow + ')');
		}
		if (scope == 'all'){
			$magnifyMask.css('background-image', 'url(' + _curMask + ')');
		}
	};
	
	// paint関数：着物を描画してから鏡像を描画
	var _paint = function(scope){
		if (!scope) scope = 'all';
		_paintKimono();
		_paintMirror();
		_paintMagnify(scope);
	};
	
	// 拡大鏡の位置更新
	var _trackChanging = function(difX, difY){
		//var nextX = $magnifyContainer.position().left - difX*3;
		//var nextY = $magnifyContainer.position().top - difY*3;
		//$magnifyContainer.css('transform', 'translate(' + nextX + 'px, ' + nextY + 'px)');
		difX *= 3;
		difY *= 3;
		var l = $magnifyContainer.position().left;
		var t = $magnifyContainer.position().top;
		if( (l <= _magnifyRight && difX > 0)  || (l >= _magnifyLeft && difX < 0) ){
			difX = 0;
		}
		if( (t <= _magnifyBottom && difY > 0) || (t >= _magnifyTop && difY < 0) ){
			difY = 0;
		}
		$magnifyContainer.css({'left': '-=' + difX + 'px', 'top': '-=' + difY + 'px'});
	};
	// ドラッグ終了
	var _trackFinished = function(curX, curY, difX, difY, timeSpan, rollbackL) {
		if (Math.abs(difX) < 10 && Math.abs(difY) < 10){//ドラッグ量が少ない場合、クリックとみなす
			scaleDown();
			//console.log("scaleDown");
		} else {//ドラッグされた
			//var l = $magnifyContainer.position().left;
			//var t = $magnifyContainer.position().top;
			//_rewind(l, t);
		}
	};
	//着物が見えなくなったら戻す
	var _rewind = function(left, top){
		/*
		var transX = 0;
		var transY = 0;
		if(left > _magnifyLeft){//左端出た
			transX = _magnifyLeft;
			if(top > _magnifyTop){//上端出た
				transY = _magnifyTop;
				$magnifyContainer.css('transform', 'translate(' + transX + 'px, ' + transY + 'px)');
			} else if(top < _magnifyBottom){//下端出た
				transY = _magnifyBottom;
				$magnifyContainer.css('transform', 'translate(' + transX + 'px, ' + transY + 'px)');
			} else {//上下は出ていない
				$magnifyContainer.css('transform', 'translate(' + transX + 'px, ' + top + 'px)');
			}
		} else if(left < _magnifyRight){//右端出た
			transX = _magnifyRight;
			if(top > _magnifyTop){//上端出た
				transY = _magnifyTop;
				$magnifyContainer.css('transform', 'translate(' + transX + 'px, ' + transY + 'px)');
			} else if(top < _magnifyBottom){//下端出た
				transY = _magnifyBottom;
				$magnifyContainer.css('transform', 'translate(' + transX + 'px, ' + transY + 'px)');
			} else {//上下は出ていない
				$magnifyContainer.css('transform', 'translate(' + transX + 'px, ' + top + 'px)');
			}
		} else {//左右は出ていない
			transX = left;
			if(top > _magnifyTop){//上端出た
				transY = _magnifyTop;
				$magnifyContainer.css('transform', 'translate(' + transX + 'px, ' + transY + 'px)');
			} else if(top < _magnifyBottom){//下端出た
				transY = _magnifyBottom;
				$magnifyContainer.css('transform', 'translate(' + transX + 'px, ' + transY + 'px)');
			} 
		}
		*/
		
		if(left > _magnifyLeft){//左端出た
			if(top > _magnifyTop){//上端出た
				$magnifyContainer.stop().animate({'left':_magnifyLeft + 'px', 'top':_magnifyTop + 'px'},'fast');
			} else if(top < _magnifyBottom){//下端出た
				$magnifyContainer.stop().animate({'left':_magnifyLeft + 'px', 'top':_magnifyBottom + 'px'},'fast');
			} else {//上下は出ていない
				$magnifyContainer.stop().animate({'left':_magnifyLeft + 'px'},'fast');
			}
		} else if(left < _magnifyRight){//右端出た
			if(top > _magnifyTop){//上端出た
				$magnifyContainer.stop().animate({'left':_magnifyRight + 'px', 'top':_magnifyTop + 'px'},'fast');
			} else if(top < _magnifyBottom){//下端出た
				transY = _magnifyBottom;
				$magnifyContainer.stop().animate({'left':_magnifyRight + 'px', 'top':_magnifyBottom + 'px'},'fast');
			} else {//上下は出ていない
				$magnifyContainer.stop().animate({'left':_magnifyRight + 'px'},'fast');
			}
		} else {//左右は出ていない
			if(top > _magnifyTop){//上端出た
				$magnifyContainer.stop().animate({'top':_magnifyTop + 'px'},'fast');
			} else if(top < _magnifyBottom){//下端出た
				$magnifyContainer.stop().animate({'top':_magnifyBottom + 'px'},'fast');
			} 
		}
	};
	
	// 拡大鏡イベント登録
	var _registerEvents = function(isUnbind){
		var startX = 0;	//ドラッグ開始時のx座標
		var currentX = 0;	//ドラッグ中のx座標
		var startY = 0;	//ドラッグ開始時のy座標
		var currentY = 0;	//ドラッグ中のy座標
		var startTime = 0;	//ドラッグ開始時刻
		var endX = 0;	//ドラッグ終了時のx座標
		var endY = 0;	//ドラッグ終了時のy座標
		var endTime = 0;	//ドラッグ終了時刻
		var left = $magnifyContainer.offset().left;	//ラッパーDIVのdocumentに対する左x座標
		var top = $magnifyContainer.offset().top;	//ラッパーDIVのdocumentに対する上y座標
		var rollBackLeft = 0; //ドラッグ開始時のDIVのposition().left
		var rollBackTop = 0; //ドラッグ開始時のDIVのposition().top
		var timerid = 0;	//setTimeoutのid

		$magnifyMask.bind('touchstart', function(ev){
			ev.preventDefault();
			clearTimeout(timerid);
			
			left = $magnifyContainer.offset().left;
			top = $magnifyContainer.offset().top;
			var pageX = event.changedTouches[0].pageX;
			var pageY = event.changedTouches[0].pageY;
			startX = pageX - left;
			currentX = pageX - left;
			startY = pageY - top;
			currentY = pageY - top;
			startTime = (new Date()).getTime();
			rollbackLeft = $magnifyContainer.position().left;
			rollbackTop = $magnifyContainer.position().top;
			$(document).bind('touchmove', _touchmove).bind('touchend', _touchend);
		});
		var _touchmove = function(ev){
			ev.stopPropagation();
			ev.preventDefault();
			clearTimeout(timerid);
			
			var pageX = event.changedTouches[0].pageX;
			var pageY = event.changedTouches[0].pageY;
			var nowX = pageX - left;
			var nowY = pageY - top;
			var difX = currentX - nowX;
			var difY = currentY - nowY;
					
			timerid = setTimeout(function(){ _trackChanging(difX, difY); }, 5);
			currentX = nowX;
			currentY = nowY;
			return false;
		};
		var _touchend = function(ev){
			ev.stopPropagation();
			ev.preventDefault();
			$(document).unbind('touchend', _touchend).unbind('touchmove', _touchmove);
			clearTimeout(timerid);
			
			var pageX = event.changedTouches[0].pageX;
			var pageY = event.changedTouches[0].pageY;
			endX = pageX - left;
			endY = pageY - top;
			endTime = (new Date()).getTime();
			var relX = endX - $magnifyContainer.position().left;
			var relY = endY - $magnifyContainer.position().top;
			var difX = endX - startX;
			var difY = endY - startY;
			var span = endTime - startTime;
			timerid = setTimeout(function(){ _trackFinished(relX, relY, difX, difY, span, rollbackLeft, rollbackTop); }, 10);
			return false;
		};
	};
	
	// 拡大鏡レイヤーを作成
	var _makeMagnifyLayer = function(){
		//コンテナ
		$magnifyContainer = $('<div></div>');
		$magnifyContainer.css({
			'width': _magnifyWidth + 'px',
			'height': _magnifyHeight + 'px',
			'overflow': 'hidden',
			'position': 'absolute',
			'top': 0,
			'left': 0,
			'z-index': 21
		});
		//下地レイヤー
		$magnifyColor = $('<div></div>');
		$magnifyColor.css({
			'width': _magnifyWidth + 'px',
			'height': _magnifyHeight + 'px',
			'overflow': 'hidden',
			'position': 'absolute',
			'top': 0,
			'left': 0,
			'z-index': 22
		});
		//柄レイヤー
		$magnifyPattern = $('<div></div>');
		$magnifyPattern.css({
			'width': _magnifyWidth + 'px',
			'height': _magnifyHeight + 'px',
			'overflow': 'hidden',
			'position': 'absolute',
			'top': 0,
			'left': 0,
			'z-index': 23,
			'background-repeat': 'no-repeat',
			'background-size': _magnifyWidth + 'px ' + _magnifyHeight + 'px'
		});
		//影レイヤー
		$magnifyShadow = $('<div></div>');
		$magnifyShadow.css({
			'width': _magnifyWidth + 'px',
			'height': _magnifyHeight + 'px',
			'overflow': 'hidden',
			'position': 'absolute',
			'top': 0,
			'left': 0,
			'z-index': 24,
			'background-repeat': 'no-repeat',
			'background-size': _magnifyWidth + 'px ' + _magnifyHeight + 'px'
		});
		//マスクレイヤー
		$magnifyMask = $('<div></div>');
		$magnifyMask.css({
			'width': _magnifyWidth + 'px',
			'height': _magnifyHeight + 'px',
			'overflow': 'hidden',
			'position': 'absolute',
			'top': 0,
			'left': 0,
			'z-index': 25,
			'background-repeat': 'no-repeat',
			'background-size': _magnifyWidth + 'px ' + _magnifyHeight + 'px'
		});
		$magnifyContainer.append($magnifyColor).append($magnifyPattern).append($magnifyShadow).append($magnifyMask);
		$magnify.append($magnifyContainer);
		/*
		//下地レイヤー
		$magnifyColor = $('<div></div>');
		$magnifyColor.css({
			'width': '1000px',
			'height': '1000px',
			'overflow': 'hidden',
			'position': 'absolute',
			'top': 0,
			'left': 0,
			'z-index': 21
		});
		//柄レイヤー
		$magnifyPattern = $('<div></div>');
		$magnifyPattern.css({
			'width': '1000px',
			'height': '1000px',
			'overflow': 'hidden',
			'position': 'absolute',
			'top': 0,
			'left': 0,
			'z-index': 22,
			'background-repeat': 'no-repeat',
			'background-size': _magnifyWidth + 'px ' + _magnifyHeight + 'px'
		});
		//影レイヤー
		$magnifyShadow = $('<div></div>');
		$magnifyShadow.css({
			'width': '1000px',
			'height': '1000px',
			'overflow': 'hidden',
			'position': 'absolute',
			'top': 0,
			'left': 0,
			'z-index': 23,
			'background-repeat': 'no-repeat',
			'background-size': _magnifyWidth + 'px ' + _magnifyHeight + 'px'
		});
		//マスクレイヤー
		$magnifyMask = $('<div></div>');
		$magnifyMask.css({
			'width': '1000px',
			'height': '1000px',
			'overflow': 'hidden',
			'position': 'absolute',
			'top': 0,
			'left': 0,
			'z-index': 24,
			'background-repeat': 'no-repeat',
			'background-size': _magnifyWidth + 'px ' + (_magnifyHeight*2) + 'px'
		});
		$magnify.append($magnifyColor).append($magnifyPattern).append($magnifyShadow).append($magnifyMask);
		*/
	};
	
	// 以下publicメソッド
	// 初期化関数
	var init = function(){
		// 画像オブジェクト作成
		for (var i=0; i<_patternImages.length; i++){
			var img = new Image();
			img.src = KIMONO_PATH + _patternImages[i];
			_patternImageObjects.push(img);
		}
		_shadowImage = new Image();
		_shadowImage.src = _curShadow;
		_maskImage = new Image();
		_maskImage.src = _curMask;
		
		$("#" + _id).css({ width: _width + 'px' });
		// メインキャンバス準備
		$main = $('#' + _id + ' .' + _mainName);
		$main.css({ width: _width + 'px', height: _height + 'px' });
		_canvas = document.createElement('canvas');
		_canvas.width = _width;
		_canvas.height = _height;
		$main.append(_canvas);
		//_canvas = G_vmlCanvasManager.initElement(_canvas);
		_context = _canvas.getContext('2d');
		
		// マスク画像作成用コード・本番はいらない
		/*_maskCanvas = document.createElement('canvas');
		_maskCanvas.width = _width;
		_maskCanvas.height = _height;
		$("#outputImage").append(_maskCanvas);
		_maskContext = _maskCanvas.getContext('2d');
		var maskImage = new Image();
		maskImage.src = _curShadow;
		_makeShadow(_maskContext, _width, _height, maskImage);*/
		
		// 鏡像キャンバス準備
		$mirror = $('#' + _id + ' .' + _mirrorName);
		$mirror.css({ width: _width + 'px', height: _height + 'px' });
		_mirrorCanvas = document.createElement('canvas');
		_mirrorCanvas.width = _mirrorWidth;
		_mirrorCanvas.height = _mirrorHeight;
		$mirror.append(_mirrorCanvas);
		//_mirrorCanvas = G_vmlCanvasManager.initElement(_mirrorCanvas);
		_mirrorContext = _mirrorCanvas.getContext('2d');
		
		// 拡大画像キャンバス準備
		$magnify = $(_magnifyName);
		var $parent = $("#kimonoView");
		$magnify.css({ "width":$parent.width() + "px", "height":$parent.outerHeight() + "px" });
		_magnifyWidth = 3*_width;
		_magnifyHeight = 3*_height;
		_makeMagnifyLayer();
		var il = (-1)*Math.round(_magnifyParam.left*(_magnifyWidth-$magnify.width()));//拡大画像の初期left
		var it = (-1)*Math.round(_magnifyParam.top*(_magnifyHeight-$magnify.height()));//拡大画像の初期top
		$magnifyContainer.css({"left":il+"px", "top":it+"px"});
		_magnifyLeft = il + Math.round(_magnifyParam.width*(_magnifyWidth-$magnify.width()));
		_magnifyRight = il - Math.round(_magnifyParam.width*(_magnifyWidth-$magnify.width()));
		_magnifyTop = it + Math.round(_magnifyParam.height*(_magnifyHeight-$magnify.height()));
		_magnifyBottom = it - Math.round(_magnifyParam.height*(_magnifyHeight-$magnify.height()));
		
		// 影画像のピクセルデータをキャッシュ
		//_cacheShadowImage();
		
		// 初期状態で着物描画
		_paint('all');
		
		_registerEvents();
		
	};
	that.init = init;
	
	// 下地色をセットして再描画
	var setColor = function(color){
		_curColor = color;
		_paint('color');
	};
	that.setColor = setColor;
	
	// 柄画像名をセットして再描画（indexを受け取るようにしたので不要）
	/*var setPattern = function(ptn){
		_curPattern = KIMONO_PATH + ptn;
		_paint('pattern');
	};
	that.setPattern = setPattern;*/
	// 柄画像インデックスをセットして再描画
	var setPatternIndex = function(idx){
		_curPatternIndex = idx;
		_paint('pattern');
	};
	that.setPatternIndex = setPatternIndex;
	
	// 着物canvasのPNGバイナリデータを返す
	var getPaintData = function(){
		if ( ! _canvas ) return '';
		var res = _canvas.toDataURL();
		if (res.substr(0,6) == "data:,"){
			var encoder = new JPEGEncoder();
			return encoder.encode(_context.getImageData(0,0, _width,_height), 90);
		} else {
			return res;
		}
	};
	that.getPaintData = getPaintData;
	
	var scaleUp = function(){
		setTimeout(function(){$magnify.css("display", "block");}, 50);
		//setTimeout(function(){_registerEvents();}, 100);
	};
	that.scaleUp = scaleUp;
	var scaleDown = function(){
		$magnify.css("display", "none");
	};
	that.scaleDown = scaleDown;
	
	return that;
};

// JavaScript Document
var page;

// 色替えページコントロールオブジェクト関数 extends kyozomePage()
var colorPage = function(my){
	var _kimonoId = 0;	//現在のページの着物ID
	var _kimonoItem = null;	//現在のページの着物データ
	var _picker = null;	//colorPickerオブジェクト
	var _changer = null;	//patternChangerオブジェクト
	var _painter = null;	//kimonoPainterオブジェクト
	var _helpnav = null;	//helpNavオブジェクト
	var _curColor = 'rgb(255, 0, 0)';	//現在の色
	var _nscale = 1;
	var _height = 1024;
	var _kimonoTop = 100;
	var _kimonoBottom = 800;
	var _isFirst = 0;
	var $actArea = null;
	my = my || {};
	var that = kyozomePage(my);	//この関数（colorPage()）が返すオブジェクト
	
	// 先読みしておく画像リスト配列を取得
	var _getPreLoadImages = function() {
		var imgs = ['images/circle.png','images/img_select_top.png','images/img_select_top_selected.png','images/img_select_right.png','images/img_select_right_selected.png','images/img_select_bottom.png','images/img_select_bottom_selected.png','images/img_select_left.png','images/img_select_left_selected.png'];	// トーンピッカーの○
		//if (isTouch) {
		//	imgs.push(KIMONO_PATH + "_" + _kimonoItem.shadow);		// 着物しわ
		//} else {
			imgs.push(KIMONO_PATH + _kimonoItem.shadow);		// 着物しわ
		//}
		imgs.push(KIMONO_PATH + _kimonoItem.mask);	// 着物マスク
		for( var i=0; i<_kimonoItem.pattern.length; i++ ) {
			imgs.push(KIMONO_PATH + _kimonoItem.pattern[i]);	// 着物柄
			imgs.push(KIMONO_PATH + "thumb_" + _kimonoItem.pattern[i]);	// 着物柄サムネイル
		}
		return imgs;
	};
	
	
	// 色・柄選択タブを初期化、クリックイベント登録
	var _initTab = function(){
		var w = $("#selectTab").width();
		if (_kimonoItem.pattern.length > 1){
			$('.patternTab').bind('click', function(){
				if($(this).hasClass('current')) return false;
				
				$("#selectTab").find(".current").removeClass('current');
				$('.patternTab').addClass('current');
				
				$("#colorSelectView").css("display", "none");
				$("#patternSelectView").css("display", "block");
			});
			$('.colorTab').bind('click', function(){
				if($(this).hasClass('current')) return false;
				
				$("#selectTab").find(".current").removeClass('current');
				$('.colorTab').addClass('current');
				
				$("#patternSelectView").css("display", "none");
				$("#colorSelectView").css("display", "block");
			});
			$("#selectTab li").css("width", Math.round(w/2-1) + "px");
		} else {//柄が複数ない場合は柄選択タブは非表示
			$('.patternTab').css("display", "none");
			$('.colorTab').css("width", (w-1) + "px");
		}
		// デフォルトは色選択タブが選択状態
		$("#patternSelectView").css("display", "none");
		
	};
	
	var _registerEvents = function(){
		//戻るボタン
		$("#tabBar .btnReturn").bind('click', function(){
			//console.log('return');
			//location.href = "select.html";
			//history.back();
			navigator.app.backHistory();
		});
		
		//元に戻すボタン
		$("#tabBar .btnReset").bind('click', function(){
			//色を元に戻す
			_curColor = _kimonoItem.color;
			
			// colorPicker, patternChanger, kimonoPainterに反映
			_picker.resetColor(_curColor);
			_changer.setPattern(0);
			_painter.setColor(_curColor);
			_painter.setPatternIndex(0);
		});
		
		//アクションボタン
		$("#tabBar .btnAction").bind('click', function(){
			$actArea.stop().animate({'top':"0px"}, "normal");
		});
		
		//アクションボタンエリア閉じる
		var closeActArea = function(){
			$actArea.stop().animate({'top': ((-1)*_height) + "px"}, "normal");
		};
		//保存ボタン
		$("#actionArea .btnDownload").bind('click', function(){
			closeActArea();
			var paintdata = _painter.getPaintData();
			var ext = ".png";
			if (paintdata){
				if (paintdata.match(/image\/jpeg/)){
					ext = ".jpg";
				}
				paintdata = paintdata.replace(/^.*?,/, '');
				window.plugins.canvasSavePlugin.saveImage(paintdata, {ext: ext}, 
					function(result){
						alert("Pictures フォルダに画像を保存しました。");
					}, function(error) {
						alert("画像の保存に失敗しました。");
					});
			} else {
				alert("画像の保存に失敗しました。");
			}
		});
		
		//メールボタン
		$("#actionArea .btnMail").bind('click', function(){
			closeActArea();
			var paintdata = _painter.getPaintData();
			var ext = ".png";
			if (paintdata){
				if (paintdata.match(/image\/jpeg/)){
					ext = ".jpg";
				}
				paintdata = paintdata.replace(/^.*?,/, '');
				window.plugins.canvasSavePlugin.sendImage(paintdata, {ext: ext}, 
					function(result){
						// 何もしない
						//alert(result);
					}, function(error) {
						alert(error);
					});
			} else {
				alert("画像の添付に失敗しました。");
			}
		});
		
		//キャンセルボタン
		$("#actionArea .btnCancel").bind('click', function(){
			closeActArea();
		});
	};
	
	var _setHeight = function(nscale, height){
		// タブバー:1, 着物:10, ピッカー:5
		$("#tabBar").css("height", (1*nscale) + "px");
		var pHeight = $("#tabBar").height() - 8;
		$("#tabBar p").css({"height": pHeight + "px", "font-size": Math.round(pHeight*0.4) + "px", "line-height": pHeight + "px"});
		$("#tabBar p.iconDownload").css("font-size", Math.round(pHeight*0.7) + "px");
		$("#kimonoView").css("height", (10*nscale) + "px");
		$("#kimonoPainter").css("margin-top", Math.round(0.5*nscale) + "px");
		$("#selectView").css("height", (5*nscale) + "px");
		$("#selectView #selectTab").css({"height": Math.round(1*nscale) + "px", "width":"100%"});
		$("#selectView #selectTab li").css({"font-size":Math.round(0.3*nscale) + "px", "line-height":(1*nscale) + "px", "height":(1*nscale) + "px", "border-radius":Math.round(1*nscale) + "px " + Math.round(1*nscale) + "px 0px 0px/" + Math.round(1.5*nscale) + "px " + Math.round(1.5*nscale) + "px 0px 0px"});
		//端末解像度ごとの調整用マージン
		var exMargin = height - 16*nscale;
		if(exMargin>0){
			//$("#tabBar").css("margin-bottom", Math.ceil(0.5*exMargin) + "px");
			$("#kimonoView").css("padding", Math.ceil(0.5*exMargin-1) + "px 0");
			//$("#selectView").css("padding-bottom", Math.ceil(0.5*exMargin) + "px");
		}
		_kimonoTop = $("#kimonoView").offset().top;
		_kimonoBottom = _kimonoTop + $("#kimonoView").height();
		$actArea.css("top", ((-1)*height) + "px");
		
		$("#actionArea .actionBtnWrapper span").css({"height": pHeight + "px", "font-size": Math.round(pHeight*0.4) + "px", "line-height": pHeight + "px"});
		$("#actionArea .actionBtnWrapper p").css({"height": pHeight + "px", "font-size": Math.round(pHeight*0.6) + "px", "line-height": pHeight + "px"});
		
	};
	
	//以下publicメソッド
	//色替えページオブジェクト初期化
	var init = function(page){
		my.resize();
		$actArea = $("#actionArea");
		_nscale = my.sm.getNScale();
		_height = my.sm.getHeight();
		_setHeight(_nscale, _height);
		//現在のページの着物データを取得
		_kimonoId = my.sm.getKimonoId();
		_kimonoItem = kimono[_kimonoId];
		//初回表示かどうか
		_isFirst = my.sm.getIsFirst();
		
		//最初に必要な画像をロードしておく（canvasで描画するため)
		my._preloadimages(_getPreLoadImages()).done(function(){
			
			// colorPickerオブジェクトを準備
			_picker = colorPicker({ nscale: _nscale });
			_picker.init(page, _kimonoItem.color);
			
			// patternChangerオブジェクトを準備
			_changer = patternChanger({
				pattern: _kimonoItem.pattern, 
				color: _kimonoItem.color,
				width: 2*_nscale,
				nscale: _nscale
			});
			_changer.init(page);
			
			// kimonoPainterオブジェクトを準備
			_painter = kimonoPainter({
				color: _kimonoItem.color,
				pattern: _kimonoItem.pattern[0],
				patternIndex: 0,
				patternImages: _kimonoItem.pattern,
				shadow: _kimonoItem.shadow,
				mask: _kimonoItem.mask,
				width: Math.round(8.5*_nscale),
				height: Math.round(8.5*_nscale),
				magnifyParam: _kimonoItem.magnifyParam
			});
			_painter.init();
			
			// 色・柄選択タブ初期化
			_initTab();
			
			// ボタンクリックイベント登録
			_registerEvents();
			
			// Loading画像消す
			$("#loading").css("display", "none");
			
			//初回表示時、使い方ナビ表示
			//if (_isFirst == 0){
				my.sm.setIsFirst("1");
				_helpnav = helpNav({nscale:_nscale});
				_helpnav.init();
			//}
		});
	};
	that.init = init;
	
	// colorPickerで色が変更された
	var colorChanged = function(){
		// 変更された色を取得
		_curColor = _picker.getColor();
		
		// 着物色替え
		_painter.setColor(_curColor);
		
		// patternChangerの下地色更新
		_changer.setColor(_curColor);
	};
	that.colorChanged = colorChanged;
	
	// patternChangerで柄画像が変更された
	var patternChanged = function(){
		//変更された柄をkimonoPainterに反映
		//indexを渡すように修正
		//_painter.setPattern(_changer.getPattern());
		_painter.setPatternIndex(_changer.getPatternIndex());
	};
	that.patternChanged = patternChanged;
	
	//WebViewからダブルタップ、ピンチイベント受け取る
	that.doubleTapped = function(posY){
		if(posY > _kimonoTop && posY < _kimonoBottom) {
			_painter.scaleUp();
		}
	};
	that.pinchedOut = function(){
		_painter.scaleUp();
	};
	that.pinchedIn = function(){
		_painter.scaleDown();
	};
	
	return that;
};

document.addEventListener('DOMContentLoaded', function(){
	if (typeof device === 'undefined'){
		document.addEventListener("deviceready", onDeviceReady, false);
	} else {
		onDeviceReady();
	}
});

function onDeviceReady(){
	document.addEventListener("backbutton", function(e){
	    e.preventDefault();
	    navigator.app.backHistory();
	}, true);
	page = colorPage();
	page.init(page);
}

//onDeviceReady();

// JavaScript Document

// グローバル変数
var isTouch = ('ontouchstart' in window);	//タッチパネルかどうか
var isWebkit = /WebKit/i.test(navigator.userAgent) ? true : false;	//Webkit系のブラウザか
var KIMONO_PATH = 'images_kimono/';	//着物画像のパス

// ページコントロール親オブジェクト（着物選択ページと色替えページに共通のメソッドを定義）
var kyozomePage = function(my){
	var DEFINE_WIDTH = 768;
	var DEFINE_HEIGHT = 1024;
	var UNIT_PIXCEL = 12;	//単位ピクセル
	
	var that = {};	//この関数（kimonoPage()）が返すオブジェクト
	var sm = storageManager();
	my = my || {};
	my.sm = sm;
	my.UNIT_PIXCEL = UNIT_PIXCEL;
	
	// 画像プリロード関数
	// 参考. http://www.javascriptkit.com/javatutors/preloadimagesplus.shtml
	var _preloadimages = function(arr){
		var newimages=[], loadedimages=0
		var postaction=function(){}
		var arr=(typeof arr!="object")? [arr] : arr
		function imageloadpost(){
			loadedimages++
			if (loadedimages==arr.length){
				postaction(newimages) //call postaction and pass in newimages array as parameter
			}
		}
		for (var i=0; i<arr.length; i++){
			newimages[i]=new Image()
			newimages[i].src=arr[i]
			newimages[i].onload=function(){
				imageloadpost()
			}
			newimages[i].onerror=function(){
				imageloadpost()
			}
		}
		return { //return blank object with done() method
			done:function(f){
				postaction=f || postaction //remember user defined callback functions to be called when images load
			}
		}
	};
	my._preloadimages = _preloadimages;
	
	// GETパラメータから、現在のページの着物IDを取得
	var _getKimonoId = function(){
		if(location.search){
			var q = location.search.substring(1).split('&');
			for(var k in q){
				var p = q[k].split('=');
				if (p.length==2 && p[0] == 'kid'){
					return p[1];
				}
			}
		}
		return 0;
	};
	my._getKimonoId = _getKimonoId;
	
	// canvasが使用可能かチェック
	var check = function(){
		if (document.createElement('canvas').getContext){
			return true;
		}
		return false;
	};
	that.check = check;
	
	// Android各端末のディスプレイに合わせてリサイズ
	var resize = function(){
		var nscale = my.sm.getNScale();
		var width = nscale * UNIT_PIXCEL;
		// wrapperをディスプレイと同じ高さに
		$("div.wrapper").css({width: width + "px"});		
	};
	my.resize = resize;
	
	var getNScale = function(width){
		return Math.floor(width/UNIT_PIXCEL);
	};
	my.getNScale = getNScale;
	
	//WebViewからのdoubleTapイベントを受け取る
	//各ページオブジェクトで必要に応じて上書き
	var doubleTapped = function(){
	};
	that.doubleTapped = doubleTapped;
	//WebViewからのpinchInイベントを受け取る
	//各ページオブジェクトで必要に応じて上書き
	var pinchedIn = function(){
	};
	that.pinchedIn = pinchedIn;
	//WebViewからのpinchOutイベントを受け取る
	//各ページオブジェクトで必要に応じて上書き
	var pinchedOut = function(){
	};
	that.pinchedOut = pinchedOut;
	
	return that;
};

// 共通ステップスライダーコントロールオブジェクト関数
var commonStepSlider = function(param){
	if(!param) param = {};
	var _name = param.name || '.slider';	//スライダー全体のクラス名（jqueryセレクタ）
	var _handleName = param.handleName || '.slider-handle';	//スライダーのハンドルクラス名（_name のチャイルドとする）
	var $slider = null;	//スライダーDIVのjqueryオブジェクト
	var $handle = null;	//スライダーハンドルのjqueryオブジェクト
	var _sliderWidth = 0;	//スライダー全体の幅
	var _handleWidth = 0;	//スライダーハンドルの幅
	var _maxRight = 0;	//スライダーハンドル一番右端のposition().leftのpx
	var _step = 0;	//
	var _idx = param.startIndex || 0;	
	var _length = param.length || 0;
	var _posLeft = [];
	var _observer = null;	//このオブジェクトを利用するオブジェクト。
	
	var that = {};	//この関数（commonStepSlider()）が返すオブジェクト
	
	// 要素それぞれに対応するハンドルの左位置をセット
	var _setLeftPosition = function(){
		if (_sliderWidth==0) return;
		for (var i=0; i<_length; i++){
			_posLeft.push(Math.round(_maxRight*i/(_length-1)) + 'px');
		}
	};
	
	// 現在のインデックスに対応する左位置にハンドルをスライド
	var _slideToCurrentPos = function(){
		$handle.stop().animate({left: _posLeft[_idx]}, 'fast');
	};
	
	// ドラッグ開始 or クリック時のマウスダウン
	var _trackStart = function(curX){
		var l = curX - _handleWidth * 0.5;
		if (l <0) l = 0;
		if (l > _maxRight) l = _maxRight;
		
		_normalizeLeft(l);
		$handle.css({left: l + 'px'});
	};
	// ドラッグ中：処理は_trackStartと同じ
	var _trackChanging = function(curX){
		_trackStart(curX);
	};
	// ドラッグ終了 or クリック時のマウスアップ
	// 中途半端な位置に止まらないように左位置を調整する
	var _trackFinished = function(curX){
		var dest = _normalizeLeft(curX);
		$handle.stop().animate({left: dest}, 'fast');
	};
	
	//スライダーハンドルの位置を、中途半端な位置で止まらないように左右の近い方の要素の左位置にずらす
	var _normalizeLeft = function(curX){
		if (_step <= 0) return 0;
		var pos = Math.floor(curX / _step);
		var pos_x = curX % _step;
		if (pos_x > _step*0.5) pos++;
		if (pos <0) pos = 0;
		if (pos >= _length) pos = _length -1;
		
		// インデックスが更新されたらオブザーバーに通知
		if (pos != _idx){
			_idx = pos;
			if(_observer) _observer.setCurrentIndex(_idx);
		}
		return _posLeft[pos];
	};
	
	//ドラッグ・クリックイベントの登録
	var _registerEvents = function(){
		var currentX = 0;	//ドラッグ中のx座標
		var left = $slider.offset().left;	//ラッパーDIVのdocumentに対する左x座標
		var timerid = 0;	//setTimeoutのid
			
		if(isTouch){
			$slider.bind('touchstart', function(ev){
				ev.preventDefault();
				clearTimeout(timerid);

				$handle.stop();
				var pageX = event.changedTouches[0].pageX;
				currentX = pageX - left;
				startTime = (new Date()).getTime();
				$(document).bind('touchmove', _touchmove).bind('touchend', _touchend);
				timerid = setTimeout(function(){ _trackStart(currentX);}, 0);
			});
			
			var _touchmove = function(ev){
				ev.stopPropagation();
				ev.preventDefault();
				clearTimeout(timerid);
				
				var pageX = event.changedTouches[0].pageX;
				var nowX = pageX - left;
				timerid = setTimeout(function(){ _trackChanging(nowX); }, 0);
				currentX = nowX;
				return false;
			};
			var _touchend = function(ev){
				ev.stopPropagation();
				ev.preventDefault();
				$(document).unbind('touchend', _touchend).unbind('touchmove', _touchmove);
				clearTimeout(timerid);
				
				var pageX = event.changedTouches[0].pageX;
				currentX = pageX - left;
				timerid = setTimeout(function(){ _trackFinished(currentX); }, 0);
				return false;
			};
		} else {
			$slider.bind('mousedown', function(ev){
				ev.preventDefault();
				clearTimeout(timerid);

				$handle.stop();
				currentX = ev.pageX - left;
				startTime = (new Date()).getTime();
				$(document).bind('mousemove', _mousemove).bind('mouseup', _mouseup);
				timerid = setTimeout(function(){ _trackStart(currentX);}, 0);
			});
			
			var _mousemove = function(ev){
				ev.stopPropagation();
				ev.preventDefault();
				clearTimeout(timerid);
				
				var nowX = ev.pageX - left;
				timerid = setTimeout(function(){ _trackChanging(nowX); }, 0);
				currentX = nowX;
				return false;
			};
			var _mouseup = function(ev){
				ev.stopPropagation();
				ev.preventDefault();
				$(document).unbind('mouseup', _mouseup).unbind('mousemove', _mousemove);
				clearTimeout(timerid);
				
				currentX = ev.pageX - left;
				timerid = setTimeout(function(){ _trackFinished(currentX); }, 0);
				return false;
			};
		}
	};
	
	// 以下、publicメソッド
	// 初期化関数
	var init = function(obj){
		_observer = obj;
		
		$slider = $(_name);
		$handle = $(_name + ' ' + _handleName);
		
		if ($slider.size()==0 || $handle.size()==0 || _length<2) return;
		_sliderWidth = $slider.width();
		_handleWidth = $handle.width();
		_maxRight = _sliderWidth - _handleWidth;
		_step = Math.round(_maxRight/(_length - 1));
		_setLeftPosition();
		_slideToCurrentPos();
		
		_registerEvents();
	};
	that.init = init;
	
	// 現在位置をセット
	var setCurrentPos = function(pos){
		_idx = pos;
		_slideToCurrentPos();
	};
	that.setCurrentPos = setCurrentPos;
	
	return that;
};


//CSS3 ローカルストレージアクセスオブジェクト
var storageManager = function(){
	var KIMONOID = "kimonoId";//選択された着物id
	var ORGWIDTH = "orgWidth";//端末の横幅
	var ORGHEIGHT = "orgHeight";//端末の高さ
	var NSCALE = "nScale";//サイズ調整用係数
	var ISFIRST ="isFirst";//色替え画面を表示したか（0:まだ, 1:表示した)
	var _st = window.sessionStorage;
	var that = {};
	
	var setSize = function(width, height){
		_st.setItem(ORGWIDTH, width);
		_st.setItem(ORGHEIGHT, height);
	};
	that.setSize = setSize;
	
	var setKimonoId = function(id){
		_st.setItem(KIMONOID, id);
	};
	that.setKimonoId = setKimonoId;
	
	var setNScale = function(nScale){
		_st.setItem(NSCALE, nScale);
	};
	that.setNScale = setNScale;
	
	var setIsFirst = function(isFirst){
		_st.setItem(ISFIRST, isFirst);
	};
	that.setIsFirst = setIsFirst;
	
	var getWidth = function(){
		var w = _st.getItem(ORGWIDTH);
		if (w == null) return 0;
		return parseInt(w, 10);
	};
	that.getWidth = getWidth;
	
	var getHeight = function(){
		var h = _st.getItem(ORGHEIGHT);
		if (h == null) return 0;
		return parseInt(h, 10);
	};
	that.getHeight = getHeight;
	
	var getNScale = function(){
		var ns = _st.getItem(NSCALE);
		if (ns == null) return 24;
		return parseFloat(ns);
	};
	that.getNScale = getNScale;
	
	var getKimonoId = function(){
		var kid = _st.getItem(KIMONOID);
		if (kid == null) return 0;
		return parseInt(kid, 10);
	};
	that.getKimonoId = getKimonoId;
	
	var getIsFirst = function(){
		var isFirst = _st.getItem(ISFIRST);
		if (isFirst == null) return 0;
		return parseInt(isFirst, 10);
	};
	that.getIsFirst = getIsFirst;
	
	return that;
};



// JavaScript Document

var page;

// インデックスページコントロールオブジェクト関数 extends kyozomePage()
var indexPage = function(my){
	my = my || {};
	var that = kyozomePage(my);	//この関数（selectPage()）が返すオブジェクト

	// イベント登録
	var _registerEvents = function(){
		$(".wrapper p a").click(function(event){
			event.stopPropagation();
			return true;
		});
		$(".wrapper").click(function(event){
			//var orgWidth = screen.width;
			//var orgHeight = screen.height;
			var orgWidth = window.innerWidth;
			var orgHeight = window.innerHeight;
			my.sm.setSize(orgWidth, orgHeight);
			my.sm.setKimonoId("0");
			my.sm.setNScale(my.getNScale(orgWidth));
			my.sm.setIsFirst("0");
			location.href = "select.html";
		});
		$(".wrapper .btnHelp").click(function(event){
			event.stopPropagation();
			var orgWidth = window.innerWidth;
			var orgHeight = window.innerHeight;
			my.sm.setSize(orgWidth, orgHeight);
			my.sm.setKimonoId("0");
			my.sm.setNScale(my.getNScale(orgWidth));
			my.sm.setIsFirst("0");
			location.href = "help.html";
		});
	};
	
	//はじめる画像を点滅させる
	var _startAnimation = function(){
		var $btn = $(".btnContainer p.btnStart img");
		var to = 0;
				
		var repeatAnime = function(){
			to = (to == 0) ? 1 : 0;
			$btn.fadeTo(1500, to, function(){ repeatAnime(); });
		};
		
		setTimeout(function(){$btn.fadeTo(1500, to, function(){ repeatAnime(); });}, 1000);
	};
	
	//初期処理
	var init = function(){
		_startAnimation();
		_registerEvents();
	};
	that.init = init;
	
	return that;
};

document.addEventListener('DOMContentLoaded', function(){
	if (typeof device === 'undefined'){
		document.addEventListener("deviceready", onDeviceReady, false);
	} else {
		onDeviceReady();
	}
});

function onDeviceReady(){
	document.addEventListener("backbutton", function(e){
	    e.preventDefault();
	    navigator.app.exitApp();
	}, true);
	page = indexPage();
	page.init();
}

//onDeviceReady();


// JavaScript Document

/*
* Android版はcanvas使わないことにする
// カバーフローの１つずつのパネルオブジェクト（canvas）関数
var panelCanvas = function(param){
	if(!param) param = {};
	var RADIAN = Math.PI / 180;
	var MAX_THETA = 30;	//回転角度の最大（±）
	var MIN_SCALE = 0.9;	//x,y方向の最小倍率
	var MAX_SCALE = 1;	//x,y方向の最大倍率
	var MIN_ZSCALE = 0.8;	//奥行きの最小倍率
	var MAX_ZSCALE = 1;	//奥行きの最大倍率
	var _img = param.img || new Image();
	var _theta = param.theta || 0;	//パネルの回転角度
	var _im_w_org = param.im_w || _img.width;	// 画像の幅（縮小前）
	var _im_h_org = param.im_h || _img.height;	// 画像の高さ（縮小前）
	var _scale = 1.0;	//表示倍率
	var _zscale = 1.0;	//表示倍率（奥行き）
	var _im_w = _im_w_org;	//画像の幅（縮小後）
	var _im_h = _im_h_org;	//画像の高さ（縮小後）
	var _width = _im_w;	//canvasの幅（画像の幅と同じはず）
	var _height = _im_h;	//canvasの高さ（画像の幅に鏡像分の高さを足したもの）
	var _ctx = null;	//canvasの2dコンテキスト
	var _mrr = null;	//鏡像を描画したcanvas（転写用）
	var _points_d = [];	//描画する画像の座標を保持（左上、右上、左下、右下）
	var _index = 0;	//このcanvasがカバーフローの何番目かのインデックス
	var _timerid = 0;	//回転アニメーションタイマー
	var _destTheta = 0;	//回転アニメーションの最終角度
	var _tmpTheta = 0;	//回転中の角度（計算用）
	
	var that = document.createElement('canvas');	//この関数（panelCanvas()）が返すcanvasオブジェクト
	
	// 回転角度から画像の表示倍率を求める
	// 回転角度が大きいほどcoverFlowでは小さく表示される
	var _getScale = function(){
		_scale = MIN_SCALE + (1-Math.abs(_theta/MAX_THETA)) * (MAX_SCALE - MIN_SCALE);
		if (_scale < MIN_SCALE) _scale = MIN_SCALE;
		if (_scale > MAX_SCALE) _scale = MAX_SCALE;
		
		_zscale = MIN_ZSCALE + (1-Math.abs(_theta/MAX_THETA)) * (MAX_ZSCALE - MIN_ZSCALE);
		if (_zscale < MIN_ZSCALE) _zscale = MIN_ZSCALE;
		if (_zscale > MAX_ZSCALE) _zscale = MAX_ZSCALE;
	};
	
	// 画像の縮小率から、canvasサイズを更新
	var _updateSize = function(){
		_im_w = Math.round(_im_w_org * _scale);
		_im_h = Math.round(_im_h_org * _scale);
		_width = _im_w;
		_height = _im_h + Math.round(_im_h * 0.5);
		that.width = _width;
		that.height = _height;
		$(that).css('width', _width + 'px');
		var m = (_im_w_org - _width) * 0.5;
		$(that).css('margin-left', m + 'px');
		
		_points_d[1].x = _im_w;
		_points_d[2].y = _im_h;
		_points_d[3].x = _im_w;
		_points_d[3].y = _im_h;
	};
	
	// 回転した画像の座標を求める（奥行きがあるように）
	var _getRotatePoints = function(){
		var p = [];
		p.push(
			{x:0,y:0},
			{x:_im_w,y:0},
			{x:0,y:_im_h},
			{x:_im_w,y:_im_h}
		);
		
		var offset = {x:Math.round(_im_w*(1.0-_zscale)), y:Math.round(_im_w*(1.0-_zscale))};
		if(_theta<0){
			p[1].x = p[1].x - offset.x*2;
			p[1].y = p[1].y + offset.y*0.25;
			p[3].x = p[3].x - offset.x*2;
			p[3].y = p[3].y - offset.y;
		} else if(_theta>0){
			p[0].x = p[0].x + offset.x*2;
			p[0].y = p[0].y + offset.y*0.25;
			p[2].x = p[2].x + offset.x*2;
			p[2].y = p[2].y - offset.y;
		}
		
		return p;
	};
	
	// 変形後の画像の座標になるように、canvasの座標を変換
	// 参考：http://sakef.jp/html5/plane3d_01/
	var _setMatrix = function(a0, a1, a2, b0, b1, b2){
		var tmp00 = a1.x - a0.x;
		var tmp01 = a1.y - a0.y;
		var tmp10 = a2.x - a0.x;
		var tmp11 = a2.y - a0.y;
		var delta = tmp00 * tmp11 - tmp01 * tmp10;
		
		var ma00 = tmp11 / delta;
		var ma01 = -1 * tmp01 / delta;
		var ma10 = -1 * tmp10 / delta;
		var ma11 = tmp00 / delta;
		
		var mb00 = b1.x - b0.x;
		var mb01 = b1.y - b0.y;
		var mb10 = b2.x - b0.x;
		var mb11 = b2.y - b0.y;
		
		if(mb00 === 0) {mb00 = 0.0001;}
		if(mb01 === 0) {mb01 = 0.0001;}
		if(mb10 === 0) {mb10 = 0.0001;}
		if(mb11 === 0) {mb11 = 0.0001;}
		
		_ctx.translate(b0.x, b0.y);
		_ctx.transform(mb00, mb01, mb10, mb11, 0, 0);
		_ctx.transform(ma00, ma01, ma10, ma11, 0, 0);
		_ctx.translate(-a0.x, -a0.y);
	};
	
	// canvas描画
	var _paint = function(){
		//一旦クリア
		_ctx.clearRect(0,0, _width, _height);
		
		//回転画像の座標を求める
		var p = _getRotatePoints();
		
		// 画像を２つの三角形に分割して、変形画像を描画
		// 左上三角
		_ctx.save();
		_ctx.beginPath();
		_ctx.moveTo(p[0].x, p[0].y);
		_ctx.lineTo(p[1].x, p[1].y);
		_ctx.lineTo(p[1].x, p[1].y+10);	// 三角形ちょうどのサイズだと隙間ができるのでマージンとる
		_ctx.lineTo(p[2].x+10, p[2].y);
		_ctx.lineTo(p[2].x, p[2].y);
		_ctx.closePath();
		_ctx.clip();
		_setMatrix(_points_d[0], _points_d[1], _points_d[2], p[0], p[1], p[2]);
		_ctx.drawImage(_img, 0, 0, _im_w, _im_h);
		_ctx.restore();
		
		// 右下三角
		_ctx.save();
		_ctx.beginPath();
		_ctx.moveTo(p[1].x, p[1].y);
		_ctx.lineTo(p[2].x, p[2].y);
		_ctx.lineTo(p[3].x, p[3].y);
		_ctx.closePath();
		_ctx.clip();
		_setMatrix(_points_d[3], _points_d[1], _points_d[2], p[3], p[1], p[2]);
		_ctx.drawImage(_img, 0,0, _im_w, _im_h);
		_ctx.restore();
		
		// 鏡像描画
		var mp = [];
		mp.push(
			{x:p[2].x, y:p[2].y},
			{x:p[3].x, y:p[3].y},
			{x:p[2].x, y:p[2].y + _im_h},
			{x:p[3].x, y:p[3].y + _im_h}
		);
		_ctx.save();
		_ctx.beginPath();
		_ctx.moveTo(mp[0].x, mp[0].y);
		_ctx.lineTo(mp[1].x, mp[1].y);
		_ctx.lineTo(mp[3].x, mp[3].y);
		_ctx.lineTo(mp[2].x, mp[2].y);
		_ctx.closePath();
		_ctx.clip();
		_setMatrix(_points_d[0], _points_d[1], _points_d[2], mp[0], mp[1], mp[2]);
		_ctx.drawImage(_mrr, 0, 0, _im_w, _im_h);
		// アルファグラデーションをかけて鏡に映っている感じに
		var transgrad = _ctx.createLinearGradient(0,0, 0,_im_h);
		transgrad.addColorStop(0, 'rgba(249, 249, 255, 0.8)');
		transgrad.addColorStop(0.5, 'rgba(249, 249, 255, 1)');
		_ctx.fillStyle = transgrad;
		_ctx.rect(0, 0, _im_w, _im_h);
		_ctx.fill();
		_ctx.restore();
	};
	
	//回転アニメーションの１コマ
	var _rotateStep = function(){
		// 目的の角度まで回転したらアニメ終了
		if (_theta == _destTheta){
			clearInterval(_timerid);
			return;
		} else {
			if (_destTheta > _theta){
				_tmpTheta = _theta + 5;
				if (_tmpTheta > _destTheta) _tmpTheta = _destTheta;
				setTheta(_tmpTheta);
			} else {
				_tmpTheta = _theta - 5;
				if (_tmpTheta < _destTheta) _tmpTheta = _destTheta;
				setTheta(_tmpTheta);
			}
		}
	};
	
	// 以下、publicメソッド
	// 初期化関数、カバーフローで自分が何番目のインデックスかを覚えておく、
	var init = function(index){
		_index = index;
		
		// canvas準備
		if (that.getContext) _ctx = that.getContext('2d');
		_getScale();
		_points_d.push({x:0,y:0},{x:_im_w,y:0},{x:0,y:_im_h},{x:_im_w,y:_im_h});
		_updateSize();

		// 鏡像準備
		_mrr = document.createElement('canvas');
		_mrr.width = _im_w;
		_mrr.height = _im_h;
		if(_mrr.getContext){
			var mc = _mrr.getContext('2d');
			mc.scale(1,-1);
			mc.drawImage(_img, 0, -_im_h, _im_w, _im_h);
		}
	
		// 描画
		_paint();
	};
	that.init = init;
	
	// 現在の回転角度を取得
	var getTheta = function(){
		return _theta;
	};
	that.getTheta = getTheta;
	
	// 回転角度をセット、canvas再描画
	var setTheta = function(theta){
		_theta = theta;
		_getScale();
		_updateSize();
		_paint();
	};
	that.setTheta = setTheta;
	
	// カバーフローの何番目かのインデックスを返す
	var getIndex = function(){
		return _index;
	};
	that.getIndex = getIndex;
	
	//引数で与えられた角度まで回転アニメーション
	var rotateTo = function(theta, distance){
		clearInterval(_timerid);
		_destTheta = theta;
		if (distance > 1){
			setTheta(theta);
		} else {
			_timerid = setInterval(_rotateStep, 30);
		}
	};
	that.rotateTo = rotateTo;
	
	return that;
};
*/

// カバーフローのcanvasの状態（回転角度とか）を管理するオブジェクト関数
var canvasControler = function(param){
	if(!param) param = {};
	var MAX_THETA = 30;	//回転角度の最大
	var MIN_THETA = -30;	//回転角度の最小
	var _images = param.images || [];	//描画する画像配列
	var $container = param.container || $("#selectView .coverflowWrapper .coverflowItems");
	var _im_width = param.width || 360;	//画像１枚の幅（回転角度0°のとき）
	var _im_height = param.height || 360;	//画像１枚の高さ（回転角度0°のとき）
	var _margin = param.margin || 0;	//画像間のマージン
	var _startIndex = param.startIndex || 0;	//最初に選択される画像のインデックス
	var _canvases = [];	//panelCanvasオブジェクトの配列
	var _$divs = [];	//panelCanvasを保持するDIV（jQueryオブジェクト）の配列
	var _len = 0;	//画像配列の長さ
	var _containerWidth = 0;	//カバーフロー全体の幅
	var _clickedIndex = 0;	//カバーフローがクリックされた時の画像のインデックス
	var _maxZindex = 0;	//カバーフローの一番前面のDIVに設定するz-index
	
	var that = {};	//この関数（canvasControler()）が返すオブジェクト
	
	// 以下、publicメソッド
	// 初期化関数
	var init = function(){
		_len = _images.length;
		_containerWidth = _im_width * _len + _margin * (_len - 1);	//カバーフローの幅（各画像の幅と画像間のマージンから決定）
		$container.css('width', _containerWidth + 'px');
		_maxZindex = 100 * _len;
		var initTheta = 0;
		// canvas、DIVを準備
		for (var i=0; i< _len; i++){
			var img = new Image;
			img.src = _images[i];
			img.width = _im_width;
			img._index = i;
			img.getIndex = function(){
				return this._index;
			};
			/*
			if (i<_startIndex){
				initTheta = MIN_THETA;
			} else if(i>_startIndex){
				initTheta = MAX_THETA;
			} else{
				initTheta = 0;
			}
			var can = panelCanvas({
				img: img,
				im_w: _im_width,
				im_h: _im_height,
				theta: initTheta,
				maxZindex: _maxZindex
			});
			*/
			//_canvases.push(can);
			_canvases.push(img);
			var $d = $('<div class="item"></div>');
			_$divs.push($d);
			//$d.append(can);
			$d.append(img);
			$container.append($d);
			//can.init(i);
			var zindex = _maxZindex - 100 * Math.abs(i - _startIndex);
			var left = (i* (_im_width + _margin)) + 'px';
			$d.css({'position':'absolute', 'left':left, 'z-index':zindex});
		}
		
		// クリックされたときにその位置の画像のインデックスを覚えておく
		for(var i=0; i<_len; i++){
			if (isTouch){
				$(_canvases[i]).bind('touchstart', function(){ _clickedIndex = this.getIndex(); });
			} else {
				$(_canvases[i]).bind('mousedown', function(){ _clickedIndex = this.getIndex(); });
			}
		}
		
	};
	that.init = init;
	
	// クリックされた画像のインデックスを取得
	var getClickedIndex = function(){
		return _clickedIndex;
	};
	that.getClickedIndex = getClickedIndex;
	
	// 前面画像の変更
	var changeSelectedItem = function(oldIndex, newIndex){
		return;
		// 前面の画像が一番前に来るようにz-indexを変更
		var zi = _maxZindex;
		for (var i=0; i<_$divs.length; i++){
			zi = _maxZindex - 100*Math.abs(newIndex - i);
			_$divs[i].css("z-index", zi);
		}
		
		
		// 移動方向に合わせて、中央付近の画像を回転
		if (oldIndex - newIndex < 0){//左から右
			for (var i=oldIndex; i<=newIndex; i++){
				if (i==newIndex){
					//0°（真正面）まで回転
					if (_canvases[i]){
						_canvases[i].rotateTo(0, 0);
					}
				} else	{
					//-45°まで回転
					if (_canvases[i]){
						_canvases[i].rotateTo(-45, newIndex - i);
					}
				}
			}
		} else {//右から左
			for (var i=oldIndex; i>=newIndex; i--){
				if (i==newIndex){
					//0°（真正面）まで回転
					//0°（真正面）まで回転
					if (_canvases[i]){
						_canvases[i].rotateTo(0, 0);
					}
				} else	{
					//45°まで回転
					if (_canvases[i]){
						_canvases[i].rotateTo(45, i - newIndex);
					}
				}
			}
		}
	};
	that.changeSelectedItem = changeSelectedItem;
	
	return that;
};

// カバーフローオブジェクト関数
var coverFlow = function(param){
	if(!param) param = {};
	var _page = null;	//着物選択ページオブジェクト
	var _images = param.images || [];	//着物画像配列
	var _width = param.width || 360;	//画像１個の幅
	var _height = param.height || 360;	//画像１個の高さ
	var _margin = param.margin || 0;	//画像間のマージン
	var _wrapperWidth = param.wrapperWidth || 480;
	var _wrapperHeight = param.wrapperHeight || 400;
	var _id = param.id || "#selectView";
	var _wrapperName = _id + ' .coverflowWrapper';
	var _itemsName = _wrapperName + ' .coverflowItems';
	var $wrapper = null;	//カバーフロー外枠DIVのjQueryオブジェクト
	var $items = null;	//カバーフロー本体DIVのjQueryオブジェクト
	var _canvas = null;	//canvasControlerオブジェクト
	var _currentIndex = param.startIndex || 0;	//今、前面に表示している画像のインデックス
	var _maxLeft = 0;	//$itemsのcss:leftの最大値
	var _minLeft = 0;	//$itemsのcss:leftの最小値
	var _len = 0;	//着物画像配列の長さ
	var _slider = null;
	var _sm = storageManager();
	
	
	var that = {};	//この関数（coverFlow()）が返すオブジェクト
	
	// マウスドラッグに追随（DIVをドラッグ）
	var _trackChanging = function(difX){
		difX *= 3;
		// ドラッグされた量だけ$itemsのcss:leftをずらす。ただし一番左・右は少しだけ遊びを持たせてそれ以上はずらさない
		if ($items.position().left > _minLeft - _width*0.25 && $items.position().left < _maxLeft + _width*0.25){
			$items.css({'left': '-=' + difX + 'px'});
			//var nextX = $items.position().left - difX;
			//$items.removeClass('slideanime');
			//$items.css('transform', 'translateX(' + nextX + 'px)');
			_normalizeL($items.position().left);
		}
	};
	// ドラッグ終了
	var _trackFinished = function(curX, difX, timeSpan, rollbackL) {
		
		if (Math.abs(difX) < 20){	// ドラッグが一定量以下ならクリックとみなす
			var clickedId = _canvas.getClickedIndex();
			if (clickedId == _currentIndex){
				// 今前面に表示している画像がクリックされたらその画像のページに遷移
				if (curX >=0 && curX <= $items.width()){
					//ローカルストレージにidを保存
					_sm.setKimonoId(_currentIndex);
					location.href = "color.html";
				}
			} else {
				// それ以外の画像がクリックされたらその画像が前面にくるようにスライド
				_changeSelectedItem(_currentIndex, clickedId);
				_currentIndex = clickedId;
				if(_page) _page.selChanged();
				if(_slider) _slider.setCurrentPos(_currentIndex);
				
				var targetLeft = _maxLeft - _currentIndex * (_width + _margin);
				$items.stop().animate({'left': targetLeft + 'px'}, 'fast');
				//$items.removeClass('slideanime');
				//$items.addClass('slideanime');
				//$items.css('transform', 'translateX(' + targetLeft + 'px)');
			}
		} else { // ドラッグされた
			// フリックされたとき余分にスライドする
			if (isTouch) difX = difX * 5;	// スマホで見たときにドラッグ量が少なく感じるのは、PCのページを縮小表示しているから？
			var velocity = 0;
			if (timeSpan > 0) velocity = Math.ceil(difX / timeSpan * 30);
			var dest = $items.position().left + velocity;
			
			// 画像の中心がDIVの中心にそろうように座標を正規化
			var dest_n = _normalizeL(dest);

			// 正規化された座標位置までスライド			
			$items.stop().animate({'left': dest + 'px'}, 30).animate({'left': dest_n + 'px'}, 70);
			//$items.removeClass('slideanime');
			//$items.addClass('slideanime');
			//$items.css('transform', 'translateX(' + dest_n + 'px)');
		}
	};
	
	// 選ばれている画像が変更されたときに、その画像が前面にくるようにスライド
	// 引数（notAnimate）がtrueのときは即時移動（画面表示時）
	var _slideToCurrent = function(notAnimate){
		var targetLeft = _maxLeft - _currentIndex * (_width + _margin);
		if(notAnimate){
			$items.stop().css({'left': targetLeft + 'px'});
			//$items.css('transform', 'translateX(' + targetLeft + 'px)');
		} else {
			$items.stop().animate({'left': targetLeft + 'px'}, 'fast');
			//$items.removeClass('slideanime');
			//$items.addClass('slideanime');
			//$items.css('transform', 'translateX(' + targetLeft + 'px)');
		}
	};
	
	// 現在の選択画像を引数（inc）分スライド
	var _incrementCurrentIndex = function(inc){
		var save = _currentIndex;
		_currentIndex += inc;
		if(_currentIndex<0) _currentIndex = 0;
		if(_currentIndex>=_len) _currentIndex = _len - 1;
		
		if(save != _currentIndex){
			_changeSelectedItem(save, _currentIndex);
			_slideToCurrent();
			if (_page) _page.selChanged();
			if (_slider) _slider.setCurrentPos(_currentIndex);
		}
	};
	
	// 現在の選択画像を引数（idx）のインデックスの画像にする
	// スライダーから呼ばれるので、スライダーの更新は行わない
	var _setCurrentIndex = function(idx){
		var save = _currentIndex;
		_currentIndex = idx;
		if(_currentIndex<0) _currentIndex = 0;
		if(_currentIndex>=_len) _currentIndex = _len - 1;
		
		if(save != _currentIndex){
			_changeSelectedItem(save, _currentIndex);
			_slideToCurrent();
			if (_page) _page.selChanged();
		}
	};
	
	// 画像の表示位置が真ん中にくるようにcss:leftを調整
	var _normalizeL = function(relX){
		// relXは現在の画像リストDIVのposition.left()。左（マイナス）にいくほど、表示される画像配列はプラス
		relX = relX - _maxLeft;
		relX = -1 * relX;
		var pos = Math.floor(relX / (_width + _margin));
		
		// アイテム幅の半分以上スライドされていたら次（右）の画像を一番左に表示する
		var pos_x = relX % (_width + _margin);
		if (pos_x > (_width + _margin)/2) pos++;
		
		if (pos < 0) pos = 0;	// 左端
		if (pos > _len - 1) pos = _len - 1; // 右端
		if (_currentIndex != pos) {
			_changeSelectedItem(_currentIndex, pos);
			_currentIndex = pos;
			if (_page) _page.selChanged();
			if (_slider) _slider.setCurrentPos(_currentIndex);
		}
		
		var targetLeft = _maxLeft - _currentIndex * (_width + _margin);
		return targetLeft;
	};
	
	var _changeSelectedItem = function(oldIndex, newIndex){
		//_canvas.changeSelectedItem(oldIndex, newIndex);
	};
	
	// 「色替えする着物をクリックしてください」メッセージの明滅アニメーションをセット
	var _beginAnimation = function(){
		var $text = $(_id + ' p.label');
		var to = 1;
		$text.fadeTo(2500, to, function(){ repeatAnime(); });
		
		var repeatAnime = function(){
			to = (to == 0) ? 1 : 0;
			$text.fadeTo(2500, to, function(){ repeatAnime(); });
		};
	};
	
	// クリック・ドラッグ・マウスホイールイベント登録
	var _registerEvents = function(){
		var startX = 0;	//ドラッグ開始時のx座標
		var currentX = 0;	//ドラッグ中のx座標
		var startTime = 0;	//ドラッグ開始時刻
		var endX = 0;	//ドラッグ終了時のx座標
		var endTime = 0;	//ドラッグ終了時刻
		var left = $wrapper.offset().left;	//ラッパーDIVのdocumentに対する左x座標
		var rollBackLeft = 0; //ドラッグ開始時の画像リストDIVのposition().left
		var timerid = 0;	//setTimeoutのid
		
		if (isTouch) {
			$wrapper.bind('touchstart', function(ev){
				ev.preventDefault();
				clearTimeout(timerid);
				
				var pageX = event.changedTouches[0].pageX;
				startX = pageX - left;
				currentX = pageX - left;
				startTime = (new Date()).getTime();
				rollbackLeft = $items.position().left;
				$(document).bind('touchmove', _touchmove).bind('touchend', _touchend);
			});
			var _touchmove = function(ev){
				ev.stopPropagation();
				ev.preventDefault();
				clearTimeout(timerid);
				
				var pageX = event.changedTouches[0].pageX;
				var nowX = pageX - left;
				var difX = currentX - nowX;
				
				timerid = setTimeout(function(){ _trackChanging(difX); }, 0);
				currentX = nowX;
				return false;
			};
			var _touchend = function(ev){
				ev.stopPropagation();
				ev.preventDefault();
				$(document).unbind('touchend', _touchend).unbind('touchmove', _touchmove);
				clearTimeout(timerid);
				
				var pageX = event.changedTouches[0].pageX;
				endX = pageX - left;
				endTime = (new Date()).getTime();
				var relX = endX - $items.position().left;
				var difX = endX - startX;
				var span = endTime - startTime;
				timerid = setTimeout(function(){ _trackFinished(relX, difX, span, rollbackLeft); }, 10);
				return false;
			};
		} else {
			$wrapper.bind('mousedown', function(ev){
				ev.preventDefault();
				clearTimeout(timerid);

				startX = ev.pageX - left;
				currentX = ev.pageX - left;
				startTime = (new Date()).getTime();
				rollbackLeft = $items.position().left;
				$(document).bind('mousemove', _mousemove).bind('mouseup', _mouseup);
			});
			
			var _mousemove = function(ev){
				ev.stopPropagation();
				ev.preventDefault();
				clearTimeout(timerid);
				
				var nowX = ev.pageX - left;
				var difX = currentX - nowX;

				timerid = setTimeout(function(){ _trackChanging(difX); }, 0);
				currentX = nowX;
				return false;
			};
			var _mouseup = function(ev){
				ev.stopPropagation();
				ev.preventDefault();
				$(document).unbind('mouseup', _mouseup).unbind('mousemove', _mousemove);
				clearTimeout(timerid);
				
				endX = ev.pageX - left;
				endTime = (new Date()).getTime();
				var relX = endX - $items.position().left;
				var difX = endX - startX;
				var span = endTime - startTime;
				timerid = setTimeout(function(){ _trackFinished(relX, difX, span, rollbackLeft); }, 10);
				return false;
			};
		}
		
	};
	
	// 以下、publicメソッド
	// 初期化関数。引数：着物選択ページオブジェクト
	var init = function(page){
		_page = page;
		$wrapper = $(_wrapperName);
		$wrapper.css({ width: _wrapperWidth, height: _wrapperHeight });
		$items = $(_itemsName);
		_len = _images.length;

		// canvasControlerオブジェクト生成・初期化
		_canvas = canvasControler({
			images:_images,
			container:$items,
			width: _width,
			height: _height,
			margin: _margin,
			startIndex: _currentIndex
		});
		_canvas.init();
		
		// $itemsのcss:leftの最大・最小・現在位置セット
		_maxLeft = $wrapper.width() * 0.5 - _width * 0.5;
		$items.css('left', _maxLeft + 'px');
		//$items.css('transform', 'translateX(' + _maxLeft + 'px)'); 
		_minLeft = _maxLeft + _width - $items.width();
		_slideToCurrent(true);
		
		// commonStepSliderオブジェクト生成・初期化
		_slider = commonStepSlider({
			name: '#selectView .coverflowSlider',
			handleName: '.slider-handle',
			length: _len,
			startIndex: _currentIndex
		});
		_slider.init(that);
		
		// テキスト明滅アニメーション開始
		_beginAnimation();
		
		// クリック・ドラッグイベント登録
		_registerEvents();
	};
	that.init = init;
	
	// 今、カバーフローで選ばれている画像のインデックスを返す
	var getCurrentIndex = function(){
		return _currentIndex;
	};
	that.getCurrentIndex = getCurrentIndex;
	
	// 今、カバーフローで選ばれている画像のインデックスをセット（スライダーから通知を受ける）
	var setCurrentIndex = function(idx){
		_setCurrentIndex(idx);
	};
	that.setCurrentIndex = setCurrentIndex;
	
	return that;
};

(function($, self){

if(!$ || !self) {
	return;
}

for(var i=0; i<self.properties.length; i++) {
	var property = self.properties[i],
		camelCased = StyleFix.camelCase(property),
		PrefixCamelCased = self.prefixProperty(property, true);
	
	$.cssProps[camelCased] = PrefixCamelCased;
}

})(window.jQuery, window.PrefixFree);

// JavaScript Document

// 
var helpNav = function(param){
	if(!param) param = {};
	var _id = "#helpNav";
	var $self = null;
	var $saveHand = null;
	var $saveComment = null;
	var $linkArea = null;
	var $homeComment = null;
	var $homeButton = null;
	var $pinchHand = null;
	var $pinchComment = null;
	var $tapHand = null;
	var $tapComment = null;
	var $tapPush = null;
	var _saveTimer = 0;
	var _pinchTimer = 0;
	var _tapTimer = 0;
	
	var _nscale = param.nscale || 1;
	var that = {};	//この関数が返すオブジェクト
	
	//タッチイベント登録
	var _registerEvents = function(){
		//「ホームページを見る」ボタンを押されたときは画面はそのまま
		$("#helpNav p a").bind('touchstart', function(event){
			event.stopPropagation();
			return true;
		});
		//ホームページを見る」ボタン以外をタッチされたら消える
		$self.bind('touchstart', function(ev){
			ev.preventDefault();
			clearTimeout(_saveTimer);
			clearTimeout(_pinchTimer);		
			clearTimeout(_tapTimer);
			$tapHand.stop();
			$self.css("display", "none");
		});
	};
	
	//指画像のアニメ開始
	var _startAnimation = function(){
		//保存ボタンを押す指アクション
		clearTimeout(_saveTimer);
		var _scaleUp = function(){
			clearTimeout(_saveTimer);
			$saveHand.attr("width", Math.round(2.9*_nscale));
			_saveTimer = setTimeout(_scaleDown, 200);
		};
		var _scaleDown = function(){
			clearTimeout(_saveTimer);
			$saveHand.attr("width", Math.round(3*_nscale));
			_saveTimer = setTimeout(_scaleUp, 1600);
		};
		_saveTimer = setTimeout(_scaleUp, 1200);
		
		//ピンチイン・アウト画像切替
		clearTimeout(_pinchTimer);
		var _toPinchOut = function(){
			clearTimeout(_pinchTimer);
			$pinchHand.attr("src", "images/img_hand_pinchout.png");
			_pinchTimer = setTimeout(_toPinchIn, 1000);
		};
		var _toPinchIn = function(){
			clearTimeout(_pinchTimer);
			$pinchHand.attr("src", "images/img_hand_pinchin.png");
			_pinchTimer = setTimeout(_toPinchOut, 1000);
		};
		_pinchTimer = setTimeout(_toPinchOut, 1000);
		
		//カラータップアニメ
		clearTimeout(_tapTimer);
		var _tapAnime = function(){
			clearTimeout(_tapTimer);
			$tapHand.stop().animate({"left":"+=" + Math.round(1*_nscale) + "px"}, 1000)
			.animate({"left":"+=0px"}, 500)
			.animate({"left":"-=" + Math.round(1*_nscale) + "px"}, 1000);
			_tapTimer = setTimeout(_tapAnime, 3000);
		};
		_tapAnime();
	};
	
	//各画像のサイズ・位置調整
	var _setPosition = function(){		
		var baseX = 0;
		var baseY = 0;
		//保存
		baseX = $("#tabBar p.btnAction").offset().left;
		baseY = $("#tabBar p.btnAction").offset().top;
		$saveHand.attr("width", Math.round(3*_nscale));
		$saveHand.css({"left":Math.round(baseX + 0*_nscale) + "px", "top":Math.round(baseY + 0.3*_nscale) + "px", "z-index":101});
		$saveComment.attr("width", Math.round(4*_nscale));
		$saveComment.css({"left":Math.round(baseX - 2.7*_nscale) + "px", "top":Math.round(baseY + 1.8*_nscale) + "px", "z-index":102});
		
		//ホームページへのリンクエリア
		baseX = $("#kimonoPainter").offset().left;
		baseY = $("#kimonoPainter").offset().top;
		$linkArea.css({"width":Math.round(8*_nscale) + "px","left":Math.round(baseX + 0.3*_nscale) + "px", "top":Math.round(baseY + 2.5*_nscale) + "px"});
		$homeComment.attr("width", Math.round(8*_nscale));
		$homeComment.css({"left":0,"top":0});
		$homeButton.attr("width", Math.round(5.2*_nscale));
		$homeButton.css({"left":Math.round(1.4*_nscale) + "px", "top":Math.round(1.7*_nscale) + "px"});
		
		//ピンチ
		baseX = $("#kimonoPainter").offset().left;
		baseY = $("#kimonoPainter").offset().top;
		$pinchHand.attr("width", Math.round(3*_nscale));
		$pinchHand.css({"left":Math.round(baseX + 2.5*_nscale) + "px", "top":Math.round(baseY + 5.8*_nscale) + "px", "z-index":103});
		$pinchComment.attr("width", Math.round(4*_nscale));
		$pinchComment.css({"left":Math.round(baseX + 0*_nscale) + "px", "top":Math.round(baseY + 7.5*_nscale) + "px", "z-index":104});
		
		//タップ
		baseX = $("#tonePicker").offset().left;
		baseY = $("#tonePicker").offset().top;
		$tapPush.attr("width", Math.round(3*_nscale));
		$tapPush.css({"left":Math.round(baseX + 2.5*_nscale) + "px", "top":Math.round(baseY + 0.2*_nscale) + "px", "z-index":105});
		$tapHand.attr("width", Math.round(3*_nscale));
		$tapHand.css({"left":Math.round(baseX + 2.8*_nscale) + "px", "top":Math.round(baseY + 0.5*_nscale) + "px", "z-index":106});
		$tapComment.attr("width", Math.round(4*_nscale));
		$tapComment.css({"left":Math.round(baseX + 4.2*_nscale) + "px", "top":Math.round(baseY - 1.1*_nscale) + "px", "z-index":107});
		
		
	};
	
	//以下publicメソッド
	//初期化
	var init = function(){
		$self = $(_id);
		$saveHand = $(_id + " .saveHand");
		$saveComment = $(_id + " .saveComment");
		$linkArea = $(_id + " .linkArea");
		$homeComment = $(_id + " .homeComment");
		$homeButton = $(_id + " .homeButton");
		$pinchHand = $(_id + " .pinchHand");
		$pinchComment = $(_id + " .pinchComment");
		$tapHand = $(_id + " .tapHand");
		$tapComment = $(_id + " .tapComment");
		$tapPush = $(_id + " .tapPush");
		
		//位置調整
		_setPosition();
		//アニメ開始
		_startAnimation();
		// ボタンクリックイベント登録
		_registerEvents();
		
		$self.css("display", "block");
	};
	that.init = init;
	
	
	return that;
};


// JavaScript Document

// 色相選択スライダーオブジェクト関数
var huePicker = function(param){
	if(!param) param = {};
	var _cpicker = null; //カラーピッカーオブジェクト（コントロールクラス）
	var _id = 'huePicker'; //色相選択DIVのid
	var _width = param.width || 620; //色相canvasの幅
	var _height = param.height; //色相canvasの高さ
	var _step = 0.166666666666667; //色相グラデーションのcolorStopステップ幅
	var _locs = [	//色相グラデーションのcolorStop位置
		0,
		_step,
		_step * 2,
		_step * 3,
		_step * 4,
		_step * 5,
		1
	];
	var _colors = [	//色相グラデーションのcolorStop位置に対応する色
		'rgb(255, 0, 0)',
		'rgb(255, 255, 0)',
		'rgb(0, 255, 0)',
		'rgb(0, 255, 255)',						
		'rgb(0, 0, 255)',
		'rgb(255, 0, 255)',
		'rgb(255, 0, 0)'
	];
	var _self = null; //色相選択DIV要素
	var $self = null; //色相選択DIVのjqueryオブジェクト
	var _canvas = null; //色相canvas
	var _context = null; //色相canvasの2dコンテキスト
	var _currentPos = 0.0; //現在選ばれている色相位置（0～1）
	if (param.hue){
		_currentPos = param.hue/360.0;
	}
	var $curDiv = null; //現在選ばれている色相位置インジケータを保有するDIVのjqueryオブジェクト
	
	var that = {}; //この関数（huePicker）で返すhuePickerオブジェクト
	
	// 下地のグラデーション描画
	var _drawGradation = function() {
		if( ! _canvas  || ! _context ) return;

		_context.beginPath();
		var grad = _context.createLinearGradient(0,0, _width, 0);
		for (var i = 0; i<_locs.length; i++) {
			grad.addColorStop(_locs[i], _colors[i]);
		}
		_context.fillStyle = grad;
		_context.rect(0, 0, _width, _height);
		_context.fill();
	};
	
	// 現在位置の三角形描画
	var _drawCurrentPosition = function() {
		var curDiv = $curDiv.get(0);
		var posCanvas = document.createElement('canvas');
		posCanvas.width = $curDiv.width();
		posCanvas.height = $curDiv.height();
		var curHeight = Math.round(0.4 * posCanvas.height);
		curDiv.appendChild(posCanvas);
		//posCanvas = G_vmlCanvasManager.initElement(posCanvas);
		posContext = posCanvas.getContext('2d');
		if( ! posCanvas  || ! posContext ) return;
		posContext.fillStyle = '#000000';
		posContext.strokeStyle = '#ffffff';
		posContext.beginPath();
		posContext.moveTo(0,0);
		posContext.lineTo(10,0);
		posContext.lineTo(5,curHeight);
		posContext.closePath();	
		posContext.fill();
		posContext.stroke();
		posContext.beginPath();
		posContext.moveTo(5,(posCanvas.height - curHeight));
		posContext.lineTo(10,posCanvas.height);
		posContext.lineTo(0,posCanvas.height);
		posContext.closePath();
		posContext.fill();
		posContext.stroke();
	};
	
	// 現在位置の三角形を動かす（三角形を囲んでいるdiv要素を動かしている）
	var _updateCurrentPosition = function() {
		var curLeft = _width * _currentPos - 5;	// currentPosは0～1の相対値
		//$curDiv.css('left', curLeft + 'px');
		$curDiv.css('transform', 'translateX(' + curLeft + 'px)');
	};
		
	// マウスクリック・ドラッグに追随
	_trackChanging = function(x, offset_l) {
		_currentPos = ((x - offset_l)/_width);
		if (_currentPos < 0.005) _currentPos = 0.0;
		if (_currentPos > 0.995) _currentPos = 1.0;
		
		// 現在位置を更新
		_updateCurrentPosition();
		// コントロールオブジェクトに通知
		_cpicker.hueChanged();
	};
	
	// マウスイベント登録
	var _registerEvent = function(){
		var timerid; // setTimeoutのid
		var $that;	// setTimeoutのコールバック関数に渡すためにjqueryオブジェクトを保持
		var pageX;	// X座標

		// タッチパネル（スマホ）とマウスでイベント分ける（内部処理はほぼ同じ）
		if(isTouch){
			$self.bind('touchstart', function(ev){
				ev.preventDefault();
				$that = $(this);
				clearTimeout(timerid);
				pageX = event.changedTouches[0].pageX;
				timerid = setTimeout(function(){ _trackChanging(pageX, $that.offset().left); }, 0);
				$(document).bind('touchmove', _touchmove).bind('touchend', _touchend);
			});
			var _touchmove = function(ev){
				ev.stopPropagation();
				ev.preventDefault();
				clearTimeout(timerid);
				pageX = event.changedTouches[0].pageX;
				timerid = setTimeout(function(){ _trackChanging(pageX, $that.offset().left); },5);
				return false;
			};
			var _touchend = function(ev){
				ev.stopPropagation();
				ev.preventDefault();
				$(document).unbind('touchend', _touchend).unbind('touchmove', _touchmove);
				return false;
			};
			
		} else {
			$self.bind('mousedown', function(ev){
				ev.preventDefault();
				$that = $(this);
				clearTimeout(timerid);
				timerid = setTimeout(function(){ _trackChanging(ev.pageX, $that.offset().left); }, 0);
				$(document).bind('mousemove', _mousemove).bind('mouseup', _mouseup);
			});
			var _mousemove = function(ev){
				ev.stopPropagation();
				ev.preventDefault();
				clearTimeout(timerid);
				timerid = setTimeout(function(){ _trackChanging(ev.pageX, $that.offset().left); },0);
				return false;
			};
			var _mouseup = function(ev){
				ev.stopPropagation();
				ev.preventDefault();
				$(document).unbind('mouseup', _mouseup).unbind('mousemove', _mousemove);
				return false;
			};
		}
	};
	
	// 以下publicメソッド
	// 色相選択スライダー初期化
	var init = function (cpicker) {
		_cpicker = cpicker;	// コントロールオブジェクト（colorPicker）登録
		_self = document.getElementById(_id);
		$self = $("#" + _id);
		
		// 色相グラデーションcanvas準備
		_canvas = document.createElement('canvas');
		_canvas.width = _width;
		_canvas.height = _height;
		_self.appendChild(_canvas);
		//_canvas = G_vmlCanvasManager.initElement(_canvas);
		_context = _canvas.getContext('2d');
		_drawGradation();
		
		// 現在位置インジケータ準備
		$curDiv = $('<div style="position: absolute; left:0px; top:0px;"></div>');
		$curDiv.width(10);
		$curDiv.height(_height);
		$self.append($curDiv);
		_drawCurrentPosition();
		_updateCurrentPosition();	
		
		// クリック・ドラッグイベント登録
		_registerEvent();
	};
	that.init = init;
	
	// 現在位置をセット：色相（0°～360°）を相対位置（0～1）に変換
	var setHue = function(hue){
		_currentPos = hue/360.0;
		// 現在位置インジケータ更新
		_updateCurrentPosition();
	};
	that.setHue = setHue;
	
	// 現在位置の色相を取得：相対位置（0～1）を色相（0°～360°）に変換
	var getHue = function(){
		return Math.round(_currentPos*360);
	};
	that.getHue = getHue;
	
	return that;
};

// 色調（彩度＋明度）選択ピッカーオブジェクト関数
var tonePicker = function(param){
	if(!param) param = {};
	var _cpicker = null;	//カラーピッカーオブジェクト（コントロールクラス）
	var _id = 'tonePicker';	//色調選択DIVのid
	var _width = param.width || 620;	//色調canvasの幅
	var _height = param.height || 120;	//色調canvasの高さ
	var _self = null;	//色調選択DIV要素
	var $self = null;	//色調選択DIVのjqueryオブジェクト
	var _canvas = null;	//色調canvas要素
	var _context = null;	//色調canvasの2dコンテキスト
	var _currentBaseColor = param.basecolor || 'rgb(255, 0, 0)';	//現在の色相
	var _currentPos = { x: 0.0, y: 0.0 };		//色調canvasの現在位置（0～1）	
	var $curDiv = null;	//現在位置インジケータを保持するDIVのjqueryオブジェクト
	
	var that = {};	//この関数（tonePicker()）で返すtonePickerオブジェクト
	//微調整ボタン用定数定義
	var BUTTON_TOP = 0;
	that.BUTTON_TOP = BUTTON_TOP;
	var BUTTON_RIGHT = 1;
	that.BUTTON_RIGHT = BUTTON_RIGHT;
	var BUTTON_BOTTOM = 2;
	that.BUTTON_BOTTOM = BUTTON_BOTTOM;
	var BUTTON_LEFT = 3;
	that.BUTTON_LEFT = BUTTON_LEFT;
	
	// SV（彩度・明度）の値から現在位置（0～1）をセット
	var _setCurrentPosition = function(hsv) {
		_currentPos.x = hsv.s/100.0;	// 彩度は0～100
		_currentPos.y = (100 - hsv.v)/100.0;	// 明度は0～100・座標反転
		if(_currentPos.y < 0) _currentPos.y = 0.0;
		if(_currentPos.y > 1) _currentPos.y = 1.0;
	};
	if (param.hsv){
		_setCurrentPosition(param.hsv);
	}
	
	// 色調グラデーション描画
	var _drawGradation = function(){
		if ( ! _canvas || ! _context ) { return false; }
		
		// 一旦クリア
		_context.clearRect(0,0, _width, _height);
		_context.beginPath();
		
		// 白→選択色相のグラデーションを左から右に描画
		var grad = _context.createLinearGradient(0,0, _width,0);
		grad.addColorStop(0, 'rgb(255, 255, 255)');
		grad.addColorStop(1, _currentBaseColor);
		_context.fillStyle = grad;
		_context.rect(0, 0, _width, _height);
		_context.fill();
		
		// 明度（アルファ）0→1のグラデーションを上から下に描画
		var transgrad = _context.createLinearGradient(0,0, 0,_height);
		transgrad.addColorStop(0, 'rgba(0, 0, 0, 0)');
		transgrad.addColorStop(1, 'rgba(0, 0, 0, 1)');
		_context.fillStyle = transgrad;
		_context.rect(0, 0, _width, _height);
		_context.fill();
	};
	
	// 現在位置インジケータ（circle.png）を描画
	var _drawCurrentPosition = function() {
		var curDiv = $curDiv.get(0);
		var posCanvas = document.createElement('canvas');
		posCanvas.width = $curDiv.width();
		posCanvas.height = $curDiv.height();
		curDiv.appendChild(posCanvas);
		//posCanvas = G_vmlCanvasManager.initElement(posCanvas);
		posContext = posCanvas.getContext('2d');
		if( ! posCanvas  || ! posContext ) return;
		var img = new Image();
		img.src = 'images/circle.png';
		posContext.drawImage(img, 0,0);
	};
	
	// 現在位置インジケータの位置を更新
	var _updateCurrentPosition = function() {
		var curLeft = _width * _currentPos.x - 10;
		var curTop = _height * _currentPos.y - 10;
		//$curDiv.css('left', curLeft + 'px').css('top', curTop + 'px');
		$curDiv.css('transform', 'translate(' + curLeft + 'px, ' + curTop + 'px)');
	};
	
	
	
	// マウスクリック・ドラッグに追随
	var _trackChanging = function(x, y, offset_l, offset_t) {
		_currentPos.x = ((x - offset_l)/_width);
		if (_currentPos.x < 0.005) _currentPos.x = 0.0;
		if (_currentPos.x > 0.995) _currentPos.x = 1.0;
		_currentPos.y = ((y - offset_t)/_height);
		if (_currentPos.y < 0.005) _currentPos.y = 0.0;
		if (_currentPos.y > 0.995) _currentPos.y = 1.0;
		
		// 現在位置インジケータ更新
		_updateCurrentPosition();
		// 現在位置の色調をコントロールオブジェクトに通知
		_cpicker.toneChanged();
	};
	
	// マウスイベント登録
	var _registerEvent = function(){
		var timerid; //setTimeoutのid
		var $that;	//setTimeoutのコールバック関数に渡すためのオブジェクト保持
		var pageX;	//x座標
		var pageY;	//y座標
		
		// タッチパネル（スマホ）とマウスで登録イベントを分ける。処理の中身は大体同じ
		if(isTouch){
			$self.bind('touchstart', function(ev){
				ev.preventDefault();
				$that = $(this);
				clearTimeout(timerid);
				pageX = event.changedTouches[0].pageX;
				pageY = event.changedTouches[0].pageY;
				timerid = setTimeout(function(){ _trackChanging(pageX, pageY, $that.offset().left, $that.offset().top); }, 0);
				$(document).bind('touchmove', _touchmove).bind('touchend', _touchend);
			});
			var _touchmove = function(ev){
				ev.stopPropagation();
				ev.preventDefault();
				clearTimeout(timerid);
				pageX = event.changedTouches[0].pageX;
				pageY = event.changedTouches[0].pageY;
				timerid = setTimeout(function(){ _trackChanging(pageX, pageY, $that.offset().left, $that.offset().top); },5);
				return false;
			};
			var _touchend = function(ev){
				ev.stopPropagation();
				ev.preventDefault();
				$(document).unbind('touchend', _touchend).unbind('touchmove', _touchmove);
				return false;
			};
		} else {
			$self.bind('mousedown', function(ev){
				ev.preventDefault();
				$that = $(this);
				clearTimeout(timerid);
				timerid = setTimeout(function(){ _trackChanging(ev.pageX, ev.pageY, $that.offset().left, $that.offset().top); }, 0);
				$(document).bind('mousemove', _mousemove).bind('mouseup', _mouseup);
			});
			var _mousemove = function(ev){
				ev.stopPropagation();
				ev.preventDefault();
				clearTimeout(timerid);
				timerid = setTimeout(function(){ _trackChanging(ev.pageX, ev.pageY, $that.offset().left, $that.offset().top); },0);
				return false;
			};
			var _mouseup = function(ev){
				ev.stopPropagation();
				ev.preventDefault();
				$(document).unbind('mouseup', _mouseup).unbind('mousemove', _mousemove);
				return false;
			};
		}
	};
	
	// 以下publicメソッド
	// 色調選択ピッカー初期化
	var init = function(cpicker){
		_cpicker = cpicker;	//コントロールオブジェクト（colorPicker）登録
		
		_self = document.getElementById(_id);
		$self = $("#" + _id);
		
		// 色調グラデーション準備
		_canvas = document.createElement('canvas');
		_canvas.width = _width;
		_canvas.height = _height;
		$(_canvas).css({"position":"absolute", "width":_width+"px", "height":_height+"px", "left":"0px", "top":"0px", "z-index":5});
		_self.appendChild(_canvas);
		_context = _canvas.getContext('2d');
		_drawGradation();
		
		// 現在位置インジケータ準備
		$curDiv = $('<div style="position: absolute; left:0px; top:0px; width:20px; height:20px; z-index:10; "></div>');
		$self.append($curDiv);
		_drawCurrentPosition();
		_updateCurrentPosition();
		
		// クリック・ドラッグイベント登録
		_registerEvent();
	};
	that.init = init;
	
	// 色をセット：現在の色相のRGBと彩度・明度オブジェクト
	var setColor = function(basecolor, hsv){
		_currentBaseColor = basecolor;
		_setCurrentPosition(hsv);
		_drawGradation();
		_updateCurrentPosition();
		$self.css("display", "none");
		setTimeout(function(){$self.css("display", "block");}, 0);
	};
	that.setColor = setColor;
	
	// 彩度（1～100）を取得
	var getSaturation = function(){
		return _currentPos.x * 100;
	};
	that.getSaturation = getSaturation;
	
	// 明度（1～100）を取得：現在位置と座標反転
	var getValue = function(){
		return 100 - (_currentPos.y * 100);
	};
	that.getValue = getValue;
	
	//微調整ボタンが押された
	var slidePos = function(btn){
		var bChanged = false;
		switch (btn){
			case BUTTON_TOP://上ボタン（明度上げる）
				if (_currentPos.y>0.0){
					_currentPos.y -= 0.01;
					if (_currentPos.y<0.0) _currentPos.y = 0.0;
					bChanged = true;
				}
				break;
			case BUTTON_RIGHT://右ボタン（彩度上げる）
				if (_currentPos.x < 1.0){
					_currentPos.x += 0.01;
					if (_currentPos.x>1.0) _currentPos.x = 1.0;
					bChanged = true;
				}
				break;
			case BUTTON_BOTTOM://下ボタン（明度下げる）
				if (_currentPos.y<1.0){
					_currentPos.y += 0.01;
					if (_currentPos.y>1.0) _currentPos.y = 1.0;
					bChanged = true;
				}
				break;
			case BUTTON_LEFT://左ボタン（彩度下げる）
				if (_currentPos.x > 0.0){
					_currentPos.x -= 0.01;
					if (_currentPos.x<0.0) _currentPos.x = 0.0;
					bChanged = true;
				}
				break;
		}
		if (bChanged){
			// 現在位置インジケータ更新
			_updateCurrentPosition();
			// 現在位置の色調をコントロールオブジェクトに通知
			_cpicker.toneChanged();
		}
	};
	that.slidePos = slidePos;
	
	return that;
};

//色調微調整ボタンオブジェクト関数
var toneButton = function(param){
	if(!param) param = {};
	var _tonepicker = null;
	var $self = null;
	var _width;
	var _height;
	var _img_long;//ボタン画像の長辺長さ
	var _img_short;//ボタン画像の短辺長さ
	var _img_middle_point;//ボタン画像書き出し座標
	var _id = "#toneButtonArea";
	var _canvas = null;
	var _ctx = null;
	var _img_top = null;
	var _img_top_selected = null;
	var _img_right = null;
	var _img_right_selected = null;
	var _img_bottom = null;
	var _img_bottom_selected = null;
	var _img_left = null;
	var _img_left_selected = null;
	
	var _target = 0;//タップされたボタンを記憶
	
	var that = {};
	
	//画像オブジェクト準備
	var _prepareImage = function(){
		_img_top = new Image();
		_img_top.src = 'images/img_select_top.png';
		_img_top_selected = new Image();
		_img_top_selected.src = 'images/img_select_top_selected.png';
		
		_img_right = new Image();
		_img_right.src = 'images/img_select_right.png';
		_img_right_selected = new Image();
		_img_right_selected.src = 'images/img_select_right_selected.png';
		
		_img_bottom = new Image();
		_img_bottom.src = 'images/img_select_bottom.png';
		_img_bottom_selected = new Image();
		_img_bottom_selected.src = 'images/img_select_bottom_selected.png';
		
		_img_left = new Image();
		_img_left.src = 'images/img_select_left.png';
		_img_left_selected = new Image();
		_img_left_selected.src = 'images/img_select_left_selected.png';
		
	};
	
	//ボタン画像描画
	var _paint = function(){
		if(!_canvas || !_ctx) return;
		
		_ctx.fillStyle = "#fff";
		_ctx.fillRect(0,0, _width, _height);
		
		_drawTop();
		_drawRight();
		_drawBottom();
		_drawLeft();
	};
	var _drawTop = function(){
		_ctx.drawImage(_img_top, 4,0, _img_long, _img_short);
	};
	var _drawTopSelected = function(){
		_ctx.drawImage(_img_top_selected, 4,0, _img_long, _img_short);
	};
	var _drawRight = function(){
		_ctx.drawImage(_img_right, _img_middle_point,4, _img_short, _img_long);
	};
	var _drawRightSelected = function(){
		_ctx.drawImage(_img_right_selected, _img_middle_point,4, _img_short, _img_long);
	};
	var _drawBottom = function(){
		_ctx.drawImage(_img_bottom, 4,_img_middle_point, _img_long,_img_short);
	};
	var _drawBottomSelected = function(){
		_ctx.drawImage(_img_bottom_selected, 4,_img_middle_point, _img_long,_img_short);
	};
	var _drawLeft = function(){
		_ctx.drawImage(_img_left, 0,4, _img_short, _img_long);
	};
	var _drawLeftSelected = function(){
		_ctx.drawImage(_img_left_selected, 0,2, _img_short, _img_long);
	};
	
	//ボタンが押された
	//どの位置のボタンが押されたかを判定し、覚えておく, 押された画像描画
	var _buttonDown = function(x, y){
		
		//ヒットテスト
		var y2 = _width - x;
		if (x>y){//TOPかRIGHT
			if(y>y2){//RIGHT
				_target = _tonepicker.BUTTON_RIGHT;
			} else {//TOP
				_target = _tonepicker.BUTTON_TOP;
			}
		} else {//BOTTOMかLEFT
			if(y>y2){//BOTTOM
				_target = _tonepicker.BUTTON_BOTTOM;
			} else {//LEFT
				_target = _tonepicker.BUTTON_LEFT;
			}
		}
		switch (_target){
			case _tonepicker.BUTTON_TOP:
				_drawTopSelected();
				break;
			case _tonepicker.BUTTON_RIGHT:
				_drawRightSelected();
				break;
			case _tonepicker.BUTTON_BOTTOM:
				_drawBottomSelected();
				break;
			case _tonepicker.BUTTON_LEFT:
				_drawLeftSelected();
				break;
		}
	};
	//ボタンアップ
	//ボタンダウンで押されたボタンの処理を行い、画像を戻す
	var _buttonUp = function(){
		switch (_target){
			case _tonepicker.BUTTON_TOP:
				_drawTop();
				break;
			case _tonepicker.BUTTON_RIGHT:
				_drawRight();
				break;
			case _tonepicker.BUTTON_BOTTOM:
				_drawBottom();
				break;
			case _tonepicker.BUTTON_LEFT:
				_drawLeft();
				break;
		}
		_tonepicker.slidePos(_target);
	};
	
	//タップイベント登録
	var _registerEvents = function(){
		var baseX;
		var baseY;
		var pageX;
		var pageY;
		$self.bind('touchstart', function(ev){
			ev.preventDefault();
			
			baseX = $self.offset().left;
			baseY = $self.offset().top;
			pageX = event.changedTouches[0].pageX;
			pageY = event.changedTouches[0].pageY;
			_buttonDown(pageX-baseX, pageY-baseY);
			$(document).bind('touchend', _touchend);
		});
		
		var _touchend = function(ev){
			ev.stopPropagation();
			ev.preventDefault();
			$(document).unbind('touchend', _touchend);
			_buttonUp();
		};
	};
	
	//初期化
	var init = function(tonepicker){
		_tonepicker = tonepicker;
		$self = $(_id);
		_width = $self.width();
		_height = $self.height();
		
		_img_long = (_width%2==0) ? _width - 8 : _width - 9; //画像の長辺は偶数がいい
		_img_short = 0.5 * _img_long;
		_img_middle_point = _img_long - _img_short + 8;
		
		_canvas = document.createElement('canvas');
		_canvas.width = _width;
		_canvas.height = _height;
		$(_canvas).css({"position":"relative", "width":_width+"px", "height":_height+"px"});
		$self.append(_canvas);
		_ctx = _canvas.getContext('2d');
		
		_prepareImage();
		_paint();
		
		_registerEvents();
	};
	that.init = init;
	
	return that;
};

// カラーピッカーオブジェクト関数（色相選択オブジェクトhuePickerと色調選択オブジェクトtonePickerをコントロール）
var colorPicker = function(param){
	if(!param) param = {};
	var _cpage = null;	//色替えページコントロールオブジェクト
	var _curRGB = 'rgb(0, 0, 0)';	//現在の色（RGB）
	var _curHSV = {h:0, s:0.0, v:0.0};	//現在の色（HSV）
	var _selectedClassName = "#colorSelectView .selectedColor p";	// 選択色を表示するp要素のクラス名
	var $selectedColorPanel = null;	// 選択色を表示するp要素のjqueryオブジェクト
	var _nscale = param.nscale || 24;
	var _huePicker = null;
	var _tonePicker = null;
	var _toneButton = null;
	
	var that = {};	//この関数（colorPiker()）で返すcolorPickerオブジェクト
	
	// RGB文字列（例：'rgb(255, 122, 122)'）をHSVオブジェクトに変換
	var _rgb2hsv = function(rgb){
		var r, g, b, h, s, v, min, delta;
		r = 0.0;
		g = 0.0;
		b = 0.0;
		if(rgb.match(/(\d+),\s+(\d+),\s+(\d+)/)){
			r = RegExp.$1 / 255.0;
			g = RegExp.$2 / 255.0;
			b = RegExp.$3 / 255.0;
		}

		if (r > g){
		  v = Math.max(r, b);
		  min = Math.min(g, b);
		}else{
		  v = Math.max(g, b);
		  min = Math.min(r, b);
		}
		
		delta = v - min;
		
		if (v == 0.0){
		  s = 0.0;
		}else{
		  s = delta / v;
		}
		
		if (s == 0.0){
		  h = 0;
		}else{
		  if (r == v){
			 h = 60.0 * (g - b) / delta;
		  }else if (g == v){
			 h = 120 + 60.0 * (b - r) / delta;
		  }else{
			 h = 240 + 60.0 * (r - g) / delta;
		  }
		  
		  if (h < 0.0)  { h += 360.0; }
		
		  if (h > 360.0){ h -= 360.0; }
		}
		
		h = Math.round(h)
		if (h == 360){h = 0;}
		s = s*100.0;
		v = v*100.0;
		return {h:h,s:s,v:v};
	};
	
	// HSVオブジェクトをRGB文字列に変換
	var _hsv2rgb = function(hsv){
		var h, s, v, h_temp;
		var f, vs, p, q, t;
		var i;
		var r, g, b;
		
		if ( hsv.s === 0 ){
		  r = hsv.v/100.0;
		  g = hsv.v/100.0;
		  b = hsv.v/100.0;
		}else{
		  h = hsv.h;
		  s = hsv.s/100.0;
		  v = hsv.v/100.0;
		
		  if (h == 360){
			h_temp = 0;
		  }else{
			h_temp = h / 60;
		  }
		  i = Math.floor (h_temp);
		  f = h_temp - i;

		  vs = v * s;
		  p  = v - vs;
		  q = v - vs * f;
		  t = v - vs * (1-f);
		
		  switch (i){
			case 0:
			  r = v;
			  g = t;
			  b = p;
			  break;
		
			case 1:
			  r = q;
			  g = v;
			  b = p;
			  break;
		
			case 2:
			  r = p;
			  g = v;
			  b = t;
			  break;
		
			case 3:
			  r = p;
			  g = q;
			  b = v;
			  break;
		
			case 4:
			  r = t;
			  g = p;
			  b = v;
			  break;
		
			case 5:
			  r = v;
			  g = p;
			  b = q;
			  break;
		  }
		}
		r = Math.round(r*255.0);
		g = Math.round(g*255.0);
		b = Math.round(b*255.0);
		return 'rgb(' + r + ', ' + g + ', ' + b + ')';
	};
	
	// 色相を彩度100%・明度100%のRGB文字列に変換
	var _h2rgb = function(h){
		return _hsv2rgb({h:h, s:100, v:100});
	};
	
	// 現在の選択色表示を更新
	var _updateSelectedColor = function(){
		if ($selectedColorPanel) $selectedColorPanel.css('background-color', _curRGB);
	};
	
	// 以下publicメソッド
	// カラーピッカー初期化
	var init = function (cpage, color) {
		_cpage = cpage;	//コントロールオブジェクト（colorPage）登録
				
		_curRGB = color;
		_curHSV = _rgb2hsv(color);
		$selectedColorPanel = $(_selectedClassName);
		
		//box高さ・幅調整
		$("#selectView div.selectBox").css({ height: Math.round(3.4 * _nscale) + "px", width: "100%" });
		$("#colorSelectView .selectArea").css({ height: Math.round(3.4 * _nscale) + "px", width: "100%" });
		$("#huePicker").css({ height: Math.round(0.6*_nscale) + "px", width: 10*_nscale + "px", left: Math.round(1.5*_nscale) + "px", top: Math.round(0.5*_nscale) + "px" });
		$("#tonePicker").css({ height: Math.round(2*_nscale) + "px", width: Math.round(7.5*_nscale) + "px", left: Math.round(1.5*_nscale) + "px", top: Math.round(1.6*_nscale) + "px"});
		$("#toneButtonArea").css({ height: Math.round(2*_nscale) + "px", width: Math.round(2*_nscale) + "px", left: Math.round(9.5*_nscale) + "px", top: Math.round(1.6*_nscale) + "px"});
		$("#colorSelectView .text").css({"height": Math.round(0.5*_nscale) + "px", "font-size": Math.round(0.4*_nscale) + "px", "line-height": Math.round(0.5*_nscale) + "px"});
		$("#colorSelectView .text_hue").css({left: Math.round(0.35*_nscale) + "px", top: Math.round(0.5*_nscale) + "px"});
		$("#colorSelectView .text_sat").css({left: Math.round(0.35*_nscale) + "px", top: Math.round(1.6*_nscale) + "px"});
		$("#colorSelectView .text_val").css({left: Math.round(0.35*_nscale) + "px", top: Math.round(3*_nscale) + "px"});
		// 色相選択オブジェクト
		_huePicker = huePicker({
			width: 10*_nscale,
			height: Math.round(0.6*_nscale),
			hue: _curHSV.h
		});
		_huePicker.init(this);
		
		// 色調選択オブジェクト
		_tonePicker = tonePicker({
			width: Math.round(7.5*_nscale),
			height: Math.round(2*_nscale),
			basecolor: _h2rgb(_curHSV.h),
			hsv: _curHSV
		});
		_tonePicker.init(this);
		
		// 色調微調整ボタン
		_toneButton = toneButton();
		_toneButton.init(_tonePicker);
		
		// 現在色表示更新
		_updateSelectedColor();
	};
	that.init = init;
	
	// 色相ピッカーで色相が変更された
	var hueChanged = function(){
		// 変更された色相を取得
		_curHSV.h = _huePicker.getHue();
		// RGB値を更新
		_curRGB = _hsv2rgb(_curHSV);
		
		// 色調ピッカーに変更された色相をセット
		_tonePicker.setColor(_h2rgb(_curHSV.h), _curHSV);
		
		// 選択色表示パネルを更新
		_updateSelectedColor();
		
		// 色替えページコントロールオブジェクトに通知
		_cpage.colorChanged();
	};
	that.hueChanged = hueChanged;
	
	// 色調ピッカーで色調が変更された
	var toneChanged = function(){
		// 変更された彩度・明度を取得
		_curHSV.s = _tonePicker.getSaturation();
		_curHSV.v = _tonePicker.getValue();
		// RGB値を更新
		_curRGB = _hsv2rgb(_curHSV);
		
		// 選択色表示パネルを更新
		_updateSelectedColor();
		
		// 色替えページコントロールオブジェクトに通知
		_cpage.colorChanged();
	};
	that.toneChanged = toneChanged;
	
	// 現在の色（RGB）を返す
	var getColor = function(){
		return _curRGB;
	};
	that.getColor = getColor;
	
	// 色変更（元に戻すボタンで変更されたとき）。コントローラオブジェクトには通知しない
	var resetColor = function(color){
		_curRGB = color;
		_curHSV = _rgb2hsv(color);
		
		// 選択色・色相・色調を更新
		_updateSelectedColor();
		_huePicker.setHue(_curHSV.h);
		_tonePicker.setColor(color, _curHSV);
	};
	that.resetColor = resetColor;
	
	return that;
	
};


// JavaScript Document

var page;


// 使い方ページコントロールオブジェクト関数 extends kyozomePage()
var helpPage = function(my){
	var _nscale = 1;
	var _height = 1024;
	my = my || {};
	var that = kyozomePage(my);	//この関数（helpPage()）が返すオブジェクト
	
	// クリックイベント登録
	var _registerEvents = function(){
		//戻るボタン
		$("#tabBar .btnReturn").bind('click', function(){
			//location.href = "index.html";
			//history.back();
			navigator.app.backHistory();
		});
	};
	
	var _setHeight = function(nscale,height){
		// タブバー:1, body:15
		$("#tabBar").css("height", (1*nscale) + "px");
		var pHeight = $("#tabBar").height() - 8;
		$("#tabBar p").css({"height": pHeight + "px", "font-size": Math.round(pHeight*0.4) + "px", "line-height": pHeight + "px"});
		$("#tabBar span").css({"height": (1*nscale) + "px", "font-size": Math.round(pHeight*0.6) + "px", "line-height": (1*nscale) + "px", "left":"50%", "top":0});
		var sWidth = Math.round($("#tabBar span").width()/2);
		$("#tabBar span").css({"left":($("#tabBar span").position().left - sWidth) + "px"});
		$("#helpImage").css({"height":(15*nscale) + "px", "width":"100%"});
		//端末解像度ごとの調整用マージン
		var exMargin = height - 16*nscale;
		if(exMargin>0){
			$("#helpImage").css("padding-bottom", exMargin + "px");
		}
	};
	
	//以下publicメソッド
	//色替えページオブジェクト初期化
	var init = function(page){
		my.resize();
		_nscale = my.sm.getNScale();
		_height = my.sm.getHeight();
		_setHeight(_nscale, _height);
		
		// ボタンクリックイベント登録
		_registerEvents();	
		// Loading画像消す
		$("#loading").css("display", "none");
	};
	that.init = init;
	
		
	return that;
};

document.addEventListener('DOMContentLoaded', function(){
	if (typeof device === 'undefined'){
		document.addEventListener("deviceready", onDeviceReady, false);
	} else {
		onDeviceReady();
	}
});

function onDeviceReady(){
	document.addEventListener("backbutton", function(e){
	    e.preventDefault();
	    navigator.app.backHistory();
	}, true);
	page = helpPage();
	page.init(page);
}

//onDeviceReady();
