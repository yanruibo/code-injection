








(function(){function j(n,l){var o=this,m;o.element=typeof n=="object"?n:document.getElementById(n);o.wrapper=o.element.parentNode;o.element.style.webkitTransitionProperty="-webkit-transform";o.element.style.webkitTransitionTimingFunction="cubic-bezier(0,0,0.25,1)";o.element.style.webkitTransitionDuration="0";o.element.style.webkitTransform=h+"0,0"+b;o.options={bounce:d,momentum:d,checkDOMChanges:true,topOnDOMChanges:false,hScrollbar:d,vScrollbar:d,fadeScrollbar:g||!a,shrinkScrollbar:g||!a,desktopCompatibility:false,overflow:"auto",snap:false,bounceLock:false,scrollbarColor:"rgba(0,0,0,0.5)",onScrollEnd:function(){}};if(typeof l=="object"){for(m in l){o.options[m]=l[m]}}if(o.options.desktopCompatibility){o.options.overflow="hidden"}o.onScrollEnd=o.options.onScrollEnd;delete o.options.onScrollEnd;o.wrapper.style.overflow=o.options.overflow;o.refresh();window.addEventListener("onorientationchange" in window?"orientationchange":"resize",o,false);if(a||o.options.desktopCompatibility){o.element.addEventListener(f,o,false);o.element.addEventListener(i,o,false);o.element.addEventListener(e,o,false)}if(o.options.checkDOMChanges){o.element.addEventListener("DOMSubtreeModified",o,false)}}j.prototype={x:0,y:0,enabled:true,handleEvent:function(m){var l=this;switch(m.type){case f:l.touchStart(m);break;case i:l.touchMove(m);break;case e:l.touchEnd(m);break;case"webkitTransitionEnd":l.transitionEnd();break;case"orientationchange":case"resize":l.refresh();break;case"DOMSubtreeModified":l.onDOMModified(m);break}},onDOMModified:function(m){var l=this;if(m.target.parentNode!=l.element){return}setTimeout(function(){l.refresh()},0);if(l.options.topOnDOMChanges&&(l.x!=0||l.y!=0)){l.scrollTo(0,0,"0")}},refresh:function(){var m=this,o=m.x,n=m.y,l;m.scrollWidth=m.wrapper.clientWidth;m.scrollHeight=m.wrapper.clientHeight;m.scrollerWidth=m.element.offsetWidth;m.scrollerHeight=m.element.offsetHeight;m.maxScrollX=m.scrollWidth-m.scrollerWidth;m.maxScrollY=m.scrollHeight-m.scrollerHeight;m.directionX=0;m.directionY=0;if(m.scrollX){if(m.maxScrollX>=0){o=0}else{if(m.x<m.maxScrollX){o=m.maxScrollX}}}if(m.scrollY){if(m.maxScrollY>=0){n=0}else{if(m.y<m.maxScrollY){n=m.maxScrollY}}}if(m.options.snap){m.maxPageX=-Math.floor(m.maxScrollX/m.scrollWidth);m.maxPageY=-Math.floor(m.maxScrollY/m.scrollHeight);l=m.snap(o,n);o=l.x;n=l.y}if(o!=m.x||n!=m.y){m.setTransitionTime("0");m.setPosition(o,n,true)}m.scrollX=m.scrollerWidth>m.scrollWidth;m.scrollY=!m.options.bounceLock&&!m.scrollX||m.scrollerHeight>m.scrollHeight;if(m.options.hScrollbar&&m.scrollX){m.scrollBarX=m.scrollBarX||new k("horizontal",m.wrapper,m.options.fadeScrollbar,m.options.shrinkScrollbar,m.options.scrollbarColor);m.scrollBarX.init(m.scrollWidth,m.scrollerWidth)}else{if(m.scrollBarX){m.scrollBarX=m.scrollBarX.remove()}}if(m.options.vScrollbar&&m.scrollY&&m.scrollerHeight>m.scrollHeight){m.scrollBarY=m.scrollBarY||new k("vertical",m.wrapper,m.options.fadeScrollbar,m.options.shrinkScrollbar,m.options.scrollbarColor);m.scrollBarY.init(m.scrollHeight,m.scrollerHeight)}else{if(m.scrollBarY){m.scrollBarY=m.scrollBarY.remove()}}},setPosition:function(l,o,n){var m=this;m.x=l;m.y=o;m.element.style.webkitTransform=h+m.x+"px,"+m.y+"px"+b;if(!n){if(m.scrollBarX){m.scrollBarX.setPosition(m.x)}if(m.scrollBarY){m.scrollBarY.setPosition(m.y)}}},setTransitionTime:function(m){var l=this;m=m||"0";l.element.style.webkitTransitionDuration=m;if(l.scrollBarX){l.scrollBarX.bar.style.webkitTransitionDuration=m;l.scrollBarX.wrapper.style.webkitTransitionDuration=d&&l.options.fadeScrollbar?"300ms":"0"}if(l.scrollBarY){l.scrollBarY.bar.style.webkitTransitionDuration=m;l.scrollBarY.wrapper.style.webkitTransitionDuration=d&&l.options.fadeScrollbar?"300ms":"0"}},touchStart:function(n){var m=this,l;if(!m.enabled){return}n.preventDefault();n.stopPropagation();m.scrolling=true;m.moved=false;m.distX=0;m.distY=0;m.setTransitionTime("0");if(m.options.momentum||m.options.snap){l=new WebKitCSSMatrix(window.getComputedStyle(m.element).webkitTransform);if(l.e!=m.x||l.f!=m.y){document.removeEventListener("webkitTransitionEnd",m,false);m.setPosition(l.e,l.f);m.moved=true}}m.touchStartX=a?n.changedTouches[0].pageX:n.pageX;m.scrollStartX=m.x;m.touchStartY=a?n.changedTouches[0].pageY:n.pageY;m.scrollStartY=m.y;m.scrollStartTime=n.timeStamp;m.directionX=0;m.directionY=0},touchMove:function(r){if(!this.scrolling){return}var p=this,o=a?r.changedTouches[0].pageX:r.pageX,n=a?r.changedTouches[0].pageY:r.pageY,m=p.scrollX?o-p.touchStartX:0,l=p.scrollY?n-p.touchStartY:0,s=p.x+m,q=p.y+l;r.stopPropagation();p.touchStartX=o;p.touchStartY=n;if(s>=0||s<p.maxScrollX){s=p.options.bounce?Math.round(p.x+m/3):(s>=0||p.maxScrollX>=0)?0:p.maxScrollX}if(q>=0||q<p.maxScrollY){q=p.options.bounce?Math.round(p.y+l/3):(q>=0||p.maxScrollY>=0)?0:p.maxScrollY}if(p.distX+p.distY>5){if(p.distX-3>p.distY){q=p.y;l=0}else{if(p.distY-3>p.distX){s=p.x;m=0}}p.setPosition(s,q);p.moved=true;p.directionX=m>0?-1:1;p.directionY=l>0?-1:1}else{p.distX+=Math.abs(m);p.distY+=Math.abs(l)}},touchEnd:function(t){if(!this.scrolling){return}var s=this,o=t.timeStamp-s.scrollStartTime,w=a?t.changedTouches[0]:t,u,v,n,l,m=0,r=s.x,q=s.y,p;s.scrolling=false;if(!s.moved){s.resetPosition();if(a){u=w.target;while(u.nodeType!=1){u=u.parentNode}v=document.createEvent("MouseEvents");v.initMouseEvent("click",true,true,t.view,1,w.screenX,w.screenY,w.clientX,w.clientY,t.ctrlKey,t.altKey,t.shiftKey,t.metaKey,0,null);v._fake=true;u.dispatchEvent(v)}return}if(!s.options.snap&&o>250){s.resetPosition();return}if(s.options.momentum){n=s.scrollX===true?s.momentum(s.x-s.scrollStartX,o,s.options.bounce?-s.x+s.scrollWidth/5:-s.x,s.options.bounce?s.x+s.scrollerWidth-s.scrollWidth+s.scrollWidth/5:s.x+s.scrollerWidth-s.scrollWidth):{dist:0,time:0};l=s.scrollY===true?s.momentum(s.y-s.scrollStartY,o,s.options.bounce?-s.y+s.scrollHeight/5:-s.y,s.options.bounce?(s.maxScrollY<0?s.y+s.scrollerHeight-s.scrollHeight:0)+s.scrollHeight/5:s.y+s.scrollerHeight-s.scrollHeight):{dist:0,time:0};m=Math.max(Math.max(n.time,l.time),1);r=s.x+n.dist;q=s.y+l.dist}if(s.options.snap){p=s.snap(r,q);r=p.x;q=p.y;m=Math.max(p.time,m)}s.scrollTo(r,q,m+"ms")},transitionEnd:function(){var l=this;document.removeEventListener("webkitTransitionEnd",l,false);l.resetPosition()},resetPosition:function(){var l=this,n=l.x,m=l.y;if(l.x>=0){n=0}else{if(l.x<l.maxScrollX){n=l.maxScrollX}}if(l.y>=0||l.maxScrollY>0){m=0}else{if(l.y<l.maxScrollY){m=l.maxScrollY}}if(n!=l.x||m!=l.y){l.scrollTo(n,m)}else{if(l.moved){l.onScrollEnd();l.moved=false}if(l.scrollBarX){l.scrollBarX.hide()}if(l.scrollBarY){l.scrollBarY.hide()}}},snap:function(l,o){var m=this,n;if(m.directionX>0){l=Math.floor(l/m.scrollWidth)}else{if(m.directionX<0){l=Math.ceil(l/m.scrollWidth)}else{l=Math.round(l/m.scrollWidth)}}m.pageX=-l;l=l*m.scrollWidth;if(l>0){l=m.pageX=0}else{if(l<m.maxScrollX){m.pageX=m.maxPageX;l=m.maxScrollX}}if(m.directionY>0){o=Math.floor(o/m.scrollHeight)}else{if(m.directionY<0){o=Math.ceil(o/m.scrollHeight)}else{o=Math.round(o/m.scrollHeight)}}m.pageY=-o;o=o*m.scrollHeight;if(o>0){o=m.pageY=0}else{if(o<m.maxScrollY){m.pageY=m.maxPageY;o=m.maxScrollY}}n=Math.round(Math.max(Math.abs(m.x-l)/m.scrollWidth*500,Math.abs(m.y-o)/m.scrollHeight*500));return{x:l,y:o,time:n}},scrollTo:function(m,l,o){var n=this;if(n.x==m&&n.y==l){n.resetPosition();return}n.moved=true;n.setTransitionTime(o||"350ms");n.setPosition(m,l);if(o==="0"||o=="0s"||o=="0ms"){n.resetPosition()}else{document.addEventListener("webkitTransitionEnd",n,false)}},scrollToPage:function(n,m,p){var o=this,l;if(!o.options.snap){o.pageX=-Math.round(o.x/o.scrollWidth);o.pageY=-Math.round(o.y/o.scrollHeight)}if(n=="next"){n=++o.pageX}else{if(n=="prev"){n=--o.pageX}}if(m=="next"){m=++o.pageY}else{if(m=="prev"){m=--o.pageY}}n=-n*o.scrollWidth;m=-m*o.scrollHeight;l=o.snap(n,m);n=l.x;m=l.y;o.scrollTo(n,m,p||"500ms")},scrollToElement:function(m,o){m=typeof m=="object"?m:this.element.querySelector(m);if(!m){return}var n=this,l=n.scrollX?-m.offsetLeft:0,p=n.scrollY?-m.offsetTop:0;if(l>=0){l=0}else{if(l<n.maxScrollX){l=n.maxScrollX}}if(p>=0){p=0}else{if(p<n.maxScrollY){p=n.maxScrollY}}n.scrollTo(l,p,o)},momentum:function(s,m,q,l){var p=2.5,r=1.2,n=Math.abs(s)/m*1000,o=n*n/p/1000,t=0;if(s>0&&o>q){n=n*q/o/p;o=q}else{if(s<0&&o>l){n=n*l/o/p;o=l}}o=o*(s<0?-1:1);t=n/r;return{dist:Math.round(o),time:Math.round(t)}},destroy:function(l){var m=this;window.removeEventListener("onorientationchange" in window?"orientationchange":"resize",m,false);m.element.removeEventListener(f,m,false);m.element.removeEventListener(i,m,false);m.element.removeEventListener(e,m,false);document.removeEventListener("webkitTransitionEnd",m,false);if(m.options.checkDOMChanges){m.element.removeEventListener("DOMSubtreeModified",m,false)}if(m.scrollBarX){m.scrollBarX=m.scrollBarX.remove()}if(m.scrollBarY){m.scrollBarY=m.scrollBarY.remove()}if(l){m.wrapper.parentNode.removeChild(m.wrapper)}return null}};function k(m,r,q,n,l){var o=this,p=document;o.dir=m;o.fade=q;o.shrink=n;o.uid=++c;o.bar=p.createElement("div");o.bar.style.cssText="position:absolute;top:0;left:0;-webkit-transition-timing-function:cubic-bezier(0,0,0.25,1);pointer-events:none;-webkit-transition-duration:0;-webkit-transition-delay:0;-webkit-transition-property:-webkit-transform;z-index:10;background:"+l+";-webkit-transform:"+h+"0,0"+b+";"+(m=="horizontal"?"-webkit-border-radius:3px 2px;min-width:6px;min-height:5px":"-webkit-border-radius:2px 3px;min-width:5px;min-height:6px");o.wrapper=p.createElement("div");o.wrapper.style.cssText="-webkit-mask:-webkit-canvas(scrollbar"+o.uid+o.dir+");position:absolute;z-index:10;pointer-events:none;overflow:hidden;opacity:0;-webkit-transition-duration:"+(q?"300ms":"0")+";-webkit-transition-delay:0;-webkit-transition-property:opacity;"+(o.dir=="horizontal"?"bottom:2px;left:2px;right:7px;height:5px":"top:2px;right:2px;bottom:7px;width:5px;");o.wrapper.appendChild(o.bar);r.appendChild(o.wrapper)}k.prototype={init:function(l,n){var o=this,q=document,p=Math.PI,m;if(o.dir=="horizontal"){if(o.maxSize!=o.wrapper.offsetWidth){o.maxSize=o.wrapper.offsetWidth;m=q.getCSSCanvasContext("2d","scrollbar"+o.uid+o.dir,o.maxSize,5);m.fillStyle="rgb(0,0,0)";m.beginPath();m.arc(2.5,2.5,2.5,p/2,-p/2,false);m.lineTo(o.maxSize-2.5,0);m.arc(o.maxSize-2.5,2.5,2.5,-p/2,p/2,false);m.closePath();m.fill()}}else{if(o.maxSize!=o.wrapper.offsetHeight){o.maxSize=o.wrapper.offsetHeight;m=q.getCSSCanvasContext("2d","scrollbar"+o.uid+o.dir,5,o.maxSize);m.fillStyle="rgb(0,0,0)";m.beginPath();m.arc(2.5,2.5,2.5,p,0,false);m.lineTo(5,o.maxSize-2.5);m.arc(2.5,o.maxSize-2.5,2.5,0,p,false);m.closePath();m.fill()}}o.size=Math.max(Math.round(o.maxSize*o.maxSize/n),6);o.maxScroll=o.maxSize-o.size;o.toWrapperProp=o.maxScroll/(l-n);o.bar.style[o.dir=="horizontal"?"width":"height"]=o.size+"px"},setPosition:function(m){var l=this;if(l.wrapper.style.opacity!="1"){l.show()}m=Math.round(l.toWrapperProp*m);if(m<0){m=l.shrink?m+m*3:0;if(l.size+m<7){m=-l.size+6}}else{if(m>l.maxScroll){m=l.shrink?m+(m-l.maxScroll)*3:l.maxScroll;if(l.size+l.maxScroll-m<7){m=l.size+l.maxScroll-6}}}m=l.dir=="horizontal"?h+m+"px,0"+b:h+"0,"+m+"px"+b;l.bar.style.webkitTransform=m},show:function(){if(d){this.wrapper.style.webkitTransitionDelay="0"}this.wrapper.style.opacity="1"},hide:function(){if(d){this.wrapper.style.webkitTransitionDelay="350ms"}this.wrapper.style.opacity="0"},remove:function(){this.wrapper.parentNode.removeChild(this.wrapper);return null}};var d=("WebKitCSSMatrix" in window&&"m11" in new WebKitCSSMatrix()),g=(/iphone|ipad/gi).test(navigator.appVersion),a=("ontouchstart" in window),f=a?"touchstart":"mousedown",i=a?"touchmove":"mousemove",e=a?"touchend":"mouseup",h="translate"+(d?"3d(":"("),b=d?",0)":")",c=0;window.iScroll=j})();


