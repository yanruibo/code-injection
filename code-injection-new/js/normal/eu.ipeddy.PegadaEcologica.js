










	jQuery(document).ready(function() {
		var query = window.location.href;
		var vars = query.split("=");
		var pontuacao=vars[1];
		
		if(typeof pontuacao!= 'undefined'){
			if(pontuacao.indexOf('#')!=-1)
			{
				var aPontuacao=pontuacao.split("#");
				pontuacao=aPontuacao[0];
			}
			
		}
		else{
			pontuacao=0;
		}
		
		jQuery("#inputPontuacao").val(pontuacao);
		localStorage.setItem('pontuacao', jQuery("#inputPontuacao").val());
		jQuery("#aPontuacao").append(pontuacao+'   ');
		if(parseInt(pontuacao)<150){
			/*jQuery('#classificacao').css("color","#5B8C2A");  
			jQuery('.MBcor').css("color","#5B8C2A");
			jQuery('.MBcor').css("backgroundColor","#FFF");
			jQuery('#MBsmile').css("backgroundColor","#FFF");
			jQuery('#MBsmile').append(jQuery('<img>', { 
				src : "assets/Uploads/38/MBsmile.png", 
				
				alt : "pontuacao"+pontuacao, 
				title : "pontuacao"+pontuacao
			}));
			jQuery('#aPontuacao').append(jQuery('<img>', { 
				src : "assets/Uploads/38/MBsmile.png", 
				
				alt : "pontuacao"+pontuacao, 
				title : "pontuacao"+pontuacao
			}));*/
			jQuery('#aTerra').append(jQuery('<img>', { 
				src : "assets/Uploads/38/doisplanetas.png", 
				alt : "terra"+pontuacao, 
				title : "terra"+pontuacao
			}));
			jQuery('#aMinhaPegada').append(" é menor do que 4ha");
			jQuery('#forMinhaPegada').append(" fosse menor do que 4ha");
			
			var calculo=parseFloat(4/1.8).toFixed(2);
			jQuery('#quantasTerras').append(" até " + calculo );
		}
		else{
			jQuery('#MBsmile').append(jQuery('<img>', { 
				src : "assets/Uploads/38/MBsmileGrey.png", 
				
				alt : "pontuacao"+pontuacao, 
				title : "pontuacao"+pontuacao
			}));
		}
		if((parseInt(pontuacao)>=150)&&(parseInt(pontuacao)<400)){
			/*jQuery('#classificacao').css("color","#A4BF41"); 
			jQuery('.Bcor').css("color","#A4BF41");
			jQuery('.Bcor').css("backgroundColor","#FFF");
			jQuery('#Bsmile').css("backgroundColor","#FFF");
		  jQuery('#Bsmile').append(jQuery('<img>', { 
				src : "assets/Uploads/38/Bsmile.png", 
				 
				alt : "pontuacao"+pontuacao, 
				title : "pontuacao"+pontuacao
			}));
			
			jQuery('#aPontuacao').append(jQuery('<img>', { 
				src : "assets/Uploads/38/Bsmile.png", 
				
				alt : "pontuacao"+pontuacao, 
				title : "pontuacao"+pontuacao
			}));*/
			jQuery('#aTerra').append(jQuery('<img>', { 
				src : "assets/Uploads/38/tresplanetas.png", 
				
				alt : "terra"+pontuacao, 
				title : "terra"+pontuacao
			}));
			jQuery('#aMinhaPegada').append(" encontra-se entre 4 e 6ha");
			jQuery('#forMinhaPegada').append(" fosse entre 4 e 6ha");
			var calculoZero=parseFloat(4/1.8).toFixed(2);
			var calculoUm=parseFloat(6/1.8).toFixed(2);
			jQuery('#quantasTerras').append(" entre " + calculoZero + " e " + calculoUm );
			}
		else{
			  jQuery('#Bsmile').append(jQuery('<img>', { 
				src : "assets/Uploads/38/BsmileGrey.png", 
				
				alt : "pontuacao"+pontuacao, 
				title : "pontuacao"+pontuacao
			}));
		}
		if((parseInt(pontuacao)>=400)&&(parseInt(pontuacao)<600)){
			/*jQuery('#classificacao').css("color","#f2a605"); 
			jQuery('.SMcor').css("color","#f2a605");
			jQuery('.SMcor').css("backgroundColor","#FFF");
			jQuery('#SMsmile').css("backgroundColor","#FFF");
			jQuery('#SMsmile').append(jQuery('<img>', { 
				src : "assets/Uploads/38/SMsmile.png", 
				
				alt : "pontuacao"+pontuacao, 
				title : "pontuacao"+pontuacao
			}));
			
			jQuery('#aPontuacao').append(jQuery('<img>', { 
				src : "assets/Uploads/38/SMsmile.png", 
				
				alt : "pontuacao"+pontuacao, 
				title : "pontuacao"+pontuacao
			}));*/
			jQuery('#aTerra').append(jQuery('<img>', { 
				src : "assets/Uploads/38/quatroplanetas.png", 
				
				alt : "terra"+pontuacao, 
				title : "terra"+pontuacao
			}));
			jQuery('#aMinhaPegada').append(" encontra-se entre 6 e 8ha");
			jQuery('#forMinhaPegada').append(" fosse entre 6 e 8ha");
			var calculoZero=parseFloat(6/1.8).toFixed(2);
			var calculoUm=parseFloat(8/1.8).toFixed(2);
			jQuery('#quantasTerras').append(" entre " + calculoZero + " e " + calculoUm );
		}
		else{
			jQuery('#SMsmile').append(jQuery('<img>', { 
				src : "assets/Uploads/38/SMsmileGrey.png", 
				
				alt : "pontuacao"+pontuacao, 
				title : "pontuacao"+pontuacao
			}));
		}
		
		if((parseInt(pontuacao)>=600)&&(parseInt(pontuacao)<800)){
			/*jQuery('#classificacao').css("color","#F27405"); 
			jQuery('.Scor').css("color","#F27405");
			jQuery('.Scor').css("backgroundColor","#FFF");
			jQuery('#Ssmile').css("backgroundColor","#FFF");
			jQuery('#Ssmile').append(jQuery('<img>', { 
				src : "assets/Uploads/38/Ssmile.png", 
				
				alt : "pontuacao"+pontuacao, 
				title : "pontuacao"+pontuacao
			}));
			
			jQuery('#aPontuacao').append(jQuery('<img>', { 
				src : "assets/Uploads/38/Ssmile.png", 
				
				alt : "pontuacao"+pontuacao, 
				title : "pontuacao"+pontuacao
			}));*/
			jQuery('#aTerra').append(jQuery('<img>', { 
				src : "assets/Uploads/38/cincoplanetas.png", 
				
				alt : "terra"+pontuacao, 
				title : "terra"+pontuacao
			}));
			jQuery('#aMinhaPegada').append(" encontra-se entre 8 e 10ha");
			jQuery('#forMinhaPegada').append(" fosse entre 8 e 10ha");
			var calculoZero=parseFloat(8/1.8).toFixed(2);
			var calculoUm=parseFloat(10/1.8).toFixed(2);
			jQuery('#quantasTerras').append(" entre " + calculoZero + " e " + calculoUm );
		}	
		else{
			jQuery('#Ssmile').append(jQuery('<img>', { 
				src : "assets/Uploads/38/SsmileGrey.png", 
				
				alt : "pontuacao"+pontuacao, 
				title : "pontuacao"+pontuacao
			}));
			
			
		}
		if((parseInt(pontuacao)>800)){
			/*jQuery('#classificacao').css("color","#990000"); 
			jQuery('.Icor').css("color","#990000");
			jQuery('.Icor').css("backgroundColor","#FFF");
			jQuery('#Ismile').css("backgroundColor","#FFF");
			jQuery('#Ismile').append(jQuery('<img>', { 
				src : "assets/Uploads/38/Ismile.png", 
			
				alt : "pontuacao"+pontuacao, 
				title : "pontuacao"+pontuacao
			}));
			
			jQuery('#aPontuacao').append(jQuery('<img>', { 
				src : "assets/Uploads/38/Ismile.png", 
				
				alt : "pontuacao"+pontuacao, 
				title : "pontuacao"+pontuacao
			}));*/
			jQuery('#aTerra').append(jQuery('<img>', { 
				src : "assets/Uploads/38/seisplanetas.png", 
				
				alt : "terra"+pontuacao, 
				title : "terra"+pontuacao
			}));
			jQuery('#aMinhaPegada').append(" é maior do que 10ha");
			jQuery('#forMinhaPegada').append(" fosse maior do que 10ha");
			var calculos=parseFloat(10/1.8).toFixed(2);
			jQuery('#quantasTerras').append(" mais do que " + calculos);
		}
		else{
				jQuery('#Ismile').append(jQuery('<img>', { 
				src : "assets/Uploads/38/IsmileGrey.png", 
			
				alt : "pontuacao"+pontuacao, 
				title : "pontuacao"+pontuacao
			}));
		}
		
	});
	








var isTouchSupported = 'ontouchstart' in window;
var startEvent = isTouchSupported ? 'touchstart' : 'mousedown';
var moveEvent = isTouchSupported ? 'touchmove' : 'mousemove';
var endEvent = isTouchSupported ? 'touchend' : 'mouseup';

jQuery(".labelRadio").bind(startEvent,function(){},false);
jQuery("#acoes").bind(startEvent,function(){},false);

	
















function setIdioma(idioma){
		localStorage.setItem('idioma', idioma);
		location.reload();
	}

	
	



















	
	jQuery(document).ready(function() {
	
		var query = window.location.href;
		var vars = query.split("=");
		var pontuacao=vars[1];
		
		if(typeof pontuacao!= 'undefined'){
			if(pontuacao.indexOf('#')!=-1)
			{
				var aPontuacao=pontuacao.split("#");
				pontuacao=aPontuacao[0];
			}
			
		}
		else{
			pontuacao=0;
		}
		jQuery("#aPontuacao").append(pontuacao+'   ');
		jQuery("#inputPontuacao").val(pontuacao);
		localStorage.setItem('pontuacao', jQuery("#inputPontuacao").val());
		if(parseInt(pontuacao)<150){
			/*jQuery('#classificacao').css("color","#5B8C2A");  
			jQuery('.MBcor').css("color","#5B8C2A");
			jQuery('.MBcor').css("backgroundColor","#FFF");
			jQuery('#MBsmile').css("backgroundColor","#FFF");
			jQuery('#MBsmile').append(jQuery('<img>', { 
				src : "assets/Uploads/38/MBsmile.png", 
				
				alt : "pontuacao"+pontuacao, 
				title : "pontuacao"+pontuacao
			}));
			jQuery('#aPontuacao').append(jQuery('<img>', { 
				src : "assets/Uploads/38/MBsmile.png", 
				
				alt : "pontuacao"+pontuacao, 
				title : "pontuacao"+pontuacao
			}));*/
			jQuery('#aTerra').append(jQuery('<img>', { 
				src : "assets/Uploads/38/doisplanetas.png", 
				alt : "terra"+pontuacao, 
				title : "terra"+pontuacao
			}));
			jQuery('#aMinhaPegada').append(" is less than 4ha");
			jQuery('#forMinhaPegada').append(" was lower than 4ha");
			
			var calculo=parseFloat(4/1.8).toFixed(2);
			jQuery('#quantasTerras').append("about " + calculo );
		}
		else{
			jQuery('#MBsmile').append(jQuery('<img>', { 
				src : "assets/Uploads/38/MBsmileGrey.png", 
				
				alt : "pontuacao"+pontuacao, 
				title : "pontuacao"+pontuacao
			}));
		}
		if((parseInt(pontuacao)>=150)&&(parseInt(pontuacao)<400)){
			/*jQuery('#classificacao').css("color","#A4BF41"); 
			jQuery('.Bcor').css("color","#A4BF41");
			jQuery('.Bcor').css("backgroundColor","#FFF");
			jQuery('#Bsmile').css("backgroundColor","#FFF");
		  jQuery('#Bsmile').append(jQuery('<img>', { 
				src : "assets/Uploads/38/Bsmile.png", 
				 
				alt : "pontuacao"+pontuacao, 
				title : "pontuacao"+pontuacao
			}));
			
			jQuery('#aPontuacao').append(jQuery('<img>', { 
				src : "assets/Uploads/38/Bsmile.png", 
				
				alt : "pontuacao"+pontuacao, 
				title : "pontuacao"+pontuacao
			}));*/
			jQuery('#aTerra').append(jQuery('<img>', { 
				src : "assets/Uploads/38/tresplanetas.png", 
				alt : "terra"+pontuacao, 
				title : "terra"+pontuacao
			}));
			jQuery('#aMinhaPegada').append(" is  between 4 and 6ha");
			jQuery('#forMinhaPegada').append(" between 4 and 6ha");
			var calculoZero=parseFloat(4/1.8).toFixed(2);
			var calculoUm=parseFloat(6/1.8).toFixed(2);
			jQuery('#quantasTerras').append(" between " + calculoZero + " and " + calculoUm );
			}
		else{
			  jQuery('#Bsmile').append(jQuery('<img>', { 
				src : "assets/Uploads/38/BsmileGrey.png", 
				
				alt : "pontuacao"+pontuacao, 
				title : "pontuacao"+pontuacao
			}));
		}
		if((parseInt(pontuacao)>=400)&&(parseInt(pontuacao)<600)){
			/*jQuery('#classificacao').css("color","#f2a605"); 
			jQuery('.SMcor').css("color","#f2a605");
			jQuery('.SMcor').css("backgroundColor","#FFF");
			jQuery('#SMsmile').css("backgroundColor","#FFF");
			jQuery('#SMsmile').append(jQuery('<img>', { 
				src : "assets/Uploads/38/SMsmile.png", 
				
				alt : "pontuacao"+pontuacao, 
				title : "pontuacao"+pontuacao
			}));
			
			jQuery('#aPontuacao').append(jQuery('<img>', { 
				src : "assets/Uploads/38/SMsmile.png", 
				
				alt : "pontuacao"+pontuacao, 
				title : "pontuacao"+pontuacao
			}));*/
			jQuery('#aTerra').append(jQuery('<img>', { 
				src : "assets/Uploads/38/quatroplanetas.png", 
				alt : "terra"+pontuacao, 
				title : "terra"+pontuacao
			}));
			jQuery('#aMinhaPegada').append(" is between 6 and 8ha");
			jQuery('#forMinhaPegada').append(" between 6 and 8ha");
			var calculoZero=parseFloat(6/1.8).toFixed(2);
			var calculoUm=parseFloat(8/1.8).toFixed(2);
			jQuery('#quantasTerras').append(" between " + calculoZero + " and " + calculoUm );
		}
		else{
			jQuery('#SMsmile').append(jQuery('<img>', { 
				src : "assets/Uploads/38/SMsmileGrey.png", 
				
				alt : "pontuacao"+pontuacao, 
				title : "pontuacao"+pontuacao
			}));
		}
		
		if((parseInt(pontuacao)>=600)&&(parseInt(pontuacao)<800)){
			/*jQuery('#classificacao').css("color","#F27405"); 
			jQuery('.Scor').css("color","#F27405");
			jQuery('.Scor').css("backgroundColor","#FFF");
			jQuery('#Ssmile').css("backgroundColor","#FFF");
			jQuery('#Ssmile').append(jQuery('<img>', { 
				src : "assets/Uploads/38/Ssmile.png", 
				
				alt : "pontuacao"+pontuacao, 
				title : "pontuacao"+pontuacao
			}));
			
			jQuery('#aPontuacao').append(jQuery('<img>', { 
				src : "assets/Uploads/38/Ssmile.png", 
				
				alt : "pontuacao"+pontuacao, 
				title : "pontuacao"+pontuacao
			}));*/
			jQuery('#aTerra').append(jQuery('<img>', { 
				src : "assets/Uploads/38/cincoplanetas.png", 
				alt : "terra"+pontuacao, 
				title : "terra"+pontuacao
			}));
			jQuery('#aMinhaPegada').append(" is betwwen 8 and 10ha");
			jQuery('#forMinhaPegada').append(" between  8 and 10ha");
			var calculoZero=parseFloat(8/1.8).toFixed(2);
			var calculoUm=parseFloat(10/1.8).toFixed(2);
			jQuery('#quantasTerras').append(" between " + calculoZero + " and " + calculoUm );
		}	
		else{
			jQuery('#Ssmile').append(jQuery('<img>', { 
				src : "assets/Uploads/38/SsmileGrey.png", 
				
				alt : "pontuacao"+pontuacao, 
				title : "pontuacao"+pontuacao
			}));
			
			
		}
		if((parseInt(pontuacao)>800)){
			/*jQuery('#classificacao').css("color","#990000"); 
			jQuery('.Icor').css("color","#990000");
			jQuery('.Icor').css("backgroundColor","#FFF");
			jQuery('#Ismile').css("backgroundColor","#FFF");
			jQuery('#Ismile').append(jQuery('<img>', { 
				src : "assets/Uploads/38/Ismile.png", 
			
				alt : "pontuacao"+pontuacao, 
				title : "pontuacao"+pontuacao
			}));
			
			jQuery('#aPontuacao').append(jQuery('<img>', { 
				src : "assets/Uploads/38/Ismile.png", 
				
				alt : "pontuacao"+pontuacao, 
				title : "pontuacao"+pontuacao
			}));*/
			jQuery('#aTerra').append(jQuery('<img>', { 
				src : "assets/Uploads/38/seisplanetas.png", 
				alt : "terra"+pontuacao, 
				title : "terra"+pontuacao
			}));
			jQuery('#aMinhaPegada').append(" is greater than 10ha");
			jQuery('#forMinhaPegada').append(" greater than 10ha");
			var calculos=parseFloat(10/1.8).toFixed(2);
			jQuery('#quantasTerras').append(" more than " + calculos);
		}
		else{
				jQuery('#Ismile').append(jQuery('<img>', { 
				src : "assets/Uploads/38/IsmileGrey.png", 
			
				alt : "pontuacao"+pontuacao, 
				title : "pontuacao"+pontuacao
			}));
		}
		
	});
	





	jQuery(window).load(function() {
		aURL=location.href;
		teste=aURL.substring(location.href.indexOf('=')+1,aURL.length);
		document.getElementById("inner").innerHTML = '<h1>Atingiu '+ teste+' pontos</h1>';
		
	});
	








(function(i){function l(a){null!=e&&(a.dropClass&&e.removeClass(a.dropClass),e=null);null!=c&&a.canDropClass&&c.removeClass(a.canDropClass)}var o={makeClone:!1,sourceClass:null,sourceHide:!1,dragClass:null,canDropClass:null,dropClass:null,isActive:!0,container:null,canDrag:function(a){return a},canDrop:function(a){return a.hasClass("drop")||0<a.parents(".drop").size()},didDrop:function(a,c){a.appendTo(c)}},h=null,c=null,e=null,m,n,j,k={init:function(a){a=i.extend({},o,a);this.data("options",a);this.bind("mousedown.dragdrop touchstart.dragdrop",
k.onStart);return this},destroy:function(){this.unbind("mousedown.dragdrop touchstart.dragdrop");return this},on:function(){this.data("options").isActive=!0},off:function(){this.data("options").isActive=!1},onStart:function(a){var g=i(this),b=g.data("options");if(b.isActive){var f=b.canDrag(g,a);if(f){h=f;var d=h.offset(),e=h.width(),l=h.height();"touchstart"==a.type?(m=a.originalEvent.touches[0].clientX-d.left,n=a.originalEvent.touches[0].clientY-d.top):(m=a.pageX-d.left,n=a.pageY-d.top);b.makeClone?
(c=h.clone(!1),c.appendTo(f.parent()),b.sourceClass?h.addClass(b.sourceClass):b.sourceHide&&h.css("visibility","hidden")):c=h;c.css({position:"absolute",left:d.left,top:d.top,width:e,height:l});b.dragClass&&c.addClass(b.dragClass);if(b=b.container)d=b.offset(),j={minX:d.left,minY:d.top,maxX:d.left+b.outerWidth()-f.outerWidth(),maxY:d.top+b.outerHeight()-f.outerHeight()};i(window).bind("mousemove.dragdrop touchmove.dragdrop",{source:g},k.onMove).bind("mouseup.dragdrop touchend.dragdrop",{source:g},
k.onEnd);a.stopPropagation();return!1}}},onMove:function(a){if(c){var g=a.data.source.data("options"),b,f;"touchmove"==a.type?(b=a.originalEvent.touches[0].clientX,f=a.originalEvent.touches[0].clientY):(b=a.pageX,f=a.pageY);c.css("display","none");var d=document.elementFromPoint(b-document.documentElement.scrollLeft-document.body.scrollLeft,f-document.documentElement.scrollTop-document.body.scrollTop);c.css("display","");b-=m;f-=n;j&&(b=Math.min(Math.max(b,j.minX),j.maxX),f=Math.min(Math.max(f,j.minY),
j.maxY));c.css({left:b,top:f});if(d){if(null==e||e.get(0)!=d)b=i(d),g.canDrop(b)?(g.dropClass&&(null!=e&&e.removeClass(g.dropClass),b.addClass(g.dropClass)),g.canDropClass&&c.addClass(g.canDropClass),e=b):null!=e&&l(g)}else null!=e&&l(g);a.stopPropagation();return!1}},onEnd:function(a){c&&(a=a.data.source.data("options"),e&&a.didDrop(h,e),l(a),a.makeClone?(c.remove(),a.sourceClass?h.removeClass(a.sourceClass):a.sourceHide&&h.css("visibility","visible")):(c.css("position","static"),c.css("width",""),
c.css("height",""),a.dragClass&&c.removeClass(a.dragClass)),i(window).unbind("mousemove.dragdrop touchmove.dragdrop"),i(window).unbind("mouseup.dragdrop touchend.dragdrop"),h=c=j=null)}};i.fn.dragdrop=function(a){if(k[a])return k[a].apply(this,Array.prototype.slice.call(arguments,1));if("object"===typeof a||!a)return k.init.apply(this,arguments);i.error("Method "+a+" does not exist on jQuery.dragdrop")}})(jQuery);


// jquery.event.move
//
// 1.3.1
//
// Stephen Band
//
// Triggers 'movestart', 'move' and 'moveend' events after
// mousemoves following a mousedown cross a distance threshold,
// similar to the native 'dragstart', 'drag' and 'dragend' events.
// Move events are throttled to animation frames. Move event objects
// have the properties:
//
// pageX:
// pageY:   Page coordinates of pointer.
// startX:
// startY:  Page coordinates of pointer at movestart.
// distX:
// distY:  Distance the pointer has moved since movestart.
// deltaX:
// deltaY:  Distance the finger has moved since last event.
// velocityX:
// velocityY:  Average velocity over last few events.


