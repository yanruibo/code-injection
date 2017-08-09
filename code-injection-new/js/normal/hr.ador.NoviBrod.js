






        document.addEventListener("deviceready", onDeviceReady, false);

        $(function () {
            $.mobileCounters.addSimple('Page##Plovilo');
        });

        function onDeviceReady() {
            $(".externalurl").click(function (e) {
                e.preventDefault();
                var linkToOpen = $(this).attr("href");
                window.open(linkToOpen, '_blank', 'EnableViewPortScale=yes');
                                    
            });
        }
    

        
    







        document.addEventListener("deviceready", onDeviceReady, false);

        $(function () {
            $.mobileCounters.addSimple('Page##Plovila');
        });

        function onDeviceReady() {
            // Now safe to use the PhoneGap API
        }
    

        $(function () {
            var categ = common.getParameterByName("cat");
            if (categ != '') {
                $("#only-new").css('display', 'block');
            } else {
                $("#only-new").css('display', 'none');
            }
        });
    

        
    






        document.addEventListener("deviceready", onDeviceReady, false);

        $(function () {
            $.mobileCounters.addSimple('Page##Cijene');
        });

        function onDeviceReady() {
            // Now safe to use the PhoneGap API
        }
    







        document.addEventListener("deviceready", onDeviceReady, false);

        $(function () {
            $.mobileCounters.addSimple('Page##Motorna');
        });

        function onDeviceReady() {
            // Now safe to use the PhoneGap API
        }
    






        document.addEventListener("deviceready", onDeviceReady, false);

        $(function () {
            $.mobileCounters.addSimple('Page##Osiguranje');
        });

        function onDeviceReady() {
            // Now safe to use the PhoneGap API

        }

    







        $(function () {
            $("#refreshJson").on("click", function (e) {
                e.preventDefault();
                common.getJson(true)
                    .done(function () { window.location.reload(); });
            });
            common.getJson();
            $.mobileCounters.addSimple('Page##Home');
        });

        var first = true;

        document.addEventListener("deviceready", onDeviceReady, false);

        function onDeviceReady() {
        }

        function initPushwoosh() {
            var pushNotification = window.plugins.pushNotification;
            pushNotification.onDeviceReady();

            pushNotification.registerDevice({ projectid: "962575248134", appid: "C2AF7-46F01" },
                function (status) {
                    var pushToken = status;
                    console.warn('push token: ' + pushToken);
                },
                function (status) {
                    console.warn(JSON.stringify(['failed to register ', status]));
                }
            );

           document.addEventListener('push-notification', function(event) {
			    var title = event.notification.title;
			    var userData = event.notification.userdata;
			    var msg = event.notification.message;
			
			    console.warn('user data: ' + JSON.stringify(userData));
			    navigator.notification.alert(msg);
			});
        }

        function init() {
            document.addEventListener("deviceready", initPushwoosh, true);
        }

    









         document.addEventListener("deviceready", onDeviceReady, false);

         $(function () {
             $.mobileCounters.addSimple('Page##Galerija');
         });

         function onDeviceReady() {
             // Now safe to use the PhoneGap API
         }
        

       
    





        document.addEventListener("deviceready", onDeviceReady, false);

        $(function () {
            $.mobileCounters.addSimple('Page##Kalkulator');
        });

        function onDeviceReady() {
            // Now safe to use the PhoneGap API
            
        }

    







        document.addEventListener("deviceready", onDeviceReady, false);

        $(function () {
            $.mobileCounters.addSimple('Page##Marke');
        });

        function onDeviceReady() {
            // Now safe to use the PhoneGap API
        }
    

           
    





        document.addEventListener("deviceready", onDeviceReady, false);

        $(function () {
            $.mobileCounters.addSimple('Page##Home');
        });

        function onDeviceReady() {
            $(".externalurl").click(function (e) {
                e.preventDefault();
                var linkToOpen = $(this).attr("href");
                window.open(linkToOpen, '_blank', 'EnableViewPortScale=yes');
            });
        }
    

