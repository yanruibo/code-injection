







	$(function(){
	$('#container,#container2,#c3,#c4,#c5').panelGallery({
    	boxSize:50,	boxFadeDuration:1000, boxTransitionDuration:70,	pauseOnHover:false,
    	FX: new Array('boxSouthWest','boxSouthEast')
	});
	});
	


  var _gaq = _gaq || [];
  _gaq.push(['_setAccount', 'UA-26590990-1']);
  _gaq.push(['_trackPageview']);

  (function() {
    var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
    ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
    var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
  })();



// JavaScript Document

slideNum = 0;
var audioPlayer = new Audio(),
	loadCocktail = '',
	percentage = 0,
	_shakeTimer = null;

$('#intro').live('pagecreate', function(){
	if (!Modernizr.hasEvent('devicemotion', window)){
		$('#intro .message').css('display', 'block');
	}
});
$('#gal').live('pagecreate', function(){

	$('.slider-inner', this).slideCarousel({
		duration:500,
		btn_prev:'.btn-prev',
		btn_next:'.btn-next'
	});
	$('#gal-link, .slider-inner a', this).click(function(){
		if (audioPlayer.loaded) audioPlayer.pause();
		loadCocktail = $('.slider-inner a').eq(slideNum).attr('rel');
	});
});


/*
Modernizr.load({
	test: Modernizr.geolocation,
	yep : 'geo.js',
	nope: 'geo-polyfill.js'
});
*/

// JavaScript Document

function mostrar() {
   $("#pop").fadeIn('slow');
} //checkHover

$(document).ready(function (){
   //Conseguir valores de la img
   var img_w = $("#pop img").width() + 10;
   var img_h = $("#pop img").height() + 28;
   
   //Darle el alto y ancho
   $("#pop").css('width', img_w + 'px');
   $("#pop").css('height', img_h + 'px');
   
   //Esconder el popup
   $("#pop").hide();
   
   //Consigue valores de la ventana del navegador
   var w = $(this).width();
   var h = $(this).height();
   
   //Centra el popup   
   w = (w/2) - (img_w/2);
   h = (h/2) - (img_h/2);
   $("#pop").css("left",w + "px");
   $("#pop").css("top",h + "px");

   //temporizador, para que no aparezca de golpe
   setTimeout("mostrar()",500);
   
   //Función para cerrar el popup
   $("#pop").click(function (){
      $(this).fadeOut('slow');
   });
   
});

// JavaScript Document