(function (module) {
	if (typeof define === 'function' && define.amd) {
		// AMD. Register as an anonymous module.
		define(['jquery'], module);
	} else {
		// Browser globals
		module(jQuery);
	}
})(function(jQuery, undefined){

	var // Number of pixels a pressed pointer travels before movestart
	    // event is fired.
	    threshold = 6,
	
	    add = jQuery.event.add,
	
	    remove = jQuery.event.remove,

	    // Just sugar, so we can have arguments in the same order as
	    // add and remove.
	    trigger = function(node, type, data) {
	    	jQuery.event.trigger(type, data, node);
	    },

	    // Shim for requestAnimationFrame, falling back to timer. See:
	    // see http://paulirish.com/2011/requestanimationframe-for-smart-animating/
	    requestFrame = (function(){
	    	return (
	    		window.requestAnimationFrame ||
	    		window.webkitRequestAnimationFrame ||
	    		window.mozRequestAnimationFrame ||
	    		window.oRequestAnimationFrame ||
	    		window.msRequestAnimationFrame ||
	    		function(fn, element){
	    			return window.setTimeout(function(){
	    				fn();
	    			}, 25);
	    		}
	    	);
	    })(),
	    
	    ignoreTags = {
	    	textarea: true,
	    	input: true,
	    	select: true,
	    	button: true
	    },
	    
	    mouseevents = {
	    	move: 'mousemove',
	    	cancel: 'mouseup dragstart',
	    	end: 'mouseup'
	    },
	    
	    touchevents = {
	    	move: 'touchmove',
	    	cancel: 'touchend',
	    	end: 'touchend'
	    };


	// Constructors
	
	function Timer(fn){
		var callback = fn,
				active = false,
				running = false;
		
		function trigger(time) {
			if (active){
				callback();
				requestFrame(trigger);
				running = true;
				active = false;
			}
			else {
				running = false;
			}
		}
		
		this.kick = function(fn) {
			active = true;
			if (!running) { trigger(); }
		};
		
		this.end = function(fn) {
			var cb = callback;
			
			if (!fn) { return; }
			
			// If the timer is not running, simply call the end callback.
			if (!running) {
				fn();
			}
			// If the timer is running, and has been kicked lately, then
			// queue up the current callback and the end callback, otherwise
			// just the end callback.
			else {
				callback = active ?
					function(){ cb(); fn(); } : 
					fn ;
				
				active = true;
			}
		};
	}


	// Functions
	
	function returnTrue() {
		return true;
	}
	
	function returnFalse() {
		return false;
	}
	
	function preventDefault(e) {
		e.preventDefault();
	}
	
	function preventIgnoreTags(e) {
		// Don't prevent interaction with form elements.
		if (ignoreTags[ e.target.tagName.toLowerCase() ]) { return; }
		
		e.preventDefault();
	}

	function isLeftButton(e) {
		// Ignore mousedowns on any button other than the left (or primary)
		// mouse button, or when a modifier key is pressed.
		return (e.which === 1 && !e.ctrlKey && !e.altKey);
	}

	function identifiedTouch(touchList, id) {
		var i, l;

		if (touchList.identifiedTouch) {
			return touchList.identifiedTouch(id);
		}
		
		// touchList.identifiedTouch() does not exist in
		// webkit yet… we must do the search ourselves...
		
		i = -1;
		l = touchList.length;
		
		while (++i < l) {
			if (touchList[i].identifier === id) {
				return touchList[i];
			}
		}
	}

	function changedTouch(e, event) {
		var touch = identifiedTouch(e.changedTouches, event.identifier);

		// This isn't the touch you're looking for.
		if (!touch) { return; }

		// Chrome Android (at least) includes touches that have not
		// changed in e.changedTouches. That's a bit annoying. Check
		// that this touch has changed.
		if (touch.pageX === event.pageX && touch.pageY === event.pageY) { return; }

		return touch;
	}


	// Handlers that decide when the first movestart is triggered
	
	function mousedown(e){
		var data;

		if (!isLeftButton(e)) { return; }

		data = {
			target: e.target,
			startX: e.pageX,
			startY: e.pageY,
			timeStamp: e.timeStamp
		};

		add(document, mouseevents.move, mousemove, data);
		add(document, mouseevents.cancel, mouseend, data);
	}

	function mousemove(e){
		var data = e.data;

		checkThreshold(e, data, e, removeMouse);
	}

	function mouseend(e) {
		removeMouse();
	}

	function removeMouse() {
		remove(document, mouseevents.move, mousemove);
		remove(document, mouseevents.cancel, removeMouse);
	}

	function touchstart(e) {
		var touch, template;

		// Don't get in the way of interaction with form elements.
		if (ignoreTags[ e.target.tagName.toLowerCase() ]) { return; }

		touch = e.changedTouches[0];
		
		// iOS live updates the touch objects whereas Android gives us copies.
		// That means we can't trust the touchstart object to stay the same,
		// so we must copy the data. This object acts as a template for
		// movestart, move and moveend event objects.
		template = {
			target: touch.target,
			startX: touch.pageX,
			startY: touch.pageY,
			timeStamp: e.timeStamp,
			identifier: touch.identifier
		};

		// Use the touch identifier as a namespace, so that we can later
		// remove handlers pertaining only to this touch.
		add(document, touchevents.move + '.' + touch.identifier, touchmove, template);
		add(document, touchevents.cancel + '.' + touch.identifier, touchend, template);
	}

	function touchmove(e){
		var data = e.data,
		    touch = changedTouch(e, data);

		if (!touch) { return; }

		checkThreshold(e, data, touch, removeTouch);
	}

	function touchend(e) {
		var template = e.data,
		    touch = identifiedTouch(e.changedTouches, template.identifier);

		if (!touch) { return; }

		removeTouch(template.identifier);
	}

	function removeTouch(identifier) {
		remove(document, '.' + identifier, touchmove);
		remove(document, '.' + identifier, touchend);
	}


	// Logic for deciding when to trigger a movestart.

	function checkThreshold(e, template, touch, fn) {
		var distX = touch.pageX - template.startX,
		    distY = touch.pageY - template.startY;

		// Do nothing if the threshold has not been crossed.
		if ((distX * distX) + (distY * distY) < (threshold * threshold)) { return; }

		triggerStart(e, template, touch, distX, distY, fn);
	}

	function handled() {
		// this._handled should return false once, and after return true.
		this._handled = returnTrue;
		return false;
	}

	function flagAsHandled(e) {
		e._handled();
	}

	function triggerStart(e, template, touch, distX, distY, fn) {
		var node = template.target,
		    touches, time;

		touches = e.targetTouches;
		time = e.timeStamp - template.timeStamp;

		// Create a movestart object with some special properties that
		// are passed only to the movestart handlers.
		template.type = 'movestart';
		template.distX = distX;
		template.distY = distY;
		template.deltaX = distX;
		template.deltaY = distY;
		template.pageX = touch.pageX;
		template.pageY = touch.pageY;
		template.velocityX = distX / time;
		template.velocityY = distY / time;
		template.targetTouches = touches;
		template.finger = touches ?
			touches.length :
			1 ;

		// The _handled method is fired to tell the default movestart
		// handler that one of the move events is bound.
		template._handled = handled;
			
		// Pass the touchmove event so it can be prevented if or when
		// movestart is handled.
		template._preventTouchmoveDefault = function() {
			e.preventDefault();
		};

		// Trigger the movestart event.
		trigger(template.target, template);

		// Unbind handlers that tracked the touch or mouse up till now.
		fn(template.identifier);
	}


	// Handlers that control what happens following a movestart

	function activeMousemove(e) {
		var event = e.data.event,
		    timer = e.data.timer;

		updateEvent(event, e, e.timeStamp, timer);
	}

	function activeMouseend(e) {
		var event = e.data.event,
		    timer = e.data.timer;
		
		removeActiveMouse();

		endEvent(event, timer, function() {
			// Unbind the click suppressor, waiting until after mouseup
			// has been handled.
			setTimeout(function(){
				remove(event.target, 'click', returnFalse);
			}, 0);
		});
	}

	function removeActiveMouse(event) {
		remove(document, mouseevents.move, activeMousemove);
		remove(document, mouseevents.end, activeMouseend);
	}

	function activeTouchmove(e) {
		var event = e.data.event,
		    timer = e.data.timer,
		    touch = changedTouch(e, event);

		if (!touch) { return; }

		// Stop the interface from gesturing
		e.preventDefault();

		event.targetTouches = e.targetTouches;
		updateEvent(event, touch, e.timeStamp, timer);
	}

	function activeTouchend(e) {
		var event = e.data.event,
		    timer = e.data.timer,
		    touch = identifiedTouch(e.changedTouches, event.identifier);

		// This isn't the touch you're looking for.
		if (!touch) { return; }

		removeActiveTouch(event);
		endEvent(event, timer);
	}

	function removeActiveTouch(event) {
		remove(document, '.' + event.identifier, activeTouchmove);
		remove(document, '.' + event.identifier, activeTouchend);
	}


	// Logic for triggering move and moveend events

	function updateEvent(event, touch, timeStamp, timer) {
		var time = timeStamp - event.timeStamp;

		event.type = 'move';
		event.distX =  touch.pageX - event.startX;
		event.distY =  touch.pageY - event.startY;
		event.deltaX = touch.pageX - event.pageX;
		event.deltaY = touch.pageY - event.pageY;
		
		// Average the velocity of the last few events using a decay
		// curve to even out spurious jumps in values.
		event.velocityX = 0.3 * event.velocityX + 0.7 * event.deltaX / time;
		event.velocityY = 0.3 * event.velocityY + 0.7 * event.deltaY / time;
		event.pageX =  touch.pageX;
		event.pageY =  touch.pageY;

		timer.kick();
	}

	function endEvent(event, timer, fn) {
		timer.end(function(){
			event.type = 'moveend';

			trigger(event.target, event);
			
			return fn && fn();
		});
	}


	// jQuery special event definition

	function setup(data, namespaces, eventHandle) {
		// Stop the node from being dragged
		//add(this, 'dragstart.move drag.move', preventDefault);
		
		// Prevent text selection and touch interface scrolling
		//add(this, 'mousedown.move', preventIgnoreTags);
		
		// Tell movestart default handler that we've handled this
		add(this, 'movestart.move', flagAsHandled);

		// Don't bind to the DOM. For speed.
		return true;
	}
	
	function teardown(namespaces) {
		remove(this, 'dragstart drag', preventDefault);
		remove(this, 'mousedown touchstart', preventIgnoreTags);
		remove(this, 'movestart', flagAsHandled);
		
		// Don't bind to the DOM. For speed.
		return true;
	}
	
	function addMethod(handleObj) {
		// We're not interested in preventing defaults for handlers that
		// come from internal move or moveend bindings
		if (handleObj.namespace === "move" || handleObj.namespace === "moveend") {
			return;
		}
		
		// Stop the node from being dragged
		add(this, 'dragstart.' + handleObj.guid + ' drag.' + handleObj.guid, preventDefault, undefined, handleObj.selector);
		
		// Prevent text selection and touch interface scrolling
		add(this, 'mousedown.' + handleObj.guid, preventIgnoreTags, undefined, handleObj.selector);
	}
	
	function removeMethod(handleObj) {
		if (handleObj.namespace === "move" || handleObj.namespace === "moveend") {
			return;
		}
		
		remove(this, 'dragstart.' + handleObj.guid + ' drag.' + handleObj.guid);
		remove(this, 'mousedown.' + handleObj.guid);
	}
	
	jQuery.event.special.movestart = {
		setup: setup,
		teardown: teardown,
		add: addMethod,
		remove: removeMethod,

		_default: function(e) {
			var template, data;
			
			// If no move events were bound to any ancestors of this
			// target, high tail it out of here.
			if (!e._handled()) { return; }

			template = {
				target: e.target,
				startX: e.startX,
				startY: e.startY,
				pageX: e.pageX,
				pageY: e.pageY,
				distX: e.distX,
				distY: e.distY,
				deltaX: e.deltaX,
				deltaY: e.deltaY,
				velocityX: e.velocityX,
				velocityY: e.velocityY,
				timeStamp: e.timeStamp,
				identifier: e.identifier,
				targetTouches: e.targetTouches,
				finger: e.finger
			};

			data = {
				event: template,
				timer: new Timer(function(time){
					trigger(e.target, template);
				})
			};
			
			if (e.identifier === undefined) {
				// We're dealing with a mouse
				// Stop clicks from propagating during a move
				add(e.target, 'click', returnFalse);
				add(document, mouseevents.move, activeMousemove, data);
				add(document, mouseevents.end, activeMouseend, data);
			}
			else {
				// We're dealing with a touch. Stop touchmove doing
				// anything defaulty.
				e._preventTouchmoveDefault();
				add(document, touchevents.move + '.' + e.identifier, activeTouchmove, data);
				add(document, touchevents.end + '.' + e.identifier, activeTouchend, data);
			}
		}
	};

	jQuery.event.special.move = {
		setup: function() {
			// Bind a noop to movestart. Why? It's the movestart
			// setup that decides whether other move events are fired.
			add(this, 'movestart.move', jQuery.noop);
		},
		
		teardown: function() {
			remove(this, 'movestart.move', jQuery.noop);
		}
	};
	
	jQuery.event.special.moveend = {
		setup: function() {
			// Bind a noop to movestart. Why? It's the movestart
			// setup that decides whether other move events are fired.
			add(this, 'movestart.moveend', jQuery.noop);
		},
		
		teardown: function() {
			remove(this, 'movestart.moveend', jQuery.noop);
		}
	};

	add(document, 'mousedown.move', mousedown);
	add(document, 'touchstart.move', touchstart);

	// Make jQuery copy touch event properties over to the jQuery event
	// object, if they are not already listed. But only do the ones we
	// really need. IE7/8 do not have Array#indexOf(), but nor do they
	// have touch events, so let's assume we can ignore them.
	if (typeof Array.prototype.indexOf === 'function') {
		(function(jQuery, undefined){
			var props = ["changedTouches", "targetTouches"],
			    l = props.length;
			
			while (l--) {
				if (jQuery.event.props.indexOf(props[l]) === -1) {
					jQuery.event.props.push(props[l]);
				}
			}
		})(jQuery);
	};
});


// jQuery.event.swipe
// 0.5
// Stephen Band

// Dependencies
// jQuery.event.move 1.2

// One of swipeleft, swiperight, swipeup or swipedown is triggered on
// moveend, when the move has covered a threshold ratio of the dimension
// of the target node, or has gone really fast. Threshold and velocity
// sensitivity changed with:
//
// jQuery.event.special.swipe.settings.threshold
// jQuery.event.special.swipe.settings.sensitivity

(function (module) {
	if (typeof define === 'function' && define.amd) {
		// AMD. Register as an anonymous module.
		define(['jquery'], module);
	} else {
		// Browser globals
		module(jQuery);
	}
})(function(jQuery, undefined){
	var add = jQuery.event.add,
	   
	    remove = jQuery.event.remove,

	    // Just sugar, so we can have arguments in the same order as
	    // add and remove.
	    trigger = function(node, type, data) {
	    	jQuery.event.trigger(type, data, node);
	    },

	    settings = {
	    	// Ratio of distance over target finger must travel to be
	    	// considered a swipe.
	    	threshold: 0.4,
	    	// Faster fingers can travel shorter distances to be considered
	    	// swipes. 'sensitivity' controls how much. Bigger is shorter.
	    	sensitivity: 6
	    };

	function moveend(e) {
		var w, h, event;

		w = e.target.offsetWidth;
		h = e.target.offsetHeight;

		// Copy over some useful properties from the move event
		event = {
			distX: e.distX,
			distY: e.distY,
			velocityX: e.velocityX,
			velocityY: e.velocityY,
			finger: e.finger
		};

		// Find out which of the four directions was swiped
		if (e.distX > e.distY) {
			if (e.distX > -e.distY) {
				if (e.distX/w > settings.threshold || e.velocityX * e.distX/w * settings.sensitivity > 1) {
					event.type = 'swiperight';
					trigger(e.currentTarget, event);
				}
			}
			else {
				if (-e.distY/h > settings.threshold || e.velocityY * e.distY/w * settings.sensitivity > 1) {
					event.type = 'swipeup';
					trigger(e.currentTarget, event);
				}
			}
		}
		else {
			if (e.distX > -e.distY) {
				if (e.distY/h > settings.threshold || e.velocityY * e.distY/w * settings.sensitivity > 1) {
					event.type = 'swipedown';
					trigger(e.currentTarget, event);
				}
			}
			else {
				if (-e.distX/w > settings.threshold || e.velocityX * e.distX/w * settings.sensitivity > 1) {
					event.type = 'swipeleft';
					trigger(e.currentTarget, event);
				}
			}
		}
	}

	function getData(node) {
		var data = jQuery.data(node, 'event_swipe');
		
		if (!data) {
			data = { count: 0 };
			jQuery.data(node, 'event_swipe', data);
		}
		
		return data;
	}

	jQuery.event.special.swipe =
	jQuery.event.special.swipeleft =
	jQuery.event.special.swiperight =
	jQuery.event.special.swipeup =
	jQuery.event.special.swipedown = {
		setup: function( data, namespaces, eventHandle ) {
			var data = getData(this);

			// If another swipe event is already setup, don't setup again.
			if (data.count++ > 0) { return; }

			add(this, 'moveend', moveend);

			return true;
		},

		teardown: function() {
			var data = getData(this);

			// If another swipe event is still setup, don't teardown.
			if (--data.count > 0) { return; }

			remove(this, 'moveend', moveend);

			return true;
		},

		settings: settings
	};
});


;(function ($, window, document, undefined) {
  'use strict';

  var settings = {
        callback: $.noop,
        deep_linking: true,
        init: false
      },

      methods = {
        init : function (options) {
          settings = $.extend({}, settings, options);

          return this.each(function () {
            if (!settings.init) methods.events();

            if (settings.deep_linking) methods.from_hash();
          });
        },

        events : function () {
          $(document).on('click.fndtn', '.tabs a', function (e) {
            methods.set_tab($(this).parent('dd, li'), e);
          });
          
          settings.init = true;
        },

        set_tab : function ($tab, e) {
          var $activeTab = $tab.closest('dl, ul').find('.active'),
              target = $tab.children('a').attr("href"),
              hasHash = /^#/.test(target),
              $content = $(target + 'Tab');

          if (hasHash && $content.length > 0) {
            // Show tab content
            if (e && !settings.deep_linking) e.preventDefault();
            $content.closest('.tabs-content').children('li').removeClass('active').hide();
            $content.css('display', 'block').addClass('active');
          }

          // Make active tab
          $activeTab.removeClass('active');
          $tab.addClass('active');

          settings.callback();
        },

        from_hash : function () {
          var hash = window.location.hash,
              $tab = $('a[href="' + hash + '"]');

          $tab.trigger('click.fndtn');
        }
      }

  $.fn.foundationTabs = function (method) {
    if (methods[method]) {
      return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
    } else if (typeof method === 'object' || !method) {
      return methods.init.apply(this, arguments);
    } else {
      $.error('Method ' +  method + ' does not exist on jQuery.foundationTabs');
    }
  };
}(jQuery, this, this.document));


;(function ($, window, undefined) {
  'use strict';

  var $doc = $(document),
      Modernizr = window.Modernizr;

  $(document).ready(function() {
    $.fn.foundationAlerts           ? $doc.foundationAlerts() : null;
    $.fn.foundationButtons          ? $doc.foundationButtons() : null;
    $.fn.foundationAccordion        ? $doc.foundationAccordion() : null;
    $.fn.foundationNavigation       ? $doc.foundationNavigation() : null;
    $.fn.foundationTopBar           ? $doc.foundationTopBar() : null;
    $.fn.foundationCustomForms      ? $doc.foundationCustomForms() : null;
    $.fn.foundationMediaQueryViewer ? $doc.foundationMediaQueryViewer() : null;
    $.fn.foundationTabs             ? $doc.foundationTabs({callback : $.foundation.customForms.appendCustomMarkup}) : null;
    $.fn.foundationTooltips         ? $doc.foundationTooltips() : null;
    $.fn.foundationMagellan         ? $doc.foundationMagellan() : null;
    $.fn.foundationClearing         ? $doc.foundationClearing() : null;

    $.fn.placeholder                ? $('input, textarea').placeholder() : null;
  });

  // UNCOMMENT THE LINE YOU WANT BELOW IF YOU WANT IE8 SUPPORT AND ARE USING .block-grids
  // $('.block-grid.two-up>li:nth-child(2n+1)').css({clear: 'both'});
  // $('.block-grid.three-up>li:nth-child(3n+1)').css({clear: 'both'});
  // $('.block-grid.four-up>li:nth-child(4n+1)').css({clear: 'both'});
  // $('.block-grid.five-up>li:nth-child(5n+1)').css({clear: 'both'});

  // Hide address bar on mobile devices (except if #hash present, so we don't mess up deep linking).
  if (Modernizr.touch && !window.location.hash) {
    $(window).load(function () {
      setTimeout(function () {
        window.scrollTo(0, 1);
      }, 0);
    });
  }

})(jQuery, this);


/*! http://mths.be/placeholder v2.0.7 by @mathias */
;(function(window, document, $) {

	var isInputSupported = 'placeholder' in document.createElement('input'),
	    isTextareaSupported = 'placeholder' in document.createElement('textarea'),
	    prototype = $.fn,
	    valHooks = $.valHooks,
	    hooks,
	    placeholder;

	if (isInputSupported && isTextareaSupported) {

		placeholder = prototype.placeholder = function() {
			return this;
		};

		placeholder.input = placeholder.textarea = true;

	} else {

		placeholder = prototype.placeholder = function() {
			var $this = this;
			$this
				.filter((isInputSupported ? 'textarea' : ':input') + '[placeholder]')
				.not('.placeholder')
				.bind({
					'focus.placeholder': clearPlaceholder,
					'blur.placeholder': setPlaceholder
				})
				.data('placeholder-enabled', true)
				.trigger('blur.placeholder');
			return $this;
		};

		placeholder.input = isInputSupported;
		placeholder.textarea = isTextareaSupported;

		hooks = {
			'get': function(element) {
				var $element = $(element);
				return $element.data('placeholder-enabled') && $element.hasClass('placeholder') ? '' : element.value;
			},
			'set': function(element, value) {
				var $element = $(element);
				if (!$element.data('placeholder-enabled')) {
					return element.value = value;
				}
				if (value == '') {
					element.value = value;
					// Issue #56: Setting the placeholder causes problems if the element continues to have focus.
					if (element != document.activeElement) {
						// We can't use `triggerHandler` here because of dummy text/password inputs :(
						setPlaceholder.call(element);
					}
				} else if ($element.hasClass('placeholder')) {
					clearPlaceholder.call(element, true, value) || (element.value = value);
				} else {
					element.value = value;
				}
				// `set` can not return `undefined`; see http://jsapi.info/jquery/1.7.1/val#L2363
				return $element;
			}
		};

		isInputSupported || (valHooks.input = hooks);
		isTextareaSupported || (valHooks.textarea = hooks);

		$(function() {
			// Look for forms
			$(document).delegate('form', 'submit.placeholder', function() {
				// Clear the placeholder values so they don't get submitted
				var $inputs = $('.placeholder', this).each(clearPlaceholder);
				setTimeout(function() {
					$inputs.each(setPlaceholder);
				}, 10);
			});
		});

		// Clear placeholder values upon page reload
		$(window).bind('beforeunload.placeholder', function() {
			$('.placeholder').each(function() {
				this.value = '';
			});
		});

	}

	function args(elem) {
		// Return an object of element attributes
		var newAttrs = {},
		    rinlinejQuery = /^jQuery\d+$/;
		$.each(elem.attributes, function(i, attr) {
			if (attr.specified && !rinlinejQuery.test(attr.name)) {
				newAttrs[attr.name] = attr.value;
			}
		});
		return newAttrs;
	}

	function clearPlaceholder(event, value) {
		var input = this,
		    $input = $(input);
		if (input.value == $input.attr('placeholder') && $input.hasClass('placeholder')) {
			if ($input.data('placeholder-password')) {
				$input = $input.hide().next().show().attr('id', $input.removeAttr('id').data('placeholder-id'));
				// If `clearPlaceholder` was called from `$.valHooks.input.set`
				if (event === true) {
					return $input[0].value = value;
				}
				$input.focus();
			} else {
				input.value = '';
				$input.removeClass('placeholder');
				input == document.activeElement && input.select();
			}
		}
	}

	function setPlaceholder() {
		var $replacement,
		    input = this,
		    $input = $(input),
		    $origInput = $input,
		    id = this.id;
		if (input.value == '') {
			if (input.type == 'password') {
				if (!$input.data('placeholder-textinput')) {
					try {
						$replacement = $input.clone().attr({ 'type': 'text' });
					} catch(e) {
						$replacement = $('<input>').attr($.extend(args(this), { 'type': 'text' }));
					}
					$replacement
						.removeAttr('name')
						.data({
							'placeholder-password': true,
							'placeholder-id': id
						})
						.bind('focus.placeholder', clearPlaceholder);
					$input
						.data({
							'placeholder-textinput': $replacement,
							'placeholder-id': id
						})
						.before($replacement);
				}
				$input = $input.removeAttr('id').hide().prev().attr('id', id).show();
				// Note: `$input[0] != input` now!
			}
			$input.addClass('placeholder');
			$input[0].value = $input.attr('placeholder');
		} else {
			$input.removeClass('placeholder');
		}
	}

}(this, document, jQuery));


