

























(function(b){function l(a){function i(){clearTimeout(f);c.unselect();j(c)}function g(b){j(c);clearTimeout(f);clearTimeout(m);Math.abs(h)<e.moveThreshold&&Math.abs(k)<e.moveThreshold&&n<e.pressDelay?d&&e.useFastTouch&&c.trigger("tap",b):c.unselect()}function o(){var b=d?event.changedTouches[0]:event;h=b.pageX-p;k=b.pageY-q;n=(new Date).getTime()-l;var b=Math.abs(h),a=Math.abs(k),g;b>a&&30<b&&1E3>n&&(g=0>h?"left":"right",j(c),c.trigger("swipe",{direction:g,deltaX:h,deltaY:k}));c.unselect();clearTimeout(f);
(b>e.moveThreshold||a>e.moveThreshold)&&clearTimeout(m)}function j(a){a&&(a.unbind(r,o).unbind(s,g),d?a.unbind(t,i):b(document).unbind("mouseout",i))}if(!u)return void 0!==window.console&&console.log("TouchStart handler aborted because tap is not ready"),a.preventDefault(),!1;var c=b(a.target);if(c.length){var l=(new Date).getTime(),f=null,m=null,p,q,h=0,k=0,n=0,a=d?event.changedTouches[0]:event;p=a.pageX;q=a.pageY;(function(a){a.bind(r,o).bind(s,g);d?a.bind(t,i):b(document).bind("mouseout",i)})(c);
f=setTimeout(function(){c.makeActive()},e.hoverDelay);m=setTimeout(function(){j(c);c.unselect();clearTimeout(f);c.trigger("press")},e.pressDelay)}else void 0!==window.console&&console.log("Could not find target of touchstart event.")}var d=!!window.Touch,v=d?"touchstart":"mousedown",r=d?"touchmove":"mousemove",s=d?"touchend":"mouseup",t=d?"touchcancel":"mouseout",u=!0,e={useFastTouch:!0,debug:!0,moveThreshold:10,hoverDelay:50,pressDelay:750};b.jQTouch=function(a){for(var d in a)e[d]=a[d];b(document).bind("ready",
function(){b("#jqt").bind(v,l)});b.fn.press=function(a){return b.isFunction(a)?b(this).live("press",a):b(this).trigger("press")};b.fn.swipe=function(a){return b.isFunction(a)?b(this).live("swipe",a):b(this).trigger("swipe")};b.fn.tap=function(a){return b.isFunction(a)?b(this).live("tap",a):b(this).trigger("tap")};a.framework=b;return jQTouchCore(a)};b.jQTouch.addExtension=function(a){jQTouchCore.prototype.extensions.push(a)}})(jQuery);


