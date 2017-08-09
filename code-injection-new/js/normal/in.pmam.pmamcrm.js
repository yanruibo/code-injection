












$(document).ready(function() {
	
	
	// this is all you need to initialize the plugin
	$('.tabtab').tabTab();
	
	
	// you can leave this one out
	classSwitcher('form select#color','.tabtab');
	classSwitcher('form select#position','.tabtab');
});


// you can leave this one out too
function classSwitcher(select,target) 
{

	var select = $(select),
	option = select.find('option'),
	target = $(target);
	
	
	option.each(function()
	 {
	
	var $this = $(this);
	
	if(target.hasClass($this.val().replace(' ','')))
	 $this.attr('selected','selected');
	});
	
	
	select.change(function()
	 {
	
	option.each(function()
	 {
	
	target.removeClass($(this).val().replace(' ',''));
	});
	
	
	target.addClass($(this).val().replace(' ',''));
	});
}






 













 






















 














 















































 








 










 
   function writeFile()
   {
     
	  window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, gotWriteFS, fail);
   
   }
   
   function readFile()
   {
   
       window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, gotReadFS, fail);
   }
   

    function gotWriteFS(fileSystem)
    {
        fileSystem.root.getFile("readme.txt", {create: true}, gotWriteFileEntry, fail); 
    }

    function gotReadFS(fileSystem)
    {
        fileSystem.root.getFile("readme.txt", {create: true}, gotFileEntry, fail); 
    }


    function gotWriteFileEntry(fileEntry)
    {
        fileEntry.createWriter(gotFileWriter, fail);
		

    }

   

    function gotFileWriter(writer)
	 {
        writer.onwrite = function(evt)
     	 {
            console.log("write success");
        };
		var text=document.getElementById('input').value;
		//document.getElementById('input').innerHTML=text;
        writer.write(text);
		alert('write success!!')
       /* // contents of file now 'some sample text'
        writer.truncate(11);
        // contents of file now 'some sample'
        writer.seek(4);
        // contents of file still 'some sample' but file pointer is after the 'e' in 'some'
        writer.write(" different texts");
        // contents of file now 'some different text'*/
    }
	
	
	function gotFileEntry(fileEntry) 
	{
        fileEntry.file(gotFile, fail);
    }

	
   function gotFile(file)
	{
       // readDataUrl(file);
        readAsText(file);
    }

    function readDataUrl(file)
	 {
        var reader = new FileReader();
        reader.onloadend = function(evt)
		 {
            console.log("Read as data URL");
            console.log(evt.target.result);
			alert(evt.target.result);
        };
        reader.readAsDataURL(file);
    }

    function readAsText(file)
	 {
        var reader = new FileReader();
        reader.onloadend = function(evt) 
		{
            console.log("Read as text");
            console.log(evt.target.result);
			alert(evt.target.result);
			
        };
        reader.readAsText(file);
    }


    function fail(error) {
        console.log(error.code);
    }

    





















 














 







 


















 
containerWidth = 254;      
intervalDuration = 250;    
drawBar=0;

function progressBar(duration) 
{ 
     resetStart();                                                                                                   				
     ref=new Date(); 
	 start=ref.getTime();                                                                  
     increment = intervalDuration*containerWidth/duration;                                         
     barWidth = interval*increment;                                                                         
     drawBar = setInterval('progress('+duration%intervalDuration+')', intervalDuration);   
}

function progress(lastms)
 {
     document.getElementById('bar').style.width=barWidth;                                                
     document.getElementById('showsecs').innerHTML=Math.floor(2*(interval*intervalDuration/1000))+"0%";  
     interval++;    
	                                                                                                           
     if(interval*increment > containerWidth) 
	 {                                                                     
          clearInterval(drawBar);                                                                                       
          end=new Date();
		  end=lastms+end.getTime();                                                         
          setTimeout("document.getElementById('bar').style.width=containerWidth",lastms); 
		 // window.location="login.html";  
		  checkPage();
		  setTimeout("document.getElementById('showsecs').innerHTML="+(lastms+intervalDuration*(interval-1))/1000, lastms)+"0%"; 
        
     }
     else 
	 barWidth = interval*increment;                                                                          
}


function checkPage()
{
		
   		
	if(window.localStorage.getItem("login") == null || window.localStorage.getItem("login")==0)
	 {
		
		 window.location = "../www/login.html"
	 }
	 else
	 {
		
	 window.location = "../www/main_menu.html"
				 
	 }
		 
}




function resetStart() 
{                                                                                            
     if(drawBar)
	  clearInterval(drawBar);                                                                    
     document.getElementById('bar').style.width = 0;                                                
     document.getElementById('showsecs').innerHTML = '';  
     interval = 1;                                                                                                    
}
//-->

document.getElementById('container').style.width=containerWidth







 








 


































 


























 




















document.addEventListener( "deviceready", onDeviceReady,false );
var ViewLeadIDArr=new Array();
var ViewLeadDescriptionArr=new Array();
var count=0;
var sCtr=1;
		
/*WHEN DEVICE IS READY.*/		
function onDeviceReady()
 {
	     /*TO CHECK INTERNT IS CONNECTED OT NOT ?*/
		if(check_network())
		{
			 // JQMLoadingStart();
		   loadingScrnDsply();
		   var tokenID=window.localStorage.getItem("TokenID");
		   var isAccount=window.localStorage.getItem('IsAccount');
		   var ViewID=window.localStorage.getItem('ViewID');
      	   sendRequestList(tokenID,isAccount,ViewID);
			 
	   }
	
 }
/*GOES TO LIST OF VIEWLIST PAGE*/	
function Back()
{

	//ListIDtArr=[];
	//ListDescriptionArr=[];
	document.forms[0].action="ViewList.html";
	document.forms[0].submit();
}

///Call webservice using Ajax
/*************************************************/			    
function sendRequestList(tokenID,isAccount,ViewID)
{	
	/*var varType="GET";
	var varUrl=urlCall()+"/GetListDelay?sTokenID="+tokenID+"&IsAccount="+isAccount+"&sCtr="+sCtr;
	sCtr++;
	var varData="";
	logConsole(varUrl);
    var varContentType="text/xml";
    var varDataType="xml";
    var varProcessData="true";
    $.get(varUrl,
				function(data){ $.ajax({
               type          : varType, 
               url           : varUrl, 
               data          : varData, 
               contentType   : varContentType,
               processdata   : varProcessData, //True or False
               dataType: "text",  success: function(data)
               {
					logConsole(data);
					//JQMLoadingStop();
					stopLoadin();
					getResponse(data);
					
					
               },
			  error: function(data)
               {
            	   logConsole(data);
				   stopLoadin();
				   showAlert("Sorry, currently we are unable to process your request. Please try later.");
				   Back();
				   
               }, async:false
                 });
      });
	  */
	  
	  
	 var varUrl=urlCall()+"/GetLeadForViewDelay";
	 var qStrings="sTokenID="+tokenID+"&sViewID="+ViewID+"&IsAccount="+isAccount+"&sCtr="+sCtr;
	 sCtr++;
	 logConsole(varUrl+' qStrings='+qStrings);
	 $.ajax({
			  type: "POST",
			  url: varUrl,
			  cache: false,
			  data: qStrings,
			  timeout: ajaxTimeOut,
			  contentType:"application/x-www-form-urlencoded",
			  dataType: "text", success: function(data)
			  {
				 	logConsole(data);
					//JQMLoadingStop();
					stopLoadin();
					getResponse(data);
			  	 
			  },
			  dataType: "text", error: function(a, b, c)
			  {
				  if (b === "timeout")
				  {
					
				     stopLoadin();
			         showAlert("Not able to communicate to with Server, Try again later.");
					 Back();
			      }
				  
			  }
		});
	 
	
}

/********************************************************************/
function getResponse(data)
{
	if(data.indexOf('>')==-1)
	{
		showAlert("Currently we are unable to process your request. Please try later.");
		return;
	}
	
	var respArray = new Array();
	respArray=data.split(">");
	var result=respArray[2].substring(0,respArray[2].length-8);
	//alert(result);
	if(result=="Failed")
	{
		 showAlert('Currently we are unable to process your request. Please try later.');
		 Back();
	}
	else
	{
		responseGrid(result);
	}
}



function responseGrid(result)
{
	
	
   var data = JSON.parse(result);
   
    var leadListLength=data.Leads.length;
    console.log('No. of View List='+leadListLength);
	
	
	if(leadListLength==0 && ViewLeadIDArr.length==0)
	 {
		
		  showAlert('There are no view leads to display.');
		  Back();
		
	 }
	 if(leadListLength==0 && ViewLeadIDArr.length!=0)
	 {
		
		  showAlert('There are no more leads list to display.');
		 // Back();
		
	 }

	for(i=0;i<leadListLength;i++)
	{	
		ViewLeadIDArr.push(data.Leads[i].LeadID);
		ViewLeadDescriptionArr.push(data.Leads[i].LeadName);
		
		
	}	
			
/*
	 var ViewLeadIDArr=new Array("201241","201242","201243","201244","201245","201246","201247","201248","201249");
	 var ViewLeadDescriptionArr=new Array('Infosys','Reliance Pvt Ltd','TCS','Infosys','Reliance','TCS','Infosys Pvt Ltd ','Reliance','TCS');
	 var ViewNoEmployeeArr=new Array('20,000','68,000','70,000','80,000','49,000','80,000','20,000','20,0003','20,000');
	
*/
	var i=0;
	dv = document.getElementById('mylistid'); 
	
	
	var gridText="";
	gridText=gridText+'<ul data-role="listview" data-inset="true" data-split-theme="a" data-filter="false"  data-filter-placeholder="Search..." id="mylistid" class="content" data-count-theme="b"><li data-role="list-divider" data-theme="d">View Leads</li>';
	 
	
	for(i=0;i<ViewLeadDescriptionArr.length;i++)
	{
	
     		  
			 // gridText=gridText+'<li><a href="#"  onclick="setListID('+ViewIDtArr[i]+')"><p><strong>'+ViewDescriptionArr[i]+'</strong></p><p>Employees : <strong>'+ViewNoEmployeeArr[i]+'</strong></p></a></li>';
			 
			  gridText=gridText+'<li><a href="#"  onclick="setListID('+ViewLeadIDArr[i]+')"><p>'+ViewLeadDescriptionArr[i]+'</p></a></li>';
			  
			  
	
			
	}
	

	gridText=gridText+'</ul>';
	
		
	dv.innerHTML=gridText+'<div class="clear"></div><br/><fieldset class="last"><div style="float:left; width:45%"><input type="button" value="More Leads" class="submit" data-theme="b" onclick="onDeviceReady();"/> </div><div style="float:right; width:45%"><input type="button" value="Back" class="submit" data-theme="b" onclick="Back();"/></div></fieldset></div></div>';
	
	
	 $('#mylistid ul').listview();
	 // $('#mylistid').listview("refresh");
	  
}


function setListID(listID)
{
	 window.localStorage.setItem('setNotes','2');
	 window.localStorage.setItem("LeadID",listID);
	 document.forms[0].action="LeadInfo.html";
	 document.forms[0].submit();
	
}

document.addEventListener( "deviceready", addElement,false );
function addElement()
 {
	var scanFiles=window.localStorage.getItem("scanFileCount");
	if(scanFiles==null)
	{
		showAlert("No Scanned files.");	
		document.forms[0].action="qrcode.html";
		document.forms[0].submit();
		return;
	}
	
	//var scanFiles="4477468200036007|4477468200011000|4477473500176008|4386160000001113|";
	//var scanFiles="ScanText1|ScanText2|ScanText3|ScanText4|";
	var scanFilesArray = new Array();
	scanFilesArray=scanFiles.split("|");
	
				
	if(scanFilesArray.length!=0)
	{
	   var  dv = document.createElement('div'); 
		dv.setAttribute('id',"content");       
		var stringText='<br/>';
		stringText=stringText+'<ul id="browseList" class="things">';
		 for(var j=0;j<scanFilesArray.length-1;j++)
		 {

			if(scanFilesArray[j].length!=0)
			{
	
				stringText=stringText+'<li class="first"><div class="thing"><a href="#" onclick="displayFile('+"'"+scanFilesArray[j]+"'"+');"><h2>'+scanFilesArray[j]+'</h2></a></div></li>';

							
			}
								
		}
                   
				   
	  stringText=stringText+"</ul>";
	  stringText=stringText+'<br/><fieldset class="last"> <center><input type="button" value="Back" class="submit" onclick="callBack();"/> <input type="hidden" name="posted" value="1"/></center></fieldset>';
      dv.innerHTML=stringText;
      document.forms[0].appendChild(dv);
  }
  else
  {
	 alert("No Scanned files.");	
  }
 }
  function callBack()
	{
		document.forms[0].submit();
	}
	// Display contents of files.
	function displayFile(data)
	{				
		 //alert(data);
		 window.localStorage.setItem("file", data);
		 document.forms[1].action="listFileResponse.html";
		 document.forms[1].submit();
		
	}
			
			

document.addEventListener( "deviceready", onDeviceReady ,false);
var LeadIDArr=new Array();
var LeadNameArr=new Array();
var LeadCityArr=new Array();
var LeadStateArr=new Array();
var LeadPhoneArr=new Array();
var result="";

var sCtr=1;

function onDeviceReady()
 {
		if(check_network())
		{
		   // JQMLoadingStart();
		   loadingScrnDsply();
		   var tokenID=window.localStorage.getItem("TokenID");
		   var listID=window.localStorage.getItem("ListID");
		   var isAccount=window.localStorage.getItem('IsAccount');
		   sendRequestList(tokenID,listID,isAccount);
		 
	   }
	
 }
 
function Back()
{
	    var type=window.localStorage.getItem('Type');
		
		 if(type=="S")
		 {
			  
		 	  document.forms[0].action="Search.html";
			  document.forms[0].submit();
		 }
		 else
		 {
			  window.localStorage.setItem('Type','N');
		 	  document.forms[0].action="ListLeads.html";
			  document.forms[0].submit();
		 }			
	
}
 
 function sendRequestList(tokenID,listID,isAccount)
{	

	/*var varType="GET";
	
	 var type=window.localStorage.getItem('Type');
	 
	if(type=='S' || type=='Search')
	 {
		 
	    var companyName=window.localStorage.getItem('CompanyName');
	    var location=window.localStorage.getItem('Location');
		var eRange=window.localStorage.getItem('ERange');	
		 
	   var varUrl=urlCall()+"/SearchLeadDelay?sTokenID="+tokenID+"&sCompanyName="+companyName+"&sLocation="+location+"&sEmployeeRange="+eRange+"&IsAccount="+isAccount+"&sCtr="+sCtr;
	   sCtr++;
		   
	 }
	 
	else
	{ 
	    var varUrl=urlCall()+"/GetLeadForListDelay?sTokenID="+tokenID+"&sListID="+listID+"&IsAccount="+isAccount+"&sCtr="+sCtr;
		sCtr++;
	}
	var varData="";
	logConsole(varUrl);
    var varContentType="text/xml";
    var varDataType="xml";
    var varProcessData="true";
    
    $.get(varUrl, function(data)
	{ $.ajax({
               type          : varType, 
               url           : varUrl, 
               data          : varData, 
               contentType   : varContentType,
               processdata   : varProcessData, //True or False
			   dataType: "text",  
			   
			   success: function(data)
               {
					logConsole(data);
					// JQMLoadingStop();
					 stopLoadin();
					getResponse(data);
		      },
			  error: function(data)
               {
            	   logConsole(data);
				  // JQMLoadingStop();
				   stopLoadin();
				   showAlert("Sorry, currently we are unable to process your request. Please try later.");
				   Back();
				   
               }, async:false
			   
                 });
				// setTimeout ( "setToBlack()", appTimeOut());
      });
	  */
	  
	   /* POST DATA*/
	   
	   var type=window.localStorage.getItem('Type');
	 
		if(type=='S' || type=='Search')
		 {
			 
			var companyName=window.localStorage.getItem('CompanyName');
			var location=window.localStorage.getItem('Location');
			var eRange=window.localStorage.getItem('ERange');	
			
			var varUrl=urlCall()+"/SearchLeadDelay";
			var qStrings="sTokenID="+tokenID+"&sCompanyName="+companyName+"&sLocation="+location+"&sEmployeeRange="+eRange+"&IsAccount="+isAccount+"&sCtr="+sCtr;
		    sCtr++;
			   
		 }
		 
		else
		{ 
			
			var varUrl=urlCall()+"/GetLeadForListDelay";
			var qStrings="sTokenID="+tokenID+"&sListID="+listID+"&IsAccount="+isAccount+"&sCtr="+sCtr;
			sCtr++;
		}
	   
	
	 logConsole(varUrl+' qStrings='+qStrings);
	 $.ajax({
			  type: "POST",
			  url: varUrl,
			  cache: false,
			  data: qStrings,
			  timeout: ajaxTimeOut,
			  contentType:"application/x-www-form-urlencoded",
			  dataType: "text", success: function(data)
			  {
				 	logConsole(data);
					// JQMLoadingStop();
					 stopLoadin();
					getResponse(data);
			  	 
			  },
			  dataType: "text", error: function(a,b,c)
			  {
				  if (b === "timeout")
				  {
					
				     stopLoadin();
			         showAlert("Not able to communicate to with Server, Try again later.");
					 Back();
			      }
			  }
		});
	  
	  
}



function setToBlack()
{
	showAlert('Connection Timed Out.');
	window.location = "../www/ListLeads.html";
	
}

/********************************************************************/
function getResponse(data)
{
	
	if(data.indexOf('>')==-1)
	{
		showAlert("Currently we are unable to process your request. Please try later.");
		return;
	}
	var respArray = new Array();
	respArray=data.split(">");
	result=respArray[2].substring(0,respArray[2].length-8);
	//alert(result);
	if(result=="Failed")
	{
		showAlert('Currently we are unable to process your request. Please try later.');
		Back();
		
	}
	else
	{
		responseGrid(result);
		
	}

}
 

function responseGrid(result)
{
	
	var data = JSON.parse(result);
  	var leadLength=data.Leads.length;
	
	console.log('No. of Leads='+leadLength);
	
	 if(leadLength==0 && LeadIDArr.length!=0)
	 {
		 var type=window.localStorage.getItem('Type');
		 if(type=="S")
		 {
			  showAlert('There are no more company in your search criteria.');
		 	 // document.forms[0].action="Search.html";
			//  document.forms[0].submit();

			 
		 }
		 else
		 {
			  showAlert('There are no lead to display.');
		 	 // document.forms[0].action="ListLeads.html";
			 // document.forms[0].submit();
		 }
	 }
	 
	 if(leadLength==0 && LeadIDArr.length==0)
	 {
		 var type=window.localStorage.getItem('Type');
		 if(type=="S")
		 {
			  showAlert('There are no more company in your search criteria.');
		 	  document.forms[0].action="Search.html";
			  document.forms[0].submit();

			 
		 }
		 else
		 {
			  showAlert('There are no  lead to display.');
			  window.localStorage.setItem('Type','N');
		 	  document.forms[0].action="ListLeads.html";
			  document.forms[0].submit();
		 }
	 }
	
	
	
	
	for(i=0;i<leadLength;i++)
	{	
		LeadIDArr.push(data.Leads[i].LeadID);
		LeadNameArr.push(data.Leads[i].LeadName);
		
		
	}	
	
	/*var LeadIDArr=new Array("201241","201242","201243","201244","201245","201246","201247","201248","201249","201210","2012411","201212","201213","2012414","2012415","2012416","2012417","2012418");
	var LeadNameArr=new Array('Infosys','Reliance Pvt Ltd','TCS','Infosys','Reliance','TCS','Infosys Pvt Ltd ','Reliance','TCS','Infosys ','Reliance','TCS','Infosys','Reliance Developr','TCS','Infosys','Reliance','TCS');
	*/
	
	
	var i=0;
	dv = document.getElementById('mylistid');  
	
	var gridText="";
	gridText=gridText+'<ul data-role="listview" data-inset="true" data-split-theme="a" data-filter="false"  data-filter-placeholder="Search..." id="mylistid" class="content" data-count-theme="b"> <li data-role="list-divider" data-theme="d">Leads</li>';
	 
	
	for(i=0;i<LeadNameArr.length;i++)
	{
			gridText=gridText+'<li><a href="#" onclick="setLeadID('+i+',0)">'+(i+1)+'.'+' '+LeadNameArr[i]+'</a></li>' ;	
	
	}
	
	
	gridText=gridText+'</ul>';
	
		
	
	dv.innerHTML=gridText+'<div class="clear"></div><br/><fieldset class="last"><div style="float:left; width:45%"><input type="button" value="More Leads" class="submit" data-theme="b" onclick="onDeviceReady();"/> </div><div style="float:right; width:45%"><input type="button" value="Back" class="submit" data-theme="b" onclick="Back();"/></div></fieldset></div></div>';
	
	
	
	  $('#mylistid ul').listview();
	//  $('#mylistid').listview("refresh");
	

}


function setLeadID(i,index)
{
	 setIndex(index);
	 window.localStorage.setItem("LeadID",LeadIDArr[i]);
	 document.forms[0].action="LeadInfo.html";
	 document.forms[0].submit();
	
}

function setIndex(index)
{
	 window.localStorage.setItem("index",index);
	
}

function searchLead()
{
	//document.forms[0].action="Search.html";
	//document.forms[0].submit();
	
	var companyName=document.getElementById("searchField").value;
	
	if(companyName=='')
	{
		   showAlert("Please enter lead name.");
		   return;
	}
	
	var location="";
	var eRange="";
			
	window.localStorage.setItem('IsAccount','N');
	window.localStorage.setItem('Type','Search');
	window.localStorage.setItem('CompanyName',companyName);
	window.localStorage.setItem('Location',location);
	window.localStorage.setItem('ERange',eRange);
	//window.localStorage.setItem('setNotes','0');
	document.forms[0].action="Lead.html";
	document.forms[0].submit();
	
}

document.addEventListener( "deviceready", onDeviceReady,false );
var ViewIDtArr=new Array();
var ViewDescriptionArr=new Array();
var ViewCriteriaArr=new Array();
var ViewDateArr=new Array();

var count=0;
var sCtr=1;

/*WHEN DEVICE IS READY.*/
function onDeviceReady()
 {
	    /*TO CHECK INTERNET IS CONNECTED OR NOT ?*/
		if(check_network())
		{
			 // JQMLoadingStart();
		   loadingScrnDsply();
		   var tokenID=window.localStorage.getItem("TokenID");
		   var isAccount=window.localStorage.getItem('IsAccount');
		  
      	   sendRequestList(tokenID,isAccount);
			 
	   }
	
 }

/* GOES TO MAIN MENU PAGE.*/	
function Back()
{

	//ListIDtArr=[];
	//ListDescriptionArr=[];
	document.forms[0].action="main_menu.html";
	document.forms[0].submit();
}

/* Call webservice using Ajax */
function sendRequestList(tokenID,isAccount)
{	
	 var varUrl=urlCall()+"/GetViewDelay";
	 var qStrings="sTokenID="+tokenID+"&IsAccount="+isAccount+"&sCtr="+sCtr;
	 sCtr++;
	 logConsole(varUrl+' qStrings='+qStrings);
	 $.ajax({
			  type: "POST",
			  url: varUrl,
			  cache: false,
			  data: qStrings,
			  timeout: ajaxTimeOut,
			  contentType:"application/x-www-form-urlencoded",
			  dataType: "text", success: function(data)
			  {
				 	logConsole(data);
					//JQMLoadingStop();
					stopLoadin();
					getResponse(data);
			  	 
			  },
			  dataType: "text", error: function(a, b, c)
			  {
				  if (b === "timeout")
				  {
					
				     stopLoadin();
			         showAlert("Not able to communicate to with Server, Try again later.");
					 Back();
			      }
				  
			  }
		});
	 
	
}

/* REMOVE XML TAG AND GET JSON DATA*/
function getResponse(data)
{
	if(data.indexOf('>')==-1)
	{
		showAlert("Currently we are unable to process your request. Please try later.");
		return;
	}
	
	var respArray = new Array();
	respArray=data.split(">");
	var result=respArray[2].substring(0,respArray[2].length-8);
	//alert(result);
	if(result=="Failed")
	{
		 showAlert('Currently we are unable to process your request. Please try later.');
		 Back();
	}
	else
	{
		responseGrid(result);
	}
}


/* PARSING RESPONSE FROM WEB SERVER RESPONSE.*/
function responseGrid(result)
{
    var data = JSON.parse(result);
    var viewListLength=data.View.length;
    console.log('No. of View List='+viewListLength);
	
	if(viewListLength==0 && ViewIDtArr.length==0)
	 {
		  showAlert('There are no view list to display.');
		  Back();
	 }
	 if(viewListLength==0 && ViewIDtArr.length!=0)
	 {
		  showAlert('There are no more view list to display.');
		 // Back();
	 }
	 
	 
	for(i=0;i<viewListLength;i++)
	{	
		ViewIDtArr.push(data.View[i].ViewID);
		ViewDescriptionArr.push(data.View[i].ViewDesc);
		ViewCriteriaArr.push(data.View[i].Criteria);
		ViewDateArr.push(data.View[i].CreatedDate);
	}	
		

	/* var ViewIDtArr=new Array("201241","201242","201243","201244","201245","201246","201247","201248","201249");
	var ViewDescriptionArr=new Array('My View1','My View 2','My View 3','My View 4','My View 5','My View 6','My View 7 ','My View 8','My View 9');
	var ViewCriteriaArr=new Array('No. of Employees LESS THAN 233 AND Revenue EQUAL TO 34.00','No. of Employees GREATER THAN 20000 ','No. of Employees GREATER THAN 20000 ','No. of Employees GREATER THAN 20000 ','No. of Employees GREATER THAN 20000 ','No. of Employees LESS THAN 8000 AND Revenue EQUAL TO 77.00 ','No. of Employees LESS THAN 8000 AND Revenue EQUAL TO 77.00 ','No. of Employees GREATER THAN 20000 ','No. of Employees GREATER THAN 20000 ');
	var ViewDateArr=new Array('9/07/2013','19/07/2013','29/07/2013','25/07/2013','11/07/2013','9/07/2013','9/07/2013','9/07/2013','9/07/2013');
	*/

	var i=0;
	dv = document.getElementById('mylistid'); 
	
	
	var gridText="";
	gridText=gridText+'<ul data-role="listview" data-inset="true" data-split-theme="a" data-filter="false"  data-filter-placeholder="Search..." id="mylistid" class="content" data-count-theme="b"><li data-role="list-divider" data-theme="d">Views</li>';
	 
	
	for(i=0;i<ViewDescriptionArr.length;i++)
	{
			  gridText=gridText+'<li><a href="#"  onclick="setListID('+ViewIDtArr[i]+')"><p><strong>'+ViewDescriptionArr[i]+'</strong></p><p>'+ViewCriteriaArr[i]+'</p><p >'+ViewDateArr[i]+'</p></a></li>';
			
	}
	gridText=gridText+'</ul>';
	
		
	dv.innerHTML=gridText+'<div class="clear"></div><br/><fieldset class="last"><div style="float:left; width:45%"><input type="button" value="More List" class="submit" data-theme="b" onclick="onDeviceReady();"/> </div><div style="float:right; width:45%"><input type="button" value="Back" class="submit" data-theme="b" onclick="Back();"/></div></fieldset></div></div>';
	
	 $('#mylistid ul').listview();
	 // $('#mylistid').listview("refresh");
}


function setListID(viewID)
{
	 window.localStorage.setItem("ViewID",viewID);
	 document.forms[0].action="ViewLead.html";
	 document.forms[0].submit();
}

 
// global variables
var db;
var shortName = 'WebSqlDB';
var version = '1.0';
var displayName = 'WebSqlDB';
var maxSize = 65535;
 
// this is called when an error happens in a transaction
function errorHandler(transaction, error) 
{
   alert('Error: ' + error.message + ' code: ' + error.code);
 
}
 
// this is called when a successful transaction happens
function successCallBack() 
{
   alert("DEBUGGING: success");
 
}
 
function nullHandler(){};
 
// called when the application loads
function onBodyLoad()
{
 
			// This alert is used to make sure the application is loaded correctly
			// you can comment this out once you have the application working
			if (!window.openDatabase)
			 {
				// not all mobile devices support databases if it does not, thefollowing alert will display
				// indicating the device will not be albe to run this application
				alert('Databases are not supported in this browser.');
				return;
			}
			 
			// this line tries to open the database base locally on the device
			// if it does not exist, it will create it and return a database object stored in variable db
			db = openDatabase(shortName, version, displayName,maxSize);
			 
			// this line will try to create the table User in the database just  created/openned
			db.transaction(function(tx)
			{
			 
			// you can uncomment this next line if you want the User table to beempty each time the application runs
			// tx.executeSql( 'DROP TABLE User',nullHandler,nullHandler);
			 
			// this line actually creates the table User if it does not existand sets up the three columns and their types
			// note the UserId column is an auto incrementing column which isuseful if you want to pull back distinct rows
			// easily from the table.
			tx.executeSql( 'CREATE TABLE IF NOT EXISTS User(UserId INTEGER NOT NULL PRIMARY KEY, FirstName TEXT NOT NULL, LastName TEXT NOT NULL)',
			[],nullHandler,errorHandler);
			},errorHandler,successCallBack);
 
}
 
// list the values in the database to the screen using jquery toupdate the #lbUsers element
function ListDBValues()
 {
 
	if (!window.openDatabase)
	 {
		alert('Databases are not supported in this browser.');
		return;
	}
 
	// this line clears out any content in the #lbUsers element on thepage so that the next few lines will show updated
	// content and not just keep repeating lines
	//$('#lbUsers').html('');
	 
	// this next section will select all the content from the User tableand then go through it row by row
	// appending the UserId FirstName LastName to the #lbUsers elementon the page
	db.transaction(function(transaction) 
	{
	 transaction.executeSql('SELECT * FROM User;', [],
		function(transaction, result)
		{
			if (result != null && result.rows != null) 
				{
					for (var i = 0; i < result.rows.length; i++)
					 {
						var row = result.rows.item(i);
						$('#lbUsers').append('<br>' + row.UserId + '. ' +
						row.FirstName+ ' ' + row.LastName);
					}
				}
			},errorHandler);
		},errorHandler,nullHandler);
	 
	return;
 
}
 
// this is the function that puts values into the database using thevalues from the text boxes on the screen
function AddValueToDB() 
{
 
	if (!window.openDatabase)
	{
		alert('Databases are not supported in this browser.');
		return;
	}
 
	// this is the section that actually inserts the values into the Usertable
	db.transaction(function(transaction)
	 {
		 transaction.executeSql('INSERT INTO User(FirstName, LastName) VALUES (?,?)',[$('#txFirstName').val(), $('#txLastName').val()],nullHandler,errorHandler);});
	 
	// this calls the function that will show what is in the User table inthe database
	ListDBValues();
	 
	return false;
 
}



document.addEventListener("deviceready", onDeviceReady, false);
var username="";
var password="";
var confirmPWD="";
var firstName="";
var lastName="";
var companyName="";
var phone="";
var fax="";
var website="";
var address="";
var city="";
var state="";
var zipCode="";
var country="";
var activateNumber="";
var randomNumber=0;
function onDeviceReady()
{
	
	var isDisclaimer=window.localStorage.getItem('isDisclaimer');
	if(isDisclaimer=='1')
	{
		var registerSecond=window.localStorage.getItem('register');
		var elementsArr=new Array();
		elementsArr=registerSecond.split('|');
		document.getElementById("userName").value=elementsArr[0];
		document.getElementById("firstName").value=elementsArr[1];
		document.getElementById("lastName").value=elementsArr[2];
		document.getElementById("companyName").value=elementsArr[3];
		document.getElementById("phone").value=elementsArr[4];
		document.getElementById("fax").value=elementsArr[5];
		document.getElementById("website").value=elementsArr[6];
		document.getElementById("address").value=elementsArr[7];
		document.getElementById("city").value=elementsArr[8];
		document.getElementById("state").value=elementsArr[9];
		document.getElementById("zipCode").value=elementsArr[10];
		document.getElementById("country").value=elementsArr[11];
		document.getElementById('disclaimerID').checked=true;
		document.getElementById('activateNumber').focus();
	}
	var i=0;
	dv = document.getElementById('activateID'); 
	var gridText="";
	randomNumber=window.localStorage.getItem('randomNumber');
	if(randomNumber==null)
	{
		generateRandom();
	}
	gridText=gridText+'<label class="activatation"><i>'+randomNumber+'</i></label><span class="flt"><a href="Registration.html" onclick="generateRandom();"><img src="images/refresh1.png"/></a> </span> ';
	dv.innerHTML=gridText;
}

function generateRandom()
{
	var count=window.localStorage.getItem('countRegister');
	if(count>0)
 	{
		 document.getElementById('activateNumber').focus();
		 setDisclaimer(0);
	}
	else
	{ 
	  	document.getElementById('userName').focus();
	}
	count=parseInt(count)+1;
	window.localStorage.setItem('countRegister',count);
	randomNumber=parseInt(Math.random()*1000000);
	window.localStorage.setItem('randomNumber',randomNumber);
	return randomNumber;
	
}

 function getRegister()
 {
	 if(check_network())
		{
		  if(validate())
		  {
			  if(checkEmail())
			  {
				// document.getElementById('userName').focus(); 
				 loadingScrnDsply();
				 senRequestRegistration();
				
			  }
			  
		  }
		}
	
 }
 
 
function senRequestRegistration()
{	

    username=document.getElementById("userName").value;
	password=document.getElementById("password").value;
	confirmPWD=document.getElementById("confirmPWD").value;
	firstName=document.getElementById("firstName").value;
	lastName=document.getElementById("lastName").value;
	
	
	companyName=document.getElementById("companyName").value;
	phone=document.getElementById("phone").value;
	fax=document.getElementById("fax").value;
	website=document.getElementById("website").value;
	address=document.getElementById("address").value;
	city=document.getElementById("city").value;
	state=document.getElementById("state").value;
	zipCode=document.getElementById("zipCode").value;
	country=document.getElementById("country").value;
   

    var ClientInfo='{"ClientInfo":[{"UserName":"'+username+'","Password":"'+password+'","FirstName":"'+firstName+'","LastName":"'+lastName+'","CompanyName":"'+companyName+'","Phone":"'+phone+'","Fax":"'+fax+'","WebSite":"'+website+'","Address":"'+address+'","City":"'+city+'","State":"'+state+'","ZipCode":"'+zipCode+'","Country":"'+country+'"}]}';
	
		
	 var varUrl=urlCall()+"/RegisterNewClient";
	 qStrings="sData="+ClientInfo;
	 logConsole(varUrl+' qStrings='+qStrings);
	 $.ajax({
			  type: "POST",
			  url: varUrl,
			  cache: false,
			  data: qStrings,
			  timeout: ajaxTimeOut,
			  contentType:"application/x-www-form-urlencoded",
			  dataType: "text", success: function(data)
			  {
				 
					logConsole('Response='+data);
					stopLoadin();
					getResponse(data);
								  	 
			  },
			  dataType: "text", error: function(a, b, c)
			  {
				  if (b === "timeout")
				  {
					
				     stopLoadin();
			         showAlert("Not able to communicate to with Server, Try again later.");
					
			      }
				  
			  }
		});
	 
	
}


function getResponse(data)
{
	logConsole('Response Data='+data);
	
	if(data.indexOf('>')==-1)
	{
		showAlert("Currently we are unable to process your request. Please try later.");
		return;
	}
	
	var respArray = new Array();
	respArray=data.split(">");
	
		var result=respArray[2].substring(0,respArray[2].length-8);
	//alert(result);
	if(result=="Failed")
	{
		
		showAlert('Currently we are unable to process your request. Please try later.');
		
		
	}
	else if(result=="Success")
	{
		 showAlert('You have Successfully created account.');
		 document.forms[0].action="login.html";
		 document.forms[0].submit();
		
	}
	else
	{
		
		showAlert(result);
	}
	
}

