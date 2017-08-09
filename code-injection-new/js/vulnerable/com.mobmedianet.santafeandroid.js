






            (function() {
                var jasmineEnv = jasmine.getEnv();
                jasmineEnv.updateInterval = 1000;

                var htmlReporter = new jasmine.HtmlReporter();

                jasmineEnv.addReporter(htmlReporter);

                jasmineEnv.specFilter = function(spec) {
                    return htmlReporter.specFilter(spec);
                };

                var currentWindowOnload = window.onload;

                window.onload = function() {
                    if (currentWindowOnload) {
                        currentWindowOnload();
                    }
                    execJasmine();
                };

                function execJasmine() {
                    jasmineEnv.execute();
                }
            })();
        





















      var flurryP_news = {};
      var flurryP_alert = {};
      var flurryP_red = {};
    

      function flurry_event(nombre_evento){
        if(nombre_evento.length > 250) 
            nombre_evento = nombre_evento.substring(0,250);
          window.plugins.flurry.logEvent(nombre_evento);
     //   alert(nombre_evento);
    }
   

      function flurry_noticias(tipo_noticia){
            flurryP_news["Detalle"]=tipo_noticia;
            window.plugins.flurry.logEventWithParameters("Noticias",flurryP_news);
       //     alert("Noticias: "+tipo_noticia);
      }
   

      function flurry_alerta(tipo_alerta){
            flurryP_alert["Detalle"]=tipo_alerta;
            window.plugins.flurry.logEventWithParameters("Alerta",flurryP_alert);
       //     alert("Alerta: "+tipo_alerta);
      }
   

      function flurry_redes(red){
            flurryP_red["tipo"]=red;
           window.plugins.flurry.logEventWithParameters("Redes Sociales",flurryP_red);
      //     alert("Redes Sociales: "+red);
      }
   


   var parametros = window.location.href.split("?")[1];
	if(!(typeof parametros === "undefined"))
	{
		var params  = parametros.split("&");
		var tit     = params[0].replace("title=","");
		var alertid = params[1].replace("id=","");
		window.location='./index.html?title='+tit+'&id='+alertid;
	}else{
		 window.location='./index.html';
	}    
   

/*
 XDate v0.7
 Docs & Licensing: http://arshaw.com/xdate/
*/
var XDate=function(g,m,A,p){function f(){var a=this instanceof f?this:new f,c=arguments,b=c.length,d;typeof c[b-1]=="boolean"&&(d=c[--b],c=q(c,0,b));if(b)if(b==1)if(b=c[0],b instanceof g||typeof b=="number")a[0]=new g(+b);else if(b instanceof f){var c=a,h=new g(+b[0]);if(l(b))h.toString=w;c[0]=h}else{if(typeof b=="string"){a[0]=new g(0);a:{for(var c=b,b=d||!1,h=f.parsers,r=0,e;r<h.length;r++)if(e=h[r](c,b,a)){a=e;break a}a[0]=new g(c)}}}else a[0]=new g(n.apply(g,c)),d||(a[0]=s(a[0]));else a[0]=new g;
typeof d=="boolean"&&B(a,d);return a}function l(a){return a[0].toString===w}function B(a,c,b){if(c){if(!l(a))b&&(a[0]=new g(n(a[0].getFullYear(),a[0].getMonth(),a[0].getDate(),a[0].getHours(),a[0].getMinutes(),a[0].getSeconds(),a[0].getMilliseconds()))),a[0].toString=w}else l(a)&&(a[0]=b?s(a[0]):new g(+a[0]));return a}function C(a,c,b,d,h){var e=k(j,a[0],h),a=k(D,a[0],h),h=c==1?b%12:e(1),f=!1;d.length==2&&typeof d[1]=="boolean"&&(f=d[1],d=[b]);a(c,d);f&&e(1)!=h&&(a(1,[e(1)-1]),a(2,[E(e(0),e(1))]))}
function F(a,c,b,d){var b=Number(b),h=m.floor(b);a["set"+o[c]](a["get"+o[c]]()+h,d||!1);h!=b&&c<6&&F(a,c+1,(b-h)*G[c],d)}function H(a,c,b){var a=a.clone().setUTCMode(!0,!0),c=f(c).setUTCMode(!0,!0),d=0;if(b==0||b==1){for(var h=6;h>=b;h--)d/=G[h],d+=j(c,!1,h)-j(a,!1,h);b==1&&(d+=(c.getFullYear()-a.getFullYear())*12)}else b==2?(b=a.toDate().setUTCHours(0,0,0,0),d=c.toDate().setUTCHours(0,0,0,0),d=m.round((d-b)/864E5)+(c-d-(a-b))/864E5):d=(c-a)/[36E5,6E4,1E3,1][b-3];return d}function t(a){var c=a(0),
b=a(1),a=a(2),b=new g(n(c,b,a)),d=u(c),a=d;b<d?a=u(c-1):(c=u(c+1),b>=c&&(a=c));return m.floor(m.round((b-a)/864E5)/7)+1}function u(a){a=new g(n(a,0,4));a.setUTCDate(a.getUTCDate()-(a.getUTCDay()+6)%7);return a}function I(a,c,b,d){var h=k(j,a,d),e=k(D,a,d),b=u(b===p?h(0):b);d||(b=s(b));a.setTime(+b);e(2,[h(2)+(c-1)*7])}function J(a,c,b,d,e){var r=f.locales,g=r[f.defaultLocale]||{},i=k(j,a,e),b=(typeof b=="string"?r[b]:b)||{};return x(a,c,function(a){if(d)for(var b=(a==7?2:a)-1;b>=0;b--)d.push(i(b));
return i(a)},function(a){return b[a]||g[a]},e)}function x(a,c,b,d,e){for(var f,g,i="";f=c.match(M);){i+=c.substr(0,f.index);if(f[1]){g=i;for(var i=a,j=f[1],l=b,m=d,n=e,k=j.length,o=void 0,q="";k>0;)o=N(i,j.substr(0,k),l,m,n),o!==p?(q+=o,j=j.substr(k),k=j.length):k--;i=g+(q+j)}else f[3]?(g=x(a,f[4],b,d,e),parseInt(g.replace(/\D/g,""),10)&&(i+=g)):i+=f[7]||"'";c=c.substr(f.index+f[0].length)}return i+c}function N(a,c,b,d,e){var g=f.formatters[c];if(typeof g=="string")return x(a,g,b,d,e);else if(typeof g==
"function")return g(a,e||!1,d);switch(c){case "fff":return i(b(6),3);case "s":return b(5);case "ss":return i(b(5));case "m":return b(4);case "mm":return i(b(4));case "h":return b(3)%12||12;case "hh":return i(b(3)%12||12);case "H":return b(3);case "HH":return i(b(3));case "d":return b(2);case "dd":return i(b(2));case "ddd":return d("dayNamesShort")[b(7)]||"";case "dddd":return d("dayNames")[b(7)]||"";case "M":return b(1)+1;case "MM":return i(b(1)+1);case "MMM":return d("monthNamesShort")[b(1)]||"";
case "MMMM":return d("monthNames")[b(1)]||"";case "yy":return(b(0)+"").substring(2);case "yyyy":return b(0);case "t":return v(b,d).substr(0,1).toLowerCase();case "tt":return v(b,d).toLowerCase();case "T":return v(b,d).substr(0,1);case "TT":return v(b,d);case "z":case "zz":case "zzz":return e?c="Z":(d=a.getTimezoneOffset(),a=d<0?"+":"-",b=m.floor(m.abs(d)/60),d=m.abs(d)%60,e=b,c=="zz"?e=i(b):c=="zzz"&&(e=i(b)+":"+i(d)),c=a+e),c;case "w":return t(b);case "ww":return i(t(b));case "S":return c=b(2),c>
10&&c<20?"th":["st","nd","rd"][c%10-1]||"th"}}function v(a,c){return a(3)<12?c("amDesignator"):c("pmDesignator")}function y(a){return!isNaN(+a[0])}function j(a,c,b){return a["get"+(c?"UTC":"")+o[b]]()}function D(a,c,b,d){a["set"+(c?"UTC":"")+o[b]].apply(a,d)}function s(a){return new g(a.getUTCFullYear(),a.getUTCMonth(),a.getUTCDate(),a.getUTCHours(),a.getUTCMinutes(),a.getUTCSeconds(),a.getUTCMilliseconds())}function E(a,c){return 32-(new g(n(a,c,32))).getUTCDate()}function z(a){return function(){return a.apply(p,
[this].concat(q(arguments)))}}function k(a){var c=q(arguments,1);return function(){return a.apply(p,c.concat(q(arguments)))}}function q(a,c,b){return A.prototype.slice.call(a,c||0,b===p?a.length:b)}function K(a,c){for(var b=0;b<a.length;b++)c(a[b],b)}function i(a,c){c=c||2;for(a+="";a.length<c;)a="0"+a;return a}var o="FullYear,Month,Date,Hours,Minutes,Seconds,Milliseconds,Day,Year".split(","),L=["Years","Months","Days"],G=[12,31,24,60,60,1E3,1],M=/(([a-zA-Z])\2*)|(\((('.*?'|\(.*?\)|.)*?)\))|('(.*?)')/,
n=g.UTC,w=g.prototype.toUTCString,e=f.prototype;e.length=1;e.splice=A.prototype.splice;e.getUTCMode=z(l);e.setUTCMode=z(B);e.getTimezoneOffset=function(){return l(this)?0:this[0].getTimezoneOffset()};K(o,function(a,c){e["get"+a]=function(){return j(this[0],l(this),c)};c!=8&&(e["getUTC"+a]=function(){return j(this[0],!0,c)});c!=7&&(e["set"+a]=function(a){C(this,c,a,arguments,l(this));return this},c!=8&&(e["setUTC"+a]=function(a){C(this,c,a,arguments,!0);return this},e["add"+(L[c]||a)]=function(a,d){F(this,
c,a,d);return this},e["diff"+(L[c]||a)]=function(a){return H(this,a,c)}))});e.getWeek=function(){return t(k(j,this,!1))};e.getUTCWeek=function(){return t(k(j,this,!0))};e.setWeek=function(a,c){I(this,a,c,!1);return this};e.setUTCWeek=function(a,c){I(this,a,c,!0);return this};e.addWeeks=function(a){return this.addDays(Number(a)*7)};e.diffWeeks=function(a){return H(this,a,2)/7};f.parsers=[function(a,c,b){if(a=a.match(/^(\d{4})(-(\d{2})(-(\d{2})([T ](\d{2}):(\d{2})(:(\d{2})(\.(\d+))?)?(Z|(([-+])(\d{2})(:?(\d{2}))?))?)?)?)?$/)){var d=
new g(n(a[1],a[3]?a[3]-1:0,a[5]||1,a[7]||0,a[8]||0,a[10]||0,a[12]?Number("0."+a[12])*1E3:0));a[13]?a[14]&&d.setUTCMinutes(d.getUTCMinutes()+(a[15]=="-"?1:-1)*(Number(a[16])*60+(a[18]?Number(a[18]):0))):c||(d=s(d));return b.setTime(+d)}}];f.parse=function(a){return+f(""+a)};e.toString=function(a,c,b){return a===p||!y(this)?this[0].toString():J(this,a,c,b,l(this))};e.toUTCString=e.toGMTString=function(a,c,b){return a===p||!y(this)?this[0].toUTCString():J(this,a,c,b,!0)};e.toISOString=function(){return this.toUTCString("yyyy-MM-dd'T'HH:mm:ss(.fff)zzz")};
f.defaultLocale="";f.locales={"":{monthNames:"January,February,March,April,May,June,July,August,September,October,November,December".split(","),monthNamesShort:"Jan,Feb,Mar,Apr,May,Jun,Jul,Aug,Sep,Oct,Nov,Dec".split(","),dayNames:"Sunday,Monday,Tuesday,Wednesday,Thursday,Friday,Saturday".split(","),dayNamesShort:"Sun,Mon,Tue,Wed,Thu,Fri,Sat".split(","),amDesignator:"AM",pmDesignator:"PM"}};f.formatters={i:"yyyy-MM-dd'T'HH:mm:ss(.fff)",u:"yyyy-MM-dd'T'HH:mm:ss(.fff)zzz"};K("getTime,valueOf,toDateString,toTimeString,toLocaleString,toLocaleDateString,toLocaleTimeString,toJSON".split(","),
function(a){e[a]=function(){return this[0][a]()}});e.setTime=function(a){this[0].setTime(a);return this};e.valid=z(y);e.clone=function(){return new f(this)};e.clearTime=function(){return this.setHours(0,0,0,0)};e.toDate=function(){return new g(+this[0])};f.now=function(){return+new g};f.today=function(){return(new f).clearTime()};f.UTC=n;f.getDaysInMonth=E;if(typeof module!=="undefined"&&module.exports)module.exports=f;return f}(Date,Math,Array);


