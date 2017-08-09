







/*! @source http://purl.eligrey.com/github/classList.js/blob/master/classList.js*/
if("document" in self&&!("classList" in document.createElement("_")&&"classList" in document.createElementNS("http://www.w3.org/2000/svg","svg"))){(function(j){"use strict";if(!("Element" in j)){return}var a="classList",f="prototype",m=j.Element[f],b=Object,k=String[f].trim||function(){return this.replace(/^\s+|\s+$/g,"")},c=Array[f].indexOf||function(q){var p=0,o=this.length;for(;p<o;p++){if(p in this&&this[p]===q){return p}}return -1},n=function(o,p){this.name=o;this.code=DOMException[o];this.message=p},g=function(p,o){if(o===""){throw new n("SYNTAX_ERR","An invalid or illegal string was specified")}if(/\s/.test(o)){throw new n("INVALID_CHARACTER_ERR","String contains an invalid character")}return c.call(p,o)},d=function(s){var r=k.call(s.getAttribute("class")),q=r?r.split(/\s+/):[],p=0,o=q.length;for(;p<o;p++){this.push(q[p])}this._updateClassName=function(){s.setAttribute("class",this.toString())}},e=d[f]=[],i=function(){return new d(this)};n[f]=Error[f];e.item=function(o){return this[o]||null};e.contains=function(o){o+="";return g(this,o)!==-1};e.add=function(){var s=arguments,r=0,p=s.length,q,o=false;do{q=s[r]+"";if(g(this,q)===-1){this.push(q);o=true}}while(++r<p);if(o){this._updateClassName()}};e.remove=function(){var t=arguments,s=0,p=t.length,r,o=false;do{r=t[s]+"";var q=g(this,r);if(q!==-1){this.splice(q,1);o=true}}while(++s<p);if(o){this._updateClassName()}};e.toggle=function(p,q){p+="";var o=this.contains(p),r=o?q!==true&&"remove":q!==false&&"add";if(r){this[r](p)}return !o};e.toString=function(){return this.join(" ")};if(b.defineProperty){var l={get:i,enumerable:true,configurable:true};try{b.defineProperty(m,a,l)}catch(h){if(h.number===-2146823252){l.enumerable=false;b.defineProperty(m,a,l)}}}else{if(b[f].__defineGetter__){m.__defineGetter__(a,i)}}}(self))};


var cf = null, is = null, cf_config = null;
var art_type = 'articolo';

$(function() {
	loadTestText();
	updateGUI();
});

function setTesti(dict)
{
    var titolo = dict.titolo;
    var tipo = dict.tipo;
    var sezione = dict.sezione;
    var sottotitolo = dict.sottotitolo;
    var testo = dict.testo;
    var foto = dict.foto;
    var dida = dict.dida;
	
    if(titolo) $('#fixedContent .titolazione h1').html(titolo);

    if(foto) $('.content_img').attr('data-src', foto);
    
    //if(dida)
      //  $('#dida').html(dida);
    
    if(sottotitolo)
        $('#flowedContent').html('<p class="sottotitolo">' + sottotitolo + '</p>' + '<p>' + testo + '</p>');
    else
        $('#flowedContent').html('<p>' + testo + '</p>');
    
    $('#sezione_descr').html(sezione);
    
    if(tipo) art_type = tipo;
    
    updateGUI();
}

function upFontSize() {
	setFontSizeLS(+1);
}

function downFontSize() {
	setFontSizeLS(-1);
}

function share() {
    window.location = 'dsh://artdig.share';
}

function setFontSizeLS(p_step) {
	var _txtdim = parseInt(localStorage.getItem('arttxtstep'), 10) || 100;
	console.log(_txtdim);
	if (_txtdim == null) _txtdim = "100";
	_txtdim_orig = parseInt(_txtdim);
	_txtdim = Math.max(80, Math.min(120, parseInt(_txtdim))) + (5 * p_step);
	if (_txtdim_orig == _txtdim) return;
	localStorage.setItem('arttxtstep', _txtdim);
	updateGUI();
}

function realDim(obj){
    var clone = obj.clone();
    clone.css("visibility","hidden");
    $('body').append(clone);
    var width = clone.outerWidth();
    var height = clone.outerHeight();
    clone.remove();
    return [width, height];
}