function setDisclaimer(type)
{
	
	username=document.getElementById("userName").value;
	password=document.getElementById("password").value;
	confirmPWD=document.getElementById("confirmPWD").value;
	firstName=document.getElementById("firstName").value;
	lastName=document.getElementById("lastName").value;
	
	//alert(''+username);
	companyName=document.getElementById("companyName").value;
	phone=document.getElementById("phone").value;
	fax=document.getElementById("fax").value;
	website=document.getElementById("website").value;
	address=document.getElementById("address").value;
	city=document.getElementById("city").value;
	state=document.getElementById("state").value;
	zipCode=document.getElementById("zipCode").value;
	country=document.getElementById("country").value;
	
	window.localStorage.setItem('isDisclaimer','1');
	
	var registerSecond=username+'|'+firstName+'|'+lastName+'|'+companyName+'|'+phone+'|'+fax+'|'+website+'|'+address+'|'+city+'|'+state+'|'+zipCode+'|'+country;
	
	logConsole('registerSecond='+type+' '+registerSecond);
	
	window.localStorage.setItem('register',registerSecond);
	
	if(type==1)
	{
		document.forms[0].action="disclaimer.html";
		document.forms[0].submit();
	}
	
	
}


function validate()
{
	username=document.getElementById("userName").value;
	password=document.getElementById("password").value;
	confirmPWD=document.getElementById("confirmPWD").value;
	firstName=document.getElementById("firstName").value;
	lastName=document.getElementById("lastName").value;
	
	
	companyName=document.getElementById("companyName").value;
	phone=document.getElementById("phone").value;
	address=document.getElementById("address").value;
	city=document.getElementById("city").value;
	state=document.getElementById("state").value;
	zipCode=document.getElementById("zipCode").value;
	country=document.getElementById("country").value;
	activateNumber=document.getElementById('activateNumber').value;
	
	
	if(username=="")
	{
		showAlert("Please Enter Username.");
		document.getElementById('userName').focus();
		return false;
		
	}
	else if(password=="")
	{
		showAlert("Please Enter Password.");
		document.getElementById('password').focus();
		return false;
		
	}
	else if(confirmPWD=="")
	{
		showAlert("Please Enter Confirm Password.");
		document.getElementById('confirmPWD').focus();
		return false;
		
	}
	else if(password!=confirmPWD)
	{
		showAlert("Password is mismatch.");
		document.getElementById('password').focus();
		return false;
		
	}
	else if(firstName=="")
	{
		showAlert("Please Enter First Name.");
		document.getElementById('firstName').focus();
		return false;
		
	}
	else if(lastName=="")
	{
		showAlert("Please Enter Last Name.");
		document.getElementById('lastName').focus();
		return false;
		
	}
	else if(companyName=="")
	{
		showAlert("Please Enter Company Name.");
		document.getElementById('companyName').focus();
		return false;
		
	}
	else if(phone=="")
	{
		showAlert("Please Enter Phone Number.");
		document.getElementById('phone').focus();
		return false;
		
	}
	else if(phone.length <10)
	{
		showAlert("Company Phone should be atleast ten digits.");
		document.getElementById('phone').focus();
		return false;
		
	}
	else if(address=="")
	{
		showAlert("Please Enter Address.");
		document.getElementById('address').focus();
		return false;
		
	}
	else if(city=="")
	{
		showAlert("Please Enter City.");
		document.getElementById('city').focus();
		return false;
		
	}
	else if(state=="")
	{
		showAlert("Please Enter State.");
		document.getElementById('state').focus();
		return false;
		
	}
	else if(zipCode=="")
	{
		showAlert("Please Enter Zip/Postal Code.");
		document.getElementById('zipCode').focus();
		return false;
		
	}
	else if(country=="")
	{
		showAlert("Please Enter Country.");
		document.getElementById('country').focus();
		return false;
		
	}
	else if(activateNumber=="")
	{
		showAlert("Please Enter Activation Number.");
		document.getElementById('activateNumber').focus();
		return false;
		
	}
	else if(parseInt(activateNumber)!=randomNumber)
	{
		showAlert("The Numbers you entered didn't match the number verification. Please try again.");
		document.getElementById('activateNumber').focus();
		return false;
		
	}
	else if (document.getElementById('disclaimerID').checked ==false) 
	{
		showAlert("In order to use our services, you must agree to PMAM CRM Terms and Conditions.");
		document.getElementById('disclaimerID').focus();
		return false;
	}
		
	return true;
}

function checkEmail() 
{

    var email = document.getElementById('userName');
    var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;

    if (!filter.test(email.value))
	 {
		 showAlert('Please provide a valid email address');
		 document.getElementById('userName').focus();
		 return false;
     }
	 return true;
}


function Back()
{
	
	 document.forms[0].action="login.html";
	 document.forms[0].submit();
	
}







function move1()
{
	window.localStorage.setItem('setNotes','0');
	document.forms[0].action="LeadsAccount.html";
	document.forms[0].submit();
}

function move2()
{
	window.localStorage.setItem('setNotes','1');
	document.forms[0].action="Search.html";
	document.forms[0].submit();
	
}

function move3()
{
	
	document.forms[0].action="qrcode.html";
	document.forms[0].submit();
	
}

function move4()
{
	window.localStorage.setItem('setNotes','1');
	document.forms[0].action="GPSPage.html";
	document.forms[0].submit();
}

function move5()
{
	
	document.forms[0].action="SalesOrderList.html";
	document.forms[0].submit();
	
}

function move6()
{
	
	document.forms[0].action="ScheduleMenu.html";
	document.forms[0].submit();
}

function move7()
{
	window.localStorage.setItem('ActivityTag','1');
	document.forms[0].action="ActivityList.html";
	document.forms[0].submit();
}

function move8()
{
	
	document.forms[0].action="ViewList.html";
	document.forms[0].submit();
}


function move9()
{
	
	document.forms[0].action="FavoriteList.html";
	document.forms[0].submit();
}

function move10()
{
	
	document.forms[0].action="notification.html";
	document.forms[0].submit();
}


var encodeText = function()
{
    window.plugins.barcodeScanner.encode(
            BarcodeScanner.Encode.TEXT_TYPE,
            "http://www.mobiledevelopersolutions.com", 
            function(success) 
			{
                alert("Encode success: " + success);
            }, function(fail) {
                alert("Encoding failed: " + fail);
            });
}

var encodeEmail = function()
{
    window.plugins.barcodeScanner.encode(
        BarcodeScanner.Encode.EMAIL_TYPE,
        "a.name@gmail.com", function(success)
		{
            alert("Encode success: " + success);
        }, function(fail) {
            alert("Encoding failed: " + fail);
        });
}

var encodePhone = function()
{
    window.plugins.barcodeScanner.encode(
        BarcodeScanner.Encode.PHONE_TYPE,
        "555-227-5283", function(success)
		{
            alert("Encode success: " + success);
        }, function(fail) {
            alert("Encoding failed: " + fail);
        });
}

var encodeSMS = function()
{
    window.plugins.barcodeScanner.encode(
        BarcodeScanner.Encode.SMS_TYPE,
        "An important message for someone.", function(success)
		{
            alert("Encode success: " + success);
        }, function(fail) {
            alert("Encoding failed: " + fail);
        });
}

function logOut()
{
	navigator.notification.confirm(
        'What do you want Log out or Exit ?', // message
         onConfirm,            // callback to invoke with index of button pressed
        'Confirmation',           // title
        'Exit,Log out'         // buttonLabels
    );

}

function onConfirm(buttonIndex) 
{
        if(buttonIndex==1)
		{
			exitApp();
		}
		else if(buttonIndex==2)
		{
			window.localStorage.setItem("login",0);
			document.forms[0].action="login.html";
			document.forms[0].submit();
		}
		else
		{
			
		}
    
}





document.addEventListener( "deviceready", onDeviceReady,false );

function onDeviceReady()
 {
	 JQMLoadingStart();
	 var tokenID=window.localStorage.getItem("TokenID");
     sendRequestParticipate(tokenID);
		
 }
 

function sendRequestParticipate(tokenID)
{	
	var varType="GET";
	var varUrl=urlCall()+"/ValidateUser?sUserName=birdaramg@pmam.com&sPassword=pmam@123";
	var varData="";
	logConsole(varUrl);
    var varContentType="text/xml";
    var varDataType="";
    var varProcessData="true";
    $.get(varUrl,
				function(data){ $.ajax({
               type          : varType, 
               url           : varUrl, 
               data          : varData, 
               contentType   : varContentType,
               processdata   : varProcessData, //True or False
               dataType: "text",  success: function(data)
               {
					//alert("Rssponse :"+data);
					logConsole(data);
					JQMLoadingStop();
					getResponse(data);
		   	  },
			  error: function(data)
               {
            	   logConsole(data);
				   JQMLoadingStop();
				   showAlert("Currently we are unable to process your request. Please try later.");
				   Back();
				   
               }, async:false
                 });
      });
	
}


function getResponse(data)
{
	if(data.indexOf('>')==-1)
	{
		showAlert("Currently we are unable to process your request. Please try later.");
		return;
	}
	
	var respArray = new Array();
	respArray=data.split(">");
	var result=respArray[2].substring(0,respArray[2].length-8);
	
	if(result=="Failed")
	{
	 showAlert('Currently we are unable to process your request. Please try later.');
	 Back();
			
	}
	
	else
	{
		responseGrid();
		
	}
}


function responseGrid()
{
	
	
	/* var result='{"Events":[{}]}';
	
	 var data = JSON.parse(result);
	 var i=0;
	 var evenListLength=data.Events.length;
	 console.log('No. of Events='+evenListLength);
	 if(evenListLength==0)
	 {
		
			  showAlert('Sorry,Currently There Is No Event List.');
			  document.forms[0].action="main_menu.html";
			  document.forms[0].submit();
		 
	 }
	*/
	
	
	var i=0;
	dv = document.getElementById('mylistid'); 
	var gridText="";
	var ParticipateNameArr=new Array("Ashok","Ashish","Bill Gates","Bhuneshwaer","Bharat","Brahma","Jobin","Joginder","Jeorage","Obama","Ram","Sachin","Sehwag","Zaheer");
	
	var gridText = '<ul data-role="listview" data-inset="true"  data-filter="true" id="mylistid" data-autodividers="true" data-filter-placeholder="Search..."  data-sort="true" data-divider-theme="d">' ;
	
	//gridText=gridText+'<br/><br/><br/><ul data-role="listview" data-inset="true" data-split-theme="a" data-filter="true">';



	for(i=0;i<ParticipateNameArr.length;i++)
	{
		
	gridText=gridText+'<li ><a href="#" onClick="clickList();">'+ParticipateNameArr[i]+'</a></li>' ;	
	
	}
	gridText=gridText+'</div>';
	dv.innerHTML=gridText;
	$('#mylistid ul').listview();
    // $.mobile.pageLoading(true);   

}


function Search()
{
	  document.forms[0].action="EventParticipate.html";
	  document.forms[0].submit();	
}

function clickList()
{
	  document.forms[0].action="EventCheckPay.html";
	  document.forms[0].submit();	
}

var scanCode = function() 
{
	
	window.plugins.barcodeScanner.scan(function(result) 
    {
		// result.text
		var data=result.text;
		logConsole(data);
		
		/*$.mobile.changePage( "#dialogPage", 
		{
				transition: "pop",
				role: "dialog",
				reverse: false,
		});
		
		<div data-role="page" id="dialogPage">
			<div data-role="header" data-theme="b">
				<h2>Registration Status</h2>
			 </div>
			 <div data-role="content">
				
			</div>
		</div>
		
		
		*/
		
		document.forms[0].action="EventCheckPay.html";
	    document.forms[0].submit();
		 
		//alert('Scancode='+data);
		
		/*if(data.length>0)
		{
			//showAlert("You have Scanned Code.");
			var scanArr=new Array();
			
			if(data.indexOf(':')!=-1)
			{
				
				scanArr=data.split(":");
				
				if(scanArr.length!=5)
				{
					showAlert("Sorry,QR Code is mismatch.");
			  		return;
				}
				
				var tokenID=window.localStorage.getItem("TokenID");
				var leadID= scanArr[4];
				
				if(check_network())
				{
				   loadingScrnDsply();
				   sendRequestCompany(tokenID,leadID);
				}
			}
			else
			{
			
			  showAlert("Sorry,QR Code is mismatch.");
			  return;
				
			}
		}
		else
		{
			
			showAlert("Sorry, currently we are unable to process your request. Please try later.");
			return;
		}*/
	
    }, function(error) 
    {
        showAlert("Scan failed: " + error);
    });
}






document.addEventListener("deviceready", onDeviceReady, false);
function onDeviceReady()
{

	var username=window.localStorage.getItem("username");
	document.getElementById('title').innerHTML="Notes";
	navigator.geolocation.getCurrentPosition(onSuccess, onError);
}

// onSuccess Geolocation
function onSuccess(position) 
{
 var latitude=position.coords.latitude ;
 var longitude=position.coords.longitude ;
 var altitude=position.coords.altitude;
 var IMEI=device.uuid ;
 
// alert("latitude="+latitude+"longitude="+longitude);
 window.localStorage.setItem("latitude",latitude);
 window.localStorage.setItem("longitude",longitude);
 window.localStorage.setItem("altitude",altitude);
 window.localStorage.setItem("IMEI",IMEI);
 
}


function onError(error)
{
	//alert('code: '    + error.code    + '\n' +'message: ' + error.message + '\n');
	
	switch(error.code) 
    {
    case error.PERMISSION_DENIED:
      showAlert("User denied the request for Geolocation.");
      break;
    case error.POSITION_UNAVAILABLE:
     showAlert("Location information is unavailable.");
      break;
    case error.TIMEOUT:
      showAlert("The request to get user location timed out.");
      break;
    case error.UNKNOWN_ERROR:
      showAlert("An unknown error occurred.");
      break;
    }
	
}

function sendTowebservice()
{

    loadingScrnDsply() ;
    var latitude=window.localStorage.getItem("latitude");;
    var longitude=window.localStorage.getItem("longitude");
    var altitude=window.localStorage.getItem("altitude");
	
	var IMEI=window.localStorage.getItem("IMEI");
  	var usernameStore=window.localStorage.getItem("username");
    var message=document.getElementById("message").value;
	
	var tokenID=window.localStorage.getItem("TokenID");
	
	//if(altitude==null)
	  altitude="31";
	  if(latitude==null)
           latitude='0';
	  if(longitude==null)
           longitude='0';	   
		   

	/*var varType="GET";
	var varUrl=urlCall()+"/AddComments?sTokenID="+tokenID+"&sLat="+latitude+"&sLon="+longitude+"&sAlt="+altitude+"&sComments="+message;
	var varData="";
	logConsole(varUrl);
    var varContentType="text/xml";
    var varDataType="xml";
    var varProcessData="true";
    $.get(varUrl,
				function(data){ $.ajax({
               type          : varType, 
               url           : varUrl, 
               data          : varData, 
               contentType   : varContentType,
               processdata   : varProcessData, //True or False
               dataType: "text",  success: function(data)
               {
					logConsole(data);
					stopLoadin();
					getResponse(data)
					
                    		
               },
			  failure: function(data)
               {
            	   alert("FAILED");
				   stopLoadin();
               }, async:false
                 });
      });
	  */
	  
	 var varUrl=urlCall()+"/AddComments";
	 var qStrings="sTokenID="+tokenID+"&sLat="+latitude+"&sLon="+longitude+"&sAlt="+altitude+"&sComments="+message;
	 logConsole(varUrl+' qStrings='+qStrings);
	 $.ajax({
			  type: "POST",
			  url: varUrl,
			  cache: false,
			  data: qStrings,
			  timeout: ajaxTimeOut,
			  contentType:"application/x-www-form-urlencoded",
			  dataType: "text", success: function(data)
			  {
				 	logConsole(data);
					stopLoadin();
					getResponse(data)
			  	 
			  },
			  dataType: "text", error: function(a,b,c)
			  {
				  if (b === "timeout")
				  {
					
				     stopLoadin();
			         showAlert("Not able to communicate to with Server, Try again later.");
					 
			      }
			  }
		});
	  
	
}

function getResponse(data)
{
	
	if(data.indexOf('>')==-1)
	{
		showAlert("Currently we are unable to process your request. Please try later.");
		return;
	}
	
	var respArray = new Array();
	respArray=data.split(">");
	var result=respArray[2].substring(0,respArray[2].length-8);
	//alert(result);
	if(result=="Success")
	{
		showAlert('You have successfully submitted information.');
		
		
	}
	else
	{
		showAlert('Operation is not successfull.');
		
	}

}

function Back()
{
	var setNote=window.localStorage.getItem('setNotes');
	
	if(	setNote=='1')
	{
		document.forms[0].action="main_menu.html";
		document.forms[0].submit();
	}
	else
	{
		document.forms[0].action="Lead.html";
		document.forms[0].submit();
	}

}







document.addEventListener( "deviceready", onDeviceReady,false );
var CommentDate=new Array();
var Notes=new Array();
function onDeviceReady()
 {
	loadingScrnDsply();
	var tokenID=window.localStorage.getItem("TokenID");
	var LeadID=window.localStorage.getItem('LeadID');
	sendViewNotesList(tokenID,LeadID);
	
 }
 
  
function Back()
{
    	  document.forms[0].action="LeadInfo.html";
		  document.forms[0].submit();
	
  
}
		    
function sendViewNotesList(tokenID,LeadID)
{	
	/*var varType="GET";
	var varUrl=urlCall()+"/ViewLeadNotes?sTokenID="+tokenID+"&sLeadID="+LeadID;
	var varData="";
	logConsole(varUrl);
    var varContentType="text/xml";
    var varDataType="xml";
    var varProcessData="true";
    //$.post('http://45.pmam.com/PMAMCRMsms/ValidateDesktopUser.asmx/ValidateUser?sUserName="+username+"&sPassword="+password,
    $.get(varUrl,
				function(data){ $.ajax({
               type          : varType, 
               url           : varUrl, 
               data          : varData, 
               contentType   : varContentType,
               processdata   : varProcessData, //True or False
               dataType: "text/json",  success: function(data)
               {
					logConsole(data);
					stopLoadin();
					getResponse(data);
		       },
			  error: function(data)
               {
            	  logConsole(data);
				   stopLoadin();
				   showAlert("Sorry, currently we are unable to process your request. Please try later.");
				   Back();
				   
               }, async:false
                 });
      });
	  
	  */
	  
	 var varUrl=urlCall()+"/ViewLeadNotes";
	 var qStrings="sTokenID="+tokenID+"&sLeadID="+LeadID;
	 logConsole(varUrl+' qStrings='+qStrings);
	 $.ajax({
			  type: "POST",
			  url: varUrl,
			  cache: false,
			  data: qStrings,
			  timeout: ajaxTimeOut,
			  contentType:"application/x-www-form-urlencoded",
			  dataType: "text", success: function(data)
			  {
				 	logConsole(data);
					stopLoadin();
					getResponse(data);
			  	 
			  },
			  dataType: "text", error: function(a, b, c)
			  {
				  if (b === "timeout")
				  {
					
				     stopLoadin();
			         showAlert("Not able to communicate to with Server, Try again later.");
					 Back();
			      }
				  
			  }
		});
	
}

/********************************************************************/
function getResponse(data)
{
	if(data.indexOf('>')==-1)
	{
		showAlert("Currently we are unable to process your request. Please try later.");
		return;
	}
	
	var respArray = new Array();
	respArray=data.split(">");
	var result=respArray[2].substring(0,respArray[2].length-8);
	//alert(result);
	if(result=="Failed")
	{
	 showAlert('Currently we are unable to process your request. Please try later.');
	 Back();
			
	}
	
	else
	{
		responseGrid(result);
		
	}

}

function responseGrid(result)
{
	var data = JSON.parse(result);
    var NoteLength=data.LeadNote.length;
    console.log('No. of NoteLength ='+NoteLength);
	if(NoteLength==0)
	 {
		
		  showAlert('There are no notes to display.');
		  Back();
		
	 }
	 
	for(i=0;i<data.LeadNote.length;i++)
	{	
				
		 CommentDate[i]=data.LeadNote[i].CommentDate;
		 Notes[i]=data.LeadNote[i].Notes;
	}	
	
	
	var i=0;
	dv = document.getElementById('viewID'); 
	var gridText="";
	
	//var Notes=new Array('Notes 1','Notes 2','Notes 3','Notes 4','Notes 5','Notes 6');
	//var CommentDate=new Array('25/12/2012','26/12/2012','20/12/2012','25/12/2012','26/12/2012','20/12/2012');

	
	gridText=gridText+'<div class="ui-grid-a grid-head"><div class="ui-block-a header">&nbsp;&nbsp;Dates</div><div class="ui-block-b header">Notes</div>';
		
	for(i=0;i<CommentDate.length;i++)
	{
	
	gridText=gridText+'<li><div class="clear"></div><div class="ui-grid-a"><div class="ui-block-a" id="dateID">&nbsp;&nbsp;'+CommentDate[i]+'</div><div class="ui-block-b">'+Notes[i]+'</div></div></li>' ;	
	
	}
	
	gridText=gridText+'</ul></div>';
	//dv.innerHTML=gridText;
	dv.innerHTML=gridText+'<br/><br/><fieldset class="last"><div class="midcontent"><div style="float:right; width:100%"><input type="button" value="Back" class="submit"  onclick="Back();"/></div></div></fieldset><br/><br/>';
	
}








//Leads
function  Move1() 
{
	document.forms[0].action="ScheduleSearchLead.html";
	document.forms[0].submit();
}

function Move2()
{
document.forms[0].action="ScheduleCallList.html";
document.forms[0].submit();

}




function Back()
{
document.forms[0].action="main_menu.html";
document.forms[0].submit();

}





document.addEventListener( "deviceready", onDeviceReady,false );
var Item_ID=new Array();
var Item_Desc=new Array();
var Subject_Matter=new Array();
var Item_Initiate_Date=new Array();
var Item_InitBy=new Array();
var Prime_Responsible=new Array();
var OthersInvolved=new Array();
var Status=new Array();


 function onDeviceReady()
 {
	 loadingScrnDsply();
	 var tokenID=window.localStorage.getItem("TokenID");
     sendRequestActivityList(tokenID);
		
 }
 

function Back()
{
	      var ActivityTag= window.localStorage.getItem('ActivityTag');
		  if(ActivityTag==2)
		  {
			 document.forms[0].action="LeadInfo.html";
		  	 document.forms[0].submit();
		  
		  }
		  else
		  {
			  document.forms[0].action="main_menu.html";
		  	  document.forms[0].submit();
		  }
    
}
	    
function sendRequestActivityList(tokenID)
{	
	/*var varType="GET";
	var varUrl=urlCall()+"/GetActivityList?sTokenID="+tokenID;
	var varData="";
	logConsole(varUrl);
    var varContentType="text/xml";
    var varDataType="xml";
    var varProcessData="true";
    //$.post('http://45.pmam.com/PMAMCRMsms/ValidateDesktopUser.asmx/ValidateUser?sUserName="+username+"&sPassword="+password,
    $.get(varUrl,
				function(data){ $.ajax({
               type          : varType, 
               url           : varUrl, 
               data          : varData, 
               contentType   : varContentType,
               processdata   : varProcessData, //True or False
               dataType: "text/json",  success: function(data)
               {
					//alert("Rssponse :"+data);
					logConsole(data);
					stopLoadin();
					getResponse(data);
		    },
			  error: function(data)
               {
            	   logConsole(data);
				   stopLoadin();
				   showAlert("Sorry, currently we are unable to process your request. Please try later.");
				   Back();
				   
               }, async:false
                 });
      });
	  */
	   
	 var varUrl=urlCall()+"/GetActivityList";
	 var qStrings="sTokenID="+tokenID;
	 logConsole(varUrl+' qStrings='+qStrings);
	 $.ajax({
			  type: "POST",
			  url: varUrl,
			  cache: false,
			  data: qStrings,
			  timeout: ajaxTimeOut,
			  contentType:"application/x-www-form-urlencoded",
			  dataType: "text", success: function(data)
			  {
				 	//alert("Rssponse :"+data);
					logConsole(data);
					stopLoadin();
					getResponse(data);
			  	 
			  },
			   dataType: "text", error: function(a,b,c)
			  {
				  if (b === "timeout")
				  {
					
				     stopLoadin();
			         showAlert("Not able to communicate to with Server, Try again later.");
					 Back();
			      }
			  }
		});
	  
	
}

/********************************************************************/
function getResponse(data)
{
	if(data.indexOf('>')==-1)
	{
		showAlert("Currently we are unable to process your request. Please try later.");
		return;
	}
	
	var respArray = new Array();
	respArray=data.split(">");
	var result=respArray[2].substring(0,respArray[2].length-8);
	
	if(result=="Failed")
	{
	 showAlert('Currently we are unable to process your request. Please try later.');
	 Back();
			
	}
	
	else
	{
		responseGrid(result);
		
	}
}

function responseGrid(result)
{
	var data = JSON.parse(result);
    var activityListLength=data.Activities.length;
    console.log('No. of activityListLength ='+activityListLength);
	if(activityListLength==0)
	 {
		
		  showAlert('Currently there is no activity task list .');
		  Back();
		
	 }
	 
	for(i=0;i<data.Activities.length;i++)
	{	
		 Item_ID[i]=data.Activities[i].Item_ID;
		 Item_Desc[i]=data.Activities[i].Item_Desc;
		 Subject_Matter[i]=data.Activities[i].Subject_Matter;
		 Item_Initiate_Date[i]=data.Activities[i].Item_Initiate_Date;
		 Item_InitBy[i]=data.Activities[i].Item_InitBy;
		 Prime_Responsible[i]=data.Activities[i].Prime_Responsible;
		 OthersInvolved[i]=data.Activities[i].OthersInvolved;
		 Status[i]=data.Activities[i].Status;
		 
	
		
	}	
	var i=0;
	dv = document.getElementById('viewID'); 
	var gridText="";
	/*var Invoice_NumberArr=new Array("201241","201242","201243","201244","201245","201246","201247","201248","201249","201210","2012411","201212","201213","2012414","2012415","2012416","2012417","2012418");
	var Item_Desc=new Array('Task Name 1','Task Name 2','Task Name 3','Task Name 4','Task Name 5','Task Name 6');
	var Item_Initiate_Date=new Array('25/12/2012','26/12/2012','20/12/2012','25/12/2012','26/12/2012','20/12/2012');
	var TotalAmountArr=new Array('25000','10000','8000','25000','10000','8000','25000','10000','8000','25000','10000','8000','25000','10000','8000','25000','10000','8000');
	*/
	
	gridText=gridText+'<div class="ui-grid-a grid-head"><div class="ui-block-a header">&nbsp;&nbsp;Task Name</div><div class="ui-block-b header">Initiated On</div>';
	for(i=0;i<data.Activities.length;i++)
	{
	
	gridText=gridText+'<li><div class="clear"></div><a href="ActivityView.html" onclick="setActivityListView('+i+')"><div class="ui-grid-a"><div class="ui-block-a" id="dateID">&nbsp;&nbsp;'+Item_Desc[i]+'</div><div class="ui-block-b">'+Item_Initiate_Date[i]+'<a href="#" onclick="closeActivity('+i+')"><img src="images/delete.png" align="right" class="img1" /></a><a href="ActivityView.html" onclick="setActivityListView('+i+')"><img src="images/detail.png" align="right" class="img1" /></a></div></div></a></li>' ;	
	
	}
	gridText=gridText+'</ul></div>';

	dv.innerHTML=gridText+'<br/><br/><fieldset class="last"><div class="midcontent"><div style="float:right; width:100%"><input type="button" value="Back" class="submit"  onclick="Back();"/></div></div></fieldset><br/><br/>';

}


function setActivityListView(j)
{
	 var data=Item_Desc[j]+','+Subject_Matter[j]+','+Item_InitBy[j]+','+Item_Initiate_Date[j]+','+Prime_Responsible[j]+','+Status[j];
	 window.localStorage.setItem('ActivityID',Item_ID[j]);
	 window.localStorage.setItem("ActivityView",data);
}


function closeActivity(j)
{	

	var tokenID=window.localStorage.getItem("TokenID");
	loadingScrnDsply();
	
	
	/*var varType="GET";
	var varUrl=urlCall()+"/CloseActivity?sTokenID="+tokenID+"&sActivityID="+Item_ID[j];
	var varData="";
	logConsole(varUrl);
    var varContentType="text/xml";
    var varDataType="xml";
    var varProcessData="true";
    //$.post('http://45.pmam.com/PMAMCRMsms/ValidateDesktopUser.asmx/ValidateUser?sUserName="+username+"&sPassword="+password,
    $.get(varUrl,
				function(data){ $.ajax({
               type          : varType, 
               url           : varUrl, 
               data          : varData, 
               contentType   : varContentType,
               processdata   : varProcessData, //True or False
               dataType: "text/json",  success: function(data)
               {
					logConsole(data);
					stopLoadin();
					getCloseResponse(data);
			   },
			  error: function(data)
               {
            	   logConsole(data);
				   stopLoadin();
				   showAlert("Sorry, currently we are unable to process your request. Please try later.");
				   Back();
				   
               }, async:false
                 });
      });
	  */
	  
	 var varUrl=urlCall()+"/CloseActivity";
	 var qStrings="sTokenID="+tokenID+"&sActivityID="+Item_ID[j];
	 logConsole(varUrl+' qStrings='+qStrings);
	 $.ajax({
			  type: "POST",
			  url: varUrl,
			  cache: false,
			  data: qStrings,
			  timeout: ajaxTimeOut,
			  contentType:"application/x-www-form-urlencoded",
			  dataType: "text", success: function(data)
			  {
				 	logConsole(data);
					stopLoadin();
					getCloseResponse(data);
			  	 
			  },
			  dataType: "text", error: function(a,b,c)
			  {
				  if (b === "timeout")
				  {
					
				     stopLoadin();
			         showAlert("Not able to communicate to with Server, Try again later.");
					 Back();
			      }
			  }
		});
	  
	  
	
}

/********************************************************************/
function getCloseResponse(data)
{
	var respArray = new Array();
	respArray=data.split(">");
	var result=respArray[2].substring(0,respArray[2].length-8);
	//alert(result);
	if(result=="Failed")
	{
	 
	 showAlert('Currently we are unable to process your request. Please try later.');
		
	}
	
	else 
	{
		document.forms[0].action="ActivityList.html";
		document.forms[0].submit();
	}
}



document.addEventListener( "deviceready", onDeviceReady ,false);
var LeadIDArr=new Array();
var LeadNameArr=new Array();
var LeadCityArr=new Array();
var LeadStateArr=new Array();
var LeadPhoneArr=new Array();
var result="";
var sCtr=1;
function onDeviceReady()
 {
		if(check_network())
		{
			// JQMLoadingStart();
		   loadingScrnDsply();
		   var tokenID=window.localStorage.getItem("TokenID");
		   var listID=window.localStorage.getItem("ListID");
		   var isAccount="N";
		   sendRequestList(tokenID,listID,isAccount);
	   }
	
 }
 
function Back()
{
	LeadIDArr=[];
    LeadNameArr=[];
	LeadCityArr=[];
    LeadStateArr=[];
	LeadPhoneArr=[];
	window.localStorage.setItem('Type','N');
	document.forms[0].action="ScheduleSearchLead.html";
	document.forms[0].submit();

}

 
 function sendRequestList(tokenID,listID,isAccount)
{	
	 var varType="GET";
	 var type=window.localStorage.getItem('Type');
	 
	/*if(type=='S')
	 {
		 
	    var companyName=window.localStorage.getItem('CompanyName');
	    var location=window.localStorage.getItem('Location');
		var eRange=window.localStorage.getItem('ERange');	
		 
	   var varUrl=urlCall()+"/SearchLeadDelay?sTokenID="+tokenID+"&sCompanyName="+companyName+"&sLocation="+location+"&sEmployeeRange="+eRange+"&IsAccount="+isAccount+"&sCtr="+sCtr;
	   sCtr++;
		   
	 }
	 
	else
	{ 
	    var varUrl=urlCall()+"/GetLeadForListDelay?sTokenID="+tokenID+"&sListID="+listID+"&IsAccount="+isAccount+"&sCtr="+sCtr;
		sCtr++;
	}
	var varData="";
	logConsole(varUrl);
    var varContentType="text/xml";
    var varDataType="xml";
    var varProcessData="true";
    //$.post('http://45.pmam.com/PMAMCRMsms/ValidateDesktopUser.asmx/ValidateUser?sUserName="+username+"&sPassword="+password,
    $.get(varUrl, function(data)
	{ $.ajax({
               type          : varType, 
               url           : varUrl, 
               data          : varData, 
               contentType   : varContentType,
               processdata   : varProcessData, //True or False
			   dataType: "text",  
			   
			   success: function(data)
               {
					logConsole(data);
					//JQMLoadingStop();
					 stopLoadin();
					getResponse(data);
					
					
               },
			  error: function(data)
               {
            	   logConsole(data);
				   //JQMLoadingStop();
				    stopLoadin();
				   showAlert("Sorry, currently we are unable to process your request. Please try later.");
				   Back();
				   
               }, async:false
			   
                 });
				// setTimeout ( "setToBlack()", appTimeOut());
      });
	  
	  
	 var varUrl=urlCall()+"/GetOrderDetail";
	 var qStrings="sTokenID="+tokenID+"&sInvoiceID="+InvoiceID+"&sInvoiceVersion="+InvoiceVersion;
	 logConsole(varUrl+' qStrings='+qStrings);
	 $.ajax({
			  type: "POST",
			  url: varUrl,
			  cache: false,
			  data: qStrings,
			  contentType:"application/x-www-form-urlencoded",
			  dataType: "text", success: function(data)
			  {
				 	logConsole(data);
					stopLoadin();
					getResponse(data);
			  	 
			  },
			  dataType: "text", error: function(data)
			  {
				   logConsole(data);
				   stopLoadin();
				   showAlert("Sorry, currently we are unable to process your request. Please try later.");
				   Back(); 
			  }
		});
		*/
		
	 if(type=='S')
	 {
		 
	    var companyName=window.localStorage.getItem('CompanyName');
	    var location=window.localStorage.getItem('Location');
		var eRange=window.localStorage.getItem('ERange');	
		 
	   
	   var varUrl=urlCall()+"/SearchLeadDelay";
	   var qStrings="sTokenID="+tokenID+"&sCompanyName="+companyName+"&sLocation="+location+"&sEmployeeRange="+eRange+"&IsAccount="+isAccount+"&sCtr="+sCtr;
	   sCtr++;
		   
	 }
	 
	else
	{ 
	   
		var varUrl=urlCall()+"/GetLeadForListDelay";
	    var qStrings="sTokenID="+tokenID+"&sListID="+listID+"&IsAccount="+isAccount+"&sCtr="+sCtr;
			
		sCtr++;
	}
		
		
	 
	 logConsole(varUrl+' qStrings='+qStrings);
	 $.ajax({
			  type: "POST",
			  url: varUrl,
			  cache: false,
			  data: qStrings,
			  timeout: ajaxTimeOut,
			  contentType:"application/x-www-form-urlencoded",
			  dataType: "text", success: function(data)
			  {
				 	logConsole(data);
					stopLoadin();
					getResponse(data);
			  },
			  dataType: "text", error: function(a, b, c)
			  {
				  if (b === "timeout")
				  {
					
				     stopLoadin();
			         showAlert("Not able to communicate to with Server, Try again later.");
					 Back();
			      }
				  
			  }
		});
	
}



function setToBlack()
{
	showAlert('Connection Timed Out.');
	window.location = "../www/ListLeads.html";
	
}
/********************************************************************/
function getResponse(data)
{
	if(data.indexOf('>')==-1)
	{
		showAlert("Currently we are unable to process your request. Please try later.");
		return;
	}
	
	var respArray = new Array();
	respArray=data.split(">");
	result=respArray[2].substring(0,respArray[2].length-8);
	//alert(result);
	if(result=="Failed")
	{
		showAlert('Currently we are unable to process your request. Please try later.');
		Back();
	}
	else
	{
		responseGrid();
		
	}

}
 

