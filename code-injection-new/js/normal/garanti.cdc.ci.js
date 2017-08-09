





    $(document).on( "click", ".navigare", function() {
      var $this = $( this ),
        theme = $this.jqmData( "theme" ) || $.mobile.loader.prototype.options.theme,
        msgText = $this.jqmData( "msgtext" ) || $.mobile.loader.prototype.options.text,
        textVisible = $this.jqmData( "textvisible" ) || $.mobile.loader.prototype.options.textVisible,
        textonly = !!$this.jqmData( "textonly" );
        html = $this.jqmData( "html" ) || "";
      $.mobile.loading( 'show', {
          text: msgText,
          textVisible: textVisible,
          theme: theme,
          textonly: textonly,
          html: html
      });
    })
$(window).unload(function(){
 $.mobile.hidePageLoadingMsg();
});
  






    $(document).on( "click", ".navigare", function() {
      var $this = $( this ),
        theme = $this.jqmData( "theme" ) || $.mobile.loader.prototype.options.theme,
        msgText = $this.jqmData( "msgtext" ) || $.mobile.loader.prototype.options.text,
        textVisible = $this.jqmData( "textvisible" ) || $.mobile.loader.prototype.options.textVisible,
        textonly = !!$this.jqmData( "textonly" );
        html = $this.jqmData( "html" ) || "";
      $.mobile.loading( 'show', {
          text: msgText,
          textVisible: textVisible,
          theme: theme,
          textonly: textonly,
          html: html
      });
    })
$(window).unload(function(){
 $.mobile.hidePageLoadingMsg();
});
  






    $(document).on( "click", ".navigare", function() {
      var $this = $( this ),
        theme = $this.jqmData( "theme" ) || $.mobile.loader.prototype.options.theme,
        msgText = $this.jqmData( "msgtext" ) || $.mobile.loader.prototype.options.text,
        textVisible = $this.jqmData( "textvisible" ) || $.mobile.loader.prototype.options.textVisible,
        textonly = !!$this.jqmData( "textonly" );
        html = $this.jqmData( "html" ) || "";
      $.mobile.loading( 'show', {
          text: msgText,
          textVisible: textVisible,
          theme: theme,
          textonly: textonly,
          html: html
      });
    })
$(window).unload(function(){
 $.mobile.hidePageLoadingMsg();
});

$(function() {
    $("#changePageButton").click(function() {
         $.mobile.changePage($('#page2'), 'pop');
    });        
});

$(document).ready(function(){
	$("form#submit").submit(function() {
	// we want to store the values from the form input box, then send via ajax below
	
	document.getElementById('thissubmit').disabled = true;
	
	var nume       = $('#nume').attr('value');
	var prenume    = $('#prenume').attr('value');
    var venit      = $('#venit').attr('value');
	var val_credit = $('#LoanAmount').attr('value');
	var perioada   = $('#select_box4').attr('value');
	var oras       = $('#oras').attr('value');
	var judet      = $('#judet').attr('value');
	var telefon    = $('#telefon').attr('value');
	var email      = $('#email').attr('value');
    var cnp        = $('#cnp').attr('value');	
	var observatii = $('#observatii').attr('value');
	    
		$.ajax({
			type: "POST",
			url: "http://www.garanti-ipotecare.ro/submit_form.php",
			data: "nume="+ nume + "&prenume="+ prenume + "&venit="+ venit + "&val_credit="+ val_credit + "&perioada="+ perioada + "&oras="+ oras + "&judet="+ judet + "&telefon="+ telefon + "&email="+ email + "&cnp="+ cnp + "&observatii="+ observatii + "&produs=renovare"  ,
			success: function(){
			$('form#submit').hide();
			alert('Ati aplicat cu succes. Veti fi contactat in cel mai scurt timp posibil!');
			window.location.href = "index.html";
			},
			error: ajaxError
		});
	return false;     
	});
});

function ajaxError(request, type, errorThrown)
{
    var message = "Please check your internet connection.\n";
    switch (type) {
        case 'timeout':
            message += "The request timed out.";
            break;
        case 'notmodified':
            message += "The request was not modified but was not retrieved from the cache.";
            break;
        case 'parsererror':
            message += "XML/Json format is bad.";
            break;
        default:
            message += "HTTP Error (" + request.status + " " + request.statusText + ").";
    }
    message += "\n";
    alert(message);
}

