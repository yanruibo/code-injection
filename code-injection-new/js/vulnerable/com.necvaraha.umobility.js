


			
			
			document.addEventListener( "deviceready", onDeviceReady, false );
			
			var sentDB;
			
			function onDeviceReady() {
				document.addEventListener( "backbutton", onBackButton, false );
				sentDB = window.openDatabase( "VarahaMessages", "1.0", "Varaha Messages", 100000 );
				sentDB.transaction( populateSentMessages, errorDB ); 
	    	}
	    	
	    	
	    	window.onresize = function(){ sentDB.transaction( populateSentMessages, errorDB ); }	
	    	window.onorientationchange = populateSentMessages;
	    	
	            
			function errorDB( error ) {
				alert( "Error processing SQL: " + error.code );
			}
	    	
	    	
	    	function populateSentMessages( transaction ) {
	    		transaction.executeSql( "Select * from sentMesssage ORDER BY sentNo DESC", [], successPopulate, errorDB );
	    	}
	    	
	    	
	    	function successPopulate( transaction, results ) {
	    		console.log( "successPopulate" );
	    		var len = results.rows.length;
	    		console.log( "successPopulate record :: " + len );
				var sentMessages = document.getElementById( "sentMessages" );
				
				//Find Today's Date
				var today = new Date();
				var d = today.getDate();
				var m = today.getMonth()+1;
				var y = today.getFullYear();				
				var dd = d < 10 ? "0" + d : d;
				var mm = m < 10 ? "0" + m : m; 
				var yyyy = y;
				var currentDate = yyyy + "-" + mm + "-" + dd;
				
				var string = "";
				string += "<table class='outertable'>";
				string +="<tr><td class='td1'>";
				
				for ( var count = 0; count < len; count++ ) {	
				
					var time = new Array();
					time[count] = results.rows.item( count ).sentTime ;					
					var splitted = new Array(); 
					splitted[count] = time[count].split(" ");		
							
					string += "<Label onclick='showPopup("+results.rows.item( count ).sentNo+")' >";				
					string += "<table class='innertable' border='1'>";	
					
					if( results.rows.item( count ).displayName == "" || results.rows.item( count ).displayName == results.rows.item( count ).sipName ){
						string += "<tr><td class='from' colspan='2'>" + "From: " + results.rows.item( count ).sipName + "</td></tr>";
					}else{
						string += "<tr><td class='from' colspan='2'>" + "From: " + results.rows.item( count ).displayName + " (" + results.rows.item( count ).sipName + ")" + "</td></tr>";
					}
					
					string += "<tr><td class='from'>" + "To: " + results.rows.item( count ).sentTo + "</td>";
					
					if(currentDate == splitted[count][0]){
						string += "<td class='time' align='right'>" + splitted[count][1].substring(0,5) + "</td></tr>";
					}
					else {	
						string += "<td class='time' align='right'>" + time[count].substring(0,16) + "</td></tr>";
					}
				
					if(typeof window.onorientationchange != 'undefined'){
						if ( orientation == 0 ) {
							//alert("Portrait Mode");
							if(results.rows.item( count ).message.length > 28){
								string +=  "<tr><td class='msg' colspan='2'><textarea class='msg' rows='1' style='width:92%' disabled='disabled'>" + results.rows.item( count ).message + "</textarea>" + "..." + "</td></tr>";
							}	
							else{
								string +=  "<tr><td class='msg' colspan='2'><textarea class='msg' rows='1' style='width:98%' disabled='disabled'>" + results.rows.item( count ).message + "</textarea></td></tr>";
							}	
						}
						else if ( orientation == 90 || orientation == -90 ) {
							 //alert("Landscape Mode");
							if(results.rows.item( count ).message.length > 55){
								string +=  "<tr><td class='msg' colspan='2'><textarea class='msg' rows='1' style='width:96%' disabled='disabled'>" + results.rows.item( count ).message + "</textarea>" + "..." + "</td></tr>";
							}	
							else {
								string +=  "<tr><td class='msg' colspan='2'><textarea class='msg' rows='1' style='width:98%' disabled='disabled'>" + results.rows.item( count ).message + "</textarea></td></tr>";
							}	
						}
					}
					string += "</table>";	
					string += "</Label>";	
				}
				string +="</td></tr>";
				string += "</table>";
				sentMessages.innerHTML = string;				
	    	}
	    	
	    	
	    	function onBackButton() {
	    		var popup = document.getElementById("showpopup");			  
		    	if( popup.style.display == 'block'){
		    		popup.style.display = 'none';
		    	}
		    	else {
		    		navigator.app.loadUrl("file:///android_asset/www/index.html"); 
	    			//location.href="index.html";
		    	}
	    	}
	    	
	    	
	    	function showPopup(id) {
			   var dis="<input type = 'button' value = 'Open' class='btn' onclick='openMessage("+id+")'> <br/> <input type = 'button' value = 'Delete' class='btn' onclick='deleteMessage("+id+")'>";			 
			   var popup = document.getElementById("showpopup");			  
			   popup.style.display = 'block';
			   popup.innerHTML = dis;	
			}
			
			
			function openMessage(id) {
	    		//location.href="openSentMessage.html?id="+id+"";
	    		window.localStorage.setItem("id", id);	    		
	    		navigator.app.loadUrl("file:///android_asset/www/openSentMessage.html");  				
	    		//location.href="openSentMessage.html";
	    	}
	    	
	    		    	
			function deleteMessage(id){			
				globalid=id;				
				sentDB.transaction( deleteSentMessage, errorDB );
				sentDB.transaction( populateSentMessages, errorDB ); 
			}
			
			
			function deleteSentMessage( transaction ) {
				transaction.executeSql( "DELETE FROM sentMesssage where sentNo="+globalid );
			}
	    	
	    	
		



		
			document.addEventListener( "deviceready", onDeviceReady, false );
			
			
			function onDeviceReady() {
				document.addEventListener( "backbutton", onBackButton, false );			
				openContacts();	
	    	}
	    	
	    	
	    	function onBackButton() {
	    		navigator.app.loadUrl("file:///android_asset/www/createMessage.html"); 
	    		//location.href="createMessage.html";
	    	}
	    	
	    	
	    	function openContacts(){			
				var options = new ContactFindOptions();
				options.filter=""; 
				options.multiple=true; 
				var fields = ["displayName", "phoneNumbers"];
				navigator.contacts.find(fields, onSuccess, onError, options);
			}
			
			
			function onSuccess(contacts) {
			 	//alert('Found ' + contacts.length + ' contacts.');	
				var contactList = document.getElementById( "contactList" );	
				contactList.style.display = 'block';	
			
			   	var string = "<table border='1' style='border-color:black' class='innertable'>";		      
			    for (var i=0; i<contacts.length; i++) {	
			    	if(contacts[i].phoneNumbers){ 
            			for (var j=0; j<contacts[i].phoneNumbers.length; j++) {
	            			if(contacts[i].displayName){
	            				string += "<tr onclick='selectNumber(" + contacts[i].phoneNumbers[j].value + ")'><td style='height:50px'>" +  contacts[i].displayName + "<br/>"+ contacts[i].phoneNumbers[j].value + "</td></tr>";
	            	  		}
	            	  		else{
	            	  			string += "<tr onclick='selectNumber(" + contacts[i].phoneNumbers[j].value + ")'><td style='height:50px'>" +  contacts[i].phoneNumbers[j].value + "<br/>"+ contacts[i].phoneNumbers[j].value + "</td></tr>";
	            	  		}
            	  	  	}
            	  	}
        		}		
        		string += "</table>";	
        		contactList.innerHTML = string;	
			};
			
			
			function onError(contactError) {
			    alert('onError!');
			}
			
			
			function selectNumber(number){
				//location.href="createMessage.html?number="+number+"";				
				window.localStorage.setItem("number", number);			
				navigator.app.loadUrl("file:///android_asset/www/createMessage.html"); 		
		       	//location.href="createMessage.html";
			}
			
			    		
		




		
			var receivedno = '';
			var displayname = '';
			var sipname = '';
			var fromName = '';
			var fromNumber = '';
			var message = '';
			
			var sentDB; 
			
			document.addEventListener( "deviceready", onDeviceReady, false );
			
			
			function onDeviceReady() {
				document.addEventListener( "backbutton", onBackButton, false );
				sentDB = window.openDatabase( "VarahaMessages", "1.0", "Varaha Messages", 100000 );
				sentDB.transaction( initializeDB, errorDB );
				sentDB.transaction( checkCount, errorDB );		
				window.plugins.varahaSMS.startSMSService( smsReceivedSuccess, smsReceivedFailure );
			}
			
			
			function initializeDB( transaction ) {
				// transaction.executeSql('DROP TABLE IF EXISTS receivedMesssage');
	    		transaction.executeSql( "CREATE TABLE IF NOT EXISTS receivedMesssage( receivedNo INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, receivedTime DATETIME NOT NULL DEFAULT ( datetime( 'now','localtime' ) ), displayName TEXT NOT NULL DEFAULT '', sipName TEXT NOT NULL DEFAULT '', fromName TEXT NOT NULL DEFAULT '', fromNumber TEXT NOT NULL DEFAULT '', message TEXT NOT NULL DEFAULT '', unread INTEGER NOT NULL DEFAULT 1 )" );
	    		transaction.executeSql( "CREATE TABLE IF NOT EXISTS sentMesssage ( sentNo INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, sentTime DATETIME NOT NULL DEFAULT ( datetime( 'now','localtime' ) ), displayName TEXT NOT NULL DEFAULT '', sipName TEXT NOT NULL DEFAULT '',sentTo TEXT NOT NULL DEFAULT '', message TEXT NOT NULL DEFAULT '' )" );	    		
	    	}  
	    	
				
			function smsReceivedSuccess( success ) {
				console.log( "smsReceivedSuccess" );
				console.log( success.SenderNumber );
				console.log( success.Message );
				receivedno = success.ReceivedNo;
				displayname = success.DisplayName;
				sipname = success.SipName;
				fromName = success.SenderName;
				fromNumber = success.SenderNumber;
				message = success.Message;
				time = success.ReceivedTime;
				//alert( from + ' ' + message );
				addToReceivedMesseges();
			}		
			
			
			function smsReceivedFailure( failure ) {
				console.log( "smsReceivedFailure" );
			}	
			
					
			function addToReceivedMesseges() {
				sentDB.transaction( initializeDB, errorDB );
				sentDB.transaction( insertReceivedMessage, errorDB );
				sentDB.transaction( checkCount, errorDB );		
			}
			
					
			function insertReceivedMessage( transaction ) {
				console.log( fromNumber + ' ' + message );
				transaction.executeSql( 'INSERT INTO receivedMesssage ( displayName, sipName, fromName, fromNumber, message, receivedTime ) VALUES ( ?, ?, ?, ?, ?, ? )', [displayname, sipname, fromName, fromNumber, message, time] );
				console.log( 'Insert successfully' + receivedno);
				window.plugins.varahaSMS.deleteMessagesNotification( receivedno, deleteMessagesSuccess, deleteMessagesFailure );
			}
			
			
			function deleteMessagesSuccess( success ){
	    		//alert( success.Response );
	    	}
	    	
	    	
	    	function deleteMessagesFailure( failure ){
	    		//alert( failure.Response );
	    	}	
	    	
			
			function checkCount( transaction ){
	    		transaction.executeSql( "Select * from receivedMesssage WHERE unread=" +1, [], showUnread, errorDB );
	    		transaction.executeSql( "Select * from receivedMesssage", [], showTotal, errorDB );
	    	}
	    	
	    	var unreadCount=0;
	    	var totalCount=0;
	    	
	    	function showUnread( transaction, results ){		    	
	    		var count = document.getElementById("show");	    		  
			   	unreadCount = results.rows.length;
			   	count.innerHTML = "(" + unreadCount + "/" + totalCount +")"; 
				window.plugins.varahaSMS.updateCount( unreadCount, updateCountSuccess, updateCountFailure );
	    	}
	    	
	    	
	    	function showTotal( transaction, results ){	
	    		var count = document.getElementById("show");	    		  
			   	totalCount = results.rows.length;			   		   
			   	count.innerHTML = "(" + unreadCount + "/" + totalCount +")"; 			   	
	    	}
	    	  	
			
			function errorDB( error ) {
				alert( "Error processing SQL: " + error.code );
			}	
			
			
			function updateCountSuccess( success ){
				//alert( success.Response );
			}
							
	    	
	    	function updateCountFailure( failure ){
	    		//alert( failure.Response );
	    	}
	    	
	    	
	    	function onBackButton() {
	    		navigator.app.exitApp();
	    	}
	    	
	    	
	    	function createMessage() {
	    		navigator.app.loadUrl("file:///android_asset/www/createMessage.html"); 
	    		//location.href="createMessage.html";
	    	}
	    	
	    	
	    	function inbox() {
	    		navigator.app.loadUrl("file:///android_asset/www/inbox.html"); 
	    		//location.href="inbox.html";
	    	}
	    	
	    	
	    	function sent() {
	    		navigator.app.loadUrl("file:///android_asset/www/sent.html"); 
	    		//location.href="sent.html";
	    	}	    	
	    	
	    		    		    	
		


			
			
			document.addEventListener( "deviceready", onDeviceReady, false );	
					
			var globalid="";
			var sentDB;
			
			function onDeviceReady() {
				document.addEventListener( "backbutton", onBackButton, false );
				sentDB = window.openDatabase( "VarahaMessages", "1.0", "Varaha Messages", 100000 );
				sentDB.transaction( openSentMessages, errorDB );
	    	}
	
	
			window.onresize = function(){ sentDB.transaction( openSentMessages, errorDB ); }	
	    	window.onorientationchange = openSentMessages;
	    	
		    	
			function errorDB( error ) {
				alert( "Error processing SQL: " + error.code );
			}
	    	
	    	
	    	function openSentMessages( transaction ) {	    	
	    		//var url = String(window.location);
				//var index = url.indexOf("?");
				//var data = url.substr(index+1);
				//var splitted = data.split("=");
				//event = splitted[0];
				//number = splitted[1];
	    			    
	    		var number = window.localStorage.getItem("id");
	    		//window.localStorage.removeItem("id");		    
	    		console.log( "number " + number);
	    			    		
	    		transaction.executeSql( "Select * from sentMesssage where sentNo="+number, [], successMessage, errorDB );	
			}
	    	
	    	
	    	function successMessage( transaction, results ) {
	    		console.log( "successPopulate" );
	    		var len = results.rows.length;
	    		console.log( "successPopulate record :: " + len );
				var openSentMessage = document.getElementById( "openSentMessage" );
				var string = "";
				string += "<table class='outertable'>";
				string +="<tr><td class='td1'>";
			
				for ( var count = 0; count < len; count++ ) {				
					string += "<Label onclick='showPopup("+results.rows.item( count ).sentNo+")' >";					
					string += "<table class='innertable' border='1'>";
						
					if( results.rows.item( count ).displayName == "" || results.rows.item( count ).displayName == results.rows.item( count ).sipName ){
						string += "<tr><td class='from' colspan='2'>" + "From: " + results.rows.item( count ).sipName + "</td></tr>";
					}else{
						string += "<tr><td class='from' colspan='2'>" + "From: " + results.rows.item( count ).displayName + " (" + results.rows.item( count ).sipName + ")" + "</td></tr>";
					}
						
					string += "<tr><td>" + "To: " + results.rows.item( count ).sentTo + "</td></tr>";
					string += "<tr><td>" + "Time: " + results.rows.item( count ).sentTime + "</td></tr>";
					
					if(typeof window.onorientationchange != 'undefined'){
						if ( orientation == 0 ) {
							string +=  "<tr><td><textarea class='textmsg' rows='19' disabled='disabled'>" + results.rows.item( count ).message + "</textarea></td></tr>";				                                                                                    
						}
						else if ( orientation == 90 || orientation == -90 ) {
							string +=  "<tr><td><textarea class='textmsg' rows='6' disabled='disabled'>" + results.rows.item( count ).message + "</textarea></td></tr>";				                                                                                    
						}
					}	
						                                                                 
					string += "</table>";
					string += "</Label>";						
				}				
				string +="</td></tr>";
				string += "</table>";
				openSentMessage.innerHTML = string;				
	    	}
	    	
	    
	    	function onBackButton() {
	    		var popup = document.getElementById("showpopup");			  
		    	if( popup.style.display == 'block'){
		    		popup.style.display = 'none';
		    	}
		    	else{
		    		navigator.app.loadUrl("file:///android_asset/www/sent.html"); 
	    			//location.href="sent.html";
		    	}
	    	}
	    	    		
    		
    		function showPopup(id, message) {
			   var dis="<input type = 'button' value = 'Delete' class='btn' onclick='deleteMessage("+id+")'>";			 			 
			   var popup = document.getElementById("showpopup");			  
			   popup.style.display = 'block';
			   popup.innerHTML = dis;	
			}   
			
    		 
    		function deleteMessage(id){			
				globalid=id;			
				sentDB.transaction( deleteSentMessage, errorDB );
				navigator.app.loadUrl("file:///android_asset/www/sent.html"); 
				//location.href="sent.html";
			}
			
			
			function deleteSentMessage( transaction ) {
				transaction.executeSql( "DELETE FROM sentMesssage where sentNo="+globalid );
			}
			
	    	
		



			
			
			document.addEventListener( "deviceready", onDeviceReady, false );	
					
			var globalid="";
			var sentDB;
			
			function onDeviceReady() {
				document.addEventListener( "backbutton", onBackButton, false );
				sentDB = window.openDatabase( "VarahaMessages", "1.0", "Varaha Messages", 100000 );
				sentDB.transaction( openMessages, errorDB );
	    	}
	
	
			window.onresize = function(){ sentDB.transaction( openMessages, errorDB ); }	
	    	window.onorientationchange = openMessages;
		    	
		    	
			function errorDB( error ) {
				alert( "Error processing SQL: " + error.code );
			}
	    	
	    	
	    	function openMessages( transaction ) {	    	
	    		//var url = String(window.location);
				//var index = url.indexOf("?");
				//var data = url.substr(index+1);
				//var splitted = data.split("=");
				//event = splitted[0];
				//number = splitted[1];
	    		
				var number = window.localStorage.getItem("id");
				//window.localStorage.removeItem("id");		    
	    		console.log( "number " + number);
	    		    		
	    		transaction.executeSql( "Select * from receivedMesssage where receivedNo="+number, [], successPopulate, errorDB );
	    		
	    		transaction.executeSql("UPDATE receivedMesssage SET unread = " + 0 + " WHERE receivedNo = " + number);   		
			}
	    	
	    	
	    	function successPopulate( transaction, results ) {
	    		console.log( "successPopulate" );
	    		var len = results.rows.length;
	    		console.log( "successPopulate record :: " + len );
				var openMessage = document.getElementById( "openMessage" );
				var string = "";
				string += "<table class='outertable'>";
				string +="<tr><td class='td1'>";
			
				for ( var count = 0; count < len; count++ ) {				
					string += "<Label id='lbl' onclick='showPopup("+results.rows.item( count ).receivedNo+", "+results.rows.item( count ).fromNumber+")' >";
					string += "<table class='innertable' border='1' style='border-color:black'>";	
							
					if(results.rows.item( count ).displayName == "" || results.rows.item( count ).displayName == results.rows.item( count ).sipName ){
						string += "<tr><td class='from' colspan='2'>" + "To: " + results.rows.item( count ).sipName + "</td></tr>";
					}else{
						string += "<tr><td class='from' colspan='2'>" + "To: " + results.rows.item( count ).displayName + " (" + results.rows.item( count ).sipName + ")" + "</td></tr>";
					}
					
					//string += "<tr><td>" + "From: " + results.rows.item( count ).fromNumber + "</td></tr>";
					
					if( results.rows.item( count ).fromName == "" || results.rows.item( count ).fromName == results.rows.item( count ).fromNumber ){
						string += "<tr><td class='from' colspan='2'>" + "From: " + results.rows.item( count ).fromNumber + "</td></tr>";
					}else{
						string += "<tr><td class='from' colspan='2'>" + "From: " + results.rows.item( count ).fromName + " (" + results.rows.item( count ).fromNumber + ")" + "</td></tr>";
					}
										
					string += "<tr><td>" + "Time: " + results.rows.item( count ).receivedTime + "</td></tr>";					
					
					if(typeof window.onorientationchange != 'undefined'){
						if ( orientation == 0 ) {
							string +=  "<tr><td><textarea class='textmsg' rows='19' disabled='disabled'>" + results.rows.item( count ).message + "</textarea></td></tr>";				                                                                                    
						}
						else if ( orientation == 90 || orientation == -90 ) {
							string +=  "<tr><td><textarea class='textmsg' rows='6' disabled='disabled'>" + results.rows.item( count ).message + "</textarea></td></tr>";				                                                                                    
						}
					}			
							
					string += "</table>";
					string += "</Label>";
				}				
				string +="</td></tr>";
				string += "</table>";
				openMessage.innerHTML = string;				
	    	}
	    	
	    		    
	    	function onBackButton() {
	    		var popup = document.getElementById("showpopup");			  
		    	if( popup.style.display == 'block'){
		    		popup.style.display = 'none';
		    	}
		    	else{
		    		navigator.app.loadUrl("file:///android_asset/www/inbox.html"); 
	    			//location.href="inbox.html";
		    	}
	    	}
	    	
	    	
    		function showPopup(id, number) {
			   var dis="<input type = 'button' value = 'Reply' class='btn' onclick='replyMessage("+number+")'> <br/> <input type = 'button' value = 'Delete' class='btn' onclick='deleteMessage("+id+")'>";			 
			   var popup = document.getElementById("showpopup");			  
			   popup.style.display = 'block';
			   popup.innerHTML = dis;	
			}   
    		 
    		 
    		function replyMessage(number) {
	    		//location.href="createMessage.html?number="+number+"";
	    		window.localStorage.setItem("number", number);	    		
	    		navigator.app.loadUrl("file:///android_asset/www/createMessage.html");     		
	    		//location.href="createMessage.html";
	    	}
    		 
    		 
    		function deleteMessage(id){			
				globalid=id;			
				sentDB.transaction( deleteOpenedMessage, errorDB );
				navigator.app.loadUrl("file:///android_asset/www/inbox.html");  
				//location.href="inbox.html";
			}
			
			
			function deleteOpenedMessage( transaction ) {
				transaction.executeSql( "DELETE FROM receivedMesssage where receivedNo="+globalid );
			}
			
			
	    	function smsNotificationSuccess( success ){
	    		//alert( success.Response );
	    	}
	    	
	    	
	    	function smsNotificationFailure( failure ){
	    		//alert( failure.Response );
	    	}		
	    	
	    	
		



