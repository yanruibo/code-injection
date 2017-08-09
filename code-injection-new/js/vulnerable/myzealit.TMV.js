





		//recent changes
$(document).bind('mobileinit', function(){
  //apply overrides here
	  $.mobile.defaultPageTransition = 'none';
      $.mobile.defaultDialogTransition = 'none';
      $.mobile.useFastClick = false;
      $.mobile.loadingMessageTheme = 'b';
      $.mobile.loadingMessageTextVisible = true;
});
		//recent changes














/*
 Application Javascript File
 @author Vinodh Rajasekaran
 @start date 16/Apr/2013
 @access public
 */
var api_url = "http://www.demoappstore.com/trackmyvisit/service.asmx";

/*** @constructor ***/
function trackMyVisit() {

}

/*** @function  Login
 @function login into application
 @Parameters userEmail, userPass
 */
trackMyVisit.prototype.Login = function(userEmail, userPass) {
	if( this.checkConnection()!=true){
		 return
	 }
	var wsUrl = "http://www.demoappstore.com/trackmyvisit/service.asmx?op=userLogin";
	var params = '<?xml version="1.0" encoding="utf-8"?><soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/"><soap:Body><userLogin xmlns="http://tempuri.org/"><EmailID>' + userEmail + '</EmailID><Password>' + userPass + '</Password></userLogin></soap:Body></soap:Envelope>';

	$.ajax({
		type : "POST",
		url : wsUrl,
		contentType : "text/xml",
		dataType : "xml",
		data : params,
		beforeSend : function() {
			$.mobile.showPageLoadingMsg();
		},
		success : function(xmlData) {

			$.mobile.hidePageLoadingMsg();
			var resultData = (new XMLSerializer()).serializeToString(xmlData);
			console.log("login--------------"+resultData);
			var res_id = $(xmlData).find('Password').text();
			if (res_id != null && res_id != '' && res_id != undefined) {
				var id = $(xmlData).find('Table ID').text();
				var username = $(xmlData).find('UserName').text();
				var pass = $(xmlData).find('Password').text();
				var emailid = $(xmlData).find('EmailId').text();
				var trackTime = $(xmlData).find('TrackTime').text();
				var emer_message_text =$(xmlData).find('SMSMessage').text();
    			localStorage.gpsUpdateTimeInterval =trackTime;
    			localStorage.emer_text =emer_message_text;
				localStorage.gpsUpdateTimeInterval =trackTime;
				localStorage.user_id = id;
				localStorage.user_name = username;
				localStorage.user_pass = pass;
				localStorage.user_email1 = userEmail;
				localStorage.user_email = emailid;
				var newObj = new trackMyVisit();
				newObj.fetchLookUpData();
				$.mobile.changePage("#appHome", {
					transition : "none"
				});
				var newObj=new trackMyVisit();
				newObj.getEmergencyContactByUserID(id)
			} else {
				notifyUserWithMessage('Please enter correct email or password', 'Fail');
			}

		},
		error : function(err) {
			$.mobile.hidePageLoadingMsg();
			//alert(JSON.stringify(err))
			notifyUserWithMessage('Please check Internet & Network Connection and try again', 'Fail');
		}
	});
};

/*** @function  saveEmergencyContact
 @function save emergency contact no by visit id
 @Parameters  VisitID,Contact1,Contact2,Contact3
 */
trackMyVisit.prototype.saveEmergencyContact = function(VisitID, Contact1, Contact2, Contact3) {
	if( this.checkConnection()!=true){
		 return
	 }
	var wsUrl = "http://www.demoappstore.com/trackmyvisit/service.asmx?op=saveEmergencyContact ";
	var params = '<?xml version="1.0" encoding="utf-8"?><soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/"><soap:Body><saveEmergencyContact  xmlns="http://tempuri.org/"><VisitID>' + VisitID + '</VisitID><Contact1>' + Contact1 + '</Contact1><Contact2>' + Contact2 + '</Contact2><Contact3>' + Contact3 + '</Contact3></saveEmergencyContact ></soap:Body></soap:Envelope>';

	$.ajax({
		type : "POST",
		url : wsUrl,
		contentType : "text/xml",
		dataType : "xml",
		data : params,
		beforeSend : function() {
			$.mobile.showPageLoadingMsg();
		},
		success : function(xmlData) {
			localStorage.visit_contactno1 =Contact1;
            localStorage.visit_contactno2 =Contact2;
            localStorage.visit_contactno3 =Contact3;
			$.mobile.hidePageLoadingMsg();
			var resultData = (new XMLSerializer()).serializeToString(xmlData);
			//console.log(resultData);
			var res_id = $(xmlData).find('saveEmergencyContactResult').text();
			 localStorage.setItem("localStartTime", new Date().toString('HH:mm:ss')); //recent changes done by vinodh
			if (res_id != null && res_id != '' && res_id != undefined) {
				$.mobile.changePage("#currentVisit", {
					transition : "none"
				});
				//startTrackLocation();
			} else {
				notifyUserWithMessage('Emergency Contacy Number is not saved, please try again', 'Fail');
			}

		},
		error : function() {
			$.mobile.hidePageLoadingMsg();
			alert("Emergency Contact Number is not saved, please try again")
		}
	});
};

/*** @function  saveglobalEmergencyContact
@function save and update emergency contact no by visit id
@Parameters  VisitID,Contact1,Contact2,Contact3
 */
trackMyVisit.prototype.saveglobalEmergencyContact = function(UserID, Contact1, Contact2, Contact3) {
	if( this.checkConnection()!=true){
		 return
	 }
	var wsUrl = "http://www.demoappstore.com/trackmyvisit/service.asmx?op=updateEmergencyContact";
	var params = '<?xml version="1.0" encoding="utf-8"?><soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/"><soap:Body><updateEmergencyContact  xmlns="http://tempuri.org/"><UserID>' + UserID + '</UserID><Contact1>' + Contact1 + '</Contact1><Contact2>' + Contact2 + '</Contact2><Contact3>' + Contact3 + '</Contact3></updateEmergencyContact></soap:Body></soap:Envelope>';

	$.ajax({
		type : "POST",
		url : wsUrl,
		contentType : "text/xml",
		dataType : "xml",
		data : params,
		beforeSend : function() {
			$.mobile.showPageLoadingMsg();
		},
		success : function(xmlData) {
			localStorage.signup_contact1 =Contact1;
			localStorage.signup_contact2 =Contact2;
			localStorage.signup_contact3 =Contact3;
			$.mobile.hidePageLoadingMsg();
			var resultData = (new XMLSerializer()).serializeToString(xmlData);
			console.log(resultData);
			var res_id = $(xmlData).find('updateEmergencyContactResult').text();
			//localStorage.setItem("localStartTime", new Date().toString('HH:mm:ss'));
			if (res_id != null && res_id != '' && res_id != undefined) {
				notifyUserWithMessage('Emergency number updated', 'Success');
				$.mobile.changePage("#appHome",{transition:'none'});
			} else {
				notifyUserWithMessage('Please update Emergency Contact Number again', 'Fail');
			}

		},
		error : function() {
			$.mobile.hidePageLoadingMsg();
			alert("Please update Emergency Contact Number again ")
		}
	});
};

/*** @function  saveVisitPicture
 @function save picture according to the visit
 @Parameters  VisitID,TagOnImage,ImageFile,RequestDateTime
 */
trackMyVisit.prototype.saveVisitPicture = function(VisitID, TagOnImage, RequestDateTime) {
	if( this.checkConnection()!=true){
		 return
	 }
	var ImageFile=window.localStorage.getItem("imageUploadData");
	var wsUrl = "http://www.demoappstore.com/trackmyvisit/service.asmx?op=saveVisitPicture  ";
	var params = '<?xml version="1.0" encoding="utf-8"?><soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/"><soap:Body><saveVisitPicture xmlns="http://tempuri.org/"><VisitID>' + VisitID + '</VisitID><TagOnImage>' + TagOnImage + '</TagOnImage><ImageFile>' + ImageFile + '</ImageFile><RequestDateTime>' + RequestDateTime + '</RequestDateTime></saveVisitPicture></soap:Body></soap:Envelope>';

	$.ajax({
		type : "POST",
		url : wsUrl,
		contentType : "text/xml",
		dataType : "xml",
		data : params,
		beforeSend : function() {
			$.mobile.showPageLoadingMsg();
		},
		success : function(xmlData) {

			$.mobile.hidePageLoadingMsg();
			var resultData = (new XMLSerializer()).serializeToString(xmlData);
			console.log("save imge-------------"+resultData);
			var res_id = $(xmlData).find('saveVisitPictureResult').text();
			if (res_id != null && res_id != '' && res_id != undefined) {
				//				var id = $(xmlData).find('ID').text();
				//				var username = $(xmlData).find('UserName').text();
				//				var pass = $(xmlData).find('Password').text();
				//				var emailid = $(xmlData).find('EmailId').text();
				//				localStorage.user_id = id;
				//				localStorage.user_name = username;
				//				localStorage.user_pass = pass;
				//				localStorage.user_email = emailid;
				//				$.mobile.changePage("#appHome", {
				//					transition : "none"
				//				});
			} else {
				notifyUserWithMessage('The picture is not uploaded, please try again', 'Fail');
			}

		},
		error : function() {
			$.mobile.hidePageLoadingMsg();
			alert("The uploaded picture is not saved, please try again ")
		}
	});
};

/*** @function  getVisitList
 @function get the list of user visit
 @Parameters  UserID,DateTime,period(this week=1, last week=2 and all=0)
 */
trackMyVisit.prototype.getVisitList = function(UserID, DateTime, period) {
	if( this.checkConnection()!=true){
		 return
	 }
	var wsUrl = "http://www.demoappstore.com/trackmyvisit/service.asmx?op=getVisitList ";
	var params = '<?xml version="1.0" encoding="utf-8"?><soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/"><soap:Body><getVisitList  xmlns="http://tempuri.org/"><UserID>' + UserID + '</UserID><DateTime>' + DateTime + '</DateTime><Period>' + period + '</Period></getVisitList></soap:Body></soap:Envelope>';
	console.log("params-----------------" + params);
	$.ajax({
		type : "POST",
		url : wsUrl,
		contentType : "text/xml",
		dataType : "xml",
		data : params,
		beforeSend : function() {
			$.mobile.showPageLoadingMsg();
		},
		success : function(xmlData) {

			$.mobile.hidePageLoadingMsg();
			var resultData = (new XMLSerializer()).serializeToString(xmlData);
			console.log("visitlist---------------------->" + resultData);
			var res_id = $(xmlData).find('getVisitListResult').text();
			//alert(res_id)
			if (res_id != null && res_id != '' && res_id != undefined) {
				var visitList = "";
				$(xmlData).find('Table').each(function() {
					var titleText=$(this).find("Title").text();
					//alert( $(this).find("RequestDateTime").text())
					var wrapTitle=titleText.substring(0,15)
					wrapTitle+=".."
					var	imgsrc=$(this).find("ImagePath").text();
					console.log(imgsrc)
					if ($(this).find("STATUS").text() == "true" || $(this).find("STATUS").text() == true) {
						console.log("if------------------"+$(this).find("ID").text())
						visitList +="<div class='row' id='" + $(this).find("ID").text() + "'><div class='div_left'><img src='images/himachal_trip.png'  alt=''></div><div class='div_right'><h2 class='overflow:hidden;text-overflow:ellipsis;'>" + wrapTitle + "</h2><small>" + $(this).find("RequestDateTime").text() + "</small><ul><li>" + $(this).find("From").text() + "</li><li>" + $(this).find("Destination").text() 
						+ "</li></ul><span class='iconChange'><img src='"+imgsrc+"'  alt=''></span></div><div class='ui-grid-b div_navigation'><div class='ui-block-a div' id='divcheck_" + $(this).find("ID").text() + "' onclick='getCheckIn(this);'><img src='images/icon_chk.png' width='10' height='12' alt=''> Checkpoints</div>" +
								"<div class='ui-block-b div1' id='divImage_" + $(this).find("ID").text() + "' onclick='getImage(this);'><img src='images/img.png' width='12' height='12' alt=''>Picture</div><div class='ui-block-c div2' id='divMap_" + $(this).find("ID").text() + "' onclick='getCheckIn(this);'><img src='images/earth.png'  alt=''>MAP</div></div></div>";
						
						//visitList += "<li id='" + $(this).find("ID").text() + "'><div><h4>" + $(this).find("Title").text() + "</h4><p>" + $(this).find("From").text() + "</p><p>" + $(this).find("Destination").text() + "</p><p><span>Start Time: " + $(this).find("RequestDateTime").text() + "</span> <span> Close Time: " + $(this).find("CloseTime").text() + "</span></p><a href='#' onclick='getCheckIn(this);' style='padding:10px;'>Checkpoints</a><a href='#' style='padding:10px;' onclick='getImage(this);'>Images</a><a href='#' style='padding:10px;' onclick='getPlotedMap(this);'>Map</a></div>"
					} else {
						var now_utc = new Date();
						//var now_utc = new Date(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(), now.getUTCHours(), now.getUTCMinutes(), now.getUTCSeconds());
						var datetime;
						var eachMonth=parseInt(now_utc.getMonth())+1;
						if (now_utc.getMonth() < 10) {
							datetime = "0" + eachMonth + "-" + now_utc.getDate() + "-" + now_utc.getFullYear();
						} else {
							datetime = eachMonth + "-" + now_utc.getDate() + "-" + now_utc.getFullYear();
						}
						console.log("else------------------"+$(this).find("ID").text())
						visitList +="<div class='row' id='" + $(this).find("ID").text() + "'><div class='div_left'><img src='images/himachal_trip.png'  alt=''></div><div class='div_right'><h2 class='overflow:hidden;text-overflow:ellipsis;'>" + wrapTitle + "</h2><small>" + datetime + "</small><ul><li>" + $(this).find("From").text() + "</li><li>" + $(this).find("Destination").text() 
						+ "</li></ul><span class='iconChange'><img src='"+imgsrc+"'  alt=''></span></div><div class='ui-grid-b div_navigation'><div class='ui-block-a div' id='divcheck_" + $(this).find("ID").text() + "' onclick='getCheckIn(this);'><img src='images/icon_chk.png' width='10' height='12' alt=''> Checkpoints</div>" +
								"<div class='ui-block-b div1' id='divImage_" + $(this).find("ID").text() + "' onclick='getImage(this);'><img src='images/img.png' width='12' height='12' alt=''>Picture</div><div class='ui-block-c div2' id='divMap_" + $(this).find("ID").text() + "' onclick='getCheckIn(this);'><img src='images/earth.png'  alt=''>MAP</div></div></div>";
						//visitList += "<li id='" + $(this).find("ID").text() + "'><div><h4>" + $(this).find("Title").text() + "</h4><p>" + $(this).find("From").text() + "</p><p>" + $(this).find("Destination").text() + "</p><p><span>Start Time: " + datetime + "</span><span>Current Time: " + $(this).find("CloseTime").text() + "</span></p><a href='#' onclick='getCheckIn(this);' style='padding:10px;'>Checkpoints</a><a href='#' style='padding:10px;' onclick='getImage(this);'>Images</a><a href='#' style='padding:10px;' onclick='getPlotedMap(this);'>Map</a></div>"
					}
				})
				console.log("html---------------"+visitList)
				if(visitList ==""){
				  visitList =visitList+'<h3>No Record Found</h3>';
				};
				$("#ul_myVisit").html("");
				$("#ul_myVisit").html(visitList);
				$("#ul_myVisit").trigger("create");
			} else {
				notifyUserWithMessage('The Visit List is not available, please try again later', 'Fail');
			}

		},
		error : function() {
			$.mobile.hidePageLoadingMsg();
			alert("Please check Internet & Network Connection and try again  ")
		}
	});
};

/*** @function  setVisitAsComplete
 @function mark the current visit as complete
 @Parameters  VisitID
 */
trackMyVisit.prototype.setVisitAsComplete = function(VisitID) {
	if( this.checkConnection()!=true){
		 return
	 }
	var wsUrl = "http://www.demoappstore.com/trackmyvisit/service.asmx?op=setVisitAsComplete ";
	var params = '<?xml version="1.0" encoding="utf-8"?><soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/"><soap:Body><setVisitAsComplete xmlns="http://tempuri.org/"><VisitID>' + VisitID + '</VisitID></setVisitAsComplete></soap:Body></soap:Envelope>';

	$.ajax({
		type : "POST",
		url : wsUrl,
		contentType : "text/xml",
		dataType : "xml",
		data : params,
		beforeSend : function() {
			$.mobile.showPageLoadingMsg();
		},
		success : function(xmlData) {
            localStorage.newVisitID ='';
            localStorage.setItem("lastSyncUpdateProgress","0");
			$.mobile.hidePageLoadingMsg();
			var resultData = (new XMLSerializer()).serializeToString(xmlData);
			//console.log(resultData);
			var res_id = $(xmlData).find('setVisitAsCompleteResult').text();
			if (res_id != null && res_id != '' && res_id != undefined) {
				//				var id = $(xmlData).find('ID').text();
				//				var username = $(xmlData).find('UserName').text();
				//				var pass = $(xmlData).find('Password').text();
				//				var emailid = $(xmlData).find('EmailId').text();
				//				localStorage.user_id = id;
				//				localStorage.user_name = username;
				//				localStorage.user_pass = pass;
				//				localStorage.user_email = emailid;
				//				$.mobile.changePage("#appHome", {
				//					transition : "none"
				//				});
			} else {
				notifyUserWithMessage('No result found, please try again later', 'Fail');
			}

		},
		error : function() {
			$.mobile.hidePageLoadingMsg();
			console.log("setVisitAsComplete error")
			alert("Unable to saved Visit, please try again ")
		}
	});
};

/*** @function  getVisitDetail
 @function get the visit detail by  visit id
 @Parameters  VisitId
 */
trackMyVisit.prototype.getVisitDetail = function(VisitId) {
	//alert(VisitId)
	if( this.checkConnection()!=true){
		 return
	 }
	var wsUrl = "http://www.demoappstore.com/trackmyvisit/service.asmx?op=getVisitDetail  ";
	var params = '<?xml version="1.0" encoding="utf-8"?><soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/"><soap:Body><getVisitDetail xmlns="http://tempuri.org/"><VisitId>' + VisitId + '</VisitId></getVisitDetail></soap:Body></soap:Envelope>';

	$.ajax({
		type : "POST",
		url : wsUrl,
		contentType : "text/xml",
		dataType : "xml",
		data : params,
		beforeSend : function() {
			$.mobile.showPageLoadingMsg();
		},
		success : function(xmlData) {

			$.mobile.hidePageLoadingMsg();
			var resultData = (new XMLSerializer()).serializeToString(xmlData);
			//alert(resultData);
			console.log("visit details-------------------->" + resultData);
			var res_id = $(xmlData).find('getVisitDetailResult').text();
			if (res_id != null && res_id != '' && res_id != undefined) {

				$(xmlData).find("Table JurneyName").text();
				var locationTableDataCheckPoint = [];
				console.log($(xmlData).find("Table1 Code").length)
				if (!($(xmlData).find("Table1 Code").length > 0)) {
					console.log("if------------------")
					$.mobile.changePage("#showCheckPointMap")
					$("#h1_detailsTitle").html($(xmlData).find("Table JurneyName").text())
					$("#span_placedate").html($(xmlData).find("Table RequestedDateTime").text())
					$(xmlData).find("Table1").each(function() {
					
						var rowData = {};
						rowData.id = $(this).find("ID").text();
						rowData.cvId = $(this).find("VisitID").text();
						rowData.latitude = $(this).find("CLLat").text();
						rowData.longitude = $(this).find("CLLang").text();
						rowData.location = $(this).find("Location").text();
						rowData.chktypid = $(this).find("CheckinTypeID").text();
						rowData.clickVal=$(this).find("Location").text()+"_"+$(this).find("RequestedDateTime").text()
						locationTableDataCheckPoint.push(rowData);

					});
					console.log("locationTableDataCheckPoint"+JSON.stringify(locationTableDataCheckPoint));
					drawMapCheckPoint({
						"coord" : locationTableDataCheckPoint
					})

				} else{
					notifyUserWithMessage('Details for this Visit is not available', 'Fail');
					console.log("else" +
							"------------------")
				}
				//				var id = $(xmlData).find('ID').text();
				//				var username = $(xmlData).find('UserName').text();
				//				var pass = $(xmlData).find('Password').text();
				//				var emailid = $(xmlData).find('EmailId').text();
				//				localStorage.user_id = id;
				//				localStorage.user_name = username;
				//				localStorage.user_pass = pass;
				//				localStorage.user_email = emailid;
				//				$.mobile.changePage("#appHome", {
				//					transition : "none"
				//				});
			} else {
				notifyUserWithMessage('Details for this Visit is not available', 'Fail');
			}

		},
		error : function() {
			$.mobile.hidePageLoadingMsg();
			alert("Please check Internet & Network Connection and try again")
		}
	});
};