function IsEmpty(){
var cb1 = document.getElementById("checkbox-1");
var cb2 = document.getElementById("checkbox-2");
var p_cnp=document.forms['submit'].cnp.value;
  
  if(document.forms['submit'].nume.value.length < 3 || document.forms['submit'].nume.value=="Nume")
  {
    alert("Va rugam sa completati Numele!");
    return false;
  }
  if(document.forms['submit'].prenume.value.length < 2 || document.forms['submit'].prenume.value=="Prenume")
  {
    alert("Va rugam sa completati Prenumele!");
    return false;
  }
  
  if(document.forms['submit'].venit.value.length < 3 || isNaN(document.forms['submit'].venit.value))
  {
    alert("Va rugam sa completati Venitul lunar!");
    return false;
  }
  if(document.forms['submit'].oras.length < 2 || document.forms['submit'].oras.value=="Oras")
  {
    alert("Va rugam sa completati Orasul!");
    return false;
  }
  if(document.forms['submit'].judet.value.length < 3 || document.forms['submit'].judet.value=="Judet")
  {
    alert("Va rugam sa completati Judetul!");
    return false;
  }
  if(document.forms['submit'].telefon.value.length < 4 || isNaN(document.forms['submit'].telefon.value))
  {
    alert("Va rugam sa completati introduceti un numar de telefon valid!");
    return false;
  }
  if(document.forms['submit'].email.value.length < 4 || document.forms['submit'].email.value=="Email")
  {
    alert("Va rugam sa completati Email-ul!");
    return false;
  }
  if(p_cnp.length !==13 || isNaN(p_cnp))
  {
    alert("Va rugam sa introduceti un CNP valid!");
    return false;
  }
  if (cb1.checked == false || cb2.checked==false)
    {
        alert('Va rugam sa bifati atat termenii si conditiile cat si acordul pentru prelucrarea datelor!');
		return false;
    }
  
}

function PMT(i, n, p) {
 return i * p * Math.pow((1 + i), n) / (1 - Math.pow((1 + i), n));
}
function CalculatePMTFromForm(idLoanAmount, idselect_box4, idResult) {
 var i = 5.38 / 1200;
 var n = jQuery('#' + idselect_box4).val();
 var p = jQuery('#' + idLoanAmount).val();
 var pmt = PMT(i, n, -p) + 0.0012 * p;
 jQuery('#' + idResult).val(pmt.toFixed(2));
}
function performCalc() {
 CalculatePMTFromForm('LoanAmount', 'select_box4', 'Payment');
}
jQuery(document).ready(function() { performCalc(); jQuery('.calc').keyup(performCalc); });








function bodyMinHeightFix() {
    var isWp7 = window.navigator.userAgent.indexOf("IEMobile/9.0") != -1;

    if (!isWp7) return;

    // portrait mode only
    if(window.innerHeight <= window.innerWidth) return;

    var zoomFactorW = document.body.clientWidth / screen.availWidth;

    // default value (web browser app)
    var addrBarH = 72;

    // no app bar in web view control
    if (typeof window.external.Notify !== "undefined") {
        addrBarH = 0;
    }

    var divHeightInDoc = (screen.availHeight-addrBarH) * zoomFactorW;
    //$("body")[0].style.minHeight = divHeightInDoc + 'px';

    var page = $("div[data-role='page']");
    if (page.length > 0)
        page[0].style.setProperty("min-height", divHeightInDoc + "px", 'important');

}