var currentpg = 0;
function updateGUI(p_shadow) {

    try {

	currentpg = 0;
	 
    if(art_type == 'correlato')
    {
        $('#art_tools_share').hide();
        $('#sezione').css('background-color', '#a11e1d');
    }

	var mostraTitolazione = false;
	// controllo cosa mostrare tra i vari nodi
	$('.imageViewer img').each(function (index) {
		if ($(this).attr('data-src').indexOf('__FOTO__') == -1) {
			mostraTitolazione = true;
			$(this).parent().css('display', 'inline-block');
			$(this).attr('src', $(this).attr('data-src'));
			// controllo dida
			$(this).parent().find('.content').each(function() {
				console.log($(this).html());
				if ($(this).html().indexOf('__DIDA__') == -1) {
					$(this).parent().css('display', 'inline-block');
				} else {
					$(this).parent().css('display', 'none');
				}
				
			});
		} else {
			$(this).parent().css('display', 'none');
		}
	});
	    
	$('.titolazione h1').each(function(index) {
		if ($(this).html().indexOf('__TITOLO__') == -1) {
			mostraTitolazione = true;
			$(this).css('display', 'inline-block');
		} else {
			$(this).css('display', 'none');
		}
	});

    if (p_shadow != true)
        $('#shadow').css('display', 'inline-block');
	if (cf) { cf.destroy(); cf = null; }
	if (is) { is.destroy(); is = null; }
	
	$('<div id="target" />').appendTo($('<div id="viewport" />').appendTo($('#isc').empty()));
    
	$('#wrapper').width(window.innerWidth).height(window.innerHeight);
	$('#isw').height($(window).height() - $('#isindc').height() - $('#sezione').height()).width($('#wrapper').width());
	$('#viewport').height($('#isw').height() - 10).width($('#isw').width());
	$('#target').height($('#viewport').height());
	$('.imageViewer').width($('#viewport').width());

	// set della dimensione del carattere
	var _txtdim = parseInt(localStorage.getItem('arttxtstep'));
	if (_txtdim == null || isNaN(_txtdim)) _txtdim = "100";
	_txtdim = parseInt(0.18 * Math.max(90, Math.min(160, parseInt(_txtdim))));
        console.log(_txtdim);
	$('#wrapper').css('font-size', _txtdim + "px").css('line-height', (_txtdim + _txtdim*0.20) + "px");
    

	cf_config = {
		columnCount: 1,
		standardiseLineHeight: true,
        pagePadding: 30,
        lineHeight: _txtdim + _txtdim*0.20,
	}

	cf = new FTColumnflow('target', 'viewport', cf_config);
    
    if (mostraTitolazione) {
		cf.flow(document.getElementById('flowedContent'), document.getElementById('fixedContent'));
	} else {
		cf.flow(document.getElementById('flowedContent'), null);
	}
        
	setTimeout(function() {
		$('#fixedContent .foto-art img').each(function (index) {
            $(this).on('load', function() {
                
                var _dim = realDim($(this));
                var _width = $('.cf-column-1').first().width();
                var _h1 = _dim[1] * _width / _dim[0];
                //var _height = Math.min(_h1, $('.cf-column-1').first().height() * 0.5);
				var _height = Math.min(_h1, $('.cf-column-1').first().height() * 0.75);
                
                
		        $('#fixedContent .foto-art').width(_width).height(_height);
                
				setTimeout(function() {
					$('#fixedContent .foto-art').css('display', 'inline-block');
					$('#target').empty();
					if (mostraTitolazione) {
						cf.flow(document.getElementById('flowedContent'), document.getElementById('fixedContent'));
					} else {
						cf.flow(document.getElementById('flowedContent'), null);
					}
                           setTimeout(function() {
                                      updateGUI(true);
                                      }, 500);
                    
				}, 1000);
			});
			$(this).attr('src', $(this).attr('data-src'));
		});
     
		document.getElementById('isc').style.width = parseInt(document.getElementById('target').style.width) + 'px';
		is = new iScroll('isw', {
			snap: true,
			momentum: false,
			hScrollbar: false,
			vScroll: false,
			onScrollEnd: function () {
				document.querySelector('#isind > li.active').className = '';
				document.querySelector('#isind > li:nth-child(' + (this.currPageX+1) + ')').className = 'active';
				
				if ((currentpg == 0) && (this.currPageX == currentpg) && (this.distX >= 0)) {
					//console.log('<<---');
                         
                    window.location = 'dsh://artdig.gotoprev';
				}
				if ((currentpg == this.pagesX.length - 1) && (this.currPageX == currentpg) && (this.distX <= 0)) {
					//console.log('--->>');
                         
                    window.location = 'dsh://artdig.gotonext';
				}
				
				currentpg = this.currPageX;
				
			}
		 });
		 
		 var _isind = document.getElementById('isind');
		 _isind.innerHTML = '';
		 for (var i = 0; i < is.pagesX.length; i++) {
		 	var _isind_el = document.createElement('li');
		 	_isind_el.innerHTML = i + 1;
		 	if (i == 0) _isind_el.className = 'active';
		 	_isind.appendChild(_isind_el);
		 }
		 _isind.style.visibility = (is.pagesX.length <= 1) ? 'hidden' : 'visible';
               if (p_shadow != true) {
		 setTimeout(function() { $('#shadow').fadeOut(); }, 500);
               }
	 }, 0);
    
        
    } catch(e)
    {

    }

}

