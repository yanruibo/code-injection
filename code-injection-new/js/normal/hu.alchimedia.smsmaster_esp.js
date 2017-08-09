
(function(){function p(r,m){var s=this,t=document,u,q;s.wrapper=typeof r=="object"?r:t.getElementById(r);s.wrapper.style.overflow="hidden";s.scroller=s.wrapper.children[0];s.options={HWTransition:true,HWCompositing:true,hScroll:true,vScroll:true,hScrollbar:true,vScrollbar:true,fixedScrollbar:n,fadeScrollbar:(o&&k)||!j,hideScrollbar:o||!j,scrollbarClass:"",bounce:k,bounceLock:false,momentum:k,lockDirection:true,zoom:false,zoomMin:1,zoomMax:4,snap:false,pullToRefresh:false,pullDownLabel:["Pull down to refresh...","Release to refresh...","Loading..."],pullUpLabel:["Pull up to refresh...","Release to refresh...","Loading..."],onPullDown:function(){},onPullUp:function(){},onScrollStart:null,onScrollEnd:null,onZoomStart:null,onZoomEnd:null,checkDOMChange:false};for(q in m){s.options[q]=m[q]}s.options.HWCompositing=s.options.HWCompositing&&a;s.options.HWTransition=s.options.HWTransition&&a;if(s.options.HWCompositing){s.scroller.style.cssText+="-webkit-transition-property:-webkit-transform;-webkit-transform-origin:0 0;-webkit-transform:"+b+"0,0"+h}else{s.scroller.style.cssText+="-webkit-transition-property:top,left;-webkit-transform-origin:0 0;top:0;left:0"}if(s.options.HWTransition){s.scroller.style.cssText+="-webkit-transition-timing-function:cubic-bezier(0.33,0.66,0.66,1);-webkit-transition-duration:0;"}s.options.hScrollbar=s.options.hScroll&&s.options.hScrollbar;s.options.vScrollbar=s.options.vScroll&&s.options.vScrollbar;s.pullDownToRefresh=s.options.pullToRefresh=="down"||s.options.pullToRefresh=="both";s.pullUpToRefresh=s.options.pullToRefresh=="up"||s.options.pullToRefresh=="both";if(s.pullDownToRefresh){u=t.createElement("div");u.className="iScrollPullDown";u.innerHTML='<span class="iScrollPullDownIcon"></span><span class="iScrollPullDownLabel">'+s.options.pullDownLabel[0]+"</span>\n";s.scroller.insertBefore(u,s.scroller.children[0]);s.options.bounce=true;s.pullDownEl=u;s.pullDownLabel=u.getElementsByTagName("span")[1]}if(s.pullUpToRefresh){u=t.createElement("div");u.className="iScrollPullUp";u.innerHTML='<span class="iScrollPullUpIcon"></span><span class="iScrollPullUpLabel">'+s.options.pullUpLabel[0]+"</span>\n";s.scroller.appendChild(u);s.options.bounce=true;s.pullUpEl=u;s.pullUpLabel=u.getElementsByTagName("span")[1]}s.refresh();s._bind(l,window);s._bind(f);if(i&&s.options.zoom){s._bind("gesturestart");s.scroller.style.webkitTransform=s.scroller.style.webkitTransform+" scale(1)"}if(!j){s._bind("mousewheel")}if(s.options.checkDOMChange){s.DOMChangeInterval=setInterval(function(){s._checkSize()},250)}}p.prototype={x:0,y:0,currPageX:0,currPageY:0,pagesX:[],pagesY:[],offsetBottom:0,offsetTop:0,scale:1,lastScale:1,contentReady:true,handleEvent:function(q){var m=this;switch(q.type){case f:m._start(q);break;case e:m._move(q);break;case g:case c:m._end(q);break;case"webkitTransitionEnd":m._transitionEnd(q);break;case l:m._resize();break;case"gesturestart":m._gestStart(q);break;case"gesturechange":m._gestChange(q);break;case"gestureend":case"gesturecancel":m._gestEnd(q);break;case"mousewheel":m._wheel(q);break}},_scrollbar:function(m){var r=this,s=document,q;if(!r[m+"Scrollbar"]){if(r[m+"ScrollbarWrapper"]){r[m+"ScrollbarIndicator"].style.webkitTransform="";r[m+"ScrollbarWrapper"].parentNode.removeChild(r[m+"ScrollbarWrapper"]);r[m+"ScrollbarWrapper"]=null;r[m+"ScrollbarIndicator"]=null}return}if(!r[m+"ScrollbarWrapper"]){q=s.createElement("div");if(r.options.scrollbarClass){q.className=r.options.scrollbarClass+m.toUpperCase()}else{q.style.cssText="position:absolute;z-index:100;"+(m=="h"?"height:7px;bottom:1px;left:2px;right:7px":"width:7px;bottom:7px;top:2px;right:1px")}q.style.cssText+="pointer-events:none;-webkit-transition-property:opacity;-webkit-transition-duration:"+(r.options.fadeScrollbar?"350ms":"0")+";overflow:hidden;opacity:"+(r.options.hideScrollbar?"0":"1");r.wrapper.appendChild(q);r[m+"ScrollbarWrapper"]=q;q=s.createElement("div");if(!r.options.scrollbarClass){q.style.cssText="position:absolute;z-index:100;background:rgba(0,0,0,0.5);border:1px solid rgba(255,255,255,0.9);-webkit-background-clip:padding-box;-webkit-box-sizing:border-box;"+(m=="h"?"height:100%;-webkit-border-radius:4px 3px;":"width:100%;-webkit-border-radius:3px 4px;")}q.style.cssText+="pointer-events:none;-webkit-transition-property:-webkit-transform;-webkit-transition-timing-function:cubic-bezier(0.33,0.66,0.66,1);-webkit-transition-duration:0;-webkit-transform:"+b+"0,0"+h;r[m+"ScrollbarWrapper"].appendChild(q);r[m+"ScrollbarIndicator"]=q}if(m=="h"){r.hScrollbarSize=r.hScrollbarWrapper.clientWidth;r.hScrollbarIndicatorSize=d.max(d.round(r.hScrollbarSize*r.hScrollbarSize/r.scrollerW),8);r.hScrollbarIndicator.style.width=r.hScrollbarIndicatorSize+"px";r.hScrollbarMaxScroll=r.hScrollbarSize-r.hScrollbarIndicatorSize;r.hScrollbarProp=r.hScrollbarMaxScroll/r.maxScrollX}else{r.vScrollbarSize=r.vScrollbarWrapper.clientHeight;r.vScrollbarIndicatorSize=d.max(d.round(r.vScrollbarSize*r.vScrollbarSize/r.scrollerH),8);r.vScrollbarIndicator.style.height=r.vScrollbarIndicatorSize+"px";r.vScrollbarMaxScroll=r.vScrollbarSize-r.vScrollbarIndicatorSize;r.vScrollbarProp=r.vScrollbarMaxScroll/r.maxScrollY}r._indicatorPos(m,true)},_resize:function(){var m=this;setTimeout(function(){m.refresh()},0)},_checkSize:function(){var q=this,m,r;if(q.moved||q.zoomed||!q.contentReady){return}m=d.round(q.scroller.offsetWidth*q.scale),r=d.round((q.scroller.offsetHeight-q.offsetBottom-q.offsetTop)*q.scale);if(m==q.scrollerW&&r==q.scrollerH){return}q.refresh()},_pos:function(m,r){var q=this;q.x=q.hScroll?m:0;q.y=q.vScroll?r:0;q.scroller.style.webkitTransform=b+q.x+"px,"+q.y+"px"+h+" scale("+q.scale+")";q._indicatorPos("h");q._indicatorPos("v")},_indicatorPos:function(m,r){var q=this,s=m=="h"?q.x:q.y;if(!q[m+"Scrollbar"]){return}s=q[m+"ScrollbarProp"]*s;if(s<0){s=q.options.fixedScrollbar?0:s+s*3;if(q[m+"ScrollbarIndicatorSize"]+s<9){s=-q[m+"ScrollbarIndicatorSize"]+8}}else{if(s>q[m+"ScrollbarMaxScroll"]){s=q.options.fixedScrollbar?q[m+"ScrollbarMaxScroll"]:s+(s-q[m+"ScrollbarMaxScroll"])*3;if(q[m+"ScrollbarIndicatorSize"]+q[m+"ScrollbarMaxScroll"]-s<9){s=q[m+"ScrollbarIndicatorSize"]+q[m+"ScrollbarMaxScroll"]-8}}}q[m+"ScrollbarWrapper"].style.webkitTransitionDelay="0";q[m+"ScrollbarWrapper"].style.opacity=r&&q.options.hideScrollbar?"0":"1";q[m+"ScrollbarIndicator"].style.webkitTransform=b+(m=="h"?s+"px,0":"0,"+s+"px")+h},_transitionTime:function(q){var m=this;q+="ms";m.scroller.style.webkitTransitionDuration=q;if(m.hScrollbar){m.hScrollbarIndicator.style.webkitTransitionDuration=q}if(m.vScrollbar){m.vScrollbarIndicator.style.webkitTransitionDuration=q}},_start:function(s){var r=this,m=j?s.changedTouches[0]:s,q;r.moved=false;s.preventDefault();if(j&&s.touches.length==2&&r.options.zoom&&i&&!r.zoomed){r.originX=d.abs(s.touches[0].pageX+s.touches[1].pageX-r.wrapperOffsetLeft*2)/2-r.x;r.originY=d.abs(s.touches[0].pageY+s.touches[1].pageY-r.wrapperOffsetTop*2)/2-r.y}r.moved=false;r.distX=0;r.distY=0;r.absDistX=0;r.absDistY=0;r.dirX=0;r.dirY=0;r.returnTime=0;r._transitionTime(0);if(r.options.momentum){if(r.scrollInterval){clearInterval(r.scrollInterval);r.scrollInterval=null}if(r.options.HWCompositing){q=new WebKitCSSMatrix(window.getComputedStyle(r.scroller,null).webkitTransform);if(q.m41!=r.x||q.m42!=r.y){r._unbind("webkitTransitionEnd");r._pos(q.m41,q.m42)}}else{q=window.getComputedStyle(r.scroller,null);if(r.x+"px"!=q.left||r.y+"px"!=q.top){r._unbind("webkitTransitionEnd");r._pos(q.left.replace(/[^0-9]/g)*1,q.top.replace(/[^0-9]/g)*1)}}}r.scroller.style.webkitTransitionTimingFunction="cubic-bezier(0.33,0.66,0.66,1)";if(r.hScrollbar){r.hScrollbarIndicator.style.webkitTransitionTimingFunction="cubic-bezier(0.33,0.66,0.66,1)"}if(r.vScrollbar){r.vScrollbarIndicator.style.webkitTransitionTimingFunction="cubic-bezier(0.33,0.66,0.66,1)"}r.startX=r.x;r.startY=r.y;r.pointX=m.pageX;r.pointY=m.pageY;r.startTime=s.timeStamp;if(r.options.onScrollStart){r.options.onScrollStart.call(r)}r._bind(e);r._bind(g);r._bind(c)},_move:function(u){if(j&&u.touches.length>1){return}var s=this,q=j?u.changedTouches[0]:u,r=q.pageX-s.pointX,m=q.pageY-s.pointY,v=s.x+r,t=s.y+m;u.preventDefault();s.pointX=q.pageX;s.pointY=q.pageY;if(v>0||v<s.maxScrollX){v=s.options.bounce?s.x+(r/2.4):v>=0||s.maxScrollX>=0?0:s.maxScrollX}if(t>0||t<s.maxScrollY){t=s.options.bounce?s.y+(m/2.4):t>=0||s.maxScrollY>=0?0:s.maxScrollY;if(s.options.pullToRefresh&&s.contentReady){if(s.pullDownToRefresh&&t>s.offsetBottom){s.pullDownEl.className="iScrollPullDown flip";s.pullDownLabel.innerText=s.options.pullDownLabel[1]}else{if(s.pullDownToRefresh&&s.pullDownEl.className.match("flip")){s.pullDownEl.className="iScrollPullDown";s.pullDownLabel.innerText=s.options.pullDownLabel[0]}}if(s.pullUpToRefresh&&t<s.maxScrollY-s.offsetTop){s.pullUpEl.className="iScrollPullUp flip";s.pullUpLabel.innerText=s.options.pullUpLabel[1]}else{if(s.pullUpToRefresh&&s.pullUpEl.className.match("flip")){s.pullUpEl.className="iScrollPullUp";s.pullUpLabel.innerText=s.options.pullUpLabel[0]}}}}if(s.absDistX<4&&s.absDistY<4){s.distX+=r;s.distY+=m;s.absDistX=d.abs(s.distX);s.absDistY=d.abs(s.distY);return}if(s.options.lockDirection){if(s.absDistX>s.absDistY+3){t=s.y;m=0}else{if(s.absDistY>s.absDistX+3){v=s.x;r=0}}}s.moved=true;s._pos(v,t);s.dirX=r>0?-1:r<0?1:0;s.dirY=m>0?-1:m<0?1:0;if(u.timeStamp-s.startTime>300){s.startTime=u.timeStamp;s.startX=s.x;s.startY=s.y}},_end:function(w){if(j&&w.touches.length!=0){return}var u=this,A=j?w.changedTouches[0]:w,x,z,r={dist:0,time:0},m={dist:0,time:0},t=w.timeStamp-u.startTime,y=u.x,v=u.y,q,s;u._unbind(e);u._unbind(g);u._unbind(c);if(u.zoomed){return}if(!u.moved){if(j){if(u.doubleTapTimer&&u.options.zoom){clearTimeout(u.doubleTapTimer);u.doubleTapTimer=null;u.zoom(u.pointX,u.pointY,u.scale==1?2:1)}else{u.doubleTapTimer=setTimeout(function(){u.doubleTapTimer=null;x=A.target;while(x.nodeType!=1){x=x.parentNode}z=document.createEvent("MouseEvents");z.initMouseEvent("click",true,true,w.view,1,A.screenX,A.screenY,A.clientX,A.clientY,w.ctrlKey,w.altKey,w.shiftKey,w.metaKey,0,null);z._fake=true;x.dispatchEvent(z)},u.options.zoom?250:0)}}u._resetPos();return}if(u.pullDownToRefresh&&u.contentReady&&u.pullDownEl.className.match("flip")){u.pullDownEl.className="iScrollPullDown loading";u.pullDownLabel.innerText=u.options.pullDownLabel[2];u.scroller.style.marginTop="0";u.offsetBottom=0;u.refresh();u.contentReady=false;u.options.onPullDown()}if(u.pullUpToRefresh&&u.contentReady&&u.pullUpEl.className.match("flip")){u.pullUpEl.className="iScrollPullUp loading";u.pullUpLabel.innerText=u.options.pullUpLabel[2];u.scroller.style.marginBottom="0";u.offsetTop=0;u.refresh();u.contentReady=false;u.options.onPullUp()}if(t<300&&u.options.momentum){r=y?u._momentum(y-u.startX,t,-u.x,u.scrollerW-u.wrapperW+u.x,u.options.bounce?u.wrapperW:0):r;m=v?u._momentum(v-u.startY,t,-u.y,(u.maxScrollY<0?u.scrollerH-u.wrapperH+u.y:0),u.options.bounce?u.wrapperH:0):m;y=u.x+r.dist;v=u.y+m.dist;if((u.x>0&&y>0)||(u.x<u.maxScrollX&&y<u.maxScrollX)){r={dist:0,time:0}}if((u.y>0&&v>0)||(u.y<u.maxScrollY&&v<u.maxScrollY)){m={dist:0,time:0}}}if(r.dist||m.dist){q=d.max(d.max(r.time,m.time),10);if(u.options.snap){s=u._snap(y,v);y=s.x;v=s.y;q=d.max(s.time,q)}u.scrollTo(y,v,q);return}if(u.options.snap){s=u._snap(u.x,u.y);if(s.x!=u.x||s.y!=u.y){u.scrollTo(s.x,s.y,s.time)}return}u._resetPos()},_resetPos:function(r){var m=this,s=m.x,q=m.y;if(m.x>=0){s=0}else{if(m.x<m.maxScrollX){s=m.maxScrollX}}if(m.y>=0||m.maxScrollY>0){q=0}else{if(m.y<m.maxScrollY){q=m.maxScrollY}}if(s==m.x&&q==m.y){if(m.moved){if(m.options.onScrollEnd){m.options.onScrollEnd.call(m)}m.moved=false}if(m.zoomed){if(m.options.onZoomEnd){m.options.onZoomEnd.call(m)}m.zoomed=false}if(m.hScrollbar&&m.options.hideScrollbar){m.hScrollbarWrapper.style.webkitTransitionDelay="300ms";m.hScrollbarWrapper.style.opacity="0"}if(m.vScrollbar&&m.options.hideScrollbar){m.vScrollbarWrapper.style.webkitTransitionDelay="300ms";m.vScrollbarWrapper.style.opacity="0"}return}if(r===undefined){r=200}if(r){m.scroller.style.webkitTransitionTimingFunction="cubic-bezier(0.33,0.0,0.33,1)";if(m.hScrollbar){m.hScrollbarIndicator.style.webkitTransitionTimingFunction="cubic-bezier(0.33,0.0,0.33,1)"}if(m.vScrollbar){m.vScrollbarIndicator.style.webkitTransitionTimingFunction="cubic-bezier(0.33,0.0,0.33,1)"}}m.scrollTo(s,q,r)},_timedScroll:function(s,r,w){var v=this,q=v.x,m=v.y,u=(new Date).getTime(),t;v._transitionTime(0);if(v.scrollInterval){clearInterval(v.scrollInterval);v.scrollInterval=null}v.scrollInterval=setInterval(function(){var x=(new Date).getTime(),z,y;if(x>=u+w){clearInterval(v.scrollInterval);v.scrollInterval=null;v._pos(s,r);v._transitionEnd();return}x=(x-u)/w-1;t=d.sqrt(1-x*x);z=(s-q)*t+q;y=(r-m)*t+m;v._pos(z,y)},20)},_transitionEnd:function(q){var m=this;if(q){q.stopPropagation()}m._unbind("webkitTransitionEnd");m._resetPos(m.returnTime);m.returnTime=0},_gestStart:function(q){var m=this;m._transitionTime(0);m.lastScale=1;if(m.options.onZoomStart){m.options.onZoomStart.call(m)}m._unbind("gesturestart");m._bind("gesturechange");m._bind("gestureend");m._bind("gesturecancel")},_gestChange:function(s){var q=this,t=q.scale*s.scale,m,u,r;q.zoomed=true;if(t<q.options.zoomMin){t=q.options.zoomMin}else{if(t>q.options.zoomMax){t=q.options.zoomMax}}r=t/q.scale;m=q.originX-q.originX*r+q.x;u=q.originY-q.originY*r+q.y;q.scroller.style.webkitTransform=b+m+"px,"+u+"px"+h+" scale("+t+")";q.lastScale=r},_gestEnd:function(r){var q=this,s=q.scale,m=q.lastScale;q.scale=s*m;if(q.scale<q.options.zoomMin+0.05){q.scale=q.options.zoomMin}else{if(q.scale>q.options.zoomMax-0.05){q.scale=q.options.zoomMax}}m=q.scale/s;q.x=q.originX-q.originX*m+q.x;q.y=q.originY-q.originY*m+q.y;q.scroller.style.webkitTransform=b+q.x+"px,"+q.y+"px"+h+" scale("+q.scale+")";setTimeout(function(){q.refresh()},0);q._bind("gesturestart");q._unbind("gesturechange");q._unbind("gestureend");q._unbind("gesturecancel")},_wheel:function(s){var r=this,q=r.x+s.wheelDeltaX/12,m=r.y+s.wheelDeltaY/12;if(q>0){q=0}else{if(q<r.maxScrollX){q=r.maxScrollX}}if(m>0){m=0}else{if(m<r.maxScrollY){m=r.maxScrollY}}r.scrollTo(q,m,0)},_momentum:function(x,r,v,m,z){var u=this,w=0.0006,s=d.abs(x)/r,q=(s*s)/(2*w),y=0,t=0;if(x>0&&q>v){t=z/(6/(q/s*w));v=v+t;u.returnTime=800/z*t+100;s=s*v/q;q=v}else{if(x<0&&q>m){t=z/(6/(q/s*w));m=m+t;u.returnTime=800/z*t+100;s=s*m/q;q=m}}q=q*(x<0?-1:1);y=s/w;return{dist:q,time:d.round(y)}},_offset:function(q,m){var s=-q.offsetLeft,r=-q.offsetTop;if(!m){return{x:s,y:r}}while(q=q.offsetParent){s-=q.offsetLeft;r-=q.offsetTop}return{x:s,y:r}},_snap:function(z,w){var u=this,t,s,v,r,q,m;v=u.pagesX.length-1;for(t=0,s=u.pagesX.length;t<s;t++){if(z>=u.pagesX[t]){v=t;break}}if(v==u.currPageX&&v>0&&u.dirX<0){v--}z=u.pagesX[v];q=d.abs(z-u.pagesX[u.currPageX]);q=q?d.abs(u.x-z)/q*500:0;u.currPageX=v;v=u.pagesY.length-1;for(t=0;t<v;t++){if(w>=u.pagesY[t]){v=t;break}}if(v==u.currPageY&&v>0&&u.dirY<0){v--}w=u.pagesY[v];m=d.abs(w-u.pagesY[u.currPageY]);m=m?d.abs(u.y-w)/m*500:0;u.currPageY=v;r=d.round(d.max(q,m))||200;return{x:z,y:w,time:r}},_bind:function(q,m){(m||this.scroller).addEventListener(q,this,false)},_unbind:function(q,m){(m||this.scroller).removeEventListener(q,this,false)},destroy:function(){var m=this;if(m.options.checkDOMChange){clearTimeout(m.DOMChangeInterval)}if(m.pullDownToRefresh){m.pullDownEl.parentNode.removeChild(m.pullDownEl)}if(m.pullUpToRefresh){m.pullUpEl.parentNode.removeChild(m.pullUpEl)}m.hScrollbar=false;m.vScrollbar=false;m._scrollbar("h");m._scrollbar("v");m.scroller.style.webkitTransform="";m._unbind("webkitTransitionEnd");m._unbind(l);m._unbind(f);m._unbind(e);m._unbind(g);m._unbind(c);if(m.options.zoom){m._unbind("gesturestart");m._unbind("gesturechange");m._unbind("gestureend");m._unbind("gesturecancel")}},refresh:function(){var u=this,w=0,v=0,t,r,s,x,q,m;if(u.pullDownToRefresh){m=u.pullDownEl.className.match("loading");if(m&&!u.contentReady){x=u.scrollerH;u.contentReady=true;u.pullDownEl.className="iScrollPullDown";u.pullDownLabel.innerText=u.options.pullDownLabel[0];u.offsetBottom=u.pullDownEl.offsetHeight;u.scroller.style.marginTop=-u.offsetBottom+"px"}else{if(!m){u.offsetBottom=u.pullDownEl.offsetHeight;u.scroller.style.marginTop=-u.offsetBottom+"px"}}}if(u.pullUpToRefresh){m=u.pullUpEl.className.match("loading");if(m&&!u.contentReady){x=u.scrollerH;u.contentReady=true;u.pullUpEl.className="iScrollPullUp";u.pullUpLabel.innerText=u.options.pullUpLabel[0];u.offsetTop=u.pullUpEl.offsetHeight;u.scroller.style.marginBottom=-u.offsetTop+"px"}else{if(!m){u.offsetTop=u.pullUpEl.offsetHeight;u.scroller.style.marginBottom=-u.offsetTop+"px"}}}u.wrapperW=u.wrapper.clientWidth;u.wrapperH=u.wrapper.clientHeight;u.scrollerW=d.round(u.scroller.offsetWidth*u.scale);u.scrollerH=d.round((u.scroller.offsetHeight-u.offsetBottom-u.offsetTop)*u.scale);u.maxScrollX=u.wrapperW-u.scrollerW;u.maxScrollY=u.wrapperH-u.scrollerH;u.dirX=0;u.dirY=0;u._transitionTime(0);u.hScroll=u.options.hScroll&&u.maxScrollX<0;u.vScroll=u.options.vScroll&&(!u.options.bounceLock&&!u.hScroll||u.scrollerH>u.wrapperH);u.hScrollbar=u.hScroll&&u.options.hScrollbar;u.vScrollbar=u.vScroll&&u.options.vScrollbar&&u.scrollerH>u.wrapperH;u._scrollbar("h");u._scrollbar("v");if(typeof u.options.snap=="string"){u.pagesX=[];u.pagesY=[];s=u.scroller.querySelectorAll(u.options.snap);for(t=0,r=s.length;t<r;t++){w=u._offset(s[t]);u.pagesX[t]=w.x<u.maxScrollX?u.maxScrollX:w.x*u.scale;u.pagesY[t]=w.y<u.maxScrollY?u.maxScrollY:w.y*u.scale}}else{if(u.options.snap){u.pagesX=[];while(w>=u.maxScrollX){u.pagesX[v]=w;w=w-u.wrapperW;v++}if(u.maxScrollX%u.wrapperW){u.pagesX[u.pagesX.length]=u.maxScrollX-u.pagesX[u.pagesX.length-1]+u.pagesX[u.pagesX.length-1]}w=0;v=0;u.pagesY=[];while(w>=u.maxScrollY){u.pagesY[v]=w;w=w-u.wrapperH;v++}if(u.maxScrollY%u.wrapperH){u.pagesY[u.pagesY.length]=u.maxScrollY-u.pagesY[u.pagesY.length-1]+u.pagesY[u.pagesY.length-1]}}}if(u.options.zoom){q=u._offset(u.wrapper,true);u.wrapperOffsetLeft=-q.x;u.wrapperOffsetTop=-q.y}if(x&&u.y==0){x=x-u.scrollerH+u.y;u.scrollTo(0,x,0)}u._resetPos()},scrollTo:function(m,t,s,r){var q=this;if(r){m=q.x-m;t=q.y-t}s=!s||(d.round(q.x)==d.round(m)&&d.round(q.y)==d.round(t))?0:s;q.moved=true;if(!q.options.HWTransition){q._timedScroll(m,t,s);return}if(s){q._bind("webkitTransitionEnd")}q._transitionTime(s);q._pos(m,t);if(!s){setTimeout(function(){q._transitionEnd()},0)}},scrollToElement:function(m,r){var q=this,s;m=m.nodeType?m:q.scroller.querySelector(m);if(!m){return}s=q._offset(m);s.x=s.x>0?0:s.x<q.maxScrollX?q.maxScrollX:s.x;s.y=s.y>0?0:s.y<q.maxScrollY?q.maxScrollY:s.y;r=r===undefined?d.max(d.abs(s.x)*2,d.abs(s.y)*2):r;q.scrollTo(s.x,s.y,r)},scrollToPage:function(r,q,t){var s=this,m,u;if(s.options.snap){r=r=="next"?s.currPageX+1:r=="prev"?s.currPageX-1:r;q=q=="next"?s.currPageY+1:q=="prev"?s.currPageY-1:q;r=r<0?0:r>s.pagesX.length-1?s.pagesX.length-1:r;q=q<0?0:q>s.pagesY.length-1?s.pagesY.length-1:q;s.currPageX=r;s.currPageY=q;m=s.pagesX[r];u=s.pagesY[q]}else{m=-s.wrapperW*r;u=-s.wrapperH*q;if(m<s.maxScrollX){m=s.maxScrollX}if(u<s.maxScrollY){u=s.maxScrollY}}s.scrollTo(m,u,t||400)},zoom:function(m,t,s){var q=this,r=s/q.scale;m=m-q.wrapperOffsetLeft-q.x;t=t-q.wrapperOffsetTop-q.y;q.x=m-m*r+q.x;q.y=t-t*r+q.y;q.scale=s;if(q.options.onZoomStart){q.options.onZoomStart.call(q)}q.refresh();q._bind("webkitTransitionEnd");q._transitionTime(200);setTimeout(function(){q.zoomed=true;q.scroller.style.webkitTransform=b+q.x+"px,"+q.y+"px"+h+" scale("+s+")"},0)}};var k="WebKitCSSMatrix" in window&&"m11" in new WebKitCSSMatrix(),j="ontouchstart" in window,i="ongesturestart" in window,a="WebKitTransitionEvent" in window,o=(/iphone|ipad/gi).test(navigator.appVersion),n=(/android/gi).test(navigator.appVersion),l="onorientationchange" in window?"orientationchange":"resize",f=j?"touchstart":"mousedown",e=j?"touchmove":"mousemove",g=j?"touchend":"mouseup",c=j?"touchcancel":"mouseup",b="translate"+(k?"3d(":"("),h=k?",0)":")",d=Math;if(typeof exports!=="undefined"){exports.iScroll=p}else{window.iScroll=p}})();









