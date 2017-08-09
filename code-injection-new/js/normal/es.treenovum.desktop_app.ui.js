



    	
    	var lang = "en";
    	
        function menu1() {
            window.location.href = lang + "/info_1.html";
        }    
        function menu2() {
            window.location.href = lang + "/info_2.html";
        }    
        function menu3() {
            window.location.href = lang + "/info_3.html";
        }    
        function menu4() {
            window.location.href = lang + "/info_4.html";
        }    
        function menu5() {
            window.location.href = lang + "/info_5.html";
        }    
        
        function translations(){
        	setLocalizedText('lbl_help','#title');
			setLocalizedText('btn_back1_btn','#backButton1');
			setLocalizedText('btn_back2_btn','#backButton2');
			setLocalizedText('btn_back3_btn','#backButton3');
			setLocalizedText('btn_back4_btn','#backButton4');
			setLocalizedText('btn_back5_btn','#backButton5');
			
	    }
        
        function load(){
			if (!isIPhone()) {
				android.disableZoom();
				translations();
				lang = android.getText("lang");
			}
        }

    




        function goback() {
            window.location.href = "info.html";
        } 

    



        function goback() {
            window.location.href = "info.html";
        } 

    



        function goback() {
            window.location.href = "info.html";
        }    
        android.enableZoom();
    




 
			
			
			function go_to(pid) { 
				window.location.href = "terminal.html?t_id="+pid;
			}
			
			function load() {
				
				//localStorage.clear();
				
				try {
					var favs = localStorage.getItem('favs');
					if (favs) {

						favs = JSON.parse(favs);
						
						$.each(favs, function(index,value) {   
							$('#buttons').append('<div ontouchstart="this.className=\'css3button pushed\';" ontouchend="this.className=\'css3button\';" class="css3button" onclick="go_to(\'' + index + '\');">' + value + '</div>');   
						});
					}
					
				}
				catch (err) {
					alert('Error: ' + err);
				}
				
				translations();
			}
			
			function translations(){
				setLocalizedText('lbl_mystations','#lbl_mystations');
		    }
			
			
		

 
  
 
     var tdata="";
     var selid=0;
     var mymap = null;
     var mtype=1;
     var terminals = new Array();
     var lang = "en";
     
      
     //var terminal_url="http://s221041438.mialojamiento.es/swissSmartMedia/publibike/getterminals.php";
     //var terminal_url="https://www.publibike.ch/myinterfaces/terminals.de.json";
     var terminal_url="http://s221041438.mialojamiento.es/swissSmartMedia/publibike/getterminals.php?language=";
  



           
   var myLatlngGlobal;
                               
   $(document).ready(function() { 
	
	   $("#change_maptype").click(function() {      
	          if(mtype==1){
	           mymap.setMapTypeId(google.maps.MapTypeId.SATELLITE);
	           mtype=2;
	          }else
	          {
	           mymap.setMapTypeId(google.maps.MapTypeId.ROADMAP);
	           mtype=1;
	          }
	          
	   });
	
	   $("#go_to_terminal").click(function() {   
	         //loadterminals();   
	        // alert("OK!");
	          
	   });
   
        
   });   

    /*function loadterminals(filter)
    {
     $.ajax({ url: terminal_url, success: loadterminals2(data){alert(data);} } );
    }*/
    function loadterminals(filter)
    {
    	

       var tdata="";
    
       var url = terminal_url + lang;
       tdata = $.ajax({
    	   url: url,
    	   data:{},
    	   error:function(xhr,status,error){
    		   showLocalizedAlert("dlg_ajax_error_msg"); 
    	   },
    	   async: false}).responseText;
  
       
       var json_response = JSON.parse(tdata);
       
      var i=0;
      for(i=0;i<json_response.terminals.length;i++)
      {
        var curr_terminal = json_response.terminals[i];
        
        myLatlngGlobal = new google.maps.LatLng(curr_terminal.lat, curr_terminal.lng);
        addterminal(curr_terminal.name,curr_terminal.lat,curr_terminal.lng,curr_terminal.terminalid,curr_terminal.status,curr_terminal.address,curr_terminal.cntfree,curr_terminal.cntefree,curr_terminal.cntvelo,curr_terminal.cntebike);
      }
      
    
    }
    
    function addterminal(tname,lat,lng,id,tstatus,address,cntfree,cntefree,cntvelo,cntebike)
    {
                
        var mkLatLng = new google.maps.LatLng(lat,lng);
        var image = '';
        var img_container = '';
        var statustext="";
        
        img_container ="http://s221041438.mialojamiento.es/swissSmartMedia/publibike/images/";
        //img_container ="images/";
        image = img_container + 'icon_gruen-gruen.png';
        //image='images/icon_gruen-gruen.png';
        
        
        if(tstatus==1)
        {
          //statustext='<div style="background-color:#00ff00;" id="marker">offen</div>';
        	statustext='offen';
            if(cntvelo<3){
            	image = img_container + 'icon_gelb-gruen.png';}
            
            if(cntfree<3){
                image=img_container + 'icon_gruen-gelb.png';}
            
            if(cntvelo<=0){
                image=img_container + 'icon_rot-gruen.png';}
            
            if(cntfree<=0){
                image=img_container + 'icon_gruen-rot.png';}
            
        }

        if(tstatus==0)
        {
            statustext='geplant';
            image=img_container + 'icon_weiss-weiss.png';
            
        }
        if(tstatus==2)
        {
            statustext='geschlossen';

            image=img_container + 'icon_rot-rot.png';
            
        }
        if(tstatus==3)
        {
            statustext='geschlossen';
            image=img_container + 'icon_rot-rot.png';
            
        }
        
        
        var terminal = new google.maps.Marker({
	        position: mkLatLng,
	        map: mymap,
	        title: tname,
	        icon: image
        });    

        // icon: image
        
        google.maps.event.addListener(terminal, 'click', function() {
         
         
         window.location.href="terminal.html?t_id="+id;                            
         
         
        });
        
        terminals.push(terminal);
    }

     function current_position() {
         
		 if (isIPhone()) {
			window.location.href = "start.html?cmd=gps";			
		 }
		 else {
			var pos = android.getCurrentGeoPoint();
			loc = jQuery.parseJSON(pos);
		  
			setMapPosition(loc.lat,loc.lng);		     

		 }
	}
	 
	 function setMapPosition(lat,lng) {
		var myLatlngx;
		if (typeof lng=="undefined" || typeof lat=="undefined") {
		 
		}
		else {

			myLatlngx = new google.maps.LatLng(lat, lng);
			mymap.setCenter(myLatlngx);

			var curr = new google.maps.Marker({
				position: myLatlngx,
				map: mymap,
				title: "me"
			});

			mymap.setZoom(11);
		}	
	 }
	 
	 function translations(){
		 if(!isIPhone()){
    		lang = android.getText("lang");
    		setLocalizedText('btn_current_pos','#btn_current_pos');
    	} 
	 }
     
    function load() {
    
    	translations();
    	
		try {
    	
			var myLatlng;
			myLatlng = new google.maps.LatLng(46.75, 7.6166667);
				
			var myOptions = {
			  zoom: 6,
			  mapTypeControl: true,
			  navigationControl: true,
			  center: myLatlng,
			  mapTypeId: google.maps.MapTypeId.HYBRID, 
			  streetViewControl: false
			};           
			var wh = $(window).height();
			var style="width:300px;height:" + (wh-110) + "px;";

			$("#mymap").attr( "style", style); 

			mymap = new google.maps.Map(document.getElementById("mymap"), myOptions);
			
			  
			loadterminals("all");
			

			if(myLatlngGlobal!=null) {
				myLatlng=myLatlngGlobal;
			}
			else {
				myLatlng = new google.maps.LatLng(46.75, 7.6166667);
			}
			
			var t_id = getVar('t_id');
			
			//var bicyclingLayer = null;
			//bicyclingLayer = new google.maps.BicyclingLayer();
			//bicyclingLayer.setMap(mymap);       
			
				
			if(t_id!="")
			{
			  //alert(getVar('lat')+","+getVar('lng'));	
			  var myLatlng_center = new google.maps.LatLng(getVar('lat'),getVar('lng'));
			  mymap.setCenter(myLatlng_center);
			  mymap.setZoom(10);
			}
			else
			{
				
				mymap.setCenter(myLatlng);
			}
		}
		catch (e) {
			mymap = null;
		}
 
    }

    function getVar(name)
    {
         get_string = document.location.search;         
         return_value = '';
         
         do { //This loop is made to catch all instances of any get variable.
            name_index = get_string.indexOf(name + '=');
            
            if(name_index != -1)
              {
              get_string = get_string.substr(name_index + name.length + 1, get_string.length - name_index);
              
              end_of_value = get_string.indexOf('&');
              if(end_of_value != -1)                
                value = get_string.substr(0, end_of_value);                
              else                
                value = get_string;                
                
              if(return_value == '' || value == '')
                 return_value += value;
              else
                 return_value += ', ' + value;
              }
            } while(name_index != -1)
            
         //Restores all the blank spaces.
         space = return_value.indexOf('+');
         while(space != -1)
         { 
	         return_value = return_value.substr(0, space) + ' ' + 
	         return_value.substr(space + 1, return_value.length);
			 
	         space = return_value.indexOf('+');
         }
          
         return(return_value);        
     }
	 
	 $.networkDetection = function(url,interval){
		var url = url;
		var interval = interval;
		online = false;
		this.StartPolling = function(){
			this.StopPolling();
			this.timer = setInterval(poll, interval);
		};
		this.StopPolling = function(){
			clearInterval(this.timer);
		};
		this.setPollInterval= function(i) {
			interval = i;
		};
		this.getOnlineStatus = function(){
			return online;
		};
		function poll() {
			$.ajax({
				type: "POST",
				url: url,
				dataType: "text",
				error: function(){
					online = false;
					$(document).trigger('status.networkDetection',[false]);
				},
				success: function(){
					online = true;
					$(document).trigger('status.networkDetection',[true]);
				}
			});
		};
	};
	    
    function refresh(){

		if (mymap!=null) {
		  while(terminals[0]){
			  terminals.pop().setMap(null);
		  }
		  
		  loadterminals("all");		
		}
		else {
			$.ajax({
				type: "GET",
				url: "http://www.google.com",
				dataType: "text",
				async: false,
				error: function(){
					showLocalizedAlert("dlg_ajax_error_msg");
				},
				success: function(){
					window.location.reload();
				},
				timeout: 1000
			});
		}
    }
     
 



 
  
     var terminal_url="http://s221041438.mialojamiento.es/swissSmartMedia/publibike/getterminals.php?language=";
     //var terminal_url="https://www.publibike.ch/myinterfaces/terminals.de.json";
     var global_t_id;
     var curr_terminal;
     
     var lbl_free = "";
     var lbl_courts = "";
     var lbl_open = "";
     var lbl_planned = "";
     var lbl_closed = "";
     var lbl_help = "";
     var lbl_loan = "";
     var lbl_bike = "";
     
  


    
   function go_to(pid) { 
         alert(pid);               
   }
   
   function add_fav (form) {
		 try {
			 var favs = localStorage.getItem('favs');
			 if (!favs) {
				 favs = new Object();
			 }
			 else {
				 favs = JSON.parse(favs);
			 }
			 
			 favs[global_t_id] = $('#terminal_name').text();
			 			 
			 var jsonFavs = JSON.stringify(favs);
			 
			 localStorage.setItem('favs', jsonFavs);
			 
			 document.location.href="favs.html";
		 }
		 catch (err) {
			 alert('Error: ' + err);
		 }

	 }
   

    function load() {
    	
    	if(!isIPhone()){
       		 translations();	 
        }
    	
     var t_id = getVar('t_id');
     global_t_id = t_id;
     var tdata="";

    
     var url = terminal_url + lang;
     
     tdata = $.ajax({
    	 url: url, 
    	 dataType: "json",
    	 async: false,
    	 success: function(json_response){
    		 setData(json_response,t_id);		 
    	 },
    	 error:function(){
    		 showLocalizedAlert("dlg_ajax_error_msg");
    	 }
    	 
   	 });
     
     
    }
    
    function setData(json_response, t_id){
    	 var i=0;
         for(i=0;i<json_response.terminals.length;i++)
         {
            
            curr_terminal = json_response.terminals[i];
            if(curr_terminal.terminalid==t_id){break;}
            
         }

         $('#terminal_name').replaceWith('<div class="title" id="terminal_name">'+curr_terminal.name+'</div>');
         var adr="";
         adr=curr_terminal.address;
         if(adr==null)
         {adr="";}
         $('#terminal_address').replaceWith('<span class="address" id="terminal_address">'+adr+'</span>');
         if(curr_terminal.status==1){
           $('#terminal_status_label').replaceWith('<span class="status_label" id="terminal_status_label">Status: </span>');
           $('#terminal_status').replaceWith('<span class="status_green" id="terminal_status">'+lbl_free+'</span><div style="height:10px;"></div>');
             
         }                      
            if(curr_terminal.status==0){
                $('#terminal_status_label').replaceWith('<span class="status_label" id="terminal_status_label">Status: </span>');
                $('#terminal_status').replaceWith('<span class="status_green" id="terminal_status">'+lbl_planned+'</span><div style="height:10px;"></div>');
                
            }   
            if(curr_terminal.status>1){
                $('#terminal_status_label').replaceWith('<span class="status_label" id="terminal_status_label">Status: </span>');
                $('#terminal_status').replaceWith('<span class="status_red" id="terminal_status">'+lbl_closed+'</span><div style="height:10px;"></div>');
                
            }           
       
            var timage=curr_terminal.image;
            if(timage==null)
            {
                
                timage="";
            }

            if(timage=="")
            {
                timage="http://s221041438.mialojamiento.es/swissSmartMedia/publibike/images/default.png";
            }
            else
            {
                var iarr = timage.split("/");
                
                timage="http://s221041438.mialojamiento.es/swissSmartMedia/publibike/images/"+iarr[iarr.length-1];
            }
         
         $('#terminal_image').replaceWith('<span style="display:none;" id="terminal_image"> <img src="'+timage+'"><br></span>');      
         $('#terminal_text').replaceWith('<span class="info_text" style=display:none;" id="terminal_text">'+curr_terminal.infotext+'<br><br></span>'); 
                 
         
            var result_str='<div id="terminal_velos">';
         
            result_str=result_str+'<div id="terminal_velos2" class="velos_container">';

            result_str = result_str + '<div class="css3row terminal">';	
            result_str = result_str + '<div class="terminal_container"><div class="terminal_id2">' +curr_terminal.cntebike+ '</div><div class="terminal_type2">E-Bike</div>';
            result_str=result_str+'<div class="terminal_status">'+lbl_loan+'</div>'; 
            result_str += "</div></div>";
            
            result_str = result_str + '<div class="css3row terminal last">';	
            result_str = result_str + '<div class="terminal_container"><div class="terminal_id2">' +curr_terminal.cntvelo+ '</div><div class="terminal_type2">'+lbl_bike+'</div>';
            result_str=result_str+'<div class="terminal_status">'+lbl_loan+'</div>'; 
            result_str += "</div></div>";
            
            result_str=result_str+'</div>'; 
            
            result_str=result_str+'<div id="terminal_velos3" class="velos_container">';
            
            result_str = result_str + '<div class="css3row terminal">';	
            result_str = result_str + '<div class="terminal_container"><div class="terminal_id">' +curr_terminal.cntefree+ '</div><div class="terminal_type">E-Bike</div>';
            result_str=result_str+'<div class="terminal_status2">'+lbl_courts+'</div>'; 
            result_str += "</div></div>";
            
            result_str = result_str + '<div class="css3row terminal last">';	
            result_str = result_str + '<div class="terminal_container"><div class="terminal_id">' +curr_terminal.cntfree+ '</div><div class="terminal_type">'+lbl_bike+'</div>';
            result_str=result_str+'<div class="terminal_status2">'+lbl_courts+'</div>'; 
            result_str += "</div></div>";
     
         	result_str=result_str+'</div>'; 

            result_str=result_str+'</div>'; 
            
            $('#terminal_velos').replaceWith(result_str);  

         
         
    }

    function display_onmap(pform) {
        
         window.location = "start.html?t_id="+global_t_id+"&lat="+curr_terminal.lat+"&lng="+curr_terminal.lng;
         
    }
    
    function translations(){
    	
    	lang = android.getText('lang');
    	
    	lbl_free = android.getText("lbl_free");
        lbl_courts = android.getText("lbl_return_courts");
        lbl_open = android.getText("lbl_open");
        lbl_planned =android.getText("lbl_planned");
        lbl_closed = android.getText("lbl_closed");
        lbl_help = android.getText("lbl_help");
        lbl_loan = android.getText("lbl_loan");
        lbl_bike = android.getText("lbl_bike");
    	
    	var btn_map = android.getText("btn_map");
        $('#btn_map').val(btn_map);
        
        var btn_statinfo = android.getText("btn_statinfo");
        $('#btn_statinfo').val(btn_statinfo);
        
        //btn_bikestatus
        var btn_bikestatus = android.getText("btn_bikestatus");
        $('#btn_bikestatus').val(btn_bikestatus);
        
        var btn_mystations = android.getText("btn_mystations");
        $('#btn_mystations').val(btn_mystations);
        
        var btn_details = android.getText("btn_details");
        $('#btn_details').val(btn_details);
    }
    
    function display_infos(pform) {
    
        document.getElementById('terminal_sponsor').style.display = 'inline';
        document.getElementById('terminal_image').style.display = 'inline';
        document.getElementById('terminal_text').style.display = 'inline';
        document.getElementById('buttons_info').style.display = 'inline';
            
        document.getElementById('terminal_status_label').style.display = 'none';
        document.getElementById('terminal_status').style.display = 'none';
        document.getElementById('terminal_velos').style.display = 'none';
        document.getElementById('buttons_velos').style.display = 'none';
    }
    
    function display_open(pform){
        var atext="";
        atext=curr_terminal.opentext;
        if(atext==null){atext="";}
        if(atext==""){atext="Derzeit gibt es zu dieser Station keine aktuellen Informationen.";}
		showText(atext,'Aktuelles');
    }

    function go_back(pform) {
        
        document.getElementById('terminal_status_label').style.display = 'inline';
        document.getElementById('terminal_status').style.display = 'inline';
        document.getElementById('terminal_velos').style.display = 'block';
        document.getElementById('buttons_velos').style.display = 'inline';

        document.getElementById('terminal_sponsor').style.display = 'none';
        document.getElementById('terminal_image').style.display = 'none';
        document.getElementById('terminal_text').style.display = 'none';
        document.getElementById('buttons_info').style.display = 'none';

    }
        
    function getVar(name)
    {
         get_string = document.location.search;         
         return_value = '';
         
         do { //This loop is made to catch all instances of any get variable.
            name_index = get_string.indexOf(name + '=');
            
            if(name_index != -1)
              {
              get_string = get_string.substr(name_index + name.length + 1, get_string.length - name_index);
              
              end_of_value = get_string.indexOf('&');
              if(end_of_value != -1)                
                value = get_string.substr(0, end_of_value);                
              else                
                value = get_string;                
                
              if(return_value == '' || value == '')
                 return_value += value;
              else
                 return_value += ', ' + value;
              }
            } while(name_index != -1)
            
         //Restores all the blank spaces.
         space = return_value.indexOf('+');
         while(space != -1)
              { 
              return_value = return_value.substr(0, space) + ' ' + 
              return_value.substr(space + 1, return_value.length);
							 
              space = return_value.indexOf('+');
              }
          
         return(return_value);        
     }
                                      
 



        function goback() {
            window.location.href = "info.html";
        }    

        function translations(){
			setLocalizedText('btn_back','#backButton');
		}
		
		function load(){
			if(!isIPhone()){
				translations();
			}
		}
    



        function goback() {
            window.location.href = "info.html";
        }
    





					
				var items = new Array();
				
				function open_item(i) {

					var item = items[i];
					
					$('#newsTitle').text(item.title);
					$('#newsDate').text(item.date);
					$('#newsDescription').html(item.description);

					$('#newsItemDetails').show();
					$('#newsList').hide();													
				}
				
				function showNewsList() {
					$('#newsItemDetails').hide();
					$('#newsList').show();
				}
					
				
				
				var loadNews = function() {
					//clear the content in the div for the next feed.
					
					
					$("#feedContent").empty();
					//$.get("https://www.publibike.ch/stream/de/cms/rssfeed-news.xml", function(d) 
					//$.get("http://twitter.com/statuses/user_timeline/47698262.rss", function(d) 
					//$.get("./getnews.html", function(d)
					
					$.get("http://s221041438.mialojamiento.es/swissSmartMedia/publibike/getnews.php", function(d) {
				    
						  
						  $('#feedContent').append('<table style="width:100%;">');
						  
						  
						  
						  //find each 'item' in the file and parse it
						  $(d).find('item').each(function() {
					      //$("[nodeName=item]", d).each(function(){
							 
							 //name the current found item this for this particular loop run
							 var $item = $(this);
							 // grab the post title
							 
							 var title = $item.find('title').text();
							 
							 
							 // grab the post's URL
							 var link = $item.find('link').text();
							 // next, the description

							 var description = linkify($item.find('description').text(),{      callback: function( text, href ) {
													return href ? '<a href="' + href + '">' + text + '</a>' : text;
												  },
											});
							 
							 
							 
							 //alert(description);
							 
							 //don't forget the pubdate
							var pubDate = new Date($item.find('pubDate').text());
							var date = pubDate.getDate() + "." + (pubDate.getMonth()+1) + "." + pubDate.getFullYear();
												 
							var newItem = new Object();
							
							newItem['title'] = title;
							newItem['date'] = date;
							newItem['description'] = description;
							items.push(newItem);
							
							var html = '<div style="display: block;" ontouchstart="this.className=\'css3button pushed\';" ontouchend="this.className=\'css3button\';" class="css3button" onclick="open_item(' + (items.length-1) + ');">';
							
							//html += '<tr>';
							
							html += '<div style="display: inline-block;vertical-align:top;width: 70%;">';
							
							html += title;
							
							html += '</div><div style="display:inline-block;width: 30%;text-align:right;">';

							html += date;
							
							html += '</div>';
							
							html += '</div>';
							
						
							 //put that feed content on the screen!
							 $('#feedContent').append($(html));  
						});
						
						 $('#feedContent').append('</table>');
					},"xml").error(function() {
						
							
							showLocalizedAlert("dlg_ajax_error_msg");
						});
					
					
					
				}
					
					
					$(document).ready(loadNews);
				
					function translations(){
						setLocalizedText('btn_back','#backButton');
					}
					
					function load(){
						if(!isIPhone()){
							translations();
						}
					}
					
				


 
  
 
     var tdata="";
     var lang = "en";
     var label1 = "";
     var empty_search = "";
     
     //var url = "https://www.publibike.ch/myinterfaces/terminals.de.json";
     var url="http://s221041438.mialojamiento.es/swissSmartMedia/publibike/getterminals.php?language=";
     
	



           
   

 	function GetChar (event){
     	var chCode = ('charCode' in event) ? event.charCode : event.keyCode;
     	if(chCode==13){
     		var btn = document.getElementById("id_startsearch");
     		btn.click();
     	}
 	}
 	
   function go_to(pid) { 
         window.location.href = "terminal.html?t_id="+pid;               
   }
   
    function tsearch(pform) {
        //alert("OK: "+pform.searchstring.value);

        var tdata="";
        var result_str='';
        var bfound=0;
        //terminal_url="https://www.publibike.ch/myinterfaces/terminals.de.json?searchtext="+pform.searchstring.value;
        var terminal_url = url + lang + "&searchtext=" + pform.searchstring.value
        
        var imgstr='http://s221041438.mialojamiento.es/swissSmartMedia/publibike/images/green.png';
        
        tdata = $.ajax({
        	url: terminal_url, 
        	async: false, 
        	error:function(){
        		showLocalizedAlert("dlg_ajax_error_msg");
        	}
        }).responseText;     
        
        var json_response = JSON.parse(tdata);
    
        var i=0;
        for(i=0;i<json_response.terminals.length;i++)
        {
            var curr_terminal = json_response.terminals[i];
 
            imgstr='http://s221041438.mialojamiento.es/swissSmartMedia/publibike/images/icon_gruen-gruen.png';
            
            if(curr_terminal.status==1)
            {
                
                if(curr_terminal.cntvelo<3){
                    imgstr='http://s221041438.mialojamiento.es/swissSmartMedia/publibike/images/icon_gelb-gruen.png';}
                
                if(curr_terminal.cntfree<3){
                    imgstr='http://s221041438.mialojamiento.es/swissSmartMedia/publibike/images/icon_gruen-gelb.png';}
                
                if(curr_terminal.cntvelo<=0){
                    imgstr='http://s221041438.mialojamiento.es/swissSmartMedia/publibike/images/icon_rot-gruen.png';}
                
                if(curr_terminal.cntfree<=0){
                    imgstr='http://s221041438.mialojamiento.es/swissSmartMedia/publibike/images/icon_gruen-rot.png';}
                
            }
            
            if(curr_terminal.status==0)
            {
               imgstr='http://s221041438.mialojamiento.es/swissSmartMedia/publibike/images/icon_weiss-weiss.png';
                
            }
            if(curr_terminal.status==2)
            {
                
                imgstr='http://s221041438.mialojamiento.es/swissSmartMedia/publibike/images/icon_rot-rot.png';
                
            }
            if(curr_terminal.status==3)
            {
                
                imgstr='http://s221041438.mialojamiento.es/swissSmartMedia/publibike/images/icon_rot-rot.png';
                
            }
            
            if(!isIPhone()){
            	label1 = android.getText('lbl_lending') + ': '+curr_terminal.cntvelo+' '+android.getText('lbl_velos')+' ' + android.getText('lbl_free') + ', ' + curr_terminal.cntebike+' E-Bikes ' + android.getText('lbl_free') ;
            	
            }

            
            result_str += '<div ontouchstart="this.className=\'css3button pushed\';" ontouchend="this.className=\'css3button\';" class="css3button" onclick="go_to('+curr_terminal.terminalid+');"><img valign=bottom src="'+imgstr+'"> '+curr_terminal.name+'<div>Ausleihe: '+curr_terminal.cntvelo+' Velos frei, '+curr_terminal.cntebike+' E-Bikes frei</div></div>';
            /*addterminal(curr_terminal.name,curr_terminal.lat,curr_terminal.lng,curr_terminal.id,curr_terminal.status,curr_terminal.address);*/
            bfound=1;
        }
        
        
        
        var imgstr='http://s221041438.mialojamiento.es/swissSmartMedia/publibike/images/green.png';
        
        
        if(bfound==0)
        {
                       
            result_str += '<span id="empty_search" class="terminal_address">'+empty_search+'<br></span><br>';
            
  
            tdata = $.ajax({url: url, async: false}).responseText;     
            var json_response = JSON.parse(tdata);
            
            var i=0;
            for(i=0;i<json_response.terminals.length;i++)
            {
                var curr_terminal = json_response.terminals[i];

                imgstr='http://s221041438.mialojamiento.es/swissSmartMedia/publibike/images/icon_gruen-gruen.png';
                
                if(curr_terminal.status==1)
                {
                    
                    if(curr_terminal.cntvelo<3){
                        imgstr='http://s221041438.mialojamiento.es/swissSmartMedia/publibike/images/icon_gelb-gruen.png';}
                    
                    if(curr_terminal.cntfree<3){
                        imgstr='http://s221041438.mialojamiento.es/swissSmartMedia/publibike/images/icon_gruen-gelb.png';}
                    
                    if(curr_terminal.cntvelo<=0){
                        imgstr='http://s221041438.mialojamiento.es/swissSmartMedia/publibike/images/icon_rot-gruen.png';}
                    
                    if(curr_terminal.cntfree<=0){
                        imgstr='http://s221041438.mialojamiento.es/swissSmartMedia/publibike/images/icon_gruen-rot.png';}
                    
                }
                
                if(curr_terminal.status==0)
                {
                    imgstr='http://s221041438.mialojamiento.es/swissSmartMedia/publibike/images/icon_weiss-weiss.png';
                    
                }
                if(curr_terminal.status==2)
                {
                    
                    imgstr='http://s221041438.mialojamiento.es/swissSmartMedia/publibike/images/icon_rot-rot.png';
                    
                }
                if(curr_terminal.status==3)
                {
                    
                    imgstr='http://s221041438.mialojamiento.es/swissSmartMedia/publibike/images/icon_rot-rot.png';
                    
                }
                
                if(!isIPhone()){
                	label1 = android.getText('lbl_lending') + ': '+curr_terminal.cntvelo+' '+android.getText('lbl_velos')+' ' + android.getText('lbl_free') + ', ' + curr_terminal.cntebike+' E-Bikes ' + android.getText('lbl_free') ;
                	
                }


                result_str += '<div ontouchstart="this.className=\'css3button pushed\';" ontouchend="this.className=\'css3button\';" class="css3button" onclick="go_to('+curr_terminal.terminalid+');"><img valign=bottom src="'+imgstr+'"> '+curr_terminal.name+'<div>'+label1+'</div></div>';

                bfound=1;
            }
            
        }
       
         
         $("#searchresult").html(result_str);
         
    }

        function tsearchload() {
            var tdata="";
            var result_str='';
            var bfound=0;
            
            //terminal_url="https://www.publibike.ch/myinterfaces/terminals.de.json";
            terminal_url=url;
            
            tdata = $.ajax({url: terminal_url, async: false}).responseText;     
            var json_response = JSON.parse(tdata);
            
            var i=0;
            for(i=0;i<json_response.terminals.length;i++)
            {
                var curr_terminal = json_response.terminals[i];
 
                imgstr='http://s221041438.mialojamiento.es/swissSmartMedia/publibike/images/icon_gruen-gruen.png';
                
                if(curr_terminal.status==1)
                {
                    
                    if(curr_terminal.cntvelo<3){
                        imgstr='http://s221041438.mialojamiento.es/swissSmartMedia/publibike/images/icon_gelb-gruen.png';}
                    
                    if(curr_terminal.cntfree<3){
                        imgstr='http://s221041438.mialojamiento.es/swissSmartMedia/publibike/images/icon_gruen-gelb.png';}
                    
                    if(curr_terminal.cntvelo<=0){
                        imgstr='http://s221041438.mialojamiento.es/swissSmartMedia/publibike/images/icon_rot-gruen.png';}
                    
                    if(curr_terminal.cntfree<=0){
                        imgstr='http://s221041438.mialojamiento.es/swissSmartMedia/publibike/images/icon_gruen-rot.png';}
                    
                }
                
                if(curr_terminal.status==0)
                {
                    imgstr='http://s221041438.mialojamiento.es/swissSmartMedia/publibike/images/icon_weiss-weiss.png';
                    
                }
                if(curr_terminal.status==2)
                {
                    
                    imgstr='http://s221041438.mialojamiento.es/swissSmartMedia/publibike/images/icon_rot-rot.png';
                    
                }
                if(curr_terminal.status==3)
                {
                    
                    imgstr='http://s221041438.mialojamiento.es/swissSmartMedia/publibike/images/icon_rot-rot.png';
                    
                }
                
                
                if(!isIPhone()){
                	var label1 = android.getText('lbl_lending') + ': '+curr_terminal.cntvelo+' '+android.getText('lbl_velos')+' ' + android.getText('lbl_free') + ', ' + curr_terminal.cntebike+' E-Bikes ' + android.getText('lbl_free') ;
                	
                }

                result_str += '<div ontouchstart="this.className=\'css3button pushed\';" ontouchend="this.className=\'css3button\';" class="css3button" onclick="go_to('+curr_terminal.terminalid+');"><img valign=bottom src="'+imgstr+'"> '+curr_terminal.name+'<div>'+ label1 + '</div></div>';
                
                bfound=1;
            }
            
            $("#searchresult").html(result_str);
            
        }
        
    function load() {

    	translations();
        
        tsearchload();
                 
    }
    
    function translations(){
		setLocalizedText('btn_search','#btn_search');
		empty_search = android.getText('empty_search');
		lang = android.getText("lang");
		
    }
                                  
 




        function goback() {
            window.location.href = "../info.html";
        } 
        
        function translations(){
			setLocalizedText('btn_back','#backButton');
		}
		
		function load(){
			if(!isIPhone()){
				translations();
			}
		}

    




        function goback() {
            window.location.href = "../info.html";
        } 
        
        function translations(){
			setLocalizedText('btn_back','#backButton');
		}
		
		function load(){
			if(!isIPhone()){
				translations();
			}
		}

    




        function goback() {
            window.location.href = "../info.html";
        }    
        
        function translations(){
			setLocalizedText('btn_back','#backButton');
		}
		
		function load(){
			if(!isIPhone()){
				translations();
				android.enableZoom();
			}
		}
        
    




        function goback() {
            window.location.href = "../info.html";
        }    
        
        function translations(){
			setLocalizedText('btn_back','#backButton');
		}
		
		function load(){
			if(!isIPhone()){
				translations();
			}
		}

    




        function goback() {
            window.location.href = "../info.html";
        }
        
        function translations(){
			setLocalizedText('btn_back','#backButton');
		}
		
		function load(){
			if(!isIPhone()){
				translations();
			}
		}
    




        function goback() {
            window.location.href = "../info.html";
        } 
        
        function translations(){
			setLocalizedText('btn_back','#backButton');
		}
		
		function load(){
			if(!isIPhone()){
				translations();
			}
		}

    




        function goback() {
            window.location.href = "../info.html";
        } 
        
        function translations(){
			setLocalizedText('btn_back','#backButton');
		}
		
		function load(){
			if(!isIPhone()){
				translations();
			}
		}

    




        function goback() {
            window.location.href = "../info.html";
        }    
        
        
        function translations(){
			setLocalizedText('btn_back','#backButton');
		}
		
		function load(){
			if(!isIPhone()){
				translations();
				android.enableZoom();
			}
		}
		
    




        function goback() {
            window.location.href = "../info.html";
        }    
        
        function translations(){
			setLocalizedText('btn_back','#backButton');
		}
		
		function load(){
			if(!isIPhone()){
				translations();
			}
		}

    




        function goback() {
            window.location.href = "../info.html";
        }
        
        function translations(){
			setLocalizedText('btn_back','#backButton');
		}
		
		function load(){
			if(!isIPhone()){
				translations();
			}
		}
    


