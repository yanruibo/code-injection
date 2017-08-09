

 <!-- boton 'back' activado por defecto -->
$(document).bind("mobileinit", function() {
      $.mobile.page.prototype.options.addBackBtn = true;
 });    

 <!-- función para enlaces externos -->
$(document).bind("mobileinit", function() {
	$.support.cors = true;
	$.mobile.allowCrossDomainPages = true;
	$.mobile.pushState = false;
});



function getYouTubeID (url) {
    var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/;
    var match = url.match(regExp);
    if (match&&match[7].length==11){
        return match[7];
    }
    return ('');
}

function scale( width, height, padding, border ) {
    var scrWidth = $( window ).width() - 30,
        scrHeight = $( window ).height() - 30,
        ifrPadding = 2 * padding,
        ifrBorder = 2 * border,
        ifrWidth = width + ifrPadding + ifrBorder,
        ifrHeight = height + ifrPadding + ifrBorder,
        h, w;

    if ( ifrWidth < scrWidth && ifrHeight < scrHeight ) {
        w = ifrWidth;
        h = ifrHeight;
    } else if ( ( ifrWidth / scrWidth ) > ( ifrHeight / scrHeight ) ) {
        w = scrWidth;
        h = ( scrWidth / ifrWidth ) * ifrHeight;
    } else {
        h = scrHeight;
        w = ( scrHeight / ifrHeight ) * ifrWidth;
    }

    return {
        'width': w - ( ifrPadding + ifrBorder ),
        'height': h - ( ifrPadding + ifrBorder )
    };
};

$(document).bind ('pageinit', function () {
    // setup the video popup
    $('#video-iframe')
        .attr( "width", 0 )
        .attr( "height", 0 );
              
    $('#video-popup').on({
        popupbeforeposition: function() {
            var size = scale( 497, 298, 15, 1 ),
                w = size.width,
                h = size.height;
        
            $( "#video-iframe" )
                .attr( "width", w )
                .attr( "height", h );
        },
        popupafterclose: function() {
            $( "#video-iframe" )
                .attr( "width", 0 )
                .attr( "height", 0 )
                .attr( "src", "" );    
        }
    });
        
    $('a.video-link').each (function (ix, item) {
        var url = $(this).attr ('href');
        if (typeof (url) === 'undefined')
            return;
        var ytID =  getYouTubeID(url);
        if (!ytID.length)
            return;
        url = 'http://www.youtube.com/embed/' + ytID + '/?controls=0&showinfo=0&showsearch=0&modestbranding=1&theme=light';
        $(this).attr ('data-youtube', url);
        $(this).removeAttr ('href');
        $(this).attr ('data-rel', 'popup');
        //console.debug ('setting up video:' + url);
            
        $(this).click (function (e) {
            var urlYouTube = $(this).attr('data-youtube')
            //console.debug ('opening popup:' + urlYouTube);
            $('#video-iframe').attr('src', urlYouTube);
            $('#video-popup').popup('open');
            e.preventDefault();
            return (false);
        });
    });
});





    document.addEventListener("deviceready", onDeviceReady, false);
    function PopUpBrowser_Eq() {
         var ref = window.open('http://www.equisalud.com', '_blank', 'location=yes');
    }
    function PopUpBrowser_Llanten() {
         var ref = window.open('http://www.equisalud.com/es-es/productos/Llanten-1499.aspx', '_blank', 'location=yes');
    }
    


 <!-- boton 'back' activado por defecto -->
$(document).bind("mobileinit", function() {
      $.mobile.page.prototype.options.addBackBtn = true;
 });    

 <!-- función para enlaces externos -->
$(document).bind("mobileinit", function() {
	$.support.cors = true;
	$.mobile.allowCrossDomainPages = true;
	$.mobile.pushState = false;
});



function getYouTubeID (url) {
    var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/;
    var match = url.match(regExp);
    if (match&&match[7].length==11){
        return match[7];
    }
    return ('');
}

function scale( width, height, padding, border ) {
    var scrWidth = $( window ).width() - 30,
        scrHeight = $( window ).height() - 30,
        ifrPadding = 2 * padding,
        ifrBorder = 2 * border,
        ifrWidth = width + ifrPadding + ifrBorder,
        ifrHeight = height + ifrPadding + ifrBorder,
        h, w;

    if ( ifrWidth < scrWidth && ifrHeight < scrHeight ) {
        w = ifrWidth;
        h = ifrHeight;
    } else if ( ( ifrWidth / scrWidth ) > ( ifrHeight / scrHeight ) ) {
        w = scrWidth;
        h = ( scrWidth / ifrWidth ) * ifrHeight;
    } else {
        h = scrHeight;
        w = ( scrHeight / ifrHeight ) * ifrWidth;
    }

    return {
        'width': w - ( ifrPadding + ifrBorder ),
        'height': h - ( ifrPadding + ifrBorder )
    };
};

