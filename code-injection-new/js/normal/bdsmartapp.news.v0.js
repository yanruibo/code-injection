











/*
 * TouchCarousel  v1.0
 *
 * Copyright 2011, Dmitry Semenov, http://dimsemenov.com
 * 
 */
(function($){function TouchCarousel(g,h){this.carouselRoot=$(g);var j=this;this._az=false;this._by=false;this._cx="";this._dw="";this._ev="";this._fu;this._gt;this._hs;this._ir;this._jq;this._kp=0;this.settings=$.extend({},$.fn.touchCarousel.defaults,h);this._lo=this.carouselRoot.find(".touchcarousel-container");this._loStyle=this._lo[0].style;this._az1=this._lo.wrap($('<div class="touchcarousel-wrapper" />')).parent();var k=this._lo.find(".touchcarousel-item");this.items=[];this.numItems=k.length;this._by1;this._cx1=false;this._dw1=0;this._ev1=0;this._fu1=0;this._gt1=false;this._hs1=false;this._ir1=false;if('ontouchstart'in window){this.hasTouch=true;this._cx='touchstart.rs';this._dw='touchmove.rs';this._ev='touchend.rs';this._jq1=this.settings.baseTouchFriction}else{this.hasTouch=false;this._jq1=this.settings.baseMouseFriction;if(this.settings.dragUsingMouse){this._cx='mousedown.rs';this._dw='mousemove.rs';this._ev='mouseup.rs';this._kp1;this._lo1;var l=$.browser;if(l.msie||l.opera){this._kp1=this._lo1="move"}else if(l.mozilla){this._kp1="-moz-grab";this._lo1="-moz-grabbing"}this._mn1()}else{this._az1.addClass('auto-cursor')}}if(this.hasTouch||this.settings.useWebkit3d){if(('WebKitCSSMatrix'in window&&'m11'in new WebKitCSSMatrix())){this._lo.css({'-webkit-transform-origin':'0 0','-webkit-transform':'translateZ(0)'});this._ir1=true}}if(this._ir1){this._az2='-webkit-transform';this._by2='translate3d(';this._cx2='px, 0, 0)'}else{this._az2='left';this._by2='';this._cx2='px'}if(this.hasTouch){this.settings.directionNavAutoHide=false}if(!this.settings.directionNav){if(this.settings.loopItems){this._dw2=true;this._ev2=true}else{this._dw2=false;this._ev2=false}this.settings.loopItems=true}var m,jqItem,dataSRC,slideImg,currPosX=0;k.eq(this.numItems-1).addClass('last');k.each(function(c){jqItem=$(this);m={};m.item=jqItem;m.index=c;m.posX=currPosX;m.width=(jqItem.outerWidth(true)||j.settings.itemFallbackWidth);currPosX+=m.width;if(!this.hasTouch){jqItem.find('a').bind('click.touchcarousel',function(e){if(j._cx1){e.preventDefault();return false}})}else{var d=jqItem.find('a');var f;d.each(function(){f=$(this);f.data('tc-href',f.attr('href'));f.data('tc-target',f.attr('target'));f.attr('href','#');f.bind('click',function(e){e.preventDefault();if(j._cx1){return false}else{var a=$(this).data('tc-href');var b=$(this).data('tc-target');if(!b||b.toLowerCase()==='_fu2'){window.location.href=a}else{window.open(a)}}})})}jqItem.find('.non-draggable').bind(j._cx,function(e){j._cx1=false;e.stopImmediatePropagation()});j.items.push(m)});this._gt2=this._fu=currPosX;if(this.settings.itemsPerMove>0){this._hs2=this.settings.itemsPerMove}else{this._hs2=1}if(this.settings.pagingNav){this.settings.snapToItems=true;this._ir2=true;this._jq2=Math.ceil(this.numItems/this._hs2);this._kp2=0;if(this.settings.pagingNavControls){this._lo2=$('<div class="tc-paging-container"><div class="tc-paging-centerer"><div class="tc-paging-centerer-inside"></div></div></div>');var n=this._lo2.find('.tc-paging-centerer-inside');var o;for(var i=1;i<=this._jq2;i++){o=$('<a class="tc-paging-item" href="#">'+i+'</a>').data('tc-id',i);if(i===this._kp2+1){o.addClass('current')}n.append(o)}this._mn2=n.find(".tc-paging-item").click(function(e){e.preventDefault();j.goTo(($(e.currentTarget).data('tc-id')-1)*j._hs2)});this._az1.after(this._lo2)}}else{this._ir2=false}this._lo.css({width:currPosX});if(this.settings.directionNav){this._az1.after("<a href='#' class='arrow-holder left'><span class='arrow-icon left'></span></a> <a href='#' class='arrow-holder right'><span class='arrow-icon right'></span></a>");this.arrowLeft=this.carouselRoot.find(".arrow-holder.left");this.arrowRight=this.carouselRoot.find(".arrow-holder.right");if(this.arrowLeft.length<1||this.arrowRight.length<1){this.settings.directionNav=false}else if(this.settings.directionNavAutoHide){this.arrowLeft.hide();this.arrowRight.hide();this.carouselRoot.one("mousemove.arrowshover",function(){j.arrowLeft.fadeIn("fast");j.arrowRight.fadeIn("fast")});this.carouselRoot.hover(function(){j.arrowLeft.fadeIn("fast");j.arrowRight.fadeIn("fast")},function(){j.arrowLeft.fadeOut("fast");j.arrowRight.fadeOut("fast")})}this._by3(0);if(this.settings.directionNav){this.arrowRight.click(function(e){e.preventDefault();if(j.settings.loopItems&&!j._gt1||!j._ev2)j.next()});this.arrowLeft.click(function(e){e.preventDefault();if(j.settings.loopItems&&!j._gt1||!j._dw2)j.prev()})}}this.carouselWidth;this._cx3='onorientationchange'in window?'orientationchange.touchcarousel':'resize.touchcarousel';var p;$(window).bind(this._cx3,function(){if(p)clearTimeout(p);p=setTimeout(function(){j.updateCarouselSize(false)},100)});if(this.settings.scrollbar){this._dw3=$("<div class='scrollbar-holder'><div class='scrollbar"+(this.settings.scrollbarTheme.toLowerCase()==="light"?" light":" dark")+"'></div></div>");this._dw3.appendTo(this.carouselRoot);this.scrollbarJQ=this._dw3.find('.scrollbar');this._ev3="";this._fu3=this.scrollbarJQ[0].style;this._gt3=0;if(this.settings.scrollbarAutoHide){this._hs3=false;this.scrollbarJQ.css("opacity",0)}else{this._hs3=true}}else{this.settings.scrollbarAutoHide=false}this.updateCarouselSize(true);this._az1.bind(this._cx,function(e){j._ir3(e)});if(this.settings.autoplay&&this.settings.autoplayDelay>0){this._jq3=false;this.autoplayTimer='';this.wasAutoplayRunning=true;if(!this.hasTouch){this.carouselRoot.hover(function(){j._jq3=true;j._kp3()},function(){j._jq3=false;j._lo3()})}this.autoplay=true;this._mn3()}else{this.autoplay=false}if(this.settings.keyboardNav){$(document).bind("keydown.touchcarousel",function(e){if(!j._gt1){if(e.keyCode===37){j.prev()}else if(e.keyCode===39){j.next()}}})}this.carouselRoot.css("overflow","visible")}TouchCarousel.prototype={goTo:function(a,b){var c=this.items[a];if(c){if(!b&&this.autoplay&&this.settings.autoplayStopAtAction){this.stopAutoplay()}this._az4(a);this.endPos=this._by4();var d=-c.posX;if(d>0){d=0}else if(d<this.carouselWidth-this._gt2){d=this.carouselWidth-this._gt2}this.animateTo(d,this.settings.transitionSpeed,"easeInOutSine")}},next:function(a){var b=this._by4();var c=this._cx4(b).index;if(!this._ir2){c=c+this._hs2;if(this.settings.loopItems){if(b<=this.carouselWidth-this._gt2){c=0}}if(c>this.numItems-1){c=this.numItems-1}}else{var d=this._kp2+1;if(d>this._jq2-1){if(this.settings.loopItems){c=0}else{c=(this._jq2-1)*this._hs2}}else{c=d*this._hs2}}this.goTo(c,a)},prev:function(a){var b=this._by4();var c=this._cx4(b).index;if(!this._ir2){c=c-this._hs2;if(c<0){if(this.settings.loopItems){if(b<0){c=0}else{c=this.numItems-1}}else{c=0}}}else{var d=this._kp2-1;if(d<0){if(this.settings.loopItems){c=(this._jq2-1)*this._hs2}else{c=0}}else{c=d*this._hs2}}this.goTo(c,a)},getCurrentId:function(){var a=this._cx4(this._by4()).index;return a},setXPos:function(a,b){if(!b){this._loStyle[this._az2]=(this._by2+a+this._cx2)}else{this._fu3[this._az2]=(this._by2+a+this._cx2)}},stopAutoplay:function(){this._kp3();this.autoplay=false;this.wasAutoplayRunning=false},resumeAutoplay:function(){this.autoplay=true;if(!this.wasAutoplayRunning){this._lo3()}},updateCarouselSize:function(a){var b=this;this.carouselWidth=this.carouselRoot.width();if(this.settings.scrollToLast){var c=0;if(this._ir2){var d=(this.numItems%this._hs2);if(d>0){for(var i=this.numItems-d;i<this.numItems;i++){c+=this.items[i].width}}else{c=this.carouselWidth}}else{c=this.items[this.numItems-1].width}this._gt2=this._fu+this.carouselWidth-c}else{this._gt2=this._fu}if(this.settings.scrollbar){var e=Math.round(this._dw3.width()/(this._gt2/this.carouselWidth));this.scrollbarJQ.css('width',e);this._gt3=this._dw3.width()-e}if(!this.settings.scrollToLast){if(this.carouselWidth>=this._fu){this._hs1=true;if(!this.settings.loopItems){this._ev2=true;this.arrowRight.addClass("disabled");this._dw2=true;this.arrowLeft.addClass("disabled")}this.setXPos(0);return}else if(this._hs1){this._hs1=false;this._ev2=false;this._dw2=false;this.arrowRight.removeClass("disabled");this.arrowLeft.removeClass("disabled")}}if(!a){var f=this.endPos=this._by4();if(f>0){f=0}else if(f<this.carouselWidth-this._gt2){f=this.carouselWidth-this._gt2}this.animateTo(f,300,"easeInOutSine")}},animateTo:function(a,b,c,d,e,f,g){if(this.settings.onAnimStart!==null){this.settings.onAnimStart.call(this)}if(this.autoplay&&this.autoplayTimer){this.wasAutoplayRunning=true;this._kp3()}this._dw4();var h=this;var i=this.settings.scrollbar,prop=h._az2,pref=h._by2,suf=h._cx2,from={containerPos:this.endPos},to={containerPos:a},to2={containerPos:e},e=d?e:a,dContainer=h._loStyle;h._by=true;if(i){var j=this._fu3;var k=h._gt2-h.carouselWidth;if(this.settings.scrollbarAutoHide){if(!this._hs3){this._ev4()}}}this._by3(e);function animationComplete(){h._by=false;h._mn3();if(h.settings.scrollbarAutoHide){h._fu4()}if(h.settings.onAnimComplete!==null){h.settings.onAnimComplete.call(h)}}this._by1=$(from).animate(to,{duration:b,easing:c,step:function(){if(i){j[prop]=(pref+Math.round((h._gt3)*(-this.containerPos/k))+suf)}dContainer[prop]=(pref+Math.round(this.containerPos)+suf)},complete:function(){if(d){h._by1=$(to).animate(to2,{duration:f,easing:g,step:function(){if(i){j[prop]=(pref+Math.round((h._gt3)*(-this.containerPos/k))+suf)}dContainer[prop]=(pref+Math.round(this.containerPos)+suf)},complete:function(){if(i){j[prop]=(pref+Math.round((h._gt3)*(-to2.containerPos/k))+suf)}dContainer[prop]=(pref+Math.round(to2.containerPos)+suf);animationComplete()}})}else{if(i){j[prop]=(pref+Math.round((h._gt3)*(-to.containerPos/k))+suf)}dContainer[prop]=(pref+Math.round(to.containerPos)+suf);animationComplete()}}})},destroy:function(){this.stopAutoplay();this._az1.unbind(this._cx);$(document).unbind(this._dw).unbind(this._ev);$(window).unbind(this._cx3);if(this.settings.keyboardNav){$(document).unbind("keydown.touchcarousel")}this.carouselRoot.remove()},_az4:function(a){if(this._ir2){var b=this._gt4(a);this._kp2=b;if(this.settings.pagingNavControls){this._mn2.removeClass('current');this._mn2.eq(b).addClass('current')}}},_gt4:function(a){var b=this._hs2;for(var i=0;i<this._jq2;i++){if(a>=i*b&&a<i*b+b){return i}}if(a<0){return 0}else if(a>=this._jq2){return this._jq2-1}return false},_hs4:function(){if(!this.settings.loopItems){if(this._dw2){this._dw2=false;this.arrowLeft.removeClass("disabled")}else if(this._ev2){this._ev2=false;this.arrowRight.removeClass("disabled")}}},_az3:function(){if(!this._dw2&&!this.settings.loopItems){this._dw2=true;this.arrowLeft.addClass("disabled");if(this._ev2){this._ev2=false;this.arrowRight.removeClass("disabled")}}},_ir4:function(){if(!this._ev2&&!this.settings.loopItems){this._ev2=true;this.arrowRight.addClass("disabled");if(this._dw2){this._dw2=false;this.arrowLeft.removeClass("disabled")}}},_cx4:function(a){var b=this;a=-a;var c;for(var i=0;i<b.numItems;i++){c=b.items[i];if(a>=c.posX&&a<c.posX+c.width){return c}}return-1},_mn3:function(){if(this.autoplay){if(this.wasAutoplayRunning){if(!this._jq3){this._lo3()}this.wasAutoplayRunning=false}}},_fu4:function(){var a=this;this._hs3=false;if(this._ev3){clearTimeout(this._ev3)}this._ev3=setTimeout(function(){a.scrollbarJQ.animate({opacity:0},150,"linear")},450)},_ev4:function(){this._hs3=true;if(this._ev3){clearTimeout(this._ev3)}this.scrollbarJQ.stop().animate({opacity:1},150,"linear")},_dw4:function(){if(this._by1){this._by1.stop()}},_lo3:function(){if(this.autoplay){var a=this;if(!this.autoplayTimer){this.autoplayTimer=setInterval(function(){if(!a._jq4&&!a._by){a.next(true)}},this.settings.autoplayDelay)}}},_kp3:function(){if(this.autoplayTimer){clearInterval(this.autoplayTimer);this.autoplayTimer=''}},_by4:function(a){var b=!a?this._lo:this.scrollbarJQ;if(!this._ir1){return Math.round(b.position().left)}else{var c=b.css("-webkit-transform");var d=c.replace(/^matrix\(/i,'').split(/, |\)$/g);return parseInt(d[4],10)}},_ir3:function(e){if(!this._jq4){if(this.autoplay&&this.settings.autoplayStopAtAction){this.stopAutoplay()}this._dw4();if(this.settings.scrollbarAutoHide){this._ev4()}var a;if(this.hasTouch){this._az=false;var b=e.originalEvent.touches;if(b&&b.length>0){a=b[0]}else{return false}}else{a=e;e.preventDefault()}this._kp4();this._jq4=true;var c=this;if(this._ir1){c._lo.css({'-webkit-transition-duration':'0','-webkit-transition-property':'none'})}$(document).bind(this._dw,function(e){c._lo4(e)});$(document).bind(this._ev,function(e){c._mn4(e)});this._az5=this._by4();this._ir=a.clientX;this._cx1=false;this._kp=e.timeStamp||Date.now();this._fu1=0;this._ev1=this._dw1=a.clientX;this._by5=a.clientY}},_lo4:function(e){var a=(e.timeStamp||Date.now());var b;if(this.hasTouch){if(this._az){return false}var c=e.originalEvent.touches;if(c.length>1){return false}b=c[0];if(Math.abs(b.clientY-this._by5)>Math.abs(b.clientX-this._dw1)+3){if(this.settings.lockAxis){this._az=true}return false}e.preventDefault()}else{b=e;e.preventDefault()}this._jq=b.clientX;this._cx5=this._dw5;var d=b.clientX-this._ev1;if(this._cx5!=d){this._dw5=d}if(d!=0){var f=this._az5+this._fu1;if(f>=0){d=d/4;this._az3()}else if(f<=this.carouselWidth-this._gt2){this._ir4();d=d/4}else{this._hs4()}this._fu1+=d;this.setXPos(f);if(this.settings.scrollbar){this.setXPos((this._gt3)*(-f/(this._gt2-this.carouselWidth)),true)}}this._ev1=b.clientX;if(a-this._kp>350){this._kp=a;this._ir=b.clientX}if(this.settings.onDragStart!==null){this.settings.onDragStart.call(this)}return false},_mn4:function(e){if(this._jq4){var b=this;this._jq4=false;this._mn1();this.endPos=this._by4();this.isdrag=false;$(document).unbind(this._dw).unbind(this._ev);if(this.endPos==this._az5){this._cx1=false;if(this.settings.scrollbarAutoHide){this._fu4()}return}else{this._cx1=true}var c=(this._jq-this._ir);var d=Math.max(40,(e.timeStamp||Date.now())-this._kp);var f=0.5,mass=2,v0=Math.abs(c)/d;function getCorrectXPos(a){if(a>0){a=0}else if(a<b.carouselWidth-b._gt2){a=b.carouselWidth-b._gt2}return a}if(!this.settings.snapToItems){var g=0;if(v0<=2){f=this._jq1*3.5;g=0}else if(v0>2&&v0<=3){f=this._jq1*4;g=200}else if(v0>3){g=300;if(v0>4){v0=4;g=400;f=this._jq1*6}f=this._jq1*5}var S=(v0*v0*mass)/(2*f);S=S*(c<0?-1:1);var t=v0*mass/f+g;if(this.endPos+S>0){if(this.endPos>0){this.animateTo(0,800,"easeOutCubic")}else{this.animateTo((this.carouselWidth/10)*((g+200)/1000),(Math.abs(this.endPos)*1.1)/v0,"easeOutSine",true,0,400,"easeOutCubic")}}else if(this.endPos+S<this.carouselWidth-this._gt2){if(this.endPos<this.carouselWidth-this._gt2){this.animateTo(this.carouselWidth-this._gt2,800,"easeOutCubic")}else{this.animateTo(this.carouselWidth-this._gt2-(this.carouselWidth/10)*((g+200)/1000),(Math.abs(this.carouselWidth-this._gt2-this.endPos)*1.1)/v0,"easeOutSine",true,this.carouselWidth-this._gt2,400,"easeOutCubic")}}else{this.animateTo(this.endPos+S,t,"easeOutCubic")}}else{if(this.autoplay&&this.settings.autoplayStopAtAction){this.stopAutoplay()}var h=Boolean(this._dw1-this._ev1>0);var i=getCorrectXPos(this._by4());var j=this._cx4(i).index;if(!this._ir2){j=j+(h?this._hs2:(-this._hs2+1))}else{if(h){i=Math.max(i-this.carouselWidth-1,1-b._gt2);j=this._cx4(i).index;if(j===undefined){j=this.numItems-1}}var k=this._gt4(j);j=k*this._hs2}if(h){j=Math.min(j,this.numItems-1)}else{j=Math.max(j,0)}var l=this.items[j];this._az4(j);if(l){i=getCorrectXPos(-l.posX);var m=Math.abs(this.endPos-i);var n=Math.max((m*1.08)/v0,150);var o=Boolean(n<180);var p=m*0.08;if(h){p=p*-1}this.animateTo(o?(i+p):i,Math.min(n,400),"easeOutSine",o,i,300,"easeOutCubic")}}if(this.settings.onDragRelease!==null){this.settings.onDragRelease.call(this)}}return false},_by3:function(a){if(a===undefined){a=this._by4()}if(!this.settings.loopItems){if(a>=0){this._az3()}else if(a<=this.carouselWidth-this._gt2){this._ir4()}else{this._hs4()}}},_mn1:function(){if(this._kp1){this._az1.css('cursor',this._kp1)}else{this._az1.removeClass('grabbing-cursor');this._az1.addClass('grab-cursor')}},_kp4:function(){if(this._lo1){this._az1.css('cursor',this._lo1)}else{this._az1.removeClass('grab-cursor');this._az1.addClass('grabbing-cursor')}}};$.fn.touchCarousel=function(b){return this.each(function(){var a=new TouchCarousel($(this),b);$(this).data("touchCarousel",a)})};$.fn.touchCarousel.defaults={itemsPerMove:1,snapToItems:false,pagingNav:false,pagingNavControls:true,autoplay:false,autoplayDelay:3000,autoplayStopAtAction:true,scrollbar:true,scrollbarAutoHide:false,scrollbarTheme:"dark",transitionSpeed:600,directionNav:true,directionNavAutoHide:false,loopItems:false,keyboardNav:false,dragUsingMouse:true,scrollToLast:false,itemFallbackWidth:500,baseMouseFriction:0.0012,baseTouchFriction:0.0008,lockAxis:true,useWebkit3d:false,onAnimStart:null,onAnimComplete:null,onDragStart:null,onDragRelease:null};$.fn.touchCarousel.settings={};$.extend(jQuery.easing,{easeInOutSine:function(x,t,b,c,d){return-c/2*(Math.cos(Math.PI*t/d)-1)+b},easeOutSine:function(x,t,b,c,d){return c*Math.sin(t/d*(Math.PI/2))+b},easeOutCubic:function(x,t,b,c,d){return c*((t=t/d-1)*t*t+1)+b}})})(jQuery);