function responseGrid()
{
	
	var data = JSON.parse(result);
    var i=0;
	
	
	var leadLength=data.Leads.length;
	console.log('No. of Leads='+leadLength);
	
	 if(leadLength==0 && LeadIDArr.length!=0)
	 {
		 
		  showAlert('There are no more lead to display.');
		 // document.forms[0].action="ScheduleCallList.html";
		 // document.forms[0].submit();
	
	 }
	 
	 if(leadLength==0 && LeadIDArr.length==0)
	 {
		   showAlert('There are no lead to display.');
		   document.forms[0].action="ScheduleSearchLead.html";
		   document.forms[0].submit();
	
	 }
	
	
	for(i=0;i<leadLength;i++)
	{	
		LeadIDArr.push(data.Leads[i].LeadID);
		LeadNameArr.push(data.Leads[i].LeadName);
		
		
	}	
	
	var i=0;
	dv = document.getElementById('mylistid');  
	
	var gridText="";
	gridText=gridText+'<ul data-role="listview" data-inset="true" data-split-theme="a" data-filter="false"  data-filter-placeholder="Search..." id="mylistid" class="content" data-count-theme="b"> <li data-role="list-divider" data-theme="d">Leads</li>';
	 
	
	for(i=0;i<LeadNameArr.length;i++)
	{
			gridText=gridText+'<li><a href="#" onclick="setLeadID('+i+',0)">'+(i+1)+'.'+' '+LeadNameArr[i]+'</a></li>' ;	
	
	}
	
	
	gridText=gridText+'</ul>';
	
		
	
	dv.innerHTML=gridText+'<div class="clear"></div><br/><fieldset class="last"><div style="float:left; width:45%"><input type="button" value="More Leads" class="submit" data-theme="b" onclick="onDeviceReady();"/> </div><div style="float:right; width:45%"><input type="button" value="Back" class="submit" data-theme="b" onclick="Back();"/></div></fieldset></div></div>';
	
	
	
	  $('#mylistid ul').listview();
	//  $('#mylistid').listview("refresh");
	

}


function setLeadID(i)
{
	
	 window.localStorage.setItem("LeadID",LeadIDArr[i]);
	 document.forms[0].action="ScheduleCallSave.html";
	 document.forms[0].submit();
	
	
}

function searchLead()
{
	//document.forms[0].action="ScheduleSearchLead.html";
	//document.forms[0].submit();
	var companyName=document.getElementById("searchField").value;
	
	if(companyName=='')
	{
		   showAlert("Please enter lead name.");
		   return;
	}
	var location="";
	var eRange="";
			
	window.localStorage.setItem('IsAccount','N');
	window.localStorage.setItem('Type','S');
	window.localStorage.setItem('CompanyName',companyName);
	window.localStorage.setItem('Location',location);
	window.localStorage.setItem('ERange',eRange);
	document.forms[0].action="ScheduleLead.html";
	document.forms[0].submit();
	
}





var text;
function setText(textStr)
{
 
 text=textStr;

}


function getText()
{
  
 return text;
}


 /*****To write file**********/
   function writeFile()
   {
     
	  window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, gotWriteFS, fail);
   
   }
   
  /**********TO READ FILE *******************/
  function readFile()
   {
   
       window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, gotReadFS, fail);
   }
   

    function gotWriteFS(fileSystem)
    {
		var count=window.localStorage.getItem("count");
	
		if(count==null)
		{
		  count=1;	
		  window.localStorage.setItem("count",count);
		  window.localStorage.setItem("scanFileCount","scanText"+count+".txt|");	
		}
		else
		{
			var count=window.localStorage.getItem("count");
			var scanFileCount=window.localStorage.getItem("scanFileCount");
			count=parseInt(count)+1;
		    window.localStorage.setItem("count",count);
			window.localStorage.setItem("scanFileCount",scanFileCount+"scanText"+count+".txt|");	
		}
		
		//window.localStorage.setItem("scanFileCount","scanText"+count+".txt|");	
		
        fileSystem.root.getFile("scanText"+count+".txt", {create: true}, gotWriteFileEntry, fail); 
    }

    function gotReadFS(fileSystem)
    {
		
		//alert(getText());
       // fileSystem.root.getFile("scanText.txt", {create: true}, gotFileEntry, fail); 
	    fileSystem.root.getFile(getText(), {create: true}, gotFileEntry, fail); 
    }


    function gotWriteFileEntry(fileEntry)
    {
        fileEntry.createWriter(gotFileWriter, fail);
		

    }

   

    function gotFileWriter(writer)
	 {
        writer.onwrite = function(evt)
     	 {
            console.log("write success");
        };
		
		
        writer.write(getText());
		//alert('write success!!')
       /* // contents of file now 'some sample text'
        writer.truncate(11);
        // contents of file now 'some sample'
        writer.seek(4);
        // contents of file still 'some sample' but file pointer is after the 'e' in 'some'
        writer.write(" different texts");
        // contents of file now 'some different text'*/
    }
	
	
	function gotFileEntry(fileEntry) 
	{
        fileEntry.file(gotFile, fail);
    }

	
   function gotFile(file)
	{
       // readDataUrl(file);
        readAsText(file);
    }

    function readDataUrl(file)
	 {
        var reader = new FileReader();
        reader.onloadend = function(evt)
		 {
            console.log("Read as data URL");
            console.log(evt.target.result);
			alert(evt.target.result);
        };
        reader.readAsDataURL(file);
    }

    function readAsText(file)
	 {
        var reader = new FileReader();
        reader.onloadend = function(evt) 
		{
            console.log("Read as text");
            console.log(evt.target.result);
			//alert('Read as text='+evt.target.result);
			//alert(evt.target.result);
			if(evt.target.result.length<=0)
			{
				  // alert('in');
				   window.localStorage.setItem("readText","There is no contents in this file");
			}
			else
			{
			   window.localStorage.setItem("readText",evt.target.result);
			}
			
        };
        reader.readAsText(file);
		
    }


    function fail(error) {
        console.log(error.code);
    }

//Leads
function  Leads() 
{
	window.localStorage.setItem('IsAccount','N');
	window.localStorage.setItem('Type','L');
	document.forms[0].action="ListLeads.html";
    document.forms[0].submit();
}

function addLead()
{
document.forms[0].action="NewLead.html";
document.forms[0].submit();

}



// Accounts
function Accounts()
{

window.localStorage.setItem('IsAccount','Y');
window.localStorage.setItem('Type','A');
document.forms[0].action="ListLeads.html";
document.forms[0].submit();

}
// Search

function Search()
{
document.forms[0].action="Search.html";
document.forms[0].submit();

}

function Back()
{
document.forms[0].action="main_menu.html";
document.forms[0].submit();

}





// Scaning QR Coce
var scanCode = function() 
{
	window.plugins.barcodeScanner.scan(function(result) 
    {
		// result.text
		var data=result.text;
		logConsole(data);
		
		if(data.length>0)
		{
			//showAlert("You have Scanned Code.");
			var scanArr=new Array();
			
			if(data.indexOf(':')!=-1)
			{
				
				scanArr=data.split(":");
				
				if(scanArr.length!=5)
				{
					showAlert("QR Code is mismatch.");
			  		return;
				}
				
				var tokenID=window.localStorage.getItem("TokenID");
				var leadID= scanArr[4];
				
				if(check_network())
				{
				   loadingScrnDsply();
				   sendRequestCompany(tokenID,leadID);
				}
			}
			else
			{
			
			  showAlert("QR Code is mismatch.");
			  return;
				
			}
		}
		else
		{
			
			showAlert("Currently we are unable to process your request. Please try later.");
			return;
		}
	
    }, function(error) 
    {
        showAlert("Scan failed: " + error);
    });
}

function listfiles()
{

document.forms[0].action="listFiles.html";
document.forms[0].submit();


}


function Back()
{

document.forms[0].action="main_menu.html";
document.forms[0].submit();


}

function sendRequestCompany(tokenID,leadID)
{	
	/*var varType="GET";
	var varUrl=urlCall()+"/GetCompanyInformation?sTokenID="+tokenID+"&sLeadID="+leadID;
	var varData="";
	logConsole('varUrl='+varUrl);
    var varContentType="text/xml";
    var varDataType="xml";
    var varProcessData="true";
    //$.post('http://45.pmam.com/PMAMCRMsms/ValidateDesktopUser.asmx/ValidateUser?sUserName="+username+"&sPassword="+password,
    $.get(varUrl,
				function(data){ $.ajax({
               type          : varType, 
               url           : varUrl, 
               data          : varData, 
               contentType   : varContentType,
               processdata   : varProcessData, //True or False
               dataType: "text",  success: function(data)
               {
					logConsole(data);
					stopLoadin();
					getResponse(data);
					
                   		
               },
			  failure: function(data)
               {
            	  logConsole(data);
				   stopLoadin();
               }, async:false
                 });
      });
	  */
	  
	 var varUrl=urlCall()+"/GetCompanyInformation";
	 var qStrings="sTokenID="+tokenID+"&sLeadID="+leadID;
	 logConsole(varUrl+' qStrings='+qStrings);
	 $.ajax({
			  type: "POST",
			  url: varUrl,
			  cache: false,
			  data: qStrings,
			  timeout: ajaxTimeOut,
			  contentType:"application/x-www-form-urlencoded",
			  dataType: "text", success: function(data)
			  {
				 	logConsole(data);
					stopLoadin();
					getResponse(data);
			  },
			  dataType: "text", error: function(a, b, c)
			  {
				  if (b === "timeout")
				  {
					
				     stopLoadin();
			         showAlert("Not able to communicate to with Server, Try again later.");
					
			      }
				  
			  }
		});
	  
	  
	
}

function getResponse(data)
{

  // data="<?xml version='1.0' encoding='utf-8' ?><string xmlns='http://pmamcrm.com/'>Company Name: Acme Truck Line Inc<br/>This company is located at 121 Pailet Dr,Harvey,LA,70058 This is the map to reach Acme Truck Line Inc<a href='http://maps.google.co.in/maps?q=121 Pailet Dr,Harvey,LA,70058'>Click here</a><br/>Company telephone number is Phone: 504-368-2510</string>";

var subStrText=data.substring(76,data.length-9);
//alert('data='+subStrText);
setText(subStrText);
writeFile();
alert('You have succesfully write file.So please check on list files option.');

}


document.addEventListener( "deviceready", onDeviceReady );
	
var ListIDtArr=new Array();
var ListDescriptionArr=new Array();

function onDeviceReady()
 {
		if(check_network())
		{
		   var tokenID=window.localStorage.getItem("TokenID");
		   var isAccount=window.localStorage.getItem('IsAccount');
           loadingScrnDsply();
		   sendRequestList(tokenID,isAccount);
			 
	   }
	
 }
	
function Back()
{

	ListIDtArr=[];
	ListDescriptionArr=[];
	document.forms[0].action="LeadsAccount.html";
	document.forms[0].submit();
}

///Call webservice using Ajax
/*************************************************/			    
function sendRequestList(tokenID,isAccount)
{	
	var varType="GET";
	var varUrl=urlCall()+"/GetList?sTokenID="+tokenID+"&IsAccount="+isAccount;
	var varData="";
	console.log(varUrl);
    var varContentType="text/xml";
    var varDataType="xml";
    var varProcessData="true";
    //$.post('http://45.pmam.com/PMAMCRMsms/ValidateDesktopUser.asmx/ValidateUser?sUserName="+username+"&sPassword="+password,
    $.get(varUrl,
				function(data){ $.ajax({
               type          : varType, 
               url           : varUrl, 
               data          : varData, 
               contentType   : varContentType,
               processdata   : varProcessData, //True or False
               dataType: "text/json",  success: function(data)
               {
					//alert("Rssponse :"+data);
					//console.log(data);
					stopLoadin();
					getResponse(data);
					
					
               },
			  error: function(data)
               {
            	   console.log(data);
				   stopLoadin();
				   alert("Currently we are unable to process your request. Please try later.");
				   
               }, async:false
                 });
      });
	
}

/********************************************************************/
function getResponse(data)
{
	var respArray = new Array();
	respArray=data.split(">");
	var result=respArray[2].substring(0,respArray[2].length-8);
	//alert(result);
	if(result=="Failed")
	{
	 alert('Currently we are unable to process your request. Please try later.');
			
	}
	
	else
	{
		responseGrid(result);
		
	}

}



function responseGrid(result)
{
	
   var data = JSON.parse(result);
   
    var leadListLength=data.List.length;
    console.log('No. of List Leads='+leadListLength);
	if(leadListLength==0)
	 {
		
		  alert('There are no List Lead.');
		  Back();
		
	 }
	 
   
   
  
	for(i=0;i<data.List.length;i++)
	{	
		ListIDtArr[i]=data.List[i].ListID;
		ListDescriptionArr[i]=data.List[i].ListDescription;
		
	}			
			
	
	var i=0;
	dv = document.getElementById('grid'); 
	var gridText="";
	gridText=gridText+'<div class="ui-grid-b grid-head"><div class="ui-block-a">List Name</div></div></div>';
	 
	for(i=0;i<ListDescriptionArr.length;i++)
	{
	
		gridText=gridText+'<div class="ui-grid-b"><div class="ui-block-a" id="dateID"><a href="Lead.html" onclick="setListID('+ListIDtArr[i]+')">'+ListDescriptionArr[i]+'</a></div><div class="ui-block-b"></div><div class="ui-block-c" id="amountID"><a href="Lead.html" onclick="setListID('+ListIDtArr[i]+')" ><img src="images/folder.png" /></div></div>' ;		
		
	
	}
	
	
	dv.innerHTML=gridText+'<br/><br/><fieldset class="last"><div class="midcontent"><div style="float:right; width:100%"><input type="button" value="Back" class="submit"  onclick="Back();"/></div></div></fieldset>';
	
	//console.log('gridText='+gridText);
	
}


function setListID(listID)
{
	
	 window.localStorage.setItem("ListID",listID);
	
}


(function($)
 {
    $.fn.quickPagination = function(options)
	 {
        var defaults = 
		{
            pageSize: 15,
            currentPage: 1,
            holder: null,
            pagerLocation: "after"
        };
        var options = $.extend(defaults, options);
        return this.each(function()
		 {
            var selector = $(this);
            var pageCounter = 1;
            selector.wrap("<div class='simplePagerContainer'></div>");
            selector.parents(".simplePagerContainer").find("ul.simplePagerNav").remove();
            selector.children().each(function(i)
			 {
                if (i < pageCounter * options.pageSize && i >= (pageCounter - 1) * options.pageSize) 
				{
                    $(this).addClass("simplePagerPage" + pageCounter);
                } else
				 {
                    $(this).addClass("simplePagerPage" + (pageCounter + 1));
                    pageCounter++;
                }
            });
            selector.children().hide();
            selector.children(".simplePagerPage" + options.currentPage).show();
            if (pageCounter <= 1)
			 {
                return;
            }
            var pageNav = "<ul class='simplePagerNav'>";
            for (i = 1; i <= pageCounter; i++) 
			{
                if (i == options.currentPage) 
				{
                    pageNav += "<li class='currentPage simplePageNav" + i + "'><a rel='" + i + "' href='#'>" + i + "</a></li>";
                }
				 else 
				{
                    pageNav += "<li class='simplePageNav" + i + "'><a rel='" + i + "' href='#'>" + i + "</a></li>";
                }
            }
            pageNav += "</ul>";
			
            if (!options.holder) 
			{
                switch (options.pagerLocation)
				 {
                case "before":
                    selector.before(pageNav);
                    break;
                case "both":
                    selector.before(pageNav);
                    selector.after(pageNav);
                    break;
                default:
                    selector.after(pageNav);
                }
            }
			 else 
			{
                $(options.holder).append(pageNav);
            }
            selector.parent().find(".simplePagerNav a").click(function() 
			{
                var clickedLink = $(this).attr("rel");
                options.currentPage = clickedLink;
                if (options.holder) 
				{
                    $(this).parent("li").parent("ul").parent(options.holder).find("li.currentPage").removeClass("currentPage");
                    $(this).parent("li").parent("ul").parent(options.holder).find("a[rel='" + clickedLink + "']").parent("li").addClass("currentPage");
					
                }
				 else 
				 {
                    $(this).parent("li").parent("ul").parent(".simplePagerContainer").find("li.currentPage").removeClass("currentPage");
                    $(this).parent("li").parent("ul").parent(".simplePagerContainer").find("a[rel='" + clickedLink + "']").parent("li").addClass("currentPage");
                }
                selector.children().hide();
                selector.find(".simplePagerPage" + clickedLink).show();
                return false;
            });
        });
    }
})(jQuery);


document.addEventListener("deviceready", onDeviceReady, false);

var leadName="";
var contactName="";
var email="";
var phone="";
var fax="";
var website="";
var address="";
var city="";
var state="";
var zipCode="";
var country="";

function onDeviceReady()
{
	
	
}



function addLead()
{
	if(check_network())
		{
		  if(validate())
		  {
			  if(checkEmail())
			  {
				// document.getElementById('folderName').focus(); 
				  loadingScrnDsply();
				 senRequestRegistration();
				
			  }
			  
		  }
		}
	
}


function otherSelect() 
{
	 	
		var selectValue=document.getElementById("ListItems").value;
		
		if (selectValue == "other") 
		{
			
			//document.getElementById("otherBox").style.display = 'block';
			document.getElementById("otherBox").style.visibility = "visible";
		}
		else 
		{ 
		    //document.getElementById("otherBox").style.display = 'none';
			document.getElementById("otherBox").style.visibility = "hidden";
			
		}
           
 }

 
function senRequestRegistration()
{	

   	folderName=document.getElementById("folderName").value;
	company_Name=document.getElementById("leadName").value;
	contactName=document.getElementById("contactName").value;
	phone=document.getElementById("phone").value;
	email=document.getElementById("email").value;
	fax=document.getElementById("fax").value;
	website=document.getElementById("website").value;
	address=document.getElementById("address").value;
	city=document.getElementById("city").value;
	state=document.getElementById("state").value;
	zipCode=document.getElementById("zipCode").value;
	country=document.getElementById("country").value;
	
	var employeeCount="";
	var revenue="";
	var sicNo="";
	var sicDesc="";
	var ResearchAnalysis="";
	var basketID="";
	var nextCallDt="";
	var totLikelySales="";
	var expectedClosingDt="";
	var researchAnalysis="";
	
	//folderName=folderName.replace(/^\s+|\s+$/g,'');
    folderName=stringTrim(folderName); 
 	
	var leadInfo='"LeadInfo":[{"ClientID":"1","Company_Name":"'+company_Name+'","Website":"'+website+'","EmployeeCount":"'+employeeCount+'","Revenue":"'+revenue+'","Address":"'+address+'","City":"'+city+'","State":"'+state+'","ZipCode":"'+zipCode+'","Phone":"'+phone+'","Fax":"'+fax+'","SicNo":"'+sicNo+'","SicDesc":"'+sicDesc+'","ResearchAnalysis":"'+researchAnalysis+'","BasketID":"'+basketID+'","BasketDesc":"'+folderName+'","NextCallDt":"'+nextCallDt+'","TotLikelySales":"'+totLikelySales+'","ExpectedClosingDt":"'+expectedClosingDt+'","IsAccount":"N"}],';
	
	
	var contactInfo="";	
	var  contact='"LeadContactInfo":[';
	
	//for(var i=0;i<contactID.length;i++)	
	for(var i=0;i<1;i++)	
	{
		if(contactInfo=="")
		{
			contactInfo='{"ClientID":"1","LeadID":"0","ContactID":"0","ContactName":"'+contactName+'","Designation":"","Phone":"'+phone+'","HomePhone":"","CellPhone":"","AssistantName":"","AssistantWorkPhone":"","AssistantCellPhone":"","OfficePhone":"","OfficeMobile":"","Email":"'+email+'"}';	
		}
		else
		{
			contactInfo+=',{"ClientID":"1","LeadID":"0","ContactID":"0","ContactName":"'+contactName+'","Designation":"","Phone":"'+phone+'","HomePhone":"","CellPhone":"","AssistantName":"","AssistantWorkPhone":"","AssistantCellPhone":"","OfficePhone":"","OfficeMobile":"","Email":"'+email+'"}';		
		}
	
	}
	
	 contact=contact+ contactInfo +']';
  	var editLead='{'+leadInfo+contact+'}';
	
	var tokenID=window.localStorage.getItem("TokenID");
		 
	 /* POST DATA*/
	 var varUrl=urlCall()+"/AddNewLead";
	// qStrings='{"sTokenID":'+tokenID+'","sData":"'+editLead+'"}';
	 qStrings="sTokenID="+tokenID+"&sData="+editLead;
	 logConsole(varUrl+' qStrings='+qStrings);
	 $.ajax({
			  type: "POST",
			  url: varUrl,
			  cache: false,
			  data: qStrings,
			  timeout: ajaxTimeOut,
			  contentType:"application/x-www-form-urlencoded",
			  dataType: "text", success: function(data)
			  {
				 	logConsole(data);
					stopLoadin();
					getResponse(data);
					
			  	 
			  },
			   dataType: "text", error: function(a, b, c)
			  {
				  if (b === "timeout")
				  {
					
				     stopLoadin();
			         showAlert("Not able to communicate to with Server, Try again later.");
					 
			      }
				  
			  }
		});
	
}


function getResponse(data)
{
	
	if(data.indexOf('>')==-1)
	{
		showAlert("Currently we are unable to process your request. Please try later.");
		return;
	}
	
	var respArray = new Array();
	respArray=data.split(">");
	
		var result=respArray[2].substring(0,respArray[2].length-8);
	//alert(result);
	if(result=="Failed")
	{
		
		showAlert('Operation is not successfull.');
		
		
	}
	else if(result=="Success")
	{
		 showAlert('You have Successfully added lead.');
		 document.forms[0].action="LeadsAccount.html";
		 document.forms[0].submit();
		
	}
	else
	{
		
		showAlert(result);
	}
	
}




function validate()
{
	folderName=document.getElementById("folderName").value;
	leadName=document.getElementById("leadName").value;
	contactName=document.getElementById("contactName").value;
	phone=document.getElementById("phone").value;
	email=document.getElementById("email").value;
	address=document.getElementById("address").value;
	city=document.getElementById("city").value;
	state=document.getElementById("state").value;
	zipCode=document.getElementById("zipCode").value;
	country=document.getElementById("country").value;
	
	if(folderName=="")
	{
		showAlert("Please Enter Lead folder Name.");
		document.getElementById('folderName').focus();
		return false;
		
	}
	else if(leadName=="")
	{
		showAlert("Please Enter Lead Name.");
		document.getElementById('leadName').focus();
		return false;
		
	}
	else if(contactName=="")
	{
		/*showAlert("Please Enter Contact Name.");
		document.getElementById('contactName').focus();
		return false;
		*/
	}
	else if(phone=="")
	{
		/*showAlert("Please Enter Phone Number.");
		document.getElementById('phone').focus();
		return false;
		*/
	}
	else if(phone.length <10)
	{
		/*showAlert("Company Phone should be atleast ten digits.");
		document.getElementById('phone').focus();
		return false;
		*/
	}
	else if(email=="")
	{
		/*showAlert("Please Enter Valid Email .");
		document.getElementById('email').focus();
		return false;
		*/
	}
	else if(address=="")
	{
		/*showAlert("Please Enter Address.");
		document.getElementById('address').focus();
		return false;
		*/
	}
	else if(city=="")
	{
		/*showAlert("Please Enter City.");
		document.getElementById('city').focus();
		return false;
		*/
	}
	else if(state=="")
	{
		/*showAlert("Please Enter State.");
		document.getElementById('state').focus();
		return false;
		*/
	}
	else if(zipCode=="")
	{
		/*showAlert("Please Enter Zip/Postal Code.");
		document.getElementById('zipCode').focus();
		return false;
		*/
	}
	else if(country=="")
	{
	   /*	showAlert("Please Enter Country.");
		document.getElementById('country').focus();
		return false;
		*/
	}
	
	return true;
}


function checkEmail() 
{

  /*  var email = document.getElementById('email');
    var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;

    if (!filter.test(email.value))
	 {
		 showAlert('Please provide a valid email address');
		 document.getElementById('email').focus();
		 return false;
     }*/
	 return true;
}


function Back()
{
	
	 document.forms[0].action="LeadsAccount.html";
	 document.forms[0].submit();
	
}







/*Function to check to show login page or activation page*/
var timer_is_on=0;
function checkPage()
{
   window.location = "../www/login.html";
	// window.location = "../www/main_menu.html"
		 
}

function timedCount()
{
	checkPage();
}

function goSplash()
{
	setTimeout("timedCount()",3000);	
}


document.addEventListener( "deviceready", onDeviceReady ,false);

var ID=new Array();
var Subject=new Array();
var ScheduleDateTime=new Array();
var CompanyName=new Array();
var Contacts=new Array();
var Phone=new Array();
var Email=new Array();
var Attendees=new Array();


var sCtr=1;
var DateFormatInput="mm/dd/yyyy";
var CheckBoxFlag=0;

var deleteIndex=0;
var deleteCall="";

var todayCall=0;

function onDeviceReady()
 {
		if(check_network())
		{
		   // JQMLoadingStart();
		    

		   loadingScrnDsply();
		   var tokenID=window.localStorage.getItem("TokenID");
		   sendRequestList(tokenID);
		 
	   }
	
 }

 function datePickerFromDate()
 {
	 
	 new JsDatePick({
			useMode:2,
			target:"FromDate",
			dateFormat:"%d-%M-%Y"
			
		});
 }
 
  function datePickerToDate()
 {
	 
	 new JsDatePick({
			useMode:2,
			target:"ToDate",
			dateFormat:"%d-%M-%Y"
			
		});
 }
 
function sendRequestList(tokenID)
{	
	   /* POST DATA*/
	var varUrl=urlCall()+"/GetScheduleCallList";
	var qStrings="sTokenID="+tokenID+"&sFromDate="+$('#FromDate').val()+"&sToDate="+$('#ToDate').val()+"&sCtr="+sCtr;
	sCtr++;
		
	
	 logConsole(varUrl+' qStrings='+qStrings);
	 $.ajax({
			  type: "POST",
			  url: varUrl,
			  cache: false,
			  data: qStrings,
			  timeout: ajaxTimeOut,
			  contentType:"application/x-www-form-urlencoded",
			  dataType: "text", success: function(data)
			  {
				 	logConsole(data);
					// JQMLoadingStop();
					 stopLoadin();
					getResponse(data);
			  	 
			  },
			  dataType: "text", error: function(a,b,c)
			  {
				  if (b === "timeout")
				  {
					
				     stopLoadin();
			         showAlert("Not able to communicate to with Server, Try again later.");
					 Back();
			      }
			  }
		});
	  
	  
}

/********************************************************************/
function getResponse(data)
{
	
	if(data.indexOf('>')==-1)
	{
		showAlert("Currently we are unable to process your request. Please try later.");
		return;
	}
	var respArray = new Array();
	respArray=data.split(">");
	result=respArray[2].substring(0,respArray[2].length-8);
	//alert(result);
	if(result=="Failed")
	{
		showAlert('Currently we are unable to process your request. Please try later.');
		Back();
		
	}
	else
	{
		responseGrid(result);
		
	}

}
 

function responseGrid(result)
{
	
	var data = JSON.parse(result);
  	var ListLength=data.List.length;
	
	console.log('No. of Schedule Call='+ListLength);
	
	 if(ListLength==0 && ID.length!=0)
	 {
		if(todayCall==1 && sCtr==1) 
		{
			 
			 var i=0;
			dv = document.getElementById('mylistid');  
			
			var gridText="";
			gridText=gridText+'<ul data-role="listview"  data-divider-theme="a" data-split-theme="a" data-inset="true"><li  data-role="list-divider" >No call scheduled.</li>';
			 
			gridText=gridText+'</ul>';
			
			dv.innerHTML=gridText;
			$('#mylistid ul').listview();
		}
		else
		{
			
			 showAlert('There are no more schedule call list to display.');
			 
		}
		return;
		 	
	 }
	 
	 if(ListLength==0 && ID.length==0)
	 {
		 
	  // showAlert('There are no  schedule call list to display.');
	   
	    var i=0;
		dv = document.getElementById('mylistid');  
		
		var gridText="";
		gridText=gridText+'<ul data-role="listview"  data-divider-theme="a" data-split-theme="a" data-inset="true"><li  data-role="list-divider" >No call scheduled.</li>';
		 
		gridText=gridText+'</ul>';
		
		dv.innerHTML=gridText;
		$('#mylistid ul').listview();
		return;
	
		 	
	 }
	 
	
	
	
	for(i=0;i<ListLength;i++)
	{	
		ID.push(data.List[i].ScheduleId);
		Subject.push(data.List[i].Subject);
		CompanyName.push(data.List[i].Company_Name);
		Contacts.push(data.List[i].ContactName);
		Phone.push(data.List[i].Phone);
		Email.push(data.List[i].Email);
		Attendees.push(data.List[i].Attendees);
		ScheduleDateTime.push(data.List[i].ScheduleCallDate);
		
	}
	
	 
	var i=0;
	dv = document.getElementById('mylistid');  
	
	var gridText="";
	gridText=gridText+'<ul data-role="listview"  data-divider-theme="a" data-split-theme="a" data-inset="true"><li  data-role="list-divider" >Pending Schedule Calls</li>';
	 
	
	for(i=0;i<ID.length;i++)
	{
		
		gridText=gridText+'<li data-icon="delete"><a href="#"><fieldset data-role="controlgroup" ><input type="checkbox" name="checkbox-'+i+'" id="checkbox-'+i+'" /><label for="checkbox-'+i+'" style="border-style:none" ><label><h3>'+Subject[i]+'</h3><p><strong>Date/Time</strong>:'+ScheduleDateTime[i]+'</p><p><strong>Company Name</strong>:'+CompanyName[i]+'</p><p><strong>Contact</strong>:'+Contacts[i]+'</p><p><strong>Phone</strong>:'+Phone[i]+'</p><p><strong>Email</strong>:'+Email[i]+'</p><p><strong>Attendees</strong>:'+Attendees[i]+'</p></label></label></fieldset></a><a href="#" onClick="Delete('+i+')"></a></li>' ;	
			
	
	}
	
	
	gridText=gridText+'</ul>';
	
		
	
	dv.innerHTML=gridText+'<div class="clear"></div><br/><fieldset class="last"><div style="float:right; width:45%"><input type="button" value="Remove Call" id="removeCall" class="submit" data-theme="b" onclick="removeCall();"/> </div><div style="float:left; width:45%"><input type="button" value="More" id="More" class="submit" data-theme="b" onclick="onDeviceReady();"/></div></fieldset></div></div>';
	
	
	
	$('#mylistid ul').listview();
	$("input[type='checkbox']").checkboxradio();
   /* $("input[type='radio']").checkboxradio();
	$("input[type='text']").textinput();*/
		
    $('#removeCall').button();
    $('#More').button();
	//  $('#mylistid').listview("refresh");
	

}

 
 function SearchCall()
 {
	 sCtr=1;
	 if($('#FromDate').val()=="")
	 {
		 showAlert('Enter date from which the schedule call will be applicable.');
		 return;
	 }
	 else if($('#ToDate').val()=="")
	 {
		 showAlert('Enter date to which the schedule call will be applicable.');
		 return;
	 }
	 if(check_network())
	 {
		   // JQMLoadingStart();
		   loadingScrnDsply();
		   var tokenID=window.localStorage.getItem("TokenID");
		   sendRequestList(tokenID)
		 
	   }
	 
 }
 

 
function Delete(index)
{
	
	
	deleteIndex=index;
	
	navigator.notification.confirm(
        'You are about to remove a schedule call.Do you wish to proceed?', // message
         onConfirm,            // callback to invoke with index of button pressed
        'Confirmation',           // title
        'Cancel,Delete'         // buttonLabels
    );

}

function onConfirm(buttonIndex) 
{
        if(buttonIndex==1)
		{
			
		}
		else  if(buttonIndex==2)
		{
			
			sCtr=1;
			if(check_network())
			{
			   // JQMLoadingStart();
			   loadingScrnDsply();
			   var tokenID=window.localStorage.getItem("TokenID");
			   deleteCall=ID[deleteIndex];	
			   
			   logConsole('deleteCall='+deleteCall);
			   
			    ID=new Array();
				Subject=new Array();
				ScheduleDateTime=new Array();
				CompanyName=new Array();
				Contacts=new Array();
				Phone=new Array();
				Email=new Array();
				Attendees=new Array();
			   
			   		   
			   getDeleteList(tokenID,deleteCall);
			 
		   }
		}
    
}

function getDeleteList(tokenID,sNotificationID)
{	

	 /* POST DATA*/
	var varUrl=urlCall()+"/DeleteScheduledCalls";
	var qStrings="sTokenID="+tokenID+"&sActivityID="+sNotificationID;
	
	 logConsole(varUrl+' qStrings='+qStrings);
	 $.ajax({
			  type: "POST",
			  url: varUrl,
			  cache: false,
			  data: qStrings,
			  timeout: ajaxTimeOut,
			  contentType:"application/x-www-form-urlencoded",
			  dataType: "text", success: function(data)
			  {
				 	logConsole(data);
					// JQMLoadingStop();
					stopLoadin();
					getDeleteListResponse(data);
			  	 
			  },
			  dataType: "text", error: function(a,b,c)
			  {
				  if (b === "timeout")
				  {
					
				     stopLoadin();
			         showAlert("Not able to communicate to with Server, Try again later.");
					 Back();
			      }
			  }
		});
	  
	  
}




/********************************************************************/
function getDeleteListResponse(data)
{
	
	if(data.indexOf('>')==-1)
	{
		showAlert("Currently we are unable to process your request. Please try later.");
		return;
	}
	var respArray = new Array();
	respArray=data.split(">");
	result=respArray[2].substring(0,respArray[2].length-8);
	//alert(result);
	if(result=="Failed")
	{
		showAlert('Currently we are unable to process your request. Please try later.');
		
		
	}
	else if(result=="Success")
	{
		showAlert('Pending calls has been deleted succesfully.');
		onDeviceReady();
		
	}

}


 
function Back()
{
	 document.forms[0].action="ScheduleMenu.html";
	 document.forms[0].submit();
	
}

function getSearchCall()
{
	ID=new Array();
	Subject=new Array();
	ScheduleDateTime=new Array();
	CompanyName=new Array();
	Contacts=new Array();
	Phone=new Array();
	Email=new Array();
	Attendees=new Array();
	
	todayCall=0;
	datePickerFromDate();
	datePickerToDate()
	document.getElementById('searchCallID').style.display='block';
	
}

function getTodayCall()
{
	ID=new Array();
	Subject=new Array();
	ScheduleDateTime=new Array();
	CompanyName=new Array();
	Contacts=new Array();
	Phone=new Array();
	Email=new Array();
	Attendees=new Array();
	
	todayCall=1;
	document.getElementById('searchCallID').style.display='none';
	$('#FromDate').val('');
	$('#ToDate').val('');
	sCtr=1;
	onDeviceReady();
	
}

function removeCall()
{
	
	if(toCheckCheckBox()==0)
	{
		alert('Please select atleast one call to remove');
		
	}
	else
	{      
	
	        deleteCall="";
			for(i=0;i<ID.length;i++)
			{
				if(document.getElementById('checkbox-'+i).checked==true)
				{
				 deleteCall=deleteCall+ID[i]+',';
				}
			}
		  
		   deleteCall=deleteCall.substring(0,deleteCall.length-1); 
		   logConsole('deleteCall='+deleteCall);
		
		    sCtr=1;
			if(check_network())
			{
			   // JQMLoadingStart();
			    ID=new Array();
				Subject=new Array();
				ScheduleDateTime=new Array();
				CompanyName=new Array();
				Contacts=new Array();
				Phone=new Array();
				Email=new Array();
				Attendees=new Array();
				
			   loadingScrnDsply();
			   var tokenID=window.localStorage.getItem("TokenID");
			   getDeleteList(tokenID,deleteCall);
			 
		   }
	}
	
}


function toCheckCheckBox()
{
	
	for(i=0;i<ID.length;i++)
	{
		
		if(document.getElementById('checkbox-'+i).checked==true)
		{
			CheckBoxFlag=1;
			break;
			return CheckBoxFlag;
		
		}
		else
		{
			CheckBoxFlag=0;
		}
		
	}
	return CheckBoxFlag;
}


function setLeadID(i,index)
{
	 setIndex(index);
	 window.localStorage.setItem("LeadID",LeadIDArr[i]);
	 document.forms[0].action="LeadInfo.html";
	 document.forms[0].submit();
	
}