var GET = 'GET';
var XML = 'xml';
var XML_URI;
var homeDiv=$('<ul id="kategorialista"></ul>');
var smsDiv=$('<ul id="smslista"></ul>');
var almenuDiv=$('<ul id="almenu"></ul>');
var smsTitle;
var app_page; 
var receptListaTitle;
var myScroll;
var mysmsScroll;
var myalmenuScroll;
var currbg;
var canvasW;
var canvasH;
var SMSKategoria;
var smsTitle;
var smsLong;
var almenufontsize;
var shareP='<p class="sharebutton"><img src="images/icon_share_24.png"><img src="images/icon_sms_24.png"><img src="images/icon_gmail_24.png"></p>'
var shareText= '';




var listanev_diadelamujer=["¡Feliz dia de la mujer!"];
var lista_diadelamujer0=[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36];


/* VALENTIN NAP */
var listanev_valentin=["romántico","dulce","poético","chacotero","fidelidad","chasquerillos","sueña","trascendental","numerosos"];

var lista_valentin0=[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31];
var lista_valentin1=[32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48];
var lista_valentin2=[49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76]
var lista_valentin3=[77,78,79,80,81,82,83,84,85,86,87,88,89,90,91,92,93];
var lista_valentin4=[94,95,96,97,98];
var lista_valentin5=[99,100,101,102,103,104,105,106,107,108,109,110,111,112,113,114];
var lista_valentin6=[115,116,117,118,119,120,121,122,123,124]
var lista_valentin7=[125,126,127,128,129,130];
var lista_valentin8= [131,132,133];

