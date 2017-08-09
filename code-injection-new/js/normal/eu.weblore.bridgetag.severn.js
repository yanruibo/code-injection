
var db;

function openDatabase() {
	var db = window.openDatabase("bridgetag", "1.0", "Bridgetag DB", 10240);
	alert(db);
	db.transaction(createSchema, registerError, registerSuccess);
}

function createSchema(tx) {
    tx.executeSql('CREATE TABLE IF NOT EXISTS TAG_USER (accountNumber unique, password)');
}

function registerError(err) {
    alert("Error processing SQL: "+err.code);
}

function registerSuccess() {
    alert("success!");
}

function addUserDetails() {
	db.transaction(insertUserDetails, registerError, registerSuccess);
}

function insertUserDetails(tx) {
	tx.executeSql('DELETE FROM TAG_USER');
	tx.executeSql('INSERT INTO TAG_USER (accountNumber, password) VALUES (' + accountNumber + ', ' + password + ')');
}

function retrieveUserDetails() {
	db.transaction(selectTagUserCB, registerError);
}

function selectTagUserCB(tx) {
    tx.executeSql('SELECT * FROM TAG_USER', [], selectTagUserSuccess, registerError);
}

function selectTagUserSuccess(tx, results) {
	// only need to use the first row
	accountNumber =  results.rows.item(0).accountNumber;
	password =  results.rows.item(0).password;
}





		var db;
		var user = "";
		var pw = "";
	
		function onDeviceReady() {
			//alert('go');
			db = window.openDatabase("bridgetag", "1.0", "Bridgetag DB", 10240);
			//alert(db);
			db.transaction(createSchema, registerError, registerSuccess);
			//addUserDetails();
			retrieveUserDetails();
		}

		function createSchema(tx) {
		    tx.executeSql('CREATE TABLE IF NOT EXISTS TAG_USER (accountNumber unique, password)');
		}

		function registerError(err) {
		    alert("Error processing SQL: " + err.code);
		}

		function registerSuccess() {
		    alert("success!");
		}

		function addUserDetails() {
			db.transaction(insertUserDetails, registerError, registerSuccess);
		}

		function insertUserDetails(tx) {
			tx.executeSql('DELETE FROM TAG_USER');
			tx.executeSql('INSERT INTO TAG_USER (accountNumber, password) VALUES (?, ?)', [user, pw]);
		}

		function retrieveUserDetails() {
			db.transaction(selectTagUserCB, registerError);
		}

		function selectTagUserCB(tx) {
		    tx.executeSql('SELECT * FROM TAG_USER', [], selectTagUserSuccess, registerError);
		}

		function selectTagUserSuccess(tx, results) {
			// only need to use the first row
			var len = results.rows.length;
			if (len > 0) {
				user =  results.rows.item(0).accountNumber;
				pw =  results.rows.item(0).password;
			}
			alert('accountNumber:' + user + ' password:' + pw);
		}
	

var accountNumber;
var password;
var errorText;
var accountContent;


function onBodyLoad() {
	
    document.addEventListener("deviceready", onDeviceReady, false);

}

/* When this function is called, PhoneGap has been initialized and is ready to roll */
function onDeviceReady() {

	// back button event
	document.addEventListener("backbutton", onBackButton, false);
	
	$("#result").hide();
	
	var networkState = checkConnection();
	
	if (networkState == Connection.NONE) {
		alert("This application requires an internet connection");  
	}
	
	loadIframe();
	toggleIframe();
	
	loadFromLocalStorage();
	
	if (validateAccountNumber() && validatePassword()) {
		$("#loginForm :input[name='accountNumber']").val(accountNumber);
		$("#loginForm :input[name='password']").val(password);
		$('#checkboxSave').attr('checked',true).checkboxradio('refresh'); 
	}
	
}

/* Cordova back button event */
function onBackButton() {
	navigator.app.exitApp();
}

/* Cordova alert for when a notification is dismissed */
function onAlertDismiss() {
	// do nothing
}

function validateAccountNumber() {
	return accountNumber != null && accountNumber != "";
}

function validatePassword() {
	return password != null && password != "";
}