function setIndex(index)
{
	
	window.localStorage.setItem("index",index);
	
}


function convertDate(dates)
 {
	 var tempArr=new Array();
	
	 tempArr=dates.split('-');
	 if(tempArr[1].toLowerCase()=='jan' || tempArr[1].toLowerCase()=='01' || tempArr[1].toLowerCase()=='1')
	     tempArr[1]='01';
	 else if(tempArr[1].toLowerCase()=='feb' || tempArr[1].toLowerCase()=='02' || tempArr[1].toLowerCase()=='2')
	     tempArr[1]='02';
	 else if(tempArr[1].toLowerCase()=='mar' || tempArr[1].toLowerCase()=='03' || tempArr[1].toLowerCase()=='3')
	     tempArr[1]='03';
	 else if(tempArr[1].toLowerCase()=='apr' || tempArr[1].toLowerCase()=='04' || tempArr[1].toLowerCase()=='4')
	     tempArr[1]='04';
	 else if(tempArr[1].toLowerCase()=='may' || tempArr[1].toLowerCase()=='05' || tempArr[1].toLowerCase()=='5')
	     tempArr[1]='05';
	else if(tempArr[1].toLowerCase()=='jun' || tempArr[1].toLowerCase()=='06' || tempArr[1].toLowerCase()=='6')
	     tempArr[1]='06';
	else if(tempArr[1].toLowerCase()=='jul' || tempArr[1].toLowerCase()=='07' || tempArr[1].toLowerCase()=='7')
	     tempArr[1]='07';
	else if(tempArr[1].toLowerCase()=='aug' || tempArr[1].toLowerCase()=='08' || tempArr[1].toLowerCase()=='8')
	     tempArr[1]='08';
	else if(tempArr[1].toLowerCase()=='sep' || tempArr[1].toLowerCase()=='09' || tempArr[1].toLowerCase()=='9')
	     tempArr[1]='09';
	else if(tempArr[1].toLowerCase()=='oct' || tempArr[1].toLowerCase()=='10')
	     tempArr[1]='10';
	else if(tempArr[1].toLowerCase()=='nov' || tempArr[1].toLowerCase()=='11')
	     tempArr[1]='11';
	else if(tempArr[1].toLowerCase()=='dec' || tempArr[1].toLowerCase()=='12')
	     tempArr[1]='12';	 	
		 
    var date="";	
		 
	if(DateFormatInput=="dd/mm/yyyy" || DateFormatInput=="DD/MM/YYYY")	  	 	 	 	 	 	 	 	 	 
		 date= tempArr[0]+'/'+tempArr[1]+'/'+tempArr[2];
   else if(DateFormatInput=="mm/dd/yyyy" || DateFormatInput=="MM/DD/YYYY")	  	 	 	 	 	 	 	 	 	 
		 date= tempArr[1]+'/'+tempArr[0]+'/'+tempArr[2];
			 
	
	 return date;
 }





document.addEventListener( "deviceready", onDeviceReady,false );

function onDeviceReady()
 {
	 JQMLoadingStart();
	 var tokenID=window.localStorage.getItem("TokenID");
     sendRequestEventCheckPay(tokenID);
		
 }
 

function sendRequestEventCheckPay(tokenID)
{	
	var varType="GET";
	var varUrl=urlCall()+"/ValidateUser?sUserName=birdaramg@pmam.com&sPassword=pmam@123";
	var varData="";
	logConsole(varUrl);
    var varContentType="text/xml";
    var varDataType="";
    var varProcessData="true";
    $.get(varUrl,
				function(data){ $.ajax({
               type          : varType, 
               url           : varUrl, 
               data          : varData, 
               contentType   : varContentType,
               processdata   : varProcessData, //True or False
               dataType: "text",  success: function(data)
               {
					//alert("Rssponse :"+data);
					logConsole(data);
					JQMLoadingStop();
					getResponse(data);
		   	  },
			  error: function(data)
               {
            	   logConsole(data);
				   JQMLoadingStop();
				   showAlert("Currently we are unable to process your request. Please try later.");
				   Back();
				   
               }, async:false
                 });
      });
	
}


function getResponse(data)
{
	if(data.indexOf('>')==-1)
	{
		showAlert("Currently we are unable to process your request. Please try later.");
		return;
	}
	
	var respArray = new Array();
	respArray=data.split(">");
	var result=respArray[2].substring(0,respArray[2].length-8);
	
	if(result=="Failed")
	{
	 showAlert('Currently we are unable to process your request. Please try later.');
	 Back();
			
	}
	
	else
	{
		responseGrid();
		
	}
}

function responseGrid()
{
  
	
	var i=0;
	dv = document.getElementById('content'); 
	var gridText="";
	
	var Name='Bill Gates';
	var RegistrationNo='PMAM24512';
	
	var gridText = '<br/><fieldset data-role="controlgroup" data-type="vertical"><legend>Name</legend><label >'+Name+'</label></fieldset><fieldset data-role="controlgroup" data-type="vertical"><legend>Registration No</legend><label >'+RegistrationNo+'</label></fieldset>  <fieldset data-role="controlgroup" data-type="vertical" data-mini="true"><legend>Payment Status</legend><input id="radio1" name="one" value="radio1" type="radio" checked="checked"><label for="radio1">Paid</label><input id="radio2" name="one" value="radio2" type="radio"><label for="radio2">Payment not made</label></fieldset><fieldset data-role="controlgroup" data-type="vertical" data-mini="true"><legend>Attended</legend><input id="radio3" name="two" value="radio3" type="radio" ><label for="radio3">Yes</label><input id="radio4" name="two" value="radio4" type="radio" checked="checked"><label for="radio4">No</label></fieldset>' ;
		
	
	gridText=gridText+'<div class="clear"></div><fieldset class="last"><div style="float:left; width:45%"><input type="button" value="Save" data-theme="b" class="submit"  onclick="SaveStatus();"/></div><div style="float:right; width:45%"><input type="button" value="Back" data-theme="b" class="submit"  onclick="Back();"/></div></fieldset>';
	
	gridText=gridText+'</div>';
	dv.innerHTML=gridText;
	
	
	$("#page").trigger('create');

}

function SaveStatus()
{
	// get radio button state
	var PSRadioValue = $("input:radio[name ='one']:checked").val();
	var ATTRadioValue = $("input:radio[name ='two']:checked").val();
	
	// set radio button state 
	
	$('#radio2').attr("checked",true).checkboxradio("refresh");
	$('#radio1').attr("checked",false).checkboxradio("refresh");
	
	alert('radio1'+PSRadioValue);
	alert('radio2'+ATTRadioValue);
	
	
}




function Back()
{
    	  document.forms[0].action="EventParticipate.html";
		  document.forms[0].submit();
	
}

document.addEventListener( "deviceready", onDeviceReady, false );
var UserID=new Array();
var UserName=new Array();
 function onDeviceReady()
 {
	loadingScrnDsply();
	var tokenID=window.localStorage.getItem("TokenID");
	sendRequestUser(tokenID);
 }
 
var contactVal = "";
function Contact()
{
	var contactForm = document.forms.contactForm;
	
	 var x = 0;
  
	 for (x=0;x<contactForm.contact.length;x++)
	 {
		if (contactForm.contact[x].selected)
		{
				 
				 contactVal = contactVal + UserID[x] + "," ;	   
		}
	 }
}
	
function Back()
{
    	  document.forms[0].action="LeadInfo.html";
		  document.forms[0].submit();
}
	    
function sendRequestUser(tokenID)
{	
	var varType="GET";
	var varUrl=urlCall()+"/GetUsers?sTokenID="+tokenID;
	var varData="";
	logConsole(varUrl);
    var varContentType="text/xml";
    var varDataType="xml";
    var varProcessData="true";
    //$.post('http://45.pmam.com/PMAMCRMsms/ValidateDesktopUser.asmx/ValidateUser?sUserName="+username+"&sPassword="+password,
    $.get(varUrl,
				function(data){ $.ajax({
               type          : varType, 
               url           : varUrl, 
               data          : varData, 
			   timeout: ajaxTimeOut,
               contentType   : varContentType,
               processdata   : varProcessData, //True or False
               dataType: "text/json",  success: function(data)
               {
					//alert("Rssponse :"+data);
					logConsole(data);
					stopLoadin();
					getResponse(data);
			    },
			  error: function(a,b,c)
			  {
				  if (b === "timeout")
				  {
					
				     stopLoadin();
			         showAlert("Not able to communicate to with Server, Try again later.");
					 Back();
			      }
			  }, async:false
                 });
      });
	
}

/********************************************************************/
function getResponse(data)
{
	if(data.indexOf('>')==-1)
	{
		showAlert("Currently we are unable to process your request. Please try later.");
		return;
	}
	var respArray = new Array();
	respArray=data.split(">");
	var result=respArray[2].substring(0,respArray[2].length-8);
	//alert(result);
	if(result=="Failed")
	{
	 showAlert('Currently we are unable to process your request. Please try later.');
	 Back();
	}
	else
	{
		responseGrid(result);
	}
}

function responseGrid(result)
{
	
	var data = JSON.parse(result);
	var i=0;
		
	var userDetailLength=data.UserDetail.length;
	for(i=0;i<userDetailLength;i++)
	{	
	    UserID[i]=data.UserDetail[i].UserID;
		UserName[i]=data.UserDetail[i].UserName;
		
	}	
	
	var i=0;
	dv = document.getElementById('viewID'); 
	var gridText="";
	
	gridText=gridText+'<fieldset><h2><B>Create Followup Activity </B></h2></fieldset><fieldset><h2>Task Name</h2><input type="text"  name="task" id="task"    class="foo"  value="" /></fieldset><fieldset> <h2>Description</h2><textarea    id="desc" rows="5" cols="1"></textarea> </fieldset><fieldset ><h2>Initiated Date</h2><input type="text"  name="initiatDate" id="inputField"  class="foo"  value="" /></fieldset><fieldset > <h2>Next Due Date</h2><input type="text"  name="nextDueDate" id="inputField2"  class="foo"  value="" /></fieldset>';
	
	
	//Select Involve
	gridText=gridText+'<fieldset > <h2><B>Involve Others:</B> </h2><form name="contactForm" method="post" action=""><div class="state"><select name="contact" id="contact"  multiple="multiple">';
	
	for(i=0;i<UserName.length;i++)
	{
	  if(i==0)
	    gridText=gridText+'<option value="'+UserName[i]+'" selected>'+UserName[i]+'</option>';
	  else
	   gridText=gridText+'<option value="'+UserName[i]+'">'+UserName[i]+'</option>';
	  
	}
	
	gridText=gridText+'</select></div> </form></fieldset>';
	gridText=gridText+'<div class="clear"></div><br/><br/>  <fieldset class="last">  <div style="float:left; width:45%"><input type="button" value="Save" class="submit"  onclick="createActivity()"/></div><div style="float:right; width:45%"><input type="button" value="Back" class="submit"  onclick="Back()"/></div>  </fieldset>';
	
	dv.innerHTML=gridText;
	loadDatePicker();
}

function convertDate(dates)
 {	
	 var tempArr=new Array();
	 tempArr=dates.split('-');
	 if(tempArr[1].toLowerCase()=='jan' || tempArr[1].toLowerCase()=='01' || tempArr[1].toLowerCase()=='1')
	     tempArr[1]='01';
	 else if(tempArr[1].toLowerCase()=='feb' || tempArr[1].toLowerCase()=='02' || tempArr[1].toLowerCase()=='2')
	     tempArr[1]='02';
	 else if(tempArr[1].toLowerCase()=='mar' || tempArr[1].toLowerCase()=='03' || tempArr[1].toLowerCase()=='3')
	     tempArr[1]='03';
	 else if(tempArr[1].toLowerCase()=='apr' || tempArr[1].toLowerCase()=='04' || tempArr[1].toLowerCase()=='4')
	     tempArr[1]='04';
	 else if(tempArr[1].toLowerCase()=='may' || tempArr[1].toLowerCase()=='05' || tempArr[1].toLowerCase()=='5')
	     tempArr[1]='05';
	else if(tempArr[1].toLowerCase()=='jun' || tempArr[1].toLowerCase()=='06' || tempArr[1].toLowerCase()=='6')
	     tempArr[1]='06';
	else if(tempArr[1].toLowerCase()=='jul' || tempArr[1].toLowerCase()=='07' || tempArr[1].toLowerCase()=='7')
	     tempArr[1]='07';
	else if(tempArr[1].toLowerCase()=='aug' || tempArr[1].toLowerCase()=='08' || tempArr[1].toLowerCase()=='8')
	     tempArr[1]='08';
	else if(tempArr[1].toLowerCase()=='sep' || tempArr[1].toLowerCase()=='09' || tempArr[1].toLowerCase()=='9')
	     tempArr[1]='09';
	else if(tempArr[1].toLowerCase()=='oct' || tempArr[1].toLowerCase()=='10')
	     tempArr[1]='10';
	else if(tempArr[1].toLowerCase()=='nov' || tempArr[1].toLowerCase()=='11')
	     tempArr[1]='11';
	else if(tempArr[1].toLowerCase()=='dec' || tempArr[1].toLowerCase()=='12')
	     tempArr[1]='12';	 	
		 
    var date="";	
	DateFormatInput="mm/dd/yyyy";
	if(DateFormatInput=="dd/mm/yyyy" || DateFormatInput=="DD/MM/YYYY")	  	 	 	 	 	 	 	 	 	 
		 date= tempArr[0]+'/'+tempArr[1]+'/'+tempArr[2];
   else if(DateFormatInput=="mm/dd/yyyy" || DateFormatInput=="MM/DD/YYYY")	  	 	 	 	 	 	 	 	 	 
		 date= tempArr[1]+'/'+tempArr[0]+'/'+tempArr[2];
		
	 return date;
 }
 
 function validateCreateActivityData()
 {
	  task=document.getElementById('task').value;
	  description=document.getElementById('desc').value;
	  iniateDate=document.getElementById('inputField').value;
	  nextDueDate=document.getElementById('inputField2').value;
	  
	    if(task=="")
	   {
		   showAlert('Please enter a task name.');
		   document.getElementById('task').focus();
		   return false;  
		   
	   }
	  
	  if(description=="")
	   {
		   showAlert('Please enter a description.');
		   document.getElementById('desc').focus();
		  return false;  
		   
	   }
	  if(iniateDate=="")
	  {
		   showAlert('Please enter a initiate date.');
		   document.getElementById('inputField').focus();
		   return false;  
	   }
	   
	   if(nextDueDate=="")
	  {
		   showAlert('Please enter a next due date.');
		   document.getElementById('inputField2').focus();
		   
		   return false;  
	   }
	   
	  if(iniateDate.indexOf('-')==-1 || iniateDate.split('-').length-1 !=2)
	  {
		 showAlert('Please enter a valid initiate date like 01-dec-2012 or 01-12-2012.');
		 document.getElementById('inputField').focus();
		 return false; 
	  }
	 
	   if(nextDueDate.indexOf('-')==-1 || nextDueDate.split('-').length-1 !=2)
	  {
		 showAlert('Please enter a valid next due date like 01-dec-2012 or 01-12-2012.');
		 document.getElementById('inputField2').focus();
		 return false; 
	  }
	 return true;
 }

function createActivity()
{
	    var selectContactArr=new Array();
	    Contact();
					
		if(contactVal.length!=0)
		selectContactArr=contactVal.substring(0,contactVal.length-1).split(',');
		contactVal="";
		attendesstVal="";
		
	  task=document.getElementById('task').value;
	  description=document.getElementById('desc').value;
	  iniateDate=document.getElementById('inputField').value;
	  nextDueDate=document.getElementById('inputField2').value;
	  var KeyID=window.localStorage.getItem("LeadID");
	  		
	     if(validateCreateActivityData()==false)
		   return;
	   
		iniateDate=convertDate(iniateDate);
		nextDueDate=convertDate(nextDueDate);
			
		if (Date.parse(iniateDate) > Date.parse(nextDueDate)) 
		{
			showAlert("Invalid Date Range!\nInitial Date cannot be after Next Due Date!")
			return false;
         }
	  
    loadingScrnDsply();
	
	var activityInfo='"ActivityInfo":[{"TaskName":"'+task+'","TaskDesc":"'+description+'","InitiateDate":"'+iniateDate+'","NextDueDate":"'+nextDueDate+'","ActivityTypeID":"1","KeyID":"'+KeyID+'"}],';
	
	
	var contactInfo="";	
	var  contact='"OtherInvolve":[';
	for(var i=0;i<selectContactArr.length;i++)	
	{
		if(contactInfo=="")
		{
			contactInfo='{"UserID":"'+selectContactArr[i]+'"}';	
		}
		else
		{
			contactInfo+=',{"UserID":"'+selectContactArr[i]+'"}';		
		}
	}
 
    contact=contact+ contactInfo +']';
	var createActivity='{'+activityInfo+contact+'}';
	var tokenID=window.localStorage.getItem("TokenID");
	var varUrl=urlCall()+"/CreateActivity";
	 qStrings="sTokenID="+tokenID+"&sData="+createActivity;
	 logConsole(varUrl+' qStrings='+qStrings);
	 $.ajax({
			  type: "POST",
			  url: varUrl,
			  cache: false,
			  data: qStrings,
			  timeout: ajaxTimeOut,
			  contentType:"application/x-www-form-urlencoded",
			  dataType: "text", success: function(data)
			  {
				  //alert("Rssponse :"+data);
					logConsole(data);
					stopLoadin();
					getEditLeadResponse(data);
					  	 
			  },
			 dataType: "text", error: function(a,b,c)
			  {
				  if (b === "timeout")
				  {
					
				     stopLoadin();
			         showAlert("Not able to communicate to with Server, Try again later.");
					 
			      }
			  }
		});
	
}


function getEditLeadResponse(data)
{
	if(data.indexOf('>')==-1)
	{
		showAlert("Currently we are unable to process your request. Please try later.");
		return;
	}
	
	var respArray = new Array();
	respArray=data.split(">");
	var result=respArray[2].substring(0,respArray[2].length-8);
	
	if(result=="Failed")
	{
		showAlert('Currently we are unable to process your request. Please try later.');
		
	}
	else if(result=="Success")
	{
		showAlert('You have sucessfully created activity task.');
		document.forms[0].action="ActivityList.html";
        document.forms[0].submit();
		
	}
	else
	{
		
		showAlert('Currently we are unable to process your request. Please try later.');
	
	}
}

function datePicker()
 {
	 
	 new JsDatePick({
			useMode:2,
			target:"inputField",
			dateFormat:"%d-%M-%Y"
			
		});
 }
 
  function datePicker2()
 {
	 
	 new JsDatePick({
			useMode:2,
			target:"inputField2",
			dateFormat:"%d-%M-%Y"
			/*selectedDate:{				
				day:5,						
				month:9,
				year:2006
			},
			yearsRange:[1978,2020],
			limitToToday:false,
			cellColorScheme:"beige",
			dateFormat:"%m-%d-%Y",
			imgPath:"img/",
			weekStartDay:1*/
		});
 }
 
 function loadDatePicker()
 {
	 datePicker();
	 datePicker2();
 }
 




document.addEventListener( "deviceready", onDeviceReady,false );
/********LEAD INFO**********/
var clientID;
var leadID;
var company_Name;
var website;
var employeeCount;
var revenue;
var address;
var city;
var state;
var zipCode;
var leadPhone;
var fax;
var sicNo;
var sicDesc;
var researchAnalysis;
var basketID;
var nextCallDt;
var totLikelySales;
var expectedClosingDt;
/***LEAD CONTACT INFO**/
var contactID=new Array();
var nameArr=new Array();
var designationArr=new Array();
var phoneArr=new Array();
var homePhoneArr=new Array();
var cellPhoneArr=new Array();
var assistantNameArr=new Array();
var assistantWorkPhoneArr=new Array();
var assistantCellPhoneArr=new Array();
var officePhoneArr=new Array();
var officeMobileArr=new Array();
var emailArr=new Array();
var tokenID="";
var leadID="";
function onDeviceReady()
 {
	
		//if(check_network())
		{
		   tokenID=window.localStorage.getItem("TokenID");
		   leadID=window.localStorage.getItem("LeadID");
		   
		   loadingScrnDsply();
		   sendRequestList(tokenID,leadID);
		 
	   }
	
 }

function NoteSave()
{

    loadingScrnDsply() ;
	var noteDate=getTimes();
	var notes=document.getElementById('message').value;
	sData='{"LeadNote":[{"LeadID":"'+leadID+'","Notes":"'+notes+'","NoteDate":"'+noteDate+'"}]}';
	
	/*var varType="GET";
	var varUrl=urlCall()+"/AddNote?sTokenID="+tokenID+"&sData="+sData;
	var varData="";
	logConsole(varUrl);
    var varContentType="text/xml";
    var varDataType="xml";
    var varProcessData="true";
    $.get(varUrl,
				function(data){ $.ajax({
               type          : varType, 
               url           : varUrl, 
               data          : varData, 
               contentType   : varContentType,
               processdata   : varProcessData, //True or False
               dataType: "text",  success: function(data)
               {
					logConsole(data);
					stopLoadin();
					getNotesResponse(data);
					
		       },
			  failure: function(data)
               {
				   logConsole(data);
            	  showAlert("Sorry, currently we are unable to process your request. Please try later.");
				   console.log(data);
				   stopLoadin();
				   
               }, async:false
                 });
      });
	  */
	  
	 var varUrl=urlCall()+"/AddNote";
	 var qStrings="sTokenID="+tokenID+"&sData="+sData;
	 logConsole(varUrl+' qStrings='+qStrings);
	 $.ajax({
			  type: "POST",
			  url: varUrl,
			  cache: false,
			  data: qStrings,
			  timeout: ajaxTimeOut,
			  contentType:"application/x-www-form-urlencoded",
			  dataType: "text", success: function(data)
			  {
				 	logConsole(data);
					stopLoadin();
					getNotesResponse(data);
			  	 
			  },
			 dataType: "text", error: function(a,b,c)
			  {
				  if (b === "timeout")
				  {
					
				     stopLoadin();
			         showAlert("Not able to communicate to with Server, Try again later.");
					
			      }
			  }
		});
	  
	  
}

function getNotesResponse(data)
{
	if(data.indexOf('>')==-1)
	{
		showAlert("Currently we are unable to process your request. Please try later.");
		return;
	}
	
	var respArray = new Array();
	respArray=data.split(">");
	var result=respArray[2].substring(0,respArray[2].length-8);
	//alert(result);
	if(result=="Success")
	{
		showAlert('You have successfully submitted information.');
		
		
	}
	else
	{
		showAlert('Operation is not successfull.');
			
	}
	
}


function Back()
{
	var setNote=window.localStorage.getItem('setNotes');
	
	logConsole('setNote='+setNote);
  
	if(setNote==0)
	{
		document.forms[0].action="Lead.html";
		document.forms[0].submit();
	}
	else if(setNote==1)
	{
		document.forms[0].action="main_menu.html";
		document.forms[0].submit();
	}
	else if(setNote==2)
	{
		document.forms[0].action="ViewLead.html";
		document.forms[0].submit();
	}
	else if(setNote==3)
	{
		document.forms[0].action="FavoriteLead.html";
		document.forms[0].submit();
	}
}

function sendRequestList(tokenID,leadID)
{	

	/*var varType="GET";
	var varUrl=urlCall()+"/GetLeadnContactInformation?sTokenID="+tokenID+"&sLeadID="+leadID;
	var varData="";
	logConsole(varUrl);
    var varContentType="text/xml";
    var varDataType="xml";
    var varProcessData="true";
    //$.post('http://45.pmam.com/PMAMCRMsms/ValidateDesktopUser.asmx/ValidateUser?sUserName="+username+"&sPassword="+password,
    $.get(varUrl, function(data)
	{ $.ajax({
               type          : varType, 
               url           : varUrl, 
               data          : varData, 
               contentType   : varContentType,
               processdata   : varProcessData, //True or False
			   dataType: "text/json",  
			   
			   success: function(data)
               {
					logConsole(data);
					stopLoadin();
					getResponse(data);
	         },
			  error: function(data)
               {
            	  logConsole(data);
				   stopLoadin();
				   showAlert("Sorry, currently we are unable to process your request. Please try later.");
				   
               }, async:false
			   
                 });
				// setTimeout ( "setToBlack()", appTimeOut());
      });
	  */
	  
	 var varUrl=urlCall()+"/GetLeadnContactInformation";
	 var qStrings="sTokenID="+tokenID+"&sLeadID="+leadID;
	 logConsole(varUrl+' qStrings='+qStrings);
	 $.ajax({
			  type: "POST",
			  url: varUrl,
			  cache: false,
			  data: qStrings,
			  timeout: ajaxTimeOut,
			  contentType:"application/x-www-form-urlencoded",
			  dataType: "text", success: function(data)
			  {
				 	logConsole(data);
					stopLoadin();
					getResponse(data);
			  	 
			  },
			 dataType: "text", error: function(a,b,c)
			  {
				  if (b === "timeout")
				  {
					
				     stopLoadin();
			         alert("Not able to communicate to with Server, Try again later.");
					
					 
			      }
			  }
		});
	
}

function getResponse(data)
{
	
	if(data.indexOf('>')==-1)
	{
		showAlert("Currently we are unable to process your request. Please try later.");
		return;
	}
	
	var respArray = new Array();
	respArray=data.split(">");
	var result=respArray[2].substring(0,respArray[2].length-8);
	//alert(result);
	if(result=="Failed")
	{
		showAlert('Currently we are unable to process your request. Please try later.');
		
	}
	else
	{
		responseGrid(result);
		
	}

}

function responseGrid(result)
{
	    var data = JSON.parse(result);
	    var i=0;
		//LEAD INFO
	
		clientID=data.LeadInfo[0].ClientID;
		leadID=data.LeadInfo[0].LeadID;
		company_Name=data.LeadInfo[0].Company_Name;
		website=data.LeadInfo[0].Website;
		employeeCount=data.LeadInfo[0].EmployeeCount;
		revenue=data.LeadInfo[0].Revenue;
		address=data.LeadInfo[0].Address;
		city=data.LeadInfo[0].City;
		state=data.LeadInfo[0].State;
		zipCode=data.LeadInfo[0].ZipCode;
		leadPhone=data.LeadInfo[0].Phone;
		fax=data.LeadInfo[0].Fax;
		sicNo=data.LeadInfo[0].SicNo;
		sicDesc=data.LeadInfo[0].SicDesc;
		researchAnalysis=data.LeadInfo[0].ResearchAnalysis;
		basketID=data.LeadInfo[0].BasketID;
		nextCallDt=data.LeadInfo[0].NextCallDt;
		totLikelySales=data.LeadInfo[0].TotLikelySales;
		expectedClosingDt=data.LeadInfo[0].ExpectedClosingDt;
		
		document.getElementById('companyName').value=company_Name;
		document.getElementById('address').value=address;
		document.getElementById('website').value=website;
		document.getElementById('phone').value=leadPhone;
		document.getElementById('city').value=city;
		document.getElementById('revenue').value=revenue;
	    //LEAD CONTACT INFO
	
		var leadContactLength=data.LeadContactInfo.length;
		if(leadContactLength > 0)
		{
			for(i=0;i<leadContactLength;i++)
			{	
				contactID[i]=data.LeadContactInfo[i].ContactID;
				nameArr[i]=data.LeadContactInfo[i].ContactName;
				designationArr[i]=data.LeadContactInfo[i].Designation;
				phoneArr[i]=data.LeadContactInfo[i].Phone;
				homePhoneArr[i]=data.LeadContactInfo[i].HomePhone;
				cellPhoneArr[i]=data.LeadContactInfo[i].CellPhone;
				assistantNameArr[i]=data.LeadContactInfo[i].AssistantName;
				assistantWorkPhoneArr[i]=data.LeadContactInfo[i].AssistantWorkPhone;
				assistantCellPhoneArr[i]=data.LeadContactInfo[i].AssistantCellPhone;
				officePhoneArr[i]=data.LeadContactInfo[i].OfficePhone;
				officeMobileArr[i]=data.LeadContactInfo[i].OfficeMobile;
				emailArr[i]=data.LeadContactInfo[i].Email;
			}
		}
		else
		{
			
			    
				
				contactID[0]="";
				nameArr[0]="";
				designationArr[0]="";
				phoneArr[0]="";
				homePhoneArr[0]="";
				cellPhoneArr[0]="";
				assistantNameArr[0]="";
				assistantWorkPhoneArr[0]="";
				assistantCellPhoneArr[0]="";
				officePhoneArr[0]="";
				officeMobileArr[0]="";
				emailArr[0]="";
				
				
		}
		
		
	var i=0;
	dv = document.getElementById('grid'); 
	var gridText="";
	gridText=gridText+'<div class="ui-grid-b grid-head"><div class="ui-block-a header">Name</div><div class="ui-block-b header">Designation</div><div class="ui-block-c header">Call</div></div></div>';
	
	for(i=0;i<leadContactLength;i++)
	{
	
	gridText=gridText+'<div class="ui-grid-b"><div class="ui-block-a" id="dateID"><a href="phoneType.html" class="a2" onclick="setContactInfo('+i+')" >'+nameArr[i]+'</a></div><div class="ui-block-b"><a href="phoneType.html" class="a2"  onclick="setContactInfo('+i+')"  >'+designationArr[i]+'</a></div><div class="ui-block-c" id="amountID"><a href="phoneType.html" onclick="setContactInfo('+i+')"  ><img src="images/call.png" /></a>';
	
	if(emailArr[i]!="")
		gridText=gridText+'<a href="mailto:'+emailArr[i]+'?Subject="><img src="images/email.png" /></a>';
    else
		gridText=gridText+'<a href="#" onclick="message();"><img src="images/emailN.png" /></a>';		
	
	gridText=gridText+'</div></div>' ;	
	
	
	
	}
	
	
	gridText=gridText+'<div class="clear"></div><br/><br/>  <fieldset class="last">  <div style="float:left; width:45%"><input type="button" value="Add Contact" class="submit"  onclick="AddContact()"/></div><div style="float:right; width:45%"><input type="button" value="Back" class="submit"  onclick="Back()"/></div>  </fieldset><br/><br/>';
	
	dv.innerHTML=gridText;
	

}

function message()
{
	showAlert('There is no email address in existing contact.');
}

function setEmailInfo(i)
{
	
	window.localStorage.setItem("Email",emailArr[i]);
	window.localStorage.setItem("index",1);
	
	document.forms[0].action="SendEmail.html";
	document.forms[0].submit();
	
	
}


function setContactInfo(i)
{
	
	window.localStorage.setItem("Phone",phoneArr[i]);
	window.localStorage.setItem("HomePhone",homePhoneArr[i]);
	window.localStorage.setItem("CellPhone",cellPhoneArr[i]);
	window.localStorage.setItem("AssistantName",assistantNameArr[i]);
	window.localStorage.setItem("AssistantWorkPhone",assistantWorkPhoneArr[i]);
	window.localStorage.setItem("AssistantCellPhone",assistantCellPhoneArr[i]);
	window.localStorage.setItem("OfficePhone",officePhoneArr[i]);
	window.localStorage.setItem("OfficeMobile",officeMobileArr[i]);
	window.localStorage.setItem("index",1);
	
}


function LeadSave()
{
	
	
	    company_Name=document.getElementById('companyName').value;
		address=document.getElementById('address').value;
		website=document.getElementById('website').value;
		leadPhone=document.getElementById('phone').value;
		city=document.getElementById('city').value;
		revenue=document.getElementById('revenue').value;
		
	  
    loadingScrnDsply();
	var leadInfo='"LeadInfo":[{"ClientID":"'+clientID+'","LeadID":"'+leadID+'","Company_Name":"'+company_Name+'","Website":"'+website+'","EmployeeCount":"'+employeeCount+'","Revenue":"'+revenue+'","Address":"'+address+'","City":"'+city+'","State":"'+state+'","ZipCode":"'+zipCode+'","Phone":"'+leadPhone+'","Fax":"'+fax+'","SicNo":"'+sicNo+'","SicDesc":"'+sicDesc+'","ResearchAnalysis":"'+researchAnalysis+'","BasketID":"'+basketID+'","NextCallDt":"'+nextCallDt+'","TotLikelySales":"'+totLikelySales+'","ExpectedClosingDt":"'+expectedClosingDt+'"}],';
	
	
	var contactInfo="";	
	var  contact='"LeadContactInfo":[';
	
	for(var i=0;i<contactID.length;i++)	
	{
		if(contactInfo=="")
		{
			contactInfo='{"ClientID":"'+clientID+'","LeadID":"'+leadID+'","ContactID":"'+contactID[i]+'","ContactName":"'+nameArr[i]+'","Designation":"'+designationArr[i]+'","Phone":"'+phoneArr[i]+'","HomePhone":"'+homePhoneArr[i]+'","CellPhone":"'+cellPhoneArr[i]+'","AssistantName":"'+assistantNameArr[i]+'","AssistantWorkPhone":"'+assistantWorkPhoneArr+'","AssistantCellPhone":"'+assistantCellPhoneArr+'","OfficePhone":"'+officePhoneArr+'","OfficeMobile":"'+officeMobileArr+'"}';	
		}
		else
		{
			contactInfo+=',{"ClientID":"'+clientID+'","LeadID":"'+leadID+'","ContactID":"'+contactID[i]+'","ContactName":"'+nameArr[i]+'","Designation":"'+designationArr[i]+'","Phone":"'+phoneArr[i]+'","HomePhone":"'+homePhoneArr[i]+'","CellPhone":"'+cellPhoneArr[i]+'","AssistantName":"'+assistantNameArr[i]+'","AssistantWorkPhone":"'+assistantWorkPhoneArr+'","AssistantCellPhone":"'+assistantCellPhoneArr+'","OfficePhone":"'+officePhoneArr+'","OfficeMobile":"'+officeMobileArr+'"}';		
		}
	
	}
	
	contact=contact+ contactInfo +']';
  	var editLead='{'+leadInfo+contact+'}';
		 
	 /* POST DATA*/
	 var varUrl=urlCall()+"/AddEditLead";
	// qStrings='{"sTokenID":'+tokenID+'","sData":"'+editLead+'"}';
	 qStrings="sTokenID="+tokenID+"&sData="+editLead;
	 logConsole(varUrl+' qStrings='+qStrings);
	 $.ajax({
			  type: "POST",
			  url: varUrl,
			  cache: false,
			  data: qStrings,
			  timeout: ajaxTimeOut,
			  contentType:"application/x-www-form-urlencoded",
			  dataType: "text", success: function(data)
			  {
				 	logConsole(data);
					stopLoadin();
					getEditLeadResponse(data);
					
			  	 
			  },
			  dataType: "text", error: function(a,b,c)
			  {
				  if (b === "timeout")
				  {
					
				     stopLoadin();
			         showAlert("Not able to communicate to with Server, Try again later.");
					 
			      }
			  }
		});
	 
}


function getEditLeadResponse(data)
{
	
	if(data.indexOf('>')==-1)
	{
		showAlert("Currently we are unable to process your request. Please try later.");
		return;
	}
	
	//alert('data='+data);
	var respArray = new Array();
	respArray=data.split(">");
	var result=respArray[2].substring(0,respArray[2].length-8);
	//alert(result);
	if(result=="Failed")
	{
		showAlert('Currently we are unable to process your request. Please try later.');
		document.forms[0].action="LeadInfo.html";
        document.forms[0].submit();
		
	}
	else if(result=="Success")
	{
		showAlert('You have sucessfully edited lead info.');
		document.forms[0].action="LeadInfo.html";
        document.forms[0].submit();
		
	}

}


function createActivity()
{
	window.localStorage.setItem("index",3);
	 window.localStorage.setItem('ActivityTag','2');
	document.forms[0].action="ActivityCreate.html";
    document.forms[0].submit();

}

function viewActivity()
{
	window.localStorage.setItem("index",3);
	window.localStorage.setItem('ActivityTag','2');
	document.forms[0].action="ActivityList.html";
    document.forms[0].submit();
	
}

function AddContact()
{
	
	window.localStorage.setItem("index",1);
	document.forms[0].action="AddContact.html";
	document.forms[0].submit();
}



