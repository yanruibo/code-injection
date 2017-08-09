














﻿//ライブラリ初期化
enchant();

//HTMLファイル読み込み時の処理
window.onload = function(){
	//スマホのURLバーを消す処理の設定
	setTimeout(doScroll, 100);

	if(navigator.userAgent.indexOf('iPhone') != -1 || navigator.userAgent.indexOf('iPad') != -1){
		initWindow();
	}
	else{
		setTimeout(initWindow, 100);
	}
}

function initWindow(){
	//ゲーム生成
	game = new Game(SCREEN_WIDTH, SCREEN_HEIGHT);
	
    game.setCentering = function(scene)
    {
        if ( !scene )
        {
            scene = this.currentScene;
        }
        if ( !scene )
        {
            return;
        }
        var VENDER_PREFIX = (function() {
            var ua = navigator.userAgent;
            if (ua.indexOf('Opera') != -1) {
                return 'O';
            } else if (ua.indexOf('MSIE') != -1) {
                return 'ms';
            } else if (ua.indexOf('WebKit') != -1) {
                return 'webkit';
            } else if (navigator.product == 'Gecko') {
                return 'Moz';
            } else {
                return '';
            }
        })();
        this._element.style.width = window.innerWidth + "px";
        this._element.style.height = window.innerHeight + "px";
        this.scale = Math.min(window.innerWidth/this.width,window.innerHeight/this.height);
        scene._element.style.left = Math.floor((window.innerWidth - (this.width * this.scale))/2) + "px";
        scene._element.style.top = Math.floor((window.innerHeight - (this.height * this.scale))/2) + "px";
        scene._element.style[VENDER_PREFIX + 'Transform'] = 'scale(' +  this.scale + ')';
        if( scene != this.rootScene )
        {
            this.rootScene._element.style.left = Math.floor((window.innerWidth - (this.width * this.scale))/2) + "px";
            this.rootScene._element.style.top = Math.floor((window.innerHeight - (this.height * this.scale))/2) + "px";
            this.rootScene._element.style[VENDER_PREFIX + 'Transform'] = 'scale(' +  this.scale + ')';
        }
    };
    
    game.setCentering(game.loadingScene);
	//fpsの設定
	game.fps = 14;
	//画像のロード
	game.preload(ASSETS);

	//画像読み込み時の処理
	game.onload = startFunction;

	//ゲーム開始
	game.start();
	
    (function() {
        
        game.loadingScene.removeChild(game.loadingScene.childNodes[0]);//プログレスバーを削除
        
        var loadGroup = new Group();
        
        var square = [];//演出四角
        //四角のサイズのプロパティ
        var prop = {p0:1,x0:0,y0:0, p1:0.9,x1:20,y1:0, p2:0.8,x2:40,y2:0, p3:0.7,x3:40,y3:20, p4:0.6,x4:40,y4:40, p5:0.5,x5:20,y5:40, p6:0.4,x6:00,y6:40, p7:0.3,x7:0,y7:20};
        //var pos  = [0,1,2,3,4,5,6,7];//時計回り
        var pos = [7,6,5,4,3,2,1,0];//反時計回り
        
        //四角初期配置
        for( var i = 0; i < 8; i++ ){
            square[i] = new Sprite( 18, 18 );
            square[i].backgroundColor = "#FFF";
            square[i].scale( prop["p"+i] );
            square[i].opacity = prop["p"+i];
            square[i].x       = prop["x"+i];
            square[i].y       = prop["y"+i];
            loadGroup.addChild( square[i] );
        }
        
        loadGroup.x = ( game.width  / 2 | 0 ) - 30;
        loadGroup.y = ( game.height / 2 | 0 ) - 30;
        
        var cnt = 0;
        loadGroup.addEventListener('enterframe',function(){
            if( !( cnt++ % 2 ) ){
                for( var i = 0; i < 8; i++ ){
                    square[i].x = prop["x"+pos[i]];
                    square[i].y = prop["y"+pos[i]];
                }
                pos.push( pos.shift() );
            }
        });
        
        game.loadingScene.addChild( loadGroup );
        
    })();
}
//enchant.Node.prototype._element = 'div';

﻿/* 定数定義 */
//スクリーンのサイズ
var SCREEN_WIDTH = 320;
var SCREEN_HEIGHT= 416;

//ラジアンの定義
var RAD 		= Math.PI/180;

//タイトル画像背景の定数
var TITLE_BG_IMAGE = "img/bg.gif";

//ステージ決定ボタンの定数
var SELECT_BUTTON_IMAGE = "img/select.gif";
var SELECT_BUTTON_WIDTH = 40;
var SELECT_BUTTON_HEIGHT= SELECT_BUTTON_WIDTH;

//寿司の定数定義
var SUSHI_IMAGE  = "img/sushi.gif";
var SUSHI_WIDTH  = 80;
var SUSHI_HEIGHT = 50;
var SUSHI_X      = -SUSHI_WIDTH;
var SUSHI_Y      = 100;
var SUSHI_SPEED  = 8;

//ネタ札の定数定義
var BOARD_IMAGE  = "img/huda.gif";
var BOARD_WIDTH  = 90;
var BOARD_HEIGHT = 30;
var BOARD_HEAD_Y = 0;
var BOARD_X		 = SCREEN_WIDTH - (BOARD_WIDTH);

var HUDA_AMOUNT   = 5;

//矢印の定数定義
var POINTER_IMAGE = "img/yajirusi.gif";
var POINTER_WIDTH = 20;
var POINTER_HEIGHT= 40;
var POINTER_X	  = BOARD_X + 35;
var POINTER_Y	  = 120;

//木の板画像の定数
var TILE_IMAGE = "img/wood.gif";
var TILE_WIDTH = BOARD_WIDTH;
var TILE_HEIGHT= BOARD_HEIGHT;
var TILE_X	   = BOARD_X + BOARD_WIDTH;
var TILE_HEAD_Y	   = 50 + (BOARD_HEIGHT * 4);

//次の得点を示す文字列の画像の定数
var TUGI_IMAGE = "img/tugi.png";
var TUGI_WIDTH  = 64;
var TUGI_HEIGHT = 16;
var TUGI_X		= 10;
var TUGI_Y      = 20;

//終了通知文字画像の定数
var END_STRING_IMAGE = "img/end.gif";
var END_STRING_WIDTH = 100;
var END_STRING_HEIGHT= 50;

//結果通知文字画像の定数
var RSLT_STRING_IMAGE = "img/kekka.gif";
var RSLT_STRING_WIDTH = 150;
var RSLT_STRING_HEIGHT= 50;

//おじゃま板追加を通知する文字画像の定数
var OJAMA_IMAGE = "img/ojama.gif";
var OJAMA_WIDTH = 200;
var OJAMA_HEIGHT= 50;

//コンボを通知する文字画像の定数
var COMBO_IMAGE = "img/combo.png";
var COMBO_WIDTH = 64;
var COMBO_HEIGHT= 16;

//プレイ時間の初期値
var TIME_INIT = 120;

//寿司屋の入り口ドア画像の定数
var DOOR_IMAGE = "img/door.gif";
var DOOR_WIDTH = 130;
var DOOR_HEIGHT= 180;

//ロゴの画像用定数
var ROGO_IMAGE = "img/rogo.gif";
var ROGO_WIDTH = 250;
var ROGO_HEIGHT= 161;

//キャラクター画像用定数
var CHAR_IMAGE = "img/char.png";
var CHAR_WIDTH = 100;
var CHAR_HEIGHT= 200;
//画像のアセット
var ASSETS = [
	SUSHI_IMAGE,
	BOARD_IMAGE,
	POINTER_IMAGE,
	TILE_IMAGE,
	TUGI_IMAGE,
	SELECT_BUTTON_IMAGE,
	END_STRING_IMAGE,
	RSLT_STRING_IMAGE,
	OJAMA_IMAGE,
	COMBO_IMAGE,
	TITLE_BG_IMAGE,
	DOOR_IMAGE,
	ROGO_IMAGE,
	CHAR_IMAGE
];


/* グローバル変数 */
//ゲーム本体のオブジェクト
var game = null;

//ステージがセレクトされたかどうかを判定
var stageSelected = null;

//ゲームに登場するオブジェクトを格納する配列
var gameObject = [];

//ネタ一覧がタッチされた時のみ表示するオブジェクトの配列
//2重タッチによるバグ対策
var touchedObject = [];

//寿司へのタッチの有無を確認
var touched = false;

//現在取るべきしたネタ
var currentNeta = null;

//加算ポイント関連
var POINT_INIT = 50;
//ポイントを減算するイネーブル
var pointSubEnable = true;
var nextPoint = POINT_INIT;

//寿司を生産するイネーブル
var sushiMakeEnable = true;

//時計のイネーブル
var clockEnable = false;
//時計の値
var clockTime = TIME_INIT;
//時計タイマーのID
var timerID = null;

//トライしたステージ
var currentStage = null;

//ボードに指定されたネタ
var boardNeta = null;

//コンボ数の変数
var comboAmount = 0;

//一手時間計測用変数
var takeTimeAll = 0;
var takeTime    = 0;
var takeCount   = 0;

//出現したおじゃま板の数
var tileAmount = 0;

var touchedSushiName = false;
var stopGameFlag = false;
var selectedFlag = false;

﻿/*
* startFunction()
* 引数　: -
* 戻り値: -
*
+--*
*
* ゲームのスタートシーン
*
*/
function startFunction(){
	//alert("Mint");
	var scene = game.rootScene;
	scene.keyID = "title" + game.frame;
       game.addEventListener(enchant.Event.ENTER_FRAME,function(e){
           var rect = game._element.getBoundingClientRect();
           if ( (rect.width != window.innerWidth || rect.height != window.Height) )
           {
               this.setCentering();
              //setTimeout(doScroll, 100);
           }
       });
    
	//DOMに切り替え
//	scene.element = document.createElement('div');
	//グローバル変数初期化
	initializeGrobalVal();

	scene.backgroundColor = "#fff";

	//ドアの生成
	var doorLeft = new Door(40, (SCREEN_HEIGHT - (DOOR_HEIGHT + 45)), 0);
	gameObject[doorLeft.keyID] = doorLeft;
	var doorRight = new Door((40 + DOOR_WIDTH), (SCREEN_HEIGHT - (DOOR_HEIGHT + 45)), 1);
	gameObject[doorRight.keyID] = doorRight;

	scene.addChild(gameObject[doorLeft.keyID]);
	scene.addChild(gameObject[doorRight.keyID]);

	//背景画像生成
	var bg = new SpriteImage(TITLE_BG_IMAGE, 0, 0, SCREEN_WIDTH, SCREEN_HEIGHT, 0);
	bg.keyID = "titleBack";
	gameObject[bg.keyID] = bg;
	scene.addChild(gameObject[bg.keyID]);

	//ロゴ生成
	var rogo = new RogoString(45, 20);
	gameObject[rogo.keyID] = rogo;
	scene.addChild(gameObject[rogo.keyID]);

	//選択ボタン背景の生成
	var selectBg = new SurfaceImageRect(50, 260 - 25, (60 * 3), SELECT_BUTTON_HEIGHT + 35, "#000", "#000");
	selectBg.keyID = "selectBg" + game.frame;
	selectBg.opacity = 0.7;

	gameObject[selectBg.keyID] = selectBg;
	scene.addChild(gameObject[selectBg.keyID]);

	//キャラクター生成
	var charImage = new CharImage(230, SCREEN_HEIGHT - CHAR_HEIGHT + 10);
	gameObject[charImage.keyID] = charImage;
	scene.addChild(gameObject[charImage.keyID]);

	//ステージ選択を促す文章
	var expString = new LabelString(55, 238, "コースを選択してね", "18px monospace", "#fff");
	expString.keyID = "expString";
	gameObject[expString.keyID] = expString;
	scene.addChild(gameObject[expString.keyID]);


	//"松"の選択肢
	var matsuButton = new SelectButton(60, 260, 0);
	matsuButton.keyID = "matsuButton";
	gameObject[matsuButton.keyID] = matsuButton;

	//"竹"の選択肢
	var takeButton = new SelectButton(120, 260, 1);
	takeButton.keyID = "takeButton";
	gameObject[takeButton.keyID] = takeButton;

	//"梅の選択肢"
	var umeButton  = new SelectButton(180, 260, 2);
	umeButton.keyID = "umeButton";
	gameObject[umeButton.keyID] = umeButton;

	scene.addChild(gameObject[matsuButton.keyID]);
	scene.addChild(gameObject[takeButton.keyID]);
	scene.addChild(gameObject[umeButton.keyID]);

	//ヘルプ用のボタン生成
	var helpButton = new HelpButton(100, 380);
	helpButton.keyID = "helpB";
	gameObject[helpButton.keyID] = helpButton;

	scene.addChild(gameObject[helpButton.keyID]);
	game.setCentering(scene);
	return scene;
}

