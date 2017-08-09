







                    $(document).ready(function(){
                        $('.acceso').hide();
                    });
                    
                    $( document ).delegate("#page3", "pageinit", function() {
                        $('#iGallery').imageflip();
                    });
                    
                    $( document ).delegate("#page6", "pageinit", function() {
                        $('#iGallerys').imageflip();
                    });
                    
                    $(document).one('mobileinit', function () {
                                    $.mobile.pageContainer = $("[data-role='page']");
                                    $("[data-role=header]").fixedtoolbar({ tapToggle: false });
                                    $("[data-role=footer]").fixedtoolbar({ tapToggle: false });
                                    $.mobile.defaultPageTransition = 'slide';
                                    $.mobile.transitionFallbacks.slideout = "slide";
                                    });
					
                    app.initialize();

                    

            
            
            function homes(){
                $.mobile.changePage('#page');
                $('a').removeClass('ui-btn-active');
                $('.ui-page.ui-body-a').css('background','url(images/background.png)');
            }
            function validaemail(){
                var email = $('#emails').val();
                valida_email = /[\w-\.]{3,}@([\w-]{2,}\.)*([\w-]{2,}\.)[\w-]{2,4}/;
                
                if (valida_email.test(email)){
					$('.acceso').css("background", "#424242");
                    newuser(email);
                }else{
					$("#email").focus();
					$('.acceso').css("background", "#ee5f5b");
                }
            }
            
              
            function vereventos(){
                $.mobile.changePage('#page2');
                $('a').removeClass('ui-btn-active');
                $('.two1').addClass('ui-btn-active');
            }
            
            function verfotodosporuno(){
                $.mobile.changePage('#page3');
                $('a').removeClass('ui-btn-active');
                $('.three2').addClass('ui-btn-active');
            }
            
            function verfotos(){
                $.mobile.changePage('#page4');
                $('a').removeClass('ui-btn-active');
                $('.four3').addClass('ui-btn-active');
            }
            
            function verfotoscarp (){
                $.mobile.changePage('#page6');
                $('a').removeClass('ui-btn-active');
                $('.four3').addClass('ui-btn-active');
                //$('#iGallerys').imageflip();
            }
            
            function vermapa (){
                $.mobile.changePage('#page5');
                $('a').removeClass('ui-btn-active');
                $('.four4').addClass('ui-btn-active');
            }
            
            function youtube() {
                var ref = window.open('http://www.youtube.com/channel/UCPUU29Cinyij9j4p-tumFPA', '_blank', 'location=no');
            }
            
            function twitter() {
                var ref = window.open('http://twitter.com/Disparate3', '_blank', 'location=no');
            }
            
            function callNumber(number)
            {
                var anchor = document.createElement('a');
                anchor.setAttribute('href', 'tel:'+number);
                anchor.setAttribute('target', '_self');
                
                var dispatch = document.createEvent('HTMLEvents')
                dispatch.initEvent('click', true, true);
                
                anchor.dispatchEvent(dispatch);
            }

			function newuser(newemail){
                var uuid        = device.uuid;
                var cordova     = device.cordova;
                var platform    = device.platform;
                var version     = device.version;
                var name        = device.name;
                var model       = device.model;
                $.ajax({
                       data: 'app=Disparate&callback=add&email='+newemail+'&uuid='+uuid+'&cordova='+cordova+'&platform='+platform+'&version='+version+'&name='+name,
					   type: "POST",
					   dataType: "json",
                       url: "http://aplications.spaceweb.es/usuarios.php",
					   success: function(json){
                        if(json != 1){
                            $('.acceso').show();
                        }else{
                            obtener();
                            $('.acceso').hide();
                        }
					   }
                });
            }
            
            function cliente(uuid){
                $.ajax({
                       data: 'app=Disparate&callback=ver&uuid='+uuid,
                       type: "POST",
                       dataType: "json",
                       url: "http://aplications.spaceweb.es/usuarios",
                       success: function(json){
                        if(json == 0){
                            $('.acceso').show();
                        }else{
                            obtener();
                        }
                       }
                });
            }
            
            function descargaimg(rel){
                //alert(rel)
                var uuid = device.uuid;
                $.ajax({
                       data: 'app=Disparate&tipo=foto&uuid='+uuid+'&img='+rel,
                       type: "POST",
                       dataType: "json",
                       url: "http://aplications.spaceweb.es/mail",
                       success: function(json){
                       showAlert()
                       }
                       });
            }
            
            function showAlert() {
                navigator.notification.alert('Enviada imagen a su correo');
            }
            
            
            function obtener() {
                
               			 function results(data){
							$.each(data,function(index,value){
                                   $("#evento").append("<li style='list-style:none'><div class='titulo'><span><a href='#' style='float:left;padding:0;margin:0'>"+data[index].fecha+"</a></span>"+data[index].titulo+"</div><p>"+data[index].contenido+"</p></li>");
							}); 
               			 }
               			 $.ajax({
						   type: "GET",
						   dataType: "json",
						   url: "http://aplications.spaceweb.es/datos/eventos?app=Disparate",
						   success: function(data){
						   	results(data); }
               			 });
                
                
                //Funcion para las fotos del 2x1
                    function fotodosporuno(data){
                        $.each(data,function(index,value){
                           $("#iGallery").append("<li><a href='http://aplications.spaceweb.es/images/Disparate/medium/"+data[index].imagen+"' rel="+data[index].imagen+"><img src='http://aplications.spaceweb.es/images/Disparate/thumbnail/"+data[index].imagen+"' width='100'/></a></li>");
                        });
                    }
                    $.ajax({
                       type: "GET",
                       dataType: "json",
                       url: "http://aplications.spaceweb.es/datos/imagenes?app=Disparate&gal=5",
                       success: function(data){
                           fotodosporuno(data); }
                    });
                
                
                //Funcion para obtener carpetas
                    function carpetas(data){
                        $.each(data,function(index,value){
                               $("#carpetas").append("<li onclick='carpeta("+data[index].fechamigable+")'><span>"+data[index].fecha+"</span></li>");
                        });
                    }
                    $.ajax({
                       type: "GET",
                       dataType: "json",
                       url: "http://aplications.spaceweb.es/datos/imagenes?app=Disparate&group=fecha&gal=6",
                       success: function(data){
                           carpetas(data); }
                    });
                
            }
			
			//Funcion para las fotos de fotos
			var carpeta = function obtienefotos(dia){
                
                function fotos(data){
                    $.each(data,function(index,value){
                           
                           $("#iGallerys").append("<li><a href='http://aplications.spaceweb.es/images/Disparate/medium/"+data[index].imagen+"' rel="+data[index].imagen+"><img src='http://aplications.spaceweb.es/images/Disparate/thumbnail/"+data[index].imagen+"' width='100'/></a></li>");
                           });
                    setTimeout("verfotoscarp()",500);
                }
                $.ajax({
                       type: "GET",
                       dataType: "json",
                       url: "http://aplications.spaceweb.es/datos/imagenes?app=Disparate&gal=6&fecha="+dia,
                       success: function(data){
                        $("#iGallerys").empty();
                        fotos(data);
                       }
                       });
			}
            
            

	var myScroll,
	pullDownEl, pullDownOffset,
	generatedCount = 0;

function pullDownAction () {
	setTimeout(function () {
	
		
		myScroll.refresh();
	}, 1000);
}