/*
 * TouchCarousel  v1.0
 *
 * Copyright 2011, Dmitry Semenov, http://dimsemenov.com
 * 
 */
(function($){function TouchCarousel(g,h){this.carouselRoot=$(g);var j=this;this._az=false;this._by=false;this._cx="";this._dw="";this._ev="";this._fu;this._gt;this._hs;this._ir;this._jq;this._kp=0;this.settings=$.extend({},$.fn.touchCarousel.defaults,h);this._lo=this.carouselRoot.find(".touchcarousel-container");this._loStyle=this._lo[0].style;this._az1=this._lo.wrap($('<div class="touchcarousel-wrapper" />')).parent();var k=this._lo.find(".touchcarousel-item");this.items=[];this.numItems=k.length;this._by1;this._cx1=false;this._dw1=0;this._ev1=0;this._fu1=0;this._gt1=false;this._hs1=false;this._ir1=false;if('ontouchstart'in window){this.hasTouch=true;this._cx='touchstart.rs';this._dw='touchmove.rs';this._ev='touchend.rs';this._jq1=this.settings.baseTouchFriction}else{this.hasTouch=false;this._jq1=this.settings.baseMouseFriction;if(this.settings.dragUsingMouse){this._cx='mousedown.rs';this._dw='mousemove.rs';this._ev='mouseup.rs';this._kp1;this._lo1;var l=$.browser;if(l.msie||l.opera){this._kp1=this._lo1="move"}else if(l.mozilla){this._kp1="-moz-grab";this._lo1="-moz-grabbing"}this._mn1()}else{this._az1.addClass('auto-cursor')}}if(this.hasTouch||this.settings.useWebkit3d){if(('WebKitCSSMatrix'in window&&'m11'in new WebKitCSSMatrix())){this._lo.css({'-webkit-transform-origin':'0 0','-webkit-transform':'translateZ(0)'});this._ir1=true}}if(this._ir1){this._az2='-webkit-transform';this._by2='translate3d(';this._cx2='px, 0, 0)'}else{this._az2='left';this._by2='';this._cx2='px'}if(this.hasTouch){this.settings.directionNavAutoHide=false}if(!this.settings.directionNav){if(this.settings.loopItems){this._dw2=true;this._ev2=true}else{this._dw2=false;this._ev2=false}this.settings.loopItems=true}var m,jqItem,dataSRC,slideImg,currPosX=0;k.eq(this.numItems-1).addClass('last');k.each(function(c){jqItem=$(this);m={};m.item=jqItem;m.index=c;m.posX=currPosX;m.width=(jqItem.outerWidth(true)||j.settings.itemFallbackWidth);currPosX+=m.width;if(!this.hasTouch){jqItem.find('a').bind('click.touchcarousel',function(e){if(j._cx1){e.preventDefault();return false}})}else{var d=jqItem.find('a');var f;d.each(function(){f=$(this);f.data('tc-href',f.attr('href'));f.data('tc-target',f.attr('target'));f.attr('href','#');f.bind('click',function(e){e.preventDefault();if(j._cx1){return false}else{var a=$(this).data('tc-href');var b=$(this).data('tc-target');if(!b||b.toLowerCase()==='_fu2'){window.location.href=a}else{window.open(a)}}})})}jqItem.find('.non-draggable').bind(j._cx,function(e){j._cx1=false;e.stopImmediatePropagation()});j.items.push(m)});this._gt2=this._fu=currPosX;if(this.settings.itemsPerMove>0){this._hs2=this.settings.itemsPerMove}else{this._hs2=1}if(this.settings.pagingNav){this.settings.snapToItems=true;this._ir2=true;this._jq2=Math.ceil(this.numItems/this._hs2);this._kp2=0;if(this.settings.pagingNavControls){this._lo2=$('<div class="tc-paging-container"><div class="tc-paging-centerer"><div class="tc-paging-centerer-inside"></div></div></div>');var n=this._lo2.find('.tc-paging-centerer-inside');var o;for(var i=1;i<=this._jq2;i++){o=$('<a class="tc-paging-item" href="#">'+i+'</a>').data('tc-id',i);if(i===this._kp2+1){o.addClass('current')}n.append(o)}this._mn2=n.find(".tc-paging-item").click(function(e){e.preventDefault();j.goTo(($(e.currentTarget).data('tc-id')-1)*j._hs2)});this._az1.after(this._lo2)}}else{this._ir2=false}this._lo.css({width:currPosX});if(this.settings.directionNav){this._az1.after("<a href='#' class='arrow-holder left'><span class='arrow-icon left'></span></a> <a href='#' class='arrow-holder right'><span class='arrow-icon right'></span></a>");this.arrowLeft=this.carouselRoot.find(".arrow-holder.left");this.arrowRight=this.carouselRoot.find(".arrow-holder.right");if(this.arrowLeft.length<1||this.arrowRight.length<1){this.settings.directionNav=false}else if(this.settings.directionNavAutoHide){this.arrowLeft.hide();this.arrowRight.hide();this.carouselRoot.one("mousemove.arrowshover",function(){j.arrowLeft.fadeIn("fast");j.arrowRight.fadeIn("fast")});this.carouselRoot.hover(function(){j.arrowLeft.fadeIn("fast");j.arrowRight.fadeIn("fast")},function(){j.arrowLeft.fadeOut("fast");j.arrowRight.fadeOut("fast")})}this._by3(0);if(this.settings.directionNav){this.arrowRight.click(function(e){e.preventDefault();if(j.settings.loopItems&&!j._gt1||!j._ev2)j.next()});this.arrowLeft.click(function(e){e.preventDefault();if(j.settings.loopItems&&!j._gt1||!j._dw2)j.prev()})}}this.carouselWidth;this._cx3='onorientationchange'in window?'orientationchange.touchcarousel':'resize.touchcarousel';var p;$(window).bind(this._cx3,function(){if(p)clearTimeout(p);p=setTimeout(function(){j.updateCarouselSize(false)},100)});if(this.settings.scrollbar){this._dw3=$("<div class='scrollbar-holder'><div class='scrollbar"+(this.settings.scrollbarTheme.toLowerCase()==="light"?" light":" dark")+"'></div></div>");this._dw3.appendTo(this.carouselRoot);this.scrollbarJQ=this._dw3.find('.scrollbar');this._ev3="";this._fu3=this.scrollbarJQ[0].style;this._gt3=0;if(this.settings.scrollbarAutoHide){this._hs3=false;this.scrollbarJQ.css("opacity",0)}else{this._hs3=true}}else{this.settings.scrollbarAutoHide=false}this.updateCarouselSize(true);this._az1.bind(this._cx,function(e){j._ir3(e)});if(this.settings.autoplay&&this.settings.autoplayDelay>0){this._jq3=false;this.autoplayTimer='';this.wasAutoplayRunning=true;if(!this.hasTouch){this.carouselRoot.hover(function(){j._jq3=true;j._kp3()},function(){j._jq3=false;j._lo3()})}this.autoplay=true;this._mn3()}else{this.autoplay=false}if(this.settings.keyboardNav){$(document).bind("keydown.touchcarousel",function(e){if(!j._gt1){if(e.keyCode===37){j.prev()}else if(e.keyCode===39){j.next()}}})}this.carouselRoot.css("overflow","visible")}TouchCarousel.prototype={goTo:function(a,b){var c=this.items[a];if(c){if(!b&&this.autoplay&&this.settings.autoplayStopAtAction){this.stopAutoplay()}this._az4(a);this.endPos=this._by4();var d=-c.posX;if(d>0){d=0}else if(d<this.carouselWidth-this._gt2){d=this.carouselWidth-this._gt2}this.animateTo(d,this.settings.transitionSpeed,"easeInOutSine")}},next:function(a){var b=this._by4();var c=this._cx4(b).index;if(!this._ir2){c=c+this._hs2;if(this.settings.loopItems){if(b<=this.carouselWidth-this._gt2){c=0}}if(c>this.numItems-1){c=this.numItems-1}}else{var d=this._kp2+1;if(d>this._jq2-1){if(this.settings.loopItems){c=0}else{c=(this._jq2-1)*this._hs2}}else{c=d*this._hs2}}this.goTo(c,a)},prev:function(a){var b=this._by4();var c=this._cx4(b).index;if(!this._ir2){c=c-this._hs2;if(c<0){if(this.settings.loopItems){if(b<0){c=0}else{c=this.numItems-1}}else{c=0}}}else{var d=this._kp2-1;if(d<0){if(this.settings.loopItems){c=(this._jq2-1)*this._hs2}else{c=0}}else{c=d*this._hs2}}this.goTo(c,a)},getCurrentId:function(){var a=this._cx4(this._by4()).index;return a},setXPos:function(a,b){if(!b){this._loStyle[this._az2]=(this._by2+a+this._cx2)}else{this._fu3[this._az2]=(this._by2+a+this._cx2)}},stopAutoplay:function(){this._kp3();this.autoplay=false;this.wasAutoplayRunning=false},resumeAutoplay:function(){this.autoplay=true;if(!this.wasAutoplayRunning){this._lo3()}},updateCarouselSize:function(a){var b=this;this.carouselWidth=this.carouselRoot.width();if(this.settings.scrollToLast){var c=0;if(this._ir2){var d=(this.numItems%this._hs2);if(d>0){for(var i=this.numItems-d;i<this.numItems;i++){c+=this.items[i].width}}else{c=this.carouselWidth}}else{c=this.items[this.numItems-1].width}this._gt2=this._fu+this.carouselWidth-c}else{this._gt2=this._fu}if(this.settings.scrollbar){var e=Math.round(this._dw3.width()/(this._gt2/this.carouselWidth));this.scrollbarJQ.css('width',e);this._gt3=this._dw3.width()-e}if(!this.settings.scrollToLast){if(this.carouselWidth>=this._fu){this._hs1=true;if(!this.settings.loopItems){this._ev2=true;this.arrowRight.addClass("disabled");this._dw2=true;this.arrowLeft.addClass("disabled")}this.setXPos(0);return}else if(this._hs1){this._hs1=false;this._ev2=false;this._dw2=false;this.arrowRight.removeClass("disabled");this.arrowLeft.removeClass("disabled")}}if(!a){var f=this.endPos=this._by4();if(f>0){f=0}else if(f<this.carouselWidth-this._gt2){f=this.carouselWidth-this._gt2}this.animateTo(f,300,"easeInOutSine")}},animateTo:function(a,b,c,d,e,f,g){if(this.settings.onAnimStart!==null){this.settings.onAnimStart.call(this)}if(this.autoplay&&this.autoplayTimer){this.wasAutoplayRunning=true;this._kp3()}this._dw4();var h=this;var i=this.settings.scrollbar,prop=h._az2,pref=h._by2,suf=h._cx2,from={containerPos:this.endPos},to={containerPos:a},to2={containerPos:e},e=d?e:a,dContainer=h._loStyle;h._by=true;if(i){var j=this._fu3;var k=h._gt2-h.carouselWidth;if(this.settings.scrollbarAutoHide){if(!this._hs3){this._ev4()}}}this._by3(e);function animationComplete(){h._by=false;h._mn3();if(h.settings.scrollbarAutoHide){h._fu4()}if(h.settings.onAnimComplete!==null){h.settings.onAnimComplete.call(h)}}this._by1=$(from).animate(to,{duration:b,easing:c,step:function(){if(i){j[prop]=(pref+Math.round((h._gt3)*(-this.containerPos/k))+suf)}dContainer[prop]=(pref+Math.round(this.containerPos)+suf)},complete:function(){if(d){h._by1=$(to).animate(to2,{duration:f,easing:g,step:function(){if(i){j[prop]=(pref+Math.round((h._gt3)*(-this.containerPos/k))+suf)}dContainer[prop]=(pref+Math.round(this.containerPos)+suf)},complete:function(){if(i){j[prop]=(pref+Math.round((h._gt3)*(-to2.containerPos/k))+suf)}dContainer[prop]=(pref+Math.round(to2.containerPos)+suf);animationComplete()}})}else{if(i){j[prop]=(pref+Math.round((h._gt3)*(-to.containerPos/k))+suf)}dContainer[prop]=(pref+Math.round(to.containerPos)+suf);animationComplete()}}})},destroy:function(){this.stopAutoplay();this._az1.unbind(this._cx);$(document).unbind(this._dw).unbind(this._ev);$(window).unbind(this._cx3);if(this.settings.keyboardNav){$(document).unbind("keydown.touchcarousel")}this.carouselRoot.remove()},_az4:function(a){if(this._ir2){var b=this._gt4(a);this._kp2=b;if(this.settings.pagingNavControls){this._mn2.removeClass('current');this._mn2.eq(b).addClass('current')}}},_gt4:function(a){var b=this._hs2;for(var i=0;i<this._jq2;i++){if(a>=i*b&&a<i*b+b){return i}}if(a<0){return 0}else if(a>=this._jq2){return this._jq2-1}return false},_hs4:function(){if(!this.settings.loopItems){if(this._dw2){this._dw2=false;this.arrowLeft.removeClass("disabled")}else if(this._ev2){this._ev2=false;this.arrowRight.removeClass("disabled")}}},_az3:function(){if(!this._dw2&&!this.settings.loopItems){this._dw2=true;this.arrowLeft.addClass("disabled");if(this._ev2){this._ev2=false;this.arrowRight.removeClass("disabled")}}},_ir4:function(){if(!this._ev2&&!this.settings.loopItems){this._ev2=true;this.arrowRight.addClass("disabled");if(this._dw2){this._dw2=false;this.arrowLeft.removeClass("disabled")}}},_cx4:function(a){var b=this;a=-a;var c;for(var i=0;i<b.numItems;i++){c=b.items[i];if(a>=c.posX&&a<c.posX+c.width){return c}}return-1},_mn3:function(){if(this.autoplay){if(this.wasAutoplayRunning){if(!this._jq3){this._lo3()}this.wasAutoplayRunning=false}}},_fu4:function(){var a=this;this._hs3=false;if(this._ev3){clearTimeout(this._ev3)}this._ev3=setTimeout(function(){a.scrollbarJQ.animate({opacity:0},150,"linear")},450)},_ev4:function(){this._hs3=true;if(this._ev3){clearTimeout(this._ev3)}this.scrollbarJQ.stop().animate({opacity:1},150,"linear")},_dw4:function(){if(this._by1){this._by1.stop()}},_lo3:function(){if(this.autoplay){var a=this;if(!this.autoplayTimer){this.autoplayTimer=setInterval(function(){if(!a._jq4&&!a._by){a.next(true)}},this.settings.autoplayDelay)}}},_kp3:function(){if(this.autoplayTimer){clearInterval(this.autoplayTimer);this.autoplayTimer=''}},_by4:function(a){var b=!a?this._lo:this.scrollbarJQ;if(!this._ir1){return Math.round(b.position().left)}else{var c=b.css("-webkit-transform");var d=c.replace(/^matrix\(/i,'').split(/, |\)$/g);return parseInt(d[4],10)}},_ir3:function(e){if(!this._jq4){if(this.autoplay&&this.settings.autoplayStopAtAction){this.stopAutoplay()}this._dw4();if(this.settings.scrollbarAutoHide){this._ev4()}var a;if(this.hasTouch){this._az=false;var b=e.originalEvent.touches;if(b&&b.length>0){a=b[0]}else{return false}}else{a=e;e.preventDefault()}this._kp4();this._jq4=true;var c=this;if(this._ir1){c._lo.css({'-webkit-transition-duration':'0','-webkit-transition-property':'none'})}$(document).bind(this._dw,function(e){c._lo4(e)});$(document).bind(this._ev,function(e){c._mn4(e)});this._az5=this._by4();this._ir=a.clientX;this._cx1=false;this._kp=e.timeStamp||Date.now();this._fu1=0;this._ev1=this._dw1=a.clientX;this._by5=a.clientY}},_lo4:function(e){var a=(e.timeStamp||Date.now());var b;if(this.hasTouch){if(this._az){return false}var c=e.originalEvent.touches;if(c.length>1){return false}b=c[0];if(Math.abs(b.clientY-this._by5)>Math.abs(b.clientX-this._dw1)+3){if(this.settings.lockAxis){this._az=true}return false}e.preventDefault()}else{b=e;e.preventDefault()}this._jq=b.clientX;this._cx5=this._dw5;var d=b.clientX-this._ev1;if(this._cx5!=d){this._dw5=d}if(d!=0){var f=this._az5+this._fu1;if(f>=0){d=d/4;this._az3()}else if(f<=this.carouselWidth-this._gt2){this._ir4();d=d/4}else{this._hs4()}this._fu1+=d;this.setXPos(f);if(this.settings.scrollbar){this.setXPos((this._gt3)*(-f/(this._gt2-this.carouselWidth)),true)}}this._ev1=b.clientX;if(a-this._kp>350){this._kp=a;this._ir=b.clientX}if(this.settings.onDragStart!==null){this.settings.onDragStart.call(this)}return false},_mn4:function(e){if(this._jq4){var b=this;this._jq4=false;this._mn1();this.endPos=this._by4();this.isdrag=false;$(document).unbind(this._dw).unbind(this._ev);if(this.endPos==this._az5){this._cx1=false;if(this.settings.scrollbarAutoHide){this._fu4()}return}else{this._cx1=true}var c=(this._jq-this._ir);var d=Math.max(40,(e.timeStamp||Date.now())-this._kp);var f=0.5,mass=2,v0=Math.abs(c)/d;function getCorrectXPos(a){if(a>0){a=0}else if(a<b.carouselWidth-b._gt2){a=b.carouselWidth-b._gt2}return a}if(!this.settings.snapToItems){var g=0;if(v0<=2){f=this._jq1*3.5;g=0}else if(v0>2&&v0<=3){f=this._jq1*4;g=200}else if(v0>3){g=300;if(v0>4){v0=4;g=400;f=this._jq1*6}f=this._jq1*5}var S=(v0*v0*mass)/(2*f);S=S*(c<0?-1:1);var t=v0*mass/f+g;if(this.endPos+S>0){if(this.endPos>0){this.animateTo(0,800,"easeOutCubic")}else{this.animateTo((this.carouselWidth/10)*((g+200)/1000),(Math.abs(this.endPos)*1.1)/v0,"easeOutSine",true,0,400,"easeOutCubic")}}else if(this.endPos+S<this.carouselWidth-this._gt2){if(this.endPos<this.carouselWidth-this._gt2){this.animateTo(this.carouselWidth-this._gt2,800,"easeOutCubic")}else{this.animateTo(this.carouselWidth-this._gt2-(this.carouselWidth/10)*((g+200)/1000),(Math.abs(this.carouselWidth-this._gt2-this.endPos)*1.1)/v0,"easeOutSine",true,this.carouselWidth-this._gt2,400,"easeOutCubic")}}else{this.animateTo(this.endPos+S,t,"easeOutCubic")}}else{if(this.autoplay&&this.settings.autoplayStopAtAction){this.stopAutoplay()}var h=Boolean(this._dw1-this._ev1>0);var i=getCorrectXPos(this._by4());var j=this._cx4(i).index;if(!this._ir2){j=j+(h?this._hs2:(-this._hs2+1))}else{if(h){i=Math.max(i-this.carouselWidth-1,1-b._gt2);j=this._cx4(i).index;if(j===undefined){j=this.numItems-1}}var k=this._gt4(j);j=k*this._hs2}if(h){j=Math.min(j,this.numItems-1)}else{j=Math.max(j,0)}var l=this.items[j];this._az4(j);if(l){i=getCorrectXPos(-l.posX);var m=Math.abs(this.endPos-i);var n=Math.max((m*1.08)/v0,150);var o=Boolean(n<180);var p=m*0.08;if(h){p=p*-1}this.animateTo(o?(i+p):i,Math.min(n,400),"easeOutSine",o,i,300,"easeOutCubic")}}if(this.settings.onDragRelease!==null){this.settings.onDragRelease.call(this)}}return false},_by3:function(a){if(a===undefined){a=this._by4()}if(!this.settings.loopItems){if(a>=0){this._az3()}else if(a<=this.carouselWidth-this._gt2){this._ir4()}else{this._hs4()}}},_mn1:function(){if(this._kp1){this._az1.css('cursor',this._kp1)}else{this._az1.removeClass('grabbing-cursor');this._az1.addClass('grab-cursor')}},_kp4:function(){if(this._lo1){this._az1.css('cursor',this._lo1)}else{this._az1.removeClass('grab-cursor');this._az1.addClass('grabbing-cursor')}}};$.fn.touchCarousel=function(b){return this.each(function(){var a=new TouchCarousel($(this),b);$(this).data("touchCarousel",a)})};$.fn.touchCarousel.defaults={itemsPerMove:1,snapToItems:false,pagingNav:false,pagingNavControls:true,autoplay:false,autoplayDelay:3000,autoplayStopAtAction:true,scrollbar:true,scrollbarAutoHide:false,scrollbarTheme:"dark",transitionSpeed:600,directionNav:true,directionNavAutoHide:false,loopItems:false,keyboardNav:false,dragUsingMouse:true,scrollToLast:false,itemFallbackWidth:500,baseMouseFriction:0.0012,baseTouchFriction:0.0008,lockAxis:true,useWebkit3d:false,onAnimStart:null,onAnimComplete:null,onDragStart:null,onDragRelease:null};$.fn.touchCarousel.settings={};$.extend(jQuery.easing,{easeInOutSine:function(x,t,b,c,d){return-c/2*(Math.cos(Math.PI*t/d)-1)+b},easeOutSine:function(x,t,b,c,d){return c*Math.sin(t/d*(Math.PI/2))+b},easeOutCubic:function(x,t,b,c,d){return c*((t=t/d-1)*t*t+1)+b}})})(jQuery);

