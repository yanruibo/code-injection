
/**
 * tl.enchant.js
 * @version 0.3
 * @require enchant.js v0.4.3 or later
 * @author sidestepism
 *
 * @example
 * var bear = new Sprite(32, 32);
 * bear.image = game.assets['icon0.gif'];
 * bear.tl.moveTo(64, 64, 30).fadeOut(30);
 * game.rootScene.addChild(bear);
 *
 * @example
 * var bear = new Sprite(32, 32);
 * bear.tl.hide().tween({
 *     opacity: 0,
 *     scaleX: 3,
 *     scaleY: 3,
 *     time: 30
 * });
 * game.rootScene.addChild(bear);
 *
 * @example
 * var bear = new Sprite(32, 32);
 * bear.cue({
 *      0: function(){ do.something(); },
 *     10: function(){ do.something(); },
 *     20: function(){ do.something(); },
 *     30: function(){ do.something(); }
 * });
 *
 **/

/**
 * plugin namespace object
 */
enchant.tl = {};

/**
 * アクションがタイムラインに追加された時に発行されるイベント
 */
enchant.Event.ADDED_TO_TIMELINE = "addedtotimeline";
/**
 * アクションがタイムラインから削除された時に発行されるイベント
 * looped が設定されている時も、アクションは一度タイムラインから削除されもう一度追加される
 */
enchant.Event.REMOVED_FROM_TIMELINE = "removedfromtimeline";

/**
 * アクションが開始された時に発行されるイベント
 */
enchant.Event.ACTION_START = "actionstart";

/**
 * アクションが終了するときに発行されるイベント
 */
enchant.Event.ACTION_END = "actionend";

/**
 * アクションが1フレーム経過するときに発行されるイベント
 */
enchant.Event.ACTION_TICK = "actiontick";

/**
 * アクションが追加された時に、タイムラインに対して発行されるイベント
 */
enchant.Event.ACTION_ADDED = "actionadded";
/**
 * アクションが削除された時に、タイムラインに対して発行されるイベント
 */
enchant.Event.ACTION_REMOVED = "actionremoved";

/**
 * Node が生成される際に、tl プロパティに Timeline オブジェクトを追加している
 */
(function () {
    var orig = enchant.Node.prototype.initialize;
    enchant.Node.prototype.initialize = function () {
        orig.apply(this, arguments);
        var tl = this.tl = new enchant.tl.Timeline(this);
        this.addEventListener("enterframe", function () {
            tl.dispatchEvent(new enchant.Event("enterframe"));
        });
    };
})();

/**
 * @scope enchant.tl.ActionEventTarget
 */
enchant.tl.ActionEventTarget = enchant.Class.create(enchant.EventTarget, {
    /**
     * イベントリスナの実行時にコンテキストを this.target にするよう書き換えた EventTarget
     * @constructs
     * @extends enchant.EventTarget
     */
    initialize: function(){
        enchant.EventTarget.apply(this, arguments);
    },
    /**
     * Issue event.
     * @param {enchant.Event} e Event issued.
     */
    dispatchEvent: function(e) {
        if(this.node){
            var target = this.node;
            e.target = target;
            e.localX = e.x - target._offsetX;
            e.localY = e.y - target._offsetY;
        }else{
            this.node = null;
        }

        if (this['on' + e.type] != null) this['on' + e.type].call(target, e);
        var listeners = this._listeners[e.type];
        if (listeners != null) {
            listeners = listeners.slice();
            for (var i = 0, len = listeners.length; i < len; i++) {
                listeners[i].call(target, e);
            }
        }
    }
});

/**
 * @scope enchant.tl.Action
 */
enchant.tl.Action = enchant.Class.create(enchant.tl.ActionEventTarget, {
    /**
     * アクションクラス。
     * アクションはタイムラインを構成する単位であり、
     * 実行したい処理を指定するためのユニットである。
     * タイムラインに追加されたアクションは順に実行される。
     *
     * アクションが開始・終了された時に actionstart, actiontick イベントが発行され、
     * また1フレーム経過した時には actiontick イベントが発行される。
     * これらのイベントのリスナとして実行したい処理を指定する。
     *
     * time で指定されたフレーム数が経過すると自動的に次のアクションに移行するが、
     * null が指定されると、タイムラインの next メソッドが呼ばれるまで移行しない。
     *
     * @param param
     * @config {integer} [time] アクションが持続するフレーム数。 null が指定されると無限長
     * @config {function} [onactionstart] アクションが開始される時のイベントリスナ
     * @config {function} [onactiontick] アクションが1フレーム経過するときのイベントリスナ
     * @config {function} [onactionend] アクションがが終了する時のイベントリスナ
     */
    initialize: function(param){
        enchant.tl.ActionEventTarget.call(this);
        this.time = null;
        this.frame = 0;
        for(var key in param)if(param.hasOwnProperty(key)){
            if(param[key] != null)this[key] = param[key];
        }

        var action = this;

        this.timeline = null;
        this.node = null;

        this.addEventListener(enchant.Event.ADDED_TO_TIMELINE, function(evt){
            action.timeline = evt.timeline;
            action.node = evt.timeline.node;
        });

        this.addEventListener(enchant.Event.REMOVED_FROM_TIMELINE, function(evt){
            action.timeline = null;
            action.node = null;
            action.frame = 0;
        });

        this.addEventListener(enchant.Event.ACTION_TICK, function(evt){
            action.frame ++;
            if(action.time != null && action.frame > action.time){
                evt.timeline.next();
            }
        });

    }
});

/**
 * @scope enchant.tl.ParallelAction
 */
enchant.tl.ParallelAction = enchant.Class.create(enchant.tl.Action, {
    /**
     * アクションを並列で実行するためのアクション。
     * 子アクションを複数持つことができる。
     * @constructs
     * @extends enchant.tl.Action
     */
    initialize: function(param){
        enchant.tl.Action.call(this, param);
        var timeline = this.timeline;
        var node = this.node;
        /**
         * 子アクション
         */
        this.actions = [];
        /**
         * 実行が終了したアクション
         */
        this.endedActions = [];
        var that = this;

        this.addEventListener(enchant.Event.ACTION_START, function(evt){
            // start するときは同時
            for(var i = 0, len = that.actions.length; i < len; i++){
                that.actions[i].dispatchEvent(evt);
            }
        });

        this.addEventListener(enchant.Event.ACTION_TICK, function(evt){
            var i, len, timeline = {
                next: function(){
                    var action = that.actions[i];
                    that.actions.splice(i--, 1);
                    len = that.actions.length;
                    that.endedActions.push(action);

                    // イベントを発行
                    var e = new enchant.Event("actionend");
                    e.timeline = this;
                    action.dispatchEvent(e);

                    e = new enchant.Event("removedfromtimeline");
                    e.timeline = this;
                    action.dispatchEvent(e);
                }
            };
            var e = new enchant.Event("actiontick");
            e.timeline = timeline;
            for(i = 0, len = that.actions.length; i < len; i++){
                that.actions[i].dispatchEvent(e);
            }
            // 残りアクションが 0 になったら次のアクションへ
            if(that.actions.length == 0){
                evt.timeline.next();
            }
        });

        this.addEventListener(enchant.Event.ADDED_TO_TIMELINE, function(evt){
            for(var i = 0, len = that.actions.length; i < len; i++){
                that.actions[i].dispatchEvent(evt);
            }
        });

        this.addEventListener(enchant.Event.REMOVED_FROM_TIMELINE, function(evt){
            // すべて戻す
            this.actions = this.endedActions;
            this.endedActions = [];
        });

    }
});

/**
 * @scope enchant.tl.Tween
 */