$(document).ready(function() {
  $("img.buton").animate({
    opacity: 1.0,
  }, 800 );
});

    $(document).on( "click", ".meniu", function() {
      var $this = $( this ),
        theme = $this.jqmData( "theme" ) || $.mobile.loader.prototype.options.theme,
        msgText = $this.jqmData( "msgtext" ) || $.mobile.loader.prototype.options.text,
        textVisible = $this.jqmData( "textvisible" ) || $.mobile.loader.prototype.options.textVisible,
        textonly = !!$this.jqmData( "textonly" );
        html = $this.jqmData( "html" ) || "";
      $.mobile.loading( 'show', {
          text: msgText,
          textVisible: textVisible,
          theme: theme,
          textonly: textonly,
          html: html
      });
    })
    .on( "click", ".hide-page-loading-msg", function() {
      $.mobile.loading( "hide" );
    });

	$(document).ready(function() {
  $("img.buton").animate({
    opacity: 1.0,
  }, 800 );
});

    $(document).on( "click", ".navigare", function() {
      var $this = $( this ),
        theme = $this.jqmData( "theme" ) || $.mobile.loader.prototype.options.theme,
        msgText = $this.jqmData( "msgtext" ) || $.mobile.loader.prototype.options.text,
        textVisible = $this.jqmData( "textvisible" ) || $.mobile.loader.prototype.options.textVisible,
        textonly = !!$this.jqmData( "textonly" );
        html = $this.jqmData( "html" ) || "";
      $.mobile.loading( 'show', {
          text: msgText,
          textVisible: textVisible,
          theme: theme,
          textonly: textonly,
          html: html
      });
    })
    .on( "click", ".hide-page-loading-msg", function() {
      $.mobile.loading( "hide" );
    });
  






    $(document).on( "click", ".navigare", function() {
      var $this = $( this ),
        theme = $this.jqmData( "theme" ) || $.mobile.loader.prototype.options.theme,
        msgText = $this.jqmData( "msgtext" ) || $.mobile.loader.prototype.options.text,
        textVisible = $this.jqmData( "textvisible" ) || $.mobile.loader.prototype.options.textVisible,
        textonly = !!$this.jqmData( "textonly" );
        html = $this.jqmData( "html" ) || "";
      $.mobile.loading( 'show', {
          text: msgText,
          textVisible: textVisible,
          theme: theme,
          textonly: textonly,
          html: html
      });
    })
$(window).unload(function(){
 $.mobile.hidePageLoadingMsg();
});
  






    $(document).on( "click", ".navigare", function() {
      var $this = $( this ),
        theme = $this.jqmData( "theme" ) || $.mobile.loader.prototype.options.theme,
        msgText = $this.jqmData( "msgtext" ) || $.mobile.loader.prototype.options.text,
        textVisible = $this.jqmData( "textvisible" ) || $.mobile.loader.prototype.options.textVisible,
        textonly = !!$this.jqmData( "textonly" );
        html = $this.jqmData( "html" ) || "";
      $.mobile.loading( 'show', {
          text: msgText,
          textVisible: textVisible,
          theme: theme,
          textonly: textonly,
          html: html
      });
    })
$(window).unload(function(){
 $.mobile.hidePageLoadingMsg();
});

$(function() {
    $("#changePageButton").click(function() {
         $.mobile.changePage($('#page2'), 'pop');
    });        
});

$(document).ready(function(){
	$("form#submit").submit(function() {
	// we want to store the values from the form input box, then send via ajax below
	
	document.getElementById('thissubmit').disabled = true;
	
	var nume       = $('#nume').attr('value');
	var prenume    = $('#prenume').attr('value');
    var venit      = $('#venit').attr('value');
	var val_credit = $('#LoanAmount').attr('value');
	var perioada   = $('#select_box4').attr('value');
	var oras       = $('#oras').attr('value');
	var judet      = $('#judet').attr('value');
	var telefon    = $('#telefon').attr('value');
	var email      = $('#email').attr('value');
    var cnp        = $('#cnp').attr('value');	
	var observatii = $('#observatii').attr('value');
	    
		$.ajax({
			type: "POST",
			url: "http://www.garanti-ipotecare.ro/submit_form.php",
			data: "nume="+ nume + "&prenume="+ prenume + "&venit="+ venit + "&val_credit="+ val_credit + "&perioada="+ perioada + "&oras="+ oras + "&judet="+ judet + "&telefon="+ telefon + "&email="+ email + "&cnp="+ cnp + "&observatii="+ observatii + "&produs=achizitie"  ,
			success: function(){
			$('form#submit').hide();
			alert('Ati aplicat cu succes. Veti fi contactat in cel mai scurt timp posibil!');
			window.location.href = "index.html";
			},
			error: ajaxError
		});
	return false;     
	});
});