var SharetText_valentin=" ";

//var listanev_divertidos=["Divertidos;)"];
//var lista_divertidos0=[];


var listanev_felizcumpleanos=["¡Feliz cumpleaños!"];
var lista_felizcumpleanos0=[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50];

var listanev_buenasnoches=["¡Buenas noches!"];
var lista_buenasnoches0=[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38];


var listanev_positivos=["Si nunca","Tú mismo","Cuando","El más importante","Confía","Sí se puede cuando","Fracaso no significa que","Sabiduría"];
var lista_positivos0=[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16]
var lista_positivos1=[17,18,19,20,21,22,23,24,25,26,27,28,29,30]
var lista_positivos2=[31,32,33,34,35,36,37]
var lista_positivos3=[38,39,40,41,42]
var lista_positivos4=[43,44,45,46]
var lista_positivos5=[47,48,49,50,51,52,53]
var lista_positivos6=[54,55,56,57,58,59,60,61,62,63,64]
var lista_positivos7=[65,66,67,68,69,70,71,72,73,74]




function showSplash(){ 

app_page = "splash";

canvasW=window.innerWidth;
canvasH=window.innerHeight;

$('#kategorialista li').css('width',   canvasW/2 + 'px');

if (canvasW<320) {almenufontsize=11} else if (canvasW<480) {almenufontsize=14} else {almenufontsize=17}
$('.footermenubutton' ).css('font-size',almenufontsize);

//hideMenu(); 
$('#almenuBox').css('top','0px');
$('#home').css('left',canvasW +'px');
$('#smsoldal').css('left',canvasW +'px');
$('#home').css('height', canvasH + 'px')
$('#smsoldal').css('height', canvasH + 'px')
$('#splash').css('height', canvasH + 'px')
$('#page').css('height', canvasH + 'px')
$('#page').css('width',   canvasW + 'px');	

/*	*/
LoadCimek();
}

   
function showHome(){ 

	app_page = "home";
	
	$('#home').css('left','0px');
	$('#smsoldal').css('left',canvasW +'px');
	$('#splash').css('left', -1*canvasW+ 'px');
	$("#cim").html('SMS Maestro');
	$('#almenuBox').css('top','0px');

}    	