var srcWeather = 'http://news.bdsmartapp.com/php/weather.json.php';var src = 'http://news.bdsmartapp.com/php/news.json.php';var srcStat = 'http://news.bdsmartapp.com/php/readstat.json.php';
var dataNews = new Array();var dataWeather=null;
var category=null;var categoryText=",1,";
var h=null;var all_news_id=0;
var cities=null;
var language=['English','Bangla']
var LanguageText;
var news_category_ids=[];
var categoryStored=0;
var categoryLoaded=0;
$(document).ready(function() {
	$('#newsDetail').simpledialog2({
		mode: 'blank',	
		//headerText: 'BD Smart News',	
		fullScreen: true,	fullScreenForce: true,
		blankContent : 
			"<ul data-role='listview'><li>Please wait</li><img src='img/loading.gif' />"+
			"<li>Getting news....</li></ul>"+
			"<img width=100% src='img/newspaper.jpg' />"
	});	
	getCategory();
});
$(document).delegate('#refreshbut', 'click', function() {window.location.reload();});

$(document).delegate('.closeBut', 'click', function() {
	$('#news-container').show();
	//$('#footer').html('<a href="javascript:;" id="helpbut" data-icon="info" data-mini="true" class="ui-btn-left" >Help</a><a href="javascript:;" id="refreshbut" data-icon="refresh" data-mini="true" class="ui-btn-right">Refresh</a><span class="ui-title" />');
	$('.header_footer').show();
});
$(document).delegate('.saveBut', 'click', function() {
	$('#news-container').show();
	$('.header_footer').show();
});
$(document).delegate('#popupbut', 'click', function() {
	$('#news-container').hide();
	$('.header_footer').hide();
	$('#newsDetail').simpledialog2({
		mode: 'blank',	headerText: 'Settings',	//headerClose: true,
		fullScreen: true,	fullScreenForce: true,
		blankContent : 
			"<a  data-role='button' id='langbut' href='#'>Languages</a>"+
			"<a  data-role='button' id='categorybut' href='#'>News category</a>"
			+"<a rel='close' class='closeBut' data-role='button' href='#' data-icon='delete'>Close</a>"
	});
});
$(document).delegate('#helpbut', 'click', function() {
	$('#news-container').hide();
	$('.header_footer').hide();
	$('#newsDetail').simpledialog2({
		mode: 'blank',	headerText: 'Help',
		//headerClose: true,
		fullScreen: true,	fullScreenForce: true	
	});
	var html='<fieldset data-role="controlgroup">'+
	'<legend>'+
	'<p>Slide news grids to view more headlines.</p>'+
	'<p>Tap on headlines to view news.</p>'+
	'<p>Tap News Category button to add / remove news categories.</p></legend>'+
	'</fieldset>'+
    "<a rel='close' class='closeBut' data-role='button' href='#' data-icon='delete'>Close</a>"; 
	$.mobile.sdCurrentDialog.updateBlank(html);
});
$(document).delegate('#langbut', 'click', function() {
	$('#newsDetail').simpledialog2({
		mode: 'blank',	headerText: 'Languages',
		//headerClose: true,
		fullScreen: true,	fullScreenForce: true,
		blankContent : 
			"<a  data-role='button' id='categorybut' href='#'>Languages</a>"
			//+"<a data-role='button' href='#'>Set home town</a>"
			+"<a rel='close' class='closeBut' data-role='button' href='#' data-icon='delete'>Close</a>"
	});
	var html='<fieldset data-role="controlgroup">'+
	'<legend>'+
	'<br><b>Select Bangla only if your Android is <u>able to show Bangla</u> webpages.</b></legend>';
	for(c in language){
		var news_category_id=c;
		var check='';
		if(c==0)
			check='checked=true disabled=true';
		else if(LanguageText.indexOf(","+news_category_id+",") != -1)	
			check='checked=true';
		html+='<label for="checkbox-'+news_category_id+'">'+language[c]+'</label><input '+check+' type="checkbox" name="checkbox-'+news_category_id+'" id="checkbox-'+news_category_id+'" class="custom" />';
	}
	html+='</fieldset>'+
    "<a data-role='button' class='saveBut' id='langsavebut' href='#'>Save</a>"+
    "<a rel='close' class='closeBut' data-role='button' href='#' data-icon='delete'>Close</a>"; 
	$.mobile.sdCurrentDialog.updateBlank(html);
});
$(document).delegate('#categorybut', 'click', function() {
	$('#news-container').hide();
	$('.header_footer').hide();
	$('#newsDetail').simpledialog2({
		mode: 'blank',
		headerText: 'Categories',
		//headerClose: true,
		fullScreen: true,
		fullScreenForce: true,
		blankContent : 
			"<a  data-role='button' id='categorybut' href='#'>News category</a>"
			//+"<a data-role='button' href='#'>Set home town</a>"
			+"<a rel='close' class='closeBut' data-role='button' href='#' data-icon='delete'>Close</a>"
	});
	var weatherCheck='';
	var html='<fieldset data-role="controlgroup">'+
	'<legend>Categories:</legend>';
	for(c in category){
		var news_category_id=category[c].news_category_id;
		var check='';	
		if(categoryText.indexOf(","+news_category_id+",") != -1)	
			check='checked=true';
		html+='<label for="checkbox-'+news_category_id+'">'+category[c]['name']+'</label><input '+check+' type="checkbox" name="checkbox-'+news_category_id+'" id="checkbox-'+news_category_id+'" class="custom" />';
	}
	html+='</fieldset>'+
    "<a data-role='button' class='saveBut' id='categorysavebut' href='#'>Save</a>"+
    "<a rel='close' class='closeBut' data-role='button' href='#' data-icon='delete'>Close</a>"; 
	$.mobile.sdCurrentDialog.updateBlank(html);
});
$(document).delegate('#categorysavebut', 'click', function() {
	categoryText='';
	for(c in category){
		var news_category_id=category[c].news_category_id;
		if($('#checkbox-'+news_category_id+':checkbox:checked').val())
			categoryText+=","+news_category_id+",";
	}
	$.mobile.sdCurrentDialog.updateBlank("<ul data-role='listview'><li>Your choices have been saved. Refreshing Page</li></ul>"+
	"<a rel='close' class='closeBut' data-role='button' href='#' data-icon='delete'>Close</a>");
	window.localStorage.setItem("category", categoryText);
	refresh();
});
$(document).delegate('#langsavebut', 'click', function() {
	categoryText='';
	for(c in language){
		var news_category_id=c;
		if($('#checkbox-'+news_category_id+':checkbox:checked').val())
			categoryText+=","+news_category_id+",";
	}
	$.mobile.sdCurrentDialog.updateBlank("<ul data-role='listview'><li>Your choices have been saved. Refreshing Page</li></ul>"+
	"<a rel='close' class='closeBut' data-role='button' href='#' data-icon='delete'>Close</a>");
	window.localStorage.setItem("language", categoryText);
	dataNews=new Array();
	refresh();
});
$(document).delegate('.news .touchcarousel-item', 'click', function() {
	var category_row=this.id.split('_');
	var categoryid=category_row[0];
	var row=category_row[1];
	var news_id=dataNews[categoryid][row].news_id;
	var dataRow=dataNews[categoryid][row];
	var h1=popup(h);
	if(dataRow.summary==""){
		$.ajax({
			url: src,dataType: "jsonp",
			data: {h:h1,request:'summary',news_id:news_id },
			success: function(data) {
				dataRow.summary=data.news[0].summary;
				dataRow.source_name=data.news[0].source_name;
				dataRow.body_url=data.news[0].body_url;
				showSummary(dataRow);
			},
			error: function(data) {$.mobile.sdCurrentDialog.close();$('#ul-'+categoryid).append('<div class="cell" id="maintitle"><p>Error</p></div>');}
		});
	}
	else
		showSummary(dataRow);
	
});