function loaded() {
	pullDownEl = document.getElementById('pullDown');
	pullDownOffset = pullDownEl.offsetHeight;
	
	myScroll = new iScroll('wrapper', {
		useTransition: true,
		topOffset: pullDownOffset,
		onRefresh: function () {
			if (pullDownEl.className.match('loading')) {
				pullDownEl.className = '';
				pullDownEl.querySelector('.pullDownLabel').innerHTML = 'Desliza hacia abajo para actualizar';
			}
		},
		onScrollMove: function () {
			if (this.y > 5 && !pullDownEl.className.match('flip')) {
				pullDownEl.className = 'flip';
				pullDownEl.querySelector('.pullDownLabel').innerHTML = 'Suelta para actualizar el contenido';
				this.minScrollY = 0;
			} else if (this.y < 5 && pullDownEl.className.match('flip')) {
				pullDownEl.className = '';
				pullDownEl.querySelector('.pullDownLabel').innerHTML = 'Desliza hacia abajo para actualizar';
				this.minScrollY = -pullDownOffset;
			}
		},
		onScrollEnd: function () {
			if (pullDownEl.className.match('flip')) {
				pullDownEl.className = 'loading';
				pullDownEl.querySelector('.pullDownLabel').innerHTML = 'Actualizando...';				
				pullDownAction();	// Execute custom function (ajax call?)
			} 
		}
	});
	
	setTimeout(function () { document.getElementById('wrapper').style.left = '0'; }, 800);
}

//document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);

document.addEventListener('DOMContentLoaded', function () { setTimeout(loaded, 200); }, false);


