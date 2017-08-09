






			
			var version = '16';
			
			$(document).ready(function() {
				
				$('div#header button').bind('touchstart', function() {
					return false;
				});
				
				window.app = new App();
				
				$(window).load(function() {
					
					var s = document.createElement('script');
					s.type = 'text/javascript';
					s.async= true;
					s.src  = 'scripts/mobiscroll-2.0.1.custom.min.js';

					var l  = document.createElement('link');
					l.rel  = 'stylesheet';
					l.type = 'text/css';
					l.href = 'styles/mobiscroll-2.0.1.mod1.min.css';
					
					document.getElementsByTagName('head')[0].appendChild(s);
					document.getElementsByTagName('head')[0].appendChild(l);

				});
				
			});
			
		

var strings={"Krediidilimiit": "Credit limit","Vabad vahendid": "Available funds","Üks hetk..": "One moment..","NB! Palun kirjutage üles Teie PIN-kood:": "NB! Please take a not of your PIN-code:","SMS on lähetatud": "SMS has been sent","PIN koosneb neljast numbrist!": "PIN code consists of 4 numbers!","Mobiil-ID autentimisel tekkis viga.": "Error authenticating with mobile ID","Mobiil-ID autentimiseks ette nähtud aeg on lõppenud.": "Mobile ID authentication has timed out","Palun oodake..": "Please wait..","Isikukood ei paista olevat korrektne": "National ID code does not seem valid","Osta parkimisluba": "Purchase parking permit","Ava tõkkepuu": "Open the gate","Juhul, kui soovite soetada PIN-pileti mõneks muuks ajaks tulevikus, valige": "If you would like to purchase a parking permit for any time in the future, please click","Ost õnnestus!": "Purchase was successful","PETKNRL": "SMTWTFS","Sõnumi edastamine ebaõnnestus:": "Delivery of SMS was unsuccessful","Sõnum on edastatud. Palun kontrollige vastusõnumit!": "SMS was delivered. Please check the reply message.","Parkimise lõpetamine ebaõnnestus:": "Parking termination was unsuccessful:","Kõik parklad": "All carparks","lõpeta": "stop","välju": "exit","Pargitud": "Parked at","Mitu parkimisõigust": "Multiple permits","Tõmba rakendus alla": "Download the app","ning pargi ka linnatänavail": "and also park on the streets","Alusta parkimist": "Start parking","Kehtiv alates": "Valid from","Kehtiv kuni": "Valid until","Tähtajatu parkimisõigus": "Termless permit","alates": "from","Kehtivus lõppenud": "No longer valid","Kehtivus lõppes": "Validity ended","Palun kontrollige, et kinnituskood <b>KK</b> klapib telefoniekraanil oleva koodiga ning sisestage seejärel telefonis <b>PIN1</b>.": "Please check that the check number <b>KK</b> matches the one on your mobile phone and then enter your <b>PIN1</b>.","Võrgu viga..": "Network error"};

var strings={};

var strings={"Krediidilimiit": "Кредитный лимит","Vabad vahendid": "Свободные средства","Üks hetk..": "Подождите..","NB! Palun kirjutage üles Teie PIN-kood:": "NB! Запишите свой PIN-код:","SMS on lähetatud": "SMS отправлено","PIN koosneb neljast numbrist!": "PIN состоит из четырех цифр!","Mobiil-ID autentimisel tekkis viga.": "Ошибка при аутентификации мобильного ID.","Mobiil-ID autentimiseks ette nähtud aeg on lõppenud.": "Время для аутентификации мобильного ID закончилось.","Palun oodake..": "Подождите..","Isikukood ei paista olevat korrektne": "Возможно, личный код некорректен.","Osta parkimisluba": "Купить разрешение на парковку.","Ava tõkkepuu": "Открыть шлагбаум","Juhul, kui soovite soetada PIN-pileti mõneks muuks ajaks tulevikus, valige": "Juhul, kui soovite soetada PIN-pileti mõneks muuks ajaks tulevikus, valige","Ost õnnestus!": "Покупка удалась!","PETKNRL": "ВПВСЧПС","Sõnumi edastamine ebaõnnestus:": "Отправка сообщения не удалась:","Sõnum on edastatud. Palun kontrollige vastusõnumit!": "Сообщение доставлено. Проверьте ответное сообщение!","Parkimise lõpetamine ebaõnnestus:": "Окончание парковки не удалось:","Kõik parklad": "Все парковки","lõpeta": "Закончить","välju": "Выехать","Pargitud": "Запарковано","Mitu parkimisõigust": "Несколько прав на парковку","Tõmba rakendus alla": "Загрузите прикладную программу","ning pargi ka linnatänavail": "и паркуйтесь также на городских улицах","Alusta parkimist": "Начало парковки","Kehtiv alates": "Действительно с","Kehtiv kuni": "Действительно до","Tähtajatu parkimisõigus": "Бессрочное право на парковку","alates": "с","Kehtivus lõppenud": "Срок действия окончен","Kehtivus lõppes": "Срок действия закончился","Palun kontrollige, et kinnituskood <b>KK</b> klapib telefoniekraanil oleva koodiga ning sisestage seejärel telefonis <b>PIN1</b>.": "Проверьте, чтобы код подтверждения <b>KK</b> совпал с кодом на экране телефона, затем введите в телефоне <b>PIN1</b>.","Võrgu viga..": "Неполадка в сети.."};