/**
 *  
 * @return Instance of varahaSMS
 */
var VarahaSMS = function() {
}


/**
 * @param command The command for which we want carried out
 * @param successCallback The callback which will be called when command is executed successfully
 * @param failureCallback The callback which will be called when command encounters an error
 */
VarahaSMS.prototype.sendSMS = function( smsTo, message, successCallback, failureCallback ) {
	return PhoneGap.exec( successCallback,	// Callback which will be called when command is executed successfully
    	failureCallback,    				// Callback which will be called when command encounters an error
		'SMSPlugin',  						// Telling PhoneGap that we want to run "SMSPlugin" Plugin
    	'sendSMS',							// Telling the plugin, which action we want to perform
    	[ smsTo, message ] );				// Passing a list of arguments to the plugin
};


VarahaSMS.prototype.getuMobilityRegistrationStatus = function( command, successCallback, failureCallback ) {
	return PhoneGap.exec( successCallback,	// Callback which will be called when command is executed successfully
    	failureCallback,    				// Callback which will be called when command encounters an error
		'SMSPlugin',  						// Telling PhoneGap that we want to run "SMSPlugin" Plugin
    	'getuMobilityRegistrationStatus',	// Telling the plugin, which action we want to perform
    	[] );								// Passing a list of arguments to the plugin
};