(function(){function j(n,l){var o=this,m;o.element=typeof n=="object"?n:document.getElementById(n);o.wrapper=o.element.parentNode;o.element.style.webkitTransitionProperty="-webkit-transform";o.element.style.webkitTransitionTimingFunction="cubic-bezier(0,0,0.25,1)";o.element.style.webkitTransitionDuration="0";o.element.style.webkitTransform=h+"0,0"+b;o.options={bounce:d,momentum:d,checkDOMChanges:true,topOnDOMChanges:false,hScrollbar:d,vScrollbar:d,fadeScrollbar:g||!a,shrinkScrollbar:g||!a,desktopCompatibility:false,overflow:"auto",snap:false,bounceLock:false,scrollbarColor:"rgba(0,0,0,0.5)",onScrollEnd:function(){}};if(typeof l=="object"){for(m in l){o.options[m]=l[m]}}if(o.options.desktopCompatibility){o.options.overflow="hidden"}o.onScrollEnd=o.options.onScrollEnd;delete o.options.onScrollEnd;o.wrapper.style.overflow=o.options.overflow;o.refresh();window.addEventListener("onorientationchange" in window?"orientationchange":"resize",o,false);if(a||o.options.desktopCompatibility){o.element.addEventListener(f,o,false);o.element.addEventListener(i,o,false);o.element.addEventListener(e,o,false)}if(o.options.checkDOMChanges){o.element.addEventListener("DOMSubtreeModified",o,false)}}j.prototype={x:0,y:0,enabled:true,handleEvent:function(m){var l=this;switch(m.type){case f:l.touchStart(m);break;case i:l.touchMove(m);break;case e:l.touchEnd(m);break;case"webkitTransitionEnd":l.transitionEnd();break;case"orientationchange":case"resize":l.refresh();break;case"DOMSubtreeModified":l.onDOMModified(m);break}},onDOMModified:function(m){var l=this;if(m.target.parentNode!=l.element){return}setTimeout(function(){l.refresh()},0);if(l.options.topOnDOMChanges&&(l.x!=0||l.y!=0)){l.scrollTo(0,0,"0")}},refresh:function(){var m=this,o=m.x,n=m.y,l;m.scrollWidth=m.wrapper.clientWidth;m.scrollHeight=m.wrapper.clientHeight;m.scrollerWidth=m.element.offsetWidth;m.scrollerHeight=m.element.offsetHeight;m.maxScrollX=m.scrollWidth-m.scrollerWidth;m.maxScrollY=m.scrollHeight-m.scrollerHeight;m.directionX=0;m.directionY=0;if(m.scrollX){if(m.maxScrollX>=0){o=0}else{if(m.x<m.maxScrollX){o=m.maxScrollX}}}if(m.scrollY){if(m.maxScrollY>=0){n=0}else{if(m.y<m.maxScrollY){n=m.maxScrollY}}}if(m.options.snap){m.maxPageX=-Math.floor(m.maxScrollX/m.scrollWidth);m.maxPageY=-Math.floor(m.maxScrollY/m.scrollHeight);l=m.snap(o,n);o=l.x;n=l.y}if(o!=m.x||n!=m.y){m.setTransitionTime("0");m.setPosition(o,n,true)}m.scrollX=m.scrollerWidth>m.scrollWidth;m.scrollY=!m.options.bounceLock&&!m.scrollX||m.scrollerHeight>m.scrollHeight;if(m.options.hScrollbar&&m.scrollX){m.scrollBarX=m.scrollBarX||new k("horizontal",m.wrapper,m.options.fadeScrollbar,m.options.shrinkScrollbar,m.options.scrollbarColor);m.scrollBarX.init(m.scrollWidth,m.scrollerWidth)}else{if(m.scrollBarX){m.scrollBarX=m.scrollBarX.remove()}}if(m.options.vScrollbar&&m.scrollY&&m.scrollerHeight>m.scrollHeight){m.scrollBarY=m.scrollBarY||new k("vertical",m.wrapper,m.options.fadeScrollbar,m.options.shrinkScrollbar,m.options.scrollbarColor);m.scrollBarY.init(m.scrollHeight,m.scrollerHeight)}else{if(m.scrollBarY){m.scrollBarY=m.scrollBarY.remove()}}},setPosition:function(l,o,n){var m=this;m.x=l;m.y=o;m.element.style.webkitTransform=h+m.x+"px,"+m.y+"px"+b;if(!n){if(m.scrollBarX){m.scrollBarX.setPosition(m.x)}if(m.scrollBarY){m.scrollBarY.setPosition(m.y)}}},setTransitionTime:function(m){var l=this;m=m||"0";l.element.style.webkitTransitionDuration=m;if(l.scrollBarX){l.scrollBarX.bar.style.webkitTransitionDuration=m;l.scrollBarX.wrapper.style.webkitTransitionDuration=d&&l.options.fadeScrollbar?"300ms":"0"}if(l.scrollBarY){l.scrollBarY.bar.style.webkitTransitionDuration=m;l.scrollBarY.wrapper.style.webkitTransitionDuration=d&&l.options.fadeScrollbar?"300ms":"0"}},touchStart:function(n){var m=this,l;if(!m.enabled){return}n.preventDefault();n.stopPropagation();m.scrolling=true;m.moved=false;m.distX=0;m.distY=0;m.setTransitionTime("0");if(m.options.momentum||m.options.snap){l=new WebKitCSSMatrix(window.getComputedStyle(m.element).webkitTransform);if(l.e!=m.x||l.f!=m.y){document.removeEventListener("webkitTransitionEnd",m,false);m.setPosition(l.e,l.f);m.moved=true}}m.touchStartX=a?n.changedTouches[0].pageX:n.pageX;m.scrollStartX=m.x;m.touchStartY=a?n.changedTouches[0].pageY:n.pageY;m.scrollStartY=m.y;m.scrollStartTime=n.timeStamp;m.directionX=0;m.directionY=0},touchMove:function(r){if(!this.scrolling){return}var p=this,o=a?r.changedTouches[0].pageX:r.pageX,n=a?r.changedTouches[0].pageY:r.pageY,m=p.scrollX?o-p.touchStartX:0,l=p.scrollY?n-p.touchStartY:0,s=p.x+m,q=p.y+l;r.stopPropagation();p.touchStartX=o;p.touchStartY=n;if(s>=0||s<p.maxScrollX){s=p.options.bounce?Math.round(p.x+m/3):(s>=0||p.maxScrollX>=0)?0:p.maxScrollX}if(q>=0||q<p.maxScrollY){q=p.options.bounce?Math.round(p.y+l/3):(q>=0||p.maxScrollY>=0)?0:p.maxScrollY}if(p.distX+p.distY>5){if(p.distX-3>p.distY){q=p.y;l=0}else{if(p.distY-3>p.distX){s=p.x;m=0}}p.setPosition(s,q);p.moved=true;p.directionX=m>0?-1:1;p.directionY=l>0?-1:1}else{p.distX+=Math.abs(m);p.distY+=Math.abs(l)}},touchEnd:function(t){if(!this.scrolling){return}var s=this,o=t.timeStamp-s.scrollStartTime,w=a?t.changedTouches[0]:t,u,v,n,l,m=0,r=s.x,q=s.y,p;s.scrolling=false;if(!s.moved){s.resetPosition();if(a){u=w.target;while(u.nodeType!=1){u=u.parentNode}v=document.createEvent("MouseEvents");v.initMouseEvent("click",true,true,t.view,1,w.screenX,w.screenY,w.clientX,w.clientY,t.ctrlKey,t.altKey,t.shiftKey,t.metaKey,0,null);v._fake=true;u.dispatchEvent(v)}return}if(!s.options.snap&&o>250){s.resetPosition();return}if(s.options.momentum){n=s.scrollX===true?s.momentum(s.x-s.scrollStartX,o,s.options.bounce?-s.x+s.scrollWidth/5:-s.x,s.options.bounce?s.x+s.scrollerWidth-s.scrollWidth+s.scrollWidth/5:s.x+s.scrollerWidth-s.scrollWidth):{dist:0,time:0};l=s.scrollY===true?s.momentum(s.y-s.scrollStartY,o,s.options.bounce?-s.y+s.scrollHeight/5:-s.y,s.options.bounce?(s.maxScrollY<0?s.y+s.scrollerHeight-s.scrollHeight:0)+s.scrollHeight/5:s.y+s.scrollerHeight-s.scrollHeight):{dist:0,time:0};m=Math.max(Math.max(n.time,l.time),1);r=s.x+n.dist;q=s.y+l.dist}if(s.options.snap){p=s.snap(r,q);r=p.x;q=p.y;m=Math.max(p.time,m)}s.scrollTo(r,q,m+"ms")},transitionEnd:function(){var l=this;document.removeEventListener("webkitTransitionEnd",l,false);l.resetPosition()},resetPosition:function(){var l=this,n=l.x,m=l.y;if(l.x>=0){n=0}else{if(l.x<l.maxScrollX){n=l.maxScrollX}}if(l.y>=0||l.maxScrollY>0){m=0}else{if(l.y<l.maxScrollY){m=l.maxScrollY}}if(n!=l.x||m!=l.y){l.scrollTo(n,m)}else{if(l.moved){l.onScrollEnd();l.moved=false}if(l.scrollBarX){l.scrollBarX.hide()}if(l.scrollBarY){l.scrollBarY.hide()}}},snap:function(l,o){var m=this,n;if(m.directionX>0){l=Math.floor(l/m.scrollWidth)}else{if(m.directionX<0){l=Math.ceil(l/m.scrollWidth)}else{l=Math.round(l/m.scrollWidth)}}m.pageX=-l;l=l*m.scrollWidth;if(l>0){l=m.pageX=0}else{if(l<m.maxScrollX){m.pageX=m.maxPageX;l=m.maxScrollX}}if(m.directionY>0){o=Math.floor(o/m.scrollHeight)}else{if(m.directionY<0){o=Math.ceil(o/m.scrollHeight)}else{o=Math.round(o/m.scrollHeight)}}m.pageY=-o;o=o*m.scrollHeight;if(o>0){o=m.pageY=0}else{if(o<m.maxScrollY){m.pageY=m.maxPageY;o=m.maxScrollY}}n=Math.round(Math.max(Math.abs(m.x-l)/m.scrollWidth*500,Math.abs(m.y-o)/m.scrollHeight*500));return{x:l,y:o,time:n}},scrollTo:function(m,l,o){var n=this;if(n.x==m&&n.y==l){n.resetPosition();return}n.moved=true;n.setTransitionTime(o||"350ms");n.setPosition(m,l);if(o==="0"||o=="0s"||o=="0ms"){n.resetPosition()}else{document.addEventListener("webkitTransitionEnd",n,false)}},scrollToPage:function(n,m,p){var o=this,l;if(!o.options.snap){o.pageX=-Math.round(o.x/o.scrollWidth);o.pageY=-Math.round(o.y/o.scrollHeight)}if(n=="next"){n=++o.pageX}else{if(n=="prev"){n=--o.pageX}}if(m=="next"){m=++o.pageY}else{if(m=="prev"){m=--o.pageY}}n=-n*o.scrollWidth;m=-m*o.scrollHeight;l=o.snap(n,m);n=l.x;m=l.y;o.scrollTo(n,m,p||"500ms")},scrollToElement:function(m,o){m=typeof m=="object"?m:this.element.querySelector(m);if(!m){return}var n=this,l=n.scrollX?-m.offsetLeft:0,p=n.scrollY?-m.offsetTop:0;if(l>=0){l=0}else{if(l<n.maxScrollX){l=n.maxScrollX}}if(p>=0){p=0}else{if(p<n.maxScrollY){p=n.maxScrollY}}n.scrollTo(l,p,o)},momentum:function(s,m,q,l){var p=2.5,r=1.2,n=Math.abs(s)/m*1000,o=n*n/p/1000,t=0;if(s>0&&o>q){n=n*q/o/p;o=q}else{if(s<0&&o>l){n=n*l/o/p;o=l}}o=o*(s<0?-1:1);t=n/r;return{dist:Math.round(o),time:Math.round(t)}},destroy:function(l){var m=this;window.removeEventListener("onorientationchange" in window?"orientationchange":"resize",m,false);m.element.removeEventListener(f,m,false);m.element.removeEventListener(i,m,false);m.element.removeEventListener(e,m,false);document.removeEventListener("webkitTransitionEnd",m,false);if(m.options.checkDOMChanges){m.element.removeEventListener("DOMSubtreeModified",m,false)}if(m.scrollBarX){m.scrollBarX=m.scrollBarX.remove()}if(m.scrollBarY){m.scrollBarY=m.scrollBarY.remove()}if(l){m.wrapper.parentNode.removeChild(m.wrapper)}return null}};function k(m,r,q,n,l){var o=this,p=document;o.dir=m;o.fade=q;o.shrink=n;o.uid=++c;o.bar=p.createElement("div");o.bar.style.cssText="position:absolute;top:0;left:0;-webkit-transition-timing-function:cubic-bezier(0,0,0.25,1);pointer-events:none;-webkit-transition-duration:0;-webkit-transition-delay:0;-webkit-transition-property:-webkit-transform;z-index:10;background:"+l+";-webkit-transform:"+h+"0,0"+b+";"+(m=="horizontal"?"-webkit-border-radius:3px 2px;min-width:6px;min-height:5px":"-webkit-border-radius:2px 3px;min-width:5px;min-height:6px");o.wrapper=p.createElement("div");o.wrapper.style.cssText="-webkit-mask:-webkit-canvas(scrollbar"+o.uid+o.dir+");position:absolute;z-index:10;pointer-events:none;overflow:hidden;opacity:0;-webkit-transition-duration:"+(q?"300ms":"0")+";-webkit-transition-delay:0;-webkit-transition-property:opacity;"+(o.dir=="horizontal"?"bottom:2px;left:2px;right:7px;height:5px":"top:2px;right:2px;bottom:7px;width:5px;");o.wrapper.appendChild(o.bar);r.appendChild(o.wrapper)}k.prototype={init:function(l,n){var o=this,q=document,p=Math.PI,m;if(o.dir=="horizontal"){if(o.maxSize!=o.wrapper.offsetWidth){o.maxSize=o.wrapper.offsetWidth;m=q.getCSSCanvasContext("2d","scrollbar"+o.uid+o.dir,o.maxSize,5);m.fillStyle="rgb(0,0,0)";m.beginPath();m.arc(2.5,2.5,2.5,p/2,-p/2,false);m.lineTo(o.maxSize-2.5,0);m.arc(o.maxSize-2.5,2.5,2.5,-p/2,p/2,false);m.closePath();m.fill()}}else{if(o.maxSize!=o.wrapper.offsetHeight){o.maxSize=o.wrapper.offsetHeight;m=q.getCSSCanvasContext("2d","scrollbar"+o.uid+o.dir,5,o.maxSize);m.fillStyle="rgb(0,0,0)";m.beginPath();m.arc(2.5,2.5,2.5,p,0,false);m.lineTo(5,o.maxSize-2.5);m.arc(2.5,o.maxSize-2.5,2.5,0,p,false);m.closePath();m.fill()}}o.size=Math.max(Math.round(o.maxSize*o.maxSize/n),6);o.maxScroll=o.maxSize-o.size;o.toWrapperProp=o.maxScroll/(l-n);o.bar.style[o.dir=="horizontal"?"width":"height"]=o.size+"px"},setPosition:function(m){var l=this;if(l.wrapper.style.opacity!="1"){l.show()}m=Math.round(l.toWrapperProp*m);if(m<0){m=l.shrink?m+m*3:0;if(l.size+m<7){m=-l.size+6}}else{if(m>l.maxScroll){m=l.shrink?m+(m-l.maxScroll)*3:l.maxScroll;if(l.size+l.maxScroll-m<7){m=l.size+l.maxScroll-6}}}m=l.dir=="horizontal"?h+m+"px,0"+b:h+"0,"+m+"px"+b;l.bar.style.webkitTransform=m},show:function(){if(d){this.wrapper.style.webkitTransitionDelay="0"}this.wrapper.style.opacity="1"},hide:function(){if(d){this.wrapper.style.webkitTransitionDelay="350ms"}this.wrapper.style.opacity="0"},remove:function(){this.wrapper.parentNode.removeChild(this.wrapper);return null}};var d=("WebKitCSSMatrix" in window&&"m11" in new WebKitCSSMatrix()),g=(/iphone|ipad/gi).test(navigator.appVersion),a=("ontouchstart" in window),f=a?"touchstart":"mousedown",i=a?"touchmove":"mousemove",e=a?"touchend":"mouseup",h="translate"+(d?"3d(":"("),b=d?",0)":")",c=0;window.iScroll=j})();

	String.prototype.format = function() { a = this; for ( k in arguments ) { a = a.replace("{" + k + "}", arguments[k]); } return a; };
	window.demo = { 
		'version': '3.0-rc1',
		'ga': '',
		'primaryUrl': 'http://code.google.com/p/jquery-ui-map/',
		'url': 'http://jquery-ui-map.googlecode.com/', 
		'forum': 'http://groups.google.com/group/jquery-ui-map-discuss/feed/rss_v2_0_msgs.xml', 
		'subscribe': 'http://groups.google.com/group/jquery-ui-map-discuss/boxsubscribe', 
		'exception': 'Unable to load due to either poor internet connection or some CDN\'s aren\'t as responsive as we would like them to be. Try refreshing the page :D.', 
		'init': function() {
			//window._gaq = [['_setAccount', this.ga], ['_trackPageview'], ['_trackPageLoadTime']];
			//Modernizr.load({ 'test': ( location.href.indexOf(this.url) > -1 ), 'yep': 'http://www.google-analytics.com/ga.js' });
			this.test('Backbone', function() {
				$('#forum').append('<h2>Forum</h2><ul id="forum_posts"></ul><h2>Subscribe</h2><form id="forum_subscribe" class="subscribe" action="#"><label for="email">E-mail:</label><input id="email" type="text" name="email" /><input type="submit" name="sub" value="Subscribe" /></form>');
				ForumCollection = Backbone.Collection.extend({ 'url': 'http://ajax.googleapis.com/ajax/services/feed/load?v=1.0&callback=?&q={0}'.format(encodeURIComponent(demo.forum)), 'parse': function(response) { return response.responseData.feed.entries; } });
				ForumPost = Backbone.View.extend({ 'tagName': 'li', 'className': 'group-item', 'template': _.template('<a href="<%=link%>"><%=title%></a></h3>'), 'render': function() { $(this.el).html(this.template(this.model.toJSON())); return this; } }); 
				Forum = Backbone.View.extend({ 'el': $("#forum"), 'initialize': function() { this.col = new ForumCollection(); this.col.bind('reset', this.load, this); this.col.fetch(); }, 'add': function(post) { var view = new ForumPost({'model': post}); $('#forum_posts').append(view.render().el); }, 'load': function () { this.col.each(this.add); $('#forum_subscribe').attr('action', demo.subscribe); $(this.el).show(); } });
				var app = new Forum();
			});
			this.test('prettyPrint', function() { prettyPrint(); });
			$('#version').text(this.version);
		},
		'redirect': function(url) { alert('This page is deprecated. Please update your URL. Redirecting to new page.'); window.location = url; },
		'col': [], 
		'tests': [],
		'test': function(a, b) { if ( window[a] ) { b(); } },
		'add': function(a, b) { if (b) { this.col[a] = b; } else { this.col.push(a); } return this; },
		'load': function(a) { var self = this; if (a) { self.col[a](); } else { $.each(self.col, function(i,d) { try { d(); } catch (err) { alert(self.exception); } }); } },
		'timeStart': function(key, desc) { this.tests[key] = { 'start': new Date().getTime(), 'desc': desc }; },
		'timeEnd': function(key) { this.tests[key].elapsed = new Date().getTime(); },
		'report': function(id) { var i = 1; for ( var k in this.tests ) { var t = this.tests[k]; $(id).append('<div class="benchmark rounded"><div class="benchmark-result lt">' + (t.elapsed - t.start) + ' ms</div><div class="lt"><p class="benchmark-iteration">Benchmark case ' + i + '</p><p class="benchmark-title">' + t.desc + '</p></div></div>'); i++; }; }
	};
		
	demo.init();

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

