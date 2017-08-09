






            //create a callback function
            function loadApp () {
                //console.log(' deviceready ha chiamato loadapp');
                //create a script element and set it's type and async attributes
                var script = document.createElement('script'); script.type = 'text/javascript'; script.async = true;
                //set the source of the script element
                script.src = 'js/index.js';
                //add the script element to the DOM
                var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(script, s);
            }
            //add event listener for the deviceready function to run our callback function
            document.addEventListener("deviceready", loadApp, false);

            //riga per caricare app anche in assenza di phonegap
           if (navigator.platform == "MacIntel") $(function(){loadApp();})
        

/*

    Questo file viene caricato quando sia Phonegap che il Dom sono pronti.

*/


jQT = $.jQTouch({
    icon: 'jqtouch.png',
    statusBar: 'black-translucent'
    // preloadImages: [
    //     'calendario/1.jpg',
    //     'calendario/2.jpg',
    //     'calendario/3.jpg',
    //     'calendario/4.jpg',
    //     'calendario/5.jpg',
    //     'calendario/6.jpg',
    //     'calendario/7.jpg',
    //     'calendario/8.jpg',
    //     'calendario/9.jpg',
    //     'calendario/10.jpg',
    //     'calendario/11.jpg',
    //     'calendario/12.jpg'
    // ]
});


// default_blocconote_it = "Inserisci le tue annotazioni";
// default_blocconote_en = "Input your notes";


//Imposto la lingua

try {
      navigator.globalization.getPreferredLanguage(
        function (language) {
            //console.log('language: ' + language.value + '\n');
            var lv = language.value
            if (lv == 'italiano') lv = 'it'; //in android 2.3.6 e' 'italiano'
            if(lv != 'it') lv = 'en';
            
            $('[class*=lang-]:not([class*=lang-' + lv  + '])').css({'display': 'none'});
            $('[class*=lang-' + lv  + ']').css({'display':''});
            
            //preimposto il testo del blocconote
            // if (! localStorage.blocconote) localStorage.blocconote = (lv == 'it' ? default_blocconote_it : default_blocconote_en);
            //console.log('impostato blocconote a ' + localStorage.blocconote)
        }
        ,
        function () {
            //imposto inglese di default
            lv = 'en';
            // if (! localStorage.blocconote) localStorage.blocconote = default_blocconote_en;

            // console.log('Error getting language\n');
            $('[class*=lang-]:not([class*=lang-' + lv  + '])').css({'display': 'none'});
            $('[class*=lang-' + lv  + ']').css({'display':''});
        }
      );
} catch (e) { 
     //console.log('errore nel chiedere a phonegap la lingua');
    //imposto inglese di default
    lv = 'en';
    // if (! localStorage.blocconote) localStorage.blocconote = default_blocconote_en;
    // console.log('Error getting language\n');
    $('[class*=lang-]:not([class*=lang-' + lv  + '])').css({'display': 'none'});
    $('[class*=lang-' + lv  + ']').css({'display':''});
}





//imposto i giorni dei calendari, scegliendo il primo giorno di settimana in base alla lingua
try {
      navigator.globalization.getPreferredLanguage( function (language) {
            if (language == 'it') {imposta_calendari(1 /*lun*/);} else {imposta_calendari(0 /*dom*/);}
        } , function () { imposta_calendari(0 /*dom*/);  } /* questa seconda funzione è il fail della richiesta lingua*/
      );
} catch (e) {
    imposta_calendari(0); // se non funziona la richiesta lingua imposto la domenica
}

function imposta_calendari(inizio_settimana) {
    
    $('.mese').each(function(){
        var month = parseInt($(this).data('mese'),10)-1; //mese - 1 perche' in JS i mesi partono da 00
        var d=new Date(2013,month,1);
        var c = '<table><tr>'; //calendario, corpo della tabella

        //inizio il calendario
        for(var g = inizio_settimana; g<d.getDay(); g++)
        {
            c+= '<td></td>';
        }

        var empty = true;
        for(;d.getMonth()==month; d.setDate(d.getDate()+1))
        {
            if (d.getDay() == inizio_settimana) c+= "</tr><tr>"; //a capo alle domeniche
            c+= '<td>' /*+ (d.getDate()<10?'0':'')*/ + d.getDate() + '</td>';
        }

        c+='</tr></table>';
        $(this).append(c);
    })
        .css({'padding-top': (window.innerHeight - 200) + 'px'})
        .tap(function(){
            window.mesefadedout = ! window.mesefadedout;
            $('.mese').css('opacity',window.mesefadedout ? '0.0' : '1.0');
            
        })
    ;
    window.mesefadedout = false;

}