﻿/*
* (class) SurfaceClass
*  - extends enchant.Surface
*
* 引数:
*	-{Number} x		(x座標)
*	-{Number} y		(y座標)
*	-{Number} width (横幅)
*	-{Number} height(縦幅)
*	-{String} drawColor (線の色)
*	-{String} fillColor (塗りつぶし色)
*
* 戻り値: -

+--*
* プロパティ:
*
*	-{Number} x		(x座標)
*	-{Number} y		(y座標)
*	-{Number} width	(横幅)
*	-{Number} height(縦幅)
*	-{String} drawColor (線の色)
*	-{String} fillColor (塗りつぶし色)
*
* メソッド  :
*	- setColor() (サーフェイスの色をセット)
*	- drawLine() (直線を描画する)
*	- drawRect() (四角形の線を描く)
*	- fillRect() (四角に塗りつぶす)
*	- drawCycle()(円を描く)
*	- fillCycle()(円を塗りつぶす)
*
+--*
* サーフェイスのクラス
*
*/
var SurfaceClass = Class.create(Surface, {
	initialize: function(x, y, width, height, drawColor, fillColor){
		Surface.call(this, width, height);

		this.x     = x;
		this.y     = y;
		this.width = width;
		this.height= height;
		this.drawColor = drawColor;
		this.fillColor = fillColor;

		//色を設定
		this.setColor();
	},

	/*
	* setColor()
	* 引数  : -
	* 戻り値: -
	*/
	setColor: function(){
		/*色の設定*/
		this.context.strokeStyle = this.drawColor;
		this.context.fillStyle   = this.fillColor;
	},

	/*
	* drawLine()
	* 引数  :
	*	-{Number} tx (終点のx座標)
	*	-{Number} ty (終点のy座標)
	* 戻り値: -
	*/
	drawLine: function(tx, ty){
		this.context.beginPath(); //パスの開始
		this.context.moveTo(this.x, this.y); //始点移動
		this.context.lineTo(tx, ty); //終点
		this.context.stroke(); //直線描画
	},

	/*
	* drawRect()
	* 引数  : -
	* 戻り値: -
	*/
	drawRect: function(){
		this.context.beginPath(); //パスの開始
		//四角形描画
		this.context.rect(this.x, this.y, this.width, this.height);
		this.context.stroke(); //輪郭描画
	},

	/*
	* fillRect()
	* 引数  : -
	* 戻り値: -
	*/
	fillRect: function(){
		this.context.beginPath(); //パスの開始
		//四角形描画
		this.context.rect(this.x, this.y, this.width, this.height);
		this.context.fill(); //塗りつぶし
	},

	/*
	* drawCycle()
	* 引数  :
	*	-{Number} r	(円の半径)
	*	-{Number} startRad (開始角度)
	*	-{Number} endRad   (終了角度)
	*	-{Boolean}vec      (描画方向)
	* 戻り値: -
	*/
	drawCycle: function(r, startRad, endRad, vec){
		this.context.beginPath(); //パスの開始
		this.context.arc(this.x, this.y, r, startRad, endRad, vec);
		this.context.stroke(); //描画
	},

	/*
	* fillCycle()
	* 引数  :
	*	-{Number} r	(円の半径)
	*	-{Number} startRad (開始角度)
	*	-{Number} endRad   (終了角度)
	*	-{Boolean}vec      (描画方向)
	* 戻り値: -
	*/
	fillCycle: function(r, startRad, endRad, vec){
		this.context.beginPath(); //パスの開始
		this.context.arc(this.x, this.y, r, startRad, endRad, vec);
		this.context.fill(); //塗りつぶし
	}
});



/*
* (class) SurfaceImageRect
*  - extends enchant.Sprite
*
* 引数:
*	-{Number} x		(x座標)
*	-{Number} y		(y座標)
*	-{Number} width (横幅)
*	-{Number} height(縦幅)
*	-{String} drawColor (線の色)
*	-{String} fillColor (塗りつぶし色)
*
* 戻り値: -

+--*
* プロパティ:
*
*	-{Number} x		(x座標)
*	-{Number} y		(y座標)
*	-{Number} width	(横幅)
*	-{Number} height(縦幅)
* 	-{enchant.Surface} image (画像)
*
* メソッド  : 
*	- remove() (自分を消すメソッド)
*
+--*
* 四角のサーフェイスをイメージとして持つスプライトのクラス
*
*/
var SurfaceImageRect = Class.create(Sprite, {
	initialize: function(x, y, width, height, drawColor, fillColor){
		Sprite.call(this, width, height);

		this.x = x;
		this.y = y;
		this.width = width;
		this.height= height;

		//イメージの生成
		this.image = new SurfaceClass(0, 0, this.width, this.height, drawColor, fillColor);
		this.image.drawRect();
		this.image.fillRect();
	},

	/*
	* remove()
	* 引数  : -
	* 戻り値: -
	*/
	remove: function(){
		//オブジェクトの配列から削除
		delete gameObject[this.keyID];
		//ツリーから削除
		this.parentNode.removeChild(this);
	}
});



/*
* (class) SurfaceImageLine
*  - extends enchant.Sprite
*
* 引数:
*	-{Number} x		(x座標)
*	-{Number} y		(y座標)
*	-{Number} width (横幅)
*	-{Number} height(縦幅)
*	-{String} drawColor (線の色)
*
* 戻り値: -

+--*
* プロパティ:
*
*	-{Number} x		(x座標)
*	-{Number} y		(y座標)
*	-{Number} width	(横幅)
*	-{Number} height(縦幅)
* 	-{enchant.Surface} image (画像)
*
* メソッド  : 
*	- remove() (自分を消すメソッド)
*
+--*
* 直線サーフェイスをイメージとして持つスプライトのクラス
*
*/
var SurfaceImageLine = Class.create(Sprite, {
	initialize: function(x, y, width, height, drawColor){
		Sprite.call(this, width, height);

		this.x = x;
		this.y = y;
		this.width = width;
		this.height = height;

		this.image = new SurfaceClass(0, 0, this.width, this.height, drawColor, drawColor);
		//線描画
		this.image.drawLine(this.x + this.width, this.y + this.height);
	},

	/*
	* remove()
	* 引数  : -
	* 戻り値: -
	*/
	remove: function(){
		//オブジェクトの配列から削除
		delete gameObject[this.keyID];
		//ツリーから削除
		this.parentNode.removeChild(this);
	}
});



/*
* (class) SurfaceImageCycle
*  - extends enchant.Sprite
*
* 引数:
*	-{Number} x		(x座標)
*	-{Number} y		(y座標)
*	-{Number} width (横幅)
*	-{Number} height(縦幅)
*	-{String} drawColor (線の色)
*	-{String} fillColor (塗りつぶし色)
*	-{Number} r	(円の半径)
*	-{Number} startRad (開始角度)
*	-{Number} endRad   (終了角度)
*	-{Boolean}vec      (描画方向)
*
* 戻り値: -

+--*
* プロパティ:
*
*	-{Number} x		(x座標)
*	-{Number} y		(y座標)
*	-{Number} width	(横幅)
*	-{Number} height(縦幅)
* 	-{enchant.Surface} image (画像)
*
* メソッド  : 
*	- remove() (自分を消すメソッド)
*
+--*
* 円のサーフェイスをイメージとして持つスプライトのクラス
*
*/
var SurfaceImageCycle = Class.create(Sprite, {
	initialize: function(x, y, width, height, drawColor, fillColor, r, startRad, endRad, vec){
		Sprite.call(this, width, height);

		this.x = x;
		this.y = y;
		this.width = width;
		this.height= height;

		//イメージの生成
		this.image = new SurfaceClass((this.width / 2), (this.width / 2), this.width, this.height, drawColor, fillColor);
		this.image.drawCycle((width / 2), startRad, endRad, vec);
		this.image.fillCycle((width / 2), startRad, endRad, vec);
	},

	/*
	* remove()
	* 引数  : -
	* 戻り値: -
	*/
	remove: function(){
		//オブジェクトの配列から削除
		delete gameObject[this.keyID];
		//ツリーから削除
		this.parentNode.removeChild(this);
	}
});

﻿/*
* (class) UmeScene
*  - extends enchant.Scene
*
* 引数  : -
* 戻り値: -

+--*
* プロパティ:
*
*	-{String} keyID		(オブジェクト配列に登録するときにキー)
*	-{String} bgColor 	(背景色)
*	-{Number} NETA_AMOUNT   (ネタの種類数)
*	-{Number} LANE_HEAD (一番上のレーンのy座標)
*	-{Number} LANE_TAIL (一番下のレーンのy座標)
*	-{Number} YPLUS　   (寿司の先頭までの相対距離)
*	-{Number} tileAppPer (ネタ一覧を隠す板の出現率)
*	-{Number} NETA_LINE  (ネタの列数)
*
* メソッド  :
*	- enterFrameAction() (定期処理で実行されるメソッド)
*	- addChild()		 (子ノードを追加)
*
+--*
* "梅"のステージのシーン
*
*/
var UmeScene = Class.create(Scene, {
	initialize: function(){
	//	game.setCentering(this);
		
		//ステージ固有の変数/定数 初期化
		this.keyID 		= "umeScene",
		this.bgColor     = "#d99",
		this.NETA_AMOUNT = 3;
		this.LANE_HEAD   = 190;
		this.LANE_TAIL   = 250;
		this.YPLUS	    = 100;
		this.tileAppPer=  400;
		this.NETA_LINE   = 2;
		this.scoreBounus = 1;

		//ステージ生成
		sceneInit(this);
		game.setCentering(this);
	}
});



/*
* (class) TakeScene
*  - extends enchant.Scene
*
* 引数  : -
* 戻り値: -

+--*
* プロパティ:
*
*	-{String} keyID		(オブジェクト配列に登録するときにキー)
*	-{String} bgColor 	(背景色)
*	-{Number} NETA_AMOUNT   (ネタの種類数)
*	-{Number} LANE_HEAD (一番上のレーンのy座標)
*	-{Number} LANE_TAIL (一番下のレーンのy座標)
*	-{Number} YPLUS　   (寿司の先頭までの相対距離)
*	-{Number} tileAppPer (ネタ一覧を隠す板の出現率)
*	-{Number} NETA_LINE  (ネタの列数)
*
* メソッド  :
*	- enterFrameAction() (定期処理で実行されるメソッド)
*	- addChild()		 (子ノードを追加)
*
+--*
* "竹"のステージのシーン
*
*/
var TakeScene = Class.create(Scene, {
	initialize: function(){
		//game.setCentering(this);
		
		this.keyID 		= "takeScene",
		this.bgColor     = "#aa5",
		this.NETA_AMOUNT = 6;
		this.LANE_HEAD   = 180;
		this.LANE_TAIL   = 300;
		this.YPLUS	    = 150;
		this.tileAppPer=  300;
		this.NETA_LINE   = 3;
		this.scoreBounus = 2;

		sceneInit(this);
		game.setCentering(this);
	}
});



/*
* (class) MatsuScene
*  - extends enchant.Scene
*
* 引数  : -
* 戻り値: -

+--*
* プロパティ:
*
*	-{String} keyID		(オブジェクト配列に登録するときにキー)
*	-{String} bgColor 	(背景色)
*	-{Number} NETA_AMOUNT   (ネタの種類数)
*	-{Number} LANE_HEAD (一番上のレーンのy座標)
*	-{Number} LANE_TAIL (一番下のレーンのy座標)
*	-{Number} YPLUS　   (寿司の先頭までの相対距離)
*	-{Number} tileAppPer (ネタ一覧を隠す板の出現率)
*	-{Number} NETA_LINE  (ネタの列数)
*
* メソッド  :
*	- enterFrameAction() (定期処理で実行されるメソッド)
*	- addChild()		 (子ノードを追加)
*
+--*
* "松"のステージのシーン
*
*/
var MatsuScene = Class.create(Scene, {
	initialize: function(){
//		game.setCentering(this);

		this.keyID 		= "matsuScene",
		this.bgColor     = "#ca8",
		this.NETA_AMOUNT = 10;
		this.LANE_HEAD   = 150;
		this.LANE_TAIL   = 390;
		this.YPLUS	    = 240;
		this.tileAppPer=  100;
		this.NETA_LINE   = 5;
		this.scoreBounus = 3;

		sceneInit(this);
		game.setCentering(this);
	}
});