var citypark={};
-1!=window.location.search.indexOf("?demo")?citypark.FastButton=function(a,b){$(a).click(function(d){b(d,a)})}:(citypark.FastButton=function(a,b){this.element=a;this.handler=b;a.addEventListener("touchstart",this,!1);a.addEventListener("click",this,!1)},citypark.FastButton.prototype.handleEvent=function(a){switch(a.type){case "touchstart":this.onTouchStart(a);break;case "touchmove":this.onTouchMove(a);break;case "touchend":this.onClick(a);break;case "click":this.onClick(a)}},citypark.FastButton.prototype.onTouchStart=function(a){a.stopPropagation();
this.element.addEventListener("touchend",this,!1);document.body.addEventListener("touchmove",this,!1);this.startX=a.touches[0].clientX;this.startY=a.touches[0].clientY},citypark.FastButton.prototype.onTouchMove=function(a){(10<Math.abs(a.touches[0].clientX-this.startX)||10<Math.abs(a.touches[0].clientY-this.startY))&&this.reset()},citypark.FastButton.prototype.onClick=function(a){a.stopPropagation();this.reset();this.handler(a,this.element);"touchend"==a.type&&citypark.FastButton.ClickBuster.preventGhostClick(this.startX,
this.startY)},citypark.FastButton.prototype.reset=function(){this.element.removeEventListener("touchend",this,!1);document.body.removeEventListener("touchmove",this,!1)},citypark.FastButton.ClickBuster=new function(){this.coordinates=[];this.preventGhostClick=function(a,b){this.coordinates.push(a,b);window.setTimeout(this.pop,2500)};this.pop=function(){this.coordinates.splice(0,2)};this.onClick=function(a){for(var b=citypark.FastButton.ClickBuster,d=0;d<b.coordinates.length;d+=2){var c=b.coordinates[d+
1];25>Math.abs(a.clientX-b.coordinates[d])&&25>Math.abs(a.clientY-c)&&(a.stopPropagation(),a.preventDefault())}};document.addEventListener("click",this.onClick,!0)});var _=function(a){return"undefined"!=typeof strings[a]?strings[a]:a};
function Geolocator(a){var b=this;this.watchID=null;this.watchers={};this.coords=null;this.tolerance=0.05;this.dist=function(a,b){var e=(b.lat-a.lat)*Math.PI/180,f=(b.lng-a.lng)*Math.PI/180,e=Math.sin(e/2)*Math.sin(e/2)+Math.cos(a.lat*Math.PI/180)*Math.cos(b.lat*Math.PI/180)*Math.sin(f/2)*Math.sin(f/2);return 12742*Math.atan2(Math.sqrt(e),Math.sqrt(1-e))};this.addWatcher=function(a,b){this.watchers[a]=b;null!=this.coords&&b(this.coords)};this.startWatching=function(){this.stopWatching();if(-1!=window.location.search.indexOf("?demo"))for(var d in b.watchers)b.watchers[d]({lat:59.42599458,
lng:24.74899149});else{if(!navigator.geolocation)return a();this.watchID=navigator.geolocation.watchPosition(function(a){a={lat:parseFloat(a.coords.latitude),lng:parseFloat(a.coords.longitude)};if(null==b.coords||b.dist(a,b.coords)>b.tolerance){b.coords=a;for(var d in b.watchers)b.watchers[d](b.coords)}},function(){return a()},{enableHighAccuracy:!0,maximumAge:0,timeout:1E4})}};this.stopWatching=function(){null!=this.watchID&&navigator.geolocation.clearWatch(this.watchID)}}
function GMap(){var a=this;this.zoom=14;this.width=$(window).width()-20;this.height=222;this.markers=[];this.areas=[];this.lazy=!0;this.pxPerLon={"0":93206.75555555556,1:46603.37777777778,2:23301.68888888889,3:11650.844444444445,4:5825.422222222222,5:2912.711111111111,6:1456.3555555555556,7:728.1777777777778,8:364.0888888888889,9:182.04444444444445,10:91.02222222222223,11:45.51111111111111,12:22.755555555555556,13:11.377777777777778,14:5.688888888888889,15:2.8444444444444446,16:1.4222222222222223,
17:0.7111111111111111};this.addMarker=function(a,d){this.markers.push([a,d])};this.resetMarkers=function(){this.markers=[]};this.getStaticSrc=function(b){var d="https://maps.googleapis.com/maps/api/staticmap?center="+b.lat+","+b.lng,c=640<a.width?640:a.width,e=640<a.height?640:a.height,d=d+("&zoom="+(a.zoom-0)),d=d+("&size="+c+"x"+e)+"&sensor=true",f="",h;for(h in this.markers){if(10<h)break;f+="%7C"+this.markers[h][0].lat+","+this.markers[h][0].lng}f.length&&(d+="&markers=icon:http://bit.ly/Neyhbt"+
f);f="";h=c/this.pxPerLon[17-a.zoom];c=b.lng+h/2;h=b.lng-h/2;var i=e*Math.cos(b.lat*Math.PI/180)/this.pxPerLon[17-a.zoom],e=b.lat+i/2,b=b.lat-i/2,g;for(g in areas)for(var j in areas[g].polys)areas[g].polys[j].lngR>h&&(areas[g].polys[j].lngL<c&&areas[g].polys[j].latT>b&&areas[g].polys[j].latB<e)&&(f+="&path=weight:0%7Cfillcolor:"+areas[g].color+"%7Cenc:"+areas[g].polys[j].p);1900>d.length+f.length&&(d+=f);return d};this.buildDynamic=function(b,d,c,e){if(this.lazy){var f=function(a,b,c,d,e){return function(){a.lazy=
!1;a.buildDynamic(b,c,d,e)}};window.gmaplazy=f(a,b,d,c,e);b=document.createElement("script");b.type="text/javascript";b.src="https://maps.google.com/maps/api/js?sensor=true&libraries=geometry&callback=gmaplazy";return $("head").append(b)}var f={center:new google.maps.LatLng(d.lat,d.lng),mapTypeId:google.maps.MapTypeId.ROADMAP,zoom:this.zoom},h=new google.maps.Map(b,f),i=new google.maps.InfoWindow,f=function(a){return function(b){var c=_("Alusta parkimist")+":<br />",d;for(d in a)c+="<button onclick=\"app.go('#sms-"+
a[d]+"')\">"+a[d]+"</button> ";i.setContent(c);i.setPosition(b.latLng);i.open(h)}},g;for(g in areas)for(var j in areas[g].polys)d=areas[g].color,-1!=d.indexOf("0x")&&(d="#"+d.substring(2,8)),d=new google.maps.Polygon({paths:google.maps.geometry.encoding.decodePath(areas[g].polys[j].p),strokeColor:d,strokeOpacity:0.6,strokeWeight:3,fillColor:d,fillOpacity:0.15,zIndex:areas[g].polys[j].z}),d.setMap(h),c&&google.maps.event.addListener(d,"click",f(areas[g].mzones));for(var l in this.markers)c=new google.maps.Marker({position:new google.maps.LatLng(this.markers[l][0].lat,
this.markers[l][0].lng),icon:"http://eparkimine.ee/public/images/parking.png",map:h}),google.maps.event.addListener(c,"click",this.markers[l][1]);e(h,b)}}
function App(){var a=this;this.host=(this.phonegap="file:"==window.location.protocol)?"https://eparkimine.ee":window.location.protocol+"//"+window.location.host;-1!=window.location.search.indexOf("?demo")&&(this.phonegap=!0);this.geo=new Geolocator(function(){a.go("#noloc")});this.gmap=new GMap(this.geo);this.hash=null;this.carparks=[];this.sorted=this.coords=null;this.acp=!1;this.car=null;this.cars={};this.lang="undefined"==typeof localStorage.lang?"et":localStorage.lang;this.sms="undefined"==typeof localStorage.sms?
null:JSON.parse(localStorage.sms);this.map=this.account=null;this.eb="undefined"==typeof localStorage.eb?"":localStorage.eb;this.session="undefined"==typeof localStorage.session?"":localStorage.session;this.banners=[];this.is={Android:function(){return navigator.userAgent.match(/Android/i)?!0:!1},iOS:function(){return navigator.userAgent.match(/iPhone|iPad|iPod/i)?!0:!1},Windows:function(){return navigator.userAgent.match(/IEMobile/i)?!0:!1},mobile:function(){return a.is.Android()||a.is.iOS()}};this.init=
function(b,d){$("div#p-listing").html("");10<b?alert(_("V\u00f5rgu viga..")):setTimeout(function(){$.getJSON(a.host+"/smart/init",{session:a.session,phonegap:a.phonegap?"1":"",eb:a.eb,v:version},function(c){if(!c.success)return a.init(++b,d);c.message.length&&alert(c.message);a.carparks=c.carparks;a.sorted=null;a.sess(c.session,c.account);c.session.length&&(localStorage.eb=a.eb="");a.cars=c.cars;a.cars.constructor==Array&&!a.cars.length&&(a.cars={});a.account=c.account;a.car=null;a.acp=c.acp;for(var e in a.cars)if(e==
c.car){a.car=e;break}if(!a.car)for(e in a.cars){a.car=e;break}a.banners=c.banners;d()}).error(function(){a.init(++b,d)})},123*b)};this.go=function(a){if(this.eb.length&&!(0==a.indexOf("#pin-")||0==a.indexOf("#mobid-")||0==a.indexOf("#register-")))a="#login-"+a.substring(1).replace("-","_");this.session&&0==Object.keys(this.cars).length&&(a="#newcar");if(!this.session&&(0==a.indexOf("#purchase-")||0==a.indexOf("#sms-")))a="#login-"+a.substring(1).replace("-","_");this.session&&!this.acp&&(a="#contract-"+
a.substring(1).replace("-","_"));window.location.hash=a};this.sess=function(a){localStorage.session=this.session=a};this.sort=function(b){if(null==this.sorted||this.sorted.lat!=b.lat||this.sorted.lng!=b.lng){for(var d in this.carparks)this.carparks[d].dist=a.geo.dist(this.carparks[d].coords,b);this.carparks.sort(function(a,b){return a.dist-b.dist});if(a.phonegap){for(var c in areas){d=null;var e,f;for(f in areas[c].polys)if(e=a.geo.dist({lat:areas[c].polys[f].lat,lng:areas[c].polys[f].lng},b),null==
d||e<d)d=e;areas[c].dist=d}areas.sort(function(a,b){return a.dist-b.dist})}}};this.mins=function(a){return 60>a?a+"min":Math.round(10*(a/60))/10+"h"};this.fmts=function(a){a=new Date(1E3*a);return a.getDate()+"."+a.getMonth()+"."+a.getFullYear()+" "+("0"+a.getHours()).slice(-2)+":"+("0"+a.getMinutes()).slice(-2)};this.cp=function(a){var d=null,c;for(c in this.carparks)if(this.carparks[c].ID==a){d=this.carparks[c];break}return d};this.rcp=function(a,d,c){var e="";"undefined"!=typeof a.dist&&(e=Math.round(10*
a.dist)/10,e=10>e?", "+e+" km":"");return'<div class="rcp" id="'+a.ID+'" cat="'+c+'" part="'+a.partner+'"><span class="dist"><b>'+a.mzone+"</b> "+a.town+e+"</span><strong>"+a.name+"</strong>"+(a.partner?' <span class="partner">('+a.partner+")</span>":"")+(d?"<p>"+this.rpc(a)+"</p>":"")+"</div>"};this.pia=function(a){return null==a.period_length?1:!a.period_length?0:a.period_start>(new Date).getTime()/1E3?2:a.period_start+a.period_length>(new Date).getTime()/1E3?1:0};this.rpl=function(b,d){var c=this.pia(b);
c?(c=null==b.period_length?_("T\u00e4htajatu parkimis\u00f5igus")+(d?" "+_("alates")+" "+a.fmts(b.period_start):""):2==c?_("Kehtiv alates")+" "+a.fmts(b.period_start):_("Kehtiv kuni")+" "+a.fmts(b.period_start+b.period_length),c="<b>"+c+"</b>"):c=d?_("Kehtivus l\u00f5ppes")+" "+a.fmts(b.period_start+b.period_length):_("Kehtivus l\u00f5ppenud");return'<p style="margin-top: 4px; margin-bottom: 4px; ">'+c+"</p>"};this.rpc=function(b){return(0<b.free?"<b>"+a.mins(b.free)+" tasuta.</b> ":"")+b.prices};
this.app=function(){var b=function(){var b=window.location.hash;b.length||(b="#tiles");if(b!=a.hash){a.hash=b;var b=function(){$("div#pages>div:visible").css("display","none");$("div#pages>div#p-"+a.hash.split("-")[0].substring(1)).css("display","block");window.scrollTo(0,1)},c=a.hash.split("-");switch(c[0]){case "#tiles":a.loadTiles(b);break;case "#sms":a.loadSms(c[1],b);break;case "#login":a.loadLogin(c[1],b);break;case "#pin":a.loadPin(c[1],c[2],b);break;case "#mobid":a.loadMobid(c[1],b);break;
case "#register":a.loadRegister(c[1],c[2],b);break;case "#contract":a.loadContract(c[1],b);break;case "#car":a.loadCar(b);break;case "#newcar":a.loadNewCar(b);break;case "#carparks":a.loadCarparks(b);break;case "#carpark":a.loadCarpark(c[1],b);break;case "#enclosed":a.loadEnclosed(c[1],b);break;case "#purchase":a.loadPurchase(c[1],b);break;case "#term":a.loadTerm(c[1],b);break;case "#map":a.loadMap(c[1],c[2],b);break;case "#settings":a.loadSettings(b);break;case "#noloc":a.loadNoloc(b);break;default:a.loadTiles(b)}}};
setInterval(b,777);$(window).bind("hashchange",b);b()};this.headerBtns=!1;this.header=function(b,d){$("div#header").css("display",0==b?"none":"block");$("div#header div#h-car span").text(a.cars[a.car]);$("div#header div#h-car").css("display",this.session&&2==b?"block":"none");$("div#header div#h-login").css("display",!this.session&&2==b?"block":"none");this.headerBtns||(this.headerBtns=!0,new citypark.FastButton($("div#header button#h-back").get(0),function(){window.history.back()}),new citypark.FastButton($("div#header button#h-settings").get(0),
function(){a.go("#settings")}),new citypark.FastButton($("div#header div#h-car button").get(0),function(){a.go("#car")}),new citypark.FastButton($("div#header div#h-login button").get(0),function(){a.go("#login-tiles")}));d()};this.loadTiles=function(b){this.header(2,function(){a.geo.addWatcher("tiles",function(d){a.sort(d);a.gmap.resetMarkers();a.gmap.zoom=16;a.gmap.width=$(window).width()-20;a.gmap.height=222;var c=$("div#p-tiles div:first").html(""),e=$(window).width()-20,f=Math.round(e/2-5),h,
i=Math.round(e/1.8),g={},j=0,l=null,q=function(b,d,g){a.gmap.addMarker(a.carparks[b].coords);h=g?e:f;var j=!1,k=!1,l=!1,n="";if(d.length){for(var m in d)a.pia(d[m])&&(j=!0,d[m].period_open&&(k=!0),d[m].hotsec_enclosed&&(k=!1,l=!0));1<d.length?(l=k=!1,n=_("Mitu parkimis\u00f5igust")):n=a.rpl(d[0],!1)}n=(j?"":a.rpc(a.carparks[b]))+n;g=$('<div cp="'+a.carparks[b].ID+'" class="p-t-tile p-t-tile-'+(g?"100":"50")+'"><div><div class="p-t-tile-h"'+(j?' style="background-color:#FF4F00"':"")+"><div><span>"+
a.carparks[b].mzone+"</span>"+a.carparks[b].name+"<small>"+n+"</small>"+(j&&k?"<button>"+_("l\u00f5peta")+"</button>":"")+(j&&l?"<button>"+_("v\u00e4lju")+"</button>":"")+'</div></div><img style="width:'+h+"px;height:"+i+'px" /></div></div>');$("img",g).load(function(){$(this).attr("style","width:100%")}).attr("src",a.host+"/smart/carpark-photo/id/"+a.carparks[b].ID+"/w/"+h+"/h/"+i+"/i/"+a.carparks[b].photo);new citypark.FastButton(g.get(0),function(b,c){a.go("#carpark-"+$(c).attr("cp"))});j&&k&&
new citypark.FastButton($("button",g).get(0),function(){a.go("#term-"+d[0].ID)});j&&l&&new citypark.FastButton($("button",g).get(0),function(){a.go("#enclosed-"+a.carparks[b].ID)});g.appendTo(c)},n;for(n in a.banners)tile=$('<div class="p-t-button"><button style="background: #FF4F00; border: solid 1px red">'+a.banners[n]+"</button></div>"),new citypark.FastButton(tile.get(0),function(){window.location.href=n}),tile.appendTo(c);var r=[];if(a.phonegap)if(null==a.sms){var m=0,k;for(k in areas){if(25<
areas[k].dist)break;for(var t in areas[k].mzones)++m,tile=$('<div z="'+areas[k].mzones[t]+'" class="p-t-button p-t-button-50"><button><small>'+areas[k].name+"</small> "+areas[k].mzones[t]+"</button></div>"),new citypark.FastButton(tile.get(0),function(b,c){a.go("#sms-"+$(c).attr("z"))}),r.push(tile)}m%2&&(tile=$('<div class="p-t-button p-t-button-50"><button>'+_("K\u00f5ik parklad")+"</button></div>"),new citypark.FastButton(tile.get(0),function(){a.go("#carparks")}),r.push(tile))}else tile=$('<div class="p-t-tile p-t-tile-100"><div style="background: #FF4F00"><table width="100%"><tr><td style="text-align: center; font-size: 1.5em; color:white"><small>'+
_("Pargitud")+":</small> "+a.sms.zone+'</td><td style="text-align: right; padding-right: 0.5em"><button style="width: auto; padding: 0.5em; font-size: 1em; display: inline; border-color: #e52600; background: #f02800;">'+_("l\u00f5peta")+"</button></td></tr></table></div></div>"),new citypark.FastButton(tile.find("button").get(0),function(){window.plugins.call.place("1903",function(){localStorage.sms=a.sms=null;a.go("#tiles-"+(new Date).getTime())},function(a){alert(_("Parkimise l\u00f5petamine eba\u00f5nnestus:")+
" "+a)})}),tile.appendTo(c);else a.is.mobile()&&a.is.Android()&&(tile=$('<div class="p-t-button"><button style="font-size: 0.9em; background: #2a2a2a url(images/'+(a.is.Android()?"android":"appstore")+'.png) 10px 5px no-repeat; padding-left: 111px;">T\u00f5mba rakendus alla<br /><small>ning pargi ka linnat\u00e4navail</small></button></div>'),new citypark.FastButton(tile.find("button").get(0),function(){window.location.href=a.is.Android()?"https://play.google.com/store/apps/details?id=ee.citypark.nuti":
"itms://itunes.com/apps/ee.citypark.nutiparkimine"}),tile.appendTo(c));for(var p in a.carparks){var m=[],u;for(u in a.carparks[p].permits)if(k=a.carparks[p].permits[u],null==k.car_reg||k.car_reg==a.cars[a.car])a.pia(k)?m.push(k):g[p]=k;2<p&&!m.length?null==l&&(l=p):(q(p,m,0==j),j++,g[p]=null)}0==j%2&&q(l,[],!1);for(var v in r)r[v].appendTo(c);tile=$('<div class="p-t-tile p-t-tile-100"><div><img style="width:100%" src="'+a.gmap.getStaticSrc(d)+'" id="p-tiles-map" /></div></div>');new citypark.FastButton(tile.get(0),
function(){a.go("#map")});tile.appendTo(c);tile=$('<div class="p-t-button"><button>'+_("K\u00f5ik parklad")+"</button></div>");new citypark.FastButton(tile.get(0),function(){a.go("#carparks")});tile.appendTo(c);for(var s in g)g[s]&&q(s,[g[s]],!1);a.coords=d;b()});a.geo.startWatching()})};this.loadSms=function(b,d){this.header(2,function(){$("div#p-sms span").text(b);$("div#p-sms button").unbind("click").click(function(){if(-1!=window.location.search.indexOf("?demo"))return alert("Demos kahjuks mobiilselt parkida ei saa :)");
window.plugins.sms.send("1902",a.cars[a.car]+" "+b,function(){a.sms={zone:b,start:(new Date).getTime()};localStorage.sms=JSON.stringify(a.sms);alert(_("S\u00f5num on edastatud. Palun kontrollige vastus\u00f5numit!"));a.go("#tiles")},function(a){alert(_("S\u00f5numi edastamine eba\u00f5nnestus:")+" "+a)})});d()})};this.loadCarpark=function(b,d){this.header(2,function(){var c=a.cp(b),e;e='<div class="p-shade">'+a.rcp(c,!0,"");c.enclosed&&(e+="<button onclick=\"app.go('#enclosed-"+b+'\')" style="background-image:url(images/barrier.png); padding-left: 35px; background-repeat: no-repeat; background-position: 10px center">'+
_("Ava t\u00f5kkepuu")+"</button>",e+='<p style="margin-top: 35px">'+_("Juhul, kui soovite soetada PIN-pileti m\u00f5neks muuks ajaks tulevikus, valige")+":</p>");var f=null;c.prices.length?f="#purchase-"+b:a.phonegap&&1==c.mpark&&(f="#sms-"+c.mzone);f&&(e+="<button onclick=\"app.go('"+f+'\')" style="background-image:url(images/shopping-cart.png); padding-left: 35px; background-repeat: no-repeat; background-position: 10px center">'+_("Osta parkimisluba")+"</button>");e+="</div>";var f=[],h;for(h in c.permits.sort(function(b,
c){var d=a.pia(c)-a.pia(b);return 0==d?b.period_start<c.period_start:d}))(null==c.permits[h].car_reg||c.permits[h].car_reg==a.cars[a.car])&&f.push(c.permits[h]);if(f.length)for(var i in f)h="",a.pia(f[i])&&f[i].hotsec_enclosed?h='<button class="lift" rel="'+b+'" style="float: right; font-size: 1.1em; padding: 5px; margin: 0; margin-top: -4px; width: auto;">'+_("v\u00e4lju")+"</button>":a.pia(f[i])&&f[i].period_open&&(h='<button class="term" rel="'+f[i].ID+'" style="float: right; font-size: 1.1em; padding: 5px; margin: 0; margin-top: -4px; width: auto;">'+
_("l\u00f5peta")+"</button>"),e+='<div class="p-shade" style="padding:10px">'+h+a.rpl(f[i],!0),"undefined"!=typeof f[i].hotsec_pin_nr&&(e+="PIN: "+f[i].hotsec_pin_nr+"  PUK: "+f[i].hotsec_puk_nr),e+="</div>";i=$(window).width()-38;f=Math.round(0.6*i);e+='<img src="'+a.host+"/smart/carpark-photo/id/"+c.ID+"/w/"+i+"/h/"+f+"/i/"+c.photo+'" />';a.gmap.resetMarkers();a.gmap.zoom=16;a.gmap.width=i;a.gmap.height=f;a.gmap.addMarker(c.coords);e+='<img src="'+a.gmap.getStaticSrc(c.coords)+'" onclick="window.app.go(\'#map-'+
c.coords.lat+"-"+c.coords.lng+"')\" />";$("div#p-carpark").html("").append(e);$("div#p-carpark button.lift").click(function(){a.go("#enclosed-"+$(this).attr("rel"))});$("div#p-carpark button.term").click(function(){a.go("#term-"+$(this).attr("rel"))});d()})};this.loadCarparks=function(b){this.header(2,function(){a.geo.addWatcher("cps",function(b){var c={};a.sort(b);var e=[],f;for(f in a.carparks){var h=a.carparks[f].partner,h=h?h:"Citypark";e.push([a.carparks[f].dist,a.carparks[f].name,a.rcp(a.carparks[f],
!1,h)]);c[h]="undefined"==typeof c[h]?1:c[h]+1}if(a.phonegap)for(var i in areas)for(var g in areas[i].mzones)h=areas[i].name.split(" ")[0],c[h]="undefined"==typeof c[h]?1:c[h]+1,e.push([areas[i].dist,areas[i].name,'<div class="area" cat="'+h+'"><span class="dist"><b>'+areas[i].mzones[g]+"</b></span><strong>"+areas[i].name+"</strong></div>"]);$("div#p-carparks div#p-cps-cats").html("");for(h in c)$("div#p-carparks div#p-cps-cats").append("<div><span>"+h+'</span><span class="dist">'+c[h]+"</span></div>");
var j=function(b,c){$(b).addClass("toggled").siblings().removeClass("toggled");$("div#p-carparks input#p-cps-search").val("");e.sort(c);var d=$("div#p-carparks div#p-cps-list").html(""),f="",g;for(g in e)f+=e[g][2];d.get(0).outerHTML='<div id="p-cps-list">'+f+"</div>";$("div#p-carparks div#p-cps-list>div.rcp").click(function(){a.go("#carpark-"+$(this).attr("id"))});$("div#p-carparks div#p-cps-list>div.area").click(function(){a.go("#sms-"+$(this).find("span b").text())})},l=function(a,b){var c=a[0],
d=b[0];return c<d?-1:c>d?1:0},q=function(a,b){var c=a[1].toUpperCase(),d=b[1].toUpperCase();return c<d?-1:c>d?1:0};$("div#p-carparks div#p-cps-cats div").click(function(){var a=$("span:first",this).text();$("html,body").animate({scrollTop:$("div#p-carparks div#p-cps-list").offset().top-100},500);$("div#p-carparks div#p-cps-list div").css("display","none").each(function(){$(this).attr("cat")==a&&$(this).css("display","block")})});$("div#p-carparks button#p-cps-cats").unbind("click").click(function(){j(this,
l);$("div#p-carparks>div#p-cps-cats").show();$("div#p-carparks div#p-cps-list div").css("display","none")});$("div#p-carparks button#p-cps-dist").unbind("click").click(function(){j(this,l);$("div#p-carparks>div#p-cps-cats").hide();$("div#p-carparks div#p-cps-list div").css("display","block")});$("div#p-carparks button#p-cps-az").unbind("click").click(function(){j(this,q);$("div#p-carparks>div#p-cps-cats").hide();$("div#p-carparks div#p-cps-list div").css("display","block")});$("div#p-carparks button.toggled").triggerHandler("click");
$("div#p-carparks input#p-cps-search").unbind("focus").focus(function(){$("div#p-carparks button#p-cps-az").triggerHandler("click")}).unbind("keyup").keyup(function(){var a=$(this).val().toUpperCase();$("div#p-carparks div#p-cps-list div").css("display","block").each(function(){-1===$("strong",this).text().toUpperCase().indexOf(a)&&-1===$("span>b",this).text().toUpperCase().indexOf(a)&&$(this).css("display","none")});return!1})});a.geo.startWatching();b()})};this.loadEnclosed=function(b,d){this.header(1,
function(){var c="in",e=a.cp(b),f;for(f in e.permits)f=e.permits[f],a.pia(f)&&f.hotsec_enclosed&&(c="out");$("div#p-enclosed div.p-e-dir").hide();$("div#p-enclosed div#p-e-dir-"+c).show();var h=$("div#p-enclosed button#p-e-lift");h.unbind("click").removeAttr("disabled").text(h.attr(c)).click(function(){h.text(_("Palun oodake..")).attr("disabled","disabled");$.getJSON(a.host+"/smart/enclosed-lift",{session:a.session,carpark:b,car:a.car,dir:c,v:version,l:a.lang},function(b){if(!b.success)return h.text(_("Proovige uuesti")).removeAttr("disabled"),
alert(b.message);localStorage.eb=a.eb=b.eb;a.init(0,function(){a.go("#tiles")})})});d()})};this.loadPurchase=function(b,d){this.header(2,function(){var c=a.cp(b);$("div#p-purchase div#p-pc-carpark").html(a.rcp(c,!1,""));var e=a.account.person.balance,e=e<-a.account.person.credit?0:a.account.person.credit+e;if(a.account.legals.length){$("div#p-purchase div#p-pc-buyer").hide();var e={"0":a.account.person.name+" <small>"+Math.round(100*e)/100+" \u20ac</small>"},f;for(f in a.account.legals){var h=a.account.legals[f];
e[h.ID]=h.name+" <small>"+Math.round(100*h.credit)/100+" \u20ac</small>"}$("input#p-pc-buyer-select").scroller("destroy").scroller({display:"inline",wheels:[{X:e}],showLabel:!1,height:40,rows:3,theme:"p-pc-buyer"}).scroller("getInst").change(!0)}else $("div#p-purchase div#p-pc-buyer").html(a.account.person.name+"<br />"+a.account.person.code+"<p>"+_("Vabad vahendid")+": "+Math.round(100*e)/100+" \u20ac</p>").show(),$("input#p-pc-buyer-select").scroller("destroy");$("div#p-purchase span#p-pc-carpark").text(c.name);
$("div#p-purchase button#p-pc-det").unbind("click").click(function(){$(this).parent().hide().next().slideDown("fast");var a=$("div#p-purchase button#p-pc-buy");a.text(a.attr("o"))}).parent().show();$("div#p-purchase button#p-pc-now").parent().hide();$("input#p-pc-start").scroller("destroy").scroller({preset:"datetime",display:"inline",dateOrder:"D ddmmyy",timeWheels:"HHii",dayNamesShort:_("PETKNRL").split(""),showLabel:!1,height:48,theme:"p-pc-start",startYear:(new Date).getFullYear(),minDate:new Date,
dateFormat:"yy-mm-dd",timeFormat:"HH:ii:ss",onChange:function(c){c=c.split(" ");c[0]=c[0].split("-");c[1]=c[1].split(":");$.getJSON(a.host+"/smart/pricelist",{carpark:b,start:Math.round((new Date(c[0][0],c[0][1],c[0][2],c[1][0],c[1][1])).getTime()/1E3),v:version,l:a.lang},function(a){if(!a.success)return alert("Hinnakirja arvestuses tekkis viga..");a=a.pricelist;$("input#p-pc-price").scroller("destroy").scroller({display:"inline",wheels:[{PL:a}],showLabel:!1,height:40,rows:5,theme:"p-pc-price"}).scroller("getInst").change(!0);
"undefined"!=typeof a["auto-12h"]&&$("input#p-pc-price").scroller("setValue",["auto-12h"],!0,1)})}}).scroller("getInst").change(!0);$("div#p-purchase button#p-pc-now").unbind("click").click(function(){var a=new Date;$("input#p-pc-start").scroller("setValue",[0,0,0,0,0]);setTimeout(function(){$("input#p-pc-start").scroller("setValue",[a.getDate(),a.getMonth(),a.getFullYear(),a.getHours(),a.getMinutes()],!0,1)},300);var b=$("div#p-purchase button#p-pc-buy");b.text(b.attr("o"))});var i=$("div#p-purchase input#p-pc-email");
a.account.person.email?i.val("").parent().hide():i.val(localStorage.email).parent().show();$("div#p-purchase button#p-pc-buy").unbind("click").click(function(){localStorage.email=i.val();var c=$(this).attr("disabled","disabled").text(_("\u00dcks hetk..")),d=$("input#p-pc-start").val().replace(" ","T"),e=$("input#p-pc-price").val(),f=$("input#p-pc-buyer-select").val();$.getJSON(a.host+"/smart/purchase",{session:a.session,car:a.car,carpark:b,start:d,price:e,buyer:f,email:i.val(),v:version,l:a.lang},
function(b){if(!b.success)return c.removeAttr("disabled").text(c.attr("o")),alert(b.message);b.hotsec_pin_nr&&alert("Teie PIN-kood parklasse sisenemiseks ja sellest v\u00e4ljumiseks: ** "+b.hotsec_pin_nr+" **\n\nPUK-kood parklast v\u00e4ljumiseks parkimisaja \u00fcletamisel vastavalt tingimustele: ** "+b.hotsec_puk_nr+" **");c.text(_("Ost \u00f5nnestus!"));a.init(0,function(){c.removeAttr("disabled").text(c.attr("o"));a.go("#tiles")})})});d()})};this.loadTerm=function(b,d){this.header(2,function(){$("div#p-term>div>div:gt(0)").hide();
$("div#p-term>div>div:eq(0)").show();$.getJSON(a.host+"/smart/terminate",{session:a.session,ID:b,v:version,l:a.lang},function(b){$("div#p-term>div>div:eq(0)").hide();b.success?a.init(0,function(){$("div#p-term>div>div:eq(1)").show();$("div#p-term>div>div:eq(2)").hide();$("div#p-term span#p-tm-cost").text(b.cost);$("div#p-term span#p-tm-usable").text(b.usable);$("div#p-term button").show().click(function(){a.go("#tiles")})}):$("div#p-term>div>div:eq(2)").text(b.message).show()});d()})};this.loadLogin=
function(b,d){this.header(1,function(){$("div#p-login input#p-l-idcode").val(localStorage.idcode);$("div#p-login button").unbind("click").click(function(){var c=localStorage.idcode=$(this).siblings("input#p-l-idcode").val(),d;if(c.length){var f=[1,2,3,4,5,6,7,8,9,1];d=[3,4,5,6,7,8,9,1,2,3];for(var h=c.charAt(10),i=0,g=0;10>g;g++)i+=c.charAt(g)*f[g];f=i%11;i=0;if(10==f){for(g=0;10>g;g++)i+=c.charAt(g)*d[g];f=i%11;10==f&&(f=0)}d=f==h}else d=!1;if(!d)return alert(_("Isikukood ei paista olevat korrektne"));
var j=$(this).attr("disabled","disabled").text(_("\u00dcks hetk.."));$.getJSON(a.host+"/smart/status",{idcode:c,v:version,l:a.lang},function(d){j.text(j.attr("o")).removeAttr("disabled");if(!d.success)return alert(d.message);d.status?a.go("#pin-"+c+"-"+b):a.go("#register-"+c+"_"+encodeURIComponent(d.skname)+"-"+b)})});$("div#p-login img#p-l-mobid").unbind("click").click(function(){a.go("#mobid-"+b)});d()})};this.loadMobid=function(b,d){this.header(1,function(){var c=$("div#p-mobid div.p-shade:first").hide();
$("div#p-mobid input").val(localStorage.phone);var e=$("div#p-mobid button").show().unbind("click").click(function(){e.hide();c.show().text(_("Palun oodake.."));var d=localStorage.phone=$("div#p-mobid input").val();$.ajax({url:a.host+"/smart/mobid-login/msisdn/"+d+"/v/"+version+"/l/"+a.lang,contentType:"text/json",cache:!1,success:function(d){if(!d.success)return e.show(),c.hide(),alert(d.message);var f=d.challenge;c.html(_("Palun kontrollige, et kinnituskood <b>KK</b> klapib telefoniekraanil oleva koodiga ning sisestage seej\u00e4rel telefonis <b>PIN1</b>.").replace("KK",
f));var g;g=window.setInterval(function(){$.ajax({url:a.host+"/smart/mobid-poll/token/"+d.token+"/v/"+version+"/l/"+a.lang,contentType:"text/json",cache:!1,success:function(d){if(null!=g){if(!d.success)return window.clearInterval(g),g=null,e.show(),c.hide(),alert(d.message);d.authenticated&&(window.clearInterval(g),g=null,e.show(),c.hide(),a.sess(d.session),a.init(0,function(){a.go("#"+b.replace("_","-"))}))}},error:function(){if(null!=g)return window.clearInterval(g),g=null,e.show(),c.hide(),alert(_("Mobiil-ID autentimisel tekkis viga."))}})},
1234)},error:function(){e.show();c.hide();alert(_("Mobiil-ID autentimisel tekkis viga."))}})});d()})};this.loadPin=function(b,d,c){this.header(1,function(){$("div#p-pin b span").text(b);$("div#p-pin button:eq(0)").unbind("click").click(function(){var c=$(this).prev("input").val();$(this).prev("input").val("");if(!/^[0-9]{4}$/.test(c))return alert(_("PIN koosneb neljast numbrist!"));var f=$(this).attr("disabled","disabled").text(_("\u00dcks hetk.."));$.getJSON(a.host+"/smart/login",{idcode:b,pin:c,
v:version,l:a.lang},function(b){f.text(f.attr("o")).removeAttr("disabled");if(!b.success)return alert(b.message);a.sess(b.session);a.init(0,function(){a.go("#"+d.replace("_","-"))})})});$("div#p-pin button:eq(1)").unbind("click").click(function(){var c=$(this).attr("disabled","disabled").text(_("\u00dcks hetk.."));$.getJSON(a.host+"/smart/recover",{idcode:b,v:version,l:a.lang},function(a){if(!a.success)return c.text(c.attr("o")).removeAttr("disabled"),alert(a.message);c.text(_("SMS on l\u00e4hetatud"))})});
c()})};this.loadRegister=function(b,d,c){this.header(1,function(){b=b.split("_");b[1]=decodeURIComponent(b[1]);$("div#p-register b span").text(b[0]);$("div#p-register input#p-r-name").val(b[1]);$("div#p-register button").unbind("click").click(function(){var c=$(this).attr("disabled","disabled").text(_("\u00dcks hetk.."));$.getJSON(a.host+"/smart/register",{idcode:b[0],car:$("div#p-register input#p-r-car").val(),name:$("div#p-register input#p-r-name").val(),email:$("div#p-register input#p-r-email").val(),
phone:$("div#p-register input#p-r-phone").val(),v:version,l:a.lang},function(b){if(!b.success)return c.text(c.attr("o")).removeAttr("disabled"),alert(b.message);a.sess(b.session);alert(_("NB! Palun kirjutage \u00fcles Teie PIN-kood:")+" ** "+b.pin+" **");a.init(0,function(){a.go("#"+d.replace("_","-"))})})});c()})};this.loadContract=function(b,d){this.header(1,function(){$.getJSON(a.host+"/smart/contract-list",{session:a.session,v:version,l:a.lang},function(c){if(!c.success)return alert("Lepingudokumentide laadimisel tekkis viga");
$("div#p-contract ul").html("");for(var d in c.list)$("div#p-contract ul").append('<li><a href="#" rel="'+d+'">'+c.list[d].split(" - ")[0].replace(".html","")+"</a></li>");$("div#p-contract button#p-c-decline").click(function(){window.location.hash="#tiles"});$("div#p-contract button#p-c-accept").click(function(){a.acp=!0;$.getJSON(a.host+"/smart/contract-accept",{session:a.session,v:version,l:a.lang},function(){a.go("#"+b.replace("_","-"))})});$("div#p-contract ul a").click(function(){$.getJSON(a.host+
"/smart/contract-file",{session:a.session,v:version,l:a.lang,id:$(this).attr("rel")},function(a){$("div#p-contract div#p-c-text").html(a.file).show();$("html,body").animate({scrollTop:$("div#p-contract div#p-c-text").offset().top-100},500)});return!1})});d()})};this.loadCar=function(b){this.header(1,function(){var d=$("div#p-car div.select");$("button:not(:last)",d).remove();for(var c in a.cars){var e=$('<button rel="'+c+'" style="width: 16%; display: inline; margin-bottom: 0; margin-left: 4%"><b>X</b></button>');
e.click(function(){var b=$(this).attr("disabled","disabled");$.getJSON(a.host+"/smart/car-del",{session:a.session,car:$(this).attr("rel"),v:version,l:a.lang},function(c){b.removeAttr("disabled");if(!c.success)return alert(c.message);a.init(0,function(){a.go("#car-"+ +(new Date).getTime())})})});d.prepend(e);e=$('<button rel="'+c+'" style="width: 80%; display: inline; margin-bottom: 0"><b>'+a.cars[c]+"</b></button>");e.click(function(){$.getJSON(a.host+"/smart/car-set",{session:a.session,car:$(this).attr("rel"),
v:version});a.car=$(this).attr("rel");a.go("#tiles")});d.prepend(e)}b()})};this.loadNewCar=function(b){this.header(1,function(){$("div#p-newcar button").unbind("click").click(function(){var b=$(this).attr("disabled","disabled").text(_("\u00dcks hetk.."));$.getJSON(a.host+"/smart/car-new",{session:a.session,reg:$("div#p-newcar input:first").val(),v:version,l:a.lang},function(c){b.text(b.attr("o")).removeAttr("disabled");if(!c.success)return alert(c.message);a.cars[c.car.ID]=c.car.reg;a.car=c.car.ID;
a.go("#tiles")})});b()})};this.loadMap=function(b,d,c){this.header(1,function(){var e=function(b){if(null==a.map){var d=$('<div id="map_canvas" style="width:100%; background:white"></div>').appendTo("div#p-map").height($(window).height()-10-45);a.gmap.resetMarkers();var e=function(b){return function(){a.go("#carpark-"+a.carparks[b].ID)}},g;for(g in a.carparks)a.gmap.addMarker(a.carparks[g].coords,e(g));a.gmap.zoom=15;a.gmap.buildDynamic(d.get(0),b,a.phonegap,function(b,c){a.map=[c,b]})}else $(a.map[0]).appendTo("div#p-map").height($(window).height()-
10),a.map[1].setCenter(new google.maps.LatLng(b.lat,b.lng));c()};"undefined"==typeof b?(a.geo.addWatcher("map",e),a.geo.startWatching()):e({lat:b,lng:d})})};this.loadSettings=function(b){this.header(1,function(){if(a.session){var d=a.account.person.balance,d=d<-a.account.person.credit?0:a.account.person.credit+d;$("div#p-settings div#p-s-person>div").html(a.account.person.name+"<br />"+a.account.person.code+"<br />"+_("Krediidilimiit")+": "+a.account.person.credit+" \u20ac<br />"+_("Vabad vahendid")+
": "+Math.round(100*d)/100+" \u20ac").parent().show()}else $("div#p-settings p#p-s-person").parent().hide();$("div#p-settings button.p-s-language").unbind("click").click(function(){localStorage.lang=$(this).attr("rel");window.location.href=-1!=window.location.search.indexOf("?demo")?"?demo&reload="+(new Date).getTime():"?reload="+(new Date).getTime()});$("div#p-settings button#p-s-logout").unbind("click").click(function(){a.session=localStorage.session="";a.account=null;a.car=null;a.cars={};a.go("#tiles")});
b()})};this.loadNoloc=function(b){this.header(1,function(){a.is.mobile()&&a.is.Android()&&($("div#pages div#p-noloc div#p-noloc-fb").show(),a.is.Android()?$("div#pages div#p-noloc div#p-noloc-fb a:eq(0)").show():$("div#pages div#p-noloc div#p-noloc-fb a:eq(1)").show());b()})};$(document.body).load("body/"+this.lang+"."+version+".html",function(){a.phonegap||($("div#pages div#p-loc").show(),a.is.mobile()&&a.is.Android()&&setTimeout(function(){$("div#p-loading").hide();$("div#pages div#p-loc div#p-loc-fb").fadeIn("fast");
a.is.Android()?$("div#pages div#p-loc div#p-loc-fb a:eq(0)").show():$("div#pages div#p-loc div#p-loc-fb a:eq(1)").show()},3333));a.init(0,function(){a.app()})})};