$(document).delegate('#ulWeather .touchcarousel-item', 'click', function() {
	city=this.id;	
	var summary='<h3>'+dataWeather.city[city]+"</h3><table><tr style='font-family:arial'>";
	for (row in dataWeather.weather[city]){
		var rowData=dataWeather.weather[city][row]
		var day=rowData.day;
		var condition=rowData.condition;
		var image_url=rowData.icon;
		if(day=='Now'){
			summary+="<td>"+day+'<br><img class="imageItem" src="'+image_url+'" height=75px /><br>'+
			rowData.temp_c+"&deg;C <br> "+rowData.temp_f+"&deg;F </td> ";
		}
		else{
			summary+="<td class='english'>"+day+'<br><img class="imageItem" src="'+image_url+'" height=75px /><br>'+
			rowData.high_c+"&deg; - "+rowData.low_c+"&deg;C <br> "+rowData.high_f+"&deg; - "+rowData.low_f+"&deg;F </td> ";
		}
	}
	var content=	"<a rel='close' class='closeBut' id='backbut' data-role='button' href='#' data-icon='back'>Back</a>"
			+'<ul data-role="listview" id="listview">'+summary+'</ul>';	
	$('#news-container').hide();
	$('#newsDetail').simpledialog2({
		mode: 'blank',
		headerText: '<span class="english">Weather forecast</span>',
		//headerClose: true,
		fullScreen: true,
		fullScreenForce: true,
		blankContent : content	
			
	});
	$("#carouselPage").hide();
	$(document).delegate('#backbut', 'click', function() {
		$("#carouselPage").show();  
	});
	
});