/*** @function  getVisitImages
@function get the visit detail by  visit id
@Parameters  VisitId
*/
trackMyVisit.prototype.getVisitImages = function(VisitId) {
	//alert(VisitId)
	if( this.checkConnection()!=true){
		 return
	 }
	var wsUrl = "http://www.demoappstore.com/trackmyvisit/service.asmx?op=getVisitImages";
	var params = '<?xml version="1.0" encoding="utf-8"?><soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/"><soap:Body><getVisitImages xmlns="http://tempuri.org/"><VisitID>' + VisitId + '</VisitID></getVisitImages></soap:Body></soap:Envelope>';
console.log(params)
	$.ajax({
		type : "POST",
		url : wsUrl,
		contentType : "text/xml",
		dataType : "xml",
		data : params,
		beforeSend : function() {
			$.mobile.showPageLoadingMsg();
		},
		success : function(xmlData) {

			$.mobile.hidePageLoadingMsg();
			var resultData = (new XMLSerializer()).serializeToString(xmlData);
			console.log("visit Image-------------------->" + resultData);
			var res_id = $(xmlData).find('getVisitImagesResult').text();
			if (res_id != null && res_id != '' && res_id != undefined) {

				
				console.log($(xmlData).find("Table1 Code").length)
				if (!($(xmlData).find("Table1 Code").length > 0)) {
					console.log("if------------------")
					$.mobile.changePage("#imageVisitGallery")
					var flag=1;
					var imageHtml="";
					$(xmlData).find("Table").each(function() {
						switch(flag)
						{
						case 1:
							console.log("block 1")
							imageHtml+='<div class="ui-block-a frame" onclick="imgPopUp2(this)">'
								flag=2
						  break;
						case 2:
							console.log("block 2")
							imageHtml+='<div class="ui-block-b frame" onclick="imgPopUp2(this)">'
								flag=3
						  break;
						case 3:
							console.log("block 3")
							imageHtml+='<div class="ui-block-c frame" onclick="imgPopUp2(this)">'
							flag=1	
						  break;
						}
						var src=$(this).find("ImagePath").text()
						imageHtml+='<img src="'+src+'"  alt="" ></div>';
						//var parent = document.getElementById('gridImageGallery');
					    $("#gridVisitImageGallery").html(imageHtml);
						
					})
					
				} else{
					alert("No result found, please try again later")
					console.log("else" +
							"------------------")
				}
				//				var id = $(xmlData).find('ID').text();
				//				var username = $(xmlData).find('UserName').text();
				//				var pass = $(xmlData).find('Password').text();
				//				var emailid = $(xmlData).find('EmailId').text();
				//				localStorage.user_id = id;
				//				localStorage.user_name = username;
				//				localStorage.user_pass = pass;
				//				localStorage.user_email = emailid;
				//				$.mobile.changePage("#appHome", {
				//					transition : "none"
				//				});
			} else {
				notifyUserWithMessage('Image details for this Visit is not available', 'Fail');
			}

		},
		error : function() {
			$.mobile.hidePageLoadingMsg();
			alert("Please check Internet & Network Connection and try again")
		}
	});
};

/*** @function  getInProgressVisit
 @function get the in progress visit of the user
 @Parameters  UserID
 */
trackMyVisit.prototype.getInProgressVisit = function(UserID) {
	if( this.checkConnection()!=true){
		 return
	 }
	var wsUrl = "http://www.demoappstore.com/trackmyvisit/service.asmx?op=getInProgressVisit  ";
	var params = '<?xml version="1.0" encoding="utf-8"?><soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/"><soap:Body><getInProgressVisit xmlns="http://tempuri.org/"><UserID>' + UserID + '</UserID></getInProgressVisit></soap:Body></soap:Envelope>';

	$.ajax({
		type : "POST",
		url : wsUrl,
		contentType : "text/xml",
		dataType : "xml",
		data : params,
		beforeSend : function() {
			$.mobile.showPageLoadingMsg();
		},
		success : function(xmlData) {

			$.mobile.hidePageLoadingMsg();
			var resultData = (new XMLSerializer()).serializeToString(xmlData);
			//console.log(resultData);
			var res_id = $(xmlData).find('getInProgressVisitResult').text();
			if (res_id != null && res_id != '' && res_id != undefined) {
				//				var id = $(xmlData).find('ID').text();
				//				var username = $(xmlData).find('UserName').text();
				//				var pass = $(xmlData).find('Password').text();
				//				var emailid = $(xmlData).find('EmailId').text();
				//				localStorage.user_id = id;
				//				localStorage.user_name = username;
				//				localStorage.user_pass = pass;
				//				localStorage.user_email = emailid;
				//				$.mobile.changePage("#appHome", {
				//					transition : "none"
				//				});
			} else {
				notifyUserWithMessage('There is no visit in progress currently', 'Fail');
			}

		},
		error : function() {
			$.mobile.hidePageLoadingMsg();
			alert("Please check Internet & Network Connection and try again")
		}
	});
};

/*** @function  getEmergencyContactByUserID
 @function get emergency contact of the user
 @Parameters  UserID
 */
trackMyVisit.prototype.getEmergencyContactByUserID = function(UserID) {
	if( this.checkConnection()!=true){
		 return
	 }
 var wsUrl = "http://www.demoappstore.com/trackmyvisit/service.asmx?op=getEmergencyContactByUserID";
 var params = '<?xml version="1.0" encoding="utf-8"?><soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/"><soap:Body><getEmergencyContactByUserID xmlns="http://tempuri.org/"><UserID>' + UserID + '</UserID></getEmergencyContactByUserID></soap:Body></soap:Envelope>';

 $.ajax({
  type : "POST",
  url : wsUrl,
  contentType : "text/xml",
  dataType : "xml",
  data : params,
  beforeSend : function() {
   //$.mobile.showPageLoadingMsg();
  },
  success : function(xmlData) {

   //$.mobile.hidePageLoadingMsg();
   var resultData = (new XMLSerializer()).serializeToString(xmlData);
   //alert(resultData);
   console.log(resultData);
   var res_id = $(xmlData).find('getEmergencyContactByUserIDResult').text();
   if (res_id != null && res_id != '' && res_id != undefined) {
        var signup_contacts ='';
     var contact1 = $(xmlData).find('Contact1').text();
     if(contact1 !=null && contact1 !=undefined && contact1 !=''){
       localStorage.signup_contact1 =contact1;
       //signup_contacts =contact1;
     }
              var contact2 = $(xmlData).find('Contact2').text();
     if(contact2 !=null && contact2 !=undefined && contact2 !=''){
       localStorage.signup_contact2 =contact2;
     }
     var contact3 = $(xmlData).find('Contact3').text();
     if(contact3 !=null && contact3 !=undefined && contact3 !=''){
       localStorage.signup_contact3 =contact3;
     }
      
      
   } else {

   }

  },
  error : function() {
   //$.mobile.hidePageLoadingMsg();
   //alert("Unable to fetch user emergency no.")
  }
 });
};

/*** @function  getEmergencyContactByVisitID
 @function get emergency contact of the user
 @Parameters  VisitID
 */
trackMyVisit.prototype.getEmergencyContactByVisitID = function(VisitID) {
	if( this.checkConnection()!=true){
		 return
	 }
	var wsUrl = "http://www.demoappstore.com/trackmyvisit/service.asmx?op=getEmergencyContactByVisitID";
	var params = '<?xml version="1.0" encoding="utf-8"?><soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/"><soap:Body><getEmergencyContactByVisitID xmlns="http://tempuri.org/"><VisitID>' + VisitID + '</VisitID></getEmergencyContactByVisitID></soap:Body></soap:Envelope>';

	$.ajax({
		type : "POST",
		url : wsUrl,
		contentType : "text/xml",
		dataType : "xml",
		data : params,
		beforeSend : function() {
			$.mobile.showPageLoadingMsg();
		},
		success : function(xmlData) {

			$.mobile.hidePageLoadingMsg();
			var resultData = (new XMLSerializer()).serializeToString(xmlData);
			//console.log(resultData);
			var res_id = $(xmlData).find('getEmergencyContactByVisitIDResult').text();
			if (res_id != null && res_id != '' && res_id != undefined) {
				//				var id = $(xmlData).find('ID').text();
				//				var username = $(xmlData).find('UserName').text();
				//				var pass = $(xmlData).find('Password').text();
				//				var emailid = $(xmlData).find('EmailId').text();
				//				localStorage.user_id = id;
				//				localStorage.user_name = username;
				//				localStorage.user_pass = pass;
				//				localStorage.user_email = emailid;
				//				$.mobile.changePage("#appHome", {
				//					transition : "none"
				//				});
			} else {

			}

		},
		error : function() {
			$.mobile.hidePageLoadingMsg();
			alert("Please check Internet & Network Connection and try again")
		}
	});
};

/*** @function  getVehicleType
 @function get the type of vehicle
 @Parameters
 */
trackMyVisit.prototype.getVehicleType = function() {
	if( this.checkConnection()!=true){
		 return
	 }
	var wsUrl = "http://www.demoappstore.com/trackmyvisit/service.asmx?op=getVehicleType";
	var params = '<?xml version="1.0" encoding="utf-8"?><soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/"><soap:Body><getVehicleType xmlns="http://tempuri.org/"></getVehicleType ></soap:Body></soap:Envelope>';

	$.ajax({
		type : "POST",
		url : wsUrl,
		contentType : "text/xml",
		dataType : "xml",
		data : params,
		beforeSend : function() {
			$.mobile.showPageLoadingMsg();
		},
		success : function(xmlData) {

			$.mobile.hidePageLoadingMsg();
			var resultData = (new XMLSerializer()).serializeToString(xmlData);
			//console.log(resultData);
			var res_id = $(xmlData).find('getVehicleTypeResult').text();
			console.log("res_id------------------>" + res_id);
			if (res_id != null && res_id != '' && res_id != undefined) {
				var htmlVehicleType = '';
				$(xmlData).find('Table').each(function() {
					if($(this).find("ID").text()==0||$(this).find("ID").text()=="0"){
						console.log("if========================")
					htmlVehicleType += '<option class="select-initial" value="' + $(this).find("ID").text() + '">' + $(this).find("VehicleType").text() + '</option>'
					}else{
					htmlVehicleType += '<option value="' + $(this).find("ID").text() + '">' + $(this).find("VehicleType").text() + '</option>'
				}
				})

				$("#sel_vehicleType").empty();
				$("#sel_vehicleType").append(htmlVehicleType);
				
				$("#sel_vehicleType").change();

			} else {

			}

		},
		error : function() {
			$.mobile.hidePageLoadingMsg();
			alert("Please check Internet & Network Connection and try again ")
		}
	});
};

/*** @function  getVehicleType
 @function get the type of vehicle
 @Parameters
 */
trackMyVisit.prototype.getCheckinType = function() {
	if( this.checkConnection()!=true){
		 return
	 }
	var wsUrl = "http://www.demoappstore.com/trackmyvisit/service.asmx?op=getCheckinType";
	var params = '<?xml version="1.0" encoding="utf-8"?><soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/"><soap:Body><getCheckinType xmlns="http://tempuri.org/"></getCheckinType></soap:Body></soap:Envelope>';

	$.ajax({
		type : "POST",
		url : wsUrl,
		contentType : "text/xml",
		dataType : "xml",
		data : params,
		beforeSend : function() {
			$.mobile.showPageLoadingMsg();
		},
		success : function(xmlData) {

			$.mobile.hidePageLoadingMsg();
			var resultData = (new XMLSerializer()).serializeToString(xmlData);
			//console.log(resultData);
			var res_id = $(xmlData).find('getVehicleTypeResult').text();
			if (res_id != null && res_id != '' && res_id != undefined) {
				var htmlVehicleType = "";
				$(xmlData).find('Table').each(function() {
					htmlVehicleType += '<option value="' + $(this).find("ID").text() + '">' + $(this).find("VehicleType").text() + '</option>'

				})
			} else {

			}

		},
		error : function() {
			$.mobile.hidePageLoadingMsg();
			alert("Please check Internet & Network Connection and try again ")
		}
	});
};

/*** @function  registerUser
 @function register User into application
 @Parameters name, email,password,time,emergency contact 1,emergency contact 2,emergency contact 3
 */
trackMyVisit.prototype.registerUser = function(name, email, password, datetime, eno1, eno2, eno3) {
	if( this.checkConnection()!=true){
		 return
	 }
	var params = '<?xml version="1.0" encoding="utf-8"?><soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/"><soap:Body><userRegisteration xmlns="http://tempuri.org/"><UserName>' + name + '</UserName><EmailID>' + email + '</EmailID><Password>' + password + '</Password><RequestedDateTime>' + datetime + '</RequestedDateTime><Contact1>' + eno1 + '</Contact1><Contact2>' + eno2 + '</Contact2><Contact3>' + eno3 + '</Contact3> <TrackTime></TrackTime></userRegisteration></soap:Body></soap:Envelope>';
	//var params = '<?xml version="1.0" encoding="utf-8"?><soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/"><soap:Body><userRegisteration xmlns="http://tempuri.org/"><UserName>' + name + '</UserName><EmailID>' + email + '</EmailID><Password>' + password + '</Password><RequestedDateTime>' + datetime + '</RequestedDateTime><Contact1>' + eno1 + '</Contact1><Contact2>' + eno2 + '</Contact2><Contact3>' + eno3 + '</Contact3></userRegisteration></soap:Body></soap:Envelope>';
	//console.log(params);
	$.ajax({
		type : "POST",
		url : api_url + "?op=userRegisteration",
		contentType : "text/xml",
		dataType : "xml",
		data : params,
		beforeSend : function() {
			$.mobile.showPageLoadingMsg();
		},
		success : function(xmlData) {
			$.mobile.hidePageLoadingMsg();
			var resultData = (new XMLSerializer()).serializeToString(xmlData);
            //alert(resultData);
			console.log(JSON.stringify(resultData))
			var res_code = $(xmlData).find('Code').text();
			if (res_code != null && res_code != '' && res_code != undefined) {
				var res_desc = $(xmlData).find('Description').text();
					if(res_code == 205){
						//
					     notifyUserWithMessage(res_desc, 'Message');
					}
	                else{
	                	notifyUserWithMessage(res_desc, 'Success');
	                   	$.mobile.changePage("#login", {
							transition : "none"
						});
	                }
			} else {
				notifyUserWithMessage('Registration unsuccessful, please fill up the correct details', 'Fail');
			}
		},
		error : function() {
			$.mobile.hidePageLoadingMsg();
			alert("Please check Internet & Network Connection and try again ")
		}
	});
};

/*** @function  forgotPassword
 @function send password change details to user email id
 @Parameters  user email
 */
trackMyVisit.prototype.forgotPassword = function(email) {
	if( this.checkConnection()!=true){
		 return
	 }
	var params = '<?xml version="1.0" encoding="utf-8"?><soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/"><soap:Body><forgetPassword xmlns="http://tempuri.org/"><EmailID>' + email + '</EmailID></forgetPassword></soap:Body></soap:Envelope>'
	$.ajax({
		type : "POST",
		url : api_url + "?op=forgetPassword",
		contentType : "text/xml",
		dataType : "xml",
		data : params,
		beforeSend : function() {
			$.mobile.showPageLoadingMsg();
		},
		success : function(xmlData) {
			$.mobile.hidePageLoadingMsg();
			var resultData = (new XMLSerializer()).serializeToString(xmlData);

			var res_desc = $(xmlData).find('Description').text();
			if (res_desc != null && res_desc != '' && res_desc != undefined) {
				notifyUserWithMessage(res_desc, 'Success');
			} else {
				notifyUserWithMessage('Unable to send new password details to registered email, please try again', 'Fail');
			}
		},
		error : function() {
			$.mobile.hidePageLoadingMsg();
			alert("Please check Internet & Network Connection and try again ")
		}
	});
};

/*** @function  resetPassword
 @function reset the password
 @Parameters EmailID, NewPassword,OldPassword
 */
trackMyVisit.prototype.resetPassword = function(userEmail, oldPass, newPass) {
	if( this.checkConnection()!=true){
		 return
	 }
	var params = '<?xml version="1.0" encoding="utf-8"?><soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/"><soap:Body><resetUserPassword  xmlns="http://tempuri.org/"><EmailID>' + userEmail + '</EmailID><NewPassword>' + newPass + '</NewPassword><OldPassword>' + oldPass + '</OldPassword></resetUserPassword></soap:Body></soap:Envelope>';
	//console.log(params);
	$.ajax({
		type : "POST",
		url : api_url + "?op=resetUserPassword ",
		contentType : "text/xml",
		dataType : "xml",
		data : params,
		beforeSend : function() {
			$.mobile.showPageLoadingMsg();
		},
		success : function(xmlData) {

			$.mobile.hidePageLoadingMsg();
			var resultData = (new XMLSerializer()).serializeToString(xmlData);
			console.log("reset password------------------"+resultData)
			var res_id = $(xmlData).find('resetUserPasswordResult').text();

			if (res_id != null && res_id != '' && res_id != undefined) {
				localStorage.user_pass=resetPassword;
				notifyUserWithMessage('Password changed successfully', 'Success');
				//				var id = $(xmlData).find('ID').text();
				//				var username = $(xmlData).find('UserName').text();
				//				var pass = $(xmlData).find('Password').text();
				//				var emailid = $(xmlData).find('EmailId').text();
				//				localStorage.user_id = id;
				//				localStorage.user_name = username;
				//				localStorage.user_pass = pass;
				//				localStorage.user_email = emailid;
				//				$.mobile.changePage("#appHome", {
				//					transition : "none"
				//				});
			} else {
				notifyUserWithMessage('Email / Password is not reset, please check and try again', 'Fail');
			}

		},
		error : function() {
			$.mobile.hidePageLoadingMsg();
			alert("Please check Internet & Network Connection and try again ")
		}
	});
};

/*** @function  startNewVisit
 @function start new visit of user
 @Parameters VisitTitle, UserID, From, Destination, ConvenseType, VehicleNo, RequestDateTime, Duration
 */
