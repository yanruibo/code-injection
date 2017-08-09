







function start()
{
    document.addEventListener('deviceready',call,false);
}
function calllist()
{
	document.getElementById("calllog").innerHTML=" ";	
	 document.getElementById('foot').style.visibility = 'visible';
	 document.getElementById('foot').innerHTML="";
    window.plugins.CallLog.list("all",function(r){printResult(r)},function(e){console.log(e)});
}
function call()
{			
    		var queryString=new Array();
    		var url=window.location.href;
    		//alert(url);
    		//alert(url.indexOf("?"));
    		if(url.indexOf("?")!=-1)
    			{
		    		queryString=url.split("?");
		    		get_contacts();
    			}
    		else
    			{
		    	   	 document.getElementById("calllog").innerHTML=" ";	
			    	 document.getElementById('foot').style.visibility = 'visible';
			    	 document.getElementById('foot').innerHTML="";
				     window.plugins.CallLog.list("all",function(r){printResult(r)},function(e){console.log(e)});
    			}
    }
function printResult(fileInfo)
{
	    document.getElementById('calllog').innerHTML="";
	    document.getElementById('foot').innerHTML="";
	    var innerHtmlText;
	    var no_of_call=0;
	    var key=Object.keys(fileInfo);
	  	var t_day=new Date();
	  	document.getElementById('foot').innerHTML=document.getElementById('foot').innerHTML+"<table><tr><td></td><td><button><img src=images/miss.png onclick=window.plugins.CallLog.list(\"all\",function(r){displayMissCall(r)},function(e){console.log(e)});></button>"+
		  "</td>"+"<td><button><img src=images/in.png onclick=window.plugins.CallLog.list(\"all\",function(r){displayInCall(r)},function(e){console.log(e)});></button></td>"+
		  "<td><button><img src=images/out.png onclick=calllist();></button></td></tr><table>";
		 
		 for(var i=0;i<fileInfo.rows.length;i++)
		  {
			  if(fileInfo.rows[i].type==2)
				  {
				  	var name=fileInfo.rows[i].cachedName;
				  	var dur=fileInfo.rows[i].duration;
				  	var t="";
				  	var d=fileInfo.rows[i].date;
				  	var date = new Date(d)//*1000);
				  	var s=date.toString();
				  	var t1=s.substring(0,15);
				  	var today_string=t_day.toString();
				  	var sub_date=today_string.substring(0,15);
				   
				  	var time=s.substring(15,24);
				   	if(sub_date==t1)
				  		{
				  			t="Today ,"+time;
				  		}
				  	else
				  		t=s.substring(0,24);
				   	 	if(name==undefined)
				  		{
				  			fileInfo.rows[i].cachedName="no name";
				  			document.getElementById("calllog").innerHTML=document.getElementById("calllog").innerHTML+"<ul><li><a href='tel:"+fileInfo.rows[i].number+"' style=border-bottom: 1px;!important;><img src=images/shortcut_contact.png height=30 width=30></a>"+fileInfo.rows[i].cachedName+" ("+fileInfo.rows[i].number.substring(0,7)+"... )<img src=images/icon_log_outgoing.png height=30 width=30 style=float:right; !important></li>"+
				  			"<li><font style=\"color: blue; !important;\">"+t+"</font></li>"+"<li>_______________________________________________</li></ul>";
				  		}
				  	else
				  		{
				  		document.getElementById("calllog").innerHTML=document.getElementById("calllog").innerHTML+"<ul><li><a href='tel:"+fileInfo.rows[i].number+"' style=\"border-bottom: 1px;!important;\"><img src=images/shortcut_contact.png height=30 width=30></a>"+fileInfo.rows[i].cachedName+" ("+fileInfo.rows[i].number.substring(0,7)+"... )<img src=images/icon_log_outgoing.png height=30 width=30 style=float:right; !important></li>"+
				  		"<li><font style=\"color: blue; !important;\">"+t+"</font></li>"+"<li>_______________________________________________</li></ul>";
				  		}
				  	}
			  }
	  }
function displayMissCall(fileInfo)
{
		 var count=0;
		 document.getElementById('calllog').innerHTML="";
		 for(var i=0;i<fileInfo.rows.length;i++)
		  {
			 if(fileInfo.rows[i].type==3)
				 {
				 	count=1;
				 	var name=fileInfo.rows[i].cachedName;
				  	var dur=fileInfo.rows[i].duration;
				  	var t="";
				  	var d=fileInfo.rows[i].date;
				  	var date = new Date(d)//*1000);
				  	var s=date.toString();
				  	var t1=s.substring(0,15);
				  	
				  	var today_string=t_day.toString();
				  	var sub_date=today_string.substring(0,15);
				   
				  	var time=s.substring(15,24);
				   	if(sub_date==t1)
				  		{
				  			t="Today ,"+time;
				  		}
				  	else
				  		t=s.substring(0,24);
				  	 	if(name==undefined)
				  		{
				  			fileInfo.rows[i].cachedName="no name";
				  			document.getElementById("calllog").innerHTML=document.getElementById("calllog").innerHTML+"<ul><li><a href='tel:"+fileInfo.rows[i].number+"' style=border-bottom: 1px;!important;><img src=images/shortcut_contact.png height=30 width=30></a>"+fileInfo.rows[i].cachedName+" ("+fileInfo.rows[i].number.substring(0,7)+"... )<img src=images/icon_log_missed.png height=30 width=30 style=float:right; !important></li>"+
				  			"<li><font style=\"color: blue; !important;\">"+t+"</font></li>"+"<li>_______________________________________________</li></ul>";
				  		}
				  	else
				  		{
				  		document.getElementById("calllog").innerHTML=document.getElementById("calllog").innerHTML+"<ul><li><a href='tel:"+fileInfo.rows[i].number+"' style=border-bottom: 1px;!important;><img src=images/shortcut_contact.png height=30 width=30></a>"+fileInfo.rows[i].cachedName+" ("+fileInfo.rows[i].number.substring(0,7)+"... )<img src=images/icon_log_missed.png height=30 width=30 style=float:right; !important></li>"+
				  		"<li><font style=\"color: blue; !important;\">"+t+"</font></li>"+"<li>_______________________________________________</li></ul>";
				  		}
				 }
			 
		  }
		 if(count==0)
			 {
			 document.getElementById("calllog").innerHTML="<center><strong> 0 result Found </strong></center>";
			 }
		 
}
function displayInCall(fileInfo)
{
		 var count=0;
		 document.getElementById('calllog').innerHTML="";
		 for(var i=0;i<fileInfo.rows.length;i++)
		  {
			 if(fileInfo.rows[i].type==1)
				 {
				 	
				 	count=1;
				 	var name=fileInfo.rows[i].cachedName;
				  	var dur=fileInfo.rows[i].duration;
				  	var t="";
				  	var d=fileInfo.rows[i].date;
				  	var date = new Date(d)//*1000);
				  	var s=date.toString();
				  	var t1=s.substring(0,15);
				  	
				  	var today_string=t_day.toString();
				  	var sub_date=today_string.substring(0,15);
				   
				  	var time=s.substring(15,24);
				   	if(sub_date==t1)
				  		{
				  			t="Today ,"+time;
				  		}
				  	else
				  		t=s.substring(0,24);
				  	
				  	 	if(name==undefined)
				  		{
				  			fileInfo.rows[i].cachedName="no name";
				  			document.getElementById("calllog").innerHTML=document.getElementById("calllog").innerHTML+"<ul><li><a href='tel:"+fileInfo.rows[i].number+"' style=border-bottom: 1px;!important;><img src=images/shortcut_contact.png height=30 width=30></a>"+fileInfo.rows[i].cachedName+" ("+fileInfo.rows[i].number.substring(0,7)+"... )<img src=images/icon_log_incoming.png height=30 width=30 style=float:right; !important></li>"+
				  			"<li><font style=\"color: blue; !important;\">"+t+"</font></li>"+"<li>_______________________________________________</li></ul>";
				  		}
				  	else
				  		{
				  		document.getElementById("calllog").innerHTML=document.getElementById("calllog").innerHTML+"<ul><li><a href='tel:"+fileInfo.rows[i].number+"' style=border-bottom: 1px;!important;><img src=images/shortcut_contact.png height=30 width=30></a>"+fileInfo.rows[i].cachedName+" ("+fileInfo.rows[i].number.substring(0,7)+"... )<img src=images/icon_log_incoming.png height=30 width=30 style=float:right; !important></li>"+
				  		"<li><font style=\"color: blue; !important;\">"+t+"</font></li>"+"<li>_______________________________________________</li></ul>";
				  		}
				 }
			 
		  }
		 if(count==0)
			 {
			 document.getElementById("calllog").innerHTML="<center><strong> 0 result Found </strong></center>";
			 }
		 
} 
 /************************SMS************************/
var btn2 = document.getElementById("btn2");
btn2.onclick = function()
{
		  document.getElementById("calllog").innerHTML="";
		  document.getElementById('foot').style.visibility = 'visible';
     	  document.getElementById('foot').innerHTML="";
		  window.plugins.SMSReader.getSent("all",function(r){printResultSent(r)},function(e){console.log(e)});
} 
function printResultSent(sms)
{
			 document.getElementById("calllog").innerHTML="<center><strong>All("+sms.messages.length+")</strong></center><br/>";
			 for(var j=0;j<sms.messages.length;j++)
			 {
				  document.getElementById("calllog").innerHTML=document.getElementById("calllog").innerHTML+"<ul><li><a href='sms:"+sms.messages[j].number+"'><button><img src=images/cd_msg.png height=30 width=30></button></a>"+sms.messages[j].number+" "+sms.messages[j].text+
				  "</li><li>_______________________________________________</li></ul>";
					
			 }
			document.getElementById("foot").innerHTML="<button onclick=compose();><img src=images/compose.png></button> ";
}
function compose()
{
	  window.location.href = "sms:?body="; 
}
  