(function(e){function q(a,b){function i(){var a=document.body,b=document.documentElement;return Math.max(a.scrollHeight,a.offsetHeight,b.clientHeight,b.scrollHeight,b.offsetHeight)}function m(a){k=e("li.dw-v",a).eq(0).index();c=e("li.dw-v",a).eq(-1).index();d=f.height;t=h}function l(a){var b=f.headerText;return b?"function"==typeof b?b.call(A,a):b.replace(/{value}/i,a):""}function n(){h.temp=H&&null!==h.val&&h.val!=a.val()||null===h.values?f.parseValue(a.val()?a.val():"",h):h.values.slice(0);h.setValue(!0)}
function z(a,b,m,c,d){f.validate.call(A,v,m);e(".dww ul",v).each(function(c){var f=e(this),l=e('li[data-val="'+h.temp[c]+'"]',f),f=l.index(),i=l,l=f;if(!i.hasClass("dw-v")){for(var g=i,r=0,j=0;g.prev().length&&!g.hasClass("dw-v");)g=g.prev(),r++;for(;i.next().length&&!i.hasClass("dw-v");)i=i.next(),j++;(j<r&&j&&1==!d||!r||!g.hasClass("dw-v")||1==d)&&i.hasClass("dw-v")?l+=j:(i=g,l-=r);h.temp[c]=i.attr("data-val")}g=c==m||void 0===m;if(f!=l||g)h.scroll(e(this),l,g?a:0.2,b,c)});h.change(c)}function N(){var a=
0,b=0,c=e(window).width(),m=e(window).height(),l=e(window).scrollTop(),f=e(".dwo",v),d=e(".dw",v),h,g;e(".dwc",v).each(function(){h=e(this).outerWidth(!0);a+=h;b=h>b?h:b});h=a>c?b:a;d.width(h);h=d.outerWidth();g=d.outerHeight();d.css({left:(c-h)/2,top:l+(m-g)/2});f.height(0).height(i())}function q(a){var b=+a.data("pos")+1;o(a,b>c?k:b,1)}function D(a){var b=+a.data("pos")-1;o(a,b<k?c:b,2)}var h=this,A=a,a=e(A),L,f=e.extend({},C),E,v,M={},O={},H=a.is("input"),I=!1;h.enable=function(){f.disabled=!1;
H&&a.prop("disabled",!1)};h.disable=function(){f.disabled=!0;H&&a.prop("disabled",!0)};h.scroll=function(a,b,c,e,m){var l=(E-b)*f.height;a.attr("style",(c?P+"-transition:all "+c.toFixed(1)+"s ease-out;":"")+(G?P+"-transform:translate3d(0,"+l+"px,0);":"top:"+l+"px;"));if(c&&void 0!==e){var d=0;clearInterval(M[m]);M[m]=setInterval(function(){d+=0.1;a.data("pos",Math.round((b-e)*Math.sin(d/c*(Math.PI/2))+e));d>=c&&(clearInterval(M[m]),a.data("pos",b))},100);clearTimeout(O[m]);O[m]=setTimeout(function(){"mixed"==
f.mode&&!a.hasClass("dwa")&&a.closest(".dwwl").find(".dwwb").fadeIn("fast")},1E3*c)}else a.data("pos",b)};h.setValue=function(b,c,e){var m=f.formatResult(h.temp);h.val=m;h.values=h.temp.slice(0);I&&b&&z(e);c&&H&&a.val(m).trigger("change")};h.validate=function(a,b,c,m){z(a,b,c,!0,m)};h.change=function(a){var b=f.formatResult(h.temp);"inline"==f.display?h.setValue(!1,a):e(".dwv",v).html(l(b));a&&f.onChange.call(A,b,h)};h.hide=function(){if(!1===f.onClose.call(A,h.val,h))return!1;e(".dwtd").prop("disabled",
!1).removeClass("dwtd");a.blur();v&&v.remove();I=!1;e(window).unbind(".dw")};h.show=function(){if(f.disabled||I)return!1;var b=f.height,c=f.rows*b;n();for(var d='<div class="'+f.theme+'">'+("inline"==f.display?'<div class="dw dwbg dwi"><div class="dwwr">':'<div class="dwo"></div><div class="dw dwbg"><div class="dwwr">'+(f.headerText?'<div class="dwv"></div>':"")),l=0;l<f.wheels.length;l++){var d=d+('<div class="dwc'+("scroller"!=f.mode?" dwpm":" dwsc")+(f.showLabel?"":" dwhl")+'"><div class="dwwc dwrc"><table cellpadding="0" cellspacing="0"><tr>'),
i;for(i in f.wheels[l]){var d=d+('<td><div class="dwwl dwrc">'+("scroller"!=f.mode?'<div class="dwwb dwwbp" style="height:'+b+"px;line-height:"+b+'px;"><span>+</span></div><div class="dwwb dwwbm" style="height:'+b+"px;line-height:"+b+'px;"><span>&ndash;</span></div>':"")+'<div class="dwl">'+i+'</div><div class="dww dwrc" style="height:'+c+"px;min-width:"+f.width+'px;"><ul>'),j;for(j in f.wheels[l][i])d+='<li class="dw-v" data-val="'+j+'" style="height:'+b+"px;line-height:"+b+'px;">'+f.wheels[l][i][j]+
"</li>";d+='</ul><div class="dwwo"></div></div><div class="dwwol"></div></div></td>'}d+="</tr></table></div></div>"}d+=("inline"!=f.display?'<div class="dwbc"><span class="dwbw dwb-s"><a href="#" class="dwb">'+f.setText+'</a></span><span class="dwbw dwb-c"><a href="#" class="dwb">'+f.cancelText+"</a></span></div>":'<div class="dwcc"></div>')+"</div></div></div>";v=e(d);z();"inline"!=f.display?v.appendTo("body"):a.is("div")?a.html(v):v.insertAfter(a);I=!0;L.init(v,h);"inline"!=f.display&&(e(".dwb-s a",
v).click(function(){h.setValue(!1,!0);h.hide();f.onSelect.call(A,h.val,h);return!1}),e(".dwb-c a",v).click(function(){h.hide();f.onCancel.call(A,h.val,h);return!1}),e("input,select").each(function(){e(this).prop("disabled")||e(this).addClass("dwtd")}),e("input,select").prop("disabled",!0),N(),e(window).bind("resize.dw",N));v.delegate(".dwwl","DOMMouseScroll mousewheel",function(a){if(!f.readonly){a.preventDefault();var a=a.originalEvent,a=a.wheelDelta?a.wheelDelta/120:a.detail?-a.detail/3:0,b=e("ul",
this),c=+b.data("pos"),c=Math.round(c-a);m(b);o(b,c,a<0?1:2)}}).delegate(".dwb, .dwwb",F,function(){e(this).addClass("dwb-a")}).delegate(".dwwb",F,function(a){if(!f.readonly){a.preventDefault();a.stopPropagation();var b=e(this).closest(".dwwl").find("ul"),c=e(this).hasClass("dwwbp")?q:D;m(b);clearInterval(g);g=setInterval(function(){c(b)},f.delay);c(b)}}).delegate(".dwwl",F,function(a){if(!r&&f.mode!="clickpick"&&!f.readonly){a.preventDefault();r=true;w=e("ul",this).addClass("dwa");f.mode=="mixed"&&
e(".dwwb",this).fadeOut("fast");y=+w.data("pos");m(w);u=s(a);K=new Date;x=u;h.scroll(w,y)}});f.onShow.call(A,v,h)};h.init=function(c){L=e.extend({defaults:{},init:p},e.scroller.themes[c.theme?c.theme:f.theme]);e.extend(f,L.defaults,b,c);h.settings=f;E=Math.floor(f.rows/2);var m=e.scroller.presets[f.preset];a.unbind(".dw");m&&(m=m.call(A,h),e.extend(f,m,b,c),e.extend(B,m.methods));void 0!==a.data("dwro")&&(A.readOnly=j(a.data("dwro")));I&&h.hide();"inline"==f.display?h.show():(n(),H&&f.showOnFocus&&
(a.data("dwro",A.readOnly),A.readOnly=!0,a.bind("focus.dw",h.show)))};h.values=null;h.val=null;h.temp=null;h.init(b)}function E(a){for(var b in a)if(void 0!==z[a[b]])return!0;return!1}function s(a){return D?a.originalEvent?a.originalEvent.changedTouches[0].pageY:a.changedTouches[0].pageY:a.pageY}function j(a){return!0===a||"true"==a}function o(a,b,d,m,l){var i=a.closest(".dwwr").find("ul").index(a),b=b>c?c:b,b=b<k?k:b,a=e("li",a).eq(b);t.temp[i]=a.attr("data-val");t.validate(m?b==l?0.1:Math.abs(0.1*
(b-l)):0,l,i,d)}var n={},g,p=function(){},d,k,c,t,i=(new Date).getTime(),r=!1,w=null,u,x,K,y,z=document.createElement("modernizr").style,G=E(["perspectiveProperty","WebkitPerspective","MozPerspective","OPerspective","msPerspective"])&&"webkitPerspective"in document.documentElement.style,P=function(){var a=["Webkit","Moz","O","ms"],b;for(b in a)if(E([a[b]+"Transform"]))return"-"+a[b].toLowerCase();return""}(),D="ontouchstart"in window,F=D?"touchstart":"mousedown",J=D?"touchend":"mouseup",C={width:70,
height:40,rows:3,delay:300,disabled:!1,readonly:!1,showOnFocus:!0,showLabel:!0,wheels:[],theme:"",headerText:"{value}",display:"modal",mode:"scroller",preset:"",setText:"Set",cancelText:"Cancel",onShow:p,onClose:p,onSelect:p,onCancel:p,onChange:p,formatResult:function(a){for(var b="",c=0;c<a.length;c++)b+=(0<c?" ":"")+a[c];return b},parseValue:function(a,b){for(var c=b.settings.wheels,a=a.split(" "),m=[],e=0,d=0;d<c.length;d++)for(var i in c[d]){if(void 0!==c[d][i][a[e]])m.push(a[e]);else for(var g in c[d][i]){m.push(g);
break}e++}return m},validate:p},B={init:function(a){void 0===a&&(a={});return this.each(function(){this.id||(i+=1,this.id="scoller"+i);n[this.id]=new q(this,a)})},enable:function(){return this.each(function(){var a=n[this.id];a&&a.enable()})},disable:function(){return this.each(function(){var a=n[this.id];a&&a.disable()})},isDisabled:function(){var a=n[this[0].id];if(a)return a.settings.disabled},option:function(a,b){return this.each(function(){var c=n[this.id];if(c){var m={};"object"===typeof a?
m=a:m[a]=b;c.init(m)}})},setValue:function(a,b,c){return this.each(function(){var m=n[this.id];m&&(m.temp=a,m.setValue(!0,b,c))})},getInst:function(){return n[this[0].id]},getValue:function(){var a=n[this[0].id];if(a)return a.values},show:function(){var a=n[this[0].id];if(a)return a.show()},hide:function(){return this.each(function(){var a=n[this.id];a&&a.hide()})},destroy:function(){return this.each(function(){var a=n[this.id];a&&(a.hide(),e(this).unbind(".dw"),delete n[this.id],e(this).is("input")&&
(this.readOnly=j(e(this).data("dwro"))))})}};e(document).bind(D?"touchmove":"mousemove",function(a){r&&(a.preventDefault(),x=s(a),a=y+(u-x)/d,a=a>c+1?c+1:a,a=a<k-1?k-1:a,t.scroll(w,a))});e(document).bind(J,function(a){if(r){a.preventDefault();w.removeClass("dwa");var b=new Date-K,a=y+(u-x)/d,a=a>c+1?c+1:a,a=a<k-1?k-1:a;300>b?(b=(x-u)/b,b=b*b/0.0012,0>x-u&&(b=-b)):b=x-u;o(w,Math.round(y-b/d),0,!0,Math.round(a));r=!1;w=null}clearInterval(g);e(".dwb-a").removeClass("dwb-a")});e.fn.scroller=function(a){if(B[a])return B[a].apply(this,
Array.prototype.slice.call(arguments,1));if("object"===typeof a||!a)return B.init.apply(this,arguments);e.error("Unknown method")};e.scroller={setDefaults:function(a){e.extend(C,a)},presets:{},themes:{}}})(jQuery);(function(e){var q=new Date,E={dateFormat:"mm/dd/yy",dateOrder:"mmddy",timeWheels:"hhiiA",timeFormat:"hh:ii A",startYear:q.getFullYear()-100,endYear:q.getFullYear()+1,monthNames:"January,February,March,April,May,June,July,August,September,October,November,December".split(","),monthNamesShort:"Jan,Feb,Mar,Apr,May,Jun,Jul,Aug,Sep,Oct,Nov,Dec".split(","),dayNames:"Sunday,Monday,Tuesday,Wednesday,Thursday,Friday,Saturday".split(","),dayNamesShort:"Sun,Mon,Tue,Wed,Thu,Fri,Sat".split(","),shortYearCutoff:"+10",
monthText:"Month",dayText:"Day",yearText:"Year",hourText:"Hours",minuteText:"Minutes",secText:"Seconds",ampmText:"&nbsp;",stepHour:1,stepMinute:1,stepSecond:1,separator:" "},q=function(s){function j(a,b,c){return void 0!==i[b]?+a[i[b]]:void 0!==c?c:q[r[b]]?q[r[b]]():r[b](q)}function o(a,b){return Math.floor(a/b)*b}function n(a){var b=j(a,"h",0);return new Date(j(a,"y"),j(a,"m"),j(a,"d"),j(a,"ap")?b+12:b,j(a,"i",0),j(a,"s",0))}var g=e(this),p={},d;if(g.is("input")){switch(g.attr("type")){case "date":d=
"yy-mm-dd";break;case "datetime":d="yy-mm-ddTHH:ii:ssZ";break;case "datetime-local":d="yy-mm-ddTHH:ii:ss";break;case "month":d="yy-mm";p.dateOrder="mmyy";break;case "time":d="HH:ii:ss"}var k=g.attr("min"),g=g.attr("max");k&&(p.minDate=e.scroller.parseDate(d,k));g&&(p.maxDate=e.scroller.parseDate(d,g))}var c=e.extend({},E,p,s.settings),g=0,p=[],t=[],i={},r={y:"getFullYear",m:"getMonth",d:"getDate",h:function(a){a=a.getHours();a=z&&12<=a?a-12:a;return o(a,D)},i:function(a){return o(a.getMinutes(),F)},
s:function(a){return o(a.getSeconds(),J)},ap:function(a){return y&&11<a.getHours()?1:0}},w=c.preset,u=c.dateOrder,x=c.timeWheels,K=u.match(/D/),y=x.match(/a/i),z=x.match(/h/),G="datetime"==w?c.dateFormat+c.separator+c.timeFormat:"time"==w?c.timeFormat:c.dateFormat,q=new Date,D=c.stepHour,F=c.stepMinute,J=c.stepSecond,C=c.minDate,B=c.maxDate;d=d?d:G;if(w.match(/date/i)){e.each(["y","m","d"],function(a,b){a=u.search(RegExp(b,"i"));-1<a&&t.push({o:a,v:b})});t.sort(function(a,b){return a.o>b.o?1:-1});
e.each(t,function(a,b){i[b.v]=a});for(var k={},a=0;3>a;a++)if(a==i.y){g++;k[c.yearText]={};for(var b=C?C.getFullYear():c.startYear,Q=B?B.getFullYear():c.endYear;b<=Q;b++)k[c.yearText][b]=u.match(/yy/i)?b:(b+"").substr(2,2)}else if(a==i.m){g++;k[c.monthText]={};for(b=0;12>b;b++)k[c.monthText][b]=u.match(/MM/)?c.monthNames[b]:u.match(/M/)?c.monthNamesShort[b]:u.match(/mm/)&&9>b?"0"+(b+1):b+1}else if(a==i.d){g++;k[c.dayText]={};for(b=1;32>b;b++)k[c.dayText][b]=u.match(/dd/i)&&10>b?"0"+b:b}p.push(k)}if(w.match(/time/i)){t=
[];e.each(["h","i","s"],function(a,b){a=x.search(RegExp(b,"i"));-1<a&&t.push({o:a,v:b})});t.sort(function(a,b){return a.o>b.o?1:-1});e.each(t,function(a,b){i[b.v]=a});k={};for(a=0;3>a;a++)if(a==i.h){i.h=g++;k[c.hourText]={};for(b=0;b<(z?12:24);b+=D)k[c.hourText][b]=z&&0==b?12:x.match(/hh/i)&&10>b?"0"+b:b}else if(a==i.i){i.i=g++;k[c.minuteText]={};for(b=0;60>b;b+=F)k[c.minuteText][b]=x.match(/ii/)&&10>b?"0"+b:b}else if(a==i.s){i.s=g++;k[c.secText]={};for(b=0;60>b;b+=J)k[c.secText][b]=x.match(/ss/)&&
10>b?"0"+b:b}y&&(i.ap=g++,g=x.match(/A/),k[c.ampmText]={"0":g?"AM":"am",1:g?"PM":"pm"});p.push(k)}s.setDate=function(a,b,c){for(var e in i)this.temp[i[e]]=a[r[e]]?a[r[e]]():r[e](a);this.setValue(!0,b,c)};s.getDate=function(a){return n(a)};return{wheels:p,headerText:function(){return e.scroller.formatDate(G,n(s.temp),c)},formatResult:function(a){return e.scroller.formatDate(d,n(a),c)},parseValue:function(a){var b=new Date,g=[];try{b=e.scroller.parseDate(d,a,c)}catch(j){}for(var k in i)g[i[k]]=b[r[k]]?
b[r[k]]():r[k](b);return g},validate:function(a,b){var d=s.temp,g={m:0,d:1,h:0,i:0,s:0,ap:0},k={m:11,d:31,h:o(z?11:23,D),i:o(59,F),s:o(59,J),ap:1},n=!0,p=!0;e.each(C||B?"y,m,d,ap,h,i,s".split(","):b==i.y||b==i.m||void 0===b?["d"]:[],function(b,l){if(void 0!==i[l]){var z=g[l],f=k[l],o=31,v=j(d,l),s=e("ul",a).eq(i[l]),w,t;"d"==l&&(w=j(d,"y"),t=j(d,"m"),f=o=32-(new Date(w,t,32)).getDate(),K&&e("li",s).each(function(){var a=e(this),b=a.data("val"),d=(new Date(w,t,b)).getDay();a.html(u.replace(/[my]/gi,
"").replace(/dd/,10>b?"0"+b:b).replace(/d/,b).replace(/DD/,c.dayNames[d]).replace(/D/,c.dayNamesShort[d]))}));n&&C&&(z=C[r[l]]?C[r[l]]():r[l](C));p&&B&&(f=B[r[l]]?B[r[l]]():r[l](B));if("y"!=l){var x=e('li[data-val="'+z+'"]',s).index(),y=e('li[data-val="'+f+'"]',s).index();e("li",s).removeClass("dw-v").slice(x,y+1).addClass("dw-v");"d"==l&&e("li",s).removeClass("dw-h").slice(o).addClass("dw-h");v<z&&(v=z);v>f&&(v=f)}n&&(n=v==z);p&&(p=v==f);if(c.invalid&&"d"==l){var q=[];c.invalid.dates&&e.each(c.invalid.dates,
function(a,b){b.getFullYear()==w&&b.getMonth()==t&&q.push(b.getDate()-1)});if(c.invalid.daysOfWeek){var G=(new Date(w,t,1)).getDay();e.each(c.invalid.daysOfWeek,function(a,b){for(var c=b-G;c<o;c=c+7)c>=0&&q.push(c)})}c.invalid.daysOfMonth&&e.each(c.invalid.daysOfMonth,function(a,b){b=(b+"").split("/");b[1]?b[0]-1==t&&q.push(b[1]-1):q.push(b[0]-1)});e.each(q,function(a,b){e("li",s).eq(b).removeClass("dw-v")})}}})},methods:{getDate:function(a){var b=e(this).scroller("getInst");if(b)return b.getDate(a?
b.temp:b.values)},setDate:function(a,b,c){void 0==b&&(b=!1);return this.each(function(){var d=e(this).scroller("getInst");d&&d.setDate(a,b,c)})}}}};e.scroller.presets.date=q;e.scroller.presets.datetime=q;e.scroller.presets.time=q;e.scroller.formatDate=function(s,j,o){if(!j)return null;for(var o=e.extend({},E,o),n=function(d){for(var e=0;c+1<s.length&&s.charAt(c+1)==d;)e++,c++;return e},g=function(c,d,e){d=""+d;if(n(c))for(;d.length<e;)d="0"+d;return d},p=function(c,d,e,g){return n(c)?g[d]:e[d]},d=
"",k=!1,c=0;c<s.length;c++)if(k)"'"==s.charAt(c)&&!n("'")?k=!1:d+=s.charAt(c);else switch(s.charAt(c)){case "d":d+=g("d",j.getDate(),2);break;case "D":d+=p("D",j.getDay(),o.dayNamesShort,o.dayNames);break;case "o":d+=g("o",(j.getTime()-(new Date(j.getFullYear(),0,0)).getTime())/864E5,3);break;case "m":d+=g("m",j.getMonth()+1,2);break;case "M":d+=p("M",j.getMonth(),o.monthNamesShort,o.monthNames);break;case "y":d+=n("y")?j.getFullYear():(10>j.getYear()%100?"0":"")+j.getYear()%100;break;case "h":var t=
j.getHours(),d=d+g("h",12<t?t-12:0==t?12:t,2);break;case "H":d+=g("H",j.getHours(),2);break;case "i":d+=g("i",j.getMinutes(),2);break;case "s":d+=g("s",j.getSeconds(),2);break;case "a":d+=11<j.getHours()?"pm":"am";break;case "A":d+=11<j.getHours()?"PM":"AM";break;case "'":n("'")?d+="'":k=!0;break;default:d+=s.charAt(c)}return d};e.scroller.parseDate=function(s,j,o){var n=new Date;if(!s||!j)return n;for(var j="object"==typeof j?j.toString():j+"",g=e.extend({},E,o),o=n.getFullYear(),p=n.getMonth()+
1,d=n.getDate(),k=-1,c=n.getHours(),n=n.getMinutes(),t=0,i=-1,r=!1,w=function(c){(c=y+1<s.length&&s.charAt(y+1)==c)&&y++;return c},u=function(c){w(c);c=j.substr(q).match(RegExp("^\\d{1,"+("@"==c?14:"!"==c?20:"y"==c?4:"o"==c?3:2)+"}"));if(!c)return 0;q+=c[0].length;return parseInt(c[0],10)},x=function(c,d,e){c=w(c)?e:d;for(d=0;d<c.length;d++)if(j.substr(q,c[d].length).toLowerCase()==c[d].toLowerCase())return q+=c[d].length,d+1;return 0},q=0,y=0;y<s.length;y++)if(r)"'"==s.charAt(y)&&!w("'")?r=!1:q++;
else switch(s.charAt(y)){case "d":d=u("d");break;case "D":x("D",g.dayNamesShort,g.dayNames);break;case "o":k=u("o");break;case "m":p=u("m");break;case "M":p=x("M",g.monthNamesShort,g.monthNames);break;case "y":o=u("y");break;case "H":c=u("H");break;case "h":c=u("h");break;case "i":n=u("i");break;case "s":t=u("s");break;case "a":i=x("a",["am","pm"],["am","pm"])-1;break;case "A":i=x("A",["am","pm"],["am","pm"])-1;break;case "'":w("'")?q++:r=!0;break;default:q++}100>o&&(o+=(new Date).getFullYear()-(new Date).getFullYear()%
100+(o<=g.shortYearCutoff?0:-100));if(-1<k){p=1;d=k;do{g=32-(new Date(o,p-1,32)).getDate();if(d<=g)break;p++;d-=g}while(1)}c=new Date(o,p-1,d,-1==i?c:i&&12>c?c+12:!i&&12==c?0:c,n,t);if(c.getFullYear()!=o||c.getMonth()+1!=p||c.getDate()!=d)throw"Invalid date";return c}})(jQuery);