/* Modernizr 2.6.2 (Custom Build) | MIT & BSD
 * Build: http://modernizr.com/download/#-inlinesvg-svg-svgclippaths-touch-shiv-mq-cssclasses-teststyles-prefixes-ie8compat-load
 */
;window.Modernizr=function(a,b,c){function y(a){j.cssText=a}function z(a,b){return y(m.join(a+";")+(b||""))}function A(a,b){return typeof a===b}function B(a,b){return!!~(""+a).indexOf(b)}function C(a,b,d){for(var e in a){var f=b[a[e]];if(f!==c)return d===!1?a[e]:A(f,"function")?f.bind(d||b):f}return!1}var d="2.6.2",e={},f=!0,g=b.documentElement,h="modernizr",i=b.createElement(h),j=i.style,k,l={}.toString,m=" -webkit- -moz- -o- -ms- ".split(" "),n={svg:"http://www.w3.org/2000/svg"},o={},p={},q={},r=[],s=r.slice,t,u=function(a,c,d,e){var f,i,j,k,l=b.createElement("div"),m=b.body,n=m||b.createElement("body");if(parseInt(d,10))while(d--)j=b.createElement("div"),j.id=e?e[d]:h+(d+1),l.appendChild(j);return f=["&#173;",'<style id="s',h,'">',a,"</style>"].join(""),l.id=h,(m?l:n).innerHTML+=f,n.appendChild(l),m||(n.style.background="",n.style.overflow="hidden",k=g.style.overflow,g.style.overflow="hidden",g.appendChild(n)),i=c(l,a),m?l.parentNode.removeChild(l):(n.parentNode.removeChild(n),g.style.overflow=k),!!i},v=function(b){var c=a.matchMedia||a.msMatchMedia;if(c)return c(b).matches;var d;return u("@media "+b+" { #"+h+" { position: absolute; } }",function(b){d=(a.getComputedStyle?getComputedStyle(b,null):b.currentStyle)["position"]=="absolute"}),d},w={}.hasOwnProperty,x;!A(w,"undefined")&&!A(w.call,"undefined")?x=function(a,b){return w.call(a,b)}:x=function(a,b){return b in a&&A(a.constructor.prototype[b],"undefined")},Function.prototype.bind||(Function.prototype.bind=function(b){var c=this;if(typeof c!="function")throw new TypeError;var d=s.call(arguments,1),e=function(){if(this instanceof e){var a=function(){};a.prototype=c.prototype;var f=new a,g=c.apply(f,d.concat(s.call(arguments)));return Object(g)===g?g:f}return c.apply(b,d.concat(s.call(arguments)))};return e}),o.touch=function(){var c;return"ontouchstart"in a||a.DocumentTouch&&b instanceof DocumentTouch?c=!0:u(["@media (",m.join("touch-enabled),("),h,")","{#modernizr{top:9px;position:absolute}}"].join(""),function(a){c=a.offsetTop===9}),c},o.svg=function(){return!!b.createElementNS&&!!b.createElementNS(n.svg,"svg").createSVGRect},o.inlinesvg=function(){var a=b.createElement("div");return a.innerHTML="<svg/>",(a.firstChild&&a.firstChild.namespaceURI)==n.svg},o.svgclippaths=function(){return!!b.createElementNS&&/SVGClipPath/.test(l.call(b.createElementNS(n.svg,"clipPath")))};for(var D in o)x(o,D)&&(t=D.toLowerCase(),e[t]=o[D](),r.push((e[t]?"":"no-")+t));return e.addTest=function(a,b){if(typeof a=="object")for(var d in a)x(a,d)&&e.addTest(d,a[d]);else{a=a.toLowerCase();if(e[a]!==c)return e;b=typeof b=="function"?b():b,typeof f!="undefined"&&f&&(g.className+=" "+(b?"":"no-")+a),e[a]=b}return e},y(""),i=k=null,function(a,b){function k(a,b){var c=a.createElement("p"),d=a.getElementsByTagName("head")[0]||a.documentElement;return c.innerHTML="x<style>"+b+"</style>",d.insertBefore(c.lastChild,d.firstChild)}function l(){var a=r.elements;return typeof a=="string"?a.split(" "):a}function m(a){var b=i[a[g]];return b||(b={},h++,a[g]=h,i[h]=b),b}function n(a,c,f){c||(c=b);if(j)return c.createElement(a);f||(f=m(c));var g;return f.cache[a]?g=f.cache[a].cloneNode():e.test(a)?g=(f.cache[a]=f.createElem(a)).cloneNode():g=f.createElem(a),g.canHaveChildren&&!d.test(a)?f.frag.appendChild(g):g}function o(a,c){a||(a=b);if(j)return a.createDocumentFragment();c=c||m(a);var d=c.frag.cloneNode(),e=0,f=l(),g=f.length;for(;e<g;e++)d.createElement(f[e]);return d}function p(a,b){b.cache||(b.cache={},b.createElem=a.createElement,b.createFrag=a.createDocumentFragment,b.frag=b.createFrag()),a.createElement=function(c){return r.shivMethods?n(c,a,b):b.createElem(c)},a.createDocumentFragment=Function("h,f","return function(){var n=f.cloneNode(),c=n.createElement;h.shivMethods&&("+l().join().replace(/\w+/g,function(a){return b.createElem(a),b.frag.createElement(a),'c("'+a+'")'})+");return n}")(r,b.frag)}function q(a){a||(a=b);var c=m(a);return r.shivCSS&&!f&&!c.hasCSS&&(c.hasCSS=!!k(a,"article,aside,figcaption,figure,footer,header,hgroup,nav,section{display:block}mark{background:#FF0;color:#000}")),j||p(a,c),a}var c=a.html5||{},d=/^<|^(?:button|map|select|textarea|object|iframe|option|optgroup)$/i,e=/^(?:a|b|code|div|fieldset|h1|h2|h3|h4|h5|h6|i|label|li|ol|p|q|span|strong|style|table|tbody|td|th|tr|ul)$/i,f,g="_html5shiv",h=0,i={},j;(function(){try{var a=b.createElement("a");a.innerHTML="<xyz></xyz>",f="hidden"in a,j=a.childNodes.length==1||function(){b.createElement("a");var a=b.createDocumentFragment();return typeof a.cloneNode=="undefined"||typeof a.createDocumentFragment=="undefined"||typeof a.createElement=="undefined"}()}catch(c){f=!0,j=!0}})();var r={elements:c.elements||"abbr article aside audio bdi canvas data datalist details figcaption figure footer header hgroup mark meter nav output progress section summary time video",shivCSS:c.shivCSS!==!1,supportsUnknownElements:j,shivMethods:c.shivMethods!==!1,type:"default",shivDocument:q,createElement:n,createDocumentFragment:o};a.html5=r,q(b)}(this,b),e._version=d,e._prefixes=m,e.mq=v,e.testStyles=u,g.className=g.className.replace(/(^|\s)no-js(\s|$)/,"$1$2")+(f?" js "+r.join(" "):""),e}(this,this.document),function(a,b,c){function d(a){return"[object Function]"==o.call(a)}function e(a){return"string"==typeof a}function f(){}function g(a){return!a||"loaded"==a||"complete"==a||"uninitialized"==a}function h(){var a=p.shift();q=1,a?a.t?m(function(){("c"==a.t?B.injectCss:B.injectJs)(a.s,0,a.a,a.x,a.e,1)},0):(a(),h()):q=0}function i(a,c,d,e,f,i,j){function k(b){if(!o&&g(l.readyState)&&(u.r=o=1,!q&&h(),l.onload=l.onreadystatechange=null,b)){"img"!=a&&m(function(){t.removeChild(l)},50);for(var d in y[c])y[c].hasOwnProperty(d)&&y[c][d].onload()}}var j=j||B.errorTimeout,l=b.createElement(a),o=0,r=0,u={t:d,s:c,e:f,a:i,x:j};1===y[c]&&(r=1,y[c]=[]),"object"==a?l.data=c:(l.src=c,l.type=a),l.width=l.height="0",l.onerror=l.onload=l.onreadystatechange=function(){k.call(this,r)},p.splice(e,0,u),"img"!=a&&(r||2===y[c]?(t.insertBefore(l,s?null:n),m(k,j)):y[c].push(l))}function j(a,b,c,d,f){return q=0,b=b||"j",e(a)?i("c"==b?v:u,a,b,this.i++,c,d,f):(p.splice(this.i++,0,a),1==p.length&&h()),this}function k(){var a=B;return a.loader={load:j,i:0},a}var l=b.documentElement,m=a.setTimeout,n=b.getElementsByTagName("script")[0],o={}.toString,p=[],q=0,r="MozAppearance"in l.style,s=r&&!!b.createRange().compareNode,t=s?l:n.parentNode,l=a.opera&&"[object Opera]"==o.call(a.opera),l=!!b.attachEvent&&!l,u=r?"object":l?"script":"img",v=l?"script":u,w=Array.isArray||function(a){return"[object Array]"==o.call(a)},x=[],y={},z={timeout:function(a,b){return b.length&&(a.timeout=b[0]),a}},A,B;B=function(a){function b(a){var a=a.split("!"),b=x.length,c=a.pop(),d=a.length,c={url:c,origUrl:c,prefixes:a},e,f,g;for(f=0;f<d;f++)g=a[f].split("="),(e=z[g.shift()])&&(c=e(c,g));for(f=0;f<b;f++)c=x[f](c);return c}function g(a,e,f,g,h){var i=b(a),j=i.autoCallback;i.url.split(".").pop().split("?").shift(),i.bypass||(e&&(e=d(e)?e:e[a]||e[g]||e[a.split("/").pop().split("?")[0]]),i.instead?i.instead(a,e,f,g,h):(y[i.url]?i.noexec=!0:y[i.url]=1,f.load(i.url,i.forceCSS||!i.forceJS&&"css"==i.url.split(".").pop().split("?").shift()?"c":c,i.noexec,i.attrs,i.timeout),(d(e)||d(j))&&f.load(function(){k(),e&&e(i.origUrl,h,g),j&&j(i.origUrl,h,g),y[i.url]=2})))}function h(a,b){function c(a,c){if(a){if(e(a))c||(j=function(){var a=[].slice.call(arguments);k.apply(this,a),l()}),g(a,j,b,0,h);else if(Object(a)===a)for(n in m=function(){var b=0,c;for(c in a)a.hasOwnProperty(c)&&b++;return b}(),a)a.hasOwnProperty(n)&&(!c&&!--m&&(d(j)?j=function(){var a=[].slice.call(arguments);k.apply(this,a),l()}:j[n]=function(a){return function(){var b=[].slice.call(arguments);a&&a.apply(this,b),l()}}(k[n])),g(a[n],j,b,n,h))}else!c&&l()}var h=!!a.test,i=a.load||a.both,j=a.callback||f,k=j,l=a.complete||f,m,n;c(h?a.yep:a.nope,!!i),i&&c(i)}var i,j,l=this.yepnope.loader;if(e(a))g(a,0,l,0);else if(w(a))for(i=0;i<a.length;i++)j=a[i],e(j)?g(j,0,l,0):w(j)?B(j):Object(j)===j&&h(j,l);else Object(a)===a&&h(a,l)},B.addPrefix=function(a,b){z[a]=b},B.addFilter=function(a){x.push(a)},B.errorTimeout=1e4,null==b.readyState&&b.addEventListener&&(b.readyState="loading",b.addEventListener("DOMContentLoaded",A=function(){b.removeEventListener("DOMContentLoaded",A,0),b.readyState="complete"},0)),a.yepnope=k(),a.yepnope.executeStack=h,a.yepnope.injectJs=function(a,c,d,e,i,j){var k=b.createElement("script"),l,o,e=e||B.errorTimeout;k.src=a;for(o in d)k.setAttribute(o,d[o]);c=j?h:c||f,k.onreadystatechange=k.onload=function(){!l&&g(k.readyState)&&(l=1,c(),k.onload=k.onreadystatechange=null)},m(function(){l||(l=1,c(1))},e),i?k.onload():n.parentNode.insertBefore(k,n)},a.yepnope.injectCss=function(a,c,d,e,g,i){var e=b.createElement("link"),j,c=i?h:c||f;e.href=a,e.rel="stylesheet",e.type="text/css";for(j in d)e.setAttribute(j,d[j]);g||(n.parentNode.insertBefore(e,n),m(c,0))}}(this,document),Modernizr.load=function(){yepnope.apply(window,[].slice.call(arguments,0))},Modernizr.addTest("ie8compat",function(){return!window.addEventListener&&document.documentMode&&document.documentMode===7});


/**
 * Backbone localStorage Adapter
 * Version 1.0
 *
 * https://github.com/jeromegn/Backbone.localStorage
 */
(function (root, factory) {
   if (typeof define === "function" && define.amd) {
      // AMD. Register as an anonymous module.
      define(["underscore","backbone"], function(_, Backbone) {
        // Use global variables if the locals is undefined.
        return factory(_ || root._, Backbone || root.Backbone);
      });
   } else {
      // RequireJS isn't being used. Assume underscore and backbone is loaded in <script> tags
      factory(_, Backbone);
   }
}(this, function(_, Backbone) {
// A simple module to replace `Backbone.sync` with *localStorage*-based
// persistence. Models are given GUIDS, and saved into a JSON object. Simple
// as that.

// Hold reference to Underscore.js and Backbone.js in the closure in order
// to make things work even if they are removed from the global namespace

// Generate four random hex digits.
function S4() {
   return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
};

// Generate a pseudo-GUID by concatenating random hexadecimal.
function guid() {
   return (S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4());
};

// Our Store is represented by a single JS object in *localStorage*. Create it
// with a meaningful name, like the name you'd give a table.
// window.Store is deprectated, use Backbone.LocalStorage instead
Backbone.LocalStorage = window.Store = function(name) {
  this.name = name;
  var store = this.localStorage().getItem(this.name);
  this.records = (store && store.split(",")) || [];
};

_.extend(Backbone.LocalStorage.prototype, {

  // Save the current state of the **Store** to *localStorage*.
  save: function() {
    this.localStorage().setItem(this.name, this.records.join(","));
  },

  // Add a model, giving it a (hopefully)-unique GUID, if it doesn't already
  // have an id of it's own.
  create: function(model) {
    if (!model.id) {
      model.id = guid();
      model.set(model.idAttribute, model.id);
    }
    this.localStorage().setItem(this.name+"-"+model.id, JSON.stringify(model));
    this.records.push(model.id.toString());
    this.save();
    return this.find(model);
  },

  // Update a model by replacing its copy in `this.data`.
  update: function(model) {
    this.localStorage().setItem(this.name+"-"+model.id, JSON.stringify(model));
    if (!_.include(this.records, model.id.toString()))
      this.records.push(model.id.toString()); this.save();
    return this.find(model);
  },

  // Retrieve a model from `this.data` by id.
  find: function(model) {
    return this.jsonData(this.localStorage().getItem(this.name+"-"+model.id));
  },

  // Return the array of all models currently in storage.
  findAll: function() {
    return _(this.records).chain()
      .map(function(id){
        return this.jsonData(this.localStorage().getItem(this.name+"-"+id));
      }, this)
      .compact()
      .value();
  },

  // Delete a model from `this.data`, returning it.
  destroy: function(model) {
    if (model.isNew())
      return false
    this.localStorage().removeItem(this.name+"-"+model.id);
    this.records = _.reject(this.records, function(id){
      return id === model.id.toString();
    });
    this.save();
    return model;
  },

  localStorage: function() {
    return localStorage;
  },
  
  // fix for "illegal access" error on Android when JSON.parse is passed null
  jsonData: function (data) {
      return data && JSON.parse(data);
  }

});

// localSync delegate to the model or collection's
// *localStorage* property, which should be an instance of `Store`.
// window.Store.sync and Backbone.localSync is deprectated, use Backbone.LocalStorage.sync instead
Backbone.LocalStorage.sync = window.Store.sync = Backbone.localSync = function(method, model, options) {
  var store = model.localStorage || model.collection.localStorage;

  var resp, errorMessage, syncDfd = $.Deferred && $.Deferred(); //If $ is having Deferred - use it. 

  try {

    switch (method) {
      case "read":
        resp = model.id != undefined ? store.find(model) : store.findAll();
        break;
      case "create":
        resp = store.create(model);
        break;
      case "update":
        resp = store.update(model);
        break;
      case "delete":
        resp = store.destroy(model);
        break;
    }

  } catch(error) {
    if (error.code === DOMException.QUOTA_EXCEEDED_ERR && window.localStorage.length === 0)
      errorMessage = "Private browsing is unsupported";
    else
      errorMessage = error.message;
  }

  if (resp) {
    if (options && options.success)
      if (Backbone.VERSION === "0.9.10") {
        options.success(model, resp, options);
      } else {
        options.success(resp);
      }
    if (syncDfd)
      syncDfd.resolve(resp);

  } else {
    errorMessage = errorMessage ? errorMessage
                                : "Record Not Found";
    
    if (options && options.error)
      if (Backbone.VERSION === "0.9.10") {
        options.error(model, errorMessage, options);
      } else {
        options.error(errorMessage);
      }
      
    if (syncDfd)
      syncDfd.reject(errorMessage);
  }
  
  // add compatibility with $.ajax
  // always execute callback for success and error
  if (options && options.complete) options.complete(resp);

  return syncDfd && syncDfd.promise();
};

Backbone.ajaxSync = Backbone.sync;

Backbone.getSyncMethod = function(model) {
  if(model.localStorage || (model.collection && model.collection.localStorage)) {
    return Backbone.localSync;
  }

  return Backbone.ajaxSync;
};

// Override 'Backbone.sync' to default to localSync,
// the original 'Backbone.sync' is still available in 'Backbone.ajaxSync'
Backbone.sync = function(method, model, options) {
  return Backbone.getSyncMethod(model).apply(this, [method, model, options]);
};

return Backbone.LocalStorage;
}));

JogoApp.module("ModuloJogo", function(ModuloJogo, JogoApp, Backbone, Marionette, $, _ )
    {
        ModuloJogo.Questao = Backbone.Model.extend({});
        ModuloJogo.Questoes = Backbone.Collection.extend({
			
            model: ModuloJogo.Questao
    });

/*=============================================
=            MODELO PERGUNTAS       	      =
=============================================*/

        ModuloJogo.Pergunta = Backbone.Model.extend({});


/*=============================================
=            COLEÇÃO PERGUNTAS      	      =
=============================================*/

        ModuloJogo.Perguntas = Backbone.Collection.extend({
            model: ModuloJogo.Pergunta
            });


        /*=============================================
=            MODELO PERGUNTAS       	      =
=============================================*/

        ModuloJogo.Resposta = Backbone.Model.extend({});


        /*=============================================
=            COLEÇÃO PERGUNTAS      	      =
=============================================*/

        ModuloJogo.Respostas = Backbone.Collection.extend({
            model: ModuloJogo.Resposta
            });

        /*=============================================
=           	LAYOUT JOGO  	  		      =
=============================================*/

        ModuloJogo.EntradaView = Backbone.Marionette.ItemView.extend({
            template: '#inicio',
            events:
            {
                'click div#jogar': 'jogar'
            },
			
            jogar: function()
            {
                JogoApp.vent.trigger("NovaQuestao");
            }

        });

        /*=============================================
=           	LAYOUT JOGO  	  		      =
=============================================*/

        ModuloJogo.JogoLayout = Backbone.Marionette.Layout.extend({
            template: "#principal",

    
            events:
            {
                'click i#pista': 'pistas',
                'click i#ajuda' : 'ajuda'

            },

            pistas: function()
            {
                var auxpistaDescricao = minhaperguntaresposta.at(0).attributes.tracks;
                var auxpistaTitulo = minhaperguntaresposta.at(0).attributes.tracksTitle;
                $("#myModal").reveal();
                $('#ModalDescricao').html(auxpistaDescricao);
                $("#ModalTitulo").html(auxpistaTitulo);
            },  

            ajuda: function()
            {
                var auxajudaDescricao = minhaperguntaresposta.at(0).attributes.help;
                var auxajudaTitulo = minhaperguntaresposta.at(0).attributes.helpTitle;
                $("#myModal").reveal();
                $("#ModalTitulo").html(auxajudaTitulo);
                $('#ModalDescricao').html(auxajudaDescricao);
	
		
            },

            regions:
            {	
                rpergunta: '#regiao_pergunta',
                rresposta: '#regiao_resposta',
                racoes: '#regiao_acoes',
                rimagem: '#regiao_imagem',
                rrespostatipo: '#regiao_respostastipo',
                rpuzzle: '#regiao_puzzle'
            },
            help: function(conf){
		     
                $( "#help" ).dialog({
                    autoOpen: true,
                    show: "fade",
                    hide: "blind",
                    modal: true,
                    open: function (event, ui) {
                        var helpTitle="";
                        if(typeof(conf.helpTitle) === "undefined" || conf.helpTitle == "")
                        {
                            helpTitle = MN.informacao;
                        }
                        else
                        {
                            helpTitle = conf.helpTitle;
                        }
                        $('#help').dialog('option', 'title', helpTitle);
                    },
                    resizable: false
                });
		
            },

        });

        /*=============================================
=	       	    STATUS JOGO   			      =
=============================================*/
        ModuloJogo.StatusView = Backbone.Marionette.ItemView.extend({
            template: "#estado"
        });

        /*=============================================
=	       	SEM STATUS JOGO   			      =
=============================================*/

        ModuloJogo.SemStatusView = Backbone.Marionette.ItemView.extend({
            template: "#semestado"
        });

        /*=============================================
=	       	LISTA STATUS JOGO   		      =
=============================================*/

        ModuloJogo.ListaStatusView = Backbone.Marionette.CollectionView.extend({
            itemView: ModuloJogo.StatusView,
            emptyView: ModuloJogo.SemStatusView
        })


        JogoApp.vent.on("VerificarSeVenceu", function(NivelQuestao)
        {
            // CICLO QUE NOS DÁ O MÁXIMO DE NÍVEIS 
            var aux=0;
            nMaxNiveis = 0;
		
            for(var i = 0; i < meunivel.length; i++)
            {
                //nMaxNiveis=meunivel.at(i).attributes.generalConf.nivel;
                if(meunivel.at(i).attributes.generalConf.nivel> aux){
                    nMaxNiveis=meunivel.at(i).attributes.generalConf.nivel;
                    aux++;
                }
	
                //console.log(meunivel.at(i).attributes.generalConf.nivel>nMaxNiveis);
				
            /*
            if(auxMaxNiveis != undefined)
            {
                if(auxMaxNiveis == 1)
                {
                nMaxNiveis = nMaxNiveis + 1;
                }
            }

            var auxMaxNiveis = 1;

            for(var j= 0; j < i; j++)
            {
                if(meunivel.at(j).attributes.generalConf.nivel == meunivel.at(i).attributes.generalConf.nivel)
                {tempo
                auxMaxNiveis = 0;
                }
            }*/
            }
            //nMaxNiveis++;
				
            if(NivelQuestao == nMaxNiveis)
            {
				if(localStorage.getItem('idioma')=="pt"){
					location.href = 'winPT.html?p='+pontuacao;
				}
				else{
					location.href = 'winEN.html?p='+pontuacao;
				}
		
            } 
            else {
                NIVEL = NIVEL+1;
            }
            //console.log(NIVEL);
			
        });

/*=============================================
=         FUNÇÃO MOSTRAR NOVA PERGUNTA        =
=============================================*/
        JogoApp.vent.on("NovaQuestao", function()
        {       

            // 59.js TESTE
           // JogoApp.perguntas.add(mygamepath);    
       
            // INSTANCIAR O LAYOUT
            var layout = new ModuloJogo.JogoLayout({
                collection: JogoApp.perguntas
            });
		
            auxlayout = layout;
		
			//caracteristicas gerais do jogo
			
			
            //seleção de um caminho (PATH)
			if(randompaths == null)
            {
                randompaths = Math.floor(Math.random()*JogoApp.perguntas.at(0).toJSON().Paths.length);
            }
        
            // IR BUSCAR A PERGUNTA
            var meucaminho = new ModuloJogo.Questoes(JogoApp.perguntas.at(randompaths).toJSON().Paths);
			
            meunivel = new ModuloJogo.Questoes(meucaminho.at(0).attributes.questions);
            
			// FAZER UM RANDOM AO MEUNIVEL 
            // var randomnumber=Math.floor(Math.random()*meunivel.length +1) - 1;

            tempo = meunivel;

            //  CICLO RESPONSÁVEL POR ESCOLHER ALEATORIAMENTE UM ENUNCIADO
            // O NÍVEL É SEQUENCIAL, VAI DO 1 ATÉ AO MÁXIMO
            do{
                var randomnumber=Math.floor(Math.random()*meunivel.length +1) - 1;
                if(meunivel.at(randomnumber).attributes.generalConf.nivel == NIVEL)
                {
                    minhaperguntaresposta = new ModuloJogo.Respostas(meunivel.at(randomnumber).attributes.customConf);
                    meuestado = new ModuloJogo.Respostas(meunivel.at(randomnumber).attributes.generalConf); 

                    valorPergunta = 1;
                }

            } while (valorPergunta == 0)
            valorPergunta = 0;
            //  

            auxestado = meuestado;
		//console.log('body'+meunivel.at(NIVEL-1).attributes.generalConf.grupo);
		jQuery('#oBody').removeClass(jQuery('#oBody').attr('class'));
		 
		jQuery('#oBody').addClass('body'+meunivel.at(NIVEL-1).attributes.generalConf.grupo);
		
		
		
		
            // AUXILIAR PARA CRIAR OS INPUT RADIO (DÁ-NOS OS NOMES DAS POSSÍVEIS RESPOSTAS)
            AUX = minhaperguntaresposta;

            // SABER QUAL A MENSAGEM APÓS RESPONDER CERTO !
			
			
            auxmsgcertaTitulo = minhaperguntaresposta.at(0).attributes.followUpPageTitle;
            auxmsgcertaDescricao = minhaperguntaresposta.at(0).attributes.followUpPage;
			auxmsgcertaTitulo = minhaperguntaresposta.at(0).attributes.followUpPageTitle;
            // SABER QUAL A RESPOSTA !
            auxresposta = minhaperguntaresposta.at(0).attributes.resposta;
			auxpontuacao = minhaperguntaresposta.at(0).attributes.pontuacao;
            // VER QUAL O TIPO DE RESPOSTA !
            tipo = meuestado.at(0).attributes.tipo;
            
            auxtipo = tipo;

            var legenda = minhaperguntaresposta.at(0).attributes.legendas;
            auxlegenda = legenda;
			
            // No array JogoApp.Modulos, os nomes atribuídos em cada módulo deve ser igual ao definido no ficheiro 59.js !
        
            var num = {
                Numero : 0
            };

            $.each(JogoApp.Modulos, function(index, value)
            {   

                if(JogoApp.Modulos[index] === tipo)
                {
                    $("#respostatipo").empty();
					
                    JogoApp.vent.trigger("Questao" + tipo, num);
                }
           

            });

            // DAR MENSAGEM DE ERRO AO UTILIZADOR, QUANDO HÁ UMA FALHA (NÃO ENCONTRA O FICHEIRO)
            // ESTÁ A BLOQUEAR ESSA MENSAGEM DE ERRO ÀS PERGUNTAS DO TIPO 01 E MOSTRA AUTOMATICAMENTE OUTRA!

            // if(tipo != 01) {

            if(num.Numero === 0)
            {
                alert("Por favor, entre em contacto com o administrador. Pedimos desculpa pelo inconveniente!");
                // É AQUI QUE A APLICAÇÃO CONTINUA  OU NÃO DEPOIS DA MENSAGEM DE ERRO!
                JogoApp.main.close();
                JogoApp.status.close();
            }
        
            // } else { JogoApp.vent.trigger("NovaQuestao"); }
		
            $('#fancyClock').tzineClock({
                limiteTempo:  new ModuloJogo.Respostas(meunivel.at(randomnumber).attributes.generalConf).at(0).attributes.limiteTempo,
                gameOverUrl: tempo.at(0).attributes.generalConf.gameOverUrl			
            });

        });

        /*=============================================
=           	INITIALIZER 	   		      =
=============================================*/

        ModuloJogo.addInitializer(function()
        {

// 59.js TESTE
            
            /*JogoApp.perguntas = new ModuloJogo.Perguntas();
			var aURL = location.href;
			var substr = aURL.split('/');
			var oID=substr[substr.length-1];
			
			var theGamePath=null;		
			$.ajax({
			  dataType: "json",
			  url: "http://localhost/ipeddyEditor/home/getGamePathJason/"+oID,
			  success: function(json) {
				  //console.log(json);
				  theGamePath=json;
				},
				async:false
			});
			
			JogoApp.perguntas.add(theGamePath);*/
			JogoApp.perguntas = new ModuloJogo.Perguntas();
			
			if(localStorage.getItem('idioma')=="pt"){
				JogoApp.perguntas.add(mygamepathPT);
				auxIdioma="pt";
			}else{
				JogoApp.perguntas.add(mygamepathEN);
				auxIdioma="en";
			}
			
			auxJogoID=JogoApp.perguntas.at(0).toJSON().jogoID;
			
			auxNomeJogo=JogoApp.perguntas.at(0).toJSON().NomeJogo;
			auxTempoTotal=JogoApp.perguntas.at(0).toJSON().TempoTotal;
			auxDataInicioJogo=JogoApp.perguntas.at(0).toJSON().dataInicioJogo;
			auxDataFimJogo=JogoApp.perguntas.at(0).toJSON().dataFimJogo;
			auxUrlImagemBGJ=JogoApp.perguntas.at(0).toJSON().urlImagemBGJ;
			auxUrlLogoTipo=JogoApp.perguntas.at(0).toJSON().urlLogoTipo;
			auxTipoJogo=JogoApp.perguntas.at(0).toJSON().tipoJogo;
			
            JogoApp.status.show(new ModuloJogo.SemStatusView());
            JogoApp.status.show(new ModuloJogo.EntradaView(JogoApp.perguntas.toJSON()));

            var minhaperguntaresposta = null;
            var tipo = null;
            var meunivel = null;
            var meuestado = null;

	
        });

    });