/*
* sceneInit()
* 引数　:
*	-{enchant.Scene} scene (設定対象となるシーン)
*	-{Object}		 objType (シーンごとの値が格納された連想配列)
* 戻り値: - 
*
* シーンのプロパティ:
* プロパティ:
*
*	-{String} backgroundColor 	(背景色)
*	-{Number} tileY     (木の板のy座標初期値)
*	-{Number} lastScore (最後に木の板が発生したときのスコア)
*	-{Number} tileAppPer(木の板の出現率)
*
+--*
*
* 各ステージにおいておおよその処理は重なるので、シーン
* を渡すことでシーンのプロパティなどをを設定する
*
*/
function sceneInit(scene){
	Scene.call(scene);

	//ゲームが開始する前にすべてクリアする
	initializeAll();

	currentStage = scene.keyID;
	scene.tick = 0;
	selectedFlag = false;
	nextPoint = POINT_INIT * scene.scoreBounus;
	//オブジェクト配列に登録するときのキー

	//得点表示オブジェクト
	var scoreLabel = new ScoreLabel(-32, 0);
	scoreLabel.keyID = "score";
	scoreLabel.score = 0;
	//ディレイなしで表示させる設定
	scoreLabel.easing = 1;

	gameObject[scoreLabel.keyID] = scoreLabel;

	scene.addChild(gameObject[scoreLabel.keyID]);


	/* 次に加算される得点を表示 */
	//前置する文章
	var tugi = new SpriteImage(TUGI_IMAGE, TUGI_X, TUGI_Y, TUGI_WIDTH, TUGI_HEIGHT, 0);
	tugi.keyID = "tugi";
	gameObject[tugi.keyID] = tugi;
	scene.addChild(gameObject[tugi.keyID]);

	//加算する得点
	var n = new NextPointString(tugi.x + tugi.width, tugi.y);
	gameObject[n.keyID] = n;
	scene.addChild(gameObject[n.keyID]);


	//木の板周りの変数初期化
	scene.tileY = TILE_HEAD_Y;
	scene.lastScore = -2000;
	//scene.tileAppPer = scene.TILE_APP_PER;

	//DOMに切り替え
	//scene.element = document.createElement('div');
	//背景色指定
	scene.backgroundColor = scene.bgColor;

	//ネタ一覧ボードの影
	var boardShadow = new SurfaceImageRect(BOARD_X - 10, BOARD_HEAD_Y, 90, SCREEN_HEIGHT,
											"rgba(0, 0, 0, 0.3)", "rgba(0, 0, 0, 0.3)");
	boardShadow.keyID = "bs";
	gameObject[boardShadow.keyID] = boardShadow;
	scene.addChild(gameObject[boardShadow.keyID]);

	//ネタ一覧ボード
	var boardArray = new BoardArray(BOARD_X, BOARD_HEAD_Y, scene.NETA_AMOUNT);
	gameObject[boardArray.keyID] = boardArray;
	scene.addChild(gameObject[boardArray.keyID]);

	//寿司を運ぶレーンの生成
	for(var i = scene.LANE_HEAD; i <= scene.LANE_TAIL; i += 60){
		//レーン生成
		var lane = new Lane(-SCREEN_WIDTH, i);
		gameObject[lane.keyID] = lane;
		scene.insertBefore(gameObject[lane.keyID], gameObject["bs"]);


		//レーンの影生成
		var sushiShadow = new SushiShadow(0, i);
		gameObject[sushiShadow.keyID] = sushiShadow;
		scene.insertBefore(gameObject[sushiShadow.keyID], gameObject["bs"]);
	}


	//定期処理追加
	scene.addEventListener(Event.ENTER_FRAME, function(){
		/* 最初のフレームで待ちへ */
		if(this.tick == 0){
			var startPause = new StartPause();
			startPause.keyID = "startPause";
			gameObject[startPause.keyID] = startPause;
			game.pushScene(gameObject[startPause.keyID]);
			this.tick++;
		}
	    if(stopGameFlag == true)return;
		//減算イネーブルが立っていて、加算するポイントが1以上であれば減らす
		if(pointSubEnable){
			if(nextPoint > 1){
				nextPoint--;
			}
			takeTime++;
		}

		/* おじゃま板発生 */
		if(this.tick % this.tileAppPer == 0 && gameObject["score"].score > this.tileAppPer &&
		  (gameObject["score"].score - this.lastScore) >= 1000 && tileAmount < 5){

			//おじゃま板発生通知シーン
			game.pushScene(new AddOjamaBoard());

			//オブジェクト生成
			var tile = new WoodTile(TILE_X, this.tileY);
			tile.keyID = "tile" + game.frame;
			gameObject[tile.keyID] = tile;

			this.addChild(gameObject[tile.keyID]);

			//おじゃま板の数更新
			tileAmount++;
			//進める
			this.tileY -= TILE_HEIGHT;
			//スコアの保存
			this.lastScore = gameObject["score"].score;
		}

		if(this.tick % 10 == 0 && sushiMakeEnable){
			/* 寿司の生成 */
			//5列作成
			var y = SUSHI_Y + scene.YPLUS;
			var line = rand(this.NETA_LINE);

			
			for(var i = 0; i < this.NETA_LINE; i++){
				var nextNeta = rand(this.NETA_AMOUNT);
				if(i == line){
					if(boardNeta != null){
						nextNeta = boardNeta;
					}
				}
				if(nextNeta >= this.NETA_AMOUNT)nextNeta = 0;

				var sushiTmp = new Sushi(SUSHI_X, y, nextNeta, gameObject["score"]);
				//オブジェクトの配列に登録
				sushiTmp.keyID = "sushi" + game.frame + i;
				gameObject[sushiTmp.keyID] = sushiTmp;
				//影より後ろのレイヤーに配置する
				this.insertBefore(gameObject[sushiTmp.keyID], gameObject["bs"]);

				y -= 60; //上へ
			}
		}


		this.tick++;
	});

	//カウント開始
	clockEnable = true;
}



/*
* (class) EndScene
*  - extends enchant.Scene
*
* 引数  : -
* 戻り値: -

+--*
* プロパティ: -
* メソッド  :
*	- addChild() (子ノードを追加)
*
+--*
* 終了のシーン
*
*/
var EndScene = Class.create(Scene, {
	initialize: function(){
		Scene.call(this);
		//game.setCentering(this);
		this.keyID = "endScene";

		//背景
		var bg = new SurfaceImageRect(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT, "#000", "#000");//"rgba(0,0,0,0.7)", "rgba(0,0,0,0.7)");
		bg.opacity = 0.7;
		bg.keyID = "endBg";
		gameObject[bg.keyID] = bg;
		this.addChild(gameObject[bg.keyID]);

		//"終了"の文字
		/*
		var endString = new EndString(200, 100);
		*/
		var endString = new SpriteImage(END_STRING_IMAGE, 110, 50, END_STRING_WIDTH, END_STRING_HEIGHT, 0);
		gameObject[endString.keyID] = endString;
		this.addChild(gameObject[endString.keyID] );

		//結果通知へ飛ぶボタン
		var endButton = new EndButton(200, 200);
		endButton.keyID = "endB";
		gameObject[endButton.keyID] = endButton;
		this.addChild(gameObject[endButton.keyID]);
		game.setCentering(this);
		
		stopGameFlag = true;
	}
});



/*
* (class) ResultScene
*  - extends enchant.Scene
*
* 引数  : -
* 戻り値: -

+--*
* プロパティ: -
* メソッド  :
*	- addChild() (子ノードを追加)
*
+--*
* 結果表示のシーン
*
*/
var ResultScene = Class.create(Scene, {
	initialize: function(){
		Scene.call(this);
		//game.setCentering(this);

		this.keyID = "resultScene";

		//背景
		this.backgroundColor = "white";
		var bg = new ResultBg(0, 0);
		bg.opacity = 0.8;
		this.addChild(bg);

		//タイトル文字
		var title = new SpriteImage(RSLT_STRING_IMAGE, 80, 20, RSLT_STRING_WIDTH, RSLT_STRING_HEIGHT, 0);

		this.addChild(title);

		//最終スコア貼り付け
		var lastScoreString = new LabelString(20, 100, 
								"最終スコア: " + gameObject["score"].score + "点", 
								"30px serif", "#000");
		lastScoreString.keyID = "lss";
		gameObject[lastScoreString.keyID] = lastScoreString;
		this.addChild(gameObject[lastScoreString.keyID]);

		if(takeCount != 0){
			takeTimeAll /= takeCount;
			takeTimeAll /= 14;
		}
		else takeTimeAll = 0;

		var takeTimeString = new LabelString(20, 140, "一手の平均時間: " + 
								takeTimeAll.toFixed(3) + "秒",
								"20px serif", "#000");

		takeTimeString.keyID = "tst";
		gameObject[takeTimeString.keyID] = takeTimeString;
		this.addChild(gameObject[takeTimeString.keyID]);

		//ボタン用背景
		var buttonBg = new SurfaceImageRect(100, 290, 120, (BOARD_HEIGHT * 2) + 30, "rgba(0,0,0,0.7)", "rgba(0,0,0,0.7)");
		buttonBg.keyID = "endBg";
		gameObject[buttonBg.keyID] = buttonBg;
		this.addChild(gameObject[buttonBg.keyID]);

		//タイトルに戻るボタン
		var back = new ReturnButton(113, 300);
		back.text.text = "最初から";
		back.text.x -= 10;
		back.keyID = "back" + game.frame;
		gameObject[back.keyID] = back;
		this.addChild(gameObject[back.keyID]);

		//リトライするボタン
		var retry = new RetryButton(113, (310 + BOARD_HEIGHT));
		retry.keyID = "retry";
		gameObject[retry.keyID] = retry;
		this.addChild(gameObject[retry.keyID]);

		//キャラクター生成
		var charImage = new CharImage(230, SCREEN_HEIGHT - CHAR_HEIGHT + 10);
		charImage.keyID += game.frame;
		//イベントリスナを殺す
		charImage.removeEventListener(Event.ENTER_FRAME, charImage.enterFrameAction);
		gameObject[charImage.keyID] = charImage;
		this.addChild(gameObject[charImage.keyID]);
		game.setCentering(this);
	}
});



/*
* (class) AddOjamaBoard
*  - extends enchant.Scene
*
* 引数  : -
* 戻り値: -

+--*
* プロパティ: -
* メソッド  :
*	- addChild() (子ノードを追加)
*
+--*
* おじゃま板追加の通知のシーン
*
*/
var AddOjamaBoard = Class.create(Scene, {
	initialize: function(){
		Scene.call(this);
		//game.setCentering(this);
		/*
		//ポイント減算中止
		pointSubEnable = false;
		//寿司生産中止
		sushiMakeEnable= false;
		//時計中止
		clockEnable = false;
		*/
		stopGameFlag = true;

		//流れ止める
		//SUSHI_SPEED = 0;

		//白い幕を張って寿司をタッチ不能に
		var bg = new  SurfaceImageRect(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT, "#000", "#000");
		bg.opacity = 0.5;
		bg.keyID = "blackBg";

		gameObject[bg.keyID] = bg;

		this.addChild(gameObject[bg.keyID]);

		//おじゃま板の追加を通知
		var addBoard = new OjamaNotice(-30, 130);
		gameObject[addBoard.keyID] = addBoard;
		this.addChild(gameObject[addBoard.keyID]);


		//タッチされたら
		this.addEventListener(Event.TOUCH_END, function(){
			//回復
			pointSubEnable = true;
			sushiMakeEnable= true;
			clockEnable    = true;
			stopGameFlag = false;
			SUSHI_SPEED = 8;

			//幕消す
			gameObject["blackBg"].remove();
			//文字消す
			gameObject["ojama"].remove();

			game.popScene();
		});

		//定期処理
		this.addEventListener(Event.ENTER_FRAME, function(){
			//文字が消えたら戻る
			if(gameObject["ojama"].opacity <= 0.1){
				//回復
				pointSubEnable = true;
				sushiMakeEnable= true;
				clockEnable    = true;
				stopGameFlag = false;
				SUSHI_SPEED = 8;

				//幕消す
				gameObject["blackBg"].remove();
				//文字消す
				gameObject["ojama"].remove();
				game.popScene();
			}
		});
		game.setCentering(this);
	}
});



/*
* (class) Pause
*  - extends enchant.Scene
*
* 引数  : -
* 戻り値: -

+--*
* プロパティ: -
* メソッド  :
*	- addChild() (子ノードを追加)
*
+--*
* ポーズ用のシーン
*
*/
var Pause = Class.create(Scene, {
	initialize: function(){
		Scene.call(this);
		//game.setCentering(this);
		//ポイント減算中止
		pointSubEnable = false;
		//寿司生産中止
		sushiMakeEnable= false;
		//時計中止
		clockEnable = false;
		stopGameFlag = true;

		//流れ止める
		SUSHI_SPEED = 0;

		//白い幕を張って寿司をタッチ不能に
		var bg = new  SurfaceImageRect(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT, "#fff", "#fff");
		bg.opacity = 0.5;
		bg.keyID = "whiteBg";

		gameObject[bg.keyID] = bg;

		this.addChild(gameObject[bg.keyID]);


		//タッチされたら
		this.addEventListener(Event.TOUCH_END, function(){
			//回復
			pointSubEnable = true;
			sushiMakeEnable= true;
			clockEnable    = true;
			stopGameFlag = false;
			SUSHI_SPEED = 8;

			//幕消す
			gameObject["whiteBg"].remove();
			selectedFlag = false;
			game.popScene();
		});
		game.setCentering(this);

	}
});



/*
* (class) StartPause
*  - extends enchant.Scene
*
* 引数  : -
* 戻り値: -

+--*
* プロパティ: -
* メソッド  :
*	- addChild() (子ノードを追加)
*
+--*
* ポーズ用のシーン
*
*/
var StartPause = Class.create(Scene, {
	initialize: function(){
		Scene.call(this);
		//game.setCentering(this);
		//ポイント減算中止
		pointSubEnable = false;
		//寿司生産中止
		sushiMakeEnable= false;
		//時計中止
		clockEnable = false;

		//流れ止める
		SUSHI_SPEED = 0;

		var button = new StartButton(70, 100);
		button.keyID = "startButton";
		gameObject[button.keyID] = button;

		this.addChild(gameObject[button.keyID]);
		game.setCentering(this);

	}
});



