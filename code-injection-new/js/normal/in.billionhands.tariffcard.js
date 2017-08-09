
 



	width=window.innerWidth;
	height=window.innerHeight;
	if(width>height)
	{
	max_value=width;
	min_value=height;
	}
	else
	{
	max_value=height;
	min_value=width;
	}
	$(document).ready(function() {
		if(window.innerWidth<=400)
		{
			$("#copyright").html('&#169;2012-2013 Billionhands Technology <br> PVT. LTD.');
		}
		else
		if(window.innerWidth>400)
		{
			$("#copyright").html('&#169;2012-2013 Billionhands Technology PVT. LTD.');
		}
	});
	//alert(window.innerWidth);
	var height=screen.height-40;
	if (height<508)
	height=508;
	var css="<"+"style"+">"+"."+"fixheight"+"{"+"height"+":"+height+"px"+";"+"}"+"<"+"/"+"style"+">";
	document.write(css);
    function addOption(selectbox,text,value )
	{
		var optn = document.createElement("OPTION");
		optn.text = text;
		optn.value = value;
		selectbox.options.add(optn);
	}
    function getHTTPObject() 
    {
    	if (typeof XMLHttpRequest != 'undefined') 
    	{ 
    		return new XMLHttpRequest(); 
    	} 
    	try 
    	{ 
    		return new ActiveXObject("Msxml2.XMLHTTP"); 
    	} 
    	catch (e) 
    	{ 
    		try 
    		{ 
    			return new ActiveXObject("Microsoft.XMLHTTP"); 
    		} 
    		catch (e) {} 
    	} 
    	return false; 
    }
    var farearray = new Array();
    var KMarray= new Array();
    var CityList = new Array();
	var lastEntryNumber = 0;
	var PageNumber =  -10;	
    function defineKM()
    {
    	var temp = 1.00;
    	KMarray[0]= temp;
    	for (var i=1;i<=200;i++)
   		{
   			temp = temp + 0.10;
   			KMarray[i]= temp;
   		}
    }
    function onChangeCity()
    {
    	PageNumber 		= -10;
    	lastEntryNumber = 0;
    	
    	var http1 = getHTTPObject();
    	var Jsonstring = ""; 
    	var url  = "http://at1.billionhands.in:9997/tariffcard/tariffapp?action=getFare&cityid="+document.getElementById("cmbCityName").value;
    	http1.open("GET",url,false); 
    	http1.onreadystatechange = function()
    	{ 
	    	if (http1.readyState != 4)
    		return;
	    	Jsonstring = "("+ http1.responseText +")"; 
	    }
    	http1.send(null);
    	farearray = eval(Jsonstring);
			
		if(PageNumber < farearray.length-10)
		{
			
			PageNumber = lastEntryNumber;	    		
			var x1=document.getElementById('tariff-table1').rows;
	    	
	    	var j=1;
	    	for(var i=1;j<=10;i++)
	    	{
    			var y=x1[j].cells;
    			
    			if(farearray[PageNumber+(i-1)] != 0.0)
				{
					y[0].innerHTML	=	KMarray[PageNumber+(i-1)].toFixed(2);
					y[1].innerHTML	=	farearray[PageNumber+(i-1)].toFixed(2);
					lastEntryNumber = 	PageNumber+(i-1);
					j++;
				}
	    	}
	    }
    }
   function FirstReading() 
   {		
		defineKM();
		var Jsonstring="";
		try
		{
			Notification.prototype.activityStart();
			var http1 = getHTTPObject(); 
	    	var url  = "http://at1.billionhands.in:9997/tariffcard/tariffapp?action=getCityList";
	    	http1.open("GET",url,false); 
		   	http1.onreadystatechange = function()
	    	{ 
		   		if (http1.readyState != 4)
	    		return;
	    		Jsonstring = "("+ http1.responseText +")"; 
		   	}
		   	http1.send(null);
		}
		catch(e)
		{
			alert(e);
			Notification.prototype.activityStop();
		}		
		CityList = eval(Jsonstring);
    	for(var i=0;i<CityList.length;i++)
    	{
    		addOption(document.getElementById("cmbCityName"),CityList[i],i+1);
    	}
    	
		url  = "http://at1.billionhands.in:9997/tariffcard/tariffapp?action=getFare&cityid="+document.getElementById("cmbCityName").value;
		
    	http1.open("GET",url,false); 
    	http1.onreadystatechange = function()
    	{ 
	    	if (http1.readyState != 4)
    		return;
	    	Jsonstring = "("+ http1.responseText +")"; 
	    }
    	http1.send(null);
    	
		farearray = eval(Jsonstring);
		
		if(PageNumber < farearray.length-10)
		{
			PageNumber = lastEntryNumber;
	    	var x1=document.getElementById('tariff-table1').rows;
	    	
	    	var j=1;
	    	for(var i=1;j<=10;i++)
	    	{
    			var y=x1[j].cells;
    			
    			if(farearray[(parseInt(PageNumber.value)+(i-1))] != 0.0)
    			{
    				y[0].innerHTML	=	KMarray[PageNumber+(i-1)].toFixed(2);
    				y[1].innerHTML	=	farearray[PageNumber+(i-1)].toFixed(2);
    				lastEntryNumber =	PageNumber+(i-1);
    				j++;
    			}
	    	}
	    	Notification.prototype.activityStop();
	   }
	}	
    function nextReading() 
    {		
			if(PageNumber <farearray.length-10)
			{
				PageNumber = lastEntryNumber+1;
	    		var x1=document.getElementById('tariff-table1').rows;
	    		var j = 1;
	    		for(var i=1;i<=10;i++)
	    		{
	    				var y=x1[i].cells;
	    				y[0].innerHTML= "";
	    				y[1].innerHTML= "";
	    		}
	    		for(var i=1;j<=10;i++)
	    		{
    				var y=x1[j].cells;
    				
    				if(farearray[PageNumber+(i-1)] != 0.0)
    				{
    					y[0].innerHTML	=	KMarray[(parseInt(PageNumber)+(i-1))].toFixed(2);
    					y[1].innerHTML	=	farearray[(parseInt(PageNumber)+(i-1))].toFixed(2);
    					lastEntryNumber = 	PageNumber+(i-1);
    					j++;
    				}
	    		}
		    }
		}
	
		function prevReading()
		{	
			if(parseInt(PageNumber)!=0)
			{
				PageNumber = lastEntryNumber-19;
				
				var x1=document.getElementById('tariff-table1').rows;
	    		var j=1;
	    		for(var i=1;j<=10;i++)
	    		{
    				var y=x1[j].cells;
 
    				if(farearray[PageNumber+(i-1)] != 0.0)
    				{
    					y[0].innerHTML	= KMarray[PageNumber+(i-1)].toFixed(2);
    					y[1].innerHTML	= farearray[PageNumber+(i-1)].toFixed(2);
    					lastEntryNumber = PageNumber+(i-1);
						j++;
    				}
	    		}
    		}
	    }
		function init()
	    {
		    document.addEventListener("deviceReady", deviceIsReady, true);
	 		document.addEventListener("backKeyDown", backKeyDown, true); 
    	}
		function deviceIsReady()
		{
			window.BackButton.override();
		}
		function backKeyDown() 
		{
	    	navigator.notification.confirm('Do you want to exit',onConfirm,'Exit','Yes,No');
		}
	 	function onConfirm(button)
	 	{
	 		if(button==1)
		{
	 			device.exitApp();
	 		}
		}
		function ClearCache()
		{
			farearray		= null;
			KMarray			= null;
   			CityList 		= null;	
   			lastEntryNumber = null;
			PageNumber 		= null;	
		}
 	

				$(window).bind('orientationchange', function(e){
					if ($.event.special.orientationchange.orientation() == "portrait") {			
						//console.log('portrait'+min_value);
						if(min_value<=400)
						$("#copyright").html('&#169;2012-2013 Billionhands Technology <br> PVT. LTD.');
						else
						$("#copyright").html('&#169;2012-2013 Billionhands Technology PVT. LTD.');
					} else 
					if ($.event.special.orientationchange.orientation() == "landscape") 
					{
						//console.log('landscape'+max_value);
						if(max_value>400)
						$("#copyright").html('&#169;2012-2013 Billionhands Technology PVT. LTD.');
						else
						$("#copyright").html('&#169;2012-2013 Billionhands Technology <br> PVT. LTD.');
					}
				});
		

				FirstReading();	
		
