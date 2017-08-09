



















        var AppData = {
          Config: {},
          CurrentValve: {}
        };

        var calculatorService = new CalculatorService([
          new FreseSCalculatorService([
            new DN15LPFreseSCalculator(),
            new DN15HPFreseSCalculator(),
            new DN20LPFreseSCalculator(),
            new DN20HPFreseSCalculator(),
            new DN25LPFreseSCalculator(),
            new DN25HPFreseSCalculator(),
            new DN32FreseSCalculator(),
            new DN40FreseSCalculator(),
            new DN50FreseSCalculator()
          ]),
          new FreseOptimaCalculatorService([
            new DN15LFFreseOptimaCalculator(),
            new DN15HFFreseOptimaCalculator(),
            new DN20LFFreseOptimaCalculator(),
            new DN20HFFreseOptimaCalculator(),
            new DN25LFFreseOptimaCalculator(),
            new DN25HFFreseOptimaCalculator(),
            new DN32FreseOptimaCalculator(), 
            new DN40FreseOptimaCalculator(),
            new DN50FreseOptimaCalculator()
          ]),
          new FreseOptimaCompactCalculatorService([
            new DN10Low25FreseOptimaCompactCalculator(),
            new DN10Low50FreseOptimaCompactCalculator(),
            new DN15Low25FreseOptimaCompactCalculator(),
            new DN15Low50FreseOptimaCompactCalculator(),
            new DN15High25FreseOptimaCompactCalculator(),
            new DN20High25FreseOptimaCompactCalculator(),
            new DN20High40FreseOptimaCompactCalculator(),
            new DN20High50FreseOptimaCompactCalculator(),
            new DN2555FreseOptimaCompactCalculator(),
            new DN3255FreseOptimaCompactCalculator()
          ]),
          new FreseOptimaFlangeCalculatorService([
            new DN50LFFreseOptimaFlangeCalculator(),
            new DN50HFFreseOptimaFlangeCalculator(),
            new DN65LFFreseOptimaFlangeCalculator(),
            new DN65HFFreseOptimaFlangeCalculator(),
            new DN80LFFreseOptimaFlangeCalculator(),
            new DN80HFFreseOptimaFlangeCalculator()
          ]),
          new FresePVCalculatorService([
            new DN15530KPAFresePVCalculator(),
            new DN152060KPAFresePVCalculator(),
            new DN20530KPAFresePVCalculator(),
            new DN202060KPAFresePVCalculator(),
            new DN25530KPAFresePVCalculator(),
            new DN252060KPAFresePVCalculator(),
            new DN322080KPAFresePVCalculator(),
            new DN402080KPAFresePVCalculator(),
            new DN502080KPAFresePVCalculator()
          ]),
          new FresePVSCalculatorService([
            new DN15530KPAFresePVSCalculator(new DN15LPFreseSCalculator(), new DN15530KPAFresePVCalculator()),
            new DN152060KPAFresePVSCalculator(new DN15HPFreseSCalculator(), new DN152060KPAFresePVCalculator()),
            new DN20530KPAFresePVSCalculator(new DN20LPFreseSCalculator(), new DN20530KPAFresePVCalculator()),
            new DN202060KPAFresePVSCalculator(new DN20HPFreseSCalculator(), new DN202060KPAFresePVCalculator()),
            new DN25530KPAFresePVSCalculator(new DN25LPFreseSCalculator(), new DN25530KPAFresePVCalculator()),
            new DN252060KPAFresePVSCalculator(new DN25HPFreseSCalculator(), new DN252060KPAFresePVCalculator()),
            new DN322080KPAFresePVSCalculator(new DN32FreseSCalculator(), new DN322080KPAFresePVCalculator()),
            new DN402080KPAFresePVSCalculator(new DN40FreseSCalculator(), new DN402080KPAFresePVCalculator()),
            new DN502080KPAFresePVSCalculator(new DN50FreseSCalculator(), new DN502080KPAFresePVCalculator())
          ]),
          new FreseALPHACalculatorService([
            new DN1525FreseALPHACalculator(),
            new DN25L50FreseALPHACalculator()
          ]),
          new FresePVCompactCalculatorService([
            new DN15KPa530FresePVCompactCalculator(),
            new DN15KPa2060FresePVCompactCalculator()
          ]),
          new FreseEVACalculatorService([
            new DN1525FreseEVACalculator()
          ])
        ]);

        var localize = function (string, fallback) {
          var localized = string.toLocaleString();
          if (localized != string) {
            return localized;
          } else {
            return fallback;
          }
        }; // localize

        function onBodyLoad() {
          document.addEventListener("deviceready", onDeviceReady, false);
          document.addEventListener("resume", onResume, false);
          document.addEventListener("pause", onPause, false);
        } // onBodyLoad

        function onResume() {
          navigator.splashscreen.show();
          setTimeout(function() { navigator.splashscreen.hide(); }, 2000);
        } // onResume

        function onPause() {
          navigator.splashscreen.show();
        } // onPause

        function onPagebeforechange(event, data) {
          if (typeof data.toPage == "string" && data.toPage.match("#calculate")) {
            // no valve => warning and go no-where
            if (AppData.CurrentValve === undefined || AppData.CurrentValve.name === undefined || AppData.CurrentValve.name == "") {
              navigator.notification.alert(localize("%PleaseSelectFrese", "Please select Frese!"));
              event.stopImmediatePropagation();
              event.preventDefault();
              $("#main-tabbar").find('a').removeClass('ui-btn-active ui-state-persist');
              $("#main-tabbar-valves").addClass('ui-btn-active ui-state-persist');
              return;
            }

            // dimension options
            var html = [];
            html.push('<option value="Dimension">' + localize('%Dimension', 'Dimension') + '</option>');
            for (var i = 0; i < AppData.CurrentValve.items.length; i++) {
              html.push('<option value="' + AppData.CurrentValve.items[i].value + '">' +
						            AppData.CurrentValve.items[i].name +
						            '</option>');
            }
            $("#chooseValveSize").html(html.join('')).selectmenu();
            $("#valve-size-container").show();
            $("#start-calculate").val(localize("%Calculate", "Calculate")).button('refresh');

            // Valve specific settings
            if (AppData.CurrentValve.name == "Frese-PVS") {
              $("#custom-result").show();
              $("#custom-dp-title").hide();
              $("#custom-setting-title").text(localize("%SettingFresePV", "Setting FresePV"));
              $("#custom-dp-title").text(localize("%SettingFreseS", "Setting FreseS"));
              $("#setting-title").text(localize("%MinDelta", "Min. ‚àÜP (kPa)"));
              $("#dp-title").text(localize("%MinDelta", "Min. ‚àÜP (kPa)"));
            }
    				else if (AppData.CurrentValve.name == "Frese-PV-Compact") {
              $("#custom-setting-title").text(localize("%Turns", "No. turns"));
              $("#dp-title").text(localize("%MinDelta", "Min. ‚àÜP (kPa)"));
            }
    				else if (AppData.CurrentValve.name == "Frese-EVA") {
              $("#valve-size-container").hide();
              $("#start-calculate").val(localize("%Search", "Search")).button('refresh');
              if (AppData.Config.unit == "second") {
                $("#custom-setting-title").text(localize("%Flow", "Flow") + ' (' + localize("%L/S", "l/s") + ')');
              } else {
                $("#custom-setting-title").text(localize("%Flow", "Flow") + ' (' + localize("%L/H", "l/h") + ')');
              }
              $("#custom-dp-title").text(localize("%MinDelta", "Min. ‚àÜP (kPa)"));
              $("#setting-title").text(localize("%VarenrLP", "Item no. LP"));
              $("#dp-title").text(localize("%VarenrHP", "Item no. HP"));
           	}
		    		else if (AppData.CurrentValve.name == "Frese-ALPHA") {
              $("#start-calculate").val(localize("%Search", "Search")).button('refresh');
              if (AppData.Config.unit == "second") {
                $("#custom-setting-title").text(localize("%Flow", "Flow") + ' (' + localize("%L/S", "l/s") + ')');
              } else {
                $("#custom-setting-title").text(localize("%Flow", "Flow") + ' (' + localize("%L/H", "l/h") + ')');
              }
              $("#custom-dp-title").text(localize("%MinDelta", "Min. ‚àÜP (kPa)"));
              $("#setting-title").text(localize("%VarenrLP", "Item no. LP"));
              $("#dp-title").text(localize("%VarenrHP", "Item no. HP"));
            }
				    else {
              $("#custom-result").hide();
              $("#setting-title").text(localize("%Setting", "Setting"));
              $("#dp-title").text(localize("%MinDelta", "Min. ‚àÜP (kPa)"));
            }
               
            if (AppData.CurrentValve.name == "Frese-S" || 
            		AppData.CurrentValve.name == "Frese-OPTIMA" || 
            		AppData.CurrentValve.name == "Frese-OPTIMA-Compact" || 
            		AppData.CurrentValve.name == "Frese-OPTIMA-Flange" || 
            		AppData.CurrentValve.name == "Frese-ALPHA" || 
            		AppData.CurrentValve.name == "Frese-EVA") {
              $("#enter-pressure-panel").css("display", "none");
              $("#enterPressure").val("20");
              if (AppData.CurrentValve.name == "Frese-OPTIMA-Flange") {
                $("#enterPressure").val("30");
              }
            } else {
              $("#enter-pressure-panel").css("display", "block");
              $("#enterPressure").val("");
            }

          } // goto #calculate

          // Settings page
          if (typeof data.toPage == "string" && data.toPage.match("#settings")) {
            if (AppData.Config && AppData.Config.unit) {
              $("#chooseUnit").val(AppData.Config.unit);
            }
            if (AppData.Config && AppData.Config.language) {
              $("#setting-select-language").val(AppData.Config.language);
            }
          } // goto #settings
        
          // Main page
          if (typeof data.toPage == "string" && data.toPage.match("#main")) {
            if (AppData.CurrentValve === undefined || AppData.CurrentValve.name === undefined || AppData.CurrentValve.name == "") {
              $("#main-tabbar-calculate").addClass('ui-disabled');
            } else {
              $("#main-tabbar-calculate").removeClass('ui-disabled');
            }
          } // goto #main
        } // onPagebeforechange

        function startCalculate(e) {
          var flow = parseFloat($("#enterFlow").val());

          if (AppData.Config.unit == "second") {
            // 60 seconds / minute * 60 minutes / hour = 3600 seconds / hour
            flow = flow * 3600;
          }

          if (AppData.CurrentValve.name == "Frese-OPTIMA-Flange") {
            // Calculator for OPTIMA Flange requires the input in m3 / hour and 1 m3 = 1000 L
            flow = flow / 1000;
          }

          var pressure = parseFloat($("#enterPressure").val());
          // get valve dimension
          var valveSize = $("#chooseValveSize").val();
          if (valveSize == "Dimension") {
            navigator.notification.alert(localize("%NoDimension", "Dimension must be chosen before calculations can be done."));
            e.stopImmediatePropagation();
            e.preventDefault();
            return false;
          }

          var result = calculatorService.calculate(AppData.CurrentValve, valveSize, flow, pressure);

          // Reset output
          $('.black-color').removeClass('black-color');
          $('.green-color').removeClass('green-color');
          $('.larger-font').removeClass('larger-font');
          $('.smaller-font').removeClass('smaller-font');
          $('#results-table').hide();
          $('#error-message').hide();
            
          // Always shown for results
          $("#setting-title").show();
          $("#dp-title").show();
             
          if (AppData.CurrentValve.name == "Frese-PVS") {
            if (result.getSetting() == -1 || result.getMinDelta() == -1 || result.getCustomSetting() == -1) {
              $('#error-message').text(localize('%NA', 'NOT APPLICABLE'));
              $('#error-message').show();
              return;
            }
            $("#dp-title").hide();
            $("#setting-result")
              .addClass('green-color')
              .text(result.getMinDelta().toFixed(1));
            $("#custom-setting-title").show();
            $("#custom-setting-result")
              .addClass('green-color')
              .text(result.getCustomSetting().toFixed(1));
            $("#custom-dp-title").show();
            $("#custom-dp-result")
              .addClass('green-color')
              .text(result.getSetting().toFixed(1));
            $('#results-table').show();
          }
          else if (AppData.CurrentValve.name == "Frese-ALPHA" || AppData.CurrentValve.name == "Frese-EVA") {
            if (result.getCustomSetting() == -1 ||
                ((AppData.CurrentValve.name == "Frese-ALPHA") && (result.getCustomMinDelta() == -1)) ||
                ((AppData.CurrentValve.name == "Frese-EVA") && (result.getMinDeltaTotalVentil() == -1))) {
              $('#error-message').text(localize('%NA', 'NOT APPLICABLE'));
              $('#error-message').show();
              return;
            }

            $("#setting-result")
              .addClass('black-color')
              .text(result.getSetting());
            $("#dp-result")
              .addClass('black-color')
              .text(result.getMinDelta());
            $("#custom-setting-title").show();
            
            if (AppData.Config.unit == 'second') {
              // 60 seconds / minute * 60 minutes / hour = 3600 seconds / hour
              $("#custom-setting-result")
                .addClass('smaller-font green-color')
                .text((result.getCustomSetting() / 3600).toFixed(4));
            } else {
              $("#custom-setting-result")
                .addClass('smaller-font green-color')
                .text(result.getCustomSetting().toFixed(0));
            }

            $("#custom-dp-title").show();
            if (AppData.CurrentValve.name == "Frese-EVA") {
              $("#custom-dp-result")
                .addClass('smaller-font green-color')
                .text(result.getMinDeltaTotalVentil().toFixed(1));
            } else {
              $("#custom-dp-result")
                .addClass('smaller-font green-color')
                .text(result.getCustomMinDelta().toFixed(1));
            }

            $('#results-table').show();
            
          } else {
            if (result.getSetting() == -1 || result.getMinDelta() == -1) {
              $('#error-message').text(localize('%NA', 'NOT APPLICABLE'));
              $('#error-message').show();
              return;
            }
            if (AppData.CurrentValve.name == "Frese-PV-Compact" || AppData.CurrentValve.name == "Frese-PV") {
              $("#setting-title").text(localize("%Turns", "No. turns"));
            } 
               
            $("#setting-title").addClass('larger-font');
            $("#dp-title").addClass('larger-font');
            $("#setting-result")
              .addClass('larger-font green-color')
              .text(result.getSetting().toFixed(1));
            $("#dp-result")
              .addClass('larger-font green-color')
              .text(result.getMinDelta().toFixed(1));
            $('#results-table').show();
          }
        } // startCalculate

        function onNewCalculate() {
          // Dimension reset
          if (AppData.CurrentValve.name == "Frese-EVA") {
             $("#chooseValveSize").val("DN1525").selectmenu("refresh", true);
          } else {
             $("#chooseValveSize").val("Dimension").selectmenu("refresh", true);
          }
            
          // Flow reset
          $("#enterFlow").val('');
          
          // Pressure reset
          if (AppData.CurrentValve.name == "Frese-S" || 
              AppData.CurrentValve.name == "Frese-OPTIMA" || 
              AppData.CurrentValve.name == "Frese-OPTIMA-Compact" || 
              AppData.CurrentValve.name == "Frese-OPTIMA-Flange" || 
              AppData.CurrentValve.name == "Frese-EVA") {
            $("#enterPressure").val('20');
            if (AppData.CurrentValve.name == "Frese-OPTIMA-Flange") {
              $("#enterPressure").val("30");
            }
          } else {
            $("#enterPressure").val('');
          }

          $("#setting-title").hide();
          $("#setting-result").text("");

          $("#dp-title").hide();
          $("#dp-result").text("");

          $("#custom-setting-title").hide();
          $("#custom-setting-result").text("");

          $("#custom-dp-title").hide();
          $("#custom-dp-result").text("");

          $('#error-message').hide();
          $('#results-table').hide();
        } // onNewCalculate

        
        function onDeviceReady() {
          document.addEventListener("backbutton", function(e) {
            console.log("Back button pressed!!!!");                 
            if ($.mobile.activePage.attr('id') == 'main') {
              // Prompt to confirm the exit
              navigator.app.exitApp();
            }
            else {
              window.history.back();
            }
          }, false);

          $.mobile.defaultPageTransition = 'none';
          String.locale = navigator.language;
             
          ValvesConfig.loadConfig(loadConfigCompleted);
        } // onDeviceReady

        
        function loadCommonAttributes() {
          initValves();
          refreshLanguageText();
          $(document).bind("pagebeforechange", onPagebeforechange);
          $(':jqmData(role="page")').bind('pageshow', function(e) {
            switch (this.id) {
            case 'settings':
              $("#saveConfig").text(localize("%Save", "Save"));
              $("#chooseUnit").selectmenu('refresh', true);
              $("#setting-select-language").selectmenu('refresh', true);
              break;
            case 'main':
              $(".tabbar-button-calculate .ui-btn-text").text(localize("%Calculate", "Calculate"));
              $(".tabbar-button-valves .ui-btn-text").text(localize("%Valves", "Valves"));
              $(".tabbar-button-settings .ui-btn-text").text(localize("%Settings", "Settings"));
              break;
            case 'calculate':
              // Reset the calculator
              onNewCalculate();
              $('#backButton').text(localize("%Back", "Back"));

              if (AppData.Config.unit == "second") {
                $("#unitConfig").text(localize("%L/S", "l/s"));
              } else {
                $("#unitConfig").text(localize("%L/H", "l/h"));
              }

              $('#pressure-unit').text(localize('%kPa', 'kPa'));

              $(".tabbar-button-calculate .ui-btn-text").text(localize("%Calculate", "Calculate"));
              $(".tabbar-button-valves .ui-btn-text").text(localize("%Valves", "Valves"));
              $(".tabbar-button-settings .ui-btn-text").text(localize("%Settings", "Settings"));
              break;
            default:
              break;
            }
          });
              
          $("ul#valves-list li a").bind("tap", function(e) {
            var valveName = $(this).attr("rel");
            AppData.CurrentValve = valveName;
            for (var i = 0; i < StaticData.Valves.length; i++) {
              if (StaticData.Valves[i].name == valveName) {
                AppData.CurrentValve = StaticData.Valves[i];
                $("#selected-valve-image").attr("src", AppData.CurrentValve.image);
                $("#selected-valve-name").text(AppData.CurrentValve.displayName);
                break;
              }
            }
                                            
            $.mobile.changePage( "#calculate", { transition: "none"} );
            e.stopImmediatePropagation();
            e.preventDefault();
				    return false;
          }); // 'valve' tap
              
          $("#saveConfig").bind("tap", function(e) {
            AppData.Config = { unit: $("#chooseUnit").val(), language :  $("#setting-select-language").val()};
            ValvesConfig.saveConfig(AppData.Config);
                                    
            //change text
            AppData.Config.language = $("#setting-select-language").val();
            String.locale = AppData.Config.language;
            refreshLanguageText();

            $.mobile.changePage( "#main", { transition: 'none' } );
            e.stopImmediatePropagation();
            e.preventDefault();
				    return false;
          }); // #saveConfig tap
              
          $("#start-calculate").bind("tap", startCalculate);
          $('#enterFlow').focus(function() {
            $(this).val('');
          });
          $('#enterPressure').focus(function() {
            $(this).val('');
          });

          setTimeout(function() { navigator.splashscreen.hide(); }, 2000);
          
          // goto settings page if settings have not been stored, otherwise goto main
          if (AppData.Config.unit == "" || AppData.Config.unit == undefined) {
            setTimeout(function() { $.mobile.changePage( "#settings", { transition: "none"} ); }, 500);
          } else {
            $.mobile.changePage( "#main", { transition: "none"} );
          }
        } // loadCommonAttributes
        
          
        function refreshLanguageText() {
          // Choose unit
          var options = [];
          options.push("<option value=\"hour\">" + localize("%LitersHour", "Litres / Hour") + "</option>");
          options.push("<option value=\"second\">" + localize("%LitersSecond", "Litres / Second") + "</option>");
          $("#chooseUnit").html(options.join(''));
          
          // choose language
          var languagehtml = [];
          languagehtml.push('<option value="en-us">' + localize('%SelectLanguage', 'Select language') + '</option>');
          for (var i = 0; i < StaticData.LANGUAGE.length; i++) {
            languagehtml.push('<option value="' + StaticData.LANGUAGE[i].key + '">' + localize(StaticData.LANGUAGE[i].displayName, 'na') + '</option>');
          }
          $("#setting-select-language").html(languagehtml.join(''));
              
          $('#backButton').text(localize("%Back", "Back"));
          $("#saveConfig").text(localize("%Save", "Save"));
          $("#contentTitle").text(localize("%Valves", "Valves"));
          $("#valvesUnit").text(localize("%ValvesUnit", "Valves unit"));
              
          $(".tabbar-button-calculate .ui-btn-text").text(localize("%Calculate", "Calculate"));
          $(".tabbar-button-valves .ui-btn-text").text(localize("%Valves", "Valves"));
          $(".tabbar-button-settings .ui-btn-text").text(localize("%Settings", "Settings"));
              
          $("#start-calculate").val(localize("%Calculate", "Calculate")).button();
              
          $("#enterFlow").attr("placeholder", localize("%Flow", "Flow"));
          $("#enterPressure").attr("placeholder", localize("%Pressure", "Pressure"));

          $("#setting-title").text(localize("%Setting", "Setting") + ":");
          $("#dp-title").text(localize("%MinDelta", "Min. ‚àÜP (kPa)") + ":");
        } // refreshLanguageText

        function loadConfigCompleted(config) {
          AppData.Config = config;
          // default to English
          if (typeof AppData.Config.language == 'undefined') {
            AppData.Config.language = "en-us";
          }
          String.locale = AppData.Config.language;
          loadCommonAttributes();
        } // loadConfigCompleted

        function initValves() {
          var html = [];
          for (var i = 0; i < StaticData.Valves.length; i++) {
             var lastClass = i % 3 == 0 ? "first-valve-item" : "";
             html.push("<li class=\"valve-item " +  lastClass + "\" style=\"line-height: 14px\">");
             html.push("<a href=\"#\" rel=\"" + StaticData.Valves[i].name + "\">");
             html.push("<img src=\"" + StaticData.Valves[i].image + "\"" + " width=\"" + 60 + "\"" + " height=\"" + 60 + "\"" + " alt=\"" + StaticData.Valves[i].displayName + "\" />");
             html.push("<span>" + StaticData.Valves[i].displayName + "</span>")
             html.push("</a>");
             html.push("</li>");
          }
          $("#valves-list").html(html.join(""));
        } // initValves
    