/* configuration */
var maxLength = 40;
var maxDownloadEntries = 30;
var idEntry = 0;
var entriesbd = 0;

var url = 'http://blog.ayesa.com/ayesa/mobileapp?p_p_id=mobile_WAR_mobileappportlet&p_p_lifecycle=2&p_p_state=normal&p_p_mode=view&p_p_resource_id=blogapp&p_p_cacheability=cacheLevelPage&p_p_col_id=column-1&p_p_col_count=1';


/* writing HTML */
  
document.write(
  '<div data-role="page" id="list">' +
  '  <div id="header" data-role="header" data-position="inline" data-theme="c">' +
  '    <h1>'+
  '          <img src="css/images/logo_ayesa.png">'+
  '          <div class="widgetTitle">El Blog de Ingenieria Virtual Inteligente</div> '+
  '      </h1>' + 
  '  </div>' +
               
  '<div id="wrapper" class="wrapper">'+
  '  <div id="listscroller" data-role="content">' +
  '    <div id="cargando"><img src="css/images/loading.gif" />  Cargando...</div>'+
  '    <ul data-role="listview" id="articleList" data-theme="c">'+
  '       <li id="updatelist" style="display:none"></li>'
               
);

document.write(
  '    </ul>' +
  '  </div>' + //Content Scroller
  '  </div>'+ //wrapper
  '  <div id="footer" data-role="footer" data-theme="c">' +
  '  </div>'+
  '</div>'+ //page
  '<div id="contentlist"></div>'

);

