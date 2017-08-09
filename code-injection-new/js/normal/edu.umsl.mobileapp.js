






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
        







		  		  
          var ref = null;
			  function openInAppBrowserBlank(url)
			  {
				  try {
			  ref = window.open(encodeURI(url),'_blank','location=no'); //encode is needed if you want to send a variable with your link if not you can use ref = window.open(url,'_blank','location=no');
					   ref.addEventListener('loadstop', LoadStop);
					   ref.addEventListener('exit', Close);
				  }
				  catch (err)    
				  {
					  alert(err);
				  }
			  }
			  function LoadStop(event) {
					   if(event.url == "./closeInAppBrowser.html"){
						  // alert("fun load stop runs");
						   ref.close();
					   }    
				  }
			  function Close(event) {
					   ref.removeEventListener('loadstop', LoadStop);
					   ref.removeEventListener('exit', Close);
				  } 
          

        $('#page1').live("swipeleft", function(){  var nextpage = $(this).next('div[data-role="page"]'); if (nextpage.length > 0) { $.mobile.changePage(nextpage, {transition:"slide", reverse:false});} });
        $('#page1').live("swiperight", function(){  $.mobile.changePage("#page5", {transition : 'slide', reverse:true}); });
        $('#page1').live('pagecreate',function(event){ var x = document.getElementById('page1image'); imagewidth = window.innerWidth - 30; x.width = imagewidth; });
      

      $('#page2').live("swipeleft", function(){  var nextpage = $(this).next('div[data-role="page"]'); if (nextpage.length > 0) { $.mobile.changePage(nextpage, {transition:"slide", reverse:false});} });
      $('#page2').live("swiperight", function(){ var prevpage = $(this).prev('div[data-role="page"]'); if (prevpage.length > 0) { $.mobile.changePage(prevpage, {transition:"slide", reverse:true});} });
      $('#page2').live('pagecreate',function(event){ var x = document.getElementById('page2image'); imagewidth = window.innerWidth - 30; x.width = imagewidth; });
      

      $('#page3').live("swipeleft", function(){  var nextpage = $(this).next('div[data-role="page"]'); if (nextpage.length > 0) { $.mobile.changePage(nextpage, {transition:"slide", reverse:false});} });
      $('#page3').live("swiperight", function(){ var prevpage = $(this).prev('div[data-role="page"]'); if (prevpage.length > 0) { $.mobile.changePage(prevpage, {transition:"slide", reverse:true});} });
      $('#page3').live('pagecreate',function(event){ var x = document.getElementById('page3image'); imagewidth = window.innerWidth - 30;  x.width = imagewidth; });
      

        $('#page4').live("swipeleft", function(){  var nextpage = $(this).next('div[data-role="page"]'); if (nextpage.length > 0) { $.mobile.changePage(nextpage, {transition:"slide", reverse:false});} });
        $('#page4').live("swiperight", function(){ var prevpage = $(this).prev('div[data-role="page"]'); if (prevpage.length > 0) { $.mobile.changePage(prevpage, {transition:"slide", reverse:true});} });
        $('#page4').live('pagecreate',function(event){ var x = document.getElementById('page4image'); imagewidth = window.innerWidth - 30; x.width = imagewidth; });
      

        $('#page5').live("swipeleft", function(){ $.mobile.changePage("#page1", {transition : 'slide', reverse:false}); });
        $('#page5').live("swiperight", function(){ var prevpage = $(this).prev('div[data-role="page"]'); if (prevpage.length > 0) { $.mobile.changePage(prevpage, {transition:"slide", reverse:true});} });
        $('#page5').live('pagecreate',function(event){ var x = document.getElementById('page5image'); imagewidth = window.innerWidth - 30; x.width = imagewidth; });
     

       $('#news').live('pageshow',function(event){
          $('#umslnews').empty();
		  $('#umslnews').append("Loading UMSL News");
          $.getJSON("https://apps.umsl.edu/webapps/ITS/UMSLMobilev2/GetNews.cfm?callback=?",function(data){
            $('#umslnews').empty();
            count = 0;
            $.each(data, function(key,val){
                   parts = key.split("^");
                   date = parts[1];
                   dateparts = date.split(" ");
                   linkbuilder = "openInAppBrowserBlank('" + val + "')";
                   
                      if(count % 2 == 1){
                             $('#umslnews').append('<li data-icon="false" onclick="'+ linkbuilder + '" style="font-size:small;background:#fdf6e5;"><table><tr><td><div class="date"><div class="date-month">'+ dateparts[1] +'</div><div class="date-day">' + dateparts[0] + '</div></div></td><td>' + parts[0] + '</td></tr></table>');
                      }else{
                             $('#umslnews').append('<li data-icon="false" onclick="'+ linkbuilder + '" style="font-size:small;background:#fbeecc;"><table><tr><td><div class="date"><div class="date-month">'+ dateparts[1] +'</div><div class="date-day">' + dateparts[0] + '</div></div></td><td>' + parts[0] + '</td></tr></table>');
                                               
                      }
                     count++;
                 });
           });
       });
      

        $('#thecurrent').live('pageshow',function(event){
          $('#currentnews').empty();
		  $('#currentnews').append("Loading The Current News");
          $.getJSON("https://apps.umsl.edu/webapps/ITS/UMSLMobilev2/GetNewsCurrent.cfm?callback=?",function(data){
            $('#currentnews').empty();
            count = 0;
            $.each(data, function(key,val){
                   parts = key.split("^");
                   date = parts[1];
                   dateparts = date.split(" ");
                   linkbuilder = 'openInAppBrowserBlank(\''+val+ '\')';
                      if(count % 2 == 1){
                             $('#currentnews').append('<li data-icon="false" onclick="'+linkbuilder+'" style="font-size:small;background:#fdf6e5;"><table><tr><td><div class="date"><div class="date-month">'+ dateparts[1] +'</div><div class="date-day">' + dateparts[0] + '</div></div></td><td>' + parts[0] + '</td></tr></table>');
                      }else{
                             $('#currentnews').append('<li data-icon="false" onclick="'+linkbuilder+'" style="font-size:small;background:#fbeecc;"><table><tr><td><div class="date"><div class="date-month">'+ dateparts[1] +'</div><div class="date-day">' + dateparts[0] + '</div></div></td><td>' + parts[0] + '</td></tr></table>');
                      }
                     count++;
                 });
            });
       });


           $('#sports').live('pageshow',function(event){
           $('#umslsports').append("Loading UMSL Sports News");                               
           $.getJSON("https://apps.umsl.edu/webapps/ITS/UMSLMobilev2/GetSports.cfm?callback=?",
				function(data){
				$('#umslsports').empty();
				count = 0;
				$.each(data, function(key,val){
					   parts = key.split("^");
					   date = parts[1];
					   
					   dateparts = date.split(" ");
					   //linkbuilder = "gosports('" + val + "')";
					   if(count % 2 == 1){
					   $('#umslsports').append('<li data-icon="false" onclick="openInAppBrowserBlank(\''+ val + '\');" style="font-size:small;background:#fdf6e5;"><table><tr><td><div class="date"><div class="date-month">'+ dateparts[1] +'</div><div class="date-day">' + dateparts[0] + '</div></div></td><td>' + parts[0] + '</td></tr></table></li>');
					   }else{
					   $('#umslsports').append('<li data-icon="false" onclick="openInAppBrowserBlank(\''+ val + '\')" style="font-size:small;background:#fbeecc;"><table><tr><td><div class="date"><div class="date-month">'+ dateparts[1] +'</div><div class="date-day">' + dateparts[0] + '</div></div></td><td>' + parts[0] + '</td></tr></table></li>');
					   
					   }
					   count++;
					   });
				$('#umslsports').listview('refresh');
				});
     	  });
     


       function playStream(src) {
		  try {
			var myaudio = new Audio(src);
			myaudio.id = 'playerMyAdio';
			myaudio.play();
		  } catch (e) {
			alert('no audio support!');
		  } 
		}
	

      $('#radio').live('pageshow',function(event){
           document.getElementById('dvradio').style.minHeight = document.body.offsetHeight - 45 + 'px' ; //'435px';
			 $.getJSON("https://apps.umsl.edu/webapps/ITS/UMSLMobilev2/getradiostations.cfm?callback=?",
							   function(data){
								$('#dvradio').empty();   
							   count = 0;
							   $.each(data, function(key,val){
       							 	  $('#dvradio').append('<a href="#" onclick="playStream(\'' + val + '\');var x=document.getElementById(\'station\');x.innerHTML=\'' + key + '\';	" data-role="button">' + key + '</a>').trigger('create');
                                     });
                                  $('#dvradio').listview('refresh');
							   });
				 
						 });
     

          $('#jubileenews').live('pageshow',function(event){
          $('#jubileenews2').empty();
		  $('#jubileenews2').append("Loading Jubilee  News");
            $.getJSON("https://apps.umsl.edu/webapps/ITS/UMSLMobilev2/GetNewsJubilee.cfm?callback=?",function(data){
          $('#jubileenews2').empty();
            count = 0;
            $.each(data, function(key,val){
                   parts = key.split("^");
                   date = parts[1];
                   dateparts = date.split(" ");
                   linkbuilder = "openInAppBrowserBlank('" + val + "')";
                      if(count % 2 == 1){
                             $('#jubileenews2').append('<li data-icon="false" onclick="'+ linkbuilder + '" style="font-size:small;background:#fdf6e5;"><table><tr><td><div class="date"><div class="date-month">'+ dateparts[1] +'</div><div class="date-day">' + dateparts[0] + '</div></div></td><td>' + parts[0] + '</td></tr></table>');
                      }else{
                             $('#jubileenews2').append('<li data-icon="false" onclick="'+ linkbuilder + '" style="font-size:small;background:#fbeecc;"><table><tr><td><div class="date"><div class="date-month">'+ dateparts[1] +'</div><div class="date-day">' + dateparts[0] + '</div></div></td><td>' + parts[0] + '</td></tr></table>');
                      }
                     count++;
                 });
          });
        });
      

          	function golab(week){
				  sessionStorage.setItem("labweek", week);
			//window.location = "labdetails.html";
		}
		
                $(':jqmData(url^=jubileeevents)').live('pagebeforecreate', 
                                                  function(event) {
                                                  $(this).filter(':jqmData(url*=ui-page)').find(':jqmData(role=header)')
                                                 .prepend('<a href="#" data-rel="back" data-icon="back">Back</a>')
                                                  });
                
                $('#jubileeevents').live('pagecreate',function(event){
                                           $.getJSON("https://apps.umsl.edu/webapps/ITS/UMSLMobilev2/GetJubileeevents.cfm?callback=?",
                                                     function(data){
                                                     $('#jevents').empty();
                                                     count = 0;
                                                     $.each(data, function(key,val){
														 title=val.eventer['title'];
														 linker =val.eventer['linker'];
														 datee=val.eventer['date'];
                                                         //description=val.eventer['descript'];
														 content=val.eventer['content'];
														 //replace
														 //content=content.replace("'",'(singlequote)');
														 // content=content.replace(",",'(comma)');  
														
															 $('#jevents').append('<li data-icon="false" style="background:#fdf6e5;"><a href="#jubileeeventsdetails" onclick="document.getElementById(\'htmlcontent\').innerHTML=\'LOADING.. \';golab(\'' + title + ',' + linker + '\'); popdata(\'' + encodeURIComponent(content) +'\');">' + title +'</a></li>');
														 count++;
													 });
                                                    $('#jevents').listview('refresh');
                                                     
                                              });  
                                           
               });
			   
			   function popdata(x){
				   xstring=x.replace('%3D%26%2339%3B','%3D');
				   xstrin=xstring.replace("%3D%26%2339%3B","%3D");
                   xstri=xstrin.replace("%3D%26%2339%3B","%3D");
				   xstr=xstri.replace("%2F%26%2339%3B","");
				   xst=xstr.replace("%2F%26%2339%3B","");	
				   document.getElementById('htmlcontent').innerHTML=decodeURIComponent(xst);
				   }
                

         $('#jubileeeventsdetails').live('pageshow',function(event){
        		 	document.getElementById('dvlabdetails').style.minHeight = document.body.offsetHeight - 45 + 'px' ; //'435px';
        		 	$('#labhours').empty();
					    labweek = sessionStorage.getItem('labweek');
        		 	substr = labweek.split(',');
					// content=substr[3]
					//content=content.replace('(singlequote)',"'"); 
					$('#labhours').append('<hr>');
        		 	//$('#labhours').append('<div  style="background:#fdf6e5;">Description:'+ substr[0] +  '</div>');
        		    //$('#labhours').append('<div  style="background:#fdf6e5;">Description:'+ (encodeURIComponent(substr[1])) +  '</div>');		 
        		 	
        	        //$('#labhours').append('<a href="openInAppBrowserBlank(\'' + substr[1] + '\')" > MORE INFORMATION</a>');
        	
        		 	$('#pheader').empty();
        		 	$('#pheader').append(substr[0]);
        		 	//$('#labhours').listview('refresh');
        		 });
        
      


	document.addEventListener("deviceready", function(){  },true);
	
	$(document).bind('pageinit', function dressWayne(){
        
        $('.objectSelect').objectBoxes();
        $('.sillyHat').sillyHats();
        $('.happyShirt').happyShirts();
        $('.handThing').handThing();
        $('.hugeBackground').hugeBackground();
 
	});
	

             $('#programinfo').live('pageshow',function(event){
					 $.getJSON("https://apps.umsl.edu/webapps/ITS/UMSLMobilev2/getprograminfo.cfm?callback=?",
							   function(data){
							   $('#ulprograminfo').empty();
							   count = 0;
							   $.each(data, function(key,val){
									  if(count % 2 == 1){
									  $('#ulprograminfo').append('<li data-icon="false" style="background:#fdf6e5;" onclick="openInAppBrowserBlank(\'' + val + '\')" >' + key + '</li>'); 
									  }else{
									  $('#ulprograminfo').append('<li data-icon="false" style="background:#fbeecc;" onclick="openInAppBrowserBlank(\'' + val + '\')" >' + key + '</li>');
									  }
									  count++;
									  });
							   $('#ulprograminfo').listview('refresh');
							   });  
					 });
      

        
                $('#directory').live('pageshow',function(event, ui){
                    document.getElementById('dvdirectory').style.minHeight = document.body.offsetHeight - 45 + 'px' ; //'435px';
                
                });
                
                function setddD(val){
                    
                    sessionStorage.setItem("directoryid", val);
                    
                }
                
                function searchSubmitIt(){
                    searchstring = jQuery.trim(document.getElementById("search-basic").value);
                    $('#searchresultsDir').html('<li>Searching...');
                    searchurl = "https://apps.umsl.edu/webapps/ITS/UMSLMobilev2/getsearch.cfm?searchname=" + searchstring + "&callback=?"
                    $.getJSON(searchurl,
                              function(data){
                              $('#searchresultsDir').empty();
                              $.each(data, function(key,val){
                                     parts = key.split("^");
                                     $('#searchresultsDir').append('<li data-icon="false"><a href="#directorydetails" onclick="setddD(' + "'" + val + "'" + ')"/>' + key);
                                     
                                     });
                              $('#searchresultsDir').listview('refresh');
                              });
			        
                }
       

                    $('#directorydetails').live('pageshow',function(event, ui){
                                         
                        var dd = sessionStorage.getItem('directoryid');
                                         
                        document.getElementById('dvdirectorydetails').style.minHeight = document.body.offsetHeight - 45 + 'px' ; //'435px';
                        parts = dd.split("^");
                        $('#name').html("");
                        $('#title').html("");
                        $('#name').html(parts[3]);
                        $('#title').html(parts[2]);
                        $("#email .ui-btn-text").text(parts[1]);
                        $("#phone .ui-btn-text").text(parts[0]);
                        $("#email").attr("href", "mailto:" + parts[1]);
                        $("#phone").attr("href", "tel:" + parts[0]);
                                         
                                         
                                         
                 });
       

	     $('#campussafety').live('pageshow',function(event){
         document.getElementById('dvCampusSafety').style.minHeight = document.body.offsetHeight - 45 + 'px' ; //'435px';
         $.getJSON("https://apps.umsl.edu/webapps/ITS/UMSLMobilev2/getcampussafety.cfm?callback=?",
            function(data){
               
			   count = 0;
			   $('#dvCampusSafety').empty();
               $.each(data, function(key,val){
                  $('#dvCampusSafety').append(val).trigger('create');
               });
           });  
         });
      

       $('#planner').live('pageshow',function(event){
           document.getElementById('dvplanner').style.minHeight = document.body.offsetHeight - 45 + 'px' ; //'435px';
       });
       function plannerlogin(){
			username = jQuery.trim(document.getElementById("username").value).toLowerCase();
			password = jQuery.trim(document.getElementById("password").value);
			
			$.ajax({
				   type: "POST",
				   url: "https://apps.umsl.edu/webapps/ITS/UMSLMobilev2/secure/remotelogin.cfm?callback=?",
				   data: "username=" + username + "&password=" + password,
				   contentType: "text/plain; charset=utf-8",
				   dataType: 'jsonp',
				   success: plannerloggedin,
				   error: errorfunction
				   });
		}
     	function plannerloggedin(){
			$.mobile.changePage("#plannerdownload");
		}
		function errorfunction(xhr, ajaxOptions, thrownError){
			 navigator.notification.alert(
										   'Unable to contact the UMSL servers.',  // message
										   alertDismissed,         // callback
										   'Status',            // title
										   'Done'                  // buttonName
										   );
		}
		

         $('#plannerdownload').live('pageshow',function(event){
              document.getElementById('dvplannerdownload').style.minHeight = document.body.offsetHeight - 45 + 'px' ; //'435px';
         });
         function downloadCourses(){
                    email = jQuery.trim(document.getElementById("crsemailaddress").value);
                    emailsent();
                    $.ajax({
                           type: "POST",
                           url: "https://apps.umsl.edu/webapps/ITS/UMSLMobilev2/secure/getcourseschedule.cfm?callback=?",
                           data: "email=" + email,
                           contentType: "text/plain; charset=utf-8",
                           dataType: 'jsonp',
                           success: emailsent,
                           error: emailfailed
                           });
                    }
                    function emailsent(){
                        navigator.notification.alert(
                                                     'You will receive an email shortly with your schedule.',  // message
                                                     plannercomplete,         // callback
                                                     'Status',            // title
                                                     'Done'                  // buttonName
                                                     );
                       plannercomplete();
                    }
                    function emailfailed(xhr, ajaxOptions, thrownError){
                    }
                    function plannercomplete(){
                    	$.mobile.changePage("#page4");
                    }
      

         $('#feedback').live('pageshow',function(event){
                 document.getElementById('dvfeedback').style.minHeight = document.body.offsetHeight - 45 + 'px' ; //'435px';
          });
          function emailSubmit(){
                  emailString = jQuery.trim(document.getElementById("textarea-f").value);
                  from = jQuery.trim(document.getElementById("fromemail-feedback").value);
                  hash = hex_md5("mobileisfunandfresh" + from);
                  
                  $.ajax({
                         type: "POST",
                         url: "https://apps.umsl.edu/webapps/ITS/UMSLMobilev2/sendemail.cfm?callback=?",
                         data: "emailtext=" + emailString + "&from=" + from + "&encoded=" + hash + "&toaddress=webmarketing@umsl.edu&subject=Feedback from Windows Mobile App",
                         contentType: "text/plain; charset=utf-8",
                         dataType: 'jsonp',
                         callback: emailsent,
                         success: emailsent,
                         error: feedbackerrorfunction
                         });
              }
              function emailsent(){  }
              function feedbackerrorfunction(xhr, ajaxOptions, thrownError){
                  if(xhr.status == "200"){
                      navigator.notification.alert(
                                                   'Email Sent!',  // message
                                                   alertDismissed,         // callback
                                                   'Status',            // title
                                                   'Done'                  // buttonName
                                                   );
                  }else{
                      navigator.notification.alert(
                                                   'Email Failed!',  // message
                                                   alertDismissed,         // callback
                                                   'Status',            // title
                                                   'Done'                  // buttonName
                                                   );
                  }
              }
              

         $('#quickhelp').live('pageshow',function(event){
                         document.getElementById('dvquickhelp').style.minHeight = document.body.offsetHeight - 45 + 'px' ; //'435px';
         });
      

		function golabb(week){
				  sessionStorage.setItem("labweeka", week);
			//window.location = "labdetails.html";
		}
		$(':jqmData(url^=labinfo)').live('pagebeforecreate', 
					function(event) {
					$(this).filter(':jqmData(url*=ui-page)').find(':jqmData(role=header)')
				   .prepend('<a href="#" data-rel="back" data-icon="back">Back</a>')
					});
		$('#labinfo').live('pagecreate',function(event){
				   $.getJSON("https://apps.umsl.edu/webapps/ITS/UMSLMobilev2/getlabinfo.cfm?callback=?",
							 function(data){
							 $('#labinfoul').empty();
							 count = 0;
							 $.each(data.labs, function(i,item){
								if(count % 2 == 1){
									$('#labinfoul').append('<li data-icon="false" style="background:#fdf6e5;"><a href="#labdetails" onclick="golabb(\'' + item.monday+  ',' + item.tuesday+ ',' + item.wednesday + ',' + item.thursday +',' + item.friday+',' + item.saturday+',' + item.sunday+',' + i +'\')">' + i + '</a></li>' );
								 }else{
									 $('#labinfoul').append('<li data-icon="false" style="background:#fbeecc;"><a href="#labdetails" onclick="golabb(\'' + item.monday+  ',' + item.tuesday+ ',' + item.wednesday + ',' + item.thursday +',' + item.friday+',' + item.saturday+',' + item.sunday+',' + i +'\')">' + i + '</a></li>' );
								 } 
								 count++; 
							});
							$('#labinfoul').listview('refresh');
						 });  
				   });


         $('#labdetails').live('pageshow',function(event){
        		 	document.getElementById('dvlabdetails').style.minHeight = document.body.offsetHeight - 45 + 'px' ; //'435px';
        		 	$('#labhours1').empty();
					    labweek = sessionStorage.getItem('labweeka');
        		 	substr = labweek.split(',');
        		 	$('#labhours1').append('<li style="background:#fdf6e5;">Monday:'+ substr[0] +  '</li>');
        		 	$('#labhours1').append('<li style="background:#fbeecc;">Tuesday:'+ substr[1] +  '</li>');
        		 	$('#labhours1').append('<li style="background:#fdf6e5;">Wednesday:'+ substr[2] +  '</li>');
        		 	$('#labhours1').append('<li style="background:#fbeecc;">Thursday:'+ substr[3] +  '</li>');
        		 	$('#labhours1').append('<li style="background:#fdf6e5;">Friday:'+ substr[4] +  '</li>');
        		 	$('#labhours1').append('<li style="background:#fbeecc;">Saturday:'+ substr[5] +  '</li>');
        		 	$('#labhours1').append('<li style="background:#fdf6e5;">Sunday:'+ substr[6] +  '</li>');
        		 	$('#pheader').empty();
        		 	$('#pheader').append(substr[7]);
        		 	$('#labhours1').listview('refresh');
        		 });
      

		  function searchSubmit(){
			        
					$('#searchresults2').text('   SEARCHING....');
					$('#searchresults2').append('<br>');
					$('#searchresults2').empty('');   
					searchstring = jQuery.trim(document.getElementById("search-basic2").value);
					   $(function(){
							url = "https://apps.umsl.edu/webapps/ITS/UMSLMobilev2/getlibrarysearch.cfm?searchname=" + searchstring + "&callback=?";
							$.ajax({
							type: "GET",
							url: 'https://ajax.googleapis.com/ajax/services/feed/load?v=1.0&num=1000&callback=?&q=' + encodeURIComponent(url),
							dataType: 'json',
							error: function(){
								alert('Unable to load feed, Incorrect path or invalid feed');
							},
							success: function(xml){
								   count=0;		 
								  $('#searchresults2').empty(); 	
								  if(xml==null){alert('NULL');}	
  								  for (var i = 0; i < xml.responseData.feed.entries.length; i++) {
									   if(count % 2 == 1){								
										 item = "<li onclick=\"openInAppBrowserBlank('"+xml.responseData.feed.entries[i].link+"')\" style='font-size:small;background:#fdf6e5;margin-bottom:15px; border:1px #cccccc solid' >" + "<table><tr><td>&nbsp;&nbsp<b>" + xml.responseData.feed.entries[i].title +"</b><br>&nbsp;&nbsp;&nbsp;" + xml.responseData.feed.entries[i].contentSnippet +"</td></tr></table></li>";
									   }else{
										 item = "<li onclick=\"openInAppBrowserBlank('"+xml.responseData.feed.entries[i].link+"')\" style='font-size:small;background:#fbeecc;margin-bottom:15px; border:1px #cccccc solid' >" + "<table><tr><td>&nbsp;&nbsp;<b>" + xml.responseData.feed.entries[i].title +"</b><br>&nbsp;&nbsp;&nbsp;" + xml.responseData.feed.entries[i].contentSnippet +"</td></tr></table></li>";
									   }
									
									$('#searchresults2').append(item);
									count++;
								  }

								/*values = item;  
								console.log(values);*/
							}
						});
					});
				 }
 

                $('#librarydetails').live('pageshow',function(event, ui){
                        var dd = sessionStorage.getItem('libraryid');
						document.getElementById('test').innerHTML=dd;                
                                             
                 });
      

        function setcalid(id){
          sessionStorage.setItem("calid", id);
        }
        $('#calendar').live('pageshow',function(event){
                                    $('#umslcalendar').html("Loading UMSL Calendar");
                                    //alert('hi');
                                    var arr = [];
                                    $.getJSON("https://apps.umsl.edu/webapps/ITS/UMSLMobilev2/GetCalendar.cfm?callback=?",
                                              function(data){
                                              $('#umslcalendar').empty();
                                              count = 0;
                                              $.each(data, function(key,val){
                                                     substr = val.split('^');
                                                     refid = key.split('-');
                                                     if(jQuery.inArray(substr[1], arr) == '-1'){
                                                     $('#umslcalendar').append('<li data-role="list-divider" data-icon="false">' + substr[1]);
                                                     arr.push(substr[1]);
                                                     if(count % 2 == 1){
                                                     $('#umslcalendar').append('<li data-icon="false" style="background:#fdf6e5;"><a href="#calendardetails" onclick="setcalid('+ refid[1] + ')">' + substr[0] +'</a>');
                                                        count++;
                                                     }else{
                                                        $('#umslcalendar').append('<li data-icon="false" style="background:#fbeecc;"><a href="#calendardetails" onclick="setcalid('+ refid[1] + ')">' + substr[0] +'</a>');
                                                        count++;
                                                        }
                                                        }
                                                        else{
                                                        if(count % 2 == 1){
                                                        $('#umslcalendar').append('<li data-icon="false" style="background:#fdf6e5;"><a href="#calendardetails" onclick="setcalid('+ refid[1] + ')">' + substr[0] +'</a>');
                                                        count++;
                                                        }else{
                                                        $('#umslcalendar').append('<li data-icon="false" style="background:#fbeecc;"><a href="#calendardetails" onclick="setcalid('+ refid[1] + ')">' + substr[0] +'</a>');
                                                        count++;
                                                        }
                                                        }
                                                        });
                                                        $('#umslcalendar').listview('refresh');
                                                        });
                                                        });
                                                      

                $('#calendardetails').live('pageshow',function(event, ui){
                                         var id = sessionStorage.getItem('calid');
                                         document.getElementById('dvnews').style.minHeight = document.body.offsetHeight - 45 + 'px' ; //'435px';
                                         $('#event-name').empty();                                       
                                         $('#event-date').empty();
                                         $('#event-time').empty();
                                         $('#event-desc').empty();
                                         $('#event-audience').empty();
                                         $('#event-location').empty();
                                         var url = "https://apps.umsl.edu/webapps/ITS/UMSLMobilev2/GetCalendarDetails.cfm?id="+ id +"&callback=?"
                                         $.getJSON(url,
                                                   function(data){
                                                   // $('#umslcalendar').empty();
                                                   count = 0;
                                                   $.each(data, function(key,val){
                                                          substr = val.split('^');
                                                          $('#event-name').html(key);
                                                          //document.getElementById('event-name').innerHTML = key;
                                                          $('#event-date').html(substr[1]);
                                                          $('#event-time').html(substr[2] + " - " + substr[3]);
                                                          $('#event-desc').html(substr[0]);
                                                          $('#event-location').html(substr[4]);
                                                          $('#event-audience').html(substr[8]);
                                                          });
                                                    });
                                         });
                

     $('#academiccalendar').live('pageshow',function(event){
                      document.getElementById('dvacademiccalendar').style.minHeight = document.body.offsetHeight - 45 + 'px' ;
                                     $.getJSON("https://apps.umsl.edu/webapps/ITS/UMSLMobilev2/GetAcademicEvents.cfm?callback=?",
                                               function(data){
                                               $('#ulacadcalendar2').empty();
                                               count = 0;
                                               $.each(data, function(key,val){
                                                       parts = key.split("^");
													   date = parts[0];
													   dateparts = date.split(" ");
													  /* linkbuilder = "openInAppBrowserBlank('" + val + "')";*/
													   if(count % 2 == 1){
																 $('#ulacadcalendar2').append('<li data-icon="false" style="font-size:small;background:#fdf6e5;"><table><tr><td>'+ dateparts[0] +' ' + dateparts[1] + ' : ' + parts[1] + '</td></tr></table>');
														  }else{
																 $('#ulacadcalendar2').append('<li data-icon="false" style="font-size:small;background:#fbeecc;"><table><tr><td>'+ dateparts[0] +' ' + dateparts[1] + ' : ' + parts[1] + '</td></tr></table>');
														  }
														 count++;
													 });
        
                                               $('#ulacadcalendar2').listview('refresh');
                                               
                                               });  
                                     
                                     });


					function golabx(week){
					      sessionStorage.setItem("labweek", week);
            		//window.location = "labdetails.html";
            		
            	}
            	
                $(':jqmData(url^=touhill_events)').live('pagebeforecreate', 
                                                  function(event) {
                                                  $(this).filter(':jqmData(url*=ui-page)').find(':jqmData(role=header)')
                                                 .prepend('<a href="#" data-rel="back" data-icon="back">Back</a>')
                                                  });
                
                $('#touhill_events').live('pagecreate',function(event){
                                           $.getJSON("https://apps.umsl.edu/webapps/ITS/UMSLMobilev2/GetTouhillevents.cfm?callback=?",
                                                     function(data){
                                                     $('#labinfoul3').empty();
                                                     count = 0;
                                                     $.each(data, function(key,val){
														 tit=val.eventer['title'];
														 titarray=tit.split("^");
														// alert("key:"+key+",val:"+val+"");
														 linkbuilder ="gotouhill('" + val.eventer['location'] + "')";
														 datelist=val.eventer['datelist'];
                                                         description=val.eventer['descript'];
												
														 $('#labinfoul3').append('<li data-role="list-divider">' + val.eventer['date'] + '</li>'
														 + '<li><a href="#touhilleventsdetails" onclick="golabx(\'' + val.eventer['id'] + ',' + titarray[0] + ',' + titarray[1] + ',' + val.eventer['date'] + ',' + description + ', '+val.eventer['location']+', '+ datelist + '\')"><img src="https://apps.umsl.edu/webapps/ITS/UMSLMobilev2/PictureGen.cfm?id=' 
														 + val.eventer['id'] + '" /><p style="text-overflow: ellipsis;overflow: visible;white-space: normal;font-weight:bolder;font-size:medium">' 
														 + titarray[0] + '</p><p style="text-overflow: ellipsis;overflow: visible;white-space: normal;font-weight:bolder;font-size:small">'+ titarray[1] + '</p></a></li>');
														 count++;
													 });
                                                    $('#labinfoul3').listview('refresh');
                                                     
                                              });  
                                           
               });
                

         // Bind to the navigate event
		 $('#touhilleventsdetails').live('pageshow',function(event){
        		 	document.getElementById('dvtouhilleventsdetails').style.minHeight = document.body.offsetHeight - 45 + 'px' ; //'435px';
        		 	$('#touhilleventshours').empty();
					    labweek = sessionStorage.getItem('labweek');
        		 	substr = labweek.split(',');
					//datelist=substr[6];
        		    // datelister=datelist.replace("^","<br>");
					//datelist=substr[6].replace("|","<br>");
					$('#touhilleventshours').append('<div align="center"><img id="displayimages" width="150px" height="150px" src="https://apps.umsl.edu/webapps/ITS/UMSLMobilev2/PictureGen.cfm?id='+substr[0]+'" style="border:3px black solid;" ></div>');
					$('#touhilleventshours').append('<p>'+ substr[2] +  '</p>');
					$('#touhilleventshours').append('<p>DATE: '+ substr[3] + '</p>');
					$('#touhilleventshours').append('<p id="subject">'+  substr[6] +  '</p>');
        		 	$('#touhilleventshours').append('<p>LOCATION: '+ substr[5] +  '</p>');
					$('#touhilleventshours').append('<p id="subject2">'+ substr[4] +  '</p>');
         		    $('#touhilleventshours').append('<input value=" MORE INFORMATION " onclick="openInAppBrowserBlank(\'http://www.touhill.org/default.asp?touhill=51&objId='+substr[0]+'\');" data-icon="delete" data-theme="b" type="button">');
        		 	$('#pheader').empty();
        		 	$('#pheader').append(substr[1]);
        		 	//$('#touhilleventshours').listview('refresh');
        		 });
      

                 $('#tritonnews').live('pageshow',function(event){
                                $('#trinews').append("Loading Triton Schedule");                               
                                $.getJSON("https://apps.umsl.edu/webapps/ITS/UMSLMobilev2/GetTritonNews.cfm?callback=?",
                                          function(data){
                                          $('#trinews').empty();
                                          count = 0;
                                          $.each(data, function(key,val){
                                                 parts = key.split("^");
                                                 date = parts[1];
                                                 
                                                 dateparts = date.split(" ");
                                                 /*linkbuilder = "gosports('" + val + "')";*/
                                                 if(count % 2 == 1){
                                                 $('#trinews').append('<li data-icon="false" onclick="openInAppBrowserBlank(\''+ val + '\')" style="font-size:small;background:#fdf6e5;"><table><tr><td><div class="date"><div class="date-month">'+ dateparts[1] +'</div><div class="date-day">' + dateparts[0] + '</div></div></td><td>' + parts[0] + '</td></tr></table></li>');
                                                 }else{
                                                 $('#trinews').append('<li data-icon="false" onclick="openInAppBrowserBlank(\''+ val + '\')" style="font-size:small;background:#fbeecc;"><table><tr><td><div class="date"><div class="date-month">'+ dateparts[1] +'</div><div class="date-day">' + dateparts[0] + '</div></div></td><td>' + parts[0] + '</td></tr></table></li>');
                                                 
                                                 }
                                                 count++;
                                                 });
                                          $('#trinews').listview('refresh');
                                          });
                                });
      

