
		var nextLocation = "splash_screen_project_info.html"	







loadLocalizedFile(lang,"char.js");
loadLocalizedFile("cn","char.js");
loadLocalizedFile("pyn","char.js");


		var nextLocation = "menu.html"	







loadLocalizedFile("cn","ex1.js");







loadLocalizedFile(lang,"voc.js");
loadLocalizedFile("cn","voc.js");
loadLocalizedFile("pyn","voc.js");






 		setTimeout( function(){ 		$('#TextContainer').append('<p class="version">ver. ' + _localizationParts['info']['version'] + '</p>'); 		scroll.refresh(); 		}, 500); 	






loadLocalizedFile(lang,"char.js");
loadLocalizedFile("cn","char.js");
loadLocalizedFile("pyn","char.js");













loadLocalizedFile(lang,"dial.js");







loadLocalizedFile("cn","ex3.js");







loadLocalizedFile("cn","ex3.js");







loadLocalizedFile(lang,"dial.js");
loadLocalizedFile("cn","dial.js");
loadLocalizedFile("pyn","dial.js");







loadLocalizedFile("cn","ex2.js");
loadLocalizedFile(lang,"ex2.js");


var langsList = '';

function toggleCnLang(){
	if( !isShowCn() ){
		localStorage.setItem('show-cn',true);
		$("#cn-item").addClass('active');
	}
	else{
		localStorage.setItem('show-cn', false);
		$("#cn-item").removeClass('active');
	}
	
}

function togglePynLang(){
	if( !isShowPyn() ){
		localStorage.setItem('show-pyn',true);
		$("#pyn-item").addClass('active');
	}
	else{
		localStorage.setItem('show-pyn', false);
		$("#pyn-item").removeClass('active');
	}
}

function setLang(code){
	console.log('setting lang: ' + code);
	localStorage.setItem('lang',code);
	window.location.reload();
}

$.each( langs, function(ind){
	var l = langs[ind];
	langsList += '<li class="' + (lang == l.code ? "active" : "") + '"><a href="#" onclick="setLang(\'' + l.code + '\'); return false;">' + l.name + '</a></li>'
});
$('#langList').html(langsList);
if( isShowPyn() )
	$("#pyn-item").addClass('active');
if( isShowCn() )
	$("#cn-item").addClass('active');

var charList = '';
var showPyn = isShowPyn();
var showCn = isShowCn();
for( var i = 0; i < characters.length; ++i ){
	charList += '<li class="selectable" ><a href="characters_detail.html?ind=' + i + '">';
	charList += '<div class="en">' + characters[i].ch + '</div>';
	if( showPyn )
		charList += '<div class="pinyin">' + pyn_characters[i] + '</div>';
	if( showCn )
		charList += '<div class="cn">' + cn_characters[i] + '</div>';
	charList += '</a></li>';
}
var cList = $('#CharactersList');
cList.html(charList);

// check which exercise menu we should delete
if( _localizationParts['info'].isEx3Type1 )
	$('#ex3-menuitem').remove();
else
	$('#ex3as1-menuitem').remove();
var dialogsList = '';
$.each( dialogs, function(ind){
	var d = dialogs[ind];
	dialogsList += '<tr><td class="point">'  + d.title + '</td><td class="parts">';
	
	//<a href="dialogue.html?ind=0&amp;part=0" class="part selectable">1</a><a href="dialogue.html?ind=0&amp;part=1" class="part selectable">2</a><a href="dialogue.html?ind=0&amp;part=2" class="part selectable">3</a></td></tr>
	//dialogsList += '<li><a href="#">' + d.title + '</a>';
	//dialogsList += '<div class="parts">';
	$.each( d.Parts, function(pind){
		dialogsList += '<a href="dialogue.html?ind=' + ind +'&part=' + pind +'" class="part selectable">' + (pind+1) + '</a>';
	});
	dialogsList += '</td></tr>';
});
// add also "phantom" element
//dialogsList += '<li></li>';
$('#dialogList').html(dialogsList);

var ind = parseInt(getUrlVars()["ind"]);
var character = characters[ind];
$('#character-audio').attr('onclick','play(\'' + getCurrentModule() + '_' + getCurrentLesson() + '_C' + (ind+1) + '\' ); return false;' );

if( isShowPyn() )
	$('#character-pyn').text(pyn_characters[ind]);
else
	$('#character-pyn').hide();

$('#character-en').text( character.ch );

if( isShowCn() )
	$('#character-cn').text(cn_characters[ind]);
else
	$('#character-cn').hide();

if( character.icon != "" )
	$('#character-icon').attr("src", '../pics/'+ character.icon);
else
	$('#character-icon').parent().remove();

var vars = getUrlVars();
/* get current dialogue */
var dialogueInd = parseInt(vars["ind"]);
var part = parseInt(vars["part"]);
var dialogue = dialogs[dialogueInd];
var cn_dial = cn_dialogs[dialogueInd];
var pyn_dial = pyn_dialogs[dialogueInd];

$('#d-title').text(dialogue.title);
$('#d-cn-title').text(cn_dial.title);
/*$('#d-pyn-title').text(pyn_dial.title);*/
$('#d-icon').attr('src','../pics/'+ dialogue.icon);
/* now dialog list */
var dList = $('#DialogList');
dList.attr('base-audio-name', getCurrentModule() + '_' + getCurrentLesson() + '_D' + (dialogueInd+1) + '_');
/* set start index */
var pind = 0;
for( var pi = 0; pi < part; ++pi )
	pind += dialogue.Parts[pi].lines.length;
dList.attr('audio-start-idx', pind );

$('#dl-title').text( _localizationParts['ui'].part + ' ' + (part+1) );
for( var i = 0; i < dialogue.Parts[part].lines.length; ++i ){
	var line = '<li class="selectable"><a href="#" class="audio selectable" onclick="return false;">&nbsp;</a>';
		line += '<div class="en">' + dialogue.Parts[part].lines[i] + '</div>';
		if( isShowPyn() )
			line += '<div class="pinyin">' + pyn_dial.Parts[part].lines[i] + '</div>';
		if( isShowCn() )
			line += '<div class="cn">' + cn_dial.Parts[part].lines[i] + '</div>';
	line += '</li>';
	dList.append( line );
}


﻿var langs = [
		{ code: "bg", name: "Български" } ,  
		{ code: "cs", name: "English" } ,  
		{ code: "da", name: "Dansk" } ,  
		{ code: "de", name: "Deutsch" } ,  
		{ code: "en", name: "English" } ,  
		{ code: "es", name: "Español" } ,  
		{ code: "et", name: "Eesti" } ,  
		{ code: "fi", name: "Suomi" } ,  
		{ code: "fr", name: "Français" } ,  
		{ code: "ga", name: "Gaeilge" } ,  
		{ code: "gr", name: "ελληνικός" } ,  
		{ code: "hu", name: "Magyar" } ,  
		{ code: "it", name: "Italiano" } ,  
		{ code: "lt", name: "Lietuvių" } ,  
		{ code: "lv", name: "Latviešu" } ,  
		{ code: "mt", name: "Maltas" } ,  
		{ code: "nl", name: "Nederlands" } ,  
		{ code: "nn", name: "Norsk" } ,  
		{ code: "pl", name: "Polski" } ,  
		{ code: "pt", name: "Português" } ,  
		{ code: "ro", name: "Român" } ,  
		{ code: "sk", name: "Slovenský" } ,  
		{ code: "sl", name: "Slovenski" } ,  
		{ code: "sv", name: "Svensk" } 
	];


var offset = null;
var sourceDrag = null;
var draggable = null;
var targets = null;
var isTouch = "ontouchend" in document;


var mouseCoords = function(e){
	if(isTouch){
		var t = e.touches[0] || e.changedTouches[0];
		return { x: t.screenX, y: t.screenY };
	}
	else{
		return { x: e.pageX, y: e.pageY };
	}
};

var initDrag = function(mousePos){
	var t = $(sourceDrag);
	var pos = getPosition(t);
	offset = {
			x: 22, //mousePos.x - pos.x,
			y: 28 //mousePos.y - pos.y
	};
	draggable = t;
	draggable.css({
		position: "absolute",
		top: (pos.y) + 'px',
		left: (pos.x)+ 'px'
	});
	$("body").append(draggable);
};

var moveElem = function(e) {
	if( sourceDrag == null && draggable == null )
		return;
	e.preventDefault();
	var mousePos = mouseCoords(e);
	if( draggable == null ){
		initDrag(mousePos);
	}
	//console.log("moving x " + mousePos.x + ' y ' + mousePos.y);
	draggable.get().style.top = (mousePos.y - offset.y) + 'px';
	draggable.get().style.left = (mousePos.x - offset.x) + 'px';
	//console.log("end move");
};
var getPosition = function(e){
	var t = e.get();
	var left = 0;
	var top  = 0;
	while (t.offsetParent){
		left += t.offsetLeft;
		top  += t.offsetTop;
		t     = t.offsetParent;
	}
	left += t.offsetLeft;
	top  += t.offsetTop;
	return {x:left + scroll.x, y:top + scroll.y};
};

var isInRect = function(pt, rect){
	if( (pt.x>=rect.left && pt.x<= rect.left + rect.width)
			&& (pt.y>= rect.top && pt.y <= rect.top + rect.height))
		return true;
	return false;
};

var releaseElem = function(e){
	e.preventDefault();
	scroll.enable();
	if( draggable != null ){
		var mousePos =  mouseCoords(e);
		// check if we are in target zone
		var newParent = null;
		for( var i = 0; i < targets.length; ++i){
			var t = $(targets[i]);
			var targetPos = getPosition(t);
			var rect = {
					left: targetPos.x, 
					top: targetPos.y, 
					width: parseInt(t.css('width')), 
					height: parseInt(t.css('height')) };	
			if( isInRect(mousePos, rect)){
				// check if this is empty
				if( $(t).attr('correct-ans') == null ){
					newParent = t;
					// unbind
					if(isTouch)
						draggable.get().removeEventListener("touchstart", startDrag, true);
					else
						draggable.unbind("mousedown");
					// check ans-idx and slot-idx
					if( $(newParent).attr('slot-idx') == draggable.attr('ans-idx') )
						$(newParent).attr('correct-ans', 'true');
					else
						$(newParent).attr('correct-ans', 'false');
				}
				break;
			}
		}
		if( newParent == null )
			newParent= draggable.data("initial-parent");

		draggable.css({
			position: 'static',
			top: '0px',
			left: '0px'
		});
		$(newParent).append(draggable);
			
	}
	offset = null;
	draggable = null;
	sourceDrag = null;
};

var startDrag = function(e){
	var t = this;
	e.preventDefault();
	sourceDrag = t;
	scroll.disable();
};

var startDragEx = function(e){
	e.preventDefault();
}

var initDraggables = function(){
	if( isTouch ){
		document.addEventListener("touchmove", moveElem, true);
		document.addEventListener("touchend", releaseElem, true);
	}
	else {
		$(document).bind("mousemove", moveElem);
		$(document).bind("mouseup", releaseElem);
	}

	var drags = $(".source");
	for (var i = 0; i < drags.length; i++) {
		var obj = drags[i];
		var draggable = $(obj);
		draggable.data("initial-parent",draggable.parent());
		if( isTouch )
			draggable.get().addEventListener("touchstart", startDrag, true);
		else
			draggable.bind("mousedown", startDrag);
	}
};

function initEx2(){
	initDraggables();
}

function checkTest(){
	var isValid = true;
	for( var i = 0; i < targets.length; ++i ){
		var t = $(targets[i]);
		var ans = t.attr('correct-ans');
		if( ans == null || ans != 'true' ){
			isValid = false;
			break;
		}
	}
	$('.audio').hide();
	var ansIcon = $('.ans-icon');
	if( isValid ){
		targets.addClass('correct');
		ansIcon.addClass('correct');
	}
	else{
		targets.addClass('incorrect');
		ansIcon.addClass('incorrect');
	}
	ansIcon.show();
	$('.btn-check').hide();
	$('.btn-reload').show();
}

document.addEventListener('DOMContentLoaded', function () {
		$('.btn-reload').hide();
		var vars = getUrlVars();
		var ind = 0;
		if( vars["ind"] != undefined)
			ind = parseInt(vars["ind"]);
		// get this exercise
		var exercise = cn_ex2[ind];
		var ex2HtmlList = '';
		for( var i = 0; i < exercise.cn.length; ++i ){
			ex2HtmlList += '<li><div class="cn ex2-source"><a href="#" class="ex2-source source" ans-idx="';
			ex2HtmlList += exercise.order[i] - 1;
			/*for( var f = 0; f < exercise.order.length; ++f ) // need to find index of this char in our correct orders table
					if( exercise.order[f] == i + 1 )
						{
						ex2HtmlList += f;
						break;
						}*/
			ex2HtmlList += '">' + exercise.cn[i] + '<span>' + exercise.pyn[i] + '</span></a></div></li>'
		}
		$('#ex2-sources').html(ex2HtmlList);
		ex2HtmlList = '';
		for( var i = 0; i < exercise.cn.length; ++i ){
			ex2HtmlList += '<li><div class="cn target" slot-idx="' + i + '">&nbsp;</div></li>';
		}
		$('#ex2-targets').html(ex2HtmlList);
		targets = $('.target');
		
		$('#ex2-meaning').text(ex2[ind]);
		$('#ex2-playaudio').attr('onclick', "play('" + getCurrentModule() + '_' + getCurrentLesson() + '_E2_' + (ind+1) + "'); return false;" );
		if( ind == 0 )
			$('#ex2-prev a').hide();
		else
			$('#ex2-prev a').attr('href','exercise_2.html?ind=' + (ind - 1));

		if( ind >= cn_ex2.length - 1 )
			$('#ex2-next a').hide();
		else
			$('#ex2-next a').attr('href','exercise_2.html?ind=' + (ind + 1) );
		
		setTimeout(initEx2, 100); 
		}, false);

scroll = null;
var audioFile;
var urlVars = []; 
var isTouch = "ontouchend" in document;
removeActiveClass = function () {
		if (this.hoverTarget) {
			clearTimeout(this.hoverTimeout);
			$(this.hoverTarget).removeClass("active");
			this.hoverTarget = null;
		}
		};


function releaseAudio(){
	if( audioFile != null )
	{
		audioFile.stop();
		audioFile.release();
		audioFile = null;
	}
}		
		
function play(file){
	releaseAudio();
	audioFile = new Media('/android_asset/www/snd/' + file + '.MP3',
			// success callback
			function() {
		console.log("playAudio():Audio Success");
	},
	// error callback
	function(err) {
		console.log("playAudio():Audio Error: "+err);
	});

	// Play audio
	audioFile.play();
}		

var autoAudiosElems = new Array();
var suppressPlaying = false;

function playAllFromList(){
	if( autoAudiosElems.length == 0 || this.playTimeout != null )
		return;
	var nextAudioIdx = 0;
	var currentPos = -1;
	var audiosCount = autoAudiosElems.length;
	// release first
	releaseAudio();
	// play first audio
	suppressPlaying = false;
	autoAudiosElems[nextAudioIdx].trigger('click');
	suppressPlaying = true;
	$(autoAudiosElems[nextAudioIdx]).addClass('active');
	//currentPos = -1;// audioFile.getDuration();
	nextAudioIdx++;
	
	this.playTimeout = setInterval( function(){
		if(audioFile != null ){
			audioFile.getCurrentPosition(
				function(pos){
					if(pos > -1){
						console.log("pos " + pos + " currentPos: " + currentPos);
						// check if ended - position is the same as last one
						if( pos == currentPos ){
							releaseAudio();
							$(autoAudiosElems[nextAudioIdx-1]).removeClass('active');
						}
						else
							currentPos = pos;
					}
				}, 
				function(e){
					 console.log("Error getting pos=" + e);
			});
		}
		else{
			// get current audio
			if( nextAudioIdx >= audiosCount ){
				// when finished
				clearInterval(this.playTimeout);
				this.playTimeout = null;
				suppressPlaying = false;
				releaseAudio();
			}
			else{
				suppressPlaying = false;
				$(autoAudiosElems[nextAudioIdx]).trigger('click');
				suppressPlaying = true;
				$(autoAudiosElems[nextAudioIdx]).addClass('active');
				currentPos = -1;// audioFile.getDuration();
				nextAudioIdx++;
			}
		}
	}, 500 );
}

function loaded() {
	scroll = new iScroll('wrapper', { bounce: false, momentum: true,
			onBeforeScrollStart: function (e) {
				//console.log('iscroll onBeforeScrollStart');
				var target = e.target;
				clearTimeout(this.hoverTimeout);
				this.hoverTarget = null;
				while (target.nodeType != 1) target = target.parentNode;
				target = $(target).closest('.selectable');
				if( target != null ){
					this.hoverTimeout = setTimeout(function () {
						$(target).addClass("active");
					}, 100);
					this.hoverTarget = target;
				}
				e.preventDefault();
			},
			onScrollMove: removeActiveClass,
			onBeforeScrollEnd: removeActiveClass
	});
	
	var audiosList = $('.auto-audio-list');
	if( audiosList != null )
	{
		var baseAudioFileName = audiosList.attr('base-audio-name');
		var nbStartVal = 0;
		var audioElem = 'li';
		if( audiosList.attr('audio-start-idx') != null )
			nbStartVal = parseInt(audiosList.attr('audio-start-idx'));
		if( audiosList.attr('audio-invoke-elem') != null )
			audioElem = audiosList.attr('audio-invoke-elem');
		var audios = audiosList.find(audioElem);
		if( audios != undefined && audios != null )
		{
			var nb = 1;
			for( var i = 0; i < audios.length; ++i ){
				var elem = $(audios[i]);
				if( elem.hasClass('no-auto-audio'))
					continue;
				elem.attr('audio-nb', nbStartVal + nb);
				elem.bind( 'click', function(){
					if( suppressPlaying )
						return false;
					play( baseAudioFileName + $(this).attr('audio-nb') );
					//alert('play ' + baseAudioFileName + $(this).attr('audio-nb') );
					return false;
				});
				autoAudiosElems[autoAudiosElems.length] = elem;
				++nb;
			}
		}
	}
}

function getUrlVars() {
	var hash;
    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
    for(var i = 0; i < hashes.length; i++)
    {
        hash = hashes[i].split('=');
        urlVars.push(hash[0]);
        urlVars[hash[0]] = hash[1];
    }
    return urlVars;
}

function isShowCn(){
	var sett = localStorage.getItem('show-cn');
	if( sett == null ) return true; // set to show CN by default
	if( sett == "true" )
		return true;
	return false;
}

function isShowPyn(){
	var sett = localStorage.getItem('show-pyn');
	if( sett == null ) return true; // set to show PYN by default
	if( sett == "true" )
		return true;
	return false;
}

document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);
document.addEventListener('DOMContentLoaded', function () { setTimeout(loaded, 200); }, false);
setupL10N();