VarahaSMS.prototype.startSMSService = function( successCallback, failureCallback ) {
	return PhoneGap.exec( successCallback,	// Callback which will be called when command is executed successfully
    	failureCallback,    				// Callback which will be called when command encounters an error
		'SMSPlugin',  						// Telling PhoneGap that we want to run "SMSPlugin" Plugin
    	'startSMSService',					// Telling the plugin, which action we want to perform
    	[] );								// Passing a list of arguments to the plugin
};


VarahaSMS.prototype.stopSMSService = function( successCallback, failureCallback ) {
	return PhoneGap.exec( successCallback,	// Callback which will be called when command is executed successfully
    	failureCallback,    				// Callback which will be called when command encounters an error
		'SMSPlugin',  						// Telling PhoneGap that we want to run "SMSPlugin" Plugin
    	'stopSMSService',					// Telling the plugin, which action we want to perform
    	[] );								// Passing a list of arguments to the plugin
};


VarahaSMS.prototype.deleteMessagesNotification = function( SMSNumber, successCallback, failureCallback ) {
	return PhoneGap.exec( successCallback,	// Callback which will be called when command is executed successfully
    	failureCallback,    				// Callback which will be called when command encounters an error
		'SMSPlugin',  						// Telling PhoneGap that we want to run "SMSPlugin" Plugin
    	'deleteMessagesNotification',		// Telling the plugin, which action we want to perform
    	[SMSNumber] );								// Passing a list of arguments to the plugin
};

