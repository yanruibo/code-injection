




	    function loadSkin(){
	    	document.addEventListener("deviceready", function() {
				var exitOnSkinLoader = cordova.exec(null, null, "Utils", "readPref", ["exitOnSkinLoader"]);
				if (eval(exitOnSkinLoader)) {
		    		cordova.exec(null, null, "App", "exitApp", []);
		    	} else {
		    		try{
						cordova.exec(null, null, "NativeBusyIndicator", "show", [WL.ClientMessages.loading]);
			    	} catch (e) {
			    	}
					var skinName = "default";
					if (typeof window.getSkinName == "function") {
						skinName = getSkinName();
					}
					cordova.exec(null, null, "Utils", "writePref", ["exitOnSkinLoader", "true"]);
					cordova.exec(null, null, "Utils", "writePref", ["wlSkinName", skinName]);
					cordova.exec(null, null, "Utils", "loadSkin", [skinName,"ToDo.html"]);
		    	}
			}, false);
		}
    



		// Define WL namespace.

		var WL = WL ? WL : {};



		/**

		 * WLClient configuration variables.

		 * Values are injected by the deployer that packs the gadget.

		 */

		WL.StaticAppProps = {
   "APP_DISPLAY_NAME": "ToDo",
   "APP_SERVICES_URL": "\/apps\/services\/",
   "APP_VERSION": "1.0",
   "ENVIRONMENT": "android",
   "LOGIN_DISPLAY_TYPE": "embedded",
   "WORKLIGHT_ROOT_URL": "\/apps\/services\/api\/ToDo\/android\/"
};




















window.$ = window.jQuery = WLJQ;














