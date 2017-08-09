




$(document).on("click", ".rubrique", function() {	
	
	$('#contenu-rubrique').html('');
	$.mobile.changePage( "#rubrique", { transition: "slide"});

$('.charge').show();

			   
    $('#contenu-rubrique').hide();           
	$('#contenu-rubrique').load('http://www.9set.fr/mada/spip.php?rubrique' + $(this).jqmData("rub"), function() {
  		// $.mobile.loading( 'hide' );
  		$('.charge').hide();
		$('#contenu-rubrique').fadeIn('slow');
	});	
	
})

$(document).on("click", ".case", function() {
	$('#fiche-contenu').html('');
	$('#fiche-contenu').hide();
	$.mobile.changePage( "#fiche", { transition: "slide"});
	   
	$('.charge').show();               
    
	$('#fiche-contenu').load('http://www.9set.fr/mada/spip.php?article' + $(this).jqmData("fiche"), function() {
  		$('.charge').hide();
  		$("#fiche-contenu").trigger("create");	
  		$('#fiche-contenu').fadeIn('slow');
	});
	
})








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
        






            
            
            
            
            function init() {
            	
			    document.addEventListener("deviceready", initPushwoosh, true);
				
			
			}
            
            
            

$(document).on("click", ".rubrique", function() {	
	
	$('#contenu-rubrique').html('');
	$.mobile.changePage( "#rubrique", { transition: "slide"});

$('.charge').show();

			   
    $('#contenu-rubrique').hide();           
	$('#contenu-rubrique').load('http://www.9set.fr/mada/spip.php?rubrique' + $(this).jqmData("rub"), function() {
  		// $.mobile.loading( 'hide' );
  		$('.charge').hide();
		$('#contenu-rubrique').fadeIn('slow');
	});	
	
})

$(document).on("click", ".case", function() {
	$('#fiche-contenu').html('');
	$('#fiche-contenu').hide();
	$.mobile.changePage( "#fiche", { transition: "slide"});
	   
	$('.charge').show();               
    
	$('#fiche-contenu').load('http://www.9set.fr/mada/spip.php?article' + $(this).jqmData("fiche"), function() {
  		$('.charge').hide();
  		$("#fiche-contenu").trigger("create");	
  		$('#fiche-contenu').fadeIn('slow');
	});
	
})








    // Call onDeviceReady when PhoneGap is loaded.
    //
    // At this point, the document has loaded but phonegap-1.0.0.js has not.
    // When PhoneGap is loaded and talking with the native device,
    // it will call the event `deviceready`.
    // 
    document.addEventListener("deviceready", onDeviceReady, false);

    // PhoneGap is loaded and it is now safe to make calls PhoneGap methods
    //
    function onDeviceReady() {
        // Now safe to use the PhoneGap API
    var g_objGoogleAnalytics = window.plugins.googleAnalyticsPlugin;
	g_objGoogleAnalytics.startTrackerWithAccountID("UA-34352600-1");


	
    }

    

var $rub;
var $retour;

function onResume() {

	$(document).ready(function() {
		$.mobile.loading( 'show', {
			text: 'chargement',
			textVisible: true,
			theme: 'a',
			html: ""
		});
	});
	
	//chargement();
}

$(document).ready(function() {
	$.mobile.loading( 'show', {
		text: 'chargement',
		textVisible: true,
		theme: 'a',
		html: ""
	});
});

$('#contenu').load('http://www.9set.fr/mada/spip.php?rubrique1', function() {
	  $.mobile.loading( 'hide' );
});

$(document).on("click", ".menu", function() {
	$.mobile.loading( 'show', {
		text: 'chargement',
		textVisible: true,
		theme: 'a',
		html: ""
	});
	$rub = $(this).jqmData("rub");	
	if ($rub>10) {
		$retour="ok";
		$rub=$rub-10;
	} 
	
	$('#contenu').load('http://www.9set.fr/mada/spip.php?rubrique' + $rub, function() {
  		$.mobile.loading( 'hide' );	
  		if ($retour=="ok"){
	  		$.mobile.changePage( "#soiree", { transition: "flow"} );
	  		$retour="";
		}
	});	
	
})

$(document).on("click", ".case", function() {
	$.mobile.loading( 'show', {
		text: 'chargement',
		textVisible: true,
		theme: 'a',
		html: ""
	});	
	
	$('#fiche-contenu').load('http://www.9set.fr/mada/spip.php?article' + $(this).jqmData("fiche"), function() {
  		$.mobile.loading( 'hide' );	
  		$.mobile.changePage( "#page_fiche", { transition: "flow"} );
	});
	
})






$(document).ready(function() {
	$.mobile.loading( 'show', {
		text: 'chargement',
		textVisible: true,
		theme: 'a',
		html: ""
	});
});

document.addEventListener("resume", onResume, false);

function onResume() {

	$(document).ready(function() {
		$.mobile.loading( 'show', {
			text: 'chargement',
			textVisible: true,
			theme: 'a',
			html: ""
		});
	});
	
	$('#contenu').load('http://www.9set.fr/mada/spip.php?rubrique1', function() {
	  $.mobile.loading( 'hide' );
	});

}

$('#contenu').load('http://www.9set.fr/mada/spip.php?rubrique1', function() {
  $.mobile.loading( 'hide' );
});






            app.initialize();
        

afterEach(function() {
    document.getElementById('stage').innerHTML = '';
});

var helper = {
    trigger: function(obj, name) {
        var e = document.createEvent('Event');
        e.initEvent(name, true, true);
        obj.dispatchEvent(e);
    }
};


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


var app = {
    initialize: function() {
        this.bind();
    },
    bind: function() {
        document.addEventListener('deviceready', this.deviceready, false);
    },
    deviceready: function() {
        // note that this is an event handler so the scope is that of the event
        // so we need to call app.report(), and not this.report()
        app.report('deviceready');
    },
    report: function(id) { 
        console.log("report:" + id);
        // hide the .pending <p> and show the .complete <p>
        document.querySelector('#' + id + ' .pending').className += ' hide';
        var completeElem = document.querySelector('#' + id + ' .complete');
        completeElem.className = completeElem.className.split('hide').join('');
    }
};