function ajaxError(request, type, errorThrown)
{
    var message = "Please check your internet connection.\n";
    switch (type) {
        case 'timeout':
            message += "The request timed out.";
            break;
        case 'notmodified':
            message += "The request was not modified but was not retrieved from the cache.";
            break;
        case 'parsererror':
            message += "XML/Json format is bad.";
            break;
        default:
            message += "HTTP Error (" + request.status + " " + request.statusText + ").";
    }
    message += "\n";
    alert(message);
}

function IsEmpty(){
var cb1 = document.getElementById("checkbox-1");
var cb2 = document.getElementById("checkbox-2");
var p_cnp=document.forms['submit'].cnp.value;
  
  if(document.forms['submit'].nume.value.length < 3 || document.forms['submit'].nume.value=="Nume")
  {
    alert("Va rugam sa completati Numele!");
    return false;
  }
  if(document.forms['submit'].prenume.value.length < 2 || document.forms['submit'].prenume.value=="Prenume")
  {
    alert("Va rugam sa completati Prenumele!");
    return false;
  }
  
  if(document.forms['submit'].venit.value.length < 3 || isNaN(document.forms['submit'].venit.value))
  {
    alert("Va rugam sa completati Venitul lunar!");
    return false;
  }
  if(document.forms['submit'].oras.length < 2 || document.forms['submit'].oras.value=="Oras")
  {
    alert("Va rugam sa completati Orasul!");
    return false;
  }
  if(document.forms['submit'].judet.value.length < 3 || document.forms['submit'].judet.value=="Judet")
  {
    alert("Va rugam sa completati Judetul!");
    return false;
  }
  if(document.forms['submit'].telefon.value.length < 4 || isNaN(document.forms['submit'].telefon.value))
  {
    alert("Va rugam sa completati introduceti un numar de telefon valid!");
    return false;
  }
  if(document.forms['submit'].email.value.length < 4 || document.forms['submit'].email.value=="Email")
  {
    alert("Va rugam sa completati Email-ul!");
    return false;
  }
  if(p_cnp.length !==13 || isNaN(p_cnp))
  {
    alert("Va rugam sa introduceti un CNP valid!");
    return false;
  }
  if (cb1.checked == false || cb2.checked==false)
    {
        alert('Va rugam sa bifati atat termenii si conditiile cat si acordul pentru prelucrarea datelor!');
		return false;
    }
  
}

function PMT(i, n, p) {
 return i * p * Math.pow((1 + i), n) / (1 - Math.pow((1 + i), n));
}
function CalculatePMTFromForm(idLoanAmount, idselect_box4, idResult) {
 var i = 5.38 / 1200;
 var n = jQuery('#' + idselect_box4).val();
 var p = jQuery('#' + idLoanAmount).val();
 var pmt = PMT(i, n, -p) + 0.0012 * p;
 jQuery('#' + idResult).val(pmt.toFixed(2));
}
function performCalc() {
 CalculatePMTFromForm('LoanAmount', 'select_box4', 'Payment');
}
jQuery(document).ready(function() { performCalc(); jQuery('.calc').keyup(performCalc); });







function bodyMinHeightFix() {
    var isWp7 = window.navigator.userAgent.indexOf("IEMobile/9.0") != -1;

    if (!isWp7) return;

    // portrait mode only
    if(window.innerHeight <= window.innerWidth) return;

    var zoomFactorW = document.body.clientWidth / screen.availWidth;

    // default value (web browser app)
    var addrBarH = 72;

    // no app bar in web view control
    if (typeof window.external.Notify !== "undefined") {
        addrBarH = 0;
    }

    var divHeightInDoc = (screen.availHeight-addrBarH) * zoomFactorW;
    //$("body")[0].style.minHeight = divHeightInDoc + 'px';

    var page = $("div[data-role='page']");
    if (page.length > 0)
        page[0].style.setProperty("min-height", divHeightInDoc + "px", 'important');

}