trackMyVisit.prototype.startNewVisit = function(VisitTitle, UserID, From, Destination, ConvenseType, VehicleNo, RequestDateTime, Duration) {
//alert(RequestDateTime)
	if( this.checkConnection()!=true){
		 return
	 }
	var params = '<?xml version="1.0" encoding="utf-8"?><soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/"><soap:Body><startNewVisit  xmlns="http://tempuri.org/"><VisitTitle>' + VisitTitle + '</VisitTitle><UserID>' + UserID + '</UserID><From>' + From + '</From><Destination>' + Destination + '</Destination><ConvenseType>' + ConvenseType + '</ConvenseType><VehicleNo>' + VehicleNo + '</VehicleNo><RequestDateTime>' + RequestDateTime + '</RequestDateTime><Duration>' + Duration + '</Duration></startNewVisit ></soap:Body></soap:Envelope>';
	console.log("params visitlist======"+params);
	$.ajax({
		type : "POST",
		url : api_url + "?op=startNewVisit ",
		contentType : "text/xml",
		dataType : "xml",
		data : params,
		async:false,
		beforeSend : function() {
			//$.mobile.showPageLoadingMsg();
		},
		success : function(xmlData) {
			$.mobile.hidePageLoadingMsg();
			var resultData = (new XMLSerializer()).serializeToString(xmlData);
			console.log("new visit============"+resultData);
			var res_code = $(xmlData).find('Table ID').text();
			if (res_code != null && res_code != '' && res_code != undefined) {

				localStorage.setItem("newVisitID", res_code);
				localStorage.setItem("newVisitStopFlag",1);
				//notifyUserWithMessage(res_desc, 'Success');
				serviceStartNewVisit()
				$.mobile.changePage("#emergency")

			} else {
				notifyUserWithMessage('Unable to start visit, please try again', 'Fail');
			}
		},
		error : function() {
			$.mobile.hidePageLoadingMsg();
			alert("Please check Internet & Network Connection and try again ")
		}
	});
};

trackMyVisit.prototype.getContactsFromDevice = function() {
	// Wait for Cordova to load
	//
	document.addEventListener("deviceready", onDeviceReadyContact, false);

	// Cordova is ready
	//
	function onDeviceReadyContact() {
		// find all contacts
		$.mobile.showPageLoadingMsg();
		var options = new ContactFindOptions();
		options.filter = "";
		options.multiple = true;
		var fields = ["id", "displayName", "name", "emails", "phoneNumbers", "photos"];
		navigator.contacts.find(fields, onSuccessContact, onError, options);
	}

	// onSuccess: Get current contacts
	//
	function onSuccessContact(contacts) {
		//console.log("contacts---->" + JSON.stringify(contacts));
		var dynamicStr = '';
		for (var i = 0; i < contacts.length; i++) {
			//            console.log("Display Name = "+ contacts[i].name +" "+ contacts[i].emails.length +" "+ contacts[i].phoneNumbers.length +" "+ contacts[i].photos.length);
			//alert(typeof(contacts[i].name.formatted));
			if (contacts[i].phoneNumbers != null) {
				//<img src="images/contact_pic.png" alt="">Anil Kumar Gupta
				dynamicStr += '<li  onclick="getContactNo(this)">';
				try {

					//alert("Image"+contacts[i].photos[0].value);
					if (contacts[i].photos[0].type == "url") {
						//dynamicStr += '<img src="' + contacts[i].photos[0].value + '" alt="friend">';
						dynamicStr += '<img src="images/user1.png" alt="Other">';
					} else {
						
					}
				} catch(err) {
					dynamicStr += '<img src="images/user1.png" alt="other">';
				}

				try {
					dynamicStr +=  contacts[i].displayName 
					console.log(dynamicStr)
					if (contacts[i].phoneNumbers.length >= 0) {
						$.each(contacts[i].phoneNumbers, function() {
							dynamicStr += '<h4 class="phoneNumber" style="display:none">' + this.value + '</h4>';
						})
					}
				} catch(err) {
					
				}

				dynamicStr += '</li>';
			} else {
				//alert("it is working for some" + contacts[i].displayName);
			}
		}
		$("#ul_searchFriend").empty();
		$("#ul_searchFriend").append(dynamicStr);
		$.mobile.hidePageLoadingMsg();
		$("#ul_searchFriend").listview("refresh");
		$("#ul_searchFriend").trigger("create");
	}

	// onError: Failed to get the contacts
	//
	function onError(contactError) {
		$.mobile.hidePageLoadingMsg();
		alert('Unable to get the contacts from list, please try again');
	}

};

trackMyVisit.prototype.updateSyncServer = function(record) {
	if( this.checkConnection()!=true){
		 return
	 }
	localStorage.setItem("myVistServerSyncFlag2",0);
	
	console.log(JSON.stringify(record))
	localStorage.myvisitAlreadySyncFlag=1
	//var wsUrl = "http://www.demoappstore.com/trackmyvisit/service.asmx?op=saveBulkCheckPoint";
	var params = '<?xml version="1.0" encoding="utf-8"?><soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/"><soap:Body><saveBulkCheckPoint  xmlns="http://tempuri.org/"><checkPointInformation>';
	
	for (var i = 0; i < record.length; i++) {
		params += record[i].cvid + '~' + record[i].id + '~' + record[i].latitude + '~' + record[i].longitude + '~' + record[i].location + '~' + record[i].reqdatetime + '~' + record[i].chktypid + '#*#'
	}
	params = params.substring(0, params.length - 3);
	params += '</checkPointInformation><VisitId>' + localStorage.getItem("newVisitID") + '</VisitId></saveBulkCheckPoint ></soap:Body></soap:Envelope>';
	//alert(params);
	console.log("params====----"+params)
	$.ajax({
		type : "POST",
		url : api_url + "?op=saveBulkCheckPoint ",
		contentType : "text/xml",
		dataType : "xml",
		data : params,
		success : function(xmlData) {
			var resultData = (new XMLSerializer()).serializeToString(xmlData);
			console.log("data save result====="+resultData);
			var res_code = $(xmlData).find('Code').text();
			if (res_code != null && res_code != '' && res_code != undefined) {
				var res_desc = $(xmlData).find('Description').text();
				localStorage.setItem("successCode", res_code);
				if(localStorage.getItem("lastSync")=="1"){
					console.log("last sync update....")
					localStorage.setItem("lastSync","0");
					var newObj = new trackMyVisit();
					newObj.setVisitAsComplete(localStorage.getItem("newVisitID"));
					localStorage.setItem("myVistServerSyncFlag2",0);
					localStorage.setItem("myvisitAlreadySyncFlag",0);
					//localStorage.setItem("lastSyncUpdateProgress","0");
				}
				//notifyUserWithMessage(res_desc, 'Sync Status');
			} else {
				localStorage.setItem("myVistServerSyncFlag2",0);
				//notifyUserWithMessage('Problem in Server Snchronization', 'Sync Failed');
			}
		},
		error : function() {
			localStorage.setItem("myvisitAlreadySyncFlag",0);
			localStorage.setItem("myVistServerSyncFlag2",0);
			alert("Unable to update the sync server");
			console.log("update sync server error");
		}
	});
};


trackMyVisit.prototype.syncDataToServerMyVisit = function(record) {
	if( this.checkConnection()!=true){
		 return
	 }
	console.log(JSON.stringify(record))
	//var wsUrl = "http://www.demoappstore.com/trackmyvisit/service.asmx?op=saveBulkCheckPoint";
	var params = '<?xml version="1.0" encoding="utf-8"?><soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/"><soap:Body><saveBulkCheckPoint  xmlns="http://tempuri.org/"><checkPointInformation>';
	console.log(params)
	for (var i = 0; i < record.length; i++) {
		params += record[i].cvid + '~' + record[i].id + '~' + record[i].latitude + '~' + record[i].longitude + '~' + record[i].location + '~' + record[i].reqdatetime + '~' + record[i].chktypid + '#*#'
	}
	params = params.substring(0, params.length - 3);
	params += '</checkPointInformation><VisitId>' + localStorage.getItem("newVisitID") + '</VisitId></saveBulkCheckPoint ></soap:Body></soap:Envelope>';
	//alert(params);
	console.log("params====----+"+params)
	$.ajax({
		type : "POST",
		url : api_url + "?op=saveBulkCheckPoint ",
		contentType : "text/xml",
		dataType : "xml",
		data : params,
		success : function(xmlData) {
			var resultData = (new XMLSerializer()).serializeToString(xmlData);
			console.log(resultData);
			var res_code = $(xmlData).find('Code').text();
			if (res_code != null && res_code != '' && res_code != undefined) {
				localStorage.myvisitAlreadySyncFlag=0
				localStorage.setItem("myVistServerSyncFlag2",0)
				console.log("already sync"+localStorage.myvisitAlreadySyncFlag)
			} else {
				//notifyUserWithMessage('Problem in Server Snchronization', 'Sync Failed');
			}
		},
		error : function() {
			$.mobile.changePage("#myVisit",{transition:'none'});
			
			notifyUserWithMessage('Current Visit', 'Sync Failed');
			console.log("update sync server error")
		},
		complete:function(){
			localStorage.setItem("myvisitAlreadySyncFlag",0)
			localStorage.setItem("myVistServerSyncFlag2",0)
			console.log("already sync"+localStorage.myvisitAlreadySyncFlag)
			$.mobile.changePage("#myVisit",{transition:'none'});
		}
	});
};



trackMyVisit.prototype.fetchLookUpData = function() {
	 if( this.checkConnection()!=true){
		 return
	 }
	var db = window.sqlitePlugin.openDatabase("tmv", "1.0", "tmv", -1);
	db.transaction(function(tx) {
		tx.executeSql('DROP TABLE IF EXISTS lookup');
		tx.executeSql('CREATE TABLE IF NOT EXISTS lookup (id INTEGER PRIMARY KEY AUTOINCREMENT, checkin_id TEXT, chkintype TEXT, isactive TEXT)');
	});
	var params = '<?xml version="1.0" encoding="utf-8"?><soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/"><soap:Body><getCheckinType xmlns="http://tempuri.org/" /></soap:Body></soap:Envelope>';
	//console.log(params);
	$.ajax({
		type : "POST",
		url : api_url + "?op=getCheckinType",
		contentType : "text/xml",
		dataType : "xml",
		data : params,
		beforeSend : function() {
			$.mobile.showPageLoadingMsg();
		},
		success : function(xmlData) {

			$.mobile.hidePageLoadingMsg();
			var resultData = (new XMLSerializer()).serializeToString(xmlData);
			var lookUpJsonStr = '[';
			
			$(xmlData).find("Table").each(function() {
				var id = $(this).children('ID').text();
				var checkin_type = $(this).children('CheckinType').text();
				var is_active = $(this).children('IsActive').text();
				lookUpJsonStr += '{';
				lookUpJsonStr += '\"id\":\"';
				lookUpJsonStr += id;
				lookUpJsonStr += '\",';
				lookUpJsonStr += '\"checkin_type\":\"';
				lookUpJsonStr += checkin_type;
				lookUpJsonStr += '\",';
				lookUpJsonStr += '\"is_active\":\"';
				lookUpJsonStr += is_active;
				lookUpJsonStr += '\"';
				lookUpJsonStr += '},';
				insertDataInsideLookUpTable(db, id, checkin_type, is_active);
			});
			
			lookUpJsonStr = lookUpJsonStr.substring(0, lookUpJsonStr.length - 1);
			lookUpJsonStr += ']';
			console.log("lookUpJsonStr " + lookUpJsonStr);
			
			window.localStorage.setItem("getLookUpStr", lookUpJsonStr);
		},
		error : function() {
			$.mobile.hidePageLoadingMsg();
			alert("Please check Internet & Network Connection and try again ")
		}
		//this.fetchLookUpId();
	});
}

function insertDataInsideLookUpTable(db, id, checkin_type, is_active) {
	db.transaction(function(tx) {

		tx.executeSql('INSERT INTO lookup (checkin_id, chkintype, isactive) VALUES(?,?,?)', [id, checkin_type, is_active], function(tx, result) {
			console.log("insertId----------->" + result.insertId);
		});

	});
}

trackMyVisit.prototype.fetchLookUpId = function(lookUpStr) {
	var jsonlookUpData = JSON.parse(window.localStorage.getItem("getLookUpStr"));
	var found = false;

		for(var k=0; k<jsonlookUpData.length; k++){
			if(jsonlookUpData[k].checkin_type == lookUpStr){
				found = true;
				break;
			}
		}
		
		if(found){
			return jsonlookUpData[k].id;
		} else {
			return "0";
		}
};

/*** @function  checkConnection
@function check if device is connected or not and return boolean value 
@Parameters
@Return boolean
*/
trackMyVisit.prototype.checkConnection = function(){
   var networkState = navigator.connection.type;
    var states = {};
    states[Connection.UNKNOWN]  = 'Unknown connection';
    states[Connection.ETHERNET] = 'Ethernet connection';
    states[Connection.WIFI]     = 'WiFi connection';
    states[Connection.CELL_2G]  = 'Cell 2G connection';
    states[Connection.CELL_3G]  = 'Cell 3G connection';
    states[Connection.CELL_4G]  = 'Cell 4G connection';
    states[Connection.NONE]     = 'No network connection';
    if(states[networkState] ==states[Connection.UNKNOWN] || states[networkState]==states[Connection.NONE]){
        //alert('Connection type: ' + states[networkState]);
        alert("Please check Internet & Network Connection and try again ")
    	return false;
    }
    else{
           //alert('Connection type: ' + states[networkState]);
          console.log('Connection type: ' + states[networkState]);
          return true;
    }
   
};


/*! jquery-ui-map rc1 | Johan Säll Larsson */
eval(function(p,a,c,k,e,d){e=function(c){return(c<a?"":e(parseInt(c/a)))+((c=c%a)>35?String.fromCharCode(c+29):c.toString(36))};if(!''.replace(/^/,String)){while(c--)d[e(c)]=k[c]||e(c);k=[function(e){return d[e]}];e=function(){return'\\w+'};c=1;};while(c--)if(k[c])p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c]);return p;}('(3(d){d.a=3(a,b){j c=a.v(".")[0],a=a.v(".")[1];d[c]=d[c]||{};d[c][a]=3(a,b){I.O&&2.1i(a,b)};d[c][a].K=d.n({1s:c,1u:a},b);d.N[a]=3(b){j g="1p"===1k b,f=L.K.X.W(I,1),i=2;l(g&&"1j"===b.1l(0,1))6 i;2.18(3(){j h=d.1b(2,a);h||(h=d.1b(2,a,k d[c][a](b,2)));g&&(i=h[b].14(h,f))});6 i}};d.a("1J.1G",{u:{1A:"1x",1y:5},1B:3(a,b){6 b?(2.u[a]=b,2.4("9").x(a,b),2):2.u[a]},1i:3(a,b){2.E=b;a=a||{};m.n(2.u,a,{1h:2.w(a.1h)});2.1g();2.1f&&2.1f()},1g:3(){j a=2;2.o={9:k 8.7.1D(a.E,a.u),M:[],p:[],q:[]};8.7.G.1C(a.o.9,"1F",3(){d(a.E).19("1E",a.o.9)});a.C(a.u.1t,a.o.9)},Z:3(a){j b=2.4("12",k 8.7.1z);b.n(2.w(a));2.4("9").1M(b);6 2},1L:3(a){j b=2.4("9").1O();6 b?b.1N(a.Y()):!1},1K:3(a,b){2.4("9").1H[b].J(2.F(a));6 2},1I:3(a,b){a.9=2.4("9");a.13=2.w(a.13);j c=k(a.1n||8.7.1o)(a),e=2.4("M");c.16?e[c.16]=c:e.J(c);c.12&&2.Z(c.Y());2.C(b,a.9,c);6 d(c)},z:3(a){2.B(2.4(a));2.x(a,[]);6 2},B:3(a){y(j b Q a)a.11(b)&&(a[b]r 8.7.17?(8.7.G.1v(a[b]),a[b].A&&a[b].A(t)):a[b]r L&&2.B(a[b]),a[b]=t)},1w:3(a,b,c){a=2.4(a);b.s=d.1m(b.s)?b.s:[b.s];y(j e Q a)l(a.11(e)){j g=!1,f;y(f Q b.s)l(-1<d.1r(b.s[f],a[e][b.1q]))g=!0;10 l(b.V&&"1P"===b.V){g=!1;2c}c(a[e],g)}6 2},4:3(a,b){j c=2.o;l(!c[a]){l(-1<a.2e(">")){y(j e=a.T(/ /g,"").v(">"),d=0;d<e.O;d++){l(!c[e[d]])l(b)c[e[d]]=d+1<e.O?[]:b;10 6 t;c=c[e[d]]}6 c}b&&!c[a]&&2.x(a,b)}6 c[a]},2g:3(a,b,c){j d=2.4("H",a.2f||k 8.7.2i);d.R(a);d.2h(2.4("9"),2.F(b));2.C(c,d);6 2},2b:3(){t!=2.4("H")&&2.4("H").2a();6 2},x:3(a,b){2.o[a]=b;6 2},2d:3(){j a=2.4("9"),b=a.2o();d(a).1e("2q");a.2p(b);6 2},2k:3(){2.z("M").z("q").z("p").B(2.o);m.2n(2.E,2.1W)},C:3(a){a&&d.1X(a)&&a.14(2,L.K.X.W(I,1))},w:3(a){l(!a)6 k 8.7.P(0,0);l(a r 8.7.P)6 a;a=a.T(/ /g,"").v(",");6 k 8.7.P(a[0],a[1])},F:3(a){6!a?t:a r m?a[0]:a r 1Q?a:d("#"+a)[0]},1S:3(a,b,c){j d=2,g=2.4("q > U",k 8.7.U),f=2.4("q > S",k 8.7.S);b&&f.R(b);g.1U(a,3(a,b){"1T"===b?(f.26(a),f.A(d.4("9"))):f.A(t);c(a,b)})},27:3(a,b){2.4("9").29(2.4("q > 1d",k 8.7.1d(2.F(a),b)))},28:3(a,b){2.4("q > 1a",k 8.7.1a).21(a,b)},20:3(a,b){j c=k 8.7[a](m.n({9:2.4("9")},b));2.4("p > "+a,[]).J(c);6 d(c)},22:3(a,b){(!b?2.4("p > D",k 8.7.D):2.4("p > D",k 8.7.D(b,a))).R(m.n({9:2.4("9")},a))},23:3(a,b,c){2.4("p > "+a,k 8.7.1Y(b,m.n({9:2.4("9")},c)))}});m.N.n({1e:3(a){8.7.G.19(2[0],a);6 2},15:3(a,b,c){8.7&&2[0]r 8.7.17?8.7.G.24(2[0],a,b):c?2.1c(a,b,c):2.1c(a,b);6 2}});m.18("25 1R 1Z 1V 2m 2l 2j".v(" "),3(a,b){m.N[b]=3(a,d){6 2.15(b,a,d)}})})(m);',62,151,'||this|function|get||return|maps|google|map||||||||||var|new|if|jQuery|extend|instance|overlays|services|instanceof|value|null|options|split|_latLng|set|for|clear|setMap|_c|_call|FusionTablesLayer|el|_unwrap|event|iw|arguments|push|prototype|Array|markers|fn|length|LatLng|in|setOptions|DirectionsRenderer|replace|DirectionsService|operator|call|slice|getPosition|addBounds|else|hasOwnProperty|bounds|position|apply|addEventListener|id|MVCObject|each|trigger|Geocoder|data|bind|StreetViewPanorama|triggerEvent|_init|_create|center|_setup|_|typeof|substring|isArray|marker|Marker|string|property|inArray|namespace|callback|pluginName|clearInstanceListeners|find|roadmap|zoom|LatLngBounds|mapTypeId|option|addListenerOnce|Map|init|bounds_changed|gmap|controls|addMarker|ui|addControl|inViewport|fitBounds|contains|getBounds|AND|Object|rightclick|displayDirections|OK|route|mouseover|name|isFunction|KmlLayer|dblclick|addShape|geocode|loadFusion|loadKML|addListener|click|setDirections|displayStreetView|search|setStreetView|close|closeInfoWindow|break|refresh|indexOf|infoWindow|openInfoWindow|open|InfoWindow|dragend|destroy|drag|mouseout|removeData|getCenter|setCenter|resize'.split('|'),0,{}))