JogoApp.module("ModuloQuestao01", function(ModuloQuestao01, JogoApp, Backbone, Marionette, $, _ )
    {

        ModuloQuestao01.Pergunta = Backbone.Model.extend({});
        ModuloQuestao01.Perguntas = Backbone.Collection.extend({
            model: ModuloQuestao01.Pergunta
            });

        ModuloQuestao01.Resposta = Backbone.Model.extend({});
        ModuloQuestao01.Respostas = Backbone.Collection.extend({
            model: ModuloQuestao01.Resposta
            });

        /*=============================================
=	       	    PERGUNTA 		  		      =
=============================================*/
        ModuloQuestao01.PerguntaView = Backbone.Marionette.ItemView.extend({
            template: "#pergunta",

            events:
            {
                'click i#pista': 'pistas',
                'click i#ajuda' : 'ajuda'

            },

            pistas: function()
            {
                this.help();
            // var auxpista = minhaperguntaresposta.at(0).attributes.help;
	
            //alert(auxpista);
            },  

            ajuda: function()
            {
                var auxajuda = minhaperguntaresposta.at(0).attributes.tracks;
                alert(auxajuda);
            },
		
		

        });


        /*=============================================
=	       	   SEM PERGUNTA 	   		      =
=============================================*/
        ModuloQuestao01.SemPerguntaView = Backbone.Marionette.ItemView.extend({
            template: "#sempergunta"
        });

        /*=============================================
=	       	    LISTA PERGUNTA 		 	      =
=============================================*/
        ModuloQuestao01.ListaPerguntaView = Backbone.Marionette.CollectionView.extend({
            itemView: ModuloQuestao01.PerguntaView,
            emptyView: ModuloQuestao01.SemPerguntaView
        });

        /*=============================================
=	       	    RESPOSTA 	  			      =
=============================================*/
        ModuloQuestao01.RespostaView = Backbone.Marionette.ItemView.extend({
            template: "#resposta01",

        });

        /*=============================================
=	       	   SEM RESPOSTA 	   		      =
=============================================*/
        ModuloQuestao01.SemRespostaView = Backbone.Marionette.ItemView.extend({
            template: "#semresposta"
        });

        /*=============================================
=	       	   LISTA RESPOSTA 		   		  =
=============================================*/
        ModuloQuestao01.ListaRespostaView = Backbone.Marionette.CollectionView.extend({
            itemView: ModuloQuestao01.RespostaView,
            emptyView: ModuloQuestao01.SemRespostaView
        });

        /*=============================================
=               STATUS JOGO                   =
=============================================*/
        ModuloQuestao01.StatusView = Backbone.Marionette.ItemView.extend({
            template: "#estado"
        });

        /*=============================================
=           SEM STATUS JOGO                   =
=============================================*/

        ModuloQuestao01.SemStatusView = Backbone.Marionette.ItemView.extend({
            template: "#semestado"
        });

        /*=============================================
=           LISTA STATUS JOGO                 =
=============================================*/

        ModuloQuestao01.ListaStatusView = Backbone.Marionette.CollectionView.extend({
            itemView: ModuloQuestao01.StatusView,
            emptyView: ModuloQuestao01.SemStatusView
        })

        /*=============================================
=               acoes JOGO                    =
=============================================*/
        ModuloQuestao01.acoesView = Backbone.Marionette.ItemView.extend({
            template: "#acoes",

  

            events:
            {
                'click #acoes' : 'acoes',
                'click label#proximapergunta' : 'proxima'
            },

            proxima: function()
            {
	
                var nivelQuestao=auxestado.at(0).attributes.nivel;
                JogoApp.vent.trigger("VerificarSeVenceu",nivelQuestao);
                JogoApp.vent.trigger("NovaQuestao");
		
            },

            acoes: function()
            {

                // No array JogoApp.Modulos, os nomes atribuídos em cada módulo deve ser igual ao definido no ficheiro 59.js !
                var tipo = "01";
                $.each(JogoApp.Modulos, function(index, value)
                {
                    if(JogoApp.Modulos[index] === tipo)
                    {
                        JogoApp.vent.trigger("ValidarResposta" + tipo);
                    }
                });

        
                //console.log(auxresposta);
				//console.log(auxpontuacao);
            }


        });

        /*=============================================
=               SEM acoes VIEW                =
=============================================*/
        ModuloQuestao01.SemacoesView = Backbone.Marionette.ItemView.extend({
            template: "#semacoes"
        });

        /*=============================================
=               LISTA acoes                   =
=============================================*/

        ModuloQuestao01.ListaacoesView = Backbone.Marionette.CollectionView.extend({
            itemView: ModuloQuestao01.acoesView,
            emptyView: ModuloQuestao01.SemacoesView
        });

        /*=============================================
=               FUNÇÔES LISTENERS             =
=============================================*/

        JogoApp.vent.on("Questao01", function(num)
        {		

            if(num === undefined)
            {
                var legendasx = new ModuloQuestao01.Respostas(AUX.at(0).attributes.legendas);

                auxlayout.rresposta.show(new ModuloQuestao01.ListaRespostaView({
                    collection: legendasx
                }));

                var num = {
                    Numero : 1
                };
            } else {

                JogoApp.main.show(auxlayout);

                var minhaperguntaview = new ModuloQuestao01.ListaPerguntaView({
                    collection: AUX
                });
                auxlayout.rpergunta.show(minhaperguntaview);

                // for(var j= 0; j < auxlegenda.length; j++)
                // {
                //  $("#resposta01").append("<input type='radio' name='rb' id='radio"+j+"'/>" + auxlegenda[j] + "<br/>");
                // }; 
        
                // var string = $("#resposta01").html();
                // console.log(string);

                var legendasx = new ModuloQuestao01.Respostas(AUX.at(0).attributes.legendas);

                auxlayout.rresposta.show(new ModuloQuestao01.ListaRespostaView({
                    collection: legendasx
                }));
        
                // acoes

                auxlayout.racoes.show(new ModuloQuestao01.acoesView());

                // ESTADO

                var meuestadoview = new ModuloQuestao01.ListaStatusView({
                    collection: auxestado
                });
		
                JogoApp.status.show(meuestadoview);

                $("#resposta01").empty();

                num.Numero = 1;
            }

        });


        JogoApp.vent.on("ValidarResposta01", function()
        {
							
            var contador = 0;
            var estaChecked=false;
			
switch(auxTipoJogo){
	case "2":
				
				 for(var j= 0; j < auxlegenda.length; j++)
				{
					
					var aux = auxlegenda[j].legenda;
					var bol = $($("input[name='rb']")[j]).is(":checked");			
					// parece não atribuir os IDs corretamente
					if(bol === true)
					{
						estaChecked=true;
						if(NIVEL==1){
							pontuacao=parseInt(auxpontuacao[j]);
						}
						else{
							pontuacao=parseInt(auxpontuacao[j])+parseInt(pontuacao);
						}
						
					}   
					if(bol==auxresposta[j])
					{
						contador = contador + 1;
					}
					
				};
				//alert(pontuacao);
				//SE NAO HOUVER CAMPOS SELECIONADOS ENTRA NESTE IF 
						
				if(estaChecked===false)
				{
					auxestado.at(0).attributes.vidas=auxestado.at(0).attributes.vidas-1
					var meuestadoview = new ModuloQuestao01.ListaStatusView({
						collection: auxestado
					});
					JogoApp.status.show(meuestadoview);
									
					if(auxestado.at(0).attributes.vidas <=0 ){
						if(localStorage.getItem('idioma')=="pt")
						{
							$("#myModal").reveal();
							$("#ModalDescricao").html("Deve selecionar uma opção para continuar");
							$("#ModalTitulo").html("");
						}
						else{
							$("#myModal").reveal();
							$("#ModalDescricao").html("You must select an option in order to proceed");
							$("#ModalTitulo").html("");
						}
					}
					else{
						var gameOverUrl =tempo.at(0).attributes.generalConf.gameOverUrl
						location.href = gameOverUrl;
					}
				}
				//SE NÃO ENTRA NESTE ELSE
				else{
					
						//VERIFICAR SE VENCEU O JOGO VERIFICANDO SE ESTE É O ULTIMO NIVEL
						var nivelQuestao=auxestado.at(0).attributes.nivel;		
						JogoApp.vent.trigger("VerificarSeVenceu",nivelQuestao);
						//VERIFICA SE A MENSAGEM DE PARABENS E O TITULO É DIFERENTE DE NULL, SE SIM ENTÃO MOSTRA
						if(auxmsgcertaTitulo!= null&&auxmsgcertaDescricao!=null)
						{
							//PARAR O RELOGIO DE CONTAR
							$('#fancyClock').tzineClock({
								stopClock:true
							});
							//MOSTRAR MENSAGEM DE PARABÉNS
							$("#myModal").reveal({
								close: function(){
									JogoApp.vent.trigger("NovaQuestao");
								},
							});
									
							$('#ModalDescricao').html(auxmsgcertaDescricao);
							$("#ModalTitulo").html(auxmsgcertaTitulo);
						}
						else{
							JogoApp.vent.trigger("NovaQuestao");
						};
					
				}
				
	break;
	default:
            for(var j= 0; j < auxlegenda.length; j++)
            {
                var aux = auxlegenda[j].legenda;
                var bol = $($("input[name='rb']")[j]).is(":checked");
                //console.log(aux + " : " + bol);
							
								
                // parece não atribuir os IDs corretamente

                if(bol === true)
                {
                    bol = 1;
                    estaChecked=true;
					if(NIVEL==1){
						pontuacao=auxpontuacao[j];
					}
					else{
						pontuacao=auxpontuacao[j]+pontuacao;
					}
                }          
                else
                {
                    bol = 0;
                }
                if(bol==auxresposta[j])
                {
                    contador = contador + 1;
                }

            };
			
			
            //SE NAO HOUVER CAMPOS SELECIONADOS ENTRA NESTE IF 
					
            if(estaChecked===false)
            {
                auxestado.at(0).attributes.vidas=auxestado.at(0).attributes.vidas-1
                var meuestadoview = new ModuloQuestao01.ListaStatusView({
                    collection: auxestado
                });
                JogoApp.status.show(meuestadoview);
								
                if(auxestado.at(0).attributes.vidas >0 ){
                    if(localStorage.getItem('idioma')=="pt")
						{
							$("#myModal").reveal();
							$("#ModalDescricao").html("Deve selecionar uma opção para continuar");
							$("#ModalTitulo").html("");
						}
						else{
							$("#myModal").reveal();
							$("#ModalDescricao").html("You must select an option in order to proceed");
							$("#ModalTitulo").html("");
						}
                }
                else{
                    var gameOverUrl =tempo.at(0).attributes.generalConf.gameOverUrl
                    location.href = gameOverUrl;
                }
            }
            //SE NÃO ENTRA NESTE ELSE
            else{
                if(contador===auxlegenda.length)
                {
                    //VERIFICAR SE VENCEU O JOGO VERIFICANDO SE ESTE É O ULTIMO NIVEL
                    var nivelQuestao=auxestado.at(0).attributes.nivel;		
                    JogoApp.vent.trigger("VerificarSeVenceu",nivelQuestao);
                    //VERIFICA SE A MENSAGEM DE PARABENS E O TITULO É DIFERENTE DE NULL, SE SIM ENTÃO MOSTRA
                    if(auxmsgcertaTitulo!= null&&auxmsgcertaDescricao!=null)
                    {
                        //PARAR O RELOGIO DE CONTAR
                        $('#fancyClock').tzineClock({
                            stopClock:true
                        });
                        //MOSTRAR MENSAGEM DE PARABÉNS
                        $("#myModal").reveal({
                            close: function(){
                                JogoApp.vent.trigger("NovaQuestao");
                            },
                        });
								
                        $('#ModalDescricao').html(auxmsgcertaDescricao);
                        $("#ModalTitulo").html(auxmsgcertaTitulo);
                    }
                    else{
                        JogoApp.vent.trigger("NovaQuestao");
                    };
                }
                else
                {
							
                    auxestado.at(0).attributes.vidas=auxestado.at(0).attributes.vidas-1
                    var meuestadoview = new ModuloQuestao01.ListaStatusView({
                        collection: auxestado
                    });
                    JogoApp.status.show(meuestadoview);
                    if(auxestado.at(0).attributes.vidas >0 ){
                        $("#myModal").reveal();
                        $("#ModalDescricao").html("Resposta errada!");
                        $("#ModalTitulo").html("");
							
                        for(var j= 0; j < auxlegenda.length; j++){
                            $($("input[name='rb']")[j]).prop('checked',false)
                        }
                    }
                    else{
                        var gameOverUrl =tempo.at(0).attributes.generalConf.gameOverUrl
                        location.href = gameOverUrl;
                    }
														       
                }
            }
			}
        });


        /*=============================================
=	       	   INITIALIZER MQUESTAO01  		  =
=============================================*/

        ModuloQuestao01.addInitializer(function()
        {
            var Template01 = 
            [
            '<script type="text/template" id="resposta01">' + 
            '<input type="radio" name="rb" id=<%=legenda.split(" ").join("_")%> ></input><label class="labelRadio" for="<%=legenda.split(" ").join("_")%>"><%=legenda%></label><br/>' +
            '</script>',
            ];

            JogoAppTemplates.templates.push(Template01.toString());
            JogoApp.Modulos.push("01");
            JogoAppTemplates.init();

        });


    });


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
        this.bindEvents();
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
    // function, we must explicity call 'app.receivedEvent(...);'
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