function loadTestText() {
	setTesti(
	{"sottotitolo":"","sezione":"Umbria","dida":"","titolo":"Pubblico impiego, i tagli: \r\nComunità montane: via ai pensionamenti \r\nProvince: rischiano i precari ","testo":"PERUGIA - Tagli del pubblico impiego: in cima la Provincia di Perugia, mammut cresciuto fino a 1200 dipendenti. I contratti a tempo determinato sono stati prorogati fino a fine anno, poi si vedrà. <br \/>\r\nCosa succederà nel 2015 alle Province? In quella di Perugia i precari sono una sessantina: sono i primi a rischiare il posto. Molto dipenderà da cosa faranno le &ldquo;nuove Province&rdquo; da grandi. La riforma Delrio ha sostanzialmente evitato il voto, ma gli enti sono rimasti e i presidenti eletti 5 anni fa sono diventati commissari. Ora, un altro decreto deve stabilire quali competenze avranno questi enti: scuole, strade, centri per l'impiego?<br \/>\r\n<br \/>\r\n<strong>Per ridisegnare l'assetto<\/strong> di competenze e uffici, la Regione conta di approvare una legge entro il mese di ottobre. Per quella data dovrebbe essere nero su bianco anche il decreto &ldquo;Delrio 2&rdquo;.<br \/>\r\n<br \/>\r\n<strong>Vanno sistemati da qualche parte pure i dipendenti delle Comunità Montane.<\/strong> Al momento si occupano di agricoltura e verde e anche loro sono guidati da presidenti-commissari. Ne resterebbero 150, perché 55 sono pronti per andare in pensione con i criteri &ldquo;pre riforma Fornero&rdquo;. L'Inps ha fatto i conti e dato l'ok per le coperture finanziarie: «Si può fare». Martedì summit tra Regione, Province (quel che resta), Comuni (perché a regola di bazzica alcune competenze toccano a loro) e sindacati per fare il punto e andare avanti.<br \/>\r\n<br \/>\r\n<strong>Prossima tappa Prefetture e Camere di Commercio<\/strong>, rischiano gli uffici di Terni, che potrebbe restare in piedi col giochino della \"sede decentrata\", ma qualcuno potrebbe essere costretto a trasferirsi.","foto":"http:\/\/www.ilmessaggero.it\/MsgrNews\/HIGH\/20140623_badge_reg.jpg","tipo":"articolo"}
	);
}







