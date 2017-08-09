
 
 
 
 
 

var config =
{
	'lang': 	["se"],

	domain:	'http://marknad.allbohus.se',
	server: "http://marknad.allbohus.se",

	serviceName: "Service/Marknad.svc",
	'useMapView': false,
	'syndicateNo':	'1',
	companyNo:	'1',
	companyDisplayName: "Allbohus",
	'defaultLang':	'se',
	pageStructure:{
		'errands': 'index',
		'information': 'index',
		'search': 'index',
		'laundry': 'index',
		'searchgps': 'index',
		'settings': 'index',
		'errorunit': "errorreport",
		'errorreport': "index",
		'contract' : "index"
	},
	'useLaundry': false,
	'useParkingSketch': true,
	'useMenuHomeBtn' : true,
	'useWelcomeText' : true,
	'useSearchSliders' : true,
	'useFloatRightLogo' : false,
	notificationInterval: 5,
	useMap: true,
	useBackground: false,
	googlePlaces:{
		'placesRadius': 3000,
		'placesFoodLimit': 5,
		'placesStoreLimit': 5,
		'placesPharmacyLimit': 5,
		'placesOthersLimit': 5
	},
	defaultTab: 'seeklist',
	defaultImage: "images/no-pic.png",
	defaultQueImages: {
		"4":"images/parking.png"
	},
	debugLocation: {
		active: true,
		latitude: "59.27377",
		longitude: "15.20754"
	},
	myPages : true,
	myPagesExtend : {
		disorder : false,
		errorreport : true,
		consumption : true,
		changeaddress : true,
		notifications : false
	},
	searchTake: 10,
	nearRadius: 10000,
	debugTimer: false,
	debug: false,
	accountLink: "http://marknad.allbohus.se/pgClientRegister_ClientInfo.aspx",
	packageName: "allbohus",
	version: "4.0.3"
};

var config = 
{
	'lang': 	["sv","en"],

	domain:	'http://moms.momentumsoftware.se',
	server: "http://moms.momentumsoftware.se",
	domain:	'http://moms39.momentumsoftware.se',
	server: "http://moms39.momentumsoftware.se",

	domain:	'http://localhost:3461',
	server: "http://localhost:3461",
	
	serviceName: "Service/Marknad.svc", 
	'useMapView': false,	
	'syndicateNo':	'1',
	companyNo:	'1',
	companyDisplayName: "Momentum",
	'defaultLang':	'sv',
	pageStructure:{
		'errands': 'index',
		'information': 'index',
		'search': 'index', 
		'laundry': 'index',
		'searchgps': 'index',
		'settings': 'index',
		'errorunit': "errorreport",
		'errorreport': "index",
		'contract' : "index"
	},
	'useLaundry': true,
	notificationInterval: 5,
	useMap: true,
	googlePlaces:{
		'placesRadius': 3000,
		'placesFoodLimit': 5,
		'placesStoreLimit': 5,
		'placesPharmacyLimit': 5,
		'placesOthersLimit': 5
	},
	defaultTab: 'seeklist',
	defaultImage: "images/no-pic.png",
	defaultQueImages: {
		"4":"images/parking.png"
	},
	debugLocation: {
		active: true,
		latitude: "59.27377",
		longitude: "15.20754"
	},
	myPages : true,
	myPagesExtend : {
		disorder : true,
		errorreport : true
	},
	searchTake: 10,
	nearRadius: 10000,
	debugTimer: false,
	debug: false,
	accountLink: "http://marknad.faxeholmen.se/s2.aspx?page=pgClientRegister_SocialSecurityNo"
};