function getFav()
{
	   document.getElementById('foot').innerHTML="";
 	   document.getElementById('calllog').innerHTML =" ";
	   document.getElementById('calllog').innerHTML="<input type=button id=fav value=ADD onclick=get_contacts1();><img src=images/fav_add.png height: 75px; width: 70px >";    
}



var contact_name="";
var contact_num="";
var contact_email="";
var scanCode = function() 
{

	window.plugins.barcodeScanner.scan
	(
        function(result)
        {
       /* alert("Scanned Code: " + result.text 
                + ". Format: " + result.TEL
                + ". Format: " + result.Email
                + ". Cancelled: " + result.cancelled);*/
        	//alert("Scanned Code: " + result.text );
            string=result.text;
            //alert(string);
            if(string.indexOf('MECARD')!=-1)
            	{
            	//alert("in mecard");
			            var arr=string.split(';');
			          //  alert("arr len "+arr.length);
			            flag=0;
			            for(var i=0;i<arr.length;i++)
			            	{	// alert("arr[i] "+arr[i]);
			            	if(arr[i].indexOf('N')!=-1)
	            			{
	            				flag=1;
	            				nm=arr[i].split(":");
	            				var len=nm.length;
	            				//alert("nm "+nm[2]);
			            		name=nm[2];
			            		contact_name=name;
			            		//alert("name "+name);
			            				
	            				
	            			}
			            		if(arr[i].indexOf('TEL')!=-1)
			            		{	
			            			flag=1;
			            			//alert("in index of");
			            			ph=arr[i].split(':');
			            			//alert("ph"+ph);
			            			phnum=ph[1];
			            			contact_num=phnum;
			            			//alert("phnum "+phnum);
			            		}
			            		if(arr[i].indexOf('EMAIL')!=-1)
			            		{	
			            			//alert("in index of");
			            			mail=arr[i].split(':');
			            			//alert("ph"+mail);
			            			email=mail[1];
			            			contact_email=email;
			            			//alert("email"+email);
			            		}
			            		
			            		
			            		
			            	}
			            var retVal = confirm("Add information to contact list?");
	            		   if( retVal == true )
	            		   {
	            		      addContact();
	            		   }else
	            		   {
	            			   window.open("Home.html?btn3", "", "");
	            		   }
			            
            	}	
            else if(string.indexOf('VCARD')!=-1)
            	{
            		//alert("in vcard");
            		var arr=string.split('\n');
            		//alert("arr len "+arr.length);
            		nm=arr[1].split(":");
    				//alert("nm "+nm[1]);
            		name=nm[1];
            		contact_name=name;
            		//alert("name "+name);
            				
    					
            		for(var i=0;i<arr.length;i++)
	            	{	// alert("arr[i] "+arr[i]);
	            		if(arr[i].indexOf('TEL')!=-1)
	            		{	
	            			flag=1;
	            			//alert("in index of");
	            			ph=arr[i].split(':');
	            			//alert("ph"+ph);
	            			phnum=ph[1];
	            			contact_num=phnum;
	            			//alert("phnum "+phnum);
	            		}
	            		if(arr[i].indexOf('EMAIL')!=-1)
	            		{	
	            			//alert("in index of");
	            			mail=arr[i].split(':');
	            			//alert("ph"+mail);
	            			email=mail[1];
	            			contact_email=email;
	            			//alert("email"+email);
	            		}
	            		
	            	}
            		var retVal = confirm("Add information to contact list?");
         		   if( retVal == true )
         		   {
         		      addContact();
         		   }else
         		   {
         			   window.open("Home.html?btn3", "", "");
         		   }
            	}
            
            else
        	{
			 alert("QR code Does not contain contact information");
			}
        }, 
        function(error) 
        {
        alert("Scan failed: " + error);
       });
}
/***********************************************************************/

function addContact()
{
	//alert("in add contact");
	//alert("contact_name"+contact_name);
	//alert("contact_num"+contact_num);
	var contact = navigator.contacts.create();
    contact.displayName =contact_name;
    var name = new ContactName();
     //var phnum=new 
     name.givenName = contact_name;
     contact.name = name;
     //contact.phoneNumbers=num;
	contact.phoneNumbers=[new ContactField('mobile',contact_num,true)];
	
	contact.email=[new ContactField('home',contact_email,true)];
     // save
     contact.save(onSuccess,onSaveError);
    
}

function onSuccess(contacts)
{
   alert("Contact successfully added!!!!");
}

// onError: Failed to get the contacts
//
function onSaveError(contactError)
{
    alert('Error while processing!'+contactError.code);
}



/************************************************************************/




var encodeText = function() {
    window.plugins.barcodeScanner.encode(
            BarcodeScanner.Encode.TEXT_TYPE,
            "http://www.mobiledevelopersolutions.com", 
            function(success) {
                alert("Encode success: " + success);
            }, function(fail) {
                alert("Encoding failed: " + fail);
            });
}

var encodeEmail = function() {
    window.plugins.barcodeScanner.encode(
        BarcodeScanner.Encode.EMAIL_TYPE,
        "a.name@gmail.com", function(success) {
            alert("Encode success: " + success);
        }, function(fail) {
            alert("Encoding failed: " + fail);
        });
}

var encodePhone = function() {
    window.plugins.barcodeScanner.encode(
        BarcodeScanner.Encode.PHONE_TYPE,
        "555-227-5283", function(success) {
            alert("Encode success: " + success);
        }, function(fail) {
            alert("Encoding failed: " + fail);
        });
}

var encodeSMS = function() {
    window.plugins.barcodeScanner.encode(
        BarcodeScanner.Encode.SMS_TYPE,
        "An important message for someone.", function(success) {
            alert("Encode success: " + success);
        }, function(fail) {
            alert("Encoding failed: " + fail);
        });
}










function addContact()
{
	
	var fname=document.getElementById('fname').value;
	var lname=document.getElementById('lname').value;
	var num=document.getElementById('ph').value; 
	var sel=document.getElementById('select').value;
	var mail=document.getElementById('email').value;
	var atpos=mail.indexOf("@");
    var dotpos=mail.lastIndexOf(".");
    fname_new=fname.charAt(0).toUpperCase() + fname.slice(1);
    lname_new=lname.charAt(0).toUpperCase() + lname.slice(1);
	var contact = navigator.contacts.create();
    contact.displayName =fname_new;
    if(fname==" ")
    	{
    	alert("Please enter First Name");
    	}
    else if(lname==" ")
	{
	alert("Please enter Last Name");
	}
    else if(num.length<9)
	{
		alert("Please enter proper number");
	}
    else if (atpos<1 || dotpos<atpos+2 || dotpos+2>=mail.length)
      {
      alert("Not a valid e-mail address");
      }

    else
    	{
     var name = new ContactName();
     //var phnum=new 
     name.givenName = fname_new;
     name.familyName = lname_new;
     contact.name = name;
     //contact.phoneNumbers=num;
	if(sel==1)
		{
		
			contact.phoneNumbers=[new ContactField('mobile',num,true)];
	}
	if(sel==2)
	{
		contact.phoneNumbers=[new ContactField('home',num,true)];
	}
	
	contact.email=[new ContactField('home',mail,true)];
     // save
     contact.save(onSuccess,onSaveError);
    }
}

function onSuccess(contacts)
{
   alert("Contact sucessfully added!!!!!");
   window.open("Home.html","","");
}

// onError: Failed to get the contacts
//
function onSaveError(contactError)
{
    alert('onError!'+contactError);
}









var arr=new Array();
var arr_num=new Array();
var flag=0;
function start()
{
document.addEventListener('deviceready',contacts,false);
}
function contacts() 
{
	
	document.getElementById('log').innerHTML =" ";
	
    var obj = new ContactFindOptions();
    obj.filter = " ";
    obj.multiple=true;
    var filter=[ "displayName","name","phoneNumbers"];
    obj.multiple = true;
    navigator.contacts.find(filter,success,fail, obj);
}
function success(contacts)
{
	document.getElementById('log').innerHTML =" ";
	
    for (var i = 0; i < contacts.length ; i++) 
    {       
    	for (var j=0; j<contacts[i].phoneNumbers.length; j++) 
    		{
    		   if (contacts[i].name && contacts[i].name.formatted) 
		        {
    			   arr[i]=contacts[i].name.formatted;
    			   arr_num[i]=contacts[i].phoneNumbers[j].value;
		        	document.getElementById('log').innerHTML=document.getElementById('log').innerHTML + 
		           "<br/><a href='tel:"+contacts[i].phoneNumbers[j].value+"' rel=external><img src=images/shortcut_contact.png height=35px width=35px /></a>" + contacts[i].name.formatted+" "+contacts[i].phoneNumbers[j].value;
		       }
    		}
    }
    match();
}
function fail (error) 
{
    document.getElementById('log').innerHTML = "<strong>Error getting contacts.</strong>";
}


