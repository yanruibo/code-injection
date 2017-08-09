






















            document.addEventListener("deviceready", function(){ 
				loadBook(); 
			},true);
        


























            jQuery(function() {
                   var h = jQuery( window ).height();
                   var w = jQuery( window ).width();
                   var footerh = jQuery(".ui-footer").height();
                   jach = (h-footerh)-50;
                   jQuery('.sumisuracontent').css( "height", jach );                   
            });
            
            function calculateM() {
                if (jQuery('#cm').val() != ''){
                    jQuery('#sumisura2 #nextbuttonli').show();
                    
                    
                    a = parseFloat(jQuery('#cm').val());
                    z = parseFloat(jQuery('#valore').val());
                    b = a*z/20; //torace * numero di punti ogni cm
                    
                    
                    jQuery('#torace').html(parseInt(b));
                    jQuery('#manica').html(parseInt(b*29/50)); //29% del torace
                    jQuery('#polsino').html(parseInt(b*20/50)); //20%del torace           
                }
                else {
                    jQuery('#sumisura2 #nextbuttonli').hide();
                }
                
            }
        



            document.addEventListener("deviceready", function(){ loadLavori(); },true);
            









		$(document).ready(function() {
			$('#container').easyTabs({defaultContent:1});
		});
	




		$(document).ready(function() {
			$('#container').easyTabs({defaultContent:1});
		});
	




		$(document).ready(function() {
			$('#container').easyTabs({defaultContent:1});
		});
	

(function($){$.fn.easyTabs=function(option){var param=jQuery.extend({fadeSpeed:"fast",defaultContent:1,activeClass:'active'},option);$(this).each(function(){var thisId="#"+this.id;if(param.defaultContent==''){param.defaultContent=1;}
if(typeof param.defaultContent=="number")
{var defaultTab=$(thisId+" .tabs li:eq("+(param.defaultContent-1)+") a").attr('href').substr(1);}else{var defaultTab=param.defaultContent;}
$(thisId+" .tabs li a").each(function(){var tabToHide=$(this).attr('href').substr(1);$("#"+tabToHide).addClass('easytabs-tab-content');});hideAll();changeContent(defaultTab);function hideAll(){$(thisId+" .easytabs-tab-content").hide();}
function changeContent(tabId){hideAll();$(thisId+" .tabs li").removeClass(param.activeClass);$(thisId+" .tabs li a[href=#"+tabId+"]").closest('li').addClass(param.activeClass);if(param.fadeSpeed!="none")
{$(thisId+" #"+tabId).fadeIn(param.fadeSpeed);}else{$(thisId+" #"+tabId).show();}}
$(thisId+" .tabs li").click(function(){var tabId=$(this).find('a').attr('href').substr(1);changeContent(tabId);return false;});});}})(jQuery);

var filoscroll, ferroscroll;

jQuery(function() {

    jQuery.easing.custom = function (x, t, b, c, d) {
        var s = 0;
        if ((t/=d/2) < 1) {
            return c/2*(t*t*(((s*=(1.525))+1)*t - s)) + b;
        }
        return c/2*((t-=2)*t*(((s*=(1.525))+1)*t + s) + 2) + b;
    }

    var h = jQuery( window ).height();
    var footerh = jQuery(".ui-footer").height();
    var headerh = jQuery(".page_section").height();

    jQuery( '#filoscroll' ).css( "height", h-footerh-headerh);
    jQuery( '#ferroscroll' ).css( "height", h-footerh-headerh);
    var w = jQuery( 'ul.slidelist' ).width();
    var imgw = jQuery( '#ferroff2' ).width();

    var movwidth = (w-imgw/2);

    jQuery('div').live('pageshow',function(event, ui){

        var ferrofilato = decodeURIComponent(window.location.href).split("#");

        if (ferrofilato[1] == 'ferro') {
	        ferroscroll = new iScroll('ferroscroll', { desktopCompatibility: true, vScroll: true, hScroll: false, vScrollbar: false, hScrollbar: false, lockDirection: true });
			ferroscroll.refresh();
			ferroscroll.scrollTo(0, 100, 100);
            jQuery('.imgli img').css({
                'right': ''
            });
            jQuery('.imgli img').css({
                'left': movwidth
            });
            jQuery('.labelli span').css({
                'left': w*3/4
            });

            jQuery('.imgli img').off("vclick").on('vclick', function() {
                toshow = !jQuery(this).hasClass('showed');
                labelid = '#'+jQuery(this).attr('id').replace('ff', 'l');

                jQuery('.showed').animate({
                    'marginLeft' : "0px"
                }, 1000, 'custom', function() {
                    jQuery(this).css({
                        'marginLeft' : ''
                    });
                    jQuery(this).removeClass('showed');
                });

                if (toshow) {
                    jQuery(labelid).addClass('showed');
                    jQuery(labelid).animate({
                        'marginLeft' : "-="+(w/2)
                    }, 1000, 'custom');
                    jQuery(this).addClass('showed');
                    jQuery(this).animate({
                        'marginLeft' : "-="+(w/2)
                    }, 1000, 'custom');
                }
            });
        }
        else if (ferrofilato[1] == 'filato') {
        	filoscroll = new iScroll('filoscroll', { desktopCompatibility: true, vScroll: true, hScroll: false, vScrollbar: false, hScrollbar: false, lockDirection: true });
			filoscroll.refresh();
			filoscroll.scrollTo(0, 100, 100);
            jQuery('.imgli img').css({
                'left': '',
                'right': '',
                'marginLeft':'',
                'marginRight':''
            });

            jQuery('.imgli img').css({
                'right': imgw/2
            });

            jQuery('.labelli span').css({
                'left': -w/4
            });

            jQuery('.imgli img').off("vclick").on('vclick', function() {
                toshow = !jQuery(this).hasClass('showed');
                labelid = '#'+jQuery(this).attr('id').replace('ff', 'l');


                jQuery('.showed').animate({
                    'marginLeft' : "0px"
                },
                1000,
                'custom',
                function() {
                    jQuery(this).css({
                        'marginLeft':''
                    });
                    jQuery(this).removeClass('showed');
                });

                if (toshow) {
                    jQuery(labelid).addClass('showed');
                    jQuery(labelid).animate({
                        'marginLeft' : (w/2)
                    }, 1000, 'custom');

                    jQuery(this).addClass('showed');
                    jQuery(this).animate({
                        'marginLeft' : (w/2)
                    }, 1000, 'custom');
                }
            });
        }
    });


});


/*
 * Copyright (C) 2012 by Guillaume Charhon
 */