(function(){jQTouchCore=function(j){function n(a){"string"===typeof a.selector&&"string"===typeof a.name&&l.push(a)}function w(a,b){k.unshift({page:a,animation:b,hash:"#"+a.attr("id"),id:a.attr("id")})}function D(a){var b=c(a.target);b.is(h.join(", "))||(b=c(a.target).closest(h.join(", ")));b&&b.attr("href")&&!b.isExternalLink()&&a.preventDefault();c.support.touch||c(a.target).trigger("tap",a)}function x(a,b,d,g){function s(){c.support.animationEvents&&d&&e.useAnimations?(a.unbind("webkitAnimationEnd",
s),a.removeClass("current "+f+" out"),b.removeClass(f),i.removeClass("animating animating3d"),!0===e.trackScrollPositions&&(b.css("top",-b.data("lastScroll")),setTimeout(function(){b.css("top",0);window.scroll(0,b.data("lastScroll"));c(".scroll",b).each(function(){this.scrollTop=-c(this).data("lastScroll")})},0))):(a.removeClass(f+" out current"),t+=201);setTimeout(function(){b.removeClass("in")},t);m=b;g?k.shift():w(m,d);a.unselect();y(m.attr("id"));b.trigger("pageAnimationEnd",{direction:"in",animation:d});
a.trigger("pageAnimationEnd",{direction:"out",animation:d})}g=g?g:!1;if(void 0===b||0===b.length||b.hasClass("current"))return c.fn.unselect(),!1;c(":focus").trigger("blur");a.trigger("pageAnimationStart",{direction:"out",back:g});b.trigger("pageAnimationStart",{direction:"in",back:g});if(c.support.animationEvents&&d&&e.useAnimations){if(!c.support.transform3d&&d.is3d)d.name=e.defaultAnimation;var f=d.name,h=d.is3d?"animating3d":"";g&&(f=f.replace(/left|right|up|down|in|out/,E));a.bind("webkitAnimationEnd",
s);i.addClass("animating "+h);h=window.pageYOffset;!0===e.trackScrollPositions&&b.css("top",window.pageYOffset-(b.data("lastScroll")||0));b.addClass(f+" in current");a.addClass(f+" out");!0===e.trackScrollPositions&&(a.data("lastScroll",h),c(".scroll",a).each(function(){c(this).data("lastScroll",this.scrollTop)}))}else b.addClass("current in"),s();return!0}function E(a){return{up:"down",down:"up",left:"right",right:"left","in":"out",out:"in"}[a]||a}function q(){1===k.length&&window.history.go(-1);
var a=k[0];return x(a.page,k[1].page,a.animation,!0)?o:!1}function p(a,b){var d=k[0].page;if("string"===typeof b)for(var g=0,e=l.length;g<e;g++)if(l[g].name===b){b=l[g];break}if("string"===typeof a){g=c(a);if(1>g.length){u(a,{animation:b});return}a=g}return x(d,a,b)?o:!1}function F(){if(location.hash===k[0].hash)return!0;if(""===location.hash||k[1]&&location.hash===k[1].hash)return q(),!0;p(c(location.hash),e.defaultAnimation)}function z(a){for(var b,d=0,c=l.length;d<c;d++)if(a.is(l[d].selector)){b=
l[d];break}if(!b)b=e.defaultAnimation;return b}function A(a,b){var d=null,e=document.createElement("div");e.innerHTML=a;c(e).children().each(function(){var a=c(this);a.attr("id")||a.attr("id","page-"+ ++G);c("#"+a.attr("id")).remove();i.append(a);i.trigger("pageInserted",{page:a});if(a.hasClass("current")||!d)d=a});return null!==d?(p(d,b),d):!1}function H(){i.css("minHeight",1E3);scrollTo(0,0);i.css("minHeight",window.innerHeight);r=90==Math.abs(window.orientation)?"landscape":"portrait";i.removeClass("portrait landscape").addClass(r).trigger("turn",
{orientation:r})}function y(a){location.hash="#"+a.replace(/^#/,"")}function u(a,b){var d=c.extend({},{data:null,method:"GET",animation:null,callback:null,$referrer:null},b);"#"!=a?c.ajax({url:a,data:d.data,type:d.method,success:function(a){if(a=A(a,d.animation))"GET"==d.method&&!0===e.cacheGetRequests&&d.$referrer&&d.$referrer.attr("href","#"+a.attr("id")),d.callback&&d.callback(!0)},error:function(){d.$referrer&&d.$referrer.unselect();d.callback&&d.callback(!1)}}):d.$referrer&&d.$referrer.unselect()}
function B(a,b){c(":focus").trigger("blur");a.preventDefault();var d="string"===typeof a?c(a).eq(0):a.target?c(a.target):c(a);return d.length&&d.is(e.formSelector)&&d.attr("action")?(u(d.attr("action"),{data:d.serialize(),method:d.attr("method")||"POST",animation:z(d),callback:b}),!1):!0}function I(a){a=a.closest("form");return 0!==a.length?(a.trigger("submit"),!1):!0}function J(){var a,b,d,c;a=document.getElementsByTagName("head")[0];b=document.body;d=document.createElement("style");d.textContent=
"@media (transform-3d),(-o-transform-3d),(-moz-transform-3d),(-webkit-transform-3d){#jqt-3dtest{height:3px}}";c=document.createElement("div");c.id="jqt-3dtest";a.appendChild(d);b.appendChild(c);a=3===c.offsetHeight;d.parentNode.removeChild(d);c.parentNode.removeChild(c);return a}function K(a){var b=c(a.target),a=h.join(", ");b.is(a)||(b=b.closest(a));b.length&&b.attr("href")&&b.addClass("active");b.on(c.support.touch?"touchmove":"mousemove",function(){b.removeClass("active")});b.on("touchend",function(){b.unbind("touchmove mousemove")})}
function L(a){var b=c(a.target);b.is(h.join(", "))||(b=b.closest(h.join(", ")));if(!b.length||!b.attr("href"))return!1;var a=b.attr("target"),d=b.prop("hash"),g=b.attr("href"),f=null;if(b.isExternalLink())return b.unselect(),!0;if(b.is(e.backSelector))q(d);else if(b.is(e.submitSelector))I(b);else{if("_webapp"===a)return window.location=g,!1;if("#"===g)return b.unselect(),!0;f=z(b);d&&"#"!==d?(b.addClass("active"),p(c(d).data("referrer",b),f,b.hasClass("reverse"))):(b.addClass("loading active"),u(b.attr("href"),
{animation:f,callback:function(){b.removeClass("loading");setTimeout(c.fn.unselect,250,b)},$referrer:b}));return!1}}var c=j.framework,i,M=c("head"),k=[],G=0,e={},m="",r="portrait",h=[],o={},t=150,C=jQTouchCore.prototype.extensions,l=[],f="",v={addGlossToIcon:!0,backSelector:".back, .cancel, .goback",cacheGetRequests:!0,debug:!0,defaultAnimation:"slideleft",fixedViewport:!0,formSelector:"form",fullScreen:!0,fullScreenClass:"fullscreen",icon:null,icon4:null,preloadImages:!1,startupScreen:null,statusBar:"default",
submitSelector:".submit",touchSelector:"a, .touch",trackScrollPositions:!0,useAnimations:!0,useFastTouch:!0,useTouchScroll:!0,animations:[{name:"cubeleft",selector:".cubeleft, .cube",is3d:!0},{name:"cuberight",selector:".cuberight",is3d:!0},{name:"dissolve",selector:".dissolve"},{name:"fade",selector:".fade"},{name:"flipleft",selector:".flipleft, .flip",is3d:!0},{name:"flipright",selector:".flipright",is3d:!0},{name:"pop",selector:".pop",is3d:!0},{name:"swapleft",selector:".swap",is3d:!0},{name:"slidedown",
selector:".slidedown"},{name:"slideright",selector:".slideright"},{name:"slideup",selector:".slideup"},{name:"slideleft",selector:".slideleft, .slide, #jqt > * > ul li a"}]};(function(a){e=c.extend({},v,a);if(e.preloadImages)for(a=e.preloadImages.length-1;0<=a;a--)(new Image).src=e.preloadImages[a];a=e.addGlossToIcon?"":"-precomposed";e.icon&&(f+='<link rel="apple-touch-icon'+a+'" href="'+e.icon+'" />');e.icon4&&(f+='<link rel="apple-touch-icon'+a+'" sizes="114x114" href="'+e.icon4+'" />');e.startupScreen&&
(f+='<link rel="apple-touch-startup-image" href="'+e.startupScreen+'" />');e.fixedViewport&&(f+='<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"/>');e.fullScreen&&(f+='<meta name="apple-mobile-web-app-capable" content="yes" />',e.statusBar&&(f+='<meta name="apple-mobile-web-app-status-bar-style" content="'+e.statusBar+'" />'));f&&M.prepend(f)})(j);c(document).ready(function(){if(!c.support)c.support={};c.support.animationEvents="undefined"!=
typeof window.WebKitAnimationEvent;c.support.touch="undefined"!=typeof window.TouchEvent&&-1<window.navigator.userAgent.indexOf("Mobile")&&e.useFastTouch;c.support.transform3d=J();c.support.ios5=/OS (5(_\d+)*) like Mac OS X/i.test(window.navigator.userAgent);c.fn.isExternalLink=function(){var a=c(this);return"_blank"==a.attr("target")||"external"==a.attr("rel")||a.is('a[href^="http://maps.google.com"], a[href^="mailto:"], a[href^="tel:"], a[href^="javascript:"], a[href*="youtube.com/v"], a[href*="youtube.com/watch"]')};
c.fn.makeActive=function(){return c(this).addClass("active")};c.fn.unselect=function(a){a?a.removeClass("active"):c(".active").removeClass("active")};for(var a=0,b=C.length;a<b;a++){var d=C[a];c.isFunction(d)&&c.extend(o,d(o))}a=0;for(b=v.animations.length;a<b;a++){d=v.animations[a];if(void 0!==e[d.name+"Selector"])d.selector=e[d.name+"Selector"];n(d)}h.push(e.touchSelector);h.push(e.backSelector);h.push(e.submitSelector);c(h.join(", ")).css("-webkit-touch-callout","none");i=c("#jqt");a=[];0===i.length&&
(i=c(document.body).attr("id","jqt"));c.support.transform3d&&a.push("supports3d");c.support.ios5&&e.useTouchScroll&&a.push("touchscroll");e.fullScreenClass&&!0===window.navigator.standalone&&a.push(e.fullScreenClass,e.statusBar);i.addClass(a.join(" ")).bind("click",D).bind("orientationchange",H).bind("submit",B).bind("tap",L).bind(c.support.touch?"touchstart":"mousedown",K).trigger("orientationchange");c(window).bind("hashchange",F);a=location.hash;m=0===c("#jqt > .current").length?c("#jqt > *:first-child").addClass("current"):
c("#jqt > .current");y(m.attr("id"));w(m);1===c(a).length&&p(a)});return o={addAnimation:n,animations:l,getOrientation:function(){return r},goBack:q,insertPages:A,goTo:p,history:k,settings:e,submitForm:B}};jQTouchCore.prototype.extensions=[];window.Zepto&&function(j){j.jQTouch=function(n){n.framework=j;return jQTouchCore(n)};j.fn.prop=j.fn.attr;j.jQTouch.addExtension=function(j){jQTouchCore.prototype.extensions.push(j)}}(Zepto)})();









































function updateSpotComments(spot_id) {

                  if(is_online()) {
                    $.post(api_url + 'calls/loadComments.php?id=' + spot_id + '', {}, function(data) {
			if (!data.error) {

                                msg('Call: calls/loadComments.php?id=' + spot_id, 1);

				var comments = data.comments;
				for (var id in comments) {

                                    comment_item = comments[id];
                                    item_id = comment_item.id;

                                    if(comment_item.v == "1") {

                                        save_ByPK('comments', item_id, {
                                                id:          item_id,
                                                spot_id:     comment_item.spot_id,
                                                naam:        comment_item.naam,
                                                rate:        comment_item.rate,
                                                lang:        comment_item.lang,
                                                comment:     comment_item.comment
                                        });
                                    }
                                    else {
                                       delete_ByPK('comments', '' + item_id + '');
                                    }
				}
                                save_ByPK_commit();
                                delete_ByPK_commit();
			}
                    }, 'json');
                }
            }

	    function select_comments(spot_id) {

                    db.transaction(
                    function (transaction) {
                        transaction.executeSql("\
                            SELECT		`comments`.*\
                            FROM		`comments`\
                            WHERE           `spot_id` = '" + spot_id + "'\
                            ORDER BY `id` DESC\
                            ;", [], show_comments, errorHandler);
                        }
                    );

	    }

	    function show_comments(transaction, resultSet) {

		div = "#C_" + settings['spot'] + "_" + settings['lang'];
		ul = "ul.comments";
		$(div + ' ' + ul + ' li').not('.loading').remove();

		if(resultSet.rows.length == 0) {
		    $(div + '  ' + ul).append('<li>--</li>');
		}
		else {
                    $('#S_' + settings['spot'] + '_' + settings['lang'] + ' li.read small.counter').html('' + resultSet.rows.length + '');

                    for (var i=0; i < resultSet.rows.length; i++) {
			item = resultSet.rows.item(i);
			$(div + '  ' + ul).append('<li class="comments"><h1>' + htmldecode(item.naam) + '<span class="stars comment_'+ item.id +'_'+ settings['lang'] +' inSpot" ></span></h1>' + (item.lang == settings['lang'] ? '<p>'+ item.comment +'</p>' : '') + '</li>');
			stars('comment_'+ item.id + '_' + settings['lang'] + '', item.rate);
		    }
		}
		$(div + ' div.loading').hide();
		$(div + ' ' + ul + ' li.loading').remove();

	    }


	    function getComments(spot_id, using_goback) {

		using_goback = (using_goback ? true : false);

		div = "C_" + spot_id + "_" + settings['lang'];
		if($('#'+ div).length == 0){
		    $('#jqt').append('<div id="'+ div +'"></div>');
		    $('#' + div).append('<div class="toolbar"><a href="#" class="back">' + lang['sluiten'][settings['lang']] + '</a><h1></h1><a href="#" class="button" onclick="setComments(\''+ spot_id +'\');"><img src="./img/addCommentWhite.png" style="width:19px;margin-top: 6px;"></a></div>');
		    $('#' + div).append('<div class="scroll"><div class="loading"></div></div>');
		    $('#' + div + ' div.scroll').append('<ul class="rounded comments"><li class="loading">' + lang['bezigMetLaden'][settings['lang']] + '</li></ul>');
		}

		$('#' + div + ' div.toolbar h1').html('' + lang['waarderingen'][settings['lang']] + '').show();

		if (using_goback) {
		    jQT.goBack();
		} else {
		    jQT.goTo('#'+ div + '','slideup');
		}
		select_comments(spot_id);
	    }


	    function setComments(id) {
		div = "SC_" + id + "_" + settings['lang'];
		if($('#'+ div).length == 0){
		    $('#jqt').append('<div id="'+ div +'"></div>');
		    $('#' + div).append('<div class="toolbar"><a href="#" class="back">' + lang['sluiten'][settings['lang']] + '</a><h1></h1></div>');
		    $('#' + div).append('<div class="scroll"><div class="loading"></div></div>');
		    $('#' + div + ' div.scroll').append('\
				    <h2>' + lang['uwBeoordeling'][settings['lang']] + '</h2>\
                                    <ul class="rounded comments">\
                                        <li>\
					    <input type="hidden" id="'+ div +'_rate" name="'+ div +'_rate">\
					    <div class="starRating" data-input-id="'+ div +'_rate" style="margin-top: 5px;">\
						<span style="padding:0 2px 5px 0px;"><img src="./img/starEmpty.png" style="display: inline;"></span>\
						<span style="padding:0 2px 5px 0px;"><img src="./img/starEmpty.png" style="display: inline;"></span>\
						<span style="padding:0 2px 5px 0px;"><img src="./img/starEmpty.png" style="display: inline;"></span>\
						<span style="padding:0 2px 5px 0px;"><img src="./img/starEmpty.png" style="display: inline;"></span>\
						<span style="padding:0 2px 5px 0px;"><img src="./img/starEmpty.png" style="display: inline;"></span>\
					    </div>\
					</li>\
					<li>\
					    <input type="text" id="'+ div +'_name" name="'+ div +'_name" placeholder="' + lang['uwNaam'][settings['lang']] + '" >\
					</li>\
					<li>\
					    <textarea id="'+ div +'_comment" name="'+ div +'_comment" placeholder="' + lang['uwCommentaar'][settings['lang']] + '"></textarea>\
					</li>\
                                    </ul>\
                                    <a href="#" onclick="saveComment(' + id + '); return false;" class="greenButton">' + lang['waarderingVersturen'][settings['lang']] + '</a>\
				');
		}

		$('#' + div + ' div.toolbar h1').html('' + lang['waardeer'][settings['lang']] + '').show();
		jQT.goTo('#'+ div + '','slideup');
                preventDefault(div);
	    }

	    function saveComment(id) {

		$('#busy span').html(lang['waarderingVersturen'][settings['lang']] + '...');
		$('#busy').show();

		div = "SC_" + id + "_" + settings['lang'];

		c_name = $('#' + div + '_name').val();
		c_comment = $('#' + div + '_comment').val();
		c_rate = $('#' + div + '_rate').val();

		if (c_rate == '') c_rate = '0';

		if (c_name.length == 0) {
		    doalert(lang['naamNietIngevuld'][settings['lang']], lang['waarderingVersturen'][settings['lang']]);
		    $('#busy').hide();
		    return false;
		}

		item_id = parseInt(new Date().getTime() / 1000);

		save_ByPK('comments', item_id, {
		    id:          item_id,
		    spot_id:     id,
		    naam:        c_name,
		    rate:        c_rate,
		    lang:        settings['lang'],
		    comment:     c_comment,
		    submit:	1
		});

		$('#' + div + '_name, #' + div + '_comment' + ', #' + div + '_rate').val('');
		$('div.starRating span').html('&#9734;');

		save_ByPK_commit();

		comments_busy_id = window.setInterval(function() {
		    if (saving['main'] == 0) {
			window.clearInterval(comments_busy_id);
		    } else {
			return false;
		    }

		    $('#busy').hide();
		    getComments(id, true);

		    if (is_online()) {
			save_comments_to_server();
		    }

		}, 200);

	    }

	    function save_comments_to_server() {

		db.transaction(
		    function (transaction) {
			transaction.executeSql("\
			    SELECT		`comments`.*\
			    FROM		`comments`\
			    WHERE           `submit` = 1\
			;", [], save_comments_to_server_1, errorHandler);
		    }
		);

	    }

	    // Database query callback
	    function save_comments_to_server_1 (transaction, resultSet) {

		if(resultSet.rows.length == 0) return true;

		comments_to_save = [];

		for (var i=0; i < resultSet.rows.length; i++) {
		    comments_to_save.push(resultSet.rows.item(i));
		}

		try {
		    data = JSON.stringify(comments_to_save);
		    $.post(api_url + 'calls/saveComments.php', {'comments_to_save': data}, save_comments_to_server_2, 'json');
		} catch (error) {
		    return false
		}

	    }

	    // Ajax post callback
	    function save_comments_to_server_2(data) {

		if (data.comments && data.comments.length > 0) {

		    db.transaction(

			function (transaction) {

			    for (var i = 0; i < data.comments.length; i++) {

				transaction.executeSql("\
				    UPDATE	    `comments`\
				    SET		    `id` = " + data.comments[i].new_id + ",\
						    `submit` = 0\
				    WHERE           `comments`.`id` = " + data.comments[i].old_id + "\
				;", [], nullDataHandler, errorHandler);

			    }

			}

		    );

		}

	    }

var callback_spots, timeout_spots, timeout_spots_id;

var spots_are_updated = [];


function update_spots(timeout, callback) {

    $('#ul.spots li').not('.loading').remove();
    $('#ul.spots').append('<li class="loading">'+ lang['bezigMetLaden'][settings['lang']] +'</li>');

    if (busy['update_spots']) {
	msg('update_spots already in progress...', 32);
	return false;
    }

    spots_are_updated[settings['regio']] = true;

    if (is_online() != true) {
	busy['update_spots'] = false;
	return false;
    }

    busy['update_spots'] = true;

    timeout_spots = timeout;
    timeout_spots_id = window.setTimeout(function() {
	busy['update_spots'] = false;
	timeout_spots();
    }, webservice_timeout);

    callback_spots = callback;

    msg('update_spots()', 1);



    try {
	var call_url;

	if(settings['toeristisch'] == 1) {
	    call_url = api_url + 'calls/loadSpots.php?type=' + settings['type'] + '&from=' + settings['spots_updated'];
	}
	else {
	    call_url = api_url + 'calls/loadSpots.php?regio=' + settings['regio'] + '&type=' + settings['type'] + '&from=' + settings['spots_updated'];
	}

	msg('Call: '+ call_url, 1);

	$.post(call_url, {}, function(data) {

	    window.clearTimeout(timeout_spots_id);

	    if (!data.error) {



		var spots = data.spots;

		regio_spots = [];

		for (var id in spots) {

		    spot_item = spots[id];

		    item_id = spot_item.id;

		    if(spot_item.v == 1) {
			save_ByPK('spots', item_id, {
			    id:		item_id,
			    photo:          spot_item.photo,
			    regio_id:       spot_item.regio_id,
			    type_id:        spot_item.type_id,
			    lon:            spot_item.lon,
			    lat:            spot_item.lat,
			    naam:           spot_item.naam,
			    naam_NL:	spot_item.naam_NL,
			    naam_EN:	spot_item.naam_EN,
			    naam_DE:	spot_item.naam_DE,
			    naam_ES:	spot_item.naam_ES,
			    adres_1:        spot_item.adres_1,
			    adres_2:        spot_item.adres_2,
			    plaats:         spot_item.plaats,
			    tel:            spot_item.tel,
			    email:          spot_item.email,
			    website:        spot_item.website,
			    facebook:       spot_item.facebook,
			    twitter:        spot_item.twitter,
			    NL:             spot_item.NL,
			    EN:             spot_item.EN,
			    DE:             spot_item.DE,
			    ES:             spot_item.ES,
			    open_NL:        spot_item.open_NL,
			    open_EN:        spot_item.open_EN,
			    open_DE:        spot_item.open_DE,
			    open_ES:        spot_item.open_ES,
			    price_NL:       spot_item.price_NL,
			    price_EN:       spot_item.price_EN,
			    price_DE:       spot_item.price_DE,
			    price_ES:       spot_item.price_ES,
			    showOnHome:     spot_item.showOnHome,
			    rating:         spot_item.rating || ''
			});
			msg('Updating spot ' + spot_item.naam + '', 1);
		    }
		    else {
			removeSpot(item_id);
		    }
		}
		save_ByPK_commit();
		select_spots();
	    }
	    else {
		// TODO: Foutmelding geven
		busy['update_spots'] = false;
		timeout_spots();
	    }

	}, 'json');

    } catch (error) {

	busy['update_spots'] = false;
	window.clearTimeout(timeout_spots_id);
	timeout_spots();

    }

}

function select_spots(is_retry, callback) {

    is_retry = is_retry | false;
    callback_spots = callback || callback_spots;

    if (!is_retry)
	msg('select_spots()', 1);

    for (var i in saving) {
	if (saving[i] > 0) {
	    msg('Waiting for save... (spots)', 8);
	    window.setTimeout(function() {
		select_spots(true);
	    }, 200);
	    return false;
	}
    }

    db.transaction(
    
	function (transaction) {
	    transaction.executeSql("\
                SELECT		`types`.`" + settings['lang'] + "` AS `typeNaam`, `spots`.`id`,`spots`.`naam`,`spots`.`naam_NL`,`spots`.`naam_EN`,`spots`.`naam_DE`,`spots`.`naam_ES`,`spots`.`plaats`,`spots`.`lon`,`spots`.`lat`\
                FROM		`spots`\
                LEFT JOIN `types` ON `types`.`id` = `spots`.`type_id`\
                WHERE " + (settings['toeristisch'] == 1 ? "`type_id` != ''" : "`regio_id` = " + settings['regio'] + "") + "\
                AND             `spots`.`type_id` = " + settings['type'] +"\
                ;", [], mkMarkers, errorHandler);
	}
	);

    db.transaction(
	function (transaction) {
	    transaction.executeSql("\
                SELECT		`spots`.`id`,`spots`.`naam`,`spots`.`naam_NL`,`spots`.`naam_EN`,`spots`.`naam_DE`,`spots`.`naam_ES`,`spots`.`photo`,`spots`.`rating`, `spots`.`adres_1`, `spots`.`adres_2`, `spots`.`plaats`\
                FROM		`spots`\
                WHERE " + (settings['toeristisch'] == 1 ? "`type_id` != ''" : "`regio_id` = " + settings['regio'] + "") + "\
                AND	  `type_id` = " + settings['type'] + "\
                ;", [], show_spots, errorHandler);
	}
	);



}

function show_spots(transaction, resultSet) {
    var spots = [];

    msg('show_spots()', 1);
    var div = '#T'+ (settings['toeristisch'] == "1" ? "R" : "") + '_' + settings['regio'] + '_' + settings['type'] + '_' + settings['lang'];
    var ul = div + ' ul.spots';
    $(ul +' li').not('.loading').remove();


    for (var i=0; i < resultSet.rows.length; i++) {

	spot = resultSet.rows.item(i);

	var lang_naam =  eval('spot.naam_' + settings['lang']);

	$(ul).append('\
                     <li class="arrow results item_' + spot.id + '">\
                        <a href="#" onclick="getSpot(\''+ spot.id +'\',\''+ spot.naam +'\')">\
                            <div class="results_photo"><img src="./img/loader.gif" class="results_loader"></div>\
                            <h1>' + ((undefined != lang_naam && lang_naam.length > 0) ? '' + lang_naam + '' : ''+ spot.naam +'') + ' </h1>\
                            <span class="stars inResults spots_'+ spot.id +'_'+ settings['lang'] +'"></span>\
                            <p>\
                               ' + (spot.adres_1.length > 0 ? ''+ spot.adres_1 + '' : '') + '' + (spot.adres_1.length > 0 && spot.adres_2.length > 0 ? ', ' : '') + '' + (spot.adres_2.length > 0 ? ''+ spot.adres_2 + '' : '') + '' + ((spot.adres_1.length > 0 || spot.adres_2.length > 0) && spot.plaats.length > 0  ? ', ' : '') + '' + (spot.plaats.length > 0 ? ' '+ spot.plaats + '' : '') + '\
                            </p>\
                        </a>\
                    </li>');

	if(spot.rating > 0) stars('spots_' + spot.id + '_' + settings['lang'] + '', spot.rating);

        if(spot.photo.length > 0 && $(ul + ' li.item_' + spot.id + ' img.results_loader').length == 1) {
	    $(ul + ' li.item_' + spot.id + ' img.results_loader').attr('src', 'data:image/jpeg;base64,' + spot.photo).removeClass('loader').addClass('resultImg');
	}
	else {
	    $(ul + ' li.item_' + spot.id + ' img.results_loader').attr('src','./img/nophoto.png').removeClass('loader').addClass('resultImg');
	}

	spots[spot.id] = spot;
    }

    $(ul +' li.loading').remove();
    $(div +' div.loading').hide();

    if (resultSet.rows.length > 0) {
	callback_spots(spots);
    }
    else {
	callback_spots(null);
    }

    busy['update_spots'] = false;
}




var callback_spot, timeout_spot, timeout_spot_id;

function update_spot(timeout, callback) {

    $('#ul.spot li').not('.loading').remove();
    $('#ul.spot').append('<li class="loading">'+ lang['bezigMetLaden'][settings['lang']] +'</li>');

    if (busy['update_spot']) {
	msg('update_spot already in progress...', 32);
	return false;
    }

    spot_is_updated[settings['spot']] = true;

    if (is_online() != true) {
	busy['update_spot'] = false;
	timeout_spot();
	return false;
    }

    busy['update_spot'] = true;

    timeout_spot = timeout;

    timeout_spot_id = window.setTimeout(function() {
	busy['update_spot'] = false;
	msg('Timed Out!');
	timeout_spot();
    }, webservice_timeout);

    callback_spot = callback;

    msg('update_spot()', 1);

    try {

	$.post(api_url + 'calls/loadSpots.php?spot=' + settings['spot'] + '&from=' + settings['spots_updated'] , {}, function(data) {

	    msg('' + api_url + 'calls/loadSpots.php?spot=' + settings['spot'] + '&from=' + settings['spots_updated'] + '',1);

	    window.clearTimeout(timeout_spot_id);

	    if (!data.error) {

		var spots = data.spots;

		regio_spots = [];

		for (var id in spots) {

		    spot_item = spots[id];

		    item_id = spot_item.id;

		    save_ByPK('spots', item_id, {
			id:                 item_id,
			photo: 		spot_item.photo,
			regio_id:           spot_item.regio_id,
			type_id:            spot_item.type_id,
			lon:		spot_item.lon,
			lat:		spot_item.lat,
			naam:		spot_item.naam,
			naam_NL:		spot_item.naam_NL,
			naam_EN:		spot_item.naam_EN,
			naam_DE:		spot_item.naam_DE,
			naam_ES:		spot_item.naam_ES,
			adres_1:            spot_item.adres_1,
			adres_2:            spot_item.adres_2,
			plaats:		spot_item.plaats,
			tel:                spot_item.tel,
			email:              spot_item.email,
			website:            spot_item.website,
			facebook:           spot_item.facebook,
			twitter:            spot_item.twitter,
			NL:                 spot_item.NL,
			EN:                 spot_item.EN,
			DE:                 spot_item.DE,
			ES:                 spot_item.ES,
			open_NL:            spot_item.open_NL,
			open_EN:            spot_item.open_EN,
			open_DE:            spot_item.open_DE,
			open_ES:            spot_item.open_ES,
			price_NL:           spot_item.price_NL,
			price_EN:           spot_item.price_EN,
			price_DE:           spot_item.price_DE,
			price_ES:           spot_item.price_ES,
			showOnHome:		spot_item.showOnHome
		    });

		    select_spot();

		// regio_spots.push({regio_id: settings['regio'], spot_id: item_id});

		}
		save_ByPK_commit();

	    // FUNCTIE HIER

	    }
	    else {

		// TODO: Foutmelding geven
		busy['update_spot'] = false;
		timeout_spot();

	    }

	}, 'json');

    } catch (error) {

	busy['update_spot'] = false;
	window.clearTimeout(timeout_spot_id);
	timeout_spot();

    }

}

function select_spot(is_retry, callback) {

    is_retry = is_retry | false;
    callback_spot = callback || callback_spot;

    if (!is_retry)
	msg('select_spot()', 1);

    for (var i in saving) {
	if (saving[i] > 0) {
	    msg('Waiting for save...', 8);
	    window.setTimeout(function() {select_spot(true);}, 100);
	    return false;
	}
    }

    db.transaction(
	function (transaction) {
	    transaction.executeSql("\
			SELECT		`spots`.*, COUNT(`favourites`.`id`) AS `favourite`, COUNT(`comments`.`rate`) AS `comments`\
			FROM		`spots`\
			LEFT OUTER JOIN `favourites` ON `favourites`.`spot_id` = `spots`.`id` AND `favourites`.`user_id` = " + settings['user_id'] + "\
                        LEFT OUTER JOIN `comments` ON `comments`.`spot_id` = `spots`.`id`\
                        WHERE `spots`.`id` = " + settings['spot'] + "\
			GROUP BY  `spots`.`id`\
			;", [], show_spot, errorHandler);
	}
	);

    db.transaction(
	function (transaction) {
	    transaction.executeSql("\
			SELECT		`spots`.*,\
					COUNT(`favourites`.`id`) AS `favourite`,\
					COUNT(`comments`.`rate`) AS `comments`,\
					`types`.`" + settings['lang'] + "` AS `typeNaam`\
		    	FROM		`spots`\
			LEFT OUTER JOIN `favourites` ON `favourites`.`spot_id` = `spots`.`id` AND `favourites`.`user_id` = " + settings['user_id'] + "\
                        LEFT OUTER JOIN `comments` ON `comments`.`spot_id` = `spots`.`id`\
			INNER JOIN `types` ON `types`.`id` = `spots`.`type_id`\
                        WHERE `spots`.`id` = " + settings['spot'] + "\
			GROUP BY  `spots`.`id`\
			;", [], mkMarkers, errorHandler);
	}
	);

}

function show_spot(transaction, resultSet) {


    var div = 'S_' + settings['spot'] + '_' + settings['lang'];
    var ul  = '#'+ div + ' ul.spot';
    var ul_extra  = '#'+ div + ' ul.extra';
    var ul_extra2  = '#'+ div + ' ul.extra2';

    item = resultSet.rows.item(0);



    $('#' + div + ' .favIcon').hide();
    if(item.favourite > 0) {
	$('#' + div + ' .favIcon.removeFav').show();
    } else {
	$('#' + div + ' .favIcon.addFav').show();
    }

    if($(ul +' li').length == 0) {

	var lang_naam =  eval('item.naam_' + settings['lang']);

	if(item.photo.length > 0) {
	    $(ul).append('<li style="padding:0px;min-height:150px;" class="photo"><img src="./img/loader.gif" class="loader"></li>');
	}
	$(ul).append('\
                        <li class="content">\
                            <span class="stars spot_'+ item.id +'_'+ settings['lang'] +' inSpot"></span>\
                            ' + ((undefined != lang_naam && lang_naam.length > 0) ? '' + lang_naam + '' : ''+ item.naam +'') + '\
                            <p class="adres">\
                                ' + (item.adres_1.length > 0 ? ''+ item.adres_1 + '' : '') + '' + (item.adres_1.length > 0 && item.adres_2.length > 0 ? ', ' : '') + '' + (item.adres_2.length > 0 ? ''+ item.adres_2 + '' : '') + '' + ((item.adres_1.length > 0 || item.adres_2.length > 0) && item.plaats.length > 0  ? ', ' : '') + '' + (item.plaats.length > 0 ? ' '+ item.plaats + '' : '') + '\
                            </p>\
                            <p class="text">\
                                ' + nl2br(eval('item.' + settings['lang'])) + '\
                            </p>\
                        </li>\
                ');

	var openData = "";

	if(eval('item.open_' + settings['lang']).length > 0) {
	    var open = lang['open'][settings['lang']];
	    openData = '<li class="header">' + open + '</li>\
                    <li class="content extra"><p class="text">' + nl2br(eval('item.open_' + settings['lang'])) + '</p></li>\
                    ';
	    $(ul).append(openData);
	}

	var priceData = "";

	if(eval('item.price_' + settings['lang']).length > 0) {
	    var price = lang['price'][settings['lang']];
	    priceData = '<li class="header">' + price + '</li>\
                        <li class="content extra"><p class="text">' + nl2br(eval('item.price_' + settings['lang'])) + '</p></li>\
                        ';
	    $(ul).append(priceData);
	}


	if(item.photo.length > 0) {
	    $(ul + ' li.photo img.loader').attr('src', 'data:image/jpeg;base64,' + item.photo).removeClass('loader').addClass('spotImg');
	}


	if(item.tel.length > 0 || item.email.length > 0) {
	    $(ul).append('<li class="arrow"><a href="#" onclick="popUp(\'' + div + '\');" class="contact"><small class="contact"></small>'+ lang['contact'][settings['lang']] + '</a></li>');
	    if(item.email.length > 0) $('#'+ div + ' div.popUp').prepend('<a href="mailto:' + item.email + '" class="whiteButton">'+ lang['email'][settings['lang']] + '</a>');
	    if(item.tel.length > 0) $('#'+ div + ' div.popUp').prepend('<a href="tel:' + item.tel + '" class="whiteButton">'+ lang['bellen'][settings['lang']] + '</a>');
	}

	if(item.website.length > 0) $(ul).append('<li class="arrow"><a href="' + item.website + '" target="_blank" onclick="navigator.app.loadUrl(\'' + item.website + '\', { openExternal:true }); return false;">'+ lang['website'][settings['lang']] + '<small class="website"></small></a></li>');
    }

    if(item.rating > 0) stars('spot_' + item.id + '_' + settings['lang'] + '', item.rating);

    if(item.comments > 0 && $(ul_extra + ' li.read').length == 0) $(ul_extra).prepend('<li class="read"><a href="#" class="comments" onclick="getComments(' + item.id + ');"><small class="readComments"></small>'+ lang['waarderingen'][settings['lang']] + '<small class="counter">' + item.comments + '</small></a></li>');
    if($(ul_extra + ' li.write').length == 0) $(ul_extra).append('<li class="arrow write"><a href="#" onclick="setComments(' + item.id + ');"><small class="writeComment"></small>'+ lang['waardeer'][settings['lang']] + '</a></li>');
    if($(ul_extra + ' li.photosLi').length == 0 && item.numFotos > 0) $(ul_extra).prepend('<li class="photosLi"><a href="#" onclick="photos(' + item.id + ');"><small class="photos"></small>'+ lang['fotos'][settings['lang']] + '<small class="counter">' + item.numFotos + '</small></a></li>');

	if(item.facebook.length > 0 && $(ul_extra + ' li.facebook').length == 0) $(ul_extra).append('<li class="arrow facebook"><a href="' + item.facebook + '" target="_blank" onclick="navigator.app.loadUrl(\'' + item.facebook + '\', { openExternal:true }); return false;">Facebook<small class="facebook"></small></a></li>');
    if(item.twitter.length > 0 && $(ul_extra + ' li.twitter').length == 0) $(ul_extra).append('<li class="arrow twitter"><a href="' + item.twitter + '" target="_blank" onclick="navigator.app.loadUrl(\'' + item.twitter + '\', { openExternal:true }); return false;">Twitter<small class="twitter"></small></a></li>');

    if(is_online()) {
        if($(ul_extra2 + ' li.nearby').length == 0) $(ul_extra2).append('<li class="arrow nearby"><a href="#" onclick="nearby(' + item.id + ');"><small class="nearby"></small>'+ lang['dichtbijDezePlaats'][settings['lang']] + '</a></li>');
        if($(ul_extra2 + ' li.showmap').length == 0) $(ul_extra2).append('<li class="arrow showmap"><a href="#" onclick="showMapSpotControls();"><small class="nearby"></small>'+ lang['toonOpKaart'][settings['lang']] + '</a></li>');
    }



    if (resultSet.rows.length > 0) {
	callback_spot(item);
    }
    else {
	callback_spot(null);
    }

    $('#'+ div +' div.loading').hide();
    busy['update_spot'] = false;
}




var callback_nb_spots, timeout_nb_spots, timeout_nb_spots_id;

var nb_spots_are_updated = [];

var nb_spot, nb_spot_id;

function update_nb_spots(timeout, callback, spot) {

    nb_spot = spot || false;

    if (nb_spot) {
	nb_spot_id = nb_spot.id;
    } else {
	nb_spot_id = false;
    }

    if (busy['update_nb_spots']) {
	msg('update_nb_spots already in progress...', 32);
	return false;
    }

    nb_spots_are_updated[settings['lang'] + (nb_spot_id ? '_' + nb_spot_id : '')] = true;

    if (is_online() != true) {
	busy['update_nb_spots'] = false;
	select_nb_spots(nb_spot);
	return false;
    }

    busy['update_nb_spots'] = true;

    timeout_nb_spots = timeout;
    timeout_nb_spots_id = window.setTimeout(function() {
	busy['update_nb_spots'] = false;
	timeout_nb_spots();
    }, webservice_timeout);

    callback_nb_spots = callback;

    msg('update_nb_spots()', 1);

    try {
	if (nb_spot) {
	    lon = spot.lon;
	    lat = spot.lat;
	    ids_only = 1;
	} else {
	    lon = settings['lon'];
	    lat = settings['lat'];
	    ids_only = 0;
	}

	var call_url = api_url + 'calls/loadSpots.php?lon=' + lon + '&lat=' + lat + '&ids=' + ids_only;

	msg('call: ' + call_url + '', 1);

	$.post(call_url, {}, function(data) {

	    window.clearTimeout(timeout_nb_spots_id);

	    if (!data.error) {

		from_spot_id = (nb_spot_id ? nb_spot_id : '');

		db.transaction(
		function (transaction) {
		    transaction.executeSql("DELETE FROM `nearby` WHERE `from_spot_id` = '" + from_spot_id + "';", [], nullDataHandler, errorHandler);
		});

		var spots = data.spots;

		for (var id in spots) {

		    spot_item = spots[id];
		    spot_id = spot_item.id;

		    if (!nb_spot_id) {
			// Save spot data
			save_ByPK('spots', spot_id, {
			    id:		    spot_id,
			    photo:          spot_item.photo,
			    regio_id:       spot_item.regio_id,
			    type_id:        spot_item.type_id,
			    lon:            spot_item.lon,
			    lat:            spot_item.lat,
			    naam:           spot_item.naam,
			    adres_1:        spot_item.adres_1,
			    adres_2:        spot_item.adres_2,
			    plaats:         spot_item.plaats,
			    tel:            spot_item.tel,
			    email:          spot_item.email,
			    NL:             spot_item.NL,
			    EN:             spot_item.EN,
			    DE:             spot_item.DE,
			    ES:             spot_item.ES,
			    rating:         spot_item.rating || ''
			});
		    }

		    save_ByPK('nearby', {}, {
			id: from_spot_id + '_' + spot_id,
			from_spot_id: from_spot_id,
			spot_id:    spot_id,
			distance:   spot_item.distance || ''
		    });
		}

		save_ByPK_commit();
		select_nb_spots();
	    }
	    else {
		busy['update_nb_spots'] = false;
		timeout_nb_spots();
	    }

	}, 'json');

    } catch (error) {

	busy['update_nb_spots'] = false;
	window.clearTimeout(timeout_nb_spots_id);
	timeout_nb_spots();

    }

}

function select_nb_spots(is_retry, callback, div, start) {

    if (!div) {
	if (nb_spot_id) {
	    div = 'NB_' + settings['lang'] + "_" + nb_spot_id;
	} else {
	    div = 'NB_' + settings['lang'];
	}
    }

    is_retry = is_retry || false;
    callback_nb_spots = callback || callback_nb_spots;

    if (!is_retry)
	msg('select_nb_spots(div = ' + div + ')', 1);

    for (var i in saving) {
	if (saving[i] > 0) {
	    msg('Waiting for save... (nearby spots)', 8);
	    window.setTimeout(function() {
		select_nb_spots(true);
	    }, 200);
	    return false;
	}
    }

    from_spot_id = (nb_spot_id ? nb_spot_id : '');

    if(!start) { // nieuw
	db.transaction(
	    function (transaction) {
		transaction.executeSql("\
                    SELECT		`nearby`.`spot_id`, `regios`.`naam` AS `regioNaam` ,`types`.`" + settings['lang'] + "` AS `typeNaam`, `nearby`.`distance`,`spots`.*\
                    FROM		`nearby`\
                    LEFT JOIN `spots` ON `nearby`.`spot_id` = `spots`.`id`\
                    LEFT JOIN `types` ON `types`.`id` = `spots`.`type_id`\
                    LEFT JOIN `regios` ON `regios`.`id` = `spots`.`regio_id`\
		    WHERE `nearby`.`from_spot_id` = '" + from_spot_id + "'\
		    LIMIT 0, 25\
                    ;", [], mkMarkers, errorHandler);
	    }
	    );
	start = 0; // nieuw
    } // nieuw

    var TotalResults = settings['num_results_' + div + '']; // nieuw
    var numResults = $('#' + div + ' ul.spots li.results').length; // nieuw

    if(numResults < TotalResults || TotalResults == undefined) { // nieuw
	db.transaction(
	    function (transaction) {
		transaction.executeSql("\
                            SELECT		`nearby`.`spot_id`, `regios`.`naam` AS `regioNaam` ,`types`.`" + settings['lang'] + "` AS `typeNaam`, `nearby`.`distance`,`spots`.`id`,`spots`.`photo`,`spots`.`naam`,`spots`.`naam_" + settings['lang'] + "`,`spots`.`rating`, `spots`.`adres_1`, `spots`.`adres_2`, `spots`.`plaats`\
                            FROM		`nearby`\
                            LEFT JOIN `spots` ON `nearby`.`spot_id` = `spots`.`id`\
                            LEFT JOIN `types` ON `types`.`id` = `spots`.`type_id`\
                            LEFT JOIN `regios` ON `regios`.`id` = `spots`.`regio_id`\
			    WHERE `nearby`.`from_spot_id` = '" + from_spot_id + "'\
                            LIMIT 1, 25\
                            ;", [], show_nb_spots, errorHandler);
	    }
	    );
    } // nieuw


}

function show_nb_spots(transaction, resultSet) {

    msg('show_nb_spots()', 1);

    $('div.directions').hide();

    var items = [];

    if (nb_spot_id) {
	div = "NB_"+ settings['lang'] + "_" + nb_spot_id;
    } else {
	div = "NB_"+ settings['lang'];
    }
    var ul = '#'+ div + ' ul.spots';

    $(ul + ' li').not('.results, .loading').remove(); // nieuw
    $('#' + div +' div.loading').hide(); // nieuw

    for (var i=0; i < resultSet.rows.length; i++) {
	item = resultSet.rows.item(i);

	eval('name_lang = item.naam_' + settings['lang']);
	if (name_lang.length > 0) item.naam = name_lang;

	if($(ul + ' li.item_' + item.id).length == 0) {  // nieuw
	    $(ul).append('\
                    <li class="results item_' + item.id + '">\
                        <a href="#" onclick="getSpot(\''+ item.id +'\',\''+ item.naam +'\')">\
                            <div class="results_photo"><img src="./img/loader.gif" class="results_loader"></div>\
                            <h1 style="max-width:80% !important;">'+ item.naam +'</h1><small class="counter distance">' + item.distance + ' km</small>\
                            <span class="stars inResults spots_'+ item.id +'_'+ settings['lang'] +'" style="right:10px !important; top: 6px !important;"></span>\
                            <p  style="max-width:80% !important;">\
                                ' + item.typeNaam + (item.regioNaam != undefined ? ', ' + item.regioNaam + '' : '') + '\
                            </p>\
                        </a>\
                    </li>\
                ');
	    if(item.rating > 0) stars('spots_' + item.id + '_' + settings['lang'] + '', item.rating);
	    if(item.photo.length > 0) {
		$(ul + ' li.item_' + item.id + ' img.results_loader').attr('src', 'data:image/jpeg;base64,' + item.photo).removeClass('loader').addClass('resultImg');
	    }
	    else {
		$(ul + ' li.item_' + item.id + ' img.results_loader').attr('src','./img/nophoto.png').removeClass('loader').addClass('resultImg');
	    }
	    items.push(item);
	} // nieuw
    }

    var TotalResults = settings['num_results_' + div + '']; // nieuw
    var numResults = $(ul + ' li.results').length; // nieuw

    if(numResults < TotalResults) $(ul).append('<li class="more"><a href="#" onclick="select_nb_spots(\'\', \'\', \'' + div + '\',  \'' + numResults + '\');">' + lang['laadMeer'][settings['lang']] + '</a></li>'); // nieuw

    $(ul +' li.loading').remove();
    $('#' + div +' div.loading').hide();



    if (resultSet.rows.length > 0) {
	callback_nb_spots(items);
    }
    else {
	callback_nb_spots(null);
    }


    busy['update_nb_spots'] = false;
}




var callback_types, timeout_types, timeout_types_id;

var types_are_updated = [];


function update_types(timeout, callback) {

    $('#ul.types li').not('.loading').remove();
    $('#ul.types').append('<li class="loading">'+ lang['bezigMetLaden'][settings['lang']] +'</li>');

    if (busy['update_types']) {
	msg('update_types already in progress...', 32);
	return false;
    }

    types_are_updated[settings['regio']] = true;

    if (is_online() != true) {
	busy['update_types'] = false;
	return false;
    }

    busy['update_types'] = true;

    timeout_types = timeout;
    timeout_types_id = window.setTimeout(function() {
	busy['update_types'] = false;
	timeout_types();
    }, webservice_timeout);

    callback_types = callback;

    msg('update_types()', 1);

    msg('get_types', 2);

    try {

	$.post(api_url + 'calls/loadTypes.php?regio='+ settings['regio'], {}, function(data) {

	    window.clearTimeout(timeout_types_id);

	    if (!data.error) {

		var types = data.types;

		regio_types = [];

		for (var id in types) {

		    type_item = types[id];

		    item_id = type_item.id;

		    save_ByPK('types', item_id, {
			id:		    item_id,
			icon:	    type_item.icon || '',
			NL:		    type_item.NL,
			EN:		    type_item.EN,
			DE:		    type_item.DE,
			ES:		    type_item.ES,
			order:	    type_item.order
		    });

		    regio_types.push({
			regio_id: settings['regio'],
			type_id: item_id
		    });

		}

		regio_types = unique(regio_types);

		db.transaction(
		    function (transaction) {

			transaction.executeSql('\
					    	DELETE FROM `regio_types` WHERE `regio_id` = ' + settings['regio'] + '\
					    	;', [], function(transaction, resultSet) {

			    sql_values = [];

			    for (var id in regio_types) {
				regio_type = regio_types[id];

				saving['main']++;

				transaction.executeSql("\
								INSERT INTO	`regio_types`\
								(`regio_id`, `type_id`)\
								VALUES\
								(" + regio_type.regio_id + ", " + regio_type.type_id + ")\
							    ", [], function(transaction, resultSet) {
				    saving['main']--;
				}, errorHandler);

			    }

			    save_ByPK_commit();
			    save_Setting('types_update_regio_' + settings[regio] + '', '1');
			    select_types();

			}, errorHandler);
		    });

	    }
	    else {

		// TODO: Foutmelding geven
		busy['update_types'] = false;
		timeout_types();

	    }

	}, 'json');

    } catch (error) {

	busy['update_types'] = false;
	window.clearTimeout(timeout_types_id);
	timeout_types();

    }

}

function select_types(is_retry, callback) {

    is_retry = is_retry | false;
    callback_types = callback || callback_types;

    if (!is_retry)
	msg('select_types()', 1);

    for (var i in saving) {
	if (saving[i] > 0) {
	    msg('Waiting for save... (types)', 8);
	    window.setTimeout(function() {
		select_types(true);
	    }, 200);
	    return false;
	}
    }

    db.transaction(
	function (transaction) {
	    transaction.executeSql("\
                    SELECT		`types`.`" + settings['lang'] + "` AS `typeNaam`, `spots`.`id`,`spots`.`naam`,`spots`.`plaats`,`spots`.`type_id`,`spots`.`lon`,`spots`.`lat`\
                    FROM		`spots`\
                    LEFT JOIN           `types` ON `types`.`id` = `spots`.`type_id`\
                    WHERE               `spots`.`regio_id` = " + settings['regio'] + "\
		    ORDER BY		`types`.`order` ASC\
                    ;", [], mkMarkers, errorHandler);
	}
	);

    db.transaction(
	function (transaction) {
	    transaction.executeSql("\
			SELECT		`types`.*\
			FROM		`types`\
			INNER JOIN	`regio_types`\
				ON		`regio_types`.`regio_id` = " + settings['regio'] + "\
				AND		`regio_types`.`type_id` = `types`.`id`\
                        GROUP BY `regio_types`.`type_id`\
			ORDER BY	`types`.`order` ASC\
			;", [], show_types, errorHandler);
	}
	);

}



function show_types(transaction, resultSet) {

    var types = [];

    msg('show_types()', 1);
    var ul = '#R_' + settings['regio'] + '_' + settings['lang'] + ' ul.types';
    var div = '#R_' + settings['regio'] + '_' + settings['lang'];
    $(ul +' li').not('.loading').remove();

    if(resultSet.rows.length == 0) {
	if(is_online()) {
            update_types();
            msg('update toch maar..',1);
            return true;
        }
        else {
            alert('er is iets misgegeaan...');
        }
    }

    for (var i=0; i < resultSet.rows.length; i++) {
	type = resultSet.rows.item(i);
	$(ul).append('\
		    <li class="arrow">\
			<a href="#" onclick="getType(' + type.id + ', \'' + eval('type.' + settings['lang']) + '\');">\
			    <div style="float: left; position: relative; width: 32px; height: 22px;">\
				<img src="' + (type.icon != '' ? 'data:image/png;base64,' + type.icon : './img/pixel.gif' ) + '" style="width: 32px; height: 32px; position: absolute; top: -5px; left: -4px;">\
			    </div>\
			    ' + eval('type.' + settings['lang']) + '\
			</a>\
		    </li>');
	types[type.id] = type;
    }

    $(div + ' div.loading').hide();
    $(ul + ' li.loading').remove();

    //    if (resultSet.rows.length > 0) {
    //		callback_types(types);
    //    }
    //    else {
    //		callback_types(null);
    //    }

    busy['update_types'] = false;
}



var langs = {
    'NL' : 'Nederlands',
    'EN' : 'English',
    'ES' : 'Espanol',
    'DE' : 'Deutch'
}

function unique(a){
    a.sort();
    for(var i = 1; i < a.length; ){
        if(a[i-1] == a[i]){
            a.splice(i, 1);
        } else {
            i++;
        }
    }
    return a;
}

function popUp(div){
    if($('#' + div + ' div.popUp').hasClass('show')) {
       $('#' + div + ' div.popUp').removeClass('show').addClass('hide');
       $('#' + div + ' div.blackOut').hide();
    }
    else {
         $('#' + div + ' div.blackOut').show();
         $('#' + div + ' div.popUp').removeClass('hide').addClass('show');
    }
}


function __log_function(f) {
    console.log('** Function call: ' + f + ' **');
}

function htmldecode( s ) {
    var str =  $('<div />').html("" + encode_utf8(s) + "").text();
    return str;
}

function encode_utf8( s ){
  return unescape( encodeURIComponent( s ) );
}

function decode_utf8( s ){
  return decodeURIComponent( escape( s ) );
}

var HoursToRefresh = 2;
var totalPhotos;
var slider;
var photos = [];
var timeouts = [];

////// LANG
////////////////

function setLang(val, home) {
        save_Setting('lang', '' + val + '');

        spot_is_updated = [];
        spots_are_updated = [];


        $('#busy span').text(lang['bezigMetLaden'][settings['lang']]);
        $('.langSelector').css('background-image', 'url(./img/flag_' + settings['lang'] + '.gif)');
        $('#jqt .toolbar h1').not('.allways').hide();
        $('.language').hide();
        $('#favBtn').html('<small class="favourites"></small>' + lang['favorieten'][settings['lang']] + '<small class="counter" id="numFavs">' + settings['num_favs'] + '</small>');
        $('#nearbyBtn').html('<small class="nearby"></small>' + lang['inDeBuurt'][settings['lang']] + '');
        $('#toeristischBtn').html('<small class="toeristisch"></small>' + lang['toeristisch'][settings['lang']] + '');

	$('#contact_first_name').attr('placeholder', lang['msgFirstName'][settings['lang']]);
	$('#contact_last_name').attr('placeholder', lang['msgLastName'][settings['lang']]);
	$('#contact_email').attr('placeholder', lang['msgEmail'][settings['lang']]);
	$('#contact_message').attr('placeholder', lang['msgMessage'][settings['lang']]);
	$('#contact_submit').html(lang['msgSubmit'][settings['lang']]);

        $('.'+ settings['lang'] +'').show();
        if(!home) jQT.goBack();
        else getRegios();
}


function regioInfo(id) {
    if($('ul.regioInfo_' + id + ' li.informatie.lang_' + settings['lang'] + '').length == 0) {
        $('ul.regioInfo_' + id).append('<li class="informatie lang_' + settings['lang'] + '">' + nl2br(regios['' + id + '']['' + settings['lang'] + '']) + '</li>');
    }
    else {
       $('ul.regioInfo_' + id + ' li.informatie.lang_' + settings['lang']).remove();
    }
}
////////////////
/// EINDE LANG



/// GEO
//////////////

function getGeo() {

        msg('Searching for GPS', 1);

        if(geo_position_js.init() && settings['geo'] != 'false'){
                geo_position_js.getCurrentPosition(success_callback,error_callback,{enableHighAccuracy:true});
        }
        else {
            msg('No GPS', 1);
        }
        function success_callback(p){
            save_Setting('lat', ''+p.coords.latitude.toFixed(10)+'');
            save_Setting('lon', ''+p.coords.longitude.toFixed(10)+'');
            msg('GPS SET', 1);

        }
        function error_callback(p){
                // POSITION_UNAVAILABLE = 2
                if(p.code == "2") save_Setting('geo', 'false');
                msg('No GPS', 1);
        }
        return true;
}

/// EINDE GEO
//////////////////

var default_WOEID = "12478595";
var weatherImg = "http://l.yimg.com/a/i/us/nws/weather/gr/";

var windDir = {
    'N' : 0,
    'NNE' : 22,
    'NE' : 45,
    'ENE' : 67,
    'E' : 90,
    'ESE' : 112,
    'SE' : 135,
    'SSE' : 157,
    'S' : 180,
    'SSW' : 202,
    'SW' : 225,
    'WSW' : 247,
    'W' : 270,
    'WNW' : 292,
    'NW' : 315
}
var bft = {
    '1' : 1,
    '2' : 6,
    '3' : 12,
    '4' : 20,
    '5' : 29,
    '6' : 39,
    '7' : 50,
    '8' : 62,
    '9' : 75,
    '10' : 89,
    '11': 102,
    '12' : 117
}

//// MARKERS
/////////////////////////////

function mkMarkers(transaction, resultSet) {

    var div = settings['mapId'];

    save_Setting('num_results_' + div + '', ''+ resultSet.rows.length +'');

    if(marker[div] == undefined || !marker[div] || div.indexOf('NB_') > -1) {
	marker[div] = [];

	for (var i=0; i < resultSet.rows.length; i++) {
	    item = resultSet.rows.item(i);
	    marker[div][item.id] = item;
	}
    } else {
	msg('created markers for ' + div + ' already', 1);
    }

}

////////////////
// EINDE MARKERS



//// MAP / LIST
/////////////////////

var regios;
var types;

var mylatlng        = [];
var myOptions       = [];
var map             = [];
var marker          = [];
var icon            = [];
var pos             = [];
var bounds          = [];
var contentBubble   = [];
var infoBubble      = [];
var me;

var weather;
var weather_marker  = [];
var weatherlatlng   = [];

var min_zoomlevel   = 14;

var weatherIconSmall, weatherIcon, weatherIconLarge, image, imageLarge, imageSmall, shadow, meIcon, curPos;


var noPoi = [{featureType: "poi",stylers: [{visibility: "off"}]}];
function setMapIcons() {

//    if(weather_marker != undefined) {
//       //  alert(weather_marker['icon'] + '!')
//        weatherIconSmall = new google.maps.MarkerImage(''+ weather_marker['icon'] + '',
//            new google.maps.Size(250, 180),
//            new google.maps.Point(0,0),
//            new google.maps.Point(31, 22),
//            new google.maps.Size(62, 45)
//        );
//
//        weatherIcon = new google.maps.MarkerImage(''+ weather_marker['icon'] + '',
//            new google.maps.Size(250, 180),
//            new google.maps.Point(0,0),
//            new google.maps.Point(62, 45),
//            new google.maps.Size(125, 90)
//        );
//
//       weatherIconLarge = new google.maps.MarkerImage(''+ weather_marker['icon'] + '',
//            new google.maps.Size(250, 180),
//            new google.maps.Point(0,0),
//            new google.maps.Point(125,90)
//        );
//    }

    imageLarge = new google.maps.MarkerImage('img/marker.png',
    new google.maps.Size(44, 59),
    new google.maps.Point(0,0),
    new google.maps.Point(22, 55),
    new google.maps.Size(43, 58)
    );

    image = new google.maps.MarkerImage('img/marker.png',
    new google.maps.Size(44, 59),
    new google.maps.Point(0,0),
    new google.maps.Point(16, 39),
    new google.maps.Size (30,40)
    );

    imageSmall = new google.maps.MarkerImage('img/marker.png',
    new google.maps.Size(44, 59),
    new google.maps.Point(0,0),
    new google.maps.Point(10, 26),
    new google.maps.Size (20,27)
    );

    shadow = new google.maps.MarkerImage('img/markerShadow.png',
    new google.maps.Size(61, 42),
    new google.maps.Point(0,0),
    new google.maps.Point(6, 18),
    new google.maps.Size(30, 21)
    );

    meIcon = new google.maps.MarkerImage('img/meIcon.png',
    new google.maps.Size(30, 32),
    new google.maps.Point(0,0),
    new google.maps.Point(7, 7),
    new google.maps.Size(14, 15)
    );

    curPos = new google.maps.MarkerImage('img/curPos.gif',
    new google.maps.Size(75, 75),
    new google.maps.Point(0,0),
    new google.maps.Point(37, 37),
    new google.maps.Size(74, 74)
    );
}

var prevSpotId = -1;

function closeAll() {
    if (undefined == directionsDisplay) {
        $('#' + settings['mapId'] + ' div.directions').removeClass('in, more').addClass('hide');
        for(var i in infoBubble[settings['mapId']]) {
            infoBubble[settings['mapId']][i].close();
        }
        prevSpotId = -1;
    }

}

function init_Map(div , spot_or_not) {

	spot_or_not = spot_or_not || false;

    if (undefined != directionsDisplay)
	directionsDisplay.setDirections({
	    routes: []
	})

    $('#' + settings['mapId'] + ' div.directions').removeClass('in, more');

    if(map[div] == undefined && is_online() == true) {

	if(settings['geo']!="false") {
	    mylatlng[div] = new google.maps.LatLng(settings['lat'],settings['lon']);
	}
	else {
	    mylatlng[div] = new google.maps.LatLng(regios[settings['regio']].lat,regios[settings['regio']].lon);
	}

	myOptions[div] = {
	    zoom: 17,
	    center: mylatlng[div],
	    disableDefaultUI: false,
	    mapTypeControl: false,
	    streetViewControl: false,
	    zoomControl: true,
	    zoomControlOptions: {
		style: google.maps.ZoomControlStyle.SMALL,
		position: google.maps.ControlPosition.RIGHT_TOP
	    },
	    mapTypeId: google.maps.MapTypeId.ROADMAP
	};



	map[div] = new google.maps.Map(document.getElementById(div + "_map"), myOptions[div]);


	google.maps.event.addListener(map[div], 'bounds_changed', function(event) {
	    map[div].setZoom( Math.min( 17, map[div].getZoom() ) );
	});

	map[div].setOptions({
	    styles: noPoi
	});

	bounds[div] = new google.maps.LatLngBounds();

	icon[div] = [];

	pos[div] = [];

	me = new google.maps.Marker({
	    map: map[div],
	    icon: meIcon,
	    shadow: curPos,
	    optimized: false,
	    position: mylatlng[div],
	    zIndex: 1
	});

	google.maps.event.addListener(me, 'click', function() {
	    for(var i in infoBubble[div]) {
		infoBubble[div][i].close();
	    }
	    map[div].setZoom(14);
	    map[div].setCenter(me.getPosition());
	    map[div].panTo(me.getPosition());
	});

        // bounds[div].extend(mylatlng[div]);

//	if(weatherIcon != undefined) {
//
//	    weatherlatlng[settings['regio']] = new google.maps.LatLng(regios[settings['regio']].weather_lat,regios[settings['regio']].weather_lon);
//	    weather = new google.maps.Marker({
//		map: map[div],
//		icon: weatherIconSmall,
//		optimized: false,
//		position: weatherlatlng[settings['regio']],
//		zIndex: 1
//	    });
//	    // bounds[div].extend(weatherlatlng[settings['regio']]);
//
//	}

	contentBubble[div] = [];
	infoBubble[div] = [];

	num_markers = 0;
	last_marker_id = '';

	for(var i in marker[div]) {

	    num_markers++;
if (num_markers > 20) break;
	    var markers = marker[div][i];
	    last_marker_id = markers.id;

	    if(pos[div][markers.id] == undefined) {
		pos[div][markers.id] = new google.maps.LatLng(markers.lat, markers.lon);
		bounds[div].extend(pos[div][markers.id]);
	    }

	    icon[div][markers.id] = new google.maps.Marker({
		map: map[div],
		icon: imageSmall,
		shadow: shadow,
		animation: google.maps.Animation.DROP,
		optimized: false,
		position: pos[div][markers.id],
		title: '' + markers.naam + '',
		zIndex: 9
	    });

	    contentBubble[div][markers.id] = '<span><h1>' + markers.naam + '</h1><p>';
	    if(markers.typeNaam) contentBubble[div][markers.id] += '' + markers.typeNaam + '';
	    if(markers.plaats) contentBubble[div][markers.id] += ', ' + markers.plaats + '';
	    contentBubble[div][markers.id] += '</p></span>';

	    setinfoBubble(icon[div][markers.id], markers.id, '' + markers.naam + '', '' + contentBubble[div][markers.id] + '');

	}

	if (num_markers >= 1) {
	    map[div].fitBounds(bounds[div]);
	}

	function setinfoBubble(id, spot_id, naam, content) {

	    infoBubble[div][spot_id] = new InfoBubble({
		map: map[div],
		content: '<div class="phoneytext"><div>' + content + '</div><div class="arrow" onclick="getSpot(' + spot_id + ', \'' + naam + '\')"><img src="./img/arrow.png"></div></div>',
		position: pos[div][spot_id],
		shadowStyle: 0,
		padding: 0,
		backgroundColor: 'rgba(57,57,57, 0.8)',
		borderRadius: 8,
		arrowSize: 15,
		borderWidth: 0,
		borderColor: '#000',
		disableAutoPan: false,
		hideCloseButton: true,
		arrowPosition: 45,
		backgroundClassName: 'phoney',
		arrowStyle: 1,
		id: spot_id
	    });

	    google.maps.event.addListener(id, 'click', function() {

		if (prevSpotId != spot_id) {
		    prevSpotId = spot_id;

		    if (undefined != directionsDisplay) {

				$('#' + div + ' div.directions').removeClass('hide in more');

				directionsDisplay.setDirections({
				    routes: []
				});

				directionsDisplay = undefined;
				map[div].setZoom(min_zoomlevel);

		    }


		    for(var i in infoBubble[div]) {
			infoBubble[div][i].close();
		    }
		    for(var i in icon[div]) {
			icon[div][i].setZIndex(9);
		    }

		    id.setZIndex(10);
		    infoBubble[div][spot_id].open();
		}

		$directionsDiv = $('#' + div + '_directions');

		if(is_online()) {

		    $directionsDiv.removeClass('in more hide').show();
		    $directionsDiv.html('\
                                <ul class="individual segmented direction">\
                                    <li><a href="#" data-route-type="walk" data-spot-id="' + spot_id + '" onclick="javascript: calcRoute(this,\'' + pos[div][spot_id] + '\',\'' + mylatlng[div] + '\');" class="_foot"><img src="img/footIcon.png" style="height:14px;float: left;margin: 5px 2px 0 0px;"></a></li>\
                                    <li><a href="#" data-route-type="car" data-spot-id="' + spot_id + '" onclick="javascript: calcRoute(this,\'' + pos[div][spot_id] + '\',\'' + mylatlng[div] + '\');"  class="_car"><img src="img/carIcon.png" style="height:14px;float: left;margin: 5px 5px 0 0px;"></a></li>\
                                </ul>\
                                <div class="route_steps">\
                                    <div class="step_description"><p></p></div>\
                                    <div class="gotoPrevStep">&lt;</div>\
                                    <div class="gotoNextStep">&gt;</div>\
                                </div>\
                                ');
			$directionsDiv.addClass('in');
		                        for(var l in langs) {
                        $('._foot').append('<span class="language ' + l + '" ' + (settings['lang'] != l ? 'style="display: none;"' : 'style="float: left;"') + '>' + lang['routeVoet'][l] + '</span>');
                        $('._car').append('<span class="language ' + l + '" ' + (settings['lang'] != l ? 'style="display: none;"' : 'style="float: left;"') + '>' + lang['routeAuto'][l] + '</span>');
                    }
		}
		else {
		    prevSpotId = -1;
		    $directionsDiv.removeClass('in, more').hide().addClass('hide');
		}
	    });
	}


    }
    else if(map[div] != undefined) {
	for(var i in icon[div]) {
	    icon[div][i].setAnimation(google.maps.Animation.DROP);
	    icon[div][i].setAnimation(null);
	}

	if (marker[div].length > 1) {
	    map[div].fitBounds(bounds[div]);
	}
    }
    else {
	alert('no connection...');
	$('#jqt div.loading').hide();
    }

    google.maps.event.addListener(map[settings['mapId']], 'click', function() {
	closeAll();
    });
//    google.maps.event.addListener(weather, 'click', function() {
//	closeAll();
//    });

    /// ZOOOM
    google.maps.event.addListener(map[div], 'zoom_changed', function() {
	set_zoom();
    });

    if (num_markers == 1) {
		google.maps.event.trigger(icon[div][last_marker_id], 'click');
    }

    function set_zoom(check) {

	if(!check) check = 0;

//	if(map[div].getZoom()>=15) {
//	    weather.setOptions({
//		icon: weatherIconLarge
//	    });
//	}
//	else if(map[div].getZoom()>=14) {
//	    weather.setOptions({
//		icon: weatherIcon
//	    });
//	}
//	else  {
//	    weather.setOptions({
//		icon: weatherIconSmall
//	    });
//	}

	if(map[div].getZoom() <= 14) {
	    for(var i in icon[div]) {
		icon[div][i].setOptions({
		    icon: imageSmall
		});
	    }
	}
	else if(map[div].getZoom() > 16) {
	    for(var i in icon[div]) {
		icon[div][i].setOptions({
		    icon: imageLarge
		});
	    }
	}
	else {
	    for(var i in icon[div]) {
		icon[div][i].setOptions({
		    icon: image
		});
	    }
	}
	if(check == 1) {
	    if(map[div].getZoom() > min_zoomlevel) {
		map[div].setZoom(min_zoomlevel);
	    }
	}
    }




    /// EINDE ZOOM
    $('#' + div).find('div.loading').hide();
}





// Directions
//////////////////


var directionsDisplay;
var directionsService;

function calcRoute(a, dest, start) {

    currentRouteStep = 0

    var mapId = settings['mapId'];

    $('#' + mapId + ' div.directions').addClass('more');

    spot_id = $(a).attr('data-spot-id');
    route_type = $(a).attr('data-route-type');

    msg('start: ' + start + ' dest: ' + dest + ' div: ' + mapId + '',1);

    if (undefined != directionsDisplay)
	directionsDisplay.setDirections({routes: []})

    directionsService = new google.maps.DirectionsService();
    directionsDisplay = new google.maps.DirectionsRenderer({
	suppressMarkers: true
    });

    directionsDisplay.setMap(map[mapId]);
    directionsDisplay.setPanel(document.getElementById('directions_explain'));

    if (route_type == 'car') tm = google.maps.DirectionsTravelMode.DRIVING;
    if (route_type == 'walk') tm = google.maps.DirectionsTravelMode.WALKING;

    var request = {
	origin:start,
	destination:dest,
	travelMode: tm
    };

    directionsService.route(request, function(response, status) {

	if (status == google.maps.DirectionsStatus.OK) {
	    directionsDisplay.setDirections(response);

	    routeDetails = {
		'distance': response.routes[0].legs[0].distance.text,
		'duration': response.routes[0].legs[0].duration.text
	    }

            routeSteps = response.routes[0].legs[0].steps;

	    prepareRouteView(routeDetails, routeSteps);

	    window.setTimeout(function() {
		$('#busy').hide();
	    }, 1000);

	}

    });
}

var currentRouteStep = 0;
var routeDetails;
var routeSteps;

function prepareRouteView(details, steps) {

    div = settings['mapId'];

    $('#' + div + ' div.directions .gotoPrevStep, #' + div + ' div.directions .gotoNextStep').unbind('click');
    routeDetails = details;
    routeSteps = steps;

    $('#' + div + ' div.directions span.total_distance').text(routeDetails.distance);
    $('#' + div + ' div.directions span.total_duration').text(routeDetails.duration);

    $('#' + div + ' div.directions .gotoPrevStep').css('cursor', 'pointer').click(function() {

	if (currentRouteStep > 0) {
	    currentRouteStep--;
	    step = routeSteps[currentRouteStep];
	    showRouteStep(step);
	} else {

	}
    });

    $('#' + div + ' div.directions .gotoNextStep').css('cursor', 'pointer').click(function() {

	if (currentRouteStep < routeSteps.length - 1) {
	    currentRouteStep++;
	    step = routeSteps[currentRouteStep];
	    showRouteStep(step);
	} else {

	}
    });

    $('#' + div + ' div.directions div.step_description p').first().html(routeSteps[0].instructions);

}

function showRouteStep(step) {

    div = settings['mapId'];

    bounds['steps'] = new google.maps.LatLngBounds();
    bounds['steps'].extend(step.start_location);
    bounds['steps'].extend(step.end_location);

    map[div].fitBounds( bounds['steps'] );
    $('#' + div + ' div.directions div.step_description p').first().html(step.instructions);
//    h1 = $('#' + div + ' div.directions div.route_steps').first().height();
//    h2 = $('#' + div + ' div.directions div.step_description p').first().height();
//    $('#' + div + ' div.directions div.step_description p').first().css('marginTop', ((h1 - h2) / 2) + 'px');

}



/// Einde Directions
/////////////////////

function showMap(new_panel, spot_or_not) {
	spot_or_not = spot_or_not || false;
    new_panel = new_panel || false;

    setMapIcons();
    closeAll();

    $('div.directions').show();

    var CurDiv = $('div.current').attr('id');
    if(CurDiv != settings['mapId']) {
        msg('Changed Div from `'+ settings['mapId'] +'`to: `' + CurDiv + '`', 1);
        save_Setting('mapId', CurDiv);
    }

   //  var CurDiv = settings['mapId'];

    if (!new_panel) {

	$('#' + CurDiv).find('ul.segmented li a').removeClass('selected')
	$('#' + CurDiv).find('ul.segmented li a.map').addClass('selected');
	$('#' + CurDiv).find('ul.results').hide();
	$('#' + CurDiv).find('div.map, div.loading').show();


    } else {

	$('#' + CurDiv + '_map').find('div.map, div.loading').show(); //mappanel
	jQT.goTo('#' + CurDiv + '_map', 'slideleft'); //mappanel

    }

    msg('Show Map view for `' + CurDiv + '`', 1);

    init_Map(CurDiv, spot_or_not);
    return false;

}

function showList() {

    $('div.directions').hide();
    closeAll();

    var CurDiv = $('div.current').attr('id');
    //var CurDiv = settings['mapId'];

    $('#' + CurDiv).find('ul.segmented li a').removeClass('selected')
    $('#' + CurDiv).find('ul.segmented li a.list').addClass('selected');
    $('#' + CurDiv).find('ul.results').show();
    $('#' + CurDiv).find('div.map').hide();

    msg('Show List view for `' + CurDiv + '`', 1);

    return false;
}
function showMapSpotControls(hide_or_show) {
	if(!hide_or_show) hide_or_show = "show";
	var CurDiv = '#' + $('div.current').attr('id');

	if(hide_or_show == "show") {
		$(CurDiv + ' div.toolbar').find('a.back').hide();
		$(CurDiv + ' div.toolbar').append('<a class="button leftButton close" href="#" onclick="showMapSpotControls(\'hide\')">' + lang['sluiten'][settings['lang']] + '</a>');
		showMap('', 'spot');
		$(CurDiv).find('div.spot ul.rounded').hide();
	}
	else {
		$(CurDiv).find('div.spot ul.rounded').show();
		$(CurDiv).find('div.map, div.directions').hide();
		$(CurDiv + ' div.toolbar').find('a.close').hide();
		$(CurDiv + ' div.toolbar').find('a.back').show();
	}
}

////////////////////
/// EINDE MAP / LIST




function nl2br (str, is_xhtml) {
    // Converts newlines to HTML line breaks
    //
    // version: 1109.2015
    // discuss at: http://phpjs.org/functions/nl2br
    // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +   improved by: Philip Peterson
    // +   improved by: Onno Marsman
    // +   improved by: Atli Þór
    // +   bugfixed by: Onno Marsman
    // +      input by: Brett Zamir (http://brett-zamir.me)
    // +   bugfixed by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +   improved by: Brett Zamir (http://brett-zamir.me)
    // +   improved by: Maximusya
    // *     example 1: nl2br('Kevin\nvan\nZonneveld');
    // *     returns 1: 'Kevin\nvan\nZonneveld'
    // *     example 2: nl2br("\nOne\nTwo\n\nThree\n", false);
    // *     returns 2: '<br>\nOne<br>\nTwo<br>\n<br>\nThree<br>\n'
    // *     example 3: nl2br("\nOne\nTwo\n\nThree\n", true);
    // *     returns 3: '\nOne\nTwo\n\nThree\n'

    // var breakTag = (is_xhtml || typeof is_xhtml === 'undefined') ? '</p><p class="text">' : '<br>';
    var breakTag = (is_xhtml || typeof is_xhtml === 'undefined') ? '<br />' : '<br />';
    str = (str + '').replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, '$1' + breakTag + '$2');
    // str = (str + '').replace(/([^>\r\n\r\n]?)(\r\n\r\n|\n\r\n\r)/g, '$1' + breakTag + '$2');
    return str;
}

function getOsVersion() {
    var agent = window.navigator.userAgent,
        start = agent.indexOf( 'OS ' );

    if( ( agent.indexOf( 'iPhone' ) > -1 || agent.indexOf( 'iPad' ) > -1 ) && start > -1 ){
        return window.Number( agent.substr( start + 3, 3 ).replace( '_', '.' ) );
    } else {
        return 0;
    };

};

function doalert(str, caption) {

    caption = caption || 'YouGET Userapp';

    if (is_native) {
	navigator.notification.alert(str, function() {}, caption);
    } else {
	alert(caption + ': ' + str);
    }

}

/**
 * type_id | Description
 * --------|---------------------------
 * 1	   | Notice / function call
 * 2	   | Webservice
 * 4	   | GPS Notice
 * 8	   | Database
 */
function msg(str, type_id) {

    return true;

//    if (type_id == 8) return true;

    type_id = type_id || 1;

    msg_type = {1: 'Notice', 2: 'Webservice', 4: 'GPS Notice', 8: 'Database', 16: 'Error', 32: 'Warning'}

    uptime = Math.round(new Date().getTime() / 1000) - ts_startup;
    uptime_m = Math.floor(uptime / 60);
    uptime_s = uptime % 60;
    uptime = (uptime_m > 9 ? uptime_m : '0' + uptime_m) + ':' + (uptime_s > 9 ? uptime_s : '0' + uptime_s);

    if (type_id == 16 || type_id == 32) {
	console.error(uptime + ' ' + msg_type[type_id] + ': ' + str);
    } else {
	console.log(uptime + ' ' + msg_type[type_id] + ': ' + str);
    }

}

function is_online() {

    // if (!is_native) return true;

    if (undefined == navigator.network)  {
        if(navigator.onLine == true) return true;
        else return false;
    }

    var networkState = navigator.network.connection.type;
    if (networkState == Connection.UNKNOWN || networkState == Connection.NONE) return false;
    else return true;
}

function check_online_status() {
    if(is_online()==true) {
         $('.online_only').show();
    }
    else {
        $('.online_only').hide();
    }
}

setInterval(function(){
    check_online_status();
},500);


function strtotime (str, now) {
    // Convert string representation of date and time to a timestamp
    //
    // version: 1109.2015
    // discuss at: http://phpjs.org/functions/strtotime
    // +   original by: Caio Ariede (http://caioariede.com)
    // +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +      input by: David
    // +   improved by: Caio Ariede (http://caioariede.com)
    // +   improved by: Brett Zamir (http://brett-zamir.me)
    // +   bugfixed by: Wagner B. Soares
    // +   bugfixed by: Artur Tchernychev
    // %        note 1: Examples all have a fixed timestamp to prevent tests to fail because of variable time(zones)
    // *     example 1: strtotime('+1 day', 1129633200);
    // *     returns 1: 1129719600
    // *     example 2: strtotime('+1 week 2 days 4 hours 2 seconds', 1129633200);
    // *     returns 2: 1130425202
    // *     example 3: strtotime('last month', 1129633200);
    // *     returns 3: 1127041200
    // *     example 4: strtotime('2009-05-04 08:30:00');
    // *     returns 4: 1241418600
    var i, match, s, strTmp = '',
        parse = '';

    strTmp = str;
    strTmp = strTmp.replace(/\s{2,}|^\s|\s$/g, ' '); // unecessary spaces
    strTmp = strTmp.replace(/[\t\r\n]/g, ''); // unecessary chars
    if (strTmp == 'now') {
        return (new Date()).getTime() / 1000; // Return seconds, not milli-seconds
    } else if (!isNaN(parse = Date.parse(strTmp))) {
        return (parse / 1000);
    } else if (now) {
        now = new Date(now * 1000); // Accept PHP-style seconds
    } else {
        now = new Date();
    }

    strTmp = strTmp.toLowerCase();

    var __is = {
        day: {
            'sun': 0,
            'mon': 1,
            'tue': 2,
            'wed': 3,
            'thu': 4,
            'fri': 5,
            'sat': 6
        },
        mon: {
            'jan': 0,
            'feb': 1,
            'mar': 2,
            'apr': 3,
            'may': 4,
            'jun': 5,
            'jul': 6,
            'aug': 7,
            'sep': 8,
            'oct': 9,
            'nov': 10,
            'dec': 11
        }
    };

    var process = function (m) {
        var ago = (m[2] && m[2] == 'ago');
        var num = (num = m[0] == 'last' ? -1 : 1) * (ago ? -1 : 1);

        switch (m[0]) {
        case 'last':
        case 'next':
            switch (m[1].substring(0, 3)) {
            case 'yea':
                now.setFullYear(now.getFullYear() + num);
                break;
            case 'mon':
                now.setMonth(now.getMonth() + num);
                break;
            case 'wee':
                now.setDate(now.getDate() + (num * 7));
                break;
            case 'day':
                now.setDate(now.getDate() + num);
                break;
            case 'hou':
                now.setHours(now.getHours() + num);
                break;
            case 'min':
                now.setMinutes(now.getMinutes() + num);
                break;
            case 'sec':
                now.setSeconds(now.getSeconds() + num);
                break;
            default:
                var day;
                if (typeof(day = __is.day[m[1].substring(0, 3)]) != 'undefined') {
                    var diff = day - now.getDay();
                    if (diff == 0) {
                        diff = 7 * num;
                    } else if (diff > 0) {
                        if (m[0] == 'last') {
                            diff -= 7;
                        }
                    } else {
                        if (m[0] == 'next') {
                            diff += 7;
                        }
                    }
                    now.setDate(now.getDate() + diff);
                }
            }
            break;

        default:
            if (/\d+/.test(m[0])) {
                num *= parseInt(m[0], 10);

                switch (m[1].substring(0, 3)) {
                case 'yea':
                    now.setFullYear(now.getFullYear() + num);
                    break;
                case 'mon':
                    now.setMonth(now.getMonth() + num);
                    break;
                case 'wee':
                    now.setDate(now.getDate() + (num * 7));
                    break;
                case 'day':
                    now.setDate(now.getDate() + num);
                    break;
                case 'hou':
                    now.setHours(now.getHours() + num);
                    break;
                case 'min':
                    now.setMinutes(now.getMinutes() + num);
                    break;
                case 'sec':
                    now.setSeconds(now.getSeconds() + num);
                    break;
                }
            } else {
                return false;
            }
            break;
        }
        return true;
    };

    match = strTmp.match(/^(\d{2,4}-\d{2}-\d{2})(?:\s(\d{1,2}:\d{2}(:\d{2})?)?(?:\.(\d+))?)?$/);
    if (match != null) {
        if (!match[2]) {
            match[2] = '00:00:00';
        } else if (!match[3]) {
            match[2] += ':00';
        }

        s = match[1].split(/-/g);

        for (i in __is.mon) {
            if (__is.mon[i] == s[1] - 1) {
                s[1] = i;
            }
        }
        s[0] = parseInt(s[0], 10);

        s[0] = (s[0] >= 0 && s[0] <= 69) ? '20' + (s[0] < 10 ? '0' + s[0] : s[0] + '') : (s[0] >= 70 && s[0] <= 99) ? '19' + s[0] : s[0] + '';
        return parseInt(this.strtotime(s[2] + ' ' + s[1] + ' ' + s[0] + ' ' + match[2]) + (match[4] ? match[4] / 1000 : ''), 10);
    }

    var regex = '([+-]?\\d+\\s' + '(years?|months?|weeks?|days?|hours?|min|minutes?|sec|seconds?' + '|sun\\.?|sunday|mon\\.?|monday|tue\\.?|tuesday|wed\\.?|wednesday' + '|thu\\.?|thursday|fri\\.?|friday|sat\\.?|saturday)' + '|(last|next)\\s' + '(years?|months?|weeks?|days?|hours?|min|minutes?|sec|seconds?' + '|sun\\.?|sunday|mon\\.?|monday|tue\\.?|tuesday|wed\\.?|wednesday' + '|thu\\.?|thursday|fri\\.?|friday|sat\\.?|saturday))' + '(\\sago)?';

    match = strTmp.match(new RegExp(regex, 'gi')); // Brett: seems should be case insensitive per docs, so added 'i'
    if (match == null) {
        return false;
    }

    for (i = 0; i < match.length; i++) {
        if (!process(match[i].split(' '))) {
            return false;
        }
    }

    return (now.getTime() / 1000);
}




var db, callback_check_Update = [];

try {
    if (!window.openDatabase) {
	alert('Unable to use Local Storage...');
    } else {
	var shortName = 'tenerife';
	var version = '1.0';
	var displayName = 'Tenerife';
	var maxSize = 1024 * 1024 * 10; // in bytes
	db = openDatabase(shortName, version, displayName, maxSize);

    // You should have a database instance in db.
    }
} catch(e) {
    // Error handling code goes here.
    if (e == 2) {
	// Version number mismatch.
	alert("Invalid database version.");
    } else {
	alert("Unknown error "+e+".");
    }
}

function nullDataHandler(transaction, results) {}

function errorHandler(transaction, error) {
    alert('Oops.  Error was '+error.message+' (Code '+error.code+')');

    var we_think_this_error_is_fatal = true;
    if (we_think_this_error_is_fatal) return true;
    return false;
}



function removeSpot(spot) { __log_function('removeSpot');
    db.transaction(
	function (transaction) {
	    transaction.executeSql("DELETE FROM `spots` WHERE `id` = '" + spot + "' ;", [], function(transaction, resultSet) {}, errorHandler);
	    transaction.executeSql("DELETE FROM `favourites` WHERE `spot_id` = '" + spot + "' ;", [], function(transaction, resultSet) {}, errorHandler);
	    transaction.executeSql("DELETE FROM `nearby` WHERE `spot_id` = '" + spot + "' ;", [], function(transaction, resultSet) {}, errorHandler);
	});
    msg('spot ' + spot + ' verwijderd!!',1);
}



// Generic truncate function
function truncate_table(table, callback) { __log_function('truncate_table');

    msg('truncate_table(' + table + ')', 8)

    db.transaction(
	function (transaction) {

	    transaction.executeSql("\
		DELETE	\
		FROM	`" + table + "`\
		;", [], function(transaction, resultSet) {

		callback();

	    }, errorHandler);

	}

    );

}

// Generic retrieve functions
function get_ByPK(table, id, callback, transaction) { __log_function('get_ByPK');

    if (undefined != transaction) {

	//	msg('* Existing transaction', 8)

	transaction.executeSql("\
	    SELECT	`" + table + "`.*\
			\
	    FROM	`" + table + "`\
			\
	    WHERE	`" + table + "`.`id` = " + id + "\
			\
	    ;", [], function(transaction, resultSet) {

	    if(resultSet.rows.length == 1) {
		item = resultSet.rows.item(0);
	    } else {
		item = null;
	    }

	    callback(item, transaction);

	}, errorHandler);

    } else {

	//	msg('* New transaction', 8)

	db.transaction(
	    function (transaction) {
		transaction.executeSql("\
		    SELECT		`" + table + "`.*,\
				    COUNT(`favorites`.`id`) AS `is_favorite`,\
				    COUNT(`following`.`id`) AS `is_following`\
				    \
		    FROM		`" + table + "`\
				    \
		    LEFT OUTER JOIN `favorites`\
				ON	`favorites`.`type` = '" + table + "'\
				AND	`favorites`.`id` = `" + table + "`.`id`\
				    \
		    LEFT OUTER JOIN `following`\
				ON	`following`.`id` = `" + table + "`.`id`\
				\
		    WHERE		`" + table + "`.`id` = " + id + "\
		    GROUP BY	`" + table + "`.`id`\
		    ;", [], function(transaction, resultSet) {

		    if(resultSet.rows.length == 1) {
			item = resultSet.rows.item(0);
		    } else {
			item = null;
		    }

		    callback(item);

		}, errorHandler);
	    }
	    );

    }

}

function get_ByFilter(table, filter, callback) { __log_function('get_ByFilter');

    if (filter.length == 0) {
	callback(null);
	return false;
    }

    var sql_where = '';
    for (var field in filter) {
	sql_where = sql_where + " AND `" + table + "`.`" + field + "` = '" + eval('filter.' + field) + "' ";
    }

    db.transaction(
	function (transaction) {
	    transaction.executeSql("\
		SELECT		`" + table + "`.*\
		FROM		`" + table + "`\
		WHERE		1 = 1 " + sql_where + "\
		;", [], function(transaction, resultSet) {

		callback(resultSet);

	    }, errorHandler);
	}
	);

}

// Generic save function
var save_ByPK_queue = [];
var save_ByPK_temp = [];

function save_ByPK(table, id, fields) {

    saving['main']++;

    sql_fields = '';
    sql_values = '';
    sql_update = '';

    for (var field_name in fields) {

	if (null == eval('fields.' + field_name)) {
	    eval('fields.' + field_name + ' = \'\'');
	}

	sql_fields = sql_fields + "`" + field_name + "`,";
	sql_values = sql_values + "'" + addslashes(eval('fields.' + field_name)) + "',";

	if (field_name != 'id') {
	    sql_update = sql_update + "`" + field_name + "` = '" + addslashes(eval('fields.' + field_name)) + "',";
	}

    }

    sql_fields = sql_fields.substring(0, sql_fields.length - 1);
    sql_values = sql_values.substring(0, sql_values.length - 1);
    sql_update = sql_update.substring(0, sql_update.length - 1);

    save_ByPK_queue.push([table, id, sql_fields, sql_values, sql_update]);

}

var callback_save_bypk;
function save_ByPK_commit(callback) { __log_function('save_ByPK_commit');

    callback_save_bypk = callback || function() {};

    db.transaction(
	function (transaction) {

	    if (settings['first_run'] == 0 && quickImport_first_run != '1') {

		if (save_ByPK_queue.length == 0) {

		    callback_save_bypk();

		} else {

		    for (var i in save_ByPK_queue) {

			var table = save_ByPK_queue[i][0];
			var id = save_ByPK_queue[i][1];
			var sql_fields = save_ByPK_queue[i][2];
			var sql_values = save_ByPK_queue[i][3];
			var sql_update = save_ByPK_queue[i][4];

			save_ByPK_temp.push(save_ByPK_queue[i]);

			// Update if exists, else insert
			transaction.executeSql("\
			    UPDATE	    `" + table + "`\
			    SET	    " + sql_update + "\
			    WHERE `id` = \'" + id + "\'\
			", [], function(transaction, resultSet) {

			    var tmp = save_ByPK_temp.shift();

			    var table = tmp[0];
			    var id = tmp[1];
			    var sql_fields = tmp[2];
			    var sql_values = tmp[3];
			    var sql_update = tmp[4];

			    if (resultSet.rowsAffected == 0) {

				transaction.executeSql("\
				    INSERT INTO	`" + table + "`\
				    (" + sql_fields + ")\
				    VALUES\
				    (" + sql_values + ")\
				", [], function(transaction, resultSet) {

				    saving['main']--;

				    if (saving['main'] == 0) {
					callback_save_bypk();
				    }

				}, errorHandler);

			    } else {

				saving['main']--;

				if (saving['main'] == 0) {
				    callback_save_bypk();
				}

			    }

			}, errorHandler);

		    }

		}

	    } else {

		if (save_ByPK_queue.length == 0) {

		    callback_save_bypk();

		} else {

		    for (var i in save_ByPK_queue) {

			var table = save_ByPK_queue[i][0];
			var id = save_ByPK_queue[i][1];
			var sql_fields = save_ByPK_queue[i][2];
			var sql_values = save_ByPK_queue[i][3];

			transaction.executeSql("\
			    INSERT INTO	`" + table + "`\
			    (" + sql_fields + ")\
			    VALUES\
			    (" + sql_values + ")\
			", [], function(transaction, resultSet) {

			    saving['main']--;

			    if (saving['main'] == 0) {
				callback_save_bypk();
			    }

			}, errorHandler);

		    }

		}

	    }

	    save_ByPK_queue = [];

	}

    );

}


var delete_ByPK_queue = [];

function delete_ByPK(table, id) {

    msg('delete + ' + id + ' from ' + table + '',1);
    saving['main']++;
    delete_ByPK_queue.push([table, id]);

}

function delete_ByPK_commit() { __log_function('delete_ByPK_commit');

    msg('delete!!',1);

    db.transaction(
	function (transaction) {

	    for (var i in delete_ByPK_queue) {

		var table = delete_ByPK_queue[i][0];
		var id = delete_ByPK_queue[i][1];

		transaction.executeSql("\
		    DELETE FROM `" + table + "` WHERE `id` = " + id + "\
		", [], function(transaction, resultSet) {
		    saving['main']--;
		}, errorHandler);

	    }

	    delete_ByPK_queue = [];

	});

}


function addslashes(str) {
    str = str + '';
    str=str.replace(/\'/g,'\'\'');
    //str=str.replace(/\"/g,'\\"');
    //str=str.replace(/\\/g,'\\\\');
    str=str.replace(/\0/g,'\\0');
    return str;
}
function stripslashes(str) {
    str=str.replace(/\\'/g,'\'');
    str=str.replace(/\\"/g,'"');
    //str=str.replace(/\\\\/g,'\\');
    str=str.replace(/\\0/g,'\0');
    return str;
}

function initTables(db) { __log_function('initTables');

    var old_user_id = settings['user_id'];
    var old_lang = settings['lang'];

    settings = defaults.slice(0);

    dropTables(db);
    createTables(db);

    save_Setting('user_id', old_user_id);
    save_Setting('lang', old_lang);

    save_Setting('db_version', db_version);
    save_Setting('first_run', '1');

    msg('First Run | Database Version ' + db_version , 1);

    for	(var id in settings) {
	// save_Setting(id, eval('settings[\'' + id + '\']'));
	}

}

var callback_import;
var callback_import_counter = 0;
var thisIsNow;
var d;
var refreshInSec;
var quickImport_first_run;

function quickImport(callback, first_run) { __log_function('quickImport');

    if(is_online()) {

	refreshInSec = 3600 * 24;
	refreshInSec = refreshInSec * 1000;

	callback_import = callback || function(){};

	d = new Date();
	thisIsNow = d.getTime();

	quickImport_first_run = first_run;
	quickImport_step1();

    } else {
	alert('no connection..');
	callback_import();
    }

}

function quickImport_step1() { __log_function('quickImport_step1');

    var diffComments = thisIsNow - settings['comments_updated'];

    if(settings['comments_updated'] == undefined || diffComments > refreshInSec || quickImport_first_run == '1') {

	msg('Ready for import Comments (diff:' + diffComments + ')', 1);
	msg('Call: calls/loadComments.php?from=' + settings['comments_updated'] + '', 1);

	$('#busy span').html('Loading...<br><small>1 / 4</small>');

 	callback_import_counter++;
	$.post(api_url + 'calls/loadComments.php?from=' + settings['comments_updated'], {}, function(data) {

	    if (!data.error) {

		var comments = data.comments;
		comments = {};
		for (var id in comments) {

		    comment_item = comments[id];
		    item_id = comment_item.id;

		    if(comment_item.v == "1") {

			save_ByPK('comments', item_id, {
			    id:          item_id,
			    spot_id:     comment_item.spot_id,
			    naam:        comment_item.naam,
			    rate:        comment_item.rate,
			    lang:        comment_item.lang,
			    comment:     comment_item.comment
			});

		    } else {
			delete_ByPK('comments', '' + item_id + '');
		    }
		}

		save_ByPK_commit( quickImport_step2 );
//		delete_ByPK_commit();
		save_Setting('comments_updated', '' + thisIsNow + '');
	    }

	}, 'json');

    } else {

	msg('No import for Comments (diff:' + diffComments + ')', 1);
	quickImport_step2();

    }

}

function quickImport_step2() { __log_function('quickImport_step2');

    var diffSpots = thisIsNow - settings['spots_updated'];

    if(settings['spots_updated'] == undefined || diffSpots > refreshInSec || quickImport_first_run == '1') {

	msg('Ready for import Spots (diff:' + diffSpots + ')', 1);
	msg('Call: calls/loadQuickSpots.php' + (settings['first_run'] == '1' ?  '?from=' + settings['spots_updated'] + '' : ''), 1);
	$('#busy span').html('Loading...<br><small>2 / 4</small>');

	callback_import_counter++;
	$.post(api_url + 'calls/loadQuickSpots.php' + (settings['first_run'] != '1' ?  '?from=' + settings['spots_updated'] + '' : ''), {}, function(data) {

	    if (!data.error) {

		var spots = data.spots;
		var regio_types = [];

		for (var id in spots) {

		    spot_item = spots[id];
		    item_id = spot_item.id;

//		    msg('importing spot ' + spot_item.naam + '...', 1);

		    if(spot_item.v == 1) {
			save_ByPK('spots', item_id, {
			    id:		item_id,
                            photo:       spot_item.photo,
			    regio_id:       spot_item.regio_id,
			    type_id:        spot_item.type_id,
			    lon:            spot_item.lon,
			    lat:            spot_item.lat,
			    naam:           spot_item.naam,
			    naam_NL:           spot_item.naam_NL,
			    naam_EN:           spot_item.naam_EN,
			    naam_DE:           spot_item.naam_DE,
			    naam_ES:           spot_item.naam_ES,
			    adres_1:        spot_item.adres_1,
			    adres_2:        spot_item.adres_2,
			    plaats:         spot_item.plaats,
			    tel:            spot_item.tel,
			    email:          spot_item.email,
                            website:            spot_item.website,
                            facebook:           spot_item.facebook,
                            twitter:            spot_item.twitter,
			    NL:             spot_item.NL,
			    EN:             spot_item.EN,
			    DE:             spot_item.DE,
			    ES:             spot_item.ES,
			    open_NL:        spot_item.open_NL,
			    open_EN:        spot_item.open_EN,
			    open_DE:        spot_item.open_DE,
			    open_ES:        spot_item.open_ES,
			    price_NL:       spot_item.price_NL,
			    price_EN:       spot_item.price_EN,
			    price_DE:       spot_item.price_DE,
			    price_ES:       spot_item.price_ES,
			    showOnHome:	spot_item.showOnHome,
			    numFotos:	spot_item.numFotos,
			    rating:         spot_item.rating || 0
			});
			regio_types.push({
			    regio_id: '' + spot_item.regio_id + '',
			    type_id: '' + spot_item.type_id + ''
			    });
		    } else {
			if(settings['first_run'] != '1') removeSpot('' + spot_item + '');
		    }
		    msg('imported spot ' + spot_item.naam + '', 1);
		}

		save_ByPK_commit( quickImport_step3 );

		regio_types = unique(regio_types);

		db.transaction(
		    function (transaction) {

			transaction.executeSql('\
					    	DELETE FROM `regio_types` WHERE 1\
					    	;', [], function(transaction, resultSet) {

			    sql_values = [];
			    msg('types toevoegen aan regios_type ', 1);

			    for (var id in regio_types) {

				regio_type = regio_types[id];


				//                                                            msg('regio ' + regio_type.regio_id + ' + ' + regio_type.type_id + '',1);

				transaction.executeSql("\
								INSERT INTO	`regio_types`\
								(`regio_id`, `type_id`)\
								VALUES\
								(" + regio_type.regio_id + ", " + regio_type.type_id + ")\
							    ", [], function(transaction, resultSet) {}, errorHandler);

			    }

			}, errorHandler);
		    });


		save_Setting('spots_updated', '' + thisIsNow + '');
	    }

	}, 'json');

    } else {

	msg('No Import for Spots! (diff = ' + diffSpots + ')', 1);
	quickImport_step3();

    }

}

function quickImport_step3() { __log_function('quickImport_step3a');

    if(quickImport_first_run == '1' || 1 == 1) {

	msg('Call: calls/loadGebieden.php', 1);
	$('#busy span').html('Loading...<br>3 / 4');

	callback_import_counter++;
	$.post(api_url + 'calls/loadGebieden.php', {}, function(data) {

	    if (!data.error) {

		var gebieden = data.gebieden;
		for (var id in gebieden) {
		    gebieden_item = gebieden[id];

		    msg(gebieden_item.NL);

		    item_id = gebieden_item.id;
		    save_ByPK('gebieden', item_id, {
			id:		    item_id,
			NL:		    gebieden_item.NL,
			EN:		    gebieden_item.EN,
			DE:		    gebieden_item.DE,
			ES:		    gebieden_item.ES,
                        ORDER:              gebieden_item.ORDER
		    });

		}
		save_ByPK_commit( quickImport_step4 );
	    }

	}, 'json');

    } else {

	quickImport_step4();

    }

}

function quickImport_step4() { __log_function('quickImport_step4');

    var diffTypes = thisIsNow - settings['types_updated'];

    if(settings['types_updated'] == undefined || diffTypes > refreshInSec || quickImport_first_run == '1') {

	msg('Call: calls/loadTypes.php', 1);
	$('#busy span').html('Loading...<br>4 / 4');

	callback_import_counter++;
	$.post(api_url + 'calls/loadTypes.php', {}, function(data) {

	    if (!data.error) {

		var regio_types = [];

		msg('Call: calls/loadTypes.php', 1);

		var types = data.types;
		for (var id in types) {
		    type_item = types[id];
		    item_id = type_item.id;
		    save_ByPK('types', item_id, {
			id:		    item_id,
			icon:	    type_item.icon || '',
			NL:		    type_item.NL,
			EN:		    type_item.EN,
			DE:		    type_item.DE,
			ES:		    type_item.ES,
			order:	    type_item.order
		    });

		}
		save_ByPK_commit( callback_import );
		save_Setting('types_updated', '' + thisIsNow + '');
	    }

	}, 'json');

    } else {

	msg('No Import for Types! (diff = ' + diffTypes + ')', 1);
	callback_import();

    }

}



var db_version = 6;

var timezone = jstz.determine_timezone();
// timezone.offset();
// timezone.name();
// timezone.dst();

var autoSlide;

///////////////

function rebindClicks(){
    var userAgent = navigator.userAgent.toLowerCase();
    var isIphone = (userAgent.indexOf('iphone') != -1) ? true : false;

    if (isIphone) {
	// For each event with an inline onclick
	$('#jqt div >').each(function() {
	    var onclick = $(this).attr('onclick');
	    $(this).removeAttr('onclick'); // Remove the onclick attribute
	    $(this).bind("click", preventClickEvent); // See to it that clicks never happen
	    $(this).bind('tap', onclick); // Point taps to the onclick
	});
    }
}

function preventClickEvent(event)  {
    event.preventDefault();
}
/////////////



// FAVOURITES
/////////////////////

function getFav() {

    div = "fav";
    if($('#'+ div).length == 0){
	$('#jqt').append('<div id="'+ div +'"></div>');
	$('#' + div).append('<div class="toolbar"><a href="#" class="back"><img src="./img/back.png" style="width:14px;margin: 6px 0 0 -2px;"></a><h1></h1></div>');
	$('#' + div).append('<div class="scroll"><div class="loading"></div></div>');
	$('#' + div + ' div.scroll').append('<ul class="rounded results spots" id="ul_favs"></ul>');
    }

    $('#' + div + ' div.toolbar h1').html('' + lang['favorieten'][settings['lang']] + '').show();
    jQT.goTo('#'+ div + '','slideleft');

}

////////////////////////
/// EINDE FAVOURITES


// COMMENTS
/////////////////////

function stars(id,rate) {
    if($('#jqt div.current span.stars.' + id + ' img').length < 5) {
	for(x=1; x <= 5; x++) {
	    if(x <= rate) $('#jqt div.current span.stars.' + id).append('<img src="./img/starFull.png" style="width:11px;float:left;">');
	    else $('#jqt div.current span.stars.' + id).append('<img src="./img/starGray.png" style="width:11px;float:left;">');
	}
    }
    $('#jqt div.current span.stars.'+ id).show();
}

////////////////////////
/// EINDE COMMENTS



/// PHOTOS
///////////////////////
function photos(spot_id) {

    div = "PHOTO_" + spot_id;
    if($('#'+ div).length == 0){
	$('#jqt').append('<div id="'+ div +'" class="hasPhotos slider_' + spot_id + '"></div>');
	$('#' + div).append('<div class="toolbar"><a href="#" class="back">' + lang['sluiten'][settings['lang']] + '</a><h1></h1></div>');
	$('#' + div).append('<div class="scroll"><div class="loading"></div></div>');
    }

    $('#' + div + ' div.toolbar h1').html('' + lang['fotos'][settings['lang']] + '').show();
    jQT.goTo('#'+ div + '','slideup');

    // $('#' + div + ' div.loading').show();

    if($('#' + div + ' div.scroll div.swipe').length == 0)  {
	$('#' + div + ' div.scroll').append('<div id="slider_' + spot_id + '" class="swipe">\
				<div class="container">\
				</div>\
			    </div>');
    }


    if(is_online()) {

	if(undefined == photos[spot_id]) {

	    photos[spot_id] = [];

	    $.post(api_url + 'calls/loadPhotos.php?id=' + spot_id + '', {}, function(data) {

		if (!data.error) {

		    var fotos = data.fotos;
		    for (var id in fotos) {

			foto = fotos[id];
			item_id = foto.id;

			$('#jqt #slider_' + spot_id + ' div.container').append('<div style="display: none;height: ' + (parseInt(window.innerHeight)-70) + 'px"><span>' + foto.tekst + '</span><div class="slider_photo loading" id="photo_'+ foto.id +'" style=""></div></div>');
			photos[spot_id][foto.id] = foto;

		    }

		    for(var i in photos[spot_id]) {
			$('#photo_'+ i + '').attr('style', 'background-image: url(data:image/jpeg;base64,' + photos[spot_id][i].foto + ');').removeClass('loading');
		    }

		    $('#jqt #slider_' + spot_id + ' div.container').first('div').attr('style','display: block;');
		    slider = new Swipe(document.getElementById('slider_' + spot_id + ''));
		}
	    }, 'json');
	}
    }

    // window.setTimeout(function() { $('#' + div + ' div.loading').hide(); } , 2000);
    preventDefault(div);
}
//////////////////////
///



// In DE BUURT
///////////////////

function nearby(spot_id) {

    spot_id = spot_id || false;

    if (spot_id) {
	div = "NB_"+ settings['lang'] + "_" + spot_id;
    } else {
	div = "NB_"+ settings['lang'];
    }

    save_Setting('mapId', div);

    if($('#'+ div).length == 0) {
	$('#jqt').append('<div id="'+ div +'" class="NB"></div>');
	$('#' + div).append('<div class="toolbar"><a href="#" class="back"><img src="./img/back.png" style="width:14px;margin: 6px 0 0 -2px;"></a><h1 style="display: block;" class="allways">' + lang['inDeBuurt'][settings['lang']] + '</h1></div>');
	$('#' + div).append('<ul class="individual segmented"><li><a href="#" onclick="showList();" class="list selected">'+ lang['toonInLijst'][settings['lang']] +'</a></li><li><a href="#" onclick="showMap();" class="map">'+ lang['toonOpKaart'][settings['lang']] +'</a></li></ul>');
	$('#' + div).append('<div class="scroll"><div class="loading"></div><div class="map" id="' + div + '_map"></div><div id="' + div + '_directions" class="directions"></div></div>');
	$('#' + div + ' div.scroll').append('<ul class="rounded spots"><li class="loading">'+ lang['bezigMetLaden'][settings['lang']] +'</li></ul>');
    }

    jQT.goTo('#'+ div + '','slideleft');

    $('#'+ div +' div.loading').show();
    $('#'+ div +' ul.spots li.results').remove();

    if (spot_id) {

	select_spot(false, function(spot) {

	    update_nb_spots(function() {
		//alert('update mislukt... ')
	    }, function(nb_spot_items) {
		//alert('database update gelukt');
	    }, spot);

	});


    } else {

	update_nb_spots(function() {
	    //alert('update mislukt... ')
	}, function(nb_spot_items) {
	    //alert('database update gelukt');
	});

    }

    preventDefault(div);
}


//////////////////
// EINDE IN DE BUURT


















/// HOME
////////////////////////////////

function buildHome() {

    if($('#home div').length == 0){

        $('#home').append('\
                <div class="scroll">\
                    <div id="startup">\
                        <div id="logo"></div>\
                        <h1>Welcome to</h1>\
                        <h2>Tenerife<span>!</span></h2>\
                    </div>\
                    <div id="startupImg" style="z-Index:1;">\
                        <div>\
                            <img src="./img/startup/5@2x.jpg">\
                            <img src="./img/startup/2@2x.jpg">\
                            <img src="./img/startup/3@2x.jpg">\
                            <img src="./img/startup/4@2x.jpg">\
                            <img src="./img/startup/1@2x.jpg">\
                        </div>\
                    </div>\
                 </div>\
                ');

        $('#home #startup').append('<ul class="" id="lang" style="z-Index:999;"></ul>');

        // talen
        $('#home #startup #lang').append('<li onclick="setLang(\'ES\', \'1\');"><a href="#"><small class="flag lang_ES">&nbsp;</small>Espa&ntilde;ol</a></li>');
        $('#home #startup #lang').append('<li onclick="setLang(\'EN\', \'1\');"><a href="#"><small class="flag lang_EN">&nbsp;</small>English</a></li>');
        $('#home #startup #lang').append('<li onclick="setLang(\'DE\', \'1\');"><a href="#"><small class="flag lang_DE">&nbsp;</small>Deutsch</a></li>');
        $('#home #startup #lang').append('<li onclick="setLang(\'NL\', \'1\');"><a href="#"><small class="flag lang_NL">&nbsp;</small>Nederlands</a></li>');
        $('#home #startup #lang').append('<li onclick="setLang(\'RU\', \'1\');"><a href="#"><small class="flag lang_RU">&nbsp;</small>Russian</a></li>');

	var add_to_homescreeen  = 'Klik op <img src=\'./img/setHome.png\'> en vervolgens op \'<span>Zet in beginscherm</span>\' om deze app op uw iPhone te installeren of download \'<span>via iTunes</span>\'';

	if(!is_native && navigator.standalone != true) {
	    $('#home #startup').append('<div id="add2Home">' + add_to_homescreeen + '</div>');
	}
	else {
	    $('#home #lang').addClass('standalone');
	}

	if($('#startupImg div img').length > 1) {
            slider = new Swipe(document.getElementById('startupImg'));
            var Timer = 5; // seconden
            var interVal = Timer * 1000;
            function nextSlide() {
                slider.next();
                clearTimeout(autoSlide);
                autoSlide = setTimeout(function() {nextSlide();}, interVal);
            }
            $(function() {
                autoSlide = setTimeout(function() {nextSlide();}, interVal);
            });
	}
	preventDefault('home');

    }
}


////////////////////////////////
/// EINDE HOME













// REGIOS
////////////////

function getRegios(){

    div = "regios";

    if($('#'+ div).length == 0){
	$('#jqt').append('<div id="'+ div +'"></div>');
	$('#' + div).append('<div class="toolbar"><a href="#lang" class="button langSelector flip leftButton" style="background:url(./img/flag_' + settings['lang'] + '.gif);width:20px;background-size: 27px, auto;background-position: center, center; background-repeat: no-repeat;"></a><a href="#contactInfo" class="button contactInfo flip"></a></div>');
	$('#' + div).append('<div class="scroll"><div class="loading"></div></div>');
	$('#' + div + ' div.scroll').append('<ul class="rounded" id="ul_regios"></ul>');
	$('#' + div + ' div.scroll').prepend(' <ul class="rounded" id="ul_menu"></ul>');
	if(is_online() == true && $('#' + div + ' ul.weather').length == 0)  $('#' + div + ' div.scroll').prepend('<ul class="rounded weather"><li class="loading"><img src="./img/loader.gif"></li></ul>');
    }

    for(i in lang['kiesRegio']) {
	$('#' + div + ' div.toolbar').append('<h1 class="language '+ i +'">'+ lang['kiesRegio'][i] +'</h1>');
    }

    $('.language').hide();
    $('.'+ settings['lang']).show();

    jQT.goTo('#'+ div + '','slideleft');

    var time = new Date();
    var curTime = time.getTime();

    if(is_online() == true &&  $('#' + div + ' ul.weather').length > 0) {

	$.getJSON(api_url + 'calls/weather.php?w=' + default_WOEID, function(data) {

	    regex_time = /([0-9]{1,2}):([0-9]{1,2}) (am|pm)/;
	    sunrise_parsed = regex_time.exec(data.astronomy.sunrise);
	    sunset_parsed = regex_time.exec(data.astronomy.sunset);

	    sunset = { h: (sunset_parsed[1] * 1) + (sunset_parsed[3] == 'pm' ? 12 : 0), m: sunset_parsed[2] };
	    sunrise = { h: (sunrise_parsed[1] * 1) + (sunrise_parsed[3] == 'pm' ? 12 : 0), m: sunrise_parsed[2] };

	    var date_n = new Date();date_n.setHours(sunset.h + parseInt(timezone.offset()), sunset.m, 0, 0);
	    sunset = date_n.getTime();

	    var date_d = new Date();date_d.setHours(sunrise.h + parseInt(timezone.offset()), sunrise.m, 0, 0);
	    sunrise = date_d.getTime();

	    day_night = (curTime > sunrise && curTime < sunset ? "d" : "n");

	    $('#' + div + ' ul.weather li').remove();

	    var bft_speed  = 0;
	    for(var i in bft) {
		if(data.wind.speed  > bft[i]) bft_speed = i;
	    }

	    weather_marker['icon'] = weatherImg + data.condition.code + day_night + '.png';

	    $('#' + div + ' ul.weather').append('\
                            <li class="short_' + default_WOEID +'" id="average">\
                                    <div class="wind"><center><p><img src="./img/wind.png" class="windindicator">' + bft_speed + ' (' + data.wind.speed + ' ' + data.units.speed + ')</p></center></div>\
                                    <img src="' + weatherImg + data.condition.code + day_night + '.png" class="icon">\
                                    <h1>'+ data.condition.temp +'°<font style="font-size:28px;">' + data.units.temperature + '</font></h1>\
                                    <h2><span>' + lang['vandaag'][settings['lang']] + ':</span> Min: ' + data.forecast[0].low + '°' + data.units.temperature + ', max: ' + data.forecast[0].high + '°' + data.units.temperature + '</h2>\
                                    <h4><span>' + lang['morgen'][settings['lang']] + ':</span> Min: ' + data.forecast[1].high + '°' + data.units.temperature + ', Max: ' + data.forecast[1].high + '°' + data.units.temperature + '</h4>\
                            </li>\
                        ');

//	    var deg = eval('windDir.' + data.wind.direction) + 'deg';
	    var deg = 180 + (1*data.wind.direction);

	    $('#' + div + ' img.windindicator').css({
		'-webkit-transform' : 'rotate('+ deg +'deg)',
		'-moz-transform' :  'rotate('+ deg +'deg)',
		'-o-transform' : 'rotate('+ deg +'deg)'
	    });

	});
    }


    if (is_online() == true && regios_are_updated == false) {
	$('#'+ div + ' div.loading').show();
	update_regios(function() {
	    // alert('update mislukt... ')
	} ,function(regio_items) {
	    regios = regio_items;
	});
    }
    else {
	select_regios(false,function(regio_items){
	    regios = regio_items;
	});
	// update_comments(function(){ alert('comments are in!'); });
    }

    if(settings['geo'] != 'false' && $('#' + div + ' div.scroll #ul_menu li.indebuurt').length == 0 && is_online() == true) {
	$('#' + div + ' div.scroll #ul_menu').prepend('<li class="arrow indebuurt online_only"><a href="#" onclick="nearby();" id="nearbyBtn"><small class="nearby"></small>' + lang['inDeBuurt'][settings['lang']] + '</a></li>');
    }
    if($('#' + div + ' div.scroll #ul_menu li.toeristisch').length == 0) {
	$('#' + div + ' div.scroll #ul_menu').prepend('<li class="arrow toeristisch"><a href="#" onclick="toeristisch();" id="toeristischBtn"><small class="toeristisch"></small>' + lang['toeristisch'][settings['lang']] + '</a></li>');
    }

}
preventDefault('regios');


////////////////
// EINDE REGIOS



// REGIO
/////////////////

function getRegio(id, naam) {

    save_Setting('regio', id);
    div = "R_"+ settings['regio'] +"_"+ settings['lang'];
    save_Setting('mapId', div);



    if($('#'+ div).length == 0){
	$('#jqt').append('<div id="'+ div +'" class="hasMap"></div>');
	$('#' + div).append('<div class="toolbar"><a href="#" class="back"><img src="./img/back.png" style="width:14px;margin: 6px 0 0 -2px;"></a><h1 class="allways"></h1></div>');
	$('#' + div).append('<ul class="individual segmented"><li class="online_only"><a href="#" onclick="showList();" class="list selected">'+ lang['toonInLijst'][settings['lang']] +'</a></li><li class="online_only"><a href="#" onclick="showMap();" class="map">'+ lang['toonOpKaart'][settings['lang']] +'</a></li></ul>');
	$('#' + div).append('<div class="scroll"><div class="loading"></div><div class="map" id="' + div + '_map"></div><div id="' + div + '_directions" class="directions"></div></div>');
	$('#' + div + ' div.scroll').append('<ul class="rounded results types"><li class="loading">'+ lang['bezigMetLaden'][settings['lang']] +'</li></ul>');

	if(is_online() == true && $('#' + div + ' ul.weather').length == 0)  {
	    $('#' + div + ' div.scroll').prepend('<ul class="rounded weather"><li class="placeholder"></li></ul>');
	    $('#' + div + ' div.scroll ul.weather li.placeholder').html('' + $('#average').html() + '');
	}
    }


    jQT.goTo('#'+ div + '','slideleft');


    //                if(regios[settings['regio']][settings['lang']].length > 0 && $('#'+ div + ' ul.regioInfo_' + settings['regio'] + '').length == 0) $('#' + div + ' div.scroll').prepend('<ul class="rounded regioInfo_' + settings['regio'] + '"><li><a href="#" onclick="regioInfo(\'' + settings['regio'] + '\');"><small class="info"></small>'+ regios[settings['regio']]['naam'] +'</a></li></ul>');
    //                if($('#'+ div + ' ul.regioInfo_' + settings['regio'] + ' li.informatie').length > 0 ) $('#'+ div + ' ul.regioInfo_' + settings['regio'] + ' li.informatie').remove();

    if(naam) $('#'+ div +' div.toolbar h1').html(''+ naam + '').show();

    // Weather
    /////////////

    var weather_last_update = settings['weather_' + regios[settings['regio']]['WOEID'] + ''];
    var time = new Date();
    var curTime = time.getTime();

    msg('diff = ' + (curTime - weather_last_update) / 1000 + '!', 1)

    if(is_online() == true &&  $('#' + div + ' ul.weather').length > 0 && (curTime - weather_last_update) > 60000 || weather_last_update == undefined) {

	msg('reading weather',1);

	$.getJSON(api_url + 'calls/weather.php?w=' + regios[settings['regio']]['WOEID'], function(data) {

	    regex_time = /([0-9]{1,2}):([0-9]{1,2}) (am|pm)/;
	    sunrise_parsed = regex_time.exec(data.astronomy.sunrise);
	    sunset_parsed = regex_time.exec(data.astronomy.sunset);

	    sunset = { h: (sunset_parsed[1] * 1) + (sunset_parsed[3] == 'pm' ? 12 : 0), m: sunset_parsed[2] };
	    sunrise = { h: (sunrise_parsed[1] * 1) + (sunrise_parsed[3] == 'pm' ? 12 : 0), m: sunrise_parsed[2] };

	    var date_n = new Date();date_n.setHours(sunset.h + parseInt(timezone.offset()), sunset.m, 0, 0);
	    sunset = date_n.getTime();

	    var date_d = new Date();date_d.setHours(sunrise.h + parseInt(timezone.offset()), sunrise.m, 0, 0);
	    sunrise = date_d.getTime();

	    day_night = (curTime > sunrise && curTime < sunset ? "d" : "n");

	    var bft_speed  = 0;
	    for(var i in bft) {
		if(data.wind.speed  > bft[i]) bft_speed = i;
	    }


	    weather_marker['icon'] = weatherImg + data.condition.code + day_night + '.png';

	    $('#' + div + ' ul.weather li').remove();
	    $('#' + div + ' ul.weather').append('\
                                    <li class="short_' + regios[settings['regio']]['WOEID'] +'">\
                                        <div class="wind"><center><p><img src="./img/wind.png" class="windindicator">' + bft_speed + ' (' + data.wind.speed + ' ' + data.units.speed + ')</p></center></div>\
                                        <img src="' + weatherImg + data.condition.code + day_night + '.png" class="icon">\
                                        <h1>'+ data.condition.temp +'°<font style="font-size:28px;">' + data.units.temperature + '</font></h1>\
                                        <h2><span>' + lang['vandaag'][settings['lang']] + ':</span> Min: ' + data.forecast[0].low + '°' + data.units.temperature + ', max: ' + data.forecast[0].high + '°' + data.units.temperature + '</h2>\
                                        <h4><span>' + lang['morgen'][settings['lang']] + ':</span> Min: ' + data.forecast[1].low + '°' + data.units.temperature + ', Max: ' + data.forecast[1].high + '°' + data.units.temperature + '</h4>\
                                    </li>');

	    var deg = 180 + (1*data.wind.direction);

	    $('#' + div + ' img.windindicator').css({
		'-webkit-transform' : 'rotate('+ deg +'deg)',
		'-moz-transform' :  'rotate('+ deg +'deg)',
		'-o-transform' : 'rotate('+ deg +'deg)'
	    });

	    save_Setting('weather_' + regios[settings['regio']]['WOEID'] + '', curTime);
	});
    }
    else {
	msg('no need reading weather',1);
    }
    // Einde Weather
    //////////////////

    //		var time = new Date();
    //		var curTime = time.getTime();
    //		var difTypes_inHours = parseInt((((curTime - settings['types_updated']) / 1000) / 3600));
    //
    //		msg('lastime update: ' +  difTypes_inHours + ' uur geleden!',1);
    //               && difTypes_inHours >= HoursToRefresh

    if (is_online() == true && undefined == types_are_updated[settings['regio']]) {
	$('#'+ div +' div.loading').show();
	update_types(function() {} ,function(type_data) {
	    types = type_data;
	});
    }
    else  {
	select_types(false,function(type_data){
	    types = type_data;
	});
    }

    preventDefault(div);

}

/////////////////
// EINDE REGIO




//// TYPE
///////////////////////

function getType(id, naam, toeristisch) {

    msg('getType(' + id + ', ' + naam + ', ' + toeristisch + ')');

    if(toeristisch == "1") save_Setting('toeristisch', '1');
    else save_Setting('toeristisch', '0');

    save_Setting('type', id);

    var div = "T"+ (toeristisch == "1" ? "R" : "") + "_"+ settings['regio'] +"_"+ settings['type'] +"_"+ settings['lang'];
    save_Setting('mapId', div);

    if($('#'+ div).length == 0) {
	$('#jqt').append('<div id="'+ div +'" class="hasMap"></div>');
	$('#' + div).append('<div class="toolbar"><a href="#" class="back"><img src="./img/back.png" style="width:14px;margin: 6px 0 0 -2px;"></a><h1 class="allways"></h1></div>');
	$('#' + div).append('<ul class="individual segmented"><li class="online_only"><a href="#" onclick="showList();" class="list selected">'+ lang['toonInLijst'][settings['lang']] +'</a></li><li class="online_only"><a href="#" onclick="showMap();" class="map">'+ lang['toonOpKaart'][settings['lang']] +'</a></li></ul>');
	$('#' + div).append('<div class="scroll"><div class="loading"></div><div class="map" id="' + div + '_map"></div><div id="' + div + '_directions" class="directions"></div></div>');
	$('#' + div + ' div.scroll').append('<ul class="rounded results spots"><li class="loading">'+ lang['bezigMetLaden'][settings['lang']] +'</li></ul>');
    }

    if(naam) $('#'+ div +' div.toolbar h1').html(''+ naam + '').show();

    jQT.goTo('#'+ div + '','slideleft');

    //		var time = new Date();
    //		var curTime = time.getTime();
    //		var difSpots_inHours = parseInt((((curTime - settings['spots_updated']) / 1000) / 3600));
    //
    //		msg('lastime update: ' +  difSpots_inHours + ' uur geleden!',1);
    //                && difSpots_inHours >= HoursToRefresh

    if (is_online() == true ) {
	$('#'+ div +' div.loading').show();
	update_spots(function() {
	    //alert('update mislukt... ')
	} ,function(spot_items) {
	    //alert('database update gelukt');
	});
    }
    else {
	select_spots(false,function(){
	});
    }

    preventDefault(div);

}

///////////////////////
///  EINDE TYPE



/// SPOT
//////////////////////////////

function getSpot(id,naam) {

    save_Setting('spot', id);

    var div = "S_"+ settings['spot'] + "_"+ settings['lang'];

    save_Setting('mapId', div);

    if($('#'+ div).length == 0) {
	$('#jqt').append('<div id="'+ div +'" class="spot hasMap"></div>');
	$('#' + div).append('<div class="toolbar"><a href="#" class="back"><img src="./img/back.png" style="width:14px;margin: 6px 0 0 -2px;"></a><h1 class="allways"></h1></div>');
	$('#' + div + ' div.toolbar').append('<a href="#" class="button buttonRight favIcon removeFav" style="display: none;" onclick="removeFav(\''+ settings['spot'] +'\', \'' + settings['user_id'] + '\');"><img src="./img/favouriteWhite.png" style="width:16px;margin-top: 7px;"></a>');
	$('#' + div + ' div.toolbar').append('<a href="#" class="button buttonRight favIcon addFav" style="display: none;" onclick="addFav(\''+ settings['spot'] +'\', \'' + settings['user_id'] + '\');"><img src="./img/favouriteOffWhite.png" style="width:16px;margin-top: 7px;"></a>');
	$('#' + div).append('<div class="scroll"><div class="loading"></div><div class="map" id="' + div + '_map"></div></div><div id="' + div + '_directions" class="directions in"  style="margin-top: 45px !important;"></div>');
	$('#' + div + ' div.scroll').append('<ul class="rounded results spot"></ul><ul class="rounded extra"></ul><ul class="rounded extra2 online_only"></ul>');


	$('#' + div).append('<div class="blackOut"></div><div class="popUp"><a href="#" onclick="popUp(\'' + div + '\')" class="grayButton">' + lang['sluiten'][settings['lang']] + '</a><br/></div>');

	// Map panel
//	$('#jqt').append('<div id="'+ div +'_map" class="spot"></div>');
//	$('#' +  div + '_map').append('<div class="map"></div>'); // mappanel
//	$('#' + div + '_map').append('<div class="toolbar"><a href="#" class="back"><img src="./img/back.png" style="width:14px;margin: 6px 0 0 -2px;"></a><h1 class="allways"></h1></div>');
//	$('#' + div + '_map').append('<div class="scroll"><div id="' + div + '_directions" class="directions"></div><div id="' + div + '_map" class="map"></div></div>');
	// ----
    }

    if(naam) $('#'+ div +' div.toolbar h1').html(''+ naam + '').show();
   // if(naam) $('#'+ div +'_map div.toolbar h1').html(''+ naam + '').show();

    jQT.goTo('#'+ div + '','slideleft');

    //		var time = new Date();
    //		var curTime = time.getTime();
    //		var difSpots_inHours = parseInt((((curTime - settings['spots_updated']) / 1000) / 3600));
    //
    //		msg('lastime update: ' +  difSpots_inHours + ' uur geleden!',1);
    //                && difSpots_inHours >= HoursToRefresh

    if (is_online() == true && undefined == spot_is_updated[id]) {
	$('#'+ div +' div.loading').show();
	update_spot(function() {} ,function(spot_items) {});
    }
    else {
	select_spot(false,function(){});
    }
    preventDefault(div);

}

//////////////////////////////
/// EINDE SPOT



// TOERISTISCH
///////////////////////////////

function toeristisch(regio) {

    var div = "TR_"+ settings['lang'];
    save_Setting('mapId', div);


    if($('#'+ div).length == 0) {
	$('#jqt').append('<div id="'+ div +'"></div>');
	$('#' + div).append('<div class="toolbar"><a href="#" class="back"><img src="./img/back.png" style="width:14px;margin: 6px 0 0 -2px;"></a><h1 class="allways" style="display: block;">' + lang['toeristisch'][settings['lang']] + '</h1></div>');
	$('#' + div).append('<ul class="individual segmented"><li><a href="#" onclick="showList();" class="list selected">'+ lang['toonInLijst'][settings['lang']] +'</a></li><li><a href="#" onclick="showMap();" class="map">'+ lang['toonOpKaart'][settings['lang']] +'</a></li></ul>');
	$('#' + div).append('<div class="scroll"><div class="loading"></div><div class="map" id="' + div + '_map"></div><div id="' + div + '_directions" class="directions"></div></div>');
	$('#' + div + ' div.scroll').append('<ul class="rounded results types"><li class="loading">'+ lang['bezigMetLaden'][settings['lang']] +'</li></ul>');
    }


    jQT.goTo('#'+ div + '','slideleft');

    if (is_online() == true && touristic_types_are_updated != true) {
	$('#'+ div +' div.loading').show();
	update_touristic_types(function() {} ,function(type_data) {
	    types = type_data;
	});
    }
    else  {
	select_touristic_types(false, function(type_data){
	    types = type_data;
	});
    }

    preventDefault(div);

}

/////////////////////////////////
// EINDE TOERISTISCH



function preventDefault(div){
    // return true;
    $('#jqt #home, #jqt div.toolbar, #jqt ul.segmented, #jqt .loading, #jqt div.directions, #busy, #jqt div.swipe').bind('touchmove', function(e) {
	e.preventDefault();
    });
}


    // Initialize DB settings
/////////////////////////

var init_ok = false, init_ready = false, is_native = false, handle_string = null;

String.prototype.repeat = function(n){n= n || 1;return Array(n+1).join(this);}

var jQT, clickEvent, uuid;

if (window.location.hostname == 'www.tenerifeapp.es') {
    var api_url = 'http://www.tenerifeapp.es/';
} else if (window.location.hostname == 'www.lanzaroteapp.es') {
    var api_url = 'http://www.lanzaroteapp.es/';
} else {
    var api_url = 'http://tenerifeapp.es/';
}
var weather_url = 'http://weather.yahooapis.com/forecastjson?u=c&w=';

var busy = Array();
busy['update_regios'] = false;
busy['update_touristic_types'] = false;
busy['update_types'] = false;
busy['update_spots'] = false;
busy['update_spot'] = false;
busy['update_nb_spots'] = false;


var saving = Array();

saving['main'] = 0;

saving['regios'] = 0;
saving['comments'] = 0;
saving['regio_types'] = 0;
saving['types'] = 0;
saving['spots'] = 0;
saving['spot'] = 0;
saving['nb_spots'] = 0;

var is_saving = 0;

var spot_is_updated = [];

function init() {

    ts_startup = Math.round(new Date().getTime() / 1000);

    if (typeof TouchEvent === 'undefined') {
	clickEvent = 'click';
    }
    else {
	clickEvent = 'tap';
    }

    if (is_native) {
	uuid = device.uuid;
	visitorType = 'mobile';
    }
    else {
	uuid = 'webapp';
    }

    createTables(db);

    /////


    jQT = new $.jQTouch({
	useTouchScroll: true,
	icon: 'img/icon6.png',
	icon4: 'img/icon6.png',
	addGlossToIcon: true,
	startupScreen: 'img/splash.png',
	statusBar: 'black-translucent',
	preloadImages:  [
	    'img/logo.png',
	    'img/setHome.png',
	    'img/arrowUpWhite.png',
	    'img/flag_NL.gif',
	    'img/flag_ES.gif',
	    'img/flag_EN.gif',
	    'img/flag_DE.gif',
	    'img/loading.gif',
	    'img/loader.gif',
	    'img/busy.gif',
	    'img/info.png',
	    'img/starFull.png',
	    'img/starGray.png',
	    'img/mailIcon.png',
	    'img/callIcon.png',
	    'img/addComment.png',
	    'img/addCommentWhite.png',
	    'img/comments.png',
	    'img/back.png',
	    'img/comments.png',
	    'img/favourite.png',
	    'img/favouriteWhite.png',
	    'img/favouriteOffWhite.png',
	    'img/marker.png',
	    'img/curPos.gif',
	    'img/wind.png',
	    'img/meIcon.png',
            'img/camfortLogo.png'
	]
    });



    load_Settings(function() {
	if (null == settings['db_version'] || settings['db_version'] != db_version) initTables(db);

	init_ready = true;

	$('.langSelector').html(settings['lang']);


	getGeo();

	$('#busy').show();

	quickImport(function(){

	    quickImport_first_run = '0';
	    console.log('Loading done');
	    $('#busy').hide();

	}, settings['first_run']);

	if (callback_import_counter == 0) {
	    $('#busy').hide();
	}

	if(settings['user_id'] == undefined) {
	    var time = new Date();
	    var userId = time.getTime();
	    save_Setting('user_id', userId);
	}

	// setLang(settings['lang'], '1');
	buildHome();

	if(settings['first_run'] == '1') save_Setting('first_run', '0');
	save_Setting('max_results', '12');

	if (is_online()) save_comments_to_server();

    });


    $('#jqt div').live('pageAnimationEnd', function(event, info){
	clearTimeout(autoSlide);
        if(is_online() == true) {
	    msg('online',1);
	}
	else {
	    msg('offline');
	}
    });

    $('#jqt div.hasPhotos').live('pageAnimationStart', function(event, info){
	if (info.direction == 'in') {
	}
    });


    $('#fav').live('pageAnimationStart', function(event, info){
	if (info.direction == 'in') {
	    select_favs();
	}
    });

    $('#jqt div.spot').live('pageAnimationEnd', function(event, info){
	if (info.direction == 'in') {
	    updateSpotComments(settings['spot']);
	}
    });

    $('#jqt div.NB').live('pageAnimationStart', function(event, info){
	if (info.direction == 'in') {
	    if(settings['geo'] != "false") getGeo();
	}
    });
    $('#regios').live('pageAnimationStart', function(event, info){
	if (info.direction == 'in') check_favs();
    });

    $('#jqt div.hasMap').live('pageAnimationStart', function(event, info){
	$('div.directions').hide();
    });
    $('div.directions').hide();


    $('#jqt div.directions ul.segmented li a').live('click', function(event, info){
	$('#busy span').html('Route berekenen');
	$('#busy').show();
	$('#jqt div.directions ul.segmented li a').removeClass('selected');
	$(this).addClass('selected');
    });

    $('div.starRating > span').live(clickEvent, function(event, info) {

	starEnabled = './img/starFull.png';
	starDisabled = './img/starEmpty.png';

	$el = $(this).closest('div.starRating');
	$spans = $el.find('span');
	input_id = $el.attr('data-input-id');

	$span = $(this);
	num = $spans.index($span);

	if ($('#' + input_id).val() == num + 1) {
	    $spans.find('img').attr('src', starDisabled);
	    $('#' + input_id).val(0);
	} else {

	    $spans.each(function(i, o) {
		if (i <= num) {
		    $(o).find('img').attr('src', starEnabled);
		} else {
		    $(o).find('img').attr('src', starDisabled);
		}
	    });

	    $('#' + input_id).val(num + 1);
	}

    });



    $('#jqt').bind('turn', function(e, data) {
	if(data.orientation == "landscape") {
	    $('#jqt div.hasPhotos div.toolbar, #jqt div.hasMap div.toolbar').hide();
	    $('#jqt div.slider_photo').addClass('landscape');
	    $('#jqt div.hasPhotos div.scroll').css( 'height' , window.innerHeight + 'px');
	}
	else {
	    $('#jqt div.hasPhotos div.toolbar, #jqt div.hasMap div.toolbar').show();
	    $('#jqt div.slider_photo').removeClass('landscape');
	    $('#jqt div.hasPhotos div.scroll').css( 'height' , window.innerHeight + 'px');
	}
    });




}

function onBodyLoad() {
    document.addEventListener("deviceready", onDeviceReady, false);
}




/* When this function is called, PhoneGap has been initialized and is ready to roll
    If you are supporting your own protocol, the var invokeString will contain any arguments to the app launch.
    see http://iphonedevelopertips.com/cocoa/launching-your-own-application-via-a-custom-url-scheme.html
    for more details -jm */

function onDeviceReady() {
    // do your thing!
    // navigator.notification.alert("PhoneGap is working")
    is_native = true;
    init_ok = true;
    init();

    $(function() {
	$('.native_only').show();
	$('.webapp_only').hide();
    });

    if (invokeString) {
	handleOpenURL(invokeString);
    }
}

$(function() {
    window.setTimeout(function() {
	if (!init_ok) init();
    }, 500);
});


var defaults = new Array(), settings = new Array();

defaults['first_run'] = 1;
defaults['lang'] = "NL";
defaults['max_results'] = 10;

var webservice_timeout = 4000;
var ts_startup = 0;

///////////////////////////
// Einde DB Settings


function postContactForm() {

    post_data = {
	first_name: $('#contact_first_name').val(),
	last_name: $('#contact_last_name').val(),
	email: $('#contact_email').val(),
	message: $('#contact_message').val()
    };

    $('#busy span').text('');
    $('#busy').show();

    $.post(api_url + 'calls/contactForm.php', post_data, function(result) {

	if (result == 1) {

	    $('#contact_first_name').val('');
	    $('#contact_last_name').val('');
	    $('#contact_email').val('');
	    $('#contact_message').val('');

	    alert(lang['thanksMessage'][settings['lang']]);

	} else {

	    alert(lang['errorSendingMessage'][settings['lang']]);

	}

	$('#busy').hide();

    });

}

var callback_load_settings, callback_get_settings;



function load_Settings(callback) {

    callback_load_settings = callback;

    db.transaction(
		function (transaction) {
		    transaction.executeSql("SELECT * FROM `settings` WHERE 1;", [],
			function (transaction, resultSet) {
	
			    if(resultSet.rows.length > 0) {
					for (var i=0; i < resultSet.rows.length; i++) {
					    defaults[resultSet.rows.item(i).id] = resultSet.rows.item(i).value;
					}
			    }
	
			    settings = defaults;
			    callback_load_settings(); 
			}
		    , errorHandler);
		}
    );
}

function save_Setting(id, value) {

    settings[id] = value;

    db.transaction(
		function (transaction) {
		    transaction.executeSql("\
			DELETE FROM `settings` WHERE `id` = '" + id + "'", [], nullDataHandler, errorHandler);
	
		    transaction.executeSql("\
			INSERT INTO`settings` (`id`, `value`) VALUES ('" + id + "', '" + value + "');", [], nullDataHandler, errorHandler);
		}
    );

    return true;
}


var jstz=function(){var b=function(a){a=-a.getTimezoneOffset();return a!==null?a:0},d=function(){return b(new Date(2010,0,1,0,0,0,0))},e=function(){return b(new Date(2010,5,1,0,0,0,0))},c=function(){var a=d(),b=e(),f=d()-e();if(f<0)return a+",1";else if(f>0)return b+",1,s";return a+",0"};return{determine_timezone:function(){var a=c();return new jstz.TimeZone(jstz.olson.timezones[a])},date_is_dst:function(a){var c=a.getMonth()>5?e():d(),a=b(a);return c-a!==0}}}();
jstz.TimeZone=function(){var b=null,d=null,e=null,c=function(a){e=a[0];b=a[1];d=a[2];if(typeof jstz.olson.ambiguity_list[b]!=="undefined")for(var a=jstz.olson.ambiguity_list[b],c=a.length,f=0,g=a[0];f<c;f+=1)if(g=a[f],jstz.date_is_dst(jstz.olson.dst_start_dates[g])){b=g;break}};c.prototype={constructor:jstz.TimeZone,name:function(){return b},dst:function(){return d},offset:function(){return e}};return c}();jstz.olson={};
jstz.olson.timezones=function(){return{"-720,0":["-12:00","Etc/GMT+12",!1],"-660,0":["-11:00","Pacific/Pago_Pago",!1],"-600,1":["-11:00","America/Adak",!0],"-660,1,s":["-11:00","Pacific/Apia",!0],"-600,0":["-10:00","Pacific/Honolulu",!1],"-570,0":["-09:30","Pacific/Marquesas",!1],"-540,0":["-09:00","Pacific/Gambier",!1],"-540,1":["-09:00","America/Anchorage",!0],"-480,1":["-08:00","America/Los_Angeles",!0],"-480,0":["-08:00","Pacific/Pitcairn",!1],"-420,0":["-07:00","America/Phoenix",!1],"-420,1":["-07:00",
"America/Denver",!0],"-360,0":["-06:00","America/Guatemala",!1],"-360,1":["-06:00","America/Chicago",!0],"-360,1,s":["-06:00","Pacific/Easter",!0],"-300,0":["-05:00","America/Bogota",!1],"-300,1":["-05:00","America/New_York",!0],"-270,0":["-04:30","America/Caracas",!1],"-240,1":["-04:00","America/Halifax",!0],"-240,0":["-04:00","America/Santo_Domingo",!1],"-240,1,s":["-04:00","America/Asuncion",!0],"-210,1":["-03:30","America/St_Johns",!0],"-180,1":["-03:00","America/Godthab",!0],"-180,0":["-03:00",
"America/Argentina/Buenos_Aires",!1],"-180,1,s":["-03:00","America/Montevideo",!0],"-120,0":["-02:00","America/Noronha",!1],"-120,1":["-02:00","Etc/GMT+2",!0],"-60,1":["-01:00","Atlantic/Azores",!0],"-60,0":["-01:00","Atlantic/Cape_Verde",!1],"0,0":["00:00","Etc/UTC",!1],"0,1":["00:00","Europe/London",!0],"60,1":["+01:00","Europe/Berlin",!0],"60,0":["+01:00","Africa/Lagos",!1],"60,1,s":["+01:00","Africa/Windhoek",!0],"120,1":["+02:00","Asia/Beirut",!0],"120,0":["+02:00","Africa/Johannesburg",!1],
"180,1":["+03:00","Europe/Moscow",!0],"180,0":["+03:00","Asia/Baghdad",!1],"210,1":["+03:30","Asia/Tehran",!0],"240,0":["+04:00","Asia/Dubai",!1],"240,1":["+04:00","Asia/Yerevan",!0],"270,0":["+04:30","Asia/Kabul",!1],"300,1":["+05:00","Asia/Yekaterinburg",!0],"300,0":["+05:00","Asia/Karachi",!1],"330,0":["+05:30","Asia/Kolkata",!1],"345,0":["+05:45","Asia/Kathmandu",!1],"360,0":["+06:00","Asia/Dhaka",!1],"360,1":["+06:00","Asia/Omsk",!0],"390,0":["+06:30","Asia/Rangoon",!1],"420,1":["+07:00","Asia/Krasnoyarsk",
!0],"420,0":["+07:00","Asia/Jakarta",!1],"480,0":["+08:00","Asia/Shanghai",!1],"480,1":["+08:00","Asia/Irkutsk",!0],"525,0":["+08:45","Australia/Eucla",!0],"525,1,s":["+08:45","Australia/Eucla",!0],"540,1":["+09:00","Asia/Yakutsk",!0],"540,0":["+09:00","Asia/Tokyo",!1],"570,0":["+09:30","Australia/Darwin",!1],"570,1,s":["+09:30","Australia/Adelaide",!0],"600,0":["+10:00","Australia/Brisbane",!1],"600,1":["+10:00","Asia/Vladivostok",!0],"600,1,s":["+10:00","Australia/Sydney",!0],"630,1,s":["+10:30",
"Australia/Lord_Howe",!0],"660,1":["+11:00","Asia/Kamchatka",!0],"660,0":["+11:00","Pacific/Noumea",!1],"690,0":["+11:30","Pacific/Norfolk",!1],"720,1,s":["+12:00","Pacific/Auckland",!0],"720,0":["+12:00","Pacific/Tarawa",!1],"765,1,s":["+12:45","Pacific/Chatham",!0],"780,0":["+13:00","Pacific/Tongatapu",!1],"840,0":["+14:00","Pacific/Kiritimati",!1]}}();
jstz.olson.dst_start_dates=function(){return{"America/Denver":new Date(2011,2,13,3,0,0,0),"America/Mazatlan":new Date(2011,3,3,3,0,0,0),"America/Chicago":new Date(2011,2,13,3,0,0,0),"America/Mexico_City":new Date(2011,3,3,3,0,0,0),"Atlantic/Stanley":new Date(2011,8,4,7,0,0,0),"America/Asuncion":new Date(2011,9,2,3,0,0,0),"America/Santiago":new Date(2011,9,9,3,0,0,0),"America/Campo_Grande":new Date(2011,9,16,5,0,0,0),"America/Montevideo":new Date(2011,9,2,3,0,0,0),"America/Sao_Paulo":new Date(2011,
9,16,5,0,0,0),"America/Los_Angeles":new Date(2011,2,13,8,0,0,0),"America/Santa_Isabel":new Date(2011,3,5,8,0,0,0),"America/Havana":new Date(2011,2,13,2,0,0,0),"America/New_York":new Date(2011,2,13,7,0,0,0),"Asia/Gaza":new Date(2011,2,26,23,0,0,0),"Asia/Beirut":new Date(2011,2,27,1,0,0,0),"Europe/Minsk":new Date(2011,2,27,2,0,0,0),"Europe/Helsinki":new Date(2011,2,27,4,0,0,0),"Europe/Istanbul":new Date(2011,2,28,5,0,0,0),"Asia/Damascus":new Date(2011,3,1,2,0,0,0),"Asia/Jerusalem":new Date(2011,3,1,
6,0,0,0),"Africa/Cairo":new Date(2010,3,30,4,0,0,0),"Asia/Yerevan":new Date(2011,2,27,4,0,0,0),"Asia/Baku":new Date(2011,2,27,8,0,0,0),"Pacific/Auckland":new Date(2011,8,26,7,0,0,0),"Pacific/Fiji":new Date(2010,11,29,23,0,0,0),"America/Halifax":new Date(2011,2,13,6,0,0,0),"America/Goose_Bay":new Date(2011,2,13,2,1,0,0),"America/Miquelon":new Date(2011,2,13,5,0,0,0),"America/Godthab":new Date(2011,2,27,1,0,0,0)}}();
jstz.olson.ambiguity_list={"America/Denver":["America/Denver","America/Mazatlan"],"America/Chicago":["America/Chicago","America/Mexico_City"],"America/Asuncion":["Atlantic/Stanley","America/Asuncion","America/Santiago","America/Campo_Grande"],"America/Montevideo":["America/Montevideo","America/Sao_Paulo"],"Asia/Beirut":"Asia/Gaza,Asia/Beirut,Europe/Minsk,Europe/Helsinki,Europe/Istanbul,Asia/Damascus,Asia/Jerusalem,Africa/Cairo".split(","),"Asia/Yerevan":["Asia/Yerevan","Asia/Baku"],"Pacific/Auckland":["Pacific/Auckland",
"Pacific/Fiji"],"America/Los_Angeles":["America/Los_Angeles","America/Santa_Isabel"],"America/New_York":["America/Havana","America/New_York"],"America/Halifax":["America/Goose_Bay","America/Halifax"],"America/Godthab":["America/Miquelon","America/Godthab"]};

function unique(a){
    a.sort();
    for(var i = 1; i < a.length; ){
        if(a[i-1] == a[i]){
            a.splice(i, 1);
        } else {
            i++;
        }
    }
    return a;
}

////// LANG
////////////////

function setLang(val, home) {
        save_Setting('lang', '' + val + '');

        spot_is_updated = [];
        spots_are_updated = [];


        $('#busy span').text(lang['bezigMetLaden'][settings['lang']]);
        $('.langSelector').html(settings['lang']);
        $('#jqt .toolbar h1').not('.always').hide();
        $('.language').hide();
        $('#favBtn').html('<small class="favourites"></small>' + lang['favorieten'][settings['lang']] + '<small class="counter" id="numFavs">' + settings['num_favs'] + '</small>');
        $('#nearbyBtn').html('<small class="nearby"></small>' + lang['indebuurt'][settings['lang']] + '');
        $('.'+ settings['lang'] +'').show();
        if(!home) jQT.goBack();
        else getRegios();
}

////////////////
/// EINDE LANG



/// GEO 
//////////////

function getGeo() {

        msg('Searching for GPS', 1);
        
        if(geo_position_js.init() && settings['geo'] != 'false'){
                geo_position_js.getCurrentPosition(success_callback,error_callback,{enableHighAccuracy:true});
        }
        else {
            msg('No GPS', 1);
        }
        function success_callback(p){
            save_Setting('lat', ''+p.coords.latitude.toFixed(10)+'');
            save_Setting('lon', ''+p.coords.longitude.toFixed(10)+''); 
            msg('GPS SET', 1);

        }
        function error_callback(p){
                // POSITION_UNAVAILABLE = 2
                if(p.code == "2") save_Setting('geo', 'false');
                msg('No GPS', 1);
        }
        return true;
}

/// EINDE GEO
//////////////////

var default_WOEID = "12478595";
var weatherImg = "http://l.yimg.com/a/i/us/nws/weather/gr/";

var windDir = {
    'N' : 0,
    'NNE' : 22,
    'NE' : 45,
    'ENE' : 67,
    'E' : 90,
    'ESE' : 112,
    'SE' : 135,
    'SSE' : 157,
    'S' : 180,
    'SSW' : 202,
    'SW' : 225,
    'WSW' : 247,
    'W' : 270,
    'WNW' : 292,
    'NW' : 315
}
var bft = {
    '1' : 1,
    '2' : 6,
    '3' : 12,
    '4' : 20,
    '5' : 29,
    '6' : 39,
    '7' : 50,
    '8' : 62,
    '9' : 75,
    '10' : 89,
    '11': 102,
    '12' : 117
}

//// MARKERS
/////////////////////////////

function mkMarkers(transaction, resultSet) {
    
    var div = settings['mapId'];

    save_Setting('num_results_' + div + '', ''+ resultSet.rows.length +'');

    if(marker[div] == undefined || !marker[div] || div.indexOf('NB_') > -1) {
         msg('create marker for ' + div + '', 1);
         marker[div] = [];

        for (var i=0; i < resultSet.rows.length; i++) { 
                    item = resultSet.rows.item(i);
                    marker[div][item.id] = item;
      }
    }
    else {
        msg('created markers for ' + div + ' allready', 1);
    }
    
}

////////////////
// EINDE MARKERS 



//// MAP / LIST
/////////////////////

var regios;
var types;

var mylatlng        = [];
var myOptions       = [];
var map             = [];
var marker          = [];
var icon            = [];
var pos             = [];
var bounds          = [];
var contentBubble   = [];
var infoBubble      = [];
var me;

var weather;
var weather_marker  = [];
var weatherlatlng   = [];

var min_zoomlevel   = 15;

var weatherIconSmall, weatherIcon, weatherIconLarge, image, imageLarge, imageSmall, shadow, meIcon, curPos;


var noPoi = [{ featureType: "poi",stylers: [{ visibility: "off" }] }];
function setMapIcons() {
    
    if(weather_marker != undefined) {
       //  alert(weather_marker['icon'] + '!')
        weatherIconSmall = new google.maps.MarkerImage(''+ weather_marker['icon'] + '',
            new google.maps.Size(250, 180),
            new google.maps.Point(0,0),
            new google.maps.Point(31, 22),
            new google.maps.Size(62, 45)
        );
            
        weatherIcon = new google.maps.MarkerImage(''+ weather_marker['icon'] + '',
            new google.maps.Size(250, 180),
            new google.maps.Point(0,0),
            new google.maps.Point(62, 45),
            new google.maps.Size(125, 90)
        );
            
       weatherIconLarge = new google.maps.MarkerImage(''+ weather_marker['icon'] + '',
            new google.maps.Size(250, 180),
            new google.maps.Point(0,0),
            new google.maps.Point(125,90)
        );
    }

    imageLarge = new google.maps.MarkerImage('img/marker.png',
    new google.maps.Size(44, 59),
    new google.maps.Point(0,0),
    new google.maps.Point(22, 55),
    new google.maps.Size(43, 58)
    );

    image = new google.maps.MarkerImage('img/marker.png',
    new google.maps.Size(44, 59),
    new google.maps.Point(0,0),
    new google.maps.Point(16, 39),
    new google.maps.Size (30,40)
    );

    imageSmall = new google.maps.MarkerImage('img/marker.png',
    new google.maps.Size(44, 59),
    new google.maps.Point(0,0),
    new google.maps.Point(10, 26),
    new google.maps.Size (20,27)
    );

    shadow = new google.maps.MarkerImage('img/markerShadow.png',
    new google.maps.Size(61, 42),
    new google.maps.Point(0,0),
    new google.maps.Point(6, 18),
    new google.maps.Size(30, 21)
    );

    meIcon = new google.maps.MarkerImage('img/meIcon.png',
    new google.maps.Size(30, 32),
    new google.maps.Point(0,0),
    new google.maps.Point(7, 7),
    new google.maps.Size(14, 15)
    );

    curPos = new google.maps.MarkerImage('img/curPos.gif',
    new google.maps.Size(75, 75),
    new google.maps.Point(0,0),
    new google.maps.Point(37, 37),
    new google.maps.Size(74, 74)
    );
}

function init_Map(div) {
    $('div.directions').removeClass('in');
    if(map[div] == undefined) {

  
            if(settings['geo']!="false") {
                mylatlng[div] = new google.maps.LatLng(settings['lat'],settings['lon']);
            }
            else {
                mylatlng[div] = new google.maps.LatLng(regios[settings['regio']].lat,regios[settings['regio']].lon);
            }

            myOptions[div] = {
                zoom: 15,
                center: mylatlng[div],
                disableDefaultUI: false,
                mapTypeControl: false,
                streetViewControl: false,
                zoomControl: true,
                zoomControlOptions: {
                    style: google.maps.ZoomControlStyle.SMALL,
                    position: google.maps.ControlPosition.RIGHT_TOP
                },
                mapTypeId: google.maps.MapTypeId.ROADMAP
            };

            map[div] = new google.maps.Map(document.getElementById(div + "_map"), myOptions[div]);

            map[div].setOptions({styles: noPoi});

            pos[div] = [];

            bounds[div] = new google.maps.LatLngBounds();

            icon[div] = [];

            me = new google.maps.Marker({
                    map: map[div],
                    icon: meIcon,
                    shadow: curPos,
                    optimized: false,
                    position: mylatlng[div],
                    zIndex: 1
            });


            google.maps.event.addListener(me, 'click', function() {
                for(var i in infoBubble[div]) {
                    infoBubble[div][i].close();
                }
                map[div].setZoom(14);
                map[div].setCenter(me.getPosition());
                map[div].panTo(me.getPosition());
            });

           // bounds[div].extend(mylatlng[div]);
           
           
           if(weatherIcon != undefined) {
               
               weatherlatlng[settings['regio']] = new google.maps.LatLng(regios[settings['regio']].weather_lat,regios[settings['regio']].weather_lon);
               weather = new google.maps.Marker({
                    map: map[div],
                    icon: weatherIconSmall,
                    optimized: false,
                    position: weatherlatlng[settings['regio']],
                    zIndex: 1
                });
                bounds[div].extend(weatherlatlng[settings['regio']]);
                
           }

            contentBubble[div] = [];
            infoBubble[div] = [];


            for(var i in marker[div]) {

                var markers = marker[div][i];

                if(pos[div][markers.id] == undefined) { 
                    pos[div][markers.id] = new google.maps.LatLng(markers.lat, markers.lon);
                    bounds[div].extend(pos[div][markers.id]);
                }

                icon[div][markers.id] = new google.maps.Marker({
                    map: map[div],
                    icon: imageSmall,
                    shadow: shadow,
                    animation: google.maps.Animation.DROP,
                    optimized: false,
                    position: pos[div][markers.id],
                    title: '' + markers.naam + '',
                    zIndex: 9
                });
                
                contentBubble[div][markers.id] = '' + markers.naam + '<br><span>';
                if(markers.typeNaam) contentBubble[div][markers.id] += '' + markers.typeNaam + '';
                if(markers.plaats) contentBubble[div][markers.id] += ', ' + markers.plaats + '';
                contentBubble[div][markers.id] += '</span>';
                
                setinfoBubble(icon[div][markers.id], markers.id, '' + markers.naam + '', '' + contentBubble[div][markers.id] + '');

            }

            map[div].fitBounds(bounds[div]); 

            function setinfoBubble(id, spot_id, naam, content) {

                infoBubble[div][spot_id] = new InfoBubble({
                        map: map[div],
                        content: '<div class="phoneytext"><div>' + content + '</div><div class="arrow" onclick="getSpot(' + spot_id + ', \'' + naam + '\')"><img src="./img/arrow.png"></div></div>',
                        position: pos[div][spot_id],
                        shadowStyle: 0,
                        padding: 0,
                        backgroundColor: 'rgba(57,57,57, 0.8)',
                        borderRadius: 8,
                        arrowSize: 15,
                        borderWidth: 0,
                        borderColor: '#000',
                        disableAutoPan: false,
                        hideCloseButton: true,
                        arrowPosition: 45,
                        backgroundClassName: 'phoney',
                        arrowStyle: 1,
                        id: spot_id,
                    });

                google.maps.event.addListener(id, 'click', function() {

                    for(var i in infoBubble[div]) {
                        infoBubble[div][i].close();
                    }
                    for(var i in icon[div]) {
                        icon[div][i].setZIndex(9);
                    }

                    id.setZIndex(10);
                    infoBubble[div][spot_id].open();
                    $('#' + div +' div.directions').removeClass('in');
                    $('#' + div +' div.directions').html('<span><p>Route naar: ' + naam + '</p></span><ul class="individual segmented direction"><li><a href="#">Route per voet</a></li><li><a href="#">Route per auto</a></li></ul>');
                    $('#' + div +' div.directions').addClass('in');
                   
                    
                });

            }

        }
        else {
        for(var i in icon[div]) {
            icon[div][i].setAnimation(google.maps.Animation.DROP);
            icon[div][i].setAnimation(null);
        }
        map[div].fitBounds(bounds[div]); 
    }


/// ZOOOM
google.maps.event.addListener(map[div], 'zoom_changed', function() {
    set_zoom();
});

function set_zoom(check) {

    if(!check) check = 0;
  
    if(map[div].getZoom()>=15) {
        weather.setOptions({ icon: weatherIconLarge });
    }
    else if(map[div].getZoom()>=14) {
         weather.setOptions({ icon: weatherIcon });
    }
    else  {
        weather.setOptions({ icon: weatherIconSmall });
    }
    
    if(map[div].getZoom() <= 14) {
        for(var i in icon[div]) {
            icon[div][i].setOptions({ icon: imageSmall });
        }
    }
    else if(map[div].getZoom() > 16) {
        for(var i in icon[div]) {
            icon[div][i].setOptions({ icon: imageLarge });
        }
    }
    else {
            for(var i in icon[div]) {
            icon[div][i].setOptions({ icon: image });
        }
    }
    if(check == 1) {
        if(map[div].getZoom() > min_zoomlevel) {
            map[div].setZoom(min_zoomlevel);
        }
    }
}
/// EINDE ZOOM
$('#' + div).find('div.loading').hide();
}


function showMap() {
    
    setMapIcons();

    var CurDiv = $('div.current').attr('id');
    if(CurDiv != settings['mapId']) {
        msg('Changed Div form `'+ settings['mapId'] +'`to: `' + CurDiv + '`', 1);
        save_Setting('mapId', CurDiv);
    }
    
   //  var CurDiv = settings['mapId'];

    $('#' + CurDiv).find('ul.segmented li a').removeClass('selected')
    $('#' + CurDiv).find('ul.segmented li a.map').addClass('selected');
    $('#' + CurDiv).find('ul.results').hide();
    $('#' + CurDiv).find('div.map, div.loading').show();

    msg('Show Map view for `' + CurDiv + '`', 1);
    init_Map(CurDiv);
    return false;
}

function showList() {	
    $('div.directions').removeClass('in');
    var CurDiv = $('div.current').attr('id');
    //var CurDiv = settings['mapId'];

    $('#' + CurDiv).find('ul.segmented li a').removeClass('selected')
    $('#' + CurDiv).find('ul.segmented li a.list').addClass('selected');
    $('#' + CurDiv).find('ul.results').show();
    $('#' + CurDiv).find('div.map').hide();
    
    msg('Show List view for `' + CurDiv + '`', 1);

    return false;
}


////////////////////
/// EINDE MAP / LIST




function nl2br (str, is_xhtml) {
    // Converts newlines to HTML line breaks  
    // 
    // version: 1109.2015
    // discuss at: http://phpjs.org/functions/nl2br
    // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +   improved by: Philip Peterson
    // +   improved by: Onno Marsman
    // +   improved by: Atli Þór
    // +   bugfixed by: Onno Marsman
    // +      input by: Brett Zamir (http://brett-zamir.me)
    // +   bugfixed by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +   improved by: Brett Zamir (http://brett-zamir.me)
    // +   improved by: Maximusya
    // *     example 1: nl2br('Kevin\nvan\nZonneveld');
    // *     returns 1: 'Kevin\nvan\nZonneveld'
    // *     example 2: nl2br("\nOne\nTwo\n\nThree\n", false);
    // *     returns 2: '<br>\nOne<br>\nTwo<br>\n<br>\nThree<br>\n'
    // *     example 3: nl2br("\nOne\nTwo\n\nThree\n", true);
    // *     returns 3: '\nOne\nTwo\n\nThree\n'

    // var breakTag = (is_xhtml || typeof is_xhtml === 'undefined') ? '</p><p class="text">' : '<br>';
    var breakTag = (is_xhtml || typeof is_xhtml === 'undefined') ? '<br />' : '<br />';
    str = (str + '').replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, '$1' + breakTag + '$2');    
    // str = (str + '').replace(/([^>\r\n\r\n]?)(\r\n\r\n|\n\r\n\r)/g, '$1' + breakTag + '$2');  
    return str;
}

function getOsVersion() {
    var agent = window.navigator.userAgent,
        start = agent.indexOf( 'OS ' );

    if( ( agent.indexOf( 'iPhone' ) > -1 || agent.indexOf( 'iPad' ) > -1 ) && start > -1 ){
        return window.Number( agent.substr( start + 3, 3 ).replace( '_', '.' ) );
    } else {
        return 0;
    };

};

function doalert(str, caption) {

    caption = caption || 'YouGET Userapp';

    if (is_native) {
	navigator.notification.alert(str, function() {}, caption);
    } else {
	alert(caption + ': ' + str);
    }
    
}

/**
 * type_id | Description
 * --------|---------------------------
 * 1	   | Notice / function call
 * 2	   | Webservice
 * 4	   | GPS Notice
 * 8	   | Database
 */
function msg(str, type_id) {

    type_id = type_id || 1;
    msg_type = {1: 'Notice', 2: 'Webservice', 4: 'GPS Notice', 8: 'Database', 16: 'Error', 32: 'Warning'}

    uptime = Math.round(new Date().getTime() / 1000) - ts_startup;
    uptime_m = Math.floor(uptime / 60);
    uptime_s = uptime % 60;
    uptime = (uptime_m > 9 ? uptime_m : '0' + uptime_m) + ':' + (uptime_s > 9 ? uptime_s : '0' + uptime_s);

    if (type_id == 16 || type_id == 32) {
	console.error(uptime + ' ' + msg_type[type_id] + ': ' + str);
    } else {
	console.log(uptime + ' ' + msg_type[type_id] + ': ' + str);
    }

}

function is_online() {
    
    if (undefined == navigator.network) return true;

    var networkState = navigator.network.connection.type;
    if (networkState == Connection.UNKNOWN || networkState == Connection.NONE) return false;
    return true;

}


function strtotime (str, now) {
    // Convert string representation of date and time to a timestamp  
    // 
    // version: 1109.2015
    // discuss at: http://phpjs.org/functions/strtotime
    // +   original by: Caio Ariede (http://caioariede.com)
    // +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +      input by: David
    // +   improved by: Caio Ariede (http://caioariede.com)
    // +   improved by: Brett Zamir (http://brett-zamir.me)
    // +   bugfixed by: Wagner B. Soares
    // +   bugfixed by: Artur Tchernychev
    // %        note 1: Examples all have a fixed timestamp to prevent tests to fail because of variable time(zones)
    // *     example 1: strtotime('+1 day', 1129633200);
    // *     returns 1: 1129719600
    // *     example 2: strtotime('+1 week 2 days 4 hours 2 seconds', 1129633200);
    // *     returns 2: 1130425202
    // *     example 3: strtotime('last month', 1129633200);
    // *     returns 3: 1127041200
    // *     example 4: strtotime('2009-05-04 08:30:00');
    // *     returns 4: 1241418600
    var i, match, s, strTmp = '',
        parse = '';
 
    strTmp = str;
    strTmp = strTmp.replace(/\s{2,}|^\s|\s$/g, ' '); // unecessary spaces
    strTmp = strTmp.replace(/[\t\r\n]/g, ''); // unecessary chars
    if (strTmp == 'now') {
        return (new Date()).getTime() / 1000; // Return seconds, not milli-seconds
    } else if (!isNaN(parse = Date.parse(strTmp))) {
        return (parse / 1000);
    } else if (now) {
        now = new Date(now * 1000); // Accept PHP-style seconds
    } else {
        now = new Date();
    }
 
    strTmp = strTmp.toLowerCase();
 
    var __is = {
        day: {
            'sun': 0,
            'mon': 1,
            'tue': 2,
            'wed': 3,
            'thu': 4,
            'fri': 5,
            'sat': 6
        },
        mon: {
            'jan': 0,
            'feb': 1,
            'mar': 2,
            'apr': 3,
            'may': 4,
            'jun': 5,
            'jul': 6,
            'aug': 7,
            'sep': 8,
            'oct': 9,
            'nov': 10,
            'dec': 11
        }
    };
 
    var process = function (m) {
        var ago = (m[2] && m[2] == 'ago');
        var num = (num = m[0] == 'last' ? -1 : 1) * (ago ? -1 : 1);
 
        switch (m[0]) {
        case 'last':
        case 'next':
            switch (m[1].substring(0, 3)) {
            case 'yea':
                now.setFullYear(now.getFullYear() + num);
                break;
            case 'mon':
                now.setMonth(now.getMonth() + num);
                break;
            case 'wee':
                now.setDate(now.getDate() + (num * 7));
                break;
            case 'day':
                now.setDate(now.getDate() + num);
                break;
            case 'hou':
                now.setHours(now.getHours() + num);
                break;
            case 'min':
                now.setMinutes(now.getMinutes() + num);
                break;
            case 'sec':
                now.setSeconds(now.getSeconds() + num);
                break;
            default:
                var day;
                if (typeof(day = __is.day[m[1].substring(0, 3)]) != 'undefined') {
                    var diff = day - now.getDay();
                    if (diff == 0) {
                        diff = 7 * num;
                    } else if (diff > 0) {
                        if (m[0] == 'last') {
                            diff -= 7;
                        }
                    } else {
                        if (m[0] == 'next') {
                            diff += 7;
                        }
                    }
                    now.setDate(now.getDate() + diff);
                }
            }
            break;
 
        default:
            if (/\d+/.test(m[0])) {
                num *= parseInt(m[0], 10);
 
                switch (m[1].substring(0, 3)) {
                case 'yea':
                    now.setFullYear(now.getFullYear() + num);
                    break;
                case 'mon':
                    now.setMonth(now.getMonth() + num);
                    break;
                case 'wee':
                    now.setDate(now.getDate() + (num * 7));
                    break;
                case 'day':
                    now.setDate(now.getDate() + num);
                    break;
                case 'hou':
                    now.setHours(now.getHours() + num);
                    break;
                case 'min':
                    now.setMinutes(now.getMinutes() + num);
                    break;
                case 'sec':
                    now.setSeconds(now.getSeconds() + num);
                    break;
                }
            } else {
                return false;
            }
            break;
        }
        return true;
    };
 
    match = strTmp.match(/^(\d{2,4}-\d{2}-\d{2})(?:\s(\d{1,2}:\d{2}(:\d{2})?)?(?:\.(\d+))?)?$/);
    if (match != null) {
        if (!match[2]) {
            match[2] = '00:00:00';
        } else if (!match[3]) {
            match[2] += ':00';
        }
 
        s = match[1].split(/-/g);
 
        for (i in __is.mon) {
            if (__is.mon[i] == s[1] - 1) {
                s[1] = i;
            }
        }
        s[0] = parseInt(s[0], 10);
 
        s[0] = (s[0] >= 0 && s[0] <= 69) ? '20' + (s[0] < 10 ? '0' + s[0] : s[0] + '') : (s[0] >= 70 && s[0] <= 99) ? '19' + s[0] : s[0] + '';
        return parseInt(this.strtotime(s[2] + ' ' + s[1] + ' ' + s[0] + ' ' + match[2]) + (match[4] ? match[4] / 1000 : ''), 10);
    }
 
    var regex = '([+-]?\\d+\\s' + '(years?|months?|weeks?|days?|hours?|min|minutes?|sec|seconds?' + '|sun\\.?|sunday|mon\\.?|monday|tue\\.?|tuesday|wed\\.?|wednesday' + '|thu\\.?|thursday|fri\\.?|friday|sat\\.?|saturday)' + '|(last|next)\\s' + '(years?|months?|weeks?|days?|hours?|min|minutes?|sec|seconds?' + '|sun\\.?|sunday|mon\\.?|monday|tue\\.?|tuesday|wed\\.?|wednesday' + '|thu\\.?|thursday|fri\\.?|friday|sat\\.?|saturday))' + '(\\sago)?';
 
    match = strTmp.match(new RegExp(regex, 'gi')); // Brett: seems should be case insensitive per docs, so added 'i'
    if (match == null) {
        return false;
    }
 
    for (i = 0; i < match.length; i++) {
        if (!process(match[i].split(' '))) {
            return false;
        }
    }
 
    return (now.getTime() / 1000);
}

var callback_touristic_types, timeout_touristic_types, timeout_touristic_types_id;

var touristic_types_are_updated = false;

function update_touristic_types(timeout, callback) {

    if (busy['update_touristic_types']) {
	msg('update_touristic_types already in progress...', 32);
	return false;
    }

    touristic_types_are_updated = true;

    if (is_online() != true) {
	busy['update_touristic_types'] = false;
	return false;
    }

    busy['update_touristic_types'] = true;

    timeout_touristic_types = timeout;
    timeout_touristic_types_id = window.setTimeout(function() {
	busy['update_touristic_types'] = false;
	timeout_touristic_types();
    }, webservice_timeout);

    callback_nb_spots = callback;

    msg('update_touristic_types()', 1);

    msg('get_touristic_types', 2);


    try {

	$.post(api_url + 'calls/loadTypes.php', {}, function(data) {

	    window.clearTimeout(timeout_touristic_types_id);

	    if (!data.error) {

		var types = data.types;

		for (var id in types) {

		    type_item = types[id];

		    item_id = type_item.id;

		    save_ByPK('types', item_id, {
			id:	    item_id,
			icon:	    type_item.icon || '',
			NL:	    type_item.NL,
			EN:	    type_item.EN,
			DE:	    type_item.DE,
			ES:	    type_item.ES,
			order:	    type_item.order
		    });

		}

		save_ByPK_commit();
		save_Setting('touristic_types_update', '1');
		select_touristic_types();

	    } else {

		// TODO: Foutmelding geven
		busy['update_touristic_types'] = false;
		timeout_touristic_types();

	    }

	}, 'json');

    } catch (error) {

	busy['update_touristic_types'] = false;
	window.clearTimeout(timeout_touristic_types_id);
	timeout_touristic_types();

    }


}

function select_touristic_types(is_retry, callback) {

    is_retry = is_retry | false;
    callback_nb_spots = callback || callback_nb_spots;

    if (!is_retry)
	msg('select_touristic_types()', 1);


    db.transaction(
	function (transaction) {
	    transaction.executeSql("\
                    SELECT		`types`.`" + settings['lang'] + "` AS `typeNaam`, `spots`.`id`,`spots`.`naam`,`spots`.`plaats`,`spots`.`type_id`,`spots`.`lon`,`spots`.`lat`\
                    FROM		`spots`\
                    LEFT JOIN `types` ON `types`.`id` = `spots`.`type_id`\
                    WHERE `spots`.`showOnHome` = 1\
                    ;", [], mkMarkers, errorHandler);
	}
	);

    db.transaction(
	function (transaction) {
	    transaction.executeSql("\
			SELECT		`types`.`" + settings['lang'] + "` AS `typeNaam`, `types`.`id` AS `typeId`, `types`.`icon`, `spots`.`id`,`spots`.`type_id`\
			FROM		`spots`\
                        LEFT JOIN `types` ON `types`.`id` = `spots`.`type_id`\
                        WHERE `spots`.`showOnHome` = 1\
                        GROUP BY `spots`.`type_id`\
			ORDER BY `types`.`order` ASC\
			;", [], show_touristic_types, errorHandler);
	}
	);



}

function show_touristic_types(transaction, resultSet) {

    $('div.directions').hide();

    var touristic_items = [];

    msg('show_touristic_types()', 1);

    var div = "#TR_"+ settings['lang'];
    var ul = '#TR_' + settings['lang'] + ' ul.types';

    $(ul +' li').not('.loading').remove();

    for (var i=0; i < resultSet.rows.length; i++) {
	type = resultSet.rows.item(i);
	//$(ul).append('<li class="arrow"><a href="#" onclick="getType(' +  + ', \'' +  + '\', \'1\');">'+  +'</a></li>');
	$(ul).append('<li class="arrow">\
		    <a href="#" onclick="getType(' + type.typeId + ', \'' + type.typeNaam + '\', 1);">\
			<div style="float: left; position: relative; width: 32px; height: 22px;">\
			    <img src="' + (type.icon != '' ? 'data:image/png;base64,' + type.icon : './img/pixel.gif' ) + '" style="width: 32px; height: 32px; position: absolute; top: -5px; left: -4px;">\
			</div>\
			' + type.typeNaam + '\
		    </a>\
		</li>');

	touristic_items.push(type);
    }

    $(ul +' li.loading').remove();
    $(div +' div.loading').hide();

    if (resultSet.rows.length > 0) {
	callback_nb_spots(touristic_items);
    }
    else {
	callback_nb_spots(null);
    }

    busy['update_touristic_types'] = false;

}

var lang = new Array();

lang['kiesRegio'] = new Array();
lang['kiesRegio']['NL'] = "Kies een regio";
lang['kiesRegio']['EN'] = "Choose an area";
lang['kiesRegio']['DE'] = "Wählen Sie eine region";
lang['kiesRegio']['ES'] = "Elige una zona";
lang['kiesRegio']['SE'] = "";
lang['kiesRegio']['RU'] = "Выберите зону";

lang['inDeBuurt'] = new Array();
lang['inDeBuurt']['NL'] = "In de buurt";
lang['inDeBuurt']['EN'] = "Nearby";
lang['inDeBuurt']['DE'] = "Nahe";
lang['inDeBuurt']['ES'] = "Cerca de mi";
lang['inDeBuurt']['SE'] = "";
lang['inDeBuurt']['RU'] = "Близко со мной";

lang['dichtbijDezePlaats'] = new Array();
lang['dichtbijDezePlaats']['NL'] = "Dichtbij deze plek";
lang['dichtbijDezePlaats']['EN'] = "Close to this place";
lang['dichtbijDezePlaats']['DE'] = "Nahe dieser Stelle";
lang['dichtbijDezePlaats']['ES'] = "Cerca de este lugar";
lang['dichtbijDezePlaats']['SE'] = "";
lang['dichtbijDezePlaats']['RU'] = "Близко с этим местоположением";

lang['meerInformatie'] = new Array();
lang['meerInformatie']['NL'] = "Meer informatie";
lang['meerInformatie']['EN'] = "More information";
lang['meerInformatie']['DE'] = "Weitere Informationen";
lang['meerInformatie']['ES'] = "Más información";
lang['meerInformatie']['SE'] = "";
lang['meerInformatie']['RU'] = "Больше информации";

lang['toeristischeInformatie'] = new Array();
lang['toeristischeInformatie']['NL'] = "Toeristische Informatie";
lang['toeristischeInformatie']['EN'] = "Tourist Information";
lang['toeristischeInformatie']['DE'] = "Tourist-information";
lang['toeristischeInformatie']['ES'] = "Información turístico";
lang['toeristischeInformatie']['SE'] = "";
lang['toeristischeInformatie']['RU'] = "Туристическая информация";

lang['toonInLijst'] = new Array();
lang['toonInLijst']['NL'] = "Toon in lijst";
lang['toonInLijst']['EN'] = "Show on list";
lang['toonInLijst']['DE'] = "In Liste anzeigen";
lang['toonInLijst']['ES'] = "Mostrar en listado";
lang['toonInLijst']['SE'] = "";
lang['toonInLijst']['RU'] = "Показать в списке";

lang['toonOpKaart'] = new Array();
lang['toonOpKaart']['NL'] = "Toon op kaart";
lang['toonOpKaart']['EN'] = "Show on map";
lang['toonOpKaart']['DE'] = "Auf Karte anzeigen";
lang['toonOpKaart']['ES'] = "Mostrar en el mapa";
lang['toonOpKaart']['SE'] = "";
lang['toonOpKaart']['RU'] = "Показать на карте";

lang['bezigMetLaden'] = new Array();
lang['bezigMetLaden']['NL'] = "Bezig met laden";
lang['bezigMetLaden']['EN'] = "Loading";
lang['bezigMetLaden']['DE'] = "Aufladen";
lang['bezigMetLaden']['ES'] = "Cargar";
lang['bezigMetLaden']['SE'] = "";
lang['bezigMetLaden']['RU'] = "Скачать";

lang['laadMeer'] = new Array();
lang['laadMeer']['NL'] = "Laad Meer";
lang['laadMeer']['EN'] = "Load More";
lang['laadMeer']['DE'] = "Mehr laden";
lang['laadMeer']['ES'] = "Cargar más";
lang['laadMeer']['SE'] = "";
lang['laadMeer']['RU'] = "Скачать еще";

lang['bellen'] = new Array();
lang['bellen']['NL'] = "Bellen";
lang['bellen']['EN'] = "Call";
lang['bellen']['DE'] = "Anrufen";
lang['bellen']['ES'] = "Llamar";
lang['bellen']['SE'] = "";
lang['bellen']['RU'] = "Позвонить";

lang['email'] = new Array();
lang['email']['NL'] = "E-mail";
lang['email']['EN'] = "E-mail";
lang['email']['DE'] = "E-mail";
lang['email']['ES'] = "E-mail";
lang['email']['SE'] = "";
lang['email']['RU'] = "E-mail";

lang['favorieten'] = new Array();
lang['favorieten']['NL'] = "Mijn Favorieten";
lang['favorieten']['EN'] = "My Favourites";
lang['favorieten']['DE'] = "Meine Favoriten";
lang['favorieten']['ES'] = "Mis Favoritos";
lang['favorieten']['SE'] = "";
lang['favorieten']['RU'] = "Мои места";

lang['geenFavs'] = new Array();
lang['geenFavs']['NL'] = "U heeft nog geen favorieten...";
lang['geenFavs']['EN'] = "You do not have any favorites... ";
lang['geenFavs']['DE'] = "Sie haben noch keine Favoriten...";
lang['geenFavs']['ES'] = "Todavía no tiene favoritos...";
lang['geenFavs']['SE'] = "";
lang['geenFavs']['RU'] = "Пока нет отметок Мои места";

lang['waarderingen'] = new Array();
lang['waarderingen']['NL'] = "Waarderingen";
lang['waarderingen']['EN'] = "Comments";
lang['waarderingen']['DE'] = "Bewertungen";
lang['waarderingen']['ES'] = "Opiniones";
lang['waarderingen']['SE'] = "";
lang['waarderingen']['RU'] = "Комментарии";

lang['waardeer'] = new Array();
lang['waardeer']['NL'] = "Waarderen";
lang['waardeer']['EN'] = "Rate";
lang['waardeer']['DE'] = "Bewerten";
lang['waardeer']['ES'] = "Opinar";
lang['waardeer']['SE'] = "";
lang['waardeer']['RU'] = "Прокомментировать";

lang['uwNaam'] = new Array();
lang['uwNaam']['NL'] = "Uw naam";
lang['uwNaam']['EN'] = "Your name";
lang['uwNaam']['DE'] = "Ihr Name";
lang['uwNaam']['ES'] = "Su nombre";
lang['uwNaam']['SE'] = "";
lang['uwNaam']['RU'] = "Ваше имя";

lang['sluiten'] = new Array();
lang['sluiten']['NL'] = "Sluiten";
lang['sluiten']['EN'] = "Close";
lang['sluiten']['DE'] = "Beenden";
lang['sluiten']['ES'] = "Cerrar";
lang['sluiten']['SE'] = "";
lang['sluiten']['RU'] = "Закрыть";

lang['website'] = new Array();
lang['website']['NL'] = "Website";
lang['website']['EN'] = "Website";
lang['website']['DE'] = "Webseite";
lang['website']['ES'] = "Sitio web";
lang['website']['SE'] = "";
lang['website']['RU'] = "Веб-сайт";

lang['contact'] = new Array();
lang['contact']['NL'] = "Contact";
lang['contact']['EN'] = "Contact";
lang['contact']['DE'] = "Kontakt";
lang['contact']['ES'] = "Contacto";
lang['contact']['SE'] = "";
lang['contact']['RU'] = "Контакты";

lang['uwCommentaar'] = new Array();
lang['uwCommentaar']['NL'] = "Uw commentaar";
lang['uwCommentaar']['EN'] = "Your comment";
lang['uwCommentaar']['DE'] = "Ihr Kommentar";
lang['uwCommentaar']['ES'] = "Su comentario";
lang['uwCommentaar']['SE'] = "";
lang['uwCommentaar']['RU'] = "Ваш комментарий";

lang['uwBeoordeling'] = new Array();
lang['uwBeoordeling']['NL'] = "Uw beoordeling";
lang['uwBeoordeling']['EN'] = "Your rating";
lang['uwBeoordeling']['DE'] = "Ihr Bewertung";
lang['uwBeoordeling']['ES'] = "Su puntuación";
lang['uwBeoordeling']['SE'] = "";
lang['uwBeoordeling']['RU'] = "Ваша оценка";

lang['uwGegevens'] = new Array();
lang['uwGegevens']['NL'] = "Uw Gegevens";
lang['uwGegevens']['EN'] = "Your Profile";
lang['uwGegevens']['DE'] = "Ihre Daten";
lang['uwGegevens']['ES'] = "Sus datos";
lang['uwGegevens']['SE'] = "";
lang['uwGegevens']['RU'] = "Ваш профиль";

lang['waarderingVersturen'] = new Array();
lang['waarderingVersturen']['NL'] = "Versturen";
lang['waarderingVersturen']['EN'] = "Submit";
lang['waarderingVersturen']['DE'] = "Schicken";
lang['waarderingVersturen']['ES'] = "Enviar";
lang['waarderingVersturen']['SE'] = "";
lang['waarderingVersturen']['RU'] = "Отправить";

lang['naamNietIngevuld'] = new Array();
lang['naamNietIngevuld']['NL'] = "Uw naam is niet ingevuld";
lang['naamNietIngevuld']['EN'] = "Please enter your name";
lang['naamNietIngevuld']['DE'] = "Ihre Name fehlt";
lang['naamNietIngevuld']['ES'] = "Por favor indica su nombre";
lang['naamNietIngevuld']['SE'] = "";
lang['naamNietIngevuld']['RU'] = "Пожалуйста, укажите Ваше имя";

lang['toeristisch'] = new Array();
lang['toeristisch']['NL'] = "Toeristisch";
lang['toeristisch']['EN'] = "Touristic";
lang['toeristisch']['DE'] = "Turismus";
lang['toeristisch']['ES'] = "Turístico";
lang['toeristisch']['SE'] = "";
lang['toeristisch']['RU'] = "Туризм";

lang['fotos'] = new Array();
lang['fotos']['NL'] = "Fotoalbum";
lang['fotos']['EN'] = "Pictures";
lang['fotos']['DE'] = "Fotoalbum";
lang['fotos']['ES'] = "Album de fotos";
lang['fotos']['SE'] = "";
lang['fotos']['RU'] = "Фотоальбом";

lang['weer'] = new Array();
lang['weer']['NL'] = "Het Weer";
lang['weer']['EN'] = "The Weather";
lang['weer']['DE'] = "Das Wetter";
lang['weer']['ES'] = "El clima";
lang['weer']['SE'] = "";
lang['weer']['RU'] = "Климат";

lang['vandaag'] = new Array();
lang['vandaag']['NL'] = "Vandaag";
lang['vandaag']['EN'] = "Today";
lang['vandaag']['DE'] = "Heute";
lang['vandaag']['ES'] = "Hoy";
lang['vandaag']['SE'] = "";
lang['vandaag']['RU'] = "Сегодня";

lang['morgen'] = new Array();
lang['morgen']['NL'] = "Morgen";
lang['morgen']['EN'] = "Tomorrow";
lang['morgen']['DE'] = "Morgen";
lang['morgen']['ES'] = "Mañana";
lang['morgen']['SE'] = "";
lang['morgen']['RU'] = "Завтра";

lang['windkracht'] = new Array();
lang['windkracht']['NL'] = "Windkracht";
lang['windkracht']['EN'] = "Wind strength";
lang['windkracht']['DE'] = "Windkraft";
lang['windkracht']['ES'] = "Velocidad de viento";
lang['windkracht']['SE'] = "";
lang['windkracht']['RU'] = "Скорость ветра";

lang['open'] = new Array();
lang['open']['NL'] = "Openingstijden";
lang['open']['EN'] = "Opening hours";
lang['open']['DE'] = "Öffnungszeiten";
lang['open']['ES'] = "Horarios";
lang['open']['SE'] = "";
lang['open']['RU'] = "Режим работы";

lang['price'] = new Array();
lang['price']['NL'] = "Prijzen";
lang['price']['EN'] = "Prices";
lang['price']['DE'] = "Preisen";
lang['price']['ES'] = "Precios";
lang['price']['SE'] = "";
lang['price']['RU'] = "Цены";

lang['routeVoet'] = new Array();
lang['routeVoet']['NL'] = "Route per voet";
lang['routeVoet']['EN'] = "Walking";
lang['routeVoet']['DE'] = "Walking";
lang['routeVoet']['ES'] = "Walking";
lang['routeVoet']['SE'] = "";
lang['routeVoet']['RU'] = "Пешком";

lang['routeAuto'] = new Array();
lang['routeAuto']['NL'] = "Route per auto";
lang['routeAuto']['EN'] = "Car";
lang['routeAuto']['DE'] = "Car";
lang['routeAuto']['ES'] = "Car";
lang['routeAuto']['SE'] = "";
lang['routeAuto']['RU'] = "На автомобиле";

lang['thanksMessage'] = new Array();
lang['thanksMessage']['NL'] = "Bedankt voor uw bericht";
lang['thanksMessage']['EN'] = "Thanks for your message";
lang['thanksMessage']['DE'] = "Thanks for your message";
lang['thanksMessage']['ES'] = "Thanks for your message";
lang['thanksMessage']['SE'] = "";
lang['thanksMessage']['RU'] = "Спасибо за Ваше сообщение";

lang['errorSendingMessage'] = new Array();
lang['errorSendingMessage']['NL'] = "Niet alle velden zijn ingevuld";
lang['errorSendingMessage']['EN'] = "Not all fields are filled in";
lang['errorSendingMessage']['DE'] = "Not all fields are filled in";
lang['errorSendingMessage']['ES'] = "Not all fields are filled in";
lang['errorSendingMessage']['SE'] = "";
lang['errorSendingMessage']['RU'] = "Не все поля заполнены";

lang['msgFirstName'] = new Array();
lang['msgFirstName']['NL'] = "Voornaam";
lang['msgFirstName']['EN'] = "Name";
lang['msgFirstName']['DE'] = "Name";
lang['msgFirstName']['ES'] = "Nombre";
lang['msgFirstName']['SE'] = "";
lang['msgFirstName']['RU'] = "Имя";

lang['msgLastName'] = new Array();
lang['msgLastName']['NL'] = "Achternaam";
lang['msgLastName']['EN'] = "Surname";
lang['msgLastName']['DE'] = "Familiennamen";
lang['msgLastName']['ES'] = "Apellidos";
lang['msgLastName']['SE'] = "";
lang['msgLastName']['RU'] = "Фамилия";

lang['msgEmail'] = new Array();
lang['msgEmail']['NL'] = "E-mailadres";
lang['msgEmail']['EN'] = "E-mail";
lang['msgEmail']['DE'] = "E-mail";
lang['msgEmail']['ES'] = "E-mail";
lang['msgEmail']['SE'] = "";
lang['msgEmail']['RU'] = "E-mail";

lang['msgMessage'] = new Array();
lang['msgMessage']['NL'] = "Uw commentaar";
lang['msgMessage']['EN'] = "Your comment";
lang['msgMessage']['DE'] = "Ihr Kommentar";
lang['msgMessage']['ES'] = "Su comentario";
lang['msgMessage']['SE'] = "";
lang['msgMessage']['RU'] = "Ваш комментарий";

lang['msgSubmit'] = new Array();
lang['msgSubmit']['NL'] = "Versturen";
lang['msgSubmit']['EN'] = "Submit";
lang['msgSubmit']['DE'] = "Schicken";
lang['msgSubmit']['ES'] = "Enviar";
lang['msgSubmit']['SE'] = "";
lang['msgSubmit']['RU'] = "Отправить";

(function($) {
 
  $.fn.tweet = function(o){
    var s = {
      username: ["seaofclouds"],              // [string]   required, unless you want to display our tweets. :) it can be an array, just do ["username1","username2","etc"]
      list: null,                              //[string]   optional name of list belonging to username
      avatar_size: null,                      // [integer]  height and width of avatar if displayed (48px max)
      count: 3,                               // [integer]  how many tweets to display?
      intro_text: null,                       // [string]   do you want text BEFORE your your tweets?
      outro_text: null,                       // [string]   do you want text AFTER your tweets?
      join_text:  null,                       // [string]   optional text in between date and tweet, try setting to "auto"
      auto_join_text_default: "i said,",      // [string]   auto text for non verb: "i said" bullocks
      auto_join_text_ed: "i",                 // [string]   auto text for past tense: "i" surfed
      auto_join_text_ing: "i am",             // [string]   auto tense for present tense: "i was" surfing
      auto_join_text_reply: "i replied to",   // [string]   auto tense for replies: "i replied to" @someone "with"
      auto_join_text_url: "i was looking at", // [string]   auto tense for urls: "i was looking at" http:...
      loading_text: null,                     // [string]   optional loading text, displayed while tweets load
      query: null                             // [string]   optional search query
    };
    
    if(o) $.extend(s, o);
    
    $.fn.extend({
      linkUrl: function() {
        var returning = [];
        var regexp = /((ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?)/gi;
        this.each(function() {
          returning.push(this.replace(regexp,"<a href=\"$1\">$1</a>"));
        });
        return $(returning);
      },
      linkUser: function() {
        var returning = [];
        var regexp = /[\@]+([A-Za-z0-9-_]+)/gi;
        this.each(function() {
          returning.push(this.replace(regexp,"<a href=\"http://twitter.com/$1\">@$1</a>"));
        });
        return $(returning);
      },
      linkHash: function() {
        var returning = [];
        var regexp = /(?:^| )[\#]+([A-Za-z0-9-_]+)/gi;
        this.each(function() {
          returning.push(this.replace(regexp, ' <a href="http://search.twitter.com/search?q=&tag=$1&lang=all&from='+s.username.join("%2BOR%2B")+'">#$1</a>'));
        });
        return $(returning);
      },
      capAwesome: function() {
        var returning = [];
        this.each(function() {
          returning.push(this.replace(/\b(awesome)\b/gi, '<span class="awesome">$1</span>'));
        });
        return $(returning);
      },
      capEpic: function() {
        var returning = [];
        this.each(function() {
          returning.push(this.replace(/\b(epic)\b/gi, '<span class="epic">$1</span>'));
        });
        return $(returning);
      },
      makeHeart: function() {
        var returning = [];
        this.each(function() {
          returning.push(this.replace(/(&lt;)+[3]/gi, "<tt class='heart'>&#x2665;</tt>"));
        });
        return $(returning);
      }
    });

    function parse_date(date_str) {
      // The non-search twitter APIs return inconsistently-formatted dates, which Date.parse
      // cannot handle in IE. We therefore perform the following transformation:
      // "Wed Apr 29 08:53:31 +0000 2009" => "Wed, Apr 29 2009 08:53:31 +0000"
      return Date.parse(date_str.replace(/^([a-z]{3})( [a-z]{3} \d\d?)(.*)( \d{4})$/i, '$1,$2$4$3'));
    }

    function relative_time(time_value) {
      var parsed_date = parse_date(time_value);
      var relative_to = (arguments.length > 1) ? arguments[1] : new Date();
      var delta = parseInt((relative_to.getTime() - parsed_date) / 1000);
      var pluralize = function (singular, n) {
        return '' + n + ' ' + singular + (n == 1 ? '' : 's');
      };
      if(delta < 60) {
      return 'less than a minute ago';
      } else if(delta < (60*60)) {
      return 'about ' + pluralize("minute", parseInt(delta / 60)) + ' ago';
      } else if(delta < (24*60*60)) {
      return 'about ' + pluralize("hour", parseInt(delta / 3600)) + ' ago';
      } else {
      return 'about ' + pluralize("day", parseInt(delta / 86400)) + ' ago';
      }
    }

    function build_url() {
      var proto = ('https:' == document.location.protocol ? 'https:' : 'http:');
      if (s.list) {
        return proto+"//api.twitter.com/1/"+s.username[0]+"/lists/"+s.list+"/statuses.json?per_page="+s.count+"&callback=?";
      } else if (s.query == null && s.username.length == 1) {
        return proto+'//api.twitter.com/1/statuses/user_timeline.json?screen_name='+s.username[0]+'&count='+s.count+'&callback=?';
      } else {
        var query = (s.query || 'from:'+s.username.join(' OR from:'));
        return proto+'//search.twitter.com/search.json?&q='+escape(query)+'&rpp='+s.count+'&callback=?';
      }
    }

    return this.each(function(i, widget){
      var list = $('<ul class="tweet_list">').appendTo(widget);
      var intro = '<p class="tweet_intro">'+s.intro_text+'</p>';
      var outro = '<p class="tweet_outro">'+s.outro_text+'</p>';
      var loading = $('<p class="loading">'+s.loading_text+'</p>');

      if(typeof(s.username) == "string"){
        s.username = [s.username];
      }

      if (s.loading_text) $(widget).append(loading);
      $.getJSON(build_url(), function(data){
        if (s.loading_text) loading.remove();
        if (s.intro_text) list.before(intro);
        var tweets = (data.results || data);
        $.each(tweets, function(i,item){
          // auto join text based on verb tense and content
          if (s.join_text == "auto") {
            if (item.text.match(/^(@([A-Za-z0-9-_]+)) .*/i)) {
              var join_text = s.auto_join_text_reply;
            } else if (item.text.match(/(^\w+:\/\/[A-Za-z0-9-_]+\.[A-Za-z0-9-_:%&\?\/.=]+) .*/i)) {
              var join_text = s.auto_join_text_url;
            } else if (item.text.match(/^((\w+ed)|just) .*/im)) {
              var join_text = s.auto_join_text_ed;
            } else if (item.text.match(/^(\w*ing) .*/i)) {
              var join_text = s.auto_join_text_ing;
            } else {
              var join_text = s.auto_join_text_default;
            }
          } else {
            var join_text = s.join_text;
          };

          var from_user = item.from_user || item.user.screen_name;
          var profile_image_url = item.profile_image_url || item.user.profile_image_url;
          var join_template = '<span class="tweet_join"> '+join_text+' </span>';
          var join = ((s.join_text) ? join_template : ' ');
          var avatar_template = '<a class="tweet_avatar" href="http://twitter.com/'+from_user+'"><img src="'+profile_image_url+'" height="'+s.avatar_size+'" width="'+s.avatar_size+'" alt="'+from_user+'\'s avatar" title="'+from_user+'\'s avatar" border="0"/></a>';
          var avatar = (s.avatar_size ? avatar_template : '');
          var date = '<span class="tweet_time"><a href="http://twitter.com/'+from_user+'/statuses/'+item.id+'" title="view tweet on twitter">'+relative_time(item.created_at)+'</a></span>';
          var text = '<span class="tweet_text">' +$([item.text]).linkUrl().linkUser().linkHash().makeHeart().capAwesome().capEpic()[0]+ '</span>';

          // until we create a template option, arrange the items below to alter a tweet's display.
          list.append('<li>' + avatar + date + join + text + '</li>');

          list.children('li:first').addClass('tweet_first');
          list.children('li:odd').addClass('tweet_even');
          list.children('li:even').addClass('tweet_odd');
        });
        if (s.outro_text) list.after(outro);
        $(widget).trigger("loaded").trigger((tweets.length == 0 ? "empty" : "full"));
      });

    });
  };
})(jQuery);


function createTables(db) {

    msg('creating tables', 1);

    db.transaction(
	function (transaction) {

	    transaction.executeSql('\
	    CREATE TABLE IF NOT EXISTS `regios` (\
		`id`		INTEGER PRIMARY KEY,\
		`naam`		VARCHAR(128),\
                `gebied`        INTEGER,\
		`lon`		VARCHAR(128),\
		`lat`		VARCHAR(128),\
                `weather_lon`	VARCHAR(128),\
		`weather_lat`	VARCHAR(128),\
                `WOEID`         VARCHAR(128),\
                `NL`		TEXT,\
                `EN`		TEXT,\
                `DE`		TEXT,\
                `ES`		TEXT,\
                `RU`		TEXT\
	    );', [], nullDataHandler, errorHandler);

            transaction.executeSql('\
	    CREATE TABLE IF NOT EXISTS `gebieden` (\
		`id`		INTEGER PRIMARY KEY,\
                `NL`		TEXT,\
                `EN`		TEXT,\
                `DE`		TEXT,\
                `ES`		TEXT,\
                `RU`		TEXT,\
                `ORDER`         INTEGER\
	    );', [], nullDataHandler, errorHandler);


	    // transaction.executeSql('\
		// CREATE INDEX IF NOT EXISTS `index_account_card_1` ON  `account_card` (`get_card_id`)', [], nullDataHandler, errorHandler);

		transaction.executeSql('\
	    CREATE TABLE IF NOT EXISTS `regio_types` (\
		`regio_id`		INTEGER,\
		`type_id`		INTEGER\
	    );', [], nullDataHandler, errorHandler);


		transaction.executeSql('\
	    CREATE TABLE IF NOT EXISTS `types` (\
		`id`		INTEGER PRIMARY KEY,\
		`icon`		BLOB,\
		`NL`		VARCHAR(128),\
		`EN`		VARCHAR(128),\
		`DE`		VARCHAR(128),\
		`ES`		VARCHAR(128),\
		`RU`		VARCHAR(128),\
		`order`		INTEGER\
	    );', [], nullDataHandler, errorHandler);

		//transaction.executeSql('\
		//CREATE INDEX IF NOT EXISTS `index_types_regio_id` ON  `types` (`regio_id`)', [], nullDataHandler, errorHandler);



		transaction.executeSql('\
                    CREATE TABLE IF NOT EXISTS `spots` (\
                        `id`			INTEGER PRIMARY KEY,\
                        `photo`			LONGBLOB,\
                        `regio_id`		INTEGER,\
                        `type_id`		INTEGER,\
                        `lon`			VARCHAR(128),\
                        `lat`			VARCHAR(128),\
                        `naam`			VARCHAR(128),\
                        `naam_NL`		VARCHAR(128),\
                        `naam_EN`		VARCHAR(128),\
                        `naam_DE`		VARCHAR(128),\
                        `naam_ES`		VARCHAR(128),\
                        `naam_RU`		VARCHAR(128),\
                        `adres_1`		VARCHAR(128),\
                        `adres_2`		VARCHAR(128),\
                        `plaats`		VARCHAR(128),\
                        `tel`			VARCHAR(25),\
                        `email`			VARCHAR(128),\
                        `website`               VARCHAR(128),\
                        `facebook`		VARCHAR(128),\
                        `twitter`		VARCHAR(128),\
                        `NL`			TEXT,\
                        `EN`			TEXT,\
                        `DE`			TEXT,\
                        `ES`			TEXT,\
                        `RU`			TEXT,\
                        `open_NL`		TEXT,\
                        `open_EN`		TEXT,\
                        `open_DE`		TEXT,\
                        `open_ES`               TEXT,\
                        `open_RU`               TEXT,\
                        `price_NL`		TEXT,\
                        `price_EN`		TEXT,\
                        `price_DE`		TEXT,\
                        `price_ES`              TEXT,\
                        `price_RU`              TEXT,\
                        `showOnHome`            TEXT,\
                        `numFotos`              INTEGER,\
                        `rating`		DECIMAL(2,1)\
                );', [], nullDataHandler, errorHandler);

		//transaction.executeSql('\
		//CREATE INDEX IF NOT EXISTS `index_types_regio_id` ON  `types` (`regio_id`)', [], nullDataHandler, errorHandler);


               transaction.executeSql('\
                CREATE TABLE IF NOT EXISTS `comments` (\
                    `id`            INTEGER PRIMARY KEY,\
                    `spot_id`       INTEGER,\
                    `naam`          VARCHAR(128),\
                    `rate`          VARCHAR(1),\
                    `comment`       TEXT,\
                    `lang`          VARCHAR(2),\
                    `submit`        BOOL\
                );', [], nullDataHandler, errorHandler);


	    transaction.executeSql('\
	    CREATE TABLE IF NOT EXISTS `last_change` (\
		`id`		INTEGER		NOT NULL PRIMARY KEY,\
		`name`		VARCHAR(32)	,\
		`item_id`	INTEGER		,\
		`last_change`	INTEGER		,\
		`last_client_check`	INTEGER	\
	    );', [], nullDataHandler, errorHandler);

	    transaction.executeSql('\
	    CREATE TABLE IF NOT EXISTS `settings` (\
		`id`		VARCHAR(32)	NOT NULL PRIMARY KEY,\
		`value`		VARCHAR(32)	\
	    );', [], nullDataHandler, errorHandler);

	    transaction.executeSql('\
	    CREATE TABLE IF NOT EXISTS `favourites` (\
		`id`		INTEGER		NOT NULL PRIMARY KEY,\
		`spot_id`	VARCHAR(32)	,\
		`user_id`	VARCHAR(32)	,\
		`added`		INTEGER\
	    );', [], nullDataHandler, errorHandler);


            transaction.executeSql('\
            CREATE TABLE IF NOT EXISTS `nearby` (\
                `id`		VARCHAR(32)	NOT NULL PRIMARY KEY,\
                `from_spot_id`		INTEGER,\
                `spot_id`		INTEGER,\
                `distance`		VARCHAR(32)\
            );', [], nullDataHandler, errorHandler);


	}
    );
}

function dropTables(db) {

    msg('dropping tables', 1);

    db.transaction(
	function (transaction) {
	    transaction.executeSql('DROP TABLE IF EXISTS `regios`;', [], nullDataHandler, errorHandler);
             transaction.executeSql('DROP TABLE IF EXISTS `gebieden`;', [], nullDataHandler, errorHandler);
	    transaction.executeSql('DROP TABLE IF EXISTS `regio_types`;', [], nullDataHandler, errorHandler);
            // transaction.executeSql('DROP TABLE IF EXISTS `favourites`;', [], nullDataHandler, errorHandler);
            transaction.executeSql('DROP TABLE IF EXISTS `types`;', [], nullDataHandler, errorHandler);
            transaction.executeSql('DROP TABLE IF EXISTS `spots`;', [], nullDataHandler, errorHandler);
            transaction.executeSql('DROP TABLE IF EXISTS `comments`;', [], nullDataHandler, errorHandler);
            transaction.executeSql('DROP TABLE IF EXISTS `nearby`;', [], nullDataHandler, errorHandler);

	    ///////
            transaction.executeSql('DROP TABLE IF EXISTS `last_change`;', [], nullDataHandler, errorHandler);
	    transaction.executeSql('DROP TABLE IF EXISTS `settings`;', [], nullDataHandler, errorHandler);

	}
    );

}

function addFav(spot, user_id) {
    save_ByPK('favourites', {}, {
            spot_id:	spot,
            user_id:	user_id
    });
    
    save_ByPK_commit();
    
    $('#S_' + spot + '_' + settings['lang'] + ' .favIcon.removeFav').show();
    $('#S_' + spot + '_' + settings['lang'] + ' .favIcon.addFav').hide();
    
    check_favs();
//    alert('Div = ' + $('#jqt div.current').attr('id'));
//    alert('Toegevoegd');
}

function removeFav(spot, user_id) { 
    
    db.transaction(
            function (transaction) {
                    transaction.executeSql("DELETE FROM `favourites` WHERE `spot_id` = '" + spot + "' AND `user_id` = '" + user_id + "';", [], function(transaction, resultSet) {
                            $('#S_' + spot + '_' + settings['lang'] + ' .favIcon.removeFav').hide();
                            $('#S_' + spot + '_' + settings['lang'] + ' .favIcon.addFav').show();
                    }, errorHandler);
    });
    
    check_favs();
//    alert('Div = ' + $('#jqt div.current').attr('id'));
//    alert('Verwijderd');
}        


function select_favs(start) {
    
    if(!start) start = 0;
    if(start == 0) $('#ul_favs li.results').remove();
    var visFavs = $('#ul_favs li.results').length;

    
    if(visFavs != settings['num_favs']) {    
    
        $('#fav div.loading').show();
        
        
        db.transaction(
                    function (transaction) {
                        transaction.executeSql("\
                            SELECT		`favourites`.`spot_id`,`spots`.`photo`,`spots`.`naam`, `spots`.`rating`, `regios`.`naam` AS `regioNaam` ,`types`.`" + settings['lang'] + "` AS `typeNaam`\
                            FROM		`favourites`\
                            LEFT JOIN `spots` ON `favourites`.`spot_id` = `spots`.`id`\
                            LEFT JOIN `types` ON `types`.`id` = `spots`.`type_id`\
                            LEFT JOIN `regios` ON `regios`.`id` = `spots`.`regio_id`\
                            WHERE           `favourites`.`user_id` = " + settings['user_id'] + "\
                            ORDER BY `favourites`.`id` DESC\
                            LIMIT "+ start + ", " + settings['max_results'] + "\
                            ;", [], show_favs, errorHandler);
                        transaction.executeSql("DELETE FROM `favourites` WHERE `user_id` != '" + settings['user_id'] + "' ;", [], function(transaction, resultSet) {}, errorHandler);
                    }
        ) 
            
    }
}




function show_favs(transaction, resultSet) {
    
    var ul = "#ul_favs";
    
    $(ul + ' li').not('.results').remove();
    $('#fav div.loading').hide();
    
    if(resultSet.rows.length == 0 && settings['fav_start'] == 0) {
        $(ul).append('<li>'+ lang['geenFavs'][settings['lang']] +'</li>');
    }
    else{
        for (var i=0; i < resultSet.rows.length; i++) {
            item = resultSet.rows.item(i);
            if(item.naam  == null) {
                removeFav(item.spot_id, settings['user_id']);
            }
            if($(ul + ' li.item_' + item.spot_id + '').length == 0) {
                $(ul).append('\
                    <li class="arrow results item_' + item.spot_id + '">\
                        <a href="#" onclick="getSpot(\''+ item.spot_id +'\',\''+ item.naam +'\');">\
                            <div class="results_photo"><img src="./img/loader.gif" class="results_loader"></div>\
                            <h1>'+ item.naam +'</h1><span class="stars inResults favs_'+ item.spot_id +'_'+ settings['lang'] +'"></span>\
                            <p>' + item.typeNaam + ', ' + item.regioNaam + '</p>\
                        </a>\
                    </li>');		
                if(item.rating > 0) stars('favs_' + item.spot_id + '_' + settings['lang'] + '', item.rating);


                if(null != item.photo.length) {
                    if(item.photo.length > 0 && $(ul + ' li.item_' + item.spot_id + ' img.results_loader').length == 1) {
                        $(ul + ' li.item_' + item.spot_id + ' img.results_loader').attr('src', 'data:image/jpeg;base64,' + item.photo).removeClass('loader').addClass('resultImg');
                    }
                }
            }
        }
    }
    
    var visFavs = $('#ul_favs li.results').length;
    
    if(visFavs < settings['num_favs']) {
        $(ul).append('<li class="more"><a href="#" onclick="select_favs(\''+ visFavs +'\');">' + lang['laadMeer'][settings['lang']] + '</a></li>');
    }
        
}

function check_favs() {
    db.transaction(
		function (transaction) {
		    transaction.executeSql("\
			SELECT		`favourites`.`spot_id`, `spots`.`naam`\
			FROM		`favourites`\
                        LEFT JOIN `spots` ON `favourites`.`spot_id` = `spots`.`id`\
			WHERE           `favourites`.`user_id` = " + settings['user_id'] + "\
                        AND `spots`.`naam` != ''\
			;", [], return_favs, errorHandler);
		}                
    );
   
}

function return_favs(transaction, resultSet) {
    
    save_Setting('num_favs', '' + resultSet.rows.length + '');
    
    if(settings['num_favs'] > 0 && $('#regios #ul_menu li.favourites').length == 0) {
        $('#regios #ul_menu').append('<li class="favourites"><a href="#" onclick="getFav();" id="favBtn"><small class="favourites"></small>' + lang['favorieten'][settings['lang']] + '<small class="counter" id="numFavs">' + settings['num_favs'] + '</small></a></li>').show();
    }
    else if(settings['num_favs'] ==  0) {
        $('#regios #ul_menu li.favourites').remove();
        if($('#regios #ul_menu li').length == 0) $('#regios #ul_menu').hide();
    }
    $('#numFavs').html('' + settings['num_favs'] + '');
}



function setCookie(c_name,value,exdays){
	var exdate=new Date();
	exdate.setDate(exdate.getDate() + exdays);
	var c_value=escape(value) + ((exdays==null) ? "" : "; expires="+exdate.toUTCString());
	document.cookie=c_name + "=" + c_value;
}

function getCookie(c_name){
	var i,x,y,ARRcookies=document.cookie.split(";");
	for (i=0;i<ARRcookies.length;i++){
		x=ARRcookies[i].substr(0,ARRcookies[i].indexOf("="));
		y=ARRcookies[i].substr(ARRcookies[i].indexOf("=")+1);
		x=x.replace(/^\s+|\s+$/g,"");
		if (x==c_name){
			return unescape(y);
		}
	}
}

(function(){
var b=void 0,g;
function k(a){this.extend(k,google.maps.OverlayView);this.b=[];this.d=null;this.g=100;this.m=!1;a=a||{};if(a.backgroundColor==b)a.backgroundColor=this.z;if(a.borderColor==b)a.borderColor=this.A;if(a.borderRadius==b)a.borderRadius=this.B;if(a.borderWidth==b)a.borderWidth=this.C;if(a.padding==b)a.padding=this.F;if(a.arrowPosition==b)a.arrowPosition=this.u;a.disableAutoPan==b&&(a.disableAutoPan=!1);a.disableAnimation==b&&(a.disableAnimation=!1);if(a.minWidth==b)a.minWidth=this.D;if(a.shadowStyle==b)a.shadowStyle=
this.G;if(a.arrowSize==b)a.arrowSize=this.v;if(a.arrowStyle==b)a.arrowStyle=this.w;l(this);this.setValues(a)}window.InfoBubble=k;g=k.prototype;g.v=15;g.w=0;g.G=1;g.D=50;g.u=50;g.F=10;g.C=1;g.A="#ccc";g.B=10;g.z="#fff";g.extend=function(a,c){return function(a){for(var c in a.prototype)this.prototype[c]=a.prototype[c];return this}.apply(a,[c])};
function l(a){var c=a.c=document.createElement("DIV");c.style.position="absolute";c.style.zIndex=a.g;(a.i=document.createElement("DIV")).style.position="relative";var d=a.l=document.createElement("IMG");d.style.position="absolute";d.style.width=n(12);d.style.height=n(12);d.style.border=0;d.style.zIndex=a.g+1;d.style.cursor="pointer";d.src="http://maps.gstatic.com/intl/en_us/mapfiles/iw_close.gif";google.maps.event.addDomListener(d,"click",function(){a.close();google.maps.event.trigger(a,"closeclick")});
var e=a.e=document.createElement("DIV");e.style.overflowX="auto";e.style.overflowY="auto";e.style.cursor="default";e.style.clear="both";e.style.position="relative";var f=a.j=document.createElement("DIV");e.appendChild(f);f=a.L=document.createElement("DIV");f.style.position="relative";var i=a.n=document.createElement("DIV"),h=a.k=document.createElement("DIV"),j=q(a);i.style.position=h.style.position="absolute";i.style.left=h.style.left="50%";i.style.height=h.style.height="0";i.style.width=h.style.width=
"0";i.style.marginLeft=n(-j);i.style.borderWidth=n(j);i.style.borderBottomWidth=0;j=a.a=document.createElement("DIV");j.style.position="absolute";c.style.display=j.style.display="none";c.appendChild(a.i);c.appendChild(d);c.appendChild(e);f.appendChild(i);f.appendChild(h);c.appendChild(f);c=document.createElement("style");c.setAttribute("type","text/css");a.h="_ibani_"+Math.round(1E4*Math.random());c.textContent="."+a.h+"{-webkit-animation-name:"+a.h+";-webkit-animation-duration:0.5s;-webkit-animation-iteration-count:1;}@-webkit-keyframes "+
a.h+" {from {-webkit-transform: scale(0)}50% {-webkit-transform: scale(1.2)}90% {-webkit-transform: scale(0.95)}to {-webkit-transform: scale(1)}}";document.getElementsByTagName("head")[0].appendChild(c)}g.ca=function(a){this.set("backgroundClassName",a)};k.prototype.setBackgroundClassName=k.prototype.ca;k.prototype.M=function(){this.j.className=this.get("backgroundClassName")};k.prototype.backgroundClassName_changed=k.prototype.M;k.prototype.oa=function(a){this.set("tabClassName",a)};
k.prototype.setTabClassName=k.prototype.oa;k.prototype.ra=function(){t(this)};k.prototype.tabClassName_changed=k.prototype.ra;k.prototype.ba=function(a){this.set("arrowStyle",a)};k.prototype.setArrowStyle=k.prototype.ba;k.prototype.K=function(){this.p()};k.prototype.arrowStyle_changed=k.prototype.K;function q(a){return parseInt(a.get("arrowSize"),10)||0}k.prototype.aa=function(a){this.set("arrowSize",a)};k.prototype.setArrowSize=k.prototype.aa;k.prototype.p=function(){this.r()};
k.prototype.arrowSize_changed=k.prototype.p;k.prototype.$=function(a){this.set("arrowPosition",a)};k.prototype.setArrowPosition=k.prototype.$;k.prototype.J=function(){this.n.style.left=this.k.style.left=(parseInt(this.get("arrowPosition"),10)||0)+"%";u(this)};k.prototype.arrowPosition_changed=k.prototype.J;k.prototype.setZIndex=function(a){this.set("zIndex",a)};k.prototype.setZIndex=k.prototype.setZIndex;k.prototype.getZIndex=function(){return parseInt(this.get("zIndex"),10)||this.g};
k.prototype.ta=function(){var a=this.getZIndex();this.c.style.zIndex=this.g=a;this.l.style.zIndex=a+1};k.prototype.zIndex_changed=k.prototype.ta;k.prototype.ma=function(a){this.set("shadowStyle",a)};k.prototype.setShadowStyle=k.prototype.ma;
k.prototype.pa=function(){var a="",c="",d="";switch(parseInt(this.get("shadowStyle"),10)||0){case 0:a="none";break;case 1:c="40px 15px 10px rgba(33,33,33,0.3)";d="transparent";break;case 2:c="0 0 2px rgba(33,33,33,0.3)",d="rgba(33,33,33,0.35)"}this.a.style.boxShadow=this.a.style.webkitBoxShadow=this.a.style.MozBoxShadow=c;this.a.style.backgroundColor=d;if(this.m)this.a.style.display=a,this.draw()};k.prototype.shadowStyle_changed=k.prototype.pa;
k.prototype.qa=function(){this.set("hideCloseButton",!1)};k.prototype.showCloseButton=k.prototype.qa;k.prototype.P=function(){this.set("hideCloseButton",!0)};k.prototype.hideCloseButton=k.prototype.P;k.prototype.Q=function(){this.l.style.display=this.get("hideCloseButton")?"none":""};k.prototype.hideCloseButton_changed=k.prototype.Q;k.prototype.da=function(a){a&&this.set("backgroundColor",a)};k.prototype.setBackgroundColor=k.prototype.da;
k.prototype.N=function(){var a=this.get("backgroundColor");this.e.style.backgroundColor=a;this.k.style.borderColor=a+" transparent transparent";t(this)};k.prototype.backgroundColor_changed=k.prototype.N;k.prototype.ea=function(a){a&&this.set("borderColor",a)};k.prototype.setBorderColor=k.prototype.ea;
k.prototype.O=function(){var a=this.get("borderColor"),c=this.e,d=this.n;c.style.borderColor=a;d.style.borderColor=a+" transparent transparent";c.style.borderStyle=d.style.borderStyle=this.k.style.borderStyle="solid";t(this)};k.prototype.borderColor_changed=k.prototype.O;k.prototype.fa=function(a){this.set("borderRadius",a)};k.prototype.setBorderRadius=k.prototype.fa;function w(a){return parseInt(a.get("borderRadius"),10)||0}
k.prototype.q=function(){var a=w(this),c=x(this);this.e.style.borderRadius=this.e.style.MozBorderRadius=this.e.style.webkitBorderRadius=this.a.style.borderRadius=this.a.style.MozBorderRadius=this.a.style.webkitBorderRadius=n(a);this.i.style.paddingLeft=this.i.style.paddingRight=n(a+c);u(this)};k.prototype.borderRadius_changed=k.prototype.q;function x(a){return parseInt(a.get("borderWidth"),10)||0}k.prototype.ga=function(a){this.set("borderWidth",a)};k.prototype.setBorderWidth=k.prototype.ga;
k.prototype.r=function(){var a=x(this);this.e.style.borderWidth=n(a);this.i.style.top=n(a);var a=x(this),c=q(this),d=parseInt(this.get("arrowStyle"),10)||0,e=n(c),f=n(Math.max(0,c-a)),i=this.n,h=this.k;this.L.style.marginTop=n(-a);i.style.borderTopWidth=e;h.style.borderTopWidth=f;0==d||1==d?(i.style.borderLeftWidth=e,h.style.borderLeftWidth=f):i.style.borderLeftWidth=h.style.borderLeftWidth=0;0==d||2==d?(i.style.borderRightWidth=e,h.style.borderRightWidth=f):i.style.borderRightWidth=h.style.borderRightWidth=
0;2>d?(i.style.marginLeft=n(-c),h.style.marginLeft=n(-(c-a))):i.style.marginLeft=h.style.marginLeft=0;i.style.display=0==a?"none":"";t(this);this.q();u(this)};k.prototype.borderWidth_changed=k.prototype.r;k.prototype.la=function(a){this.set("padding",a)};k.prototype.setPadding=k.prototype.la;function y(a){return parseInt(a.get("padding"),10)||0}k.prototype.X=function(){this.e.style.padding=n(y(this));t(this);u(this)};k.prototype.padding_changed=k.prototype.X;function n(a){return a?a+"px":a}
function z(a){var c="mousedown,mousemove,mouseover,mouseout,mouseup,mousewheel,DOMMouseScroll,touchstart,touchend,touchmove,dblclick,contextmenu,click".split(","),d=a.c;a.s=[];for(var e=0,f;f=c[e];e++)a.s.push(google.maps.event.addDomListener(d,f,function(a){a.cancelBubble=!0;a.stopPropagation&&a.stopPropagation()}))}k.prototype.onAdd=function(){this.c||l(this);z(this);var a=this.getPanes();a&&(a.floatPane.appendChild(this.c),a.floatShadow.appendChild(this.a))};k.prototype.onAdd=k.prototype.onAdd;
k.prototype.draw=function(){var a=this.getProjection();if(a){var c=this.get("position");if(c){var d=0;if(this.d)d=this.d.offsetHeight;var e=A(this),f=q(this),i=parseInt(this.get("arrowPosition"),10)||0,i=i/100,a=a.fromLatLngToDivPixel(c);if(c=this.e.offsetWidth){var h=a.y-(this.c.offsetHeight+f);e&&(h-=e);var j=a.x-c*i;this.c.style.top=n(h);this.c.style.left=n(j);switch(parseInt(this.get("shadowStyle"),10)){case 1:this.a.style.top=n(h+d-1);this.a.style.left=n(j);this.a.style.width=n(c);this.a.style.height=
n(this.e.offsetHeight-f);break;case 2:c*=0.8,this.a.style.top=e?n(a.y):n(a.y+f),this.a.style.left=n(a.x-c*i),this.a.style.width=n(c),this.a.style.height=n(2)}}}else this.close()}};k.prototype.draw=k.prototype.draw;k.prototype.onRemove=function(){this.c&&this.c.parentNode&&this.c.parentNode.removeChild(this.c);this.a&&this.a.parentNode&&this.a.parentNode.removeChild(this.a);for(var a=0,c;c=this.s[a];a++)google.maps.event.removeListener(c)};k.prototype.onRemove=k.prototype.onRemove;k.prototype.R=function(){return this.m};
k.prototype.isOpen=k.prototype.R;k.prototype.close=function(){if(this.c)this.c.style.display="none",this.c.className=this.c.className.replace(this.h,"");if(this.a)this.a.style.display="none",this.a.className=this.a.className.replace(this.h,"");this.m=!1};k.prototype.close=k.prototype.close;k.prototype.open=function(a,c){var d=this;window.setTimeout(function(){B(d,a,c)},0)};
function B(a,c,d){C(a);c&&a.setMap(c);d&&(a.set("anchor",d),a.bindTo("anchorPoint",d),a.bindTo("position",d));a.c.style.display=a.a.style.display="";a.get("disableAnimation")||(a.c.className+=" "+a.h,a.a.className+=" "+a.h);u(a);a.m=!0;a.get("disableAutoPan")||window.setTimeout(function(){a.o()},200)}k.prototype.open=k.prototype.open;k.prototype.setPosition=function(a){a&&this.set("position",a)};k.prototype.setPosition=k.prototype.setPosition;k.prototype.getPosition=function(){return this.get("position")};
k.prototype.getPosition=k.prototype.getPosition;k.prototype.Y=function(){this.draw()};k.prototype.position_changed=k.prototype.Y;k.prototype.o=function(){var a=this.getProjection();if(a&&this.c){var c=this.c.offsetHeight+A(this),d=this.get("map"),e=d.getDiv().offsetHeight,f=this.getPosition(),i=a.fromLatLngToContainerPixel(d.getCenter()),f=a.fromLatLngToContainerPixel(f),c=i.y-c,e=e-i.y,i=0;0>c&&(i=(-1*c+e)/2);f.y-=i;f=a.fromContainerPixelToLatLng(f);d.getCenter()!=f&&d.panTo(f)}};
k.prototype.panToView=k.prototype.o;function D(a){var a=a.replace(/^\s*([\S\s]*)\b\s*$/,"$1"),c=document.createElement("DIV");c.innerHTML=a;if(1==c.childNodes.length)return c.removeChild(c.firstChild);for(a=document.createDocumentFragment();c.firstChild;)a.appendChild(c.firstChild);return a}function E(a){if(a)for(var c;c=a.firstChild;)a.removeChild(c)}k.prototype.setContent=function(a){this.set("content",a)};k.prototype.setContent=k.prototype.setContent;k.prototype.getContent=function(){return this.get("content")};
k.prototype.getContent=k.prototype.getContent;function C(a){if(a.j){E(a.j);var c=a.getContent();if(c){"string"==typeof c&&(c=D(c));a.j.appendChild(c);for(var c=a.j.getElementsByTagName("IMG"),d=0,e;e=c[d];d++)google.maps.event.addDomListener(e,"load",function(){var c=!a.get("disableAutoPan");u(a);c&&(0==a.b.length||0==a.d.index)&&a.o()});google.maps.event.trigger(a,"domready")}u(a)}}
function t(a){if(a.b&&a.b.length){for(var c=0,d;d=a.b[c];c++)F(a,d.f);a.d.style.zIndex=a.g;c=x(a);d=y(a)/2;a.d.style.borderBottomWidth=0;a.d.style.paddingBottom=n(d+c)}}
function F(a,c){var d=a.get("backgroundColor"),e=a.get("borderColor"),f=w(a),i=x(a),h=y(a),j=n(-Math.max(h,f)),f=n(f),p=a.g;c.index&&(p-=c.index);var d={cssFloat:"left",position:"relative",cursor:"pointer",backgroundColor:d,border:n(i)+" solid "+e,padding:n(h/2)+" "+n(h),marginRight:j,whiteSpace:"nowrap",borderRadiusTopLeft:f,MozBorderRadiusTopleft:f,webkitBorderTopLeftRadius:f,borderRadiusTopRight:f,MozBorderRadiusTopright:f,webkitBorderTopRightRadius:f,zIndex:p,display:"inline"},m;for(m in d)c.style[m]=
d[m];m=a.get("tabClassName");m!=b&&(c.className+=" "+m)}function G(a,c){c.S=google.maps.event.addDomListener(c,"click",function(){H(a,this)})}k.prototype.na=function(a){(a=this.b[a-1])&&H(this,a.f)};k.prototype.setTabActive=k.prototype.na;
function H(a,c){if(c){var d=y(a)/2,e=x(a);if(a.d){var f=a.d;f.style.zIndex=a.g-f.index;f.style.paddingBottom=n(d);f.style.borderBottomWidth=n(e)}c.style.zIndex=a.g;c.style.borderBottomWidth=0;c.style.marginBottomWidth="-10px";c.style.paddingBottom=n(d+e);a.setContent(a.b[c.index].content);C(a);a.d=c;u(a)}else a.setContent(""),C(a)}k.prototype.ia=function(a){this.set("maxWidth",a)};k.prototype.setMaxWidth=k.prototype.ia;k.prototype.U=function(){u(this)};k.prototype.maxWidth_changed=k.prototype.U;
k.prototype.ha=function(a){this.set("maxHeight",a)};k.prototype.setMaxHeight=k.prototype.ha;k.prototype.T=function(){u(this)};k.prototype.maxHeight_changed=k.prototype.T;k.prototype.ka=function(a){this.set("minWidth",a)};k.prototype.setMinWidth=k.prototype.ka;k.prototype.W=function(){u(this)};k.prototype.minWidth_changed=k.prototype.W;k.prototype.ja=function(a){this.set("minHeight",a)};k.prototype.setMinHeight=k.prototype.ja;k.prototype.V=function(){u(this)};k.prototype.minHeight_changed=k.prototype.V;
k.prototype.H=function(a,c){var d=document.createElement("DIV");d.innerHTML=a;F(this,d);G(this,d);this.i.appendChild(d);this.b.push({label:a,content:c,f:d});d.index=this.b.length-1;d.style.zIndex=this.g-d.index;this.d||H(this,d);d.className=d.className+" "+this.h;u(this)};k.prototype.addTab=k.prototype.H;k.prototype.sa=function(a,c,d){if(this.b.length&&!(0>a||a>=this.b.length)){a=this.b[a];if(c!=b)a.f.innerHTML=a.label=c;if(d!=b)a.content=d;this.d==a.f&&(this.setContent(a.content),C(this));u(this)}};
k.prototype.updateTab=k.prototype.sa;k.prototype.Z=function(a){if(this.b.length&&!(0>a||a>=this.b.length)){var c=this.b[a];c.f.parentNode.removeChild(c.f);google.maps.event.removeListener(c.f.S);this.b.splice(a,1);delete c;for(var d=0,e;e=this.b[d];d++)e.f.index=d;if(c.f==this.d)this.d=this.b[a]?this.b[a].f:this.b[a-1]?this.b[a-1].f:b,H(this,this.d);u(this)}};k.prototype.removeTab=k.prototype.Z;
function I(a,c,d){var e=document.createElement("DIV");e.style.display="inline";e.style.position="absolute";e.style.visibility="hidden";"string"==typeof a?e.innerHTML=a:e.appendChild(a.cloneNode(!0));document.body.appendChild(e);a=new google.maps.Size(e.offsetWidth,e.offsetHeight);if(c&&a.width>c)e.style.width=n(c),a=new google.maps.Size(e.offsetWidth,e.offsetHeight);if(d&&a.height>d)e.style.height=n(d),a=new google.maps.Size(e.offsetWidth,e.offsetHeight);document.body.removeChild(e);delete e;return a}
function u(a){var c=a.get("map");if(c){var d=y(a);x(a);w(a);var e=q(a),f=c.getDiv(),i=2*e,c=f.offsetWidth-i,f=f.offsetHeight-i-A(a),i=0,h=a.get("minWidth")||0,j=a.get("minHeight")||0,p=a.get("maxWidth")||0,m=a.get("maxHeight")||0,p=Math.min(c,p),m=Math.min(f,m),v=0;if(a.b.length)for(var r=0,o;o=a.b[r];r++){var s=I(o.f,p,m);o=I(o.content,p,m);if(h<s.width)h=s.width;v+=s.width;if(j<s.height)j=s.height;if(s.height>i)i=s.height;if(h<o.width)h=o.width;if(j<o.height)j=o.height}else if(r=a.get("content"),
"string"==typeof r&&(r=D(r)),r){o=I(r,p,m);if(h<o.width)h=o.width;if(j<o.height)j=o.height}p&&(h=Math.min(h,p));m&&(j=Math.min(j,m));h=Math.max(h,v);h==v&&(h+=2*d);h=Math.max(h,2*e);h>c&&(h=c);j>f&&(j=f-i);if(a.i)a.t=i,a.i.style.width=n(v);a.e.style.width=n(h);a.e.style.height=n(j)}w(a);d=x(a);c=2;a.b.length&&a.t&&(c+=a.t);e=2+d;(f=a.e)&&f.clientHeight<f.scrollHeight&&(e+=15);a.l.style.right=n(e);a.l.style.top=n(c+d);a.draw()}
function A(a){return a.get("anchor")&&(a=a.get("anchorPoint"))?-1*a.y:0}k.prototype.I=function(){this.draw()};k.prototype.anchorPoint_changed=k.prototype.I;
})();


var callback_comments, timeout_comments, timeout_comments_id;

var comments_are_updated = [];


function update_comments(timeout, callback) {

	$('#ul.comments li').not('.loading').remove();
	$('#ul.comments').append('<li class="loading">'+ lang['bezigMetLaden'][settings['lang']] +'</li>');

    if (busy['update_comments']) {
		msg('update_comments already in progress...', 32);
		return false;
    }

    comments_are_updated[settings['regio']] = true;

    if (is_online() != true) {
	    busy['update_comments'] = false;
		return false;
    }

    busy['update_comments'] = true;

    timeout_comments = timeout;
	    timeout_comments_id = window.setTimeout(function() {
		busy['update_comments'] = false;
		timeout_comments();
    }, webservice_timeout);

    callback_comments = callback;

    msg('update_comments()', 1);

    msg('get_comments', 2);

    try {

		$.post(api_url + '/calls/loadComments.php', {}, function(data) {

		    window.clearTimeout(timeout_comments_id);

		    if (!data.error) {

				var comments = data.comments;

			    regio_comments = [];

			    for (var id in comments) {

					comment_item = comments[id];

					item_id = comment_item.id;

					save_ByPK('comments', item_id, {
                                               id:          item_id,
                                               spot_id:     comment_item.spot_id,
                                               rate:        comment_item.rate,
                                               lang:        comment_item.lang,
                                               comment:     comment_item.comment
					});

					save_ByPK_commit();
					// select_comments();

				}

				    // FUNCTIE HIER

		    }
		    else {

				// TODO: Foutmelding geven
				busy['update_comments'] = false;
				timeout_comments();

		    }

		}, 'json');

    } catch (error) {

	busy['update_comments'] = false;
	window.clearTimeout(timeout_comments_id);
	timeout_comments();

    }

}

function select_comments(is_retry, callback) {

    is_retry = is_retry | false;
    callback_comments = callback || callback_comments;

    if (!is_retry)
	msg('select_comments()', 1);

    for (var i in saving) {
		if (saving[i] > 0) {
		    msg('Waiting for save... (comments)', 8);
		    window.setTimeout(function() {select_comments(true);}, 200);
		    return false;
		}
    }

    db.transaction(
		function (transaction) {
		    transaction.executeSql("\
			SELECT		`comments`.*\
			FROM		`comments`\
			WHERE           `lang` = " + settings['lang'] + "\
			;", [], show_comments, errorHandler);
		}
    );

}

function show_comments(transaction, resultSet) {
    var items = [];

    msg('show_comments()', 1);
    var ul = '#T_' + settings['regio'] + '_' + settings['type'] + '_' + settings['lang'] + ' ul.comments';
    $(ul +' li').not('.loading').remove();

    for (var i=0; i < resultSet.rows.length; i++) {
		item = resultSet.rows.item(i);
		$(ul).append('<li class="arrow"><a href="#">'+ resultSet.length +'</li>');
		items.push(item);
	}

	$(ul +' li.loading').remove();

    if (resultSet.rows.length > 0) {
		callback_comments(items);
    }
    else {
		callback_comments(null);
    }

    busy['update_comments'] = false;
}





function showMapKit()
{
    var pin = {
	lat:49.281468,
	lon:-123.104446,
	title:"Nitobi HQ",
	pinColor:"purple", 
	index:0,
	selected:true
    };
			
    var pin2 = {
	lat:49.281468,
	lon:-123.104446,
	title:"Nitobi HQ",
	pinColor:"purple", 
	index:0,
	selected:true
    };
			
			
			
    // do your thing!
    var _options = {
	buttonCallback: "cbMapCallback",
	height:360,
	diameter:1000,
	atBottom:true,
	lat:pin.lat,
	lon:pin.lon
    };
			
    window.plugins.mapKit.showMap();
    window.plugins.mapKit.setMapData([pin],_options);
			
}
		    
function hideMap()
{
    window.plugins.mapKit.hideMap();
}
		    
function resizeMap()
{
    var pin = {
	lat:49.281468,
	lon:-123.104446,
	title:"Nitobi HQ",
	pinColor:"purple", 
	index:0,
	selected:true
    };
			
    var pin2 = {
	lat:49.281468,
	lon:-123.104446,
	title:"Nitobi HQ",
	pinColor:"purple", 
	index:0,
	selected:true
    };
			
			
			
    // do your thing!
    var _options = {
	buttonCallback: "cbMapCallback",
	height:260,
	diameter:1000,
	atBottom:true,
	lat:pin.lat,
	lon:pin.lon
    };
			
    window.plugins.mapKit.showMap();
    window.plugins.mapKit.setMapData([pin],_options);
}
		    


var callback_regios, timeout_regios, timeout_regios_id;

var regios_are_updated = false;


function update_regios(timeout, callback) {

	$('#ul_regios li').not('.loading').remove();
	$('#ul_regios').append('<li class="loading">'+ lang['bezigMetLaden'][settings['lang']] +'</li>');

    if (busy['update_regios']) {
		msg('update_regios already in progress...', 32);
		return false;
    }

    regios_are_updated = true;

    if (is_online() != true) {
	    busy['update_regios'] = false;
		return false;
    }

    busy['update_regios'] = true;

    timeout_regios = timeout;
	    timeout_regios_id = window.setTimeout(function() {
		busy['update_regios'] = false;
		timeout_regios();
    }, webservice_timeout);

    callback_regios = callback;

    msg('update_regios()', 1);

    msg('get_regios', 2);

    try {

		$.post(api_url + 'calls/loadRegios.php?show=v', {}, function(data) {

		    window.clearTimeout(timeout_regios_id);

		    if (!data.error) {

				var regios = data.regios;

				truncate_table('regios', function() {

				    for (var id in regios) {

					    regio = regios[id];

					    item_id = regio.id;

					    save_ByPK('regios', item_id, {
						id:		    item_id,
						naam:	    regio.naam,
						gebied:	    regio.gebied,
						lon:	    regio.lon,
						lat:	    regio.lat,
						weather_lon:    regio.weather_lon,
						weather_lat:    regio.weather_lat,
						WOEID:          regio.WOEID,
						NL:             regio.NL,
						ES:             regio.ES,
						EN:             regio.EN,
						DE:             regio.DE
					    });
				    }

				    save_ByPK_commit();
				    select_regios();

				});

		    }
		    else {

				// TODO: Foutmelding geven
				busy['update_regios'] = false;
				timeout_regios();

		    }

		}, 'json');

    } catch (error) {

	busy['update_regios'] = false;
	window.clearTimeout(timeout_regios_id);
	timeout_regios();

    }

}

function select_regios(is_retry, callback) {

    is_retry = is_retry | false;
    callback_regios = callback || callback_regios;

    if (!is_retry)
	msg('select_regios()', 1);

    for (var i in saving) {
	if (saving[i] > 0) {
	    msg('Waiting for save... (regios)', 8);
	    window.setTimeout(function() {select_regios(true);}, 200);
	    return false;
	}
    }

    db.transaction(
		function (transaction) {
		    transaction.executeSql("\
			SELECT		`regios`.*, `gebieden`.`id` as `_gebied`, `gebieden`.`NL` AS `gebied_NL`, `gebieden`.`EN` AS `gebied_EN`, `gebieden`.`ES` AS `gebied_ES`, `gebieden`.`DE` AS `gebied_DE`\
			FROM		`regios`\
                        LEFT JOIN `gebieden` ON `regios`.`gebied` = `gebieden`.`id`\
                        ORDER BY `gebieden`.`ORDER` ASC, `naam` ASC\
			;", [], show_regios, errorHandler);
		}
    );

}

function show_regios(transaction, resultSet) {
    var regios = [];

    var gebied;

    msg('show_regios()', 1);

    $('#ul_regios li').not('.loading').remove();

    for (var i=0; i < resultSet.rows.length; i++) {
		regio = resultSet.rows.item(i);

                if(!gebied  || gebied != regio._gebied) {
                    $('#ul_regios').append('<li class="sep" id="gebied_' + regio._gebied + '"></li>');
                    var gebied_naam;

                    for(var l in langs) {
                        gebied_naam = eval('regio.gebied_' + l);
                        $('#gebied_' + regio._gebied).append('<span class="language ' + l + '" ' + (settings['lang'] != l ? 'style="display: none;"' : '' ) + '>' + gebied_naam + '</span>');
                    }
                    gebied = regio._gebied;
                }
		$('#ul_regios').append('<li class="arrow"><a href="#" onclick="getRegio(' + regio.id + ', \'' + regio.naam + '\');">'+  regio.naam +' </li>');
		regios[regio.id] = regio;
    }

    $('#regios div.loading').hide();
    $('#ul_regios li.loading').remove();

    if (resultSet.rows.length > 0) {
		callback_regios(regios);
    }
    else {
		callback_regios(null);
    }
    busy['update_regios'] = false;
}