/* @source http://purl.eligrey.com/github/l10n.js/blob/master/l10n.js*/
"use strict";(function(){var o="undefined",a="string",m=String,j=Object.prototype.hasOwnProperty,v={},w={},r=!1,q=/^\s*application\/(?:vnd\.oftn\.|x-)?l10n\+json\s*(?:$|;)/i,n,p="toLocaleString",e="toLowerCase",t=Array.prototype.indexOf||function(z){var x=this.length,y=0;for(;y<x;y++){if(y in this&&this[y]===z){return y}}return -1},b=function(x){var i=new n();i.open("GET",x,r);i.send(null);if(i.status!==200){setTimeout(function(){var y=new Error("Unable to load localization data: "+x);y.name="Localization Error";throw y},0);return{}}else{return JSON.parse(i.responseText)}},l=m[p]=function(y){if(arguments.length>0&&typeof y!=="number"){if(typeof y===a){l(b(y))}else{if(y===r){w={}}else{for(var i in y){if(j.call(y,i)){var z=y[i];i=i[e]();if(!(i in w)||z===r){w[i]={}}if(z===r){continue}if(typeof z===a){if(m.locale[e]().indexOf(i)===0){z=b(z)}else{if(!(i in v)){v[i]=[]}v[i].push(z);continue}}for(var x in z){if(j.call(z,x)){w[i][x]=z[x]}}}}}}}return Function.prototype[p].apply(m,arguments)},h=function(z){var y=v[z],A=0,x=y.length;for(;A<x;A++){var B={};B[z]=b(y[A]);l(B)}delete v[z]};if(typeof XMLHttpRequest===o&&typeof ActiveXObject!==o){var f=ActiveXObject;n=function(){try{return new f("Msxml2.XMLHTTP.6.0")}catch(x){}try{return new f("Msxml2.XMLHTTP.3.0")}catch(i){}try{return new f("Msxml2.XMLHTTP")}catch(y){}throw new Error("XMLHttpRequest not supported by this browser.")}}else{n=XMLHttpRequest}if(!m.locale){if(typeof navigator!==o){var k=navigator;m.locale=k.language||k.userLanguage||""}else{m.locale=""}}if(typeof document!==o){var u=document.getElementsByTagName("link"),s=u.length;while(s--){var d=u[s],c=(d.getAttribute("rel")||"")[e]().split(/\s+/);if(q.test(d.type)){if(t.call(c,"localizations")!==-1){l(d.getAttribute("href"))}else{if(t.call(c,"localization")!==-1){var g={};g[(d.getAttribute("hreflang")||"")[e]()]=d.getAttribute("href");l(g)}}}}}m.prototype[p]=function(){var A=m.locale[e]().split("-"),z=A.length,y=this.valueOf();do{var x=A.slice(0,z).join("-");if(x in v){h(x)}if(x in w&&y in w[x]){return w[x][y]}}while(z--);return y}}());

var ValvesConfig = {
   loadConfig: function(callback) {
      var config = window.localStorage.getItem('freseConfig');
      if (config === null) {
         config = {};
      }
      else {
         config = JSON.parse(config);
      }

      callback(config);
   },
   saveConfig: function(config) {
      window.localStorage.clear();
      window.localStorage.setItem('freseConfig', JSON.stringify(config));
   }
};