XDate.locales['fr'] = {
  monthNames: ['Janvier','Février','Mars','Avril','Mai','Juin','Juillet','Août','Septembre','Octobre','Novembre','Décembre'],
  monthNamesShort: ["Janv","Févr","Mars","Avr","Mai","Juin","Juil","Août","Sept","Oct","Nov","Déc"],
  dayNames: ['Dimanche','Lundi','Mardi','Mercredi','Jeudi','Vendredi','Samedi'],
  dayNamesShort: ['Dim.','Lun.','Mar.','Mer.','Jeu.','Ven.','Sam.'],
  dateFormat: "dddd, d MMMM yyyy",
  dateFormatMonth: "MMMM yyyy",
  dateFormatYear: "yyyy",
  ok: "Accepter",
  cancel: "Annuler"
};
XDate.locales['de'] = {
  monthNames: ["Januar","Februar","März","April","Mai","Juni","Juli","August","September","Oktober","November","Dezember"],
  monthNamesShort: ["Jan","Feb","Mär","Apr","Mai","Jun","Jul","Aug","Sep","Okt","Nov","Dez"],
  dayNames: ["Sonntag","Montag","Dienstag","Mittwoch","Donnerstag","Freitag","Samstag"],
  dayNamesShort: ["So","Mo","Di","Mi","Do","Fr","Sa"],
  dateFormat: "dddd, d.MMMM yyyy",
  dateFormatMonth: "MMMM yyyy",
  dateFormatYear: "yyyy",
  ok: "\u00dcbernehmen",
  cancel: "Abbrechen"
};
XDate.locales['en'] = {
  monthNames: ["January","February","March","April","May","June","July","August","September","October","November","December"],
  monthNamesShort: ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],
  dayNames: ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],
  dayNamesShort: ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],
  dateFormat: "dddd, MMMM d, yyyy",
  dateFormatMonth: "MMMM yyyy",
  dateFormatYear: "yyyy",
  ok: "Accept",
  cancel: "Cancel"
};
XDate.locales['he'] = {
  monthNames: ["ינואר","פברואר","מרץ","אפריל","מאי","יוני","יולי","אוגוסט","ספטמבר","אוקטובר","נובמבר","דצמבר"],
  monthNamesShort: ["ינואר","פבר","מרץ","אפר","מאי","יוני","יולי","אוג","ספט","אוק","נוב","דצ"],
  dayNames: ["ראשון","שני","שלישי","רביעי","חמישי","שישי","שבת"],
  dayNamesShort: ["א","ב","ג","ד","ה","ו","שבת"],
  dateFormat: "dddd, MMMM d, yyyy",
  dateFormatMonth: "MMMM yyyy",
  dateFormatYear: "yyyy",
  ok: "אישור",
  cancel: "ביטול"
};
XDate.locales['it'] = {
  monthNames: ["Gennaio","Febbraio","Marzo","Aprile","Maggio","Giugno","Luglio","Agosto","Settembre","Ottobre","Novembre","Dicembre"],
  monthNamesShort: ["Gen","Feb","Mar","Apr","Mag","Giu","Lug","Ago","Set","Ott","Nov","Dic"],
  dayNames: ["Domenica","Lunedì","Martedì","Mercoledì","Giovedì","Venerdì","Sabato"],
  dayNamesShort: ["Dom","Lun","Mar","Mer","Gio","Ven","Sab"],
  dateFormat: "dddd, d MMMM yyyy",
  dateFormatMonth: "MMMM yyyy",
  dateFormatYear: "yyyy",
  ok: "Assumi",
  cancel: "Annulla"
};
XDate.locales['es'] = {
  monthNames: ["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"],
  monthNamesShort: ["Ene","Feb","Mar","Abr","May","Jun","Jul","Ago","Sep","Oct","Nov","Dic"],
  dayNames: ["Domingo","Lunes","Martes","Miércoles","Jueves","Viernes","Sábado"],
  dayNamesShort: ["Dom","Lun","Mar","Mié","Jue","Vie","Sáb"],
  dateFormat: "dddd, d 'de' MMMM 'de' yyyy",
  dateFormatMonth: "MMMM 'de' yyyy",
  dateFormatYear: "yyyy",
  ok: "Aplicar",
  cancel: "Cancelar"
};
XDate.locales['nl'] = {
  monthNames: ["Januari","Februari","Maart","April","Mei","Juni","Juli","Augustus","September","Oktober","November","December"],
  monthNamesShort: ["Jan","Feb","Mrt","Apr","Mei","Jun","Jul","Aug","Sep","Okt","Nov","Dec"],
  dayNames: ["Zondag","Maandag","Dinsdag","Woensdag","Donderdag","Vrijdag","Zaterdag"],
  dayNamesShort: ["Zo","Ma","Di","Wo","Do","Vr","Za"],
  dateFormat: "dddd, d MMMM yyyy",
  dateFormatMonth: "MMMM yyyy",
  dateFormatYear: "yyyy",
  ok: "Overnemen",
  cancel: "Annuleren"
};
XDate.locales['sv'] = {
  monthNames: ["Januari","Februari","Mars","April","Maj","Juni","Juli","Augusti","September","Oktober","November","December"],
  monthNamesShort: ["Jan","Feb","Mar","Apr","Maj","Jun","Jul","Aug","Sep","Okt","Nov","Dec"],
  dayNames: ["Söndag","Måndag","Tisdag","Onsdag","Torsdag","Fredag","Lördag"],
  dayNamesShort: ["Sö","Må","Ti","On","To","Fr","Lö"],
  dateFormat: "dddd, d MMMM yyyy",
  dateFormatMonth: "MMMM yyyy",
  dateFormatYear: "yyyy",
  ok: "Klar",
  cancel: "Avbryt"
};
XDate.locales['pt-br'] = {
  monthNames: ["Janeiro","Fevereiro","Março","Abril","Maio","Junho","Julho","Agosto","Setembro","Outubro","Novembro","Dezembro"],
  monthNamesShort: ["Jan","Fev","Mar","Abr","Mai","Jun","Jul","Ago","Set","Out","Nov","Dez"],
  dayNames: ["Domingo","Segunda-feira","Terça-feira","Quarta-feira","Quinta-feira","Sexta-feira","Sábado"],
  dayNamesShort: ["Dom","Seg","Ter","Qua","Qui","Sex","Sáb"],
  dateFormat: "dddd, d - MMMM - yyyy",
  dateFormatMonth: "MMMM yyyy",
  dateFormatYear: "yyyy",
  ok: "Ok",
  cancel: "Cancelar"
};