var citypark = {};

if (window.location.search.indexOf('?demo') != -1) {
	
	citypark.FastButton = function(element, handler) {
		$(element).click(function(e) {
			handler(e, element);
		});
	};

} else {

	citypark.FastButton = function(element, handler) {

		this.element = element;
		this.handler = handler;

		element.addEventListener('touchstart', this, false);
		element.addEventListener('click', this, false);

	};

	citypark.FastButton.prototype.handleEvent = function(event) {
		switch (event.type) {
			case 'touchstart':this.onTouchStart(event);break;
			case 'touchmove':this.onTouchMove(event);break;
			case 'touchend':this.onClick(event);break;
			case 'click':this.onClick(event);break;
		}
	};

	citypark.FastButton.prototype.onTouchStart = function(event) {

		event.stopPropagation();

		this.element.addEventListener('touchend', this, false);
		document.body.addEventListener('touchmove', this, false);

		this.startX = event.touches[0].clientX;
		this.startY = event.touches[0].clientY;

	};

	citypark.FastButton.prototype.onTouchMove = function(event) {
		if (Math.abs(event.touches[0].clientX - this.startX) > 10 ||
			Math.abs(event.touches[0].clientY - this.startY) > 10) {
			this.reset();
		}
	};

	citypark.FastButton.prototype.onClick = function(event) {
		event.stopPropagation();
		this.reset();
		this.handler(event, this.element);
		if (event.type == 'touchend') {
			citypark.FastButton.ClickBuster.preventGhostClick(this.startX, this.startY);
		}
	};

	citypark.FastButton.prototype.reset = function() {
		this.element.removeEventListener('touchend', this, false);
		document.body.removeEventListener('touchmove', this, false);
	};

	citypark.FastButton.ClickBuster = new function () {

		this.coordinates = [];

		this.preventGhostClick = function(x, y) {
			this.coordinates.push(x, y);
			window.setTimeout(this.pop, 2500);
		};

		this.pop = function() {
			this.coordinates.splice(0, 2);
		};

		this.onClick = function(event) {
			var that = citypark.FastButton.ClickBuster;
			for (var i = 0; i < that.coordinates.length; i += 2) {
				var x = that.coordinates[i];
				var y = that.coordinates[i + 1];
				if (Math.abs(event.clientX - x) < 25 && Math.abs(event.clientY - y) < 25) {
				  event.stopPropagation();
				  event.preventDefault();
				}
			}
		};

		document.addEventListener('click', this.onClick, true);

	};

}