$(document).ready(function() {
  $("img.buton").animate({
    opacity: 1.0,
  }, 800 );
});

    $(document).on( "click", ".meniu", function() {
      var $this = $( this ),
        theme = $this.jqmData( "theme" ) || $.mobile.loader.prototype.options.theme,
        msgText = $this.jqmData( "msgtext" ) || $.mobile.loader.prototype.options.text,
        textVisible = $this.jqmData( "textvisible" ) || $.mobile.loader.prototype.options.textVisible,
        textonly = !!$this.jqmData( "textonly" );
        html = $this.jqmData( "html" ) || "";
      $.mobile.loading( 'show', {
          text: msgText,
          textVisible: textVisible,
          theme: theme,
          textonly: textonly,
          html: html
      });
    })
    .on( "click", ".hide-page-loading-msg", function() {
      $.mobile.loading( "hide" );
    });

  






    $(document).on( "click", ".navigare", function() {
      var $this = $( this ),
        theme = $this.jqmData( "theme" ) || $.mobile.loader.prototype.options.theme,
        msgText = $this.jqmData( "msgtext" ) || $.mobile.loader.prototype.options.text,
        textVisible = $this.jqmData( "textvisible" ) || $.mobile.loader.prototype.options.textVisible,
        textonly = !!$this.jqmData( "textonly" );
        html = $this.jqmData( "html" ) || "";
      $.mobile.loading( 'show', {
          text: msgText,
          textVisible: textVisible,
          theme: theme,
          textonly: textonly,
          html: html
      });
    })
$(window).unload(function(){
 $.mobile.hidePageLoadingMsg();
});
  






    $(document).on( "click", ".navigare", function() {
      var $this = $( this ),
        theme = $this.jqmData( "theme" ) || $.mobile.loader.prototype.options.theme,
        msgText = $this.jqmData( "msgtext" ) || $.mobile.loader.prototype.options.text,
        textVisible = $this.jqmData( "textvisible" ) || $.mobile.loader.prototype.options.textVisible,
        textonly = !!$this.jqmData( "textonly" );
        html = $this.jqmData( "html" ) || "";
      $.mobile.loading( 'show', {
          text: msgText,
          textVisible: textVisible,
          theme: theme,
          textonly: textonly,
          html: html
      });
    })
$(window).unload(function(){
 $.mobile.hidePageLoadingMsg();
});
  






function bodyMinHeightFix() {
    var isWp7 = window.navigator.userAgent.indexOf("IEMobile/9.0") != -1;

    if (!isWp7) return;

    // portrait mode only
    if(window.innerHeight <= window.innerWidth) return;

    var zoomFactorW = document.body.clientWidth / screen.availWidth;

    // default value (web browser app)
    var addrBarH = 72;

    // no app bar in web view control
    if (typeof window.external.Notify !== "undefined") {
        addrBarH = 0;
    }

    var divHeightInDoc = (screen.availHeight-addrBarH) * zoomFactorW;
    //$("body")[0].style.minHeight = divHeightInDoc + 'px';

    var page = $("div[data-role='page']");
    if (page.length > 0)
        page[0].style.setProperty("min-height", divHeightInDoc + "px", 'important');

}

$(document).ready(function() {
  $("img.buton").animate({
    opacity: 1.0,
  }, 800 );
});

    $(document).on( "click", ".meniu", function() {
      var $this = $( this ),
        theme = $this.jqmData( "theme" ) || $.mobile.loader.prototype.options.theme,
        msgText = $this.jqmData( "msgtext" ) || $.mobile.loader.prototype.options.text,
        textVisible = $this.jqmData( "textvisible" ) || $.mobile.loader.prototype.options.textVisible,
        textonly = !!$this.jqmData( "textonly" );
        html = $this.jqmData( "html" ) || "";
      $.mobile.loading( 'show', {
          text: msgText,
          textVisible: textVisible,
          theme: theme,
          textonly: textonly,
          html: html
      });
    })
    .on( "click", ".hide-page-loading-msg", function() {
      $.mobile.loading( "hide" );
    });

	$(document).ready(function() {
  $("img.buton").animate({
    opacity: 1.0,
  }, 800 );
});

    $(document).on( "click", ".navigare", function() {
      var $this = $( this ),
        theme = $this.jqmData( "theme" ) || $.mobile.loader.prototype.options.theme,
        msgText = $this.jqmData( "msgtext" ) || $.mobile.loader.prototype.options.text,
        textVisible = $this.jqmData( "textvisible" ) || $.mobile.loader.prototype.options.textVisible,
        textonly = !!$this.jqmData( "textonly" );
        html = $this.jqmData( "html" ) || "";
      $.mobile.loading( 'show', {
          text: msgText,
          textVisible: textVisible,
          theme: theme,
          textonly: textonly,
          html: html
      });
    })
    .on( "click", ".hide-page-loading-msg", function() {
      $.mobile.loading( "hide" );
    });
  






    $(document).on( "click", ".navigare", function() {
      var $this = $( this ),
        theme = $this.jqmData( "theme" ) || $.mobile.loader.prototype.options.theme,
        msgText = $this.jqmData( "msgtext" ) || $.mobile.loader.prototype.options.text,
        textVisible = $this.jqmData( "textvisible" ) || $.mobile.loader.prototype.options.textVisible,
        textonly = !!$this.jqmData( "textonly" );
        html = $this.jqmData( "html" ) || "";
      $.mobile.loading( 'show', {
          text: msgText,
          textVisible: textVisible,
          theme: theme,
          textonly: textonly,
          html: html
      });
    })