function popup(u){var str=u.toString();return MD5(str);}


function refresh() {	
	var weather=0;
	$("#weather-container").hide();
	$("#weather-label").hide();
	categoryText = window.localStorage.getItem("category");
	$('#ulWeather').html('');
	if(categoryText==null || categoryText=='')categoryText=",1,3,4,";
	var h1=popup(h);
	var start=0;
	var end=50;
	$('#news-container').html('');
	
	categoryStored=0;
	categoryLoaded=0;
	news_category_ids=[];
	for(c in category){
		if(categoryText.indexOf(","+category[c].news_category_id+",") != -1){
			news_category_ids.push({id:category[c].news_category_id,name:category[c].name});	
			
		}
	}
	categoryStored=news_category_ids.length;
	for(c in news_category_ids){
		var news_category_id=news_category_ids[c].id;
		if(news_category_id!=99){
			var news_category_name=news_category_ids[c].name;		
			refreshNews(start,end,h1,news_category_id,news_category_name);						
		}
		
	}
	if(categoryText.indexOf(",99,") != -1){
			var weather=1;
			$("#weather-container").show();
			$("#weather-label").show();
			refreshWeather();
			//categoryStored++;
		}
	if(categoryStored==0)$.mobile.sdCurrentDialog.close();
	$('#news-container').show();
	return true;
};
function refreshNews(start,end,h1,categoryid,news_category_name){
	LanguageText = window.localStorage.getItem("language");
	if (LanguageText==null)
		LanguageText=',0,';
	if(LanguageText.indexOf(",1,") != -1)
		englishOnly=0;
	else
		englishOnly=1;
	
	if(dataNews==null || dataNews[categoryid]==null){
		
		$.ajax({
			url: src,dataType: "jsonp",
			data: {end:end,start:start,h:h1,request:'grid',c:categoryid,eng:englishOnly },
			success: function(data) {
				if(data.news==null) return false;
				dataNews[categoryid]=data.news;
				createCarousel(categoryid,news_category_name);		
			},
			error: function(data) {$.mobile.sdCurrentDialog.close();$('#ul-'+categoryid).append('<div class="cell" id="maintitle"><p>Error</p></div>');}
		});
	}
	else
		createCarousel(categoryid,news_category_name);
}
function refreshWeather() {$.ajax({url: srcWeather,dataType: "jsonp",data: {summary:1 },success: function(data) {dataWeather=data;for(city in data.weather){
				for (row in data.weather[city]){
					var headline=data.weather[city][row].day;var condition=data.weather[city][row].condition;var image_url=data.weather[city][row].icon;
					if(data.weather[city][row].temp_c){
						var summary=data.city[city]+"<br>"+data.weather[city][row].temp_c+"&deg;C / "+data.weather[city][row].temp_f+"&deg;F";
						$('#ulWeather').append('<li id='+city+' class="touchcarousel-item"><a  href="javascript:;"><img src="'+image_url+'" width="60" height="60" /><div class="rblock"><h4 style="font-family:arial">'+summary+'</h4></div></a></li>');
					}}}
			carouselInstance = $("#weather").touchCarousel({itemsPerMove: 1,pagingNav: false,scrollbar: false,scrollToLast: false,loopItems: true,directionNav:false
					//,autoplay:true					
				}).data('touchCarousel');
			categoryLoaded++;
			
			if(categoryLoaded>=categoryStored )$.mobile.sdCurrentDialog.close();
		},
		error: function(data) {$.mobile.sdCurrentDialog.close();$('#ulNews').append('<div class="cell " id="maintitle"><p>Error</p></div>');}});};


function showSummary(dataRow){
	var fontFamily='class="'+dataRow.font+'"';
	var content=	"<a rel='close' class='closeBut' id='backbut' data-role='button' href='#' data-mini='true' data-icon='back'>Back</a>"
			+'<ul data-role="listview" id="listview"><li '+fontFamily+'> '+
					'<h4>'+dataRow.headline+'</h4>';
	if(dataRow.image_url!='' && dataRow.image_url!==null) content+='<img class="imageItem" style="float:left;" src="'+dataRow.image_url+'" width="100px" />';
	content+='<p >'+dataRow.summary+'</p>'+
					'<p>('+dataRow.source_name+')</p>'+
			'</li></ul>'
			+"<a target=_blank data-role='button' id='"+dataRow.news_id+"' href='"+dataRow.body_url+"' data-icon='forward'>Read more</a>"
			+ "<a rel='close' class='closeBut' id='backbut' data-role='button' href='#' data-mini='true' data-icon='back'>Back</a>";
	$('#newsDetail').html(content);
	$("#carouselPage").hide();
	$(".header_footer").hide();
	$(document).delegate('#backbut', 'click', function() {
		$("#carouselPage").show();
	});
	$(document).delegate('#'+dataRow.news_id, 'click', function() {
			$.ajax({
				url: srcStat,dataType: "jsonp",
				data: {news_id:row},
				success: function(data) {					
				},
				error: function(data) {			
				}
			});
	});
	$('#news-container').hide();
	$('#newsDetail').simpledialog2({
		mode: 'blank',
		headerText: '<span '+fontFamily+'>'+dataRow.headline+'</span>',
		//headerClose: true,
		fullScreen: true,
		fullScreenForce: true,
		blankContent : content				
	});
	//$('#footer').html("<span class='ui-title' /><a target=_blank id='"+dataRow.news_id+"' href='"+dataRow.body_url+"' data-icon='forward'>Read more</a><a rel='close' class='closeBut' href='#' data-mini='true' data-icon='back'>Back</a>");
	//$('#footer').show();
}
function createCarousel(categoryid,news_category_name){
	
	var html='<div id="label-'+categoryid+'">'+news_category_name+'</div>'+
	'<div class="carousel-container" id="container-'+categoryid+'">'+
		'<div id="carousel-'+categoryid+'" class="carousel-image-text-horizontal touchcarousel three-d">'+
			'<ul id="ul-'+categoryid+'" class="news touchcarousel-container"></ul>'+
		'</div>'+
	'</div>';
	$('#news-container').append(html);
	var data=dataNews[categoryid];
	all_news_id=0;
	var count=data.length;
	if (count>3) 
		var autoPlay=false;
	else 
		var autoPlay=false;
	for(row in data){
		var news_id=data[row].news_id;
		var headline=data[row].headline;
		var image_url=data[row].image_url;
		var source_id=data[row].source_id;
		var fontFamily='class="'+data[row].font+'"';
		var textClass='rblockimg';
		if(image_url=='null' || image_url==''){image_url='img/noimage.jpg';textClass='rblock';}
		$('#ul-'+categoryid).append('<li id='+categoryid+'_'+all_news_id+' class="news touchcarousel-item"><img src="'+
		image_url+'" width="60" height="60" /><div class="'+textClass+'"><h4><span '+fontFamily+'>'+headline+'</span></h4></div></a></li>');
		all_news_id++;
	}			
	var carouselInstance = $("#carousel-"+categoryid).touchCarousel({			
			itemsPerMove: 1, pagingNav: false, scrollbar: false, scrollToLast: false, loopItems: true,
			directionNav:false, autoplayStopAtAction:false, snapToItems: true, autoplay:autoPlay
		}).data('touchCarousel');
	categoryLoaded++;
	if(categoryLoaded>=categoryStored )$.mobile.sdCurrentDialog.close();
}

function getCategory(){	categoryText = window.localStorage.getItem("category");if(categoryText==null || categoryText=='')categoryText=",1,3,4,";$.ajax({url: src,dataType: "jsonp",data: {request:'category'},success: function(data) {category=data.category;h=data.h;refresh();},error: function(data) {$.mobile.sdCurrentDialog.close();$('#ulNews').append('<div class="cell" id="maintitle"><p>Error</p></div>');}});}

/*
 * RoyalSlider  v8.1
 *
 * Copyright 2011-2012, Dmitry Semenov
 * 
 */
