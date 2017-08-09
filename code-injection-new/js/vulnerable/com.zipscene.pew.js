
//fgnass.github.com/spin.js#v1.2.5
(function(a,b,c){function g(a,c){var d=b.createElement(a||"div"),e;for(e in c)d[e]=c[e];return d}function h(a){for(var b=1,c=arguments.length;b<c;b++)a.appendChild(arguments[b]);return a}function j(a,b,c,d){var g=["opacity",b,~~(a*100),c,d].join("-"),h=.01+c/d*100,j=Math.max(1-(1-a)/b*(100-h),a),k=f.substring(0,f.indexOf("Animation")).toLowerCase(),l=k&&"-"+k+"-"||"";return e[g]||(i.insertRule("@"+l+"keyframes "+g+"{"+"0%{opacity:"+j+"}"+h+"%{opacity:"+a+"}"+(h+.01)+"%{opacity:1}"+(h+b)%100+"%{opacity:"+a+"}"+"100%{opacity:"+j+"}"+"}",0),e[g]=1),g}function k(a,b){var e=a.style,f,g;if(e[b]!==c)return b;b=b.charAt(0).toUpperCase()+b.slice(1);for(g=0;g<d.length;g++){f=d[g]+b;if(e[f]!==c)return f}}function l(a,b){for(var c in b)a.style[k(a,c)||c]=b[c];return a}function m(a){for(var b=1;b<arguments.length;b++){var d=arguments[b];for(var e in d)a[e]===c&&(a[e]=d[e])}return a}function n(a){var b={x:a.offsetLeft,y:a.offsetTop};while(a=a.offsetParent)b.x+=a.offsetLeft,b.y+=a.offsetTop;return b}var d=["webkit","Moz","ms","O"],e={},f,i=function(){var a=g("style");return h(b.getElementsByTagName("head")[0],a),a.sheet||a.styleSheet}(),o={lines:12,length:7,width:5,radius:10,rotate:0,color:"#000",speed:1,trail:100,opacity:.25,fps:20,zIndex:2e9,className:"spinner",top:"auto",left:"auto"},p=function q(a){if(!this.spin)return new q(a);this.opts=m(a||{},q.defaults,o)};p.defaults={},m(p.prototype,{spin:function(a){this.stop();var b=this,c=b.opts,d=b.el=l(g(0,{className:c.className}),{position:"relative",zIndex:c.zIndex}),e=c.radius+c.length+c.width,h,i;a&&(a.insertBefore(d,a.firstChild||null),i=n(a),h=n(d),l(d,{left:(c.left=="auto"?i.x-h.x+(a.offsetWidth>>1):c.left+e)+"px",top:(c.top=="auto"?i.y-h.y+(a.offsetHeight>>1):c.top+e)+"px"})),d.setAttribute("aria-role","progressbar"),b.lines(d,b.opts);if(!f){var j=0,k=c.fps,m=k/c.speed,o=(1-c.opacity)/(m*c.trail/100),p=m/c.lines;!function q(){j++;for(var a=c.lines;a;a--){var e=Math.max(1-(j+a*p)%m*o,c.opacity);b.opacity(d,c.lines-a,e,c)}b.timeout=b.el&&setTimeout(q,~~(1e3/k))}()}return b},stop:function(){var a=this.el;return a&&(clearTimeout(this.timeout),a.parentNode&&a.parentNode.removeChild(a),this.el=c),this},lines:function(a,b){function e(a,d){return l(g(),{position:"absolute",width:b.length+b.width+"px",height:b.width+"px",background:a,boxShadow:d,transformOrigin:"left",transform:"rotate("+~~(360/b.lines*c+b.rotate)+"deg) translate("+b.radius+"px"+",0)",borderRadius:(b.width>>1)+"px"})}var c=0,d;for(;c<b.lines;c++)d=l(g(),{position:"absolute",top:1+~(b.width/2)+"px",transform:b.hwaccel?"translate3d(0,0,0)":"",opacity:b.opacity,animation:f&&j(b.opacity,b.trail,c,b.lines)+" "+1/b.speed+"s linear infinite"}),b.shadow&&h(d,l(e("#000","0 0 4px #000"),{top:"2px"})),h(a,h(d,e(b.color,"0 0 1px rgba(0,0,0,.1)")));return a},opacity:function(a,b,c){b<a.childNodes.length&&(a.childNodes[b].style.opacity=c)}}),!function(){function a(a,b){return g("<"+a+' xmlns="urn:schemas-microsoft.com:vml" class="spin-vml">',b)}var b=l(g("group"),{behavior:"url(#default#VML)"});!k(b,"transform")&&b.adj?(i.addRule(".spin-vml","behavior:url(#default#VML)"),p.prototype.lines=function(b,c){function f(){return l(a("group",{coordsize:e+" "+e,coordorigin:-d+" "+ -d}),{width:e,height:e})}function k(b,e,g){h(i,h(l(f(),{rotation:360/c.lines*b+"deg",left:~~e}),h(l(a("roundrect",{arcsize:1}),{width:d,height:c.width,left:c.radius,top:-c.width>>1,filter:g}),a("fill",{color:c.color,opacity:c.opacity}),a("stroke",{opacity:0}))))}var d=c.length+c.width,e=2*d,g=-(c.width+c.length)*2+"px",i=l(f(),{position:"absolute",top:g,left:g}),j;if(c.shadow)for(j=1;j<=c.lines;j++)k(j,-2,"progid:DXImageTransform.Microsoft.Blur(pixelradius=2,makeshadow=1,shadowopacity=.3)");for(j=1;j<=c.lines;j++)k(j);return h(b,i)},p.prototype.opacity=function(a,b,c,d){var e=a.firstChild;d=d.shadow&&d.lines||0,e&&b+d<e.childNodes.length&&(e=e.childNodes[b+d],e=e&&e.firstChild,e=e&&e.firstChild,e&&(e.opacity=c))}):f=k(b,"animation")}(),a.Spinner=p})(window,document);