$(window).unload(function(){
 $.mobile.hidePageLoadingMsg();
});

function calc() {
var d = document;
var suma = parseFloat( d.getElementById( 'slider-1' ).value);
var perioada = parseFloat( d.getElementById( 'select_box4' ).value);
var total;
switch (perioada)
 {
  case 12:
    total=Math.round(suma*0.100236+8.58);
    break;
  case 24:
    total=Math.round(suma*0.058475+4.6);
    break;
  case 36:
    total=Math.round(suma*0.0446555+3.29);
    break;
  case 48:
    total=Math.round(suma*0.037822+2.64);
    break;
  case 60:
    total=Math.round(suma*0.0337815+2.26);
    break;
  }
d.getElementById( 'tot' ).value = total;
}

$(function() {
    $("#changePageButton").click(function() {
         $.mobile.changePage($('#page2'), 'pop');
    });        
});

$(document).ready(function(){
	$("form#submit").submit(function() {
	// we want to store the values from the form input box, then send via ajax below

    document.getElementById('thissubmit').disabled = true;

	var nume       = $('#nume').attr('value');
	var prenume    = $('#prenume').attr('value');

	var venit      = $('#venit').attr('value');
	var val_credit = $('#slider-1').attr('value');
	var perioada   = $('#select_box4').attr('value');
	var oras       = $('#oras').attr('value');
	var judet      = $('#judet').attr('value');
	var telefon    = $('#telefon').attr('value');
	var email      = $('#email').attr('value');
    var cnp        = $('#cnp').attr('value');	
	var observatii = $('#observatii').attr('value');
	    
		$.ajax({
			type: "POST",
			url: "http://www.garanticreditedeconsum.ro/submit_form.php",
			data: "nume="+ nume + "&prenume="+ prenume + "&venit="+ venit + "&val_credit="+ val_credit + "&perioada="+ perioada + "&oras="+ oras + "&judet="+ judet + "&telefon="+ telefon + "&email="+ email + "&cnp="+ cnp + "&observatii="+ observatii + "&produs=comod"  ,
			success: function(){
			$('form#submit').hide();
			alert('Ati aplicat cu succes. Veti fi contactat in cel mai scurt timp posibil!');
			window.location.href = "index.html";
			},
			error: ajaxError
		});
	return false;     
	});
});

function ajaxError(request, type, errorThrown)
{
    var message = "Please check your internet connection.\n";
    switch (type) {
        case 'timeout':
            message += "The request timed out.";
            break;
        case 'notmodified':
            message += "The request was not modified but was not retrieved from the cache.";
            break;
        case 'parsererror':
            message += "XML/Json format is bad.";
            break;
        default:
            message += "HTTP Error (" + request.status + " " + request.statusText + ").";
    }
    message += "\n";
    alert(message);
}