//@+leo-ver=5-thin
//@+node:djekic.20121031095853.1128: * @file Scripts/plovila.js
//@@language javascript
//@@encoding utf-8

(function ($) {

    var showNum = 0,
        hashNum = 1,
        $container,
        template,
        stripComma = /,/g;
    
    if(window.location.hash) {
        var hash = window.location.hash.substring(1);
        hashNum = parseInt(hash);
    }
    
    //@+others
    //@+node:djekic.20121031095853.1129: ** document.ready
    $(function () {
    
        //@+others
        //@+node:djekic.20121031095853.1131: *3* plovila
        /*
         utility to apply json object to string containing placeholders for json members as "{{properyName}}"
        */
        $.applyJson = function (str, obj) {
            $.each(obj, function (i, o) {
                str = str.split("{{" + i + "}}").join(o);
            });
            return str;
        }

        $container = $("#katalog");
        template = $("#plovila").text();

        common.getJson().done( processData );





        //@-others
    
    });
    //@+node:djekic.20121101114124.1334: ** processData
    function processData(data) {
        var makers;

        var makerId = common.getParameterByName("mak");
        var cat = common.getParameterByName("cat");
        var cij = common.getParameterByName("cij");
        var subcat = common.getParameterByName("subcat");

        var allItems = $.merge([], data.katamarani);
        $.merge(allItems, data.motorni);
        $.merge(allItems, data.jedrilice);
        $.merge(allItems, data.gumenjak);

        if (makerId) {
            makers = $.map(allItems, function (o, i) {
                if (o.make == makerId) {
                    return o;
                }
            });

            makers = makers.sort( function( a, b ) {
                return a.m.localeCompare( b.model );
            } );
        }

        if (cat) {
            switch(cat){
                case "1":
                    makers = $.map(data.jedrilice, function (o, i) {
                        return o;
                    });
                    break;
                case "2":
                    if(subcat){
                        makers = $.map(data.motorni, function (o, i) {
                            if(o.st == subcat){
                                return o;
                            }
                        });
                    } else {
                        makers = $.map(data.motorni, function (o, i) {
                            return o;
                        });
                    }
                    break;
                case "3":
                    makers = $.map(data.katamarani, function (o, i) {
                        return o;
                    });
                    break;
              case "4":
                    makers = $.map(data.gumenjak, function (o, i) {
                        return o;
                    });
                    break;
            }
            
        }

        if (cij) {
            switch (cij) {
                case "1":
                    makers = $.map(allItems, function (o, i) {
                        if (o.eur <= 20000) {
                            return o;
                        }
                    });
                    break;
                case "2":
                     makers = $.map(allItems, function (o, i) {
                        if (o.eur > 20000 && o.eur <= 60000) {
                            return o;
                        }
                    });
                    break;
               case "3":
                     makers = $.map(allItems, function (o, i) {
                        if (o.eur > 60000 && o.eur <= 100000) {
                            return o;
                        }
                    });
                    break;
                case "4":
                    makers = $.map(allItems, function (o, i) {
                        if (o.eur > 100000) {
                            return o;
                        }
                    });
                    break;
            }
            makers = makers.sort( function( a, b ) {
                return parseFloat(a.eur) < parseFloat(b.eur) ? -1 : 1;
            } );
        }


        iteration(makers, false);

        $("#loadmore").click(function (e) {
            e.preventDefault();
            hashNum += 1;
            window.location.hash = hashNum;
            iteration(makers, true);
        });
    }
    //@+node:djekic.20121101114124.1337: ** iteration
    function iteration(makers, addmore) {
        var itemsNum = makers.length;
        var displayCount = 0;
        var toDisplay = 10;
        if(window.location.hash && !addmore) {
            var hash = window.location.hash.substring(1);
            toDisplay = 10 * hash;
        }
        
        $.each(makers, function (i, o) {
            if (showNum < itemsNum && displayCount < toDisplay && i > (showNum-1) ) {
                var target = $.applyJson(template, o),
                $target = $(target).appendTo($container);
                displayCount += 1;
                showNum += 1;
            }
        });
        if ((showNum - itemsNum) == 0) {
            $("#loadmore").hide();
        }
    }
    //@-others
})(jQuery);
//@-leo