var calendarioScroll;


// Destroy and re-create the iScroll object on every navigation
$('#calendario').bind('pageAnimationEnd', function(e, info){ 
    if (info.direction =='in'){
         if (calendarioScroll) {calendarioScroll.destroy();}
        setTimeout(crea_calendarioScroll,10);

        setTimeout(carica_immagini, 100);
    }
    else
    {
        setTimeout(normalizza_immagini,100);
        setTimeout(calendarioScroll.destroy, 200);
        //if (calendarioScroll) {calendarioScroll.destroy();}
    }
});


//imposta le immagini per i mesi a parte il primo, altrimenti avendole gia' tutte impostate ci mette una vita a caricare il calendario
function carica_immagini() {
    $('#galleria img').each(function(i){
        // window.setTimeout(
        //     function(image){
        //         return function(){
        //             $(image).attr('src',$(image).attr('src').replace('1.jpg',(i+1)+'.jpg'));
        //         };
        // }(this), i*100);

        $(this).attr('src',$(this).attr('src').replace('1.jpg',(i+1)+'.jpg'));
    });
}

//fa che tutte le immagini del calendario siano quella a gennaio, cosi' non ci mette una vita a caricare il calendario
function normalizza_immagini() {
    $('#galleria img').each(function(i){
        $(this).attr('src',$(this).attr('src').replace(/\d+\.jpg/,'1.jpg'));
    });   
}


function crea_calendarioScroll() {
    //creo lo scroll per il calendario
    calendarioScroll = new iScroll('galleria', {
        hScrollbar: false,
        vScrollbar: false,
        vScroll: true,
        snap: true,
        momentum: false,
        zoom: device.platform != "Android", //android: false, altri: true.
        onZoomEnd: function(){
            that = this;


            
            setTimeout(function(){
                 if (that.scale == 1)
                {
                    that.scrollTo(that.x + (-that.x) % (-that.pagesX[1]),0,100)
                    that.options.snap = true;
                   // that.options.momentum = false;
                    that.options.lockDirection = true;
                    //console.log ('x di ' + that.x + ' su una pagina larga ' + this.pagesX[1]);
                    
                    $('.mese').show();

                } else {
                    that.options.snap = false;
                   // that.options.momentum = true;
                    that.options.lockDirection = false;
                    $('.mese').hide();
                }
            },0);
           

        }
    });
    // calendarioScroll.scrollToPage(0,0,0);
    // calendarioScroll.scrollToPage(new Date().getMonth(),0,0);
    // $('#galleria').animate({'opacity': '1.0'});
}



//load and save note
$('#blocconote').bind('pageAnimationEnd', function(e, info){
    if (info.direction =='in'){
        if (typeof  localStorage.blocconote !== 'undefined' &&  localStorage.blocconote != null) 
        {
            $('#textarea-note').val(localStorage.blocconote);
            
            if (device.platform == "Android") $('#textarea-note').focus();
        }

    }
    else
    {
       localStorage.blocconote = $('#textarea-note').val();

    }
});

//imposto il pulsante di invio via mail
$('#sendmail').click(function(){
    $(this).attr('href', $(this).attr('data-default-href') + escape($('#textarea-note').val()))
});

// window.videocaricato = false;

$('#videobackstage').bind('pageAnimationEnd', function(e, info){
	if (info.direction == 'in') {
		window.open('http://tiny.sm/kronabackstage13', '_system');
		jQT.goBack();
	}

    if (info.direction =='in' && $('#videobackstage iframe').length == 0){
        // if (! window.videocaricato) 
        // {
        	
            // $('#videobackstage .container').empty().append('<iframe width="320" height="180" src="http://www.youtube.com/embed/4uHWcHW8BCw?rel=0" frameborder="0" allowfullscreen></iframe>');
//            $('#videobackstage .container').empty().append('<object width="560" height="315"><param name="movie" value="http://www.youtube.com/v/4uHWcHW8BCw?hl=it_IT&amp;version=3"></param><param name="allowFullScreen" value="true"></param><param name="allowscriptaccess" value="always"></param><embed src="http://www.youtube.com/v/4uHWcHW8BCw?hl=it_IT&amp;version=3" type="application/x-shockwave-flash" width="560" height="315" allowscriptaccess="always" allowfullscreen="true"></embed></object>');
        // }
        // window.videocaricato = true
    }
});

 