var inappbilling = { 

	// Initialize the plugin
    init: function (success, fail) { 
      return cordova.exec( success, fail, 
                           "InAppBillingPlugin", 
                           "init", ["null"]); 
    },
    // purchase an item
    purchase: function (success, fail, productId) { 
      return cordova.exec( success, fail, 
                           "InAppBillingPlugin", 
                           "purchase", [productId]); 
    },
    // get already own items
    getOwnItems: function (success, fail) { 
      return cordova.exec( success, fail, 
                           "InAppBillingPlugin", 
                           "ownItems", ["null"]); 
    },
    
    
};

var linkLocation,
actualDownload = '',
deviceType,
downloaddiv = null,
catalogurl = 'Books/catalog/',
categoryname= '',
closeDownloadTimer;
var bookScroll = null; 

jQuery(document).bind("mobileinit", function(){
    jQuery.mobile.allowCrossDomainPages = true;
});



jQuery(function() {
    jQuery("body").css("display", "none");
    jQuery("body").fadeIn(1000);

    jQuery("a.external").on('click', function(event){
        event.preventDefault();
        moveTo(this.href);
    });

});

function redirectPage() {
    window.location = linkLocation;
}

function hideLoading() {
    setTimeout('jQuery.mobile.loading(\'hide\' )', 1000);
}

function moveTo(url) {
    linkLocation = url;
    jQuery("body").fadeOut(1000, redirectPage);
}



function buybook(bookId) {

    jQuery.mobile.loading( 'show', {
        text: 'Collegamento a iTunes Attendere Prego!',
        textVisible: true
    });
    if (deviceType == 'iPad' || deviceType == 'iPhone') {
        if (actualDownload != '') {
            jQuery.mobile.loading('hide' );
            alert('Stai gi&agrave; effettuando un download, attendi il completamento grazie!');
            jQuery.mobile.loading( 'show', {
                text: 'Scarico '+ title,
                textVisible: true
            });
        }
        else {
            actualDownload = bookId;
            jQuery('#buy_product_'+actualDownload).addClass('waiting_download');
            /*window.plugins.inAppPurchaseManager.requestProductData(bookId, function(productId, title, description, price) {
                jQuery.mobile.loading('hide' );
                console.log("productId: " + productId + " title: " + title + " description: " + description + " price: " + price);
                jQuery.mobile.loading( 'show', {
                    text: 'Scarico '+ title,
                    textVisible: true
                });
                window.plugins.inAppPurchaseManager.makePurchase(productId, 1);
            }, function(id) {
                jQuery.mobile.loading('hide' );
                console.log("Invalid product id: " + id);
            }
            );*/
        }
    }
}

function startDownload(label) {
	if (downloaddiv != null) {
		closeDownload();
	}
	if (label == undefined)
		label = "Sto scaricando il video tutorial, un attimo di pazienza...";
	if (downloaddiv == null) {
		downloaddiv = jQuery('<div id="downloaddiv"><span id="downlabel">'+label+'</span><span id="downpercent"></span></div>');
        jQuery('body').append(downloaddiv);
		closeDownloadTimer = setTimeout('closeDownload()', 10000);
	}
}

function setDownloadAdvancement(percent) {
	var pperc = parseInt(percent*100);
//console.log('avanzamento : '+percent+ ' %');
	jQuery('#downpercent').html( pperc+ ' %');
	jQuery('#downpercent').css('background-position', (-200+(pperc*2)) + 'px center' );
	if (pperc >= 100) {
		closeDownload();
	}
	window.clearTimeout(closeDownloadTimer);
	closeDownloadTimer = setTimeout('closeDownload()', 10000);
}

function closeDownload() {
    actualDownload = '';
    jQuery('#downloaddiv').remove();
    downloaddiv = null;
    hideLoading();
    setTimeout('loadCategory()', 1000);
    window.clearTimeout(closeDownloadTimer);
}

function successHandler (result) { 
   console.log("SUCCESS: \r\n"+result ); 
} 

function errorHandler(error) { 
   console.log("ERROR: \r\n"+error ); 
} 

// Click on purchase button
function buybook(code){
	// make the purchase
	inappbilling.purchase(successHandler, errorHandler, code); 
}

// Click on ownedProducts button
function ownedProducts(){
	// Initialize the billing plugin
	inappbilling.getOwnItems(successHandler, errorHandler); 
}


var BASEDIR = 'Android/data/it.hachettefascicoli.iPunti/',
ROOT='',
SECTIONDIR,
isAjax = false;

function onBodyLoad() {
	document.addEventListener("deviceready", onDeviceReady, false);
}


// Cordova is ready
//
function onDeviceReady() {  
	deviceType = (navigator.userAgent.match(/iPad/i))  == "iPad" ? "iPad" : (navigator.userAgent.match(/iPhone/i))  == "iPhone" ? "iPhone" : (navigator.userAgent.match(/Android/i)) == "Android" ? "Android" : (navigator.userAgent.match(/BlackBerry/i)) == "BlackBerry" ? "BlackBerry" : "null";
  
	inappbilling.init(successHandler, errorHandler); 
	console.log(' Device is ready ');
    window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function(fileSystem) {
        ROOT = fileSystem.root.toURL()+'/';
        console.log(' ------->  ' +ROOT);
    }, fail);
    
    loadCategory();
    setTimeout(function(){
			var infoscroll = new iScroll('addvert', { desktopCompatibility: true, vScroll: true, hScroll: false, hScrollbar: false, lockDirection: true });
			bookScroll = new iScroll('book_list_container', { desktopCompatibility: true, vScroll: false, hScroll: true, vScrollbar: false, hScrollbar: false, lockDirection: true });
			if (bookScroll != null) bookScroll.refresh() ;
			infoscroll.refresh();
			infoscroll.scrollTo(0, 0, 1000);
	},1000);
	
}


function loadCategory() {
    jQuery('#book_list').html('');
    jQuery('#bookpop_list').html('');
    jQuery('#bookpop_list').listview('refresh');
    jQuery('#book_list').listview('refresh');

    var urlparts = decodeURIComponent(window.location.href).split("categoryname=");
    if (urlparts.length == 2){
        categoryname = urlparts[1];
    }
    jQuery.mobile.allowCrossDomainPages = true;

    var h = jQuery( window ).height();
    jQuery( "#utility_container" ).css( "height", h-2 );

    jQuery.ajax({
        url: catalogurl+'booklist.xml',
        type: "GET",
        dataType: 'text',
        success: function(response) {
            isAjax = true;
            renderCatalog(response);
        },
        error: function(x, t, m) {
            window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function(fileSystem) {
                //console.log(BASEDIR+catalogurl+'booklist.xml');
                //BASEDIR = fileSystem.root.toURL()+'/';
                fileSystem.root.getFile(BASEDIR + catalogurl + 'booklist.xml', null, function (fileEntry) {
                    fileEntry.file(function (file){
                        readAsText(file);
                    }, fail);
                }, fail);
            }, fail);
        }
    });
}