$(document).bind ('pageinit', function () {
    // setup the video popup
    $('#video-iframe')
        .attr( "width", 0 )
        .attr( "height", 0 );
              
    $('#video-popup').on({
        popupbeforeposition: function() {
            var size = scale( 497, 298, 15, 1 ),
                w = size.width,
                h = size.height;
        
            $( "#video-iframe" )
                .attr( "width", w )
                .attr( "height", h );
        },
        popupafterclose: function() {
            $( "#video-iframe" )
                .attr( "width", 0 )
                .attr( "height", 0 )
                .attr( "src", "" );    
        }
    });
        
    $('a.video-link').each (function (ix, item) {
        var url = $(this).attr ('href');
        if (typeof (url) === 'undefined')
            return;
        var ytID =  getYouTubeID(url);
        if (!ytID.length)
            return;
        url = 'http://www.youtube.com/embed/' + ytID + '/?controls=0&showinfo=0&showsearch=0&modestbranding=1&theme=light';
        $(this).attr ('data-youtube', url);
        $(this).removeAttr ('href');
        $(this).attr ('data-rel', 'popup');
        //console.debug ('setting up video:' + url);
            
        $(this).click (function (e) {
            var urlYouTube = $(this).attr('data-youtube')
            //console.debug ('opening popup:' + urlYouTube);
            $('#video-iframe').attr('src', urlYouTube);
            $('#video-popup').popup('open');
            e.preventDefault();
            return (false);
        });
    });
});





    document.addEventListener("deviceready", onDeviceReady, false);
    function PopUpBrowser_Eq() {
         var ref = window.open('http://www.equisalud.com', '_blank', 'location=yes');
    }
    function PopUpBrowser_Ortiga() {
         var ref = window.open('http://www.equisalud.com/es-es/productos/Ortiga-Verde-1525.aspx', '_blank', 'location=yes');
    }
	function PopUpBrowser_Sauco() {
		var ref = window.open('http://www.equisalud.com/es-es/productos/Sauco-1550.aspx', '_blank', 'location=yes');
	}



 <!-- boton 'back' activado por defecto -->
$(document).bind("mobileinit", function() {
      $.mobile.page.prototype.options.addBackBtn = true;
 });    

 <!-- función para enlaces externos -->
$(document).bind("mobileinit", function() {
	$.support.cors = true;
	$.mobile.allowCrossDomainPages = true;
	$.mobile.pushState = false;
});



function getYouTubeID (url) {
    var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/;
    var match = url.match(regExp);
    if (match&&match[7].length==11){
        return match[7];
    }
    return ('');
}

function scale( width, height, padding, border ) {
    var scrWidth = $( window ).width() - 30,
        scrHeight = $( window ).height() - 30,
        ifrPadding = 2 * padding,
        ifrBorder = 2 * border,
        ifrWidth = width + ifrPadding + ifrBorder,
        ifrHeight = height + ifrPadding + ifrBorder,
        h, w;

    if ( ifrWidth < scrWidth && ifrHeight < scrHeight ) {
        w = ifrWidth;
        h = ifrHeight;
    } else if ( ( ifrWidth / scrWidth ) > ( ifrHeight / scrHeight ) ) {
        w = scrWidth;
        h = ( scrWidth / ifrWidth ) * ifrHeight;
    } else {
        h = scrHeight;
        w = ( scrHeight / ifrHeight ) * ifrWidth;
    }

    return {
        'width': w - ( ifrPadding + ifrBorder ),
        'height': h - ( ifrPadding + ifrBorder )
    };
};

$(document).bind ('pageinit', function () {
    // setup the video popup
    $('#video-iframe')
        .attr( "width", 0 )
        .attr( "height", 0 );
              
    $('#video-popup').on({
        popupbeforeposition: function() {
            var size = scale( 497, 298, 15, 1 ),
                w = size.width,
                h = size.height;
        
            $( "#video-iframe" )
                .attr( "width", w )
                .attr( "height", h );
        },
        popupafterclose: function() {
            $( "#video-iframe" )
                .attr( "width", 0 )
                .attr( "height", 0 )
                .attr( "src", "" );    
        }
    });
        
    $('a.video-link').each (function (ix, item) {
        var url = $(this).attr ('href');
        if (typeof (url) === 'undefined')
            return;
        var ytID =  getYouTubeID(url);
        if (!ytID.length)
            return;
        url = 'http://www.youtube.com/embed/' + ytID + '/?controls=0&showinfo=0&showsearch=0&modestbranding=1&theme=light';
        $(this).attr ('data-youtube', url);
        $(this).removeAttr ('href');
        $(this).attr ('data-rel', 'popup');
        //console.debug ('setting up video:' + url);
            
        $(this).click (function (e) {
            var urlYouTube = $(this).attr('data-youtube')
            //console.debug ('opening popup:' + urlYouTube);
            $('#video-iframe').attr('src', urlYouTube);
            $('#video-popup').popup('open');
            e.preventDefault();
            return (false);
        });
    });
});





    document.addEventListener("deviceready", onDeviceReady, false);
    function PopUpBrowser_Eq() {
         var ref = window.open('http://www.equisalud.com', '_blank', 'location=yes');
    }
    function PopUpBrowser_Colacaballo() {
         var ref = window.open('http://www.equisalud.com/es-es/productos/Cola-de-Caballo-1436.aspx', '_blank', 'location=yes');
    }
	function PopUpBrowser_Verbena() {
		var ref = window.open('http://www.equisalud.com/es-es/productos/Verbena-1566.aspx', '_blank', 'location=yes');
	}
	function PopUpBrowser_Ortiga() {
		var ref = window.open('http://www.equisalud.com/es-es/productos/Ortiga-Verde-1525.aspx', '_blank', 'location=yes');
	}
    


 <!-- boton 'back' activado por defecto -->