/*
* (class) HelpScene
*  - extends enchant.Scene
*
* 引数  : -
* 戻り値: -

+--*
* プロパティ: -
* メソッド  :
*	- addChild() (子ノードを追加)
*
+--*
* ポーズ用のシーン
*
*/
var HelpScene = Class.create(Scene, {
	initialize: function(){
		Scene.call(this);
		//game.setCentering(this);
		this.keyID = "Help" + game.frame;
		//背景の生成
		var bg = new SpriteImage(TITLE_BG_IMAGE, 0, 0, SCREEN_WIDTH, SCREEN_HEIGHT, 0);
		bg.keyID = "bgHelp" + game.frame;
		gameObject[bg.keyID] = bg;
		this.addChild(gameObject[bg.keyID]);

		//ドアの生成
		var doorLeft = new Door(40, (SCREEN_HEIGHT - (DOOR_HEIGHT + 45)), 0);
		doorLeft.keyID += game.frame.toString();
		gameObject[doorLeft.keyID] = doorLeft;

		var doorRight = new Door((40 + DOOR_WIDTH), (SCREEN_HEIGHT - (DOOR_HEIGHT + 45)), 1);
		doorRight.keyID += game.frame.toString();
		gameObject[doorRight.keyID] = doorRight;

		this.addChild(gameObject[doorLeft.keyID]);
		this.addChild(gameObject[doorRight.keyID]);
	
		//説明文の配列
		var expl = [
			"回転寿司にやってきた！",
			"制限時間は2分間。",
			"流れる寿司を取りまくれ！",
			"                         ",
			"ただし、取るネタに注意！",
			"ネタが書かれた札が5枚ある。",
			"その札の中でも一番下の札に",
			"書かれているネタを取るんだ！",
			"                            ",
			"流れてくるネタをタッチすると",
			"取ることができるよ！",
			"間違えないように取ろう！",
			"                        ",
			"右の札をタッチするとネタが確認できるよ。"
		]	;

		//説明文の開始座標
		var x = 20;
		var y = 50;

		//文の背景
		var fl = new SurfaceImageRect(8, 20, 300, 350, "rgba(0, 0, 0, 0.8)", "rgba(0, 0, 0, 0.8)");
		fl.key = "flhelp";
		gameObject[fl.key] = fl;
		this.addChild(gameObject[fl.key]);

		for(var i in expl){
			//文字生成
			var label = new Label(expl[i]);
			label.font = "10px monospace";
			label.color = "#fff";
			label.x = x;
			label.y = y;

			//文字追加
			label.key = "helpLabel" + i + game.frame;
			gameObject[label.key] = label;
			this.addChild(gameObject[label.key]);
			y += 20; //改行
		
		}

		//タイトルに戻るボタン
		var back = new ReturnButton(113, 330);
		back.text.text = "戻る";
		back.text.x += 10;
		back.keyID = "back" + game.frame;
		gameObject[back.keyID] = back;
		this.addChild(gameObject[back.keyID]);

		this.hudaArray = [];
		var yIndex = 50;
		for(var j = 0; j < 10; j++){
			this.hudaArray[j] = new Board(220, yIndex, j);


			/* タッチスタート時の関数定義 */
			/* タッチされたら自分のネタに対応する絵を表示 */
			this.hudaArray[j].touchStartAction = function(){
				if(touchedSushiName == true)return;
				touchedSushiName = true;
				//参照を示す着色
				var wp = new WrapBoard(this.x, this.y);

				//オブジェクト配列に登録

				/*
					このメソッド内で生成されるオブジェクトはバグ防止のため
					touchedObject という特別な配列に格納する
				*/
				wp.keyID += game.frame;
				touchedObject[wp.keyID] = wp;
				this.parentNode.addChild(touchedObject[wp.keyID]);

				//サンプル絵の背景(黒)
				var b = new SampleBack(75, 20, "#aa5");
				b.keyID += game.frame;
				touchedObject[b.keyID] = b;
				this.parentNode.addChild(touchedObject[b.keyID]);

				//サンプル絵生成
				var p = new SamplePicture(80, 20, this.frame);
				p.keyID += game.frame;
				touchedObject[p.keyID] = p;
				this.parentNode.addChild(touchedObject[p.keyID]);
			};

			/* タッチエンド時の関数定義 */
			this.hudaArray[j].touchEndAction = function(){
				touchedSushiName = false;
				//削除
				for(var k in touchedObject){
					touchedObject[k].remove();
					//要素も削除
					delete touchedObject[k];
				}
			};

			//イベント処理追加
			this.hudaArray[j].addEventListener(Event.TOUCH_START, 
												this.hudaArray[j].touchStartAction);
			this.hudaArray[j].addEventListener(Event.TOUCH_END  ,
												this.hudaArray[j].touchEndAction);

			this.addChild(this.hudaArray[j]);//グループに対してaddChild

			yIndex += BOARD_HEIGHT;    //y座標を進めることで改行
		}
		game.setCentering(this);
	}
});

﻿/*
* (class) SpriteImage
*  - extends enchant.Sprite
*
* 引数:
*	-{String} image (画像のパス)
*	-{Number} x		(x座標)
*	-{Number} y		(y座標)
*	-{Number} width (画像の横幅)
*	-{Number} heiht (画像の縦幅)
*	-{Number} frame (画像のフレーム)
*
* 戻り値: -

+--*
* プロパティ:
*
*	-{Surface}image (画像のサーフェイス)
*	-{Number} x		(x座標)
*	-{Number} y		(y座標)
*	-{Number} width (画像の横幅)
*	-{Number} heiht (画像の縦幅)
*	-{Number} frame (画像のフレーム)
*
* メソッド  :
*	- remove() (自分を削除するメソッド)
*
+--*
* Spriteのを用いた画像のクラス
*
*/

var SpriteImage = Class.create(Sprite, {
	initialize: function(image, x, y, width, height, frame){
		Sprite.call(this, width, height);

		this.image	= game.assets[image];
		this.x 		= x;
		this.y		= y;
		this.width	= width;
		this.height	= height;
		this.frame	= frame;
	},

	/*
	* remove()
	* 引数  : -
	* 戻り値: -
	*/
	remove: function(){
	//ツリーから削除
		this.parentNode.removeChild(this);
		if(gameObject[this.keyID] != undefined){
			//オブジェクトの配列から削除
			delete gameObject[this.keyID];
		}
	}
});



/*
* (class) Sushi
*  - extends SpriteImage
*
* 引数:
*	-{Number} x		(x座標)
*	-{Number} y		(y座標)
*	-{Number} type  (画像の種類(フレーム))
*	-{enchant.ScoreLabel} scoreTarget (スコアを加算する対象となるオブジェクト)
*
* 戻り値: -

+--*
* プロパティ:
*
*	-{String} keyID		(オブジェクト配列に登録するときにキー)
*	-{Number} omega 	(ラジアン)
*	-{Number} direction (三角関数への引数)
*	-{Number} moveSpeed (移動速度)
*	-{enchant.ScoreLabel} scoreTarget (スコアを加算する対象となるオブジェクト)
*
* メソッド  :
*	- enterFrameAction() (定期処理で実行されるメソッド)
*	- touchStartAction() (タッチ開始時に実行されるメソッド)
*	- enterFrameReplace()(タッチ後に定期処理を変更した際に使用するメソッド)
*
+--*
* 寿司のクラス
*
*/

var Sushi = Class.create(SpriteImage, {
	initialize: function(x, y, type, scoreTarget){
		SpriteImage.call(this, SUSHI_IMAGE, x, y, SUSHI_WIDTH, SUSHI_HEIGHT, type);

		this.keyID		= "sushi" + game.frame;
		
		this.omega		= RAD;
		this.direction	= 0;
		this.moveSpeed	= 8;
		this.scoreTarget = scoreTarget;

		/* イベント処理の登録 */
		//定期処理
		this.addEventListener(Event.ENTER_FRAME, this.enterFrameAction);
		//タッチ時の処理
		this.addEventListener(Event.TOUCH_START, this.touchStartAction);
	},


	/*
	* enterFrameAction()
	* 引数  : -
	* 戻り値: -
	*/
	enterFrameAction: function(){
	    if(stopGameFlag == true)return;
		//横に流れる
		this.x += SUSHI_SPEED;
		//画面から出たら削除
		if(this.x >= SCREEN_WIDTH - 60){
			this.remove();
		}
	},

	/*
	* touchStartAction()
	* 引数  : -
	* 戻り値: -
	*/
	touchStartAction: function(){
	    if(stopGameFlag == true)return;
		touchedSushiName = true;
		if(this.direction == 0){
			//正誤表示エフェクトに渡すパラメータ
			var parameter = "#fff";

			//寿司がタッチされたことを通知
			touched = true;

			//時間計測用変数加算
			takeTimeAll += takeTime;
			takeTime = 0;
			takeCount++;

			//取ったネタの正誤判定
			if(this.frame == currentNeta){
				parameter = "#f77";

				//コンボ加算
				comboAmount++;
			 	//コンボの判定
				if(comboAmount >= 5){
					if(comboAmount == 5){
						//コンボ数通知
						var cs = new ComboString(0, 40, comboAmount);
						gameObject[cs.keyID] = cs;

						this.parentNode.addChild(gameObject[cs.keyID]);
					}

					
					gameObject["comboString"].comboAmount = comboAmount;
					//特別スコア加算通知生成
					var sp = new PlusString(10, 100,  (5 * comboAmount));
					sp.keyID += "sp";
					sp.font = "30px monospace";
					sp.color = "#0f0";
					gameObject[sp.keyID] = sp;
					this.parentNode.addChild(gameObject[sp.keyID]);

					this.scoreTarget.score += 5 * comboAmount;
				}

				//スコア加算通知生成
				//nextPoint *= game.currentScene.scoreBounus;
				var p = new PlusString(100, 100, nextPoint);
				gameObject[p.keyID] = p;
				this.parentNode.addChild(gameObject[p.keyID]);
				//点数加算
				this.scoreTarget.score += nextPoint;
				//加算分を戻す
				nextPoint = POINT_INIT * game.currentScene.scoreBounus;
			}
			else if(this.frame != currentNeta){
				parameter = "#0ff";

				comboAmount = 0;

				if(gameObject["comboString"] != undefined){
					this.parentNode.removeChild(gameObject["comboString"]);
				}

				//点数減算
				//0点の時は減点しない
				if((this.scoreTarget.score - 100) >  0){
					var sub = 100;
					this.scoreTarget.score -= 100;
				}
				else{
					var sub = this.scoreTarget.score;
					this.scoreTarget.score = 0;
				}
				
			//	if(this.scoreTarget.score > 0){
					//スコア減算通知生成
					var p = new MinusString(100, 100, sub);
					gameObject[p.keyID] = p;
					this.parentNode.addChild(gameObject[p.keyID]);
			//	}
				/*
				else{
					var p = new MinusString(100, 100, sub);
					gameObject[p.keyID] = p;
					this.parentNode.addChild(gameObject[p.keyID]);
				}
				*/

			}
			
			//タッチエフェクト
			var efct = new TouchEffect(this.x + 20, this.y - 5, 80, 80, parameter);
			efct.keyID = "ef" + game.frame;
			gameObject[efct.keyID] = efct;
			this.parentNode.addChild(gameObject[efct.keyID]);

			//定期処理書き換え
			this.removeEventListener(Event.ENTER_FRAME, this.enterFrameAction);
			this.removeEventListener(Event.TOUCH_START, this.touchStartAction);
			this.addEventListener(Event.ENTER_FRAME, this.enterFrameReplace);
			this.scale(1.5, 1.5);
			this.tick = 0;
		}
	},

	/*
	* enterFrameReplace()
	* 引数  : -
	* 戻り値: -
	*/
	enterFrameReplace: function(){
		this.tick++;
		if(this.tick == 2)this.remove();

		touchedSushiName = false;
	}
});



/*
* (class) Board
*  - extends SpriteImage
*
* 引数:
*	-{Number} x		(x座標)
*	-{Number} y		(y座標)
*	-{Number} type (画像の種類(フレーム))
*
* 戻り値: -

+--*
* プロパティ: 
*	-{String} keyID		(オブジェクト配列に登録するときにキー)
*
* メソッド  : -
*
+--*
* ネタ札のクラス
*
*/

var Board = Class.create(SpriteImage, {
	initialize: function(x, y, type){
		SpriteImage.call(this, BOARD_IMAGE, x, y, BOARD_WIDTH, BOARD_HEIGHT, type);

		this.keyID = "board" + game.frame;
	}
});