/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
describe('app', function() {
    describe('initialize', function() {
        it('should bind deviceready', function() {
            runs(function() {
                spyOn(app, 'onDeviceReady');
                app.initialize();
                helper.trigger(window.document, 'deviceready');
            });

            waitsFor(function() {
                return (app.onDeviceReady.calls.length > 0);
            }, 'onDeviceReady should be called once', 500);

            runs(function() {
                expect(app.onDeviceReady).toHaveBeenCalled();
            });
        });
    });

    describe('onDeviceReady', function() {
        it('should report that it fired', function() {
            spyOn(app, 'receivedEvent');
            app.onDeviceReady();
            expect(app.receivedEvent).toHaveBeenCalledWith('deviceready');
        });
    });

    describe('receivedEvent', function() {
        beforeEach(function() {
            var el = document.getElementById('stage');
            el.innerHTML = ['<div id="deviceready">',
                            '    <p class="event listening">Listening</p>',
                            '    <p class="event received">Received</p>',
                            '</div>'].join('\n');
        });

        it('should hide the listening element', function() {
            app.receivedEvent('deviceready');
            var displayStyle = helper.getComputedStyle('#deviceready .listening', 'display');
            expect(displayStyle).toEqual('none');
        });

        it('should show the received element', function() {
            app.receivedEvent('deviceready');
            var displayStyle = helper.getComputedStyle('#deviceready .received', 'display');
            expect(displayStyle).toEqual('block');
        });
    });
});


(function($) {
	
	preguntarUnregister = function (){
        navigator.notification.confirm(
            'Realmente desea cancelar su suscripci\u00f3n',  // message
            handleUnregister,              // callback to invoke with index of button pressed
            'Santa Fe',            // title
            'Confirmar,Cancelar'          // buttonLabels
        );
    }
	
	function handleUnregister(button){
	//	alert('You selected button ' + button);
		if(button==1){
			unregister();
		}
	}
	
	unregister = function(){
	
		var device={
	    		platform: "android",
	    		model : "name",
	    		version: "Android 2.2"} 
			    
		var osversion = device.platform;
		var brand     = device.version;
		var device    = device.model;
		var version   = "1.0.0";
	  
		var state;
		var mail;
		var id;
		var user = window.localStorage.getItem('User');
		if(user!=null){
			state = JSON.parse(user).state;
			mail  = JSON.parse(user).mail;
			id    = JSON.parse(user).id;  
		}  
			
		url = "http://www.mobilemediapush.com/Registro_Portalesv4/modules/Register/registration.php";
		url = url + "?c="+encodeURIComponent(mail)+"&id="+id+"&status=false&country="+encodeURIComponent(state);
	 

        $.get(url,function(res){
        	$.mobile.loading('hide');
			if(!isNaN(parseFloat(res)) && isFinite(res)){
				
		  	    var user = window.localStorage.getItem('User');
		  	    
				var mail     = JSON.parse(user).mail;
				var telefono = JSON.parse(user).phone;
				var pais     = JSON.parse(user).state;
				var departamento = JSON.parse(user).department;
				var genero   = JSON.parse(user).gender;
				var max      = JSON.parse(user).maxdaily;
				var id       = JSON.parse(user).id; 
				var categoria = JSON.parse(user).categorias; 
				var fecha    = JSON.parse(user).birth;
				
				window.localStorage.setItem('User', JSON.stringify({
	              	mail: mail,
	              	phone: telefono,
	              	state:pais,
	              	department:departamento,
	              	status:"false",
	              	gender:genero,
	              	maxdaily:max,
	              	id:id,
	              	categorias:categoria,
	              	birth:fecha
              	}));
        		$.mobile.loading('hide');
        		$("#alertsBotton").find('a').attr('href','#suscipcionAlertasPage');
        		mensaje("Ya no se encuentra suscrito al sistema de alertas.");
          		$.mobile.changePage("#home");
			}else{
				mensaje("Error al tratar de establecer la conexi\xf3n.");
			}
		}).error(function(){ 
			 $.mobile.loading('hide');
             mensaje("Error en la conexi\xf3n, por favor intente mas tarde!");    
		});
		
	}


	function mensaje(msj){
	    navigator.notification.alert(msj,function(){}, "Santa Fe");        
	}

})(jQuery);


/**
 * http://www.bennadel.com/blog/2105-Exploring-HTML5-s-localStorage-Persistent-Client-Side-Key-Value-Pairs.htm
 */


// The localStorage option has some limitations both in the
// way that it treats values and in the way that it checks
// for existence. As such, this Cache object will provide
// a better proxy.
function Cache( nativeStorage, serializer ){
 
	// Store the native storage reference as the object that
	// we are going to proxy. This object must uphold the
	// HTML5 Storage interface.
	this.storage = nativeStorage;
	 
	// Store the serialization behavior. This object must
	// uphold the JSON interface for serialization and
	// deserialization.
	this.serializer = serializer;
}
 
 
// Set up the class methods.
Cache.prototype = {
 
	// I clear the cache.
	clear: function(){
		// Clear the storage container.
		this.storage.clear();
		 
		// Return this object reference for method chaining.
		return( this );
	},

	// I get an item from the cache. If the item cannot be
	// found, I can pass back an optional default value.
	getItem: function( key, defaultValue ){
		// Get the cached item.
		var value = this.storage.getItem( key );
 
		// Check to see if it exists. If it does, then we
		// need to deserialize it.
		if (value == null){
		 
			// No cached item could be found. Now, we either
			// have to return the default value, or we have
			// to return Null. We have to be careful here,
			// though, because the default value might be a
			// falsy.
			return(
			(typeof( defaultValue ) != "undefined") ?
			defaultValue :
			null
			);
		 
		} else {
		 
			// The value was found; return it in its
			// original form.
			return(
					this.serializer.parse( value )
			);
		 
		}
	},
	
	// I check to see if the given key exists in the storage
	// container.
	hasItem: function( key ){
		// Simply check to see if the key access results in a
		// null value.
		return(
			this.storage.getItem( key ) != null
		);
	},
 
	// I remove the given item from the cache.
	removeItem: function( key ){
		// Remove the key from the storage container.
		this.storage.removeItem( key );
		 
		// Return this object reference for method chaining.
		return( this );
	},
	
	// I store the item in the cache. When doing this, I
	// automatically serialize the value.
	//
	// NOTE: Not all value (ex. functions and private
	// variables) will serialize.
	setItem: function( key, value ){
		// Store the serialize value.
		this.storage.setItem(
		key,
		this.serializer.stringify( value )
		);		 
		// Return this object reference for method chaining.
		return( this );
	}
 
};
 
 
// -------------------------------------------------- //
// -------------------------------------------------- //
// -------------------------------------------------- //
// -------------------------------------------------- //
 
 
// Now, let's create an instance of our new cache. When doing
// this, we're going to use localStorage as our storage
// container and the native JSON object as our serializer.
//var cache = new Cache( localStorage, JSON );
 
 


