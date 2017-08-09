
﻿		function docready() {
			//Bind events to buttons
			$("#pushbutton").touchstart(function(){$("#pushbutton").attr("src","Button2.png");});
			$("#pushbutton").touchend(function(){$("#pushbutton").attr("src","Button.png")});
			$("#pushbutton").click(function(){ getPostion(); });
			$("#logoutbtn").click(function(){ OnLogOut(); });
			$("#Timebtn").click(function(){ OnTimeButton(); });
			$("#Taskbtn").click(function(){ OnTaskButton(); });

			$("#senddata").click(function(){
				console.log('senddata called');
				$("#info").fadeOut("fast");
				getPostion();
			});
			$("#senddata2").click(function(){
				console.log('senddata called');
				$("#info").fadeOut("fast");
				getPostion2();
			});
			
			$("#savedata").click(function(){
				saveDeskname($("#setdesknam").val());
				$("#settings").fadeOut("fast");
				$("#header1").fadeIn("fast");
				$("#logoutbtn").fadeIn("fast");
				OnTaskButton();
			});

			$("#settingsbtn").click(function(){
				OnSettingsButton();
			});	
			
			//manage Page
			$("#logoutbtn").fadeOut("fast");
			$("#result").fadeOut("fast");
			$("#myfooter").fadeOut("fast");
			$("#settingsbtn").fadeOut("fast");
		}


		function OnSettingsButton() {
   			$("#fsclogin").fadeOut("fast");
			$("#appcontent").fadeOut("fast");
			$("#header1").fadeOut("fast");
			$("#myfooter").fadeOut("fast");
			$("#info").fadeOut("fast");
			$("#settings").fadeIn("fast");
	        $("#setdesknam").val(window.localStorage.getItem("ptplanobjaddress"));
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
			$("#settingsbtn").fadeIn("fast");
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
			var deskname=window.localStorage.getItem("ptplanobjaddress");
			if (deskname=="" || deskname==null) { OnSettingsButton();}
			else {
			$("#logoutbtn").fadeIn("fast");
			$("#info").fadeOut("fast");
			$("#timepushbutton").fadeOut("fast");
			$("#taskform").fadeIn("fast");
			$("#result").fadeIn("fast");
			$("#settingsbtn").fadeIn("fast");
	        $("#setdesknam").val(deskname);
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
	
		
		function onPosError(error) {
			console.log('onPosError code: '    + error.code    + '\t' +
                'message: ' + error.message);
			curpos = {"coords": {"latitude": 0, "longitude": 0, "accuracy": 99999999}};
			createtimePair(window.localStorage.getItem("ptplanobjaddress"), curpos)
		};
		function onPosError2(error) {
			console.log('onPosError code: '    + error.code    + '\t' +
                'message: ' + error.message);
			curpos = {"coords": {"latitude": 0, "longitude": 0, "accuracy": 99999999}};
			createIdea(window.localStorage.getItem("ptplanobjaddress"), curpos)
		};
		
		function onPosSuccess(position) {
			console.log('onPosSuccess called');
			createtimePair(window.localStorage.getItem("ptplanobjaddress"), position)
        };
		function onPosSuccess2(position) {
			console.log('onPosSuccess called');
			createIdea(window.localStorage.getItem("ptplanobjaddress"), position)
        };
		
		function getPostion() {
			console.log('getPostion called');
			navigator.geolocation.getCurrentPosition(onPosSuccess, onPosError);
		};
		function getPostion2() {
			console.log('getPostion called');
			navigator.geolocation.getCurrentPosition(onPosSuccess2, onPosError2);
		};
		
		/*Create a Complaint */
		function createtimePair(desknam, curpos) {
			console.log("createtimePair called: desknam=" + desknam + " curpos=" + curpos.coords.latitude);
			$("#result").fadeIn("fast");
			var compl=$("#claim").val();
			var involve=$("#involve").attr("checked");
			var boolinvolve=$('#involve').is(':checked');
			//if (involve=="checked") {boolinvolve=true;}
			console.log("createtimePair checkbox: checked=" + involve);
			console.log("createtimePair checkbox: checked=" + boolinvolve);
			var complshort=$("#shortclaim").val();
			var firstname=$("#firstname").val();
			var lastname=$("#lastname").val();
			var emailaddr=$("#emailaddr").val();
			var timepairJSONobj = {
				planobjaddress: desknam,
				thecomplaint: compl,
				shortcomplaint: complshort,
				involveme: boolinvolve,
				img: null,
				firstname: firstname,
				lastname: lastname,
				emailaddr: emailaddr,
				lat: curpos.coords.latitude,
				lng: curpos.coords.longitude,
				accuaracy: curpos.coords.accuracy
			};	
			$.ajax({
			  type: "POST",
			  //url: 'https://folio.fabasoft.com/dev5/vm171/folio/wsjson/FROGUEMEASUREMGMT_111_100_MGMTwebservice/AddComplaint',
			  url: 'https://folio.fabasoft.com/folio/wsjson/FROGUEMEASUREMGMT_111_100_MGMTwebservice/AddComplaint',
              dataType: 'jsonp',				
              jsonp: "jsonp",					// Making a JSONP Request
			  data: timepairJSONobj,			// Adding Data
              success: function(data) {
				console.log('ajax Success called');
				$("#result").html(data.answer);
              },
			  error: function(error) {
				console.log('ajax erorr called: ' + error);
				$("#result").html(error);
			  }
           });					
		}

		/*Create an Idea */
		function createIdea(desknam, curpos) {
			console.log("createIdea called: desknam=" + desknam + " curpos=" + curpos.coords.latitude);
			$("#result").fadeIn("fast");
			var shortidea=$("#shortidea").val();
			//if (involve=="checked") {boolinvolve=true;}
			var idea=$("#idea").val();
			var impact=$("#impact").val();
			var situation=$("#situation").val();
			var firstname=$("#firstname2").val();
			var lastname=$("#lastname2").val();
			var emailaddr=$("#emailaddr2").val();
			console.log("createIdea: idea=" + idea);
			console.log("createIdea: impact=" + impact);
			console.log("createIdea: situation=" + situation);
			var ideaJSONobj = {
				planobjaddress: desknam,
				theidea: idea,
				thesituation: situation,
				theimpact: impact,
				shortdesc: shortidea,
				firstname: firstname,
				lastname: lastname,
				emailaddr: emailaddr,
				lat: curpos.coords.latitude,
				lng: curpos.coords.longitude,
				accuaracy: curpos.coords.accuracy
			};	
			$.ajax({
			  type: "POST",
//			  url: 'https://folio.fabasoft.com/dev5/vm171/folio/wsjson/FROGUEMEASUREMGMT_111_100_MGMTwebservice/AddIdea',
			  url: 'https://folio.fabasoft.com/folio/wsjson/FROGUEMEASUREMGMT_111_100_MGMTwebservice/AddIdea',
              dataType: 'jsonp',				
              jsonp: "jsonp",					// Making a JSONP Request
			  data: ideaJSONobj,			// Adding Data
              success: function(data) {
				console.log('ajax Success called');
				$("#result").html(data.answer);
              },
			  error: function(error) {
				console.log('ajax erorr called: ' + error);
				$("#result").html(error);
			  }
           });					
		}		
		/*Save deskname in html5 local storage*/
	    function saveDeskname(deskname) {
            console.log("Deskname in html5storage " + deskname);
    	    window.localStorage.setItem("ptplanobjaddress", deskname);
			//window.location.href="#home";
    	}
	    

	function onDeviceReady() {
			//navigator.splashscreen.show();
			//docready();
    };







		
	document.addEventListener("deviceready", onDeviceReady, false);
	var planobjaddr="COO.200.200.3.142";


    $(document).ready(function() {
//		fsc.authentication.options.hostname = "https://vde.fabasoft.com/dev5/vm171/folio/";
		fsc.authentication.options.hostname = "https://at.folio.fabasoft.com/folio/";
		fsc.authentication.options.loginpath = "fscasp/content/bin/fscvext.dll?ax=COO.1.1001.1.334515&motoky_loginmode=mobile&motoky_hidelogin=registration";
       	fsc.authentication.init();
       	fsc.authentication.login("fsclogin"); 
       	fsc.authentication.options.logincallback = OnLoginCallbackFunction;
       	fsc.authentication.options.logoutcallback = OnLogoutCallbackFunction;
			

		docready();
			
	});

	$(document).on('pageshow','#settings', function() {
		var deskname = window.localStorage.getItem("ptplanobjaddress");
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
		            	window.setTimeout(fsc.authentication.login, 1000);
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
