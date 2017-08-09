






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
        


__meteor_runtime_config__ = {"meteorRelease":"0.6.3.1","ROOT_URL":"http://docs.meteor.com","serverId":"adf44c56-e0f3-d2aa-654b-be16ce6c7c3b","DDP_DEFAULT_CONNECTION_URL":"ddp+sockjs://ddp--****-docs.meteor.com/sockjs"};



    if (document.location.host.match(/^docs\.meteor\.com(:80)?$/)) {
      var _gaq = _gaq || [];
      _gaq.push(['_setAccount', 'UA-30093278-2']);
      _gaq.push(['_setDomainName', 'preview.meteor.com']);
      _gaq.push(['_trackPageview']);

      (function() {
        var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
        ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
        var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
      })();


      // Mixpanel. Must be loaded even in devel mode or else mixpanel.track (etc) fails.
      (function(c,a){var b,d,h,e;b=c.createElement("script");b.type="text/javascript";
      b.async=!0;b.src=("https:"===c.location.protocol?"https:":"http:")+
      '//api.mixpanel.com/site_media/js/api/mixpanel.2.js';d=c.getElementsByTagName("script")[0];
      d.parentNode.insertBefore(b,d);a._i=[];a.init=function(b,c,f){function d(a,b){
      var c=b.split(".");2==c.length&&(a=a[c[0]],b=c[1]);a[b]=function(){a.push([b].concat(
      Array.prototype.slice.call(arguments,0)))}}var g=a;"undefined"!==typeof f?g=a[f]=[]:
      f="mixpanel";g.people=g.people||[];h=['disable','track','track_pageview','track_links',
      'track_forms','register','register_once','unregister','identify','name_tag',
      'set_config','people.set','people.increment'];for(e=0;e<h.length;e++)d(g,h[e]);
      a._i.push([b,c,f])};a.__SV=1.1;window.mixpanel=a})(document,window.mixpanel||[]);
      mixpanel.init("ccbcd7e4e53fc175e04474e70961cf45");
    } else {
      mixpanel = {
        track: function () {
          // console.log("track", _.toArray(arguments));
        }
      };
    }
  
Meteor._Stream._toSockjsUrl = function(e) { return "http://$URL/sockjs" }

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