// Check to see if a value exists.
//console.log(
//"cache.hasItem( 'girl' ) ---",
//cache.hasItem( "girl" )
//);
 
// Create a value to store.
//var girl = {
//name: "Tricia",
//sexy: "Hella"
//};
 
// Set the value.
//console.log(
//"cache.setItem( 'girl', girl ) ---",
//cache.setItem( "girl", girl )
//);
 
// Check to see if a value exists again
//console.log(
//"cache.hasItem( 'girl' ) ---",
//cache.hasItem( "girl" )
//);
 
// Get the cached value and chekc its name.
//console.log(
//"cache.getItem( 'girl' ).name ---",
//cache.getItem( "girl" ).name
//);
 
 
// -------------------------------------------------- //
// -------------------------------------------------- //
 
 
// Clear out any local storage items that have
// been populated from our experimenting.
//cache.clear();

var cache = new Cache( window.localStorage, JSON );

//function cancelar_registro(selection){if("Yes"== selection.return){mobmedianet.push.unregister();}}
function recordarSuscripcion(){ $("#alertsBotton").find("a").attr("href","#suscipcionAlertasPage");if(cache.getItem("recordar_suscripcion")==10){cache.setItem("recordar_suscripcion", 1);$.mobile.changePage("#suscipcionAlertasPage");}else{var incrementar = cache.getItem("recordar_suscripcion")+1; cache.setItem("recordar_suscripcion", incrementar);$.mobile.changePage("#home");}}


function optionCheck()
{
	if( document.getElementById('pais').selectedIndex == 5){$("#divDepart").show();$("#lDepart").show();}else{$("#divDepart").hide();$("#lDepart").hide();}
}



// FUNCIONES EN ANDROID 
function loadURL(url){
	window.open(url,'_blank', 'location=yes');
	 
	//navigator.app.loadUrl(url, { openExternal:true });return false;
	} 
document.addEventListener('deviceready', function() {	
	 document.addEventListener("backbutton", function(){
	        if($.mobile.activePage.is('#home')){
	            navigator.app.exitApp();
	        }
	        else {
	            navigator.app.backHistory();
	        }
	    }, false);
}, false);


function doPageLoad(){

//	 alert(cache.getItem("recordar_suscripcion"));
	$( document ).on( "pagecreate", "#suscipcionAlertasPage", function() {
	    var picker = $( "input[type='text']", this );
	    picker.mobipick({
	        locale: "es", //default is "en", english
	        	maxDate: (new XDate())
	    });
	    picker.on( "change", function() {
		    // formatted date, like yyyy-mm-dd              
		    var date = $( this ).val();
		 
		    // JavaScript Date object
		    var dateObject = $( this ).mobipick( "option", "date" );
		});
	    
	});
	
	$('.link').live('tap', function() {
		url = $(this).attr("rel");loadURL(url);
	});	 
	

	initPushList();
	
		 
	//VERIFICANDO USUARIO REGISTRADO
	var user = window.localStorage.getItem('User');
	status = "false";
	
	if(recibirPush()){
		if(user!=null){
			status = JSON.parse(user).status;
	//		alert("Status "+status);
			if(status==="true"){
				$("#alertsBotton").find("a").attr("href","#alerts");
				$.mobile.changePage("#home");
			}else{
				
				recordarSuscripcion();
			}
		
		}else
		{
			if(cache.hasItem("recordar_suscripcion")){
				recordarSuscripcion();
			}else{
				//Inicializar los valores
				$("#alertsBotton").find("a").attr("href","#suscipcionAlertasPage");
				cache.setItem("recordar_suscripcion", 1);
				$.mobile.changePage("#suscipcionAlertasPage");	
			}
	
		}
	}
	$(document).delegate('.ui-page', 'pageshow', function () { recargarPublicidad($(this).attr('id')); });
	recargarPublicidad("home");
	
	//BOTON REGISTRO
	$("#btSuscripcion").click(function(){
		//mobmedianet.push.constructor.prototype.register();
		registrar();
		});
	//BOTON CANCELAR EL REGISTRO
	$("#btcancelarSuscripcion").click(function(){
	//	"&iquest;Realmente desea cancelar su suscripci&oacute;n?"
		preguntarUnregister();
	
	});

	
	
}
	

	
document.addEventListener('deviceready',doPageLoad, false);

// Flurry Phonegap Plugin by JFP 12/2012

(function(cordova) {

  function Flurry() {};

  // These functions must be called before you start the Flurry session

  Flurry.prototype.setAppVersion = function(version,successCallback,failureCallback) {
    return cordova.exec(successCallback, failureCallback, 'Flurry', 'setAppVersion', [version]);
  };

  // argument must be Yes or No, because it's objective C
  Flurry.prototype.setShowErrorInLogEnabled = function(enableValue, successCallback, failureCallback) {
    return cordova.exec( successCallback, failureCallback, 'Flurry', 'setShowErrorInLogEnabled', [enableValue]);
  };

  // argument must be Yes or No, because it's objective C
  Flurry.prototype.setEventLoggingEnabled = function(enableValue, successCallback, failureCallback) {
    return cordova.exec( successCallback, failureCallback, 'Flurry', 'setEventLoggingEnabled', [enableValue]);
  };

  // argument must be Yes or No, because it's objective C
  Flurry.prototype.setDebugLogEnabled = function(enableValue, successCallback, failureCallback) {
    return cordova.exec( successCallback, failureCallback, 'Flurry', 'setDebugLogEnabled', [enableValue]);
  };

  // argument must be Yes or No, because it's objective C
  Flurry.prototype.setSecureTransportEnabled = function(enableValue, successCallback, failureCallback) {
    return cordova.exec( successCallback, failureCallback, 'Flurry', 'setSecureTransportEnabled', [enableValue]);
  };

  // seconds must be an integer
  Flurry.prototype.setSessionContinueSeconds = function(seconds, successCallback, failureCallback) {
    return cordova.exec( successCallback, failureCallback, 'Flurry', 'setSessionContinueSeconds', [seconds]);
  };

  // argument must be Yes or No, because it's objective C
  Flurry.prototype.setCrashReportingEnabled = function(enableValue, successCallback, failureCallback) {
    return cordova.exec( successCallback, failureCallback, 'Flurry', 'setCrashReportingEnabled', [enableValue]);
  };

  // End of functions that must be called before Flurry session starts

  // key is a string
  Flurry.prototype.startSession = function(key,successCallback,failureCallback) {
    return cordova.exec(successCallback, failureCallback, 'Flurry', 'startSession', [key]);
  };

  // event must be a string
  Flurry.prototype.logEvent = function(event, successCallback, failureCallback) {
    return cordova.exec( successCallback, failureCallback, 'Flurry', 'logEvent', [event]);
  };

  // parameters must be a JSON dictionary that contains only strings like {id:"4", price: "471", location: "New York"}
  Flurry.prototype.logEventWithParameters = function(event, parameters, successCallback, failureCallback) {
    return cordova.exec( successCallback, failureCallback, 'Flurry', 'logEventWithParameters', [event, parameters]);
  };

  Flurry.prototype.logPageView = function(successCallback, failureCallback) {
    return cordova.exec( successCallback, failureCallback, 'Flurry', 'logPageView', []);
  };

  // timed must be Yes or No, because it's objective C
  Flurry.prototype.logTimedEvent = function(event, timed, successCallback, failureCallback) {
    return cordova.exec( successCallback, failureCallback, 'Flurry', 'logTimedEvent', [event, timed]);
  };

  // parameters must be a JSON dictionary that contains only strings like {id:"4", price: "471", location: "New York"}
  // timed must be Yes or No, because it's objective C
  Flurry.prototype.logTimedEventWithParameters = function(event, parameters, timed, successCallback, failureCallback) {
    return cordova.exec( successCallback, failureCallback, 'Flurry', 'logTimedEventWithParameters', [event, parameters, timed]);
  };

  Flurry.prototype.endTimedEvent = function(event, successCallback, failureCallback) {
    return cordova.exec( successCallback, failureCallback, 'Flurry', 'endTimedEvent', [event]);
  };

  // parameters must be a JSON dictionary that contains only strings like {id:"4", price: "471", location: "New York"}
  // only used if you want to override the original parameters
  Flurry.prototype.endTimedEventWithParameters = function(event, parameters, successCallback, failureCallback) {
    return cordova.exec( successCallback, failureCallback, 'Flurry', 'endTimedEventWithParameters', [event, parameters]);
  };

  // userID must be a string
  Flurry.prototype.setUserID = function(userID, successCallback, failureCallback) {
    return cordova.exec( successCallback, failureCallback, 'Flurry', 'setUserID', [userID]);
  };

  // gender must be a string. male and female are acceptable values
  Flurry.prototype.setGender = function(gender, successCallback, failureCallback) {
    return cordova.exec( successCallback, failureCallback, 'Flurry', 'setGender', [gender]);
  };

  // age must be an integer
  Flurry.prototype.setAge = function(age, successCallback, failureCallback) {
    return cordova.exec( successCallback, failureCallback, 'Flurry', 'setAge', [age]);
  };

  // latitude and longitude must be doubles; horizontal and vertical accuracy must be float
  Flurry.prototype.setLatitude = function(latitude, longitude, horizontalAccuracy, verticalAccuracy, successCallback, failureCallback) {
    return cordova.exec( successCallback, failureCallback, 'Flurry', 'setLatitude', [latitude,longitude,horizontalAccuracy,verticalAccuracy]);
  };

  // argument must be Yes or No, because it's objective C
  Flurry.prototype.setSessionReportsOnCloseEnabled = function (enabled, successCallback, failureCallback) {
    return cordova.exec(successCallback, failureCallback, 'Flurry', 'setSessionReportsOnCloseEnabled', [enabled]);
  };

  // argument must be Yes or No, because it's objective C
  Flurry.prototype.setSessionReportsOnPauseEnabled = function (enabled, successCallback, failureCallback) {
    return cordova.exec(successCallback, failureCallback, 'Flurry', 'setSessionReportsOnPauseEnabled', [enabled]);
  };

  Flurry.prototype.logError = function(errorID, message, successCallback, failureCallback) {
    return cordova.exec( successCallback, failureCallback, 'Flurry', 'logError', [errorID, message]);
  };

  Flurry.install = function() {
    if (!window.plugins) {
      window.plugins = {};
    }
    window.plugins.flurry = new Flurry();
  };

  cordova.addConstructor(Flurry.install);

})(window.cordova || window.Cordova || window.PhoneGap);