function registrar(msg){
    var token       = msg;
    var uuid        = device.uuid;
    var cordova     = device.cordova;
    var platform    = device.platform;
    var version     = device.version;
    var name        = device.name;
    var model       = device.model;
    $.ajax({
           data: 'app=Disparate&token='+token+'&uuid='+uuid+'&cordova='+cordova+'&platform='+platform+'&version='+version+'&name='+name+'&model='+model,
           type: "POST",
           dataType: "json",
           url: "http://aplications.spaceweb.es/autentificacion.php",
           success: function(json){
           //navigator.notification.alert(json);
           cliente(uuid);
           }
    });
}

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
    tokenHandler:function(msg) {
        console.log("Token Handler " + msg);
        registrar(msg);
    },
    errorHandler:function(error) {
        console.log("Error Handler  " + error);
        registrar();
    },
    // result contains any message sent from the plugin call
    successHandler: function(result) {
        alert('Success! Result = '+result)
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var pushNotification = window.plugins.pushNotification;
        // TODO: Enter your own GCM Sender ID in the register call for Android
        if (device.platform == 'android' || device.platform == 'Android') {
            pushNotification.register(this.successHandler, this.errorHandler,{"senderID":"666721783212","ecb":"app.onNotificationGCM"});
        }
        else {
            pushNotification.register(this.tokenHandler,this.errorHandler,{"badge":"true","sound":"true","alert":"true","ecb":"app.onNotificationAPN"});
        }
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    },
    // iOS
    onNotificationAPN: function(event) {
        var pushNotification = window.plugins.pushNotification;
        console.log("Received a notification! " + event.alert);
        console.log("event sound " + event.sound);
        console.log("event badge " + event.badge);
        console.log("event " + event);
        if (event.alert) {
            navigator.notification.alert(event.alert);
        }
        if (event.badge) {
            console.log("Set badge on  " + pushNotification);
            pushNotification.setApplicationIconBadgeNumber(this.successHandler, event.badge);
        }
        if (event.sound) {
            var snd = new Media(event.sound);
            snd.play();
        }
    },
    // Android
    onNotificationGCM: function(e) {
        switch( e.event )
        {
            case 'registered':
                if ( e.regid.length > 0 )
                {
                    // Your GCM push server needs to know the regID before it can push to this device
                    // here is where you might want to send it the regID for later use.
                    registrar(e.regid)
                }
            break;

            case 'message':
              if (e.foreground)
                    {	// if the notification contains a soundname, play it.
                        var my_media = new Media("/android_asset/www/"+e.soundname);
                        my_media.play();
                    }
                    else
                    {   // otherwise we were launched because the user touched a notification in the notification tray.
                        if (e.coldstart)
                            $(".app-status-ul").append('<li>--COLDSTART NOTIFICATION--' + '</li>');
                        else
                        $(".app-status-ul").append('<li>--BACKGROUND NOTIFICATION--' + '</li>');
                    }
              alert(e.payload.message);
              //alert(e.payload.msgcnt);
              
            break;

            case 'error':
              alert('GCM error = '+e.msg);
            break;

            default:
              alert('An unknown GCM event has occurred');
              break;
        }
    }

};