$(function () {
    $("#snaga, #vrijednost").blur(function () {
        this.value = this.value.replace(/[^0-9]/g, "");
        changeVars($("#vrstaplovila").val());
    });
    $("#vrstaplovila").change(function () {
        changeVars($("#vrstaplovila").val());
        calculate();
    });

    $("#izracunaj").click(function () {
        if($("#snaga").val() != "" && $("#vrijednost").val() != ""){
            changeVars($("#vrstaplovila").val());
            calculate();
            $("#obavijest").text(" ");
        } else {
            $("#obavijest").text("Molimo unesite vrijednosti.");
        }
    });

    changeVars(1);
});

function changeVars(vrstaPlovila) {
    
    if (vrstaPlovila == 2) {
        vrstaVar = 1.3;
        kaskoVar = calculateKaskoVar();
    } else {
        vrstaVar = 1.5;
        kaskoVar = calculateKaskoVar();
    }
}

function calculateKaskoVar() {
    vrijednost = $("#vrijednost").val();

    if (vrijednost != '') {
        if (vrijednost > 187500) {
            kaskoKoef = (vrstaVar - vrijednost / 7500000 - 0.1) / 100;
        } else {
            kaskoKoef = 0.0192;
        }
    }
}


function calculate() {
    premijaBase = vrijednost * kaskoKoef;
    bonus = premijaBase * 0.35 * (-1);
    premijaUkupno = premijaBase + bonus;

    snaga = $("#snaga").val();

    odgovornost = 0;

    if (snaga < 29.9) odgovornost = 180;
    else if (snaga >= 29.9 && snaga < 49.9) odgovornost = 270;
    else if (snaga >= 49.9 && snaga < 109.9) odgovornost = 360;
    else if (snaga >= 109.9 && snaga < 179.9) odgovornost = 505;
    else if (snaga >= 179.9) odgovornost = 600;
    $("#premijaBase").text(premijaBase.toFixed(2).replace(".", ","));
    $("#bonus").text(bonus.toFixed(2).replace(".", ","));
    $("#premijaUkupno").text(premijaUkupno.toFixed(2).replace(".", ","));
    $("#odgovornost").text(odgovornost.toFixed(2).replace(".", ","));
    $("#ukupno").text((odgovornost + premijaUkupno).toFixed(2).replace(".", ","));
}

//@+leo-ver=5-thin
//@+node:djekic.20121101114124.1132: * @file Scripts/plovilo.js
//@@language javascript
//@@encoding utf-8