function showsms(lid){ 

	app_page = "smslista";
	$('#smsoldal').css('left','0px');

	var mycim= eval('listanev_' + SMSKategoria);
	$("#cim").html(mycim[lid])	
	

	if (mysmsScroll!= undefined) {
		mysmsScroll.destroy();
		mysmsScroll = null;
	}

  	mysmsScroll = new iScroll('wrappersms', {
		//snap: 'ul li',
		momentum: true,
		bounce: true,
		vScrollbar: true,
		hScrollbar: false,		
	 });	
	 
	document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);
	
  //
}

function showMenu() {
	  var navmenu = $('navmenu');
	 var foot= $('#footer1');  
    if(!navmenu.hasClass('active')) {
		foot.css('display', 'block')
		/*navmenu.css('top', '0px');*/
        navmenu.addClass('active');
    } else {
		foot.css('display', 'none')
       navmenu.removeClass('active');
       /*navmenu.css('top', '120px');*/
    }
}

function hideMenu() {
 var navmenu = $('navmenu');
	 var foot= $('#footer1');
	foot.css('display', 'none')
     navmenu.removeClass('active');
}


<!-- --------------------- L O A D T A R T A L OM -------------------------- -->   
function LoadCimek(){ 
	$('#scrollerhome').html(homeDiv);
	var CimlistaHtml="";
	if (canvasW<320) {iconsize=72} else if (canvasW<480) {iconsize=108} else {iconsize=144}


	var smscim ="¡Feliz dia de la mujer!";
	var smskep = "images/icon_bday_" + iconsize + ".png";
	CimlistaHtml+='<a href="#" kategoria="diadelamujer"><li>' + '<img src="' + smskep  + '"/><br />' + smscim + '</li></a>';

	var smscim ="Positivos";
	var smskep = "images/icon_funny_" + iconsize + ".png";
	CimlistaHtml+='<a href="#" kategoria="positivos"><li>' +  '<img src="' + smskep  + '"/><br />' + smscim + '</li></a>';	

	var smscim ="Mensajes de amor";
	var smskep = "images/icon_loveu_" + iconsize + ".png";
	CimlistaHtml+='<a href="#" kategoria="valentin"><li>' +  '<img src="' + smskep  + '"/><br />' + smscim + '</li></a>';

	var smscim ="¡Feliz cumpleaños!";
	var smskep = "images/icon_bday_" + iconsize + ".png";
	CimlistaHtml+='<a href="#" kategoria="felizcumpleanos"><li>' +  '<img src="' + smskep  + '"/><br />' + smscim + '</li></a>';

	var smscim ="¡Buenas noches!";
	var smskep = "images/icon_goodnight_" + iconsize + ".png";
	CimlistaHtml+='<a href="#" kategoria="buenasnoches"><li>' +  '<img src="' + smskep  + '"/><br />' + smscim + '</li></a>';



	//CimlistaHtml+='</ul><br> <p class="introtext">Valentine' + '\'' + 's Day:)</p>';

	
	//CimlistaHtml+='<p class="fblink"><a href="http://www.facebook.com/pages/SmsMester/356481407700273" target="_blank">SmsMester a facebookon is! Lájk ide!</a></p>';
	

  
	$('#kategorialista').html(CimlistaHtml);
	$('#kategorialista').css('font-size',almenufontsize)
		
	$("#kategorialista").delegate("a","click tap",function(){
		  loadLista($(this).attr('kategoria'));
	 }); 
  
	showHome();
}   