(function($){
	$.fn.slideCarousel = function(options){
		var options = jQuery.extend({
			duration : 500,
			current_slide : 0,
			counter_slide : false,
			structure_counter_parent : "<div class='slider-counter'></div>",
			structure_counter_el : "<span></span>",
			counter_slide_number : false,
			btn_next : false,
			btn_prev : false,
			slide_switch : false,
			slide_timer : 10000
		}, options);
		
		return this.each(function() {

			var elem = this;
			var slides = $(elem).children();
			var slide_last = slides.length - 1;
			var img_list = $(elem).find('img');
			var current_slide = options.current_slide;
			var current_slide_counter = options.current_slide;
			var width_elem;
			var permit_next = true;
			var css_transitions = false;
			var css_transform = false;
			var _timer;
			var transit_timer;
			var agent = null;
			var orient_change = true;
			var link_counter;
			
			$(elem).closest("*[data-role='page']").bind('pageshow',setup);
			
			$(window).bind('resize orientationchange', function(){
				if (!permit_next) {
					orient_change = false;
					return;
				}
				size_change();
			});
			
			function size_change(){
				size_slider();
				fix_slider();
				return false;
			}
			
			if (css_supports('transition')) {
				css_transitions = true;
				var agent_low = agent.replace(/^[a-zA-Z]/, function(value) {
					return value.toLowerCase();
				});
				slides.bind(agent_low+'TransitionEnd transitionend',TransitionEnd);
			}
			
			if (css_supports('transform')) {
				if (agent == 'Webkit') {
					var nav_version = navigator.appVersion;
					if (nav_version.indexOf('BlackBerry') ==-1 || nav_version.indexOf('Version/7') ==-1){
						css_transform = true;
						slides.css(agent+'Transform','translate3d(0px,0px,0px)');					
					}
				}
			}

			function css_supports(css_prop) {
				var div = document.createElement('div'),
					vendors = 'Khtml Ms O Moz Webkit'.split(' '),
					len = vendors.length;	
				if ( css_prop in div.style ) return true;
				css_prop = css_prop.replace(/^[a-z]/, function(val) {
					return val.toUpperCase();
				});
				while(len--) {
					if ( vendors[len] + css_prop in div.style ) {
						agent = vendors[len];
						return true;
					}
				}
				return false;
			}
			
			function setup(){
				if (agent == 'Webkit') {
					if (img_list.length>0) img();
				}
				loadEnd();
			}
			
			function img(){
				var call_back = 0;
				var error_back = 0;
				img_list.each(function(){
					$(this).bind('error', function(){
						error_back++;
						img_event(call_back+error_back);
					});
					$(this).bind('load', function(){
						call_back++;
						img_event(call_back+error_back);
					});
				});
			}
			
			function img_event(event_back){
				if (event_back == img_list.length) {
					loadEnd();
				}
			}
			
			function loadEnd(){
				addClass();
				size_slider();
				fix_slider();
			};
			
			function addClass() {
				var i = 0;
				slides.each(function(){
					$(this).addClass('slide-item-'+i);
					i++;
				})
			}
			
			function size_slider() {
				var height = 0;
				offTransition();
				width_elem = $(elem).width();
				slides.css('width', width_elem);
				slides.each(function(){
					if( $(this).outerHeight()>height ) height = $(this).outerHeight();
				});
				$(elem).css('height', height);
			}
			
			function fix_slider() {
				offTransition();
				if (css_transform){
					slides.not('.slide-item-'+current_slide).css(agent+'Transform','translate3d'+'('+width_elem+'px,0,0)');
					slides.filter('.slide-item-'+current_slide).css(agent+'Transform','translate3d(0,0,0)');
					return;
				}
				slides.not('.slide-item-'+current_slide).css('left',width_elem);
				slides.filter('.slide-item-'+current_slide).css('left',0);
			}
			
			if (options.counter_slide) {
				$(elem).after(options.structure_counter_parent);
				link_counter = $(elem).next();
				slides.each(function(){
					link_counter.append(options.structure_counter_el);
				});
				if (options.counter_slide_number) {
					var i = 1;
					link_counter.find("*:empty").each(function(){
						$(this).text(i);
						i++;
					})
				}
				addCheck();
			}
			
			function slideCounter() {
				link_counter.children().removeClass('current');
				link_counter.children().eq(current_slide).addClass('current');
			}
			
			function addCheck() {
				slideNum = current_slide;
				if (options.counter_slide) slideCounter();
				if (options.slide_switch) onTimer();
			}
			
			function onTimer(){
				_timer = setTimeout(function(){
					slideNext();
				}, options.slide_timer)
			}
			
			function offTransition(){
				if (css_transitions) {	
					slides.css('transition-property','none')
					.css(agent+'TransitionProperty','none');
				}
			}
			
			function TransitionEnd(){
				if (!orient_change){
					size_change();
					orient_change = true;
				} 
				permit_next = true;
			}
			
			$(elem).bind('swipeleft', slideNext);
			if (options.btn_next) {
				$(options.btn_next).bind('tap', slideNext);
			};
			
			$(elem).bind('swiperight', slidePrev);
			if (options.btn_prev) {
				$(options.btn_prev).bind('tap', slidePrev);
			};
			
			function preparation_next(){
				var current_slide_;
				offTransition();
				if (current_slide>slide_last) {current_slide_ = 0}
				else {current_slide_ = current_slide}
				if (css_transform){
					slides.filter('.slide-item-'+current_slide_).css(agent+'Transform','translate3d'+'('+width_elem+'px,0,0)');
					return;
				}
				slides.filter('.slide-item-'+current_slide_).css('left',width_elem);
			}
			
			function preparation_prev(){
				var current_slide_;
				offTransition();
				if (current_slide<0) {current_slide_ = slide_last}
				else {current_slide_ = current_slide}
				if (css_transform){
					slides.filter('.slide-item-'+current_slide_).css(agent+'Transform','translate3d'+'('+(-width_elem)+'px,0,0)');
					return;
				}
				slides.filter('.slide-item-'+current_slide_).css('left',-width_elem);
			}
			
			function slideNext(event){
				if (event) event.preventDefault();
				if (!permit_next) return;
				if (options.slide_switch) clearTimeout(_timer);
				current_slide++;
				preparation_next();
				slideToggle('next');
			}
			
			function slidePrev(event){
				if (event) event.preventDefault();
				if (!permit_next) return;
				if (options.slide_switch) clearTimeout(_timer);
				current_slide--;
				preparation_prev();
				slideToggle('prev');
			}
			
			function slideToggle(direct){
				if (css_transitions) {
					if (transit_timer) return; 
					transit_timer = setTimeout(function(){
						slides.css('transition','all '+options.duration+'ms')
						.css(agent+'Transition','all '+options.duration+'ms');
						setTimeout(function(){
							if (direct == 'next'){
								if (css_transform){
									slides.filter('.slide-item-'+(current_slide-1)).css(agent+'Transform','translate3d'+'('+(-width_elem)+'px,0,0)');
									if (current_slide>slide_last) current_slide = 0;
									slides.filter('.slide-item-'+current_slide).css(agent+'Transform','translate3d(0,0,0)');
								}
								else {
									slides.filter('.slide-item-'+(current_slide-1)).css('left',-width_elem);
									if (current_slide>slide_last) current_slide = 0;
									slides.filter('.slide-item-'+current_slide).css('left',0);
								}
							}
							else if (direct == 'prev'){
								if (css_transform){
									slides.filter('.slide-item-'+(current_slide+1)).css(agent+'Transform','translate3d'+'('+width_elem+'px,0,0)');
									if (current_slide<0) current_slide = slide_last;
									slides.filter('.slide-item-'+current_slide).css(agent+'Transform','translate3d(0,0,0)');
								}
								else {
									slides.filter('.slide-item-'+(current_slide+1)).css('left',width_elem);
									if (current_slide<0) current_slide = slide_last;
									slides.filter('.slide-item-'+current_slide).css('left',0);
								}
							}
							addCheck();
							transit_timer = false;
						},1);
					},20);
				}
				else {
					if (direct == 'next'){
						slides.filter('.slide-item-'+(current_slide-1)).animate({left:-width_elem}, options.duration);
						if (current_slide>slide_last) current_slide = 0;
						slides.filter('.slide-item-'+current_slide).animate({left:0}, options.duration, TransitionEnd);
					}
					else if (direct == 'prev'){
						slides.filter('.slide-item-'+(current_slide+1)).animate({left:width_elem}, options.duration);
						if (current_slide<0) current_slide = slide_last;
						slides.filter('.slide-item-'+current_slide).animate({left:0}, options.duration, TransitionEnd);
					}
					addCheck();
				}
				if (options.duration>1) permit_next = false;
			}		
		});
	};
})(jQuery);