var curCpn = '', scanId='', myloc;
//var srv = 'http://192.168.2.106/coupon/';
var srv = 'http://platform.zipscene.com/coupon/';
//var srv = 'http://platform.zipscene.josh/coupon/';

navigator.geolocation.getCurrentPosition(function(p) {
	$.getJSON('http://open.mapquestapi.com/nominatim/v1/reverse?format=json&json_callback=?&lat=' + p.coords.latitude + '&lon=' + p.coords.longitude, function(r) {
		if (r && r.address) {
			$('#curloc').text(myloc = r.address.city + ', ' + r.address.state);
		}
	});
});

$.ajaxSetup({crossDomain:false});
$(function() {
	$('#doscan').click(function() {
		scanId = guid();
		wait();
		if (window.cordova.exec)
		window.plugins.barcodeScanner.scan( function(result) {
			/*$('#r').text("We got a barcode\n" +
					  "Result: " + result.text + "\n" +
					  "Format: " + result.format + "\n" +
					  "Cancelled: " + result.cancelled);*/
			if (result.cancelled) home();
			else validate(result.text);
		}, function(error) {
			alert("Scanning failed: " + error);
			home();
		});
		else validate('1'); //validate('5EA8D543E8BD129ADA6B02CB7939FBAA');
	});
	$('.collapsible-trigger').next().hide();
	$('.collapsible-trigger').click(toggleHistory);
	$('#gohome').click(home);
	$('#redeem,#reject').click(function() {
		wait();
		$('#r').text('Redeeming...');

		$.post(srv + 'redeem.php', { result: this.id == 'redeem' ? 1 : -1, id: curCpn, scanId: scanId }, function(r) {
			home();
		}).fail(function(xhr, status, e) {
			alert('Error redeeming coupon: ' + e);
			home();
		});
	});

	var opts = {
	 lines: 15, // The umber of lines to draw
	  length: 30, // The length of each line
	  width: 6, // The line thickness
	  radius: 23, // The radius of the inner circle
	  corners: 1, // Corner roundness (0..1)
	  rotate: 0, // The rotation offset
	  color: '#ffffff', // #rgb or #rrggbb
	  speed: 1.7, // Rounds per second
	  trail: 60, // Afterglow percentage
	  shadow: true, // Whether to render a shadow
	  hwaccel: false, // Whether to use hardware acceleration
	  className: 'spinner', // The CSS class to assign to the spinner
	  zIndex: 2e9, // The z-index (defaults to 2000000000)
	  top: 'auto', // Top position relative to parent in px
	  left: 'auto' // Left position relative to parent in px
	};
	spinner = new Spinner(opts);

	$('#scan').show();
});

function clear() {
	spinner.stop();
	$('.page').hide();
	$('.coupon-status').removeClass('coupon-rejected coupon-warning');
}
function home() {
	clear();
	curCpn='';
	$('#scan').show();
}
function wait() {
	clear();
	$('#wait').show();
	spinner.spin($('#spin')[0]);
}
function validate(code) {
	$('#r').html('<h2>Validating Coupon Code</h2><p>' + code + '</p>');
	$.post(srv + 'validate.php', {
		id: code,
		scan: scanId,
		location: myloc
	}, function(r) {
		curCpn = code;
		result(r);
	}).fail(function(xhr, status, e) { alert('Error: ' + e); home(); });
}
function result(r) {
	clear();
	if (r.result == 'success') {

		$('#r-title').text('Coupon is valid!');
		$('#r-message').text('');
		//$('#r-user-pic').attr('src','http://graph.facebook.com/' + r.user.uid + '/picture');
		$('#r-user-name').text(r.user.firstName + ' ' + r.user.lastName);
		$('#deets').show();
		$('#c-title').text(r.coupon.name);
		$('#c-value').text('$' + r.coupon.value);
		$('#c-desc').text(r.coupon.description);
		
		var s, rcnt=0;
		if (r.scans.length == 0) s='No prior scans.';
		else {
			s='<table>';
			for (var i = 0; i < r.scans.length; i++) {
				if(r.scans[i].Redeemed == 1) {
					rcnt++;
					s+='<tr class="history-redeemed"><td class="history-icon">&#10004;</td>';
				} else if(r.scans[i].Redeemed == -1) {
					s+='<tr class="history-rejected"><td class="history-icon">&#10006;</td>';
				} else {
					s+='<tr class="history-canceled"><td class="history-icon">&ndash;</td>';
				}
				s+='<td class="history-date">' + r.scans[i].Scanned + '</td><td class="history-loc">' + r.scans[i].Location + '</td></tr>';
			}
			s+='</table>';

			if (rcnt > 0) {
				$('#r-title').text('Coupon has been redeemed ' + rcnt + ' time' + S(rcnt) + '.');
				$('.coupon-status').addClass('coupon-warning');
			}
		}
		$('#scans').html(s);
		$('#gohome').text('Cancel');

	} else {
		$('.coupon-status').addClass('coupon-rejected');
		$('#r-title').text('Coupon is not valid.');
		$('#r-message').text(r.message);
		$('#deets').hide();
		$('#gohome').text('OK');
	}
	$('#result').show();
}

function toggleHistory() {
	$(this).next().slideToggle();
}

function guid() {
	return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
	  var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
	  return v.toString(16);
	});
}

function S(n) {
	return n != 1 ? 's' : '';
}