$(document).bind("mobileinit", function() {
      $.mobile.page.prototype.options.addBackBtn = true;
 });    

 <!-- función para enlaces externos -->
$(document).bind("mobileinit", function() {
	$.support.cors = true;
	$.mobile.allowCrossDomainPages = true;
	$.mobile.pushState = false;
});



function getYouTubeID (url) {
    var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/;
    var match = url.match(regExp);
    if (match&&match[7].length==11){
        return match[7];
    }
    return ('');
}

function scale( width, height, padding, border ) {
    var scrWidth = $( window ).width() - 30,
        scrHeight = $( window ).height() - 30,
        ifrPadding = 2 * padding,
        ifrBorder = 2 * border,
        ifrWidth = width + ifrPadding + ifrBorder,
        ifrHeight = height + ifrPadding + ifrBorder,
        h, w;

    if ( ifrWidth < scrWidth && ifrHeight < scrHeight ) {
        w = ifrWidth;
        h = ifrHeight;
    } else if ( ( ifrWidth / scrWidth ) > ( ifrHeight / scrHeight ) ) {
        w = scrWidth;
        h = ( scrWidth / ifrWidth ) * ifrHeight;
    } else {
        h = scrHeight;
        w = ( scrHeight / ifrHeight ) * ifrWidth;
    }

    return {
        'width': w - ( ifrPadding + ifrBorder ),
        'height': h - ( ifrPadding + ifrBorder )
    };
};

$(document).bind ('pageinit', function () {
    // setup the video popup
    $('#video-iframe')
        .attr( "width", 0 )
        .attr( "height", 0 );
              
    $('#video-popup').on({
        popupbeforeposition: function() {
            var size = scale( 497, 298, 15, 1 ),
                w = size.width,
                h = size.height;
        
            $( "#video-iframe" )
                .attr( "width", w )
                .attr( "height", h );
        },
        popupafterclose: function() {
            $( "#video-iframe" )
                .attr( "width", 0 )
                .attr( "height", 0 )
                .attr( "src", "" );    
        }
    });
        
    $('a.video-link').each (function (ix, item) {
        var url = $(this).attr ('href');
        if (typeof (url) === 'undefined')
            return;
        var ytID =  getYouTubeID(url);
        if (!ytID.length)
            return;
        url = 'http://www.youtube.com/embed/' + ytID + '/?controls=0&showinfo=0&showsearch=0&modestbranding=1&theme=light';
        $(this).attr ('data-youtube', url);
        $(this).removeAttr ('href');
        $(this).attr ('data-rel', 'popup');
        //console.debug ('setting up video:' + url);
            
        $(this).click (function (e) {
            var urlYouTube = $(this).attr('data-youtube')
            //console.debug ('opening popup:' + urlYouTube);
            $('#video-iframe').attr('src', urlYouTube);
            $('#video-popup').popup('open');
            e.preventDefault();
            return (false);
        });
    });
});





    document.addEventListener("deviceready", onDeviceReady, false);
    function PopUpBrowser_Eq() {
         var ref = window.open('http://www.equisalud.com', '_blank', 'location=yes');
    }
    function PopUpBrowser_Equinacea() {
         var ref = window.open('http://www.equisalud.com/es-es/productos/Equinacea-1450.aspx', '_blank', 'location=yes');
    }
	function PopUpBrowser_Melisa() {
		var ref = window.open('http://www.equisalud.com/es-es/productos/Melisa-1509.aspx', '_blank', 'location=yes');
	}
	function PopUpBrowser_Milenrama() {
		var ref = window.open('http://www.equisalud.com/es-es/productos/Milenrama-1513.aspx', '_blank', 'location=yes');
	}
	function PopUpBrowser_Salvia() {
		var ref = window.open('http://www.equisalud.com/es-es/productos/Salvia-1546.aspx', '_blank', 'location=yes');
	}
	function PopUpBrowser_Ginseng() {
		var ref = window.open('http://www.equisalud.com/es-es/productos/Ginseng-1470.aspx', '_blank', 'location=yes');
	}
	function PopUpBrowser_Eleuterococo() {
		var ref = window.open('http://www.equisalud.com/es-es/productos/Eleuterococo-1446.aspx', '_blank', 'location=yes');
	}
	function PopUpBrowser_Ajedrea() {
		var ref = window.open('http://www.equisalud.com/es-es/productos/Ajedrea-1392.aspx', '_blank', 'location=yes');
	}
    


 <!-- boton 'back' activado por defecto -->