var mygamepathPT =
{
jogoID: 38,
NomeJogo: "pegada ecológica",
TempoTotal: "36",
dataInicioJogo: "2013-05-14 04:03:30",
dataFimJogo: "2014-05-14 04:03:30",
urlImagemBGJ: "",
urlLogoTipo: "assets/Uploads/38/logo_lab.png",
tipoJogo: "2",
Paths: [
{
questions: [
{
generalConf: {
tipo: "01",
grupo: "alojamento",
vidas: "0",
nivel: "1",
tempo: "60",
qID: 43,
gameOverUrl: "gameOverPT.html",
nextScreenUrl: "erro.html",
limitetempo: "60",
urlImagemBGP: null,
urlImagemAuP: "assets/Uploads/38/alojamento5.png",
dataInicialHoraInicial: null,
dataFinalHoraFinal: null
},
customConf: {
pergunta: "Em que tipo de casa vives?",
resposta: [
"0",
"0"
],
numeroItems: "",
imgSrc: "",
withResetButton: "0",
legendas: [
{
legenda: "apartamento"
},
{
legenda: "moradia"
}
],
pontuacao: [
"20",
"40"
],
help: null,
withMenu: "0",
tracks: null,
followUpPage: null,
helpTitle: null,
tracksTitle: null,
followUpPageTitle: null
}
},

{
generalConf: {
tipo: "01",
grupo: "alojamento",
vidas: "0",
nivel: "2",
tempo: "60",
qID: 40,
gameOverUrl: "gameOverPT.html",
nextScreenUrl: "erro.html",
limitetempo: "60",
urlImagemBGP: "assets/Uploads/38/background2.png",
urlImagemAuP: "assets/Uploads/38/alojamento2.png",
dataInicialHoraInicial: null,
dataFinalHoraFinal: null
},
customConf: {
pergunta: "Quantas pessoas moram em tua casa?",
resposta: [
"0",
"0",
"0",
"0",
"0"
],
numeroItems: "",
imgSrc: "",
withResetButton: "0",
legendas: [
{
legenda: "1"
},
{
legenda: "2"
},
{
legenda: "3"
},
{
legenda: "4"
},
{
legenda: "5 ou mais"
}
],
pontuacao: [
"30",
"25",
"20",
"15",
"10"
],
help: null,
withMenu: "0",
tracks: null,
followUpPage: null,
helpTitle: null,
tracksTitle: null,
followUpPageTitle: null
}
},
{
generalConf: {
tipo: "01",
grupo: "alojamento",
vidas: "0",
nivel: "3",
tempo: "60",
qID: 41,
gameOverUrl: "gameOverPT.html",
nextScreenUrl: "erro.html",
limitetempo: "60",
urlImagemBGP: null,
urlImagemAuP: "assets/Uploads/38/alojamento3.png",
dataInicialHoraInicial: null,
dataFinalHoraFinal: null
},
customConf: {
pergunta: "Qual o sistema de aquecimento da casa?",
resposta: [
"0",
"0",
"0",
"0",
"0"
],
numeroItems: "",
imgSrc: "",
withResetButton: "0",
legendas: [
{
legenda: "gás natural"
},
{
legenda: "electricidade"
},
{
legenda: "gasóleo"
},
{
legenda: "fontes renováveis (solar, eólica)"
},
{
legenda: "nenhum"
}
],
pontuacao: [
"30",
"40",
"50",
"0",
"0"
],
help: null,
withMenu: "0",
tracks: null,
followUpPage: null,
helpTitle: null,
tracksTitle: null,
followUpPageTitle: null
}
},
{
generalConf: {
tipo: "01",
grupo: "alojamento",
vidas: "0",
nivel: "4",
tempo: "60",
qID: 42,
gameOverUrl: "gameOverPT.html",
nextScreenUrl: "erro.html",
limitetempo: "60",
urlImagemBGP: null,
urlImagemAuP: "assets/Uploads/38/alojamento4.png",
dataInicialHoraInicial: null,
dataFinalHoraFinal: null
},
customConf: {
pergunta: "Quantas torneiras há em tua casa?",
resposta: [
"0",
"0",
"0",
"0",
"0"
],
numeroItems: "",
imgSrc: "",
withResetButton: "0",
legendas: [
{
legenda: "menos de 3"
},
{
legenda: "3 a 5"
},
{
legenda: "6 a 8"
},
{
legenda: "8 a 10"
},
{
legenda: "mais de 10"
}
],
pontuacao: [
"5",
"0",
"15",
"20",
"25"
],
help: null,
withMenu: "0",
tracks: null,
followUpPage: null,
helpTitle: null,
tracksTitle: null,
followUpPageTitle: null
}
},





{
generalConf: {
tipo: "01",
grupo: "alimentação",
vidas: "0",
nivel: "5",
tempo: "60",
qID: 44,
gameOverUrl: "gameOverPT.html",
nextScreenUrl: "erro.html",
limitetempo: "60",
urlImagemBGP: null,
urlImagemAuP: "assets/Uploads/38/alimentacao.png",
dataInicialHoraInicial: null,
dataFinalHoraFinal: null
},
customConf: {
pergunta: "Quantas refeições de carne ou de peixe comes por semana?",
resposta: [
"0",
"0",
"0",
"0",
"0"
],
numeroItems: "",
imgSrc: "",
withResetButton: "0",
legendas: [
{
legenda: "nenhuma"
},
{
legenda: "1 a 3"
},
{
legenda: "4 a 6"
},
{
legenda: "7 a 10"
},
{
legenda: "mais de 10"
}
],
pontuacao: [
"0",
"10",
"20",
"35",
"50"
],
help: null,
withMenu: "0",
tracks: null,
followUpPage: null,
helpTitle: null,
tracksTitle: null,
followUpPageTitle: null
}
},
{
generalConf: {
tipo: "01",
grupo: "alimentação",
vidas: "0",
nivel: "6",
tempo: "60",
qID: 45,
gameOverUrl: "gameOverPT.html",
nextScreenUrl: "erro.html",
limitetempo: "60",
urlImagemBGP: null,
urlImagemAuP: "assets/Uploads/38/alimentacao2.png",
dataInicialHoraInicial: null,
dataFinalHoraFinal: null
},
customConf: {
pergunta: "Quantas refeições feitas em casa é que comes por semana?",
resposta: [
"0",
"0",
"0",
"0"
],
numeroItems: "",
imgSrc: "",
withResetButton: "0",
legendas: [
{
legenda: "menos de 10"
},
{
legenda: "10 a 14"
},
{
legenda: "15 a 18"
},
{
legenda: "mais de 18"
}
],
pontuacao: [
"25",
"20",
"15",
"10"
],
help: null,
withMenu: "0",
tracks: null,
followUpPage: null,
helpTitle: null,
tracksTitle: null,
followUpPageTitle: null
}
},
{
generalConf: {
tipo: "01",
grupo: "alimentação",
vidas: "0",
nivel: "7",
tempo: "60",
qID: 46,
gameOverUrl: "gameOverPT.html",
nextScreenUrl: "erro.html",
limitetempo: "60",
urlImagemBGP: null,
urlImagemAuP: "assets/Uploads/38/alimentacao3.png",
dataInicialHoraInicial: null,
dataFinalHoraFinal: null
},
customConf: {
pergunta: "Procuras comprar alimentos produzidos localmente?",
resposta: [
"0",
"0",
"0",
"0"
],
numeroItems: "",
imgSrc: "",
withResetButton: "0",
legendas: [
{
legenda: "sim"
},
{
legenda: "não"
},
{
legenda: "às vezes"
},
{
legenda: "raramente"
}
],
pontuacao: [
"25",
"125",
"50",
"100"
],
help: null,
withMenu: "0",
tracks: null,
followUpPage: null,
helpTitle: null,
tracksTitle: null,
followUpPageTitle: null
}
},
{
generalConf: {
tipo: "01",
grupo: "transportes",
vidas: "0",
nivel: "8",
tempo: "60",
qID: 47,
gameOverUrl: "gameOverPT.html",
nextScreenUrl: "erro.html",
limitetempo: "60",
urlImagemBGP: null,
urlImagemAuP: "assets/Uploads/38/transporte2.png",
dataInicialHoraInicial: null,
dataFinalHoraFinal: null
},
customConf: {
pergunta: "Que tipo de meio de transporte tens?",
resposta: [
"0",
"0",
"0",
"0",
"0",
"0"
],
numeroItems: "",
imgSrc: "",
withResetButton: "0",
legendas: [
{
legenda: "nenhum"
},
{
legenda: "motociclo"
},
{
legenda: "baixa cilindrada (até 1200 c.c.)"
},
{
legenda: "média e alta cilindrada (a partir de 1200 c.c.)"
},
{
legenda: "carrinha"
},
{
legenda: "todo-o-terreno"
}
],
pontuacao: [
"0",
"35",
"75",
"75",
"100",
"130"
],
help: null,
withMenu: "0",
tracks: null,
followUpPage: null,
helpTitle: null,
tracksTitle: null,
followUpPageTitle: null
}
},
{
generalConf: {
tipo: "01",
grupo: "transportes",
vidas: "0",
nivel: "9",
tempo: "60",
qID: 48,
gameOverUrl: "gameOverPT.html",
nextScreenUrl: "erro.html",
limitetempo: "60",
urlImagemBGP: null,
urlImagemAuP: "assets/Uploads/38/transporte3.png",
dataInicialHoraInicial: null,
dataFinalHoraFinal: null
},
customConf: {
pergunta: "Como vais para o emprego?",
resposta: [
"0",
"0",
"0",
"0"
],
numeroItems: "",
imgSrc: "",
withResetButton: "0",
legendas: [
{
legenda: "carro"
},
{
legenda: "à boleia"
},
{
legenda: "transportes públicos"
},
{
legenda: "bicicleta ou a pé"
}
],
pontuacao: [
"60",
"30",
"15",
"0"
],
help: null,
withMenu: "0",
tracks: null,
followUpPage: null,
helpTitle: null,
tracksTitle: null,
followUpPageTitle: null
}
},
{
generalConf: {
tipo: "01",
grupo: "transportes",
vidas: "0",
nivel: "10",
tempo: "60",
qID: 50,
gameOverUrl: "gameOverPT.html",
nextScreenUrl: "erro.html",
limitetempo: "60",
urlImagemBGP: null,
urlImagemAuP: "assets/Uploads/38/transporte4.png",
dataInicialHoraInicial: null,
dataFinalHoraFinal: null
},
customConf: {
pergunta: "Quantos quilómetros tens de percorrer de carro para chegar ao emprego?",
resposta: [
"0",
"0",
"0",
"0",
"0",
"0"
],
numeroItems: "",
imgSrc: "",
withResetButton: "0",
legendas: [
{
legenda: "eu vou a pé ou de bicicleta"
},
{
legenda: "menos de 10"
},
{
legenda: "entre 10 e 30"
},
{
legenda: "entre 30 e 50"
},
{
legenda: "entre 50 e 100"
},
{
legenda: "mais de 100"
}
],
pontuacao: [
"0",
"10",
"20",
"30",
"60",
"80"
],
help: null,
withMenu: "0",
tracks: null,
followUpPage: null,
helpTitle: null,
tracksTitle: null,
followUpPageTitle: null
}
},
{
generalConf: {
tipo: "01",
grupo: "transportes",
vidas: "0",
nivel: "11",
tempo: "60",
qID: 51,
gameOverUrl: "gameOverPT.html",
nextScreenUrl: "erro.html",
limitetempo: "60",
urlImagemBGP: null,
urlImagemAuP: "assets/Uploads/38/transporte5.png",
dataInicialHoraInicial: null,
dataFinalHoraFinal: null
},
customConf: {
pergunta: "Aonde foste nas últimas férias?",
resposta: [
"0",
"0",
"0",
"0",
"0"
],
numeroItems: "",
imgSrc: "",
withResetButton: "0",
legendas: [
{
legenda: "a lado nenhum"
},
{
legenda: "fiquei em Portugal (continente)"
},
{
legenda: "fui a Espanha (continente)"
},
{
legenda: "fiquei pela Europa, países Africanos próximos, ou fui aos Açores ou Madeira"
},
{
legenda: "saí da Europa, fui para longe"
}
],
pontuacao: [
"0",
"10",
"20",
"30",
"50"
],
help: null,
withMenu: "0",
tracks: null,
followUpPage: null,
helpTitle: null,
tracksTitle: null,
followUpPageTitle: null
}
},
{
generalConf: {
tipo: "01",
grupo: "transportes",
vidas: "0",
nivel: "12",
tempo: "60",
qID: 49,
gameOverUrl: "gameOverPT.html",
nextScreenUrl: "erro.html",
limitetempo: "60",
urlImagemBGP: null,
urlImagemAuP: "assets/Uploads/38/transporte6.png",
dataInicialHoraInicial: null,
dataFinalHoraFinal: null
},
customConf: {
pergunta: "Durante o ano, quantos são os fins-de-semana em que viajas de carro (mínimo de 20km de distância)",
resposta: [
"0",
"0",
"0",
"0",
"0"
],
numeroItems: "",
imgSrc: "",
withResetButton: "0",
legendas: [
{
legenda: "0"
},
{
legenda: "1 a 3"
},
{
legenda: "4 a 6"
},
{
legenda: "7 a 9"
},
{
legenda: "mais de 9"
}
],
pontuacao: [
"0",
"10",
"20",
"30",
"40"
],
help: null,
withMenu: "0",
tracks: null,
followUpPage: null,
helpTitle: null,
tracksTitle: null,
followUpPageTitle: null
}
},
{
generalConf: {
tipo: "01",
grupo: "consumo",
vidas: "0",
nivel: "13",
tempo: "60",
qID: 52,
gameOverUrl: "gameOverPT.html",
nextScreenUrl: "erro.html",
limitetempo: "60",
urlImagemBGP: null,
urlImagemAuP: "assets/Uploads/38/consumo.png",
dataInicialHoraInicial: null,
dataFinalHoraFinal: null
},
customConf: {
pergunta: "Quantas compras significativas fizeste (ou os teus pais...) em 2013? (por exemplo: TV, vídeo, computador, mobílias, etc...)",
resposta: [
"0",
"0",
"0",
"0"
],
numeroItems: "",
imgSrc: "",
withResetButton: "0",
legendas: [
{
legenda: "0"
},
{
legenda: "1 a 3"
},
{
legenda: "4 a 6"
},
{
legenda: "mais de 6"
}
],
pontuacao: [
"0",
"15",
"30",
"45"
],
help: null,
withMenu: "0",
tracks: null,
followUpPage: null,
helpTitle: null,
tracksTitle: null,
followUpPageTitle: null
}
},
{
generalConf: {
tipo: "01",
grupo: "consumo",
vidas: "0",
nivel: "14",
tempo: "60",
qID: 53,
gameOverUrl: "gameOverPT.html",
nextScreenUrl: "erro.html",
limitetempo: "60",
urlImagemBGP: null,
urlImagemAuP: "assets/Uploads/38/consumo2.png",
dataInicialHoraInicial: null,
dataFinalHoraFinal: null
},
customConf: {
pergunta: "Costumas comprar produtos de baixo consumo de energia?",
resposta: [
"0",
"0"
],
numeroItems: "",
imgSrc: "",
withResetButton: "0",
legendas: [
{
legenda: "sim"
},
{
legenda: "não"
}
],
pontuacao: [
"0",
"25"
],
help: null,
withMenu: "0",
tracks: null,
followUpPage: null,
helpTitle: null,
tracksTitle: null,
followUpPageTitle: null
}
},
{
generalConf: {
tipo: "01",
grupo: "resíduos",
vidas: "0",
nivel: "15",
tempo: "60",
qID: 54,
gameOverUrl: "gameOverPT.html",
nextScreenUrl: "erro.html",
limitetempo: "60",
urlImagemBGP: null,
urlImagemAuP: "assets/Uploads/38/residuos.png",
dataInicialHoraInicial: null,
dataFinalHoraFinal: null
},
customConf: {
pergunta: "Procuras reduzir a produção de resíduos? (por exemplo: evitas produtos com muita embalagem, reutilizas papel, evitas os sacos de plástico, etc. )",
resposta: [
"0",
"0",
"0",
"0"
],
numeroItems: "",
imgSrc: "",
withResetButton: "0",
legendas: [
{
legenda: "sempre"
},
{
legenda: "às vezes"
},
{
legenda: "raramente"
},
{
legenda: "nunca"
}
],
pontuacao: [
"0",
"10",
"20",
"30"
],
help: null,
withMenu: "0",
tracks: null,
followUpPage: null,
helpTitle: null,
tracksTitle: null,
followUpPageTitle: null
}
},
{
generalConf: {
tipo: "01",
grupo: "resíduos",
vidas: "0",
nivel: "16",
tempo: "60",
qID: 55,
gameOverUrl: "gameOverPT.html",
nextScreenUrl: "erro.html",
limitetempo: "60",
urlImagemBGP: null,
urlImagemAuP: "assets/Uploads/38/residuos2.png",
dataInicialHoraInicial: null,
dataFinalHoraFinal: null
},
customConf: {
pergunta: "Praticas compostagem dos resíduos orgânicos?",
resposta: [
"0",
"0",
"0"
],
numeroItems: "",
imgSrc: "",
withResetButton: "0",
legendas: [
{
legenda: "sempre"
},
{
legenda: "às vezes"
},
{
legenda: "nunca"
}
],
pontuacao: [
"0",
"10",
"20"
],
help: null,
withMenu: "0",
tracks: null,
followUpPage: null,
helpTitle: null,
tracksTitle: null,
followUpPageTitle: null
}
},
{
generalConf: {
tipo: "01",
grupo: "resíduos",
vidas: "0",
nivel: "17",
tempo: "60",
qID: 56,
gameOverUrl: "gameOverPT.html",
nextScreenUrl: "erro.html",
limitetempo: "60",
urlImagemBGP: null,
urlImagemAuP: "assets/Uploads/38/residuos3.png",
dataInicialHoraInicial: null,
dataFinalHoraFinal: null
},
customConf: {
pergunta: "Costumas triar o lixo e colocá-lo no ecoponto para ser reciclado?",
resposta: [
"0",
"0",
"0",
"0"
],
numeroItems: "",
imgSrc: "",
withResetButton: "0",
legendas: [
{
legenda: "sempre"
},
{
legenda: "às vezes"
},
{
legenda: "raramente"
},
{
legenda: "nunca"
}
],
pontuacao: [
"0",
"10",
"20",
"25"
],
help: null,
withMenu: "0",
tracks: null,
followUpPage: null,
helpTitle: null,
tracksTitle: null,
followUpPageTitle: null
}
},
{
generalConf: {
tipo: "01",
grupo: "resíduos",
vidas: "0",
nivel: "18",
tempo: "60",
qID: 57,
gameOverUrl: "gameOverPT.html",
nextScreenUrl: "erro.html",
limitetempo: "60",
urlImagemBGP: null,
urlImagemAuP: "assets/Uploads/38/residuos4.png",
dataInicialHoraInicial: null,
dataFinalHoraFinal: null
},
customConf: {
pergunta: "Quantos sacos do lixo é que produzes por semana?",
resposta: [
"0",
"0",
"0"
],
numeroItems: "",
imgSrc: "",
withResetButton: "0",
legendas: [
{
legenda: "1"
},
{
legenda: "2"
},
{
legenda: "3 ou mais"
}
],
pontuacao: [
"10",
"20",
"30"
],
help: null,
withMenu: "0",
tracks: null,
followUpPage: null,
helpTitle: null,
tracksTitle: null,
followUpPageTitle: null
}
}
]
}
]
}


