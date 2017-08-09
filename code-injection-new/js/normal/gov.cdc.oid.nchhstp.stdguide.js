
// JavaScript Document
$(document).bind("mobileinit", function(){
  //apply overrides here
      $.mobile.page.prototype.options.addBackBtn = false;
      $.mobile.page.prototype.options.domCache = true;
      $.mobile.defaultPageTransition = "none";
  

});

	








        
        function onLoad() {

            document.addEventListener("deviceready", onDeviceReady, false);
        }
        
        // Cordova is loaded and it is now safe to make calls Cordova methods
        function onDeviceReady() {
            
            trackMainMenuPageView();

            var lastVersionKey = 'lastEulaAgreeVersion';
            var lastVersionVal;
            var currVersion = appData.version + "." + appData.build;
            if(typeof(window.localStorage) != 'undefined'){
                lastVersionVal = window.localStorage.getItem(lastVersionKey);
            }
            else {
                throw "window.localStorage, not defined";
            }
            
            if (currVersion != lastVersionVal) {            	
                window.localStorage.setItem(lastVersionKey, currVersion);
                $.mobile.changePage( "page/eula.html");
            }
            
        }
    









                $('#c23-t').on('pageshow', function (event, ui) {
                    document.addEventListener("deviceready", function(){
                    trackConditionQuickPickDxTxPageView(23);
                },true);
            });

        








                $('#c40-t').on('pageshow', function (event, ui) {
                    document.addEventListener("deviceready", function(){
                    trackConditionQuickPickDxTxPageView(40);
                },true);
            });

        








                $('#c39-r').on('pageshow', function (event, ui) {
                    document.addEventListener("deviceready", function(){
                    trackConditionQuickPickTreatmentPageView(39);
                },true);
            });

        














                $('#c21-t').on('pageshow', function (event, ui) {
                    document.addEventListener("deviceready", function(){
                    trackConditionQuickPickDxTxPageView(21);
                },true);
            });

        








                $('#c13-t').on('pageshow', function (event, ui) {
                    document.addEventListener("deviceready", function(){
                    trackConditionQuickPickDxTxPageView(13);
                },true);
            });

        








                $('#c18-r').on('pageshow', function (event, ui) {
                    document.addEventListener("deviceready", function(){
                    trackConditionQuickPickTreatmentPageView(18);
                },true);
            });

        








                $('#c21-r').on('pageshow', function (event, ui) {
                    document.addEventListener("deviceready", function(){
                    trackConditionQuickPickTreatmentPageView(21);
                },true);
            });

        








                $('#c24-t').on('pageshow', function (event, ui) {
                    document.addEventListener("deviceready", function(){
                    trackConditionQuickPickDxTxPageView(24);
                },true);
            });

        








                $('#c9-r').on('pageshow', function (event, ui) {
                    document.addEventListener("deviceready", function(){
                    trackConditionQuickPickTreatmentPageView(9);
                },true);
            });

        








                $('#c43-t').on('pageshow', function (event, ui) {
                    document.addEventListener("deviceready", function(){
                    trackConditionQuickPickDxTxPageView(43);
                },true);
            });

        














                $('#c40-r').on('pageshow', function (event, ui) {
                    document.addEventListener("deviceready", function(){
                    trackConditionQuickPickTreatmentPageView(40);
                },true);
            });

        








                $('#c55-r').on('pageshow', function (event, ui) {
                    document.addEventListener("deviceready", function(){
                    trackConditionQuickPickTreatmentPageView(55);
                },true);
            });

        








                $('#c2-r').on('pageshow', function (event, ui) {
                    document.addEventListener("deviceready", function(){
                    trackConditionQuickPickTreatmentPageView(2);
                },true);
            });

        








                $('#c48-t').on('pageshow', function (event, ui) {
                    document.addEventListener("deviceready", function(){
                    trackConditionQuickPickDxTxPageView(48);
                },true);
            });

        








                $('#c11-r').on('pageshow', function (event, ui) {
                    document.addEventListener("deviceready", function(){
                    trackConditionQuickPickTreatmentPageView(11);
                },true);
            });

        








                $('#c30-r').on('pageshow', function (event, ui) {
                    document.addEventListener("deviceready", function(){
                    trackConditionQuickPickTreatmentPageView(30);
                },true);
            });

        








                $('#c19-r').on('pageshow', function (event, ui) {
                    document.addEventListener("deviceready", function(){
                    trackConditionQuickPickTreatmentPageView(19);
                },true);
            });

        








                $('#c50-r').on('pageshow', function (event, ui) {
                    document.addEventListener("deviceready", function(){
                    trackConditionQuickPickTreatmentPageView(50);
                },true);
            });

        








                $('#c53-t').on('pageshow', function (event, ui) {
                    document.addEventListener("deviceready", function(){
                    trackConditionQuickPickDxTxPageView(53);
                },true);
            });

        








                $('#c7-r').on('pageshow', function (event, ui) {
                    document.addEventListener("deviceready", function(){
                    trackConditionQuickPickTreatmentPageView(7);
                },true);
            });

        








                $('#c55-t').on('pageshow', function (event, ui) {
                    document.addEventListener("deviceready", function(){
                    trackConditionQuickPickDxTxPageView(55);
                },true);
            });

        








                $('#c31-r').on('pageshow', function (event, ui) {
                    document.addEventListener("deviceready", function(){
                    trackConditionQuickPickTreatmentPageView(31);
                },true);
            });

        








                $('#c49-t').on('pageshow', function (event, ui) {
                    document.addEventListener("deviceready", function(){
                    trackConditionQuickPickDxTxPageView(49);
                },true);
            });

        








                $('#c35-t').on('pageshow', function (event, ui) {
                    document.addEventListener("deviceready", function(){
                    trackConditionQuickPickDxTxPageView(35);
                },true);
            });

        








                $('#c51-r').on('pageshow', function (event, ui) {
                    document.addEventListener("deviceready", function(){
                    trackConditionQuickPickTreatmentPageView(51);
                },true);
            });

        








                $('#c56-r').on('pageshow', function (event, ui) {
                    document.addEventListener("deviceready", function(){
                    trackConditionQuickPickTreatmentPageView(56);
                },true);
            });

        








                $('#c22-t').on('pageshow', function (event, ui) {
                    document.addEventListener("deviceready", function(){
                    trackConditionQuickPickDxTxPageView(22);
                },true);
            });

        








                $('#c11-t').on('pageshow', function (event, ui) {
                    document.addEventListener("deviceready", function(){
                    trackConditionQuickPickDxTxPageView(11);
                },true);
            });

        








                $('#c36-t').on('pageshow', function (event, ui) {
                    document.addEventListener("deviceready", function(){
                    trackConditionQuickPickDxTxPageView(36);
                },true);
            });

        








                $('#c56-t').on('pageshow', function (event, ui) {
                    document.addEventListener("deviceready", function(){
                    trackConditionQuickPickDxTxPageView(56);
                },true);
            });

        








                $('#c12-r').on('pageshow', function (event, ui) {
                    document.addEventListener("deviceready", function(){
                    trackConditionQuickPickTreatmentPageView(12);
                },true);
            });

        














                $('#c45-r').on('pageshow', function (event, ui) {
                    document.addEventListener("deviceready", function(){
                    trackConditionQuickPickTreatmentPageView(45);
                },true);
            });

        








                $('#c16-t').on('pageshow', function (event, ui) {
                    document.addEventListener("deviceready", function(){
                    trackConditionQuickPickDxTxPageView(16);
                },true);
            });

        








                $('#c52-r').on('pageshow', function (event, ui) {
                    document.addEventListener("deviceready", function(){
                    trackConditionQuickPickTreatmentPageView(52);
                },true);
            });

        








                $('#c28-t').on('pageshow', function (event, ui) {
                    document.addEventListener("deviceready", function(){
                    trackConditionQuickPickDxTxPageView(28);
                },true);
            });

        








                $('#c4-r').on('pageshow', function (event, ui) {
                    document.addEventListener("deviceready", function(){
                    trackConditionQuickPickTreatmentPageView(4);
                },true);
            });

        








                $('#c50-t').on('pageshow', function (event, ui) {
                    document.addEventListener("deviceready", function(){
                    trackConditionQuickPickDxTxPageView(50);
                },true);
            });

        








                $('#c5-t').on('pageshow', function (event, ui) {
                    document.addEventListener("deviceready", function(){
                    trackConditionQuickPickDxTxPageView(5);
                },true);
            });

        








                $('#c42-r').on('pageshow', function (event, ui) {
                    document.addEventListener("deviceready", function(){
                    trackConditionQuickPickTreatmentPageView(42);
                },true);
            });

        








                $('#c33-t').on('pageshow', function (event, ui) {
                    document.addEventListener("deviceready", function(){
                    trackConditionQuickPickDxTxPageView(33);
                },true);
            });

        








                $('#c24-r').on('pageshow', function (event, ui) {
                    document.addEventListener("deviceready", function(){
                    trackConditionQuickPickTreatmentPageView(24);
                },true);
            });

        








                $('#c9-t').on('pageshow', function (event, ui) {
                    document.addEventListener("deviceready", function(){
                    trackConditionQuickPickDxTxPageView(9);
                },true);
            });

        








                $('#c1-r').on('pageshow', function (event, ui) {
                    document.addEventListener("deviceready", function(){
                    trackConditionQuickPickTreatmentPageView(1);
                },true);
            });

        








                $('#c38-r').on('pageshow', function (event, ui) {
                    document.addEventListener("deviceready", function(){
                    trackConditionQuickPickTreatmentPageView(38);
                },true);
            });

        








                $('#c27-t').on('pageshow', function (event, ui) {
                    document.addEventListener("deviceready", function(){
                    trackConditionQuickPickDxTxPageView(27);
                },true);
            });

        








                $('#c4-t').on('pageshow', function (event, ui) {
                    document.addEventListener("deviceready", function(){
                    trackConditionQuickPickDxTxPageView(4);
                },true);
            });

        








                $('#c57-t').on('pageshow', function (event, ui) {
                    document.addEventListener("deviceready", function(){
                    trackConditionQuickPickDxTxPageView(57);
                },true);
            });

        








                $('#c37-t').on('pageshow', function (event, ui) {
                    document.addEventListener("deviceready", function(){
                    trackConditionQuickPickDxTxPageView(37);
                },true);
            });

        








                $('#c2-t').on('pageshow', function (event, ui) {
                    document.addEventListener("deviceready", function(){
                    trackConditionQuickPickDxTxPageView(2);
                },true);
            });

        








                $('#c18-t').on('pageshow', function (event, ui) {
                    document.addEventListener("deviceready", function(){
                    trackConditionQuickPickDxTxPageView(18);
                },true);
            });

        








                $('#c20-t').on('pageshow', function (event, ui) {
                    document.addEventListener("deviceready", function(){
                    trackConditionQuickPickDxTxPageView(20);
                },true);
            });

        








                $('#c10-t').on('pageshow', function (event, ui) {
                    document.addEventListener("deviceready", function(){
                    trackConditionQuickPickDxTxPageView(10);
                },true);
            });

        








                $('#c52-t').on('pageshow', function (event, ui) {
                    document.addEventListener("deviceready", function(){
                    trackConditionQuickPickDxTxPageView(52);
                },true);
            });

        














                $('#c47-t').on('pageshow', function (event, ui) {
                    document.addEventListener("deviceready", function(){
                    trackConditionQuickPickDxTxPageView(47);
                },true);
            });

        














                $('#c38-t').on('pageshow', function (event, ui) {
                    document.addEventListener("deviceready", function(){
                    trackConditionQuickPickDxTxPageView(38);
                },true);
            });

        








                $('#c32-t').on('pageshow', function (event, ui) {
                    document.addEventListener("deviceready", function(){
                    trackConditionQuickPickDxTxPageView(32);
                },true);
            });

        








                $('#c53-r').on('pageshow', function (event, ui) {
                    document.addEventListener("deviceready", function(){
                    trackConditionQuickPickTreatmentPageView(53);
                },true);
            });

        








                $('#c37-r').on('pageshow', function (event, ui) {
                    document.addEventListener("deviceready", function(){
                    trackConditionQuickPickTreatmentPageView(37);
                },true);
            });

        








                $('#c42-t').on('pageshow', function (event, ui) {
                    document.addEventListener("deviceready", function(){
                    trackConditionQuickPickDxTxPageView(42);
                },true);
            });

        








                $('#c47-r').on('pageshow', function (event, ui) {
                    document.addEventListener("deviceready", function(){
                    trackConditionQuickPickTreatmentPageView(47);
                },true);
            });

        








                $('#c22-r').on('pageshow', function (event, ui) {
                    document.addEventListener("deviceready", function(){
                    trackConditionQuickPickTreatmentPageView(22);
                },true);
            });

        








                $('#c17-t').on('pageshow', function (event, ui) {
                    document.addEventListener("deviceready", function(){
                    trackConditionQuickPickDxTxPageView(17);
                },true);
            });

        














                $('#c48-r').on('pageshow', function (event, ui) {
                    document.addEventListener("deviceready", function(){
                    trackConditionQuickPickTreatmentPageView(48);
                },true);
            });

        








                $('#c6-r').on('pageshow', function (event, ui) {
                    document.addEventListener("deviceready", function(){
                    trackConditionQuickPickTreatmentPageView(6);
                },true);
            });

        














                $('#c10-r').on('pageshow', function (event, ui) {
                    document.addEventListener("deviceready", function(){
                    trackConditionQuickPickTreatmentPageView(10);
                },true);
            });

        








                $('#c19-t').on('pageshow', function (event, ui) {
                    document.addEventListener("deviceready", function(){
                    trackConditionQuickPickDxTxPageView(19);
                },true);
            });

        








                $('#c1-t').on('pageshow', function (event, ui) {
                    document.addEventListener("deviceready", function(){
                    trackConditionQuickPickDxTxPageView(1);
                },true);
            });

        








                $('#c6-t').on('pageshow', function (event, ui) {
                    document.addEventListener("deviceready", function(){
                    trackConditionQuickPickDxTxPageView(6);
                },true);
            });

        








                $('#c16-r').on('pageshow', function (event, ui) {
                    document.addEventListener("deviceready", function(){
                    trackConditionQuickPickTreatmentPageView(16);
                },true);
            });

        








                $('#c51-t').on('pageshow', function (event, ui) {
                    document.addEventListener("deviceready", function(){
                    trackConditionQuickPickDxTxPageView(51);
                },true);
            });

        














                $('#c30-t').on('pageshow', function (event, ui) {
                    document.addEventListener("deviceready", function(){
                    trackConditionQuickPickDxTxPageView(30);
                },true);
            });

        








                $('#c17-r').on('pageshow', function (event, ui) {
                    document.addEventListener("deviceready", function(){
                    trackConditionQuickPickTreatmentPageView(17);
                },true);
            });

        








                $('#c32-r').on('pageshow', function (event, ui) {
                    document.addEventListener("deviceready", function(){
                    trackConditionQuickPickTreatmentPageView(32);
                },true);
            });

        








                $('#c31-t').on('pageshow', function (event, ui) {
                    document.addEventListener("deviceready", function(){
                    trackConditionQuickPickDxTxPageView(31);
                },true);
            });

        








                $('#c57-r').on('pageshow', function (event, ui) {
                    document.addEventListener("deviceready", function(){
                    trackConditionQuickPickTreatmentPageView(57);
                },true);
            });

        








                $('#c7-t').on('pageshow', function (event, ui) {
                    document.addEventListener("deviceready", function(){
                    trackConditionQuickPickDxTxPageView(7);
                },true);
            });

        














                $('#c34-t').on('pageshow', function (event, ui) {
                    document.addEventListener("deviceready", function(){
                    trackConditionQuickPickDxTxPageView(34);
                },true);
            });

        








                $('#c39-t').on('pageshow', function (event, ui) {
                    document.addEventListener("deviceready", function(){
                    trackConditionQuickPickDxTxPageView(39);
                },true);
            });

        








                $('#c45-t').on('pageshow', function (event, ui) {
                    document.addEventListener("deviceready", function(){
                    trackConditionQuickPickDxTxPageView(45);
                },true);
            });

        








                $('#c12-t').on('pageshow', function (event, ui) {
                    document.addEventListener("deviceready", function(){
                    trackConditionQuickPickDxTxPageView(12);
                },true);
            });

        




















                $('#c20-r').on('pageshow', function (event, ui) {
                    document.addEventListener("deviceready", function(){
                    trackConditionQuickPickTreatmentPageView(20);
                },true);
            });

        








                $('#c13-r').on('pageshow', function (event, ui) {
                    document.addEventListener("deviceready", function(){
                    trackConditionQuickPickTreatmentPageView(13);
                },true);
            });

        








                $('#c23-r').on('pageshow', function (event, ui) {
                    document.addEventListener("deviceready", function(){
                    trackConditionQuickPickTreatmentPageView(23);
                },true);
            });

        








                $('#c26-t').on('pageshow', function (event, ui) {
                    document.addEventListener("deviceready", function(){
                    trackConditionQuickPickDxTxPageView(26);
                },true);
            });

        








                $('#c49-r').on('pageshow', function (event, ui) {
                    document.addEventListener("deviceready", function(){
                    trackConditionQuickPickTreatmentPageView(49);
                },true);
            });

        







		$('#about').on('pageshow', function (event, ui) {
        	document.addEventListener("deviceready", function(){
        	document.getElementById("appVersionNumber").innerHTML = appData.version;
        	document.getElementById("appBuildNumber").innerHTML = appData.build;
        	document.getElementById("appBuildDate").innerHTML = appData.buildDate;
        	document.getElementById("stdDataDate").innerHTML = appData.stdDataDate;
        	trackAboutUsPageView();
            },true);
        });
    







                $('#eula').on('pageshow', function (event, ui) {
                    document.addEventListener("deviceready", function(){
		            trackEulaPageView();
                    },true);
                });
		

        function onClick() {
            history.back();
            //e.preventDefault();
            //navigator.app.backHistory();
            //history.go(-1);
        }
    







                $('#PDF').on('pageshow', function (event, ui) {
                    document.addEventListener("deviceready", function(){
		            trackHistoryPdfPageView();
                    },true);
                });
		












        
        function onLoad() {
            document.addEventListener("deviceready", onDeviceReady, false);
        }
        
        // Cordova is loaded and it is now safe to make calls Cordova methods
        function onDeviceReady() {
            // Now safe to use the Cordova API
            console.log("Cordova ready, Taking a Sexual History page loaded.");
            trackHistoryPdfPageView();
        }
        








                $('#r2').on('pageshow', function (event, ui) {
                    document.addEventListener("deviceready", function(){
                    trackReferencesPageView(2);
                },true);
            });

            








                $('#r11').on('pageshow', function (event, ui) {
                    document.addEventListener("deviceready", function(){
                    trackReferencesPageView(11);
                },true);
            });

            








                $('#r8').on('pageshow', function (event, ui) {
                    document.addEventListener("deviceready", function(){
                    trackReferencesPageView(8);
                },true);
            });

            








                $('#r3').on('pageshow', function (event, ui) {
                    document.addEventListener("deviceready", function(){
                    trackReferencesPageView(3);
                },true);
            });

            








                $('#r5').on('pageshow', function (event, ui) {
                    document.addEventListener("deviceready", function(){
                    trackReferencesPageView(5);
                },true);
            });

            








                $('#r1').on('pageshow', function (event, ui) {
                    document.addEventListener("deviceready", function(){
                    trackReferencesPageView(1);
                },true);
            });

            








                $('#r7').on('pageshow', function (event, ui) {
                    document.addEventListener("deviceready", function(){
                    trackReferencesPageView(7);
                },true);
            });

            








                $('#r9').on('pageshow', function (event, ui) {
                    document.addEventListener("deviceready", function(){
                    trackReferencesPageView(9);
                },true);
            });

            








                $('#r10').on('pageshow', function (event, ui) {
                    document.addEventListener("deviceready", function(){
                    trackReferencesPageView(10);
                },true);
            });

            














                $('#r4').on('pageshow', function (event, ui) {
                    document.addEventListener("deviceready", function(){
                    trackReferencesPageView(4);
                },true);
            });

            








                $('#r6').on('pageshow', function (event, ui) {
                    document.addEventListener("deviceready", function(){
                    trackReferencesPageView(6);
                },true);
            });

            







                $('#g256').on('pageshow', function (event, ui) {
                    document.addEventListener("deviceready", function(){
                        trackFullGuidelinesPageView('256');
                                                },true);
                });
            







                $('#g289').on('pageshow', function (event, ui) {
                    document.addEventListener("deviceready", function(){
                        trackFullGuidelinesPageView('289');
                                                },true);
                });
            







                $('#g121').on('pageshow', function (event, ui) {
                    document.addEventListener("deviceready", function(){
                        trackFullGuidelinesPageView('121');
                                                },true);
                });
            







                $('#g420').on('pageshow', function (event, ui) {
                    document.addEventListener("deviceready", function(){
                        trackFullGuidelinesPageView('420');
                                                },true);
                });
            







                $('#g28').on('pageshow', function (event, ui) {
                    document.addEventListener("deviceready", function(){
                        trackFullGuidelinesPageView('28');
                                                },true);
                });
            













                $('#g281').on('pageshow', function (event, ui) {
                    document.addEventListener("deviceready", function(){
                        trackFullGuidelinesPageView('281');
                                                },true);
                });
            







                $('#g314').on('pageshow', function (event, ui) {
                    document.addEventListener("deviceready", function(){
                        trackFullGuidelinesPageView('314');
                                                },true);
                });
            







                $('#g2').on('pageshow', function (event, ui) {
                    document.addEventListener("deviceready", function(){
                        trackFullGuidelinesPageView('2');
                                                },true);
                });
            







                $('#g387').on('pageshow', function (event, ui) {
                    document.addEventListener("deviceready", function(){
                        trackFullGuidelinesPageView('387');
                                                },true);
                });
            







                $('#g338').on('pageshow', function (event, ui) {
                    document.addEventListener("deviceready", function(){
                        trackFullGuidelinesPageView('338');
                                                },true);
                });
            







                $('#g330').on('pageshow', function (event, ui) {
                    document.addEventListener("deviceready", function(){
                        trackFullGuidelinesPageView('330');
                                                },true);
                });
            







                $('#g408').on('pageshow', function (event, ui) {
                    document.addEventListener("deviceready", function(){
                        trackFullGuidelinesPageView('408');
                                                },true);
                });
            







                $('#g24').on('pageshow', function (event, ui) {
                    document.addEventListener("deviceready", function(){
                        trackFullGuidelinesPageView('24');
                                                },true);
                });
            













                $('#g62').on('pageshow', function (event, ui) {
                    document.addEventListener("deviceready", function(){
                        trackFullGuidelinesPageView('62');
                                                },true);
                });
            







                $('#g241').on('pageshow', function (event, ui) {
                    document.addEventListener("deviceready", function(){
                        trackFullGuidelinesPageView('241');
                                                },true);
                });
            







                $('#g102').on('pageshow', function (event, ui) {
                    document.addEventListener("deviceready", function(){
                        trackFullGuidelinesPageView('102');
                                                },true);
                });
            







                $('#g17').on('pageshow', function (event, ui) {
                    document.addEventListener("deviceready", function(){
                        trackFullGuidelinesPageView('17');
                                                },true);
                });
            







                $('#g187').on('pageshow', function (event, ui) {
                    document.addEventListener("deviceready", function(){
                        trackFullGuidelinesPageView('187');
                                                },true);
                });
            







                $('#g113').on('pageshow', function (event, ui) {
                    document.addEventListener("deviceready", function(){
                        trackFullGuidelinesPageView('113');
                                                },true);
                });
            







                $('#g247').on('pageshow', function (event, ui) {
                    document.addEventListener("deviceready", function(){
                        trackFullGuidelinesPageView('247');
                                                },true);
                });
            













                $('#g328').on('pageshow', function (event, ui) {
                    document.addEventListener("deviceready", function(){
                        trackFullGuidelinesPageView('328');
                                                },true);
                });
            













                $('#g133').on('pageshow', function (event, ui) {
                    document.addEventListener("deviceready", function(){
                        trackFullGuidelinesPageView('133');
                                                },true);
                });
            







                $('#g174').on('pageshow', function (event, ui) {
                    document.addEventListener("deviceready", function(){
                        trackFullGuidelinesPageView('174');
                                                },true);
                });
            







                $('#g72').on('pageshow', function (event, ui) {
                    document.addEventListener("deviceready", function(){
                        trackFullGuidelinesPageView('72');
                                                },true);
                });
            













                $('#g31').on('pageshow', function (event, ui) {
                    document.addEventListener("deviceready", function(){
                        trackFullGuidelinesPageView('31');
                                                },true);
                });
            







                $('#g346').on('pageshow', function (event, ui) {
                    document.addEventListener("deviceready", function(){
                        trackFullGuidelinesPageView('346');
                                                },true);
                });
            







                $('#g108').on('pageshow', function (event, ui) {
                    document.addEventListener("deviceready", function(){
                        trackFullGuidelinesPageView('108');
                                                },true);
                });
            







                $('#g291').on('pageshow', function (event, ui) {
                    document.addEventListener("deviceready", function(){
                        trackFullGuidelinesPageView('291');
                                                },true);
                });
            







                $('#g73').on('pageshow', function (event, ui) {
                    document.addEventListener("deviceready", function(){
                        trackFullGuidelinesPageView('73');
                                                },true);
                });
            







                $('#g232').on('pageshow', function (event, ui) {
                    document.addEventListener("deviceready", function(){
                        trackFullGuidelinesPageView('232');
                                                },true);
                });
            







                $('#g45').on('pageshow', function (event, ui) {
                    document.addEventListener("deviceready", function(){
                        trackFullGuidelinesPageView('45');
                                                },true);
                });
            







                $('#g401').on('pageshow', function (event, ui) {
                    document.addEventListener("deviceready", function(){
                        trackFullGuidelinesPageView('401');
                                                },true);
                });
            







                $('#g306').on('pageshow', function (event, ui) {
                    document.addEventListener("deviceready", function(){
                        trackFullGuidelinesPageView('306');
                                                },true);
                });
            







                $('#g266').on('pageshow', function (event, ui) {
                    document.addEventListener("deviceready", function(){
                        trackFullGuidelinesPageView('266');
                                                },true);
                });
            







                $('#g159').on('pageshow', function (event, ui) {
                    document.addEventListener("deviceready", function(){
                        trackFullGuidelinesPageView('159');
                                                },true);
                });
            







                $('#g148').on('pageshow', function (event, ui) {
                    document.addEventListener("deviceready", function(){
                        trackFullGuidelinesPageView('148');
                                                },true);
                });
            







                $('#g298').on('pageshow', function (event, ui) {
                    document.addEventListener("deviceready", function(){
                        trackFullGuidelinesPageView('298');
                                                },true);
                });
            







                $('#g269').on('pageshow', function (event, ui) {
                    document.addEventListener("deviceready", function(){
                        trackFullGuidelinesPageView('269');
                                                },true);
                });
            







                $('#g39').on('pageshow', function (event, ui) {
                    document.addEventListener("deviceready", function(){
                        trackFullGuidelinesPageView('39');
                                                },true);
                });
            













                $('#g164').on('pageshow', function (event, ui) {
                    document.addEventListener("deviceready", function(){
                        trackFullGuidelinesPageView('164');
                                                },true);
                });
            







                $('#g179').on('pageshow', function (event, ui) {
                    document.addEventListener("deviceready", function(){
                        trackFullGuidelinesPageView('179');
                                                },true);
                });
            













                $('#g343').on('pageshow', function (event, ui) {
                    document.addEventListener("deviceready", function(){
                        trackFullGuidelinesPageView('343');
                                                },true);
                });
            







                $('#g131').on('pageshow', function (event, ui) {
                    document.addEventListener("deviceready", function(){
                        trackFullGuidelinesPageView('131');
                                                },true);
                });
            







                $('#g37').on('pageshow', function (event, ui) {
                    document.addEventListener("deviceready", function(){
                        trackFullGuidelinesPageView('37');
                                                },true);
                });
            













                $('#g132').on('pageshow', function (event, ui) {
                    document.addEventListener("deviceready", function(){
                        trackFullGuidelinesPageView('132');
                                                },true);
                });
            







                $('#g152').on('pageshow', function (event, ui) {
                    document.addEventListener("deviceready", function(){
                        trackFullGuidelinesPageView('152');
                                                },true);
                });
            







                $('#g60').on('pageshow', function (event, ui) {
                    document.addEventListener("deviceready", function(){
                        trackFullGuidelinesPageView('60');
                                                },true);
                });
            







                $('#g15').on('pageshow', function (event, ui) {
                    document.addEventListener("deviceready", function(){
                        trackFullGuidelinesPageView('15');
                                                },true);
                });
            













                $('#g81').on('pageshow', function (event, ui) {
                    document.addEventListener("deviceready", function(){
                        trackFullGuidelinesPageView('81');
                                                },true);
                });
            







                $('#g372').on('pageshow', function (event, ui) {
                    document.addEventListener("deviceready", function(){
                        trackFullGuidelinesPageView('372');
                                                },true);
                });
            







                $('#g276').on('pageshow', function (event, ui) {
                    document.addEventListener("deviceready", function(){
                        trackFullGuidelinesPageView('276');
                                                },true);
                });
            







                $('#g177').on('pageshow', function (event, ui) {
                    document.addEventListener("deviceready", function(){
                        trackFullGuidelinesPageView('177');
                                                },true);
                });
            







                $('#g354').on('pageshow', function (event, ui) {
                    document.addEventListener("deviceready", function(){
                        trackFullGuidelinesPageView('354');
                                                },true);
                });
            







                $('#g406').on('pageshow', function (event, ui) {
                    document.addEventListener("deviceready", function(){
                        trackFullGuidelinesPageView('406');
                                                },true);
                });
            













                $('#g345').on('pageshow', function (event, ui) {
                    document.addEventListener("deviceready", function(){
                        trackFullGuidelinesPageView('345');
                                                },true);
                });
            







                $('#g262').on('pageshow', function (event, ui) {
                    document.addEventListener("deviceready", function(){
                        trackFullGuidelinesPageView('262');
                                                },true);
                });
            







                $('#g165').on('pageshow', function (event, ui) {
                    document.addEventListener("deviceready", function(){
                        trackFullGuidelinesPageView('165');
                                                },true);
                });
            













                $('#g278').on('pageshow', function (event, ui) {
                    document.addEventListener("deviceready", function(){
                        trackFullGuidelinesPageView('278');
                                                },true);
                });
            







                $('#g246').on('pageshow', function (event, ui) {
                    document.addEventListener("deviceready", function(){
                        trackFullGuidelinesPageView('246');
                                                },true);
                });
            







                $('#g146').on('pageshow', function (event, ui) {
                    document.addEventListener("deviceready", function(){
                        trackFullGuidelinesPageView('146');
                                                },true);
                });
            







                $('#g154').on('pageshow', function (event, ui) {
                    document.addEventListener("deviceready", function(){
                        trackFullGuidelinesPageView('154');
                                                },true);
                });
            







                $('#g249').on('pageshow', function (event, ui) {
                    document.addEventListener("deviceready", function(){
                        trackFullGuidelinesPageView('249');
                                                },true);
                });
            































                $('#g366').on('pageshow', function (event, ui) {
                    document.addEventListener("deviceready", function(){
                        trackFullGuidelinesPageView('366');
                                                },true);
                });
            







                $('#g378').on('pageshow', function (event, ui) {
                    document.addEventListener("deviceready", function(){
                        trackFullGuidelinesPageView('378');
                                                },true);
                });
            







                $('#g385').on('pageshow', function (event, ui) {
                    document.addEventListener("deviceready", function(){
                        trackFullGuidelinesPageView('385');
                                                },true);
                });
            







                $('#g112').on('pageshow', function (event, ui) {
                    document.addEventListener("deviceready", function(){
                        trackFullGuidelinesPageView('112');
                                                },true);
                });
            













                $('#g386').on('pageshow', function (event, ui) {
                    document.addEventListener("deviceready", function(){
                        trackFullGuidelinesPageView('386');
                                                },true);
                });
            







                $('#g274').on('pageshow', function (event, ui) {
                    document.addEventListener("deviceready", function(){
                        trackFullGuidelinesPageView('274');
                                                },true);
                });
            







                $('#g128').on('pageshow', function (event, ui) {
                    document.addEventListener("deviceready", function(){
                        trackFullGuidelinesPageView('128');
                                                },true);
                });
            







                $('#g405').on('pageshow', function (event, ui) {
                    document.addEventListener("deviceready", function(){
                        trackFullGuidelinesPageView('405');
                                                },true);
                });
            







                $('#g215').on('pageshow', function (event, ui) {
                    document.addEventListener("deviceready", function(){
                        trackFullGuidelinesPageView('215');
                                                },true);
                });
            







                $('#g332').on('pageshow', function (event, ui) {
                    document.addEventListener("deviceready", function(){
                        trackFullGuidelinesPageView('332');
                                                },true);
                });
            







                $('#g252').on('pageshow', function (event, ui) {
                    document.addEventListener("deviceready", function(){
                        trackFullGuidelinesPageView('252');
                                                },true);
                });
            







                $('#g418').on('pageshow', function (event, ui) {
                    document.addEventListener("deviceready", function(){
                        trackFullGuidelinesPageView('418');
                                                },true);
                });
            













                $('#g394').on('pageshow', function (event, ui) {
                    document.addEventListener("deviceready", function(){
                        trackFullGuidelinesPageView('394');
                                                },true);
                });
            







                $('#g40').on('pageshow', function (event, ui) {
                    document.addEventListener("deviceready", function(){
                        trackFullGuidelinesPageView('40');
                                                },true);
                });
            













                $('#g196').on('pageshow', function (event, ui) {
                    document.addEventListener("deviceready", function(){
                        trackFullGuidelinesPageView('196');
                                                },true);
                });
            







                $('#g305').on('pageshow', function (event, ui) {
                    document.addEventListener("deviceready", function(){
                        trackFullGuidelinesPageView('305');
                                                },true);
                });
            







                $('#g217').on('pageshow', function (event, ui) {
                    document.addEventListener("deviceready", function(){
                        trackFullGuidelinesPageView('217');
                                                },true);
                });
            







                $('#g325').on('pageshow', function (event, ui) {
                    document.addEventListener("deviceready", function(){
                        trackFullGuidelinesPageView('325');
                                                },true);
                });
            

























                $('#g317').on('pageshow', function (event, ui) {
                    document.addEventListener("deviceready", function(){
                        trackFullGuidelinesPageView('317');
                                                },true);
                });
            













                $('#g203').on('pageshow', function (event, ui) {
                    document.addEventListener("deviceready", function(){
                        trackFullGuidelinesPageView('203');
                                                },true);
                });
            







                $('#g419').on('pageshow', function (event, ui) {
                    document.addEventListener("deviceready", function(){
                        trackFullGuidelinesPageView('419');
                                                },true);
                });
            







                $('#g413').on('pageshow', function (event, ui) {
                    document.addEventListener("deviceready", function(){
                        trackFullGuidelinesPageView('413');
                                                },true);
                });
            













                $('#g82').on('pageshow', function (event, ui) {
                    document.addEventListener("deviceready", function(){
                        trackFullGuidelinesPageView('82');
                                                },true);
                });
            







                $('#g185').on('pageshow', function (event, ui) {
                    document.addEventListener("deviceready", function(){
                        trackFullGuidelinesPageView('185');
                                                },true);
                });
            







                $('#g322').on('pageshow', function (event, ui) {
                    document.addEventListener("deviceready", function(){
                        trackFullGuidelinesPageView('322');
                                                },true);
                });
            













                $('#g79').on('pageshow', function (event, ui) {
                    document.addEventListener("deviceready", function(){
                        trackFullGuidelinesPageView('79');
                                                },true);
                });
            







                $('#g219').on('pageshow', function (event, ui) {
                    document.addEventListener("deviceready", function(){
                        trackFullGuidelinesPageView('219');
                                                },true);
                });
            













                $('#g161').on('pageshow', function (event, ui) {
                    document.addEventListener("deviceready", function(){
                        trackFullGuidelinesPageView('161');
                                                },true);
                });
            







                $('#g11').on('pageshow', function (event, ui) {
                    document.addEventListener("deviceready", function(){
                        trackFullGuidelinesPageView('11');
                                                },true);
                });
            







                $('#g30').on('pageshow', function (event, ui) {
                    document.addEventListener("deviceready", function(){
                        trackFullGuidelinesPageView('30');
                                                },true);
                });
            







                $('#g65').on('pageshow', function (event, ui) {
                    document.addEventListener("deviceready", function(){
                        trackFullGuidelinesPageView('65');
                                                },true);
                });
            













                $('#g260').on('pageshow', function (event, ui) {
                    document.addEventListener("deviceready", function(){
                        trackFullGuidelinesPageView('260');
                                                },true);
                });
            







                $('#g100').on('pageshow', function (event, ui) {
                    document.addEventListener("deviceready", function(){
                        trackFullGuidelinesPageView('100');
                                                },true);
                });
            













                $('#g392').on('pageshow', function (event, ui) {
                    document.addEventListener("deviceready", function(){
                        trackFullGuidelinesPageView('392');
                                                },true);
                });
            







                $('#g334').on('pageshow', function (event, ui) {
                    document.addEventListener("deviceready", function(){
                        trackFullGuidelinesPageView('334');
                                                },true);
                });
            







                $('#g415').on('pageshow', function (event, ui) {
                    document.addEventListener("deviceready", function(){
                        trackFullGuidelinesPageView('415');
                                                },true);
                });
            







                $('#g202').on('pageshow', function (event, ui) {
                    document.addEventListener("deviceready", function(){
                        trackFullGuidelinesPageView('202');
                                                },true);
                });
            













                $('#g120').on('pageshow', function (event, ui) {
                    document.addEventListener("deviceready", function(){
                        trackFullGuidelinesPageView('120');
                                                },true);
                });
            







                $('#g101').on('pageshow', function (event, ui) {
                    document.addEventListener("deviceready", function(){
                        trackFullGuidelinesPageView('101');
                                                },true);
                });
            













                $('#g353').on('pageshow', function (event, ui) {
                    document.addEventListener("deviceready", function(){
                        trackFullGuidelinesPageView('353');
                                                },true);
                });
            







                $('#g8').on('pageshow', function (event, ui) {
                    document.addEventListener("deviceready", function(){
                        trackFullGuidelinesPageView('8');
                                                },true);
                });
            







                $('#g299').on('pageshow', function (event, ui) {
                    document.addEventListener("deviceready", function(){
                        trackFullGuidelinesPageView('299');
                                                },true);
                });
            







                $('#g248').on('pageshow', function (event, ui) {
                    document.addEventListener("deviceready", function(){
                        trackFullGuidelinesPageView('248');
                                                },true);
                });
            







                $('#g3').on('pageshow', function (event, ui) {
                    document.addEventListener("deviceready", function(){
                        trackFullGuidelinesPageView('3');
                                                },true);
                });
            







                $('#g352').on('pageshow', function (event, ui) {
                    document.addEventListener("deviceready", function(){
                        trackFullGuidelinesPageView('352');
                                                },true);
                });
            







                $('#g18').on('pageshow', function (event, ui) {
                    document.addEventListener("deviceready", function(){
                        trackFullGuidelinesPageView('18');
                                                },true);
                });
            







                $('#g5').on('pageshow', function (event, ui) {
                    document.addEventListener("deviceready", function(){
                        trackFullGuidelinesPageView('5');
                                                },true);
                });
            













                $('#g143').on('pageshow', function (event, ui) {
                    document.addEventListener("deviceready", function(){
                        trackFullGuidelinesPageView('143');
                                                },true);
                });
            







                $('#g175').on('pageshow', function (event, ui) {
                    document.addEventListener("deviceready", function(){
                        trackFullGuidelinesPageView('175');
                                                },true);
                });
            













                $('#g348').on('pageshow', function (event, ui) {
                    document.addEventListener("deviceready", function(){
                        trackFullGuidelinesPageView('348');
                                                },true);
                });
            







                $('#g87').on('pageshow', function (event, ui) {
                    document.addEventListener("deviceready", function(){
                        trackFullGuidelinesPageView('87');
                                                },true);
                });
            







                $('#g19').on('pageshow', function (event, ui) {
                    document.addEventListener("deviceready", function(){
                        trackFullGuidelinesPageView('19');
                                                },true);
                });
            







                $('#g32').on('pageshow', function (event, ui) {
                    document.addEventListener("deviceready", function(){
                        trackFullGuidelinesPageView('32');
                                                },true);
                });
            







                $('#g206').on('pageshow', function (event, ui) {
                    document.addEventListener("deviceready", function(){
                        trackFullGuidelinesPageView('206');
                                                },true);
                });
            







                $('#g145').on('pageshow', function (event, ui) {
                    document.addEventListener("deviceready", function(){
                        trackFullGuidelinesPageView('145');
                                                },true);
                });
            













                $('#g277').on('pageshow', function (event, ui) {
                    document.addEventListener("deviceready", function(){
                        trackFullGuidelinesPageView('277');
                                                },true);
                });
            







                $('#g371').on('pageshow', function (event, ui) {
                    document.addEventListener("deviceready", function(){
                        trackFullGuidelinesPageView('371');
                                                },true);
                });
            













                $('#g341').on('pageshow', function (event, ui) {
                    document.addEventListener("deviceready", function(){
                        trackFullGuidelinesPageView('341');
                                                },true);
                });
            







                $('#g250').on('pageshow', function (event, ui) {
                    document.addEventListener("deviceready", function(){
                        trackFullGuidelinesPageView('250');
                                                },true);
                });
            













                $('#g265').on('pageshow', function (event, ui) {
                    document.addEventListener("deviceready", function(){
                        trackFullGuidelinesPageView('265');
                                                },true);
                });
            













                $('#g186').on('pageshow', function (event, ui) {
                    document.addEventListener("deviceready", function(){
                        trackFullGuidelinesPageView('186');
                                                },true);
                });
            







                $('#g115').on('pageshow', function (event, ui) {
                    document.addEventListener("deviceready", function(){
                        trackFullGuidelinesPageView('115');
                                                },true);
                });
            







                $('#g290').on('pageshow', function (event, ui) {
                    document.addEventListener("deviceready", function(){
                        trackFullGuidelinesPageView('290');
                                                },true);
                });
            







                $('#g22').on('pageshow', function (event, ui) {
                    document.addEventListener("deviceready", function(){
                        trackFullGuidelinesPageView('22');
                                                },true);
                });
            







                $('#g107').on('pageshow', function (event, ui) {
                    document.addEventListener("deviceready", function(){
                        trackFullGuidelinesPageView('107');
                                                },true);
                });
            







                $('#g364').on('pageshow', function (event, ui) {
                    document.addEventListener("deviceready", function(){
                        trackFullGuidelinesPageView('364');
                                                },true);
                });
            







                $('#g210').on('pageshow', function (event, ui) {
                    document.addEventListener("deviceready", function(){
                        trackFullGuidelinesPageView('210');
                                                },true);
                });
            







                $('#g237').on('pageshow', function (event, ui) {
                    document.addEventListener("deviceready", function(){
                        trackFullGuidelinesPageView('237');
                                                },true);
                });
            







                $('#g110').on('pageshow', function (event, ui) {
                    document.addEventListener("deviceready", function(){
                        trackFullGuidelinesPageView('110');
                                                },true);
                });
            













                $('#g251').on('pageshow', function (event, ui) {
                    document.addEventListener("deviceready", function(){
                        trackFullGuidelinesPageView('251');
                                                },true);
                });
            







                $('#g270').on('pageshow', function (event, ui) {
                    document.addEventListener("deviceready", function(){
                        trackFullGuidelinesPageView('270');
                                                },true);
                });
            







                $('#g1').on('pageshow', function (event, ui) {
                    document.addEventListener("deviceready", function(){
                        trackFullGuidelinesPageView('1');
                                                },true);
                });
            







                $('#g320').on('pageshow', function (event, ui) {
                    document.addEventListener("deviceready", function(){
                        trackFullGuidelinesPageView('320');
                                                },true);
                });
            













                $('#g257').on('pageshow', function (event, ui) {
                    document.addEventListener("deviceready", function(){
                        trackFullGuidelinesPageView('257');
                                                },true);
                });
            



















                $('#g76').on('pageshow', function (event, ui) {
                    document.addEventListener("deviceready", function(){
                        trackFullGuidelinesPageView('76');
                                                },true);
                });
            







                $('#g357').on('pageshow', function (event, ui) {
                    document.addEventListener("deviceready", function(){
                        trackFullGuidelinesPageView('357');
                                                },true);
                });
            







                $('#g7').on('pageshow', function (event, ui) {
                    document.addEventListener("deviceready", function(){
                        trackFullGuidelinesPageView('7');
                                                },true);
                });
            







                $('#g192').on('pageshow', function (event, ui) {
                    document.addEventListener("deviceready", function(){
                        trackFullGuidelinesPageView('192');
                                                },true);
                });
            













                $('#g222').on('pageshow', function (event, ui) {
                    document.addEventListener("deviceready", function(){
                        trackFullGuidelinesPageView('222');
                                                },true);
                });
            







                $('#g35').on('pageshow', function (event, ui) {
                    document.addEventListener("deviceready", function(){
                        trackFullGuidelinesPageView('35');
                                                },true);
                });
            







                $('#g52').on('pageshow', function (event, ui) {
                    document.addEventListener("deviceready", function(){
                        trackFullGuidelinesPageView('52');
                                                },true);
                });
            













                $('#g9').on('pageshow', function (event, ui) {
                    document.addEventListener("deviceready", function(){
                        trackFullGuidelinesPageView('9');
                                                },true);
                });
            







                $('#g64').on('pageshow', function (event, ui) {
                    document.addEventListener("deviceready", function(){
                        trackFullGuidelinesPageView('64');
                                                },true);
                });
            







                $('#g208').on('pageshow', function (event, ui) {
                    document.addEventListener("deviceready", function(){
                        trackFullGuidelinesPageView('208');
                                                },true);
                });
            







                $('#g163').on('pageshow', function (event, ui) {
                    document.addEventListener("deviceready", function(){
                        trackFullGuidelinesPageView('163');
                                                },true);
                });
            







                $('#g362').on('pageshow', function (event, ui) {
                    document.addEventListener("deviceready", function(){
                        trackFullGuidelinesPageView('362');
                                                },true);
                });
            







                $('#g61').on('pageshow', function (event, ui) {
                    document.addEventListener("deviceready", function(){
                        trackFullGuidelinesPageView('61');
                                                },true);
                });
            







                $('#g414').on('pageshow', function (event, ui) {
                    document.addEventListener("deviceready", function(){
                        trackFullGuidelinesPageView('414');
                                                },true);
                });
            







                $('#g137').on('pageshow', function (event, ui) {
                    document.addEventListener("deviceready", function(){
                        trackFullGuidelinesPageView('137');
                                                },true);
                });
            













                $('#g51').on('pageshow', function (event, ui) {
                    document.addEventListener("deviceready", function(){
                        trackFullGuidelinesPageView('51');
                                                },true);
                });
            



















                $('#g191').on('pageshow', function (event, ui) {
                    document.addEventListener("deviceready", function(){
                        trackFullGuidelinesPageView('191');
                                                },true);
                });
            







                $('#g297').on('pageshow', function (event, ui) {
                    document.addEventListener("deviceready", function(){
                        trackFullGuidelinesPageView('297');
                                                },true);
                });
            







                $('#g264').on('pageshow', function (event, ui) {
                    document.addEventListener("deviceready", function(){
                        trackFullGuidelinesPageView('264');
                                                },true);
                });
            







                $('#g410').on('pageshow', function (event, ui) {
                    document.addEventListener("deviceready", function(){
                        trackFullGuidelinesPageView('410');
                                                },true);
                });
            







                $('#g324').on('pageshow', function (event, ui) {
                    document.addEventListener("deviceready", function(){
                        trackFullGuidelinesPageView('324');
                                                },true);
                });
            







                $('#g329').on('pageshow', function (event, ui) {
                    document.addEventListener("deviceready", function(){
                        trackFullGuidelinesPageView('329');
                                                },true);
                });
            







                $('#g171').on('pageshow', function (event, ui) {
                    document.addEventListener("deviceready", function(){
                        trackFullGuidelinesPageView('171');
                                                },true);
                });
            







                $('#g103').on('pageshow', function (event, ui) {
                    document.addEventListener("deviceready", function(){
                        trackFullGuidelinesPageView('103');
                                                },true);
                });
            







                $('#g157').on('pageshow', function (event, ui) {
                    document.addEventListener("deviceready", function(){
                        trackFullGuidelinesPageView('157');
                                                },true);
                });
            













                $('#g213').on('pageshow', function (event, ui) {
                    document.addEventListener("deviceready", function(){
                        trackFullGuidelinesPageView('213');
                                                },true);
                });
            







                $('#g139').on('pageshow', function (event, ui) {
                    document.addEventListener("deviceready", function(){
                        trackFullGuidelinesPageView('139');
                                                },true);
                });
            







                $('#g245').on('pageshow', function (event, ui) {
                    document.addEventListener("deviceready", function(){
                        trackFullGuidelinesPageView('245');
                                                },true);
                });
            







                $('#g421').on('pageshow', function (event, ui) {
                    document.addEventListener("deviceready", function(){
                        trackFullGuidelinesPageView('421');
                                                },true);
                });
            

























                $('#g236').on('pageshow', function (event, ui) {
                    document.addEventListener("deviceready", function(){
                        trackFullGuidelinesPageView('236');
                                                },true);
                });
            







                $('#g168').on('pageshow', function (event, ui) {
                    document.addEventListener("deviceready", function(){
                        trackFullGuidelinesPageView('168');
                                                },true);
                });
            







                $('#g295').on('pageshow', function (event, ui) {
                    document.addEventListener("deviceready", function(){
                        trackFullGuidelinesPageView('295');
                                                },true);
                });
            







                $('#g279').on('pageshow', function (event, ui) {
                    document.addEventListener("deviceready", function(){
                        trackFullGuidelinesPageView('279');
                                                },true);
                });
            







                $('#g302').on('pageshow', function (event, ui) {
                    document.addEventListener("deviceready", function(){
                        trackFullGuidelinesPageView('302');
                                                },true);
                });
            













                $('#g400').on('pageshow', function (event, ui) {
                    document.addEventListener("deviceready", function(){
                        trackFullGuidelinesPageView('400');
                                                },true);
                });
            







                $('#g216').on('pageshow', function (event, ui) {
                    document.addEventListener("deviceready", function(){
                        trackFullGuidelinesPageView('216');
                                                },true);
                });
            







                $('#g388').on('pageshow', function (event, ui) {
                    document.addEventListener("deviceready", function(){
                        trackFullGuidelinesPageView('388');
                                                },true);
                });
            







                $('#g347').on('pageshow', function (event, ui) {
                    document.addEventListener("deviceready", function(){
                        trackFullGuidelinesPageView('347');
                                                },true);
                });
            







                $('#g42').on('pageshow', function (event, ui) {
                    document.addEventListener("deviceready", function(){
                        trackFullGuidelinesPageView('42');
                                                },true);
                });
            







                $('#g380').on('pageshow', function (event, ui) {
                    document.addEventListener("deviceready", function(){
                        trackFullGuidelinesPageView('380');
                                                },true);
                });
            







                $('#g25').on('pageshow', function (event, ui) {
                    document.addEventListener("deviceready", function(){
                        trackFullGuidelinesPageView('25');
                                                },true);
                });
            







                $('#g88').on('pageshow', function (event, ui) {
                    document.addEventListener("deviceready", function(){
                        trackFullGuidelinesPageView('88');
                                                },true);
                });
            







                $('#g56').on('pageshow', function (event, ui) {
                    document.addEventListener("deviceready", function(){
                        trackFullGuidelinesPageView('56');
                                                },true);
                });
            







                $('#g304').on('pageshow', function (event, ui) {
                    document.addEventListener("deviceready", function(){
                        trackFullGuidelinesPageView('304');
                                                },true);
                });
            













                $('#g412').on('pageshow', function (event, ui) {
                    document.addEventListener("deviceready", function(){
                        trackFullGuidelinesPageView('412');
                                                },true);
                });
            







                $('#g339').on('pageshow', function (event, ui) {
                    document.addEventListener("deviceready", function(){
                        trackFullGuidelinesPageView('339');
                                                },true);
                });
            







                $('#g189').on('pageshow', function (event, ui) {
                    document.addEventListener("deviceready", function(){
                        trackFullGuidelinesPageView('189');
                                                },true);
                });
            













                $('#g399').on('pageshow', function (event, ui) {
                    document.addEventListener("deviceready", function(){
                        trackFullGuidelinesPageView('399');
                                                },true);
                });
            







                $('#g242').on('pageshow', function (event, ui) {
                    document.addEventListener("deviceready", function(){
                        trackFullGuidelinesPageView('242');
                                                },true);
                });
            







                $('#g173').on('pageshow', function (event, ui) {
                    document.addEventListener("deviceready", function(){
                        trackFullGuidelinesPageView('173');
                                                },true);
                });
            







                $('#g254').on('pageshow', function (event, ui) {
                    document.addEventListener("deviceready", function(){
                        trackFullGuidelinesPageView('254');
                                                },true);
                });
            







                $('#g70').on('pageshow', function (event, ui) {
                    document.addEventListener("deviceready", function(){
                        trackFullGuidelinesPageView('70');
                                                },true);
                });
            







                $('#g261').on('pageshow', function (event, ui) {
                    document.addEventListener("deviceready", function(){
                        trackFullGuidelinesPageView('261');
                                                },true);
                });
            







                $('#g27').on('pageshow', function (event, ui) {
                    document.addEventListener("deviceready", function(){
                        trackFullGuidelinesPageView('27');
                                                },true);
                });
            







                $('#g359').on('pageshow', function (event, ui) {
                    document.addEventListener("deviceready", function(){
                        trackFullGuidelinesPageView('359');
                                                },true);
                });
            







                $('#g10').on('pageshow', function (event, ui) {
                    document.addEventListener("deviceready", function(){
                        trackFullGuidelinesPageView('10');
                                                },true);
                });
            







                $('#g404').on('pageshow', function (event, ui) {
                    document.addEventListener("deviceready", function(){
                        trackFullGuidelinesPageView('404');
                                                },true);
                });
            







                $('#g283').on('pageshow', function (event, ui) {
                    document.addEventListener("deviceready", function(){
                        trackFullGuidelinesPageView('283');
                                                },true);
                });
            







                $('#g284').on('pageshow', function (event, ui) {
                    document.addEventListener("deviceready", function(){
                        trackFullGuidelinesPageView('284');
                                                },true);
                });
            







                $('#g156').on('pageshow', function (event, ui) {
                    document.addEventListener("deviceready", function(){
                        trackFullGuidelinesPageView('156');
                                                },true);
                });
            













                $('#g181').on('pageshow', function (event, ui) {
                    document.addEventListener("deviceready", function(){
                        trackFullGuidelinesPageView('181');
                                                },true);
                });
            







                $('#g309').on('pageshow', function (event, ui) {
                    document.addEventListener("deviceready", function(){
                        trackFullGuidelinesPageView('309');
                                                },true);
                });
            







                $('#g182').on('pageshow', function (event, ui) {
                    document.addEventListener("deviceready", function(){
                        trackFullGuidelinesPageView('182');
                                                },true);
                });
            







                $('#g49').on('pageshow', function (event, ui) {
                    document.addEventListener("deviceready", function(){
                        trackFullGuidelinesPageView('49');
                                                },true);
                });
            







                $('#g129').on('pageshow', function (event, ui) {
                    document.addEventListener("deviceready", function(){
                        trackFullGuidelinesPageView('129');
                                                },true);
                });
            







                $('#g356').on('pageshow', function (event, ui) {
                    document.addEventListener("deviceready", function(){
                        trackFullGuidelinesPageView('356');
                                                },true);
                });
            







                $('#g83').on('pageshow', function (event, ui) {
                    document.addEventListener("deviceready", function(){
                        trackFullGuidelinesPageView('83');
                                                },true);
                });
            







                $('#g358').on('pageshow', function (event, ui) {
                    document.addEventListener("deviceready", function(){
                        trackFullGuidelinesPageView('358');
                                                },true);
                });
            







                $('#g116').on('pageshow', function (event, ui) {
                    document.addEventListener("deviceready", function(){
                        trackFullGuidelinesPageView('116');
                                                },true);
                });
            







                $('#g315').on('pageshow', function (event, ui) {
                    document.addEventListener("deviceready", function(){
                        trackFullGuidelinesPageView('315');
                                                },true);
                });
            







                $('#g33').on('pageshow', function (event, ui) {
                    document.addEventListener("deviceready", function(){
                        trackFullGuidelinesPageView('33');
                                                },true);
                });
            







                $('#g230').on('pageshow', function (event, ui) {
                    document.addEventListener("deviceready", function(){
                        trackFullGuidelinesPageView('230');
                                                },true);
                });
            







                $('#g233').on('pageshow', function (event, ui) {
                    document.addEventListener("deviceready", function(){
                        trackFullGuidelinesPageView('233');
                                                },true);
                });
            













                $('#g259').on('pageshow', function (event, ui) {
                    document.addEventListener("deviceready", function(){
                        trackFullGuidelinesPageView('259');
                                                },true);
                });
            







                $('#g147').on('pageshow', function (event, ui) {
                    document.addEventListener("deviceready", function(){
                        trackFullGuidelinesPageView('147');
                                                },true);
                });
            







                $('#g176').on('pageshow', function (event, ui) {
                    document.addEventListener("deviceready", function(){
                        trackFullGuidelinesPageView('176');
                                                },true);
                });
            







                $('#g402').on('pageshow', function (event, ui) {
                    document.addEventListener("deviceready", function(){
                        trackFullGuidelinesPageView('402');
                                                },true);
                });
            







                $('#g238').on('pageshow', function (event, ui) {
                    document.addEventListener("deviceready", function(){
                        trackFullGuidelinesPageView('238');
                                                },true);
                });
            







                $('#g396').on('pageshow', function (event, ui) {
                    document.addEventListener("deviceready", function(){
                        trackFullGuidelinesPageView('396');
                                                },true);
                });
            







                $('#g382').on('pageshow', function (event, ui) {
                    document.addEventListener("deviceready", function(){
                        trackFullGuidelinesPageView('382');
                                                },true);
                });
            







                $('#g140').on('pageshow', function (event, ui) {
                    document.addEventListener("deviceready", function(){
                        trackFullGuidelinesPageView('140');
                                                },true);
                });
            







                $('#g99').on('pageshow', function (event, ui) {
                    document.addEventListener("deviceready", function(){
                        trackFullGuidelinesPageView('99');
                                                },true);
                });
            







                $('#g92').on('pageshow', function (event, ui) {
                    document.addEventListener("deviceready", function(){
                        trackFullGuidelinesPageView('92');
                                                },true);
                });
            







                $('#g258').on('pageshow', function (event, ui) {
                    document.addEventListener("deviceready", function(){
                        trackFullGuidelinesPageView('258');
                                                },true);
                });
            







                $('#g319').on('pageshow', function (event, ui) {
                    document.addEventListener("deviceready", function(){
                        trackFullGuidelinesPageView('319');
                                                },true);
                });
            







                $('#g288').on('pageshow', function (event, ui) {
                    document.addEventListener("deviceready", function(){
                        trackFullGuidelinesPageView('288');
                                                },true);
                });
            







                $('#g301').on('pageshow', function (event, ui) {
                    document.addEventListener("deviceready", function(){
                        trackFullGuidelinesPageView('301');
                                                },true);
                });
            













                $('#g263').on('pageshow', function (event, ui) {
                    document.addEventListener("deviceready", function(){
                        trackFullGuidelinesPageView('263');
                                                },true);
                });
            







                $('#g105').on('pageshow', function (event, ui) {
                    document.addEventListener("deviceready", function(){
                        trackFullGuidelinesPageView('105');
                                                },true);
                });
            







                $('#g321').on('pageshow', function (event, ui) {
                    document.addEventListener("deviceready", function(){
                        trackFullGuidelinesPageView('321');
                                                },true);
                });
            







                $('#g407').on('pageshow', function (event, ui) {
                    document.addEventListener("deviceready", function(){
                        trackFullGuidelinesPageView('407');
                                                },true);
                });
            







                $('#g312').on('pageshow', function (event, ui) {
                    document.addEventListener("deviceready", function(){
                        trackFullGuidelinesPageView('312');
                                                },true);
                });
            







                $('#g234').on('pageshow', function (event, ui) {
                    document.addEventListener("deviceready", function(){
                        trackFullGuidelinesPageView('234');
                                                },true);
                });
            







                $('#g326').on('pageshow', function (event, ui) {
                    document.addEventListener("deviceready", function(){
                        trackFullGuidelinesPageView('326');
                                                },true);
                });
            

























                $('#g344').on('pageshow', function (event, ui) {
                    document.addEventListener("deviceready", function(){
                        trackFullGuidelinesPageView('344');
                                                },true);
                });
            













                $('#g220').on('pageshow', function (event, ui) {
                    document.addEventListener("deviceready", function(){
                        trackFullGuidelinesPageView('220');
                                                },true);
                });
            







                $('#g59').on('pageshow', function (event, ui) {
                    document.addEventListener("deviceready", function(){
                        trackFullGuidelinesPageView('59');
                                                },true);
                });
            







                $('#g227').on('pageshow', function (event, ui) {
                    document.addEventListener("deviceready", function(){
                        trackFullGuidelinesPageView('227');
                                                },true);
                });
            













                $('#g350').on('pageshow', function (event, ui) {
                    document.addEventListener("deviceready", function(){
                        trackFullGuidelinesPageView('350');
                                                },true);
                });
            







                $('#g333').on('pageshow', function (event, ui) {
                    document.addEventListener("deviceready", function(){
                        trackFullGuidelinesPageView('333');
                                                },true);
                });
            







                $('#g360').on('pageshow', function (event, ui) {
                    document.addEventListener("deviceready", function(){
                        trackFullGuidelinesPageView('360');
                                                },true);
                });
            













                $('#g26').on('pageshow', function (event, ui) {
                    document.addEventListener("deviceready", function(){
                        trackFullGuidelinesPageView('26');
                                                },true);
                });
            







                $('#g93').on('pageshow', function (event, ui) {
                    document.addEventListener("deviceready", function(){
                        trackFullGuidelinesPageView('93');
                                                },true);
                });
            







                $('#g125').on('pageshow', function (event, ui) {
                    document.addEventListener("deviceready", function(){
                        trackFullGuidelinesPageView('125');
                                                },true);
                });
            







                $('#g138').on('pageshow', function (event, ui) {
                    document.addEventListener("deviceready", function(){
                        trackFullGuidelinesPageView('138');
                                                },true);
                });
            







                $('#g379').on('pageshow', function (event, ui) {
                    document.addEventListener("deviceready", function(){
                        trackFullGuidelinesPageView('379');
                                                },true);
                });
            













                $('#g398').on('pageshow', function (event, ui) {
                    document.addEventListener("deviceready", function(){
                        trackFullGuidelinesPageView('398');
                                                },true);
                });
            







                $('#g313').on('pageshow', function (event, ui) {
                    document.addEventListener("deviceready", function(){
                        trackFullGuidelinesPageView('313');
                                                },true);
                });
            







                $('#g212').on('pageshow', function (event, ui) {
                    document.addEventListener("deviceready", function(){
                        trackFullGuidelinesPageView('212');
                                                },true);
                });
            







                $('#g16').on('pageshow', function (event, ui) {
                    document.addEventListener("deviceready", function(){
                        trackFullGuidelinesPageView('16');
                                                },true);
                });
            







                $('#g218').on('pageshow', function (event, ui) {
                    document.addEventListener("deviceready", function(){
                        trackFullGuidelinesPageView('218');
                                                },true);
                });
            







                $('#g109').on('pageshow', function (event, ui) {
                    document.addEventListener("deviceready", function(){
                        trackFullGuidelinesPageView('109');
                                                },true);
                });
            







                $('#g214').on('pageshow', function (event, ui) {
                    document.addEventListener("deviceready", function(){
                        trackFullGuidelinesPageView('214');
                                                },true);
                });
            







                $('#g255').on('pageshow', function (event, ui) {
                    document.addEventListener("deviceready", function(){
                        trackFullGuidelinesPageView('255');
                                                },true);
                });
            



















                $('#g244').on('pageshow', function (event, ui) {
                    document.addEventListener("deviceready", function(){
                        trackFullGuidelinesPageView('244');
                                                },true);
                });
            







                $('#g294').on('pageshow', function (event, ui) {
                    document.addEventListener("deviceready", function(){
                        trackFullGuidelinesPageView('294');
                                                },true);
                });
            







                $('#g204').on('pageshow', function (event, ui) {
                    document.addEventListener("deviceready", function(){
                        trackFullGuidelinesPageView('204');
                                                },true);
                });
            







                $('#g188').on('pageshow', function (event, ui) {
                    document.addEventListener("deviceready", function(){
                        trackFullGuidelinesPageView('188');
                                                },true);
                });
            







                $('#g172').on('pageshow', function (event, ui) {
                    document.addEventListener("deviceready", function(){
                        trackFullGuidelinesPageView('172');
                                                },true);
                });
            







                $('#g349').on('pageshow', function (event, ui) {
                    document.addEventListener("deviceready", function(){
                        trackFullGuidelinesPageView('349');
                                                },true);
                });
            







                $('#g166').on('pageshow', function (event, ui) {
                    document.addEventListener("deviceready", function(){
                        trackFullGuidelinesPageView('166');
                                                },true);
                });
            



















                $('#g311').on('pageshow', function (event, ui) {
                    document.addEventListener("deviceready", function(){
                        trackFullGuidelinesPageView('311');
                                                },true);
                });
            







                $('#g273').on('pageshow', function (event, ui) {
                    document.addEventListener("deviceready", function(){
                        trackFullGuidelinesPageView('273');
                                                },true);
                });
            













                $('#g240').on('pageshow', function (event, ui) {
                    document.addEventListener("deviceready", function(){
                        trackFullGuidelinesPageView('240');
                                                },true);
                });
            







                $('#g253').on('pageshow', function (event, ui) {
                    document.addEventListener("deviceready", function(){
                        trackFullGuidelinesPageView('253');
                                                },true);
                });
            







                $('#g300').on('pageshow', function (event, ui) {
                    document.addEventListener("deviceready", function(){
                        trackFullGuidelinesPageView('300');
                                                },true);
                });
            







                $('#g197').on('pageshow', function (event, ui) {
                    document.addEventListener("deviceready", function(){
                        trackFullGuidelinesPageView('197');
                                                },true);
                });
            







                $('#g41').on('pageshow', function (event, ui) {
                    document.addEventListener("deviceready", function(){
                        trackFullGuidelinesPageView('41');
                                                },true);
                });
            







                $('#g221').on('pageshow', function (event, ui) {
                    document.addEventListener("deviceready", function(){
                        trackFullGuidelinesPageView('221');
                                                },true);
                });
            













                $('#g74').on('pageshow', function (event, ui) {
                    document.addEventListener("deviceready", function(){
                        trackFullGuidelinesPageView('74');
                                                },true);
                });
            







                $('#g149').on('pageshow', function (event, ui) {
                    document.addEventListener("deviceready", function(){
                        trackFullGuidelinesPageView('149');
                                                },true);
                });
            







                $('#g89').on('pageshow', function (event, ui) {
                    document.addEventListener("deviceready", function(){
                        trackFullGuidelinesPageView('89');
                                                },true);
                });
            







                $('#g124').on('pageshow', function (event, ui) {
                    document.addEventListener("deviceready", function(){
                        trackFullGuidelinesPageView('124');
                                                },true);
                });
            







                $('#g337').on('pageshow', function (event, ui) {
                    document.addEventListener("deviceready", function(){
                        trackFullGuidelinesPageView('337');
                                                },true);
                });
            







                $('#g86').on('pageshow', function (event, ui) {
                    document.addEventListener("deviceready", function(){
                        trackFullGuidelinesPageView('86');
                                                },true);
                });
            







                $('#g368').on('pageshow', function (event, ui) {
                    document.addEventListener("deviceready", function(){
                        trackFullGuidelinesPageView('368');
                                                },true);
                });
            







                $('#g170').on('pageshow', function (event, ui) {
                    document.addEventListener("deviceready", function(){
                        trackFullGuidelinesPageView('170');
                                                },true);
                });
            







                $('#g160').on('pageshow', function (event, ui) {
                    document.addEventListener("deviceready", function(){
                        trackFullGuidelinesPageView('160');
                                                },true);
                });
            













                $('#g69').on('pageshow', function (event, ui) {
                    document.addEventListener("deviceready", function(){
                        trackFullGuidelinesPageView('69');
                                                },true);
                });
            



















                $('#g403').on('pageshow', function (event, ui) {
                    document.addEventListener("deviceready", function(){
                        trackFullGuidelinesPageView('403');
                                                },true);
                });
            







                $('#g90').on('pageshow', function (event, ui) {
                    document.addEventListener("deviceready", function(){
                        trackFullGuidelinesPageView('90');
                                                },true);
                });
            













                $('#g226').on('pageshow', function (event, ui) {
                    document.addEventListener("deviceready", function(){
                        trackFullGuidelinesPageView('226');
                                                },true);
                });
            







                $('#g98').on('pageshow', function (event, ui) {
                    document.addEventListener("deviceready", function(){
                        trackFullGuidelinesPageView('98');
                                                },true);
                });
            



















                $('#g29').on('pageshow', function (event, ui) {
                    document.addEventListener("deviceready", function(){
                        trackFullGuidelinesPageView('29');
                                                },true);
                });
            







                $('#g223').on('pageshow', function (event, ui) {
                    document.addEventListener("deviceready", function(){
                        trackFullGuidelinesPageView('223');
                                                },true);
                });
            







                $('#g310').on('pageshow', function (event, ui) {
                    document.addEventListener("deviceready", function(){
                        trackFullGuidelinesPageView('310');
                                                },true);
                });
            







                $('#g150').on('pageshow', function (event, ui) {
                    document.addEventListener("deviceready", function(){
                        trackFullGuidelinesPageView('150');
                                                },true);
                });
            







                $('#g225').on('pageshow', function (event, ui) {
                    document.addEventListener("deviceready", function(){
                        trackFullGuidelinesPageView('225');
                                                },true);
                });
            







                $('#g422').on('pageshow', function (event, ui) {
                    document.addEventListener("deviceready", function(){
                        trackFullGuidelinesPageView('422');
                                                },true);
                });
            







                $('#g351').on('pageshow', function (event, ui) {
                    document.addEventListener("deviceready", function(){
                        trackFullGuidelinesPageView('351');
                                                },true);
                });
            













                $('#g367').on('pageshow', function (event, ui) {
                    document.addEventListener("deviceready", function(){
                        trackFullGuidelinesPageView('367');
                                                },true);
                });
            







                $('#g4').on('pageshow', function (event, ui) {
                    document.addEventListener("deviceready", function(){
                        trackFullGuidelinesPageView('4');
                                                },true);
                });
            







                $('#g303').on('pageshow', function (event, ui) {
                    document.addEventListener("deviceready", function(){
                        trackFullGuidelinesPageView('303');
                                                },true);
                });
            







                $('#g47').on('pageshow', function (event, ui) {
                    document.addEventListener("deviceready", function(){
                        trackFullGuidelinesPageView('47');
                                                },true);
                });
            







                $('#g363').on('pageshow', function (event, ui) {
                    document.addEventListener("deviceready", function(){
                        trackFullGuidelinesPageView('363');
                                                },true);
                });
            







                $('#g167').on('pageshow', function (event, ui) {
                    document.addEventListener("deviceready", function(){
                        trackFullGuidelinesPageView('167');
                                                },true);
                });
            



















                $('#g14').on('pageshow', function (event, ui) {
                    document.addEventListener("deviceready", function(){
                        trackFullGuidelinesPageView('14');
                                                },true);
                });
            







                $('#g66').on('pageshow', function (event, ui) {
                    document.addEventListener("deviceready", function(){
                        trackFullGuidelinesPageView('66');
                                                },true);
                });
            







                $('#g158').on('pageshow', function (event, ui) {
                    document.addEventListener("deviceready", function(){
                        trackFullGuidelinesPageView('158');
                                                },true);
                });
            













                $('#g389').on('pageshow', function (event, ui) {
                    document.addEventListener("deviceready", function(){
                        trackFullGuidelinesPageView('389');
                                                },true);
                });
            







                $('#g377').on('pageshow', function (event, ui) {
                    document.addEventListener("deviceready", function(){
                        trackFullGuidelinesPageView('377');
                                                },true);
                });
            







                $('#g151').on('pageshow', function (event, ui) {
                    document.addEventListener("deviceready", function(){
                        trackFullGuidelinesPageView('151');
                                                },true);
                });
            







                $('#g122').on('pageshow', function (event, ui) {
                    document.addEventListener("deviceready", function(){
                        trackFullGuidelinesPageView('122');
                                                },true);
                });
            







                $('#g272').on('pageshow', function (event, ui) {
                    document.addEventListener("deviceready", function(){
                        trackFullGuidelinesPageView('272');
                                                },true);
                });
            







                $('#g111').on('pageshow', function (event, ui) {
                    document.addEventListener("deviceready", function(){
                        trackFullGuidelinesPageView('111');
                                                },true);
                });
            







                $('#g21').on('pageshow', function (event, ui) {
                    document.addEventListener("deviceready", function(){
                        trackFullGuidelinesPageView('21');
                                                },true);
                });
            







                $('#g308').on('pageshow', function (event, ui) {
                    document.addEventListener("deviceready", function(){
                        trackFullGuidelinesPageView('308');
                                                },true);
                });
            







                $('#g54').on('pageshow', function (event, ui) {
                    document.addEventListener("deviceready", function(){
                        trackFullGuidelinesPageView('54');
                                                },true);
                });
            



















                $('#g155').on('pageshow', function (event, ui) {
                    document.addEventListener("deviceready", function(){
                        trackFullGuidelinesPageView('155');
                                                },true);
                });
            



















                $('#g195').on('pageshow', function (event, ui) {
                    document.addEventListener("deviceready", function(){
                        trackFullGuidelinesPageView('195');
                                                },true);
                });
            













                $('#g423').on('pageshow', function (event, ui) {
                    document.addEventListener("deviceready", function(){
                        trackFullGuidelinesPageView('423');
                                                },true);
                });
            







                $('#g411').on('pageshow', function (event, ui) {
                    document.addEventListener("deviceready", function(){
                        trackFullGuidelinesPageView('411');
                                                },true);
                });
            







                $('#g198').on('pageshow', function (event, ui) {
                    document.addEventListener("deviceready", function(){
                        trackFullGuidelinesPageView('198');
                                                },true);
                });
            







                $('#g12').on('pageshow', function (event, ui) {
                    document.addEventListener("deviceready", function(){
                        trackFullGuidelinesPageView('12');
                                                },true);
                });
            































                $('#g211').on('pageshow', function (event, ui) {
                    document.addEventListener("deviceready", function(){
                        trackFullGuidelinesPageView('211');
                                                },true);
                });
            







                $('#g46').on('pageshow', function (event, ui) {
                    document.addEventListener("deviceready", function(){
                        trackFullGuidelinesPageView('46');
                                                },true);
                });
            







                $('#g335').on('pageshow', function (event, ui) {
                    document.addEventListener("deviceready", function(){
                        trackFullGuidelinesPageView('335');
                                                },true);
                });
            



















                $('#g75').on('pageshow', function (event, ui) {
                    document.addEventListener("deviceready", function(){
                        trackFullGuidelinesPageView('75');
                                                },true);
                });
            







                $('#g340').on('pageshow', function (event, ui) {
                    document.addEventListener("deviceready", function(){
                        trackFullGuidelinesPageView('340');
                                                },true);
                });
            







                $('#g397').on('pageshow', function (event, ui) {
                    document.addEventListener("deviceready", function(){
                        trackFullGuidelinesPageView('397');
                                                },true);
                });
            







                $('#g34').on('pageshow', function (event, ui) {
                    document.addEventListener("deviceready", function(){
                        trackFullGuidelinesPageView('34');
                                                },true);
                });
            







                $('#g38').on('pageshow', function (event, ui) {
                    document.addEventListener("deviceready", function(){
                        trackFullGuidelinesPageView('38');
                                                },true);
                });
            







                $('#g323').on('pageshow', function (event, ui) {
                    document.addEventListener("deviceready", function(){
                        trackFullGuidelinesPageView('323');
                                                },true);
                });
            



















                $('#g383').on('pageshow', function (event, ui) {
                    document.addEventListener("deviceready", function(){
                        trackFullGuidelinesPageView('383');
                                                },true);
                });
            













                $('#g48').on('pageshow', function (event, ui) {
                    document.addEventListener("deviceready", function(){
                        trackFullGuidelinesPageView('48');
                                                },true);
                });
            













                $('#g178').on('pageshow', function (event, ui) {
                    document.addEventListener("deviceready", function(){
                        trackFullGuidelinesPageView('178');
                                                },true);
                });
            







                $('#g71').on('pageshow', function (event, ui) {
                    document.addEventListener("deviceready", function(){
                        trackFullGuidelinesPageView('71');
                                                },true);
                });
            







                $('#g229').on('pageshow', function (event, ui) {
                    document.addEventListener("deviceready", function(){
                        trackFullGuidelinesPageView('229');
                                                },true);
                });
            







                $('#g134').on('pageshow', function (event, ui) {
                    document.addEventListener("deviceready", function(){
                        trackFullGuidelinesPageView('134');
                                                },true);
                });
            













                $('#g78').on('pageshow', function (event, ui) {
                    document.addEventListener("deviceready", function(){
                        trackFullGuidelinesPageView('78');
                                                },true);
                });
            







                $('#g36').on('pageshow', function (event, ui) {
                    document.addEventListener("deviceready", function(){
                        trackFullGuidelinesPageView('36');
                                                },true);
                });
            







                $('#g96').on('pageshow', function (event, ui) {
                    document.addEventListener("deviceready", function(){
                        trackFullGuidelinesPageView('96');
                                                },true);
                });
            







                $('#g391').on('pageshow', function (event, ui) {
                    document.addEventListener("deviceready", function(){
                        trackFullGuidelinesPageView('391');
                                                },true);
                });
            







                $('#g243').on('pageshow', function (event, ui) {
                    document.addEventListener("deviceready", function(){
                        trackFullGuidelinesPageView('243');
                                                },true);
                });
            







                $('#g95').on('pageshow', function (event, ui) {
                    document.addEventListener("deviceready", function(){
                        trackFullGuidelinesPageView('95');
                                                },true);
                });
            













                $('#g55').on('pageshow', function (event, ui) {
                    document.addEventListener("deviceready", function(){
                        trackFullGuidelinesPageView('55');
                                                },true);
                });
            







                $('#g200').on('pageshow', function (event, ui) {
                    document.addEventListener("deviceready", function(){
                        trackFullGuidelinesPageView('200');
                                                },true);
                });
            



















                $('#g50').on('pageshow', function (event, ui) {
                    document.addEventListener("deviceready", function(){
                        trackFullGuidelinesPageView('50');
                                                },true);
                });
            







                $('#g67').on('pageshow', function (event, ui) {
                    document.addEventListener("deviceready", function(){
                        trackFullGuidelinesPageView('67');
                                                },true);
                });
            







                $('#g183').on('pageshow', function (event, ui) {
                    document.addEventListener("deviceready", function(){
                        trackFullGuidelinesPageView('183');
                                                },true);
                });
            







                $('#g209').on('pageshow', function (event, ui) {
                    document.addEventListener("deviceready", function(){
                        trackFullGuidelinesPageView('209');
                                                },true);
                });
            







                $('#g271').on('pageshow', function (event, ui) {
                    document.addEventListener("deviceready", function(){
                        trackFullGuidelinesPageView('271');
                                                },true);
                });
            













                $('#g135').on('pageshow', function (event, ui) {
                    document.addEventListener("deviceready", function(){
                        trackFullGuidelinesPageView('135');
                                                },true);
                });
            













                $('#g355').on('pageshow', function (event, ui) {
                    document.addEventListener("deviceready", function(){
                        trackFullGuidelinesPageView('355');
                                                },true);
                });
            







                $('#g126').on('pageshow', function (event, ui) {
                    document.addEventListener("deviceready", function(){
                        trackFullGuidelinesPageView('126');
                                                },true);
                });
            







                $('#g205').on('pageshow', function (event, ui) {
                    document.addEventListener("deviceready", function(){
                        trackFullGuidelinesPageView('205');
                                                },true);
                });
            







                $('#g374').on('pageshow', function (event, ui) {
                    document.addEventListener("deviceready", function(){
                        trackFullGuidelinesPageView('374');
                                                },true);
                });
            













                $('#g141').on('pageshow', function (event, ui) {
                    document.addEventListener("deviceready", function(){
                        trackFullGuidelinesPageView('141');
                                                },true);
                });
            







                $('#g286').on('pageshow', function (event, ui) {
                    document.addEventListener("deviceready", function(){
                        trackFullGuidelinesPageView('286');
                                                },true);
                });
            







                $('#g416').on('pageshow', function (event, ui) {
                    document.addEventListener("deviceready", function(){
                        trackFullGuidelinesPageView('416');
                                                },true);
                });
            







                $('#g104').on('pageshow', function (event, ui) {
                    document.addEventListener("deviceready", function(){
                        trackFullGuidelinesPageView('104');
                                                },true);
                });
            













                $('#g119').on('pageshow', function (event, ui) {
                    document.addEventListener("deviceready", function(){
                        trackFullGuidelinesPageView('119');
                                                },true);
                });
            







                $('#g282').on('pageshow', function (event, ui) {
                    document.addEventListener("deviceready", function(){
                        trackFullGuidelinesPageView('282');
                                                },true);
                });
            







                $('#g193').on('pageshow', function (event, ui) {
                    document.addEventListener("deviceready", function(){
                        trackFullGuidelinesPageView('193');
                                                },true);
                });
            













                $('#g80').on('pageshow', function (event, ui) {
                    document.addEventListener("deviceready", function(){
                        trackFullGuidelinesPageView('80');
                                                },true);
                });
            







                $('#g57').on('pageshow', function (event, ui) {
                    document.addEventListener("deviceready", function(){
                        trackFullGuidelinesPageView('57');
                                                },true);
                });
            







                $('#g370').on('pageshow', function (event, ui) {
                    document.addEventListener("deviceready", function(){
                        trackFullGuidelinesPageView('370');
                                                },true);
                });
            







                $('#g58').on('pageshow', function (event, ui) {
                    document.addEventListener("deviceready", function(){
                        trackFullGuidelinesPageView('58');
                                                },true);
                });
            













                $('#g94').on('pageshow', function (event, ui) {
                    document.addEventListener("deviceready", function(){
                        trackFullGuidelinesPageView('94');
                                                },true);
                });
            







                $('#g20').on('pageshow', function (event, ui) {
                    document.addEventListener("deviceready", function(){
                        trackFullGuidelinesPageView('20');
                                                },true);
                });
            













                $('#g43').on('pageshow', function (event, ui) {
                    document.addEventListener("deviceready", function(){
                        trackFullGuidelinesPageView('43');
                                                },true);
                });
            







                $('#g224').on('pageshow', function (event, ui) {
                    document.addEventListener("deviceready", function(){
                        trackFullGuidelinesPageView('224');
                                                },true);
                });
            







                $('#g375').on('pageshow', function (event, ui) {
                    document.addEventListener("deviceready", function(){
                        trackFullGuidelinesPageView('375');
                                                },true);
                });
            



















                $('#g144').on('pageshow', function (event, ui) {
                    document.addEventListener("deviceready", function(){
                        trackFullGuidelinesPageView('144');
                                                },true);
                });
            







                $('#g365').on('pageshow', function (event, ui) {
                    document.addEventListener("deviceready", function(){
                        trackFullGuidelinesPageView('365');
                                                },true);
                });
            







                $('#g13').on('pageshow', function (event, ui) {
                    document.addEventListener("deviceready", function(){
                        trackFullGuidelinesPageView('13');
                                                },true);
                });
            













                $('#g117').on('pageshow', function (event, ui) {
                    document.addEventListener("deviceready", function(){
                        trackFullGuidelinesPageView('117');
                                                },true);
                });
            







                $('#g318').on('pageshow', function (event, ui) {
                    document.addEventListener("deviceready", function(){
                        trackFullGuidelinesPageView('318');
                                                },true);
                });
            













                $('#g373').on('pageshow', function (event, ui) {
                    document.addEventListener("deviceready", function(){
                        trackFullGuidelinesPageView('373');
                                                },true);
                });
            







                $('#g231').on('pageshow', function (event, ui) {
                    document.addEventListener("deviceready", function(){
                        trackFullGuidelinesPageView('231');
                                                },true);
                });
            







                $('#g331').on('pageshow', function (event, ui) {
                    document.addEventListener("deviceready", function(){
                        trackFullGuidelinesPageView('331');
                                                },true);
                });
            













                $('#g292').on('pageshow', function (event, ui) {
                    document.addEventListener("deviceready", function(){
                        trackFullGuidelinesPageView('292');
                                                },true);
                });
            







                $('#g239').on('pageshow', function (event, ui) {
                    document.addEventListener("deviceready", function(){
                        trackFullGuidelinesPageView('239');
                                                },true);
                });
            







                $('#g296').on('pageshow', function (event, ui) {
                    document.addEventListener("deviceready", function(){
                        trackFullGuidelinesPageView('296');
                                                },true);
                });
            







                $('#g63').on('pageshow', function (event, ui) {
                    document.addEventListener("deviceready", function(){
                        trackFullGuidelinesPageView('63');
                                                },true);
                });
            







                $('#g384').on('pageshow', function (event, ui) {
                    document.addEventListener("deviceready", function(){
                        trackFullGuidelinesPageView('384');
                                                },true);
                });
            

























                $('#g162').on('pageshow', function (event, ui) {
                    document.addEventListener("deviceready", function(){
                        trackFullGuidelinesPageView('162');
                                                },true);
                });
            



















                $('#g85').on('pageshow', function (event, ui) {
                    document.addEventListener("deviceready", function(){
                        trackFullGuidelinesPageView('85');
                                                },true);
                });
            



















                $('#g342').on('pageshow', function (event, ui) {
                    document.addEventListener("deviceready", function(){
                        trackFullGuidelinesPageView('342');
                                                },true);
                });
            







                $('#g267').on('pageshow', function (event, ui) {
                    document.addEventListener("deviceready", function(){
                        trackFullGuidelinesPageView('267');
                                                },true);
                });
            







                $('#g194').on('pageshow', function (event, ui) {
                    document.addEventListener("deviceready", function(){
                        trackFullGuidelinesPageView('194');
                                                },true);
                });
            







                $('#g417').on('pageshow', function (event, ui) {
                    document.addEventListener("deviceready", function(){
                        trackFullGuidelinesPageView('417');
                                                },true);
                });
            