$(document).bind("mobileinit", function() {
      $.mobile.page.prototype.options.addBackBtn = true;
 });    

 <!-- función para enlaces externos -->
$(document).bind("mobileinit", function() {
	$.support.cors = true;
	$.mobile.allowCrossDomainPages = true;
	$.mobile.pushState = false;
});



function getYouTubeID (url) {
    var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/;
    var match = url.match(regExp);
    if (match&&match[7].length==11){
        return match[7];
    }
    return ('');
}

function scale( width, height, padding, border ) {
    var scrWidth = $( window ).width() - 30,
        scrHeight = $( window ).height() - 30,
        ifrPadding = 2 * padding,
        ifrBorder = 2 * border,
        ifrWidth = width + ifrPadding + ifrBorder,
        ifrHeight = height + ifrPadding + ifrBorder,
        h, w;

    if ( ifrWidth < scrWidth && ifrHeight < scrHeight ) {
        w = ifrWidth;
        h = ifrHeight;
    } else if ( ( ifrWidth / scrWidth ) > ( ifrHeight / scrHeight ) ) {
        w = scrWidth;
        h = ( scrWidth / ifrWidth ) * ifrHeight;
    } else {
        h = scrHeight;
        w = ( scrHeight / ifrHeight ) * ifrWidth;
    }

    return {
        'width': w - ( ifrPadding + ifrBorder ),
        'height': h - ( ifrPadding + ifrBorder )
    };
};

$(document).bind ('pageinit', function () {
    // setup the video popup
    $('#video-iframe')
        .attr( "width", 0 )
        .attr( "height", 0 );
              
    $('#video-popup').on({
        popupbeforeposition: function() {
            var size = scale( 497, 298, 15, 1 ),
                w = size.width,
                h = size.height;
        
            $( "#video-iframe" )
                .attr( "width", w )
                .attr( "height", h );
        },
        popupafterclose: function() {
            $( "#video-iframe" )
                .attr( "width", 0 )
                .attr( "height", 0 )
                .attr( "src", "" );    
        }
    });
        
    $('a.video-link').each (function (ix, item) {
        var url = $(this).attr ('href');
        if (typeof (url) === 'undefined')
            return;
        var ytID =  getYouTubeID(url);
        if (!ytID.length)
            return;
        url = 'http://www.youtube.com/embed/' + ytID + '/?controls=0&showinfo=0&showsearch=0&modestbranding=1&theme=light';
        $(this).attr ('data-youtube', url);
        $(this).removeAttr ('href');
        $(this).attr ('data-rel', 'popup');
        //console.debug ('setting up video:' + url);
            
        $(this).click (function (e) {
            var urlYouTube = $(this).attr('data-youtube')
            //console.debug ('opening popup:' + urlYouTube);
            $('#video-iframe').attr('src', urlYouTube);
            $('#video-popup').popup('open');
            e.preventDefault();
            return (false);
        });
    });
});





    document.addEventListener("deviceready", onDeviceReady, false);
    function PopUpBrowser_Eq() {
         var ref = window.open('http://www.equisalud.com', '_blank', 'location=yes');
    }
    function PopUpBrowser_Ajo() {
         var ref = window.open('http://www.equisalud.com/es-es/productos/Ajo-1394.aspx', '_blank', 'location=yes');
    }
	function PopUpBrowser_Alholva() {
		var ref = window.open('http://www.equisalud.com/es-es/productos/Fenogreco-1457.aspx', '_blank', 'location=yes');
	}
	function PopUpBrowser_Espino() {
		var ref = window.open('http://www.equisalud.com/es-es/productos/Espino-Blanco-1452.aspx', '_blank', 'location=yes');
	}



 <!-- boton 'back' activado por defecto -->
$(document).bind("mobileinit", function() {
      $.mobile.page.prototype.options.addBackBtn = true;
 });    

 <!-- función para enlaces externos -->
$(document).bind("mobileinit", function() {
	$.support.cors = true;
	$.mobile.allowCrossDomainPages = true;
	$.mobile.pushState = false;
});



function getYouTubeID (url) {
    var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/;
    var match = url.match(regExp);
    if (match&&match[7].length==11){
        return match[7];
    }
    return ('');
}

function scale( width, height, padding, border ) {
    var scrWidth = $( window ).width() - 30,
        scrHeight = $( window ).height() - 30,
        ifrPadding = 2 * padding,
        ifrBorder = 2 * border,
        ifrWidth = width + ifrPadding + ifrBorder,
        ifrHeight = height + ifrPadding + ifrBorder,
        h, w;

    if ( ifrWidth < scrWidth && ifrHeight < scrHeight ) {
        w = ifrWidth;
        h = ifrHeight;
    } else if ( ( ifrWidth / scrWidth ) > ( ifrHeight / scrHeight ) ) {
        w = scrWidth;
        h = ( scrWidth / ifrWidth ) * ifrHeight;
    } else {
        h = scrHeight;
        w = ( scrHeight / ifrHeight ) * ifrWidth;
    }

    return {
        'width': w - ( ifrPadding + ifrBorder ),
        'height': h - ( ifrPadding + ifrBorder )
    };
};