function match()
{
	
	var a=0;
	//alert("in match");
	 var strValue = document.getElementById("log").innerHTML;
	// alert(	arr.length);
	 //alert(arr);
	 var str=document.getElementById('tags').value;
	 for(var i=0;i<arr.length;i++)
		 {
			 var len=str.length;
			 var v=arr[i].substring(0,1);
			 var lower=v.toLowerCase();
			 if(str=="")
			  {
		    	 document.getElementById('log').innerHTML="";
				 for(var i=0;i<arr.length;i++)
				 {
					 document.getElementById('log').innerHTML=document.getElementById('log').innerHTML+"<br/><a href='tel:"+arr_num[i]+"' rel=external><img src=images/shortcut_contact.png height=35px width=35px /></a>"+arr[i]+" "+arr_num[i];
					 
				 }
					flag=0;
			  }
			if(lower==str)	
				{
				 a=1;
				 if(flag==0)
					{
				      document.getElementById('log').innerHTML="<br/><a href='tel:"+arr_num[i]+"' rel=external><img src=images/shortcut_contact.png height=35px width=35px /></a>"+arr[i]+" "+arr_num[i];
				     flag=1;
					}
				 else
					 document.getElementById('log').innerHTML=document.getElementById('log').innerHTML+"<br/><a href='tel:"+arr_num[i]+"' rel=external><img src=images/shortcut_contact.png height=35px width=35px /></a>"+arr[i]+" "+arr_num[i];
				}
			
			    /* if(a==1)
					  {
					   
				        document.getElementById('log').innerHTML="No match Found!!!";
					  }*/
				
			 }
	 
	 
}











var fname="";
var phone="";
var name="";
var email="";
var param="";
var group=[];
var db = window.openDatabase("Database", "1.0", "Cordova Demo", 200000);

function start()
{
	var url=window.location.href;
	// alert(url);
	 var query="";
	 var name_arr;
    if(url.indexOf("?")!=-1)
     {
      query=url.split("?");
     }
 
    name_arr=query[1].split("_");
    fname=name_arr[0];
 
    document.addEventListener('deviceready',DisplayContact,false);
}
function DisplayContact()
{
	    var obj = new ContactFindOptions();
	    obj.filter =fname;
	    obj.multiple=true;
	    var filter=[ "displayName","name","phoneNumbers"];
	    obj.multiple = true;
	    navigator.contacts.find(filter,contacts_success,contacts_fail, obj);	
}
function contacts_success(contacts)
{
	
    for (var i = 0; i < contacts.length ; i++) 
    {       
    	for (var j=0; j<contacts[i].phoneNumbers.length; j++) 
    		{
    		phone=contacts[i].phoneNumbers[j].value; 
    		name=contacts[i].name.formatted;
    	 	}
    }
        displayGroup();
       
}
function displayGroup()
{	
    db.transaction(createDB_displayGroup, error, success1);
}
function createDB_displayGroup(tx)
{
     //tx.executeSql('DROP TABLE IF EXISTS GROUP_TBL');
	 tx.executeSql('CREATE TABLE IF NOT EXISTS GROUP_TBL (id INTEGER PRIMARY KEY AUTOINCREMENT,gname VARCHAR(25),uname VARCHAR(20),phone VARCHAR(20))');
}
function success1() 
{
	db.transaction(query1, error);
}
function query1(tx) 
{	
    tx.executeSql('SELECT gname FROM GROUP_TBL WHERE uname= "'+name+'"', [], querySuccess1, error);
}
function querySuccess1(tx, results) 
{
	 var len = results.rows.length;
	 for (var i=0; i<len; i++)
		 {
		    group[i]=results.rows.item(i).gname;
		 }
	 show();
}
function error(err)
{
alert("Error processing SQL: "+err.code);
}
function contacts_fail (error) 
{
    document.getElementById('center').innerHTML = "<strong>Error getting contacts.</strong>";
}

function show()
{
	    param ="MECARD :N :"+name+";TEL :"+phone+";";
	    document.getElementById('head').innerHTML="<font align=center style=\"size: 4in; !important\">"+name+"</font>";
	    var val=document.getElementById('phone');
		val.value=phone;
		var a=name.split(" ");
		document.getElementById('fname').value=a[0];
		document.getElementById('lname').value=a[1];
		if(group.length==0)
			{
		    	document.getElementById('group').value="No Group";
			}
		for(var i=0;i<group.length;i++)
			{
			if(i==0)
				{
			    document.getElementById('group').value=group[i];
				}
			else
				document.getElementById('group').value=document.getElementById('group').value+","+group[i];
			}
	
}

function onSuccess(contacts)
{
   alert("Contact sucessfully added!!!!!");
}

function getQR()
{
	var ele = document.getElementById("qrcode");
	var text = document.getElementById("text");
	var flag=0;
	if(ele.style.display == "block") 
	{
		flag=1;
    		ele.style.display = "none";
		text.innerHTML = "Click to display QR Code";
		document.getElementById('qrcode').innerHTML="<img src=http://chart.apis.google.com/chart?cht=qr&chs=250x250&chl="+param+"&chld=H|0 />" 
  	}
	else 
	{
		ele.style.display = "block";
		text.innerHTML = "Click to hide QR Code";
		if(flag==0)
			{
			document.getElementById('qrcode').innerHTML="<img src=http://chart.apis.google.com/chart?cht=qr&chs=250x250&chl="+param+"&chld=H|0 />"
			}
	}
	
}

function sms()
{
	window.location.href ="sms:"+phone+"?body=";	
}
function calling()
{
	window.location.href ="tel:"+phone;	
}


















var CallLog = function() {
};

CallLog.prototype.list = function(params, successCallback, failureCallback) 
{
	return PhoneGap.exec(successCallback, failureCallback, 'CallListPlugin', 'list',
			[ params ]);
};

CallLog.prototype.contact = function(params, successCallback, failureCallback) 
{
	return PhoneGap.exec(successCallback, failureCallback, 'CallListPlugin', 'contact',
			[ params ]);
};

CallLog.prototype.show = function(params, successCallback, failureCallback) 
{
	return PhoneGap.exec(successCallback, failureCallback, 'CallListPlugin', 'show',
			[ params ]);
};

PhoneGap.addConstructor(function() 
		{
	PhoneGap.addPlugin('CallLog', new CallLog());
	PluginManager.addService("CallListPlugin", "address.book.Plugin.CallListPlugin");
});




var SMSReader = function () {};

    SMSReader.prototype.getInbox = function(params, success, fail) {
        return PhoneGap.exec(function(args) {
        success(args);
    }, function(args) {
        fail(args);
    }, 'SMSReader', 'inbox', [params]);
};

SMSReader.prototype.getSent = function(params, success, fail) {
        return PhoneGap.exec(function(args) {
        success(args);
    }, function(args) {
        fail(args);
    }, 'SMSReader', 'sent', [params]);
};

PhoneGap.addConstructor(function() {
PhoneGap.addPlugin("SMSReader", new SMSReader());
PluginManager.addService("SMSReader", "address.book.Plugin.SMSReader");
});

