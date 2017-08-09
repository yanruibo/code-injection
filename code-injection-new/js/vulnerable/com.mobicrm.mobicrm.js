









  var onSuccess = function(position) {window.localStorage.setItem("lat",position.coords.latitude);window.localStorage.setItem("long",position.coords.longitude);	};function onError(error) {alert(error.message);}navigator.geolocation.getCurrentPosition(onSuccess, onError);var html="";var items ="";var leadpage=1,contactpage=1,accountpage=1,oppspage=1;var OnlineMode=window.localStorage.getItem("OnlineMode");var firstTime=window.localStorage.getItem("firstTime");var online = window.navigator.onLine;document.addEventListener("deviceready", onDeviceReady, true);var DeviceReady=false; $(document).ready(function(){var value = window.localStorage.getItem("user");if(value==null){location.href="index.html";}//Temporariy Code Check localStorage.setItem("OnlineMode", "true");	 CreateTableContact(db);CreateTableLead(db);CreateTableAccounts(db);CreateTablePhonebook(db); $("#welc").html("<strong>Welcome back "+value+"</strong>");  OnlineStatus("indicator",OnlineMode); OnlineStatus("indicator_lead",OnlineMode); OnlineStatus("indicator_contact",OnlineMode);  OnlineStatus("indicator_account",OnlineMode);  OnlineStatus("indicator_opp",OnlineMode);  if(firstTime==null || firstTime.length==0){localStorage.setItem("firstTime", "false");$.mobile.changePage("#sync");}}); 






            			$('#pie_div').bind('expand', function () 			{   	barChart2('dashboard','dashChart');}).bind('collapse', function () {    	});        			$('#bar_div').bind('expand', function () 		{  	barChart('dashboard','dashChart');}).bind('collapse', function () {    //$("#dashChart").html("");	//alert('Collapsed');});	$('#acc_div').bind('expand', function () 		{  	barChart3('dashboard','dashChart');}).bind('collapse', function () {    //$("#dashChart").html("");	//alert('Collapsed');});			//session		//getSession();		












	
	if (!window.openDatabase) 
	{
	       location.href="index.html#dberror";
		
	        
	}
		
	
   //Login page configuration	
   var OnlineMode=window.localStorage.getItem("OnlineMode");
   var online = window.navigator.onLine;
   var db = openDatabase('mycrmdb', '1.0', 'CRM DB', 2 * 1024 * 1024);
   var user="";
   var pass="";
   var firstTime="";
	
	//Ready Function
	$(document).ready(function()
    {
	user = window.localStorage.getItem("user");
    pass= window.localStorage.getItem("pass");
    firstTime=window.localStorage.getItem("firstTime");
   
	 if(user.length!=0 && pass.length!=0)
	    {
          
		  $("#Lusername").val(user);
		  $("#Lpassword").val(pass);
		  
		  if(online && OnlineMode=="true")
		  {
		  getLogin();
		  $.mobile.changePage("#resultpage");
		 }
		 else
		 {
		 
		 $("#con_status").html("Not Available");
		 $("#proceed_btn").html("<a data-role='button' href='home.html' rel='external' >Continue in Offline Mode</a>");
		 $("#proceed_btn").trigger("create");
		  
		 
		 
		 $.mobile.changePage("#offlinemsg");
		 
		 }
		}
	});
  
 
   
   function getLogin()
   {
   
 localStorage.removeItem("user");
 localStorage.removeItem("pass");
 localStorage.removeItem("dashboard");
 localStorage.removeItem("OnlineMode");
   
  $("#login_res").html("Step 1");
  $("#acc_res").html("Step 2");
                       
  $("#user_move").html("<img src='load.gif' /> Please wait...");
   
   user=$("#Lusername").val();
   pass=$("#Lpassword").val();
   
   
  
   $("#login_res").html("Connecting server...");
   $("#offline_move").html("<a href='home.html' rel='external' data-role='button'>Proceed with last saved data</a>");
   $("#offline_move").trigger("create");
  
  $.ajax({
          url: DomainName+"/mobicrm/services/login.php",
          dataType: 'jsonp',
          jsonp: 'jsoncallback',          
		  type: "POST",
		  timeout:TimeOutValue,
		  data:"user="+user+"&password="+pass,
          success: function(json,status)
		                {
                         
						if(json.id!=0)
						  {
                           $("#login_res").html("Success 1");						 
						  try
						  {
						  localStorage.setItem("user", user);
						  localStorage.setItem("pass", pass);
                          localStorage.setItem("OnlineMode", "true");
						  $("#acc_res").html("Ready");
						  $("#user_move").html("<a data-role='button' rel='external' href='home.html'>Proceed Now</a>");
						  $("#user_move").trigger('create');
						  $("#offline_move").html("");
                          }
						  catch(e)
						  {
						  alert("Local Strorage Disabled on your browser. Please ensure that local storage is available and private browsing is disabled.");
						  location.href="index.html";
						  }
						  $("#login_res").html("Success");
						  
			             }
						 else
						 {
						 $("#login_res").html("Fail");
						 $("#acc_res").html("Aborted");
						 $("#user_move").html("<a data-role='button' href='index.html'>Try Again</a>");
						 $("#user_move").trigger('create');
                         }
                        },
						
	 error: function( objAJAXRequest, strError )
		{
        if(objAJAXRequest.status==0 && strError !="timeout")
		{
		alert("Network Error.");
        }
		else
		{
		$("#login_res").html("Fail");
		$("#acc_res").html("Aborted");
		$("#user_move").html("<a data-role='button' href='index.html' rel='external'>Try Again</a>");
		$("#user_move").trigger('create');
       }	   

	   }
 
       });
              
	   
        
        
    }
 
 
	











		 var user = window.localStorage.getItem("user");
		 getAgentList();
		 getLinkedinUser();
		 
		 
		
            $(function() {

                $(".knob").knob({
                    /*change : function (value) {
                        //console.log("change : " + value);
                    },
                    release : function (value) {
                        console.log("release : " + value);
                    },
                    cancel : function () {
                        console.log("cancel : " + this.value);
                    },*/
                    draw : function () {

                        // "tron" case
                        if(this.$.data('skin') == 'tron') {

                            var a = this.angle(this.cv)  // Angle
                                , sa = this.startAngle          // Previous start angle
                                , sat = this.startAngle         // Start angle
                                , ea                            // Previous end angle
                                , eat = sat + a                 // End angle
                                , r = 1;

                            this.g.lineWidth = this.lineWidth;

                            this.o.cursor
                                && (sat = eat - 0.3)
                                && (eat = eat + 0.3);

                            if (this.o.displayPrevious) {
                                ea = this.startAngle + this.angle(this.v);
                                this.o.cursor
                                    && (sa = ea - 0.3)
                                    && (ea = ea + 0.3);
                                this.g.beginPath();
                                this.g.strokeStyle = this.pColor;
                                this.g.arc(this.xy, this.xy, this.radius - this.lineWidth, sa, ea, false);
                                this.g.stroke();
                            }

                            this.g.beginPath();
                            this.g.strokeStyle = r ? this.o.fgColor : this.fgColor ;
                            this.g.arc(this.xy, this.xy, this.radius - this.lineWidth, sat, eat, false);
                            this.g.stroke();

                            this.g.lineWidth = 2;
                            this.g.beginPath();
                            this.g.strokeStyle = this.o.fgColor;
                            this.g.arc( this.xy, this.xy, this.radius - this.lineWidth + 1 + this.lineWidth * 2 / 3, 0, 2 * Math.PI, false);
                            this.g.stroke();

                            return false;
                        }
                    }
                });

                // Example of infinite knob, iPod click wheel
                var v, up=0,down=0,i=0
                    ,$idir = $("div.idir")
                    ,$ival = $("div.ival")
                    ,incr = function() { i++; $idir.show().html("+").fadeOut(); $ival.html(i); }
                    ,decr = function() { i--; $idir.show().html("-").fadeOut(); $ival.html(i); };
                $("input.infinite").knob(
                                    {
                                    min : 0
                                    , max : 20
                                    , stopper : false
                                    , change : function () {
                                                    if(v > this.cv){
                                                        if(up){
                                                            decr();
                                                            up=0;
                                                        }else{up=1;down=0;}
                                                    } else {
                                                        if(v < this.cv){
                                                            if(down){
                                                                incr();
                                                                down=0;
                                                            }else{down=1;up=0;}
                                                        }
                                                    }
                                                    v = this.cv;
                                                }
                                    });
            });
        










	var user = window.localStorage.getItem("user");
	getTwitterUser();
	
    










	var user = window.localStorage.getItem("user");
	getFacebookUser();
	
    











﻿
var RocknCoder = RocknCoder || {};

RocknCoder.hideAddressBar = function() {
	if (navigator.userAgent.match(/Android/i)) {
		window.scrollTo(0, 0); // reset in case prev not scrolled
		var nPageH = $(document).height();
		var nViewH = window.outerHeight;
		if (nViewH > nPageH) {
			nViewH = nViewH / window.devicePixelRatio;
			$('BODY').css('height', nViewH + 'px');
		}
		window.scrollTo(0, 1);

		addEventListener("resize", function () {
			setTimeout(hideUrlBar, 0);
			setTimeout(hideUrlBar, 500);
		}, false);

		function hideUrlBar() {
			if (!pageYOffset) {
				window.scrollTo(0, 1);
			}
		}
	}
	return this;
};

﻿
var RocknCoder = RocknCoder || {};
RocknCoder.Pages = RocknCoder.Pages || {};

RocknCoder.Pages.Kernel = function (event) {
	var that = this,
		eventType = event.type,
		pageName = $(this).attr("data-rockncoder-jspage");
	if (RocknCoder && RocknCoder.Pages && pageName && RocknCoder.Pages[pageName] && RocknCoder.Pages[pageName][eventType]) {
		RocknCoder.Pages[pageName][eventType].call(that);
	}
};

RocknCoder.Pages.Events = function () {
	$("div[data-rockncoder-jspage]").on(
		'pagebeforecreate pagecreate pagebeforeload pagebeforeshow pageshow pagebeforechange pagechange pagebeforehide pagehide pageinit',
		RocknCoder.Pages.Kernel).on(
		"pageinit", RocknCoder.hideAddressBar);
} ();

RocknCoder.Pages.manageBarChart = function () {
	var pageshow = function () {
			updateChart();
			$("#refreshBarChart").click(function(){
				updateChart();
			});
		},
		pagehide = function () {
			$("#refreshBarChart").unbind('click');
		},
		updateChart= function(){
			var barA = parseInt($("#pageBarSliderA").val(),10),
				barB = parseInt($("#pageBarSliderB").val(),10),
				barC = parseInt($("#pageBarSliderC").val(),10);
			showChart(barA, barB, barC);
		},
		showChart = function(barA, barB, barC){
			$.jqplot('barChart', [[[barA,1], [barB,3], [barC,5]]], {
				seriesDefaults:{
					renderer:$.jqplot.BarRenderer,
					shadowAngle: 135,
					rendererOptions: {
						barDirection: 'horizontal'
					},
					pointLabels: {show: true, formatString: '%d'}
				},
				axes: {
					yaxis: {
						renderer: $.jqplot.CategoryAxisRenderer
					}
				}
			}).replot({clear: true, resetAxes:true});
		};
	return {
		pageshow: pageshow,
		pagehide: pagehide
	}
}();

RocknCoder.Pages.managePieChart = function () {
	var pageshow = function () {
			updateChart();
			$("#refreshPieChart").click(function(){
				updateChart();
			});
		},
		pagehide = function () {
			$("#refreshPieChart").unbind('click');
		},
		updateChart= function(){
			var sliceA = parseInt($("#pagePieSliderA").val(),10),
				sliceB = parseInt($("#pagePieSliderB").val(),10),
				sliceC = parseInt($("#pagePieSliderC").val(),10);
			showChart(sliceA, sliceB, sliceC);
		},
		showChart = function(sliceA, sliceB, sliceC){
			var plot2 = $.jqplot('pieChart', [[['a',sliceA],['b',sliceB],['c',sliceC]]], {
					grid: {
						drawBorder: false,
						shadow: false
					},
					seriesDefaults:{
						renderer:$.jqplot.PieRenderer,
						trendline:{ show: true }
					},
				legend:{ show: false }
			});
		};
	return {
		pageshow: pageshow,
		pagehide: pagehide
	}
}();

RocknCoder.Pages.managePlotChart = function () {
	var pageshow = function () {
			updateChart();
			$("#refreshPlotChart").click(function(){
				updateChart();
				$.mobile.silentScroll();
			});
		},
		pagehide = function () {
			$("#refreshPlotChart").unbind('click');
		},
		updateChart= function(){
			var sliders = $($.mobile.activePage).find("input"),
				vals = [];
			_.each(sliders,function(element, index){
				vals.push([index+1, parseInt(element.value, 10)]);
			});
			showChart(vals);
		},
		showChart = function(vals){
			$.jqplot('plotChart',[vals]).replot({clear: true, resetAxes:true});
		};
	return {
		pageshow: pageshow,
		pagehide: pagehide
	}
}();






function checkBlankValue(data)
{
  if(data)
  {
   data=$.trim(data);
   if(data.length <=0)
   return false;
   
   return true;
  }
 else
 return false;
}

function IsEmail(email) {
  var regex = /^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
  return regex.test(email);
}

function allnumeric(uzip)
{ 
var numbers = /^[0-9]+$/;
if(uzip.match(numbers))
{
return true;
}
else
{
return false;
}
}


/**
 * converted stringify() to jQuery plugin.
 * serializes a simple object to a JSON formatted string.
 * Note: stringify() is different from jQuery.serialize() which URLEncodes form elements

 * UPDATES:
 *      Added a fix to skip over Object.prototype members added by the prototype.js library
 * USAGE:
 *  jQuery.ajax({
 *	    data : {serialized_object : jQuery.stringify (JSON_Object)},
 *		success : function (data) {
 *
 *		}
 *   });
 *
 * CREDITS: http://blogs.sitepointstatic.com/examples/tech/json-serialization/json-serialization.js
 */
jQuery.extend({
    stringify  : function stringify(obj) {
        var t = typeof (obj);
        if (t != "object" || obj === null) {
            // simple data type
            if (t == "string") obj = '"' + obj + '"';
            return String(obj);
        } else {
            // recurse array or object
            var n, v, json = [], arr = (obj && obj.constructor == Array);

            for (n in obj) {
                v = obj[n];
                t = typeof(v);
                if (obj.hasOwnProperty(n)) {
                    if (t == "string") v = '"' + v + '"'; else if (t == "object" && v !== null) v = jQuery.stringify(v);
                    json.push((arr ? "" : '"' + n + '":') + String(v));
                }
            }
            return (arr ? "[" : "{") + String(json) + (arr ? "]" : "}");
        }
    }
});

/******************************* Linkedin Area ********************************/
agentArray=Array();
agent="false";
var userFullName,userTitle;
function getAgentList()
   {
    $("#agentlist").html("Loading...");
	var li="";
	$.ajax({
          url: "http://socialnama.com/crmnew3/social/linkedin/agents.php",
          dataType: 'jsonp',
          jsonp: 'jsoncallback',          
		  type: "POST",
		  data:"user="+user,
          success: function(json,status)
		                {
                       
						var i=0;
						$.each(json.agents, function(i,item)
		                   {
						    temp=Array();
							li+="<option value='"+i+"'>"+item.keywords+"</option>";
							temp["keywords"]=item.keywords;
							temp["title"]=item.title;
							temp["agentid"]=item.id;
							
							agentArray[i]=temp;
							
							
							i++;
						   });
                        
							ul="<select name=\"select-choice-1\" id=\"select-choice-custom\" data-native-menu=\"false\" onchange=\"userFromAgents(this.value);\"> <option value='-1'>Select Agents</option>"+li+"</select>";
						$("#agentlist").html(ul);
						$("#agentlist").trigger("create");
						
						},
						
	 error: function( objAJAXRequest, strError )
		{
        if(objAJAXRequest.status==0 && strError !="timeout")
		{
		alert("Nelnork Error.");
        }
		else
		alert("Error in establishing connection [ " +strError+" "+objAJAXRequest.status+" ]");
	    }
 
       });
              
	}
	
function newPage()
  {
  var num=$("#num").val();
  var sens=$("#sens").val();
  var loc_sens=$("#loc_sens").val();

    var qpm="agentid="+AgentId+"&num="+num+"&loc_sens="+loc_sens+"&sens="+sens;
	
	if(AgentId>0)
	{
	$.mobile.changePage("#searchresults"); 
    lnUserSearchAgent(qpm,loc_sens,num);
	}
	else
	alert("Select an Agent");
  
  }

	
	var AgentId;
	function userFromAgents(val)
	{
	AgentId=0;
	temp=Array();
	temp=agentArray[val];
	AgentId=temp["agentid"];
	}

	function getLinkedinUser()
   {
    $.ajax({
          url: "http://socialnama.com/crmnew3/social/linkedin/userprofile.php",
          dataType: 'jsonp',
          jsonp: 'jsoncallback',          
		  type: "POST",
		  data:"user="+user,
          success: function(json,status)
		                {
                        var name=json.first_name+" "+json.last_name;
						
						$("#ln_name").html(name);
						$("#ln_desc").html(json.headline);
						
						$("#ln_loc").html(json.location);
						
						$("#ln_img").html("<img src='"+json.pictureUrl+"' width='75'>");
                        },
						
	 error: function( objAJAXRequest, strError )
		{
        if(objAJAXRequest.status==0 && strError !="timeout")
		{
		alert("Nelnork Error.");
        }
		else
		alert("Error in establishing connection [ " +strError+" "+objAJAXRequest.status+" ]");
	    }
 
       });
              
	}
    
	LnUserArray=Array();

	function searchAgent(keyword,title)
	{
	var keyword=$("#"+keyword).val();
	var title=$("#"+title).val();
	
	if(keyword.length==0)
	{
	alert("Search query is empty");
	return;
	}
	var url="http://socialnama.com/crmnew3/social/linkedin/add_agent.php";
	var postdata="user="+user+"&title="+title+"&keywords="+keyword;
	//alert(postdata);
	AddData(url,postdata,"agent_add","Agent has been added","Please wait..<img src='load.gif'/>")
	//agent="true";
	//lnUserSearch(keyword,title);
	
	}
	
	function userSearch(keyword)
	{
	var keyword=$("#"+keyword).val();
	agent="false";
	lnUserSearch(keyword,"");
	
	}
	
	
	
	
	function lnUserSearchAgent(qpm,num,loc)
   {
   
	$("#searchrecords").html("Loading...");
	
	$.ajax({
          url: "http://socialnama.com/crmnew3/social/linkedin/searchuserbyagent.php",
          dataType: 'jsonp',
          jsonp: 'jsoncallback',          
		  type: "POST",
		  data:"user="+user+"&"+qpm,
          success: function(json,status)
		                {
                           var li="";
						   i=0;
						  
						   $.each(json.users, function(i,item)
		                   {
						    temp=Array();
							name=item.first_name[0]+" "+item.last_name[0];
							
							image=item.pictureUrl[0];
							description=item.headline[0];
							loc=item.location;
							locName=loc.name;
							
							temp["name"]=name;
							temp["description"]=description;
							temp["image"]=image;
							temp["location"]=locName;
							
							temp["industry"]=item.industry[0];
							temp["profileSummary"]=item.profileSummary[0];
							temp["specialties"]=item.specialties[0];
							temp["interests"]=item.interests[0];
							temp["conn"]=item.conn[0];
							temp["rec"]=item.rec[0];
							temp["honors"]=item.honors[0];
							
							
							li+="<li><a href='#userdetail' onclick=\"userDetailLn("+i+");\"><img src="+image+" /><h3>"+name+"</h3><p style=\"white-space:normal\">"+description+"</p><p><strong>"+locName+"</strong></p></a></li>";
							
							LnUserArray[i]=temp;
							i++;
						   });
                        ul="<ul data-role='listview' data-inset='true'>"+li+"</ul>";
						$("#searchrecords").html(ul);
						$("#searchrecords").trigger("create");
						},
						
	 error: function( objAJAXRequest, strError )
		{
        if(objAJAXRequest.status==0 && strError !="timeout")
		{
		alert("Network Error.");
        }
		else
		alert("Error in establishing connection [ " +strError+" "+objAJAXRequest.status+" ]");
	    }
 
       });
              
	}
	
	
	
function lnUserSearch(keyword,title)
   {
    if(keyword.length==0)
	{
	$("#searchrecords").html("<h4>Error</h4> <br> Please enter a search query");
	return;
	}
	$("#searchrecords").html("Loading...");
	$.ajax({
          url: "http://socialnama.com/crmnew3/social/linkedin/searchuser.php",
          dataType: 'jsonp',
          jsonp: 'jsoncallback',          
		  type: "POST",
		  data:"user="+user+"&keywords="+encodeURIComponent(keyword)+"&title="+encodeURIComponent(title)+"&agent="+agent,
          success: function(json,status)
		                {
                           var li="";
						   i=0;
						   if(json.users)
						   {
						   $.each(json.users, function(i,item)
		                   {
						    temp=Array();
							name=item.first_name[0]+" "+item.last_name[0];
							
							image=item.pictureUrl[0];
							description=item.headline[0];
							loc=item.location;
							locName=loc.name;
							
							temp["name"]=name;
							temp["description"]=description;
							temp["image"]=image;
							temp["location"]=locName;
							
							temp["industry"]=item.industry[0];
							temp["profileSummary"]=item.profileSummary[0];
							temp["specialties"]=item.specialties[0];
							temp["interests"]=item.interests[0];
							temp["conn"]=item.conn[0];
							temp["rec"]=item.rec[0];
							temp["honors"]=item.honors[0];
							
							
							li+="<li><a href='#userdetail' onclick=\"userDetailLn("+i+");\"><img src="+image+" /><h3>"+name+"</h3><p style=\"white-space:normal\">"+description+"</p><p><strong>"+locName+"</strong></p></a></li>";
							
							LnUserArray[i]=temp;
							i++;
						   });
						   }
						   else
						   li="<li><h4>No Records Found !</h4> <p style='white-space:normal;'>Try again or change your search query</p></li>";
                        ul="<ul data-role='listview' data-inset='true'>"+li+"</ul>";
						$("#searchrecords").html(ul);
						$("#searchrecords").trigger("create");
						},
						
	 error: function( objAJAXRequest, strError )
		{
        if(objAJAXRequest.status==0 && strError !="timeout")
		{
		alert("Network Error.");
        }
		else
		alert("Error in establishing connection [ " +strError+" "+objAJAXRequest.status+" ]");
	    }
 
       });
              
	}
	
	
	
	function userDetailLn(i)
	{
	
	$("#l_img").html("");
	$("#l_name").html("");
    $("#l_desc").html("");
	$("#l_loc").html("");
	$("#l_industry").html("");
	$("#l_summary").html("");
	$("#l_speciality").html("");
	$("#u_zone").html("");
	$("#l_conn").html("");
	$("#l_rec").html("");
	$("#l_awards").html("");
	$("#l_interest").html("");
	var temp=LnUserArray[i];
	
	userFullName=temp["name"];
	$("#l_img").html("<img src='"+temp["image"]+"' width='75'/>");
	$("#l_name").html(temp["name"]);
    $("#l_desc").html(temp["description"]);
	$("#l_loc").html(temp["location"]);
	$("#l_industry").html(temp["industry"]);
	$("#l_summary").html(temp["profileSummary"]);
	$("#l_speciality").html(temp["specialties"]);
	$("#u_zone").html(temp["interests"]);
	$("#l_conn").html(temp["conn"]);
	$("#l_rec").html(temp["rec"]);
	$("#l_awards").html(temp["honors"]);
	$("#l_interests").html(temp["interests"]);
	
	}
	
	function DeleteAgents(id)
	{
	var url="http://socialnama.com/crmnew3/social/linkedin/delete_agent.php";
	var postdata="user="+user+"&id="+id;
	var success="Deleted ! <a href=\"#searchresults\" onclick=\"getAgents();\">My Agents</a>";
	
	AddData(url,postdata,"agent_delete",success,"Please wait..<img src='load.gif'/>")
	
	}
	
	function getAgents()
   {
    $("#searchrecords").html("Loading...");
	var li="";
	$.ajax({
          url: "http://socialnama.com/crmnew3/social/linkedin/agents.php",
          dataType: 'jsonp',
          jsonp: 'jsoncallback',          
		  type: "POST",
		  data:"user="+user,
          success: function(json,status)
		                {
                        $.each(json.agents, function(i,item)
		                   {
						    
							li+="<li><a href='#searchrecords' onclick=\"lnUserSearch('"+item.keywords+"','"+item.title+"');\"><h3>"+item.keywords+"</h3><p>"+item.title+"</p><a href='#agentdelete' onclick=\"DeleteAgents("+item.id+");\"></a></li>";
							
						   });
                            ul="<ul data-role='listview'  data-split-icon='delete'><li data-role='list-divider'>My Agents</li>"+li+"</ul>";
						$("#searchrecords").html(ul);
						$("#searchrecords").trigger("create");
						agents="";
						},
						
	 error: function( objAJAXRequest, strError )
		{
        if(objAJAXRequest.status==0 && strError !="timeout")
		{
		alert("Nelnork Error.");
        }
		else
		alert("Error in establishing connection [ " +strError+" "+objAJAXRequest.status+" ]");
	    }
 
       });
              
	}
	
	function setCRM(option,div)
{
$("#"+div).html("Connecting..");
connectCRM(option,div,userFullName,"","","","");
}

/****************** Twitter *****************************/

function getTwitterUser()
   {
    $.ajax({
          url: "http://socialnama.com/crmnew3/social/twitteroauth/userprofile.php",
          dataType: 'jsonp',
          jsonp: 'jsoncallback',          
		  type: "POST",
		  data:"user="+user,
          success: function(json,status)
		                {
                        $("#tw_name").html(json.name);
						$("#tw_desc").html(json.description);
						$("#tw_fol").html(json.followers);
						$("#tw_frnd").html(json.following);
						$("#tw_tweets").html(json.tweets);
						$("#tw_loc").html(json.location);
						$("#tw_list").html(json.listed_count);
						$("#tw_scrn").html(json.screen_name);
						$("#tw_zone").html(json.time_zone);
						$("#tw_img").html("<img src='"+json.profile_image_url+"' width='75'>");
                        },
						
	 error: function( objAJAXRequest, strError )
		{
        if(objAJAXRequest.status==0 && strError !="timeout")
		{
		alert("Network Error.");
        }
		else
		alert("Error in establishing connection [ " +strError+" "+objAJAXRequest.status+" ]");
	    }
 
       });
              
	}
	
	/************** Twitter User Search ***************************/
	twitterUserArray=Array();
	
	function tweetSearch()
   {
    var q=$("#q_tweet").val();
	if(q.length==0)
	{
	$("#searchrecords").html("<h4>Error</h4><br><br> Please enter a search query");
	return;
	}
	$("#searchrecords").html("Loading...");
	
	$.ajax({
          url: "http://socialnama.com/crmnew3/social/twitteroauth/tweetsearch.php",
          dataType: 'jsonp',
          jsonp: 'jsoncallback',          
		  type: "POST",
		  data:"user="+user+"&q="+encodeURIComponent(q),
          success: function(json,status)
		                {
                           var li="";
						   i=0;
						   if(!jQuery.isEmptyObject(json.results))
						  
						  
						  {
						   
						   $.each(json.results, function(i,item)
		                   {
						     temp=Array();
							name=item.from_user_name;
							image=item.profile_image_url;
							description=item.text;
							
							
							
							temp["name"]=name;
							temp["description"]=description;
							temp["image"]=image;
							
							temp["following"]="";
							temp["followers"]="";
							temp["location"]="";
							temp["list"]="";
							
							temp["tweets"]="";
							temp["timezone"]="";
							temp["listed"]="";
							
							
							
							li+="<li><a href='#userdetail' onclick=\"userDetail("+i+");\"><img src="+image+" /><h3>"+name+"</h3><p style=\"white-space:normal\">"+description+"</p></a></li>";
							
							twitterUserArray[i]=temp;
							i++;
						   });
						  }
						 else
						   li="<li><h4>No Records Found !</h4> <p style='white-space:normal;'>Try again or change your search query</p></li>";
                        

                        ul="<ul data-role='listview' data-inset='true'>"+li+"</ul>";
						$("#searchrecords").html(ul);
						$("#searchrecords").trigger("create");
						},
						
	 error: function( objAJAXRequest, strError )
		{
        if(objAJAXRequest.status==0 && strError !="timeout")
		{
		alert("Network Error.");
        }
		else
		alert("Error in establishing connection [ " +strError+" "+objAJAXRequest.status+" ]");
	    }
 
       });
              
	}
	
	
	
	
	function twitterUserSearch()
   {
    var q=$("#q_user").val();
	
	if(q.length==0)
	{
	$("#searchrecords").html("<h4>Error</h4><br><br> Please enter a search query");
	return;
	}
	$("#searchrecords").html("Loading...");
	
	$.ajax({
          url: "http://socialnama.com/crmnew3/social/twitteroauth/friendsearch.php",
          dataType: 'jsonp',
          jsonp: 'jsoncallback',          
		  type: "POST",
		  data:"user="+user+"&q="+encodeURIComponent(q),
          success: function(json,status)
		                {
                           var li="";
						   i=0;
						   var twObj=json.tweets;
						   if(twObj)
						   {
						   $.each(json.tweets, function(i,item)
		                   {
						     temp=Array();
							name=item.name;
							image=item.profile_image_url;
							description=item.description;
							following=item.following;
							followers=item.followers;
							list=item.listed_count;
							loc=item.location;
							
							temp["screen_name"]=item.screen_name;
							temp["following"]=following;
							temp["followers"]=followers;
							temp["location"]=loc;
							temp["list"]=list;
							temp["name"]=name;
							temp["description"]=item.description;
							temp["image"]=image;
							temp["tweets"]=item.tweets;
							temp["timezone"]=item.time_zone;
							temp["listed"]=item.listed_count;
							
							
							li+="<li><a href='#userdetail' onclick=\"userDetail("+i+");\"><img src="+image+" /><h3>"+name+"</h3><p style=\"white-space:normal\">"+description+"</p></a></li>";
							
							twitterUserArray[i]=temp;
							i++;
						   });
						    }
						  else
						 li="<li><h4>No Records Found !</h4> <p style='white-space:normal;'>Try again or change your search query</p></li>";
						  
                        ul="<ul data-role='listview' data-inset='true'>"+li+"</ul>";
						$("#searchrecords").html(ul);
						$("#searchrecords").trigger("create");
						},
						
	 error: function( objAJAXRequest, strError )
		{
        if(objAJAXRequest.status==0 && strError !="timeout")
		{
		alert("Network Error.");
        }
		else
		alert("Error in establishing connection [ " +strError+" "+objAJAXRequest.status+" ]");
	    }
 
       });
              
	}
	
	function userDetail(i)
	{
	var temp=twitterUserArray[i];
	
	$("#u_name").html("");
    $("#u_desc").html("");
	$("#u_fol").html("");
	$("#u_frnd").html("");
	$("#u_list").html("");
	$("#u_zone").html("");
	$("#u_tweets").html("");
	$("#u_loc").html("");
	$("#u_zone").html("");
	
	
	$("#u_img").html("<img src='"+temp["image"]+"' width='75'/>");
	
	userFullName=temp["name"];
	
	$("#u_name").html(temp["name"]);
    $("#u_desc").html(temp["description"]);
	$("#u_fol").html(temp["followers"]);
	$("#u_frnd").html(temp["following"]);
	$("#u_list").html(temp["listed"]);
	$("#u_zone").html(temp["timezone"]);
	$("#u_tweets").html(temp["tweets"]);
	$("#u_loc").html(temp["location"]);
	$("#u_zone").html(temp["listed"]);
	var twurl="http://twitter.com/"+temp["screen_name"];
	$("#tw_url").html("<a data-role=\"button\"  onclick=showPage(true,'"+twurl+"');>@"+temp["screen_name"]+ "</a>");
	
	}
/* ************************************* FB ******************************** */
fbUserArray=Array();

function getFacebookUser()
{
 $.ajax({
          url: "http://socialnama.com/crmnew3/social/fb/userprofile.php",
          dataType: 'jsonp',
          jsonp: 'jsoncallback',          
		  type: "POST",
		  data:"user="+user,
          success: function(json,status)
		                {
                        $("#fb_name").html(json.name);
						
						$("#fb_img").html("<img src='"+json.image+"' width='75'>");
                        },
						
	 error: function( objAJAXRequest, strError )
		{
        if(objAJAXRequest.status==0 && strError !="timeout")
		{
		alert("Network Error.");
        }
		else
		alert("Error in establishing connection [ " +strError+" "+objAJAXRequest.status+" ]");
	    }
 
       });
}	
/* ****************** FB User Search **************** */
function FacebookUserSearch()
   {
    var q=$("#q_user").val();
	
	if(q.length==0)
	{
	$("#searchrecords").html("<h4>Error</h4><br><br> Please enter a search query");
	return;
	}
	$("#searchrecords").html("Loading...");
	
	$.ajax({
          url: "http://socialnama.com/crmnew3/social/fb/search.php",
          dataType: 'jsonp',
          jsonp: 'jsoncallback',          
		  type: "POST",
		  data:"user="+user+"&q="+encodeURIComponent(q),
          success: function(json,status)
		                {
                           var li="";
						   i=0;
						   if(json.users)
						   {
						   $.each(json.users, function(i,item)
		                   {
						     temp=Array();
							name=item.name;
							image=item.image;
							
							
							
							temp["name"]=name;
							
							temp["image"]=image;
							temp["id"]=item.id;
							
							
							li+="<li><a href='#userdetail' onclick=\"userDetailFb("+i+");\"><img src="+image+" /><h3>"+name+"</h3></a></li>";
							
							fbUserArray[i]=temp;
							i++;
						   });
						   }
						   else
						   li="<li><h4>No Records Found !</h4> <p style='white-space:normal;'>Try again or change your search query</p></li>";
						  
						   
                        ul="<ul data-role='listview' data-inset='true'>"+li+"</ul>";
						$("#searchrecords").html(ul);
						$("#searchrecords").trigger("create");
						},
						
	 error: function( objAJAXRequest, strError )
		{
        if(objAJAXRequest.status==0 && strError !="timeout")
		{
		alert("Network Error.");
        }
		else
		alert("Error in establishing connection [ " +strError+" "+objAJAXRequest.status+" ]");
	    }
 
       });
              
	}
	/* ***************************************** Detail ********************* */
	function userDetailFb(i)
	{
	var temp=fbUserArray[i];
	
	$("#fp_name").html("");
    $("#fp_img").html("");
	$("#fp_url").html("");
	
	$("#fp_img").html("<img src='"+temp["image"]+"' width='75'/>");
	
	
	
	$("#fp_name").html(temp["name"]);
	userFullName=temp["name"];
   
	var fburl="http://facebook.com/profile.php?id="+temp["id"];
	$("#fp_url").html("<a data-role=\"button\"  onclick=showPage(true,'"+fburl+"');>Facebook Profile</a>");
	$("#fp_url").trigger("create");
	
	}
	
	
	function AddData(url,postdata,div,success,loader)
{
   
   $("#"+div).html(loader);
   $.ajax({
          url: url,
          dataType: 'jsonp',
          jsonp: 'jsoncallback',          
		  type: "POST",
		  timeout:TimeOutValue,
		  data:postdata,
          success: function(json,status)
		                {
                         if(json.id !=0)
						 {
						 $("#"+div).html("<a href=\"#searchresults\" data-role='button' onclick=\"getAgents();\">View Agents</a>");
						 $("#"+div).trigger("create");
						 }
						 else
						 $("#"+div).html("Could not save..");
						 
						
						},
		error: function( objAJAXRequest, strError )
		{
        if(objAJAXRequest.status==0)
		{
		
		$("#"+div).html("Operation Cancelled"); 
		location.href="home.html";
        }
		else
		$( "#"+div ).text("Error in establishing connection [ " +strError+" "+objAJAXRequest.status+" ]");
	    }
          
       });
}



$(document).bind('mobileinit', function () {
    $.mobile.allowCrossDomainPages = true;
    $.mobile.zoom.enabled = false;
    $.mobile.buttonMarkup.hoverDelay = 0; //defaults 200
    $.mobile.defaultDialogTransition = 'none';
    $.mobile.defaultPageTransition = 'none';
	
});

var DomainName="http://monimbus.ap01.aws.af.cm";
//var DomainName="http://socialnama.com/mcrm2";
//var DomainName="http://localhost/mcrm4";
var TimeOutValue="30000";
var db = openDatabase('mycrmdb', '1.0', 'CRM DB', 2 * 1024 * 1024);

var user = window.localStorage.getItem("user");
var pass= window.localStorage.getItem("pass");

/* ******************* Section DB *********************** */

function CreateTable(db,query)
	{
     db.transaction(function (tx) {  
     tx.executeSql(query);
    });

	}
	
     function CreateTablePhonebook(db)
	{
     db.transaction(function (tx) {  
     tx.executeSql("CREATE TABLE IF NOT EXISTS "+user+"_phonebook (id INTEGER PRIMARY KEY AUTOINCREMENT,name TEXT,mobile TEXT, UNIQUE (mobile))");
    });

	}
	
	
	function CreateTableContact(db)
	{
     db.transaction(function (tx) {  
     tx.executeSql("CREATE TABLE IF NOT EXISTS "+user+"_contacts (id INTEGER PRIMARY KEY AUTOINCREMENT,uid TEXT, first_name TEXT,last_name TEXT,name TEXT, email TEXT, phone TEXT, title TEXT,street TEXT, city TEXT, state TEXT, country TEXT, pin TEXT, sync INTEGER, UNIQUE (uid))");
    });

	}
	
	 function CreateTableAccounts(db)
  {
     db.transaction(function (tx) {  
     tx.executeSql("CREATE TABLE IF NOT EXISTS "+user+"_accounts (id INTEGER PRIMARY KEY AUTOINCREMENT,uid TEXT, name TEXT, account_type TEXT, industry TEXT, employees TEXT, city TEXT, country TEXT, street TEXT, state TEXT, pin TEXT, revenue TEXT, sync INTEGER, UNIQUE (uid))");
    });

  }


function CreateTableLead(db)
	{
     db.transaction(function (tx) {  
     tx.executeSql("CREATE TABLE IF NOT EXISTS "+user+"_leads (id INTEGER PRIMARY KEY AUTOINCREMENT,uid TEXT, fname TEXT,lname TEXT, email TEXT, title TEXT, mobile TEXT, status TEXT, description TEXT, lead_source TEXT,do_not_call TEXT,street TEXT, city TEXT, state TEXT, pin TEXT, country TEXT,amount TEXT,account TEXT,lat TEXT, lng TEXT,distance INTEGER,sync INTEGER, UNIQUE (uid))");
    },txFail,txWin);

	}

function CreateTableOpp(db)
	{
     db.transaction(function (tx) {  
     tx.executeSql("CREATE TABLE IF NOT EXISTS "+user+"_opps (id INTEGER PRIMARY KEY AUTOINCREMENT,uid TEXT, name TEXT, stage TEXT, amount TEXT, account TEXT, sync INTEGER, UNIQUE (uid))");
    });

	}
	
	function insertRecord(db,query,recordcount,total,div,sync_div) 
	{
      db.transaction(function(tx) 
	  {
      tx.executeSql(query);
        
      },txFail,function(){ 
	    //For Sync Section
		var per=0;
		if(total==0)
		{
		per=100;
		recordcount=0;
		}
		else
		{
		per=(recordcount*100)/total;
		per=Math.round(per);
		}
		//For Separate Pages
		$("#"+div).html("<p><strong>Records Found "+total+"<strong></p><p><strong>"+recordcount+" Records synced</strong></p>");
		
		
		if(per==100 && recordcount==total)
		syncCount++; 
		
		$("#"+sync_div).html(per+"% "); 
		
		if(syncCount==3)
		{
		$("#sync_done").html("<a href='#main_page' data-role='button'>Proceed</a>");
		$("#sync_done").trigger("create");
		}});
     }

 function insertRecordAccounts(db,query,recordcount,total,div) 
	{
      db.transaction(function(tx) 
	  {
      tx.executeSql(query);
      },txFail,function(){ var p=(recordcount*100)/total; p=Math.round(p);if(recordcount<=total){$("#acc_res").html(" "+recordcount+" Accounts Synced");$("#"+div).html(p+"% Complete .Please wait...");} if(recordcount==total){$("#"+div).html("<a data-role='button' href='home.html' rel='external'>Proceed Now</a>");$("#user_move").trigger('create'); $("#offline_move").html("");}});
     }
 function ExecuteQuery(db,query) 
	{
 
     db.transaction(function(tx) 
 	  {
      tx.executeSql(query);

      },txFail,txWin);

    
	return true;
	}



function txFail(tx)
{
 console.log("TX Failed");
}	



function txWin(tx)
{
 console.log("TX succeeded.");
}	
/* *************** DB Section Ends ******************** */

/* ********** Utility Section ************************* */
	function OnlineStatus(div,mode)
	 {
      var online = window.navigator.onLine;
	  
      if(online && mode=="true")
	  $("#"+div).html("<img src='img/user-online.png' />");
	  else
	 $("#"+div).html("<img src='img/user-offline.png' />");
     }

 
 
function ClearLocalData()
{
 localStorage.removeItem("user");
 localStorage.removeItem("pass");
 localStorage.removeItem("dashboard");
 localStorage.removeItem("OnlineMode");
 pageMove("index.html");
}

function NetworkWidget()
   {
    return; //Temporary blok for testing
	var OnlineMode=window.localStorage.getItem("OnlineMode");
	var online="";
	var offline="";
	if(OnlineMode=="true")
	online="checked='checked'";
	else
	offline="checked='checked'";
    
	 var html="<fieldset data-role='controlgroup'><legend>Network Mode</legend><input type='radio' name='radio-choice-1' id='radio-choice-1' value='true' "+online+" onclick='ChangeNetwork();'/><label for='radio-choice-1'>Online</label><input type='radio' name='radio-choice-1' id='radio-choice-2' value='false' "+offline+"  onclick='ChangeNetwork();'/><label for='radio-choice-2'>Offline</label></fieldset>"; 
	$("#networksettings").html(html);
	$("#networksettings").trigger('refresh');
	$("#networksettings").trigger('create');
	
	 
   }
  
  function setNetworkMode(mode)
  {
  if(mode=="true")
  localStorage.setItem("OnlineMode", "true");
  else
  localStorage.setItem("OnlineMode", "false");
  }
  
  function ChangeNetwork()
  {
  var mode=window.localStorage.getItem("OnlineMode");
  if(mode=="true")
  localStorage.setItem("OnlineMode", "false");
  else
  localStorage.setItem("OnlineMode", "true");
  var OnlineMode=window.localStorage.getItem("OnlineMode");
     OnlineStatus("indicator",OnlineMode);
     OnlineStatus("indicator",OnlineMode);
     OnlineStatus("indicator_lead",OnlineMode);
	 OnlineStatus("indicator_contact",OnlineMode); 
	 OnlineStatus("indicator_account",OnlineMode); 
	 OnlineStatus("indicator_opp",OnlineMode);
  }

  function DropAll()
 {
 var query="drop table "+user+"_leads";
 var query2="drop table "+user+"_contacts";
 var query3="drop table "+user+"_accounts";

 ExecuteQuery(db,query);
 ExecuteQuery(db,query2);
 ExecuteQuery(db,query3);

 localStorage.removeItem("firstTime");
 
 CreateTableContact(db);
 CreateTableLead(db);
 CreateTableAccounts(db);
    
 alert("All local data is deleted");
}

function pageMove(page)
{
location.href=page;
}

/* ****************** Utility Section Ends ********** */
/* ************* Form Validator ******************* */
function ValidateEmail(uemail)
{
var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
if(uemail.match(mailformat))
{
return true;
}
else
{
return false;
}
} 

function whiteSpace(str)
{
var empty_string = /^\s*$/; //create RegExp object for re-use

if (empty_string.test(str))
return true;

return false;
}

function allnumeric(uzip)
{ 
var numbers = /^[0-9]+$/;
if(uzip.match(numbers))
{
return true;
}
else
{
return false;
}
}

/* *************** Location *********************** */
function setLocation()
{
   online = window.navigator.onLine;
   if(!online)
   {
   alert("No Network Connection !");
   return;
   }   

var street=$("#loc_street").val();
var city=$("#loc_city").val();
var country=$("#loc_country").val();
var addr=street+" "+city+" "+country;
$("#loc_msg").html("Finding Location..");

$.ajax({
          url: DomainName+"/mobicrm/services/getgeo.php",
          dataType: 'jsonp',
          jsonp: 'jsoncallback',
          timeout: TimeOutValue,
          data:{addr:encodeURIComponent(addr)},
          success: function(json, status)
          {
            
            
            if(json.msg=="success")
            {
            $("#loc_msg").html("Manual update");
            window.localStorage.setItem("location",street+" "+city+" "+country);
            window.localStorage.setItem("lat",json.lat);
            window.localStorage.setItem("long",json.lng);
			getLocation();

            }
            else
            $("#loc_msg").html("No Location Found");       
         
		 
		 
		 },
	    error: function( objAJAXRequest, strError )
		{
        $( "#loc_msg" ).text("Error in establishing connection [ " +strError+" "+objAJAXRequest.status+" ]");
	    }
});
}

function getLocation()
{
var loc=window.localStorage.getItem("location");
var lat=window.localStorage.getItem("lat");
var lng=window.localStorage.getItem("long");

if(loc=="null")
loc="";

$("#loc_name").html(loc);

$("#loc_lat").html(lat);

$("#loc_long").html(lng);


}


function getLat()
{
var lat=0;
lat=window.localStorage.getItem("lat");
if(lat==null)
return "";

return lat;

}

function getLng()
{
var lng=0;
lng=window.localStorage.getItem("long");


if(lng==null)
return "";
return lng;

}
/* ************************* Section Lead ********************************** */

/* Add/Edit Leads */

 /* *************** Quick Lead ********************************* */
 function quickLeadContact(id)
 {
 var arr=ContactsArray[id];
 var name=arr["Name"];
 var id=arr["Id"];
 $("#quicklead_name").val(name);
 $("#quicklead_contact_id").val(id);
 }
 
 function quickLeadAccount(id)
 {
 var arr=AccountsArray[id];
 var name=arr["Name"];
 var id=arr["Id"];;
 $("#quicklead_account").val(name);
 $("#quicklead_account_id").val(id);
 
 }
 
 function quickLeadInfo()
 {
 var arr=ContactsArray[id];
 var name=$("#contact_detail_name").val();
 var id=$("#contact_detail_id").val();
 $("#quicklead_name").val(name);
 $("#quicklead_contact_id").val(id);
 }
 
 function quickLeadInfoAcc()
 {
 var name=$("#account_detail_name").val();
 var id=$("#account_detail_id").val();
 $("#quicklead_account").val(name);
 $("#quicklead_account_id").val(id);
 }
 
 function quickLeadPost()
 {
 
  var source=$("#quicklead_source").val();
  var amount=$("#quicklead_amount").val();
  var name=$("#quicklead_name").val();
  var account_name=$("#quicklead_account").val();
  var account_id=$("#quicklead_account_id").val();
  var contact_id=$("#quicklead_contact_id").val();
  var description=$("#description_quick_lead").val();
  var addr=$("#quicklead_addr").val();
  var city=$("#quicklead_city").val();
  var country=$("#quicklead_country").val();
  var state=$("#quicklead_state").val();
  var pin=$("#quicklead_pin").val();
  
  if(!checkBlankValue(description))
  {
  alert("Invalid Description ");
  return;
  }
  if(!checkBlankValue(name))
  {
  alert("Invalid Contact");
  return;
  }
  
 var n=name.split(" ");
 var fname=n[0];
 var lname=n[1];
  
  if(checkBlankValue(amount))
  {
  if(!allnumeric(amount))
    {
     alert("Invalid Amount. A Numeric value is required");
     return;
    }
  }
  
  if(checkBlankValue(addr) || checkBlankValue(city) || checkBlankValue(country) || checkBlankValue(state) || checkBlankValue(pin))
  {

   if(addr.length>40 || city.length>30 || country.length>20 || state.length>30 || pin.length>10)
    {
    alert("Address is too long.");
	return;
    }
  }
  
   url=DomainName+"/mobicrm/services/quicklead.php";
   postdata="user="+encodeURIComponent(user)+"&password="+encodeURIComponent(pass)+"&cid="+contact_id+"&aid="+account_id+"&amount="+amount+"&account="+account_name+"&source="+source+"&description="+encodeURIComponent(description)+"&city="+encodeURIComponent(city)+"&addr="+encodeURIComponent(addr)+"&country="+encodeURIComponent(country)+"&state="+encodeURIComponent(state)+"&pin="+encodeURIComponent(pin);
   url=DomainName+"/mobicrm/services/quicklead.php";
   sql="INSERT into "+user+"_leads (uid,fname,lname,email,title,mobile,status,description,lead_source,do_not_call,street,city,state,pin,country,amount,account,lat,lng,distance,sync) VALUES ('0','"+fname+"','"+lname+"','','','','New','"+description+"','"+source+"','0','"+addr+"','"+city+"','"+state+"','"+pin+"','"+country+"','"+amount+"','"+account_name+"','','','',0)";
   saveData(url,postdata,"leads","add",sql);   
   
   
 
 }
 
 
 
 /* *************** End *************** */


var leadId="";
function LeadFormValidate()
{
   var letters = /^[A-Za-z]+$/;
  var flag=false;
  var cp="50";
  var source=$("#lead_source").val();
  var amount=$("#amount").val();
  //var date=$("#date").val();
  var donotcall=1;
  var fname=$("#fname_lead").val();
  var lname=$("#lname_lead").val();
  var email=$("#email_lead").val();
  var mobile=$("#mobile_lead").val();
  var title=$("#title_lead").val();
  
  var description=$("#description_lead").val();
  var account=$("#account_lead").val();
  var city=$("#city_lead").val();
  var addr=$("#addr_lead").val();
  var country=$("#country_lead").val();
  var state=$("#state_lead").val();
  var pin=$("#pin_lead").val();
  var id=$("#id_lead").val();
  var operation=$("#lead_action").val();
  var lead_to_contact=$("#lead_to_contact").val();
  
  
  
  var postdata="";
  var sql="";
  var f,l,e,m,de;
 
 $("#fname_lead_error").html("");
 $("#lname_lead_error").html("");
 $("#email_lead_error").html("");
 $("#description_lead_error").html("");
 $("#mobile_lead_error").html("");

  if(!checkBlankValue(description))
  {
  alert("Invalid Description ");
  return;
  }
  else
  de=true;
  
   if(checkBlankValue(fname) && fname.match(letters))
   f=true;
   else
   {
   alert("*Invalid first name: (No special characters)");
   return;
   }
   
   if(checkBlankValue(lname) && lname.match(letters))
   l=true;
   else
   {
   alert("*Invalid last name: (No special characters)");
   return;
   }
   
   if(checkBlankValue(email))
   {
    if(!IsEmail(email))
	{
	alert("Invalid Email Address.");
	return;
	}
   }
   
   if(checkBlankValue(mobile))
   {
    if(mobile.length>20)
	{
	alert("Invalid Mobile Number. Too Lengthy");
	return;
	}
   }
  
  
  if(checkBlankValue(amount))
  {
  if(!allnumeric(amount))
  {
  alert("Invalid Amount. A Numeric value is required");
  return;
  }
  }
  
  if(checkBlankValue(addr) || checkBlankValue(city) || checkBlankValue(country) || checkBlankValue(state) || checkBlankValue(pin))
  {

   if(addr.length>40 || city.length>30 || country.length>20 || pin.length>20 || pin.length>10)
    {
    alert("Address is too long.");
	return;
    }
  }
   if(f && l && de)
   {
   
     
   url=DomainName+"/mobicrm/services/add_lead2.php";
   
   if(operation=="add")
   {
   postdata="user="+encodeURIComponent(user)+"&password="+encodeURIComponent(pass)+"&fname_lead="+encodeURIComponent(fname)+"&lname_lead="+encodeURIComponent(lname)+"&email_lead="+email+"&phone_lead="+encodeURIComponent(mobile)+"&title_lead="+encodeURIComponent(title)+"&description_lead="+encodeURIComponent(description)+"&cp="+encodeURIComponent(cp)+"&source="+encodeURIComponent(source)+"&amount="+encodeURIComponent(amount)+"&donotcall="+encodeURIComponent(donotcall)+"&account="+encodeURIComponent(account)+"&city="+encodeURIComponent(city)+"&addr="+encodeURIComponent(addr)+"&country="+encodeURIComponent(country)+"&lead_to_contact="+lead_to_contact;
  
 
   sql="INSERT into "+user+"_leads (uid,fname,lname,email,title,mobile,status,description,lead_source,do_not_call,street,city,country,amount,account,lat,lng,distance,sync) VALUES ('0','"+fname+"','"+lname+"','"+email+"','"+title+"','"+mobile+"','New','"+description+"','"+source+"','"+donotcall+"','"+addr+"','"+city+"','"+country+"','"+amount+"','"+account+"','','','',0)";
   saveData(url,postdata,"leads",operation,sql);   
   
   }
   if(operation=="edit")
  {  
   postdata="user="+encodeURIComponent(user)+"&password="+encodeURIComponent(pass)+"&fname_lead="+encodeURIComponent(fname)+"&lname_lead="+encodeURIComponent(lname)+"&email_lead="+email+"&phone_lead="+encodeURIComponent(mobile)+"&title_lead="+encodeURIComponent(title)+"&description_lead="+encodeURIComponent(description)+"&cp="+encodeURIComponent(cp)+"&source="+encodeURIComponent(source)+"&amount="+encodeURIComponent(amount)+"&donotcall="+encodeURIComponent(donotcall)+"&account="+encodeURIComponent(account)+"&city="+encodeURIComponent(city)+"&state="+encodeURIComponent(state)+"&pin="+encodeURIComponent(pin)+"&addr="+encodeURIComponent(addr)+"&country="+encodeURIComponent(country)+"&id="+id+"&action=edit";
  sql="update "+user+"_leads set fname='"+fname+"',lname='"+lname+"',email='"+email+"',mobile='"+mobile+"',title='"+title+"',description='"+description+"',lead_source='"+source+"',do_not_call='"+donotcall+"',state='"+state+"',pin='"+pin+"',street='"+addr+"',city='"+city+"',country='"+country+"',amount='"+amount+"',account='"+account+"' where uid='"+id+"'";
  
  
  saveData(url,postdata,"leads",operation,sql);  
 }
  }
  
  }

  
//Lead Detail Widget
function changePageLeadDB(id)
 {
     
	 
	 db.transaction(function (tx) 
   {
   tx.executeSql("SELECT * FROM "+user+"_leads where uid='"+id+"'", [], function (tx, results) 
   {
     var fname=results.rows.item(0).fname;
	 var lname=results.rows.item(0).lname;
	 var mobile=results.rows.item(0).mobile;
	 var dnc=results.rows.item(0).do_not_call;
	 var description=results.rows.item(0).description;
	 var status=results.rows.item(0).status;
	 
	 var title=results.rows.item(0).title;
	 var email=results.rows.item(0).email;
	 var id=results.rows.item(0).uid;
	 var source=results.rows.item(0).lead_source;
	 var amount=results.rows.item(0).amount;
	 var account=results.rows.item(0).account;
	 var street=results.rows.item(0).street;
	 var city=results.rows.item(0).city;
	 var country=results.rows.item(0).country;
	 
	 var name=fname+" "+lname;
	 var mobileNum="";
	 if(mobile.length!=0)
	 mobileNum=mobile;
	 
	 var dnchtml="No";
	 if(dnc==1)
	 dnchtml="yes";
	 
	 if(mobileNum.length!=0)
	 phoneHTML="<a href='tel:"+mobileNum+"' data-role='button'><span class='pictogram'>!</span> "+mobileNum+"</a>";
	 else
	 phoneHTML="<span class='pictogram'>!</span> Not Available";
	 
	 if(email.length!=0)
	 emailHTML="<a href='mailto:"+email+"' data-role='button'><span class='pictogram'>%</span> "+email+"</a>";
	 else
	 emailHTML="<span class='pictogram'>%</span> Not Available";
	 
	 description=description.replace(/'/g, "");
	 description=htmlDecode(description);
	 $("#lead_detail_description").html(description);
	 $("#lead_detail_description").val(description);
	 
	 $("#lead_detail_status").html(status);
	 $("#lead_detail_status").val(status);

	 $("#lead_detail_name").html(name);
	 $("#lead_detail_name").val(name);
	 $("#lead_detail_phone").html(phoneHTML);
	 $("#lead_detail_phone").val(mobileNum);
	 $("#lead_detail_title").html(title);
	 $("#lead_detail_title").val(title);
	 $("#lead_detail_email").html(emailHTML);
	 $("#lead_detail_email").val(email);
	 $("#lead_detail_id").val(id);
	 
	 $("#lead_detail_source").html(source);
	 $("#lead_detail_source").val(source);
	 
	 $("#lead_detail_account").html(account);
	 $("#lead_detail_account").val(account);
	 
	 $("#lead_detail_opps").html("$"+amount);
	 $("#lead_detail_opps").val(amount);
	 $("#lead_detail_street").html(street);
	 $("#lead_detail_street").val(street);
	 
	 $("#lead_detail_city").html(city);
	 $("#lead_detail_city").val(city);
	 
	 $("#lead_detail_country").html(country);
	 $("#lead_detail_country").val(country);
	 
	 if(account.length!=0)
	 $("#lead_detail_acc_alert").html("Currently associated with "+account);
	 else
	 $("#lead_detail_acc_alert").html("No account associated");
	 
	 $("#lead_detail_phone").trigger('create');
	 $("#lead_detail_email").trigger('create');
	 
	 
	 
   
   }, txWin,txFail);
  });
  
	 
} 

function changePageLead(id)
 {
     arr=SearchResultArray[id];
	 var fname=arr["firstName"];
	 var lname=arr["lastName"];
	 var mobile=arr["Mobile"];
	 var dnc=arr["DnC"];
	 var description=arr["Description"];
	 var status=arr["Status"];
	 
	 var title=arr["Title"];
	 var email=arr["Email"];
	 var id=arr["Id"];
	 var source= arr["Source"];
	 var amount= arr["Amount"];
	 var account=arr["AccountName"];
	 var street=arr["Street"]
	 var city=arr["City"];
	 var country=arr["Country"];
	 var state=arr["State"];
	 var pin=arr["Pin"];
	 
	 var name=fname+" "+lname;
	 var mobileNum="";
	 if(mobile.length!=0)
	 mobileNum=mobile;
	 
	 var dnchtml="No";
	 if(dnc==1)
	 dnchtml="yes";
	 
	 if(mobileNum.length!=0)
	 phoneHTML="<a href='tel:"+mobileNum+"' data-role='button'><span class='pictogram'>!</span> "+mobileNum+"</a>";
	 else
	 phoneHTML="<span class='pictogram'>!</span> Not Available";
	 
	 if(email.length!=0)
	 emailHTML="<a href='mailto:"+email+"' data-role='button'><span class='pictogram'>%</span> "+email+"</a>";
	 else
	 emailHTML="<span class='pictogram'>%</span> Not Available";
	 
	 description=description.replace(/'/g, "");
	 description=htmlDecode(description);
	 $("#lead_detail_description").html(description);
	 $("#lead_detail_description").val(description);
	 
	 $("#lead_detail_status").html(status);
	 $("#lead_detail_status").val(status);

	 $("#lead_detail_name").html(name);
	 $("#lead_detail_name").val(name);
	 $("#lead_detail_phone").html(phoneHTML);
	 $("#lead_detail_phone").val(mobileNum);
	 $("#lead_detail_title").html(title);
	 $("#lead_detail_title").val(title);
	 $("#lead_detail_email").html(emailHTML);
	 $("#lead_detail_email").val(email);
	 $("#lead_detail_id").val(id);
	 
	 $("#lead_detail_source").html(source);
	 $("#lead_detail_source").val(source);
	 
	 $("#lead_detail_account").html(account);
	 $("#lead_detail_account").val(account);
	 
	 $("#lead_detail_opps").html("$"+amount);
	 $("#lead_detail_opps").val(amount);
	 /*
	 $("#lead_detail_dnc").html(dnchtml);
	 $("#lead_detail_dnc").val(dnc);
	 */
	 $("#lead_detail_street").html(street);
	 $("#lead_detail_street").val(street);
	 
	 $("#lead_detail_city").html(city);
	 $("#lead_detail_city").val(city);
	 
	 $("#lead_detail_country").html(country);
	 $("#lead_detail_country").val(country);
	 
	 $("#lead_detail_state").html(state);
	 $("#lead_detail_state").val(state);
	 
	 $("#lead_detail_pin").html(pin);
	 $("#lead_detail_pin").val(pin);
	 
	 if(account.length!=0)
	 $("#lead_detail_acc_alert").html("Currently associated with "+account);
	 else
	 $("#lead_detail_acc_alert").html("No account associated");
	 
	 $("#lead_detail_phone").trigger('create');
	 $("#lead_detail_email").trigger('create');
	 
	 //var img=getGoogleImage(street,city,country);
	 //$("#map").html(img);
	
 }  
  
  
function setEditLeadForm()
 {
 
 var name=$("#lead_detail_name").val();
 var phone=$("#lead_detail_phone").val();
 var email=$("#lead_detail_email").val();
 var title=$("#lead_detail_title").val();
 var id=$("#lead_detail_id").val();
 var desc=$("#lead_detail_description").val();
 var status=$("#lead_detail_status").val();
 var source=$("#lead_detail_source").val();
 var account=$("#lead_detail_account").val();
 var opps=$("#lead_detail_opps").val();
 var street=$("#lead_detail_street").val();
 var city=$("#lead_detail_city").val();
 var country=$("#lead_detail_country").val();
 var state=$("#lead_detail_state").val();
 var pin=$("#lead_detail_pin").val();
 
 
 var n=name.split(" ");
 var fname=n[0];
 var lname=n[1];
 
 $("#fname_lead").val(fname);
 $("#lname_lead").val(lname);
 $("#status_lead").val(status);
 $("#description_lead").val(desc);
 $("#email_lead").val(email);
 $("#title_lead").val(title);
 $("#mobile_lead").val(phone);
 $("#lead_source").val(source);
 
 $("#amount").val(opps);
 $("#account_lead").val(account);
 $("#addr_lead").val(street);
 $("#city_lead").val(city);
 $("#country_lead").val(country);
 $("#state_lead").val(state);
 $("#pin_lead").val(pin);
 
 $("#id_lead").val(id);
 $("#lead_action").val("edit")
 
 }
 
 function AssoicateAccount(leadid,accountname)
 {
 var acc=$("#"+accountname).val();
 var id=$("#"+leadid).val();


 if(acc.length>0)
 $("#lead_acc_info").html("<p style='white-space: normal'>Lead is associated with <strong>"+acc+"</strong>. Do you want to change this ");
 
 $("#lead_assco_acc_id").val(id);
 }
 function getGoogleMap(street,city,country)
 {
 var street=$("#"+street).val();
 var city=$("#"+city).val();
 var country=$("#"+country).val();

 if(street.length ==0 && city.length ==0)
 {
 alert("Invalid or blank Address.");
 return;
 }
 else
 {
 var addr=encodeURIComponent(street+" "+city+" "+country);
 var url="https://maps.google.co.in/maps?q="+addr;
 showPage(true,url);
 }
 
 
 }
 
 function setLeadId(id)
 {
 this.leadId=id;
 
 }
 function changeLeadStatus(status)
 {
 url=DomainName+"/mobicrm/services/change_lead.php";
 postdata="user="+encodeURIComponent(user)+"&password="+encodeURIComponent(pass)+"&id="+encodeURIComponent(leadId)+"&status="+encodeURIComponent(status);
 var loader="<span class='error'>Changing..</span>";
//div id is same as leadid
 var sql="update "+user+"_leads set status='"+status+"' where uid='"+leadId+"'";
 doPost(url,postdata,leadId,loader,status,sql);
 $('#menupage').popup("close");
 } 
  function AssociateLead()
  {
  var leadId=$("#lead_detail_id").val();
  var accid=$("#account_detail_id").val();
  var name=$("#account_detail_name").val();
 
  var sql="update "+user+"_leads set account='"+name+"' where uid='"+leadId+"'";
  
 postdata="user="+encodeURIComponent(user)+"&password="+encodeURIComponent(pass)+"&id="+encodeURIComponent(leadId)+"&acc_id="+encodeURIComponent(accid)+"&acc_name="+encodeURIComponent(name);
 
 url=DomainName+"/mobicrm/services/associate_lead.php";
 saveData(url,postdata,"leads","edit",sql);  
  }
  
 function changeLeadStatusByForm(lead_id_div,respo_div,status)
 {
 var url=DomainName+"/mobicrm/services/change_lead.php";
 var leadid=$("#"+lead_id_div).val();
 postdata="user="+encodeURIComponent(user)+"&password="+encodeURIComponent(pass)+"&id="+encodeURIComponent(leadid)+"&status="+encodeURIComponent(status);
 var loader="<span class='error'>Changing..</span>";
//div id is same as leadid
var sql="update "+user+"_leads set status='"+status+"' where uid='"+leadid+"'";
 doPost(url,postdata,respo_div,loader,status,sql);
 $('#menupage2').popup("close");
 
 } 
  
 //Change Contact to Leads
function changeContactToLead(name,email,mobile,title)
{
var name=$("#"+name).val();
var email=$("#"+email).val();
var mobile=$("#"+mobile).val();
var title=$("#"+title).val();



 var n=name.split(" ");
 var fname=n[0];
 var lname=n[1];
 
 $("#fname_lead").val(fname);
 $("#lname_lead").val(lname);
 $("#status_lead").val("New");
 $("#description_lead").val("Converted from contact");
 $("#email_lead").val(email);
 $("#title_lead").val(title);
 $("#mobile_lead").val(mobile);
 $("#lead_to_contact").val("false");
 } 
 
 
 function PhonebookToLead(name,mobile)
 {
 
 var n=name.split(" ");
 var fname=n[0];
 var lname=n[1];
 
 
 $("#fname_lead").val(fname);
 $("#lname_lead").val(lname);
 $("#status_lead").val("New");
 $("#description_lead").val("Contact from my PhoneBook");
 $("#mobile_lead").val(mobile);
 $("#lead_to_contact").val("false");
 } 
 
 function PhonebookToContact(name,mobile)
 {
 
 var n=name.split(" ");
 var fname=n[0];
 var lname=n[1];
 
 
 $("#fname_contact").val(fname);
 $("#lname_contact").val(lname);
 
 $("#mobile_contact").val(mobile);
 
 } 
 
 

 //Change Lead to Accounts
function changeLeadType(leadid,account)
{
var accountName=$("#"+account).val();
var leadidaccount=$("#"+leadid).val();

$("#name_account").val(accountName);
$("#leadid_account").val(leadidaccount);
$("#account_action").val("addlead");

} 
  
 //Change Lead to Opportunity
function changeLeadOpps(leadid,account,amount,desc)
{
var accountName=$("#"+account).val();
var lead_id_account=$("#"+leadid).val();
var lead_amount=$("#"+amount).val();
var desclead=$("#"+desc).val();

$("#name_opp").val(desclead);
$("#amount_opp").val(lead_amount);
$("#newaccount_opp").val(accountName);
$("#opp_leadid").val(lead_id_account);
$("#opp_action").val("addlead");

}  
  
 //Delete Lead
 function DeleteRecord(option,valuediv,displaydiv)
 {
 var loader="Deleting..";
 var success="Deleted";
 var didConfirm = confirm("You are going to delete this record. Are you sure?");
  if (didConfirm == true) 
  {
 $.mobile.changePage("#server_result");
 var leadid=$('#'+valuediv).val();
 var sql,url;
 var postdata="user="+encodeURIComponent(user)+"&password="+encodeURIComponent(pass)+"&id="+encodeURIComponent(leadid);
 if(option=="lead")
 {
 url=DomainName+"/mobicrm/services/delete_lead.php";
 sql="delete from "+user+"_leads where uid='"+leadid+"'";
 success+="<a href='#showleads' data-role='button' onclick=\"listUI('datalist','All','date',1)\">All Opportunities</a>";
 }
 if(option=="contact")
 {
 url=DomainName+"/mobicrm/services/delete_contact.php";
 sql="delete from "+user+"_contacts where uid='"+leadid+"'";
 success+="<a href=\"#showcontacts\" data-role='button' onclick=\"listUIContact('datalist_contact','All',1,'date');\">All Contacts</a>";
 }
 if(option=="account")
 {
 url=DomainName+"/mobicrm/services/delete_account.php";
 sql="delete from "+user+"_accounts where uid='"+leadid+"'";
 success+="<a href='#showaccounts' data-role='button' onclick=\"listUI('datalist','All','date',1)\">All Accounts</a>";
 }
 if(option=="opps")
 {
 url=DomainName+"/mobicrm/services/delete_opps.php";
 sql="delete from "+user+"_opps where uid='"+leadid+"'";
 success+="<a href='#showopps' data-role='button' onclick=\"listUIOpps('datalist_opps','All',1,'date','asc');\">All Opportunities</a>";
 }
 

 doPost(url,postdata,displaydiv,loader,success,sql);
 
 $("#response_status").trigger("create");
 }
 else
 $("#"+displaydiv).html("Not deleted.");
 }
/* **************************** Lead Section Ends ************************** */
  
/* ******************************************** Section Contact ******************************************** */

/* Add Edit Contact Details */
var contactId="";
function ContactFormValidate()
{ 
  var letters = /^[A-Za-z]+$/;
  var flag=false;
  var fname=$("#fname_contact").val();
  var lname=$("#lname_contact").val();
  var email=$("#email_contact").val();
  var mobile=$("#mobile_contact").val();
  var title=$("#title_contact").val();
  var street=$("#street_contact").val();
  var city=$("#city_contact").val();
  var country=$("#country_contact").val();
  var state=$("#state_contact").val();
  var pin=$("#pin_contact").val();
 
  var department="";
  var id=$("#id_contact").val();
  var operation=$("#contact_action").val();
  var postdata="";
  var f,l,e,m;
  var sql;
  var url=DomainName+"/mobicrm/services/add_contact.php";
  $("#fname_contact_error").html("");
  $("#lname_contact_error").html("");
  $("#email_contact_error").html("");


   if(checkBlankValue(fname) && fname.match(letters))
   f=true;
   else
   {
   alert("*Invalid first name: (No special characters)");
   return;
   }
   
   if(checkBlankValue(lname) && lname.match(letters))
   l=true;
   else
   {
   alert("*Invalid last name: (No special characters)");
   return;
   }
  
   if(checkBlankValue(email))
   {
    if(!IsEmail(email))
	{
	alert("Invalid Email Address.");
	return;
	}
   }
   
   if(checkBlankValue(mobile))
   {
    if(mobile.length>20)
	{
	alert("Invalid Mobile Number. Too Lengthy");
	return;
	}
   }
   
   if(checkBlankValue(street) || checkBlankValue(city) || checkBlankValue(country) || checkBlankValue(state) || checkBlankValue(pin))
  {

   if(street.length>40 || city.length>30 || country.length>20 || state.length>20 || pin.length>20)
    {
    alert("Address is too long.");
	return;
    }
  } 
   if(f && l)
   {
   
   if(operation=="add")
   {
   postdata="user="+encodeURIComponent(user)+"&password="+encodeURIComponent(pass)+"&fname_contact="+encodeURIComponent(fname)+"&lname_contact="+encodeURIComponent(lname)+"&email_contact="+email+"&mobile_contact="+encodeURIComponent(mobile)+"&title_contact="+encodeURIComponent(title)+"&department_contact="+encodeURIComponent(department)+"&action=add&city="+city+"&country="+encodeURIComponent(country)+"&street="+encodeURIComponent(street)+"&state="+encodeURIComponent(state)+"&pin="+encodeURIComponent(pin);
   sql="INSERT into "+user+"_contacts (uid,first_name,last_name,name,email,phone,title,street,city,state,country,pin,sync) VALUES ('0','"+fname+"','"+lname+"','"+fname+" "+lname+"','"+email+"','"+mobile+"','"+title+"','"+street+"','"+city+" "+state+"','"+country+"','"+pin+"',0)";
   
   saveData(url,postdata,"contacts",operation,sql);       
   }
   if(operation=="edit")
   {
   postdata="user="+encodeURIComponent(user)+"&password="+encodeURIComponent(pass)+"&fname_contact="+encodeURIComponent(fname)+"&lname_contact="+encodeURIComponent(lname)+"&email_contact="+email+"&mobile_contact="+encodeURIComponent(mobile)+"&title_contact="+encodeURIComponent(title)+"&department_contact="+encodeURIComponent(department)+"&id="+id+"&action=edit&city="+city+"&country="+encodeURIComponent(country)+"&street="+encodeURIComponent(street)+"&state="+encodeURIComponent(state)+"&pin="+encodeURIComponent(pin);
   sql="update "+user+"_contacts set first_name='"+fname+"',last_name='"+lname+"',name='"+fname+" "+lname+"',email='"+email+"',phone='"+mobile+"',title='"+title+"',street='"+street+"',city='"+city+"',state='"+state+"',country='"+country+"',pin='"+pin+"' where uid='"+id+"'";
   
   saveData(url,postdata,"contacts",operation,sql);      
  }
   //PostData(url,postdata);
   }
   
 }


/* Display Contact Detail Page */
function changePage(id)
 {
     this.contactId=null;
	 var arr=Array();
     arr=ContactsArray[id];
	 var name=arr["Name"];
	 var phone=arr["Phone"];
	 var email=arr["Email"];
	 var title=arr["Title"];
	 var id=arr["Id"];
	 var street=arr["Street"];
	 var city=arr["City"];
	 var state=arr["State"];
	 var country=arr["Country"];
	 var pin=arr["Pin"];
     
	 var phoneHTML,emailHTML;
	 
	 if(phone.length!=0)
	 phoneHTML="<a href='tel:"+phone+"' data-role='button'><span class='pictogram'>!</span> "+phone+"</a>";
	 else
	 phoneHTML="<span class='pictogram'>!</span> Not Available";
	 
	 if(email.length!=0)
	 emailHTML="<a href='mailto:"+email+"' data-role='button'><span class='pictogram'>%</span> "+email+"</a>";
	 else
	 emailHTML="<span class='pictogram'>%</span> Not Available";
	 
	 $("#contact_detail_name").html(name);
	 $("#contact_detail_name").val(name);
	 $("#contact_detail_phone").html(phoneHTML);
	 $("#contact_detail_phone").val(phone);
	 $("#contact_detail_title").html(title);
	 $("#contact_detail_title").val(title);
	 $("#contact_detail_email").html(emailHTML);
	 $("#contact_detail_email").val(email);
	 $("#contact_detail_id").val(id);
	 $("#contact_detail_street").html(street);
	 $("#contact_detail_street").val(street);
	 $("#contact_detail_city").html(city);
	 $("#contact_detail_city").val(city);
	 $("#contact_detail_state").html(state);
	 $("#contact_detail_state").val(state);
	 $("#contact_detail_pin").html(pin);
	 $("#contact_detail_pin").val(pin);
	 $("#contact_detail_country").html(country);
	 $("#contact_detail_country").val(country);
	 
	 $("#contact_detail_phone").trigger('create');
	 $("#contact_detail_email").trigger('create');
	 
}
 
 
 /* Fill Contact Form For Editing */
 function setEditContactForm()
 {
 var name=$("#contact_detail_name").val();
 var phone=$("#contact_detail_phone").val();
 var email=$("#contact_detail_email").val();
 var title=$("#contact_detail_title").val();
 var id=$("#contact_detail_id").val();
 var street=$("#contact_detail_street").val();
 var city=$("#contact_detail_city").val();
 var state=$("#contact_detail_state").val();
 var country=$("#contact_detail_country").val();
 var pin=$("#contact_detail_pin").val();
 
 
 var n=name.split(" ");
 var fname=n[0];
 var lname=n[1];
 
 $("#fname_contact").val(fname);
 $("#lname_contact").val(lname);
 $("#email_contact").val(email);
 $("#title_contact").val(title);
 $("#mobile_contact").val(phone);
 $("#street_contact").val(street);
 $("#city_contact").val(city);
 $("#country_contact").val(country);
 $("#pin_contact").val(pin);
 $("#state_contact").val(state);
 
 $("#id_contact").val(id);
$("#contact_action").val("edit")
 
 }
 
 
 function setContactID(id)
 {
  this.contactId=id;
 }
 
 /* Convert Contact To Lead */
 function changeToContact(desc)
 {
var desc=$("#lead_convert_desc").val();
postdata="user="+user+"&password="+pass+"&description="+encodeURIComponent(desc)+"&id="+contactId;
var url=DomainName+"/mobicrm/services/change_contact_lead.php";
doPost(url,postdata,"c_status","Converting...","Converted");
}

/* ********************************* Contact Section Ends *********************************** */

/* ************************* Account Section Starts *************************** */

function AppFormAccounts()
{
var letters = /^[A-Za-z]+$/;
var flag=false;
var name=$("#name_account").val();
var atype=$("#account_type").val();
var industry=$("#account_industry").val();
var employee=$("#employee_account").val();
var revenue=$("#revenue_account").val();
var city=$("#city_account").val();
var country=$("#country_account").val();
var street=$("#street_account").val();
var state=$("#state_account").val();
var pin=$("#pin_account").val();
var id=$("#id_account").val();
var leadid=$("#leadid_account").val();
var sql;

var operation=$("#account_action").val();
var f,a;

if(checkBlankValue(name))
f=true;
else
   {
   alert("*Invalid account name");
   return;
   }

if(checkBlankValue(atype) && atype.match(letters))
a=true;
else
 {
  alert("*Invalid account type");
  return;
  }
  
  if(checkBlankValue(revenue))
  {
  if(!allnumeric(revenue))
  {
  alert("Invalid Revenue. A Numeric value is required");
  return;
  }
  }
  
  if(checkBlankValue(street) || checkBlankValue(city) || checkBlankValue(country) || checkBlankValue(state) || checkBlankValue(pin))
  {

   if(street.length>40 || city.length>30 || country.length>20 || state.length>20 || pin.length>20)
    {
    alert("Address is too long.");
	return;
    }
  }

url=DomainName+"/mobicrm/services/add_account.php";

if(f && a)
   {
   if(operation=="add" || operation=="addlead")
   {
   postdata="user="+encodeURIComponent(user)+"&password="+encodeURIComponent(pass)+"&name_account="+encodeURIComponent(name)+"&type="+atype+"&action="+operation+"&leadid="+leadid+"&industry="+encodeURIComponent(industry)+"&employee="+encodeURIComponent(employee)+"&revenue="+encodeURIComponent(revenue)+"&city="+city+"&country="+encodeURIComponent(country)+"&street="+encodeURIComponent(street)+"&state="+encodeURIComponent(state)+"&pin="+encodeURIComponent(pin);
   sql="INSERT into "+user+"_accounts (uid, name, account_type,industry,employees,city,country,street,state,pin,revenue,sync) VALUES ('0','"+name+"','"+atype+"','"+industry+"','"+employee+"','"+city+"','"+country+"','"+street+"','"+revenue+"','"+state+"','"+pin+"',0)";
   saveData(url,postdata,"accounts","add",sql);   
   }
   if(operation=="edit")
   {
   postdata="user="+encodeURIComponent(user)+"&password="+encodeURIComponent(pass)+"&name_account="+encodeURIComponent(name)+"&type="+atype+"&id="+id+"&action="+operation+"&leadid="+leadid+"&industry="+encodeURIComponent(industry)+"&employee="+encodeURIComponent(employee)+"&revenue="+encodeURIComponent(revenue)+"&city="+city+"&country="+encodeURIComponent(country)+"&street="+encodeURIComponent(street)+"&state="+encodeURIComponent(state)+"&pin="+encodeURIComponent(pin);
   sql="update "+user+"_accounts set name='"+name+"',account_type='"+atype+"',industry='"+industry+"',employees='"+employee+"',city='"+city+"',country='"+country+"',street='"+street+"',state='"+state+"',pin='"+pin+"',revenue='"+revenue+"' where uid='"+id+"'";
   saveData(url,postdata,"accounts",operation,sql); 
   }
  }
  
 }


function changeAccountPage(id)
{
var arr=AccountsArray[id];
var id=arr["Id"];
var name=arr["Name"];
var type=arr["Type"];
var industry=arr["Industry"];
var employees=arr["Employees"];
var revenue=arr["Revenue"];
var city=arr["City"];
var country=arr["Country"];
var street=arr["Street"];
var state=arr["State"];
var pin=arr["Pin"];

$("#account_detail_type").val(type);
$("#account_detail_name").val(name);
$("#account_detail_industry").val(industry);
$("#account_detail_employees").val(employees);
$("#account_detail_revenue").val(revenue);
$("#account_detail_city").val(city);
$("#account_detail_country").val(country);
$("#account_detail_street").val(street);
$("#account_detail_state").val(state);
$("#account_detail_pin").val(pin);
$("#account_detail_id").val(id);

$("#account_detail_type").html(type);
$("#account_detail_name").html(name);
$("#account_detail_industry").html(industry);
$("#account_detail_employees").html(employees);
$("#account_detail_revenue").html("$"+revenue);
$("#account_detail_city").html(city);
$("#account_detail_country").html(country);
$("#account_detail_street").html(street);
$("#account_detail_state").html(state);
$("#account_detail_pin").html(pin);

//alert(selectAccountSource);
//Reference
if(selectAccountSource=="viewAll")
$("#account_detail_source").html("");

if(selectAccountSource=="associate")
{
$("#account_detail_source").html("<a href='#' data-role='button' onclick='AssociateLead();'><span class='myicon'>+</span> Associate</a>");
$("#account_detail_source").trigger("create");
}
if(selectAccountSource=="quickl")
{
$("#account_detail_source").html("<a href='#quickleads' data-role='button' onclick='quickLeadInfoAcc();'><span class='myicon'>+</span> Associate</a>");
$("#account_detail_source").trigger("create");
} 

}

function setEditAccountForm()
{
var type=$("#account_detail_type").val();
var name=$("#account_detail_name").val();
var industry=$("#account_detail_industry").val();
var employees=$("#account_detail_employees").val();
var revenue=$("#account_detail_revenue").val();
var city=$("#account_detail_city").val();
var country=$("#account_detail_country").val();
var street=$("#account_detail_street").val();
var state=$("#account_detail_state").val();
var pin=$("#account_detail_pin").val();

var id=$("#account_detail_id").val();

$("#name_account").val(name);
$("#account_type").val(type);
$("#account_industry").val(industry);
$("#employee_account").val(employees);
$("#revenue_account").val(revenue);
$("#street_account").val(street);
$("#city_account").val(city);
$("#country_account").val(country);
$("#state_account").val(state);
$("#pin_account").val(pin);
$("#id_account").val(id);
$("#account_action").val("edit")
}

/* Creates Dropdown */

function getAccountSelect2(db,div)
{
$("#"+div).html("Loading accounts..");

var size="";
var i=0,len=0;
db.transaction(function (tx) 
   {
   tx.executeSql("SELECT * FROM "+user+"_accounts order by sync asc, id asc", [], function (tx, results) 
   {
   len = results.rows.length, i;
   if(len>0)
   {
   var html="<select  data-native-menu=\"false\" data-mini=\"true\" id='acc_leads_list'>";
   for (i = 0; i < len; i++)
   {
     html+="<option value='"+results.rows.item(i).uid+"'>"+results.rows.item(i).name+"</option>";
   
   }
 html+="</select>";
  }
  else
 html="<p class='error'>No account found</p>";
      $("#"+div).html("");
	  $("#"+div).append(html);
	  $("#"+div).trigger('create');
 }, null);
});

	
}

function getAccountSelect(db,div)
{
$("#"+div).html("Loading accounts..");
var size="";
var i=0,len=0;
db.transaction(function (tx) 
   {
   tx.executeSql("SELECT * FROM "+user+"_accounts order by sync asc, id asc", [], function (tx, results) 
   {
   len = results.rows.length, i;
   if(len>0)
   {
   var html="<select  data-native-menu=\"false\" data-mini=\"true\" id=\"acc_vals\"><option value=''>Select</option>";
   for (i = 0; i < len; i++)
   {
     html+="<option value='"+results.rows.item(i).uid+"'>"+results.rows.item(i).name+"</option>";
   
   }
 html+="</select>";
  }
  else
 html="<p class='error'>No account found</p>";
      $("#"+div).html("");
	  $("#"+div).append(html);
	  $("#"+div).trigger('create');
 }, null);
});
}



/* ************************* Account Section Ends *************************** */


/* ******************** Server Communication POST / GET Section ***************************** */

function doPost(url,qpm,div,loadermessage,successmessage,sql)
{    
online = window.navigator.onLine;
   if(!online)
   {
   alert("No Network Connection !");
   return;
   }

$("#"+div).html(loadermessage);
$.ajax({
          url:url,
          dataType: 'jsonp',
          jsonp: 'jsoncallback',
          data:qpm,
          success: function(json, status)
          {
             if(json.id!=0)
			  {
			  $("#"+div).html(successmessage);
              ExecuteQuery(db,sql);
			  $("#"+div).trigger("create");
			  }
			  else
			  {
			  $("#"+div).html("Operation could not perform");
			  
			  }
			  
			  
           },
         error: function( objAJAXRequest, strError )
		{
        if(objAJAXRequest.status==0)
		{
		
		$("#"+div).html("Operation Cancelled"); 
		location.href="home.html";
        }
		else
		$( "#datalist" ).text("Error in establishing connection [ " +strError+" "+objAJAXRequest.status+" ]");
	    }
 });

 }
 /* ************* String Methods *************** */
 function filterString(str)
{
str=str.trim();
if(str.length>0)
str = str.replace(/'/g, "\\'");

alert(str);
return str;
}

function htmlEncode(value){
  return $('<div/>').text(value).html();
}

function htmlDecode(value){
  return $('<div/>').html(value).text();
}
 
/*************************************** Save Data *******************************************/
function saveData(url,postdata,module,action,sql)
{
   online = window.navigator.onLine;
   if(!online)
   {
   alert("No Network Connection !");
   return;
   }
   
   $.mobile.changePage("#server_result");
   $("#c_status").html("Executing..");
   var tempSql="";
   var userAction="";
   $.ajax({
          url: url,
          dataType: 'jsonp',
          jsonp: 'jsoncallback',          
		  type: "POST",
		  timeout:TimeOutValue,
		  data:postdata,
          success: function(json,status)
		                {
                         if(json.id<0)
						 {
						  $("#c_status").html("Error :" +json.msg);
						  return;
						 }
						 
						 if(json.id !=0)
						 {
						    arr=Array();
							if(action=="add")
							{
							ExecuteQuery(db,sql);
							tempSql="update "+user+"_"+module+" set uid='"+json.id+"' where uid='0'";
							ExecuteQuery(db,tempSql);
						    }
							if(action=="edit")
							{
						
							ExecuteQuery(db,sql);
							}
							
							if(module=="leads")
							{
							
							
							arr["firstName"]=json.fname;
		                    arr["lastName"]=json.lname;
		                    arr["Id"]=json.id;
		                    arr["Email"]=json.email;
		                    arr["Title"]=json.title;
		                    arr["PhoneHome"]=json.mobile;
		                    arr["Mobile"]=json.mobile;
		                    arr["Status"]=json.status;
		                    arr["Description"]=json.description;
	                        arr["Source"]=json.lead_source;
	                        arr["Country"]=json.country;
		                    arr["City"]=json.city;
		                    arr["Street"]=json.street;
							arr["State"]=json.state;
		                    arr["Pin"]=json.pin;
		                   
		                    arr["DnC"]=json.do_not_call;
		                    arr["AccountName"]=json.account;
		                    arr["Amount"]=json.amount;
	                        arr["Lat"]=json.lat;
	                        arr["Lng"]=json.lng;
		                    arr["Distance"]="";
							
						
							//GeoLocation Calculation
	                        if(json.lat.length!=0)
		                      {
		                      mylat=getLat();
		                      mylang=getLng();
		                      if(mylat.length!=0 && mylang.length !=0)
		                      {
							  distance=Distance(json.lat,json.lng,mylat,mylang);
							  tempSql="update "+user+"_leads set lat='"+json.lat+"',lng='"+json.lng+"',distance='"+distance+"' where uid='"+json.id+"'";
	                          ExecuteQuery(db,tempSql);
							  }
							  }
							tempSql="update "+user+"_leads set email='"+json.email+"',mobile='"+json.mobile+"' where uid='"+json.id+"'";
	                        ExecuteQuery(db,tempSql);
							SearchResultArray[arr["Id"]]=arr;
							
							userAction="<a href='#detail_lead' data-role=\"button\" onclick=\"changePageLead('"+arr['Id']+"');\" > <span class=\"myicon\">i</span> Show Opportunity</a>";
							
							
							}
							if(module=="contacts")
							{
							arr["Name"]=json.name;
	                        arr["Phone"]=json.phone;
	                        arr["Email"]=json.email;
	                        arr["Title"]=json.title;
	                        arr["Id"]=json.id;
							arr["Street"]=json.street;
	                        arr["City"]=json.city;
	                        arr["Country"]=json.country;
	                        arr["State"]=json.state;
	                        arr["Pin"]=json.pin;
							
							
							ContactsArray[arr["Id"]]=arr;
							userAction="<p><a href='#detail_contact' data-role='button' onclick=\"changePage('"+arr["Id"]+"');\" > <span class=\"myicon\">y</span> Show Contact</a></p>";
							//Redirect to quick lead form  if added from Add 
							if(selectContactSource=="quickl")
							{
							quickLeadContact(json.id);
							$.mobile.changePage("#quickleads");
							selectContactSource="";
							}
							
							}
							if(module=="accounts")
							{
							arr["Name"]=json.name;
	                        arr["Type"]=json.type;
	                        arr["Id"]=json.id;
	                        arr["Industry"]=json.industry;
	                        arr["Employees"]=json.employees;
	                        arr["City"]=json.city;
	                        arr["Country"]=json.country;
	                        arr["Street"]=json.street;
							arr["State"]=json.state;
	                        arr["Pin"]=json.pin;
	                        arr["Revenue"]=json.revenue;
	
	                        AccountsArray[arr["Id"]]=arr;
							
							
							userAction="<p><a href='#accountsdetail' data-role=\"button\" onclick=\"changeAccountPage('"+arr['Id']+"');\"> <span class=\"myicon\">u</span> Show Account</a></p>";
							
							if(selectAccountSource=="quickl")
							{
							quickLeadAccount(json.id);
							$.mobile.changePage("#quickleads");
							selectAccountSource="";
							}
							
							}
							if(module=="opps")
							{
							arr["Name"]=json.name;
                            arr["Stage"]=json.stage;
                            arr["Amount"]=json.amount;
                            arr["Account"]=json.account;
                            arr["Id"]=json.id;
                            
							OppsArray[arr["Id"]]=arr;
							userAction="<a href='#oppsdetail' data-role='button' onclick=\"changeOppsPage('"+arr['Id']+"');\"><span class=\"myicon\">f</span> View Opportunity</a>";
							}
							
							$("#c_status").html("Transaction Complete "+userAction);
							$("#response_status").trigger("create");
						    
						 }
						 else
						 $("#c_status").html("Error : Transaction could not be completed");
						},
		error: function( objAJAXRequest, strError )
		{
        if(objAJAXRequest.status==0)
		{
		
		$("#c_status").html("Operation Cancelled"); 
		location.href="home.html";
        }
		else
		$( "#c_status" ).text("Error in establishing connection [ " +strError+" "+objAJAXRequest.status+" ]");
	    }
          
       });
}



function PostData(url,postdata)
{
   $.mobile.changePage("#server_result");
   $("#c_status").html("Loading...");
   $.ajax({
          url: url,
          dataType: 'jsonp',
          jsonp: 'jsoncallback',          
		  type: "POST",
		  timeout:TimeOutValue,
		  data:postdata,
          success: function(json,status)
		                {
                         if(json.id !=0)
						 $("#c_status").html("Saved");
						 else
						 $("#c_status").html("Could not save..");
						},
		error: function( objAJAXRequest, strError )
		{
        if(objAJAXRequest.status==0)
		{
		
		$("#c_status").html("Operation Cancelled"); 
		location.href="home.html";
        }
		else
		$( "#c_status" ).text("Error in establishing connection [ " +strError+" "+objAJAXRequest.status+" ]");
	    }
          
       });
}



 
/* **************************** Social Connector to CRM ******************** */
function connectCRM(option,div,name,location,industry,title,source)
{  
   var n=name.split(" ");
   var fname=n[0];
   var lname=n[1];
   
   if(lname =="undefined" || lname ==null)
   lname="";
   var successmsg="Converted";
   
   var user = window.localStorage.getItem("user");
   var pass= window.localStorage.getItem("pass");
   if(option=="lead")
	{
   url=DomainName+"/mobicrm/services/add_lead2.php";
   postdata="user="+encodeURIComponent(user)+"&password="+encodeURIComponent(pass)+"&fname_lead="+encodeURIComponent(fname)+"&lname_lead="+encodeURIComponent(lname)+"&email_lead=''&mobile_lead=''&description_lead=Lead from Social Network&lead_to_contact=true";
  sql="INSERT into "+user+"_leads (uid,fname,lname,email,title,mobile,status,description,lead_source,do_not_call,street,city,country,amount,account,lat,lng,distance,sync) VALUES ('0','"+fname+"','"+lname+"','','','','New','Opportunity from Social Network','Web site','','','','','','','','','',0)";
  module="leads";
	}
  if(option=="contact")
	{
  url=DomainName+"/mobicrm/services/add_contact.php";
  postdata="user="+encodeURIComponent(user)+"&password="+encodeURIComponent(pass)+"&fname_contact="+encodeURIComponent(fname)+"&lname_contact="+encodeURIComponent(lname)+"&email_contact=&mobile_contact=&title_contact="+title+"&department_contact="+industry+"&description_contact=Contact from Social Network";
  sql="INSERT into "+user+"_contacts (uid,first_name,last_name,name,email,phone,title,sync) VALUES ('0','"+fname+"','"+lname+"','"+fname+" "+lname+"','','','Contact from Social Network',0)";
   module="contacts";  
   }
   
   
  successmsg="Contact converted!";
   
  doPostSocial(url,postdata,div,"Converting..",successmsg,module,sql);
   
}


function doPostSocial(url,qpm,div,loadermessage,successmessage,module,sql)
{    
  online = window.navigator.onLine;
   if(!online)
   {
   alert("No Network Connection !");
   return;
   }
   
  var tempSql="";
   
   $.ajax({
          url: url,
          dataType: 'jsonp',
          jsonp: 'jsoncallback',          
		  type: "POST",
		  timeout:TimeOutValue,
		  data:qpm,
          success: function(json,status)
		                {
                         if(json.id !=0)
						 {
						   
							ExecuteQuery(db,sql);
							tempSql="update "+user+"_"+module+" set uid='"+json.id+"' where uid='0'";
							
							ExecuteQuery(db,tempSql);
							$("#"+div).html(successmessage);
						  }
						 else
						 $("#"+div).html("Could not save");
						},
		error: function( objAJAXRequest, strError )
		{
        if(objAJAXRequest.status==0)
		{
		
		$("#"+div).html("Operation Cancelled"); 
		location.href="home.html";
        }
		else
		$("#"+div).text("Error in establishing connection [ " +strError+" "+objAJAXRequest.status+" ]");
	    }
          
       });

 }




/* ************************* Authentication to Social Server ******************************** */
function resetAcc(channel)
{
  online = window.navigator.onLine;
   if(!online)
   {
   alert("No Network Connection !");
   return;
   }
   
   $("#auth_respo").html("Removing...");
   $.ajax({
          url: "http://socialnama.com/crmnew3/social/reset.php",
          dataType: 'jsonp',
          jsonp: 'jsoncallback',          
		  type: "POST",
		  data:"user="+user+"&channel="+channel,
          success: function(json,status)
		    {
			   
			   if(json.id>0)
			   getAuthenticated();
			   else
			   $("#auth_respo").html("Try again");
			},
			error: function( objAJAXRequest, strError )
		{
        if(objAJAXRequest.status==0 && strError !="timeout")
		{
		alert("Network Error.");
        }
		else
		alert("Error in establishing connection [ " +strError+" "+objAJAXRequest.status+" ]");
	    }
 
       });
   }


function getAuthenticated()
   {
   online = window.navigator.onLine;
   if(!online)
   {
   alert("No Network Connection !");
   return;
   }
   var tl,fl,ll,ag;
   $("#auth_respo").html("Connecting to social server");
   $.ajax({
          url: "http://socialnama.com/crmnew3/social/auth.php",
          dataType: 'jsonp',
          jsonp: 'jsoncallback',          
		  type: "POST",
		  data:"user="+user+"&password="+pass,
          success: function(json,status)
		                {
                         
						 $("#auth_respo").html("Success.. Setting your Social Zone");
						 
						 if(json.msg=="success")
						  {
						   tl="<li data-role='list-divider'>Twitter Zone</li>";
						   if(json.tw!=0)
						   {
						   tl+="<li><a href='twitter.html' rel='external'><strong>Access</strong></a></li>";
						   tl+="<li><a href='#' onclick=\"resetAcc('twitter');\"><strong>Reset</strong></a></li>";
						   }
						   else
						   tl+="<li><a href='#social' onclick=showPage(true,'http://socialnama.com/crmnew3/social/twitteroauth/connect.php?user="+user+"');>Connect To Twitter</a></li>";
						   
						   ll="<li data-role='list-divider'>LinkedIn Zone</li>";
						   if(json.ln!=0)
						   {
						   
						   ll+="<li><a href='social.html' rel='external'><strong>Access</strong></a></li>";
						   ll+="<li><a href='#' onclick=\"resetAcc('linkedin');\" rel='external'><strong>Reset</strong></li>";
						   }
						   else
						   ll+="<li><a href='#social' onclick=showPage(true,'http://socialnama.com/crmnew3/social/linkedin/connect.php?user="+user+"');>Connect To Linkedin</a></li>";
						    
						   if(json.ln!=0)
						   ag="<li><a href=\"social.html#agents\" rel=\"external\" >My Agents</a>";
						   else
						   ag="<li><a href='#social' onclick=showPage(true,'http://socialnama.com/crmnew3/social/linkedin/connect.php?user="+user+"');>Create Agents</a></li>";
						    

						   fl="<li data-role='list-divider'>Facebook Zone</li>";
						   if(json.fb!=0)
						   {
						   fl+="<li><a href='facebook.html' rel='external'><strong>Access</strong></a></li>";
						   fl+="<li><a href='#' onclick=\"resetAcc('facebook');\"><strong>Reset</strong></a></li>";
						   }
						   else
                           fl+="<li><a href='#' onclick=showPage(true,'http://socialnama.com/crmnew3/social/fb/connect.php?user="+user+"');>Connect To Facebook</a></li>";




                          $("#auth_respo").html("<ul data-role='listview' data-inset='true'>"+tl+ll+ag+fl+"</ul>");
						  $("#auth_respo").trigger("create"); 
						  }
						 else
						 {
						  alert("Could not connect to Login Server");
                         }
                        },
						
	 error: function( objAJAXRequest, strError )
		{
        if(objAJAXRequest.status==0 && strError !="timeout")
		{
		alert("Network Error.");
        }
		else
		alert("Error in establishing connection [ " +strError+" "+objAJAXRequest.status+" ]");
	    }
 
       });
   }
   
   
/* ********************** Child Browser ********************************* */

   function locationChanged(newurl) 
   {
        console.log("The JS got this url = " + newurl);
   }
    
    function closed() 
	{
        console.log("The JS got a close event");
		
		getAuthenticated();
    }
    
    function showPage(locbar,url) {
	    try
		{
        window.plugins.childBrowser.onLocationChange = locationChanged;
        window.plugins.childBrowser.onClose = closed;
        window.plugins.childBrowser.showWebPage(url, {
            showLocationBar: locbar
        });
		}
		catch(e)
		{
		location.href=url;
		}
    }
	
/* ******************************* Charts ***************************** */

function changeLogin()
{
    online = window.navigator.onLine;
   if(!online)
   {
   alert("No Network Connection !");
   return;
   }
var oldp=$("#old_p").val();
oldp=oldp.trim();
var newp=$("#new_p").val();
newp=newp.trim();
var newp2=$("#new_p2").val();
newp2=newp2.trim();

if(oldp.length==0)
{
alert("Old password is blank");
return;
}
if(newp.length==0)
{
alert("New password is blank");
return;
}
if(newp2.length==0)
{
alert("Confirm new password is blank");
return;
}
if(newp!=newp2)
{
alert("New passwords do not match");
return;
}
if(pass!=oldp)
{
alert("Old passwords do not match");
return;
}
if(newp.length<7)
{
alert("New password must contain 7 characters");
return;
}
$("#change_p_respo").html("Changing..");
url=DomainName+"/mobicrm/services/change_p.php";
postdata="user="+encodeURIComponent(user)+"&password="+encodeURIComponent(pass)+"&newp="+encodeURIComponent(newp);
$.ajax({
          url:url,
          dataType: 'jsonp',
          jsonp: 'jsoncallback',          
		  type: "POST",
		  data:postdata,
          success: function(json,status)
		                {
                         
						 $("#change_p_respo").html("Changing..");
						 
						 if(json.id!=0)
						  {
						  alert("Password Changed !"); 
						  $("#change_p_respo").html("Confirm Login..")
						  ClearLocalData();
						
						  }
						 else
						 {
						  alert("Coule not change the password. Try Again.");
                         }
                        },
						
	 error: function( objAJAXRequest, strError )
		{
        if(objAJAXRequest.status==0 && strError !="timeout")
		{
		alert("Network Error.");
        }
		else
		alert("Error in establishing connection [ " +strError+" "+objAJAXRequest.status+" ]");
	    }

 
       });
}

/* ************* 	Session **************** */

 function getSession()
   {
   online = window.navigator.onLine;

   if(!online)
   {
   alert("No Network Connection !");
   return;
   } 
  $.ajax({
          url: DomainName+"/mobicrm/services/session.php",
         
          type: "POST",
		  timeout:TimeOutValue,
		  data:"user="+user+"&password="+pass,
          success: function(json,status)
		                {
                         
						
                        },
						
	 error: function( objAJAXRequest, strError )
		{
        if(objAJAXRequest.status==0 && strError !="timeout")
		{
		alert("Network Error.");
        }
		else
		{
		alert("Network Error." +objAJAXRequest.status +" "+strError);
		
        }	   

	   }
 
       });
 }
 
 //Notes Section 
 
 function AddOppsNotes(name,desc,parent_id,parent_type,loaderdiv,successdiv,action)
{
  if(action=="delete")
  {
  var didConfirm = confirm("You are going to delete this record. Are you sure?");
  if (didConfirm == false) 
  {
  return;
  }
  }
  
  var subject=$("#"+name).val();
  var description=$("#"+desc).val();
  var id=$("#"+parent_id).val();
  var edit_id=0;
  
  if(action=="edit" || action=="delete")
  edit_id=$("#edit_notes_id").val();
  

  if(!checkBlankValue(subject))
  {
  alert("Invalid Subject");
  return;
  }
  if(!checkBlankValue(description))
  {
  alert("Invalid Description ");
  return;
  }
 var url=DomainName+"/mobicrm/services/add_notes.php"; 
 var postdata="user="+encodeURIComponent(user)+"&password="+encodeURIComponent(pass)+"&name="+encodeURIComponent(subject)+"&description="+encodeURIComponent(description)+"&parent_id="+encodeURIComponent(id)+"&parent_type=leads&action="+action+"&notes_id="+edit_id;


 online = window.navigator.onLine;
 if(online)
{    
    $("#"+loaderdiv).html("<img src='load.gif' /> Connecting Server.."); 
	 $.ajax({
          url: url,
          dataType: 'jsonp',
		  jsonp: 'jsoncallback',
          timeout:TimeOutValue,
		  data:postdata,
          success: function(json, status)
          {
           
              if(json.id!=0)
			  {
			    if(parent_type=="leads")
				{
				$("#"+loaderdiv).html('<p><a href="#notesopps"  data-role=\'button\' onclick="getNotes(\'leads\',\'lead_detail_id\',\'notesdetails\');" data-role="button" >View Notes</a></p>');  
		        $("#"+loaderdiv).trigger("create");
				}
			  }
			  else
			  $("#"+loaderdiv).html("Notes Could Not Added");  
              },
             error: function( objAJAXRequest, strError )
		    {
           
			 alert("Error "+strError);
	        }
	  });
}
else
{
alert("No Network");
}
 }

// Set Meeting 

//Meetings

/* ********************* Meeting Section ******************* */
function setAttendeeMail()
{
var email=$("#contact_detail_email").val();
var cname=$("#contact_detail_name").val();
$("#meet_user_email").val(email);
$("#meet_contact").html("Schedule Meeting for "+cname);
}
function SetMeeting(loaderdiv,action,meeting_id)
{

if(action=="delete")
  {
  var didConfirm = confirm("You are going to delete this record. Are you sure?");
  if (didConfirm == false) 
  {
  return;
  }
  }

var subject=$("#meet_subject").val();
var desc=$("#meet_desc").val();
var location=$("#meet_location").val();
var date=$("#date").val();
var time=$("#time").val();
var date2=$("#date2").val();
var time2=$("#time2").val();
var id=$("#contact_detail_id").val();
var cname=$("#contact_detail_name").val();
var email=$("#meet_user_email").val();
var from_email=$("#meet_my_email").val();


var date=date+" "+time+":00";
var date2=date2+" "+time2+":00";
var meet_id="";
if(!checkBlankValue(email) && action!="delete")
  {
  alert("Invalid Email of Attendee * Please enter only one email id");
  return;
  }
if(!checkBlankValue(subject) && action!="delete")
  {
  alert("Invalid Subject");
  return;
  }

if(action!="delete")
{
if(!checkBlankValue(date) || !checkBlankValue(time) || !checkBlankValue(date2) || !checkBlankValue(time2) )
  {
  alert("Invalid Dates");
  return;
  }
}

  
  if(!checkBlankValue(from_email) && action!="delete")
  {
  alert("Enter your Email");
  return;
  }
  
  if(!checkBlankValue(desc) && action!="delete")
  {
  alert("Invalid Details ");
  return;
  }
if(action=="delete")
meet_id=meeting_id;

var url=DomainName+"/mobicrm/services/add_meeting.php"; 
var postdata="user="+encodeURIComponent(user)+"&password="+encodeURIComponent(pass)+"&cname="+encodeURIComponent(cname)+"&email="+encodeURIComponent(email)+"&name="+encodeURIComponent(subject)+"&description="+encodeURIComponent(desc)+"&parent_id="+encodeURIComponent(id)+"&parent_type=Contacts&action="+action+"&start_date="+date+"&end_date="+date2+"&meet_id="+meet_id+"&location="+encodeURIComponent(location)+"&from_email="+encodeURIComponent(from_email);
online = window.navigator.onLine;
 if(online)
{    
    $("#"+loaderdiv).html("<img src='load.gif' /> Connecting Server.."); 
	 $.ajax({
          url: url,
          dataType: 'jsonp',
		  jsonp: 'jsoncallback',
          timeout:TimeOutValue,
		  data:postdata,
          success: function(json, status)
          {
           
              if(json.id!=0)
			  {
			    if(action=="delete")
				{
				 $("#"+loaderdiv).html("");
				 $("#" + meet_id).remove();
				 alert("Deleted");
				}
				else
				{
				$("#"+loaderdiv).html('<p><a href="#meetinglist"  data-role=\'button\' onclick="getMeetings(\'Recent\');" data-role="button" >View Meetings</a></p>');  
		        $("#"+loaderdiv).trigger("create");
				}
				
			  }
			  else
			  $("#"+loaderdiv).html("Meeting Could Not Added");  
              },
             error: function( objAJAXRequest, strError )
		    {
           
			 alert("Error "+strError);
	        }
	  });
}
else
{
alert("No Network");
}
}	
/*************** Assign Leads *********************/
function AssignUsersLead(uid)
{
var leadid=$("#lead_detail_id").val();
var uid=uid;
var loaderdiv="assign_progress";
var url=DomainName+"/mobicrm/services/assign.php"; 
var postdata="user="+encodeURIComponent(user)+"&password="+encodeURIComponent(pass)+"&uid="+uid+"&id="+leadid+"&module=Leads";
$("#"+loaderdiv).html("<img src='load.gif' /> Assigning..");
online = window.navigator.onLine;
 if(online)
{    
    $("#"+loaderdiv).html("<img src='load.gif' /> Assigning.."); 
	 $.ajax({
          url: url,
          dataType: 'jsonp',
		  jsonp: 'jsoncallback',
          timeout:TimeOutValue,
		  data:postdata,
          success: function(json, status)
          {
           
              if(json.id!=0)
			  {
			    
				 $("#"+loaderdiv).html("<p style='white-space:normal;'>Assigned <small>Your opportunity list will be refreshed.</small></p>");
				 setLead(1,'All','date');
				
			  }
			  else
			  $("#"+loaderdiv).html("Could not assign");  
              },
             error: function( objAJAXRequest, strError )
		    {
           
			 alert("Error "+strError);
	        }
	  });
}
else
{
alert("No Network");
}

} 

function resetLogin()
{
var online = window.navigator.onLine;
var loaderdiv="reset_res";
var email=$("#uemail").val();
var postdata="email="+encodeURIComponent(email);
var url=DomainName+"/mobicrm/services/reset.php";

if(!checkBlankValue(email))
  {
  alert("Enter your Email");
  return;
  }
 if(online)
{    
    $("#"+loaderdiv).html("<img src='load.gif' /> Connecting Server.."); 
	 $.ajax({
          url: url,
          dataType: 'jsonp',
		  jsonp: 'jsoncallback',
          timeout:TimeOutValue,
		  data:postdata,
          success: function(json, status)
          {
           
              if(json.id==1)
			  {
			     $("#"+loaderdiv).html(json.msg);	
			  }
			 else if(json.id==0)
			 {
			  $("#"+loaderdiv).html(json.msg);	
			 }
		   else
			  $("#"+loaderdiv).html("Try again");  
              },
             error: function( objAJAXRequest, strError )
		    {
           
			 alert("Error "+strError);
	        }
	  });
}
else
{
alert("No Network");
}



}


/******************** Lead Methods **********************************/
var SearchResultArray=Array();
var ContactsArray=Array();
var AccountsArray=Array();
var OppsArray=Array();
var NumRecords=25;
var syncCount=0;
var selectAccountSource="";
var selectContactSource="";

function LeadSearch()
		{
		var q=$("#leadq").val();
		if(q.length==0 || q==null)
		{
		alert("Search box empty");
		return;
		}
		else
		{
		var where="fname like '%"+q+"%' OR lname like '%"+q+"%' OR account like '%"+q+"%' OR description like '%"+q+"%'";
		
		listUISearch(where,"datalist");
		$.mobile.changePage("#showleads");
		}
		
		//searchLead(q,option);
		}
//Search Lead From DB

function setLead(offset,leadtag,order)
{
page=offset;
OnlineMode=window.localStorage.getItem("OnlineMode");
online = window.navigator.onLine;

if(online && OnlineMode=="true")
{    
    $("#datalist").html("<img src='load.gif' /> Connecting Server.."); 
	  
	  $.ajax({
          url: DomainName+"/mobicrm/services/leads.php",
          dataType: 'jsonp',
          jsonp: 'jsoncallback',
          timeout:TimeOutValue,
          data:{user:user,password:pass},
          success: function(json, status)
          {
            
			ExecuteQuery(db,"drop table "+user+"_leads") ;
	        CreateTableLead(db);
              
			 var k=0;
			 var jsonO=json.result_count;
			
			 if(jsonO>0)
			 {
			 
			 $.each(json.entry_list, function(i,item)
		      {
           
	       
		   var NameValueList=item.name_value_list;
           var Name=NameValueList.name;
		   var Id=NameValueList.id;
		   var Email=NameValueList.email1;
		   var Title=NameValueList.title;
		   
		  
 
		   var Mobile=NameValueList.phone_mobile;
		   
		   var Status=NameValueList.status;
		   var Description=NameValueList.description;
	       var FirstName=NameValueList.first_name;
		   var LastName=NameValueList.last_name;
		   
		   var Source=NameValueList.lead_source;
	       var Country=NameValueList.primary_address_country;
		   var City=NameValueList.primary_address_city;
		   var Pin=NameValueList.primary_address_postalcode;
		   var State=NameValueList.primary_address_state;
		   var Street=NameValueList.primary_address_street;
		   var DnC=NameValueList.do_not_call;
		   var AccountName=NameValueList.account_name;
		   var Amount=NameValueList.opportunity_amount;
		   var Lat=NameValueList.lat_c;
		   var Lng=NameValueList.lng_c;
		   var distance="";
	       var latV=Lat.value;
		   var lngV=Lng.value;
		   var distance;
		   var mylat="",mylang="";
		   var query="";
			
			if(latV.length!=0)
		   {
		    mylat=getLat();
		    mylang=getLng();
		    if(mylat.length!=0 && mylang.length !=0)
		    distance=Distance(latV,lngV,mylat,mylang);
		    query="INSERT into "+user+"_leads (uid,fname,lname,email,title,mobile,status,description,lead_source,do_not_call,street,city,state,pin,country,amount,account,lat,lng,distance,sync) VALUES ('"+Id.value+"','"+FirstName.value+"','"+LastName.value+"','"+Email.value+"','"+Title.value+"','"+Mobile.value+"','"+Status.value+"','"+Description.value+"','"+Source.value+"','"+DnC.value+"','"+Street.value+"','"+City.value+"','"+State.value+"','"+Pin.value+"','"+Country.value+"','"+Amount.value+"','"+AccountName.value+"','"+Lat.value+"','"+Lng.value+"','"+distance+"',1)";
	        }
		   else
	       query="INSERT into "+user+"_leads (uid,fname,lname,email,title,mobile,status,description,lead_source,do_not_call,street,city,state,pin,country,amount,account,lat,lng,distance,sync) VALUES ('"+Id.value+"','"+FirstName.value+"','"+LastName.value+"','"+Email.value+"','"+Title.value+"','"+Mobile.value+"','"+Status.value+"','"+Description.value+"','"+Source.value+"','"+DnC.value+"','"+Street.value+"','"+City.value+"','"+State.value+"','"+Pin.value+"','"+Country.value+"','"+Amount.value+"','"+AccountName.value+"','"+Lat.value+"','"+Lng.value+"','"+distance+"',1)";
	     
		 
		  
		  k++;
		  
		  insertRecord(db,query,k,jsonO,"datalist","lead_sync");
		  
		  
		});
		
		
		listUI("datalist",leadtag,order,1);
		}
		else
		{
		//For Synchronization Logic only
		$("#lead_sync").html("100% "); 
		syncCount++;
		if(syncCount==3)
		{
		$("#sync_done").html("<a href='#main_page' data-role='button'>Proceed</a>");
		$("#sync_done").trigger("create");
		}
		
		$("#datalist").html("<p class='error'>No records found </p> <a href='#quickleads' data-role='button'><span class='myicon'>+</span> Add Opportunity</a>");
		$("#datalist").trigger("create");
		
		
		}
	    
         },
 
       
	   	error: function( objAJAXRequest, strError )
		{
        if(objAJAXRequest.status==0 && strError !="timeout")
		{
		
		$("#datalist").html("Operation Cancelled"); 
		location.href="home.html";
        }
		else
		
		$( "#datalist" ).text("Error in establishing connection [ " +strError+" "+objAJAXRequest.status+" ]");
	    }
	

	   
	   
	  
		
	   });
}
else
{
$("#lead_sync").html("No Network");
syncCount++;
if(syncCount==3)
{
$("#sync_done").html("<a href='#main_page' data-role='button'>Proceed</a>");
$("#sync_done").trigger("create");
}
//listUI("datalist",leadtag,order,1);
}
}


//Leads Redering from DB
function listUI(div,tag,order,page)
	{
      
	  var records=0;
	  var html="";
	  var limit="0,"+NumRecords;
	  var where="";
	  var sort="";
	  var TableSize=0;
	  var pages=0;
	  var pagination="";
	 
	  SearchResultArray=Array();
	 
	 if(tag=="All")
	 where="";
	else
     where="where status='"+tag+"'";
	 
	  
     if(order=="date")
     sort="order by sync asc , id asc";
     else
     sort="order by "+order+" asc" ;

    /***************** For Geo Search***************/
	
	
	  if(page==1)
	  {
	  limit="0,"+NumRecords;
	  leadpage=1;
	  }
	  else
	  {
       var x=NumRecords*(page-1);
	   limit=x+","+NumRecords;
	  }
     
 db.transaction(function(tx) 
 	  {
   tx.executeSql("SELECT * FROM "+user+"_leads "+where+"  "+sort, [], function (tx, results) 
   {
   $("#"+div).text("Fetching local records.."); 
   TableSize=results.rows.length;
   if(TableSize>0)
   {
    /* *********** Fetching Records ****************** */
     pages=PagesCount(TableSize,NumRecords);
	
	 
	 db.transaction(function (tx) 
     {
	  tx.executeSql("SELECT * FROM "+user+"_leads "+where+"  "+sort+" limit "+limit, [], function (tx, results) 
      {
       var len = results.rows.length, i;   
        for (i = 0; i <= len; i++)
          {
           var arr=Array();
	
	         if(i<len)
	        {     
	       arr["firstName"]=results.rows.item(i).fname;
		   arr["lastName"]=results.rows.item(i).lname;
		   arr["Id"]=results.rows.item(i).uid;
		   arr["Email"]=results.rows.item(i).email;
		   arr["Title"]=results.rows.item(i).title;
		   arr["PhoneHome"]=results.rows.item(i).mobile;
 
		   arr["Mobile"]=results.rows.item(i).mobile;
		   
		   arr["Status"]=results.rows.item(i).status;
		   arr["Description"]=results.rows.item(i).description;
	       
		   
		   arr["Source"]=results.rows.item(i).lead_source;
	       arr["Country"]=results.rows.item(i).country;
		   arr["State"]=results.rows.item(i).state;
		   arr["Pin"]=results.rows.item(i).pin;
		   arr["City"]=results.rows.item(i).city;
		   arr["Street"]=results.rows.item(i).street;
		   arr["DnC"]=results.rows.item(i).do_not_call;
		   arr["AccountName"]=results.rows.item(i).account;
		   arr["Amount"]=results.rows.item(i).amount;
	       arr["Lat"]=results.rows.item(i).lat;
	       arr["Lng"]=results.rows.item(i).lng;
		   arr["Distance"]=results.rows.item(i).distance;
	
	       SearchResultArray[arr["Id"]]=arr;
		   var distance="";
		   
		   
		   if(arr["Distance"].length!=0)
		   distance=arr["City"]+" , "+arr["Country"]+" ("+arr["Distance"]+" Miles)"
		   else
		   distance=arr["City"]+" "+arr["Country"];
	      
		  var name=results.rows.item(i).fname+" "+results.rows.item(i).lname;
	      var address=results.rows.item(i).city+" "+results.rows.item(i).country+" "+results.rows.item(i).street;
          var filterText=name+" "+results.rows.item(i).title+" "+results.rows.item(i).status+" "+results.rows.item(i).description+" "+address;
	      html+="<li data-filtertext='"+filterText+"'><a href='#detail_lead' data-inline=\"true\" onclick=\"changePageLead('"+arr['Id']+"');\" ><p><strong>"+results.rows.item(i).description+"</strong></p><p>"+name+"</p><p>"+results.rows.item(i).title+"</p><p class=\"ui-li-aside\" id='"+results.rows.item(i).uid+"'>"+results.rows.item(i).status+"</p><p><strong>"+distance+"</strong></p> </a><a href=\"#menupage\" data-rel=\"popup\" onclick=\"setLeadId('"+results.rows.item(i).uid+"');\">Open dialog</a></li>";
	
	      }
	    else
	      {
         
		  if(leadpage<pages && leadpage==1)
	      pagination="<div data-role=\"navbar\" data-theme='d'><ul><li></li><li><a href='#datalist' onclick=\"RecordSet(1,'"+tag+"','"+order+"');\" data-icon='arrow-r'>Next</a></li></ul></div>";
		  
		  else if(leadpage<pages && leadpage > 1)
		  pagination="<div data-role=\"navbar\" data-theme='d'><ul><li><a href='#datalist' onclick=\"RecordSet(0,'"+tag+"','"+order+"');\" data-icon='arrow-l'>Prev</a></li><li><a href='#datalist' onclick=\"RecordSet(1,'"+tag+"','"+order+"');\" data-icon='arrow-r'>Next</a></li></ul></div>";
		  
		  else if(leadpage>=pages && leadpage > 1)
		  pagination="<div data-role=\"navbar\" data-theme='d'><ul><li><a href='#datalist' onclick=\"RecordSet(0,'"+tag+"','"+order+"');\" data-icon='arrow-l'>Prev</a></li><li></li></ul></div>";
		  
		  if(len==0)
	      {
	      html+="<li><p class='error'><a href='#' data-role='button' data-icon='error'> No data to display</a></p></li>";
          pagination="<div data-role=\"navbar\" data-theme='d'><ul><li><a href='#' onclick=\"RecordSet(0,'"+tag+"','"+order+"');\" data-icon='arrow-l'>Prev</a></li><li></li></ul></div>";
		  }
	    
		 html="<ul  data-role=\"listview\" data-filter=\"true\" id=\"leadlist\"data-split-icon=\"gear\" data-split-theme=\"a\" ><li data-role=\"list-divider\">"+tag+":"+TableSize+" Page:"+leadpage+"</li>"+html;
	     
		 html+="<li>"+pagination+"</li></ul>";
         
		 $("#"+div).html("");
	     $("#"+div).append(html);
	     $("#"+div).trigger('refresh');
	     $("#"+div).trigger('create');
		 
		 $("#leadlist").prev().on("keyup",function(){
         countListItems("leadlist","leadcounts",len);
    })
	
	 }
   
   }
 },null );
},txFail,txWin);

}
else
{
$("#"+div).html("No Opportunity. <a data-role=\"button\" href='#quickleads' > <span class=\"myicon\">+</span> Add Opportunity</a>");
$("#"+div).trigger("create");
} 
/* *********** Fetching Records End****************** */

});
 },txFail,txWin);

}


function listUISearch(where,div)
	{
     var html="";
	 $("#"+div).html("Fetching local records..");
	 where="where "+where;
	 
	 db.transaction(function (tx) 
     {
	 
	  tx.executeSql("SELECT * FROM "+user+"_leads "+where, [], function (tx, results) 
      {
      
	   var len = results.rows.length, i;  
       	 if(len>0) 
        {		 
        for (i = 0; i <= len; i++)
          {
           var arr=Array();
	
	         if(i<len)
	        {     
	       arr["firstName"]=results.rows.item(i).fname;
		   arr["lastName"]=results.rows.item(i).lname;
		   arr["Id"]=results.rows.item(i).uid;
		   arr["Email"]=results.rows.item(i).email;
		   arr["Title"]=results.rows.item(i).title;
		   arr["PhoneHome"]=results.rows.item(i).mobile;
 
		   arr["Mobile"]=results.rows.item(i).mobile;
		   
		   arr["Status"]=results.rows.item(i).status;
		   arr["Description"]=results.rows.item(i).description;
	       
		   
		   arr["Source"]=results.rows.item(i).lead_source;
	       arr["Country"]=results.rows.item(i).country;
		   arr["City"]=results.rows.item(i).city;
		   arr["State"]=results.rows.item(i).state;
		   arr["Pin"]=results.rows.item(i).pin;
		   arr["Street"]=results.rows.item(i).street;
		   arr["DnC"]=results.rows.item(i).do_not_call;
		   arr["AccountName"]=results.rows.item(i).account;
		   arr["Amount"]=results.rows.item(i).amount;
	       arr["Lat"]=results.rows.item(i).lat;
	       arr["Lng"]=results.rows.item(i).lng;
		   arr["Distance"]=results.rows.item(i).distance;
	
	       SearchResultArray[arr["Id"]]=arr;
		   var distance="";
		   
		   
		   if(arr["Distance"].length!=0)
		   distance=arr["City"]+" , "+arr["Country"]+" ("+arr["Distance"]+" Miles)"
		   else
		   distance=arr["City"]+" "+arr["Country"];
	      
		  var name=results.rows.item(i).fname+" "+results.rows.item(i).lname;
	      var address=results.rows.item(i).city+" "+results.rows.item(i).country+" "+results.rows.item(i).street;
          var filterText=name+" "+results.rows.item(i).title+" "+results.rows.item(i).status+" "+results.rows.item(i).description+" "+address;
	      html+="<li data-filtertext='"+filterText+"'><a href='#detail_lead' data-inline=\"true\" onclick=\"changePageLead('"+arr['Id']+"');\" ><p><strong>"+results.rows.item(i).description+"</strong></p><p>"+name+"</p><p>"+results.rows.item(i).title+"</p><p class=\"ui-li-aside\" id='"+results.rows.item(i).uid+"'>"+results.rows.item(i).status+"</p><p><strong>"+distance+"</strong></p> </a><a href=\"#menupage\" data-rel=\"popup\" onclick=\"setLeadId('"+results.rows.item(i).uid+"');\">Open dialog</a></li>";
	
	      }
	 else
	      {
         html="<ul  data-role=\"listview\" data-filter=\"true\" id=\"leadlist\"data-split-icon=\"gear\" data-split-theme=\"a\" ><li data-role=\"list-divider\">"+len+" Leads</li>"+html;
	     html+="</ul>";
         $("#"+div).html("");
	     $("#"+div).html(html);
	     $("#"+div).trigger('refresh');
	     $("#"+div).trigger('create');
		 }
   
   }
   }
   else
   {
   $("#"+div).html("No record found");
   }
 },null );
},txFail,txWin);

}

function countListItems(listdiv,displaydiv,records){
    var elements="";
	elements = $("#"+listdiv+" li:visible").length-1;
    
	if(records<elements)
	elements=records;
	
	$("#"+displaydiv).html(elements);
}
 
/* Pagination */
function RecordSet(flag,tag,order)
    {
  if(flag==0)
  leadpage--;
  else
  leadpage++;
  
 
  listUI("datalist",tag,order,leadpage);
   }
   
   function PagesCount(total,numrecords)
   {
   if(numrecords>0)
   return  Math.ceil(total/numrecords);
   else
   return 0;
   
   }

function Distance(lat1, lon1, lat2, lon2) {
    //Radius of the earth in:  1.609344 miles,  6371 km  | var R = (6371 / 1.609344);
    var R = 3958.7558657440545; // Radius of earth in Miles 
    var dLat = toRad(lat2-lat1);
    var dLon = toRad(lon2-lon1); 
    var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
            Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * 
            Math.sin(dLon/2) * Math.sin(dLon/2); 
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
    var d = R * c;
	d=Math.round(d);
    return d;
}

function toRad(Value) {
    /** Converts numeric degrees to radians */
    return Value * Math.PI / 180;
}


   
   
   
/************************* Contact Methods *******************************************************************************/

function setContact(offset)
{
page=offset;
ContactsArray=Array();
OnlineMode=window.localStorage.getItem("OnlineMode");
online = window.navigator.onLine;
if(online && OnlineMode=="true")
{
	$("#datalist_contact").html("<img src='load.gif'></img> Connecting Server.."); 
	
	
	 $.ajax({
          url: DomainName+"/mobicrm/services/contacts.php",
          dataType: 'jsonp',
          jsonp: 'jsoncallback',
          timeout:TimeOutValue,
          data:{user:user,password:pass},
          success: function(json, status)
          {
             ExecuteQuery(db,"drop table "+user+"_contacts") ;
	         CreateTableContact(db);
			 var k=0;
			 var jsonO=json.result_count;
			 
			 if(jsonO>0)
			 {
		    $.each(json.entry_list, function(i,item)
		    {
           var NameValueList=item.name_value_list;
		   var Name=NameValueList.name;
           var FName=NameValueList.first_name;
		   var LName=NameValueList.last_name;
		   var Id=NameValueList.id;
		   var Email=NameValueList.email1;
		   var Title=NameValueList.title;
		   var PhoneHome=NameValueList.phone_home;
           //Address
           var Street=NameValueList.primary_address_street;
		   var City=NameValueList.primary_address_city;
		   var Country=NameValueList.primary_address_country;
		   var State=NameValueList.primary_address_state;
		   var Pin=NameValueList.primary_address_postalcode;	       
		   
          var query="INSERT into "+user+"_contacts (uid,first_name,last_name,name,email,phone,title,street,city,state,country,pin,sync) VALUES ('"+Id.value+"','"+FName.value+"','"+LName.value+"','"+Name.value+"','"+Email.value+"','"+PhoneHome.value+"','"+Title.value+"','"+Street.value+"','"+City.value+"','"+State.value+"','"+Country.value+"','"+Pin.value+"',1)";
	      k++;
		  insertRecord(db,query,k,jsonO,"datalist_contact","con_sync");
		  });
	      
		  
		
		  listUIContact("datalist_contact","All",1,"date");
		  } 
          else
		{
		//Synchronization Logic
		$("#con_sync").html("100% "); 
		syncCount++;
		if(syncCount==3)
		{
		$("#sync_done").html("<a href='#main_page' data-role='button'>Proceed</a>");
		$("#sync_done").trigger("create");
		}
		
		
		$("#datalist_contact").html("<p class='error'>No contact found </p> <a href='#addcontacts' data-role='button'><span class='myicon'>+</span> Add Contact</a>");
		$("#datalist_contact").trigger("create");
		
		}		  
		  
	     },
 
       error: function( objAJAXRequest, strError )
		{
        if(objAJAXRequest.status==0 && strError !="timeout")
		{
		
		$("#datalist_contact").html("Operation Cancelled"); 
		location.href="home.html";
        }
		else
		$( "#datalist_contact" ).text("Error in establishing connection [ " +strError+" "+objAJAXRequest.status+" ]");
	    }
	
 
 
});
}
else
{
//Sync Code
$("#con_sync").html("No Network");
syncCount++;
if(syncCount==3)
{
$("#sync_done").html("<a href='#main_page' data-role='button'>Proceed</a>");
$("#sync_done").trigger("create");
}

//listUIContact("datalist_contact","All",1,"date");
}
}
 
 
 function setContactSource(source)
 {
  selectContactSource=source;
 }
 
function listUIContact(div,tag,page,order)
	{
      
	  var max=NumRecords;
	  var records=0;
	  var html="";
	  var limit="0,"+max;
	  var pagination="";
	
	  if(page==1)
	  {
	  limit="0,"+max;
	  contactpage=1;
	  }
	  else
	  {
       var x=max*(page-1);
	   limit=x+","+max;
	  }
     
	 
     
	 if(order=="date")
     sort="order by sync asc , id asc";
     else
     sort="order by "+order+" asc" ;
	 
	$("#"+div).html("Fetching local records.."); 
	
	
	
    db.transaction(function(tx) 
 	  {
     tx.executeSql("SELECT * FROM "+user+"_contacts "+sort, [], function (tx, results) 
      {
      $("#"+div).text("Fetching local records.."); 
      TableSize=results.rows.length;
      if(TableSize>0)
      {	
  
/* ******************* Local DB Fetching ********************/
   pages=PagesCount(TableSize,NumRecords);
   db.transaction(function (tx) 
   {
     tx.executeSql("SELECT * FROM "+user+"_contacts "+sort+" limit "+limit, [], function (tx, results) 
     {
      var len = results.rows.length, i;
   
	 for (i = 0; i <= len; i++)
      {
      var arr=Array();
	  if(i<len)
	     {
           arr["Name"]=results.rows.item(i).name;
		   arr["Id"]=results.rows.item(i).uid;
		   arr["Email"]=results.rows.item(i).email;
		   arr["Title"]=results.rows.item(i).title;
		   arr["Phone"]=results.rows.item(i).phone;
		   arr["Street"]=results.rows.item(i).street;
		   arr["City"]=results.rows.item(i).city;
		   arr["State"]=results.rows.item(i).state;
		   arr["Country"]=results.rows.item(i).country;
		   arr["Pin"]=results.rows.item(i).pin;
 
           ContactsArray[arr["Id"]]=arr;
	       var filterText=results.rows.item(i).name+" "+results.rows.item(i).title+" "+results.rows.item(i).email;
           html+="<li data-filtertext='"+filterText+"'><a href='#detail_contact' data-inline=\"true\" onclick=\"changePage('"+arr["Id"]+"');ContactHistory();\" ><h1>"+results.rows.item(i).name+"</h1><p><strong>"+results.rows.item(i).title+"</strong> </p><p>"+results.rows.item(i).email+"</p></a></li>";
	     
		 }
	  else
	    {
          if(contactpage<pages && contactpage==1)
	      pagination="<div data-role=\"navbar\" data-theme='d'><ul><li></li><li><a href='#' onclick=\"RecordSetContact(1,'"+order+"');\" data-icon='arrow-r'>Next</a></li></ul></div>";
		  
		  else if(contactpage<pages && contactpage > 1)
		  pagination="<div data-role=\"navbar\" data-theme='d'><ul><li><a href='#' onclick=\"RecordSetContact(0,'"+order+"');\" data-icon='arrow-l'>Prev</a></li><li><a href='#' onclick=\"RecordSetContact(1,'"+order+"');\" data-icon='arrow-r'>Next</a></li></ul></div>";
		  
		  else if(contactpage>=pages && contactpage > 1)
		  pagination="<div data-role=\"navbar\" data-theme='d'><ul><li><a href='#' onclick=\"RecordSetContact(0,'"+order+"');\" data-icon='arrow-l'>Prev</a></li><li></li></ul></div>";
		  
		  if(len==0)
	      {
	      html+="<li><p class='error'>No Records found</p></li>";
          pagination="<div data-role=\"navbar\" data-theme='d'><ul><li><a href='#' onclick=\"RecordSetContact(0,'"+order+"');\" data-icon='arrow-l'>Prev</a></li><li></li></ul></div>";
		  }
      
	  html="<ul  data-role=\"listview\" data-filter=\"true\" id=\"contactlist\"data-split-icon=\"gear\" data-split-theme=\"a\"><li data-role=\"list-divider\">All:"+TableSize+" Page:"+contactpage+"</li>"+html;
	  html+="<li>"+pagination+"</li></ul>";
     $("#"+div).html("");
	 $("#"+div).append(html);
	 $("#"+div).trigger('refresh');
	 $("#"+div).trigger('create');
	 
	 $("#contactlist").prev().on("keyup",function(){
      countListItems("contactlist","contactcounts",len);
    })
	 
	 }
   
   }
 }, null);
});
}
else
{
$("#"+div).html("No Contact. <a data-role=\"button\" href='#addcontacts' ><span class=\"myicon\">+</span> Add Contact</a>");
$("#"+div).trigger("create");
} 
/* *********** Fetching Records End****************** */

});
},txFail,txWin);
}


/* Pagination */
function RecordSetContact(flag,order)
    {
  if(flag==0)
  contactpage--;
  else
  contactpage++;
  
 
  listUIContact("datalist_contact","All",contactpage,order);
   }
   
function ContactSearch()
		{
		var q=$("#leadq").val();
		if(q.length==0 || q==null)
		{
		alert("Search box empty");
		return;
		}
		else
		{
		var where="first_name like '%"+q+"%' OR last_name like '%"+q+"%'";
		
		listUIContactSearch(where,"datalist_contact");
		$.mobile.changePage("#showcontacts");
		}
		} 
 
 function listUIContactSearch(where,div)
	{
     var where="where "+where;
	 var html="";
	 $("#"+div).text("Fetching local records..");
 
     db.transaction(function (tx) 
   {
     tx.executeSql("SELECT * FROM "+user+"_contacts"+" "+where , [], function (tx, results) 
     {
      
	  var len = results.rows.length, i;
     if(len==0)
	 {
	 $("#"+div).html("No record found");
	 return;
	 }
	 for (i = 0; i <= len; i++)
      {
      var arr=Array();
	  if(i<len)
	     {
           
	
		   arr["Name"]=results.rows.item(i).name;
		   arr["Id"]=results.rows.item(i).uid;
		   arr["Email"]=results.rows.item(i).email;
		   arr["Title"]=results.rows.item(i).title;
		   arr["Phone"]=results.rows.item(i).phone;
		   arr["Street"]=results.rows.item(i).street;
		   arr["City"]=results.rows.item(i).city;
		   arr["State"]=results.rows.item(i).state;
		   arr["Country"]=results.rows.item(i).country;
		   arr["Pin"]=results.rows.item(i).pin;
 
           ContactsArray[arr["Id"]]=arr;
	       var filterText=results.rows.item(i).name+" "+results.rows.item(i).title+" "+results.rows.item(i).email;
           html+="<li data-filtertext='"+filterText+"'><a href='#detail_contact' data-inline=\"true\" onclick=\"changePage('"+arr["Id"]+"');\" ><h1>"+results.rows.item(i).name+"</h1><p><strong>"+results.rows.item(i).title+"</strong> </p><p>"+results.rows.item(i).email+"</p></a></li>";
	     
		 }
	  else
	    {
         
      
	  html="<ul  data-role=\"listview\" data-filter=\"true\" id=\"contactlist\"data-split-icon=\"gear\" data-split-theme=\"a\"><li data-role=\"list-divider\">"+len+" Contacts</li>"+html;
	  html+="</ul>";
     $("#"+div).html("");
	 $("#"+div).append(html);
	 $("#"+div).trigger('refresh');
	 $("#"+div).trigger('create');
	 
	
	 }
   
   }
 }, txFail,txWin);
});
}  
/****************************** Account Methods **************************************/

function setAccount()
{

OnlineMode=window.localStorage.getItem("OnlineMode");
online = window.navigator.onLine;

if(online && OnlineMode=="true")
{
	 $("#datalist_account").html("<img src='load.gif'></img> Connecting Server.."); 
	 
	 $.ajax({
          url: DomainName+"/mobicrm/services/accounts.php",
          dataType: 'jsonp',
          jsonp: 'jsoncallback',
          timeout:TimeOutValue,
          data:{user:user,password:pass},
          success: function(json, status)
          {
             
			 ExecuteQuery(db,"drop table "+user+"_accounts") ;
	         CreateTableAccounts(db);
			 var jsonO=json.result_count;
			 var k=0;
			 if(jsonO>0)
			 {
			 $.each(json.entry_list, function(i,item)
		      {
           var NameValueList=item.name_value_list;
           var Name=NameValueList.name;
		   var Id=NameValueList.id;
		   var Accounts=NameValueList.account_type;
		   
		   var Industry=NameValueList.industry;
		   var Annual_Revenue=NameValueList.annual_revenue;
		   var Employees=NameValueList.employees;
		   
		   var City=NameValueList.billing_address_city;
		   var Street=NameValueList.billing_address_street;
		   var Country=NameValueList.billing_address_country;
		   var State=NameValueList.billing_address_state;
		   var Pin=NameValueList.billing_address_postalcode;
		   var Country=NameValueList.billing_address_country;
		   
		   var query="INSERT into "+user+"_accounts (uid,name,account_type,industry,employees,city,country,street,state,pin,revenue,sync) VALUES ('"+Id.value+"','"+Name.value+"','"+Accounts.value+"','"+Industry.value+"','"+Employees.value+"','"+City.value+"','"+Country.value+"','"+Street.value+"','"+State.value+"','"+Pin.value+"','"+Annual_Revenue.value+"',1)";
            k++;
		   insertRecord(db,query,k,jsonO,"datalist_account","acc_sync");
		  
		   });
		   
		   
		   listUIAccount("datalist_account","All",1,"date");
		 
		   }
		   else
		{
		//Synchronization Logic
		$("#acc_sync").html("100% "); 
		syncCount++;
		if(syncCount==3)
		{
		$("#sync_done").html("<a href='#main_page' data-role='button'>Proceed</a>");
		$("#sync_done").trigger("create");
		}
		
		$("#datalist_account").html("<p class='error'>No account found </p> <a href='#addaccounts' data-role='button'><span class='myicon'>+</span> Add Account</a>");
		$("#datalist_account").trigger("create");
		
		}	
		   
		   
	      
         },
 
        error: function( objAJAXRequest, strError )
		{
        if(objAJAXRequest.status==0 && strError !="timeout")
		{
		
		$("#datalist_account").html("Operation Cancelled"); 
		location.href="home.html";
        }
		else
		$( "#datalist_account" ).text("Error in establishing connection [ " +strError+" "+objAJAXRequest.status+" ]");
	    }
	   
 
 
});
}
else
{
$("#acc_sync").html("No Network");
syncCount++;
if(syncCount==3)
{
$("#sync_done").html("<a href='#main_page' data-role='button'>Proceed</a>");
$("#sync_done").trigger("create");
}
//listUIAccount("datalist_account","All",1,"date");
}
}
   
 function setAccountSource(source)
 {
 
 selectAccountSource=source;
 }
 
function listUIAccount(div,tag,page,order)
	{
      
	  var records=0;
	  var html="";
	  var limit="0,"+NumRecords;
	  var where="";
	  var sort="";
	  var TableSize=0;
	  var pages=0;
	  var pagination="";
	  AccountsArray=Array();
	  
	  if(page==1)
	  {
	  limit="0,"+NumRecords;
	  accountpage=1;
	  }
	  else
	  {
       var x=NumRecords*(page-1);
	   limit=x+","+NumRecords;
	  }
	  
	 if(tag=="All")
	 where="";
	 else
     where="where account_type='"+tag+"'";
	 
	  
     if(order=="date")
     sort="order by sync asc , id asc";
     else
     sort="order by "+order+" asc" ;
	 
 
   db.transaction(function(tx) 
 	  {
   tx.executeSql("SELECT * FROM "+user+"_accounts "+where+" "+sort, [], function (tx, results) 
   {
   $("#"+div).text("Fetching local records.."); 
   TableSize=results.rows.length;
   if(TableSize>0)
   {	 
 pages=PagesCount(TableSize,NumRecords);
/* **************** Local DB Fetch ***************** */
db.transaction(function (tx) 
   {
   tx.executeSql("SELECT * FROM "+user+"_accounts "+where+" "+sort+" limit "+limit, [], function (tx, results) 
   {
   var len = results.rows.length, i;
   var dataArray=new Array();
   for (i = 0; i <= len; i++)
   {
     var arr=Array();
	 if(i<len)
	 {
     arr["Name"]=results.rows.item(i).name;
	 arr["Type"]=results.rows.item(i).account_type;
	 arr["Id"]=results.rows.item(i).uid;
	 arr["Industry"]=results.rows.item(i).industry;
	 arr["Employees"]=results.rows.item(i).employees;
	 arr["City"]=results.rows.item(i).city;
	 arr["Country"]=results.rows.item(i).country;
	 arr["Street"]=results.rows.item(i).street;
	 arr["State"]=results.rows.item(i).state;
	 arr["Pin"]=results.rows.item(i).pin;
	 arr["Revenue"]=results.rows.item(i).revenue;
	
	 AccountsArray[arr["Id"]]=arr;
	 
	 var filterText=results.rows.item(i).name+" "+results.rows.item(i).account_type;
     
	 html+="<li data-filtertext='"+filterText+"'><a href='#accountsdetail' data-inline=\"true\" onclick=\"changeAccountPage('"+results.rows.item(i).uid+"');\"><h3>"+results.rows.item(i).name+"</h3><p>"+results.rows.item(i).account_type+"</p></a><input type='hidden' id='"+results.rows.item(i).uid+"_acc' value='"+results.rows.item(i).uid+"'></li>";
	}
	 else
	 {
      
	      if(accountpage<pages && accountpage==1)
	      pagination="<div data-role=\"navbar\" data-theme='d'><ul><li></li><li><a href='#' onclick=\"RecordSetAccount(1,'"+tag+"','"+order+"');\" data-icon='arrow-r'>Next</a></li></ul></div>";
		  
		  else if(accountpage<pages && accountpage > 1)
		  pagination="<div data-role=\"navbar\" data-theme='d'><ul><li><a href='#' onclick=\"RecordSetAccount(0,'"+tag+"','"+order+"');\" data-icon='arrow-l'>Prev</a></li><li><a href='#' onclick=\"RecordSetAccount(1,'"+tag+"','"+order+"');\" data-icon='arrow-r'>Next</a></li></ul></div>";
		  
		  else if(accountpage>=pages && accountpage > 1)
		  pagination="<div data-role=\"navbar\" data-theme='d'><ul><li><a href='#' onclick=\"RecordSetAccount(0,'"+tag+"','"+order+"');\" data-icon='arrow-l'>Prev</a></li><li></li></ul></div>";
		  
		  if(len==0)
	      {
	      html+="<li><p class='error'>No Records found</p></li>";
          pagination="<div data-role=\"navbar\" data-theme='d'><ul><li><a href='#' onclick=\"RecordSetAccount(0,'"+tag+"','"+order+"');\" data-icon='arrow-l'>Prev</a></li><li></li></ul></div>";
		  }
	 
	 html="<ul  data-role=\"listview\" data-filter=\"true\" id=\"accountlist\" data-split-icon=\"gear\" data-split-theme=\"a\" ><li data-role=\"list-divider\">"+tag+":"+TableSize+" Page:"+accountpage+"</li>"+html;
	 
	 html+="<li>"+pagination+"</li></ul>";
     $("#"+div).html("");
	 $("#"+div).append(html);
	 $("#"+div).trigger('refresh');
	 $("#"+div).trigger('create');
	 
	 $("#accountlist").prev().on("keyup",function(){
      countListItems("accountlist","accountcounts",len);
    })
	 }
   
   }
 }, null);
});
}
else
{
$("#"+div).html("No records. <a data-role=\"button\" href='#addaccounts'><span class=\"myicon\">+</span> Add Account</a>");
$("#"+div).trigger("create");
}
/* *********** Fetching Records End****************** */

});
 },txFail,txWin);

}

function AccountSearch()
		{
		var q=$("#leadq").val();
		if(q.length==0 || q==null)
		{
		alert("Search box empty");
		return;
		}
		else
		{
		var where="name like '%"+q+"%'";
		listUIAccountSearch(where,"datalist_account");
		$.mobile.changePage("#showaccounts");
		}
		} 


function listUIAccountSearch(where,div)
	{
   
	var html="";
	var where="where "+where;
	$("#"+div).html("Fetching local records..");
	
	
	db.transaction(function (tx) 
   {
   tx.executeSql("SELECT * FROM "+user+"_accounts "+where, [], function (tx, results) 
   {
   var len = results.rows.length, i;
   if(len==0)
   {
   $("#"+div).html("No record found.");
   return;
   }
   var dataArray=new Array();
   for (i = 0; i <= len; i++)
   {
     var arr=Array();
	 if(i<len)
	 {
     arr["Name"]=results.rows.item(i).name;
	 arr["Type"]=results.rows.item(i).account_type;
	 arr["Id"]=results.rows.item(i).uid;
	 arr["Industry"]=results.rows.item(i).industry;
	 arr["Employees"]=results.rows.item(i).employees;
	 arr["City"]=results.rows.item(i).city;
	 arr["Country"]=results.rows.item(i).country;
	  arr["State"]=results.rows.item(i).state;
	 arr["Pin"]=results.rows.item(i).pin;
	 arr["Street"]=results.rows.item(i).street;
	 arr["Revenue"]=results.rows.item(i).revenue;
	
	 AccountsArray[arr["Id"]]=arr;
	 
	var filterText=results.rows.item(i).name+" "+results.rows.item(i).account_type;
    html+="<li data-filtertext='"+filterText+"'><a href='#accountsdetail' data-inline=\"true\" onclick=\"changeAccountPage('"+results.rows.item(i).uid+"');\"><h3>"+results.rows.item(i).name+"</h3><p>"+results.rows.item(i).account_type+"</p></a><input type='hidden' id='"+results.rows.item(i).uid+"_acc' value='"+results.rows.item(i).uid+"'></li>";
	}
	 else
	 {
     html="<ul  data-role=\"listview\" data-filter=\"true\" id=\"accountlist\" data-split-icon=\"gear\" data-split-theme=\"a\" ><li data-role=\"list-divider\">"+len+" Accounts</li>"+html;
	 html+="</ul>";
     $("#"+div).html("");
	 $("#"+div).append(html);
	 $("#"+div).trigger('refresh');
	 $("#"+div).trigger('create');
	 
	}
   
   }
 }, null);
});

}

 function RecordSetAccount(flag,tag,order)
    {
  if(flag==0)
  accountpage--;
  else
  accountpage++;
  
 
  
  listUIAccount("datalist_account",tag,accountpage,order);
   }
 
 
 
 function syncAccounts()
{
OnlineMode=window.localStorage.getItem("OnlineMode");
online = window.navigator.onLine;
  if(!online)
   {
   alert("No Network Connection !");
   return;
   }

if(online && OnlineMode=="true")
{
$("#user_move").html("<img src='load.gif' /> Please wait...");
$("#acc_res").html("Synchronizing..");
var size="";
var i=0;
$.ajax({  url: DomainName+"/mobicrm/services/accounts.php",
          dataType: 'jsonp',
          jsonp: 'jsoncallback',
		  timeout:TimeOutValue,
          data:{user:user,password:pass},
          success: function(json, status)
          {
		   ExecuteQuery(db,"drop table "+user+"_accounts") ;
           CreateTableAccounts(db);
		   var jsonO=json.result_count;
		   var k=0;
		   if(jsonO!=0)
		   {
		   $.each(json.entry_list, function(i,item)
		      {
		   var NameValueList=item.name_value_list;
           var Name=NameValueList.name;
		   var Id=NameValueList.id;
		   var Accounts=NameValueList.account_type;
           
		   
		   var Industry=NameValueList.industry;
		   var Annual_Revenue=NameValueList.annual_revenue;
		   var Employees=NameValueList.employees;
		   
		   var City=NameValueList.billing_address_city;
		   var Street=NameValueList.billing_address_street;
		   var Country=NameValueList.billing_address_country;
		   
		   var query="INSERT into "+user+"_accounts (uid,name,account_type,industry,employees,city,country,street,revenue,sync) VALUES ('"+Id.value+"','"+Name.value+"','"+Accounts.value+"','"+Industry.value+"','"+Employees.value+"','"+City.value+"','"+Country.value+"','"+Street.value+"','"+Annual_Revenue.value+"',1)";
           k++;
		   insertRecordAccounts(db,query,k,jsonO,"user_move");
		   
		    });
			}
           else
              {
           $("#acc_res").html(" No Accounts");
		   $("#offline_move").html("");
		   $("#user_move").html("<a data-role='button' href='home.html' rel='external'>Proceed Now</a>");
		   $("#user_move").trigger('create');
          
              }		   
		  },
		error: function( objAJAXRequest, strError )
		{
        
		if(objAJAXRequest.status==0 && strError !="timeout")
		{
		
		$("#user_move").html("Operation Cancelled"); 
		location.href="index.html";
        }
		else
		$("#acc_res").html("Sync Fail");
		$( "#user_move" ).html("<a href='#' data-role='button' onclick='syncAccounts();'>Sync Again</a>");
	    $( "#user_move" ).trigger("create");
		}
});
}

}
 

function getAccountsList(div)
{
 {
db.transaction(function (tx) 
   {
   tx.executeSql("SELECT * FROM "+user+"_accounts ", [], function (tx, results) 
   {
   var len = results.rows.length, i;
   var html="<select  data-theme='d' data-native-menu=\"false\" data-mini=\"true\" id=\"acc_vals\">";
   for (i = 0; i < len; i++)
   {
     html+="<option value='"+results.rows.item(i).uid+"'>"+results.rows.item(i).name+"</option>";
   
   }
 html+="</select>";
 

     $("#"+div).html("");
	 $("#"+div).append(html);
	 $("#"+div).trigger('refresh');
	 $("#"+div).trigger('create');
 }, null);
});

	}
} 
 
 

 /********************************* End Of Account Methods ******************************************/
 
 
 /*********************** PhoneGap PhoneBook **************************/

 function onDeviceReady()
	{
	DeviceReady=true;
    }
	
	// PhoneGap is ready
    //
    function GetPhoneContacts() 
	 {
        // specify contact search criteria
        
		if(DeviceReady==true)
		{
		var options = new ContactFindOptions();
        options.filter="";          // empty search string returns all contacts
        options.multiple=true;      // return multiple results
        filter = ["displayName","phoneNumbers"];   // return contact.displayName field
       
       
        navigator.contacts.find(filter, conSuccess, conError, options);
		}
		else
		alert("Phone is not ready for contact info");
    }

    // onSuccess: Get a snapshot of the current con
    //
    function conSuccess(contacts) 
	{
       
		for (var i=0; i<contacts.length; i++) 
		{
            
		  if(contacts[i].phoneNumbers != null && contacts[i].displayName != null ) 
			{
            for (var j=0; j<contacts[i].phoneNumbers.length; j++) 
				{
               
				//$("#entries").append("<h3 id='contact_name_"+i+"'>"+contacts[i].displayName+"</h3><a tel:'"+contacts[i].phoneNumbers[j].value+"' data-role='button'><p id='contact_"+i+"'>"+contacts[i].phoneNumbers[j].value+"</p></a><a href='#addleads' onclick=\"changeContactToLead('contact_name_"+i+"','','contact_"+i+"','');\" data-role='button'>Convert To Sugar</a></p><HR>");
				 var query="INSERT into "+user+"_phonebook (name,mobile) VALUES ('"+contacts[i].displayName+"','"+contacts[i].phoneNumbers[j].value+"')";
	             insertRecord(db,query,i,contacts.length,"phonecontacts","phonecontacts");
                 
               }
			  
			}
           
       
		}
    
	   if(contacts.length !=null && contacts.length>0)
	   getContactsPhone("phonecontacts");
	   else
	   $("#phonecontacts").html("No Contacts Found");

	};

 function conError(error) {
    alert(error.message);
}
function getContactsPhone(div)
{
var pagination="";
 db.transaction(function (tx) 
     {
	  tx.executeSql("SELECT * FROM "+user+"_phonebook order by name asc", [], function (tx, results) 
      {
       var len = results.rows.length, i;   
        for (i = 0; i <= len; i++)
          {
       
	
	         if(i<len)
	        {     
	       var name=results.rows.item(i).name;
		   var mobile=results.rows.item(i).mobile;

		   //html+="<li data-filtertext='"+name+"'><a href='#'  data-inline=\"true\"><h3>"+name+"</h3><p><strong>"+mobile+"</strong></a></li>";
	       html+="<h3>"+name+"</h3><p><strong><a tel:'"+mobile+"'>"+mobile+"</a></strong><p><a href='#addleads' onclick=\"PhonebookToLead('"+name+"','"+mobile+"');\"'>Convert To Lead</a></p><hr>";
	 
		   
	       }
	 else
	      {
         
		  if(len==0)
		  pagination="<li>Please Sync Contacts</li>";
		  
	    
		 //html="<ul  data-role=\"listview\" data-filter=\"true\" id=\"leadlist\"data-split-icon=\"gear\" data-split-theme=\"a\" data-inset=\"true\"><li data-role=\"list-divider\">All </li>"+html;
	     
		 //html+=pagination+"</ul>";
         
		 $("#"+div).html("");
	     $("#"+div).append(html);
	     $("#"+div).trigger('refresh');
	     $("#"+div).trigger('create');
		 
		
	
	 }
   
   }
 },null );
},txFail,txWin);
}

function searchPhoneContacts() 
	 {
        var q=$("#phonebook_contact").val();
        
		if(DeviceReady==true)
		{
		var options = new ContactFindOptions();
        options.filter=q; 
		options.multiple=true;
        var fields = ["displayName", "name", "phoneNumbers"];
        navigator.contacts.find(fields, searchSuccess, onError, options);
       
       
       
		}
		else
		alert("Phone is not ready for contact info");
    }

	
 function searchSuccess(contacts) 
 {     
 li="";
   $("#phonebook_search_res").html("Searching...");
 
 for (var i=0; i<contacts.length; i++) 
		{
            
		  if(contacts[i].phoneNumbers != null && contacts[i].displayName != null ) 
			{
            for (var j=0; j<contacts[i].phoneNumbers.length; j++) 
				{
               
				li+="<li><a href='#addcontacts' onclick=\"PhonebookToContact('"+contacts[i].displayName+"','"+contacts[i].phoneNumbers[j].value+"');\"><h3>"+contacts[i].displayName+"</h3><p>"+contacts[i].phoneNumbers[j].value+"</p></a></li>";
				
                 
               }
			  
			}
           
       
		}
    
	  if(contacts.length !=null && contacts.length>0)
	  {
	  ul="<ul data-role=\"listview\" data-inset='true'><li data-role='list-devider'>Results </li>"+li+"</ul>";
	  $("#phonebook_search_res").html(ul);
	  $("#phonebook_search_res").trigger("create");
	  $("#phonebook_search_res").trigger("refresh");
	  }
	  else
	  $("#phonebook_search_res").append("<li>No Contacts Found</li>");
 
 

  }
/* ************************************** Dashboard *********************** */
DashboardOpps=Array();
function getOpdash()
{
 db.transaction(function (tx) 
   {
   
   tx.executeSql("select count(*) as opps, status from "+user+"_leads group by status", [], function (tx, results) 
   {
   len = results.rows.length;
  
   var html="";
   var New=0,Prospect=0,Quote=0,Negotiate=0,Won=0,Lost=0,Dead=0;
   for (i = 0; i < len; i++)
   {
   if(results.rows.item(i).status=="New") 
   New=results.rows.item(i).opps; 
   if(results.rows.item(i).status=="Prospect") 
   Prospect=results.rows.item(i).opps;  
   if(results.rows.item(i).status=="Negotiate") 
   Negotiate=results.rows.item(i).opps;
   if(results.rows.item(i).status=="Quote") 
   Quote=results.rows.item(i).opps;     
   if(results.rows.item(i).status=="Won") 
   Won=results.rows.item(i).opps;
   if(results.rows.item(i).status=="Lost") 
   Lost=results.rows.item(i).opps;  
   if(results.rows.item(i).status=="Dead") 
   Dead=results.rows.item(i).opps;   
   
   }
   
   var dash = 
			{
        Dead: Dead,
        Prospect:Prospect,
        Negotiate: Negotiate,
		Quote: Quote,
		Won: Won,
        Lost: Lost,
       
		New: New,
		maxOpps: 1,
		maxAcc: 1,
           };
   

			
			str=JSON.stringify(dash);
			
			localStorage.setItem("dashboard", str);
				
   
   }, txWin,txFail);
  });


}


function getAccdash()
{
 db.transaction(function (tx) 
   {
   
   tx.executeSql("select * from "+user+"_accounts order by revenue limit 0,5", [], function (tx, results) 
   {
   len = results.rows.length;
  
   var html="";
   var one=0,two=0,three=0,four=0,five=0;
   for (i = 0; i < len; i++)
   {
    if(i=0)
	one=results.rows.item(i).revenue;
	if(i=1)
	two=results.rows.item(i).revenue;
	if(i=2)
	three=results.rows.item(i).revenue;
	if(i=3)
	four=results.rows.item(i).revenue;
	if(i=4)
	five=results.rows.item(i).revenue;
	
	
   }
   
   var dash = 
			{
        one:one,
		two:two,
		three:three,
		four:four,
		five:five,
           };
   

			
			str=JSON.stringify(dash);
			
			localStorage.setItem("dashboard_acc", str);
			
   
   }, txWin,txFail);
  });


}






var DashBoardArray=Array();
var DashBoardArray2=Array();
function getDashboard()
{
getOpdash();
getAccdash();

var json = window.localStorage.getItem("dashboard");
var json2 = window.localStorage.getItem("dashboard_acc");

if(json!=null)
{
var dashdata=JSON.parse(json);


db.transaction(function (tx) 
   {
   
   tx.executeSql("SELECT * FROM "+user+"_leads order by amount desc limit 0,5", [], function (tx, results) 
   {
   len = results.rows.length;
  
   var html="";
   for (i = 0; i < len; i++)
   {
      var arr=Array();
	  var id="";
	 arr["name"]=results.rows.item(i).fname;
	 arr["amount"]=results.rows.item(i).amount;
	 id=results.rows.item(i).uid;
     DashBoardArray[i]=arr;
	
	 html+="<li style='border:1px solid #cccccc;'><a href='#detail_lead' onclick=\"changePageLeadDB('"+id+"');\" data-inline='true' class='ui-link-inherit'><h3>"+results.rows.item(i).fname+" "+results.rows.item(i).lname+"</h3><p>"+results.rows.item(i).description+"</p> <span class=\"ui-li-count\">$"+results.rows.item(i).amount+"</span> </a> </li>";
   }
    var ul="<ul data-role='listview' data-inset='true'>"+html+"</ul>";
   $("#dashboard_1").html(ul);
   $("#dashboard_1").trigger("create");
   $("#dashboard_1").trigger("updaelayout");
   
   }, txWin,txFail);
  });


$("#dash_leadnew").html(dashdata.New);
$("#dash_leaddead").html(dashdata.Dead);
$("#dash_leadprospecting").html(dashdata.Prospect);
$("#dash_leadproposalsent").html(dashdata.Quote);

$("#dash_leadnegotiation").html(dashdata.Negotiate);
$("#dash_leadwonclosed").html(dashdata.Won);
$("#dash_leadlostclosed").html(dashdata.Lost);


}
if(json2!=null)
{
db.transaction(function (tx) 
   {
tx.executeSql("SELECT * FROM "+user+"_accounts order by revenue desc limit 0,5", [], function (tx, results) 
   {
   len = results.rows.length;
  
   var html="";
   for (i = 0; i < len; i++)
   { 
     var arr=Array();
     var arr2=Array();
     if(i<len)
	 {
     arr["Name"]=results.rows.item(i).name;
	 arr["Type"]=results.rows.item(i).account_type;
	 arr["Id"]=results.rows.item(i).uid;
	 arr["Industry"]=results.rows.item(i).industry;
	 arr["Employees"]=results.rows.item(i).employees;
	 arr["City"]=results.rows.item(i).city;
	 arr["Country"]=results.rows.item(i).country;
	 arr["Street"]=results.rows.item(i).street;
	 arr["Revenue"]=results.rows.item(i).revenue;
	 
	 arr2["amount"]=results.rows.item(i).revenue;
	 arr2["name"]=results.rows.item(i).name;
	 
	 AccountsArray[arr["Id"]]=arr;
	 DashBoardArray2[i]=arr2;
	
    html+="<li style='border:1px solid #cccccc;'><a href='#accountsdetail' data-inline=\"true\" onclick=\"changeAccountPage('"+results.rows.item(i).uid+"');\"><h3>"+results.rows.item(i).name+"</h3><p>"+results.rows.item(i).account_type+"</p></a><span class=\"ui-li-count\">$"+results.rows.item(i).revenue+"</span></li>";
	}
   }
    var ul="<ul data-role='listview' data-inset='true'>"+html+"</ul>";
   $("#dashboard_3").html(ul);
   $("#dashboard_3").trigger("create");
   $("#dashboard_3").trigger("updaelayout");
   
   }, txWin,txFail);
});
}
}

var barActive,pieActive;
function barChart(parent,child)
 {
  var width=$("#"+parent).width();
  $("#"+child).css("width:"+width+"px");
  var json = window.localStorage.getItem("dashboard");
  var dashdata=JSON.parse(json);
  barActive=true;
 
  var leadArray=Array("New","Prospect","Quote","Negotiate","Won","Lost","Dead");
 $("#dashChart").html("");
 var plot2 = $.jqplot('dashChart', [
        [[dashdata.New,"New"], [dashdata.Prospect,"Prospect"], [dashdata.Quote,"Quote"], [dashdata.Negotiate,"Negotiate"],[dashdata.Won,"Won"],[dashdata.Lost,"Lost"],[dashdata.Dead,"Dead"]], 
        ], {
        seriesDefaults: {
            renderer:$.jqplot.BarRenderer,
            
            pointLabels: { show: true, location: 'e', edgeTolerance: -15 },
          
            shadowAngle: 135,
           
            rendererOptions: {
                barDirection: 'horizontal',
				 showDataLabels: true,
		  dataLabels:'label'
            }
        },
        


		grid : { borderWidth:0 , shadow:true, background:"inherit"},
		axes: {
            yaxis: {
                renderer: $.jqplot.CategoryAxisRenderer
            }
        }
    });

 
 
 }
function getDashArray(i,option)
{
var obj=Array();
obj=DashBoardArray[i];
if(obj=="undefined" || obj==null)
return 0;
else
return obj[option];
}
function barChart2(parent,child)
 {
  
  var one=getDashArray(0,"amount");
  one=one*1;
  var two=getDashArray(1,"amount");
  two=two*1;
  var three=getDashArray(2,"amount");
  three=three*1;
  var four=getDashArray(3,"amount");
  four=four*1;
  var five=getDashArray(4,"amount");
  five=five*1;
  
  
  var width=$("#"+parent).width();
  $("#"+child).css("width:"+width+"px");
  
  barActive=true;
 $("#dashChart").html("");
 var plot2 = $.jqplot('dashChart', [
        [[one, getDashArray(0,"name")],[two, getDashArray(1,"name")],[three, getDashArray(2,"name")],[four, getDashArray(3,"name")],[five, getDashArray(4,"name")]], 
        ], {
        seriesDefaults: {
            renderer:$.jqplot.BarRenderer,
            
            pointLabels: { show: true, location: 'n', edgeTolerance: -15 },
          
            shadowAngle: 135,
           
            rendererOptions: {
                barDirection: 'horizontal',
				 showDataLabels: true,
		  dataLabels:'label'
            }
        },
        


		grid : { borderWidth:0 , shadow:true, background:"inherit"},
		axes: {
            yaxis: {
                renderer: $.jqplot.CategoryAxisRenderer
            }
        }
    });
}

function getDashArray2(i,option)
{
var obj=Array();
obj=DashBoardArray2[i];
if(obj=="undefined" || obj==null)
return 0;
else
return obj[option];
}

function barChart3(parent,child)
 {
  var one=getDashArray2(0,"amount");
  one=one*1;
  var two=getDashArray2(1,"amount");
  two=two*1;
  var three=getDashArray2(2,"amount");
  three=three*1;
  var four=getDashArray2(3,"amount");
  four=four*1;
  var five=getDashArray2(4,"amount");
  five=five*1;
  
  
  var width=$("#"+parent).width();
  $("#"+child).css("width:"+width+"px");
  
  barActive=true;
 $("#dashChart").html("");
 var plot2 = $.jqplot('dashChart', [
        [[one, getDashArray2(0,"name")],[two, getDashArray2(1,"name")],[three, getDashArray2(2,"name")],[four, getDashArray2(3,"name")],[five, getDashArray2(4,"name")]], 
        ], {
        seriesDefaults: {
            renderer:$.jqplot.BarRenderer,
            
            pointLabels: { show: true, location: 'n', edgeTolerance: -15 },
          
            shadowAngle: 135,
           
            rendererOptions: {
                barDirection: 'horizontal',
				 showDataLabels: true,
		  dataLabels:'label'
            }
        },
        


		grid : { borderWidth:0 , shadow:true, background:"inherit"},
		axes: {
            yaxis: {
                renderer: $.jqplot.CategoryAxisRenderer
            }
        }
    });
}


function SyncAll()
{
syncCount=0;

$("#lead_sync").html("Synchronizing...");
$("#con_sync").html("Synchronizing...");
$("#acc_sync").html("Synchronizing...");
//$("#opps_sync").html("Synchronizing...");

setLead(1,'All','date');
setContact(1);
setAccount();
//setOpps();


} 

/* ******************* Notes *************** */

function getNotes(module,id_div,display)
{

var id=$("#"+id_div).val();
online = window.navigator.onLine;
var html="";
if(online)
{    
    $("#"+display).html("<img src='load.gif' /> Connecting Server.."); 
	 $.ajax({
          url: DomainName+"/mobicrm/services/notes.php?module="+module+"&id="+id,
          dataType: 'jsonp',
          jsonp: 'jsoncallback',
          timeout:TimeOutValue,
		  data:{username:user,password:pass},
          success: function(json, status)
          {
            var jsonO=json.result_count;
			if(jsonO==0)
			{
			$("#"+display).html("No Notes Available");
			return;
			}
			$.each(json.entry_list, function(i,item)
		      {
          
		   $("#"+display).empty();
		   var NameValueList=item.name_value_list;
           var Id=NameValueList.id;
		   var Name=NameValueList.name;
		   var Desc=NameValueList.description;
		   var date=NameValueList.date_entered;
		  
		   html+="<li><a href='#'><h2 id='notes_"+Id.value+"_name'>"+Name.value+"</h2><p 'notes_"+Id.value+"_desc' style='white-space:normal'>"+Desc.value+"</p><p class='ui-li-aside'>"+date.value+"</p></a><a href=\"#notes_menupage\" data-rel=\"popup\" onclick=\"setNotesEdit('"+Name.value+"','"+Desc.value+"','"+Id.value+"');\">Open dialog</a></li>"
		   if(i==(jsonO-1))
		   {
		  $("#"+display).append("<ul data-inset='true' data-role='listview'><li data-role='list-divider'>Notes</li>"+html+"</ul><input type='hidden' id='edit_parent_id' value='"+id+"'><input type='hidden' id='edit_notes_parent_type' value='"+module+"'>");
		  $("#"+display).trigger("create");
		   }
		   });
          },
        error: function( objAJAXRequest, strError )
		 {
          $("#"+display).append("");
		 alert(strError);
	     }
	  });
}
else
{
alert("No Network");
}
}

function setNotesEdit(name,desc,id)
{
$("#edit_notes_id").val(id);

$("#edit_notes_subject").val(name);
$("#edit_notes_desc").val(desc);

}
//Meetings 

/* ********* meetings **************** */

function getMeetings(option)
{
online = window.navigator.onLine;
var html="";
if(online)
{    
    $("#meet_list").html("<img src='load.gif' /> Connecting Server.."); 
	var postdata="username="+encodeURIComponent(user)+"&password="+encodeURIComponent(pass);
	
	 $.ajax({
          url: DomainName+"/mobicrm/services/meetings.php?option="+option,
          dataType: 'jsonp',
		  jsonp: 'jsoncallback',
          timeout:TimeOutValue,
		  data:postdata,
          success: function(json, status)
          {
            var jsonO=json.result_count;
	
			if(jsonO==0)
			{
			$("#meet_list").html("No Meetings Available");
			return;
			}
			$.each(json.entry_list, function(i,item)
		      {
          
		   $("#meet_list").empty();
		  
           var Id=item.id;
		   var Name=item.name;
		 
		   var Desc=item.desc;
		   var date=item.start;
		   var dateend=item.end;
		   var location=item.location;
		   var currdate=new Date();
		   var date2=new Date(dateend);
		   var tdiff=item.timediff;
		   var diff=daysBetween(currdate, date2);
		   var status="";
		   var obj=item.contact;
		   var cname=obj.name;
		   if(diff>0)
		   status=diff+" Day later";
		   else
		   status="Expired "+(-1)*diff+" days back";
		   
		   if(diff>0 && diff<=1)
		   status="Today";
		   
		   html+="<li id='"+Id+"'><h2>"+Name+"</h2><p style='white-space:normal'>"+Desc+"</p><p style='white-space:normal;'>Starts at <strong>"+date+"</strong> ( "+tdiff+" )</p><p>"+cname+" <br><small>"+location+"</small></p><span class=\"ui-li-count\"><a href=\"#\" data-role='button' data-icon=\"delete\" data-iconpos=\"notext\" onclick=\"SetMeeting('delete_meetings','delete','"+Id+"');\"></a></span></li>"
		   if(i>=(jsonO-1))
		   {
		  $("#meet_list").append("<p id='delete_meetings'></p><ul data-inset='true' data-split-icon=\"delete\" data-role='listview'><li data-role='list-divider'>"+option+" Meeting Details</li>"+html+"</ul>");
		  $("#meet_list").trigger("create");
		   }
		   });
          },
        error: function( objAJAXRequest, strError )
		 {
         alert(strError);
	     }
	  });
}
else
{
alert("No Network");
}
}
function daysBetween(first, second) {

    // Copy date parts of the timestamps, discarding the time parts.
    var one = new Date(first.getFullYear(), first.getMonth(), first.getDate());
    var two = new Date(second.getFullYear(), second.getMonth(), second.getDate());
    
	
    // Do the math.
    var millisecondsPerDay = 1000 * 60 * 60 * 24;
    var millisBetween = two.getTime() - one.getTime();
    var days = millisBetween / millisecondsPerDay;

    // Round down.
    return Math.floor(days);
}

function getHTML(div,url)
{

online = window.navigator.onLine;
var html="";

if(online)
{    
    $("#"+div).html("<img src='load.gif' /> Connecting Server.."); 
	 $.ajax({
          url: url,
		  dataType: 'jsonp',
          jsonp: 'jsoncallback',
          timeout:TimeOutValue,
		  data:{username:user,password:pass},
          success: function(data, status)
          {
          $("#"+div).html(data.content);
		  $("#"+div).trigger("create");
          },
        error: function( objAJAXRequest, strError )
		 {
         $("#"+div).html(strError);
	     }
	  });
}
else
{
alert("No Network");
}
}
function ContactHistory()
{
var id=$("#contact_detail_id").val();

var url=DomainName+"/mobicrm/services/contact_history.php?id="+id;

getHTML('contact_history',url);
}


/**************** Team ****************************/

function getTeam(display,module)
{

online = window.navigator.onLine;
var html="";
if(online)
{    
    $("#"+display).html("<img src='load.gif' /> Connecting Server.."); 
	 $.ajax({
          url: DomainName+"/mobicrm/services/teamlist.php",
          dataType: 'jsonp',
          jsonp: 'jsoncallback',
          timeout:TimeOutValue,
		  data:{username:user,password:pass},
          success: function(json, status)
          {
            var jsonO=json.result_count;
			if(jsonO==0)
			{
			$("#"+display).html("No Member Available");
			return;
			}
			$.each(json.entry_list, function(i,item)
		      {
          
		   $("#"+display).empty();
		   var NameValueList=item.name_value_list;
           var Id=NameValueList.id;
		   var Name=NameValueList.name;
		  
		  
		   html+="<li><a href='#' onclick=\"AssignUsersLead('"+Id.value+"');\"><h2>"+Name.value+"</h2><p 'users_"+Id.value+"_desc' style='white-space:normal'></p><p class='ui-li-aside'></p></a></li>"
		   if(i==(jsonO-1))
		   {
		  $("#"+display).append("<ul data-inset='true' data-role='listview'><li data-role='list-divider'>Members</li>"+html+"</ul>");
		  $("#"+display).trigger("create");
		   }
		   });
          },
        error: function( objAJAXRequest, strError )
		 {
         alert(strError);
	     }
	  });
}
else
{
alert("No Network");
}
}

$(document).bind('mobileinit', function () {
    $.mobile.allowCrossDomainPages = true;
    $.mobile.zoom.enabled = false;
    $.mobile.buttonMarkup.hoverDelay = 0; //defaults 200
    $.mobile.defaultDialogTransition = 'none';
    $.mobile.defaultPageTransition = 'none';
});

/*
    cycle.js
    2012-08-19

    Public Domain.

    NO WARRANTY EXPRESSED OR IMPLIED. USE AT YOUR OWN RISK.

    This code should be minified before deployment.
    See http://javascript.crockford.com/jsmin.html

    USE YOUR OWN COPY. IT IS EXTREMELY UNWISE TO LOAD CODE FROM SERVERS YOU DO
    NOT CONTROL.
*/

/*jslint evil: true, regexp: true */

/*members $ref, apply, call, decycle, hasOwnProperty, length, prototype, push,
    retrocycle, stringify, test, toString
*/

if (typeof JSON.decycle !== 'function') {
    JSON.decycle = function decycle(object) {
        'use strict';

// Make a deep copy of an object or array, assuring that there is at most
// one instance of each object or array in the resulting structure. The
// duplicate references (which might be forming cycles) are replaced with
// an object of the form
//      {$ref: PATH}
// where the PATH is a JSONPath string that locates the first occurance.
// So,
//      var a = [];
//      a[0] = a;
//      return JSON.stringify(JSON.decycle(a));
// produces the string '[{"$ref":"$"}]'.

// JSONPath is used to locate the unique object. $ indicates the top level of
// the object or array. [NUMBER] or [STRING] indicates a child member or
// property.

        var objects = [],   // Keep a reference to each unique object or array
            paths = [];     // Keep the path to each unique object or array

        return (function derez(value, path) {

// The derez recurses through the object, producing the deep copy.

            var i,          // The loop counter
                name,       // Property name
                nu;         // The new object or array

            switch (typeof value) {
            case 'object':

// typeof null === 'object', so get out if this value is not really an object.
// Also get out if it is a weird builtin object.

                if (value === null ||
                        value instanceof Boolean ||
                        value instanceof Date    ||
                        value instanceof Number  ||
                        value instanceof RegExp  ||
                        value instanceof String) {
                    return value;
                }

// If the value is an object or array, look to see if we have already
// encountered it. If so, return a $ref/path object. This is a hard way,
// linear search that will get slower as the number of unique objects grows.

                for (i = 0; i < objects.length; i += 1) {
                    if (objects[i] === value) {
                        return {$ref: paths[i]};
                    }
                }

// Otherwise, accumulate the unique value and its path.

                objects.push(value);
                paths.push(path);

// If it is an array, replicate the array.

                if (Object.prototype.toString.apply(value) === '[object Array]') {
                    nu = [];
                    for (i = 0; i < value.length; i += 1) {
                        nu[i] = derez(value[i], path + '[' + i + ']');
                    }
                } else {

// If it is an object, replicate the object.

                    nu = {};
                    for (name in value) {
                        if (Object.prototype.hasOwnProperty.call(value, name)) {
                            nu[name] = derez(value[name],
                                path + '[' + JSON.stringify(name) + ']');
                        }
                    }
                }
                return nu;
            case 'number':
            case 'string':
            case 'boolean':
                return value;
            }
        }(object, '$'));
    };
}


if (typeof JSON.retrocycle !== 'function') {
    JSON.retrocycle = function retrocycle($) {
        'use strict';

// Restore an object that was reduced by decycle. Members whose values are
// objects of the form
//      {$ref: PATH}
// are replaced with references to the value found by the PATH. This will
// restore cycles. The object will be mutated.

// The eval function is used to locate the values described by a PATH. The
// root object is kept in a $ variable. A regular expression is used to
// assure that the PATH is extremely well formed. The regexp contains nested
// * quantifiers. That has been known to have extremely bad performance
// problems on some browsers for very long strings. A PATH is expected to be
// reasonably short. A PATH is allowed to belong to a very restricted subset of
// Goessner's JSONPath.

// So,
//      var s = '[{"$ref":"$"}]';
//      return JSON.retrocycle(JSON.parse(s));
// produces an array containing a single element which is the array itself.

        var px =
            /^\$(?:\[(?:\d+|\"(?:[^\\\"\u0000-\u001f]|\\([\\\"\/bfnrt]|u[0-9a-zA-Z]{4}))*\")\])*$/;

        (function rez(value) {

// The rez function walks recursively through the object looking for $ref
// properties. When it finds one that has a value that is a path, then it
// replaces the $ref object with a reference to the value that is found by
// the path.

            var i, item, name, path;

            if (value && typeof value === 'object') {
                if (Object.prototype.toString.apply(value) === '[object Array]') {
                    for (i = 0; i < value.length; i += 1) {
                        item = value[i];
                        if (item && typeof item === 'object') {
                            path = item.$ref;
                            if (typeof path === 'string' && px.test(path)) {
                                value[i] = eval(path);
                            } else {
                                rez(item);
                            }
                        }
                    }
                } else {
                    for (name in value) {
                        if (typeof value[name] === 'object') {
                            item = value[name];
                            if (item) {
                                path = item.$ref;
                                if (typeof path === 'string' && px.test(path)) {
                                    value[name] = eval(path);
                                } else {
                                    rez(item);
                                }
                            }
                        }
                    }
                }
            }
        }($));
        return $;
    };
}