if(!window.jq||typeof jq!=="function"){var jq=function(g){function u(a){return a in s?s[a]:s[a]=RegExp("(^|\\s)"+a+"(\\s|$)")}function o(a){for(var c=0;c<a.length;c++)a.indexOf(a[c])!=c&&(a.splice(c,1),c--);return a}function v(a,c){var b=[];if(a==f)return b;for(;a;a=a.nextSibling)a.nodeType==1&&a!==c&&b.push(a);return b}function n(){}function w(a,c){a.os={};a.os.webkit=c.match(/WebKit\/([\d.]+)/)?!0:!1;a.os.android=c.match(/(Android)\s+([\d.]+)/)||c.match(/Silk-Accelerated/)?!0:!1;a.os.ipad=c.match(/(iPad).*OS\s([\d_]+)/)?
!0:!1;a.os.iphone=!a.os.ipad&&c.match(/(iPhone\sOS)\s([\d_]+)/)?!0:!1;a.os.webos=c.match(/(webOS|hpwOS)[\s\/]([\d.]+)/)?!0:!1;a.os.touchpad=a.os.webos&&c.match(/TouchPad/)?!0:!1;a.os.ios=a.os.ipad||a.os.iphone;a.os.blackberry=c.match(/BlackBerry/)||c.match(/PlayBook/)?!0:!1;a.os.opera=c.match(/Opera Mobi/)?!0:!1;a.os.fennec=c.match(/fennec/i)?!0:!1;a.os.desktop=!(a.os.ios||a.os.android||a.os.blackberry||a.os.opera||a.os.fennec)}function A(a,c,b,e){c=x(c);if(c.ns)var d=RegExp("(?:^| )"+c.ns.replace(" ",
" .* ?")+"(?: |$)");return(p[a._jqmid||(a._jqmid=t++)]||[]).filter(function(a){return a&&(!c.e||a.e==c.e)&&(!c.ns||d.test(a.ns))&&(!b||a.fn==b||typeof a.fn==="function"&&typeof b==="function"&&""+a.fn===""+b)&&(!e||a.sel==e)})}function x(a){a=(""+a).split(".");return{e:a[0],ns:a.slice(1).sort().join(" ")}}function y(a,c,b){d.isObject(a)?d.each(a,b):a.split(/\s/).forEach(function(a){b(a,c)})}function q(a,c,b,e,f){var i=a._jqmid||(a._jqmid=t++),g=p[i]||(p[i]=[]);y(c,b,function(b,c){var i=f&&f(c,b),
j=i||c,k=function(b){var c=j.apply(a,[b].concat(b.data));c===!1&&b.preventDefault();return c},i=d.extend(x(b),{fn:c,proxy:k,sel:e,del:i,i:g.length});g.push(i);a.addEventListener(i.e,k,!1)})}function r(a,c,b,e){var d=a._jqmid||(a._jqmid=t++);y(c||"",b,function(b,c){A(a,b,c,e).forEach(function(b){delete p[d][b.i];a.removeEventListener(b.e,b.proxy,!1)})})}function B(a){var c=d.extend({originalEvent:a},a);d.each(C,function(b,e){c[b]=function(){this[e]=D;return a[b].apply(a,arguments)};c[e]=E});return c}
var f,j=g.document,l=[],F=l.slice,s=[],G=1,H=/^\s*<(\w+)[^>]*>/,k={},m=function(a,c){this.length=0;if(a)if(a instanceof m&&c==f)return a;else if(d.isFunction(a))return d(j).ready(a);else if(d.isArray(a)&&a.length!=f){for(var b=0;b<a.length;b++)this[this.length++]=a[b];return this}else if(d.isObject(a)&&d.isObject(c)){if(a.length==f)a.parentNode==c&&(this[this.length++]=a);else for(b=0;b<a.length;b++)a[b].parentNode==c&&(this[this.length++]=a[b]);return this}else if(d.isObject(a)&&c==f)return this[this.length++]=
a,this;else if(c!==f){if(c instanceof m)return c.find(a)}else c=j;else return this;if(b=this.selector(a,c))if(d.isArray(b))for(var e=0;e<b.length;e++)this[this.length++]=b[e];else this[this.length++]=b;return this},d=function(a,c){return new m(a,c)};d.map=function(a,c){var b,e=[],h;if(d.isArray(a))for(h=0;h<a.length;h++)b=c(a[h],h),b!==f&&e.push(b);else if(d.isObject(a))for(h in a)a.hasOwnProperty(h)&&(b=c(a[h],h),b!==f&&e.push(b));return d([e])};d.each=function(a,c){var b;if(d.isArray(a))for(b=0;b<
a.length;b++){if(c(b,a[b])===!1)break}else if(d.isObject(a))for(b in a)if(a.hasOwnProperty(b)&&c(b,a[b])===!1)break;return a};d.extend=function(a){a==f&&(a=this);if(arguments.length===1){for(var c in a)this[c]=a[c];return this}else F.call(arguments,1).forEach(function(b){for(var c in b)a[c]=b[c]});return a};d.isArray=function(a){return a instanceof Array&&a.push!=f};d.isFunction=function(a){return typeof a==="function"};d.isObject=function(a){return typeof a==="object"};d.fn=m.prototype={constructor:m,
forEach:l.forEach,reduce:l.reduce,push:l.push,indexOf:l.indexOf,concat:l.concat,selector:function(a,c){var b;if(a[0]==="#"&&a.indexOf(" ")===-1&&a.indexOf(">")===-1)return b=c==j?c.getElementById(a.replace("#","")):[].slice.call(c.querySelectorAll(a));a=a.trim();a[0]==="<"&&a[a.length-1]===">"?(b=j.createElement("div"),b.innerHTML=a.trim(),b=[].slice.call(b.childNodes)):b=[].slice.call(c.querySelectorAll(a));return b},oldElement:f,slice:l.slice,setupOld:function(a){if(a==f)return d();a.oldElement=
this;return a},map:function(a){return d.map(this,function(c,b){return a.call(c,b,c)})},each:function(a){this.forEach(function(c,b){a.call(c,b,c)});return this},ready:function(a){(j.readyState==="complete"||j.readyState==="loaded")&&a();j.addEventListener("DOMContentLoaded",a,!1);return this},find:function(a){if(this.length===0)return f;for(var c=[],b,e=0;e<this.length;e++){b=d(a,this[e]);for(var h=0;h<b.length;h++)c.push(b[h])}return d(o(c))},html:function(a){if(this.length===0)return f;if(a===f)return this[0].innerHTML;
for(var c=0;c<this.length;c++)this[c].innerHTML=a;return this},text:function(a){if(this.length===0)return f;if(a===f)return this[0].textContent;for(var c=0;c<this.length;c++)this[c].textContent=a;return this},css:function(a,c,b){b=b!=f?b:this[0];if(this.length===0)return f;if(c==f&&typeof a==="string")return g.getComputedStyle(b),b.style[a]?b.style[a]:g.getComputedStyle(b)[a];for(b=0;b<this.length;b++)if(d.isObject(a))for(var e in a)this[b].style[e]=a[e];else this[b].style[a]=c;return this},empty:function(){for(var a=
0;a<this.length;a++)this[a].innerHTML="";return this},hide:function(){if(this.length===0)return this;for(var a=0;a<this.length;a++)if(this.css("display",null,this[a])!="none")this[a].setAttribute("jqmOldStyle",this.css("display",null,this[a])),this[a].style.display="none";return this},show:function(){if(this.length===0)return this;for(var a=0;a<this.length;a++)if(this.css("display",null,this[a])=="none")this[a].style.display=this[a].getAttribute("jqmOldStyle")?this[a].getAttribute("jqmOldStyle"):
"block",this[a].removeAttribute("jqmOldStyle");return this},toggle:function(a){for(var c=a===!0?!0:!1,b=0;b<this.length;b++)g.getComputedStyle(this[b]).display!=="none"||a!==f&&c===!1?(this[b].setAttribute("jqmOldStyle",this[b].style.display),this[b].style.display="none"):(this[b].style.display=this[b].getAttribute("jqmOldStyle")!=f?this[b].getAttribute("jqmOldStyle"):"block",this[b].removeAttribute("jqmOldStyle"));return this},val:function(a){if(this.length===0)return f;if(a==f)return this[0].value;
for(var c=0;c<this.length;c++)this[c].value=a;return this},attr:function(a,c){if(this.length===0)return f;if(c===f&&!d.isObject(a))return this[0].jqmCacheId&&k[this[0].jqmCacheId][a]?this[0].jqmCacheId&&k[this[0].jqmCacheId][a]:this[0].getAttribute(a);for(var b=0;b<this.length;b++)if(d.isObject(a))for(var e in a)d(this[b]).attr(e,a[e]);else if(d.isArray(c)||d.isObject(c)||d.isFunction(c)){if(!this[b].jqmCacheId)this[b].jqmCacheId=d.uuid();k[this[b].jqmCacheId]||(k[this[b].jqmCacheId]={});k[this[b].jqmCacheId][a]=
c}else c==null&&c!==f?(this[b].removeAttribute(a),this[b].jqmCacheId&&k[this[b].jqmCacheId][a]&&delete k[this[b].jqmCacheId][a]):this[b].setAttribute(a,c);return this},removeAttr:function(a){for(var c=this,b=0;b<this.length;b++)a.split(/\s+/g).forEach(function(e){c[b].removeAttribute(e);c[b].jqmCacheId&&k[c[b].jqmCacheId][a]&&delete k[c[b].jqmCacheId][a]});return this},remove:function(a){a=d(this).filter(a);if(a==f)return this;for(var c=0;c<a.length;c++)a[c].parentNode.removeChild(a[c]);return this},
addClass:function(a){for(var c=0;c<this.length;c++){var b=this[c].className,e=[],d=this;a.split(/\s+/g).forEach(function(a){d.hasClass(a,d[c])||e.push(a)});this[c].className+=(b?" ":"")+e.join(" ");this[c].className=this[c].className.trim()}return this},removeClass:function(a){for(var c=0;c<this.length;c++){if(a==f){this[c].className="";break}var b=this[c].className;a.split(/\s+/g).forEach(function(a){b=b.replace(u(a)," ")});this[c].className=b.length>0?b.trim():""}return this},hasClass:function(a,
c){if(this.length===0)return!1;c||(c=this[0]);return u(a).test(c.className)},append:function(a,c){if(a&&a.length!=f&&a.length===0)return this;if(d.isArray(a)||d.isObject(a))a=d(a);var b;for(b=0;b<this.length;b++)if(a.length&&typeof a!="string")for(var a=d(a),e=0;e<a.length;e++)c!=f?this[b].insertBefore(a[e],this[b].firstChild):this[b].appendChild(a[e]);else{e=H.test(a)?d(a):f;if(e==f||e.length==0)e=j.createTextNode(a);if(e.nodeName!=f&&e.nodeName.toLowerCase()=="script"&&(!e.type||e.type.toLowerCase()===
"text/javascript"))g.eval(e.innerHTML);else if(e instanceof m)for(var h=0;h<e.length;h++)c!=f?this[b].insertBefore(e[h],this[b].firstChild):this[b].appendChild(e[h]);else c!=f?this[b].insertBefore(e,this[b].firstChild):this[b].appendChild(e)}return this},prepend:function(a){return this.append(a,1)},insertBefore:function(a,c){if(this.length==0)return this;a=d(a).get(0);if(!a||a.length==0)return this;for(var b=0;b<this.length;b++)c?a.parentNode.insertBefore(this[b],a.nextSibling):a.parentNode.insertBefore(this[b],
a);return this},insertAfter:function(a){this.insertBefore(a,!0)},get:function(a){a=a==f?0:a;a<0&&(a+=this.length);return this[a]?this[a]:f},offset:function(){if(this.length===0)return f;var a=this[0].getBoundingClientRect();return{left:a.left+g.pageXOffset,top:a.top+g.pageYOffset,width:parseInt(this[0].style.width),height:parseInt(this[0].style.height)}},parent:function(a){if(this.length==0)return f;for(var c=[],b=0;b<this.length;b++)this[b].parentNode&&c.push(this[b].parentNode);return this.setupOld(d(o(c)).filter(a))},
children:function(a){if(this.length==0)return f;for(var c=[],b=0;b<this.length;b++)c=c.concat(v(this[b].firstChild));return this.setupOld(d(c).filter(a))},siblings:function(a){if(this.length==0)return f;for(var c=[],b=0;b<this.length;b++)this[b].parentNode&&(c=c.concat(v(this[b].parentNode.firstChild,this[b])));return this.setupOld(d(c).filter(a))},closest:function(a,c){if(this.length==0)return f;var b=this[0],e=d(a,c);if(e.length==0)return d();for(;b&&e.indexOf(b)==-1;)b=b!==c&&b!==j&&b.parentNode;
return d(b)},filter:function(a){if(this.length==0)return f;if(a==f)return this;for(var c=[],b=0;b<this.length;b++){var e=this[b];e.parentNode&&d(a,e.parentNode).indexOf(e)>=0&&c.push(e)}return this.setupOld(d(o(c)))},not:function(a){if(this.length==0)return f;for(var c=[],b=0;b<this.length;b++){var e=this[b];e.parentNode&&d(a,e.parentNode).indexOf(e)==-1&&c.push(e)}return this.setupOld(d(o(c)))},data:function(a,c){return this.attr("data-"+a,c)},end:function(){return this.oldElement!=f?this.oldElement:
d()},clone:function(a){a=a===!1?!1:!0;if(this.length==0)return f;for(var c=[],b=0;b<this.length;b++)c.push(this[b].cloneNode(a));return d(c)},size:function(){return this.length},serialize:function(a){if(this.length==0)return"";for(var c={},b=0;b<this.length;b++)this.slice.call(this[b].elements).forEach(function(a){var b=a.getAttribute("type");if(a.nodeName.toLowerCase()!="fieldset"&&!a.disabled&&b!="submit"&&b!="reset"&&b!="button"&&(b!="radio"&&b!="checkbox"||a.checked))c[a.getAttribute("name")]=
a.value});return d.param(c,a)}};var z={type:"GET",beforeSend:n,success:n,error:n,complete:n,context:f,timeout:0,crossDomain:!1};d.jsonP=function(a){var c="jsonp_callback"+ ++G,b="",e=j.createElement("script");g[c]=function(f){clearTimeout(b);d(e).remove();delete g[c];a.success.call(void 0,f)};e.src=a.url.replace(/=\?/,"="+c);if(a.error)e.onerror=function(){clearTimeout(b);a.error.call(void 0,"","error")};d("head").append(e);a.timeout>0&&(b=setTimeout(function(){a.error.call(void 0,"","timeout")},
a.timeout));return{}};d.ajax=function(a){var c;try{c=new g.XMLHttpRequest;var b=a||{},e;for(e in z)b[e]||(b[e]=z[e]);if(!b.url)b.url=g.location;if(!b.contentType)b.contentType="application/x-www-form-urlencoded";if(!b.headers)b.headers={};if(b.dataType)switch(b.dataType){case "script":b.dataType="text/javascript, application/javascript";break;case "json":b.dataType="application/json";break;case "xml":b.dataType="application/xml, text/xml";break;case "html":b.dataType="text/html";break;case "text":b.dataType=
"text/plain";break;default:b.dataType="text/html";break;case "jsonp":return d.jsonP(a)}else b.dataType="text/html";if(d.isObject(b.data))b.data=d.param(b.data);b.type.toLowerCase()==="get"&&b.data&&(b.url+=b.url.indexOf("?")===-1?"?"+b.data:"&"+b.data);if(/=\?/.test(b.url))return d.jsonP(b);if(!b.crossDomain)b.crossDomain=/^([\w-]+:)?\/\/([^\/]+)/.test(b.url)&&RegExp.$2!=g.location.host;if(!b.crossDomain)b.headers=d.extend({"X-Requested-With":"XMLHttpRequest"},b.headers);var f,i=b.context,j=/^([\w-]+:)\/\//.test(b.url)?
RegExp.$1:g.location.protocol;c.onreadystatechange=function(){var a=b.dataType;if(c.readyState===4){clearTimeout(f);var d,e=!1;if(c.status>=200&&c.status<300||c.status===0&&j=="file:"){if(a==="application/json"&&!/^\s*$/.test(c.responseText))try{d=JSON.parse(c.responseText)}catch(g){e=g}else d=c.responseText;c.status===0&&d.length===0&&(e=!0);e?b.error.call(i,c,"parsererror",e):b.success.call(i,d,"success",c)}else e=!0,b.error.call(i,c,"error");b.complete.call(i,c,e?"error":"success")}};c.open(b.type,
b.url,!0);if(b.contentType)b.headers["Content-Type"]=b.contentType;for(var k in b.headers)c.setRequestHeader(k,b.headers[k]);if(b.beforeSend.call(i,c,b)===!1)return c.abort(),!1;b.timeout>0&&(f=setTimeout(function(){c.onreadystatechange=n;c.abort();b.error.call(i,c,"timeout")},b.timeout));c.send(b.data)}catch(l){console.log(l)}return c};d.get=function(a,c){return this.ajax({url:a,success:c})};d.post=function(a,c,b,d){typeof c==="function"&&(b=c,c={});d===f&&(d="html");return this.ajax({url:a,type:"POST",
data:c,dataType:d,success:b})};d.getJSON=function(a,c,b){typeof c==="function"&&(b=c,c={});return this.ajax({url:a,data:c,success:b,dataType:"json"})};d.param=function(a,c){var b=[];if(a instanceof m)a.each(function(){b.push((c?c+"[]":this.id)+"="+encodeURIComponent(this.value))});else for(var e in a){var f=c?c+"["+e+"]":e,g=a[e];b.push(d.isObject(g)?d.param(g,f):f+"="+encodeURIComponent(g))}return b.join("&")};d.parseJSON=function(a){return JSON.parse(a)};d.parseXML=function(a){return(new DOMParser).parseFromString(a,
"text/xml")};w(d,navigator.userAgent);d.__detectUA=w;if(typeof String.prototype.trim!=="function")String.prototype.trim=function(){this.replace(/(\r\n|\n|\r)/gm,"").replace(/^\s+|\s+$/,"");return this};d.uuid=function(){var a=function(){return((1+Math.random())*65536|0).toString(16).substring(1)};return a()+a()+"-"+a()+"-"+a()+"-"+a()+"-"+a()+a()+a()};var p={},t=1,I={};d.event={add:q,remove:r};d.fn.bind=function(a,c){for(var b=0;b<this.length;b++)q(this[b],a,c);return this};d.fn.unbind=function(a,
c){for(var b=0;b<this.length;b++)r(this[b],a,c);return this};d.fn.one=function(a,c){return this.each(function(b,d){q(this,a,c,null,function(a,b){return function(){var c=a.apply(d,arguments);r(d,b,a);return c}})})};var D=function(){return!0},E=function(){return!1},C={preventDefault:"isDefaultPrevented",stopImmediatePropagation:"isImmediatePropagationStopped",stopPropagation:"isPropagationStopped"};d.fn.delegate=function(a,c,b){for(var e=0;e<this.length;e++){var f=this[e];q(f,c,b,a,function(b){return function(c){var e,
g=d(c.target).closest(a,f).get(0);if(g)return e=d.extend(B(c),{currentTarget:g,liveFired:f}),b.apply(g,[e].concat([].slice.call(arguments,1)))}})}return this};d.fn.undelegate=function(a,c,b){for(var d=0;d<this.length;d++)r(this[d],c,b,a);return this};d.fn.on=function(a,c,b){return c===f||d.isFunction(c)?this.bind(a,c):this.delegate(c,a,b)};d.fn.off=function(a,c,b){return c===f||d.isFunction(c)?this.unbind(a,c):this.undelegate(c,a,b)};d.fn.trigger=function(a,c){typeof a=="string"&&(a=d.Event(a));a.data=
c;for(var b=0;b<this.length;b++)this[b].dispatchEvent(a);return this};d.Event=function(a,c){var b=j.createEvent(I[a]||"Events"),d=!0;if(c)for(var f in c)f=="bubbles"?d=!!c[f]:b[f]=c[f];b.initEvent(a,d,!0,null,null,null,null,null,null,null,null,null,null,null,null);return b};d.proxy=function(a,c){return function(b){return a.call(c,b)}};return d}(window);"$"in window||(window.$=jq);if(!window.numOnly)window.numOnly=function(g){isNaN(parseFloat(g))&&(g=g.replace(/[^0-9.-]/,""));return parseFloat(g)}};


function toggleChecked(elem){
	var parent = $(elem).closest('li');
	var isChecked = $(elem).hasClass('checked');
	// uncheck all
	$(parent).find('a.checked').removeClass('checked').removeClass('correct').removeClass('incorrect');
	// now check if needed
	if( !isChecked )
		$(elem).addClass('checked');
	return false;
}

function checkTest(){
	var ex = $('.exercise');
	if( ex == null )
		return;
	var tests = ex.find('li.test');
	if( tests != undefined && tests != null )
	{
		for( var i = 0; i < tests.length; ++i ){
			var test = $(tests[i]);
			var checked = $(test.find('a.checked'));
			var res = $(test.find('div.result'));
			var isCorrect = false;
			if( checked != null && !checked.hasClass('correct-ans') )
				checked.addClass('incorrect');
			else if( checked != null )
			{
				checked.addClass('correct');
				isCorrect = true;
			}
			res.removeClass('correct');
			res.removeClass('incorrect');
			if( isCorrect )
				res.addClass('correct');
			else
				res.addClass('incorrect');
		}
	}
}


var ex3List = $('#Exercises1');
ex3List.attr('base-audio-name', getCurrentModule() + '_' + getCurrentLesson() + '_E3_' );

var ex3ListLines = '';
for( var i = 0; i < cn_ex3.length; ++i ){
	var splitLines = ( cn_ex3[i].ch1.length > 1 || cn_ex3[i].ch2.length > 1 );
	
	ex3ListLines += '<li class="test clearfix"><a href="#" class="audio selectable">&nbsp;</a><div class="result"></div>';
	ex3ListLines += '<div class="cn"><a href="#"';
	if( splitLines )
		{
		if( cn_ex3[i].correct == 1 )
			ex3ListLines += 'class="correct-ans"';
		ex3ListLines += 'onclick="return toggleChecked(this);">' + cn_ex3[i].ch1 + '</a></div>';
		ex3ListLines += '<div style="clear:both"></div>';
		ex3ListLines += '<div class="cn"><a href="#"';
		if( cn_ex3[i].correct == 2 )
			ex3ListLines += 'class="correct-ans"';
		ex3ListLines += 'onclick="return toggleChecked(this);">' + cn_ex3[i].ch2 + '</a></div>';
		}
	else
		{
		// the order needs to be reversed because there's a float:right style on those elements
		if( cn_ex3[i].correct == 2 )
			ex3ListLines += 'class="correct-ans"';
		ex3ListLines += 'onclick="return toggleChecked(this);">' + cn_ex3[i].ch2 + '</a></div>';
		ex3ListLines += '<div class="cn"><a href="#"';
		if( cn_ex3[i].correct == 1 )
			ex3ListLines += 'class="correct-ans"';
		ex3ListLines += 'onclick="return toggleChecked(this);">' + cn_ex3[i].ch1 + '</a></div>';
		}
	ex3ListLines += '</li>';
}
// add button
ex3ListLines += '<li class="check_test no-auto-audio"><a class="button selectable" href="#" onclick="checkTest(); return false;"><span>' + _localizationParts['ui'].ex1_check + '</span></a></li>';
ex3List.html(ex3ListLines);

var selectedElem = null;
var targets = $('.target');

function elemClicked(){
	if( selectedElem != null )
		return;
	
	$(this).addClass('clicked');
	selectedElem = this;
}

function targetClicked(){
	if( selectedElem == null )
		return;
	var targ = $(this);
	if( targ.attr('correct-ans') != null )
		return;
	var src = $(selectedElem);
	var srcA = src.find('a');
	targ.append(srcA);
	if( targ.attr('slot-idx') == srcA.attr('ans-idx') )
		targ.attr('correct-ans', 'true');
	else
		targ.attr('correct-ans', 'false');
	
	src.removeClass('clicked');
	selectedElem = null;
}

function initEx2(){
	var drags = $(".ex2-source");
	for (var i = 0; i < drags.length; i++) {
		var obj = drags[i];
		$(obj).bind("click", elemClicked);
	}
	for (var i = 0; i < targets.length; i++) {
		var obj = targets[i];
		$(obj).bind("click", targetClicked);
	}
}

function checkTest(){
	var isValid = true;
	for( var i = 0; i < targets.length; ++i ){
		var t = $(targets[i]);
		var ans = t.attr('correct-ans');
		if( ans == null || ans != 'true' ){
			isValid = false;
			break;
		}
	}
	$('.audio').hide();
	var ansIcon = $('.ans-icon');
	if( isValid ){
		targets.addClass('correct');
		ansIcon.addClass('correct');
	}
	else{
		targets.addClass('incorrect');
		ansIcon.addClass('incorrect');
	}
	ansIcon.show();
	$('.btn-check').hide();
	$('.btn-reload').show();
}

document.addEventListener('DOMContentLoaded', function () { $('.btn-reload').hide(); setTimeout(initEx2, 100); }, false);

function toggleChecked(elem){
	var parent = $(elem).closest('li');
	var isChecked = $(elem).hasClass('checked');
	// uncheck all
	$(parent).find('a.checked').removeClass('checked').removeClass('correct').removeClass('incorrect');
	// now check if needed
	if( !isChecked )
		$(elem).addClass('checked');
	return false;
}

function checkTest(){
	var ex = $('.exercise');
	if( ex == null )
		return;
	var tests = ex.find('li.test');
	if( tests != undefined && tests != null )
	{
		for( var i = 0; i < tests.length; ++i ){
			var test = $(tests[i]);
			var checked = $(test.find('a.checked'));
			var res = $(test.find('div.result'));
			var isCorrect = false;
			if( checked != null && !checked.hasClass('correct-ans') )
				checked.addClass('incorrect');
			else if( checked != null )
			{
				checked.addClass('correct');
				isCorrect = true;
			}
			res.removeClass('correct');
			res.removeClass('incorrect');
			if( isCorrect )
				res.addClass('correct');
			else
				res.addClass('incorrect');
		}
	}
}


var ex1List = $('#Exercises1');
ex1List.attr('base-audio-name', getCurrentModule() + '_' + getCurrentLesson() + '_E1_' );

var ex1ListLines = '';
for( var i = 0; i < cn_ex1.length; ++i ){
	var splitLines = ( cn_ex1[i].ch1.length > 1 || cn_ex1[i].ch2.length > 1 );
	
	ex1ListLines += '<li class="test clearfix"><a href="#" class="audio selectable">&nbsp;</a><div class="result"></div>';
	ex1ListLines += '<div class="cn"><a href="#"';
	if( splitLines )
	{
		if( cn_ex1[i].correct == 1 )
			ex1ListLines += 'class="correct-ans"';
		ex1ListLines += 'onclick="return toggleChecked(this);">' + cn_ex1[i].ch1 + '</a></div>';
		ex1ListLines += '<div style="clear:both"></div>';
		ex1ListLines += '<div class="cn"><a href="#"';
		if( cn_ex1[i].correct == 2 )
			ex1ListLines += 'class="correct-ans"';
		ex1ListLines += 'onclick="return toggleChecked(this);">' + cn_ex1[i].ch2 + '</a></div>';
	}
	else
	{
		// the order needs to be reversed because there's a float:right style on those elements
		if( cn_ex1[i].correct == 2 )
			ex1ListLines += 'class="correct-ans"';
		ex1ListLines += 'onclick="return toggleChecked(this);">' + cn_ex1[i].ch2 + '</a></div>';
		ex1ListLines += '<div class="cn"><a href="#"';
		if( cn_ex1[i].correct == 1 )
			ex1ListLines += 'class="correct-ans"';
		ex1ListLines += 'onclick="return toggleChecked(this);">' + cn_ex1[i].ch1 + '</a></div>';
	}
	ex1ListLines += '</li>';
}
// add button
ex1ListLines += '<li class="check_test no-auto-audio"><a class="button selectable" href="#" onclick="checkTest(); return false;"><span>' + _localizationParts['ui'].ex1_check + '</span></a></li>';
ex1List.html(ex1ListLines);

document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);
document.addEventListener('DOMContentLoaded', function () { 
	setTimeout(function(){ window.location = nextLocation; }, 5000); 
	}, false);

_localizationParts = {};

function loadLocalizedFile( lang, file ){
    document.write('<script src="', "../js/" + lang + "/" + file, '" type="text/JavaScript"><\/script>');
}

function setupL10N(){
	$('.loc').each(function(){
		var rel = $(this).attr('rel');
		if( rel != null && rel != undefined ){
			 var idx = rel.indexOf('.');
			 if( idx >= 0 ){
				 var packg = rel.slice(0, idx);
		         var item = rel.slice(idx+1);
				 if(_localizationParts[packg] != undefined
					&& _localizationParts[packg][item] != undefined){
//						alert( 'found ' + packg + "." + item);
						$(this).html(_localizationParts[packg][item]);
				 } 
			 }
		}
	});
}
/* helper functions */
function getCurrentModule(){
	return _localizationParts['info'].module;
}
function getCurrentLesson(){
	return _localizationParts['info'].lesson;
}

var lang = localStorage.getItem('lang');
if( lang == null || lang == undefined )
	lang = "en";
loadLocalizedFile(lang,"ui.js");
loadLocalizedFile(lang,"info.js");

var vocList = '';
var showPyn = isShowPyn();
var showCn = isShowCn();
for( var i = 0; i < vocabulary.length; ++i ){
	vocList += '<li class="selectable" ><a href="#" class="audio" onclick="return false;">&nbsp;</a>';
	vocList += '<div class="en">' + vocabulary[i] + '</div>';
	if( showPyn )
		vocList += '<div class="pinyin">' + pyn_vocabulary[i] + '</div>';
	if( showCn )
		vocList += '<div class="cn">' + cn_vocabulary[i] + '</div>';
	vocList += '</li>';
}
var vList = $('#VocabularyList');
vList.attr('base-audio-name', getCurrentModule() + '_' + getCurrentLesson() + '_V');
vList.html(vocList);

var ind = 0;
var vars = getUrlVars();
if( vars["ind"] != undefined)
	ind = parseInt(vars["ind"]);
var exercise = cn_ex3[ind];		
var ex3List = $('#Exercises3');

var exPrefix = getCurrentModule() + '_' + getCurrentLesson() + '_E3_' + (ind+1);
$('#ex3-playaudio').attr('onclick',"play('" + exPrefix + "'); return false;");
if( ind == 0 )
	$('#ex3-prev a').hide();
else
	$('#ex3-prev a').attr('href','exercise_3.html?ind=' + (ind - 1));

if( ind >= cn_ex3.length - 1 )
	$('#ex3-next a').hide();
else
	$('#ex3-next a').attr('href','exercise_3.html?ind=' + (ind + 1) );


var ex3ListLines = '';
for( var i = 0; i < exercise.num; ++i ){
	var rem = (i % 2);
	if( rem == 0) // first line
		ex3ListLines = '<div class="thumb_row">';
	
	ex3ListLines += '<div class="thumb_item_' + (rem + 1) + '">';
	ex3ListLines += '<div class="wait selectable"';
	if( (i+1) == exercise.correct )
		ex3ListLines += 'onclick="$(this).addClass(\'correct\')"';
	else
		ex3ListLines += 'onclick="$(this).addClass(\'incorrect\')"';
	ex3ListLines += '><div class="sign"></div>';
	ex3ListLines += '<a href="#"><img src="../pics/' + exPrefix + '_' + (i+1) + '.JPG"/></a></div></div>';
	if( rem == 1 )
	{
		ex3ListLines += '</div>';
		ex3List.append(ex3ListLines);
	}
}

﻿var info = {	module: "M4",	lesson: "L2",	version: "v1.0M4L2-it",	isEx3Type1: true,	lang: "Italiano",	page_title: "Hotel",	menu_note: "In questa lezione vedrai come prenotare un hotel. Imparerai e otterrai le informazioni necessarie per il tuo soggiorno. Inizieremo facendo una prenotazione, poi, faremo il check in e concluderemo lasciando l'hotel."};_localizationParts['info'] = info;

﻿var characters = [ 
		{ ch: "hotel", icon: "M4_L2_C1.JPG" } ,  
		{ ch: "passaporto", icon: "M4_L2_C2.JPG" } ,  
		{ ch: "carta di credito", icon: "M4_L2_C3.JPG" } ,  
		{ ch: "camera", icon: "M4_L2_C4.JPG" } ,  
		{ ch: "chiave", icon: "M4_L2_C5.JPG" } ,  
		{ ch: "contanti", icon: "M4_L2_C6.JPG" } ,  
		{ ch: "ascensore", icon: "M4_L2_C7.JPG" } ,  
		{ ch: "bagaglio", icon: "M4_L2_C8.JPG" } ,  
		{ ch: "taxi", icon: "M4_L2_C9.JPG" } ,  
		{ ch: "aeroporto", icon: "M4_L2_C10.JPG" } 
		];

﻿var ui = {
	menu_dialog_title: 'Dialoghi',
	menu_dialog_choose: 'scegli parte',
	menu_vocabulary: 'Vocabolario',
	menu_characters: 'Caratteri',
	menu_quiz_title: 'Quiz audio',
	menu_quiz_choose: 'scegliere quiz',
	menu_quiz_1: 'Parola corretta',
	menu_quiz_2: 'Ordine corretto',
	menu_quiz_3: 'Parola corretta',
	menu_home: 'home',
	menu_project: 'progetto',
	menu_settings: 'impostazioni',
	
	settings_title: 'Impostazioni',
	settings_dialog: 'Lingua dei dialoghi ed esercizi',
	settings_interface: "Lingua per l'interfaccia",
	settings_pynin: 'Pinyin',
	settings_cn: 'Alfabeto cinese',
	
	project_about_title: 'A proposito del progetto',
	project_about: '<p style="text-align:center">'
	+ '<b>Chinese for Europeans</b><br/>'
	+ '<a href="http://www.chinese4.eu">www.chinese4.eu</a></p>'
	+ '<p>The free of charge C4EU project aims at bringing the Chinese language and culture closer to the representatives of various age and profession groups (enterpreneurs and their employees, tourists, students and children) from all EU Member States (as well as other countries) by offering products translated into 23 European languages.'
	+ '</p><p>The project is performed by the partnership of 6 European institutions (Mescomp Technologies - Poland, Antwerp Management School - Belgium, Fondazione Italia Cina - Italy, ICC International Language Association - Germany, Soros International House - Lithuania, EduActive - Poland) which are specializing in different areas: Chinese language teaching, quality of teaching materialsm programming, mobile technology and exploitation of the project results by contacting with wide group of interested parties.'
	+ '</p><p>This project has been co-founded by the European Commission.</p>'
	+ '<p>Photos attached in this application are property of Paweł Podgórski (<a href="http://echiny.pl">echiny.pl</a>) and project partners.</p>',
	
	part: 'Parte',
	dialogue_listen_all: "Ascolta l'intero dialogo",
	exercise: 'Esercizio',
	ex1_desc: 'Ascoltate la parola e scegliere i carattere giusti',
	ex1_check: 'Controlla il test',
	ex2_meaning: 'significato:',
	ex2_desc: "Metti i caratteri nell'ordine corretto<br/> per creare una frase di senso compiuto",
	ex2_check: 'Controlla il test',
	ex2_restart: 'Riavviare prova',
	ex3_desc: 'Ascoltate la parola e scegliere i carattere giusti',
	ex3_check: 'Controlla il test'
};

_localizationParts['ui'] = ui;

﻿var dialogs = [
	{
		title: "Prenotare una stanza", 
		icon: "M4_L2_D1.JPG",
		Parts: [
					{ lines: [  "Beijing hotel, benvenuto!" ,   "Buongiorno, posso prenotare una stanza?" ,   "Si, quanti giorni si fermerà?" ,   "Tre giorni."   ] } , 
					{ lines: [  "Che tipo di camera intende prenotare?" ,   "Quanto costa una camera doppia?" ,   "600." ,   "Usd o RMB?" ,   "RMB." ,   "Va bene, la prenoto."   ] } , 
					{ lines: [  "Quando arriverà?" ,   "Dopodomani." ,   "Come si chiama?" ,   "Jack Smith." ,   "Bene. Benvenuto al Beojing Hotel." ,   "Grazie!"   ] } 
				]
	} , 
	{
		title: "In hotel", 
		icon: "M4_L2_D2.JPG",
		Parts: [
					{ lines: [  "Beijing Hotel, benvenuto!" ,   "Buongiorno, mi chiamo Jack Smith. Ho prenotato una stanza." ,   "Jack Smith,esatto. Il suo passaporto, prego." ,   "Prego." ,   "Compili il modulo, prego." ,   "Si."   ] } , 
					{ lines: [  "Come vuole pagare? Carta di credito o contanti?" ,   "Carta di credito." ,   "Una firma qui, prego." ,   "Va bene." ,   "Questa è la sua chiave."   ] } , 
					{ lines: [  "Dove si trova la mia stanza?" ,   "Dodicesimo piano." ,   "Dov'è l'ascensore?" ,   "Giri a sinistra, dietro le scale." ,   "Grazie."   ] } 
				]
	} , 
	{
		title: "Lasciare l'hotel", 
		icon: "M4_L2_D3.JPG",
		Parts: [
					{ lines: [  "Salve. Devo lasciare l'albergo. Il numero della camera è 1268." ,   "Va bene. Ha usufruito del minibar?" ,   "Si, ho preso una bottiglia di birra." ,   "In totale sono 2000 RMB."   ] } , 
					{ lines: [  "Ecco la mia carta di credito." ,   "Mi spiace, abbiamo un problema con il sistema. La prego di pagare in contanti." ,   "Va bene. Prego mi dia la ricevuta." ,   "Ecco a lei."   ] } , 
					{ lines: [  "Posso lasciare qui i bagagli?" ,   "Si certo." ,   "La prego di chiamare un taxi. Vado in aeroporto." ,   "Va bene. Per andare in aeroporto sono 300 RMB." ,   "Quanto devo aspettare?" ,   "20 minuti."   ] } 
				]
	} 
];

﻿var ex2 = [ "Quando arriverà?" , "Quanto costa una camera doppia?" , "La prego di chiamare un taxi." , "Dov'è l'ascensore?" , "Vado in aeroporto." ];

﻿var vocabulary = [ "prenotare" , "dollari" , "yuan - renminbi" , "compilare" , "modulo" , "firmare" , "numero ordinale per i piani" , "lasciare l'albergo" , "bar" , "birra" ];