gApp = new Array();

gApp.deviceready = false;
gApp.gcmregid = '';

window.onbeforeunload  =  function(e) {

    if ( gApp.gcmregid.length > 0 )
    {
      // The same routines are called for success/fail on the unregister. You can make them unique if you like
      window.GCM.unregister( GCM_Success, GCM_Fail );      // close the GCM

    }
};


document.addEventListener('deviceready', function() {
  // This is the Cordova deviceready event. Once this is called Cordova is available to be used
  $("#app-status-ul").append('<li>deviceready event received</li>' );

  $("#app-status-ul").append('<li>calling GCMRegistrar.register, register our Sender ID with Google</li>' );


  gApp.DeviceReady = true;

  // Some Unique stuff here,
  // The first Parm is your Google email address that you were authorized to use GCM with
  // the Event Processing rountine (2nd parm) we pass in the String name
  // not a pointer to the routine, under the covers a JavaScript call is made so the name is used
  // to generate the function name to call. I didn't know how to call a JavaScript routine from Java
  // The last two parms are used by Cordova, they are the callback routines if the call is successful or fails
  //
  // CHANGE: your_app_id
  // TO: what ever your GCM authorized senderId is
  //
  window.plugins.GCM.register("55664536675", "GCM_Event", GCM_Success, GCM_Fail );

}, false );


function
GCM_Event(e)
{

  $("#app-status-ul").append('<li>EVENT -> RECEIVED:' + e.event + '</li>');


  switch( e.event )
  {
  case 'registered':
    // the definition of the e variable is json return defined in GCMReceiver.java
    // In my case on registered I have EVENT and REGID defined
    gApp.gcmregid = e.regid;
    if ( gApp.gcmregid.length > 0 )
    {
      $("#app-status-ul").append('<li>REGISTERED -> REGID:' + e.regid + "</li>");

		window.localStorage.setItem("reg", e.regid);
		//alert("reg "+e.regid);
      // ==============================================================================
      // ==============================================================================
      // ==============================================================================
      //
      // This is where you would code to send the REGID to your server for this device
      //
      // ==============================================================================
      // ==============================================================================
      // ==============================================================================

    }

    break

  case 'message':
    // the definition of the e variable is json return defined in GCMIntentService.java
    // In my case on registered I have EVENT, MSG and MSGCNT defined

    // You will NOT receive any messages unless you build a HOST server application to send
    // Messages to you, This is just here to show you how it might work

    $("#app-status-ul").append('<li>MESSAGE -> MSG: ' + e.message + '</li>');

    $("#app-status-ul").append('<li>MESSAGE -> MSGCNT: ' + e.msgcnt + '</li>');


    break;


  case 'error':

    $("#app-status-ul").append('<li>ERROR -> MSG:' + e.msg + '</li>');

    break;



  default:
    $("#app-status-ul").append('<li>EVENT -> Unknown, an event was received and we do not know what it is</li>');

    break;
  }
}

function
GCM_Success(e)
{
  $("#app-status-ul").append('<li>GCM_Success -> We have successfully registered and called the GCM plugin, waiting for GCM_Event:registered -> REGID back from Google</li>');

}

function
GCM_Fail(e)
{
  $("#app-status-ul").append('<li>GCM_Fail -> GCM plugin failed to register</li>');

  $("#app-status-ul").append('<li>GCM_Fail -> ' + e.msg + '</li>');

}



(function($) {
	
	
validarFormulario =	function ()
	{
		var email = $("#email").val(),  
		 celular  = $("#celular").val(),  
		 genero   = $("input[name='genero']:checked").val(); 
		
		//Validar correo
		if(email===""){
			
			mensaje("Debe especificar un email.");
			return false;
		}
		emailfilter =  /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
		if (!emailfilter.test(email))
		{
			
			mensaje("El email es incorrecto.");
			return false;
		}
		
		//Validar celular
		if(isNaN(celular)||celular===""){
			
			mensaje("Debe especificar un numero celular.");
			return false;
		}
		var lencelular = celular.length;
		if(!(lencelular >= 10 && lencelular <= 14)){
	    	
			mensaje("Por favor, coloque un numero de celular v"+'\u00e1'+"lido de 10 digitos. ");
	        return false;
	    }
		
	    //Validando pais 	  
	    if(document.getElementById('pais').selectedIndex==0){
	    	$.mobile.loading('hide');
	    	mensaje("Debe indicar un pais");
	        return false;
	    } 
	    //Validando departamento en caso de que el pais sea Colombia
	    if(document.getElementById('pais').selectedIndex==5 
	    	&& document.getElementById('departamento').selectedIndex==0){
	    	$.mobile.loading('hide');
	    	mensaje("Debe indicar un departamento");
	    	return false;
	    }
	    
	    //Validando maximo de pin news diarios
	    if(document.getElementById("max").selectedIndex==0){
	    	$.mobile.loading('hide');
	    	mensaje("Debe elegir un m\u00e1ximo de alertas diarias");
	    	return false;    	
	    }
	    var reg = window.localStorage.getItem("reg");
	    if(reg==null){
	    	$.mobile.loading('hide');
	    	mensaje("No se pudo registrar el servicio de push con Google, por favor intente mas tarde.");
	    	return false;    	
	    }
		return true;
	}
	

registrar =	function ()
	{	$.mobile.loading('show');
		if(validarFormulario())
		{
		    var email        = document.getElementById("email").value.trim(); 
		    var telefono     = document.getElementById("celular").value.trim();
		    var fecha        = document.getElementById("fecha").value;
		    try{ fecha = Date.parse(fecha); } catch (e) { alert("No es una fecha correcta");}
		    var pais	     = document.getElementById('pais').value;
		    var departamento = (document.getElementById('pais').selectedIndex==5) ? document.getElementById('departamento').value : "";
		    var genero       = "";
		    var ctrl         = document.getElementsByTagName('genero');
		    for(i=0;i<ctrl.length;i++) if(ctrl[i].checked) genero = ctrl[i].value;
		    var max = document.getElementById("max").value;
		    var num = 0;
		    var categoria ="&z1=Noticias";
	
		    var reg = window.localStorage.getItem("reg");
			var device={
    		platform: "android",
    		model: "name",
    		version: "Android 2.2"} 
		    
		    var osversion = window.device.version;
		    var brand     = window.device.platform;
		    var device    = window.device.model;
		    var version   = "1.0.1";
		    
		    var url = "http://www.mobilemediapush.com/Registro_Portalesv4/modules/Register/registration.php";
		    
		    url = url +"?reg="+reg
		      +"&c="+encodeURIComponent(email)
		      +"&t="+telefono
		      +"&nac="+fecha
		      +"&country="+pais
			  + ((departamento!="")?"&state="+encodeURIComponent(departamento): "")
			  +"&gender="+genero
			  +"&media=SantaFe&source=OTA&maxdaily="+max
			  +"&id=0&status=true"
			  +categoria
			  +"&os="+encodeURIComponent(osversion)
			  +"&device="+encodeURIComponent(device)
			  +"&brand="+encodeURIComponent(brand)
			  +"&version="+version
			  +"&w="+$(window).width()
			  +"&h="+$(window).height();
		  //  alert(url);
		      $.get(url,function(res){
		    	  $.mobile.loading('hide');
					if(!isNaN(parseFloat(res)) && isFinite(res)){
				//		alert(res);
						window.localStorage.setItem('User', JSON.stringify({
		                	mail: email,
		                	phone: telefono,
		                	state:pais,
		                	department:departamento,
		                	status:"true",
		                	gender:genero,
		                	maxdaily:max,
		                	id:res,
		                	birth:fecha}));				    
		          		mensaje("Felicidades, ya esta suscrito a las alertas.");
		          		$("#alertsBotton").find('a').attr('href','#alerts');
		          		$.mobile.loading('hide');
		          		$.mobile.changePage("#home");
					    
					}else{
						mensaje("Error al tratar de establecer la conexi\xf3n.");
					}
	          }).error(function(){
	        	  $.mobile.loading('hide');
	              mensaje("Error en la conexi\xf3n, por favor intente mas tarde!");                  
	          }); 
		}else{ $.mobile.loading('hide');}
	}
	
	function mensaje(msj){
	    navigator.notification.alert(msj,function(){}, "Santa Fe");        
	}

})(jQuery);