function ViewNotes()
{
	
	window.localStorage.setItem("index",2);
	document.forms[0].action="ViewNotes.html";
	document.forms[0].submit();
}

document.addEventListener("deviceready", onDeviceReady, false);
function onDeviceReady()
{

var file=window.localStorage.getItem('file');
setText(file);
readFile();
setTimeout("setResponse();",1000);

}
 
function Back()
{

document.forms[0].action="listFiles.html";
document.forms[0].submit();

}
 
 function setResponse()
 {
	 
	   var readText=window.localStorage.getItem('readText');
	   logConsole('readTEst='+readText);
	  // var readText="<B>Company Name:</B> WIPRO TECHNOLOGIES<br/><br/>This company is located at 737, Castle Creek, Dallas, Tx. This is the map to reach WIPRO Technologies MAP IT<br/><br/>Company telephone number is 737-739-3693 and their email ID is test@test.com.<br/>Some of the key contacts in this company are<br/><br/>1.	Rakesh Kotian he is the Finance Manager, his email address is rak@pmam.com and contact number is 737-383-3838. Rahul Chaudary is his assistant and is available at 939-9393-29282, Rahul’s email address is hfdh@hdhd.com<br/><br/>2.	Rakesh Kotian he is the Finance Manager, his email address is rak@pmam.com and contact number is 737-383-3838. Rahul Chaudary is his assistant and is available at 939-9393-29282, Rahul’s email address is hfdh@hdhd.com<br/><br/>3.	Rakesh Kotian he is the Finance Manager, his email address is rak@pmam.com and contact number is 737-383-3838. Rahul Chaudary is his assistant and is available at 939-9393-29282, Rahul’s email address is hfdh@hdhd.com<br/><br/><a href='http://www.google.com'>Click Here </a>to view all important conversations with this lead.<br/>  currently trying to sell product A, to WIPRO and discussions are in the negotiations phase. We are also trying to sell Product B which is in the Demonstration phase and Product C which is in the Initial phase of the sales pipeling. Previously Wipro had purchased Product A – 10 units at $2,000 in Oct 2011 and Product B – 5 Units at $1,000 dollars in December.<br/><br/>We have submitted him a quote of $3,000 which has already been revised once. Click here to see the active proposal.<br/><br/>We have sent 3 surveys to Wipro and reached out through them by the phone on 5 occasions in the last week. We have also send 20 emails over a 6 month period to Wipro contacts. Click here to see the marketing communications<br/><br/>";
	   
	  //var readText='<br/><br/>Company Name: Acme Truck Line Inc<br/><br/>This company is located at 121 Pailet Dr,Harvey,LA,70058 This is the map to reach Acme Truck Line Inc <a style="color:#FF6600" href="http://maps.google.co.in/maps?q=121 Pailet Dr+Harvey+LA+70058">Click here</a><br/><br/>Company telephone number is Phone: 504-368-2510 .<br/><br/>Some of the key contacts in this company are<br/><br/><br/>1 Michael Coatney he/she is the President, his/her email address is ashutosht@pmam.com .<br/><br/>We have sent 0 surveys to Acme Truck Line Inc and reached out through them by the phone on 0 occasions in the last week. We have also send 0 emails over a 6 month period to Acme Truck Line Inc contacts. <a style="color:#FF6600" href="https://www.pmamcrm.com/PCRM_ViewCampaingSendDetails.aspx?c=1&l=1068">Click here</a> to see the marketing communications<br/><br/><br/><br/>Thanks';
	 
	// mystring.replace(/./g,' ')
	  document.getElementById('srID').innerHTML="<br/><br/>"+readText.replace(/&lt;/g,'<').replace(/&gt;/g,'>');
 }
 
 
 

document.addEventListener( "deviceready", onDeviceReady,false );
var CommentDate=new Array();
var Notes=new Array();
function onDeviceReady()
 {
	loadingScrnDsply();
	var tokenID=window.localStorage.getItem("TokenID");
	var ActivityID=window.localStorage.getItem('ActivityID');
	sendActivityViewNotesList(tokenID,ActivityID);
	
 }
 
  
function Back()
{
    	  document.forms[0].action="ActivityView.html";
		  document.forms[0].submit();
	
  
}
		    
function sendActivityViewNotesList(tokenID,ActivityID)
{	
	/*var varType="GET";
	var varUrl=urlCall()+"/ViewActivityNotes?sTokenID="+tokenID+"&sActivityID="+ActivityID;
	var varData="";
	logConsole(varUrl);
    var varContentType="text/xml";
    var varDataType="xml";
    var varProcessData="true";
    //$.post('http://45.pmam.com/PMAMCRMsms/ValidateDesktopUser.asmx/ValidateUser?sUserName="+username+"&sPassword="+password,
    $.get(varUrl,
				function(data){ $.ajax({
               type          : varType, 
               url           : varUrl, 
               data          : varData, 
               contentType   : varContentType,
               processdata   : varProcessData, //True or False
               dataType: "text/json",  success: function(data)
               {
					logConsole(data);
					stopLoadin();
					getResponse(data);
		       },
			  error: function(data)
               {
            	  logConsole(data);
				   stopLoadin();
				   showAlert("Sorry, currently we are unable to process your request. Please try later.");
				   Back();
				   
               }, async:false
                 });
      });
	  */
	  
	 var varUrl=urlCall()+"/ViewActivityNotes";
	 var qStrings="sTokenID="+tokenID+"&sActivityID="+ActivityID;
	 logConsole(varUrl+' qStrings='+qStrings);
	 $.ajax({
			  type: "POST",
			  url: varUrl,
			  cache: false,
			  data: qStrings,
			  timeout: ajaxTimeOut,
			  contentType:"application/x-www-form-urlencoded",
			  dataType: "text", success: function(data)
			  {
				 	logConsole(data);
					stopLoadin();
					getResponse(data);
			  	 
			  },
			  dataType: "text", error: function(a,b,c)
			  {
				  if (b === "timeout")
				  {
					
				     stopLoadin();
			         showAlert("Not able to communicate to with Server, Try again later.");
					 Back();
			      }
			  }
		});
	
}

/********************************************************************/
function getResponse(data)
{
	if(data.indexOf('>')==-1)
	{
		showAlert("Currently we are unable to process your request. Please try later.");
		return;
	}
	
	var respArray = new Array();
	respArray=data.split(">");
	var result=respArray[2].substring(0,respArray[2].length-8);
	//alert(result);
	if(result=="Failed")
	{
	 showAlert('Currently we are unable to process your request. Please try later.');
	 Back();
			
	}
	
	else
	{
		responseGrid(result);
		
	}

}

function responseGrid(result)
{
	var data = JSON.parse(result);
    var ActivityNoteLength=data.ActivityNote.length;
    console.log('No. of ActivityNoteLength ='+ActivityNoteLength);
	if(ActivityNoteLength==0)
	 {
		
		  showAlert('There are no  notes to display.');
		  Back();
		
	 }
	 
	for(i=0;i<data.ActivityNote.length;i++)
	{	
				
		 CommentDate[i]=data.ActivityNote[i].CommentDate;
		 Notes[i]=data.ActivityNote[i].Notes;
	}	
	
	
	var i=0;
	dv = document.getElementById('viewID'); 
	var gridText="";
	/*var Invoice_NumberArr=new Array("201241","201242","201243","201244","201245","201246","201247","201248","201249","201210","2012411","201212","201213","2012414","2012415","2012416","2012417","2012418");
	var Company_NameArr=new Array('Notes 1','Notes 2','Notes 3','Notes 4','Notes 5','Notes 6');
	var Invoice_DateArr=new Array('25/12/2012','26/12/2012','20/12/2012','25/12/2012','26/12/2012','20/12/2012');
	var TotalAmountArr=new Array('25000','10000','8000','25000','10000','8000','25000','10000','8000','25000','10000','8000','25000','10000','8000','25000','10000','8000');
	*/
	
	gridText=gridText+'<div class="ui-grid-a grid-head"><div class="ui-block-a header">&nbsp;&nbsp;Dates</div><div class="ui-block-b header">Notes</div>';
		
	for(i=0;i<CommentDate.length;i++)
	{
	
	gridText=gridText+'<li><div class="clear"></div><div class="ui-grid-a"><div class="ui-block-a" id="dateID">&nbsp;&nbsp;'+CommentDate[i]+'</div><div class="ui-block-b">'+Notes[i]+'</div></div></li>' ;	
	
	}
	
	gridText=gridText+'</ul></div>';
	//dv.innerHTML=gridText;
	dv.innerHTML=gridText+'<br/><br/><fieldset class="last"><div class="midcontent"><div style="float:right; width:100%"><input type="button" value="Back" class="submit"  onclick="Back();"/></div></div></fieldset><br/><br/>';
	
}








document.addEventListener( "deviceready", onDeviceReady,false );
var FavIDtArr=new Array();
var FavDescArr=new Array();

var count=0;
var sCtr=1;

/*WHEN DEVICE IS READY.*/
function onDeviceReady()
 {
	    /*TO CHECK INTERNET IS CONNECTED OR NOT ?*/ 
		if(check_network())
		{
			 // JQMLoadingStart();
		   loadingScrnDsply();
		   var tokenID=window.localStorage.getItem("TokenID");
		   sendRequestList(tokenID);
			 
	   }
	
 }

/*GOES TO MENU OPTION*/	
function Back()
{

	FavIDtArr=[];
	FavDescArr=[];
	document.forms[0].action="main_menu.html";
	document.forms[0].submit();
}

/* Call webservice using Ajax */    
function sendRequestList(tokenID)
{	
	
	  
	 var varUrl=urlCall()+"/GetFavoritesDelay";
	 var qStrings="sTokenID="+tokenID+"&sCtr="+sCtr;
	 sCtr++;
	 logConsole(varUrl+' qStrings='+qStrings);
	 $.ajax({
			  type: "POST",
			  url: varUrl,
			  cache: false,
			  data: qStrings,
			  timeout: ajaxTimeOut,
			  contentType:"application/x-www-form-urlencoded",
			  /* beforeSend	: function() 
			   {
						navigator.notification.activityStart('Loading', 'Please Wait...');
			   }, 
			   complete	: function() 
			   {
						navigator.notification.activityStop();
			   },*/
			
			  dataType: "text", success: function(data)
			  {
				 	logConsole(data);
					//JQMLoadingStop();
					stopLoadin();
					getResponse(data);
			  	 
			  },
			  dataType: "text", error: function(a, b, c)
			  {
				  if (b === "timeout")
				  {
					
				     stopLoadin();
			         showAlert("Not able to communicate to with Server, Try again later.");
					 Back();
			      }
				  
			  }
		});
	 
	
}

/* REMOVE XML TAG AND GET JSON DATA*/
function getResponse(data)
{
	if(data.indexOf('>')==-1)
	{
		showAlert("Currently we are unable to process your request. Please try later.");
		return;
	}
	
	var respArray = new Array();
	respArray=data.split(">");
	var result=respArray[2].substring(0,respArray[2].length-8);
	//alert(result);
	if(result=="Failed")
	{
		 showAlert('Currently we are unable to process your request. Please try later.');
		 Back();
	}
	else
	{
		responseGrid(result);
	}
}


/*PARSING RESPONSE FROM WEB SERVER.*/
function responseGrid(result)
{
	
    var data = JSON.parse(result);
    var FavListLength=data.Favorites.length;
    console.log('No. of Favorite List Leads='+FavListLength);
	
	
	if(FavListLength==0 && FavIDtArr.length==0)
	 {
		
		  showAlert('There are no favorite list.');
		  Back();
		
	 }
	 if(FavListLength==0 && FavIDtArr.length!=0)
	 {
		 showAlert('There are no more favorite list to display.');
		 // Back();
		
	 }
	 
	
	for(i=0;i<FavListLength;i++)
	{	
		FavIDtArr.push(data.Favorites[i].FavID);
		FavDescArr.push(data.Favorites[i].FavDesc);
		
	}	
			

	/* var ListIDtArr=new Array("201241","201242","201243","201244","201245","201246","201247","201248","201249","201210","2012411","201212","201213","2012414","2012415","2012416","2012417","2012418");
	var ListDescriptionArr=new Array('Infosys','Reliance Pvt Ltd','TCS','Infosys','Reliance','TCS','Infosys Pvt Ltd ','Reliance','TCS','Infosys ','Reliance','TCS','Infosys','Reliance Developr','TCS','Infosys','Reliance','TCS');
	var LeadCountArr=new Array('10','10','10','10','10','10','102','10','10','10','10','10','102','10','10','10','10','10');
	var ListSharedArr=new Array('true','false','true','true','false','false','true','true','false','false','false','false','false','true','true','false','false','true');
	*/

	var i=0;
	dv = document.getElementById('mylistid'); 
	
	
	var gridText="";
	gridText=gridText+'<ul data-role="listview" data-inset="true" data-split-theme="a" data-filter="false"  data-filter-placeholder="Search..." id="mylistid" class="content" data-count-theme="b">';
	 
	
	for(i=0;i<FavDescArr.length;i++)
	{
		 gridText=gridText+'<li><a href="#" onclick="setListID('+FavIDtArr[i]+')" ><img src="images/folder.png" align="right" />'+FavDescArr[i]+'</a></li>';
		
	}
	

	gridText=gridText+'</ul>';
	
		
	dv.innerHTML=gridText+'<div class="clear"></div><br/><fieldset class="last"><div style="float:left; width:45%"><input type="button" value="More List" class="submit" data-theme="b" onclick="onDeviceReady();"/> </div><div style="float:right; width:45%"><input type="button" value="Back" class="submit" data-theme="b" onclick="Back();"/></div></fieldset></div></div>';
	
	
	 $('#mylistid ul').listview();
	 // $('#mylistid').listview("refresh");
	  
}

/*GOES TO FAVOURITE LEADS*/
function setListID(FavID)
{
	
	 window.localStorage.setItem("FavID",FavID);
	 document.forms[0].action="FavoriteLead.html";
	 document.forms[0].submit();
	
}

document.addEventListener( "deviceready", onDeviceReady ,false);
var NotificationID=new Array();
var NotificationMessage=new Array();

var result="";

var sCtr=1;
var dismissIndex=0;

function onDeviceReady()
 {
		if(check_network())
		{
		   // JQMLoadingStart();
		   NotificationID=new Array();
		   NotificationMessage=new Array();
		   loadingScrnDsply();
		   var tokenID=window.localStorage.getItem("TokenID");
		   sendRequestList(tokenID);
		 
	   }
	
 }
 
function Back()
{
	    
  document.forms[0].action="main_menu.html";
  document.forms[0].submit();
		
}
 
 function sendRequestList(tokenID)
{	

	 /* POST DATA*/
	   
	  
	var varUrl=urlCall()+"/GetNotificationList";
	var qStrings="sTokenID="+tokenID;
	sCtr++;
		
	
	 logConsole(varUrl+' qStrings='+qStrings);
	 $.ajax({
			  type: "POST",
			  url: varUrl,
			  cache: false,
			  data: qStrings,
			  timeout: ajaxTimeOut,
			  contentType:"application/x-www-form-urlencoded",
			  dataType: "text", success: function(data)
			  {
				 	logConsole(data);
					// JQMLoadingStop();
					 stopLoadin();
					getResponse(data);
			  	 
			  },
			  dataType: "text", error: function(a,b,c)
			  {
				  if (b === "timeout")
				  {
					
				     stopLoadin();
			         showAlert("Not able to communicate to with Server, Try again later.");
					 Back();
			      }
			  }
		});
	  
	  
}




/********************************************************************/
function getResponse(data)
{
	
	if(data.indexOf('>')==-1)
	{
		showAlert("Currently we are unable to process your request. Please try later.");
		return;
	}
	var respArray = new Array();
	respArray=data.split(">");
	result=respArray[2].substring(0,respArray[2].length-8);
	//alert(result);
	if(result=="Failed")
	{
		showAlert('Currently we are unable to process your request. Please try later.');
		Back();
		
	}
	else
	{
		responseGrid(result);
		
	}

}
 

function responseGrid(result)
{
	
	var data = JSON.parse(result);
  	var listLength=data.List.length;
	
	console.log('No. of Notification='+listLength);
	
	 if(listLength==0)
	 {
	     showAlert('There are no notification.');
		 Back();
		 	
	 }
	
	for(i=0;i<listLength;i++)
	{	
		NotificationID[i]=data.List[i].NotificationID;
		NotificationMessage[i]=data.List[i].NotificationMessage;
	
	}
	
	var i=0;
	dv = document.getElementById('mylistid');  
	
	var gridText="";
	gridText=gridText+'<ul data-role="listview"  data-divider-theme="a" data-split-theme="a" data-inset="true"><li  data-role="list-divider" >Notifications</li>';
	 
	
	for(i=0;i<NotificationID.length;i++)
	{
			gridText=gridText+'<li data-icon="delete"><a href="#"> <p>'+NotificationMessage[i]+'</p>  </a><a href="#" onClick="Dismiss('+i+')">Dismiss</a></li>' ;	
	
	}
	
	
	gridText=gridText+'</ul>';
		
	
	//dv.innerHTML=gridText+'<div class="clear"></div><br/><fieldset class="last"><div style="float:left; width:45%"><input type="button" value="More" class="submit" data-theme="b" onclick="onDeviceReady();"/> </div><div style="float:right; width:45%"><input type="button" value="Back" class="submit" data-theme="b" onclick="Back();"/></div></fieldset></div></div>';
	
	dv.innerHTML=gridText+'<fieldset class="last"><div class="midcontent"><div style="float:right; width:100%"><input type="button" value="Back" class="submit" data-theme="b" onclick="Back();"/></div></div></fieldset>';
	
	
		
	
	 $('#mylistid ul').listview();
	//  $('#mylistid').listview("refresh");
	

}

function Dismiss(index)
{
	dismissIndex=index;
	
	navigator.notification.confirm(
        'You are about to remove notification.Do you wish to continue?', // message
         onConfirm,            // callback to invoke with index of button pressed
        'Confirmation',           // title
        'Cancel,Ok'         // buttonLabels
    );

}

function onConfirm(buttonIndex) 
{
	    logConsole('buttonIndex='+buttonIndex);
        if(buttonIndex==1)
		{
			//exitApp();
		}
		else if(buttonIndex==2)
		{
			if(check_network())
			{
			   // JQMLoadingStart();
			   loadingScrnDsply();
			   var tokenID=window.localStorage.getItem("TokenID");
			   getDismissList(tokenID,NotificationID[dismissIndex]);
			 
		   }
			
		}
    
}

function getDismissList(tokenID,sNotificationID)
{	

	 /* POST DATA*/
	   
	  
	var varUrl=urlCall()+"/DismissNotification";
	var qStrings="sTokenID="+tokenID+"&sNotificationID="+sNotificationID;
	
		
	
	 logConsole(varUrl+' qStrings='+qStrings);
	 $.ajax({
			  type: "POST",
			  url: varUrl,
			  cache: false,
			  data: qStrings,
			  timeout: ajaxTimeOut,
			  contentType:"application/x-www-form-urlencoded",
			  dataType: "text", success: function(data)
			  {
				 	logConsole(data);
					// JQMLoadingStop();
					 stopLoadin();
					getDismissListResponse(data);
			  	 
			  },
			  dataType: "text", error: function(a,b,c)
			  {
				  if (b === "timeout")
				  {
					
				     stopLoadin();
			         showAlert("Not able to communicate to with Server, Try again later.");
					 Back();
			      }
			  }
		});
	  
	  
}




/********************************************************************/
function getDismissListResponse(data)
{
	
	if(data.indexOf('>')==-1)
	{
		showAlert("Currently we are unable to process your request. Please try later.");
		return;
	}
	var respArray = new Array();
	respArray=data.split(">");
	result=respArray[2].substring(0,respArray[2].length-8);
	//alert(result);
	if(result=="Failed")
	{
		showAlert('Currently we are unable to process your request. Please try later.');
		
		
	}
	else if(result=="Success")
	{
		showAlert('Successfully removed notification.');
		onDeviceReady();
		
	}

}
 



document.addEventListener("deviceready", onDeviceReady, false);
var name="";
var designation="";
var phone="";
var homephone="";
var cellphone="";
var email="";

function onDeviceReady()
{
	
}



 function getSave()
 {
	
	 if(check_network())
		{
		  if(validate())
		  {
			 // if(checkEmail())
			  {
				// document.getElementById('userName').focus(); 
				 loadingScrnDsply();
				 senRequestRegistration();
				
			  }
			  
		  }
		}
	
 }
 
 
function senRequestRegistration()
{	

    name=document.getElementById("name").value;
	designation=document.getElementById("designation").value;
	phone=document.getElementById("phone").value;
	//homephone=document.getElementById("homephone").value;
	//cellphone=document.getElementById("cellphone").value;
	email=document.getElementById("email").value;
	
	var tokenID=window.localStorage.getItem("TokenID");
	var leadID=window.localStorage.getItem("LeadID");
	
	
    var LeadContact='{"LeadContact":[{"ClientID":"1","LeadID":"'+leadID+'","ContactID":"0","ContactName":"'+name+'","Designation":"'+designation+'","Phone":"'+phone+'","Email":"'+email+'"}]}';
	
		
	 var varUrl=urlCall()+"/AddLeadContact";
	 qStrings="sTokenID="+tokenID+"&sData="+LeadContact;
	 logConsole(varUrl+' qStrings='+qStrings);
	 $.ajax({
			  type: "POST",
			  url: varUrl,
			  cache: false,
			  data: qStrings,
			  timeout: ajaxTimeOut, 
			  contentType:"application/x-www-form-urlencoded",
			  dataType: "text", success: function(data)
			  {
				 
					logConsole(data);
					stopLoadin();
					getResponse(data);
								  	 
			  },
			 dataType: "text", error: function(a,b,c)
			  {
				  if (b === "timeout")
				  {
					
				     stopLoadin();
			         showAlert("Not able to communicate to with Server, Try again later.");
					
			      }
			  }
		});
	 
	
}


function getResponse(data)
{
	
	if(data.indexOf('>')==-1)
	{
		showAlert("Currently we are unable to process your request. Please try later.");
		return;
	}
	
	var respArray = new Array();
	respArray=data.split(">");
	
		var result=respArray[2].substring(0,respArray[2].length-8);
	//alert(result);
	if(result=="Failed")
	{
		
		showAlert('Currently we are unable to process your request. Please try later.');
		
		
	}
	else if(result=="Success")
	{
		 showAlert('You have Successfully added new contactt.');
		 document.forms[0].action="LeadInfo.html";
		 document.forms[0].submit();
		
	}
	else
	{
		
		showAlert(result);
	}
	
}


function validate()
{
	
	name=document.getElementById("name").value;
	designation=document.getElementById("designation").value;
	phone=document.getElementById("phone").value;
	//homephone=document.getElementById("homephone").value;
	//cellphone=document.getElementById("cellphone").value;
	email=document.getElementById("email").value;
	
		
	if(name=="")
	{
		showAlert("Please Enter Name.");
		document.getElementById('name').focus();
		return false;
		
	}
	
	/*else if(designation=="")
	{
		showAlert("Please Enter Designation.");
		document.getElementById('designation').focus();
		return false;
		
	}
	else if(phone=="")
	{
		showAlert("Please Enter Phone Number.");
		document.getElementById('phone').focus();
		return false;
		
	}
		
	else if(cellphone=="")
	{
		showAlert("Please Enter Cell Phone Number.");
		document.getElementById('cellphone').focus();
		return false;
		
	}
		
	else if(phone.length <10)
	{
		showAlert("Phone should be atleast ten digits.");
		document.getElementById('phone').focus();
		return false;
		
	}*/
	
	return true;
}

function checkEmail() 
{

    var email = document.getElementById('email');
    var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;

    if (!filter.test(email.value))
	 {
		 showAlert('Please provide a valid email address');
		 document.getElementById('email').focus();
		 return false;
     }
	 return true;
}


function Back()
{
	
	 document.forms[0].action="LeadInfo.html";
	 document.forms[0].submit();
	
}







document.addEventListener( "deviceready", onDeviceReady,false );
var ListIDtArr=new Array();
var ListDescriptionArr=new Array();
var LeadCountArr=new Array();
var ListSharedArr=new Array();
var count=0;
var sCtr=1;

function onDeviceReady()
 {
		if(check_network())
		{
			 // JQMLoadingStart();
		   loadingScrnDsply();
		   var tokenID=window.localStorage.getItem("TokenID");
		   var isAccount=window.localStorage.getItem('IsAccount');
      	   sendRequestList(tokenID,isAccount);
			 
	   }
	
 }
	
function Back()
{

	ListIDtArr=[];
	ListDescriptionArr=[];
	document.forms[0].action="LeadsAccount.html";
	document.forms[0].submit();
}

///Call webservice using Ajax
/*************************************************/			    
function sendRequestList(tokenID,isAccount)
{	
	/*var varType="GET";
	var varUrl=urlCall()+"/GetListDelay?sTokenID="+tokenID+"&IsAccount="+isAccount+"&sCtr="+sCtr;
	sCtr++;
	var varData="";
	logConsole(varUrl);
    var varContentType="text/xml";
    var varDataType="xml";
    var varProcessData="true";
    $.get(varUrl,
				function(data){ $.ajax({
               type          : varType, 
               url           : varUrl, 
               data          : varData, 
               contentType   : varContentType,
               processdata   : varProcessData, //True or False
               dataType: "text",  success: function(data)
               {
					logConsole(data);
					//JQMLoadingStop();
					stopLoadin();
					getResponse(data);
					
					
               },
			  error: function(data)
               {
            	   logConsole(data);
				   stopLoadin();
				   showAlert("Sorry, currently we are unable to process your request. Please try later.");
				   Back();
				   
               }, async:false
                 });
      });
	  */
	  
	  
	 var varUrl=urlCall()+"/GetListDelay";
	 var qStrings="sTokenID="+tokenID+"&IsAccount="+isAccount+"&sCtr="+sCtr;
	 sCtr++;
	 logConsole(varUrl+' qStrings='+qStrings);
	 $.ajax({
			  type: "POST",
			  url: varUrl,
			  cache: false,
			  data: qStrings,
			  timeout: ajaxTimeOut,
			  contentType:"application/x-www-form-urlencoded",
			  dataType: "text", success: function(data)
			  {
				 	logConsole(data);
					//JQMLoadingStop();
					stopLoadin();
					getResponse(data);
			  	 
			  },
			  dataType: "text", error: function(a,b,c)
			  {
				  if (b === "timeout")
				  {
					
				     stopLoadin();
			         showAlert("Not able to communicate to with Server, Try again later.");
					 Back();
			      }
			  }
		});
	 
	
}

/********************************************************************/
function getResponse(data)
{
	
	if(data.indexOf('>')==-1)
	{
		showAlert("Currently we are unable to process your request. Please try later.");
		return;
	}
	
	var respArray = new Array();
	respArray=data.split(">");
	var result=respArray[2].substring(0,respArray[2].length-8);
	//alert(result);
	if(result=="Failed")
	{
		 showAlert('Currently we are unable to process your request. Please try later.');
		 Back();
	}
	else
	{
		responseGrid(result);
	}
}



function responseGrid(result)
{
	
	
    var data = JSON.parse(result);
   
    var leadListLength=data.List.length;
    console.log('No. of List Leads='+leadListLength);
	
	
	if(leadListLength==0 && ListIDtArr.length==0)
	 {
		
		  showAlert('There are no list lead.');
		  Back();
		
	 }
	 if(leadListLength==0 && ListIDtArr.length!=0)
	 {
		
		  showAlert('There are no more list lead to display.');
		 // Back();
		
	 }
	 
	 
	/*if(leadListLength<25) 
	   leadListLength=leadListLength;
	else
	   leadListLength=25;*/
   
	for(i=0;i<leadListLength;i++)
	{	
		ListIDtArr.push(data.List[i].ListID);
		ListDescriptionArr.push(data.List[i].ListDescription);
		LeadCountArr.push(data.List[i].LeadCount);
		ListSharedArr.push(data.List[i].ListShared);
		
		
	}	
			

	/* var ListIDtArr=new Array("201241","201242","201243","201244","201245","201246","201247","201248","201249","201210","2012411","201212","201213","2012414","2012415","2012416","2012417","2012418");
	var ListDescriptionArr=new Array('Infosys','Reliance Pvt Ltd','TCS','Infosys','Reliance','TCS','Infosys Pvt Ltd ','Reliance','TCS','Infosys ','Reliance','TCS','Infosys','Reliance Developr','TCS','Infosys','Reliance','TCS');
	var LeadCountArr=new Array('10','10','10','10','10','10','102','10','10','10','10','10','102','10','10','10','10','10');
	var ListSharedArr=new Array('true','false','true','true','false','false','true','true','false','false','false','false','false','true','true','false','false','true');
	*/

	var i=0;
	dv = document.getElementById('mylistid'); 
	
	
	var gridText="";
	gridText=gridText+'<ul data-role="listview" data-inset="true" data-split-theme="a" data-filter="false"  data-filter-placeholder="Search..." id="mylistid" class="content" data-count-theme="b">';
	 
	
	for(i=0;i<ListDescriptionArr.length;i++)
	{
	
      if(i%2!=0)
	  {		
	  
		  if(ListSharedArr[i]=='Y')
		  {
			  
			  gridText=gridText+'<li><a href="#"  onclick="setListID('+ListIDtArr[i]+')"><span class="ui-li-count">'+LeadCountArr[i]+'</span><img src="images/folderS.png" align="right" />'+ListDescriptionArr[i]+'</a></li>';
			  
			 // var list='<li><a href="Lead.html" onclick="setListID('+ListIDtArr[i]+')"><span class="ui-li-count">'+LeadCountArr[i]+'</span><img src="images/folderS.png" align="right" />'+ListDescriptionArr[i]+'</a></li>';
			  
		  }
		  else
		  {
		 gridText=gridText+'<li><a href="#" onclick="setListID('+ListIDtArr[i]+')" ><span class="ui-li-count">'+LeadCountArr[i]+'</span><img src="images/folder.png" align="right" />'+ListDescriptionArr[i]+'</a></li>';
		  }
	 
	  }
	  else
	  {
		  
		   if(ListSharedArr[i]=='Y')
		  {
			   gridText=gridText+'<li><a href="#" onclick="setListID('+ListIDtArr[i]+')"><span class="ui-li-count">'+LeadCountArr[i]+'</span><img src="images/folderS.png" align="right" />'+ListDescriptionArr[i]+'</a></li>';
		   
		  }
		  else
		  {
		  
		  
		   gridText=gridText+'<li><a href="#" onclick="setListID('+ListIDtArr[i]+')"><span class="ui-li-count">'+LeadCountArr[i]+'</span><img src="images/folder.png" align="right" />'+ListDescriptionArr[i]+'</a></li>';
		   
		  }
	 	  
	  }
			
	}
	

	gridText=gridText+'</ul>';
	
		
	dv.innerHTML=gridText+'<div class="clear"></div><br/><fieldset class="last"><div style="float:left; width:45%"><input type="button" value="More List" class="submit" data-theme="b" onclick="onDeviceReady();"/> </div><div style="float:right; width:45%"><input type="button" value="Back" class="submit" data-theme="b" onclick="Back();"/></div></fieldset></div></div>';
	
	
	 $('#mylistid ul').listview();
	 // $('#mylistid').listview("refresh");
	  
}


function setListID(listID)
{
	
	 window.localStorage.setItem("ListID",listID);
	 document.forms[0].action="Lead.html";
	 document.forms[0].submit();
	
}

document.addEventListener( "deviceready", onDeviceReady ,false);
var LeadIDArr=new Array();
var LeadNameArr=new Array();
var LeadCityArr=new Array();
var LeadStateArr=new Array();
var LeadPhoneArr=new Array();
var result="";
var sCtr=1;

/*WHEN DEVICE IS READY.*/
function onDeviceReady()
 {
	    /*TO CHECK INTERNET IS CONNECTED OR NOT ?*/
		if(check_network())
		{
		   // JQMLoadingStart();
		   loadingScrnDsply();
		   var tokenID=window.localStorage.getItem("TokenID");
		   var FavID=window.localStorage.getItem("FavID");
		   sendRequestList(tokenID,FavID);
		 
	   }
	
 }
 
 /*GOES TO FAVORITES LIST*/
function Back()
{
	   
	document.forms[0].action="FavoriteList.html";
	document.forms[0].submit();
				
	
}
 
 /* Call webservice using Ajax */
 function sendRequestList(tokenID,FavID)
{	
   /* POST DATA*/
	   
	var varUrl=urlCall()+"/GetLeadForFavoritesDelay";
	var qStrings="sTokenID="+tokenID+"&sFavID="+FavID+"&sCtr="+sCtr;
	sCtr++;
	   
	 logConsole(varUrl+' qStrings='+qStrings);
	 $.ajax({
			  type: "POST",
			  url: varUrl,
			  cache: false,
			  data: qStrings,
			  timeout: ajaxTimeOut,
			  contentType:"application/x-www-form-urlencoded",
			  
			  dataType: "text", success: function(data)
			  {
				 	logConsole(data);
					// JQMLoadingStop();
					stopLoadin();
					getResponse(data);
			  	 
			  },
			  dataType: "text", error: function(a,b,c)
			  {
				  if (b === "timeout")
				  {
					
				     stopLoadin();
			         showAlert("Not able to communicate to with Server, Try again later.");
					 Back();
			      }
			  }
		});
	  
	  
}



function setToBlack()
{
	showAlert('Connection Timed Out.');
	window.location = "../www/ListLeads.html";
	
}

/* REMOVE XML TAG AND GET JSON DATA*/
function getResponse(data)
{
	
	if(data.indexOf('>')==-1)
	{
		showAlert("Currently we are unable to process your request. Please try later.");
		return;
	}
	var respArray = new Array();
	respArray=data.split(">");
	result=respArray[2].substring(0,respArray[2].length-8);
	//alert(result);
	if(result=="Failed")
	{
		showAlert('Currently we are unable to process your request. Please try later.');
		Back();
		
	}
	else
	{
		responseGrid(result);
		
	}

}
 
/*PARSING RESPONSE FROM WEB SERVER RESPONSE.*/
function responseGrid(result)
{
	
	 var data = JSON.parse(result);
  	 var leadLength=data.Leads.length;
	
	 console.log('No. of favorite Leads='+leadLength);
	
	 
	 if(leadLength==0 && LeadIDArr.length!=0)
	 {
		  showAlert('There are no favorite leads to display.');
		 	
	 }
	 
	 if(leadLength==0 && LeadIDArr.length==0)
	 {
		  showAlert('There are no  favorite leads to display.');
		  document.forms[0].action="FavoriteList.html";
		  document.forms[0].submit();
		 
	 }
		
	for(i=0;i<leadLength;i++)
	{	
		LeadIDArr.push(data.Leads[i].LeadID);
		LeadNameArr.push(data.Leads[i].LeadName);
	}	
	
	/*var LeadIDArr=new Array("201241","201242","201243","201244","201245","201246","201247","201248","201249","201210","2012411","201212","201213","2012414","2012415","2012416","2012417","2012418");
	var LeadNameArr=new Array('Infosys','Reliance Pvt Ltd','TCS','Infosys','Reliance','TCS','Infosys Pvt Ltd ','Reliance','TCS','Infosys ','Reliance','TCS','Infosys','Reliance Developr','TCS','Infosys','Reliance','TCS');
	*/
	
	
	var i=0;
	dv = document.getElementById('mylistid');  
	
	var gridText="";
	gridText=gridText+'<ul data-role="listview" data-inset="true" data-split-theme="a" data-filter="false"  data-filter-placeholder="Search..." id="mylistid" class="content" data-count-theme="b"> <li data-role="list-divider" data-theme="d">Leads</li>';
	 
	
	for(i=0;i<LeadNameArr.length;i++)
	{
		gridText=gridText+'<li><a href="#" onclick="setLeadID('+i+',0)">'+(i+1)+'.'+' '+LeadNameArr[i]+'</a></li>' ;	
	
	}
	
	
	gridText=gridText+'</ul>';
	
	dv.innerHTML=gridText+'<div class="clear"></div><br/><fieldset class="last"><div style="float:left; width:45%"><input type="button" value="More Leads" class="submit" data-theme="b" onclick="onDeviceReady();"/> </div><div style="float:right; width:45%"><input type="button" value="Back" class="submit" data-theme="b" onclick="Back();"/></div></fieldset></div></div>';
	
	  $('#mylistid ul').listview();
	//  $('#mylistid').listview("refresh");
}

