









	//app.initialize();








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
        



    app.initialize();



















	//app.initialize();











	//app.initialize();











	//app.initialize();











	//app.initialize();











	//app.initialize();











	//app.initialize();











	//app.initialize();











	//app.initialize();










	//app.initialize();











	//app.initialize();


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
                spyOn(app, 'deviceready');
                app.initialize();
                helper.trigger(window.document, 'deviceready');
            });

            waitsFor(function() {
                return (app.deviceready.calls.length > 0);
            }, 'deviceready should be called once', 500);

            runs(function() {
                expect(app.deviceready).toHaveBeenCalled();
            });
        });
    });

    describe('deviceready', function() {
        it('should report that it fired', function() {
            spyOn(app, 'report');
            app.deviceready();
            expect(app.report).toHaveBeenCalledWith('deviceready');
        });
    });

    describe('report', function() {
        beforeEach(function() {
            var el = document.getElementById('stage');
            el.innerHTML = ['<div id="deviceready">',
                            '    <p class="status pending">Pending</p>',
                            '    <p class="status complete hide">Complete</p>',
                            '</div>'].join('\n');
        });

        it('should show the completion state', function() {
            app.report('deviceready');
            var el = document.querySelector('#deviceready .complete:not(.hide)');
            expect(el).toBeTruthy();
        });

        it('should hide the pending state', function() {
            app.report('deviceready');
            var el = document.querySelector('#deviceready .pending.hide');
            expect(el).toBeTruthy();
        });
    });
});











	//app.initialize();











	//app.initialize();











	//app.initialize();
  










	//app.initialize();











	//app.initialize();
  





var deviceType = '';
var speeed = 300;
var theBaseUrl = 'http://ardexaustralia.com';
var theBaseExtensuin = '/appdeploy/';
var globalBack = ['../index.html', theBaseUrl + theBaseExtensuin];
var connectionIsOk = false;
var initCounter = 1;
var theInterval;
var errorMessage = '<div class="connectionError">Failed to retrieve data from server <br />Please make sure you have an internet connection</div>'

function letsFixIframe() {
    var theFrame = $('.avPlayerBlock iframe');
    var theFrameWidth = theFrame.outerWidth();
    theFrame.outerHeight(theFrameWidth * 0.75);
}

function videoListShow() {
   /* var theVideoCats = $('#video-redirector li:not(.ui-li-divider)');
    theVideoCats.each(function() {
        $(this).find('a').append('<img src="' + theBaseUrl + theBaseExtensuin + '/images/youtube-grey.png" alt="Video Library" width="57"/>'); 
    });*/
}

function theCalcPadding() {
    if ($('.calculator').length) {
        if (!$('.calculator .cats').length) {
            $('.calculator').css({
                margin: '24px',
                overflow: 'hidden'
            });                        
        }
    };    
}

$(document).bind('ready', function(){    

    $('.category-listthe-videos li, .item-pagethe-videos ul li').live('click', function(e){
        e.preventDefault();
        e.stopPropagation();
        if ($(this).closest('.category-listthe-videos').length) {
            if (globalBack[globalBack.length - 1].indexOf(theBaseUrl + $(this).find('a').attr('href')) == -1) {
                globalBack.push(theBaseUrl + $(this).find('a').attr('href'));
            };             
        };
             
      /*  $('#video-redirector.rightPanel').load(theBaseUrl + $(this).find('a').attr('href') + ' .item-pagethe-videos', function(data, stat, req){
                if (stat == 'error') {
                    $('#video-redirector.rightPanel').html(errorMessage);
                } else {
                    $(document).trigger('create');                  
                }
        });*/
     });    
	
    $('input[type=number], input[type=text]').live('blur', function(){
        $("#ardex").scrollTop($("#ardex").scrollTop() + 0);
        for (var i = 0; i <1000; i++) {
           setTimeout(function(){
                $("#ardex").scrollTop($("#ardex").scrollTop() + 0);
           }, 100);
        };
    });

    $('.pos-related a').live('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        globalBack.push($(this).find('a').attr('href'));
        $('#redirector .rightPanel').load($(this).attr('href')+ ' #yoo-zoo', function(data, stat, req){
            if (stat == 'error') {
                $('#redirector .rightPanel').html(errorMessage);
            } else {
                $(document).trigger('pageinit');   
            }            
            
        });
    });        

    $('.avPlayerBlock iframe').live('resize', letsFixIframe);

    letsFixIframe();   

    $('.innerRightpanel.mainCalcPage a').live('click', function(e){
            e.preventDefault();
            e.stopPropagation();

           $('.innerRightpanel.mainCalcPage').load(theBaseUrl + $(this).attr('href') + ' .calculator', function(data, stat, req){
                if (stat == 'error') {
                } else {
                    $(document).trigger('create');                    
                }                     
            });          
    });     

  	$('#redirector .rightPanel li.ui-btn, .backBtn, .theCalc').live('click', function(e){
        var tempCalc = '';
        var tempBack = '#yoo-zoo';
        var loadingTarget = $('#redirector .rightPanel');

        if ($(this).hasClass('backBtn')) {
            if (globalBack.length > 2) {
                e.preventDefault();
                globalBack.pop(); 
                if ($('.calculator').length) {
                    if (globalBack[globalBack.length - 1].indexOf("list") != -1) {
                        tempBack = '.calculator';                        
                    }
                };
                if (globalBack[globalBack.length - 1].indexOf('videos') != -1) {
                    tempBack = '.category-listthe-videos';
                    loadingTarget = $('#video-redirector');
                }
                if ($('#the-locator').length) {
                    tempBack = '.item-page'
                };
                if ($('#sales-redirector').length || $('#the-tech').length) {
                    tempBack = '.blog';
                };
                if (true) {};
                loadingTarget.load(globalBack[globalBack.length - 1] + ' ' + tempBack, function(data, stat, req){
                    if (stat == 'error') {
                        loadingTarget.html(errorMessage);
                    } else {
                        if (tempBack == '.calculator') {
                            $(document).trigger('create');
                        } else if (tempBack == '.category-listthe-videos') {
                            videoListShow();
                            $(document).trigger('create');
                        } else {
                            $(document).trigger('pageinit');
                        }                    
                    }                     
                });                
            }    
        } else {
            e.preventDefault();
            if ($(this).hasClass('theCalc')) {
                tempCalc = ' .calculator';
            } else {
                tempCalc =  ' #yoo-zoo';
            }          
            if (globalBack[globalBack.length - 1].indexOf($(this).find('a').attr('href')) == -1) {
                    globalBack.push($(this).find('a').attr('href'));
            };
            $('#redirector .rightPanel').load($(this).find('a').attr('href') + tempCalc, function(data, stat, req){
                    if (stat == 'error') {
                        $('#redirector .rightPanel').html(errorMessage);
                    } else {
                        if (tempCalc == ' .calculator') {
                            $(document).trigger('create');
                        } else {
                            $(document).trigger('pageinit'); 
                        }                    
                    }
            });         
        }

        $('.calculator a').live('click', function(e){
                e.preventDefault();
                e.stopPropagation();
                if (globalBack[globalBack.length - 1].indexOf(theBaseUrl + $(this).attr('href')) == -1) {
                    globalBack.push(theBaseUrl + $(this).attr('href'));
                };

               $('#redirector .rightPanel').load(theBaseUrl + $(this).attr('href') + ' .calculator', function(data, stat, req){
                    if (stat == 'error') {
                    } else {
                        $(document).trigger('create');                    
                    }                     
                });          
        });

        $('.calculator input[type=button]').live('click', function(e){
                e.preventDefault();
                globalBack.pop(); 
                if (globalBack[globalBack.length - 1].indexOf('list') == -1) {
                    $('#redirector .rightPanel').load(globalBack[globalBack.length - 1] + ' #yoo-zoo', function(data, stat, req){
                        if (stat == 'error') {
                            $('#redirector .rightPanel').html(errorMessage);
                        } else {
                            $(document).trigger('pageinit');                    
                        }                     
                    }); 
                } else {
                     $('#redirector .rightPanel').load(globalBack[globalBack.length - 1] + ' .calculator', function(data, stat, req){
                        if (stat == 'error') {
                        } else {
                            $(document).trigger('create');                    
                        }                     
                    });                    
                }
           
        });

        $('.menuSales a, #salesrepLink').live('click', function(e){
            globalBack = ['../index.html', theBaseUrl + theBaseExtensuin];
            initCounter = 1; 
            $(document).trigger('create'); 
        });

	}); 

    $('.productsLink').live('click', function(e){
        globalBack = ['../index.html', theBaseUrl + theBaseExtensuin];
        $('#redirector .rightPanel').load(theBaseUrl + theBaseExtensuin + ' #yoo-zoo', function(data, stat, req){
            if (stat == 'error') {
                $('#redirector .rightPanel').html(errorMessage);
            } else {
                $(document).trigger('pageinit');                    
            }
        });        
    });

    $('ul.downloads li a, .theExternal, #ardex p a.the-exit, #theQuestionsWrapper a[target=_blank]').live('click', function (e) {
        if (!$(this).parent().hasClass('theCalc')) {
            e.preventDefault();
            e.stopPropagation();
            var theUrl = $(this).attr('href');
            var urlFileExtension = fileExtension(theUrl);
            if (urlFileExtension != 'pdf') {
                var ref = window.open(theUrl, '_blank', 'location=no');
                //window.plugins.childBrowser.showWebPage(encodeURI(theUrl), { showLocationBar: true, showAddress: false, showNavigationBar: true });
                
            } else {
                //window.plugins.childBrowser.showWebPage(theUrl, { showLocationBar: true, showAddress: false, showNavigationBar: true });
                var ref = window.open("http://docs.google.com/viewer?url=" + theUrl, '_blank', 'location=no');
                //window.plugins.childBrowser.showWebPage(encodeURI("http://docs.google.com/viewer?url=" + theUrl), { showLocationBar: true, showAddress: false, showNavigationBar: true });          
            }           
        };

    });    

});

$(document).bind('create', function () {

   //Specification Tool START

    var speeed = 600;

    $('.theQuestion a').click(function() {
        var theTarget = $(this).attr('href');
        if (theTarget.indexOf('spec') == -1) {
            $('.theQuestion').stop(true, true).slideUp(speeed);
            $(theTarget).delay(1).slideDown(speeed);
        } else {
            var specs = theTarget.split('|');
            $('.theQuestion').stop(true, true).slideUp(speeed);
            $('#theLoader').stop(true, true).fadeIn(speeed);
            for (var i = 0; i < specs.length; i++) {
                specs[i] = specs[i].replace('#', theBaseExtensuin);
                //var theTemp = $('<div />', {class: 'theTemp'});
                var theTemp = $('<div class="theTemp" />');
                if (i != specs.length - 1) {
                    console.log(theBaseUrl + specs[i] + ' .item-page');
                    theTemp.load(theBaseUrl + specs[i] + ' .item-page');
                    $('#theResult').append(theTemp).append('<br />');
                } else {
                    theTemp.load(theBaseUrl + specs[i] + ' .item-page', function() {
                        $('#theLoader').stop(true, true).fadeOut(speeed);
                        $('#theResult').append(theTemp);
                        $('#theResult').stop(true, true).slideDown(speeed);
                    });
                }
            }
        }
        return false;
    });

    //Specification Tool END

    theCalcPadding();   

    if ($('#the-contact-us .innerRightpanel').length) {
        var theImageSrcArdex = $('#the-contact-us .innerRightpanel img.theRight').attr('src');
        $('#the-contact-us .innerRightpanel img.theRight').attr('src', theBaseUrl + theImageSrcArdex);
    }

    if ($('.innerRightpanel.mainCalcPage').length) {
        $('.innerRightpanel.mainCalcPage li').each(function(){
            if ($(this).find('h3').text().indexOf('LIST') != -1) {
                $(this).remove();
            };
            
        });
    };    

    $('#video-redirector .img-fulltext-right img').after($('#video-redirector h2'));
    $('.calculator li a img').each(function(){
        var theSrcAttrImg = $(this).attr('src');
        $(this).attr('src', theBaseUrl + theSrcAttrImg);
        $(this).before($(this).closest('li').find('h3'));
    });
    clearInterval(theInterval);

    if ($('.avPlayerBlock iframe').length) {
          theInterval =  setInterval(letsFixIframe, 600);
    };  

    var catDescImgSrc = $('.category-desc img').attr('src');
    catDescImgSrc = theBaseUrl + catDescImgSrc;
    $('.category-desc img').attr('src', catDescImgSrc); 
});