var _ = function(s) {
	if (typeof strings[s] != 'undefined') {
		return strings[s];
	}
	return s;
}

function Geolocator(err) {
	
	var geo = this;

	this.watchID = null;
	this.watchers = {};

	this.coords = null;

	this.tolerance = 0.050; // 50m
	
	this.dist = function(coords1, coords2) {

		var R = 6371; // radius of the Earth in km

		var toRad = function(x) {
			return x * Math.PI / 180;
		}

		var dLat = toRad(coords2.lat-coords1.lat);
		var dLon = toRad(coords2.lng-coords1.lng);
		var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
				Math.cos(toRad(coords1.lat)) *
				Math.cos(toRad(coords2.lat)) * 
				Math.sin(dLon/2) * Math.sin(dLon/2); 

		return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); // in km

	}
	
	this.addWatcher = function(id, watcher) {
		
		this.watchers[id] = watcher;

		if (this.coords != null) {
			watcher(this.coords);
		}

	}

	this.startWatching = function() {

		this.stopWatching();
		
		//  Mzaybe that is not such a good idea??
		if (window.location.search.indexOf('?demo') != -1) {
			
			for (var w in geo.watchers) {
				geo.watchers[w]({lat: 59.42599458, lng: 24.74899149});
			}
			
			return;
			
		}
		
		if (!navigator.geolocation) {
			return err();
		}
		
		this.watchID = navigator.geolocation.watchPosition(function(pos) {
									
			var nc = {
				lat: parseFloat(pos.coords.latitude),
				lng: parseFloat(pos.coords.longitude)
			};
			
			if (geo.coords == null || geo.dist(nc, geo.coords) > geo.tolerance) {
				
				geo.coords = nc;

				for (var w in geo.watchers) {
					geo.watchers[w](geo.coords);
				}
				
			}

		}, function(e) {
			
			/*var errors = { 
				1: 'Permission denied',
				2: 'Position unavailable',
				3: 'Request timeout'
			};*/
			
			return err();
			
		}, {
			enableHighAccuracy: true,
			maximumAge: 0,
			timeout: 10000
		});

	} 

	this.stopWatching = function() {
		if (this.watchID != null) {
			navigator.geolocation.clearWatch(this.watchID);
		}
	}

}

function GMap(geo) {
	
	var gmap = this;

	this.zoom   = 14;
	this.width  = $(window).width()-20;
	this.height = 222;

	this.markers = [];
	this.areas = [];

	this.lazy = true;
	
	this.pxPerLon = {
		 0: 93206.75555555556,
		 1: 46603.37777777778,
		 2: 23301.68888888889,
		 3: 11650.844444444445,
		 4:  5825.422222222222,
		 5:  2912.711111111111,
		 6:  1456.3555555555556,
		 7:   728.1777777777778,
		 8:   364.0888888888889,
		 9:   182.04444444444445,
		10:    91.02222222222223,
		11:    45.51111111111111,
		12:    22.755555555555556,
		13:    11.377777777777778,
		14:     5.688888888888889,
		15:     2.8444444444444446,
		16:     1.4222222222222223,
		17:     0.7111111111111111
	};
	
	/* too slow.. this.mercantor = new function () {
		
		this.offset = 268435456;
		this.radius = 85445659.44705395;
		
		this.lngToX = function(lng) {
			return Math.round(this.offset + this.radius * lng * Math.PI / 180);        
		}

		this.latToY = function(lat) {
			return Math.round(this.offset - this.radius * Math.log((1 + Math.sin(lat * Math.PI / 180)) / (1 - Math.sin(lat * Math.PI / 180))) / 2);
		}

		this.xToLng = function(x) {
			return ((Math.round(x) - this.offset) / this.radius) * 180 / Math.PI; 
		}

		this.yToLat = function(y) {
			return (Math.PI / 2 - 2 * Math.atan(Math.exp((Math.round(y) - this.offset) / this.radius))) * 180 / Math.PI; 
		}

		this.adjustLngByPixels = function(lng, delta, zoom) {
			return this.xToLng(this.lngToX(lng) + (delta << (21 - zoom)));
		}

		this.adjustLatByPixels = function(lat, delta, zoom) {
			return this.yToLat(this.latToY(lat) + (delta << (21 - zoom)));
		}
		
	}*/

	this.addMarker = function(coords, cb) {
		this.markers.push([coords, cb]);
	};

	this.resetMarkers = function() {
		this.markers = [];
	}
	
	this.getStaticSrc = function(center) {
		
		var src = 'https://maps.googleapis.com/maps/api/staticmap?center='+center.lat+',' + center.lng;
		
		var w = gmap.width  > 640 ? 640 : gmap.width;
		var h = gmap.height > 640 ? 640 : gmap.height;
		
		src += '&zoom=' + (gmap.zoom - 0);
		src += '&size=' + w + 'x' + h;
		src += '&sensor=true';
		
		var mrk = '';
		
		for (var m in this.markers) {
			if (m > 10) break;
			mrk += '%7C' + this.markers[m][0].lat + ',' + this.markers[m][0].lng;
		}

		if (mrk.length) {
		  //src += '&markers=icon:http://eparkimine.ee/public/images/parking.png' + mrk;
		    src += '&markers=icon:http://bit.ly/Neyhbt' + mrk;
		}
				
		var ar = '';
		
		var lngSpan = w / this.pxPerLon[17-gmap.zoom];
		var lngRgt = center.lng + (lngSpan/2);
		var lngLft = center.lng - (lngSpan/2);
		
		var latSpan = h * (Math.cos(center.lat * Math.PI/180)) / this.pxPerLon[17-gmap.zoom];
		var latTop = center.lat + (latSpan/2);
		var latBot = center.lat - (latSpan/2);
		
		//src += '&path=color:red%7Cweight:7%7C' + latTop + ',' + lngLft + '%7C' + latBot + ',' + lngRgt;
		
		for (var a in areas) {
			
			for (var p in areas[a].polys) {
				
				if (areas[a].polys[p].lngR > lngLft
				 && areas[a].polys[p].lngL < lngRgt
				 && areas[a].polys[p].latT > latBot
				 && areas[a].polys[p].latB < latTop) {
					ar += '&path=weight:0%7Cfillcolor:' + areas[a].color + '%7Cenc:' + areas[a].polys[p].p;
				}

			}

		}
		
		if (src.length + ar.length < 1900) {
			src += ar;
		}
				
		return src;

	}

	this.buildDynamic = function(canvas, center, phonegap, cb) {
		
		if (this.lazy) {
						
			var cs = function(gmap,a,b,c,d) {
				return function() {
					gmap.lazy = false;
					gmap.buildDynamic(a,b,c,d);
				};
			}
			
			window.gmaplazy = cs(gmap, canvas, center, phonegap, cb);
			
			var s = document.createElement('script');
			s.type = 'text/javascript';
			s.src  = 'https://maps.google.com/maps/api/js?sensor=true&libraries=geometry&callback=gmaplazy';
			
			return $('head').append(s);
			
		}
		
		var options = {
			center: new google.maps.LatLng(center.lat,center.lng),
			mapTypeId: google.maps.MapTypeId.ROADMAP,
			zoom: this.zoom
		};
		
		var map = new google.maps.Map(canvas, options);
		var inf = new google.maps.InfoWindow();
		
		var cs = function(mzones) {
			return function(e) {
				
				var b = _('Alusta parkimist') + ':<br />';
				
				for (var z in mzones) {
					b += '<button onclick="app.go(\'#sms-' + mzones[z] + '\')">' + mzones[z] + '</button> ';
				}
				
				inf.setContent(b);
				inf.setPosition(e.latLng);
				inf.open(map);
				
			}
		}
				
		for (var a in areas) {
			
			for (var p in areas[a].polys) {
			
				var color = areas[a].color;
				
				if (color.indexOf('0x') != -1) {
					color = '#' + color.substring(2,8);
				}
				
				var area = new google.maps.Polygon({
					paths: google.maps.geometry.encoding.decodePath(areas[a].polys[p].p),
					strokeColor: color,
					strokeOpacity: 0.6,
					strokeWeight: 3,
					fillColor: color,
					fillOpacity: 0.15,
					zIndex: areas[a].polys[p].z
				});
				
				area.setMap(map);
				
				if (phonegap) {
					google.maps.event.addListener(area, 'click', cs(areas[a].mzones));
				}
				
			}
			
		}
		
		for (var m in this.markers) {
			
			var marker = new google.maps.Marker({
				position: new google.maps.LatLng(this.markers[m][0].lat, this.markers[m][0].lng),
				icon: 'http://eparkimine.ee/public/images/parking.png',
				map: map
			});
			
			google.maps.event.addListener(marker, 'click', this.markers[m][1]);
			
		}
		
		cb(map,canvas);
  
	}

}

