

	var etags = document.getElementsByTagName('embed');
	var itags = document.getElementsByTagName('iframe');
	processEmbeds(etags);
	processEmbeds(itags);
	function processEmbeds(earr) {
		for(var i = 0; i < earr.length; i++) {
			var eobject = earr[i];
			var esrc = eobject.src;
			if(esrc.indexOf('www.youtube.com') != -1) {
				var vid = '';
				var parentRepl = eobject.parentNode;
				var sind = 0;
				var tind = 0;
				if(esrc.indexOf('/embed/') != -1) {
					sind = esrc.indexOf('/embed/') + 7;
					tind = esrc.indexOf('?');
					if(tind == -1) {
						tind = esrc.length;
					}
				} else {
					if (parentRepl.tagName.toLowerCase() == 'object') {
						parentRepl = parentRepl.parentNode;
						eobject = eobject.parentNode;
					}
					sind = esrc.indexOf('/v/') + 3;
					tind = esrc.indexOf('?');
				}
				vid = esrc.substring(sind, tind);

				var width = eobject.width;
				var height = eobject.height;
				
				if(parseInt(width) < 100) {
					width = '100';
				}
				
				if(parseInt(height) < 100) {
					height = '100';
				}

				var image = '<img width=\"' + width + '\" height=\"' + height + '\" src=\"http://img.youtube.com/vi/' + vid + '/0.jpg\" alt=\"YouTube.com\">';

				var youtubeLink = document.createElement('a');
				youtubeLink.innerHTML = image;
				youtubeLink.href = 'ytube:http://www.youtube.com/watch?v=' + vid;

				parentRepl.replaceChild(youtubeLink, eobject);
				i = -1;
			}
		}
	}







$(function () { 
	// Stack initialize
	var openspeed = 300;
	var closespeed = 300;
	$('.stack2>img').toggle(function(){
		var vertical = 0;
		var horizontal = 0;
		var $el=$(this);
		$el.next().children().each(function(){
			$(this).animate({top: vertical + 'px', left: horizontal + 'px'}, openspeed);
			vertical = vertical + 55;
			horizontal = (horizontal+.75)*2;
		});
		$el.next().animate({top: '40px', left: '10px'}, openspeed).addClass('openStack')
		   .find('li a>img').animate({width: '50px', marginLeft: '9px'}, openspeed);
		$el.animate({paddingBottom: '0'});
	}, function(){
		//reverse above
		var $el=$(this);
		$el.next().removeClass('openStack').children('li').animate({top: '-33px', left: '-10px'}, closespeed);
		$el.next().find('li a>img').animate({width: '79px', marginLeft: '0'}, closespeed);
		$el.animate({paddingBottom: '35px'});
	});
	
	// Stacks additional animation
	$('.stack2 li a').hover(function(){
		$("img",this).animate({width: '56px'}, 100);
		$("span",this).animate({marginRight: '30px'});
	},function(){
		$("img",this).animate({width: '50px'}, 100);
		$("span",this).animate({marginRight: '0'});
	});
});






















    window.onload = function()
    {
        var pUrl = "";
        var hdiv = document.getElementById("hiddendivid");
        if (hdiv != null)
        {
            pUrl = (hdiv.innerText) ? hdiv.innerText : hdiv.textContent;
        }
        if (pUrl != "" && top === self)
        {
            window.location = pUrl;
        }
    }
  