(function ($) {

        var $container,
            template;

    //@+others
    //@+node:djekic.20121101114124.1133: ** document.ready
    $(function () {
    
        //@+others
        //@+node:djekic.20121101114124.1134: *3* plovilo
        /*
         utility to apply json object to string containing placeholders for json members as "{{properyName}}"
        */
        $.applyJson = function (str, obj) {
            $.each(obj, function (i, o) {
                str = str.split("{{" + i + "}}").join(o);
            });
            return str;
        }

        $container = $("article");

        ptype = common.getParameterByName("type");

        if(ptype == "1" || ptype == "3"){
            template = $("#plovilotip13").text();
        } else if(ptype == "2"){
            template = $("#plovilotip2").text();
        } else if(ptype == "4"){
            template = $("#plovilotip4").text();
        }

        common.getJson().done( processData );
        //@-others
    
    });
    //@+node:djekic.20121102094839.1148: ** processData
    function processData(data) {
        var makers;
        var pid = common.getParameterByName("id");
        
        if (pid != "" && pid) {
            switch(ptype){
                case "1":
                    makers = $.map(data.jedrilice, function (o, i) {
                        if (o.id == pid) {
                            o.p = parseInt( o.p ).toLocaleString();
                            $.mobileCounters.addSimple('Boats##' + o.make + "##" + o.m);
                            return o;
                        }
                    });
                    break;
                case "2":
                    makers = $.map(data.motorni, function (o, i) {
                        if (o.id == pid) {
                            o.p = parseInt( o.p ).toLocaleString();
                            $.mobileCounters.addSimple('Boats##' + o.make + "##" + o.m);
                            return o;
                        }
                    });
                    break;
                case "3":
                    makers = $.map(data.katamarani, function (o, i) {
                        if (o.id == pid) {
                            o.p = parseInt( o.p ).toLocaleString();
                            $.mobileCounters.addSimple('Boats##' + o.make + "##" + o.m);
                            return o;
                        }
                    });
                    break;
                case "4":
                    makers = $.map(data.gumenjak, function (o, i) {
                        if (o.id == pid) {
                            o.p = parseInt( o.p ).toLocaleString();
                            $.mobileCounters.addSimple('Boats##' + o.make + "##" + o.m);
                            return o;
                        }
                    });
                    break;
            }
            
        }

        iteration(makers);
    }
    //@+node:djekic.20121102094839.1149: ** iteration
    function iteration(makers) {
        $.each(makers, function (i, o) {
            var target = $.applyJson(template, o),
            $target = $(target).appendTo($container);
            if (o.g != null && o.g.length > 0){
                addGalleryLink(o.id);
            }
        });
    }
    //@+node:djekic.20121102094839.1150: ** addGalleryLink
    function addGalleryLink(pid){
        $("article img").after('<a id="showgallery" href="galerija.html?id='+ pid +'">Galerija</a>');
    }
    //@-others

})(jQuery);
//@-leo


//@+leo-ver=5-thin
//@+node:djekic.20121030134557.1314: * @file Scripts/category.js
//@@language javascript
//@@encoding utf-8

(function($){

    var $container,
        template;

    //@+others
    //@+node:djekic.20121030134557.1315: ** document.ready
    $( function() {
        
        //@+others
        //@+node:djekic.20121030134557.1316: *3* marke
        /*
         utility to apply json object to string containing placeholders for json members as "{{properyName}}"
        */
        $.applyJson = function( str, obj ) {
            $.each( obj, function( i, o ) {
                str = str.split( "{{"+i+"}}" ).join( o );
            } );
            return str;
        }
        
        $container = $( "nav ul" );
        template = $( "#marke" ).text();
        
        common.getJson().done( processData );
        //@-others
        
    });
    //@+node:djekic.20121102103027.1151: ** processData
    function processData(data) {

        function sort_unique(arr) {
            arr = arr.sort( function( a, b ) {
                return a.localeCompare( b );
            } );
            var ret = [arr[0]];
            for (var i = 1; i < arr.length; i++) { // start loop at 1 as element 0 can never be a duplicate
                if (arr[i-1] !== arr[i]) {
                    ret.push(arr[i]);
                }
            }
            return ret;
        }
        
        var allItems = $.merge([], data.katamarani);
        $.merge(allItems, data.motorni);
        $.merge(allItems, data.jedrilice);
        $.merge(allItems, data.gumenjak);
            

        var makers = $.map(allItems, function(o,i){
            console.log(o.make, o.id, o.m)
            return o.make;
        });

        makers = sort_unique(makers);
       
        $.each( makers, function( i, o ) {
            var target = $.applyJson( template, { make: o } ),
            $target = $( target ).appendTo( $container );
        });
    }
    //@-others

})(jQuery);
//@-leo


//@+leo-ver=5-thin
//@+node:djekic.20121101114124.1135: * @file Scripts/galerija.js
//@@language javascript
//@@encoding utf-8