$(document).bind ('pageinit', function () {
    // setup the video popup
    $('#video-iframe')
        .attr( "width", 0 )
        .attr( "height", 0 );
              
    $('#video-popup').on({
        popupbeforeposition: function() {
            var size = scale( 497, 298, 15, 1 ),
                w = size.width,
                h = size.height;
        
            $( "#video-iframe" )
                .attr( "width", w )
                .attr( "height", h );
        },
        popupafterclose: function() {
            $( "#video-iframe" )
                .attr( "width", 0 )
                .attr( "height", 0 )
                .attr( "src", "" );    
        }
    });
        
    $('a.video-link').each (function (ix, item) {
        var url = $(this).attr ('href');
        if (typeof (url) === 'undefined')
            return;
        var ytID =  getYouTubeID(url);
        if (!ytID.length)
            return;
        url = 'http://www.youtube.com/embed/' + ytID + '/?controls=0&showinfo=0&showsearch=0&modestbranding=1&theme=light';
        $(this).attr ('data-youtube', url);
        $(this).removeAttr ('href');
        $(this).attr ('data-rel', 'popup');
        //console.debug ('setting up video:' + url);
            
        $(this).click (function (e) {
            var urlYouTube = $(this).attr('data-youtube')
            //console.debug ('opening popup:' + urlYouTube);
            $('#video-iframe').attr('src', urlYouTube);
            $('#video-popup').popup('open');
            e.preventDefault();
            return (false);
        });
    });
});





    document.addEventListener("deviceready", onDeviceReady, false);
    function PopUpBrowser_Eq() {
         var ref = window.open('http://www.equisalud.com', '_blank', 'location=yes');
    }
    function PopUpBrowser_Verbena() {
         var ref = window.open('http://www.equisalud.com/es-es/productos/Verbena-1566.aspx', '_blank', 'location=yes');
    }
	function PopUpBrowser_Sauco() {
		var ref = window.open('http://www.equisalud.com/es-es/productos/Sauco-1550.aspx', '_blank', 'location=yes');
	}
	function PopUpBrowser_SanRoberto() {
		var ref = window.open('http://www.equisalud.com/es-es/productos/Geranio-1468.aspx', '_blank', 'location=yes');
	}








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
        


 <!-- boton 'back' activado por defecto -->
$(document).bind("mobileinit", function() {
      $.mobile.page.prototype.options.addBackBtn = true;
 });    

 <!-- función para enlaces externos -->
$(document).bind("mobileinit", function() {
	$.support.cors = true;
	$.mobile.allowCrossDomainPages = true;
	$.mobile.pushState = false;
});



function getYouTubeID (url) {
    var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/;
    var match = url.match(regExp);
    if (match&&match[7].length==11){
        return match[7];
    }
    return ('');
}

function scale( width, height, padding, border ) {
    var scrWidth = $( window ).width() - 30,
        scrHeight = $( window ).height() - 30,
        ifrPadding = 2 * padding,
        ifrBorder = 2 * border,
        ifrWidth = width + ifrPadding + ifrBorder,
        ifrHeight = height + ifrPadding + ifrBorder,
        h, w;

    if ( ifrWidth < scrWidth && ifrHeight < scrHeight ) {
        w = ifrWidth;
        h = ifrHeight;
    } else if ( ( ifrWidth / scrWidth ) > ( ifrHeight / scrHeight ) ) {
        w = scrWidth;
        h = ( scrWidth / ifrWidth ) * ifrHeight;
    } else {
        h = scrHeight;
        w = ( scrHeight / ifrHeight ) * ifrWidth;
    }

    return {
        'width': w - ( ifrPadding + ifrBorder ),
        'height': h - ( ifrPadding + ifrBorder )
    };
};