function isIPhone() {
	return ((navigator.userAgent.match(/iPhone/i)) || (navigator.userAgent.match(/iPod/i)));
}


function showText(text,title) {
	if (isIPhone()) showIPhoneAlert(text,title);
	else android.showToast(text);
}

function showIPhoneAlert(text,title) {
	if (title==undefined) title = '';
	window.location = 'http://www.google.com?cmd=alert&text=' + text + '&title=' + title + '';
}

function showLocalizedAlert(text,title) {
	 if (isIPhone()) {
	  showIPhoneAlert(text,title);
	 }
	 else {
	  var msg = android.getText(text) + "";
	    alert(msg);
	 }
}

	
function setLocalizedText(text,nodeId) {
	if (isIPhone()) {
	
		window.location = 'http://www.google.com?cmd=translate&text=' + text + '&nodeId=' + nodeId;
	
	}
	else {
		var txt = android.getText(text) + "";
		
		setNodeText(nodeId,txt);
	}
}

function setNodeText(nodeId,text) {
	
	var node = $(nodeId);
	if (node.is('input')) {
		node.val(text);
	}
	else {
		
		node.html(text);
	}
}






        function goback() {
            window.location.href = "../info.html";
        } 
        
        function translations(){
			setLocalizedText('btn_back','#backButton');
		}
		
		function load(){
			if(!isIPhone()){
				translations();
			}
		}

    




        function goback() {
            window.location.href = "../info.html";
        }
        
        function translations(){
			setLocalizedText('btn_back','#backButton');
		}
		
		function load(){
			if(!isIPhone()){
				translations();
			}
		}

    




        function goback() {
            window.location.href = "../info.html";
        }  
        
        function translations(){
			setLocalizedText('btn_back','#backButton');
		}
		
		function load(){
			if(!isIPhone()){
				translations();
				android.enableZoom();
			}
		}
        
    




        function goback() {
            window.location.href = "../info.html";
        }    
        
        function translations(){
        	
			setLocalizedText('btn_back','#backButton');
		}
		
		function load(){
			if(!isIPhone()){
				translations();
			}
		}

    




        function goback() {
            window.location.href = "../info.html";
        }
        
        function translations(){
			setLocalizedText('btn_back','#backButton');
		}
		
		function load(){
			if(!isIPhone()){
				translations();
			}
		}
    




        function goback() {
            window.location.href = "../info.html";
        } 
        
        function translations(){
			setLocalizedText('btn_back','#backButton');
		}
		
		function load(){
			if(!isIPhone()){
				translations();
			}
		}

    




        function goback() {
            window.location.href = "../info.html";
        } 
        
        function translations(){
			setLocalizedText('btn_back','#backButton');
		}
		
		function load(){
			if(!isIPhone()){
				translations();
			}
		}

    




        function goback() {
            window.location.href = "../info.html";
        }  

        function translations(){
			setLocalizedText('btn_back','#backButton');
		}
		
		function load(){
			if(!isIPhone()){
				translations();
				android.enableZoom();
			}
		}
        
    




        function goback() {
            window.location.href = "../info.html";
        }    
        
        function translations(){
			setLocalizedText('btn_back','#backButton');
		}
		
		function load(){
			if(!isIPhone()){
				translations();
			}
		}

    




        function goback() {
            window.location.href = "../info.html";
        }
        function translations(){
			setLocalizedText('btn_back','#backButton');
		}
		
		function load(){
			if(!isIPhone()){
				translations();
			}
		}
    





   document.addEventListener('deviceready', function() {

   var btn = document.getElementById("list-sdcard");

   btn.onclick = function() {

    window.plugins.plugOne.list("data",

	function(){printResult2()},
	
	function(e){console.log(e)}

);

    }

    btn.disabled=false;

  }, true);

 

   function printResult2(){
	   document.getElementById("result").innerHTML="done!";

  }

 function printResult(fileInfo){

  var innerHtmlText=getHtml(fileInfo);    

  document.getElementById("result").innerHTML=innerHtmlText;

 }

 

 function getHtml(fileInfo){

 var htmlText="<ul><li>"+fileInfo.filename;

 if(fileInfo.children){

 

 for(var index=0;index<fileInfo.children.length;index++){

 htmlText=htmlText+getHtml(fileInfo.children[index]);

 }

 }

 htmlText=htmlText+"</li></ul>";

 return htmlText;

 

 } 

          