$('#qrcode').bind('pageAnimationEnd', function(e, info){
    if (info.direction =='in'){
        setTimeout(function(){
            window.plugins.barcodeScanner.scan(
                function(result) {
                    if (result.cancelled)
                    {
                        jQT.goBack();
                        return;
                    }
                    if (result.text.indexOf('http://') != -1)
                    {
                        //qrcode compatibile
                        window.open(result.text, '_system');
                        jQT.goBack();
                    }
                    else
                    {
                        $('#scanning').hide();
                        $('#scan-failed').show();
                        // jQT.goBack();
                    }
                }, function(error) {
                    alert("Scanning failed: " + error);
                    //jQT.goBack();
                }
            );
        },20);
    }
    else
    {
        $('#scanning').show();
        $('#scan-failed').hide();
    }
});



//Imposto il tap sul link video
//$('.link-videobackstage a, .krona-footer a').bind('tap', function(e){
$('.krona-footer a').bind('tap', function(e){
	e.preventDefault();
    // console.log('videobackstage tap - ' + $(this).attr('href'));
    window.open($(this).attr('href'), '_system');
    return false;
});

//$('.link-videobackstage a, .krona-footer a').bind('click', function(e){
//	e.preventDefault();
//	return false;
//});



/*
    Fine del caricamento del programma. Ora che è tutto impostato, nascondo lo splash screen 
*/
if (navigator.splashscreen) navigator.splashscreen.hide();