$(document).bind('pageinit', function (dataa) {
    var storageCount = 0;
    var bubble = 0; 

    theCalcPadding();

    if ($('#the-about .innerRightpanel').length) {
        globalBack = ['../index.html', theBaseUrl + theBaseExtensuin + 'about'];
        $('#the-about .innerRightpanel').load(theBaseUrl + theBaseExtensuin + '/about/ .item-page', function(data, stat, req){
            if (stat == 'error') {
                $('#the-contact-us .innerRightpanel').html(errorMessage);
            } else {
                $(document).trigger('create');   
            }            
            
        });  
    };  

    if ($('#the-contact-us .innerRightpanel').length) {
        globalBack = ['../index.html', theBaseUrl + theBaseExtensuin + 'about'];
        $('#the-contact-us .innerRightpanel').load(theBaseUrl + theBaseExtensuin + '/contact/ .item-page', function(data, stat, req){
            if (stat == 'error') {
                $('#the-contact-us .innerRightpanel').html(errorMessage);
            } else {
                $(document).trigger('create');   
            }            
            
        });  
    };     

    if ($('.innerRightpanel.mainCalcPage').length) {
        globalBack = ['../index.html', theBaseUrl + theBaseExtensuin + 'calcs'];
        $('.innerRightpanel.mainCalcPage').load(theBaseUrl + theBaseExtensuin + '/calcs/ .category-listthe-calcs', function(data, stat, req){
            if (stat == 'error') {
                $('.innerRightpanel.mainCalcPage').html(errorMessage);
            } else {
                $(document).trigger('create');   
            }            
            
        });  
    };  

    $('.listmini, #the-vide-list-link').live('click', function(e){
        if ($(this).find('a').text() == 'Video Library') {
            globalBack = ['../index.html', theBaseUrl + theBaseExtensuin + 'videos'];
        };

        if ($(this).attr('id', 'the-vide-list-link')) {
            globalBack = ['../index.html', theBaseUrl + theBaseExtensuin + 'videos'];
        };
    });    

    $('.item-separator').remove();
    
    $('.ui-loader-default').hide()
                    .ajaxStart(function() {
                        $(this).show();
                    })
                    .ajaxStop(function() {
                        $(this).hide();
                    });

    if ($('.calculator').length) {
        $('.ui-btn-text h3').each(function(){
            $(this).after($(this).closest('.ui-btn-text').find('.ui-link-inherit img'));  
        });
    };

    //Server based Code

    $('.items h3.expand-please').each(function() {
        var theDesiredUrl = $(this).attr('data-url');
        $(this).closest('.ui-btn-text').children().wrapAll('<a class="ui-link-inherit" href="' + theDesiredUrl + '">');
        $(this).closest('.ui-btn-text').find('img').attr('width', '57');
      });

      $('.full-banner img').removeClass('ui-li-thumb').addClass('innerHeader');

      var theInnerTitleText = $('.item .the-title h3').text();
      $('.item .the-title h3').remove();
      if ($('.item .the-title').length) {
          $('.item .the-title').prepend(theInnerTitleText);    	  
      }

      $('.innerLeftpanel.pos-media img').removeClass('ui-li-thumb').addClass('productImg');
      $('.innerLeftpanel.pos-media>.last').addClass('theDownloads');

      //local codeS
      
      $('#redirector .rightPanel a').each(function(){
        var theTemp = '';
          if ($(this).attr('href').indexOf('http://') == -1) {
            theTemp = theBaseUrl + $(this).attr('href');            
          } else {
            theTemp = $(this).attr('href'); 
          }
    	  $(this).attr('href', theTemp);
      });
      
      $('#redirector .rightPanel img').each(function(){
        var theTemp = '';
        if ($(this).attr('src').indexOf('http://') == -1) {
            theTemp = theBaseUrl + $(this).attr('src');
        } else {
            theTemp = $(this).attr('src');
        }
    	  $(this).attr('src', theTemp);
      });            
      
      $('#productsLink').click(function(){
        globalBack = ['../index.html', theBaseUrl + theBaseExtensuin];
        });


  	if(dataa.currentTarget.URL.indexOf('redirector.html') == -1) {
  		$('#redirector .rightPanel').load(theBaseUrl + theBaseExtensuin + ' #yoo-zoo', function(data, stat, req){
            if (stat == 'error') {
                $('#redirector .rightPanel').html(errorMessage);
            } else {
                $('#redirector .rightPanel a').each(function(){
                  var theTemp = theBaseUrl + $(this).attr('href');
                  $(this).attr('href', theTemp);
                });                      
            }            		
  		});
  	}

    if(dataa.currentTarget.URL.indexOf('locator.html') == -1) {
        $('#the-locator.rightPanel').load(theBaseUrl + theBaseExtensuin + '/store/ .item-page', function(data, stat, req){
            if (stat == 'error') {
                $('#the-locator.rightPanel').html(errorMessage);
            } else {
                $(document).trigger('create');                       
            }              
        });
    }

    if (dataa.currentTarget.URL.indexOf('specifier.html') == -1) {
        $('#specifier .rightPanel').load(theBaseUrl + theBaseExtensuin + 'waterproofing-specification-tool/' + ' #theQuestionsWrapper', function(data, stat, req) {
            if (stat == 'error') {
                $('#specifier .rightPanel').html(errorMessage);
            } else {
                $(document).trigger('create');
            }
        });
    }

    if(dataa.currentTarget.URL.indexOf('salesrep.html') == -1) {
        $('#sales-redirector .innerRightpanel').load(theBaseUrl + theBaseExtensuin + '/sales/ .blog', function(data, stat, req){
            if (stat == 'error') {
                $('#sales-redirector .innerRightpanel').html(errorMessage);
            } else {               
                $(document).trigger('create');   
            }            
            
        });
    }    

    /*if(dataa.currentTarget.URL.indexOf('video.html') == -1) {
        $('#video-redirector.rightPanel').load(theBaseUrl + theBaseExtensuin + 'videos/ .category-listthe-videos', function(data, stat, req){
            if (stat == 'error') {
                $('#video-redirector.rightPanel').html(errorMessage);
            } else {
                videoListShow();
                $(document).trigger('create');   
            }            
            
        });
    }   */   

    if(dataa.currentTarget.URL.indexOf('bulletin.html') == -1) {
        $('#the-tech .innerRightpanel').load(theBaseUrl + theBaseExtensuin + '/tech/ .blog', function(data, stat, req){
            if (stat == 'error') {
                $('#the-tech .innerRightpanel').html(errorMessage);
            } else {
                $(document).trigger('create');   
            }            
            
        });
    }       

    $('.theDropMenu').css('height', '0px');

    if ($('.ui-header').css('position') == 'relative') {
        $('.ui-content').css('marginTop', '0px');
    }

    $("#home h2").fitText(0.8, { minFontSize: '35px', maxFontSize: '52px' })

    $('#home').parent('div[data-role="content"]').css('marginTop', '0px');

    $('.ui-collapsible-heading').on('click', function () {
        var deviceHeight = $(document).outerHeight();
        $('.leftPanel').css('minHeight', deviceHeight + 'px');
    });

    $('#homeIconsContainer img').click(function () {
        $(this).addClass('homeIconHover');
    });

    $('.rep .ui-collapsible .ui-collapsible .ui-collapsible-heading-toggle, .theDownloads.ui-collapsible .ui-collapsible-heading-toggle').click(function (event) {
        event.stopPropagation();
        event.preventDefault();
        return false;
    });

    $('.badge, .badge a').click(function (e) {
        e.preventDefault();
        return false;
    });

});


$(document).bind('pagebeforecreate', function () {
	$("[data-role=header]").fixedtoolbar({ updatePagePadding: false });
	$("[data-role=footer]").fixedtoolbar({ updatePagePadding: false });
});

$(document).bind('pagechange', function () {
    $('.theSideMenu li a, .theDropMenu li a').each(function () {
        if ($(this).height() >= 18 && $(this).height() <= 25) {
            $(this).addClass('oneLine');
        }
    });

    $('.theSideMenu li a, .theDropMenu li.listmini a').each(function () {
        if ($(this).height() >= 13 && $(this).height() <= 16) {
            $(this).addClass('oneLineInner');
        }
    });

    storageCount = 0;
    var theLocalItem = '';
    var theLocalKey = '';
    for (var i = 0; i < window.localStorage.length; i++) {
        theLocalKey = window.localStorage.key(i);
        theLocalItem = window.localStorage.getItem(theLocalKey);
        if (theLocalItem.toString() != 'null') {
            if ((theLocalKey.indexOf('ardex_') != -1) && (theLocalKey.indexOf('ardex_undefined') == -1)) {
                storageCount++;
            }

        }

    }

    bubble = '<div class="bubble">' + (storageCount) + '</div>';

    if (storageCount != 0) {
        $('#footerMaterialsLink').prepend(bubble);
        $('.menuClip a').each(function () {
            if ($(this).text() == 'Materials List') {
                $(this).closest('.menuClip ').prepend(bubble);
            }
        });
    }

    $('.dropMenu').on('click', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var dropMenu = $('.theDropMenu');
        if (dropMenu.css('height') == '0px') {
            if ($('.listmini').length) {
                $('.rightPanel').css('minHeight', '1232px');
                dropMenu.stop(true, true).animate({ height: '1232px' }, speeed);                
            } else {
                $('.rightPanel').css('minHeight', '599px');
                dropMenu.stop(true, true).animate({ height: '599px' }, speeed);                 
            }
            
        } else {
            $('.rightPanel').css('minHeight', '100%');
            dropMenu.stop(true, true).animate({ height: '0px' }, speeed);
        }
        return false;
    });

});

$(document).bind('pagechange', function () {
    if ($('.products .theDownloads').length) {
        $('.products .theDownloads:eq(0)').clone().prependTo('.innerRightpanel');
    }

    if (deviceType == 'Android') {
        $('#homeIconsContainer a, .backBtn').each(function () {
            $(this).attr('data-transition', 'none');
        });
    }

    if ($('.products .productImg').length) {
        $('.products .productImg:eq(0)').clone().prependTo('.innerRightpanel');
    }

    $('.cats .ui-li-heading').each(function () {
        if ($(this).height() >= 35 && $(this).height() <= 45) {
            $(this).addClass('twoLineCat');
        }
    });

    $(window).orientationchange(function () {
        $('.cats .ui-li-heading').each(function () {
            if ($(this).height() >= 35 && $(this).height() <= 45) {
                $(this).addClass('twoLineCat');
            } else {
                $(this).removeClass('twoLineCat');
            }
        });
    });

    var theItemH3 = $('.innerRightpanel > .theItem');

    theItemH3.each(function () {
        if ($(this).find('h3').text() == 'Case History') {
            $(this).find('h3').next().addClass('downloadLikeLink');
        }
    });

});

function fileExtension(url) {
    fileSplit = url.split('?')[0]; fileIndex = fileSplit.substr(fileSplit.lastIndexOf(".")+1); 
    return fileIndex; 
};

function onDeviceReady() {
    alert(device.model);
}

function initPushwoosh() {
    setTimeout(function(){
    var pushNotification = window.plugins.pushNotification;
 
    //set push notifications handler
    document.addEventListener('push-notification', function(event) {
        var title = event.notification.title;
        var userData = event.notification.userdata;
                                 
        if(typeof(userData) != "undefined") {
            console.warn('user data: ' + JSON.stringify(userData));
        }
                                     
        alert(title);
    });
 
    //initialize Pushwoosh with projectid: "GOOGLE_PROJECT_ID", appid : "PUSHWOOSH_APP_ID". This will trigger all pending push notifications on start.
    pushNotification.onDeviceReady({ projectid: "544469369192", appid : "912D1-59405" });
 
    //register for pushes
    pushNotification.registerDevice(
        function(status) {
            var pushToken = status;
            console.warn('push token: ' + pushToken);
        },
        function(status) {
            console.warn(JSON.stringify(['failed to register ', status]));
        }
    );
               },1000);

}

document.addEventListener("deviceready", initPushwoosh, false);