﻿var info = {	module: "M4",	lesson: "L2",	version: "v1.0M4L2-lv",	isEx3Type1: true,	lang: "Latviešu",	page_title: "Viesnīca",	menu_note: "Šjā lekcijā uzzināsiet, kā rezervēt viesnīcu, sniegt un iegūt nepieciešamo informāciju par savu uzturēšanos. Mēs sāksim ar viesnīcas rezervēšanu, tad reģistrēšanu un pabeigsim ar aizbraukšanu no viesnīcas."};_localizationParts['info'] = info;

﻿var characters = [ 
		{ ch: "viesnīca", icon: "M4_L2_C1.JPG" } ,  
		{ ch: "pase", icon: "M4_L2_C2.JPG" } ,  
		{ ch: "kredītkarte", icon: "M4_L2_C3.JPG" } ,  
		{ ch: "istaba", icon: "M4_L2_C4.JPG" } ,  
		{ ch: "atslēga", icon: "M4_L2_C5.JPG" } ,  
		{ ch: "nauda", icon: "M4_L2_C6.JPG" } ,  
		{ ch: "lifts", icon: "M4_L2_C7.JPG" } ,  
		{ ch: "bagāža", icon: "M4_L2_C8.JPG" } ,  
		{ ch: "taksometrs", icon: "M4_L2_C9.JPG" } ,  
		{ ch: "lidosta", icon: "M4_L2_C10.JPG" } 
		];

﻿var ui = {
	menu_dialog_title: 'Dialogi',
	menu_dialog_choose: 'izvēlēties daļu',
	menu_vocabulary: 'Vārdu krājums',
	menu_characters: 'Simbolus',
	menu_quiz_title: 'Viktorīnas audio',
	menu_quiz_choose: 'izvēlēties viktorīna',
	menu_quiz_1: 'Pareizais vārds',
	menu_quiz_2: 'Pareiza kārtība',
	menu_quiz_3: 'Pareizais vārds',
	menu_home: 'mājas',
	menu_project: 'projekts',
	menu_settings: 'iestatījumi',
	
	settings_title: 'Iestatījumi',
	settings_dialog: 'Valoda dialogiem un vingrinājumu',
	settings_interface: 'Interfeisa valoda',
	settings_pynin: 'Pinyin',
	settings_cn: 'Ķīniešu alfabēts',
	
	project_about_title: 'Par projektu',
	project_about: '<p style="text-align:center">'
	+ '<b>Chinese for Europeans</b><br/>'
	+ '<a href="http://www.chinese4.eu">www.chinese4.eu</a></p>'
	+ '<p>The free of charge C4EU project aims at bringing the Chinese language and culture closer to the representatives of various age and profession groups (enterpreneurs and their employees, tourists, students and children) from all EU Member States (as well as other countries) by offering products translated into 23 European languages.'
	+ '</p><p>The project is performed by the partnership of 6 European institutions (Mescomp Technologies - Poland, Antwerp Management School - Belgium, Fondazione Italia Cina - Italy, ICC International Language Association - Germany, Soros International House - Lithuania, EduActive - Poland) which are specializing in different areas: Chinese language teaching, quality of teaching materialsm programming, mobile technology and exploitation of the project results by contacting with wide group of interested parties.'
	+ '</p><p>This project has been co-founded by the European Commission.</p>'
	+ '<p>Photos attached in this application are property of Paweł Podgórski (<a href="http://echiny.pl">echiny.pl</a>) and project partners.</p>',
	
	part: 'Daļa',
	dialogue_listen_all: 'Noklausies visu dialogu',
	exercise: 'Uzdevums',
	ex1_desc: 'Dzirdēt vārdu, un izvēlēties pareizo rakstzīmes',
	ex1_check: 'Pārbaudi testu',
	ex2_meaning: 'nozīme:',
	ex2_desc: 'Ierakstiet pareizos hieroglifus,<br/> lai teikumi iegūtu jēgu',
	ex2_check: 'Pārbaudi testu',
	ex2_restart: 'Restartēt tests',
	ex3_desc: 'Dzirdēt vārdu, un izvēlēties pareizo rakstzīmes',
	ex3_check: 'Pārbaudi testu'
};

_localizationParts['ui'] = ui;

﻿var dialogs = [
	{
		title: "Istabas rezervēšana", 
		icon: "M4_L2_D1.JPG",
		Parts: [
					{ lines: [  "Pekinas Viesnīca, laipni lūdzam!" ,   "Labdien. Vai es varētu rezervēt istabu?" ,   "Jā, cik ilgi jūs paliksiet?" ,   "Trīs dienas."   ] } , 
					{ lines: [  "Kādu istabu jūs gribat rezervēt?" ,   "Cik maksā divvietīga istaba?" ,   "600." ,   "USD vai RMB?" ,   "RMB." ,   "Rezervēšu."   ] } , 
					{ lines: [  "Kad jūs atbraucat?" ,   "Parīt." ,   "Kā jūs sauc?" ,   "Džeks Smits." ,   "Labi. Laipni lūdzam Pekinas viesnīcā." ,   "Paldies!"   ] } 
				]
	} , 
	{
		title: "Viesnīcā", 
		icon: "M4_L2_D2.JPG",
		Parts: [
					{ lines: [  "Pekinas Viesnīca, laipni lūdzam!" ,   "Sveiki, mans vārds ir Džeks Smits. Es rezervēju istabu." ,   "Džeks Smits, jā. Lūdzu, dodiet man savu pasi." ,   "Jums." ,   "Lūdzu, aizpildiet šo formu." ,   "Labi."   ] } , 
					{ lines: [  "Kā jūs maksāsiet? Ar naudu vai ar kredītkarti?" ,   "Kredītkarti." ,   "Lūdzu parakstiet savu vārdu." ,   "Labi." ,   "Šī ir jūsu atslēga."   ] } , 
					{ lines: [  "Kur ir mana istaba?" ,   "12. stāvā." ,   "Kur ir lifts?" ,   "Pagriezieties pa labi. Aiz kāpnēm." ,   "Paldies."   ] } 
				]
	} , 
	{
		title: "Aizbraukšana", 
		icon: "M4_L2_D3.JPG",
		Parts: [
					{ lines: [  "Sveiki. Es aizbraucu. Istabas numurs 1268." ,   "Labi. Vai jūs izmantojāt minibāru?" ,   "Jā. 1 pudele alus." ,   "Kopā 2000 kuai."   ] } , 
					{ lines: [  "Mana kredītkarte." ,   "Atvainojiet, sistēmā ir kļūda. Lūdzu maksājiet skaidrā." ,   "Labi. Lūdzu, iedodiet man rēķinu." ,   "Jums."   ] } , 
					{ lines: [  "Vai es varu šeit atstāt bagāžu?" ,   "Jūs varat." ,   "Lūdzu, izsauciet taksometru. Es braukšu uz lidostu." ,   "Labi. Brauciens uz lidostu maksā 300 kuai." ,   "Cik ilgi man ir jāgaida?" ,   "20 minūtes."   ] } 
				]
	} 
];

﻿var ex2 = [ "Kad jūs atbraucat?" , "Cik maksā divvietīga istaba?" , "Lūdzu, izsauciet taksometru." , "Kur ir lifts?" , "Es braukšu uz lidostu." ];

﻿var vocabulary = [ "rezervēt" , "USD" , "RMB" , "aizpildīt" , "forma" , "parakstīties" , "X. stāva" , "izbraukt no viesnīcas" , "bārs" , "alus" ];

﻿var info = {	module: "M4",	lesson: "L2",	version: "v1.0M4L2-lt",	isEx3Type1: true,	lang: "Lietuvių",	page_title: "Viešbutis",	menu_note: "Per šią pamoką jūs sužinosite, kaip užrezervuoti viešbutį, suteiks naudingos informacijos apie apsistojimą. Pradėsime atlikdami rezervaciją, tuomet įsiregistruosime ir baigsime išsiregistravimu, paliekant viešbutį."};_localizationParts['info'] = info;

﻿var characters = [ 
		{ ch: "viešbutis", icon: "M4_L2_C1.JPG" } ,  
		{ ch: "pasas", icon: "M4_L2_C2.JPG" } ,  
		{ ch: "kreditinė/banko kortelė", icon: "M4_L2_C3.JPG" } ,  
		{ ch: "kambarys", icon: "M4_L2_C4.JPG" } ,  
		{ ch: "raktas", icon: "M4_L2_C5.JPG" } ,  
		{ ch: "grynieji (pinigai)", icon: "M4_L2_C6.JPG" } ,  
		{ ch: "liftas", icon: "M4_L2_C7.JPG" } ,  
		{ ch: "lagaminas/bagažas", icon: "M4_L2_C8.JPG" } ,  
		{ ch: "taksi", icon: "M4_L2_C9.JPG" } ,  
		{ ch: "orouostas", icon: "M4_L2_C10.JPG" } 
		];

﻿var ui = {
	menu_dialog_title: 'Dialogai',
	menu_dialog_choose: 'pasirinkti dalį',
	menu_vocabulary: 'Žodynėlis',
	menu_characters: 'Hieroglifus',
	menu_quiz_title: 'Viktorina garso',
	menu_quiz_choose: 'pasirinkti viktorina',
	menu_quiz_1: 'Teisingas žodis',
	menu_quiz_2: 'Teisinga tvarka',
	menu_quiz_3: 'Teisingas žodis',
	menu_home: 'Į pradžią',
	menu_project: 'projektas',
	menu_settings: 'nustatymai',
	
	settings_title: 'Nustatymai',
	settings_dialog: 'Dialogų ir pratybų kalba',
	settings_interface: 'Programinės įrangos sąsajos kalba',
	settings_pynin: 'Pinyin',
	settings_cn: 'Kinų abėcėlė',
	
	project_about_title: 'Apie projektą',
	project_about: '<p style="text-align:center">'
	+ '<b>Chinese for Europeans</b><br/>'
	+ '<a href="http://www.chinese4.eu">www.chinese4.eu</a></p>'
	+ '<p>The free of charge C4EU project aims at bringing the Chinese language and culture closer to the representatives of various age and profession groups (enterpreneurs and their employees, tourists, students and children) from all EU Member States (as well as other countries) by offering products translated into 23 European languages.'
	+ '</p><p>The project is performed by the partnership of 6 European institutions (Mescomp Technologies - Poland, Antwerp Management School - Belgium, Fondazione Italia Cina - Italy, ICC International Language Association - Germany, Soros International House - Lithuania, EduActive - Poland) which are specializing in different areas: Chinese language teaching, quality of teaching materialsm programming, mobile technology and exploitation of the project results by contacting with wide group of interested parties.'
	+ '</p><p>This project has been co-founded by the European Commission.</p>'
	+ '<p>Photos attached in this application are property of Paweł Podgórski (<a href="http://echiny.pl">echiny.pl</a>) and project partners.</p>',
	
	part: 'Dalis',
	dialogue_listen_all: 'Pasiklausyk viso dialogo',
	exercise: 'Pratimas',
	ex1_desc: 'Išgirsti žodį ir pasirinkti tinkamą simbolių',
	ex1_check: 'Patikrink testą',
	ex2_meaning: 'tai reiškia:',
	ex2_desc: 'Sudėliokite hieroglifus tinkama<br/> tvarka ir sudarykite sakinį',
	ex2_check: 'Patikrink testą',
	ex2_restart: 'Iš naujo paleiskite testą',
	ex3_desc: 'Išgirsti žodį ir pasirinkti tinkamą simbolių',
	ex3_check: 'Patikrink testą'
};

_localizationParts['ui'] = ui;

﻿var dialogs = [
	{
		title: "Kambario užsakymas", 
		icon: "M4_L2_D1.JPG",
		Parts: [
					{ lines: [  "Sveiki atvykę į Beijing Viešbutį!" ,   "Sveiki. Ar galėčiau rezervuoti kambarį?" ,   "Taip, kuriam laikui ketinate apsistoti?" ,   "Trims dienoms."   ] } , 
					{ lines: [  "Kokio tipo kambario pageidaujate?" ,   "Kiek kainuotų dvivietis kambarys?" ,   "600." ,   "JAV dolerių ar Juanių?" ,   "RMB (juaniai)." ,   "Užsakau."   ] } , 
					{ lines: [  "Kada jūs atvykstate?" ,   "Poryt." ,   "Jūsų vardas?" ,   "Jack Smith." ,   "Gerai, laukiame jūsų Beijing Viešbutyje." ,   "Ačiū!"   ] } 
				]
	} , 
	{
		title: "Viešbutyje", 
		icon: "M4_L2_D2.JPG",
		Parts: [
					{ lines: [  "Sveiki atvykę į Beijing Viešbutį!" ,   "Sveiki, aš esu Jack Smith. Rezervavau kambarį." ,   "Jack Smith, taip. Prašau parodyti savo pasą." ,   "Štai, prašom." ,   "Prašytume užpildytį šią formą." ,   "Gerai."   ] } , 
					{ lines: [  "Kaip jus atsiskaitysite? Grynais ar kreditine kortele?" ,   "Kortele." ,   "Prašau pasirašyti." ,   "Gerai." ,   "Štai jūsų raktas."   ] } , 
					{ lines: [  "Kur yra kambarys?" ,   "12-tame aukšte." ,   "Kur liftas?" ,   "Pasukite į dešinę. Už laiptų." ,   "Ačiū."   ] } 
				]
	} , 
	{
		title: "Išsiregistravimas", 
		icon: "M4_L2_D3.JPG",
		Parts: [
					{ lines: [  "Sveiki. Norėčiau išsiregistruoti. Kambarys 1268." ,   "Gerai. Ar naudojotės minibaru?" ,   "Taip. Vieną butelį alaus." ,   "Iš viso bųtū 2000 juanių."   ] } , 
					{ lines: [  "Štai mano banko kortelė." ,   "Atsiprašome, tačiau sistema neveikia. Susimokėkite, prašom, grynais." ,   "Gerai. Prašyčiau sąskaitos." ,   "Štai."   ] } , 
					{ lines: [  "Ar galėčiau palikti lagaminus čia?" ,   "Taip, galite." ,   "Iškviekite, prašau, taksi. Vyksiu į orouostą." ,   "Gerai. Iki orouosto kainuos 300 juanių." ,   "Kiek reikės laukti?" ,   "20 minučių."   ] } 
				]
	} 
];

﻿var ex2 = [ "Kada jūs atvykstate?" , "Kiek kainuotų dvivietis kambarys?" , "Iškviekite, prašau, taksi." , "Kur liftas?" , "Vyksiu į orouostą." ];

﻿var vocabulary = [ "užsakyti/rezervuoti" , "JAV doleriai" , "RMB (juaniai)" , "užpildyti" , "forma" , "pasirašyti" , "X-ame aukšte" , "išsiregistruoti" , "baras" , "alus" ];

﻿var info = {	module: "M4",	lesson: "L2",	version: "v1.0M4L2-hu",	isEx3Type1: true,	lang: "Magyar",	page_title: "Szálloda",	menu_note: "Ebben a leckében megmutatjuk hogyan kell szobát foglalni egy szállodában, a tartózkodásunkhoz szükséges információkat megadni és megtudni. A foglalással fogjuk kezdeni aztán a bejelentkezéssel folytatjuk és a távozással fejezzük be."};_localizationParts['info'] = info;

﻿var characters = [ 
		{ ch: "szálloda", icon: "M4_L2_C1.JPG" } ,  
		{ ch: "útlevél", icon: "M4_L2_C2.JPG" } ,  
		{ ch: "hitelkártya", icon: "M4_L2_C3.JPG" } ,  
		{ ch: "szoba", icon: "M4_L2_C4.JPG" } ,  
		{ ch: "kulcs", icon: "M4_L2_C5.JPG" } ,  
		{ ch: "készpénz", icon: "M4_L2_C6.JPG" } ,  
		{ ch: "lift", icon: "M4_L2_C7.JPG" } ,  
		{ ch: "csomag/bőrönd", icon: "M4_L2_C8.JPG" } ,  
		{ ch: "taxi", icon: "M4_L2_C9.JPG" } ,  
		{ ch: "repülőtér", icon: "M4_L2_C10.JPG" } 
		];

﻿var ui = {
	menu_dialog_title: 'Párbeszédek',
	menu_dialog_choose: 'válassza rész',
	menu_vocabulary: 'Szószedet',
	menu_characters: 'Irásjegyek',
	menu_quiz_title: 'Kvíz audio',
	menu_quiz_choose: 'válassza quiz',
	menu_quiz_1: 'Helyes szó',
	menu_quiz_2: 'Helyes sorrendben',
	menu_quiz_3: 'Helyes szó',
	menu_home: 'kezdőlap',
	menu_project: 'projekt',
	menu_settings: 'beállítások',
	
	settings_title: 'Beállítások',
	settings_dialog: 'Nyelve párbeszédek és gyakorlatok',
	settings_interface: 'A felület nyelve',
	settings_pynin: 'Pinyin',
	settings_cn: 'Kínai ábécé',
	
	project_about_title: 'A projektről',
	project_about: '<p style="text-align:center">'
	+ '<b>Chinese for Europeans</b><br/>'
	+ '<a href="http://www.chinese4.eu">www.chinese4.eu</a></p>'
	+ '<p>The free of charge C4EU project aims at bringing the Chinese language and culture closer to the representatives of various age and profession groups (enterpreneurs and their employees, tourists, students and children) from all EU Member States (as well as other countries) by offering products translated into 23 European languages.'
	+ '</p><p>The project is performed by the partnership of 6 European institutions (Mescomp Technologies - Poland, Antwerp Management School - Belgium, Fondazione Italia Cina - Italy, ICC International Language Association - Germany, Soros International House - Lithuania, EduActive - Poland) which are specializing in different areas: Chinese language teaching, quality of teaching materialsm programming, mobile technology and exploitation of the project results by contacting with wide group of interested parties.'
	+ '</p><p>This project has been co-founded by the European Commission.</p>'
	+ '<p>Photos attached in this application are property of Paweł Podgórski (<a href="http://echiny.pl">echiny.pl</a>) and project partners.</p>',
	
	part: 'Rész',
	dialogue_listen_all: 'Hallgassa ki az összes párbeszédet',
	exercise: 'Feladat',
	ex1_desc: 'Halljátok a szót, és válassza ki a megfelelő karaktereket',
	ex1_check: 'A teszt ellenőrzése',
	ex2_meaning: 'jelentés:',
	ex2_desc: 'Tegye az írásjegyeket sorba úgy,<br/> hogy helyes mondatokat kapjon',
	ex2_check: 'A teszt ellenőrzése',
	ex2_restart: 'Újraindítás teszt',
	ex3_desc: 'Halljátok a szót, és válassza ki a megfelelő karaktereket',
	ex3_check: 'A teszt ellenőrzése'
};

_localizationParts['ui'] = ui;

﻿var dialogs = [
	{
		title: "Szobafoglalás", 
		icon: "M4_L2_D1.JPG",
		Parts: [
					{ lines: [  "Peking Hotel, üdvözlöm!" ,   "Halló. Foglalhatnék egy szobát?" ,   "Igen, mennyi ideig marad?" ,   "Három napig."   ] } , 
					{ lines: [  "Milyen szobát szeretne?" ,   "Mennyibe kerül egy kétágyas szoba?" ,   "600." ,   "USD vagy RMB?" ,   "RMB." ,   "Lefoglalom."   ] } , 
					{ lines: [  "Mikor érkezik?" ,   "Holnapután." ,   "Mi a neve?" ,   "Jack Smith." ,   "Jó. Üdvözöljük a Peking Hotelben." ,   "Köszönöm."   ] } 
				]
	} , 
	{
		title: "A hotelben", 
		icon: "M4_L2_D2.JPG",
		Parts: [
					{ lines: [  "Peking Hotel, üdvözlöm!" ,   "Üdvözlöm, a nevem Jack Smith. Foglaltam egy szobát." ,   "Jack Smith, igen. Kérem adja ide az útlevelét." ,   "Önnek." ,   "Kérem töltse ki ezt a nyomtatványt." ,   "Jó."   ] } , 
					{ lines: [  "Hogyan fog fizetni? Készpénzzel vagy hitelkártyával?" ,   "Hitelkártyával." ,   "Kérem írja alá." ,   "Jó." ,   "Ez a kulcsa."   ] } , 
					{ lines: [  "Hol van a szobám?" ,   "A 12. emeleten." ,   "Hol van a lift?" ,   "Forduljon jobbra. A lépcső mögött." ,   "Köszönöm."   ] } 
				]
	} , 
	{
		title: "Kijelentkezés", 
		icon: "M4_L2_D3.JPG",
		Parts: [
					{ lines: [  "Üdvözlöm. Kijelentkeznék. A szoba száma 1268." ,   "Jó. Használta a minibárt?" ,   "Igen. Egy üveg sört." ,   "Összesen 2000 kuai."   ] } , 
					{ lines: [  "A hitelkártyám." ,   "Sajnálom. Probléma van a rendszerrel. Kérem fizessen készpénzzel." ,   "Jó. Kérem adja ide a nyugtát." ,   "Tessék."   ] } , 
					{ lines: [  "Itt hagyhatom a csomagomat?" ,   "Igen." ,   "Kérem hívjon egy taxit. A repülőtérre megyek." ,   "Jó. A taxi a repülőtérre 300 kuaiba kerül." ,   "Mennyit kell várnom?" ,   "20 percet."   ] } 
				]
	} 
];

﻿var ex2 = [ "Mikor érkezik?" , "Mennyibe kerül egy kétágyas szoba?" , "Kérem hívjon egy taxit." , "Hol van a lift?" , "A repülőtérre megyek." ];

﻿var vocabulary = [ "foglalni" , "USD (amerikai dollár)" , "RMB (kínai renminbi)" , "kitölteni" , "nyomtatvány" , "aláírni" , "X. emelet" , "kijelentkezni" , "bár" , "sör" ];

﻿var pyn_characters = [ "fàndiàn" , "hùzhào" , "xìnyòngkă" , "fángjiān" , "yàoshi" , "xiànjīn" , "diàntī" , "xínglĭ" , "chūzūchē" , "jīchăng" ];

﻿var pyn_dialogs = [
	{
		title: 'Dìng fángjiān', 
		icon: 'M4_L2_D1.JPG',
		Parts: [
					{ lines: [  "Nínhăo! Zhèlĭ shì Bĕijīng fàndiàn!" ,   "Nĭhăo. Wŏ xiăng dìng yī jiān fáng." ,   "Kĕyĭ, nín zhù jĭ tiān?" ,   "Sān tiān."   ] } , 
					{ lines: [  "Nín xiăng dìng shénme fángjiān? " ,   "Shuāngrén fángjiān duōshăo qián?" ,   "Yī tiān liù băi kuài." ,   "Mĕiyuán háishì rénmínbì?" ,   "Rénmínbì." ,   "Hăo, wŏ dìng yī jiān."   ] } , 
					{ lines: [  "Nín shénme shíhou lái?" ,   "Hòutiān." ,   "Qĭngwèn nínde xìngmíng." ,   "Jack Smith." ,   "Hăo, huānyíng lái Bĕijīng fàndiàn." ,   "Xièxie!"   ] } 
				]
	} , 
	{
		title: 'Zàifàndiàn', 
		icon: 'M4_L2_D2.JPG',
		Parts: [
					{ lines: [  "Bĕijīng fàndiàn, nínhăo!" ,   "Nĭhăo, wŏ jiào Jack Smith. Wŏ dìng le jiān fáng." ,   "Jack Smith, duì. Qĭng gĕi wŏ nínde hùzhào." ,   "Gĕi nĭ." ,   "Qĭng tián zhè zhāng dānzi." ,   "Hăo."   ] } , 
					{ lines: [  "Nín zĕnme fù qián? Xiànjīn háishì xìnyòngkă?" ,   "Xìnyòngkă." ,   "Qĭng zài zhèbiān qiānmíng." ,   "Hăo." ,   "Zhè shì nínde yàoshi."   ] } , 
					{ lines: [  "Wŏde fángjiān zài nălĭ?" ,   "Shí èr lóu." ,   "Diàntī zài nălĭ?" ,   "Wàng yòu guăi. Zài lóutī hòumian." ,   "Xièxie!"   ] } 
				]
	} , 
	{
		title: 'Tuì fáng', 
		icon: 'M4_L2_D3.JPG',
		Parts: [
					{ lines: [  "Nĭhăo, wŏ tuì fáng. Fángjiān háo shì yī èr liù bā." ,   "Hăo. Nín yòng le mínĭ jiŭbā ma?" ,   "Yŏu. Yī píng píjiŭ." ,   "Yīgòng liăng qiān kuài."   ] } , 
					{ lines: [  "Zhè shì wŏde xìnyòngkă." ,   "Duìbùqĭ. Xìtŏng yŏu wèntí. Qĭng yòng xiànjīn fù." ,   "Hăo. Qĭng gĕi wŏ shōujù." ,   "Gĕi nín."   ] } , 
					{ lines: [  "Kĕyĭ zài zhèr cún xíngli ma?" ,   "Kĕyĭ." ,   "Qĭng jiào chūzūchē. Wŏ qù jīchăng." ,   "Hăo. Qù jīchăng sān băi kuài." ,   "Yāo dĕng duō jiŭ?" ,   "Èrshí fēnzhōng."   ] } 
				]
	} 
];

﻿var pyn_vocabulary = [ "dìng" , "mĕiyuán" , "rénmínbì" , "tián" , "dānzi" , "qiānmíng" , "dì X lóu" , "tuì fáng" , "jiŭbā" , "píjiŭ" ];

﻿var info = {	module: "M4",	lesson: "L2",	version: "v1.0M4L2-cs",	isEx3Type1: true,	lang: "English",	page_title: "Hotel",	menu_note: "Tato lekce vám ukáže, jak je třeba rezervovat hotelový pokoj, dozvíte se nutné informace o pobytu. Začneme od rezervace, potom se přihlásíme a ukončíme odchodem z hotelu."};_localizationParts['info'] = info;

﻿var characters = [ 
		{ ch: "hotel", icon: "M4_L2_C1.JPG" } ,  
		{ ch: "pas", icon: "M4_L2_C2.JPG" } ,  
		{ ch: "kreditní karta", icon: "M4_L2_C3.JPG" } ,  
		{ ch: "pokoj", icon: "M4_L2_C4.JPG" } ,  
		{ ch: "klíč", icon: "M4_L2_C5.JPG" } ,  
		{ ch: "hotovost", icon: "M4_L2_C6.JPG" } ,  
		{ ch: "výtah", icon: "M4_L2_C7.JPG" } ,  
		{ ch: "zavazadlo", icon: "M4_L2_C8.JPG" } ,  
		{ ch: "taxi", icon: "M4_L2_C9.JPG" } ,  
		{ ch: "letiště", icon: "M4_L2_C10.JPG" } 
		];

﻿var ui = {
	menu_dialog_title: 'Dialogy',
	menu_dialog_choose: 'vyberte část',
	menu_vocabulary: 'Slovníček',
	menu_characters: 'Znaky',
	menu_quiz_title: 'Kvíz zvuk',
	menu_quiz_choose: 'výběr kvíz',
	menu_quiz_1: 'Správné slovo',
	menu_quiz_2: 'Správné pořadí',
	menu_quiz_3: 'Správné slovo',
	menu_home: 'hlavní stránka',
	menu_project: 'projekt',
	menu_settings: 'nastavení',
	
	settings_title: 'Nastavení',
	settings_dialog: 'Jazyk dialogu a cvičení',
	settings_interface: 'Jazyk rozhraní',
	settings_pynin: 'Pinyin',
	settings_cn: 'Čínský abeceda',
	
	project_about_title: 'O projektu',
	project_about: '<p style="text-align:center">'
	+ '<b>Chinese for Europeans</b><br/>'
	+ '<a href="http://www.chinese4.eu">www.chinese4.eu</a></p>'
	+ '<p>The free of charge C4EU project aims at bringing the Chinese language and culture closer to the representatives of various age and profession groups (enterpreneurs and their employees, tourists, students and children) from all EU Member States (as well as other countries) by offering products translated into 23 European languages.'
	+ '</p><p>The project is performed by the partnership of 6 European institutions (Mescomp Technologies - Poland, Antwerp Management School - Belgium, Fondazione Italia Cina - Italy, ICC International Language Association - Germany, Soros International House - Lithuania, EduActive - Poland) which are specializing in different areas: Chinese language teaching, quality of teaching materialsm programming, mobile technology and exploitation of the project results by contacting with wide group of interested parties.'
	+ '</p><p>This project has been co-founded by the European Commission.</p>'
	+ '<p>Photos attached in this application are property of Paweł Podgórski (<a href="http://echiny.pl">echiny.pl</a>) and project partners.</p>',
	
	part: 'Část',
	dialogue_listen_all: 'Poslouchejte celý dialog',
	exercise: 'Cvičení',
	ex1_desc: 'Poslouchej věty a vyber správné čínské znaky',
	ex1_check: 'Kontrola testu',
	ex2_meaning: 'význam:',
	ex2_desc: 'Uložte čínské znaky ve správném pořadí,<br/> tak aby vytvořily větu',
	ex2_check: 'Kontrola testu',
	ex2_restart: 'Restart testu',
	ex3_desc: 'Poslouchej věty a vyber správné čínské znaky',
	ex3_check: 'Kontrola testu'
};