/*
* (class) BoardArray
*  - extends Group
*
* 引数:
*	-{Number} x		(x座標)
*	-{Number} y		(y座標)
*	-{Number} max   (ネタ数の最大値)
*
* 戻り値: -

+--*
* プロパティ: 
*	-{String} keyID	(オブジェクト配列に登録するときにキー)
*	-{Number} x (x座標)
*	-{Number} y (y座標)
*	-{Number} yIndex (ネタ札を配置するときに使用するy座標)
*	-{Number} max   (ネタ数の最大値)
*	-{Array}  hudaArray (ネタ札の配列)
*
* メソッド  : 
*	- enterFrameAction() (定期処理で実行されるメソッド)
*
+--*
* ネタ札の一覧クラス
*
*/
var BoardArray = enchant.Class.create(enchant.Group, {
	initialize: function(x, y, max){
		enchant.Group.call(this);

		this.keyID = "boardArray";

		this.x = x;
		this.y = y;
		this.yIndex = y + 50;
		this.max    = max;
		this.hudaArray = [];

		this.bg = new SurfaceImageRect(0, 0, 90, SCREEN_HEIGHT, "rgb(0, 0, 0)", "rgb(0, 0, 0)");
		this.addChild(this.bg);

		//ポーズ用ボタン追加
		this.pauseButton = new PauseButton(0, SCREEN_HEIGHT - (BOARD_HEIGHT * 2));
		this.addChild(this.pauseButton);

		//タイトルに戻るボタン追加
		this.returnButton = new ReturnButton(0, SCREEN_HEIGHT - (BOARD_HEIGHT));
		this.addChild(this.returnButton);

		var expTimer = new LabelString(15, 5, "残り時間", "15px serif", "#fff");
		this.addChild(expTimer);
		//時計(3分タイマー設置)
		var clk = new Clock(15, 25);
		this.addChild(clk);
	
		//配列にネタ札を入れていく
		for(var i = 0; i < HUDA_AMOUNT; i++){
			this.hudaArray[i] = new Board(0, this.yIndex, rand(max));


			/* タッチスタート時の関数定義 */
			/* タッチされたら自分のネタに対応する絵を表示 */
			this.hudaArray[i].touchStartAction = function(){
				if(touchedSushiName == true)return;
				touchedSushiName = true;
				
				//参照を示す着色
				/*
				var wp = new WrapBoard(this.x, this.y);
				wp.x = this.x;
				wp.y = this.y;
				*/
				//オブジェクト配列に登録

				/*
					このメソッド内で生成されるオブジェクトはバグ防止のため
					touchedObject という特別な配列に格納する
				*/
				/*
				wp.keyID += game.frame;
				touchedObject[wp.keyID] = wp;
				touchedObject[wp.keyID].x = this.x;
				touchedObject[wp.keyID].y = this.y;
				*/
				
				//this.tl.delay( 1 ).then(function(){
				touchedObject[game.frame] = new WrapBoard(this.parentNode.x, this.y);
				this.parentNode.parentNode.addChild(touchedObject[game.frame]);
								//});

				//サンプル絵の背景(黒)
				var b = new SampleBack(75, 20);
				b.keyID += game.frame;
				touchedObject[b.keyID] = b;
				this.parentNode.parentNode.addChild(touchedObject[b.keyID]);

				//サンプル絵生成
				var p = new SamplePicture(80, 20, this.frame);
				p.keyID += game.frame;
				touchedObject[p.keyID] = p;
				this.parentNode.parentNode.addChild(touchedObject[p.keyID]);
			};

			/* タッチエンド時の関数定義 */
			this.hudaArray[i].touchEndAction = function(){
				touchedSushiName = false;
				//削除
				for(var i in touchedObject){
					touchedObject[i].remove();
					//要素も削除
					delete touchedObject[i];
				}
			};

			//イベント処理追加
			this.hudaArray[i].addEventListener(Event.TOUCH_START, 
												this.hudaArray[i].touchStartAction);
			this.hudaArray[i].addEventListener(Event.TOUCH_END  ,
												this.hudaArray[i].touchEndAction);

			this.addChild(this.hudaArray[i]);//グループに対してaddChild

			this.yIndex += BOARD_HEIGHT;    //y座標を進めることで改行
		}

		//取るべきネタを指定
		currentNeta = this.hudaArray[(HUDA_AMOUNT - 1)].frame;
		//定期処理の追加
		this.addEventListener(Event.ENTER_FRAME, this.enterFrameAction);

	},

	/*
	* enterFrameAction()
	* 引数  : -
	* 戻り値: -
	*/
	enterFrameAction: function(){
	    if(stopGameFlag == true)return;

		//寿司がタッチされたら
		if(touched == true){
			//札が下にシフトしたことを表す矢印を表示
			var y = new Pointer();
			gameObject[y.keyID] = y;
			this.parentNode.addChild(gameObject[y.keyID]);

			//配列の要素のフレームを下にシフトさせて
			//札が移動しているように見せる
			for(var i = (HUDA_AMOUNT - 1); i >= 0; i--){
				if(i == 0){
					//配列の先頭は常に最新に更新
					this.hudaArray[i].frame = rand(this.max);
				}
				else{
					if(i == (HUDA_AMOUNT - 1)){
						//正解の札を落下させる
						var fall = new FallEffect(this.hudaArray[i].x, this.hudaArray[i].y + BOARD_HEIGHT,
											      this.hudaArray[i].frame);
						gameObject[fall.keyID] = fall;
						this.insertBefore(gameObject[fall.keyID], this.pauseButton);
					}
					//移動
					this.hudaArray[i].frame = this.hudaArray[i - 1].frame;
					//取るべきネタの更新
					if(i ==  (HUDA_AMOUNT - 1))currentNeta = this.hudaArray[i].frame;
				}
			}
			//タッチ状態を解除
			touched = false;
		}
		boardNeta = this.hudaArray[HUDA_AMOUNT - 1].frame;
	}
});



/*
* (class) SamplePicture
*  - extends SpriteImage
*
* 引数  :
*	-{Number} x (x座標)
*	-{Number} y (y座標)
*	-{Number} type (画像の種類(フレーム))
*
* 戻り値: -

+--*
* プロパティ: 
*	-{String} keyID (オブジェクト配列に登録するときにキー)
*	-{Number} scaleX(xの拡大率)
*	-{Number} scaleY(yの拡大率)
*	-{Number} opacity(不透明度)
*
* メソッド  :
*	- enterFrameAction() (定期処理で実行されるメソッド)
*
+--*
* ネタ札がタッチときに表示するサンプル絵
*
*/
var SamplePicture = Class.create(SpriteImage, {
	initialize: function(x, y, type){
		SpriteImage.call(this, SUSHI_IMAGE, x, y, SUSHI_WIDTH, SUSHI_HEIGHT, type);
		this.keyID = "netaSample";

		//拡大率、不透明度は最小に初期化
		this.scaleX  = 0;
		this.scaleY  = 0;
		this.opacity = 0;

		this.addEventListener(Event.ENTER_FRAME, this.enterFrameAction);
	},

	/*
	* enterFrameAction()
	* 引数  : -
	* 戻り値: -
	*/
	enterFrameAction: function(){
		if(this.scaleX < 1){
			//徐々に拡大
			this.scaleX += 0.2;
			this.scaleY += 0.2;
			this.opacity+= 0.2;
		}
	}
});

/*
* (class) SampleBack
*  - extends SurfaceImageRect
*
* 引数  :
*	-{Number} x (x座標)
*	-{Number} y (y座標)
*
* 戻り値: -

+--*
* プロパティ: 
*	-{String} keyID (オブジェクト配列に登録するときにキー)
*	-{Number} scaleX(xの拡大率)
*	-{Number} scaleY(yの拡大率)
*
* メソッド  :
*	- enterFrameAction() (定期処理で実行されるメソッド)
*
+--*
* ネタ札がタッチときに表示するサンプル絵
*
*/
var SampleBack = Class.create(SurfaceImageRect, {
	initialize: function(x, y, color){
		if(color != undefined)this.color = color;
		else color = "#000";
		SurfaceImageRect.call(this, x, y, 90, 60, color, color);
		this.opacity = 0.5;
		this.keyID = "sampleBack";
		//初期化(SamplePictureと同様)
		this.scaleX = 0;
		this.scaleY = 0;

		this.addEventListener(Event.ENTER_FRAME, this.enterFrameAction);
	},

	/*
	* enterFrameAction()
	* 引数  : -
	* 戻り値: -
	*/
	enterFrameAction: function(){
	    if(stopGameFlag == true)return;

		if(this.scaleX < 1){
			this.scaleX += 0.2;
			this.scaleY += 0.2;
		}
	}
});



/*
* (class) WoodTile
*  - extends SpriteImage
*
* 引数:
*	-{Number} x		(x座標)
*	-{Number} y		(y座標)
*
* 戻り値: -

+--*
* プロパティ: 
*	-{String} keyID		(オブジェクト配列に登録するときにキー)
*	-{Boolen} flag		(入場エフェクトを制御するフラグ)
*
* メソッド  : 
*	- enterFrameAction() (定期処理で実行されるメソッド)
*
+--*
* ネタ札を隠す板のクラス
*
*/
var WoodTile = Class.create(SpriteImage, {
	initialize: function(x, y){
		SpriteImage.call(this, TILE_IMAGE, x, y, TILE_WIDTH, TILE_HEIGHT, 0);

		this.keyID = "board" + game.frame;
		this.flag  = true;
		this.tileLimit = SCREEN_WIDTH - (BOARD_WIDTH);
		if(tileAmount >= 1){
			this.tileLimit = randmtm((230 - 20), (230 + 10));
			this.scaleX = 0.5;
		}

		this.addEventListener(Event.ENTER_FRAME, this.enterFrameAction);
	},

	/*
	* enterFrameAction()
	* 引数  : -
	* 戻り値: -
	*/
	enterFrameAction: function(){
	    if(stopGameFlag == true)return;

		if(this.flag == true){
			this.x -= 5;
			
			if(this.x <= this.tileLimit)this.flag = false;
		}
	}
});



/*
* (class) Lane
*  - extends enchant.Sprite
*
* 引数:
*	-{Number} x		(x座標)
*	-{Number} y		(y座標)
*
* 戻り値: -

+--*
* プロパティ: 
*	-{String} keyID		(オブジェクト配列に登録するときにキー)
*	-{enchant.Surface} image (画像のサーフェイス)
*
* メソッド  : 
*	- enterFrameAction() (定期処理で実行されるメソッド)
*
+--*
* 寿司を運ぶレーンのクラス
*
*/

var Lane = Class.create(Sprite, {
	initialize: function(x, y){
		Sprite.call(this, 640, 10);
		this.x = x;
		this.y = y;
		this.keyID   = "lane" + game.frame + this.y;

		//画像にサーフェイスを指定(自動で敷き詰められる)
		this.image = new SurfaceClass(0, 0, (this.width / 16), this.height, 
										"#000", "#da7");
		this.image.fillRect();
		this.image.drawRect();
		this.addEventListener(Event.ENTER_FRAME, this.enterFrameAction);
	},

	/*
	* enterFrameAction()
	* 引数  : -
	* 戻り値: -
	*/
	enterFrameAction: function(){
	    if(stopGameFlag == true)return;

		this.x += SUSHI_SPEED;
		if(this.x > 0)this.x = -SCREEN_WIDTH;
	}
});



/*
* (class) SushiShadow
*  - extends SurfaceImageRect
*
* 引数:
*	-{Number} x		(x座標)
*	-{Number} y		(y座標)
*
* 戻り値: -

+--*
* プロパティ: 
*	-{String} keyID		(オブジェクト配列に登録するときにキー)
*	-{Number} opacity   (不透明度)
*
* メソッド  : -
*
+--*
* 寿司を運ぶレーンの影のクラス
*
*/
var SushiShadow = Class.create(SurfaceImageRect, {
	initialize: function(x, y){
		SurfaceImageRect.call(this, x, y, SCREEN_WIDTH, 5, "#000", "#000");
		this.keyID   = "sushiShadow" + game.frame + this.y;
		this.opacity = 0.2;
	}
})



/*
* (class) NextPointString
*  - extends enchant.MutableText
*
* 引数:
*	-{Number} x		(x座標)
*	-{Number} y		(y座標)
*
* 戻り値: -

+--*
* プロパティ: 
*	-{String} keyID		(オブジェクト配列に登録するときにキー)
*	-{String} text      (文章)
*
* メソッド  :
*	- enterFrameAction() (定期処理で実行されるメソッド)
*
+--*
* 次に加算する得点を示すクラス
*
*/
var NextPointString = Class.create(MutableText, {
	initialize: function(x, y){
		MutableText.call(this, x, y, 16 * 3);
		this.keyID = "nextPointString";
		//初期値設定
		this.text =  nextPoint.toString();

		//定期処理
		this.addEventListener(Event.ENTER_FRAME, this.enterFrameAction);
	},

	/*
	* enterFrameAction()
	* 引数  : -
	* 戻り値: -
	*/
	enterFrameAction: function(){
	    if(stopGameFlag == true)return;
		//値更新
		this.text = nextPoint.toString();
	}
});



/*
* (class) Clock
*  - extends enchant.Group
*
* 引数:
*	-{Number} x		(x座標)
*	-{Number} y		(y座標)
*
* 戻り値: -

+--*
* プロパティ: 
*	-{String} keyID		(オブジェクト配列に登録するときにキー)
*	-{Number} x		(x座標)
*	-{Number} y		(y座標)
*	-{Number} width (横幅)
*	-{Number} height(縦幅)
*	-{enchant.Label} counter (時計の文字列)
*	-{enchant.Surface}bg     (時計の背景)
*
* メソッド  :
*	- enterFrameAction() (定期処理で実行されるメソッド)
*
+--*
* 次に加算する得点を示すクラス
*
*/
var Clock = Class.create(Group, {
	initialize: function(x, y){
		Group.call(this);

		this.keyID = "clockTimer";

		this.x = x;
		this.y = y;

		this.width = 16 * 7;
		this.height= 16;

		this.counter = new LabelString(10, 0, "2:00", "16px monospace", "#000");
		this.bg      = new SurfaceImageRect(0, 0, this.width - 60, this.height, "fff", "#fff");

		this.addChild(this.bg);
		this.addChild(this.counter);

		//定期処理
		this.addEventListener(Event.ENTER_FRAME, this.enterFrameAction);

		//10ms毎に、時計の値をインクリメント
		timerID = setInterval("clockAction()", 1000);
	},

	/*
	* enterFrameAction()
	* 引数  : -
	* 戻り値: -
	*/
	enterFrameAction: function(){
	    if(stopGameFlag == true)return;

		//時間情報を管理する連想配列 tim
		var tim = {
			//秒単位
			sec : Math.floor((clockTime) % 60),
			//分単位
			min : Math.floor((clockTime / 60)% 3)
		};
		//完成された時計表示文字列
		var string;

		//3分経過(fps14での処理なので正確には取れない)
		if(clockTime <= 0){
			//時計の表示整形
			this.counter.text = "0:00";

			//イネーブル切る
			clockEnable = false;

			//シーン遷移
			var e = new EndScene();
			gameObject[e.keyID] = e;
			game.pushScene(gameObject[e.keyID]);
		}

		/* 2桁表示に補正 */
		if(tim.sec < 10){
			tim.sec =  "0".toString() + tim.sec;
		}

		//文字列生成
		string = tim.min.toString() +":"+ tim.sec;// +"."+ tim.msec;

		//更新
		this.counter.text = string;
	}
});