function readAsText(file) {
    var reader = new FileReader();
    reader.onloadend = function(evt) {
        renderCatalog(evt.target.result);
    };
    reader.readAsText(file);
}

function renderCatalog(xmlcatalog) {
    jQuery('#xmlcontent').remove();
    var $xml = jQuery('<div id="xmlcontent" />').html(xmlcatalog);
    if (categoryname != '' ) {
        jQuery('category[name='+categoryname+'] book', $xml).each(function() {
            bookExist(jQuery(this));
        });
    }
    else {
        if (jQuery('category', $xml).length == 1) {
            jQuery('category book', $xml).each(function() {
                bookExist(jQuery(this));
            });
        }
        else {
            jQuery('category', $xml).each(function() {
                bookExist(jQuery(this));
            });
        }
    }
}

function bookExist(book) {
    var bookurl = 'Books/' + book.attr('name') +'/book_index.xml';
    var filename = catalogurl + jQuery(book).attr('icon');
    //console.log('immagine --> '+filename);
    //                console.log('----->' + BASEDIR + bookurl);
    jQuery.ajax({
        url: bookurl,
        type: "GET",
        dataType: 'text',
        async: false,
        success: function(response) {
            liElem = '<li><a href="#" rel="external" class="external" onclick="moveTo(\'book.html?bookname='+jQuery(book).attr('name')+'\');"><span class="wrap-img"><img src="'+filename+'" alt="'+jQuery(book).attr('titolo')+'" /></span>'+jQuery(book).attr('titolo')+' <span class="button">leggi</span></a></li>';
            jQuery('#book_list').append(liElem);
            jQuery('#bookpop_list').append(liElem);
            jQuery('#bookpop_list').listview('refresh');
            jQuery('#book_list').listview('refresh');
            if (bookScroll != null) bookScroll.refresh() ; 
        },
        error: function(x, t, m) {

            var failCall = function() {
            	if ( jQuery(book).attr('prezzo') == '')  	
            		liElem = '<li id="buy_product_'+jQuery(book).attr('code')+'"><a href="javascript:void(0);" rel="external" onclick="buybook(\''+ jQuery(book).attr('code') +'\');"><span class="wrap-img"><img src="'+filename+'" alt="'+jQuery(book).attr('titolo')+'" /> </span>'+jQuery(book).attr('titolo')+'<span class="button">In download</span></a></li>';               
            	else
                	liElem = '<li id="buy_product_'+jQuery(book).attr('code')+'"><a href="javascript:void(0);" rel="external" onclick="buybook(\''+ jQuery(book).attr('code') +'\');"><span class="wrap-img"><img src="'+filename+'" alt="'+jQuery(book).attr('titolo')+'" /> </span>'+jQuery(book).attr('titolo')+'<span class="button">acquista '+ jQuery(book).attr('prezzo') +'&euro;</span></a></li>';
                jQuery('#book_list').append(liElem);
                jQuery('#bookpop_list').append(liElem);
                jQuery('#bookpop_list').listview('refresh');
                jQuery('#book_list').listview('refresh');
                if (bookScroll != null) bookScroll.refresh() ; 
            };

            window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function(fileSystem) {

                fileSystem.root.getFile(BASEDIR + bookurl, {
                    create: false
                }, function (fileEntry) {
                    fileEntry.file(function (file){
                        var reader = new FileReader();
                        reader.onloadend = function(evt) {
                            if(evt.target.result == null) {
                                failCall();
                            } else {
								liElem = '<li><a href="#" rel="external" class="external" onclick="moveTo(\'book.html?bookname='+jQuery(book).attr('name')+'\');"><span class="wrap-img"><img src="'+filename+'" alt="'+jQuery(book).attr('titolo')+'" /></span>'+jQuery(book).attr('titolo')+' <span class="button">leggi</span></a></li>';
                                jQuery('#book_list').append(liElem);
                                jQuery('#bookpop_list').append(liElem);
                                jQuery('#bookpop_list').listview('refresh');
                                jQuery('#book_list').listview('refresh');
                                if (bookScroll != null) bookScroll.refresh() ; 
                            }
                        };
                        reader.readAsText(file);
                    }, failCall);
                }, failCall);
            }, failCall);
        }
    });
}


function fail(evt) {
    console.log("Errore lettura file :"+evt);
}

jQuery(function() {
    var h = jQuery( window ).height();
    var w = jQuery( window ).width();
    var footerh = jQuery(".ui-footer").height();
    jach = h-footerh-6;
    jQuery('.jacq3').css( "height", jach );
    jQuery('.jacq5').css( "height", jach );
    if (w > 1000) {
        jQuery('.jacq3').css( "background-size", 'auto '+(jach-60)+'px');
        jQuery('.jacq5').css( "background-size", 'auto '+(jach-60)+'px');
    }
    else {
        jQuery('.jacq3').css( "background-size", 'auto '+(jach-20)+'px');
        jQuery('.jacq5').css( "background-size", 'auto '+(jach-20)+'px');
    }
    var footerh = jQuery(".ui-footer").height();

    jQuery( ".jacquard_help_text" ).css( "height", h-footerh-100 );


});

function touchJacq(elem, jshow, jhide) {

    jQuery.mobile.loading( 'show', {
        text: 'Carico Jacquard',
        textVisible: true
    });
    jQuery(elem).parents('ul').find('li').removeClass('current');
    jQuery(elem).parents('li').addClass('current');
    jQuery(jshow).addClass('hidden');
    jQuery(jhide).removeClass('hidden');
    hideLoading();
}

    var BASEDIR = 'Android/data/it.hachettefascicoli.iPunti/',
	ROOT='',
	SECTIONDIR,
    bookurl = 'Books/',
    actualPage = 0,
    actualSection = 0,
    oldSection = 0,
    lastSection = 1;
    var sectionobjects = new Array();
    var isAjax = false;
    var playing = false;