var JogoAppTemplates = {
    templates: [
	


   '<script type="text/template" id="estado">' +
   
   '<% if(auxJogoID=="38"){ %>'+
   //SMALL
   '<div class="twelve columns row show-for-small">' +
	
		'<div class="six mobile-three columns"> '+
					'<a href="index.html" ><img class="alinharLogotipoPegada" alt="logótipo da pegada ecológica" src="assets/Uploads/38/logoPEGADA_mini.png"></a>'+
				'</div>'+
				'<div class="six  mobile-one columns">'+ 
					'<a href="http://www.t-t.pt" target="_blank"><img style="float:right;" class="alinharLogotipoIpeddy" alt="logótipo do ALL" src="assets/Uploads/38/logo_lab.png"></a>'+
				'</div>'+
		'<div  style="clear:both"></div>' +
		
		
		'<div  class="twelve columns centered alinharIcon">' +
		
		
		'<% if((grupo=="alojamento")||(grupo=="accommodation")){ %>'+	
			'<img src="assets/Uploads/38/alojamento_mini.png" />' +
			'<img src="assets/Uploads/38/alimentacaoneutraneutra_mini.png" />' +
			'<img src="assets/Uploads/38/transporteneutraneutra_mini.png" />' +
			'<img src="assets/Uploads/38/consumoneutraneutra_mini.png" />' +
			'<img src="assets/Uploads/38/residuosneutraneutra_mini.png" />' +
		'<% } %>'+
		'<% if((grupo=="alimentação")||(grupo=="food")){ %>'+	
			'<img src="assets/Uploads/38/alojamentoneutra_mini.png" />' +
			'<img src="assets/Uploads/38/alimentacao_mini.png" />' +
			'<img src="assets/Uploads/38/transporteneutraneutra_mini.png" />' +
			'<img src="assets/Uploads/38/consumoneutraneutra_mini.png" />' +
			'<img src="assets/Uploads/38/residuosneutraneutra_mini.png" />' +
		'<% } %>'+
		'<% if((grupo=="transportes")||(grupo=="transports")){ %>'+	
			'<img src="assets/Uploads/38/alojamentoneutra_mini.png" />' +
			'<img src="assets/Uploads/38/alimentacaoneutra_mini.png" />' +
			'<img src="assets/Uploads/38/transporte_mini.png" />' +
			'<img src="assets/Uploads/38/consumoneutraneutra_mini.png" />' +
			'<img src="assets/Uploads/38/residuosneutraneutra_mini.png" />' +
		'<% } %>'+
		'<% if((grupo=="consumo")||(grupo=="consumption")){ %>'+	
			'<img src="assets/Uploads/38/alojamentoneutra_mini.png" />' +
			'<img src="assets/Uploads/38/alimentacaoneutra_mini.png" />' +
			'<img src="assets/Uploads/38/transporteneutra_mini.png" />' +
			'<img src="assets/Uploads/38/consumo_mini.png" />' +
			'<img src="assets/Uploads/38/residuosneutraneutra_mini.png" />' +
		'<% } %>'+
		'<% if((grupo=="resíduos")||(grupo=="waste")){ %>'+	
			'<img src="assets/Uploads/38/alojamentoneutra_mini.png" />' +
			'<img src="assets/Uploads/38/alimentacaoneutra_mini.png" />' +
			'<img src="assets/Uploads/38/transporteneutra_mini.png" />' +
			'<img src="assets/Uploads/38/consumoneutra_mini.png" />' +
			'<img src="assets/Uploads/38/residuos_mini.png" />' +
		'<% } %>'+
		
	
		'</div>' +
		
    '</div>' +
   
   //large up
    '<div  class="twelve columns show-for-large-up">' +
	
		'<div class="two columns">' +
		
		' <a href="index.html" ><img class="alinharLogotipoPegada" alt="logótipo da pegada ecológica" src="assets/Uploads/38/logoPEGADA.png" /></a>' +
		'</div>' +
		'<div  class="eight  columns ">' +
		'<div  class="one column">' +
		' &nbsp;' +
		'</div>' +
		'<% if((grupo=="alojamento")||(grupo=="accommodation")){ %>'+	
			'<div style="text-align:center;"  class="two column alinharIcon"><img src="assets/Uploads/38/alojamento.png" /></div>' +
			'<div style="text-align:center;" class="two column alinharIcon"><img src="assets/Uploads/38/alimentacaoneutraneutra.png" /></div>' +
			'<div style="text-align:center;" class="two column alinharIcon"><img src="assets/Uploads/38/transporteneutraneutra.png" /></div>' +
			'<div style="text-align:center;" class="two column alinharIcon"><img src="assets/Uploads/38/consumoneutraneutra.png" /></div>' +
			'<div style="text-align:center;" class="two column alinharIcon"><img src="assets/Uploads/38/residuosneutraneutra.png" /></div>' +
		'<% } %>'+
		'<% if((grupo=="alimentação")||(grupo=="food")){ %>'+	
			'<div style="text-align:center;"  class="two column alinharIcon "><img src="assets/Uploads/38/alojamentoneutra.png" /></div>' +
			'<div style="text-align:center;" class="two column alinharIcon "><img src="assets/Uploads/38/alimentacao.png" /></div>' +
			'<div style="text-align:center;" class="two column alinharIcon"><img src="assets/Uploads/38/transporteneutraneutra.png" /></div>' +
			'<div style="text-align:center;" class="two column alinharIcon"><img src="assets/Uploads/38/consumoneutraneutra.png" /></div>' +
			'<div style="text-align:center;" class="two column alinharIcon"><img src="assets/Uploads/38/residuosneutraneutra.png" /></div>' +
		'<% } %>'+
		'<% if((grupo=="transportes")||(grupo=="transports")){ %>'+	
			'<div style="text-align:center;"  class="two column alinharIcon"><img src="assets/Uploads/38/alojamentoneutra.png" /></div>' +
			'<div style="text-align:center;" class="two column alinharIcon"><img src="assets/Uploads/38/alimentacaoneutra.png" /></div>' +
			'<div style="text-align:center;" class="two column alinharIcon"><img src="assets/Uploads/38/transporte.png" /></div>' +
			'<div style="text-align:center;" class="two column alinharIcon"><img src="assets/Uploads/38/consumoneutraneutra.png" /></div>' +
			'<div style="text-align:center;" class="two column alinharIcon"><img src="assets/Uploads/38/residuosneutraneutra.png" /></div>' +
		'<% } %>'+
		'<% if((grupo=="consumo")||(grupo=="consumption")){ %>'+	
			'<div style="text-align:center;"  class="two column alinharIcon"><img src="assets/Uploads/38/alojamentoneutra.png" /></div>' +
			'<div style="text-align:center;" class="two column alinharIcon"><img src="assets/Uploads/38/alimentacaoneutra.png" /></div>' +
			'<div style="text-align:center;" class="two column alinharIcon"><img src="assets/Uploads/38/transporteneutra.png" /></div>' +
			'<div style="text-align:center;" class="two column alinharIcon"><img src="assets/Uploads/38/consumo.png" /></div>' +
			'<div style="text-align:center;" class="two column alinharIcon"><img src="assets/Uploads/38/residuosneutraneutra.png" /></div>' +
		'<% } %>'+
		'<% if((grupo=="resíduos")||(grupo=="waste")){ %>'+	
			'<div style="text-align:center;"  class="two column alinharIcon"><img src="assets/Uploads/38/alojamentoneutra.png" /></div>' +
			'<div style="text-align:center;" class="two column alinharIcon"><img src="assets/Uploads/38/alimentacaoneutra.png" /></div>' +
			'<div style="text-align:center;" class="two column alinharIcon"><img src="assets/Uploads/38/transporteneutra.png" /></div>' +
			'<div style="text-align:center;" class="two column alinharIcon"><img src="assets/Uploads/38/consumoneutra.png" /></div>' +
			'<div style="text-align:center;" class="two column alinharIcon"><img src="assets/Uploads/38/residuos.png" /></div>' +
		'<% } %>'+
		
		'<div  class="one column">' +
		' &nbsp;' +
		'</div>' +
		'</div>' +
		'<div class="two  columns">' +
		' <a href="http://www.t-t.pt" target="_blank"><img class="alinharLogotipoIpeddy" alt="logótipo do ALL" src="assets/Uploads/38/logo_lab.png" /></a>' +
		'</div>' +
    '</div>' +
	'<div style="clear:both;"></div>'+
	
	//MEDIUM 
    '<div  class="twelve columns show-for-medium ">' +
	
		'<div class="two columns">' +
		
		' <a href="index.html" ><img class="alinharLogotipoPegada" alt="logótipo da pegada ecológica" src="assets/Uploads/38/logoPEGADA.png" /></a>' +
		'</div>' +
		'<div  class="eight  columns ">' +
		
		'<div  class="one column">' +
		' &nbsp;' +
		'</div>' +
		
		'<% if((grupo=="alojamento")||(grupo=="accommodation")){ %>'+	
			'<div style="text-align:center;"  class="two column alinharIcon"><img src="assets/Uploads/38/alojamento.png" /></div>' +
			'<div style="text-align:center;" class="two column alinharIcon"><img src="assets/Uploads/38/alimentacaoneutraneutra.png" /></div>' +
			'<div style="text-align:center;" class="two column alinharIcon"><img src="assets/Uploads/38/transporteneutraneutra.png" /></div>' +
			'<div style="text-align:center;" class="two column alinharIcon"><img src="assets/Uploads/38/consumoneutraneutra.png" /></div>' +
			'<div style="text-align:center;" class="two column alinharIcon"><img src="assets/Uploads/38/residuosneutraneutra.png" /></div>' +
		'<% } %>'+
		'<% if((grupo=="alimentação")||(grupo=="food")){ %>'+	
			'<div style="text-align:center;"  class="two column alinharIcon "><img src="assets/Uploads/38/alojamentoneutra.png" /></div>' +
			'<div style="text-align:center;" class="two column alinharIcon "><img src="assets/Uploads/38/alimentacao.png" /></div>' +
			'<div style="text-align:center;" class="two column alinharIcon"><img src="assets/Uploads/38/transporteneutraneutra.png" /></div>' +
			'<div style="text-align:center;" class="two column alinharIcon"><img src="assets/Uploads/38/consumoneutraneutra.png" /></div>' +
			'<div style="text-align:center;" class="two column alinharIcon"><img src="assets/Uploads/38/residuosneutraneutra.png" /></div>' +
		'<% } %>'+
		'<% if((grupo=="transportes")||(grupo=="transports")){ %>'+	
			'<div style="text-align:center;"  class="two column alinharIcon"><img src="assets/Uploads/38/alojamentoneutra.png" /></div>' +
			'<div style="text-align:center;" class="two column alinharIcon"><img src="assets/Uploads/38/alimentacaoneutra.png" /></div>' +
			'<div style="text-align:center;" class="two column alinharIcon"><img src="assets/Uploads/38/transporte.png" /></div>' +
			'<div style="text-align:center;" class="two column alinharIcon"><img src="assets/Uploads/38/consumoneutraneutra.png" /></div>' +
			'<div style="text-align:center;" class="two column alinharIcon"><img src="assets/Uploads/38/residuosneutraneutra.png" /></div>' +
		'<% } %>'+
		'<% if((grupo=="consumo")||(grupo=="consumption")){ %>'+	
			'<div style="text-align:center;"  class="two column alinharIcon"><img src="assets/Uploads/38/alojamentoneutra.png" /></div>' +
			'<div style="text-align:center;" class="two column alinharIcon"><img src="assets/Uploads/38/alimentacaoneutra.png" /></div>' +
			'<div style="text-align:center;" class="two column alinharIcon"><img src="assets/Uploads/38/transporteneutra.png" /></div>' +
			'<div style="text-align:center;" class="two column alinharIcon"><img src="assets/Uploads/38/consumo.png" /></div>' +
			'<div style="text-align:center;" class="two column alinharIcon"><img src="assets/Uploads/38/residuosneutraneutra.png" /></div>' +
		'<% } %>'+
		'<% if((grupo=="resíduos")||(grupo=="waste")){ %>'+	
			'<div style="text-align:center;"  class="two column alinharIcon"><img src="assets/Uploads/38/alojamentoneutra.png" /></div>' +
			'<div style="text-align:center;" class="two column alinharIcon"><img src="assets/Uploads/38/alimentacaoneutra.png" /></div>' +
			'<div style="text-align:center;" class="two column alinharIcon"><img src="assets/Uploads/38/transporteneutra.png" /></div>' +
			'<div style="text-align:center;" class="two column alinharIcon"><img src="assets/Uploads/38/consumoneutra.png" /></div>' +
			'<div style="text-align:center;" class="two column alinharIcon"><img src="assets/Uploads/38/residuos.png" /></div>' +
		'<% } %>'+
		
		'<div  class="one column">' +
		' &nbsp;' +
		'</div>' +
		'</div>' +
		
		'<div class="two  columns">' +
		' <img class="alinharLogotipoIpeddy" alt="logótipo do ALL" src="assets/Uploads/38/logo_lab.png" />' +
		'</div>' +
    '</div>' +
	'<div style="clear:both;"></div>'+
	
	//barras so para medium 
	'<div style="background:url(assets/Uploads/38/barraFundo.png) no-repeat  center center" class="twelve columns row show-for-medium  ">' +
		
		'<div    class="eight offset-by-two columns">' +
		'<div  class="one column">' +
		' &nbsp;' +
		'</div>' +

		'<% if((grupo=="alojamento")||(grupo=="accommodation")){ %>'+	
			'<div style="text-align:center;background:url(assets/Uploads/38/barra.png) no-repeat  center center"  class="two column">&nbsp;</div>' +
			'<div class="two column">&nbsp;</div>' +
			'<div class="two column">&nbsp;</div>' +
			'<div class="two column">&nbsp;</div>' +
			'<div class="two column">&nbsp;</div>' +
		'<% } %>'+
		'<% if((grupo=="alimentação")||(grupo=="food")){ %>'+	
			'<div class="two column">&nbsp;</div>' +
			'<div style="text-align:center;background:url(assets/Uploads/38/barra.png) no-repeat  center center"  class="two column">&nbsp;</div>' +
			'<div class="two column">&nbsp;</div>' +
			'<div class="two column">&nbsp;</div>' +
			'<div class="two column">&nbsp;</div>' +
		'<% } %>'+
		'<% if((grupo=="transportes")||(grupo=="transports")){ %>'+	
			'<div class="two column">&nbsp;</div>' +
			'<div class="two column">&nbsp;</div>' +
			'<div style="text-align:center;background:url(assets/Uploads/38/barra.png) no-repeat  center center"  class="two column">&nbsp;</div>' +
			'<div class="two column">&nbsp;</div>' +
			'<div class="two column">&nbsp;</div>' +
		'<% } %>'+
		'<% if((grupo=="consumo")||(grupo=="consumption")){ %>'+	
			'<div class="two column">&nbsp;</div>' +
			'<div class="two column">&nbsp;</div>' +
			'<div class="two column">&nbsp;</div>' +
			'<div style="text-align:center;background:url(assets/Uploads/38/barra.png) no-repeat  center center"  class="two column">&nbsp;</div>' +
			'<div class="two column">&nbsp;</div>' +
		'<% } %>'+
		'<% if((grupo=="resíduos")||(grupo=="waste")){ %>'+	
			'<div class="two column">&nbsp;</div>' +
			
			'<div class="two column">&nbsp;</div>' +
			'<div class="two column">&nbsp;</div>' +
			'<div class="two column">&nbsp;</div>' +
			'<div style="text-align:center;background:url(assets/Uploads/38/barra.png) no-repeat  center center"  class="two column">&nbsp;</div>' +
		'<% } %>'+
		
		'<div  class="one column">' +
		' &nbsp;' +
		'</div>' +
		'</div>' +
	'</div>' +
	
	//barras so para large-up 
	'<div style="background:url(assets/Uploads/38/barraFundo.png) no-repeat  center center" class="twelve columns row show-for-large-up ">' +
		
		'<div    class="eight offset-by-two columns">' +
		'<div  class="one column">' +
		' &nbsp;' +
		'</div>' +
		'<% if((grupo=="alojamento")||(grupo=="accommodation")){ %>'+	
			'<div style="text-align:center;background:url(assets/Uploads/38/barra.png) no-repeat  center center"  class="two column">&nbsp;</div>' +
			'<div class="two column">&nbsp;</div>' +
			'<div class="two column">&nbsp;</div>' +
			'<div class="two column">&nbsp;</div>' +
			'<div class="two column">&nbsp;</div>' +
		'<% } %>'+
		'<% if((grupo=="alimentação")||(grupo=="food")){ %>'+	
			'<div class="two column">&nbsp;</div>' +
		'<div style="text-align:center;background:url(assets/Uploads/38/barra.png) no-repeat  center center"  class="two column">&nbsp;</div>' +
			'<div class="two column">&nbsp;</div>' +
			'<div class="two column">&nbsp;</div>' +
			'<div class="two column">&nbsp;</div>' +
		'<% } %>'+
		'<% if((grupo=="transportes")||(grupo=="transports")){ %>'+	
			'<div class="two column">&nbsp;</div>' +
			'<div class="two column">&nbsp;</div>' +
			'<div style="text-align:center;background:url(assets/Uploads/38/barra.png) no-repeat  center center"  class="two column">&nbsp;</div>' +
			'<div class="two column">&nbsp;</div>' +
			'<div class="two column">&nbsp;</div>' +
		'<% } %>'+
		'<% if((grupo=="consumo")||(grupo=="consumption")){ %>'+	
			'<div class="two column">&nbsp;</div>' +
			'<div class="two column">&nbsp;</div>' +
			'<div class="two column">&nbsp;</div>' +
			'<div style="text-align:center;background:url(assets/Uploads/38/barra.png) no-repeat  center center"  class="two column">&nbsp;</div>' +
			'<div class="two column">&nbsp;</div>' +
		'<% } %>'+
		'<% if((grupo=="resíduos")||(grupo=="waste")){ %>'+	
			'<div class="two column">&nbsp;</div>' +
			
			'<div class="two column">&nbsp;</div>' +
			'<div class="two column">&nbsp;</div>' +
			'<div class="two column">&nbsp;</div>' +
			'<div style="text-align:center;background:url(assets/Uploads/38/barra.png) no-repeat  center center"  class="two column">&nbsp;</div>' +
		'<% } %>'+
		
		
		'<div  class="one column">' +
		' &nbsp;' +
		'</div>' +
		'</div>' +
	'</div>' +
	
	//barras so para small
	'<div style="background:url(assets/Uploads/38/barraFundo_mini.png) no-repeat  center center" class="twelve columns  show-for-small ">&nbsp;' +
		
	'</div>' +
	'<div style="clear:both;"></div>'+
	'<div id="oGrupo" class="twelve columns <%=grupo%>">' +
		'<div class="one column"></div><div class="eleven columns"><%=grupo%></div>' +
	'</div>' +
'<% }else{ %>'+	
    
    '<div style="height:168px" class="row">' +
	
		'<div  class="six columns">' +
		'<% if(auxTipoJogo=="2"){ %>'+
		' <b>Nível: </b><%=nivel%> <b>|</b><b>Pontuação:</b> <%=pontuacao%>' +
		'<% }else{ %>'+
		' <b>Nível: </b><%=nivel%> <b>'+
		'<% } %>'+
		'</div>' +
		'<div style="height:168px; text-align:right" class="six columns">' +
		
		' <img src="<%=urlImagemAuP%>" />' +
		'</div>' +
    '</div>' +
	'<% } %>'+
    '</script>',


    '<script type="text/template" id="semestado">' +
		'<div class="row">' +
		'<div class="twelve columns" style="margin-left: 10px">' +
		'' +
		'</div>' +
		'</div>' +
    '</script>',
//pagina de inicio
'<script type="text/template" id="inicio">' +

	
//portugues
	'<%if(auxIdioma=="pt"){%>'+
	
    '<div class="twelve columns ">' +
		
			'<div  class="twelve columns row centered show-for-small">'+
				'<div class="six  mobile-three columns"> '+
					'<a href="index.html" ><img class="alinharLogotipoPegada" alt="logótipo da pegada ecológica" src="assets/Uploads/38/logoPEGADA_mini.png"></a>'+
				'</div>'+
				'<div class="six  mobile-one columns">'+ 
					'<a href="http://www.t-t.pt" target="_blank"><img style="float:right;" class="alinharLogotipoIpeddy" alt="logótipo do ALL" src="assets/Uploads/38/logo_lab.png"></a>'+
				'</div>'+
			'</div>'+
			'<div  class="twelve columns row centered show-for-medium">'+
				'<div class="six mobile-two columns"> '+
					'<a href="index.html" ><img class="alinharLogotipoPegada" alt="logótipo da pegada ecológica" src="assets/Uploads/38/logoPEGADA.png"></a>'+
				'</div>'+
				'<div class="six mobile-two columns"> '+
					'<a href="http://www.t-t.pt" target="_blank"><img style="float:right;" class="alinharLogotipoIpeddy" alt="logótipo do ALL" src="assets/Uploads/38/logo_lab.png"></a>'+
				'</div>'+
			'</div>'+
			'<div  class="twelve columns row centered show-for-large show-for-xlarge">'+
				'<div class="six mobile-two columns">'+ 
					'<a href="index.html" ><img class="alinharLogotipoPegada" alt="logótipo da pegada ecológica" src="assets/Uploads/38/logoPEGADA.png"></a>'+
				'</div>'+
				'<div class="six mobile-two columns"> '+
					'<a href="http://www.t-t.pt" target="_blank"><img style="float:right;" class="alinharLogotipoIpeddy" alt="logótipo do ALL" src="assets/Uploads/38/logo_lab.png"></a>'+
				'</div>'+
			'</div>'+
	'<div style="height:5px;margin-top:2rem;margin-bottom:2rem;background:url(assets/Uploads/38/barraFundo.png) no-repeat  center center" class="twelve columns row "></div>'+
		'<div  class="ten columns row centered">'+
		
			
		'<div style="margin-top:2rem;" class="twelve mobile-four columns" >'+
			'<div style="text-align:right;margin-bottom:2rem;"  class="twelve columns row">'+
		
				'<p class="textoInicio">selecione idioma: <a href="JavaScript:setIdioma(\'pt\')"  >PORTUGUÊS</a> | <a href="JavaScript:setIdioma(\'en\')" >INGLÊS</a></p>'+
				
			'</div>'+
			
			'<div class="twelve columns row">'+
				'<p class="textoInicio">O Águeda Living Lab (ALL) ajuda-te a calcular a tua Pegada Ecológica. Responde a cada uma das perguntas selecionando uma das opções e pressiona o botão avançar. No final ser-te-ão apresentados os resultados.</p>' +
			'</div>'+
			
			'<div style="text-align:right;" class="twelve columns show-for-large-up" >'+		
				'<div  id="jogar"><img src="assets/Uploads/38/avancar.png" alt="botão avançar" /> </div>' +
			'</div>' +
			'<div style="text-align:right;" class="twelve columns show-for-medium" >'+		
				'<div  id="jogar"><img src="assets/Uploads/38/avancar.png" alt="botão avançar" /> </div>' +
			'</div>' +
			'</div>' +
		'</div>' +
		'<div  style="text-align:right;" class="twelve columns show-for-small" ><div  id="jogar"><img src="assets/Uploads/38/avancar.png" alt="botão avançar" /> </div></div>'+
		

	'</div>'+
		'<div style="margin-top:5rem!important;" data-role="footer" class="twelve columns  row centered ">'+
		'<div   class="ten columns row centered ">'+
			'<div  class="twelve  columns row hide-for-small ">'+
				
				'<div class="four  columns ">'+
					'<a href="http://www.pactodeautarcas.eu/media/videos_pt.html?videoid=101" target="_blank"><img  src="assets/Uploads/38/logo_pacto.png" alt="logótipo do Pacto de autarcas">	</a>'+
				'</div>'+
				'<div class="four  columns">'+
					'<a href="http://agueda21.wordpress.com/" target="_blank"><img  src="assets/Uploads/38/logo_agueda.png" alt="logótipo do Águeda XXI"></a>'+	
				'</div>'+
				
				'<div class="four   columns end">'+
					'<a href="http://www.t-t.pt/" target="_blank"><img  src="assets/Uploads/38/logo_t-t.png"  alt="logótipo da Talents &amp; Treasures"></a>'+	
				'</div>'+
				
			'</div>'+
		'</div>'+
			'<div  class="show-for-small twelve columns">'+
				
				'<div class="four columns ">'+
					'<a href="http://www.pactodeautarcas.eu/media/videos_pt.html?videoid=101" target="_blank"><img  src="assets/Uploads/38/logo_pacto.png" alt="logótipo do Pacto de autarcas">	</a>'+
				'</div>'+
				
				'<div class="four columns ">'+
					'<a href="http://agueda21.wordpress.com/" target="_blank"><img  src="assets/Uploads/38/logo_agueda.png" alt="logótipo do Águeda XXI"></a>'+	
				'</div>'+
				
				'<div class="four columns ">'+
					'<a href="http://www.t-t.pt/" target="_blank"><img  src="assets/Uploads/38/logo_t-t.png"  alt="logótipo da Talents &amp; Treasures"></a>'+	
					'</div>'+
			'</div>'+
		
	'</div>' +
//ENGLISH
	'<%} else{%>'+
	'<div class="twelve columns ">' +
		
			'<div  class="twelve columns row centered show-for-small">'+
				'<div class="six  mobile-three columns"> '+
					'<a href="index.html" ><img class="alinharLogotipoPegada" alt="logo of pegada ecológica" src="assets/Uploads/38/logoPEGADA_mini.png"></a>'+
				'</div>'+
				'<div class="six  mobile-one columns">'+ 
					'<a href="http://www.t-t.pt" target="_blank"><img style="float:right;" class="alinharLogotipoIpeddy" alt="logo of ALL" src="assets/Uploads/38/logo_lab.png"></a>'+
				'</div>'+
			'</div>'+
			'<div  class="twelve columns row centered show-for-medium">'+
				'<div class="six mobile-two columns"> '+
					'<a href="index.html" ><img class="alinharLogotipoPegada" alt="logo of pegada ecológica" src="assets/Uploads/38/logoPEGADA.png"></a>'+
				'</div>'+
				'<div class="six mobile-two columns"> '+
					'<a href="http://www.t-t.pt" target="_blank"><img style="float:right;" class="alinharLogotipoIpeddy" alt="logo of ALL" src="assets/Uploads/38/logo_lab.png"></a>'+
				'</div>'+
			'</div>'+
			'<div  class="twelve columns row centered show-for-large show-for-xlarge">'+
				'<div class="six mobile-two columns">'+ 
					'<a href="index.html" ><img class="alinharLogotipoPegada" alt="logo of pegada ecológica" src="assets/Uploads/38/logoPEGADA.png"></a>'+
				'</div>'+
				'<div class="six mobile-two columns"> '+
					'<a href="http://www.t-t.pt" target="_blank"><img style="float:right;" class="alinharLogotipoIpeddy" alt="logo of ALL" src="assets/Uploads/38/logo_lab.png"></a>'+
				'</div>'+
			'</div>'+
	'<div style="height:5px;margin-top:2rem;margin-bottom:2rem;background:url(assets/Uploads/38/barraFundo.png) no-repeat  center center" class="twelve columns row "></div>'+
		'<div  class="ten columns row centered">'+
		
			
		'<div style="margin-top:2rem;" class="twelve mobile-four columns" >'+
			'<div style="text-align:right;margin-bottom:2rem;" class="twelve columns row">'+
		
				'<p class="textoInicio">select language: <a href="JavaScript:setIdioma(\'pt\')"  >PORTUGUESE</a> | <a href="JavaScript:setIdioma(\'en\')" >ENGLISH</a></p>'+
			'</div>'+
			
			'<div class="twelve columns row">'+
				'<p class="textoInicio">Águeda Living Lab (ALL) will help you to calculate your Ecological Footprint. Answer  each question by selecting one of the options and press the next button. At the end you will be presented with your  results.</p>' +
			'</div>'+
				
				'<div style="text-align:right;" class="twelve columns show-for-large-up" >'+		
					'<div  id="jogar"><img src="assets/Uploads/38/avancar.png" alt="button next" /> </div>' +
				'</div>' +
				'<div style="text-align:right;" class="twelve columns show-for-medium" >'+		
					'<div  id="jogar"><img src="assets/Uploads/38/avancar.png" alt="button next" /> </div>' +
				'</div>' +
			'</div>' +
		'</div>' +
		'<div  style="text-align:right;" class="twelve columns show-for-small" ><div  id="jogar"><img src="assets/Uploads/38/avancar.png" alt="button next" /> </div></div>'+
		
		'<div style="margin-top:5rem!important" data-role="footer" class="twelve columns  row centered ">'+
		'<div   class="ten columns row centered ">'+
			'<div  class="twelve  columns row hide-for-small ">'+
				
				'<div class="four  columns ">'+
					'<a href="http://www.pactodeautarcas.eu/media/videos_pt.html?videoid=101" target="_blank"><img  src="assets/Uploads/38/logo_pacto.png" alt="logo of Pacto de autarcas">	</a>'+
				'</div>'+
				'<div class="four  columns">'+
					'<a href="http://agueda21.wordpress.com/" target="_blank"><img  src="assets/Uploads/38/logo_agueda.png" alt="logo of Águeda XXI"></a>'+	
				'</div>'+
				
				'<div class="four   columns end">'+
					'<a href="http://www.t-t.pt/" target="_blank"><img  src="assets/Uploads/38/logo_t-t.png"  alt="logo of Talents &amp; Treasures"></a>'+	
				'</div>'+
				
			'</div>'+
		'</div>'+
			'<div  class="show-for-small twelve columns">'+
				
				'<div class="four columns ">'+
					'<a href="http://www.pactodeautarcas.eu/media/videos_pt.html?videoid=101" target="_blank"><img  src="assets/Uploads/38/logo_pacto.png" alt="logo of Pacto de autarcas">	</a>'+
				'</div>'+
				
				'<div class="four columns ">'+
					'<a href="http://agueda21.wordpress.com/" target="_blank"><img  src="assets/Uploads/38/logo_agueda.png" alt="logo of Águeda XXI"></a>'+	
				'</div>'+
				
				'<div class="four columns ">'+
					'<a href="http://www.t-t.pt/" target="_blank"><img  src="assets/Uploads/38/logo_t-t.png"  alt="logo of Talents &amp; Treasures"></a>'+	
					'</div>'+
			'</div>'+
		
	'</div>' +
	'<%}%>'+
    '</script>',
//principal
    '<script type="text/template" id="principal">' +
    '<div >' +
		'<div class="twelve columns">' +
			'<div class="one column">'+
				'<%if(minhaperguntaresposta.at(0).attributes.tracks&&minhaperguntaresposta.at(0).attributes.tracksTitle){%>'+
						'<i class="general foundicon-idea" id="pista" style="font-size: 28px;"></i>'  +
					'<%}%>'+
			'</div>' +
			'<div class="ten columns">' +
				'<span id="regiao_pergunta"></span>' +
			'</div>' +
			'<div class="one column" style="text-align: right">' +
				'<%if(minhaperguntaresposta.at(0).attributes.help&&minhaperguntaresposta.at(0).attributes.helpTitle){%>'+
				'<i class="accessibility foundicon-question" style="font-size: 28px;" id="ajuda"></i>' +
				'<%}%>'+
			'</div>' +
		'</div>' +
		'<div class="twelve columns">' +
			'<div class="one column">' +
			'</div>' +
			'<div class="eleven columns">' +
				'<span id="regiao_puzzle" style="float: left"></span><span id="regiao_resposta" style="float: left"></span><span id="regiao_imagem" style="float: right"></span>'+
			'</div>' +
			'<div class="three columns">'+
				'<span id="regiao_respostastipo"></span>' +
			'</div>' +
		'</div>' +
		'<br /><br />'+
		'<div data-role="footer" class="twelve columns	row" >' +
			'<div style="text-align:right;" class="ten centered columns row">' +
			
				
					'<span id="regiao_acoes"></span>'+
				
			
			'</div>' +
		'</div>' +
    '</div>' +
    '</script>',

    '<script type="text/template" id="acoes">' +
	
	'<div class="twelve mobile-two  columns show-for-large-up">' +
		'<i  id="acoes" style="font-size: 28px;text-align:right;"><img src="assets/Uploads/38/avancar.png" alt="botão avançar"></i>' +
		//'&nbsp;&nbsp;<label class="label radius label success" id="proximapergunta">&gt;&gt;</label>' +
	'</div>'+
	'<div class="twelve mobile-two  columns show-for-medium">' +
		'<i  id="acoes" style="font-size: 28px;text-align:right;"><img src="assets/Uploads/38/avancar.png" alt="botão avançar"></i>' +
		//'&nbsp;&nbsp;<label class="label radius label success" id="proximapergunta">&gt;&gt;</label>' +
	'</div>'+
	'<div class="twelve  columns show-for-small">' +
		'<i  id="acoes" style="font-size: 28px;text-align:right;"><img src="assets/Uploads/38/avancar.png" alt="botão avançar"></i>' +
		//'&nbsp;&nbsp;<label class="label radius label success" id="proximapergunta">&gt;&gt;</label>' +
	'</div>'+
	'<div class="six mobile-three columns">' +
		'<div id="fancyClock"></div>' +	
	'</div>'+
    '</script>',

    '<script type="text/template" id="semacoes">' +
    ' ' +       
    '</script>',


    '<script type="text/template" id="pergunta">' +
	
		'<%=pergunta%> ' +
	
    '</script>',

    '<script type="text/template" id="semresposta">' +
    ' '+
    '</script>',

    '<script type="text/template" id="sempergunta">' +
    ' '+
    '</script>',

    '<script type="text/template" id="respostatipo">'+
    ' ' +
    '</script>',

    '<script type="text/template" id="imagem">' +
    '<img src="<%=imgSrc%>" />' +

    '</script>',

    '<script type="text/template" id="semimagem">' +
    ' ' +
    '</script>',

    ],

    init: function(){
        //depois do load da interface no cliente, faz um ciclo, percorrendo todas as strings com templates e coloca-as no div #templatesZone na página.
		
        $.each(JogoAppTemplates.templates, function(index, value){
            $("#templatesZone").append(value);
        });
    }

}