var appData = { "version":"1.0.9", "build":"21", "buildDate":"6/13/2013 ", "stdDataDate":"8/9/2012"};

function trackPageView (section, page)
{
        // console.log("In trackPageView");

		// these first vars change most often depending on version and if debug is true
		var appVersion = appData.version + "." + appData.build;
		var debug = false;
		var debugLocal = false;
		var cdcServer = "http://tools.cdc.gov/metrics.aspx?";
		var localServer = "http://192.168.0.101:8989/metrics?";

		// server information 
		var server = debugLocal ? localServer : cdcServer;
        // console.log("server = " + server);
		
		// device info from PhoneGap
        var deviceModel = device.model;
		var deviceOsName = device.platform;
		var deviceOsVers = device.version;
		var deviceParams = "c54=" + deviceOsName + "&c55=" + deviceOsVers + "&c56=" + deviceModel;
        // console.log("deviceParams = " + deviceParams);
		
		// application info
		var appInfoParams = "c53=" + appVersion;
		
		// page information
		var pageName = "contenttitle=" + section + ":" + page;
        // console.log(pageName);
        
        var sectionInfo = "c59=" + section;
		
		// device online status
		var networkStatus = null;
		var networkState = navigator.connection.type;
        // console.log("networkState = " + networkState);

        // device network state
		if (networkState == Connection.NONE)
			networkStatus = "0";
		else
			networkStatus = "1";
		var deviceOnline = "c57=" + networkStatus;
		
		var commonConstParams = "c8=Mobile App&c51=Standalone&c52=STD Guide&c5=eng&channel=IRDA&c58=Content: Browse";
		var prodConstParams = "reportsuite=cdcsynd";
		var debugConstParams = "reportsuite=devcdc";
		var constParams = (debug ? debugConstParams : prodConstParams) + "&" + commonConstParams;
        // console.log("constParams = " + constParams);

		var metricUrl = server + constParams + "&" + deviceParams + "&" + appInfoParams + "&" + deviceOnline + "&" + sectionInfo + "&" + pageName;
		metricUrl = encodeURI(metricUrl);
        // console.log("metric URL = " + metricUrl);
        
        $.get(metricUrl);

}

