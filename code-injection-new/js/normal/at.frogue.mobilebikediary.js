
﻿		function docready() {
			//Bind events to buttons
			$("#pushbutton").touchstart(function(){$("#pushbutton").attr("src","Button2.png");});
			$("#pushbutton").touchend(function(){$("#pushbutton").attr("src","Button.png")});
			$("#pushbutton").click(function(){ OnPushButtonClick(); });
			$("#logoutbtn").click(function(){ OnLogOut(); });
			$("#Timebtn").click(function(){ OnTimeButton(); });
			$("#Taskbtn").click(function(){ OnTaskButton(); });
			$("#senddata").click(function(){OnPushButtonClick(); });
			
			$("#savedata").click(function(){
				saveDeskname($("#setdesknam").val());
				saveDefaultdistance($("#defaultdistance").val());
				$("#settings").fadeOut("fast");
				$("#header1").fadeIn("fast");
				$("#logoutbtn").fadeIn("fast");
				OnTimeButton();
			});

			$("#settingsbtn").click(function(){
				OnSettingsButton();
			});	
			
			//manage Page
			$("#logoutbtn").fadeOut("fast");
			$("#result").fadeIn("fast");
			$("#myfooter").fadeOut("fast");
			$("#settingsbtn").fadeOut("fast");
		}

		function OnPushButtonClick() {
				console.log('senddata called');
				$("#info").fadeOut("fast");
				var mydistance=$("#distance").val();
				var diaryaddress=$("#setdesknam").val();
				createRide(diaryaddress, mydistance);
		}
		
		function getDefaults(mycampaignaddress) {
			console.log('getDiaryAddress called: campaddress=' + mycampaignaddress);
			var diaryaddrJSONobj = {
				campaignaddress: mycampaignaddress,
			};	
			$.ajax({
			  type: "POST",
			  url: 'https://folio.fabasoft.com/folio/wsjson/MJWBICYCLEDIARY_111_100_WebServiceBicycleDiary/WSGetUserDiaryForCampaign',
              dataType: 'jsonp',				
              jsonp: "jsonp",					// Making a JSONP Request
			  data: diaryaddrJSONobj,			// Adding Data
              success: function(data) {
				console.log('ajax Success called diary ' + data.result.wsbdiobjaddress);
				saveDeskname(data.result.wsbdiobjaddress);
				saveDefaultdistance(data.result.wsbdidailydistancetemplate);
              },
			  error: function(error) {
				console.log('ajax erorr called: ' + error);
				//$("#result").html(error);
			  }
           });				
		}

		function getCampaigninfo(mycampaignaddress) {
			console.log('getDiaryAddress called: campaddress=' + mycampaignaddress);
			var campaddrJSONobj = {
				campaignaddress: mycampaignaddress,
			};	
			$.ajax({
			  type: "POST",
			  url: 'https://folio.fabasoft.com/folio/wsjson/MJWBICYCLEDIARY_111_100_WebServiceBicycleDiary/WSGetCampaignInfo',
              dataType: 'jsonp',				
              jsonp: "jsonp",					// Making a JSONP Request
			  data: campaddrJSONobj,			// Adding Data
              success: function(data) {
				var now = new Date();
				var tilldate = new Date(data.result.wsbciuntil);
				var fromdate = new Date(data.result.wsbcifrom);
				console.log('ajax Success called now ' + now);
				console.log('ajax Success called tilldate ' + tilldate);
				console.log('ajax Success called fromdate ' + fromdate);
				console.log('ajax Success called active ' + data.result.wsbciisactive);
				if (now > tilldate || now < fromdate || data.result.wsbciisactive != true) {
					$("#timepushbutton").fadeOut(true);
					$("#result").html("Radaktion nicht mehr aktiv");
				}
              },
			  error: function(error) {
				console.log('ajax erorr called: ' + error);
				//$("#result").html(error);
			  }
           });				
		}		
		
		function OnSettingsButton() {
   			$("#fsclogin").fadeOut("fast");
			$("#appcontent").fadeOut("fast");
			$("#header1").fadeOut("fast");
			$("#myfooter").fadeOut("fast");
			$("#info").fadeOut("fast");
			$("#settings").fadeIn("fast");
	        $("#setdesknam").val(window.localStorage.getItem("ptdiaryaddress"));
	        $("#defaultdistance").val(window.localStorage.getItem("ptdistance"));
			
			$("#settings").show();
		}
		
		function OnTimeButton() {
   			$("#fsclogin").fadeOut("fast");
			$("#result").fadeIn("fast");			
			$("#info").fadeOut("fast");
			$("#taskform").fadeOut("fast");
   			$("#appcontent").fadeIn("fast");
   			$("#timepushbutton").fadeIn("fast");
			$("#settingsbtn").fadeIn("fast");
			$("#myfooter").fadeIn("fast");
		}
		function OnTaskButton() {
   			$("#fsclogin").fadeOut("fast");
			$("#result").fadeOut("fast");			
			$("#info").fadeOut("fast");
   			$("#timepushbutton").fadeOut("fast");
   			$("#appcontent").fadeIn("fast");
   			$("#taskform").fadeIn("fast");
			//$("#settingsbtn").fadeIn("fast");
			$("#myfooter").fadeIn("fast");
		}
		
		function OnLogOut() {
			fsc.authentication.logout("fsclogin");
   			$("#appcontent").fadeOut("fast");
			$("#settingsbtn").fadeOut("fast");
   			$("#info").fadeIn("fast");
   			$("#myfooter").fadeOut("fast");
   			$("#fsclogin").fadeIn("fast");
			fsc.authentication.logout("fsclogin");
		}
		
		/*
		Callback when logged in
		*/ 
		function OnLoginCallbackFunction(event) {
			console.log(event);
			getCampaigninfo(campaignaddr);
			getDefaults(campaignaddr);
			var diaryaddress=window.localStorage.getItem("ptdiaryaddress");
			var defaultdistance=window.localStorage.getItem("ptdistance");
			console.log(diaryaddress);
			console.log(defaultdistance);
			//window.localStorage.getItem("ptdiaryaddress")   window.localStorage.getItem("ptdistance");
			if (diaryaddress=="" || diaryaddress==null) { getDefaults(campaignaddr);}
			else {
			$("#logoutbtn").fadeIn("fast");
			$("#Timebtn").fadeOut("fast");
			$("#info").fadeOut("fast");
			$("#result").fadeIn("fast");
			//$("#settingsbtn").fadeIn("fast");
	        $("#setdesknam").val(diaryaddress);
	        $("#distance").val(defaultdistance);
			$("#fsclogin").fadeOut("fast");
			$("#appcontent").fadeIn("fast");
			$("#myfooter").fadeIn("fast");
			}
		}; 

		/*
		Callback when logged out
		*/ 
		function OnLogoutCallbackFunction(event) {
			console.log(event);
			/*$("#logoutbtn").fadeOut("fast");
			$("#settingsbtn").fadeOut("fast");
   			$("#appcontent").fadeOut("fast");
   			$("#myfooter").fadeOut("fast");
   			$("#info").fadeIn("fast");
   			$("#fsclogin").fadeIn("fast"); */
		}; 

		
		/*Create a Timepair */
		function createRide(mydiaryaddress, mydistance) {
			console.log('createRide called: diaryaddress=' + mydiaryaddress + ' dist=' + mydistance);
			$("#result").fadeIn("fast");
			var timepairJSONobj = {
				diaryaddress: mydiaryaddress,
				distance: mydistance,
			};	
			$.ajax({
			  type: "POST",
			  url: 'https://folio.fabasoft.com/folio/wsjson/MJWBICYCLEDIARY_111_100_WebServiceBicycleDiary/WSAddTripToBicycleDiarySimple',
              dataType: 'jsonp',				
              jsonp: "jsonp",					// Making a JSONP Request
			  data: timepairJSONobj,			// Adding Data
              success: function(data) {
				console.log('ajax Success called');
				var retcode=data.result;
				if (retcode=="1") {
					$("#result").html("<h1>Fahrt erfasst</h1>");
				}
				else if (retcode=="-1") {
					$("#result").html("<h1>Kein gültiges Radtagebuch einer aktiven Radaktion für den aktuellen Benutzer gefunden</h1>");
				}
				else if (retcode=="-3") {
					$("#result").html("<h1>Distanz ist nicht größer als 0</h1>");
				}
				else if (retcode=="-101") {
					$("#result").html("<h1>Maximum an erfassbaren Fahrten für diesen Tag überschritten</h1>");
				}
				else if (retcode=="-102") {
					$("#result").html("<h1>Erfassen einer Radfahrt für diesen Wochentag nicht erlaubt</h1>");
				}
				else if (retcode=="-103") {
					$("#result").html("<h1>Erfassen für diesen speziellen Tag nicht erlaubt (z.B. definierter Feiertag in der Radaktion)</h1>");
				}
				else if (retcode=="-104") {
					$("#result").html("<h1>Radkation ist noch nicht bzw. nicht mehr aktiv.</h1>");
				}
				else if (retcode=="-105") {
					$("#result").html("<h1>Erfassen von Fahrten in der Zukunft ist nicht erlaubt.</h1>");
				}
				else {
					$("#result").html("<h1>Fahrt NICHT erfasst</h1> - Fehler = " + retcode);
				}
              },
			  error: function(error) {
				console.log('ajax erorr called: ' + error);
				$("#result").html(error);
			  }
           });					
		}

		
		/*Save diaryaddress in html5 local storage*/
	    function saveDeskname(diaryaddress) {
            console.log("diaryaddress in html5storage " + diaryaddress);
    	    window.localStorage.setItem("ptdiaryaddress", diaryaddress);
			$("#distance").val(diaryaddress);
			//window.location.href="#home";
    	}
		/*Save diaryaddress in html5 local storage*/
	    function saveDefaultdistance(distance) {
            console.log("Distance in html5storage " + distance);
    	    window.localStorage.setItem("ptdistance", distance);
			$("#distance").val(distance);
			//window.location.href="#home";
    	}
	    

	function onDeviceReady() {
			//navigator.splashscreen.show();
			//docready();
    };