var StaticData = {
   LANGUAGE: [{
      key: "da-dk",
      displayName: "%danish"
   }, {
      key: "en-us",
      displayName: "%english"
   }, {
      key: "de-de",
      displayName: "%german"
   }, {
      key: "ru-ru",
      displayName: "%russian"
   }, {
      key: "fr-fr",
      displayName: "%french"
   }, {
      key: "tr-tr",
      displayName: "%turkish"
   }],
   Valves: [{
      name: "Frese-S",
      displayName: "Frese S",
      image: "images/frese-s.png",
      items: [{
         name: "DN15 LP",
         value: "DN15LP"
      }, {
         name: "DN15 HP",
         value: "DN15HP"
      }, {
         name: "DN20 LP",
         value: "DN20LP"
      }, {
         name: "DN20 HP",
         value: "DN20HP"
      }, {
         name: "DN25 LP",
         value: "DN25LP"
      }, {
         name: "DN25 HP",
         value: "DN25HP"
      }, {
         name: "DN32",
         value: "DN32"
      }, {
         name: "DN40",
         value: "DN40"
      }, {
         name: "DN50",
         value: "DN50"
      }]
   }, {
      name: "Frese-ALPHA",
      displayName: "Frese ALPHA",
      image: "images/frese-alpha.png",
      items: [{
         name: "DN 15",
         value: "DN1525"
      }, {
         name: "DN 20",
         value: "DN1525"
      }, {
         name: "DN 25",
         value: "DN1525"
      }, {
         name: "DN 25L",
         value: "DN25L50"
      }, {
         name: "DN 32",
         value: "DN25L50"
      }, {
         name: "DN 40",
         value: "DN25L50"
      }, {
         name: "DN 50",
         value: "DN25L50"
      }]
   }, {
      name: "Frese-EVA",
      displayName: "Frese EVA",
      image: "images/frese-eva.png",
      items: [{
         name: "DN 15",
         value: "DN1525"
      }, {
         name: "DN 20",
         value: "DN1525"
      }, {
         name: "DN 25",
         value: "DN1525"
      }]
   }, {
      name: "Frese-OPTIMA-Compact",
      displayName: "Frese OPTIMA Compact",
      image: "images/frese-optima-compact.png",
      items: [{
         name: "DN10 Low 2,5",
         value: "DN10Low25"
      }, {
         name: "DN10 Low 5,0",
         value: "DN10Low50"
      }, {
         name: "DN15 Low 2,5",
         value: "DN15Low25"
      }, {
         name: "DN15 Low 5,0",
         value: "DN15Low50"
      }, {
         name: "DN15 High 2,5",
         value: "DN15High25"
      }, {
         name: "DN20 High 2,5",
         value: "DN20High25"
      }, {
         name: "DN20 High 4,0",
         value: "DN20High40"
      }, {
         name: "DN20 High 5,0",
         value: "DN20High50"
      }, {
         name: "DN25 5,5",
         value: "DN2555"
      }, {
         name: "DN32 5,5",
         value: "DN3255"
      }]
   }, {
      name: "Frese-OPTIMA",
      displayName: "Frese OPTIMA",
      image: "images/frese-optima.png",
      items: [{
         name: "DN15 LF",
         value: "DN15LF"
      }, {
         name: "DN15 HF",
         value: "DN15HF"
      }, {
         name: "DN20 LF",
         value: "DN20LF"
      }, {
         name: "DN20 HF",
         value: "DN20HF"
      }, {
         name: "DN25 LF",
         value: "DN25LF"
      }, {
         name: "DN25 HF",
         value: "DN25HF"
      }, {
         name: "DN32",
         value: "DN32"
      }, {
         name: "DN40",
         value: "DN40"
      }, {
         name: "DN50",
         value: "DN50"
      }]
   }, {
      name: "Frese-OPTIMA-Flange",
      displayName: "Frese OPTIMA Flange",
      image: "images/frese-optima-flange.png",
      items: [{
         name: "DN50 LF",
         value: "DN50LF"
      }, {
         name: "DN50 HF",
         value: "DN50HF"
      }, {
         name: "DN65 LF",
         value: "DN65LF"
      }, {
         name: "DN65 HF",
         value: "DN65HF"
      }, {
         name: "DN80 LF",
         value: "DN80LF"
      }, {
         name: "DN80 HF",
         value: "DN80HF"
      }]
   }, {
      name: "Frese-PV-Compact",
      displayName: "Frese PV Compact",
      image: "images/frese-pv-compact.png",
      items: [{
         name: "DN15 5-30 kPa",
         value: "DN15KPa530"
      }, {
         name: "DN15 20-60 kPa",
         value: "DN15KPa2060"
      }]
   }, {
      name: "Frese-PV",
      displayName: "Frese PV",
      image: "images/frese-pv.png",
      items: [{
         name: "DN15 5-30 kPa",
         value: "DN15530KPA"
      }, {
         name: "DN15 20-60 kPa",
         value: "DN152060KPA"
      }, {
         name: "DN20 5-30kPa",
         value: "DN20530KPA"
      }, {
         name: "DN20 20-60kPa",
         value: "DN202060KPA"
      }, {
         name: "DN25 5-30 kPa",
         value: "DN25530KPA"
      }, {
         name: "DN25 20-60 kPa",
         value: "DN252060KPA"
      }, {
         name: "DN32 20-80 kPa",
         value: "DN322080KPA"
      }, {
         name: "DN40 20-80 kPa",
         value: "DN402080KPA"
      }, {
         name: "DN50 20-80 kPa",
         value: "DN502080KPA"
      }]
   }, {
      name: "Frese-PVS",
      displayName: "Frese PVS",
      image: "images/frese-pvs.png",
      items: [{
         name: "DN15 5-30 kPa",
         value: "DN15530KPA"
      }, {
         name: "DN15 20-60 kPa",
         value: "DN152060KPA"
      }, {
         name: "DN20 5-30kPa",
         value: "DN20530KPA"
      }, {
         name: "DN20 20-60kPa",
         value: "DN202060KPA"
      }, {
         name: "DN25 5-30 kPa",
         value: "DN25530KPA"
      }, {
         name: "DN25 20-60 kPa",
         value: "DN252060KPA"
      }, {
         name: "DN32 20-80 kPa",
         value: "DN322080KPA"
      }, {
         name: "DN40 20-80 kPa",
         value: "DN402080KPA"
      }, {
         name: "DN50 20-80 kPa",
         value: "DN502080KPA"
      }]
   },

   ],

   ALPHA: {
      DN1525: {
         smaller: [{
            LH: 0,
            MinDP: null,
            VareLP: "",
            VareHP: ""
         }, {
            LH: 25,
            MinDP: 7,
            VareLP: "50-11150",
            VareHP: "N/A"
         }, {
            LH: 36,
            MinDP: 7,
            VareLP: "50-11170",
            VareHP: "N/A"
         }, {
            LH: 43,
            MinDP: 7,
            VareLP: "50-11190",
            VareHP: "N/A"
         }, {
            LH: 55,
            MinDP: 7,
            VareLP: "50-11210",
            VareHP: "49-11210"
         }, {
            LH: 75,
            MinDP: 8,
            VareLP: "50-11230",
            VareHP: "49-11230"
         }, {
            LH: 84,
            MinDP: 9,
            VareLP: "50-11260",
            VareHP: "49-11260"
         }, {
            LH: 104,
            MinDP: 10,
            VareLP: "50-11290",
            VareHP: "49-11290"
         }, {
            LH: 114,
            MinDP: 10,
            VareLP: "50-11300",
            VareHP: "49-11300"
         }, {
            LH: 129,
            MinDP: 11,
            VareLP: "50-11320",
            VareHP: "49-11320"
         }, {
            LH: 154,
            MinDP: 11,
            VareLP: "50-11350",
            VareHP: "49-11350"
         }, {
            LH: 175,
            MinDP: 12,
            VareLP: "50-11370",
            VareHP: "49-11370"
         }, {
            LH: 204,
            MinDP: 12,
            VareLP: "50-11400",
            VareHP: "49-11400"
         }, {
            LH: 241,
            MinDP: 12,
            VareLP: "50-11430",
            VareHP: "49-11430"
         }, {
            LH: 279,
            MinDP: 12,
            VareLP: "50-11460",
            VareHP: "49-11460"
         }, {
            LH: 320,
            MinDP: 13,
            VareLP: "50-11490",
            VareHP: "49-11490"
         }, {
            LH: 350,
            MinDP: 13,
            VareLP: "50-11510",
            VareHP: "49-11510"
         }, {
            LH: 400,
            MinDP: 13,
            VareLP: "50-11540",
            VareHP: "49-11540"
         }, {
            LH: 477,
            MinDP: 14,
            VareLP: "50-11570",
            VareHP: "49-11570"
         }, {
            LH: 545,
            MinDP: 14,
            VareLP: "50-11620",
            VareHP: "49-11620"
         }, {
            LH: 615,
            MinDP: 14,
            VareLP: "50-11725",
            VareHP: "49-11725"
         }, {
            LH: 670,
            MinDP: 14,
            VareLP: "50-11730",
            VareHP: "49-11730"
         }, {
            LH: 736,
            MinDP: 14,
            VareLP: "50-11735",
            VareHP: "49-11735"
         }, {
            LH: 799,
            MinDP: 16,
            VareLP: "50-11740",
            VareHP: "49-11740"
         }, {
            LH: 870,
            MinDP: 19,
            VareLP: "50-11745",
            VareHP: "49-11745"
         }, {
            LH: 936,
            MinDP: 21,
            VareLP: "50-11750",
            VareHP: "49-11750"
         }, {
            LH: 1020,
            MinDP: 22,
            VareLP: "50-20700",
            VareHP: "49-20700"
         }, {
            LH: 1081,
            MinDP: 22,
            VareLP: "50-20740",
            VareHP: "49-20740"
         }, {
            LH: 1195,
            MinDP: 22,
            VareLP: "50-20770",
            VareHP: "49-20770"
         }, {
            LH: 1335,
            MinDP: 23,
            VareLP: "50-20820",
            VareHP: "49-20820"
         }, {
            LH: 1483,
            MinDP: 23,
            VareLP: "50-20860",
            VareHP: "49-20860"
         }, {
            LH: 1581,
            MinDP: 23,
            VareLP: "50-20880",
            VareHP: "49-20880"
         }, {
            LH: 1774,
            MinDP: 24,
            VareLP: "50-20920",
            VareHP: "49-20920"
         }, {
            LH: 1883,
            MinDP: 24,
            VareLP: "50-20940",
            VareHP: "49-20940"
         }, {
            LH: 2080,
            MinDP: 25,
            VareLP: "50-20990",
            VareHP: "49-20990"
         }, {
            LH: 2251,
            MinDP: 26,
            VareLP: "50-21030",
            VareHP: "49-21030"
         }, {
            LH: 2319,
            MinDP: 27,
            VareLP: "50-21060",
            VareHP: "49-21060"
         }, {
            LH: 2448,
            MinDP: 28,
            VareLP: "50-21090",
            VareHP: "49-21090"
         }],
         greater: [{
            LH: 25,
            MinDP: 7,
            VareLP: "50-11150",
            VareHP: "N/A"
         }, {
            LH: 36,
            MinDP: 7,
            VareLP: "50-11170",
            VareHP: "N/A"
         }, {
            LH: 43,
            MinDP: 7,
            VareLP: "50-11190",
            VareHP: "N/A"
         }, {
            LH: 55,
            MinDP: 7,
            VareLP: "50-11210",
            VareHP: "49-11210"
         }, {
            LH: 75,
            MinDP: 8,
            VareLP: "50-11230",
            VareHP: "49-11230"
         }, {
            LH: 84,
            MinDP: 9,
            VareLP: "50-11260",
            VareHP: "49-11260"
         }, {
            LH: 104,
            MinDP: 10,
            VareLP: "50-11290",
            VareHP: "49-11290"
         }, {
            LH: 114,
            MinDP: 10,
            VareLP: "50-11300",
            VareHP: "49-11300"
         }, {
            LH: 129,
            MinDP: 11,
            VareLP: "50-11320",
            VareHP: "49-11320"
         }, {
            LH: 154,
            MinDP: 11,
            VareLP: "50-11350",
            VareHP: "49-11350"
         }, {
            LH: 175,
            MinDP: 12,
            VareLP: "50-11370",
            VareHP: "49-11370"
         }, {
            LH: 204,
            MinDP: 12,
            VareLP: "50-11400",
            VareHP: "49-11400"
         }, {
            LH: 241,
            MinDP: 12,
            VareLP: "50-11430",
            VareHP: "49-11430"
         }, {
            LH: 279,
            MinDP: 12,
            VareLP: "50-11460",
            VareHP: "49-11460"
         }, {
            LH: 320,
            MinDP: 13,
            VareLP: "50-11490",
            VareHP: "49-11490"
         }, {
            LH: 350,
            MinDP: 13,
            VareLP: "50-11510",
            VareHP: "49-11510"
         }, {
            LH: 400,
            MinDP: 13,
            VareLP: "50-11540",
            VareHP: "49-11540"
         }, {
            LH: 477,
            MinDP: 14,
            VareLP: "50-11570",
            VareHP: "49-11570"
         }, {
            LH: 545,
            MinDP: 14,
            VareLP: "50-11620",
            VareHP: "49-11620"
         }, {
            LH: 615,
            MinDP: 14,
            VareLP: "50-11725",
            VareHP: "49-11725"
         }, {
            LH: 670,
            MinDP: 14,
            VareLP: "50-11730",
            VareHP: "49-11730"
         }, {
            LH: 736,
            MinDP: 14,
            VareLP: "50-11735",
            VareHP: "49-11735"
         }, {
            LH: 799,
            MinDP: 16,
            VareLP: "50-11740",
            VareHP: "49-11740"
         }, {
            LH: 870,
            MinDP: 19,
            VareLP: "50-11745",
            VareHP: "49-11745"
         }, {
            LH: 936,
            MinDP: 21,
            VareLP: "50-11750",
            VareHP: "49-11750"
         }, {
            LH: 1020,
            MinDP: 22,
            VareLP: "50-20700",
            VareHP: "49-20700"
         }, {
            LH: 1081,
            MinDP: 22,
            VareLP: "50-20740",
            VareHP: "49-20740"
         }, {
            LH: 1195,
            MinDP: 22,
            VareLP: "50-20770",
            VareHP: "49-20770"
         }, {
            LH: 1335,
            MinDP: 23,
            VareLP: "50-20820",
            VareHP: "49-20820"
         }, {
            LH: 1483,
            MinDP: 23,
            VareLP: "50-20860",
            VareHP: "49-20860"
         }, {
            LH: 1581,
            MinDP: 23,
            VareLP: "50-20880",
            VareHP: "49-20880"
         }, {
            LH: 1774,
            MinDP: 24,
            VareLP: "50-20920",
            VareHP: "49-20920"
         }, {
            LH: 1883,
            MinDP: 24,
            VareLP: "50-20940",
            VareHP: "49-20940"
         }, {
            LH: 2080,
            MinDP: 25,
            VareLP: "50-20990",
            VareHP: "49-20990"
         }, {
            LH: 2251,
            MinDP: 26,
            VareLP: "50-21030",
            VareHP: "49-21030"
         }, {
            LH: 2319,
            MinDP: 27,
            VareLP: "50-21060",
            VareHP: "49-21060"
         }, {
            LH: 2448,
            MinDP: 28,
            VareLP: "50-21090",
            VareHP: "49-21090"
         }, {
            LH: 2448,
            MinDP: 28,
            VareLP: "50-21090",
            VareHP: "49-21090"
         }]
      },
      DN25L50: {
         smaller: [{
            LH: 0,
            MinDP: null,
            VareLP: "",
            VareHP: ""
         }, {
            LH: 674,
            MinDP: 12,
            VareLP: "50-33073",
            VareHP: "49-33073"
         }, {
            LH: 861,
            MinDP: 12,
            VareLP: "50-33082",
            VareHP: "49-33082"
         }, {
            LH: 1020,
            MinDP: 12,
            VareLP: "50-33089",
            VareHP: "49-33089"
         }, {
            LH: 1136,
            MinDP: 12,
            VareLP: "50-33094",
            VareHP: "49-33094"
         }, {
            LH: 1190,
            MinDP: 12,
            VareLP: "50-33096",
            VareHP: "49-33096"
         }, {
            LH: 1272,
            MinDP: 13,
            VareLP: "50-33098",
            VareHP: "49-33098"
         }, {
            LH: 1349,
            MinDP: 13,
            VareLP: "50-33102",
            VareHP: "49-33102"
         }, {
            LH: 1485,
            MinDP: 13,
            VareLP: "50-33107",
            VareHP: "49-33107"
         }, {
            LH: 1567,
            MinDP: 14,
            VareLP: "50-33111",
            VareHP: "49-33111"
         }, {
            LH: 1631,
            MinDP: 14,
            VareLP: "50-33112",
            VareHP: "49-33112"
         }, {
            LH: 1815,
            MinDP: 14,
            VareLP: "50-33118",
            VareHP: "49-33118"
         }, {
            LH: 2001,
            MinDP: 15,
            VareLP: "50-33124",
            VareHP: "49-33124"
         }, {
            LH: 2044,
            MinDP: 16,
            VareLP: "50-33125",
            VareHP: "49-33125"
         }, {
            LH: 2171,
            MinDP: 16,
            VareLP: "50-33129",
            VareHP: "49-33129"
         }, {
            LH: 2271,
            MinDP: 17,
            VareLP: "50-33132",
            VareHP: "49-33132"
         }, {
            LH: 2380,
            MinDP: 17,
            VareLP: "50-33135",
            VareHP: "49-33135"
         }, {
            LH: 2498,
            MinDP: 18,
            VareLP: "50-33138",
            VareHP: "49-33138"
         }, {
            LH: 2639,
            MinDP: 18,
            VareLP: "50-33142",
            VareHP: "49-33142"
         }, {
            LH: 2871,
            MinDP: 19,
            VareLP: "50-33148",
            VareHP: "49-33148"
         }, {
            LH: 3191,
            MinDP: 21,
            VareLP: "50-33156",
            VareHP: "49-33156"
         }, {
            LH: 3407,
            MinDP: 22,
            VareLP: "50-33161",
            VareHP: "49-33161"
         }, {
            LH: 3486,
            MinDP: 22,
            VareLP: "50-33163",
            VareHP: "49-33163"
         }, {
            LH: 3634,
            MinDP: 20,
            VareLP: "50-44148",
            VareHP: "49-44148"
         }, {
            LH: 3681,
            MinDP: 21,
            VareLP: "50-44152",
            VareHP: "49-44152"
         }, {
            LH: 4088,
            MinDP: 21,
            VareLP: "50-44156",
            VareHP: "49-44156"
         }, {
            LH: 4315,
            MinDP: 21,
            VareLP: "50-44164",
            VareHP: "49-44164"
         }, {
            LH: 4542,
            MinDP: 22,
            VareLP: "50-44168",
            VareHP: "49-44168"
         }, {
            LH: 4769,
            MinDP: 22,
            VareLP: "50-44173",
            VareHP: "49-44173"
         }, {
            LH: 4996,
            MinDP: 23,
            VareLP: "50-44176",
            VareHP: "49-44176"
         }, {
            LH: 5450,
            MinDP: 24,
            VareLP: "50-44182",
            VareHP: "49-44182"
         }, {
            LH: 5905,
            MinDP: 25,
            VareLP: "50-44191",
            VareHP: "49-44191"
         }, {
            LH: 6539,
            MinDP: 26,
            VareLP: "50-44194",
            VareHP: "49-44194"
         }, {
            LH: 6831,
            MinDP: 27,
            VareLP: "50-44200",
            VareHP: "49-44200"
         }, {
            LH: 7267,
            MinDP: 28,
            VareLP: "50-44205",
            VareHP: "49-44205"
         }, {
            LH: 7721,
            MinDP: 30,
            VareLP: "50-44211",
            VareHP: "49-44211"
         }, {
            LH: 8176,
            MinDP: 31,
            VareLP: "50-44217",
            VareHP: "49-44217"
         }, {
            LH: 8630,
            MinDP: 33,
            VareLP: "50-44222",
            VareHP: "49-44222"
         }, {
            LH: 9084,
            MinDP: 34,
            VareLP: "50-44229",
            VareHP: "49-44229"
         }, {
            LH: 9538,
            MinDP: 36,
            VareLP: "50-44235",
            VareHP: "49-44235"
         }, {
            LH: 9990,
            MinDP: 38,
            VareLP: "50-44241",
            VareHP: "49-44241"
         }, {
            LH: 10445,
            MinDP: 40,
            VareLP: "50-44248",
            VareHP: "49-44248"
         }, {
            LH: 10900,
            MinDP: 42,
            VareLP: "50-44250",
            VareHP: "49-44250"
         }, {
            LH: 11355,
            MinDP: 44,
            VareLP: "50-44262",
            VareHP: "49-44262"
         }],
         greater: [{
            LH: 674,
            MinDP: 12,
            VareLP: "50-33073",
            VareHP: "49-33073"
         }, {
            LH: 861,
            MinDP: 12,
            VareLP: "50-33082",
            VareHP: "49-33082"
         }, {
            LH: 1020,
            MinDP: 12,
            VareLP: "50-33089",
            VareHP: "49-33089"
         }, {
            LH: 1136,
            MinDP: 12,
            VareLP: "50-33094",
            VareHP: "49-33094"
         }, {
            LH: 1190,
            MinDP: 12,
            VareLP: "50-33096",
            VareHP: "49-33096"
         }, {
            LH: 1272,
            MinDP: 13,
            VareLP: "50-33098",
            VareHP: "49-33098"
         }, {
            LH: 1349,
            MinDP: 13,
            VareLP: "50-33102",
            VareHP: "49-33102"
         }, {
            LH: 1485,
            MinDP: 13,
            VareLP: "50-33107",
            VareHP: "49-33107"
         }, {
            LH: 1567,
            MinDP: 14,
            VareLP: "50-33111",
            VareHP: "49-33111"
         }, {
            LH: 1631,
            MinDP: 14,
            VareLP: "50-33112",
            VareHP: "49-33112"
         }, {
            LH: 1815,
            MinDP: 14,
            VareLP: "50-33118",
            VareHP: "49-33118"
         }, {
            LH: 2001,
            MinDP: 15,
            VareLP: "50-33124",
            VareHP: "49-33124"
         }, {
            LH: 2044,
            MinDP: 16,
            VareLP: "50-33125",
            VareHP: "49-33125"
         }, {
            LH: 2171,
            MinDP: 16,
            VareLP: "50-33129",
            VareHP: "49-33129"
         }, {
            LH: 2271,
            MinDP: 17,
            VareLP: "50-33132",
            VareHP: "49-33132"
         }, {
            LH: 2380,
            MinDP: 17,
            VareLP: "50-33135",
            VareHP: "49-33135"
         }, {
            LH: 2498,
            MinDP: 18,
            VareLP: "50-33138",
            VareHP: "49-33138"
         }, {
            LH: 2639,
            MinDP: 18,
            VareLP: "50-33142",
            VareHP: "49-33142"
         }, {
            LH: 2871,
            MinDP: 19,
            VareLP: "50-33148",
            VareHP: "49-33148"
         }, {
            LH: 3191,
            MinDP: 21,
            VareLP: "50-33156",
            VareHP: "49-33156"
         }, {
            LH: 3407,
            MinDP: 22,
            VareLP: "50-33161",
            VareHP: "49-33161"
         }, {
            LH: 3486,
            MinDP: 22,
            VareLP: "50-33163",
            VareHP: "49-33163"
         }, {
            LH: 3634,
            MinDP: 20,
            VareLP: "50-44148",
            VareHP: "49-44148"
         }, {
            LH: 3681,
            MinDP: 21,
            VareLP: "50-44152",
            VareHP: "49-44152"
         }, {
            LH: 4088,
            MinDP: 21,
            VareLP: "50-44156",
            VareHP: "49-44156"
         }, {
            LH: 4315,
            MinDP: 21,
            VareLP: "50-44164",
            VareHP: "49-44164"
         }, {
            LH: 4542,
            MinDP: 22,
            VareLP: "50-44168",
            VareHP: "49-44168"
         }, {
            LH: 4769,
            MinDP: 22,
            VareLP: "50-44173",
            VareHP: "49-44173"
         }, {
            LH: 4996,
            MinDP: 23,
            VareLP: "50-44176",
            VareHP: "49-44176"
         }, {
            LH: 5450,
            MinDP: 24,
            VareLP: "50-44182",
            VareHP: "49-44182"
         }, {
            LH: 5905,
            MinDP: 25,
            VareLP: "50-44191",
            VareHP: "49-44191"
         }, {
            LH: 6539,
            MinDP: 26,
            VareLP: "50-44194",
            VareHP: "49-44194"
         }, {
            LH: 6831,
            MinDP: 27,
            VareLP: "50-44200",
            VareHP: "49-44200"
         }, {
            LH: 7267,
            MinDP: 28,
            VareLP: "50-44205",
            VareHP: "49-44205"
         }, {
            LH: 7721,
            MinDP: 30,
            VareLP: "50-44211",
            VareHP: "49-44211"
         }, {
            LH: 8176,
            MinDP: 31,
            VareLP: "50-44217",
            VareHP: "49-44217"
         }, {
            LH: 8630,
            MinDP: 33,
            VareLP: "50-44222",
            VareHP: "49-44222"
         }, {
            LH: 9084,
            MinDP: 34,
            VareLP: "50-44229",
            VareHP: "49-44229"
         }, {
            LH: 9538,
            MinDP: 36,
            VareLP: "50-44235",
            VareHP: "49-44235"
         }, {
            LH: 9990,
            MinDP: 38,
            VareLP: "50-44241",
            VareHP: "49-44241"
         }, {
            LH: 10445,
            MinDP: 40,
            VareLP: "50-44248",
            VareHP: "49-44248"
         }, {
            LH: 10900,
            MinDP: 42,
            VareLP: "50-44250",
            VareHP: "49-44250"
         }, {
            LH: 11355,
            MinDP: 44,
            VareLP: "50-44262",
            VareHP: "49-44262"
         }, {
            LH: 11355,
            MinDP: 44,
            VareLP: "50-44262",
            VareHP: "49-44262"
         }]
      }
   },
   EVA: {
      DN1525: {
         smaller: [{
            LH: "0",
            MinDP: "",
            MinDPtoGEHEINS: "",
            VareLP: "",
            VareHP: ""
         }, {
            LH: "25",
            MinDP: "7",
            MinDPtoGEHEINS: "7",
            VareLP: "50-11150",
            VareHP: "N/A"
         }, {
            LH: "36",
            MinDP: "7",
            MinDPtoGEHEINS: "7",
            VareLP: "50-11170",
            VareHP: "N/A"
         }, {
            LH: "43",
            MinDP: "7",
            MinDPtoGEHEINS: "7",
            VareLP: "50-11190",
            VareHP: "N/A"
         }, {
            LH: "55",
            MinDP: "7",
            MinDPtoGEHEINS: "7",
            VareLP: "50-11210",
            VareHP: "49-11210"
         }, {
            LH: "75",
            MinDP: "8",
            MinDPtoGEHEINS: "8",
            VareLP: "50-11230",
            VareHP: "49-11230"
         }, {
            LH: "84",
            MinDP: "9",
            MinDPtoGEHEINS: "9",
            VareLP: "50-11260",
            VareHP: "49-11260"
         }, {
            LH: "104",
            MinDP: "10",
            MinDPtoGEHEINS: "10",
            VareLP: "50-11290",
            VareHP: "49-11290"
         }, {
            LH: "114",
            MinDP: "10",
            MinDPtoGEHEINS: "10",
            VareLP: "50-11300",
            VareHP: "49-11300"
         }, {
            LH: "129",
            MinDP: "11",
            MinDPtoGEHEINS: "11",
            VareLP: "50-11320",
            VareHP: "49-11320"
         }, {
            LH: "154",
            MinDP: "11",
            MinDPtoGEHEINS: "11",
            VareLP: "50-11350",
            VareHP: "49-11350"
         }, {
            LH: "175",
            MinDP: "12",
            MinDPtoGEHEINS: "12",
            VareLP: "50-11370",
            VareHP: "49-11370"
         }, {
            LH: "204",
            MinDP: "12",
            MinDPtoGEHEINS: "12",
            VareLP: "50-11400",
            VareHP: "49-11400"
         }, {
            LH: "241",
            MinDP: "12",
            MinDPtoGEHEINS: "13",
            VareLP: "50-11430",
            VareHP: "49-11430"
         }, {
            LH: "279",
            MinDP: "12",
            MinDPtoGEHEINS: "13",
            VareLP: "50-11460",
            VareHP: "49-11460"
         }, {
            LH: "320",
            MinDP: "13",
            MinDPtoGEHEINS: "14",
            VareLP: "50-11490",
            VareHP: "49-11490"
         }, {
            LH: "350",
            MinDP: "13",
            MinDPtoGEHEINS: "14",
            VareLP: "50-11510",
            VareHP: "49-11510"
         }, {
            LH: "400",
            MinDP: "13",
            MinDPtoGEHEINS: "15",
            VareLP: "50-11540",
            VareHP: "49-11540"
         }, {
            LH: "477",
            MinDP: "14",
            MinDPtoGEHEINS: "17",
            VareLP: "50-11570",
            VareHP: "49-11570"
         }, {
            LH: "545",
            MinDP: "14",
            MinDPtoGEHEINS: "17",
            VareLP: "50-11620",
            VareHP: "49-11620"
         }, {
            LH: "615",
            MinDP: "14",
            MinDPtoGEHEINS: "18",
            VareLP: "50-11725",
            VareHP: "49-11725"
         }, {
            LH: "670",
            MinDP: "14",
            MinDPtoGEHEINS: "19",
            VareLP: "50-11730",
            VareHP: "49-11730"
         }, {
            LH: "736",
            MinDP: "14",
            MinDPtoGEHEINS: "20",
            VareLP: "50-11735",
            VareHP: "49-11735"
         }, {
            LH: "799",
            MinDP: "16",
            MinDPtoGEHEINS: "23",
            VareLP: "50-11740",
            VareHP: "49-11740"
         }, {
            LH: "870",
            MinDP: "19",
            MinDPtoGEHEINS: "27",
            VareLP: "50-11745",
            VareHP: "49-11745"
         }, {
            LH: "936",
            MinDP: "21",
            MinDPtoGEHEINS: "31",
            VareLP: "50-11750",
            VareHP: "49-11750"
         }, {
            LH: "1020",
            MinDP: "22",
            MinDPtoGEHEINS: "34",
            VareLP: "50-20700",
            VareHP: "49-20700"
         }, {
            LH: "1081",
            MinDP: "22",
            MinDPtoGEHEINS: "35",
            VareLP: "50-20740",
            VareHP: "49-20740"
         }, {
            LH: "1195",
            MinDP: "22",
            MinDPtoGEHEINS: "38",
            VareLP: "50-20770",
            VareHP: "49-20770"
         }, {
            LH: "1335",
            MinDP: "23",
            MinDPtoGEHEINS: "43",
            VareLP: "50-20820",
            VareHP: "49-20820"
         }, {
            LH: "1483",
            MinDP: "23",
            MinDPtoGEHEINS: "47",
            VareLP: "50-20860",
            VareHP: "49-20860"
         }, {
            LH: "1581",
            MinDP: "23",
            MinDPtoGEHEINS: "51",
            VareLP: "50-20880",
            VareHP: "49-20880"
         }, {
            LH: "1774",
            MinDP: "24",
            MinDPtoGEHEINS: "59",
            VareLP: "50-20920",
            VareHP: "49-20920"
         }, {
            LH: "1883",
            MinDP: "24",
            MinDPtoGEHEINS: "61",
            VareLP: "50-20940",
            VareHP: "49-20940"
         }, {
            LH: "2080",
            MinDP: "25",
            MinDPtoGEHEINS: "73",
            VareLP: "50-20990",
            VareHP: "49-20990"
         }, {
            LH: "2251",
            MinDP: "26",
            MinDPtoGEHEINS: "82",
            VareLP: "50-21030",
            VareHP: "49-21030"
         }, {
            LH: "2319",
            MinDP: "27",
            MinDPtoGEHEINS: "87",
            VareLP: "50-21060",
            VareHP: "49-21060"
         }, {
            LH: "2448",
            MinDP: "28",
            MinDPtoGEHEINS: "95",
            VareLP: "50-21090",
            VareHP: "49-21090"
         }],
         greater: [{
            LH: "25",
            MinDP: "7",
            MinDPtoGEHEINS: "7",
            VareLP: "50-11150",
            VareHP: "N/A"
         }, {
            LH: "36",
            MinDP: "7",
            MinDPtoGEHEINS: "7",
            VareLP: "50-11170",
            VareHP: "N/A"
         }, {
            LH: "43",
            MinDP: "7",
            MinDPtoGEHEINS: "7",
            VareLP: "50-11190",
            VareHP: "N/A"
         }, {
            LH: "55",
            MinDP: "7",
            MinDPtoGEHEINS: "7",
            VareLP: "50-11210",
            VareHP: "49-11210"
         }, {
            LH: "75",
            MinDP: "8",
            MinDPtoGEHEINS: "8",
            VareLP: "50-11230",
            VareHP: "49-11230"
         }, {
            LH: "84",
            MinDP: "9",
            MinDPtoGEHEINS: "9",
            VareLP: "50-11260",
            VareHP: "49-11260"
         }, {
            LH: "104",
            MinDP: "10",
            MinDPtoGEHEINS: "10",
            VareLP: "50-11290",
            VareHP: "49-11290"
         }, {
            LH: "114",
            MinDP: "10",
            MinDPtoGEHEINS: "10",
            VareLP: "50-11300",
            VareHP: "49-11300"
         }, {
            LH: "129",
            MinDP: "11",
            MinDPtoGEHEINS: "11",
            VareLP: "50-11320",
            VareHP: "49-11320"
         }, {
            LH: "154",
            MinDP: "11",
            MinDPtoGEHEINS: "11",
            VareLP: "50-11350",
            VareHP: "49-11350"
         }, {
            LH: "175",
            MinDP: "12",
            MinDPtoGEHEINS: "12",
            VareLP: "50-11370",
            VareHP: "49-11370"
         }, {
            LH: "204",
            MinDP: "12",
            MinDPtoGEHEINS: "12",
            VareLP: "50-11400",
            VareHP: "49-11400"
         }, {
            LH: "241",
            MinDP: "12",
            MinDPtoGEHEINS: "13",
            VareLP: "50-11430",
            VareHP: "49-11430"
         }, {
            LH: "279",
            MinDP: "12",
            MinDPtoGEHEINS: "13",
            VareLP: "50-11460",
            VareHP: "49-11460"
         }, {
            LH: "320",
            MinDP: "13",
            MinDPtoGEHEINS: "14",
            VareLP: "50-11490",
            VareHP: "49-11490"
         }, {
            LH: "350",
            MinDP: "13",
            MinDPtoGEHEINS: "14",
            VareLP: "50-11510",
            VareHP: "49-11510"
         }, {
            LH: "400",
            MinDP: "13",
            MinDPtoGEHEINS: "15",
            VareLP: "50-11540",
            VareHP: "49-11540"
         }, {
            LH: "477",
            MinDP: "14",
            MinDPtoGEHEINS: "17",
            VareLP: "50-11570",
            VareHP: "49-11570"
         }, {
            LH: "545",
            MinDP: "14",
            MinDPtoGEHEINS: "17",
            VareLP: "50-11620",
            VareHP: "49-11620"
         }, {
            LH: "615",
            MinDP: "14",
            MinDPtoGEHEINS: "18",
            VareLP: "50-11725",
            VareHP: "49-11725"
         }, {
            LH: "670",
            MinDP: "14",
            MinDPtoGEHEINS: "19",
            VareLP: "50-11730",
            VareHP: "49-11730"
         }, {
            LH: "736",
            MinDP: "14",
            MinDPtoGEHEINS: "20",
            VareLP: "50-11735",
            VareHP: "49-11735"
         }, {
            LH: "799",
            MinDP: "16",
            MinDPtoGEHEINS: "23",
            VareLP: "50-11740",
            VareHP: "49-11740"
         }, {
            LH: "870",
            MinDP: "19",
            MinDPtoGEHEINS: "27",
            VareLP: "50-11745",
            VareHP: "49-11745"
         }, {
            LH: "936",
            MinDP: "21",
            MinDPtoGEHEINS: "31",
            VareLP: "50-11750",
            VareHP: "49-11750"
         }, {
            LH: "1020",
            MinDP: "22",
            MinDPtoGEHEINS: "34",
            VareLP: "50-20700",
            VareHP: "49-20700"
         }, {
            LH: "1081",
            MinDP: "22",
            MinDPtoGEHEINS: "35",
            VareLP: "50-20740",
            VareHP: "49-20740"
         }, {
            LH: "1195",
            MinDP: "22",
            MinDPtoGEHEINS: "38",
            VareLP: "50-20770",
            VareHP: "49-20770"
         }, {
            LH: "1335",
            MinDP: "23",
            MinDPtoGEHEINS: "43",
            VareLP: "50-20820",
            VareHP: "49-20820"
         }, {
            LH: "1483",
            MinDP: "23",
            MinDPtoGEHEINS: "47",
            VareLP: "50-20860",
            VareHP: "49-20860"
         }, {
            LH: "1581",
            MinDP: "23",
            MinDPtoGEHEINS: "51",
            VareLP: "50-20880",
            VareHP: "49-20880"
         }, {
            LH: "1774",
            MinDP: "24",
            MinDPtoGEHEINS: "59",
            VareLP: "50-20920",
            VareHP: "49-20920"
         }, {
            LH: "1883",
            MinDP: "24",
            MinDPtoGEHEINS: "61",
            VareLP: "50-20940",
            VareHP: "49-20940"
         }, {
            LH: "2080",
            MinDP: "25",
            MinDPtoGEHEINS: "73",
            VareLP: "50-20990",
            VareHP: "49-20990"
         }, {
            LH: "2251",
            MinDP: "26",
            MinDPtoGEHEINS: "82",
            VareLP: "50-21030",
            VareHP: "49-21030"
         }, {
            LH: "2319",
            MinDP: "27",
            MinDPtoGEHEINS: "87",
            VareLP: "50-21060",
            VareHP: "49-21060"
         }, {
            LH: "2448",
            MinDP: "28",
            MinDPtoGEHEINS: "95",
            VareLP: "50-21090",
            VareHP: "49-21090"
         }, {
            LH: "2448",
            MinDP: "28",
            MinDPtoGEHEINS: "95",
            VareLP: "50-21090",
            VareHP: "49-21090"
         }]
      }
   }
};