var gestureloaded=false;
	
    var renderCallbackString = '';


    function structure() {
        this.zIndex = '0';
        this.top = '0px';
        this.left = '0px';
        this.width = '100%';
        this.height = '100%';
        this.testi = new Array();
        this.immagini = new Array();
        this.video = new Array();
        this.poster = new Array();

        this.addImage = function(img) {
            this.immagini[this.immagini.length] = img;
        }

        this.addVideo = function(vid,post) {
            this.poster[this.video.length] = post;
            this.video[this.video.length] = vid;
        }

        this.addTesto = function(txt) {
            this.testi[this.testi.length] = txt;
        }
    }

    function pagina(numero, immagini, video, audio, testi, aree, sectUrl)
    {
        this.numero = numero;
        this.immagini = immagini;
        this.video = video;
        this.audio = audio;
        this.testi = testi;
        this.aree = aree;
        this.baseUrl = sectUrl;
        this.structures = new Array();
        this.videopos = 0;
        this.testopos = 0;
        this.immaginipos = 0;
        this.needTabControls = false;

        this.structurePagina = function () {
            $pagina = this;
            for (var i = 0;i<$pagina.aree.length;i++)
            {
                actualarea = jQuery($pagina.aree[i]);
                struct = new structure();
                struct.zIndex = actualarea.attr('zindex');
                if (jQuery( window ).width() > jQuery( window ).height()) {
                    size = actualarea.attr('landscape');
                }
                else {
                    size = actualarea.attr('portrait');
                }
                sizearray = size.split(',');
                struct.top = sizearray[0];
                struct.left = sizearray[1];
                struct.width = sizearray[2];
                struct.height = sizearray[3];
                struct.testi = new Array();
                $pagina.structures[actualarea.attr('position')] = struct;
            }

            actpos = $pagina.structures[jQuery($pagina.immagini).attr('position')];
            jQuery('immagine', jQuery($pagina.immagini)).each(function() {
                actpos.addImage(jQuery('<div class="imgContainer"><img id="immagine_' + i + '" src="' + ROOT + $pagina.baseUrl + jQuery(this).attr('src') + '" /></div>'));
            });

            actpos = $pagina.structures[jQuery($pagina.video).attr('position')];
            jQuery('movie', jQuery($pagina.video)).each(function(elem) {
                actpos.addVideo(ROOT+$pagina.baseUrl+jQuery(this).attr('src'), ROOT+$pagina.baseUrl+jQuery(this).attr('lightbox'));
            });

            jQuery($pagina.testi).each(function(elem) {
                posi = jQuery(this).attr('position');
                if (posi != undefined) {
                    actpos = $pagina.structures[posi];
                    actpos.addTesto(jQuery('<div class="textContainer"><div id="testo_'+i+'">'+jQuery(this).html()+'</div></div>'));
                }
            });

        }

        this.render = function (insection) {
            $result = jQuery('<div id="pagina_'+this.numero+'_'+insection+'" class="paginaobject" />');

            for(var pos in this.structures) {
                actpos = this.structures[pos];
                $pos = jQuery('<div id="position_'+pos+'_'+this.numero+'_'+insection+'" class="positionobject" style="position:absolute;top:'+actpos.top+';left:'+actpos.left+';width:'+actpos.width+';height:'+actpos.height+';z-index:'+actpos.zIndex+'"></div>');
                //for (var i = 0; i < actpos.immagini.length; i++)

                var elem = 0;
                if (actpos.immagini.length > 0) {
                    elem = elem +1;
                    $pos.append(actpos.immagini[this.immaginipos]);
                }

                //for (var i = 0; i < actpos.video.length; i++)
                if (actpos.video.length > 0) {
                    elem = elem +1;
                    renderCallbackString = '<script type="text/javascript">prepareVideo(\''+actpos.video[this.videopos]+'\', \''+actpos.poster[this.videopos]+'\');</script>';
                }

                // for (var i = 0; i < actpos.testi.length; i++)
                if (actpos.testi.length > 0) {
                    elem = elem +1;
                    $pos.append(actpos.testi[this.testopos]);
                }
                this.needTabControls = (elem >= 2);
                $result.append($pos);
            }
            return $result;
        }


        this.tabControls = function() {
            jQuery('#imagetab').addClass('hidden');
            jQuery('#videotab').addClass('hidden');
            jQuery('#testotab').addClass('hidden');

            if (this.needTabControls) {
                htmlString = '';
                if (actpos.immagini.length > 0)
                    jQuery('#imagetab').removeClass('hidden');

                if (actpos.video.length > 0)
                    jQuery('#videotab').removeClass('hidden');

                if (actpos.testi.length > 0)
                    jQuery('#testotab').removeClass('hidden');

                if (actpos.video.length > 0)
                    htmlString = "<script type=\"text/javascript\">jQuery('.active_button').removeClass('active_button');jQuery('#videotab').addClass('active_button');jQuery('.textContainer').addClass('hidden');jQuery('.imgContainer').addClass('hidden');jQuery('#videostorer').removeClass('hidden');</script>";
                else if (actpos.immagini.length > 0)
                    htmlString = "<script type=\"text/javascript\">jQuery('.active_button').removeClass('active_button');jQuery('#imagetab').addClass('active_button');jQuery('.textContainer').addClass('hidden');jQuery('.imgContainer').removeClass('hidden');removeVideo(false);</script>";
                else
                    htmlString = "<script type=\"text/javascript\">jQuery('.active_button').removeClass('active_button');jQuery('#testotab').addClass('active_button');jQuery('.textContainer').removeClass('hidden');jQuery('.imgContainer').addClass('hidden');removeVideo(false);</script>";
                return htmlString;
            }
            else
                return "<script type=\"text/javascript\">jQuery('.textContainer').removeClass('hidden');jQuery('.imgContainer').removeClass('hidden');removeVideo(false);</script>";
        }


        this.structurePagina();
    }

    function section(numero, sectUrl, pagineXml)
    {
        this.numero = numero;
        this.pagine = new Array();
        this.sectUrl = sectUrl;
        this.lastPage = this.pagine.length - 1;
        //console.log(JSON.stringify(pagineXml, null, 2));

        this.render = function (numpagina) {
            $result = jQuery('<div id="sectionobject_'+this.numero+'" class="sectionobject" />').append(this.pagine[numpagina].render(this.numero));
            return $result;
        }

        this.importXml = function(pagineXml) {
            $xml = jQuery('<div id="xmlcontent'+this.numero+'" style="display:none;"/>').html(pagineXml);
            jQuery('body').append($xml);
            //console.log($xml.html());
            var counter = 0;
            var $section = this;
            jQuery('#xmlcontent'+$section.numero+' pagine pagina').each(function(elem) {
                $imma = jQuery(this).find('immagini');
                $testo = jQuery(this).find('testo');
                $movies = jQuery(this).find('movies');
                $positions = jQuery(this).find('position');
                $audio = '';//jQuery(this).attr('reader_audio');

                $section.pagine[counter] = new pagina(counter, $imma, $movies, $audio, $testo, $positions,  $section.sectUrl);

                counter = counter +1;
                $section.lastPage = $section.pagine.length - 1;
            });
            jQuery('#xmlcontent'+this.numero).remove();
        }

        this.tabControls = function() {
            return this.pagine[actualPage].tabControls();
        }

        this.importXml(pagineXml);
    }


    jQuery( "#sectionslistcontainer" ).on({
        popupbeforeposition: function() {
            var h = jQuery( window ).height();
            var footerh = jQuery(".ui-footer").height();
            jQuery( "#sectionslistcontainer" ).css( "height", h-footerh-5 );
            jQuery( "#sectionsList" ).css( "height", h-footerh-5 );
        },
        popupafteropen: function(event, ui) {
            var h = jQuery( window ).height();
            var footerh = jQuery(".ui-footer").height();
            jQuery( "#page_section" ).css( "height", h-footerh);
            jQuery( "#mainpage" ).css( "height", h-footerh);
            jQuery('#camera_nav').css("bottom", '0px');
            if (playing)
                videoToPoster();
        },
        popupafterclose: function(event, ui) {
            var h = jQuery( window ).height();
            var footerh = jQuery(".ui-footer").height();
            jQuery( "#page_section" ).css( "height", h-footerh);
            jQuery( "#mainpage" ).css( "height", h-footerh);
            jQuery('#camera_nav').css("bottom", '0px');
            if (playing)
                posterToVideo();
        }
    });

    function loadBook() {
        var h = jQuery( window ).height();
        var footerh = jQuery(".ui-footer").height();
        // jQuery( "#mainSectionsList" ).css( "height", h-footerh );
        jQuery('#videostorer').css( "height", h-footerh );
        jQuery( "#videoplayer" ).css( "height", h-footerh );
        jQuery( "#page_section" ).css( "height", h-footerh);
        jQuery( "#mainpage" ).css( "height", h-footerh);
        var bookname = decodeURIComponent(window.location.href).split("bookname=");
        if (bookname.length == 2){
            if (bookname[1] == 'MagliaPuntiBase' || bookname[1] == 'UncinettoPuntiBase' ) {
				inappbilling.init(successHandler, errorHandler); 
			    setTimeout(function(){
						var infoscroll = new iScroll('addvert', { desktopCompatibility: true, vScroll: true, hScroll: false, hScrollbar: false, lockDirection: true });
						bookScroll = new iScroll('book_list_container', { desktopCompatibility: true, vScroll: false, hScroll: true, vScrollbar: false, hScrollbar: false, lockDirection: true });
						if (bookScroll != null) bookScroll.refresh() ;
						infoscroll.refresh();
						infoscroll.scrollTo(0, 0, 1000);
				},1000);
				loadCategory();
            }
            else {
            	gestureloaded=true;
	            jQuery("#mainpage").bind('swiperight',function(event, info){
	                gotoPage(jQuery('#prevbutton').data('section'), jQuery('#prevbutton').data('page'));
	            });
	            jQuery("#mainpage").bind('swipeleft',function(event, info){
	                gotoPage(jQuery('#nextbutton').data('section'), jQuery('#nextbutton').data('page'));
	            });
                jQuery( "#book_banner_container" ).remove();
            }
        
            bookurl = bookurl + bookname[1]+'/';
            //console.log(bookurl);
            jQuery.ajax({
                url: './'+bookurl+"book_index.xml",
                type: "GET",
                dataType: 'text',
                success: function(response) {
                    isAjax = true;
                    renderBook(response);
                    renderFooter();
                },
                error: function(x, t, m) {
                    isAjax = false;
                    var retryBook = function() {
                        loadBook();
                    };
                    window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function(fileSystem) {
                                             //  console.log(fileSystem.root.toURL()+'/');
                        ROOT = fileSystem.root.toURL()+'/';
                        fileSystem.root.getFile(BASEDIR+bookurl+"book_index.xml", {
                            create: false
                        }, function (fileEntry) {
                            fileEntry.file(function (file){
                                readAsText(file);
                            }, retryBook);
                        }, retryBook);
                        renderFooter();
                    }, retryBook);
                }
            });
        }
        else {
            console.log(decodeURIComponent(window.location.href));
            console.log('no book specified!');
            location.replace('./index.html');
        }
    }

    function readAsText(file) {
        var reader = new FileReader();
        reader.onloadend = function(evt) {
            renderBook(evt.target.result);
        };
        reader.readAsText(file);
    }


    function renderBook(xmlbook) {
        jQuery('#xmlcontent').remove();
        $xml = jQuery('<div id="xmlcontent" />').html(xmlbook);
        var pagecurrent = 1;
        var capitoli = 0;
        jQuery('capitolo', $xml).each(function() {
            var imageId = 'capitolo'+jQuery(this).attr('numero'),
            sectUrl = BASEDIR + bookurl+jQuery(this).attr('url')+'/',
            filename = ROOT + sectUrl + jQuery(this).attr('copertina'),
            lastPS = pagecurrent + jQuery(this).attr('pagine');
            //           if (pagecurrent == 1)
            //loadSection(jQuery(this).attr('numero') ,sectUrl, jQuery(this).attr('file'));
            liElem = '<li><a onclick="gotoPage('+jQuery(this).attr('numero')+' ,0)" id="section'+jQuery(this).attr('numero')+'" data-panel="main" rel="external" data-transition="flip" href="#">'+jQuery(this).attr('titolo')+'<img src="'+filename+'" id="'+imageId+'" alt="'+jQuery(this).attr('titolo')+'" /></a></li>';
            mainLiElem = '<li><a onclick="gotoPage('+jQuery(this).attr('numero')+' ,0)" data-panel="main" rel="external" data-transition="flip" href="#">'+jQuery(this).attr('titolo')+'<img src="'+filename+'" id="'+imageId+'" alt="'+jQuery(this).attr('titolo')+'" /></a></li>';
            pagecurrent = lastPS;
            jQuery('#sectionsList').append(liElem);
            jQuery('#mainSectionsList').append(mainLiElem);
            lastSection = parseInt(jQuery(this).attr('numero'));

            loadSection(jQuery(this).attr('numero'), sectUrl, jQuery(this).attr('file'));
            capitoli = capitoli+1;
        });


        if (capitoli == 1) {
            jQuery('#sectionlistli').remove();
            window.setTimeout(function() {
                gotoPage(1, 0);
            }, 100);
        }
        else {
            jQuery('#sectionsList').listview('refresh');
            jQuery('#pagetitleh1').html(jQuery('libro', $xml).attr('titolo'));
            jQuery('#mainSectionsList').listview('refresh');
            jQuery('#page_section').removeClass('hidden');
        }
    //console.log(jQuery('html').html());

    }

    function fail(evt) {
        console.log("Errore :"+evt.target.error.code);
    }

    function loadSection(num, url, filename) {
        //console.log(SECTIONDIR+filename);
        var $secnum = parseInt(num);
        var $sectUrl = url;

        if (isAjax) {
            jQuery.ajax({
                url: $sectUrl+filename,
                type: "GET",
                dataType: 'text',
                success: function(response) {
                    sectionobjects[$secnum] = new section($secnum, $sectUrl, response);
                // lastSection = $secnum;
                },
                error: function(x, t, m) {
                    console.log('unable to load resources');
                }
            });
        }
        else {
            window.requestFileSystem(
                LocalFileSystem.PERSISTENT,
                0,
                function(fileSystem) {
                    fileSystem.root.getFile(
                        $sectUrl+filename,
                        null,
                        function(fileEntry) {
                            fileEntry.file(function(file) {
                                var reader = new FileReader();
                                reader.onloadend = function(evt) {
                                    var res = evt.target.result;
                                    sectionobjects[$secnum] = new section($secnum, $sectUrl, res);
                                //    lastSection = $secnum;
                                }
                                reader.readAsText(file);
                            }, fail);
                        }, fail);
                } , fail);
        }
    }

    function gotoPage(sectionnum, pagenum) {
    
    	if (!gestureloaded)  {
        	gestureloaded=true;
            jQuery("#mainpage").bind('swiperight',function(event, info){
                gotoPage(jQuery('#prevbutton').data('section'), jQuery('#prevbutton').data('page'));
            });
            jQuery("#mainpage").bind('swipeleft',function(event, info){
                gotoPage(jQuery('#nextbutton').data('section'), jQuery('#nextbutton').data('page'));
            });
            jQuery( "#book_banner_container" ).remove();
        }
    
        $( "#pagenumber").removeClass('hidden');
        removeVideo(false);
        //console.log("goto page :"+pagenum+" in section :"+sectionnum);
        if (sectionnum == actualSection) {
            actualSection = sectionnum;
            if (pagenum > actualPage) {
                nextPage(pagenum);
            }
            else if (pagenum < actualPage) {
                prevPage(pagenum);
            }
        }
        else if (sectionnum > actualSection) {
            actualSection = sectionnum;
            nextPage(pagenum);
        }
        else if (sectionnum > 0 && sectionnum < actualSection) {
            actualSection = sectionnum;
            prevPage(pagenum);
        }
        actualPage = pagenum;
        renderFooter();
        $( "#sectionslistcontainer" ).popup( "close" );
    }

    function nextPage(pagenum) {
        var w = jQuery( window ).width();
        $oldhtml = jQuery('#page_section');
        jQuery('#page_section_old').remove();
        $oldhtml.attr('id', 'page_section_old');
        $oldhtml = jQuery('#page_section_old');
        $newhtml = jQuery('<div id="page_section" style="left:'+w+'px;"></div>');
        jQuery('#content').append($newhtml);
        jQuery('#page_section').append(sectionobjects[actualSection].render(pagenum));

        $oldhtml.animate({
            left: -w
        }, 1000, function() {
            jQuery('#page_section_old').remove();
        });

        $newhtml.animate({
            left: '0px'
        }, 1000, function() {
            jQuery('#page_section_old').remove();
            jQuery('#page_section').append(renderCallbackString);
            renderCallbackString = '';

        });
    }

    function prevPage(pagenum) {
        actualPage = pagenum;
        var w = jQuery( window ).width();
        jQuery('#page_section_old').remove();
        $oldhtml = jQuery('#page_section');
        $oldhtml.attr('id', 'page_section_old');
        $oldhtml = jQuery('#page_section_old');
        $newhtml = jQuery('<div id="page_section" style="left:-'+w+'px"></div>');

        jQuery('#content').append($newhtml);
        jQuery('#page_section').html(sectionobjects[actualSection].render(pagenum));

        $oldhtml.animate({
            left: w
        }, 1000, function() {
            jQuery('#page_section_old').remove();
        });


        $newhtml.animate({
            left: '0px'
        }, 1000, function() {
            jQuery('#page_section_old').remove();
            jQuery('#page_section').append(renderCallbackString);
            renderCallbackString = '';
        });

    }

    function renderFooter() {
        jQuery('#pagenumber').removeClass('onvideo');
        var h = jQuery( window ).height();
        var footerh = jQuery(".ui-footer").height();
        jQuery( '.insideimage').css( "maxHeight", ((h-footerh)*0.4)+'px');
        jQuery('#tabcontrols').html('');
        if (sectionobjects[actualSection] == undefined) {
            lpage = 0;
        }
        else {
            jQuery('#tabcontrols').html(sectionobjects[actualSection].tabControls());
            lpage = sectionobjects[actualSection].lastPage;
        }

        if (actualSection > 0 && actualPage == lpage && actualSection == lastSection) {
            jQuery('#nextbuttonli').addClass('hidden');
        }
        else {
            jQuery('#nextbutton').data('section', (actualPage == lpage ? actualSection+1 : actualSection) );
            jQuery('#nextbutton').data('page', (actualPage == lpage ? 0 : actualPage + 1) );
            jQuery('#nextbuttonli').removeClass('hidden');
        }
        if (actualPage == 0 && actualSection <= 1) {
            jQuery('#prevbuttonli').addClass('hidden');
        }
        else {
            jQuery('#prevbutton').data('section', (actualPage == 0 ? actualSection-1 : actualSection) );
            jQuery('#prevbutton').data('page', (actualPage == 0 ? sectionobjects[actualSection-1].lastPage : actualPage - 1) );
            jQuery('#prevbuttonli').removeClass('hidden');
        }

        jQuery('#pagenumber').html((actualPage+1)+'/'+(lpage+1));
    }

    function prepareVideo(src,thumb) {
        jQuery('#pagenumber').addClass('onvideo');
        playing = true;
		$('#videoplayer').attr("src", thumb);
		$('#videoplayer').attr("data-video", src);
		window.plugins.videoPlayer.play(src);
    }

    function removeVideo(toplay) {
        jQuery('#pagenumber').removeClass('onvideo');
        //   console.log(jQuery('#videostorer').html());
        //document.getElementById('videoplayer').pause();
        jQuery('#videostorer').addClass('hidden');
        jQuery('#videoplayer').removeClass('hidden');
        jQuery('#videostorer').css('background-position','-9999px');
        playing = toplay;
    }

    function videoToPoster() {
        var video = document.getElementById('videoplayer');
        //video.pause();
        jQuery('#videoplayer').addClass('hidden');
        jQuery('#videostorer').css('background-position','0px');
    }

    function posterToVideo() {
        jQuery('#videoplayer').removeClass('hidden');
        var video = document.getElementById('videoplayer');
       // video.play();
        jQuery('#videostorer').css('background-position','-9999px');
    }
    
    
    
    function loadCategory() {
    jQuery('#book_list').html('');
    jQuery('#book_list').listview('refresh');

    jQuery.ajax({
        url: catalogurl+'booklist.xml',
        type: "GET",
        dataType: 'text',
        success: function(response) {
            isAjax = true;
            renderCatalog(response);
        },
        error: function(x, t, m) {
            window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function(fileSystem) {
                fileSystem.root.getFile(BASEDIR + catalogurl + 'booklist.xml', null, function (fileEntry) {
                    fileEntry.file(function (file){
                        readCatalog(file);
                    }, fail);
                }, fail);
            }, fail);
        }
    });
}