function docready() {
    //Bind events to buttons
    $("#pushbutton").touchstart(function(){$("#pushbutton").attr("src","Button2.png");});
    $("#pushbutton").touchend(function(){$("#pushbutton").attr("src","Button.png")});
    $("#pushbutton").click(function(){ OnPushButtonClick(); });
    $("#logoutbtn").click(function(){ OnLogOut(); });
    $("#Timebtn").click(function(){ OnTimeButton(); });
    $("#Taskbtn").click(function(){ OnTaskButton(); });
    
    $("#savedata").click(function(){
                         saveDeskname($("#setdesknam").val());
                         saveDefaultdistance($("#defaultdistance").val());
                         $("#settings").fadeOut("fast");
                         $("#header1").fadeIn("fast");
                         $("#logoutbtn").fadeIn("fast");
                         OnTimeButton();
                         });
    
    $("#settingsbtn").click(function(){
                            OnSettingsButton();
                            });
    
    //manage Page
    $("#logoutbtn").fadeOut("fast");
    $("#result").fadeIn("fast");
    $("#result").val("Willkommen Welcome Bienvenu Bienvenida");
    $("#myfooter").fadeOut("fast");
    $("#settingsbtn").fadeOut("fast");
}

function OnPushButtonClick() {
    console.log('senddata called');
    $("#info").fadeOut("fast");
    var mydistance=$("#distance").val();
    var diaryaddress=$("#setdesknam").val();
    createRide(diaryaddress, mydistance);
}