enchant.tl.Tween = enchant.Class.create(enchant.tl.Action, {
    /**
     * トゥイーンクラス。
     * アクションを扱いやすく拡張したクラス。
     * オブジェクトの特定のプロパティを、なめらかに変更したい時に用いる。
     *
     * コンストラクタに渡す設定オブジェクトに、プロパティの目標値を指定すると、
     * アクションが実行された時に、目標値までなめらかに値を変更するようなアクションを生成する。
     *
     * トゥイーンのイージングも、easing プロパティで指定できる。
     * デフォルトでは enchant.Easing.LINEAR が指定されている。
     *
     * @param params
     * @config {time}
     * @config {easing} [function]
     */
    initialize: function(params){
        var origin = {};
        var target = {};
        enchant.tl.Action.call(this, params);

        if(this.easing == null) {
            // linear
            this.easing = function (t, b, c, d) {
                return c * t / d + b;
            };
        }

        var tween = this;
        this.addEventListener(enchant.Event.ACTION_START, function(){
            // トゥイーンの対象とならないプロパティ
            var excepted = ["frame", "time", "callback", "onactiontick", "onactionstart", "onactionend"];
            for (var prop in params) if (params.hasOwnProperty(prop)) {
                // 値の代わりに関数が入っていた場合評価した結果を用いる
                var target_val;
                if(typeof params[prop] == "function"){
                    target_val = params[prop].call(tween.node);
                }else target_val = params[prop];

                if(excepted.indexOf(prop) == -1) {
                    origin[prop] = tween.node[prop];
                    target[prop] = target_val;
                }
            }
        });

        this.addEventListener(enchant.Event.ACTION_TICK, function (evt) {
            var ratio = tween.easing(tween.frame, 0, 1, tween.time);
            for (var prop in target) if (target.hasOwnProperty(prop)) {
                if(typeof this[prop] === "undefined")continue;
                var val = target[prop] * ratio + origin[prop] * (1 - ratio);
                if(prop === "x" || prop === "y") {
                    tween.node[prop] = Math.round(val);
                } else {
                    tween.node[prop] = val;
                }
            }
        });
    }
});