function readCatalog(file) {
    var reader = new FileReader();
    reader.onloadend = function(evt) {
        renderCatalog(evt.target.result);
    };
    reader.readCatalog(file);
}

function renderCatalog(xmlcatalog) {
    jQuery('#xmlcontent').remove();
    var $xml = jQuery('<div id="xmlcontent" />').html(xmlcatalog);
    if (categoryname != '' ) {
        jQuery('category[name='+categoryname+'] book', $xml).each(function() {
            bookExist(jQuery(this));
        });
    }
    else {
        if (jQuery('category', $xml).length == 1) {
            jQuery('category book', $xml).each(function() {
                bookExist(jQuery(this));
            });
        }
        else {
            jQuery('category', $xml).each(function() {
                bookExist(jQuery(this));
            });
        }
    }
}
    
function bookExist(book) {
    var bookurl = 'Books/' + book.attr('name') +'/book_index.xml';
    var filename = catalogurl + jQuery(book).attr('icon');
    jQuery.ajax({
        url: bookurl,
        type: "GET",
        dataType: 'text',
        async: false,
        success: function(response) { },
        error: function(x, t, m) {

            var failCall = function() {
            	if ( jQuery(book).attr('prezzo') == '')  	
            		liElem = '<li id="buy_product_'+jQuery(book).attr('code')+'"><a href="javascript:void(0);" rel="external" onclick="buybook(\''+ jQuery(book).attr('code') +'\');"><span class="wrap-img"><img src="'+filename+'" alt="'+jQuery(book).attr('titolo')+'" /> </span>'+jQuery(book).attr('titolo')+'<span class="button">In download</span></a></li>';               
            	else
                	liElem = '<li id="buy_product_'+jQuery(book).attr('code')+'"><a href="javascript:void(0);" rel="external" onclick="buybook(\''+ jQuery(book).attr('code') +'\');"><span class="wrap-img"><img src="'+filename+'" alt="'+jQuery(book).attr('titolo')+'" /> </span>'+jQuery(book).attr('titolo')+'<span class="button">acquista '+ jQuery(book).attr('prezzo') +'&euro;</span></a></li>';
                jQuery('#book_list').append(liElem);
                jQuery('#book_list').listview('refresh');
                if (bookScroll != null) bookScroll.refresh() ; 
          
            };
  window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function(fileSystem) {

                fileSystem.root.getFile(BASEDIR + bookurl, {
                    create: false
                }, function (fileEntry) {
                    fileEntry.file(function (file){
                       
                    }, failCall);
                }, failCall);
            }, failCall);
        }
    });
}