/*! @source http://purl.eligrey.com/github/classList.js/blob/master/classList.js*/
if("document" in self&&!("classList" in document.createElement("_")&&"classList" in document.createElementNS("http://www.w3.org/2000/svg","svg"))){(function(j){"use strict";if(!("Element" in j)){return}var a="classList",f="prototype",m=j.Element[f],b=Object,k=String[f].trim||function(){return this.replace(/^\s+|\s+$/g,"")},c=Array[f].indexOf||function(q){var p=0,o=this.length;for(;p<o;p++){if(p in this&&this[p]===q){return p}}return -1},n=function(o,p){this.name=o;this.code=DOMException[o];this.message=p},g=function(p,o){if(o===""){throw new n("SYNTAX_ERR","An invalid or illegal string was specified")}if(/\s/.test(o)){throw new n("INVALID_CHARACTER_ERR","String contains an invalid character")}return c.call(p,o)},d=function(s){var r=k.call(s.getAttribute("class")),q=r?r.split(/\s+/):[],p=0,o=q.length;for(;p<o;p++){this.push(q[p])}this._updateClassName=function(){s.setAttribute("class",this.toString())}},e=d[f]=[],i=function(){return new d(this)};n[f]=Error[f];e.item=function(o){return this[o]||null};e.contains=function(o){o+="";return g(this,o)!==-1};e.add=function(){var s=arguments,r=0,p=s.length,q,o=false;do{q=s[r]+"";if(g(this,q)===-1){this.push(q);o=true}}while(++r<p);if(o){this._updateClassName()}};e.remove=function(){var t=arguments,s=0,p=t.length,r,o=false;do{r=t[s]+"";var q=g(this,r);if(q!==-1){this.splice(q,1);o=true}}while(++s<p);if(o){this._updateClassName()}};e.toggle=function(p,q){p+="";var o=this.contains(p),r=o?q!==true&&"remove":q!==false&&"add";if(r){this[r](p)}return !o};e.toString=function(){return this.join(" ")};if(b.defineProperty){var l={get:i,enumerable:true,configurable:true};try{b.defineProperty(m,a,l)}catch(h){if(h.number===-2146823252){l.enumerable=false;b.defineProperty(m,a,l)}}}else{if(b[f].__defineGetter__){m.__defineGetter__(a,i)}}}(self))};


var cf = null, is = null, cf_config = null;
var art_type = 'articolo';

$(function() {
	//loadTestText();
	//updateGUI();
});

function setTesti(dict)
{
    var titolo = dict.titolo;
    var tipo = dict.tipo;
    var sezione = dict.sezione;
    var sottotitolo = dict.sottotitolo;
    var testo = dict.testo;
    var foto = dict.foto;
    var dida = dict.dida;
	
    if(titolo) $('#fixedContent .titolazione h1').html(titolo);

    if(foto) $('.content_img').attr('data-src', foto);
    
    //if(dida)
      //  $('#dida').html(dida);
    
    if(sottotitolo)
        $('#flowedContent').html('<p class="sottotitolo">' + sottotitolo + '</p>' + '<p>' + testo + '</p>');
    else
        $('#flowedContent').html('<p>' + testo + '</p>');
    
    $('#sezione_descr').html(sezione);
    
    if(tipo) art_type = tipo;
    
    updateGUI();
}

function upFontSize() {
	setFontSizeLS(+1);
}

function downFontSize() {
	setFontSizeLS(-1);
}

function share() {
    window.location = 'dsh://artdig.share';
}

function setFontSizeLS(p_step) {
	var _txtdim = parseInt(localStorage.getItem('arttxtstep'), 10) || 100;
	console.log(_txtdim);
	if (_txtdim == null) _txtdim = "100";
	_txtdim_orig = parseInt(_txtdim);
	_txtdim = Math.max(80, Math.min(120, parseInt(_txtdim))) + (5 * p_step);
	if (_txtdim_orig == _txtdim) return;
	localStorage.setItem('arttxtstep', _txtdim);
	updateGUI();
}

function realDim(obj){
    var clone = obj.clone();
    clone.css("visibility","hidden");
    $('body').append(clone);
    var width = clone.outerWidth();
    var height = clone.outerHeight();
    clone.remove();
    return [width, height];
}