_localizationParts['ui'] = ui;

﻿var dialogs = [
	{
		title: "Rezervace pokoje", 
		icon: "M4_L2_D1.JPG",
		Parts: [
					{ lines: [  "Vítejte v hotelu Peking!" ,   "Dobrý den. Mohu si rezervovat pokoj?" ,   "Ano, jak dlouho zůstanete?" ,   "Tři dny."   ] } , 
					{ lines: [  "Jaký pokoj byste si chtěl rezervovat?" ,   "Kolik stojí dvoulůžkový pokoj?" ,   "600." ,   "Dolarů (USD) nebo juanů (RMB)?" ,   "Juanů (RMB)." ,   "Dobře, rezervuji."   ] } , 
					{ lines: [  "Kdy přijíždíte?" ,   "Pozítří." ,   "Jak se jmenujete?" ,   "Jack Smith." ,   "Dobře, zveme vás tedy do hotelu Peking." ,   "Děkuji."   ] } 
				]
	} , 
	{
		title: "V hotelu", 
		icon: "M4_L2_D2.JPG",
		Parts: [
					{ lines: [  "Vítejte v hotelu Peking!" ,   "Dobrý den, jmenuji se Jack Smith. Rezervoval jsem si pokoj." ,   "Jack Smith, ano. Dejte mi prosím váš pas." ,   "Prosím (pro vás)." ,   "Vyplňte prosím formulář." ,   "Dobře."   ] } , 
					{ lines: [  "Jak budete platit? Hotově nebo kreditní kartou?" ,   "Kreditní kartou." ,   "Podepište se prosím." ,   "Dobře." ,   "Zde je klíč."   ] } , 
					{ lines: [  "Kde je můj pokoj?" ,   "Ve 12. patře." ,   "Kde je výtah?" ,   "Zahněte vpravo. Za schodištěm." ,   "Děkuji."   ] } 
				]
	} , 
	{
		title: "Odhlášení", 
		icon: "M4_L2_D3.JPG",
		Parts: [
					{ lines: [  "Dobrý den. Chci se odhlásit. Pokoj číslo 1268." ,   "Dobře. Používal jste minibar?" ,   "Používal. 1 láhev piva." ,   "Celkem 2000 kuai."   ] } , 
					{ lines: [  "Zde je moje kreditní karta." ,   "Je mi líto. Máme problém se systémem. Zaplaťte prosím hotově." ,   "Dobře. Dejte mi prosím účtenku." ,   "Pro vás."   ] } , 
					{ lines: [  "Mohu si zde nechat zavazadlo?" ,   "Můžete." ,   "Zavolejte prosím taxi. Jedu na letiště." ,   "Dobře. Dojezd na letiště stojí 300 kuai." ,   "Jak dlouho musím čekat?" ,   "20 minut."   ] } 
				]
	} 
];

﻿var ex2 = [ "Kdy přijíždíte?" , "Kolik stojí dvoulůžkový pokoj?" , "Zavolejte prosím taxi." , "Kde je výtah?" , "Jedu na letiště." ];

﻿var vocabulary = [ "rezervovat" , "USD – americký dolar" , "RMB – juan nebo kuai – čínská měna" , "vyplnit" , "formulář" , "podpis" , "X patro" , "odhlášení" , "bar" , "pivo" ];

﻿var info = {	module: "M4",	lesson: "L2",	version: "v1.0M4L2-bg",	isEx3Type1: true,	lang: "Български",	page_title: "Хотел",	menu_note: "Този урок ще ви научи как да резервирате хотел, ще ви осигури необходимата информация за вашия престой. Ще започнем с правенето на резервация, после с регистрацията и ще завършим с напускането на хотела."};_localizationParts['info'] = info;

﻿var characters = [ 
		{ ch: "хотел", icon: "M4_L2_C1.JPG" } ,  
		{ ch: "паспорт", icon: "M4_L2_C2.JPG" } ,  
		{ ch: "кредитна карта", icon: "M4_L2_C3.JPG" } ,  
		{ ch: "стая", icon: "M4_L2_C4.JPG" } ,  
		{ ch: "ключ", icon: "M4_L2_C5.JPG" } ,  
		{ ch: "брой", icon: "M4_L2_C6.JPG" } ,  
		{ ch: "асансьор", icon: "M4_L2_C7.JPG" } ,  
		{ ch: "багаж", icon: "M4_L2_C8.JPG" } ,  
		{ ch: "такси", icon: "M4_L2_C9.JPG" } ,  
		{ ch: "летище", icon: "M4_L2_C10.JPG" } 
		];

﻿var ui = {
	menu_dialog_title: 'Диалози',
	menu_dialog_choose: 'изберете част',
	menu_vocabulary: 'Речник',
	menu_characters: 'Символи',
	menu_quiz_title: 'Викторина аудио',
	menu_quiz_choose: 'Изберете викторина',
	menu_quiz_1: 'Правилната дума',
	menu_quiz_2: 'Правилния ред',
	menu_quiz_3: 'Правилната дума',
	menu_home: 'начало',
	menu_project: 'проект',
	menu_settings: 'настройки',
	
	settings_title: 'Настройки',
	settings_dialog: 'Диалог и упражняването език',
	settings_interface: 'Език на интерфейса',
	settings_pynin: 'Пинин',
	settings_cn: 'Китайската азбука',
	
	project_about_title: 'За проекта',
	project_about: '<p style="text-align:center">'
	+ '<b>Chinese for Europeans</b><br/>'
	+ '<a href="http://www.chinese4.eu">www.chinese4.eu</a></p>'
	+ '<p>The free of charge C4EU project aims at bringing the Chinese language and culture closer to the representatives of various age and profession groups (enterpreneurs and their employees, tourists, students and children) from all EU Member States (as well as other countries) by offering products translated into 23 European languages.'
	+ '</p><p>The project is performed by the partnership of 6 European institutions (Mescomp Technologies - Poland, Antwerp Management School - Belgium, Fondazione Italia Cina - Italy, ICC International Language Association - Germany, Soros International House - Lithuania, EduActive - Poland) which are specializing in different areas: Chinese language teaching, quality of teaching materialsm programming, mobile technology and exploitation of the project results by contacting with wide group of interested parties.'
	+ '</p><p>This project has been co-founded by the European Commission.</p>'
	+ '<p>Photos attached in this application are property of Paweł Podgórski (<a href="http://echiny.pl">echiny.pl</a>) and project partners.</p>',
	
	part: 'Част',
	dialogue_listen_all: 'Изслушай целия диалог',
	exercise: 'Упражнение',
	ex1_desc: 'Чуйте думите и изберете правилния символ',
	ex1_check: 'Провери теста',
	ex2_meaning: 'значение:',
	ex2_desc: 'Поставете символите в правилния ред, <br/> за да образувате изречение',
	ex2_check: 'Провери теста',
	ex2_restart: 'Рестартирайте тест',
	ex3_desc: 'Чуйте думите и изберете правилния символ',
	ex3_check: 'Провери теста'
};

_localizationParts['ui'] = ui;

﻿var dialogs = [
	{
		title: "Резервиране на стая", 
		icon: "M4_L2_D1.JPG",
		Parts: [
					{ lines: [  "Хотел Пекин, заповядайте!" ,   "Здравейте. Може ли да резервирам стая?" ,   "Да. Колко време ще останете?" ,   "Три дни."   ] } , 
					{ lines: [  "Каква стая желаете да резервирате?" ,   "Колко струва двойна стая?" ,   "600." ,   "Щатски долара или Ренминби?" ,   "Ренминби." ,   "Ще резервирам."   ] } , 
					{ lines: [  "Кога пристигате?" ,   "Вдругиден." ,   "Как се казвате?" ,   "Джак Смит." ,   "Ок, заповядайте в Хотел Пекин." ,   "Благодаря!"   ] } 
				]
	} , 
	{
		title: "В хотела", 
		icon: "M4_L2_D2.JPG",
		Parts: [
					{ lines: [  "Хотел Пекин, добре дошли!" ,   "Здравейте, казвам се Джак Смит. Запазих стая." ,   "Джак Смит, да. Моля дайте ми паспорта си." ,   "Заповядайте." ,   "Моля попълнете формуляра." ,   "Ок."   ] } , 
					{ lines: [  "Как ще платите? В брой или с кредитна карта?" ,   "Кредитна карта." ,   "Моля подпишете се." ,   "Ок." ,   "Това е ключът Ви."   ] } , 
					{ lines: [  "Къде е стаята ми?" ,   "12-ти етаж." ,   "Къде е асансьорът?" ,   "Завийте надясно. Зад стълбите." ,   "Благодаря Ви."   ] } 
				]
	} , 
	{
		title: "Напускане", 
		icon: "M4_L2_D3.JPG",
		Parts: [
					{ lines: [  "Здрвайте. Напускам. Номера на стаята е 1268." ,   "Ок. Иползвахте ли мини-бара?" ,   "Иползвах го. 1 бутилка бира." ,   "Общо 2000 йени."   ] } , 
					{ lines: [  "Кредитната ми карта." ,   "Съжалявам. Има проблем със системата. Моля платете в брой." ,   "Ок. Моля, дайте ми касова бележка." ,   "Заповядайте."   ] } , 
					{ lines: [  "Може ли да оставя багажа си тук?" ,   "Можете." ,   "Моля повикайте такси. Отивам на летището." ,   "Ок. Отиване до летището е 300 йени." ,   "Колко време трябва да чакам?" ,   "20 минути."   ] } 
				]
	} 
];

﻿var ex2 = [ "Кога пристигате?" , "Колко струва двойна стая?" , "Моля повикайте такси." , "Къде е асансьорът?" , "Отивам на летището." ];

﻿var vocabulary = [ "запазвам/резервирам" , "щатски долара" , "ренминби" , "попълвам" , "формуляр" , "подписвам" , "Х-ти етаж" , "напускам/отписвам се" , "бар" , "бира" ];

﻿var info = {	module: "M4",	lesson: "L2",	version: "v1.0M4L2-nn",	isEx3Type1: true,	lang: "Norsk",	page_title: "Hotell",	menu_note: "I denne leksjonen lærer du hvordan du bestiller et hotellrom og hvordan du gir og får nødvendig informasjon om oppholdet ditt. Vi begynner med å bestille et hotellrom, deretter sjekker vi inn og til slutt sjekker vi ut av hotellet."};_localizationParts['info'] = info;

﻿var characters = [ 
		{ ch: "hotell", icon: "M4_L2_C1.JPG" } ,  
		{ ch: "pass", icon: "M4_L2_C2.JPG" } ,  
		{ ch: "kredittkort", icon: "M4_L2_C3.JPG" } ,  
		{ ch: "rom", icon: "M4_L2_C4.JPG" } ,  
		{ ch: "nøkkel", icon: "M4_L2_C5.JPG" } ,  
		{ ch: "kontant", icon: "M4_L2_C6.JPG" } ,  
		{ ch: "heis", icon: "M4_L2_C7.JPG" } ,  
		{ ch: "bagasje", icon: "M4_L2_C8.JPG" } ,  
		{ ch: "taxi", icon: "M4_L2_C9.JPG" } ,  
		{ ch: "flyplass", icon: "M4_L2_C10.JPG" } 
		];

﻿var ui = {
	menu_dialog_title: 'Dialoger',
	menu_dialog_choose: 'velger en del',
	menu_vocabulary: 'Gloser',
	menu_characters: 'Tegn',
	menu_quiz_title: 'Quiz lyd',
	menu_quiz_choose: 'velger quiz',
	menu_quiz_1: 'Riktig ord',
	menu_quiz_2: 'Riktig rekkefølge',
	menu_quiz_3: 'Riktig ord',
	menu_home: 'hjem',
	menu_project: 'prosjekt',
	menu_settings: 'innstillinger',
	
	settings_title: 'Innstillinger',
	settings_dialog: 'Språk av dialoger og øvelser',
	settings_interface: 'Grensesnittspråk',
	settings_pynin: 'Pinyin',
	settings_cn: 'Kinesiske alfabetet',
	
	project_about_title: 'Om prosjektet',
	project_about: '<p style="text-align:center">'
	+ '<b>Chinese for Europeans</b><br/>'
	+ '<a href="http://www.chinese4.eu">www.chinese4.eu</a></p>'
	+ '<p>The free of charge C4EU project aims at bringing the Chinese language and culture closer to the representatives of various age and profession groups (enterpreneurs and their employees, tourists, students and children) from all EU Member States (as well as other countries) by offering products translated into 23 European languages.'
	+ '</p><p>The project is performed by the partnership of 6 European institutions (Mescomp Technologies - Poland, Antwerp Management School - Belgium, Fondazione Italia Cina - Italy, ICC International Language Association - Germany, Soros International House - Lithuania, EduActive - Poland) which are specializing in different areas: Chinese language teaching, quality of teaching materialsm programming, mobile technology and exploitation of the project results by contacting with wide group of interested parties.'
	+ '</p><p>This project has been co-founded by the European Commission.</p>'
	+ '<p>Photos attached in this application are property of Paweł Podgórski (<a href="http://echiny.pl">echiny.pl</a>) and project partners.</p>',
	
	part: 'Del',
	dialogue_listen_all: 'Lytt all dialog',
	exercise: 'Øvelse',
	ex1_desc: 'Hør ordet og velge riktig kinesiske tegn',
	ex1_check: 'Sjekk test',
	ex2_meaning: 'betyr:',
	ex2_desc: 'Ordne tegnene i riktig rekkefølge slik<br/> at du får en korrekt setning',
	ex2_check: 'Sjekk test',
	ex2_restart: 'Restart test',
	ex3_desc: 'Hør ordet og velge riktig kinesiske tegn',
	ex3_check: 'Sjekk test'
};

_localizationParts['ui'] = ui;

﻿var dialogs = [
	{
		title: "Bestille et rom", 
		icon: "M4_L2_D1.JPG",
		Parts: [
					{ lines: [  "Beijing hotell, velkommen!" ,   "Hei! Kan jeg få bestille et rom?" ,   "Ja, for hvor lenge?" ,   "Tre dager."   ] } , 
					{ lines: [  "Hva slags rom vil du bestille?" ,   "Hvor mye koster et dobbeltrom?" ,   "600." ,   "Amerikanske dollar eller yen?" ,   "Yen." ,   "Jeg bestiller det."   ] } , 
					{ lines: [  "Når kommer du?" ,   "I overimorgen." ,   "Hva er navnet ditt?" ,   "Jack Smith." ,   "OK, velkommen til Beijing hotell." ,   "Takk!"   ] } 
				]
	} , 
	{
		title: "På hotellet", 
		icon: "M4_L2_D2.JPG",
		Parts: [
					{ lines: [  "Velkommen til Beijing hotell!" ,   "Hei, jeg heter Jack Smith. Jeg har bestilt rom." ,   "Jack Smith, ja. Kan jeg få passet ditt?" ,   "Til deg." ,   "Kan du fylle ut dette skjemaet?" ,   "Ok."   ] } , 
					{ lines: [  "Hvordan vil du betale? Kontant eller med kredittkort?" ,   "Kredittkort." ,   "Skriv under her." ,   "Ok." ,   "Her er nøkkelen din."   ] } , 
					{ lines: [  "Hvor er rommet mitt?" ,   "I tolvte etasje." ,   "Hvor er heisen?" ,   "Gå til høyre. Bak trappen." ,   "Takk."   ] } 
				]
	} , 
	{
		title: "Sjekke ut", 
		icon: "M4_L2_D3.JPG",
		Parts: [
					{ lines: [  "Hei. Jeg vil sjekke ut. Romnummeret er 1268." ,   "OK. Brukte du minibaren?" ,   "Ja. 1 flaske øl." ,   "Det blir til sammen 2000 yen."   ] } , 
					{ lines: [  "Her er kredittkortet mitt." ,   "Jeg beklager. Det er et problem med systemet. Kan du betale kontant?" ,   "OK. Kan du gi meg en kvittering?" ,   "Vær så god."   ] } , 
					{ lines: [  "Kan jeg sette bagasjen her?" ,   "Det kan du." ,   "Kan du bestille en taxi til meg? Jeg skal til flyplassen." ,   "OK. En taxi til flyplassen koster 300 yen." ,   "Hvor lenge må jeg vente?" ,   "20 minutter."   ] } 
				]
	} 
];

﻿var ex2 = [ "Når kommer du?" , "Hvor mye koster et dobbeltrom?" , "Kan du bestille en taxi til meg?" , "Hvor er heisen?" , "Jeg skal til flyplassen." ];

﻿var vocabulary = [ "bestille/reservere" , "amerikanske dollar" , "yen" , "fylle ut" , "skjema" , "skrive under" , "X. etasje" , "sjekke ut" , "bar" , "øl" ];

﻿var cn_characters = [ "饭店" , "护照" , "信用卡" , "房间" , "钥匙" , "现金" , "电梯" , "行李" , "出租车" , "机场" ];

﻿var cn_ex3 =[
	{ ch1: "出租车", ch2: "信用卡", correct: 2 } ,  
	{ ch1: "商店", ch2: "饭店", correct: 2 } ,  
	{ ch1: "电梯", ch2: "楼梯", correct: 1 } ,  
	{ ch1: "机场", ch2: "广场", correct: 1 } ,  
	{ ch1: "照片", ch2: "护照", correct: 2 } 
];

﻿var cn_dialogs = [
	{
		title: '订房间', 
		icon: 'M4_L2_D1.JPG',
		Parts: [
					{ lines: [  "您好！这里是北京饭店！" ,   "你好。我想订一间房。" ,   "可以。您住几天？" ,   "三天。"   ] } , 
					{ lines: [  "您想订什么房间？" ,   "双人房间多少钱？" ,   "一天六百块。" ,   "美元还是人民币？" ,   "人民币。" ,   "好，我订一间。"   ] } , 
					{ lines: [  "您什么时候来？" ,   "后天。" ,   "请问您的姓名。" ,   "Jack Smith." ,   "好，欢迎来北京饭店。" ,   "谢谢！"   ] } 
				]
	} , 
	{
		title: '在饭店', 
		icon: 'M4_L2_D2.JPG',
		Parts: [
					{ lines: [  "北京饭店，您好！" ,   "你好，我叫 Jack Smith. 我订了间房。" ,   "Jack Smith, 对。请给我您的护照。" ,   "给你。" ,   "请填这张单子。" ,   "好。"   ] } , 
					{ lines: [  "您怎么付钱？现金还是信用卡？" ,   "信用卡。" ,   "请在这边签名。" ,   "好。" ,   "这是您的钥匙。"   ] } , 
					{ lines: [  "我的房间在哪里？" ,   "十二楼。" ,   "电梯在哪里？" ,   "往右拐。在楼梯后面。" ,   "谢谢。"   ] } 
				]
	} , 
	{
		title: '退房', 
		icon: 'M4_L2_D3.JPG',
		Parts: [
					{ lines: [  "你好，我退房。房间号是一二六八。" ,   "好。您用了迷你酒吧吗？" ,   "有。一瓶啤酒。" ,   "一共两千块。"   ] } , 
					{ lines: [  "这是我的信用卡。" ,   "对不起。系统有问题。请用现金付。" ,   "好。请给我收据。" ,   "给您。"   ] } , 
					{ lines: [  "可以在这儿存行李吗？" ,   "可以。" ,   "请叫出租车。我去机场。" ,   "好。去机场三百块。" ,   "要等多久？" ,   "二十分钟。"   ] } 
				]
	} 
];

﻿var cn_ex2 =[
	{
		cn: [  "时" ,  "候" ,  "您" ,  "来" ,  "什" ,  "么"  ],
		pyn: [  "shí" ,   "hou" ,   "nín" ,   "lái" ,   "shén" ,   "me"   ],
		order: [  4 ,   5 ,   1 ,   6 ,   2 ,   3  ]
	} , 
	{
		cn: [  "房" ,  "间" ,  "多" ,  "少" ,  "双" ,  "人" ,  "钱"  ],
		pyn: [  "fáng" ,   "jiān" ,   "duō" ,   "shăo" ,   "shuāng" ,   "rén" ,   "qián"   ],
		order: [  3 ,   4 ,   5 ,   6 ,   1 ,   2 ,   7  ]
	} , 
	{
		cn: [  "出" ,  "租" ,  "车" ,  "叫" ,  "请"  ],
		pyn: [  "chū" ,   "zū" ,   "chē" ,   "jiào" ,   "qĭng"   ],
		order: [  3 ,   4 ,   5 ,   2 ,   1  ]
	} , 
	{
		cn: [  "哪" ,  "里" ,  "在" ,  "电" ,  "梯"  ],
		pyn: [  "nă" ,   "lĭ" ,   "zài" ,   "diàn" ,   "tī"   ],
		order: [  4 ,   5 ,   3 ,   1 ,   2  ]
	} , 
	{
		cn: [  "机" ,  "场" ,  "我" ,  "去"  ],
		pyn: [  "jī" ,   "chăng" ,   "wŏ" ,   "qù"   ],
		order: [  3 ,   4 ,   1 ,   2  ]
	} 
];

﻿var cn_ex1 = [ 
	{ ch1: "咔", ch2: "卡", correct: 2 } ,  
	{ ch1: "反", ch2: "饭", correct: 2 } ,  
	{ ch1: "点", ch2: "电", correct: 2 } ,  
	{ ch1: "厂", ch2: "场", correct: 2 } ,  
	{ ch1: "娄", ch2: "楼", correct: 2 } 
];

﻿var cn_vocabulary = [ "订" , "美元" , "人民币" , "填" , "单子" , "签名" , "第 X 楼" , "退房" , "酒吧" , "啤酒" ];

﻿var info = {	module: "M4",	lesson: "L2",	version: "v1.0M4L2-es",	isEx3Type1: true,	lang: "Español",	page_title: "Hotel",	menu_note: "Esta lección mostrará cómo reservar una habitación de hotel, mostrará informaciones imprescindibles relativas a la estancia. Empezaremos haciendo una reserva, seguidamente nos registraremos en el hotel y finalizaremos abandonándolo."};_localizationParts['info'] = info;

﻿var characters = [ 
		{ ch: "hotel", icon: "M4_L2_C1.JPG" } ,  
		{ ch: "pasaporte", icon: "M4_L2_C2.JPG" } ,  
		{ ch: "tarjeta de crédito", icon: "M4_L2_C3.JPG" } ,  
		{ ch: "habitación", icon: "M4_L2_C4.JPG" } ,  
		{ ch: "llave", icon: "M4_L2_C5.JPG" } ,  
		{ ch: "efectivo", icon: "M4_L2_C6.JPG" } ,  
		{ ch: "ascensor", icon: "M4_L2_C7.JPG" } ,  
		{ ch: "equipaje", icon: "M4_L2_C8.JPG" } ,  
		{ ch: "taxi", icon: "M4_L2_C9.JPG" } ,  
		{ ch: "aeropuerto", icon: "M4_L2_C10.JPG" } 
		];

﻿var ui = {
	menu_dialog_title: 'Diálogos',
	menu_dialog_choose: 'elegir parte',
	menu_vocabulary: 'Vocabulario',
	menu_characters: 'Signos',
	menu_quiz_title: 'Prueba de audio',
	menu_quiz_choose: 'elegir concurso',
	menu_quiz_1: 'Palabra correcta',
	menu_quiz_2: 'Orden correcto',
	menu_quiz_3: 'Palabra correcta',
	menu_home: 'página principal',
	menu_project: 'proyecto',
	menu_settings: 'ajustes',
	
	settings_title: 'Ajustes',
	settings_dialog: 'Idioma de los diálogos y ejercicios',
	settings_interface: 'Idioma del interfaz',
	settings_pynin: 'Pinyin',
	settings_cn: 'Alfabeto chino',
	
	project_about_title: 'Sobre el proyecto',
	project_about: '<p style="text-align:center">'
	+ '<b>Chinese for Europeans</b><br/>'
	+ '<a href="http://www.chinese4.eu">www.chinese4.eu</a></p>'
	+ '<p>The free of charge C4EU project aims at bringing the Chinese language and culture closer to the representatives of various age and profession groups (enterpreneurs and their employees, tourists, students and children) from all EU Member States (as well as other countries) by offering products translated into 23 European languages.'
	+ '</p><p>The project is performed by the partnership of 6 European institutions (Mescomp Technologies - Poland, Antwerp Management School - Belgium, Fondazione Italia Cina - Italy, ICC International Language Association - Germany, Soros International House - Lithuania, EduActive - Poland) which are specializing in different areas: Chinese language teaching, quality of teaching materialsm programming, mobile technology and exploitation of the project results by contacting with wide group of interested parties.'
	+ '</p><p>This project has been co-founded by the European Commission.</p>'
	+ '<p>Photos attached in this application are property of Paweł Podgórski (<a href="http://echiny.pl">echiny.pl</a>) and project partners.</p>',
	
	part: 'Parte',
	dialogue_listen_all: 'Escucha todo el diálogo',
	exercise: 'Ejercicio',
	ex1_desc: 'Escucha la palabra y elegir los caracteres correctos',
	ex1_check: 'Revisar el test',
	ex2_meaning: 'significado:',
	ex2_desc: 'Ordena las letras chinas en orden adecuado,<br/> para formar una oración',
	ex2_check: 'Revisar el test',
	ex2_restart: 'Reinicie prueba',
	ex3_desc: 'Escucha la palabra y elegir los caracteres correctos',
	ex3_check: 'Revisar el test'
};

_localizationParts['ui'] = ui;

﻿var dialogs = [
	{
		title: "Reserva de habitación", 
		icon: "M4_L2_D1.JPG",
		Parts: [
					{ lines: [  "¡Pekín Hotel, bienvenidos!" ,   "Buenos días. ¿Puedo reservar una habitación?" ,   "Si, ¿cuánto tiempo permanecerá?" ,   "Tres días."   ] } , 
					{ lines: [  "¿Qué tipo de habitación desea reservar?" ,   "¿Cuánto cuesta una habitación doble?" ,   "600." ,   "¿Dólares (USD) o Yuan (RMB)?" ,   "Yuan (RMB)." ,   "Bien, entonces hago la reserva."   ] } , 
					{ lines: [  "¿Cuándo llegará?" ,   "Pasado mañana." ,   "¿Cómo se llama?" ,   "Jack Smith." ,   "Bien, sea bienvenido al Pekín Hotel." ,   "¡Gracias!"   ] } 
				]
	} , 
	{
		title: "En el hotel", 
		icon: "M4_L2_D2.JPG",
		Parts: [
					{ lines: [  "¡Pekín Hotel, bienvenido!" ,   "Buenos días, me llamo Jack Smith. He reservado una habitación." ,   "Jack Smith, si. Su pasaporte, por favor." ,   "Aquí tiene." ,   "Por favor, rellene el formulario." ,   "Bien."   ] } , 
					{ lines: [  "¿Cómo desea pagar? ¿Efectivo o tarjeta de crédito?" ,   "Tarjeta de crédito." ,   "Por favor, escriba su apellido." ,   "Bien." ,   "Esta es su llave."   ] } , 
					{ lines: [  "¿Dónde se encuentra mi habitación?" ,   "En la 12 planta." ,   "¿Dónde está el ascensor?" ,   "Gire a la derecha. Tras la escalera." ,   "Gracias."   ] } 
				]
	} , 
	{
		title: "Abandonar el hotel", 
		icon: "M4_L2_D3.JPG",
		Parts: [
					{ lines: [  "Buenos días. Deseo abandonar el hotel. Habitación número 1268." ,   "Bien. ¿Ha utilizado usted el minibar?" ,   "Si, lo utilicé. 1 botella de cerveza." ,   "En total 2000 kuai."   ] } , 
					{ lines: [  "Esta es mi tarjeta de crédito." ,   "Los siento. Tenemos un problema con el sistem. Por favor, pague en efectivo." ,   "Bien. Por favor, deme el recibo." ,   "Aquí tiene."   ] } , 
					{ lines: [  "¿Puedo dejar aquí mi equipaje?" ,   "Si, puede." ,   "Por favor, llame un taxi. Me voy al aeropuerto." ,   "Bien. El viaje al aeropuerto cuesta 300 kuai." ,   "¿Cuánto tiempo debo esperar?" ,   "20 minutos."   ] } 
				]
	} 
];