String.toLocaleString({
   "en-us": {
      "%LitersSecond": "Litres / Second",
      "%LitersHour": "Litres / Hour",
      "%L/S": "l/s",
      "%L/H": "l/h",
      "%kPa": "kPa",
      "%Valves": "Valves",
      "%Save": "Save",
      "%ValvesUnit": "Choose unit",
      "%Calculate": "Calculate",
      "%Settings": "Settings",
      "%PleaseSelectFrese": "Please choose valve",
      "%Flow": "Flow",
      "%Pressure": "Differential pressure",
      "%Setting": "Setting",
      "%MinDelta": "Min. ∆P (kPa)",
      "%SettingFreseS": "Setting Frese S",
      "%SettingFresePV": "Setting Frese PV",
      "%DimensionFreseS": "Dimension Frese S",
      "%Back": "Back",
      "%Dimension": "Dimension",
      "%NoDimension": "Please choose dimension",
      "%NA": "NOT APPLICABLE",
      "%MinDeltaTotalVentil" : "Min. ∆P (kPa) Total Ventil",
      "%VarenrHP" : "Item no. HP",
      "%VarenrLP" : "Item no. LP",
      "%Search" : "Search",
      "%M3/H": "m3/h",
      "%M3/S": "m3/s",
      "%Turns": "Number of turns",
      "%dPpKpa": "∆Pp (kPa)",
      "%dPvKpa": "∆Pv (kPa)",
      "%SelectLanguage" : "Select language",
      "%danish" : "Dansk",
      "%english" : "English",
      "%german" : "Deutsch",
      "%russian" : "Русский",
      "%french" : "Français",
      "%turkish" : "Türkçe"
   },
   "da-dk": {
      "%LitersSecond": "Liter / Sekund",
      "%LitersHour": "Liter / Time",
      "%L/S": "l/s",
      "%L/H": "l/h",
      "%kPa": "kPa",
      "%Valves": "Ventiler",
      "%Save": "Gem",
      "%ValvesUnit": "Vælg enhed",
      "%Calculate": "Beregn",
      "%Settings": "Indstillinger",
      "%PleaseSelectFrese": "Vælg venligst ventil",
      "%Flow": "Flow",
      "%Pressure": "Tryk",
      "%Setting": "Indstilling",
      "%MinDelta": "Min. ∆P (kPa)",
      "%SettingFreseS": "Indstilling Frese S",
      "%SettingFresePV": "Indstilling Frese PV",
      "%DimensionFreseS": "Dimension Frese S",
      "%Back": "Tilbage",
      "%Dimension": "Ventilstørrelse",
      "%NoDimension": "Vælg venligst dimension",
      "%NA": "IKKE MULIGT",
      "%MinDeltaTotalVentil" : "Min. ∆P (kPa) Total Ventil",
      "%VarenrHP" : "Vare nr. HP",
      "%VarenrLP" : "Vare nr. LP",
      "%Search" : "Søg",
      "%M3/H": "m3/h",
      "%M3/S": "m3/s",
      "%Turns": "Number of turns",
      "%dPpKpa": "∆Pp (kPa)",
      "%dPvKpa": "∆Pv (kPa)",
      "%SelectLanguage" : "Vælg sprog",
      "%danish" : "Dansk",
      "%english" : "English",
      "%german" : "Deutsch",
      "%russian" : "Русский",
      "%french" : "Français",
      "%turkish" : "Türkçe"
   },
   "de-de": {
      "%LitersSecond": "Liter / Sekunde",
      "%LitersHour": "Liter / Stunde",
      "%L/S": "L/s",
      "%L/H": "L/h",
      "%kPa": "kPa",
      "%Valves": "Ventile",
      "%Save": "Speichern",
      "%ValvesUnit": "Volumenstrom Einheit",
      "%Calculate": "Berechnen",
      "%Settings": "Einstellung",
      "%PleaseSelectFrese": "Bitte Ventil wählen",
      "%Flow": "Auslegungsvolumenstrom",
      "%Pressure": "Auslegungsdifferenzdruck",
      "%Setting": "Einstellung",
      "%MinDelta": "Min. ∆P (kPa)",
      "%SettingFreseS": "Einstellung Frese S",
      "%SettingFresePV": "Einstellung Frese PV",
      "%DimensionFreseS": "Dimension Frese S",
      "%Back": "Zurück",
      "%Dimension": "Dimension Ventil",
      "%NoDimension": "Bitte Dimension wählen",
      "%NA": "NICHT MÖGLICH",
      "%MinDeltaTotalVentil" : "Min. ∆P (kPa) Total Ventil",
      "%VarenrHP" : "Art. nr. HP",
      "%VarenrLP" : "Art. nr. LP",
      "%Search" : "Suchen",
      "%M3/H": "m3/h",
      "%M3/S": "m3/s",
      "%Turns": "Number of turns",
      "%dPpKpa": "∆Pp (kPa)",
      "%dPvKpa": "∆Pv (kPa)",
      "%SelectLanguage" : "Bitte wählen Sprache",
      "%danish" : "Dansk",
      "%english" : "English",
      "%german" : "Deutsch",
      "%russian" : "Русский",
      "%french" : "Français",
      "%turkish" : "Türkçe"
   },
   "ru-ru": {
      "%LitersSecond": "литр / сек",
      "%LitersHour": "литр / час",
      "%L/S": "литр / час",
      "%L/H": "л/ч",
      "%kPa": "кПа",
      "%Valves": "Регуляторы",
      "%Save": "Сохранить",
      "%ValvesUnit": "Выберите единицу измерения",
      "%Calculate": "Рассчитать",
      "%Settings": "Настройки",
      "%PleaseSelectFrese": "Выберите клапан",
      "%Flow": "Расход",
      "%Pressure": "Перепад давления",
      "%Setting": "Настройка",
      "%MinDelta": "мин ΔP (кПа)",
      "%SettingFreseS": "Настройка клапана Frese S",
      "%SettingFresePV": "Настройка клапана Frese PV",
      "%DimensionFreseS": "Размер клапана Frese S",
      "%Back": "Назад",
      "%Dimension": "Размер клапана",
      "%NoDimension": "Выберите размер клапана",
      "%NA": "НЕПРИМЕНИМО",
      "%MinDeltaTotalVentil" : "Min. ∆P (кПа) Total Ventil",	// TODO: Translate
      "%VarenrHP" : "Код оборудования HP (Высок. Давление)",
      "%VarenrLP" : "Код оборудования  LP (Низк. Давление)",
      "%Search" : "Найти",
      "%M3/H": "м3/час",
      "%M3/S": "m3/s",
      "%Turns": "No. turns",
      "%dPpKpa": "ΔPp (кПа)",
      "%dPvKpa": "ΔPv (кПа)",
      "%SelectLanguage" : "Выберите язык",
      "%danish" : "Dansk",
      "%english" : "English",
      "%german" : "Deutsch",
      "%russian" : "Русский",
      "%french" : "Français",
      "%turkish" : "Türkçe"
   },
   "fr-fr": {
      "%LitersSecond": "litre / seconde",
      "%LitersHour": "litre / heure",
      "%L/S": "l/s",
      "%L/H": "l/h",
      "%kPa": "kPa",
      "%Valves": "Vannes",
      "%Save": "Enregistrer",
      "%ValvesUnit": "Choix d'unité",
      "%Calculate": "Calculer",
      "%Settings": "Préréglages",
      "%PleaseSelectFrese": "Choix de vannes",
      "%Flow": "Débit volumique",
      "%Pressure": "Pression différencielle",
      "%Setting": "Préréglage",
      "%MinDelta": "Min. ∆P (kPa)",
      "%SettingFreseS": "Préréglage Frese S",
      "%SettingFresePV": "Préréglage Frese PV",
      "%DimensionFreseS": "Dimension Frese S",
      "%Back": "Retour",
      "%Dimension": "Diamètre Nominal",
      "%NoDimension": "Choix de dimension",
      "%NA": "PAS POSSIBLE",
      "%MinDeltaTotalVentil" : "Min. ∆P (kPa) Total Ventil",	// TODO: Translate
      "%VarenrHP" : "Numéro d'article HP",
      "%VarenrLP" : "Numéro d'article LP",
      "%Search" : "Calcule",
      "%M3/H": "m3/h",
      "%M3/S": "m3/s",
      "%Turns": "No. turns",
      "%dPpKpa": "∆Pp (kPa)",
      "%dPvKpa": "∆Pv (kPa)",
      "%SelectLanguage" : "Selectionner la langue",
      "%danish" : "Dansk",
      "%english" : "English",
      "%german" : "Deutsch",
      "%russian" : "Русский",
      "%french" : "Français",
      "%turkish" : "Türkçe"
   },
   "tr-tr": {
      "%LitersSecond": "Litre / Saniye",
      "%LitersHour": "Litre / Saat",
      "%L/S": "l/s",
      "%L/H": "l/h",
      "%kPa": "kPa",
      "%Valves": "Vanalar",
      "%Save": "Kaydet",
      "%ValvesUnit": "Birimi seçin",
      "%Calculate": "Hesapla",
      "%Settings": "Ayarlar",
      "%PleaseSelectFrese": "Lütfen vana seçiniz",
      "%Flow": "Debi",
      "%Pressure": "Diferansiyel basınç",
      "%Setting": "Ayar",
      "%MinDelta": "Min. ∆P (kPa)",
      "%SettingFreseS": "Frese S vana ayarları",
      "%SettingFresePV": "Frese PV vana ayarları",
      "%DimensionFreseS": "Frese S çap",
      "%Back": "Geri",
      "%Dimension": "Çap",
      "%NoDimension": "Çapı seçiniz",
      "%NA": "GEÇERLİ DEĞİLDİR",
      "%MinDeltaTotalVentil" : "Min. ∆P (kPa) Total Ventil",	// TODO: Translate
      "%VarenrHP" : "Ekipman no HP",
      "%VarenrLP" : "Ekipman no LP",
      "%Search" : "Ara",
      "%M3/H": "m3/h",
      "%M3/S": "m3/s",
      "%Turns": "No. turns",
      "%dPpKpa": "∆Pp (kPa)",
      "%dPvKpa": "∆Pv (kPa)",
      "%SelectLanguage" : "Dil seçin",
      "%danish" : "Dansk",
      "%english" : "English",
      "%german" : "Deutsch",
      "%russian" : "Русский",
      "%french" : "Français",
      "%turkish" : "Türkçe"
   }
});


function DN15KPa530FresePVCompactCalculator() {
	
	var minFlow = 50;
    var maxFlow = 600;
    var minDp = 5;
    var maxDp = 30;
    
    this.getName = function() {
        return "DN15KPa530";
    }
    
    this.calculateSetting = function(flow, pressure) {
      if (!canCalculateFlow(flow)) return -1;
      if (!canCalculateDp(pressure)) return -1;

      // NB! Returns "number of turns"
      var turns = -0.2 + ((pressure - minDp) * 0.680) + (flow / 272.0);
      if(turns < 0) return 0.0;
      return turns;
    }
    
    this.calculateDp = function(flow, pressure) {
      return pressure + Math.pow(flow / 2900.0, 2) * 100;
    }

    function calculateDelta(setting) {
      return 1;
    }
    
    function canCalculateFlow(flow) {
      return flow >= minFlow && flow <= maxFlow ? true : false;
    }
    
    function canCalculateDp(pressure) {
      return pressure >= minDp && pressure <= maxDp ? true : false; 
    }
	
} //DN15KPa530FresePVCompactCalculator

function DN15KPa2060FresePVCompactCalculator() {
	
	var minFlow = 100;
    var maxFlow = 1000;
    var minDp = 20;
    var maxDp = 60;
    
    this.getName = function() {
      return "DN15KPa2060";
    }
    
    this.calculateSetting = function(flow, pressure) {
      if (!canCalculateFlow(flow)) return -1;
      if (!canCalculateDp(pressure)) return -1;

      // NB! Returns "number of turns"
      return -0.3 + ((pressure - minDp) * 0.402) + (flow / 313.0);
    }
    
    this.calculateDp = function(flow, pressure) {
      return pressure + Math.pow(flow / 2900.0, 2) * 100;
    }
    
    function calculateDelta(setting) {
      return 1;
    }
    
    function canCalculateFlow(flow) {
      return flow >= minFlow && flow <= maxFlow ? true : false;
    }
    
    function canCalculateDp(pressure) {
      return pressure >= minDp && pressure <= maxDp ? true : false; 
    }
	
} //DN15KPa2060FresePVCompactCalculator

function FresePVCompactCalculatorService(services) {        
    for (var i = 0; i < services.length; i++) {
        this.getCalculators()[services[i].getName()] = services[i];
    }
    
    this.getName = function() {
        return "Frese-PV-Compact";
    }
}
FresePVCompactCalculatorService.prototype = new AbstractCalculatorService();


function CalculatorResult(setting, mindelta, customSetting, customMinDelta) {
    this.setting = setting;
    this.mindelta = mindelta;
    this.customSetting = customSetting;
    this.customMinDelta = customMinDelta;
    
    this.getSetting = function() {
        return this.setting;
    }
    
    this.getMinDelta = function() {
        return this.mindelta;
    }     
    
    this.getCustomSetting = function() {
        return this.customSetting;
    }
    
    this.getCustomMinDelta = function() {
        return this.customMinDelta;
    }
}

function CalculatorResult(setting, mindelta, customSetting, customMinDelta, mindeltatotalventil) {
    this.setting = setting;
    this.mindelta = mindelta;
    this.customSetting = customSetting;
    this.customMinDelta = customMinDelta;
    this.mindeltatotalventil = mindeltatotalventil;
    
    this.getSetting = function() {
        return this.setting;
    }
    
    this.getMinDelta = function() {
        return this.mindelta;
    }     
    
    this.getCustomSetting = function() {
        return this.customSetting;
    }
    
    this.getCustomMinDelta = function() {
        return this.customMinDelta;
    }
    
    this.getMinDeltaTotalVentil = function () {
        return this.mindeltatotalventil;
    }
}