var currentpg = 0;
function updateGUI(p_shadow) {

    try {

	currentpg = 0;
	 
    if(art_type == 'correlato')
    {
        $('#art_tools_share').hide();
        $('#sezione').css('background-color', '#a11e1d');
    }

	var mostraTitolazione = false;
	// controllo cosa mostrare tra i vari nodi
	$('.imageViewer img').each(function (index) {
		if ($(this).attr('data-src').indexOf('__FOTO__') == -1) {
			mostraTitolazione = true;
			$(this).parent().css('display', 'inline-block');
			$(this).attr('src', $(this).attr('data-src'));
			// controllo dida
			$(this).parent().find('.content').each(function() {
				console.log($(this).html());
				if ($(this).html().indexOf('__DIDA__') == -1) {
					$(this).parent().css('display', 'inline-block');
				} else {
					$(this).parent().css('display', 'none');
				}
				
			});
		} else {
			$(this).parent().css('display', 'none');
		}
	});
	    
	$('.titolazione h1').each(function(index) {
		if ($(this).html().indexOf('__TITOLO__') == -1) {
			mostraTitolazione = true;
			$(this).css('display', 'inline-block');
		} else {
			$(this).css('display', 'none');
		}
	});

    if (p_shadow != true)
        $('#shadow').css('display', 'inline-block');
	if (cf) { cf.destroy(); cf = null; }
	if (is) { is.destroy(); is = null; }
	
	$('<div id="target" />').appendTo($('<div id="viewport" />').appendTo($('#isc').empty()));
    
	$('#wrapper').width(window.innerWidth).height(window.innerHeight);
	$('#isw').height($(window).height() - $('#isindc').height() - $('#sezione').height()).width($('#wrapper').width());
	$('#viewport').height($('#isw').height() - 10).width($('#isw').width());
	$('#target').height($('#viewport').height());
	$('.imageViewer').width($('#viewport').width());

	// set della dimensione del carattere
	var _txtdim = parseInt(localStorage.getItem('arttxtstep'));
	if (_txtdim == null || isNaN(_txtdim)) _txtdim = "100";
	_txtdim = parseInt(0.18 * Math.max(90, Math.min(160, parseInt(_txtdim))));
        console.log(_txtdim);
	$('#wrapper').css('font-size', _txtdim + "px").css('line-height', (_txtdim + _txtdim*0.20) + "px");
    

	cf_config = {
		columnCount: 2,
		standardiseLineHeight: true,
        pagePadding: 30,
        lineHeight: _txtdim + _txtdim*0.20,
	}

	cf = new FTColumnflow('target', 'viewport', cf_config);
    
    if (mostraTitolazione) {
		cf.flow(document.getElementById('flowedContent'), document.getElementById('fixedContent'));
	} else {
		cf.flow(document.getElementById('flowedContent'), null);
	}
        
	setTimeout(function() {
		$('#fixedContent .foto-art img').each(function (index) {
            $(this).on('load', function() {
                
                var _dim = realDim($(this));
                var _width = $('.cf-column-1').first().width();
                var _h1 = _dim[1] * _width / _dim[0];
                //var _height = Math.min(_h1, $('.cf-column-1').first().height() * 0.5);
                var _height = Math.min(_h1, $('.cf-column-1').first().height() * 0.75);
                
                
		        $('#fixedContent .foto-art').width(_width).height(_height);
                
				setTimeout(function() {
					$('#fixedContent .foto-art').css('display', 'inline-block');
					$('#target').empty();
					if (mostraTitolazione) {
						cf.flow(document.getElementById('flowedContent'), document.getElementById('fixedContent'));
					} else {
						cf.flow(document.getElementById('flowedContent'), null);
					}
                           setTimeout(function() {
                                      updateGUI(true);
                                      }, 500);
                    
				}, 1000);
			});
			$(this).attr('src', $(this).attr('data-src'));
		});
     
		document.getElementById('isc').style.width = parseInt(document.getElementById('target').style.width) + 'px';
		is = new iScroll('isw', {
			snap: true,
			momentum: false,
			hScrollbar: false,
			vScroll: false,
			onScrollEnd: function () {
				document.querySelector('#isind > li.active').className = '';
				document.querySelector('#isind > li:nth-child(' + (this.currPageX+1) + ')').className = 'active';
				
				if ((currentpg == 0) && (this.currPageX == currentpg) && (this.distX >= 0)) {
					//console.log('<<---');
                         
                    window.location = 'dsh://artdig.gotoprev';
				}
				if ((currentpg == this.pagesX.length - 1) && (this.currPageX == currentpg) && (this.distX <= 0)) {
					//console.log('--->>');
                         
                    window.location = 'dsh://artdig.gotonext';
				}
				
				currentpg = this.currPageX;
				
			}
		 });
		 var _isind = document.getElementById('isind');
		 _isind.innerHTML = '';
		 for (var i = 0; i < is.pagesX.length; i++) {
		 	var _isind_el = document.createElement('li');
		 	_isind_el.innerHTML = i + 1;
		 	if (i == 0) _isind_el.className = 'active';
		 	_isind.appendChild(_isind_el);
		 }
		 _isind.style.visibility = (is.pagesX.length <= 1) ? 'hidden' : 'visible';
     
               if (p_shadow != true) {
		 setTimeout(function() { $('#shadow').fadeOut(); }, 500);
               }
	 }, 0);
    
        
    } catch(e)
    {

    }

}

function loadTestText() {
	setTesti({"sottotitolo":"sottotitolo","sezione":"sezione","dida":"dida","titolo":"titolo","testo":"testo","tipo":"tipo"});
}