enchant.tl.Timeline = enchant.Class.create(enchant.EventTarget, {
    /**
     * タイムラインクラス。
     * アクションを管理するためのクラス。
     * 操作するノードひとつに対して、必ずひとつのタイムラインが対応する。
     *
     * tl.enchant.js を読み込むと、Node クラスを継承したすべてのクラス (Group, Scene, Entity, Label, Sprite)の
     * tl プロパティに、タイムラインクラスのインスタンスが生成される。
     * タイムラインクラスは、自身に様々なアクションを追加するメソッドを持っており、
     * これらを使うことで簡潔にアニメーションや様々な操作をすることができる。
     *
     * @param node 操作の対象となるノード
     */
    initialize: function(node){
        enchant.EventTarget.call(this);
        this.node = node;
        this.queue = [];
        this.paused = false;
        this.looped = false;

        this._parallel = null;

        this.addEventListener(enchant.Event.ENTER_FRAME, this.tick);
    },
    /**
     * キューの先頭にあるアクションを終了し、次のアクションへ移行する。
     * アクションの中から呼び出されるが、外から呼び出すこともできる。
     *
     * アクション実行中に、アクションが終了した場合、
     * もう一度 tick() 関数が呼ばれるため、1フレームに複数のアクションが処理される場合もある。
     * ex.
     *   sprite.tl.then(function A(){ .. }).then(function B(){ .. });
     * と記述した場合、最初のフレームで A・B の関数どちらも実行される
     *
     */
    next: function(){
        var e, action = this.queue.shift();
        e = new enchant.Event("actionend");
        e.timeline = this;
        action.dispatchEvent(e);

        if(this.looped){
            e = new enchant.Event("removedfromtimeline");
            e.timeline = this;
            action.dispatchEvent(e);

            // 再度追加する
            e = new enchant.Event("addedtotimeline");
            e.timeline = this;
            action.dispatchEvent(e);

            this.add(action);
        }else{
            // イベントを発行して捨てる
            e = new enchant.Event("removedfromtimeline");
            e.timeline = this;
            action.dispatchEvent(e);
        }
        this.dispatchEvent(new enchant.Event("enterframe"));
    },
    /**
     * ターゲットの enterframe イベントのリスナとして登録される関数
     * 1フレーム経過する際に実行する処理が書かれている。
     * (キューの先頭にあるアクションに対して、actionstart/actiontickイベントを発行する)
     */
    tick: function(){
        if(this.queue.length > 0){
            var action = this.queue[0];
            if(action.frame == 0){
                e = new enchant.Event("actionstart");
                e.timeline = this;
                action.dispatchEvent(e);
            }
            var e = new enchant.Event("actiontick");
            e.timeline = this;
            action.dispatchEvent(e);
        }
    },
    add: function(action){
        if(this._parallel){
            this._parallel.actions.push(action);
            this._parallel = null;
        }else{
            this.queue.push(action);
        }

        var e = new enchant.Event("addedtotimeline");
        e.timeline = this;
        action.dispatchEvent(e);

        e = new enchant.Event("actionadded");
        e.action = action;
        this.dispatchEvent(e);

        return this;
    },
    /**
     * アクションを簡単に追加するためのメソッド。
     * 実体は add メソッドのラッパ。
     * @param params アクションの設定オブジェクト
     */
    action: function(params){
        return this.add(new enchant.tl.Action(params));
    },
    /**
     * トゥイーンを簡単に追加するためのメソッド。
     * 実体は add メソッドのラッパ。
     * @param params トゥイーンの設定オブジェクト。
     */
    tween: function(params){
        return this.add(new enchant.tl.Tween(params));
    },
    /**
     * タイムラインのキューをすべて破棄する。終了イベントは発行されない。
     */
    clear: function(){
        var e = new enchant.Event("removedfromtimeline");
        e.timeline = this;

        for(var i = 0, len = this.queue.length; i < len; i++){
            this.queue[i].dispatchEvent(e);
        }
        this.queue = [];
        return this;
    },
    /**
     * タイムラインを早送りする。
     * 指定したフレーム数が経過したのと同様の処理を、瞬時に実行する。
     * 巻き戻しはできない。
     * @param frames
     */
    skip: function(frames){
        while(frames --){
            this.dispatchEvent(new enchant.Event("enterframe"));
        }
        return this;
    },
    /**
     * タイムラインの実行を一時停止する
     */
    pause: function(){
        this.paused = false;
        return this;
    },
    /**
     * タイムラインの実行を再開する
     */
    resume: function(){
        this.paused = true;
        return this;
    },
    /**
     * タイムラインをループさせる。
     * ループしているときに終了したアクションは、タイムラインから取り除かれた後
     * 再度タイムラインに追加される。このアクションは、ループが解除されても残る。
     */
    loop: function(){
        this.looped = true;
        return this;
    },
    /**
     * タイムラインのループを解除する。
     */
    unloop: function(){
        this.looped = false;
        return this;
    },
    /**
     * 指定したフレーム数だけ待ち、何もしないアクションを追加する。
     * @param time
     */
    delay: function(time){
        this.add(new enchant.tl.Action({
            time: time
        }));
        return this;
    },
    /**
     * @ignore
     * @param time
     */
    wait: function(time){
        // reserved
        return this;
    },
    /**
     * 関数を実行し、即時に次のアクションに移るアクションを追加する。
     * @param func
     */
    then: function(func){
        var timeline = this;
        this.add(new enchant.tl.Action({
                    onactionstart: func,
                    onactiontick: function(evt){
                        timeline.next();
                    }
                }));
        return this;
    },
    /**
     * then メソッドのシノニム。
     * 関数を実行し、即時に次のアクションに移る。
     * @param func
     */
    exec: function(func){
        this.then(func);
    },
    /**
     * 実行したい関数を、フレーム数をキーとした連想配列(オブジェクト)で複数指定し追加する。
     * 内部的には delay, then を用いている。
     *
     * @example
     * sprite.tl.cue({
     *    10: function(){ 10フレーム経過した後に実行される関数 },
     *    20: function(){ 20フレーム経過した後に実行される関数 },
     *    30: function(){ 30フレーム経過した後に実行される関数 }
     * });
     * @param cue キューオブジェクト
     */
    cue: function(cue){
        var ptr = 0;
        for(var frame in cue)if(cue.hasOwnProperty(frame)){
            this.delay(frame - ptr);
            this.then(cue[frame]);
            ptr = frame;
        }
    },
    /**
     * ある関数を指定したフレーム数繰り返し実行するアクションを追加する。
     * @param func 実行したい関数
     * @param time 持続フレーム数
     */
    repeat: function(func, time){
        this.add(new enchant.tl.Action({
            onactiontick: function(evt){
                func.call(this);
            },
            time: time
        }));
        return this;
    },
    /**
     * 複数のアクションを並列で実行したいときに指定する。
     * and で結ばれたすべてのアクションが終了するまで次のアクションには移行しない
     * @example
     * sprite.tl.fadeIn(30).and.rotateBy(360, 30);
     * 30フレームでフェードインしながら 360度回転する
     */
    and: function(){
        var last = this.queue.pop();
        if(last instanceof enchant.tl.ParallelAction){
            this._parallel = last;
            this.queue.push(last);
        }else{
            var parallel = new enchant.tl.ParallelAction();
            parallel.actions.push(last)
            this.queue.push(parallel);
            this._parallel = parallel;
        }
        return this;
    },
    /**
     * @ignore
     */
    or: function(){
        return this;
    },
    /**
     * @ignore
     */
    doAll: function(children){
        return this;
    },
    /**
     * @ignore
     */
    waitAll: function(){
        return this;
    },
    /**
     * true値 が返るまで、関数を毎フレーム実行するアクションを追加する。
     * @example
     * sprite.tl.waitUntil(function(){
     *    return this.x-- < 0
     * }).then(function(){ .. });
     * // x 座標が負になるまで毎フレーム x座標を減算し続ける
     *
     * @param func 実行したい関数
     */
    waitUntil: function(func){
        var timeline = this;
        this.add(new enchant.tl.Action({
                    onactionstart: func,
                    onactiontick: function(func){
                        if(func.call(this)){
                            timeline.next();
                        }
                    }
                }));
        return this;
    },
    /**
     * Entity の不透明度をなめらかに変えるアクションを追加する。
     * @param opacity 目標の不透明度
     * @param time フレーム数
     * @param [easing] イージング関数
     */
    fadeTo: function(opacity, time, easing){
        this.tween({
            opacity: opacity,
            time: time,
            easing: easing
        });
        return this;
    },
    /**
     * Entity をフェードインするアクションを追加する。
     * fadeTo(1) のエイリアス。
     * @param time フレーム数
     * @param [easing] イージング関数
     */
    fadeIn: function(time, easing){
        return this.fadeTo(1, time, easing);
    },
    /**
     * Entity をフェードアウトするアクションを追加する。
     * fadeTo(1) のエイリアス。
     * @param time フレーム数
     * @param [easing] イージング関数
     */
    fadeOut: function(time, easing){
        return this.fadeTo(0, time, easing);
    },
    /**
     * Entity の位置をなめらかに移動させるアクションを追加する。
     * @param x 目標のx座標
     * @param y 目標のy座標
     * @param time フレーム数
     * @param [easing] イージング関数
     */
    moveTo: function(x, y, time, easing){
        return this.tween({
            x: x,
            y: y,
            time: time,
            easing: easing
        });
    },
    /**
     * Entity のx座標をなめらかに変化させるアクションを追加する。
     * @param x
     * @param time
     * @param [easing]
     */
    moveX: function(x, time, easing){
        return this.tween({
            x: x,
            time: time,
            easing: easing
        });
    },
    /**
     * Entity のy座標をなめらかに変化させるアクションを追加する。
     * @param y
     * @param time
     * @param [easing]
     */
    moveY: function(y, time, easing){
        return this.tween({
            y: y,
            time: time,
            easing: easing
        });
    },
    /**
     * Entity の位置をなめらかに変化させるアクションを追加する。
     * 座標は、アクション開始時からの相対座標で指定する。
     * @param x
     * @param y
     * @param time
     * @param [easing]
     */
    moveBy: function(x, y, time, easing){
        return this.tween({
            x: function(){ return this.x + x },
            y: function(){ return this.y + y },
            time: time,
            easing: easing
        });
    },
    /**
     * Entity の opacity を0にする (即時)
     */
    hide: function(){
        return this.then(function(){
            this.opacity = 0;
        });
    },
    /**
     * Entity の opacity を1にする (即時)
     */
    show: function(){
        return this.then(function(){
            this.opacity = 1;
        });
    },
    /**
     * Entity をシーンから削除する。
     * シーンから削除された場合、 enterframe イベントは呼ばれなくなるので、
     * タイムラインも止まることに注意。
     * これ以降のアクションは、再度シーンに追加されるまで実行されない。
     */
    removeFromScene: function(){
        return this.then(function(){
            this.scene.removeChild(this);
        });
    },
    /**
     * Entity をなめらかに拡大・縮小するアクションを追加する。
     * @param scale 相対縮尺
     * @param time
     * @param [easing]
     */
    scaleTo: function(scale, time, easing){
        return this.tween({
            scaleX: scale,
            scaleY: scale,
            time: time,
            easing: easing
        });
    },
    /**
     * Entity をなめらかに拡大・縮小させるアクションを追加する。
     * 相対縮尺 (ex. アクション開始時の縮尺の n 倍) で指定する。
     * @param scale 相対縮尺
     * @param time
     * @param [easing]
     */
    scaleBy: function(scale, time, easing){
        return this.tween({
            scaleX: function(){ return this.scaleX * scale },
            scaleY: function(){ return this.scaleY * scale },
            time: time,
            easing: easing
        })
    },
    /**
     * Entity をなめらかに回転させるアクションを追加する。
     * @param deg 目標の回転角度 (弧度法: 1回転を 360 とする)
     * @param time フレーム数
     * @param [easing] イージング関数
     */
    rotateTo: function(deg, time, easing){
        return this.tween({
            rotation: deg,
            time: time,
            easing: easing
        });
    },
    /**
     * Entity をなめらかに回転させるアクションを追加する。
     * 角度は相対角度 (アクション開始時の角度から更に n 度) で指定する
     * @param deg 目標の相対角度 (弧度法: 1回転を 360 とする)
     * @param time フレーム数
     * @param [easing] イージング関数
     */
    rotateBy: function(deg, time, easing){
        return this.tween({
            rotation: function(){ return this.rotation + deg },
            time: time,
            easing: easing
        })
    }});

/**
 * ============================================================================================
 * Easing Equations v2.0
 * September 1, 2003
 * (c) 2003 Robert Penner, all rights reserved.
 * This work is subject to the terms in http://www.robertpenner.com/easing_terms_of_use.html.
 * ============================================================================================
 */

/**
 * イージング関数ライブラリ
 * ActionScript で広く使われている
 * Robert Penner による Easing Equations を JavaScript に移植した。
 * @scope enchant.Easing
 */