function getDefaults(mycampaignaddress) {
    console.log('getDefaults called: campaddress=' + mycampaignaddress);
    var diaryaddrJSONobj = {
    campaignaddress: mycampaignaddress,
    };
    $.ajax({
           type: "POST",
           url: 'https://folio.fabasoft.com/folio/wsjson/MJWBICYCLEDIARY_111_100_WebServiceBicycleDiary/WSGetUserDiaryForCampaign',
           dataType: 'jsonp',
           jsonp: "jsonp",					// Making a JSONP Request
           data: diaryaddrJSONobj,			// Adding Data
           success: function(data) {
           console.log('getDefaults ajax Success called diary ' + data.result.wsbdiobjaddress);
           saveDeskname(data.result.wsbdiobjaddress);
           saveDefaultdistance(data.result.wsbdidailydistancetemplate);
           },
           error: function(xhr,err) {
           console.log("getDefaults ajax erorr called readyState: "+xhr.readyState+"\nstatus: "+xhr.status);
           console.log("responseText: "+xhr.responseText);
           $("#result").html("<h2>getDefaults Error (Status/Text): " + xhr.status + "/" + xhr.responseText + "</h2>");
           if (xhr.status=="302" || xhr.status=="200") {ConnectionFail();}
           }
           });
}

function getCampaigninfo(mycampaignaddress) {
    console.log('getDiaryAddress called: campaddress=' + mycampaignaddress);
    var campaddrJSONobj = {
    campaignaddress: mycampaignaddress,
    };
    $.ajax({
           type: "POST",
           url: 'https://folio.fabasoft.com/folio/wsjson/MJWBICYCLEDIARY_111_100_WebServiceBicycleDiary/WSGetCampaignInfo',
           dataType: 'jsonp',
           jsonp: "jsonp",					// Making a JSONP Request
           data: campaddrJSONobj,			// Adding Data
           success: function(data) {
           var now = new Date();
           var tilldate = new Date(data.result.wsbciuntil);
           var fromdate = new Date(data.result.wsbcifrom);
           console.log('ajax Success called now ' + now);
           console.log('ajax Success called tilldate ' + tilldate);
           console.log('ajax Success called fromdate ' + fromdate);
           console.log('ajax Success called active ' + data.result.wsbciisactive);
           if (now > tilldate || now < fromdate || data.result.wsbciisactive != true) {
           $("#timepushbutton").fadeOut(true);
           $("#result").html("Radaktion nicht mehr aktiv");
           }
   		   $("#result").html("<h2>Willkommen bei " + data.result.wsbciobjname + "</h2> im "
		     + data.result.wsbciobjsubject);

           },
           error: function(xhr,err) {
           console.log("getDefaults ajax erorr called readyState: "+xhr.readyState+"\nstatus: "+xhr.status);
           console.log("responseText: "+xhr.responseText);
           $("#result").html("<h2>getDiaryAddress Error (Status/Text): " + xhr.status + "/" + xhr.responseText + "</h2>");
           if (xhr.status=="302" || xhr.status=="200") {ConnectionFail();}
           }
           });
}