/*
* (class) ResultBg
*  - extends enchant.Sprite
*
* 引数:
*	-{Number} x		(x座標)
*	-{Number} y		(y座標)
*
* 戻り値: -

+--*
* プロパティ: 
*	-{Number} x		(x座標)
*	-{Number} y		(y座標)
*	-{enchant.Surface} image (画像)
*
* メソッド  : -
*
+--*
* 終了を通知するクラス
*
*/
var ResultBg = Class.create(Sprite, {
	initialize: function(x, y){
		Sprite.call(this, SCREEN_WIDTH, SCREEN_HEIGHT);
		this.x = x;
		this.y = y;
		//木のタイルを敷き詰める
		this.image = game.assets[TILE_IMAGE];
	}
});



/*
* (class) ComboString
*  - extends enchant.Group
*
* 引数:
*	-{Number} x		(x座標)
*	-{Number} y		(y座標)
*	-{Number} combo (コンボ数)
*
* 戻り値: -

+--*
* プロパティ: 
*	-{String} keyID		(オブジェクト配列に登録するときにキー)
*	-{Number} x		(x座標)
*	-{Number} y		(y座標)
*	-{enchant.MutableText} combo (コンボ数の文字列)
*	-{enchant.Sprite} string (コンボ数の後に着ける文字列)
*
* メソッド  : 
*	- addChild() (子ノードを追加するメソッド)
*	- enterFrameAction() (定期処理で実行されるメソッド)
*
+--*
* 終了を通知するクラス
*
*/
var ComboString = Class.create(Group, {
	initialize: function(x, y, combo){
		Group.call(this);
		
		this.keyID = "comboString";
		this.x = x;
		this.y = y;

		this.comboAmount = combo;
		//数値の幅は桁数によって可変
		this.combo = new MutableText(0, 0);
		this.combo.text = combo.toString();

		this.string = new SpriteImage(COMBO_IMAGE, 16, 0, COMBO_WIDTH, COMBO_HEIGHT);

		this.addChild(this.string);
		this.addChild(this.combo);

		//定期処理
		this.addEventListener(Event.ENTER_FRAME, this.enterFrameAction);

	},

	/*
	* enterFrameAction()
	* 引数  : -
	* 戻り値: -
	*/
	enterFrameAction: function(){
	    if(stopGameFlag == true)return;

		if(touched == true && comboAmount >= 5){
			var comboTmp = this.comboAmount;
			//桁数求める
			for(var i = 0; comboTmp > 0; i++){
				comboTmp /= 10;
				comboTmp = Math.floor(comboTmp);
			}
			this.digit = i;
			this.string.x = (16 * this.digit);
			this.combo.text = this.comboAmount.toString();
		}
	}
});



/*
* (class) Door
*  - extends SpriteImage
*
* 引数:
*	-{Number} x		(x座標)
*	-{Number} y		(y座標)
*	-{Number} type (左右の選択)
*
* 戻り値: -

+--*
* プロパティ: 
*	-{String} keyID		(オブジェクト配列に登録するときにキー)
*	-{Number} moveFlag	(右移動か、左移動かのフラグ)
*	-{Number} tick      (アニメーション管理の変数)
*
* メソッド  : 
*	- enterFrameAction() (定期処理で実行されるメソッド)
*
+--*
* 終了を通知するクラス
*
*/
var Door = Class.create(SpriteImage, {
	initialize: function(x, y, type){
		SpriteImage.call(this, DOOR_IMAGE, x, y, DOOR_WIDTH, DOOR_HEIGHT, type);
		/* 初期化 */
		this.tick = 0;

		this.keyID = "door" + type;

		//種類によって方向が違う
		if(type == 0){
			this.moveFlag = -1;
		}
		else if(type == 1){
			this.moveFlag = 1;
		}

		//定期処理
		this.addEventListener(Event.ENTER_FRAME, this.enterFrameAction);
	},

	/*
	* enterFrameAction()
	* 引数  : -
	* 戻り値: -
	*/
	enterFrameAction: function(){
		/* ステージセレクトのボタンが押されていたら実行 */
		if(stageSelected != null){
			this.tick++;
			//白いフェード開始
			if(this.tick == 2 && this.moveFlag == 1){
				feedWhite();
			}

			//進める
			this.x += 5 * this.moveFlag;

			//一定まで来たら消す
			if((this.x > SCREEN_WIDTH && this.moveFlag == 1)||
				(this.x < -this.width && this.moveFlag == -1)){
				this.remove();
			}
		}
	}
});



/*
* (class) RogoString
*  - extends SpriteImage
*
* 引数:
*	-{Number} x		(x座標)
*	-{Number} y		(y座標)
*
* 戻り値: -

+--*
* プロパティ: 
*	-{String} keyID		(オブジェクト配列に登録するときにキー)
*	-{Number} omega		(ラジアン)
*	-{Number} direction		(三角関数に渡す値)
*	-{Number} moveSpeed (半径)
*	-{Number} flag(縦幅)
*	-{Number} firstY (y座標の初期値)
*
* メソッド  :
*	- enterFrameAction() (定期処理で実行されるメソッド)
*
+--*
* 終了を通知するクラス
*
*/
var RogoString = Class.create(SpriteImage, {
	initialize: function(x, y){
		SpriteImage.call(this, ROGO_IMAGE, x, y, ROGO_WIDTH, ROGO_HEIGHT, 0);

		this.keyID = "rogoString";
		this.omega = RAD;
		this.direction = 0;
		this.moveSpeed = 3;
		this.flag = 1;
		this.firstY = this.y;
		this.firstX = this.x;

		//定期処理
		this.addEventListener(Event.ENTER_FRAME, this.enterFrameAction);
	},

	/*
	* enterFrameAction()
	* 引数  : -
	* 戻り値: -
	*/
	enterFrameAction: function(){
		//進める
		this.direction += this.omega * this.flag;

		//半円を前後になぞるような動作をする
		if((this.flag == 1 && this.direction >= (Math.PI / 13)) || (this.flag == -1 && this.direction < RAD)){

			//初期化
			this.omega = RAD;
			//フラグ反転
			this.flag *= -1;
			//誤差(?)でy座標が上に行くのを抑える
			this.y = this.firstY;
			if(this.direction < RAD)this.x = this.firstX;
		}

		//動作
		this.y -= Math.cos(this.direction * 15) * this.moveSpeed * this.flag;
		this.x -= Math.sin(this.direction * 15) * this.moveSpeed * this.flag;
	}
});



/*
* (class) CharImage
*  - extends SpriteImage
*
* 引数:
*	-{Number} x		(x座標)
*	-{Number} y		(y座標)
*
* 戻り値: -

+--*
* プロパティ: 
*	-{String} keyID		(オブジェクト配列に登録するときにキー)
*	-{Number} omega		(ラジアン)
*	-{Number} direction		(三角関数に渡す値)
*	-{Number} moveSpeed (半径)
*
* メソッド  :
*	- enterFrameAction() (定期処理で実行されるメソッド)
*
+--*
* キャラクター画像のクラス
*
*/
var CharImage = Class.create(SpriteImage, {
	initialize: function(x, y){
		SpriteImage.call(this, CHAR_IMAGE, x, y, CHAR_WIDTH, CHAR_HEIGHT, 0);
		this.omega = RAD;
		this.direction = 0;
		this.moveSpeed = 1.5;
		this.keyID = "char";

		this.addEventListener(Event.ENTER_FRAME, this.enterFrameAction);
	},

	/*
	* enterFrameAction()
	* 引数  : -
	* 戻り値: -
	*/
	enterFrameAction: function(){
		this.direction += this.omega;
		this.y += Math.sin(this.direction * 30) * this.moveSpeed;
	}
});

﻿/*
* doScroll()
* 引数　: -
* 戻り値: -
*
+--*
*
* スマホ画面のURLバーを消す関数
*
*/

function doScroll(){
	if(window.pageYOffset === 0){ 
		window.scrollTo(0,1);
	}
}



/*
* rand()
* 引数　:
*	-{Number} n (乱数の上限)
* 戻り値:
*	-{Number} 乱数
*
+--*
*
* 0～nまでの乱数を発生させる
*
*/

function rand(n){
	return Math.floor(Math.random() * n);
}



/*
* randmtm()
* 引数　:
*	-{Number} min (乱数の下限)
*	-{Number} max (乱数の上限)
* 戻り値:
*	-{Number} 乱数
*
+--*
*
* min～maxまでの乱数を発生させる
*
*/

function randmtm(min, max){
	return Math.floor(Math.random()*(max-min)+min);
}



/*
* initializeGrobalVal()
* 引数　: -
* 戻り値: -
*
+--*
*
* グローバル変数を初期化する
*
*/
function initializeGrobalVal(){
	touched = false;
	currentNeta = null;
	pointSubEnable = true;
	sushiMakeEnable= true;
	clockEnable = false;
	clockTime   = TIME_INIT;
	currentStage= null;
	comboAmount = 0;
	stageSelected = null;
	tileAmount = 0;

	if(timerID != null){
		clearInterval(timerID);
	}
}



/*
* deleteGameObject()
* 引数　: -
* 戻り値: -
*
+--*
*
* gameObjectの中身をクリアする
*
*/
function deleteGameObject(){
	for(var i in gameObject){
		gameObject[i].remove();
		delete gameObject[i];
	}
}



/*
* deleteTouchedObject()
* 引数　: -
* 戻り値: -
*
+--*
*
* touchedObjectの中身をクリアする
*
*/
function deleteTouchedObject(){
	for(var i in touchedObject){
		touchedObject[i].remove();
		delete touchedObject[i];
	}
}



/*
* initializeAll()
* 引数　: -
* 戻り値: -
*
+--*
*
* すべての配列、グローバル変数を初期化
*
*/
function initializeAll(){
	initializeGrobalVal();
	deleteGameObject();
	deleteTouchedObject();
}



/*
* clockAction()
* 引数　: -
* 戻り値: -
*
+--*
*
* 時計を進める
*
*/
function clockAction(){
    if(stopGameFlag == true)return;

	//時計とは関係なし　URLバーを消す
	//doScroll();

	//イネーブルが出ているとき
	if(clockEnable == true){
		clockTime--;
	}
}



/*
* feedWhite()
* 引数　: -
* 戻り値: -
*
+--*
*
* 白いフェードを再現
*
*/
function feedWhite(){
	//フェードに使用する色
	var bg = new SurfaceImageRect(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT, "#fff", "#fff");
	bg.keyID = "feedWhite" + game.frame;
	bg.opacity = 0;//最初は透明

	//定期処理
	bg.addEventListener(Event.ENTER_FRAME, function(){
		//どんどん濃く
		this.opacity += 0.05;
		if(this.opacity >= 1.0){
			//選ばれたステージの状態によって遷移先が違う
			if(stageSelected == "matsu"){
				var matsu = new MatsuScene();
				gameObject[matsu.keyID] = matsu;
				game.replaceScene(gameObject[matsu.keyID]);
			}
			else if(stageSelected == "take"){
				var take = new TakeScene();
				gameObject[take.keyID] = take;
				game.replaceScene(gameObject[take.keyID]);
			}
			else if(stageSelected == "ume"){
				var ume = new UmeScene();
				gameObject[ume.keyID] = ume;
				game.replaceScene(gameObject[ume.keyID]);
			}
		}
	});
	gameObject[bg.keyID] = bg;

	game.currentScene.addChild(gameObject[bg.keyID]);
}
/* EOF */


﻿/*
* (class) LabelString
*  - extends enchant.Label
*
* 引数:
*	-{Number} x		(x座標)
*	-{Number} y		(y座標)
*	-{String} text  (文)
*	-{String} font  (フォント情報)
*	-{String} color (色)
*
* 戻り値: -

+--*
* プロパティ: 
*	-{String} keyID		(オブジェクト配列に登録するときにキー)
*	-{Number} x		(x座標)
*	-{Number} y		(y座標)
*	-{String} text  (文)
*	-{String} font  (フォント情報)
*	-{String} color (色)
*	-{Number} opacity (不透明度)
*
* メソッド  :
*	- remove() (自分を消すメソッド)
*
+--*
* ラベルの文字のクラス
*
*/
var LabelString = Class.create(Label, {
	initialize: function(x, y, text, font, color){
		Label.call(this, text);

		this.x = x;
		this.y = y;
		this.font = font;
		this.color = color;
		this.opacity = 1;
		this._element.style.lineHeight = '100%';
		this.keyID  = "label" + game.frame;
	},

	/*
	* remove()
	* 引数  : -
	* 戻り値: -
	*/
	remove: function(){
		this.parentNode.removeChild(gameObject[this.keyID]);
		delete gameObject[this.keyID];
	}
});