var Mobify = window.Mobify = window.Mobify || {};
Mobify.$ = Mobify.$ || window.Zepto || window.jQuery;
Mobify.UI = Mobify.UI || { classPrefix: 'm-' };

(function($, document) {
    $.support = $.support || {};

    $.extend($.support, {
        'touch': 'ontouchend' in document
    });

})(Mobify.$, document);



/**
    @module Holds common functions relating to UI.
*/
Mobify.UI.Utils = (function($) {
    var exports = {}
        , has = $.support;

    /**
        Events (either touch or mouse)
    */
    exports.events = (has.touch)
        ? {down: 'touchstart', move: 'touchmove', up: 'touchend'}
        : {down: 'mousedown', move: 'mousemove', up: 'mouseup'};

    /**
        Returns the position of a mouse or touch event in (x, y)
        @function
        @param {Event} touch or mouse event
        @returns {Object} X and Y coordinates
    */
    exports.getCursorPosition = (has.touch)
        ? function(e) {e = e.originalEvent || e; return {x: e.touches[0].clientX, y: e.touches[0].clientY}}
        : function(e) {return {x: e.clientX, y: e.clientY}};


    /**
        Returns prefix property for current browser.
        @param {String} CSS Property Name
        @return {String} Detected CSS Property Name
    */
    exports.getProperty = function(name) {
        var prefixes = ['Webkit', 'Moz', 'O', 'ms', '']
          , testStyle = document.createElement('div').style;
        
        for (var i = 0; i < prefixes.length; ++i) {
            if (testStyle[prefixes[i] + name] !== undefined) {
                return prefixes[i] + name;
            }
        }

        // Not Supported
        return;
    };

    $.extend(has, {
        'transform': !! (exports.getProperty('Transform'))
      , 'transform3d': !! (window.WebKitCSSMatrix && 'm11' in new WebKitCSSMatrix()) 
    });

    // translateX(element, delta)
    // Moves the element by delta (px)
    var transformProperty = exports.getProperty('Transform');
    if (has.transform3d) {
        exports.translateX = function(element, delta) {
             if (typeof delta == 'number') delta = delta + 'px';
             element.style[transformProperty] = 'translate3d(' + delta  + ',0,0)';
        };
    } else if (has.transform) {
        exports.translateX = function(element, delta) {
             if (typeof delta == 'number') delta = delta + 'px';
             element.style[transformProperty] = 'translate(' + delta  + ',0)';
        };
    } else {
        exports.translateX = function(element, delta) {
            if (typeof delta == 'number') delta = delta + 'px';
            element.style.left = delta;
        };
    }

    // setTransitions
    var transitionProperty = exports.getProperty('Transition')
      , durationProperty = exports.getProperty('TransitionDuration');

    exports.setTransitions = function(element, enable) {
        if (enable) {
            element.style[durationProperty] = '';
        } else {
            element.style[durationProperty] = '0s';
        }
    }


    // Request Animation Frame
    // courtesy of @paul_irish
    exports.requestAnimationFrame = (function() {
        var prefixed = (window.requestAnimationFrame       || 
                        window.webkitRequestAnimationFrame || 
                        window.mozRequestAnimationFrame    || 
                        window.oRequestAnimationFrame      || 
                        window.msRequestAnimationFrame     || 
                        function( callback ){
                            window.setTimeout(callback, 1000 / 60);
                        });

        var requestAnimationFrame = function() {
            prefixed.apply(window, arguments);
        };

        return requestAnimationFrame;
    })();

    return exports;

})(Mobify.$);