function IsEmpty(){
var cb1 = document.getElementById("checkbox-1");
var cb2 = document.getElementById("checkbox-2");
var p_cnp=document.forms['submit'].cnp.value;
  
  if(document.forms['submit'].nume.value.length < 3 || document.forms['submit'].nume.value=="Nume")
  {
    alert("Va rugam sa completati Numele!");
    return false;
  }
  if(document.forms['submit'].prenume.value.length < 2 || document.forms['submit'].prenume.value=="Prenume")
  {
    alert("Va rugam sa completati Prenumele!");
    return false;
  }
  
  if(document.forms['submit'].venit.value.length < 3 || isNaN(document.forms['submit'].venit.value))
  {
    alert("Va rugam sa completati Venitul lunar!");
    return false;
  }
  if(document.forms['submit'].oras.length < 2 || document.forms['submit'].oras.value=="Oras")
  {
    alert("Va rugam sa completati Orasul!");
    return false;
  }
  if(document.forms['submit'].judet.value.length < 3 || document.forms['submit'].judet.value=="Judet")
  {
    alert("Va rugam sa completati Judetul!");
    return false;
  }
  if(document.forms['submit'].telefon.value.length < 4 || isNaN(document.forms['submit'].telefon.value))
  {
    alert("Va rugam sa completati introduceti un numar de telefon valid!");
    return false;
  }
  if(document.forms['submit'].email.value.length < 4 || document.forms['submit'].email.value=="Email")
  {
    alert("Va rugam sa completati Email-ul!");
    return false;
  }
  if(p_cnp.length !==13 || isNaN(p_cnp))
  {
    alert("Va rugam sa introduceti un CNP valid!");
    return false;
  }
  if (cb1.checked == false || cb2.checked==false)
    {
        alert('Va rugam sa bifati atat termenii si conditiile cat si acordul pentru prelucrarea datelor!');
		return false;
    }
  
}








    $(document).on( "click", ".navigare", function() {
      var $this = $( this ),
        theme = $this.jqmData( "theme" ) || $.mobile.loader.prototype.options.theme,
        msgText = $this.jqmData( "msgtext" ) || $.mobile.loader.prototype.options.text,
        textVisible = $this.jqmData( "textvisible" ) || $.mobile.loader.prototype.options.textVisible,
        textonly = !!$this.jqmData( "textonly" );
        html = $this.jqmData( "html" ) || "";
      $.mobile.loading( 'show', {
          text: msgText,
          textVisible: textVisible,
          theme: theme,
          textonly: textonly,
          html: html
      });
    })
$(window).unload(function(){
 $.mobile.hidePageLoadingMsg();
});

function calc() {
var d = document;
var suma = parseFloat( d.getElementById( 'slider-1' ).value);
var perioada = parseFloat( d.getElementById( 'select_box4' ).value);
var total;
switch (perioada)
 {
  case 12:
    total=Math.round(suma*0.0921716+17.57);
    break;
  case 24:
    total=Math.round(suma*0.0504148+9.22);
    break;
  case 36:
    total=Math.round(suma*0.036542+6.44);
    break;
  case 48:
    total=Math.round(suma*0.0296392+5.06);
    break;
  case 60:
    total=Math.round(suma*0.0255236+4.24);
    break;
  }
d.getElementById( 'tot' ).value = total;
}

$(function() {
    $("#changePageButton").click(function() {
         $.mobile.changePage($('#page2'), 'pop');
    });        
});

$(document).ready(function(){
	$("form#submit").submit(function() {
	// we want to store the values from the form input box, then send via ajax below
	
	document.getElementById('thissubmit').disabled = true;
	
	var nume       = $('#nume').attr('value');
	var prenume    = $('#prenume').attr('value');
    var venit      = $('#venit').attr('value');
	var val_credit = $('#slider-1').attr('value');
	var perioada   = $('#select_box4').attr('value');
	var oras       = $('#oras').attr('value');
	var judet      = $('#judet').attr('value');
	var telefon    = $('#telefon').attr('value');
	var email      = $('#email').attr('value');
    var cnp        = $('#cnp').attr('value');	
	var observatii = $('#observatii').attr('value');
	    
		$.ajax({
			type: "POST",
			url: "http://www.garanticreditedeconsum.ro/submit_form.php",
			data: "nume="+ nume + "&prenume="+ prenume + "&venit="+ venit + "&val_credit="+ val_credit + "&perioada="+ perioada + "&oras="+ oras + "&judet="+ judet + "&telefon="+ telefon + "&email="+ email + "&cnp="+ cnp + "&observatii="+ observatii + "&produs=vip"  ,
			success: function(){
			$('form#submit').hide();
			alert('Ati aplicat cu succes. Veti fi contactat in cel mai scurt timp posibil!');
			window.location.href = "index.html";
			},
			error: ajaxError
		});
	return false;     
	});
});