loadedlist();


document.write(	
    '<a id="lnkDialog" href="#dialog" data-rel="dialog" style="display:none;" data-transition="none"></a>'+
               
    '<div data-role="dialog" id="dialog">'+
    '<div data-role="header" data-theme="c">'+
    '    <h1>Ingeniería Virtual Inteligente</h1>'+
    '</div>'+    
    '<div data-role="content" id="text">'+
    '<p>La ingeniería Virtual Inteligente es un nuevo concepto de ingeniería, en el que se fusionan los sistemas de información con las infraestructuras y el entorno, para proporcionar servicios inteligentes que permitan transformar el mundo tal y como lo conocemos actualmente, y hacer de él uno más conectado, inteligente y eficiente.</p>'+
               
    '<p>Este nuevo concepto busca mejorar la calidad de vida de las personas, proporcionando para ello mejores servicios, concebidos de forma integral y sostenible, haciendo un uso responsable de los recursos naturales y económicos de que disponemos.</p>'+
               
    '<p>Se abre ahora una nueva dimensión, donde podemos imaginar soluciones globales, innovadoras e inteligentes, que sean capaces de dar respuesta a las necesidades del futuro.</p>'+
               
    '</div>'+    
    '</div>'
);

document.write(	
               '<a id="cnxDialog" href="#cnxdialogcontent" data-rel="dialog" style="display:none;" data-transition="pop"></a>'+
               '<div data-role="dialog" id="cnxdialogcontent">'+
               '<div data-role="header" data-theme="c">'+
               '    <h1>Error de conexión</h1>'+
               '</div>'+    
               '<div data-role="content" id="text">'+
               
               '<p style="text-align:justify;">Hay problemas de conexión a internet, toca el siguiente botón para volver a conectar o cierra este diálogo para utilizar la aplicación en modo sin conexión</p>'+
               '<a id="reconnect" href="index.html" data-role="button" data-icon="refresh" onclick="location.reload(true)">Volver a intentar</a>' + 
               '<a id="cancelcnx" href="#" data-role="button" data-icon="home" onclick="$(".ui-dialog").dialog("close")">Cancelar</a>' +
               '</div>'+    
               '</div>'
);