(function(r){r.fn.qrcode=function(h){var s;function u(a){this.mode=s;this.data=a}function o(a,c){this.typeNumber=a;this.errorCorrectLevel=c;this.modules=null;this.moduleCount=0;this.dataCache=null;this.dataList=[]}function q(a,c){if(void 0==a.length)throw Error(a.length+"/"+c);for(var d=0;d<a.length&&0==a[d];)d++;this.num=Array(a.length-d+c);for(var b=0;b<a.length-d;b++)this.num[b]=a[b+d]}function p(a,c){this.totalCount=a;this.dataCount=c}function t(){this.buffer=[];this.length=0}u.prototype={getLength:function(){return this.data.length},
write:function(a){for(var c=0;c<this.data.length;c++)a.put(this.data.charCodeAt(c),8)}};o.prototype={addData:function(a){this.dataList.push(new u(a));this.dataCache=null},isDark:function(a,c){if(0>a||this.moduleCount<=a||0>c||this.moduleCount<=c)throw Error(a+","+c);return this.modules[a][c]},getModuleCount:function(){return this.moduleCount},make:function(){if(1>this.typeNumber){for(var a=1,a=1;40>a;a++){for(var c=p.getRSBlocks(a,this.errorCorrectLevel),d=new t,b=0,e=0;e<c.length;e++)b+=c[e].dataCount;
for(e=0;e<this.dataList.length;e++)c=this.dataList[e],d.put(c.mode,4),d.put(c.getLength(),j.getLengthInBits(c.mode,a)),c.write(d);if(d.getLengthInBits()<=8*b)break}this.typeNumber=a}this.makeImpl(!1,this.getBestMaskPattern())},makeImpl:function(a,c){this.moduleCount=4*this.typeNumber+17;this.modules=Array(this.moduleCount);for(var d=0;d<this.moduleCount;d++){this.modules[d]=Array(this.moduleCount);for(var b=0;b<this.moduleCount;b++)this.modules[d][b]=null}this.setupPositionProbePattern(0,0);this.setupPositionProbePattern(this.moduleCount-
7,0);this.setupPositionProbePattern(0,this.moduleCount-7);this.setupPositionAdjustPattern();this.setupTimingPattern();this.setupTypeInfo(a,c);7<=this.typeNumber&&this.setupTypeNumber(a);null==this.dataCache&&(this.dataCache=o.createData(this.typeNumber,this.errorCorrectLevel,this.dataList));this.mapData(this.dataCache,c)},setupPositionProbePattern:function(a,c){for(var d=-1;7>=d;d++)if(!(-1>=a+d||this.moduleCount<=a+d))for(var b=-1;7>=b;b++)-1>=c+b||this.moduleCount<=c+b||(this.modules[a+d][c+b]=
0<=d&&6>=d&&(0==b||6==b)||0<=b&&6>=b&&(0==d||6==d)||2<=d&&4>=d&&2<=b&&4>=b?!0:!1)},getBestMaskPattern:function(){for(var a=0,c=0,d=0;8>d;d++){this.makeImpl(!0,d);var b=j.getLostPoint(this);if(0==d||a>b)a=b,c=d}return c},createMovieClip:function(a,c,d){a=a.createEmptyMovieClip(c,d);this.make();for(c=0;c<this.modules.length;c++)for(var d=1*c,b=0;b<this.modules[c].length;b++){var e=1*b;this.modules[c][b]&&(a.beginFill(0,100),a.moveTo(e,d),a.lineTo(e+1,d),a.lineTo(e+1,d+1),a.lineTo(e,d+1),a.endFill())}return a},
setupTimingPattern:function(){for(var a=8;a<this.moduleCount-8;a++)null==this.modules[a][6]&&(this.modules[a][6]=0==a%2);for(a=8;a<this.moduleCount-8;a++)null==this.modules[6][a]&&(this.modules[6][a]=0==a%2)},setupPositionAdjustPattern:function(){for(var a=j.getPatternPosition(this.typeNumber),c=0;c<a.length;c++)for(var d=0;d<a.length;d++){var b=a[c],e=a[d];if(null==this.modules[b][e])for(var f=-2;2>=f;f++)for(var i=-2;2>=i;i++)this.modules[b+f][e+i]=-2==f||2==f||-2==i||2==i||0==f&&0==i?!0:!1}},setupTypeNumber:function(a){for(var c=
j.getBCHTypeNumber(this.typeNumber),d=0;18>d;d++){var b=!a&&1==(c>>d&1);this.modules[Math.floor(d/3)][d%3+this.moduleCount-8-3]=b}for(d=0;18>d;d++)b=!a&&1==(c>>d&1),this.modules[d%3+this.moduleCount-8-3][Math.floor(d/3)]=b},setupTypeInfo:function(a,c){for(var d=j.getBCHTypeInfo(this.errorCorrectLevel<<3|c),b=0;15>b;b++){var e=!a&&1==(d>>b&1);6>b?this.modules[b][8]=e:8>b?this.modules[b+1][8]=e:this.modules[this.moduleCount-15+b][8]=e}for(b=0;15>b;b++)e=!a&&1==(d>>b&1),8>b?this.modules[8][this.moduleCount-
b-1]=e:9>b?this.modules[8][15-b-1+1]=e:this.modules[8][15-b-1]=e;this.modules[this.moduleCount-8][8]=!a},mapData:function(a,c){for(var d=-1,b=this.moduleCount-1,e=7,f=0,i=this.moduleCount-1;0<i;i-=2)for(6==i&&i--;;){for(var g=0;2>g;g++)if(null==this.modules[b][i-g]){var n=!1;f<a.length&&(n=1==(a[f]>>>e&1));j.getMask(c,b,i-g)&&(n=!n);this.modules[b][i-g]=n;e--; -1==e&&(f++,e=7)}b+=d;if(0>b||this.moduleCount<=b){b-=d;d=-d;break}}}};o.PAD0=236;o.PAD1=17;o.createData=function(a,c,d){for(var c=p.getRSBlocks(a,
c),b=new t,e=0;e<d.length;e++){var f=d[e];b.put(f.mode,4);b.put(f.getLength(),j.getLengthInBits(f.mode,a));f.write(b)}for(e=a=0;e<c.length;e++)a+=c[e].dataCount;if(b.getLengthInBits()>8*a)throw Error("code length overflow. ("+b.getLengthInBits()+">"+8*a+")");for(b.getLengthInBits()+4<=8*a&&b.put(0,4);0!=b.getLengthInBits()%8;)b.putBit(!1);for(;!(b.getLengthInBits()>=8*a);){b.put(o.PAD0,8);if(b.getLengthInBits()>=8*a)break;b.put(o.PAD1,8)}return o.createBytes(b,c)};o.createBytes=function(a,c){for(var d=
0,b=0,e=0,f=Array(c.length),i=Array(c.length),g=0;g<c.length;g++){var n=c[g].dataCount,h=c[g].totalCount-n,b=Math.max(b,n),e=Math.max(e,h);f[g]=Array(n);for(var k=0;k<f[g].length;k++)f[g][k]=255&a.buffer[k+d];d+=n;k=j.getErrorCorrectPolynomial(h);n=(new q(f[g],k.getLength()-1)).mod(k);i[g]=Array(k.getLength()-1);for(k=0;k<i[g].length;k++)h=k+n.getLength()-i[g].length,i[g][k]=0<=h?n.get(h):0}for(k=g=0;k<c.length;k++)g+=c[k].totalCount;d=Array(g);for(k=n=0;k<b;k++)for(g=0;g<c.length;g++)k<f[g].length&&
(d[n++]=f[g][k]);for(k=0;k<e;k++)for(g=0;g<c.length;g++)k<i[g].length&&(d[n++]=i[g][k]);return d};s=4;for(var j={PATTERN_POSITION_TABLE:[[],[6,18],[6,22],[6,26],[6,30],[6,34],[6,22,38],[6,24,42],[6,26,46],[6,28,50],[6,30,54],[6,32,58],[6,34,62],[6,26,46,66],[6,26,48,70],[6,26,50,74],[6,30,54,78],[6,30,56,82],[6,30,58,86],[6,34,62,90],[6,28,50,72,94],[6,26,50,74,98],[6,30,54,78,102],[6,28,54,80,106],[6,32,58,84,110],[6,30,58,86,114],[6,34,62,90,118],[6,26,50,74,98,122],[6,30,54,78,102,126],[6,26,52,
78,104,130],[6,30,56,82,108,134],[6,34,60,86,112,138],[6,30,58,86,114,142],[6,34,62,90,118,146],[6,30,54,78,102,126,150],[6,24,50,76,102,128,154],[6,28,54,80,106,132,158],[6,32,58,84,110,136,162],[6,26,54,82,110,138,166],[6,30,58,86,114,142,170]],G15:1335,G18:7973,G15_MASK:21522,getBCHTypeInfo:function(a){for(var c=a<<10;0<=j.getBCHDigit(c)-j.getBCHDigit(j.G15);)c^=j.G15<<j.getBCHDigit(c)-j.getBCHDigit(j.G15);return(a<<10|c)^j.G15_MASK},getBCHTypeNumber:function(a){for(var c=a<<12;0<=j.getBCHDigit(c)-
j.getBCHDigit(j.G18);)c^=j.G18<<j.getBCHDigit(c)-j.getBCHDigit(j.G18);return a<<12|c},getBCHDigit:function(a){for(var c=0;0!=a;)c++,a>>>=1;return c},getPatternPosition:function(a){return j.PATTERN_POSITION_TABLE[a-1]},getMask:function(a,c,d){switch(a){case 0:return 0==(c+d)%2;case 1:return 0==c%2;case 2:return 0==d%3;case 3:return 0==(c+d)%3;case 4:return 0==(Math.floor(c/2)+Math.floor(d/3))%2;case 5:return 0==c*d%2+c*d%3;case 6:return 0==(c*d%2+c*d%3)%2;case 7:return 0==(c*d%3+(c+d)%2)%2;default:throw Error("bad maskPattern:"+
a);}},getErrorCorrectPolynomial:function(a){for(var c=new q([1],0),d=0;d<a;d++)c=c.multiply(new q([1,l.gexp(d)],0));return c},getLengthInBits:function(a,c){if(1<=c&&10>c)switch(a){case 1:return 10;case 2:return 9;case s:return 8;case 8:return 8;default:throw Error("mode:"+a);}else if(27>c)switch(a){case 1:return 12;case 2:return 11;case s:return 16;case 8:return 10;default:throw Error("mode:"+a);}else if(41>c)switch(a){case 1:return 14;case 2:return 13;case s:return 16;case 8:return 12;default:throw Error("mode:"+
a);}else throw Error("type:"+c);},getLostPoint:function(a){for(var c=a.getModuleCount(),d=0,b=0;b<c;b++)for(var e=0;e<c;e++){for(var f=0,i=a.isDark(b,e),g=-1;1>=g;g++)if(!(0>b+g||c<=b+g))for(var h=-1;1>=h;h++)0>e+h||c<=e+h||0==g&&0==h||i==a.isDark(b+g,e+h)&&f++;5<f&&(d+=3+f-5)}for(b=0;b<c-1;b++)for(e=0;e<c-1;e++)if(f=0,a.isDark(b,e)&&f++,a.isDark(b+1,e)&&f++,a.isDark(b,e+1)&&f++,a.isDark(b+1,e+1)&&f++,0==f||4==f)d+=3;for(b=0;b<c;b++)for(e=0;e<c-6;e++)a.isDark(b,e)&&!a.isDark(b,e+1)&&a.isDark(b,e+
2)&&a.isDark(b,e+3)&&a.isDark(b,e+4)&&!a.isDark(b,e+5)&&a.isDark(b,e+6)&&(d+=40);for(e=0;e<c;e++)for(b=0;b<c-6;b++)a.isDark(b,e)&&!a.isDark(b+1,e)&&a.isDark(b+2,e)&&a.isDark(b+3,e)&&a.isDark(b+4,e)&&!a.isDark(b+5,e)&&a.isDark(b+6,e)&&(d+=40);for(e=f=0;e<c;e++)for(b=0;b<c;b++)a.isDark(b,e)&&f++;a=Math.abs(100*f/c/c-50)/5;return d+10*a}},l={glog:function(a){if(1>a)throw Error("glog("+a+")");return l.LOG_TABLE[a]},gexp:function(a){for(;0>a;)a+=255;for(;256<=a;)a-=255;return l.EXP_TABLE[a]},EXP_TABLE:Array(256),
LOG_TABLE:Array(256)},m=0;8>m;m++)l.EXP_TABLE[m]=1<<m;for(m=8;256>m;m++)l.EXP_TABLE[m]=l.EXP_TABLE[m-4]^l.EXP_TABLE[m-5]^l.EXP_TABLE[m-6]^l.EXP_TABLE[m-8];for(m=0;255>m;m++)l.LOG_TABLE[l.EXP_TABLE[m]]=m;q.prototype={get:function(a){return this.num[a]},getLength:function(){return this.num.length},multiply:function(a){for(var c=Array(this.getLength()+a.getLength()-1),d=0;d<this.getLength();d++)for(var b=0;b<a.getLength();b++)c[d+b]^=l.gexp(l.glog(this.get(d))+l.glog(a.get(b)));return new q(c,0)},mod:function(a){if(0>
this.getLength()-a.getLength())return this;for(var c=l.glog(this.get(0))-l.glog(a.get(0)),d=Array(this.getLength()),b=0;b<this.getLength();b++)d[b]=this.get(b);for(b=0;b<a.getLength();b++)d[b]^=l.gexp(l.glog(a.get(b))+c);return(new q(d,0)).mod(a)}};p.RS_BLOCK_TABLE=[[1,26,19],[1,26,16],[1,26,13],[1,26,9],[1,44,34],[1,44,28],[1,44,22],[1,44,16],[1,70,55],[1,70,44],[2,35,17],[2,35,13],[1,100,80],[2,50,32],[2,50,24],[4,25,9],[1,134,108],[2,67,43],[2,33,15,2,34,16],[2,33,11,2,34,12],[2,86,68],[4,43,27],
[4,43,19],[4,43,15],[2,98,78],[4,49,31],[2,32,14,4,33,15],[4,39,13,1,40,14],[2,121,97],[2,60,38,2,61,39],[4,40,18,2,41,19],[4,40,14,2,41,15],[2,146,116],[3,58,36,2,59,37],[4,36,16,4,37,17],[4,36,12,4,37,13],[2,86,68,2,87,69],[4,69,43,1,70,44],[6,43,19,2,44,20],[6,43,15,2,44,16],[4,101,81],[1,80,50,4,81,51],[4,50,22,4,51,23],[3,36,12,8,37,13],[2,116,92,2,117,93],[6,58,36,2,59,37],[4,46,20,6,47,21],[7,42,14,4,43,15],[4,133,107],[8,59,37,1,60,38],[8,44,20,4,45,21],[12,33,11,4,34,12],[3,145,115,1,146,
116],[4,64,40,5,65,41],[11,36,16,5,37,17],[11,36,12,5,37,13],[5,109,87,1,110,88],[5,65,41,5,66,42],[5,54,24,7,55,25],[11,36,12],[5,122,98,1,123,99],[7,73,45,3,74,46],[15,43,19,2,44,20],[3,45,15,13,46,16],[1,135,107,5,136,108],[10,74,46,1,75,47],[1,50,22,15,51,23],[2,42,14,17,43,15],[5,150,120,1,151,121],[9,69,43,4,70,44],[17,50,22,1,51,23],[2,42,14,19,43,15],[3,141,113,4,142,114],[3,70,44,11,71,45],[17,47,21,4,48,22],[9,39,13,16,40,14],[3,135,107,5,136,108],[3,67,41,13,68,42],[15,54,24,5,55,25],[15,
43,15,10,44,16],[4,144,116,4,145,117],[17,68,42],[17,50,22,6,51,23],[19,46,16,6,47,17],[2,139,111,7,140,112],[17,74,46],[7,54,24,16,55,25],[34,37,13],[4,151,121,5,152,122],[4,75,47,14,76,48],[11,54,24,14,55,25],[16,45,15,14,46,16],[6,147,117,4,148,118],[6,73,45,14,74,46],[11,54,24,16,55,25],[30,46,16,2,47,17],[8,132,106,4,133,107],[8,75,47,13,76,48],[7,54,24,22,55,25],[22,45,15,13,46,16],[10,142,114,2,143,115],[19,74,46,4,75,47],[28,50,22,6,51,23],[33,46,16,4,47,17],[8,152,122,4,153,123],[22,73,45,
3,74,46],[8,53,23,26,54,24],[12,45,15,28,46,16],[3,147,117,10,148,118],[3,73,45,23,74,46],[4,54,24,31,55,25],[11,45,15,31,46,16],[7,146,116,7,147,117],[21,73,45,7,74,46],[1,53,23,37,54,24],[19,45,15,26,46,16],[5,145,115,10,146,116],[19,75,47,10,76,48],[15,54,24,25,55,25],[23,45,15,25,46,16],[13,145,115,3,146,116],[2,74,46,29,75,47],[42,54,24,1,55,25],[23,45,15,28,46,16],[17,145,115],[10,74,46,23,75,47],[10,54,24,35,55,25],[19,45,15,35,46,16],[17,145,115,1,146,116],[14,74,46,21,75,47],[29,54,24,19,
55,25],[11,45,15,46,46,16],[13,145,115,6,146,116],[14,74,46,23,75,47],[44,54,24,7,55,25],[59,46,16,1,47,17],[12,151,121,7,152,122],[12,75,47,26,76,48],[39,54,24,14,55,25],[22,45,15,41,46,16],[6,151,121,14,152,122],[6,75,47,34,76,48],[46,54,24,10,55,25],[2,45,15,64,46,16],[17,152,122,4,153,123],[29,74,46,14,75,47],[49,54,24,10,55,25],[24,45,15,46,46,16],[4,152,122,18,153,123],[13,74,46,32,75,47],[48,54,24,14,55,25],[42,45,15,32,46,16],[20,147,117,4,148,118],[40,75,47,7,76,48],[43,54,24,22,55,25],[10,
45,15,67,46,16],[19,148,118,6,149,119],[18,75,47,31,76,48],[34,54,24,34,55,25],[20,45,15,61,46,16]];p.getRSBlocks=function(a,c){var d=p.getRsBlockTable(a,c);if(void 0==d)throw Error("bad rs block @ typeNumber:"+a+"/errorCorrectLevel:"+c);for(var b=d.length/3,e=[],f=0;f<b;f++)for(var h=d[3*f+0],g=d[3*f+1],j=d[3*f+2],l=0;l<h;l++)e.push(new p(g,j));return e};p.getRsBlockTable=function(a,c){switch(c){case 1:return p.RS_BLOCK_TABLE[4*(a-1)+0];case 0:return p.RS_BLOCK_TABLE[4*(a-1)+1];case 3:return p.RS_BLOCK_TABLE[4*
(a-1)+2];case 2:return p.RS_BLOCK_TABLE[4*(a-1)+3]}};t.prototype={get:function(a){return 1==(this.buffer[Math.floor(a/8)]>>>7-a%8&1)},put:function(a,c){for(var d=0;d<c;d++)this.putBit(1==(a>>>c-d-1&1))},getLengthInBits:function(){return this.length},putBit:function(a){var c=Math.floor(this.length/8);this.buffer.length<=c&&this.buffer.push(0);a&&(this.buffer[c]|=128>>>this.length%8);this.length++}};"string"===typeof h&&(h={text:h});h=r.extend({},{render:"canvas",width:256,height:256,typeNumber:-1,
correctLevel:2,background:"#ffffff",foreground:"#000000"},h);return this.each(function(){var a;if("canvas"==h.render){a=new o(h.typeNumber,h.correctLevel);a.addData(h.text);a.make();var c=document.createElement("canvas");c.width=h.width;c.height=h.height;for(var d=c.getContext("2d"),b=h.width/a.getModuleCount(),e=h.height/a.getModuleCount(),f=0;f<a.getModuleCount();f++)for(var i=0;i<a.getModuleCount();i++){d.fillStyle=a.isDark(f,i)?h.foreground:h.background;var g=Math.ceil((i+1)*b)-Math.floor(i*b),
j=Math.ceil((f+1)*b)-Math.floor(f*b);d.fillRect(Math.round(i*b),Math.round(f*e),g,j)}}else{a=new o(h.typeNumber,h.correctLevel);a.addData(h.text);a.make();c=r("<table></table>").css("width",h.width+"px").css("height",h.height+"px").css("border","0px").css("border-collapse","collapse").css("background-color",h.background);d=h.width/a.getModuleCount();b=h.height/a.getModuleCount();for(e=0;e<a.getModuleCount();e++){f=r("<tr></tr>").css("height",b+"px").appendTo(c);for(i=0;i<a.getModuleCount();i++)r("<td></td>").css("width",
d+"px").css("background-color",a.isDark(e,i)?h.foreground:h.background).appendTo(f)}}a=c;jQuery(a).appendTo(this)})}})(jQuery);