(function ($) {
    
    var $container,
        template;
    
    //@+others
    //@+node:djekic.20121101114124.1136: ** document.ready
    $(function () {
    
        //@+others
        //@+node:djekic.20121101114124.1137: *3* galerija
        /*
         utility to apply json object to string containing placeholders for json members as "{{properyName}}"
        */
        $.applyJson = function (str, obj) {
            $.each(obj, function (i, o) {
                str = str.split("{{" + i + "}}").join(o);
            });
            return str;
        }

        $container = $("#gallery");
        template = $("#slike").text();

        common.getJson().done( processData );
        //@-others
    
    });
    //@+node:djekic.20121102103027.1153: ** processData
    function processData(data) {
        var makers;
        var pid = common.getParameterByName("id");

        var allItems = $.merge([], data.katamarani);
        $.merge(allItems, data.motorni);
        $.merge(allItems, data.jedrilice);
        $.merge(allItems, data.gumenjak);

        if (pid != "" && pid) {
            makers = $.map(allItems, function (o, i) {
                if (o.id == pid) {
                    return o.g;
                }
            });
        }
        iteration(makers);
    }
    //@+node:djekic.20121102103027.1152: ** iteration
    function iteration(makers) {
        $.each(makers, function (i, o) {
            var target = $.applyJson(
                template, {
                    large: o,
                    small: o
                }
            ),
            $target = $(target).appendTo($container);
        });
        callSwipe();
    }
    //@+node:djekic.20121101114124.1138: ** photoSwipe
    function callSwipe(){
        (function (window, PhotoSwipe) {
    
                     var options = {captionAndToolbarShowEmptyCaptions:false},
                        instance = PhotoSwipe.attach(window.document.querySelectorAll('#gallery a'), options);
    
    
        }(window, window.Code.PhotoSwipe));
    }
    //@-others

})(jQuery);
//@-leo


//@+leo-ver=5-thin
//@+node:djekic.20121101114124.1330: * @file Scripts/common.js
//@@language javascript
//@@encoding utf-8

var common = {
    jsonSource : 'http://www.novibrod.hr/novibrodjson/',
    ver: 'http://www.novibrod.hr/version/'
};

(function ($) {

    //@+others
    //@+node:djekic.20130731080909.1279: ** InAppBrowser
    common.openUrlInApp = function (url) {
      window.open(url, '_blank', 'EnableViewPortScale=yes');
    }
    //@+node:djekic.20121101114124.1332: ** JSON.stringify
    // implement JSON.stringify serialization
    JSON.stringify = JSON.stringify || function (obj) {
        var t = typeof (obj);
        if (t != "object" || obj === null) {
            // simple data type
            if (t == "string") obj = '"'+obj+'"';
            return String(obj);
        }
        else {
            // recurse array or object
            var n, v, json = [], arr = (obj && obj.constructor == Array);
            for (n in obj) {
                v = obj[n]; t = typeof(v);
                if (t == "string") v = '"'+v+'"';
                else if (t == "object" && v !== null) v = JSON.stringify(v);
                json.push((arr ? "" : '"' + n + '":') + String(v));
            }
            return (arr ? "[" : "{") + String(json) + (arr ? "]" : "}");
        }
    };
    //@+node:djekic.20121101114124.1331: ** ajax helpers
    var shouldReload = false;
    var lastCheck = localStorage.lastCheck;

    common.getJson = function ( refresh ) {
        var jsonstr = localStorage.savedJson;
        var loading;
        if( !jsonstr || refresh ) {
            loading = new $.Deferred();
            $.ajax( {
                type: "GET",
                url: common.jsonSource,
                dataType: "jsonp",
                cache: false
            } ).done( function( data ) {
                localStorage.savedJson = JSON.stringify( data );
                localStorage.lastCheck = (new Date()).toString();
                loading.resolve( data );
            } );
        } else {
            loading = new $.Deferred();
            var json = $.parseJSON( jsonstr );
            if( !lastCheck || new Date() - new Date( lastCheck ) > 15000 ) {
                $.ajax( {
                    type: "GET",
                    url: common.ver,
                    dataType: "jsonp",
                    cache: false
                } ).done( function( data ) {
                    var oldVer = json.version;
                    if( oldVer != data ) {
                        common.getJson( true );
                    }
                    localStorage.lastCheck = (new Date()).toString();
                } );
            }
            
            loading.resolve( json );
        }
        
        return loading.promise();
    }
    //@+node:djekic.20121101114124.1340: ** getParameterByName
    common.getParameterByName = function (name) {
        name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
        var regexS = "[\\?&]" + name + "=([^&#]*)";
        var regex = new RegExp(regexS);
        var results = regex.exec(window.location.search);
        if (results == null)
            return "";
        else
            return decodeURIComponent(results[1].replace(/\+/g, " "));
    }
    //@-others

})(jQuery);