function AbstractCalculatorService(services) {
  this.calculators = {};
           
  this.calculate = function(valveSize, flow, pressure) {
    var service = this.get(valveSize);
    var setting = service.calculateSetting(flow, pressure);
    var mindelta = service.calculateDp(flow, pressure);

    if (service.calculateCustomSetting && service.calculateCustomDp) {
      var customSetting = service.calculateCustomSetting(flow, pressure);
      var customDp = service.calculateCustomDp(flow, pressure);
      if (service.calculateMinDeltaTotalVentil) {
        var mindeltatotalventil = service.calculateMinDeltaTotalVentil(flow, pressure);
        return new CalculatorResult(setting, mindelta, customSetting, customDp, mindeltatotalventil);
      }
      return new CalculatorResult(setting, mindelta, customSetting, customDp);
    }
    return new CalculatorResult(setting, mindelta);
  }

  this.get = function(valveSize) {
    return this.calculators[valveSize];
  }
    
  this.getCalculators = function() {
    return this.calculators;
  }
}

AbstractCalculatorService.prototype.getName = function() {
    return "Abstract";
}


function DN15530KPAFresePVCalculator() {
    var minFlow = 50;
    var maxFlow = 600;
    var minDp = 5;
    var maxDp = 30;
    
    this.getName = function() {
        return "DN15530KPA";
    }
    
    this.calculateSetting = function(flow, pressure) {
        if (!canCalculateFlow(flow)) return -1;
        if (!canCalculateDp(pressure)) return -1;
        
        return 1.86 + ((pressure - 5) * 0.5575) + (flow / 494.76);
    }
    
    this.calculateDp = function(flow, pressure) {
        var setting = this.calculateSetting(flow, pressure);
        if (setting == -1) return -1;
        
        return pressure + (Math.pow(flow/(1000 * 3.6), 2) * 100);
    }
    
    function calculateDelta(setting) {
        return 1;
    }
    
    function canCalculateFlow(flow) {
        return flow >= minFlow && flow <= maxFlow ? true : false;
    }
    
    function canCalculateDp(pressure) {
        return pressure >= minDp && pressure <= maxDp ? true : false; 
    }
}

function DN152060KPAFresePVCalculator() {
    var minFlow = 100;
    var maxFlow = 1200;
    var minDp = 20;
    var maxDp = 60;
    
    this.getName = function() {
        return "DN152060KPA";
    }
    
    this.calculateSetting = function(flow, pressure) {
        if (!canCalculateFlow(flow)) return -1;
        if (!canCalculateDp(pressure)) return -1;

        return 1.9 + ((pressure - 20) * 0.3133) + (flow / 747.59);
    }
    
    this.calculateDp = function(flow, pressure) {
        var setting = this.calculateSetting(flow, pressure);
        if (setting == -1) return -1;
        
        return pressure + (Math.pow(flow / (1000 * 3.6), 2) * 100);
    }
    
    function calculateDelta(setting) {
        return 1;
    }
    
    function canCalculateFlow(flow) {
        return flow >= minFlow && flow <= maxFlow ? true : false;
    }
    
    function canCalculateDp(pressure) {
        return pressure >= minDp && pressure <= maxDp ? true : false; 
    }
}

function DN20530KPAFresePVCalculator() {
    var minFlow = 100;
    var maxFlow = 1000;
    var minDp = 5;
    var maxDp = 30;
    
    this.getName = function() {
        return "DN20530KPA";
    }
    
    this.calculateSetting = function(flow, pressure) {
        if (!canCalculateFlow(flow)) return -1;
        if (!canCalculateDp(pressure)) return -1;
        
        return 1.8 + ((pressure - 5) * 0.59) + (flow / 682.82);
    }
    
    this.calculateDp = function(flow, pressure) {
        var setting = this.calculateSetting(flow, pressure);
        if (setting == -1) return -1;
        
        return pressure + (Math.pow(flow / (1000 * 4), 2) * 100);
    }
    
    function calculateDelta(setting) {
        return 1;
    }
    
    function canCalculateFlow(flow) {
        return flow >= minFlow && flow <= maxFlow ? true : false;
    }
    
    function canCalculateDp(pressure) {
        return pressure >= minDp && pressure <= maxDp ? true : false; 
    }
}

function DN202060KPAFresePVCalculator() {
    var minFlow = 150;
    var maxFlow = 2000;
    var minDp = 20;
    var maxDp = 60;
    
    this.getName = function() {
        return "DN202060KPA";
    }
    
    this.calculateSetting = function(flow, pressure) {
        if (!canCalculateFlow(flow)) return -1;
        if (!canCalculateDp(pressure)) return -1;
        
        return 1.8 + ((pressure - 20) * 0.324) + (flow / 596.44);
    }
    
    this.calculateDp = function(flow, pressure) {
        var setting = this.calculateSetting(flow, pressure);
        if (setting == -1) return -1;
        
        return pressure + (Math.pow(flow / (1000 * 4), 2) * 100);
    }
    
    function calculateDelta(setting) {
        return 1;
    }
    
    function canCalculateFlow(flow) {
        return flow >= minFlow && flow <= maxFlow ? true : false;
    }
    
    function canCalculateDp(pressure) {
        return pressure >= minDp && pressure <= maxDp ? true : false; 
    }
}

function DN25530KPAFresePVCalculator() {
    var minFlow = 600;
    var maxFlow = 2500;
    var minDp = 5;
    var maxDp = 30;
    
    this.getName = function() {
        return "DN25530KPA";
    }
    
    this.calculateSetting = function(flow, pressure) {
        if (!canCalculateFlow(flow)) return -1;
        if (!canCalculateDp(pressure)) return -1;
        
        return 1.2 + ((pressure - 5) * 1.26) + (flow / 802.65);
    }
    
    this.calculateDp = function(flow, pressure) {
        var setting = this.calculateSetting(flow, pressure);
        if (setting == -1) return -1;
        
        return pressure + (Math.pow(flow / (1000 * 9.5), 2) * 100);
    }
    
    function calculateDelta(setting) {
        return 1;
    }
    
    function canCalculateFlow(flow) {
        return flow >= minFlow && flow <= maxFlow ? true : false;
    }
    
    function canCalculateDp(pressure) {
        return pressure >= minDp && pressure <= maxDp ? true : false; 
    }
}

function DN252060KPAFresePVCalculator() {
    var minFlow = 700;
    var maxFlow = 4000;
    var minDp = 20;
    var maxDp = 60;
    
    this.getName = function() {
        return "DN252060KPA";
    }
    
    this.calculateSetting = function(flow, pressure) {
        if (!canCalculateFlow(flow)) return -1;
        if (!canCalculateDp(pressure)) return -1;
        
        return 1.5 + ((pressure - 20) * 0.7175) + (flow / 1529.6);
    }
    
    this.calculateDp = function(flow, pressure) {
        var setting = this.calculateSetting(flow, pressure);
        if (setting == -1) return -1;
        
        return pressure + (Math.pow(flow / (1000 * 9.5), 2) * 100);
    }
    
    function calculateDelta(setting) {
        return 1;
    }

    
    function canCalculateFlow(flow) {
        return flow >= minFlow && flow <= maxFlow ? true : false;
    }
    
    function canCalculateDp(pressure) {
        return pressure >= minDp && pressure <= maxDp ? true : false; 
    }
}

function DN322080KPAFresePVCalculator() {
    var minFlow = 1000;
    var maxFlow = 5000;
    var minDp = 20;
    var maxDp = 80;
    
    this.getName = function() {
        return "DN322080KPA";
    }
    
    this.calculateSetting = function(flow, pressure) {
        if (!canCalculateFlow(flow)) return -1;
        if (!canCalculateDp(pressure)) return -1;
        
        return 1.2 + ((pressure - 20) * 0.4833) + (flow / 1338.84);
    }
    
    this.calculateDp = function(flow, pressure) {
        var setting = this.calculateSetting(flow, pressure);
        if (setting == -1) return -1;
        
        return pressure + (Math.pow(flow / (1000 * 11.4), 2) * 100);
    }
    
    function calculateDelta(setting) {
        return 1;
    }
    
    function canCalculateFlow(flow) {
        return flow >= minFlow && flow <= maxFlow ? true : false;
    }
    
    function canCalculateDp(pressure) {
        return pressure >= minDp && pressure <= maxDp ? true : false; 
    }
}

function DN402080KPAFresePVCalculator() {
    var minFlow = 3000;
    var maxFlow = 8000;
    var minDp = 20;
    var maxDp = 80;
    
    this.getName = function() {
        return "DN402080KPA";
    }
    
    this.calculateSetting = function(flow, pressure) {
        if (!canCalculateFlow(flow)) return -1;
        if (!canCalculateDp(pressure)) return -1;
        
        return 0.6 + ((pressure - 20) * 0.4133) + (flow / 2213.08);
    }
    
    this.calculateDp = function(flow, pressure) {
        var setting = this.calculateSetting(flow, pressure);
        if (setting == -1) return -1;
        
        return pressure + (Math.pow(flow / (1000 * 16.4), 2) * 100);
    }
    
    function calculateDelta(setting) {
        return 1;
    }

    
    function canCalculateFlow(flow) {
        return flow >= minFlow && flow <= maxFlow ? true : false;
    }
    
    function canCalculateDp(pressure) {
        return pressure >= minDp && pressure <= maxDp ? true : false; 
    }
}

function DN502080KPAFresePVCalculator() {
    var minFlow = 5000;
    var maxFlow = 15000;
    var minDp = 20;
    var maxDp = 80;
    
    this.getName = function() {
        return "DN502080KPA";
    }
    
    this.calculateSetting = function(flow, pressure) {
        if (!canCalculateFlow(flow)) return -1;
        if (!canCalculateDp(pressure)) return -1;
        
        return -0.4 + ((pressure - 20) * 0.352) + (flow / 2234.42);
    }
    
    this.calculateDp = function(flow, pressure) {
        var setting = this.calculateSetting(flow, pressure);
        if (setting == -1) return -1;
        
        return pressure + (Math.pow(flow / (1000 * 17.9), 2) * 100);
    }
    
    function calculateDelta(setting) {
        return 1;
    }
    
    function canCalculateFlow(flow) {
        return flow >= minFlow && flow <= maxFlow ? true : false;
    }
    
    function canCalculateDp(pressure) {
        return pressure >= minDp && pressure <= maxDp ? true : false; 
    }
}

function FresePVCalculatorService(services) {        
    for (var i = 0; i < services.length; i++) {
        this.getCalculators()[services[i].getName()] = services[i];
    }
    
    this.getName = function() {
        return "Frese-PV";
    }
}

FresePVCalculatorService.prototype = new AbstractCalculatorService();

function DN15LFFreseOptimaCalculator() {
    var minFlow = 78;
    var maxFlow = 625;
    var minDp = 14;
    var maxDp = 400;
    
    this.getName = function() {
        return "DN15LF";
    }
    
    this.calculateSetting = function(flow, pressure) {
        if (!canCalculateFlow(flow)) return -1;
        if (!canCalculateDp(pressure)) return -1;
        return 0.006398 * flow;
    }
    
    this.calculateDp = function(flow, pressure) {
        if (!canCalculateFlow(flow)) return -1;
        var setting = this.calculateSetting(flow, pressure);
        if (setting == -1) return -1;
        
        if (flow < 80) return 14;
        return Math.pow(((flow / 1000) / calculateDelta(setting)), 2) * 100;
    }
    
    function calculateDelta(setting) {
        var result = (-0.000498 * Math.pow(setting, 5) + 0.005871 * Math.pow(setting, 4) 
            - 0.024468 * Math.pow(setting, 3) + 0.037541 * Math.pow(setting, 2) 
            + 0.381317 * setting + 0.010176);
        console.log("DN15LF, calculateDelta:" + result);
        return result;
    }
    
    function canCalculateFlow(flow) {
        return flow >= minFlow && flow <= maxFlow ? true : false;
    }
    
    function canCalculateDp(pressure) {
        return pressure >= minDp && pressure <= maxDp ? true : false; 
    }
}

function DN15HFFreseOptimaCalculator() {
    var minFlow = 244;
    var maxFlow = 1724;
    var minDp = 14;
    var maxDp = 400;
    
    this.getName = function() {
        return "DN15HF";
    }
    
    this.calculateSetting = function(flow, pressure) {
        if (!canCalculateFlow(flow)) return -1;
        if (!canCalculateDp(pressure)) return -1;
        
        return (1.5247152E-18 * Math.pow(flow, 6) - 8.2348324758E-15 * Math.pow(flow, 5)
            + 1.77995508585783E-11 * Math.pow(flow, 4) - 1.9235480640142E-08 * Math.pow(flow, 3)
        + 1.08015895489203E-005 * Math.pow(flow, 2) - 0.0010007046626199 * flow + 0.323878177531235);
    }
    
    this.calculateDp = function(flow, pressure) {
        if (!canCalculateFlow(flow)) return -1;
        var setting = this.calculateSetting(flow, pressure);
        if (setting == -1) return -1;
        
        if (flow < 50) return 14;
        return Math.pow(((flow / 1000) / calculateDelta(setting)), 2) * 100;
    }
    
    function calculateDelta(setting) {
        return (-0.0039861079 * Math.pow(setting, 6) + 0.0576732375 * Math.pow(setting, 5)
                -0.3302802366 * Math.pow(setting, 4) + 0.9223643621 * Math.pow(setting, 3)
                -1.3894548228 * Math.pow(setting, 2) + 2.3343882681 * setting - 0.2516773097);
    }
    
    function canCalculateFlow(flow) {
        return flow >= minFlow && flow <= maxFlow ? true : false;
    }
    
    function canCalculateDp(pressure) {
        return pressure >= minDp && pressure <= maxDp ? true : false; 
    }
}

function DN20LFFreseOptimaCalculator() {
    var minFlow = 131;
    var maxFlow = 1050;
    var minDp = 14;
    var maxDp = 400;
    
    this.getName = function() {
        return "DN20LF";
    }
    
    this.calculateSetting = function(flow, pressure) {
        if (!canCalculateFlow(flow)) return -1;
        if (!canCalculateDp(pressure)) return -1;
        
        return 0.00380952380952 * flow;
    }
    
    this.calculateDp = function(flow, pressure) {
        if (!canCalculateFlow(flow)) return -1;
        var setting = this.calculateSetting(flow, pressure);
        if (setting == -1) return -1;
        
        if (flow < 50) return 12;
        return Math.pow(((flow / 1000) / calculateDelta(setting)), 2) * 100;
    }
    
    function calculateDelta(setting) {
        return (-0.0086 * Math.pow(setting, 2) + 0.6881 * setting + 0.0087);
    }
    
    function canCalculateFlow(flow) {
        return flow >= minFlow && flow <= maxFlow ? true : false;
    }
    
    function canCalculateDp(pressure) {
        return pressure >= minDp && pressure <= maxDp ? true : false; 
    }
}

function DN20HFFreseOptimaCalculator() {
    var minFlow = 292;
    var maxFlow = 2039;
    var minDp = 13;
    var maxDp = 400;
    
    this.getName = function() {
        return "DN20HF";
    }
    
    this.calculateSetting = function(flow, pressure) {
        if (!canCalculateFlow(flow)) return -1;
        if (!canCalculateDp(pressure)) return -1;
        
        return (5.78E-013 * Math.pow(flow, 4) - 2.249803E-009 * Math.pow(flow, 3)
                + 0.000002989997209 * Math.pow(flow, 2) + 0.000191821643646 * flow + 0.246094550041393);
    }
    
    this.calculateDp = function(flow, pressure) {
        if (!canCalculateFlow(flow)) return -1;
        var setting = this.calculateSetting(flow, pressure);
        if (setting == -1) return -1;
        
        if (flow < 250) return 12;
        return Math.pow(((flow / 1000) / calculateDelta(setting)), 2) * 100;
    }
    
    function calculateDelta(setting) {
        return (-0.0014892869 * Math.pow(setting, 6) + 0.0257700614 * Math.pow(setting, 5)
            - 0.1995231772 * Math.pow(setting, 4) + 0.7772951529 * Math.pow(setting, 3)
            - 1.6065084156 * Math.pow(setting, 2) + 2.8484843634 * setting - 0.2996802496);
    }
    
    function canCalculateFlow(flow) {
        return flow >= minFlow && flow <= maxFlow ? true : false;
    }
    
    function canCalculateDp(pressure) {
        return pressure >= minDp && pressure <= maxDp ? true : false; 
    }
}

function DN25LFFreseOptimaCalculator() {
    var minFlow = 231;
    var maxFlow = 1722;
    var minDp = 14;
    var maxDp = 400;
    
    this.getName = function() {
        return "DN25LF";
    }
    
    this.calculateSetting = function(flow, pressure) {
        if (!canCalculateFlow(flow)) return -1;
        if (!canCalculateDp(pressure)) return -1;
                
        return (0.000000000000879 * Math.pow(flow, 4) - 0.0000000026564 * Math.pow(flow, 3)
            + 0.000002790146767 * Math.pow(flow, 2) + 0.000779022750185 * flow + 0.204989267294888);
    }
    
    this.calculateDp = function(flow, pressure) {
        if (!canCalculateFlow(flow)) return -1;
        var setting = this.calculateSetting(flow, pressure);
        if (setting == -1) return -1;
        
        if (flow < 240) return 13.5;
        return Math.pow(((flow / 1000) / calculateDelta(setting)), 2) * 100;
    }
    
    function calculateDelta(setting) {   
        return (0.0002 * Math.pow(setting, 4)) - (0.0403 * Math.pow(setting, 3))
            + (0.1197 * Math.pow(setting, 2)) + (1.2343 * setting) - 0.0137;
    }
    
    function canCalculateFlow(flow) {
        return flow >= minFlow && flow <= maxFlow ? true : false;
    }
    
    function canCalculateDp(pressure) {
        return pressure >= minDp && pressure <= maxDp ? true : false; 
    }
}

function DN25HFFreseOptimaCalculator() {
    var minFlow = 292;
    var maxFlow = 2039;
    var minDp = 14;
    var maxDp = 400;
    
    this.getName = function() {
        return "DN25HF";
    }
    
    this.calculateSetting = function(flow, pressure) {
        if (!canCalculateFlow(flow)) return -1;
        if (!canCalculateDp(pressure)) return -1;
                
        return (0.0000000000005607 * Math.pow(flow, 4)) - (0.0000000022474923 * Math.pow(flow, 3))
            + (0.0000031352071003 * Math.pow(flow, 2)) - (0.0000239414697848 * flow) + 0.326255940065591;
    }
    
    this.calculateDp = function(flow, pressure) {
        if (!canCalculateFlow(flow)) return -1;
        var setting = this.calculateSetting(flow, pressure);
        if (setting == -1) return -1;
        
        if (flow < 440) return 13.5;
        return Math.pow(((flow / 1000) / calculateDelta(setting)), 2) * 100;
    }
    
    function calculateDelta(setting) {
        return (-0.0295 * Math.pow(setting, 4)) + (0.235 * Math.pow(setting, 3))
            - (0.7397 * Math.pow(setting, 2)) + (2.2089 * setting) - 0.1367;
    }
    
    function canCalculateFlow(flow) {
        return flow >= minFlow && flow <= maxFlow ? true : false;
    }
    
    function canCalculateDp(pressure) {
        return pressure >= minDp && pressure <= maxDp ? true : false; 
    }
}