/*
* (class) PlusString
*  - extends LabelString
*
* 引数:
*	-{Number} x		(x座標)
*	-{Number} y		(y座標)
+	-{Number} score (点数)
*
* 戻り値: -

+--*
* プロパティ: -
* メソッド  :
*	- enterFrameAction() (定期処理で実行されるメソッド)
*
+--*
* スコアの加算分を表示するクラス
*
*/
var PlusString = Class.create(LabelString, {
	initialize: function(x, y, score){
		LabelString.call(this, x, y, ("+" + score), "35px monospace", "#f00");
		this.x += (5 * randmtm(1, 10));
		this.y += (5 * randmtm(1, 10));
		this.addEventListener(Event.ENTER_FRAME, this.enterFrameAction);
	},

	/*
	* enterFrameAction()
	* 引数  : -
	* 戻り値: -
	*/
	enterFrameAction: function(){
		//上昇
		this.y -= 8;
		//不透明度下げる
		this.opacity -= 0.05;

		//不透明度が一定になったら消す
		if(this.opacity < 0.1)this.remove();
	}
});



/*
* (class) MinusString
*  - extends LabelString
*
* 引数:
*	-{Number} x		(x座標)
*	-{Number} y		(y座標)
+*	-{Number} score (点数)
*
* 戻り値: -

+--*
* プロパティ: -
* メソッド  :
*	- enterFrameAction() (定期処理で実行されるメソッド)
*
+--*
* スコアの減算分を表示するクラス
*
*/
var MinusString = Class.create(LabelString, {
	initialize: function(x, y, score){
		LabelString.call(this, x, y, ("-" + score), "35px monospace", "#00f");
		this.addEventListener(Event.ENTER_FRAME, this.enterFrameAction);
	},

	/*
	* enterFrameAction()
	* 引数  : -
	* 戻り値: -
	*/
	enterFrameAction: function(){
		this.y += 8;
		this.opacity -= 0.05;

		if(this.opacity < 0.1)this.remove();
	}
});


﻿/*
* (class) TouchEffect
*  - extends SurfaceImageCycle
*
* 引数  :
*	-{Number} x		(x座標)
*	-{Number} y		(y座標)
*	-{Number} width (横幅)
*	-{Number} height(縦幅)
*	-{String} color (色)
* 戻り値: -

+--*
* プロパティ: 
*	-{Number} scaleX (xの拡大率)
*	-{Number} scaleY (yの拡大率)
*	-{Number} opacity(不透明度)
*	-{Number} flag   (減算・加算を制御するフラグ)
*
* メソッド  : 
*	- enterFrameAction() (定期処理で実行されるメソッド)
*
+--*
* ネタ札の一覧が更新されるときに出現する矢印
*
*/
var TouchEffect = Class.create(SurfaceImageCycle, {
	initialize: function(x, y, width, height, color){
		SurfaceImageCycle.call(this, x, y, width, height, color, color,
								(width / 2), 0, (Math.PI * 2), true);

		//初期化
		this.scaleX = 0;
		this.scaleY = 0;
		this.opacity= 0;
		this.flag   = 1;

		this.addEventListener(Event.ENTER_FRAME, this.enterFrameAction);

	},

	/*
	* enterFrameAction()
	* 引数  : -
	* 戻り値: -
	*/
	enterFrameAction: function(){
		//拡大縮小
		this.scaleX += 0.4 * this.flag;
		this.scaleY += 0.4 * this.flag;
		this.opacity+= 0.2 * this.flag;

		//縮小完了したら消す
		if(this.flag == -1  && this.scaleX <= 0.1)this.remove();
		//フラグ反転
		if(this.scaleX >= 1)this.flag *= -1;
	}
});


/*
* (class) Pointer
*  - extends SpriteImage
*
* 引数  : -
*
* 戻り値: -

+--*
* プロパティ: 
*	-{String} keyID (オブジェクト配列に登録するときにキー)
*	-{Number} speed (矢印が降下するスピード)
*	-{Number} opacity(不透明度)
*
* メソッド  : 
*	- enterFrameAction() (定期処理で実行されるメソッド)
*
+--*
* ネタ札の一覧が更新されるときに出現する矢印
*
*/
var Pointer = Class.create(SpriteImage, {
	initialize: function(){
		SpriteImage.call(this, POINTER_IMAGE, POINTER_X, POINTER_Y, POINTER_WIDTH, 
						 POINTER_HEIGHT, 0);
		this.keyID = "pt" + game.frame;

		this.speed 	 = 10;
		//不透明度を初期化
		this.opacity = 1.0;

		this.scaleX = 2.0;
		this.scaleY = 2.0;
		this.addEventListener(Event.ENTER_FRAME, this.enterFrameAction);
	},

	/*
	* enterFrameAction()
	* 引数  : -
	* 戻り値: -
	*/
	enterFrameAction: function(){
		//降下
		this.y += this.speed;
		//徐々にゆっくりと
		this.speed --;

		this.opacity -= 0.1; //不透明度を下げていく
		//不透明度が0.1を切ったら消す
		if(this.opacity <= 0.1)this.remove();
	}
});



/*
* (class) WrapBoard
*  - extends SurfaceImageRect
*
* 引数  :
*	-{Number} x (x座標)
*	-{Number} y (y座標)
*
* 戻り値: -

+--*
* プロパティ: 
*	-{String} keyID (オブジェクト配列に登録するときにキー)
*
* メソッド  : -
*
+--*
* ネタ札がタッチされたら札を青く表示するためのクラス
*
*/
var WrapBoard = Class.create(SurfaceImageRect, {
	initialize: function(x, y){
		SurfaceImageRect.call(this, x, y, BOARD_WIDTH, BOARD_HEIGHT, "rgba(0, 150, 255, 0.5)", "rgba(0, 150, 255, 0.5)");
		this.keyID = "wrapBoard";
	}
});



/*
* (class) FallEffect
*  - extends SpriteImage
*
* 引数  :
*	-{Number} x (x座標)
*	-{Number} y (y座標)
*
* 戻り値: -

+--*
* プロパティ: 
*	-{String} keyID (オブジェクト配列に登録するときにキー)
*
* メソッド  :
*	- enterFrameAction() (定期処理で実行されるメソッド)
*
+--*
* ネタ札がタッチときに表示するサンプル絵
*
*/
var FallEffect = Class.create(SpriteImage, {
	initialize: function(x, y, type){
		SpriteImage.call(this, BOARD_IMAGE, x, y, BOARD_WIDTH, BOARD_HEIGHT, type);
		this.keyID = "fall" + game.frame;

		this.addEventListener(Event.ENTER_FRAME, this.enterFrameAction);
	},

	/*
	* enterFrameAction()
	* 引数  : -
	* 戻り値: -
	*/
	enterFrameAction: function(){
		//落下させる
		this.y += 10;
		//落ち切ったら消す
		if(this.y > SCREEN_HEIGHT){
			this.remove();
		}
	}
});



/*
* (class) OjamaNotice
*  - extends SpriteImage
*
* 引数  :
*	-{Number} x (x座標)
*	-{Number} y (y座標)
*
* 戻り値: -
+--*
* プロパティ: 
*	-{String} keyID (オブジェクト配列に登録するときにキー)
*	-{Number} speed (画面に入る時のスピード)
*	-{Number} state (アニメーションの状態(タイプ))
*	-{Number} opacity (不透明度)
*
* メソッド  :
*	- enterFrameAction() (定期処理で実行されるメソッド)
*
+--*
* おじゃま板発生を通知する文字列
*
*/
var OjamaNotice = Class.create(SpriteImage, {
	initialize: function(x, y){
		SpriteImage.call(this, OJAMA_IMAGE, x, y, OJAMA_WIDTH, OJAMA_HEIGHT, 0);

		this.keyID = "ojama";

		//初期化
		this.speed = 30;
		this.state = 0;
		this.opacity = 1.0;

		this.addEventListener(Event.ENTER_FRAME, this.enterFrameAction);
	},

	/*
	* enterFrameAction()
	* 引数  : -
	* 戻り値: -
	*/
	enterFrameAction: function(){
		//ステート1　画面に侵入
		if(this.state == 0){
			//進める
			this.x += this.speed;
			//スピードは徐々に遅く
			this.speed -= 5;

			if(this.speed <= 0){
				//次のステートへ
				this.state++;
			}
		}
		//ステート2  不透明度下げ、消えていく
		else if(this.state == 1){
			this.opacity -= 0.02;

			if(this.opacity <= 0.1){
				this.state++;
			}
		}
		//ステート3　消す
		else if(this.state == 2){
			this.remove();
		}
	}
});
/* EOF */


﻿/*
* (class) ButtonR
*  - extends enchant.Group
*
* 引数:
*	-{Number} x		(x座標)
*	-{Number} y		(y座標)
*	-{Number} width (横幅)
*	-{Number} height(縦幅)
*	-{enchant.Sprite} image (ボタンの画像)
*	-{enchant.Sprite} shadow(影)
*	-{enchant.Sprite} highLight(ハイライト)
*	-{enchanr.Label}  text (ボタンの文)
*
* 戻り値: -

+--*
* プロパティ: 
*	-{Number} x		(x座標)
*	-{Number} y		(y座標)
*	-{Number} width (横幅)
*	-{Number} height(縦幅)
*	-{enchant.Sprite} image (ボタンの画像)
*	-{enchant.Sprite} shadow(影)
*	-{enchant.Sprite} highLight(ハイライト)
*	-{enchanr.Label}  text (ボタンの文)
*
* メソッド  : -
*
+--*
* スコアの加算分を表示するクラス
*
*/
var ButtonR = Class.create(Group, {
	initialize: function(x, y, width, height, text){
		Group.call(this);

		//初期値設定
		this.x = x;
		this.y = y;
		this.width = width;
		this.height = height;

		//押された時の影の画像
		this.kage = null;

		//画像設定
		this.image = new SpriteImage(TILE_IMAGE, 0, 0, this.width, this.height, 0);

		//影生成
		this.shadow = new SurfaceImageRect(0, this.height / 2, this.width, this.height / 2 + 5, "#000", "#000");
		this.shadow.scaleY = 0.5;
		this.shadow.opacity = 0.2;

		//ハイライト生成
		this.highLight = new SurfaceImageRect(2, 0, this.width - 5, this.height / 3 - 5, "#fff", "#fff");
		this.highLight.opacity = 0.3;

		//文
		this.text = new LabelString(5, 5, text, "20px monospace", "#000");

		//ノード追加
		this.addChild(this.image);
		this.addChild(this.shadow);
		this.addChild(this.highLight);
		this.addChild(this.text);
	}
});



/*
* (class) PauseButtonR
*  - extends ButtonR
*
* 引数:
*	-{Number} x		(x座標)
*	-{Number} y		(y座標)
*
* 戻り値: -

+--*
* プロパティ: 
*	-{enchanr.Label}  text (ボタンの文)
* メソッド  :
*	- touchStartAction() (タッチスタート時で実行されるメソッド)
*	- touchEndAction() (タッチエンド時で実行されるメソッド)
*
+--*
* ポーズ状態にするボタン
*
*/
var PauseButton = Class.create(ButtonR, {
	initialize: function(x, y){
		ButtonR.call(this, x, y, BOARD_WIDTH, BOARD_HEIGHT, "休憩");

		this.text.x += 20;
		this.sel = false;

		this.addEventListener(Event.TOUCH_START, this.touchStartAction);
		this.addEventListener(Event.TOUCH_END, this.touchEndAction);
		
		this.image._style["z-index"] = 1;
		this.shadow._style["z-index"] = 2;
		this.highLight._style["z-index"] = 3;
		this.text._style["z-index"] = 4;
	},

	/*
	* touchStartAction()
	* 引数  : -
	* 戻り値: -
	*/
	touchStartAction: function(){
		if(selectedFlag == 2 || selectedFlag == 1)return;
		selectedFlag = 1;
		this.kage = new SurfaceImageRect(this.parentNode.x + this.x, this.parentNode.y + this.y, this.width, this.height, "#000", "#000");
		this.kage.opacity = 0.4;
		this.kage._style["z-index"] = 5;
		this.parentNode.parentNode.addChild(this.kage);
	},

	/*
	* touchEndAction()
	* 引数  : -
	* 戻り値: -
	*/
	touchEndAction: function(){
		if(selectedFlag == 1)this.parentNode.parentNode.removeChild(this.kage);
		if(selectedFlag == 2 || selectedFlag == 4 || selectedFlag == 3)return;
		selectedFlag = 4;
		//selectedFlag = false;
		game.pushScene(new Pause());

	}
});



/*
* (class) SelectButton
*  - extends SpriteImage
*
* 引数:
*	-{Number} x		(x座標)
*	-{Number} y		(y座標)
*	-{Number} type  (種類)
*
* 戻り値: -

+--*
* プロパティ: 
*	-{enchanr.Sprite}  kage (影)
* メソッド  :
*	- touchStartAction() (タッチスタート時で実行されるメソッド)
*	- touchEndAction() (タッチエンド時で実行されるメソッド)
*
+--*
* ステージセレクトするボタン
*
*/
var SelectButton = Class.create(SpriteImage, {
	initialize: function(x, y, type){
		SpriteImage.call(this, SELECT_BUTTON_IMAGE, x, y, SELECT_BUTTON_WIDTH,SELECT_BUTTON_HEIGHT, type);
		this.kage = null;
		//this.selected = false;

		this.addEventListener(Event.TOUCH_START, this.touchStartAction);
		this.addEventListener(Event.TOUCH_END  , this.touchEndAction);
	},

	/*
	* touchStartAction()
	* 引数  : -
	* 戻り値: -
	*/
	touchStartAction: function(){
		selectedFlag = 1;
		//this.parentNode.removeChild(this.kage);
		
		//シーン遷移先の決定(種類によって遷移は分岐)
		if(this.frame == 0){
			stageSelected = "matsu";
		}
		else if(this.frame == 1){
			stageSelected = "take";
		}
		else if(this.frame == 2){
			stageSelected = "ume";
		}
		//押された影生成
		/*
		this.kage = new SurfaceImageRect(this.x, this.y, this.width, this.height, "#0bf", "#0bf");
		this.kage.opacity = 0.4;
		this.parentNode.addChild(this.kage);
		*/
	},

	/*
	* touchEndAction()
	* 引数  : -
	* 戻り値: -
	*/
	touchEndAction: function(){

	}
});