function OnSettingsButton() {
    $("#fsclogin").fadeOut("fast");
    $("#appcontent").fadeOut("fast");
    $("#header1").fadeOut("fast");
    $("#myfooter").fadeOut("fast");
    $("#info").fadeOut("fast");
    $("#settings").fadeIn("fast");
    $("#setdesknam").val(window.localStorage.getItem("ptdiaryaddress"));
    $("#defaultdistance").val(window.localStorage.getItem("ptdistance"));
    
    $("#settings").show();
}

function OnTimeButton() {
    $("#fsclogin").fadeOut("fast");
    $("#result").fadeIn("fast");
    $("#info").fadeOut("fast");
    $("#taskform").fadeOut("fast");
    $("#appcontent").fadeIn("fast");
    $("#timepushbutton").fadeIn("fast");
    $("#settingsbtn").fadeIn("fast");
    $("#myfooter").fadeIn("fast");
}
function OnTaskButton() {
    $("#fsclogin").fadeOut("fast");
    $("#result").fadeOut("fast");
    $("#info").fadeOut("fast");
    $("#timepushbutton").fadeOut("fast");
    $("#appcontent").fadeIn("fast");
    $("#taskform").fadeIn("fast");
    //$("#settingsbtn").fadeIn("fast");
    $("#myfooter").fadeIn("fast");
}

