
$(document).live('mobileinit', function() {
	//Initializaiton code goes here.  This event fires prior to the UI rendering, so we can change propertiers if needed.

	
});


//EVENTS 

//Setup listners for buttons and saving data.
$('#home').live("pageinit", function(event){  

	//console.log("Page is initialized");
	//Save data when something on the page is clicked.  TODO: This is being setup many times this way.
	$('.chkboxsel').click(function() {  
		saveData(this);
	});

});


$(document).bind("pagechange", function(event, data){  
	//console.log("Page changed");
	pullAllValues();
});



/*-----------My functions-------------*/

function saveData(myCB) {
	var myKey= "'" + myCB.id + "'";
	var myValue= "'" + myCB.checked + "'";

	//console.log("Saving " + myKey + " with value = " + myValue);
	localStorage.setItem(myKey, myCB.checked);
}

function getData(m) {
	var myKey= "'" + m.id + "'";
	
	//console.log("Retrieving " + myKey + " = " + localStorage.getItem(myKey));

	//Check and change the checkbox
	//Local storage returns a strin and the attr method needs a boolean.  
	if (localStorage.getItem(myKey)=='true') {
		$(m).attr('checked', true);	
	}
	else {
		$(m).attr('checked', false);	
	}
	
	$(m).checkboxradio("refresh");
}

function uncheckBoxes () {
	var currentPageId = $.mobile.activePage.attr('id'); 
	
	//Uncheck and visually clear all check boxes
	$('#' + currentPageId + ' input:checked').attr('checked', false);
	$('#' + currentPageId + ' input').checkboxradio("refresh");
	
	//Loop through page and store the proper values
	$('#' + currentPageId + ' input').each(function () {
		saveData(this);		
	});	
}

function pullAllValues () {
	var currentPageId = $.mobile.activePage.attr('id'); 
	
	//Loop through page and store the proper values
	$('#' + currentPageId + ' input').each(function () {
		getData(this);		
	});	
}




		function agree2EULA() {
				//Tell parent user agrees to EULA
				window.parent.postMessage(5, '*');
		}
					
	




	
	$(document).bind('pageinit', function DoStuff() {
		var myEULA=new Number(0);
		
		if(typeof(Storage)!=="undefined")  {
			//localStorage supported
			try {
				//Check for EULA and load as needed
				myEULA = localStorage.getItem('itoolEULAFlag');
				if (myEULA!="'1'") {
					$("#MyFrame").attr("src", "eula.html");
					return;
				} 				
			}
			catch (e) {
				console.log("Error: " + e);
				//inject custom error message into div tag named #myError
				$.mobile.changePage('#error_dialog','pop',false,true);
				$("#myError").append("<b>" + e + "</b>");
				return;
			}
		}

	CheckSignIn();	
	
	});
	
	function CheckSignIn() {
	
		var d = new Date();
		var t=new Number(0);
		var myLimit=new Number(0);
		var myDiff=new Number(0);			
		var myLastSignIn=new Number(0);
		
		try {
			//Get last sign in time
			myLastSignIn = localStorage.getItem('itoolUser'); 
			t = d.getTime(); 
			
			//Test for prior sign in		
			if ((myLastSignIn != null) && (myLastSignIn != 0)) {
				//30 days
				myLimit = ((((1000 * 60) * 60) * 24) * 30); 
				//myLimit = 1000 * 60; 
				myDiff = t-parseInt(myLastSignIn.substring(1,myLastSignIn.length));
				if ( myDiff < myLimit) {
					window.location = "main.html";
					return;
				}
			}
		}
		catch (e) {
			//inject custom error message into div tag named #myError
			$.mobile.changePage('#error_dialog','pop',false,true);
			$("#myError").append("<b>" + e + "</b>");
			return;
		}
		
	$("#MyFrame").attr("src", "https://lp.post.ca.gov/post/resources/itoolSignIn/signin.html");		

	} //end of function

		
	//Setup listener for posted messages from iframe
	var onmessage = function(e) { 
		var data = e.data; 
		var origin = e.origin; 
		
		switch(data)
		{
		case 1:
		//siginin says to load content
		  window.location = "main.html";
		  break;
		case 5:
		//eula says user agrees, save this value and load signin
		  saveData("itoolEULAFlag", 1);
		  $("#MyFrame").attr("src", "https://lp.post.ca.gov/post/resources/itoolSignIn/signin.html");	
		  break;
		default:
		  saveData("itoolUser", data); //date & time in milliseconds was past
		}
	}; 
			 
	if (typeof window.addEventListener != 'undefined') { 
		window.addEventListener('message', onmessage, false); 
	} else if (typeof window.attachEvent != 'undefined') { 
		window.attachEvent('onmessage', onmessage); 
	}

	
	function saveData(myKey, myVal) {
		myVal="'" + myVal + "'";
		try {
			localStorage.setItem(myKey, myVal);			
		} catch (e){
			console.log("Error saving " + myKey + " with value = " + myVal + " e=" + e);
		}
	}

	function getData(myKey) {
	//This function is for testing purposes only. Use with console.log.
		var r;
		
		try {
			r = localStorage.getItem(myKey);
			return r;
		} catch(e) {
			console.log("Error retrieving " + myKey + " e=" + e);
			return -1;
		}
	}
	
	