﻿(function($) {
  $(document).one("pageinit", epilogue);

  function epilogue() {
    //TEST: alert("jQuery Mobile is ready!");

//	window.plugins.flurry.logEvent('hola', function() {},function() {alert('Share failed')});
 //   FlurryAgent.startSession('RR4WKXV6XQKR6TPBDNFD');
  //  var android_id = Secure.getString(getContext().getContentResolver(),Secure.ANDROID_ID); 
   // alert(android_id);

    var locationHash = window.location.hash,
        $currentPage;

    if (locationHash == "") {
      $currentPage = $.mobile.firstPage;
    }
    else {
      $currentPage = $(locationHash);
    }

    initializePage($currentPage.id());

    $("[data-role='page']").bind("pageinit", function() {
      initializePage($(this).id());
    });
    /*
    $("a[rel='external']").click(function(event) {
        event.preventDefault();

        blackberry.invoke.invoke({
          target: "sys.browser",
          uri: $(this).attr("href")
        }, function() {
          //alert("Invocation successful!");
        }, function(error) {
          //alert("Invocation failed, error: " + error);
        });
      });*/
  }

  function initializePage(pageId) {
    //TEST: alert("Initializing " + pageId + "...");
    
    switch(pageId) {
      case "news":
        loadNews();
      break;

      case "scores":
        initSubsectionBar(pageId);
        showSubsection(pageId);
        loadScores();
      break;

      case "matches":
        loadMatches();
      break;

      case "tickets":
        loadTickets();
      break;

      case "downloads":
        initSubsectionBar(pageId);
        showSubsection(pageId);
        loadDownloads();
      break;

      case "history":
        initSubsectionBar(pageId);
        showSubsection(pageId);
        loadHistory();
      break;

      default:
      break;
    }
  }

  /* News *********************************************************************/

  function loadNews() {
	  $.ajax({
		    type: "GET",
		    url: "http://independientesantafe.co/category/archivo-noticias/feed/",
		    dataType: "xml",
		        success: function(data) {
		        var $table = $("#news table:first"),
		        row    = $table.find("tr:first").detach(),
		        fauxRow;
		        
		        $table.find("tr").remove();
		        //console.log(data);
		        var xml = $(data);
		        var items = xml.find("item");
		        $.each(items,function(i, v) {
		               fauxRow = row.clone();
		               
		               //fauxRow.attr("url", $(this).find("urlFeed").text());
		               fauxRow.attr("titulo",$(v).find("title").text());
		               fauxRow.attr("contenido",$(v).find("encoded").text());
		               fauxRow.attr("fecha",$(v).find("pubDate").text());
		               fauxRow.find("td").text($(v).find("title").text());
		               //console.log($(v).find("encoded"));
		               $table.append(fauxRow);
		               });
		        
		        $table.find("tr").click(function() {
		                                
		                                loadNewsItem($(this).attr("titulo"),$(this).attr("contenido"),$(this).attr("fecha"));
		                                });
		        },
		    error: function(XMLHttpRequest, textStatus, errorThrown) {
		        alert("Error: " + errorThrown);
		    }});

  }

    function loadNewsItem(titulo,contenido,fecha) {
    //TEST: alert("Loading news item...");
          $("#news_item_title").text(titulo);
          $("#news_item_content").html(contenido);
          $("#news_item_date").text(fecha);
          var url = $("#news_item_content a").attr('href');
          $("#news_item_content a").attr('class','link');
          $("#news_item_content a").attr('rel', url);
          $("#news_item_content a").attr('href', '#');
          $.mobile.changePage("#news_item");
    //$.mobile.loading("show");
  }  

  /*function loadNewsItem(url) {
    //TEST: alert("Loading news item...");

    $.mobile.loading("show");

    $.get(
      url,
      function(data) {
        $(data).find("item").each(function() {
          $("#news_item_title").text($(this).find("titulo").text());
          $("#news_item_date").text($(this).find("pubDate").text());

          var content = $(this).find("contenido").text()/*,
              regex   = new RegExp(String.fromCharCode(160), "g")*/;
          
          //content = content.replace(regex, "<br/><br/>").substring(10);
/*
          $("#news_item_content").html(content);

          $("#news_item_image").attr("src", $(this).find("urlimagen").text())
                              ;
          $.mobile.changePage("#news_item");
        });
      } 
    );
  }*/

  /* Scores *******************************************************************/

  function initSubsectionBar(sectionId) {
    var $section = $("#" + sectionId),
        $bar     = $section.find(".subsection_bar");

    $bar.find(".left").click(function() {
      var prevSubsectionId = $section.find(".subsection:visible")
                                     .prev(".subsection").id();

      if (prevSubsectionId == undefined) {
        prevSubsectionId = $section.find(".subsection:last").id();
      }

      showSubsection(sectionId, prevSubsectionId);
    });

    $bar.find(".right").click(function() {
      var nextSubsectionId = $section.find(".subsection:visible")
                                     .next(".subsection").id();
      
      showSubsection(sectionId, nextSubsectionId);
    });
  }

  function showSubsection(sectionId, subsectionId) {
    var $section = $("#" + sectionId);

    if (subsectionId == undefined) {
      subsectionId = $section.find(".subsection:first").id();
    }

    var $subsection = $("#" + subsectionId),
        title       = $subsection.find(".subsection_title").text();

    $section.find(".subsection_bar .title").html(title);
    $section.find(".subsection").hide();
    $subsection.show();
  }

  function loadScores() {
    //TEST: alert("Loading scores...");

    $.get(
      //TEST: 
      //"xml/scores.xml",
      "http://www.digitalsports.com.co/dfdata/colombia/xml/deportes.futbol.colombia.posiciones.xml",
      function(data) {
        var $table   = $("#round_robin table:first"),
            row      = $table.find("tbody tr:first").detach(),
            fauxRow, $team,
            elements = ["nombre", "jugados", "ganados", "empatados", "perdidos", 
                        "puntos"];

        $table.find("tbody tr").remove();

        $(data).find("equipo").each(function() {
          fauxRow = row.clone();
          $team   = $(this);

          if ($team.find("nombre").text() == "Santa Fe") {
            fauxRow.addClass("santafe");
          }

          fauxRow.find("td").each(function(index) {
            $(this).html($team.find(elements[index]).text());
          });

          $table.append(fauxRow);
        });
      }
    );

    $.get(
      //TEST: 
      //"xml/scores.xml",
      "http://www.digitalsports.com.co/dfdata/colombia/deportes.futbol.colombia.posiciones.2.1.xml",
      function(data) {
        var $table   = $("#groupA"),
            row      = $table.find("tbody tr:first").detach(),
            fauxRow, $team,
            elements = ["nombre", "jugados", "difgol", "puntos"];

        $table.find("tbody tr").remove();

        $(data).find("equipo").each(function() {
          fauxRow = row.clone();
          $team   = $(this);

          if ($team.find("nombre").text() == "Santa Fe") {
            fauxRow.addClass("santafe");
          }

          fauxRow.find("td").each(function(index) {
            $(this).html($team.find(elements[index]).text());
          });

          $table.append(fauxRow);
        });
      }
    );

    $.get(
      //TEST: 
      //"xml/scores.xml",
      "http://www.digitalsports.com.co/dfdata/colombia/deportes.futbol.colombia.posiciones.2.2.xml",
      function(data) {
        var $table   = $("#groupB"),
            row      = $table.find("tbody tr:first").detach(),
            fauxRow, $team,
            elements = ["nombre", "jugados", "difgol", "puntos"];

        $table.find("tbody tr").remove();

        $(data).find("equipo").each(function() {
          fauxRow = row.clone();
          $team   = $(this);

          if ($team.find("nombre").text() == "Santa Fe") {
            fauxRow.addClass("santafe");
          }

          fauxRow.find("td").each(function(index) {
            $(this).html($team.find(elements[index]).text());
          });

          $table.append(fauxRow);
        });
      }
    );
  }

  /* Matches ******************************************************************/

  function loadMatches() {
    //TEST: alert("Loading matches...");

    $.get(
      //TEST: 
      //"xml/matches.xml",
      "http://www.digitalsports.com.co/dfdata/colombia/xml/deportes.futbol.colombia.fixture.xml",
      function(data) {
        var $content = $("#matches [data-role='content']"),
            row      = $content.find("table:first tbody tr:first").detach(),
            table    = $content.find("table:first").detach(),
            fauxTable, fauxRow, $date, $match, html,
            elements = ["local", "goleslocal", "visitante", "golesvisitante"];

        $content.find("table").remove();

        var printDate = function(string, longformat) {
          var day = string.substring(6);

          if (longformat != undefined && longformat) {
            var month  = $.int(string.substring(4, 6)) - 1,
                months = ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", 
                          "Sep", "Oct", "Nov", "Dic"],
                year   = string.substring(0, 4);

            return day + " " + months[month] + " " + year;
          }
          else {
            return day;
          }
        };

        $(data).find("fecha").each(function() {
          fauxTable = table.clone();
          $date = $(this);

          fauxTable.find("caption").html(
            printDate($date.attr("fechadesde"), true) + " - " + 
            printDate($date.attr("fechahasta"), true)
          );

          $date.find("partido").each(function() {
            fauxRow = row.clone();
            $match = $(this);

            if ($match.find("local").text() == "Santa Fe" ||
                $match.find("visitante").text() == "Santa Fe") {
              fauxRow.addClass("santafe");
            }

            fauxRow.find("td:first").html(printDate($match.attr("fecha")));

            fauxRow.find("td:not(:first)").each(function(index) {
              html = $match.find(elements[index]).text();

              if (html != "") {
                $(this).html(html);
              }
            });

            fauxTable.find("tbody").append(fauxRow);
          });

          $content.append(fauxTable);
        });
      }
    );
  }

  /* Tickets ******************************************************************/

  function loadTickets() {
    //TEST: alert("Loading tickets...");

    $.get(
      //TEST: 
      //"xml/tickets.xml",
      "http://independientesantafe.co/api/tickets.xml",
      function(data) {
        var $content = $("#tickets [data-role='content']"),
            div      = $content.find(".ticket:first").detach(),
            fauxDiv, $place, html,
            elements = ["dir", "tel", "horario"];

        $content.find(".ticket").remove();

        var printPhones = function(string) {
          if (string != "") {
            var phones = string.split(/\s+/g);

            $.each(phones, function(index, phone) {
              phones[index] = "<a href='tel:" + phone + "'>" + phone + "</a> ";
            });

            return phones.join(" ");
          }
          else {
            return string;
          }
        };

        $(data).find("lugar").each(function() {
          fauxDiv = div.clone();
          $place  = $(this);

          fauxDiv.find("h1").html($place.find("titulo").text());

          fauxDiv.find(".ui-block-b").each(function(index) {
            html = $place.find(elements[index]).text();

            if (elements[index] == "tel") {
              html = printPhones(html);
            }

            if (html != "") {
              $(this).html(html);
            }
            else {
              $(this).prev(".ui-block-a").hide();
              $(this).hide();
            }
          });

          $content.append(fauxDiv);
        });
      }
    );
  }

  /* Downloads ****************************************************************/

  function loadDownloads() {
    //TEST: alert("Loading downloads...");

    $.get(
      //TEST:
      //"xml/downloads.xml",
      "http://independientesantafe.co/api/downloads.xml",
    function(data) {
      var $data  = $(data),
          $items = $data.find("images"),
          $table, row, fauxRow;

      if ($items.length > 0) {
        $table = $("#images table");
        row    = $table.find("tr:first").detach();
        fauxRow;

        $table.find("tr").remove();

        $items.each(function() {
          fauxRow = row.clone();

          fauxRow.attr("src", $(this).find("url").text());
          fauxRow.find("td").text($(this).find("name").text() + " - " + 
            $(this).find("size").text());

          $table.append(fauxRow);
        });

        $table.find("tr").click(function() {
          loadImage($(this).find("td").text(), $(this).attr("src"));
        });
      }

      $items = $data.find("audio");

      if ($items.length > 0) {
        $table = $("#audios table");
        row    = $table.find("tr:first").detach();

        $table.find("tr").remove();

        $items.each(function() {
          fauxRow = row.clone();

          fauxRow.attr("src", $(this).find("url").text());
          fauxRow.find("td").text($(this).find("name").text() + " - " + 
            $(this).find("size").text());

          $table.append(fauxRow);
        });

        $table.find("tr").click(function() {
          loadSound($(this).find("td").text(), $(this).attr("src"));
        });
      }

      $items = $data.find("video");

      if ($items.length > 0) {
        $table = $("#videos table");
        row    = $table.find("tr:first").detach();

        $table.find("tr").remove();

        $items.each(function() {
          fauxRow = row.clone();

          fauxRow.attr("src", $(this).find("url").text());
          fauxRow.find("td").text($(this).find("name").text() + " - " + 
            $(this).find("size").text());

          $table.append(fauxRow);
        });

        $table.find("tr").click(function() {
          loadVideo($(this).find("td").text(), $(this).attr("src"));
        });
      }
    });
  }

  function loadImage(name, src) {
    //TEST: alert("Loading image...");

    $.mobile.loading("show");

    var $content = $("#downloads_image .content");

    $content.find("h1").html(name);

    $content.find("img").attr("src", src)
                        .load(function() {
                          $.mobile.changePage("#downloads_image");
                        });
  }

  function loadSound(name, src) {
    //TEST: alert("Loading sound...");

    $.mobile.loading("show");

    $("#downloads_audio .content h1").html(name);

    $("#audio source").attr("src", src);

    document.getElementById("video").pause();
    document.getElementById("audio").load();
    document.getElementById("audio").play();

    $.mobile.changePage("#downloads_audio");
  }

  function loadVideo(name, src) {
    //TEST: alert("Loading video...");

    $.mobile.loading("show");

    $("#downloads_video .content h1").html(name);

    $("#audio source").attr("src", src);
    
    document.getElementById("audio").pause();
    document.getElementById("video").load();
    document.getElementById("video").play();

    $.mobile.changePage("#downloads_video");
  }

  /* History ******************************************************************/

  function loadHistory() {
    //TEST: alert("Loading history...");

    $.get(
      "http://independientesantafe.co/api/history.xml",
      function(data) {
        var $content = $("#history [data-role='content']"),
            div      = $content.find(".subsection:first").detach(),
            fauxDiv, $page;

        $content.find(".subsection").remove();

        $(data).find("page").each(function() {
          $page = $(this);

          fauxDiv = div.clone();

          fauxDiv.id("history" + $page.attr("id"));

          fauxDiv.find(".subsection_title").html($page.find("title").text());
          fauxDiv.find(".subsection_content").html($page.find("content").text());

          $content.append(fauxDiv);
        });
        
        showSubsection("history");
      }
    );
  }

})(jQuery);