function loadFromLocalStorage() {

	accountNumber = window.localStorage.getItem("accountNumber");
	password = window.localStorage.getItem("password");
	
	// show dialog
	$.mobile.loading( 'show', {
		text: 'Loading',
		textVisible: true,
		theme: 'c',
		html: ""
	});
	// automatically hide dialog after x seconds
	setTimeout(function() {
		$.mobile.loading( 'hide', {});
	}, 2000);
	
}

function checkConnection() {
      var networkState = navigator.connection.type;

      var states = {};
      states[Connection.UNKNOWN]  = 'Unknown connection';
      states[Connection.ETHERNET] = 'Ethernet connection';
      states[Connection.WIFI]     = 'WiFi connection';
      states[Connection.CELL_2G]  = 'Cell 2G connection';
      states[Connection.CELL_3G]  = 'Cell 3G connection';
      states[Connection.CELL_4G]  = 'Cell 4G connection';
      states[Connection.NONE]     = 'No network connection';
      
      return networkState;
      
}

function reloadIframe() {
	//$('#iframe').contentWindow.location.reload(true);
}

function loadIframe() {
    if(!$('#externalSite').length) {
    	// add the iframe to the div
    	$('#iframeHolder').html('<iframe id="externalSite" src="https://tolling.severnbridge.co.uk/account/index.php" width="700" height="450"></iframe>');
    	// switch off autocomplete so browser doesn't prompt for password save
    	$("#externalSite").contents().find('#loginForm').attr('autocomplete', 'off');
    }
}

function toggleIframe() {
	$("iframe").toggle();
}


function hideLoginForm() {
	$("#loginForm").hide();
}

function getBalance() {
	
	if (accountContent == "" || accountContent == null) {
		submitForm();
		loadAndDisplayResult()
	} else {
		displayResult();
	}
	
}

function submitForm() {
	
	accountNumber = $("#loginForm :input[name='accountNumber']").val();
	password = $("#loginForm :input[name='password']").val();
	
	var saveDetails = $('#checkboxSave').prop('checked');
	
	if (saveDetails) {
		if (validateAccountNumber() && validatePassword()) {
				//addUserDetails();
				window.localStorage.setItem("accountNumber", accountNumber);
				window.localStorage.setItem("password", password);
		}
		
	}

}

function isReady() {
	$('iframe').each(function() { 
	    $(this).ready(function() {
	        //$('#result').html("Fetching ...");
	    });
	});
}

function loadAndDisplayResult() {
	
	// show dialog
	$.mobile.loading( 'show', {
		text: 'Fetching...',
		textVisible: true,
		theme: 'c',
		html: ""
	});
	
	$("#externalSite").contents().find('#account_number').val(accountNumber);
	$("#externalSite").contents().find('#password').val(password);
	$("#externalSite").contents().find('form').submit();
	
    $('#externalSite').load(function() {
    	// parse the results from the iframe
    	parseResult();
    	// hide dialog
    	$.mobile.loading( 'hide', {});
    	// display the parsed results
    	displayResult();
    });	
    
	
	
}

function parseResult() {

	errorText = $("#externalSite").contents().find('.txt_red').text();
		
	accountContent = $("#externalSite").contents().find('.account_content').text();
	
}