﻿// Portal API Functionality ------------------------------------------------

var objPortalWebServiceInitiatedAjaxCall = null;

/////////////////////////////////////////////////////////////////////////////
//	Class used to make Web Service calls to Portal API's
function PortalWebService(strApiUrl, strNameClient, strReferer, strPreferredResponse, strRequestedAccess, nHoursExpiration) {
	if (strNameClient == undefined)
		strNameClient = 'learningPortal';
	if (strPreferredResponse == undefined)
		strPreferredResponse = 'json';
	if (strRequestedAccess == undefined)
		strRequestedAccess = 'read';
	if (nHoursExpiration == undefined)
		nHoursExpiration = 24;
	if (strReferer == undefined)
		strReferer = '';

	this.guidClient = '';
	this.urlApi = strApiUrl;
	this.nameClient = strNameClient;
	this.namePreferredResponse = strPreferredResponse;
	this.nameRequestedAccess = strRequestedAccess;
	this.hoursExpiration = nHoursExpiration;
	this.siteReferer = strReferer;

	this.bReportAjaxFailures = true;
	this.bReportAjaxReturnedErrors = true;

	this.objResponse = null;
	this.funcCallback = null;
}

/////////////////////////////////////////////////////////////////////////////
//	Low level method called when an ajax request is made successfully
PortalWebService.prototype.ajaxSuccess = function (response, textStatus) {
	if (response.d != null) {
		this.objResponse = response.d;
		if (this.objResponse.errorInfo != null && this.bReportAjaxReturnedErrors) {
			var message = "An error occurred when calling " + this.objResponse.errorInfo.method + "\n";
			message += "Error: ";
			if (this.objResponse.errorInfo.code != 0)
				message += this.objResponse.errorInfo.code + " ";
			message += this.objResponse.errorInfo.message;
			message += "\n";
			alert(message);
		}
	}
}

/////////////////////////////////////////////////////////////////////////////
//	Low level method called when an ajax request fails
PortalWebService.prototype.ajaxFailed = function (xhr, type, errorThrown) {
	if (this.bReportAjaxFailures) {
		var message = "AJAX Request Failed\n" + errorThrown + "\n";
		switch (type) {
			case 'timeout':
				message += "The request timed out.";
				break;
			case 'notmodified':
				message += "The request was not modified but was not retrieved from the cache.";
				break;
			case 'parsererror':
				message += "XML/Json format is bad.";
				break;
			default:
				message += xhr.responseText;
		}
		message += "\n";
		alert(message);
	}
}

/////////////////////////////////////////////////////////////////////////////
//	Low level method called when an ajax request completes (called after ajaxSuccess or ajaxFailed
PortalWebService.prototype.ajaxComplete = function (xhr, textStatus) {

}