function calc(calculator){
	
	if(calculator == 'cal2')
	{
		var x="";
			var y="";
			
			
			var b1 = parseFloat(document.getElementById('b1').value);
			
			var b2 = parseFloat(document.getElementById('b2').value);
			
			var c = parseFloat(document.getElementById('cal2_T1').value);

			var b3 = ["", "4", "0", "0", "0", "3.16", "4", "3.08", "4", "2.85", "3.33", "2", "2", "2.5", "2.5", "2", "4", "1.33"];
			
	
			if (a != '0' && document.getElementById('cal2_T1').value!=''){
			
			document.getElementById("cal2_001").innerHTML = r(c*(b2/b1),0);
			}
			else{
				document.getElementById("cal2_001").innerHTML = '';
			}
	}
	else if(calculator == 'cal13')
	{
		var x="";
			var y="";
			
			
			var b1 = parseFloat(document.getElementById('b1').value);
			
			var b2 = parseFloat(document.getElementById('b2').value);
			
			var c = parseFloat(document.getElementById('cal13_T1').value);

			var b3 = ["", "4", "0", "0", "0", "3.16", "4", "3.08", "4", "2.85", "3.33", "2", "2", "2.5", "2.5", "2", "4", "1.33"];
			
	
			if (a != '0' && document.getElementById('cal13_T1').value!=''){
			
			document.getElementById("cal13_001").innerHTML = r(c*(b2/b1),0);
			}
			else{
				document.getElementById("cal13_001").innerHTML = '';
			}
	}
	else if(calculator == 'cal14')
	{
		var x="";
			var y="";
			
			
			
			var b1 = parseFloat(document.getElementById('b1').value);
			
			var b2 = parseFloat(document.getElementById('b2').value);
			
			var c = parseFloat(document.getElementById('cal14_T1').value);

			var b3 = ["", "4", "0", "0", "0", "3.16", "4", "3.08", "4", "2.85", "3.33", "2", "2", "2.5", "2.5", "2", "4", "1.33"];
			
	
			if (a != '0' && document.getElementById('cal14_T1').value!=''){
			
			document.getElementById("cal14_001").innerHTML = r(c*(b2/b1),0);
			}
			else{
				document.getElementById("cal14_001").innerHTML = '';
			}
	}
	else if(calculator == 'cal15')
	{
		var x="";
			var y="";
			
			
			var b1 = parseFloat(document.getElementById('b1').value);
			
			var b2 = parseFloat(document.getElementById('b2').value);
			
			var c = parseFloat(document.getElementById('cal15_T1').value);

			var b3 = ["", "4", "0", "0", "0", "3.16", "4", "3.08", "4", "2.85", "3.33", "2", "2", "2.5", "2.5", "2", "4", "1.33"];
			
	
			if (a != '0' && document.getElementById('cal15_T1').value!=''){
			
			document.getElementById("cal15_001").innerHTML = r(c*(b2/b1),0);
			}
			else{
				document.getElementById("cal15_001").innerHTML = '';
			}
	}
	else if(calculator == 'cal3'){
		var a = parseFloat(document.getElementById('product_value').value);
		var c = parseFloat(document.getElementById('cal3_T1').value);
		var d = parseFloat(document.getElementById('cal3_T2').value);
		
		if (a != '0' && document.getElementById('cal3_T1').value!='' && document.getElementById('cal3_T2').value!=''){
		
		document.getElementById("cal3_001").innerHTML = r((a*c)*d,2);
		document.getElementById("cal3_002").innerHTML = r((a*c)*d/20,0);
		}
		else{
			document.getElementById("cal3_001").innerHTML = '';
		}

	}
	else if(calculator == 'cal4'){
		var x="";
		var y="";
		var y1="";
		
		var b = parseFloat(document.getElementById('cal4_D2').value);
		var c = parseFloat(document.getElementById('cal4_T1').value);

		
		var b1 = parseFloat(document.getElementById('b1').value);
		var b2 = parseFloat(document.getElementById('b2').value);
		var b3 = parseFloat(document.getElementById('b3').value);
		
		var b4 = parseFloat(document.getElementById('b4').value);
		var b5 = parseFloat(document.getElementById('b5').value);
		
		var b6 = document.getElementById('b6').value;
		var b7 = document.getElementById('b7').value;

		
		if (b ==1) {
			x = b1;
			y = b6;
			y1 = b4;
		}
		if (b ==2) {
			x = b2;
			y = b7;
			y1 = b5;
		}
		if (b ==3) {
			x = b3;
		}


		if (x!=0){
			i = r(x*c,2);
		}
		else{
			i="NA";
		}

		z = r(i/y1,0); 
		
		

		if (isNaN(i)){
			document.getElementById("cal4_001").innerHTML= 'Not Applicable';
		}
		else{
			document.getElementById("cal4_001").innerHTML= i;
		}

		document.getElementById("cal4_002").innerHTML= y;


		if (isNaN(z)){
			document.getElementById("cal4_003").innerHTML= 'Not Applicable';
		}
		else{
			document.getElementById("cal4_003").innerHTML= z;
		}
		
		if(y1==0){
			document.getElementById("cal4_003").innerHTML= 'Not Applicable';
		}


	}
	else if(calculator == 'cal5'){
		var kgPerM="";
		var packSize="";
		
		
		var total = "";
		var appUnitReq = "";
		
		var b = 1;
		var areaToTiled = parseFloat(document.getElementById('cal5_T1').value);
		
		var kgPerM = parseFloat(document.getElementById('b1').value);
		var packSize = parseFloat(document.getElementById('b2').value);
		
		
		if(kgPerM != 0)
			total = r(areaToTiled * kgPerM,1);
		else
			total = "NA";
		
		appUnitReq = r(total/packSize,0);
		

		if (isNaN(total)){
			document.getElementById("cal5_001").innerHTML= 'Not Applicable';
		}
		else{
			document.getElementById("cal5_001").innerHTML= total;
		}

		document.getElementById("cal5_002").innerHTML= packSize +'Kg';


		if (isNaN(appUnitReq)){
			document.getElementById("cal5_003").innerHTML= 'Not Applicable';
		}
		else{
			document.getElementById("cal5_003").innerHTML= appUnitReq;
		}
		
	}
	else if(calculator == 'cal16'){
		var kgPerM="";
		var packSize="";
		
		
		var total = "";
		var appUnitReq = "";
		
		var b = 1;
		var areaToTiled = parseFloat(document.getElementById('cal16_T1').value);
		
		var kgPerM = parseFloat(document.getElementById('b1').value);
		var packSize = parseFloat(document.getElementById('b2').value);
		
		
		if(kgPerM != 0)
			total = r2(areaToTiled * kgPerM,1);
		else
			total = "NA";
		
		appUnitReq = r(total/packSize,0);
		

		if (isNaN(total)){
			document.getElementById("cal16_001").innerHTML= 'Not Applicable';
		}
		else{
			document.getElementById("cal16_001").innerHTML= total.toFixed(1);
		}

		document.getElementById("cal16_002").innerHTML= packSize +'Kg';


		if (isNaN(appUnitReq)){
			document.getElementById("cal16_003").innerHTML= 'Not Applicable';
		}
		else{
			document.getElementById("cal16_003").innerHTML= appUnitReq;
		}
		
	}
	else if(calculator == 'cal17'){
		var kgPerM="";
		var packSize="";
		
		
		var total = "";
		var appUnitReq = "";
		
		var b = 1;
		var areaToTiled = parseFloat(document.getElementById('cal17_T1').value);
		
		var kgPerM = parseFloat(document.getElementById('b1').value);
		var packSize = parseFloat(document.getElementById('b2').value);
		
		
		if(kgPerM != 0)
			total = r(areaToTiled * kgPerM,1);
		else
			total = "NA";
		
		appUnitReq = r(total/packSize,0);
		

		if (isNaN(total)){
			document.getElementById("cal17_001").innerHTML= 'Not Applicable';
		}
		else{
			document.getElementById("cal17_001").innerHTML= total;
		}

		document.getElementById("cal17_002").innerHTML= packSize +'Kg';


		if (isNaN(appUnitReq)){
			document.getElementById("cal17_003").innerHTML= 'Not Applicable';
		}
		else{
			document.getElementById("cal17_003").innerHTML= appUnitReq;
		}
		
	}
	else if(calculator == 'cal6'){
		
		var kgPerM="";
		var packSize="";
		
		
		var total = "";
		var appUnitReq = "";
		
		var b = 1;
		var areaToTiled = parseFloat(document.getElementById('cal6_T1').value);
		
		var kgPerM = parseFloat(document.getElementById('b1').value);
		var packSize = parseFloat(document.getElementById('b2').value);
		
		
		if(kgPerM != 0)
			total = r(areaToTiled * kgPerM,1);
		else
			total = "NA";
		
		appUnitReq = r(total/packSize,0);
		

		if (isNaN(total)){
			document.getElementById("cal6_001").innerHTML= 'Not Applicable';
		}
		else{
			document.getElementById("cal6_001").innerHTML= total;
		}

		document.getElementById("cal6_002").innerHTML= packSize +'Kg';


		if (isNaN(appUnitReq)){
			document.getElementById("cal6_003").innerHTML= 'Not Applicable';
		}
		else{
			document.getElementById("cal6_003").innerHTML= appUnitReq;
		}

	}
	else if(calculator == 'cal18'){
		
		var kgPerM="";
		var packSize="";
		
		
		var total = "";
		var appUnitReq = "";
		
		var b = 1;
		var areaToTiled = parseFloat(document.getElementById('cal18_T1').value);
		
		var kgPerM = parseFloat(document.getElementById('b1').value);
		var packSize = parseFloat(document.getElementById('b2').value);
		
		console.log(areaToTiled + ' ' + kgPerM);
		
		if(kgPerM != 0)
			total = r(areaToTiled * kgPerM,1);
		else
			total = "NA";
		
		appUnitReq = r(total/packSize,0);
		

		if (isNaN(total)){
			document.getElementById("cal18_001").innerHTML= 'Not Applicable';
		}
		else{
			document.getElementById("cal18_001").innerHTML= total.toFixed(1);
		}

		document.getElementById("cal18_002").innerHTML= packSize +'Kg';


		if (isNaN(appUnitReq)){
			document.getElementById("cal18_003").innerHTML= 'Not Applicable';
		}
		else{
			document.getElementById("cal18_003").innerHTML= appUnitReq;
		}

	}
	else if(calculator == 'cal19'){
		
		var kgPerM="";
		var packSize="";
		
		
		var total = "";
		var appUnitReq = "";
		
		var b = 1;
		var areaToTiled = parseFloat(document.getElementById('cal19_T1').value);
		
		var kgPerM = parseFloat(document.getElementById('b1').value);
		var packSize = parseFloat(document.getElementById('b2').value);
		
		
		if(kgPerM != 0)
			total = r(areaToTiled * kgPerM,1);
		else
			total = "NA";
		
		appUnitReq = r(total/packSize,0);
		

		if (isNaN(total)){
			document.getElementById("cal19_001").innerHTML= 'Not Applicable';
		}
		else{
			document.getElementById("cal19_001").innerHTML= total;
		}

		document.getElementById("cal19_002").innerHTML= packSize +'Kg';


		if (isNaN(appUnitReq)){
			document.getElementById("cal19_003").innerHTML= 'Not Applicable';
		}
		else{
			document.getElementById("cal19_003").innerHTML= appUnitReq;
		}

	}
	else if(calculator == 'cal7'){
		
		var kgPerM="";
		var packSize="";
		
		
		var total = "";
		var appUnitReq = "";
		
		var b = 1;
		var areaToTiled = parseFloat(document.getElementById('cal7_T1').value);
		
		var kgPerM = parseFloat(document.getElementById('b1').value);
		var packSize = parseFloat(document.getElementById('b2').value);
		
		
		if(kgPerM != 0)
			total = r(areaToTiled * kgPerM,1);
		else
			total = "NA";
		
		appUnitReq = r(total/packSize,0);
		

		if (isNaN(total)){
			document.getElementById("cal7_001").innerHTML= 'Not Applicable';
		}
		else{
			document.getElementById("cal7_001").innerHTML= total;
		}

		document.getElementById("cal7_002").innerHTML= packSize +'Kg';


		if (isNaN(appUnitReq)){
			document.getElementById("cal7_003").innerHTML= 'Not Applicable';
		}
		else{
			document.getElementById("cal7_003").innerHTML= appUnitReq;
		}

	}
	else if(calculator == 'cal20'){
		
		var kgPerM="";
		var packSize="";
		
		
		var total = "";
		var appUnitReq = "";
		
		var b = 1;
		var areaToTiled = parseFloat(document.getElementById('cal20_T1').value);
		
		var kgPerM = parseFloat(document.getElementById('b1').value);
		var packSize = parseFloat(document.getElementById('b2').value);
		
		
		if(kgPerM != 0)
			total = r(areaToTiled * kgPerM,1);
		else
			total = "NA";
		
		appUnitReq = r(total/packSize,0);
		

		if (isNaN(total)){
			document.getElementById("cal20_001").innerHTML= 'Not Applicable';
		}
		else{
			document.getElementById("cal20_001").innerHTML= total;
		}

		document.getElementById("cal20_002").innerHTML= packSize +'Kg';


		if (isNaN(appUnitReq)){
			document.getElementById("cal20_003").innerHTML= 'Not Applicable';
		}
		else{
			document.getElementById("cal20_003").innerHTML= appUnitReq;
		}

	}
	else if(calculator == 'cal8'){
		
		
		var area = parseFloat(document.getElementById('cal8_T1').value);
		var thickness = parseFloat(document.getElementById('cal8_T2').value);
		
		
		
		
		var unitPerM = parseFloat(document.getElementById('b1').value);
		var packSize = parseFloat(document.getElementById('b2').value);

		x = (unitPerM * area) * thickness;
		y = x/packSize;
		x = r(x,2);
		y = Math.ceil(y);
		
		if (isNaN(x)){
			document.getElementById("cal8_001").innerHTML= '';
		}
		else{
			document.getElementById("cal8_001").innerHTML= x;
		}

		if (isNaN(y)){
			document.getElementById("cal8_002").innerHTML= '';
		}
		else{
			document.getElementById("cal8_002").innerHTML= y;
		}

	}
	else if(calculator == 'cal21'){		
		var area = parseFloat(document.getElementById('cal21_T1').value);
		var thickness = parseFloat(document.getElementById('cal21_T2').value);
		
	
		
		var unitPerM = parseFloat(document.getElementById('b1').value);
		var packSize = parseFloat(document.getElementById('b2').value);

		x = (unitPerM * area) * thickness;
		y = x/packSize;
		x = r(x,2);
		y = Math.ceil(y);
		
		if (isNaN(x)){
			document.getElementById("cal21_001").innerHTML= '';
		}
		else{
			document.getElementById("cal21_001").innerHTML= x;
		}

		if (isNaN(y)){
			document.getElementById("cal21_002").innerHTML= '';
		}
		else{
			document.getElementById("cal21_002").innerHTML= y;
		}

	}
	else if(calculator == 'cal22'){
	
		var area = parseFloat(document.getElementById('cal22_T1').value);
		var thickness = parseFloat(document.getElementById('cal22_T2').value);
		
		
	
		
		var unitPerM = parseFloat(document.getElementById('b1').value);
		var packSize = parseFloat(document.getElementById('b2').value);

		x = (unitPerM * area) * thickness;
		y = x/packSize;
		x = r2(x,1);
		y = Math.ceil(y);
		
		if (isNaN(x)){
			document.getElementById("cal22_001").innerHTML= '';
		}
		else{
			document.getElementById("cal22_001").innerHTML= x.toFixed(1);
		}

		if (isNaN(y)){
			document.getElementById("cal22_002").innerHTML= '';
		}
		else{
			document.getElementById("cal22_002").innerHTML= y;
		}

	}
	else if(calculator == 'cal9'){
		var area = parseFloat(document.getElementById('cal9_T1').value);		
		var unitPerM = parseFloat(document.getElementById('b1').value);
		var pailSize = parseFloat(document.getElementById('b2').value);
		alert('area: ' + ' unit: ' + unitPerM + ' pailSize: ' + pailSize);
		x = (unitPerM * area);
		y = x/pailSize;
		x = r(x,2);
		y = Math.ceil(y);
		
		if (isNaN(x)){
			document.getElementById("cal9_001").innerHTML= '';
		}
		else{
			document.getElementById("cal9_001").innerHTML= x;
		}

		if (isNaN(y)){
			document.getElementById("cal9_002").innerHTML= '';
		}
		else{
			document.getElementById("cal9_002").innerHTML= y;
		}

	}
	else if(calculator == 'cal23'){
		var area = parseFloat(document.getElementById('cal23_T1').value);
		
		var unitPerM = parseFloat(document.getElementById('b1').value);
		var pailSize = parseFloat(document.getElementById('b2').value);

		x = (unitPerM * area);
		y = x/pailSize;
		x = r2(x,1);
		y = Math.ceil(y);
		
		if (isNaN(x)){
			document.getElementById("cal23_001").innerHTML= '';
		}
		else{
			document.getElementById("cal23_001").innerHTML= x.toFixed(1);
		}

		if (isNaN(y)){
			document.getElementById("cal23_002").innerHTML= '';
		}
		else{
			document.getElementById("cal23_002").innerHTML= y;
		}

	}
	else if(calculator == 'cal24'){
		var area = parseFloat(document.getElementById('cal24_T1').value);
		
		var unitPerM = parseFloat(document.getElementById('b1').value);
		var pailSize = parseFloat(document.getElementById('b2').value);

		x = (unitPerM * area);
		y = x/pailSize;
		x = r2(x,1);
		y = Math.ceil(y);
		
		if (isNaN(x)){
			document.getElementById("cal24_001").innerHTML= '';
		}
		else{
			document.getElementById("cal24_001").innerHTML= x.toFixed(1);
		}

		if (isNaN(y)){
			document.getElementById("cal24_002").innerHTML= '';
		}
		else{
			document.getElementById("cal24_002").innerHTML= y;
		}

	}
	else if(calculator == 'cal25'){
		var area = parseFloat(document.getElementById('cal25_T1').value);
		
		var unitPerM = parseFloat(document.getElementById('b1').value);
		var pailSize = parseFloat(document.getElementById('b2').value);

		x = (unitPerM * area);
		y = x/pailSize;
		x = r(x,2);
		y = Math.ceil(y);
		
		if (isNaN(x)){
			document.getElementById("cal25_001").innerHTML= '';
		}
		else{
			document.getElementById("cal25_001").innerHTML= x;
		}

		if (isNaN(y)){
			document.getElementById("cal25_002").innerHTML= '';
		}
		else{
			document.getElementById("cal25_002").innerHTML= y;
		}

	}
	else if(calculator == 'cal1'){

		var a = parseFloat(document.getElementById('cal1_T1').value);
		var b = parseFloat(document.getElementById('cal1_T2').value);
		var c =  parseFloat(document.getElementById('cal1_T3').value);
		var d =  parseFloat(document.getElementById('cal1_T4').value);
		
		var f =  parseFloat(document.getElementById('cal1_T5').value);

		var k = ["","2.1","2","1.95","1.95","1.65","1.67","1.5","1.81"];

		
		var e = parseFloat(document.getElementById('product_value').value);
		
		x = r((((a+b)*c*d)/(a*b))*e,3);
		y = r((((a+b)*c*d)/(a*b))*e*1.15,3);

		z = r(y * f,0);
		
	 document.getElementById("cal1_001").innerHTML= x;
	 document.getElementById("cal1_002").innerHTML= y;
	 document.getElementById("cal1_003").innerHTML= z;
	 
	 //Jono added
	}
	else if(calculator == 'cal12'){
			var l = document.getElementById("product_value").value; //Silicone Bead Diameter lookup
			
			var a = parseFloat(document.getElementById('T1').value); 
			
			
			x = r(a/l,0);
			
			if (isNaN(x)){
				document.getElementById("001").innerHTML= '';
			}
			else{
				document.getElementById("001").innerHTML= x;
			}
	
	 //Jono added
	}else{
		var w =15; //wastage
		var v = parseFloat(document.getElementById('product_value').value); //fine volume
								
		var a = parseFloat(document.getElementById('T1').value); 
		var b = parseFloat(document.getElementById('T2').value);
		var c =  parseFloat(document.getElementById('T3').value);
		var d =  parseFloat(document.getElementById('T4').value);
		var e =  parseFloat(document.getElementById('T5').value);
								
								
		x = r(((100+w)*(a+b)*c*d*e)/(100*a*b*v),2);
		y = r(x,0);
								
		if (isNaN(x)){
			document.getElementById("001").innerHTML= '';
			document.getElementById("002").innerHTML= '';
		}
		else{
			document.getElementById("001").innerHTML= x;
			document.getElementById("002").innerHTML= y;
		}
	}
	
}
	
	
function r(num, dec) {

	var result = Math.ceil(num*Math.pow(10,dec))/Math.pow(10,dec);
	return result;
}