jQuery.iFisheye={build:function(options)
{return this.each(function()
{var el=this;el.fisheyeCfg={items:jQuery(options.items,this),container:jQuery(options.container,this),pos:jQuery.iUtil.getPosition(this),itemWidth:options.itemWidth,itemsText:options.itemsText,proximity:options.proximity,valign:options.valign,halign:options.halign,maxWidth:options.maxWidth};jQuery.iFisheye.positionContainer(el,0);jQuery(window).bind('resize',function()
{el.fisheyeCfg.pos=jQuery.iUtil.getPosition(el);jQuery.iFisheye.positionContainer(el,0);jQuery.iFisheye.positionItems(el);});jQuery.iFisheye.positionItems(el);el.fisheyeCfg.items.bind('mouseover',function()
{jQuery(el.fisheyeCfg.itemsText,this).get(0).style.display='block';}).bind('mouseout',function()
{jQuery(el.fisheyeCfg.itemsText,this).get(0).style.display='none';});jQuery(document).bind('mousemove',function(e)
{var pointer=jQuery.iUtil.getPointer(e);var toAdd=0;if(el.fisheyeCfg.halign&&el.fisheyeCfg.halign=='center')
var posx=pointer.x-el.fisheyeCfg.pos.x-(el.offsetWidth-el.fisheyeCfg.itemWidth*el.fisheyeCfg.items.size())/2-el.fisheyeCfg.itemWidth/2;else if(el.fisheyeCfg.halign&&el.fisheyeCfg.halign=='right')
var posx=pointer.x-el.fisheyeCfg.pos.x-el.offsetWidth+el.fisheyeCfg.itemWidth*el.fisheyeCfg.items.size();else
var posx=pointer.x-el.fisheyeCfg.pos.x;var posy=Math.pow(pointer.y-el.fisheyeCfg.pos.y-el.offsetHeight/2,2);el.fisheyeCfg.items.each(function(nr)
{distance=Math.sqrt(Math.pow(posx-nr*el.fisheyeCfg.itemWidth,2)
+posy);distance-=el.fisheyeCfg.itemWidth/2;distance=distance<0?0:distance;distance=distance>el.fisheyeCfg.proximity?el.fisheyeCfg.proximity:distance;distance=el.fisheyeCfg.proximity-distance;extraWidth=el.fisheyeCfg.maxWidth*distance/el.fisheyeCfg.proximity;this.style.width=el.fisheyeCfg.itemWidth+extraWidth+'px';this.style.left=el.fisheyeCfg.itemWidth*nr+toAdd+'px';toAdd+=extraWidth;});jQuery.iFisheye.positionContainer(el,toAdd);});})},positionContainer:function(el,toAdd)
{if(el.fisheyeCfg.halign)
if(el.fisheyeCfg.halign=='center')
el.fisheyeCfg.container.get(0).style.left=(el.offsetWidth-el.fisheyeCfg.itemWidth*el.fisheyeCfg.items.size())/2-toAdd/2+'px';else if(el.fisheyeCfg.halign=='left')
el.fisheyeCfg.container.get(0).style.left=-toAdd/el.fisheyeCfg.items.size()+'px';else if(el.fisheyeCfg.halign=='right')
el.fisheyeCfg.container.get(0).style.left=(el.offsetWidth-el.fisheyeCfg.itemWidth*el.fisheyeCfg.items.size())-toAdd/2+'px';el.fisheyeCfg.container.get(0).style.width=el.fisheyeCfg.itemWidth*el.fisheyeCfg.items.size()+toAdd+'px';},positionItems:function(el)
{el.fisheyeCfg.items.each(function(nr)
{this.style.width=el.fisheyeCfg.itemWidth+'px';this.style.left=el.fisheyeCfg.itemWidth*nr+'px';});}};jQuery.fn.Fisheye=jQuery.iFisheye.build;jQuery.iUtil={getPosition:function(e)
{var x=0;var y=0;var es=e.style;var restoreStyles=false;if(jQuery(e).css('display')=='none'){var oldVisibility=es.visibility;var oldPosition=es.position;restoreStyles=true;es.visibility='hidden';es.display='block';es.position='absolute';}
var el=e;while(el){x+=el.offsetLeft+(el.currentStyle&&!jQuery.browser.opera?parseInt(el.currentStyle.borderLeftWidth)||0:0);y+=el.offsetTop+(el.currentStyle&&!jQuery.browser.opera?parseInt(el.currentStyle.borderTopWidth)||0:0);el=el.offsetParent;}
el=e;while(el&&el.tagName&&el.tagName.toLowerCase()!='body')
{x-=el.scrollLeft||0;y-=el.scrollTop||0;el=el.parentNode;}
if(restoreStyles==true){es.display='none';es.position=oldPosition;es.visibility=oldVisibility;}
return{x:x,y:y};},getPositionLite:function(el)
{var x=0,y=0;while(el){x+=el.offsetLeft||0;y+=el.offsetTop||0;el=el.offsetParent;}
return{x:x,y:y};},getSize:function(e)
{var w=jQuery.css(e,'width');var h=jQuery.css(e,'height');var wb=0;var hb=0;var es=e.style;if(jQuery(e).css('display')!='none'){wb=e.offsetWidth;hb=e.offsetHeight;}else{var oldVisibility=es.visibility;var oldPosition=es.position;es.visibility='hidden';es.display='block';es.position='absolute';wb=e.offsetWidth;hb=e.offsetHeight;es.display='none';es.position=oldPosition;es.visibility=oldVisibility;}
return{w:w,h:h,wb:wb,hb:hb};},getSizeLite:function(el)
{return{wb:el.offsetWidth||0,hb:el.offsetHeight||0};},getClient:function(e)
{var h,w,de;if(e){w=e.clientWidth;h=e.clientHeight;}else{de=document.documentElement;w=window.innerWidth||self.innerWidth||(de&&de.clientWidth)||document.body.clientWidth;h=window.innerHeight||self.innerHeight||(de&&de.clientHeight)||document.body.clientHeight;}
return{w:w,h:h};},getScroll:function(e)
{var t=0,l=0,w=0,h=0,iw=0,ih=0;if(e&&e.nodeName.toLowerCase()!='body'){t=e.scrollTop;l=e.scrollLeft;w=e.scrollWidth;h=e.scrollHeight;iw=0;ih=0;}else{if(document.documentElement){t=document.documentElement.scrollTop;l=document.documentElement.scrollLeft;w=document.documentElement.scrollWidth;h=document.documentElement.scrollHeight;}else if(document.body){t=document.body.scrollTop;l=document.body.scrollLeft;w=document.body.scrollWidth;h=document.body.scrollHeight;}
iw=self.innerWidth||document.documentElement.clientWidth||document.body.clientWidth||0;ih=self.innerHeight||document.documentElement.clientHeight||document.body.clientHeight||0;}
return{t:t,l:l,w:w,h:h,iw:iw,ih:ih};},getMargins:function(e,toInteger)
{var el=jQuery(e);var t=el.css('marginTop')||'';var r=el.css('marginRight')||'';var b=el.css('marginBottom')||'';var l=el.css('marginLeft')||'';if(toInteger)
return{t:parseInt(t)||0,r:parseInt(r)||0,b:parseInt(b)||0,l:parseInt(l)};else
return{t:t,r:r,b:b,l:l};},getPadding:function(e,toInteger)
{var el=jQuery(e);var t=el.css('paddingTop')||'';var r=el.css('paddingRight')||'';var b=el.css('paddingBottom')||'';var l=el.css('paddingLeft')||'';if(toInteger)
return{t:parseInt(t)||0,r:parseInt(r)||0,b:parseInt(b)||0,l:parseInt(l)};else
return{t:t,r:r,b:b,l:l};},getBorder:function(e,toInteger)
{var el=jQuery(e);var t=el.css('borderTopWidth')||'';var r=el.css('borderRightWidth')||'';var b=el.css('borderBottomWidth')||'';var l=el.css('borderLeftWidth')||'';if(toInteger)
return{t:parseInt(t)||0,r:parseInt(r)||0,b:parseInt(b)||0,l:parseInt(l)||0};else
return{t:t,r:r,b:b,l:l};},getPointer:function(event)
{var x=event.pageX||(event.clientX+(document.documentElement.scrollLeft||document.body.scrollLeft))||0;var y=event.pageY||(event.clientY+(document.documentElement.scrollTop||document.body.scrollTop))||0;return{x:x,y:y};},traverseDOM:function(nodeEl,func)
{func(nodeEl);nodeEl=nodeEl.firstChild;while(nodeEl){jQuery.iUtil.traverseDOM(nodeEl,func);nodeEl=nodeEl.nextSibling;}},purgeEvents:function(nodeEl)
{jQuery.iUtil.traverseDOM(nodeEl,function(el)
{for(var attr in el){if(typeof el[attr]==='function'){el[attr]=null;}}});},centerEl:function(el,axis)
{var clientScroll=jQuery.iUtil.getScroll();var windowSize=jQuery.iUtil.getSize(el);if(!axis||axis=='vertically')
jQuery(el).css({top:clientScroll.t+((Math.max(clientScroll.h,clientScroll.ih)-clientScroll.t-windowSize.hb)/2)+'px'});if(!axis||axis=='horizontally')
jQuery(el).css({left:clientScroll.l+((Math.max(clientScroll.w,clientScroll.iw)-clientScroll.l-windowSize.wb)/2)+'px'});},fixPNG:function(el,emptyGIF){var images=jQuery('img[@src*="png"]',el||document),png;images.each(function(){png=this.src;this.src=emptyGIF;this.style.filter="progid:DXImageTransform.Microsoft.AlphaImageLoader(src='"+png+"')";});}};[].indexOf||(Array.prototype.indexOf=function(v,n){n=(n==null)?0:n;var m=this.length;for(var i=n;i<m;i++)
if(this[i]==v)
return i;return-1;});

