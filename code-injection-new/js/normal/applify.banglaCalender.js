






            (function() {
                var jasmineEnv = jasmine.getEnv();
                jasmineEnv.updateInterval = 1000;

                var htmlReporter = new jasmine.HtmlReporter();

                jasmineEnv.addReporter(htmlReporter);

                jasmineEnv.specFilter = function(spec) {
                    return htmlReporter.specFilter(spec);
                };

                var currentWindowOnload = window.onload;

                window.onload = function() {
                    if (currentWindowOnload) {
                        currentWindowOnload();
                    }
                    execJasmine();
                };

                function execJasmine() {
                    jasmineEnv.execute();
                }
            })();
        



           // app.initialize();
      
             function banglaCalender()
           		{
           		$("body").html($("body").html());
 				var monthar=['বৈশাখ','জ্যৈষ্ঠ','আষাঢ়','শ্রাবণ','ভাদ্র','আশ্বিন ','কার্তিক','অগ্রহায়ণ','পৌষ','মাঘ','ফাল্গুন','চৈত্র'];
 				var ems=['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
				var session=['গ্রীষ্ম','বর্ষা','শরৎ','হেমন্ত','শীত','বসন্ত'];
				var digit=['০','১','২','৩','৪','৫','৬','৭','৮','৯'];
				var day=['শনি','রবি','সোম','মঙ্গল','বুধ','বৃহঃ','শুক্র'];
				var bmday=[31,31,31,31,31,30,30,30,30,30,30,30];
				var emday=[31,28,31,30,31,30,31,31,30,31,30,31];				            
           		var width=window.innerWidth;
           		var height=window.innerHeight;
           		
           		
           		
           		
		 //logo move
		 //content move
		 var content=document.getElementById("content");  
		 var contentStart=false;
		 var conprevX=0;		 
		 //applify logo
		 var applify=document.getElementById("applify"); 
		 var logo=document.getElementById("logo"); 
		 var logoStart=false;
		 var count=1;
		 var prevY=0;
		 content.addEventListener('touchstart', function(e) {
		 	e.preventDefault(); 
		 	contentStart=true;
		 },false);	
		 content.addEventListener('touchend', function(e) {
		 	e.preventDefault(); 
		 	contentStart=false;
		 	conprevX=0;
		 	var cWidth=width;
		 	var lleft=parseInt($("#content").css("margin-left"))+width;
		 	if(lleft>40)
		 	{
		 		$("#content").animate({'margin-left':0+"px"},200,function(){
		 		currentMonth--;
		 		if(currentMonth<1){currentMonth=12;currentYear--;}
		 		showDate(currentMonth,currentYear,getTotalDay(currentMonth,currentYear));
		 		$("#content").css('margin-left',(-width)+'px');
		 		});
		 	}
		 	else if(lleft<(-40))
		 	{ 	
				$("#content").animate({'margin-left':"-"+(width*2)+"px"},200,function(){

		 		currentMonth++;
		 		if(currentMonth>12){currentMonth=1;currentYear++;}
		 		showDate(currentMonth,currentYear,getTotalDay(currentMonth,currentYear));
				$("#content").css('margin-left',(-width)+'px');
				});	 	
		 	}
		 	else
		 	{
				$("#content").animate({'margin-left':"-"+(width)+"px"},400,function(){});	 		 	
		 	}

		 },false);
		 
		 
		 //logo event		 	 
		 logo.addEventListener('touchstart', function(e) {
		 	e.preventDefault(); 
		 	logoStart=true;
		 },false);
		 document.addEventListener('touchmove', function(e) {
				if(logoStart){
				e.preventDefault(); 
		 		var touch = e.touches[0];
		 		//$('#date').html(touch.pageX + " - " + touch.pageY);

		 		var dif=(prevY-touch.pageY);
		 		if((parseInt($('#logo').css('top').replace('px',''))-dif)<28)
		 		{
		 		dif=0;
		 		}
		 		if(prevY!=0)
		 		{
		 		$("#logo").css('top',(parseInt($('#logo').css('top').replace('px',''))-dif)+"px");
		 		}
		 		prevY=touch.pageY;
		 		}
				else if(contentStart){
				e.preventDefault(); 
		 		var touch = e.touches[0];

		 		var dif=(conprevX-touch.pageX);
		 		if((parseInt($('#content').css('margin-left').replace('px',''))-dif)>=0)
		 		{
		 		dif=0;
		 		}
		 		if(conprevX!=0)
		 		{
		 		$("#content").css('margin-left',(parseInt($('#content').css('margin-left').replace('px',''))-dif)+"px");
		 		}
		 		conprevX=touch.pageX;
		 		}		
		 },true);		 
		 logo.addEventListener('touchend', function(e) {
		 	e.preventDefault(); 
		 	logoStart=false;
		 	prevY=0;
		 	var lHeight=parseInt($("#logo").height());
		 	var lTop=parseInt($("#logo").css("top"))-28;
		 	if(lTop>(lHeight/2))
		 	{
		 		$("#logo").animate({'top':height},400,function(){});
		 	}
		 	else
		 	{
				$("#logo").animate({'top':28},400,function(){});	 	
		 	}
		 },false);		 
		 
		 

		         
		  applify.addEventListener('touchstart', function(e) {
		       		if($("#logo").css("top").replace("px","")!="46")
		       		{
		       		$("#logo").animate({'top':28},400,function(){});
		       		}
		       		else
		       		{
		       		$("#logo").animate({'top':height},400,function(){});
		       		}
		   // $("#date").html(e.pageX + " - " + e.pageY);
		},false);           		
           		
           		
           		
           		

				var table="";
				for(var i=0;i<7;i++)
				{
					table+="<div style='text-align:center;'>"+day[i]+"</div>";
				}
				for(var i=0;i<5;i++)
				{
					for(var j=0;j<7;j++)
					{
					table+="<div><span class='e'>12</span><span class='b'>"+getDigit((i*7)+j+1)+"</span></div>";
					}
				}
				
				
				$('#calender,#prevcal,#nextcal').html(table);
				setuppos();
				
				// cell width & height
				function setuppos(){
				width=window.innerWidth;
				height=window.innerHeight;
				var cellWidth=(parseInt(width/7)-1);
				var cellHeight=(((height-60-40+28)/6));
				var bFont=0;
				var eFont=0;
				if(cellWidth>cellHeight)
				{
					bFont=parseInt(cellHeight);
					eFont=parseInt((cellHeight/4)*1);
				}
				else
				{
					bFont=parseInt(cellWidth);
					eFont=parseInt((cellWidth/4)*1);
				}
				$('#content').css({'margin-left':(-width)+'px'});
				$('.clnd').css({'width':width+'px','display':'inline-block'});
				$("#retu").css({"width":width+"px","height":(height-60-20+28)+"px"});
				$(".clnd div").css({'height':(((height-60-28+28)/6))+"px",'width':(parseInt(width/7)-1)+"px"});
				$(".clnd div").css({'font-size':parseInt((bFont/3)*1.5)+"px",'line-height':bFont+"px"});
				$(".clnd div .b").css({'font-size':parseInt((bFont/3)*2)+"px",'line-height':bFont+"px"});
				$(".clnd div .e").css({'font-size':parseInt(eFont)+"px",'line-height':eFont+"px",'margin-top':(cellHeight-eFont-2)+"px",'margin-left':(cellWidth-60-2)+"px"});
				$("#foot").css({'max-height':(30+((height-60-40+28)%6))+"px",'min-height':(30+((height-60-40+28)%6))+"px",'line-height':(30+((height-60-40+28)%6))+"px"});
				$("#applify").css({'width':((width/7)-16)+"px",'height':(30+((height-60-40+28)%6))+"px"});
				$("#logo").css({'top':height,'left':'0','height':(((height-40-40+28)))+"px",'width':(width)+"px"});
				$("container").css("#width",width+"px");
				$("body").css({"width":width+"px","height":height+"px"});
				}
				//on resize
				var d=new Date();
				var eday=parseInt(d.getDate());
				var emonth=parseInt(d.getMonth())+1;
				var eyear=parseInt(d.getFullYear());
				var curDate=ConvertBanglaDayMonth(eday,emonth,eyear,'be');
				//var curDate=ConvertBanglaDayMonth(15,6,2013,'be');
				currentMonth=curDate.month;
				currentYear=curDate.year;
				showDate(curDate.month,curDate.year,curDate.totalDay);
		        function isLeapYear(year)
		        {
						if(year%400==0)
						   {return true;}
						else if(year%100==0)
						   {return false;}
						else if(year%4==0)
						   {return true;}
						else
						   {return false;}
		        }		      
		        
		          function getTotalDay(month,year)
		          {
		          	var tday=bmday[month-1];
		          	if(month==11&&isLeapYear(year+593))
		          	{
		          		tday++;
		          	}
		          	return tday;
		          }
				  function ConvertBanglaDayMonth(day,month,year,mode)
				  {
					  var totalDay=0;
					  for(var i=1;i<month;i++)
					  {
						  if(mode=='be')
						  {
						  if(isLeapYear(year)&&i==2)
						  totalDay+=1;						  	
						  totalDay+=emday[i-1];
						  }
						  else
						  {
						  if(isLeapYear(year)&&i==11)
						  totalDay+=1;						  	
						  	totalDay+=bmday[i-1];
						  }
					  }
					  totalDay+=day;
					  //calculate bangla month
					  //1st january 18/9
					  var bcurmon=9;
					  var bcurday=18;
					  var bcuryear=year-594;
					  var bcurtDay=30;
					  totalDay+=17;
					  if(mode!='be')
					  {
						  bcurmon=4;
						  bcurday=14;
						  bcuryear=year+593;
						  bcurtDay=30;
						  totalDay-=17;
						  totalDay+=13;	  	
					  }
					  
					  while(totalDay>0)
					  {
						 bcurday=totalDay;
						 if(mode=='be')
						 {
						 	totalDay-=bmday[bcurmon-1];						 	
						 if(isLeapYear(year)&&bcurmon==11)
						 totalDay-=1;
						 }
						 else
						 {
						 totalDay-=emday[bcurmon-1];
						 if(isLeapYear(year)&&bcurmon==2)
						 totalDay-=1;						 	
						 }		
						 bcurmon++;
						 if(bcurmon>12)
						 {
							 bcurmon=1;
							 bcuryear++;
						 }
					  }
					  bcurmon--;
					  if(bcurmon<1)
					  {
						  bcurmon=12;
					  }
					  // total month count
					  if(mode=='be')
					  {
					  bcurtDay=bmday[bcurmon-1];
					  }
					  else
					  {
					  bcurtDay=emday[bcurmon-1];	
					  }
					  // if leap year
					  if(mode=='be')
					  {
						  if(isLeapYear(year)&&bcurmon==11)
						  {
						  	bcurtDay=31;
						  }
					  }
					  else
					  {
						  if(isLeapYear(year)&&bcurmon==11)
						  {
						  	bcurtDay=31;
						  }					  	
					  }
					  var reObj={};
					  reObj.day=bcurday;
					  reObj.month=bcurmon;
					  reObj.year=bcuryear;
					  reObj.totalDay=bcurtDay;
					  return reObj;
				  }		        
		        function getDigit(dig)
		           {   
		           	dig+="";
		           	var str="";
		           	for(var i=0;i<dig.length;i++)
		           	{
		           		//alert(digit[parseInt(dig[i])]);
		           		str+=digit[parseInt(dig[i])];	
		           	}
		           	//alert(digit[parseInt(dig[i])
		           	return str;
		           }				
				function showDate(m,y,totalDay){
				$(".current").removeClass("current");
				showCalender(m,y,"#calender",totalDay);
		        var csession=parseInt((m)/2);
		        if((m)%2==1)
		        {
		        	csession++;
		        }
		        var cursession=session[csession-1];
		        $("#date").css("width","800px");
		        $("#date").html("");
		        $("#date").html((monthar[m-1]+"/"+getDigit(y)+"-"+cursession));
		        $("#date").append();					
				var pm=m-1;
				var nm=m+1;
				if(pm<1)
					{
						pm=12;
						y--;
					}
				else if(nm>12)
				{
					nm=1;
					y++;
				}
				showCalender(pm,y,"#prevcal",totalDay);
				showCalender(nm,y,"#nextcal",totalDay);
				}
		        function showCalender(cmonth,cyear,calobj,totalDay)
		        {
		        	var edate=ConvertBanglaDayMonth(1,cmonth,cyear,'eb');
		        	var d=new Date(edate.year,edate.month-1,edate.day);
		        	//var dayofWeek=(d.getDay()-1)<0?6:d.getDay()-1;
		        	var dayofWeek=d.getDay()+1;
		        	if(dayofWeek>6)
		        	{
		        		dayofWeek=0;
		        	}
		        	//var dayofWeek=d.getDay();
		        	var curday=-1;
		        	if(cmonth==curDate.month&&cyear==curDate.year)
		        	{
		        		curday=curDate.day;
		        	}
		        	setDateData(dayofWeek,totalDay,calobj,curday,cmonth,cyear);
		        }
		        function setDateData(dayof,totalm,calobj,curday,cmonth,cyear)
		        {
		        	var start=false;
		        	var days=1;
		        	var efirst=false;
		        	var edays=1;
		        	var etotalDay=0;
		        	var emonth=-1;
		        	for(var i=1;i<6;i++)
		        		{
		        			for(var j=0;j<7;j++)
		        			{
		        				if(!start)
		        				{
		        					
		        					if(j>=dayof)
		        					{
		        						start=true;
		        					}
		        					else
		        					{
		        					$('.b',$(calobj+" div").eq((i*7)+j)).html("");
		        					$('.e',$(calobj+" div").eq((i*7)+j)).html("");
		        					$(calobj+" div").eq((i*7)+j).addClass('disable');
		        					continue;	
		        					}
		        					
		        				}
		        				if(days>totalm)
		        				{
		        					
	        						$('.b',$(calobj+" div").eq((i*7)+j)).html("");
		        					$('.e',$(calobj+" div").eq((i*7)+j)).html("");
		        					
		        					$(calobj+" div").eq((i*7)+j).addClass('disable');
		        					continue;			        					
		        				}
		        				if(curday==days)
		        				{
		        					$(calobj+" div").eq((i*7)+j).addClass('current');
		        				}
		        				//$(calobj+" div").eq((i*7)+j).html(getDigit(days));
	        						$('.b',$(calobj+" div").eq((i*7)+j)).html(getDigit(days));
		        					// english section
		        					if(edays>etotalDay)
		        					{
		        						var eob=ConvertBanglaDayMonth(days,cmonth,cyear,'eb');
		        						edays=eob.day;
		        						etotalDay=eob.totalDay;
		        						emonth=eob.month;
		        						efirst=true;
		        					}
		        					var estr="";
		        					if(efirst)
		        					{
		        						estr+=ems[emonth-1]+" ";
		        						efirst=false;
		        					}
		        					estr+=edays;
		        					$('.e',$(calobj+" div").eq((i*7)+j)).html(estr);
		        					edays++;
		        				$(calobj+" div").eq((i*7)+j).removeClass('disable');
		        				days++;
		        				//console.log($("td).eq((i*7)+j).html())
		        			}
		        		}
		        		if(days<=totalm)
		        		{
		        			for(var i=0;i<6;i++)
		        			{
		        				if(days>totalm)
		        				{
		        				break;
		        				}
		        				if(curday==days)
		        				{
		        					$(calobj+" td").eq((i*7)+j).addClass('current');
		        				}		        				
		        				$('.b',$(calobj+" td").eq((7)+i)).html(getDigit(days));
		        					
		        					if(edays>etotalDay)
		        					{
		        						var eob=ConvertBanglaDayMonth(days,cmonth,cyear,'eb');
		        						edays=eob.day;
		        						etotalDay=eob.totalDay;
		        						emonth=eob.month;
		        						efirst=true;
		        					}
		        					var estr="";
		        					if(efirst)
		        					{
		        						estr+=ems[emonth-1]+" ";
		        						efirst=false;
		        					}
		        					estr+=edays;
		        					$('.e',$(calobj+" div").eq((7)+i)).html(estr);
		        					edays++;
		        							        				
		        				$(calobj+" td").eq((7)+i).removeClass('disable');	
		        				days++;	        			
		        			}
		        		}
		        }   
           }    
           $(function(){
           $(window).resize(banglaCalender);
           banglaCalender();  
           });
        