function fail(evt) {
    console.log("Errore lettura file :"+evt);
}
    

// oggetti
var BASEDIR = 'Android/data/it.hachettefascicoli.iPunti/',
ROOT='';


var lavori = new Array();

var saveTimer;

function lavoro() {
    var id,data,nome,righe,diminuzioni,aumenti,ripetizioni,punti,giri,icona,ferro,filato;
}

Array.prototype.remove = function(from, to) {
    var rest = this.slice((to || from) + 1 || this.length);
    this.length = from < 0 ? this.length + from : from;
    return this.push.apply(this, rest);
};

jQuery( "#lavorisalvati" ).on({
    popupbeforeposition: function() {
        var h = jQuery( window ).height();
        var footerh = jQuery(".ui-footer").height();
        jQuery( "#lavorisalvati" ).css( "height", h-footerh-5 );
        jQuery( "#lavoriList" ).css( "height", h-footerh-5 );
    },
    popupafteropen: function(event, ui) {
        var h = jQuery( window ).height();
        var footerh = jQuery(".ui-footer").height();
        jQuery( "#page_section" ).css( "height", h-footerh);
        jQuery( "#mainpage" ).css( "height", h-footerh);
    },
    popupafterclose: function(event, ui) {
        var h = jQuery( window ).height();
        var footerh = jQuery(".ui-footer").height();
        jQuery( "#page_section" ).css( "height", h-footerh);
        jQuery( "#mainpage" ).css( "height", h-footerh);
    }
});