$(document).bind("mobileinit", function(){
       $.mobile.touchOverflowEnabled = true;
});

/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
describe('app', function() {
    describe('initialize', function() {
        it('should bind deviceready', function() {
            runs(function() {
                spyOn(app, 'onDeviceReady');
                app.initialize();
                helper.trigger(window.document, 'deviceready');
            });

            waitsFor(function() {
                return (app.onDeviceReady.calls.length > 0);
            }, 'onDeviceReady should be called once', 500);

            runs(function() {
                expect(app.onDeviceReady).toHaveBeenCalled();
            });
        });
    });

    describe('onDeviceReady', function() {
        it('should report that it fired', function() {
            spyOn(app, 'receivedEvent');
            app.onDeviceReady();
            expect(app.receivedEvent).toHaveBeenCalledWith('deviceready');
        });
    });

    describe('receivedEvent', function() {
        beforeEach(function() {
            var el = document.getElementById('stage');
            el.innerHTML = ['<div id="deviceready">',
                            '    <p class="event listening">Listening</p>',
                            '    <p class="event received">Received</p>',
                            '</div>'].join('\n');
        });

        it('should hide the listening element', function() {
            app.receivedEvent('deviceready');
            var displayStyle = helper.getComputedStyle('#deviceready .listening', 'display');
            expect(displayStyle).toEqual('none');
        });

        it('should show the received element', function() {
            app.receivedEvent('deviceready');
            var displayStyle = helper.getComputedStyle('#deviceready .received', 'display');
            expect(displayStyle).toEqual('block');
        });
    });
});