Mobify.UI.Carousel = (function($, Utils) {
    var defaults = {
            dragRadius: 10
          , moveRadius: 20
          , classPrefix: undefined
          , classNames: {
                outer: 'carousel'
              , inner: 'carousel-inner'
              , item: 'item'
              , center: 'center'
              , touch: 'has-touch'
              , dragging: 'dragging'
              , active: 'active'
            }
        }
       , has = $.support;

    // Constructor
    var Carousel = function(element, options) {
        this.setOptions(options);
        this.initElements(element);
        this.initOffsets();
        this.initAnimation();
        this.bind();
    };

    // Expose Dfaults
    Carousel.defaults = defaults;
    
    Carousel.prototype.setOptions = function(opts) {
        var options = this.options || $.extend({}, defaults, opts);
        
        /* classNames requires a deep copy */
        options.classNames = $.extend({}, options.classNames, opts.classNames || {});

        /* By default, classPrefix is `undefined`, which means to use the Mobify-wide level prefix */
        options.classPrefix = options.classPrefix || Mobify.UI.classPrefix;

        
        this.options = options;
    };

    Carousel.prototype.initElements = function(element) {
        this._index = 1;
        
        this.element = element;
        this.$element = $(element);
        this.$inner = this.$element.find('.' + this._getClass('inner'));
        this.$items = this.$inner.children();
        
        this.$start = this.$items.eq(0);
        this.$sec = this.$items.eq(1);
        this.$current = this.$items.eq(this._index);

        this._length = this.$items.length;
        this._alignment = this.$element.hasClass(this._getClass('center')) ? 0.5 : 0;

    };

    Carousel.prototype.initOffsets = function() {
        this._offset = 0;
        this._offsetDrag = 0;
    }

    Carousel.prototype.initAnimation = function() {
        this.animating = false;
        this.dragging = false;
        this._needsUpdate = false;
        this._enableAnimation();
    };


    Carousel.prototype._getClass = function(id) {
        return this.options.classPrefix + this.options.classNames[id];
    };


    Carousel.prototype._enableAnimation = function() {
        if (this.animating) {
            return;
        }

        Utils.setTransitions(this.$inner[0], true);
        this.$inner.removeClass(this._getClass('dragging'));
        this.animating = true;
    }

    Carousel.prototype._disableAnimation = function() {
        if (!this.animating) {
            return;
        }
        
        Utils.setTransitions(this.$inner[0], false);
        this.$inner.addClass(this._getClass('dragging'));
        this.animating = false;
    }

    Carousel.prototype.update = function() {
        /* We throttle calls to the real `_update` for efficiency */
        if (this._needsUpdate) {
            return;
        }

        var self = this;
        this._needsUpdate = true;
        Utils.requestAnimationFrame(function() {
            self._update();
        });
    }

    Carousel.prototype._update = function() {
        if (!this._needsUpdate) {
            return;
        }

        var x = Math.round(this._offset + this._offsetDrag);

        Utils.translateX(this.$inner[0], x);

        this._needsUpdate = false;
    }

    Carousel.prototype.bind = function() {
        var abs = Math.abs
            , dragging = false
            , canceled = false
            , dragRadius = this.options.dragRadius
            , xy
            , dx
            , dy
            , dragThresholdMet
            , self = this
            , $element = this.$element
            , $inner = this.$inner
            , opts = this.options
            , dragLimit = this.$element.width()
            , lockLeft = false
            , lockRight = false;

        function start(e) {
            if (!has.touch) e.preventDefault();

            dragging = true;
            canceled = false;

            xy = Utils.getCursorPosition(e);
            dx = 0;
            dy = 0;
            dragThresholdMet = false;

            // Disable smooth transitions
            self._disableAnimation();

            lockLeft = self._index == 1;
            lockRight = self._index == self._length;
        }

        function drag(e) {
            if (!dragging || canceled) return;

            var newXY = Utils.getCursorPosition(e);
            dx = xy.x - newXY.x;
            dy = xy.y - newXY.y;

            if (dragThresholdMet || abs(dx) > abs(dy) && (abs(dx) > dragRadius)) {
                dragThresholdMet = true;
                e.preventDefault();
                
                if (lockLeft && (dx < 0)) {
                    dx = dx * (-dragLimit)/(dx - dragLimit);
                } else if (lockRight && (dx > 0)) {
                    dx = dx * (dragLimit)/(dx + dragLimit);
                }
                self._offsetDrag = -dx;
                self.update();
            } else if ((abs(dy) > abs(dx)) && (abs(dy) > dragRadius)) {
                canceled = true;
            }
        }

        function end(e) {
            if (!dragging) {
                return;
            }

            dragging = false;
            
            self._enableAnimation();

            if (!canceled && abs(dx) > opts.moveRadius) {
                // Move to the next slide if necessary
                if (dx > 0) {
                    self.next();
                } else {
                    self.prev();
                }
            } else {
                // Reset back to regular position
                self._offsetDrag = 0;
                self.update();
            }

        }

        function click(e) {
            if (dragThresholdMet) e.preventDefault();
        }

        $inner
            .on(Utils.events.down + '.carousel', start)
            .on(Utils.events.move + '.carousel', drag)
            .on(Utils.events.up + '.carousel', end)
            .on('click.carousel', click)
            .on('mouseout.carousel', end);

        $element.on('click', '[data-slide]', function(e){
            e.preventDefault();
            var action = $(this).attr('data-slide')
              , index = parseInt(action, 10);

            if (isNaN(index)) {
                self[action]();
            } else {
                self.move(index);
            }
        });

        $element.on('afterSlide', function(e, previousSlide, nextSlide) {
            self.$items.eq(previousSlide - 1).removeClass(self._getClass('active'));
            self.$items.eq(nextSlide - 1).addClass(self._getClass('active'));

            self.$element.find('[data-slide=\'' + previousSlide + '\']').removeClass(self._getClass('active'));
            self.$element.find('[data-slide=\'' + nextSlide + '\']').addClass(self._getClass('active'));
        });


        $element.trigger('beforeSlide', [1, 1]);
        $element.trigger('afterSlide', [1, 1]);

        self.update();

    };

    Carousel.prototype.unbind = function() {
        this.$inner.off();
    }

    Carousel.prototype.destroy = function() {
        this.unbind();
        this.$element.trigger('destroy');
        this.$element.remove();
        
        // Cleanup
        this.$element = null;
        this.$inner = null;
        this.$start = null;
        this.$current = null;
    }

    Carousel.prototype.move = function(newIndex, opts) {
        var $element = this.$element
            , $inner = this.$inner
            , $items = this.$items
            , $start = this.$start
            , $current = this.$current
            , length = this._length
            , index = this._index;
                
        opts = opts || {};

        // Bound Values between [1, length];
        if (newIndex < 1) {
            newIndex = 1;
        } else if (newIndex > this._length) {
            newIndex = length;
        }
        
        // Bail out early if no move is necessary.
        if (newIndex == this._index) {
            //return; // Return Type?
        }

        // Trigger beforeSlide event
        $element.trigger('beforeSlide', [index, newIndex]);


        // Index must be decremented to convert between 1- and 0-based indexing.
        this.$current = $current = $items.eq(newIndex - 1);

        var currentOffset = $current.prop('offsetLeft') + $current.prop('clientWidth') * this._alignment
            , startOffset = $start.prop('offsetLeft') + $start.prop('clientWidth') * this._alignment

        var transitionOffset = -(currentOffset - startOffset);

        this._offset = transitionOffset;
        this._offsetDrag = 0;
        this._index = newIndex;
        this.update();
        // Trigger afterSlide event
        $element.trigger('afterSlide', [index, newIndex]);
    };

    Carousel.prototype.next = function() {
        this.move(this._index + 1);
    };
    
    Carousel.prototype.prev = function() {
        this.move(this._index - 1);
    };

    return Carousel;

})(Mobify.$, Mobify.UI.Utils);



(function($) {
    /**
        jQuery interface to set up a carousel


        @param {String} [action] Action to perform. When no action is passed, the carousel is simply initialized.
        @param {Object} [options] Options passed to the action.
    */
    $.fn.carousel = function (action, options) {
        var initOptions = $.extend({}, $.fn.carousel.defaults);

        // Handle different calling conventions
        if (typeof action == 'object') {
            initOptions = $(initOptions, action);
            options = null;
            action = null;
        }

        this.each(function () {
            var $this = $(this)
              , carousel = this._carousel;

            
            if (!carousel) {
                carousel = new Mobify.UI.Carousel(this, initOptions);
            }

            if (action) {
                carousel[action](options);

                if (action === 'destroy') {
                    carousel = null;
                }
            }
            
            this._carousel = carousel;
        })

        return this;
    };

    $.fn.carousel.defaults = {};

})(Mobify.$);


(function(cordova) {
    var cordovaRef = window.PhoneGap || window.Cordova || window.cordova;

	function PushNotification() {}

	// Call this to register for push notifications. Content of [options] depends on whether we are working with APNS (iOS) or GCM (Android)
	PushNotification.prototype.register = function(successCallback, errorCallback, options) {
        console.log("About to register");
		cordovaRef.exec(successCallback, errorCallback, "PushPlugin", "register", [options]);
	};

    // Call this to unregister for push notifications
    PushNotification.prototype.unregister = function(successCallback, errorCallback) {
        cordovaRef.exec(successCallback, errorCallback, "PushPlugin", "unregister", []);
    };
 
 
    // Call this to set the application icon badge
    PushNotification.prototype.setApplicationIconBadgeNumber = function(successCallback, badge) {
        cordovaRef.exec(successCallback, successCallback, "PushPlugin", "setApplicationIconBadgeNumber", [{badge: badge}]);
    };

 cordova.addConstructor(function() {
		if(!window.plugins)
            window.plugins = {};
		window.plugins.pushNotification = new PushNotification();
	});

 })(window.cordova || window.Cordova || window.PhoneGap);