/*function getBanner(bannerid, zoneid) {
  document.getElementById(bannerid).style.background = "none";

  var m3_u;

  if (location.protocol == "https:")
    m3_u = "https://mant.mobmedianet.com/mobileX3/www/delivery/ajs.php";
  else
    m3_u = "http://mant.mobmedianet.com/mobileX3/www/delivery/ajs.php";

  var m3_r = Math.floor(Math.random() * 99999999999);
  
  if (!document.MAX_used)
    document.MAX_used = ",";

  m3_u += "?zoneid=" + zoneid + "&amp;cb=" + m3_r;

  if (document.MAX_used != ",")
    m3_u += "&amp;exclude=" + document.MAX_used;

  if (document.charset)
    m3_u += "&amp;charset=" + document.charset;
  else if (document.characterSet)
    m3_u += "&amp;charset=" + document.characterSet;
  else
    m3_u += "";

  m3_u += "&amp;loc=" + escape(window.location);

  if (document.referrer)
    m3_u += "&amp;referer=" + escape(document.referrer);

  if (document.context)
    m3_u += "&context=" + escape(document.context);

  if (document.mmm_fo)
    m3_u += "&amp;mmm_fo=1";

  console.log(m3_u);

  $.ajax({
    url: m3_u,
    beforeSend: function ( xhr ) {
      xhr.overrideMimeType("text/plain; charset=x-user-defined");
    }
  }).done(function ( data ) {
    eval(data.replace(/document.write\((.*)\);/, "document.getElementById(\"bannerid\").innerHTML = $1;"));
  });
}*/