function trackFullGuidelinesPageView(page)
{
	var section = "Full Guidelines";
	trackPageView (section, page);

}

function trackMainMenuPageView()
{

	var section = "Main Menu";
	trackPageView (section, '1');

}

function trackConditionQuickPickDxTxPageView(dxTxPageId)
{
	var qpSection = "Condition Quick Pick: DxTx";
	trackPageView (qpSection, dxTxPageId);

}

function trackConditionQuickPickTreatmentPageView(treatmentPageId)
{
	var qpSection = "Condition Quick Pick: Treatment";
	trackPageView (qpSection, treatmentPageId);

}

function trackAboutUsPageView()
{
	var section = "About Us";
	trackPageView (section, '1');

}


function trackHistoryPdfPageView()
{
	var section = "Taking a Sexual History PDF";
	trackPageView (section, '1');

}

function trackReferencesPageView(page)
{
	var section = "References";
	trackPageView (section, page);

}

function trackTermsPageView(page)
{
	var section = "Terms and Abbreviations";
	trackPageView (section, page);

}

function trackEulaPageView()
{
	var section = "EULA";
	trackPageView (section, '1');
    
}

function doesStringEndWith(myString, stringCheck)
{
    var foundIt = (myString.lastIndexOf(stringCheck) === myString.length - stringCheck.length) > 0;
    return foundIt;
}
function openLink(newUrl)
{

    // console.log("opening link...");
	if (doesStringEndWith(newUrl, ".pdf")) {
        // console.log("opening PDF link...");
   		openPdfLink(newUrl);
	} else {
        // console.log("opening non-PDF link...");
	    var ref = window.open(newUrl, '_blank', 'location=yes');
	}

    return event.preventDefault();
    
}

function openPdfLink(newUrl)
{
	var devicePlatform = device.platform;
	// console.log("opening PDF at " + newUrl);
	
	if (devicePlatform === "Android") {
		// console.log("opening PDF on Android");
    	var ref = window.open(newUrl, '_system', 'location=yes');
    } else {
		// console.log("opening PDF on iOS");
    	var ref = window.open(newUrl, '_blank', 'location=yes');  
    }
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









                $('#terms1').on('pageshow', function (event, ui) {
                    document.addEventListener("deviceready", function(){
                    trackTermsPageView(1);
                },true);
            });
            
