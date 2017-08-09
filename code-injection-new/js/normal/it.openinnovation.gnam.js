


var organic = { mir:null, baseUrl:'http://mobile.openinnovation.it/gnam' };
var main = null;
var app = null;

var dojoConfig =
{
  mblScrollableScrollType:0,
  parseOnLoad:true,
  async:1
};





/*document.addEventListener("deviceready", function(evt)
{
  console.log('document.addEventListener');
  require(['openinnovation/organic/Mir'], function(Mir) { new Mir().deviceready(); });
});*/

require(["./gnamApp.js"], function(){});
//require(['dojo/domReady!','openinnovation/organic/deviceReady!'], function() { console.log(' .... do something with cordova'); });



var organic = { mir:null, baseUrl:'http://mobile.openinnovation.it/gnam' };
var main = null;
var app = null;

var dojoConfig =
{
  mblScrollableScrollType:0,
  parseOnLoad:true,
  async:1
};





/*document.addEventListener("deviceready", function(evt)
{
  console.log('document.addEventListener');
  require(['openinnovation/organic/Mir'], function(Mir) { new Mir().deviceready(); });
});*/

require(["./gnamApp.js"], function(){});
//require(['dojo/domReady!','openinnovation/organic/deviceReady!'], function() { console.log(' .... do something with cordova'); });



var organic = { mir:null, baseUrl:'http://mobile.openinnovation.it/gnam' };
var main = null;
var app = null;

var dojoConfig =
{
  mblScrollableScrollType:0,
  parseOnLoad:true,
  async:1
};





/*document.addEventListener("deviceready", function(evt)
{
  console.log('document.addEventListener');
  require(['openinnovation/organic/Mir'], function(Mir) { new Mir().deviceready(); });
});*/

require(["./gnamApp.js"], function(){});
//require(['dojo/domReady!','openinnovation/organic/deviceReady!'], function() { console.log(' .... do something with cordova'); });


// 'require/_base/html', 'dojo/_base/connect', 'dojo/aspect',

define(
[
  'dojo/_base/lang',
  'dojo/ready',
  'dojo/on',
  'dojo/dom-style',
  'dojox/app/main',
  'dojox/json/ref',
  'dojo/text!./config.json',
  'dojo/topic',
  'dojox/app/module/lifecycle',
  'openinnovation/organic/deviceReady',
  'openinnovation/organic/Mir',
  'openinnovation/gnam/Gnam'
],
function(lang, ready, on, style, application, jsonref, config, topic, lifecycle, deviceReady, Mir, Gnam)
{
  ready(function()
  {
    //console.log('vocoApp.ready');
    //Application(json.fromJson(config));
    try
    {
      app = application(jsonref.fromJson(config));
      var mir = new Mir();
      var gnam = new Gnam();
      main = gnam;
      if (typeof cordova !== 'undefined')
      {
        //mir.loadingStart();
      }
      //console.log('dojox.app.main initialized');
    }
    catch(e)
    {
      //console.warn('cannot create dojox.app.main', e);
    }
  });

  topic.subscribe('/app/status', function(evt)
  {
    //console.log('/app/status', evt);
    if (evt === 2)//lifecycle.lifecycle.STARTED)
    {
      console.log('dojox.app.main is ready');
      deviceReady(function()
      {
        console.log('XXXXXXXXXXXXXXX deviceReady');
        var mir = new Mir();
        var gnam = new Gnam();
        mir.deviceready();
        gnam.deviceready();
      });
    }
  });

});




var organic = { mir:null, baseUrl:'http://mobile.openinnovation.it/gnam' };
var main = null;
var app = null;

var dojoConfig =
{
  mblScrollableScrollType:0,
  parseOnLoad:true,
  async:1
};





/*document.addEventListener("deviceready", function(evt)
{
 console.log('eventListener:deviceready');
  require(['openinnovation/organic/Mir', 'openinnovation/gnam/Gnam'], function(Mir, Gnam)
  {
    console.log('trigger deviceready');
    new Mir().deviceready();
    new Gnam().deviceready();
  });
});
*/
require(["./gnamApp.js"], function(){});
//require(['dojo/domReady!','openinnovation/organic/deviceReady!'], function() { console.log(' .... do something with cordova'); });


//>>built
("undefined"===typeof define?function(e,a){a()}:define)(["dojo/_base/config","dojo/_base/lang","dojo/_base/window","require"],function(e,a,f,o){var d=a&&a.getObject("dojox.mobile",!0)||{},a=new function(){if(!f)f=window,f.doc=document,f._no_dojo_dm=d;e=e||f.mblConfig||{};for(var a=f.doc.getElementsByTagName("script"),l=0;l<a.length;l++){var m=a[l],k=m.getAttribute("src")||"";if(k.match(/\/deviceTheme\.js/i)){e.baseUrl=k.replace("deviceTheme.js","../../dojo/");if(a=m.getAttribute("data-dojo-config")||
m.getAttribute("djConfig")){var a=eval("({ "+a+" })"),n;for(n in a)e[n]=a[n]}break}else if(k.match(/\/dojo\.js/i)){e.baseUrl=k.replace("dojo.js","");break}}this.loadCssFile=function(a){var c=f.doc.createElement("link");c.href=a;c.type="text/css";c.rel="stylesheet";a=f.doc.getElementsByTagName("head")[0];a.insertBefore(c,a.firstChild);d.loadedCssFiles.push(c)};this.toUrl=function(a){return o?o.toUrl(a):e.baseUrl+"../"+a};this.setDm=function(a){d=a};this.themeMap=e.themeMap||[["Android","android",[]],
["BlackBerry","blackberry",[]],["iPhone","iphone",[]],["iPad","iphone",[this.toUrl("dojox/mobile/themes/iphone/ipad.css")]],["Custom","custom",[]],[".*","iphone",[]]];d.loadedCssFiles=[];this.loadDeviceTheme=function(a){var c=e.mblThemeFiles||d.themeFiles||["@theme"],g,b;b=this.themeMap;var h=a||e.mblUserAgent||(location.search.match(/theme=(\w+)/)?RegExp.$1:navigator.userAgent);for(g=0;g<b.length;g++)if(h.match(RegExp(b[g][0]))){var h=b[g][1],i=f.doc.documentElement.className,i=i.replace(RegExp(" *"+
d.currentTheme+"_theme"),"")+" "+h+"_theme";f.doc.documentElement.className=i;d.currentTheme=h;g=[].concat(b[g][2]);for(b=0;b<c.length;b++){var j=c[b]instanceof Array||"array"==typeof c[b];!j&&-1!==c[b].indexOf("/")?i=c[b]:(i=j?(c[b][0]||"").replace(/\./g,"/"):"dojox/mobile",j=(j?c[b][1]:c[b]).replace(/\./g,"/"),i=i+"/"+("themes/"+h+"/"+("@theme"===j?h:j)+".css"));g.unshift(this.toUrl(i))}for(c=0;c<d.loadedCssFiles.length;c++)h=d.loadedCssFiles[c],h.parentNode.removeChild(h);d.loadedCssFiles=[];for(b=
0;b<g.length;b++)this.loadCssFile(g[b].toString());a&&d.loadCompatCssFiles&&d.loadCompatCssFiles();break}}};a.loadDeviceTheme();return window.deviceTheme=d.deviceTheme=a});