function OnLogOut() {
    fsc.authentication.logout("fsclogin");
    $("#appcontent").fadeOut("fast");
    $("#settingsbtn").fadeOut("fast");
    $("#info").fadeIn("fast");
    $("#myfooter").fadeOut("fast");
    $("#fsclogin").fadeIn("fast");
    fsc.authentication.logout("fsclogin");
}

/*
 Callback when logged in
 */
function OnLoginCallbackFunction(event) {
    console.log(event);
    getCampaigninfo(campaignaddr);
    getDefaults(campaignaddr);
    var diaryaddress=window.localStorage.getItem("ptdiaryaddress");
    var defaultdistance=window.localStorage.getItem("ptdistance");
    console.log(diaryaddress);
    console.log(defaultdistance);
    //window.localStorage.getItem("ptdiaryaddress")   window.localStorage.getItem("ptdistance");
    if (diaryaddress=="" || diaryaddress==null) { getDefaults(campaignaddr);}
    
        $("#logoutbtn").fadeIn("fast");
        $("#Timebtn").fadeOut("fast");
        $("#info").fadeOut("fast");
        $("#result").fadeIn("fast");
        //$("#settingsbtn").fadeIn("fast");
        $("#setdesknam").val(diaryaddress);
        $("#distance").val(defaultdistance);
        $("#fsclogin").fadeOut("fast");
        $("#appcontent").fadeIn("fast");
        $("#myfooter").fadeIn("fast");
    
};

/*
 Callback when logged out
 */
function OnLogoutCallbackFunction(event) {
    console.log(event);
    /*$("#logoutbtn").fadeOut("fast");
     $("#settingsbtn").fadeOut("fast");
     $("#appcontent").fadeOut("fast");
     $("#myfooter").fadeOut("fast");
     $("#info").fadeIn("fast");
     $("#fsclogin").fadeIn("fast"); */
};


/*Create a Timepair */
function createRide(mydiaryaddress, mydistance) {
    console.log('createRide called: diaryaddress=' + mydiaryaddress + ' dist=' + mydistance);
    $("#result").fadeIn("fast");
    var timepairJSONobj = {
    diaryaddress: mydiaryaddress,
    distance: mydistance,
    };
    $.ajax({
           type: "POST",
           url: 'https://folio.fabasoft.com/folio/wsjson/MJWBICYCLEDIARY_111_100_WebServiceBicycleDiary/WSAddTripToBicycleDiarySimple',
           dataType: 'jsonp',
           jsonp: "jsonp",					// Making a JSONP Request
           data: timepairJSONobj,			// Adding Data
           success: function(data) {
           console.log('createRide ajax Success called');
           var retcode=data.result;
           console.log('createRide retcode=' + retcode);
           if (retcode=="1") {
           $("#result").html("<h1>Fahrt erfasst</h1>");
           }
           else if (retcode=="-1") {
           $("#result").html("<h1>Kein gültiges Radtagebuch einer aktiven Radaktion für den aktuellen Benutzer gefunden</h1>");
           }
           else if (retcode=="-3") {
           $("#result").html("<h1>Distanz ist nicht größer als 0</h1>");
           }
           else if (retcode=="-101") {
           $("#result").html("<h1>Maximum an erfassbaren Fahrten für diesen Tag überschritten</h1>");
           }
           else if (retcode=="-102") {
           $("#result").html("<h1>Erfassen einer Radfahrt für diesen Wochentag nicht erlaubt</h1>");
           }
           else if (retcode=="-103") {
           $("#result").html("<h1>Erfassen für diesen speziellen Tag nicht erlaubt (z.B. definierter Feiertag in der Radaktion)</h1>");
           }
           else if (retcode=="-104") {
           $("#result").html("<h1>Radkation ist noch nicht bzw. nicht mehr aktiv.</h1>");
           }
           else if (retcode=="-105") {
           $("#result").html("<h1>Erfassen von Fahrten in der Zukunft ist nicht erlaubt.</h1>");
           }
           else {
           $("#result").html("<h1>Fahrt NICHT erfasst</h1> - Fehler = " + retcode);
           }
           },
           error: function(xhr,err) {
           console.log("getDefaults ajax erorr called readyState: "+xhr.readyState+"\nstatus: "+xhr.status);
           console.log("responseText: "+xhr.responseText);
           $("#result").html("<h2>createRide Error (Status/Text): " + xhr.status + "/" + xhr.responseText + "</h2>");
           if (xhr.status=="302" || xhr.status=="200") {ConnectionFail();}
           }
           });
}