/* GOES TO LEAD INFO PAGE .*/
function setLeadID(i,index)
{
	 setIndex(index);
	 window.localStorage.setItem('setNotes','3');
	 window.localStorage.setItem("LeadID",LeadIDArr[i]);
	 document.forms[0].action="LeadInfo.html";
	 document.forms[0].submit();
	
}

/* SET TAB INDEX VALUE IN LEAD INFO PAGE.*/
function setIndex(index)
{
	 window.localStorage.setItem("index",index);
	
}




document.addEventListener( "deviceready", onDeviceReady,false );

var EventNameArr=new Array();
var EventDateArr=new Array();

function onDeviceReady()
 {
	 
	 JQMLoadingStart();
	 var tokenID=window.localStorage.getItem("TokenID");
     sendRequestEventList(tokenID);

 }
 

 


function sendRequestEventList(tokenID)
{	
	var varType="GET";
	var varUrl=urlCall()+"/ValidateUser?sUserName=birdaramg@pmam.com&sPassword=pmam@123";
	var varData="";
	logConsole(varUrl);
    var varContentType="text/xml";
    var varDataType="";
    var varProcessData="true";
    $.get(varUrl,
				function(data){ $.ajax({
               type          : varType, 
               url           : varUrl, 
               data          : varData, 
               contentType   : varContentType,
               processdata   : varProcessData, //True or False
               dataType: "text",  success: function(data)
               {
					//alert("Rssponse :"+data);
					logConsole(data);
					JQMLoadingStop();
					getResponse(data);
		   	  },
			  error: function(data)
               {
				   logConsole(data);
				   JQMLoadingStop();
				   showAlert("Currently we are unable to process your request. Please try later.");
				   Back();
				 
				   
               }, async:false
                 });
      });
	
}


function getResponse(data)
{
	
	if(data.indexOf('>')==-1)
	{
		showAlert("Currently we are unable to process your request. Please try later.");
		return;
	}
	
	var respArray = new Array();
	respArray=data.split(">");
	var result=respArray[2].substring(0,respArray[2].length-8);
	
	if(result=="Failed")
	{
	
		 showAlert('Currently we are unable to process your request. Please try later.');
		 Back();
			
	}
	
	else
	{
		responseGrid();
		
	}
}


function responseGrid()
{
	
	/* var result='{"Events":[{"ClientID":"1","LeadID":"136391","ContactID":"0","Name":"Annual Celebration","EventDate":"15 April 2013"}]}';
	
	 var data = JSON.parse(result);
	 var i=0;
	 var eventListLength=data.Events.length;
	 console.log('No. of Events='+eventListLength);
	 if(eventListLength==0)
	 {
		
			  showAlert('Sorry,Currently There Is No Event List.');
			  document.forms[0].action="main_menu.html";
			  document.forms[0].submit();
		 
	 }
	 
	 for(i=0;i<eventListLength;i++)
	 {
		 eventNameArr[i]=data.Events.Name[i];
		 EventDateArr[i]=data.Events.EventDate[i];
		 
	 }
	
   */
   
	var i=0;
	dv = document.getElementById('mylistid'); 
	var gridText="";
	
	var EventNameArr=new Array("Annual Celebration","Success Party","Diwali Occasion","Chrismas");
	var EventDateArr=new Array('15 April 2013','18 April 2013','20 November 2013','25 Dec 2013');
	var EventStartTimeArr=new Array('6:24','8:24','5:00','9:30');
	
	var gridText = '<ul data-role="listview" data-inset="true" data-split-theme="a" data-filter="true" data-filter-placeholder="Search..." id="mylistid" >';
	
	for(i=0;i<EventNameArr.length;i++)
	{
	gridText=gridText+'<li><a href="#" onClick="clickList();"><h3>'+EventNameArr[i]+'</h3>	 <p>'+EventDateArr[i]+'</p> <p class="ui-li-aside"><strong>'+EventStartTimeArr[i]+'</strong> PM</p> </a></li>' ;	
	
	}
	
	
	gridText=gridText+'</ul></div>';
	dv.innerHTML=gridText;
	$('#mylistid ul').listview();
	
	// $.mobile.pageLoading(true);  
	 

}

function clickList()
{
	 document.forms[0].action="EventParticipate.html";
	 document.forms[0].submit();	
}

function Back()
{
	document.forms[0].action="main_menu.html";
   document.forms[0].submit();	
}




 document.addEventListener( "deviceready", onDeviceReady );
 var activityViewArr;

 function onDeviceReady()
 {
	// var data="Task,Initiator,date,staus";
	var data=window.localStorage.getItem('ActivityView');
	activityViewArr=new Array();
	activityViewArr=data.split(',');
	var i=0;
	dv = document.getElementById('viewID'); 
	var gridText="";
		
	gridText=gridText+'<fieldset><h2><B>Task</B> </h2>&nbsp;&nbsp;&nbsp;'+activityViewArr[0]+'</fieldset><fieldset><h2><B>Description</B> </h2>&nbsp;&nbsp;&nbsp;'+activityViewArr[1]+'</fieldset><fieldset><h2><B>Initiator</B> </h2>&nbsp;&nbsp;&nbsp;'+activityViewArr[2]+'</fieldset><fieldset> <h2><B>Initiator Date</B> </h2>&nbsp;&nbsp;&nbsp;'+activityViewArr[3]+'</fieldset><fieldset><h2><B>Responsible Person</B> </h2>&nbsp;&nbsp;&nbsp;'+activityViewArr[4]+'</fieldset><fieldset><h2><B>Status</B> </h2>&nbsp;&nbsp;&nbsp;'+activityViewArr[5]+'</fieldset>' ;	
	//dv.innerHTML=gridText;
	dv.innerHTML=gridText+'<div class="clear"></div><br/><br/>  <fieldset class="last">  <div style="float:left; width:45%"><input type="button" value="Add Notes" class="submit"  onclick="AddNotes()"/></div><div style="float:right; width:45%"><input type="button" value="View Notes" class="submit"  onclick="ViewNotes()"/></div>  </fieldset><br/><br/>';

 }
 
function Back()
{
    	  document.forms[0].action="ActivityList.html";
		  document.forms[0].submit();
	
}

function AddNotes()
{
	document.forms[0].action="ActivityAddNotes.html";
    document.forms[0].submit();

}

function ViewNotes()
{
	document.forms[0].action="ActivityViewNotes.html";
    document.forms[0].submit();
	
}






function saveNotes()
{

    loadingScrnDsply() ;
	
   /* var notes=document.getElementById("message").value;
	var tokenID=window.localStorage.getItem("TokenID");
	var ActivityID=window.localStorage.getItem('ActivityID');

	var varType="GET";
	var varUrl=urlCall()+"/AddActivityNote?sTokenID="+tokenID+"&sNote="+notes+"&sActivityID="+ActivityID;
	var varData="";
	logConsole(varUrl);
    var varContentType="text/xml";
    var varDataType="xml";
    var varProcessData="true";
     $.get(varUrl,
				function(data){ $.ajax({
               type          : varType, 
               url           : varUrl, 
               data          : varData, 
               contentType   : varContentType,
               processdata   : varProcessData, //True or False
               dataType: "text",  success: function(data)
               {
					//alert("Rssponse :"+data);
					logConsole(data);
					stopLoadin();
					getResponse(data)
				                  		
               },
			  failure: function(data)
               {
				   logConsole(data);
            	   showAlert("Sorry, currently we are unable to process your request. Please try later.");
				   stopLoadin();
               }, async:false
                 });
      });
	  
	  */
	  
	   /* POST DATA*/
	   
	 var notes=document.getElementById("message").value;
	 var tokenID=window.localStorage.getItem("TokenID");
	 var ActivityID=window.localStorage.getItem('ActivityID');
	   
	 var varUrl=urlCall()+"/AddActivityNote";
	 var qStrings="sTokenID="+tokenID+"&sNote="+notes+"&sActivityID="+ActivityID;
	 logConsole(varUrl+' qStrings='+qStrings);
	 $.ajax({
			  type: "POST",
			  url: varUrl,
			  cache: false,
			  data: qStrings,
			  timeout: ajaxTimeOut,
			  contentType:"application/x-www-form-urlencoded",
			  dataType: "text", success: function(data)
			  {
				 	//alert("Rssponse :"+data);
					logConsole(data);
					stopLoadin();
					getResponse(data)
			  	 
			  },
			  dataType: "text", error: function(a,b,c)
			  {
				  if (b === "timeout")
				  {
					
				     stopLoadin();
			         showAlert("Not able to communicate to with Server, Try again later.");
					 
			      }
			  }
		});
	  
}

function getResponse(data)
{
	if(data.indexOf('>')==-1)
	{
		showAlert("Currently we are unable to process your request. Please try later.");
		return;
	}
	
	var respArray = new Array();
	respArray=data.split(">");
	var result=respArray[2].substring(0,respArray[2].length-8);
	if(result=="Success")
	{
		showAlert('You have successfully added Notes.');
		document.forms[0].action="ActivityView.html";
	 	document.forms[0].submit();
	}
	else
	{
		showAlert('Operation is not successfull.');
		
	}

}

function Back()
{
	 document.forms[0].action="ActivityView.html";
	 document.forms[0].submit();
	
}







 document.addEventListener( "deviceready", onDeviceReady ,false);
 /********LEAD INFO**********/
var clientID;
var leadID;
var company_Name;
/***LEAD CONTACT INFO**/
var ClientIDArr=new Array();
var LeadIDArr=new Array();
var ContactIDArr=new Array();
var ContactNameArr=new Array();
/***LEAD Attendees INFO**/
var UserIDArr=new Array();
var AttendeesArr=new Array();
var DateFormatInput="";
var startTime="";
var endTime="";
var subject="";
var notes="";
var dates="";
 
 function onDeviceReady()
 {
	//datePicker();
	loadingScrnDsply();
	var tokenID=window.localStorage.getItem("TokenID");
	var leadID=window.localStorage.getItem("LeadID");
    sendRequestList(tokenID,leadID);
 }
 
	var contactVal = "";
	var attendesstVal = "";
	function Contact()
	{
		var contactForm = document.forms.contactForm;
         var x = 0;
         for (x=0;x<contactForm.contact.length;x++)
         {
            if (contactForm.contact[x].selected)
            {
			         contactVal = contactVal + ContactIDArr[x] + "," ;	   
            }
         }
	}
	
	function Attendess()
	{
		var attendessForm = document.forms.attendessForm;
        
         var x = 0;
      
         for (x=0;x<attendessForm.attendess.length;x++)
         {
            if (attendessForm.attendess[x].selected)
            {
               
			   		attendesstVal = attendesstVal  + UserIDArr[x] + ",";
            }
         }
	}
	
 function datePicker()
 {
	 
	 new JsDatePick({
			useMode:2,
			target:"inputField",
			dateFormat:"%d-%M-%Y"
			/*selectedDate:{				
				day:5,						
				month:9,
				year:2006
			},
			yearsRange:[1978,2020],
			limitToToday:false,
			cellColorScheme:"beige",
			dateFormat:"%m-%d-%Y",
			imgPath:"img/",
			weekStartDay:1*/
		});
 }
 
 function Back()
{
    	  document.forms[0].action="ScheduleLead.html";
		  document.forms[0].submit();
  
}
///Call webservice using Ajax
/*************************************************/			    
function sendRequestList(tokenID,leadID)
{	
	/*var varType="GET";
	var varUrl=urlCall()+"/GetLeadContactnAttendees?sTokenID="+tokenID+"&sLeadID="+leadID;
	var varData="";
	logConsole(varUrl);
    var varContentType="text/xml";
    var varDataType="xml";
    var varProcessData="true";
    //$.post('http://45.pmam.com/PMAMCRMsms/ValidateDesktopUser.asmx/ValidateUser?sUserName="+username+"&sPassword="+password,
    $.get(varUrl,
				function(data){ $.ajax({
               type          : varType, 
               url           : varUrl, 
               data          : varData, 
               contentType   : varContentType,
               processdata   : varProcessData, //True or False
               dataType: "text/json",  success: function(data)
               {
					logConsole(data);
					stopLoadin();
					getResponse(data);
               },
			  error: function(data)
               {
            	   logConsole(data);
				   stopLoadin();
				   showAlert("Sorry, currently we are unable to process your request. Please try later.");
				   Back();
				   
               }, async:false
                 });
      });
	  
	  */
	  
	 var varUrl=urlCall()+"/GetLeadContactnAttendees";
	 var qStrings="sTokenID="+tokenID+"&sLeadID="+leadID;
	 logConsole(varUrl+' qStrings='+qStrings);
	 $.ajax({
			  type: "POST",
			  url: varUrl,
			  cache: false,
			  data: qStrings,
			  timeout: ajaxTimeOut,
			  contentType:"application/x-www-form-urlencoded",
			  dataType: "text", success: function(data)
			  {
				 	logConsole(data);
					stopLoadin();
					getResponse(data);
			  	 
			  },
			  dataType: "text", error: function(a, b, c)
			  {
				  if (b === "timeout")
				  {
					
				     stopLoadin();
			         showAlert("Not able to communicate to with Server, Try again later.");
					 Back();
			      }
				  
			  }
		});
	  
	
}

/********************************************************************/
function getResponse(data)
{
	
	if(data.indexOf('>')==-1)
	{
		showAlert("Currently we are unable to process your request. Please try later.");
		return;
	}
	
	var respArray = new Array();
	respArray=data.split(">");
	var result=respArray[2].substring(0,respArray[2].length-8);
	//alert(result);
	if(result=="Failed")
	{
	 showAlert('Currently we are unable to process your request. Please try later.');
	 Back();
	}
	else
	{
		responseGrid(result);
		
	}

}

function responseGrid(result)
{
	
	var data = JSON.parse(result);
	var i=0;
	/***LEAD INFO***/
		clientID=data.LeadInfo[0].ClientID;
		leadID=data.LeadInfo[0].LeadID;
		company_Name=data.LeadInfo[0].Company_Name;
		
	/**************************************/
	/***LEAD CONTACT INFO***/
	
	var leadContactLength=data.LeadContactInfo.length;
	for(i=0;i<leadContactLength;i++)
	{	
	    ClientIDArr[i]=data.LeadContactInfo[i].ClientID;
		LeadIDArr[i]=data.LeadContactInfo[i].LeadID;
		ContactIDArr[i]=data.LeadContactInfo[i].ContactID;
	 	ContactNameArr[i]=data.LeadContactInfo[i].ContactName;
		
	}	
	/**************************************/
	/***LEAD Attendess INFO***/
	var leadAttendeesLength=data.Attendees.length;
	for(i=0;i<leadAttendeesLength;i++)
	{	
	    UserIDArr[i]=data.Attendees[i].UserID;
		AttendeesArr[i]=data.Attendees[i].Attendees;
		
	}	
	/**************************************/
	
	DateFormatInput=data.DateFormatInput[0].UserDateFormat;
	
	var i=0;
	dv = document.getElementById('viewID'); 
	var startTimeArr=new Array('00:00 AM','00:15 AM','00:30 AM','00:45 AM','01:00 AM','01:15 AM','01:30 AM','01:45 AM','02:00 AM','02:15 AM','02:30 AM','02:45 AM','03:00 AM','03:15 AM','03:30 AM','03:45 AM','04:00 AM','04:15 AM','04:30 AM','04:45 AM','05:00 AM','05:15 AM','05:30 AM','05:45 AM','06:00 AM','06:15 AM','06:30 AM','06:45 AM','07:00 AM','07:15 AM','07:30 AM','07:45 AM','08:00 AM','08:15 AM','08:30 AM','08:45 AM','09:00 AM','08:15 AM','08:30 AM','08:45 AM','10:00 AM','10:15 AM','10:30 AM','10:45 AM','11:00 AM','11:15 AM','11:30 AM','11:45 AM','12:00 PM','01:15 PM','01:30 PM','01:45 PM','01:00 PM','02:15 PM','02:30 PM','02:45 PM','03:00 PM','03:15 PM','03:30 PM','03:45 PM','04:00 PM','04:15 PM','04:30 PM','04:45 PM','05:00 PM','05:15 PM','05:30 PM','05:45 PM','06:00 PM','06:15 PM','06:30 PM','06:45 PM','07:00 PM','07:15 PM','07:30 PM','07:45 PM','08:00 PM','08:15 PM','08:30 PM','08:45 PM','09:00 PM','09:15 PM','09:30 PM','09:45 PM','10:00 PM','10:15 PM','10:30 PM','10:45 PM','11:00 PM','11:15 PM','11:30 PM','11:45 PM');
	var gridText="";
	//var selectContactArr=new Array('Ram','Syham','Laxman','Bharat');
	//var selectAttendessArr=new Array('Ram','Syham','Laxman','Bharat','Ram','Ramesh');
	
	gridText=gridText+'<fieldset class="sales"><label><B>Company Name: </B>'+company_Name+'</label></fieldset><fieldset ><label><B>Date: </B></label><input type="text"  name="date" id="inputField" onKeyPress="return false;"  onKeyUp="return false;" class="foo"  value="" placeholder="DD-MM-YYYY"  /></fieldset>';
	
	//Start Time	
	gridText=gridText+'<fieldset ><label><B>Start Time:</B></label> <div class="state"><select name="startTime" id="startTime" >';
	for(i=0;i<startTimeArr.length;i++)
	{
	    if(i==32)
		  gridText=gridText+'<option value="'+startTimeArr[i]+'" selected>'+startTimeArr[i]+'</option> ';
		 else
		  gridText=gridText+'<option value="'+startTimeArr[i]+'">'+startTimeArr[i]+'</option> ';
	}
	
	gridText=gridText+'</select></div>';
	

	// End Time
	gridText=gridText+'<fieldset ><label><B>End Time:</B></label> <div class="state"><select name="endTime" id="endTime" >';
	for(i=0;i<startTimeArr.length;i++)
	{
	     if(i==32)
	         gridText=gridText+'<option value="'+startTimeArr[i]+'" selected>'+startTimeArr[i]+'</option> ';
		 else
		  	 gridText=gridText+'<option value="'+startTimeArr[i]+'">'+startTimeArr[i]+'</option> ';
	}
	
	gridText=gridText+'</select></div>';
	
	//Select Contact list
	gridText=gridText+'<fieldset > <label><B>Select Contact(s):</B> </label>	<form name="contactForm" method="post" action=""><div class="state"><select name="contact" id="contact"  multiple="multiple" >';
	
	for(i=0;i<ContactNameArr.length;i++)
	{
	  if(i==0)
	  	  gridText=gridText+'<option value="'+ContactNameArr[i]+'" selected>'+ContactNameArr[i]+'</option>';
	  else
	      gridText=gridText+'<option value="'+ContactNameArr[i]+'">'+ContactNameArr[i]+'</option>';	  
	}
	
    gridText=gridText+'</select></div></form></fieldset>';
	
	//Select attendeees
	gridText=gridText+'<fieldset > <label><B>Select Attendess:</B> </label><form name="attendessForm" method="post" action=""><div class="state"><select name="attendess" id="attendess"  multiple="multiple">';
	
	for(i=0;i<AttendeesArr.length;i++)
	{
	  if(i==0)
	    gridText=gridText+'<option value="'+AttendeesArr[i]+'" selected>'+AttendeesArr[i]+'</option>';
	  else
		
	     gridText=gridText+'<option value="'+AttendeesArr[i]+'">'+AttendeesArr[i]+'</option>';
	  
	}
	
	gridText=gridText+'</select></div> </form></fieldset>';
	/*****************************************/
	
	gridText=gridText+'<fieldset> <label><B>Subject:</B> </label><input type="text"  name="subject" id="subject"    class="foo"  value="" /></fieldset><fieldset> <label><B>Notes:</B> </label><textarea placeholder=""   id="notes" rows="5" ></textarea></fieldset> <br/><br/>';
	
	gridText=gridText+'<fieldset class="last"><div style="float:left; width:45%"><input type="button" value="Save" class="submit"  onclick="CallSave();"/></div><div style="float:right; width:45%"><input type="button" value="Back" class="submit"  onclick="Back();"/></div></fieldset><br/><br/></div>';
	
	dv.innerHTML=gridText;
	
	datePicker();
	
	
}

function convertDate(dates)
 {
	 var tempArr=new Array();
	
	 tempArr=dates.split('-');
	 if(tempArr[1].toLowerCase()=='jan' || tempArr[1].toLowerCase()=='01' || tempArr[1].toLowerCase()=='1')
	     tempArr[1]='01';
	 else if(tempArr[1].toLowerCase()=='feb' || tempArr[1].toLowerCase()=='02' || tempArr[1].toLowerCase()=='2')
	     tempArr[1]='02';
	 else if(tempArr[1].toLowerCase()=='mar' || tempArr[1].toLowerCase()=='03' || tempArr[1].toLowerCase()=='3')
	     tempArr[1]='03';
	 else if(tempArr[1].toLowerCase()=='apr' || tempArr[1].toLowerCase()=='04' || tempArr[1].toLowerCase()=='4')
	     tempArr[1]='04';
	 else if(tempArr[1].toLowerCase()=='may' || tempArr[1].toLowerCase()=='05' || tempArr[1].toLowerCase()=='5')
	     tempArr[1]='05';
	else if(tempArr[1].toLowerCase()=='jun' || tempArr[1].toLowerCase()=='06' || tempArr[1].toLowerCase()=='6')
	     tempArr[1]='06';
	else if(tempArr[1].toLowerCase()=='jul' || tempArr[1].toLowerCase()=='07' || tempArr[1].toLowerCase()=='7')
	     tempArr[1]='07';
	else if(tempArr[1].toLowerCase()=='aug' || tempArr[1].toLowerCase()=='08' || tempArr[1].toLowerCase()=='8')
	     tempArr[1]='08';
	else if(tempArr[1].toLowerCase()=='sep' || tempArr[1].toLowerCase()=='09' || tempArr[1].toLowerCase()=='9')
	     tempArr[1]='09';
	else if(tempArr[1].toLowerCase()=='oct' || tempArr[1].toLowerCase()=='10')
	     tempArr[1]='10';
	else if(tempArr[1].toLowerCase()=='nov' || tempArr[1].toLowerCase()=='11')
	     tempArr[1]='11';
	else if(tempArr[1].toLowerCase()=='dec' || tempArr[1].toLowerCase()=='12')
	     tempArr[1]='12';	 	
		 
    var date="";	
		 
	if(DateFormatInput=="dd/mm/yyyy" || DateFormatInput=="DD/MM/YYYY")	  	 	 	 	 	 	 	 	 	 
		 date= tempArr[0]+'/'+tempArr[1]+'/'+tempArr[2];
   else if(DateFormatInput=="mm/dd/yyyy" || DateFormatInput=="MM/DD/YYYY")	  	 	 	 	 	 	 	 	 	 
		 date= tempArr[1]+'/'+tempArr[0]+'/'+tempArr[2];
			 
	
	 return date;
 }

 function checkdate(strng) 
 {
	var dateregex =/^\d{1,2}\/\d{1,2}\/\d{2}$/;
	var error = "";
	if (strng == "")
	{
		error = "Please enter a date to in each of the date to fields in the format dd-mm-yyyy e.g. 01-dec-2012.\n";
		
	}
	else 
	{
		if (!(dateregex.test(strng)))
	    {
			error = "Please enter a valid date to in each of the date to fields in the format dd-mm-yyyy e.g. 01-dec-2012.\n";
		}
		else
		 {
			if (dateregex.test(strng))
			var error = ""
		}
	}
	return error;
} 


function validateTime(sStartTime,sEndTime)
{
			
            var sToday = new Date();
            
            sToday = (sToday.getMonth() + 1) + "/" + sToday.getDate() + "/" + sToday.getFullYear();

            sStartTime = sToday + " " + sStartTime;
            sEndTime = sToday + " " + sEndTime;
            if (Date.parse(sStartTime) > Date.parse(sEndTime)) 
			{
               return false; 
            }
           
	        return true;
	
}

 function validateCallSaveData()
 {
	  subject=document.getElementById('subject').value;
	  notes=document.getElementById('notes').value;
	  startTime=document.getElementById('startTime').value;
	  endTime=document.getElementById('endTime').value;
	  dates=document.getElementById('inputField').value;
	  
	  if(dates=="")
	  {
		   showAlert('Please enter a date.');
		   
		   return false;  
	   }
	   
	  if(dates.indexOf('-')==-1 || dates.split('-').length-1 !=2)
	  {
		 showAlert('Please enter a valid date like 01-dec-2012.');
		 return false; 
	  }
	 
	   if(validateTime(startTime,endTime)==false)
	   {
		   showAlert("Start Time is greater than End Time.");
		   document.getElementById('startTime').focus();
		   return false;  
	   }
	   
	    if(startTime==endTime)
	   {
		   showAlert("Start Time and End Time should be different.");
		   document.getElementById('startTime').focus();
		   return false;  
	   }
	   
	   
	   if(subject=="")
	   {
		   showAlert('Please enter a subject.');
		   document.getElementById('subject').focus();
		   return false;  
		   
	   }
	  
	  if(notes=="")
	   {
		   showAlert('Please enter a notes.');
		   document.getElementById('notes').focus();
		  return false;  
		   
	   }
	   return true;
	 
 }

function CallSave()
{
	    var selectContactArr=new Array();
		var attendeessContactArr=new Array();
	    Contact();
	    Attendess();
		//console.log('contactVal='+contactVal);
	    //console.log('attendesstVal='+attendesstVal);
		if(contactVal.length!=0)
		    selectContactArr=contactVal.substring(0,contactVal.length-1).split(',');
		
		if(attendesstVal.length!=0)	
			attendeessContactArr=attendesstVal.substring(0,attendesstVal.length-1).split(',');
	   
		contactVal="";
		attendesstVal="";
	    startTime=document.getElementById('startTime').value;
		endTime=document.getElementById('endTime').value;
		subject=document.getElementById('subject').value;
		notes=document.getElementById('notes').value;
		dates=document.getElementById('inputField').value;
		
		
	     if(validateCallSaveData()==false)
		   return;
	   
		dates=convertDate(dates);
		
		//console.log('startTime='+startTime +" endTime="+endTime + ' subject='+subject + ' notes='+notes +' dates='+ dates);
	  
    loadingScrnDsply();
	
	var leadInfo='"CallDetail":[{"LeadID":"'+leadID+'","CallDate":"'+dates+'","CallStartTime":"'+startTime+'","CallEndTime":"'+endTime+'","Subject":"'+subject+'","Note":"'+notes+'"}],';
	
	
	var contactInfo="";	
	var  contact='"CallContact":[';
	
	for(var i=0;i<selectContactArr.length;i++)	
	{
		if(contactInfo=="")
		{
			contactInfo='{"ContactID":"'+selectContactArr[i]+'"}';	
		}
		else
		{
			contactInfo+=',{"ContactID":"'+selectContactArr[i]+'"}';		
		}
		
	}
	
	var attendessContactInfo="";	
	var  attendeessContact='"CallAttendees":[';
	
	for(var i=0;i<attendeessContactArr.length;i++)	
	{
		if(attendessContactInfo=="")
		{
			attendessContactInfo='{"UserID":"'+attendeessContactArr[i]+'"}';	
		}
		else
		{
			attendessContactInfo+=',{"UserID":"'+attendeessContactArr[i]+'"}';		
		}
		
	
	}
	
	 contact=contact+ contactInfo +'],'+attendeessContact+ attendessContactInfo+']';
	
	/*if(contactID.length==1)
	  contact=contact+ contactInfo +']';
	else
	 contact=contact+ contactInfo.substring(0,contactInfo.length-1)+']';
	   */
	//contact=contact+ contactInfo.substring(0,contactInfo.length-1)+']';
	var editLead='{'+leadInfo+contact+'}';
	
	//console.log('editLead='+ editLead);
	var tokenID=window.localStorage.getItem("TokenID");
	 
	 /* POST DATA*/
	 var varUrl=urlCall()+"/AddScheduleCall";
	// qStrings='{"sTokenID":'+tokenID+'","sData":"'+editLead+'"}';
	 qStrings="sTokenID="+tokenID+"&sData="+editLead;
	 logConsole(varUrl+' qStrings='+qStrings);
	 $.ajax({
			  type: "POST",
			  url: varUrl,
			  cache: false,
			  data: qStrings,
			  timeout: ajaxTimeOut,
			  contentType:"application/x-www-form-urlencoded",
			  dataType: "text", success: function(data)
			  {
				    logConsole(data);
					stopLoadin();
					getEditLeadResponse(data);
					
			  	 
			  },
			 dataType: "text", error: function(a, b, c)
			  {
				  if (b === "timeout")
				  {
					
				     stopLoadin();
			         showAlert("Not able to communicate to with Server, Try again later.");
					
			      }
				  
			  }
		});
	 
	
}


function getEditLeadResponse(data)
{
	if(data.indexOf('>')==-1)
	{
		showAlert("Currently we are unable to process your request. Please try later.");
		return;
	}
	
	var respArray = new Array();
	respArray=data.split(">");
	var result=respArray[2].substring(0,respArray[2].length-8);
	
	if(result=="Failed")
	{
		showAlert('Currently we are unable to process your request. Please try later.');
		
	}
	else if(result=="Success")
	{
		showAlert('You have sucessfully saved schedule call.');
		document.forms[0].action="ScheduleCallSave.html";
        document.forms[0].submit();
		
	}

}





document.addEventListener("backbutton", backKeyDown, true);
function backKeyDown()
{
	    // Call my back key code here.
	  //  alert('go back!');
	   //navigator.app.exitApps();
	   //window.location='expense_piechart.html';
}  

ajaxTimeOut=60000;


//Creating dynamic header/footer
function create_div()
{	
	//Header
	var dv = document.createElement('div');
	dv.setAttribute('id',"top-bar"); 
	dv.innerHTML=header();
	document.frmHeader.appendChild(dv);
	
	//Footer
	var dv1 = document.createElement('div');
	dv1.setAttribute('data-role',"footer");
	dv1.innerHTML=footer();	
	document.frmFooter.appendChild(dv1);
}



function urlCall()
{
	
	 // var urlVal="http://10.10.0.98/CRM2008/CRM_MobileAppSvc.asmx";	//Local
     //  var urlVal="http://10.10.12.1/PMAMCRM2008/CRM_MobileAppSvc.asmx";	//Virtual
	// var urlVal="http://49.248.22.166/PMAMCRM2008/CRM_MobileAppSvc.asmx";	//Virtual
      var urlVal="https://www.pmamcrm.com/CRM_MobileAppSvc.asmx";	//Live
	 
	 // var urlVal="http://10.10.0.98/CRMMobileApp/CRM_MobileAppSvc.asmx";	//local IP
	 
	

	return urlVal;
}

function appTimeOut()
{
	var appTimeOutVal="50000";
	return appTimeOutVal;
}

function disableScrn()
{
	document.getElementById('light').style.display='block';
	document.getElementById('fade').style.display='block';
}

function enableScrn()
{
	document.getElementById('light').style.display='none';
	document.getElementById('fade').style.display='none';	
}

function check_network() 
{
  
	var networkState = navigator.connection.type;

    var states = {};
    states[Connection.UNKNOWN]  = 'Unknown connection';
    states[Connection.ETHERNET] = 'Ethernet connection';
    states[Connection.WIFI]     = 'WiFi connection';
    states[Connection.CELL_2G]  = 'Cell 2G connection';
    states[Connection.CELL_3G]  = 'Cell 3G connection';
    states[Connection.CELL_4G]  = 'Cell 4G connection';
    states[Connection.NONE]     = 'No network connection';
	
	//alert('Connection type: ' + states[networkState]);

	    
    if(states[networkState]==states[Connection.NONE] || states[networkState]==states[Connection.UNKNOWN])
	{
       
	   /*confirm('A network connection is required to access this page, please check your network connection and login again.');
	    navigator.app.exitApp();
        Backbutton.exitApp();
        devicec.exitApp();*/
		alert('A network connection is required to access this page, please check your network connection and login again.');
        return false;
    }
	else
	{
          //confirm('Connection type:\n ' + states[networkState]);
        return true;    
    } 
}

var cl;
//Loading Functions
function loadingScrnDsply()
{
	
	//disableScrn();
	cl = new CanvasLoader('canvasloader-container');
	cl.setColor('#dde4f0'); // default is '#000000'
    cl.setDiameter(27); // default is 40
    cl.setDensity(50); // default is 40
    cl.setRange(0.8); // default is 1.3
    cl.setFPS(30); // default is 24
	cl.show(); // Hidden by default
    var ld= document.getElementById("canvasLayout");
    ld.style.display='block'; 
	
	
}

function stopLoadin()
{  
   
	var loading= document.getElementById("canvasLayout");
    loading.style.display='none';
	cl.hide();
	//enableScrn(); 
}

function errorResponse(response)
{
	if(trim(response).length<=0)
		response="We are currently unable to process your request. Please try later.";
		
	alert(response);
	return;
}

function exitApp()
{
	
	navigator.app.exitApp(); 
	//Backbutton.exitApp();
	//devicec.exitApp();
}

function homePage()
{
	
	document.forms[0].action="main_menu.html";
	//document.MyGPSPage.submit();
	document.forms[0].submit();
}

function backPage()
{
	
	document.forms[0].action="login.html";
	//document.MyGPSPage.submit();
	document.forms[0].submit();
}


//TRIM LEFT ,RIGHT STRING
function ltrim(str) {
	for ( var k = 0; k < str.length && isWhitespace(str.charAt(k)); k++)
		;
	return str.substring(k, str.length);
}

function rtrim(str) {
	for ( var j = str.length - 1; j >= 0 && isWhitespace(str.charAt(j)); j--)
		;
	return str.substring(0, j + 1);
}

function trim(str) {
	return ltrim(rtrim(str));
}



function isWhitespace(charToCheck) {
	var whitespaceChars = " \t\n\r\f";
	return (whitespaceChars.indexOf(charToCheck) != -1);
}

// alert dialog dismissed
    function alertDismissed() 
	{
        // do something
    }

    // Show a custom alert
    function showAlert(message) 
	{
        navigator.notification.alert(
            message,  // message
            alertDismissed,         // callback
            'Info',            // title
            'OK'                  // buttonName
        );
    }
	
	
	
	
	function logConsole(data)
	{
		
		//console.log(data);
	}
	
	function stringTrim(str)
	{
		return str.replace(/^\s+|\s+$/g,'');
		
	}
	
	
	function getTimes()
	{
		var dCurrDateTime = new Date();
        return (dCurrDateTime.getMonth() + 1) + '/' + dCurrDateTime.getDate() + '/' + dCurrDateTime.getFullYear() + ' ' + dCurrDateTime.getHours() + ':' + dCurrDateTime.getMinutes() + ':' + dCurrDateTime.getSeconds();
		
		
	}
	
	function JQMLoadingStart()
	{
		 $.mobile.loading( 'show', {
					text: 'loading',
					textVisible: false,
					theme: 'a',
					textonly: false,
					html: ""
			});
		
	}
	
	function JQMLoadingStop()
	{
		$.mobile.loading( 'hide' );
		
	}

 document.addEventListener( "deviceready", onDeviceReady,false );
 
 function onDeviceReady()
 {
 }
 
 
 function Save()
 {
	 
		if(validate()==false)
		{
		   showAlert("Please enter company name");
		   return;
		}
		else
		{
			var companyName=document.getElementById("companyName").value;
			var location=document.getElementById("location").value;
		    var eRange=document.getElementById("eRange").value;
			
			window.localStorage.setItem('IsAccount','N');
			window.localStorage.setItem('Type','S');
			window.localStorage.setItem('CompanyName',companyName);
			window.localStorage.setItem('Location',location);
			window.localStorage.setItem('ERange',eRange);
			window.localStorage.setItem('setNotes','0');
			document.forms[0].action="Lead.html";
            document.forms[0].submit();
		}
	 
 }
 
 
 function Back()
{
    var setNote=window.localStorage.getItem('setNotes');
	
	if(	setNote=='1')
	{
		  document.forms[0].action="main_menu.html";
		  document.forms[0].submit();
	}
	else
	 {
		 document.forms[0].action="LeadsAccount.html";
	     document.forms[0].submit();
	 }

}
// validation
/***********************************/

	function validate()
	{
		var companyName=document.getElementById("companyName").value;
		var location=document.getElementById("location").value;
		
		
		if(companyName=="")
		{
		  return false;
		
		}
		return true;
	}