function r2(num, dec) {

	var result = Math.round(num*Math.pow(10,dec))/Math.pow(10,dec);
	return result;
}

	

jQuery(function(){

	jQuery("#cal1_btn").live("click", function(event){

		var itemName	= jQuery('#product_name').val();
		var itemId 		= jQuery('#product_id').val();
		
		var required_qty = jQuery('#cal1_003').html();
		var hiddencat    = jQuery('#hiddencat4').val();
		
		var qty_type = required_qty > 1 ? "Kgs" : "Kg";
		
		var color = jQuery('#preferredColor').find(':selected').text();
		var color_id = jQuery('#preferredColor').find(':selected').val();
		
		//no calculator - add to list directly!
		if(jQuery('#cal1_num').val()>0){
			required_qty = jQuery('#cal1_num').val();
			var product_unit =  jQuery('#product_unit').val();
			if(product_unit) qty_type = required_qty>1? product_unit+'s' : product_unit;
		}
		
		var json_color = {
			id: color_id,
			name: color
		};
		
		var obj = {
			itemName: itemName,
			itemId  : itemId,
			required_qty : required_qty,
			colorName: color,
			qty_type: qty_type	
		};
		
		
		localStorage.setItem("ardex_"+itemId, JSON.stringify(obj));
		//history.back();
		return false;
	});
	
	jQuery("#cal2_btn").live("click", function(event){	
		
		var itemName = jQuery('#product_name').val();
		var itemId = jQuery('#product_id').val();
		
		var required_qty = jQuery('#cal2_001').html();
		var hiddencat    = jQuery('#hiddencat1').val();
		
		var qty_type = required_qty > 1 ? "Bags" : "Bag";
		
		//no calculator - add to list directly!
		if(jQuery('#cal2_num').val()>0){
			required_qty = jQuery('#cal2_num').val();
			var product_unit =  jQuery('#product_unit').val();
			if(product_unit) qty_type = required_qty>1? product_unit+'s' : product_unit;
		}
		
		var obj = {
			itemName: itemName,
			itemId  : itemId,
			required_qty : required_qty,
			qty_type: qty_type	
		};
		
		
		localStorage.setItem("ardex_"+itemId, JSON.stringify(obj));
		////history.back();
		return false;
	});
	
	jQuery("#cal3_btn").live("click", function(event){	
		
		var itemName = jQuery('#product_name').val();
		var itemId = jQuery('#product_id').val();
		
		var required_qty = jQuery('#cal3_002').html();
		var hiddencat    = jQuery('#hiddencat2').val();
		
		var qty_type = required_qty > 1 ? "Bags" : "Bag";
		
		//no calculator - add to list directly!
		if(jQuery('#cal3_num').val()>0){
			required_qty = jQuery('#cal3_num').val();
			var product_unit =  jQuery('#product_unit').val();
			if(product_unit) qty_type = required_qty>1? product_unit+'s' : product_unit;
		}
		
		var obj = {
			itemName: itemName,
			itemId  : itemId,
			required_qty : required_qty,
			qty_type: qty_type	
		};
		
		
		localStorage.setItem("ardex_"+itemId, JSON.stringify(obj));
		////history.back();
		return false;
	});
	
	jQuery("#cal5_btn").live("click", function(event){	
		
		var itemName = jQuery('#product_name').val();
		var itemId = jQuery('#product_id').val();
		
		var required_qty = jQuery('#cal5_003').html();
		var hiddencat    = jQuery('#hiddencat3').val();
		
		var qty_type = required_qty > 1 ? "Kits" : "Kit";
		
		//no calculator - add to list directly!
		if(jQuery('#cal5_num').val()>0){
			required_qty = jQuery('#cal5_num').val();
			var product_unit =  jQuery('#product_unit').val();
			if(product_unit) qty_type = required_qty>1? product_unit+'s' : product_unit;
		}
		
		var obj = {
			itemName: itemName,
			itemId  : itemId,
			required_qty : required_qty,
			qty_type: qty_type	
		};
		
		
		localStorage.setItem("ardex_"+itemId, JSON.stringify(obj));
		//history.back();
		return false;
	});
	jQuery("#cal6_btn").live("click", function(event){

		var itemName = jQuery('#product_name').val();
		var itemId = jQuery('#product_id').val();
		
		var required_qty = jQuery('#cal6_003').html();
		var hiddencat    = jQuery('#hiddencat3').val();
		
		var qty_type = required_qty > 1 ? "Bags" : "Bag";
		
		//no calculator - add to list directly!
		if(jQuery('#cal6_num').val()>0){
			required_qty = jQuery('#cal6_num').val();
			var product_unit =  jQuery('#product_unit').val();
			if(product_unit) qty_type = required_qty>1? product_unit+'s' : product_unit;
		}
		
		var obj = {
			itemName: itemName,
			itemId  : itemId,
			required_qty : required_qty,
			qty_type: qty_type	
		};
		
		
		
		localStorage.setItem("ardex_"+itemId, JSON.stringify(obj));
		//history.back();
		return false;
	});
	jQuery("#cal7_btn").live("click", function(event){	
		
		var itemName = jQuery('#product_name').val();
		var itemId = jQuery('#product_id').val();
		
		var required_qty = jQuery('#cal7_003').html();
		var hiddencat    = jQuery('#hiddencat3').val();
		
		var qty_type = required_qty > 1 ? "Kits" : "Kit";
		
		//no calculator - add to list directly!
		if(jQuery('#cal7_num').val()>0){
			required_qty = jQuery('#cal7_num').val();
			var product_unit =  jQuery('#product_unit').val();
			if(product_unit) qty_type = required_qty>1? product_unit+'s' : product_unit;
		}
		
			var obj = {
			itemName: itemName,
			itemId  : itemId,
			required_qty : required_qty,
			qty_type: qty_type	
		};
		
		
		localStorage.setItem("ardex_"+itemId, JSON.stringify(obj));
		//history.back();
		return false;
		
	});
	

	$("#cal8_btn").live("click", function(event){	
		var itemName = jQuery('#product_name').val();
		var itemId = jQuery('#product_id').val();
		
		var required_qty = jQuery('#cal8_002').html();
		var hiddencat    = jQuery('#hiddencat2').val();
		
		var qty_type = required_qty > 1 ? "Bags" : "Bag";
		
		//no calculator - add to list directly!
		if(jQuery('#cal8_num').val()>0){
			required_qty = jQuery('#cal8_num').val();
			var product_unit =  jQuery('#product_unit').val();
			if(product_unit) qty_type = required_qty>1? product_unit+'s' : product_unit;
		}
		
		var obj = {
			itemName: itemName,
			itemId  : itemId,
			required_qty : required_qty,
			qty_type: qty_type	
		};
		
		
		localStorage.setItem("ardex_"+itemId, JSON.stringify(obj));
		//history.back();
		return false;

	});
	jQuery("#cal9_btn").live("click", function(event){	
		
		var itemName = jQuery('#product_name').val();
		var itemId = jQuery('#product_id').val();
		
		var required_qty = jQuery('#cal9_002').html();
		var hiddencat    = jQuery('#hiddencat2').val();
		
		var qty_type = required_qty > 1 ? "Pails" : "Pail";
		
		//no calculator - add to list directly!
		if(jQuery('#cal9_num').val()>0){
			required_qty = jQuery('#cal9_num').val();
			var product_unit =  jQuery('#product_unit').val();
			if(product_unit) qty_type = required_qty>1? product_unit+'s' : product_unit;
		}
		
		
		var obj = {
			itemName: itemName,
			itemId  : itemId,
			required_qty : required_qty,
			qty_type: qty_type	
		};
		
		
		localStorage.setItem("ardex_"+itemId, JSON.stringify(obj));
		//history.back();
		return false;
	});
	

	jQuery("#cal10_btn").live("click", function(event){
		console.log("#cal10_btn");
		var itemName	= jQuery('#product_name').val();
		var itemId 		= jQuery('#product_id').val();
		
		var required_qty = jQuery('#002').html();
		var hiddencat    = jQuery('#hiddencat4').val();
		
		var qty_type = required_qty > 1 ? "Kits" : "Kit";
		
		//no calculator - add to list directly!
		if(jQuery('#cal10_num').val()>0){
			required_qty = jQuery('#cal10_num').val();
			var product_unit =  jQuery('#product_unit').val();
			if(product_unit) qty_type = required_qty>1? product_unit+'s' : product_unit;
		}
		
		var color = jQuery('#preferredColor').find(':selected').text();
		var color_id = jQuery('#preferredColor').find(':selected').val();
		
		var json_color = {
			id: color_id,
			name: color
		};
		
		var obj = {
			itemName: itemName,
			itemId  : itemId,
			required_qty : required_qty,
			colorName: color,
			qty_type: qty_type	
		};
		
		
		localStorage.setItem("ardex_"+itemId, JSON.stringify(obj));
		//history.back();
		return false;
	});
	
	jQuery("#cal11_btn").live("click", function(event){

		var itemName	= jQuery('#product_name').val();
		var itemId 		= jQuery('#product_id').val();
		
		var required_qty = jQuery('#002').html();
		var hiddencat    = jQuery('#hiddencat4').val();
		
		var qty_type = required_qty > 1 ? "Kits" : "Kit";
		
		var color = jQuery('#preferredColor').find(':selected').text();
		var color_id = jQuery('#preferredColor').find(':selected').val();
		
		//no calculator - add to list directly!
		if(jQuery('#cal11_num').val()>0){
			required_qty = jQuery('#cal11_num').val();
			var product_unit =  jQuery('#product_unit').val();
			if(product_unit) qty_type = required_qty>1? product_unit+'s' : product_unit;
		}
		
		var json_color = {
			id: color_id,
			name: color
		};
		
		var obj = {
			itemName: itemName,
			itemId  : itemId,
			required_qty : required_qty,
			colorName: color,
			qty_type: qty_type	
		};
		
		
		localStorage.setItem("ardex_"+itemId, JSON.stringify(obj));
		//history.back();
		return false;
	});
	
	jQuery("#cal12_btn").live("click", function(event){
		console.log('#cal12_btn');
		var itemName	= jQuery('#product_name').val();
		var itemId 		= jQuery('#product_id').val();
		
		var required_qty = jQuery('#001').html();
		var hiddencat    = jQuery('#hiddencat4').val();
		
		var qty_type = required_qty > 1 ? "Cartridges" : "Cartridge";
		
		var color = jQuery('#preferredColor').find(':selected').text();
		var color_id = jQuery('#preferredColor').find(':selected').val();
		
		//no calculator - add to list directly!
		if(jQuery('#cal12_num').val()>0){
			required_qty = jQuery('#cal12_num').val();
			var product_unit =  jQuery('#product_unit').val();
			if(product_unit) qty_type = required_qty>1? product_unit+'s' : product_unit;
		}
		
		var json_color = {
			id: color_id,
			name: color
		};
		
		var obj = {
			itemName: itemName,
			itemId  : itemId,
			required_qty : required_qty,
			colorName: color,
			qty_type: qty_type	
		};
		
		console.log('obj::'+obj);
		localStorage.setItem("ardex_"+itemId, JSON.stringify(obj));
		//history.back();
		return false;
	});
	
	jQuery("#cal13_btn").live("click", function(event){
		
		var itemName = jQuery('#product_name').val();
		var itemId = jQuery('#product_id').val();
		
		var required_qty = jQuery('#cal13_001').html();
		var hiddencat    = jQuery('#hiddencat1').val();
		
		var qty_type = required_qty > 1 ? "Pails" : "Pail";
		
		//no calculator - add to list directly!
		if(jQuery('#cal13_num').val()>0){
			required_qty = jQuery('#cal13_num').val();
			var product_unit =  jQuery('#product_unit').val();
			if(product_unit) qty_type = required_qty>1? product_unit+'s' : product_unit;
		}
		
		var obj = {
			itemName: itemName,
			itemId  : itemId,
			required_qty : required_qty,
			qty_type: qty_type	
		};
		
		
		localStorage.setItem("ardex_"+itemId, JSON.stringify(obj));
		//history.back();
		return false;
	});
	
	jQuery("#cal14_btn").live("click", function(event){	
		
		var itemName = jQuery('#product_name').val();
		var itemId = jQuery('#product_id').val();
		
		var required_qty = jQuery('#cal14_001').html();
		var hiddencat    = jQuery('#hiddencat1').val();
		
		var qty_type = required_qty > 1 ? "Pails" : "Pail";
		
		//no calculator - add to list directly!
		if(jQuery('#cal14_num').val()>0){
			required_qty = jQuery('#cal14_num').val();
			var product_unit =  jQuery('#product_unit').val();
			if(product_unit) qty_type = required_qty>1? product_unit+'s' : product_unit;
		}
		
		var obj = {
			itemName: itemName,
			itemId  : itemId,
			required_qty : required_qty,
			qty_type: qty_type	
		};
		
		
		localStorage.setItem("ardex_"+itemId, JSON.stringify(obj));
		//history.back();
		return false;
	});
	
	jQuery("#cal15_btn").live("click", function(event){	
		
		var itemName = jQuery('#product_name').val();
		var itemId = jQuery('#product_id').val();
		
		var required_qty = jQuery('#cal15_001').html();
		var hiddencat    = jQuery('#hiddencat1').val();
		
		var qty_type = required_qty > 1 ? "Pails" : "Pail";
		
		//no calculator - add to list directly!
		if(jQuery('#cal15_num').val()>0){
			required_qty = jQuery('#cal15_num').val();
			var product_unit =  jQuery('#product_unit').val();
			if(product_unit) qty_type = required_qty>1? product_unit+'s' : product_unit;
		}
		
		var obj = {
			itemName: itemName,
			itemId  : itemId,
			required_qty : required_qty,
			qty_type: qty_type	
		};
		
		
		localStorage.setItem("ardex_"+itemId, JSON.stringify(obj));
		//history.back();
		return false;
	});
	
	jQuery("#cal16_btn").live("click", function(event){
		
		var itemName = jQuery('#product_name').val();
		var itemId = jQuery('#product_id').val();
		
		var required_qty = jQuery('#cal16_003').html();
		var hiddencat    = jQuery('#hiddencat3').val();
		
		var qty_type = required_qty > 1 ? "Bags" : "Bag";
		
		//no calculator - add to list directly!
		if(jQuery('#cal16_num').val()>0){
			required_qty = jQuery('#cal16_num').val();
			var product_unit =  jQuery('#product_unit').val();
			if(product_unit) qty_type = required_qty>1? product_unit+'s' : product_unit;
		}
		
		var obj = {
			itemName: itemName,
			itemId  : itemId,
			required_qty : required_qty,
			qty_type: qty_type	
		};
		
		
		localStorage.setItem("ardex_"+itemId, JSON.stringify(obj));
		//history.back();
		return false;
	});
	
	jQuery("#cal17_btn").live("click", function(event){	
		
		var itemName = jQuery('#product_name').val();
		var itemId = jQuery('#product_id').val();
		
		var required_qty = jQuery('#cal17_003').html();
		var hiddencat    = jQuery('#hiddencat3').val();
		
		var qty_type = required_qty > 1 ? "Pails" : "Pail";
		
		//no calculator - add to list directly!
		if(jQuery('#cal17_num').val()>0){
			required_qty = jQuery('#cal17_num').val();
			var product_unit =  jQuery('#product_unit').val();
			if(product_unit) qty_type = required_qty>1? product_unit+'s' : product_unit;
		}
		
		var obj = {
			itemName: itemName,
			itemId  : itemId,
			required_qty : required_qty,
			qty_type: qty_type	
		};
		
		
		localStorage.setItem("ardex_"+itemId, JSON.stringify(obj));
		//history.back();
		return false;
	});
	
	jQuery("#cal18_btn").live("click", function(event){

		var itemName = jQuery('#product_name').val();
		var itemId = jQuery('#product_id').val();
		
		var required_qty = jQuery('#cal18_003').html();
		var hiddencat    = jQuery('#hiddencat3').val();
		
		var qty_type = required_qty > 1 ? "Bags" : "Bag";
		
		//no calculator - add to list directly!
		if(jQuery('#cal18_num').val()>0){
			required_qty = jQuery('#cal18_num').val();
			var product_unit =  jQuery('#product_unit').val();
			if(product_unit) qty_type = required_qty>1? product_unit+'s' : product_unit;
		}
		
		var obj = {
			itemName: itemName,
			itemId  : itemId,
			required_qty : required_qty,
			qty_type: qty_type	
		};
		
		
		localStorage.setItem("ardex_"+itemId, JSON.stringify(obj));
		//history.back();
		return false;
	});
	
	jQuery("#cal19_btn").live("click", function(event){

		var itemName = jQuery('#product_name').val();
		var itemId = jQuery('#product_id').val();
		
		var required_qty = jQuery('#cal19_003').html();
		var hiddencat    = jQuery('#hiddencat3').val();
		
		var qty_type = required_qty > 1 ? "Pails" : "Pail";
		
		//no calculator - add to list directly!
		if(jQuery('#cal19_num').val()>0){
			required_qty = jQuery('#cal19_num').val();
			var product_unit =  jQuery('#product_unit').val();
			if(product_unit) qty_type = required_qty>1? product_unit+'s' : product_unit;
		}
		
		var obj = {
			itemName: itemName,
			itemId  : itemId,
			required_qty : required_qty,
			qty_type: qty_type	
		};
		
		
		localStorage.setItem("ardex_"+itemId, JSON.stringify(obj));
		//history.back();
		return false;
	});
	
	jQuery("#cal20_btn").live("click", function(event){
		
		var itemName = jQuery('#product_name').val();
		var itemId = jQuery('#product_id').val();
		
		var required_qty = jQuery('#cal20_003').html();
		var hiddencat    = jQuery('#hiddencat3').val();
		
		var qty_type = required_qty > 1 ? "Bags" : "Bag";
		
		//no calculator - add to list directly!
		if(jQuery('#cal20_num').val()>0){
			required_qty = jQuery('#cal20_num').val();
			var product_unit =  jQuery('#product_unit').val();
			if(product_unit) qty_type = required_qty>1? product_unit+'s' : product_unit;
		}
		
		var obj = {
			itemName: itemName,
			itemId  : itemId,
			required_qty : required_qty,
			qty_type: qty_type	
		};
		
		
		localStorage.setItem("ardex_"+itemId, JSON.stringify(obj));
		//history.back();
		return false;
	});
	
	jQuery("#cal21_btn").live("click", function(event){	
		
		var itemName = jQuery('#product_name').val();
		var itemId = jQuery('#product_id').val();
		
		var required_qty = jQuery('#cal21_002').html();
		var hiddencat    = jQuery('#hiddencat2').val();
		
		var qty_type = required_qty > 1 ? "Kits" : "Kit";
		
		//no calculator - add to list directly!
		if(jQuery('#cal21_num').val()>0){
			required_qty = jQuery('#cal21_num').val();
			var product_unit =  jQuery('#product_unit').val();
			if(product_unit) qty_type = required_qty>1? product_unit+'s' : product_unit;
		}
		
		var obj = {
			itemName: itemName,
			itemId  : itemId,
			required_qty : required_qty,
			qty_type: qty_type	
		};
		
		
		localStorage.setItem("ardex_"+itemId, JSON.stringify(obj));
		//history.back();
		return false;
	});
	
	jQuery("#cal22_btn").live("click", function(event){	
		
		var itemName = jQuery('#product_name').val();
		var itemId = jQuery('#product_id').val();
		
		var required_qty = jQuery('#cal22_002').html();
		var hiddencat    = jQuery('#hiddencat2').val();
		
		
		var qty_type = required_qty > 1 ? "Bags" : "Bag";
		
		//no calculator - add to list directly!
		if(jQuery('#cal22_num').val()>0){
			required_qty = jQuery('#cal22_num').val();
			var product_unit =  jQuery('#product_unit').val();
			if(product_unit) qty_type = required_qty>1? product_unit+'s' : product_unit;
		}
		
		var obj = {
			itemName: itemName,
			itemId  : itemId,
			required_qty : required_qty,
			qty_type: qty_type	
		};
		

		
		localStorage.setItem("ardex_"+itemId, JSON.stringify(obj));
		//history.back();
		return false;
	});
	
	jQuery("#cal23_btn").live("click", function(event){	
		
		var itemName = jQuery('#product_name').val();
		var itemId = jQuery('#product_id').val();
		
		var required_qty = jQuery('#cal23_002').html();
		var hiddencat    = jQuery('#hiddencat2').val();
		
		var qty_type = required_qty > 1 ? "Pails" : "Pail";
		
		//no calculator - add to list directly!
		if(jQuery('#cal23_num').val()>0){
			required_qty = jQuery('#cal23_num').val();
			var product_unit =  jQuery('#product_unit').val();
			if(product_unit) qty_type = required_qty>1? product_unit+'s' : product_unit;
		}
		
		var obj = {
			itemName: itemName,
			itemId  : itemId,
			required_qty : required_qty,
			qty_type: qty_type	
		};
		
		
		localStorage.setItem("ardex_"+itemId, JSON.stringify(obj));
		//history.back();
		return false;
	});
	
	jQuery("#cal24_btn").live("click", function(event){
		
		var itemName = jQuery('#product_name').val();
		var itemId = jQuery('#product_id').val();
		
		var required_qty = jQuery('#cal24_002').html();
		var hiddencat    = jQuery('#hiddencat2').val();
		
		
		var qty_type = required_qty > 1 ? "Kits" : "Kit";
		
		//no calculator - add to list directly!
		if(jQuery('#cal24_num').val()>0){
			required_qty = jQuery('#cal24_num').val();
			var product_unit =  jQuery('#product_unit').val();
			if(product_unit) qty_type = required_qty>1? product_unit+'s' : product_unit;
		}
		
		var obj = {
			itemName: itemName,
			itemId  : itemId,
			required_qty : required_qty,
			qty_type: qty_type	
		};
		
		
		localStorage.setItem("ardex_"+itemId, JSON.stringify(obj));
		//history.back();
		return false;
	});
	
	jQuery("#cal25_btn").live("click", function(event){
		
		var itemName = jQuery('#product_name').val();
		var itemId = jQuery('#product_id').val();
		
		var required_qty = jQuery('#cal25_002').html();
		var hiddencat    = jQuery('#hiddencat2').val();
		
		var qty_type = required_qty > 1 ? "Cans" : "Can";
		
		//no calculator - add to list directly!
		if(jQuery('#cal25_num').val()>0){
			required_qty = jQuery('#cal25_num').val();
			var product_unit =  jQuery('#product_unit').val();
			if(product_unit) qty_type = required_qty>1? product_unit+'s' : product_unit;
		}
		
		var obj = {
			itemName: itemName,
			itemId  : itemId,
			required_qty : required_qty,
			qty_type: qty_type	
		};
		
		
		localStorage.setItem("ardex_"+itemId, JSON.stringify(obj));
		//history.back();
		return false;
	});
	
	
	jQuery(".remove").live("click", function(event){

		event.preventDefault();
	
		var proid = $(this).children("a").attr("proid");
		if(proid>0){
			localStorage.setItem("ardex_"+proid, null);
			location.reload();
		}
		
		return false;
		
	});
	
	
	//jono added
	jQuery("#sendemal_btn").live("click", function(event){
		//save changes first if any!
		$("#savechange_btn").click();
		
		//data
		var data = [];
		var obj;
		for (var i = 0; i < localStorage.length; i++){
			var key = localStorage.key(i);
			var keyArr = key.split('_');
			
			obj = JSON.parse(localStorage.getItem(key));
			//safari!!!
			if(obj && keyArr[0]=='ardex' && keyArr[1]>0){
				data.push(obj);
			}
		}

		//
		var jsonString = JSON.stringify(data);
		
		//
		var email = jQuery('#email').val();
		var project_name = jQuery('#projectname').val();
		
		if(email.length  == 0 ){
			return alert("Please type in your email address");
		}
		
		if(project_name.length == 0){
			return alert("Please enter project name");
		}
		
		jQuery("#sendemal_btn").hide();
		jQuery("#sendemal_btn").after("<span id='sendingmsg'>Message Sent</span>");
		
		$.ajax({
			type: "POST",
			url: "http://www.ardexaustralia.com.au/mobile/sendemail.php",
			data: {data : jsonString, action:'send_mail', email:email, project_name:project_name}, 
			dataType: "json",
	
			success: function(returnvalue) {		
				//console.log('returnvalue: ' + returnvalue);
				if( returnvalue == '1'){
					jQuery("#sendingmsg").fadeOut('slow');
					jQuery("#sendemal_btn").show();
					jQuery("#sendemal_btn").after("<span id='sentmsg'>Mail Sent!</span>");
					jQuery("#sentmsg").fadeOut(5600,"linear");
				}
				
			},
			error: function(returnvalue) {
				//alert('Email not Sent !');
				console.log(returnvalue);
			}
		});
		
		// Stop default behaviour until ajax request has been done
        event.preventDefault();
	});
	
	
	
	$('#materials').live('pagecreate',function(event){
		/*
		var product;
		for (var i = 0; i < localStorage.length; i++){
			product = JSON.parse(localStorage.getItem(localStorage.key(i)));
			if(product){
				jQuery('#cart > tbody:last').append(product);
			}
		}
		*/
		var obj;
		for (var i = 0; i < localStorage.length; i++){
			var key = localStorage.key(i);
			var keyArr = key.split('_');
			
			obj = JSON.parse(localStorage.getItem(key));
			//safari!!!
			if(obj && keyArr[0]=='ardex' && keyArr[1]>0){
				//jQuery('#cart > tbody:last').append(formatTableRow(obj.required_qty+' '+obj.qty_type, obj.itemName, obj.itemId));
				jQuery('#cart > tbody:last').append(formatTableRow(obj));
			}
		}
		
	});
	
	
	//helper
	function formatTableRow(obj){
		var required_qty = obj.required_qty+' '+obj.qty_type;
		var itemName = obj.itemName;
		var id = obj.itemId;
		var colorName = obj.colorName;
		if(colorName) itemName += ' - '+ colorName;
		
		var htm = '<tr>';
		htm += '<td width="30" align="center"><input type="number" style="text-align:center" id="ardex_'+id+'" maxlength="4" size="2" value="'+obj.required_qty+'">'+obj.qty_type+'</td>';
		htm += '<td>' + itemName + '</td>';
		htm += '<td class="remove center"><a href="" proid="'+id+'">remove</a></td>';
		htm += '</tr>';
		
		return htm;
		
		//return '<tr><td>' + required_qty + '</td><td>' + itemName + '</td><td class="remove center"><a href="" proid="'+id+'">remove</a></td></tr>';
	}
	/*
	function formatTableRow(required_qty, itemName, id){
		return '<tr><td>' + required_qty + '</td><td>' + itemName + '</td><td class="remove center"><a href="" proid="'+id+'">remove</a></td></tr>';
	}
	*/
	
	
	//Material List new functions
	jQuery("#clearlist_btn").live("click", function(event){
		
		var obj;
		for (var i = 0; i < localStorage.length; i++){
			var key = localStorage.key(i);
			var keyArr = key.split('_');
			
			obj = JSON.parse(localStorage.getItem(key));
			
			//safari!!!
			if(obj && keyArr[0]=='ardex' && keyArr[1]>0){
				localStorage.setItem(key, null);
			}
		}
		//
		location.reload();
	});
	
	//Save change
	jQuery("#savechange_btn").live("click", function(event){
		$("#cart :input").each(function(){
 			
			var newVlaue = $(this).val();
			var item = localStorage.getItem(this.id);
			if(item && newVlaue>0){
				var obj = JSON.parse(item);
				
				if(newVlaue!= obj.required_qty){
					obj.required_qty = newVlaue;
					localStorage.setItem(this.id, JSON.stringify(obj));
				}
				
			}
		});
		
		//location.reload();
	});
	
	
});

