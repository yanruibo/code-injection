
/**
 * Perform custom preprocessing or actions before submitting form. 
 * Common presubmission tasks include form validation and 
 * preprocessing of form data.
 * 
 * @param {boolean} true if all OK to proceed with form submission; 
 *                  false implies terminate form submission process
 * @param {Object} data results of form processing; error message if isSuccess == false
 * @return {boolean} true if OK; otherwise false
 */
phoneui.preSubmitForm_m1_IsolaSaviano = function(form) {
  // add custom presubmission code here, e.g., form validation & error handling
  // return false to terminate form submission
  return true;
}

/**
 * Perform custom actions upon return from form submission.
 * 
 * @param {boolean} isSuccess true if all OK; otherwise false
 * @param {Object} data results of form processing; error message if isSuccess == false
 * @return {boolean} true if OK; otherwise false
 */
phoneui.postSubmitForm_m1_IsolaSaviano = function(isSuccess, data) {
  // add custom postubmission processing code here,
  // e.g., parse and process results & update UI controls with data as needed
  // return false to terminate form processing
  var result = true;
  if (isSuccess) {
    // process data
    result = true;
  } else {
    // submit failed
    // data = error msg
    result = false;
  }
  return result;
}

/**
 * Notification that the UI is about to transition to a new page.
 * Perform custom prepage-transition logic here.
 * @param {String} currentPageId 
 * @param {String} targetPageId 
 * @returns {boolean} true to continue transtion; false to halt transition
 */
phoneui.prePageTransition = function(currentPageId,targetPageId) {
  // add custom pre-transition code here
  // return false to terminate transition
  return true;
}

/**
 * Notification that the UI has transition to a new page.
 * 
 * @param {String} newPageId 
 */
