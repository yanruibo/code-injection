
		function docready() {
            language_complete = navigator.language.split("-");
            console.log("Sprache (complete): %s", language_complete);
            language = (language_complete[0]);
            console.log("Sprache (root): %s", language);
            $("#appcontent").fadeOut("fast");
			$("#settingsbtn").fadeOut("fast");
   			$("#info").fadeIn("fast");
   			$("#myfooter").fadeOut("fast");
   			$("#fsclogin").fadeIn("fast");

            i18n.init({ lng: language, debug: true }, function() {
                      // save to use translation function as resources are fetched
                      $("#msg_apptitle").i18n();
                      $("#msg_apptitle2").i18n();
                      $("#Timebtn").i18n();
                      $("#Taskbtn").i18n();
                      $("#logoutbtn").i18n();
                      $("#settingsbtn").i18n();
                      $("#savedata").i18n();
                      $("#lblproject").i18n();
                      $("#lblwrkpackage").i18n();
                      $("#lblactivity").i18n();
                      $("#lblactivitytype").i18n();
                      $("#lblfrom").i18n();
                      $("#lbltill").i18n();
                      $("#lblremarks").i18n();
                      $("#addactivitybtn").i18n();
                      $("#info").i18n();
                      $("#msg_takstitle").i18n();
                      
                      });
			
            //Bind events to buttons
			$("#pushbutton").touchstart(function(){$("#pushbutton").attr("src","Button2.png");});
			$("#pushbutton").touchend(function(){$("#pushbutton").attr("src","Button.png")});
			$("#pushbutton").click(function(){ getPostion(); });
			$("#addactivitybtn").click(function(){
				var curprj = $("#project").val();
				var curwp = $("#workpackage").val();
				var curtask = $("#activity").val();
				var curtype = $("#activitytype").val();
				var curfrom = $("#datefrom").val();
				var curtill = $("#datetill").val();
				var curremarks = $("#remarks").val();
				//console.log('Holla! ' + curprj + curwp + curtask + curtype + curfrom + curtill + curremarks) ;
				AddActivity(curprj, curwp, curtask, curtype, curfrom, curtill, curremarks);
				$("#result").fadeIn("fast");
				//OnTimeButton();			
			});
			
			$("#logoutbtn").click(function(){ OnLogOut(); });
			$("#Timebtn").click(function(){ OnTimeButton(); });
			$("#Taskbtn").click(function(){ OnTaskButton(); });
			$("#project").change(function(){ 
				var curvalue = $("#project").val();
				console.log(curvalue);
				getProjectWPs(curvalue);
				getProjectsActTypes(curvalue);
			});
			$("#workpackage").change(function(){ 
				var curprjvalue = $("#project").val();
				var curwpvalue = $("#workpackage").val();
				console.log(curprjvalue + " WP: " + curwpvalue);
				getProjectTasks(curprjvalue, curwpvalue);
			});

			$("#senddata").click(function(){
				console.log('senddata called');
				$("#info").fadeOut("fast");
				getPostion();
			});
			
			$("#savedata").click(function(){
				saveDeskname($("#setdesknam").val());
				$("#settings").fadeOut("fast");
				$("#header1").fadeIn("fast");
				$("#logoutbtn").fadeIn("fast");
				OnTimeButton();
			});

			$("#settingsbtn").click(function(){
				OnSettingsButton();
			});	
			//check network
			checkConnection();
			navigator.network.isReachable("folio.fabasoft.com", reachableCallback, {});
			
			//manage Page
			$("#logoutbtn").fadeOut("fast");
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
            try {
                var deskname=window.localStorage.getItem("ptdeskname");
                if (deskname==null) {deskname="ProTime Desk";}
                $("#setdesknam").val(deskname);
            }
            catch (error) {console.log(error);}
			$("#settings").show();
		}
		
		function OnTimeButton() {
   			getState();
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
            getProjects();
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
			var deskname=window.localStorage.getItem("ptdeskname");
			if (deskname=="" || deskname==null) { OnSettingsButton();}
			else {
			//getProjects();
			$("#logoutbtn").fadeIn("fast");
			$("#info").fadeOut("fast");
			$("#taskform").fadeOut("fast");
			$("#result").fadeIn("fast");
			$("#settingsbtn").fadeIn("fast");
	        $("#setdesknam").val(deskname);
			$("#fsclogin").fadeOut("fast");
			$("#appcontent").fadeIn("fast");
			$("#myfooter").fadeIn("fast");
            OnTimeButton();

			}
		}; 

		/*
		Callback when logged out
		*/ 
		function OnLogoutCallbackFunction(event) {
			console.log(event);
            $("#fsclogin").fadeIn("fast");
			$("#logoutbtn").fadeOut("fast");
			$("#settingsbtn").fadeOut("fast");
   			$("#appcontent").fadeOut("fast");
   			$("#myfooter").fadeOut("fast");
   			$("#info").fadeIn("fast");
		}; 
	
		
		function onPosError(error) {
			console.log('onPosError code: '    + error.code    + '\t' +
                'message: ' + error.message);
			curpos = {"coords": {"latitude": 0, "longitude": 0, "accuracy": 99999999}};
			createtimePair(window.localStorage.getItem("deskname"), curpos)
		};
		
		function onPosSuccess(position) {
			console.log('onPosSuccess called');
			createtimePair(window.localStorage.getItem("deskname"), position)
        };
		
		function getPostion() {
			console.log('getPostion called');
			navigator.geolocation.getCurrentPosition(onPosSuccess, onPosError);
		};
		
		/*Create a Timepair */
		function createtimePair(desknam, curpos) {
			console.log('createtimePair called: desknam=' + desknam + ' curpos=' + curpos.coords.latitude);
			$("#result").fadeIn("fast");
			var timepairJSONobj = {
				deskname: desknam,
				lat: curpos.coords.latitude,
				lng: curpos.coords.longitude,
				acc: curpos.coords.accuracy
			};	
			$.ajax({
			  type: "POST",
			  //url: 'https://folio.fabasoft.com/dev5/vm171/folio/wsjson/FROGUEPROJTIM_111_100_PROTIMEwebservice/AddTimepair',
			  url: 'https://folio.fabasoft.com/folio/wsjson/FROGUEPROJTIM_111_100_PROTIMEwebservice/AddTimepair',
              dataType: 'jsonp',				
              jsonp: "jsonp",					// Making a JSONP Request
			  data: timepairJSONobj,			// Adding Data
              success: function(data) {
				console.log('createtimePair ajax Success called');
				$("#result").html(data.answer);
              },
              error: function(xhr,err) {
                   HandleError(xhr, err, "createtimePair");
              }
           });					
		}

		/*Get the employers state */
		function getState() {
			var desknam=window.localStorage.getItem("ptdeskname");
			console.log('getState called: desknam=' + desknam );
			$("#result").fadeIn("fast");
			var stateJSONobj = {
				deskname: desknam
			};	
			$.ajax({
			  type: "POST",
			  //url: 'https://folio.fabasoft.com/dev5/vm171/folio/wsjson/FROGUEPROJTIM_111_100_PROTIMEwebservice/GetStatus',
			  url: 'https://folio.fabasoft.com/folio/wsjson/FROGUEPROJTIM_111_100_PROTIMEwebservice/GetStatus',
              dataType: 'jsonp',				
              jsonp: "jsonp",					// Making a JSONP Request
			  data: stateJSONobj,			    // Adding Data
              success: function(data) {
				console.log('getState ajax Success called');
				$("#result").html(data.answer);
              },
              error: function(xhr,err) {
                   HandleError(xhr, err, "getState");
              }
           });					
		}

		/*Get the employers state */
		function getProjects() {
			var desknam=window.localStorage.getItem("ptdeskname");
			console.log('getState called: desknam=' + desknam );
			var stateJSONobj = {
				forwpaddress: ''
			};	
			$.ajax({
			  type: "POST",
			  //url: 'https://folio.fabasoft.com/dev5/vm171/folio/wsjson/FROGUEPROJTIM_111_100_PROTIMEwebservice/GetStatus',
			  url: 'https://folio.fabasoft.com/folio/wsjson/FROGUEPROJTIM_111_100_PROTIMEwebservice/GetProjects',
              dataType: 'jsonp',				
              jsonp: "jsonp",					// Making a JSONP Request
			  data: stateJSONobj,			    // Adding Data
              success: function(data) {
				console.log('getProjects ajax Success called');
				$("#project").empty();
				$("#workpackage").empty();
				$("#activity").empty();
                //$("#project").val("");
                //$("#workpackage").val("");
                //$("#activity").val("");
				$("datefrom").val(new Date());
				$("datetill").val(new Date());
				var dtalen=data.prjdata.length;
                var firstproject;
				if (typeof dtalen == 'undefined') {dtalen=1;};
				console.log("getProjects dtalen=" + dtalen + " - " + data.prjdata);
				if ( dtalen > 1) {
				jQuery.each(data.prjdata, function() {
					//console.log('Project ' + this) ;
					console.log('getProjects Project datalen > 1' + this.taskprjname + ' ' + this.taskprjaddress) ;
					if (this != 'undefined' && !$("#project option[value='" + this.taskprjaddress + "']").length) {
						$("<option/>").val(this.taskprjaddress).text(this.taskprjname).appendTo("#project");}
                            firstproject=this.taskprjaddress;
				});
				};
				if (dtalen == 1) {
					console.log('getProjects Project datalen==1 ' + data.prjdata.taskprjname + ' ' + data.prjdata.taskprjaddress) ;
					$("<option/>").val(data.prjdata.taskprjaddress).text(data.prjdata.taskprjname).appendTo("#project");
                    firstproject=data.prjdata.taskprjaddress;
                };
                $("#project").prop("selectedIndex", 0);
                $("#project").val($("#project option:selected").text());
                getProjectWPs(firstproject);
				
              },
              error: function(xhr,err) {
                   HandleError(xhr, err, "getProjects");
              }
           });					
		}

		function getProjectWPs(prjaddress) {
			var desknam=window.localStorage.getItem("ptdeskname");
			console.log('getProjectWPs called: desknam=' + desknam );
			var stateJSONobj = {
				forprjaddress: prjaddress,
				forwpaddress: ''
			};	
			$.ajax({
			  type: "POST",
			  //url: 'https://folio.fabasoft.com/dev5/vm171/folio/wsjson/FROGUEPROJTIM_111_100_PROTIMEwebservice/GetStatus',
			  url: 'https://folio.fabasoft.com/folio/wsjson/FROGUEPROJTIM_111_100_PROTIMEwebservice/GetProjects',
              dataType: 'jsonp',				
              jsonp: "jsonp",					// Making a JSONP Request
			  data: stateJSONobj,			    // Adding Data
              success: function(data) {
				console.log('getProjectWPs ajax Success called');
				$("#workpackage").empty();
				$("#activity").empty();
                //$("#workpackage").val("");
                //$("#activity").val("");
				var dtalen=data.prjdata.length;
                if (typeof dtalen == 'undefined') {dtalen=1;};
				console.log('getProjectWPs dtalen=' + dtalen);
				if ( dtalen > 1) {
				jQuery.each(data.prjdata, function() {
					if (this.taskwpaddress != 'undefinded' && !$("#workpackage option[value='" + this.taskwpaddress + "']").length) {
						$("<option/>").val(this.taskwpaddress).text(this.taskwpname).appendTo("#workpackage");}

				});
				};
				if (dtalen == 1) {
					$("<option/>").val(data.prjdata.taskwpaddress).text(data.prjdata.taskwpname).appendTo("#workpackage");
				};
                $("#workpackage").prop("selectedIndex", 0);
                $("#workpackage").val($("#project option:selected").text());
				
              },
              error: function(xhr,err) {
                   HandleError(xhr, err, "getProjectWPs");
              }
           });					
		}

		function getProjectTasks(prjaddress, wpaddress) {
			var desknam=window.localStorage.getItem("ptdeskname");
			console.log('getProjectTasks called: desknam=' + desknam );
			var stateJSONobj = {
				forprjaddress: prjaddress,
				forwpaddress: wpaddress
			};	
			$.ajax({
			  type: "POST",
			  //url: 'https://folio.fabasoft.com/dev5/vm171/folio/wsjson/FROGUEPROJTIM_111_100_PROTIMEwebservice/GetStatus',
			  url: 'https://folio.fabasoft.com/folio/wsjson/FROGUEPROJTIM_111_100_PROTIMEwebservice/GetProjects',
              dataType: 'jsonp',				
              jsonp: "jsonp",					// Making a JSONP Request
			  data: stateJSONobj,			    // Adding Data
              success: function(data) {
				console.log('ajax Success called');
				$("#activity").empty();
                //$("#activity").val("");
				var dtalen=data.prjdata.length;
                if (typeof dtalen == 'undefined') {dtalen=1;};
				console.log('getProjectTasks dtalen=' + dtalen);
				if ( dtalen > 1) {
				jQuery.each(data.prjdata, function() {
					if (this.taskaddress != 'undefinded' && !$("#activity option[value='" + this.taskaddress + "']").length) {
						$("<option/>").val(this.taskaddress).text(this.taskname).appendTo("#activity");}

				});
				};
				if (dtalen == 1) {
					$("<option/>").val(data.prjdata.taskaddress).text(data.prjdata.taskname).appendTo("#activity");
				};
                $("#activity").prop("selectedIndex", 0);
                $("#activity").val($("#project option:selected").text());
				
              },
              error: function(xhr,err) {
                   HandleError(xhr, err, "getProjectTasks");
              }
           });					
		}


		function getProjectsActTypes(prjaddress) {
			console.log('getProjectsActTypes called: prjaddress=' + prjaddress );
			var stateJSONobj = {
				projobjaddress: prjaddress
			};	
			$.ajax({
			  type: "POST",
			  //url: 'https://folio.fabasoft.com/dev5/vm171/folio/wsjson/FROGUEPROJTIM_111_100_PROTIMEwebservice/GetStatus',
			  url: 'https://folio.fabasoft.com/folio/wsjson/FROGUEPROJTIM_111_100_PROTIMEwebservice/GetActivityTypes',
              dataType: 'jsonp',				
              jsonp: "jsonp",					// Making a JSONP Request
			  data: stateJSONobj,			    // Adding Data
              success: function(data) {
				console.log('getProjectsActTypes ajax Success called');
				$("#activitytype").empty().append('');
				var dtalen=data.types.length;
                if (typeof dtalen == 'undefined') {dtalen=1;};
				console.log('getProjectsActTypes dtalen=' + dtalen);
				if ( dtalen > 1) {
				jQuery.each(data.types, function() {
					if (this.attd_address != 'undefinded') {
						$("<option/>").val(this.attd_address).text(this.attd_name).appendTo("#activitytype");}

				});
				};
				if (dtalen == 1) {
					$("<option/>").val(data.types.attd_address).text(data.types.attd_name).appendTo("#activitytype");
				};
                $("#activitytype").prop("selectedIndex", 0);
                $("#activitytype").val($("#project option:selected").text());
				
              },
              error: function(xhr,err) {
                   HandleError(xhr, err, "getProjectsActTypes");
              }
           });					
		}

		function AddActivity(prjaddress, wpaddress, taskaddress, acttypeaddress, from, till, remarks) {
			console.log('AddActivity called: prjaddress=' + prjaddress + " acttypeaddress=" + acttypeaddress );
			$("#result").fadeIn("fast");
			var stateJSONobj = {
				activitytypeobjaddress: acttypeaddress,
				projobjaddress: prjaddress,
				wpobjaddress: wpaddress,
				taskobjaddress: taskaddress,
				start: from,
				end: till,
				remarks: remarks
			};	
			$.ajax({
			  type: "POST",
			  //url: 'https://folio.fabasoft.com/dev5/vm171/folio/wsjson/FROGUEPROJTIM_111_100_PROTIMEwebservice/GetStatus',
			  url: 'https://folio.fabasoft.com/folio/wsjson/FROGUEPROJTIM_111_100_PROTIMEwebservice/CreateActivity',
              dataType: 'jsonp',				
              jsonp: "jsonp",					// Making a JSONP Request
			  data: stateJSONobj,			    // Adding Data
              success: function(data) {
                var newaddr=data.newobjaddress;
				console.log('AddActivity ajax Success called - ' + newaddr);
                $("#result").html( "<h2>Task " + newaddr + " created.</h2>");
              },
              error: function(xhr,err) {
                   HandleError(xhr, err, "AddActivity");
              }
           });					
		}
		
		/*Save deskname in html5 local storage*/
	    function saveDeskname(deskname) {
            console.log("Deskname in html5storage " + deskname);
    	    window.localStorage.setItem("ptdeskname", deskname);
			//window.location.href="#home";
    	}
	    

	function onDeviceReady() {
        console.log("onDeviceReady firsttimeinit " + firsttimeinit);
        if (firsttimeinit) {docready();}
        firsttimeinit=false;
    
        };
		
    function ConnectionFail() {
		console.log("->ConnectionFail");
		alert("Heavy Problem detected eg. Connection timed out or Network changed - you have to renew the login!");
		OnLogoutCallbackFunction("ConnectionFail");
		fsc.authentication.login("fsclogin");
    }
	function HandleError(xhr, err, funtionname) {
	   console.log(funtionname + " ajax erorr called readyState: "+xhr.readyState+"\nstatus: "+xhr.status);
	   console.log("responseText: "+xhr.responseText);
	   $("#result").html("<h2>Error (Status/Text): " + xhr.status + "/" + xhr.responseText + "</h2>");
	   if (xhr.status=="302" || xhr.status=="200") {
		 console.log("Verbindungsproblem -> neuer login");
		 ConnectionFail();
	   }
	}

	// Check network status
	//
	function reachableCallback(reachability) {
		// There is no consistency on the format of reachability
		var networkState = reachability.code || reachability;
		var states = {};
		states[NetworkStatus.NOT_REACHABLE]  = 'No network connection';
		states[NetworkStatus.REACHABLE_VIA_CARRIER_DATA_NETWORK] = 'Carrier data connection';
		states[NetworkStatus.REACHABLE_VIA_WIFI_NETWORK] = 'WiFi connection';
		console.log("->reachableCallback: Connection type: %s", states[networkState]);
		if (states[networkState]=='No network connection') {
			alert('Error with Connection type: ' + states[networkState]);
		}
	}
	
	function checkConnection() {
    var networkState = navigator.network.connection.type;

    var states = {};
    states[Connection.UNKNOWN]  = 'Unknown connection';
    states[Connection.ETHERNET] = 'Ethernet connection';
    states[Connection.WIFI]     = 'WiFi connection';
    states[Connection.CELL_2G]  = 'Cell 2G connection';
    states[Connection.CELL_3G]  = 'Cell 3G connection';
    states[Connection.CELL_4G]  = 'Cell 4G connection';
    states[Connection.NONE]     = 'No network connection';
	console.log("->checkConnection: Connection type: %s", states[networkState]);
	if (states[networkState]=='Unknown connection' || states[networkState]=='No network connection') {
		alert('Error with Connection type: ' + states[networkState]);
	}	   
   }









		
	document.addEventListener("deviceready", onDeviceReady, false);

    $(document).ready(function() {
    	console.log("$(document).ready");
		fsc.authentication.options.hostname = "https://at.folio.fabasoft.com/folio/";
		fsc.authentication.options.loginpath = "fscasp/content/bin/fscvext.dll?ax=COO.1.1001.1.334515&motoky_loginmode=mobile&motoky_hidelogin=registration";
       	fsc.authentication.init();
       	fsc.authentication.login("fsclogin"); 
       	fsc.authentication.options.logincallback = OnLoginCallbackFunction;
       	fsc.authentication.options.logoutcallback = OnLogoutCallbackFunction;
		docready();
			
	});

	$(document).on('pageshow','#settings', function() {
		var deskname = window.localStorage.getItem("ptdeskname");
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