jQuery(function(){

	jQuery("#cal1_btn").click(function() {

		var itemName	= jQuery('#product_name').val();
		var itemId 		= jQuery('#product_id').val();
		
		var required_qty = jQuery('#cal1_003').html();
		var hiddencat    = jQuery('#hiddencat4').val();
		
		var qty_type = required_qty > 1 ? "Kgs" : "Kg";
		
		var color = jQuery('#preferredColor').find(':selected').text();
		var color_id = jQuery('#preferredColor').find(':selected').val();
		
		var json_color = {
			id: color_id,
			name: color
		};
		
		var d1 = {
			option	: 'com_ardexcalculator',
			task		: 'product.cart_add',
			
			itemName: itemName,
			itemId      : itemId,
			qty		:			required_qty,
			qty_type: 	qty_type,
			cat_name : hiddencat,
		    color:  JSON.stringify(json_color) 
		};
		
		jQuery.ajax({
			type: "POST",
			url: "index.php",
			data: d1,
			success: function(returnvalue) {
				jQuery('#cart > tbody:last').append('<tr><td>' + required_qty + '</td><td>' + itemName + '</td><td > item type </td><td class="remove center"><input type="checkbox" name="remove[]" value="" /></td></tr>');
				parent.location.href = "index.php?option=com_ardexcalculator";
				//alert(returnvalue);
			},
			error: function() {
				alert('No good');
			}
		});
	});
	
	jQuery("#cal2_btn").click(function() {	
		
		var itemName = jQuery('#product_name').val();
		var itemId = jQuery('#product_id').val();
		
		var required_qty = jQuery('#cal2_001').html();
		var hiddencat    = jQuery('#hiddencat1').val();
		
		var qty_type = required_qty > 1 ? "Bags" : "Bag";
		
		var d1 = {
			option	: 'com_ardexcalculator',
			task		: 'product.cart_add',
			
			itemName: itemName,
			itemId      : itemId,
			qty		:			required_qty,
			qty_type: 	qty_type,
			cat_name : hiddencat	
		};
		
		jQuery.ajax({
			type: "POST",
			url: "index.php",
			data: d1,
			success: function(returnvalue) {
				jQuery('#cart > tbody:last').append('<tr><td>' + required_qty + '</td><td>' + itemName + '</td><td > item type </td><td class="remove center"><input type="checkbox" name="remove[]" value="" /></td></tr>');
				parent.location.href = "index.php?option=com_ardexcalculator";
				//alert(returnvalue);
			},
			error: function() {
				alert('No good');
			}
		});
	});
	
	jQuery("#cal3_btn").click(function() {	
		
		var itemName = jQuery('#product_name').val();
		var itemId = jQuery('#product_id').val();
		
		var required_qty = jQuery('#cal3_002').html();
		var hiddencat    = jQuery('#hiddencat2').val();
		
		var qty_type = required_qty > 1 ? "Bags" : "Bag";
		
		var d1 = {
			option	: 'com_ardexcalculator',
			task		: 'product.cart_add',
			
			itemName: itemName,
			itemId      : itemId,
			qty		:			required_qty,
			qty_type: 	qty_type,
			cat_name : hiddencat	
		};
		
		jQuery.ajax({
			type: "POST",
			url: "index.php",
			data: d1,
			success: function(returnvalue) {
				jQuery('#cart > tbody:last').append('<tr><td>' + required_qty + '</td><td>' + itemName + '</td><td > item type </td><td class="remove center"><input type="checkbox" name="remove[]" value="" /></td></tr>');
				parent.location.href = "index.php?option=com_ardexcalculator";
				//alert(returnvalue);
			},
			error: function() {
				alert('No good');
			}
		});
	});
	
	jQuery("#cal5_btn").click(function() {	
		
		var itemName = jQuery('#product_name').val();
		var itemId = jQuery('#product_id').val();
		
		var required_qty = jQuery('#cal5_003').html();
		var hiddencat    = jQuery('#hiddencat3').val();
		
		var qty_type = required_qty > 1 ? "Kits" : "Kit";
		
		var d1 = {
			option	: 'com_ardexcalculator',
			task		: 'product.cart_add',
			
			itemName: itemName,
			itemId      : itemId,
			qty		:			required_qty,
			qty_type: 	qty_type,
			cat_name : hiddencat	
		};
		
		jQuery.ajax({
			type: "POST",
			url: "index.php",
			data: d1,
			success: function(returnvalue) {
				jQuery('#cart > tbody:last').append('<tr><td>' + required_qty + '</td><td>' + itemName + '</td><td > item type </td><td class="remove center"><input type="checkbox" name="remove[]" value="" /></td></tr>');
				parent.location.href = "index.php?option=com_ardexcalculator";
				//alert(returnvalue);
			},
			error: function() {
				alert('No good');
			}
		});
	});
	jQuery("#cal6_btn").click(function() {

		var itemName = jQuery('#product_name').val();
		var itemId = jQuery('#product_id').val();
		
		var required_qty = jQuery('#cal6_003').html();
		var hiddencat    = jQuery('#hiddencat3').val();
		
		var qty_type = required_qty > 1 ? "Bags" : "Bag";
		
		var d1 = {
			option	: 'com_ardexcalculator',
			task		: 'product.cart_add',
			
			itemName: itemName,
			itemId      : itemId,
			qty		:			required_qty,
			qty_type: 	qty_type,
			cat_name : hiddencat	
		};
		
		jQuery.ajax({
			type: "POST",
			url: "index.php",
			data: d1,
			success: function(returnvalue) {
				jQuery('#cart > tbody:last').append('<tr><td>' + required_qty + '</td><td>' + itemName + '</td><td > item type </td><td class="remove center"><input type="checkbox" name="remove[]" value="" /></td></tr>');
				parent.location.href = "index.php?option=com_ardexcalculator";
				//alert(returnvalue);
			},
			error: function() {
				alert('No good');
			}
		});
	});
	jQuery("#cal7_btn").click(function() {	
		
		var itemName = jQuery('#product_name').val();
		var itemId = jQuery('#product_id').val();
		
		var required_qty = jQuery('#cal7_003').html();
		var hiddencat    = jQuery('#hiddencat3').val();
		
		var qty_type = required_qty > 1 ? "Kits" : "Kit";
		
		var d1 = {
			option	: 'com_ardexcalculator',
			task		: 'product.cart_add',
			
			itemName: itemName,
			itemId      : itemId,
			qty		:			required_qty,
			qty_type: 	qty_type,
			cat_name : hiddencat	
		};
		
		jQuery.ajax({
			type: "POST",
			url: "index.php",
			data: d1,
			success: function(returnvalue) {
				jQuery('#cart > tbody:last').append('<tr><td>' + required_qty + '</td><td>' + itemName + '</td><td > item type </td><td class="remove center"><input type="checkbox" name="remove[]" value="" /></td></tr>');
				parent.location.href = "index.php?option=com_ardexcalculator";
				//alert(returnvalue);
			},
			error: function() {
				alert('No good');
			}
		});
	});
	jQuery("#cal8_btn").click(function() {	
		
		var itemName = jQuery('#product_name').val();
		var itemId = jQuery('#product_id').val();
		
		var required_qty = jQuery('#cal8_002').html();
		var hiddencat    = jQuery('#hiddencat2').val();
		
		var qty_type = required_qty > 1 ? "Bags" : "Bag";
		
		var d1 = {
			option	: 'com_ardexcalculator',
			task		: 'product.cart_add',
			
			itemName: itemName,
			itemId      : itemId,
			qty		:			required_qty,
			qty_type: 	qty_type,
			cat_name : hiddencat	
		};
		
		jQuery.ajax({
			type: "POST",
			url: "index.php",
			data: d1,
			success: function(returnvalue) {
				jQuery('#cart > tbody:last').append('<tr><td>' + required_qty + '</td><td>' + itemName + '</td><td > item type </td><td class="remove center"><input type="checkbox" name="remove[]" value="" /></td></tr>');
				parent.location.href = "index.php?option=com_ardexcalculator";
				//alert(returnvalue);
			},
			error: function() {
				alert('No good');
			}
		});
	});
	jQuery("#cal9_btn").click(function() {	
		
		var itemName = jQuery('#product_name').val();
		var itemId = jQuery('#product_id').val();
		
		var required_qty = jQuery('#cal9_002').html();
		var hiddencat    = jQuery('#hiddencat2').val();
		
		var qty_type = required_qty > 1 ? "Pails" : "Pail";
		
		var d1 = {
			option	: 'com_ardexcalculator',
			task		: 'product.cart_add',
			
			itemName: itemName,
			itemId      : itemId,
			qty		:			required_qty,
			qty_type: 	qty_type,
			cat_name : hiddencat	
		};
		
		jQuery.ajax({
			type: "POST",
			url: "index.php",
			data: d1,
			success: function(returnvalue) {
				jQuery('#cart > tbody:last').append('<tr><td>' + required_qty + '</td><td>' + itemName + '</td><td > item type </td><td class="remove center"><input type="checkbox" name="remove[]" value="" /></td></tr>');
				parent.location.href = "index.php?option=com_ardexcalculator";
				//alert(returnvalue);
			},
			error: function() {
				alert('No good');
			}
		});
	});
	

	jQuery("#cal10_btn").click(function() {

		var itemName	= jQuery('#product_name').val();
		var itemId 		= jQuery('#product_id').val();
		
		var required_qty = jQuery('#002').html();
		var hiddencat    = jQuery('#hiddencat4').val();
		
		var qty_type = required_qty > 1 ? "Kits" : "Kit";
		
		var color = jQuery('#preferredColor').find(':selected').text();
		var color_id = jQuery('#preferredColor').find(':selected').val();
		
		var json_color = {
			id: color_id,
			name: color
		};
		
		var d1 = {
			option	: 'com_ardexcalculator',
			task		: 'product.cart_add',
			
			itemName: itemName,
			itemId      : itemId,
			qty		:			required_qty,
			qty_type: 	qty_type,
			cat_name : hiddencat,
		    color:  JSON.stringify(json_color) 
		};
		
		jQuery.ajax({
			type: "POST",
			url: "index.php",
			data: d1,
			success: function(returnvalue) {
				jQuery('#cart > tbody:last').append('<tr><td>' + required_qty + '</td><td>' + itemName + '</td><td > item type </td><td class="remove center"><input type="checkbox" name="remove[]" value="" /></td></tr>');
				parent.location.href = "index.php?option=com_ardexcalculator";
				//alert(returnvalue);
			},
			error: function() {
				alert('No good');
			}
		});
	});
	
	jQuery("#cal11_btn").click(function() {

		var itemName	= jQuery('#product_name').val();
		var itemId 		= jQuery('#product_id').val();
		
		var required_qty = jQuery('#002').html();
		var hiddencat    = jQuery('#hiddencat4').val();
		
		var qty_type = required_qty > 1 ? "Kits" : "Kit";
		
		var color = jQuery('#preferredColor').find(':selected').text();
		var color_id = jQuery('#preferredColor').find(':selected').val();
		
		var json_color = {
			id: color_id,
			name: color
		};
		
		var d1 = {
			option	: 'com_ardexcalculator',
			task		: 'product.cart_add',
			
			itemName: itemName,
			itemId      : itemId,
			qty		:			required_qty,
			qty_type: 	qty_type,
			cat_name : hiddencat,
		    color:  JSON.stringify(json_color) 
		};
		
		jQuery.ajax({
			type: "POST",
			url: "index.php",
			data: d1,
			success: function(returnvalue) {
				jQuery('#cart > tbody:last').append('<tr><td>' + required_qty + '</td><td>' + itemName + '</td><td > item type </td><td class="remove center"><input type="checkbox" name="remove[]" value="" /></td></tr>');
				parent.location.href = "index.php?option=com_ardexcalculator";
				//alert(returnvalue);
			},
			error: function() {
				alert('No good');
			}
		});
	});
	
	jQuery("#cal12_btn").click(function() {

		var itemName	= jQuery('#product_name').val();
		var itemId 		= jQuery('#product_id').val();
		
		var required_qty = jQuery('#001').html();
		var hiddencat    = jQuery('#hiddencat4').val();
		
		var qty_type = required_qty > 1 ? "Cartridges" : "Cartridge";
		
		var color = jQuery('#preferredColor').find(':selected').text();
		var color_id = jQuery('#preferredColor').find(':selected').val();
		
		var json_color = {
			id: color_id,
			name: color
		};
		
		var d1 = {
			option	: 'com_ardexcalculator',
			task		: 'product.cart_add',
			
			itemName: itemName,
			itemId      : itemId,
			qty		:			required_qty,
			qty_type: 	qty_type,
			cat_name : hiddencat,
		    color:  JSON.stringify(json_color) 
		};
		
		jQuery.ajax({
			type: "POST",
			url: "index.php",
			data: d1,
			success: function(returnvalue) {
				jQuery('#cart > tbody:last').append('<tr><td>' + required_qty + '</td><td>' + itemName + '</td><td > item type </td><td class="remove center"><input type="checkbox" name="remove[]" value="" /></td></tr>');
				parent.location.href = "index.php?option=com_ardexcalculator";
				//alert(returnvalue);
			},
			error: function() {
				alert('No good');
			}
		});
	});
	
	jQuery("#cal13_btn").click(function() {	
		
		var itemName = jQuery('#product_name').val();
		var itemId = jQuery('#product_id').val();
		
		var required_qty = jQuery('#cal13_001').html();
		var hiddencat    = jQuery('#hiddencat1').val();
		
		var qty_type = required_qty > 1 ? "Pails" : "Pail";
		
		var d1 = {
			option	: 'com_ardexcalculator',
			task		: 'product.cart_add',
			
			itemName: itemName,
			itemId      : itemId,
			qty		:			required_qty,
			qty_type: 	qty_type,
			cat_name : hiddencat	
		};
		
		jQuery.ajax({
			type: "POST",
			url: "index.php",
			data: d1,
			success: function(returnvalue) {
				jQuery('#cart > tbody:last').append('<tr><td>' + required_qty + '</td><td>' + itemName + '</td><td > item type </td><td class="remove center"><input type="checkbox" name="remove[]" value="" /></td></tr>');
				parent.location.href = "index.php?option=com_ardexcalculator";
				//alert(returnvalue);
			},
			error: function() {
				alert('No good');
			}
		});
	});
	
	jQuery("#cal14_btn").click(function() {	
		
		var itemName = jQuery('#product_name').val();
		var itemId = jQuery('#product_id').val();
		
		var required_qty = jQuery('#cal14_001').html();
		var hiddencat    = jQuery('#hiddencat1').val();
		
		var qty_type = required_qty > 1 ? "Pails" : "Pail";
		
		var d1 = {
			option	: 'com_ardexcalculator',
			task		: 'product.cart_add',
			
			itemName: itemName,
			itemId      : itemId,
			qty		:			required_qty,
			qty_type: 	qty_type,
			cat_name : hiddencat	
		};
		
		jQuery.ajax({
			type: "POST",
			url: "index.php",
			data: d1,
			success: function(returnvalue) {
				jQuery('#cart > tbody:last').append('<tr><td>' + required_qty + '</td><td>' + itemName + '</td><td > item type </td><td class="remove center"><input type="checkbox" name="remove[]" value="" /></td></tr>');
				parent.location.href = "index.php?option=com_ardexcalculator";
				//alert(returnvalue);
			},
			error: function() {
				alert('No good');
			}
		});
	});
	
	jQuery("#cal15_btn").click(function() {	
		
		var itemName = jQuery('#product_name').val();
		var itemId = jQuery('#product_id').val();
		
		var required_qty = jQuery('#cal15_001').html();
		var hiddencat    = jQuery('#hiddencat1').val();
		
		var qty_type = required_qty > 1 ? "Pails" : "Pail";
		
		var d1 = {
			option	: 'com_ardexcalculator',
			task		: 'product.cart_add',
			
			itemName: itemName,
			itemId      : itemId,
			qty		:			required_qty,
			qty_type: 	qty_type,
			cat_name : hiddencat	
		};
		
		jQuery.ajax({
			type: "POST",
			url: "index.php",
			data: d1,
			success: function(returnvalue) {
				jQuery('#cart > tbody:last').append('<tr><td>' + required_qty + '</td><td>' + itemName + '</td><td > item type </td><td class="remove center"><input type="checkbox" name="remove[]" value="" /></td></tr>');
				parent.location.href = "index.php?option=com_ardexcalculator";
				//alert(returnvalue);
			},
			error: function() {
				alert('No good');
			}
		});
	});
	
	jQuery("#cal16_btn").click(function() {	
		
		var itemName = jQuery('#product_name').val();
		var itemId = jQuery('#product_id').val();
		
		var required_qty = jQuery('#cal16_003').html();
		var hiddencat    = jQuery('#hiddencat3').val();
		
		var qty_type = required_qty > 1 ? "Bags" : "Bag";
		
		var d1 = {
			option	: 'com_ardexcalculator',
			task		: 'product.cart_add',
			
			itemName: itemName,
			itemId      : itemId,
			qty		:			required_qty,
			qty_type: 	qty_type,
			cat_name : hiddencat	
		};
		
		jQuery.ajax({
			type: "POST",
			url: "index.php",
			data: d1,
			success: function(returnvalue) {
				jQuery('#cart > tbody:last').append('<tr><td>' + required_qty + '</td><td>' + itemName + '</td><td > item type </td><td class="remove center"><input type="checkbox" name="remove[]" value="" /></td></tr>');
				parent.location.href = "index.php?option=com_ardexcalculator";
				//alert(returnvalue);
			},
			error: function() {
				alert('No good');
			}
		});
	});
	
	jQuery("#cal17_btn").click(function() {	
		
		var itemName = jQuery('#product_name').val();
		var itemId = jQuery('#product_id').val();
		
		var required_qty = jQuery('#cal17_003').html();
		var hiddencat    = jQuery('#hiddencat3').val();
		
		var qty_type = required_qty > 1 ? "Pails" : "Pail";
		
		var d1 = {
			option	: 'com_ardexcalculator',
			task		: 'product.cart_add',
			
			itemName: itemName,
			itemId      : itemId,
			qty		:			required_qty,
			qty_type: 	qty_type,
			cat_name : hiddencat	
		};
		
		jQuery.ajax({
			type: "POST",
			url: "index.php",
			data: d1,
			success: function(returnvalue) {
				jQuery('#cart > tbody:last').append('<tr><td>' + required_qty + '</td><td>' + itemName + '</td><td > item type </td><td class="remove center"><input type="checkbox" name="remove[]" value="" /></td></tr>');
				parent.location.href = "index.php?option=com_ardexcalculator";
				//alert(returnvalue);
			},
			error: function() {
				alert('No good');
			}
		});
	});
	
	jQuery("#cal18_btn").click(function() {

		var itemName = jQuery('#product_name').val();
		var itemId = jQuery('#product_id').val();
		
		var required_qty = jQuery('#cal18_003').html();
		var hiddencat    = jQuery('#hiddencat3').val();
		
		var qty_type = required_qty > 1 ? "Bags" : "Bag";
		
		var d1 = {
			option	: 'com_ardexcalculator',
			task		: 'product.cart_add',
			
			itemName: itemName,
			itemId      : itemId,
			qty		:			required_qty,
			qty_type: 	qty_type,
			cat_name : hiddencat	
		};
		
		jQuery.ajax({
			type: "POST",
			url: "index.php",
			data: d1,
			success: function(returnvalue) {
				jQuery('#cart > tbody:last').append('<tr><td>' + required_qty + '</td><td>' + itemName + '</td><td > item type </td><td class="remove center"><input type="checkbox" name="remove[]" value="" /></td></tr>');
				parent.location.href = "index.php?option=com_ardexcalculator";
				//alert(returnvalue);
			},
			error: function() {
				alert('No good');
			}
		});
	});
	
	jQuery("#cal19_btn").click(function() {

		var itemName = jQuery('#product_name').val();
		var itemId = jQuery('#product_id').val();
		
		var required_qty = jQuery('#cal19_003').html();
		var hiddencat    = jQuery('#hiddencat3').val();
		
		var qty_type = required_qty > 1 ? "Pails" : "Pail";
		
		var d1 = {
			option	: 'com_ardexcalculator',
			task		: 'product.cart_add',
			
			itemName: itemName,
			itemId      : itemId,
			qty		:			required_qty,
			qty_type: 	qty_type,
			cat_name : hiddencat	
		};
		
		jQuery.ajax({
			type: "POST",
			url: "index.php",
			data: d1,
			success: function(returnvalue) {
				jQuery('#cart > tbody:last').append('<tr><td>' + required_qty + '</td><td>' + itemName + '</td><td > item type </td><td class="remove center"><input type="checkbox" name="remove[]" value="" /></td></tr>');
				parent.location.href = "index.php?option=com_ardexcalculator";
				//alert(returnvalue);
			},
			error: function() {
				alert('No good');
			}
		});
	});
	
	jQuery("#cal20_btn").click(function() {	
		
		var itemName = jQuery('#product_name').val();
		var itemId = jQuery('#product_id').val();
		
		var required_qty = jQuery('#cal20_003').html();
		var hiddencat    = jQuery('#hiddencat3').val();
		
		var qty_type = required_qty > 1 ? "Bags" : "Bag";
		
		var d1 = {
			option	: 'com_ardexcalculator',
			task		: 'product.cart_add',
			
			itemName: itemName,
			itemId      : itemId,
			qty		:			required_qty,
			qty_type: 	qty_type,
			cat_name : hiddencat	
		};
		
		jQuery.ajax({
			type: "POST",
			url: "index.php",
			data: d1,
			success: function(returnvalue) {
				jQuery('#cart > tbody:last').append('<tr><td>' + required_qty + '</td><td>' + itemName + '</td><td > item type </td><td class="remove center"><input type="checkbox" name="remove[]" value="" /></td></tr>');
				parent.location.href = "index.php?option=com_ardexcalculator";
				//alert(returnvalue);
			},
			error: function() {
				alert('No good');
			}
		});
	});
	
	jQuery("#cal21_btn").click(function() {	
		
		var itemName = jQuery('#product_name').val();
		var itemId = jQuery('#product_id').val();
		
		var required_qty = jQuery('#cal21_002').html();
		var hiddencat    = jQuery('#hiddencat2').val();
		
		var qty_type = required_qty > 1 ? "Kits" : "Kit";
		
		var d1 = {
			option	: 'com_ardexcalculator',
			task		: 'product.cart_add',
			
			itemName: itemName,
			itemId      : itemId,
			qty		:			required_qty,
			qty_type: 	qty_type,
			cat_name : hiddencat	
		};
		
		jQuery.ajax({
			type: "POST",
			url: "index.php",
			data: d1,
			success: function(returnvalue) {
				jQuery('#cart > tbody:last').append('<tr><td>' + required_qty + '</td><td>' + itemName + '</td><td > item type </td><td class="remove center"><input type="checkbox" name="remove[]" value="" /></td></tr>');
				parent.location.href = "index.php?option=com_ardexcalculator";
				//alert(returnvalue);
			},
			error: function() {
				alert('No good');
			}
		});
	});
	
	jQuery("#cal22_btn").click(function() {	
		
		var itemName = jQuery('#product_name').val();
		var itemId = jQuery('#product_id').val();
		
		var required_qty = jQuery('#cal22_002').html();
		var hiddencat    = jQuery('#hiddencat2').val();
		
		var qty_type = required_qty > 1 ? "Bags" : "Bag";
		
		var d1 = {
			option	: 'com_ardexcalculator',
			task		: 'product.cart_add',
			
			itemName: itemName,
			itemId      : itemId,
			qty		:			required_qty,
			qty_type: 	qty_type,
			cat_name : hiddencat	
		};
		
		jQuery.ajax({
			type: "POST",
			url: "index.php",
			data: d1,
			success: function(returnvalue) {
				jQuery('#cart > tbody:last').append('<tr><td>' + required_qty + '</td><td>' + itemName + '</td><td > item type </td><td class="remove center"><input type="checkbox" name="remove[]" value="" /></td></tr>');
				parent.location.href = "index.php?option=com_ardexcalculator";
				//alert(returnvalue);
			},
			error: function() {
				alert('No good');
			}
		});
	});
	
	jQuery("#cal23_btn").click(function() {	
		
		var itemName = jQuery('#product_name').val();
		var itemId = jQuery('#product_id').val();
		
		var required_qty = jQuery('#cal23_002').html();
		var hiddencat    = jQuery('#hiddencat2').val();
		
		var qty_type = required_qty > 1 ? "Pails" : "Pail";
		
		var d1 = {
			option	: 'com_ardexcalculator',
			task		: 'product.cart_add',
			
			itemName: itemName,
			itemId      : itemId,
			qty		:			required_qty,
			qty_type: 	qty_type,
			cat_name : hiddencat	
		};
		
		jQuery.ajax({
			type: "POST",
			url: "index.php",
			data: d1,
			success: function(returnvalue) {
				jQuery('#cart > tbody:last').append('<tr><td>' + required_qty + '</td><td>' + itemName + '</td><td > item type </td><td class="remove center"><input type="checkbox" name="remove[]" value="" /></td></tr>');
				parent.location.href = "index.php?option=com_ardexcalculator";
				//alert(returnvalue);
			},
			error: function() {
				alert('No good');
			}
		});
	});
	
	jQuery("#cal24_btn").click(function() {	
		
		var itemName = jQuery('#product_name').val();
		var itemId = jQuery('#product_id').val();
		
		var required_qty = jQuery('#cal24_002').html();
		var hiddencat    = jQuery('#hiddencat2').val();
		
		var qty_type = required_qty > 1 ? "Kits" : "Kit";
		
		var d1 = {
			option	: 'com_ardexcalculator',
			task		: 'product.cart_add',
			
			itemName: itemName,
			itemId      : itemId,
			qty		:			required_qty,
			qty_type: 	qty_type,
			cat_name : hiddencat	
		};
		
		jQuery.ajax({
			type: "POST",
			url: "index.php",
			data: d1,
			success: function(returnvalue) {
				jQuery('#cart > tbody:last').append('<tr><td>' + required_qty + '</td><td>' + itemName + '</td><td > item type </td><td class="remove center"><input type="checkbox" name="remove[]" value="" /></td></tr>');
				parent.location.href = "index.php?option=com_ardexcalculator";
				//alert(returnvalue);
			},
			error: function() {
				alert('No good');
			}
		});
	});
	
	jQuery("#cal25_btn").click(function() {	
		
		var itemName = jQuery('#product_name').val();
		var itemId = jQuery('#product_id').val();
		
		var required_qty = jQuery('#cal25_002').html();
		var hiddencat    = jQuery('#hiddencat2').val();
		
		var qty_type = required_qty > 1 ? "Cans" : "Can";
		
		var d1 = {
			option	: 'com_ardexcalculator',
			task		: 'product.cart_add',
			
			itemName: itemName,
			itemId      : itemId,
			qty		:			required_qty,
			qty_type: 	qty_type,
			cat_name : hiddencat	
		};
		
		jQuery.ajax({
			type: "POST",
			url: "index.php",
			data: d1,
			success: function(returnvalue) {
				jQuery('#cart > tbody:last').append('<tr><td>' + required_qty + '</td><td>' + itemName + '</td><td > item type </td><td class="remove center"><input type="checkbox" name="remove[]" value="" /></td></tr>');
				parent.location.href = "index.php?option=com_ardexcalculator";
				//alert(returnvalue);
			},
			error: function() {
				alert('No good');
			}
		});
	});
	
	jQuery(".remove").click(function(e){
		e.preventDefault();
		var proid = jQuery(this).attr('proid');

		var data = {
			option		: 'com_ardexcalculator',
			task		: 'product.remove_item',
			proid		:  proid
		};
		
		jQuery.ajax({
			type: "POST",
			url: "index.php",
			data: data,
			success: function(returnvalue) {
				jQuery("a[proid='" + proid + "']").parent().parent().fadeOut(300, function() {
					jQuery(this).remove();
				});
				//alert('Done' + returnvalue);
			},
			error: function(returnvalue) {
				alert('Not Done');
			}
		});		
		
	});
	
	jQuery("#sendemal_btn").click(function(){
		var email = jQuery('#email').val();
		var project_name = jQuery('#projectname').val();
		
		if(email.length  == 0 ){
			return alert("Please type in your email address");
		}
		
		if(project_name.length == 0){
			return alert("Please enter project name");
		}
		
		var data = {
			option		: 'com_ardexcalculator',
			task		: 'product.send_email',
			email		:  email,
			project_name:  project_name
		};
	
		jQuery("#sendemal_btn").hide();
		jQuery("#sendemal_btn").after("<span id='sendingmsg'>Sending message</span>");
		
		jQuery.ajax({
			type: "POST",
			url: "index.php",
			data: data,
			success: function(returnvalue) {		
				//console.log('returnvalue: ' + returnvalue);
				if( returnvalue == '1'){
					jQuery("#sendingmsg").fadeOut('slow');
					jQuery("#sendemal_btn").show();
					jQuery("#sendemal_btn").after("<span id='sentmsg'>Mail Sent!</span>");
					jQuery("#sentmsg").fadeOut(5600,"linear");
				}
				
			},
			error: function(returnvalue) {
				alert('Email not Sent !');
				console.log(returnvalue);
			}
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
    initialize: function() {
        this.bind();
    },
    bind: function() {
        document.addEventListener('deviceready', this.deviceready, false);
    },
    deviceready: function() {
        // This is an event handler function, which means the scope is the event.
        // So, we must explicitly called `app.report()` instead of `this.report()`.
        app.report('deviceready');
    },
    report: function(id) {
        // Report the event in the console
        console.log("Report: " + id);

        // Toggle the state from "pending" to "complete" for the reported ID.
        // Accomplished by adding .hide to the pending element and removing
        // .hide from the complete element.
        document.querySelector('#' + id + ' .pending').className += ' hide';
        var completeElem = document.querySelector('#' + id + ' .complete');
        completeElem.className = completeElem.className.split('hide').join('');
    }
};











	//app.initialize();











	//app.initialize();