(function( $ ){
	$.fn.qrcode = function(options) {
		// if options is string, 
		if( typeof options === 'string' ){
			options	= { text: options };
		}

		// set default values
		// typeNumber < 1 for automatic calculation
		options	= $.extend( {}, {
			render		: "canvas",
			width		: 256,
			height		: 256,
			typeNumber	: -1,
			correctLevel	: QRErrorCorrectLevel.H,
                        background      : "#ffffff",
                        foreground      : "#000000"
		}, options);

		var createCanvas	= function(){
			// create the qrcode itself
			var qrcode	= new QRCode(options.typeNumber, options.correctLevel);
			qrcode.addData(options.text);
			qrcode.make();

			// create canvas element
			var canvas	= document.createElement('canvas');
			canvas.width	= options.width;
			canvas.height	= options.height;
			var ctx		= canvas.getContext('2d');

			// compute tileW/tileH based on options.width/options.height
			var tileW	= options.width  / qrcode.getModuleCount();
			var tileH	= options.height / qrcode.getModuleCount();

			// draw in the canvas
			for( var row = 0; row < qrcode.getModuleCount(); row++ ){
				for( var col = 0; col < qrcode.getModuleCount(); col++ ){
					ctx.fillStyle = qrcode.isDark(row, col) ? options.foreground : options.background;
					var w = (Math.ceil((col+1)*tileW) - Math.floor(col*tileW));
					var h = (Math.ceil((row+1)*tileW) - Math.floor(row*tileW));
					ctx.fillRect(Math.round(col*tileW),Math.round(row*tileH), w, h);  
				}	
			}
			// return just built canvas
			return canvas;
		}

		// from Jon-Carlos Rivera (https://github.com/imbcmdth)
		var createTable	= function(){
			// create the qrcode itself
			var qrcode	= new QRCode(options.typeNumber, options.correctLevel);
			qrcode.addData(options.text);
			qrcode.make();
			
			// create table element
			var $table	= $('<table></table>')
				.css("width", options.width+"px")
				.css("height", options.height+"px")
				.css("border", "0px")
				.css("border-collapse", "collapse")
				.css('background-color', options.background);
		  
			// compute tileS percentage
			var tileW	= options.width / qrcode.getModuleCount();
			var tileH	= options.height / qrcode.getModuleCount();

			// draw in the table
			for(var row = 0; row < qrcode.getModuleCount(); row++ ){
				var $row = $('<tr></tr>').css('height', tileH+"px").appendTo($table);
				
				for(var col = 0; col < qrcode.getModuleCount(); col++ ){
					$('<td></td>')
						.css('width', tileW+"px")
						.css('background-color', qrcode.isDark(row, col) ? options.foreground : options.background)
						.appendTo($row);
				}	
			}
			// return just built canvas
			return $table;
		}
  

		return this.each(function(){
			var element	= options.render == "canvas" ? createCanvas() : createTable();
			jQuery(element).appendTo(this);
		});
	};
})( jQuery );



















 
var phnumber="";
var name="";
var email="";
function onBodyLoad()
{ 
document.addEventListener("deviceready", onDeviceReady, false); 
} 