$(document).bind ('pageinit', function () {
    // setup the video popup
    $('#video-iframe')
        .attr( "width", 0 )
        .attr( "height", 0 );
              
    $('#video-popup').on({
        popupbeforeposition: function() {
            var size = scale( 497, 298, 15, 1 ),
                w = size.width,
                h = size.height;
        
            $( "#video-iframe" )
                .attr( "width", w )
                .attr( "height", h );
        },
        popupafterclose: function() {
            $( "#video-iframe" )
                .attr( "width", 0 )
                .attr( "height", 0 )
                .attr( "src", "" );    
        }
    });
        
    $('a.video-link').each (function (ix, item) {
        var url = $(this).attr ('href');
        if (typeof (url) === 'undefined')
            return;
        var ytID =  getYouTubeID(url);
        if (!ytID.length)
            return;
        url = 'http://www.youtube.com/embed/' + ytID + '/?controls=0&showinfo=0&showsearch=0&modestbranding=1&theme=light';
        $(this).attr ('data-youtube', url);
        $(this).removeAttr ('href');
        $(this).attr ('data-rel', 'popup');
        //console.debug ('setting up video:' + url);
            
        $(this).click (function (e) {
            var urlYouTube = $(this).attr('data-youtube')
            //console.debug ('opening popup:' + urlYouTube);
            $('#video-iframe').attr('src', urlYouTube);
            $('#video-popup').popup('open');
            e.preventDefault();
            return (false);
        });
    });
});





    document.addEventListener("deviceready", onDeviceReady, false);
    function PopUpBrowser_Eq() {
         var ref = window.open('http://www.equisalud.com', '_blank', 'location=yes');
    }
    function PopUpBrowser_Valeriana() {
         var ref = window.open('http://www.equisalud.com/es-es/productos/Valeriana-1564.aspx', '_blank', 'location=yes');
    }
	function PopUpBrowser_Ortiga() {
		var ref = window.open('http://www.equisalud.com/es-es/productos/Ortiga-Verde-1525.aspx', '_blank', 'location=yes');
	}
	function PopUpBrowser_Milenrama() {
		var ref = window.open('http://www.equisalud.com/es-es/productos/Milenrama-1513.aspx', '_blank', 'location=yes');
	}
	function PopUpBrowser_Azahar() {
		var ref = window.open('http://www.equisalud.com/es-es/productos/Azahar-1411.aspx', '_blank', 'location=yes');
	}




// Check if a new cache is available on page load.
window.addEventListener('load', function(e) {

  window.applicationCache.addEventListener('updateready', function(e) {
    if (window.applicationCache.status == window.applicationCache.UPDATEREADY) {
      // Browser downloaded a new app cache.
      // Swap it in and reload the page to get the new hotness.
      window.applicationCache.swapCache();
      if (confirm('A new version of this site is available. Load it?')) {
        window.location.reload();
      }
    } else {
      // Manifest didn't changed. Nothing new to server.
    }
  }, false);

}, false);

 <!-- boton 'back' activado por defecto -->
$(document).bind("mobileinit", function() {
      $.mobile.page.prototype.options.addBackBtn = true;
 });    

 <!-- función para enlaces externos -->
$(document).bind("mobileinit", function() {
	$.support.cors = true;
	$.mobile.allowCrossDomainPages = true;
	$.mobile.pushState = false;
});





    document.addEventListener("deviceready", onDeviceReady, false);
    function PopUpBrowser_Eq() {
         var ref = window.open('http://www.equisalud.com', '_blank', 'location=yes');
    }



 <!-- boton 'back' activado por defecto -->
$(document).bind("mobileinit", function() {
      $.mobile.page.prototype.options.addBackBtn = true;
 });    

 <!-- función para enlaces externos -->
$(document).bind("mobileinit", function() {
	$.support.cors = true;
	$.mobile.allowCrossDomainPages = true;
	$.mobile.pushState = false;
});



function getYouTubeID (url) {
    var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/;
    var match = url.match(regExp);
    if (match&&match[7].length==11){
        return match[7];
    }
    return ('');
}

function scale( width, height, padding, border ) {
    var scrWidth = $( window ).width() - 30,
        scrHeight = $( window ).height() - 30,
        ifrPadding = 2 * padding,
        ifrBorder = 2 * border,
        ifrWidth = width + ifrPadding + ifrBorder,
        ifrHeight = height + ifrPadding + ifrBorder,
        h, w;

    if ( ifrWidth < scrWidth && ifrHeight < scrHeight ) {
        w = ifrWidth;
        h = ifrHeight;
    } else if ( ( ifrWidth / scrWidth ) > ( ifrHeight / scrHeight ) ) {
        w = scrWidth;
        h = ( scrWidth / ifrWidth ) * ifrHeight;
    } else {
        h = scrHeight;
        w = ( scrHeight / ifrHeight ) * ifrWidth;
    }

    return {
        'width': w - ( ifrPadding + ifrBorder ),
        'height': h - ( ifrPadding + ifrBorder )
    };
};