function writehtml(){
    var numPages = maxLength+maxDownloadEntries;

    for(i=1; i<=numPages; i++){
        
    //console.log('writing page '+i);  
        
    var content = '<div class="articlepage" data-role="page" id="article' + i + '" data-add-back-btn="true">' +
    
    '  <div id="header'+i+'" data-role="header" data-position="inline" data-theme="c">' +
    '    <a href="#list" data-role="button" data-icon="home" data-back="true">inicio</a>' +    
    '    <h1><img src="css/images/logo_ayesa.png">'+
    '    </h1>' +
    
    '  </div>' + //header
    
    '<div id="wrapper'+i+'" class="wrapper">'+
    '  <div id="scroller'+i+'" data-role="content">' +
    '     <div class="aTitle" id="articleTitle' + i + '">&nbsp;</div>' +
    '         <div style="text-align:right;" id="comments' + i + '">'+
    '         <a class="comments" id="commentslink'+ i +'" href="#" numcomments="0" num="'+ i +'" data-role="button" data-inline="true" data-icon="arrow-d" data-mini="true">0 comentarios</a>'+
    '         </div>' + //comments
    '     <div class="metainfo">' +
    '         <div class="authorContent">' +
    '             <div id="authorContent' + i + '"></div>' +
    '             <div id="publishedDate' + i + '" class="publishedDate"></div>' + 
    '         </div>' +
    '         <div data-role="popup" state="off" style="display:none;text-align:left;font-size:small;" id="commentscontent'+ i +'"></div>'+        
    '     </div>' +//metainfo
    '     <div id="articleContent' + i + '" class="articleContent"></div>' +
    
    '  </div>' +//scroller
    '</div>'+ //wrapper
    
    '  <div id="footer'+i+'" data-role="footer" data-theme="c" class="articlefooter">' +
    '  <div class="cargando" id="cargandopage"'+i+'><img src="css/images/loading.gif" />  Cargando...</div>'+
    '    <div class="navegacion" data-role="navbar" data-type="horizontal">' +
    '       <ul>'+
    '          <li><a href="#article' + String(i+1) + '" num="'+  String(i+1) +'" data-role="button" data-icon="arrow-l"' +
    '           data-inline="true" class="nextButton" data-iconpos="right" data-transition="none">siguiente</a></li>' +
    '         <li><a href="#article' + String(i-1) + '" num="'+  String(i-1) +'" data-role="button" data-icon="arrow-r"' +
    '           data-inline="true" class="prevButton" data-iconpos="left" data-direction="reverse" data-transition="none">anterior</a></li>' +
    '          <li><a id="sizeplus" class="sizeplus" num="'+i+'" href="#" data-role="button" data-icon="plus">A</a></li>' +
    '          <li><a id="sizeminus" class="sizeminus" num="'+i+'" href="#" data-role="button" data-icon="minus">a</a></li>' +
    '       </ul>'+
    '    </div>' +//navbar
    '  </div>' +//footer
    
    '</div>'//page

    
    $('#contentlist').append(content);
     
    }
}
 