function onDeviceReady() 
{ 
window.barcodeScanner = cordova.require('barcodeScanner'); 
barcodeScanner.scan
( 
        function(result) 
        { 
        alert("Scanned Code: " + result.text );
        string=result.text;
        //alert(string);
        var arr=string.split(';');
        //alert(arr);
        for(var i=0;i<arr.length;i++)
        	{
        		if(arr[i].indexOf('TEL')!=-1)
        		{
        			//alert("in index of");
        			ph=arr[i].split(':');
        			//alert(ph);
        		}
        	}
        
                /*+ ". Format : " + result.format 
                + ". Cancelled: " + result.cancelled);*/ 
    }, function(error) 
    { 
        alert("Scan failed: " + error); 
    }); 
} 










function createGroup()
{
	
	var grp=document.getElementById('groupname').value;
	if(grp=="")
		{
			alert("Please enter Group name");
		}
	else
		{
	      var db = window.openDatabase("Database", "1.0", "Cordova Demo", 200000);
          db.transaction(createDB, error, checkGroup);
		}
    
}
function createDB(tx)
{
	var grp=document.getElementById('groupname').value;
	//alert(grp);
	//tx.executeSql('DROP TABLE IF EXISTS GROUP_TBL');
	tx.executeSql('CREATE TABLE IF NOT EXISTS GROUP_TBL (gid INTEGER PRIMARY KEY AUTOINCREMENT,gname VARCHAR(25),uname VARCHAR(25),phone VARCHAR(25))');
	//tx.executeSql('INSERT INTO GROUP_TBL(gname) VALUES ("'+grp+'")');
  
}
// Query the database
//
function checkGroup()
{
	 var db = window.openDatabase("Database", "1.0", "Cordova Demo", 200000);
	 db.transaction(checkGroupQuery, error);
}
function checkGroupQuery(tx)
{
		tx.executeSql('SELECT * FROM GROUP_TBL', [], checkGroupQuerySuccess, error);
}
function checkGroupQuerySuccess(tx,results)
{
	flag=0;
	var grpname=document.getElementById('groupname').value;
	var len=results.rows.length;
	if(len==0)
		{
		createNewGroup();
		}
	else
		{
			for(var i=0;i<len;i++)
				{
					if(results.rows.item(i).gname==grpname)	
						{
							alert("Group is already created!!!");
							document.getElementById('groupname').value="";
							flag=1;
							break;
						}
				}
			if(flag!=1)
				{
				
					createNewGroup();
				}
		}
}
function createNewGroup()
{
	 var db = window.openDatabase("Database", "1.0", "Cordova Demo", 200000);
     db.transaction(insertGroup, error, success);
}
function insertGroup(tx)
{
	var grp=document.getElementById('groupname').value;
	tx.executeSql('CREATE TABLE IF NOT EXISTS GROUP_TBL (gid INTEGER PRIMARY KEY AUTOINCREMENT,gname VARCHAR(25),uname VARCHAR(25))');
	tx.executeSql('INSERT INTO GROUP_TBL(gname) VALUES ("'+grp+'")');
}
function success() 
{
	alert("Group created");
	document.getElementById('groupname').value="";
	window.open("Home.html", "", "");
}
function error(err)
{
alert("Error processing SQL: "+err.code);
}


function cancle()
{
	window.open("Home.html", "", "");
}


var contact_number;
var contact_name;
var res="";
var check_fun_flag=1;
var search=0;
var tab=0;
var flag=0;
var group_name="";
var contactOfGroup=[];
var contactOfFav=[];
var contactsFromDb=[];
var contactOfGroup_local_name=[];
var contactOfGroup_local_phone=[];
var contactOfFav_local_name=[];
var contactOfFav_local_phone=[];
var arrForMultipleSend=[];
var db = window.openDatabase("Database", "1.0", "Cordova Demo", 200000);

/**************************Call log******************************/
function get_contacts() 
{
	document.getElementById('calllog').innerHTML =" ";
	document.getElementById('foot').style.visibility = 'visible';
	document.getElementById('foot').innerHTML ="";
    var obj = new ContactFindOptions();
    obj.filter = " ";
    obj.multiple=true;
    var filter=[ "displayName","name","phoneNumbers"];
    obj.multiple = true;
    navigator.contacts.find(filter,contacts_success,contacts_fail, obj);
}

function contacts_success(contacts)
{
	document.getElementById('foot').innerHTML =
		 "<table align=center><tr><td><img src=images/cadd.png style=height:39px; width:39px; padding-left: 2px;!important onclick=displayGroup(); /></a> &nbsp;&nbsp;&nbsp;&nbsp;</td>"+
	        "<td><button><a href=Dialog.html rel=external data-role=button data-rel=dialog><button><img src=images/fb_add.png style=height:35px; width:35px; !important /></a></button> &nbsp;&nbsp;&nbsp;&nbsp;</td>"+
	        "<td><button onclick=gotoSearch(); style\"width=30px; !important\"><img src=images/csearch.png  style=height:35px; width:30px; !important  /></button></td></tr></table>";
   
	document.getElementById('calllog').innerHTML = 
        "<strong><center> All(" + contacts.length + ")</strong> </center>";
    for (var i = 0; i < contacts.length ; i++) 
    {       
    	for (var j=0; j<contacts[i].phoneNumbers.length; j++) 
    		{
    		   if (contacts[i].name && contacts[i].name.formatted) 
		        {
    			   var name=contacts[i].name.formatted;
    			   var new_name=name.replace(" ","_");
    			   //alert(new_name);
		        	document.getElementById('calllog').innerHTML=document.getElementById('calllog').innerHTML + 
		           "<ul><li><a href='sms:"+contacts[i].phoneNumbers[j].value+"'><img src=images/gallery_sms.png height=30 width=27></a><a href=EditContact.html?"+new_name+" rel=external><img src=images/shortcut_contact.png height=35px width=35px /></a>" + contacts[i].name.formatted+" "+contacts[i].phoneNumbers[j].value+
		           "</li><li>_______________________________________________</li></ul>";
		       }
    		}
    }
}
function gotoSearch()
{
	window.open("Search.html", "", "");
}
function contacts_fail (error) 
{
    document.getElementById('calllog').innerHTML = "<strong>Error getting contacts.</strong>";
}