﻿var ex2 = [ "¿Cuándo llegará?" , "¿Cuánto cuesta una habitación doble?" , "Por favor, llame un taxi." , "¿Dónde está el ascensor?" , "Me voy al aeropuerto." ];

﻿var vocabulary = [ "reservar" , "USD - dólar" , "RMB - yuan o kuai - moneda china" , "rellenar" , "formulario" , "firma" , "planta X" , "salir, abandonar" , "bar" , "cerveza" ];

﻿var info = {	module: "M4",	lesson: "L2",	version: "v1.0M4L2-pl",	isEx3Type1: true,	lang: "Polski",	page_title: "Hotel",	menu_note: "Ta lekcja pokaże jak zarezerwować pokój w hotelu, zaprezentuje niezbędne informacje dotyczące pobytu. Zaczniemy od dokonania rezerwacji, potem zameldowania i zakończymy opuszczeniem hotelu."};_localizationParts['info'] = info;

﻿var characters = [ 
		{ ch: "hotel", icon: "M4_L2_C1.JPG" } ,  
		{ ch: "paszport", icon: "M4_L2_C2.JPG" } ,  
		{ ch: "karta kredytowa", icon: "M4_L2_C3.JPG" } ,  
		{ ch: "pokój", icon: "M4_L2_C4.JPG" } ,  
		{ ch: "klucz", icon: "M4_L2_C5.JPG" } ,  
		{ ch: "gotówka", icon: "M4_L2_C6.JPG" } ,  
		{ ch: "winda", icon: "M4_L2_C7.JPG" } ,  
		{ ch: "bagaż", icon: "M4_L2_C8.JPG" } ,  
		{ ch: "taksówka", icon: "M4_L2_C9.JPG" } ,  
		{ ch: "lotnisko", icon: "M4_L2_C10.JPG" } 
		];

﻿var ui = {
	menu_dialog_title: 'Dialogi',
	menu_dialog_choose: 'wybierz rozdział',
	menu_vocabulary: 'Słownictwo',
	menu_characters: 'Znaki',
	menu_quiz_title: 'Quiz audio',
	menu_quiz_choose: 'wybierz quiz',
	menu_quiz_1: 'Poprawne słowo',
	menu_quiz_2: 'Poprawna kolejność',
	menu_quiz_3: 'Poprawne słowo',
	menu_home: 'strona główna',
	menu_project: 'projekt',
	menu_settings: 'ustawienia',
	
	settings_title: 'Ustawienia',
	settings_dialog: 'język dialogów i ćwiczeń',
	settings_interface: 'Język interfejsu',
	settings_pynin: 'Pinyin',
	settings_cn: 'Alfabet chiński',
	
	project_about_title: 'O projekcie',
	project_about: '<p style="text-align:center">'
	+ '<b>Chinese for Europeans</b><br/>'
	+ '<a href="http://www.chinese4.eu">www.chinese4.eu</a></p>'
	+ '<p>The free of charge C4EU project aims at bringing the Chinese language and culture closer to the representatives of various age and profession groups (enterpreneurs and their employees, tourists, students and children) from all EU Member States (as well as other countries) by offering products translated into 23 European languages.'
	+ '</p><p>The project is performed by the partnership of 6 European institutions (Mescomp Technologies - Poland, Antwerp Management School - Belgium, Fondazione Italia Cina - Italy, ICC International Language Association - Germany, Soros International House - Lithuania, EduActive - Poland) which are specializing in different areas: Chinese language teaching, quality of teaching materialsm programming, mobile technology and exploitation of the project results by contacting with wide group of interested parties.'
	+ '</p><p>This project has been co-founded by the European Commission.</p>'
	+ '<p>Photos attached in this application are property of Paweł Podgórski (<a href="http://echiny.pl">echiny.pl</a>) and project partners.</p>',
	
	part: 'Rozdział',
	dialogue_listen_all: 'Odsłuchaj cały dialog',
	exercise: 'Ćwiczenie',
	ex1_desc: 'Posłuchaj słów i wybierz odpowiednie znaki chińskie',
	ex1_check: 'Sprawdź test',
	ex2_meaning: 'meaning:',
	ex2_desc: 'Ułóż znaki chińskie w odpowiednim porządku,<br/> tak aby utworzyły zdanie',
	ex2_check: 'Sprawdź test',
	ex2_restart: 'Restartuj test',
	ex3_desc: 'Posłuchaj słów i wybierz odpowiednie znaki chińskie',
	ex3_check: 'Sprawdź test'
};

_localizationParts['ui'] = ui;

﻿var dialogs = [
	{
		title: "Rezerwacja pokoju", 
		icon: "M4_L2_D1.JPG",
		Parts: [
					{ lines: [  "Beijing Hotel, witamy!" ,   "Dzień dobry. Czy mogę zarezerwować pokój?" ,   "Tak, jak długo się Pan zatrzyma?" ,   "Trzy dni."   ] } , 
					{ lines: [  "Jaki pokój chciałby Pan zarezerwować?" ,   "Ile kosztuje pokój dwuosobowy?" ,   "600." ,   "Dolarów (USD) lub Yuanów (RMB)?" ,   "Yuanów (RMB)." ,   "Dobrze, a więc rezerwuję."   ] } , 
					{ lines: [  "Kiedy Pan przyjeżdza?" ,   "Pojutrze." ,   "Jak się Pan nazywa?" ,   "Jack Smith." ,   "Dobrze, więc zapraszamy do Beijing Hotel." ,   "Dziękuję."   ] } 
				]
	} , 
	{
		title: "W hotelu", 
		icon: "M4_L2_D2.JPG",
		Parts: [
					{ lines: [  "Beijing Hotel, witamy!" ,   "Dzień dobry, nazywam się Jack Smith. Zarezerwowałem pokój." ,   "Jack Smith, tak. Poproszę o paszport." ,   "Proszę." ,   "Proszę uzupełnić formularz." ,   "Dobrze."   ] } , 
					{ lines: [  "Jaka będzie forma płatności. Gotówka czy karta kredytowa?" ,   "Karta kredytowa." ,   "Proszę wpisać nazwisko." ,   "Dobrze." ,   "Oto klucz."   ] } , 
					{ lines: [  "Gdzie znajduje się mój pokój?" ,   "Na 12-tym piętrze." ,   "Gdzie jest winda?" ,   "Proszę skręcić w prawo. Za schodami." ,   "Dziękuję."   ] } 
				]
	} , 
	{
		title: "Wymeldowanie", 
		icon: "M4_L2_D3.JPG",
		Parts: [
					{ lines: [  "Dzień dobry. Chcę się wymeldować. Pokój numer 1268." ,   "Dobrze. Czy używał Pan minibaru?" ,   "Używałem. 1 butelkę piwa." ,   "Razem 2000 kuai."   ] } , 
					{ lines: [  "Oto moja karta kredytowa." ,   "Przykro mi. Mamy problem z systemem. Proszę dokonać opłaty gotówką." ,   "Dobrze. Proszę o paragon." ,   "Dla Pana."   ] } , 
					{ lines: [  "Czy mogę zostawić tu bagaż?" ,   "Może Pan." ,   "Proszę zadzwonić po taksówkę. Wybieram się na lotnisko." ,   "Dobrze. Dojazd na lotnisko wynosi 300 kuai." ,   "Jak długo muszę czekać?" ,   "20 minut."   ] } 
				]
	} 
];

﻿var ex2 = [ "Kiedy Pan przyjeżdża?" , "Ile kosztuje pokój dwuosobowy?" , "Proszę zadzwonić po taksówkę." , "Gdzie jest winda?" , "Wybieram się na lotnisko." ];

﻿var vocabulary = [ "rezerwować" , "USD -dolar amerykański" , "RMB - yuan lub kuai - waluta chińska" , "wypełnić" , "formularz" , "podpis" , "X piętro" , "wymeldowanie" , "bar" , "piwo" ];

﻿var info = {	module: "M4",	lesson: "L2",	version: "v1.0M4L2-sk",	isEx3Type1: true,	lang: "Slovenský",	page_title: "Hotel",	menu_note: "V tejto lekcii sa budeme učiť rezervovať izbu v hoteli, predstaviť nevyhnutné informácie týkajúce sa tvojho pobytu. Začneme od zarezervovania hotelovej izby, cez vstupnú recepciu (zápis a odbavenie) a skončíme na odhlásení z hotela."};_localizationParts['info'] = info;

﻿var characters = [ 
		{ ch: "hotel", icon: "M4_L2_C1.JPG" } ,  
		{ ch: "pas", icon: "M4_L2_C2.JPG" } ,  
		{ ch: "kreditná karta", icon: "M4_L2_C3.JPG" } ,  
		{ ch: "izba", icon: "M4_L2_C4.JPG" } ,  
		{ ch: "kľúč", icon: "M4_L2_C5.JPG" } ,  
		{ ch: "hotovosť", icon: "M4_L2_C6.JPG" } ,  
		{ ch: "výťah", icon: "M4_L2_C7.JPG" } ,  
		{ ch: "batožina", icon: "M4_L2_C8.JPG" } ,  
		{ ch: "taxík", icon: "M4_L2_C9.JPG" } ,  
		{ ch: "letisko", icon: "M4_L2_C10.JPG" } 
		];

﻿var ui = {
	menu_dialog_title: 'Dialógy',
	menu_dialog_choose: 'vyberte časť',
	menu_vocabulary: 'Slovník',
	menu_characters: 'Znaky',
	menu_quiz_title: 'Kvíz zvuk',
	menu_quiz_choose: 'výber kvíz',
	menu_quiz_1: 'Správne slovo',
	menu_quiz_2: 'Správne poradie',
	menu_quiz_3: 'Správne slovo',
	menu_home: 'domovská stránka',
	menu_project: 'projekt',
	menu_settings: 'nastavenie',
	
	settings_title: 'Nastavenie',
	settings_dialog: 'Jazyk dialógov a cvičení',
	settings_interface: 'Jazyk užívateľské rozhrania',
	settings_pynin: 'Pinyin',
	settings_cn: 'Čínsky abeceda',
	
	project_about_title: 'O projekte',
	project_about: '<p style="text-align:center">'
	+ '<b>Chinese for Europeans</b><br/>'
	+ '<a href="http://www.chinese4.eu">www.chinese4.eu</a></p>'
	+ '<p>The free of charge C4EU project aims at bringing the Chinese language and culture closer to the representatives of various age and profession groups (enterpreneurs and their employees, tourists, students and children) from all EU Member States (as well as other countries) by offering products translated into 23 European languages.'
	+ '</p><p>The project is performed by the partnership of 6 European institutions (Mescomp Technologies - Poland, Antwerp Management School - Belgium, Fondazione Italia Cina - Italy, ICC International Language Association - Germany, Soros International House - Lithuania, EduActive - Poland) which are specializing in different areas: Chinese language teaching, quality of teaching materialsm programming, mobile technology and exploitation of the project results by contacting with wide group of interested parties.'
	+ '</p><p>This project has been co-founded by the European Commission.</p>'
	+ '<p>Photos attached in this application are property of Paweł Podgórski (<a href="http://echiny.pl">echiny.pl</a>) and project partners.</p>',
	
	part: 'Časť',
	dialogue_listen_all: 'Vypočuj si celý dialóg',
	exercise: 'Cvičenie',
	ex1_desc: 'Počujte slovo a vyber správne čínske znaky',
	ex1_check: 'Skontroluj test',
	ex2_meaning: 'význam:',
	ex2_desc: 'Poukladaj čínske znaky v správnom poradí<br/> tak, aby vytvorili vetu',
	ex2_check: 'Skontroluj test',
	ex2_restart: 'Restart testu',
	ex3_desc: 'Počujte slovo a vyber správne čínske znaky',
	ex3_check: 'Skontroluj test'
};

_localizationParts['ui'] = ui;

﻿var dialogs = [
	{
		title: "Rezervácia izby", 
		icon: "M4_L2_D1.JPG",
		Parts: [
					{ lines: [  "Beijing Hotel, vitajte!" ,   "Dobrý deň. Môžem rezervovať izbu?" ,   "Áno, ako dlho chcete zostať?" ,   "Tri dni."   ] } , 
					{ lines: [  "Akú izbu chcete rezervovať?" ,   "Koľko stojí dvojposteľová izba?" ,   "600." ,   "Dolárov (USD) alebo juanov (CNY)?" ,   "Juanov (CNY)." ,   "Dobre, rezervujem."   ] } , 
					{ lines: [  "Kedy prichádzate?" ,   "Pozajtra." ,   "Ako sa voláte?" ,   "Jack Smith." ,   "Dobre, pozývam vás do Beijing Hotel." ,   "Ďakujem."   ] } 
				]
	} , 
	{
		title: "V hoteli", 
		icon: "M4_L2_D2.JPG",
		Parts: [
					{ lines: [  "Beijing Hotel, vitajte!" ,   "Dobrý deň, volám sa Jack Smith. Mám rezervovanú izbu." ,   "Jack Smith, áno. Prosím váš pas." ,   "Nech sa páči." ,   "Prosím, vyplňte formulár." ,   "Dobre."   ] } , 
					{ lines: [  "Ako budete platiť? V hotovosti alebo kreditnou kartou?" ,   "Kreditnou kartou." ,   "Prosím, vpíšte vaše priezvisko." ,   "Dobre." ,   "Toto je váš kľúč."   ] } , 
					{ lines: [  "Kde nájdem moju izbu?" ,   "Na 12. poschodí." ,   "Kde je výťah?" ,   "Prosím, odpočte vpravo. Za schodmi." ,   "Ďakujem."   ] } 
				]
	} , 
	{
		title: "Odhlásenie", 
		icon: "M4_L2_D3.JPG",
		Parts: [
					{ lines: [  "Dobrý deň. Chcem sa odhlásiť. Izba číslo 1268." ,   "Dobre. Použili ste minibar?" ,   "Áno. 1 fľaša piva." ,   "Spolu 2000 kuai."   ] } , 
					{ lines: [  "Moja kreditná karta." ,   "Je mi ľúto. Máme problém so systémom. Prosím, môžete zaplatiť v hotovosti." ,   "Dobre. Prosím, potvrdenie." ,   "Pre vás."   ] } , 
					{ lines: [  "Môžem si tu nechať batožinu?" ,   "Áno, môžete." ,   "Prosím, zavolajte taxík. Idem na letisko." ,   "Dobre. Cesta na letisko stojí 300 kuai." ,   "Ako dlho musím čakať?" ,   "20 minút."   ] } 
				]
	} 
];

﻿var ex2 = [ "Kedy prichádzate?" , "Koľko stojí dvojposteľová izba?" , "Prosím, zavolajte taxík." , "Kde je výťah?" , "Idem na letisko." ];

﻿var vocabulary = [ "rezervovať" , "USD – americký dolár" , "CNY/RMB – juan alebo kuai – čínsky juan" , "vyplniť" , "formulár" , "podpis" , "X. poschodie" , "odhlásenie" , "bar" , "pivo" ];

﻿var info = {	module: "M4",	lesson: "L2",	version: "v1.0M4L2-sv",	isEx3Type1: true,	lang: "Svensk",	page_title: "Hotell",	menu_note: "Denna lektion kommer att visa dig hur du går till väga för att boka rum samt skaffa dig all nödvändig information i samband med en hotellvistelse. Vi ska börja med att boka ett rum och sedan kommer in- och ut checkning."};_localizationParts['info'] = info;

﻿var characters = [ 
		{ ch: "hotell", icon: "M4_L2_C1.JPG" } ,  
		{ ch: "pass", icon: "M4_L2_C2.JPG" } ,  
		{ ch: "kreditkort", icon: "M4_L2_C3.JPG" } ,  
		{ ch: "rum", icon: "M4_L2_C4.JPG" } ,  
		{ ch: "nyckel", icon: "M4_L2_C5.JPG" } ,  
		{ ch: "kontant", icon: "M4_L2_C6.JPG" } ,  
		{ ch: "hiss", icon: "M4_L2_C7.JPG" } ,  
		{ ch: "bagage", icon: "M4_L2_C8.JPG" } ,  
		{ ch: "taxi", icon: "M4_L2_C9.JPG" } ,  
		{ ch: "flygplats", icon: "M4_L2_C10.JPG" } 
		];

﻿var ui = {
	menu_dialog_title: 'Dialoger',
	menu_dialog_choose: 'välj en del',
	menu_vocabulary: 'Vokabulär',
	menu_characters: 'Tecken',
	menu_quiz_title: 'Quiz ljud',
	menu_quiz_choose: 'välj frågesport',
	menu_quiz_1: 'Rätt ord',
	menu_quiz_2: 'Rätt ordning',
	menu_quiz_3: 'Rätt ord',
	menu_home: 'hemsidan',
	menu_project: 'projekt',
	menu_settings: 'inställningar',
	
	settings_title: 'Inställningar',
	settings_dialog: 'Språket i dialoger och övningar',
	settings_interface: 'Gränssnittets språk',
	settings_pynin: 'Pinyin',
	settings_cn: 'Kinesiska alfabetet',
	
	project_about_title: 'Om projekt',
	project_about: '<p style="text-align:center">'
	+ '<b>Chinese for Europeans</b><br/>'
	+ '<a href="http://www.chinese4.eu">www.chinese4.eu</a></p>'
	+ '<p>The free of charge C4EU project aims at bringing the Chinese language and culture closer to the representatives of various age and profession groups (enterpreneurs and their employees, tourists, students and children) from all EU Member States (as well as other countries) by offering products translated into 23 European languages.'
	+ '</p><p>The project is performed by the partnership of 6 European institutions (Mescomp Technologies - Poland, Antwerp Management School - Belgium, Fondazione Italia Cina - Italy, ICC International Language Association - Germany, Soros International House - Lithuania, EduActive - Poland) which are specializing in different areas: Chinese language teaching, quality of teaching materialsm programming, mobile technology and exploitation of the project results by contacting with wide group of interested parties.'
	+ '</p><p>This project has been co-founded by the European Commission.</p>'
	+ '<p>Photos attached in this application are property of Paweł Podgórski (<a href="http://echiny.pl">echiny.pl</a>) and project partners.</p>',
	
	part: 'Del',
	dialogue_listen_all: 'Lyssna till hela dialogen',
	exercise: 'Övning',
	ex1_desc: 'Hör ordet och välja rätt kinesiska tecken',
	ex1_check: 'Kontrollera testet',
	ex2_meaning: 'betyder:',
	ex2_desc: 'Sätt tecken i rätt ordning så att<br/> de bildar en mening',
	ex2_check: 'Kontrollera testet',
	ex2_restart: 'Starta testet',
	ex3_desc: 'Hör ordet och välja rätt kinesiska tecken',
	ex3_check: 'Kontrollera testet'
};

_localizationParts['ui'] = ui;

﻿var dialogs = [
	{
		title: "Boka rum", 
		icon: "M4_L2_D1.JPG",
		Parts: [
					{ lines: [  "Beijing Hotel, välkommen!" ,   "Hej. Kan jag boka ett rum?" ,   "Ja, hur länge vill du stanna?" ,   "Tre dagar."   ] } , 
					{ lines: [  "Vilket rum skulle du vilja boka?" ,   "Vad kostar ett dubbelrum?" ,   "600." ,   "Dollar (USD) eller yuan (RMB)?" ,   "Yuan (RMB)." ,   "Då bokar jag."   ] } , 
					{ lines: [  "När kommer du?" ,   "I övermorgon." ,   "Vad heter du?" ,   "Jack Smith." ,   "Okej, alltså välkommen till Bejing Hotell." ,   "Tack."   ] } 
				]
	} , 
	{
		title: "På hotellet", 
		icon: "M4_L2_D2.JPG",
		Parts: [
					{ lines: [  "Beijing Hotel, välkommen!" ,   "Hej, jag heter Jack Smith. Jag har bokat ett rum." ,   "Jack Smith, ja. Kan du ge mig ditt pass, tack." ,   "Varsågod." ,   "Vänligen fyll i detta formulär." ,   "Bra."   ] } , 
					{ lines: [  "Hur ska du betala? Med kort eller kontant?" ,   "Kreditkort." ,   "Vänligen fyll i ditt namn." ,   "Okej." ,   "Här är din nyckel."   ] } , 
					{ lines: [  "Var är mitt rum?" ,   "På tolfte våningen." ,   "Var är hissen?" ,   "Gå till höger. Bakom trappan." ,   "Tack."   ] } 
				]
	} , 
	{
		title: "Utcheckning", 
		icon: "M4_L2_D3.JPG",
		Parts: [
					{ lines: [  "Hej. Jag skulle vilja checka ut. Rum nummer 1268." ,   "Bra. Har du använt minibaren?" ,   "Ja, det har jag. En flaska öl." ,   "Det blir 2000 kuai tillsammans."   ] } , 
					{ lines: [  "Här är mitt kreditkort." ,   "Jag beklagar men vi har problem med systemet. Vänligen betala kontant." ,   "Okej. Jag skulle vilja få kvittot." ,   "För dig."   ] } , 
					{ lines: [  "Kan jag lämna mitt bagage här?" ,   "Det kan du." ,   "Var snäll och ring efter en taxi. Jag ska åka till flygplatsen." ,   "Ok. Att åka till flygplatsen kostar 300 kuai." ,   "Hur länge ska jag vänta?" ,   "20 minuter."   ] } 
				]
	} 
];

﻿var ex2 = [ "När kommer du?" , "Vad kostar ett dubbelrum?" , "Var snäll och ring efter en taxi." , "Var är hissen?" , "Jag ska åka till flygplatsen." ];

﻿var vocabulary = [ "boka" , "USD - amerikansk dollar" , "RMB - yuan eller kuai - kinesisk valuta" , "fylla i" , "formulär" , "underskrift" , "X våning" , "utcheckning" , "bar" , "öl" ];

﻿var info = {	module: "M4",	lesson: "L2",	version: "v1.0M4L2-mt",	isEx3Type1: true,	lang: "Maltas",	page_title: "Lukanda",	menu_note: "Din il-lezzjoni ser turik kif tibbukkja lukanda, ipprovdi u tgħallem l’informazzjoni neċessarja dwar il-waqfien tiegħek. Ser nibdew billi nagħmlu riservazzjoni, imbagħad nikkonfermaw id-dħul tagħna u nispiċċaw billi nitilqu mill-lukanda."};_localizationParts['info'] = info;

﻿var characters = [ 
		{ ch: "lukanda", icon: "M4_L2_C1.JPG" } ,  
		{ ch: "passaport", icon: "M4_L2_C2.JPG" } ,  
		{ ch: "karta ta’ kreditu", icon: "M4_L2_C3.JPG" } ,  
		{ ch: "kamra", icon: "M4_L2_C4.JPG" } ,  
		{ ch: "ċavetta", icon: "M4_L2_C5.JPG" } ,  
		{ ch: "flus kontanti", icon: "M4_L2_C6.JPG" } ,  
		{ ch: "lift", icon: "M4_L2_C7.JPG" } ,  
		{ ch: "bagalja", icon: "M4_L2_C8.JPG" } ,  
		{ ch: "taxi", icon: "M4_L2_C9.JPG" } ,  
		{ ch: "ajruport", icon: "M4_L2_C10.JPG" } 
		];

﻿var ui = {
	menu_dialog_title: 'Djalogi',
	menu_dialog_choose: 'jagħżlu parti',
	menu_vocabulary: 'Vokabularju',
	menu_characters: 'Figuri',
	menu_quiz_title: 'Quiz awdjo',
	menu_quiz_choose: 'jagħżlu kwizz',
	menu_quiz_1: 'Korretta kelma',
	menu_quiz_2: 'Korretta ordni',
	menu_quiz_3: 'Korretta kelma',
	menu_home: 'dar',
	menu_project: 'proġett',
	menu_settings: 'settings',
	
	settings_title: 'Settings',
	settings_dialog: 'Lingwa tal djalogi u eżerċizzji',
	settings_interface: 'Lingwa tal-interface',
	settings_pynin: 'Pinyin',
	settings_cn: 'Ċiniż alfabett',
	
	project_about_title: 'Dwar il-proġett',
	project_about: '<p style="text-align:center">'
	+ '<b>Chinese for Europeans</b><br/>'
	+ '<a href="http://www.chinese4.eu">www.chinese4.eu</a></p>'
	+ '<p>The free of charge C4EU project aims at bringing the Chinese language and culture closer to the representatives of various age and profession groups (enterpreneurs and their employees, tourists, students and children) from all EU Member States (as well as other countries) by offering products translated into 23 European languages.'
	+ '</p><p>The project is performed by the partnership of 6 European institutions (Mescomp Technologies - Poland, Antwerp Management School - Belgium, Fondazione Italia Cina - Italy, ICC International Language Association - Germany, Soros International House - Lithuania, EduActive - Poland) which are specializing in different areas: Chinese language teaching, quality of teaching materialsm programming, mobile technology and exploitation of the project results by contacting with wide group of interested parties.'
	+ '</p><p>This project has been co-founded by the European Commission.</p>'
	+ '<p>Photos attached in this application are property of Paweł Podgórski (<a href="http://echiny.pl">echiny.pl</a>) and project partners.</p>',
	
	part: 'Parti',
	dialogue_listen_all: "Isma' d-djalogu kollu",
	exercise: 'Taħriga',
	ex1_desc: "Isma 'l-kelma u jagħżlu l-karattri dritt",
	ex1_check: 'Iċċekkja t-test',
	ex2_meaning: 'oriġinali tifsira:',
	ex2_desc: 'Poġġi l-karattri fl-ordni meħtieġa<br/> biex tifforma sentenza',
	ex2_check: 'Iċċekkja t-test',
	ex2_restart: 'Nerġgħu-test',
	ex3_desc: "Isma 'l-kelma u jagħżlu l-karattri dritt",
	ex3_check: 'Iċċekkja t-test'
};

_localizationParts['ui'] = ui;

﻿var dialogs = [
	{
		title: "Ibbukkjar ta’ kamra", 
		icon: "M4_L2_D1.JPG",
		Parts: [
					{ lines: [  "Lukanda Beijing, merħba!" ,   "Merħba. Nista’ nibbukkja kamra?" ,   "Iva, Kemm beħsiebek iddum?" ,   "Tlett ijiem."   ] } , 
					{ lines: [  "Liema kamra inti tixtieq li tibbukkja?" ,   "Kemm tiswa kamra doppja?" ,   "600." ,   "USD jew RMB?" ,   "RMB." ,   "Jien nibbukkja."   ] } , 
					{ lines: [  "Meta ħa tasal?" ,   "Pitgħada." ,   "X’inhu l-isem tiegħek?" ,   "Jack Smith." ,   "Ok., Merħba fil-lukanda Beijing." ,   "Nirringrazzjak!"   ] } 
				]
	} , 
	{
		title: "Ġewwa l-lukanda", 
		icon: "M4_L2_D2.JPG",
		Parts: [
					{ lines: [  "Lukanda Beijing, merħba!" ,   "Merħba, jien jisimni Jack Smith. Għandi kamra ibbukkjata." ,   "Jack Smith, Iva. Kemm tagħtini il-passaport tiegħek jekk jogħġbok." ,   "Għalik." ,   "Imla din il formola jekk jogħġbok." ,   "Ok."   ] } , 
					{ lines: [  "Inti kif se tħallas? Flus kontanti jew karta ta’ kreditu?" ,   "Karta ta kreditu." ,   "Jekk jogħġbok tiffirma ismek." ,   "Ok." ,   "Din hija iċ-ċavetta tiegħek."   ] } , 
					{ lines: [  "Fejn hi l’kamra tiegħi?" ,   "Fi-tnax il-sular." ,   "Fejn jinsab il-lift?" ,   "Iddur mal-lemin. Wara t-taraġ." ,   "Nirringrazzjak."   ] } 
				]
	} , 
	{
		title: "Ikkonfermar ta’ ħruġ", 
		icon: "M4_L2_D3.JPG",
		Parts: [
					{ lines: [  "Merbħa. Nixtieq li nikkonferma l’ħruġ. In-numru tal kamra huwa 1268." ,   "Ok. Għamilt użu mill-minibar?" ,   "Iva għamilt. Flixkun wieħed ta’ birra." ,   "B’kollox jiġik 2000 kuai."   ] } , 
					{ lines: [  "Hawn l’karta ta’ kreditu tiegħi." ,   "Jiddispjaċini. Imma is-sistema għandha problema. Jekk joġbok ħallas bi flus kontanti biex tħallas." ,   "Ok. Jekk joġbok għatini l-irċevuta." ,   "Għalik."   ] } , 
					{ lines: [  "Nista’ nħalli l’bagalji hawnhekk?" ,   "Iva tista." ,   "Ċempel għal taxi jekk joġbok. Ħalli immur għal-ajruport." ,   "Ok. Biex tmur għal-ajruport tiswa 300 kuai." ,   "Kemm andi ndum nistenna?" ,   "Għoxrin minuta."   ] } 
				]
	} 
];