function DN32FreseOptimaCalculator() {
    var minFlow = 465;
    var maxFlow = 3056;
    var minDp = 14;
    var maxDp = 400;
    
    this.getName = function() {
        return "DN32";
    }
    
    this.calculateSetting = function(flow, pressure) {
        if (!canCalculateFlow(flow)) return -1;
        if (!canCalculateDp(pressure)) return -1;
                    
        return (0.000000000000082 * Math.pow(flow, 4)) - (0.000000000447909 * Math.pow(flow, 3))
            + (0.000000882571919 * Math.pow(flow, 2)) + (0.000393485172707 * flow) + 0.170008718433059;
    }
    
    this.calculateDp = function(flow, pressure) {
        if (!canCalculateFlow(flow)) return -1;
        var setting = this.calculateSetting(flow, pressure);
        if (setting == -1) return -1;
        
        if (flow < 600) return 14;
        return Math.pow(((flow / 1000) / calculateDelta(setting)), 2) * 100;
    }
    
    function calculateDelta(setting) {
        return (-0.0009 * Math.pow(setting, 4)) - (0.0408 * Math.pow(setting, 3))
            + (0.0532 * Math.pow(setting, 2)) + (2.2639 * setting) + 0.1485;
    }
    
    function canCalculateFlow(flow) {
        return flow >= minFlow && flow <= maxFlow ? true : false;
    }
    
    function canCalculateDp(pressure) {
        return pressure >= minDp && pressure <= maxDp ? true : false; 
    }
}

function DN40FreseOptimaCalculator() {
    var minFlow = 2022;
    var maxFlow = 7105;
    var minDp = 16;
    var maxDp = 400;
    
    this.getName = function() {
        return "DN40";
    }
    
    this.calculateSetting = function(flow, pressure) {
        if (!canCalculateFlow(flow)) return -1;
        if (!canCalculateDp(pressure)) return -1;
        
        if (flow > 7050) return 4;
        
        return (1.991E-21 * Math.pow(flow, 6)) - (5.04426806E-17 * Math.pow(flow, 5))
            + (5.194999038249E-13 * Math.pow(flow, 4)) - (2.7718399824566E-09 * Math.pow(flow, 3))
            + (0.0000080806755838486 * Math.pow(flow, 2)) - (0.0118695972480039 * flow) + 7.26406638121848;
    }
    
    this.calculateDp = function(flow, pressure) {
        if (!canCalculateFlow(flow)) return -1;
        var setting = this.calculateSetting(flow, pressure);
        if (setting == -1) return -1;
        
        if (flow < 2068) return 16;
        return Math.pow(((flow / 1000) / calculateDelta(setting)), 2) * 100;
    }
    
    function calculateDelta(setting) {
        return (0.0314 * Math.pow(setting, 4)) + (0.0298 * Math.pow(setting, 3))
            - (2.4926 * Math.pow(setting, 2)) + (10.917 * setting) + 0.215;
    }
    
    function canCalculateFlow(flow) {
        return flow >= minFlow && flow <= maxFlow ? true : false;
    }
    
    function canCalculateDp(pressure) {
        return pressure >= minDp && pressure <= maxDp ? true : false; 
    }
}

function DN50FreseOptimaCalculator() {
    var minFlow = 2204;
    var maxFlow = 8586;
    var minDp = 19;
    var maxDp = 400;
    
    this.getName = function() {
        return "DN50";
    }
    
    this.calculateSetting = function(flow, pressure) {
        if (!canCalculateFlow(flow)) return -1;
        if (!canCalculateDp(pressure)) return -1;
        
        console.log("DN50:" + flow);
        if (flow > 8450) return 4;
        return (1.259599584E-21 * Math.pow(flow, 6)) - (3.8397324403082E-17 * Math.pow(flow, 5))
            + (4.73777385425659E-13 * Math.pow(flow, 4)) - (3.01075699136702E-09 * Math.pow(flow, 3))
            + (0.0000103574489737108 * Math.pow(flow, 2)) - (0.0180028315642146 * flow) + 12.784869126445;
    }
    
    this.calculateDp = function(flow, pressure) {
        if (!canCalculateFlow(flow)) return -1;
        var setting = this.calculateSetting(flow, pressure);
        if (setting == -1) return -1;
        
        console.log("DN50, calculateDp:" + flow);
        if (flow < 2265) return 19;
        return Math.pow(((flow / 1000) / calculateDelta(setting)), 2) * 100;
    }
    
    function calculateDelta(setting) {
        var delta = (0.027692 * Math.pow(setting, 5)) - (0.37669 * Math.pow(setting, 4)) + (2.212005 * Math.pow(setting, 3))
        - (7.704196 * Math.pow(setting, 2)) + (16.629417 * setting) - 1.55;
        console.log("DN50, calculateDelta:" + delta);
        return delta;
    }
    
    function canCalculateFlow(flow) {
        return flow >= minFlow && flow <= maxFlow ? true : false;
    }
    
    function canCalculateDp(pressure) {
        return pressure >= minDp && pressure <= maxDp ? true : false; 
    }
}

function FreseOptimaCalculatorService(services) {        
    for (var i = 0; i < services.length; i++) {
        this.getCalculators()[services[i].getName()] = services[i];
    }
    
    this.getName = function() {
        return "Frese-OPTIMA";
    }
}
FreseOptimaCalculatorService.prototype = new AbstractCalculatorService();



function DN1525FreseEVACalculator() {
    var minFlow = 25;
    var maxFlow = 804;
    var minDp = 8;
    var maxDp = 250;
    
    this.getName = function() {
        return "DN1525";
    }
    
    this.calculateCustomSetting = function(flow, pressure) {
        if (!canCalculateFlow(flow)) return -1;
        var length = StaticData.EVA.DN1525.smaller.length;
        for (var i = 0; i < length - 1; i++) {
            var minvalue = parseFloat(StaticData.EVA.DN1525.smaller[i].LH);
            var maxvalue = parseFloat(StaticData.EVA.DN1525.smaller[i+1].LH);
            if (flow >= minvalue && flow < maxvalue) {
                return parseFloat(StaticData.EVA.DN1525.greater[i].LH);
            }
        }
        return parseFloat(StaticData.EVA.DN1525.greater[length - 1].LH);
    }
    
    this.calculateCustomDp = function(flow, pressure) {
        if (!canCalculateFlow(flow)) return -1;
        var length = StaticData.EVA.DN1525.smaller.length;
        for (var i = 0; i < length - 1; i++) {
            var minvalue = parseFloat(StaticData.EVA.DN1525.smaller[i].LH);
            var maxvalue = parseFloat(StaticData.EVA.DN1525.smaller[i+1].LH);
            if (flow >= minvalue && flow < maxvalue) {
                return parseFloat(StaticData.EVA.DN1525.greater[i].MinDP);
            }
        }
        return parseFloat(StaticData.EVA.DN1525.greater[length - 1].MinDP);
    }
    
    function calculateDelta(setting) {
        return (-0.0001914848 * Math.pow(setting, 5)) + (0.0053285439 * Math.pow(setting, 4)) - (0.054883786 * Math.pow(setting, 3)) + (0.2534175671 * Math.pow(setting, 2)) - (0.2481945056 * setting) + 0.1333828468;
    }
    
    this.calculateDp = function(flow, pressure) {
        //Vare nr. HP
        if (!canCalculateFlow(flow)) return "N/A";
        var length = StaticData.EVA.DN1525.smaller.length;
        for (var i = 0; i < length - 1; i++) {
            var minvalue = parseFloat(StaticData.EVA.DN1525.smaller[i].LH);
            var maxvalue = parseFloat(StaticData.EVA.DN1525.smaller[i+1].LH);
            if (flow >= minvalue && flow < maxvalue) {
                return StaticData.EVA.DN1525.greater[i].VareHP;
            }
        }
        return StaticData.EVA.DN1525.greater[length - 1].VareHP;
    }
    this.calculateSetting = function(flow, pressure) {
        //Vare nr. LP
        if (!canCalculateFlow(flow)) return "N/A";
        var length = StaticData.EVA.DN1525.smaller.length;
        for (var i = 0; i < length - 1; i++) {
            var minvalue = parseFloat(StaticData.EVA.DN1525.smaller[i].LH);
            var maxvalue = parseFloat(StaticData.EVA.DN1525.smaller[i+1].LH);
            if (flow >= minvalue && flow < maxvalue) {
                return StaticData.EVA.DN1525.greater[i].VareLP;
            }
        }
        return StaticData.EVA.DN1525.greater[length - 1].VareLP;
    }
    
    this.calculateMinDeltaTotalVentil = function(flow, pressure) {
        //Min. ∆P (kPa) Total Ventil 
        if (!canCalculateFlow(flow)) return -1;
        var length = StaticData.EVA.DN1525.smaller.length;
        for (var i = 0; i < length - 1; i++) {
            var minvalue = parseFloat(StaticData.EVA.DN1525.smaller[i].LH);
            var maxvalue = parseFloat(StaticData.EVA.DN1525.smaller[i+1].LH);
            if (flow >= minvalue && flow < maxvalue) {
                return parseFloat(StaticData.EVA.DN1525.greater[i].MinDPtoGEHEINS);
            }
        }
        return parseFloat(StaticData.EVA.DN1525.greater[length - 1].MinDPtoGEHEINS);
    }
    
    function canCalculateFlow(flow) {
        return flow >= 0 ? true : false;
    }
    
    function canCalculateDp(pressure) {
        return pressure >= minDp && pressure <= maxDp ? true : false; 
    }
}

function FreseEVACalculatorService(services) {        
    for (var i = 0; i < services.length; i++) {
        this.getCalculators()[services[i].getName()] = services[i];
    }
    
    this.getName = function() {
        return "Frese-EVA";
    }
}

FreseEVACalculatorService.prototype = new AbstractCalculatorService();

// Copyright (c) 2013 Apide ApS; all rights reserved

// Calculator service for the Frese Optima Flange valve.

function DN50LFFreseOptimaFlangeCalculator() {
    var minFlow = 2.48;
    var maxFlow = 15;
    var minDp = 7;
    var maxDp = 600;
    
    this.getName = function() {
        return "DN50LF";
    }
    
    this.calculateSetting = function(flow, pressure) {
        if (!canCalculateFlow(flow)) return -1;
        if (!canCalculateDp(pressure)) return -1;
        
        return (-0.0007 * Math.pow(flow, 3)) + (0.0111 * Math.pow(flow, 2)) + (0.2671 * flow) - 0.1437;
    }
    
    this.calculateDp = function(flow, pressure) {
        if (!canCalculateFlow(flow)) return -1;
        
        if (flow < 3.9) return 6.5;
        var s = this.calculateSetting(flow, pressure);
        return (0.25 * Math.pow(s, 3)) - (0.25 * Math.pow(s, 2)) + (0.5 * s) + 6;
    }
    
    function calculateDelta(setting) {
        return 1;
    }
    
    function canCalculateFlow(flow) {
        return flow >= minFlow && flow <= maxFlow ? true : false;
    }
    
    function canCalculateDp(pressure) {
        return pressure >= minDp && pressure <= maxDp ? true : false; 
    }
} // DN50LFFreseOptimaFlangeCalculator

function DN50HFFreseOptimaFlangeCalculator() {
    var minFlow = 3.92;
    var maxFlow = 24;
    var minDp = 19;
    var maxDp = 600;
    
    this.getName = function() {
        return "DN50HF";
    }
    
    this.calculateSetting = function(flow, pressure) {
        if (!canCalculateFlow(flow)) return -1;
        if (!canCalculateDp(pressure)) return -1;
        
        return (-0.000159 * Math.pow(flow, 3)) + (0.004239 * Math.pow(flow, 2)) + (0.159774 * flow) - 0.099711;
    }
    
    this.calculateDp = function(flow, pressure) {
        if (!canCalculateFlow(flow)) return -1;
        
        if (flow < 6.2) return minDp;
        var s = this.calculateSetting(flow, pressure);
        return (0.6667 * Math.pow(s, 3)) - (0.5 * Math.pow(s, 2)) - (1.1667 * s) + 20;
    }
    
    function calculateDelta(setting) {
        return 1;
    }
    
    function canCalculateFlow(flow) {
        return flow >= minFlow && flow <= maxFlow ? true : false;
    }
    
    function canCalculateDp(pressure) {
        return pressure >= minDp && pressure <= maxDp ? true : false; 
    }
} // DN50HFFreseOptimaFlangeCalculator

function DN65LFFreseOptimaFlangeCalculator() {
    
	var minFlow = 4.38;
    var maxFlow = 25;
    var minDp = 15;
    var maxDp = 600;
    
    this.getName = function() {
        return "DN65LF";
    }
    
    this.calculateSetting = function(flow, pressure) {
        if (!canCalculateFlow(flow)) return -1;
        if (!canCalculateDp(pressure)) return -1;

        return (-0.000124 * Math.pow(flow, 3)) + (0.002487 * Math.pow(flow, 2)) + (0.185365 * flow) - 0.283831;
    }
    
    this.calculateDp = function(flow, pressure) {
        if (!canCalculateFlow(flow)) return -1;
        
        if (flow < 6.6) return minDp;
        var s = this.calculateSetting(flow, pressure);
        return (0.6667 * Math.pow(s, 3)) - (4.5 * Math.pow(s, 2)) + (11.883 * s) + 7;
    }
    
    function calculateDelta(setting) {
        return 1;
    }
    
    function canCalculateFlow(flow) {
        return flow >= minFlow && flow <= maxFlow ? true : false;
    }
    
    function canCalculateDp(pressure) {
        return pressure >= minDp && pressure <= maxDp ? true : false; 
    }

} // DN65LFFreseOptimaFlangeCalculator

function DN65HFFreseOptimaFlangeCalculator() {
    
	var minFlow = 5.95;
    var maxFlow = 35;
    var minDp = 30;
    var maxDp = 600;
    
    this.getName = function() {
        return "DN65HF";
    }
    
    this.calculateSetting = function(flow, pressure) {
        if (!canCalculateFlow(flow)) return -1;
        if (!canCalculateDp(pressure)) return -1;

        return (0.00000407 * Math.pow(flow, 4)) - (0.00036799 * Math.pow(flow, 3)) + (0.01016138 * Math.pow(flow, 2)) + (0.03167768 * flow) + 0.12121138;
    }
    
    this.calculateDp = function(flow, pressure) {
        if (!canCalculateFlow(flow)) return -1;
        
        if (flow < 9.1) return minDp;
        var s = this.calculateSetting(flow, pressure);
        return (2.6667 * Math.pow(s, 3)) - (15.5 * Math.pow(s, 2)) + (29.883 * s) + 13;
    }
    
    function calculateDelta(setting) {
        return 1;
    }
    
    function canCalculateFlow(flow) {
        return flow >= minFlow && flow <= maxFlow ? true : false;
    }
    
    function canCalculateDp(pressure) {
        return pressure >= minDp && pressure <= maxDp ? true : false; 
    }
    
} // DN65HFFreseOptimaFlangeCalculator

function DN80LFFreseOptimaFlangeCalculator() {
    
	var minFlow = 5.34;
    var maxFlow = 34;
    var minDp = 16;
    var maxDp = 600;
    
    this.getName = function() {
        return "DN80LF";
    }
    
    this.calculateSetting = function(flow, pressure) {
        if (!canCalculateFlow(flow)) return -1;
        if (!canCalculateDp(pressure)) return -1;

        return (-0.000044 * Math.pow(flow, 3)) + (0.000728 * Math.pow(flow, 2)) + (0.150689 * flow) - 0.254301;
    }
    
    this.calculateDp = function(flow, pressure) {
        if (!canCalculateFlow(flow)) return -1;
        
        if (flow < 8.3) return minDp;
        var s = this.calculateSetting(flow, pressure);
        return (0.5 * Math.pow(s, 3)) - (3 * Math.pow(s, 2)) + (7.5 * s) + 11;
    }
    
    function calculateDelta(setting) {
        return 1;
    }
    
    function canCalculateFlow(flow) {
        return flow >= minFlow && flow <= maxFlow ? true : false;
    }
    
    function canCalculateDp(pressure) {
        return pressure >= minDp && pressure <= maxDp ? true : false; 
    }

} // DN80LFFreseOptimaFlangeCalculator

function DN80HFFreseOptimaFlangeCalculator() {
	
	var minFlow = 7.02;
    var maxFlow = 43;
    var minDp = 23;
    var maxDp = 600;
    
    this.getName = function() {
        return "DN80HF";
    }
    
    this.calculateSetting = function(flow, pressure) {
        if (!canCalculateFlow(flow)) return -1;
        if (!canCalculateDp(pressure)) return -1;

        return (0.00000156 * Math.pow(flow, 4)) - (0.0001838 * Math.pow(flow, 3)) + (0.00652234 * Math.pow(flow, 2)) + (0.0239868 * flow) + 0.17174038;
    }
    
    this.calculateDp = function(flow, pressure) {
        if (!canCalculateFlow(flow)) return -1;
        
        if (flow < 11) return minDp;
        var s = this.calculateSetting(flow, pressure);
        return (1.8245614 * Math.pow(s, 3)) - (9.20300752 * Math.pow(s, 2)) + (16.72431078 * s) + 13;
    }
    
    function calculateDelta(setting) {
        return 1;
    }
    
    function canCalculateFlow(flow) {
        return flow >= minFlow && flow <= maxFlow ? true : false;
    }
    
    function canCalculateDp(pressure) {
        return pressure >= minDp && pressure <= maxDp ? true : false; 
    }
	
} //DN80HFFreseOptimaFlangeCalculator

function FreseOptimaFlangeCalculatorService(services) {        
    for (var i = 0; i < services.length; i++) {
        this.getCalculators()[services[i].getName()] = services[i];
    }
    
    this.getName = function() {
        return "Frese-OPTIMA-Flange";
    }
}
FreseOptimaFlangeCalculatorService.prototype = new AbstractCalculatorService();


function AbstractFresePVSCalculator(freseSCalculator, fresePVCalculator) {
    this.freseSCalculator = {};
    this.fresePVCalculator= {};
    
    this.calculateSetting = function(flow, pressure) {
        // Frese S always has a pressure set to 20
        pressure = 20;
        return this.freseSCalculator.calculateSetting(flow, pressure);
    }
    
    this.calculateDp = function(flow, pressure) {
        var fresePVFlow = this.fresePVCalculator.calculateSetting(flow, pressure);
        if (fresePVFlow == -1) return -1;

        return pressure + this.f2(flow, pressure) + this.f1(flow, pressure);
    }
    
    this.calculateCustomSetting = function(flow, pressure) {
        return this.fresePVCalculator.calculateSetting(flow, pressure);
    }
    
    this.calculateCustomDp = function(flow, pressure) {
        return this.freseSCalculator.getName();
    }
    
    this.f2 = function(flow, pressure) {
        return Math.pow(flow / (1000 * this.e4(flow, pressure)), 2) * 100;
    }
    
    this.f1 = function(flow, pressure) {
        // Frese S always has a pressure set to 20
        pressure = 20;
        return this.freseSCalculator.calculateDp(flow, pressure);
    }  
}

AbstractFresePVSCalculator.prototype.e4 = function(flow, pressure) {
    return 1;
}

function DN15530KPAFresePVSCalculator(freseSCalculator, fresePVCalculator) {
    this.freseSCalculator = freseSCalculator;
    this.fresePVCalculator = fresePVCalculator;
    
    this.getName = function() {
        return "DN15530KPA";
    }
       
    this.e4 = function(flow, pressure) {
        return 3.6;
    }         
}
DN15530KPAFresePVSCalculator.prototype = new AbstractFresePVSCalculator();