function loadLavori() {
    checkIfFileExists(BASEDIR+'worklist.xml');
    window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function(fileSystem) {
        fileSystem.root.getFile(BASEDIR+'worklist.xml', null, function (fileEntry) {
            fileEntry.file(function (file){
                readAsText(file);
            }, fail);
        }, fail);
    }, fail);
}

function readAsText(file) {
    var reader = new FileReader();
    reader.onloadend = function(evt) {
        loadWorkList(evt.target.result);
    };
    reader.readAsText(file);
    if (file.size == 0) {
        window.clearInterval(saveTimer);
        saveTimer = window.setInterval(function() {
            salva(false)
        },3000);
    }
}

function loadWorkList(xmlcatalog) {
    console.log('comunque arriva');
    var $xml = jQuery('<div id="xmlcontent" />').html(xmlcatalog);
    jQuery('lavoro', $xml).each(function() {
        lav = new lavoro();
        lav.id = jQuery(this).attr('id');
        lav.data = jQuery(this).attr('data');
        lav.nome = jQuery(this).attr('nome');
        lav.icona = jQuery(this).attr('icona');
        lav.righe = jQuery(this).attr('righe');
        lav.diminuzioni = jQuery(this).attr('diminuzioni');
        lav.aumenti = jQuery(this).attr('aumenti');
        lav.ripetizioni = jQuery(this).attr('ripetizioni');
        lav.punti = jQuery(this).attr('punti');
        lav.giri = jQuery(this).attr('giri');
        lav.ferro = jQuery(this).attr('ferro');
        lav.filato = jQuery(this).attr('filato');
        lavori[lav.id] = lav;
    });
    carica( parseInt(jQuery('lavori', $xml).attr('lastsave')) );
    window.clearInterval(saveTimer);
    saveTimer = window.setInterval(function() {
        salva(false)
    },3000);
    renderList();
}