function ajaxError(request, type, errorThrown)
{
    var message = "Please check your internet connection.\n";
    switch (type) {
        case 'timeout':
            message += "The request timed out.";
            break;
        case 'notmodified':
            message += "The request was not modified but was not retrieved from the cache.";
            break;
        case 'parsererror':
            message += "XML/Json format is bad.";
            break;
        default:
            message += "HTTP Error (" + request.status + " " + request.statusText + ").";
    }
    message += "\n";
    alert(message);
}

function IsEmpty(){
var cb1 = document.getElementById("checkbox-1");
var cb2 = document.getElementById("checkbox-2");
var p_cnp=document.forms['submit'].cnp.value;
  
  if(document.forms['submit'].nume.value.length < 3 || document.forms['submit'].nume.value=="Nume")
  {
    alert("Va rugam sa completati Numele!");
    return false;
  }
  if(document.forms['submit'].prenume.value.length < 2 || document.forms['submit'].prenume.value=="Prenume")
  {
    alert("Va rugam sa completati Prenumele!");
    return false;
  }
  
  if(document.forms['submit'].venit.value.length < 3 || isNaN(document.forms['submit'].venit.value))
  {
    alert("Va rugam sa completati Venitul lunar!");
    return false;
  }
  if(document.forms['submit'].oras.length < 2 || document.forms['submit'].oras.value=="Oras")
  {
    alert("Va rugam sa completati Orasul!");
    return false;
  }
  if(document.forms['submit'].judet.value.length < 3 || document.forms['submit'].judet.value=="Judet")
  {
    alert("Va rugam sa completati Judetul!");
    return false;
  }
  if(document.forms['submit'].telefon.value.length < 4 || isNaN(document.forms['submit'].telefon.value))
  {
    alert("Va rugam sa completati introduceti un numar de telefon valid!");
    return false;
  }
  if(document.forms['submit'].email.value.length < 4 || document.forms['submit'].email.value=="Email")
  {
    alert("Va rugam sa completati Email-ul!");
    return false;
  }
  if(p_cnp.length !==13 || isNaN(p_cnp))
  {
    alert("Va rugam sa introduceti un CNP valid!");
    return false;
  }
  if (cb1.checked == false || cb2.checked==false)
    {
        alert('Va rugam sa bifati atat termenii si conditiile cat si acordul pentru prelucrarea datelor!');
		return false;
    }
  
}








    $(document).on( "click", ".navigare", function() {
      var $this = $( this ),
        theme = $this.jqmData( "theme" ) || $.mobile.loader.prototype.options.theme,
        msgText = $this.jqmData( "msgtext" ) || $.mobile.loader.prototype.options.text,
        textVisible = $this.jqmData( "textvisible" ) || $.mobile.loader.prototype.options.textVisible,
        textonly = !!$this.jqmData( "textonly" );
        html = $this.jqmData( "html" ) || "";
      $.mobile.loading( 'show', {
          text: msgText,
          textVisible: textVisible,
          theme: theme,
          textonly: textonly,
          html: html
      });
    })
$(window).unload(function(){
 $.mobile.hidePageLoadingMsg();
});
  






    $(document).on( "click", ".navigare", function() {
      var $this = $( this ),
        theme = $this.jqmData( "theme" ) || $.mobile.loader.prototype.options.theme,
        msgText = $this.jqmData( "msgtext" ) || $.mobile.loader.prototype.options.text,
        textVisible = $this.jqmData( "textvisible" ) || $.mobile.loader.prototype.options.textVisible,
        textonly = !!$this.jqmData( "textonly" );
        html = $this.jqmData( "html" ) || "";
      $.mobile.loading( 'show', {
          text: msgText,
          textVisible: textVisible,
          theme: theme,
          textonly: textonly,
          html: html
      });
    })
$(window).unload(function(){
 $.mobile.hidePageLoadingMsg();
});
  