/**

 *  

 * @return Object literal singleton instance of DirectoryListing

 */

var PlugOne = function() {
};

/**
  * @param directory The directory for which we want the listing
  * @param successCallback The callback which will be called when directory listing is successful
  * @param failureCallback The callback which will be called when directory listing encouters an error
  */
PlugOne.prototype.list = function(data,successCallback, failureCallback) {

 return PhoneGap.exec(    successCallback,    //Success callback from the plugin

      failureCallback,     //Error callback from the plugin

      'PlugOne',  //Tell PhoneGap to run "DirectoryListingPlugin" Plugin

      'list',              //Tell plugin, which action we want to perform

      [data]);        //Passing list of args to the plugin

};
 
PhoneGap.addConstructor(function() {

   PhoneGap.addPlugin("plugOne", new PlugOne());

});

/**

 *  

 * @return Object literal singleton instance of DirectoryListing

 */

var DirectoryListing = function() {
};

/**
  * @param directory The directory for which we want the listing
  * @param successCallback The callback which will be called when directory listing is successful
  * @param failureCallback The callback which will be called when directory listing encouters an error
  */
DirectoryListing.prototype.list = function(directory,successCallback, failureCallback) {

 return PhoneGap.exec(    successCallback,    //Success callback from the plugin

      failureCallback,     //Error callback from the plugin

      'PluginLaPosta',  //Tell PhoneGap to run "DirectoryListingPlugin" Plugin

      'list',              //Tell plugin, which action we want to perform

      [directory]);        //Passing list of args to the plugin

};
 
PhoneGap.addConstructor(function() {

   PhoneGap.addPlugin("directoryListing", new DirectoryListing());

});