function displayResult() {
    	
    	if (errorText != null && errorText != "") {
    		navigator.notification.alert(errorText, onAlertDismiss);
    	}
    	
    	if (accountContent != null && accountContent != "") {
    		
    		var regex = /\u00A3[\d\.]*/gi
    		
    		var amountString = regex.exec(accountContent);
    		
    		$('#accountBalance').html("<h2>" + "Your balance: " + amountString + "</h2>");
    		$("#loginForm").trigger("collapse");
    		// TODO change to show() ?
    		$("#result").slideDown();
    		$("#result").popup("open");

    	}

}






	
	function showiframe() {
		
        $('<iframe id="externalSite" class="externalSite" src="https://tolling.severnbridge.co.uk/account/index.php" />').dialog({
            title:'Form', 
            autoOpen: true, 
            width: 800, 
            height: 600, 
            modal: false, 
            resizable: false,
            buttons:{
                'Close':function(){$(this).dialog("close");},
                'Add Booking':function(){$('form#bookingForm').submit();}
            }
        }).width(800 - 25);
		
	}
	
	



		function submitform()
		{
		    $.ajax({
		    	   url:'https://tolling.severnbridge.co.uk/account/index.php',
		    	   type:'POST',
		    	   data:'account_number=12345&password=HELLO',
		    	   success:function(data){
		    	     $('#content').html(data).show();
		    	   },
		    	   error:function(w,t,f){
		    	     console.log(w+' '+t+' '+f);
		    	   }
		    });
		}
		function submitform2()
		{
		    var postTo = 'https://tolling.severnbridge.co.uk/account/index.php';

		    $.post(postTo,({account_number: '12345', password: 'HELLO'}),
		    function(data) {
		        alert(data);
		        if(data != "") {
		        	$('#content').html(data).show();
		        } else {
		            // couldn't connect
		        }
		        },'json');
		    return false;
		}
		function getPage() {
		    $.ajax({
		    	   url:'https://tolling.severnbridge.co.uk/account/index.php',
		    	   type:'GET',
		    	   success:function(data){
		    		 // at this point 'data' object holds the raw html
		    	     //$('#content').html(data).show();
		    		 var jqueryObject = jQuery(data);
		    		 //jqueryObject.find('form').remove();
		    		 $('#content').html(jqueryObject).show();
		    	   },
		    	   error:function(w,t,f){
		    	     alert(w+' '+t+' '+f);
		    	   }
		    });
		}
		function getJson() {
			$.ajax({
		          url: 'https://tolling.severnbridge.co.uk/account/index.php',
		          dataType: 'jsonp',
		          jsonp: 'jsoncallback',
		          timeout: 5000,
		          success: function(data, status){
		             /*Process your response here*/
		        	 //$('#content').html(data).show();
		          }
		       });

		}
	




		window.location="https://tolling.severnbridge.co.uk/account";
		
		$('#externalsite').load('https://tolling.severnbridge.co.uk/account');
		
		$("#frmLogin").contents().find('#account_number').val('12345');
		$("#frmLogin").contents().find('#password').val('HELLO');
		
	






		$(function(){
		    $('#iframebutton').click(function() {
				toggleIframe();
		    });   
		});
	





		var db;
		var user = "";
		var pw = "";
		var errorText;
		var accountContent;
	
		function onDeviceReady() {
			
			// back button event
			document.addEventListener("backbutton", onBackButton, false);
			
			$("#result").hide();
			
			var networkState = checkConnection();
			
			if (networkState == Connection.NONE) {
				alert("Tag checking requires an internet connection");
			}
			
			loadIframe();
			toggleIframe();
			
			//alert('go');
			db = window.openDatabase("bridgetag", "1.0", "Bridgetag DB", 10240);
			//alert(db);
			db.transaction(createSchema, registerError, registerSuccess);
			//addUserDetails();
			retrieveUserDetails();
			
			// show dialog
			$.mobile.loading( 'show', {
				text: 'Loading',
				textVisible: true,
				theme: 'c',
				html: ""
			});
			
			// automatically hide dialog after x seconds
			setTimeout(function() {
				$.mobile.loading( 'hide', {});
				if (validateAccountNumber() && validatePassword()) {
					$("#loginForm :input[name='accountNumber']").val(user);
					$("#loginForm :input[name='password']").val(pw);
					$('#checkboxSave').attr('checked',true).checkboxradio('refresh'); 
					$("#loginForm").trigger("collapse");
				}
			}, 2000);
			
		}
		
		function checkConnection() {
		      var networkState = navigator.connection.type;

		      var states = {};
		      states[Connection.UNKNOWN]  = 'Unknown connection';
		      states[Connection.ETHERNET] = 'Ethernet connection';
		      states[Connection.WIFI]     = 'WiFi connection';
		      states[Connection.CELL_2G]  = 'Cell 2G connection';
		      states[Connection.CELL_3G]  = 'Cell 3G connection';
		      states[Connection.CELL_4G]  = 'Cell 4G connection';
		      states[Connection.NONE]     = 'No network connection';
		      
		      return networkState;
		      
		}
		
		function validateAccountNumber() {
			return user != null && user != "";
		}

		function validatePassword() {
			return pw != null && pw != "";
		}
		
		function loadIframe() {
		    if(!$('#externalSite').length) {
		    	// add the iframe to the div
		    	$('#iframeHolder').html('<iframe id="externalSite" src="https://tolling.severnbridge.co.uk/account/index.php" width="700" height="450"></iframe>');
		    	// switch off autocomplete so browser doesn't prompt for password save
		    	$("#externalSite").contents().find('#loginForm').attr('autocomplete', 'off');
		    }
		}

		function toggleIframe() {
			$("iframe").toggle();
		}
		
		function hideLoginForm() {
			$("#loginForm").hide();
		}

		function getBalance() {
			
			if (accountContent == "" || accountContent == null) {
				submitForm();
				loadAndDisplayResult()
			} else {
				displayResult();
			}
			
		}

		function submitForm() {
			
			user = $("#loginForm :input[name='accountNumber']").val();
			pw = $("#loginForm :input[name='password']").val();
			
			var saveDetails = $('#checkboxSave').prop('checked');
			
			if (saveDetails) {
				if (validateAccountNumber() && validatePassword()) {
					addUserDetails();
				}
				
			}

		}

		function loadAndDisplayResult() {
			
			// show dialog
			$.mobile.loading( 'show', {
				text: 'Fetching...',
				textVisible: true,
				theme: 'c',
				html: ""
			});
			
			$("#externalSite").contents().find('#account_number').val(user);
			$("#externalSite").contents().find('#password').val(pw);
			$("#externalSite").contents().find('form').submit();
			
		    $('#externalSite').load(function() {
		    	// parse the results from the iframe
		    	parseResult();
		    	// hide dialog
		    	$.mobile.loading( 'hide', {});
		    	// display the parsed results
		    	displayResult();
		    });	
		    
			
			
		}

		function parseResult() {

			errorText = $("#externalSite").contents().find('.txt_red').text();
				
			accountContent = $("#externalSite").contents().find('.account_content').text();
			
		}

		function displayResult() {
		    	
		    	if (errorText != null && errorText != "") {
		    		navigator.notification.alert(errorText, onAlertDismiss);
		    	}
		    	
		    	if (accountContent != null && accountContent != "") {
		    		
		    		var regex = /\u00A3[\d\.]*/gi
		    		
		    		var amountString = regex.exec(accountContent);
		    		
		    		$('#accountBalance').html("<h2>" + "Your balance: " + amountString + "</h2>");
		    		$("#loginForm").trigger("collapse");
		    		// TODO change to show() ?
		    		$("#result").slideDown();
		    		$("#result").popup("open");

		    	}

		}
		
		/* Cordova back button event */
		function onBackButton() {
			navigator.app.exitApp();
		}

		/* Cordova alert for when a notification is dismissed */
		function onAlertDismiss() {
			// do nothing
		}
		
		// DB scripts

		function createSchema(tx) {
		    tx.executeSql('CREATE TABLE IF NOT EXISTS TAG_USER (accountNumber unique, password)');
		}

		function registerError(err) {
		    //alert("Error processing SQL: " + err.code);
		}

		function registerSuccess() {
		    //alert("success!");
		}

		function addUserDetails() {
			db.transaction(insertUserDetails, registerError, registerSuccess);
		}

		function insertUserDetails(tx) {
			tx.executeSql('DELETE FROM TAG_USER');
			tx.executeSql('INSERT INTO TAG_USER (accountNumber, password) VALUES (?, ?)', [user, pw]);
		}

		function retrieveUserDetails() {
			db.transaction(selectTagUserCB, registerError);
		}

		function selectTagUserCB(tx) {
		    tx.executeSql('SELECT * FROM TAG_USER', [], selectTagUserSuccess, registerError);
		}

		function selectTagUserSuccess(tx, results) {
			// only need to use the first row
			var len = results.rows.length;
			if (len > 0) {
				user =  results.rows.item(0).accountNumber;
				pw =  results.rows.item(0).password;
			}
			//alert('accountNumber:' + user + ' password:' + pw);
		}
	