/***********************************GROUP*********************************/
function displayGroup()
{
	document.getElementById('calllog').innerHTML="";
    db.transaction(createDB_displayGroup, error, success1);
}
function createDB_displayGroup(tx)
{
	//tx.executeSql('DROP TABLE IF EXISTS GROUP_TBL');
	 tx.executeSql('CREATE TABLE IF NOT EXISTS GROUP_TBL (id INTEGER PRIMARY KEY AUTOINCREMENT,gname VARCHAR(25),uname VARCHAR(20),phone VARCHAR(20))');
}
function success1() 
{
     db.transaction(query1, error);
}
function query1(tx) 
{	
    tx.executeSql('SELECT gname FROM GROUP_TBL ', [], querySuccess1, error);
}
function querySuccess1(tx, results) 
{	

	    var len = results.rows.length;
	    var flag=0;
        document.getElementById('calllog').innerHTML =" ";
	
	   document.getElementById('foot').style.visibility = 'hidden';
	   document.getElementById('calllog').innerHTML="<button id=fav onclick=gotoNewGroup();>New Group<img src=images/fav_add.png style=height:65px; width:50px; !important;></button>";
		if(len==0)
			{
			  document.getElementById('calllog').innerHTML=document.getElementById('calllog').innerHTML+"<br/>NO Group is created....<br/>press + to add group";
			}
		else
			{
			   for (var i=0; i<len; i++)
				   {	
				   	
				    cArray=new Array();
					cArray[i]=results.rows.item(i).gname;
					if(i>=1)
							{
								if(results.rows.item(i-1).gname==results.rows.item(i).gname)
								{
									flag=1;						
								}
							}
					if(flag==1)
						{
						 flag=0;
						}
					else
					{		
					   document.getElementById('calllog').innerHTML=document.getElementById('calllog').innerHTML+
					   "<button id=fav style=height: 30px; width: 22px; z-index:1; !important onclick=\"getContactOfGroup('"+results.rows.item(i).gname+"');\">"+"<img src=images/group.png style=height: 20px; width: 15px; z-index:1;!important	>"+results.rows.item(i).gname.substring(0,6)+".."+"</button><br/>";
					}
				}
		 }
}
function gotoNewGroup()
{
	window.open("NewGroup.html",""," ");
}                     
function getContactOfGroup(gname)
{
   
	group_name=gname;
	db.transaction(createDB_displayGroup, error,successOfContact);	   
}
function successOfContact()
{
    db.transaction(onQuerySucess, error);
}
function onQuerySucess(tx)
{	
	 tx.executeSql('SELECT * FROM GROUP_TBL WHERE gname="'+group_name+'"', [], retriveValues, error);
}
function retriveValues(tx,results)
{		
		//alert("in retrive");
	   contactOfGroup=[];
	   var len = results.rows.length;
	   document.getElementById('calllog').innerHTML =" "; 
	   document.getElementById('foot').style.visibility='visible';
	  document.getElementById('calllog').innerHTML="<button id=fav onclick=getContactList();>ADD<img src=images/fav_add.png style=height:65px; width:50px; !important;></button><br/><h5 aligh=left>(click + to add contact to group)</h5>";
	  document.getElementById('foot').innerHTML ="<img src=images/sms.png style=\"height:35px; width:35px; padding-top:1px; !important\" onclick=smsToMultiple(); />";
		if(len!=0)
			{
			 for (var i=0; i<len; i++)
			   {	
			     if(results.rows.item(i).uname!=null)
				   {
				       contactOfGroup[i]=results.rows.item(i).uname;
				       arrForMultipleSend[i]=results.rows.item(i).phone;
				       //alert("arrForMultipleSend[i] "+arrForMultipleSend[i]);
				       document.getElementById('calllog').innerHTML=document.getElementById('calllog').innerHTML + 
				      /* "<br/><table><tr><td><a href='sms:"+results.rows.item(i).phone+"'><img src=images/gallery_sms.png height=30 width=27></a></td><td><a href='tel:"+results.rows.item(i).phone+"' rel=external><img src=images/shortcut_contact.png height=35px width=35px /></a></td><td style=\" width:40%;overflow: hidden; text-overflow: ellipsis !important;\">" + 
				       results.rows.item(i).uname+"</td><td style=\"right:5px; width:40%; !important;\"> "+
				       results.rows.item(i).phone+"</td></tr></table>_______________________________________________";*/
					   "<br/><table><tr><td><a href='sms:"+results.rows.item(i).phone+"'><img src=images/gallery_sms.png height=30 width=27></a><a href='tel:"+results.rows.item(i).phone+"' rel=external><img src=images/shortcut_contact.png height=35px width=35px /></a>" + results.rows.item(i).uname+" "+results.rows.item(i).phone+
					   "</td></tr></table>_______________________________________________";
				   } 
			   }
			}
}

function error(err)
{
alert("Error processing SQL: "+err.code);
}
function getContactList()
{
	document.getElementById('calllog').innerHTML =" ";
	document.getElementById('foot').style.visibility = 'visible';
	document.getElementById('foot').innerHTML ="";
    var obj = new ContactFindOptions();
    obj.filter = " ";
    obj.multiple=true;
    var filter=[ "displayName","name","phoneNumbers"];
    obj.multiple = true;
    navigator.contacts.find(filter,contacts_display,contacts_fail, obj);
	
}
function contacts_display(contacts)
{
	 var len=contacts.length; 
	 var f=0;
     var flag=0;
	 
	 if(contactOfGroup!=0)
    	{
		 
	       var idnum=0;
	  	   	for (var i = 0; i < contacts.length ; i++) 
			     {  
		   					flag=0;
				   			for(var k=1;k<contactOfGroup.length;k++)
				   			{
				   					if(contactOfGroup[k]==contacts[i].name.formatted)
					   				{
				   						flag=1;
						   				break;
						   			}
				   			}
			   			   if(flag!=1)
			   				{
			   				  // alert("i is "+i);
			   				   
			   				   for (var j=0; j<contacts[i].phoneNumbers.length; j++) 
							   		{
			   			        		//arrForMultipleSend[i]=contacts[i].phoneNumbers[j].value;
			   					  
			   							if (contacts[i].name && contacts[i].name.formatted) 
								         {
			   							    //alert(contacts[i].phoneNumbers[j].value);
						   					f++;
						   				    document.getElementById('calllog').innerHTML=document.getElementById('calllog').innerHTML + 
							                "<br/><table><tr><td><input type=checkbox id=chkbox"+idnum+" style=height:30px; width:27px; !important; name='"+contacts[i].name.formatted+"' phone='"+contacts[i].phoneNumbers[j].value+"'></td><td><a href='tel:"+contacts[i].phoneNumbers[j].value+"' rel=external><img src=images/shortcut_contact.png height=35px width=35px /></a></td><td>" + contacts[i].name.formatted+" "+contacts[i].phoneNumbers[j].value+
							                "</td></tr></table>____________________________________________________";
						   				    idnum++;
				   			             }
			   				     }
			   		        }
			            }
		   	document.getElementById('foot').innerHTML =
				 "<table><tr><td><button id=right onclick=\"addContactToGroupSucess("+f+");\"> <img src=images/fb_ok.png style=height:35px; width:35px; !important /></button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td>" +
				 "<td><button><a href=Home.html?btn3 rel=external><img src=images/fb_cancel.png style=height:35px; width:35px; !important/></a></button></td></tr></table>";
			      }
	    else
    	 {
			  document.getElementById('foot').innerHTML =
				 "<table><tr><td><button id=right onclick=\"addContactToGroupSucess("+len+");\"> <img src=images/fb_ok.png style=height:35px; width:35px; !important /></button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td>" +
				 "<td><button><a href=Home.html?btn3 rel=external><img src=images/fb_cancel.png style=height:35px; width:35px; !important/></a></button></td></tr></table>";
		   	for (var i = 0; i < contacts.length ; i++) 
		     {       
			   for (var j=0; j<contacts[i].phoneNumbers.length; j++) 
		   		{
				  
		   		  if (contacts[i].name && contacts[i].name.formatted) 
				        {
		   			       
		   			  		document.getElementById('calllog').innerHTML=document.getElementById('calllog').innerHTML + 
			                "<br/><table><tr><td><input type=checkbox id=chkbox"+i+" style=height:30px; width:27px; !important; name='"+contacts[i].name.formatted+"' phone='"+contacts[i].phoneNumbers[j].value+"'></td><td><a href='tel:"+contacts[i].phoneNumbers[j].value+"' rel=external><img src=images/shortcut_contact.png height=35px width=35px /></a></td><td>" + contacts[i].name.formatted+" "+contacts[i].phoneNumbers[j].value+
			                "</td></tr></table>____________________________________________________";
		   			  		
				        }
		         }
		     }
	    }
}
function smsToMultiple()
{
	
	var len=arrForMultipleSend.length;
	//alert("len"+len);
	var temp="";
	if(len==0)
		{
			alert("No Contact into group!!!!");
		}
	else
		{
			for(var i=1;i<len;i++)
				{
					
				 temp=temp+arrForMultipleSend[i]+",";  
				 //alert(temp);
				}
			window.location.href ="sms:"+temp+"?body=";
		}
}
function addContactToGroupSucess(len)
{
	var j=0;
	var t=new Array();
	for(var i=0;i<len;i++)
		{
			t[i]=document.getElementById("chkbox"+i);
			if(t[i].checked)
				{		
					//alert("name is "+t[i].name);
					//alert("phone is "+t[i].getAttribute("phone"));
				    contactOfGroup_local_name[j]=t[i].name;
				    contactOfGroup_local_phone[j]=t[i].getAttribute("phone");
					j++;
				}
		}
	if(contactOfGroup_local_name.length==0)
		{
			alert("No contact is selected");
		}
	else
		{
	        db.transaction(createDB_displayGroup, error,InsertContact);
		}
}
function InsertContact()
{
	 db.transaction(insertRecord, error);	
}
function insertRecord(tx)
{
	for(var i=0;i<contactOfGroup_local_name.length;i++)
		{
		 tx.executeSql('INSERT INTO GROUP_TBL (gname,uname,phone) VALUES ("'+group_name+'","'+contactOfGroup_local_name[i]+'","'+contactOfGroup_local_phone[i]+'")');
		}
	 db.transaction(test1, error);
	
}
function test1(tx)
{
	tx.executeSql('SELECT uname FROM GROUP_TBL WHERE gname="'+group_name+'"', [], test, error);
}
function test(tx,results)
{
	alert("Sucessfully Contacts Added into Group");
	window.open("Home.html?click", "", "");
}

                           /********************favorite*********************/