﻿var ex2 = [ "Meta ħa tasal?" , "Kemm tiswa kamra doppja?" , "Ċempel għal taxi jekk joġbok." , "Fejn jinsab il-lift?" , "Ħalli immur għal-ajruport." ];

﻿var vocabulary = [ "ibbukkja/rriserva" , "USD" , "RMB" , "timla" , "formola" , "firma" , "X –il sular" , "konfermar ta’ ħrug" , "bar" , "birra" ];

﻿var info = {	module: "M4",	lesson: "L2",	version: "v1.0M4L2-gr",	isEx3Type1: true,	lang: "ελληνικός",	page_title: "Ξενοδοχειο",	menu_note: "Σε αυτό το μάθημα θα μάθετε πώς μπορείτε να κάνετε κράτηση σε ξενοδοχείο, να δίνετε και να μαθαίνετε τις απαραίτητες πληροφορίες σχετικά με τη διαμονή σας. Θα ξεκινήσουμε κάνοντας κράτηση, στη συνέχεια θα κάνουμε τσεκ ιν και θα τελειώσουμε με την αναχώρηση από το ξενοδοχείο."};_localizationParts['info'] = info;

﻿var characters = [ 
		{ ch: "ξενοδοχείο", icon: "M4_L2_C1.JPG" } ,  
		{ ch: "διαβατήριο", icon: "M4_L2_C2.JPG" } ,  
		{ ch: "πιστωτική κάρτα", icon: "M4_L2_C3.JPG" } ,  
		{ ch: "δωμάτιο", icon: "M4_L2_C4.JPG" } ,  
		{ ch: "κλειδί", icon: "M4_L2_C5.JPG" } ,  
		{ ch: "μετρητά", icon: "M4_L2_C6.JPG" } ,  
		{ ch: "ασανσέρ", icon: "M4_L2_C7.JPG" } ,  
		{ ch: "αποσκευές", icon: "M4_L2_C8.JPG" } ,  
		{ ch: "ταξί", icon: "M4_L2_C9.JPG" } ,  
		{ ch: "αεροδρόμιο", icon: "M4_L2_C10.JPG" } 
		];

﻿var ui = {
	menu_dialog_title: 'Διάλογοι',
	menu_dialog_choose: 'επιλέξετε μέρος',
	menu_vocabulary: 'Λεξιλόγιο',
	menu_characters: 'Χαρακτήρων',
	menu_quiz_title: 'Quiz ήχου',
	menu_quiz_choose: 'επιλέξτε κουίζ',
	menu_quiz_1: 'Η σωστή λέξη',
	menu_quiz_2: 'Η σωστή σειρά',
	menu_quiz_3: 'Η σωστή λέξη',
	menu_home: 'αρχική σελίδα',
	menu_project: 'έργο',
	menu_settings: 'ρυθμίσεις',
	
	settings_title: 'Ρυθμίσεις',
	settings_dialog: 'Γλώσσα διαλόγων και ασκήσεις',
	settings_interface: 'Γλώσσα του περιβάλλοντος εργασίας',
	settings_pynin: 'Πινγίν',
	settings_cn: 'Κινεζικό αλφάβητο',
	
	project_about_title: 'Σχετικά με το έργο',
	project_about: '<p style="text-align:center">'
	+ '<b>Chinese for Europeans</b><br/>'
	+ '<a href="http://www.chinese4.eu">www.chinese4.eu</a></p>'
	+ '<p>The free of charge C4EU project aims at bringing the Chinese language and culture closer to the representatives of various age and profession groups (enterpreneurs and their employees, tourists, students and children) from all EU Member States (as well as other countries) by offering products translated into 23 European languages.'
	+ '</p><p>The project is performed by the partnership of 6 European institutions (Mescomp Technologies - Poland, Antwerp Management School - Belgium, Fondazione Italia Cina - Italy, ICC International Language Association - Germany, Soros International House - Lithuania, EduActive - Poland) which are specializing in different areas: Chinese language teaching, quality of teaching materialsm programming, mobile technology and exploitation of the project results by contacting with wide group of interested parties.'
	+ '</p><p>This project has been co-founded by the European Commission.</p>'
	+ '<p>Photos attached in this application are property of Paweł Podgórski (<a href="http://echiny.pl">echiny.pl</a>) and project partners.</p>',
	
	part: 'μέρος',
	dialogue_listen_all: 'Ακούστε το ολόκληρο διάλογο',
	exercise: 'Άσκηση',
	ex1_desc: 'Ακούστε τη λέξη και να επιλέξετε το σωστό χαρακτήρες',
	ex1_check: 'Ελέγξτε το τες',
	ex2_meaning: 'νόημα:',
	ex2_desc: 'Τοποθετήστε τους χαρακτήρες στη σωστή<br/> σειρά για να δημιουργήσετε μια πρόταση',
	ex2_check: 'Ελέγξτε το τες',
	ex2_restart: 'Επανεκκίνηση δοκιμή',
	ex3_desc: 'Ακούστε τη λέξη και να επιλέξετε το σωστό χαρακτήρες',
	ex3_check: 'Ελέγξτε το τες'
};

_localizationParts['ui'] = ui;

﻿var dialogs = [
	{
		title: "Κράτηση δωματίου", 
		icon: "M4_L2_D1.JPG",
		Parts: [
					{ lines: [  "Beijing Hotel, καλωσορίσατε!" ,   "Γεια. Μπορώ να κάνω κράτηση δωματίου;" ,   "Ναι, για πόσο θέλετε να μείνετε;" ,   "Τρεις ημέρες."   ] } , 
					{ lines: [  "Τι δωμάτιο θέλετε να κλείσετε;" ,   "Πόσο κοστίζει το διπλό δωμάτιο;" ,   "600." ,   "Σε δολάρια ή RMB;" ,   "Σε RMB." ,   "Θα το κλείσω."   ] } , 
					{ lines: [  "Πότε θα έρθετε;" ,   "Μεθαύριο." ,   "Πώς ονομάζεστε;" ,   "Τζακ Σμιθ." ,   "Ωραία, καλωσορίσατε στο Beijing Hotel." ,   "Ευχαριστώ!"   ] } 
				]
	} , 
	{
		title: "Στο ξενοδοχείο", 
		icon: "M4_L2_D2.JPG",
		Parts: [
					{ lines: [  "Beijing Hotel, καλωσορίσατε!" ,   "Γεια σας, με λένε Τζακ Σμιθ. Έκλεισα δωμάτιο." ,   "Τζακ Σμιθ, μάλιστα. Παρακαλώ δώστε μου το διαβατήριό σας." ,   "Ορίστε." ,   "Παρακαλώ συμπληρώστε το έντυπο." ,   "Εντάξει."   ] } , 
					{ lines: [  "Πώς θα πληρώσετε; Με μετρητά ή πιστωτική κάρτα;" ,   "Με πιστωτική." ,   "Παρακαλώ υπογράψτε το όνομά σας." ,   "Εντάξει." ,   "Αυτό είναι το κλειδί σας."   ] } , 
					{ lines: [  "Πού είναι το δωμάτιό μου;" ,   "Στο 12ο όροφο." ,   "Πού είναι το ασανσέρ;" ,   "Στρίψτε δεξιά. Πίσω από τις σκάλες." ,   "Ευχαριστώ."   ] } 
				]
	} , 
	{
		title: "Αναχώρηση", 
		icon: "M4_L2_D3.JPG",
		Parts: [
					{ lines: [  "Γεια. Θέλω να αναχωρήσω. Ο αριθμός του δωματίου είναι 1268." ,   "Εντάξει. Χρησιμοποιήσατε το μίνιμπαρ;" ,   "Ναι. 1 μπουκάλι μπίρας." ,   "Συνολικά είναι 2000 κουάι."   ] } , 
					{ lines: [  "Η πιστωτική μου." ,   "Με συγχωρείτε. Το σύστημα έχει πρόβλημα. Χρησιμοποιήστε μετρητά για να πληρώσετε." ,   "Εντάξει. Παρακαλώ δώστε μου απόδειξη." ,   "Κρατήστε."   ] } , 
					{ lines: [  "Μπορώ να αφήσω τις αποσκευές εδώ;" ,   "Μπορείτε." ,   "Καλέστε ταξί παρακαλώ. Πηγαίνω στο αεροδρόμιο." ,   "Εντάξει. Για το αεροδρόμιο κοστίζει 300 κουάι." ,   "Πόσο πρέπει να περιμένω;" ,   "20 λεπτά."   ] } 
				]
	} 
];

﻿var ex2 = [ "Πότε θα έρθετε;" , "Πόσο κοστίζει το διπλό δωμάτιο;" , "Καλέστε ταξί παρακαλώ." , "Πού είναι το ασανσέρ;" , "Πηγαίνω στο αεροδρόμιο." ];

﻿var vocabulary = [ "κάνω κράτηση/κλείνω" , "δολάρια" , "RMB" , "συμπληρώνω" , "έντυπο" , "υπογράφω" , "X όροφος" , "αναχώρηση" , "μπαρ" , "μπίρα" ];

﻿var info = {	module: "M4",	lesson: "L2",	version: "v1.0M4L2-pt",	isEx3Type1: true,	lang: "Português",	page_title: "Hotel",	menu_note: "Esta lição mostra como reservar um quarto de hotel, apresenta as informações nescessárias sobre a estadia. Comecemos com a realização da reserva, depois o check in e terminamos com a saída do hotel."};_localizationParts['info'] = info;

﻿var characters = [ 
		{ ch: "hotel", icon: "M4_L2_C1.JPG" } ,  
		{ ch: "passaporte", icon: "M4_L2_C2.JPG" } ,  
		{ ch: "cartão de crédito", icon: "M4_L2_C3.JPG" } ,  
		{ ch: "quarto", icon: "M4_L2_C4.JPG" } ,  
		{ ch: "chave", icon: "M4_L2_C5.JPG" } ,  
		{ ch: "dinheiro", icon: "M4_L2_C6.JPG" } ,  
		{ ch: "elevador", icon: "M4_L2_C7.JPG" } ,  
		{ ch: "bagagem", icon: "M4_L2_C8.JPG" } ,  
		{ ch: "táxi", icon: "M4_L2_C9.JPG" } ,  
		{ ch: "aeroporto", icon: "M4_L2_C10.JPG" } 
		];

﻿var ui = {
	menu_dialog_title: 'Diálogos',
	menu_dialog_choose: 'escolher parte',
	menu_vocabulary: 'Dicionário',
	menu_characters: 'Sinais',
	menu_quiz_title: 'Questionário de áudio',
	menu_quiz_choose: 'escolha do quiz',
	menu_quiz_1: 'Palavra correta',
	menu_quiz_2: 'Ordem correta',
	menu_quiz_3: 'Palavra correta',
	menu_home: 'página principal',
	menu_project: 'projeto',
	menu_settings: 'definições',
	
	settings_title: 'Definições',
	settings_dialog: 'Língua de diálogos e exercícios',
	settings_interface: 'Linguagem de interface',
	settings_pynin: 'Pinyin',
	settings_cn: 'Alfabeto chinês',
	
	project_about_title: 'Sobre o projeto',
	project_about: '<p style="text-align:center">'
	+ '<b>Chinese for Europeans</b><br/>'
	+ '<a href="http://www.chinese4.eu">www.chinese4.eu</a></p>'
	+ '<p>The free of charge C4EU project aims at bringing the Chinese language and culture closer to the representatives of various age and profession groups (enterpreneurs and their employees, tourists, students and children) from all EU Member States (as well as other countries) by offering products translated into 23 European languages.'
	+ '</p><p>The project is performed by the partnership of 6 European institutions (Mescomp Technologies - Poland, Antwerp Management School - Belgium, Fondazione Italia Cina - Italy, ICC International Language Association - Germany, Soros International House - Lithuania, EduActive - Poland) which are specializing in different areas: Chinese language teaching, quality of teaching materialsm programming, mobile technology and exploitation of the project results by contacting with wide group of interested parties.'
	+ '</p><p>This project has been co-founded by the European Commission.</p>'
	+ '<p>Photos attached in this application are property of Paweł Podgórski (<a href="http://echiny.pl">echiny.pl</a>) and project partners.</p>',
	
	part: 'Parte',
	dialogue_listen_all: 'Ouça o diálogo inteiro',
	exercise: 'Exercício',
	ex1_desc: 'Ouça a frase e selecione os sinais corretos',
	ex1_check: 'Verifique o teste',
	ex2_meaning: 'significado:',
	ex2_desc: 'Coloque os sinais chineses na ordem correta,<br/> de maneira que formem frases',
	ex2_check: 'Verifique o teste',
	ex2_restart: 'Reinicie teste',
	ex3_desc: 'Ouça a frase e selecione os sinais corretos',
	ex3_check: 'Verifique o teste'
};

_localizationParts['ui'] = ui;

﻿var dialogs = [
	{
		title: "Reserva de quarto", 
		icon: "M4_L2_D1.JPG",
		Parts: [
					{ lines: [  "Beijing Hotel, bem vindo!" ,   "Bom dia. Posso reservar um quarto?" ,   "Sim, por quanto tempo o Senhor ficará?" ,   "Três dias."   ] } , 
					{ lines: [  "Que quarto é que o senhor gostaria de reservar?" ,   "Quanto custa um quarto para duas pessoas?" ,   "600." ,   "Dólares (USD) ou Yuan (RMB)?" ,   "Yuan (RMB)." ,   "Está bem, então reservo."   ] } , 
					{ lines: [  "Quando é que o Senhor chega?" ,   "Depois de amanhã?" ,   "Como é que o senhor se chama?" ,   "Jack Smith." ,   "Ok, então aguardamos por si no Hotel Beijing." ,   "Obrigado."   ] } 
				]
	} , 
	{
		title: "No hotel", 
		icon: "M4_L2_D2.JPG",
		Parts: [
					{ lines: [  "Hotel Beijing, bem vindo!" ,   "Bom dia, meu nome é Jack Smith. Reservei um quarto." ,   "Jack Smith, sim. Passaporte por favor." ,   "Aqui está." ,   "Por favor preencha este formulário." ,   "Está bem."   ] } , 
					{ lines: [  "Qual será a forma de pagamento. Dinheiro ou cartão de crédito?" ,   "Cartão de crédito." ,   "Por favor escreva o nome." ,   "Está bem." ,   "Aqui está a chave."   ] } , 
					{ lines: [  "Onde é que é o meu quarto?" ,   "No 12 andar." ,   "Aonde está o elevador?" ,   "Por favor, vire à direita. Atrás das escadas." ,   "Obrigado."   ] } 
				]
	} , 
	{
		title: "Cheking out", 
		icon: "M4_L2_D3.JPG",
		Parts: [
					{ lines: [  "Bom dia. Quero fazer o chek out. o número do quarto é o 1268." ,   "Está bem. O senhor usou o mini-bar?" ,   "Usei. 1 garrafa de cerveja." ,   "Tudo junto são 2000 kuai."   ] } , 
					{ lines: [  "Aqui está meu cartão de crédito." ,   "Desculpe. Temos problemas com o sistema. Por favor faça o pagamento em dinheiro." ,   "Está bem. Dê-me o recibo por favor." ,   "Para o senhor."   ] } , 
					{ lines: [  "Posso deixar aqui a bagagem?" ,   "Pode senhor." ,   "Por favor chame-me um táxi. Vou para o aeroporto." ,   "Está bem. O trajeto para o aeroporto custa 300 kuai." ,   "Quanto tempo tenho que esperar?" ,   "20 minutos."   ] } 
				]
	} 
];

﻿var ex2 = [ "Quando é que o Senhor chega?" , "Quanto custa um quarto para duas pessoas?" , "Por favor chame-me um táxi." , "Aonde está o elevador?" , "Vou para o aeroporto." ];

﻿var vocabulary = [ "reservar" , "USD - dolar americano" , "RMB - yuan ou kuai - moeda chinesa" , "preencher" , "formulário" , "assinatura" , "X andar" , "check out (saída)" , "bar" , "cerveja" ];

﻿var info = {	module: "M4",	lesson: "L2",	version: "v1.0M4L2-fi",	isEx3Type1: true,	lang: "Suomi",	page_title: "Hotelli",	menu_note: "Tässä kappaleessa opit varaamaan hotellihuoneen, hankkimaan ja sanomaan perustietoa yöpymisestä. Aloitamme varaamisesta, seuraavaksi kirjaudumme sisään ja lopuksi uloukirjaudumme."};_localizationParts['info'] = info;

﻿var characters = [ 
		{ ch: "hotelli", icon: "M4_L2_C1.JPG" } ,  
		{ ch: "passi", icon: "M4_L2_C2.JPG" } ,  
		{ ch: "luottokortti", icon: "M4_L2_C3.JPG" } ,  
		{ ch: "huone", icon: "M4_L2_C4.JPG" } ,  
		{ ch: "avain", icon: "M4_L2_C5.JPG" } ,  
		{ ch: "käteinen", icon: "M4_L2_C6.JPG" } ,  
		{ ch: "hissi", icon: "M4_L2_C7.JPG" } ,  
		{ ch: "matkalaukku", icon: "M4_L2_C8.JPG" } ,  
		{ ch: "taksi", icon: "M4_L2_C9.JPG" } ,  
		{ ch: "lentoasema", icon: "M4_L2_C10.JPG" } 
		];

﻿var ui = {
	menu_dialog_title: 'Dialogues',
	menu_dialog_choose: 'valita osa',
	menu_vocabulary: 'Sanasto',
	menu_characters: 'Merkit',
	menu_quiz_title: 'Tietovisa audio',
	menu_quiz_choose: 'valitse tietokilpailu',
	menu_quiz_1: 'Oikea sana',
	menu_quiz_2: 'Oikea järjestys',
	menu_quiz_3: 'Oikea sana',
	menu_home: 'koti',
	menu_project: 'projekti',
	menu_settings: 'asetukset',
	
	settings_title: 'Asetukset',
	settings_dialog: 'Kieli vuoropuhelujen ja harjoituksia',
	settings_interface: 'Liittymän kieli',
	settings_pynin: 'Pinyinin',
	settings_cn: 'Kiinan aakkoset',
	
	project_about_title: 'Tietoa hankkeesta',
	project_about: '<p style="text-align:center">'
	+ '<b>Chinese for Europeans</b><br/>'
	+ '<a href="http://www.chinese4.eu">www.chinese4.eu</a></p>'
	+ '<p>The free of charge C4EU project aims at bringing the Chinese language and culture closer to the representatives of various age and profession groups (enterpreneurs and their employees, tourists, students and children) from all EU Member States (as well as other countries) by offering products translated into 23 European languages.'
	+ '</p><p>The project is performed by the partnership of 6 European institutions (Mescomp Technologies - Poland, Antwerp Management School - Belgium, Fondazione Italia Cina - Italy, ICC International Language Association - Germany, Soros International House - Lithuania, EduActive - Poland) which are specializing in different areas: Chinese language teaching, quality of teaching materialsm programming, mobile technology and exploitation of the project results by contacting with wide group of interested parties.'
	+ '</p><p>This project has been co-founded by the European Commission.</p>'
	+ '<p>Photos attached in this application are property of Paweł Podgórski (<a href="http://echiny.pl">echiny.pl</a>) and project partners.</p>',
	
	part: 'Osa',
	dialogue_listen_all: 'Kuuntele kaikki vuoropuhelut',
	exercise: 'Harjoitus',
	ex1_desc: 'Kuulevat sanan ja valita oikeat merkit',
	ex1_check: 'Tarkista testi',
	ex2_meaning: 'merkitys:',
	ex2_desc: 'Laita merkit oikeaan järjestykseen<br/> ja muodosta lause',
	ex2_check: 'Tarkista testi',
	ex2_restart: 'Käynnistä testi',
	ex3_desc: 'Kuulevat sanan ja valita oikeat merkit',
	ex3_check: 'Tarkista testi'
};

_localizationParts['ui'] = ui;

﻿var dialogs = [
	{
		title: "Huoneen varaaminen", 
		icon: "M4_L2_D1.JPG",
		Parts: [
					{ lines: [  "Pekingin Hotelli, hei!" ,   "Hei. Voisinko varata huoneen?" ,   "Kyllä, kuinka kauan aiot yöpyä?" ,   "3 päivää."   ] } , 
					{ lines: [  "Millaisen huoneen haluaisit varata?" ,   "Paljonko maksaa kahden hengen huone?" ,   "600." ,   "Dollaria vai yuania?" ,   "Yuania." ,   "Minä varaan."   ] } , 
					{ lines: [  "Milloin sinä tulet?" ,   "Ylihuomenna." ,   "Mikä sinun nimesi on?" ,   "Jack Smith." ,   "Hyvä. Tervetuloa Pekingin Hotelliin." ,   "Kiitos."   ] } 
				]
	} , 
	{
		title: "Hotellissa", 
		icon: "M4_L2_D2.JPG",
		Parts: [
					{ lines: [  "Pekingin hotelli, tervetuloa!" ,   "Hei, nimeni on Jack Smith. Minulla on huonevaraus." ,   "Jack Smith, kyllä. Passinne, ole hyvä." ,   "Ole hyvä." ,   "Voisitteko täyttää tämän lomakeen?" ,   "Hyvä."   ] } , 
					{ lines: [  "Millä te maksatte? Luottokortilla vai käteisellä?" ,   "Luottokortilla." ,   "Saisinko allekirjoituksenne?" ,   "Hyvä." ,   "Tässä on avain."   ] } , 
					{ lines: [  "Missä on huoneeni?" ,   "12. kierroksessa." ,   "Missä on hissi?" ,   "Oikealla puolella, portaiden takana." ,   "Kiitos."   ] } 
				]
	} , 
	{
		title: "Uloskirjautuminen", 
		icon: "M4_L2_D3.JPG",
		Parts: [
					{ lines: [  "Hei. Kirjaudun ulos. Huonenumero 1268." ,   "Hyvä. Oletteko käyttänyt minibaaria?" ,   "Kyllä. 1 pullo olutta." ,   "Yhteensä 2000 kuaita."   ] } , 
					{ lines: [  "Luottokorttini." ,   "Anteeksi. Systeemissä on vika. Voisitteko maksaa käteisellä?" ,   "Voin. Saisinko kuitin?" ,   "Ole hyvä."   ] } , 
					{ lines: [  "Voisinko jättää matkalaukun tähän?" ,   "Kyllä." ,   "Voistitteko soittaa taksi?" ,   "Voin. Lentoasemalle maksaa 300 kuaita." ,   "Kauanko minun täytyy odottaa?" ,   "20 minuuttia."   ] } 
				]
	} 
];

﻿var ex2 = [ "Milloin sinä tulet?" , "Paljonko maksaa kahden hengen huone?" , "Voistitteko soittaa taksi?" , "Missä on hissi?" , "I go to the airport." ];

﻿var vocabulary = [ "varata" , "dollari" , "yuan" , "täyttää" , "lomake" , "allekirjoittaa" , "X. kerros" , "kirjautua ulos" , "baari" , "olut" ];

﻿var info = {	module: "M4",	lesson: "L2",	version: "v1.0M4L2-ro",	isEx3Type1: true,	lang: "Român",	page_title: "Hotel",	menu_note: "Această lecţie vă va arăta cum să faceţi o rezervare, să furnizeze şi să înveţe necesarul cu privire la reşederea dumneavoastre în hotel."};_localizationParts['info'] = info;

﻿var characters = [ 
		{ ch: "hotel", icon: "M4_L2_C1.JPG" } ,  
		{ ch: "paşaportul", icon: "M4_L2_C2.JPG" } ,  
		{ ch: "cardul de credit", icon: "M4_L2_C3.JPG" } ,  
		{ ch: "camera", icon: "M4_L2_C4.JPG" } ,  
		{ ch: "cheia", icon: "M4_L2_C5.JPG" } ,  
		{ ch: "bani numerar", icon: "M4_L2_C6.JPG" } ,  
		{ ch: "lift", icon: "M4_L2_C7.JPG" } ,  
		{ ch: "bagajul", icon: "M4_L2_C8.JPG" } ,  
		{ ch: "taxiul", icon: "M4_L2_C9.JPG" } ,  
		{ ch: "aeroportul", icon: "M4_L2_C10.JPG" } 
		];

﻿var ui = {
	menu_dialog_title: 'Dialoguri',
	menu_dialog_choose: 'alegeți o parte',
	menu_vocabulary: 'Vocabular',
	menu_characters: 'Caractere',
	menu_quiz_title: 'Quiz audio',
	menu_quiz_choose: 'alege quiz',
	menu_quiz_1: 'Corect cuvântul',
	menu_quiz_2: 'Corect pentru',
	menu_quiz_3: 'Corect cuvântul',
	menu_home: 'acasă',
	menu_project: 'proiect',
	menu_settings: 'setări',
	
	settings_title: 'Setări',
	settings_dialog: 'Limba de dialoguri și exerciții',
	settings_interface: 'Limba de interfață',
	settings_pynin: 'Pinyin',
	settings_cn: 'Chineză alfabet',
	
	project_about_title: 'Despre proiect',
	project_about: '<p style="text-align:center">'
	+ '<b>Chinese for Europeans</b><br/>'
	+ '<a href="http://www.chinese4.eu">www.chinese4.eu</a></p>'
	+ '<p>The free of charge C4EU project aims at bringing the Chinese language and culture closer to the representatives of various age and profession groups (enterpreneurs and their employees, tourists, students and children) from all EU Member States (as well as other countries) by offering products translated into 23 European languages.'
	+ '</p><p>The project is performed by the partnership of 6 European institutions (Mescomp Technologies - Poland, Antwerp Management School - Belgium, Fondazione Italia Cina - Italy, ICC International Language Association - Germany, Soros International House - Lithuania, EduActive - Poland) which are specializing in different areas: Chinese language teaching, quality of teaching materialsm programming, mobile technology and exploitation of the project results by contacting with wide group of interested parties.'
	+ '</p><p>This project has been co-founded by the European Commission.</p>'
	+ '<p>Photos attached in this application are property of Paweł Podgórski (<a href="http://echiny.pl">echiny.pl</a>) and project partners.</p>',
	
	part: 'Parte',
	dialogue_listen_all: 'Ascultă tot dialogul',
	exercise: 'Exercițiu',
	ex1_desc: 'Ascultați cuvântul și alege caracterele potrivite',
	ex1_check: 'Verifica de testare',
	ex2_meaning: 'sens:',
	ex2_desc: 'Puneţi caracterele în ordinea corectă<br/> pentru a crea propoziţia',
	ex2_check: 'Verifica de testare',
	ex2_restart: 'Reporniți încercare',
	ex3_desc: 'Ascultați cuvântul și alege caracterele potrivite',
	ex3_check: 'Verifica de testare'
};

_localizationParts['ui'] = ui;

﻿var dialogs = [
	{
		title: "Rezervarea unei camere", 
		icon: "M4_L2_D1.JPG",
		Parts: [
					{ lines: [  "Hotelul Beijing, bună ziua!" ,   "Bună ziua. Pot să rezervez o cameră?" ,   "Da. Pe cât timp doriţi să staţi?" ,   "Pe trei zile."   ] } , 
					{ lines: [  "Ce cameră doriţi să rezervaţi?" ,   "Cât costă camera pentru două persoane?" ,   "600." ,   "Dolari americani sau renminbi?" ,   "Renminbi." ,   "Bine, am să rezervez una."   ] } , 
					{ lines: [  "Când sosiţi?" ,   "Poimâine." ,   "Cum vă numiţi?" ,   "Jack Smith." ,   "Ok. Bine aţi venit în Hotelul Beijing." ,   "Vă mulţumesc!"   ] } 
				]
	} , 
	{
		title: "În hotel", 
		icon: "M4_L2_D2.JPG",
		Parts: [
					{ lines: [  "Bine aţi venit în Hotelul Beijing!" ,   "Buna ziua,mă numesc Jack Smith. Am rezervat o cameră." ,   "Jack Smith, da. Vă rog să-mi daţi paşaportul dumneavoastre." ,   "Poftiţi." ,   "Vă rog să completaţi acest formular." ,   "Bine."   ] } , 
					{ lines: [  "Cum veţi plăti? Numerar sau cu cardul de credit?" ,   "Cu cardul de credit." ,   "Vă rog să semnaţi numele." ,   "Bine." ,   "Aceasta este cheia."   ] } , 
					{ lines: [  "Unde se află camera mea?" ,   "Se află la etajul doisprezece." ,   "Unde se află liftul?" ,   "Faceţi dreapta. În spatele scări." ,   "Vă mulţumesc!"   ] } 
				]
	} , 
	{
		title: "Verificarea şi achitarea", 
		icon: "M4_L2_D3.JPG",
		Parts: [
					{ lines: [  "Buna ziua. Aş dori să fac o verificare a consumaţiilor şi să mă achit. Numarul camerei este 1268." ,   "Ok. Aţi folosit mini-bar?" ,   "Am folosit, o sticlă de bere." ,   "În total 2000 Kuai."   ] } , 
					{ lines: [  "Cardul meu de credit." ,   "Îmi pare rău. Sistemul are o problemă. Pute ţi vă rog să plătiţi în numerar?" ,   "Bine. Daţi-mi vă rog bonul de plată." ,   "Poftiţi."   ] } , 
					{ lines: [  "Pot lăsa bagajul meu aici?" ,   "Puteţi." ,   "Vă rog să chemaţi un taxi. Mă duc la aeroport." ,   "Ok, spre aeroport costă 300 Kuai." ,   "Cât timp trebuie să aştept?" ,   "Douăzeci de minute."   ] } 
				]
	} 
];