/*
 * Funções de validação para questões de jogos
 * Rui Isidro, 2012
 * www.ipeddy.eu
 * 02/02/2012
 *
 * TIPO DE QUESTÃO: 03 - Texto Livre Palavra
 */

/*
 * declaração da "classe" gameOver
 */
var gameOver = {
	conetividade : null,

	formatDateTime : function() {
		var data = new Date();
		//devolve a data actual do sistema
		var returnStr = "";
		returnStr = data.getFullYear().toString() + data.getMonth().toString() + data.getDay().toString() + data.getHours().toString() + data.getMinutes().toString() + data.getSeconds().toString() + data.getMilliseconds().toString();
		return returnStr;
	},
	/*
	 *
	 *Devolve a data actual.
	 *ATENÇÃO_:  Usar esta função em detrimento de usar o object Date(), porque o json.stringify, não suporte datas "estrangeiras", ou seja ignora o GMT.
	 *ISTO NÃO SE FAZ!!! ESTA FUNÇÃO ESTÁ DUPLICADA AQUI E EM gamePath_2!!!!!!
	 **/
	dateTimeGame : function() {
		var data = new Date();
		//truque para definir a hora correcta em função do GMT (+1h para portugal...)
		data.setHours(data.getHours() - data.getTimezoneOffset() / 60);
		return data;
	},

	/*
	 Função que envia dados para oservidor. PRIMEIRO verifica se há conectividade e apenas depois envia os dados.
	 * */
	sendToServer : function(callBackOk, callBackErro) {
		if (gameOver.conetividade === null || gameOver.conetividade === false) {
			callBackErro("Sem conectividade / No network");
		} else {
			gameOver.sendData2WebServer(callBackOk, callBackErro);
		}
	},

	/*
	 função que envia os dados para o servidor. Deve ser chamada depois de verificar que
	 existe conectividades...
	 * */
	sendData2WebServer : function(callBackOk, callBackErro) {
		jQuery.ajax({
			type : 'GET', //ou POST depende de como os dados vão para o servidor
			url : 'http://www.ipeddy.eu/home/registarPegada', //vai ser alterado depois para o servidor correcto
			dataType : 'jsonp', //atenção que o post é cross domain, por isso temos de usar o JSONP
			success : function(mydata) {
				//quando o envio termina os dados que o servidor devolve são apanhados aqui
				if ( typeof (callBackOk) !== "undefined") {

					callBackOk(mydata);
				}
			},
			beforeSend : function() {

				jQuery("#form").trigger('reveal:close');
				//jQuery("#gifSending").show();

			},
			error : function(jqXHR, textStatus, errorThrown) {

				if ( typeof (callBackErro) !== "undefined") {
					callBackErro(textStatus);
				}

			},
			//preparação dos dados a enviar...
			data : {
				nd : gameOver.formatDateTime(), //isto apenas garante que se todo o pedido for igual a um anterior ele será enviado novamente

				Nome : localStorage.getItem("nome"),
				Email : localStorage.getItem("email"),
				Pontuacao : localStorage.getItem("pontuacao")
			},
			async : true
		});

	},

	enviarDados : function(callBackOk, callBackErro) {

		localStorage.setItem('nome', jQuery("#nome").val());

		if (gameOver.validateEmail(jQuery("#email").val())) {
			localStorage.setItem('email', jQuery("#email").val());
			gameOver.sendToServer(callBackOk, callBackErro);
		} else {
			if (localStorage.getItem("idioma") == "pt")
				alert('queira, por favor inserir um email válido');
			else
				alert('please insert a valid email');
		}

	},

	validateEmail : function(email) {
		var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		return re.test(email);
	},

	showOk : function() {
		//jQuery("#gifSending").hide();

		//jQuery("#form").css("display", "none");
		jQuery("#form").trigger('reveal:close');
	},

	showErro : function(mensagem) {
		//jQuery("#gifSending").hide();
		
		jQuery("#form").trigger('reveal:close');
		
		if (localStorage.getItem("idioma") == "pt") {
			if ( typeof (mensagem) !== "undefined") {
				alert("Sem conectividade: erro a gravar...");
			} else {
				alert("erro a gravar...");
			}
		} else {
			if ( typeof (mensagem) !== "undefined") {
				alert("No network: erro a gravar...");
			} else {
				alert("error saving...");
			}
		}
		

	}
};

function onGameOverReady() {
	var networkState = navigator.connection.type;
	
	if (Connection.NONE === networkState || Connection.UNKNOWN === networkState) {
		gameOver.conetividade = false;
	} else {
		gameOver.conetividade = true;
	}
	

	//se o local storage for nulo, vazio, = o teu email = you email ou igual a info@t-t.pt
	if ((localStorage.getItem('email') == null) || (localStorage.getItem('email') == "") || (localStorage.getItem('email') == "o teu email") || (localStorage.getItem('email') == "your email") || (localStorage.getItem('email') == "info@t-t.pt")) {
		jQuery("#form").reveal({
			closeOnBackgroundClick : false
		});
	}

	if ((localStorage.getItem('nome') != null) && (localStorage.getItem('nome') != "") && (localStorage.getItem('nome') != "o teu nome") && (localStorage.getItem('nome') != "your name") && (localStorage.getItem('nome') != "anónimo")) {
		jQuery("#nome").val(localStorage.getItem('nome'));

	}

	if ((localStorage.getItem('email') != null) && (localStorage.getItem('email') != "") && (localStorage.getItem('email') != "o teu email") && (localStorage.getItem('email') != "your email") && (localStorage.getItem('email') != "info@t-t.pt")) {
		jQuery("#email").val(localStorage.getItem('email'));

		//jQuery("#form").css("display","none");
		gameOver.enviarDados(gameOver.showOk, gameOver.showErro);

	}

	jQuery("#btnSubmit").click(function(e) {
		e.preventDefault();
		gameOver.enviarDados(gameOver.showOk, gameOver.showErro);
	});

	jQuery("#btnCancel").click(function(e) {
		e.preventDefault();
		localStorage.setItem('email', 'info@t-t.pt');
		jQuery("#email").val(localStorage.getItem('email'));
		localStorage.setItem('nome', 'anónimo');
		jQuery("#nome").val(localStorage.getItem('nome'))
		gameOver.enviarDados(gameOver.showOk, gameOver.showErro);
	});
	
}

/*
 *INICIALIZAÇÃO DO RENDER DA PÁGINA
 *
 **/
jQuery(function() {

	// Wait for Cordova to load
	//
	document.addEventListener("deviceready", onGameOverReady, false);

});


var mygamepathEN =
{
jogoID: 38,
NomeJogo: "pegada ecológica",
TempoTotal: "36",
dataInicioJogo: "2013-05-14 04:03:30",
dataFimJogo: "2014-05-14 04:03:30",
urlImagemBGJ: "",
urlLogoTipo: "assets/Uploads/38/logo_lab.png",
tipoJogo: "2",
Paths: [
{
questions: [
{
generalConf: {
tipo: "01",
grupo: "accommodation",
vidas: "0",
nivel: "1",
tempo: "60",
qID: 43,
gameOverUrl: "gameOverEN.html",
nextScreenUrl: "erro.html",
limitetempo: "60",
urlImagemBGP: null,
urlImagemAuP: "assets/Uploads/38/alojamento5.png",
dataInicialHoraInicial: null,
dataFinalHoraFinal: null
},
customConf: {
pergunta: "In what kind of house you live?",
resposta: [
"0",
"0"
],
numeroItems: "",
imgSrc: "",
withResetButton: "0",
legendas: [
{
legenda: "apartment"
},
{
legenda: "dwelling"
}
],
pontuacao: [
"20",
"40"
],
help: null,
withMenu: "0",
tracks: null,
followUpPage: null,
helpTitle: null,
tracksTitle: null,
followUpPageTitle: null
}
},

{
generalConf: {
tipo: "01",
grupo: "accommodation",
vidas: "0",
nivel: "2",
tempo: "60",
qID: 40,
gameOverUrl: "gameOverEN.html",
nextScreenUrl: "erro.html",
limitetempo: "60",
urlImagemBGP: "assets/Uploads/38/background2.png",
urlImagemAuP: "assets/Uploads/38/alojamento2.png",
dataInicialHoraInicial: null,
dataFinalHoraFinal: null
},
customConf: {
pergunta: "How many people live in your house?",
resposta: [
"0",
"0",
"0",
"0",
"0"
],
numeroItems: "",
imgSrc: "",
withResetButton: "0",
legendas: [
{
legenda: "1"
},
{
legenda: "2"
},
{
legenda: "3"
},
{
legenda: "4"
},
{
legenda: "5 or more"
}
],
pontuacao: [
"30",
"25",
"20",
"15",
"10"
],
help: null,
withMenu: "0",
tracks: null,
followUpPage: null,
helpTitle: null,
tracksTitle: null,
followUpPageTitle: null
}
},
{
generalConf: {
tipo: "01",
grupo: "accommodation",
vidas: "0",
nivel: "3",
tempo: "60",
qID: 41,
gameOverUrl: "gameOverEN.html",
nextScreenUrl: "erro.html",
limitetempo: "60",
urlImagemBGP: null,
urlImagemAuP: "assets/Uploads/38/alojamento3.png",
dataInicialHoraInicial: null,
dataFinalHoraFinal: null
},
customConf: {
pergunta: "What is the heating system of your house?",
resposta: [
"0",
"0",
"0",
"0",
"0"
],
numeroItems: "",
imgSrc: "",
withResetButton: "0",
legendas: [
{
legenda: "natural gas"
},
{
legenda: "electricity"
},
{
legenda: "diesel oil"
},
{
legenda: "renewable sources (solar, wind)"
},
{
legenda: "none"
}
],
pontuacao: [
"30",
"40",
"50",
"0",
"0"
],
help: null,
withMenu: "0",
tracks: null,
followUpPage: null,
helpTitle: null,
tracksTitle: null,
followUpPageTitle: null
}
},
{
generalConf: {
tipo: "01",
grupo: "accommodation",
vidas: "0",
nivel: "4",
tempo: "60",
qID: 42,
gameOverUrl: "gameOverEN.html",
nextScreenUrl: "erro.html",
limitetempo: "60",
urlImagemBGP: null,
urlImagemAuP: "assets/Uploads/38/alojamento4.png",
dataInicialHoraInicial: null,
dataFinalHoraFinal: null
},
customConf: {
pergunta: "How many taps are there in your house?",
resposta: [
"0",
"0",
"0",
"0",
"0"
],
numeroItems: "",
imgSrc: "",
withResetButton: "0",
legendas: [
{
legenda: "less than 3"
},
{
legenda: "3 to 5"
},
{
legenda: "6 to 8"
},
{
legenda: "8 a 10"
},
{
legenda: "more than 10"
}
],
pontuacao: [
"5",
"0",
"15",
"20",
"25"
],
help: null,
withMenu: "0",
tracks: null,
followUpPage: null,
helpTitle: null,
tracksTitle: null,
followUpPageTitle: null
}
},





{
generalConf: {
tipo: "01",
grupo: "food",
vidas: "0",
nivel: "5",
tempo: "60",
qID: 44,
gameOverUrl: "gameOverEN.html",
nextScreenUrl: "erro.html",
limitetempo: "60",
urlImagemBGP: null,
urlImagemAuP: "assets/Uploads/38/alimentacao.png",
dataInicialHoraInicial: null,
dataFinalHoraFinal: null
},
customConf: {
pergunta: "How many meals of meat or fish do you do per week?",
resposta: [
"0",
"0",
"0",
"0",
"0"
],
numeroItems: "",
imgSrc: "",
withResetButton: "0",
legendas: [
{
legenda: "none"
},
{
legenda: "1 to 3"
},
{
legenda: "4 to 6"
},
{
legenda: "7 to 10"
},
{
legenda: "more than 10"
}
],
pontuacao: [
"0",
"10",
"20",
"35",
"50"
],
help: null,
withMenu: "0",
tracks: null,
followUpPage: null,
helpTitle: null,
tracksTitle: null,
followUpPageTitle: null
}
},
{
generalConf: {
tipo: "01",
grupo: "food",
vidas: "0",
nivel: "6",
tempo: "60",
qID: 45,
gameOverUrl: "gameOverEN.html",
nextScreenUrl: "erro.html",
limitetempo: "60",
urlImagemBGP: null,
urlImagemAuP: "assets/Uploads/38/alimentacao2.png",
dataInicialHoraInicial: null,
dataFinalHoraFinal: null
},
customConf: {
pergunta: "How many homemade meals do you eat per week?",
resposta: [
"0",
"0",
"0",
"0"
],
numeroItems: "",
imgSrc: "",
withResetButton: "0",
legendas: [
{
legenda: "less than 10"
},
{
legenda: "10 to 14"
},
{
legenda: "15 to 18"
},
{
legenda: "more than 18"
}
],
pontuacao: [
"25",
"20",
"15",
"10"
],
help: null,
withMenu: "0",
tracks: null,
followUpPage: null,
helpTitle: null,
tracksTitle: null,
followUpPageTitle: null
}
},
{
generalConf: {
tipo: "01",
grupo: "food",
vidas: "0",
nivel: "7",
tempo: "60",
qID: 46,
gameOverUrl: "gameOverEN.html",
nextScreenUrl: "erro.html",
limitetempo: "60",
urlImagemBGP: null,
urlImagemAuP: "assets/Uploads/38/alimentacao3.png",
dataInicialHoraInicial: null,
dataFinalHoraFinal: null
},
customConf: {
pergunta: "Do you buy locally produced food?",
resposta: [
"0",
"0",
"0",
"0"
],
numeroItems: "",
imgSrc: "",
withResetButton: "0",
legendas: [
{
legenda: "yes"
},
{
legenda: "no"
},
{
legenda: "sometimes"
},
{
legenda: "rarely"
}
],
pontuacao: [
"25",
"125",
"50",
"100"
],
help: null,
withMenu: "0",
tracks: null,
followUpPage: null,
helpTitle: null,
tracksTitle: null,
followUpPageTitle: null
}
},
{
generalConf: {
tipo: "01",
grupo: "transports",
vidas: "0",
nivel: "8",
tempo: "60",
qID: 47,
gameOverUrl: "gameOverEN.html",
nextScreenUrl: "erro.html",
limitetempo: "60",
urlImagemBGP: null,
urlImagemAuP: "assets/Uploads/38/transporte2.png",
dataInicialHoraInicial: null,
dataFinalHoraFinal: null
},
customConf: {
pergunta: "What kind of transportation do you have?",
resposta: [
"0",
"0",
"0",
"0",
"0",
"0"
],
numeroItems: "",
imgSrc: "",
withResetButton: "0",
legendas: [
{
legenda: "none"
},
{
legenda: "motorcycle"
},
{
legenda: "low capacity (up to 1200 d.c.)"
},
{
legenda: "medium and high capacity (from 1200 c.c.)"
},
{
legenda: "van"
},
{
legenda: "all-terrain"
}
],
pontuacao: [
"0",
"35",
"75",
"75",
"100",
"130"
],
help: null,
withMenu: "0",
tracks: null,
followUpPage: null,
helpTitle: null,
tracksTitle: null,
followUpPageTitle: null
}
},
{
generalConf: {
tipo: "01",
grupo: "transports",
vidas: "0",
nivel: "9",
tempo: "60",
qID: 48,
gameOverUrl: "gameOverEN.html",
nextScreenUrl: "erro.html",
limitetempo: "60",
urlImagemBGP: null,
urlImagemAuP: "assets/Uploads/38/transporte3.png",
dataInicialHoraInicial: null,
dataFinalHoraFinal: null
},
customConf: {
pergunta: "How do you go to work?",
resposta: [
"0",
"0",
"0",
"0"
],
numeroItems: "",
imgSrc: "",
withResetButton: "0",
legendas: [
{
legenda: "car"
},
{
legenda: "hitchhiking"
},
{
legenda: "public transport"
},
{
legenda: "bike or walk"
}
],
pontuacao: [
"60",
"30",
"15",
"0"
],
help: null,
withMenu: "0",
tracks: null,
followUpPage: null,
helpTitle: null,
tracksTitle: null,
followUpPageTitle: null
}
},
{
generalConf: {
tipo: "01",
grupo: "transports",
vidas: "0",
nivel: "10",
tempo: "60",
qID: 50,
gameOverUrl: "gameOverEN.html",
nextScreenUrl: "erro.html",
limitetempo: "60",
urlImagemBGP: null,
urlImagemAuP: "assets/Uploads/38/transporte4.png",
dataInicialHoraInicial: null,
dataFinalHoraFinal: null
},
customConf: {
pergunta: "How many km you have to travel by car to get to work?",
resposta: [
"0",
"0",
"0",
"0",
"0",
"0"
],
numeroItems: "",
imgSrc: "",
withResetButton: "0",
legendas: [
{
legenda: "I'll walk or bike"
},
{
legenda: "less than 10"
},
{
legenda: "between 10 and 30"
},
{
legenda: "between 30 and 50"
},
{
legenda: "between 50 and 100"
},
{
legenda: "more than 100"
}
],
pontuacao: [
"0",
"10",
"20",
"30",
"60",
"80"
],
help: null,
withMenu: "0",
tracks: null,
followUpPage: null,
helpTitle: null,
tracksTitle: null,
followUpPageTitle: null
}
},
{
generalConf: {
tipo: "01",
grupo: "transports",
vidas: "0",
nivel: "11",
tempo: "60",
qID: 51,
gameOverUrl: "gameOverEN.html",
nextScreenUrl: "erro.html",
limitetempo: "60",
urlImagemBGP: null,
urlImagemAuP: "assets/Uploads/38/transporte5.png",
dataInicialHoraInicial: null,
dataFinalHoraFinal: null
},
customConf: {
pergunta: "Where did you go on last vacation?",
resposta: [
"0",
"0",
"0",
"0",
"0"
],
numeroItems: "",
imgSrc: "",
withResetButton: "0",
legendas: [
{
legenda: "nowhere"
},
{
legenda: "I stayed in Portugal (mainland)"
},
{
legenda: "I went to Spain (mainland)"
},
{
legenda: "I went to Europe, close African countries or went to the Azores or Madeira"
},
{
legenda: "I left Europe, went far away"
}
],
pontuacao: [
"0",
"10",
"20",
"30",
"50"
],
help: null,
withMenu: "0",
tracks: null,
followUpPage: null,
helpTitle: null,
tracksTitle: null,
followUpPageTitle: null
}
},
{
generalConf: {
tipo: "01",
grupo: "transports",
vidas: "0",
nivel: "12",
tempo: "60",
qID: 49,
gameOverUrl: "gameOverEN.html",
nextScreenUrl: "erro.html",
limitetempo: "60",
urlImagemBGP: null,
urlImagemAuP: "assets/Uploads/38/transporte6.png",
dataInicialHoraInicial: null,
dataFinalHoraFinal: null
},
customConf: {
pergunta: "During the year, how many the weekends did you travel by car (at least 20km away)",
resposta: [
"0",
"0",
"0",
"0",
"0"
],
numeroItems: "",
imgSrc: "",
withResetButton: "0",
legendas: [
{
legenda: "0"
},
{
legenda: "1 to 3"
},
{
legenda: "4 to 6"
},
{
legenda: "7 to 9"
},
{
legenda: "more than 9"
}
],
pontuacao: [
"0",
"10",
"20",
"30",
"40"
],
help: null,
withMenu: "0",
tracks: null,
followUpPage: null,
helpTitle: null,
tracksTitle: null,
followUpPageTitle: null
}
},
{
generalConf: {
tipo: "01",
grupo: "consumption",
vidas: "0",
nivel: "13",
tempo: "60",
qID: 52,
gameOverUrl: "gameOverEN.html",
nextScreenUrl: "erro.html",
limitetempo: "60",
urlImagemBGP: null,
urlImagemAuP: "assets/Uploads/38/consumo.png",
dataInicialHoraInicial: null,
dataFinalHoraFinal: null
},
customConf: {
pergunta: "How many significant purchases did you (or your parents) do in 2013? (eg, TV, video, computer,  etc ...)",
resposta: [
"0",
"0",
"0",
"0"
],
numeroItems: "",
imgSrc: "",
withResetButton: "0",
legendas: [
{
legenda: "0"
},
{
legenda: "1 to 3"
},
{
legenda: "4 to 6"
},
{
legenda: "more than 6"
}
],
pontuacao: [
"0",
"15",
"30",
"45"
],
help: null,
withMenu: "0",
tracks: null,
followUpPage: null,
helpTitle: null,
tracksTitle: null,
followUpPageTitle: null
}
},
{
generalConf: {
tipo: "01",
grupo: "consumption",
vidas: "0",
nivel: "14",
tempo: "60",
qID: 53,
gameOverUrl: "gameOverEN.html",
nextScreenUrl: "erro.html",
limitetempo: "60",
urlImagemBGP: null,
urlImagemAuP: "assets/Uploads/38/consumo2.png",
dataInicialHoraInicial: null,
dataFinalHoraFinal: null
},
customConf: {
pergunta: "Do you usually buy products with low power consumption?",
resposta: [
"0",
"0"
],
numeroItems: "",
imgSrc: "",
withResetButton: "0",
legendas: [
{
legenda: "yes"
},
{
legenda: "no"
}
],
pontuacao: [
"0",
"25"
],
help: null,
withMenu: "0",
tracks: null,
followUpPage: null,
helpTitle: null,
tracksTitle: null,
followUpPageTitle: null
}
},
{
generalConf: {
tipo: "01",
grupo: "waste",
vidas: "0",
nivel: "15",
tempo: "60",
qID: 54,
gameOverUrl: "gameOverEN.html",
nextScreenUrl: "erro.html",
limitetempo: "60",
urlImagemBGP: null,
urlImagemAuP: "assets/Uploads/38/residuos.png",
dataInicialHoraInicial: null,
dataFinalHoraFinal: null
},
customConf: {
pergunta: "Do you try to reduce waste production? (for example, avoiding a lot of packaging products, reusing paper, avoiding plastic bags, etc.).",
resposta: [
"0",
"0",
"0",
"0"
],
numeroItems: "",
imgSrc: "",
withResetButton: "0",
legendas: [
{
legenda: "always"
},
{
legenda: "sometimes"
},
{
legenda: "rarely"
},
{
legenda: "never"
}
],
pontuacao: [
"0",
"10",
"20",
"30"
],
help: null,
withMenu: "0",
tracks: null,
followUpPage: null,
helpTitle: null,
tracksTitle: null,
followUpPageTitle: null
}
},
{
generalConf: {
tipo: "01",
grupo: "waste",
vidas: "0",
nivel: "16",
tempo: "60",
qID: 55,
gameOverUrl: "gameOverEN.html",
nextScreenUrl: "erro.html",
limitetempo: "60",
urlImagemBGP: null,
urlImagemAuP: "assets/Uploads/38/residuos2.png",
dataInicialHoraInicial: null,
dataFinalHoraFinal: null
},
customConf: {
pergunta: "Do you practice composting of organic waste?",
resposta: [
"0",
"0",
"0"
],
numeroItems: "",
imgSrc: "",
withResetButton: "0",
legendas: [
{
legenda: "always"
},
{
legenda: "sometimes"
},
{
legenda: "never"
}
],
pontuacao: [
"0",
"10",
"20"
],
help: null,
withMenu: "0",
tracks: null,
followUpPage: null,
helpTitle: null,
tracksTitle: null,
followUpPageTitle: null
}
},
{
generalConf: {
tipo: "01",
grupo: "waste",
vidas: "0",
nivel: "17",
tempo: "60",
qID: 56,
gameOverUrl: "gameOverEN.html",
nextScreenUrl: "erro.html",
limitetempo: "60",
urlImagemBGP: null,
urlImagemAuP: "assets/Uploads/38/residuos3.png",
dataInicialHoraInicial: null,
dataFinalHoraFinal: null
},
customConf: {
pergunta: "Do you usually separate the trash and put it in the recycle bin to be recycled?",
resposta: [
"0",
"0",
"0",
"0"
],
numeroItems: "",
imgSrc: "",
withResetButton: "0",
legendas: [
{
legenda: "always"
},
{
legenda: "sometimes"
},
{
legenda: "rarely"
},
{
legenda: "never"
}
],
pontuacao: [
"0",
"10",
"20",
"25"
],
help: null,
withMenu: "0",
tracks: null,
followUpPage: null,
helpTitle: null,
tracksTitle: null,
followUpPageTitle: null
}
},
{
generalConf: {
tipo: "01",
grupo: "waste",
vidas: "0",
nivel: "18",
tempo: "60",
qID: 57,
gameOverUrl: "gameOverEN.html",
nextScreenUrl: "erro.html",
limitetempo: "60",
urlImagemBGP: null,
urlImagemAuP: "assets/Uploads/38/residuos4.png",
dataInicialHoraInicial: null,
dataFinalHoraFinal: null
},
customConf: {
pergunta: "How many bags of garbage do you produce per week?",
resposta: [
"0",
"0",
"0"
],
numeroItems: "",
imgSrc: "",
withResetButton: "0",
legendas: [
{
legenda: "1"
},
{
legenda: "2"
},
{
legenda: "3 or more"
}
],
pontuacao: [
"10",
"20",
"30"
],
help: null,
withMenu: "0",
tracks: null,
followUpPage: null,
helpTitle: null,
tracksTitle: null,
followUpPageTitle: null
}
}
]
}
]
}