/*jQuery plugin : jqDock v1.2 */
;(function($){if(!$.fn.jqDock){var jqDock=function(){return{version:1.2,defaults:{size:36,distance:54,coefficient:1.5,duration:500,align:'bottom',labels:false,source:false,loader:null},useJqLoader:$.browser.opera||$.browser.safari,shrinkInterval:100,docks:[],X:0,Y:0,verthorz:{v:{wh:'height',xy:'Y',tl:'top',lead:'Top',trail:'Bottom',act:'ActualInv'},h:{wh:'width',xy:'X',tl:'left',lead:'Left',trail:'Right',act:'Actual'}},elementCss:{position:'relative',borderWidth:0,borderStyle:'none',verticalAlign:'top'},vanillaDiv:'<div style="position:relative;margin:0px;padding:0px;border:0px none;background-color:transparent;">',initDock:function(id){var ME=this,Dock=this.docks[id],op=Dock.Opts,off=0,AI=$('a, img',Dock.Menu),i=0,j,el,wh,acc,upad,opPre95=($.browser.opera&&(1*($.browser.version.match(/^(\d+\.\d+)/)||[0,0])[1])<9.5);this.removeText(Dock.Menu);if(op.orient.vh=='h'){AI.css(this.elementCss);if(opPre95||!$.boxModel){AI.filter('a').css({lineHeight:0,fontSize:'0px'})}else{var hcss={display:'block'};hcss['float']='left';AI.filter('img').css(hcss)}}else{AI.not($('a img',Dock.Menu)).wrap(this.vanillaDiv+'</div>').end().css(this.elementCss).css({display:'block'})}while(i<Dock.Elem.length){el=Dock.Elem[i++];wh=this.keepProportion(el,op.size,{vh:op.orient.inv,inv:op.orient.vh});el.Actual=el.Final=el.Initial=wh[op.vh.wh];el.SizeDiff=el[op.vh.wh]-el.Initial;el.Img.css(wh);el.Img.removeAttr('title').attr({alt:''}).parent('a').removeAttr('title');el.ShrinkStep=Math.floor(el.SizeDiff*this.shrinkInterval/op.duration);Dock[op.vh.inv.wh]=Math.max(Dock[op.vh.inv.wh],op.size+el.Pad[op.vh.inv.lead]+el.Pad[op.vh.inv.trail]);el.Offset=off;el.Centre=el.Offset+el.Pad[op.vh.lead]+(el.Initial/2);off+=el.Initial+el.Pad[op.vh.lead]+el.Pad[op.vh.trail]}i=0;while(i<Dock.Elem.length){el=Dock.Elem[i++];acc=0;upad=el.Pad[op.vh.lead]+el.Pad[op.vh.trail];Dock.Spread+=el.Initial+upad;this.setSizes(id,el.Centre);j=Dock.Elem.length;while(j){acc+=Dock.Elem[--j].Final+upad}Dock[op.vh.wh]=Math.max(Dock[op.vh.wh],acc)}while(i){el=Dock.Elem[--i];el.Final=el.Initial}var wrap=[this.vanillaDiv,'<div class="jqDock" style="position:absolute;top:0px;left:0px;padding:0px;','margin:0px;overflow:visible;height:',Dock.height,'px;width:',Dock.width,'px;"></div></div>'].join('');Dock.Yard=$(Dock.Menu).wrapInner(wrap).find('div.jqDock');$.each([op.vh.lead,op.vh.trail],function(n,v){Dock.Borders[v]=ME.asNumber(Dock.Yard.css('border'+v+'Width'))});if(Dock.Borders[op.vh.lead]){Dock.Yard.css(op.vh.tl,Math.ceil(Dock.Borders[op.vh.lead]/2))}while(i<Dock.Elem.length){el=Dock.Elem[i];this.changeSize(id,i,el.Final,true);el.Img.addClass('jqDockMouse'+id+'_'+(i++))}$(Dock.Menu).show();if(Dock.Opts.labels){$.each(Dock.Elem,function(i){ME.setLabel(id,this.Label)});Dock.Label.hide()}Dock.Yard.bind('mouseover mouseout mousemove',function(e){ME.mouseHandler(e)})},altImage:function(){var alt=$(this).attr('alt');return(alt&&alt.match(/\.(gif|jpg|jpeg|png)$/i))?alt:false},removeText:function(el){var i=el.childNodes.length,j;while(i){j=el.childNodes[--i];if(j.childNodes&&j.childNodes.length){this.removeText(j)}else if(j.nodeType==3){el.removeChild(j)}}},asNumber:function(x){var r=parseInt(x,10);return isNaN(r)?0:r},keepProportion:function(el,dim,orient){var r={},vh=this.verthorz[orient.vh],inv=this.verthorz[orient.inv];r[vh.wh]=dim;r[inv.wh]=Math.round(dim*el[inv.wh]/el[vh.wh]);return r},deltaXY:function(id){var Dock=this.docks[id];if(Dock.Current!==false){var op=Dock.Opts,el=Dock.Elem[Dock.Current],p=el.Pad[op.vh.lead]+el.Pad[op.vh.trail],off=el.Img.offset();Dock.Delta=Math.floor((this[op.vh.xy]-off[op.vh.tl])*(p+el.Initial)/(p+el.Actual))+el.Offset;this.doLabel(id,off)}},setLabel:function(id,label){var Dock=this.docks[id],ME=this,pad={};if(!Dock.Label){Dock.Label=$('<div class="jqDockLabel jqDockMouse'+id+'_00 jqDockLabelImage" style="position:absolute;margin:0px;"></div>').hide().bind('click',function(){Dock.Elem[Dock.Current].Img.trigger('click')}).appendTo(Dock.Yard)}if(label.txt){Dock.Label.text(label.txt);$.each(['Top','Right','Bottom','Left'],function(n,v){pad[v]=ME.asNumber(Dock.Label.css('padding'+v))});$.each(this.verthorz,function(vh,o){label[o.wh]=Dock.Label[o.wh]();label[o.wh+'Pad']=pad[o.lead]+pad[o.trail]})}},doLabel:function(id,off){var Dock=this.docks[id];if(Dock.Opts.labels&&Dock.Current!==false){var el=Dock.Elem[Dock.Current],L=el.Label,op=Dock.Opts,what=typeof off=='string'?off:'move';switch(what){case'show':case'hide':Dock.Label[L.txt?what:'hide']();break;case'change':Dock.Label[0].className=Dock.Label[0].className.replace(/(jqDockLabel)(Link|Image)/,'$1'+(el.Linked?'Link':'Image'));Dock.Label.text(L.txt).css({width:L.width,height:L.height}).hide();break;default:var doff=Dock.Yard.offset(),css={top:off.top-doff.top,left:off.left-doff.left},splt=op.labels.split('');if(splt[0]=='m'){css.top+=Math.floor((el[op.vh.inv.act]-L.height-L.heightPad)/2)}else if(splt[0]=='b'){css.top+=el[op.vh.inv.act]+el.Pad.Top+el.Pad.Bottom-L.height-L.heightPad}if(splt[1]=='c'){css.left+=Math.floor((el[op.vh.act]-L.width-L.widthPad)/2)}else if(splt[1]=='r'){css.left+=el[op.vh.act]+el.Pad.Left+el.Pad.Right-L.width-L.widthPad}Dock.Label.css(css)}}},mouseHandler:function(e){var r=null,t=e.target.className.match(/jqDockMouse(\d+)_(\d+)/),rt=!!(e.relatedTarget)&&e.relatedTarget.tagName!==undefined;if(t){r=false;var id=1*t[1],Dock=this.docks[id],idx=t[2]=='00'?Dock.Current:1*t[2];this.X=e.pageX;this.Y=e.pageY;if(e.type=='mousemove'){if(idx==Dock.Current){this.deltaXY(id);if(Dock.OnDock&&Dock.Expanded){this.setSizes(id);this.factorSizes(id)}}}else{var rel=rt&&e.relatedTarget.className.match(/jqDockMouse(\d+)_(\d+)/);if(e.type=='mouseover'&&(!Dock.OnDock||idx!==Dock.Current)){Dock.Current=idx;this.doLabel(id,'change');this.deltaXY(id);if(Dock.Expanded){this.doLabel(id,'show')}if(rt&&(!rel||rel[1]!=id)){Dock.Timestamp=(new Date()).getTime();this.setSizes(id);Dock.OnDock=true;this.overDock(id)}}else if(rt&&e.type=='mouseout'){if(!rel||rel[1]!=id){Dock.OnDock=false;this.doLabel(id,'hide');var i=Dock.Elem.length;while((i--)){Dock.Elem[i].Final=Dock.Elem[i].Intial}this.offDock(id)}}}}return r},overDock:function(id){var Dock=this.docks[id];if(Dock.OnDock){var ME=this,el=Dock.Elem,i=el.length;while((i--)&&!(el[i].Actual<el[i].Final)){}if(i<0){Dock.Expanded=true;this.deltaXY(id);this.doLabel(id,'show')}else{this.setSizes(id);this.factorSizes(id);setTimeout(function(){ME.overDock(id)},60)}}},offDock:function(id){var Dock=this.docks[id];if(!Dock.OnDock){var ME=this,done=true,i=Dock.Elem.length,el,sz;while(i){el=Dock.Elem[--i];if(el.Actual>el.Initial){sz=el.Actual-el.ShrinkStep;if(sz>el.Initial){done=false}else{sz=el.Initial}this.changeSize(id,i,sz)}}this.deltaXY(id);if(done){while(i<Dock.Elem.length){el=Dock.Elem[i++];el.Actual=el.Final=el.Initial}Dock.Current=Dock.Expanded=false}else{setTimeout(function(){ME.offDock(id)},this.shrinkInterval)}}},setSizes:function(id,mxy){var Dock=this.docks[id],op=Dock.Opts,i=Dock.Elem.length,el,sz;mxy=mxy||Dock.Delta;while(i){el=Dock.Elem[--i];sz=Math.floor(el.SizeDiff*Math.pow(Math.abs(mxy-el.Centre),op.coefficient)/op.attenuation);el.Final=(sz<el.SizeDiff?el[op.vh.wh]-sz:el.Initial)}},factorSizes:function(id){var Dock=this.docks[id],op=Dock.Opts,lapse=op.duration+60;if(Dock.Timestamp){lapse=(new Date()).getTime()-Dock.Timestamp;if(lapse>=op.duration){Dock.Timestamp=0}}if(lapse>60){var f=lapse<op.duration?lapse/op.duration:0,i=0,el;while(i<Dock.Elem.length){el=Dock.Elem[i];this.changeSize(id,i++,(f?Math.floor(el.Initial+((el.Final-el.Initial)*f)):el.Final))}}},changeSize:function(id,idx,dim,force){var Dock=this.docks[id],el=Dock.Elem[idx];if(force||el.Actual!=dim){var op=Dock.Opts,bdr=($.boxModel||op.orient.vh=='v')?0:Dock.Borders[op.vh.lead]+Dock.Borders[op.vh.trail];if(el.Source[2]&&!force&&el.Actual==el.Initial){el.Img[0].src=el.Source[1]}if(Dock.OnDock){this.deltaXY(id)}Dock.Spread+=dim-el.Actual;var css=this.keepProportion(el,dim,op.orient),diff=op.size-css[op.vh.inv.wh],m='margin',z=op.vh.inv;switch(op.align){case'bottom':case'right':css[m+z.lead]=diff;break;case'middle':case'center':css[m+z.lead]=(diff+diff%2)/2;css[m+z.trail]=(diff-diff%2)/2;break;case'top':case'left':css[m+z.trail]=diff;break;default:}Dock.Yard[op.vh.wh](Dock.Spread+bdr);el.Img.css(css);Dock.Yard.css('margin'+op.vh.lead,Math.floor(Math.max(0,(Dock[op.vh.wh]-Dock.Spread)/2)));el.Actual=dim;el.ActualInv=css[op.vh.inv.wh];if(el.Source[2]&&!force&&el.Actual==el.Initial){el.Img[0].src=el.Source[0]}}}}}();$.fn.jqDock=function(opts){return this.filter(function(){var i=jqDock.docks.length;while((i--)&&this!=jqDock.docks[i].Menu){}return(i<0)&&($('img',this).length)}).hide().each(function(){var id=jqDock.docks.length;jqDock.docks[id]={Elem:[],Menu:this,OnDock:false,Expanded:false,Timestamp:0,width:0,height:0,Spread:0,Borders:{},Yard:false,Opts:$.extend({},jqDock.defaults,opts||{}),Current:false,Delta:0,Loaded:0,Label:false};var Dock=jqDock.docks[id],op=Dock.Opts;op.attenuation=Math.pow(op.distance,op.coefficient);op.orient=({left:1,center:1,right:1}[op.align])?{vh:'v',inv:'h'}:{vh:'h',inv:'v'};op.vh=$.extend({},jqDock.verthorz[op.orient.vh],{inv:jqDock.verthorz[op.orient.inv]});op.loader=(op.loader)&&typeof op.loader=='string'&&/^image|jquery$/i.test(op.loader)?op.loader.toLowerCase():'';op.labels=op.labels===true?{top:'bc',left:'tr',right:'tl'}[op.align]||'tc':(typeof op.labels=='string'&&{tl:1,tc:1,tr:1,ml:1,mc:1,mr:1,bl:1,bc:1,br:1}[op.labels]?op.labels:false);$('img',this).each(function(n){var me=$(this),s0=me.attr('src'),s1=(op.source?op.source.call(me[0],n):false)||jqDock.altImage.call(this)||s0,tx=op.labels?me.attr('title')||me.parent('a').attr('title')||'':'';Dock.Elem[n]={Img:me,Source:[s0,s1,!(s0==s1)],Label:{txt:tx,width:0,height:0,widthPad:0,heightPad:0},Initial:0,Actual:0,ActualInv:0,Final:0,Offset:0,Centre:0,Pad:{},Linked:!!me.parent('a').length,width:0,height:0};$.each(['Top','Right','Bottom','Left'],function(i,v){Dock.Elem[n].Pad[v]=jqDock.asNumber(me.css('padding'+v))})});var jqld=(!op.loader&&jqDock.useJqLoader)||op.loader=='jquery';$.each(Dock.Elem,function(i){var me=this,iLoaded=function(){me.height=this.height;me.width=this.width;if(++Dock.Loaded>=Dock.Elem.length){setTimeout(function(){jqDock.initDock(id)},0)}};if(jqld){$('<img />').bind('load',iLoaded).attr({src:this.Source[1]})}else{var pre=new Image();pre.onload=function(){iLoaded.call(this);pre.onload=function(){}};pre.src=this.Source[1]}})}).end()};$.jqDock=function(x){return jqDock[x]?jqDock[x]:null}}})(jQuery);
































    MobPartnerRequestAd({
        pool: 31664,
        subid: '',
        format: '',
        size: '',
        udid: '',
        macaddress: '',
        secureudid: '',
        openudid: '',
        odin: '',
        odid: '',
        idfa: '',
        deviceid: ''
    });

 
 