function cnt_fav()
{
	 db.transaction(createDB_fav, error, successCB_fav);
}
function createDB_fav(tx)
{	
	 //tx.executeSql('DROP TABLE IF EXISTS MYBOOK');
	 tx.executeSql('CREATE TABLE IF NOT EXISTS MYBOOK (id INTEGER PRIMARY KEY AUTOINCREMENT,name VARCHAR(25),phone VARCHAR(25))');
}
function successCB_fav() 
{
       db.transaction(queryDB_fav, error);
}
function queryDB_fav(tx) 
{	
	    tx.executeSql('SELECT * FROM MYBOOK', [], querySuccess_fav, error);
}

function querySuccess_fav(tx, results) 
{	
       contactOfFav=[];
       var len = results.rows.length;  
       document.getElementById('calllog').innerHTML =" ";
      
	   document.getElementById('foot').style.visibility = 'hidden';
	   //document.getElementById('calllog').innerHTML="<button id=fav onclick=get_contacts1();>ADD<img src=images/fav_add.png style=height:35px; width:30px; !important;></button>";
	   document.getElementById('calllog').innerHTML=document.getElementById('calllog').innerHTML+
	   "<br/><table align=center><tr><td>"+
       "<button  style=\"height:85px; width:85px; !important;\"><font size=+1 color=black>ADD</font><img src=images/fav_add.png  onclick=get_contacts1(); align=middle  style=\"height:35px; width: 35px; padding-left:1px; padding-right: 1px;\"/> </button>" +
       "</td></tr></table>";
	   if(len==0)
		{
		  document.getElementById('calllog').innerHTML=document.getElementById('calllog').innerHTML+"<br/>NO contact is set as favorite....<br/>press + to set favorite";
		}
   	  else
		{   
   		   for (var i=0; i<len; i++)
			   {
				   if(results.rows.item(i).name!=null)
				   {
					   contactOfFav[i]=results.rows.item(i).name;
					   document.getElementById('calllog').innerHTML=document.getElementById('calllog').innerHTML+
					    "<button id=bid style=\"width:90%; height:50px; padding:left; !important;\" name="+results.rows.item(i).name+" phone="+results.rows.item(i).phone+" onclick=\"favoriteAction('"+results.rows.item(i).name+"','"+results.rows.item(i).phone+"');\"><font align=left style=\"width:80%; height:35px; !important;\">"+results.rows.item(i).name+"</font></button>";      
				   }
			   }	   
    	}
}

function favoriteAction(name,num)
{
	//alert("num is "+num);
	//var a=new Array();
     document.getElementById('calllog').innerHTML =" ";
 	 document.getElementById('calllog').innerHTML = document.getElementById('calllog').innerHTML+
	  "<table align=center ><tr><td><h3 align=center >"+name+"</h3></td></tr></table>" +
	 /* "<tr><td aligh=center>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<img src=images/fav_img.png style=\"height:85px; width:85px; !imporatant;\"></td></tr></table>" +*/
	  "<table ><tr><td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Call</td><td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td><td>Send SMS</td></tr><tr><td><a href='tel:"+num+"' style=border-bottom: 1px;!important;><img src=images/gallery_call.png style=\"height:85px; width:85px; !important;\"></a></td>" +
	  "<td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td><td><a href='sms:"+num+"' style=border-bottom: 1px;!important;><img src=images/gallery_sms.png style=\"height:85px; width:85px; !important;\"></a></td></tr></table>";
}

function get_contacts1() 
{
	document.getElementById('calllog').innerHTML =" ";
	document.getElementById('foot').style.visibility = 'visible';
    document.getElementById('foot').innerHTML ="";
    var obj = new ContactFindOptions();
    obj.filter = "";
    obj.multiple=true;
    var filter=[ "displayName","name","phoneNumbers"];
    obj.multiple = true;
    navigator.contacts.find(filter,contacts_success1,contacts_fail1, obj);
}
function contacts_success1(contacts)
{
	 var len=contacts.length; 
	 var f=0;
     var flag=0;
	 
	 if( contactOfFav!=0)
    	{
		 
	       var idnum=0;
	  	   	for (var i = 0; i < contacts.length ; i++) 
			     {  
		   					flag=0;
				   			for(var k=0;k< contactOfFav.length;k++)
				   			{
				   					if( contactOfFav[k]==contacts[i].name.formatted)
					   				{
				   						flag=1;
						   				break;
						   			}
				   			}
			   			   if(flag!=1)
			   				{
			   				  	   for (var j=0; j<contacts[i].phoneNumbers.length; j++) 
							   		{
			   							if (contacts[i].name && contacts[i].name.formatted) 
								         {
						   					f++;
						   				    document.getElementById('calllog').innerHTML=document.getElementById('calllog').innerHTML + 
							                "<br/><table><tr><td><input type=checkbox id=chkbox"+idnum+" style=height:30px; width:27px; !important; name='"+contacts[i].name.formatted+"' phone='"+contacts[i].phoneNumbers[j].value+"'></td><td><a href='tel:"+contacts[i].phoneNumbers[j].value+"' rel=external><img src=images/shortcut_contact.png height=35px width=35px /></a></td><td>" + contacts[i].name.formatted+" "+contacts[i].phoneNumbers[j].value+
							                "</td></tr></table>____________________________________________________";
						   				    idnum++;
				   			        }
			   				     }
			   		        }
			            }
		      	document.getElementById('foot').innerHTML =
				 "<table><tr><td><button id=right onclick=\"addContactToFavSucess("+f+");\"> <img src=images/fb_ok.png style=height:35px; width:35px; !important /></button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td>" +
				 "<td><button><a href=Home.html?btn3 rel=external><img src=images/fb_cancel.png style=height:35px; width:35px; !important/></a></button></td></tr></table>";
			      }
	    else
    	 {
	    	    document.getElementById('foot').innerHTML =
				 "<table><tr><td><button id=right onclick=\"addContactToFavSucess("+len+");\"> <img src=images/fb_ok.png style=height:35px; width:35px; !important /></button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td>" +
				 "<td><button><a href=Home.html?btn3 rel=external><img src=images/fb_cancel.png style=height:35px; width:35px; !important/></a></button></td></tr></table>";
		   	for (var i = 0; i < contacts.length ; i++) 
		     {       
			   for (var j=0; j<contacts[i].phoneNumbers.length; j++) 
		   		{
		   		  if (contacts[i].name && contacts[i].name.formatted) 
				        {
		   			  		document.getElementById('calllog').innerHTML=document.getElementById('calllog').innerHTML + 
			                "<br/><table><tr><td><input type=checkbox id=chkbox"+i+" style=height:30px; width:27px; !important; name='"+contacts[i].name.formatted+"' phone='"+contacts[i].phoneNumbers[j].value+"'></td><td><a href='tel:"+contacts[i].phoneNumbers[j].value+"' rel=external><img src=images/shortcut_contact.png height=35px width=35px /></a></td><td>" + contacts[i].name.formatted+" "+contacts[i].phoneNumbers[j].value+
			                "</td></tr></table>____________________________________________________";
		   			  		
				        }
		         }
		     }
	    }
  
}
function addContactToFavSucess(len)
{
	
	var j=0;
	var t=new Array();
	for(var i=0;i<len;i++)
		{
			t[i]=document.getElementById("chkbox"+i);
			if(t[i].checked)
				{	
				
				    contactOfFav_local_name[j]=t[i].name;
				    contactOfFav_local_phone[j]=t[i].getAttribute('phone');
				   // alert( contactOfFav_local_phone[j]+"  contactOfFav_local_phone[j]");
					j++;
				}
		}
	db.transaction(createDB_fav, error,InsertFav);
}
function InsertFav()
{
	 db.transaction(insertRecordInTbl, error);	
}
	

function insertRecordInTbl(tx)
{
		for(var i=0;i<contactOfFav_local_name.length;i++)
		{
		 tx.executeSql('INSERT INTO MYBOOK (name,phone) VALUES ("'+contactOfFav_local_name[i]+'","'+contactOfFav_local_phone[i]+'")');
		}
	 db.transaction(selectName, error);
	
}
function selectName(tx)
{
	tx.executeSql('SELECT * FROM MYBOOK', [], testFav, error);
}
function testFav(tx,results)
{
	alert("Contact Set As Favorite");
	cnt_fav();
}
function contacts_fail1 (error) 
{
    document.getElementById('calllog').innerHTML = "<strong>Error getting contacts.</strong>";
}
function error(e)
{
	alert("somthing went wrong!!!!!! "+e);
}