function getXML(varCat,handler){ 
   $.ajax({type: GET, dataType: XML, url: XML_URI, success: handler});  
   return false;
  
} 

function loadLista(kateg) {	
SMSKategoria=kateg;
	XML_URI = 'data/' +SMSKategoria + '.xml';
	getXML('0',showAlmenu);	
}

function showAlmenu(xml) {
	
	$('#scrolleralmenu').html(almenuDiv);
	var almenuHtml='';
	var curr_amenulista=eval("listanev_" + SMSKategoria)
	
	almenuDivWidth=0;
	
	$.each(curr_amenulista, function(index, value) { 
 	 almenuHtml+='<li id="' + index + '" class="footermenubutton">' + curr_amenulista[index]  + '</li>'
		});
	
	$('#almenu').html(almenuHtml);
	
	$("#almenu li").each(function(){
		almenuDivWidth+=31+parseInt($(this).css('width'));
      });
  	$('#scrolleralmenu').css('width', almenuDivWidth);
	
  	 $("#almenu").delegate("li","click tap",function(){
	  Loadsms($(this).attr('id'), xml );
 	 }); 
	 
	 	$('#almenuBox').css('top','36px');	
	 
	if (myalmenuScroll!= undefined) {
		myalmenuScroll.destroy();
		myalmenuScroll = null;
	}
	
	myalmenuScroll = new iScroll('wrapperalmenu', {
		snap: 'ul li', 
		momentum: true, 
		bounce: true,
		hScrollbar: false, 
		vScrollbar: false,
	});
	 
	 
	
	   	
  Loadsms('0', xml);
 
}