phoneui.postPageTransition = function(newPageId) {
  
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















(function() {var c="data-layout-content-height";var d="e100";var e="e101";var f="e102";var g="e105";var h="e106";var i="e41";var j="e44";var k="e45";var l="e46";var m="e47";var n="e48";var o="e49";var p="e50";var q="e51";var r="e52";var s="e53";var t="e54";var u="e55";var v="e56";var w="e57";var x="e58";var y="e59";var z="e60";var A="e61";var B="e62";var C="e63";var D="e64";var E="e65";var F="e66";var G="e67";var H="e68";var I="e69";var J="e70";var K="e71";var L="e72";var M="e73";var N="e74";var O="e75";
var P="e76";var Q="e77";var R="e78";var S="e79";var T="e80";var aa="e81";var U="e82";var ba="e83";var ca="e84";var V="e85";var da="e86";var ea="e87";var W="e88";var fa="e89";var ga="e90";var X="e91";var ha="e92";var ia="e93";var Y="e94";var ja="e95";var ka="e96";var Z="e97";var la="e98";var ma="e99";var na="m1-IsolaSaviano_Info-accessoryImage1";var oa="m1-IsolaSaviano_Info-accessoryImage10";var pa="m1-IsolaSaviano_Info-accessoryImage11";var qa="m1-IsolaSaviano_Info-accessoryImage12";var ra="m1-IsolaSaviano_Info-accessoryImage13";
var sa="m1-IsolaSaviano_Info-accessoryImage2";var ta="m1-IsolaSaviano_Info-accessoryImage3";var ua="m1-IsolaSaviano_Info-accessoryImage4";var va="m1-IsolaSaviano_Info-accessoryImage5";var wa="m1-IsolaSaviano_Info-accessoryImage6";var xa="m1-IsolaSaviano_Info-accessoryImage7";var ya="m1-IsolaSaviano_Info-accessoryImage8";var za="m1-IsolaSaviano_Info-accessoryImage9";var Aa="m1-IsolaSaviano_Info-btnDoveSiamo";var Ba="m1-IsolaSaviano_Info-btnHome";var Ca="m1-IsolaSaviano_Info-btnInformazioni";
var Da="m1-IsolaSaviano_Info-image1";var Ea="m1-IsolaSaviano_Info-image2";var Fa="m1-IsolaSaviano_Info-image3";var Ga="m1-IsolaSaviano_Info-list1";var Ha="m1-IsolaSaviano_Info-panel1";var Ia="m1-IsolaSaviano_Info-panel1-scroller";var Ja="m1-IsolaSaviano_Info-panel3";var Ka="m1-IsolaSaviano_Info-panel4";var La="m1-IsolaSaviano_Info-text1";var Ma="m1-IsolaSaviano_Info-text10";var Na="m1-IsolaSaviano_Info-text11";var Oa="m1-IsolaSaviano_Info-text12";var Pa="m1-IsolaSaviano_Info-text13";var Qa="m1-IsolaSaviano_Info-text132";
var Ra="m1-IsolaSaviano_Info-text14";var Sa="m1-IsolaSaviano_Info-text15";var Ta="m1-IsolaSaviano_Info-text16";var Ua="m1-IsolaSaviano_Info-text17";var Va="m1-IsolaSaviano_Info-text18";var Wa="m1-IsolaSaviano_Info-text19";var Xa="m1-IsolaSaviano_Info-text2";var Ya="m1-IsolaSaviano_Info-text20";var Za="m1-IsolaSaviano_Info-text5";var $a="m1-IsolaSaviano_Info-text6";var ab="m1-IsolaSaviano_Info-text9";var bb="m1-IsolaSaviano_Info-toolbar1";var cb="m1-images-preloader2";var $="px";
m1Design._resizing["IsolaSaviano_Info"]=function(db,eb){var a;var b={};var fb;a=b[k]={w:db,h:eb,py:0};try{a=b[i]={w:0,h:0,py:0,p:b[k]};a.w=Math.max(a.p.w,0);a.h=30;a.p.py+=30}catch(gb){}try{a=b[j]={e:document.getElementById($a),w:0,h:0,py:0,p:b[k]};a.e.style.width=310+$;a.e.style.left=Math.max((a.p.w-310)*0.5,0)+$;a.w=310;a.h=21;a.p.py+=21}catch(hb){}try{a=b[l]={w:0,h:0,py:0,p:b[k]};a.w=Math.max(a.p.w-10,0);a.h=17;a.p.py+=17}catch(ib){}try{a=b[m]={w:0,h:0,py:0,p:b[k]};a.w=140;a.h=34;a.p.py+=34}catch(jb){}try{a=
b[n]={w:0,h:0,py:0,p:b[k]};a.w=150;a.h=34;a.p.py+=34}catch(kb){}try{a=b[o]={e:document.getElementById(Ja),w:0,h:0,py:0,p:b[k]};a.w=Math.max(a.p.w-10,0);a.e.style.height=40+$;a.e.style.top=Math.max(a.p.h-74,0)-a.p.py+$;a.h=40;a.p.py+=40}catch(lb){}try{a=b[v]={e:document.getElementById(Ea),w:0,h:0,py:0,p:b[o]};a.e.style.width=Math.min(185,Math.max((a.p.h-1)*0.8974,0)*5.2857)+$;a.e.style.left=Math.max((a.p.w-185)*0.503,0)+(185-Math.min(185,Math.max((a.p.h-1)*0.8974,0)*5.2857))*0.5+$;a.w=Math.min(185,
Math.max((a.p.h-1)*0.8974,0)*5.2857);a.e.style.height=Math.min(Math.max((a.p.h-1)*0.8974,0),2147483647,Math.min(185,Math.max((a.p.h-1)*0.8974,0)*5.2857)*0.1892)+$;a.e.style.lineHeight=Math.min(Math.max((a.p.h-1)*0.8974,0),2147483647,Math.min(185,Math.max((a.p.h-1)*0.8974,0)*5.2857)*0.1892)+$;a.e.style.top=1+(Math.max((a.p.h-1)*0.8974,0)-Math.min(Math.max((a.p.h-1)*0.8974,0),2147483647,Math.min(185,Math.max((a.p.h-1)*0.8974,0)*5.2857)*0.1892))*0.5-a.p.py+$;a.h=Math.min(Math.max((a.p.h-1)*0.8974,0),
2147483647,Math.min(185,Math.max((a.p.h-1)*0.8974,0)*5.2857)*0.1892);a.p.py+=Math.max(Math.min(Math.max((a.p.h-1)*0.8974,0),2147483647,Math.min(185,Math.max((a.p.h-1)*0.8974,0)*5.2857)*0.1892),0)}catch(mb){}try{a=b[w]={e:document.getElementById(Fa),w:0,h:0,py:0,p:b[o]};a.e.style.width=Math.min(32,Math.max((a.p.h-3)*0.8649,0))+$;a.e.style.left=Math.max((a.p.w-32)*0.0377,0)+(32-Math.min(32,Math.max((a.p.h-3)*0.8649,0)))*0.5+$;a.w=Math.min(32,Math.max((a.p.h-3)*0.8649,0));a.e.style.height=Math.min(Math.max((a.p.h-
3)*0.8649,0),32,Math.max((a.p.h-3)*0.8649,0))+$;a.e.style.lineHeight=Math.min(Math.max((a.p.h-3)*0.8649,0),32,Math.max((a.p.h-3)*0.8649,0))+$;a.e.style.top=3+(Math.max((a.p.h-3)*0.8649,0)-Math.min(Math.max((a.p.h-3)*0.8649,0),32,Math.max((a.p.h-3)*0.8649,0)))*0.5-a.p.py+$;a.h=Math.min(Math.max((a.p.h-3)*0.8649,0),32,Math.max((a.p.h-3)*0.8649,0));a.p.py+=Math.max(Math.min(Math.max((a.p.h-3)*0.8649,0),32,Math.max((a.p.h-3)*0.8649,0)),0)}catch(nb){}try{a=b[x]={e:document.getElementById(Ma),w:0,h:0,py:0,
p:b[o]};a.e.style.width=50+$;a.e.style.left=Math.max((a.p.w-50)*0.9767,0)+$;a.w=50;a.e.style.height=10+$;a.e.style.top=14-a.p.py+$;a.h=10;a.p.py+=10}catch(ob){}try{a=b[p]={e:document.getElementById(La),w:0,h:0,py:0,p:b[k]};a.w=140;a.e.style.height=34+$;a.e.style.top=192-a.p.py+$;a.h=34;a.p.py+=34}catch(pb){}try{a=b[q]={e:document.getElementById(Xa),w:0,h:0,py:0,p:b[k]};a.w=150;a.e.style.height=17+$;a.e.style.top=192-a.p.py+$;a.h=17;a.p.py+=17}catch(qb){}try{a=b[r]={e:document.getElementById(Ha),w:0,
h:0,py:0,p:b[k]};a.w=Math.max(a.p.w,0);a.e.style.height=Math.max((a.p.h-238)*0.644,0)+$;a.e.style.top=238-a.p.py+$;a.h=Math.max((a.p.h-238)*0.644,0);a.p.py+=Math.max(0,(a.p.h-238)*0.644)}catch(rb){}try{a=b[y]={e:document.getElementById(Ia),w:0,h:0,py:0,p:b[r]};a.conth=a.e.getAttribute(c);a.w=Math.max(a.p.w,0);a.e.style.height=(a.conth||Math.max(329,a.p.h))+$;a.e.style.top=0-a.p.py+$;a.h=a.conth||Math.max(329,a.p.h);a.p.py+=Math.max(a.conth||Math.max(329,a.p.h),0)}catch(sb){}try{a=b[z]={e:document.getElementById(Ga),
w:0,h:0,py:0,p:b[y]};a.e.style.width=Math.max(a.p.w,0)+$;a.e.style.left=0+$;a.w=Math.max(a.p.w,0);a.h=260;a.p.py+=260}catch(tb){}try{a=b[A]={w:0,h:0,py:0,p:b[z]};a.w=Math.max(a.p.w,0);a.h=20;a.p.py+=20}catch(ub){}try{a=b[B]={e:document.getElementById(na),w:0,h:0,py:0,p:b[A]};a.w=9;a.e.style.height=13+$;a.e.style.top=Math.max((a.p.h-13)*0.4286,0)-a.p.py+$;a.h=13;a.p.py+=13}catch(vb){}try{a=b[C]={e:document.getElementById(Za),w:0,h:0,py:0,p:b[A]};a.w=189;a.e.style.height=20+$;a.e.style.top=Math.max(a.p.h-
20,0)-a.p.py+$;a.h=20;a.p.py+=20}catch(wb){}try{a=b[D]={w:0,h:0,py:0,p:b[z]};a.w=Math.max(a.p.w,0);a.h=20;a.p.py+=20}catch(xb){}try{a=b[E]={e:document.getElementById(sa),w:0,h:0,py:0,p:b[D]};a.w=9;a.e.style.height=13+$;a.e.style.top=Math.max((a.p.h-13)*0.4286,0)-a.p.py+$;a.h=13;a.p.py+=13}catch(yb){}try{a=b[F]={e:document.getElementById(ab),w:0,h:0,py:0,p:b[D]};a.w=192;a.e.style.height=20+$;a.e.style.top=Math.max(a.p.h-20,0)-a.p.py+$;a.h=20;a.p.py+=20}catch(zb){}try{a=b[G]={w:0,h:0,py:0,p:b[z]};a.w=
Math.max(a.p.w,0);a.h=20;a.p.py+=20}catch(Ab){}try{a=b[H]={e:document.getElementById(ta),w:0,h:0,py:0,p:b[G]};a.w=9;a.e.style.height=13+$;a.e.style.top=Math.max((a.p.h-13)*0.4286,0)-a.p.py+$;a.h=13;a.p.py+=13}catch(Bb){}try{a=b[I]={e:document.getElementById(Na),w:0,h:0,py:0,p:b[G]};a.w=195;a.e.style.height=20+$;a.e.style.top=Math.max(a.p.h-20,0)-a.p.py+$;a.h=20;a.p.py+=20}catch(Cb){}try{a=b[J]={w:0,h:0,py:0,p:b[z]};a.w=Math.max(a.p.w,0);a.h=20;a.p.py+=20}catch(Db){}try{a=b[K]={e:document.getElementById(ua),
w:0,h:0,py:0,p:b[J]};a.w=9;a.e.style.height=13+$;a.e.style.top=Math.max((a.p.h-13)*0.4286,0)-a.p.py+$;a.h=13;a.p.py+=13}catch(Eb){}try{a=b[L]={e:document.getElementById(Oa),w:0,h:0,py:0,p:b[J]};a.w=243;a.e.style.height=20+$;a.e.style.top=Math.max(a.p.h-20,0)-a.p.py+$;a.h=20;a.p.py+=20}catch(Fb){}try{a=b[M]={w:0,h:0,py:0,p:b[z]};a.w=Math.max(a.p.w,0);a.h=20;a.p.py+=20}catch(Gb){}try{a=b[N]={e:document.getElementById(wa),w:0,h:0,py:0,p:b[M]};a.w=9;a.e.style.height=13+$;a.e.style.top=Math.max((a.p.h-
13)*0.4286,0)-a.p.py+$;a.h=13;a.p.py+=13}catch(Hb){}try{a=b[O]={e:document.getElementById(Pa),w:0,h:0,py:0,p:b[M]};a.w=141;a.e.style.height=20+$;a.e.style.top=Math.max(a.p.h-20,0)-a.p.py+$;a.h=20;a.p.py+=20}catch(Ib){}try{a=b[P]={w:0,h:0,py:0,p:b[z]};a.w=Math.max(a.p.w,0);a.h=20;a.p.py+=20}catch(Jb){}try{a=b[Q]={e:document.getElementById(va),w:0,h:0,py:0,p:b[P]};a.w=9;a.e.style.height=13+$;a.e.style.top=Math.max((a.p.h-13)*0.4286,0)-a.p.py+$;a.h=13;a.p.py+=13}catch(Kb){}try{a=b[R]={e:document.getElementById(Qa),
w:0,h:0,py:0,p:b[P]};a.w=138;a.e.style.height=20+$;a.e.style.top=Math.max(a.p.h-20,0)-a.p.py+$;a.h=20;a.p.py+=20}catch(Lb){}try{a=b[S]={w:0,h:0,py:0,p:b[z]};a.w=Math.max(a.p.w,0);a.h=20;a.p.py+=20}catch(Mb){}try{a=b[T]={e:document.getElementById(xa),w:0,h:0,py:0,p:b[S]};a.w=9;a.e.style.height=13+$;a.e.style.top=Math.max((a.p.h-13)*0.4286,0)-a.p.py+$;a.h=13;a.p.py+=13}catch(Nb){}try{a=b[aa]={e:document.getElementById(Ra),w:0,h:0,py:0,p:b[S]};a.w=151;a.e.style.height=20+$;a.e.style.top=Math.max(a.p.h-
20,0)-a.p.py+$;a.h=20;a.p.py+=20}catch(Ob){}try{a=b[U]={w:0,h:0,py:0,p:b[z]};a.w=Math.max(a.p.w,0);a.h=20;a.p.py+=20}catch(Pb){}try{a=b[ba]={e:document.getElementById(ya),w:0,h:0,py:0,p:b[U]};a.w=9;a.e.style.height=13+$;a.e.style.top=Math.max((a.p.h-13)*0.4286,0)-a.p.py+$;a.h=13;a.p.py+=13}catch(Qb){}try{a=b[ca]={e:document.getElementById(Sa),w:0,h:0,py:0,p:b[U]};a.w=230;a.e.style.height=20+$;a.e.style.top=Math.max(a.p.h-20,0)-a.p.py+$;a.h=20;a.p.py+=20}catch(Rb){}try{a=b[V]={w:0,h:0,py:0,p:b[z]};
a.w=Math.max(a.p.w,0);a.h=20;a.p.py+=20}catch(Sb){}try{a=b[da]={e:document.getElementById(za),w:0,h:0,py:0,p:b[V]};a.w=9;a.e.style.height=13+$;a.e.style.top=Math.max((a.p.h-13)*0.4286,0)-a.p.py+$;a.h=13;a.p.py+=13}catch(Tb){}try{a=b[ea]={e:document.getElementById(Ta),w:0,h:0,py:0,p:b[V]};a.w=221;a.e.style.height=20+$;a.e.style.top=Math.max(a.p.h-20,0)-a.p.py+$;a.h=20;a.p.py+=20}catch(Ub){}try{a=b[W]={w:0,h:0,py:0,p:b[z]};a.w=Math.max(a.p.w,0);a.h=20;a.p.py+=20}catch(Vb){}try{a=b[fa]={e:document.getElementById(oa),
w:0,h:0,py:0,p:b[W]};a.w=9;a.e.style.height=13+$;a.e.style.top=Math.max((a.p.h-13)*0.4286,0)-a.p.py+$;a.h=13;a.p.py+=13}catch(Wb){}try{a=b[ga]={e:document.getElementById(Ua),w:0,h:0,py:0,p:b[W]};a.w=217;a.e.style.height=20+$;a.e.style.top=Math.max(a.p.h-20,0)-a.p.py+$;a.h=20;a.p.py+=20}catch(Xb){}try{a=b[X]={w:0,h:0,py:0,p:b[z]};a.w=Math.max(a.p.w,0);a.h=20;a.p.py+=20}catch(Yb){}try{a=b[ha]={e:document.getElementById(pa),w:0,h:0,py:0,p:b[X]};a.w=9;a.e.style.height=13+$;a.e.style.top=Math.max((a.p.h-
13)*0.4286,0)-a.p.py+$;a.h=13;a.p.py+=13}catch(Zb){}try{a=b[ia]={e:document.getElementById(Va),w:0,h:0,py:0,p:b[X]};a.w=154;a.e.style.height=20+$;a.e.style.top=Math.max(a.p.h-20,0)-a.p.py+$;a.h=20;a.p.py+=20}catch($b){}try{a=b[Y]={w:0,h:0,py:0,p:b[z]};a.w=Math.max(a.p.w,0);a.h=20;a.p.py+=20}catch(ac){}try{a=b[ja]={e:document.getElementById(qa),w:0,h:0,py:0,p:b[Y]};a.w=9;a.e.style.height=13+$;a.e.style.top=Math.max((a.p.h-13)*0.4286,0)-a.p.py+$;a.h=13;a.p.py+=13}catch(bc){}try{a=b[ka]={e:document.getElementById(Wa),
w:0,h:0,py:0,p:b[Y]};a.w=142;a.e.style.height=20+$;a.e.style.top=Math.max(a.p.h-20,0)-a.p.py+$;a.h=20;a.p.py+=20}catch(cc){}try{a=b[Z]={w:0,h:0,py:0,p:b[z]};a.w=Math.max(a.p.w,0);a.h=20;a.p.py+=20}catch(dc){}try{a=b[la]={e:document.getElementById(ra),w:0,h:0,py:0,p:b[Z]};a.w=9;a.e.style.height=13+$;a.e.style.top=Math.max((a.p.h-13)*0.4286,0)-a.p.py+$;a.h=13;a.p.py+=13}catch(ec){}try{a=b[ma]={e:document.getElementById(Ya),w:0,h:0,py:0,p:b[Z]};a.w=162;a.e.style.height=20+$;a.e.style.top=Math.max(a.p.h-
20,0)-a.p.py+$;a.h=20;a.p.py+=20}catch(fc){}try{a=b[s]={e:document.getElementById(bb),w:0,h:0,py:0,p:b[k]};a.w=Math.max(a.p.w,0);a.e.style.height=33+$;a.e.style.top=Math.max(a.p.h-33,0)-a.p.py+$;a.h=33;a.p.py+=33}catch(gc){}try{a=b[d]={e:document.getElementById(Aa),w:0,h:0,py:0,p:b[s]};a.e.style.width=100+$;a.e.style.left=Math.max((a.p.w-100)*0.9615,0)+$;a.w=100;a.h=29;a.p.py+=29}catch(hc){}try{a=b[e]={e:document.getElementById(Ba),w:0,h:0,py:0,p:b[s]};a.e.style.width=120+$;a.e.style.left=Math.max((a.p.w-
120)*0.5,0)+$;a.w=120;a.h=29;a.p.py+=29}catch(ic){}try{a=b[f]={e:document.getElementById(Ca),w:0,h:0,py:0,p:b[s]};a.e.style.width=100+$;a.e.style.left=Math.max((a.p.w-100)*0.0385,0)+$;a.w=100;a.h=29;a.p.py+=29}catch(jc){}try{a=b[t]={e:document.getElementById(Ka),w:0,h:0,py:0,p:b[k]};a.e.style.width=320+$;a.e.style.left=Math.max((a.p.w-320)*0.5,0)+$;a.w=320;a.e.style.height=81+$;a.e.style.top=0-a.p.py+$;a.h=81;a.p.py+=81}catch(kc){}try{a=b[g]={w:0,h:0,py:0,p:b[t]};a.w=73;a.h=73;a.p.py+=73}catch(lc){}try{a=
b[h]={e:document.getElementById(Da),w:0,h:0,py:0,p:b[g]};a.e.style.width=Math.min(72,Math.max(a.p.h-1,0))+$;a.e.style.left=Math.max((a.p.w-72)*0,0)+(72-Math.min(72,Math.max(a.p.h-1,0)))*0.5+$;a.w=Math.min(72,Math.max(a.p.h-1,0));a.e.style.height=Math.min(Math.max(a.p.h-1,0),72,Math.max(a.p.h-1,0))+$;a.e.style.lineHeight=Math.min(Math.max(a.p.h-1,0),72,Math.max(a.p.h-1,0))+$;a.e.style.top=1+(Math.max(a.p.h-1,0)-Math.min(Math.max(a.p.h-1,0),72,Math.max(a.p.h-1,0)))*0.5-a.p.py+$;a.h=Math.min(Math.max(a.p.h-
1,0),72,Math.max(a.p.h-1,0));a.p.py+=Math.max(Math.min(Math.max(a.p.h-1,0),72,Math.max(a.p.h-1,0)),0)}catch(mc){}try{a=b[u]={e:document.getElementById(cb),w:0,h:0,py:0,p:b[k]};a.w=0;a.e.style.height=0+$;a.e.style.top=-3E3-a.p.py+$;a.h=0;a.p.py+=0}catch(nc){}};})();


(function() {var b="data-layout-content-height";var d="e107";var e="e108";var f="e109";var g="e110";var h="e111";var i="e112";var j="e113";var k="e114";var l="e115";var m="e116";var n="e117";var o="e118";var p="e119";var q="e120";var r="e123";var s="e124";var t="m1-IsolaSaviano_Dove_Siamo-btnDoveSiamo";var u="m1-IsolaSaviano_Dove_Siamo-btnHome";var v="m1-IsolaSaviano_Dove_Siamo-btnInformazioni";var w="m1-IsolaSaviano_Dove_Siamo-image1";var x="m1-IsolaSaviano_Dove_Siamo-image2";var y="m1-IsolaSaviano_Dove_Siamo-image3";
var z="m1-IsolaSaviano_Dove_Siamo-map1";var A="m1-IsolaSaviano_Dove_Siamo-map1outer";var B="m1-IsolaSaviano_Dove_Siamo-panel3";var C="m1-IsolaSaviano_Dove_Siamo-panel4";var D="m1-IsolaSaviano_Dove_Siamo-text1";var E="m1-IsolaSaviano_Dove_Siamo-toolbar1";var F="px";
m1Design._resizing["IsolaSaviano_Dove_Siamo"]=function(G,H){var a;var c={};var I;a=c[g]={w:G,h:H,py:0};try{a=c[d]={w:0,h:0,py:0,p:c[g]};a.w=Math.max(a.p.w-10,0);a.h=21;a.p.py+=21}catch(J){}try{a=c[e]={w:0,h:0,py:0,p:c[g]};a.w=Math.max(a.p.w-10,0);a.h=17;a.p.py+=17}catch(K){}try{a=c[f]={e:document.getElementById(A),w:0,h:0,py:0,p:c[g]};a.e.style.width=Math.max(a.p.w,0)+F;a.e.style.left=Math.max(a.p.w*0,0)+F;a.w=Math.max(a.p.w,0);a.e.style.height=Math.max(a.p.h-228,0)+F;a.e.style.top=140-a.p.py+F;a.h=
Math.max(a.p.h-228,0);a.p.py+=Math.max(2,a.p.h-228)}catch(L){}try{a=c[k]={e:document.getElementById(z),w:0,h:0,py:0,p:c[f]};a.conth=a.e.getAttribute(b);a.w=Math.max(a.p.w-2,0);a.e.style.height=(a.conth||(-1<Math.max(a.p.h-2,0)?Math.max(a.p.h-2,0):Math.max(331,a.p.h-2)))+F;a.e.style.top=0-a.p.py+F;a.h=a.conth||(-1<Math.max(a.p.h-2,0)?Math.max(a.p.h-2,0):Math.max(331,a.p.h-2));a.p.py+=Math.max(a.conth||(-1<Math.max(a.p.h-2,0)?Math.max(a.p.h-2,0):Math.max(331,a.p.h-2)),0)}catch(M){}try{a=c[h]={e:document.getElementById(B),
w:0,h:0,py:0,p:c[g]};a.w=Math.max(a.p.w-10,0);a.e.style.height=40+F;a.e.style.top=Math.max(a.p.h-74,0)-a.p.py+F;a.h=40;a.p.py+=40}catch(N){}try{a=c[l]={e:document.getElementById(x),w:0,h:0,py:0,p:c[h]};a.e.style.width=Math.min(185,Math.max((a.p.h-1)*0.8974,0)*5.2857)+F;a.e.style.left=Math.max((a.p.w-185)*0.503,0)+(185-Math.min(185,Math.max((a.p.h-1)*0.8974,0)*5.2857))*0.5+F;a.w=Math.min(185,Math.max((a.p.h-1)*0.8974,0)*5.2857);a.e.style.height=Math.min(Math.max((a.p.h-1)*0.8974,0),2147483647,Math.min(185,
Math.max((a.p.h-1)*0.8974,0)*5.2857)*0.1892)+F;a.e.style.lineHeight=Math.min(Math.max((a.p.h-1)*0.8974,0),2147483647,Math.min(185,Math.max((a.p.h-1)*0.8974,0)*5.2857)*0.1892)+F;a.e.style.top=1+(Math.max((a.p.h-1)*0.8974,0)-Math.min(Math.max((a.p.h-1)*0.8974,0),2147483647,Math.min(185,Math.max((a.p.h-1)*0.8974,0)*5.2857)*0.1892))*0.5-a.p.py+F;a.h=Math.min(Math.max((a.p.h-1)*0.8974,0),2147483647,Math.min(185,Math.max((a.p.h-1)*0.8974,0)*5.2857)*0.1892);a.p.py+=Math.max(Math.min(Math.max((a.p.h-1)*0.8974,
0),2147483647,Math.min(185,Math.max((a.p.h-1)*0.8974,0)*5.2857)*0.1892),0)}catch(O){}try{a=c[m]={e:document.getElementById(y),w:0,h:0,py:0,p:c[h]};a.e.style.width=Math.min(32,Math.max((a.p.h-3)*0.8649,0))+F;a.e.style.left=Math.max((a.p.w-32)*0.0377,0)+(32-Math.min(32,Math.max((a.p.h-3)*0.8649,0)))*0.5+F;a.w=Math.min(32,Math.max((a.p.h-3)*0.8649,0));a.e.style.height=Math.min(Math.max((a.p.h-3)*0.8649,0),32,Math.max((a.p.h-3)*0.8649,0))+F;a.e.style.lineHeight=Math.min(Math.max((a.p.h-3)*0.8649,0),32,
Math.max((a.p.h-3)*0.8649,0))+F;a.e.style.top=3+(Math.max((a.p.h-3)*0.8649,0)-Math.min(Math.max((a.p.h-3)*0.8649,0),32,Math.max((a.p.h-3)*0.8649,0)))*0.5-a.p.py+F;a.h=Math.min(Math.max((a.p.h-3)*0.8649,0),32,Math.max((a.p.h-3)*0.8649,0));a.p.py+=Math.max(Math.min(Math.max((a.p.h-3)*0.8649,0),32,Math.max((a.p.h-3)*0.8649,0)),0)}catch(P){}try{a=c[n]={e:document.getElementById(D),w:0,h:0,py:0,p:c[h]};a.e.style.width=50+F;a.e.style.left=Math.max((a.p.w-50)*0.9767,0)+F;a.w=50;a.e.style.height=10+F;a.e.style.top=
14-a.p.py+F;a.h=10;a.p.py+=10}catch(Q){}try{a=c[i]={e:document.getElementById(E),w:0,h:0,py:0,p:c[g]};a.w=Math.max(a.p.w,0);a.e.style.height=33+F;a.e.style.top=Math.max(a.p.h-33,0)-a.p.py+F;a.h=33;a.p.py+=33}catch(R){}try{a=c[o]={e:document.getElementById(t),w:0,h:0,py:0,p:c[i]};a.e.style.width=100+F;a.e.style.left=Math.max((a.p.w-100)*0.9615,0)+F;a.w=100;a.h=29;a.p.py+=29}catch(S){}try{a=c[p]={e:document.getElementById(u),w:0,h:0,py:0,p:c[i]};a.e.style.width=120+F;a.e.style.left=Math.max((a.p.w-
120)*0.5,0)+F;a.w=120;a.h=29;a.p.py+=29}catch(T){}try{a=c[q]={e:document.getElementById(v),w:0,h:0,py:0,p:c[i]};a.e.style.width=100+F;a.e.style.left=Math.max((a.p.w-100)*0.0385,0)+F;a.w=100;a.h=29;a.p.py+=29}catch(U){}try{a=c[j]={e:document.getElementById(C),w:0,h:0,py:0,p:c[g]};a.e.style.width=320+F;a.e.style.left=Math.max((a.p.w-320)*0.5,0)+F;a.w=320;a.e.style.height=81+F;a.e.style.top=0-a.p.py+F;a.h=81;a.p.py+=81}catch(V){}try{a=c[r]={w:0,h:0,py:0,p:c[j]};a.w=73;a.h=73;a.p.py+=73}catch(W){}try{a=
c[s]={e:document.getElementById(w),w:0,h:0,py:0,p:c[r]};a.e.style.width=Math.min(72,Math.max(a.p.h-1,0))+F;a.e.style.left=(72-Math.min(72,Math.max(a.p.h-1,0)))*0.5+F;a.w=Math.min(72,Math.max(a.p.h-1,0));a.e.style.height=Math.min(Math.max(a.p.h-1,0),72,Math.max(a.p.h-1,0))+F;a.e.style.lineHeight=Math.min(Math.max(a.p.h-1,0),72,Math.max(a.p.h-1,0))+F;a.e.style.top=1+(Math.max(a.p.h-1,0)-Math.min(Math.max(a.p.h-1,0),72,Math.max(a.p.h-1,0)))*0.5-a.p.py+F;a.h=Math.min(Math.max(a.p.h-1,0),72,Math.max(a.p.h-
1,0));a.p.py+=Math.max(Math.min(Math.max(a.p.h-1,0),72,Math.max(a.p.h-1,0)),0)}catch(X){}};})();

var m1Design = function() { m1Design = {}; (function() {var b="IsolaSaviano";var e="IsolaSaviano_Dove_Siamo";var g="IsolaSaviano_Dove_Siamo.html";var h="IsolaSaviano_Info";var i="IsolaSaviano_Info.html";var j="e0";var k="e1";var l="e10";var m="e11";var n="e12";var o="e13";var p="e14";var q="e15";var r="e16";var s="e17";var t="e18";var u="e19";var v="e2";var w="e20";var x="e21";var y="e22";var z="e23";var A="e9";var B="m1-";var C="m1-IsolaSaviano-btnDoveSiamo";var D="m1-IsolaSaviano-btnHome";var E="m1-IsolaSaviano-btnInformazioni";var F="m1-IsolaSaviano-image1";
var G="m1-IsolaSaviano-image2";var H="m1-IsolaSaviano-image3";var I="m1-IsolaSaviano-panel1";var J="m1-IsolaSaviano-panel3";var K="m1-IsolaSaviano-panel4";var L="m1-IsolaSaviano-panel5";var M="m1-IsolaSaviano-text10";var N="m1-IsolaSaviano-toolbar1";var O="m1-images-preloader";var P="px";var Q=function(d){return B+d};
var R={"IsolaSaviano":{"id":b,"anchor_id":"#m1-IsolaSaviano","resize":function(d,f){var a;var c={};var S;a=c[v]={w:d,h:f,py:0};a=c[k]={w:d,h:f,py:0};try{a=c[j]={e:document.getElementById(I),w:0,h:0,py:0,p:c[k]};a.e.style.width=304+P;a.e.style.left=Math.max((a.p.w-304)*0.5,0)+P;a.w=304;a.h=118;a.p.py+=118}catch(T){}try{a=c[A]={w:0,h:0,py:0,p:c[k]};a.w=Math.max(a.p.w-10,0);a.h=17;a.p.py+=17}catch(U){}try{a=c[l]={e:document.getElementById(J),w:0,h:0,py:0,p:c[k]};a.w=Math.max(a.p.w-10,0);a.e.style.height=
39+P;a.e.style.top=Math.max(a.p.h-74,0)-a.p.py+P;a.h=39;a.p.py+=39}catch(V){}try{a=c[r]={e:document.getElementById(G),w:0,h:0,py:0,p:c[l]};a.e.style.width=Math.min(185,Math.max((a.p.h-1)*0.9211,0)*5.2857)+P;a.e.style.left=Math.max((a.p.w-185)*0.503,0)+(185-Math.min(185,Math.max((a.p.h-1)*0.9211,0)*5.2857))*0.5+P;a.w=Math.min(185,Math.max((a.p.h-1)*0.9211,0)*5.2857);a.e.style.height=Math.min(Math.max((a.p.h-1)*0.9211,0),2147483647,Math.min(185,Math.max((a.p.h-1)*0.9211,0)*5.2857)*0.1892)+P;a.e.style.lineHeight=
Math.min(Math.max((a.p.h-1)*0.9211,0),2147483647,Math.min(185,Math.max((a.p.h-1)*0.9211,0)*5.2857)*0.1892)+P;a.e.style.top=1+(Math.max((a.p.h-1)*0.9211,0)-Math.min(Math.max((a.p.h-1)*0.9211,0),2147483647,Math.min(185,Math.max((a.p.h-1)*0.9211,0)*5.2857)*0.1892))*0.5-a.p.py+P;a.h=Math.min(Math.max((a.p.h-1)*0.9211,0),2147483647,Math.min(185,Math.max((a.p.h-1)*0.9211,0)*5.2857)*0.1892);a.p.py+=Math.max(Math.min(Math.max((a.p.h-1)*0.9211,0),2147483647,Math.min(185,Math.max((a.p.h-1)*0.9211,0)*5.2857)*
0.1892),0)}catch(W){}try{a=c[s]={e:document.getElementById(H),w:0,h:0,py:0,p:c[l]};a.e.style.width=Math.min(32,Math.max((a.p.h-3)*0.8889,0))+P;a.e.style.left=Math.max((a.p.w-32)*0.0377,0)+(32-Math.min(32,Math.max((a.p.h-3)*0.8889,0)))*0.5+P;a.w=Math.min(32,Math.max((a.p.h-3)*0.8889,0));a.e.style.height=Math.min(Math.max((a.p.h-3)*0.8889,0),32,Math.max((a.p.h-3)*0.8889,0))+P;a.e.style.lineHeight=Math.min(Math.max((a.p.h-3)*0.8889,0),32,Math.max((a.p.h-3)*0.8889,0))+P;a.e.style.top=3+(Math.max((a.p.h-
3)*0.8889,0)-Math.min(Math.max((a.p.h-3)*0.8889,0),32,Math.max((a.p.h-3)*0.8889,0)))*0.5-a.p.py+P;a.h=Math.min(Math.max((a.p.h-3)*0.8889,0),32,Math.max((a.p.h-3)*0.8889,0));a.p.py+=Math.max(Math.min(Math.max((a.p.h-3)*0.8889,0),32,Math.max((a.p.h-3)*0.8889,0)),0)}catch(X){}try{a=c[t]={e:document.getElementById(M),w:0,h:0,py:0,p:c[l]};a.e.style.width=50+P;a.e.style.left=Math.max((a.p.w-50)*0.9767,0)+P;a.w=50;a.e.style.height=10+P;a.e.style.top=14-a.p.py+P;a.h=10;a.p.py+=10}catch(Y){}try{a=c[m]={e:document.getElementById(N),
w:0,h:0,py:0,p:c[k]};a.w=Math.max(a.p.w,0);a.e.style.height=33+P;a.e.style.top=Math.max(a.p.h-33,0)-a.p.py+P;a.h=33;a.p.py+=33}catch(Z){}try{a=c[u]={e:document.getElementById(C),w:0,h:0,py:0,p:c[m]};a.e.style.width=100+P;a.e.style.left=Math.max((a.p.w-100)*0.9615,0)+P;a.w=100;a.h=29;a.p.py+=29}catch($){}try{a=c[w]={e:document.getElementById(D),w:0,h:0,py:0,p:c[m]};a.e.style.width=120+P;a.e.style.left=Math.max((a.p.w-120)*0.5,0)+P;a.w=120;a.h=29;a.p.py+=29}catch(aa){}try{a=c[x]={e:document.getElementById(E),
w:0,h:0,py:0,p:c[m]};a.e.style.width=100+P;a.e.style.left=Math.max((a.p.w-100)*0.0385,0)+P;a.w=100;a.h=29;a.p.py+=29}catch(ba){}try{a=c[n]={e:document.getElementById(K),w:0,h:0,py:0,p:c[k]};a.e.style.width=320+P;a.e.style.left=Math.max((a.p.w-320)*0.5,0)+P;a.w=320;a.e.style.height=81+P;a.e.style.top=0-a.p.py+P;a.h=81;a.p.py+=81}catch(ca){}try{a=c[y]={w:0,h:0,py:0,p:c[n]};a.w=73;a.h=73;a.p.py+=73}catch(da){}try{a=c[z]={e:document.getElementById(F),w:0,h:0,py:0,p:c[y]};a.e.style.width=Math.min(72,Math.max(a.p.h-
1,0))+P;a.e.style.left=(72-Math.min(72,Math.max(a.p.h-1,0)))*0.5+P;a.w=Math.min(72,Math.max(a.p.h-1,0));a.e.style.height=Math.min(Math.max(a.p.h-1,0),72,Math.max(a.p.h-1,0))+P;a.e.style.lineHeight=Math.min(Math.max(a.p.h-1,0),72,Math.max(a.p.h-1,0))+P;a.e.style.top=1+(Math.max(a.p.h-1,0)-Math.min(Math.max(a.p.h-1,0),72,Math.max(a.p.h-1,0)))*0.5-a.p.py+P;a.h=Math.min(Math.max(a.p.h-1,0),72,Math.max(a.p.h-1,0));a.p.py+=Math.max(Math.min(Math.max(a.p.h-1,0),72,Math.max(a.p.h-1,0)),0)}catch(ea){}try{a=
c[o]={e:document.getElementById(L),w:0,h:0,py:0,p:c[k]};a.e.style.width=320+P;a.e.style.left=Math.max((a.p.w-320)*0.5,0)+P;a.w=320;a.e.style.height=151+P;a.e.style.top=82-a.p.py+P;a.h=151;a.p.py+=151}catch(fa){}a=c[p]={w:d,h:f,py:0};try{a=c[q]={e:document.getElementById(O),w:0,h:0,py:0,p:c[k]};a.w=0;a.e.style.height=0+P;a.e.style.top=-3E3-a.p.py+P;a.h=0;a.p.py+=0}catch(ga){}}},"IsolaSaviano_Info":{"id":h,"anchor_id":"#m1-IsolaSaviano_Info","html_url":function(){return i},"resize":function(d,f){m1Design._resizing[h](d,
f)}},"IsolaSaviano_Dove_Siamo":{"id":e,"anchor_id":"#m1-IsolaSaviano_Dove_Siamo","html_url":function(){return g},"resize":function(d,f){m1Design._resizing[e](d,f)}}};m1Design["css"]=Q;m1Design["pages"]=R;m1Design["_resizing"]={};m1Design["softSpinnerEnabled"]=true;m1Design["shouldHideAddressBar"]=true;m1Design["root"]=function(){return b};})(); return m1Design; }();m1Design['actions']={'action3':function() { phoneui.gotoPage('m1-IsolaSaviano', 'SLIDE_DOWN');
; },'action2':function() { phoneui.gotoPage('m1-IsolaSaviano_Dove_Siamo', 'SLIDE_RIGHT');
; },'action7':function() { phoneui.gotoPage('m1-IsolaSaviano_Info', 'SLIDE_LEFT');
; },'action9':function() { phoneui.resetForm('m1_IsolaSaviano'); phoneui.submitForm('m1_IsolaSaviano');
; },'action0':function() { phoneui.showURL('http://www.dynamic-id.it', '_blank', {});
; },'action1':function() { phoneui.showURL('mailto:info@dynamic-id.it', '_self', {});
; },'action8':function() { phoneui.submitForm('m1_IsolaSaviano');
; },'action14':function() { var ex; try { eval('phoneui.submitForm(\'m1_IsolaSaviano\');'); } catch (ex) { console.log(ex); };
; }};m1Design['actions']['action13']=m1Design['actions']['action7'];m1Design['actions']['action15']=m1Design['actions']['action8'];m1Design['actions']['action6']=m1Design['actions']['action3'];m1Design['actions']['action12']=m1Design['actions']['action2'];m1Design['actions']['action5']=m1Design['actions']['action11']=m1Design['actions']['action1'];m1Design['actions']['action4']=m1Design['actions']['action10']=m1Design['actions']['action0']


//Load stylesheet
phoneui.loadCssAsync('IsolaSaviano_Dove_Siamo.css', function() {
  //Load resizing javascript
  phoneui.loadJsAsync('IsolaSaviano_Dove_Siamo.js', function() {
    phoneui._loadingJSDone([{'id' : 'IsolaSaviano_Dove_Siamo', 'anchor_id' : '#m1-IsolaSaviano_Dove_Siamo', 'html_url' : function() { return 'IsolaSaviano_Dove_Siamo.html'; }, 'resize' : function(x, y) {m1Design._resizing['IsolaSaviano_Dove_Siamo'](x,y);}}]);
  });
});


//Load stylesheet
phoneui.loadCssAsync('IsolaSaviano_Info.css', function() {
  //Load resizing javascript
  phoneui.loadJsAsync('IsolaSaviano_Info.js', function() {
    phoneui._loadingJSDone([{'id' : 'IsolaSaviano_Info', 'anchor_id' : '#m1-IsolaSaviano_Info', 'html_url' : function() { return 'IsolaSaviano_Info.html'; }, 'resize' : function(x, y) {m1Design._resizing['IsolaSaviano_Info'](x,y);}}]);
  });
});