var db = false;

document.addEventListener("deviceready", onDeviceReady, false);

function onDeviceReady() {
    //console.log("initDB");
    db = window.openDatabase("BlogDB", "1.0", "Ayesa Blog DB", 200000); //5MB
    db.transaction(populateDB, transaction_error, transaction_success);
    db.transaction(getmaxLength, transaction_error, transaction_success);
    db.transaction(getEntries, transaction_error, transaction_success);
    db.transaction(getComments, transaction_error, transaction_success);

    getOnlineFeed(url);
}

/* Storage */
function transaction_success() {
	//console.log('Database success');
}
	
function transaction_error(error) {
    //console.log("Database Error: " + error.message);
}

function getmaxLength(tx) {
    //console.log("getmaxLength");
    var sql = 'SELECT * FROM "entries";';
	tx.executeSql(sql, [], getmaxLength_success, transaction_error);
}

function getmaxLength_success(tx, results){
    //console.log("getmaxLength_success");
    maxLength = results.rows.length; 
    writehtml();
    $('#article1 .prevButton').addClass('ui-disabled'); //deshabilitar
    $('#article1 .prevButton').attr('href', '#');
    $('#article' + maxLength + ' .nextButton').addClass('ui-disabled'); //deshabilitar
    $('#article' + maxLength + ' .nextButton').attr('href', '#');
}

function getEntries(tx) {
    //console.log("getEntries");
	var sql = 'SELECT * FROM "entries";';
	tx.executeSql(sql, [],getEntries_success, transaction_error);
}

function getEntries_success(tx, results) {
    //console.log("getEntries_success");

    var len = results.rows.length;
    //console.log("Entradas en BD= " + len);

    idEntry = 0;
    for (var i=0;i<len;i++) {
    	printEntry(results.rows.item(i));
    }    
    entriesbd = len;
    //Actualizar entradas
    $(function() {
      $.event.special.swipe.verticalDistanceThreshold = 30;
      
      $('#list'+len).bind('dragstart', function(event) {event.preventDefault(); });
      
      $('#list'+len).scrollstart(function(e){
        if ($('#updatelist').length == 0){
            $('#articleList').prepend('<li id="updatelist"><div><img src="css/images/arrow_down.png" />   Soltar para actualizar...</div></li>');
            $('#articleList').refresh();
        }
                                 
      });
      $('#list'+len).scrollstop(function(e){
        $('#updatelist').remove();
        if ($('#updatelist').length == 0){
           $('#articleList').prepend('<li id="updatelist"><div><img src="css/images/loading.gif" />  Actualizando...</div></li>');
           getOnlineFeed(url);           
        }                       
      });
    });
    
    //Se muestra la primera vez que se ejecuta la app
    if (len == 0) {
        $("#lnkDialog").click();
    }
   
}

function printEntry(entry){
    idEntry = idEntry+1;
    
    //console.log(idEntry+" Leyendo desde cache: "+entry.title);
    
    /* List */
    var elem = '<li id="list' + idEntry + '">'+ 
    '<a class="listlink" data-transition="none" href="#article' + idEntry + '">'+
    '<div id="link' + idEntry + '">'+entry.title+'</div>'+
    '<div id="contentSnippet' + idEntry + '" class="contentSnippet">'+entry.contentSnippet+'</div>'+
    '</a></li>';

    $('#articleList').prepend(elem);
    $('#articleList').listview("refresh");
    
    /* Article */
    $('#articleTitle' + idEntry).text(entry.title);
    $('#openButton' + idEntry).attr('href', entry.link);
    //var contentmod = unescape(entry.content).replace(/&amp;/g, '&');
    var contentmod = unescape(entry.content);
    //contentmod = replaceAll(contentmod, '/&amp;/g', '&');
    contentmod = replaceAll(contentmod, '/image/image_gallery', 'http://blog.ayesa.com/image/image_gallery');
    $('#articleContent' + idEntry).append(contentmod);
    $('#authorContent' + idEntry).append(entry.author);
    $('#publishedDate' + idEntry).append(entry.publishedDate);
    //setDateFormat(idEntry);
    
    loaded(idEntry);
}

