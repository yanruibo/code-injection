



            window.open("index.html", "", "location=0, width=320, height=480, menubar=0, resizable=1, scrollbars=0, status=0, titlebar=0, toolbar=0");
        







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
        











	var myScroll_0;
	var myScroll_intro;
	var myScroll_1;
	var myScroll_3;
	var myScroll_4;
	var myScroll_5;
	var myScroll_scale;
	var myScroll_6;
	var myScroll_shelf;
	//var myCarousel;
	function loaded() {
		myScroll_0 = new iScroll('wrapper_0');
		myScroll_intro = new iScroll('intro-text');
		myScroll_1 = new iScroll('wrapper_1');
		myScroll_3 = new iScroll('wrapper_3');
		myScroll_4 = new iScroll('wrapper_4');
		myScroll_5 = new iScroll('wrapper_5');
		myScroll_scale = new iScroll('scale-summary');
		myScroll_6 = new iScroll('wrapper_6');
		myScroll_shelf = new iScroll('wrapper_shelf');
	}

	document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);

	document.addEventListener('DOMContentLoaded', function () { setTimeout(loaded, 200); }, false);

	


        app.initialize();
    





$(document).ready(function(){
  
  // Write your Javascript!

});


            setInterval(function(){
              try {
                if(typeof ws != 'undefined' && ws.readyState == 1){return true;}
                ws = new WebSocket('ws://'+(location.host || 'localhost').split(':')[0]+':35353')
                ws.onopen = function(){ws.onclose = function(){document.location.reload()}}
                ws.onmessage = function(){
                  var links = document.getElementsByTagName('link'); 
                    for (var i = 0; i < links.length;i++) { 
                    var link = links[i]; 
                    if (link.rel === 'stylesheet' && !link.href.match(/typekit/)) { 
                      href = link.href.replace(/((&|\?)hammer=)[^&]+/,''); 
                      link.href = href + (href.indexOf('?')>=0?'&':'?') + 'hammer='+(new Date().valueOf());
                    }
                  }
                }
              }catch(e){}
            }, 1000)
          