/*
* (class) ReturnButton
*  - extends ButtonR
*
* 引数:
*	-{Number} x		(x座標)
*	-{Number} y		(y座標)
*
* 戻り値: -

+--*
* プロパティ: 
*	-{enchanr.Label}  text (ボタンの文)
* メソッド  :
*	- touchStartAction() (タッチスタート時で実行されるメソッド)
*	- touchEndAction() (タッチエンド時で実行されるメソッド)
*
+--*
* ステージセレクトシーンに戻るボタン
*
*/
var ReturnButton = Class.create(ButtonR, {
	initialize: function(x, y){
		ButtonR.call(this, x, y, BOARD_WIDTH, BOARD_HEIGHT, "止める");

		//微調整
		this.text.x += 10;

		this.addEventListener(Event.TOUCH_START, this.touchStartAction);
		this.addEventListener(Event.TOUCH_END, this.touchEndAction);
	},

	/*
	* touchStartAction()
	* 引数  : -
	* 戻り値: -
	*/
	touchStartAction: function(){
		if(selectedFlag == 1 || selectedFlag == 2)return;
		selectedFlag = 2;
		//押された影生成
		if(game.currentScene.keyID.indexOf("Help") != -1 || game.currentScene.keyID.indexOf("resultScene") != -1){
			this.kage = new SurfaceImageRect(this.x, this.y, this.width, this.height, "#000", "#000");
			this.parentNode.addChild(this.kage);
		}
		else{
			this.kage = new SurfaceImageRect(this.parentNode.x + this.x, this.parentNode.y + this.y, this.width, this.height, "#000", "#000");
			this.parentNode.parentNode.addChild(this.kage);
		}
		this.kage.opacity = 0.4;
	},

	/*
	* touchEndAction()
	* 引数  : -
	* 戻り値: -
	*/
	touchEndAction: function(){
		if(selectedFlag == 2){
			this.kage.parentNode.removeChild(this.kage);
		}
		if(selectedFlag == 1 || selectedFlag == 3 || selectedFlag == 4)return;
		selectedFlag = 3;
		//selectedFlag = false;

		//戻る
		if(game.currentScene.keyID.indexOf("Help") != -1 || game.currentScene.keyID.indexOf("resultScene") != -1){
			var retScene = startFunction();
			game.replaceScene(retScene);
		}
		else{
			 var alt = new ExitAlert(40, 100);
		 	gameObject[alt.keyID] = alt;
		 	this.parentNode.parentNode.addChild(gameObject[alt.keyID]);
		}
	}
});



/*
* (class) EndButton
*  - extends ButtonR
*
* 引数:
*	-{Number} x		(x座標)
*	-{Number} y		(y座標)
*
* 戻り値: -

+--*
* プロパティ: 
*	-{enchanr.Label}  text (ボタンの文)
* メソッド  :
*	- touchStartAction() (タッチスタート時で実行されるメソッド)
*	- touchEndAction() (タッチエンド時で実行されるメソッド)
*
+--*
* 結果表示シーンに遷移するボタン
*
*/
var EndButton = Class.create(ButtonR, {
	initialize: function(x, y){
		ButtonR.call(this, x, y, BOARD_WIDTH, BOARD_HEIGHT, "結果発表");

		this.text.x;

		this.addEventListener(Event.TOUCH_START, this.touchStartAction);
		this.addEventListener(Event.TOUCH_END, this.touchEndAction);
	},

	/*
	* touchStartAction()
	* 引数  : -
	* 戻り値: -
	*/
	touchStartAction: function(){
		this.kage = new SurfaceImageRect(this.x, this.y, this.width, this.height, "#000", "#000");
		this.kage.opacity = 0.4;
		this.parentNode.addChild(this.kage);

	},

	/*
	* touchEndAction()
	* 引数  : -
	* 戻り値: -
	*/
	touchEndAction: function(){
		this.parentNode.removeChild(this.kage);
		var k = new ResultScene();
		gameObject[k.keyID] = k;
		game.replaceScene(gameObject[k.keyID]);

	}
});



/*
* (class) RetryButton
*  - extends ButtonR
*
* 引数:
*	-{Number} x		(x座標)
*	-{Number} y		(y座標)
*
* 戻り値: -

+--*
* プロパティ: 
*	-{enchanr.Label}  text (ボタンの文)
* メソッド  :
*	- touchStartAction() (タッチスタート時で実行されるメソッド)
*	- touchEndAction() (タッチエンド時で実行されるメソッド)
*
+--*
* 結果表示シーンに遷移するボタン
*
*/
var RetryButton = Class.create(ButtonR, {
	initialize: function(x, y){
		ButtonR.call(this, x, y, BOARD_WIDTH, BOARD_HEIGHT, "再挑戦");

		this.text.x += 10;

		this.addEventListener(Event.TOUCH_START, this.touchStartAction);
		this.addEventListener(Event.TOUCH_END, this.touchEndAction);
	},

	/*
	* touchStartAction()
	* 引数  : -
	* 戻り値: -
	*/
	touchStartAction: function(){
		this.kage = new SurfaceImageRect(this.x, this.y, this.width, this.height, "#000", "#000");
		this.kage.opacity = 0.4;
		this.parentNode.addChild(this.kage);
	},

	/*
	* touchEndAction()
	* 引数  : -
	* 戻り値: -
	*/
	touchEndAction: function(){
		this.parentNode.removeChild(this.kage);

		//直前にトライしていたシーンへ
		if(currentStage == "matsuScene"){
			game.replaceScene(new MatsuScene());
		}
		else if(currentStage == "takeScene"){
			game.replaceScene(new TakeScene());
		}
		else if(currentStage == "umeScene"){
			game.replaceScene(new UmeScene());
		}
	}
});



/*
* (class) StartButton
*  - extends ButtonR
*
* 引数:
*	-{Number} x		(x座標)
*	-{Number} y		(y座標)
*
* 戻り値: -

+--*
* プロパティ: 
*	-{enchanr.Label}  text (ボタンの文)
* メソッド  :
*	- touchStartAction() (タッチスタート時で実行されるメソッド)
*	- touchEndAction() (タッチエンド時で実行されるメソッド)
*
+--*
* スタート時の一時停止シーンあから、ゲームを開始するボタン
*
*/
var StartButton = Class.create(ButtonR, {
	initialize: function(x, y){
		ButtonR.call(this, x, y, BOARD_WIDTH, BOARD_HEIGHT, "開始");

		//微調整
		this.text.x += 20;
		selectedFlag = 0;
		this.addEventListener(Event.TOUCH_START, this.touchStartAction);
		this.addEventListener(Event.TOUCH_END, this.touchEndAction);
	},

	/*
	* touchStartAction()
	* 引数  : -
	* 戻り値: -
	*/
	touchStartAction: function(){
		//押された影生成
		if(selectedFlag == 1)return;
		selectedFlag++;
		this.kage = new SurfaceImageRect(this.x, this.y, this.width, this.height, "#000", "#000");
		this.kage.opacity = 0.4;
		this.parentNode.addChild(this.kage);
	},

	/*
	* touchEndAction()
	* 引数  : -
	* 戻り値: -
	*/
	touchEndAction: function(e){
		if(selectedFlag != 1 &&
		 e.x < this.x || e.x > this.x + this.width)return;
		selectedFlag = false;
		//影消去
		this.parentNode.removeChild(this.kage);

		stopGameFlag = false;
		pointSubEnable = true;
		sushiMakeEnable= true;
		clockEnable    = true;
		SUSHI_SPEED = 8;

		//戻る
		game.popScene();
	}
});



/*
* (class) HelpButton
*  - extends ButtonR
*
* 引数:
*	-{Number} x		(x座標)
*	-{Number} y		(y座標)
*
* 戻り値: -

+--*
* プロパティ: 
*	-{enchanr.Label}  text (ボタンの文)
* メソッド  :
*	- touchStartAction() (タッチスタート時で実行されるメソッド)
*	- touchEndAction() (タッチエンド時で実行されるメソッド)
*
+--*
* 結果表示シーンに遷移するボタン
*
*/
var HelpButton = Class.create(ButtonR, {
	initialize: function(x, y){
		ButtonR.call(this, x, y, BOARD_WIDTH, BOARD_HEIGHT, "説明");

		this.text.x += 20;

		this.addEventListener(Event.TOUCH_START, this.touchStartAction);
		this.addEventListener(Event.TOUCH_END, this.touchEndAction);
	},

	/*
	* touchStartAction()
	* 引数  : -
	* 戻り値: -
	*/
	touchStartAction: function(){
		if(selectedFlag == 1)return;
		this.kage = new SurfaceImageRect(this.x, this.y, this.width, this.height, "#000", "#000");
		this.kage.opacity = 0.4;
		this.parentNode.addChild(this.kage);
	},

	/*
	* touchEndAction()
	* 引数  : -
	* 戻り値: -
	*/
	touchEndAction: function(){
		if(selectedFlag == 1 || game.currentScene.keyID.indexOf("title") == -1)return;

		this.parentNode.removeChild(this.kage);
		initializeAll();
		game.replaceScene(new HelpScene());

	}
});



var ExitAlert = Class.create(Group, {
	initialize: function(x, y){
		Group.call(this);
		
		this.keyID = "alert" + game.frame;
		this.x = x;
		this.y = y;
		this.touchNo = new SurfaceImageRect(0, -100, 320, 416, "#000", "#000");
		this.touchNo.opacity = 0;
		this.bg = new SurfaceImageRect(0, 0, 210, 100, "#000", "#000");
		this.bg.opacity = 0.8;
		this.string = new LabelString(10, 10, "終了しますか?", "20px monospace", "#fff");
		this.ys = new YesButton(10, 50);
		this.n = new NoButton(110, 50);
		stopGameFlag = true;
		
		this.addChild(this.touchNo);
		this.addChild(this.bg);
		this.addChild(this.string);
		this.addChild(this.ys);
		this.addChild(this.n);
	}
});

var YesButton = Class.create(ButtonR, {
	initialize: function(x, y){
		ButtonR.call(this, x, y, BOARD_WIDTH, BOARD_HEIGHT, "はい");
		this.text.x += 20;

		this.addEventListener(Event.TOUCH_START, this.touchStartAction);
		this.addEventListener(Event.TOUCH_END, this.touchEndAction);
	},

	/*
	* touchStartAction()
	* 引数  : -
	* 戻り値: -
	*/
	touchStartAction: function(){
		if(selectedFlag == 1 || selectedFlag == 2)return;
		selectedFlag = 2;
		this.kage = new SurfaceImageRect(this.parentNode.x + this.x, this.parentNode.y + this.y, this.width, this.height, "#000", "#000");
		this.kage.opacity = 0.4;
		this.parentNode.parentNode.addChild(this.kage);
	},


	/*
	* touchEndAction()
	* 引数  : -
	* 戻り値: -
	*/
	touchEndAction: function(){
		//this.removeChild(this.kage);
		//initializeAll();
		//game.replaceScene(new HelpScene());
		//exitFlag = true;
		if(selectedFlag == 2)this.parentNode.parentNode.removeChild(this.kage);
		if(selectedFlag == 1 || selectedFlag == 3 || selectedFlag == 4 || selectedFlag == false)return;
		selectedFlag = 4;
		stopGameFlag = false;
		selectedFlag = false;
		var retScene = startFunction();
		game.replaceScene(retScene);
	}
});


var NoButton = Class.create(ButtonR, {
	initialize: function(x, y){
		ButtonR.call(this, x, y, BOARD_WIDTH, BOARD_HEIGHT, "いいえ");

		this.text.x += 8;

		this.addEventListener(Event.TOUCH_START, this.touchStartAction);
		this.addEventListener(Event.TOUCH_END, this.touchEndAction);
	},

	/*
	* touchStartAction()
	* 引数  : -
	* 戻り値: -
	*/
	touchStartAction: function(){
		if(selectedFlag == 1 || selectedFlag == 2)return;
		selectedFlag = 1;
		this.kage = new SurfaceImageRect(this.parentNode.x + this.x, this.parentNode.y + this.y, this.width, this.height, "#000", "#000");
		this.kage.opacity = 0.4;
		this.parentNode.parentNode.addChild(this.kage);
	},

	/*
	* touchEndAction()
	* 引数  : -
	* 戻り値: -
	*/
	touchEndAction: function(){
		//this.removeChild(this.kage);
		//initializeAll();
		//game.replaceScene(new HelpScene());
		//exitFlag = true;
		if(selectedFlag == 1)this.parentNode.parentNode.removeChild(this.kage);
		if(selectedFlag == 2 || selectedFlag == 3 || selectedFlag == 4 || selectedFlag == false)return;
		selectedFlag = 3;
		stopGameFlag = false;
		selectedFlag = false;
		this.parentNode.parentNode.removeChild(this.parentNode);
		selectedFlag = false;
	}
});