function Loadsms(lid, xml) {
	
	$('#home').css('left',-1*canvasW+ 'px');
	

		var mylista= eval('lista_' + SMSKategoria + lid); //eval("lista_" + lid);
		$('#almenu > li').css('color','#6c0000');
		$('#almenu > li').css('background','none');
		$("#"+lid).css('color','#fff');
		$("#"+lid).css('background','#cc0000');
	
		$('#scrollersms').html(smsDiv);
		 var smsHtml = '' /*//<li class="smscontent">Oldalra lapozva válogathatsz az sms-ek között<br></li>';*/
  		smsLong=0;
	
 		$(xml).find('sms').each(function(){
			var sms = $(this).text();
			smsLong+=1;
			if (jQuery.inArray(smsLong, mylista)>-1) {	
			smsHtml+=  '<li class="smscontent">' + sms + '<a href="#">' +  shareP + '</a></li>';
			}
  		});	
  	
 	 $("#scrollersms").undelegate("a","click tap",function(){
 	  return false; 
 	 });
	
	
 	 $("#scrollersms").delegate("a","click tap",function(){
 	  shareIt(shareText, $(this).parent().text() + " " + shareText + " http://goo.gl/3DFnz");
 	  return false;
		  //Loadsms($(this).attr('listaid'), xml);
  	});
 				
		$('#smslista').html(smsHtml);
		
		showsms(lid);

//	}, 400); //end settimeout

} // End Loadsms
	