﻿var ex2 = [ "Când sosiţi?" , "Cât costă camera pentru două persoane?" , "Vă rog să chemaţi un taxi." , "Unde se află liftul?" , "Mă duc la aeroport." ];

﻿var vocabulary = [ "rezervarea" , "dolari americani" , "renminbi" , "completaţi în" , "formular" , "semnatură" , "etaj" , "verificarea şi achitarea" , "bar" , "berea" ];

﻿var info = {	module: "M4",	lesson: "L2",	version: "v1.0M4L2-de",	isEx3Type1: true,	lang: "Deutsch",	page_title: "Hotel",	menu_note: "In diesem Modul lernen Sie, wie Sie ein Hotel buchen und wie du nach Informationen fragen können. Wir beginnen mit der Reservierung, dann kommt der Check-in und dann das Auschecken."};_localizationParts['info'] = info;

﻿var characters = [ 
		{ ch: "Hotel", icon: "M4_L2_C1.JPG" } ,  
		{ ch: "Reisepass", icon: "M4_L2_C2.JPG" } ,  
		{ ch: "Kreditkarte", icon: "M4_L2_C3.JPG" } ,  
		{ ch: "Zimmer", icon: "M4_L2_C4.JPG" } ,  
		{ ch: "Schlüssel", icon: "M4_L2_C5.JPG" } ,  
		{ ch: "bar (bezahlen)", icon: "M4_L2_C6.JPG" } ,  
		{ ch: "Aufzug", icon: "M4_L2_C7.JPG" } ,  
		{ ch: "Gepäck", icon: "M4_L2_C8.JPG" } ,  
		{ ch: "Taxi", icon: "M4_L2_C9.JPG" } ,  
		{ ch: "Flughafen", icon: "M4_L2_C10.JPG" } 
		];

﻿var ui = {
	menu_dialog_title: 'Dialogues',
	menu_dialog_choose: 'wählen Teil',
	menu_vocabulary: 'Vokabular',
	menu_characters: 'Schriftzeichen',
	menu_quiz_title: 'Quiz Audio',
	menu_quiz_choose: 'wählen Quiz',
	menu_quiz_1: 'Richtige Wort',
	menu_quiz_2: 'Richtige Reihenfolge',
	menu_quiz_3: 'Richtige Wort',
	menu_home: 'Startseite',
	menu_project: 'Projekt',
	menu_settings: 'Einstellungen',
	
	settings_title: 'Einstellungen',
	settings_dialog: 'Dialog und Übung Sprache',
	settings_interface: 'Interface-Sprache',
	settings_pynin: 'Pinyin',
	settings_cn: 'Chinesische Alphabet',
	
	project_about_title: 'Über das Projekt',
	project_about: '<p style="text-align:center">'
	+ '<b>Chinese for Europeans</b><br/>'
	+ '<a href="http://www.chinese4.eu">www.chinese4.eu</a></p>'
	+ '<p>The free of charge C4EU project aims at bringing the Chinese language and culture closer to the representatives of various age and profession groups (enterpreneurs and their employees, tourists, students and children) from all EU Member States (as well as other countries) by offering products translated into 23 European languages.'
	+ '</p><p>The project is performed by the partnership of 6 European institutions (Mescomp Technologies - Poland, Antwerp Management School - Belgium, Fondazione Italia Cina - Italy, ICC International Language Association - Germany, Soros International House - Lithuania, EduActive - Poland) which are specializing in different areas: Chinese language teaching, quality of teaching materialsm programming, mobile technology and exploitation of the project results by contacting with wide group of interested parties.'
	+ '</p><p>This project has been co-founded by the European Commission.</p>'
	+ '<p>Photos attached in this application are property of Paweł Podgórski (<a href="http://echiny.pl">echiny.pl</a>) and project partners.</p>',
	
	part: 'Teil',
	dialogue_listen_all: 'Dem ganzen Dialog zuhören',
	exercise: 'Übung',
	ex1_desc: 'Hört das Wort und wählen Sie die richtigen Zeichen',
	ex1_check: 'Test prüfen',
	ex2_meaning: 'Bedeutung:',
	ex2_desc: 'Bringe Sie die Zeichen in die richtige<br/> Reihenfolge, damit ein Satz entsteht',
	ex2_check: 'Test prüfen',
	ex2_restart: 'Starten Test',
	ex3_desc: 'Hört das Wort und wählen Sie die richtigen Zeichen',
	ex3_check: 'Test prüfen'
};

_localizationParts['ui'] = ui;

﻿var dialogs = [
	{
		title: "Zimmerreservierung", 
		icon: "M4_L2_D1.JPG",
		Parts: [
					{ lines: [  "Herzlich willkommen im Hotel Beijing!" ,   "Guten Tag. Ich möchte gerne ein Zimmer buchen." ,   "Gerne. Für wie viele Nächte?" ,   "Drei Nächte."   ] } , 
					{ lines: [  "Was für ein Zimmer möchten Sie buchen?" ,   "Was kostet ein Doppelzimmer?" ,   "600." ,   "US Dollar oder Yuan?" ,   "Yuan." ,   "Ja, ich möchte gerne buchen."   ] } , 
					{ lines: [  "Wann kommen Sie an?" ,   "Übermorgen." ,   "Bitte geben Sie mir Ihren Namen." ,   "Jack Smith." ,   "Okay. Herzlich willkommen im Hotel Beijing!" ,   "Danke."   ] } 
				]
	} , 
	{
		title: "Im Hotel", 
		icon: "M4_L2_D2.JPG",
		Parts: [
					{ lines: [  "Willkommen im Hotel Beijing!" ,   "Guten Tag, mein Name ist Jack Smith. Ich habe ein Zimmer gebucht." ,   "Jack Smith. Ja. Bitte geben Sie mir Ihren Reisepass." ,   "Für Sie." ,   "Bitte füllen Sie dieses Formular aus." ,   "Okay."   ] } , 
					{ lines: [  "Wie möchten Sie bezahlen? Bar oder mit Kreditkarte?" ,   "Mit Kreditkarte." ,   "Bitte unterschreiben Sie." ,   "Okay." ,   "Hier sind Ihre Schlüssel."   ] } , 
					{ lines: [  "Wo befindet sich mein Zimmer?" ,   "Im 12. Stock." ,   "Wo befindet sich der Aufzug?" ,   "Gehen Sie nach rechts. Er befindet sich hinter dem Treppenhaus." ,   "Danke."   ] } 
				]
	} , 
	{
		title: "Auschecken", 
		icon: "M4_L2_D3.JPG",
		Parts: [
					{ lines: [  "Guten Tag. Ich möchte gerne auschecken. Meine Zimmernummer ist 1268." ,   "Okay. Haben Sie noch etwas aus der Minibar gehabt?" ,   "Ja, eine Flasche Bier." ,   "Das macht insgesamt 2000 Kuai."   ] } , 
					{ lines: [  "Hier ist meine Kreditkarte." ,   "Es tut mir leid, aber das System funktioniert momentan nicht. Bitte bezahlen Sie in bar." ,   "Okay. Bitte geben Sie mir eine Quittung." ,   "Für Sie."   ] } , 
					{ lines: [  "Kann ich mein Gepäck hier stehenlassen?" ,   "Ja." ,   "Bitte rufen Sie mir ein Taxi. Ich möchte zum Flughafen." ,   "Okay. Eine Fahrt zum Flughafen kostet 300 Kuai." ,   "Wie lange muss ich warten?" ,   "20 Minuten."   ] } 
				]
	} 
];

﻿var ex2 = [ "Wann kommen Sie an?" , "Was kostet ein Doppelzimmer?" , "Bitte rufen Sie mir ein Taxi." , "Wo befindet sich der Aufzug?" , "Ich möchte zum Flughafen." ];

﻿var vocabulary = [ "buchen/reservieren" , "US Dollar" , "Yuan oder RMB (offizielle Bezeichnung für die Währung in China)" , "ausfüllen" , "Formular" , "unterschreiben" , "X-tes Stockwerk" , "auschecken" , "Bar" , "Bier" ];

﻿var info = {	module: "M4",	lesson: "L2",	version: "v1.0M4L2-da",	isEx3Type1: true,	lang: "Dansk",	page_title: "Hotel",	menu_note: "Dette kapitel viser dig hvordan man booker et hotel samt giver og modtager den nødvendige information i forbindelse med opholdet. Vi starter med at reservere et værelse og checke ind, og slutter med at forlade hotellet."};_localizationParts['info'] = info;

﻿var characters = [ 
		{ ch: "hotel", icon: "M4_L2_C1.JPG" } ,  
		{ ch: "pas", icon: "M4_L2_C2.JPG" } ,  
		{ ch: "kreditkort", icon: "M4_L2_C3.JPG" } ,  
		{ ch: "værelse", icon: "M4_L2_C4.JPG" } ,  
		{ ch: "nøgle", icon: "M4_L2_C5.JPG" } ,  
		{ ch: "kontanter", icon: "M4_L2_C6.JPG" } ,  
		{ ch: "elevator", icon: "M4_L2_C7.JPG" } ,  
		{ ch: "bagage", icon: "M4_L2_C8.JPG" } ,  
		{ ch: "taxa", icon: "M4_L2_C9.JPG" } ,  
		{ ch: "lufthavn", icon: "M4_L2_C10.JPG" } 
		];

﻿var ui = {
	menu_dialog_title: 'Dialoger',
	menu_dialog_choose: 'vælge del',
	menu_vocabulary: 'Ordforråd',
	menu_characters: 'Tegn',
	menu_quiz_title: 'Quiz lyd',
	menu_quiz_choose: 'vælge quiz',
	menu_quiz_1: 'Korrekt ord',
	menu_quiz_2: 'Korrekt rækkefølge',
	menu_quiz_3: 'Korrekt ord',
	menu_home: 'hovedside',
	menu_project: 'projekt',
	menu_settings: 'indstillinger',
	
	settings_title: 'Indstillinger',
	settings_dialog: 'Sprog af dialoger og øvelser',
	settings_interface: 'Interface - sprog',
	settings_pynin: 'Pinyin',
	settings_cn: 'Kinesisk alfabet',
	
	project_about_title: 'Om projekt',
	project_about: '<p style="text-align:center">'
	+ '<b>Chinese for Europeans</b><br/>'
	+ '<a href="http://www.chinese4.eu">www.chinese4.eu</a></p>'
	+ '<p>The free of charge C4EU project aims at bringing the Chinese language and culture closer to the representatives of various age and profession groups (enterpreneurs and their employees, tourists, students and children) from all EU Member States (as well as other countries) by offering products translated into 23 European languages.'
	+ '</p><p>The project is performed by the partnership of 6 European institutions (Mescomp Technologies - Poland, Antwerp Management School - Belgium, Fondazione Italia Cina - Italy, ICC International Language Association - Germany, Soros International House - Lithuania, EduActive - Poland) which are specializing in different areas: Chinese language teaching, quality of teaching materialsm programming, mobile technology and exploitation of the project results by contacting with wide group of interested parties.'
	+ '</p><p>This project has been co-founded by the European Commission.</p>'
	+ '<p>Photos attached in this application are property of Paweł Podgórski (<a href="http://echiny.pl">echiny.pl</a>) and project partners.</p>',
	
	part: 'Del',
	dialogue_listen_all: 'Lyt til hele dialogenen',
	exercise: 'Øvelse',
	ex1_desc: 'Hører ordet og vælge de rigtige tegn',
	ex1_check: 'Tjek testen',
	ex2_meaning: 'hvilket betyder:',
	ex2_desc: 'Anbring tegnene i den rigtige<br/> rækkefølge for at lave sætninger',
	ex2_check: 'Tjek testen',
	ex2_restart: 'Genstart test',
	ex3_desc: 'Hører ordet og vælge de rigtige tegn',
	ex3_check: 'Tjek testen'
};

_localizationParts['ui'] = ui;

﻿var dialogs = [
	{
		title: "Værelsesreservation", 
		icon: "M4_L2_D1.JPG",
		Parts: [
					{ lines: [  "Hotel Beijing, goddag!" ,   "Goddag. Kan jeg reservere et værelse?" ,   "Ja, hvor mange dage?" ,   "Tre dage."   ] } , 
					{ lines: [  "Hvad slags værelse ønsker De at reservere?" ,   "Hvad koster et dobbeltværelse?" ,   "600." ,   "Dollar eller Yean?" ,   "Yean." ,   "Det tager jeg."   ] } , 
					{ lines: [  "Hvornår planlægger De at ankomme?" ,   "I overmorgen." ,   "Og navnet?" ,   "Jack Smith." ,   "Det er i orden. Vi ønsker Dem velkommen til Hotel Beijing." ,   "Mange tak."   ] } 
				]
	} , 
	{
		title: "På hotellet", 
		icon: "M4_L2_D2.JPG",
		Parts: [
					{ lines: [  "Hotel Beijing, velkommen!" ,   "Tak. Mit navn er Jack Smith. Jeg har reserveret et værelse." ,   "Jack Smith, ja. Må jeg bede om pas?" ,   "Vær så god!" ,   "Vil De være venlig at udfylde formularen?" ,   "Ok."   ] } , 
					{ lines: [  "Hvordan ønsker De at betale? Kontanter eller kreditkort?" ,   "Kreditkort." ,   "Skriv venligst under her." ,   "Ok." ,   "Her er nøglen."   ] } , 
					{ lines: [  "Hvor er værelset henne?" ,   "På 12. etage." ,   "Hvor er elevatoren?" ,   "Til højre. Bag trappen." ,   "Mange tak."   ] } 
				]
	} , 
	{
		title: "Check out", 
		icon: "M4_L2_D3.JPG",
		Parts: [
					{ lines: [  "Goddag. Jeg vil gerne checke ud. Værelse 1268." ,   "Det er i orden. Han De benyttet minibaren?" ,   "Jeg drak en øl." ,   "Det bliver 2000 kuai i alt."   ] } , 
					{ lines: [  "Mit kreditkort." ,   "Jeg beklager. Vi har problemer med systemet. Må jeg bede Dem om at betale med kontanter?" ,   "Ok. Lad mig få en kvittering." ,   "Vær så god."   ] } , 
					{ lines: [  "Kan jeg efterlade bagagen her?" ,   "Ja, vær så god." ,   "Vil De ringe efter en taxa. Jeg skal til lufthavnen." ,   "Ok. Det koster omkring 300 kuai til lufthavnen." ,   "Hvor længe skal jeg vente?" ,   "20 minutter."   ] } 
				]
	} 
];

﻿var ex2 = [ "Hvornår planlægger De at ankomme?" , "Hvad koster et dobbeltværelse?" , "Vil De ringe efter en taxa." , "Hvor er elevatoren?" , "Jeg skal til lufthavnen." ];

﻿var vocabulary = [ "reservere" , "Amerikanske dollars" , "RMB (yuan)" , "udfylde" , "formular" , "underskrift" , "X. sal" , "checke ud" , "bar" , "øl" ];

﻿var info = {	module: "M4",	lesson: "L2",	version: "v1.0M4L2-nl",	isEx3Type1: true,	lang: "Nederlands",	page_title: "Hotel",	menu_note: "Deze les laat u zien hoe u een hotelkamer boekt, en zal de nodige informatie presenteren met betrekking tot uw verblijf. We beginen met het maken van een boeking, dan het inchecken en eindigen met het hotel te verlaten."};_localizationParts['info'] = info;

﻿var characters = [ 
		{ ch: "hotel", icon: "M4_L2_C1.JPG" } ,  
		{ ch: "paspoort", icon: "M4_L2_C2.JPG" } ,  
		{ ch: "kredietkaart", icon: "M4_L2_C3.JPG" } ,  
		{ ch: "kamer", icon: "M4_L2_C4.JPG" } ,  
		{ ch: "sleutel", icon: "M4_L2_C5.JPG" } ,  
		{ ch: "geld", icon: "M4_L2_C6.JPG" } ,  
		{ ch: "tillen", icon: "M4_L2_C7.JPG" } ,  
		{ ch: "bagage", icon: "M4_L2_C8.JPG" } ,  
		{ ch: "taxi", icon: "M4_L2_C9.JPG" } ,  
		{ ch: "luchthaven", icon: "M4_L2_C10.JPG" } 
		];

﻿var ui = {
	menu_dialog_title: 'Dialogen',
	menu_dialog_choose: 'kiezen voor een deel',
	menu_vocabulary: 'Woordenlijst',
	menu_characters: 'Karakters',
	menu_quiz_title: 'Quiz audio',
	menu_quiz_choose: 'kies quiz',
	menu_quiz_1: 'Juiste woord',
	menu_quiz_2: 'Juiste volgorde',
	menu_quiz_3: 'Juiste woord',
	menu_home: 'home',
	menu_project: 'project',
	menu_settings: 'instellingen',
	
	settings_title: 'Instellingen',
	settings_dialog: 'Taal van de dialogen en oefeningen',
	settings_interface: 'Tal van interface',
	settings_pynin: 'Pinyin',
	settings_cn: 'Chinese alfabet',
	
	project_about_title: 'Over het project',
	project_about: '<p style="text-align:center">'
	+ '<b>Chinese for Europeans</b><br/>'
	+ '<a href="http://www.chinese4.eu">www.chinese4.eu</a></p>'
	+ '<p>The free of charge C4EU project aims at bringing the Chinese language and culture closer to the representatives of various age and profession groups (enterpreneurs and their employees, tourists, students and children) from all EU Member States (as well as other countries) by offering products translated into 23 European languages.'
	+ '</p><p>The project is performed by the partnership of 6 European institutions (Mescomp Technologies - Poland, Antwerp Management School - Belgium, Fondazione Italia Cina - Italy, ICC International Language Association - Germany, Soros International House - Lithuania, EduActive - Poland) which are specializing in different areas: Chinese language teaching, quality of teaching materialsm programming, mobile technology and exploitation of the project results by contacting with wide group of interested parties.'
	+ '</p><p>This project has been co-founded by the European Commission.</p>'
	+ '<p>Photos attached in this application are property of Paweł Podgórski (<a href="http://echiny.pl">echiny.pl</a>) and project partners.</p>',
	
	part: 'Deel',
	dialogue_listen_all: 'Luister naar de volledige dialoog',
	exercise: 'Oefening',
	ex1_desc: 'Hoor het woord en kies de juiste Chinese karakters',
	ex1_check: 'Correctie van de test',
	ex2_meaning: 'betekenis:',
	ex2_desc: 'Zet de Chinese karakters in de juiste volgorde,<br/> zodat ze een zin vormen',
	ex2_check: 'Correctie van de test',
	ex2_restart: 'Herstart-test',
	ex3_desc: 'Hoor het woord en kies de juiste Chinese karakters',
	ex3_check: 'Correctie van de test'
};

_localizationParts['ui'] = ui;

﻿var dialogs = [
	{
		title: "Het boeken van een kamer", 
		icon: "M4_L2_D1.JPG",
		Parts: [
					{ lines: [  "Beijing Hotel, welkom!" ,   "Goedendag. Kan ik een kamer boeken?" ,   "Ja, hoe lang blijft u?" ,   "Drie dagen."   ] } , 
					{ lines: [  "Welke kamer wilt u boeken?" ,   "Hoeveel kost een tweepersoonskamer?" ,   "600." ,   "Dollars (USD) of yuans (RMB)?" ,   "Yuans (RMB)." ,   "Goed, ik ga boeken."   ] } , 
					{ lines: [  "Wanneer komt u?" ,   "Overmorgen." ,   "Wat is uw naam?" ,   "Jack Smith." ,   "Goed, dus we nodigen u uit naar Beijing Hotel." ,   "Dank u."   ] } 
				]
	} , 
	{
		title: "In het hotel", 
		icon: "M4_L2_D2.JPG",
		Parts: [
					{ lines: [  "Beijing Hotel, welkom!" ,   "Hallo, mijn naam is Jack Smith. Ik heb een kamer geboekt." ,   "Jack Smith, ja. Uw paspoort, alstublift." ,   "Alstublift." ,   "Gelieve het formulier in te vullen." ,   "Goed."   ] } , 
					{ lines: [  "Hoe gaat u betalen. Contant of met kredietkaart?" ,   "Met kredietkaart." ,   "Vul uw achternaam in, alstublift." ,   "Goed." ,   "Dit is uw sleutel."   ] } , 
					{ lines: [  "Waar is mijn kamer?" ,   "Op de 12de verdieping." ,   "Waar is de lift?" ,   "Ga u naar rechts, alstublift. Achter de trap." ,   "Dank u."   ] } 
				]
	} , 
	{
		title: "Uitchecken", 
		icon: "M4_L2_D3.JPG",
		Parts: [
					{ lines: [  "Goedendag. Ik wil uitchecken. Kamer nummer 1268." ,   "Goed. Maakte u gebruik van minibar?" ,   "Ja. 1 fles bier." ,   "Totaal 2000 kuai."   ] } , 
					{ lines: [  "Hier is mijn kredietkaart." ,   "Het spijt me. We hebben een probleem met het systeem. Betaal u in contanten, alstublift." ,   "Goed. Graag een betalingsbewijs, alstublift." ,   "Voor u."   ] } , 
					{ lines: [  "Kan ik hier mijn bagage achterlaten?" ,   "Dat kan." ,   "Bel voor een taxi alstublift. Ik ga naar luchthaven." ,   "Goed. Het rijden naar de luchthaven kost 300 kuai." ,   "Hoe lang moet ik wachten?" ,   "20 minuten."   ] } 
				]
	} 
];

﻿var ex2 = [ "Wanneer komt u?" , "Hoeveel kost een tweepersoonskamer?" , "Bel voor een taxi alstublift." , "Waar is de lift?" , "Ik ga naar luchthaven." ];

﻿var vocabulary = [ "boeken" , "USD-dollar" , "RMB - yuan of kuai - Chinese munt" , "vullen" , "formulier" , "handtekening" , "X-de verdieping" , "uitchecken" , "bar" , "bier" ];

﻿var info = {	module: "M4",	lesson: "L2",	version: "v1.0M4L2-sl",	isEx3Type1: true,	lang: "Slovenski",	page_title: "Hotel",	menu_note: "Ta lekcija ti bo pokazala, kako rezervirati sobo v hotelu, predstavila bo potrebne podatke v zvezi s prenočiščem. Začeli bomo z rezervacijo sobe, potem se bomo prijavili, na koncu pa bomo zapustili hotel."};_localizationParts['info'] = info;

﻿var characters = [ 
		{ ch: "hotel", icon: "M4_L2_C1.JPG" } ,  
		{ ch: "potni list", icon: "M4_L2_C2.JPG" } ,  
		{ ch: "kreditna kartica", icon: "M4_L2_C3.JPG" } ,  
		{ ch: "soba", icon: "M4_L2_C4.JPG" } ,  
		{ ch: "ključ", icon: "M4_L2_C5.JPG" } ,  
		{ ch: "gotovina", icon: "M4_L2_C6.JPG" } ,  
		{ ch: "dvigalo", icon: "M4_L2_C7.JPG" } ,  
		{ ch: "prtljaga", icon: "M4_L2_C8.JPG" } ,  
		{ ch: "taksi", icon: "M4_L2_C9.JPG" } ,  
		{ ch: "letališče", icon: "M4_L2_C10.JPG" } 
		];

﻿var ui = {
	menu_dialog_title: 'Dialogi',
	menu_dialog_choose: 'izberite del',
	menu_vocabulary: 'Slovarček',
	menu_characters: 'Znake',
	menu_quiz_title: 'Kviz zvoka',
	menu_quiz_choose: 'izberite kviz',
	menu_quiz_1: 'Pravilna beseda',
	menu_quiz_2: 'Pravilno bi',
	menu_quiz_3: 'Pravilna beseda',
	menu_home: 'glavna stran',
	menu_project: 'projekt',
	menu_settings: 'nastavitve',
	
	settings_title: 'Nastavitve',
	settings_dialog: 'Jezik dialogov in vaj',
	settings_interface: 'Jezik vmesnika',
	settings_pynin: 'Pinyin',
	settings_cn: 'Kitajski abeceda',
	
	project_about_title: 'O projektu',
	project_about: '<p style="text-align:center">'
	+ '<b>Chinese for Europeans</b><br/>'
	+ '<a href="http://www.chinese4.eu">www.chinese4.eu</a></p>'
	+ '<p>The free of charge C4EU project aims at bringing the Chinese language and culture closer to the representatives of various age and profession groups (enterpreneurs and their employees, tourists, students and children) from all EU Member States (as well as other countries) by offering products translated into 23 European languages.'
	+ '</p><p>The project is performed by the partnership of 6 European institutions (Mescomp Technologies - Poland, Antwerp Management School - Belgium, Fondazione Italia Cina - Italy, ICC International Language Association - Germany, Soros International House - Lithuania, EduActive - Poland) which are specializing in different areas: Chinese language teaching, quality of teaching materialsm programming, mobile technology and exploitation of the project results by contacting with wide group of interested parties.'
	+ '</p><p>This project has been co-founded by the European Commission.</p>'
	+ '<p>Photos attached in this application are property of Paweł Podgórski (<a href="http://echiny.pl">echiny.pl</a>) and project partners.</p>',
	
	part: 'Del',
	dialogue_listen_all: 'Poslušaj cel dialog',
	exercise: 'Vaja',
	ex1_desc: 'Čujte besedo in izberete prave kitajske pismenke',
	ex1_check: 'Preveri test',
	ex2_meaning: 'kar pomeni:',
	ex2_desc: 'Uredi kitajske znake v pravilnem<br/> vrstnem redu, da zložiš stavek',
	ex2_check: 'Preveri test',
	ex2_restart: 'Znova preizkus',
	ex3_desc: 'Čujte besedo in izberete prave kitajske pismenke',
	ex3_check: 'Preveri test'
};

_localizationParts['ui'] = ui;

﻿var dialogs = [
	{
		title: "Rezervacija sobe", 
		icon: "M4_L2_D1.JPG",
		Parts: [
					{ lines: [  "Hotel Beijing, dobrodošli." ,   "Dober dan. Bi lahko rezerviral sobo?" ,   "Ja. Kako dolgo boste ostali?" ,   "Tri dni."   ] } , 
					{ lines: [  "Kakšno sobo želite rezervirati?" ,   "Koliko stane dvoposteljna soba?" ,   "600." ,   "Dolarjev (USD) ali juanov (RMB)?" ,   "Juanov (RMB)." ,   "Dobro, rezerviram."   ] } , 
					{ lines: [  "Kdaj pridete?" ,   "Pojutrišnjem." ,   "Kako se pišete?" ,   "Jack Smith." ,   "Dobro, dobrodošli v hotelu Beijing." ,   "Hvala."   ] } 
				]
	} , 
	{
		title: "V hotelu", 
		icon: "M4_L2_D2.JPG",
		Parts: [
					{ lines: [  "Hotel Beijing, dobrodošli." ,   "Dober dan, ime mi je Jack Smith. Rezerviral sem sobo." ,   "Jack Smith, ja. Potni list, prosim." ,   "Izvolite." ,   "Prosim, izpolnite ta obrazec." ,   "Prav."   ] } , 
					{ lines: [  "Kako boste plačali? Z gotovino ali s kreditno kartico." ,   "S kreditno kartico." ,   "Prosim, napišite priimek." ,   "Dobro." ,   "To je vaš ključ."   ] } , 
					{ lines: [  "Kje je moja soba?" ,   "V 12. nadstropju." ,   "Kje je dvigalo?" ,   "Zavijte desno. Za stopnicami." ,   "Hvala."   ] } 
				]
	} , 
	{
		title: "Odjava", 
		icon: "M4_L2_D3.JPG",
		Parts: [
					{ lines: [  "Dober dan. Rad bi se odjavil. Soba številka 1268." ,   "Prav. Ste uporabljali mini bar?" ,   "Sem. 1 steklenico piva." ,   "Skupaj 2000 kvajev."   ] } , 
					{ lines: [  "Moja kreditna kartica." ,   "Žal mi je. Imamo težave s sistemom. Prosim, plačajte v gotovini." ,   "Prav. Prosim, dajte mi račun." ,   "Za vas."   ] } , 
					{ lines: [  "Lahko tu pustim prtljago?" ,   "Lahko." ,   "Prosim, pokličite taksi. Na letališče grem." ,   "Prav. Vožnja na letališče stane 300 kvajev." ,   "Kako dolgo moram čakati?" ,   "20 minut."   ] } 
				]
	} 
];