(function(){function d(){var a=B(arguments);s.push.apply(s,a);d.after(a);return d}function P(a,b,c,e){o[b.shift()].require(a,function(){b.length?P(a,b,c,e):c.apply(this,arguments)},e)}function p(a,b,c){return c?function(){return a.apply(this,b.apply(this,arguments))}:function(){b.apply(this,arguments);return a.apply(this,arguments)}}function q(a,b,c){return c?function(){return b.apply(this,[a.apply(this,arguments)].concat(B(arguments)))}:function(){var e=a.apply(this,arguments);b.apply(this,arguments);
return e}}function C(a,b){var c=a[b];if(!a[b].callbacks){a[b]=function(){var e=arguments.callee,g;g=c.apply(a,arguments);var k=e.callbacks,i=k.length;e.called=true;for(e=0;e<i;e++)k[e].called();return g};a[b].callbacks=[]}return a[b]}function Q(a,b){this.obj=a;this.meth=b;C(a,b);this.calls=0}function w(){var a=B(arguments),b=a[a.length-1];if(typeof b==="function"){a[a.length-1]={fn:b};a.push("fn")}b=a.pop();var c=a.pop();b=new Q(c,b);for(c=0;c<a.length;c+=2)b.add(a[c],a[c+1]);b.go()}var h=function(){return this}.call(null),
j=h.document,K=function(){var a=j.createElement("script");a.type="text/javascript";return a},t=function(){var a=j.documentElement,b=j.getElementsByTagName("head")[0];if(!b){b=j.createElement("head");a.insertBefore(b,a.firstChild)}t=function(){return b};return b},l=function(a,b){for(var c in b)a[c]=b[c];return a},m=function(a,b){for(var c=0,e=a.length;c<e;c++)b.call(a[c],c,a[c]);return a},B=function(a){var b=[];m(a,function(c,e){b[c]=e});return b},r={error:j&&function(){var a=K();a.setAttribute("onerror",
"return;");return typeof a.onerror==="function"?true:"onerror"in a}(),interactive:false,attachEvent:j&&K().attachEvent},x=function(){},D=h.steal,L=typeof D=="object"?D:{};d.File=function(a){if(this.constructor!=d.File)return new d.File(a);this.path=typeof a=="string"?a:a.path};var f=d.File,R;f.cur=function(a){if(a!==undefined)R=f(a);else return R||f("")};l(f.prototype,{clean:function(){return this.path.match(/([^\?#]*)/)[1]},ext:function(){var a=this.clean().match(/\.([\w\d]+)$/);return a?a[1]:""},
dir:function(){var a=this.clean(),b=a.lastIndexOf("/");b=b!=-1?a.substring(0,b):"";return/^(https?:\/|file:\/)$/.test(b)?a:b},filename:function(){var a=this.clean(),b=a.lastIndexOf("/");b=b!=-1?a.substring(b+1,a.length):a;return/^(https?:\/|file:\/)$/.test(b)?a:b},domain:function(){var a=this.path.match(/^(?:https?:\/\/)([^\/]*)/);return a?a[1]:null},join:function(a){return f(a).joinFrom(this.path)},joinFrom:function(a,b){var c=f(a);if(this.protocol()){b=this.domain();c=c.domain();return b&&b==c?
this.toReferenceFromSameDomain(a):this.path}else if(a===d.pageUrl().dir()&&!b)return this.path;else if(this.isLocalAbsolute())return(c.domain()?c.protocol()+"//"+c.domain():"")+this.path;else{if(a==="")return this.path.replace(/\/$/,"");c=a.split("/");b=this.path.split("/");var e=b[0];for(a.match(/\/$/)&&c.pop();e==".."&&b.length>0;){if(!c.pop())break;b.shift();e=b[0]}return c.concat(b).join("/")}},relative:function(){return this.path.match(/^(https?:|file:|\/)/)===null},toReferenceFromSameDomain:function(a){var b=
this.path.split("/");a=a.split("/");for(var c="";b.length>0&&a.length>0&&b[0]==a[0];){b.shift();a.shift()}m(a,function(){c+="../"});return c+b.join("/")},isCrossDomain:function(){return this.isLocalAbsolute()?false:this.domain()!=f(h.location.href).domain()},isLocalAbsolute:function(){return this.path.indexOf("/")===0},protocol:function(){var a=this.path.match(/^(https?:|file:)/);return a&&a[0]},normalize:function(){var a=f.cur().dir(),b=this.path;if(/^\/\//.test(this.path))b=this.path.substr(2);
else if(/^\.\//.test(this.path)){this.path=this.path.substr(2);b=this.joinFrom(a);this.path="./"+this.path}else if(!/^[^\.|\/]/.test(this.path))if(this.relative()||f.cur().isCrossDomain()&&!this.protocol())b=this.joinFrom(a);return b}});var s=[],ca=0,y={};d.p={make:function(a){var b=new d.p.init(a),c=b.options.rootSrc;if(b.unique&&c)if(!y[c]&&!y[c+".js"])y[c]=b;else{b=y[c];l(b.options,typeof a==="string"?{}:a)}return b},init:function(a){this.dependencies=[];this.id=++ca;if(a)if(typeof a=="function"){var b=
f.cur().path;this.options={fn:function(){f.cur(b);a(d.send||h.jQuery||d)},rootSrc:b,orig:a,type:"fn"};this.waits=true;this.unique=false}else{this.orig=a;this.options=d.makeOptions(l({},typeof a=="string"?{src:a}:a));this.waits=this.options.waits||false;this.unique=true}else{this.options={};this.waits=false;this.pack="production.js"}},complete:function(){this.completed=true},loaded:function(a){var b,c;a=a&&a.src||this.options.src;f.cur(this.options.rootSrc);this.isLoaded=true;if(r.interactive&&a)b=
n[a];if(!b){b=s.slice(0);s=[]}if(b.length){var e=this,g,k=d.options.env=="production",i=[],v=function(E,u,M,N){var O=[M,N];m(E,function(S,da){O.unshift(da,u)});w.apply(d,O)},T=function(E,u,M,N){m(M,function(O,S){w(E,u,S,N)})};m(b.reverse(),function(E,u){if(!(k&&u.ignore)){c=d.p.make(u);e.dependencies.unshift(c);if(c.waits===false)i.push(c);else{if(g){v(i.concat(c),"complete",g,"load");T(c,"complete",i.length?i:[g],"load")}else{v(i.concat(c),"complete",e,"complete");i.length&&T(c,"complete",i,"load")}g=
c;i=[]}}});if(i.length){g?v(i,"complete",g,"load"):v(i,"complete",e,"complete");m(i.reverse(),function(){this.load()})}else g?g.load():e.complete()}else this.complete()},load:function(){if(!(this.loading||this.isLoaded)){this.loading=true;var a=this;d.require(this.options,function(b){a.loaded(b)},function(){h.clearTimeout&&h.clearTimeout(a.completeTimeout);throw"steal.js : "+a.options.src+" not completed";})}}};d.p.init.prototype=d.p;var U;l(d,{root:f(""),rootUrl:function(a){if(a!==undefined){d.root=
f(a);var b=d.pageUrl();a=b.join(a);f.cur(b.toReferenceFromSameDomain(a));return d}else return d.root.path},extend:l,pageUrl:function(a){if(a){U=f(f(a).clean());return d}else return U||f("")},cur:function(a){if(a===undefined)return f.cur();else{f.cur(a);return d}},isRhino:h.load&&h.readUrl&&h.readFile,options:{env:"development",loadProduction:true},add:function(a){y[a.rootSrc]=a},makeOptions:function(a){if(!f(a.src).ext())if(a.src.indexOf(".")==0||a.src.indexOf("/")==0)a.src+=".js";else a.src=a.src+
"/"+f(a.src).filename()+".js";var b=d.File(a.src).normalize(),c=d.File(a.src).protocol();l(a,{originalSrc:a.src,rootSrc:b,src:d.root.join(b),protocol:c||(j?location.protocol:"file:")});a.originalSrc=a.src;return a},then:function(){var a=typeof arguments[0]=="function"?arguments:[function(){}].concat(B(arguments));return d.apply(h,a)},bind:function(a,b){z[a]||(z[a]=[]);var c=d.events[a];if(c&&c.add)b=c.add(b);b&&z[a].push(b);return d},one:function(a,b){d.bind(a,function(){b.apply(this,arguments);d.unbind(a,
arguments.callee)});return d},events:{},unbind:function(a,b){a=z[a]||[];for(var c=0;c<a.length;)if(b===a[c])a.splice(c,1);else c++},trigger:function(a,b){a=z[a]||[];for(var c=[],e=0,g=a.length;e<g;e++)c[e]=a[e];m(c,function(k,i){i(b)})},loading:function(){useInteractive=false;m(arguments,function(a,b){d.p.make(b).loading=true})},preloaded:function(){},loaded:function(a){a=d.p.make(a);a.loading=true;C(a,"complete");d.preloaded(a);a.loaded();return d}});var z={};x=p(x,function(){d.pageUrl(h.location?
h.location.href:"")});var o=d.types={};d.type=function(a,b){a=a.split(" ");if(!b)return o[a.shift()].require;o[a.shift()]={require:b,convert:a}};d.p.load=p(d.p.load,function(){var a=this.options;if(!a.type){var b=f(a.src).ext();if(!b&&!o[b])b="js";a.type=b}if(!o[a.type])throw"steal.js - type "+a.type+" has not been loaded.";b=o[a.type].convert;a.buildType=b.length?b[b.length-1]:a.type});d.require=function(a,b,c){var e=o[a.type];if(e.convert.length){e=e.convert.slice(0);e.unshift("text",a.type)}else e=
[a.type];P(a,e,b,c)};var V=function(a){a.onreadystatechange=a.onload=a.onerror=null;t().removeChild(a)},F,ea=/loaded|complete/;d.type("js",function(a,b,c){var e=K();if(a.text)e.text=a.text;else{var g=function(){if(!e.readyState||ea.test(e.readyState)){V(e);b(e)}};if(r.attachEvent)e.attachEvent("onreadystatechange",g);else e.onload=g;if(r.error&&c&&a.protocol!=="file:")if(r.attachEvent)e.attachEvent("onerror",c);else e.onerror=c;e.src=a.src;e.onSuccess=b}F=e;t().insertBefore(e,t().firstChild);if(a.text){b();
V(e)}});d.type("fn",function(a,b){b(a.fn())});d.type("text",function(a,b,c){d.request(a,function(e){a.text=e;b(e)},c)});var A=0,fa=j&&j.createStyleSheet,W,X;d.type("css",function(a,b){if(a.text){var c=j.createElement("style");c.type="text/css";if(c.styleSheet)c.styleSheet.cssText=a.text;else(function(g){if(c.childNodes.length>0)c.firstChild.nodeValue!==g.nodeValue&&c.replaceChild(g,c.firstChild);else c.appendChild(g)})(j.createTextNode(a.text));t().appendChild(c)}else{if(fa){if(A==0){W=document.createStyleSheet(a.src);
X=a;A++}else{a=f(a.src).joinFrom(f(X.src).dir());W.addImport(a);A++;if(A==30)A=0}b();return}a=a||{};var e=j.createElement("link");e.rel=a.rel||"stylesheet";e.href=a.src;e.type="text/css";t().appendChild(e)}b()});if(L.types)for(var Y in L.types)d.type(Y,L.types[Y]);var ga=function(){return h.ActiveXObject?new ActiveXObject("Microsoft.XMLHTTP"):new XMLHttpRequest};d.request=function(a,b,c){var e=new ga,g=a.contentType||"application/x-www-form-urlencoded; charset=utf-8",k=function(){e=i=k=null},i=function(){if(e.readyState===
4){if(e.status===500||e.status===404||e.status===2||e.status===0&&e.responseText==="")c&&c();else b(e.responseText);k()}};e.open("GET",a.src,a.async===false?false:true);e.setRequestHeader("Content-type",g);e.overrideMimeType&&e.overrideMimeType(g);e.onreadystatechange=function(){i()};try{e.send(null)}catch(v){console.error(v);c&&c();k()}};var Z=function(a){var b,c;for(b in d.mappings){c=d.mappings[b];if(c.test.test(a))return a.replace(b,c.path)}return a};f.prototype.mapJoin=function(a){a=Z(a);return f(a).joinFrom(this.path)};
d.makeOptions=q(d.makeOptions,function(a){a.src=d.root.join(a.rootSrc=Z(a.rootSrc))});d.mappings={};d.map=function(a,b){if(typeof a=="string")d.mappings[a]={test:new RegExp("^("+a+")([/.]|$)"),path:b};else for(var c in a)d.map(c,a[c]);return this};var G;l(d,{after:function(){if(!G){var a=G=new d.p.init,b=function(){d.trigger("start",a);w(a,"complete",function(){d.trigger("end",a)});a.loaded()};h.setTimeout?setTimeout(b,0):b()}},_before:p,_after:q});d.p.complete=p(d.p.complete,function(){if(this===
G)G=null});(function(){var a=false,b,c=false;d.p.loaded=p(d.p.loaded,function(){var e=typeof jQuery!=="undefined"?jQuery:null;if(e&&"readyWait"in e)if(!a){b=e;e.readyWait+=1;a=true}});d.bind("end",function(){if(a&&!c){b.ready(true);c=true}})})();d.p.load=q(d.p.load,function(){if(h.document&&!this.completed&&!this.completeTimeout&&!d.isRhino&&(this.options.protocol=="file:"||!r.error)){var a=this;this.completeTimeout=setTimeout(function(){throw"steal.js : "+a.options.src+" not completed";},5E3)}});
d.p.complete=q(d.p.complete,function(){this.completeTimeout&&clearTimeout(this.completeTimeout)});l(Q.prototype,{called:function(){this.calls--;this.go()},add:function(a,b){a=C(a,b);if(!a.called){a.callbacks.push(this);this.calls++}},go:function(){this.calls===0&&this.obj[this.meth]()}});var H={load:function(){},end:function(){}},I=false;(function(a,b,c){if(a.addEventListener)a.addEventListener(b,c,false);else a.attachEvent?a.attachEvent("on"+b,c):c()})(h,"load",function(){H.load()});d.one("end",
function(a){H.end();I=a;d.trigger("done",I)});w(H,"load",H,"end",function(){d.trigger("ready");d.isReady=true});d.events.done={add:function(a){if(I){a(I);return false}else return a}};d.p.make=q(d.p.make,function(a){if(a.options.has)a.isLoaded?a.loadHas():d.loading.apply(d,a.options.has);return a},true);d.p.loaded=p(d.p.loaded,function(){this.options.has&&this.loadHas()});d.p.loadHas=function(){var a,b,c=f.cur();for(b=0;b<this.options.has.length;b++){f.cur(c);a=d.p.make(this.options.has[b]);C(a,"complete");
a.loaded()}};var J,n={},$=function(){var a,b,c=j.getElementsByTagName("script");for(a=c.length-1;a>-1&&(b=c[a]);a--)if(b.readyState==="interactive")return b},aa=function(){var a;if(J&&J.readyState==="interactive")return J;if(a=$())return J=a;if(F&&F.readyState=="interactive")return F;return null};r.interactive=j&&!!$();if(r.interactive){d.after=q(d.after,function(){var a=aa();if(!(!a||!a.src||/steal\.(production|production\.[a-zA-Z0-9\-\.\_]*)*js/.test(a.src))){a=a.src;n[a]||(n[a]=[]);if(a){n[a].push.apply(n[a],
s);s=[]}}});d.preloaded=p(d.preloaded,function(a){a=a.options.src;var b=aa().src;n[a]=n[b];n[b]=null})}var ba=/steal\.(production\.)?js.*/,ha=function(){if(j)for(var a=j.getElementsByTagName("script"),b=0,c=a.length;b<c;b++){var e=a[b].src;if(e&&ba.test(e))return a[b]}};d.getScriptOptions=function(a){a=a||ha();var b={};if(a){a=a.src;var c=a.replace(ba,"");b.rootUrl=/steal\/$/.test(c)?c.substr(0,c.length-6):c+"../";if(/steal\.production\.js/.test(a))b.env="production";if(a.indexOf("?")!==-1){a=a.split("?")[1];
a=a.split(",");if(a[0])b.startFile=a[0];if(a[1]&&d.options.env!="production")b.env=a[1]}}return b};x=q(x,function(){var a=d.options,b=[];l(a,d.getScriptOptions());typeof D=="object"&&l(a,D);var c=h.location&&decodeURIComponent(h.location.search);c&&c.replace(/steal\[([^\]]+)\]=([^&]+)/g,function(e,g,k){e=k.split(",");if(e.length>1)k=e;a[g]=k});d.rootUrl(a.rootUrl);if(a.startFile&&a.startFile.indexOf(".")=="-1")a.startFile=a.startFile+"/"+a.startFile.match(/[^\/]+$/)[0]+".js";if(!a.logLevel)a.logLevel=
0;if(!a.production&&a.startFile)a.production=f(a.startFile).dir()+"/production.js";if(a.production)a.production+=a.production.indexOf(".js")==-1?".js":"";m(a.loaded||[],function(e,g){d.loaded(g)});if(typeof a.startFiles==="string")b.push(a.startFiles);else if(a.startFiles&&a.startFiles.length)b=a.startFiles;c=[];if(b.length){d.options.startFiles=b;c.push.apply(c,b)}if(a.instrument||!a.browser&&h.top&&h.top.opener&&h.top.opener.steal&&h.top.opener.steal.options.instrument)c.push(function(){},{src:"steal/instrument",
waits:true});if(a.env=="production"&&a.loadProduction)a.production&&d({src:a.production,force:true});else{a.loadDev!==false&&c.unshift({src:"steal/dev/dev.js",ignore:true});a.startFile&&c.push(a.startFile)}c.length&&d.apply(null,c)});d.when=w;h.steal=d;x()})();