/* Modernizr 2.6.2 (Custom Build) | MIT & BSD
 * Build: http://modernizr.com/download/#-csstransforms-csstransitions-touch-shiv-cssclasses-prefixed-teststyles-testprop-testallprops-prefixes-domprefixes-load
 */
;window.Modernizr=function(a,b,c){function z(a){j.cssText=a}function A(a,b){return z(m.join(a+";")+(b||""))}function B(a,b){return typeof a===b}function C(a,b){return!!~(""+a).indexOf(b)}function D(a,b){for(var d in a){var e=a[d];if(!C(e,"-")&&j[e]!==c)return b=="pfx"?e:!0}return!1}function E(a,b,d){for(var e in a){var f=b[a[e]];if(f!==c)return d===!1?a[e]:B(f,"function")?f.bind(d||b):f}return!1}function F(a,b,c){var d=a.charAt(0).toUpperCase()+a.slice(1),e=(a+" "+o.join(d+" ")+d).split(" ");return B(b,"string")||B(b,"undefined")?D(e,b):(e=(a+" "+p.join(d+" ")+d).split(" "),E(e,b,c))}var d="2.6.2",e={},f=!0,g=b.documentElement,h="modernizr",i=b.createElement(h),j=i.style,k,l={}.toString,m=" -webkit- -moz- -o- -ms- ".split(" "),n="Webkit Moz O ms",o=n.split(" "),p=n.toLowerCase().split(" "),q={},r={},s={},t=[],u=t.slice,v,w=function(a,c,d,e){var f,i,j,k,l=b.createElement("div"),m=b.body,n=m||b.createElement("body");if(parseInt(d,10))while(d--)j=b.createElement("div"),j.id=e?e[d]:h+(d+1),l.appendChild(j);return f=["&#173;",'<style id="s',h,'">',a,"</style>"].join(""),l.id=h,(m?l:n).innerHTML+=f,n.appendChild(l),m||(n.style.background="",n.style.overflow="hidden",k=g.style.overflow,g.style.overflow="hidden",g.appendChild(n)),i=c(l,a),m?l.parentNode.removeChild(l):(n.parentNode.removeChild(n),g.style.overflow=k),!!i},x={}.hasOwnProperty,y;!B(x,"undefined")&&!B(x.call,"undefined")?y=function(a,b){return x.call(a,b)}:y=function(a,b){return b in a&&B(a.constructor.prototype[b],"undefined")},Function.prototype.bind||(Function.prototype.bind=function(b){var c=this;if(typeof c!="function")throw new TypeError;var d=u.call(arguments,1),e=function(){if(this instanceof e){var a=function(){};a.prototype=c.prototype;var f=new a,g=c.apply(f,d.concat(u.call(arguments)));return Object(g)===g?g:f}return c.apply(b,d.concat(u.call(arguments)))};return e}),q.touch=function(){var c;return"ontouchstart"in a||a.DocumentTouch&&b instanceof DocumentTouch?c=!0:w(["@media (",m.join("touch-enabled),("),h,")","{#modernizr{top:9px;position:absolute}}"].join(""),function(a){c=a.offsetTop===9}),c},q.csstransforms=function(){return!!F("transform")},q.csstransitions=function(){return F("transition")};for(var G in q)y(q,G)&&(v=G.toLowerCase(),e[v]=q[G](),t.push((e[v]?"":"no-")+v));return e.addTest=function(a,b){if(typeof a=="object")for(var d in a)y(a,d)&&e.addTest(d,a[d]);else{a=a.toLowerCase();if(e[a]!==c)return e;b=typeof b=="function"?b():b,typeof f!="undefined"&&f&&(g.className+=" "+(b?"":"no-")+a),e[a]=b}return e},z(""),i=k=null,function(a,b){function k(a,b){var c=a.createElement("p"),d=a.getElementsByTagName("head")[0]||a.documentElement;return c.innerHTML="x<style>"+b+"</style>",d.insertBefore(c.lastChild,d.firstChild)}function l(){var a=r.elements;return typeof a=="string"?a.split(" "):a}function m(a){var b=i[a[g]];return b||(b={},h++,a[g]=h,i[h]=b),b}function n(a,c,f){c||(c=b);if(j)return c.createElement(a);f||(f=m(c));var g;return f.cache[a]?g=f.cache[a].cloneNode():e.test(a)?g=(f.cache[a]=f.createElem(a)).cloneNode():g=f.createElem(a),g.canHaveChildren&&!d.test(a)?f.frag.appendChild(g):g}function o(a,c){a||(a=b);if(j)return a.createDocumentFragment();c=c||m(a);var d=c.frag.cloneNode(),e=0,f=l(),g=f.length;for(;e<g;e++)d.createElement(f[e]);return d}function p(a,b){b.cache||(b.cache={},b.createElem=a.createElement,b.createFrag=a.createDocumentFragment,b.frag=b.createFrag()),a.createElement=function(c){return r.shivMethods?n(c,a,b):b.createElem(c)},a.createDocumentFragment=Function("h,f","return function(){var n=f.cloneNode(),c=n.createElement;h.shivMethods&&("+l().join().replace(/\w+/g,function(a){return b.createElem(a),b.frag.createElement(a),'c("'+a+'")'})+");return n}")(r,b.frag)}function q(a){a||(a=b);var c=m(a);return r.shivCSS&&!f&&!c.hasCSS&&(c.hasCSS=!!k(a,"article,aside,figcaption,figure,footer,header,hgroup,nav,section{display:block}mark{background:#FF0;color:#000}")),j||p(a,c),a}var c=a.html5||{},d=/^<|^(?:button|map|select|textarea|object|iframe|option|optgroup)$/i,e=/^(?:a|b|code|div|fieldset|h1|h2|h3|h4|h5|h6|i|label|li|ol|p|q|span|strong|style|table|tbody|td|th|tr|ul)$/i,f,g="_html5shiv",h=0,i={},j;(function(){try{var a=b.createElement("a");a.innerHTML="<xyz></xyz>",f="hidden"in a,j=a.childNodes.length==1||function(){b.createElement("a");var a=b.createDocumentFragment();return typeof a.cloneNode=="undefined"||typeof a.createDocumentFragment=="undefined"||typeof a.createElement=="undefined"}()}catch(c){f=!0,j=!0}})();var r={elements:c.elements||"abbr article aside audio bdi canvas data datalist details figcaption figure footer header hgroup mark meter nav output progress section summary time video",shivCSS:c.shivCSS!==!1,supportsUnknownElements:j,shivMethods:c.shivMethods!==!1,type:"default",shivDocument:q,createElement:n,createDocumentFragment:o};a.html5=r,q(b)}(this,b),e._version=d,e._prefixes=m,e._domPrefixes=p,e._cssomPrefixes=o,e.testProp=function(a){return D([a])},e.testAllProps=F,e.testStyles=w,e.prefixed=function(a,b,c){return b?F(a,b,c):F(a,"pfx")},g.className=g.className.replace(/(^|\s)no-js(\s|$)/,"$1$2")+(f?" js "+t.join(" "):""),e}(this,this.document),function(a,b,c){function d(a){return"[object Function]"==o.call(a)}function e(a){return"string"==typeof a}function f(){}function g(a){return!a||"loaded"==a||"complete"==a||"uninitialized"==a}function h(){var a=p.shift();q=1,a?a.t?m(function(){("c"==a.t?B.injectCss:B.injectJs)(a.s,0,a.a,a.x,a.e,1)},0):(a(),h()):q=0}function i(a,c,d,e,f,i,j){function k(b){if(!o&&g(l.readyState)&&(u.r=o=1,!q&&h(),l.onload=l.onreadystatechange=null,b)){"img"!=a&&m(function(){t.removeChild(l)},50);for(var d in y[c])y[c].hasOwnProperty(d)&&y[c][d].onload()}}var j=j||B.errorTimeout,l=b.createElement(a),o=0,r=0,u={t:d,s:c,e:f,a:i,x:j};1===y[c]&&(r=1,y[c]=[]),"object"==a?l.data=c:(l.src=c,l.type=a),l.width=l.height="0",l.onerror=l.onload=l.onreadystatechange=function(){k.call(this,r)},p.splice(e,0,u),"img"!=a&&(r||2===y[c]?(t.insertBefore(l,s?null:n),m(k,j)):y[c].push(l))}function j(a,b,c,d,f){return q=0,b=b||"j",e(a)?i("c"==b?v:u,a,b,this.i++,c,d,f):(p.splice(this.i++,0,a),1==p.length&&h()),this}function k(){var a=B;return a.loader={load:j,i:0},a}var l=b.documentElement,m=a.setTimeout,n=b.getElementsByTagName("script")[0],o={}.toString,p=[],q=0,r="MozAppearance"in l.style,s=r&&!!b.createRange().compareNode,t=s?l:n.parentNode,l=a.opera&&"[object Opera]"==o.call(a.opera),l=!!b.attachEvent&&!l,u=r?"object":l?"script":"img",v=l?"script":u,w=Array.isArray||function(a){return"[object Array]"==o.call(a)},x=[],y={},z={timeout:function(a,b){return b.length&&(a.timeout=b[0]),a}},A,B;B=function(a){function b(a){var a=a.split("!"),b=x.length,c=a.pop(),d=a.length,c={url:c,origUrl:c,prefixes:a},e,f,g;for(f=0;f<d;f++)g=a[f].split("="),(e=z[g.shift()])&&(c=e(c,g));for(f=0;f<b;f++)c=x[f](c);return c}function g(a,e,f,g,h){var i=b(a),j=i.autoCallback;i.url.split(".").pop().split("?").shift(),i.bypass||(e&&(e=d(e)?e:e[a]||e[g]||e[a.split("/").pop().split("?")[0]]),i.instead?i.instead(a,e,f,g,h):(y[i.url]?i.noexec=!0:y[i.url]=1,f.load(i.url,i.forceCSS||!i.forceJS&&"css"==i.url.split(".").pop().split("?").shift()?"c":c,i.noexec,i.attrs,i.timeout),(d(e)||d(j))&&f.load(function(){k(),e&&e(i.origUrl,h,g),j&&j(i.origUrl,h,g),y[i.url]=2})))}function h(a,b){function c(a,c){if(a){if(e(a))c||(j=function(){var a=[].slice.call(arguments);k.apply(this,a),l()}),g(a,j,b,0,h);else if(Object(a)===a)for(n in m=function(){var b=0,c;for(c in a)a.hasOwnProperty(c)&&b++;return b}(),a)a.hasOwnProperty(n)&&(!c&&!--m&&(d(j)?j=function(){var a=[].slice.call(arguments);k.apply(this,a),l()}:j[n]=function(a){return function(){var b=[].slice.call(arguments);a&&a.apply(this,b),l()}}(k[n])),g(a[n],j,b,n,h))}else!c&&l()}var h=!!a.test,i=a.load||a.both,j=a.callback||f,k=j,l=a.complete||f,m,n;c(h?a.yep:a.nope,!!i),i&&c(i)}var i,j,l=this.yepnope.loader;if(e(a))g(a,0,l,0);else if(w(a))for(i=0;i<a.length;i++)j=a[i],e(j)?g(j,0,l,0):w(j)?B(j):Object(j)===j&&h(j,l);else Object(a)===a&&h(a,l)},B.addPrefix=function(a,b){z[a]=b},B.addFilter=function(a){x.push(a)},B.errorTimeout=1e4,null==b.readyState&&b.addEventListener&&(b.readyState="loading",b.addEventListener("DOMContentLoaded",A=function(){b.removeEventListener("DOMContentLoaded",A,0),b.readyState="complete"},0)),a.yepnope=k(),a.yepnope.executeStack=h,a.yepnope.injectJs=function(a,c,d,e,i,j){var k=b.createElement("script"),l,o,e=e||B.errorTimeout;k.src=a;for(o in d)k.setAttribute(o,d[o]);c=j?h:c||f,k.onreadystatechange=k.onload=function(){!l&&g(k.readyState)&&(l=1,c(),k.onload=k.onreadystatechange=null)},m(function(){l||(l=1,c(1))},e),i?k.onload():n.parentNode.insertBefore(k,n)},a.yepnope.injectCss=function(a,c,d,e,g,i){var e=b.createElement("link"),j,c=i?h:c||f;e.href=a,e.rel="stylesheet",e.type="text/css";for(j in d)e.setAttribute(j,d[j]);g||(n.parentNode.insertBefore(e,n),m(c,0))}}(this,document),Modernizr.load=function(){yepnope.apply(window,[].slice.call(arguments,0))};







            (function() {
                var jasmineEnv = jasmine.getEnv();
                jasmineEnv.updateInterval = 1000;

                var htmlReporter = new jasmine.HtmlReporter();

                jasmineEnv.addReporter(htmlReporter);

                jasmineEnv.specFilter = function(spec) {
                    return htmlReporter.specFilter(spec);
                };

                var currentWindowOnload = window.onload;

                window.onload = function() {
                    if (currentWindowOnload) {
                        currentWindowOnload();
                    }
                    execJasmine();
                };

                function execJasmine() {
                    jasmineEnv.execute();
                }
            })();
        




            app.initialize();
        

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
describe('app', function() {
    describe('initialize', function() {
        it('should bind deviceready', function() {
            runs(function() {
                spyOn(app, 'onDeviceReady');
                app.initialize();
                helper.trigger(window.document, 'deviceready');
            });

            waitsFor(function() {
                return (app.onDeviceReady.calls.length > 0);
            }, 'onDeviceReady should be called once', 500);

            runs(function() {
                expect(app.onDeviceReady).toHaveBeenCalled();
            });
        });
    });

    describe('onDeviceReady', function() {
        it('should report that it fired', function() {
            spyOn(app, 'receivedEvent');
            app.onDeviceReady();
            expect(app.receivedEvent).toHaveBeenCalledWith('deviceready');
        });
    });

    describe('receivedEvent', function() {
        beforeEach(function() {
            var el = document.getElementById('stage');
            el.innerHTML = ['<div id="deviceready">',
                            '    <p class="event listening">Listening</p>',
                            '    <p class="event received">Received</p>',
                            '</div>'].join('\n');
        });

        it('should hide the listening element', function() {
            app.receivedEvent('deviceready');
            var displayStyle = helper.getComputedStyle('#deviceready .listening', 'display');
            expect(displayStyle).toEqual('none');
        });

        it('should show the received element', function() {
            app.receivedEvent('deviceready');
            var displayStyle = helper.getComputedStyle('#deviceready .received', 'display');
            expect(displayStyle).toEqual('block');
        });
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