var email_validator = /^([a-zA-Z0-9_.-])+@([a-zA-Z0-9_.-])+\.([a-zA-Z])+([a-zA-Z])+/;
var password_validator=/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])\w{6,}/;
var locationTableData = [];
var mapClearFlag = false;
var globalVar = {};
var myVar;
var mapDataToRefresh;
function myTimer()
{
var d=new Date();
var t=d.toLocaleTimeString();
document.getElementById("currentTime").innerHTML=t;
}
$(document).ready(function(){
	//document.addEventListener("deviceready", onDeviceReady, false);
	 globalVar.new_vst_btn = document.getElementById('newVisitBtn');
	 FastClick.attach(globalVar.new_vst_btn);
	 globalVar.new_vst_btn.addEventListener('click', function() {
	  $('#newVisitBtn').css({
	   border : 'solid 2px #E2EB00'
	  });
	 
	  cordova.exec(reCreateTableSuccess, locationErrorHandler, "ListenLocation", "CreateTable", ['CreateTable Initiated']);
	 }, false);
	 
	$("#sel_vehicleType").change(function () {
	    if($(this).val() == "0") $(this).addClass("empty");
	    else $(this).removeClass("empty")
	});
	$('#imgShowPopUp').popup();
    $('#imgShowPopUp2').popup();
    $("#popupBasic").popup();
	$("#visitTime li").click(function(){
		var liId=$(this).attr("id")
		//this week=1, last week=2 and all=0
		if(liId=="liList_1"){
			getMyVisit(1);	
		}
		else if(liId=="liList_2"){
			getMyVisit(2);		
		}else{
			getMyVisit(0);		
		}
		 $(this).addClass('active').siblings().removeClass('active');
		
	})
})



function onBodyLoad() {
	document.addEventListener("deviceready", onDeviceReady, false);
}

function onDeviceReady() {
	document.addEventListener("backbutton", function(e) {
		// alert('backbutton');
		if ($.mobile.activePage.is('#appHome')) {
			//alert("app homr")
			return;
			
			//navigator.app.exitApp();
		} else if ($.mobile.activePage.is('#currentVisit')) {

			$.mobile.changePage("#appHome", {
				transition : "none"
			});
		} else if ($.mobile.activePage.is('#showCurrentMap')) {

			$.mobile.changePage("#currentVisit", {
				transition : "none"
			});
		} else if($.mobile.activePage.is('#emergency')){
			$.mobile.changePage("#appHome", {
				transition : "none"
			});
		}
		else {

			navigator.app.backHistory();
		}

	}, false);
	if (localStorage.getItem("newVisitID") == null || localStorage.getItem("newVisitID") == undefined || localStorage.getItem("newVisitID") == "") {

		
		localStorage.setItem("lastSyncUpdataeProgress", "0");
		nativeCreateTMVDb();
	} else {
		$.mobile.changePage("#appHome", {
			transition : "none"
		});
	}
}
function nativeCreateTMVDb() {
	cordova.exec(tmvDbCreateSuccess, locationErrorHandler, "ListenLocation", "CreateTable", ['CreateTable Initiated']);
}

function tmvDbCreateSuccess() {
	if (localStorage.user_pass != null && localStorage.user_pass != undefined && localStorage.user_pass != '') {
		var newObj = new trackMyVisit();
		newObj.fetchLookUpData();
		$.mobile.changePage("#appHome", {
			transition : "none"
		});
	}
}
$("#home").live("pageshow",function(event){
	if(localStorage.getItem("user_pass")!=null && localStorage.getItem("user_pass")!=undefined && localStorage.getItem("user_pass")!=''){
		$.mobile.changePage("#appHome", {
			transition : "none"
		});
	}
	
	
})
function autoLogin(element){
	
	if($(element).is(':checked')){
		
		localStorage.auto_login ='true';
	}
	else{
		
		localStorage.auto_login ='false';
	}
}
//recent changes
$("#appHome").live("pageshow",function(){
	
	if(localStorage.user_name!=undefined){
		$("#h1_userName").html(localStorage.user_name);	
	}
	console.log("Visit id--------------------->"+localStorage.getItem("newVisitID"));
	
	if(localStorage.getItem("newVisitID")!=null && localStorage.getItem("newVisitID")!=undefined){
	
		  if(localStorage.getItem("CurrentVisitTitle") !=null && localStorage.getItem("CurrentVisitTitle")!='' && localStorage.getItem("CurrentVisitTitle") !=undefined){
		        var title =localStorage.getItem("CurrentVisitTitle");
		       
		        if(title.length>15){
		    	   if(screen.width<400){
		    		   title=title.substring(0,13)
			    	   title+=".."
			       
		    	   }
		    	   else{
		    		   title=title.substring(0,15)
			    	   title+=".."
			       }
		    	   }
				
				$("#h2_homevisitTitle").html(title);
		  }
		  else{
		  
		      $("#h2_homevisitTitle").html("Click on New Visit");
		  }
		  
		  if(localStorage.getItem("CurrentVisitTo") !=null && localStorage.getItem("CurrentVisitTo")!='' && localStorage.getItem("CurrentVisitTo") !=undefined){
		       var visitTo =localStorage.getItem("CurrentVisitTo");
		       //alert(visitTo.length)
		       if(visitTo.length>18){
		    	   console.log("if app home")
		    	   if(screen.width<400){
		    		   visitTo=visitTo.substring(0,13)
			    	   visitTo+=".."
			       
		    	   }else{
		    		   visitTo=visitTo.substring(0,15)
		    	   visitTo+="..";
		    	   }
		       }
			   $("#h3_homeVisitClose").html("To:"+visitTo);
		  }
		  else{
		  
		      $("#h3_homeVisitStart").html("");
		  }
		  if(localStorage.getItem("CurrentVisitFrom") !=null && localStorage.getItem("CurrentVisitFrom")!='' && localStorage.getItem("CurrentVisitFrom") !=undefined){
		       var visitFrom =localStorage.getItem("CurrentVisitFrom");
		       if(visitFrom.length>18){
		    	   if(screen.width<400){
		    		   visitFrom=visitFrom.substring(0,13)
			    	   visitFrom+=".."
			       
		    	   }else{
		    		   visitFrom=visitFrom.substring(0,15)
		    	   visitFrom+=".."
		    	   }
		       }
			   $("#h3_homeVisitStart").html("From:"+visitFrom);
		  }
		  else{
		  
		      $("#h3_homeVisitStart").html("");
		  }
		
	}
})

$("#login").live("pageshow",function(){
	$("#login_email").val('');
	$("#login_pwd").val("");
	if(localStorage.auto_login =='true'){
		
		if(localStorage.getItem("login_userName")!=undefined||localStorage.getItem("login_userName")!=null){
			$("#login_email").val(localStorage.getItem("login_userName"))
		}
		if(localStorage.getItem("login_password")!=undefined||localStorage.getItem("login_password")!=null){
			$("#login_pwd").val(localStorage.getItem("login_password"))
		}	
	
		document.getElementById("chk_autoLogin").checked =true;
	}
	else{
		
		document.getElementById("chk_autoLogin").checked =false;
	}
})
function newVisitCheck(){
	var flagVal=localStorage.getItem("newVisitStopFlag");
	if(flagVal==1){
		notifyUserWithMessage("A visit is already in progress","Failure")
	}else{
		$.mobile.changePage("#newVisit",{transition:'none'});
		onDeviceReadyNewVisit()
		
	}
	
}

function navToCurrentVisit(){

	if(localStorage.getItem("lastSyncUpdateProgress")==0 || localStorage.getItem("myVistServerSyncFlag2")==null || localStorage.getItem("lastSyncUpdateProgress")==''||localStorage.getItem("lastSyncUpdateProgress")==undefined){
		//alert(localStorage.getItem("lastSyncUpdateProgress")+localStorage.getItem("newVisitID"))
		if(localStorage.getItem("newVisitID")!=null && localStorage.getItem("newVisitID")!=undefined && localStorage.getItem("newVisitID")!=''){
			//alert(localStorage.getItem("newVisitID"));
			$.mobile.changePage("#currentVisit",{transition:'none'})
			
		}
    } 
	
}

function onConfirmPictureSource(buttonIndex) {
	$('#imgPopup').popup("close")
	if (buttonIndex == 1) {
		getPictureGallery();
	} else if (buttonIndex == 2) {
		getPictureCamera();
	}
}

function showConfirmPictureSource() {
	//recent changes
	//navigator.notification.confirm("Please choose source", onConfirmPictureSource, "Picture Source", "Gallery,Camera");
	$('#imgPopup').popup("open")
	
}
//recent changes
function getPictureGallery() {
try{
	navigator.camera.getPicture(onPhotoDataSuccess, onFail, {
		quality : 50,
		destinationType : Camera.DestinationType.DATA_URL,
		sourceType : Camera.PictureSourceType.PHOTOLIBRARY
	});
	}catch(err){
		console.log("err--------------"+err)
	}
}

function getPictureCamera() {
try{
	navigator.camera.getPicture(onPhotoDataSuccess, onFail, {
		quality : 50,
		targetWidth : 100,
		targetHeight : 100,
		destinationType : Camera.DestinationType.DATA_URL,
		sourceType : Camera.PictureSourceType.CAMERA
	});
	}catch(err){
		
	}
}

function onPhotoDataSuccess(imageData) {
	try{
	//recent changes
//console.log("lenght--------------"+$("#gridImageGallery").find("div").length+" imageFlag"+localStorage.getItem("imageFlag"));
	if($("#gridImageGallery").find("div").length==1){
		
		localStorage.setItem("imageFlag",2);
}

	var flag=localStorage.getItem("imageFlag");
	var imageHtml="";
	console.log("flag---------------------->"+flag)
	switch(flag)
	{
	case "1":
		imageHtml+='<div class="ui-block-a frame" onclick="imgPopUp(this)">'
			localStorage.setItem("imageFlag",2);
	  break;
	case "2":
		imageHtml+='<div class="ui-block-b frame" onclick="imgPopUp(this)">'
			localStorage.setItem("imageFlag",3);
	  break;
	case "3":
		imageHtml+='<div class="ui-block-c frame" onclick="imgPopUp(this)">'
			localStorage.setItem("imageFlag",1);
	  break;
	
		
	}
	var src="data:image/jpeg;base64,"+ imageData
	imageHtml+='<img src="'+src+'"   alt="" style="width:80px;height:80px"></div>';
	//var parent = document.getElementById('gridImageGallery');
    $("#gridImageGallery").append(imageHtml);
	//recent changes
	window.localStorage.setItem("imageUploadData", imageData);
	var now = new Date();
	var now_utc = new Date(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(), now.getUTCHours(), now.getUTCMinutes(), now.getUTCSeconds());
	var datetime;
	if (now_utc.getMonth() < 10) {
		datetime = "0" + now_utc.getMonth() + "-" + now_utc.getDate() + "-" + now_utc.getFullYear();
	} else {
		datetime = now_utc.getMonth() + "-" + now_utc.getDate() + "-" + now_utc.getFullYear();
	}
	var newObj = new trackMyVisit();
	newObj.saveVisitPicture(localStorage.getItem("newVisitID"), "Visit Picture", datetime);
	}catch(err){
		console.log("errrr-----"+err)
		
	}
}

function imgPopUp(element){
	var srcVal=$(element).find("img").attr("src")
	console.log("srcVal---------------"+srcVal);
	$("#previewImg").attr("src",srcVal);
	$('#imgShowPopUp').popup("open")
	
}

function imgPopUp2(element){
	var srcVal=$(element).find("img").attr("src")
	console.log("srcVal---------------"+srcVal);
	$("#previewImg2").attr("src",srcVal);
	$('#imgShowPopUp2').popup("open")
	
}

function onFail(message) {
	//notifyUserWithMessage(message, 'Load picture error');
	notifyUserWithMessage("Picture is not uploaded correctly, please try again", 'Error');
	
}

var smsSendingPlugin = cordova.require('cordova/plugin/smssendingplugin');
function confirmEmergencyAppHomeAlert(){
	 navigator.notification.confirm(
		        'Are you sure to send the Emergency Alert Message to Emergency Contacts?',  // message
		        onConfirmEmergencyAlert,              // callback to invoke with index of button pressed
		        'Alert confirmation',            // title
		        'Yes,No'          // buttonLabels
		    );
	
}
function onConfirmEmergencyAlert(buttonIndex) {
	//alert(buttonIndex)
	if (buttonIndex == 1) {
		
		emergencyAppHomeAlert()
	} else if (buttonIndex == 2) {
		
	}
}
function emergencyAppHomeAlert(){
	//alert("emergency aap home alert")
	console.log("emergency aap home alert")
	$.mobile.showPageLoadingMsg();
	
	navigator.geolocation.getCurrentPosition(onAppHomeGeoLocSuccess, onAppHomeGeoLocError,{enableHighAccuracy: false });
}

function onAppHomeGeoLocSuccess(position) {
	console.log(position.coords.latitude+" "+position.coords.longitude);
	getAppHomeLocality(parseFloat(position.coords.latitude), parseFloat(position.coords.longitude));
}
    
function onAppHomeGeoLocError(error) {
    console.log('onGeoLocError code: '    + error.code    + ' ' +
            'message: ' + error.message);
            $.mobile.hidePageLoadingMsg();
            sendEmergencyMessageToSignupNo('');
}

function getAppHomeLocality(posLat, posLong) {
	var geocoder1 = new google.maps.Geocoder();
	var latlng1 = new google.maps.LatLng(posLat, posLong);
	
	geocoder1.geocode({
		'latLng' : latlng1
	}, function(results, status) {
		if (status == google.maps.GeocoderStatus.OK) {
			console.log("Google Address"+JSON.stringify(results));
			if (results[0]) {
				var arrAddress = results[0].formatted_address;
				if(arrAddress !=undefined && arrAddress !=null && arrAddress!=''){
				   sendEmergencyMessageToSignupNo(arrAddress);
				}
				else{
				
				   sendEmergencyMessageToSignupNo('');
				}
				
			}
		}
		else{
		  sendEmergencyMessageToSignupNo('');
		}
	});
	$.mobile.hidePageLoadingMsg();
}

function sendEmergencyMessageToSignupNo(locName){
        var dateObj =new Date();
        var message_text =localStorage.emer_text;
        if(locName !=undefined && locName !=null && locName !=''){
	      var message_format =message_text.replace('#Address#', locName);  
	    }
	    else{
	      var message_format =message_text.replace('#Address#', '');
	    }
	    message_format =message_format.replace('#Time#', dateObj);
     
            //alert(message_format);
		smsSendingPlugin.isSupported((function(supported) {
			if (supported) {
				var contacts = [];
				if (localStorage.signup_contact1 != null && localStorage.signup_contact1 != undefined && localStorage.signup_contact1 !="") {
					contacts.push(localStorage.signup_contact1);
				}
				if (localStorage.signup_contact2 != null && localStorage.signup_contact2 != undefined && localStorage.signup_contact2 !="") {
					contacts.push(localStorage.signup_contact2);
				}
				if (localStorage.signup_contact3 != null && localStorage.signup_contact3 != undefined && localStorage.signup_contact3 !="") {
					contacts.push(localStorage.signup_contact3);
				}
				
				console.log("contacts-------------"+JSON.stringify(contacts));
				if(contacts.length > 0){
					console.log("contact if")
				    $.each(contacts,function(){
				    	console.log("each function "+ this.value+this)
				    	smsSendingPlugin.send(this, message_format , function() {
						console.log("Message sent successfully");
						}, function() {
							console.log("Message not sent");
						});
				    	
				    });
				 }
				else{
				  notifyUserWithMessage('Please add Emergency Numbers from Contact List to send Emergency Alert Message', 'Message');
				  //alert('Please add emergency numbers to send emergency message');
				}
				
				
			} else {
				//console.log("SMS not supported");
				notifyUserWithMessage('Sorry, SMS is not supported. Please check with Network Operator or try again', 'Error');
			}
		}), function() {
		    notifyUserWithMessage('Sorry, SMS is not supported. Please check with Network Operator or try again', 'Error');
			//alert("There is no SMS support in application");
		});
}

function sendComposeMessage(locName) {
	var dateObj =new Date();
    var message_text =localStorage.emer_text;
    if(locName !=undefined && locName !=null && locName !=''){
      var message_format =message_text.replace('#Address#', locName);  
    }
    else{
      var message_format =message_text.replace('#Address#', '');
    }
    message_format =message_format.replace('#Time#', dateObj);
       // alert(message_format)
	//modified by jitendra 1-May-2013
	//alert(localStorage.emer_text);
		smsSendingPlugin.isSupported((function(supported) {
			if (supported) {
				var contacts = [];
				if (localStorage.signup_contact1 != null && localStorage.signup_contact1 != undefined && localStorage.signup_contact1 !="") {
					contacts.push(localStorage.signup_contact1);
				}
				if (localStorage.signup_contact2 != null && localStorage.signup_contact2 != undefined && localStorage.signup_contact2 !="") {
					contacts.push(localStorage.signup_contact2);
				}
				if (localStorage.signup_contact3 != null && localStorage.signup_contact3 != undefined && localStorage.signup_contact3 !="") {
					contacts.push(localStorage.signup_contact3);
				}
				if (localStorage.visit_contactno1 != null && localStorage.visit_contactno1 != undefined && localStorage.visit_contactno1 !="") {
					contacts.push(localStorage.visit_contactno1);
				}
				if (localStorage.visit_contactno2 != null && localStorage.visit_contactno2 != undefined && localStorage.visit_contactno2 !="") {
					contacts.push(localStorage.visit_contactno2);
				}
				if (localStorage.visit_contactno3 != null && localStorage.visit_contactno3 != undefined && localStorage.visit_contactno3 !="") {
					contacts.push(localStorage.visit_contactno3);
				}
				console.log("contacts-------------"+JSON.stringify(contacts));
				if(contacts.length > 0){
					console.log("contact if")
				    $.each(contacts,function(){
				    	console.log("each function "+ this.value+this)
				    	smsSendingPlugin.send(this, message_format, function() {
						console.log("Message sent successfully");
						}, function() {
							console.log("Message not sent");
						});
				    	
				    })
//					for ( z = 1; z <= contacts.length; z++) {
//					
//				    	console.log("contact" + contacts[z]+ " "+localStorage.user_name + " sent emergency alert from location")
//						smsSendingPlugin.send(contacts[z], localStorage.user_name + " sent emergency alert from location", function() {
//							console.log("Message sent successfully");
//						}, function() {
//							console.log("Message not sent");
//						});
//					}
				 }
				else{
				  notifyUserWithMessage('Please add Emergency Numbers from Contact List to send Emergency Alert Message', 'Message');
				  //alert('Please add emergency numbers to send emergency message');
				}
				
				
			} else {
				//console.log("SMS not supported");
				notifyUserWithMessage('Sorry, SMS is not supported. Please check with Network Operator or try again', 'Error');
			}
		}), function() {
		    notifyUserWithMessage('Sorry, SMS is not supported. Please check with Network Operator or try again', 'Error');
			//alert("There is no SMS support in application");
		});
	}


function notifyUserWithMessage(msg, title) {
	navigator.notification.alert(msg, function() {
	}, title, 'Ok');
}

function startTrackLocation() {
	//localStorage.setItem("gpsUpdateTimeInterval", "1"); //in minutes
	localStorage.setItem("gpsUpdateDistance", "1000"); //in meter
	var newObj = new trackMyVisit();
	console.log("locationSuccessHandler Log------->"+"ListenLocation Initiated "+newObj.fetchLookUpId("Auto")+" "+newObj.fetchLookUpId("End Proposed")+" "+localStorage.getItem("newVisitID")+" "+localStorage.getItem("gpsUpdateTimeInterval")+" "+localStorage.getItem("gpsUpdateDistance"));
	cordova.exec(locationSuccessHandler, locationErrorHandler, "ListenLocation", "ListenLocation", ['ListenLocation Initiated', newObj.fetchLookUpId("Auto"), newObj.fetchLookUpId("End Proposed"), localStorage.getItem("newVisitID"), localStorage.getItem("gpsUpdateTimeInterval"), localStorage.getItem("gpsUpdateDistance")]);
}