(function($){function RoyalSlider(f,g){this.slider=$(f);this._az="";this._by="";this._cx="";var h=this;this.settings=$.extend({},$.fn.royalSlider.defaults,g);this.isSlideshowRunning=false;this._dw=false;this._ev=this.slider.find(".royalSlidesContainer");this._fu=this._ev.wrap('<div class="royalWrapper"/>').parent();this.slides=this._ev.find(".royalSlide");this._gt="<p class='royalPreloader'></p>";this._hs=false;this._ir=false;if("ontouchstart"in window){if(!this.settings.disableTranslate3d){if(('WebKitCSSMatrix'in window&&'m11'in new WebKitCSSMatrix())){this._ev.css({"-webkit-transform-origin":"0 0","-webkit-transform":"translateZ(0)"});this._ir=true}}this.hasTouch=true;this._az="touchstart.rs";this._by="touchmove.rs";this._cx="touchend.rs"}else{this.hasTouch=false;if(this.settings.dragUsingMouse){this._az="mousedown.rs";this._by="mousemove.rs";this._cx="mouseup.rs"}else{this._ev.addClass('auto-cursor')}}if(this.hasTouch){this.settings.directionNavAutoHide=false;this.settings.hideArrowOnLastSlide=true}if($.browser.msie&&parseInt($.browser.version,10)<=8){this._jq=true}else{this._jq=false}this.slidesArr=[];var i,jqSlide,dataSRC,slideImg;this.slides.each(function(){jqSlide=$(this);i={};i.slide=jqSlide;if(h.settings.blockLinksOnDrag){if(!this.hasTouch){jqSlide.find('a').bind('click.rs',function(e){if(h._hs){e.preventDefault();return false}})}else{var c=jqSlide.find('a');var d;c.each(function(){d=$(this);d.data('royalhref',d.attr('href'));d.data('royaltarget',d.attr('target'));d.attr('href','#');d.bind('click',function(e){e.preventDefault();if(h._hs){return false}else{var a=$(this).data('royalhref');var b=$(this).data('royaltarget');if(!b||b.toLowerCase()==='_kp'){window.location.href=a}else{window.open(a)}}})})}}if(h.settings.nonDraggableClassEnabled){jqSlide.find('.non-draggable').bind(h._az,function(e){h._hs=false;e.stopImmediatePropagation()})}dataSRC=jqSlide.attr("data-src");if(dataSRC==undefined||dataSRC==""||dataSRC=="none"){i.preload=false}else{i.preload=true;i.preloadURL=dataSRC}if(h.settings.captionAnimationEnabled){i.caption=jqSlide.find(".royalCaption").css("display","none")}h.slidesArr.push(i)});this._lo=false;if(this.settings.removeCaptionsOpacityInIE8){if($.browser.msie&&parseInt($.browser.version,10)<=8){this._lo=true}}if(this.settings.autoScaleSlider){this.sliderScaleRatio=this.settings.autoScaleSliderHeight/this.settings.autoScaleSliderWidth}this.slider.css("overflow","visible");this.slideWidth=0;this.slideshowTimer='';this.mn=false;this.numSlides=this.slides.length;this.currentSlideId=this.settings.startSlideIndex;this.lastSlideId=-1;this.isAnimating=true;this.wasSlideshowPlaying=false;this._az1=0;this._by1=0;this._cx1=false;this._dw1=[];this._ev1=[];this._fu1=false;this._gt1=false;this._hs1=0;this._ir1=0;this._jq1=0;this._kp1=0;this._lo1=0;this._mn1=0;this._az2=false;this._by2=false;if(this.settings.slideTransitionType==="fade"){if(this._ir||('WebKitCSSMatrix'in window&&'m11'in new WebKitCSSMatrix())){this._cx2=true}else{this._cx2=false}this._dw2=$("<div class='fade-container'></div>").appendTo(this._fu)}if(this.settings.slideshowEnabled&&this.settings.slideshowDelay>0){if(!this.hasTouch&&this.settings.slideshowPauseOnHover){this.slider.hover(function(){h._by2=true;h._ev2(true)},function(){h._by2=false;h._fu2(true)})}this.slideshowEnabled=true}else{this.slideshowEnabled=false}this._gt2();if(this.settings.controlNavEnabled){var j;this._hs2Container='';var k;if(!h.settings.controlNavThumbs){this._hs2Container=$('<div class="royalControlNavOverflow"><div class="royalControlNavContainer"><div class="royalControlNavCenterer"></div></div></div>');j=this._hs2Container.find('.royalControlNavCenterer')}else{this.slider.addClass('with-thumbs');if(h.settings.controlNavThumbsNavigation){k=$('<div class="thumbsAndArrowsContainer"></div>');this.thumbsArrowLeft=$("<a href='#' class='thumbsArrow left'></a>");this.thumbsArrowRight=$("<a href='#' class='thumbsArrow right'></a>");k.append(this.thumbsArrowLeft);k.append(this.thumbsArrowRight);var l=parseInt(this.thumbsArrowLeft.outerWidth(),10);this._hs2Container=$('<div class="royalControlNavOverflow royalThumbs"><div class="royalControlNavThumbsContainer"></div></div>');j=this._hs2Container.find('.royalControlNavThumbsContainer')}else{this._hs2Container=$('<div class="royalControlNavOverflow royalThumbs"><div class="royalControlNavContainer"><div class="royalControlNavCenterer"></div></div></div>');j=this._hs2Container.find(".royalControlNavCenterer")}}var m=0;this.slides.each(function(a){if(h.settings.controlNavThumbs){j.append('<a href="#" class="royalThumb" style="background-image:url('+$(this).attr("data-thumb")+')">'+(a+1)+'</a>')}else{j.append('<a href="#">'+(a+1)+'</a>')}m++});this.navItems=j.children();if(k){k.append(this._hs2Container);this._fu.after(k)}else{this._fu.after(this._hs2Container)}if(h.settings.controlNavThumbs&&h.settings.controlNavThumbsNavigation){this._kp2=true;this._lo2=false;this._mn2=j;if(this._ir){this._mn2.css({'-webkit-transition-duration':this.settings.controlNavThumbsSpeed+"ms",'-webkit-transition-property':'-webkit-transform','-webkit-transition-timing-function':"ease-in-out"})}this._az3=m;var n=this.navItems.eq(0);this._by3=n.outerWidth(true);this._cx3=this._by3*this._az3;this._mn2.css("width",this._cx3);this._dw3=parseInt(n.css("marginRight"),10);this._cx3-=this._dw3;this._ev3=0;this._fu3();this.thumbsArrowLeft.click(function(e){e.preventDefault();if(!h._kp2){h._gt3(h._ev3+h._hs3+h._dw3)}});this.thumbsArrowRight.click(function(e){e.preventDefault();if(!h._lo2){h._gt3(h._ev3-h._hs3-h._dw3)}})}this._ir3()}if(this.settings.directionNavEnabled){this._fu.after("<a href='#' class='arrow left'/>");this._fu.after("<a href='#' class='arrow right'/>");this.arrowLeft=this.slider.find("a.arrow.left");this.arrowRight=this.slider.find("a.arrow.right");if(this.arrowLeft.length<1||this.arrowRight.length<1){this.settings.directionNavEnabled=false}else if(this.settings.directionNavAutoHide){this.arrowLeft.hide();this.arrowRight.hide();this.slider.one("mousemove.arrowshover",function(){h.arrowLeft.fadeIn("fast");h.arrowRight.fadeIn("fast")});this.slider.hover(function(){h.arrowLeft.fadeIn("fast");h.arrowRight.fadeIn("fast")},function(){h.arrowLeft.fadeOut("fast");h.arrowRight.fadeOut("fast")})}this._jq3()}this.sliderWidth=0;this.sliderHeight=0;var o;this._kp3='onorientationchange'in window?'orientationchange.royalslider':'resize.royalslider';$(window).bind(this._kp3,function(){if(o){clearTimeout(o)}o=setTimeout(function(){h.updateSliderSize()},100)});this.updateSliderSize();this.settings.beforeLoadStart.call(this);var p=this.slidesArr[this.currentSlideId];if(this.currentSlideId!=0){if(!this._ir){this._ev.css({'left':-this.currentSlideId*this.slideWidth})}else{this._ev.css({'-webkit-transition-duration':'0','-webkit-transition-property':'none'});this._ev.css({'-webkit-transform':'translate3d('+ -this.currentSlideId*this.slideWidth+'px, 0, 0)'})}}if(this.settings.welcomeScreenEnabled){function hideWelcomeScreen(a){h.settings.loadingComplete.call(h);if(a&&h.settings.preloadNearbyImages){h._lo3(h.currentSlideId)}h.slider.find('.royalLoadingScreen').fadeOut(h.settings.welcomeScreenShowSpeed);setTimeout(function(){h._mn3()},h.settings.welcomeScreenShowSpeed+100)}if(p.preload){this._lo3(this.currentSlideId,function(){hideWelcomeScreen(false)})}else{slideImg=p.slide.find('img.royalImage')[0];if(slideImg){if(this._az4(slideImg)){hideWelcomeScreen(true);$(slideImg).css('opacity',0);$(slideImg).animate({"opacity":1},"fast")}else{$(slideImg).css('opacity',0);$('<img />').load(function(){hideWelcomeScreen(true);$(slideImg).animate({"opacity":1},"fast")}).attr('src',slideImg.src)}}else{hideWelcomeScreen(true)}}}else{if(p.preload){this._by4(p,function(){h.settings.loadingComplete.call(h);if(h.settings.preloadNearbyImages){h._lo3(h.currentSlideId)}})}else{slideImg=p.slide.find('img.royalImage')[0];if(slideImg){if(this._az4(slideImg)){$(slideImg).css('opacity',0).animate({"opacity":1},"fast")}else{$(slideImg).css('opacity',0);$('<img />').load(function(){$(slideImg).animate({"opacity":1},"fast")}).attr('src',slideImg.src)}}this.settings.loadingComplete.call(this)}setTimeout(function(){h._mn3()},100)}}RoyalSlider.prototype={goTo:function(a,b,c,d,f){if(!this.isAnimating){this.isAnimating=true;var g=this;this.lastSlideId=this.currentSlideId;this.currentSlideId=a;this._gt1=true;this._fu1=true;if(this.lastSlideId!=a){this._ir3(c);this._lo3(a)}this._jq3();this.settings.beforeSlideChange.call(this);if(this.slideshowEnabled&&this.slideshowTimer){this.wasSlideshowPlaying=true;this._ev2()}var h=!b?this.settings.slideTransitionSpeed:0;if(d||b||this.settings.slideTransitionType==="move"){var i;if(f>0){h=f}else{i=this.settings.slideTransitionEasing}if(!this._ir){if(parseInt(this._ev.css("left"),10)!==-this.currentSlideId*this.slideWidth){this._ev.animate({left:-this.currentSlideId*this.slideWidth},h,(f>0?"easeOutSine":this.settings.slideTransitionEasing),function(){g._cx4()})}else{this._cx4()}}else{if(this._dw4()!==-this.currentSlideId*this.slideWidth){this._ev.bind("webkitTransitionEnd.rs",function(e){if(e.target==g._ev.get(0)){g._ev.unbind("webkitTransitionEnd.rs");g._cx4()}});this._ev.css({'-webkit-transition-duration':h+"ms",'-webkit-transition-property':'-webkit-transform','-webkit-transition-timing-function':(f>0?"ease-out":"ease-in-out"),'-webkit-transform':'translate3d('+ -this.currentSlideId*this.slideWidth+'px, 0, 0)'})}else{this._cx4()}}}else{var j=this.slidesArr[this.lastSlideId].slide;var k=j.clone().appendTo(this._dw2);if(!this._cx2){this._ev.css({left:-this.currentSlideId*this.slideWidth});k.animate({opacity:0},h,this.settings.slideTransitionEasing,function(){k.remove();g._cx4()})}else{if(!this._ir){this._ev.css({left:-this.currentSlideId*this.slideWidth})}else{this._ev.css({'-webkit-transition-duration':'0','-webkit-transform':'translate3d('+ -this.currentSlideId*this.slideWidth+'px, 0, 0)','opacity':'1'})}setTimeout(function(){k.bind("webkitTransitionEnd.rs",function(e){if(e.target==k.get(0)){k.unbind("webkitTransitionEnd.rs");k.remove();g._cx4()}});k.css({'-webkit-transition-duration':h+"ms",'-webkit-transition-property':'opacity','-webkit-transition-timing-function':"ease-in-out"});k.css('opacity',0)},100)}}}},goToSilent:function(a){this.goTo(a,true)},prev:function(){if(this.currentSlideId<=0){this.goTo(this.numSlides-1)}else{this._ev4()}},next:function(){if(this.currentSlideId>=this.numSlides-1){this.goTo(0)}else{this._fu4()}},updateSliderSize:function(){var a=this;var b;var c;if(this.settings.autoScaleSlider){b=this.slider.width();if(b!=this.sliderWidth){this.slider.css("height",b*this.sliderScaleRatio)}}b=this.slider.width();c=this.slider.height();if(b!=this.sliderWidth||c!=this.sliderHeight){this.sliderWidth=b;this.sliderHeight=c;this.slideWidth=this.sliderWidth+this.settings.slideSpacing;var d=this.slidesArr.length;var e,_hs4;for(var i=0,len=d;i<len;++i){e=this.slidesArr[i];_hs4=e.slide.find("img.royalImage").eq(0);if(_hs4&&e.preload==false){this._ir4(_hs4,this.sliderWidth,this.sliderHeight)}if(this.settings.slideSpacing>0&&i<d-1){e.slide.css("cssText","margin-right:"+this.settings.slideSpacing+"px !important;")}e.slide.css({height:a.sliderHeight,width:a.sliderWidth})}if(!this._ir){this._ev.css({"left":-this.currentSlideId*this.slideWidth,width:this.slideWidth*this.numSlides})}else{if(!this._gt1){this._ev.css({'-webkit-transition-duration':'0','-webkit-transition-property':'none'});this._ev.css({'-webkit-transform':'translate3d('+ -this.currentSlideId*this.slideWidth+'px, 0, 0)',width:this.slideWidth*this.numSlides})}}if(this.settings.controlNavThumbs&&this.settings.controlNavThumbsNavigation){this._fu3()}}},stopSlideshow:function(){this._ev2();this.slideshowEnabled=false;this.wasSlideshowPlaying=false},resumeSlideshow:function(){this.slideshowEnabled=true;if(!this.wasSlideshowPlaying){this._fu2()}},destroy:function(){this._ev2();this._ev.unbind(this._az);$(document).unbind(this._by).unbind(this._cx);$(window).unbind(this._kp3);if(this.settings.keyboardNavEnabled){$(document).unbind("keydown.rs")}this.slider.remove();delete this.slider},_lo3:function(a,b){if(this.settings.preloadNearbyImages){var c=this;this._by4(this.slidesArr[a],function(){if(b){b.call()}c._by4(c.slidesArr[a+1],function(){c._by4(c.slidesArr[a-1])})})}else{this._by4(this.slidesArr[a],b)}},_ir3:function(a){if(this.settings.controlNavEnabled){this.navItems.eq(this.lastSlideId).removeClass('current');this.navItems.eq(this.currentSlideId).addClass("current");if(this.settings.controlNavThumbs&&this.settings.controlNavThumbsNavigation){var b=this.navItems.eq(this.currentSlideId).position().left;var c=b-Math.abs(this._ev3);if(c>this._hs3-this._by3*2-1-this._dw3){if(!a){this._gt3(-b+this._by3)}else{this._gt3(-b-this._by3*2+this._hs3+this._dw3)}}else if(c<this._by3*2-1){if(!a){this._gt3(-b-this._by3*2+this._hs3+this._dw3)}else{this._gt3(-b+this._by3)}}}}},_jq3:function(){if(this.settings.directionNavEnabled){if(this.settings.hideArrowOnLastSlide){if(this.currentSlideId==0){this._lo4=true;this.arrowLeft.addClass("disabled");if(this._mn4){this._mn4=false;this.arrowRight.removeClass("disabled")}}else if(this.currentSlideId==this.numSlides-1){this._mn4=true;this.arrowRight.addClass("disabled");if(this._lo4){this._lo4=false;this.arrowLeft.removeClass("disabled")}}else{if(this._lo4){this._lo4=false;this.arrowLeft.removeClass("disabled")}else if(this._mn4){this._mn4=false;this.arrowRight.removeClass("disabled")}}}}},_fu2:function(a){if(this.slideshowEnabled){var b=this;if(!this.slideshowTimer){this.slideshowTimer=setInterval(function(){b.next()},this.settings.slideshowDelay)}}},_ev2:function(a){if(this.slideshowTimer){clearInterval(this.slideshowTimer);this.slideshowTimer=''}},_by4:function(a,b){if(a){if(a.preload){var c=this;var d=new Image();var e=$(d);e.css("opacity",0);e.addClass("royalImage");a.slide.prepend(e);a.slide.prepend(this._gt);a.preload=false;e.load(function(){c._ir4(e,c.sliderWidth,c.sliderHeight);e.animate({"opacity":1},300,function(){a.slide.find(".royalPreloader").remove()});if(b){b.call()}}).attr('src',a.preloadURL)}else{if(b){b.call()}}}else{if(b){b.call()}}},_fu3:function(){this._hs3=parseInt(this._hs2Container.width(),10);this._az5=-(this._cx3-this._hs3);if(this._hs3>=this._cx3){this._lo2=true;this._kp2=true;this.thumbsArrowRight.addClass("disabled");this.thumbsArrowLeft.addClass("disabled");this._cx1=true;this._by5(0)}else{this._cx1=false;var a=this.navItems.eq(this.currentSlideId).position().left;this._gt3(-a+this._by3)}},_gt3:function(a){if(!this._cx1&&a!=this._ev3){if(a<=this._az5){a=this._az5;this._kp2=false;this._lo2=true;this.thumbsArrowRight.addClass("disabled");this.thumbsArrowLeft.removeClass("disabled")}else if(a>=0){a=0;this._kp2=true;this._lo2=false;this.thumbsArrowLeft.addClass("disabled");this.thumbsArrowRight.removeClass("disabled")}else{if(this._kp2){this._kp2=false;this.thumbsArrowLeft.removeClass("disabled")}if(this._lo2){this._lo2=false;this.thumbsArrowRight.removeClass("disabled")}}this._by5(a);this._ev3=a}},_by5:function(a){if(!this._ir){this._mn2.animate({left:a},this.settings.controlNavThumbsSpeed,this.settings.controlNavThumbsEasing)}else{this._mn2.css({'-webkit-transform':'translate3d('+a+'px, 0, 0)'})}},_mn3:function(){var a=this;this.slider.find(".royalLoadingScreen").remove();if(this.settings.controlNavEnabled){this.navItems.bind("click",function(e){e.preventDefault();if(!a._fu1){a._cx5(e)}})}if(this.settings.directionNavEnabled){this.arrowRight.click(function(e){e.preventDefault();if(!a._mn4&&!a._fu1){a.next()}});this.arrowLeft.click(function(e){e.preventDefault();if(!a._lo4&&!a._fu1){a.prev()}})}if(this.settings.keyboardNavEnabled){$(document).bind("keydown.rs",function(e){if(!a._fu1){if(e.keyCode===37){a.prev()}else if(e.keyCode===39){a.next()}}})}this.wasSlideshowPlaying=true;this._cx4();this._ev.bind(this._az,function(e){if(!a._gt1){a._dw5(e)}else if(!a.hasTouch){e.preventDefault()}});if(this.slideshowEnabled&&!this.settings.slideshowAutoStart){this._ev2()}this.settings.allComplete.call(this)},_gt2:function(){this._ev.removeClass('grabbing-cursor');this._ev.addClass('grab-cursor')},_ev5:function(){this._ev.removeClass('grab-cursor');this._ev.addClass('grabbing-cursor')},_fu4:function(a,b){if(this.currentSlideId<this.numSlides-1){this.goTo(this.currentSlideId+1,false,false,a,b)}else{this.goTo(this.currentSlideId,false,false,a,b)}},_ev4:function(a,b){if(this.currentSlideId>0){this.goTo(this.currentSlideId-1,false,false,a,b)}else{this.goTo(this.currentSlideId,false,false,a,b)}},_cx5:function(e){this.goTo($(e.currentTarget).index(),false,true)},_dw4:function(){var a=window.getComputedStyle(this._ev.get(0),null).getPropertyValue("-webkit-transform");var b=a.replace(/^matrix\(/i,'').split(/, |\)$/g);return parseInt(b[4],10)},_dw5:function(e){if(!this._az2){var a;if(this.hasTouch){this._fu5=false;var b=e.originalEvent.touches;if(b&&b.length>0){a=b[0]}else{return false}}else{a=e;e.preventDefault()}if(this.slideshowEnabled){if(this.slideshowTimer){this.wasSlideshowPlaying=true;this._ev2()}else{this.wasSlideshowPlaying=false}}this._ev5();this._az2=true;var c=this;if(this._ir){c._ev.css({'-webkit-transition-duration':'0','-webkit-transition-property':'none'})}$(document).bind(this._by,function(e){c._gt5(e)});$(document).bind(this._cx,function(e){c._hs5(e)});if(!this._ir){this._mn1=this._jq1=parseInt(this._ev.css("left"),10)}else{this._mn1=this._jq1=this._dw4()}this._hs=false;this._ir1=this._jq1;this._hs1=(e.timeStamp||new Date().getTime());this._kp1=a.clientX;this._lo1=a.clientY}return false},_gt5:function(e){var a;if(this.hasTouch){if(this._fu5){return false}var b=e.originalEvent.touches;if(b.length>1){return false}a=b[0];if(Math.abs(a.clientY-this._lo1)>Math.abs(a.clientX-this._kp1)+3){if(this.settings.lockAxis){this._fu5=true}return false}e.preventDefault()}else{a=e;e.preventDefault()}this._by1=this._az1;var c=a.clientX-this._kp1;if(this._by1!=c){this._az1=c}if(c!=0){if(this.currentSlideId==0){if(c>0){c=Math.sqrt(c)*5}}else if(this.currentSlideId==(this.numSlides-1)){if(c<0){c=-Math.sqrt(-c)*5}}if(!this._ir){this._ev.css("left",this._jq1+c)}else{this._ev.css({'-webkit-transform':'translate3d('+(this._jq1+c)+'px, 0, 0)'})}}var d=(e.timeStamp||new Date().getTime());if(d-this._hs1>350){this._hs1=d;this._ir1=this._jq1+c}return false},_hs5:function(e){if(this._az2){var a=this;this._az2=false;this._gt2();if(!this._ir){this.endPos=parseInt(this._ev.css("left"),10)}else{this.endPos=this._dw4()}this.isdrag=false;$(document).unbind(this._by).unbind(this._cx);if(this.slideshowEnabled){if(this.wasSlideshowPlaying){if(!this._by2){this._fu2()}this.wasSlideshowPlaying=false}}if(this.endPos==this._mn1){this._hs=false;return}else{this._hs=true}var b=(this._ir1-this.endPos);var c=Math.max(40,(e.timeStamp||new Date().getTime())-this._hs1);var d=Math.abs(b)/c;var f=this.slideWidth-Math.abs(this._mn1-this.endPos);var g=Math.max((f*1.08)/d,200);g=Math.min(g,600);function returnToCurrent(){f=Math.abs(a._mn1-a.endPos);g=Math.max((f*1.08)/d,200);g=Math.min(g,500);a.goTo(a.currentSlideId,false,false,true,g)}if(this._mn1-this.settings.minSlideOffset>this.endPos){if(this._by1<this._az1){returnToCurrent();return false}this._fu4(true,g)}else if(this._mn1+this.settings.minSlideOffset<this.endPos){if(this._by1>this._az1){returnToCurrent();return false}this._ev4(true,g)}else{returnToCurrent()}}return false},_cx4:function(){var a=this;if(this.slideshowEnabled){if(this.wasSlideshowPlaying){if(!this._by2){this._fu2()}this.wasSlideshowPlaying=false}}this._fu1=false;this._gt1=false;if(this.settings.captionAnimationEnabled&&this.lastSlideId!=this.currentSlideId){if(this.lastSlideId!=-1){this.slidesArr[this.lastSlideId].caption.css("display","none")}a._ir5(a.currentSlideId)}this.isAnimating=false;this.settings.afterSlideChange.call(this)},_ir5:function(h){var j=this.slidesArr[h].caption;if(j&&j.length>0){j.css("display","block");var l=this;var m,fadeEnabled,moveEnabled,effectName,effectsObject,moveEffectProperty,currEffects,newEffectObj,moveOffset,delay,speed,easing,moveProp;var n=j.children();if(this._dw1.length>0){for(var a=this._dw1.length-1;a>-1;a--){clearTimeout(this._dw1.splice(a,1))}}if(this._ev1.length>0){var o;for(var k=this._ev1.length-1;k>-1;k--){o=this._ev1[k];if(o){if(!this._ir){if(o.running){o.captionItem.stop(true,true)}else{o.captionItem.css(o.css)}}}this._ev1.splice(k,1)}}for(var i=0;i<n.length;i++){m=$(n[i]);effectsObject={};fadeEnabled=false;moveEnabled=false;moveEffectProperty="";if(m.attr("data-show-effect")==undefined){currEffects=this.settings.captionShowEffects}else{currEffects=m.attr("data-show-effect").split(" ")}for(var q=0;q<currEffects.length;q++){if(fadeEnabled&&moveEnabled){break}effectName=currEffects[q].toLowerCase();if(!fadeEnabled&&effectName=="fade"){fadeEnabled=true;effectsObject['opacity']=1}else if(moveEnabled){break}else if(effectName=="movetop"){moveEffectProperty="margin-top"}else if(effectName=="moveleft"){moveEffectProperty="margin-left"}else if(effectName=="movebottom"){moveEffectProperty="margin-bottom"}else if(effectName=="moveright"){moveEffectProperty="margin-right"}if(moveEffectProperty!=""){effectsObject['moveProp']=moveEffectProperty;if(!l._ir){effectsObject['moveStartPos']=parseInt(m.css(moveEffectProperty),10)}else{effectsObject['moveStartPos']=0}moveEnabled=true}}moveOffset=parseInt(m.attr("data-move-offset"),10);if(isNaN(moveOffset)){moveOffset=this.settings.captionMoveOffset}delay=parseInt(m.attr("data-delay"),10);if(isNaN(delay)){delay=l.settings.captionShowDelay*i}speed=parseInt(m.attr("data-speed"),10);if(isNaN(speed)){speed=l.settings.captionShowSpeed}easing=m.attr("data-easing");if(!easing){easing=l.settings.captionShowEasing}newEffectObj={};if(moveEnabled){moveProp=effectsObject.moveProp;if(moveProp=="margin-right"){moveProp="margin-left";newEffectObj[moveProp]=effectsObject.moveStartPos+moveOffset}else if(moveProp=="margin-bottom"){moveProp="margin-top";newEffectObj[moveProp]=effectsObject.moveStartPos+moveOffset}else{newEffectObj[moveProp]=effectsObject.moveStartPos-moveOffset}}if(!l._lo&&fadeEnabled){m.css("opacity",0)}if(!l._ir){m.css("visibility","hidden");m.css(newEffectObj);if(moveEnabled){newEffectObj[moveProp]=effectsObject.moveStartPos}if(!l._lo&&fadeEnabled){newEffectObj.opacity=1}}else{var p={};if(moveEnabled){p['-webkit-transition-duration']="0";p['-webkit-transition-property']="none";p["-webkit-transform"]="translate3d("+(isNaN(newEffectObj["margin-left"])?0:(newEffectObj["margin-left"]+"px"))+", "+(isNaN(newEffectObj["margin-top"])?0:(newEffectObj["margin-top"]+"px"))+",0)";delete newEffectObj["margin-left"];delete newEffectObj["margin-top"];newEffectObj["-webkit-transform"]="translate3d(0,0,0)"}newEffectObj.visibility="visible";newEffectObj.opacity=1;if(!l._lo&&fadeEnabled){p["opacity"]=0}p["visibility"]="hidden";m.css(p)}this._ev1.push({captionItem:m,css:newEffectObj,running:false});this._dw1.push(setTimeout((function(a,b,c,d,e,f,g){return function(){l._ev1[e].running=true;if(!l._ir){a.css("visibility","visible").animate(b,c,d,function(){if(l._jq&&f){a.get(0).style.removeAttribute('filter')}delete l._ev1[e]})}else{a.css({'-webkit-transition-duration':(c+"ms"),'-webkit-transition-property':'opacity'+(g?', -webkit-transform':''),'-webkit-transition-timing-function':'ease-out'});a.css(b)}}})(m,newEffectObj,speed,easing,i,fadeEnabled,moveEnabled),delay))}}},_ir4:function(f,g,h){var i=this.settings.imageScaleMode;var j=this.settings.imageAlignCenter;if(j||i=="fill"||i=="fit"){var k=false;function scaleImg(){var d,vRatio,ratio,nWidth,nHeight;var e=new Image();e.onload=function(){var a=this.width;var b=this.height;var c=parseInt(f.css("borderWidth"),10);c=isNaN(c)?0:c;if(i=="fill"||i=="fit"){d=g/a;vRatio=h/b;if(i=="fill"){ratio=d>vRatio?d:vRatio}else if(i=="fit"){ratio=d<vRatio?d:vRatio}else{ratio=1}nWidth=parseInt(a*ratio,10)-c;nHeight=parseInt(b*ratio,10)-c;f.attr({"width":nWidth,"height":nHeight}).css({"width":nWidth,"height":nHeight})}else{nWidth=a-c;nHeight=b-c;f.attr("width",nWidth).attr("height",nHeight)}if(j){f.css({"margin-left":Math.floor((g-nWidth)/2),"margin-top":Math.floor((h-nHeight)/2)})}};e.src=f.attr("src")};f.removeAttr('height').removeAttr('width');if(!this._az4(f.get(0))){$('<img />').load(function(){scaleImg()}).attr('src',f.attr("src"))}else{scaleImg()}}},_az4:function(a){if(a){if(!a.complete){return false}if(typeof a.naturalWidth!="undefined"&&a.naturalWidth==0){return false}}else{return false}return true}};$.fn.royalSlider=function(b){return this.each(function(){var a=new RoyalSlider($(this),b);$(this).data("royalSlider",a)})};$.fn.royalSlider.defaults={lockAxis:true,preloadNearbyImages:true,imageScaleMode:"none",imageAlignCenter:false,keyboardNavEnabled:false,directionNavEnabled:true,directionNavAutoHide:false,hideArrowOnLastSlide:true,slideTransitionType:"move",slideTransitionSpeed:400,slideTransitionEasing:"easeInOutSine",captionAnimationEnabled:true,captionShowEffects:["fade","moveleft"],captionMoveOffset:20,captionShowSpeed:400,captionShowEasing:"easeOutCubic",captionShowDelay:200,controlNavEnabled:true,controlNavThumbs:false,controlNavThumbsNavigation:true,controlNavThumbsSpeed:400,controlNavThumbsEasing:"easeInOutSine",slideshowEnabled:false,slideshowDelay:5000,slideshowPauseOnHover:true,slideshowAutoStart:true,welcomeScreenEnabled:false,welcomeScreenShowSpeed:500,minSlideOffset:20,disableTranslate3d:false,removeCaptionsOpacityInIE8:false,startSlideIndex:0,slideSpacing:0,blockLinksOnDrag:true,nonDraggableClassEnabled:true,dragUsingMouse:true,autoScaleSlider:false,autoScaleSliderWidth:960,autoScaleSliderHeight:400,beforeSlideChange:function(){},afterSlideChange:function(){},beforeLoadStart:function(){},loadingComplete:function(){},allComplete:function(){}};$.fn.royalSlider.settings={}})(jQuery);