function DN152060KPAFresePVSCalculator(freseSCalculator, fresePVCalculator) {
    this.freseSCalculator = freseSCalculator;
    this.fresePVCalculator = fresePVCalculator;
    
    this.getName = function() {
        return "DN152060KPA";
    }
    
    this.e4 = function(flow, pressure) {
        return 4;
    }         
}
DN152060KPAFresePVSCalculator.prototype = new AbstractFresePVSCalculator();

function DN20530KPAFresePVSCalculator(freseSCalculator, fresePVCalculator) {
    this.freseSCalculator = freseSCalculator;
    this.fresePVCalculator = fresePVCalculator;
    
    this.getName = function() {
        return "DN20530KPA";
    }
    
    this.e4 = function(flow, pressure) {
        return 4;
    }         
}
DN20530KPAFresePVSCalculator.prototype = new AbstractFresePVSCalculator();

function DN202060KPAFresePVSCalculator(freseSCalculator, fresePVCalculator) {
    this.freseSCalculator = freseSCalculator;
    this.fresePVCalculator = fresePVCalculator;
    
    this.getName = function() {
        return "DN202060KPA";
    }
    
    this.e4 = function(flow, pressure) {
        return 11.4;
    }         
}
DN202060KPAFresePVSCalculator.prototype = new AbstractFresePVSCalculator();

function DN25530KPAFresePVSCalculator(freseSCalculator, fresePVCalculator) {
    this.freseSCalculator = freseSCalculator;
    this.fresePVCalculator = fresePVCalculator;
    
    this.getName = function() {
        return "DN25530KPA";
    }
    
    this.e4 = function(flow, pressure) {
        return 9.5;
    }         
}
DN25530KPAFresePVSCalculator.prototype = new AbstractFresePVSCalculator();

function DN252060KPAFresePVSCalculator(freseSCalculator, fresePVCalculator) {
    this.freseSCalculator = freseSCalculator;
    this.fresePVCalculator = fresePVCalculator;
    
    this.getName = function() {
        return "DN252060KPA";
    }
    
    this.e4 = function(flow, pressure) {
        return 17.9;
    }         
}
DN252060KPAFresePVSCalculator.prototype = new AbstractFresePVSCalculator();

function DN322080KPAFresePVSCalculator(freseSCalculator, fresePVCalculator) {
    this.freseSCalculator = freseSCalculator;
    this.fresePVCalculator = fresePVCalculator;
    
    this.getName = function() {
        return "DN322080KPA";
    }
    
    this.e4 = function(flow, pressure) {
        return 11.4;
    }         
}
DN322080KPAFresePVSCalculator.prototype = new AbstractFresePVSCalculator();

function DN402080KPAFresePVSCalculator(freseSCalculator, fresePVCalculator) {
    this.freseSCalculator = freseSCalculator;
    this.fresePVCalculator = fresePVCalculator;
    
    this.getName = function() {
        return "DN402080KPA";
    }
    
    this.e4 = function(flow, pressure) {
        return 16.4;
    }         
}
DN402080KPAFresePVSCalculator.prototype = new AbstractFresePVSCalculator();

function DN502080KPAFresePVSCalculator(freseSCalculator, fresePVCalculator) {
    this.freseSCalculator = freseSCalculator;
    this.fresePVCalculator = fresePVCalculator;
    
    this.getName = function() {
        return "DN502080KPA";
    }
    
    this.e4 = function(flow, pressure) {
        return 17.9;
    }         
}
DN502080KPAFresePVSCalculator.prototype = new AbstractFresePVSCalculator();

function FresePVSCalculatorService(services) {        
    for (var i = 0; i < services.length; i++) {
        this.getCalculators()[services[i].getName()] = services[i];
    }
    
    this.getName = function() {
        return "Frese-PVS";
    }
}

FresePVSCalculatorService.prototype = new AbstractCalculatorService();


function CalculatorService(services) {
	this.calculators = {};
    
	for (var i = 0; i < services.length; i++) {
		this.calculators[services[i].getName()] = services[i];
	}

   this.calculate = function(valve, valveSize, flow, pressure) {
      return this.calculators[valve.name].calculate(valveSize, flow, pressure);
	}
}

function DN15LPFreseSCalculator() {
    var minFlow = 25;
    var maxFlow = 804;
    var minDp = 8;
    var maxDp = 250;
    
    this.getName = function() {
        return "DN15LP";
    }
    
    this.calculateSetting = function(flow, pressure) {
        if (!canCalculateFlow(flow)) return -1;
        if (!canCalculateDp(pressure)) return -1;
        
        return (-1.416859E-16 * Math.pow(flow, 6) + 4.973587E-013 * Math.pow(flow, 5)
                - 6.302845E-010 * Math.pow(flow, 4) + 3.677696E-007 * Math.pow(flow, 3)
                - 0.0001030106 * Math.pow(flow, 2) + 0.02421216 * flow + 0.4984559);
    }

    
    this.calculateDp = function(flow, pressure) {
        if (!canCalculateFlow(flow)) return -1;
        var setting = this.calculateSetting(flow, pressure);
        if (setting == -1) return -1;
        
        if (flow < 50) return 8;
        return Math.pow(((flow / 1000) / calculateDelta(setting)), 2) * 100;
    }
    
    function calculateDelta(setting) {
        return (-0.0001914848 * Math.pow(setting, 5)) + (0.0053285439 * Math.pow(setting, 4)) - (0.054883786 * Math.pow(setting, 3)) + (0.2534175671 * Math.pow(setting, 2)) - (0.2481945056 * setting) + 0.1333828468;
    }
    
    function canCalculateFlow(flow) {
        return flow >= minFlow && flow <= maxFlow ? true : false;
    }
    
    function canCalculateDp(pressure) {
        return pressure >= minDp && pressure <= maxDp ? true : false; 
    }
}

function DN15HPFreseSCalculator() {
    var minFlow = 40;
    var maxFlow = 1100;
    var minDp = 16;
    var maxDp = 400;
    
    this.getName = function() {
        return "DN15HP";
    }
    
    this.calculateSetting = function(flow, pressure) {
        if (!canCalculateFlow(flow)) return -1;
        if (!canCalculateDp(pressure)) return -1;
        
        return (-8.370525E-18 * Math.pow(flow, 6)) + (4.595217E-14 * Math.pow(flow, 5)) - (8.196175E-011 * Math.pow(flow, 4)) + (6.465865E-008 * Math.pow(flow, 3)) - (2.581107E-005 * Math.pow(flow, 2)) + (0.01404484 * flow) + 0.4946178;
    }
    
    this.calculateDp = function(flow, pressure) {
        if (!canCalculateFlow(flow)) return -1;
        var setting = this.calculateSetting(flow, pressure);
        if (setting == -1) return -1;
        
        if (flow < 55) return 16;
        return Math.pow(((flow / 1000) / calculateDelta(setting)), 2) * 100;
    }
    
    function calculateDelta(setting) {
        return (-0.0001313737 * Math.pow(setting, 5)) + (0.0033025825 * Math.pow(setting, 4))- (0.030488192 * Math.pow(setting, 3)) + (0.130530682 * Math.pow(setting, 2)) - (0.0056293818 * setting) + 0.0026799239;
    }
    
    function canCalculateFlow(flow) {
        return flow >= minFlow && flow <= maxFlow ? true : false;
    }
    
    function canCalculateDp(pressure) {
        return pressure >= minDp && pressure <= maxDp ? true : false; 
    }
}

function DN20LPFreseSCalculator() {
    var minFlow = 41;
    var maxFlow = 1265;
    var minDp = 9;
    var maxDp = 250;
    
    this.getName = function() {
        return "DN20LP";
    }
    
    this.calculateSetting = function(flow, pressure) {
        if (!canCalculateFlow(flow)) return -1;
        if (!canCalculateDp(pressure)) return -1;
        
        return (1.282055E-017 * Math.pow(flow, 6)) - (3.215346E-014 * Math.pow(flow, 5)) + (1.758545E-011 * Math.pow(flow, 4)) + (1.342106E-008 * Math.pow(flow, 3)) - (1.618215E-005 * Math.pow(flow, 2)) + (0.01146886 * flow) + 0.6190952;
    }
    
    this.calculateDp = function(flow, pressure) {
        if (!canCalculateFlow(flow)) return -1;
        var setting = this.calculateSetting(flow, pressure);
        if (setting == -1) return -1;
        
        if (flow < 65) return 9;
        return Math.pow(((flow / 1000) / calculateDelta(setting)), 2) * 100;
    }
    
    function calculateDelta(setting) {
        return (-0.0002922512 * Math.pow(setting, 5)) + (0.0079441211 * Math.pow(setting, 4))- (0.081093891 * Math.pow(setting, 3)) + (0.3716534766 * Math.pow(setting, 2)) - (0.315676037 * setting) + 0.1555909698;
    }
    
    function canCalculateFlow(flow) {
        return flow >= minFlow && flow <= maxFlow ? true : false;
    }
    
    function canCalculateDp(pressure) {
        return pressure >= minDp && pressure <= maxDp ? true : false; 
    }
}

function DN20HPFreseSCalculator() {
    var minFlow = 66;
    var maxFlow = 1850;
    var minDp = 12;
    var maxDp = 400;
    
    this.getName = function() {
        return "DN20HP";
    }
    
    this.calculateSetting = function(flow, pressure) {
        if (!canCalculateFlow(flow)) return -1;
        if (!canCalculateDp(pressure)) return -1;
        
        return 4.558531E-19 * Math.pow(flow, 6)
            - 2.754187E-16 * Math.pow(flow, 5)
            - 0.000000000004851288 * Math.pow(flow, 4)
            + 0.00000001154931 * Math.pow(flow, 3)
            - 0.0000104237 * Math.pow(flow, 2)
            + 0.008926086 * flow
            + 0.5092975;
    }
    
    this.calculateDp = function(flow, pressure) {
        if (!canCalculateFlow(flow)) return -1;
        var setting = this.calculateSetting(flow, pressure);
        if (setting == -1) return -1;
        
        if (flow < 88) return 12;
        return Math.pow(((flow / 1000) / calculateDelta(setting)), 2) * 100;
    }
    
    function calculateDelta(setting) {
        return -0.0002702024 * Math.pow(setting, 5)
           + 0.0070152744 * Math.pow(setting, 4)
           - 0.0684282308 * Math.pow(setting, 3)
           + 0.303994227 * Math.pow(setting, 2)
           - 0.158105984 * setting
           + 0.1037020483;
    }
    
    function canCalculateFlow(flow) {
        return flow >= minFlow && flow <= maxFlow ? true : false;
    }
    
    function canCalculateDp(pressure) {
        return pressure >= minDp && pressure <= maxDp ? true : false; 
    }
}

function DN25LPFreseSCalculator() {
    var minFlow = 61;
    var maxFlow = 1663;
    var minDp = 9;
    var maxDp = 250;
    
    this.getName = function() {
        return "DN25LP";
    }
    
    this.calculateSetting = function(flow, pressure) {
        if (!canCalculateFlow(flow)) return -1;
        if (!canCalculateDp(pressure)) return -1;
        
        return (5.301715E-18 * Math.pow(flow, 6)) - (2.338106E-14 * Math.pow(flow, 5)) + (0.00000000003790071 * Math.pow(flow, 4)) - (0.00000002608803 * Math.pow(flow, 3)) + (0.00000547309 * Math.pow(flow, 2)) + (0.005587611 * flow) + 0.6916941;
    }
    
    this.calculateDp = function(flow, pressure) {
        if (!canCalculateFlow(flow)) return -1;
        var setting = this.calculateSetting(flow, pressure);
        if (setting == -1) return -1;
        
        if (flow < 72) return 9;
        return Math.pow(((flow / 1000) / calculateDelta(setting)), 2) * 100;
    }
    
    function calculateDelta(setting) {
        return (-0.0001250173 * Math.pow(setting, 5)) + (0.0038019997 * Math.pow(setting, 4)) - (0.0461407467 * Math.pow(setting, 3)) + (0.2422158614 * Math.pow(setting, 2)) + (0.0516844959 * setting) - 0.0473246139;

    }
    
    function canCalculateFlow(flow) {
        return flow >= minFlow && flow <= maxFlow ? true : false;
    }
    
    function canCalculateDp(pressure) {
        return pressure >= minDp && pressure <= maxDp ? true : false; 
    }
}

function DN25HPFreseSCalculator() {
    var minFlow = 89;
    var maxFlow = 2350;
    var minDp = 12;
    var maxDp = 400;
    
    this.getName = function() {
        return "DN25HP";
    }
    
    this.calculateSetting = function(flow, pressure) {
        if (!canCalculateFlow(flow)) return -1;
        if (!canCalculateDp(pressure)) return -1;

        return (5.707474E-19 * Math.pow(flow, 6)) - (3.439083E-15 * Math.pow(flow, 5)) + (7.387863E-012 * Math.pow(flow, 4)) - (6.100564E-009 * Math.pow(flow, 3)) + (3.601231E-007 * Math.pow(flow, 2)) + (0.004834756 * flow) + 0.6250701;
    }
    
    this.calculateDp = function(flow, pressure) {
        if (!canCalculateFlow(flow)) return -1;
        var setting = this.calculateSetting(flow, pressure);
        if (setting == -1) return -1;
        
        if (flow < 120) return 12;
        return Math.pow(((flow / 1000) / calculateDelta(setting)), 2) * 100;
    }
    
    function calculateDelta(setting) {
        return (-0.0001720525 * Math.pow(setting, 5)) + (0.0050695668 * Math.pow(setting, 4)) - (0.0602406174 * Math.pow(setting, 3)) + (0.3152398884 * Math.pow(setting, 2)) - (0.0451710556 * setting) + 0.0404546674;
    }
    
    function canCalculateFlow(flow) {
        return flow >= minFlow && flow <= maxFlow ? true : false;
    }
    
    function canCalculateDp(pressure) {
        return pressure >= minDp && pressure <= maxDp ? true : false; 
    }
}

function DN32FreseSCalculator() {
    var minFlow = 217;
    var maxFlow = 4800;
    var minDp = 14;
    var maxDp = 400;
    
    this.getName = function() {
        return "DN32";
    }
    
    this.calculateSetting = function(flow, pressure) {
        if (!canCalculateFlow(flow)) return -1;
        if (!canCalculateDp(pressure)) return -1;
        
        return (9.688725E-21 * Math.pow(flow, 6)) - (1.260236E-16 * Math.pow(flow, 5)) + (6.151922E-013 * Math.pow(flow, 4)) - (1.374114E-009 * Math.pow(flow, 3)) + (1.309833E-006 * Math.pow(flow, 2)) + (0.001458119 * flow) + 0.6703696;
    }
    
    this.calculateDp = function(flow, pressure) {
        if (!canCalculateFlow(flow)) return -1;
        var setting = this.calculateSetting(flow, pressure);
        if (setting == -1) return -1;
        
        if (flow < 300) return 14;
        return Math.pow(((flow / 1000) / calculateDelta(setting)), 2) * 100;
    }
    
    function calculateDelta(setting) {
        return (-0.0002207819 * Math.pow(setting, 5)) + (0.0048575488 * Math.pow(setting, 4)) - (0.042801013 * Math.pow(setting, 3)) + (0.1612668541 * Math.pow(setting, 2)) + (0.9429656517 * setting) - 0.4890993807;
    }
    
    function canCalculateFlow(flow) {
        return flow >= minFlow && flow <= maxFlow ? true : false;
    }
    
    function canCalculateDp(pressure) {
        return pressure >= minDp && pressure <= maxDp ? true : false; 
    }
}

function DN40FreseSCalculator() {
    var minFlow = 175;
    var maxFlow = 7450;
    var minDp = 15;
    var maxDp = 400;
    
    this.getName = function() {
        return "DN40";
    }
    
    this.calculateSetting = function(flow, pressure) {
        if (!canCalculateFlow(flow)) return -1;
        if (!canCalculateDp(pressure)) return -1;
        
        return (2.890134E-22 * Math.pow(flow, 6)) - (4.367951E-18 * Math.pow(flow, 5)) + (1.580866E-14 * Math.pow(flow, 4)) + (4.65504E-011 * Math.pow(flow, 3)) - (3.855707E-007 * Math.pow(flow, 2)) + (0.001792376 * flow) + 0.7499365;
    }
    
    this.calculateDp = function(flow, pressure) {
        if (!canCalculateFlow(flow)) return -1;
        var setting = this.calculateSetting(flow, pressure);
        if (setting == -1) return -1;
        
        if (flow < 275) return 15;
        return Math.pow(((flow / 1000) / calculateDelta(setting)), 2) * 100;
    }
    
    function calculateDelta(setting) {
        return (-0.0012675993 * Math.pow(setting, 5)) + (0.0341544632 * Math.pow(setting, 4)) - (0.344969967 * Math.pow(setting, 3)) + (1.5414329114 * Math.pow(setting, 2)) - (1.1127621642 * setting) + 0.3349824205;
    }
    
    function canCalculateFlow(flow) {
        return flow >= minFlow && flow <= maxFlow ? true : false;
    }
    
    function canCalculateDp(pressure) {
        return pressure >= minDp && pressure <= maxDp ? true : false; 
    }
}

function DN50FreseSCalculator() {
    var minFlow = 440;
    var maxFlow = 10350;
    var minDp = 17;
    var maxDp = 400;
    
    this.getName = function() {
        return "DN50";
    }
    
    this.calculateSetting = function(flow, pressure) {
        if (!canCalculateFlow(flow)) return -1;
        if (!canCalculateDp(pressure)) return -1;

        return (9.139688E-23 * Math.pow(flow, 6)) - (2.57758E-18 * Math.pow(flow, 5)) + (2.726717E-14 * Math.pow(flow, 4)) - (1.313964E-010 * Math.pow(flow, 3)) + (0.0000002746298 * Math.pow(flow, 2)) + (0.0006078528 * flow) + 0.721324;
    }
    
    this.calculateDp = function(flow, pressure) {
        if (!canCalculateFlow(flow)) return -1;
        var setting = this.calculateSetting(flow, pressure);
        if (setting == -1) return -1;
        
        if (flow < 670) return 17;
        return Math.pow(((flow / 1000) / calculateDelta(setting)), 2) * 100;
    }
    
    function calculateDelta(setting) {
        return (-0.000196373 * Math.pow(setting, 5)) + (0.0050851175 * Math.pow(setting, 4)) - (0.0540651414 * Math.pow(setting, 3)) + (0.1694730368 * Math.pow(setting, 2)) + (2.4082032907 * setting) - 1.4693911114;
    }
    
    function canCalculateFlow(flow) {
        return flow >= minFlow && flow <= maxFlow ? true : false;
    }
    
    function canCalculateDp(pressure) {
        return pressure >= minDp && pressure <= maxDp ? true : false; 
    }
}

function FreseSCalculatorService(services) {      
    for (var i = 0; i < services.length; i++) {
        this.getCalculators()[services[i].getName()] = services[i];
    }
    
    this.getName = function() {
        return "Frese-S";
    }
}

FreseSCalculatorService.prototype = new AbstractCalculatorService();