function stopTrackLocation() {
	var newObj = new trackMyVisit();
	console.log("locStopSuccessHandler Log------->"+"ListenLocation Stopped "+newObj.fetchLookUpId("Auto")+" "+newObj.fetchLookUpId("End Proposed")+" "+localStorage.getItem("newVisitID"));
	navigator.geolocation.getCurrentPosition(getCurrentPosUpdate, getCurrentPosError,{enableHighAccuracy: false });
	//cordova.exec(locStopSuccessHandler, locationErrorHandler, "ListenLocation", "StopListenLocation", ['ListenLocation Stopped', newObj.fetchLookUpId("Auto"), newObj.fetchLookUpId("End Proposed"), localStorage.getItem("newVisitID"), localStorage.getItem("gpsUpdateTimeInterval"), localStorage.getItem("gpsUpdateDistance")]);
}

function getCurrentPosUpdate(position) {
	console.log("getCurrentPosUpdate SUCCESS");
	var tmpFlag1 = true;
	localStorage.setItem("geoPlace","");
	var tmpLat = position.coords.latitude;
	var tmpLong = position.coords.longitude;
	var geocoder1 = new google.maps.Geocoder();
	var latlng1 = new google.maps.LatLng(parseFloat(tmpLat), parseFloat(tmpLong));
	var curDateTimeStr = new Date().toString('yyyy-MM-dd HH:mm:ss');
	var newObj = new trackMyVisit();
	geocoder1.geocode({
		'latLng' : latlng1
	}, function(results, status) {
		if (status == google.maps.GeocoderStatus.OK) {
			console.log("Google Address"+JSON.stringify(results));
			if (results[0]) {
				var arrAddress = results[0].address_components;
				$.each(arrAddress, function(i, address_component) {
					if(tmpFlag1){
						console.log("if======"+tmpFlag1)
						if(address_component.types[0] == "locality"){
							console.log(address_component.long_name);
							localStorage.setItem("geoPlace",address_component.long_name);
							tmpFlag1 = false;	
						}
						
						else if (address_component.types[0] == "route") {
							console.log(address_component.long_name);
							localStorage.setItem("geoPlace",address_component.long_name);
							tmpFlag1 = false;
						}
						 else {
							localStorage.setItem("geoPlace","");
						}
					}
				});
			}
		}
		cordova.exec(lastInsertLoctionSuccess, lastInsertLoctionFailure, "ListenLocation", "InsertRowInTracker", [localStorage.getItem("newVisitID"), tmpLat, tmpLong, localStorage.getItem("geoPlace"), newObj.fetchLookUpId("End Proposed"), curDateTimeStr]);
	});
	//cordova.exec(locStopSuccessHandler, locationErrorHandler, "ListenLocation", "StopListenLocation", ['ListenLocation Stopped', newObj.fetchLookUpId("Auto"), newObj.fetchLookUpId("End Proposed"), localStorage.getItem("newVisitID"), localStorage.getItem("gpsUpdateTimeInterval"), localStorage.getItem("gpsUpdateDistance"), tmpLat, tmpLong]);
}

function lastInsertLoctionSuccess(resultData){
	console.log("lastInsertLoctionSuccess SUCCESS " + resultData);
	cordova.exec(fetchUpdateDeleteSuccess, fetchUpdateDeleteFailure, "ListenLocation", "FetchRowFromTracker", ["FetchRowFromTracker"]);
}

function lastInsertLoctionFailure(error){
	console.log("lastInsertLoctionFailure error " + error);
	//cordova.exec(fetchUpdateDeleteSuccess, fetchUpdateDeleteFailure, "ListenLocation", "FetchRowFromTracker", ["FetchRowFromTracker"]);
}

function locStopSuccessHandler(resultData){
	console.log("locStopSuccessHandler SUCCESS " + resultData);
	//cordova.exec(fetchUpdateDeleteSuccess, fetchUpdateDeleteFailure, "ListenLocation", "FetchRowFromTracker", ["FetchRowFromTracker"]);
}

function fetchUpdateDeleteSuccess(jsonData){
	var jsonData =JSON.parse(jsonData);
	var newObj = new trackMyVisit();
	console.log("fetchUpdateDeleteSuccess SUCCESS " + jsonData);
	if(jsonData !=null && jsonData !=undefined){
			if (jsonData.length > 0) {
				localStorage.setItem("lastSync","1");
				newObj.updateSyncServer(jsonData);
			} 
	} else {
		console.log('resultData is undefined fetchUpdateDeleteSuccess------'+jsonData);
	}
	cordova.exec(locStopSuccessHandler, locationErrorHandler, "ListenLocation", "StopListenLocation", ['ListenLocation Stopped', newObj.fetchLookUpId("Auto"), newObj.fetchLookUpId("End Proposed"), localStorage.getItem("newVisitID"), localStorage.getItem("gpsUpdateTimeInterval"), localStorage.getItem("gpsUpdateDistance")]);
}

function fetchUpdateDeleteFailure(error){
	console.log("fetchUpdateDeleteFailure error " + error);
}

function getCurrentPosError(error){
	console.log("getCurrentPosError error " + error);
}

function locationSuccessHandler(resultData) {
	console.log("locationSuccessHandler Success " + resultData);
	cordova.exec(fetchAndSaveSuccess, locationErrorHandler, "ListenLocation", "FetchRowFromTracker", ["FetchRowFromTracker"]);			
			
}	

function fetchAndSaveSuccess(resultData){
	var jsonData =JSON.parse(resultData);
	if(jsonData !=null && jsonData !=undefined){
		if (jsonData.length > 0) {
			var syncObj = new trackMyVisit();
			syncObj.updateSyncServer(jsonData);
	   } 
	}
	else{
		console.log('resultData is undefined------'+resultData);
	}
	
}	

function dropTrackerTableSuccess(resultData){
	console.log("dropTrackerTableSuccess Success " + resultData);
}
function locationErrorHandler(error) {
	console.log("ListenLocation ERROR " + error);
}
function checkLogin() {
	//modified by jitendra 1-May-2013
		if ($('#login_email').val() == '' || $('#login_email').val() == null) {
	        $('#login_email').focus();
			notifyUserWithMessage('Please enter Email', 'Error');
			return;
		} else if (!email_validator.test($('#login_email').val())) {
		    $('#login_email').focus();
			notifyUserWithMessage('Please enter Valid Email', 'Error');
			return;
		} else if ($('#login_pwd').val() == '' || $('#login_pwd').val() == null) {
		     $('#login_pwd').focus();
			notifyUserWithMessage('Please enter Password', 'Error');
			return;
		} else {

			  var chkVal = document.getElementById("chk_autoLogin").checked;
			  if(chkVal==true){
				localStorage.setItem("login_userName",$('#login_email').val());
				localStorage.setItem("login_password",$('#login_pwd').val());
				localStorage.auto_login ='true';
			  }
			  else{
			  	
			  	localStorage.auto_login ='false';
			  }
			 var newObj = new trackMyVisit();
			 newObj.Login($('#login_email').val(), $('#login_pwd').val());
		}
	}

function getImage(element) {
	var liElement = $(element).parent().parent();
	//var id = $(liElement).attr("id");
	var idArray = $(element).attr("id").split("_");
	var id=idArray[1];
	window.localStorage.setItem("getVisitDetailsID", id)
	//var id = window.localStorage.getItem("getVisitDetailsID")
	var newObj = new trackMyVisit();
	//newObj.getAllFriends();
	newObj.getVisitImages(id);
}

function register() {
	//modified by jitendra 1-May-2013
		var now = new Date();
		var now_utc = new Date(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(), now.getUTCHours(), now.getUTCMinutes(), now.getUTCSeconds());
		if (now_utc.getMonth() < 10) {
			var datetime = "0" + now_utc.getMonth() + "-" + now_utc.getDate() + "-" + now_utc.getFullYear();
		} else {
			var datetime = now_utc.getMonth() + "-" + now_utc.getDate() + "-" + now_utc.getFullYear();
		}
		 var flag =true;
		    var nameStr =$('#fullName').val();
		    if($('#fullName').val().indexOf(' ') > 0){
		      for(x=0; x < nameStr.length; x++){
		    
		      if(nameStr.charAt(x) ==' '){
		        if(nameStr.charAt(x)==' ' && nameStr.charAt(x+1) ==' '){
		          flag =false;
		          break;
		        }
		      }
		   }
		    }
//		if($('#fullName').val().indexOf(' ') > 0){
//		    var strArr =$('#fullName').val().split(' ');
//		  }
//		  else{
//		     var strArr ='';
//		  }
		if($('#userPass').val().indexOf(' ') > 0){
		    var strPass =$('#userPass').val().split(' ');
		  }
		  else{
		     var strPass ='';
		  }
		if ($('#fullName').val() == '' || $('#fullName').val() == null) {
	        $('#fullName').focus();
			notifyUserWithMessage('Name can not be empty', 'Error');
			return;
		}
		else if ( $('#fullName').val().length < 3) {
	        $('#fullName').focus();
			notifyUserWithMessage('Name should have minimum 3 character', 'Error');
			return;
		}
		else if ( $('#fullName').val().length > 50) {
	        $('#fullName').focus();
			notifyUserWithMessage('Name can be of maximum 50 character', 'Error');
			return;
		} 
		else if ($('#fullName').val().charAt(0) ==' ') {
			$('#fullName').focus();
			notifyUserWithMessage('Please remove space before name', 'Error');
			return;
		} 
		else if ($('#fullName').val().charAt($('#fullName').val().length-1) ==' ') {
			$('#fullName').focus();
			notifyUserWithMessage('Please remove space at the end of name', 'Error');
			return;
		} 
		else if(flag==false) {

			$('#fullName').focus();
			notifyUserWithMessage('Space cannot be more then 1 between between words', 'Error');
			return;
		}
		else if(/^[a-zA-Z0-9- ]*$/.test($('#fullName').val()) == false) {
		      notifyUserWithMessage('Please enter valid characters in name', 'Error');
		      return;
		  }
		else if ($('#userPass').val().charAt(0) ==' ') {
			$('#userPass').focus();
			notifyUserWithMessage('Please remove space before password', 'Error');
			return;
		} 
		else if ($('#userPass').val().charAt($('#userPass').val().length-1) ==' ') {
			$('#userPass').focus();
			notifyUserWithMessage('Please remove space at the end of password', 'Error');
			return;
		} 
		else if(strPass.length > 1 ) {

			$('#userPass').focus();
			notifyUserWithMessage('Space is not allowed between characters used for password', 'Error');
			return;
		}
		else if ($('#emailId').val() == '' || $('#emailId').val() == null) {
	        $('#emailId').focus();
			notifyUserWithMessage('Please enter Email', 'Error');
			return;
		} else if (!email_validator.test($('#emailId').val())) {
		    $('#emailId').focus();
			notifyUserWithMessage('Please enter valid Email', 'Error');
			return;
		} else if ($('#userPass').val() == '' || $('#userPass').val() == null) {
	         $('#userPass').focus();
			notifyUserWithMessage('Please enter Password', 'Error');
			return;
		} 
		else if ($('#userPass').val().length > 40 ) {
	         $('#userPass').focus();
			notifyUserWithMessage('Password can be maximum of 40 characters', 'Error');
			return;
		}
		else if ($('#confirmPass').val() == '' || $('#confirmPass').val() == null) {
	         $('#confirmPass').focus();
			notifyUserWithMessage('Please enter confirm password', 'Error');
			return;
		} else if ($('#userPass').val().length <= 5) {
	         $('#confirmPass').focus();
			notifyUserWithMessage('Password Should have more than 5 characters ', 'Error');
			return;
		} else if ($('#confirmPass').val().length <= 5) {
	          $('#confirmPass').focus();
			notifyUserWithMessage('Password Should have more than 5 characters', 'Error');
			return;
		} else if (!($('#userPass').val() == $('#confirmPass').val())) {
	         $('#confirmPass').focus();
			notifyUserWithMessage('Password and Confirm Password is not match, both should be same.', 'Error');
			return;
		}
		 else {
		         if (!($('#mobileNo1').val() == '' || $('#mobileNo1').val() ==null)) {
					if(isNaN($('#mobileNo1').val())){
					   $('#mobileNo1').focus();
					  notifyUserWithMessage('Please enter valid Emergency Number', 'Error');
					  return;
					}else if($('#mobileNo1').val().length>20){
						$('#mobileNo1').focus();
						  notifyUserWithMessage('Emergency Number cannot be more than 20 digits', 'Error');
						  return;
					}else if($('#mobileNo1').val().length<10){
						$('#mobileNo1').focus();
						  notifyUserWithMessage('Emergency number cannot be less than 10 digits', 'Error');
						  return;
					}
					
				}
				if (!($('#mobileNo2').val() == '' || $('#mobileNo2').val() ==null)) {
					if(isNaN($('#mobileNo2').val())){
					  $('#mobileNo2').focus();
					  notifyUserWithMessage('Please enter valid emergency number', 'Error');
					  return;
					}else if($('#mobileNo2').val().length>20){
						$('#mobileNo2').focus();
						  notifyUserWithMessage('Emergency number cannot be more than 20 digits', 'Error');
						  return;
					}else if($('#mobileNo2').val().length<10){
						$('#mobileNo2').focus();
						  notifyUserWithMessage('Emergency number cannot be less than 10 digits', 'Error');
						  return;
					}
					
				}
				if (!($('#mobileNo3').val() == '' || $('#mobileNo3').val() ==null)) {
					if(isNaN($('#mobileNo3').val())){
					  $('#mobileNo3').focus();
					  notifyUserWithMessage('Please enter valid emergency number', 'Error');
					  return;
					}else if($('#mobileNo3').val().length>20){
						$('#mobileNo3').focus();
						  notifyUserWithMessage('Emergency number cannot be more than 20 digits', 'Error');
						  return;
					}else if($('#mobileNo3').val().length<10){
						$('#mobileNo3').focus();
						  notifyUserWithMessage('Emergency number cannot be less than 10 digits', 'Error');
						  return;
					}
					
				}
				console.log("register")
			var newObj = new trackMyVisit();
			newObj.registerUser($('#fullName').val(), $('#emailId').val(), $('#userPass').val(), datetime, $('#mobileNo1').val(), $('#mobileNo2').val(), $('#mobileNo3').val());
		}

	}



//-----------------------------------------------------------------------------------------------------
function passwordForgot() {

	if ($('#forgetEmailId').val() == '' || $('#forgetEmailId').val() == null) {

		notifyUserWithMessage('Please enter Email', 'Error');
		return;
	} else if (!email_validator.test($('#forgetEmailId').val())) {
		notifyUserWithMessage('Please enter valid Email', 'Error');
		return;
	} else {
		var newObj = new trackMyVisit();
		newObj.forgotPassword($('#forgetEmailId').val());
	}

}

function getMapPageFrom() {
	localStorage.setItem("directionType", "From")
	$.mobile.changePage("#mapDialog",{transition:'none'});
}

function getMapPageTo() {

	localStorage.setItem("directionType", "To")
	$.mobile.changePage("#mapDialog",{transition:'none'});
}

function getDirectionData(element) {
	var idArray = element.split("_");
	var idVal = idArray[1];
	if (localStorage.getItem("directionType") == "From") {
		var latLong = $("#hid_" + idVal).val();
		var name = $("#span_" + idVal).text();
		$("#startPlace").val(name);
		localStorage.setItem("directionFrom", latLong);
		localStorage.setItem("directionFromName", name);

	} else if (localStorage.getItem("directionType") == "To") {
		var latLong = $("#hid_" + idVal).val();
		var name = $("#span_" + idVal).html();
		$("#endPlace").val(name);
		localStorage.setItem("directionTo", latLong);
		localStorage.setItem("directionToName", name);

	}

	$.mobile.changePage("#newVisit",{transition:'none'});

}

function showErrorPosition() {
     $.mobile.hidePageLoadingMsg();
	alert("Sorry your phone doesnot support GPS, please enable GPS location");
}

$("#newVisit").live('pageshow', function(e) {
		$('#newVisitBtn').css({border: 'solid 1px #EB0E00'});
		  $("#startPlace").val("")
		  $("#endPlace").val("");
		  $("#vehicleNo").val("");
		  $("#visitDuration").val("");
	if (localStorage.getItem("directionFrom") != undefined || localStorage.getItem("directionFrom") != null) {
		$("#startPlace").val(localStorage.getItem("directionFromName"))
	}
	if (localStorage.getItem("directionTo") != undefined || localStorage.getItem("directionTo") != null) {
		$("#endPlace").val(localStorage.getItem("directionToName"))
	}

})

	$('#mapPlotCheckPoint').live('pageshow', function(event) {

	document.addEventListener("deviceready", onDeviceReadyMapCheck, false);
	function onDeviceReadyMapCheck() {
		navigator.geolocation.getCurrentPosition(showPosition, showErrorPosition,{enableHighAccuracy: false });
	}

$("#placesCheck").val("Search location");
	$("#ul_searchLocationCheck").empty();
	var defLatitude = -25.363882;
	var defLongitude = 131.044922;

	var o = {
		'center' : '58.00, 12.00',
		'zoom' : 10,
		'streetViewControl' : false,
		'zoomControl' : false,
		'panControl' : false,
		'mapTypeControl' : false,
		'mapTypeId' : 'terrain'
	};
	$('#map_checkPoint').gmap(o).bind('init', function(event, map) {
		
		$('#map_checkPoint').gmap('addControl', 'control', 1);
		
		$('#map_checkPoint').gmap('autocomplete', 'placesCheck', function(ui) {
			//alert(ui.item.position);
			$('#map_checkPoint').gmap('clear', 'markers');
			$('#map_checkPoint').gmap('set', 'bounds', null);
			$('#map_checkPoint').gmap('addMarker', {/*'id': item.id, 'icon': item.icon,*/
				'position' : ui.item.position,
				'bounds' : true
			}).click(function() {
				$('#map_canvas').gmap('openInfoWindow', {
					'content' : '<h4>' + ui.item.name + '</h4>'
				}, this);
			});
			$('#map_checkPoint').gmap('placesSearch', {
				'location' : ui.item.position,
				'radius' : '5000'/*, 'name': ['store']*/
			}, function(results, status) {
				$("#placesCheck").blur()
				if (status === 'OK') {
					$("#placesCheck").blur()
					var searchHtml = "<ul>";
					$.each(results, function(i, item) {
						console.log("key ---->"+i+" Value---->"+item);
						searchHtml += '<li style="padding:2px;" id="liCheck__' + item.id + '" onclick="getCheckPointData(\''+item.geometry.location+'\',\''+escape(item.name)+'\', this)"><input type="hidden"  id="hid_' + item.id + '" value="' + item.geometry.location + '">';
						searchHtml += '<img src="'+item.icon+'"  alt="" style="width:20px;hieght:20px">';
						searchHtml += '<h2>';
						searchHtml += '<span id="span_' + item.id + '">' + item.name + '</span>';
						searchHtml += '</h2>';
						searchHtml += '<h3> </h3>';
						searchHtml += '</li>';
						$('#map_checkPoint').gmap('addMarker', {
							'id' : item.id, /*'icon': item.icon,*/
							'position' : item.geometry.location,
							'bounds' : true
						}).click(function() {
							$('#map_checkPoint').gmap('openInfoWindow', {
								'content' : '<h4>' + item.name + '</h4>'
							}, this);
						});
					});
					searchHtml += "</ul>";
					console.log("searchHtml ---->"+searchHtml);
					$("#ul_searchLocationCheck").empty();
					$("#ul_searchLocationCheck").append(searchHtml);

				}

			});
		});
		$('#control').show();
	});

	function showPosition(position) {
		defLatitude = position.coords.latitude
		defLongitude = position.coords.longitude;
		//alert(defLatitude + defLongitude)
		plotNearPlaces();
	}

	
	function plotNearPlaces() {
		var newObjPoints = new google.maps.LatLng(defLatitude, defLongitude);
		console.log(newObjPoints)
		$('#map_checkPoint').gmap('placesSearch', {
			'location' : newObjPoints,
			'radius' : '5000'/*, 'name': ['store']*/
		}, function(results, status) {
			$("#placesCheck").blur()
			if (status === 'OK') {
				$("#placesCheck").blur()
				var searchHtml = "<ul>";
				$.each(results, function(i, item) {
					//searchHtml += '<li id="liCheck_' + item.id + '" onclick="getCheckPointData(this)"><input type="hidden"  id="hid_' + item.id + '" value="' + item.geometry.location + '" name="' + item.name + '"><span id="span_' + item.id + '">' + item.name + '</li>';
					console.log("key ---->"+i+" Value---->"+item);
						searchHtml += '<li id="liCheck__' + item.id + '" onclick="getCheckPointData(\''+item.geometry.location+'\',\''+escape(item.name)+'\',this)"><input type="hidden"  id="hid_' + item.id + '" value="' + item.geometry.location + '">';
						searchHtml += '<img src="'+item.icon+'"  alt="" style="width:20px;hieght:20px">';
						searchHtml += '<h2>';
						searchHtml += '<span id="span_' + item.id + '">' + item.name + '</span>';
						searchHtml += '</h2>';
						searchHtml += '<h3> </h3>';
						searchHtml += '</li>';
					$('#map_checkPoint').gmap('addMarker', {
						'id' : item.id, /*'icon': item.icon,*/
						'position' : item.geometry.location,
						'bounds' : true
					}).click(function() {
						$('#map_checkPoint').gmap('openInfoWindow', {
							'content' : '<h4>' + item.name + '</h4>'
						}, this);
					});
				});
				searchHtml += "</ul>";
				console.log("searchHtml ---->"+searchHtml);
				$("#ul_searchLocationCheck").empty();
				$("#ul_searchLocationCheck").append(searchHtml);
				
			}

		});

	}

	var defaultValue = $('#placesCheck').val();
	$('#placesCheck').focus(function() {
		if ($(this).val() === defaultValue) {
			$(this).val('');
		}
	}).blur(function() {
		if ($(this).val() == '') {
			$(this).val(defaultValue);
		}
	});

});


