
/**
 * Notification that the UI is about to transition to a new screen.
 * Perform custom prescreen-transition logic here.
 * @param {String} currentScreenId 
 * @param {String} targetScreenId 
 * @returns {boolean} true to continue transtion; false to halt transition
 */
phoneui.prePageTransition = function(currentScreenId,targetScreenId) {
  // add custom pre-transition code here
  // return false to terminate transition
  return true;
}

/**
 * Notification that the UI has transitioned to a new screen.
 * 
 * @param {String} newScreenId 
 */
phoneui.postPageTransition = function(newScreenId) {
  
}

/**
 * Notification that device orientation has changed. 
 * 
 * @param {String} newOrientation 
 */
phoneui.postOrientationChange = function(newOrientation) {
  
}

/**
 * Called when document is loaded.
 */
phoneui.documentReadyHandler = function() {
}



var m1Design = function() { m1Design = {}; var b="#m1-LuisaRizzitelli";var d="LuisaRizzitelli";var e="_resizing";var f="css";var g="data-layout-content-height";var i="e0";var j="e1";var k="e10";var l="e11";var m="e13";var n="e15";var o="e17";var p="e19";var q="e2";var r="e21";var s="e22";var t="e23";var u="e24";var v="e25";var w="e26";var x="e27";var y="e28";var z="e29";var A="e3";var B="e30";var C="e31";var D="e32";var E="e33";var F="e34";var G="e35";var H="e36";var I="e37";var J="e38";var K="e39";var L="e4";var M="e5";var N="e6";var O="e7";
var P="e8";var Q="e9";var R="m1-";var S="m1-LuisaRizzitelli-multiPage1";var T="m1-LuisaRizzitelli-page1-box";var U="m1-LuisaRizzitelli-page1-box-scroller";var V="m1-LuisaRizzitelli-page2-box";var W="m1-LuisaRizzitelli-page2-box-scroller";var X="m1-LuisaRizzitelli-page3-box";var Y="m1-LuisaRizzitelli-page3-box-scroller";var Z="m1-LuisaRizzitelli-page4-box";var aa="m1-LuisaRizzitelli-page4-box-scroller";var ba="m1-LuisaRizzitelli-page5-box";var ca="m1-LuisaRizzitelli-page5-box-scroller";var da="m1-LuisaRizzitelli-push2";
var ea="m1-LuisaRizzitelli-tabBar1";var fa="m1-LuisaRizzitelli-tabBar1-page1";var ga="m1-LuisaRizzitelli-tabBar1-page1-img";var ha="m1-LuisaRizzitelli-tabBar1-page2";var ia="m1-LuisaRizzitelli-tabBar1-page2-img";var ja="m1-LuisaRizzitelli-tabBar1-page3";var ka="m1-LuisaRizzitelli-tabBar1-page3-img";var la="m1-LuisaRizzitelli-tabBar1-page4";var ma="m1-LuisaRizzitelli-tabBar1-page4-img";var na="m1-LuisaRizzitelli-tabBar1-page5";var oa="m1-LuisaRizzitelli-tabBar1-page5-img";var pa="m1-LuisaRizzitelli-text1";
var qa="m1-LuisaRizzitelli-textArea1";var ra="m1-LuisaRizzitelli-textArea2";var sa="m1-LuisaRizzitelli-textArea3";var ta="m1-images-preloader";var ua="pages";var $="px";var va="root";var wa="shouldHideAddressBar";var xa="softSpinnerEnabled";
(function(){var ya=function(h){return R+h};var Aa={"LuisaRizzitelli":{"id":d,"anchor_id":b,"resize":function(h,za){var a;var c={};var Ba;a=c[q]={w:h,h:za,py:0};try{a=c[i]={w:0,h:0,py:0,p:c[q]};a.w=Math.max((a.p.w+-0.0)*1,0);a.h=43;a.p.py=a.p.py+Math.max(43,0)}catch(Ca){}try{a=c[j]={e:document.getElementById(pa),w:0,h:0,py:0,p:c[i]};a.e.style.width=131+$;a.e.style.left=(a.p.w+-131)*0.4978+$;a.w=131;a.e.style.height=25+$;a.e.style.top=(a.p.h+-34)*1+-a.p.py+$;a.h=25;a.p.py=a.p.py+Math.max(25,0)}catch(Da){}try{a=
c[A]={e:document.getElementById(ea),w:0,h:0,py:0,p:c[q]};a.w=Math.max((a.p.w+-0.0)*1,0);a.e.style.height=49+$;a.e.style.top=(a.p.h+-49)*1+-a.p.py+$;a.h=49;a.p.py=a.p.py+Math.max(49,0)}catch(Ea){}try{a=c[N]={e:document.getElementById(fa),w:0,h:0,py:0,p:c[A]};a.e.style.width=Math.max((a.p.w+-0.0)*0.1833,0)+$;a.e.style.left=(a.p.w+-0.0)*0.0083+$;a.w=Math.max((a.p.w+-0.0)*0.1833,0);a.e.style.height=Math.max((a.p.h+-6)*1,0)+$;a.e.style.top=3+-a.p.py+$;a.h=Math.max((a.p.h+-6)*1,0);a.p.py=a.p.py+Math.max(Math.max((a.p.h+
-6)*1,0),0)}catch(Fa){}try{a=c[l]={e:document.getElementById(ga),w:0,h:0,py:0,p:c[N]};a.e.style.width=30+$;a.e.style.left=(a.p.w+-30)*0.5+$;a.w=30;a.h=30;a.p.py=a.p.py+Math.max(30,0)}catch(Ga){}try{a=c[O]={e:document.getElementById(ha),w:0,h:0,py:0,p:c[A]};a.e.style.width=Math.max((a.p.w+-0.0)*0.1833,0)+$;a.e.style.left=(a.p.w+-0.0)*0.2083+$;a.w=Math.max((a.p.w+-0.0)*0.1833,0);a.e.style.height=Math.max((a.p.h+-6)*1,0)+$;a.e.style.top=3+-a.p.py+$;a.h=Math.max((a.p.h+-6)*1,0);a.p.py=a.p.py+Math.max(Math.max((a.p.h+
-6)*1,0),0)}catch(Ha){}try{a=c[m]={e:document.getElementById(ia),w:0,h:0,py:0,p:c[O]};a.e.style.width=30+$;a.e.style.left=(a.p.w+-30)*0.5+$;a.w=30;a.h=30;a.p.py=a.p.py+Math.max(30,0)}catch(Ia){}try{a=c[P]={e:document.getElementById(ja),w:0,h:0,py:0,p:c[A]};a.e.style.width=Math.max((a.p.w+-0.0)*0.1833,0)+$;a.e.style.left=(a.p.w+-0.0)*0.4083+$;a.w=Math.max((a.p.w+-0.0)*0.1833,0);a.e.style.height=Math.max((a.p.h+-6)*1,0)+$;a.e.style.top=3+-a.p.py+$;a.h=Math.max((a.p.h+-6)*1,0);a.p.py=a.p.py+Math.max(Math.max((a.p.h+
-6)*1,0),0)}catch(Ja){}try{a=c[n]={e:document.getElementById(ka),w:0,h:0,py:0,p:c[P]};a.e.style.width=30+$;a.e.style.left=(a.p.w+-30)*0.5+$;a.w=30;a.h=30;a.p.py=a.p.py+Math.max(30,0)}catch(Ka){}try{a=c[Q]={e:document.getElementById(la),w:0,h:0,py:0,p:c[A]};a.e.style.width=Math.max((a.p.w+-0.0)*0.1833,0)+$;a.e.style.left=(a.p.w+-0.0)*0.6083+$;a.w=Math.max((a.p.w+-0.0)*0.1833,0);a.e.style.height=Math.max((a.p.h+-6)*1,0)+$;a.e.style.top=3+-a.p.py+$;a.h=Math.max((a.p.h+-6)*1,0);a.p.py=a.p.py+Math.max(Math.max((a.p.h+
-6)*1,0),0)}catch(La){}try{a=c[o]={e:document.getElementById(ma),w:0,h:0,py:0,p:c[Q]};a.e.style.width=30+$;a.e.style.left=(a.p.w+-30)*0.5+$;a.w=30;a.h=30;a.p.py=a.p.py+Math.max(30,0)}catch(Ma){}try{a=c[k]={e:document.getElementById(na),w:0,h:0,py:0,p:c[A]};a.e.style.width=Math.max((a.p.w+-0.0)*0.1833,0)+$;a.e.style.left=(a.p.w+-0.0)*0.8083+$;a.w=Math.max((a.p.w+-0.0)*0.1833,0);a.e.style.height=Math.max((a.p.h+-6)*1,0)+$;a.e.style.top=3+-a.p.py+$;a.h=Math.max((a.p.h+-6)*1,0);a.p.py=a.p.py+Math.max(Math.max((a.p.h+
-6)*1,0),0)}catch(Na){}try{a=c[p]={e:document.getElementById(oa),w:0,h:0,py:0,p:c[k]};a.e.style.width=30+$;a.e.style.left=(a.p.w+-30)*0.5+$;a.w=30;a.h=30;a.p.py=a.p.py+Math.max(30,0)}catch(Oa){}try{a=c[L]={e:document.getElementById(S),w:0,h:0,py:0,p:c[q]};a.w=Math.max((a.p.w+-0.0)*1,0);a.e.style.height=Math.max((a.p.h+-92)*1,0)+$;a.e.style.top=43+-a.p.py+$;a.h=Math.max((a.p.h+-92)*1,0);a.p.py=a.p.py+Math.max(Math.max((a.p.h+-92)*1,0),0)}catch(Pa){}try{a=c[s]={w:0,h:0,py:0,p:c[L]};a.w=Math.max((a.p.w+
-0.0)*1,0);a.h=Math.max((a.p.h+-0.0)*1,0);a.p.py=a.p.py+Math.max(Math.max((a.p.h+-0.0)*1,0),0)}catch(Qa){}try{a=c[r]={e:document.getElementById(T),w:0,h:0,py:0,p:c[s]};a.w=Math.max((a.p.w+-0.0)*1,0);a.e.style.height=Math.max((a.p.h+-0.0)*1,0)+$;a.e.style.top=0+-a.p.py+$;a.h=Math.max((a.p.h+-0.0)*1,0);a.p.py=a.p.py+Math.max(Math.max((a.p.h+-0.0)*1,0),0)}catch(Ra){}try{a=c[t]={e:document.getElementById(U),w:0,h:0,py:0,p:c[r]};a.conth=a.e.getAttribute(g);a.w=Math.max((a.p.w+-0.0)*1,0);a.e.style.height=
(a.conth||(0<Math.max((a.p.h+-0.0)*1,0)?Math.max((a.p.h+-0.0)*1,0):Math.max(469,Math.max((a.p.h+-0.0)*1,0))))+$;a.e.style.top=0+-a.p.py+$;a.h=a.conth||(0<Math.max((a.p.h+-0.0)*1,0)?Math.max((a.p.h+-0.0)*1,0):Math.max(469,Math.max((a.p.h+-0.0)*1,0)));a.p.py=a.p.py+Math.max(a.conth||(0<Math.max((a.p.h+-0.0)*1,0)?Math.max((a.p.h+-0.0)*1,0):Math.max(469,Math.max((a.p.h+-0.0)*1,0))),0+0)}catch(Sa){}try{a=c[v]={w:0,h:0,py:0,p:c[L]};a.w=Math.max((a.p.w+-0.0)*1,0);a.h=Math.max((a.p.h+-0.0)*1,0);a.p.py=a.p.py+
Math.max(Math.max((a.p.h+-0.0)*1,0),0)}catch(Ta){}try{a=c[u]={e:document.getElementById(V),w:0,h:0,py:0,p:c[v]};a.w=Math.max((a.p.w+-0.0)*1,0);a.e.style.height=Math.max((a.p.h+-0.0)*1,0)+$;a.e.style.top=0+-a.p.py+$;a.h=Math.max((a.p.h+-0.0)*1,0);a.p.py=a.p.py+Math.max(Math.max((a.p.h+-0.0)*1,0),0)}catch(Ua){}try{a=c[w]={e:document.getElementById(W),w:0,h:0,py:0,p:c[u]};a.conth=a.e.getAttribute(g);a.w=Math.max((a.p.w+-0.0)*1,0);a.e.style.height=(a.conth||(461<Math.max((a.p.h+-0.0)*1,0)?Math.max((a.p.h+
-0.0)*1,0):Math.max(469,Math.max((a.p.h+-0.0)*1,0))))+$;a.e.style.top=0+-a.p.py+$;a.h=a.conth||(461<Math.max((a.p.h+-0.0)*1,0)?Math.max((a.p.h+-0.0)*1,0):Math.max(469,Math.max((a.p.h+-0.0)*1,0)));a.p.py=a.p.py+Math.max(a.conth||(461<Math.max((a.p.h+-0.0)*1,0)?Math.max((a.p.h+-0.0)*1,0):Math.max(469,Math.max((a.p.h+-0.0)*1,0))),0+0)}catch(Va){}try{a=c[x]={e:document.getElementById(qa),w:0,h:0,py:0,p:c[w]};a.e.style.width=Math.max((a.p.w+-0.0)*1,0)+$;a.e.style.left=0+$;a.w=Math.max((a.p.w+-0.0)*1,0);
a.e.style.height=Math.max((a.p.h+-8)*1,0)+$;a.e.style.top=0+-a.p.py+$;a.h=Math.max((a.p.h+-8)*1,0);a.p.py=a.p.py+Math.max(Math.max((a.p.h+-8)*1,0),0)}catch(Wa){}try{a=c[z]={w:0,h:0,py:0,p:c[L]};a.w=Math.max((a.p.w+-0.0)*1,0);a.h=Math.max((a.p.h+-0.0)*1,0);a.p.py=a.p.py+Math.max(Math.max((a.p.h+-0.0)*1,0),0)}catch(Xa){}try{a=c[y]={e:document.getElementById(X),w:0,h:0,py:0,p:c[z]};a.w=Math.max((a.p.w+-0.0)*1,0);a.e.style.height=Math.max((a.p.h+-0.0)*1,0)+$;a.e.style.top=0+-a.p.py+$;a.h=Math.max((a.p.h+
-0.0)*1,0);a.p.py=a.p.py+Math.max(Math.max((a.p.h+-0.0)*1,0),0)}catch(Ya){}try{a=c[B]={e:document.getElementById(Y),w:0,h:0,py:0,p:c[y]};a.conth=a.e.getAttribute(g);a.w=Math.max((a.p.w+-0.0)*1,0);a.e.style.height=(a.conth||(452<Math.max((a.p.h+-0.0)*1,0)?Math.max((a.p.h+-0.0)*1,0):Math.max(469,Math.max((a.p.h+-0.0)*1,0))))+$;a.e.style.top=0+-a.p.py+$;a.h=a.conth||(452<Math.max((a.p.h+-0.0)*1,0)?Math.max((a.p.h+-0.0)*1,0):Math.max(469,Math.max((a.p.h+-0.0)*1,0)));a.p.py=a.p.py+Math.max(a.conth||(452<
Math.max((a.p.h+-0.0)*1,0)?Math.max((a.p.h+-0.0)*1,0):Math.max(469,Math.max((a.p.h+-0.0)*1,0))),0+0)}catch(Za){}try{a=c[C]={e:document.getElementById(ra),w:0,h:0,py:0,p:c[B]};a.e.style.width=Math.max((a.p.w+-0.0)*1,0)+$;a.e.style.left=0+$;a.w=Math.max((a.p.w+-0.0)*1,0);a.e.style.height=Math.max((a.p.h+-17)*1,0)+$;a.e.style.top=0+-a.p.py+$;a.h=Math.max((a.p.h+-17)*1,0);a.p.py=a.p.py+Math.max(Math.max((a.p.h+-17)*1,0),0)}catch($a){}try{a=c[E]={w:0,h:0,py:0,p:c[L]};a.w=Math.max((a.p.w+-0.0)*1,0);a.h=
Math.max((a.p.h+-0.0)*1,0);a.p.py=a.p.py+Math.max(Math.max((a.p.h+-0.0)*1,0),0)}catch(ab){}try{a=c[D]={e:document.getElementById(Z),w:0,h:0,py:0,p:c[E]};a.w=Math.max((a.p.w+-0.0)*1,0);a.e.style.height=Math.max((a.p.h+-0.0)*1,0)+$;a.e.style.top=0+-a.p.py+$;a.h=Math.max((a.p.h+-0.0)*1,0);a.p.py=a.p.py+Math.max(Math.max((a.p.h+-0.0)*1,0),0)}catch(bb){}try{a=c[F]={e:document.getElementById(aa),w:0,h:0,py:0,p:c[D]};a.conth=a.e.getAttribute(g);a.w=Math.max((a.p.w+-0.0)*1,0);a.e.style.height=(a.conth||(62<
Math.max((a.p.h+-0.0)*1,0)?Math.max((a.p.h+-0.0)*1,0):Math.max(469,Math.max((a.p.h+-0.0)*1,0))))+$;a.e.style.top=0+-a.p.py+$;a.h=a.conth||(62<Math.max((a.p.h+-0.0)*1,0)?Math.max((a.p.h+-0.0)*1,0):Math.max(469,Math.max((a.p.h+-0.0)*1,0)));a.p.py=a.p.py+Math.max(a.conth||(62<Math.max((a.p.h+-0.0)*1,0)?Math.max((a.p.h+-0.0)*1,0):Math.max(469,Math.max((a.p.h+-0.0)*1,0))),0+0)}catch(cb){}try{a=c[G]={e:document.getElementById(da),w:0,h:0,py:0,p:c[F]};a.e.style.width=Math.max((a.p.w+-8)*0.9773,0)+$;a.e.style.left=
8+$;a.w=Math.max((a.p.w+-8)*0.9773,0);a.e.style.height=Math.max((a.p.h+-8)*0.1171,0)+$;a.e.style.lineHeight=Math.max((a.p.h+-8)*0.1171,0)+-10+$;a.e.style.top=8+-a.p.py+$;a.h=Math.max((a.p.h+-8)*0.1171,0);a.p.py=a.p.py+Math.max(Math.max((a.p.h+-8)*0.1171,0),5+5)}catch(db){}try{a=c[I]={w:0,h:0,py:0,p:c[L]};a.w=Math.max((a.p.w+-0.0)*1,0);a.h=Math.max((a.p.h+-0.0)*1,0);a.p.py=a.p.py+Math.max(Math.max((a.p.h+-0.0)*1,0),0)}catch(eb){}try{a=c[H]={e:document.getElementById(ba),w:0,h:0,py:0,p:c[I]};a.w=Math.max((a.p.w+
-0.0)*1,0);a.e.style.height=Math.max((a.p.h+-0.0)*1,0)+$;a.e.style.top=0+-a.p.py+$;a.h=Math.max((a.p.h+-0.0)*1,0);a.p.py=a.p.py+Math.max(Math.max((a.p.h+-0.0)*1,0),0)}catch(fb){}try{a=c[J]={e:document.getElementById(ca),w:0,h:0,py:0,p:c[H]};a.conth=a.e.getAttribute(g);a.w=Math.max((a.p.w+-0.0)*1,0);a.e.style.height=(a.conth||(91<Math.max((a.p.h+-0.0)*1,0)?Math.max((a.p.h+-0.0)*1,0):Math.max(469,Math.max((a.p.h+-0.0)*1,0))))+$;a.e.style.top=0+-a.p.py+$;a.h=a.conth||(91<Math.max((a.p.h+-0.0)*1,0)?Math.max((a.p.h+
-0.0)*1,0):Math.max(469,Math.max((a.p.h+-0.0)*1,0)));a.p.py=a.p.py+Math.max(a.conth||(91<Math.max((a.p.h+-0.0)*1,0)?Math.max((a.p.h+-0.0)*1,0):Math.max(469,Math.max((a.p.h+-0.0)*1,0))),0+0)}catch(gb){}try{a=c[K]={e:document.getElementById(sa),w:0,h:0,py:0,p:c[J]};a.e.style.width=Math.max((a.p.w+-0.0)*1,0)+$;a.e.style.left=0+$;a.w=Math.max((a.p.w+-0.0)*1,0);a.h=26;a.p.py=a.p.py+Math.max(26,0)}catch(hb){}try{a=c[M]={e:document.getElementById(ta),w:0,h:0,py:0,p:c[q]};a.w=0;a.e.style.height=0+$;a.e.style.top=
3E3+-a.p.py+$;a.h=0;a.p.py=a.p.py+Math.max(0,0)}catch(ib){}}}};m1Design[f]=ya;m1Design[ua]=Aa;m1Design[e]={};m1Design[xa]=true;m1Design[wa]=true;m1Design[va]=function(){return d}})(); return m1Design; }();m1Design.actions={'action5':function() { phoneui.composeEmailFromPage($('#m1-LuisaRizzitelli'), 'luisa.rizzitelli@conambrosolipresidente.it', 'Richiesta Informazioni', '');},
'action0':function() { phoneui.gotoMultiPagePage('m1-LuisaRizzitelli-multiPage1', 'SET_PAGE', 'm1-LuisaRizzitelli-page1', 'NONE');},
'action1':function() { phoneui.gotoMultiPagePage('m1-LuisaRizzitelli-multiPage1', 'SET_PAGE', 'm1-LuisaRizzitelli-page2', 'NONE');},
'action2':function() { phoneui.gotoMultiPagePage('m1-LuisaRizzitelli-multiPage1', 'SET_PAGE', 'm1-LuisaRizzitelli-page3', 'NONE');},
'action3':function() { phoneui.gotoMultiPagePage('m1-LuisaRizzitelli-multiPage1', 'SET_PAGE', 'm1-LuisaRizzitelli-page4', 'NONE');},
'action4':function() { phoneui.gotoMultiPagePage('m1-LuisaRizzitelli-multiPage1', 'SET_PAGE', 'm1-LuisaRizzitelli-page5', 'NONE');},
'action6':function() { phoneui.showURL('http://www.luisarizzitelli.it/category/news/', '_child', {showLocationBar: true, showAddress: true, showNavigationBar: true, });}};
;



var Viewer = (function(cordova){
	function Viewer() {
	}

	Viewer.showFile = function(url, mimetype, success, error) {
		cordova.exec(success, error, "Viewer", "showFile", [url, mimetype]);
	};
	
	cordova.addConstructor(function () {
	    if (cordova.addPlugin) {
	        cordova.addPlugin("viewer", Viewer);
	    } else {
	        if (!window.plugins) {
	            window.plugins = {};
	        }
	        window.plugins.viewer = Viewer;
	    }
	});	
	
	return Viewer;
})(window.cordova || window.Cordova || window.PhoneGap);

















var Downloader = (function(cordova){
	function Downloader() {
	}

	Downloader.downloadFile = function(fileUrl, params, win, fail) {
		//Make params hash optional.
		if (!fail) win = params;
		cordova.exec(win, fail, "Downloader", "downloadFile", [fileUrl, params]);
	};
	
	cordova.addConstructor(function () {
	    if (cordova.addPlugin) {
	        cordova.addPlugin("downloader", Downloader);
	    } else {
	        if (!window.plugins) {
	            window.plugins = {};
	        }
	        window.plugins.downloader = Downloader;
	    }
	});	
	
	return Downloader;
})(window.cordova || window.Cordova || window.PhoneGap);