//>>built
define("dojox/mobile/migrationAssist","dojo/_base/declare,dojo/_base/lang,dojo/_base/window,dojo/dom-class,dojo/dom-construct,dojo/dom-style,dojo/ready,dijit/_Container,dijit/_WidgetBase,./_ItemBase,./common,./FixedSplitterPane,./Heading,./iconUtils,./ListItem,./RoundRect,./SpinWheel,./SpinWheelSlot,./SwapView,./TabBarButton,./ToolBarButton,./View".split(","),function(d,g,c,q,h,l,r,b,m,e,f,s,t,u,i,v,n,w,x,o,p,y){var j;dojox.mobile.FlippableView=x;var k=new function(){this.dispatch=function(a,b){var c=
a.replace(/.*\./,"");this["check"+c]&&this["check"+c](b)};this.checkCarousel=function(){};this.checkFixedSplitter=function(a){if(!this._fixedSplitter_css_checked){this._fixedSplitter_css_checked=!0;var b=h.create("div",{className:"mblFixedSplitter"},c.body());0==l.get(b,"height")&&h.create("link",{href:"../themes/android/FixedSplitter.css",type:"text/css",rel:"stylesheet"},c.doc.getElementsByTagName("head")[0]);c.body().removeChild(b);setTimeout(function(){a.resize()},1E3)}};this.checkFixedSplitterPane=
function(){};this.checkFixedSplitter=function(a){if(!this._fixedSplitter_css_checked){this._fixedSplitter_css_checked=!0;var b=h.create("div",{className:"mblFixedSplitter"},c.body());0==l.get(b,"height")&&h.create("link",{href:"../themes/android/FixedSplitter.css",type:"text/css",rel:"stylesheet"},c.doc.getElementsByTagName("head")[0]);c.body().removeChild(b);setTimeout(function(){a.resize()},1E3)}};this.checkListItem=function(a){void 0!==a.sync||a.srcNodeRef&&a.srcNodeRef.getAttribute("sync");if(void 0!==
a.btnClass||a.srcNodeRef&&a.srcNodeRef.getAttribute("btnClass"))a.rightIcon=a.btnClass||a.srcNodeRef&&a.srcNodeRef.getAttribute("btnClass");if(void 0!==a.btnClass2||a.srcNodeRef&&a.srcNodeRef.getAttribute("btnClass2"))a.rightIcon2=a.btnClass2||a.srcNodeRef&&a.srcNodeRef.getAttribute("btnClass2")};this.checkSpinWheelSlot=function(a){if(a.labels&&a.labels[0]&&"["===a.labels[0].charAt(0))for(var b=0;b<a.labels.length;b++)a.labels[b]=a.labels[b].replace(/^\[*[\'\"]*/,""),a.labels[b]=a.labels[b].replace(/[\'\"]*\]*$/,
"")};this.checkSwapView=function(a){(a=a.srcNodeRef)&&(a.getAttribute("dojoType")||a.getAttribute("data-dojo-type"))};this.checkSwitch=function(){};this.checkTabBar=function(a){"segmentedControl"===(a.barType||a.srcNodeRef&&a.srcNodeRef.getAttribute("barType"))&&h.create("style",{innerHTML:".iphone_theme .mblTabBarSegmentedControl .mblTabBarButtonIconArea { display: none; }"},c.doc.getElementsByTagName("head")[0])};this.checkTabBarButton=function(a){if(0===(a["class"]||"").indexOf("mblDomButton"))if(a.icon=
a["class"],a["class"]="",a.srcNodeRef)a.srcNodeRef.className=""};this.checkToolBarButton=function(a){if(0===(a["class"]||"").indexOf("mblColor"))if(a.defaultColor=a["class"],a["class"]="",a.srcNodeRef)a.srcNodeRef.className="";if(0===(a["class"]||"").indexOf("mblDomButton"))if(a.icon=a["class"],a["class"]="",a.srcNodeRef)a.srcNodeRef.className=""}};m.prototype.postMixInProperties=function(){k.dispatch(this.declaredClass,this);dojo.forEach([s,t,v,n,o,p,y],function(a){this.declaredClass!==a.prototype.declaredClass&&
this instanceof a&&k.dispatch(a.prototype.declaredClass,this)},this)};extendSelectFunction=function(a){g.extend(a,{select:function(b){a.prototype.set.apply(this,["selected",!b])},deselect:function(){this.select(!0)}})};extendSelectFunction(p);extendSelectFunction(o);g.extend(i,{set:function(a,b){"btnClass"===a?a="rightIcon":"btnClass2"===a&&(a="rightIcon2");m.prototype.set.apply(this,[a,b])}});g.extend(n,{getValue:function(){return this.get("values")},setValue:function(a){return this.set("values",
a)}});g.extend(w,{getValue:function(){return this.get("value")},getKey:function(){return this.get("key")},setValue:function(a){return this.set("value",a)}});g.mixin(f,{createDomButton:function(){return u.createDomButton.apply(this,arguments)}});d=[];f=c.doc.styleSheets;for(b=0;b<f.length;b++)if(!f[b].href&&(i=f[b].cssRules||f[b].imports))for(e=0;e<i.length;e++)i[e].href&&d.push(i[e].href);e=c.doc.getElementsByTagName("link");for(b=0;b<e.length;b++)d.push(e[b].href);for(b=0;b<d.length;b++)-1!==d[b].indexOf("/iphone/")?
j="iphone":-1!==d[b].indexOf("/android/")?j="android":-1!==d[b].indexOf("/blackberry/")?j="blackberry":-1!==d[b].indexOf("/custom/")&&(j="custom"),q.add(c.doc.documentElement,j+"_theme"),d[b].match(/themes\/common\/(FixedSplitter.css)|themes\/common\/(SpinWheel.css)/);r(function(){dojo.hash&&(dojo.require?dojo.require("dojox.mobile.bookmarkable"):require(["dojox/mobile/bookmarkable"]))});return k});

// :encoding=UTF-8:
define(
[
  'dojo/_base/declare',
  'dojo/_base/lang',
  'dojo/_base/array',
  'dojo/on',
  'dojo/json',
  'dojo/dom',
  'dojo/dom-construct',
  'dojo/dom-style',
  'dojo/dom-class',
  'dojo/dom-geometry',
  'dojo/query',
  'dojo/NodeList-dom',
  'openinnovation/organic/Mir'
],
function(
  declare,
  lang,
  array,
  on,
  JSON,
  dom,
  domConstruct,
  style,
  domClass,
  geometry,
  query,
  nodeList,
  Mir)
{
  var mir = new Mir();

  var Singleton = declare('openinnovation/gnam/Gnam', [],
  {
    txt:{
      it:{
        '01':'Comincia\nla storia!',
        '01b':'Mamma & papà cliccate qui!',
        '01c':'Mostrognam',
        '01d':'di ALBERTO CORRADI',
        '01e':'Storia\ntocca\ntutto!',
        '02':'C\'era una volta\nMostrognam.\nEra un gigantesco\nmostro con una\nbocca enorme, ma\ngentile e educato.\nCosì quando aveva\nfame, chiedeva\nagli animali di\nsaltargli\ntra le zanne.',
        '03':'Un giorno che era molto\naffamato, chiese al Crocostrano\nse voleva saltargli in bocca.\nMa quello era strano, non\nmatto. Sorrise e gli rispose “No”.',
        '04':'Così andò\nin un prato\ne chiese a due\nuccellini cicci.\nMa... “No!”\ncinguettarono\nvolando via\nspaventati.',
        '05':'Mostrognam\nsospirò e\ncamminando\nincontrò il cane\nStanco. Ma non\nvoleva farsi\nmangiare!',
        '06':'E così andò dal\nFormichiere e\ndall\'Uccello Buffo.\nLi guardò, sospirò,\nindicò I suoi dentoni\ncon gli occhi che\ndicevano “Pappa!\nPappa!”, ma I due\namici lo\nconoscevano.\n“No!” sbuffarono.',
        '07':'Il povero\nmostrone\naveva tanta\ntanta fame!\nFamona!\nFamissima!',
        '08':'Stava per\ndiventare\nmatto quando\narrivò il Papero\nTonto e gli disse:\n“Ti salto io\nin bocca!”',
        '09':'Mostrognam non ci credeva,\nche fortuna! Il Papero Tonto\nera fatto di marzapane!\nAppena lo assaggiò, fece\nun urlo dalla felicità,\nera dolcissimo!',
        '10':'Strillò così\nforte che I\ncattivissimi\nMostri del\nBuio che\nvivevano\nnella foresta\nscapparono\nspaventati,\nfuggendo\nlontano\nlontano, per\nnon fare mai\npiù ritorno!!!',
        '11':'Da allora gli\nabitanti del bosco\nper ringraziare\nMostrognam di\naver scacciato\nI Mostri del Buio\ncucinano sempre\ntante cose\nbuone per lui e\nMostrognam\nè felice!'
      },
      en:
      {
        '01':'Let\'s start\nreading!',
        '01b':'Mom & dad please click here!',
        '01c':'Monstergnam',
        '01d':'by ALBERTO CORRADI',
        '01e':'Touch\nthe tale\nhear the\nsound!',
        '02':'Once upon a time\nthere was\nMonstergnam.\nHe was a giant\nmonster, with\nhuge teeth, but nice\nand polite. When he\nwas hungry, he\nused to ask to the\nanimals to jump\nin his mounth.',
        '03':'One day he was starving.\nSo he asked to the Crocoweird\nif he could be so kind to jump\ninto his mounth. But the croco\nwas weird, not mad.\nHe smiled and said "no".',
        '04':'In a garden\nhe met two\nfat little birds.\nHe asked...\nbut... "no!"\nthey chirped\nafraid, while\nflying away.',
        '05':'Monstergnam\nsighed. Walking\ndown the road\nhe met the tired\ndog. But he\ndidn\'t want\nto be eaten!',
        '06':'So he took a visit\nto the ant-bear and\nto the goofy bird.\nHe sighed, pointing\nat his giant teeth, and\nhis eyes were asking\n"din-dins! din-dins!",\nbut the two friends\nknew him well.\n"No!" they grumbled.',
        '07':'The big\nmonster\nwas sooo\nstarving!',
        '08':'It was about\nto go mad,\nwhen the\nclumsy duck\nsaid: "I\'m gonna\njump in your\nmounth!"',
        '09':'Monstergnam couldn\'t\nbelieve it, what a luck!\nThe clumsy duck was\nmade of marzipan!\nAt the first chew, he\nscreamed for joy,\nit was so sweet!',
        '10':'His scream\nwas so loud!\nThe evil\nmonsters of\nthe darkness\nhidden in the\nforest ran\naway, scared\nby such a\nsound, and\nthey would\nnever\nreturn!!!',
        '11':'Since he banished\nthe monsters of\ndarkness forever,\nthe grateful\ncreatures of\nthe forest cook\na lot of delicious\ndishes for him:\nMonstergnam\nis happy now!'
      },
      es:
      {
        '01':'Empieza\na leer!',
        '01b':'Mamà y papà haced clic aquì!',
        '01c':'Monstruo ñam',
        '01d':'por ALBERTO CORRADI',
        '01e':'Fabula\ntoca\ntodo!',
        '02':'Erase una vez\nMonstruo ñam.\nEste era un mon-\nstruo grande y con\nla boca enorme pero\ngentil y educado.\nAsi que cuando\ntenía hambre pedía\na los animales\nque entraran\nen su boca.',
        '03':'Un día estaba muy hambriento y le\npreguntó al Cocodrilo Misterioso\nsí quería entrar en su boca.\nPero el cocodrilo que era misterioso\npero no loco: sonrio y le dijo que no.',
        '04':'Monstruo ñam\nse fue a un prado y\npidió a dos pajaritos\ngordos que entraran\nen su boca. Los pajaritos asustados, miraron\nal monstruo y aero\nfueron volando,\ngritandole:\n!que no!.',
        '05':'El monstruo\nsuspiro y encontró\nal Perro Cansado\nmientras\ncaminaba pero ni\nsiquiera el quería\ndejarse comer.',
        '06':'Así, el monstruo se fue\na visitar un Hormiguero\ny el Pajaro Gracioso. Los\nmiró, suspiro y señaló sus\ndientes que parecían decir:\n!comida! !comida!\nPero los dos amigos\nconocían bien al\nmonstruo y jadeando\nle dijeron que no.',
        '07':'El pobre\nmonstruo\ntenía mucha\nhambre,\n muchissima!',
        '08':'y se estaba\nvolviendo\nloco, cuando apareció la Oca\nTonta que le dijo: "Sí quieres entro\nen tú boca"',
        '09':'El monstruo no podía creer\nen su suerte: !la oca tonta\nestaba echa de mazapan!\nAl primer mordisco pegó\nun grito de alegría.\n!Que dulce era!',
        '10':'El grito fue\ntan fuerte\nque los\nMonstruos\nde las\nSombras\nque vivían en\nlos bosques\nhuyeron\nrápido por\nel susto y\nnunca más\nregresaron.',
        '11':'Desde aquel día\nlos habitantes del\nbosque cocinaban\nmuy buenas\ncomidas para\nMonstruo ñam\npara darle las\ngracias por\nhaber echado a\nlos monstruos\nmalos de las\nsombras.'
      },
      fr:{
        '01':'Commence\nà lire!',
        '01b':'Maman et papa touchez ici!',
        '01c':'Mostrognam',
        '01d':'de ALBERTO CORRADI',
        '01e':'Conte\ntouche\ntout!',
        '02':'Il était une fois\nMostrognam.\nIl était un monstre\ngigantesque, avec\nune bouche énorme,\nmais gentil et poli.\nPour ça, quand il\navait faim, il\ndemandait aux\nanimaux de\nsauter dans sa\nbouche.',
        '03':'Un jour qu\'il avait très faim, il demanda au Crocodrôle s\'il voulait lui sauter dans la bouche. Mais celui-là était bizarre, pas fou. Il sourit et répondit: “Non”.',
        '04':'Alors il alla\ndans un pré et\ndemanda à deux\npetits oiseaux\njoufflus. Mais...\n“Non” ils gazouil-\nlèrent, et ils\ns\'envolèrent\neffrayés.',
        '05':'Mostrognam\nsoupira et en\nmarchand il\nrencontra le Chien\nFatigué. Mais il ne\nvoulait pas se\nfaire manger!',
        '06':'Alors il alla chez\nle Fourmilier\net le Oiseau Bizarre.\nIl les regarda, il\nsoupira, il indiqua\nses grandes dents et\nses yeux qui disaient\n“Bouillie! Bouillie”,\nmais les deux amis\nle connaissaient.\n“Non” ils soufflèrent.',
        '07':'Le pauvre\nmonstre avait\ntrès très\ntrès faim!',
        '08':'Il était en train\nde devenir fou\nquand arriva\nle Oison Niais\nqui lui dit:\n“Je peux sauter dans ta bouche!”.',
        '09':'Quelle chance, Mostrognam\nne pouvait pas y croire!\nLe Oison Niais était\nde massepain! Quand il\ncommença à le manger,\nil hurla de joie:\nil était très doux!',
        '10':'Il cria\ntellement\nfort que les\nméchants\nMonstres de\nl\'Obscurité\nqui vivaient\ndans la fôret\ns\'enfuirent\nloin pour la\npeur et il ne\nretournèrent jamais plus!',
        '11':'Dès lors les\nabitants du bois,\npour remercier\nMostrognam\nd\'avoir chasser\nles Mostres de\nl\'Obscurité, cuisi-\nnent toujour pour\nlui beaucoup de\nchoses délicieuses\net Mostrognam\nest heureux.'
      },
      de:{
        '01':'Die Geschichte fängt an!',
        '01b':'Mom & dad please click here!',
        '01c':'Monstermiam',
        '01d':'by ALBERTO CORRADI',
        '01e':'Touch\nthe tale\nhear the\nsound!',
        '02':'Es war einmal Monstermiam.\nEr war ein riesengroßer Monster mit einem grossen Mund, aber nett und höflich. Wenn er hungrig war, bat er die Tieren, in seinen Mund zu springen',
        '03':'Eines Tages war er besonders hungrig und fragte den Krokolaunisch, ob er in seinen Zähnen springen mag. Aber der war zwar launisch, nicht verrückt. Er schmunzelte und antwortete “Nein”.',
        '04':'\nSo ging er in\neine Wiese und frag\nzwei fette Vögleine.\nAber... “Nein!”  zwitscherten\nund flogen\nweg erschrocken.',
        '05':'\nMonstermiam ging seufzend und traf den müden Hund. Aber der wollte sich nicht fressen lassen!',
        '06':'So ging er weiter un näherte sich dem Ameisenbär und dem komischen Vögel an. Er sah die Beiden an, seufzte, zeigte seine grossen Zähne, die scheinten, Brei Brei zu sagen, aber die zwei Freunde kennten Ihn. “Nein!” schnauften sie.',
        '07':'Der arme grosse Monster hatte viel Hunger! So viel Hunger!',
        '08':'Er war fast verrückt geworden wann der einfältige Erpel kam und sagte ihm: “Ich spring in deine Zähne hinein!”',
        '09':'Monstermiam glaubte das nicht, Glück gehabt! Der einfältige Erpel war aus Marzipan. Sobald er ihn\nbiss, schrie er vor Freude,\nder war unglaublich\nsüß!',
        '10':'\nEr schrie\nso laut,\ndaß die\nim Wald\nlebenden\nbösen Monsters\nder Dünkelheit\nerschrocken\nwegliefen.',
        '11':'Von da an kochen die\nBewöhner des Waldes immer leckere\nSachen für ihn, um Monstermiam\nfür die Befreidigung\nvon den Monsters\nder Dünkelheit zu bedanken und Monstermiam\nfreut sich darüber. '
      }
    },
    android:false,
    lang:'it',
    menu:false,
    classCode:'gnam',
    current:{ account:null, view:'#01', sound:{name:null, media:null}, back:['#01'] },
    sounds:[],


    constructor:function()
    {
      this.mir = mir;

      try
      {
        //console.log(this.classCode + 'service: ', organic.baseUrl + '/smd/' + this.classCode + '.action');
        var w = window.innerWidth;
        var h = window.innerHeight;

        if (navigator.language)
        {
          var lang = window.navigator.userLanguage || window.navigator.language;
          lang = lang.substr(0, 2);
          //lang = 'es';
          domClass.replace('mirBody', lang, this.lang);
          this.lang = lang;
        }
      }
      catch(e)
      {
        console.error(this.classCode + ': service error: ', e);
      }
    },


    deviceready:function()
    {
      console.log('Gnam deviceready');

      this.playAudio('funnyraindrops3');
    },


    locale:function(lang)
    {
      main.menu();

      domClass.replace('mirBody', lang, this.lang);

      this.lang = lang;
      main.changeView(main.current.view);
    },


    creditz:function()
    {
      main.menu();
      main.changeView('#creditz');
    },


    menu:function()
    {
      //alert('main menu');
      var node = dom.byId('menu00');
      style.set(node, 'display', style.get(node, 'display') === 'none' ? 'block' : 'none');
    },


    showUrl:function(url)
    {
      if (window.plugins && window.plugins.childBrowser && cordova && cordova.exec)
      {
        //this.faxSave(...);

        //if ((device && (device.platform === 'iPad' || device.platform === 'iPhone')) ||
        //    (navigator && navigator.vendor === 'Apple Computer, Inc.') ||
        //    (device.platform.toUpperCase() === 'ANDROID'))
        //cordova.exec("ChildBrowserCommand.showWebPage", url, { showLocationBar: true })
        window.plugins.childBrowser.showWebPage(url, { showLocationBar: true });
      }
      else
      {
        window.open(url);//,'folder', 'directories=no,height=640,location=no,menubar=no,resizable=yes,scrollbars=yes,status=no,toolbar=no,width=680')
      }
    },


    resizeBox:function(id, bw, bh)
    {
      console.log(id+' resizeBox');
      var node = dom.byId(id);
      if (node)
      {
        var l = style.get(node, 'left');
        var t = style.get(node, 'top');
        var w = style.get(node, 'width');
        var h = style.get(node, 'height');

        var rl = Math.ceil(l*bw/1024);
        var rt = Math.ceil(t*bh/768);
        var rw = Math.ceil(w*bw/1024);
        var rh = Math.ceil(h*bh/768);

        style.set(node, {'left':rl+'px', 'top':rt+'px', 'width':rw+'px', 'height':rh+'px'});
      }
    },


    resizeClass:function(name, bw, bh, l, t, w, h)
    {
      var rl = Math.ceil(l*bw/1024);
      var rt = Math.ceil(t*bh/768);
      var rw = Math.ceil(w*bw/1024);
      var rh = Math.ceil(h*bh/768);

      query(name).style({'left':rl+'px', 'top':rt+'px', 'width':rw+'px', 'height':rh+'px'});
    },


    resize:function(id)
    {
      var w = window.innerWidth;
      var h = window.innerHeight;
      //console.log(id+' wxh', w, h);
      var bw = w;
      var bh = Math.ceil(w*0.75);
      bw = 1024;
      bh = 768;

      if (bh > h)
      {
        console.log('adjusting');
        bw = Math.ceil(h/0.75);
        bh = h;
      }
      this.bw = bw;
      this.bh = bh;
      //console.log(id+' bg wxh', bw, bh);

      if (!this.templateDone)
      {
        // just resize the info button and the font size
        this.templateDone = true;
        this.resizeBox('bt00', bw, bh);
        var btw = Math.ceil(bw*64/1024);
        var bth = Math.ceil(bh*64/768);
        style.set(dom.byId('bt00'), {'left':((w-bw)/2)+'px'});
        style.set(dom.byId('bt00'), {'width':btw+'px', 'height':bth+'px', 'backgroundSize':btw+'px'+' '+bth+'px'});
        //var d = Math.ceil(style.get(dom.byId('bt00'), 'width')/2);
        //var l = Math.ceil(80*bw/1024)-Math.ceil((w-bw)/2);
        //style.set(dom.byId('bt00'), {'left':-l+'px' , 'clip':'rect(0px, 200px, '+d+'px, '+d+'px)'});

        var node = dom.byId('mirBody');
        style.set(node, 'font-size', Math.ceil(bw/32)+'px');
      }

      if (id.length === 2)
      {
        // resize the background (image), the arrows and the main text
        var illu = dom.byId('illu'+id);
        style.set(illu, {'width':bw+'px', 'height':bh+'px', 'backgroundSize':bw+'px'+' '+bh+'px'});

        this.resizeClass('.gnamArrowLeft', bw, bh, 30, 30, 140, 80);
        this.resizeClass('.gnamArrowRight', bw, bh, 850, 30, 140, 80);
        this.resizeBox('text'+id, bw, bh);
        this.textUpdate('01');
      }
      this.resizeBox('snd'+id, bw, bh);
    },


    textUpdate:function(id)
    {
      var txt = dom.byId('text'+id);
      if (txt)
      {
        txt.innerHTML = this.txt[this.lang][id];
      }
    },


    textResizeAndUpdate:function(id)
    {
      this.textUpdate(id);
      this.resizeBox('text'+id, this.bw, this.bh);
    },


    isAndroid:function()
    {
      // summary:
      // description:
      //    ...
      // args:
      //    ...
      // returns:
      //    ...
      //console.log('Voco.isAndroid device.platform=', device ? device.platform : false);
      //console.log(this.classCode + '.isAndroid device:', device);
      var r = false;
      try
      {
        r = device.platform !== 'iPhone' && device.platform !== 'iPad' && device.platform !== 'iOS';
      }
      catch(e)
      {
        console.info(this.classCode + '.isAndroid: cannot read device.platform');
      }
      //console.info('Voco.isAndroid='+r);
      return r;
    },


    aboutUpdate:function(args)
    {
      // summary: write smth on about page
      //
      var div = null;//dojo.byId('_about_div');
      if (div)
      {
        //div.innerHTML = mir.about;
      }
    },


    changeView:function(viewName, callback)
    {
      // summary: change the visible view
      // description:
      //    ...
      // args:
      //    viewName - the view name with the leading # or -1 to go #back
      //    callback function - the function to invoke when the view is ready
      // returns:
      //    ...
      var _app = app;
      //console.log('Voco.changeView', v, _app);
      /*if (viewName === main.current.view)
      {
        console.log('already on view: '+viewName);
        lang.hitch(main, main.textUpdate)('01');
        lang.hitch(main, main.textUpdate)('01b');
        lang.hitch(main, main.textUpdate)('01c');
        lang.hitch(main, main.textUpdate)('01d');
        lang.hitch(main, main.textUpdate)('01e');
        return;
      }*/

      var back = (viewName === -1 || viewName === '#back');
      if (back === true)
      {
        viewName = main.current.back.pop();
      }
      else
      {
        main.current.back.push(main.current.view);
      }
      try
      {
        //main.hideTooltip();

        viewName = viewName.substring(1);
        //console.log('_app.trigger load', v);
        _app.trigger("load", {
            viewId:viewName,
            params:{},
            callback:function()
            {
              //console.log('_app.trigger callback', v);
              if (callback)
              {
                try
                {
                  callback(viewName);
                }
                catch(e)
                {
                  console.warn(this.classCode+'.changeView: error invoking the callback:', viewName, e);
                }
              }

              // HTML5
              //var player = document.getElementById('audioPlayer');
              //player.pause();
              try
              {
                var bt00 = dom.byId('bt00');
                style.set(bt00, 'display', viewName === 'creditz' ? 'none' : 'block');

                if (main.current.view === '#creditz' || viewName === 'creditz')
                {
                  // page creditz dont change anything both entering and leaving
                }
                else
                {
                  lang.hitch(main, main.textUpdate)(viewName);
                  if (viewName === '01')
                  {
                    // entering #01
                    lang.hitch(main, main.playAudio)('funnyraindrops3');
                    lang.hitch(main, main.textUpdate)('01b');
                    lang.hitch(main, main.textUpdate)('01c');
                    lang.hitch(main, main.textUpdate)('01d');
                    lang.hitch(main, main.textUpdate)('01e');
                  }
                  else
                  {
                    // entering any other page then #01
                    lang.hitch(main, main.stopAudio)();
                  }
                  /*if (main.current.view === '#01')
                  {
                    // leaving #01
                    lang.hitch(main, main.pauseAudio)();
                  }
                  else
                  {
                    // leaving any other page
                    lang.hitch(main, main.stopAudio)();
                  }*/
                }
              }
              catch(e1)
              {
              }



              main.current.view = '#'+viewName;

              //console.log('Voco.changeView, view/back:', main.current.view, main.current.back[main.current.back.length-1], main.current.back);
              _app.trigger("transition", { viewId:viewName });

            }
        });
      }
      catch(e)
      {
        console.warn(this.classCode+'.changeView: cannot transition: ', viewName, e);
      }
    },


    // onSuccess Callback
    //
    onSuccess:function()
    {
      console.log("playAudio():Audio Success");
    },

    // onError Callback
    //
    onError:function(error)
    {
      if (error.code !== 0)
      {
        alert('Error: code='+error.code+ '\n' +
            'message=' + error.message + '\n');
      }
      else
      {
        console.log('onError with code 0', error);
      }
    },


    pauseAudio:function()
    {
      if (this.current.sound.media)
      {
        this.current.sound.media.pause();
      }
    },


    stopAudio:function()
    {
      if (this.current.sound.media)
      {
        this.current.sound.media.stop();
        this.current.sound.media.release();
        this.current.sound.media = null;
        this.current.sound.name = null;
        this.sounds[this.current.sound.name] = null;
      }
    },


    playAudio:function(sound)
    {
      //console.info('ZZZZZZZZZZZZZZ looking for sound: '+sound);
      if (this.current.sound.name === sound)
      {
        console.log('already playing: '+sound);
      }
      else
      {
        var media = this.sounds[sound];
        //console.info('ZZZZZZZZZZZZZZ media is: ', media);
        if (!media)
        {
          //function getPhoneGapPath() {
          var path = window.location.pathname;
          path = path.substr(0, path.lastIndexOf('/'));

          var src = path+'/snd/'+sound+'.mp3';
          try
          {
            media = new Media(src, this.onSuccess, this.onError);
          }
          catch(e)
          {
            console.warn('cordova Media not available');
          }
          this.sounds[sound] = media;
        }
        this.current.sound.name = sound;
        this.current.sound.media = media;
        if (media)
        {
          media.play();
        }
      }
    },


    sound:function(args)
    {
      // summary:
      //
      if (args && args.sound)
      {
        this.stopAudio();
        this.playAudio(args.sound);
        /* HTML5
        var player = document.getElementById('audioPlayer');
        player.src = './snd/'+args.sound+'.mp3';
        //player.type = 'audio/mp3'; // src="delta.mp3" type="audio/mp3"
        try
        {
          player.load();

          //console.log('currentSrc/Time', player.currentSrc, player.currentTime);
          //console.log('canPlayType()', player.canPlayType());

          player.play();
        }
        catch(e)
        {
          console.warn('cannot play', e);
        }
        */
      }
    },


    endOfLib:null
  });

  var instance;
  return function getSingleton() { return (instance = (instance || new Singleton())); };
});




define(
[
  'dojo/_base/lang',
  'dojo/ready',
  'dojo/on',
  'dojo/dom-style',
  'openinnovation/organic/Mir',
  'openinnovation/gnam/Gnam'
],
function(lang, ready, on, style, Mir, Gnam)
{
  ready(function()
  {
    //console.log('login1.js ready', ui.cti);
    //style.set(ui.footer.domNode, 'display', 'none');

    var mir = new Mir();
    //mir.current.pane = ui.login.pane;

    var gnam = new Gnam();
    gnam.resize('02');


    //console.log('mir.current.pane', mir.current.pane);
  });
});



define(
[
  'dojo/_base/lang',
  'dojo/ready',
  'dojo/on',
  'dojo/dom-style',
  'openinnovation/organic/Mir',
  'openinnovation/gnam/Gnam'
],
function(lang, ready, on, style, Mir, Gnam)
{
  ready(function()
  {
    //console.log('login1.js ready', ui.cti);
    //style.set(ui.footer.domNode, 'display', 'none');

    var mir = new Mir();
    //mir.current.pane = ui.login.pane;

    var gnam = new Gnam();
    gnam.resize('11');
    gnam.resize('11b');
    gnam.resize('11c');


    //console.log('mir.current.pane', mir.current.pane);
  });
});



define(
[
  'dojo/_base/lang',
  'dojo/ready',
  'dojo/on',
  'dojo/dom-style',
  'openinnovation/organic/Mir',
  'openinnovation/gnam/Gnam'
],
function(lang, ready, on, style, Mir, Gnam)
{
  ready(function()
  {
    //console.log('login1.js ready', ui.cti);
    //style.set(ui.footer.domNode, 'display', 'none');

    var mir = new Mir();
    //mir.current.pane = ui.login.pane;

    var gnam = new Gnam();
    gnam.resize('08');


    //console.log('mir.current.pane', mir.current.pane);
  });
});



define(
[
  'dojo/_base/lang',
  'dojo/ready',
  'dojo/on',
  'dojo/dom-style',
  'openinnovation/organic/Mir',
  'openinnovation/gnam/Gnam'
],
function(lang, ready, on, style, Mir, Gnam)
{
  ready(function()
  {
    //console.log('login1.js ready', ui.cti);
    //style.set(ui.footer.domNode, 'display', 'none');

    var mir = new Mir();
    //mir.current.pane = ui.login.pane;

    var gnam = new Gnam();
    gnam.resize('04');
    gnam.resize('04b');


    //console.log('mir.current.pane', mir.current.pane);
  });
});



define(
[
  'dojo/_base/lang',
  'dojo/ready',
  'dojo/on',
  'dojo/dom-style',
  'openinnovation/organic/Mir',
  'openinnovation/gnam/Gnam'
],
function(lang, ready, on, style, Mir, Gnam)
{
  ready(function()
  {
    //console.log('login1.js ready', ui.cti);
    //style.set(ui.footer.domNode, 'display', 'none');

    //var mir = new Mir();
    //mir.current.pane = ui.login.pane;

    //var gnam = new Gnam();
    //gnam.resize('01');

    //console.log('mir.current.pane', mir.current.pane);
  });
});



define(
[
  'dojo/_base/lang',
  'dojo/ready',
  'dojo/on',
  'dojo/dom-style',
  'openinnovation/organic/Mir',
  'openinnovation/gnam/Gnam'
],
function(lang, ready, on, style, Mir, Gnam)
{
  ready(function()
  {
    //console.log('login1.js ready', ui.cti);
    //style.set(ui.footer.domNode, 'display', 'none');

    var mir = new Mir();
    //mir.current.pane = ui.login.pane;

    var gnam = new Gnam();
    gnam.resize('03');


    //console.log('mir.current.pane', mir.current.pane);
  });
});



define(
[
  'dojo/_base/lang',
  'dojo/ready',
  'dojo/on',
  'dojo/dom-style',
  'openinnovation/organic/Mir',
  'openinnovation/gnam/Gnam'
],
function(lang, ready, on, style, Mir, Gnam)
{
  ready(function()
  {
    //console.log('login1.js ready', ui.cti);
    //style.set(ui.footer.domNode, 'display', 'none');

    var mir = new Mir();
    //mir.current.pane = ui.login.pane;

    var gnam = new Gnam();
    gnam.resize('06');
    gnam.resize('06b');


    //console.log('mir.current.pane', mir.current.pane);
  });
});



define(
[
  'dojo/_base/lang',
  'dojo/ready',
  'dojo/on',
  'dojo/dom-style',
  'openinnovation/organic/Mir',
  'openinnovation/gnam/Gnam'
],
function(lang, ready, on, style, Mir, Gnam)
{
  ready(function()
  {
    //console.log('login1.js ready', ui.cti);
    //style.set(ui.footer.domNode, 'display', 'none');

    var mir = new Mir();
    //mir.current.pane = ui.login.pane;

    var gnam = new Gnam();
    gnam.resize('10');
    gnam.resize('10b');
    gnam.resize('10c');
    gnam.resize('10d');
    gnam.resize('10e');
    gnam.resize('10f');
    gnam.resize('10g');


    //console.log('mir.current.pane', mir.current.pane);
  });
});



define(
[
  'dojo/_base/lang',
  'dojo/ready',
  'dojo/on',
  'dojo/dom-style',
  'openinnovation/organic/Mir',
  'openinnovation/gnam/Gnam'
],
function(lang, ready, on, style, Mir, Gnam)
{
  ready(function()
  {
    //console.log('login1.js ready', ui.cti);
    //style.set(ui.footer.domNode, 'display', 'none');

    var mir = new Mir();
    //mir.current.pane = ui.login.pane;

    var gnam = new Gnam();
    gnam.resize('05');
    gnam.resize('05b');


    //console.log('mir.current.pane', mir.current.pane);
  });
});



define(
[
  'dojo/_base/lang',
  'dojo/ready',
  'dojo/on',
  'dojo/dom-style',
  'openinnovation/organic/Mir',
  'openinnovation/gnam/Gnam'
],
function(lang, ready, on, style, Mir, Gnam)
{
  ready(function()
  {
    //console.log('login1.js ready', ui.cti);
    //style.set(ui.footer.domNode, 'display', 'none');

    var mir = new Mir();
    //mir.current.pane = ui.login.pane;

    var gnam = new Gnam();
    gnam.resize('09');
    gnam.resize('09b');
    gnam.resize('09c');
    gnam.resize('09d');
    gnam.resize('09e');


    //console.log('mir.current.pane', mir.current.pane);
  });
});



define(
[
  'dojo/_base/lang',
  'dojo/ready',
  'dojo/on',
  'dojo/dom-style',
  'openinnovation/organic/Mir',
  'openinnovation/gnam/Gnam'
],
function(lang, ready, on, style, Mir, Gnam)
{
  ready(function()
  {
    //console.log('login1.js ready', ui.cti);
    //style.set(ui.footer.domNode, 'display', 'none');

    var mir = new Mir();
    //mir.current.pane = ui.login.pane;

    var gnam = new Gnam();
    gnam.resize('07');


    //console.log('mir.current.pane', mir.current.pane);
  });
});



define(
[
  'dojo/_base/lang',
  'dojo/ready',
  'dojo/on',
  'dojo/dom-style',
  'openinnovation/organic/Mir',
  'openinnovation/gnam/Gnam'
],
function(lang, ready, on, style, Mir, Gnam)
{
  ready(function()
  {
    //console.log('login1.js ready', ui.cti);
    //style.set(ui.footer.domNode, 'display', 'none');

    //var mir = new Mir();
    //mir.current.pane = ui.login.pane;

    var gnam = new Gnam();
    gnam.resize('01');
    //gnam.textResizeAndUpdate('01');
    gnam.textResizeAndUpdate('01b');
    gnam.textResizeAndUpdate('01c');
    gnam.textResizeAndUpdate('01d');
    gnam.textResizeAndUpdate('01e');

    //console.log('mir.current.pane', mir.current.pane);
  });
});



define(
[
  'dojo/_base/lang',
  'dojo/ready',
  'dojo/on',
  'dojo/dom-style',
  'openinnovation/organic/Mir',
  'openinnovation/gnam/Gnam'
],
function(lang, ready, on, style, Mir, Gnam)
{
  ready(function()
  {
    //console.log('login1.js ready', ui.cti);
    //style.set(ui.footer.domNode, 'display', 'none');

    var mir = new Mir();
    //mir.current.pane = ui.login.pane;

    var gnam = new Gnam();
    gnam.resize('home');


    //console.log('mir.current.pane', mir.current.pane);
  });
});



define(
[
  'dojo/_base/connect',
  'dojo/_base/lang',
  'dojo/ready',
  'dojo/on',
  'dojo/dom',
  'openinnovation/mobile/Voco'
],
function(connect, lang, ready, on, djDom, Voco)
{
  ready(function()
  {
    //console.log('about.js ready', ui.cti);
    //var voco = new Voco();
    //var _this = voco.initView('about');

    on(ui.vocoLogout.domNode, 'click', function()
      {
        location = location.href;
      });
  });
});