//======================================================== FASTCLICK
         function FastButton(element, handler) {
            this.element = element;
            this.handler = handler;
            element.addEventListener('touchstart', this, false);
         };
         FastButton.prototype.handleEvent = function(event) {
            switch (event.type) {
               case 'touchstart': this.onTouchStart(event); break;
               case 'touchmove': this.onTouchMove(event); break;
               case 'touchend': this.onClick(event); break;
               case 'click': this.onClick(event); break;
            }
         };
         FastButton.prototype.onTouchStart = function(event) {
            
event.stopPropagation();
            this.element.addEventListener('touchend', this, false);
            document.body.addEventListener('touchmove', this, false);
            this.startX = event.touches[0].clientX;
            this.startY = event.touches[0].clientY;
 isMoving = false;
         };
         FastButton.prototype.onTouchMove = function(event) {
            if(Math.abs(event.touches[0].clientX - this.startX) > 10 || Math.abs(event.touches[0].clientY - this.startY) > 10) {
               this.reset();
            }
         };
         FastButton.prototype.onClick = function(event) {
            this.reset();
            this.handler(event);
            if(event.type == 'touchend') {
               preventGhostClick(this.startX, this.startY);
            }
         };
         FastButton.prototype.reset = function() {
            this.element.removeEventListener('touchend', this, false);
            document.body.removeEventListener('touchmove', this, false);
         };
         function preventGhostClick(x, y) {
            coordinates.push(x, y);
            window.setTimeout(gpop, 2500);
         };
         function gpop() {
            coordinates.splice(0, 2);
         };
         function gonClick(event) {
            for(var i = 0; i < coordinates.length; i += 2) {
               var x = coordinates[i];
               var y = coordinates[i + 1];
               if(Math.abs(event.clientX - x) < 25 && Math.abs(event.clientY - y) < 25) {
                  event.stopPropagation();
                  event.preventDefault();
               }
            }
         };
         document.addEventListener('click', gonClick, true);
         var coordinates = [];
         function initFastButtons() {
 new FastButton(document.getElementById("fastclick"), goSomewhere);
         };
         function goSomewhere() {
 var theTarget = document.elementFromPoint(this.startX, this.startY);
 if(theTarget.nodeType == 3) theTarget = theTarget.parentNode;
 
 var theEvent = document.createEvent('MouseEvents');
 theEvent.initEvent('click', true, true);
 theTarget.dispatchEvent(theEvent);
         };
//========================================================


/*=============================================
=            APLICAÇÃO			              =
=============================================*/

var JogoApp = new Backbone.Marionette.Application();

JogoApp.Modulos = [];

/*==============================================
=            REGIÕES APLICAÇÃO 	              =
==============================================*/

JogoApp.addRegions({
    status: '#status',
    main: '#main'
});

/*=============================================
=            INITIALIZER APLICAÇÃO            =
=============================================*/

JogoApp.addInitializer(function() { 

    });

/*==============================================
=            INICIAR APLICAÇÃO	              =
==============================================*/

$(document).ready(function(){
	//Activa script que torna clicks mais rápidos.
	initFastButtons();

// Your code here
//caracteristicas gerais do jogo
	window.pontuacao=0;
	window.auxJogoID=null;
	window.auxNomeJogo=null;
	window.auxTempoTotal=null;
	window.auxDataInicioJogo=null;
	window.auxDataFimJogo=null;
	window.auxUrlImagemBGJ=null;
	window.auxUrlLogoTipo=null;
	window.auxTipoJogo=null;

	
// AUXILIAR PARA CRIAR AS possíveis respostas
    window.AUX = null;
    window.auxlegenda = null;
    window.auxresposta = null;
	window.auxpontuacao = 0;
//para instanciar o layout
    window.auxlayout = null;
	window.auxGRUPO = null;
    window.auxmsgcertaTitulo = null;
    window.auxmsgcertaDescricao = null;
    window.auxtipo = null;
    window.auxestado = null;
    window.auxpergunta = null;
    window.tempo = null;
    window.pergunta8 = null;
    window.pergunta10 = null;
    window.valorPergunta = 0;
    window.NIVEL = 1;
    window.nMaxNiveis = 0;
    window.randompaths = null;
	var query = window.location.href;
	var vars = query.split("/");

    if(vars[vars.length-1]==38){
		window.auxJogoID=38;
	}
	else{
		JogoAppTemplates.init();
	}
	
    JogoApp.start();
	
	

});




(function(){var n=this,t=n._,r={},e=Array.prototype,u=Object.prototype,i=Function.prototype,a=e.push,o=e.slice,c=e.concat,l=u.toString,f=u.hasOwnProperty,s=e.forEach,p=e.map,v=e.reduce,h=e.reduceRight,g=e.filter,d=e.every,m=e.some,y=e.indexOf,b=e.lastIndexOf,x=Array.isArray,_=Object.keys,j=i.bind,w=function(n){return n instanceof w?n:this instanceof w?(this._wrapped=n,void 0):new w(n)};"undefined"!=typeof exports?("undefined"!=typeof module&&module.exports&&(exports=module.exports=w),exports._=w):n._=w,w.VERSION="1.4.3";var A=w.each=w.forEach=function(n,t,e){if(null!=n)if(s&&n.forEach===s)n.forEach(t,e);else if(n.length===+n.length){for(var u=0,i=n.length;i>u;u++)if(t.call(e,n[u],u,n)===r)return}else for(var a in n)if(w.has(n,a)&&t.call(e,n[a],a,n)===r)return};w.map=w.collect=function(n,t,r){var e=[];return null==n?e:p&&n.map===p?n.map(t,r):(A(n,function(n,u,i){e[e.length]=t.call(r,n,u,i)}),e)};var O="Reduce of empty array with no initial value";w.reduce=w.foldl=w.inject=function(n,t,r,e){var u=arguments.length>2;if(null==n&&(n=[]),v&&n.reduce===v)return e&&(t=w.bind(t,e)),u?n.reduce(t,r):n.reduce(t);if(A(n,function(n,i,a){u?r=t.call(e,r,n,i,a):(r=n,u=!0)}),!u)throw new TypeError(O);return r},w.reduceRight=w.foldr=function(n,t,r,e){var u=arguments.length>2;if(null==n&&(n=[]),h&&n.reduceRight===h)return e&&(t=w.bind(t,e)),u?n.reduceRight(t,r):n.reduceRight(t);var i=n.length;if(i!==+i){var a=w.keys(n);i=a.length}if(A(n,function(o,c,l){c=a?a[--i]:--i,u?r=t.call(e,r,n[c],c,l):(r=n[c],u=!0)}),!u)throw new TypeError(O);return r},w.find=w.detect=function(n,t,r){var e;return E(n,function(n,u,i){return t.call(r,n,u,i)?(e=n,!0):void 0}),e},w.filter=w.select=function(n,t,r){var e=[];return null==n?e:g&&n.filter===g?n.filter(t,r):(A(n,function(n,u,i){t.call(r,n,u,i)&&(e[e.length]=n)}),e)},w.reject=function(n,t,r){return w.filter(n,function(n,e,u){return!t.call(r,n,e,u)},r)},w.every=w.all=function(n,t,e){t||(t=w.identity);var u=!0;return null==n?u:d&&n.every===d?n.every(t,e):(A(n,function(n,i,a){return(u=u&&t.call(e,n,i,a))?void 0:r}),!!u)};var E=w.some=w.any=function(n,t,e){t||(t=w.identity);var u=!1;return null==n?u:m&&n.some===m?n.some(t,e):(A(n,function(n,i,a){return u||(u=t.call(e,n,i,a))?r:void 0}),!!u)};w.contains=w.include=function(n,t){return null==n?!1:y&&n.indexOf===y?-1!=n.indexOf(t):E(n,function(n){return n===t})},w.invoke=function(n,t){var r=o.call(arguments,2);return w.map(n,function(n){return(w.isFunction(t)?t:n[t]).apply(n,r)})},w.pluck=function(n,t){return w.map(n,function(n){return n[t]})},w.where=function(n,t){return w.isEmpty(t)?[]:w.filter(n,function(n){for(var r in t)if(t[r]!==n[r])return!1;return!0})},w.max=function(n,t,r){if(!t&&w.isArray(n)&&n[0]===+n[0]&&65535>n.length)return Math.max.apply(Math,n);if(!t&&w.isEmpty(n))return-1/0;var e={computed:-1/0,value:-1/0};return A(n,function(n,u,i){var a=t?t.call(r,n,u,i):n;a>=e.computed&&(e={value:n,computed:a})}),e.value},w.min=function(n,t,r){if(!t&&w.isArray(n)&&n[0]===+n[0]&&65535>n.length)return Math.min.apply(Math,n);if(!t&&w.isEmpty(n))return 1/0;var e={computed:1/0,value:1/0};return A(n,function(n,u,i){var a=t?t.call(r,n,u,i):n;e.computed>a&&(e={value:n,computed:a})}),e.value},w.shuffle=function(n){var t,r=0,e=[];return A(n,function(n){t=w.random(r++),e[r-1]=e[t],e[t]=n}),e};var F=function(n){return w.isFunction(n)?n:function(t){return t[n]}};w.sortBy=function(n,t,r){var e=F(t);return w.pluck(w.map(n,function(n,t,u){return{value:n,index:t,criteria:e.call(r,n,t,u)}}).sort(function(n,t){var r=n.criteria,e=t.criteria;if(r!==e){if(r>e||void 0===r)return 1;if(e>r||void 0===e)return-1}return n.index<t.index?-1:1}),"value")};var k=function(n,t,r,e){var u={},i=F(t||w.identity);return A(n,function(t,a){var o=i.call(r,t,a,n);e(u,o,t)}),u};w.groupBy=function(n,t,r){return k(n,t,r,function(n,t,r){(w.has(n,t)?n[t]:n[t]=[]).push(r)})},w.countBy=function(n,t,r){return k(n,t,r,function(n,t){w.has(n,t)||(n[t]=0),n[t]++})},w.sortedIndex=function(n,t,r,e){r=null==r?w.identity:F(r);for(var u=r.call(e,t),i=0,a=n.length;a>i;){var o=i+a>>>1;u>r.call(e,n[o])?i=o+1:a=o}return i},w.toArray=function(n){return n?w.isArray(n)?o.call(n):n.length===+n.length?w.map(n,w.identity):w.values(n):[]},w.size=function(n){return null==n?0:n.length===+n.length?n.length:w.keys(n).length},w.first=w.head=w.take=function(n,t,r){return null==n?void 0:null==t||r?n[0]:o.call(n,0,t)},w.initial=function(n,t,r){return o.call(n,0,n.length-(null==t||r?1:t))},w.last=function(n,t,r){return null==n?void 0:null==t||r?n[n.length-1]:o.call(n,Math.max(n.length-t,0))},w.rest=w.tail=w.drop=function(n,t,r){return o.call(n,null==t||r?1:t)},w.compact=function(n){return w.filter(n,w.identity)};var R=function(n,t,r){return A(n,function(n){w.isArray(n)?t?a.apply(r,n):R(n,t,r):r.push(n)}),r};w.flatten=function(n,t){return R(n,t,[])},w.without=function(n){return w.difference(n,o.call(arguments,1))},w.uniq=w.unique=function(n,t,r,e){w.isFunction(t)&&(e=r,r=t,t=!1);var u=r?w.map(n,r,e):n,i=[],a=[];return A(u,function(r,e){(t?e&&a[a.length-1]===r:w.contains(a,r))||(a.push(r),i.push(n[e]))}),i},w.union=function(){return w.uniq(c.apply(e,arguments))},w.intersection=function(n){var t=o.call(arguments,1);return w.filter(w.uniq(n),function(n){return w.every(t,function(t){return w.indexOf(t,n)>=0})})},w.difference=function(n){var t=c.apply(e,o.call(arguments,1));return w.filter(n,function(n){return!w.contains(t,n)})},w.zip=function(){for(var n=o.call(arguments),t=w.max(w.pluck(n,"length")),r=Array(t),e=0;t>e;e++)r[e]=w.pluck(n,""+e);return r},w.object=function(n,t){if(null==n)return{};for(var r={},e=0,u=n.length;u>e;e++)t?r[n[e]]=t[e]:r[n[e][0]]=n[e][1];return r},w.indexOf=function(n,t,r){if(null==n)return-1;var e=0,u=n.length;if(r){if("number"!=typeof r)return e=w.sortedIndex(n,t),n[e]===t?e:-1;e=0>r?Math.max(0,u+r):r}if(y&&n.indexOf===y)return n.indexOf(t,r);for(;u>e;e++)if(n[e]===t)return e;return-1},w.lastIndexOf=function(n,t,r){if(null==n)return-1;var e=null!=r;if(b&&n.lastIndexOf===b)return e?n.lastIndexOf(t,r):n.lastIndexOf(t);for(var u=e?r:n.length;u--;)if(n[u]===t)return u;return-1},w.range=function(n,t,r){1>=arguments.length&&(t=n||0,n=0),r=arguments[2]||1;for(var e=Math.max(Math.ceil((t-n)/r),0),u=0,i=Array(e);e>u;)i[u++]=n,n+=r;return i};var I=function(){};w.bind=function(n,t){var r,e;if(n.bind===j&&j)return j.apply(n,o.call(arguments,1));if(!w.isFunction(n))throw new TypeError;return r=o.call(arguments,2),e=function(){if(!(this instanceof e))return n.apply(t,r.concat(o.call(arguments)));I.prototype=n.prototype;var u=new I;I.prototype=null;var i=n.apply(u,r.concat(o.call(arguments)));return Object(i)===i?i:u}},w.bindAll=function(n){var t=o.call(arguments,1);return 0==t.length&&(t=w.functions(n)),A(t,function(t){n[t]=w.bind(n[t],n)}),n},w.memoize=function(n,t){var r={};return t||(t=w.identity),function(){var e=t.apply(this,arguments);return w.has(r,e)?r[e]:r[e]=n.apply(this,arguments)}},w.delay=function(n,t){var r=o.call(arguments,2);return setTimeout(function(){return n.apply(null,r)},t)},w.defer=function(n){return w.delay.apply(w,[n,1].concat(o.call(arguments,1)))},w.throttle=function(n,t){var r,e,u,i,a=0,o=function(){a=new Date,u=null,i=n.apply(r,e)};return function(){var c=new Date,l=t-(c-a);return r=this,e=arguments,0>=l?(clearTimeout(u),u=null,a=c,i=n.apply(r,e)):u||(u=setTimeout(o,l)),i}},w.debounce=function(n,t,r){var e,u;return function(){var i=this,a=arguments,o=function(){e=null,r||(u=n.apply(i,a))},c=r&&!e;return clearTimeout(e),e=setTimeout(o,t),c&&(u=n.apply(i,a)),u}},w.once=function(n){var t,r=!1;return function(){return r?t:(r=!0,t=n.apply(this,arguments),n=null,t)}},w.wrap=function(n,t){return function(){var r=[n];return a.apply(r,arguments),t.apply(this,r)}},w.compose=function(){var n=arguments;return function(){for(var t=arguments,r=n.length-1;r>=0;r--)t=[n[r].apply(this,t)];return t[0]}},w.after=function(n,t){return 0>=n?t():function(){return 1>--n?t.apply(this,arguments):void 0}},w.keys=_||function(n){if(n!==Object(n))throw new TypeError("Invalid object");var t=[];for(var r in n)w.has(n,r)&&(t[t.length]=r);return t},w.values=function(n){var t=[];for(var r in n)w.has(n,r)&&t.push(n[r]);return t},w.pairs=function(n){var t=[];for(var r in n)w.has(n,r)&&t.push([r,n[r]]);return t},w.invert=function(n){var t={};for(var r in n)w.has(n,r)&&(t[n[r]]=r);return t},w.functions=w.methods=function(n){var t=[];for(var r in n)w.isFunction(n[r])&&t.push(r);return t.sort()},w.extend=function(n){return A(o.call(arguments,1),function(t){if(t)for(var r in t)n[r]=t[r]}),n},w.pick=function(n){var t={},r=c.apply(e,o.call(arguments,1));return A(r,function(r){r in n&&(t[r]=n[r])}),t},w.omit=function(n){var t={},r=c.apply(e,o.call(arguments,1));for(var u in n)w.contains(r,u)||(t[u]=n[u]);return t},w.defaults=function(n){return A(o.call(arguments,1),function(t){if(t)for(var r in t)null==n[r]&&(n[r]=t[r])}),n},w.clone=function(n){return w.isObject(n)?w.isArray(n)?n.slice():w.extend({},n):n},w.tap=function(n,t){return t(n),n};var S=function(n,t,r,e){if(n===t)return 0!==n||1/n==1/t;if(null==n||null==t)return n===t;n instanceof w&&(n=n._wrapped),t instanceof w&&(t=t._wrapped);var u=l.call(n);if(u!=l.call(t))return!1;switch(u){case"[object String]":return n==t+"";case"[object Number]":return n!=+n?t!=+t:0==n?1/n==1/t:n==+t;case"[object Date]":case"[object Boolean]":return+n==+t;case"[object RegExp]":return n.source==t.source&&n.global==t.global&&n.multiline==t.multiline&&n.ignoreCase==t.ignoreCase}if("object"!=typeof n||"object"!=typeof t)return!1;for(var i=r.length;i--;)if(r[i]==n)return e[i]==t;r.push(n),e.push(t);var a=0,o=!0;if("[object Array]"==u){if(a=n.length,o=a==t.length)for(;a--&&(o=S(n[a],t[a],r,e)););}else{var c=n.constructor,f=t.constructor;if(c!==f&&!(w.isFunction(c)&&c instanceof c&&w.isFunction(f)&&f instanceof f))return!1;for(var s in n)if(w.has(n,s)&&(a++,!(o=w.has(t,s)&&S(n[s],t[s],r,e))))break;if(o){for(s in t)if(w.has(t,s)&&!a--)break;o=!a}}return r.pop(),e.pop(),o};w.isEqual=function(n,t){return S(n,t,[],[])},w.isEmpty=function(n){if(null==n)return!0;if(w.isArray(n)||w.isString(n))return 0===n.length;for(var t in n)if(w.has(n,t))return!1;return!0},w.isElement=function(n){return!(!n||1!==n.nodeType)},w.isArray=x||function(n){return"[object Array]"==l.call(n)},w.isObject=function(n){return n===Object(n)},A(["Arguments","Function","String","Number","Date","RegExp"],function(n){w["is"+n]=function(t){return l.call(t)=="[object "+n+"]"}}),w.isArguments(arguments)||(w.isArguments=function(n){return!(!n||!w.has(n,"callee"))}),w.isFunction=function(n){return"function"==typeof n},w.isFinite=function(n){return isFinite(n)&&!isNaN(parseFloat(n))},w.isNaN=function(n){return w.isNumber(n)&&n!=+n},w.isBoolean=function(n){return n===!0||n===!1||"[object Boolean]"==l.call(n)},w.isNull=function(n){return null===n},w.isUndefined=function(n){return void 0===n},w.has=function(n,t){return f.call(n,t)},w.noConflict=function(){return n._=t,this},w.identity=function(n){return n},w.times=function(n,t,r){for(var e=Array(n),u=0;n>u;u++)e[u]=t.call(r,u);return e},w.random=function(n,t){return null==t&&(t=n,n=0),n+(0|Math.random()*(t-n+1))};var T={escape:{"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#x27;","/":"&#x2F;"}};T.unescape=w.invert(T.escape);var M={escape:RegExp("["+w.keys(T.escape).join("")+"]","g"),unescape:RegExp("("+w.keys(T.unescape).join("|")+")","g")};w.each(["escape","unescape"],function(n){w[n]=function(t){return null==t?"":(""+t).replace(M[n],function(t){return T[n][t]})}}),w.result=function(n,t){if(null==n)return null;var r=n[t];return w.isFunction(r)?r.call(n):r},w.mixin=function(n){A(w.functions(n),function(t){var r=w[t]=n[t];w.prototype[t]=function(){var n=[this._wrapped];return a.apply(n,arguments),z.call(this,r.apply(w,n))}})};var N=0;w.uniqueId=function(n){var t=""+ ++N;return n?n+t:t},w.templateSettings={evaluate:/<%([\s\S]+?)%>/g,interpolate:/<%=([\s\S]+?)%>/g,escape:/<%-([\s\S]+?)%>/g};var q=/(.)^/,B={"'":"'","\\":"\\","\r":"r","\n":"n","	":"t","\u2028":"u2028","\u2029":"u2029"},D=/\\|'|\r|\n|\t|\u2028|\u2029/g;w.template=function(n,t,r){r=w.defaults({},r,w.templateSettings);var e=RegExp([(r.escape||q).source,(r.interpolate||q).source,(r.evaluate||q).source].join("|")+"|$","g"),u=0,i="__p+='";n.replace(e,function(t,r,e,a,o){return i+=n.slice(u,o).replace(D,function(n){return"\\"+B[n]}),r&&(i+="'+\n((__t=("+r+"))==null?'':_.escape(__t))+\n'"),e&&(i+="'+\n((__t=("+e+"))==null?'':__t)+\n'"),a&&(i+="';\n"+a+"\n__p+='"),u=o+t.length,t}),i+="';\n",r.variable||(i="with(obj||{}){\n"+i+"}\n"),i="var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};\n"+i+"return __p;\n";try{var a=Function(r.variable||"obj","_",i)}catch(o){throw o.source=i,o}if(t)return a(t,w);var c=function(n){return a.call(this,n,w)};return c.source="function("+(r.variable||"obj")+"){\n"+i+"}",c},w.chain=function(n){return w(n).chain()};var z=function(n){return this._chain?w(n).chain():n};w.mixin(w),A(["pop","push","reverse","shift","sort","splice","unshift"],function(n){var t=e[n];w.prototype[n]=function(){var r=this._wrapped;return t.apply(r,arguments),"shift"!=n&&"splice"!=n||0!==r.length||delete r[0],z.call(this,r)}}),A(["concat","join","slice"],function(n){var t=e[n];w.prototype[n]=function(){return z.call(this,t.apply(this._wrapped,arguments))}}),w.extend(w.prototype,{chain:function(){return this._chain=!0,this},value:function(){return this._wrapped}})}).call(this);