function changeHeaderVal(val){
	if(val!=undefined){
		var valArray=val.split("_")
		console.log("val array-------"+JSON.stringify(valArray))
		if(valArray[0]!=undefined && valArray[0]!=null && valArray[0]!="undefined"){
			var placeName=valArray[0]
			if(valArray[0].length>20){
				placeName=valArray[0].substring(0,18)
				placeName+=".."
			}
			$("#h2_placeName").html(placeName)
		}
		if(valArray[1]!=undefined&&valArray[1]!=null){
			$("#span_placedate").html(valArray[1])

		}


	}	
}

function resetMapIconMyVisit(){
	
	drawMapCheckPoint(mapDataToRefresh)
}
function drawMapCheckPoint(data) {

	mapDataToRefresh=data;
	$('#map_showCheckPointMap').gmap('clear', 'markers');

	var origin = new google.maps.LatLng(data.coord[data.coord.length - 1].latitude, data.coord[data.coord.length - 1].longitude);
	console.log("origin=========>"+JSON.stringify(origin));
	$('#map_showCheckPointMap').gmap('get', 'map').setOptions({
		'center' : origin,
		'zoom' : 7
	});

	$.each(data.coord, function(i, item) {
		console.log("key----" + i + " Item-------" + item.latitude + " " + item.longitude + " " + item.chktypid+" "+item.clickVal);
		switch(item.chktypid) {
		case "1":
			console.log("case 1 executed");
			$('#map_showCheckPointMap').gmap('addMarker', {
				'icon' : "images/auto_loc.png",
				'position' : new google.maps.LatLng(item.latitude, item.longitude),
				'bounds' : true
			}).click(function() {
				this.setIcon('images/auto_loc_small.png')
				changeHeaderVal(item.clickVal);
				$('#map_showCheckPointMap').gmap('openInfoWindow', {
					'content' : item.location
				}, this);
			});
			break;
		case "2":
			console.log("case 2 executed");
			$('#map_showCheckPointMap').gmap('addMarker', {
				'icon' : "images/user_loc.png",
				'position' : new google.maps.LatLng(item.latitude, item.longitude),
				'bounds' : true
			}).click(function() {
				this.setIcon('images/user_loc_small.png')
				changeHeaderVal(item.clickVal);
				$('#map_showCheckPointMap').gmap('openInfoWindow', {
					'content' : item.location
				}, this);
			});
			break;
		case "3":
			console.log("case 3 executed");
			$('#map_showCheckPointMap').gmap('addMarker', {
				'icon' : "images/start_loc.png",
				'position' : new google.maps.LatLng(item.latitude, item.longitude),
				'bounds' : true
			}).click(function() {
				this.setIcon('images/start_loc_small.png')
				changeHeaderVal(item.clickVal);
				$('#map_showCheckPointMap').gmap('openInfoWindow', {
					'content' : item.location
				}, this);
			});
			break;
		case "4":
			console.log("case 4 executed");
			$('#map_showCheckPointMap').gmap('addMarker', {
				'icon' : "images/close_loc.png",
				'position' : new google.maps.LatLng(item.latitude, item.longitude),
				'bounds' : true
			}).click(function() {
				this.setIcon('images/close_loc_small.png')
				changeHeaderVal(item.clickVal);
				$('#map_showCheckPointMap').gmap('openInfoWindow', {
					'content' : item.location
				}, this);
			});
			break;
		case "5":
			console.log("case 5 executed");
			$('#map_showCheckPointMap').gmap('addMarker', {
				'icon' : "images/end_loc.png",
				'position' : new google.maps.LatLng(item.latitude, item.longitude),
				'bounds' : true
			}).click(function() {
				this.setIcon('images/end_loc_small.png')
				changeHeaderVal(item.clickVal);
				$('#map_showCheckPointMap').gmap('openInfoWindow', {
					'content' : item.location
				}, this);
			});
			break;
		case "6":
			console.log("case 6 executed");
			$('#map_showCheckPointMap').gmap('addMarker', {
				'icon' : "images/emer_loc.png",
				'position' : new google.maps.LatLng(item.latitude, item.longitude),
				'bounds' : true
			}).click(function() {
				this.setIcon('images/emer_loc_small.png')
				changeHeaderVal(item.clickVal);
				$('#map_showCheckPointMap').gmap('openInfoWindow', {
					'content' : item.location
				}, this);
			});
			break;

		}
	});
	$('#map_showCheckPointMap').gmap('refresh');
	console.log("~~~~~~~ Map Updated ~~~~~~~");

}

$('#mapDialog').live('pageshow', function(event) {
	
	if (localStorage.getItem("directionType") == "From") {
		console.log("map dialo if")
		$("#places").attr("style","display:none")

	} else if (localStorage.getItem("directionType") == "To") {
		console.log("map dialo else");
		$("#places").removeAttr("style");
		$("#places").val("Search Location..");
		console.log("map dialoggg else");
	}
	
	if (localStorage.getItem("directionType") == "From") {
	   $.mobile.showPageLoadingMsg();
		navigator.geolocation.getCurrentPosition(showPosition, showErrorPosition, {enableHighAccuracy: false });
		//alert("#map_canvas");
	} 
	$("#ul_searchLocation").empty();
	var defLatitude = -25.363882;
	var defLongitude = 131.044922;

	var o = {
		'center' : '58.00, 12.00',
		'zoom' : 10,
		'streetViewControl' : false,
		'zoomControl' : false,
		'panControl' : false,
		'mapTypeControl' : false,
		'mapTypeId' : 'terrain'
	};
	$('#map_canvas').gmap(o).bind('init', function(event, map) {
	   
		$('#map_canvas').gmap('addControl', 'control', 1);
		$('#map_canvas').gmap('autocomplete', 'places', function(ui) {
			
			
			$('#map_canvas').gmap('clear', 'markers');
			$('#map_canvas').gmap('set', 'bounds', null);
			$('#map_canvas').gmap('addMarker', {/*'id': item.id, 'icon': item.icon,*/
				'position' : ui.item.position,
				'bounds' : true
			}).click(function() {
				$('#map_canvas').gmap('openInfoWindow', {
					'content' : '<h4>' + ui.item.name + '</h4>'
				}, this);
			});
			$('#map_canvas').gmap('placesSearch', {
				'location' : ui.item.position,
				'radius' : '5000'/*, 'name': ['store']*/
			}, function(results, status) {
				$("#places").blur();
				if (status === 'OK') {
					
					$("#places").blur();
					var searchHtml = "<ul>";
					$.each(results, function(i, item) {
						console.log("key ---->"+i+" Value---->"+item);
						searchHtml += '<li id="li_' + item.id + '" onclick="getDirectionData(this.id)"><input type="hidden"  id="hid_' + item.id + '" value="' + item.geometry.location + '">';
						searchHtml += '<img src="'+item.icon+'"  alt="" style="width:20px;hieght:20px">';
						searchHtml += '<h2>';
						searchHtml += '<span id="span_' + item.id + '">' + item.name + '</span>';
						searchHtml += '</h2>';
						searchHtml += '<h3> </h3>';
						searchHtml += '</li>';
						// $('#map_canvas').gmap('addMarker', { 'id': item.id, /*'icon': item.icon,*/ 'position': item.geometry.location, 'bounds':true }).click(function() {
						//      $('#map_canvas').gmap('openInfoWindow', {'content': '<h4>'+item.name+'</h4>'}, this);
						// });
					});
					searchHtml += "</ul>";
					
					console.log("searchHtml ---->"+searchHtml);
					$("#ul_searchLocation").empty();
					$("#ul_searchLocation").append(searchHtml);
					//$("#ul_searchLocation").listview("refresh");
				}

			});
		});
		$('#control').show();
	});

	//navigator.geolocation.getCurrentPosition(showPosition,showErrorPosition,{ maximumAge: 3000, timeout: 5000, enableHighAccuracy: true });
	function showPosition(position) {
		console.log("position==========="+JSON.stringify(position));
		defLatitude = position.coords.latitude
		defLongitude = position.coords.longitude;
		plotNearPlacesFrom()
	}
	function plotNearPlacesFrom() {
	// alert("#map_canvas");
	 
		var newObjPoints = new google.maps.LatLng(defLatitude, defLongitude);
		console.log(newObjPoints)
		$('#map_canvas').gmap('addMarker', {
						
						'position' : newObjPoints,
						'bounds' : true
					}).click(function() {
						$('#map_canvas').gmap('openInfoWindow', {
							'content' : '<h4>' + item.name + '</h4>'
						}, this);
					});
		$('#map_canvas').gmap('placesSearch', {
			'location' : newObjPoints,
			'radius' : '5000'/*, 'name': ['store']*/
		}, function(results, status) {
			$("#places").blur();
			if (status === 'OK') {
				$("#places").blur();
				var searchHtml = "<ul>";
				$.each(results, function(i, item) {
					//searchHtml += '<li id="liCheck_' + item.id + '" onclick="getCheckPointData(this)"><input type="hidden"  id="hid_' + item.id + '" value="' + item.geometry.location + '" name="' + item.name + '"><span id="span_' + item.id + '">' + item.name + '</li>';
					console.log("key ---->"+i+" Value---->"+item);
					searchHtml += '<li id="li_' + item.id + '" onclick="getDirectionData(this.id)"><input type="hidden"  id="hid_' + item.id + '" value="' + item.geometry.location + '">';
					searchHtml += '<img src="'+item.icon+'"  alt="" style="width:20px;hieght:20px">';
					searchHtml += '<h2>';
					searchHtml += '<span id="span_' + item.id + '">' + item.name + '</span>';
					searchHtml += '</h2>';
					searchHtml += '<h3> </h3>';
					searchHtml += '</li>';
					
				});
				searchHtml += "</ul>";
				console.log("searchHtml ---->"+searchHtml);
				$("#ul_searchLocation").empty();
				$("#ul_searchLocation").append(searchHtml);
				$.mobile.hidePageLoadingMsg();
			}

		},
		function(){
		 $.mobile.hidePageLoadingMsg();
		}
		);

	}

	

	var defaultValue = $('#places').val();
	$('#places').focus(function() {
		if ($(this).val() === defaultValue) {
			$(this).val('');
		}
	}).blur(function() {
		if ($(this).val() == '') {
			$(this).val(defaultValue);
		}
	});

});


/*
function newVisit() {

	var now = new Date();
	var now_utc = new Date(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(), now.getUTCHours(), now.getUTCMinutes(), now.getUTCSeconds());
	var datetime;
	if (now_utc.getMonth() < 10) {
		datetime = "0" + now_utc.getMonth() + "-" + now_utc.getDate() + "-" + now_utc.getFullYear();
	} else {
		datetime = now_utc.getMonth() + "-" + now_utc.getDate() + "-" + now_utc.getFullYear();
	}
	if ($('#startPlace').val() == '' || $('#startPlace').val() == null) {

		notifyUserWithMessage('Please Enter Start Place', 'Error');
		return;
	} else if ($('#endPlace').val() == '' || $('#endPlace').val() == null) {

		notifyUserWithMessage('Please Enter Destination', 'Error');
		return;
	} else {
		var title = "From " + $('#startPlace').val() + " to " + $('#endPlace').val();
		var newObj = new trackMyVisit();
		localStorage.setItem("CurrentVisitTitle", title);
		// VisitTitle,UserID, From, Destination, ConvenseType, VehicleNo, RequestDateTime, Duration
		newObj.startNewVisit(title, localStorage.getItem("user_id"), $('#startPlace').val(), $('#endPlace').val(), $('#select-native-3').val(), $('#vehicleNo').val(), datetime, $('#visitDuration').val());

		var fromLatLong = localStorage.getItem("directionFrom").split(",");
		var fromLat = fromLatLong[0].split("(")
		var fromLong = fromLatLong[1].split(")")
		var fromName = localStorage.getItem("directionFromName");

		var toLatLong = localStorage.getItem("directionTo").split(",");
		var toLat = toLatLong[0].split("(")
		var toLong = toLatLong[1].split(")")
		var toName = localStorage.getItem("directionToName");
		console.log("lat--------" + toLat[1] + "Long" + toLong[0] + "name" + toName)
		localStorage.setItem("localFromLat", fromLat[1]);
		localStorage.setItem("localFromLong", fromLong[0]);
		localStorage.setItem("localFromName", fromName);
		localStorage.setItem("localToLat", toLat[1]);
		localStorage.setItem("localToLong", toLong[0]);
		localStorage.setItem("localToName", toName);
		cordova.exec(nativeDbCreateSuccess, locationErrorHandler, "ListenLocation", "CreateTable", ['CreateTable Initiated']);


	}

}*/


function reCreateTableSuccess(resultData){
	console.log("reCreateTableSuccess SUCCESS " + resultData);
	//var now = new Date();
	//var now_utc = new Date(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(), now.getUTCHours(), now.getUTCMinutes(), now.getUTCSeconds());
	var now_utc = new Date();
	
	var datetime;
	var curMonth=parseInt(now_utc.getMonth())+1
	if (now_utc.getMonth() < 10) {
		datetime = "0" + curMonth + "-" + now_utc.getDate() + "-" + now_utc.getFullYear()+" "+now_utc.getHours()+":"+now_utc.getMinutes()+":"+now_utc.getSeconds();
	} else {
		datetime = curMonth + "-" + now_utc.getDate() + "-" + now_utc.getFullYear()+" "+now_utc.getHours()+":"+now_utc.getMinutes()+":"+now_utc.getSeconds();
	}
	//alert(datetime);
	if ($('#startPlace').val() == '' || $('#startPlace').val() == null) {

		notifyUserWithMessage('Please enter the Starting Place', 'Error');
		return;
	} else if ($('#endPlace').val() == '' || $('#endPlace').val() == null) {

		notifyUserWithMessage('Please enter the Destination', 'Error');
		return;
	} else {
		var title = "From " + $('#startPlace').val() + " to " + $('#endPlace').val();
		if($('#visitDuration').val() !='' && $('#visitDuration').val() !=null){
			if(isNaN($('#visitDuration').val())){
				notifyUserWithMessage('Please enter the duration of visit in digit', 'Error');
				$('#visitDuration').focus()
				return;
			}
			if($('#visitDuration').val() < 0){
				notifyUserWithMessage('Duration cannot be negative, please enter the correct value', 'Error');
				$('#visitDuration').focus()
				return;
			}
			if($('#visitDuration').val() == 0){
				notifyUserWithMessage('Duration cannot be zero, please enter the correct value', 'Error');
				$('#visitDuration').focus()
				return;
			}
		}
		var newObj = new trackMyVisit();
		//recent changes
		localStorage.setItem("CurrentVisitTitle", title);
		localStorage.setItem("CurrentVisitDate", datetime);
		localStorage.setItem("CurrentVisitFrom", $('#startPlace').val());
		localStorage.setItem("CurrentVisitTo", $('#endPlace').val());
		//alert($('#sel_vehicleType option:selected').text())
		localStorage.setItem("convenseType",$('#sel_vehicleType option:selected').text()+"_"+$('#sel_vehicleType').val())
		
		//recent changes
		// VisitTitle,UserID, From, Destination, ConvenseType, VehicleNo, RequestDateTime, Duration
		newObj.startNewVisit(title, localStorage.getItem("user_id"), $('#startPlace').val(), $('#endPlace').val(), $('#sel_vehicleType').val(), $('#vehicleNo').val(), datetime, $('#visitDuration').val());
		
	}
	
}