function DN1525FreseALPHACalculator() {
	var minFlow = 24; // 95% of 25
    var minDp = 8;
    var maxDp = 250;
    
    this.getName = function() {
        return "DN1525";
    }
    
    this.calculateCustomSetting = function(flow, pressure) {
        if (!canCalculateFlow(flow)) return -1;
        var length = StaticData.ALPHA.DN1525.smaller.length;
        for (var i = 0; i < length - 1; i++) {
            var minvalue = StaticData.ALPHA.DN1525.smaller[i].LH;
            var maxvalue = StaticData.ALPHA.DN1525.smaller[i+1].LH;
   			if (flow >= minvalue && flow <= maxvalue && StaticData.ALPHA.DN1525.greater[i].LH / flow - 1 < -0.05) {
               return StaticData.ALPHA.DN1525.smaller[i].LH;
   			}
            else if (flow >= minvalue && flow <= maxvalue) {
               return StaticData.ALPHA.DN1525.greater[i].LH;
            }
        }
        if (StaticData.ALPHA.DN1525.greater[i].LH / flow - 1 > -0.05) {
           return StaticData.ALPHA.DN1525.greater[length - 1].LH;
        }
        else {
           return -1;
        }
    }
    
    this.calculateCustomDp = function(flow, pressure) {
        if (!canCalculateFlow(flow)) return -1;
        var length = StaticData.ALPHA.DN1525.smaller.length;
        for (var i = 0; i < length - 1; i++) {
            var minvalue = StaticData.ALPHA.DN1525.smaller[i].LH;
            var maxvalue = StaticData.ALPHA.DN1525.smaller[i+1].LH;
			if (flow >= minvalue && flow <= maxvalue && StaticData.ALPHA.DN1525.greater[i].LH / flow - 1 < -0.05) {
				return StaticData.ALPHA.DN1525.smaller[i].MinDP;
			}
            else if (flow >= minvalue && flow <= maxvalue) {
                return StaticData.ALPHA.DN1525.greater[i].MinDP;
            }
        }
        if (StaticData.ALPHA.DN1525.greater[i].LH / flow - 1 > -0.05) {
           return StaticData.ALPHA.DN1525.greater[length - 1].MinDP;
        }
        else {
           return -1;
        }
    }
    
    function calculateDelta(setting) {
        return (-0.0001914848 * Math.pow(setting, 5)) + (0.0053285439 * Math.pow(setting, 4)) - (0.054883786 * Math.pow(setting, 3)) + (0.2534175671 * Math.pow(setting, 2)) - (0.2481945056 * setting) + 0.1333828468;
    }
    
    this.calculateDp = function(flow, pressure) {
        //Vare nr. HP
        if (!canCalculateFlow(flow)) return "N/A";
        var length = StaticData.ALPHA.DN1525.smaller.length;
        for (var i = 0; i < length - 1; i++) {
            var minvalue = StaticData.ALPHA.DN1525.smaller[i].LH;
            var maxvalue = StaticData.ALPHA.DN1525.smaller[i+1].LH;
   			if (flow >= minvalue && flow <= maxvalue && StaticData.ALPHA.DN1525.greater[i].LH / flow - 1 < -0.05) {
                return StaticData.ALPHA.DN1525.smaller[i].VareHP;
   			}
            else if (flow >= minvalue && flow <= maxvalue) {
                return StaticData.ALPHA.DN1525.greater[i].VareHP;
            }
        }
        return StaticData.ALPHA.DN1525.greater[length - 1].VareHP;
    }
    
    this.calculateSetting = function(flow, pressure) {
        //Vare nr. LP
        if (!canCalculateFlow(flow)) return "N/A";
        var length = StaticData.ALPHA.DN1525.smaller.length;
        for (var i = 0; i < length - 1; i++) {
            var minvalue = StaticData.ALPHA.DN1525.smaller[i].LH;
            var maxvalue = StaticData.ALPHA.DN1525.smaller[i+1].LH;
            if (flow >= minvalue && flow <= maxvalue && StaticData.ALPHA.DN1525.greater[i].LH / flow - 1 < -0.05) {
                return StaticData.ALPHA.DN1525.smaller[i].VareLP;
			}
            else if (flow >= minvalue && flow <= maxvalue) {
                return StaticData.ALPHA.DN1525.greater[i].VareLP;
            }
        }
        return StaticData.ALPHA.DN1525.greater[length - 1].VareLP;
    }
    
    function canCalculateFlow(flow) {
        return flow >= minFlow ? true : false;
    }
    
    function canCalculateDp(pressure) {
        return pressure >= minDp && pressure <= maxDp ? true : false; 
    }
}

function DN25L50FreseALPHACalculator() {
   var minFlow = 642; // 95% of 674
   var minDp = 8;
   var maxDp = 250;
   
   this.getName = function() {
      return "DN25L50";
   }
   
   this.calculateCustomSetting = function(flow, pressure) {
      if (!canCalculateFlow(flow)) return -1;
      var length = StaticData.ALPHA.DN25L50.smaller.length;
      for (var i = 0; i < length - 1; i++) {
         var minvalue = StaticData.ALPHA.DN25L50.smaller[i].LH;
         var maxvalue = StaticData.ALPHA.DN25L50.smaller[i+1].LH;
         if (flow >= minvalue && flow <= maxvalue && StaticData.ALPHA.DN25L50.greater[i].LH / flow - 1 < -0.05) {
            return StaticData.ALPHA.DN25L50.smaller[i].LH;
         }
         else if (flow >= minvalue && flow <= maxvalue) {
            return StaticData.ALPHA.DN25L50.greater[i].LH;
         }
      }
      if (StaticData.ALPHA.DN25L50.greater[i].LH / flow - 1 > -0.05) {
         return StaticData.ALPHA.DN25L50.greater[length - 1].LH;
      }
      else {
         return -1;
      }
   }
   
   this.calculateCustomDp = function(flow, pressure) {
      if (!canCalculateFlow(flow)) return -1;
      var length = StaticData.ALPHA.DN25L50.smaller.length;
      for (var i = 0; i < length - 1; i++) {
         var minvalue = StaticData.ALPHA.DN25L50.smaller[i].LH;
         var maxvalue = StaticData.ALPHA.DN25L50.smaller[i+1].LH;
         if (flow >= minvalue && flow <= maxvalue && StaticData.ALPHA.DN25L50.greater[i].LH / flow - 1 < -0.05) {
            return StaticData.ALPHA.DN25L50.smaller[i].MinDP;
         }
         else if (flow >= minvalue && flow <= maxvalue) {
            return StaticData.ALPHA.DN25L50.greater[i].MinDP;
         }
      }
      if (StaticData.ALPHA.DN25L50.greater[i].LH / flow - 1 > -0.05) {
         return StaticData.ALPHA.DN25L50.greater[length - 1].MinDP;
      }
      else {
         return -1;
      }
   }
   
   function calculateDelta(setting) {
      return (-0.0001914848 * Math.pow(setting, 5)) + (0.0053285439 * Math.pow(setting, 4)) - (0.054883786 * Math.pow(setting, 3)) + (0.2534175671 * Math.pow(setting, 2)) - (0.2481945056 * setting) + 0.1333828468;
   }
   
   this.calculateDp = function(flow, pressure) {
      //Vare nr. HP
      if (!canCalculateFlow(flow)) return "N/A";
      var length = StaticData.ALPHA.DN25L50.smaller.length;
      for (var i = 0; i < length - 1; i++) {
         var minvalue = StaticData.ALPHA.DN25L50.smaller[i].LH;
         var maxvalue = StaticData.ALPHA.DN25L50.smaller[i+1].LH;
         if (flow >= minvalue && flow <= maxvalue && StaticData.ALPHA.DN25L50.greater[i].LH / flow - 1 < -0.05) {
            return StaticData.ALPHA.DN25L50.smaller[i].VareHP;
         }
         else if (flow >= minvalue && flow <= maxvalue) {
            return StaticData.ALPHA.DN25L50.greater[i].VareHP;
         }
      }
      return StaticData.ALPHA.DN25L50.greater[length - 1].VareHP;
   }
   
   this.calculateSetting = function(flow, pressure) {
      //Vare nr. LP
      if (!canCalculateFlow(flow)) return "N/A";
      var length = StaticData.ALPHA.DN25L50.smaller.length;
      for (var i = 0; i < length - 1; i++) {
         var minvalue = StaticData.ALPHA.DN25L50.smaller[i].LH;
         var maxvalue = StaticData.ALPHA.DN25L50.smaller[i+1].LH;
         if (flow >= minvalue && flow <= maxvalue && StaticData.ALPHA.DN25L50.greater[i].LH / flow - 1 < -0.05) {
            return StaticData.ALPHA.DN25L50.smaller[i].VareLP;
         }
         else if (flow >= minvalue && flow <= maxvalue) {
            return StaticData.ALPHA.DN25L50.greater[i].VareLP;
         }
      }
      return StaticData.ALPHA.DN25L50.greater[length - 1].VareLP;
   }
   
   function canCalculateFlow(flow) {
      return flow >= minFlow ? true : false;
   }
   
   function canCalculateDp(pressure) {
      return pressure >= minDp && pressure <= maxDp ? true : false;
   }
}

function FreseALPHACalculatorService(services) {        
    for (var i = 0; i < services.length; i++) {
        this.getCalculators()[services[i].getName()] = services[i];
    }
    
    this.getName = function() {
        return "Frese-ALPHA";
    }
}

FreseALPHACalculatorService.prototype = new AbstractCalculatorService();

function DN10Low25FreseOptimaCompactCalculator() {
    var minFlow = 30;
    var maxFlow = 200;
    var minDp = 14;
    var maxDp = 400;
    
    this.getName = function() {
        return "DN10Low25";
    }
    
    this.calculateSetting = function(flow, pressure) {
        if (!canCalculateFlow(flow)) return -1;
        if (!canCalculateDp(pressure)) return -1;

        return (0.0206 * flow) - 0.1176;
    }
    
    this.calculateDp = function(flow, pressure) {
        if (!canCalculateFlow(flow)) return -1;
        
        if (flow < 30) return 14.3;
        return (-0.000003 * Math.pow(flow, 2)) + (0.0097 * flow) + 13.982;
    }
    
    function calculateDelta(setting) {
        return 1;
    }
    
    function canCalculateFlow(flow) {
        return flow >= minFlow && flow <= maxFlow ? true : false;
    }
    
    function canCalculateDp(pressure) {
        return pressure >= minDp && pressure <= maxDp ? true : false; 
    }
}

function DN10Low50FreseOptimaCompactCalculator() {
    var minFlow = 65;
    var maxFlow = 370;
    var minDp = 14;
    var maxDp = 400;
    
    this.getName = function() {
        return "DN10Low50";
    }
    
    this.calculateSetting = function(flow, pressure) {
        if (!canCalculateFlow(flow)) return -1;
        if (!canCalculateDp(pressure)) return -1;
        
        return (0.0111 * flow) - 0.1246;
    }
    
    this.calculateDp = function(flow, pressure) {
        if (!canCalculateFlow(flow)) return -1;
               
        if (flow < 66) return 14.6;
        return (-0.000003 * Math.pow(flow, 2)) + (0.0097 * flow) + 13.982
    }
    
    function calculateDelta(setting) {
        return 1;
    }
    
    function canCalculateFlow(flow) {
        return flow >= minFlow && flow <= maxFlow ? true : false;
    }
    
    function canCalculateDp(pressure) {
        return pressure >= minDp && pressure <= maxDp ? true : false; 
    }
}

function DN15Low25FreseOptimaCompactCalculator() {
    var minFlow = 30;
    var maxFlow = 200;
    var minDp = 14;
    var maxDp = 400;
    
    this.getName = function() {
        return "DN15Low25";
    }
    
    this.calculateSetting = function(flow, pressure) {
        if (!canCalculateFlow(flow)) return -1;
        if (!canCalculateDp(pressure)) return -1;
        
        return (0.0206 * flow) - 0.1176;
    }
    
    this.calculateDp = function(flow, pressure) {
        if (!canCalculateFlow(flow)) return -1;
        
        if (flow < 30) return 14.3;
        return (-0.000003 * Math.pow(flow, 2)) + (0.0097 * flow) + 13.982;
    }
    
    function calculateDelta(setting) {
        return 1;
    }
    
    function canCalculateFlow(flow) {
        return flow >= minFlow && flow <= maxFlow ? true : false;
    }
    
    function canCalculateDp(pressure) {
        return pressure >= minDp && pressure <= maxDp ? true : false; 
    }
}

function DN15Low50FreseOptimaCompactCalculator() {
    var minFlow = 65;
    var maxFlow = 370;
    var minDp = 14;
    var maxDp = 400;
    
    this.getName = function() {
        return "DN15Low50";
    }
    
    this.calculateSetting = function(flow, pressure) {
        if (!canCalculateFlow(flow)) return -1;
        if (!canCalculateDp(pressure)) return -1;
        
        return (0.0111 * flow) - 0.1246;
    }
    
    this.calculateDp = function(flow, pressure) {
        if (!canCalculateFlow(flow)) return -1;
        var setting = this.calculateSetting(flow, pressure);
        if (setting == -1) return -1;
        
        if (flow < 66) return 14.6;
        return (-0.000003 * Math.pow(flow, 2)) + (0.0097 * flow) + 13.982;
    }
    
    function calculateDelta(setting) {
        return 1;
    }
    
    function canCalculateFlow(flow) {
        return flow >= minFlow && flow <= maxFlow ? true : false;
    }
    
    function canCalculateDp(pressure) {
        return pressure >= minDp && pressure <= maxDp ? true : false; 
    }
}

function DN15High25FreseOptimaCompactCalculator() {
    var minFlow = 100;
    var maxFlow = 575;
    var minDp = 15;
    var maxDp = 400;
    
    this.getName = function() {
        return "DN15High25";
    }
    
    this.calculateSetting = function(flow, pressure) {
        if (!canCalculateFlow(flow)) return -1;
        if (!canCalculateDp(pressure)) return -1;
                
        return (0.0072 * flow) - 0.1158;
    }
    
    this.calculateDp = function(flow, pressure) {
        if (!canCalculateFlow(flow)) return -1;
        
        if (flow < 97) return 14.9;
        return (-0.000003 * Math.pow(flow, 2)) + (0.0097 * flow) + 13.982;
    }
    
    function calculateDelta(setting) {   
        return 1;
    }
    
    function canCalculateFlow(flow) {
        return flow >= minFlow && flow <= maxFlow ? true : false;
    }
    
    function canCalculateDp(pressure) {
        return pressure >= minDp && pressure <= maxDp ? true : false; 
    }
}

function DN20High25FreseOptimaCompactCalculator() {
    var minFlow = 100;
    var maxFlow = 575;
    var minDp = 15;
    var maxDp = 400;
    
    this.getName = function() {
        return "DN20High25";
    }
    
    this.calculateSetting = function(flow, pressure) {
        if (!canCalculateFlow(flow)) return -1;
        if (!canCalculateDp(pressure)) return -1;
                
        return (0.0072 * flow) - 0.1158;
    }
    
    this.calculateDp = function(flow, pressure) {
        if (!canCalculateFlow(flow)) return -1;
        
        if (flow < 97) return 14.9;
        return (-0.000003 * Math.pow(flow, 2)) + (0.0097 * flow) + 13.982;

    }
    
    function calculateDelta(setting) {
        return 1;
    }
    
    function canCalculateFlow(flow) {
        return flow >= minFlow && flow <= maxFlow ? true : false;
    }
    
    function canCalculateDp(pressure) {
        return pressure >= minDp && pressure <= maxDp ? true : false; 
    }
}

function DN20High40FreseOptimaCompactCalculator() {
    var minFlow = 160;
    var maxFlow = 990;
    var minDp = 15;
    var maxDp = 400;
    
    this.getName = function() {
        return "DN20High40";
    }
    
    this.calculateSetting = function(flow, pressure) {
        if (!canCalculateFlow(flow)) return -1;
        if (!canCalculateDp(pressure)) return -1;
                    
        return (0.0041 * flow) - 0.0554;
    }
    
    this.calculateDp = function(flow, pressure) {
        if (!canCalculateFlow(flow)) return -1;
        var setting = this.calculateSetting(flow, pressure);
        if (setting == -1) return -1;
        
        if (flow < 157) return 15.4;
        return (-0.000003 * Math.pow(flow, 2)) + (0.0097 * flow) + 13.982;
    }
    
    function calculateDelta(setting) {
        return 1;
    }
    
    function canCalculateFlow(flow) {
        return flow >= minFlow && flow <= maxFlow ? true : false;
    }
    
    function canCalculateDp(pressure) {
        return pressure >= minDp && pressure <= maxDp ? true : false; 
    }
}

function DN20High50FreseOptimaCompactCalculator() {
    var minFlow = 220;
    var maxFlow = 1330;
    var minDp = 16;
    var maxDp = 400;
    
    this.getName = function() {
        return "DN20High50";
    }
    
    this.calculateSetting = function(flow, pressure) {
        if (!canCalculateFlow(flow)) return -1;
        if (!canCalculateDp(pressure)) return -1;
        
        return (0.0031 * flow) - 0.0739;
    }
    
    this.calculateDp = function(flow, pressure) {
        if (!canCalculateFlow(flow)) return -1;
        
        if (flow < 219) return 16;
        return (-0.000003 * Math.pow(flow, 2)) + (0.0097 * flow) + 13.982;
    }
    
    function calculateDelta(setting) {
        return 1;
    }
    
    function canCalculateFlow(flow) {
        return flow >= minFlow && flow <= maxFlow ? true : false;
    }
    
    function canCalculateDp(pressure) {
        return pressure >= minDp && pressure <= maxDp ? true : false; 
    }
}

function DN2555FreseOptimaCompactCalculator() {
    var minFlow = 600;
    var maxFlow = 3609;
    var minDp = 17;
    var maxDp = 400;
    
    this.getName = function() {
        return "DN2555";
    }
    
    this.calculateSetting = function(flow, pressure) {
        if (!canCalculateFlow(flow)) return -1;
        if (!canCalculateDp(pressure)) return -1;
        
        return (0.00113 * flow) - 0.077966;
    }
    
    this.calculateDp = function(flow, pressure) {
        if (!canCalculateFlow(flow)) return -1;
        var s = this.calculateSetting(flow, pressure);
        return (0.1565 * Math.pow(s, 3)) - (0.4391 * Math.pow(s, 2)) + (0.7641 * s) + 16.949; 
    }
    
    function calculateDelta(setting) {
        return 1;
    }
    
    function canCalculateFlow(flow) {
        return flow >= minFlow && flow <= maxFlow ? true : false;
    }
    
    function canCalculateDp(pressure) {
        return pressure >= minDp && pressure <= maxDp ? true : false; 
    }
}

function DN3255FreseOptimaCompactCalculator() {
    var minFlow = 550;
    var maxFlow = 4001;
    var minDp = 18;
    var maxDp = 400;
    
    this.getName = function() {
        return "DN3255";
    }
    
    this.calculateSetting = function(flow, pressure) {
        if (!canCalculateFlow(flow)) return -1;
        if (!canCalculateDp(pressure)) return -1;
        
        return (0.000985 * flow) + 0.058128;
    }
    
    this.calculateDp = function(flow, pressure) {
        if (!canCalculateFlow(flow)) return -1;
        var s = this.calculateSetting(flow, pressure);
        return (0.319164 * Math.pow(s, 3)) - (1.007683 * Math.pow(s, 2)) + (1.622683 * s) + 17.20149;
    }
    
    function calculateDelta(setting) {
        return 1;
    }
    
    function canCalculateFlow(flow) {
        return flow >= minFlow && flow <= maxFlow ? true : false;
    }
    
    function canCalculateDp(pressure) {
        return pressure >= minDp && pressure <= maxDp ? true : false; 
    }
}


function FreseOptimaCompactCalculatorService(services) {        
    for (var i = 0; i < services.length; i++) {
        this.getCalculators()[services[i].getName()] = services[i];
    }
    
    this.getName = function() {
        return "Frese-OPTIMA-Compact";
    }
}
FreseOptimaCompactCalculatorService.prototype = new AbstractCalculatorService();