VarahaSMS.prototype.updateCount = function( unreadCount, successCallback, failureCallback ) {
	return PhoneGap.exec( successCallback,	// Callback which will be called when command is executed successfully
    	failureCallback,    				// Callback which will be called when command encounters an error
		'SMSPlugin',  						// Telling PhoneGap that we want to run "SMSPlugin" Plugin
    	'updateCount',						// Telling the plugin, which action we want to perform
    	[unreadCount] );					// Passing a list of arguments to the plugin
};

/**
 * <ul>
 * <li>Register the Javascript plugin.</li>
 * <li>Also register native call which will be called when this plugin runs</li>
 * </ul>
 */
PhoneGap.addConstructor(
	function() {
		// Register the javascript plugin with PhoneGap
		PhoneGap.addPlugin( 'varahaSMS', new VarahaSMS() );
		
		// Register the native class of plugin with PhoneGap
		// PluginManager.addService( "SMSPlugin", "com.varaha.umobility.gui.SMSPlugin" );
	}
);






		
			var displayname = '';
			var sipname = '';
			var sentDB;

			document.addEventListener( "deviceready", onDeviceReady, false );			
			
			
			function onDeviceReady() {
				document.addEventListener( "backbutton", onBackButton, false );
				checkRegistationStatus();
				sentDB = window.openDatabase( "VarahaMessages", "1.0", "Varaha Messages", 100000 );
				sentDB.transaction( initializeDB, errorDB );
				getSenderNumber();
	    	}
	    	
	    	
	    	function initializeDB( transaction ) {
	    		transaction.executeSql( "CREATE TABLE IF NOT EXISTS sentMesssage ( sentNo INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, sentTime DATETIME NOT NULL DEFAULT ( datetime( 'now','localtime' ) ), displayName TEXT NOT NULL DEFAULT '', sipName TEXT NOT NULL DEFAULT '',sentTo TEXT NOT NULL DEFAULT '', message TEXT NOT NULL DEFAULT '' )" );
	    	}
	    	
	    	
			function errorDB( error ) {
				alert( "Error processing SQL: " + error.code );
			}
	    	
	    	
	    	function onBackButton() {
	    		navigator.app.loadUrl("file:///android_asset/www/index.html"); 
	    		//location.href="index.html";
	    	}
	    	
	    	
			function resultSuccess( success ) {
				displayname = success.DisplayName;
				sipname = success.SipName;
				addToSentMesseges();
				alert( success.Response );	
			}
			
			
			function addToSentMesseges() {
				var sentDB = window.window.openDatabase( "VarahaMessages", "1.0", "Varaha Messages", 100000 );
				sentDB.transaction( insertSentMessage, errorDB );
			}
			
			
			function insertSentMessage( transaction ) {
				var smsTo = document.getElementById( "to" ).value;
				var message = document.getElementById( "message" ).value;
				transaction.executeSql( 'INSERT INTO sentMesssage ( displayName, sipName, sentTo, message ) VALUES ( ?, ?, ?, ? )', [displayname, sipname, smsTo, message] );
				
				document.getElementById( "to" ).value = '';
				document.getElementById( "message" ).value = '';
			}
			
			
			function resultFailure( failure ) {
				alert( failure.Response );
			}
			
			
			function SendMessage() {
				var smsTo = document.getElementById( "to" ).value;
				var message = document.getElementById( "message" ).value;
				if(smsTo == ""){
					alert("Please Enter Recipient Number");
				}else{
					window.plugins.varahaSMS.sendSMS( smsTo, message, resultSuccess, resultFailure );
				}
			}
			
			
			function checkRegistationStatus() {
				console.log( "checkRegistationStatus" );
				window.plugins.varahaSMS.getuMobilityRegistrationStatus( "getuMobilityRegistrationStatus", registrationSuccess, resultFailure ); 
			}
			
			
			function registrationSuccess( success ) {
				console.log( success.Response );
				console.log( success.RegistrationStatus );
				
				if ( success.RegistrationStatus == 'false' ) {
					alert( success.Response );
					onBackButton();
					checkRegistationStatus();
				}
			}
			
	    	
	    	function getSenderNumber()
			{
				//var url = String(window.location);
				//var index = url.indexOf("?");
				//var data = url.substr(index+1);
				//var splitted = data.split("=");
				//event = splitted[0];
				//number = splitted[1];
				
				//if(number != null){
					//document.getElementById("to").value = number ;					
				//}
				
				var contactNumber = window.localStorage.getItem("number");
			    window.localStorage.removeItem("number");
			    		    
				if(contactNumber != null){					
			    	document.getElementById("to").value = contactNumber ;
				}
			}
			
			
			function openContactList(){
				navigator.app.loadUrl("file:///android_asset/www/contactList.html"); 
				//location.href="contactList.html";
			}
			
			
		



			
			
			document.addEventListener( "deviceready", onDeviceReady, false );		
				
			var globalid="";
			var sentDB;
			
			
			function onDeviceReady() {
				document.addEventListener( "backbutton", onBackButton, false );
			    sentDB = window.openDatabase( "VarahaMessages", "1.0", "Varaha Messages", 100000 );
				sentDB.transaction( populateReceivedMessages, errorDB );
				sentDB.transaction( checkCount, errorDB );		
			}
	    	
	    	  	
	    	window.onresize = function(){ sentDB.transaction( populateReceivedMessages, errorDB ); }	
	    	window.onorientationchange = populateReceivedMessages;
	    	
	    	
			function errorDB( error ) {
				alert( "Error processing SQL: " + error.code );
			}
	    	
	    	
	    	function populateReceivedMessages( transaction ) {
	    		transaction.executeSql( "Select * from receivedMesssage ORDER BY receivedNo DESC", [], successPopulate, errorDB );
	    	}
	    	
	    	
	    	function successPopulate( transaction, results ) {
	    		console.log( "successPopulate" );
	    		var len = results.rows.length;
	    		console.log( "successPopulate record :: " + len );
				var inboxMessages = document.getElementById( "inboxMessages" );	
				
				//Find Today's Date
				var today = new Date();
				var d = today.getDate();
				var m = today.getMonth()+1;
				var y = today.getFullYear();				
				var dd = d < 10 ? "0" + d : d;
				var mm = m < 10 ? "0" + m : m; 
				var yyyy = y;
				var currentDate = yyyy + "-" + mm + "-" + dd;
					  			
				var string = "";				
				string += "<table class='outertable'>";
				string +="<tr><td class='td1'>";
			
				for ( var count = 0; count < len; count++ ) {
				
					var time = new Array();
					time[count] = results.rows.item( count ).receivedTime ;					
					var splitted = new Array(); 
					splitted[count] = time[count].split(" ");	
					
					if ( results.rows.item( count ).unread == 0 ) {
						string += "<Label onclick='showPopup("+results.rows.item( count ).receivedNo+")' >";				
						string += "<table class='innertable' border='1'>";		
						
						if( results.rows.item( count ).displayName == "" || results.rows.item( count ).displayName == results.rows.item( count ).sipName ){
							string += "<tr><td class='from' colspan='2'>" + "To: " + results.rows.item( count ).sipName + "</td></tr>";
						}else{
							string += "<tr><td class='from' colspan='2'>" + "To: " + results.rows.item( count ).displayName + " (" + results.rows.item( count ).sipName + ")" + "</td></tr>";
						}
						
						//string += "<tr><td class='from'>" + "From: " + results.rows.item( count ).fromNumber + "</td>";
						
						if( results.rows.item( count ).fromName == "" || results.rows.item( count ).fromName == results.rows.item( count ).fromNumber ){
							string += "<tr><td class='from'>" + "From: " + results.rows.item( count ).fromNumber + "</td>";
						}else{
							string += "<tr><td class='from'>" + "From: " + results.rows.item( count ).fromName + " (" + results.rows.item( count ).fromNumber + ")" + "</td>";
						}
												
						if(currentDate == splitted[count][0]){
							string += "<td class='time' align='right'>" + splitted[count][1].substring(0,5) + "</td></tr>";
						}
						else {	
							string += "<td class='time' align='right'>" + time[count].substring(0,16) + "</td></tr>";
						}
						
						if(typeof window.onorientationchange != 'undefined'){
							if ( orientation == 0 ) {
								//alert("Portrait Mode");
								if(results.rows.item( count ).message.length > 28){
									string +=  "<tr><td class='msg' colspan='2'><textarea class='msg' rows='1' style='width:92%' disabled='disabled'>" + results.rows.item( count ).message + "</textarea>" + "..." + "</td></tr>";
								}	
								else{
									string +=  "<tr><td class='msg' colspan='2'><textarea class='msg' rows='1' style='width:98%' disabled='disabled'>" + results.rows.item( count ).message + "</textarea></td></tr>";
								}	
							}
							else if ( orientation == 90 || orientation == -90 ) {
								 //alert("Landscape Mode");
								if(results.rows.item( count ).message.length > 55){
									string +=  "<tr><td class='msg' colspan='2'><textarea class='msg' rows='1' style='width:96%' disabled='disabled'>" + results.rows.item( count ).message + "</textarea>" + "..." + "</td></tr>";
								}	
								else{
									string +=  "<tr><td class='msg' colspan='2'><textarea class='msg' rows='1' style='width:98%' disabled='disabled'>" + results.rows.item( count ).message + "</textarea></td></tr>";
								}	
							}
						}	
						string += "</table>";	
						string += "</Label>";	
					}
					else {
						string += "<Label onclick='showPopup( "+results.rows.item( count ).receivedNo+" )' >";
						string += "<table class='innertable' border='1'>";
						if( results.rows.item( count ).displayName == "" || results.rows.item( count ).displayName == results.rows.item( count ).sipName ){
							string += "<tr><td class='from' colspan='2'><b>" + "To: " + results.rows.item( count ).sipName + "</b></td></tr>";
						}else{
							string += "<tr><td class='from' colspan='2'><b>" + "To: " + results.rows.item( count ).displayName + " (" + results.rows.item( count ).sipName + ")" + "</b></td></tr>";
						}
						//string += "<tr><td class='from'><b>" + "From: " + results.rows.item( count ).fromNumber + "</b></td>";
						
						if( results.rows.item( count ).fromName == "" || results.rows.item( count ).fromName == results.rows.item( count ).fromNumber ){
							string += "<tr><td class='from'><b>" + "From: " + results.rows.item( count ).fromNumber + "</b></td>";
						}else{
							string += "<tr><td class='from'><b>" + "From: " + results.rows.item( count ).fromName + " (" + results.rows.item( count ).fromNumber + ")" + "</b></td>";
						}
						
						if(currentDate == splitted[count][0]){
							string += "<td class='time' align='right'><b>" + splitted[count][1].substring(0,5) + " " + "</b></td></tr>";
						}
						else {
							string += "<td class='time' align='right'><b>" + time[count].substring(0,16) + " " + "</b></td></tr>";
						}
											
						if(typeof window.onorientationchange != 'undefined'){
							if ( orientation == 0 ) {
								if(results.rows.item( count ).message.length > 28){
									string +=  "<tr><td class='msg' colspan='2'><b><textarea class='msg' rows='1' style='width:92%' disabled='disabled'>" + results.rows.item( count ).message + "</textarea>" + "..." + "</b></td></tr>";
								}	
								else{
									string +=  "<tr><td class='msg' colspan='2'><b><textarea class='msg' rows='1' style='width:98%' disabled='disabled'>" + results.rows.item( count ).message + "</textarea></b></td></tr>";
								}
							}
							else if ( orientation == 90 || orientation == -90 ) {
								if(results.rows.item( count ).message.length > 55){
									string +=  "<tr><td class='msg' colspan='2'><b><textarea class='msg' rows='1' style='width:96%' disabled='disabled'>" + results.rows.item( count ).message + "</textarea>" + "..." + "</b></td></tr>";
								}	
								else{
									string +=  "<tr><td class='msg' colspan='2'><b><textarea class='msg' rows='1' style='width:98%' disabled='disabled'>" + results.rows.item( count ).message + "</textarea></b></td></tr>";
								}
							}
						}			
						string += "</table>";	
						string += "</Label>";		
					}
				}
				string +="</td></tr>";
				string += "</table>";
				inboxMessages.innerHTML = string;					
	    	}
	    	
	    	
	    	function onBackButton() {		    	
		    	var popup = document.getElementById("showpopup");			  
		    	if( popup.style.display == 'block'){
		    		 popup.style.display = 'none';
		    	}
		    	else{
		    		navigator.app.loadUrl("file:///android_asset/www/index.html"); 
		    		//location.href="index.html";
		    	}
	    	}
	    	
	    	    
			function showPopup(id) {
			   var dis="<input type = 'button' value = 'Open' class='btn' onclick='openMessage("+id+")'> <br/> <input type = 'button' value = 'Delete' class='btn' onclick='deleteMessage("+id+")'>";			 
			   var popup = document.getElementById("showpopup");			  
			   popup.style.display = 'block';
			   popup.innerHTML = dis;	
			}
			
			
			function openMessage(id) {				
	    		//location.href="openMessage.html?id="+id+"";
	    		window.localStorage.setItem("id", id);	    		
	    		navigator.app.loadUrl("file:///android_asset/www/openMessage.html");  		
	    		//location.href="openMessage.html";
	    	}
	    	
	    		    	
			function deleteMessage(id){			
				globalid=id;				
				sentDB.transaction( deleteReceivedMessage, errorDB );
				sentDB.transaction( populateReceivedMessages, errorDB );
				sentDB.transaction( checkCount, errorDB );		
			}
			
			
			function deleteReceivedMessage( transaction ) {
				transaction.executeSql( "DELETE FROM receivedMesssage where receivedNo="+globalid );
			}
				
			
	    	function smsNotificationSuccess( success ){
	    		//alert( success.Response );
	    	}
	    	
	    	
	    	function smsNotificationFailure( failure ){
	    		//alert( failure.Response );
	    	}		
	    	
	    	
	    	function checkCount( transaction ){
	    		transaction.executeSql( "Select * from receivedMesssage WHERE unread=" +1, [], showUnread, errorDB );
	    		transaction.executeSql( "Select * from receivedMesssage", [], showTotal, errorDB );
	    	}
	    	
	    	var unreadCount=0;
	    	var totalCount=0;
	    	
	    	function showUnread( transaction, results ){		    	
	    		var count = document.getElementById("show");	    		  
			   	unreadCount = results.rows.length;
			   	count.innerHTML = "(" + unreadCount + "/" + totalCount +")"; 
	    	}
	    	
	    	
	    	function showTotal( transaction, results ){	
	    		var count = document.getElementById("show");	    		  
			   	totalCount = results.rows.length;			   		   
			   	count.innerHTML = "(" + unreadCount + "/" + totalCount +")"; 			   	
	    	}
	    	
			
		