function recargarPublicidad(idPage){
 
	var zona = 0;
    

    switch (idPage)
    {
	    case "home":
	    	zona=766;
	    	break;
	    case "news":
	    	zona=768;
	    	break;
	    case "news_item":
	    	zona=768;
	    	break;	    	
	    case "scores":
	    	zona=772;
	    	break;
	    case "matches":
	    	zona=770;
	    	break;
	    case "tickets":
	    	zona=760;
	    	break;
	    case "downloads":
	    	zona=762;
	    	break;
	    case "history":
	    	zona=764;
	    	break;
	    case "alerts":
	    	zona=768;
	    	break;
	    case "social":
	    	zona=768;
	    	break;
	    default:
	    	zona=0;
    }
    
	if(zona!=0){
    	var m3_u = (location.protocol=='https:'?'https://mant.mobmedianet.com/mobileX3/www/delivery/ajs.php':'http://mant.mobmedianet.com/mobileX3/www/delivery/ajs.php');
    	var m3_r = Math.floor(Math.random()*99999999999);
    	if (!document.MAX_used) document.MAX_used = ',';
    	m3_u += "?zoneid="+zona+"&amp;cb="+m3_r;
    	if (document.MAX_used != ',') m3_u +="&amp;exclude="+document.MAX_used;
    	m3_u += document.charset ? '&amp;charset='+document.charset : (document.characterSet ? '&amp;charset='+document.characterSet : '');
    	m3_u += "&amp;loc=" + escape(window.location);
    	if (document.referrer) m3_u +="&amp;referer="+escape(document.referrer);
    	if (document.context) m3_u +="&context="+escape(document.context);
    	if (document.mmm_fo) m3_u +="&amp;mmm_fo=1";
    	console.log(m3_u);

    	$.ajax({
    	  url: m3_u,
    	  beforeSend: function ( xhr ) {
    	    xhr.overrideMimeType("text/plain; charset=x-user-defined");
    	  }
    	}).done(function ( data ) {
    			$("#"+idPage).find(".banner").children().remove();
    			eval(data.replace(/document.write\((.*)\);/, '$(\"#'+idPage+'\").find(\".banner\").html($1);'));
    			var banner = $("#"+idPage).find(".banner").find("a");
    			banner.attr('rel',banner.attr("href"));
    			banner.attr("href","#");
    			banner.addClass("link");
    			
    	});
	}
}

﻿(function($) {
  $(document).ready(prologue);
  //$(document).bind("mobileinit", prologue);

  function prologue() {
    //TEST: alert("Document is ready!");
		
    cloneHeaderAndFooter();
  }

  function cloneHeaderAndFooter() {
    var $header  = $(".header"),
        src      = $header.find(".section img").attr("src").split("/"),
        filename = src.splice(src.length - 1, 1)[0].split("."),
        header   = $header.detach(),
        footer   = $(".footer").detach(),
        sectionId, clone;
    
    var sections = {
      "news":      "Noticias",
      "scores":    "Tabla de posiciones",
      "matches":   "Partidos",
      "tickets":   "Boleteria y expendios",
      "downloads": "Descargas",
      "history":   "Historia",
      "alerts":    "Alertas",
      "social":    "Redes sociales",
      "contentPageAlert": "Alerta",
      "suscipcionAlertasPage":"Alerta"
    };

    $("[data-role='page']").each( function() {
      sectionId = $(this).id().split("_")[0];

      if (sectionId != "about") {
        clone = header.clone();

        if (sectionId != "home") {
          filename[0] = sectionId;
          clone.find(".section img").attr("src", src.join("/") + "/" + filename.join("."));
          clone.find(".section h3").html(sections[sectionId]);
        }

        $(this).prepend(clone);
      }

      if (sectionId != "home"&&sectionId != "suscipcionAlertasPage") {
        $(this).append(footer.clone());
      }
    } );
  }
})(jQuery);

/*(function($) {*/

	var pushList;

	initPushList = function(){
		pushList = JSON.parse(window.localStorage.getItem('PushList'));
		if(pushList==null) pushList = new Array();
		
		cargarPush();
		$('.linkalert').live('tap', function() {
			selectedAlert = $(this).data("entryid");
			mostrarAlerta(selectedAlert);
		});
	}

/*	cargarPush = function(){*/
	function cargarPush(){
		var s = "";
		if(pushList.length == 0){
		     s ='<h1 class="center" style="font-weight: bold;margin:25px 25px 0px 25px;">A&uacute;n no dispone de alertas.<br></h1>';         
		}else{
			$.each(pushList,function(i,w){
				s = '<li><a href="#contentPageAlert" class="linkalert" data-entryid="'+w.id+'" data-transition="slide" >'+
				'<div class="articulo centrar">'+
			     	'<div class="info" widht="100%"><div class="titulo">'+w.title +'</div></div>'+
			     	'<div class="limpiar"></div>' +
			     '</div></a></li>'+s;
			});
		}
		
		$("#listAlertas").html(s);
	//	$("#listAlertas").listview();
	}

	/*recibirPush = function(){*/
	function recibirPush(){
		$("#alertsBotton").find("a").attr("href","#alerts");
		
		var parametros = window.location.href.split("?")[1];
		if(!(typeof parametros === "undefined"))
		{
			var params  = parametros.split("&");
			var tit     = params[0].replace("title=","");
			var alertid = params[1].replace("id=","");
			//alert(parametros);
			pushList.push({title:decodeURI(tit),text:"",id:alertid});
			window.localStorage.setItem('PushList', JSON.stringify(pushList));
			$.mobile.changePage("#contentPageAlert");
			mostrarAlerta(alertid);
			cargarPush();
			return false;
		}
		return true;
	}
	
/*	mostrarAlerta = function(alertaid){*/
	function mostrarAlerta(alertaid){
//		alert(alertaid);
    	var url = "http://www.mobilemediapush.com/PushAlerts/viewJson/"+alertaid;
    	
			 	$("#Title").hide();
			 	$("#Content").hide();
			 	$("#Link").hide();		
			 	$.mobile.changePage("#contentPageAlert");
			    $.mobile.loading("show");
    			$.getJSON(url, function(res) {	
    				var title = (res.Content).title;
    				var text  = (res.Content).text;
    				var link  = (res.Content).url;
    				var zone  = (res.Content).zone;
    				
    				var click_url = (res.Ad).click_url;
    				var banner    = (res.Ad).banner;
    			    var log_url   = (res.Ad).lg_url;

    				$("#Title").text(title);
    				var contentHTML = '<p>'+text+'</p>';
    				$("#Content").html(contentHTML);
    				$("#Link").attr('rel',link);
    		//		$("#Link").attr('rel',url);	
    			 	flurry_alerta(title);
    			    var  publicidad ='<a href="#" rel="'+decodeURIComponent(click_url)+'" class="link" ><img src="'+decodeURIComponent(banner)+'" border="0" alt=""  /></a>';
    			     if(banner!=null){
    			    	 $("#publicidadAlertas").html(publicidad);
    			    }
    			    
    			     $.get(decodeURIComponent(log_url));
    			 //	 alert("banner "+banner);
    			 	 $.mobile.loading("hide");
    			 	 $("#Title").show();
					 $("#Content").show();
					 $("#Link").show();	
					
    			}).error(function(){
    				 $.mobile.loading("hide");
    				$("#Content").html('<h1 class="center" style="font-weight: bold;margin:25px 25px 25px 25px;">No se pudo establecer la conexi&oacute;n...<br></h1>');
					$("#Content").show();
    			});
		
	}

	function errorImageBanner(image){
	//	image.remove();
		//image.alt = "Imagen"; onerror="errorImageBanner(this)"
		//image.src = "/img/nobanner.png";
	}


/*})(jQuery);*/