function updateComments(entry) {
    //console.log('updateComments');
    
           db.transaction(function(tx) {
                   var sql = 'SELECT * FROM "comments" WHERE titleEntry="'+entry.title+'";';

                   tx.executeSql(sql,[],function(tx,results){
                   
                	   var idE = 0;  
                	   
                	   for (var i=0;i<results.rows.length;i++) {
                		   idE = results.rows.item(i).idEntry;
       				   }                      	                	   
                		   
                		   var sql = 'DELETE FROM "comments" WHERE titleEntry="'+entry.title+'";';
                		   tx.executeSql(sql,[],function(tx,results){
                			   $('#commentscontent' + idE).html("");
                			   
                			   //$('#commentslink' + idE).text(parseInt(entry.comments.length)+' comentarios');
                			   $('#commentslink' + idE).prev('span').find('span.ui-btn-text').text(parseInt(entry.comments.length)+' comentarios');
                			   
                			   $.each(entry.comments, function(i,comment){
                				
                               	if (comment.user != 'test') {
                                   	
                                    var bodymod = comment.body;
                                    bodymod = replaceAll(bodymod, '"', '');
                                    var sql = 'INSERT INTO "comments" (idEntry,titleEntry, body,user,date) VALUES("'+idE+'","'+entry.title+'","'+bodymod+'","'+comment.user+'","'+comment.date+'")';
                                    
                                    tx.executeSql(sql, function(result){ 
                                    		
                                           	//console.log("Insertando comentario "+idE+" en: "+entry.title);                                                                     
                                    }, transaction_error);
                                        
                                                   
                                       $('#commentscontent' + idE).append('<div><p><b>'+comment.user+': </b>'+comment.body+'</p></div>');
                                   }else{
                                       $('#commentslink' + idE).text(parseInt(entry.comments.length)-1+' comentarios');
                                   }
                               });
                			   
                			   /*$('#commentslink' + idE).button();
                			   $('#commentslink' + idE).buttonMarkup({ inline: true });
                			   $('#commentslink' + idE).buttonMarkup({ mini: true });*/
                			   
                			   
                		   },transaction_error);//DELETE
                	   
                   }, transaction_error); //SELECT
           });
           
}


function getComments(tx){
    //console.log('printComments');
    
    //idEntry = maxLength+1;
    var sql = 'SELECT * FROM "comments";';
    
    //var sql = 'SELECT * FROM entries INNER JOIN comments ON entries.title=comments.entry;';
    
    tx.executeSql(sql, [],getComments_success, transaction_error);
    
   }

function getComments_success(tx, results){
    //console.log('Comentarios en BD: '+results.rows.length);
    for (var i=0;i<results.rows.length;i++) {
    	printComments(results.rows.item(i));
    }
}

function printComments(comment){
    //console.log('Comentario número: '+comment.idEntry);
    $('#commentscontent' + comment.idEntry).append('<div><p><b>'+comment.user+': </b>'+comment.body+'</p></div>');
    var num = $('#commentslink' + comment.idEntry).attr('numcomments');
    num = parseInt(num)+1;
    $('#commentslink' + comment.idEntry).attr('numcomments', num);
    $('#commentslink' + comment.idEntry).html(num+' comentarios');
}

function populateDB(tx) {
	//console.log('populateDB');
	var sql = 'CREATE TABLE IF NOT EXISTS entries (id, title, content, contentSnippet, author, publishedDate, comments);';
    tx.executeSql(sql);
    sql = 'CREATE TABLE IF NOT EXISTS comments (idEntry, titleEntry, body, user, date);';
    tx.executeSql(sql);
}

function insertEntry(entry) {

    db.transaction(function(tx) {
        var sql = '';                   
         
        entry.contentSnippet = entry.contentSnippet + '...';
        
        sql = 'INSERT INTO "entries" (title,content,contentSnippet,author,publishedDate) VALUES("'+entry.title+'","'+escape(entry.content)+'","'+entry.contentSnippet+'","'+entry.author+'","'+entry.publishedDate+'")';
                           
        tx.executeSql(sql,[],function(){

        $('#article' + idEntry + ' .nextButton').removeClass('ui-disabled');
        //$('#article' + idEntry + ' .nextButton').addClass('ui-enabled'); //habilitar 
        
        //console.log("Valor anterior idEntry: "+idEntry);
        
        idEntry = idEntry+1;              
        
        $('#article' + idEntry + ' .nextButton').addClass('ui-disabled'); //deshabilitar
        //$('#article' + idEntry + ' .nextButton').attr('href', '#');
                      
        //console.log(idEntry+" Insertando entrada: "+entry.title);              
                      
        /* List */
        var elem = '<li id="list' + idEntry + '"> <a data-transition="none" href="#article' + idEntry + '"><div id="link' + idEntry + '">'+entry.title+'</div><div id="contentSnippet' + idEntry + '" class="contentSnippet">'+entry.contentSnippet+'</div></a></li>';
                                        

        $('#articleList').prepend(elem);              
        
        $('#articleList').listview("refresh");
        
        /* Article */
        $('#articleTitle' + idEntry).text(entry.title);
        $('#openButton' + idEntry).attr('href', entry.link);
        var contentmod = unescape(entry.content).replace(/&amp;/g, '&');
        contentmod = contentmod.replace('/image/image_gallery', 'http://blog.ayesa.com/image/image_gallery');
        $('#articleContent' + idEntry).append(contentmod);
        $('#authorContent' + idEntry).append(entry.author);
        $('#publishedDate' + idEntry).append(entry.publishedDate);
        
        
        
        //Comments
        $('#commentslink' + idEntry).html(entry.comments.length+' comentarios');

    $.each(entry.comments, function(i,comment){
   		if (comment.user != 'test') {
   		   var idEntry_tmp = idEntry;
           db.transaction(function(tx) {
                          var bodymod = comment.body;
                          bodymod = replaceAll(bodymod, '"', '');
                          var sql = 'INSERT INTO "comments" (idEntry, titleEntry, body, user, date) VALUES("'+idEntry_tmp+'","'+entry.title+'","'+bodymod+'","'+comment.user+'","'+comment.date+'")';    
                          tx.executeSql(sql, [],function(tx, result){ 
                                        //console.log("Insertando comentario "+ idEntry_tmp +" en: "+entry.title);
                                        
                                        }, transaction_error);
                          }) 

           $('#commentscontent' + idEntry).append('<div><p><b>'+comment.user+': </b>'+comment.body+'</p></div>');                        
         }else{
           $('#commentslink' + idEntry).html(parseInt(entry.comments.length)-1+' comentarios');
         }   
    });
    
                        
    loaded(idEntry);

                      
        }, transaction_error);//inserto en la bd

    });
}