//@-leo


﻿(function ($) {

    $.mobileCounters = {

        minQueue: 3,
        maxQueue: 10,
        serviceUrl: "http://mobilecounters.ador.hr/Home",
        appKey: '1a88596c-4d9b-4fe5-9e9d-5f03cb153b85',
        add: add,
	    addSimple: addSimple

    }

    //var clean = /^(<[^>]*>)?([^<]+)(<[^>]*>)?$/;

    $.mobileCounters.getDeviceCode = function (serviceUrl, appKey) {
        console.warn("getDeviceCode function");
		return $.ajax({
            type: "GET",
            url: serviceUrl + "/generateGuid",
            data: 'data={"appKey":"' + appKey + '"}',
            contentType: "application/json; charset=utf-8",
            dataType: "jsonp"
        }).promise();
    }

    function addToQueue(contentCode) {
        var item = [(new Date()).toISOString(), contentCode],
            q = localStorage.mcQueue;
        if (!q) {
            q = [];
            //localStorage.mcQueue = q;
        } else {
            q = $.parseJSON(q);
        }
        if (q.length >= $.mobileCounters.maxQueue) {
            q = [];
        }
        q.push(item);
        localStorage.mcQueue = JSON.stringify(q);
        return q;
    }

    $.mobileCounters.sendQueue = function(serviceUrl, appKey, deviceCode, queue) {

        var data = { appKey: appKey, deviceCode: deviceCode, queue: JSON.stringify(queue) };
		//console.warn("SENDING APP KEY: " + data.appKey);
		//console.warn("SENDING DEVICE CODE: " + data.deviceCode);
		//console.warn("CURRENT QUEUE: " + data.queue);
		//console.warn("SENDING QUEUE: " + data.queue.length);
        return $.ajax({
            type: "GET",
            url: serviceUrl + "/addVisits",
            data: data,
			traditional: true,
            contentType: "application/json; charset=utf-8",
            dataType: "jsonp"
        }).promise();
    }

    function add(serviceUrl, appKey, contentCode) {
        var q = addToQueue(contentCode);
        //console.warn("ADD: " + contentCode + " Q LENGTH: " + q.length);
        if (q.length >= $.mobileCounters.minQueue) {
            var deviceCode = localStorage.mcDeviceCode,
                gettingCode;
				//console.warn("CURRENT DEVICE CODE: " + deviceCode);
            if (!deviceCode) {
                gettingCode = $.mobileCounters.getDeviceCode(serviceUrl, appKey);
            } else {
                gettingCode = new $.Deferred();
                gettingCode.resolve( deviceCode );
            }
            //debugger;

            gettingCode.done(function (code) {
                deviceCode = code; //.replace(clean, "$2");
				//console.warn("DEVICE CODE: %o" + deviceCode, code);
                localStorage.mcDeviceCode = deviceCode;
                var sending = $.mobileCounters.sendQueue(serviceUrl, appKey, deviceCode, q);
                sending.done(function () {
                    localStorage.mcQueue = "[]";
                });
                //alert("getting done");
            }).fail(function () {
                //console.error("getting error");
                //alert("getting error");
            }).always(function () {
                //alert("getting always");
            });
        }
    }

    function addSimple(contentCode) {
        return add($.mobileCounters.serviceUrl, $.mobileCounters.appKey, contentCode);
    }

})(jQuery);