function renderList() {
    jQuery('#lavoriList').html('');
    for (var i=0;i<lavori.length;i++) {
        liElem = '<li><a href="#" rel="external" data-transition="flip" onclick="carica('+lavori[i].id+');"><img src="img/contapunti/'+lavori[i].icona+'" alt="'+lavori[i].nome+'" /><span class="data">'+lavori[i].data+'</span><span class="nome">'+lavori[i].nome +'</span></a></li>';
        jQuery('#lavoriList').append(liElem);
    }
    jQuery('#lavoriList').listview('refresh');
}

function fail(evt) {
    console.log("Errore :"+evt.target.error.code);
}

function salva(loading) {
    if (loading) {
        jQuery.mobile.loading( 'show', {
            text: 'Salvataggio',
            textVisible: true
        });
    }
    num = parseInt(jQuery('#lavoro').val());
    if (lavori.length > num ) {
        lav = lavori[num];
    }
    else {
        num = lavori.length;
        lav = new lavoro();
        d = new Date();
        lav.data = d.getDay() + ' - '+ d.getMonth() + ' - ' + d.getFullYear();
    }
    lav.id = num;
    lav.nome = jQuery('#nome').val();
    lav.icona = jQuery('#icona').val();
    lav.righe = jQuery('#righe').val();
    lav.diminuzioni = jQuery('#diminuzioni').val();
    lav.aumenti = jQuery('#aumenti').val();
    lav.ripetizioni = jQuery('#ripetizioni').val();
    lav.punti = jQuery('#punti').val();
    lav.giri = jQuery('#giri').val();
    lav.ferro = jQuery('#ferro').val();
    lav.filato = jQuery('#filato').val();
    lavori[num] = lav;
    jQuery('#lavoro').val(num);
    renderList();
    saveList();
    if (loading) {
        hideLoading();
    }
}

function nuovo() {
    jQuery.mobile.loading( 'show', {
        text: 'Nuovo',
        textVisible: true
    });
    jQuery('#lavoro').val('');
    jQuery('#icona').val('empty.png');
    jQuery('#icona-img').attr('src', 'img/contapunti/empty.png');
    jQuery('#nome').val('');
    jQuery('#righe').val('0');
    jQuery('#diminuzioni').val('0');
    jQuery('#aumenti').val('0');
    jQuery('#ripetizioni').val('0');
    jQuery('#punti').val('0');
    jQuery('#giri').val('0');
    jQuery('#ferro').val('0');
    jQuery('#filato').val('');

    hideLoading();
}

function cancella() {
    jQuery.mobile.loading( 'show', {
        text: 'Cancella',
        textVisible: true
    });
    window.clearInterval(saveTimer);
    if (jQuery('#lavoro').val() != '') {
        num = parseInt(jQuery('#lavoro').val());
        lavori.remove(num);
        for (var i=0;i<lavori.length;i++) {
            lavori[i].id = i;
        }
    }
    if (lavori.length > 0)
        carica(0);
    else
        nuovo();
    renderList();
    saveList();
    window.clearInterval(saveTimer);
    saveTimer = window.setInterval(function() {
        salva(false)
    },3000);
    hideLoading();
}

function carica(num) {
    jQuery.mobile.loading( 'show', {
        text: 'Carica',
        textVisible: true
    });
    lav = lavori[num];
    jQuery('#lavoro').val(lav.id);
    jQuery('#icona').val(lav.icona);
    jQuery('#icona-img').attr('src', 'img/contapunti/'+lav.icona);
    jQuery('#nome').val(lav.nome);
    jQuery('#righe').val(lav.righe);
    jQuery('#diminuzioni').val(lav.diminuzioni);
    jQuery('#aumenti').val(lav.aumenti);
    jQuery('#ripetizioni').val(lav.ripetizioni);
    jQuery('#punti').val(lav.punti);
    jQuery('#giri').val(lav.giri);
    jQuery('#ferro').val(lav.ferro);
    jQuery('#filato').val(lav.filato);
    jQuery( "#lavorisalvati" ).popup( "close" );

    hideLoading();
}

function dimNum(elem) {
    if (parseInt(jQuery(elem).val()) > 0) {
        jQuery(elem).val(parseInt(jQuery(elem).val())-1);
    }
    else {
        jQuery(elem).val('0');
    }
}

function incNum(elem) {
    jQuery(elem).val(parseInt(jQuery(elem).val())+1);
}

function saveList() {
    if (window['LocalFileSystem'] != undefined) {
        console.log('salvo');
        window.requestFileSystem(LocalFileSystem.PERSISTENT,
            0,
            function (fileSystem) {
                fileSystem.root.getFile(BASEDIR+"worklist.xml",
                {
                    create: true,
                    exclusive: false
                },
                function (fileEntry) {
                    fileEntry.createWriter(
                        function (writer) {
                            writer.write(lavoriToXml());
                        }, fail);
                },
                fail);
            },
            fail);
    }
}

function lavoriToXml() {
    var xmlString = '<lavori lastsave="'+jQuery('#lavoro').val()+'">';
    for (var i=0;i<lavori.length;i++) {
        lav = lavori[i];
        xmlString = xmlString + '\n<lavoro id="'+lav.id+'" icona="'+lav.icona+'" data="' + lav.data + '" nome="' + lav.nome + '" righe="' + lav.righe + '" diminuzioni="' + lav.diminuzioni + '" aumenti="' + lav.aumenti + '" ripetizioni="' + lav.ripetizioni + '" punti="' + lav.punti + '" giri="' + lav.giri + '" ferro="' + lav.ferro + '" filato="' + lav.filato + '" />';
    }
    xmlString = xmlString + '\n</lavori>';
    return xmlString;
}

function chooseImg(iconame) {
    jQuery('#icona').val(iconame);
    jQuery('#icona-img').attr('src', 'img/contapunti/'+iconame);
    jQuery('#imgchooser').popup( "close" );
}


function checkIfFileExists(path){
    window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function(fileSystem){
        fileSystem.root.getFile(path, {
            create: false
        }, fileExists, fileDoesNotExist);
    }, getFSFail); //of requestFileSystem
}

function fileExists(fileEntry){
    console.log("File " + fileEntry.fullPath + " exists!");
}
function fileDoesNotExist(){
    console.log("file does not exist");
    salva(false);
}
function getFSFail(evt) {
    console.log(evt.target.error.code);
}