function App() {
	
	var app = this;
	
	this.phonegap = window.location.protocol == 'file:';
	
	this.host = this.phonegap
			  ? 'https://eparkimine.ee' // 'http://eparkimine.me'
			  : window.location.protocol + '//' + window.location.host;
			
	if (window.location.search.indexOf('?demo') != -1) {
		this.phonegap = true;
	}
	
	this.geo = new Geolocator(function() {
		app.go('#noloc');
	});
	
	this.gmap = new GMap(this.geo);
	
	this.hash = null;
	
	this.carparks = [];
	
	this.coords = null;
	this.sorted = null;
	
	this.acp = false;
	this.car = null;
	this.cars = {};
	
	this.lang = typeof localStorage.lang == 'undefined' ? 'et' : localStorage.lang;
		
	this.sms = typeof localStorage.sms == 'undefined' ? null : JSON.parse(localStorage.sms);
	
	this.account = null;
	
	this.map = null;
		
	this.eb = typeof localStorage.eb == 'undefined' ? '' : localStorage.eb;
	
	this.session = typeof localStorage.session == 'undefined' ? '' : localStorage.session;
		
	this.banners = [];
	
	this.is = {
		Android: function() {
			return navigator.userAgent.match(/Android/i) ? true : false;
		},
		iOS: function() {
			return navigator.userAgent.match(/iPhone|iPad|iPod/i) ? true : false;
		},
		Windows: function() {
			return navigator.userAgent.match(/IEMobile/i) ? true : false;
		},
		mobile: function() {
			return (app.is.Android() || app.is.iOS());
		}
	};
	
	this.init = function(i, callback) {

		$('div#p-listing').html('');

		if (i > 10) {
			alert(_('Võrgu viga..'));
			return;
		}

		setTimeout(function() {
			
			$.getJSON(app.host + '/smart/init', {
				session: app.session,
				phonegap: (app.phonegap ? '1' : ''),
				eb: app.eb,
				v: version
			}, function(reply) {
				
				if (!reply.success) {
					return app.init(++i, callback);
				}
				
				if (reply.message.length) {
					alert(reply.message);
				}
				
				app.carparks = reply.carparks;
				app.sorted = null;
				
				app.sess(reply.session,reply.account);
				
				// if we have obtained a session via init,
				// we can rest assured that the EB has been
				// assigned to the proper owner and is reflected
				// in the init'ed data'
				
				if (reply.session.length) {
					localStorage.eb = app.eb = '';
				}
		
				app.cars = reply.cars;
				
				if (app.cars.constructor == Array && !app.cars.length) {
					app.cars = {};
				}
				
				app.account = reply.account;
				
				app.car = null;
				
				app.acp = reply.acp;
				
				for (var id in app.cars) {
					if (id == reply.car) {
						app.car = id;break;
					}
				}
				
				if (!app.car) {
					for (var id in app.cars) {
						app.car = id;break;
					}
				}
				
				app.banners = reply.banners;
									
				callback();

			}).error(function(jqXHR, textStatus, errorThrown) {
				app.init(++i, callback);
			});

		}, i * 123);

	}
	
	this.go = function(hash) {
		
		if (this.eb.length && !(
		    hash.indexOf('#pin-') == 0
		 || hash.indexOf('#mobid-') == 0
		 || hash.indexOf('#register-') == 0
		)) {
			hash = '#login-' + hash.substring(1).replace('-', '_');
		}
		
		if (this.session && Object.keys(this.cars).length == 0) {
			hash = '#newcar';
		}
		
		if (!this.session && (
			hash.indexOf('#purchase-') == 0
		 || hash.indexOf('#sms-') == 0
		)) {
			hash = '#login-' + hash.substring(1).replace('-', '_');
		}
		
		if (this.session && !this.acp) {
			hash = '#contract-' + hash.substring(1).replace('-', '_');
		}
		
		window.location.hash = hash;
		
	}
	
	this.sess = function(session) {
		
		localStorage.session = this.session = session;
		
	}
	
	this.sort = function(coords) {
		
		if (this.sorted == null
			|| this.sorted.lat != coords.lat
			|| this.sorted.lng != coords.lng
		) {
			
			for (var c in this.carparks) {
				this.carparks[c].dist = app.geo.dist(this.carparks[c].coords, coords);
			}

			this.carparks.sort(function(a,b) {
				return a.dist - b.dist;
			});
			
			if (app.phonegap) {

				for (var a in areas) {
					
					var dist = null, d;
					
					for (var p in areas[a].polys) {
						
						d = app.geo.dist({
							lat: areas[a].polys[p].lat,
							lng: areas[a].polys[p].lng
						}, coords);
						
						if (dist == null || d < dist) {
							dist = d;
						}
						
					}
					
					areas[a].dist = dist;
				}
				
				areas.sort(function(a,b) {
					return a.dist - b.dist;
				});

			}
			
		}
		
	}

	this.mins = function (min) {
		
		if (min < 60) {
			return min + 'min';
		}
		
		return (Math.round(min / 60 * 10) / 10) + 'h';
		
	}
	
	this.fmts = function(ts) {
		
		var d = new Date(ts*1000);
		
		return d.getDate() + '.' + d.getMonth() + '.' + d.getFullYear()
		+ ' ' + ('0' + d.getHours()).slice(-2) + ':' + ('0' + d.getMinutes()).slice(-2);
		
	}
	
	this.cp = function(ID) {
		
		var carpark = null;

		for (var c in this.carparks) {
			if (this.carparks[c].ID == ID) {
				carpark = this.carparks[c];
				break;
			}
		}
		
		return carpark;
		
	}
	
	this.rcp = function(carpark, prices, cat) {
		
		var dist = '';
		
		if (typeof carpark.dist != 'undefined') {
			var dist = Math.round(carpark.dist * 10) / 10;
			dist = dist < 10 ? (', ' + dist + ' km') : '';
		}

		return '<div class="rcp" id="' + carpark.ID + '" cat="' + cat + '" part="' + carpark.partner + '">'
				+ '<span class="dist"><b>' + carpark.mzone + '</b> ' + carpark.town + dist + '</span>'
				+ '<strong>' + carpark.name + '</strong>'
				+ (carpark.partner ? (' <span class="partner">(' + carpark.partner + ')</span>')  : '')
				+ (prices ? '<p>' + this.rpc(carpark) + '</p>' : '')
				+ '</div>';
		
	}		
				
	this.pia = function (permit) {
		
		if (permit.period_length == null) {
			return 1;
		}
		
		// terminated before even started?
		if (!permit.period_length) {
			return 0;
		}
		
		if (permit.period_start > (new Date()).getTime() / 1000) {
			return 2;
		}
		
		if (permit.period_start + permit.period_length > (new Date()).getTime() / 1000) {
			return 1;
		}
		
		return 0;
		
	}
	
	this.rpl = function(permit, more) {
		
		var pia = this.pia(permit);
		if (pia) {
			
			if (permit.period_length == null) {
				
				var l = _('Tähtajatu parkimisõigus') + (more ? (' ' + _('alates') + ' ') + app.fmts(permit.period_start) : '');
				
			} else {
				
				if (pia == 2) {
					var l = _('Kehtiv alates') + ' ' + app.fmts(permit.period_start);
				} else {
					var l = _('Kehtiv kuni') + ' ' + app.fmts(permit.period_start + permit.period_length);
				}
				
			}
			
			l = '<b>' + l + '</b>';
			
		} else {
			
			var l = more ? (_('Kehtivus lõppes') + ' ' + app.fmts(permit.period_start + permit.period_length)) : _('Kehtivus lõppenud');
			
		}
		
		return '<p style="margin-top: 4px; margin-bottom: 4px; ">' + l + '</p>';
		
	}
	
	this.rpc = function (carpark) {
		
		return (carpark.free > 0 ? ('<b>' + app.mins(carpark.free) + ' tasuta.</b> ') : '') + carpark.prices;
		
	}

	this.app = function() {
		
		var hash = function() {
			
			var wlh = window.location.hash;
			
			if (!wlh.length) {
				wlh = '#tiles';
			}
			
			if (wlh != app.hash) {
				
				app.hash = wlh;
				
				var show = function() {
					$('div#pages>div:visible').css('display','none');
					$('div#pages>div#p-' + app.hash.split('-')[0].substring(1)).css('display', 'block');
					window.scrollTo(0,1);
				};
				
				var h = app.hash.split('-');
				
				switch (h[0]) {

					case '#tiles':app.loadTiles(show);break;

					case '#sms':app.loadSms(h[1], show);break;

					case '#login':app.loadLogin(h[1], show);break;
					case '#pin':app.loadPin(h[1], h[2], show);break;
					case '#mobid':app.loadMobid(h[1], show);break;
					case '#register':app.loadRegister(h[1], h[2], show);break;
					case '#contract':app.loadContract(h[1], show);break;
					
					case '#car':app.loadCar(show);break;
					case '#newcar':app.loadNewCar(show);break;

					case '#carparks':app.loadCarparks(show);break;
					case '#carpark':app.loadCarpark(h[1],show);break;

					case '#enclosed':app.loadEnclosed(h[1],show);break;
					case '#purchase':app.loadPurchase(h[1],show);break;
					case '#term':app.loadTerm(h[1],show);break;
					
					case '#map':app.loadMap(h[1],h[2],show);break;

					case '#settings':app.loadSettings(show);break;
					
					case '#noloc':app.loadNoloc(show);break;

					default:
						app.loadTiles(show);

				}

			}

		}
		
		setInterval(hash, 777); // Android i8475
		$(window).bind('hashchange', hash);

		hash();
		
	}
	
	
	this.headerBtns = false;
	
	this.header = function(state, callback) {
				
		$('div#header').css('display', state == 0 ? 'none' : 'block');
		
		$('div#header div#h-car span').text(app.cars[app.car]);
		
		$('div#header div#h-car').css('display',    this.session && state == 2 ? 'block' : 'none');
		$('div#header div#h-login').css('display', !this.session && state == 2 ? 'block' : 'none');
		
		if (!this.headerBtns) {
			
			this.headerBtns = true;

			new citypark.FastButton($('div#header button#h-back').get(0), function(e, element) {
				window.history.back();
			});
			
			new citypark.FastButton($('div#header button#h-settings').get(0), function(e, element) {
				app.go('#settings');
			});

			new citypark.FastButton($('div#header div#h-car button').get(0), function(e, element) {
				app.go('#car');
			});

			new citypark.FastButton($('div#header div#h-login button').get(0), function(e, element) {
				app.go('#login-tiles');
			});
			
		}

		callback();
		
	}
	
	
	this.loadTiles = function(callback) {
		
		this.header(2, function() {
			
			app.geo.addWatcher('tiles', function(coords) {
								
				app.sort(coords);

				app.gmap.resetMarkers();
				
				app.gmap.zoom	= 16;
				app.gmap.width  = $(window).width()-20;
				app.gmap.height = 222;
	
				var tiling = $('div#p-tiles div:first').html('');

				var tiles = [];

				var w100 = $(window).width()-20;
				var w050 = Math.round(w100/2-5);
				var w, h = Math.round(w100/1.8);
				
				var historic = {}, o = 0, odd = null;
				
				var tiler = function(c, permits, wd) {
					
					app.gmap.addMarker(app.carparks[c].coords);
					
					w = wd ? w100 : w050;
					
					var a = false, o = false, e = false, rpl = '';
					
					if (permits.length) {
						
						for (var p in permits) {
							
							if (app.pia(permits[p])) {
								
								a = true;
								
								if (permits[p].period_open) {
									o = true;
								}
								
								if (permits[p].hotsec_enclosed) {
									o = false;
									e = true;
								}

							}
							
						}
						
						if (permits.length > 1) {
							o = false; e = false;
							rpl = _('Mitu parkimisõigust');
						} else {
							rpl = app.rpl(permits[0], false);
						}
						
					}
					
					// If active permit is there, don't show prices
					rpl = (a ? '' : app.rpc(app.carparks[c])) + rpl;
					
					var tile = $('<div cp="' + app.carparks[c].ID + '" class="p-t-tile p-t-tile-' + (wd ? '100' : '50') + '"><div>' +
						'<div class="p-t-tile-h"' + (a ? ' style="background-color:#FF4F00"' : '') + '><div>' +
							'<span>' + app.carparks[c].mzone + '</span>' +
							app.carparks[c].name +
							'<small>' + rpl + '</small>' +
							((a && o) ? ('<button>' + _('lõpeta') + '</button>') : '') +
							((a && e) ? ('<button>' + _('välju')  + '</button>') : '') +
						'</div></div>' +
						'<img style="width:'+w+'px;height:'+h+'px" />' +
					'</div></div>');

					$('img', tile).load(function(){
						$(this).attr('style', 'width:100%');
					}).attr('src', app.host + '/smart/carpark-photo/id/'+app.carparks[c].ID+'/w/'+w+'/h/'+h+'/i/' + app.carparks[c].photo);

					new citypark.FastButton(tile.get(0), function(e, el) {
						app.go('#carpark-' + $(el).attr('cp'));
					});
					
					if (a && o) {
						new citypark.FastButton($('button', tile).get(0), function(e, el) {
							app.go('#term-' + permits[0].ID);
						});
					}
					
					if (a && e) {
						new citypark.FastButton($('button', tile).get(0), function(e, el) {
							app.go('#enclosed-' + app.carparks[c].ID);
						});
					}

					tile.appendTo(tiling);
				}
				
				for (var b in app.banners) {
					
					tile = $('<div class="p-t-button"><button style="background: #FF4F00; border: solid 1px red">' + app.banners[b] + '</button></div>');

					new citypark.FastButton(tile.get(0), function() {
						window.location.href = b;
					});

					tile.appendTo(tiling);
					
				}
				
				var tada = [];
				
				if (app.phonegap) {
					
					if (app.sms == null) {
						
						var l = 0;
						
						for (var a in areas) {
							
							if (areas[a].dist > 25) {break;}
							
							for (var z in areas[a].mzones) {

								++l;
								
								tile = $('<div z="' + areas[a].mzones[z] + '" class="p-t-button p-t-button-50"><button><small>' + areas[a].name + '</small> ' + areas[a].mzones[z] + '</button></div>');

								new citypark.FastButton(tile.get(0), function(e,el) {
									app.go('#sms-' + $(el).attr('z'));
								});
								
								tada.push(tile);

							}

						}
						
						if (l%2) {
							
							tile = $('<div class="p-t-button p-t-button-50"><button>' + _('Kõik parklad') + '</button></div>');

							new citypark.FastButton(tile.get(0), function() {
								app.go('#carparks');
							});

							tada.push(tile);
							
						}
						
						/*var l=0, q = false;

						dance:

						for (var a in areas) {

							if (areas[a].dist > 10) {q = true;}
							
							for (var z in areas[a].mzones) {

								++l;if (q && (l%2)) {break dance;}
								
								tile = $('<div z="' + areas[a].mzones[z] + '" class="p-t-button p-t-button-50"><button><small>' + areas[a].name + '</small> ' + areas[a].mzones[z] + '</button></div>');

								new citypark.FastButton(tile.get(0), function(e,el) {
									app.go('#sms-' + $(el).attr('z'));
								});
								
								tada.push(tile);

							}

						}*/
						
					} else {
												
						tile = $('<div class="p-t-tile p-t-tile-100"><div style="background: #FF4F00">' +
							'<table width="100%"><tr>' +
								'<td style="text-align: center; font-size: 1.5em; color:white"><small>' + _('Pargitud') + ':</small> ' + app.sms.zone + '</td>' +
								'<td style="text-align: right; padding-right: 0.5em"><button style="width: auto; padding: 0.5em; font-size: 1em; display: inline; border-color: #e52600; background: #f02800;">' + _('lõpeta') + '</button></td>' +
							'</tr></table>' +
						'</div></div>');

						new citypark.FastButton(tile.find('button').get(0), function() {
							
							window.plugins.call.place('1903',
								function () {
									localStorage.sms = app.sms = null;
									app.go('#tiles-' + (new Date()).getTime());
								},
								function (e) {
									alert(_('Parkimise lõpetamine ebaõnnestus:') + ' ' + e);
								}
							);
							
						});

						tile.appendTo(tiling);
						
					}
					
				} else {
					
					if (app.is.mobile() && app.is.Android()) {
					
						tile = $('<div class="p-t-button"><button style="font-size: 0.9em; background: #2a2a2a url(images/' + (app.is.Android() ? 'android' : 'appstore') + '.png) 10px 5px no-repeat; padding-left: 111px;">' + ('Tõmba rakendus alla') + '<br /><small>' + ('ning pargi ka linnatänavail') + '</small></button></div>');

						new citypark.FastButton(tile.find('button').get(0), function() {
							
							if (app.is.Android()) {
								window.location.href = 'https://play.google.com/store/apps/details?id=ee.citypark.nuti';
							} else {
								window.location.href = 'itms://itunes.com/apps/ee.citypark.nutiparkimine';
							}
							
						});

						tile.appendTo(tiling);
						
					}
					
				}
				
				for (var c in app.carparks) {
				
					var permits = [];
					
					for (var p in app.carparks[c].permits) {
						
						var perm = app.carparks[c].permits[p];
						
						if (perm.car_reg == null || perm.car_reg == app.cars[app.car]) {
							
							if (app.pia(perm)) {
								permits.push(perm);
							} else {
								historic[c] = perm; // NB! The last parking is last in the stack and overwrites
							}
							
						}
						
					}
					
					// If we have already displaed the 3 closest carparks
					// and this one has no permits attached, keep it as we
					// may need it to close up the "odd gap"
					if (c > 2 && !permits.length) {
						
						// Get the first one
						if (odd == null) {
							odd = c;
						}
						
						// Keep going as we need to iterate the history
						continue;
						
					}
					
					tiler(c, permits, o == 0);
					
					o++;
					
					// If we have already displayed this in the top
					// closest ones, we do not need to show it in history
					historic[c] = null;

				}
				
				if (o % 2 == 0) {
					tiler(odd, [], false);
				}
				
				for (var d in tada) {
					tada[d].appendTo(tiling);
				}

				tile = $('<div class="p-t-tile p-t-tile-100"><div>' +
					'<img style="width:100%" src="' + app.gmap.getStaticSrc(coords) + '" id="p-tiles-map" />' +
				'</div></div>');

				new citypark.FastButton(tile.get(0), function() {
					app.go('#map');
				});
				
				tile.appendTo(tiling);

				tile = $('<div class="p-t-button"><button>' + _('Kõik parklad') + '</button></div>');

				new citypark.FastButton(tile.get(0), function() {
					app.go('#carparks');
				});

				tile.appendTo(tiling);
				
				for (var i in historic) {
					if (historic[i]) { // if was deleted
						tiler(i,[historic[i]], false);
					}
				}
				
				app.coords = coords;
				
				callback();

			});

			app.geo.startWatching();
			
		});
			
	}
	
	this.loadSms = function(zone, callback) {
		
		this.header(2, function() {
			
			$('div#p-sms span').text(zone);
			
			$('div#p-sms button').unbind('click').click(function() {
				
				if (window.location.search.indexOf('?demo') != -1) {
					return alert('Demos kahjuks mobiilselt parkida ei saa :)');
				}
				
				window.plugins.sms.send('1902',
					app.cars[app.car] + ' ' + zone,
					function () { 
						app.sms = {zone: zone, start: new Date().getTime()};
						localStorage.sms = JSON.stringify(app.sms);
						alert(_('Sõnum on edastatud. Palun kontrollige vastusõnumit!')); 
						app.go('#tiles');
					},
					function (e) {
						alert(_('Sõnumi edastamine ebaõnnestus:') + ' ' + e);
					}
				);
				
			});
			
			callback();
			
		});
		
	}
	
	
	this.loadCarpark = function(ID, callback) {
		
		this.header(2, function() {
			
			var carpark = app.cp(ID);
			
			var cp = '<div class="p-shade">';
			
			cp += app.rcp(carpark, true, '');
			
			
			if (carpark.enclosed) {
				
				cp += '<button onclick="app.go(\'#enclosed-' + ID + '\')" style="background-image:url(images/barrier.png); padding-left: 35px; background-repeat: no-repeat; background-position: 10px center">' +  _('Ava tõkkepuu') + '</button>';
				
				cp += '<p style="margin-top: 35px">' + _('Juhul, kui soovite soetada PIN-pileti mõneks muuks ajaks tulevikus, valige') + ':</p>';
			
			}
			
			var g = null;
			
			if (carpark.prices.length) {
				g = '#purchase-' + ID;
			} else if (app.phonegap && carpark.mpark == 1) {
				g = '#sms-' + carpark.mzone;
			}
			
			if (g) {
				cp += '<button onclick="app.go(\'' + g + '\')" style="background-image:url(images/shopping-cart.png); padding-left: 35px; background-repeat: no-repeat; background-position: 10px center">' +  _('Osta parkimisluba') + '</button>';
			}
			
			cp += '</div>';

			var t = [];

			for (var c in carpark.permits.sort(function(a,b) {
				var p = app.pia(b) - app.pia(a);
				if (p == 0) {
					return a.period_start < b.period_start;
				}
				return p;
			})) {
				if (carpark.permits[c].car_reg == null || carpark.permits[c].car_reg == app.cars[app.car]) {
					t.push(carpark.permits[c]);
				}
			}

			if (t.length) {
				
				for (var m in t) {
					
					var b = '';
					
					if (app.pia(t[m]) && t[m].hotsec_enclosed) {
						b = '<button class="lift" rel="' + ID + '" style="float: right; font-size: 1.1em; padding: 5px; margin: 0; margin-top: -4px; width: auto;">' + _('välju') + '</button>';
					} else if (app.pia(t[m]) && t[m].period_open) {
						b = '<button class="term" rel="' + t[m].ID + '" style="float: right; font-size: 1.1em; padding: 5px; margin: 0; margin-top: -4px; width: auto;">' + _('lõpeta') + '</button>';
					}
					
					cp += '<div class="p-shade" style="padding:10px">' + b + app.rpl(t[m], true);
					
					if (typeof t[m].hotsec_pin_nr != 'undefined') {
						cp += 'PIN: ' + t[m].hotsec_pin_nr + '  PUK: ' + t[m].hotsec_puk_nr;
					}
					
					cp += '</div>';
				
				}
				
			}
			
			var w = $(window).width() - 38;
			var h = Math.round(w * 0.60);
			
			cp += '<img src="' + app.host + '/smart/carpark-photo/id/' + carpark.ID + '/w/' + w + '/h/' + h + '/i/' + carpark.photo + '" />';
			
			app.gmap.resetMarkers();
			app.gmap.zoom	= 16;
			app.gmap.width  = w;
			app.gmap.height = h;
			
			app.gmap.addMarker(carpark.coords);
			
			cp += '<img src="' + app.gmap.getStaticSrc(carpark.coords) + '" onclick="window.app.go(\'#map-' + carpark.coords.lat + '-' + carpark.coords.lng + '\')" />';
			
			$('div#p-carpark').html('').append(cp);
			
			$('div#p-carpark button.lift').click(function() {
				app.go('#enclosed-' + $(this).attr('rel'));
			});
			
			$('div#p-carpark button.term').click(function() {
				app.go('#term-' + $(this).attr('rel'));
			});
			
			callback();
			
		});
		
	}
	
	this.loadCarparks = function(callback) {
		
		this.header(2, function() {
			
			app.geo.addWatcher('cps', function(coords) {
				
				var cats = {};
				
				app.sort(coords);
				
				var items = [], dist;
				
				for (var c in app.carparks) {
					
					var cat = app.carparks[c].partner;
					cat = cat ? cat : 'Citypark';
					
					items.push([
						app.carparks[c].dist,
						app.carparks[c].name,
						app.rcp(app.carparks[c], false, cat)
					]);
					
					cats[cat] = typeof cats[cat] == 'undefined' ? 1 : cats[cat] + 1;
					
				}
				
				if (app.phonegap) {
				
					for (var a in areas) {

						for (var z in areas[a].mzones) {

							var cat = areas[a].name.split(' ')[0];
							cats[cat] = typeof cats[cat] == 'undefined' ? 1 : cats[cat] + 1;

							items.push([
								areas[a].dist,
								areas[a].name,
								'<div class="area" cat="' + cat + '">'
								+ '<span class="dist"><b>' + areas[a].mzones[z] + '</b></span>'
								+ '<strong>' + areas[a].name + '</strong>'
								+ '</div>'
							]);

						}

					}
					
				}
				
				$('div#p-carparks div#p-cps-cats').html('');
				for (var cat in cats) {
					$('div#p-carparks div#p-cps-cats').append(
						'<div><span>' + cat + '</span><span class="dist">' + cats[cat] + '</span></div>'
					);
				}
				
				var render = function(btn, comp) {
					
					$(btn).addClass('toggled').siblings().removeClass('toggled');
					$('div#p-carparks input#p-cps-search').val('');
										
					items.sort(comp);
					
					var list = $('div#p-carparks div#p-cps-list').html('');
					
					var r = '';
					for (var i in items) {
						r += items[i][2];
					}
					
					list.get(0).outerHTML = '<div id="p-cps-list">' + r + '</div>';
					
					$('div#p-carparks div#p-cps-list>div.rcp').click(function() {
						app.go('#carpark-' + $(this).attr('id'));
					});
					
					$('div#p-carparks div#p-cps-list>div.area').click(function() {
						app.go('#sms-' + $(this).find('span b').text());
					});
					
				};
				
				var ds = function(a,b) {
					var cA = a[0];
					var cB = b[0];
					return (cA < cB) ? -1 : (cA > cB) ? 1 : 0;
				};
				
				var az = function(a,b) {
				   var cA = a[1].toUpperCase();
				   var cB = b[1].toUpperCase();
				   return (cA < cB) ? -1 : (cA > cB) ? 1 : 0;
				};
				
				$('div#p-carparks div#p-cps-cats div').click(function() {
					
					var cat = $('span:first', this).text();
					
					$('html,body').animate({scrollTop: 
						$('div#p-carparks div#p-cps-list').offset().top - 100
					}, 500);
					
					$('div#p-carparks div#p-cps-list div').css('display', 'none').each(function() {
						if ($(this).attr('cat') == cat) {
							$(this).css('display', 'block');
						}
					});
					
				});
				
				$('div#p-carparks button#p-cps-cats').unbind('click').click(function() {
					render(this, ds);
					$('div#p-carparks>div#p-cps-cats').show();
					$('div#p-carparks div#p-cps-list div').css('display', 'none');
				});
				
				$('div#p-carparks button#p-cps-dist').unbind('click').click(function() {
					render(this, ds);
					$('div#p-carparks>div#p-cps-cats').hide();
					$('div#p-carparks div#p-cps-list div').css('display', 'block');
				});
				
				$('div#p-carparks button#p-cps-az').unbind('click').click(function() {
					render(this, az);
					$('div#p-carparks>div#p-cps-cats').hide();
					$('div#p-carparks div#p-cps-list div').css('display', 'block');
				});
				
				$('div#p-carparks button.toggled').triggerHandler('click');
				
				var s = $('div#p-carparks input#p-cps-search').unbind('focus').focus(function() {
					
					$('div#p-carparks button#p-cps-az').triggerHandler('click');
					
				}).unbind('keyup').keyup(function() {

					var v = $(this).val().toUpperCase();
					
					$('div#p-carparks div#p-cps-list div').css('display', 'block').each(function() {
						if ($('strong', this).text().toUpperCase().indexOf(v) === -1
						 && $('span>b', this).text().toUpperCase().indexOf(v) === -1) {
							$(this).css('display', 'none');
						}
					});
					
					return false;

				});

			});
			
			app.geo.startWatching();
			
			callback();
			
		});
		
	}
	
	this.loadEnclosed = function(ID, callback) {
		
		this.header(1, function() {
			
			// If eb is set, we should never land here in the first place!
			
			var dir = 'in';

			// So the only way we offer "out" option is if there is 
			// a an active enclosed permit

			var carpark = app.cp(ID);
			
			for (var p in carpark.permits) {
				
				p = carpark.permits[p];

				if (app.pia(p) && p.hotsec_enclosed) {
					dir = 'out';
				}

			}
			
			$('div#p-enclosed div.p-e-dir').hide();
			$('div#p-enclosed div#p-e-dir-' + dir).show();
			
			var btn = $('div#p-enclosed button#p-e-lift');
			
			btn.unbind('click').removeAttr('disabled').text(btn.attr(dir)).click(function() {
				
				btn.text(_('Palun oodake..')).attr('disabled','disabled');
				
				$.getJSON(app.host + '/smart/enclosed-lift', {
					session: app.session,
					carpark: ID,
					car: app.car,
					dir: dir,
					v: version,
					l: app.lang
				}, function(reply) {

					if (!reply.success) {
						btn.text(_('Proovige uuesti')).removeAttr('disabled');
						return alert(reply.message);
					}
					
					localStorage.eb = app.eb = reply.eb;
					
					app.init(0, function() {
						app.go('#tiles');
					});
					
				});

			});
			
			callback();
			
		});
		
	};
			
	this.loadPurchase = function(ID, callback) {
		
		this.header(2, function() {
			
			var carpark = app.cp(ID);
			
			$('div#p-purchase div#p-pc-carpark').html(app.rcp(carpark, false, ''));
			
			var balance = app.account.person.balance;
			
			if (balance < -app.account.person.credit) {
				balance = 0;
			} else {
				balance = app.account.person.credit + balance;
			}
			
			if (app.account.legals.length) {
				
				$('div#p-purchase div#p-pc-buyer').hide();
				
				var wheel = {
					'0': app.account.person.name + ' <small>' + (Math.round(balance * 100) / 100) + ' €</small>'
				};
				
				for (var l in app.account.legals) {
					var ll = app.account.legals[l];
					wheel[ll.ID] = ll.name + ' <small>' + (Math.round(ll.credit * 100) / 100) + ' €</small>'
				}
				
				$("input#p-pc-buyer-select").scroller('destroy').scroller({
					display: 'inline',
					wheels: [{'X': wheel}],
					showLabel: false,
					height: 40,
					rows: 3,
					theme: 'p-pc-buyer'
				}).scroller('getInst').change(true);

			} else {
				
				$('div#p-purchase div#p-pc-buyer').html(
					app.account.person.name
				  + '<br />' + app.account.person.code
				  + '<p>' + _('Vabad vahendid') + ': ' + (Math.round(balance * 100) / 100) + ' €</p>'
				).show();
					
				$("input#p-pc-buyer-select").scroller('destroy');
				
			}
					
			$('div#p-purchase span#p-pc-carpark').text(carpark.name);
			
			$('div#p-purchase button#p-pc-det').unbind('click').click(function() {
				
				$(this).parent().hide().next().slideDown('fast');
				
				var bbb = $('div#p-purchase button#p-pc-buy');
				bbb.text(bbb.attr('o'));
				
			}).parent().show();
			
			$('div#p-purchase button#p-pc-now').parent().hide();
			
			$("input#p-pc-start").scroller('destroy').scroller({
				preset: 'datetime',
				display: 'inline',
				dateOrder: 'D ddmmyy',
				timeWheels: 'HHii',
				dayNamesShort: _('PETKNRL').split(''),
				showLabel: false,
				height: 48,
				theme: 'p-pc-start',
				startYear: (new Date()).getFullYear(),
				minDate: new Date(),
				dateFormat: 'yy-mm-dd',
				timeFormat: 'HH:ii:ss',
				onChange: function(val){
					
					val = val.split(' ');
					val[0] = val[0].split('-');
					val[1] = val[1].split(':');
					
					var ts = new Date(val[0][0],val[0][1],val[0][2],val[1][0],val[1][1]);
					
					$.getJSON(app.host + '/smart/pricelist', {
						carpark: ID,
						start: Math.round(ts.getTime() / 1000),
						v: version,
						l: app.lang
					}, function(reply) {
						
						if (!reply.success) {
							return alert('Hinnakirja arvestuses tekkis viga..');
						}

						var wheel = reply.pricelist;
						
						$("input#p-pc-price").scroller('destroy').scroller({
							display: 'inline',
							wheels: [
								{'PL': wheel}
							],
							showLabel: false,
							height: 40,
							rows: 5,
							theme: 'p-pc-price'
						}).scroller('getInst').change(true);
						
						if (typeof wheel['auto-12h'] != 'undefined') {
							$("input#p-pc-price").scroller('setValue', ['auto-12h'], true, 1);
						}/* else if (typeof wheel['1h-1'] != 'undefined') {
							$("input#p-pc-price").scroller('setValue', ['1h-1'], true, 1);
						}*/

					});
				
				}
				
			}).scroller('getInst').change(true);
			
			$('div#p-purchase button#p-pc-now').unbind('click').click(function() {
				
				var n = new Date();
				
				$("input#p-pc-start").scroller('setValue', [0, 0, 0, 0, 0]);
				
				setTimeout(function() {
					$("input#p-pc-start").scroller('setValue', [n.getDate(), n.getMonth(), n.getFullYear(), n.getHours(), n.getMinutes()], true, 1);
				}, 300);
				
				var bbb = $('div#p-purchase button#p-pc-buy');
				bbb.text(bbb.attr('o'));
				
			});
			
			var e = $('div#p-purchase input#p-pc-email');
			
			if (app.account.person.email) {
				e.val('').parent().hide();
			} else {
				e.val(localStorage.email).parent().show();
			}

			$('div#p-purchase button#p-pc-buy').unbind('click').click(function() {
				
				localStorage.email = e.val();
				
				var btn = $(this).attr('disabled','disabled').text(_('Üks hetk..'));
				
				var start = $("input#p-pc-start").val().replace(' ', 'T');
				var price = $("input#p-pc-price").val();
				var buyer = $("input#p-pc-buyer-select").val();
				
				$.getJSON(app.host + '/smart/purchase', {
					session: app.session,
					car: app.car,
					carpark: ID,
					start: start,
					price: price,
					buyer: buyer,
					email: e.val(),
					v: version,
					l: app.lang
				}, function(reply) {
					
					if (!reply.success) {
						btn.removeAttr('disabled').text(btn.attr('o'));
						return alert(reply.message);
					}
					
					if (reply.hotsec_pin_nr) {
						alert(
							'Teie PIN-kood parklasse sisenemiseks ja sellest väljumiseks: ** ' + reply.hotsec_pin_nr + ' **'
						  + '\n\nPUK-kood parklast väljumiseks parkimisaja ületamisel vastavalt tingimustele: ** ' + reply.hotsec_puk_nr + ' **'
						);
					}
					
					btn.text(_('Ost õnnestus!'));
					
					app.init(0, function() {
						
						btn.removeAttr('disabled').text(btn.attr('o'));
						
						app.go('#tiles');
						
					});
					
				});
				
			});
			
			callback();
			
		});
		
	}
	
	this.loadTerm = function(ID, callback) {
		
		this.header(2, function() {
			
			$('div#p-term>div>div:gt(0)').hide();
			$('div#p-term>div>div:eq(0)').show();
				
			/*for (var c in app.carparks) {
				for (var p in app.carparks[c].permits) {
					if (app.carparks[c].permits[p].ID == ID) {
						if (!app.carparks[c].permits[p].period_open) {
							return app.go('#tiles');
						}
					}
				}
			}*/
			
			$.getJSON(app.host + '/smart/terminate', {session: app.session, ID: ID, v: version, l: app.lang}, function(reply) {
				
				$('div#p-term>div>div:eq(0)').hide();
					
				if (!reply.success) {
					$('div#p-term>div>div:eq(2)').text(reply.message).show();
					return;
				}
					
				app.init(0, function() {
					
					$('div#p-term>div>div:eq(1)').show();
					$('div#p-term>div>div:eq(2)').hide();

					$('div#p-term span#p-tm-cost').text(reply.cost);
					$('div#p-term span#p-tm-usable').text(reply.usable);

					$('div#p-term button').show().click(function() {
						app.go('#tiles');
					});
					
				});

			});
			
			callback();
			
		});
		
	};
	
	this.loadLogin = function(fwd, callback) {

		var ikc = function(ik) {
			
			if (!ik.length) return false;
			
			var m1 = [1,2,3,4,5,6,7,8,9,1];
			var m2 = [3,4,5,6,7,8,9,1,2,3];
			
			var c = ik.charAt(10);
			
			var t=0;
			
			for (var i=0; i<10; i++) {
				t += ik.charAt(i) * m1[i];
			}
			
			var m = t % 11;
			t = 0;
			
			if (m == 10) { 
				for (var i=0; i < 10; i++) {
					t += ik.charAt(i) * m2[i];
				}
				m = t % 11;
				if (m == 10) {
					m = 0;
				}
			}

			return m == c;
			
		}
		
		this.header(1, function() {
			
			$('div#p-login input#p-l-idcode').val(localStorage.idcode);
			
			$('div#p-login button').unbind('click').click(function() {
				
				var ik = localStorage.idcode = $(this).siblings('input#p-l-idcode').val();
				
				if (!ikc(ik)) {
					return alert(_('Isikukood ei paista olevat korrektne'));
				}
				
				var btn = $(this).attr('disabled','disabled').text(_('Üks hetk..'))
				
				$.getJSON(app.host + '/smart/status', {idcode:ik, v: version, l: app.lang}, function(reply) {
					
					btn.text(btn.attr('o')).removeAttr('disabled');
					
					if (!reply.success) {
						return alert(reply.message);
					}
					
					if (reply.status) {
						app.go('#pin-' + ik + '-' + fwd);
					} else {
						app.go('#register-' + ik + '_' + encodeURIComponent(reply.skname) + '-' + fwd);
					}
					
				});
				
			});
			
			$('div#p-login img#p-l-mobid').unbind('click').click(function() {
				app.go('#mobid-' + fwd);
			});

			callback();
			
		});
		
	}
	
	this.loadMobid = function(fwd, callback) {
		
		this.header(1, function() {
			
			var sta = $('div#p-mobid div.p-shade:first').hide();
			
			$('div#p-mobid input').val(localStorage.phone);
			
			var btn = $('div#p-mobid button').show().unbind('click').click(function() {
				
				btn.hide();
				
				sta.show().text(_('Palun oodake..'));
					
				var msisdn = localStorage.phone = $('div#p-mobid input').val();
				
				$.ajax({
					url: app.host + '/smart/mobid-login/msisdn/' + msisdn + '/v/' + version + '/l/' + app.lang,
					contentType: 'text/json',
					cache: false,
					success: function(reply) {

						if (!reply.success) {
							btn.show();sta.hide();
							return alert(reply.message);
						}

						var challenge = reply.challenge;

						sta.html(_('Palun kontrollige, et kinnituskood <b>KK</b> klapib telefoniekraanil oleva koodiga ning sisestage seejärel telefonis <b>PIN1</b>.').replace('KK', challenge));
						
						var polls = 0;
						var interval;

						var poller = function() {

							$.ajax({
								url: app.host + '/smart/mobid-poll/token/' + reply.token + '/v/' + version + '/l/' + app.lang,
								contentType: 'text/json',
								cache: false,
								success: function(reply) {

									if (interval == null) {return;}

									if (!reply.success) {
										window.clearInterval(interval);interval = null;
										btn.show();sta.hide();
										return alert(reply.message);
									}

									if (reply.authenticated) {
										window.clearInterval(interval);interval = null;
										btn.show();sta.hide();
										app.sess(reply.session);
										app.init(0, function() {
											app.go('#' + fwd.replace('_', '-'));
										});
									}

									if (polls > 60) {
										window.clearInterval(interval);interval = null;
										btn.show();sta.hide();
										return alert(_('Mobiil-ID autentimiseks ette nähtud aeg on lõppenud.'));
									}

								},
								error: function() {
									
									if (interval == null) {return;}
									
									window.clearInterval(interval);interval = null;
									btn.show();sta.hide();
									return alert(_('Mobiil-ID autentimisel tekkis viga.'));
									
								}
							});

						};

						interval = window.setInterval(function() {poller();}, 1234);

					},
					error: function() {
						btn.show();sta.hide();
						alert(_('Mobiil-ID autentimisel tekkis viga.'));
					}
				});
				
			});
			
			callback();
			
		});
		
	}
	
	this.loadPin = function(idcode, fwd, callback) {
		this.header(1, function() {
			
			$('div#p-pin b span').text(idcode);
			
			$('div#p-pin button:eq(0)').unbind('click').click(function() {
				
				var pin = $(this).prev('input').val();
				$(this).prev('input').val('');
				
				if (!(/^[0-9]{4}$/).test(pin)) {
					return alert(_('PIN koosneb neljast numbrist!'));
				}
				
				var btn = $(this).attr('disabled','disabled').text(_('Üks hetk..'));
				
				$.getJSON(app.host + '/smart/login', {
					idcode:idcode,
					pin: pin,
					v: version,
					l: app.lang
				}, function(reply) {
					
					btn.text(btn.attr('o')).removeAttr('disabled');
					
					if (!reply.success) {
						return alert(reply.message);
					}
					
					app.sess(reply.session);

					app.init(0, function() {
						app.go('#' + fwd.replace('_', '-'));
					});
					
				});
				
			});
			
			$('div#p-pin button:eq(1)').unbind('click').click(function() {
				
				var btn = $(this).attr('disabled','disabled').text(_('Üks hetk..'));
				
				$.getJSON(app.host + '/smart/recover', {idcode:idcode, v: version, l: app.lang}, function(reply) {

					if (!reply.success) {
						btn.text(btn.attr('o')).removeAttr('disabled');
						return alert(reply.message);
					}
					
					btn.text(_('SMS on lähetatud'));
					
				});
				
			});

			callback();
			
		});
	}
	
	this.loadRegister = function(ident, fwd, callback) {
		this.header(1, function() {
			
			ident = ident.split('_');
			ident[1] = decodeURIComponent(ident[1]);
			
			$('div#p-register b span').text(ident[0]);
			$('div#p-register input#p-r-name').val(ident[1]);
			
			$('div#p-register button').unbind('click').click(function() {
				
				var btn = $(this).attr('disabled','disabled').text(_('Üks hetk..'));
				
				$.getJSON(app.host + '/smart/register', {
					idcode:	ident[0],
					car:	$('div#p-register input#p-r-car').val(),
					name:	$('div#p-register input#p-r-name').val(),
					email:	$('div#p-register input#p-r-email').val(),
					phone:	$('div#p-register input#p-r-phone').val(),
					v: version,
					l: app.lang
				}, function(reply) {

					if (!reply.success) {
						btn.text(btn.attr('o')).removeAttr('disabled');
						return alert(reply.message);
					}
					
					app.sess(reply.session);
					
					alert(_('NB! Palun kirjutage üles Teie PIN-kood:') + ' ** ' + reply.pin + ' **');
										
					app.init(0, function() {
						app.go('#' + fwd.replace('_', '-'));
					});
					
				});
				
			});

			callback();
			
		});
	}
	
	this.loadContract = function(fwd, callback) {
		this.header(1, function() {
			
			$.getJSON(app.host + '/smart/contract-list', {
				session: app.session,
				v: version,
				l: app.lang
			}, function(reply) {
					
				if (!reply.success) {
					return alert('Lepingudokumentide laadimisel tekkis viga');
				}
				
				$('div#p-contract ul').html('');
				
				for (var l in reply.list) {
					$('div#p-contract ul').append('<li><a href="#" rel="' + l + '">' + reply.list[l].split(' - ')[0].replace('.html','') + '</a></li>');
				}
				
				$('div#p-contract button#p-c-decline').click(function() {
					window.location.hash = '#tiles';
				});
				
				$('div#p-contract button#p-c-accept').click(function() {
					
					app.acp = true;
					
					$.getJSON(app.host + '/smart/contract-accept', {
						session: app.session,
						v: version,
						l: app.lang
					}, function(reply) {
						app.go('#' + fwd.replace('_', '-'));
					});
					
				});
				
				$('div#p-contract ul a').click(function() {

					$.getJSON(app.host + '/smart/contract-file', {
						session: app.session,
						v: version,
						l: app.lang,
						id: $(this).attr('rel')
					}, function(reply) {

						$('div#p-contract div#p-c-text').html(reply.file).show();

						$('html,body').animate({scrollTop:
							$('div#p-contract div#p-c-text').offset().top - 100
						}, 500);
						
					});

					return false;
					
				});

			});

			callback();
			
		});
	}
	
	this.loadCar = function(callback) {
		this.header(1, function() {
			
			var s = $('div#p-car div.select');
			$('button:not(:last)', s).remove();
			
			for (var c in app.cars) {
				
				var cpx = $('<button rel="' + c + '" style="width: 16%; display: inline; margin-bottom: 0; margin-left: 4%"><b>X</b></button>');
				
				cpx.click(function() {
					
					var btn = $(this).attr('disabled', 'disabled');
					
					$.getJSON(app.host + '/smart/car-del', {
						session: app.session,
						car: $(this).attr('rel'),
						v: version,
						l: app.lang
					}, function(reply) {
						
						btn.removeAttr('disabled');
						
						if (!reply.success) {
							return alert(reply.message);
						}

						app.init(0, function() {
							app.go('#car-' + + (new Date()).getTime());
						});

					});
					
				});
				
				s.prepend(cpx);
				
				var cp = $('<button rel="' + c + '" style="width: 80%; display: inline; margin-bottom: 0"><b>' + app.cars[c] + '</b></button>');
				
				cp.click(function() {
					
					$.getJSON(app.host + '/smart/car-set', {
						session: app.session,
						car: $(this).attr('rel'),
						v: version
					});
					
					app.car = $(this).attr('rel');
					app.go('#tiles');
					
				});
				
				s.prepend(cp);
				
			}

			callback();
			
		});
	}
	
	this.loadNewCar = function(callback) {
		this.header(1, function() {
			
			$('div#p-newcar button').unbind('click').click(function() {
				
				var btn = $(this).attr('disabled','disabled').text(_('Üks hetk..'));
				
				$.getJSON(app.host + '/smart/car-new', {
					session: app.session,
					reg: $('div#p-newcar input:first').val(),
					v: version,
					l: app.lang
				}, function(reply) {
					
					btn.text(btn.attr('o')).removeAttr('disabled');
					
					if (!reply.success) {
						return alert(reply.message);
					}
					
					app.cars[reply.car.ID] = reply.car.reg;
					app.car = reply.car.ID;
					
					app.go('#tiles');
					
				});
				
			});
			
			callback();
			
		});
	}
	
	this.loadMap = function(lat,lng,callback) {
		this.header(1, function() {
			
			var map = function(coords) {
				
				if (app.map == null) {
					
					var canvas = $('<div id="map_canvas" style="width:100%; background:white"></div>')
						.appendTo('div#p-map')
						.height($(window).height() - 10 - 45);

					app.gmap.resetMarkers();
					
					var cs = function(c) {
						return function() {
							app.go('#carpark-' + app.carparks[c].ID);
						}
					}

					for (var c in app.carparks) {
						app.gmap.addMarker(app.carparks[c].coords, cs(c));
					}
					
					app.gmap.zoom = 15;
					
					app.gmap.buildDynamic(canvas.get(0), coords, app.phonegap, function(map,canvas) {
						app.map = [canvas,map];
					});

				} else {

					$(app.map[0])
						.appendTo('div#p-map')
						.height($(window).height() - 10);
						
					app.map[1].setCenter(new google.maps.LatLng(coords.lat,coords.lng));
						
				}
				
				callback();

			};
			
			if (typeof lat == 'undefined') {
				app.geo.addWatcher('map', map);
				app.geo.startWatching();
			} else {
				
				map({lat: lat, lng: lng});
				
			}
			
		});
	}
		
	this.loadSettings = function(callback) {
		this.header(1, function() {
			
			if (app.session) {
				
				var balance = app.account.person.balance;

				if (balance < -app.account.person.credit) {
					balance = 0;
				} else {
					balance = app.account.person.credit + balance;
				}
				
				$('div#p-settings div#p-s-person>div').html(
					app.account.person.name
				  + '<br />' + app.account.person.code
				  + '<br />' + _('Krediidilimiit') + ': ' + app.account.person.credit + ' €'
				  + '<br />' + _('Vabad vahendid') + ': ' + (Math.round(balance * 100) / 100) + ' €'
				).parent().show();
					
			} else {
				$('div#p-settings p#p-s-person').parent().hide();
			}
			
			$('div#p-settings button.p-s-language').unbind('click').click(function() {
				localStorage.lang = $(this).attr('rel');
				if (window.location.search.indexOf('?demo') != -1) {
					window.location.href = '?demo&reload=' + (new Date()).getTime();
				} else {
					window.location.href = '?reload=' + (new Date()).getTime();
				}
			});
			
			$('div#p-settings button#p-s-logout').unbind('click').click(function() {
				
				app.session = localStorage.session = '';
				app.account = null;

				app.car = null;
				app.cars = {};
				
				app.go('#tiles');
				
			});

			callback();
			
		});
	}
	
	this.loadNoloc = function(callback) {
		
		this.header(1, function() {
			
			if (app.is.mobile() && app.is.Android()) {
				
				var f = 'div#pages div#p-noloc div#p-noloc-fb';

				$(f).show();

				if (app.is.Android()) {
					$(f + ' a:eq(0)').show();
				} else {
					$(f + ' a:eq(1)').show();
				}
				
			}
			
			callback();
			
		});
		
	}
	
	$(document.body).load('body/' + this.lang + '.' + version + '.html', function(a,b,xhr) {
		
		if (!app.phonegap) {
			
			$('div#pages div#p-loc').show();
			
			if (app.is.mobile() && app.is.Android()) {
				
				setTimeout(function() {
					
					$('div#p-loading').hide();
					
					var f = 'div#pages div#p-loc div#p-loc-fb';
					
					$(f).fadeIn('fast');
					
					if (app.is.Android()) {
						$(f + ' a:eq(0)').show();
					} else {
						$(f + ' a:eq(1)').show();
					}

				}, 3333);
				
			}
			
		}
		
		app.init(0, function() {
			app.app();
		});
		
	});
	
	
}