/*Save diaryaddress in html5 local storage*/
function saveDeskname(diaryaddress) {
    console.log("diaryaddress in html5storage " + diaryaddress);
    window.localStorage.setItem("ptdiaryaddress", diaryaddress);
    $("#setdesknam").val(diaryaddress);
    //window.location.href="#home";
}
/*Save diaryaddress in html5 local storage*/
function saveDefaultdistance(distance) {
    console.log("Distance in html5storage " + distance);
    window.localStorage.setItem("ptdistance", distance);
    $("#distance").val(distance);
    //window.location.href="#home";
}


function onDeviceReady() {
    //navigator.splashscreen.show();
    //docready();
};

function ConnectionFail() {
    console.log("->ConnectionFail");
    alert("Heavy Problem detected eg. Connection timed out or Network changed - you have to renew the login!");
    $("#logoutbtn").fadeOut("fast");
    $("#settingsbtn").fadeOut("fast");
    $("#appcontent").fadeOut("fast");
    $("#myfooter").fadeOut("fast");
    $("#fsclogin").fadeIn("fast");
    fsc.authentication.login("fsclogin");
}







                
                document.addEventListener("deviceready", onDeviceReady, false);
                var campaignaddr="COO.6505.100.2.4635169";
                
                $(document).ready(function() {
                                  fsc.authentication.options.hostname = "https://at.folio.fabasoft.com/folio/";
                                  //fsc.authentication.options.hostname = "https://vde.fabasoft.com/dev1/vm43/folio/";
                                  fsc.authentication.options.loginpath = "fscasp/content/bin/fscvext.dll?ax=COO.1.1001.1.334515&motoky_loginmode=mobile&motoky_hidelogin=registration";
                                  fsc.authentication.init();
                                  fsc.authentication.login("fsclogin");
                                  fsc.authentication.options.logincallback = OnLoginCallbackFunction;
                                  fsc.authentication.options.logoutcallback = OnLogoutCallbackFunction;
                                  
                                  
                                  docready();
                                  
                                  });
                
                $(document).on('pageshow','#settings', function() {
                               var deskname = window.localStorage.getItem("ptdiaryname");
                               $("#setdesknam").val(deskname);
                               console.log("Deskname restauriert ins Form " + deskname);
                               });
                