//function serviceStartNewVisit(){
//		var newObj = new trackMyVisit();
//		var fromLatLong = localStorage.getItem("directionFrom").split(",");
//		var fromLat = fromLatLong[0].split("(")
//		var fromLong = fromLatLong[1].split(")")
//		var fromName = localStorage.getItem("directionFromName");
//
//		var toLatLong = localStorage.getItem("directionTo").split(",");
//		var toLat = toLatLong[0].split("(")
//		var toLong = toLatLong[1].split(")")
//		var toName = localStorage.getItem("directionToName");
//		console.log("fromlat--------" + fromLat[1] + "fromLong" + fromLong[0] + "fromname" + fromName + "tolat--------" + toLat[1] + "toLong" + toLong[0] + "toname" + toName);
//
//		console.log(fromLat[1] + "~~~~~~~~~~~~~~~~~~~" + fromLong[0] + "~~~~~~~~~~~~~~~~~~~~~~~~~~~~~" + fromName + "~~~~~~~~~~~~~~~~~~~~~~~~~~~" + newObj.fetchLookUpId("Start"));
//		console.log(toLat[1] + "~~~~~~~~~~~~~~~~~~~" + toLong[0] + "~~~~~~~~~~~~~~~~~~~~~~~~~~~~~" + toName + "~~~~~~~~~~~~~~~~~~~~~~~~~~~" + newObj.fetchLookUpId("Actual Destination"));
//		insertRowInto_tracker_tbl(fromLat[1], fromLong[0], fromName, newObj.fetchLookUpId("Start"));
//		insertRowInto_tracker_tbl(toLat[1], toLong[0], toName, newObj.fetchLookUpId("Actual Destination"));
//		localStorage.setItem("localStartTime", new Date().toString('HH:mm:ss'));
//		localStorage.setItem("localStartTimewithDate", new Date().toString("MM/dd/yy HH:mm:ss"));
//		localStorage.setItem("closeMyVistFlag", "1");
//		startTrackLocation();
//
//}
function serviceStartNewVisit(){
	
	var newObj = new trackMyVisit();
	var fromLatLong = localStorage.getItem("directionFrom").split(",");
	var fromLat = fromLatLong[0].split("(")
	var fromLong = fromLatLong[1].split(")")
	var fromName = localStorage.getItem("directionFromName");

	var toLatLong = localStorage.getItem("directionTo").split(",");
	var toLat = toLatLong[0].split("(")
	var toLong = toLatLong[1].split(")")
	var toName = localStorage.getItem("directionToName");
	console.log("fromlat--------" + fromLat[1] + "fromLong" + fromLong[0] + "fromname" + fromName + "tolat--------" + toLat[1] + "toLong" + toLong[0] + "toname" + toName);

	console.log(fromLat[1] + "~~~~~~~~~~~~~~~~~~~" + fromLong[0] + "~~~~~~~~~~~~~~~~~~~~~~~~~~~~~" + fromName + "~~~~~~~~~~~~~~~~~~~~~~~~~~~" + newObj.fetchLookUpId("Start"));
	console.log(toLat[1] + "~~~~~~~~~~~~~~~~~~~" + toLong[0] + "~~~~~~~~~~~~~~~~~~~~~~~~~~~~~" + toName + "~~~~~~~~~~~~~~~~~~~~~~~~~~~" + newObj.fetchLookUpId("Actual Destination"));
	localStorage.setItem("tmpStartLat",fromLat[1]);
	localStorage.setItem("tmpStartLong",fromLong[0]);
	localStorage.setItem("tmpEndLat",toLat[1]);
	localStorage.setItem("tmpEndLong",toLong[0]);
	insertRowInto_tracker_tbl(fromLat[1], fromLong[0], fromName, newObj.fetchLookUpId("Start"));
	insertRowInto_tracker_tbl(toLat[1], toLong[0], toName, newObj.fetchLookUpId("Actual Destination"));
	localStorage.setItem("localStartTime", new Date().toString('HH:mm:ss'));
	localStorage.setItem("localStartTimewithDate", new Date().toString("MM/dd/yy HH:mm:ss"));
	localStorage.setItem("closeMyVistFlag", "1");
	startTrackLocation();

}
//function newVisit() {
//	
//	cordova.exec(reCreateTableSuccess, locationErrorHandler, "ListenLocation", "CreateTable", ['CreateTable Initiated']);
//}
//function newVisit() {
//	if(localStorage.getItem("closeMyVistFlag") == "0"){
//		cordova.exec(reCreateTableSuccess, locationErrorHandler, "ListenLocation", "CreateTable", ['CreateTable Initiated']);
//	} else {
//		reCreateTableSuccess("false callback");
//	}
//
//}

$('#contact').live('pageshow', function(event, ui) {

	var newObj = new trackMyVisit();
	//newObj.getAllFriends();
	newObj.getContactsFromDevice();

});
var geocoder;
function onDeviceReadyNewVisit() {
	console.log("on device ready")
	 geocoder = new google.maps.Geocoder();
	navigator.geolocation.getCurrentPosition(onGetCurrentPositionSuccess, onGetCurrentPositionError);
	console.log("exit")
}

$('#newVisit').live('pageshow', function(event, ui) {
	localStorage.myvisitAlreadySyncFlag=1
	console.log("already sync"+localStorage.myvisitAlreadySyncFlag)
	
	
	//document.addEventListener("deviceready", onDeviceReadyNewVisit, false);
	
	var newObj = new trackMyVisit();
	//newObj.getAllFriends();
	newObj.getVehicleType();
	newObj.getCheckinType();
});

function getContact(id,pageFrom) {
	console.log("id--------------"+id+"pagefrom------------"+pageFrom)
	window.localStorage.setItem("visitContactFlag",pageFrom);
	window.localStorage.setItem("emergecnyID",id);
	$.mobile.changePage("#contact",{transition:'none'})

}
function onGetCurrentPositionSuccess(position) {
//alert('test');
	console.log("siccess")
      console.log("lat: " + position.coords.latitude);
      console.log("long: " + position.coords.longitude);
      var lat = parseFloat(position.coords.latitude);
      var lng = parseFloat(position.coords.longitude);
                        
      // paris, france - uncomment to test
      //var lat = parseFloat(48.850258);
      //var lng = parseFloat(2.351074);
                        
      // tiburon, california
      //var lat = parseFloat(37.872685);
      //var lng = parseFloat(-122.45224);
                        
      var latlng = new google.maps.LatLng(lat, lng);
                        
      geocoder.geocode({'latLng': latlng}, function(results, status) {
    	  if (status == google.maps.GeocoderStatus.OK) {
    		  if (results[0]) {
    			  var arrAddress = results[0].address_components;
    			  // iterate through address_component array
    			  $.each(arrAddress, function (i, address_component) {
    				  if(address_component.types[0] == "locality"){
    					  console.log(address_component.long_name); // city
    					  // alert(address_component.long_name);
    					  $('#startPlace').val(address_component.long_name)
    					  $('#endPlace').val(address_component.long_name)
    					  localStorage.setItem("directionFrom","("+lat+","+lng+")");
    					  localStorage.setItem("directionTo","("+lat+","+lng+")");


    					  localStorage.setItem("directionFromName",address_component.long_name);
    					  localStorage.setItem("directionToName",address_component.long_name);


    					  return false; // break
    				  }
    				  else if (address_component.types[0] == "route") {
    					  console.log(address_component.long_name); // city
    					  // alert(address_component.long_name);
    					  $('#startPlace').val(address_component.long_name)
    					  $('#endPlace').val(address_component.long_name)
    					  localStorage.setItem("directionFrom","("+lat+","+lng+")");
    					  localStorage.setItem("directionTo","("+lat+","+lng+")");


    					  localStorage.setItem("directionFromName",address_component.long_name);
    					  localStorage.setItem("directionToName",address_component.long_name);


    					  return false; // break
    				  }
    				 
    				 
    			  });
    		  } else {
    			  //alert("No results found");
    		  }
    	  } else {
    		  //alert("Geocoder failed due to: " + status);
    	  }
      });
}
  
    function onGetCurrentPositionError(error) { 
    	console.log("errrrr")
      console.log("Couldn't get geo coords from device");
    } 

function getMyVisit(time) {
	var now_utc = new Date();
	//var now_utc = new Date(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(), now.getUTCHours(), now.getUTCMinutes(), now.getUTCSeconds());
	var datetime;
	var curMonth=parseInt(now_utc.getMonth())+1
	if (now_utc.getMonth() < 10) {
		datetime = "0" + curMonth + "-" + now_utc.getDate() + "-" + now_utc.getFullYear()
	} else {
		datetime = curMonth + "-" + now_utc.getDate() + "-" + now_utc.getFullYear()
	}
	
	var newObj = new trackMyVisit();
	var userId = localStorage.user_id;

	//newObj.getAllFriends();
	newObj.getVisitList(userId, datetime, time);
}

$('#a_myVisit').live('click', function() {
	checkSyncServerMyVisit();
	});
function checkSyncServerMyVisit(){
	//console.log("lastSyncUpdateProgress value"+localStorage.getItem("lastSyncUpdateProgress"));
	console.log("value========="+localStorage.getItem("myVistServerSyncFlag2")+"  visit id  "+localStorage.getItem("newVisitID")+"already sync"+localStorage.myvisitAlreadySyncFlag)
	if(localStorage.getItem("myVistServerSyncFlag2")==1){
		notifyUserWithMessage("Server Sync in progress","Please Wait");
		console.log("a visit else if server sync flag2")
	}else if(localStorage.getItem("newVisitID")!='' && localStorage.getItem("newVisitID")!= null && localStorage.getItem("newVisitID")!=undefined)
	{
		if(localStorage.getItem("myvisitAlreadySyncFlag")==0){
			$.mobile.changePage("#myVisit",{transition:'none'})
			console.log("a visit else if else change page")
		}else{
			console.log("a visit else if sync server")
			localStorage.myvisitSyncServerFlag =0;
			localStorage.setItem("myvisitAlreadySyncFlag",0);
			console.log("already sync"+localStorage.myvisitAlreadySyncFlag)
			event.stopPropagation();
			//notifyUserWithMessage("Server Sync in progress","Please Wait");
			cordova.exec(syncDataToServerMyVisit, locationErrorHandler, "ListenLocation", "FetchRowFromTracker", ["FetchRowFromTracker"]);			
		}
	}else{
		$.mobile.changePage("#myVisit",{transition:'none'})
	}

}
function syncDataToServerMyVisit(resultData){
	//alert(JSON.stringify());
	var jsonData =JSON.parse(resultData);
	if(jsonData !=null && jsonData !=undefined){
		if (jsonData.length > 0) {
			var syncObj = new trackMyVisit();
			syncObj.syncDataToServerMyVisit(jsonData);
	   } 
	}
	else{
		console.log('resultData is undefined------'+resultData);
	}
	
}
$('#myVisit').live('pageshow', function(event, ui) {
	
		getMyVisit(1);
	
});

//function getCheckIn(element) {
//	var liElement = $(element).parent().parent();
//	var idArray = $(element).attr("id").split("_");
//	var id=idArray[1];
//	var newObj = new trackMyVisit();
//	//newObj.getAllFriends();
//	newObj.getVisitDetail(id);
//
//}

function getCheckIn(element) {
	var liElement = $(element).parent().parent();
	//var id = $(liElement).attr("id");
	var idArray = $(element).attr("id").split("_");
	var id=idArray[1];
	window.localStorage.setItem("getVisitDetailsID", id)
	//var id = window.localStorage.getItem("getVisitDetailsID")
	var newObj = new trackMyVisit();
	//newObj.getAllFriends();
	newObj.getVisitDetail(id);
	

}


$("#showCheckPointMap").live("pageshow", function(event) {

	

})
function addVisitEmergencyNo() {
   //modified by jitendra 1-May-2013
	var newObj = new trackMyVisit();
	       if (!($('#emergencyMobileNo1').val() == '' || $('#emergencyMobileNo1').val() ==null)) {
				if(isNaN($('#emergencyMobileNo1').val())){
				  notifyUserWithMessage('Please enter valid Emergency Number', 'Error');
				  return;
				}else if($('#emergencyMobileNo1').val().length>20){
					$('#emergencyMobileNo1').focus();
					  notifyUserWithMessage('Emergency Number cannot be more than 20 digits', 'Error');
					  return;
				}else if($('#emergencyMobileNo1').val().length<10){
					$('#emergencyMobileNo1').focus();
					  notifyUserWithMessage('Emergency Number cannot be less than 10 digits', 'Error');
					  return;
				}
				
			}
			if (!($('#emergencyMobileNo2').val() == '' || $('#emergencyMobileNo2').val() ==null)) {
				if(isNaN($('#emergencyMobileNo2').val())){
				  notifyUserWithMessage('Please enter valid Emergency Number', 'Error');
				  return;
				}else if($('#emergencyMobileNo2').val().length>20){
					$('#emergencyMobileNo2').focus();
					  notifyUserWithMessage('Emergency Number cannot be more than 20 digits', 'Error');
					  return;
				}else if($('#emergencyMobileNo2').val().length<10){
					$('#emergencyMobileNo2').focus();
					  notifyUserWithMessage('Emergency Number cannot be less than 10 digits', 'Error');
					  return;
				}
				
			}
			if (!($('#emergencyMobileNo3').val() == '' || $('#emergencyMobileNo3').val() ==null)) {
				if(isNaN($('#emergencyMobileNo3').val())){
				  notifyUserWithMessage('Please enter valid Emergency Number', 'Error');
				  return;
				}else if($('#emergencyMobileNo3').val().length>20){
					$('#emergencyMobileNo3').focus();
					  notifyUserWithMessage('Emergency Number cannot be more than 20 digits', 'Error');
					  return;
				}else if($('#emergencyMobileNo3').val().length<10){
					$('#emergencyMobileNo3').focus();
					  notifyUserWithMessage('Emergency Number cannot be less than 10 digits', 'Error');
					  return;
				}
		    }
	if ($("#emergencyMobileNo1").val() != null || $("#emergencyMobileNo2").val() != null || $("#emergencyMobileNo3").val() != null) {
		//newObj.getAllFriends();
		newObj.saveEmergencyContact(localStorage.getItem("newVisitID"), $("#emergencyMobileNo1").val(), $("#emergencyMobileNo2").val(), $("#emergencyMobileNo3").val());
	} else {
		localStorage.setItem("flagEmergencyContact", 0);
	}
}

function addGlobalEmergencyNo() {

	var newObj = new trackMyVisit();
	 if (!($('#globalMobileNo1').val() == '' || $('#globalMobileNo1').val() ==null)) {
			if(isNaN($('#globalMobileNo1').val())){
			  notifyUserWithMessage('Please enter valid Emergency Number', 'Error');
			  return;
			}else if($('#globalMobileNo1').val().length>20){
				$('#globalMobileNo1').focus();
				  notifyUserWithMessage('Emergency Number cannot be more than 20 digits', 'Error');
				  return;
			}else if($('#globalMobileNo1').val().length<10){
				$('#globalMobileNo1').focus();
				  notifyUserWithMessage('Emergency Number cannot be less than 10 digits', 'Error');
				  return;
			}
			
		}
		if (!($('#globalMobileNo2').val() == '' || $('#globalMobileNo2').val() ==null)) {
			if(isNaN($('#globalMobileNo2').val())){
			  notifyUserWithMessage('Please enter valid Emergency Number', 'Error');
			  return;
			}else if($('#globalMobileNo2').val().length>20){
				$('#globalMobileNo2').focus();
				  notifyUserWithMessage('Emergency Number cannot be more than 20 digits', 'Error');
				  return;
			}else if($('#globalMobileNo2').val().length<10){
				$('#globalMobileNo2').focus();
				  notifyUserWithMessage('Emergency Number cannot be less than 10 digits', 'Error');
				  return;
			}
			
		}
		if (!($('#globalMobileNo3').val() == '' || $('#globalMobileNo3').val() ==null)) {
			if(isNaN($('#globalMobileNo3').val())){
			  notifyUserWithMessage('Please enter valid Emergency Number', 'Error');
			  return;
			}else if($('#globalMobileNo3').val().length>20){
				$('#globalMobileNo3').focus();
				  notifyUserWithMessage('Emergency Number cannot be more than 20 digits', 'Error');
				  return;
			}else if($('#globalMobileNo3').val().length<10){
				$('#globalMobileNo3').focus();
				  notifyUserWithMessage('Emergency Number cannot be less than 10 digits', 'Error');
				  return;
			}
	    }
	if ($("#globalMobileNo1").val() != null || $("#globalMobileNo2").val() != null || $("#globalMobileNo3").val() != null) {
		//newObj.getAllFriends();
		newObj.saveglobalEmergencyContact(localStorage.user_id, $("#globalMobileNo1").val(), $("#globalMobileNo2").val(), $("#globalMobileNo3").val());
	}
}


function getPhoneToText(number) {

	$("#popupBasic").popup("close")
	if(localStorage.getItem("visitContactFlag")==1){
		//$.mobile.changePage("#emergency",{transition:'none'})
		window.location.href='index.html#emergency'
	}else if(localStorage.getItem("visitContactFlag")==0){
		
//	$.mobile.changePage("#registration",{
//		transition:'none'
//	})
		window.location.href='index.html#registration'
	
	}else if(localStorage.getItem("visitContactFlag")==2){
		window.location.href='index.html#globalContact'
			localStorage.setItem("updateContactFlag",1)
		//$.mobile.changePage("#globalContact",{transition:'none'})
	}
	var textId = window.localStorage.getItem("emergecnyID").split("_");
	var textBoxId = textId[1];
	console.log($(number).find("p").html());
	$("#" + textBoxId).val("")
	$("#" + textBoxId).val($(number).find("p").html())
    //return false;
}
$("#globalContact").live("pageshow",function(event){
	console.log("global contact---------------")
	if(localStorage.getItem("updateContactFlag")==1||localStorage.getItem("updateContactFlag")==null||localStorage.getItem("updateContactFlag")==undefined){
		console.log("global contact-----------------"+localStorage.getItem("updateContactFlag"))
		if (localStorage.signup_contact1 != null && localStorage.signup_contact1 != undefined && localStorage.signup_contact1 !="") {
		$("#globalMobileNo1").val(localStorage.signup_contact1)
		localStorage.getItem("localStorage.signup_contact1"+localStorage.signup_contact1)
	}
	if (localStorage.signup_contact2 != null && localStorage.signup_contact2 != undefined && localStorage.signup_contact2 !="") {
		localStorage.getItem("localStorage.signup_contact1"+localStorage.signup_contact2)
		$("#globalMobileNo2").val(localStorage.signup_contact2)
	}
	if (localStorage.signup_contact3 != null && localStorage.signup_contact3 != undefined && localStorage.signup_contact3 !="") {
		localStorage.getItem("localStorage.signup_contact3"+localStorage.signup_contact3)
		$("#globalMobileNo3").val(localStorage.signup_contact3)
		
	}
	localStorage.setItem("updateContactFlag",0)
	}
	
})
function getContactNo(val) {

	if ($(val).find("h4.phoneNumber").length > 0) {
		var phoneStr = "";

		$.each($(val).find("h4.phoneNumber"), function() {

			console.log($(this).text())
			phoneStr += '<li onclick="getPhoneToText(this)"><p>' + $(this).text() + '</p></li>';
		})
		$("#ul_phoneNo").empty();
		$("#ul_phoneNo").append(phoneStr);
		$("#ul_phoneNo").trigger("create");
		$("#popupBasic").popup('open')
	} else {
		notifyUserWithMessage("Please select a contact with phone number", "Error")

	}

}
$("#resetPassword").live("pageshow",function(){
	//alert(localStorage.getItem("user_email1"))
	$('#txt_userEmail').val(localStorage.getItem("user_email1")) 
		
})

function checkResetPassword() {
     //fixed issue
	 if (!email_validator.test($('#txt_userEmail').val())) {
		notifyUserWithMessage('Please enter valid Email', 'Error');
		return;
	} else if ($('#txt_oldPassword').val() == '' || $('#txt_oldPassword').val() == null) {

		notifyUserWithMessage('Please enter old password', 'Error');
		return;
	}
	else if ($('#txt_oldPassword').val() != localStorage.user_pass) {

		notifyUserWithMessage('Old password is wrong, please re-enter', 'Error');
		return;
	}  
	else if ($('#txt_newPassword').val() == '' || $('#txt_newPassword').val() == null) {
		notifyUserWithMessage('Please Enter new password', 'Error');
		return;
	} else if ($('#txt_newPassword').val().length <= 5) {

		notifyUserWithMessage('New Password Should have more than 5 characters', 'Error');
		return;
	} else if (!($('#txt_newPassword').val() == $('#txt_confirmPassword').val())) {

		notifyUserWithMessage('Password and Confirm Password is not matched, both should be same.', 'Error');
		return;
	} else {

		var newObj = new trackMyVisit();
		newObj.resetPassword($('#txt_userEmail').val(), $('#txt_oldPassword').val(), $('#txt_newPassword').val());
	}
}

function syncService() {
	var insertFlag = false;
	cordova.exec(fetchRowFromTrackerSuccess, trackerInsertFailure, "ListenLocation", "FetchRowFromTracker", ["FetchRowFromTracker"]);
}