(function(){jQTouchCore=function(j){function n(a){"string"===typeof a.selector&&"string"===typeof a.name&&l.push(a)}function v(a,b){k.unshift({page:a,animation:b,hash:"#"+a.attr("id"),id:a.attr("id")})}function C(a){var b=c(a.target);b.is(h.join(", "))||(b=c(a.target).closest(h.join(", ")));b&&b.attr("href")&&!b.isExternalLink()&&a.preventDefault();c.support.touch||c(a.target).trigger("tap",a)}function w(a,b,d,g){function s(){var h=D;c.support.animationEvents&&d&&e.useAnimations?(a.unbind("webkitAnimationEnd",
s),a.removeClass("current "+f+" out"),b.removeClass(f),i.removeClass("animating animating3d"),!0===e.trackScrollPositions&&(b.css("top",-b.data("lastScroll")),setTimeout(function(){b.css("top",0);window.scroll(0,b.data("lastScroll"));c(".scroll",b).each(function(){this.scrollTop=-c(this).data("lastScroll")})},0))):(a.removeClass(f+" out current"),h+=260);setTimeout(function(){b.removeClass("in")},h);m=b;g?k.shift():v(m,d);a.unselect();x(m.attr("id"));b.trigger("pageAnimationEnd",{direction:"in",animation:d});
a.trigger("pageAnimationEnd",{direction:"out",animation:d})}g=g?g:!1;if(void 0===b||0===b.length||b.hasClass("current"))return c.fn.unselect(),!1;c(":focus").trigger("blur");a.trigger("pageAnimationStart",{direction:"out",back:g});b.trigger("pageAnimationStart",{direction:"in",back:g});if(c.support.animationEvents&&d&&e.useAnimations){if(!c.support.transform3d&&d.is3d)d.name=e.defaultAnimation;var f=d.name,h=d.is3d?"animating3d":"";g&&(f=f.replace(/left|right|up|down|in|out/,E));a.bind("webkitAnimationEnd",
s);i.addClass("animating "+h);h=window.pageYOffset;!0===e.trackScrollPositions&&b.css("top",window.pageYOffset-(b.data("lastScroll")||0));b.addClass(f+" in current");a.addClass(f+" out");!0===e.trackScrollPositions&&(a.data("lastScroll",h),c(".scroll",a).each(function(){c(this).data("lastScroll",this.scrollTop)}))}else b.addClass("current in"),s();return!0}function E(a){return{up:"down",down:"up",left:"right",right:"left","in":"out",out:"in"}[a]||a}function q(){1===k.length&&window.history.go(-1);
var a=k[0];return w(a.page,k[1].page,a.animation,!0)?o:!1}function p(a,b){var d=k[0].page;if("string"===typeof b)for(var g=0,e=l.length;g<e;g++)if(l[g].name===b){b=l[g];break}if("string"===typeof a){g=c(a);if(1>g.length){t(a,{animation:b});return}a=g}return w(d,a,b)?o:!1}function F(){if(location.hash===k[0].hash)return!0;if(""===location.hash||k[1]&&location.hash===k[1].hash)return q(),!0;p(c(location.hash),e.defaultAnimation)}function y(a){for(var b,d=0,c=l.length;d<c;d++)if(a.is(l[d].selector)){b=
l[d];break}if(!b)b=e.defaultAnimation;return b}function z(a,b){var d=null,e=document.createElement("div");e.innerHTML=a;c(e).children().each(function(){var a=c(this);a.attr("id")||a.attr("id","page-"+ ++G);c("#"+a.attr("id")).remove();i.append(a);i.trigger("pageInserted",{page:a});if(a.hasClass("current")||!d)d=a});return null!==d?(p(d,b),d):!1}function H(){i.css("minHeight",1E3);scrollTo(0,0);i.css("minHeight",window.innerHeight);r=90==Math.abs(window.orientation)?"landscape":"portrait";i.removeClass("portrait landscape").addClass(r).trigger("turn",
{orientation:r})}function x(a){location.hash="#"+a.replace(/^#/,"")}function t(a,b){var d=c.extend({},{data:null,method:"GET",animation:null,callback:null,$referrer:null},b);"#"!=a?c.ajax({url:a,data:d.data,type:d.method,success:function(a){if(a=z(a,d.animation))"GET"==d.method&&!0===e.cacheGetRequests&&d.$referrer&&d.$referrer.attr("href","#"+a.attr("id")),d.callback&&d.callback(!0)},error:function(){d.$referrer&&d.$referrer.unselect();d.callback&&d.callback(!1)}}):d.$referrer&&d.$referrer.unselect()}
function A(a,b){c(":focus").trigger("blur");a.preventDefault();var d="string"===typeof a?c(a).eq(0):a.target?c(a.target):c(a);return d.length&&d.is(e.formSelector)&&d.attr("action")?(t(d.attr("action"),{data:d.serialize(),method:d.attr("method")||"POST",animation:y(d),callback:b}),!1):!0}function I(a){a=a.closest("form");return 0!==a.length?(a.trigger("submit"),!1):!0}function J(){var a,b,d,c;a=document.getElementsByTagName("head")[0];b=document.body;d=document.createElement("style");d.textContent=
"@media (transform-3d),(-o-transform-3d),(-moz-transform-3d),(-webkit-transform-3d){#jqt-3dtest{height:3px}}";c=document.createElement("div");c.id="jqt-3dtest";a.appendChild(d);b.appendChild(c);a=3===c.offsetHeight;d.parentNode.removeChild(d);c.parentNode.removeChild(c);return a}function K(a){var b=c(a.target),a=h.join(", ");b.is(a)||(b=b.closest(a));b.length&&b.attr("href")&&b.addClass("active");b.on(c.support.touch?"touchmove":"mousemove",function(){b.removeClass("active")});b.on("touchend",function(){b.unbind("touchmove mousemove")})}
function L(a){var b=c(a.target);b.is(h.join(", "))||(b=b.closest(h.join(", ")));if(!b.length||!b.attr("href"))return!1;var a=b.attr("target"),d=b.prop("hash"),g=b.attr("href"),f=null;if(b.isExternalLink())return b.unselect(),!0;if(b.is(e.backSelector))q(d);else if(b.is(e.submitSelector))I(b);else{if("_webapp"===a)return window.location=g,!1;if("#"===g)return b.unselect(),!0;f=y(b);d&&"#"!==d?(b.addClass("active"),p(c(d).data("referrer",b),f,b.hasClass("reverse"))):(b.addClass("loading active"),t(b.attr("href"),
{animation:f,callback:function(){b.removeClass("loading");setTimeout(c.fn.unselect,250,b)},$referrer:b}));return!1}}var c=j.framework,i,M=c("head"),k=[],G=0,e={},m="",r="portrait",h=[],o={},D=100,B=jQTouchCore.prototype.extensions,l=[],f="",u={addGlossToIcon:!0,backSelector:".back, .cancel, .goback",cacheGetRequests:!0,debug:!0,defaultAnimation:"slideleft",fixedViewport:!0,formSelector:"form",fullScreen:!0,fullScreenClass:"fullscreen",icon:null,icon4:null,preloadImages:!1,startupScreen:null,statusBar:"default",
submitSelector:".submit",touchSelector:"a, .touch",trackScrollPositions:!0,useAnimations:!0,useFastTouch:!0,useTouchScroll:!0,animations:[{name:"cubeleft",selector:".cubeleft, .cube",is3d:!0},{name:"cuberight",selector:".cuberight",is3d:!0},{name:"dissolve",selector:".dissolve"},{name:"fade",selector:".fade"},{name:"flipleft",selector:".flipleft, .flip",is3d:!0},{name:"flipright",selector:".flipright",is3d:!0},{name:"pop",selector:".pop",is3d:!0},{name:"swapleft",selector:".swap",is3d:!0},{name:"slidedown",
selector:".slidedown"},{name:"slideright",selector:".slideright"},{name:"slideup",selector:".slideup"},{name:"slideleft",selector:".slideleft, .slide, #jqt > * > ul li a"}]};(function(a){e=c.extend({},u,a);if(e.preloadImages)for(a=e.preloadImages.length-1;0<=a;a--)(new Image).src=e.preloadImages[a];a=e.addGlossToIcon?"":"-precomposed";e.icon&&(f+='<link rel="apple-touch-icon'+a+'" href="'+e.icon+'" />');e.icon4&&(f+='<link rel="apple-touch-icon'+a+'" sizes="114x114" href="'+e.icon4+'" />');e.startupScreen&&
(f+='<link rel="apple-touch-startup-image" href="'+e.startupScreen+'" />');e.fixedViewport&&(f+='<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"/>');e.fullScreen&&(f+='<meta name="apple-mobile-web-app-capable" content="yes" />',e.statusBar&&(f+='<meta name="apple-mobile-web-app-status-bar-style" content="'+e.statusBar+'" />'));f&&M.prepend(f)})(j);c(document).ready(function(){if(!c.support)c.support={};c.support.animationEvents="undefined"!=
typeof window.WebKitAnimationEvent;c.support.touch="undefined"!=typeof window.TouchEvent&&-1<window.navigator.userAgent.indexOf("Mobile")&&e.useFastTouch;c.support.transform3d=J();c.support.ios5=/OS (5(_\d+)*) like Mac OS X/i.test(window.navigator.userAgent);c.fn.isExternalLink=function(){var a=c(this);return"_blank"==a.attr("target")||"external"==a.attr("rel")||a.is('a[href^="http://maps.google.com"], a[href^="mailto:"], a[href^="tel:"], a[href^="javascript:"], a[href*="youtube.com/v"], a[href*="youtube.com/watch"]')};
c.fn.makeActive=function(){return c(this).addClass("active")};c.fn.unselect=function(a){a?a.removeClass("active"):c(".active").removeClass("active")};for(var a=0,b=B.length;a<b;a++){var d=B[a];c.isFunction(d)&&c.extend(o,d(o))}a=0;for(b=u.animations.length;a<b;a++){d=u.animations[a];if(void 0!==e[d.name+"Selector"])d.selector=e[d.name+"Selector"];n(d)}h.push(e.touchSelector);h.push(e.backSelector);h.push(e.submitSelector);c(h.join(", ")).css("-webkit-touch-callout","none");i=c("#jqt");a=[];0===i.length&&
(i=c(document.body).attr("id","jqt"));c.support.transform3d&&a.push("supports3d");c.support.ios5&&e.useTouchScroll&&a.push("touchscroll");e.fullScreenClass&&!0===window.navigator.standalone&&a.push(e.fullScreenClass,e.statusBar);i.addClass(a.join(" ")).bind("click",C).bind("orientationchange",H).bind("submit",A).bind("tap",L).bind(c.support.touch?"touchstart":"mousedown",K).trigger("orientationchange");c(window).bind("hashchange",F);a=location.hash;m=0===c("#jqt > .current").length?c("#jqt > *:first-child").addClass("current"):
c("#jqt > .current");x(m.attr("id"));v(m);1===c(a).length&&p(a)});return o={addAnimation:n,animations:l,getOrientation:function(){return r},goBack:q,insertPages:z,goTo:p,history:k,settings:e,submitForm:A}};jQTouchCore.prototype.extensions=[];window.Zepto&&function(j){j.jQTouch=function(n){n.framework=j;return jQTouchCore(n)};j.fn.prop=j.fn.attr;j.jQTouch.addExtension=function(j){jQTouchCore.prototype.extensions.push(j)}}(Zepto)})();