var areas = [{"polys":[{"lat":59.438,"lng":24.759,"lngL":24.7227,"lngR":24.7871,"latB":59.4166,"latT":59.4498,"p":"_muiJmz|uCvDiGxCyHfD}JnD_OdGwVLCxB{GzFiX`@gCVyCFeB?cDUyDq@kGW}@Q_ACg@B]tCkCf@u@vBwBdAYeD{YuEaVaOqv@eA?cFqCcNxFuEkDk@GsCoFqEuWeC}AuHcKE}AO{DiN`DhAsO|@aDdAqJqBuIqBmEkFmAcHrKiAfFgEgFcCfC}EcE}I{@e@VhDvTmG~ByEXkC`CkFiCaA`@w@dAy@rDYhDqAhCQfBo@?a@|ACtA~AtP`LtPwA|HqJwICtA`IhRbHxo@rDwBpBtLoGlEaFoc@g@HG}Ay@VoBeQoAqCe@`@zCfYsCvB{Voz@dA}Si@mAwAr@c@fF?lPTr@lBtP?|A\\tElArGzBtI~@rGrAtEk@|AsC|AcBb@sAIs@j@o@fF?jApAvICnBnC?x@p@xAzG?r@wCF?lAg@??bAn@?DbAg@P?r@f@FFr@bEQB|DdDYTpGj@rD~AfBROtAvAhC`CWnW`BtA`DxCjBlA@Bc@z[H~@`ElMRfBX~ObAhExJ|S`GXzClA~ChDxElJjFhE~MzBhIwBtDcDvZ{\\","z":1}],"mzones":["KESK","KESK15"],"color":"0xFF000033","name":"Tallinn (Kesklinn)"},{"polys":[{"lat":59.438,"lng":24.743,"lngL":24.7326,"lngR":24.7539,"latB":59.4318,"latT":59.4431,"p":"c~xiJk_avCDbB`ElULh@BX@Z?f@MfCA^?\\JbBBNNf@~AtFfGhTnBdIh@jBvBpHv@zAZj@\\f@`A`AxAnAlAdAnA|@pAbA\\@h@GhASn@Gl@Mb@MxHuGv@q@x@u@j@aAv@sCt@uCFo@kBeQeAqHmAgHSuACkAd@qJaBgBmAiAq@eAu@aBgAoC[s@Yu@_ByGqDuO_DkCgCcAgBs@eAMiGZgBv@KZKR_GlFqAfAs@lAg@v@Uz@I`A@x@","z":2}],"mzones":["VANA","VANA15"],"color":"0xFF000033","name":"Tallinn (Vanalinn)"},{"polys":[{"lat":59.434,"lng":24.753,"lngL":24.7367,"lngR":24.7647,"latB":59.4271,"latT":59.4412,"p":"aawiJyu_vC|BlM~CxZfFqVdMuLbGIgJ{hAu@oGeAcGo@cDwAqF}AkE}@sBsC_FwCaEwBuBgDaCuAi@sAg@{OOsP|E`BzLY~GuFbf@^pBtDqCrIYjFvCnClAnDfO|AlGb@bBbAdCrBpEx@hAz@p@bAzARBq@|I","z":3}],"mzones":["SYDA","SYDA15"],"color":"0xFF000033","name":"Tallinn (Südalinn)"},{"polys":[{"lat":59.469,"lng":24.827,"lngL":24.8181,"lngR":24.833,"latB":59.4662,"latT":59.471,"p":"uu}iJgeqvC`@nApAzB|@qB`@~AiBdEoCjHoClHsCfHo@hDgD`KsDtLTbMfAtEQ^oAiF?cBQqJvGwTQi@|@cCFgClBmKtAkE~@gGp@kEhBaE","z":4}],"mzones":["PIRITA15"],"color":"red","name":"Tallinn (Pirita)"},{"polys":[{"lat":59.424,"lng":27.526,"lngL":27.5194,"lngR":27.5318,"latB":59.4205,"latT":59.4263,"p":"urtiJa|}fDj@\\oCaKUyA[}AcAiCkE}FeAuCgBcCWmAcAoFmA}CqA{EY]mBi@eA}AQmAEkFGw@OFBlHLd@GbADxHT??}ACgFlA`BX\\dBr@lApEjAbDx@pEHd@XbA~AlCjAhCnEdGdAfC\\lCNj@tBrH","z":5}],"mzones":["SADAMA","SADAMA15"],"color":"blue","name":"Toila (sadama tsoon)"},{"polys":[{"lat":59.421,"lng":27.516,"lngL":27.5118,"lngR":27.5204,"latB":59.4195,"latT":59.425,"p":"omuiJmn}fDzDwKnBqE|GlB~FvACvCSnB?hD`@pJtAvHr@h@p@bAZtAh@jEQNk@oEUw@aAkBgBM{Sc@`@wP}EyB","z":6}],"mzones":["RANNA","RANNA15"],"color":"red","name":"Toila (ranna tsoon)"},{"polys":[{"lat":59.359,"lng":27.411,"lngL":27.4091,"lngR":27.4133,"latB":59.3583,"latT":59.3593,"p":"eqhiJmjhfDZJf@oHdAoFFyAy@aC[PWqAsAlEB`@zAfFo@vI","z":7},{"lat":59.359,"lng":27.421,"lngL":27.4196,"lngR":27.4216,"latB":59.3583,"latT":59.3591,"p":"eqhiJkpjfDCQl@c@]cDPSl@dFj@]XtC_Ar@c@iEm@d@","z":8}],"mzones":["JHV1"],"color":"red","name":"Jõhvi"},{"polys":[{"lat":58.38,"lng":26.722,"lngL":26.7182,"lngR":26.7261,"latB":58.3773,"latT":58.3826,"p":"}ricJskabDgB{IGYe@gFQqB}@eLPG^xEzAo@Q}EPMPzEpAk@rCoDPQDTsCxDl@bGODm@yFIFoAj@VjGRvFjC_@bBqATC~BcE`BuBnByBFGsA{DJUd@pALWfAgAFTsA`Bd@rAlEiIwAkEL]nArDDVJb@{E|IKP_FzFuB|DqBxAoDd@C]i@{NyAr@b@|Fh@xFhBlJIX??????","z":9},{"lat":58.38,"lng":26.724,"lngL":26.7236,"lngR":26.7255,"latB":58.3793,"latT":58.38,"p":"cficJimbbDaCuJNQ~BvJMN","z":10},{"lat":58.378,"lng":26.727,"lngL":26.7257,"lngR":26.7276,"latB":58.3779,"latT":58.3789,"p":"c}hcJi|bbD{C}H[n@xCbI\\u@","z":11}],"mzones":["A","A15"],"color":"red","name":"Tartu (A-piirkond)"},{"polys":[{"lat":58.382,"lng":26.719,"lngL":26.7145,"lngR":26.7231,"latB":58.3806,"latT":58.3843,"p":"_ejcJcjbbDDz@N`AlAjF`@vDfAbJJ|@FNDR`EtHFl@}@|IFBbA{JBOBOh@gChAsCjAgBx@aA`@e@BYUgEK}@GBLdARzDCNoAzAcAvA[l@u@jBgCyHYkAn@o@VSB?z@w@EK{@t@ADQJq@h@OVo@dA_AnA@N`AqAt@mAXnAzArEj@dBEJi@fCQF_EuHMg@qAwKa@qDbAo@rF_@COqF^ED_Ah@{@sDS_AIs@Em@GC","z":12},{"lat":58.382,"lng":26.714,"lngL":26.7142,"lngR":26.7144,"latB":58.3824,"latT":58.3825,"p":"iyicJ_s`bDBe@LDC`@MA","z":13},{"lat":58.382,"lng":26.724,"lngL":26.7232,"lngR":26.7247,"latB":58.3805,"latT":58.3842,"p":"yuicJwqbbDJlCzC_ChAs@DERKAM[RgAr@OmA_@NAQyB`A}CnAuCjAwCr@@NzCw@lDwAzB}@HE","z":14},{"lat":58.379,"lng":26.727,"lngL":26.7256,"lngR":26.7276,"latB":58.3788,"latT":58.38,"p":"ajicJ}ybbD^a@vEkJ@AEG??gApBkBrDcAjBBD","z":15},{"lat":58.379,"lng":26.728,"lngL":26.7272,"lngR":26.7291,"latB":58.379,"latT":58.3793,"p":"wdicJidcbD^u@k@oAj@{EWQg@|EJp@KZ^fA","z":16},{"lat":58.376,"lng":26.724,"lngL":26.7207,"lngR":26.7261,"latB":58.3748,"latT":58.3774,"p":"ouhcJe}bbD_ChEAjAbIxWRi@sBqGvGmH[m@iGjHeEoM`CuEO]","z":17},{"lat":58.377,"lng":26.722,"lngL":26.722,"lngR":26.7228,"latB":58.3766,"latT":58.377,"p":"yuhcJqcbbDj@{@g@kBk@v@f@nB","z":18},{"lat":58.378,"lng":26.722,"lngL":26.722,"lngR":26.7229,"latB":58.3776,"latT":58.3779,"p":"k|hcJqcbbDh@e@a@iC_@d@Nd@FbB","z":19},{"lat":58.376,"lng":26.729,"lngL":26.7277,"lngR":26.7309,"latB":58.375,"latT":58.3768,"p":"gohcJyfcbDLk@wAoDvEgJIeAyIpQPR|AaDdBdE","z":20},{"lat":58.377,"lng":26.732,"lngL":26.7317,"lngR":26.7331,"latB":58.3763,"latT":58.3777,"p":"m{hcJcadbDtByELp@r@qA|AlEYb@iAgDuBhEQ]Sh@Ue@","z":21},{"lat":58.379,"lng":26.719,"lngL":26.7155,"lngR":26.7232,"latB":58.3775,"latT":58.3803,"p":"{kicJo{abDjD`ZbCjD`@MvEyIkAcJWyFb@mLoBoCQd@dBhCa@fL\\zG`A|GoEtHkBsB{Da[Sb@","z":22},{"lat":58.377,"lng":26.721,"lngL":26.7192,"lngR":26.7216,"latB":58.3768,"latT":58.3776,"p":"qvhcJcrabDVUwBmI^mACCACQg@Gf@c@jAbClJ","z":23},{"lat":58.378,"lng":26.733,"lngL":26.7323,"lngR":26.7337,"latB":58.3776,"latT":58.3782,"p":"u~hcJkhdbDv@iCdA~C{@vBaAmC","z":24},{"lat":58.378,"lng":26.735,"lngL":26.7337,"lngR":26.7365,"latB":58.3777,"latT":58.3789,"p":"g~hcJuldbDu@uAAaF}A?K}F`CF?xF~ATNbCoAxC","z":25}],"mzones":["B","B60"],"color":"orange","name":"Tartu (B-piirkond)"},{"polys":[{"lat":58.381,"lng":26.713,"lngL":26.7123,"lngR":26.7156,"latB":58.3787,"latT":58.3824,"p":"_yicJ{r`bDx@\\rA`Gz@jAv@GhEyAzDnB|@QNoDRaMUCe@zO[v@oCiA_Aq@kFrB{BoGq@sBYDM~@","z":26},{"lat":58.376,"lng":26.72,"lngL":26.7174,"lngR":26.723,"latB":58.3742,"latT":58.3769,"p":"auhcJmnabDtAtFPI}B_JxEsHnDpKNMoDuKlG{KMS{GhLwEpHMVl@tB","z":27},{"lat":58.375,"lng":26.735,"lngL":26.7343,"lngR":26.7368,"latB":58.3749,"latT":58.3753,"p":"qjhcJkpdbDkAkNPEjAzMQT","z":28},{"lat":58.375,"lng":26.728,"lngL":26.725,"lngR":26.7309,"latB":58.3743,"latT":58.3758,"p":"}fhcJavbbDc@UeC}QoAlC_@_AlFiIqAgGXm@lBxHqCtEfCtS","z":29}],"mzones":["C","C120"],"color":"green","name":"Tartu (C-piirkond)"},{"polys":[{"lat":58.386,"lng":24.502,"lngL":24.4935,"lngR":24.5113,"latB":58.3819,"latT":58.3893,"p":"_xjcJsiotC`AnI|Bl@`G~@vDPfBkH?mExCYWaIjB]xBMm@gYsDoMyCw@RkF`@qCq@?qA_EmCaI}CiIaDJuEa@cG_A_AfL@dYWvD\\fJtArBZ|HdBlX|@KhA~@","z":30}],"mzones":["PARNU"],"color":"red","name":"Pärnu"},{"polys":[{"lat":58.382,"lng":24.508,"lngL":24.5064,"lngR":24.511,"latB":58.38,"latT":58.3836,"p":"y_jcJomqtChEsOhGjIoAnFXNrAwFhC`DRe@sCaDbE_OYY_B`GmGkJmBxG}CyEOl@vCvEmEnOXR","z":31}],"mzones":["TURG"],"color":"green","name":"Pärnu (turg)"},{"polys":[{"lat":58.376,"lng":24.501,"lngL":24.4925,"lngR":24.5157,"latB":58.3724,"latT":58.3814,"p":"oricJountC|LGzLJ`@UTk@pBeHFcAGq@KmCHgAXi@Da@Fg@x@aBzFw[JeAnBsK^mAhEqVPcCCsGg@sM[mBq@aCc@iDYyAkAaC_Mp~@yAnJwAtIoEdTt@dAiB`O{@jQoQHL\\","z":32}],"mzones":["RAND"],"color":"orange","name":"Pärnu (rand)"},{"polys":[{"lat":58.364,"lng":25.6,"lngL":25.5947,"lngR":25.6035,"latB":58.3614,"latT":58.3659,"p":"kmfcJijf{CJ{Cd@D@[c@EN}Db@gGZRP{AvBrAu@rAJVh@{@EhGh@xEf@bA?nDV?N~CdB]@[pGpCTwAaLqECsBp@FrBOxAOX_@t@yD\\d@FU_@w@tAyGeDkCk@[[fBgAo@j@yFt@aFhBzBx@hBLe@q@{AsBeCkAqAgA[_@XsBmAG^lBlAPPFSLM~@Rz@`Au@fFa@bFk@|CeCqAgBiA_As@FiAx@eFMY}@pFEhAIWkE{BA^bE|BLZUhBa@dG_@tJPF","z":33}],"mzones":["VIL","VIL2H"],"color":"red","name":"Viljandi"}] ;