var SIT=false;

function shareIt(sub, text) {
	if (!SIT){
		//alert(text);
	SIT=true;
	window.plugins.share.show({
 	  subject: sub,
  	  text: text},
 	  function() {SIT=false; return false;}, // Success function
   	 function() {SIT=false; return false;} // Failure function
	);
	}
}



<!-- ----------------------------------------------------------------------------- -->

$(document).ready(function () { 
	showSplash();
});  





/**
 * 
 * Phonegap share plugin for Android
 * Kevin Schaul 2011
 *
 */

var Share = function() {};
			
Share.prototype.show = function(content, success, fail) {
	return PhoneGap.exec( function(args) {
		success(args);
	}, function(args) {
		fail(args);
	}, 'Share', '', [content]);
};

PhoneGap.addConstructor(function() {
	/**
	 * Phonegap version < 1.0
	 * use the following line
	 */
	PhoneGap.addPlugin('share', new Share());
	//PluginManager.addService("Share","com.schaul.plugins.share.Share");
});


// Wait for PhoneGap to load
    // 
    document.addEventListener("deviceready", onDeviceReady, false);
	// document.addEventListener("resume", onResume, false);
    // PhoneGap is loaded and it is now safe to make calls PhoneGap methods
    //
	
//	function onResume() 
//alert("Resume")
//}
	
    function onDeviceReady() {
		
				
//	showSplash();
//	getXML('0',LoadCimek);

      /*  checkConnection();
		document.addEventListener("online", onOnline, false);*/
		document.addEventListener("backbutton", onBackKeyDown, false);
	//	document.addEventListener("menubutton", onMenuKeyDown, false);
    }
	//  Handle the online event //