function fetchRowFromTrackerSuccess(resultData) {
	var jsonData =JSON.parse(resultData);
	if(jsonData !=null && jsonData !=undefined){
			if (jsonData.length > 0) {
				var syncObj = new trackMyVisit();
				syncObj.updateSyncServer(jsonData);
				//New Code
				locationTableData.length = 0;
				for (var i = 0; i < jsonData.length; i++) {
					if (!(jsonData[i].latitude == "0.0" || jsonData[i].latitude == "" || jsonData[i].latitude == null || jsonData[i].latitude == undefined || jsonData[i].longitude == "0.0" || jsonData[i].longitude == "" || jsonData[i].longitude == null || jsonData[i].longitude == undefined)) {
						var rowData = {};
						rowData.id = jsonData[i].id;
						rowData.cvId = jsonData[i].cvid;
						rowData.latitude = jsonData[i].latitude;
						rowData.longitude = jsonData[i].longitude;
						rowData.location = jsonData[i].location;
						rowData.chktypid = jsonData[i].chktypid;
						locationTableData.push(rowData);
					}
				}
				drawOrUpdateMap({
					"coord" : locationTableData
				});
				console.log("locationTableData.length: " + locationTableData.length);
			} else {
				console.log("~~~~~~~~~~~~~No data to draw map~~~~~~~~~~~~~~");
				console.log('resultData is undefined in fetchRowFromTrackerSuccess------'+resultData);
			} 
}
	}


function drawOrUpdateMap(data) {
	mapDataToRefresh=data;
	$('#mainMapCanvas').gmap('clear', 'markers');
	var origin = new google.maps.LatLng(data.coord[data.coord.length - 1].latitude, data.coord[data.coord.length - 1].longitude);
	$('#mainMapCanvas').gmap('get', 'map').setOptions({
		'center' : origin,
		'zoom' : 7
	});

	$.each(data.coord, function(i, item) {
		console.log("key----" + i + " Item-------" + item.latitude + " " + item.latitude + " " + item.chktypid);
		switch(item.chktypid) {
		case "1":
			console.log("case 1 executed");
			
			$('#mainMapCanvas').gmap('addMarker', {
				'icon' : "images/auto_loc.png",
				'position' : new google.maps.LatLng(item.latitude, item.longitude),
				'bounds' : true
			}).click(function() {
				this.setIcon('images/auto_loc_small.png')
				if(item.location == 'undefined' || item.location =='null'){
		           var tmpLoc ='';
		        }
		        else{
		           var tmpLoc = item.location;
		        }
				console.log("case 1 executed"+tmpLoc);
				$('#mainMapCanvas').gmap('openInfoWindow', {
					'content' : tmpLoc
				}, this);
			});
			break;
		case "2":
			console.log("case 2 executed");
			$('#mainMapCanvas').gmap('addMarker', {
				'icon' : "images/user_loc.png",
				'position' : new google.maps.LatLng(item.latitude, item.longitude),
				'bounds' : true
			}).click(function() {
				this.setIcon('images/user_loc_small.png')
				if(item.location == 'undefined' || item.location =='null'){
		           var tmpLoc ='';
		        }
		        else{
		           var tmpLoc = item.location;
		        }
				console.log("case 2 executed"+tmpLoc);
				$('#mainMapCanvas').gmap('openInfoWindow', {
					'content' : tmpLoc
				}, this);
			});
			break;
		case "3":
			console.log("case 3 executed");
			$('#mainMapCanvas').gmap('addMarker', {
				'icon' : "images/start_loc.png",
				'position' : new google.maps.LatLng(item.latitude, item.longitude),
				'bounds' : true
			}).click(function() {
				this.setIcon('images/start_loc_small.png')
				if(item.location == 'undefined' || item.location =='null'){
		           var tmpLoc ='';
		        }
		        else{
		           var tmpLoc = item.location;
		        }
				console.log("case 3 executed"+tmpLoc);
				$('#mainMapCanvas').gmap('openInfoWindow', {
					'content' : tmpLoc
				}, this);
			});
			break;
		case "4":
			console.log("case 4 executed");
			$('#mainMapCanvas').gmap('addMarker', {
				'icon' : "images/close_loc.png",
				'position' : new google.maps.LatLng(item.latitude, item.longitude),
				'bounds' : true
			}).click(function() {
				this.setIcon('images/close_loc_small.png')
				if(item.location == 'undefined' || item.location =='null'){
		           var tmpLoc ='';
		        }
		        else{
		           var tmpLoc = item.location;
		        }
				console.log("case 4 executed"+tmpLoc);
				$('#mainMapCanvas').gmap('openInfoWindow', {
					'content' : tmpLoc
				}, this);
			});
			break;
		case "5":
			console.log("case 5 executed");
			$('#mainMapCanvas').gmap('addMarker', {
				'icon' : "images/end_loc.png",
				'position' : new google.maps.LatLng(item.latitude, item.longitude),
				'bounds' : true
			}).click(function() {
				this.setIcon('images/end_loc_small.png')
				if(item.location == 'undefined' || item.location =='null'){
		           var tmpLoc ='';
		        }
		        else{
		           var tmpLoc = item.location;
		        }
				console.log("case 5 executed"+tmpLoc);
				$('#mainMapCanvas').gmap('openInfoWindow', {
					'content' : tmpLoc
				}, this);
			});
			break;
		case "6":
			console.log("case 6 executed");
			$('#mainMapCanvas').gmap('addMarker', {
				'icon' : "images/emer_loc.png",
				'position' : new google.maps.LatLng(item.latitude, item.longitude),
				'bounds' : true
			}).click(function() {
				this.setIcon('images/emer_loc_small.png')
				if(item.location == 'undefined' || item.location =='null'){
		           var tmpLoc ='';
		        }
		        else{
		           var tmpLoc = item.location;
		        }
				console.log("case 6 executed"+tmpLoc);
				$('#mainMapCanvas').gmap('openInfoWindow', {
					'content' : tmpLoc
				}, this);
			});
			break;
	}
	});
	
	$('#mainMapCanvas').gmap('refresh');
	google.maps.event.addListener(mainMapCanvas, "click", function(){
		  infoWindow.close();
		});
	console.log("~~~~~~~ Map Updated ~~~~~~~");
	//globalVar.updtTimer = setInterval(syncService,180000);
}
$("#showCurrentMap").live("pagehide",function(e){
	clearInterval(myVar);
	
	
})
$("#showCurrentMap").live('pageshow', function(e) {
	 $("#hdrTitle").text(localStorage.getItem("CurrentVisitTitle"));
	 $("#startTime").text(localStorage.getItem("localStartTime"));
	  myVar=setInterval(function(){myTimer()},1000);
//	 var currentTime=new Date()
//		 navigator.globalization.dateToString(
//				  new Date(),
//				  
//				  function (date) {
//					  currentTime= date.value
//					  //alert('date:' + date.value + '\n');
//					  },
//				  function () {alert('Error getting dateString\n');},
//				  {formatLength:'full', selector:'time'}
//				);
//	 var d = new Date();
//	 var n = d.getSeconds();
	// console.log("cureent time========="+currentTime.toString('HH:mm:ss'))
	 //var timeStringArray=currentTime.toString('HH:mm:ss').split(" ");
	 //var timeString=timeStringArray[0]+":"+n
	// $("#currentTime").text(timeString);
	syncService();
});

function confirmEmergencyAlert(){
	 navigator.notification.confirm(
		        'Are you sure to send the Emergency Alert Message to Emergency Contacts?',  // message
		        onConfirmEmergencyAlertVisit,              // callback to invoke with index of button pressed
		        'Alert confirmation',            // title
		        'Yes,No'          // buttonLabels
		    );
	
}
function onConfirmEmergencyAlertVisit(buttonIndex) {
	//alert(buttonIndex)
	if (buttonIndex == 1) {
		
		emergencyAlert()
	} else if (buttonIndex == 2) {
		
	}
}
function emergencyAlert(){
	$.mobile.showPageLoadingMsg();
	navigator.geolocation.getCurrentPosition(onGeoLocSuccess, onGeoLocError,{enableHighAccuracy: false });
}

function onGeoLocSuccess(position) {
	console.log(position.coords.latitude+" "+position.coords.longitude);
	getLocality(parseFloat(position.coords.latitude), parseFloat(position.coords.longitude));
}
    
function onGeoLocError(error) {
    console.log('onGeoLocError code: '    + error.code    + ' ' +
            'message: ' + error.message);
    getLocality('','');
}

function getLocality(posLat, posLong) {
	//var placeBreakLoop = "";
	var geocoder1 = new google.maps.Geocoder();
	var latlng1 = new google.maps.LatLng(posLat, posLong);
	var tmpFlag1 = true;
    var curDateTimeStr = new Date().toString('yyyy-MM-dd HH:mm:ss');
	var newObj = new trackMyVisit();
	if((posLat!=null || posLat!='') && (posLong!=null || posLong!='')){
	
	
	geocoder1.geocode({
		'latLng' : latlng1
	}, function(results, status) {
		if (status == google.maps.GeocoderStatus.OK) {
			console.log("Google Address"+JSON.stringify(results));
			if (results[0]) {
				var arrAddress = results[0].address_components;
				var count =0;
				var arrAddressFormated = results[0].formatted_address;
				localStorage.setItem("placeBreakLoop",arrAddressFormated)
				$.each(arrAddress, function(i, address_component) {
					if(tmpFlag1){
						console.log("if======"+tmpFlag1)
						if (address_component.types[0] == "locality") {
							console.log(address_component.long_name);
							//placeBreakLoop += address_component.long_name;
							
							//alert(localStorage.getItem("newVisitID")+" "+posLat+" "+posLong+" "+address_component.long_name+" "+newObj.fetchLookUpId("Alert")+" "+curDateTimeStr);
							tmpFlag1 = false;
							
	                        
						}
						
					  else if(arrAddressFormated==undefined||arrAddressFormated==''||arrAddressFormated==null){
							//placeBreakLoop += "unknown place";
							localStorage.setItem("placeBreakLoop","unknown place")
							//cordova.exec(function(){sendComposeMessage(address_component.long_name)}, trackerInsertFailure, "ListenLocation", "InsertRowInTracker", [localStorage.getItem("newVisitID"), posLat, posLong, "null", newObj.fetchLookUpId("Alert"), curDateTimeStr]);
						}
					}
					
					
				});
			}
		}
		console.log("place break================"+localStorage.getItem("newVisitID")+" "+posLat+" "+posLong+" "+localStorage.getItem("placeBreakLoop")+" "+newObj.fetchLookUpId("Alert")+" "+curDateTimeStr)
		//alert(localStorage.getItem("newVisitID")+" "+posLat+" "+posLong+" "+localStorage.getItem("placeBreakLoop")+" "+newObj.fetchLookUpId("Alert")+" "+curDateTimeStr);
		cordova.exec(insertEmergencyLocSuccess, trackerInsertFailure, "ListenLocation", "InsertRowInTracker", [localStorage.getItem("newVisitID"), posLat, posLong, localStorage.getItem("placeBreakLoop"), newObj.fetchLookUpId("Alert"), curDateTimeStr]);
	});
	
	$.mobile.hidePageLoadingMsg();
	}else{
		sendComposeMessage('');
	}
}

function insertEmergencyLocSuccess(resultData){
	console.log("insertEmergencyLocSuccess succes"+resultData);
	sendComposeMessage(localStorage.getItem("placeBreakLoop"));
}

function closeMyVisit() {
navigator.notification.confirm(
'Are you sure to close the visit?',  // message
onCloseVisitConfirm,              // callback to invoke with index of button pressed
'Close the Visit',            // title
'Yes,No'          // buttonLabels
);


}

function onCloseVisitConfirm(buttonIndex) {
	localStorage.setItem("lastSyncUpdateProgress","1");
	if (buttonIndex == 1) {
		//clearInterval(globalVar.updtTimer);
		localStorage.setItem("closeMyVistFlag", "0");
		//add

		localStorage.setItem("CurrentVisitDate", "");
		localStorage.setItem("CurrentVisitTitle", "");
		localStorage.setItem("localStartTime", "");
		localStorage.setItem("CurrentVisitFrom", "");
		localStorage.setItem("CurrentVisitTo", "");
		$("#span_currentVisitTime").text("");
		$("#h2_homevisitTitle").text("Click on New Visit");
		$("#h3_homeVisitStart").text("to create visit");
		$("#h3_homeVisitClose").text("");

		$("#h2_currentTitle2").text("");
		$("#li_currentFrom").text("");
		$("#li_currentTo").text("");
		$("#span_currentVisitTime").text("");
		locationTableData.length = 0;
		mapClearFlag = false;
		stopTrackLocation();
		//var newObj = new trackMyVisit();
		//newObj.setVisitAsComplete(localStorage.getItem("newVisitID"));
		//clear all your stuffs
		localStorage.setItem("newVisitStopFlag", "0");
		$.mobile.changePage("#appHome", {
			transition : 'none'
		});
	}
}
function doLogOut(){
	if(localStorage.getItem("closeMyVistFlag") == "1"){
		closeMyVisitOnLout();
	}else{
		logOutHlpr();
	}
}

function logOutHlpr(){
	
	var tmpUserName =localStorage.getItem("login_userName");
	var tmpUserPass = localStorage.getItem("login_password");
	var auto_login = localStorage.auto_login;
	window.localStorage.clear();
	localStorage.setItem("login_userName",tmpUserName);
	localStorage.setItem("login_password",tmpUserPass);
	localStorage.auto_login =auto_login;
	window.location.href="index.html";
}


function closeMyVisitOnLout() {
	navigator.notification.confirm(
	'Are you sure to close the visit?',  // message
	onCloseVisitConfirmOnLout,              // callback to invoke with index of button pressed
	'Close the Visit',            // title
	'Yes,No'          // buttonLabels
	);


	}


function onCloseVisitConfirmOnLout(buttonIndex) {
	if (buttonIndex == 1) {
		localStorage.setItem("closeMyVistFlag", "0");
		//clearInterval(globalVar.updtTimer);
		$("#span_currentVisitTime").text("");
		$("#h2_homevisitTitle").text("Click on New Visit");
		$("#h3_homeVisitStart").text("to create visit");
		$("#h3_homeVisitClose").text("");
		$("#h2_currentTitle2").text("");
		$("#li_currentFrom").text("");
		$("#li_currentTo").text("");
		$("#span_currentVisitTime").text("");

		localStorage.setItem("CurrentVisitTitle", "");
		localStorage.setItem("CurrentVisitDate", "");
		localStorage.setItem("localStartTime", "");
		localStorage.setItem("CurrentVisitFrom", "");
		localStorage.setItem("CurrentVisitTo", "");
		locationTableData.length = 0;
		mapClearFlag = false;
		stopTrackLocation();
		//var newObj = new trackMyVisit();
		//newObj.setVisitAsComplete(localStorage.getItem("newVisitID"));
		//clear all your stuffs
		localStorage.setItem("newVisitStopFlag", "0");
		logOutHlpr();
	}
}


function getCheckPointData(checkpoint_latlng, place_name,element) {
	place_name = unescape(place_name);
	if (checkpoint_latlng != '' && checkpoint_latlng != null) {
		$(element).parent().find("li.active_check").removeClass('active_check');
		$(element).addClass('active_check')
		var coords = checkpoint_latlng.split(',');
		console.log("Coords---------------------->"+coords);
		var check_lat = coords[0].split("(");
		var check_lattitude = check_lat[1];
		console.log("check_lattitude---------->"+check_lattitude)
		var check_lng = coords[1].split(")");
		var check_longitude = check_lng[0]
		console.log("check_longitude---------->"+check_longitude)
		console.log("place_name---------->"+place_name)
		localStorage.setItem("getCheckPointDatacheck_lattitude",check_lattitude);
		localStorage.setItem("getCheckPointDatacheck_longitude",check_longitude);
		localStorage.setItem("getCheckPointDataplace_name",place_name);
	}
	
}


function saveCheckPointData(){
	console.log("save latitude "+localStorage.getItem("getCheckPointDatacheck_lattitude")+" save longitude "+localStorage.getItem("getCheckPointDatacheck_longitude")+" save place "+localStorage.getItem("getCheckPointDataplace_name"));
	if((localStorage.getItem("getCheckPointDatacheck_lattitude") != null || localStorage.getItem("getCheckPointDatacheck_lattitude") != undefined || localStorage.getItem("getCheckPointDatacheck_lattitude")!="") &&  (localStorage.getItem("getCheckPointDatacheck_longitude") != null || localStorage.getItem("getCheckPointDatacheck_longitude") != undefined || localStorage.getItem("getCheckPointDatacheck_longitude")!="")){
		var newObj = new trackMyVisit();
		if(localStorage.getItem("tmpStartLat") == localStorage.getItem("getCheckPointDatacheck_lattitude") && localStorage.getItem("tmpStartLong") == localStorage.getItem("getCheckPointDatacheck_longitude")){
			notifyUserWithMessage("You can't add the same location as start visit","Failure");
		} else if(localStorage.getItem("tmpEndLat") == localStorage.getItem("getCheckPointDatacheck_lattitude") && localStorage.getItem("tmpEndLong") == localStorage.getItem("getCheckPointDatacheck_longitude")){
			notifyUserWithMessage("You can't add the same location as end visit","Failure");
		} else {
			insertRowInto_tracker_tbl(localStorage.getItem("getCheckPointDatacheck_lattitude"), localStorage.getItem("getCheckPointDatacheck_longitude"), localStorage.getItem("getCheckPointDataplace_name"), newObj.fetchLookUpId("User Define"));
			$.mobile.changePage("#showCurrentMap");
		}
	}else {
		alert("Search/Select One Checkpoint from the list");
	}
}



function insertRowInto_tracker_tbl(check_lat, check_lng, place_name, chekin_type) {
	var curDateTimeStr = new Date().toString('yyyy-MM-dd HH:mm:ss');
	cordova.exec(trackerInsertSuccess, trackerInsertFailure, "ListenLocation", "InsertRowInTracker", [localStorage.getItem("newVisitID"), check_lat, check_lng, place_name, chekin_type, curDateTimeStr]);
}

function trackerInsertSuccess(resultData) {
	console.log("ListenLocation trackerInsertSuccess " + resultData);
}

function trackerInsertFailure(errordata) {
	console.log("ListenLocation ERROR " + errordata);
}

//recent change done by vinodh
$("#currentVisit").live("pageshow", function(event) {
	var title=localStorage.getItem("CurrentVisitTitle");
	var titleTrim=title.substring(0,24);
	titleTrim+="..";
		var placeFrom=localStorage.getItem("CurrentVisitFrom");
		if(placeFrom.length>20){
			placeFrom=placeFrom.substring(0,17);
			placeFrom+=".."	
		}
	
		var placeTo=localStorage.getItem("CurrentVisitTo");
		if(placeTo.length>20){
			placeTo=placeTo.substring(0,17);
			placeTo+=".."
		}
		
		var imgSrc=imgSourceForVehicleType();
	console.log(imgSrc+"img src------------------------")
	$("#img_vehicleType").attr("src",imgSrc)
		$("#h2_currentTitle").text(localStorage.getItem("CurrentVisitTitle"));
//	 $("#h2_currentTitle2").text(placeFrom);
//	 $("#h2_currentTitle3").text(placeTo);
	 $("#span_currentVisitTime").text(localStorage.getItem("localStartTimewithDate"));
	 
	 $("#li_currentFrom").text(placeFrom);
	 $("#li_currentTo").text(placeTo);
	 
	 
	
	
})
function imgSourceForVehicleType(){
	var vehicleType=localStorage.getItem("convenseType")
	var arrConvenseType=vehicleType.split("_")
	//alert(vehicleType)
	var imgSrc=""
		
	if(arrConvenseType[0]!=null && arrConvenseType[0]!=undefined && (arrConvenseType[1]!="0" ||arrConvenseType[1]!=0)){
		imgSrc='images/'+arrConvenseType[0]+".png";
	}else{
		imgSrc='images/Other.png';	
	}
	console.log("img src==========="+ imgSrc)
	return imgSrc;
}