function addEntry(entry) {;
    //console.log('analyzing '+entry.title);
    db.transaction(function(tx) {
        var sql = 'SELECT * FROM "entries" WHERE title="'+entry.title+'";';                   
        tx.executeSql(sql, [],function(tx, result){
            if (result.rows.length==0){
                insertEntry(entry);
            }else{
                updateComments(entry);          
            }
                                 
        }, transaction_error);
    }) 
}


/* functions */
function listEntries(json) {
    
  if (json == null) {
      //$("#cnxDialog").dialog("close");
      //console.log('error downloading');
	  var x = 0;
	  setTimeout(function() {
	      x++;
	      if(x < 200) setTimeout(arguments.callee, 1);
	      if(x == 199) {
                 $('#updatelist').remove();
                 $('#cargando').remove();
                 //console.log('error dialog');
                 $("#cnxDialog").click();
          }
	  } ,1)
    
	  return false;
  }
  $('.widgetTitle').text(json.title);
  var articleLength =json.entries.length;
  //console.log(articleLength+' entries downloaded!');
  
  //idEntry = (maxLength+articleLength+1);
  idEntry = entriesbd;
  //console.log("idEntry: "+idEntry);
  //console.log("entriesBD: "+entriesbd);
              
  if (articleLength > 0) {
    $('#article' + maxLength + ' .nextButton').addClass('ui-enabled'); //habilitar
  
     
    $.each(json.entries, function(i,entry){
       addEntry(entry);    
    });


  }
    
  var x = 0;
  setTimeout(function() {
      x++;
      if(x < 200) setTimeout(arguments.callee, 1);
      if(x == 199) {$('#updatelist').remove();$('#cargando').remove();}
  } ,1)
};

function getOnlineFeed(url) {
    //console.log('connecting to server: '+url+'...');
    $.getJSON(url, function(data) {
        listEntries(data);       
    });
}

function loaded(i) {
    var s = 'scroller';
    window[s+i] = new iScroll('scroller'+i, { shrinkScrollbar: true }); 
    setHeight(i);
}

function loadedlist() {
  sc = new iScroll('listscroller');
  setHeightlist();
}

function setiPhoneDefaultHeight(i){
  $('#wrapper'+i).css('height', 344 + 'px');
}

function setHeight(i) {
  var headerH = $('#header'+i).attr('offsetHeight');
  var footerH = $('#footer'+i).attr('offsetHeight');
  wrapperH = window.innerHeight - headerH - footerH;
  $('#wrapper'+i).css('height', wrapperH + 'px');
}

function setiPhoneDefaultHeightlist(){
    $('#wrapper').css('height', 400 + 'px');
}

function setHeightlist() {
  var headerH = $('#header').attr('offsetHeight');//console.log('H: '+headerH);
  var footerH = $('#footer').attr('offsetHeight');//console.log('F: '+footerH);
  wrapperH = window.innerHeight - headerH - footerH - 50;
  $('#wrapper').css('height', wrapperH + 'px');//console.log('W: '+wrapperH);
}

function setDateFormat(i){
  pubDate = $('#publishedDate'+i).text();
  date = new Date(pubDate);
  months = Array('Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre');
  fecha = date.getDate() + " " + months[date.getMonth()] + " " + date.getFullYear()
  $('#publishedDate'+i).html(fecha);
}

function sleep(millisegundos) {
    var inicio = new Date().getTime();
    while ((new Date().getTime() - inicio) < millisegundos){}
}


function replaceAll(txt, replace, with_this) {
    return txt.replace(new RegExp(replace, 'g'),with_this);
}

function orientationChange(e) {
	//After orientation change!
    var x =0;
	setTimeout(function() {
	      x++;
	      if(x < 20) setTimeout(arguments.callee, 1);
	      if(x == 19) {
	    	 refreshcurrentpage(); 
	      }
	  } ,1)
}

function refreshcurrentpage(){
	var page = $('.ui-page-active').attr('id');
    if (page != 'list' && page != 'dialog') {
        articleid = page.substring(7);
        setHeight(articleid);
        var s = 'scroller'+articleid;
        eval(s).refresh();
    }else{
        articleid = 0;
        sc.refresh();
    }	
}
function disablenav() {
    $('.navegacion').addClass('ui-disabled');
    var x = 0;
    setTimeout(function() {	
               x++;
               if(x < 50) setTimeout(arguments.callee, 1);
               if(x == 49) {
               $('.navegacion').removeClass('ui-disabled');
               $('.navegacion').addClass('ui-enabled');
               }
               } ,1)
}

// Events

var articleid = 0;

$('#list').live('pageshow', function (event) {
    sc.refresh();
});

$( 'div[data-role="page"]' ).live('pagehide',function(event, ui){
	refreshcurrentpage();
    //console.log('Opening page...');
    $('.cargando').hide();
});
                      
$( '#header' ).live( 'click', function(event, ui){
  $("#lnkDialog").click();              
});


$( '#sizeplus' ).live( 'click', function(event, ui){
        $('.sizeminus').removeClass('ui-disabled');
        var actsize = $('.articleContent *').css('font-size').substring(0,2);
        var size = parseInt(actsize)+2;
        //console.log("New size: "+size);
        if (size < 19) {
          $('.articleContent *').css('font-size', size+'px');
        } 
        if (size == 19) {
            $('.sizeplus').addClass('ui-disabled'); //deshabilitar
            $('.sizeplus').attr('href', '#');
        }
                      
        var id = $(this).attr("num");
        var s = 'scroller'+id;
        eval(s).refresh();
                      
});

$( '.nextButton, .prevButton, .listlink' ).live( 'click',function(event, ui){

	$('.wrapper').fadeTo("fast", 0.25);
	$('.navegacion').fadeTo("fast", 0.25);
	$('.cargando').fadeIn('slow');
	var x = 0;
	setTimeout(function() {	
	      x++;
	      if(x < 50) setTimeout(arguments.callee, 1);
	      if(x == 49) {
	    	  $('.cargando').fadeOut('slow');
	    	  $('.wrapper').fadeTo("slow", 1);
	    	  $('.navegacion').fadeTo(1800, 1);
	      }
	  } ,1);	  
});