function onOnline() {
	//  //
    }	
	
// Handle the back button //
function onBackKeyDown() {
	
		switch (app_page) {
		
		case "smslista": showHome();	
		break;
	
			
		default:
				
		navigator.notification.confirm(
            '¿Seguro que quieres salir?',  // message
            onConfirm,              // callback to invoke with index of button pressed
            'salir',            // title
            'Sí,No'          // buttonLabels
        );	
		
		}
    }
		
function onConfirm(button) {
		if (button==1) {
		navigator.app.exitApp();
		} else {/* nothing */}	
    }
    // Handle the menu button//
    function onMenuKeyDown() {	
	
	showMenu();
	
	/*
	   var nav = $('nav');
    if(!nav.hasClass('active')) {
        var newTop = $(window).scrollTop();
		nav.css('top', newTop + 'px');
        nav.addClass('active');
    } else {
        nav.removeClass('active');
        nav.css('top', '-58px');
    }	
	
	*/
			
//	navigator.notification.confirm(
  //          'MenĂĽ',  // message
  //          onConfirm2,              // callback to invoke with index of button pressed
  //          'MenĂĽ',            // title
  //          'KetegĂłriĂˇk,Receptek'          // buttonLabels
  //      );	
			
//function onConfirm2(button) {
//		if (button==1) {
//		$.mobile.changePage('#home', 'slide', true, false);	
//		} else {
//		$.mobile.changePage('#receptlista', 'slide', true, false);		
//		}	
//   }				
//		/* http://samcroft.co.uk/2011/android-phonegap-app-reveal-menu/ */
 
}
	