/* JavaScript content from wlclient/js/encryptedcache.js in Common Resources */
/*Wrapped by closure compiler to prevent namespace
									pollution*/
									(function(){var myMathRandom=Math.random,myMathFloor=Math.floor,myMathCeil=Math.ceil,myStringFromCharCode=String.fromCharCode,myDecodeURIComponent=decodeURIComponent,myEncodeURIComponent=encodeURIComponent,myUnescape=unescape,myEscape=escape,api={open:"open",close:"close",changeCredentials:"changeCredentials",destroy:"destroy",read:"read",write:"write",remove:"remove",secureRandom:"secureRandom",random:"random",keygen:"keygen"};
function a2h(a){var b="",c;for(c=0;c<a.length;c++)b+=(16>a[c]?"0":"")+a[c].toString(16);return b}function h2a(a){var b=[];a.replace(/(..)/g,function(a){b.push(parseInt(a,16))});return b}function s2a(a){var b=[],c;for(c=0;c<a.length;c++)b[c]=a.charCodeAt(c);return b}function enc_utf8(a){try{return myUnescape(myEncodeURIComponent(a))}catch(b){throw b;}}function dec_utf8(a){try{return myDecodeURIComponent(myEscape(a))}catch(b){throw b;}}
function MD5(a){function b(a,b){var c,d,e,f,g;e=a&2147483648;f=b&2147483648;c=a&1073741824;d=b&1073741824;g=(a&1073741823)+(b&1073741823);return c&d?g^2147483648^e^f:c|d?g&1073741824?g^3221225472^e^f:g^1073741824^e^f:g^e^f}function c(a,c,d,e,f,g,h){a=b(a,b(b(c&d|~c&e,f),h));return b(a<<g|a>>>32-g,c)}function d(a,c,d,e,f,g,h){a=b(a,b(b(c&e|d&~e,f),h));return b(a<<g|a>>>32-g,c)}function e(a,c,d,e,f,g,h){a=b(a,b(b(c^d^e,f),h));return b(a<<g|a>>>32-g,c)}function g(a,c,d,e,f,g,h){a=b(a,b(b(d^(c|~e),f),
h));return b(a<<g|a>>>32-g,c)}function h(a){var b,c,d=[];for(c=0;3>=c;c++)b=a>>>8*c&255,d=d.concat(b);return d}var f=[],m,o,n,p,i,k,j,l,f=function(a){var b,c=a.length;b=c+8;for(var d=16*((b-b%64)/64+1),e=[],f=0,g=0;g<c;)b=(g-g%4)/4,f=8*(g%4),e[b]|=a[g]<<f,g++;b=(g-g%4)/4;e[b]|=128<<8*(g%4);e[d-2]=c<<3;e[d-1]=c>>>29;return e}(a);i=1732584193;k=4023233417;j=2562383102;l=271733878;for(a=0;a<f.length;a+=16)m=i,o=k,n=j,p=l,i=c(i,k,j,l,f[a+0],7,3614090360),l=c(l,i,k,j,f[a+1],12,3905402710),j=c(j,l,i,k,
f[a+2],17,606105819),k=c(k,j,l,i,f[a+3],22,3250441966),i=c(i,k,j,l,f[a+4],7,4118548399),l=c(l,i,k,j,f[a+5],12,1200080426),j=c(j,l,i,k,f[a+6],17,2821735955),k=c(k,j,l,i,f[a+7],22,4249261313),i=c(i,k,j,l,f[a+8],7,1770035416),l=c(l,i,k,j,f[a+9],12,2336552879),j=c(j,l,i,k,f[a+10],17,4294925233),k=c(k,j,l,i,f[a+11],22,2304563134),i=c(i,k,j,l,f[a+12],7,1804603682),l=c(l,i,k,j,f[a+13],12,4254626195),j=c(j,l,i,k,f[a+14],17,2792965006),k=c(k,j,l,i,f[a+15],22,1236535329),i=d(i,k,j,l,f[a+1],5,4129170786),l=
d(l,i,k,j,f[a+6],9,3225465664),j=d(j,l,i,k,f[a+11],14,643717713),k=d(k,j,l,i,f[a+0],20,3921069994),i=d(i,k,j,l,f[a+5],5,3593408605),l=d(l,i,k,j,f[a+10],9,38016083),j=d(j,l,i,k,f[a+15],14,3634488961),k=d(k,j,l,i,f[a+4],20,3889429448),i=d(i,k,j,l,f[a+9],5,568446438),l=d(l,i,k,j,f[a+14],9,3275163606),j=d(j,l,i,k,f[a+3],14,4107603335),k=d(k,j,l,i,f[a+8],20,1163531501),i=d(i,k,j,l,f[a+13],5,2850285829),l=d(l,i,k,j,f[a+2],9,4243563512),j=d(j,l,i,k,f[a+7],14,1735328473),k=d(k,j,l,i,f[a+12],20,2368359562),
i=e(i,k,j,l,f[a+5],4,4294588738),l=e(l,i,k,j,f[a+8],11,2272392833),j=e(j,l,i,k,f[a+11],16,1839030562),k=e(k,j,l,i,f[a+14],23,4259657740),i=e(i,k,j,l,f[a+1],4,2763975236),l=e(l,i,k,j,f[a+4],11,1272893353),j=e(j,l,i,k,f[a+7],16,4139469664),k=e(k,j,l,i,f[a+10],23,3200236656),i=e(i,k,j,l,f[a+13],4,681279174),l=e(l,i,k,j,f[a+0],11,3936430074),j=e(j,l,i,k,f[a+3],16,3572445317),k=e(k,j,l,i,f[a+6],23,76029189),i=e(i,k,j,l,f[a+9],4,3654602809),l=e(l,i,k,j,f[a+12],11,3873151461),j=e(j,l,i,k,f[a+15],16,530742520),
k=e(k,j,l,i,f[a+2],23,3299628645),i=g(i,k,j,l,f[a+0],6,4096336452),l=g(l,i,k,j,f[a+7],10,1126891415),j=g(j,l,i,k,f[a+14],15,2878612391),k=g(k,j,l,i,f[a+5],21,4237533241),i=g(i,k,j,l,f[a+12],6,1700485571),l=g(l,i,k,j,f[a+3],10,2399980690),j=g(j,l,i,k,f[a+10],15,4293915773),k=g(k,j,l,i,f[a+1],21,2240044497),i=g(i,k,j,l,f[a+8],6,1873313359),l=g(l,i,k,j,f[a+15],10,4264355552),j=g(j,l,i,k,f[a+6],15,2734768916),k=g(k,j,l,i,f[a+13],21,1309151649),i=g(i,k,j,l,f[a+4],6,4149444226),l=g(l,i,k,j,f[a+11],10,3174756917),
j=g(j,l,i,k,f[a+2],15,718787259),k=g(k,j,l,i,f[a+9],21,3951481745),i=b(i,m),k=b(k,o),j=b(j,n),l=b(l,p);return h(i).concat(h(k),h(j),h(l))}var hexcase=0,b64pad="",chrsz=8;function hex_sha1(a){return binb2hex(core_sha1(str2binb(a),a.length*chrsz))}function b64_sha1(a){return binb2b64(core_sha1(str2binb(a),a.length*chrsz))}function str_sha1(a){return binb2str(core_sha1(str2binb(a),a.length*chrsz))}function hex_hmac_sha1(a,b){return binb2hex(core_hmac_sha1(a,b))}
function b64_hmac_sha1(a,b){return binb2b64(core_hmac_sha1(a,b))}function str_hmac_sha1(a,b){return binb2str(core_hmac_sha1(a,b))}
function core_sha1(a,b){a[b>>5]|=128<<24-b%32;a[(b+64>>9<<4)+15]=b;for(var c=Array(80),d=1732584193,e=-271733879,g=-1732584194,h=271733878,f=-1009589776,m=0;m<a.length;m+=16){for(var o=d,n=e,p=g,i=h,k=f,j=0;80>j;j++){c[j]=16>j?a[m+j]:rol(c[j-3]^c[j-8]^c[j-14]^c[j-16],1);var l=safe_add(safe_add(rol(d,5),sha1_ft(j,e,g,h)),safe_add(safe_add(f,c[j]),sha1_kt(j))),f=h,h=g,g=rol(e,30),e=d,d=l}d=safe_add(d,o);e=safe_add(e,n);g=safe_add(g,p);h=safe_add(h,i);f=safe_add(f,k)}return[d,e,g,h,f]}
function sha1_ft(a,b,c,d){return 20>a?b&c|~b&d:40>a?b^c^d:60>a?b&c|b&d|c&d:b^c^d}function sha1_kt(a){return 20>a?1518500249:40>a?1859775393:60>a?-1894007588:-899497514}function core_hmac_sha1(a,b){var c=str2binb(a);16<c.length&&(c=core_sha1(c,a.length*chrsz));for(var d=Array(16),e=Array(16),g=0;16>g;g++)d[g]=c[g]^909522486,e[g]=c[g]^1549556828;c=core_sha1(d.concat(str2binb(b)),512+b.length*chrsz);return core_sha1(e.concat(c),672)}
function safe_add(a,b){var c=(a&65535)+(b&65535);return(a>>16)+(b>>16)+(c>>16)<<16|c&65535}function rol(a,b){return a<<b|a>>>32-b}function str2binb(a){for(var b=[],c=(1<<chrsz)-1,d=0;d<a.length*chrsz;d+=chrsz)b[d>>5]|=(a.charCodeAt(d/chrsz)&c)<<32-chrsz-d%32;return b}function binb2str(a){for(var b="",c=(1<<chrsz)-1,d=0;d<32*a.length;d+=chrsz)b+=myStringFromCharCode(a[d>>5]>>>32-chrsz-d%32&c);return b}
function binb2hex(a){for(var b=hexcase?"0123456789ABCDEF":"0123456789abcdef",c="",d=0;d<4*a.length;d++)c+=b.charAt(a[d>>2]>>8*(3-d%4)+4&15)+b.charAt(a[d>>2]>>8*(3-d%4)&15);return c}function binb2b64(a){for(var b="",c=0;c<4*a.length;c+=3)for(var d=(a[c>>2]>>8*(3-c%4)&255)<<16|(a[c+1>>2]>>8*(3-(c+1)%4)&255)<<8|a[c+2>>2]>>8*(3-(c+2)%4)&255,e=0;4>e;e++)b=8*c+6*e>32*a.length?b+b64pad:b+"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".charAt(d>>6*(3-e)&63);return b}
function SHA256(a){function b(a,b){var c=(a&65535)+(b&65535);return(a>>16)+(b>>16)+(c>>16)<<16|c&65535}function c(a,b){return a>>>b|a<<32-b}a=function(a){for(var a=a.replace(/\r\n/g,"\n"),b="",c=0;c<a.length;c++){var h=a.charCodeAt(c);128>h?b+=myStringFromCharCode(h):(127<h&&2048>h?b+=myStringFromCharCode(h>>6|192):(b+=myStringFromCharCode(h>>12|224),b+=myStringFromCharCode(h>>6&63|128)),b+=myStringFromCharCode(h&63|128))}return b}(a);return function(a){for(var b="",c=0;c<4*a.length;c++)b+="0123456789abcdef".charAt(a[c>>
2]>>8*(3-c%4)+4&15)+"0123456789abcdef".charAt(a[c>>2]>>8*(3-c%4)&15);return b}(function(a,e){var g=[1116352408,1899447441,3049323471,3921009573,961987163,1508970993,2453635748,2870763221,3624381080,310598401,607225278,1426881987,1925078388,2162078206,2614888103,3248222580,3835390401,4022224774,264347078,604807628,770255983,1249150122,1555081692,1996064986,2554220882,2821834349,2952996808,3210313671,3336571891,3584528711,113926993,338241895,666307205,773529912,1294757372,1396182291,1695183700,1986661051,
2177026350,2456956037,2730485921,2820302411,3259730800,3345764771,3516065817,3600352804,4094571909,275423344,430227734,506948616,659060556,883997877,958139571,1322822218,1537002063,1747873779,1955562222,2024104815,2227730452,2361852424,2428436474,2756734187,3204031479,3329325298],h=[1779033703,3144134277,1013904242,2773480762,1359893119,2600822924,528734635,1541459225],f=Array(64),m,o,n,p,i,k,j,l,r,q,t,u;a[e>>5]|=128<<24-e%32;a[(e+64>>9<<4)+15]=e;for(r=0;r<a.length;r+=16){m=h[0];o=h[1];n=h[2];p=h[3];
i=h[4];k=h[5];j=h[6];l=h[7];for(q=0;64>q;q++)f[q]=16>q?a[q+r]:b(b(b(c(f[q-2],17)^c(f[q-2],19)^f[q-2]>>>10,f[q-7]),c(f[q-15],7)^c(f[q-15],18)^f[q-15]>>>3),f[q-16]),t=b(b(b(b(l,c(i,6)^c(i,11)^c(i,25)),i&k^~i&j),g[q]),f[q]),u=b(c(m,2)^c(m,13)^c(m,22),m&o^m&n^o&n),l=j,j=k,k=i,i=b(p,t),p=n,n=o,o=m,m=b(t,u);h[0]=b(m,h[0]);h[1]=b(o,h[1]);h[2]=b(n,h[2]);h[3]=b(p,h[3]);h[4]=b(i,h[4]);h[5]=b(k,h[5]);h[6]=b(j,h[6]);h[7]=b(l,h[7])}return h}(function(a){for(var b=[],c=0;c<8*a.length;c+=8)b[c>>5]|=(a.charCodeAt(c/
8)&255)<<24-c%32;return b}(a),8*a.length))}var sjcl={cipher:{},hash:{},keyexchange:{},mode:{},misc:{},codec:{},exception:{corrupt:function(a){this.toString=function(){return"CORRUPT: "+this.message};this.message=a},invalid:function(a){this.toString=function(){return"INVALID: "+this.message};this.message=a},bug:function(a){this.toString=function(){return"BUG: "+this.message};this.message=a},notReady:function(a){this.toString=function(){return"NOT READY: "+this.message};this.message=a}}};
if("undefined"!=typeof module&&module.exports)module.exports=sjcl;sjcl.cipher.aes=function(a){this.h[0][0][0]||this.u();var b,c,d,e=this.h[0][4];b=a.length;var g=1;if(4!==b&&6!==b&&8!==b)throw new sjcl.exception.invalid("invalid aes key size");this.a=[d=a.slice(0),[]];for(a=b;a<4*b+28;a++){c=d[a-1];if(0===a%b||8===b&&4===a%b)c=e[c>>>24]<<24^e[c>>16&255]<<16^e[c>>8&255]<<8^e[c&255],0===a%b&&(c=c<<8^c>>>24^g<<24,g=g<<1^283*(g>>7));d[a]=d[a-b]^c}for(b=0;a;b++,a--);};
sjcl.cipher.aes.prototype={encrypt:function(a){return this.F(a,0)},decrypt:function(a){return this.F(a,1)},h:[[[],[],[],[],[]],[[],[],[],[],[]]],u:function(){var a=this.h[0],b=this.h[1],c=a[4],d=b[4],e,g,h,f=[],m=[],o,n,p,i;for(e=0;256>e;e++)m[(f[e]=e<<1^283*(e>>7))^e]=e;for(g=h=0;!c[g];g^=o||1,h=m[h]||1){p=h^h<<1^h<<2^h<<3^h<<4;p=p>>8^p&255^99;c[g]=p;d[p]=g;n=f[e=f[o=f[g]]];i=16843009*n^65537*e^257*o^16843008*g;n=257*f[p]^16843008*p;for(e=0;4>e;e++)a[e][g]=n=n<<24^n>>>8,b[e][p]=i=i<<24^i>>>8}for(e=
0;5>e;e++)a[e]=a[e].slice(0),b[e]=b[e].slice(0)},F:function(a,b){if(4!==a.length)throw new sjcl.exception.invalid("invalid aes block size");var c=this.a[b],d=a[0]^c[0],e=a[b?3:1]^c[1],g=a[2]^c[2],a=a[b?1:3]^c[3],h,f,m,o=c.length/4-2,n,p=4,i=[0,0,0,0];h=this.h[b];var k=h[0],j=h[1],l=h[2],r=h[3],q=h[4];for(n=0;n<o;n++)h=k[d>>>24]^j[e>>16&255]^l[g>>8&255]^r[a&255]^c[p],f=k[e>>>24]^j[g>>16&255]^l[a>>8&255]^r[d&255]^c[p+1],m=k[g>>>24]^j[a>>16&255]^l[d>>8&255]^r[e&255]^c[p+2],a=k[a>>>24]^j[d>>16&255]^l[e>>
8&255]^r[g&255]^c[p+3],p+=4,d=h,e=f,g=m;for(n=0;4>n;n++)i[b?3&-n:n]=q[d>>>24]<<24^q[e>>16&255]<<16^q[g>>8&255]<<8^q[a&255]^c[p++],h=d,d=e,e=g,g=a,a=h;return i}};
sjcl.bitArray={bitSlice:function(a,b,c){a=sjcl.bitArray.N(a.slice(b/32),32-(b&31)).slice(1);return void 0===c?a:sjcl.bitArray.clamp(a,c-b)},extract:function(a,b,c){var d=Math.floor(-b-c&31);return((b+c-1^b)&-32?a[b/32|0]<<32-d^a[b/32+1|0]>>>d:a[b/32|0]>>>d)&(1<<c)-1},concat:function(a,b){if(0===a.length||0===b.length)return a.concat(b);var c=a[a.length-1],d=sjcl.bitArray.getPartial(c);return 32===d?a.concat(b):sjcl.bitArray.N(b,d,c|0,a.slice(0,a.length-1))},bitLength:function(a){var b=a.length;return 0===
b?0:32*(b-1)+sjcl.bitArray.getPartial(a[b-1])},clamp:function(a,b){if(32*a.length<b)return a;var a=a.slice(0,Math.ceil(b/32)),c=a.length,b=b&31;0<c&&b&&(a[c-1]=sjcl.bitArray.partial(b,a[c-1]&2147483648>>b-1,1));return a},partial:function(a,b,c){return 32===a?b:(c?b|0:b<<32-a)+1099511627776*a},getPartial:function(a){return Math.round(a/1099511627776)||32},equal:function(a,b){if(sjcl.bitArray.bitLength(a)!==sjcl.bitArray.bitLength(b))return!1;var c=0,d;for(d=0;d<a.length;d++)c|=a[d]^b[d];return 0===
c},N:function(a,b,c,d){var e;for(void 0===d&&(d=[]);32<=b;b-=32)d.push(c),c=0;if(0===b)return d.concat(a);for(e=0;e<a.length;e++)d.push(c|a[e]>>>b),c=a[e]<<32-b;e=a.length?a[a.length-1]:0;a=sjcl.bitArray.getPartial(e);d.push(sjcl.bitArray.partial(b+a&31,32<b+a?c:d.pop(),1));return d},O:function(a,b){return[a[0]^b[0],a[1]^b[1],a[2]^b[2],a[3]^b[3]]}};
sjcl.codec.utf8String={fromBits:function(a){var b="",c=sjcl.bitArray.bitLength(a),d,e;for(d=0;d<c/8;d++)0===(d&3)&&(e=a[d/4]),b+=String.fromCharCode(e>>>24),e<<=8;return decodeURIComponent(escape(b))},toBits:function(a){var a=unescape(encodeURIComponent(a)),b=[],c,d=0;for(c=0;c<a.length;c++)d=d<<8|a.charCodeAt(c),3===(c&3)&&(b.push(d),d=0);c&3&&b.push(sjcl.bitArray.partial(8*(c&3),d));return b}};
sjcl.codec.hex={fromBits:function(a){var b="",c;for(c=0;c<a.length;c++)b+=((a[c]|0)+263882790666240).toString(16).substr(4);return b.substr(0,sjcl.bitArray.bitLength(a)/4)},toBits:function(a){var b,c=[],d,a=a.replace(/\s|0x/g,"");d=a.length;a+="00000000";for(b=0;b<a.length;b+=8)c.push(parseInt(a.substr(b,8),16)^0);return sjcl.bitArray.clamp(c,4*d)}};
sjcl.codec.base64={B:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",fromBits:function(a,b,c){var d="",e=0,g=sjcl.codec.base64.B,h=0,f=sjcl.bitArray.bitLength(a);c&&(g=g.substr(0,62)+"-_");for(c=0;6*d.length<f;)d+=g.charAt((h^a[c]>>>e)>>>26),6>e?(h=a[c]<<6-e,e+=26,c++):(h<<=6,e-=6);for(;d.length&3&&!b;)d+="=";return d},toBits:function(a,b){var a=a.replace(/\s|=/g,""),c=[],d=0,e=sjcl.codec.base64.B,g=0,h;b&&(e=e.substr(0,62)+"-_");for(b=0;b<a.length;b++){h=e.indexOf(a.charAt(b));
if(0>h)throw new sjcl.exception.invalid("this isn't base64!");26<d?(d-=26,c.push(g^h>>>d),g=h<<32-d):(d+=6,g^=h<<32-d)}d&56&&c.push(sjcl.bitArray.partial(d&56,g,1));return c}};sjcl.codec.base64url={fromBits:function(a){return sjcl.codec.base64.fromBits(a,1,1)},toBits:function(a){return sjcl.codec.base64.toBits(a,1)}};sjcl.hash.sha256=function(a){this.a[0]||this.u();a?(this.m=a.m.slice(0),this.i=a.i.slice(0),this.e=a.e):this.reset()};sjcl.hash.sha256.hash=function(a){return(new sjcl.hash.sha256).update(a).finalize()};
sjcl.hash.sha256.prototype={blockSize:512,reset:function(){this.m=this.L.slice(0);this.i=[];this.e=0;return this},update:function(a){"string"===typeof a&&(a=sjcl.codec.utf8String.toBits(a));var b,c=this.i=sjcl.bitArray.concat(this.i,a);b=this.e;a=this.e=b+sjcl.bitArray.bitLength(a);for(b=512+b&-512;b<=a;b+=512)this.A(c.splice(0,16));return this},finalize:function(){var a,b=this.i,c=this.m,b=sjcl.bitArray.concat(b,[sjcl.bitArray.partial(1,1)]);for(a=b.length+2;a&15;a++)b.push(0);b.push(Math.floor(this.e/
4294967296));for(b.push(this.e|0);b.length;)this.A(b.splice(0,16));this.reset();return c},L:[],a:[],u:function(){function a(a){return 4294967296*(a-Math.floor(a))|0}var b=0,c=2,d;a:for(;64>b;c++){for(d=2;d*d<=c;d++)if(0===c%d)continue a;8>b&&(this.L[b]=a(Math.pow(c,0.5)));this.a[b]=a(Math.pow(c,1/3));b++}},A:function(a){for(var b,c,d=a.slice(0),e=this.m,g=this.a,h=e[0],f=e[1],m=e[2],o=e[3],n=e[4],p=e[5],i=e[6],k=e[7],a=0;64>a;a++)16>a?b=d[a]:(b=d[a+1&15],c=d[a+14&15],b=d[a&15]=(b>>>7^b>>>18^b>>>3^
b<<25^b<<14)+(c>>>17^c>>>19^c>>>10^c<<15^c<<13)+d[a&15]+d[a+9&15]|0),b=b+k+(n>>>6^n>>>11^n>>>25^n<<26^n<<21^n<<7)+(i^n&(p^i))+g[a],k=i,i=p,p=n,n=o+b|0,o=m,m=f,f=h,h=b+(f&m^o&(f^m))+(f>>>2^f>>>13^f>>>22^f<<30^f<<19^f<<10)|0;e[0]=e[0]+h|0;e[1]=e[1]+f|0;e[2]=e[2]+m|0;e[3]=e[3]+o|0;e[4]=e[4]+n|0;e[5]=e[5]+p|0;e[6]=e[6]+i|0;e[7]=e[7]+k|0}};
sjcl.mode.ccm={name:"ccm",encrypt:function(a,b,c,d,e){var g,h=b.slice(0),f=sjcl.bitArray,m=f.bitLength(c)/8,o=f.bitLength(h)/8,e=e||64,d=d||[];if(7>m)throw new sjcl.exception.invalid("ccm: iv must be at least 7 bytes");for(g=2;4>g&&o>>>8*g;g++);g<15-m&&(g=15-m);c=f.clamp(c,8*(15-g));b=sjcl.mode.ccm.D(a,b,c,d,e,g);h=sjcl.mode.ccm.G(a,h,c,b,e,g);return f.concat(h.data,h.tag)},decrypt:function(a,b,c,d,e){var e=e||64,d=d||[],g=sjcl.bitArray,h=g.bitLength(c)/8,f=g.bitLength(b),m=g.clamp(b,f-e),o=g.bitSlice(b,
f-e),f=(f-e)/8;if(7>h)throw new sjcl.exception.invalid("ccm: iv must be at least 7 bytes");for(b=2;4>b&&f>>>8*b;b++);b<15-h&&(b=15-h);c=g.clamp(c,8*(15-b));m=sjcl.mode.ccm.G(a,m,c,o,e,b);a=sjcl.mode.ccm.D(a,m.data,c,d,e,b);if(!g.equal(m.tag,a))throw new sjcl.exception.corrupt("ccm: tag doesn't match");return m.data},D:function(a,b,c,d,e,g){var h=[],f=sjcl.bitArray,m=f.O,e=e/8;if(e%2||4>e||16<e)throw new sjcl.exception.invalid("ccm: invalid tag length");if(4294967295<d.length||4294967295<b.length)throw new sjcl.exception.bug("ccm: can't deal with 4GiB or more data");
g=[f.partial(8,(d.length?64:0)|e-2<<2|g-1)];g=f.concat(g,c);g[3]|=f.bitLength(b)/8;g=a.encrypt(g);if(d.length){c=f.bitLength(d)/8;65279>=c?h=[f.partial(16,c)]:4294967295>=c&&(h=f.concat([f.partial(16,65534)],[c]));h=f.concat(h,d);for(d=0;d<h.length;d+=4)g=a.encrypt(m(g,h.slice(d,d+4).concat([0,0,0])))}for(d=0;d<b.length;d+=4)g=a.encrypt(m(g,b.slice(d,d+4).concat([0,0,0])));return f.clamp(g,8*e)},G:function(a,b,c,d,e,g){var h,f=sjcl.bitArray;h=f.O;var m=b.length,o=f.bitLength(b),c=f.concat([f.partial(8,
g-1)],c).concat([0,0,0]).slice(0,4),d=f.bitSlice(h(d,a.encrypt(c)),0,e);if(!m)return{tag:d,data:[]};for(h=0;h<m;h+=4)c[3]++,e=a.encrypt(c),b[h]^=e[0],b[h+1]^=e[1],b[h+2]^=e[2],b[h+3]^=e[3];return{tag:d,data:f.clamp(b,o)}}};sjcl.misc.hmac=function(a,b){this.K=b=b||sjcl.hash.sha256;var c=[[],[]],d=b.prototype.blockSize/32;this.k=[new b,new b];a.length>d&&(a=b.hash(a));for(b=0;b<d;b++)c[0][b]=a[b]^909522486,c[1][b]=a[b]^1549556828;this.k[0].update(c[0]);this.k[1].update(c[1])};
sjcl.misc.hmac.prototype.encrypt=sjcl.misc.hmac.prototype.mac=function(a,b){a=(new this.K(this.k[0])).update(a,b).finalize();return(new this.K(this.k[1])).update(a).finalize()};
sjcl.misc.pbkdf2=function(a,b,c,d,e){c=c||1E3;if(0>d||0>c)throw sjcl.exception.invalid("invalid params to pbkdf2");"string"===typeof a&&(a=sjcl.codec.utf8String.toBits(a));var e=e||sjcl.misc.hmac,a=new e(a),g,h,f,m,o=[],n=sjcl.bitArray;for(m=1;32*o.length<(d||1);m++){e=g=a.encrypt(n.concat(b,[m]));for(h=1;h<c;h++){g=a.encrypt(g);for(f=0;f<g.length;f++)e[f]^=g[f]}o=o.concat(e)}d&&(o=n.clamp(o,d));return o};
sjcl.random={randomWords:function(a,b){var c=[],b=this.isReady(b),d;if(0===b)throw new sjcl.exception.notReady("generator isn't seeded");b&2&&this.T(!(b&1));for(b=0;b<a;b+=4)0===(b+1)%65536&&this.J(),d=this.t(),c.push(d[0],d[1],d[2],d[3]);this.J();return c.slice(0,a)},setDefaultParanoia:function(a){this.s=a},addEntropy:function(a,b,c){var c=c||"user",d,e,g=(new Date).valueOf(),h=this.p[c],f=this.isReady();d=this.C[c];void 0===d&&(d=this.C[c]=this.Q++);void 0===h&&(h=this.p[c]=0);this.p[c]=(this.p[c]+
1)%this.b.length;switch(typeof a){case "number":break;case "object":if(void 0===b)for(c=b=0;c<a.length;c++)for(e=a[c];0<e;)b++,e>>>=1;this.b[h].update([d,this.H++,2,b,g,a.length].concat(a));break;case "string":if(void 0===b)b=a.length;this.b[h].update([d,this.H++,3,b,g,a.length]);this.b[h].update(a);break;default:throw new sjcl.exception.bug("random: addEntropy only supports number, array or string");}this.j[h]+=b;this.f+=b;0===f&&(0!==this.isReady()&&this.I("seeded",Math.max(this.g,this.f)),this.I("progress",
this.getProgress()))},isReady:function(a){a=this.z[void 0!==a?a:this.s];return this.g&&this.g>=a?80<this.j[0]&&(new Date).valueOf()>this.M?3:1:this.f>=a?2:0},getProgress:function(a){a=this.z[a?a:this.s];return this.g>=a?1["0"]:this.f>a?1["0"]:this.f/a},startCollectors:function(){if(!this.l){if(window.addEventListener)window.addEventListener("load",this.n,!1),window.addEventListener("mousemove",this.o,!1);else if(document.attachEvent)document.attachEvent("onload",this.n),document.attachEvent("onmousemove",
this.o);else throw new sjcl.exception.bug("can't attach event");this.l=!0}},stopCollectors:function(){if(this.l)window.removeEventListener?(window.removeEventListener("load",this.n,!1),window.removeEventListener("mousemove",this.o,!1)):window.detachEvent&&(window.detachEvent("onload",this.n),window.detachEvent("onmousemove",this.o)),this.l=!1},addEventListener:function(a,b){this.q[a][this.P++]=b},removeEventListener:function(a,b){var c,a=this.q[a],d=[];for(c in a)a.hasOwnProperty(c)&&a[c]===b&&d.push(c);
for(b=0;b<d.length;b++)c=d[b],delete a[c]},b:[new sjcl.hash.sha256],j:[0],w:0,p:{},H:0,C:{},Q:0,g:0,f:0,M:0,a:[0,0,0,0,0,0,0,0],d:[0,0,0,0],r:void 0,s:6,l:!1,q:{progress:{},seeded:{}},P:0,z:[0,48,64,96,128,192,256,384,512,768,1024],t:function(){for(var a=0;4>a&&!(this.d[a]=this.d[a]+1|0,this.d[a]);a++);return this.r.encrypt(this.d)},J:function(){this.a=this.t().concat(this.t());this.r=new sjcl.cipher.aes(this.a)},S:function(a){this.a=sjcl.hash.sha256.hash(this.a.concat(a));this.r=new sjcl.cipher.aes(this.a);
for(a=0;4>a&&!(this.d[a]=this.d[a]+1|0,this.d[a]);a++);},T:function(a){var b=[],c=0,d;this.M=b[0]=(new Date).valueOf()+3E4;for(d=0;16>d;d++)b.push(4294967296*Math.random()|0);for(d=0;d<this.b.length&&!(b=b.concat(this.b[d].finalize()),c+=this.j[d],this.j[d]=0,!a&&this.w&1<<d);d++);this.w>=1<<this.b.length&&(this.b.push(new sjcl.hash.sha256),this.j.push(0));this.f-=c;if(c>this.g)this.g=c;this.w++;this.S(b)},o:function(a){sjcl.random.addEntropy([a.x||a.clientX||a.offsetX,a.y||a.clientY||a.offsetY],
2,"mouse")},n:function(){sjcl.random.addEntropy(new Date,2,"loadtime")},I:function(a,b){var c,a=sjcl.random.q[a],d=[];for(c in a)a.hasOwnProperty(c)&&d.push(a[c]);for(c=0;c<d.length;c++)d[c](b)}};try{var s=new Uint32Array(32);crypto.getRandomValues(s);sjcl.random.addEntropy(s,1024,"crypto['getRandomValues']")}catch(t$$3){}
sjcl.json={defaults:{v:1,iter:1E3,ks:128,ts:64,mode:"ccm",adata:"",cipher:"aes"},encrypt:function(a,b,c,d){var c=c||{},d=d||{},e=sjcl.json,g=e.c({iv:sjcl.random.randomWords(4,0)},e.defaults),h;e.c(g,c);c=g.adata;if("string"===typeof g.salt)g.salt=sjcl.codec.base64.toBits(g.salt);if("string"===typeof g.iv)g.iv=sjcl.codec.base64.toBits(g.iv);if(!sjcl.mode[g.mode]||!sjcl.cipher[g.cipher]||"string"===typeof a&&100>=g.iter||64!==g.ts&&96!==g.ts&&128!==g.ts||128!==g.ks&&192!==g.ks&&256!==g.ks||2>g.iv.length||
4<g.iv.length)throw new sjcl.exception.invalid("json encrypt: invalid parameters");if("string"===typeof a)h=sjcl.misc.cachedPbkdf2(a,g),a=h.key.slice(0,g.ks/32),g.salt=h.salt;"string"===typeof b&&(b=sjcl.codec.utf8String.toBits(b));"string"===typeof c&&(c=sjcl.codec.utf8String.toBits(c));h=new sjcl.cipher[g.cipher](a);e.c(d,g);d.key=a;g.ct=sjcl.mode[g.mode].encrypt(h,b,g.iv,c,g.ts);return e.encode(g)},decrypt:function(a,b,c,d){var c=c||{},d=d||{},e=sjcl.json,b=e.c(e.c(e.c({},e.defaults),e.decode(b)),
c,!0),g,c=b.adata;if("string"===typeof b.salt)b.salt=sjcl.codec.base64.toBits(b.salt);if("string"===typeof b.iv)b.iv=sjcl.codec.base64.toBits(b.iv);if(!sjcl.mode[b.mode]||!sjcl.cipher[b.cipher]||"string"===typeof a&&100>=b.iter||64!==b.ts&&96!==b.ts&&128!==b.ts||128!==b.ks&&192!==b.ks&&256!==b.ks||!b.iv||2>b.iv.length||4<b.iv.length)throw new sjcl.exception.invalid("json decrypt: invalid parameters");if("string"===typeof a)g=sjcl.misc.cachedPbkdf2(a,b),a=g.key.slice(0,b.ks/32),b.salt=g.salt;"string"===
typeof c&&(c=sjcl.codec.utf8String.toBits(c));g=new sjcl.cipher[b.cipher](a);c=sjcl.mode[b.mode].decrypt(g,b.ct,b.iv,c,b.ts);e.c(d,b);d.key=a;return sjcl.codec.utf8String.fromBits(c)},encode:function(a){var b,c="{",d="";for(b in a)if(a.hasOwnProperty(b)){if(!b.match(/^[a-z0-9]+$/i))throw new sjcl.exception.invalid("json encode: invalid property name");c+=d+'"'+b+'":';d=",";switch(typeof a[b]){case "number":case "boolean":c+=a[b];break;case "string":c+='"'+escape(a[b])+'"';break;case "object":c+='"'+
sjcl.codec.base64.fromBits(a[b],1)+'"';break;default:throw new sjcl.exception.bug("json encode: unsupported type");}}return c+"}"},decode:function(a){a=a.replace(/\s/g,"");if(!a.match(/^\{.*\}$/))throw new sjcl.exception.invalid("json decode: this isn't json!");var a=a.replace(/^\{|\}$/g,"").split(/,/),b={},c,d;for(c=0;c<a.length;c++){if(!(d=a[c].match(/^(?:(["']?)([a-z][a-z0-9]*)\1):(?:(\d+)|"([a-z0-9+\/%*_.@=\-]*)")$/i)))throw new sjcl.exception.invalid("json decode: this isn't json!");b[d[2]]=
d[3]?parseInt(d[3],10):d[2].match(/^(ct|salt|iv)$/)?sjcl.codec.base64.toBits(d[4]):unescape(d[4])}return b},c:function(a,b,c){void 0===a&&(a={});if(void 0===b)return a;for(var d in b)if(b.hasOwnProperty(d)){if(c&&void 0!==a[d]&&a[d]!==b[d])throw new sjcl.exception.invalid("required parameter overridden");a[d]=b[d]}return a},V:function(a,b){var c={},d;for(d in a)a.hasOwnProperty(d)&&a[d]!==b[d]&&(c[d]=a[d]);return c},U:function(a,b){var c={},d;for(d=0;d<b.length;d++)void 0!==a[b[d]]&&(c[b[d]]=a[b[d]]);
return c}};sjcl.encrypt=sjcl.json.encrypt;sjcl.decrypt=sjcl.json.decrypt;sjcl.misc.R={};sjcl.misc.cachedPbkdf2=function(a,b){var f;var e;var c=sjcl.misc.R,d,b=b||{};d=b.iter||1E3;e=c[a]=c[a]||{},c=e;f=c[d]=c[d]||{firstSalt:b.salt&&b.salt.length?b.salt.slice(0):sjcl.random.randomWords(2,0)},d=f;c=void 0===b.salt?d.firstSalt:b.salt;d[c]=d[c]||sjcl.misc.pbkdf2(a,c,b.iter);return{key:d[c].slice(0),salt:c.slice(0)}};
var Base64={encode:function(a){a=sjcl.codec.utf8String.toBits(a);return sjcl.codec.base64.fromBits(a)},decode:function(a){a=sjcl.codec.base64.toBits(a);return sjcl.codec.utf8String.fromBits(a)}};
function EncryptedCache(){this.STORAGE_PREFIX="__$WLEOC__";this.SALT_KEY="__$WLEOC_SALT";this.CIPHER_KEY="__$WLEOC_CIPHER";this.DPK_KEY_DERIVATION_ITERATIONS=this.CBK_KEY_DERIVATION_ITERATIONS=1E3;this.keyCreationContext=this.DPK=null;WL.Client.getEnvironment()===WL.Environment.ANDROID||WL.Client.getEnvironment()===WL.Environment.IPHONE||WL.Client.getEnvironment()===WL.Environment.IPAD?(this[api.keygen]=new NativePBKDF2,this.encryptor=new NativeEncryptor):(this[api.keygen]=new WebBasedPBKDF2,this.encryptor=
new WebBasedEncryptor)}
var OK=EncryptedCache.prototype.OK=0,ERROR_NO_EOC=EncryptedCache.prototype.ERROR_NO_EOC=1,ERROR_CREDENTIALS_MISMATCH=EncryptedCache.prototype.ERROR_CREDENTIALS_MISMATCH=2,ERROR_EOC_TO_BE_DELETED=EncryptedCache.prototype.ERROR_EOC_TO_BE_DELETED=3,ERROR_EOC_DELETED=EncryptedCache.prototype.ERROR_EOC_DELETED=4,ERROR_UNSAFE_CREDENTIALS=EncryptedCache.prototype.ERROR_UNSAFE_CREDENTIALS=5,ERROR_EOC_CLOSED=EncryptedCache.prototype.ERROR_EOC_CLOSED=6,ERROR_NO_SUCH_KEY=EncryptedCache.prototype.ERROR_NO_SUCH_KEY=7,
ERROR_LOCAL_STORAGE_NOT_SUPPORTED=EncryptedCache.prototype.ERROR_LOCAL_STORAGE_NOT_SUPPORTED=8,ERROR_KEY_CREATION_IN_PROGRESS=EncryptedCache.prototype.ERROR_KEY_CREATION_IN_PROGRESS=9,ERROR_SECURE_RANDOM_GENERATOR_UNAVAILABLE=EncryptedCache.prototype.ERROR_SECURE_RANDOM_GENERATOR_UNAVAILABLE=10,ERROR_COULD_NOT_GENERATE_KEY=EncryptedCache.prototype.ERROR_COULD_NOT_GENERATE_KEY=11,ERROR_INVALID_PARAMETER=EncryptedCache.prototype.ERROR_INVALID_PARAMETER=12,ERROR_UNKNOWN=EncryptedCache.prototype.ERROR_UNKNOWN=
13;EncryptedCache.prototype[api.close]=function(a,b){WL.Validators.validateArguments([WL.Validators.validateFunctionOrNull,WL.Validators.validateFunctionOrNull],arguments,"WL.EncryptedCache.close");if(this.keyCreationContext){if(b)return b(ERROR_KEY_CREATION_IN_PROGRESS);throw ERROR_KEY_CREATION_IN_PROGRESS;}this.DPK=null;a&&a(OK)};EncryptedCache.prototype[api.random]=function(){return myMathRandom()};
EncryptedCache.prototype[api.secureRandom]=function(a){WL.Validators.validateArguments([WL.Validators.validateFunctionOrNull],arguments,"WL.EncryptedCache.close");var b;b=WL.EnvProfile.isEnabled(WL.EPField.WEB)&&WL.Client.getEnvironment()!=WL.Env.MOBILE_WEB?"/random":WL.StaticAppProps.APP_SERVICES_URL+"random";new WLJSX.Ajax.WLRequest(b,{onSuccess:function(b){a(b.responseText)},onFailure:function(){a(ERROR_SECURE_RANDOM_GENERATOR_UNAVAILABLE)},timeout:WL.AppProp.WLCLIENT_TIMEOUT_IN_MILLIS,method:"get",
evalJSON:!1})};
EncryptedCache.prototype[api.open]=function(a,b,c,d){try{WL.Validators.validateArguments(["string","boolean",WL.Validators.validateFunctionOrNull,WL.Validators.validateFunctionOrNull],arguments,"WL.EncryptedCache.open")}catch(e){console.log(e);if(d)return d(ERROR_INVALID_PARAMETER);throw ERROR_INVALID_PARAMETER;}if(void 0===a||""===a){console.log("Error: credentials is undefined or empty.");if(d)return d(ERROR_INVALID_PARAMETER);throw ERROR_INVALID_PARAMETER;}if(this.DPK){var g=null;this.close(function(){},
function(a){g=a});if(null!==g)return d(g)}if(!localStorage){if(d)return d(ERROR_LOCAL_STORAGE_NOT_SUPPORTED);throw ERROR_LOCAL_STORAGE_NOT_SUPPORTED;}if(this.keyCreationContext){if(d)return d(ERROR_KEY_CREATION_IN_PROGRESS);throw ERROR_KEY_CREATION_IN_PROGRESS;}var h=localStorage.getItem(this.SALT_KEY);if(null===h){if(!b){if(d)return d(ERROR_NO_EOC);throw ERROR_NO_EOC;}this.keyCreationContext={credentials:a,salt:""+this[api.random](),onCompleteHandler:c,onErrorHandler:d};var f=this;this[api.secureRandom](function(a){if(a==
ERROR_SECURE_RANDOM_GENERATOR_UNAVAILABLE){a=f.keyCreationContext.onErrorHandler;this.keyCreationContext=f.keyCreationContext=null;if(a)return a(ERROR_SECURE_RANDOM_GENERATOR_UNAVAILABLE);throw ERROR_SECURE_RANDOM_GENERATOR_UNAVAILABLE;}f[api.keygen].deriveKey(a,f.keyCreationContext.salt,f.DPK_KEY_DERIVATION_ITERATIONS,32,function(a){f.keyCreationContext.DPK=a;f[api.keygen].deriveKey(f.keyCreationContext.credentials,f.keyCreationContext.salt,f.CBK_KEY_DERIVATION_ITERATIONS,32,function(a){var b=[MD5(""+
f[api.random]())];f.encryptor.rawEncrypt(f.keyCreationContext.DPK,a,b[0],function(a){localStorage.setItem(f.CIPHER_KEY,a);localStorage.setItem(f.SALT_KEY,f.keyCreationContext.salt);a=f.keyCreationContext.onCompleteHandler;f.DPK=f.keyCreationContext.DPK;this.keyCreationContext=f.keyCreationContext=null;a&&a(OK)},function(a){console.log(a);a=f.keyCreationContext.onErrorHandler;this.keyCreationContext=f.keyCreationContext=null;if(a)a(ERROR_COULD_NOT_GENERATE_KEY);else throw ERROR_COULD_NOT_GENERATE_KEY;
})},function(a){console.log(a);a=f.keyCreationContext.onErrorHandler;this.keyCreationContext=f.keyCreationContext=null;if(a)a(ERROR_COULD_NOT_GENERATE_KEY);else throw ERROR_COULD_NOT_GENERATE_KEY;})},function(a){console.log(a);a=f.keyCreationContext.onErrorHandler;this.keyCreationContext=f.keyCreationContext=null;if(a)a(ERROR_COULD_NOT_GENERATE_KEY);else throw ERROR_COULD_NOT_GENERATE_KEY;})})}else this.keyCreationContext={onCompleteHandler:c,onErrorHandler:d},f=this,this[api.keygen].deriveKey(a,
h,f.CBK_KEY_DERIVATION_ITERATIONS,32,function(a){var b=f.keyCreationContext.onCompleteHandler,c=f.keyCreationContext.onErrorHandler;this.keyCreationContext=f.keyCreationContext=null;var d=localStorage.getItem(f.CIPHER_KEY);f.encryptor.rawDecrypt(d,a,function(a){f.DPK=a;b&&b(OK)},function(a){console.log(a);if(c)c(ERROR_CREDENTIALS_MISMATCH);else throw ERROR_CREDENTIALS_MISMATCH;})},function(a){console.log(a);a=f.keyCreationContext.onErrorHandler;this.keyCreationContext=f.keyCreationContext=null;if(a)a(ERROR_COULD_NOT_GENERATE_KEY);
else throw ERROR_COULD_NOT_GENERATE_KEY;})};
EncryptedCache.prototype[api.destroy]=function(a,b){WL.Validators.validateArguments([WL.Validators.validateFunctionOrNull,WL.Validators.validateFunctionOrNull],arguments,"WL.EncryptedCache.destroy");var c=null;this.close(function(){},function(a){c=a});if(null!==c){if(b)return b(c);throw c;}localStorage.removeItem(this.SALT_KEY);localStorage.removeItem(this.CIPHER_KEY);for(var d=localStorage.length-1;0<=d;d--){var e=localStorage.key(d);0===e.indexOf(this.STORAGE_PREFIX)&&localStorage.removeItem(e)}a(OK)};
EncryptedCache.prototype[api.changeCredentials]=function(a,b,c){try{WL.Validators.validateArguments(["string",WL.Validators.validateFunctionOrNull,WL.Validators.validateFunctionOrNull],arguments,"WL.EncryptedCache.changeCredentials")}catch(d){console.log(d);if(c)return c(ERROR_INVALID_PARAMETER);throw ERROR_INVALID_PARAMETER;}if(void 0===a||""===a){console.log("Error: new_credentials is undefined or empty.");if(c)return c(ERROR_INVALID_PARAMETER);throw ERROR_INVALID_PARAMETER;}if(this.keyCreationContext){if(c)return c(ERROR_KEY_CREATION_IN_PROGRESS);
throw ERROR_KEY_CREATION_IN_PROGRESS;}if(!this.DPK){if(c)return c(ERROR_EOC_CLOSED);throw ERROR_EOC_CLOSED;}this.keyCreationContext={credentials:a,salt:""+this[api.random](),onCompleteHandler:b,onErrorHandler:c};var e=this;this[api.keygen].deriveKey(this.keyCreationContext.credentials,this.keyCreationContext.salt,this.CBK_KEY_DERIVATION_ITERATIONS,32,function(a){var b=[MD5(""+e[api.random]())];e.encryptor.rawEncrypt(e.DPK,a,b[0],function(a){localStorage.setItem(e.CIPHER_KEY,a);localStorage.setItem(e.SALT_KEY,
e.keyCreationContext.salt);a=e.keyCreationContext.onCompleteHandler;this.keyCreationContext=e.keyCreationContext=null;a&&a(OK)},function(a){console.log(a);a=e.keyCreationContext.onErrorHandler;this.keyCreationContext=e.keyCreationContext=null;if(a)a(ERROR_COULD_NOT_GENERATE_KEY);else throw ERROR_COULD_NOT_GENERATE_KEY;})},function(a){console.log(a);a=e.keyCreationContext.onErrorHandler;this.keyCreationContext=e.keyCreationContext=null;if(a)a(ERROR_COULD_NOT_GENERATE_KEY);else throw ERROR_COULD_NOT_GENERATE_KEY;
})};
EncryptedCache.prototype[api.write]=function(a,b,c,d){try{WL.Validators.validateArguments(["string",WL.Validators.validateStringOrNull,WL.Validators.validateFunctionOrNull,WL.Validators.validateFunctionOrNull],arguments,"WL.EncryptedCache.write")}catch(e){console.log(e);if(d)return d(ERROR_INVALID_PARAMETER);throw ERROR_INVALID_PARAMETER;}if(void 0===a||""===a){console.log("Error: key is undefined or empty.");if(d)return d(ERROR_INVALID_PARAMETER);throw ERROR_INVALID_PARAMETER;}if(!this.DPK)return d(ERROR_EOC_CLOSED);a=
SHA256(a);if(null===b)return localStorage.removeItem(this.STORAGE_PREFIX+a),c(OK);var g=[MD5(a+this[api.random]())],h=this.STORAGE_PREFIX;this.encryptor.rawEncrypt(Base64.encode(b),this.DPK,g[0],function(b){localStorage.setItem(h+a,b);c(OK)},d)};
EncryptedCache.prototype[api.remove]=function(a,b,c){try{WL.Validators.validateArguments(["string",WL.Validators.validateFunctionOrNull,WL.Validators.validateFunctionOrNull],arguments,"WL.EncryptedCache.remove")}catch(d){console.log(d);if(c)return c(ERROR_INVALID_PARAMETER);throw ERROR_INVALID_PARAMETER;}if(void 0===a||""===a){console.log("Error: key is undefined or empty.");if(c)return c(ERROR_INVALID_PARAMETER);throw ERROR_INVALID_PARAMETER;}if(!this.DPK){if(c)return c(ERROR_EOC_CLOSED);throw ERROR_EOC_CLOSED;
}this.write(a,null,b,c)};
EncryptedCache.prototype[api.read]=function(a,b,c){try{WL.Validators.validateArguments(["string",WL.Validators.validateFunctionOrNull,WL.Validators.validateFunctionOrNull],arguments,"WL.EncryptedCache.read")}catch(d){console.log(d);if(c)return c(ERROR_INVALID_PARAMETER);throw ERROR_INVALID_PARAMETER;}if(void 0===a||""===a){console.log("Error: key is undefined or empty.");if(c)return c(ERROR_INVALID_PARAMETER);throw ERROR_INVALID_PARAMETER;}if(!this.DPK){if(c)return c(ERROR_EOC_CLOSED);throw ERROR_EOC_CLOSED;
}var a=SHA256(a),e=localStorage.getItem(this.STORAGE_PREFIX+a);if(null===e)return b(null);this.encryptor.rawDecrypt(e,this.DPK,function(a){a=Base64.decode(a);b(a)},c)};function NativeEncryptor(){}
NativeEncryptor.prototype.rawEncrypt=function(a,b,c,d,e){try{WL.Validators.validateArguments(["string","string","object","function","function"],arguments,"NativeEncryptor.prototype.rawEncrypt")}catch(g){console.log(g);if(e)return e(ERROR_INVALID_PARAMETER);throw ERROR_INVALID_PARAMETER;}var h=a,f=b,m=a2h(c);if(!f||!h||!m||null===f||null===h||null===m||1>f.length||1>h.length||1>m.length){if(e)return e(ERROR_INVALID_PARAMETER);throw ERROR_INVALID_PARAMETER;}cordova.exec(d,function(){e()},"SecurityPlugin",
"encrypt",[f,h,m])};
NativeEncryptor.prototype.rawDecrypt=function(a,b,c,d){try{WL.Validators.validateArguments(["string","string","function","function"],arguments,"NativeEncryptor.prototype.rawDecrypt")}catch(e){console.log(e);if(d)return d(ERROR_INVALID_PARAMETER);throw ERROR_INVALID_PARAMETER;}var g=JSON.parse(a),h=g.ct,f=b,m=g.iv;if(!f||!h||!m||null===f||null===h||null===m||1>f.length||1>h.length||1>m.length){if(d)return d(ERROR_INVALID_PARAMETER);throw ERROR_INVALID_PARAMETER;}cordova.exec(c,function(a){console.log(a);
d(ERROR_UNKNOWN)},"SecurityPlugin","decrypt",[f,g.ct,m])};function NativePBKDF2(){}
NativePBKDF2.prototype.deriveKey=function(a,b,c,d,e,g){try{WL.Validators.validateArgument("string",a,"NativePBKDF2.prototype.deriveKey");WL.Validators.validateArgument("string",b,"NativePBKDF2.prototype.deriveKey");WL.Validators.validateArgument(function(a){"function"!==typeof a&&this.logAndThrow("Invalid value '"+WLJSX.Object.toJSON(a)+"' ("+typeof a+"), expected type 'function' for parameter onCompleteHandler.","NativePBKDF2.prototype.deriveKey")},e,"");WL.Validators.validateArgument(function(a){"function"!==
typeof a&&this.logAndThrow("Invalid value '"+WLJSX.Object.toJSON(a)+"' ("+typeof a+"), expected type 'function' for parameter onErrorHandler.","NativePBKDF2.prototype.deriveKey")},g,"");if(!("number"===typeof c&&Math.ceil(c)===Math.floor(c)))throw"Error: Invalid invocation of method NativePBKDF2.prototype.deriveKey; Invalid parameter type for argument 'num_iterations'";if(!("number"===typeof d&&Math.ceil(d)===Math.floor(d)))throw"Error: Invalid invocation of method NativePBKDF2.prototype.deriveKey; Invalid parameter type for argument 'num_bytes'";
}catch(h){console.log(h);if(g)return g(ERROR_INVALID_PARAMETER);throw ERROR_INVALID_PARAMETER;}if(!a||null===a||!b||null===b||!c||null===c||!d||null===d||1>b.length||0>parseInt(c,10))return g(ERROR_INVALID_PARAMETER);cordova.exec(e,function(a){console.log(a);g(ERROR_UNKNOWN)},"SecurityPlugin","keygen",[a,b,c,d])};function WebBasedEncryptor(){}
WebBasedEncryptor.prototype.rawEncrypt=function(a,b,c,d,e){var g=null;try{c=sjcl.codec.hex.toBits(a2h(c)),g=sjcl.json.encrypt(b,a,{iv:c})}catch(h){console.log(h);if(e)return e(ERROR_UNKNOWN);throw ERROR_UNKNOWN;}d&&d(g)};WebBasedEncryptor.prototype.rawDecrypt=function(a,b,c,d){var e=null;try{e=sjcl.json.decrypt(b,a)}catch(g){console.log(g);if(d)return d(ERROR_UNKNOWN);throw ERROR_UNKNOWN;}c&&c(e)};function WebBasedPBKDF2(){}
WebBasedPBKDF2.prototype.deriveKey=function(a,b,c,d,e,g){var h=null;try{h=sjcl.misc.pbkdf2(a,b,c,8*d)}catch(f){console.log(f);if(g)return g(ERROR_UNKNOWN);throw ERROR_UNKNOWN;}e&&e(binb2hex(h))};window.WL.EncryptedCache=new EncryptedCache;})();


var WL_CHECKSUM = {"checksum":4267698535,"date":1363361907156,"machine":"HP1"};
/* Date: Fri Mar 15 19:38:27 MSK 2013 */


/* JavaScript content from js/dateUtils.js in folder common */
function initDateFields(){
	WL.Logger.debug("-------start init date fields---------");
	
	$('input[type=date]').each(function(){
		var hidden = makeHiddenDate($(this));
		var fieldName = hidden.attr('name');
		WL.Logger.debug("fieldName = " + fieldName);
		$(this).on("focusout", function(){
			var selectedValue = $(this).val();
			WL.Logger.debug("************selected value***** = " + $(this).val());
			if(selectedValue.length > 0){
				var year = selectedValue.substring(6);
				var month = selectedValue.substring(0, 2);
				var day = selectedValue.substring(3, 5);
				var time = hidden.val().substring(11);
				hidden.val(day + "." + month + "." + year + " " + time);
			}else{
				hidden.val('');
			}
		});
	});

	WL.Logger.debug("-------end init date fields---------");
}

function makeHiddenDate(dateField) {
	WL.Logger.debug("came to hiddenDate");
    var name = dateField.attr("name");
    var hidden = $("<input></input>");
    hidden.prop("type", "hidden");
    hidden.prop("name", name);
    hidden.prop("class", 'dateField');
    hidden.prop("id", name + "Hidden");
    hidden.val(dateField.val());
    dateField.after(hidden);
    dateField.removeAttr("name");
    return hidden;
}

function fillDateFieldsWithValues(){
	WL.Logger.debug("+++++ came to fillDateFieldsWithValues");
	$('input.dateField').each(function(){
		
		var value = $(this).val();
		WL.Logger.debug("found 111 = " + value);
		if(value.length > 0){
			var visDate = $('input[id="' + $(this).attr('name') + '"]');
			var dateValue = value.match(/^(\d{2}).(\d{2}).(\d{4}) (\d{2}):(\d{2})$/);
			if (dateValue)
				visDate.val(dateValue[2] + "/" + dateValue[1] + "/" + dateValue[3]).change();
		}
	});
}

function getDate(dateL){
	var dateD = new Date(dateL);
	WL.Logger.debug("$$$$$$ date = " + dateL);
	return getExtFormatValue(dateD.getDate()) + "." + (dateD.getMonth() < 9 ? "0" : "") + (dateD.getMonth() + 1) + "." + dateD.getFullYear() + " " + getExtFormatValue(dateD.getHours()) + ":" + getExtFormatValue(dateD.getMinutes());
}

function getExtFormatValue(fValue){
	return (fValue < 9 ? "0" : "") + fValue; 
}


/* JavaScript content from js/navigation.js in folder common */
function showTasksFromMe(){
	$('span#fromMe').addClass('activeSpan');
	$('span#toMe').removeClass('activeSpan');
	getTasks("fromMe");
}

function showTasksForMe(){
	$('span#toMe').addClass('activeSpan');
	$('span#fromMe').removeClass('activeSpan');
	getTasks("forMe");
}

function activateScreen(screenName){
	$("div.screen").each(function(){
		$(this).hide();
	});
	if(WL.Client.getEnvironment() == WL.Environment.ANDROID){
		generateMenuForScreen(screenName);
		overrideBackButtonForScreen(screenName);
	}
	
	$("div#" + screenName).show();
}

function showList(){
	activateScreen("tasksList");
	getTasks("forMe");
}

function getTasks(tasksDirection){
	var directionName;
	if(tasksDirection == "forMe"){
		directionName = "responsiblename";
	}else if(tasksDirection == "fromMe"){
		directionName = "creatorname";
	}
	busyIndicator.show();
	WL.Logger.debug("111111111111 employeeCaption = " + "status=0;" + directionName + "=" + employeeCaption + ";");
	$.ajax({
        url: url + "/Task/json",
        data: {
            "method" : "filter",
            "filtered" : "status=0;" + directionName + "=" + employeeCaption + ";"
        },
        dataType: 'text json',
        type: 'post',
        success: function (data){
			WL.Logger.debug("success getTasks");
        	activateScreen("tasksList");
        	WL.Logger.debug("success getTasks");
        	$('div#tasksList #list').html("");
        	for(var i = 0; i < data.length; i++){
        		var taskDiv = $('<div onclick="showTask(' + data[i]['id'] + ')"></div>');
        		$(taskDiv).append('<hr>').append('��: ').append(data[i]['creatorname']).append(' <span class="floatRight">' + getDate(data[i]['endDate'])).append('</span><br>');
        		$(taskDiv).append('<b>' + data[i]['name'] + '</b>').append('<br>');
        		$('div#tasksList #list').append(taskDiv);
        	}
        	
        	busyIndicator.hide();
        },
        error: function(data){
        	activateScreen("loginForm");
        	$('div#errorMsg').text('�� ������� �������� ������ �����. ��������� �������');
        	busyIndicator.hide();
        }
    }
    );
}

function showTask(taskId){
	busyIndicator.show();
	$.ajax({
        url: url + "/Task/getJson",
        data: {
            "oid" : taskId
        },
        dataType: 'text json',
        type: 'post',
        success: function (data){
        	$('div#taskCard #editTaskDiv').hide();
        	$('div#taskCard #execButtonDiv').hide();
        	$('div#taskCard #closeButtonDiv').hide();
        	WL.Logger.debug("success showTask");
        	WL.Logger.debug(data);
        	WL.Logger.debug($('div#taskCard #editTaskButton').val());
    		var taskDiv = $('<div></div>');
    		$(taskDiv).append('������ � ' + data[0]['number']).append('<br>');
    		$(taskDiv).append('<b>' + data[0]['theme'] + '</b>').append('<br>');
    		$(taskDiv).append(data[0]['desc']).append('<br>');
    		$(taskDiv).append('���� ������: ' + getDate(data[0]['startDate'])).append('<br>');
    		$(taskDiv).append('���� ���������: ' + getDate(data[0]['dueDate'])).append('<br>');
    		$(taskDiv).append('�����: ' + data[0]['creatorName']).append('<br>');
//    		$(taskDiv).append('�����������: ' + data.hashMap['executorsCaption']).append('<br>');
    		
    		$('div#taskCard #taskInfo').html(taskDiv);
    		activateScreen("taskCard");
    		if(data[0]['canEdit'] == 'true'){
    			if(WL.Client.getEnvironment() == WL.Environment.ANDROID){
    				addEditTaskMenuItem();
    			}
    			$('div#taskCard #editTaskButton').attr('onclick', 'showTaskForm(' + data[0]['id'] + ')');
    			$('div#taskCard #editTaskDiv').show();
    		}else{
    			$('div#taskCard #editTaskDiv').hide();
    		}
//    		if(data.hashMap['isExecutor'] == 'true'){
//    			if(WL.Client.getEnvironment() == WL.Environment.ANDROID){
//    				addExecTaskMenuItem();
//    			}
//    			$('div#taskCard #execButtonDiv').attr('onclick', 'changeTaskStatus(' + data.hashMap['id'] + ', "taskExec")');
//    			$('div#taskCard #execButtonDiv').show();
//    		}else{
//    			$('div#taskCard #execButtonDiv').hide();
//    		}
//    		if(data.hashMap['isAuthor'] == 'true' || data.hashMap['canEdit'] == 'true'){
			if(data[0]['canEdit'] == 'true'){
    			if(WL.Client.getEnvironment() == WL.Environment.ANDROID){
    				addCloseTaskMenuItem();
    			}
    			$('div#taskCard #closeButtonDiv').attr('onclick', 'changeTaskStatus(' + data[0]['id'] + ', "taskClose")');
    			$('div#taskCard #closeButtonDiv').show();
    		}else{
    			$('div#taskCard #closeButtonDiv').hide();
    		}
    		
    		busyIndicator.hide();
        },
        error: function(data){
        	activateScreen("loginForm");
        	$('div#errorMsg').text('�� ������� ���������� �������� ������. ��������� �������');
        	busyIndicator.hide();
        }
    }
    );
}

function newTask(){
	clearForm();
	activateScreen("taskForm");
}

function editTask(){
	activateScreen("taskForm");
}

function showTasksList(){
	activateScreen("tasksList");
}

function showTaskForm(taskId){
	clearForm();
	busyIndicator.show();
	$.ajax({
		url: url + "/Task/getJson",
        data: {
            "oid" : taskId
        },
        dataType: 'text json',
        type: 'post',
        success: function (data){
        	fillForm(data);
    		activateScreen("taskForm");
    		busyIndicator.hide();
        },
        error: function(data){
        	activateScreen("loginForm");
        	$('div#errorMsg').text('�� ������� ���������� �������� ������. ��������� �������');
        	busyIndicator.hide();
        }
    }
    );
}


/* JavaScript content from js/ac_select_field.js in folder common */
function getCompanyId(){
    if(document.getElementsByName("counteragent")[0] != null) return document.getElementsByName("counteragent")[0].value;
    else return "-1";
}

$(document).ready(function(){
    
});
function selectOne(data, elem){
    $(elem).val(data[0]).blur();
    $(elem).siblings("input[type='hidden']").val(data[1]).change();
    if($(elem).attr('id')=='getCounteragents'){
        var el = $('#addQuickContact');
        if(el!=null){
            el.attr('counteragentid',data[1]);
            el.attr('counteragentname',data[0]);
        }
    }else if($(elem).attr("id") == "getEmployees"){
        $(elem).siblings('span').attr("color", data[2]);
    }
    if(window.event.type!='click') $(elem).change();
};

function selectMany(data, elem){
    if($(elem).attr("id") == "getUserGroups"){
        if(addUserToGroup($('#docglobalId').val(), data[1]) == false){
            return alert('������ ��� ���������� � ������');
        }
    }
    var wrap = $(elem).siblings(".selected_list");
    var wrapName = wrap.attr('id');
    var ul = $("ul",wrap);
    var li = $("<li class='sl_select'></li>");
    li.each(function(){
        $(this).append(
            "<img src='images/blank.gif' />"+
            "<span></span>"+
            "<input type='hidden' />"
            );
        $("span",this).text(data[0]);
        if($(elem).attr("id") == "getProjects"){
            $("span",this).css("background-color", "#" + data[2]);
        }
        $("input",this)
        .val(data[1])
        .attr({
            'name':'hidden'+wrapName
        })
        $("img",this).addClass("delete").attr('alt','')
            
    })
    ul.append(li)
    $("li img",ul).bind({
        hover : function(){
            $(this).animate({
                opacity:1
            })
        },
        mouseout : function(){
            $(this).animate({
                opacity:0.6
            })
        },
        click : function(){
            if($(this).parent().attr('id')=='getCounteragents'){
                var el = $('#addQuickContact');
                if(el!=null){
                    el.removeAttr('counteragentid');
                    el.removeAttr('counteragentname');
                }
            }
            $(this).parent().remove();
        }
    })
    $(elem).val('')
};


/* JavaScript content from js/datepicker-ru.js in folder common */
/* Russian (window-1251) initialisation for the jQuery UI date picker plugin. */
/* Written by Andrew Stromnov (stromnov@gmail.com). */
jQuery(function($){
	$.datepicker.regional['ru'] = {
                clearText: '��������',
		closeText: '�������',
		prevText: '&#x3c;����',
		nextText: '����&#x3e;',
		currentText: '�������',
		monthNames: ['������','�������','����','������','���','����',
		'����','������','��������','�������','������','�������'],
		monthNamesShort: ['���','���','����','���','���','����',
		'����','���','���','���','���','���'],
		dayNames: ['�����������','�����������','�������','�����','�������','�������','�������'],
		dayNamesShort: ['���','���','���','���','���','���','���'],
		dayNamesMin: ['��','��','��','��','��','��','��'],
		weekHeader: '���',
		dateFormat: 'dd.mm.yy',
		firstDay: 1,
		isRTL: false,
                yearRange: '1920:2020',
		showMonthAfterYear: false,
		yearSuffix: ''};
	$.datepicker.setDefaults($.datepicker.regional['ru']);
});


/* JavaScript content from js/formUtils.js in folder common */
function clearForm(){
	$('#taskForm form#task')[0].reset();
	$('#taskForm #objectId').attr('disabled', 'disabled');
	clearACSelectMany();
	clearACSelectOne();
}

function clearACSelectOne(){
	WL.Logger.debug("clearACSelectOne");
	$('.edit_val').each(function(){
		WL.Logger.debug("found edit_val");
		$(this).find('.ac_field').val('').show();
		$(this).find('.suggestions').html('').hide();
		$(this).find('input[type=hidden]').val('null').change();
		$(this).find('img').hide();
		$(this).find('.edit_string').text('').hide();
	});
}

function clearACSelectMany(){
	$('.selected_list').each(function(){
		$(this).find('ul').html('');
	});
}

function fillForm(data){
	WL.Logger.debug("fillForm");
//	WL.Logger.debug("executor = " + data.hashMap['leaderCaption']);
//	WL.Logger.debug(data.hashMap['executors'].length);
	$('#taskForm #oid').val(data[0]['id']);
	$('#taskForm #objectId').val(data[0]['id']).removeAttr('disabled');
	$('#taskForm #taskNumber').text(data[0]['number']);
	$('#taskForm #theme').val(data[0]['theme']);
	$('#taskForm #description').val(data[0]['desc']);
	$('#taskForm input[name="task.startDate"]').val(getDate(data[0]['startDate']));
	$('#taskForm input[name="task.dueDate"]').val(getDate(data[0]['dueDate']));
	if(data[0]['resposibleCaption'] && data[0]['resposibleCaption'].length > 0){
		fillLeader(data[0]['resposibleCaption'], data[0]['responsibleId']);
	}
	if(data[0]['executors']){
		fillExecutors(data[0]['executors']);
	}
	fillDateFieldsWithValues();
}

function fillLeader(leaderCaption, leaderId){
	acSelectOne(leaderCaption, leaderId, $(".taskLeader"));
//	$(".taskLeader").find('.ac_field').val('').hide();
//	$(".taskLeader").find('.suggestions').html('').hide();
//	$(".taskLeader").find('input[type=hidden]').val(leaderId).change();
//	$(".taskLeader").find('img').show();
//	$(".taskLeader").find('.edit_string').text(leaderCaption).show();
}

function fillExecutors(executors){
	WL.Logger.debug("fillExecutors");
	for(var emplId in executors){
		WL.Logger.debug("emplId = " + emplId);
		acSelectMany(executors[emplId], emplId, $('.taskExecutors'));
	}
}


/* JavaScript content from js/autocomplete.js in folder common */


function initAutocomplete(){
	$('.ac_field').each(function(){
		var sugList = $(this).siblings(".suggestions");
		$(this).on("input", function(e) {
			
			sugList.show();
			var curElem = $(this);
			var text = $(this).val();
			if(text.length < 1) {
				sugList.html("");
				sugList.listview("refresh");
			} else {
				$.get(url + "/ajax/searchData.do?type=" + $(this).attr('data-ac-type') + "&query=" + text + "&limit=10&method=search&attributs=" + $(this).attr('data-ac-attr') + "&inAttr=" + $(this).attr('data-ac-inAttr'), null, function(res){
					var str = "";
					var resJson = $.parseJSON(res);
					WL.Logger.debug("```````````success ac");
					WL.Logger.debug(resJson.length);
					WL.Logger.debug(resJson[0]['name']);
//					var employees = res.split("\n");
					sugList.html("");
					for(var i=0, len=resJson.length; i<len; i++) {
//						var employeeData = employees[i].split('|');
						var li = $('<li></li>');
						$(li).text(resJson[i]['name']);
						$(li).attr('caption', resJson[i]['name']);
						$(li).attr('emplId', resJson[i]['id']);
						if($(curElem).hasClass('selectOne')){
							$(li).on("click", function(e){
								acSelectOne($(this).attr('caption'), $(this).attr('emplId'), sugList.parent());
								sugList.hide();
							});
						}else{
							$(li).on("click", function(e){
								acSelectMany($(this).attr('caption'), $(this).attr('emplId'), sugList.parent());
								sugList.hide();
							});
						}
						
						sugList.append(li);
					}	
				},"text");
			}
		});
//		$(this).on("focusout", function(e) {
//			sugList.hide();
//		});
	});
}

function processACResult(res, elem, container){
	var str = "";
	var employees = res.split("\n");
	for(var i=0, len=employees.length; i<len; i++) {
		var employeeData = employees[i].split('|');
		if($(elem).hasClass('selectOne')){
			str += "<li onclick='acSelectOne(" + employeeData[0] + ", " + employeeData[1] + ")'>"+employeeData[0]+"</li>";
		}else{
			str += "<li onclick='acSelectOne(" + employeeData[0] + ", " + employeeData[1] + ")'>"+employeeData[0]+"</li>";
		}
		
	}				
	$(list).html(str);
	$(list).listview("refresh");
}

function acSelectOne(caption, id, container){
	var img = $(container).find('img');
	img.on("click", function(){
		$(container).find('input[type=hidden]').val("null").change();
		$(container).find('input.ac_field').val('').show();
		$(container).find('span.edit_string').text('').hide();
		img.hide();
	});
	WL.Logger.debug("came to acSelectOne - " + id);
	$(container).find('input[type=hidden]').val(id).change();
	$(container).find('input.ac_field').hide();
	img.show();
	
	$(container).find('span.edit_string').text(caption).show();
}

function acSelectMany(caption, id, container){
	var wrap = $(container).find(".selected_list");
    var wrapName = wrap.attr('dataName');
    var ul = $("ul",wrap);
    var li = $("<li class='sl_select'></li>");
    
    li.each(function(){
        $(this).append(
            "<img src='del.png' />"+
            "<span></span>"
            +"<input type='checkbox' name='"+wrapName+"' value="+id+" checked='checked' style='display:none;'/>"
            +"<input type='hidden' name='_"+wrapName+"' value='on' />"
            );
        $("span",this).text(caption);
        $("img",this).addClass("delete").attr('alt','')
            
    })
    ul.append(li);
    
    $("li img",ul).bind({
        click : function(){
            $(this).parent().remove();
        }
    })
    $(container).find('input.ac_field').val('');
}




/* JavaScript content from js/optionsMenu.js in folder common */
//������� ����� �� ������ ����
function saveTaskItemClick(){
	saveTask();
}

function closeTaskItemClick(){
	$('#closeButton').click();
}

function execTaskItemClick(){
	$('#execButton').click();
}

function editTaskItemClick(){
	$('#editTaskButton').click();
}

function addTaskItemClick(){
	newTask();
}

function exitItemClick(){
	WL.Logger.debug("exitClick");
	WL.Logger.debug("key1 = " + WL.Client.readUserPref("key1"));
	WL.Client.writeUserPref("key1", "valueKey");
	WL.Logger.debug("key1 = " + WL.Client.readUserPref("key1"));
	WL.App.close();
}

//��������� ������� ����
function addSaveMenuItem(){
	WL.OptionsMenu.addItem("saveTaskItem", saveTaskItemClick ,"���������",{
		image: "add",
		enabled : true
	});
}

function addCloseTaskMenuItem(){
	WL.OptionsMenu.addItem("closeTaskItem", closeTaskItemClick ,"�������",{
		image: "add",
		enabled : true
	});
}

function addExecTaskMenuItem(){
	WL.OptionsMenu.addItem("execTaskItem", execTaskItemClick ,"���������",{
		image: "add",
		enabled : true
	});
}

function addEditTaskMenuItem(){
	WL.OptionsMenu.addItem("editTaskItem", editTaskItemClick ,"�������������",{
		image: "add",
		enabled : true
	});
}

function addAddTaskMenuItem(){
	WL.OptionsMenu.addItem("addItem", addTaskItemClick ,"��������",{
		image: "add",
		enabled : true
	});
}

function addExitMenuItem(){
	WL.OptionsMenu.addItem("exitItem", exitItemClick ,"�����",{
		image: "add",
		enabled : true
	});
}


//��������� ���� ��� ������
function generateMenuForScreen(screenName){
	WL.OptionsMenu.removeItems();
	addExitMenuItem();
	if(screenName == "loginForm"){
		
	}else if(screenName == "tasksList"){
		addAddTaskMenuItem();
	}else if(screenName == "taskForm"){
		addSaveMenuItem();
	}else if(screenName == "taskCard"){
		
	}
}

function overrideBackButtonForScreen(screenName){
	if(screenName == "loginForm" || screenName == "tasksList"){
		WL.App.overrideBackButton(showExitDialog)
	}else if(screenName == "taskForm" || screenName == "taskCard"){
		WL.App.overrideBackButton(showTasksList);
	}
}

function showExitDialog(){
	WL.SimpleDialog.show("�������������", "�� ������������� ������ ����� �� ���������?", [{
		text: "��",
		handler: function(){
			WL.App.close();
		}
	},
	{
		text: "���",
		handler: function(){
			
		}
	}]);
}