enchant.Easing = {
    LINEAR: function (t, b, c, d) {
        return c * t / d + b;
    },
    // quad
    QUAD_EASEIN: function (t, b, c, d) {
        return c * (t /= d) * t + b;
    },
    QUAD_EASEOUT: function (t, b, c, d) {
        return -c * (t /= d) * (t - 2) + b;
    },
    QUAD_EASEINOUT: function (t, b, c, d) {
        if((t /= d / 2) < 1) return c / 2 * t * t + b;
        return -c / 2 * ((--t) * (t - 2) - 1) + b;
    },
    // cubic
    CUBIC_EASEIN: function (t, b, c, d) {
        return c * (t /= d) * t * t + b;
    },
    CUBIC_EASEOUT: function (t, b, c, d) {
        return c * ((t = t / d - 1) * t * t + 1) + b;
    },
    CUBIC_EASEINOUT: function (t, b, c, d) {
        if((t /= d / 2) < 1) return c / 2 * t * t * t + b;
        return c / 2 * ((t -= 2) * t * t + 2) + b;
    },
    // quart
    QUART_EASEIN: function (t, b, c, d) {
        return c * (t /= d) * t * t * t + b;
    },
    QUART_EASEOUT: function (t, b, c, d) {
        return -c * ((t = t / d - 1) * t * t * t - 1) + b;
    },
    QUART_EASEINOUT: function (t, b, c, d) {
        if((t /= d / 2) < 1) return c / 2 * t * t * t * t + b;
        return -c / 2 * ((t -= 2) * t * t * t - 2) + b;
    },
    // quint
    QUINT_EASEIN: function (t, b, c, d) {
        return c * (t /= d) * t * t * t * t + b;
    },
    QUINT_EASEOUT: function (t, b, c, d) {
        return c * ((t = t / d - 1) * t * t * t * t + 1) + b;
    },
    QUINT_EASEINOUT: function (t, b, c, d) {
        if((t /= d / 2) < 1) return c / 2 * t * t * t * t * t + b;
        return c / 2 * ((t -= 2) * t * t * t * t + 2) + b;
    },
    //sin
    SIN_EASEIN: function (t, b, c, d) {
        return -c * Math.cos(t / d * (Math.PI / 2)) + c + b;
    },
    SIN_EASEOUT: function (t, b, c, d) {
        return c * Math.sin(t / d * (Math.PI / 2)) + b;
    },
    SIN_EASEINOUT: function (t, b, c, d) {
        return -c / 2 * (Math.cos(Math.PI * t / d) - 1) + b;
    },
    // circ
    CIRC_EASEIN: function (t, b, c, d) {
        return -c * (Math.sqrt(1 - (t /= d) * t) - 1) + b;
    },
    CIRC_EASEOUT: function (t, b, c, d) {
        return c * Math.sqrt(1 - (t = t / d - 1) * t) + b;
    },
    CIRC_EASEINOUT: function (t, b, c, d) {
        if((t /= d / 2) < 1) return -c / 2 * (Math.sqrt(1 - t * t) - 1) + b;
        return c / 2 * (Math.sqrt(1 - (t -= 2) * t) + 1) + b;
    },
    // elastic
    ELASTIC_EASEIN: function (t, b, c, d, a, p) {
        if(t == 0) return b;
        if((t /= d) == 1) return b + c;
        if(!p) p = d * .3;
        if(!a || a < Math.abs(c)) {
            a = c;
            var s = p / 4;
        }
        else var s = p / (2 * Math.PI) * Math.asin(c / a);
        return -(a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
    },
    ELASTIC_EASEOUT: function (t, b, c, d, a, p) {
        if(t == 0) return b;
        if((t /= d) == 1) return b + c;
        if(!p) p = d * .3;
        if(!a || a < Math.abs(c)) {
            a = c;
            var s = p / 4;
        }
        else var s = p / (2 * Math.PI) * Math.asin(c / a);
        return (a * Math.pow(2, -10 * t) * Math.sin((t * d - s) * (2 * Math.PI) / p) + c + b);
    },
    ELASTIC_EASEINOUT: function (t, b, c, d, a, p) {
        if(t == 0) return b;
        if((t /= d / 2) == 2) return b + c;
        if(!p) p = d * (.3 * 1.5);
        if(!a || a < Math.abs(c)) {
            a = c;
            var s = p / 4;
        }
        else var s = p / (2 * Math.PI) * Math.asin(c / a);
        if(t < 1) return -.5 * (a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
        return a * Math.pow(2, -10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p) * .5 + c + b;
    },
    // bounce
    BOUNCE_EASEOUT: function (t, b, c, d) {
        if((t /= d) < (1 / 2.75)) {
            return c * (7.5625 * t * t) + b;
        } else if(t < (2 / 2.75)) {
            return c * (7.5625 * (t -= (1.5 / 2.75)) * t + .75) + b;
        } else if(t < (2.5 / 2.75)) {
            return c * (7.5625 * (t -= (2.25 / 2.75)) * t + .9375) + b;
        } else {
            return c * (7.5625 * (t -= (2.625 / 2.75)) * t + .984375) + b;
        }
    },
    BOUNCE_EASEIN: function (t, b, c, d) {
        return c - enchant.Easing.BOUNCE_EASEOUT(d - t, 0, c, d) + b;
    },
    BOUNCE_EASEINOUT: function (t, b, c, d) {
        if(t < d / 2) return enchant.Easing.BOUNCE_EASEIN(t * 2, 0, c, d) * .5 + b;
        else return enchant.Easing.BOUNCE_EASEOUT(t * 2 - d, 0, c, d) * .5 + c * .5 + b;
    },
    // back
    BACK_EASEIN: function (t, b, c, d, s) {
        if(s == undefined) s = 1.70158;
        return c * (t /= d) * t * ((s + 1) * t - s) + b;
    },
    BACK_EASEOUT: function (t, b, c, d, s) {
        if(s == undefined) s = 1.70158;
        return c * ((t = t / d - 1) * t * ((s + 1) * t + s) + 1) + b;
    },
    BACK_EASEINOUT: function (t, b, c, d, s) {
        if(s == undefined) s = 1.70158;
        if((t /= d / 2) < 1) return c / 2 * (t * t * (((s *= (1.525)) + 1) * t - s)) + b;
        return c / 2 * ((t -= 2) * t * (((s *= (1.525)) + 1) * t + s) + 2) + b;
    },
    // expo
    EXPO_EASEIN: function (t, b, c, d) {
        return (t == 0) ? b : c * Math.pow(2, 10 * (t / d - 1)) + b;
    },
    EXPO_EASEOUT: function (t, b, c, d) {
        return (t == d) ? b + c : c * (-Math.pow(2, -10 * t / d) + 1) + b;
    },
    EXPO_EASEINOUT: function (t, b, c, d) {
        if(t == 0) return b;
        if(t == d) return b + c;
        if((t /= d / 2) < 1) return c / 2 * Math.pow(2, 10 * (t - 1)) + b;
        return c / 2 * (-Math.pow(2, -10 * --t) + 2) + b;
    }
};

/**
 * Easing Equations v2.0
 */

// Generated by CoffeeScript 1.3.1
var BlackOut, Box, ContinueScene, Count, GameScene, GameoverScene, InviteMenu, InviteResultScene, MainScene, MyGame, Score, TitleMenu, TitleScene, UseStoneScene, WhiteLabel,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

enchant();

MyGame = (function(_super) {

  __extends(MyGame, _super);

  MyGame.name = 'MyGame';

  function MyGame() {
    var arg, data, loading, param, _i, _len;
    MyGame.__super__.constructor.call(this, 320, 480);
    loading = new Label;
    loading.text = 'Now Loading...';
    loading.color = 'white';
    loading.font = '24px';
    loading.textAlign = 'center';
    loading.y = 120;
    this.loadingScene.addChild(loading);
    this.preload('./img/buttons.png', './img/box.png');
    this.user_id = this.device = this.version = '';
    this.my_invite_code = this.magic_stone = 0;
    data = location.search.split('?');
    if (data.length > 1) {
      data = data[1].split('&');
    }
    for (_i = 0, _len = data.length; _i < _len; _i++) {
      param = data[_i];
      arg = param.split('=');
      if (arg[0] === 'id') {
        this.user_id = arg[1];
      } else if (arg[0] === 'device') {
        this.device = arg[1];
      } else if (arg[0] === 'version') {
        this.version = arg[1];
      }
    }
    this.rootScene.backgroundColor = 'black';
    this.fps = 20;
    this.score = 0;
    this.onload = function() {
      this.pushScene(new MainScene());
      return this.pushScene(new TitleScene());
    };
    this.start();
  }

  return MyGame;

})(Game);

Array.prototype.shuffle = function() {
  var i, j, t;
  i = this.length;
  while (i) {
    j = Math.floor(Math.random() * i);
    t = this[--i];
    this[i] = this[j];
    this[j] = t;
  }
  return this;
};

window.onload = function() {
  return new MyGame();
};

Box = (function(_super) {

  __extends(Box, _super);

  Box.name = 'Box';

  function Box(w, h, color) {
    var c, s;
    Box.__super__.constructor.call(this, w, h);
    s = new Surface(w, h);
    c = s.context;
    c.fillStyle = color || 'white';
    c.fillRect(0, 0, w, h);
    this.image = s;
  }

  return Box;

})(Sprite);

WhiteLabel = (function(_super) {

  __extends(WhiteLabel, _super);

  WhiteLabel.name = 'WhiteLabel';

  function WhiteLabel() {
    WhiteLabel.__super__.constructor.apply(this, arguments);
    this.color = 'white';
    this.textAlign = 'center';
    this.x = 10;
  }

  return WhiteLabel;

})(Label);

ContinueScene = (function(_super) {

  __extends(ContinueScene, _super);

  ContinueScene.name = 'ContinueScene';

  function ContinueScene() {
    var game;
    ContinueScene.__super__.constructor.apply(this, arguments);
    game = Game.instance;
    this.addEventListener(Event.ENTER_FRAME, function() {
      var board, continue_button, magic_stone, negative, positive, stone;
      this.removeEventListener(Event.ENTER_FRAME, arguments.callee);
      if (game.magic_stone) {
        board = new Sprite(280, 190);
        board.image = game.assets['./img/box.png'];
        board.x = 20;
        board.y = 180;
        board.opacity = 0.9;
        this.addChild(board);
        continue_button = new Label;
        continue_button.text = '魔法石を使用してコンティニュー';
        continue_button._element.style.fontSize = '20px';
        continue_button.x = 25;
        continue_button.y = 200;
        this.addChild(continue_button);
        stone = new Sprite(40, 40);
        stone.image = game.assets['./img/buttons.png'];
        stone.frame = 2;
        stone.x = 100;
        stone.y = 240;
        this.addChild(stone);
        magic_stone = new Label;
        magic_stone.text = game.magic_stone + '個所持';
        magic_stone.x = 140;
        magic_stone.y = 252;
        magic_stone._element.style.fontSize = '20px';
        this.addChild(magic_stone);
        positive = new Sprite(100, 50);
        positive.x = 50;
        positive.y = 300;
        positive.image = game.assets['./img/buttons.png'];
        positive._element.style.zIndex = 100;
        positive.frame = 10;
        positive.addEventListener(Event.TOUCH_END, function() {
          if (game.user_id) {
            return $.getJSON('http://fe.igomovie.net/dec_magic_stone', {
              user_id: game.user_id,
              time: ~(new Date)
            }, function(json) {
              var use_stone;
              use_stone = new UseStoneScene(json);
              return game.pushScene(use_stone);
            });
          }
        });
        this.addChild(positive);
        negative = new Sprite(100, 50);
        negative.x = 170;
        negative.y = 300;
        negative.image = game.assets['./img/buttons.png'];
        negative._element.style.zIndex = 100;
        negative.frame = 9;
        negative.addEventListener(Event.TOUCH_END, function() {
          $('#tweet').css({
            top: 210 * game.scale
          }).show();
          game.removeScene(game.currentScene);
          if (showAd) {
            return showAd();
          }
        });
        return this.addChild(negative);
      } else {
        $('#tweet').css({
          top: 210 * game.scale
        }).show();
        game.removeScene(game.currentScene);
        if (showAd) {
          return showAd();
        }
      }
    });
  }

  return ContinueScene;

})(Scene);

BlackOut = (function(_super) {

  __extends(BlackOut, _super);

  BlackOut.name = 'BlackOut';

  function BlackOut() {
    var c, surface;
    BlackOut.__super__.constructor.call(this, 320, 480);
    surface = new Surface(320, 480);
    c = surface.context;
    c.fillStyle = 'black';
    c.fillRect(0, 0, 320, 480);
    this.image = surface;
    this.opacity = 0;
    this._element.style.zIndex = 200;
  }

  BlackOut.prototype.onRun = function(callback) {
    var game;
    game = Game.instance;
    return this.tl.fadeIn(5).delay(5).then(function() {
      game.removeScene(game.currentScene);
      if (callback && typeof callback === 'function') {
        return callback();
      }
    });
  };

  return BlackOut;

})(Sprite);

GameoverScene = (function(_super) {

  __extends(GameoverScene, _super);

  GameoverScene.name = 'GameoverScene';

  function GameoverScene() {
    var black, c, game, gameover, next, s, score;
    GameoverScene.__super__.constructor.apply(this, arguments);
    game = Game.instance;
    stopBGM();
    black = new Sprite(320, 480);
    s = new Surface(320, 480);
    c = s.context;
    c.fillStyle = 'black';
    c.fillRect(0, 0, 320, 480);
    black.image = s;
    black.opacity = 0;
    black.addEventListener(Event.ENTER_FRAME, function() {
      this.removeEventListener(Event.ENTER_FRAME, arguments.callee);
      return this.tl.tween({
        opacity: 0.8,
        time: 10
      }).then(function() {
        $('#tweet').find('a').attr({
          href: 'https://twitter.com/intent/tweet?hashtags=間違い探し&text=スコア' + game.score + '点だったよ 新作の脳トレ漢字間違い探し http://goo.gl/2faO3'
        });
        return $('#tweet').css({
          top: 210 * game.scale
        }).show();
      }).then(function() {
        $('#tweet').hide();
        return game.pushScene(new ContinueScene);
      });
    });
    this.addChild(black);
    gameover = new WhiteLabel;
    gameover.text = 'GAMEOVER';
    gameover.y = 60;
    gameover._element.style.fontSize = '50px';
    this.addChild(gameover);
    score = new WhiteLabel;
    score.text = game.score + '点';
    score.y = 140;
    score._element.style.fontSize = '30px';
    this.addChild(score);
    next = new WhiteLabel;
    next.text = 'タイトルに戻る';
    next.y = 340;
    next._element.style.fontSize = '30px';
    next.addEventListener(Event.TOUCH_END, function() {
      $('#tweet').css({
        top: -50
      }).hide();
      game.score = 0;
      game.removeScene(game.currentScene);
      game.removeScene(game.currentScene);
      game.removeScene(game.currentScene);
      game.pushScene(new MainScene());
      return game.pushScene(new TitleScene());
    });
    this.addChild(next);
  }

  return GameoverScene;

})(Scene);

InviteMenu = (function(_super) {

  __extends(InviteMenu, _super);

  InviteMenu.name = 'InviteMenu';

  function InviteMenu() {
    var back, game, invite_button, invite_menu, inviteerform, inviteerid, show_id_form, title, yourid;
    InviteMenu.__super__.constructor.apply(this, arguments);
    game = Game.instance;
    invite_menu = this;
    invite_menu.x = 330;
    title = new WhiteLabel;
    title.text = '招待';
    title.y = 10;
    title._element.style.fontSize = '40px';
    this.addChild(title);
    inviteerid = new WhiteLabel;
    inviteerid.text = '招待者のID';
    inviteerid.y = 70;
    inviteerid._element.style.fontSize = '20px';
    this.addChild(inviteerid);
    inviteerform = new Label;
    inviteerform.text = '<input id="input_invite_code" type="text" value="" />';
    inviteerform.textAlign = 'center';
    inviteerform.x = 10;
    inviteerform.y = 100;
    this.addChild(inviteerform);
    invite_button = new Sprite(200, 50);
    invite_button.image = game.assets['./img/buttons.png'];
    invite_button.x = 60;
    invite_button.y = 130;
    invite_button.frame = 3;
    invite_button.addEventListener(Event.TOUCH_END, function() {
      var input_invite_code;
      input_invite_code = $('#input_invite_code').val();
      if (game.user_id && input_invite_code) {
        return $.getJSON('http://fe.igomovie.net/input_invite_code', {
          user_id: game.user_id,
          input_invite_code: input_invite_code,
          time: ~(new Date)
        }, function(json) {
          var invite_result;
          invite_result = new InviteResultScene(json);
          return game.pushScene(invite_result);
        });
      }
    });
    this.addChild(invite_button);
    yourid = new WhiteLabel;
    yourid.text = 'あなたのID';
    yourid.y = 220;
    yourid._element.style.fontSize = '20px';
    this.addChild(yourid);
    show_id_form = new Label;
    show_id_form.x = 10;
    show_id_form.y = 250;
    show_id_form.textAlign = 'center';
    show_id_form.addEventListener(Event.ENTER_FRAME, function() {
      if (game.my_invite_code) {
        show_id_form.text = '<input type="text" value="' + game.my_invite_code + '" />';
        return this.removeEventListener(Event.ENTER_FRAME, arguments.callee);
      }
    });
    this.addChild(show_id_form);
    back = new Sprite(50, 50);
    back.image = game.assets['./img/buttons.png'];
    back.x = back.y = 10;
    this.addChild(back);
    this.back = back;
    this.invite_active = 0;
  }

  InviteMenu.prototype.activate = function() {
    var game, scene;
    game = Game.instance;
    scene = game.currentScene;
    if (!this.invite_active) {
      $('#invite').show().find('.text').css({
        fontSize: 14 * game.scale
      });
      $('#invite').find('img').each(function() {
        return $(this).css({
          width: $(this).width() * game.scale,
          height: $(this).height() * game.scale
        });
      });
      $('#invite').css({
        top: 300 * game.scale
      });
      $('#invite').hide();
      this.invite_active = 1;
    }
    return this.back.addEventListener(Event.TOUCH_END, function() {
      $('#invite').hide();
      scene.invite_menu.tl.tween({
        x: 330,
        time: 10
      }).then(function() {
        return $('#invite').hide();
      });
      scene = game.currentScene;
      scene.title_menu.tl.tween({
        x: 0,
        time: 10
      }).then(function() {
        return scene.invite_menu.deactivate();
      });
      return scene.reflesh_user_data();
    });
  };

  InviteMenu.prototype.deactivate = function() {
    return this.back.clearEventListener;
  };

  return InviteMenu;

})(Group);

InviteResultScene = (function(_super) {

  __extends(InviteResultScene, _super);

  InviteResultScene.name = 'InviteResultScene';

  function InviteResultScene(json) {
    var board, error_text, game, magic_stone, positive, stone, text;
    InviteResultScene.__super__.constructor.apply(this, arguments);
    game = Game.instance;
    board = new Sprite(280, 190);
    board.image = game.assets['./img/box.png'];
    board.x = 20;
    board.y = 100;
    board.opacity = 0.9;
    this.addChild(board);
    positive = new Sprite(100, 50);
    positive.x = 110;
    positive.y = 220;
    positive.image = game.assets['./img/buttons.png'];
    positive._element.style.zIndex = 100;
    positive.frame = 11;
    positive.addEventListener(Event.TOUCH_END, function() {
      return game.removeScene(game.currentScene);
    });
    this.addChild(positive);
    if (json.inc_magic_stone) {
      text = new Label;
      text.text = '招待ﾌﾟﾚｾﾞﾝﾄ 魔法石ｹﾞｯﾄ!!';
      text.y = 130;
      text._element.style.fontSize = '20px';
      text.textAlign = 'center';
      this.addChild(text);
      stone = new Sprite(40, 40);
      stone.image = game.assets['./img/buttons.png'];
      stone.frame = 2;
      stone.x = 100;
      stone.y = 160;
      this.addChild(stone);
      magic_stone = new Label;
      magic_stone.text = json.inc_magic_stone + '個GET!!';
      magic_stone.x = 140;
      magic_stone.y = 172;
      magic_stone._element.style.fontSize = '20px';
      this.addChild(magic_stone);
    } else {
      error_text = new Label;
      error_text.text = '招待ﾌﾟﾚｾﾞﾝﾄを受け取り済みか無効なIDです';
      error_text.x = 60;
      error_text.y = 160;
      this.addChild(error_text);
    }
  }

  return InviteResultScene;

})(Scene);

Count = (function(_super) {

  __extends(Count, _super);

  Count.name = 'Count';

  function Count() {
    Count.__super__.constructor.apply(this, arguments);
    this.text = 0;
    this.color = 'white';
    this._element.style.fontSize = '40px';
    this._element.style.textAlign = 'right';
    this.addEventListener(Event.ENTER_FRAME, this.on_enter_frame);
  }

  Count.prototype.on_enter_frame = function() {
    var game, scene, time_count;
    game = Game.instance;
    scene = game.currentScene;
    time_count = ~~(game.remain_time - ((~~(new Date) - scene.start) / 1000));
    if (time_count < 0) {
      this.stop();
      game.pushScene(new GameoverScene);
      return;
    }
    return this.text = time_count + '秒';
  };

  Count.prototype.start = function() {
    var game, scene;
    game = Game.instance;
    scene = game.currentScene;
    scene.start = ~~(new Date);
    return this.addEventListener(Event.ENTER_FRAME, this.on_enter_frame);
  };

  Count.prototype.stop = function() {
    return this.removeEventListener(Event.ENTER_FRAME, this.on_enter_frame);
  };

  return Count;

})(Label);

Score = (function(_super) {

  __extends(Score, _super);

  Score.name = 'Score';

  function Score() {
    var game;
    Score.__super__.constructor.apply(this, arguments);
    game = Game.instance;
    this.text = game.score || 0;
    this.color = 'white';
    this._element.style.fontSize = '40px';
    this._element.style.textAlign = 'right';
  }

  Score.prototype.score_reflesh = function(new_score) {
    return this.addEventListener(Event.ENTER_FRAME, function() {
      var diff, old_score;
      if (this.text >= new_score) {
        return;
      }
      old_score = this.text;
      diff = new_score - old_score;
      if (diff > 10) {
        return this.text = 10 + ~~old_score;
      } else {
        return this.text = 1 + ~~old_score;
      }
    });
  };

  return Score;

})(Label);

MainScene = (function(_super) {

  __extends(MainScene, _super);

  MainScene.name = 'MainScene';

  function MainScene() {
    var edge, game, map, stage;
    MainScene.__super__.constructor.apply(this, arguments);
    game = Game.instance;
    game.remain_time = 30;
    game.heal_time = 10;
    edge = 4;
    stage = 0;
    map = 1;
    game.remain_time = game.remain_time - game.heal_time;
    this.addEventListener(Event.ENTER_FRAME, function() {
      var data, decoy, i, result, _i, _ref;
      data = new Array();
      decoy = '縁';
      result = '緑';
      stage++;
      if (stage % 5 === 0) {
        map++;
      }
      if (map === 1) {
        edge = 4;
      } else if (map === 2) {
        edge = 5;
      } else {
        edge = 5;
      }
      for (i = _i = 0, _ref = (edge * edge) - 2; 0 <= _ref ? _i <= _ref : _i >= _ref; i = 0 <= _ref ? ++_i : --_i) {
        data.push(decoy);
      }
      data.push(result);
      game.remain_time = game.remain_time + game.heal_time;
      if (game.heal_time < 3) {
        game.heal_time = 2;
      } else {
        game.heal_time--;
      }
      return game.pushScene(new GameScene({
        stage: stage,
        data: data.shuffle(),
        result: result,
        edge: edge
      }));
    });
  }

  return MainScene;

})(Scene);

GameScene = (function(_super) {

  __extends(GameScene, _super);

  GameScene.name = 'GameScene';

  function GameScene(opt) {
    var char, count, counter, data, edge, game, lag, magic_stone, margin, rand, result, score_counter, stage, stage_text, stone, text, width, _i, _len;
    GameScene.__super__.constructor.apply(this, arguments);
    game = Game.instance;
    data = opt.data;
    result = opt.result;
    edge = opt.edge || 5;
    lag = 80;
    stage = opt.stage || 1;
    stage_text = new Label;
    stage_text.text = 'stage: ' + stage;
    stage_text.color = 'white';
    stage_text._element.style.fontSize = '20px';
    stage_text.x = 30;
    stage_text.y = 10;
    this.addChild(stage_text);
    stone = new Sprite(40, 40);
    stone.image = game.assets['./img/buttons.png'];
    stone.frame = 2;
    stone.x = 230;
    this.addChild(stone);
    magic_stone = new WhiteLabel;
    magic_stone.text = 0;
    magic_stone.textAlign = 'left';
    magic_stone.x = 270;
    magic_stone.y = 12;
    magic_stone._element.style.fontSize = '20px';
    magic_stone.addEventListener(Event.ENTER_FRAME, function() {
      return this.text = game.magic_stone;
    });
    this.addChild(magic_stone);
    if (edge === 4) {
      width = 70;
      margin = 20;
    } else if (edge === 5) {
      width = 50;
      margin = 35;
    } else if (edge === 6) {
      width = 40;
      margin = 40;
    } else if (edge === 8) {
      width = 30;
      margin = 40;
    }
    this.start = ~~(new Date);
    counter = new Count;
    counter.y = 350;
    this.addChild(counter);
    game.counter = counter;
    score_counter = new Score;
    score_counter.y = 400;
    this.addChild(score_counter);
    this.score_counter = score_counter;
    this.addEventListener(Event.ENTER_FRAME, function() {
      this.removeEventListener(Event.ENTER_FRAME, arguments.callee);
      return startBGM();
    });
    count = 0;
    for (_i = 0, _len = data.length; _i < _len; _i++) {
      char = data[_i];
      text = new Label;
      text.text = char;
      text.x = width * Math.floor(count % edge) + margin;
      text.y = width * Math.floor(count / edge) + 40;
      text._element.style.fontSize = width + 'px';
      text._element.style.width = width + 'px';
      text._element.style.height = width + 'px';
      text.color = 'blue';
      text.textAlign = 'center';
      rand = Math.floor(Math.random() * 5);
      if (rand === 3) {
        text.color = 'red';
      } else if (rand === 4) {
        text.color = 'green';
      }
      text.frame = Math.floor(Math.random() * lag);
      text.opacity = 0;
      text.addEventListener(Event.ENTER_FRAME, function() {
        if (this.end) {
          this.opacity = 1;
          return;
        }
        if (this.frame++ < lag) {
          return;
        }
        this.frame = 0;
        return this.tl.tween({
          opacity: 1,
          time: 25
        }).delay(30).tween({
          opacity: 0,
          time: 5
        });
      });
      text.addEventListener(Event.TOUCH_END, function() {
        var end, scene, score;
        text = this;
        if (this.text === result) {
          stopBGM();
          startSE();
          counter.stop();
          text.removeEventListener(Event.TOUCH_END, arguments.callee);
          text.tl.clear();
          this.end = 1;
          end = ~~(new Date);
          scene = game.currentScene;
          score = ~~((20000 - end + scene.start) / 100);
          if (score < 0) {
            score = 10;
          }
          score = ~~(score * (stage + 10) / 10);
          game.score += score;
          this._element.style.zIndex = 100;
          return this.tl.moveTo(40, 100, 5).then(function() {
            var board, bonus_point, bonus_text, next, result_text, result_time;
            scene.score_counter.score_reflesh(game.score);
            board = new Sprite(280, 190);
            board.image = game.assets['./img/box.png'];
            board._element.style.zIndex = 50;
            board.x = 20;
            board.y = 80;
            scene.addChild(board);
            result_time = ~~((end - scene.start) / 100) / 10;
            game.remain_time = game.remain_time - result_time;
            result_text = new Label;
            result_text.text = result_time + '秒';
            result_text.x = 50;
            result_text.y = 190;
            result_text._element.style.zIndex = 100;
            result_text._element.style.fontSize = '20px';
            scene.addChild(result_text);
            result_text = new Label;
            result_text.text = score + '点';
            result_text.x = 50;
            result_text.y = 210;
            result_text._element.style.zIndex = 100;
            result_text._element.style.fontSize = '20px';
            scene.addChild(result_text);
            next = new Sprite(100, 50);
            next.x = 160;
            next.y = 110;
            next.image = game.assets['./img/buttons.png'];
            next._element.style.zIndex = 100;
            next.frame = 8;
            next.addEventListener(Event.TOUCH_END, function() {
              var black;
              next._element.style.backgroundColor = 'gray';
              black = new BlackOut;
              scene.addChild(black);
              return black.onRun();
            });
            scene.addChild(next);
            bonus_point = new Label;
            bonus_point.text = '+' + game.heal_time + '秒';
            bonus_point.textAlign = 'center';
            bonus_point.x = 160;
            bonus_point.y = 180;
            bonus_point._element.style.width = '100px';
            bonus_point._element.style.zIndex = 100;
            bonus_point._element.style.fontSize = '30px';
            scene.addChild(bonus_point);
            bonus_text = new Label;
            bonus_text.text = 'ボーナス!!';
            bonus_text.textAlign = 'center';
            bonus_text.x = 140;
            bonus_text.y = 220;
            bonus_text._element.style.width = '140px';
            bonus_text._element.style.zIndex = 100;
            bonus_text._element.style.fontSize = '30px';
            return scene.addChild(bonus_text);
          });
        }
      });
      this.addChild(text);
      count++;
    }
  }

  return GameScene;

})(Scene);

TitleScene = (function(_super) {

  __extends(TitleScene, _super);

  TitleScene.name = 'TitleScene';

  function TitleScene() {
    var invite_menu, title_menu;
    TitleScene.__super__.constructor.apply(this, arguments);
    title_menu = new TitleMenu;
    invite_menu = new InviteMenu;
    this.addChild(title_menu);
    this.title_menu = title_menu;
    this.addChild(invite_menu);
    this.invite_menu = invite_menu;
    this.addEventListener(Event.ENTER_FRAME, function() {
      this.removeEventListener(Event.ENTER_FRAME, arguments.callee);
      return this.reflesh_user_data();
    });
  }

  TitleScene.prototype.reflesh_user_data = function() {
    var game, scene;
    game = Game.instance;
    scene = game.currentScene;
    if (game.user_id) {
      return $.getJSON('http://fe.igomovie.net/top', {
        user_id: game.user_id,
        version: game.version,
        device: game.device,
        time: ~(new Date)
      }, function(json) {
        var user;
        user = json.user;
        game.my_invite_code = user.my_invite_code;
        game.magic_stone = user.magic_stone;
        return scene.title_menu.invite_activate();
      });
    }
  };

  return TitleScene;

})(Scene);

TitleMenu = (function(_super) {

  __extends(TitleMenu, _super);

  TitleMenu.name = 'TitleMenu';

  function TitleMenu() {
    var game, invite, power, start, title;
    TitleMenu.__super__.constructor.apply(this, arguments);
    game = Game.instance;
    title = new WhiteLabel;
    title.text = '漢字<br />間違い探し';
    title.y = 50;
    title._element.style.fontSize = '50px';
    this.addChild(title);
    start = new Sprite(200, 50);
    start.image = game.assets['./img/buttons.png'];
    start.frame = 2;
    start.x = 60;
    start.y = 200;
    this.addChild(start);
    start.addEventListener(Event.TOUCH_END, function() {
      return game.removeScene(game.currentScene);
    });
    invite = new Sprite(200, 50);
    invite.image = game.assets['./img/buttons.png'];
    invite.frame = 1;
    invite.x = 60;
    invite.y = 330;
    this.invite = invite;
    power = new WhiteLabel;
    power.text = 'Powered by enchant.js';
    power.y = 410;
    power._element.style.fontSize = '16px';
    this.addChild(power);
    this.is_active = 0;
  }

  TitleMenu.prototype.invite_activate = function() {
    var game, title_menu;
    title_menu = this;
    if (title_menu.is_active) {
      return;
    }
    title_menu.is_active = 1;
    game = Game.instance;
    if (game.my_invite_code) {
      $('#twitter').find('a').attr({
        href: 'https://twitter.com/intent/tweet?hashtags=間違い探し&text=漢字間違い探し 魔法石を貰えるので是非入力してね♪ 招待ID「' + game.my_invite_code + '」 http://goo.gl/2faO3'
      });
      $('#mixi').find('a').attr({
        href: 'https://mixi.jp/simplepost/voice?status=漢字間違い探し 魔法石を貰えるので是非入力してね♪ 招待ID「' + game.my_invite_code + '」 http://goo.gl/2faO3'
      });
    }
    title_menu.addChild(this.invite);
    return title_menu.invite.addEventListener(Event.TOUCH_END, function() {
      var scene;
      title_menu.tl.tween({
        x: -330,
        time: 10
      });
      scene = game.currentScene;
      return scene.invite_menu.tl.tween({
        x: 0,
        time: 10
      }).then(function() {
        scene.invite_menu.activate();
        return $('#invite').show();
      });
    });
  };

  return TitleMenu;

})(Group);

UseStoneScene = (function(_super) {

  __extends(UseStoneScene, _super);

  UseStoneScene.name = 'UseStoneScene';

  function UseStoneScene(json) {
    var black, board, game, positive, text;
    UseStoneScene.__super__.constructor.apply(this, arguments);
    black = new Box(320, 480, 'black');
    black.opacity = 0.9;
    this.addChild(black);
    game = Game.instance;
    board = new Sprite(280, 190);
    board.image = game.assets['./img/box.png'];
    board.x = 20;
    board.y = 100;
    board.opacity = 0.9;
    this.addChild(board);
    positive = new Sprite(100, 50);
    positive.x = 110;
    positive.y = 220;
    positive.image = game.assets['./img/buttons.png'];
    positive._element.style.zIndex = 100;
    positive.frame = 11;
    this.addChild(positive);
    if (json.result) {
      text = new Label;
      text.text = '再開します';
      text.textAlign = 'center';
      text.y = 150;
      text._element.style.fontSize = '20px';
      this.addChild(text);
      positive.addEventListener(Event.TOUCH_END, function() {
        $('#tweet').hide();
        game.remain_time = 60;
        game.removeScene(game.currentScene);
        game.removeScene(game.currentScene);
        game.removeScene(game.currentScene);
        return game.counter.start();
      });
    } else {
      text = new Label;
      text.text = 'ERROR<br />再開できませんでした';
      text.textAlign = 'center';
      text.y = 140;
      text._element.style.fontSize = '20px';
      this.addChild(text);
      positive.addEventListener(Event.TOUCH_END, function() {
        game.removeScene(game.currentScene);
        game.removeScene(game.currentScene);
        return $('#tweet').css({
          top: 210 * game.scale
        }).show();
      });
    }
  }

  return UseStoneScene;

})(Scene);


// Generated by CoffeeScript 1.3.1
var RMusic, bgm, se, startBGM, startSE, stopBGM;

bgm = se = null;

RMusic = (function() {

  RMusic.name = 'RMusic';

  function RMusic(src) {
    var media;
    media = new Media(src, this.onSuccess, this.onError, this.onChange);
    this.media = media;
    this.src = src;
    this.timer = null;
    this.playable = 1;
  }

  RMusic.prototype.onSuccess = function() {};

  RMusic.prototype.onError = function(error) {};

  RMusic.prototype.onChange = function() {};

  RMusic.prototype.play = function() {
    var music;
    if (!this.playable) {
      return;
    }
    this.playable = 0;
    if (this.timer === null) {
      music = this;
      music.media.play();
      music.start = setInterval(function() {
        var media;
        media = music.media;
        return media.getCurrentPosition(function(position) {
          if (position > 0) {
            clearInterval(music.start);
            music.start = null;
            return music.timer = setInterval(function() {
              return media.getCurrentPosition(function(position) {
                var src;
                if (position < 0) {
                  music.stop();
                  src = music.src;
                  bgm = new RMusic(src);
                  return bgm.play();
                }
              });
            }, 1000);
          }
        });
      }, 5000);
    }
    return this;
  };

  RMusic.prototype.stop = function() {
    var music;
    music = this;
    clearInterval(music.start);
    music.start = null;
    clearInterval(music.timer);
    music.timer = null;
    music.media.stop();
    this.playable = 1;
    return this;
  };

  return RMusic;

})();

document.addEventListener('pause', function() {
  if (bgm) {
    bgm.stop();
  }
  return bgm = null;
}, false);

startBGM = function() {
  if (bgm) {
    bgm.stop();
  } else {
    bgm = new RMusic('file:///android_asset/www/bgm.mp3');
  }
  return bgm.play();
};

stopBGM = function() {
  if (bgm) {
    bgm.stop();
  }
  return bgm = null;
};

startSE = function() {
  if (se) {
    se.stop;
  } else {
    se = new Media('file:///android_asset/www/correct.mp3');
  }
  return se.play();
};











function RevMob(appId) {
	this.appId = appId;
	cordova.exec(function(successParams){}, function(errorParams){}, "RevMobPlugin", "startSession", [ appId ]);

	this.showFullscreen = function(successCallback, errorCallback) {
		cordova.exec(successCallback, errorCallback, "RevMobPlugin", "showFullscreen", []);
	}

	this.showPopup = function(successCallback, errorCallback) {
		cordova.exec(successCallback, errorCallback, "RevMobPlugin", "showPopup", []);
	}

	this.setTestingMode = function(isTesting, successCallback, errorCallback) {
		cordova.exec(successCallback, errorCallback, "RevMobPlugin", "setTestingMode", [isTesting]);
	}

	this.setTestingWithoutAds = function(isTesting, successCallback, errorCallback) {
		cordova.exec(successCallback, errorCallback, "RevMobPlugin", "setTestingWithoutAds", [isTesting]);
	}
}

showAd = function() {
    var revmob = new RevMob('5119ae47af7a811000000012');
    revmob.showPopup();
};