(function($){
	$.fn.extend({
		fsc: {
			authentication: {
				options: {
					hostname 	: "https://folio.fabasoft.com/folio/",
					loginpath	: "fscasp/content/bin/fscvext.dll?ax=COO.1.1001.1.334515",
					logoutpath	: "fscasp/content/bin/fscvext.dll?ax=COO.1.1001.1.334512",
					loginmessagekey : "loggedin",
					logoutmessagekey : "loggedout",
					loginmode	: "mobile",
					logincallback : null,
					logoutcallback : null,
					rendertargetid 	: 'fsc.authentication.login'
				},
				init: function fsc_init(_options) {
					this.options = $.extend(this.options, _options);
					this.attachPostNotificationEventListener();
				}, // fsc.authentication.init
				
				login: function fsc_login(targetid) {
					if (targetid!=null&&targetid.length>0) {
						fsc.authentication.options.rendertargetid = targetid;
					}
					var iframe = fsc.authentication.createIframe(fsc.authentication.options.loginpath, fsc.authentication.options.loginmessagekey, fsc.authentication.options.loginmode);
					$("#"+fsc.authentication.options.rendertargetid).html("");
					$("#"+fsc.authentication.options.rendertargetid).html(iframe);
				}, // fsc.authentication.login
				
				logout: function fsc_logout(targetid) {
					if (targetid!=null&&targetid.length>0) {
						fsc.authentication.options.rendertargetid = targetid;
					}
					var iframe = fsc.authentication.createIframe(fsc.authentication.options.logoutpath, fsc.authentication.options.logoutmessagekey, null, "display:none;");
					$("#"+fsc.authentication.options.rendertargetid).html("");
					$("#"+fsc.authentication.options.rendertargetid).html(iframe);
				},// fsc.authentication.logout
				
				createIframe: function fsc_createIframe(path, messagekey, mode, style, frameborder) {
					var iframe = $("<iframe></iframe>");
					var source = this.options.hostname + path + "&key="+messagekey;
					if (mode != null) {
						source += "&motoky_loginmode="+mode;
					}
					iframe.attr("src", source);
					if (style == null) {
						style = "width:320px; height:480px;"
					}
					iframe.attr("style", style);
					if (frameborder == null) {
						frameborder = 0;
					}
					iframe.attr("frameborder", frameborder);
					return iframe;
				}, // fsc.authentication.createIframe
				
				attachPostNotificationEventListener : function fsc_attachPostNotificationEventListener () {
					if (window.addEventListener) {  // all browsers except IE before version 9
		                window.addEventListener("message", this.postNotificationEventListener, false);
		            }
		            else {
		                if (window.attachEvent) {   // IE before version 9
		                    window.attachEvent("onmessage", this.postNotificationEventListener);
		                }
		            }
		            console.log("fsc.authentication.login attached postMessage event listener");
				}, // fsc.authentication.attachPostNotificationEventListener
				
				postNotificationEventListener: function fsc_postNotificationEventListener(event) {
		            console.log("fsc.authentication.postNotificationEventListener has been called with event", event);
		            if (event.data == fsc.authentication.options.loginmessagekey) {
		            	console.log("logged in");
		            	if (typeof fsc.authentication.options.logincallback == "function") {
		            		fsc.authentication.options.logincallback(event);
		            	}
		            }
		            if (event.data == fsc.authentication.options.logoutmessagekey) {
		            	console.log("logged out");
		            	window.setTimeout(fsc.authentication.login, 2000);
		            	if (typeof fsc.authentication.options.logoutcallback == "function") {
		            		fsc.authentication.options.logoutcallback(event);
		            	}
		            }
				}, // fsc.authentication.postNotificationEventListener
			}	
		}
	});

  })( jQuery );



(function($) {

  if (!window.fsc) {

    window.fsc = $().fsc;

  }

}(jQuery));







		
	document.addEventListener("deviceready", onDeviceReady, false);
	var campaignaddr="COO.200.200.4.1708";

    $(document).ready(function() {
		fsc.authentication.options.hostname = "https://at.folio.fabasoft.com/folio/";
		//fsc.authentication.options.hostname = "https://vde.fabasoft.com/dev1/vm43/folio/";
		fsc.authentication.options.loginpath = "fscasp/content/bin/fscvext.dll?ax=COO.1.1001.1.334515&motoky_loginmode=mobile&motoky_hidelogin=registration";
       	fsc.authentication.init();
       	fsc.authentication.login("fsclogin"); 
       	fsc.authentication.options.logincallback = OnLoginCallbackFunction;
       	fsc.authentication.options.logoutcallback = OnLogoutCallbackFunction;
			

		docready();
			
	});

	$(document).on('pageshow','#settings', function() {
		var deskname = window.localStorage.getItem("ptdiaryname");
		$("#setdesknam").val(deskname);
		console.log("Deskname restauriert ins Form " + deskname);
	});
    