﻿var ex2 = [ "Kdaj pridete?" , "Koliko stane dvoposteljna soba?" , "Prosim, pokličite taksi." , "Kje je dvigalo?" , "Na letališče grem." ];

﻿var vocabulary = [ "rezervirati" , "USD - ameriški dolar" , "RMB - juan ali kvaj - kitajska denarna enota" , "izpolniti" , "obrazec" , "podpis" , "X nadstropje" , "odjava" , "bar" , "pivo" ];

﻿var info = {	module: "M4",	lesson: "L2",	version: "v1.0M4L2-ga",	isEx3Type1: true,	lang: "Gaeilge",	page_title: "Hotel",	menu_note: "Léiríonn an ceacht seo duit conas óstán a chur in áirithe, a sholáthar agus an t-eolas is gá faoi do chuairt a fhoghlaim. Cuirfimid tús le áirithint a dhéanamh, a seiceáil isteach ansin i agus críochnaigh le fágáil an t-óstán."};_localizationParts['info'] = info;

﻿var characters = [ 
		{ ch: "óstán", icon: "M4_L2_C1.JPG" } ,  
		{ ch: "pas", icon: "M4_L2_C2.JPG" } ,  
		{ ch: "cárta creidmheasa", icon: "M4_L2_C3.JPG" } ,  
		{ ch: "seomra", icon: "M4_L2_C4.JPG" } ,  
		{ ch: "eochair", icon: "M4_L2_C5.JPG" } ,  
		{ ch: "airgead tirim", icon: "M4_L2_C6.JPG" } ,  
		{ ch: "ardaitheoir", icon: "M4_L2_C7.JPG" } ,  
		{ ch: "bagáiste", icon: "M4_L2_C8.JPG" } ,  
		{ ch: "tacsaí", icon: "M4_L2_C9.JPG" } ,  
		{ ch: "aerfort", icon: "M4_L2_C10.JPG" } 
		];

﻿var ui = {
	menu_dialog_title: 'Comhráite',
	menu_dialog_choose: 'a roghnú mar chuid',
	menu_vocabulary: 'Stór Focal',
	menu_characters: 'Carachtair',
	menu_quiz_title: 'Tráth na gCeist fuaime',
	menu_quiz_choose: 'a roghnú tráth na gceist',
	menu_quiz_1: 'Focal ceart',
	menu_quiz_2: 'Ord ceart',
	menu_quiz_3: 'Focal ceart',
	menu_home: 'baile',
	menu_project: 'tionscadal',
	menu_settings: 'suímh',
	
	settings_title: 'Suímh',
	settings_dialog: 'Teanga na comhráite agus cleachtaí',
	settings_interface: 'Teanga an comhéadan',
	settings_pynin: 'Pinyin',
	settings_cn: 'Aibítir Sínis',
	
	project_about_title: 'Maidir tionscadal',
	project_about: '<p style="text-align:center">'
	+ '<b>Chinese for Europeans</b><br/>'
	+ '<a href="http://www.chinese4.eu">www.chinese4.eu</a></p>'
	+ '<p>The free of charge C4EU project aims at bringing the Chinese language and culture closer to the representatives of various age and profession groups (enterpreneurs and their employees, tourists, students and children) from all EU Member States (as well as other countries) by offering products translated into 23 European languages.'
	+ '</p><p>The project is performed by the partnership of 6 European institutions (Mescomp Technologies - Poland, Antwerp Management School - Belgium, Fondazione Italia Cina - Italy, ICC International Language Association - Germany, Soros International House - Lithuania, EduActive - Poland) which are specializing in different areas: Chinese language teaching, quality of teaching materialsm programming, mobile technology and exploitation of the project results by contacting with wide group of interested parties.'
	+ '</p><p>This project has been co-founded by the European Commission.</p>'
	+ '<p>Photos attached in this application are property of Paweł Podgórski (<a href="http://echiny.pl">echiny.pl</a>) and project partners.</p>',
	
	part: 'Cuid',
	dialogue_listen_all: 'Éist leis an dialóg iomlán',
	exercise: 'Ceacht',
	ex1_desc: 'Éist an focal agus na carachtair ceart a roghnú',
	ex1_check: 'Seiceáil an tástáil',
	ex2_meaning: 'rud a chiallaíonn:',
	ex2_desc: 'Cuir na carachtair san ord<br/> ceart chun abairt a chruthú',
	ex2_check: 'Seiceáil an tástáil',
	ex2_restart: 'Atosaigh tástála',
	ex3_desc: 'Éist an focal agus na carachtair ceart a roghnú',
	ex3_check: 'Seiceáil an tástáil'
};

_localizationParts['ui'] = ui;

﻿var dialogs = [
	{
		title: "Áirithint seomra", 
		icon: "M4_L2_D1.JPG",
		Parts: [
					{ lines: [  "Beijing Hotel, fáilte!" ,   "Dia duit. An féidir liom seomra a chur in áirithe?" ,   "Is féidir. Ce chomh fada atá tú ar cuairt?" ,   "Trí lá."   ] } , 
					{ lines: [  "Cén sórt seomra ar mhaith leat?" ,   "Cé mhéad atá ar seomra dúbailte?" ,   "600." ,   "USD nó RMB?" ,   "RMB." ,   "Tá sé in áirithe duit."   ] } , 
					{ lines: [  "Nuair a bhíonn tú ag teacht." ,   "An lá tar éis an lae amárach." ,   "Cad is ainm duit?" ,   "Jack Smith." ,   "Tá go maith, fáilte chuig Óstán Beijing." ,   "Go raibh maith agat!"   ] } 
				]
	} , 
	{
		title: "Ins an óstán", 
		icon: "M4_L2_D2.JPG",
		Parts: [
					{ lines: [  "Beijing Hotel, fáilte!" ,   "Dia duit, Jack Smith is ainm dom. Tá seomra curtha in áirithe agam." ,   "Jack Smith, Is ea. Tabhair dom do phas, le do thoil." ,   "Duitse." ,   "Líon isteach an fhoirm seo." ,   "Tá go maith."   ] } , 
					{ lines: [  "Conas a íocfaidh tú? Airgead tirim nó cárta creidmheasa?" ,   "Cárta creidmheasa." ,   "Sínigh d'ainm le do thoil." ,   "Tá go maith." ,   "Seo é d'eochair."   ] } , 
					{ lines: [  "Cá bhfuil mo sheomra?" ,   "12ú urlár." ,   "Cá bhfuil an ardaitheoir?" ,   "Cas ar dheis. Taobh thiar den staighre." ,   "Go raibh maith agat."   ] } 
				]
	} , 
	{
		title: "Seiceáil amach", 
		icon: "M4_L2_D3.JPG",
		Parts: [
					{ lines: [  "Dia duit. Tá mé ag seiceáil amach. Is é 1268 m'uimhir Seomra." ,   "OK. Ar úsáid tú an beár beag?" ,   "D'úsáid mé. Buidéal beoir amháin." ,   "San iomlán, 2000 kuai."   ] } , 
					{ lines: [  "Mo chárta creidmheasa." ,   "Tá brón orm. Tá fadhb ag an córas. Bain úsáid as airgead tirim le n- íoc." ,   "Tá go maith. Tabhair dom adhmháil le do thoil." ,   "Duitse."   ] } , 
					{ lines: [  "An féidir liom an bagáiste a fhágáil anseo?" ,   "Is féidir leat." ,   "Cuir glaoch tacsaí. Téim go dtí an aerfort." ,   "Tá go maith. Ag dul chuig an aerfort sin 300 kuai." ,   "Cé chomh fada go gcaithfidh mé fanacht?" ,   "20 nóiméad."   ] } 
				]
	} 
];

﻿var ex2 = [ "Nuair a bhíonn tú ag teacht?" , "Cé mhéad atá ar seomra dúbailte?" , "Cuir glaoch tacsaí." , "Cá bhfuil an ardaitheoir?" , "Téim go dtí an aerfort." ];

﻿var vocabulary = [ "a chur in áirithe" , "USD" , "RMB" , "líon isteach" , "foirm" , "síniú" , "X ú / urlár ú" , "seiceáil amach" , "beár" , "beoir" ];

﻿var info = {	module: "M4",	lesson: "L2",	version: "v1.0M4L2-en",	isEx3Type1: true,	lang: "English",	page_title: "Hotel",	menu_note: "This lesson will show you how to book a hotel, provide and learn necessary information about your stay. We will start with making a reservation, then check in and finish with leaving the hotel."};_localizationParts['info'] = info;

﻿var characters = [ 
		{ ch: "hotel", icon: "M4_L2_C1.JPG" } ,  
		{ ch: "passport", icon: "M4_L2_C2.JPG" } ,  
		{ ch: "credit card", icon: "M4_L2_C3.JPG" } ,  
		{ ch: "room", icon: "M4_L2_C4.JPG" } ,  
		{ ch: "key", icon: "M4_L2_C5.JPG" } ,  
		{ ch: "cash", icon: "M4_L2_C6.JPG" } ,  
		{ ch: "elevator", icon: "M4_L2_C7.JPG" } ,  
		{ ch: "luggage", icon: "M4_L2_C8.JPG" } ,  
		{ ch: "taxi", icon: "M4_L2_C9.JPG" } ,  
		{ ch: "airport", icon: "M4_L2_C10.JPG" } 
		];

﻿var ui = {
	menu_dialog_title: 'Dialogues',
	menu_dialog_choose: 'choose part',
	menu_vocabulary: 'Vocabulary',
	menu_characters: 'Characters',
	menu_quiz_title: 'Quiz audio',
	menu_quiz_choose: 'choose quiz',
	menu_quiz_1: 'Correct word',
	menu_quiz_2: 'Correct order',
	menu_quiz_3: 'Correct word',
	menu_home: 'home',
	menu_project: 'project',
	menu_settings: 'settings',
	
	settings_title: 'Settings',
	settings_dialog: 'Dialogue and exercise language',
	settings_interface: 'Interface language',
	settings_pynin: 'Pinyin',
	settings_cn: 'Chinese alphabet',
	
	project_about_title: 'About project',
	project_about: '<p style="text-align:center">'
	+ '<b>Chinese for Europeans</b><br/>'
	+ '<a href="http://www.chinese4.eu">www.chinese4.eu</a></p>'
	+ '<p>The free of charge C4EU project aims at bringing the Chinese language and culture closer to the representatives of various age and profession groups (enterpreneurs and their employees, tourists, students and children) from all EU Member States (as well as other countries) by offering products translated into 23 European languages.'
	+ '</p><p>The project is performed by the partnership of 6 European institutions (Mescomp Technologies - Poland, Antwerp Management School - Belgium, Fondazione Italia Cina - Italy, ICC International Language Association - Germany, Soros International House - Lithuania, EduActive - Poland) which are specializing in different areas: Chinese language teaching, quality of teaching materialsm programming, mobile technology and exploitation of the project results by contacting with wide group of interested parties.'
	+ '</p><p>This project has been co-founded by the European Commission.</p>'
	+ '<p>Photos attached in this application are property of Paweł Podgórski (<a href="http://echiny.pl">echiny.pl</a>) and project partners.</p>',
	
	part: 'Part',
	dialogue_listen_all: 'Listen all dialogue',
	exercise: 'Exercise',
	ex1_desc: 'Hear the word and choose the right characters',
	ex1_check: 'Check test',
	ex2_meaning: 'meaning:',
	ex2_desc: 'Place the characters in the<br/> right order to create sentence',
	ex2_check: 'Check test',
	ex2_restart: 'Restart test',
	ex3_desc: 'Hear the word and choose the right characters',
	ex3_check: 'Check test'
};

_localizationParts['ui'] = ui;

﻿var dialogs = [
	{
		title: "Booking a room", 
		icon: "M4_L2_D1.JPG",
		Parts: [
					{ lines: [  "Beijing Hotel, welcome!" ,   "Hello. Can I book a room?" ,   "Yes, How long will you stay?" ,   "Three days."   ] } , 
					{ lines: [  "What room you'd like to book?" ,   "How much is double room?" ,   "600." ,   "USD or RMB?" ,   "RMB." ,   "Ok, I book."   ] } , 
					{ lines: [  "When are you arriving?" ,   "The day after tomorrow." ,   "What is your name?" ,   "Jack Smith." ,   "Ok., welcome to Beijing Hotel." ,   "Thank you!"   ] } 
				]
	} , 
	{
		title: "In the hotel", 
		icon: "M4_L2_D2.JPG",
		Parts: [
					{ lines: [  "Beijing Hotel, welcome!" ,   "Hello, my name is Jack Smith. I booked a room." ,   "Jack Smith, yes. Please give me your passport." ,   "For you." ,   "Please fill in this form." ,   "Ok."   ] } , 
					{ lines: [  "How will you pay? Cash or credit card?" ,   "Credit card." ,   "Please sign your name." ,   "Ok." ,   "This is your key."   ] } , 
					{ lines: [  "Where is my room?" ,   "12th floor." ,   "Where is the elevator?" ,   "Turn right. Behind the stairs." ,   "Thank you."   ] } 
				]
	} , 
	{
		title: "Checking out", 
		icon: "M4_L2_D3.JPG",
		Parts: [
					{ lines: [  "Hello. I check out. Room number is 1268." ,   "Ok. Did you use minibar?" ,   "I did. 1 bottle of beer." ,   "Altogether 2000 kuai."   ] } , 
					{ lines: [  "My credit card." ,   "I am sorry. The system has problem. Please use cash to pay." ,   "Ok. Please give me the receipt." ,   "For you."   ] } , 
					{ lines: [  "Can I leave the luggage here?" ,   "You can." ,   "Please call taxi. I go to the airport." ,   "Ok. Going to airport is 300 kuai." ,   "How long must I wait?" ,   "20 minutes."   ] } 
				]
	} 
];

﻿var ex2 = [ "When are you arriving?" , "How much is double room?" , "Please call a taxi." , "Where is the elevator?" , "I go to the airport." ];

﻿var vocabulary = [ "book/reserve" , "USD" , "RMB" , "fill in" , "form" , "sign" , "X-st/nd floor" , "check out" , "bar" , "beer" ];

﻿var info = {	module: "M4",	lesson: "L2",	version: "v1.0M4L2-et",	isEx3Type1: true,	lang: "Eesti",	page_title: "Hotell",	menu_note: "See õppetund näitab teile kuidas broneerida hotelli, anda ja saada vajalikku informatsiooni oma viibimise kohta. Me alustame broneeringu tegemisest, siis sissekirjutamine ja lõpetame hotellist lahkumisega."};_localizationParts['info'] = info;

﻿var characters = [ 
		{ ch: "hotell", icon: "M4_L2_C1.JPG" } ,  
		{ ch: "pass", icon: "M4_L2_C2.JPG" } ,  
		{ ch: "krediitkaart", icon: "M4_L2_C3.JPG" } ,  
		{ ch: "tuba", icon: "M4_L2_C4.JPG" } ,  
		{ ch: "võti", icon: "M4_L2_C5.JPG" } ,  
		{ ch: "sularaha", icon: "M4_L2_C6.JPG" } ,  
		{ ch: "lift", icon: "M4_L2_C7.JPG" } ,  
		{ ch: "pagas", icon: "M4_L2_C8.JPG" } ,  
		{ ch: "takso", icon: "M4_L2_C9.JPG" } ,  
		{ ch: "lennujaam", icon: "M4_L2_C10.JPG" } 
		];

﻿var ui = {
	menu_dialog_title: 'Dialoogid',
	menu_dialog_choose: 'Valida osa',
	menu_vocabulary: 'Sõnavara',
	menu_characters: 'Tähemärke',
	menu_quiz_title: 'Viktoriin heli',
	menu_quiz_choose: 'vali viktoriin',
	menu_quiz_1: 'Õige sõna',
	menu_quiz_2: 'Õiges järjekorras',
	menu_quiz_3: 'Õige sõna',
	menu_home: 'Kodu',
	menu_project: 'Projekt',
	menu_settings: 'seaded',
	
	settings_title: 'Seaded',
	settings_dialog: 'Keel dialooge ja harjutusi',
	settings_interface: 'Liidese keel',
	settings_pynin: 'Pinyin',
	settings_cn: 'Hiina tähestik',
	
	project_about_title: 'Projektist',
	project_about: '<p style="text-align:center">'
	+ '<b>Chinese for Europeans</b><br/>'
	+ '<a href="http://www.chinese4.eu">www.chinese4.eu</a></p>'
	+ '<p>The free of charge C4EU project aims at bringing the Chinese language and culture closer to the representatives of various age and profession groups (enterpreneurs and their employees, tourists, students and children) from all EU Member States (as well as other countries) by offering products translated into 23 European languages.'
	+ '</p><p>The project is performed by the partnership of 6 European institutions (Mescomp Technologies - Poland, Antwerp Management School - Belgium, Fondazione Italia Cina - Italy, ICC International Language Association - Germany, Soros International House - Lithuania, EduActive - Poland) which are specializing in different areas: Chinese language teaching, quality of teaching materialsm programming, mobile technology and exploitation of the project results by contacting with wide group of interested parties.'
	+ '</p><p>This project has been co-founded by the European Commission.</p>'
	+ '<p>Photos attached in this application are property of Paweł Podgórski (<a href="http://echiny.pl">echiny.pl</a>) and project partners.</p>',
	
	part: 'Osa',
	dialogue_listen_all: 'Kuula kogu kahekõnet',
	exercise: 'Harjutus',
	ex1_desc: 'Kuulevad sõna ja valida õige tähemärki',
	ex1_check: 'Kontrolli testi',
	ex2_meaning: 'tähendus:',
	ex2_desc: 'Pange tähemärgid õigesse järjekorda,<br/> et moodustada lause',
	ex2_check: 'Kontrolli testi',
	ex2_restart: 'Restart test',
	ex3_desc: 'Kuulevad sõna ja valida õige tähemärki',
	ex3_check: 'Kontrolli testi'
};

_localizationParts['ui'] = ui;

﻿var dialogs = [
	{
		title: "Toa broneerimine", 
		icon: "M4_L2_D1.JPG",
		Parts: [
					{ lines: [  "Pekingi hotell, tere tulemast!" ,   "Tere. Kas ma saaksin toa broneerida?" ,   "Jah, kui kauaks te jääte?" ,   "Kolm päeva."   ] } , 
					{ lines: [  "Millist tuba te tahaksite broneerida?" ,   "Kui palju kahene tuba maksab?" ,   "600." ,   "USD või RMB?" ,   "RMB." ,   "Ma broneerin."   ] } , 
					{ lines: [  "Millal te saabute?" ,   "Ülehomme." ,   "Mis teie nimi on?" ,   "Jack Smith." ,   "Olgu, tere tulemast Pekingi Hotelli." ,   "Tänan!"   ] } 
				]
	} , 
	{
		title: "Hotellis", 
		icon: "M4_L2_D2.JPG",
		Parts: [
					{ lines: [  "Pekingi Hotell, tere tulemast!" ,   "Tere, minu nimi on Jack Smith. Ma broneerisin toa." ,   "Jack, Smith, jah. Palun andke mulle oma pass." ,   "Teile." ,   "Palun täidke see ankeet." ,   "Olgu."   ] } , 
					{ lines: [  "Kuidas te maksate? Sularahas või krediitkaardiga?" ,   "Krediitkaardiga." ,   "Palun andke oma allkiri." ,   "Olgu." ,   "See on teie võti."   ] } , 
					{ lines: [  "Kus mu tuba asub?" ,   "12. korrusel." ,   "Kus lift on?" ,   "Pöörake paremale. Treppide taga." ,   "Aitäh!"   ] } 
				]
	} , 
	{
		title: "Lahkumine", 
		icon: "M4_L2_D3.JPG",
		Parts: [
					{ lines: [  "Tere. Ma lahkun. Mu toa number on 1268." ,   "lgu. Kas te kasutasite minibaari?" ,   "Kasutasin. 1 pudel õlut." ,   "Kokku 2000 kuai'd."   ] } , 
					{ lines: [  "Minu krediitkaart." ,   "Vabandage. Süsteemis on viga. Palun kasutage maksmiseks sularaha." ,   "Olgu. Palun andke mulle tšekk." ,   "Teile."   ] } , 
					{ lines: [  "Kas ma saan pagasi siia jätta?" ,   "Saate küll." ,   "Palun kutsuge takso. Ma lähen lennujaama." ,   "Olgu. Lennujaama minek on 300 kuai'd." ,   "Kui kaua ma ootama pean?" ,   "20 minutit."   ] } 
				]
	} 
];

﻿var ex2 = [ "Millal te saabute?" , "Kui palju kahene tuba maksab?" , "Palun kutsuge takso." , "Kus lift on?" , "Ma lähen lennujaama." ];

﻿var vocabulary = [ "broneerima" , "USD" , "RMB" , "täitma" , "ankeet" , "alla kirjutama" , "X korrus" , "lahkuma" , "baar" , "õlu" ];

﻿var info = {	module: "M4",	lesson: "L2",	version: "v1.0M4L2-fr",	isEx3Type1: true,	lang: "Français",	page_title: "Hôtel",	menu_note: "Cette leçon va montrer comment réserver un hôtel, donner et prendre des informations nécessaires sur votre séjour. Nous allons commencer par une réservation, puis un hébergement et, à la fin, le départ."};_localizationParts['info'] = info;

﻿var characters = [ 
		{ ch: "hôtel", icon: "M4_L2_C1.JPG" } ,  
		{ ch: "passeport", icon: "M4_L2_C2.JPG" } ,  
		{ ch: "carte de crédit", icon: "M4_L2_C3.JPG" } ,  
		{ ch: "chambre", icon: "M4_L2_C4.JPG" } ,  
		{ ch: "clé", icon: "M4_L2_C5.JPG" } ,  
		{ ch: "espèces", icon: "M4_L2_C6.JPG" } ,  
		{ ch: "ascenseur", icon: "M4_L2_C7.JPG" } ,  
		{ ch: "bagage", icon: "M4_L2_C8.JPG" } ,  
		{ ch: "taxi", icon: "M4_L2_C9.JPG" } ,  
		{ ch: "aéroport", icon: "M4_L2_C10.JPG" } 
		];

﻿var ui = {
	menu_dialog_title: 'Dialogues',
	menu_dialog_choose: 'choisir une partie',
	menu_vocabulary: 'Vocabulaire',
	menu_characters: 'Caractères',
	menu_quiz_title: 'Quiz audio',
	menu_quiz_choose: 'choisir quizz',
	menu_quiz_1: 'Mot correct',
	menu_quiz_2: 'Bon ordre',
	menu_quiz_3: 'Mot correct',
	menu_home: 'accueil',
	menu_project: 'projet',
	menu_settings: 'paramètres',
	
	settings_title: 'Paramètres',
	settings_dialog: 'Langue des dialogues et des exercices',
	settings_interface: "Langue de l'interface",
	settings_pynin: 'Pinyin',
	settings_cn: 'Alphabet chinois',
	
	project_about_title: 'A propos du projet',
	project_about: '<p style="text-align:center">'
	+ '<b>Chinese for Europeans</b><br/>'
	+ '<a href="http://www.chinese4.eu">www.chinese4.eu</a></p>'
	+ '<p>The free of charge C4EU project aims at bringing the Chinese language and culture closer to the representatives of various age and profession groups (enterpreneurs and their employees, tourists, students and children) from all EU Member States (as well as other countries) by offering products translated into 23 European languages.'
	+ '</p><p>The project is performed by the partnership of 6 European institutions (Mescomp Technologies - Poland, Antwerp Management School - Belgium, Fondazione Italia Cina - Italy, ICC International Language Association - Germany, Soros International House - Lithuania, EduActive - Poland) which are specializing in different areas: Chinese language teaching, quality of teaching materialsm programming, mobile technology and exploitation of the project results by contacting with wide group of interested parties.'
	+ '</p><p>This project has been co-founded by the European Commission.</p>'
	+ '<p>Photos attached in this application are property of Paweł Podgórski (<a href="http://echiny.pl">echiny.pl</a>) and project partners.</p>',
	
	part: 'Partie',
	dialogue_listen_all: 'Ecoutez le dialogue complet',
	exercise: 'Exercice',
	ex1_desc: 'Écoutez le mot et choisissez le caractère chinois convenable',
	ex1_check: 'Correction du test',
	ex2_meaning: 'sens:',
	ex2_desc: "Mettez les caractères dans l'ordre<br/> exact pour créer une phrase",
	ex2_check: 'Correction du test',
	ex2_restart: 'Recommencez le test',
	ex3_desc: 'Écoutez le mot et choisissez le caractère chinois convenable',
	ex3_check: 'Correction du test'
};

_localizationParts['ui'] = ui;

﻿var dialogs = [
	{
		title: "Réserver une chambre", 
		icon: "M4_L2_D1.JPG",
		Parts: [
					{ lines: [  "Hôtel Pékin, bonjour!" ,   "Bonjour. Je voudrais réserver une chambre." ,   "Oui, combien de temps voulez-vous rester?" ,   "Trois jours."   ] } , 
					{ lines: [  "Quel type de chambre souhaitez-vous réserver?" ,   "Combien coûte une chambre double?" ,   "600." ,   "Dollars américains (USD) ou yuans (RMB)?" ,   "Yuans (RMB)." ,   "Eh bien, j'en réserve une."   ] } , 
					{ lines: [  "Quand arrivez-vous?" ,   "Après-demain." ,   "Quel est votre nom?" ,   "Jack Smith." ,   "D'accord, nous vous invitons à Hôtel Pékin." ,   "Merci."   ] } 
				]
	} , 
	{
		title: "À l’hôtel", 
		icon: "M4_L2_D2.JPG",
		Parts: [
					{ lines: [  "Bienvenue à l'hôtel Pékin!" ,   "Bonjour, je m'appelle Jack Smith. J'ai réservé une chambre." ,   "Jack Smith, oui. Donnez-moi votre passeport, s'il vous plaît." ,   "Voici." ,   "Remplissez ce formulaire, s'il vous plaît." ,   "D'accord."   ] } , 
					{ lines: [  "Comment payez-vous? En espèces ou par carte?" ,   "Par carte." ,   "Donnez votre signature, s'il vous plaît." ,   "D'accord." ,   "Voici votre clé."   ] } , 
					{ lines: [  "Où se trouve ma chambre?" ,   "Au 12e étage." ,   "Où est l'ascenseur?" ,   "Tournez à droite. Derrière l'escalier." ,   "Merci."   ] } 
				]
	} , 
	{
		title: "Départ", 
		icon: "M4_L2_D3.JPG",
		Parts: [
					{ lines: [  "Bonjour. Je quitte l'hôtel. Le numéro de chambre est 1268." ,   "Ok. Avez-vous utilisé le mini-bar?" ,   "Oui, une bouteille de bière." ,   "Au total, 2000 kuai."   ] } , 
					{ lines: [  "Voici ma carte de crédit." ,   "Je suis désolé. Il y a un problème de système. Payez en espèces, s'il vous plaît." ,   "D'accord. Donnez-moi un reçu, s'il vous plaît." ,   "C'est pour vous."   ] } , 
					{ lines: [  "Puis-je laisser les bagages ici?" ,   "Oui, vous pouvez." ,   "Appelez un taxi, s'il vous plaît. Je vais à l'aéroport." ,   "D'accord. Pour l'aéroport, ça coûte trois cents." ,   "Combien de temps dois-je attendre?" ,   "20 minutes."   ] } 
				]
	} 
];

﻿var ex2 = [ "Quand arrivez-vous?" , "Combien coûte une chambre double?" , "Appelez un taxi, s'il vous plaît." , "Où est l'ascenseur?" , "Je vais à l'aéroport." ];

﻿var vocabulary = [ "réserver" , "dollar américain (USD)" , "yuan, kuai (RMB)" , "remplir" , "formulaire" , "signature" , "Xe étage" , "départ" , "bar" , "bière" ];