/*******************************************/
	 





 function callWebService()
 {
	 
	if(check_network())
	{
		var username=document.getElementById("username").value;
		var password=document.getElementById("password").value;
		
		//alert("username=" +username +" password="+password);
		 window.localStorage.setItem("username",username);
		//window.localStorage.setItem("password",password);
		
		if(validate()==false)
		{
		  // showAlert('Please Enter Username and Password.') ;	
		   showAlert("Please Enter Username and Password.");
		   document.getElementById('username').focus();
		   return;
		}
		
		loadingScrnDsply();
		senRequestLogin(username,password);
	 
	}
	
 }
 
 function SignUP()
 {
 	window.localStorage.setItem('isDisclaimer','0');
	window.localStorage.setItem('countRegister',0);
	
	window.localStorage.removeItem('randomNumber');
    document.forms[0].action="Registration.html";
	document.forms[0].submit();
 
 }

// validation
/***********************************/

	function validate()
	{
		var username=document.getElementById("username").value;
		var password=document.getElementById("password").value;
		
		if(username=="" |password=="")
		{
			return false;
			
		}
		return true;
	}
	    
function senRequestLogin(username,password)
{	
	/*var varType="GET";
	var varUrl=urlCall()+"/ValidateUser?sUserName="+username+"&sPassword="+password;
	var varData="";
	logConsole(varUrl);
    var varContentType="text/xml";
    var varDataType="xml";
    var varProcessData="true";
    //$.post('http://45.pmam.com/PMAMCRMsms/ValidateDesktopUser.asmx/ValidateUser?sUserName="+username+"&sPassword="+password,
    $.get(varUrl,
				function(data)
				{ $.ajax({
               type          : varType, 
               url           : varUrl, 
               data          : varData, 
               contentType   : varContentType,
               processdata   : varProcessData, //True or False
               dataType: "text",  success: function(data)
               {
					
					logConsole(data);
					stopLoadin();
					getResponse(data);
					
               },
			  error: function(data)
               {
            	 
				 logConsole(data);
				  stopLoadin();
				  showAlert("Sorry, currently we are unable to process your request. Please try later.");
               }, async:false
                 });
      });
	*/
	
		 
	 /* POST DATA*/
	 var varUrl=urlCall()+"/ValidateUser";
	 var qStrings="sUserName="+username+"&sPassword="+password;
	 logConsole(varUrl+' qStrings='+qStrings);
	 $.ajax({
			  type: "POST",
			  url: varUrl,
			  cache: false,
			  data: qStrings,
			  timeout: ajaxTimeOut,
			  contentType:"application/x-www-form-urlencoded",
			  dataType: "text", success: function(data)
			  {
				 	logConsole(data);
					stopLoadin();
					getResponse(data);
			  	 
			  },
			   dataType: "text", error: function(a,b,c)
			  {
				  if (b === "timeout")
				  {
					
				     stopLoadin();
			         showAlert("Not able to communicate to with Server, Try again later.");
					 
			      }
			  }
		});
	 
}

/*function senRequestLogin(username,password)
{	
	var varType="GET";
	var varUrl="https://www.pmamcrm.com/CRM_MobileAppSvc.asmx/ValidateUser?sUserName="+username+"&sPassword="+password;
	var varData="";
    var varContentType="text/json";
    var varDataType="json";
    var varProcessData="true";
    //$.post(varUrl,
    $.get(varUrl,
				function(data)
				{ $.ajax({
               type          : varType, 
               url           : varUrl, 
               data          : varData, 
               contentType   : varContentType,
               processdata   : varProcessData, //True or False
               dataType: "text",  success: function(data)
               {
					
					console.log('Success='+data);
					getResponse(data);
					
               },
			  error: function(data)
               {
            	 
				  console.log('Error='+data);
				  alert("Sorry, Currently we are unable to process your request. Please try later.");
               }, async:false
                 });
      });
	
}
*/


/********************************************************************/
function getResponse(data)
{
	
	
	if(data.indexOf('>')==-1)
	{
		showAlert("Currently we are unable to process your request. Please try later.");
		return;
	}
	var respArray = new Array();
	respArray=data.split(">");
	var result=respArray[2].substring(0,respArray[2].length-8);
	//alert(result);
	if(result=="Failed")
	{
		
		showAlert('Incorrect Username or Password.');
	
	}
	else
	{
		window.localStorage.setItem("login",1);
		window.localStorage.setItem('Type','N');
		window.localStorage.setItem("TokenID",result);
		document.forms[0].data.value = username;
		document.forms[0].submit();	
		
		
	}
	
}




document.addEventListener( "deviceready", onDeviceReady,false );
function Back()
{
	
	document.forms[0].action="LeadInfo.html";
	document.forms[0].submit();

}

function onDeviceReady()
{
	dv = document.getElementById('content'); 
	var gridText="";
	var phone=window.localStorage.getItem("Phone");
	var homePhone=window.localStorage.getItem("HomePhone");
	var cellPhone=window.localStorage.getItem("CellPhone");
 	var assistantName=window.localStorage.getItem("AssistantName");
	var assistantWorkPhone=window.localStorage.getItem("AssistantWorkPhone");
	var assistantCellPhone=window.localStorage.getItem("AssistantCellPhone");
	var officePhone=window.localStorage.getItem("OfficePhone");
	var officeMobile=window.localStorage.getItem("OfficeMobile");
	gridText=gridText+'<br/><fieldset><h2>Phone :<a  href="tel:'+phone+'" onclick="" style="color:#09F" > '+phone+'</a>	</h2></fieldset><fieldset><h2>HomePhone :<a href="tel:'+homePhone+'" onclick="" style="color:#09F" >  '+homePhone+'</a></h2></fieldset><fieldset><h2>CellPhone : <a href="tel:'+cellPhone+'" onclick="" style="color:#09F" >  '+cellPhone+'</a></h2></fieldset><fieldset><h2>AssistantName : <a href="" onclick="" style="color:#09F" >  '+assistantName+'</a></h2></fieldset><fieldset><h2>AssistantWorkPhone : <a href="tel:'+assistantWorkPhone+'" onclick="" style="color:#09F" >  '+assistantWorkPhone+'</a></h2></fieldset><fieldset><h2>AssistantCellPhone : <a href="tel:'+assistantCellPhone+'" onclick="" style="color:#09F" >  '+assistantCellPhone+'</a></h2></fieldset><fieldset><h2>OfficePhone : <a href="tel:'+officePhone+'" onclick="" style="color:#09F" >  '+officePhone+'</a></h2></fieldset><fieldset><h2>OfficeMobile : <a href="tel:'+officeMobile+'" onclick="" style="color:#09F" >  '+officeMobile+'</a></h2></fieldset><br /><fieldset class="last"><div class="midcontent"><div style="float:right; width:100%"><input type="button" value="Back" class="submit"  onclick="Back();"/></div></div></fieldset></div><form action=""></form>' ;		
	dv.innerHTML=gridText;
		
}

document.addEventListener( "deviceready", onDeviceReady );
var LeadID;
var Company_Name;
var Invoice_Number;
var Invoice_Date;
var SubTotal;
var SalesTax;
var SalesTaxAmount;
var TotalAmount;
var ProductNameArr=new Array();
var QuantityArr=new Array();
var PriceArr=new Array();
var AmountArr=new Array();
 
 function onDeviceReady()
 {
	 loadingScrnDsply();
	 InvoiceID=window.localStorage.getItem("InvoiceID");
	 InvoiceVersion=window.localStorage.getItem("InvoiceVersion");
	 var tokenID=window.localStorage.getItem("TokenID");
     sendRequestList(tokenID,InvoiceID,InvoiceVersion);
 }
 
 function Back()
{
    	  document.forms[0].action="SalesOrderList.html";
		  document.forms[0].submit();
}

///Call webservice using Ajax
/*************************************************/			    
function sendRequestList(tokenID,InvoiceID,InvoiceVersion)
{	
	/*var varType="GET";
	var varUrl=urlCall()+"/GetOrderDetail?sTokenID="+tokenID+"&sInvoiceID="+InvoiceID+"&sInvoiceVersion="+InvoiceVersion;
	var varData="";
	logConsole(varUrl);
    var varContentType="text/xml";
    var varDataType="xml";
    var varProcessData="true";
    //$.post('http://45.pmam.com/PMAMCRMsms/ValidateDesktopUser.asmx/ValidateUser?sUserName="+username+"&sPassword="+password,
    $.get(varUrl,
				function(data){ $.ajax({
               type          : varType, 
               url           : varUrl, 
               data          : varData, 
               contentType   : varContentType,
               processdata   : varProcessData, //True or False
               dataType: "text/json",  success: function(data)
               {
					logConsole(data);
					stopLoadin();
					getResponse(data);
               },
			  error: function(data)
               {
            	   logConsole(data);
				   stopLoadin();
				   showAlert("Sorry, currently we are unable to process your request. Please try later.");
				   Back();
				   
               }, async:false
                 });
      });
	*/
	
	 var varUrl=urlCall()+"/GetOrderDetail";
	 var qStrings="sTokenID="+tokenID+"&sInvoiceID="+InvoiceID+"&sInvoiceVersion="+InvoiceVersion;
	 logConsole(varUrl+' qStrings='+qStrings);
	 $.ajax({
			  type: "POST",
			  url: varUrl,
			  cache: false,
			  data: qStrings,
			  timeout: ajaxTimeOut,
			  contentType:"application/x-www-form-urlencoded",
			  dataType: "text", success: function(data)
			  {
				 	logConsole(data);
					stopLoadin();
					getResponse(data);
			  	 
			  },
			 dataType: "text", error: function(a, b, c)
			  {
				  if (b === "timeout")
				  {
					
				     stopLoadin();
			         showAlert("Not able to communicate to with Server, Try again later.");
					 Back();
			      }
				  
			  }
		});
}
/********************************************************************/
function getResponse(data)
{
	if(data.indexOf('>')==-1)
	{
		showAlert("Currently we are unable to process your request. Please try later.");
		return;
	}
	var respArray = new Array();
	respArray=data.split(">");
	var result=respArray[2].substring(0,respArray[2].length-8);
	//alert(result);
	if(result=="Failed")
	{
	 showAlert('Currently we are unable to process your request. Please try later.');
	 Back();
	}
	else
	{
		responseGrid(result);
		
	}
}

function responseGrid(result)
{
	
	var data = JSON.parse(result);
    var OrderInfoLength=data.OrderInfo.length;
     LeadID=data.OrderInfo[0].LeadID;
	 Company_Name=data.OrderInfo[0].Company_Name;
	 Invoice_Number=data.OrderInfo[0].Invoice_Number;
	 Invoice_Date=data.OrderInfo[0].Invoice_Date;
	 SubTotal=data.OrderInfo[0].SubTotal;
	 SalesTax=data.OrderInfo[0].SalesTax;
	 SalesTaxAmount=data.OrderInfo[0].SalesTaxAmount;
	 TotalAmount=data.OrderInfo[0].TotalAmount;
	for(i=0;i<data.OrderDetails.length;i++)
	{	
		
		 ProductNameArr[i]=data.OrderDetails[i].ProductName;
		 QuantityArr[i]=data.OrderDetails[i].Quantity;
		 PriceArr[i]=data.OrderDetails[i].Price;
		 AmountArr[i]=data.OrderDetails[i].Amount;
	}	
	
	var i=0;
	dv = document.getElementById('viewID'); 
	var gridText="";
	/*var ProductNameArr=new Array("computer","printer","scanner");
	var QuantityArr=new Array('50','20','5');
	var AmountArr=new Array('25000','10000','8000');*/
	
	gridText=gridText+'<fieldset><label><B>Company Name: </B>'+Company_Name+'</label></fieldset><fieldset><label><B>Invoice No.  : </B>'+Invoice_Number+'</label>  </fieldset><fieldset> <label><B>Date: </B>'+Invoice_Date+'</label></fieldset>';
	
	gridText=gridText+'<div class="ui-grid-b grid-head"><div class="ui-block-a header"><B>Product Name</B></div><div class="ui-block-b header"><B>Quantity</B></div><div class="ui-block-c header"><B>Amount</B></div></div>';
	
	for(i=0;i<ProductNameArr.length;i++)
	{
	gridText=gridText+'<div class="ui-grid-b"><div class="ui-block-a" id="dateID">'+ProductNameArr[i]+'</div><div class="ui-block-b">'+QuantityArr[i]+'</div><div class="ui-block-c" id="amountID">'+AmountArr[i]+'</div></div>' ;	
	
	}
	
	gridText=gridText+'<div style="float:right;"><fieldset><h2><B>SubTotal: </B> '+SubTotal+'	</h2></fieldset>  <fieldset><h2><B>Sales Tax%  :</B>'+SalesTax+'</h2></fieldset><fieldset><h2><B>Sales Tax Amount :</B>'+SalesTaxAmount+'</h2></fieldset><fieldset><h2><B>Total Amount : </B>'+TotalAmount+'</h2>	     </fieldset></div>';
	
	//dv.innerHTML=gridText;
	dv.innerHTML=gridText+'<div class="clear"></div><br/><br/><fieldset class="last"><div class="midcontent"><div style="float:right; width:100%"><input type="button" value="Back" class="submit"  onclick="Back();"/></div></div></fieldset><br/><br/>';
	
}


document.addEventListener( "deviceready", onDeviceReady );
var ClientIDArr=new Array();
var SalesOrderIDArr=new Array();
var LeadIDArr=new Array();
var Invoice_NumberArr=new Array();
var Invoice_DateArr=new Array();
var TotalAmountArr=new Array();
var Company_NameArr=new Array();
var SubAmountArr=new Array();
var SalesTaxPercentArr=new Array();
var VersionIDArr=new Array();
 function onDeviceReady()
 {
	 
	 loadingScrnDsply();
	 var tokenID=window.localStorage.getItem("TokenID");
     sendRequestList(tokenID);
	
 }
 

function Back()
{
    	  document.forms[0].action="main_menu.html";
		  document.forms[0].submit();
}
///Call webservice using Ajax
/*************************************************/			    
function sendRequestList(tokenID)
{	
	/*var varType="GET";
	var varUrl=urlCall()+"/GetOrderList?sTokenID="+tokenID;
	var varData="";
	logConsole(varUrl);
    var varContentType="text/xml";
    var varDataType="xml";
    var varProcessData="true";
    //$.post('http://45.pmam.com/PMAMCRMsms/ValidateDesktopUser.asmx/ValidateUser?sUserName="+username+"&sPassword="+password,
    $.get(varUrl,
				function(data){ $.ajax({
               type          : varType, 
               url           : varUrl, 
               data          : varData, 
               contentType   : varContentType,
               processdata   : varProcessData, //True or False
               dataType: "text/json",  success: function(data)
               {
					logConsole(data);
					stopLoadin();
					getResponse(data);
               },
			  error: function(data)
               {
            	   logConsole(data);
				   stopLoadin();
				   showAlert("Sorry, currently we are unable to process your request. Please try later.");
				   Back();
				   
               }, async:false
                 });
      });
	*/
	
	 var varUrl=urlCall()+"/GetOrderList";
	 var qStrings="sTokenID="+tokenID;
	 logConsole(varUrl+' qStrings='+qStrings);
	 $.ajax({
			  type: "POST",
			  url: varUrl,
			  cache: false,
			  data: qStrings,
			  timeout: ajaxTimeOut,
			  contentType:"application/x-www-form-urlencoded",
			  dataType: "text", success: function(data)
			  {
				 	logConsole(data);
					stopLoadin();
					getResponse(data);
			  	 
			  },
			   dataType: "text", error: function(a, b, c)
			  {
				  if (b === "timeout")
				  {
					
				     stopLoadin();
			         showAlert("Not able to communicate to with Server, Try again later.");
					 Back();
			      }
				  
			  }
		});
	
	
	
}
/********************************************************************/
function getResponse(data)
{
	if(data.indexOf('>')==-1)
	{
		showAlert("Currently we are unable to process your request. Please try later.");
		return;
	}
	var respArray = new Array();
	respArray=data.split(">");
	var result=respArray[2].substring(0,respArray[2].length-8);
	//alert(result);
	if(result=="Failed")
	{
	 showAlert('Currently we are unable to process your request. Please try later.');
	 Back();
	}
	else
	{
		responseGrid(result);
		
	}
}

function responseGrid(result)
{
	var data = JSON.parse(result);
    var orderListLength=data.Orders.length;
    console.log('No. of OrderList ='+orderListLength);
	if(orderListLength==0)
	 {
		  showAlert('There are no Order List .');
		  Back();
	 }
	 
	for(i=0;i<data.Orders.length;i++)
	{	
		
		 ClientIDArr[i]=data.Orders[i].ClientID;
		 SalesOrderIDArr[i]=data.Orders[i].SalesOrderID;
		 LeadIDArr[i]=data.Orders[i].LeadID;
		 Invoice_NumberArr[i]=data.Orders[i].Invoice_Number;
		 Invoice_DateArr[i]=data.Orders[i].Invoice_Date;
		 TotalAmountArr[i]=data.Orders[i].TotalAmount;
		 Company_NameArr[i]=data.Orders[i].Company_Name;
		 SubAmountArr[i]=data.Orders[i].SubAmount;
		 SalesTaxPercentArr[i]=data.Orders[i].SalesTaxPercent;
		 VersionIDArr[i]=data.Orders[i].VersionID;
	}	
	
	var i=0;
	dv = document.getElementById('viewID'); 
	var gridText="";
	/*var Invoice_NumberArr=new Array("201241","201242","201243","201244","201245","201246","201247","201248","201249","201210","2012411","201212","201213","2012414","2012415","2012416","2012417","2012418");
	var Company_NameArr=new Array('Infosys','Reliance','TCS','Infosys','Reliance','TCS','Infosys ','Reliance','TCS','Infosys ','Reliance','TCS','Infosys','Reliance','TCS','Infosys','Reliance','TCS');
	var Invoice_DateArr=new Array('25/12/12','26/12/12','20/12/12','25/12/12','26/12/12','20/12/12','25/12/12','26/12/12','20/12/12','25/12/12','26/12/12','20/12/12','25/12/12','26/12/12','20/12/12','25/12/12','26/12/12','20/12/12');
	var TotalAmountArr=new Array('25000','10000','8000','25000','10000','8000','25000','10000','8000','25000','10000','8000','25000','10000','8000','25000','10000','8000');*/
	
	//gridText=gridText+'<fieldset><h2><B>Company Name: </B>Infosys Ltd 	</h2></fieldset><fieldset><h2><B>Invoice No.  : </B>2451245</h2>  </fieldset><fieldset> <h2><B>Date         : </B>24/5/2012</h2></fieldset>';
	gridText=gridText+'<div id="paging_container7" class="container"><div class="page_navigation"></div><ul class="content"><br>';
	gridText=gridText+'</br><div class="ui-grid-c grid-head"><div class="ui-block-a header">Invoice</div><div class="ui-block-b header">Name</div><div class="ui-block-c header">Date</div><div class="ui-block-d header">Amount</div></div>';
	
	for(i=0;i<data.Orders.length;i++)
	{
	gridText=gridText+'<li><div class="clear"></div><a href="SalesOrderView.html" onclick="setOrderListID('+i+')"><div class="ui-grid-c"><div class="ui-block-a" id="dateID">'+Invoice_NumberArr[i]+'</div><div class="ui-block-b">'+Company_NameArr[i]+'</div><div class="ui-block-c" id="amountID">'+Invoice_DateArr[i]+'</div><div class="ui-block-d" id="amountID">'+TotalAmountArr[i]+'</div></div></a></li>' ;	
	}
	//gridText=gridText+'<div style="float:right;"><fieldset><h2><B>SubTotal: </B> 30000	</h2></fieldset>  <fieldset><h2><B>Sales Tax%  :</B> 12</h2></fieldset><fieldset><h2><B>Sales Tax Amount :</B> 20000</h2></fieldset><fieldset><h2><B>Total Amount : </B>20000</h2>	     </fieldset></div>';
	
	gridText=gridText+'</ul></div>';
	//dv.innerHTML=gridText;
	dv.innerHTML=gridText+'<br/><br/><fieldset class="last"><div class="midcontent"><div style="float:right; width:100%"><input type="button" value="Back" class="submit"  onclick="Back();"/></div></div></fieldset><br/><br/>';
	
	$(document).ready(function(){
				$('#paging_container7').pajinate({
					num_page_links_to_display :5,
					items_per_page :16,
					
				});
				
			});		
			
			$(document).ready(function()
			{
				//$('li:odd, .content > *:odd').css('background-color','#29A5D0');
				//$('li:odd, .content > *:odd').css('color','#fff');
				
			 /*  $('li:odd, .content > *:odd').css('background-color','#fcfcfc');
				$('li:odd, .content > *:odd').css('color','#29A6CE');
				$('li:odd, .content > *:odd').css('border','#C1C1C1 solid 1px');
				
				$('li:even, .content > *:even').css('background-color','#fff');
				$('li:even, .content > *:even').css('color','#29A6CE');
				$('li:even, .content > *:even').css('border','#C1C1C1 solid 1px');*/
				
				
			});
	
}

function setOrderListID(j)
{
	
	 window.localStorage.setItem("InvoiceID",SalesOrderIDArr[j]);
	 window.localStorage.setItem("InvoiceVersion",VersionIDArr[j]);
	
}


 document.addEventListener( "deviceready", onDeviceReady,false );
 
 function onDeviceReady()
 {
 }
 
 
 function Save()
 {
	 
		if(validate()==false)
		{
		   showAlert("Please enter company name");
		   return;
		}
		else
		{
			var companyName=document.getElementById("companyName").value;
			var location=document.getElementById("location").value;
		    var eRange=document.getElementById("eRange").value;
			
			window.localStorage.setItem('IsAccount','N');
			window.localStorage.setItem('Type','S');
			window.localStorage.setItem('CompanyName',companyName);
			window.localStorage.setItem('Location',location);
			window.localStorage.setItem('ERange',eRange);
			document.forms[0].action="ScheduleLead.html";
            document.forms[0].submit();
		}
	 
 }
 
 
function Back()
{
	
	window.localStorage.setItem('Type','N');
   	document.forms[0].action="ScheduleMenu.html";
	document.forms[0].submit();
	
}
// validation
/***********************************/

	function validate()
	{
		var companyName=document.getElementById("companyName").value;
		var location=document.getElementById("location").value;
		
		
		if(companyName=="")
		{
		  return false;
		
		}
		return true;
	}
/*******************************************/
	 





 document.addEventListener( "deviceready", onDeviceReady,false );
 var email="";
 var sCtr=1;
 
 function onDeviceReady()
 {
	 email=window.localStorage.getItem("Email");
	 document.getElementById('EmailTo').value=email;
 }
 
 
 function send()
 {
    if(check_network())
	{
			if(validate())
			{
			 // JQMLoadingStart();
			 loadingScrnDsply();
			 var varUrl=urlCall()+"/GetListDelay";
			 var qStrings="sTokenID="+tokenID+"&IsAccount="+isAccount+"&sCtr="+sCtr;
			 sCtr++;
			 logConsole(varUrl+' qStrings='+qStrings);
			 $.ajax({
					  type: "POST",
					  url: varUrl,
					  cache: false,
					  data: qStrings,
					  contentType:"application/x-www-form-urlencoded",
					  dataType: "text", success: function(data)
					  {
							logConsole(data);
							//JQMLoadingStop();
							stopLoadin();
							getResponse(data);
						 
					  },
					  dataType: "text", error: function(data)
					  {
						   logConsole(data);
						   stopLoadin();
						   showAlert("Currently we are unable to process your request. Please try later.");
						   Back();
					  }
				});
			}
		}
 }
 
 function getResponse(data)
{
	if(data.indexOf('>')==-1)
	{
		showAlert("Currently we are unable to process your request. Please try later.");
		return;
	}
	
	var respArray = new Array();
	respArray=data.split(">");
	var result=respArray[2].substring(0,respArray[2].length-8);
	//alert(result);
	if(result=="Failed")
	{
		 showAlert('Currently we are unable to process your request. Please try later.');
		 Back();
	}
	else if(result=="Success")
	{
		showAlert('Your email will be sent on the day and time entered. Make sure that your email configuration settings have been correctly configured.');
	}
}

 
 
function Back()
{
    document.forms[0].action="LeadInfo.html";
	document.forms[0].submit();
	
}
// validation
/***********************************/

	function validate()
	{
		
		var EmailTo=document.getElementById("EmailTo").value;
		if(EmailTo=="")
		{
		   showAlert("Please enter email To.");
		   return false;
		
		}
		return true;
	}
/*******************************************/
	 





;(function($) {
	
	$.fn.tabTab = function(options) {
		
		
		/*
		Variables
		---------- */
		
		var $this = $(this),
			ul = $this.find('nav ul'),
			a = ul.find('li a'),
			section = $this.find('section'),
			currentTab,
			currentSection,
			settings = $.extend({
				index: 0,
				saveState: true,
			},options);
			
		
		/*
		Initialization
		---------- */	
		
		// load state
		if(settings.saveState === true && localStorage.getItem('index.tabtab')) 
		   //setCurrent(localStorage.getItem('index.tabtab'));
		   setCurrent(localStorage.getItem('index'));
		// default index
		else 
		 setCurrent(settings.index);
		
		
		/*
		Private methods
		---------- */
		
		function setCurrent(index) {
			
			
			if(index >= a.length) 
			 index = a.length - 1;
			else if(index < 0) 
			 index = 0;
			
			
			$this.find('.current').removeClass('current');
			
			currentTab = a.eq(index).addClass('current');
			currentSection = section.eq(index).addClass('current');
			
			
			// save state
			if(settings.saveState === true)
			 localStorage.setItem('index.tabtab',index);
		}
		
		
		/*
		Events
		---------- */
		
		ul
		.delegate('li a','mouseover focus',function() {
			
			currentTab.removeClass('current');
		})
		.delegate('li a','mouseout blur',function() {
			
			currentTab.addClass('current');
		})
		.delegate('li a','click',function() {
			
			var $this = $(this);
			
			setCurrent($(this).index('li a'));
			
			// manually trigger blur for Firefox, Opera and maybe others
			$this.trigger('blur');
			
			return false;
		});
		
		
		
		return this;
	}
	
})(jQuery);