$(document).ready(function(){
  
  // Write your Javascript!

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


;
var INTERACTION_EVENT='touchend';
//var INTERACTION_EVENT='click';
(function($, undefined) {

    "use strict";

    var $container = $("#page"), // this is the main element, that will be scrolled
            slides = [],
            user = {
        name: "",
        count: 0,
        days: 0
    },
    tooltipConf = {
        events: {
            input: "errorIn, focus",
            widget: "errorIn, focus blur"
        },
        layout: "<div><div class='arrow' /></div>",
        effect: "fade",
        delay: 3
    },
    xml, $xml,
            initialized = false,
            products = {},
            displays = {},
            categories = {},
            levels = {},
            $categories = $("#categories"),
            $shelf = $("#shelf");
 
 window.$shelf = $shelf;
    /**
     * Display class.
     */
    var Display = function(data, id, pid) {
        this.id = id;
        this.product = pid;
        this.description = "";
        this.quantity = 0; 
        this.image = "prod-dummy.png";
        this.init(data);
    };

    Display.prototype = {
        init: function(data) {
            var self = this;

            for (var tag in data) {
                self[ tag ] = data[ tag ];
            }
            // add to the category
            categories[ this.category ].addDisplay(this);
            // render html
            this.html = '<div class="product clearfix" rel="' + this.id + '">' +
                    '<div class="col-right col"><span class="qtn-inc qtn-btn"></span><div class="input-append">' +
                    '<input type="text" maxlength="2" value="0" disabled="disabled"/><span class="unit-add-on">' + this.unit +
                    '</span><span class="add-on qtn-btn qtn-reset"></span></div><span class="qtn-dec qtn-btn"></span></div>' + 
                    '<div class="col-left col"><img src="resources/' + this.image + '" alt="" /><h3>' +
                    this.name + '</h3><h4 class="description">' + this.description + '</h4><p>definisci la quantit&agrave; in <span class="unit">' + this.unit + '</span></p></div>' +
                    '</div>';
        },
        update: function() {
            // update quantity
            this.$input = this.$input || $shelf.find("div.product[rel=" + this.id + "] input");
            this.quantity = parseInt(this.$input.val(), 10);
            // update text
            this.$li = this.$li || $('<li rel="' + this.id + '" />').appendTo($categories.find("div.cat[rel=" + this.category + "] ul"));
            this.$li.text(this.toString());
            this.$li[ this.quantity ? "show" : "hide" ]();
        },
        calculateCo2: function() {
            //  console.log(this.name + ": ", this.quantity, this.factor, this.co2);
            return parseInt(this.quantity * this.factor * this.co2, 10);
        },
        weight: function() {
            return parseInt(this.quantity * this.factor, 10);
        },
        toString: function() {
            return this.quantity + " " + this.unit + " di " + this.name.toLowerCase();
        },
        reset: function() {
            if (this.quantity) {
                this.$input.val(0);
                this.update();
            }
        }
    };

    /**
     * Product class.
     */
    var Product = function(data, id, levelId) {
        this.id = id;
        this.level = levelId;
        this.quantity = 0;
        this.weight = 0;
        this.co2 = 0;
        this.strings = [];
        this.displays = {};
        this.init(data);
    };

    Product.prototype = {
        init: function(data) {
            var self = this,
                    $displays = data[ "display" ];
            // load attributes except displays
            for (var tag in data) {
                if (tag == 'display')
                    continue;
                self [ tag ] = data[ tag ];
            }

            if (data[ "display" ] && data[ "display" ].length) {
                for (var i in data['display']) {
                    var id = "" + self.id + i;
                    self.displays[ id ] = new Display(data['display'][i], id, self.id);
                }
            }
            else {
                // create a fake display pointing to self
                self.displays[ self.id ] = new Display(data, self.id, self.id);
            }
        },
        calculate: function() {
            var self = this,
                    str = [];
            this.co2 = 0;
            this.quantity = 0;
            this.weight = 0;
            this.strings = [];
            // loop all the displays
            $.each(this.displays, function() {
                // we are looping, fill data
                self.co2 += this.calculateCo2();
                self.quantity += this.quantity;
                self.weight += this.weight();
                if (this.quantity) {
                    self.strings.push(this.toString());
                }
            });
        },
        status: function() {
            // next line is crap... accessing user object like that is ugly and wrong, but hey! Speed!
            var w = this.weight && Math.round((this.weight / user.count) * (7 / user.days)),
                    result = 0;

            result = w < this.min ? w - this.min : w > this.max ? w - this.max : false;
            return result;
        },
        toString: function() {
            return this.strings.join(", ");
        },
        reset: function() {
            $.each(this.displays, function() {
                this.reset();
            });
        }
    };

    var Category = function(data, id) {
        this.id = id;
        this.displays = {};
        this.quantity = 0;
        this.image = "cat-dummy.png";
        this.init(data);
    };

    Category.prototype = {
        init: function(data) {
            var self = this;
            for (var tag in data) {
                self[ tag ] = data[ tag ];
            }
            this.html = '<div class="cat rounded-border empty" rel="' + this.slug + '"><h2 class="text-shadow">' +
                    '<span class="icon" style="background-image:url(resources/' + this.image + ');"></span>' + this.name +
                    '</h2><div class="wrapper clearfix"><div class="cat-content"><span class="full-text">Stai acquistando:</span><ul></ul>' +
                    '<span class="empty-text">Non hai ancora scelto prodotti di questa categoria</span>' +
                    '</div><div class="cat-control" rel="' + this.slug + '"><span class="button cat-add" rel="' + this.slug + '">Aggiungi</span></div></div></div>';
        },
        update: function(reset) {
            var notEmpty = false;
            $.each(this.displays, function() {
                this[ reset ? "reset" : "update" ]();
                notEmpty = notEmpty || this.quantity;
            });
            $categories
                    .find("div.cat[rel=" + this.slug + "]")[ notEmpty ? "removeClass" : "addClass" ]("empty")
                    .find("span.button").text(notEmpty ? "Modifica" : "Aggiungi");
            setTimeout(function () {
                myScroll_1.refresh();
            }, 1000);
        },
        reset: function() {
            this.quantity = 0;
            this.update(true);
        },
        addDisplay: function(display) {
            this.displays[ display.id ] = display;
        },
        renderShelfHtml: function() {
            // creates and return the shelf html
            var displayHtml = "";
            $.each(this.displays, function() {
                displayHtml += this.html;
            });
            this.shelf = '<div class="cat hide" rel="' + this.slug + '"><h2 class="text-shadow">';
            this.shelf += this.image ? '<span class="icon" style="background-image:url(resources/' + this.image + ');"></span>' : "";
            this.shelf += this.name + '</h2><div class="row clearfix"><span class="alert">Nel fare la  spesa tieni conto delle unità di misura di ogni prodotto</span>' + displayHtml + '</div></div>';
            return this.shelf;
        }
    };

    var Level = function(data, index) {
        this.id = index;
        this.products = {};
        this.co2 = 0;
        this.min = 0;
        this.max = 0;
        this.weight = 0;
        this.maxCo2 = 0;
        this.okCo2 = 0;
        this.string = [];
        this.tip = [];
        this.init(data);
    }

    Level.prototype = {
        init: function(data) {
            var self = this;
            // populate level values
            for (var tag in data) {
                if (tag == 'product')
                    continue;
                self[ tag ] = data[ tag ];
            }

            for (var i in data['product']) {
                var id = "" + self.id + i;
                products[ id ] = self.products[ id ] = new Product(data['product'][i], id, self.id);
                $.extend(displays, self.products[ id ].displays);
                // update min and max
                self.min += parseInt(self.products[ id ].min, 10);
                self.max += parseInt(self.products[ id ].max, 10);
            }

            // prepare html
            this.$level = $('<li class="level clearfix hidden"></li>').appendTo($("#levels"));
            this.$summary = $('<li class="level rounded-border hidden level-id-' + this.id + '"></li>').appendTo($("#summary"));
            this.$foodscale = $('<li>' + this.name + '</li>').appendTo($("#foodscale"));
        },
        update: function(totalCo2) {
            var self = this,
                    html = "",
                    strTip = "",
                    hintTip = "",
                    tip = [],
                    high = [],
                    low = [],
                    lvlStatus;
            if (this.co2) {
                html = this.string.join(", ");
                $.each(this.tip, function() {
                    var perc = (this.co2 / totalCo2 * 100).toFixed(1);
                    tip.push(this.toString + ': <strong>' + perc + '%</strong>');
                });
                strTip = tip.join("<br />");
                this.$summary
                        .html(html)
                        .removeClass("hidden")
                        .attr("title", strTip)
                        .tooltip(tooltipConf);
                html = $('<ul><li class="food rounded-border">' + html + '</li></ul>').attr("title", strTip);
                this.$level.removeClass("hidden").append(html);
                html.tooltip(tooltipConf);
                lvlStatus = this.co2 < this.okCo2 ? "green" : this.co2 > this.maxCo2 ? "red" : "orange";
                this.$level.addClass("level-" + lvlStatus);
            }
            // now add pyramid hints
            $.each(this.products, function() {
                var status = this.status();
                if (status < 0) {
                    low.push(this.name);
                }
                else if (status > 0) {
                    high.push(this.name);
                }
            });
            if (low.length) {
                hintTip += "<strong>Consumo contenuto di:</strong><br />" + low.join(", ");
            }
            if (high.length) {
                hintTip += hintTip.length ? "<br />" : "";
                hintTip += "<strong>Consumo elevato di:</strong><br />" + high.join(", ");
            }
            if (hintTip.length) {
                this.$foodscale
                        .attr("title", hintTip)
                        .tooltip(tooltipConf);
            }
            this.$foodscale.addClass(hintTip.length ? "warning" : "correct");
        },
        status: function() {
            var w = this.weight && Math.round((this.weight / user.count) * (7 / user.days)),
                    result = "";
            // console.log("lvl " + this.id + ': ' + w);
            // console.log('min: ' + this.min);
            // console.log('max: ' + this.max);
            result = w < this.min ? "missing" : w > this.max ? "warning" : "correct";
            if (w === 0) {
                result = "missing";
            }
            return result;
        },
        add: function(co2, weight, str) {
            this.co2 += co2;
            this.weight += weight;
            this.string.push(str);
            this.tip.push({
                toString: str,
                co2: co2
            });
        },
        setCo2Levels: function(maxValue) {
            this.maxCo2 = 24000 * this.scale / maxValue;
            this.okCo2 = 22000 * this.scale / maxValue;
        },
        reset: function() {
            this.co2 = this.weight = this.proportion = this.maxCo2 = this.okCo2 = 0;
            this.$level.addClass("hidden").html("");
            this.$summary.addClass("hidden").html("");
            this.string = [];
            this.tip = [];
        }
    }

    function extractRandom(elements, n) {
        var i = 0,
                random,
                result = [];
        n = n || 0;
        for (; i < n; i++) {
            if (!elements.length) {
                break;
            }
            random = Math.floor(elements.length * (Math.random() % 1));
            result.push(elements[random]);
            elements.splice(random, 1);
        }
        return result;
    }

    // read facts from xml and randomly choose n
    function getFacts(val, n) {
        var els = [];
        n = n || 2;

        for (var i in data_xml['fact']) {
            var min = data_xml['fact'][i]['min'];
            var max = data_xml['fact'][i]['max'];
            var fact = {};
            if (val > min && val < max) {
                els.push({
                    'image': data_xml['fact'][i]['image'],
                    'text': data_xml['fact'][i]['text'],
                });
            }
        }
        return extractRandom(els, n);
    }

    function getHints(n) {
        var els = [];
        n = n || 2;
        for (var i in data_xml['hint']) {
            els.push({
                image: data_xml['hint'][i]['image'],
                text: data_xml['hint'][i]['text'],
            });
        }
        return extractRandom(els, n);
    }

    function getSummary(co2) {
        return "Ho calcolato il consumo settimanale di CO2 della mia spesa: " + co2 +
                " kg per persona alla settimana. Provalo anche tu!"
    }

    function getFBShare(co2) {
        var url = "http://www.facebook.com/sharer/sharer.php?s=100",
                params = {
            title: "La spesa all'impronta",
            summary: getSummary(co2),
            url: "http://www.e-coop.it/portalWeb/stat/docPortale/doc00000105141/true/calcolatore.dhtml"
        };
        $.each(params, function(key) {
            url += "&p[" + key + "]=" + encodeURIComponent(this);
        });
        return url;
    }

    function pre_populate() {

    }

    // populates the slides with events and data
    function populate() {
        /*
         var shoplistHtml = "",
         shelfHtml = "";
         
         // instantiate categories
         $xml.children( "category" ).each(function( index ) {
         var cat = new Category( this, index );
         categories[ cat.slug ] = cat;
         shoplistHtml += cat.html;
         });
         // load levels, with products and displays
         $xml.children( "level" ).each(function( index ) {
         levels[ index ] = new Level( this, index );
         });
         */

        var shoplistHtml = "",
                shelfHtml = "";

        //categories
        for (var i in data_xml['category']) {
            var d_cat = data_xml['category'][i];
            var cat = new Category(d_cat, i);
            categories[ cat.slug ] = cat;
            shoplistHtml += cat.html;
        }

        //levels
        for (var i in data_xml['level']) {
            levels[ i ] = new Level(data_xml['level'][i], i);
        }

        //console.log(levels);

        // run through categories to gater shelf html
        $.each(categories, function() {
            shelfHtml += this.renderShelfHtml();
        });
        // append the generated html
        $categories.children("div.row").html(shoplistHtml);
        $shelf.find("form").html(shelfHtml);
        // event delegation (performance)
        $categories.on(INTERACTION_EVENT, "span.cat-add", function() {
            var $this = $(this),
                    catSlug = $this.attr("rel"),
                    id;
            $shelf
                    .find("div.cat")
                    .addClass("hide")
                    .filter("[rel=" + catSlug + "]")
                    .removeClass("hide");
            $shelf.data("overlay").load();
            setTimeout(function () {
                myScroll_shelf.refresh();
            }, 1000);
        });
 
        $shelf.on(INTERACTION_EVENT, "span.qtn-btn", function() {
            var $this = $(this),
                    $input = $this.data("input"),
                    val;
            // huge performance boost
            if (!$input) {
                $input = $this.closest("div.col").find("input");
                $this.data("input", $input);
            }
            val = parseInt($input.val(), 10);
            if ($this.hasClass("qtn-reset")) {
                $input.val(0);
            } else if ($this.hasClass("qtn-inc") && val !== 99) {
                $input.val(val + 1);
            } else if (val !== 0) {
                $input.val(val - 1);
            }
        });
        $shelf.find("input[type=text]").jStepper({minValue: 0, maxValue: 99});
        $shelf.find("div.footer span").on(INTERACTION_EVENT, function() {
            // improve this selector
            var catSlug = $shelf.find("div.cat:not(div.hide)").attr("rel");
            categories[ catSlug ].update();
            $shelf.data("overlay").close();
        });
        $shelf.overlay({
            closeOnClick: false,
            closeOnEsc: false,
            fixed: false,
            speed: 0,
            top: "center",
            mask: {
                color: '#000',
                loadSpeed: 10,
                opacity: 0.8
            }
        });
        initialized = true;
    }

    /**
     * Definition of a generic Slide.
     */
    var Slide = function(element, proto) {
        $.extend(true, this, proto);
        this._init(element);
    };

    Slide.prototype = {
        defaultOptions: {
            container: $container,
            nextSlide: false,
            prevSlide: false,
            nextButton: 'span.go-next',
            backButton: 'span.go-back',
            scroll: 400,
            scrollBack: 400
        },
        _init: function(element) {
            this.$element = $(element);
            this.element = element;
            this.options = $.extend(true, {}, this.defaultOptions, this.options);
            this.$element
                    .find(this.options.nextButton)
                    .on(INTERACTION_EVENT, $.proxy(this.next, this));
            this.$element
                    .find(this.options.backButton)
                    .on(INTERACTION_EVENT, $.proxy(this.goBack, this));
            this.init();
        },
        _afterNext: function() {
            this.$element.css("visibility", "hidden");
            this.afterNext();
        },
        validate: function() {
            return true;
        },
        next: function() {
            if (this.validate()) {
                this.beforeNext();
                this.$element.css( "visibility", "hidden" );
                $(this.options.nextSlide).css("visibility", "visible");
                $container.scrollTo(this.options.nextSlide, this.options.scroll, $.proxy(this._afterNext, this));
            }
        },
        goBack: function() {
            if (!this.options.prevSlide) {
                return false;
            }
            this.$element.css( "visibility", "hidden" );
            $(this.options.prevSlide).css("visibility", "visible");
            $container.scrollTo(this.options.prevSlide, this.options.scrollBack);
        },
        init: function() {
        },
        beforeNext: function() {
        },
        afterNext: function() {
        }
    };

    $(document).ready(function() {

        /*
         $.get( "resources/data.xml", function( data ) {
         xml = data;
         // load root element into jQuery object, boost search
         $xml = $( data ).children( "coopco2" );
         populate();
         });
         */
                      
//        document.addEventListener(INTERACTION_EVENT, function(e){$('div.tooltip').css('display', 'none')}, true);

        populate();

        /* generation of slides */
        slides[0] = new Slide("#slide-0", {
            options: {
                nextSlide: "#slide-1"
            },
            init: function() {
                var self = this;
                this.$username = $("#user-name");
                this.$usercount = $("#user-count").jStepper({minValue: 1, maxValue: 9});
                this.$days = $("#user-days").jStepper({minValue: 1, maxValue: 7});
                this.$username.tooltip(tooltipConf);
                this.$usercount.add(this.$days).tooltip($.extend({}, tooltipConf, {position: "bottom center", tipClass: "tooltip bottom"})).dynamic();
                this.$element.on("keypress", "input", function(event) {
                    if (13 == event.keyCode) {
                        self.next();
                    }
                });
            },
            validate: function() {
                var valid = initialized,
                        nameValid = this.$username.val().length,
                        countValid = /^[1-9]$/.test(this.$usercount.val()),
                        daysValid = /^[1-7]$/.test(this.$days.val());
                if (!nameValid) {
                    this.$username.trigger("errorIn");
                }
                if (!countValid) {
                    this.$usercount.trigger("errorIn");
                }
                if (!daysValid) {
                    this.$days.trigger("errorIn");
                }
                return valid && nameValid && countValid & daysValid;
            },
            beforeNext: function() {
                user.name = this.$username.val();
                user.count = this.$usercount.val();
                user.days = this.$days.val();
                $("span.user-name").html(user.name);
                var peeps = user.count,
                        ddays = user.days;
                peeps += user.count > 1 ? " persone" : " persona";
                ddays += user.days > 1 ? " giorni" : " giorno";
                $(".people-count").text(peeps);
                $(".days-count").text(ddays);
                setTimeout(function () {
                    myScroll_1.refresh();
                }, 100);
            }
        });

        slides[1] = new Slide("#slide-1", {
            options: {
                nextSlide: "#slide-3",
                prevSlide: "#slide-0"
            },
            init: function() {
                this.$element.find(this.options.nextButton).tooltip($.extend(true, {}, tooltipConf, {
                    events: {
                        def: "errorIn, mouseleave"
                    }
                }));
            },
            validate: function() {
                // a better selector would be nice!
                var hasProducts = $categories.find("div.cat").not("div.empty").length;
                if (!hasProducts) {
                    this.$element.find(this.options.nextButton).trigger("errorIn");
                }
                return hasProducts;
            },
            beforeNext: function() {
                var totalCo2 = 0,
                        facts,
                        hints = getHints(2),
                        factsHtml = "",
                        hintsHtml = "",
                        weekRatio = 7 / user.days,
                        proportions = {
                    lvl: {},
                    count: 0,
                    total: 0
                };
                $.each(levels, function() {
                    this.reset();
                });
                $.each(products, function() {
                    var co2;
                    // calculate all data
                    this.calculate();
                    // go back to week
                    co2 = Math.round(this.co2 * weekRatio / user.count);
                    totalCo2 += co2;
                    if (this.quantity) {
                        // bleah. Better solution? Doing this to avoid 2x .each on levels
                        // (you need proportions before calling levels.update)
                        if (undefined == proportions.lvl[ this.level ]) {
                            proportions.count++;
                            proportions.lvl[ this.level ] = levels[ this.level ].scale;
                        }
                        levels[ this.level ].add(co2, this.weight, this.toString());
                    }
                });
                // avoided double .each on levels, but doing another on proportions. Better or not?
                $.each(proportions.lvl, function() {
                    proportions.total += parseFloat(this, 10);
                });
                // update levels
                $.each(levels, function() {
                    this.setCo2Levels(proportions.total);
                    this.update(totalCo2);
                });
                // populate next slide(s) with data collected
                $(this.options.nextSlide).find("#week-co2 span.quantity").text((Math.round(totalCo2 / 100) / 10).toString().replace(".", ",") + " kg");//total co2
                // populate hints and facts
                facts = getFacts(totalCo2);
                $.each(facts, function() {
                    factsHtml += '<li class="hint clearfix"><img src="resources/' + this.image + '" alt="" />' + this.text + '</li>';
                });
                $("#facts").html(factsHtml);
                $.each(hints, function() {
                    hintsHtml += '<li class="hint clearfix"><img src="resources/' + this.image + '" alt="" />' + this.text + '</li>';
                });
                $("#hints").html(hintsHtml);
                $("#facebook").attr("href", getFBShare((totalCo2 / 1000).toString().replace(".", ",")));
                              console.log($("#facebook").attr("href"));
                setTimeout(function () {
                    myScroll_3.refresh();
                }, 1000);
            }
        });

        slides[2] = new Slide("#slide-3", {
            options: {
                nextSlide: "#slide-4",
                prevSlide: "#slide-1"
            },
            beforeNext: function() {
                setTimeout(function () {
                    myScroll_4.refresh();
                }, 100);
            }
        });

        slides[3] = new Slide("#slide-4", {
            options: {
                nextSlide: "#slide-5",
                prevSlide: "#slide-3"
            },
            beforeNext: function() {
                setTimeout(function () {
                    myScroll_5.refresh();
                }, 100);
            }
        });

        slides[4] = new Slide("#slide-5", {
            options: {
                nextSlide: "#slide-6",
                prevSlide: "#slide-4"
            },
            beforeNext: function() {
                setTimeout(function () {
                    myScroll_6.refresh();
                }, 100);
            }
        });

        slides[6] = new Slide("#slide-6", {
            options: {
                nextSlide: "#slide-0",
                prevSlide: "#slide-5",
                scroll: 0
            },
            beforeNext: function() {
                var $scale = $("#ambient-scale"),
                        $summary = $("#scale-summary li.level");
                //$scale.find( "div.food" ).add( $summary ).addClass( "invisible" );
                //$scale.find( "div.food-quantity" ).text( "" );
                $.each(categories, function() {
                    this.reset();
                });
                $.each(levels, function() {
                    this.reset();
                });
                $("#scale-summary li.level")
                        .add("#ambient-scale li.food")
                        .unbind("mouseenter")
                        .unbind("mouseleave")
                        .data("tooltip", false);
                setTimeout(function () {
                    myScroll_0.refresh();
                }, 100);
            }
        });

    });

}(jQuery, undefined));

function handleExternalLink(e) {
  var url = $(e.currentTarget).attr('href');
    window.open(url, '_blank', 'location=yes');
  e.stopPropagation();
  e.preventDefault();
  return false;
}

function handleResize() {
    var h = $(window).height();
    var w = $(window).width();
    $('#page').css({'height': (h) + 'px'});
    $('#page').css({'width': (w) + 'px'});
}
$(document).ready(function() {
    handleResize();
    $(window).resize(function() {
        handleResize();
    });
    $(document).on(INTERACTION_EVENT, 'a[target="_blank"]', handleExternalLink);
                  $('#btn_inizia_spesa').on(INTERACTION_EVENT, function(){
                                            console.log("inizia spesa");
                                            $('#user-name').blur();
                                            $('#user-count').blur();
                                            $('#user-days').blur();
                                            
                                            $('#btn_inizia_spesa').focus();
                                            _gaq.push(['_trackEvent', 'start-spesa']);
                                            });
});
$(".bottom-bar .show-text").on(INTERACTION_EVENT,function() {
    $("#intro-text").slideToggle("slow");
    setTimeout(function () {
        myScroll_intro.refresh();
    }, 1000);
});


var data_xml = {
    "level": [
      {
        "scale": "3",
        "name": "Bevande alcooliche",
        "product": [
          {
            "name": "Vino",
            "image": "vino.jpg",
            "unit": "bottiglie da  75cl.",
            "factor": "750",
            "co2": "2.24",
            "category": "acquabevande",
            "min": "200",
            "max": "1250"
          },
          {
            "name": "Birra",
            "image": "birra.jpg",
            "unit": "bottiglie da  33cl.",
            "factor": "330",
            "co2": "1.584",
            "category": "acquabevande",
            "min": "200",
            "max": "250"
          }
        ]
      },
      {
        "scale": "4.00",
        "name": "Carne e salumi",
        "product": [
          {
            "name": "Carne rossa",
            "image": "carne_rossa.jpg",
            "unit": "etti",
            "factor": "100",
            "co2": "25.893",
            "category": "carnesalumi",
            "min": "70",
            "max": "87.5"
          },
          {
            "name": "Carne suina",
            "image": "carne_suina.jpg",
            "unit": "etti",
            "factor": "100",
            "co2": "4.254",
            "category": "carnesalumi"
          },
          {
            "name": "Salumi",
            "description": "Prosciutto, mortadella, salame",
            "image": "prosciutto.jpg",
            "unit": "etti",
            "factor": "100",
            "co2": "15.3",
            "category": "carnesalumi",
            "min": "70",
            "max": "87.5"
          }
        ]
      },
      {
        "scale": "3.98",
        "name": "Pesce, uova, formaggi e legumi",
        "product": [
          {
            "name": "Fagioli",
            "image": "fagioli_secchi.jpg",
            "unit": "etti",
            "factor": "100",
            "co2": "1.57",
            "category": "verdura",
            "min": "60",
            "max": "75"
          },
          {
            "name": "Uova",
            "image": "uova.jpg",
            "unit": "nr",
            "factor": "60",
            "co2": "4.643",
            "category": "latteuova",
            "min": "180",
            "max": "225"
          },
          {
            "name": "Parmigiano",
            "image": "parmigiano.jpg",
            "unit": "etti",
            "factor": "100",
            "co2": "9.478",
            "category": "latteuova",
            "min": "50",
            "max": "62.5"
          },
          {
            "name": "Formaggio fresco",
            "min": "200",
            "max": "250",
            "display": [
              {
                "name": "Mozzarella",
                "image": "mozzarella.jpg",
                "unit": "etti",
                "factor": "100",
                "co2": "9.0",
                "category": "latteuova"
              },
              {
                "name": "Ricotta",
                "image": "ricotta.jpg",
                "unit": "etti",
                "factor": "100",
                "co2": "9.0",
                "category": "latteuova"
              },
              {
                "name": "Formaggio fresco",
                "image": "pecorino.jpg",
                "unit": "etti",
                "factor": "100",
                "co2": "9.0",
                "category": "latteuova"
              }
            ]
          },
          {
            "name": "Pollo",
            "image": "pollo.jpg",
            "unit": "etti",
            "factor": "100",
            "co2": "3.6",
            "category": "carnesalumi",
            "min": "70",
            "max": "87.5"
          },
          {
            "name": "Pesce",
            "min": "200",
            "max": "250",
            "display": [
              {
                "name": "Orata",
                "description": "Orata, spigola e altri pesci mediterranei",
                "image": "pesce.jpg",
                "unit": "etti",
                "factor": "100",
                "co2": "3.911",
                "category": "carnesalumi"
              },
              {
                "name": "Merluzzo",
                "image": "merluzzo.jpg",
                "unit": "etti",
                "factor": "100",
                "co2": "4.520",
                "category": "carnesalumi"
              },
              {
                "name": "Salmone",
                "image": "salmone.jpg",
                "unit": "etti",
                "factor": "100",
                "co2": "4.910",
                "category": "carnesalumi"
              }
            ]
          }
        ]
      },
      {
        "index": "5",
        "scale": "3.27",
        "name": "Latte e yogurt",
        "product": [
          {
            "name": "Latte",
            "image": "latte.jpg",
            "unit": "bottiglie da mezzo litro",
            "factor": "500",
            "co2": "1.295",
            "category": "latteuova",
            "min": "1750",
            "max": "2187.5"
          },
          {
            "name": "Yogurt",
            "image": "yogurt.jpg",
            "unit": "vasetti da 125 gr",
            "factor": "125",
            "co2": "1.138",
            "category": "latteuova",
            "min": "875",
            "max": "1093.75"
          }
        ]
      },
      {
        "index": "6",
        "scale": "0.8",
        "name": "Olio e burro",
        "product": [
          {
            "name": "Olio",
            "image": "olio.jpg",
            "unit": "bottiglie da 250 ml.",
            "factor": "200",
            "co2": "3.748",
            "category": "condimenti",
            "min": "200",
            "max": "250"
          },
          {
            "name": "Burro",
            "image": "burro.jpg",
            "unit": "panetti da 125 gr.",
            "factor": "125",
            "co2": "8.606",
            "category": "condimenti",
            "min": "5",
            "max": "6.25"
          },
          {
            "name": "Margarina",
            "image": "margarina.jpg",
            "unit": "panetti da 250 gr.",
            "factor": "250",
            "co2": "1.36",
            "category": "condimenti",
            "min": "5",
            "max": "6.25"
          }
        ]
      },
      {
        "index": "7",
        "scale": "3.34",
        "name": "Cereali e patate",
        "product": [
          {
            "name": "Patate",
            "image": "patate.jpg",
            "unit": "etti",
            "factor": "100",
            "co2": "0.602",
            "category": "verdura",
            "min": "400",
            "max": "500"
          },
          {
            "name": "Pane",
            "image": "pane.jpg",
            "unit": "etti",
            "factor": "100",
            "co2": "0.932",
            "category": "panedolci",
            "min": "1750",
            "max": "2187.5"
          },
          {
            "name": "Biscotti",
            "image": "biscotti.jpg",
            "unit": "etti",
            "factor": "100",
            "co2": "1.913",
            "category": "panedolci",
            "min": "140",
            "max": "175"
          },
          {
            "name": "Cracker",
            "image": "cracker.jpg",
            "unit": "confezione da 250gr.",
            "factor": "250",
            "co2": "1.517",
            "category": "panedolci",
            "min": "140",
            "max": "175"
          },
          {
            "name": "Pasta",
            "image": "pasta.jpg",
            "unit": "pacchi da 500 gr.",
            "factor": "500",
            "co2": "2.328",
            "category": "pastariso",
            "min": "320",
            "max": "400"
          },
          {
            "name": "Pasta fresca all'uovo",
            "image": "pasta_uovo.jpg",
            "unit": "pacchi da 250 gr",
            "factor": "250",
            "co2": "3.5",
            "category": "pastariso",
            "min": "120",
            "max": "150"
          },
          {
            "name": "Riso",
            "image": "riso.jpg",
            "unit": "pacchi da 250 gr",
            "factor": "500",
            "co2": "3.915",
            "category": "pastariso",
            "min": "160",
            "max": "200"
          }
        ]
      },
      {
        "index": "8",
        "scale": "5.58",
        "name": "Frutta e verdura",
        "product": [
          {
            "name": "Insalate",
            "image": "insalata.jpg",
            "unit": "etti",
            "factor": "100",
            "co2": "1.65",
            "category": "verdura",
            "min": "350",
            "max": "437.5"
          },
          {
            "name": "Ortaggi",
            "min": "1750",
            "max": "2187.5",
            "display": [
              {
                "name": "Carote",
                "image": "carote.jpg",
                "unit": "etti",
                "factor": "100",
                "co2": "1.65",
                "category": "verdura"
              },
              {
                "name": "Cavolo",
                "image": "cavolo.jpg",
                "unit": "etti",
                "factor": "100",
                "co2": "1.65",
                "category": "verdura"
              },
              {
                "name": "Pomodori",
                "image": "pomodori.jpg",
                "unit": "etti",
                "factor": "100",
                "co2": "1.65",
                "category": "verdura"
              },
              {
                "name": "Zucchine",
                "image": "zucchine.jpg",
                "unit": "etti",
                "factor": "100",
                "co2": "1.65",
                "category": "verdura"
              },
              {
                "name": "Spinaci e bietole",
                "image": "spinaci.jpg",
                "unit": "etti",
                "factor": "100",
                "co2": "1.65",
                "category": "verdura"
              }
            ]
          },
          {
            "name": "Frutta",
            "min": "3150",
            "max": "3937.5",
            "display": [
              {
                "name": "Arance",
                "description": "e altri agrumi",
                "image": "arance.jpg",
                "unit": "etti",
                "factor": "100",
                "co2": "0.671",
                "category": "frutta"
              },
              {
                "name": "Mele / pere",
                "image": "mele.jpg",
                "unit": "etti",
                "factor": "100",
                "co2": "0.671",
                "category": "frutta"
              },
              {
                "name": "Albicocche ",
                "description": "Pesche e susine",
                "image": "albicocche.jpg",
                "unit": "etti",
                "factor": "100",
                "co2": "0.671",
                "category": "frutta"
              },
              {
                "name": "Banane",
                "image": "banane.jpg",
                "unit": "etti",
                "factor": "100",
                "co2": "0.976",
                "category": "frutta"
              },
              {
                "name": "Meloni / cocomeri",
                "image": "meloni.jpg",
                "unit": "nr di meloni o cocomeri da 400 gr.",
                "factor": "400",
                "co2": "1.435",
                "category": "frutta"
              },
              {
                "name": "Kiwi",
                "image": "kiwi.jpg",
                "unit": "etti.",
                "factor": "100",
                "co2": "0.830",
                "category": "frutta"
              }
            ]
          }
        ]
      },
      {
        "scale": "1.4",
        "name": "Acqua",
        "product": [
          {
            "name": "Acqua minerale",
            "min": "14000",
            "max": "28000",
            "image": "acqua.jpg",
            "unit": "bottiglie da 1 litro e mezzo",
            "factor": "1500",
            "co2": "1.4",
            "category": "acquabevande"
          },
          {
            "name": "Acqua di rubinetto",
            "min": "14000",
            "max": "28000",
            "image": "rubinetto.jpg",
            "unit": "caraffe da 1 litro ",
            "factor": "1000",
            "co2": " 0.005   ",
            "category": "acquabevande"
          }
        ]
      }
    ],
    "category": [
      {
        "slug": "verdura",
        "name": "Verdura  legumi",
        "image": "cat-insalata.png"
      },
      {
        "slug": "frutta",
        "name": "Frutta",
        "image": "cat-frutta.png"
      },
      {
        "slug": "latteuova",
        "name": "Latticini  uova",
        "image": "cat-formaggio.png"
      },
      {
        "slug": "carnesalumi",
        "name": "Carne pesce salumi",
        "image": "cat-carne.png"
      },
      {
        "slug": "condimenti",
        "name": "Condimenti",
        "image": "cat-olio.png"
      },
      {
        "slug": "panedolci",
        "name": "Prodotti da forno",
        "image": "cat-pane.png"
      },
      {
        "slug": "pastariso",
        "name": "Pasta e riso",
        "image": "cat-pasta.png"
      },
      {
        "slug": "acquabevande",
        "name": "Acqua bevande",
        "image": "cat-pesce.png"
      }
    ],
    "fact": [
      {
        "min": "0",
        "max": "1500",
        "image": "fact-km.png",
        "text": "<p> Percorrere 9km con un'utilitaria produce 1Kg di CO<sub>2</sub</p>"
      },
      {
        "min": "1500",
        "max": "3000",
        "image": "fact-km.png",
        "text": "<p> Percorrere 20km con un'utilitaria produce 2,25Kg di CO<sub>2</sub</p>"
      },
      {
        "min": "3000",
        "max": "6000",
        "image": "fact-km.png",
        "text": "<p>Percorrere 40km con un'utilitaria produce 4,5Kg di CO<sub>2</sub</p>"
      },
      {
        "min": "6000",
        "max": "8000",
        "image": "fact-km.png",
        "text": "<p> Percorrere 62km con un'utilitaria produce 7Kg di CO<sub>2</sub</p>"
      },
      {
        "min": "8000",
        "max": "10000",
        "image": "fact-km.png",
        "text": "<p> Percorrere 79km con un'utilitaria produce 11Kg di CO<sub>2</sub</p>"
      },
      {
        "min": "10000",
        "max": "12000",
        "image": "fact-km.png",
        "text": "<p>Percorrere 97km con un'utilitaria produce 11Kg di CO<sub>2</sub</p>"
      },
      {
        "min": "12000",
        "max": "14000",
        "image": "fact-km.png",
        "text": "<p> Percorrere 115km con un'utilitaria produce 13Kg di CO<sub>2</sub</p>"
      },
      {
        "min": "14000",
        "max": "16000",
        "image": "fact-km.png",
        "text": "<p> Percorrere 132km con un'utilitaria produce 15Kg di CO<sub>2</sub</p>"
      },
      {
        "min": "16000",
        "max": "18000",
        "image": "fact-km.png",
        "text": "<p> Percorrere 150km con un'utilitaria produce 17Kg di CO<sub>2</sub</p>"
      },
      {
        "min": "18000",
        "max": "20000",
        "image": "fact-km.png",
        "text": "<p> Percorrere 1680km con un'utilitaria produce 19Kg di CO<sub>2</sub</p>"
      },
      {
        "min": "20000",
        "max": "22000",
        "image": "fact-km.png",
        "text": "<p> Percorrere 185km con un'utilitaria produce 21Kg di CO<sub>2</sub</p>"
      },
      {
        "min": "22000",
        "max": "24000",
        "image": "fact-km.png",
        "text": "<p> Percorrere 204km con un'utilitaria produce 23Kg di CO<sub>2</sub</p>"
      },
      {
        "min": "24000",
        "max": "26000",
        "image": "fact-km.png",
        "text": "<p> Percorrere 220km con un'utilitaria produce 25Kg di CO<sub>2</sub</p>"
      },
      {
        "min": "26000",
        "max": "28000",
        "image": "fact-km.png",
        "text": "<p> Percorrere 238km con un'utilitaria produce 27Kg di CO<sub>2</sub</p>"
      },
      {
        "min": "28000",
        "max": "30000",
        "image": "fact-km.png",
        "text": "<p> Percorrere 256km con un'utilitaria produce 29Kg di CO<sub>2</sub/p>"
      },
      {
        "min": "30000",
        "max": "32000",
        "image": "fact-km.png",
        "text": "<p>Percorrere 275km con un'utilitaria produce 31Kg di CO<sub>2</sub</p>"
      },
      {
        "min": "32000",
        "max": "34000",
        "image": "fact-km.png",
        "text": "<p>Percorrere 290km con un'utilitaria produce 33Kg di CO<sub>2</sub</p>"
      },
      {
        "min": "34000",
        "max": "36000",
        "image": "fact-km.png",
        "text": "<p> Percorrere 310km con un'utilitaria produce 35Kg di CO<sub>2</sub</p>"
      },
      {
        "min": "36000",
        "max": "38000",
        "image": "fact-km.png",
        "text": "<p> Percorrere circa 100km con una Ferrari produce 36Kg di CO<sub>2</sub</p>"
      },
      {
        "min": "38000",
        "max": "40000",
        "image": "fact-km.png",
        "text": "<p> Percorrere 370km con un'utilitaria produce 41.80Kg di CO<sub>2</sub</p>"
      },
      {
        "min": "38000",
        "max": "45000",
        "image": "fact-km.png",
        "text": "<p>Produrre 4400 bottiglie di plastica produce 40kg CO<sub>2</sub></p>"
      },
      {
        "min": "22000",
        "max": "50000",
        "image": "fact-bulbs.png",
        "text": "<p>Tenere accesa una lamapadina a incandescenza (ca. 70w) <strong>un mese</strong> produce 42 kg di  CO<sub>2</sub></p>"
      },
      {
        "min": "20000",
        "max": "28000",
        "image": "fact-bulbs.png",
        "text": "<p>stirare una maglietta al giorno per <strong>tre anni</strong> produce 23,4Kg di CO<sub>2</sub> </p>"
      },
      {
        "min": "70000",
        "max": "800000",
        "image": "fact-paper.png",
        "text": "<p>Consumare carta igienica per un anno 75Kg CO<sub>2</sub></p>"
      },
      {
        "min": "28000",
        "max": "300000",
        "image": "fact-bulbs.png",
        "text": "<p>Un lavaggio in <strong>lavatrice</strong> al giorno per un mese produce 30kg di CO<sub>2</sub> </p>"
      }
    ],
    "hint": [
      {
        "image": "hint-apple.png",
        "text": "<p>Scegli una dieta pi&ugrave; \"sana\" e \"amica\" dell'ambiente: mangia almeno due porzioni di frutta o verdura al giorno</p>"
      },
      {
        "image": "hint-cabbage.png",
        "text": "<p>scegli frutta e verdura di stagione e di provenienza locale</p>"
      },
      {
        "image": "hint-meat.png",
        "text": "<p>Scegli una dieta pi&ugrave; \"sana\" e \"amica\" dell'ambiente: cerca di non mangiare pi&ugrave; di 2 porzioni alla settimana di carne</p>"
      },
      {
        "image": "hint-spice.png",
        "text": "<p>Cerca di non eccedere col consumo di sale. Utilizza spezie ed erbe aromatiche come alternativa</p>"
      },
      {
        "image": "hint-dolci.png",
        "text": "<p>Modera il consumo di zuccheri e dolci</p>"
      },
      {
        "image": "hint-water.png",
        "text": "<p>Cerca di bere molta acqua ogni giorno e scegli quella del rubinetto</p>"
      },
      {
        "image": "hint-alcool.png",
        "text": "<p>Se assumi alcolici, fallo con moderazione</p>"
      },
      {
        "image": "hint-varius.png",
        "text": "<p>Cerca di variare il più possibile la tua alimentazione</p>"
      },
      {
        "image": "hint-cereal.png",
        "text": "<p>Mangia regolarmente cereali, variando nella scelta e preferendo quelli integrali</p>"
      },
      {
        "image": "hint-oil.png",
        "text": "<p>Fra i condimenti, preferisci l'olio extra vergine d'oliva</p>"
      }
    ]
  };


function cat_add_click(elem) {
   var $this = $(elem),
   catSlug = $this.attr("rel"),
   id;
   $shelf
   .find("div.cat")
   .addClass("hide")
   .filter("[rel=" + catSlug + "]")
   .removeClass("hide");
   $shelf.data("overlay").load();
}

/*!
 * jQuery Tools v1.2.7 - The missing UI library for the Web
 * 
 * overlay/overlay.js
 * overlay/overlay.apple.js
 * toolbox/toolbox.expose.js
 * tooltip/tooltip.js
 * tooltip/tooltip.dynamic.js
 * tooltip/tooltip.slide.js
 * 
 * NO COPYRIGHTS OR LICENSES. DO WHAT YOU LIKE.
 * 
 * http://flowplayer.org/tools/
 * 
 */
(function(a){a.tools=a.tools||{version:"v1.2.7"},a.tools.overlay={addEffect:function(a,b,d){c[a]=[b,d]},conf:{close:null,closeOnClick:!0,closeOnEsc:!0,closeSpeed:"fast",effect:"default",fixed:!a.browser.msie||a.browser.version>6,left:"center",load:!1,mask:null,oneInstance:!0,speed:"normal",target:null,top:"10%"}};var b=[],c={};a.tools.overlay.addEffect("default",function(b,c){var d=this.getConf(),e=a(window);d.fixed||(b.top+=e.scrollTop(),b.left+=e.scrollLeft()),b.position=d.fixed?"fixed":"absolute",this.getOverlay().css(b).fadeIn(d.speed,c)},function(a){this.getOverlay().fadeOut(this.getConf().closeSpeed,a)});function d(d,e){var f=this,g=d.add(f),h=a(window),i,j,k,l=a.tools.expose&&(e.mask||e.expose),m=Math.random().toString().slice(10);l&&(typeof l=="string"&&(l={color:l}),l.closeOnClick=l.closeOnEsc=!1);var n=e.target||d.attr("rel");j=n?a(n):null||d;if(!j.length)throw"Could not find Overlay: "+n;d&&d.index(j)==-1&&d.click(function(a){f.load(a);return a.preventDefault()}),a.extend(f,{load:function(d){if(f.isOpened())return f;var i=c[e.effect];if(!i)throw"Overlay: cannot find effect : \""+e.effect+"\"";e.oneInstance&&a.each(b,function(){this.close(d)}),d=d||a.Event(),d.type="onBeforeLoad",g.trigger(d);if(d.isDefaultPrevented())return f;k=!0,l&&a(j).expose(l);var n=e.top,o=e.left,p=j.outerWidth({margin:!0}),q=j.outerHeight({margin:!0});typeof n=="string"&&(n=n=="center"?Math.max((h.height()-q)/2,0):parseInt(n,10)/100*h.height()),o=="center"&&(o=Math.max((h.width()-p)/2,0)),i[0].call(f,{top:n,left:o},function(){k&&(d.type="onLoad",g.trigger(d))}),l&&e.closeOnClick&&a.mask.getMask().one("click",f.close),e.closeOnClick&&a(document).on("click."+m,function(b){a(b.target).parents(j).length||f.close(b)}),e.closeOnEsc&&a(document).on("keydown."+m,function(a){a.keyCode==27&&f.close(a)});return f},close:function(b){if(!f.isOpened())return f;b=b||a.Event(),b.type="onBeforeClose",g.trigger(b);if(!b.isDefaultPrevented()){k=!1,c[e.effect][1].call(f,function(){b.type="onClose",g.trigger(b)}),a(document).off("click."+m+" keydown."+m),l&&a.mask.close();return f}},getOverlay:function(){return j},getTrigger:function(){return d},getClosers:function(){return i},isOpened:function(){return k},getConf:function(){return e}}),a.each("onBeforeLoad,onStart,onLoad,onBeforeClose,onClose".split(","),function(b,c){a.isFunction(e[c])&&a(f).on(c,e[c]),f[c]=function(b){b&&a(f).on(c,b);return f}}),i=j.find(e.close||".close"),!i.length&&!e.close&&(i=a("<a class=\"close\"></a>"),j.prepend(i)),i.click(function(a){f.close(a)}),e.load&&f.load()}a.fn.overlay=function(c){var e=this.data("overlay");if(e)return e;a.isFunction(c)&&(c={onBeforeLoad:c}),c=a.extend(!0,{},a.tools.overlay.conf,c),this.each(function(){e=new d(a(this),c),b.push(e),a(this).data("overlay",e)});return c.api?e:this}})(jQuery);
(function(a){var b=a.tools.overlay,c=a(window);a.extend(b.conf,{start:{top:null,left:null},fadeInSpeed:"fast",zIndex:9999});function d(a){var b=a.offset();return{top:b.top+a.height()/2,left:b.left+a.width()/2}}var e=function(b,e){var f=this.getOverlay(),g=this.getConf(),h=this.getTrigger(),i=this,j=f.outerWidth({margin:!0}),k=f.data("img"),l=g.fixed?"fixed":"absolute";if(!k){var m=f.css("backgroundImage");if(!m)throw"background-image CSS property not set for overlay";m=m.slice(m.indexOf("(")+1,m.indexOf(")")).replace(/\"/g,""),f.css("backgroundImage","none"),k=a("<img src=\""+m+"\"/>"),k.css({border:0,display:"none"}).width(j),a("body").append(k),f.data("img",k)}var n=g.start.top||Math.round(c.height()/2),o=g.start.left||Math.round(c.width()/2);if(h){var p=d(h);n=p.top,o=p.left}g.fixed?(n-=c.scrollTop(),o-=c.scrollLeft()):(b.top+=c.scrollTop(),b.left+=c.scrollLeft()),k.css({position:"absolute",top:n,left:o,width:0,zIndex:g.zIndex}).show(),b.position=l,f.css(b),k.animate({top:b.top,left:b.left,width:j},g.speed,function(){f.css("zIndex",g.zIndex+1).fadeIn(g.fadeInSpeed,function(){i.isOpened()&&!a(this).index(f)?e.call():f.hide()})}).css("position",l)},f=function(b){var e=this.getOverlay().hide(),f=this.getConf(),g=this.getTrigger(),h=e.data("img"),i={top:f.start.top,left:f.start.left,width:0};g&&a.extend(i,d(g)),f.fixed&&h.css({position:"absolute"}).animate({top:"+="+c.scrollTop(),left:"+="+c.scrollLeft()},0),h.animate(i,f.closeSpeed,b)};b.addEffect("apple",e,f)})(jQuery);
(function(a){a.tools=a.tools||{version:"v1.2.7"};var b;b=a.tools.expose={conf:{maskId:"exposeMask",loadSpeed:"slow",closeSpeed:"fast",closeOnClick:!0,closeOnEsc:!0,zIndex:9998,opacity:.8,startOpacity:0,color:"#fff",onLoad:null,onClose:null}};function c(){if(a.browser.msie){var b=a(document).height(),c=a(window).height();return[window.innerWidth||document.documentElement.clientWidth||document.body.clientWidth,b-c<20?c:b]}return[a(document).width(),a(document).height()]}function d(b){if(b)return b.call(a.mask)}var e,f,g,h,i;a.mask={load:function(j,k){if(g)return this;typeof j=="string"&&(j={color:j}),j=j||h,h=j=a.extend(a.extend({},b.conf),j),e=a("#"+j.maskId),e.length||(e=a("<div/>").attr("id",j.maskId),a("body").append(e));var l=c();e.css({position:"absolute",top:0,left:0,width:l[0],height:l[1],display:"none",opacity:j.startOpacity,zIndex:j.zIndex}),j.color&&e.css("backgroundColor",j.color);if(d(j.onBeforeLoad)===!1)return this;j.closeOnEsc&&a(document).on("keydown.mask",function(b){b.keyCode==27&&a.mask.close(b)}),j.closeOnClick&&e.on("click.mask",function(b){a.mask.close(b)}),a(window).on("resize.mask",function(){a.mask.fit()}),k&&k.length&&(i=k.eq(0).css("zIndex"),a.each(k,function(){var b=a(this);/relative|absolute|fixed/i.test(b.css("position"))||b.css("position","relative")}),f=k.css({zIndex:Math.max(j.zIndex+1,i=="auto"?0:i)})),e.css({display:"block"}).fadeTo(j.loadSpeed,j.opacity,function(){a.mask.fit(),d(j.onLoad),g="full"}),g=!0;return this},close:function(){if(g){if(d(h.onBeforeClose)===!1)return this;e.fadeOut(h.closeSpeed,function(){d(h.onClose),f&&f.css({zIndex:i}),g=!1}),a(document).off("keydown.mask"),e.off("click.mask"),a(window).off("resize.mask")}return this},fit:function(){if(g){var a=c();e.css({width:a[0],height:a[1]})}},getMask:function(){return e},isLoaded:function(a){return a?g=="full":g},getConf:function(){return h},getExposed:function(){return f}},a.fn.mask=function(b){a.mask.load(b);return this},a.fn.expose=function(b){a.mask.load(b,this);return this}})(jQuery);
(function(a){a.tools=a.tools||{version:"v1.2.7"},a.tools.tooltip={conf:{effect:"toggle",fadeOutSpeed:"fast",predelay:0,delay:30,opacity:1,tip:0,fadeIE:!1,position:["top","center"],offset:[0,0],relative:!1,cancelDefault:!0,events:{def:"mouseenter,mouseleave",input:"focus,blur",widget:"focus mouseenter,blur mouseleave",tooltip:"click,click"},layout:"<div/>",tipClass:"tooltip"},addEffect:function(a,c,d){b[a]=[c,d]}};var b={toggle:[function(a){var b=this.getConf(),c=this.getTip(),d=b.opacity;d<1&&c.css({opacity:d}),c.show(),a.call()},function(a){this.getTip().hide(),a.call()}],fade:[function(b){var c=this.getConf();!a.browser.msie||c.fadeIE?this.getTip().fadeTo(c.fadeInSpeed,c.opacity,b):(this.getTip().show(),b())},function(b){var c=this.getConf();!a.browser.msie||c.fadeIE?this.getTip().fadeOut(c.fadeOutSpeed,b):(this.getTip().hide(),b())}]};function c(b,c,d){var e=d.relative?b.position().top:b.offset().top,f=d.relative?b.position().left:b.offset().left,g=d.position[0];e-=c.outerHeight()-d.offset[0],f+=b.outerWidth()+d.offset[1],/iPad/i.test(navigator.userAgent)&&(e-=a(window).scrollTop());var h=c.outerHeight()+b.outerHeight();g=="center"&&(e+=h/2),g=="bottom"&&(e+=h),g=d.position[1];var i=c.outerWidth()+b.outerWidth();g=="center"&&(f-=i/2),g=="left"&&(f-=i);return{top:e,left:f}}function d(d,e){var f=this,g=d.add(f),h,i=0,j=0,k=d.attr("title"),l=d.attr("data-tooltip"),m=b[e.effect],n,o=d.is(":input"),p=o&&d.is(":checkbox, :radio, select, :button, :submit"),q=d.attr("type"),r=e.events[q]||e.events[o?p?"widget":"input":"def"];if(!m)throw"Nonexistent effect \""+e.effect+"\"";r=r.split(/,\s*/);if(r.length!=2)throw"Tooltip: bad events configuration for "+q;d.on(r[0],function(a){clearTimeout(i),e.predelay?j=setTimeout(function(){f.show(a)},e.predelay):f.show(a)}).on(r[1],function(a){clearTimeout(j),e.delay?i=setTimeout(function(){f.hide(a)},e.delay):f.hide(a)}),k&&e.cancelDefault&&(d.removeAttr("title"),d.data("title",k)),a.extend(f,{show:function(b){if(!h){l?h=a(l):e.tip?h=a(e.tip).eq(0):k?h=a(e.layout).addClass(e.tipClass).appendTo(document.body).hide().append(k):(h=d.next(),h.length||(h=d.parent().next()));if(!h.length)throw"Cannot find tooltip for "+d}if(f.isShown())return f;h.stop(!0,!0);var o=c(d,h,e);e.tip&&h.html(d.data("title")),b=a.Event(),b.type="onBeforeShow",g.trigger(b,[o]);if(b.isDefaultPrevented())return f;o=c(d,h,e),h.css({position:"absolute",top:o.top,left:o.left}),n=!0,m[0].call(f,function(){b.type="onShow",n="full",g.trigger(b)});var p=e.events.tooltip.split(/,\s*/);h.data("__set")||(h.off(p[0]).on(p[0],function(){clearTimeout(i),clearTimeout(j)}),p[1]&&!d.is("input:not(:checkbox, :radio), textarea")&&h.off(p[1]).on(p[1],function(a){a.relatedTarget!=d[0]&&d.trigger(r[1].split(" ")[0])}),e.tip||h.data("__set",!0));return f},hide:function(c){if(!h||!f.isShown())return f;c=a.Event(),c.type="onBeforeHide",g.trigger(c);if(!c.isDefaultPrevented()){n=!1,b[e.effect][1].call(f,function(){c.type="onHide",g.trigger(c)});return f}},isShown:function(a){return a?n=="full":n},getConf:function(){return e},getTip:function(){return h},getTrigger:function(){return d}}),a.each("onHide,onBeforeShow,onShow,onBeforeHide".split(","),function(b,c){a.isFunction(e[c])&&a(f).on(c,e[c]),f[c]=function(b){b&&a(f).on(c,b);return f}})}a.fn.tooltip=function(b){var c=this.data("tooltip");if(c)return c;b=a.extend(!0,{},a.tools.tooltip.conf,b),typeof b.position=="string"&&(b.position=b.position.split(/,?\s/)),this.each(function(){c=new d(a(this),b),a(this).data("tooltip",c)});return b.api?c:this}})(jQuery);
(function(a){var b=a.tools.tooltip;b.dynamic={conf:{classNames:"top right bottom left"}};function c(b){var c=a(window),d=c.width()+c.scrollLeft(),e=c.height()+c.scrollTop();return[b.offset().top<=c.scrollTop(),d<=b.offset().left+b.width(),e<=b.offset().top+b.height(),c.scrollLeft()>=b.offset().left]}function d(a){var b=a.length;while(b--)if(a[b])return!1;return!0}a.fn.dynamic=function(e){typeof e=="number"&&(e={speed:e}),e=a.extend({},b.dynamic.conf,e);var f=a.extend(!0,{},e),g=e.classNames.split(/\s/),h;this.each(function(){var b=a(this).tooltip().onBeforeShow(function(b,e){var i=this.getTip(),j=this.getConf();h||(h=[j.position[0],j.position[1],j.offset[0],j.offset[1],a.extend({},j)]),a.extend(j,h[4]),j.position=[h[0],h[1]],j.offset=[h[2],h[3]],i.css({visibility:"hidden",position:"absolute",top:e.top,left:e.left}).show();var k=a.extend(!0,{},f),l=c(i);if(!d(l)){l[2]&&(a.extend(j,k.top),j.position[0]="top",i.addClass(g[0])),l[3]&&(a.extend(j,k.right),j.position[1]="right",i.addClass(g[1])),l[0]&&(a.extend(j,k.bottom),j.position[0]="bottom",i.addClass(g[2])),l[1]&&(a.extend(j,k.left),j.position[1]="left",i.addClass(g[3]));if(l[0]||l[2])j.offset[0]*=-1;if(l[1]||l[3])j.offset[1]*=-1}i.css({visibility:"visible"}).hide()});b.onBeforeShow(function(){var a=this.getConf(),b=this.getTip();setTimeout(function(){a.position=[h[0],h[1]],a.offset=[h[2],h[3]]},0)}),b.onHide(function(){var a=this.getTip();a.removeClass(e.classNames)}),ret=b});return e.api?ret:this}})(jQuery);
(function(a){var b=a.tools.tooltip;a.extend(b.conf,{direction:"up",bounce:!1,slideOffset:10,slideInSpeed:200,slideOutSpeed:200,slideFade:!a.browser.msie});var c={up:["-","top"],down:["+","top"],left:["-","left"],right:["+","left"]};b.addEffect("slide",function(a){var b=this.getConf(),d=this.getTip(),e=b.slideFade?{opacity:b.opacity}:{},f=c[b.direction]||c.up;e[f[1]]=f[0]+"="+b.slideOffset,b.slideFade&&d.css({opacity:0}),d.show().animate(e,b.slideInSpeed,a)},function(b){var d=this.getConf(),e=d.slideOffset,f=d.slideFade?{opacity:0}:{},g=c[d.direction]||c.up,h=""+g[0];d.bounce&&(h=h=="+"?"-":"+"),f[g[1]]=h+"="+e,this.getTip().animate(f,d.slideOutSpeed,function(){a(this).hide(),b.call()})})})(jQuery);


﻿function AddOrSubtractTwoFloats(fltValue1,fltValue2,bAddSubtract){var strNumber1=fltValue1.toString();var strNumber2=fltValue2.toString();var strResult="";if(strNumber1.indexOf(".")>-1||strNumber2.indexOf(".")>-1){if(strNumber1.indexOf(".")==-1){strNumber1=strNumber1+".0";}
if(strNumber2.indexOf(".")==-1){strNumber2=strNumber2+".0";}
var strDecimals1=strNumber1.substr(strNumber1.indexOf(".")+1);var strDecimals2=strNumber2.substr(strNumber2.indexOf(".")+1);var strInteger1=strNumber1.substr(0,strNumber1.indexOf("."));var strInteger2=strNumber2.substr(0,strNumber2.indexOf("."));var bNotSameLength=true;while(bNotSameLength){if(strDecimals1.length!=strDecimals2.length){if(strDecimals1.length<strDecimals2.length){strDecimals1+="0";}else{strDecimals2+="0";}}else{bNotSameLength=false;}}
var intOriginalDecimalLength=strDecimals1.length;for(var intCharIndex=0;intCharIndex<=strDecimals1.length-1;intCharIndex++){strInteger1=strInteger1+strDecimals1.substr(intCharIndex,1);strInteger2=strInteger2+strDecimals2.substr(intCharIndex,1);}
var intInteger1=Number(strInteger1);var intInteger2=Number(strInteger2);var intResult;if(bAddSubtract){intResult=intInteger1+intInteger2;}else{intResult=intInteger1-intInteger2;}
strResult=intResult.toString();for(var intZerosAdded=0;intZerosAdded<((intOriginalDecimalLength-strResult.length)+1);intZerosAdded++){strResult="0"+strResult;}
if(strResult.length>=intOriginalDecimalLength){strResult=strResult.substring(0,strResult.length-intOriginalDecimalLength)+"."+strResult.substring(strResult.length-intOriginalDecimalLength);}}else{if(bAddSubtract){strResult=Number(fltValue1)+Number(fltValue2);}else{strResult=Number(fltValue1)-Number(fltValue2);}}
return Number(strResult);}
(function(jQuery){jQuery.fn.jStepper=function(options){var opts=jQuery.extend({},jQuery.fn.jStepper.defaults,options);return this.each(function(){var $this=jQuery(this);var o=jQuery.meta?jQuery.extend({},opts,$this.data()):opts;if(o.disableAutocomplete){$this.attr("autocomplete","off");}
if(jQuery.isFunction($this.mousewheel)){$this.mousewheel(function(objEvent,intDelta){if(intDelta>0){MakeStep(o,1,objEvent,this);return false;}
else if(intDelta<0){MakeStep(o,0,objEvent,this);return false;}});}
$this.keydown(function(e){var key=e.keyCode;if(key==38){MakeStep(o,1,e,this);}
if(key==40){MakeStep(o,0,e,this);}});$this.keyup(function(e){CheckValue(o,this);});});};function CheckValue(o,objElm){var $objElm=jQuery(objElm);var strValue=$objElm.val();if(o.disableNonNumeric){strValue=strValue.replace(/[^\d\.,\-]/gi,"");}
if(o.maxValue!==null){if(strValue>=o.maxValue){strValue=o.maxValue;}}
if(o.minValue!==null){if(strValue<=o.minValue&&strValue!=""){strValue=o.minValue;}}
$objElm.val(strValue);}
function MakeStep(o,bDirection,keydown,objElm){var $objElm=jQuery(objElm);var stepToUse;if(keydown){if(keydown.ctrlKey){stepToUse=o.ctrlStep;}else if(keydown.shiftKey){stepToUse=o.shiftStep;}else{stepToUse=o.normalStep;}}else{stepToUse=o.normalStep;}
var numValue=$objElm.val();var intSelectionStart=numValue.length-objElm.selectionStart;var intSelectionEnd=numValue.length-objElm.selectionEnd;numValue=numValue.replace(/,/g,".");numValue=numValue.replace(o.decimalSeparator,".");numValue=numValue+'';if(numValue.indexOf(".")!=-1){numValue=numValue.match(new RegExp("-{0,1}[0-9]+[\\.][0-9]*"));}
numValue=numValue+'';if(numValue.indexOf("-")!=-1){numValue=numValue.match(new RegExp("-{0,1}[0-9]+[\\.]*[0-9]*"));}
numValue=numValue+'';numValue=numValue.match(new RegExp("-{0,1}[0-9]+[\\.]*[0-9]*"));if(numValue===""||numValue=="-"||numValue===null){numValue=o.defaultValue;}
if(bDirection==1){numValue=AddOrSubtractTwoFloats(numValue,stepToUse,true);}else{numValue=AddOrSubtractTwoFloats(numValue,stepToUse,false);}
var bLimitReached=false;if(o.maxValue!==null){if(numValue>=o.maxValue){numValue=o.maxValue;bLimitReached=true;}}
if(o.minValue!==null){if(numValue<=o.minValue){numValue=o.minValue;bLimitReached=true;}}
numValue=numValue+'';if(o.minLength!==null){var intLengthNow=numValue.length;if(numValue.indexOf(".")!=-1){intLengthNow=numValue.indexOf(".");}
var bIsNegative=false;if(numValue.indexOf("-")!=-1){bIsNegative=true;numValue=numValue.replace(/-/,"");}
if(intLengthNow<o.minLength){for(var i=1;i<=(o.minLength-intLengthNow);i++){numValue='0'+numValue;}}
if(bIsNegative){numValue='-'+numValue;}}
numValue=numValue+'';var intDecimalsNow;if(o.minDecimals>0){var intDecimalsMissing;if(numValue.indexOf(".")!=-1){intDecimalsNow=numValue.length-(numValue.indexOf(".")+1);if(intDecimalsNow<o.minDecimals){intDecimalsMissing=o.minDecimals-intDecimalsNow;}}else{intDecimalsMissing=o.minDecimals;numValue=numValue+'.';}
for(var intDecimalIndex=1;intDecimalIndex<=intDecimalsMissing;intDecimalIndex++){numValue=numValue+'0';}}
if(o.maxDecimals>0){intDecimalsNow=0;if(numValue.indexOf(".")!=-1){intDecimalsNow=numValue.length-(numValue.indexOf(".")+1);if(o.maxDecimals<intDecimalsNow){numValue=numValue.substring(0,numValue.indexOf("."))+"."+numValue.substring(numValue.indexOf(".")+1,numValue.indexOf(".")+1+o.maxDecimals);}}}
if(!o.allowDecimals){numValue=numValue+'';numValue=numValue.replace(new RegExp("[\\.].+"),"");}
numValue=numValue.replace(/\./,o.decimalSeparator);$objElm.val(numValue);objElm.selectionStart=numValue.length-intSelectionStart;objElm.selectionEnd=numValue.length-intSelectionEnd;CheckValue(o,objElm);if(o.onStep){o.onStep($objElm,bDirection,bLimitReached);}
return false;}
jQuery.fn.jStepper.defaults={maxValue:null,minValue:null,normalStep:1,shiftStep:5,ctrlStep:10,minLength:null,disableAutocomplete:true,defaultValue:1,decimalSeparator:",",allowDecimals:true,minDecimals:0,maxDecimals:null,disableNonNumeric:true,onStep:null};})(jQuery);

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