$(document).bind ('pageinit', function () {
    // setup the video popup
    $('#video-iframe')
        .attr( "width", 0 )
        .attr( "height", 0 );
              
    $('#video-popup').on({
        popupbeforeposition: function() {
            var size = scale( 497, 298, 15, 1 ),
                w = size.width,
                h = size.height;
        
            $( "#video-iframe" )
                .attr( "width", w )
                .attr( "height", h );
        },
        popupafterclose: function() {
            $( "#video-iframe" )
                .attr( "width", 0 )
                .attr( "height", 0 )
                .attr( "src", "" );    
        }
    });
        
    $('a.video-link').each (function (ix, item) {
        var url = $(this).attr ('href');
        if (typeof (url) === 'undefined')
            return;
        var ytID =  getYouTubeID(url);
        if (!ytID.length)
            return;
        url = 'http://www.youtube.com/embed/' + ytID + '/?controls=0&showinfo=0&showsearch=0&modestbranding=1&theme=light';
        $(this).attr ('data-youtube', url);
        $(this).removeAttr ('href');
        $(this).attr ('data-rel', 'popup');
        //console.debug ('setting up video:' + url);
            
        $(this).click (function (e) {
            var urlYouTube = $(this).attr('data-youtube')
            //console.debug ('opening popup:' + urlYouTube);
            $('#video-iframe').attr('src', urlYouTube);
            $('#video-popup').popup('open');
            e.preventDefault();
            return (false);
        });
    });
});





    document.addEventListener("deviceready", onDeviceReady, false);

    function PopUpBrowser_Eq() {
         var ref = window.open('http://www.equisalud.com', '_blank', 'location=yes');
    }
    function PopUpBrowser_Calendula() {
         var ref = window.open('http://www.equisalud.com/es-es/productos/Calendula-1422.aspx', '_blank', 'location=yes');
    }
    



// Check if a new cache is available on page load.
window.addEventListener('load', function(e) {

  window.applicationCache.addEventListener('updateready', function(e) {
    if (window.applicationCache.status == window.applicationCache.UPDATEREADY) {
      // Browser downloaded a new app cache.
      // Swap it in and reload the page to get the new hotness.
      window.applicationCache.swapCache();
      if (confirm('A new version of this site is available. Load it?')) {
        window.location.reload();
      }
    } else {
      // Manifest didn't changed. Nothing new to server.
    }
  }, false);

}, false);

 <!-- boton 'back' activado por defecto -->
$(document).bind("mobileinit", function() {
      $.mobile.page.prototype.options.addBackBtn = true;
 });    

 <!-- función para enlaces externos -->
$(document).bind("mobileinit", function() {
	$.support.cors = true;
	$.mobile.allowCrossDomainPages = true;
	$.mobile.pushState = false;
});





    document.addEventListener("deviceready", onDeviceReady, false);
    function PopUpBrowser_Eq() {
         var ref = window.open('http://www.equisalud.com', '_blank', 'location=yes');
    }
    function PopUpBrowser_Fb() {
         var ref = window.open('http://www.facebook.com/EQUISALUD', '_blank', 'location=yes');
    }
	function PopUpBrowser_Yt() {
		var ref = window.open('http://www.youtube.com/user/SABIOSEQUISALUD', '_blank', 'location=yes');
	}



  app.initialize();



 <!-- boton 'back' activado por defecto -->
$(document).bind("mobileinit", function() {
      $.mobile.page.prototype.options.addBackBtn = true;
 });    

 <!-- función para enlaces externos -->
$(document).bind("mobileinit", function() {
	$.support.cors = true;
	$.mobile.allowCrossDomainPages = true;
	$.mobile.pushState = false;
});



function getYouTubeID (url) {
    var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/;
    var match = url.match(regExp);
    if (match&&match[7].length==11){
        return match[7];
    }
    return ('');
}

function scale( width, height, padding, border ) {
    var scrWidth = $( window ).width() - 30,
        scrHeight = $( window ).height() - 30,
        ifrPadding = 2 * padding,
        ifrBorder = 2 * border,
        ifrWidth = width + ifrPadding + ifrBorder,
        ifrHeight = height + ifrPadding + ifrBorder,
        h, w;

    if ( ifrWidth < scrWidth && ifrHeight < scrHeight ) {
        w = ifrWidth;
        h = ifrHeight;
    } else if ( ( ifrWidth / scrWidth ) > ( ifrHeight / scrHeight ) ) {
        w = scrWidth;
        h = ( scrWidth / ifrWidth ) * ifrHeight;
    } else {
        h = scrHeight;
        w = ( scrHeight / ifrHeight ) * ifrWidth;
    }

    return {
        'width': w - ( ifrPadding + ifrBorder ),
        'height': h - ( ifrPadding + ifrBorder )
    };
};