$( '#sizeminus' ).live( 'click', function(event, ui){        
        $('.sizeplus').removeClass('ui-disabled');
        var actsize = $('.articleContent *').css('font-size').substring(0,2);
        var size = parseInt(actsize)-2;
        //console.log("New size: "+size);
        if (size > 9) {
            $('.articleContent *').css('font-size', size+'px');
        }
                       if (size == 9) {
            $('.sizeminus').addClass('ui-disabled'); //deshabilitar
            $('.sizeminus').attr('href', '#');
        }
                       
        var id = $(this).attr("num");
        var s = 'scroller'+id;
        eval(s).refresh();
});

$( '.comments' ).live( 'click', function(event, ui){
    var idEntry = $(this).attr("num");
    var state = $('#commentscontent' + idEntry).attr("state");
    if (state == 'off') {
        $('#commentscontent' + idEntry).show();
        $('#commentscontent' + idEntry).attr('state', 'on');
        //console.log('Comments ON '+ idEntry);
    }else{
        $('#commentscontent' + idEntry).hide();
        $('#commentscontent' + idEntry).attr('state', 'off');
        //console.log('Comments OFF ' + idEntry);              
    }
    
    //$('#commentslink' + idEntry).attr('data-icon','arrow-u').button().trigger('refresh');
                      
    var s = 'scroller'+idEntry;
    eval(s).refresh();
    setHeight(idEntry);
    
});

//Actualizar iscroll al cambiar la orientación del dispositivo
window.addEventListener("orientationchange", orientationChange, true);

(function() {
  var callbacks, cbref, counter, getOptions, root;

  root = this;

  callbacks = {};

  counter = 0;

  cbref = function(hash) {
    var f;
    f = "cb" + (counter += 1);
    callbacks[f] = hash;
    return f;
  };

  getOptions = function(opts, success, error) {
    var cb, has_cbs;
    cb = {};
    has_cbs = false;
    if (typeof success === "function") {
      has_cbs = true;
      cb.success = success;
    }
    if (typeof error === "function") {
      has_cbs = true;
      cb.error = error;
    }
    if (has_cbs) opts.callback = cbref(cb);
    return opts;
  };

  root.PGSQLitePlugin = (function() {

    PGSQLitePlugin.prototype.openDBs = {};

    function PGSQLitePlugin(dbPath, openSuccess, openError) {
      this.dbPath = dbPath;
      this.openSuccess = openSuccess;
      this.openError = openError;
      if (!dbPath) {
        throw new Error("Cannot create a PGSQLitePlugin instance without a dbPath");
      }
      this.openSuccess || (this.openSuccess = function() {
        console.log("DB opened: " + dbPath);
      });
      this.openError || (this.openError = function(e) {
        console.log(e.message);
      });
      this.open(this.openSuccess, this.openError);
    }

    PGSQLitePlugin.handleCallback = function(ref, type, obj) {
      var _ref;
      if ((_ref = callbacks[ref]) != null) {
        if (typeof _ref[type] === "function") _ref[type](obj);
      }
      callbacks[ref] = null;
      delete callbacks[ref];
    };

    PGSQLitePlugin.prototype.executeSql = function(sql, success, error) {
      var opts;
      if (!sql) throw new Error("Cannot executeSql without a query");
      opts = getOptions({
        query: [].concat(sql || []),
        path: this.dbPath
      }, success, error);
      Cordova.exec("PGSQLitePlugin.backgroundExecuteSql", opts);
    };

    PGSQLitePlugin.prototype.transaction = function(fn, success, error) {
      var t;
      t = new root.PGSQLitePluginTransaction(this.dbPath);
      fn(t);
      return t.complete(success, error);
    };

    PGSQLitePlugin.prototype.open = function(success, error) {
      var opts;
      if (!(this.dbPath in this.openDBs)) {
        this.openDBs[this.dbPath] = true;
        opts = getOptions({
          path: this.dbPath
        }, success, error);
        Cordova.exec("PGSQLitePlugin.open", opts);
      }
    };

    PGSQLitePlugin.prototype.close = function(success, error) {
      var opts;
      if (this.dbPath in this.openDBs) {
        delete this.openDBs[this.dbPath];
        opts = getOptions({
          path: this.dbPath
        }, success, error);
        Cordova.exec("PGSQLitePlugin.close", opts);
      }
    };

    return PGSQLitePlugin;

  })();

  root.PGSQLitePluginTransaction = (function() {

    function PGSQLitePluginTransaction(dbPath) {
      this.dbPath = dbPath;
      this.executes = [];
    }

    PGSQLitePluginTransaction.prototype.executeSql = function(sql, success, error) {
      this.executes.push(getOptions({
        query: [].concat(sql || []),
        path: this.dbPath
      }, success, error));
    };

    PGSQLitePluginTransaction.prototype.complete = function(success, error) {
      var begin_opts, commit_opts, executes, opts;
      if (this.__completed) throw new Error("Transaction already run");
      this.__completed = true;
      begin_opts = getOptions({
        query: ["BEGIN;"],
        path: this.dbPath
      });
      commit_opts = getOptions({
        query: ["COMMIT;"],
        path: this.dbPath
      }, success, error);
      executes = [begin_opts].concat(this.executes).concat([commit_opts]);
      opts = {
        executes: executes
      };
      Cordova.exec("PGSQLitePlugin.backgroundExecuteSqlBatch", opts);
      this.executes = [];
    };

    return PGSQLitePluginTransaction;

  })();

}).call(this);