g_l = [];
g_l.MONTHS = ["Janaury", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
g_l.DAYS_3 = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
g_l.MONTH_FWD = "Move a month forward";
g_l.MONTH_BCK = "Move a month backward";
g_l.YEAR_FWD = "Move a year forward";
g_l.YEAR_BCK = "Move a year backward";
g_l.CLOSE = "Close the calendar";
g_l.ERROR_2 = g_l.ERROR_1 = "Date object invalid!";
g_l.ERROR_4 = g_l.ERROR_3 = "Target invalid";
g_jsDatePickImagePath = "images/";
g_jsDatePickDirectionality = "ltr";
g_arrayOfUsedJsDatePickCalsGlobalNumbers = [];
g_arrayOfUsedJsDatePickCals = [];
g_currentDateObject = {};
g_currentDateObject.dateObject = new Date();
g_currentDateObject.day = g_currentDateObject.dateObject.getDate();
g_currentDateObject.month = g_currentDateObject.dateObject.getMonth() + 1;
g_currentDateObject.year = g_currentDateObject.dateObject.getFullYear();
JsgetElem = function (a) {
    return document.getElementById(a)
};
String.prototype.trim = function () {
    return this.replace(/^\s+|\s+$/g, "")
};
String.prototype.ltrim = function () {
    return this.replace(/^\s+/, "")
};
String.prototype.rtrim = function () {
    return this.replace(/\s+$/, "")
};
String.prototype.strpad = function () {
    return (!isNaN(this) && this.toString().length == 1) ? "0" + this : this
};
JsDatePick = function (a) {
    if (document.all) {
        this.isie = true;
        this.iever = JsDatePick.getInternetExplorerVersion()
    } else {
        this.isie = false
    }
    this.oConfiguration = {};
    this.oCurrentDay = g_currentDateObject;
    this.monthsTextualRepresentation = g_l.MONTHS;
    this.lastPostedDay = null;
    this.initialZIndex = 2;
    this.globalNumber = this.getUnUsedGlobalNumber();
    g_arrayOfUsedJsDatePickCals[this.globalNumber] = this;
    this.setConfiguration(a);
    this.makeCalendar()
};
JsDatePick.getCalInstanceById = function (a) {
    return g_arrayOfUsedJsDatePickCals[parseInt(a, 10)]
};
JsDatePick.getInternetExplorerVersion = function () {
    var c = -1,
        a, b;
    if (navigator.appName == "Microsoft Internet Explorer") {
        a = navigator.userAgent;
        b = new RegExp("MSIE ([0-9]{1,}[.0-9]{0,})");
        if (b.exec(a) != null) {
            c = parseFloat(RegExp.$1)
        }
        return c
    }
};
JsDatePick.prototype.setC = function (a, b) {
    if (this.isie && this.iever > 7) {
        a.setAttribute("class", b)
    } else {
        a.className = b
    }
};
JsDatePick.prototype.getUnUsedGlobalNumber = function () {
    var a = Math.floor(Math.random() * 1000);
    while (!this.isUnique_GlobalNumber(a)) {
        a = Math.floor(Math.random() * 1000)
    }
    return a
};
JsDatePick.prototype.isUnique_GlobalNumber = function (b) {
    var a;
    for (a = 0; a < g_arrayOfUsedJsDatePickCalsGlobalNumbers.length; a++) {
        if (g_arrayOfUsedJsDatePickCalsGlobalNumbers[a] == b) {
            return false
        }
    }
    return true
};
JsDatePick.prototype.addOnSelectedDelegate = function (a) {
    if (typeof (a) == "function") {
        this.addonSelectedDelegate = a
    }
    return false
};
JsDatePick.prototype.setOnSelectedDelegate = function (a) {
    if (typeof (a) == "function") {
        this.onSelectedDelegate = a;
        return true
    }
    return false
};
JsDatePick.prototype.executeOnSelectedDelegateIfExists = function () {
    if (typeof (this.onSelectedDelegate) == "function") {
        this.onSelectedDelegate()
    }
    if (typeof (this.addonSelectedDelegate) == "function") {
        this.addonSelectedDelegate()
    }
};
JsDatePick.prototype.setRepopulationDelegate = function (a) {
    if (typeof (a) == "function") {
        this.repopulationDelegate = a;
        return true
    }
    return false
};
JsDatePick.prototype.setConfiguration = function (a) {
    this.oConfiguration.isStripped = (a.isStripped != null) ? a.isStripped : false;
    this.oConfiguration.useMode = (a.useMode != null) ? a.useMode : 1;
    this.oConfiguration.selectedDate = (a.selectedDate != null) ? a.selectedDate : null;
    this.oConfiguration.target = (a.target != null) ? a.target : null;
    this.oConfiguration.yearsRange = (a.yearsRange != null) ? a.yearsRange : [1971, 2100];
    this.oConfiguration.limitToToday = (a.limitToToday != null) ? a.limitToToday : false;
    this.oConfiguration.field = (a.field != null) ? a.field : false;
    this.oConfiguration.cellColorScheme = (a.cellColorScheme != null) ? a.cellColorScheme : "ocean_blue";
    this.oConfiguration.dateFormat = (a.dateFormat != null) ? a.dateFormat : "%m-%d-%Y";
    this.oConfiguration.imgPath = (g_jsDatePickImagePath.length != null) ? g_jsDatePickImagePath : "images/";
    this.oConfiguration.weekStartDay = (a.weekStartDay != null) ? a.weekStartDay : 1;
    this.selectedDayObject = {};
    this.flag_DayMarkedBeforeRepopulation = false;
    this.flag_aDayWasSelected = false;
    this.lastMarkedDayObject = null;
    if (!this.oConfiguration.selectedDate) {
        this.currentYear = this.oCurrentDay.year;
        this.currentMonth = this.oCurrentDay.month;
        this.currentDay = this.oCurrentDay.day
    }
};
JsDatePick.prototype.resizeCalendar = function () {
    this.leftWallStrechedElement.style.height = "0px";
    this.rightWallStrechedElement.style.height = "0px";
    var a = this.JsDatePickBox.offsetHeight,
        b = a - 16;
    if (b < 0) {
        return
    }
    this.leftWallStrechedElement.style.height = b + "px";
    this.rightWallStrechedElement.style.height = b + "px";
    return true
};
JsDatePick.prototype.closeCalendar = function () {
    this.JsDatePickBox.style.display = "none";
    document.onclick = function () {}
};
JsDatePick.prototype.populateFieldWithSelectedDate = function () {
    JsgetElem(this.oConfiguration.target).value = this.getSelectedDayFormatted();
    if (this.lastPickedDateObject) {
        delete(this.lastPickedDateObject)
    }
    this.lastPickedDateObject = {};
    this.lastPickedDateObject.day = this.selectedDayObject.day;
    this.lastPickedDateObject.month = this.selectedDayObject.month;
    this.lastPickedDateObject.year = this.selectedDayObject.year;
    this.closeCalendar()
};
JsDatePick.prototype.makeCalendar = function () {
    var j = document,
        e, a, b, k, g, h, f, o, i, m, n, l, c;
    e = j.createElement("div");
    a = j.createElement("div");
    b = j.createElement("div");
    this.setC(e, "JsDatePickBox");
    this.setC(a, "clearfix");
    this.setC(b, "jsDatePickCloseButton");
    b.setAttribute("globalNumber", this.globalNumber);
    b.onmouseover = function () {
        var d = JsDatePick.getCalInstanceById(this.getAttribute("globalNumber"));
        d.setTooltipText(g_l.CLOSE);
        d.setC(this, "jsDatePickCloseButtonOver")
    };
    b.onmouseout = function () {
        var d = JsDatePick.getCalInstanceById(this.getAttribute("globalNumber"));
        d.setTooltipText("");
        d.setC(this, "jsDatePickCloseButton")
    };
    b.onmousedown = function () {
        var d = JsDatePick.getCalInstanceById(this.getAttribute("globalNumber"));
        d.setTooltipText(g_l.CLOSE);
        d.setC(this, "jsDatePickCloseButtonDown")
    };
    b.onmouseup = function () {
        var d = JsDatePick.getCalInstanceById(this.getAttribute("globalNumber"));
        d.setTooltipText("");
        d.setC(this, "jsDatePickCloseButton");
        d.closeCalendar()
    };
    this.JsDatePickBox = e;
    k = j.createElement("div");
    g = j.createElement("div");
    h = j.createElement("div");
    f = j.createElement("div");
    this.setC(h, "topWall");
    this.setC(f, "bottomWall");
    if (this.isie && this.iever == 6) {
        f.style.bottom = "-2px"
    }
    o = j.createElement("div");
    i = j.createElement("div");
    m = j.createElement("div");
    this.setC(o, "leftTopCorner");
    this.setC(i, "leftBottomCorner");
    this.setC(m, "leftWall");
    this.leftWallStrechedElement = m;
    this.leftWall = k;
    this.rightWall = g;
    k.appendChild(o);
    k.appendChild(m);
    k.appendChild(i);
    o = j.createElement("div");
    i = j.createElement("div");
    m = j.createElement("div");
    this.setC(o, "rightTopCorner");
    this.setC(i, "rightBottomCorner");
    this.setC(m, "rightWall");
    this.rightWallStrechedElement = m;
    g.appendChild(o);
    g.appendChild(m);
    g.appendChild(i);
    if (this.oConfiguration.isStripped) {
        this.setC(k, "hiddenBoxLeftWall");
        this.setC(g, "hiddenBoxRightWall")
    } else {
        this.setC(k, "boxLeftWall");
        this.setC(g, "boxRightWall")
    }
    e.appendChild(k);
    e.appendChild(this.getDOMCalendarStripped());
    e.appendChild(g);
    e.appendChild(a);
    if (!this.oConfiguration.isStripped) {
        e.appendChild(b);
        e.appendChild(h);
        e.appendChild(f)
    }
    if (this.oConfiguration.useMode == 2) {
        if (this.oConfiguration.target != false) {
            if (typeof (JsgetElem(this.oConfiguration.target)) != null) {
                n = JsgetElem(this.oConfiguration.target);
                l = document.createElement("span");
                n.parentNode.replaceChild(l, n);
                l.appendChild(n);
                n.setAttribute("globalNumber", this.globalNumber);
                n.onclick = function () {
                    JsDatePick.getCalInstanceById(this.getAttribute("globalNumber")).showCalendar()
                };
                n.onfocus = function () {
                    JsDatePick.getCalInstanceById(this.getAttribute("globalNumber")).showCalendar()
                };
                l.style.position = "relative";
                this.initialZIndex++;
                e.style.zIndex = this.initialZIndex.toString();
                e.style.position = "absolute";
                e.style.top = "18px";
                e.style.left = "0px";
                e.style.display = "none";
                l.appendChild(e);
                c = new Function("g_arrayOfUsedJsDatePickCals[" + this.globalNumber + "].populateFieldWithSelectedDate();");
                this.setOnSelectedDelegate(c)
            } else {
                alert(g_l.ERROR_3)
            }
        }
    } else {
        if (this.oConfiguration.target != null) {
            JsgetElem(this.oConfiguration.target).appendChild(e);
            JsgetElem(this.oConfiguration.target).style.position = "relative";
            e.style.position = "absolute";
            e.style.top = "0px";
            e.style.left = "0px";
            this.resizeCalendar();
            this.executePopulationDelegateIfExists()
        } else {
            alert(g_l.ERROR_4)
        }
    }
};
JsDatePick.prototype.determineFieldDate = function () {
    var b, c, e, g, l, d, a, h, k, f = false,
        j = false;
    if (this.lastPickedDateObject) {
        this.setSelectedDay({
            year: parseInt(this.lastPickedDateObject.year),
            month: parseInt(this.lastPickedDateObject.month, 10),
            day: parseInt(this.lastPickedDateObject.day, 10)
        })
    } else {
        b = JsgetElem(this.oConfiguration.target);
        if (b.value.trim().length == 0) {
            this.unsetSelection();
            if (typeof (this.oConfiguration.selectedDate) == "object" && this.oConfiguration.selectedDate) {
                this.setSelectedDay({
                    year: parseInt(this.oConfiguration.selectedDate.year),
                    month: parseInt(this.oConfiguration.selectedDate.month, 10),
                    day: parseInt(this.oConfiguration.selectedDate.day, 10)
                })
            }
        } else {
            if (b.value.trim().length > 5) {
                c = this.senseDivider(this.oConfiguration.dateFormat);
                e = this.oConfiguration.dateFormat;
                g = b.value.trim().split(c);
                l = e.trim().split(c);
                d = a = h = k = 0;
                for (d = 0; d < l.length; d++) {
                    switch (l[d]) {
                        case "%d":
                        case "%j":
                            a = d;
                            break;
                        case "%m":
                        case "%n":
                            k = d;
                            break;
                        case "%M":
                            k = d;
                            f = true;
                            break;
                        case "%F":
                            k = d;
                            j = true;
                            break;
                        case "%Y":
                        case "%y":
                            h = d
                    }
                }
                if (f) {
                    for (d = 0; d < 12; d++) {
                        if (g_l.MONTHS[d].substr(0, 3).toUpperCase() == g[k].toUpperCase()) {
                            k = d + 1;
                            break
                        }
                    }
                } else {
                    if (j) {
                        for (d = 0; d < 12; d++) {
                            if (g_l.MONTHS[d].toLowerCase() == g[k].toLowerCase()) {
                                k = d + 1;
                                break
                            }
                        }
                    } else {
                        k = parseInt(g[k], 10)
                    }
                }
                this.setSelectedDay({
                    year: parseInt(g[h], 10),
                    month: k,
                    day: parseInt(g[a], 10)
                })
            } else {
                this.unsetSelection();
                return
            }
        }
    }
};
JsDatePick.prototype.senseDivider = function (a) {
    return a.replace("%d", "").replace("%j", "").replace("%m", "").replace("%M", "").replace("%n", "").replace("%F", "").replace("%Y", "").replace("%y", "").substr(0, 1)
};
JsDatePick.prototype.showCalendar = function () {
    if (this.JsDatePickBox.style.display == "none") {
        this.determineFieldDate();
        this.JsDatePickBox.style.display = "block";
        this.resizeCalendar();
        this.executePopulationDelegateIfExists();
        this.JsDatePickBox.onmouseover = function () {
            document.onclick = function () {}
        };
        this.JsDatePickBox.setAttribute("globalCalNumber", this.globalNumber);
        this.JsDatePickBox.onmouseout = function () {
            document.onclick = new Function("g_arrayOfUsedJsDatePickCals[" + this.getAttribute("globalCalNumber") + "].closeCalendar();")
        }
    } else {
        return
    }
};
JsDatePick.prototype.isAvailable = function (c, a, b) {
    if (c > this.oCurrentDay.year) {
        return false
    }
    if (a > this.oCurrentDay.month && c == this.oCurrentDay.year) {
        return false
    }
    if (b > this.oCurrentDay.day && a == this.oCurrentDay.month && c == this.oCurrentDay.year) {
        return false
    }
    return true
};
JsDatePick.prototype.getDOMCalendarStripped = function () {
    var h = document,
        e, i, b, a, f, c, g;
    e = h.createElement("div");
    if (this.oConfiguration.isStripped) {
        this.setC(e, "boxMainStripped")
    } else {
        this.setC(e, "boxMain")
    }
    this.boxMain = e;
    i = h.createElement("div");
    b = h.createElement("div");
    a = h.createElement("div");
    f = h.createElement("div");
    c = h.createElement("div");
    g = h.createElement("div");
    this.setC(b, "clearfix");
    this.setC(g, "clearfix");
    this.setC(i, "boxMainInner");
    this.setC(a, "boxMainCellsContainer");
    this.setC(f, "tooltip");
    this.setC(c, "weekDaysRow");
    this.tooltip = f;
    e.appendChild(i);
    this.controlsBar = this.getDOMControlBar();
    this.makeDOMWeekDays(c);
    i.appendChild(this.controlsBar);
    i.appendChild(b);
    i.appendChild(f);
    i.appendChild(c);
    i.appendChild(a);
    i.appendChild(g);
    this.boxMainCellsContainer = a;
    this.populateMainBox(a);
    return e
};
JsDatePick.prototype.makeDOMWeekDays = function (a) {
    var c = 0,
        g = document,
        f = g_l.DAYS_3,
        e, b;
    for (c = this.oConfiguration.weekStartDay; c < 7; c++) {
        b = g.createElement("div");
        e = g.createTextNode(f[c]);
        this.setC(b, "weekDay");
        b.appendChild(e);
        a.appendChild(b)
    }
    if (this.oConfiguration.weekStartDay > 0) {
        for (c = 0; c < this.oConfiguration.weekStartDay; c++) {
            b = g.createElement("div");
            e = g.createTextNode(f[c]);
            this.setC(b, "weekDay");
            b.appendChild(e);
            a.appendChild(b)
        }
    }
    b.style.marginRight = "0px"
};
JsDatePick.prototype.repopulateMainBox = function () {
    while (this.boxMainCellsContainer.firstChild) {
        this.boxMainCellsContainer.removeChild(this.boxMainCellsContainer.firstChild)
    }
    this.populateMainBox(this.boxMainCellsContainer);
    this.resizeCalendar();
    this.executePopulationDelegateIfExists()
};
JsDatePick.prototype.executePopulationDelegateIfExists = function () {
    if (typeof (this.repopulationDelegate) == "function") {
        this.repopulationDelegate()
    }
};
JsDatePick.prototype.populateMainBox = function (h) {
    var f = document,
        g, l, c = 1,
        k = false,
        n = this.currentMonth - 1,
        j, a, m, e, b;
    j = new Date(this.currentYear, n, 1, 1, 0, 0);
    a = j.getTime();
    this.flag_DayMarkedBeforeRepopulation = false;
    this.setControlBarText(this.monthsTextualRepresentation[n] + ", " + this.currentYear);
    m = parseInt(j.getDay()) - this.oConfiguration.weekStartDay;
    if (m < 0) {
        m = m + 7
    }
    e = 0;
    for (e = 0; e < m; e++) {
        g = f.createElement("div");
        this.setC(g, "skipDay");
        h.appendChild(g);
        if (c == 7) {
            c = 1
        } else {
            c++
        }
    }
    while (j.getMonth() == n) {
        k = false;
        g = f.createElement("div");
        if (this.lastPostedDay) {
            if (this.lastPostedDay == j.getDate()) {
                l = parseInt(this.lastPostedDay, 10) + 1
            } else {
                l = f.createTextNode(j.getDate())
            }
        } else {
            l = f.createTextNode(j.getDate())
        }
        g.appendChild(l);
        h.appendChild(g);
        g.setAttribute("globalNumber", this.globalNumber);
        if (c == 7) {
            if (g_jsDatePickDirectionality == "ltr") {
                g.style.marginRight = "0px"
            } else {
                g.style.marginLeft = "0px"
            }
        }
        if (this.isToday(j)) {
            g.setAttribute("isToday", 1)
        }
        if (this.oConfiguration.limitToToday) {
            if (!this.isAvailable(this.currentYear, this.currentMonth, parseInt(j.getDate()))) {
                k = true;
                g.setAttribute("isJsDatePickDisabled", 1)
            }
        }
        g.onmouseover = function () {
            var d = JsDatePick.getCalInstanceById(this.getAttribute("globalNumber")),
                i;
            i = d.getCurrentColorScheme();
            if (parseInt(this.getAttribute("isSelected")) == 1) {
                return
            }
            if (parseInt(this.getAttribute("isJsDatePickDisabled")) == 1) {
                return
            }
            if (parseInt(this.getAttribute("isToday")) == 1) {
                d.setC(this, "dayOverToday");
                this.style.background = "url(" + d.oConfiguration.imgPath + i + "_dayOver.gif) left top no-repeat"
            } else {
                d.setC(this, "dayOver");
                this.style.background = "url(" + d.oConfiguration.imgPath + i + "_dayOver.gif) left top no-repeat"
            }
        };
        g.onmouseout = function () {
            var d = JsDatePick.getCalInstanceById(this.getAttribute("globalNumber")),
                i;
            i = d.getCurrentColorScheme();
            if (parseInt(this.getAttribute("isSelected")) == 1) {
                return
            }
            if (parseInt(this.getAttribute("isJsDatePickDisabled")) == 1) {
                return
            }
            if (parseInt(this.getAttribute("isToday")) == 1) {
                d.setC(this, "dayNormalToday");
                this.style.background = "url(" + d.oConfiguration.imgPath + i + "_dayNormal.gif) left top no-repeat"
            } else {
                d.setC(this, "dayNormal");
                this.style.background = "url(" + d.oConfiguration.imgPath + i + "_dayNormal.gif) left top no-repeat"
            }
        };
        g.onmousedown = function () {
            var d = JsDatePick.getCalInstanceById(this.getAttribute("globalNumber")),
                i;
            i = d.getCurrentColorScheme();
            if (parseInt(this.getAttribute("isSelected")) == 1) {
                return
            }
            if (parseInt(this.getAttribute("isJsDatePickDisabled")) == 1) {
                return
            }
            if (parseInt(this.getAttribute("isToday")) == 1) {
                d.setC(this, "dayDownToday");
                this.style.background = "url(" + d.oConfiguration.imgPath + i + "_dayDown.gif) left top no-repeat"
            } else {
                d.setC(this, "dayDown");
                this.style.background = "url(" + d.oConfiguration.imgPath + i + "_dayDown.gif) left top no-repeat"
            }
        };
        g.onmouseup = function () {
            var d = JsDatePick.getCalInstanceById(this.getAttribute("globalNumber")),
                i;
            i = d.getCurrentColorScheme();
            if (parseInt(this.getAttribute("isJsDatePickDisabled")) == 1) {
                return
            }
            if (parseInt(this.getAttribute("isToday")) == 1) {
                d.setC(this, "dayNormalToday");
                this.style.background = "url(" + d.oConfiguration.imgPath + i + "_dayNormal.gif) left top no-repeat"
            } else {
                d.setC(this, "dayNormal");
                this.style.background = "url(" + d.oConfiguration.imgPath + i + "_dayNormal.gif) left top no-repeat"
            }
            d.setDaySelection(this);
            d.executeOnSelectedDelegateIfExists()
        };
        if (this.isSelectedDay(j.getDate())) {
            g.setAttribute("isSelected", 1);
            this.flag_DayMarkedBeforeRepopulation = true;
            this.lastMarkedDayObject = g;
            if (parseInt(g.getAttribute("isToday")) == 1) {
                this.setC(g, "dayDownToday");
                g.style.background = "url(" + this.oConfiguration.imgPath + this.oConfiguration.cellColorScheme + "_dayDown.gif) left top no-repeat"
            } else {
                this.setC(g, "dayDown");
                g.style.background = "url(" + this.oConfiguration.imgPath + this.oConfiguration.cellColorScheme + "_dayDown.gif) left top no-repeat"
            }
        } else {
            b = this.getCurrentColorScheme();
            if (parseInt(g.getAttribute("isToday")) == 1) {
                if (k) {
                    this.setC(g, "dayDisabled");
                    g.style.background = "url(" + this.oConfiguration.imgPath + this.oConfiguration.cellColorScheme + "_dayNormal.gif) left top no-repeat"
                } else {
                    this.setC(g, "dayNormalToday");
                    g.style.background = "url(" + this.oConfiguration.imgPath + this.oConfiguration.cellColorScheme + "_dayNormal.gif) left top no-repeat"
                }
            } else {
                if (k) {
                    this.setC(g, "dayDisabled");
                    g.style.background = "url(" + this.oConfiguration.imgPath + this.oConfiguration.cellColorScheme + "_dayNormal.gif) left top no-repeat"
                } else {
                    this.setC(g, "dayNormal");
                    g.style.background = "url(" + this.oConfiguration.imgPath + this.oConfiguration.cellColorScheme + "_dayNormal.gif) left top no-repeat"
                }
            }
        }
        if (c == 7) {
            c = 1
        } else {
            c++
        }
        a += 86400000;
        j.setTime(a)
    }
    this.lastPostedDay = null;
    return h
};
JsDatePick.prototype.unsetSelection = function () {
    this.flag_aDayWasSelected = false;
    this.selectedDayObject = {};
    this.repopulateMainBox()
};
JsDatePick.prototype.setSelectedDay = function (a) {
    this.flag_aDayWasSelected = true;
    this.selectedDayObject.day = parseInt(a.day, 10);
    this.selectedDayObject.month = parseInt(a.month, 10);
    this.selectedDayObject.year = parseInt(a.year);
    this.currentMonth = a.month;
    this.currentYear = a.year;
    this.repopulateMainBox()
};
JsDatePick.prototype.isSelectedDay = function (a) {
    if (this.flag_aDayWasSelected) {
        if (parseInt(a) == this.selectedDayObject.day && this.currentMonth == this.selectedDayObject.month && this.currentYear == this.selectedDayObject.year) {
            return true
        } else {
            return false
        }
    }
    return false
};
JsDatePick.prototype.getSelectedDay = function () {
    if (this.flag_aDayWasSelected) {
        return this.selectedDayObject
    } else {
        return false
    }
};
JsDatePick.prototype.getSelectedDayFormatted = function () {
    if (this.flag_aDayWasSelected) {
        var a = this.oConfiguration.dateFormat;
        a = a.replace("%d", this.selectedDayObject.day.toString().strpad());
        a = a.replace("%j", this.selectedDayObject.day);
        a = a.replace("%m", this.selectedDayObject.month.toString().strpad());
        a = a.replace("%M", g_l.MONTHS[this.selectedDayObject.month - 1].substr(0, 3).toUpperCase());
        a = a.replace("%n", this.selectedDayObject.month);
        a = a.replace("%F", g_l.MONTHS[this.selectedDayObject.month - 1]);
        a = a.replace("%Y", this.selectedDayObject.year);
        a = a.replace("%y", this.selectedDayObject.year.toString().substr(2, 2));
        return a
    } else {
        return false
    }
};
JsDatePick.prototype.setDaySelection = function (a) {
    var b = this.getCurrentColorScheme();
    if (this.flag_DayMarkedBeforeRepopulation) {
        this.lastMarkedDayObject.setAttribute("isSelected", 0);
        if (parseInt(this.lastMarkedDayObject.getAttribute("isToday")) == 1) {
            this.setC(this.lastMarkedDayObject, "dayNormalToday");
            this.lastMarkedDayObject.style.background = "url(" + this.oConfiguration.imgPath + b + "_dayNormal.gif) left top no-repeat"
        } else {
            this.setC(this.lastMarkedDayObject, "dayNormal");
            this.lastMarkedDayObject.style.background = "url(" + this.oConfiguration.imgPath + b + "_dayNormal.gif) left top no-repeat"
        }
    }
    this.flag_aDayWasSelected = true;
    this.selectedDayObject.year = this.currentYear;
    this.selectedDayObject.month = this.currentMonth;
    this.selectedDayObject.day = parseInt(a.innerHTML);
    this.flag_DayMarkedBeforeRepopulation = true;
    this.lastMarkedDayObject = a;
    a.setAttribute("isSelected", 1);
    if (parseInt(a.getAttribute("isToday")) == 1) {
        this.setC(a, "dayDownToday");
        a.style.background = "url(" + this.oConfiguration.imgPath + b + "_dayDown.gif) left top no-repeat"
    } else {
        this.setC(a, "dayDown");
        a.style.background = "url(" + this.oConfiguration.imgPath + b + "_dayDown.gif) left top no-repeat"
    }
};
JsDatePick.prototype.isToday = function (a) {
    var b = this.oCurrentDay.month - 1;
    if (a.getDate() == this.oCurrentDay.day && a.getMonth() == b && a.getFullYear() == this.oCurrentDay.year) {
        return true
    }
    return false
};
JsDatePick.prototype.setControlBarText = function (a) {
    var b = document.createTextNode(a);
    while (this.controlsBarTextCell.firstChild) {
        this.controlsBarTextCell.removeChild(this.controlsBarTextCell.firstChild)
    }
    this.controlsBarTextCell.appendChild(b)
};
JsDatePick.prototype.setTooltipText = function (a) {
    while (this.tooltip.firstChild) {
        this.tooltip.removeChild(this.tooltip.firstChild)
    }
    var b = document.createTextNode(a);
    this.tooltip.appendChild(b)
};
JsDatePick.prototype.moveForwardOneYear = function () {
    var a = this.currentYear + 1;
    if (a < parseInt(this.oConfiguration.yearsRange[1])) {
        this.currentYear++;
        this.repopulateMainBox();
        return true
    } else {
        return false
    }
};
JsDatePick.prototype.moveBackOneYear = function () {
    var a = this.currentYear - 1;
    if (a > parseInt(this.oConfiguration.yearsRange[0])) {
        this.currentYear--;
        this.repopulateMainBox();
        return true
    } else {
        return false
    }
};
JsDatePick.prototype.moveForwardOneMonth = function () {
    if (this.currentMonth < 12) {
        this.currentMonth++
    } else {
        if (this.moveForwardOneYear()) {
            this.currentMonth = 1
        } else {
            this.currentMonth = 12
        }
    }
    this.repopulateMainBox()
};
JsDatePick.prototype.moveBackOneMonth = function () {
    if (this.currentMonth > 1) {
        this.currentMonth--
    } else {
        if (this.moveBackOneYear()) {
            this.currentMonth = 12
        } else {
            this.currentMonth = 1
        }
    }
    this.repopulateMainBox()
};
JsDatePick.prototype.getCurrentColorScheme = function () {
    return this.oConfiguration.cellColorScheme
};
JsDatePick.prototype.getDOMControlBar = function () {
    var h = document,
        c, f, g, b, a, e;
    c = h.createElement("div");
    f = h.createElement("div");
    g = h.createElement("div");
    b = h.createElement("div");
    a = h.createElement("div");
    e = h.createElement("div");
    this.setC(c, "controlsBar");
    this.setC(f, "monthForwardButton");
    this.setC(g, "monthBackwardButton");
    this.setC(b, "yearForwardButton");
    this.setC(a, "yearBackwardButton");
    this.setC(e, "controlsBarText");
    c.setAttribute("globalNumber", this.globalNumber);
    f.setAttribute("globalNumber", this.globalNumber);
    g.setAttribute("globalNumber", this.globalNumber);
    a.setAttribute("globalNumber", this.globalNumber);
    b.setAttribute("globalNumber", this.globalNumber);
    this.controlsBarTextCell = e;
    c.appendChild(f);
    c.appendChild(g);
    c.appendChild(b);
    c.appendChild(a);
    c.appendChild(e);
    f.onmouseover = function () {
        var i, d;
        if (parseInt(this.getAttribute("isJsDatePickDisabled")) == 1) {
            return
        }
        d = this.parentNode;
        while (d.className != "controlsBar") {
            d = d.parentNode
        }
        i = JsDatePick.getCalInstanceById(this.getAttribute("globalNumber"));
        i.setTooltipText(g_l.MONTH_FWD);
        i.setC(this, "monthForwardButtonOver")
    };
    f.onmouseout = function () {
        var i, d;
        if (parseInt(this.getAttribute("isJsDatePickDisabled")) == 1) {
            return
        }
        i = this.parentNode;
        while (i.className != "controlsBar") {
            i = i.parentNode
        }
        d = JsDatePick.getCalInstanceById(this.getAttribute("globalNumber"));
        d.setTooltipText("");
        d.setC(this, "monthForwardButton")
    };
    f.onmousedown = function () {
        var i, d;
        if (parseInt(this.getAttribute("isJsDatePickDisabled")) == 1) {
            return
        }
        d = this.parentNode;
        while (d.className != "controlsBar") {
            d = d.parentNode
        }
        i = JsDatePick.getCalInstanceById(this.getAttribute("globalNumber"));
        i.setTooltipText(g_l.MONTH_FWD);
        i.setC(this, "monthForwardButtonDown")
    };
    f.onmouseup = function () {
        var i, d;
        if (parseInt(this.getAttribute("isJsDatePickDisabled")) == 1) {
            return
        }
        i = this.parentNode;
        while (i.className != "controlsBar") {
            i = i.parentNode
        }
        d = JsDatePick.getCalInstanceById(this.getAttribute("globalNumber"));
        d.setTooltipText(g_l.MONTH_FWD);
        d.setC(this, "monthForwardButton");
        d.moveForwardOneMonth()
    };
    g.onmouseover = function () {
        var i, d;
        if (parseInt(this.getAttribute("isJsDatePickDisabled")) == 1) {
            return
        }
        i = this.parentNode;
        while (i.className != "controlsBar") {
            i = i.parentNode
        }
        d = JsDatePick.getCalInstanceById(this.getAttribute("globalNumber"));
        d.setTooltipText(g_l.MONTH_BCK);
        d.setC(this, "monthBackwardButtonOver")
    };
    g.onmouseout = function () {
        var i, d;
        if (parseInt(this.getAttribute("isJsDatePickDisabled")) == 1) {
            return
        }
        i = this.parentNode;
        while (i.className != "controlsBar") {
            i = i.parentNode
        }
        d = JsDatePick.getCalInstanceById(this.getAttribute("globalNumber"));
        d.setTooltipText("");
        d.setC(this, "monthBackwardButton")
    };
    g.onmousedown = function () {
        var i, d;
        if (parseInt(this.getAttribute("isJsDatePickDisabled")) == 1) {
            return
        }
        i = this.parentNode;
        while (i.className != "controlsBar") {
            i = i.parentNode
        }
        d = JsDatePick.getCalInstanceById(this.getAttribute("globalNumber"));
        d.setTooltipText(g_l.MONTH_BCK);
        d.setC(this, "monthBackwardButtonDown")
    };
    g.onmouseup = function () {
        var i, d;
        if (parseInt(this.getAttribute("isJsDatePickDisabled")) == 1) {
            return
        }
        i = this.parentNode;
        while (i.className != "controlsBar") {
            i = i.parentNode
        }
        d = JsDatePick.getCalInstanceById(this.getAttribute("globalNumber"));
        d.setTooltipText(g_l.MONTH_BCK);
        d.setC(this, "monthBackwardButton");
        d.moveBackOneMonth()
    };
    b.onmouseover = function () {
        var i, d;
        if (parseInt(this.getAttribute("isJsDatePickDisabled")) == 1) {
            return
        }
        i = this.parentNode;
        while (i.className != "controlsBar") {
            i = i.parentNode
        }
        d = JsDatePick.getCalInstanceById(this.getAttribute("globalNumber"));
        d.setTooltipText(g_l.YEAR_FWD);
        d.setC(this, "yearForwardButtonOver")
    };
    b.onmouseout = function () {
        var i, d;
        if (parseInt(this.getAttribute("isJsDatePickDisabled")) == 1) {
            return
        }
        i = this.parentNode;
        while (i.className != "controlsBar") {
            i = i.parentNode
        }
        d = JsDatePick.getCalInstanceById(this.getAttribute("globalNumber"));
        d.setTooltipText("");
        d.setC(this, "yearForwardButton")
    };
    b.onmousedown = function () {
        var i, d;
        if (parseInt(this.getAttribute("isJsDatePickDisabled")) == 1) {
            return
        }
        i = this.parentNode;
        while (i.className != "controlsBar") {
            i = i.parentNode
        }
        d = JsDatePick.getCalInstanceById(this.getAttribute("globalNumber"));
        d.setTooltipText(g_l.YEAR_FWD);
        d.setC(this, "yearForwardButtonDown")
    };
    b.onmouseup = function () {
        var i, d;
        if (parseInt(this.getAttribute("isJsDatePickDisabled")) == 1) {
            return
        }
        i = this.parentNode;
        while (i.className != "controlsBar") {
            i = i.parentNode
        }
        d = JsDatePick.getCalInstanceById(this.getAttribute("globalNumber"));
        d.setTooltipText(g_l.YEAR_FWD);
        d.setC(this, "yearForwardButton");
        d.moveForwardOneYear()
    };
    a.onmouseover = function () {
        var i, d;
        if (parseInt(this.getAttribute("isJsDatePickDisabled")) == 1) {
            return
        }
        i = this.parentNode;
        while (i.className != "controlsBar") {
            i = i.parentNode
        }
        d = JsDatePick.getCalInstanceById(this.getAttribute("globalNumber"));
        d.setTooltipText(g_l.YEAR_BCK);
        d.setC(this, "yearBackwardButtonOver")
    };
    a.onmouseout = function () {
        var i, d;
        if (parseInt(this.getAttribute("isJsDatePickDisabled")) == 1) {
            return
        }
        i = this.parentNode;
        while (i.className != "controlsBar") {
            i = i.parentNode
        }
        d = JsDatePick.getCalInstanceById(this.getAttribute("globalNumber"));
        d.setTooltipText("");
        d.setC(this, "yearBackwardButton")
    };
    a.onmousedown = function () {
        var i, d;
        if (parseInt(this.getAttribute("isJsDatePickDisabled")) == 1) {
            return
        }
        i = this.parentNode;
        while (i.className != "controlsBar") {
            i = i.parentNode
        }
        d = JsDatePick.getCalInstanceById(this.getAttribute("globalNumber"));
        d.setTooltipText(g_l.YEAR_BCK);
        d.setC(this, "yearBackwardButtonDown")
    };
    a.onmouseup = function () {
        var i, d;
        if (parseInt(this.getAttribute("isJsDatePickDisabled")) == 1) {
            return
        }
        i = this.parentNode;
        while (i.className != "controlsBar") {
            i = i.parentNode
        }
        d = JsDatePick.getCalInstanceById(this.getAttribute("globalNumber"));
        d.setTooltipText(g_l.YEAR_BCK);
        d.setC(this, "yearBackwardButton");
        d.moveBackOneYear()
    };
    return c
};

(function(w){var k=function(b,c){typeof c=="undefined"&&(c={});this.init(b,c)},a=k.prototype,o,p=["canvas","vml"],f=["oval","spiral","square","rect","roundRect"],x=/^\#([a-fA-F0-9]{6}|[a-fA-F0-9]{3})$/,v=navigator.appVersion.indexOf("MSIE")!==-1&&parseFloat(navigator.appVersion.split("MSIE")[1])===8?true:false,y=!!document.createElement("canvas").getContext,q=true,n=function(b,c,a){var b=document.createElement(b),d;for(d in a)b[d]=a[d];typeof c!=="undefined"&&c.appendChild(b);return b},m=function(b,
c){for(var a in c)b.style[a]=c[a];return b},t=function(b,c){for(var a in c)b.setAttribute(a,c[a]);return b},u=function(b,c,a,d){b.save();b.translate(c,a);b.rotate(d);b.translate(-c,-a);b.beginPath()};a.init=function(b,c){if(typeof c.safeVML==="boolean")q=c.safeVML;try{this.mum=document.getElementById(b)!==void 0?document.getElementById(b):document.body}catch(a){this.mum=document.body}c.id=typeof c.id!=="undefined"?c.id:"canvasLoader";this.cont=n("div",this.mum,{id:c.id});if(y)o=p[0],this.can=n("canvas",
this.cont),this.con=this.can.getContext("2d"),this.cCan=m(n("canvas",this.cont),{display:"none"}),this.cCon=this.cCan.getContext("2d");else{o=p[1];if(typeof k.vmlSheet==="undefined"){document.getElementsByTagName("head")[0].appendChild(n("style"));k.vmlSheet=document.styleSheets[document.styleSheets.length-1];var d=["group","oval","roundrect","fill"],e;for(e in d)k.vmlSheet.addRule(d[e],"behavior:url(#default#VML); position:absolute;")}this.vml=n("group",this.cont)}this.setColor(this.color);this.draw();
m(this.cont,{display:"none"})};a.cont={};a.can={};a.con={};a.cCan={};a.cCon={};a.timer={};a.activeId=0;a.diameter=40;a.setDiameter=function(b){this.diameter=Math.round(Math.abs(b));this.redraw()};a.getDiameter=function(){return this.diameter};a.cRGB={};a.color="#000000";a.setColor=function(b){this.color=x.test(b)?b:"#000000";this.cRGB=this.getRGB(this.color);this.redraw()};a.getColor=function(){return this.color};a.shape=f[0];a.setShape=function(b){for(var c in f)if(b===f[c]){this.shape=b;this.redraw();
break}};a.getShape=function(){return this.shape};a.density=40;a.setDensity=function(b){this.density=q&&o===p[1]?Math.round(Math.abs(b))<=40?Math.round(Math.abs(b)):40:Math.round(Math.abs(b));if(this.density>360)this.density=360;this.activeId=0;this.redraw()};a.getDensity=function(){return this.density};a.range=1.3;a.setRange=function(b){this.range=Math.abs(b);this.redraw()};a.getRange=function(){return this.range};a.speed=2;a.setSpeed=function(b){this.speed=Math.round(Math.abs(b))};a.getSpeed=function(){return this.speed};
a.fps=24;a.setFPS=function(b){this.fps=Math.round(Math.abs(b));this.reset()};a.getFPS=function(){return this.fps};a.getRGB=function(b){b=b.charAt(0)==="#"?b.substring(1,7):b;return{r:parseInt(b.substring(0,2),16),g:parseInt(b.substring(2,4),16),b:parseInt(b.substring(4,6),16)}};a.draw=function(){var b=0,c,a,d,e,h,k,j,r=this.density,s=Math.round(r*this.range),l,i,q=0;i=this.cCon;var g=this.diameter;if(o===p[0]){i.clearRect(0,0,1E3,1E3);t(this.can,{width:g,height:g});for(t(this.cCan,{width:g,height:g});b<
r;){l=b<=s?1-1/s*b:l=0;k=270-360/r*b;j=k/180*Math.PI;i.fillStyle="rgba("+this.cRGB.r+","+this.cRGB.g+","+this.cRGB.b+","+l.toString()+")";switch(this.shape){case f[0]:case f[1]:c=g*0.07;e=g*0.47+Math.cos(j)*(g*0.47-c)-g*0.47;h=g*0.47+Math.sin(j)*(g*0.47-c)-g*0.47;i.beginPath();this.shape===f[1]?i.arc(g*0.5+e,g*0.5+h,c*l,0,Math.PI*2,false):i.arc(g*0.5+e,g*0.5+h,c,0,Math.PI*2,false);break;case f[2]:c=g*0.12;e=Math.cos(j)*(g*0.47-c)+g*0.5;h=Math.sin(j)*(g*0.47-c)+g*0.5;u(i,e,h,j);i.fillRect(e,h-c*0.5,
c,c);break;case f[3]:case f[4]:a=g*0.3,d=a*0.27,e=Math.cos(j)*(d+(g-d)*0.13)+g*0.5,h=Math.sin(j)*(d+(g-d)*0.13)+g*0.5,u(i,e,h,j),this.shape===f[3]?i.fillRect(e,h-d*0.5,a,d):(c=d*0.55,i.moveTo(e+c,h-d*0.5),i.lineTo(e+a-c,h-d*0.5),i.quadraticCurveTo(e+a,h-d*0.5,e+a,h-d*0.5+c),i.lineTo(e+a,h-d*0.5+d-c),i.quadraticCurveTo(e+a,h-d*0.5+d,e+a-c,h-d*0.5+d),i.lineTo(e+c,h-d*0.5+d),i.quadraticCurveTo(e,h-d*0.5+d,e,h-d*0.5+d-c),i.lineTo(e,h-d*0.5+c),i.quadraticCurveTo(e,h-d*0.5,e+c,h-d*0.5))}i.closePath();i.fill();
i.restore();++b}}else{m(this.cont,{width:g,height:g});m(this.vml,{width:g,height:g});switch(this.shape){case f[0]:case f[1]:j="oval";c=140;break;case f[2]:j="roundrect";c=120;break;case f[3]:case f[4]:j="roundrect",c=300}a=d=c;e=500-d;for(h=-d*0.5;b<r;){l=b<=s?1-1/s*b:l=0;k=270-360/r*b;switch(this.shape){case f[1]:a=d=c*l;e=500-c*0.5-c*l*0.5;h=(c-c*l)*0.5;break;case f[0]:case f[2]:v&&(h=0,this.shape===f[2]&&(e=500-d*0.5));break;case f[3]:case f[4]:a=c*0.95,d=a*0.28,v?(e=0,h=500-d*0.5):(e=500-a,h=
-d*0.5),q=this.shape===f[4]?0.6:0}i=t(m(n("group",this.vml),{width:1E3,height:1E3,rotation:k}),{coordsize:"1000,1000",coordorigin:"-500,-500"});i=m(n(j,i,{stroked:false,arcSize:q}),{width:a,height:d,top:h,left:e});n("fill",i,{color:this.color,opacity:l});++b}}this.tick(true)};a.clean=function(){if(o===p[0])this.con.clearRect(0,0,1E3,1E3);else{var b=this.vml;if(b.hasChildNodes())for(;b.childNodes.length>=1;)b.removeChild(b.firstChild)}};a.redraw=function(){this.clean();this.draw()};a.reset=function(){typeof this.timer===
"number"&&(this.hide(),this.show())};a.tick=function(b){var a=this.con,f=this.diameter;b||(this.activeId+=360/this.density*this.speed);o===p[0]?(a.clearRect(0,0,f,f),u(a,f*0.5,f*0.5,this.activeId/180*Math.PI),a.drawImage(this.cCan,0,0,f,f),a.restore()):(this.activeId>=360&&(this.activeId-=360),m(this.vml,{rotation:this.activeId}))};a.show=function(){if(typeof this.timer!=="number"){var a=this;this.timer=self.setInterval(function(){a.tick()},Math.round(1E3/this.fps));m(this.cont,{display:"block"})}};
a.hide=function(){typeof this.timer==="number"&&(clearInterval(this.timer),delete this.timer,m(this.cont,{display:"none"}))};a.kill=function(){var a=this.cont;typeof this.timer==="number"&&this.hide();o===p[0]?(a.removeChild(this.can),a.removeChild(this.cCan)):a.removeChild(this.vml);for(var c in this)delete this[c]};w.CanvasLoader=k})(window);