$(document).bind ('pageinit', function () {
    // setup the video popup
    $('#video-iframe')
        .attr( "width", 0 )
        .attr( "height", 0 );
              
    $('#video-popup').on({
        popupbeforeposition: function() {
            var size = scale( 497, 298, 15, 1 ),
                w = size.width,
                h = size.height;
        
            $( "#video-iframe" )
                .attr( "width", w )
                .attr( "height", h );
        },
        popupafterclose: function() {
            $( "#video-iframe" )
                .attr( "width", 0 )
                .attr( "height", 0 )
                .attr( "src", "" );    
        }
    });
        
    $('a.video-link').each (function (ix, item) {
        var url = $(this).attr ('href');
        if (typeof (url) === 'undefined')
            return;
        var ytID =  getYouTubeID(url);
        if (!ytID.length)
            return;
        url = 'http://www.youtube.com/embed/' + ytID + '/?controls=0&showinfo=0&showsearch=0&modestbranding=1&theme=light';
        $(this).attr ('data-youtube', url);
        $(this).removeAttr ('href');
        $(this).attr ('data-rel', 'popup');
        //console.debug ('setting up video:' + url);
            
        $(this).click (function (e) {
            var urlYouTube = $(this).attr('data-youtube')
            //console.debug ('opening popup:' + urlYouTube);
            $('#video-iframe').attr('src', urlYouTube);
            $('#video-popup').popup('open');
            e.preventDefault();
            return (false);
        });
    });
});





    document.addEventListener("deviceready", onDeviceReady, false);
	function PopUpBrowser_Eq() {
         var ref = window.open('http://www.equisalud.com', '_blank', 'location=yes');
    }
    function PopUpBrowser_Ginseng() {
         var ref = window.open('http://www.equisalud.com/es-es/productos/Ginseng-1470.aspx', '_blank', 'location=yes');
    }
	function PopUpBrowser_Eleuterococo() {
		var ref = window.open('http://www.equisalud.com/es-es/productos/Eleuterococo-1446.aspx', '_blank', 'location=yes');
	}
	function PopUpBrowser_Ajedrea() {
		var ref = window.open('http://www.equisalud.com/es-es/productos/Ajedrea-1392.aspx', '_blank', 'location=yes');
	}



 <!-- boton 'back' activado por defecto -->
$(document).bind("mobileinit", function() {
      $.mobile.page.prototype.options.addBackBtn = true;
 });    

 <!-- función para enlaces externos -->
$(document).bind("mobileinit", function() {
	$.support.cors = true;
	$.mobile.allowCrossDomainPages = true;
	$.mobile.pushState = false;
});



function getYouTubeID (url) {
    var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/;
    var match = url.match(regExp);
    if (match&&match[7].length==11){
        return match[7];
    }
    return ('');
}

function scale( width, height, padding, border ) {
    var scrWidth = $( window ).width() - 30,
        scrHeight = $( window ).height() - 30,
        ifrPadding = 2 * padding,
        ifrBorder = 2 * border,
        ifrWidth = width + ifrPadding + ifrBorder,
        ifrHeight = height + ifrPadding + ifrBorder,
        h, w;

    if ( ifrWidth < scrWidth && ifrHeight < scrHeight ) {
        w = ifrWidth;
        h = ifrHeight;
    } else if ( ( ifrWidth / scrWidth ) > ( ifrHeight / scrHeight ) ) {
        w = scrWidth;
        h = ( scrWidth / ifrWidth ) * ifrHeight;
    } else {
        h = scrHeight;
        w = ( scrHeight / ifrHeight ) * ifrWidth;
    }

    return {
        'width': w - ( ifrPadding + ifrBorder ),
        'height': h - ( ifrPadding + ifrBorder )
    };
};

$(document).bind ('pageinit', function () {
    // setup the video popup
    $('#video-iframe')
        .attr( "width", 0 )
        .attr( "height", 0 );
              
    $('#video-popup').on({
        popupbeforeposition: function() {
            var size = scale( 497, 298, 15, 1 ),
                w = size.width,
                h = size.height;
        
            $( "#video-iframe" )
                .attr( "width", w )
                .attr( "height", h );
        },
        popupafterclose: function() {
            $( "#video-iframe" )
                .attr( "width", 0 )
                .attr( "height", 0 )
                .attr( "src", "" );    
        }
    });
        
    $('a.video-link').each (function (ix, item) {
        var url = $(this).attr ('href');
        if (typeof (url) === 'undefined')
            return;
        var ytID =  getYouTubeID(url);
        if (!ytID.length)
            return;
        url = 'http://www.youtube.com/embed/' + ytID + '/?controls=0&showinfo=0&showsearch=0&modestbranding=1&theme=light';
        $(this).attr ('data-youtube', url);
        $(this).removeAttr ('href');
        $(this).attr ('data-rel', 'popup');
        //console.debug ('setting up video:' + url);
            
        $(this).click (function (e) {
            var urlYouTube = $(this).attr('data-youtube')
            //console.debug ('opening popup:' + urlYouTube);
            $('#video-iframe').attr('src', urlYouTube);
            $('#video-popup').popup('open');
            e.preventDefault();
            return (false);
        });
    });
});





    document.addEventListener("deviceready", onDeviceReady, false);
    function PopUpBrowser_Eq() {
         var ref = window.open('http://www.equisalud.com', '_blank', 'location=yes');
    }
    function PopUpBrowser_Llanten() {
         var ref = window.open('http://www.equisalud.com/es-es/productos/Llanten-1499.aspx', '_blank', 'location=yes');
    }
	function PopUpBrowser_Verbena() {
		var ref = window.open('http://www.equisalud.com/es-es/productos/Verbena-1566.aspx', '_blank', 'location=yes');
	}
	function PopUpBrowser_Malva() {
		var ref = window.open('http://www.equisalud.com/es-es/productos/Malva-1503.aspx', '_blank', 'location=yes');
	}


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
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicity call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
};