/**
*
*  MD5 (Message-Digest Algorithm)
*  http://www.webtoolkit.info/
*
**/

var MD5 = function (string) {

	function RotateLeft(lValue, iShiftBits) {
		return (lValue<<iShiftBits) | (lValue>>>(32-iShiftBits));
	}

	function AddUnsigned(lX,lY) {
		var lX4,lY4,lX8,lY8,lResult;
		lX8 = (lX & 0x80000000);
		lY8 = (lY & 0x80000000);
		lX4 = (lX & 0x40000000);
		lY4 = (lY & 0x40000000);
		lResult = (lX & 0x3FFFFFFF)+(lY & 0x3FFFFFFF);
		if (lX4 & lY4) {
			return (lResult ^ 0x80000000 ^ lX8 ^ lY8);
		}
		if (lX4 | lY4) {
			if (lResult & 0x40000000) {
				return (lResult ^ 0xC0000000 ^ lX8 ^ lY8);
			} else {
				return (lResult ^ 0x40000000 ^ lX8 ^ lY8);
			}
		} else {
			return (lResult ^ lX8 ^ lY8);
		}
 	}

 	function F(x,y,z) { return (x & y) | ((~x) & z); }
 	function G(x,y,z) { return (x & z) | (y & (~z)); }
 	function H(x,y,z) { return (x ^ y ^ z); }
	function I(x,y,z) { return (y ^ (x | (~z))); }

	function FF(a,b,c,d,x,s,ac) {
		a = AddUnsigned(a, AddUnsigned(AddUnsigned(F(b, c, d), x), ac));
		return AddUnsigned(RotateLeft(a, s), b);
	};

	function GG(a,b,c,d,x,s,ac) {
		a = AddUnsigned(a, AddUnsigned(AddUnsigned(G(b, c, d), x), ac));
		return AddUnsigned(RotateLeft(a, s), b);
	};

	function HH(a,b,c,d,x,s,ac) {
		a = AddUnsigned(a, AddUnsigned(AddUnsigned(H(b, c, d), x), ac));
		return AddUnsigned(RotateLeft(a, s), b);
	};

	function II(a,b,c,d,x,s,ac) {
		a = AddUnsigned(a, AddUnsigned(AddUnsigned(I(b, c, d), x), ac));
		return AddUnsigned(RotateLeft(a, s), b);
	};

	function ConvertToWordArray(string) {
		var lWordCount;
		var lMessageLength = string.length;
		var lNumberOfWords_temp1=lMessageLength + 8;
		var lNumberOfWords_temp2=(lNumberOfWords_temp1-(lNumberOfWords_temp1 % 64))/64;
		var lNumberOfWords = (lNumberOfWords_temp2+1)*16;
		var lWordArray=Array(lNumberOfWords-1);
		var lBytePosition = 0;
		var lByteCount = 0;
		while ( lByteCount < lMessageLength ) {
			lWordCount = (lByteCount-(lByteCount % 4))/4;
			lBytePosition = (lByteCount % 4)*8;
			lWordArray[lWordCount] = (lWordArray[lWordCount] | (string.charCodeAt(lByteCount)<<lBytePosition));
			lByteCount++;
		}
		lWordCount = (lByteCount-(lByteCount % 4))/4;
		lBytePosition = (lByteCount % 4)*8;
		lWordArray[lWordCount] = lWordArray[lWordCount] | (0x80<<lBytePosition);
		lWordArray[lNumberOfWords-2] = lMessageLength<<3;
		lWordArray[lNumberOfWords-1] = lMessageLength>>>29;
		return lWordArray;
	};

	function WordToHex(lValue) {
		var WordToHexValue="",WordToHexValue_temp="",lByte,lCount;
		for (lCount = 0;lCount<=3;lCount++) {
			lByte = (lValue>>>(lCount*8)) & 255;
			WordToHexValue_temp = "0" + lByte.toString(16);
			WordToHexValue = WordToHexValue + WordToHexValue_temp.substr(WordToHexValue_temp.length-2,2);
		}
		return WordToHexValue;
	};

	function Utf8Encode(string) {
		
string = string.replace(/\r\n/g,"\n");
		var utftext = "";

		for (var n = 0; n < string.length; n++) {

			var c = string.charCodeAt(n);

			if (c < 128) {
				utftext += String.fromCharCode(c);
			}
			else if((c > 127) && (c < 2048)) {
				utftext += String.fromCharCode((c >> 6) | 192);
				utftext += String.fromCharCode((c & 63) | 128);
			}
			else {
				utftext += String.fromCharCode((c >> 12) | 224);
				utftext += String.fromCharCode(((c >> 6) & 63) | 128);
				utftext += String.fromCharCode((c & 63) | 128);
			}

		}

		return utftext;
	};

	var x=Array();
	var k,AA,BB,CC,DD,a,b,c,d;
	var S11=7, S12=12, S13=17, S14=22;
	var S21=5, S22=9 , S23=14, S24=20;
	var S31=4, S32=11, S33=16, S34=23;
	var S41=6, S42=10, S43=15, S44=21;

	string = Utf8Encode(string);

	x = ConvertToWordArray(string);

	a = 0x67452301; b = 0xEFCDAB89; c = 0x98BADCFE; d = 0x10325476;

	for (k=0;k<x.length;k+=16) {
		AA=a; BB=b; CC=c; DD=d;
		a=FF(a,b,c,d,x[k+0], S11,0xD76AA478);
		d=FF(d,a,b,c,x[k+1], S12,0xE8C7B756);
		c=FF(c,d,a,b,x[k+2], S13,0x242070DB);
		b=FF(b,c,d,a,x[k+3], S14,0xC1BDCEEE);
		a=FF(a,b,c,d,x[k+4], S11,0xF57C0FAF);
		d=FF(d,a,b,c,x[k+5], S12,0x4787C62A);
		c=FF(c,d,a,b,x[k+6], S13,0xA8304613);
		b=FF(b,c,d,a,x[k+7], S14,0xFD469501);
		a=FF(a,b,c,d,x[k+8], S11,0x698098D8);
		d=FF(d,a,b,c,x[k+9], S12,0x8B44F7AF);
		c=FF(c,d,a,b,x[k+10],S13,0xFFFF5BB1);
		b=FF(b,c,d,a,x[k+11],S14,0x895CD7BE);
		a=FF(a,b,c,d,x[k+12],S11,0x6B901122);
		d=FF(d,a,b,c,x[k+13],S12,0xFD987193);
		c=FF(c,d,a,b,x[k+14],S13,0xA679438E);
		b=FF(b,c,d,a,x[k+15],S14,0x49B40821);
		a=GG(a,b,c,d,x[k+1], S21,0xF61E2562);
		d=GG(d,a,b,c,x[k+6], S22,0xC040B340);
		c=GG(c,d,a,b,x[k+11],S23,0x265E5A51);
		b=GG(b,c,d,a,x[k+0], S24,0xE9B6C7AA);
		a=GG(a,b,c,d,x[k+5], S21,0xD62F105D);
		d=GG(d,a,b,c,x[k+10],S22,0x2441453);
		c=GG(c,d,a,b,x[k+15],S23,0xD8A1E681);
		b=GG(b,c,d,a,x[k+4], S24,0xE7D3FBC8);
		a=GG(a,b,c,d,x[k+9], S21,0x21E1CDE6);
		d=GG(d,a,b,c,x[k+14],S22,0xC33707D6);
		c=GG(c,d,a,b,x[k+3], S23,0xF4D50D87);
		b=GG(b,c,d,a,x[k+8], S24,0x455A14ED);
		a=GG(a,b,c,d,x[k+13],S21,0xA9E3E905);
		d=GG(d,a,b,c,x[k+2], S22,0xFCEFA3F8);
		c=GG(c,d,a,b,x[k+7], S23,0x676F02D9);
		b=GG(b,c,d,a,x[k+12],S24,0x8D2A4C8A);
		a=HH(a,b,c,d,x[k+5], S31,0xFFFA3942);
		d=HH(d,a,b,c,x[k+8], S32,0x8771F681);
		c=HH(c,d,a,b,x[k+11],S33,0x6D9D6122);
		b=HH(b,c,d,a,x[k+14],S34,0xFDE5380C);
		a=HH(a,b,c,d,x[k+1], S31,0xA4BEEA44);
		d=HH(d,a,b,c,x[k+4], S32,0x4BDECFA9);
		c=HH(c,d,a,b,x[k+7], S33,0xF6BB4B60);
		b=HH(b,c,d,a,x[k+10],S34,0xBEBFBC70);
		a=HH(a,b,c,d,x[k+13],S31,0x289B7EC6);
		d=HH(d,a,b,c,x[k+0], S32,0xEAA127FA);
		c=HH(c,d,a,b,x[k+3], S33,0xD4EF3085);
		b=HH(b,c,d,a,x[k+6], S34,0x4881D05);
		a=HH(a,b,c,d,x[k+9], S31,0xD9D4D039);
		d=HH(d,a,b,c,x[k+12],S32,0xE6DB99E5);
		c=HH(c,d,a,b,x[k+15],S33,0x1FA27CF8);
		b=HH(b,c,d,a,x[k+2], S34,0xC4AC5665);
		a=II(a,b,c,d,x[k+0], S41,0xF4292244);
		d=II(d,a,b,c,x[k+7], S42,0x432AFF97);
		c=II(c,d,a,b,x[k+14],S43,0xAB9423A7);
		b=II(b,c,d,a,x[k+5], S44,0xFC93A039);
		a=II(a,b,c,d,x[k+12],S41,0x655B59C3);
		d=II(d,a,b,c,x[k+3], S42,0x8F0CCC92);
		c=II(c,d,a,b,x[k+10],S43,0xFFEFF47D);
		b=II(b,c,d,a,x[k+1], S44,0x85845DD1);
		a=II(a,b,c,d,x[k+8], S41,0x6FA87E4F);
		d=II(d,a,b,c,x[k+15],S42,0xFE2CE6E0);
		c=II(c,d,a,b,x[k+6], S43,0xA3014314);
		b=II(b,c,d,a,x[k+13],S44,0x4E0811A1);
		a=II(a,b,c,d,x[k+4], S41,0xF7537E82);
		d=II(d,a,b,c,x[k+11],S42,0xBD3AF235);
		c=II(c,d,a,b,x[k+2], S43,0x2AD7D2BB);
		b=II(b,c,d,a,x[k+9], S44,0xEB86D391);
		a=AddUnsigned(a,AA);
		b=AddUnsigned(b,BB);
		c=AddUnsigned(c,CC);
		d=AddUnsigned(d,DD);
	}

	var temp = WordToHex(a)+WordToHex(b)+WordToHex(c)+WordToHex(d);

	return temp.toLowerCase();
}