$.fn.objectBoxes = function () {
        
        
 
        $(this).click(function () {
             // closes divs
             $('.objectToggle').fadeOut(0);
             // this var stores which button was clicked
             var toggleClick = $(this);
             // this reads the rel attribute of the button to determine which div id to toggle
             var toggleDiv = $(this).attr('rel');
             // fade the div in
             $(toggleDiv).fadeIn();
             
             
          return false;
 
        });
 
    };

$.fn.sillyHats = function () {
        
        
 
        $(this).click(function () {
             // closes divs
             $('.hatToggle').fadeOut(10);
             // this var stores which button was clicked
             var toggleClick = $(this);
             // this reads the rel attribute of the button to determine which div id to toggle
             var toggleDiv = $(this).attr('rel');
             // fade the div in
             $(toggleDiv).fadeIn();
             
             
          return false;
 
        });
 
    };
    
$.fn.happyShirts = function () {
        
        
 
        $(this).click(function () {
             // closes divs
             $('.shirtToggle').fadeOut(10);
             // this var stores which button was clicked
             var toggleClick = $(this);
             // this reads the rel attribute of the button to determine which div id to toggle
             var toggleDiv = $(this).attr('rel');
             // fade the div in
             $(toggleDiv).fadeIn();
             
             
          return false;
 
        });
 
    };
$.fn.handThing = function () {
        
        
 
        $(this).click(function () {
             // closes divs
             $('.handToggle').fadeOut(10);
             $('#themanhimself').fadeOut(0);
             // this var stores which button was clicked
             var toggleClick = $(this);
             // this reads the rel attribute of the button to determine which div id to toggle
             var toggleDiv = $(this).attr('rel');
             // fade the div in
             $('#themanhimselfempty').fadeIn(0);
             $(toggleDiv).fadeIn();
             
             
             
          return false;
 
        });
 
    };
$.fn.hugeBackground = function () {
        
        
 
        $(this).click(function () {
             // closes divs
             $('.backgroundToggle').fadeOut(10);
             // this var stores which button was clicked
             var toggleClick = $(this);
             // this reads the rel attribute of the button to determine which div id to toggle
             var toggleDiv = $(this).attr('rel');
             // fade the div in
             $(toggleDiv).fadeIn();
             
             
          return false;
 
        });
 
    };

/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicity call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
};