/////////////////////////////////////////////////////////////////////////////
//	Call a Web Service method
PortalWebService.prototype.CallMethod = function (strMethod, objParameters, bAsync, funcCallback) {
	var referer = this.siteReferer;
	if (bAsync == undefined)
		bAsync = false;
	if (funcCallback == undefined)
		funcCallback = null;

	// See if we need to create a client profile with the Web Service
	if (this.guidClient.length == 0) {
		while (objPortalWebServiceInitiatedAjaxCall != null);
		objPortalWebServiceInitiatedAjaxCall = this;
		this.objResponse = null;

		var rc = $.ajax({
			type: "POST",
			contentType: "application/json; charset=utf-8",
			data: "{'nameClient':'" + this.nameClient + "','namePreferredResponse':'" + this.namePreferredResponse + "','nameRequestedAccess':'" + this.nameRequestedAccess + "','hoursExpiration':'" + this.hoursExpiration + "'}",
			url: this.urlApi + '/CreateClientProfile',
			dataType: "json",
			async: false,
			beforeSend: function (xhr) {
				if (referer.length > 0)
					xhr.setRequestHeader('Referer', referer);
			},
			success: function (response, textStatus) {
				if (objPortalWebServiceInitiatedAjaxCall != null)
					objPortalWebServiceInitiatedAjaxCall.ajaxSuccess(response, textStatus);
			},
			error: function (xhr, type, errorThrown) {
				if (objPortalWebServiceInitiatedAjaxCall != null)
					objPortalWebServiceInitiatedAjaxCall.ajaxFailed(xhr, type, errorThrown);
			},
			complete: function (xhr, textStatus) {
				if (objPortalWebServiceInitiatedAjaxCall != null)
					objPortalWebServiceInitiatedAjaxCall.ajaxComplete(xhr, textStatus);
				objPortalWebServiceInitiatedAjaxCall = null;
			}
		});

		if (this.objResponse != null && this.objResponse.guid != null)
			this.guidClient = this.objResponse.guid;
	}

	// Report error if we do not have a client profile
	if (this.guidClient.length == 0)
		alert("PortalWebService.CallMethod\nUnable to obtain client profile.\n");

	// Make the requested Web Service call
	this.funcCallback = funcCallback;
	while (objPortalWebServiceInitiatedAjaxCall != null);
	objPortalWebServiceInitiatedAjaxCall = this;
	this.objResponse = null;

	var strParamData = "";
	for (var member in objParameters) {
		if (strParamData.length > 0)
			strParamData += ',';
		strParamData += "'" + member + "': '" + objParameters[member] + "'";
	}

	var rc = $.ajax({
		type: "POST",
		contentType: "application/json; charset=utf-8",
		data: "{'guidClient': '" + this.guidClient + "'," + strParamData + "}",
		url: this.urlApi + '/' + strMethod,
		dataType: "json",
		async: (bAsync) ? true : false,
		beforeSend: function (xhr) {
			if (referer.length > 0)
				xhr.setRequestHeader('Referer', referer);
		},
		success: function (response, textStatus) {
			if (objPortalWebServiceInitiatedAjaxCall != null)
				objPortalWebServiceInitiatedAjaxCall.ajaxSuccess(response, textStatus);
		},
		error: function (xhr, type, errorThrown) {
			if (objPortalWebServiceInitiatedAjaxCall != null)
				objPortalWebServiceInitiatedAjaxCall.ajaxFailed(xhr, type, errorThrown);
		},
		complete: function (xhr, textStatus) {
			//alert(textStatus + '\n' + xhr.responseText);
			if (objPortalWebServiceInitiatedAjaxCall != null)
				objPortalWebServiceInitiatedAjaxCall.ajaxComplete(xhr, textStatus);
			objPortalWebServiceInitiatedAjaxCall = null;
		}
	});

	if (bAsync)
		return true;
	return this.objResponse;
}

//------------------------------------------------





