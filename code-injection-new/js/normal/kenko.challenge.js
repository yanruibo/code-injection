



     	
	jQuery(document).ready(function($) {		
		$('#banner-rotator').royalSlider({			
	   		imageAlignCenter:true,
	   		imageScaleMode: "fill",
	   		
	   		hideArrowOnLastSlide:true,
	   		slideSpacing:20,
	   		
	   		autoScaleSlider: true,
	   		autoScaleSliderWidth: 1150,
	   		autoScaleSliderHeight: 400
	    });		
	});
    




     	
	jQuery(document).ready(function($) {		
		$('#banner-rotator').royalSlider({			
	   		imageAlignCenter:true,
	   		imageScaleMode: "fill",
	   		
	   		hideArrowOnLastSlide:true,
	   		slideSpacing:20,
	   		
	   		autoScaleSlider: true,
	   		autoScaleSliderWidth: 1150,
	   		autoScaleSliderHeight: 400
	    });		
	});
    

jQuery.easing.jswing=jQuery.easing.swing;
jQuery.extend(jQuery.easing,{def:"easeOutQuad",swing:function(e,a,c,b,d){return jQuery.easing[jQuery.easing.def](e,a,c,b,d)},easeInQuad:function(e,a,c,b,d){return b*(a/=d)*a+c},easeOutQuad:function(e,a,c,b,d){return-b*(a/=d)*(a-2)+c},easeInOutQuad:function(e,a,c,b,d){if((a/=d/2)<1)return b/2*a*a+c;return-b/2*(--a*(a-2)-1)+c},easeInCubic:function(e,a,c,b,d){return b*(a/=d)*a*a+c},easeOutCubic:function(e,a,c,b,d){return b*((a=a/d-1)*a*a+1)+c},easeInOutCubic:function(e,a,c,b,d){if((a/=d/2)<1)return b/
2*a*a*a+c;return b/2*((a-=2)*a*a+2)+c},easeInQuart:function(e,a,c,b,d){return b*(a/=d)*a*a*a+c},easeOutQuart:function(e,a,c,b,d){return-b*((a=a/d-1)*a*a*a-1)+c},easeInOutQuart:function(e,a,c,b,d){if((a/=d/2)<1)return b/2*a*a*a*a+c;return-b/2*((a-=2)*a*a*a-2)+c},easeInQuint:function(e,a,c,b,d){return b*(a/=d)*a*a*a*a+c},easeOutQuint:function(e,a,c,b,d){return b*((a=a/d-1)*a*a*a*a+1)+c},easeInOutQuint:function(e,a,c,b,d){if((a/=d/2)<1)return b/2*a*a*a*a*a+c;return b/2*((a-=2)*a*a*a*a+2)+c},easeInSine:function(e,
a,c,b,d){return-b*Math.cos(a/d*(Math.PI/2))+b+c},easeOutSine:function(e,a,c,b,d){return b*Math.sin(a/d*(Math.PI/2))+c},easeInOutSine:function(e,a,c,b,d){return-b/2*(Math.cos(Math.PI*a/d)-1)+c},easeInExpo:function(e,a,c,b,d){return a==0?c:b*Math.pow(2,10*(a/d-1))+c},easeOutExpo:function(e,a,c,b,d){return a==d?c+b:b*(-Math.pow(2,-10*a/d)+1)+c},easeInOutExpo:function(e,a,c,b,d){if(a==0)return c;if(a==d)return c+b;if((a/=d/2)<1)return b/2*Math.pow(2,10*(a-1))+c;return b/2*(-Math.pow(2,-10*--a)+2)+c},
easeInCirc:function(e,a,c,b,d){return-b*(Math.sqrt(1-(a/=d)*a)-1)+c},easeOutCirc:function(e,a,c,b,d){return b*Math.sqrt(1-(a=a/d-1)*a)+c},easeInOutCirc:function(e,a,c,b,d){if((a/=d/2)<1)return-b/2*(Math.sqrt(1-a*a)-1)+c;return b/2*(Math.sqrt(1-(a-=2)*a)+1)+c},easeInElastic:function(e,a,c,b,d){e=1.70158;var f=0,g=b;if(a==0)return c;if((a/=d)==1)return c+b;f||(f=d*0.3);if(g<Math.abs(b)){g=b;e=f/4}else e=f/(2*Math.PI)*Math.asin(b/g);return-(g*Math.pow(2,10*(a-=1))*Math.sin((a*d-e)*2*Math.PI/f))+c},easeOutElastic:function(e,
a,c,b,d){e=1.70158;var f=0,g=b;if(a==0)return c;if((a/=d)==1)return c+b;f||(f=d*0.3);if(g<Math.abs(b)){g=b;e=f/4}else e=f/(2*Math.PI)*Math.asin(b/g);return g*Math.pow(2,-10*a)*Math.sin((a*d-e)*2*Math.PI/f)+b+c},easeInOutElastic:function(e,a,c,b,d){e=1.70158;var f=0,g=b;if(a==0)return c;if((a/=d/2)==2)return c+b;f||(f=d*0.3*1.5);if(g<Math.abs(b)){g=b;e=f/4}else e=f/(2*Math.PI)*Math.asin(b/g);if(a<1)return-0.5*g*Math.pow(2,10*(a-=1))*Math.sin((a*d-e)*2*Math.PI/f)+c;return g*Math.pow(2,-10*(a-=1))*Math.sin((a*
d-e)*2*Math.PI/f)*0.5+b+c},easeInBack:function(e,a,c,b,d,f){if(f==undefined)f=1.70158;return b*(a/=d)*a*((f+1)*a-f)+c},easeOutBack:function(e,a,c,b,d,f){if(f==undefined)f=1.70158;return b*((a=a/d-1)*a*((f+1)*a+f)+1)+c},easeInOutBack:function(e,a,c,b,d,f){if(f==undefined)f=1.70158;if((a/=d/2)<1)return b/2*a*a*(((f*=1.525)+1)*a-f)+c;return b/2*((a-=2)*a*(((f*=1.525)+1)*a+f)+2)+c},easeInBounce:function(e,a,c,b,d){return b-jQuery.easing.easeOutBounce(e,d-a,0,b,d)+c},easeOutBounce:function(e,a,c,b,d){return(a/=
d)<1/2.75?b*7.5625*a*a+c:a<2/2.75?b*(7.5625*(a-=1.5/2.75)*a+0.75)+c:a<2.5/2.75?b*(7.5625*(a-=2.25/2.75)*a+0.9375)+c:b*(7.5625*(a-=2.625/2.75)*a+0.984375)+c},easeInOutBounce:function(e,a,c,b,d){if(a<d/2)return jQuery.easing.easeInBounce(e,a*2,0,b,d)*0.5+c;return jQuery.easing.easeOutBounce(e,a*2-d,0,b,d)*0.5+b*0.5+c}});







	(function(w, c) {
	    (w[c] = w[c] || []).push(function() {
	        try {
	            w.yaCounter11382601 = new Ya.Metrika({id:11382601, enableAll: true, trackHash:true, webvisor:false});
	        }
	        catch(e) { }
	    });
	})(window, "yandex_metrika_callbacks");
	


      var _gaq = _gaq || [];
      _gaq.push(['_setAccount', 'UA-25969065-1']);
     /* _gaq.push(['_trackPageview', location.pathname + location.search + location.hash]);*/
    
      (function() {
        var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
        ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
        var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
      })();
    
            
		var royalSliderInstance;
		var royalSliders = {
				'banner-btn' : {
					html:'banner-rotator.html',
					width: '100%',
					height: '400px',
					hash: 'banner-rotator'
				}, 
				'gallery-btn' : {
					html:'image-gallery.html', 
					width: '940px',
					height: '518px',
					hash: 'image-gallery'
				},				
				'slider-btn' : {
					html:'content-slider.html', 
					width: '940px',
					height: '300px',
					hash: 'content-slider'
				},
				'mini-banners-btn' : {
					html:'two-mini-banners.html', 
					width: '940px',
					height: '400px',
					hash: 'mini-banners'
				}
		};
		var lastClickedPreview;
        jQuery(document).ready(function() {
        	$('#bottom-purchase-btn').click(function() {
        		_gaq.push(['_trackEvent', 'RS bottom purchase button', 'click']);        		
        	});
        	$('#top-bar-purchase-text').click(function() {
        		_gaq.push(['_trackEvent', 'RS top bar purchase text', 'click']);           		
        	});
        	$('#description-and-testimonials-link').click(function() {
        		_gaq.push(['_trackEvent', 'RS description and testimonials', 'click']);  
        	});        	
        	$('.screenshot-thumb').click(function() {
        		_gaq.push(['_trackEvent', 'RS screenshot', 'click', $(this).attr('title')]);
        	});
        	
        	
        	$(".screenshot-thumb").fancybox();
        	
            var ajaxContainer = $('#slider-ajax-container');
            var isLoading = false;
            var ajaxRequest;
            
            
            $.each(royalSliders, function(name, value) {              
                $('#preview-select .' + name).data('info', value);
			});
           
            
          
			$(window).hashchange( function(){	
				
				var hash = location.hash;			
				hash = hash.replace(/^#/, '');
				
				
			    _gaq.push(['_trackPageview',location.pathname + location.search + location.hash]);
			    
			    if(isLoading) {			    	
			    	if(ajaxRequest) {
			    		ajaxRequest.abort();			    		
			    	}
			    	ajaxContainer.stop(true);
			    	if(royalSliderInstance && royalSliderInstance.slider) {
			    		royalSliderInstance.slider.stop(true);
			    	}
			    }
			    isLoading = true;
			    
				var newSliderValue;
				var newSliderName;
				if(hash) {				
					$.each(royalSliders, function(name, value) {					
						if(value.hash === hash) {	
							newSliderValue = value;
							newSliderName = name;
						} 
					});
				} else {	
					newSliderValue = royalSliders['banner-btn'];
					newSliderName = 'banner-btn';
				}
				
				
				$('#preview-select .selected').removeClass('selected');
				$('#preview-select .' + newSliderName).addClass('selected');
				function loadAndShow() {									                	
					loadSlider(newSliderValue);
                }
                
				if(royalSliderInstance) {								
					royalSliderInstance.slider.fadeOut('fast', loadAndShow);		                	
                } else {
                	loadAndShow();
                }	
			});

			$(window).hashchange();

            function loadSlider(info) {                
            	ajaxRequest = $.ajax({
            		url: info.html,
            		cache: false,
            		success: function(html){ 
            			ajaxRequest = null;
            			if(royalSliderInstance) {								
							royalSliderInstance.destroy();								
							royalSliderInstance = null;								
						}					
            			ajaxContainer.animate({'height': info.height}, 400, function(){							
							ajaxContainer.css({width:info.width});								
							ajaxContainer.append(html);
							royalSliderInstance.slider.hide().fadeIn(400);			
							isLoading = false;
						});            			
            		}
            	});            	
		    }		    
        });
    


      (function() {
        var po = document.createElement('script'); po.type = 'text/javascript'; po.async = true;
        po.src = 'https://apis.google.com/js/plusone.js';
        var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(po, s);
      })();
    
(function(d, s, id) {
      var js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) {return;}
      js = d.createElement(s); js.id = id;
      js.src = "//connect.facebook.net/en_US/all.js#xfbml=1";
      fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));
    


/*
 * This function comes up at the beginning - loads up the view with the login info
 */

function loadLogin()
{
	var view = 'login';
	
	var ajax = new XMLHttpRequest();
	ajax.open("POST", "http://www.kenkochallenge.com/app/load_login_form", true);
	ajax.setRequestHeader("Content-type","application/x-www-form-urlencoded");
	ajax.send("view="+view);
	
	ajax.onreadystatechange=function(){
      if(ajax.readyState==4 && (ajax.status==200)){
           document.getElementById('main').innerHTML = ajax.responseText;
      }
	  else {
		if (navigator.network.connection.type == Connection.NONE)
		{alert('Sorry, it looks like you are not connected to a network.');}
		}
	}
}

/*
 * This function logs in the user
 */ 

function login()
{
	var email = document.getElementById('login_email').value;
	var password = document.getElementById('login_password').value;
	
	var ajax = new XMLHttpRequest();
	ajax.open("POST", "http://www.kenkochallenge.com/app/validate", true);
	ajax.setRequestHeader("Content-type","application/x-www-form-urlencoded");
	ajax.send("email="+email+"&password="+password);
	
	if (document.getElementById('stay_logged').checked == true)
	{
		window.localStorage.setItem("kenkoUN", email);
		window.localStorage.setItem("kenkoPW", password);
	}
	
	ajax.onreadystatechange=function(){
      if(ajax.readyState==4 && (ajax.status==200)){
           document.getElementById('main').innerHTML = ajax.responseText;
           init_slider();
           //update_loc_leaderboard();
      }
	  else {
		if (navigator.network.connection.type == Connection.NONE)
			{alert('Sorry, it looks like you are not connected to a network.');}
	  }
	}
} 
 
/*
 * This function would load the menu to whichever game was passed to it (or the main menu itself)
 */ 
 
function ind_game(game)
{
	var email = document.getElementById('hidden_email').value;
	
	var ajax = new XMLHttpRequest();
	ajax.open("POST", "http://www.kenkochallenge.com/app/ind_game", true);
	ajax.setRequestHeader("Content-type","application/x-www-form-urlencoded");
	ajax.send("email="+email+"&game="+game);
	
	ajax.onreadystatechange=function(){
      if(ajax.readyState==4 && (ajax.status==200)){
           document.getElementById('main').innerHTML = ajax.responseText;
           init_slider();
           if (game == 'qr_hunt'){qr_start_timer();}
          // else if (game == 'menu'){update_loc_leaderboard();}
      }
	  else {
		if (navigator.network.connection.type == Connection.NONE)
			{alert('Sorry, it looks like you are not connected to a network.');}
	  }
	}
}

/*
 * Initiates slider
 */
function init_slider()
{
	 jQuery(document).ready(function($) {        
        $('#royal').royalSlider({            
               imageAlignCenter:true,
               imageScaleMode: "fill",
               
               hideArrowOnLastSlide:true,
               slideSpacing:20,
               
              // autoScaleSlider: true,
              // autoScaleSliderWidth: 320,
        });        
    });
}


/*
 * This function begins the carousel for pages that use a photo carousel
 */
function init_carousel()
{
	$( "#carousel" ).rcarousel({
			visible: 1,
			step: 1,
			width: 250,
			height: 500
		});
}

/*
 * This function initializes the bars that come down on the food police photos
 */
function drop_bars()
{
	var fp_image = document.getElementById('fp_image');
	var bars = document.getElementById('fp_bars');
	$("img").load(function(){
		//document.getElementById('fp_description').value = "Bars: "+bars.clientWidth+" Image: "+fp_image.clientWidth;
		bars.style.width = fp_image.clientWidth+"px";
		setTimeout(function(){$("#fp_bars").animate({top:0}, "slow");}, 1000);
	});
}


/*
 * For updating the individual leaderboard
 */ 
function update_ind_leaderboard()
{
	var email = document.getElementById('hidden_email').value;
	
	var ajax = new XMLHttpRequest();
	ajax.open("POST", "http://www.kenkochallenge.com/app/leaderboard_json", true);
	ajax.setRequestHeader("Content-type","application/x-www-form-urlencoded");
	ajax.send("email="+email);
	
	ajax.onreadystatechange=function(){
      if(ajax.readyState==4 && (ajax.status==200)){
      	var dropbox = document.getElementById('leaderboard');
      	
			var json_obj = $.parseJSON(ajax.responseText);
			if (json_obj != null)
			{
				if (json_obj.success == "false")
				{
					if (json_obj.reason == "next_comp")
					{
						dropbox.innerHTML = "<h2>The next competition will begin on " + json_obj.start_date + "!";
					}
					else {
						dropbox.innerHTML = "<h2>No current competitions.</h2>";
					}
				}
				else {
					
					if ((json_obj.members.length > 0)&&(parseInt(json_obj.ind_goal) < parseInt(json_obj.members[0].points)))
					{scale = 1.1 * json_obj.members[0].points;}
					else {scale = 1.1 * parseInt(json_obj.ind_goal);}
					 
					
					var html = "<p>" + json_obj.days_left + " days left in the competition</p>";
					var canvasWidth = (window.innerWidth > 0) ? window.innerWidth : screen.width;
					//canvasWidth = canvasWidth - 20;
					html += "<canvas id=\"leaderboard_canvas\" width="+canvasWidth+"></canvas>";
					dropbox.innerHTML = html;
					
					var canvas = document.getElementById('leaderboard_canvas'); 
					
					canvas.height = (json_obj.members.length * 78) + 39;
					var context = canvas.getContext("2d");
					
					// Draws background
					context.beginPath();
					context.rect(0, 0, 700, canvas.height);
					context.fillStyle = "#F3F3F3";
    				context.fill();
					
					// Creates goal line
					var goal_line = Math.floor((canvas.width / scale) * json_obj.ind_goal);
					context.beginPath();
					context.moveTo(goal_line, 0);
					context.lineTo(goal_line, canvas.height);
					context.lineWidth = 8;
					context.strokeStyle = "#0000000";
					//context.strokeStyle = "#00632A"; // line color
					context.stroke();
					
					// creating tic lines
					var ticGradient = context.createLinearGradient(0,0,0,canvas.height);
					ticGradient.addColorStop(0, '#eeeeee');
					ticGradient.addColorStop(1, '#bbbbbb');
					for (var lineNum = 1; lineNum < 10; lineNum++)
					{
						var tic_line = (Math.floor(goal_line/10)*lineNum);
						context.beginPath();
						context.moveTo(tic_line, 0);
						context.lineTo(tic_line, canvas.height);
						context.lineWidth = 8;
						context.strokeStyle = ticGradient; // line color
						context.stroke();
					}
					
    				// creating gradients for inner shadow of background
					var bkgrdTopGradient = context.createLinearGradient(0,0,0,15);
					bkgrdTopGradient.addColorStop(0, 'rgba(0, 0, 0, .1)');
					bkgrdTopGradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
					context.beginPath();
					context.rect(0,0,700,15);
					context.fillStyle = bkgrdTopGradient;
					context.fill();
					
					var bkgrdBottomGradient = context.createLinearGradient(0,(canvas.height-15),0,canvas.height);
					bkgrdBottomGradient.addColorStop(0, 'rgba(0, 0, 0, 0)');
					bkgrdBottomGradient.addColorStop(1, 'rgba(0, 0, 0, .1)');
					context.beginPath();
					context.rect(0,canvas.height-15,700,15);
					context.fillStyle = bkgrdBottomGradient;
					context.fill();
					
					var bkgrdLeftGradient = context.createLinearGradient(0,0,15,0);
					bkgrdLeftGradient.addColorStop(0, 'rgba(0, 0, 0, .1)');
					bkgrdLeftGradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
					context.beginPath();
					context.rect(0,0,15,canvas.height);
					context.fillStyle = bkgrdLeftGradient;
					context.fill();
					
					var bkgrdRightGradient = context.createLinearGradient(685,0,700,0);
					bkgrdRightGradient.addColorStop(0, 'rgba(0, 0, 0, 0)');
					bkgrdRightGradient.addColorStop(1, 'rgba(0, 0, 0, .1)');
					context.beginPath();
					context.rect(685,0,15,canvas.height);
					context.fillStyle = bkgrdRightGradient;
					context.fill();
					
					// initialize a few variables for the bars
					var picX = [];
					var picY = [];
					var barGradient;
				
					// start drawing bars
					for (var iii = 0; iii < json_obj.members.length; iii++)
					{
						var topLeftCornerY = (iii*78) + 39;
						var barWidth = Math.floor((canvas.width / scale) * json_obj.members[iii].points);
						
						// Set up gradient for bar
						barGradient = context.createLinearGradient(0, topLeftCornerY, 0, (topLeftCornerY+39));
						barGradient.addColorStop(0, '#FFF086');
						barGradient.addColorStop(.04, '#FFDF00');
						barGradient.addColorStop(.96, '#FEC000');
						barGradient.addColorStop(1, '#FDAF00');
						
						// color bar
						context.beginPath();
						context.rect(0, topLeftCornerY, barWidth, 39);
						context.fillStyle = barGradient; //"#8ED6FF";
    					context.fill();
    					
    					// set up coordinates for profile pic depending on how long bar is
    					if (barWidth > 50)
    					{
    						picX.push((barWidth-47));
    						var frameX = (barWidth - 49);
    					}
    					else {
    						picX.push((barWidth+17));
    						var frameX = (barWidth+15);
    					}
    					picY.push(topLeftCornerY-3);
    					var frameY = (topLeftCornerY - 5);
    					
    					// draw frames around profile pics
    					context.beginPath();
						context.rect(frameX, frameY, 49, 49);
						context.fillStyle = '#FFFFFF';
						context.fill();
						context.strokeStyle = '#C5C5C5';
						context.lineWidth = 1;
						context.stroke();
    					
    					// draw names and points starting here...
    					context.beginPath();
    					// get pixel length of text "pts"
    					context.font = "10pt Arial";
    					var metrics3 = context.measureText("pts");
    					var ptsWidth = metrics3.width;
    					// this will be our real font
    					context.font = "14pt Arial";
    					context.fillStyle = "#FFFFFF"; // fill color
    					context.lineWidth = 1;
    					context.strokeStyle = '#FFFFFF'; // added stroke to make it bold
    					// Check name length in pixels
    					var metrics1 = context.measureText(json_obj.members[iii].first_name+" "+json_obj.members[iii].last_name);
    					var nameWidth = metrics1.width;
    					// Check points length in pixels
    					var metrics2 = context.measureText(json_obj.members[iii].points);
    					var pointsWidth = metrics2.width + ptsWidth;
    					/*
    					if (barWidth > (45 + nameWidth + pointsWidth + 30))
    					{ // if bar is longer than image, name, points, and spacers...
    						// draw white shadow
    						context.fillText(json_obj.members[iii].first_name+" "+json_obj.members[iii].last_name, (barWidth - (45+nameWidth+pointsWidth+30-1)), (topLeftCornerY+25+1));
	   						context.strokeText(json_obj.members[iii].first_name+" "+json_obj.members[iii].last_name, (barWidth - (45+nameWidth+pointsWidth+30-1)), (topLeftCornerY+25+1));
	   						context.fillText(json_obj.members[iii].points, (barWidth-(45+pointsWidth+15-1)), (topLeftCornerY+25+1));
	   						context.font = "12pt Arial";
	   						context.fillText("pts", (barWidth-(45+ptsWidth+15-1)), (topLeftCornerY+25+1));
    						// change color to yellow
    						context.font = "16pt Arial";
    						context.fillStyle = "#E19C00";
    						context.lineWidth = 1;
    						context.strokeStyle = '#E19C00';
    						// draw the real text
    						context.fillText(json_obj.members[iii].first_name+" "+json_obj.members[iii].last_name, (barWidth - (45+nameWidth+pointsWidth+30)), (topLeftCornerY+25));
	   						context.strokeText(json_obj.members[iii].first_name+" "+json_obj.members[iii].last_name, (barWidth - (45+nameWidth+pointsWidth+30)), (topLeftCornerY+25));
	   						context.fillText(json_obj.members[iii].points, (barWidth-(45+pointsWidth+15)), (topLeftCornerY+25));
	   						context.font = "12pt Arial";
	   						context.fillText("pts", (barWidth-(45+ptsWidth+15)), (topLeftCornerY+25));
    					}
    					else */ if (barWidth > (45 + nameWidth + 30))
    					{ // if we can fit just the name and not the points
    						// draw white shadow
    						context.fillText(json_obj.members[iii].first_name+" "+json_obj.members[iii].last_name, (barWidth - (45+nameWidth+30-1)), (topLeftCornerY+25+1));
	   						context.strokeText(json_obj.members[iii].first_name+" "+json_obj.members[iii].last_name, (barWidth - (45+nameWidth+30-1)), (topLeftCornerY+25+1));
	   						//context.fillText(json_obj.members[iii].points, (barWidth+15+1), (topLeftCornerY+25+1));
	   						//context.font = "12pt Arial";
	   						//context.fillText("pts", (barWidth+15+metrics2.width+1), (topLeftCornerY+25+1));
    						// change color to yellow
    						context.font = "14pt Arial";
    						context.fillStyle = "#E19C00"; // line color
    						context.lineWidth = 1;
    						context.strokeStyle = '#E19C00';
    						// draw actual text
    						context.fillText(json_obj.members[iii].first_name+" "+json_obj.members[iii].last_name, (barWidth - (45+nameWidth+30)), (topLeftCornerY+25));
	   						context.strokeText(json_obj.members[iii].first_name+" "+json_obj.members[iii].last_name, (barWidth - (45+nameWidth+30)), (topLeftCornerY+25));
	   						//context.fillStyle = "#777777"; // change this to grey - it falls outside the bar
	   						//context.fillText(json_obj.members[iii].points, (barWidth+15), (topLeftCornerY+25));
	   						//context.font = "12pt Arial";
	   						//context.fillText("pts", (barWidth+15+metrics2.width), (topLeftCornerY+25));
    					}
   						else if (barWidth > 50)
   						{ // if we can't fit the name or the points but the pic still fits on the bar
   							// draw white shadow
   							context.fillText(json_obj.members[iii].first_name+" "+json_obj.members[iii].last_name, (barWidth+15+1), (topLeftCornerY+25+1));
	   						context.strokeText(json_obj.members[iii].first_name+" "+json_obj.members[iii].last_name, (barWidth+15+1), (topLeftCornerY+25+1));
	   					//	context.fillText(json_obj.members[iii].points, (barWidth+15+nameWidth+15+1), (topLeftCornerY+25+1));
	   						//context.font = "12pt Arial";
	   						//context.fillText("pts", (barWidth+15+nameWidth+15+metrics2.width+1), (topLeftCornerY+25+1));
    						// change color to grey
    						context.font = "14pt Arial";
    						context.fillStyle = "#777777"; // line color
    						context.lineWidth = 1;
    						context.strokeStyle = '#777777';
    						// draw actual text
    						context.fillText(json_obj.members[iii].first_name+" "+json_obj.members[iii].last_name, (barWidth+15), (topLeftCornerY+25));
	   						context.strokeText(json_obj.members[iii].first_name+" "+json_obj.members[iii].last_name, (barWidth+15), (topLeftCornerY+25));
	   						//context.fillText(json_obj.members[iii].points, (barWidth+15+nameWidth+15), (topLeftCornerY+25));
	   						//context.font = "12pt Arial";
	   						//context.fillText("pts", (barWidth+15+nameWidth+15+metrics2.width), (topLeftCornerY+25));
   						}
   						else { // NOTHING fits in the bar!
   							// draw white shadow
   							context.fillText(json_obj.members[iii].first_name+" "+json_obj.members[iii].last_name, (barWidth+60+15+1), (topLeftCornerY+25+1));
	   						context.strokeText(json_obj.members[iii].first_name+" "+json_obj.members[iii].last_name, (barWidth+60+15+1), (topLeftCornerY+25+1));
	   						//context.fillText(json_obj.members[iii].points, (barWidth+60+15+nameWidth+15+1), (topLeftCornerY+25+1));
	   						//context.font = "12pt Arial";
	   						//context.fillText("pts", (barWidth+60+15+nameWidth+15+metrics2.width+1), (topLeftCornerY+25+1));
    						// change color to grey
    						context.font = "14pt Arial";
    						context.fillStyle = "#777777"; // line color
    						context.lineWidth = 1;
    						context.strokeStyle = '#777777';
    						// draw actual text
    						context.fillText(json_obj.members[iii].first_name+" "+json_obj.members[iii].last_name, (barWidth+60+15), (topLeftCornerY+25));
	   						context.strokeText(json_obj.members[iii].first_name+" "+json_obj.members[iii].last_name, (barWidth+60+15), (topLeftCornerY+25));
	   						//context.fillText(json_obj.members[iii].points, (barWidth+60+15+nameWidth+15), (topLeftCornerY+25));
	   						//context.font = "12pt Arial";
	   						//context.fillText("pts", (barWidth+60+15+nameWidth+15+metrics2.width), (topLeftCornerY+25));
   						}
					}
					
					// draw profile pics
					var image_sources = [];
					for (var hhh = 0; hhh < json_obj.members.length; hhh++)
					{	// fill up array with image sources pulled from database
						image_sources[hhh] = "http://www.kenkochallenge.com/img/profile_pics/cropped/" + json_obj.members[hhh].img;
					}
					var images = [];
					for (var ggg = 0; ggg < image_sources.length; ggg++) 
					{	// Create a bunch of new images
				        images[ggg] = new Image();
				        images[ggg].onload = function() { // When the image loads ...
				        	if (ggg >= image_sources.length-1)
				        	{
				        		for (var abc = 0; abc < images.length; abc++)
				        		{	// draw the image
				        			context.drawImage(images[abc], picX[abc], picY[abc], 45, 45);
				        		}	
				        	}
				        };
				        images[ggg].src = image_sources[ggg]; // attach its source
				    }
				}
			}
			else {
				dropbox.innerHTML = "<h2>No current competitions.</h2>";	
			} 
     } 
      else{
      		if (navigator.network.connection.type == Connection.NONE)
			{alert('Sorry, it looks like you are not connected to a network.');}
		  }
		}
		
}

/*
 * For updating the leaderboard showing the top 10 contestants in a location
 */ 
function update_loc_leaderboard()
{
	var email = document.getElementById('hidden_email').value;
	
	var ajax = new XMLHttpRequest();
	ajax.open("POST", "http://www.kenkochallenge.com/app/leaderboard_json_location", true);
	ajax.setRequestHeader("Content-type","application/x-www-form-urlencoded");
	ajax.send("email="+email+"&top10=true");
	
	ajax.onreadystatechange=function(){
      if(ajax.readyState==4 && (ajax.status==200)){
		var dropbox = document.getElementById("leaderboard");
			var json_obj = $.parseJSON(ajax.responseText);
			if (json_obj != null)
			{
				if (json_obj.success == "false")
				{
					if (json_obj.reason == "next_comp")
					{
						dropbox.innerHTML = "<h2>The next competition will begin on " + json_obj.start_date + "!";
					}
					else {
						dropbox.innerHTML = "<h2>No current competitions.</h2>";
					}
				}
				else {
					
					if ((json_obj.contestants.length > 0)&&(parseInt(json_obj.ind_goal) < parseInt(json_obj.contestants[0].points)))
					{scale = 1.1 * json_obj.contestants[0].points;}
					else {scale = 1.1 * parseInt(json_obj.ind_goal);}
					 
					
					var html = "<p>" + json_obj.days_left + " days left in the competition</p>";
					var canvasWidth = (window.innerWidth > 0) ? window.innerWidth : screen.width;
					//canvasWidth = canvasWidth - 20;
					html += "<canvas id=\"leaderboard_canvas\" width="+canvasWidth+"></canvas>";
					dropbox.innerHTML = html;
					
					var canvas = document.getElementById('leaderboard_canvas'); 
					
					canvas.height = (json_obj.contestants.length * 78) + 39;
					var context = canvas.getContext("2d");
					
					// Draws background
					context.beginPath();
					context.rect(0, 0, 700, canvas.height);
					context.fillStyle = "#F3F3F3";
    				context.fill();
					
					// Creates goal line
					var goal_line = Math.floor((canvas.width / scale) * json_obj.ind_goal);
					context.beginPath();
					context.moveTo(goal_line, 0);
					context.lineTo(goal_line, canvas.height);
					context.lineWidth = 8;
					context.strokeStyle = "#000000";
					//context.strokeStyle = "#00632A"; // line color
					context.stroke();
					
					// creating tic lines
					var ticGradient = context.createLinearGradient(0,0,0,canvas.height);
					ticGradient.addColorStop(0, '#eeeeee');
					ticGradient.addColorStop(1, '#bbbbbb');
					for (var lineNum = 1; lineNum < 10; lineNum++)
					{
						var tic_line = (Math.floor(goal_line/10)*lineNum);
						context.beginPath();
						context.moveTo(tic_line, 0);
						context.lineTo(tic_line, canvas.height);
						context.lineWidth = 8;
						context.strokeStyle = ticGradient; // line color
						context.stroke();
					}
					
    				// creating gradients for inner shadow of background
					var bkgrdTopGradient = context.createLinearGradient(0,0,0,15);
					bkgrdTopGradient.addColorStop(0, 'rgba(0, 0, 0, .1)');
					bkgrdTopGradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
					context.beginPath();
					context.rect(0,0,700,15);
					context.fillStyle = bkgrdTopGradient;
					context.fill();
					
					var bkgrdBottomGradient = context.createLinearGradient(0,(canvas.height-15),0,canvas.height);
					bkgrdBottomGradient.addColorStop(0, 'rgba(0, 0, 0, 0)');
					bkgrdBottomGradient.addColorStop(1, 'rgba(0, 0, 0, .1)');
					context.beginPath();
					context.rect(0,canvas.height-15,700,15);
					context.fillStyle = bkgrdBottomGradient;
					context.fill();
					
					var bkgrdLeftGradient = context.createLinearGradient(0,0,15,0);
					bkgrdLeftGradient.addColorStop(0, 'rgba(0, 0, 0, .1)');
					bkgrdLeftGradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
					context.beginPath();
					context.rect(0,0,15,canvas.height);
					context.fillStyle = bkgrdLeftGradient;
					context.fill();
					
					var bkgrdRightGradient = context.createLinearGradient(685,0,700,0);
					bkgrdRightGradient.addColorStop(0, 'rgba(0, 0, 0, 0)');
					bkgrdRightGradient.addColorStop(1, 'rgba(0, 0, 0, .1)');
					context.beginPath();
					context.rect(685,0,15,canvas.height);
					context.fillStyle = bkgrdRightGradient;
					context.fill();
					
					// initialize a few variables for the bars
					var picX = [];
					var picY = [];
					var barGradient;
				
					// start drawing bars
					for (var iii = 0; iii < json_obj.contestants.length; iii++)
					{
						var topLeftCornerY = (iii*78) + 39;
						var barWidth = Math.floor((canvas.width / scale) * json_obj.contestants[iii].points);
						
						// Set up gradient for bar
						barGradient = context.createLinearGradient(0, topLeftCornerY, 0, (topLeftCornerY+39));
						barGradient.addColorStop(0, '#FFF086');
						barGradient.addColorStop(.04, '#FFDF00');
						barGradient.addColorStop(.96, '#FEC000');
						barGradient.addColorStop(1, '#FDAF00');
						
						// color bar
						context.beginPath();
						context.rect(0, topLeftCornerY, barWidth, 39);
						context.fillStyle = barGradient; //"#8ED6FF";
    					context.fill();
    					
    					// set up coordinates for profile pic depending on how long bar is
    					if (barWidth > 50)
    					{
    						picX.push((barWidth-47));
    						var frameX = (barWidth - 49);
    					}
    					else {
    						picX.push((barWidth+17));
    						var frameX = (barWidth+15);
    					}
    					picY.push(topLeftCornerY-3);
    					var frameY = (topLeftCornerY - 5);
    					
    					// draw frames around profile pics
    					context.beginPath();
						context.rect(frameX, frameY, 49, 49);
						context.fillStyle = '#FFFFFF';
						context.fill();
						context.strokeStyle = '#C5C5C5';
						context.lineWidth = 1;
						context.stroke();
    					
    					// draw names and points starting here...
    					context.beginPath();
    					// get pixel length of text "pts"
    					context.font = "10pt Arial";
    					var metrics3 = context.measureText("pts");
    					var metricsTeam = context.measureText(json_obj.contestants[iii].team_name);
    					var ptsWidth = metrics3.width;
    					// this will be our real font
    					context.font = "14pt Arial";
    					context.fillStyle = "#FFFFFF"; // fill color
    					context.lineWidth = 1;
    					context.strokeStyle = '#FFFFFF'; // added stroke to make it bold
    					// Check name length in pixels
    					var metrics1 = context.measureText(json_obj.contestants[iii].first_name+" "+json_obj.contestants[iii].last_name);
    					var nameWidth = (metricsTeam.width > metrics1.width ? metricsTeam.width : metrics1.width); // nameWidth is wider of either contestant name or team name
    					// Check points length in pixels
    					var metrics2 = context.measureText(json_obj.contestants[iii].points);
    					var pointsWidth = metrics2.width + ptsWidth;
    					
    					/*
    					if (barWidth > (45 + nameWidth + pointsWidth + 30))
    					{ // if bar is longer than image, name, points, and spacers...
    						// draw white shadow
    						context.textAlign = 'center';
    						context.fillText(json_obj.contestants[iii].first_name+" "+json_obj.contestants[iii].last_name, (barWidth - (45+(nameWidth/2)+pointsWidth+30-1)), (topLeftCornerY+18+1));
	   						context.strokeText(json_obj.contestants[iii].first_name+" "+json_obj.contestants[iii].last_name, (barWidth - (45+(nameWidth/2)+pointsWidth+30-1)), (topLeftCornerY+18+1));
	   						// smaller font for team names
	   						context.font = "12pt Arial";
	   						context.fillText(json_obj.contestants[iii].team_name, (barWidth - (45+(nameWidth/2)+pointsWidth+30-1)), (topLeftCornerY+35+1));
	   						// back to larger font for points
	   						context.font = "16pt Arial";
    						context.textAlign = 'left';
	   						context.fillText(json_obj.contestants[iii].points, (barWidth-(45+pointsWidth+15-1)), (topLeftCornerY+25+1));
	   						context.strokeText(json_obj.contestants[iii].points, (barWidth-(45+pointsWidth+15-1)), (topLeftCornerY+25+1));
	   						// and once again smaller font for "points"
	   						context.font = "12pt Arial";
	   						context.fillText("pts", (barWidth-(45+ptsWidth+15-1)), (topLeftCornerY+25+1));
    						
    						// change color to yellow
    						context.font = "16pt Arial";
    						context.fillStyle = "#E19C00";
    						context.lineWidth = 1;
    						context.strokeStyle = '#E19C00';
    						
    						// draw the real text
    						context.textAlign = 'center';
    						context.fillText(json_obj.contestants[iii].first_name+" "+json_obj.contestants[iii].last_name, (barWidth - (45+(nameWidth/2)+pointsWidth+30)), (topLeftCornerY+18));
	   						context.strokeText(json_obj.contestants[iii].first_name+" "+json_obj.contestants[iii].last_name, (barWidth - (45+(nameWidth/2)+pointsWidth+30)), (topLeftCornerY+18));
	   						// smaller font for company name
    						context.font = "12pt Arial";
    						context.fillText(json_obj.contestants[iii].team_name, (barWidth - (45+(nameWidth/2)+pointsWidth+30)), (topLeftCornerY+35));
    						// larger font for points again
    						context.font = "16pt Arial";
    						context.textAlign = 'left';
	   						context.fillText(json_obj.contestants[iii].points, (barWidth-(45+pointsWidth+15)), (topLeftCornerY+25));
	   						context.strokeText(json_obj.contestants[iii].points, (barWidth-(45+pointsWidth+15)), (topLeftCornerY+25));
	   						// and smaller for "points"
	   						context.font = "12pt Arial";
	   						context.fillText("pts", (barWidth-(45+ptsWidth+15)), (topLeftCornerY+25));
    					}
    					else*/ if (barWidth > (45 + nameWidth + 30))
    					{ // if we can fit just the name and not the points
    						// draw white shadow
    						context.textAlign = 'left';
    						context.fillText(json_obj.contestants[iii].first_name+" "+json_obj.contestants[iii].last_name, (barWidth - (45+nameWidth+10-1)), (topLeftCornerY+18+1));
	   						context.strokeText(json_obj.contestants[iii].first_name+" "+json_obj.contestants[iii].last_name, (barWidth - (45+nameWidth+10-1)), (topLeftCornerY+18+1));
	   						// smaller font for team names
	   						context.font = "10pt Arial";
	   						context.fillText(json_obj.contestants[iii].team_name, (barWidth - (45+nameWidth+10-1)), (topLeftCornerY+35+1));
	   						// back to larger font for points
	   						//context.font = "16pt Arial";
    						//context.textAlign = 'left';
	   						//context.fillText(json_obj.contestants[iii].points, (barWidth+15+1), (topLeftCornerY+25+1));
	   						//context.strokeText(json_obj.contestants[iii].points, (barWidth+15+1), (topLeftCornerY+25+1));
	   						// and smaller again for "pts"
	   						//context.font = "12pt Arial";
	   						//context.fillText("pts", (barWidth+15+metrics2.width+1), (topLeftCornerY+25+1));
	   						
    						// change color to yellow
    						context.font = "14pt Arial";
    						context.fillStyle = "#E19C00"; // line color
    						context.lineWidth = 1;
    						context.strokeStyle = '#E19C00';
    						
    						// draw actual text
    						//context.textAlign = 'center';
    						context.fillText(json_obj.contestants[iii].first_name+" "+json_obj.contestants[iii].last_name, (barWidth - (45+nameWidth+10)), (topLeftCornerY+18));
	   						context.strokeText(json_obj.contestants[iii].first_name+" "+json_obj.contestants[iii].last_name, (barWidth - (45+nameWidth+10)), (topLeftCornerY+18));
	   						// smaller font for company name
    						context.font = "10pt Arial";
	   						context.fillText(json_obj.contestants[iii].team_name, (barWidth - (45+nameWidth+10)), (topLeftCornerY+35));
	   						
	   						//context.fillStyle = "#777777"; // change this to grey - it falls outside the bar
	   						//context.strokeStyle = "#777777";
	   						// drawing points
	   						//context.font = "16pt Arial";
    						//context.textAlign = 'left';
	   						
	   						//context.fillText(json_obj.contestants[iii].points, (barWidth+15), (topLeftCornerY+25));
	   						//context.strokeText(json_obj.contestants[iii].points, (barWidth+15), (topLeftCornerY+25));
	   						// smaller again for "pts"
	   						//context.font = "12pt Arial";
	   						//context.fillText("pts", (barWidth+15+metrics2.width), (topLeftCornerY+25));
    					}
   						else if (barWidth > 50)
   						{ // if we can't fit the name or the points but the pic still fits on the bar
   							// draw white shadow
   							context.textAlign = 'left';
   							context.fillText(json_obj.contestants[iii].first_name+" "+json_obj.contestants[iii].last_name, (barWidth+10+1), (topLeftCornerY+18+1));
	   						context.strokeText(json_obj.contestants[iii].first_name+" "+json_obj.contestants[iii].last_name, (barWidth+10+1), (topLeftCornerY+18+1));
	   						// smaller font for team names
	   						context.font = "10pt Arial";
	   						context.fillText(json_obj.contestants[iii].team_name, (barWidth+10+1), (topLeftCornerY+35+1));
	   						// back to larger font for points
	   						//context.font = "16pt Arial";
    						//context.textAlign = 'left';
	   						//context.fillText(json_obj.contestants[iii].points, (barWidth+15+nameWidth+15+1), (topLeftCornerY+25+1));
	   						//context.strokeText(json_obj.contestants[iii].points, (barWidth+15+nameWidth+15+1), (topLeftCornerY+25+1));
	   						// and smaller again for "pts"
	   						//context.font = "12pt Arial";
	   						//context.fillText("pts", (barWidth+15+nameWidth+15+metrics2.width+1), (topLeftCornerY+25+1));
	   						
    						// change color to grey
    						context.font = "14pt Arial";
    						context.fillStyle = "#777777"; // line color
    						context.lineWidth = 1;
    						context.strokeStyle = '#777777';
    						
    						// draw actual text
    						//context.textAlign = 'center';
    						context.fillText(json_obj.contestants[iii].first_name+" "+json_obj.contestants[iii].last_name, (barWidth+10), (topLeftCornerY+18));
	   						context.strokeText(json_obj.contestants[iii].first_name+" "+json_obj.contestants[iii].last_name, (barWidth+10), (topLeftCornerY+18));
	   						// smaller font for company name
    						context.font = "10pt Arial";
    						context.fillText(json_obj.contestants[iii].team_name, (barWidth+10), (topLeftCornerY+35));
    						// larger font for points
    						//context.font = "16pt Arial";
    						//context.textAlign = 'left';
	   						//context.fillText(json_obj.contestants[iii].points, (barWidth+15+nameWidth+15), (topLeftCornerY+25));
	   						//context.strokeText(json_obj.contestants[iii].points, (barWidth+15+nameWidth+15), (topLeftCornerY+25));
	   						// and smaller for "pts"
	   						//context.font = "12pt Arial";
	   						//context.fillText("pts", (barWidth+15+nameWidth+15+metrics2.width), (topLeftCornerY+25));
   						}
   						else { // NOTHING fits in the bar!
   							// draw white shadow
   							context.textAlign = 'left';
   							context.fillText(json_obj.contestants[iii].first_name+" "+json_obj.contestants[iii].last_name, (barWidth+60+10+1), (topLeftCornerY+18+1));
	   						context.strokeText(json_obj.contestants[iii].first_name+" "+json_obj.contestants[iii].last_name, (barWidth+60+10+1), (topLeftCornerY+18+1));
	   						// smaller font for team names
	   						context.font = "10pt Arial";
	   						context.fillText(json_obj.contestants[iii].team_name, (barWidth+60+10+1), (topLeftCornerY+35+1));
	   						// back to larger font for points
	   						//context.font = "16pt Arial";
    						//context.textAlign = 'left';
	   						//context.fillText(json_obj.contestants[iii].points, (barWidth+60+15+nameWidth+15+1), (topLeftCornerY+25+1));
	   						//context.strokeText(json_obj.contestants[iii].points, (barWidth+60+15+nameWidth+15+1), (topLeftCornerY+25+1));
	   						// and smaller for "pts"
	   						//context.font = "12pt Arial";
	   						//context.fillText("pts", (barWidth+60+15+nameWidth+15+metrics2.width+1), (topLeftCornerY+25+1));
	   						
    						// change color to grey
    						context.font = "14pt Arial";
    						context.fillStyle = "#777777"; // line color
    						context.lineWidth = 1;
    						context.strokeStyle = '#777777';
    						
    						// draw actual text
    						//context.textAlign = 'center';
    						context.fillText(json_obj.contestants[iii].first_name+" "+json_obj.contestants[iii].last_name, (barWidth+60+10), (topLeftCornerY+18));
	   						context.strokeText(json_obj.contestants[iii].first_name+" "+json_obj.contestants[iii].last_name, (barWidth+60+10), (topLeftCornerY+18));
	   						// smaller font for team names
	   						context.font = "10pt Arial";
	   						context.fillText(json_obj.contestants[iii].team_name, (barWidth+60+10), (topLeftCornerY+35));
	   						// larger font for points
	   						//context.font = "16pt Arial";
    						//context.textAlign = 'left';
	   						//context.fillText(json_obj.contestants[iii].points, (barWidth+60+15+nameWidth+15), (topLeftCornerY+25));
	   						//context.strokeText(json_obj.contestants[iii].points, (barWidth+60+15+nameWidth+15), (topLeftCornerY+25));
	   						// and smaller for "pts"
	   						//context.font = "12pt Arial";
	   						//context.fillText("pts", (barWidth+60+15+nameWidth+15+metrics2.width), (topLeftCornerY+25));
   						}
					}
					
					// draw profile pics
					var image_sources = [];
					for (var hhh = 0; hhh < json_obj.contestants.length; hhh++)
					{	// fill up array with image sources pulled from database
						image_sources[hhh] = "http://www.kenkochallenge.com/img/profile_pics/cropped/" + json_obj.contestants[hhh].img;
					}
					var images = [];
					for (var ggg = 0; ggg < image_sources.length; ggg++) 
					{	// Create a bunch of new images
				        images[ggg] = new Image();
				        images[ggg].onload = function() { // When the image loads ...
				        	if (ggg >= image_sources.length-1)
				        	{
				        		for (var abc = 0; abc < images.length; abc++)
				        		{	// draw the image
				        			context.drawImage(images[abc], picX[abc], picY[abc], 45, 45);
				        		}	
				        	}
				        };
				        images[ggg].src = image_sources[ggg]; // attach its source
				    }
				}
			}
			else {
				dropbox.innerHTML = "<h2>No current competitions.</h2>";	
			}
	 } 
      else{
      		if (navigator.network.connection.type == Connection.NONE)
			{alert('Sorry, it looks like you are not connected to a network.');}
		  }
		}
}

/*
 * For updating the team leaderboard
 */
function update_team_leaderboard(top10, dropbox_id)
{
	var email = document.getElementById('hidden_email').value;
	
	var ajax = new XMLHttpRequest();
	ajax.open("POST", "http://www.kenkochallenge.com/app/team_leaderboard_json", true);
	ajax.setRequestHeader("Content-type","application/x-www-form-urlencoded");
	ajax.send("email="+email+"&top10=true");
	
	ajax.onreadystatechange=function(){
      if(ajax.readyState==4 && (ajax.status==200)){
		var dropbox = document.getElementById('leaderboard');
			var json_obj = $.parseJSON(ajax.responseText);
			if (json_obj != null)
			{
				if (json_obj.success == "false")
				{
					if (json_obj.reason == "next_comp")
					{
						dropbox.innerHTML = "<h2>The next competition will begin on " + json_obj.start_date + "!";
					}
					else {
						dropbox.innerHTML = "<h2>No current competitions.</h2>";
					}
				}
				else {
					
					if ((json_obj.teams.length > 0)&&(parseInt(json_obj.team_goal) < parseInt(json_obj.teams[0].points)))
					{scale = 1.1 * json_obj.teams[0].points;}
					else {scale = 1.1 * parseInt(json_obj.team_goal);}
					 
					
					var html = "<p>" + json_obj.days_left + " days left in the competition</p>";
					var canvasWidth = (window.innerWidth > 0) ? window.innerWidth : screen.width;
					//canvasWidth = canvasWidth - 20;
					html += "<canvas id=\"leaderboard_canvas\" width="+canvasWidth+"></canvas>";
					dropbox.innerHTML = html;
					
					var canvas = document.getElementById('leaderboard_canvas'); 
					
					canvas.height = (json_obj.teams.length * 78) + 39;
					var context = canvas.getContext("2d");
					
					// Draws background
					context.beginPath();
					context.rect(0, 0, 700, canvas.height);
					context.fillStyle = "#F3F3F3";
    				context.fill();
					
					// Creates goal line
					var goal_line = Math.floor((canvas.width / scale) * json_obj.team_goal);
					context.beginPath();
					context.moveTo(goal_line, 0);
					context.lineTo(goal_line, canvas.height);
					context.lineWidth = 8;
					context.strokeStyle = "#000000";
					//context.strokeStyle = "#00632A"; // line color
					context.stroke();
					
					// creating tic lines
					var ticGradient = context.createLinearGradient(0,0,0,canvas.height);
					ticGradient.addColorStop(0, '#eeeeee');
					ticGradient.addColorStop(1, '#bbbbbb');
					for (var lineNum = 1; lineNum < 10; lineNum++)
					{
						var tic_line = (Math.floor(goal_line/10)*lineNum);
						context.beginPath();
						context.moveTo(tic_line, 0);
						context.lineTo(tic_line, canvas.height);
						context.lineWidth = 8;
						context.strokeStyle = ticGradient; // line color
						context.stroke();
					}
					
    				// creating gradients for inner shadow of background
					var bkgrdTopGradient = context.createLinearGradient(0,0,0,15);
					bkgrdTopGradient.addColorStop(0, 'rgba(0, 0, 0, .1)');
					bkgrdTopGradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
					context.beginPath();
					context.rect(0,0,700,15);
					context.fillStyle = bkgrdTopGradient;
					context.fill();
					
					var bkgrdBottomGradient = context.createLinearGradient(0,(canvas.height-15),0,canvas.height);
					bkgrdBottomGradient.addColorStop(0, 'rgba(0, 0, 0, 0)');
					bkgrdBottomGradient.addColorStop(1, 'rgba(0, 0, 0, .1)');
					context.beginPath();
					context.rect(0,canvas.height-15,700,15);
					context.fillStyle = bkgrdBottomGradient;
					context.fill();
					
					var bkgrdLeftGradient = context.createLinearGradient(0,0,15,0);
					bkgrdLeftGradient.addColorStop(0, 'rgba(0, 0, 0, .1)');
					bkgrdLeftGradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
					context.beginPath();
					context.rect(0,0,15,canvas.height);
					context.fillStyle = bkgrdLeftGradient;
					context.fill();
					
					var bkgrdRightGradient = context.createLinearGradient(685,0,700,0);
					bkgrdRightGradient.addColorStop(0, 'rgba(0, 0, 0, 0)');
					bkgrdRightGradient.addColorStop(1, 'rgba(0, 0, 0, .1)');
					context.beginPath();
					context.rect(685,0,15,canvas.height);
					context.fillStyle = bkgrdRightGradient;
					context.fill();
					
					// initialize a few variables for the bars
					var picX = [];
					var picY = [];
					var barGradient;
				
					// start drawing bars
					for (var iii = 0; iii < json_obj.teams.length; iii++)
					{
						var topLeftCornerY = (iii*78) + 39;
						var barWidth = Math.floor((canvas.width / scale) * json_obj.teams[iii].points);
						
						// Set up gradient for bar
						barGradient = context.createLinearGradient(0, topLeftCornerY, 0, (topLeftCornerY+39));
						barGradient.addColorStop(0, '#FFF086');
						barGradient.addColorStop(.04, '#FFDF00');
						barGradient.addColorStop(.96, '#FEC000');
						barGradient.addColorStop(1, '#FDAF00');
						
						// color bar
						context.beginPath();
						context.rect(0, topLeftCornerY, barWidth, 39);
						context.fillStyle = barGradient; //"#8ED6FF";
    					context.fill();
    					
    					// draw names and points starting here...
    					context.beginPath();
    					// get pixel length of text "pts"
    					context.font = "10pt Arial";
    					var metricsPts = context.measureText("pts");
    					var ptsWidth = metricsPts.width;
    					// get pixel length of company name in 12 pt
    					var metricsCompany = context.measureText(json_obj.teams[iii].company_name);
    					var companyWidth = metricsCompany.width;
    					
    					// this will be our real font
    					context.font = "14pt Arial";
    					context.fillStyle = "#FFFFFF"; // fill color
    					context.lineWidth = 1;
    					context.strokeStyle = '#FFFFFF'; // added stroke to make it bold
    					// Check name length in pixels
    					var metricsTeam = context.measureText(json_obj.teams[iii].team_name);
    					var nameWidth = (metricsTeam.width > companyWidth ? metricsTeam.width : companyWidth); // nameWidth is wider of either company or team name
    					// Check points length in pixels
    					var metricsPoints = context.measureText(json_obj.teams[iii].points);
    					var pointsWidth = metricsPoints.width + ptsWidth;
    					/*
    					if (barWidth > (nameWidth + pointsWidth + 30))
    					{ // if bar is longer than name, points, and spacers...
    						// draw white shadow
    						context.textAlign = 'center';
    						context.fillText(json_obj.teams[iii].team_name, (barWidth - ((nameWidth/2)+pointsWidth+30-1)), (topLeftCornerY+18+1));
    						context.strokeText(json_obj.teams[iii].team_name, (barWidth - ((nameWidth/2)+pointsWidth+30-1)), (topLeftCornerY+18+1));
    						// smaller font for company name
    						context.font = "12pt Arial";
    						context.fillText(json_obj.teams[iii].company_name, (barWidth - ((nameWidth/2)+pointsWidth+30-1)), (topLeftCornerY+35+1));
    						// Back to larger font for points
    						context.font = "16pt Arial";
    						context.textAlign = 'left';
    						context.fillText(json_obj.teams[iii].points, (barWidth - (pointsWidth+15-1)), (topLeftCornerY+25+1));
    						context.strokeText(json_obj.teams[iii].points, (barWidth - (pointsWidth+15-1)), (topLeftCornerY+25+1));
							// and back to smaller font for "pts"
							context.font = "12pt Arial";
							context.fillText("pts", (barWidth-(ptsWidth+15-1)), (topLeftCornerY+25+1));
    						
    						// change color to yellow and do it again!
    						context.font = "16pt Arial";
    						context.fillStyle = "#E19C00";
    						context.lineWidth = 1;
    						context.strokeStyle = '#E19C00';
    						// draw team name
    						context.textAlign = 'center';
    						context.fillText(json_obj.teams[iii].team_name, (barWidth - ((nameWidth/2)+pointsWidth+30)), (topLeftCornerY+18));
    						context.strokeText(json_obj.teams[iii].team_name, (barWidth - ((nameWidth/2)+pointsWidth+30)), (topLeftCornerY+18));
    						// smaller font for company name
    						context.font = "12pt Arial";
    						context.fillText(json_obj.teams[iii].company_name, (barWidth - ((nameWidth/2)+pointsWidth+30)), (topLeftCornerY+35));
    						// Back to larger font for points
    						context.font = "16pt Arial";
    						context.textAlign = 'left';
    						context.fillText(json_obj.teams[iii].points, (barWidth - (pointsWidth+15)), (topLeftCornerY+25));
    						context.strokeText(json_obj.teams[iii].points, (barWidth - (pointsWidth+15)), (topLeftCornerY+25));
							// and back to smaller font for "pts"
							context.font = "12pt Arial";
							context.fillText("pts", (barWidth-(ptsWidth+15)), (topLeftCornerY+25));
    					}
    					else*/ if (barWidth > (nameWidth + 30))
    					{ // if we can fit just the name and not the points
    						// draw white shadow
    						context.textAlign = 'left';
    						context.fillText(json_obj.teams[iii].team_name, (barWidth - (nameWidth+10-1)), (topLeftCornerY+18+1));
    						context.strokeText(json_obj.teams[iii].team_name, (barWidth - (nameWidth+10-1)), (topLeftCornerY+18+1));
    						// smaller font for company name
    						context.font = "10pt Arial";
    						context.fillText(json_obj.teams[iii].company_name, (barWidth - (nameWidth+10-1)), (topLeftCornerY+35+1));
    						// Back to larger font for points - This will be off the bar
    						//context.font = "16pt Arial";
    						//context.textAlign = 'left';
    						//context.fillText(json_obj.teams[iii].points, (barWidth+15+1), (topLeftCornerY+25+1));
    						//context.strokeText(json_obj.teams[iii].points, (barWidth+15+1), (topLeftCornerY+25+1));
							// and back to smaller font for "pts"
							//context.font = "12pt Arial";
							//context.fillText("pts", (barWidth+metricsPoints.width+15+1), (topLeftCornerY+25+1));
							
							// change color to yellow and do it again!
    						context.font = "14pt Arial";
    						context.fillStyle = "#E19C00";
    						context.lineWidth = 1;
    						context.strokeStyle = '#E19C00';
    						// Team name
    						//context.textAlign = 'center';
    						context.fillText(json_obj.teams[iii].team_name, (barWidth - (nameWidth+10)), (topLeftCornerY+18+1));
    						context.strokeText(json_obj.teams[iii].team_name, (barWidth - (nameWidth+10)), (topLeftCornerY+18));
    						// smaller font for company name
    						context.font = "10pt Arial";
    						context.fillText(json_obj.teams[iii].company_name, (barWidth - (nameWidth+10)), (topLeftCornerY+35));
    						// Back to larger font for points - this will be off the bar and grey
    						//context.fillStyle = "#777777";
    						//context.strokeStyle = "#777777";
    						//context.font = "16pt Arial";
    						//context.textAlign = 'left';
    						//context.fillText(json_obj.teams[iii].points, (barWidth+15), (topLeftCornerY+25));
    						//context.strokeText(json_obj.teams[iii].points, (barWidth+15), (topLeftCornerY+25));
							// and back to smaller font for "pts"
							//context.font = "12pt Arial";
							//context.fillText("pts", (barWidth+metricsPoints.width+15), (topLeftCornerY+25));
    					}
   						else { // NOTHING fits in the bar!
   							// draw white shadow
   							context.textAlign = 'left';
    						context.fillText(json_obj.teams[iii].team_name, (barWidth+10+1), (topLeftCornerY+18+1));
    						context.strokeText(json_obj.teams[iii].team_name, (barWidth+10+1), (topLeftCornerY+18+1));
    						// smaller font for company name
    						context.font = "10pt Arial";
    						context.fillText(json_obj.teams[iii].company_name, (barWidth+10+1), (topLeftCornerY+35+1));
    						// Back to larger font for points
    						//context.font = "16pt Arial";
    						//context.textAlign = 'left';
    						//context.fillText(json_obj.teams[iii].points, (barWidth+15+nameWidth+15+1), (topLeftCornerY+25+1));
    						//context.strokeText(json_obj.teams[iii].points, (barWidth+15+nameWidth+15+1), (topLeftCornerY+25+1));
							// and back to smaller font for "pts"
							//context.font = "12pt Arial";
							//context.fillText("pts", (barWidth+15+nameWidth+15+metricsPoints.width+1), (topLeftCornerY+25+1));
							
							// change color to grey and do it again!
    						context.font = "14pt Arial";
    						context.fillStyle = "#777777";
    						context.lineWidth = 1;
    						context.strokeStyle = '#777777';
    						// draw team name
    						//context.textAlign = 'center';
    						context.fillText(json_obj.teams[iii].team_name, (barWidth+10), (topLeftCornerY+18));
    						context.strokeText(json_obj.teams[iii].team_name, (barWidth+10), (topLeftCornerY+18));
    						// smaller font for company name
    						context.font = "10pt Arial";
    						context.fillText(json_obj.teams[iii].company_name, (barWidth+10), (topLeftCornerY+35));
    						// Back to larger font for points
    						//context.font = "16pt Arial";
    						//context.textAlign = 'left';
    						//context.fillText(json_obj.teams[iii].points, (barWidth+15+nameWidth+15), (topLeftCornerY+25));
    						//context.strokeText(json_obj.teams[iii].points, (barWidth+15+nameWidth+15), (topLeftCornerY+25));
							// and back to smaller font for "pts"
							//context.font = "12pt Arial";
							//context.fillText("pts", (barWidth+15+nameWidth+15+metricsPoints.width), (topLeftCornerY+25));
   							
   						}
   						
					}
				}
			}
			else {
				dropbox.innerHTML = "<h2>No current competitions.</h2>";	
			}
	 } 
      else{
      		if (navigator.network.connection.type == Connection.NONE)
			{alert('Sorry, it looks like you are not connected to a network.');}
		  }
		}
}

/*
 * This function sets up the camera for the food police game
 */

function food_police_evidence()
{
	navigator.camera.getPicture(onFoodPoliceSuccess, onFail, { 
		quality: 50, 
		destinationType : Camera.DestinationType.FILE_URI,
		sourceType : Camera.PictureSourceType.CAMERA, 
		allow_edit: false,
		encodingType: Camera.EncodingType.JPEG,
  		targetWidth: 640,
  		targetHeight: 676  
		});
}

/*
 * Called when successfully taken picture
 */
function onFoodPoliceSuccess(imageURI)
{
	var email = document.getElementById('hidden_email').value;
	
	var ajax = new XMLHttpRequest();
	ajax.open("POST", "http://www.kenkochallenge.com/app/food_police_confirm", true);
	ajax.setRequestHeader("Content-type","application/x-www-form-urlencoded");
	ajax.send("email="+email+"&imageURI="+imageURI);
	
	ajax.onreadystatechange=function(){
      if(ajax.readyState==4 && (ajax.status==200)){
           document.getElementById('main').innerHTML = ajax.responseText;
           drop_bars();
      }
	  else {
		if (navigator.network.connection.type == Connection.NONE)
			{alert('Sorry, it looks like you are not connected to a network.');}
	  }
	}
}

/*
 * Called when user submits photo and description for food police
 */
function submit_fp(imageURI)
{
	var email = document.getElementById('hidden_email').value;
	var guilty = document.getElementById('fp_guilty').value;
	var description = document.getElementById('fp_description').value;
	var imageURI = document.getElementById('fp_imageURI').value;
	
	// !! Assumes variable fileURI contains a valid URI to a  text file on the device

	var win = function(r) {
	    console.log("Code = " + r.responseCode);
	    console.log("Response = " + r.response);
	    console.log("Sent = " + r.bytesSent);
	    document.getElementById('main').innerHTML = r.response;
	    init_slider();
	}
	
	var fail = function(error) {
	    alert("An error has occurred: Code = " + error.code);
	    console.log("upload error source " + error.source);
	    console.log("upload error target " + error.target);
	}
	
	var options = new FileUploadOptions();
	options.fileKey="userfile";
	//options.fileName=fileURI.substr(fileURI.lastIndexOf('/')+1);
	//options.mimeType="text/plain";
	options.chunkedMode = false;
	
	var params = new Object();
	params.email = email;
	params.guilty = guilty;
	params.description = description
	params.imageURI = imageURI;
	
	options.params = params;
	
	var ft = new FileTransfer();
	ft.upload(imageURI, "http://www.kenkochallenge.com/app/food_police_upload", win, fail, options, true);
	
}

/*
 * Checks if WIA photo is landscape - if not, rotates it, then overlays png in the correct spot
 */
function prep_wia()
{
		var wia_image = document.getElementById('wia_image');
		var overlay = document.getElementById('wia_overlay');
		var parent_div = document.getElementById('wia_image_div');
		//document.getElementById('wia_description').value = "test";
		
	$("img").load(function(){
		//document.getElementById('wia_description').value = "Height: "+wia_image.clientWidth+" Height: "+wia_image.clientHeight;
		if (wia_image.clientHeight > wia_image.clientWidth)
		{
			
			wia_image.style.width = "300px";
			wia_image.style.webkitTransform = "rotate(90deg)";
			wia_image.style.left = "0px";
			wia_image.style.top = "0px";
			parent_div.style.height = wia_image.clientHeight;
			//document.getElementById('wia_description').value = "Diff: "+(wia_image.clientWidth - overlay.clientHeight)+" Top: "+overlay.style.top;

		}
		else
		{
			wia_image.style.width = "300px";
			wia_image.style.left = "0px";
			wia_image.style.top = "0px";
			overlay.style.top = wia_image.clientHeight - overlay.clientHeight+"px";
			//document.getElementById('wia_description').value = "Diff: "+(wia_image.clientHeight - overlay.clientHeight)+" Top: "+overlay.style.top;
		}
	});
	
}


/*
 * This function sets up the camera for the what I ate game
 */

function what_i_ate_photo()
{
	navigator.camera.getPicture(onWiaSuccess, onFail, { 
		quality: 50, 
		destinationType : Camera.DestinationType.FILE_URI,
		sourceType : Camera.PictureSourceType.CAMERA, 
		allow_edit: false,
		encodingType: Camera.EncodingType.JPEG,
  		targetWidth: 640,
  		targetHeight: 676  
		});
}

/*
 * Called when successfully taken picture
 */
function onWiaSuccess(imageURI)
{
	var email = document.getElementById('hidden_email').value;
	
	var ajax = new XMLHttpRequest();
	ajax.open("POST", "http://www.kenkochallenge.com/app/wia_confirm", true);
	ajax.setRequestHeader("Content-type","application/x-www-form-urlencoded");
	ajax.send("email="+email+"&imageURI="+imageURI);
	
	ajax.onreadystatechange=function(){
      if(ajax.readyState==4 && (ajax.status==200)){
           document.getElementById('main').innerHTML = ajax.responseText;
           prep_wia();
      }
	  else {
		if (navigator.network.connection.type == Connection.NONE)
			{alert('Sorry, it looks like you are not connected to a network.');}
	  }
	}
}

/*
 * Called when user submits photo and description for what I ate
 */
function submit_wia(imageURI)
{
	var email = document.getElementById('hidden_email').value;
	var description = document.getElementById('wia_description').value;
	var imageURI = document.getElementById('wia_imageURI').value;
	
	// !! Assumes variable fileURI contains a valid URI to a  text file on the device

	var win = function(r) {
	    console.log("Code = " + r.responseCode);
	    console.log("Response = " + r.response);
	    console.log("Sent = " + r.bytesSent);
	    document.getElementById('main').innerHTML = r.response;
	    init_slider();
	}
	
	var fail = function(error) {
	    alert("An error has occurred: Code = " + error.code);
	    console.log("upload error source " + error.source);
	    console.log("upload error target " + error.target);
	}
	
	var options = new FileUploadOptions();
	options.fileKey="userfile";
	//options.fileName=fileURI.substr(fileURI.lastIndexOf('/')+1);
	//options.mimeType="text/plain";
	options.chunkedMode = false;
	
	var params = new Object();
	params.email = email;
	params.description = description;
	params.imageURI = imageURI;
	
	options.params = params;
	
	var ft = new FileTransfer();
	ft.upload(imageURI, "http://www.kenkochallenge.com/app/wia_upload", win, fail, options, true);
	
}

/*
 * QR test...
 */
function qr_test()
{
	window.plugins.barcodeScanner.scan( function(result) {
        alert("We got a barcode\n" +
                  "Result: " + result.text + "\n" +
                  "Format: " + result.format + "\n" +
                  "Cancelled: " + result.cancelled);
    }, function(error) {
        alert("Scanning failed: " + error);
    });
}

/*
 * QR scan for QR code hunt
 */
/*
function qr_scan()
{
	window.plugins.barcodeScanner.scan( function(result) {
		if (result.text == "Kenko1")
		{
			if(document.getElementById('hidden_next_code')&&document.getElementById('hidden_next_code').value!=1)
			{
				alert('Sorry, you have to find the codes in order!');
			}
			else{qr_send(1);}
		}
		else if (result.text == "Kenko2")
		{
			if(document.getElementById('hidden_next_code')&&document.getElementById('hidden_next_code').value!=2)
			{
				alert('Sorry, you have to find the codes in order!');
			}
			else{qr_send(2);}
		}
		else if (result.text == "Kenko3")
		{
			if(document.getElementById('hidden_next_code')&&document.getElementById('hidden_next_code').value!=3)
			{
				alert('Sorry, you have to find the codes in order!');
			}
			else{qr_send(3);}
		}
		else if (result.text == "Kenko4")
		{
			if(document.getElementById('hidden_next_code')&&document.getElementById('hidden_next_code').value!=4)
			{
				alert('Sorry, you have to find the codes in order!');
			}
			else{qr_send(4);}
		}
		else {
			alert("Sorry, this isn't a QR Code you are looking for!"); 
		}
	}, function(error) {
		alert("Scanning failed: " + error);
	});
}
*/


/*
 * Improved QR scan for QR code hunt.
 * Gives an error message if they scan the same code more than once (even if they don't have to do it in order)
 * Gives error messages by replacing innerHTML of error div rather than alerts (which freeze in iOS)
 */

function qr_scan()
{
	var error_div = document.getElementById('error');
	var next_code = document.getElementById('hidden_next_code').value;
	window.plugins.barcodeScanner.scan( function(result){
		switch (result.text)
		{
			case "Kenko1":
				if (next_code !== "0" && next_code !== "1")
				{error_div.innerHTML = "<p class=\"error\">Sorry, you have to scan the codes in order!</p>";}
				else if (document.getElementById('hidden_base1').value == "1")
				{error_div.innerHTML = "<p class=\"error\">Sorry, you already scanned this code!</p>";}
				else 
				{qr_send(1);}
				break;
			case "Kenko2":
				if (next_code !== "0" && next_code !== "2")
				{error_div.innerHTML = "<p class=\"error\">Sorry, you have to scan the codes in order!</p>";}
				else if (document.getElementById('hidden_base2').value == "1")
				{error_div.innerHTML = "<p class=\"error\">Sorry, you already scanned this code!</p>";}
				else 
				{qr_send(2);}
				break;
			case "Kenko3":
				if (next_code !== "0" && next_code !== "3")
				{error_div.innerHTML = "<p class=\"error\">Sorry, you have to scan the codes in order!</p>";}
				else if (document.getElementById('hidden_base3').value == "1")
				{error_div.innerHTML = "<p class=\"error\">Sorry, you already scanned this code!</p>";}
				else 
				{qr_send(3);}
				break;
			case "Kenko4":
				if (next_code !== "0" && next_code !== "4")
				{error_div.innerHTML = "<p class=\"error\">Sorry, you have to scan the codes in order!</p>";}
				else if (document.getElementById('hidden_base4').value == "1")
				{error_div.innerHTML = "<p class=\"error\">Sorry, you already scanned this code!</p>";}
				else 
				{qr_send(4);}
				break;
			default:
				error_div.innerHTML = "<p class=\"error\">Sorry, this isn't a QR Code you are looking for!</p>";
		}
	}, function(error) {
		error_div.innerHTML = "<p class=\"error\">Error - Scanning filed: " + error+"</p>";
	});
}

/*
 * Called when user has successfully scanned one of the QR codes...
 */
function qr_send(base)
{
	var email = document.getElementById('hidden_email').value;
	var hunt = document.getElementById('hidden_hunt').value;
	
	var ajax = new XMLHttpRequest();
	ajax.open("POST", "http://www.kenkochallenge.com/app/qr_scanned", true);
	ajax.setRequestHeader("Content-type","application/x-www-form-urlencoded");
	ajax.send("email="+email+"&hunt="+hunt+"&base="+base);
	
	ajax.onreadystatechange=function(){
      if(ajax.readyState==4 && (ajax.status==200)){
           document.getElementById('main').innerHTML = ajax.responseText;
           qr_start_timer();
           init_slider();
      }
	  else {
		if (navigator.network.connection.type == Connection.NONE)
			{alert('Sorry, it looks like you are not connected to a network.');}
	  }
	}
}

/*
 * Called to start the timer on qr games 
 */
function qr_start_timer()
{
	if (document.getElementById('hours'))
	{
		var hours = document.getElementById('hours');
		var minutes = document.getElementById('minutes');
		var seconds = document.getElementById('seconds');
		qr_timer_countdown(hours, minutes, seconds);
	}
}

/*
 * Iterating timer function for qr timer
 */

function qr_timer_countdown(hours, minutes, seconds)
{
	if (parseInt(seconds.innerHTML, 10)==0)
	{
		if (parseInt(minutes.innerHTML, 10)==0)
		{
			if (parseInt(hours.innerHTML, 10)==0)
			{
				document.getElementById('timer').innerHTML = "Time's Up!";
				qr_fail();
			}
			else {
				seconds.innerHTML = 59;
				minutes.innerHTML = 59;
				hours.innerHTML = parseInt(hours.innerHTML, 10) - 1;
				setTimeout(function(){qr_timer_countdown(hours, minutes, seconds);}, 1000);
			}
		}
		else {
			seconds.innerHTML = 59; 
			var new_minutes = parseInt(minutes.innerHTML, 10) - 1;
			if (new_minutes < 10){new_minutes = "0"+new_minutes;}
			minutes.innerHTML = new_minutes;
			setTimeout(function(){qr_timer_countdown(hours, minutes, seconds);}, 1000);
		}
	}
	else {
		var new_seconds = parseInt(seconds.innerHTML, 10) - 1;
		if (new_seconds < 10){new_seconds = "0"+new_seconds;}
		seconds.innerHTML = new_seconds;
		setTimeout(function(){qr_timer_countdown(hours, minutes, seconds);}, 1000);
	}
}

/*
 * Called when timer runs out on QR game
 */
function qr_fail()
{
	var email = document.getElementById('hidden_email').value;
	var hunt = document.getElementById('hidden_hunt').value;
	
	var ajax = new XMLHttpRequest();
	ajax.open("POST", "http://www.kenkochallenge.com/app/qr_failed", true);
	ajax.setRequestHeader("Content-type","application/x-www-form-urlencoded");
	ajax.send("email="+email+"&hunt="+hunt);
	
	ajax.onreadystatechange=function(){
      if(ajax.readyState==4 && (ajax.status==200)){
           document.getElementById('main').innerHTML = ajax.responseText;
           init_slider();
      }
	  else {
		if (navigator.network.connection.type == Connection.NONE)
			{alert('Sorry, it looks like you are not connected to a network.');}
	  }
	}
}

/*
 * Called when user wants to try failed qr code hunt again, clearing records and reloading page
 */
function qr_try_again()
{
	var email = document.getElementById('hidden_email').value;
	var hunt = document.getElementById('hidden_hunt').value;
	
	var ajax = new XMLHttpRequest();
	ajax.open("POST", "http://www.kenkochallenge.com/app/qr_try_again", true);
	ajax.setRequestHeader("Content-type","application/x-www-form-urlencoded");
	ajax.send("email="+email+"&hunt="+hunt);
	
	ajax.onreadystatechange=function(){
      if(ajax.readyState==4 && (ajax.status==200)){
           document.getElementById('main').innerHTML = ajax.responseText;
           init_slider();
      }
	  else {
		if (navigator.network.connection.type == Connection.NONE)
			{alert('Sorry, it looks like you are not connected to a network.');}
	  }
	}
}

/*
 * Called when phonegap api function fails...
 */
function onFail(message) 
{
  	alert('Failed because: ' + message);
}

/*
 * Called when logged out. Destroys local storage of username and password (if any) and redirects to login page
 */
function logout()
{
	window.localStorage.removeItem("kenkoUN");
	window.localStorage.removeItem("kenkoPW");
	loadLogin();
}


/*
 * RoyalSlider  v8.1
 *
 * Copyright 2011-2012, Dmitry Semenov
 * 
 */
(function($){function RoyalSlider(f,g){this.slider=$(f);this._az="";this._by="";this._cx="";var h=this;this.settings=$.extend({},$.fn.royalSlider.defaults,g);this.isSlideshowRunning=false;this._dw=false;this._ev=this.slider.find(".royalSlidesContainer");this._fu=this._ev.wrap('<div class="royalWrapper"/>').parent();this.slides=this._ev.find(".royalSlide");this._gt="<p class='royalPreloader'></p>";this._hs=false;this._ir=false;if("ontouchstart"in window){if(!this.settings.disableTranslate3d){if(('WebKitCSSMatrix'in window&&'m11'in new WebKitCSSMatrix())){this._ev.css({"-webkit-transform-origin":"0 0","-webkit-transform":"translateZ(0)"});this._ir=true}}this.hasTouch=true;this._az="touchstart.rs";this._by="touchmove.rs";this._cx="touchend.rs"}else{this.hasTouch=false;if(this.settings.dragUsingMouse){this._az="mousedown.rs";this._by="mousemove.rs";this._cx="mouseup.rs"}else{this._ev.addClass('auto-cursor')}}if(this.hasTouch){this.settings.directionNavAutoHide=false;this.settings.hideArrowOnLastSlide=true}if($.browser.msie&&parseInt($.browser.version,10)<=8){this._jq=true}else{this._jq=false}this.slidesArr=[];var i,jqSlide,dataSRC,slideImg;this.slides.each(function(){jqSlide=$(this);i={};i.slide=jqSlide;if(h.settings.blockLinksOnDrag){if(!this.hasTouch){jqSlide.find('a').bind('click.rs',function(e){if(h._hs){e.preventDefault();return false}})}else{var c=jqSlide.find('a');var d;c.each(function(){d=$(this);d.data('royalhref',d.attr('href'));d.data('royaltarget',d.attr('target'));d.attr('href','#');d.bind('click',function(e){e.preventDefault();if(h._hs){return false}else{var a=$(this).data('royalhref');var b=$(this).data('royaltarget');if(!b||b.toLowerCase()==='_kp'){window.location.href=a}else{window.open(a)}}})})}}if(h.settings.nonDraggableClassEnabled){jqSlide.find('.non-draggable').bind(h._az,function(e){h._hs=false;e.stopImmediatePropagation()})}dataSRC=jqSlide.attr("data-src");if(dataSRC==undefined||dataSRC==""||dataSRC=="none"){i.preload=false}else{i.preload=true;i.preloadURL=dataSRC}if(h.settings.captionAnimationEnabled){i.caption=jqSlide.find(".royalCaption").css("display","none")}h.slidesArr.push(i)});this._lo=false;if(this.settings.removeCaptionsOpacityInIE8){if($.browser.msie&&parseInt($.browser.version,10)<=8){this._lo=true}}if(this.settings.autoScaleSlider){this.sliderScaleRatio=this.settings.autoScaleSliderHeight/this.settings.autoScaleSliderWidth}this.slider.css("overflow","visible");this.slideWidth=0;this.slideshowTimer='';this.mn=false;this.numSlides=this.slides.length;this.currentSlideId=this.settings.startSlideIndex;this.lastSlideId=-1;this.isAnimating=true;this.wasSlideshowPlaying=false;this._az1=0;this._by1=0;this._cx1=false;this._dw1=[];this._ev1=[];this._fu1=false;this._gt1=false;this._hs1=0;this._ir1=0;this._jq1=0;this._kp1=0;this._lo1=0;this._mn1=0;this._az2=false;this._by2=false;if(this.settings.slideTransitionType==="fade"){if(this._ir||('WebKitCSSMatrix'in window&&'m11'in new WebKitCSSMatrix())){this._cx2=true}else{this._cx2=false}this._dw2=$("<div class='fade-container'></div>").appendTo(this._fu)}if(this.settings.slideshowEnabled&&this.settings.slideshowDelay>0){if(!this.hasTouch&&this.settings.slideshowPauseOnHover){this.slider.hover(function(){h._by2=true;h._ev2(true)},function(){h._by2=false;h._fu2(true)})}this.slideshowEnabled=true}else{this.slideshowEnabled=false}this._gt2();if(this.settings.controlNavEnabled){var j;this._hs2Container='';var k;if(!h.settings.controlNavThumbs){this._hs2Container=$('<div class="royalControlNavOverflow"><div class="royalControlNavContainer"><div class="royalControlNavCenterer"></div></div></div>');j=this._hs2Container.find('.royalControlNavCenterer')}else{this.slider.addClass('with-thumbs');if(h.settings.controlNavThumbsNavigation){k=$('<div class="thumbsAndArrowsContainer"></div>');this.thumbsArrowLeft=$("<a href='#' class='thumbsArrow left'></a>");this.thumbsArrowRight=$("<a href='#' class='thumbsArrow right'></a>");k.append(this.thumbsArrowLeft);k.append(this.thumbsArrowRight);var l=parseInt(this.thumbsArrowLeft.outerWidth(),10);this._hs2Container=$('<div class="royalControlNavOverflow royalThumbs"><div class="royalControlNavThumbsContainer"></div></div>');j=this._hs2Container.find('.royalControlNavThumbsContainer')}else{this._hs2Container=$('<div class="royalControlNavOverflow royalThumbs"><div class="royalControlNavContainer"><div class="royalControlNavCenterer"></div></div></div>');j=this._hs2Container.find(".royalControlNavCenterer")}}var m=0;this.slides.each(function(a){if(h.settings.controlNavThumbs){j.append('<a href="#" class="royalThumb" style="background-image:url('+$(this).attr("data-thumb")+')">'+(a+1)+'</a>')}else{j.append('<a href="#">'+(a+1)+'</a>')}m++});this.navItems=j.children();if(k){k.append(this._hs2Container);this._fu.after(k)}else{this._fu.after(this._hs2Container)}if(h.settings.controlNavThumbs&&h.settings.controlNavThumbsNavigation){this._kp2=true;this._lo2=false;this._mn2=j;if(this._ir){this._mn2.css({'-webkit-transition-duration':this.settings.controlNavThumbsSpeed+"ms",'-webkit-transition-property':'-webkit-transform','-webkit-transition-timing-function':"ease-in-out"})}this._az3=m;var n=this.navItems.eq(0);this._by3=n.outerWidth(true);this._cx3=this._by3*this._az3;this._mn2.css("width",this._cx3);this._dw3=parseInt(n.css("marginRight"),10);this._cx3-=this._dw3;this._ev3=0;this._fu3();this.thumbsArrowLeft.click(function(e){e.preventDefault();if(!h._kp2){h._gt3(h._ev3+h._hs3+h._dw3)}});this.thumbsArrowRight.click(function(e){e.preventDefault();if(!h._lo2){h._gt3(h._ev3-h._hs3-h._dw3)}})}this._ir3()}if(this.settings.directionNavEnabled){this._fu.after("<a href='#' class='arrow left'/>");this._fu.after("<a href='#' class='arrow right'/>");this.arrowLeft=this.slider.find("a.arrow.left");this.arrowRight=this.slider.find("a.arrow.right");if(this.arrowLeft.length<1||this.arrowRight.length<1){this.settings.directionNavEnabled=false}else if(this.settings.directionNavAutoHide){this.arrowLeft.hide();this.arrowRight.hide();this.slider.one("mousemove.arrowshover",function(){h.arrowLeft.fadeIn("fast");h.arrowRight.fadeIn("fast")});this.slider.hover(function(){h.arrowLeft.fadeIn("fast");h.arrowRight.fadeIn("fast")},function(){h.arrowLeft.fadeOut("fast");h.arrowRight.fadeOut("fast")})}this._jq3()}this.sliderWidth=0;this.sliderHeight=0;var o;this._kp3='onorientationchange'in window?'orientationchange.royalslider':'resize.royalslider';$(window).bind(this._kp3,function(){if(o){clearTimeout(o)}o=setTimeout(function(){h.updateSliderSize()},100)});this.updateSliderSize();this.settings.beforeLoadStart.call(this);var p=this.slidesArr[this.currentSlideId];if(this.currentSlideId!=0){if(!this._ir){this._ev.css({'left':-this.currentSlideId*this.slideWidth})}else{this._ev.css({'-webkit-transition-duration':'0','-webkit-transition-property':'none'});this._ev.css({'-webkit-transform':'translate3d('+ -this.currentSlideId*this.slideWidth+'px, 0, 0)'})}}if(this.settings.welcomeScreenEnabled){function hideWelcomeScreen(a){h.settings.loadingComplete.call(h);if(a&&h.settings.preloadNearbyImages){h._lo3(h.currentSlideId)}h.slider.find('.royalLoadingScreen').fadeOut(h.settings.welcomeScreenShowSpeed);setTimeout(function(){h._mn3()},h.settings.welcomeScreenShowSpeed+100)}if(p.preload){this._lo3(this.currentSlideId,function(){hideWelcomeScreen(false)})}else{slideImg=p.slide.find('img.royalImage')[0];if(slideImg){if(this._az4(slideImg)){hideWelcomeScreen(true);$(slideImg).css('opacity',0);$(slideImg).animate({"opacity":1},"fast")}else{$(slideImg).css('opacity',0);$('<img />').load(function(){hideWelcomeScreen(true);$(slideImg).animate({"opacity":1},"fast")}).attr('src',slideImg.src)}}else{hideWelcomeScreen(true)}}}else{if(p.preload){this._by4(p,function(){h.settings.loadingComplete.call(h);if(h.settings.preloadNearbyImages){h._lo3(h.currentSlideId)}})}else{slideImg=p.slide.find('img.royalImage')[0];if(slideImg){if(this._az4(slideImg)){$(slideImg).css('opacity',0).animate({"opacity":1},"fast")}else{$(slideImg).css('opacity',0);$('<img />').load(function(){$(slideImg).animate({"opacity":1},"fast")}).attr('src',slideImg.src)}}this.settings.loadingComplete.call(this)}setTimeout(function(){h._mn3()},100)}}RoyalSlider.prototype={goTo:function(a,b,c,d,f){if(!this.isAnimating){this.isAnimating=true;var g=this;this.lastSlideId=this.currentSlideId;this.currentSlideId=a;this._gt1=true;this._fu1=true;if(this.lastSlideId!=a){this._ir3(c);this._lo3(a)}this._jq3();this.settings.beforeSlideChange.call(this);if(this.slideshowEnabled&&this.slideshowTimer){this.wasSlideshowPlaying=true;this._ev2()}var h=!b?this.settings.slideTransitionSpeed:0;if(d||b||this.settings.slideTransitionType==="move"){var i;if(f>0){h=f}else{i=this.settings.slideTransitionEasing}if(!this._ir){if(parseInt(this._ev.css("left"),10)!==-this.currentSlideId*this.slideWidth){this._ev.animate({left:-this.currentSlideId*this.slideWidth},h,(f>0?"easeOutSine":this.settings.slideTransitionEasing),function(){g._cx4()})}else{this._cx4()}}else{if(this._dw4()!==-this.currentSlideId*this.slideWidth){this._ev.bind("webkitTransitionEnd.rs",function(e){if(e.target==g._ev.get(0)){g._ev.unbind("webkitTransitionEnd.rs");g._cx4()}});this._ev.css({'-webkit-transition-duration':h+"ms",'-webkit-transition-property':'-webkit-transform','-webkit-transition-timing-function':(f>0?"ease-out":"ease-in-out"),'-webkit-transform':'translate3d('+ -this.currentSlideId*this.slideWidth+'px, 0, 0)'})}else{this._cx4()}}}else{var j=this.slidesArr[this.lastSlideId].slide;var k=j.clone().appendTo(this._dw2);if(!this._cx2){this._ev.css({left:-this.currentSlideId*this.slideWidth});k.animate({opacity:0},h,this.settings.slideTransitionEasing,function(){k.remove();g._cx4()})}else{if(!this._ir){this._ev.css({left:-this.currentSlideId*this.slideWidth})}else{this._ev.css({'-webkit-transition-duration':'0','-webkit-transform':'translate3d('+ -this.currentSlideId*this.slideWidth+'px, 0, 0)','opacity':'1'})}setTimeout(function(){k.bind("webkitTransitionEnd.rs",function(e){if(e.target==k.get(0)){k.unbind("webkitTransitionEnd.rs");k.remove();g._cx4()}});k.css({'-webkit-transition-duration':h+"ms",'-webkit-transition-property':'opacity','-webkit-transition-timing-function':"ease-in-out"});k.css('opacity',0)},100)}}}},goToSilent:function(a){this.goTo(a,true)},prev:function(){if(this.currentSlideId<=0){this.goTo(this.numSlides-1)}else{this._ev4()}},next:function(){if(this.currentSlideId>=this.numSlides-1){this.goTo(0)}else{this._fu4()}},updateSliderSize:function(){var a=this;var b;var c;if(this.settings.autoScaleSlider){b=this.slider.width();if(b!=this.sliderWidth){this.slider.css("height",b*this.sliderScaleRatio)}}b=this.slider.width();c=this.slider.height();if(b!=this.sliderWidth||c!=this.sliderHeight){this.sliderWidth=b;this.sliderHeight=c;this.slideWidth=this.sliderWidth+this.settings.slideSpacing;var d=this.slidesArr.length;var e,_hs4;for(var i=0,len=d;i<len;++i){e=this.slidesArr[i];_hs4=e.slide.find("img.royalImage").eq(0);if(_hs4&&e.preload==false){this._ir4(_hs4,this.sliderWidth,this.sliderHeight)}if(this.settings.slideSpacing>0&&i<d-1){e.slide.css("cssText","margin-right:"+this.settings.slideSpacing+"px !important;")}e.slide.css({height:a.sliderHeight,width:a.sliderWidth})}if(!this._ir){this._ev.css({"left":-this.currentSlideId*this.slideWidth,width:this.slideWidth*this.numSlides})}else{if(!this._gt1){this._ev.css({'-webkit-transition-duration':'0','-webkit-transition-property':'none'});this._ev.css({'-webkit-transform':'translate3d('+ -this.currentSlideId*this.slideWidth+'px, 0, 0)',width:this.slideWidth*this.numSlides})}}if(this.settings.controlNavThumbs&&this.settings.controlNavThumbsNavigation){this._fu3()}}},stopSlideshow:function(){this._ev2();this.slideshowEnabled=false;this.wasSlideshowPlaying=false},resumeSlideshow:function(){this.slideshowEnabled=true;if(!this.wasSlideshowPlaying){this._fu2()}},destroy:function(){this._ev2();this._ev.unbind(this._az);$(document).unbind(this._by).unbind(this._cx);$(window).unbind(this._kp3);if(this.settings.keyboardNavEnabled){$(document).unbind("keydown.rs")}this.slider.remove();delete this.slider},_lo3:function(a,b){if(this.settings.preloadNearbyImages){var c=this;this._by4(this.slidesArr[a],function(){if(b){b.call()}c._by4(c.slidesArr[a+1],function(){c._by4(c.slidesArr[a-1])})})}else{this._by4(this.slidesArr[a],b)}},_ir3:function(a){if(this.settings.controlNavEnabled){this.navItems.eq(this.lastSlideId).removeClass('current');this.navItems.eq(this.currentSlideId).addClass("current");if(this.settings.controlNavThumbs&&this.settings.controlNavThumbsNavigation){var b=this.navItems.eq(this.currentSlideId).position().left;var c=b-Math.abs(this._ev3);if(c>this._hs3-this._by3*2-1-this._dw3){if(!a){this._gt3(-b+this._by3)}else{this._gt3(-b-this._by3*2+this._hs3+this._dw3)}}else if(c<this._by3*2-1){if(!a){this._gt3(-b-this._by3*2+this._hs3+this._dw3)}else{this._gt3(-b+this._by3)}}}}},_jq3:function(){if(this.settings.directionNavEnabled){if(this.settings.hideArrowOnLastSlide){if(this.currentSlideId==0){this._lo4=true;this.arrowLeft.addClass("disabled");if(this._mn4){this._mn4=false;this.arrowRight.removeClass("disabled")}}else if(this.currentSlideId==this.numSlides-1){this._mn4=true;this.arrowRight.addClass("disabled");if(this._lo4){this._lo4=false;this.arrowLeft.removeClass("disabled")}}else{if(this._lo4){this._lo4=false;this.arrowLeft.removeClass("disabled")}else if(this._mn4){this._mn4=false;this.arrowRight.removeClass("disabled")}}}}},_fu2:function(a){if(this.slideshowEnabled){var b=this;if(!this.slideshowTimer){this.slideshowTimer=setInterval(function(){b.next()},this.settings.slideshowDelay)}}},_ev2:function(a){if(this.slideshowTimer){clearInterval(this.slideshowTimer);this.slideshowTimer=''}},_by4:function(a,b){if(a){if(a.preload){var c=this;var d=new Image();var e=$(d);e.css("opacity",0);e.addClass("royalImage");a.slide.prepend(e);a.slide.prepend(this._gt);a.preload=false;e.load(function(){c._ir4(e,c.sliderWidth,c.sliderHeight);e.animate({"opacity":1},300,function(){a.slide.find(".royalPreloader").remove()});if(b){b.call()}}).attr('src',a.preloadURL)}else{if(b){b.call()}}}else{if(b){b.call()}}},_fu3:function(){this._hs3=parseInt(this._hs2Container.width(),10);this._az5=-(this._cx3-this._hs3);if(this._hs3>=this._cx3){this._lo2=true;this._kp2=true;this.thumbsArrowRight.addClass("disabled");this.thumbsArrowLeft.addClass("disabled");this._cx1=true;this._by5(0)}else{this._cx1=false;var a=this.navItems.eq(this.currentSlideId).position().left;this._gt3(-a+this._by3)}},_gt3:function(a){if(!this._cx1&&a!=this._ev3){if(a<=this._az5){a=this._az5;this._kp2=false;this._lo2=true;this.thumbsArrowRight.addClass("disabled");this.thumbsArrowLeft.removeClass("disabled")}else if(a>=0){a=0;this._kp2=true;this._lo2=false;this.thumbsArrowLeft.addClass("disabled");this.thumbsArrowRight.removeClass("disabled")}else{if(this._kp2){this._kp2=false;this.thumbsArrowLeft.removeClass("disabled")}if(this._lo2){this._lo2=false;this.thumbsArrowRight.removeClass("disabled")}}this._by5(a);this._ev3=a}},_by5:function(a){if(!this._ir){this._mn2.animate({left:a},this.settings.controlNavThumbsSpeed,this.settings.controlNavThumbsEasing)}else{this._mn2.css({'-webkit-transform':'translate3d('+a+'px, 0, 0)'})}},_mn3:function(){var a=this;this.slider.find(".royalLoadingScreen").remove();if(this.settings.controlNavEnabled){this.navItems.bind("click",function(e){e.preventDefault();if(!a._fu1){a._cx5(e)}})}if(this.settings.directionNavEnabled){this.arrowRight.click(function(e){e.preventDefault();if(!a._mn4&&!a._fu1){a.next()}});this.arrowLeft.click(function(e){e.preventDefault();if(!a._lo4&&!a._fu1){a.prev()}})}if(this.settings.keyboardNavEnabled){$(document).bind("keydown.rs",function(e){if(!a._fu1){if(e.keyCode===37){a.prev()}else if(e.keyCode===39){a.next()}}})}this.wasSlideshowPlaying=true;this._cx4();this._ev.bind(this._az,function(e){if(!a._gt1){a._dw5(e)}else if(!a.hasTouch){e.preventDefault()}});if(this.slideshowEnabled&&!this.settings.slideshowAutoStart){this._ev2()}this.settings.allComplete.call(this)},_gt2:function(){this._ev.removeClass('grabbing-cursor');this._ev.addClass('grab-cursor')},_ev5:function(){this._ev.removeClass('grab-cursor');this._ev.addClass('grabbing-cursor')},_fu4:function(a,b){if(this.currentSlideId<this.numSlides-1){this.goTo(this.currentSlideId+1,false,false,a,b)}else{this.goTo(this.currentSlideId,false,false,a,b)}},_ev4:function(a,b){if(this.currentSlideId>0){this.goTo(this.currentSlideId-1,false,false,a,b)}else{this.goTo(this.currentSlideId,false,false,a,b)}},_cx5:function(e){this.goTo($(e.currentTarget).index(),false,true)},_dw4:function(){var a=window.getComputedStyle(this._ev.get(0),null).getPropertyValue("-webkit-transform");var b=a.replace(/^matrix\(/i,'').split(/, |\)$/g);return parseInt(b[4],10)},_dw5:function(e){if(!this._az2){var a;if(this.hasTouch){this._fu5=false;var b=e.originalEvent.touches;if(b&&b.length>0){a=b[0]}else{return false}}else{a=e;e.preventDefault()}if(this.slideshowEnabled){if(this.slideshowTimer){this.wasSlideshowPlaying=true;this._ev2()}else{this.wasSlideshowPlaying=false}}this._ev5();this._az2=true;var c=this;if(this._ir){c._ev.css({'-webkit-transition-duration':'0','-webkit-transition-property':'none'})}$(document).bind(this._by,function(e){c._gt5(e)});$(document).bind(this._cx,function(e){c._hs5(e)});if(!this._ir){this._mn1=this._jq1=parseInt(this._ev.css("left"),10)}else{this._mn1=this._jq1=this._dw4()}this._hs=false;this._ir1=this._jq1;this._hs1=(e.timeStamp||new Date().getTime());this._kp1=a.clientX;this._lo1=a.clientY}return false},_gt5:function(e){var a;if(this.hasTouch){if(this._fu5){return false}var b=e.originalEvent.touches;if(b.length>1){return false}a=b[0];if(Math.abs(a.clientY-this._lo1)>Math.abs(a.clientX-this._kp1)+3){if(this.settings.lockAxis){this._fu5=true}return false}e.preventDefault()}else{a=e;e.preventDefault()}this._by1=this._az1;var c=a.clientX-this._kp1;if(this._by1!=c){this._az1=c}if(c!=0){if(this.currentSlideId==0){if(c>0){c=Math.sqrt(c)*5}}else if(this.currentSlideId==(this.numSlides-1)){if(c<0){c=-Math.sqrt(-c)*5}}if(!this._ir){this._ev.css("left",this._jq1+c)}else{this._ev.css({'-webkit-transform':'translate3d('+(this._jq1+c)+'px, 0, 0)'})}}var d=(e.timeStamp||new Date().getTime());if(d-this._hs1>350){this._hs1=d;this._ir1=this._jq1+c}return false},_hs5:function(e){if(this._az2){var a=this;this._az2=false;this._gt2();if(!this._ir){this.endPos=parseInt(this._ev.css("left"),10)}else{this.endPos=this._dw4()}this.isdrag=false;$(document).unbind(this._by).unbind(this._cx);if(this.slideshowEnabled){if(this.wasSlideshowPlaying){if(!this._by2){this._fu2()}this.wasSlideshowPlaying=false}}if(this.endPos==this._mn1){this._hs=false;return}else{this._hs=true}var b=(this._ir1-this.endPos);var c=Math.max(40,(e.timeStamp||new Date().getTime())-this._hs1);var d=Math.abs(b)/c;var f=this.slideWidth-Math.abs(this._mn1-this.endPos);var g=Math.max((f*1.08)/d,200);g=Math.min(g,600);function returnToCurrent(){f=Math.abs(a._mn1-a.endPos);g=Math.max((f*1.08)/d,200);g=Math.min(g,500);a.goTo(a.currentSlideId,false,false,true,g)}if(this._mn1-this.settings.minSlideOffset>this.endPos){if(this._by1<this._az1){returnToCurrent();return false}this._fu4(true,g)}else if(this._mn1+this.settings.minSlideOffset<this.endPos){if(this._by1>this._az1){returnToCurrent();return false}this._ev4(true,g)}else{returnToCurrent()}}return false},_cx4:function(){var a=this;if(this.slideshowEnabled){if(this.wasSlideshowPlaying){if(!this._by2){this._fu2()}this.wasSlideshowPlaying=false}}this._fu1=false;this._gt1=false;if(this.settings.captionAnimationEnabled&&this.lastSlideId!=this.currentSlideId){if(this.lastSlideId!=-1){this.slidesArr[this.lastSlideId].caption.css("display","none")}a._ir5(a.currentSlideId)}this.isAnimating=false;this.settings.afterSlideChange.call(this)},_ir5:function(h){var j=this.slidesArr[h].caption;if(j&&j.length>0){j.css("display","block");var l=this;var m,fadeEnabled,moveEnabled,effectName,effectsObject,moveEffectProperty,currEffects,newEffectObj,moveOffset,delay,speed,easing,moveProp;var n=j.children();if(this._dw1.length>0){for(var a=this._dw1.length-1;a>-1;a--){clearTimeout(this._dw1.splice(a,1))}}if(this._ev1.length>0){var o;for(var k=this._ev1.length-1;k>-1;k--){o=this._ev1[k];if(o){if(!this._ir){if(o.running){o.captionItem.stop(true,true)}else{o.captionItem.css(o.css)}}}this._ev1.splice(k,1)}}for(var i=0;i<n.length;i++){m=$(n[i]);effectsObject={};fadeEnabled=false;moveEnabled=false;moveEffectProperty="";if(m.attr("data-show-effect")==undefined){currEffects=this.settings.captionShowEffects}else{currEffects=m.attr("data-show-effect").split(" ")}for(var q=0;q<currEffects.length;q++){if(fadeEnabled&&moveEnabled){break}effectName=currEffects[q].toLowerCase();if(!fadeEnabled&&effectName=="fade"){fadeEnabled=true;effectsObject['opacity']=1}else if(moveEnabled){break}else if(effectName=="movetop"){moveEffectProperty="margin-top"}else if(effectName=="moveleft"){moveEffectProperty="margin-left"}else if(effectName=="movebottom"){moveEffectProperty="margin-bottom"}else if(effectName=="moveright"){moveEffectProperty="margin-right"}if(moveEffectProperty!=""){effectsObject['moveProp']=moveEffectProperty;if(!l._ir){effectsObject['moveStartPos']=parseInt(m.css(moveEffectProperty),10)}else{effectsObject['moveStartPos']=0}moveEnabled=true}}moveOffset=parseInt(m.attr("data-move-offset"),10);if(isNaN(moveOffset)){moveOffset=this.settings.captionMoveOffset}delay=parseInt(m.attr("data-delay"),10);if(isNaN(delay)){delay=l.settings.captionShowDelay*i}speed=parseInt(m.attr("data-speed"),10);if(isNaN(speed)){speed=l.settings.captionShowSpeed}easing=m.attr("data-easing");if(!easing){easing=l.settings.captionShowEasing}newEffectObj={};if(moveEnabled){moveProp=effectsObject.moveProp;if(moveProp=="margin-right"){moveProp="margin-left";newEffectObj[moveProp]=effectsObject.moveStartPos+moveOffset}else if(moveProp=="margin-bottom"){moveProp="margin-top";newEffectObj[moveProp]=effectsObject.moveStartPos+moveOffset}else{newEffectObj[moveProp]=effectsObject.moveStartPos-moveOffset}}if(!l._lo&&fadeEnabled){m.css("opacity",0)}if(!l._ir){m.css("visibility","hidden");m.css(newEffectObj);if(moveEnabled){newEffectObj[moveProp]=effectsObject.moveStartPos}if(!l._lo&&fadeEnabled){newEffectObj.opacity=1}}else{var p={};if(moveEnabled){p['-webkit-transition-duration']="0";p['-webkit-transition-property']="none";p["-webkit-transform"]="translate3d("+(isNaN(newEffectObj["margin-left"])?0:(newEffectObj["margin-left"]+"px"))+", "+(isNaN(newEffectObj["margin-top"])?0:(newEffectObj["margin-top"]+"px"))+",0)";delete newEffectObj["margin-left"];delete newEffectObj["margin-top"];newEffectObj["-webkit-transform"]="translate3d(0,0,0)"}newEffectObj.visibility="visible";newEffectObj.opacity=1;if(!l._lo&&fadeEnabled){p["opacity"]=0}p["visibility"]="hidden";m.css(p)}this._ev1.push({captionItem:m,css:newEffectObj,running:false});this._dw1.push(setTimeout((function(a,b,c,d,e,f,g){return function(){l._ev1[e].running=true;if(!l._ir){a.css("visibility","visible").animate(b,c,d,function(){if(l._jq&&f){a.get(0).style.removeAttribute('filter')}delete l._ev1[e]})}else{a.css({'-webkit-transition-duration':(c+"ms"),'-webkit-transition-property':'opacity'+(g?', -webkit-transform':''),'-webkit-transition-timing-function':'ease-out'});a.css(b)}}})(m,newEffectObj,speed,easing,i,fadeEnabled,moveEnabled),delay))}}},_ir4:function(f,g,h){var i=this.settings.imageScaleMode;var j=this.settings.imageAlignCenter;if(j||i=="fill"||i=="fit"){var k=false;function scaleImg(){var d,vRatio,ratio,nWidth,nHeight;var e=new Image();e.onload=function(){var a=this.width;var b=this.height;var c=parseInt(f.css("borderWidth"),10);c=isNaN(c)?0:c;if(i=="fill"||i=="fit"){d=g/a;vRatio=h/b;if(i=="fill"){ratio=d>vRatio?d:vRatio}else if(i=="fit"){ratio=d<vRatio?d:vRatio}else{ratio=1}nWidth=parseInt(a*ratio,10)-c;nHeight=parseInt(b*ratio,10)-c;f.attr({"width":nWidth,"height":nHeight}).css({"width":nWidth,"height":nHeight})}else{nWidth=a-c;nHeight=b-c;f.attr("width",nWidth).attr("height",nHeight)}if(j){f.css({"margin-left":Math.floor((g-nWidth)/2),"margin-top":Math.floor((h-nHeight)/2)})}};e.src=f.attr("src")};f.removeAttr('height').removeAttr('width');if(!this._az4(f.get(0))){$('<img />').load(function(){scaleImg()}).attr('src',f.attr("src"))}else{scaleImg()}}},_az4:function(a){if(a){if(!a.complete){return false}if(typeof a.naturalWidth!="undefined"&&a.naturalWidth==0){return false}}else{return false}return true}};$.fn.royalSlider=function(b){return this.each(function(){var a=new RoyalSlider($(this),b);$(this).data("royalSlider",a)})};$.fn.royalSlider.defaults={lockAxis:true,preloadNearbyImages:true,imageScaleMode:"none",imageAlignCenter:false,keyboardNavEnabled:false,directionNavEnabled:true,directionNavAutoHide:false,hideArrowOnLastSlide:true,slideTransitionType:"move",slideTransitionSpeed:400,slideTransitionEasing:"easeInOutSine",captionAnimationEnabled:true,captionShowEffects:["fade","moveleft"],captionMoveOffset:20,captionShowSpeed:400,captionShowEasing:"easeOutCubic",captionShowDelay:200,controlNavEnabled:true,controlNavThumbs:false,controlNavThumbsNavigation:true,controlNavThumbsSpeed:400,controlNavThumbsEasing:"easeInOutSine",slideshowEnabled:false,slideshowDelay:5000,slideshowPauseOnHover:true,slideshowAutoStart:true,welcomeScreenEnabled:false,welcomeScreenShowSpeed:500,minSlideOffset:20,disableTranslate3d:false,removeCaptionsOpacityInIE8:false,startSlideIndex:0,slideSpacing:0,blockLinksOnDrag:true,nonDraggableClassEnabled:true,dragUsingMouse:true,autoScaleSlider:false,autoScaleSliderWidth:960,autoScaleSliderHeight:400,beforeSlideChange:function(){},afterSlideChange:function(){},beforeLoadStart:function(){},loadingComplete:function(){},allComplete:function(){}};$.fn.royalSlider.settings={}})(jQuery);

/*
 * RoyalSlider  v8.1
 *
 * Copyright 2011-2012, Dmitry Semenov
 * 
 */
(function($){function RoyalSlider(f,g){this.slider=$(f);this._az="";this._by="";this._cx="";var h=this;this.settings=$.extend({},$.fn.royalSlider.defaults,g);this.isSlideshowRunning=false;this._dw=false;this._ev=this.slider.find(".royalSlidesContainer");this._fu=this._ev.wrap('<div class="royalWrapper"/>').parent();this.slides=this._ev.find(".royalSlide");this._gt="<p class='royalPreloader'></p>";this._hs=false;this._ir=false;if("ontouchstart"in window){if(!this.settings.disableTranslate3d){if(('WebKitCSSMatrix'in window&&'m11'in new WebKitCSSMatrix())){this._ev.css({"-webkit-transform-origin":"0 0","-webkit-transform":"translateZ(0)"});this._ir=true}}this.hasTouch=true;this._az="touchstart.rs";this._by="touchmove.rs";this._cx="touchend.rs"}else{this.hasTouch=false;if(this.settings.dragUsingMouse){this._az="mousedown.rs";this._by="mousemove.rs";this._cx="mouseup.rs"}else{this._ev.addClass('auto-cursor')}}if(this.hasTouch){this.settings.directionNavAutoHide=false;this.settings.hideArrowOnLastSlide=true}if($.browser.msie&&parseInt($.browser.version,10)<=8){this._jq=true}else{this._jq=false}this.slidesArr=[];var i,jqSlide,dataSRC,slideImg;this.slides.each(function(){jqSlide=$(this);i={};i.slide=jqSlide;if(h.settings.blockLinksOnDrag){if(!this.hasTouch){jqSlide.find('a').bind('click.rs',function(e){if(h._hs){e.preventDefault();return false}})}else{var c=jqSlide.find('a');var d;c.each(function(){d=$(this);d.data('royalhref',d.attr('href'));d.data('royaltarget',d.attr('target'));d.attr('href','#');d.bind('click',function(e){e.preventDefault();if(h._hs){return false}else{var a=$(this).data('royalhref');var b=$(this).data('royaltarget');if(!b||b.toLowerCase()==='_kp'){window.location.href=a}else{window.open(a)}}})})}}if(h.settings.nonDraggableClassEnabled){jqSlide.find('.non-draggable').bind(h._az,function(e){h._hs=false;e.stopImmediatePropagation()})}dataSRC=jqSlide.attr("data-src");if(dataSRC==undefined||dataSRC==""||dataSRC=="none"){i.preload=false}else{i.preload=true;i.preloadURL=dataSRC}if(h.settings.captionAnimationEnabled){i.caption=jqSlide.find(".royalCaption").css("display","none")}h.slidesArr.push(i)});this._lo=false;if(this.settings.removeCaptionsOpacityInIE8){if($.browser.msie&&parseInt($.browser.version,10)<=8){this._lo=true}}if(this.settings.autoScaleSlider){this.sliderScaleRatio=this.settings.autoScaleSliderHeight/this.settings.autoScaleSliderWidth}this.slider.css("overflow","visible");this.slideWidth=0;this.slideshowTimer='';this.mn=false;this.numSlides=this.slides.length;this.currentSlideId=this.settings.startSlideIndex;this.lastSlideId=-1;this.isAnimating=true;this.wasSlideshowPlaying=false;this._az1=0;this._by1=0;this._cx1=false;this._dw1=[];this._ev1=[];this._fu1=false;this._gt1=false;this._hs1=0;this._ir1=0;this._jq1=0;this._kp1=0;this._lo1=0;this._mn1=0;this._az2=false;this._by2=false;if(this.settings.slideTransitionType==="fade"){if(this._ir||('WebKitCSSMatrix'in window&&'m11'in new WebKitCSSMatrix())){this._cx2=true}else{this._cx2=false}this._dw2=$("<div class='fade-container'></div>").appendTo(this._fu)}if(this.settings.slideshowEnabled&&this.settings.slideshowDelay>0){if(!this.hasTouch&&this.settings.slideshowPauseOnHover){this.slider.hover(function(){h._by2=true;h._ev2(true)},function(){h._by2=false;h._fu2(true)})}this.slideshowEnabled=true}else{this.slideshowEnabled=false}this._gt2();if(this.settings.controlNavEnabled){var j;this._hs2Container='';var k;if(!h.settings.controlNavThumbs){this._hs2Container=$('<div class="royalControlNavOverflow"><div class="royalControlNavContainer"><div class="royalControlNavCenterer"></div></div></div>');j=this._hs2Container.find('.royalControlNavCenterer')}else{this.slider.addClass('with-thumbs');if(h.settings.controlNavThumbsNavigation){k=$('<div class="thumbsAndArrowsContainer"></div>');this.thumbsArrowLeft=$("<a href='#' class='thumbsArrow left'></a>");this.thumbsArrowRight=$("<a href='#' class='thumbsArrow right'></a>");k.append(this.thumbsArrowLeft);k.append(this.thumbsArrowRight);var l=parseInt(this.thumbsArrowLeft.outerWidth(),10);this._hs2Container=$('<div class="royalControlNavOverflow royalThumbs"><div class="royalControlNavThumbsContainer"></div></div>');j=this._hs2Container.find('.royalControlNavThumbsContainer')}else{this._hs2Container=$('<div class="royalControlNavOverflow royalThumbs"><div class="royalControlNavContainer"><div class="royalControlNavCenterer"></div></div></div>');j=this._hs2Container.find(".royalControlNavCenterer")}}var m=0;this.slides.each(function(a){if(h.settings.controlNavThumbs){j.append('<a href="#" class="royalThumb" style="background-image:url('+$(this).attr("data-thumb")+')">'+(a+1)+'</a>')}else{j.append('<a href="#">'+(a+1)+'</a>')}m++});this.navItems=j.children();if(k){k.append(this._hs2Container);this._fu.after(k)}else{this._fu.after(this._hs2Container)}if(h.settings.controlNavThumbs&&h.settings.controlNavThumbsNavigation){this._kp2=true;this._lo2=false;this._mn2=j;if(this._ir){this._mn2.css({'-webkit-transition-duration':this.settings.controlNavThumbsSpeed+"ms",'-webkit-transition-property':'-webkit-transform','-webkit-transition-timing-function':"ease-in-out"})}this._az3=m;var n=this.navItems.eq(0);this._by3=n.outerWidth(true);this._cx3=this._by3*this._az3;this._mn2.css("width",this._cx3);this._dw3=parseInt(n.css("marginRight"),10);this._cx3-=this._dw3;this._ev3=0;this._fu3();this.thumbsArrowLeft.click(function(e){e.preventDefault();if(!h._kp2){h._gt3(h._ev3+h._hs3+h._dw3)}});this.thumbsArrowRight.click(function(e){e.preventDefault();if(!h._lo2){h._gt3(h._ev3-h._hs3-h._dw3)}})}this._ir3()}if(this.settings.directionNavEnabled){this._fu.after("<a href='#' class='arrow left'/>");this._fu.after("<a href='#' class='arrow right'/>");this.arrowLeft=this.slider.find("a.arrow.left");this.arrowRight=this.slider.find("a.arrow.right");if(this.arrowLeft.length<1||this.arrowRight.length<1){this.settings.directionNavEnabled=false}else if(this.settings.directionNavAutoHide){this.arrowLeft.hide();this.arrowRight.hide();this.slider.one("mousemove.arrowshover",function(){h.arrowLeft.fadeIn("fast");h.arrowRight.fadeIn("fast")});this.slider.hover(function(){h.arrowLeft.fadeIn("fast");h.arrowRight.fadeIn("fast")},function(){h.arrowLeft.fadeOut("fast");h.arrowRight.fadeOut("fast")})}this._jq3()}this.sliderWidth=0;this.sliderHeight=0;var o;this._kp3='onorientationchange'in window?'orientationchange.royalslider':'resize.royalslider';$(window).bind(this._kp3,function(){if(o){clearTimeout(o)}o=setTimeout(function(){h.updateSliderSize()},100)});this.updateSliderSize();this.settings.beforeLoadStart.call(this);var p=this.slidesArr[this.currentSlideId];if(this.currentSlideId!=0){if(!this._ir){this._ev.css({'left':-this.currentSlideId*this.slideWidth})}else{this._ev.css({'-webkit-transition-duration':'0','-webkit-transition-property':'none'});this._ev.css({'-webkit-transform':'translate3d('+ -this.currentSlideId*this.slideWidth+'px, 0, 0)'})}}if(this.settings.welcomeScreenEnabled){function hideWelcomeScreen(a){h.settings.loadingComplete.call(h);if(a&&h.settings.preloadNearbyImages){h._lo3(h.currentSlideId)}h.slider.find('.royalLoadingScreen').fadeOut(h.settings.welcomeScreenShowSpeed);setTimeout(function(){h._mn3()},h.settings.welcomeScreenShowSpeed+100)}if(p.preload){this._lo3(this.currentSlideId,function(){hideWelcomeScreen(false)})}else{slideImg=p.slide.find('img.royalImage')[0];if(slideImg){if(this._az4(slideImg)){hideWelcomeScreen(true);$(slideImg).css('opacity',0);$(slideImg).animate({"opacity":1},"fast")}else{$(slideImg).css('opacity',0);$('<img />').load(function(){hideWelcomeScreen(true);$(slideImg).animate({"opacity":1},"fast")}).attr('src',slideImg.src)}}else{hideWelcomeScreen(true)}}}else{if(p.preload){this._by4(p,function(){h.settings.loadingComplete.call(h);if(h.settings.preloadNearbyImages){h._lo3(h.currentSlideId)}})}else{slideImg=p.slide.find('img.royalImage')[0];if(slideImg){if(this._az4(slideImg)){$(slideImg).css('opacity',0).animate({"opacity":1},"fast")}else{$(slideImg).css('opacity',0);$('<img />').load(function(){$(slideImg).animate({"opacity":1},"fast")}).attr('src',slideImg.src)}}this.settings.loadingComplete.call(this)}setTimeout(function(){h._mn3()},100)}}RoyalSlider.prototype={goTo:function(a,b,c,d,f){if(!this.isAnimating){this.isAnimating=true;var g=this;this.lastSlideId=this.currentSlideId;this.currentSlideId=a;this._gt1=true;this._fu1=true;if(this.lastSlideId!=a){this._ir3(c);this._lo3(a)}this._jq3();this.settings.beforeSlideChange.call(this);if(this.slideshowEnabled&&this.slideshowTimer){this.wasSlideshowPlaying=true;this._ev2()}var h=!b?this.settings.slideTransitionSpeed:0;if(d||b||this.settings.slideTransitionType==="move"){var i;if(f>0){h=f}else{i=this.settings.slideTransitionEasing}if(!this._ir){if(parseInt(this._ev.css("left"),10)!==-this.currentSlideId*this.slideWidth){this._ev.animate({left:-this.currentSlideId*this.slideWidth},h,(f>0?"easeOutSine":this.settings.slideTransitionEasing),function(){g._cx4()})}else{this._cx4()}}else{if(this._dw4()!==-this.currentSlideId*this.slideWidth){this._ev.bind("webkitTransitionEnd.rs",function(e){if(e.target==g._ev.get(0)){g._ev.unbind("webkitTransitionEnd.rs");g._cx4()}});this._ev.css({'-webkit-transition-duration':h+"ms",'-webkit-transition-property':'-webkit-transform','-webkit-transition-timing-function':(f>0?"ease-out":"ease-in-out"),'-webkit-transform':'translate3d('+ -this.currentSlideId*this.slideWidth+'px, 0, 0)'})}else{this._cx4()}}}else{var j=this.slidesArr[this.lastSlideId].slide;var k=j.clone().appendTo(this._dw2);if(!this._cx2){this._ev.css({left:-this.currentSlideId*this.slideWidth});k.animate({opacity:0},h,this.settings.slideTransitionEasing,function(){k.remove();g._cx4()})}else{if(!this._ir){this._ev.css({left:-this.currentSlideId*this.slideWidth})}else{this._ev.css({'-webkit-transition-duration':'0','-webkit-transform':'translate3d('+ -this.currentSlideId*this.slideWidth+'px, 0, 0)','opacity':'1'})}setTimeout(function(){k.bind("webkitTransitionEnd.rs",function(e){if(e.target==k.get(0)){k.unbind("webkitTransitionEnd.rs");k.remove();g._cx4()}});k.css({'-webkit-transition-duration':h+"ms",'-webkit-transition-property':'opacity','-webkit-transition-timing-function':"ease-in-out"});k.css('opacity',0)},100)}}}},goToSilent:function(a){this.goTo(a,true)},prev:function(){if(this.currentSlideId<=0){this.goTo(this.numSlides-1)}else{this._ev4()}},next:function(){if(this.currentSlideId>=this.numSlides-1){this.goTo(0)}else{this._fu4()}},updateSliderSize:function(){var a=this;var b;var c;if(this.settings.autoScaleSlider){b=this.slider.width();if(b!=this.sliderWidth){this.slider.css("height",b*this.sliderScaleRatio)}}b=this.slider.width();c=this.slider.height();if(b!=this.sliderWidth||c!=this.sliderHeight){this.sliderWidth=b;this.sliderHeight=c;this.slideWidth=this.sliderWidth+this.settings.slideSpacing;var d=this.slidesArr.length;var e,_hs4;for(var i=0,len=d;i<len;++i){e=this.slidesArr[i];_hs4=e.slide.find("img.royalImage").eq(0);if(_hs4&&e.preload==false){this._ir4(_hs4,this.sliderWidth,this.sliderHeight)}if(this.settings.slideSpacing>0&&i<d-1){e.slide.css("cssText","margin-right:"+this.settings.slideSpacing+"px !important;")}e.slide.css({height:a.sliderHeight,width:a.sliderWidth})}if(!this._ir){this._ev.css({"left":-this.currentSlideId*this.slideWidth,width:this.slideWidth*this.numSlides})}else{if(!this._gt1){this._ev.css({'-webkit-transition-duration':'0','-webkit-transition-property':'none'});this._ev.css({'-webkit-transform':'translate3d('+ -this.currentSlideId*this.slideWidth+'px, 0, 0)',width:this.slideWidth*this.numSlides})}}if(this.settings.controlNavThumbs&&this.settings.controlNavThumbsNavigation){this._fu3()}}},stopSlideshow:function(){this._ev2();this.slideshowEnabled=false;this.wasSlideshowPlaying=false},resumeSlideshow:function(){this.slideshowEnabled=true;if(!this.wasSlideshowPlaying){this._fu2()}},destroy:function(){this._ev2();this._ev.unbind(this._az);$(document).unbind(this._by).unbind(this._cx);$(window).unbind(this._kp3);if(this.settings.keyboardNavEnabled){$(document).unbind("keydown.rs")}this.slider.remove();delete this.slider},_lo3:function(a,b){if(this.settings.preloadNearbyImages){var c=this;this._by4(this.slidesArr[a],function(){if(b){b.call()}c._by4(c.slidesArr[a+1],function(){c._by4(c.slidesArr[a-1])})})}else{this._by4(this.slidesArr[a],b)}},_ir3:function(a){if(this.settings.controlNavEnabled){this.navItems.eq(this.lastSlideId).removeClass('current');this.navItems.eq(this.currentSlideId).addClass("current");if(this.settings.controlNavThumbs&&this.settings.controlNavThumbsNavigation){var b=this.navItems.eq(this.currentSlideId).position().left;var c=b-Math.abs(this._ev3);if(c>this._hs3-this._by3*2-1-this._dw3){if(!a){this._gt3(-b+this._by3)}else{this._gt3(-b-this._by3*2+this._hs3+this._dw3)}}else if(c<this._by3*2-1){if(!a){this._gt3(-b-this._by3*2+this._hs3+this._dw3)}else{this._gt3(-b+this._by3)}}}}},_jq3:function(){if(this.settings.directionNavEnabled){if(this.settings.hideArrowOnLastSlide){if(this.currentSlideId==0){this._lo4=true;this.arrowLeft.addClass("disabled");if(this._mn4){this._mn4=false;this.arrowRight.removeClass("disabled")}}else if(this.currentSlideId==this.numSlides-1){this._mn4=true;this.arrowRight.addClass("disabled");if(this._lo4){this._lo4=false;this.arrowLeft.removeClass("disabled")}}else{if(this._lo4){this._lo4=false;this.arrowLeft.removeClass("disabled")}else if(this._mn4){this._mn4=false;this.arrowRight.removeClass("disabled")}}}}},_fu2:function(a){if(this.slideshowEnabled){var b=this;if(!this.slideshowTimer){this.slideshowTimer=setInterval(function(){b.next()},this.settings.slideshowDelay)}}},_ev2:function(a){if(this.slideshowTimer){clearInterval(this.slideshowTimer);this.slideshowTimer=''}},_by4:function(a,b){if(a){if(a.preload){var c=this;var d=new Image();var e=$(d);e.css("opacity",0);e.addClass("royalImage");a.slide.prepend(e);a.slide.prepend(this._gt);a.preload=false;e.load(function(){c._ir4(e,c.sliderWidth,c.sliderHeight);e.animate({"opacity":1},300,function(){a.slide.find(".royalPreloader").remove()});if(b){b.call()}}).attr('src',a.preloadURL)}else{if(b){b.call()}}}else{if(b){b.call()}}},_fu3:function(){this._hs3=parseInt(this._hs2Container.width(),10);this._az5=-(this._cx3-this._hs3);if(this._hs3>=this._cx3){this._lo2=true;this._kp2=true;this.thumbsArrowRight.addClass("disabled");this.thumbsArrowLeft.addClass("disabled");this._cx1=true;this._by5(0)}else{this._cx1=false;var a=this.navItems.eq(this.currentSlideId).position().left;this._gt3(-a+this._by3)}},_gt3:function(a){if(!this._cx1&&a!=this._ev3){if(a<=this._az5){a=this._az5;this._kp2=false;this._lo2=true;this.thumbsArrowRight.addClass("disabled");this.thumbsArrowLeft.removeClass("disabled")}else if(a>=0){a=0;this._kp2=true;this._lo2=false;this.thumbsArrowLeft.addClass("disabled");this.thumbsArrowRight.removeClass("disabled")}else{if(this._kp2){this._kp2=false;this.thumbsArrowLeft.removeClass("disabled")}if(this._lo2){this._lo2=false;this.thumbsArrowRight.removeClass("disabled")}}this._by5(a);this._ev3=a}},_by5:function(a){if(!this._ir){this._mn2.animate({left:a},this.settings.controlNavThumbsSpeed,this.settings.controlNavThumbsEasing)}else{this._mn2.css({'-webkit-transform':'translate3d('+a+'px, 0, 0)'})}},_mn3:function(){var a=this;this.slider.find(".royalLoadingScreen").remove();if(this.settings.controlNavEnabled){this.navItems.bind("click",function(e){e.preventDefault();if(!a._fu1){a._cx5(e)}})}if(this.settings.directionNavEnabled){this.arrowRight.click(function(e){e.preventDefault();if(!a._mn4&&!a._fu1){a.next()}});this.arrowLeft.click(function(e){e.preventDefault();if(!a._lo4&&!a._fu1){a.prev()}})}if(this.settings.keyboardNavEnabled){$(document).bind("keydown.rs",function(e){if(!a._fu1){if(e.keyCode===37){a.prev()}else if(e.keyCode===39){a.next()}}})}this.wasSlideshowPlaying=true;this._cx4();this._ev.bind(this._az,function(e){if(!a._gt1){a._dw5(e)}else if(!a.hasTouch){e.preventDefault()}});if(this.slideshowEnabled&&!this.settings.slideshowAutoStart){this._ev2()}this.settings.allComplete.call(this)},_gt2:function(){this._ev.removeClass('grabbing-cursor');this._ev.addClass('grab-cursor')},_ev5:function(){this._ev.removeClass('grab-cursor');this._ev.addClass('grabbing-cursor')},_fu4:function(a,b){if(this.currentSlideId<this.numSlides-1){this.goTo(this.currentSlideId+1,false,false,a,b)}else{this.goTo(this.currentSlideId,false,false,a,b)}},_ev4:function(a,b){if(this.currentSlideId>0){this.goTo(this.currentSlideId-1,false,false,a,b)}else{this.goTo(this.currentSlideId,false,false,a,b)}},_cx5:function(e){this.goTo($(e.currentTarget).index(),false,true)},_dw4:function(){var a=window.getComputedStyle(this._ev.get(0),null).getPropertyValue("-webkit-transform");var b=a.replace(/^matrix\(/i,'').split(/, |\)$/g);return parseInt(b[4],10)},_dw5:function(e){if(!this._az2){var a;if(this.hasTouch){this._fu5=false;var b=e.originalEvent.touches;if(b&&b.length>0){a=b[0]}else{return false}}else{a=e;e.preventDefault()}if(this.slideshowEnabled){if(this.slideshowTimer){this.wasSlideshowPlaying=true;this._ev2()}else{this.wasSlideshowPlaying=false}}this._ev5();this._az2=true;var c=this;if(this._ir){c._ev.css({'-webkit-transition-duration':'0','-webkit-transition-property':'none'})}$(document).bind(this._by,function(e){c._gt5(e)});$(document).bind(this._cx,function(e){c._hs5(e)});if(!this._ir){this._mn1=this._jq1=parseInt(this._ev.css("left"),10)}else{this._mn1=this._jq1=this._dw4()}this._hs=false;this._ir1=this._jq1;this._hs1=(e.timeStamp||new Date().getTime());this._kp1=a.clientX;this._lo1=a.clientY}return false},_gt5:function(e){var a;if(this.hasTouch){if(this._fu5){return false}var b=e.originalEvent.touches;if(b.length>1){return false}a=b[0];if(Math.abs(a.clientY-this._lo1)>Math.abs(a.clientX-this._kp1)+3){if(this.settings.lockAxis){this._fu5=true}return false}e.preventDefault()}else{a=e;e.preventDefault()}this._by1=this._az1;var c=a.clientX-this._kp1;if(this._by1!=c){this._az1=c}if(c!=0){if(this.currentSlideId==0){if(c>0){c=Math.sqrt(c)*5}}else if(this.currentSlideId==(this.numSlides-1)){if(c<0){c=-Math.sqrt(-c)*5}}if(!this._ir){this._ev.css("left",this._jq1+c)}else{this._ev.css({'-webkit-transform':'translate3d('+(this._jq1+c)+'px, 0, 0)'})}}var d=(e.timeStamp||new Date().getTime());if(d-this._hs1>350){this._hs1=d;this._ir1=this._jq1+c}return false},_hs5:function(e){if(this._az2){var a=this;this._az2=false;this._gt2();if(!this._ir){this.endPos=parseInt(this._ev.css("left"),10)}else{this.endPos=this._dw4()}this.isdrag=false;$(document).unbind(this._by).unbind(this._cx);if(this.slideshowEnabled){if(this.wasSlideshowPlaying){if(!this._by2){this._fu2()}this.wasSlideshowPlaying=false}}if(this.endPos==this._mn1){this._hs=false;return}else{this._hs=true}var b=(this._ir1-this.endPos);var c=Math.max(40,(e.timeStamp||new Date().getTime())-this._hs1);var d=Math.abs(b)/c;var f=this.slideWidth-Math.abs(this._mn1-this.endPos);var g=Math.max((f*1.08)/d,200);g=Math.min(g,600);function returnToCurrent(){f=Math.abs(a._mn1-a.endPos);g=Math.max((f*1.08)/d,200);g=Math.min(g,500);a.goTo(a.currentSlideId,false,false,true,g)}if(this._mn1-this.settings.minSlideOffset>this.endPos){if(this._by1<this._az1){returnToCurrent();return false}this._fu4(true,g)}else if(this._mn1+this.settings.minSlideOffset<this.endPos){if(this._by1>this._az1){returnToCurrent();return false}this._ev4(true,g)}else{returnToCurrent()}}return false},_cx4:function(){var a=this;if(this.slideshowEnabled){if(this.wasSlideshowPlaying){if(!this._by2){this._fu2()}this.wasSlideshowPlaying=false}}this._fu1=false;this._gt1=false;if(this.settings.captionAnimationEnabled&&this.lastSlideId!=this.currentSlideId){if(this.lastSlideId!=-1){this.slidesArr[this.lastSlideId].caption.css("display","none")}a._ir5(a.currentSlideId)}this.isAnimating=false;this.settings.afterSlideChange.call(this)},_ir5:function(h){var j=this.slidesArr[h].caption;if(j&&j.length>0){j.css("display","block");var l=this;var m,fadeEnabled,moveEnabled,effectName,effectsObject,moveEffectProperty,currEffects,newEffectObj,moveOffset,delay,speed,easing,moveProp;var n=j.children();if(this._dw1.length>0){for(var a=this._dw1.length-1;a>-1;a--){clearTimeout(this._dw1.splice(a,1))}}if(this._ev1.length>0){var o;for(var k=this._ev1.length-1;k>-1;k--){o=this._ev1[k];if(o){if(!this._ir){if(o.running){o.captionItem.stop(true,true)}else{o.captionItem.css(o.css)}}}this._ev1.splice(k,1)}}for(var i=0;i<n.length;i++){m=$(n[i]);effectsObject={};fadeEnabled=false;moveEnabled=false;moveEffectProperty="";if(m.attr("data-show-effect")==undefined){currEffects=this.settings.captionShowEffects}else{currEffects=m.attr("data-show-effect").split(" ")}for(var q=0;q<currEffects.length;q++){if(fadeEnabled&&moveEnabled){break}effectName=currEffects[q].toLowerCase();if(!fadeEnabled&&effectName=="fade"){fadeEnabled=true;effectsObject['opacity']=1}else if(moveEnabled){break}else if(effectName=="movetop"){moveEffectProperty="margin-top"}else if(effectName=="moveleft"){moveEffectProperty="margin-left"}else if(effectName=="movebottom"){moveEffectProperty="margin-bottom"}else if(effectName=="moveright"){moveEffectProperty="margin-right"}if(moveEffectProperty!=""){effectsObject['moveProp']=moveEffectProperty;if(!l._ir){effectsObject['moveStartPos']=parseInt(m.css(moveEffectProperty),10)}else{effectsObject['moveStartPos']=0}moveEnabled=true}}moveOffset=parseInt(m.attr("data-move-offset"),10);if(isNaN(moveOffset)){moveOffset=this.settings.captionMoveOffset}delay=parseInt(m.attr("data-delay"),10);if(isNaN(delay)){delay=l.settings.captionShowDelay*i}speed=parseInt(m.attr("data-speed"),10);if(isNaN(speed)){speed=l.settings.captionShowSpeed}easing=m.attr("data-easing");if(!easing){easing=l.settings.captionShowEasing}newEffectObj={};if(moveEnabled){moveProp=effectsObject.moveProp;if(moveProp=="margin-right"){moveProp="margin-left";newEffectObj[moveProp]=effectsObject.moveStartPos+moveOffset}else if(moveProp=="margin-bottom"){moveProp="margin-top";newEffectObj[moveProp]=effectsObject.moveStartPos+moveOffset}else{newEffectObj[moveProp]=effectsObject.moveStartPos-moveOffset}}if(!l._lo&&fadeEnabled){m.css("opacity",0)}if(!l._ir){m.css("visibility","hidden");m.css(newEffectObj);if(moveEnabled){newEffectObj[moveProp]=effectsObject.moveStartPos}if(!l._lo&&fadeEnabled){newEffectObj.opacity=1}}else{var p={};if(moveEnabled){p['-webkit-transition-duration']="0";p['-webkit-transition-property']="none";p["-webkit-transform"]="translate3d("+(isNaN(newEffectObj["margin-left"])?0:(newEffectObj["margin-left"]+"px"))+", "+(isNaN(newEffectObj["margin-top"])?0:(newEffectObj["margin-top"]+"px"))+",0)";delete newEffectObj["margin-left"];delete newEffectObj["margin-top"];newEffectObj["-webkit-transform"]="translate3d(0,0,0)"}newEffectObj.visibility="visible";newEffectObj.opacity=1;if(!l._lo&&fadeEnabled){p["opacity"]=0}p["visibility"]="hidden";m.css(p)}this._ev1.push({captionItem:m,css:newEffectObj,running:false});this._dw1.push(setTimeout((function(a,b,c,d,e,f,g){return function(){l._ev1[e].running=true;if(!l._ir){a.css("visibility","visible").animate(b,c,d,function(){if(l._jq&&f){a.get(0).style.removeAttribute('filter')}delete l._ev1[e]})}else{a.css({'-webkit-transition-duration':(c+"ms"),'-webkit-transition-property':'opacity'+(g?', -webkit-transform':''),'-webkit-transition-timing-function':'ease-out'});a.css(b)}}})(m,newEffectObj,speed,easing,i,fadeEnabled,moveEnabled),delay))}}},_ir4:function(f,g,h){var i=this.settings.imageScaleMode;var j=this.settings.imageAlignCenter;if(j||i=="fill"||i=="fit"){var k=false;function scaleImg(){var d,vRatio,ratio,nWidth,nHeight;var e=new Image();e.onload=function(){var a=this.width;var b=this.height;var c=parseInt(f.css("borderWidth"),10);c=isNaN(c)?0:c;if(i=="fill"||i=="fit"){d=g/a;vRatio=h/b;if(i=="fill"){ratio=d>vRatio?d:vRatio}else if(i=="fit"){ratio=d<vRatio?d:vRatio}else{ratio=1}nWidth=parseInt(a*ratio,10)-c;nHeight=parseInt(b*ratio,10)-c;f.attr({"width":nWidth,"height":nHeight}).css({"width":nWidth,"height":nHeight})}else{nWidth=a-c;nHeight=b-c;f.attr("width",nWidth).attr("height",nHeight)}if(j){f.css({"margin-left":Math.floor((g-nWidth)/2),"margin-top":Math.floor((h-nHeight)/2)})}};e.src=f.attr("src")};f.removeAttr('height').removeAttr('width');if(!this._az4(f.get(0))){$('<img />').load(function(){scaleImg()}).attr('src',f.attr("src"))}else{scaleImg()}}},_az4:function(a){if(a){if(!a.complete){return false}if(typeof a.naturalWidth!="undefined"&&a.naturalWidth==0){return false}}else{return false}return true}};$.fn.royalSlider=function(b){return this.each(function(){var a=new RoyalSlider($(this),b);$(this).data("royalSlider",a)})};$.fn.royalSlider.defaults={lockAxis:true,preloadNearbyImages:true,imageScaleMode:"none",imageAlignCenter:false,keyboardNavEnabled:false,directionNavEnabled:true,directionNavAutoHide:false,hideArrowOnLastSlide:true,slideTransitionType:"move",slideTransitionSpeed:400,slideTransitionEasing:"easeInOutSine",captionAnimationEnabled:true,captionShowEffects:["fade","moveleft"],captionMoveOffset:20,captionShowSpeed:400,captionShowEasing:"easeOutCubic",captionShowDelay:200,controlNavEnabled:true,controlNavThumbs:false,controlNavThumbsNavigation:true,controlNavThumbsSpeed:400,controlNavThumbsEasing:"easeInOutSine",slideshowEnabled:false,slideshowDelay:5000,slideshowPauseOnHover:true,slideshowAutoStart:true,welcomeScreenEnabled:false,welcomeScreenShowSpeed:500,minSlideOffset:20,disableTranslate3d:false,removeCaptionsOpacityInIE8:false,startSlideIndex:0,slideSpacing:0,blockLinksOnDrag:true,nonDraggableClassEnabled:true,dragUsingMouse:true,autoScaleSlider:false,autoScaleSliderWidth:960,autoScaleSliderHeight:400,beforeSlideChange:function(){},afterSlideChange:function(){},beforeLoadStart:function(){},loadingComplete:function(){},allComplete:function(){}};$.fn.royalSlider.settings={}})(jQuery);














	function onBodyLoad()
	{		
		document.addEventListener("deviceready", checkLogin, false);
	}
    
    /*
 * This function checks if the person has already logged in and checked "Keep me logged in". If so, skips the login
 * page and goes directly to validate function. If not, calls the loadLogin function
 */

function checkLogin()
{
	var email = window.localStorage.getItem("kenkoUN");
	var password = window.localStorage.getItem("kenkoPW");
	
	if (typeof email !== undefined && email !== null)
	{
		var ajax = new XMLHttpRequest();
		ajax.open("POST", "http://www.kenkochallenge.com/app/validate", true);
		ajax.setRequestHeader("Content-type","application/x-www-form-urlencoded");
		ajax.send("email="+email+"&password="+password);
		
		ajax.onreadystatechange=function(){
	      if(ajax.readyState==4 && (ajax.status==200)){
	           document.getElementById('main').innerHTML = ajax.responseText;
	           init_slider();
	      }
		  else {
			if (navigator.network.connection.type == Connection.NONE)
			{alert('Sorry, it looks like you are not connected to a network.');}
		  }
		}
	}
	else {loadLogin();}
	
}

    
     	
	jQuery(document).ready(function($) {		
		$('#royal').royalSlider({			
	   		imageAlignCenter:true,
	   		hideArrowOnLastSlide:true,
	   		slideSpacing:20,
	   		autoScaleSlider: true,
	    });		
	});
    

(function(a){a.widget("ui.rcarousel",{_create:function(){var d,e=a(this.element),b=this,c=this.options;this._checkOptionsValidity(this.options);this._createDataObject();d=e.data("data");e.addClass("ui-carousel").children().wrapAll("<div class='wrapper'></div>");this._saveElements();this._generatePages();this._loadElements();this._setCarouselWidth();this._setCarouselHeight();a(c.navigation.next).click(function(f){b.next();f.preventDefault()});a(c.navigation.prev).click(function(f){b.prev();f.preventDefault()});d.navigation.next=a(c.navigation.next);d.navigation.prev=a(c.navigation.prev);e.hover(function(){if(c.auto.enabled){clearInterval(d.interval);d.hoveredOver=true}},function(){if(c.auto.enabled){d.hoveredOver=false;b._autoMode(c.auto.direction)}});this._setStep();if(c.auto.enabled){this._autoMode(c.auto.direction)}this._trigger("start")},_addElement:function(f,e){var d=a(this.element),c=d.find("div.wrapper"),b=this.options;f.width(b.width).height(b.height);if(b.orientation==="horizontal"){a(f).css("marginRight",b.margin)}else{a(f).css({marginBottom:b.margin,"float":"none"})}if(e==="prev"){c.prepend(f.clone(true,true))}else{c.append(f.clone(true,true))}},append:function(d){var c=a(this.element),b=c.data("data");d.each(function(e,f){b.paths.push(a(f))});b.oldPage=b.pages[b.oldPageIndex].slice(0);b.appended=true;this._generatePages()},_autoMode:function(d){var b=this.options,c=a(this.element).data("data");if(d==="next"){c.interval=setTimeout(a.proxy(this.next,this),b.auto.interval)}else{c.interval=setTimeout(a.proxy(this.prev,this),b.auto.interval)}},_checkOptionsValidity:function(c){var d,b=this,e="";a.each(c,function(f,g){switch(f){case"visible":if(!g||typeof g!=="number"||g<=0||(Math.ceil(g)-g>0)){throw new Error("visible should be defined as a positive integer")}break;case"step":if(!g||typeof g!=="number"||g<=0||(Math.ceil(g)-g>0)){throw new Error("step should be defined as a positive integer")}else{if(g>b.options.visible){for(d=1;d<=Math.floor(c.visible);d++){e+=(d<Math.floor(g))?d+", ":d}throw new Error("Only following step values are correct: "+e)}}break;case"width":if(!g||typeof g!=="number"||g<=0||Math.ceil(g)-g>0){throw new Error("width should be defined as a positive integer")}break;case"height":if(!g||typeof g!=="number"||g<=0||Math.ceil(g)-g>0){throw new Error("height should be defined as a positive integer")}break;case"speed":if(!g&&g!==0){throw new Error("speed should be defined as a number or a string")}if(typeof g==="number"&&g<0){throw new Error("speed should be a positive number")}else{if(typeof g==="string"&&!(g==="slow"||g==="normal"||g==="fast")){throw new Error('Only "slow", "normal" and "fast" values are valid')}}break;case"navigation":if(!g||a.isPlainObject(g)===false){throw new Error("navigation should be defined as an object with at least one of the properties: 'prev' or 'next' in it")}if(g.prev&&typeof g.prev!=="string"){throw new Error("navigation.prev should be defined as a string and point to '.class' or '#id' of an element")}if(g.next&&typeof g.next!=="string"){throw new Error(" navigation.next should be defined as a string and point to '.class' or '#id' of an element")}break;case"auto":if(typeof g.direction!=="string"){throw new Error("direction should be defined as a string")}if(!(g.direction==="next"||g.direction==="prev")){throw new Error("direction: only 'right' and 'left' values are valid")}if(isNaN(g.interval)||typeof g.interval!=="number"||g.interval<0||Math.ceil(g.interval)-g.interval>0){throw new Error("interval should be a positive number")}break;case"margin":if(isNaN(g)||typeof g!=="number"||g<0||Math.ceil(g)-g>0){throw new Error("margin should be a positive number")}break}})},_createDataObject:function(){var b=a(this.element);b.data("data",{paths:[],pathsLen:0,pages:[],lastPage:[],oldPageIndex:0,pageIndex:0,navigation:{},animated:false,appended:false,hoveredOver:false})},_generatePages:function(){var i=this,j=this.options,c=a(this.element).data("data"),b=j.visible,h=c.paths.length;function f(){c.pages=[];c.lastPage=[];c.pages[0]=[];for(var k=h-1;k>=h-b;k--){c.lastPage.unshift(c.paths[k])}for(var k=0;k<b;k++){c.pages[0][c.pages[0].length]=c.paths[k]}}function d(m){var k=false;for(var l=0;l<c.lastPage.length;l++){if(c.lastPage[l].get(0)===m[l].get(0)){k=true}else{k=false;break}}return k}function e(o,k,m){var n=m||c.pages.length;if(!m){c.pages[n]=[]}for(var l=o;l<k;l++){c.pages[n].push(c.paths[l])}return n}function g(){var p=true,o=false,m=j.step,k,q,n,l;while(!d(c.pages[c.pages.length-1])||p){p=false;k=m+b;if(k>h){k=h}if(k-m<b){o=true}else{o=false}if(o){n=m-(b-(k-m));l=n+(b-(k-m));q=e(n,l);e(m,k,q)}else{e(m,k);m+=j.step}}}f();g()},getCurrentPage:function(){var b=a(this.element).data("data");return b.pageIndex+1},getTotalPages:function(){var b=a(this.element).data("data");return b.pages.length},goToPage:function(d){var b,c=a(this.element).data("data");if(!c.animated&&d!==c.pageIndex){c.animated=true;if(d>c.pages.length-1){d=c.pages.length-1}else{if(d<0){d=0}}c.pageIndex=d;b=d-c.oldPageIndex;if(b>=0){this._goToNextPage(b)}else{this._goToPrevPage(b)}c.oldPageIndex=d}},_loadElements:function(b,h){var k=this.options,e=a(this.element).data("data"),f=h||"next",j=b||e.pages[k.startAtPage],c=0,g=j.length;if(f==="next"){for(var d=c;d<g;d++){this._addElement(j[d],f)}}else{for(var d=g-1;d>=c;d--){this._addElement(j[d],f)}}},_goToPrevPage:function(k){var c,j,f,l,g,m,n,p,b,h=a(this.element),o=this,q=this.options,e=a(this.element).data("data");if(e.appended){j=e.oldPage}else{j=e.pages[e.oldPageIndex]}l=e.oldPageIndex+k;c=e.pages[l].slice(0);a(c).each(function(r,s){if(s.get(0)===a(j[r]).get(0)){b=true}else{b=false}});if(e.appended&&b){if(e.pageIndex===0){l=e.pageIndex=e.pages.length-1}else{l=--e.pageIndex}c=e.pages[l].slice(0)}m=c[c.length-1].get(0);for(var d=j.length-1;d>=0;d--){if(m===a(j[d]).get(0)){n=false;p=d;break}else{n=true}}if(!n){while(p>=0){if(c[c.length-1].get(0)===j[p].get(0)){c.pop()}--p}}o._loadElements(c,"prev");f=q.width*c.length+(q.margin*c.length);if(q.orientation==="horizontal"){g={scrollLeft:0};h.scrollLeft(f)}else{g={scrollTop:0};h.scrollTop(f)}h.animate(g,q.speed,function(){o._removeOldElements("last",c.length);e.animated=false;if(!e.hoveredOver&&q.auto.enabled){clearInterval(e.interval);o._autoMode(q.auto.direction)}o._trigger("pageLoaded",null,{page:l})});e.appended=false},_goToNextPage:function(l){var c,k,f,m,g,j,n,p,b,h=a(this.element),q=this.options,e=h.data("data"),o=this;if(e.appended){k=e.oldPage}else{k=e.pages[e.oldPageIndex]}m=e.oldPageIndex+l;c=e.pages[m].slice(0);a(c).each(function(r,s){if(s.get(0)===a(k[r]).get(0)){b=true}else{b=false}});if(e.appended&&b){c=e.pages[++e.pageIndex].slice(0)}j=c[0].get(0);for(var d=0;d<c.length;d++){if(j===a(k[d]).get(0)){n=false;p=d;break}else{n=true}}if(!n){while(p<k.length){if(c[0].get(0)===k[p].get(0)){c.shift()}++p}}this._loadElements(c,"next");f=q.width*c.length+(q.margin*c.length);if(q.orientation==="horizontal"){g={scrollLeft:"+="+f}}else{g={scrollTop:"+="+f}}h.animate(g,q.speed,function(){o._removeOldElements("first",c.length);if(q.orientation==="horizontal"){h.scrollLeft(0)}else{h.scrollTop(0)}e.animated=false;if(!e.hoveredOver&&q.auto.enabled){clearInterval(e.interval);o._autoMode(q.auto.direction)}o._trigger("pageLoaded",null,{page:m})});e.appended=false},next:function(){var b=this.options,c=a(this.element).data("data");if(!c.animated){c.animated=true;if(!c.appended){++c.pageIndex}if(c.pageIndex>c.pages.length-1){c.pageIndex=0}this._goToNextPage(c.pageIndex-c.oldPageIndex);c.oldPageIndex=c.pageIndex}},prev:function(){var b=this.options,c=a(this.element).data("data");if(!c.animated){c.animated=true;if(!c.appended){--c.pageIndex}if(c.pageIndex<0){c.pageIndex=c.pages.length-1}this._goToPrevPage(c.pageIndex-c.oldPageIndex);c.oldPageIndex=c.pageIndex}},_removeOldElements:function(b,d){var e=a(this.element);for(var c=0;c<d;c++){if(b==="first"){e.find("div.wrapper").children().first().remove()}else{e.find("div.wrapper").children().last().remove()}}},_saveElements:function(){var b,e=a(this.element),c=e.find("div.wrapper").children(),d=e.data("data");c.each(function(f,g){b=a(g);d.paths.push(b.clone(true,true));b.remove()})},_setOption:function(c,f){var e,b=this.options,d=a(this.element).data("data");switch(c){case"speed":this._checkOptionsValidity({speed:f});b.speed=f;a.Widget.prototype._setOption.apply(this,arguments);break;case"auto":e=a.extend(b.auto,f);this._checkOptionsValidity({auto:e});if(b.auto.enabled){this._autoMode(b.auto.direction)}}},_setStep:function(d){var c,b=this.options,e=a(this.element).data("data");c=d||b.step;b.step=c;e.step=b.width*c},_setCarouselHeight:function(){var b,e=a(this.element),d=a(this.element).data("data"),c=this.options;if(c.orientation==="vertical"){b=c.visible*c.height+c.margin*(c.visible-1)}else{b=c.height}e.height(b)},_setCarouselWidth:function(){var d,e=a(this.element),b=this.options,c=a(this.element).data("data");if(b.orientation==="horizontal"){d=b.visible*b.width+b.margin*(b.visible-1)}else{d=b.width}e.css({width:d,overflow:"hidden"})},options:{visible:3,step:3,width:100,height:100,speed:1000,margin:0,orientation:"horizontal",auto:{enabled:false,direction:"next",interval:5000},startAtPage:0,navigation:{next:"#ui-carousel-next",prev:"#ui-carousel-prev"}}})}(jQuery));

/*
 *  deCarta Mobile API.
 *
 *
 *
 *
 *
 */
(function (window, undefined){  
    var document = window.document;
    var deCarta = {};
    deCarta.geId = function(elId) { return document.getElementById(elId);};
    deCarta.crEl = function(tag) { return document.createElement(tag);};
//Namespacing
/**
 * @namespace
 * the deCarta namespace is the top level namespace for all deCarta libraries
 * @description deCarta Top-level Namespace
 */
if (!deCarta) var deCarta = {};

/**
 * @namespace
 * the deCarta.Mobile namespace contains all deCarta Mobile Web APIs
 * @description deCarta Mobile JavaScript API Namespace
 */
deCarta.Mobile = {

    modules: [],
	
    /**
     * @private
     */
    loadModule: function(module, onLoad){
        
        if (this.modules[module]) onLoad();
        var sTag = deCarta.crEl('script');
        sTag.onload = this.moduleLoaded.bind(this, module, onLoad);
        sTag.src = 'modules/' + module + '.js';
        document.body.appendChild(sTag);
    },

    /**
     * @private
     */
    moduleLoaded: function(module, onLoad){
        
        this.modules[module] = true;
        onLoad();
    }

}

//Aliasing within the lib
var dCM = deCarta.Mobile;

/**
 *
 * @class
 * Abstraction layer used to return useful information about the window
 *
 * @description Window abstraction layer
 */

deCarta.Window = {    

    /**
     * Returns TRUE if this is a mobile device. 
     */
    isMobile: function(){
        return /bada|android|blackberry|fennec|ip(hone|od|ad)|maemo|opera mob/i.test(navigator.userAgent || navigator.vendor || window.opera);
    },

    /**
     * Returns TRUE if this is a bada device.
     */
    isBada: function(){
        return /bada/i.test(navigator.userAgent || navigator.vendor || window.opera);
    },

    /**
     * Returns true if this is an iOS device.
     **/
    isIOS: function(){
        return /ip(hone|od|ad)/i.test(navigator.userAgent || navigator.vendor || window.opera);
    },

    /**
     * Returns true if this is a safari device.
     **/
    isSafari: function(){
        console.log(navigator.userAgent)
        console.log(navigator.vendor)
        console.log(window.opera)
        return /Safari/i.test(navigator.userAgent || navigator.vendor || window.opera);
    },

    /**
     * Returns true if this is an Android device.
     */
    isAndroid: function(){
        return /deviceAndroid/i.test(navigator.userAgent || navigator.vendor || window.opera);
    },

    /**
     * Returns true if this is an IE Browser.
     */
    isIe: function(){
        if (document.all) return true;
    },

    /**
     * Returns true if this is an Chrome Browser.
     */
    isChrome: function(){
        return navigator.userAgent.toLowerCase().indexOf('chrome') > -1;
    },

    /**
     * Should we be using CSS Transforms?
     */
    hasCSSTransforms: function(){
        return (deCarta.Window.isChrome() || deCarta.Window.isIOS());
    }, 
	
    /**
     * Returns the reported devicePixelRatio, or if the device does not report it
     * For example, Opera Mobile) it returns a best guesstimate
     */
    getDpr: function(){
        
        if (this.isIe() || !this.isMobile()) return 1;

        if (/bada/i.test(navigator.userAgent || navigator.vendor || window.opera)){            
        
            return window.outerWidth / window.innerWidth;
        }

        if (window.devicePixelRatio){            
        
            return window.devicePixelRatio;
        }
        
        if (document.documentElement.clientWidth != window.innerWidth){        
            return Math.floor((window.innerWidth / document.documentElement.clientWidth) * 100) / 100;
        }
        
        if (document.documentElement.clientWidth < 480) return 1;
        return 1;
    },

    /**
     * Get dimensions of the available viewport, in CSS pixels. 
     *
     */
    getViewport: function(){

        if (this.isIe()){
            return {width: document.body.clientWidth, height: document.body.clientHeight};
        }

        var dpr = this.getDpr();

        if (window.opera){
            return {width: window.innerWidth, height: Math.ceil(window.outerHeight / dpr)};
        }

        if (/bada/i.test(navigator.userAgent || navigator.vendor)){
             return {width: window.innerWidth, height: window.innerHeight};
        }

       /* if (/android/i.test(navigator.userAgent || navigator.vendor || window.opera)){
             return {width: window.outerWidth / dpr, height: (window.outerHeight / dpr) + 10};
        }*/

        //return {width: document.documentElement.clientWidth , height: document.documentElement.clientHeight};
        if (window.devicePixelRatio) return {width: window.innerWidth, height: window.innerHeight};
        return {width: window.innerWidth / dpr, height: window.innerHeight / dpr};
    }

}


/**
 * @class
 * Touch library used to abstract mouse / touch events and provide a
 * common input mechanism between desktop and mobile devices. 
 * Supported events:
 * <ul>
 *    <li>touchstart</li>
 *    <li>touchend</li>
 *    <li>touchmove</li>
 *    <li>tap</li>
 *    <li>doubleTap</li>
 *    <li>longTouch</li>
 *    <li>altTap (rightclick, or ?)</li>
 * </ul>
 *
 * @description Abstracts mouse/touch events
 *
 * @see dCM.EventManager
 */

deCarta.Touch = {

    observedElements: [],        
    
    events: {
        'touchstart': 'touchstart',
        'touchend': 'touchend',
        'touchmove': 'touchmove',
        'tap': 'tap',
        'doubletap': 'doubletap',
        'alttap': 'alttap',
        'longtouch': 'longtouch',
        
        //click aliases
        'mousedown': 'touchstart',
        'mouseup': 'touchend',
        'mousemove': 'touchmove',
        'click': 'tap',
        'doubleclick': 'doubletap',
        'rightclick': 'alttap',
        'longclick': 'longtouch',
        
        //press aliases
        'dragstart': 'touchstart',
        'dragend': 'touchend',
        'dragmove': 'touchmove',
        'press': 'tap',
        'doublepress': 'doubletap',
        'altpress': 'alttap',
        'longpress': 'longtouch'
    },

    LONG_TAP_TIME: 1500,
    DOUBLE_TAP_TOLERANCE: 10,
    DOUBLE_TAP_TIME: 300,
    MAX_TAP_DISTANCE: 10,

    touchable: /webos|bada|android|blackberry|fennec|ip(hone|od|ad)|maemo|opera mob/i.test(navigator.userAgent || navigator.vendor || window.opera),

    withinDistance: function(p1,p2,dist){
        return Math.sqrt(Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2)) <= dist;
    },

    /**
     * Attach a listener to a DOM element.
     * @param {string} event the name of the event to listen for
     * @param {HTMLDOMElement} the element that will be observed
     * @param {function} listener the callback function that will be invoked when the event is triggered
     * @param {boolean} preventDefault if set to true, the default action for the event will be
     * prevented from happening (For example, setting it on an &lt;a%gt; tag will prevent the link
     * from being clickable. <b>NOTE: </b> setting this flag on ANY listener will prevent the
     * default action for the element even if other listeners (attached to the same element / event)
     * don't explicitly prevent it. 
     *
     */
    attachListener: function(event, element, listener, preventDefault){
        //console.log('Attaching listener');
        var observed = this.getElement(element);
        observed.attachListener(event, listener, preventDefault);
    },

    /**
     * Remove a listener
     * @param {string} event
     * @param {HTMLDOMElement} element
     * @param {function} listener
     */
    removeListener: function(event, element, listener){
        var observed = this.getElement(element);
        observed.removeListener(event, listener);
    },

    getElement: function(element){
        for (var i = 0; i < this.observedElements.length; i ++){
            if (this.observedElements[i].element == element){
                return this.observedElements[i];
            }
        }

        var observed = new deCarta.Touch.ObservedElement(element);

        this.observedElements.push(observed);
        return this.observedElements[i];
    }
}

/**
 * @private
 */
deCarta.Touch.ObservedElement = function(domElement){

    this.element = domElement;
    this.preventDefault = false;
    this.listeners = {};      

    var _Pt = function(x, y, t){
        this.x = x;
        this.y = y;
        this.t = t;
    }

    this.startPoint = null;
    this.endPoint = null;
    this.lastPoint = null;
    this.moveTrail = [];

    this.longTouchListener = null;

    this.lastTapTime = 0;
    this.lastTapLocation = null;


    this.start = function(e){
        
        if (this.preventDefault && e.preventDefault) e.preventDefault();
        var ev = this.normalizeEvent(e);

        // code from opera sessions, opera mobile does not set the 
        // scale parameter, we calc from touch distance
        if (e.touches && e.touches.length == 2){
            this.startTouchDistance = dCM.Utilities.pixelDistance({x:e.touches[0].pageX, y:e.touches[0].pageY},{x:e.touches[1].pageX, y:e.touches[1].pageY});
        }

        this.trigger('touchstart', ev, e);

        this.startPoint = new _Pt(ev.pageX, ev.pageY, new Date().getTime());
        this.lastPoint = this.startPoint;
        //start a long touch listener
        //console.log('Starting up the longtouch timeout');
        this.longTouchListener = setTimeout(this.longTouch.bind(this, ev), deCarta.Touch.LONG_TAP_TIME);
    }

    this.move = function(e){
       
        if (this.preventDefault && e.preventDefault) e.preventDefault();

        var ev = this.normalizeEvent(e);
        var scale = (e.scale || 1);
        
        if (scale == 1 && e.touches && e.touches.length == 2 && (window.opera || window.PalmSystem)){
            
            var d = dCM.Utilities.pixelDistance({x:e.touches[0].pageX, y:e.touches[0].pageY},{x:e.touches[1].pageX, y:e.touches[1].pageY});
            scale = d / this.startTouchDistance;
           // alert(scale + ' ' + d + ' ' + this.startTouchDistance);
        }
        
        if (scale) {
            
            ev.scale = scale;
            if (e.touches && e.touches.length > 1){
                this.preventDouble = true;
                
                var x = 0;
                var y = 0;
                for (var j = 0; j < e.touches.length; j++){
                    x += e.touches[j].pageX;
                    y += e.touches[j].pageY;
                }
                ev.centerX = x / e.touches.length;
                ev.centerY = y / e.touches.length;
            }            
        }

        if (deCarta.Window.isIe()){
            ev.pageX = (ev.clientX + document.documentElement.scrollLeft);
            ev.pageY = (ev.clientY + document.documentElement.scrollTop);
        }

        this.trigger('touchmove', ev, e);

        var p = new _Pt(ev.pageX, ev.pageY, new Date().getTime());
        this.lastPoint = p;        
        this.moveTrail.push(p);
    }

    this.end = function(e){
        
        if (this.preventDefault && e.preventDefault) e.preventDefault();
        var ev = this.normalizeEvent(e);

        this.trigger('touchend', ev, e);
     
        this.endPoint = new _Pt(ev.pageX, ev.pageY, new Date().getTime());

        //it is a double tap.

        if (this.preventDouble){
            setTimeout(function(){
                this.preventDouble = false;
            }.bind(this), deCarta.Touch.DOUBLE_TAP_TIME);
        }

        if (!this.preventDouble && this.lastTapLocation && (new Date().getTime()) - this.lastTapTime < deCarta.Touch.DOUBLE_TAP_TIME){            
            this.lastTapLocation = this.startPoint;
            var elPagePos = dCM.Utilities.getObjectPosition(this.element);
            if (this.longTouchListener){
                //remove it.
                clearInterval(this.longTouchListener);
                this.longTouchListener = null;
            }
            
            this.trigger('doubletap', {
                layerX: this.startPoint.x - elPagePos.x,
                layerY: this.startPoint.y - elPagePos.y,
                pageX: this.startPoint.x - elPagePos.x,
                pageY: this.startPoint.y - elPagePos.y
                },e);
            return;
        }

        //it is a single tap
        if (this.longTouchListener){
            //remove it.
            clearInterval(this.longTouchListener);
            this.longTouchListener = null;

            //and fire tap.
            this.lastTapLocation = this.startPoint;
            this.lastTapTime = new Date().getTime();
            if (deCarta.Touch.withinDistance(this.startPoint, this.lastPoint, 3)){
                if (e.button && e.button == 2){
                    this.trigger('alttap', ev, e);
                } else {
                    this.trigger('tap', ev, e);
                }
            }                      
            
            return;
        }

    }
    
    /*this.click = function(e){
        console.log(e);
        var ev = this.normalizeEvent(e);
        if (e.button && e.button == 2){
            this.trigger('alttap', ev, e);
        } else {
            this.trigger('tap', ev, e);
        }
    }*/

    this.longTouch = function(e){

        //make sure lastPoint is in radius of startPoint
        if (deCarta.Touch.withinDistance(this.startPoint, this.lastPoint, deCarta.Touch.MAX_TAP_DISTANCE)){

            if (this.longTouchListener != null){
                this.longTouchListener = null;
                var elPagePos = dCM.Utilities.getObjectPosition(this.element);
                var o =  {
                    layerX: this.startPoint.x - elPagePos.x,
                    layerY: this.startPoint.y - elPagePos.y ,
                    pageX: this.startPoint.x - elPagePos.x,
                    pageY: this.startPoint.y - elPagePos.y
                    };
                    
                this.trigger('longTouch',o,e);
            }            
        } else {
            this.longTouchListener = null;
        }
    }

    this.normalizeEvent = function (e){
        var eObj = null;
        if (e.targetTouches && e.targetTouches[0]) {
            eObj = e.targetTouches[0];
        } else {
            eObj = e;
        }
        if (deCarta.Window.isIe()){
            e.pageX = (e.clientX + document.documentElement.scrollLeft);
            e.pageY = (e.clientY + document.documentElement.scrollTop);
        }
        return dCM.Utilities.extendObject({}, eObj);
    }

    this.attachListener = function(event, listener, preventDefault){
        
        if (!deCarta.Touch.events[event.toLowerCase()]) {         
            throw('Unknown event : ' + event + '. What are you trying to do? Think carefully!');
        }
        //de-alias
        event = deCarta.Touch.events[event.toLowerCase()].toLowerCase();

        if (!this.preventDefault)
            this.preventDefault = preventDefault;

        if (!this.listeners[event]) this.listeners[event] = [];
        this.listeners[event].push({
            listener: listener,
            preventDefault: preventDefault
        });
    }

    this.removeListener = function(event, listener){
        if (!this.listeners[event]) return;
        for (var i =0; i< this.listeners[event].length; i++){
            if (this.listeners[event][i].listener == listener){
                this.listeners[event].splice(i, 1);
            }
        }
    }
	
    this.trigger = function(eventName, event, originalEvent){
        if (this.listeners[eventName]){
            for (var i = 0; i< this.listeners[eventName].length; i++){
                this.listeners[eventName][i].listener(event, originalEvent);/*
                var l = this.listeners[eventName][i];
                setTimeout(function(li, ev){li.listener(ev)}.bind(this, l, event), 1);*/
                //setTimeout(function(li, ev){}.bind(this, l, event), 1);
            }
        }
    }

    this.attach = function(ev, fn, pd){
        if (deCarta.Window.isIe()){
            this.element.attachEvent('on'+ev, fn);
        } else {
            this.element.addEventListener(ev, fn, pd);
        }
    }

    //init stuff
    if (deCarta.Touch.touchable){
        this.attach('touchstart', this.start.bind(this), false);
        this.attach('touchend', this.end.bind(this), false);
        this.attach('touchmove', this.move.bind(this), false);
    } else {
        //this.element.addEventListener('click', function (e) {this.trigger('touch', e)}.bind(this), false);
        this.attach('mousedown', this.start.bind(this), false);
        this.attach('mouseup', this.end.bind(this), false);
        this.attach('mousemove', this.move.bind(this), false);
    }   

}
/**
 * @class
 * The Map Class provides the necessary objects for a mobile online
 * mapping application: it provides the map display and interaction. In its
 * simplest form, Map objects provide a draggable map to the end user.
 * 
 * @description The master map object.
 *
 * @constructor
 * @param {object} options. An object containing some (or all) of the following
 * properties:
 * <ul>
 *   <li>{HTMLDOMElement} id: DOM id of the map element *required*</li>
 *   <li>(int) zoom: the starting zoom level, 20=maxzoom, 1=minzoom, default=3</li>
 *   <li>{@link dCM.Position} center: Geographic position where the map is initially centered</li>
 *   <li>(bool) easing: whether easing (smooth transitions between zoom levels) is enabled (default: true)</li>
 *   <li>(bool) digitalZoom: <em>true</em> enables animated zoom between levels, optional, default=true</li>
 *   <li>(bool) doubleTapZoom: <em>true</em> enables double click (tap) to zoom on position, optional, default=true</li>
 *   <li>(array of {@link dCM.MapLayer}) layers: set of tile layers which will be initialized with the map</li>
 *   <li>(array of {@link dCM.MapControl}) controls: set of map control objects to add to the map</li>
 *   <li>onReady: a callback function which will be invoked when the map has loaded</li>
 *   <li>(bool) draggable: If <em>true</em> allows map to be draggable. Optional, default="true"</li>
 *   <li>(bool) limitFPS: If <em>true</em>, limits the frames-per-second to
 *        the maxFPS value. Optional, default=true</li>
 *   <li>(int) maxFPS: Frames-per-second limit used if limitFPS=true. Optional,
 *       default=30</li>
 *   <li>(int) controlZ: css Z-index for map controls. Each new control created
 *       will have an increasing css z-index starting from this value, allowing
 *       the application to insert page elements above or below the map controls
 *       </li>
 *   <li>(bool) resizeable: If <em>true</em>, map is resizeable. Optional,
 *       default=true</li>
 *   <li>(int) maxZoom: Maximum zoom level (tighest zoom), in the range 1
 *       (min possible zoom) to 20 (max possible zoom). Optional, default=19.</li>
 *   <li>(int) minZoom: Minimum zoom level (widest zoom), in the range 1
 *       (min possible zoom) to 20 (max possible zoom). Optional, default=2.</li>
 *   <li>skipResources: Set to true to skip loading of resources. Optional, 
 *       default=false</li>
 *   <li>boundaries: Defines the latitude and longitude limits for the map. The
 *       map will not display tiles when outside of these bounds. This object has these fields:
 *     <ul>
 *       <li>(float) top: maximum latitude (up to 90), default: 87</li>
 *       <li>(float) bottom: minimum latitude (down to -90) , default: -87</li>
 *       <li>(float) left: leftmost longitude (-180 to 180), default: null</li>
 *       <li>(float) right: right longitude (-180 to 180), default: null</li>
 *     </ul>
 *   </li>
 *   <li>(bool) avoidEvents: If <em>true</em>, the Map does not respond to any input events. optional, default=false</li>
 * </ul>
 * 
 * Map Events
 * 
 * 
 * Your application can add listeners for specific map events. This can be done through the EventManager,
 * or through proxy methods available on the Map object. For example, to install a callback for a zoomStart event,
 * you can proceed in two ways:
 * 
 * map.zoomstart(function(){//your code});
 * 
 * or
 * 
 * dCM.EventManager.listen('zoomstart', function(){//your code});
 * 
 * 
 *
 * @throw {Exception} if the id option is not set, or invalid.
 */
dCM.Map = function(options){
    /** These are our default options. */
    
    this.options = {
        /**
         * @private
         * mode of the map : can render on regular HTML or a CANVAS
         */
        mode: 'html',
        /**  id of the map container */
        id: null,
        /**  starting zoom level */
        zoom: 3,
        /**  starting center location */
        center: new dCM.Position(37.689107,-122.427957),
        /**  callback, will execute when the map is fully ready (all resources, modules and so on have loaded) */
        onReady: null,
        /**  callback, will execute if there is an error */
        onError: null,
        /**  Bool, does the map have easing? */
        easing: true,
        /**  Bool, does the map smoothly transition between zoom levels */
        digitalZoom: true,
        /**  Array, can be passed in to initialize a set of layers on the map (also can use addLayer later) */
        layers: null,
        /**  Array, can be passed in with a set of MapControls to add to the map */
        controls: null,
        /**  Bool, true if doubletapping (or clicking) zooms the map */
        doubleTapZoom: true,
        /**  Bool, makes the map draggable */
        draggable: true,
        /**  Bool, used to avoid extra renderings */
        limitFps: true,
        /**  Int: if limitFps is true, this will be the limit.  */
        maxFps: 30,
        /** Int : z index for map controls.  */
        controlZ: 1000,
        /** is the map resizeable */
        resizeable: true,
        /** Max allowed zoom level*/
        maxZoom: 19,
        /** Min allowed zoom level */
        minZoom: 2,
		
		/** Is the scroll wheel enabled ?*/
		scrollWheelEnabled: true,
       
        /**
	 * @private
	 * Initial HTTP request callback, apps written against this API will fire an initial
         * request to the server's load balancer and be returned a host to which to bind,
         * this callback is excuted when this initial request returns, with:
         * {success : BOOLEAN, msg : STRING, exTime : NUMBER} */
        bindToServerCallback: undefined,
        /**
	 * @private
         * Skip the RUOK request to load balancer, set to true if not using load balancer
         */
        skipBindingToServer: false,

        /**
         * Set to true to skip loading of resources 
         */
        skipResources: false,
        /*
         * Setting this to true will force the resources to be loaded with a script tag request
         **/
        forceResourceSTAGRequest: false,

        /**
         * Pass an object with top (max latitude up to 90), bottom (min latitude
		 * down to -90, left (longitude from -180 to 180), right (longitude from
		 * -180 to 180) which defines the limits of the map. The map will not
		 * display tiles outside of these limits.
         **/
        boundaries: {
            top: 87,
            bottom: -87,
            left: null,
            right: null
        },

        /**
         *
	 */
        avoidEvents: false
    }

    // Extend the passed options with the defaults.
    this.options = dCM.Utilities.extendObject(this.options, options);

    //Check for the ONE required option: containerId
    this.containerElement = deCarta.geId(options.id);
/*    this.controlElement = deCarta.crEl('div');
    this.controlElement.className = 'deCarta-mob-top';
    this.controlElement.style.position = 'absolute';
    this.controlElement.style.left = this.controlElement.style.top = 0;*/
    
    if (!this.options.id || !this.containerElement) {
        dCM.Exception.raise('Map creation failed: no DOM id set in the options, or it is invalid');
    }

    // Create and add the map element to the container
    if (this.options.mode == 'canvas'){
        this.canvas = deCarta.crEl('canvas');
    } else {
        this.canvas = deCarta.crEl('div');
        this.canvas.style.overflow = 'hidden';
    }

    this.canvas.className = 'deCarta-Mobile-Map';
    this.canvas.style.position = 'absolute';
    //this.containerElement.style.position = 'relative';
    
    
    this.containerElement.appendChild(this.canvas);    
    //this.containerElement.appendChild(this.controlElement);

    // Initialize a bunch of variables. Are they all used? CHECK.
    this.topPosition = (this.options.boundaries.top) ? new dCM.Position(this.options.boundaries.top, 0) : null;
    this.btmPosition = (this.options.boundaries.bottom) ? new dCM.Position(this.options.boundaries.bottom, 0) : null;

    this.leftPosition = (this.options.boundaries.left) ? new dCM.Position(0, this.options.boundaries.left) : null;
    this.rightPosition = (this.options.boundaries.right) ? new dCM.Position(0, this.options.boundaries.right) : null;

    this.panVector = {
        x: 0,
        y: 0,
        v: 0
    };
    this.layers = [];
    this.controls = [];
    this.ofsX = this.ofsY = 0;
    this.zoom = this.options.zoom;
    this.targetZoom = this.options.zoom;
    this.maxZoom = (typeof this.options.maxZoom !== 'undefined') ? this.options.maxZoom : 20;
    this.minZoom = (typeof this.options.minZoom !== 'undefined') ? this.options.minZoom : 2;
    this.zooming = false;
    this.dragging = false;
    this.easing = false;
    this.dragStartX = this.dragStartY = 0;
    this.lastDragEvent = null;
    this.center = this.options.center;    
    this.targetCenter = this.center.clone();
    this.console = deCarta.geId('console');
    this.tileGrid = new dCM.TileGrid();
    this.rendering = false;
    this.debugInfo = {
        renderings: 0,
        totalRenderTime: 0,
        skippedRenders: 0,
        moveEvents: 0
    };
    
    this.createListenProps();

    //set to true when RUOK completes
    this.ready = false;

    //set up a rendering listener on tile load
    dCM.EventManager.listen('tileLoad', function(ev){
        //if (ev.map != this) return;
        this.render(true);
    }.bind(this));


    var imagePack = null;
    if (deCarta.Window.getDpr() >= 1.3){
        if (dCM.Configuration.baseHiResImagePack)  imagePack = dCM.Configuration.baseHiResImagePack;
    } else {
        if (dCM.Configuration.baseImagePack)  imagePack = dCM.Configuration.baseImagePack;
    }

    if (!this.options.skipResources){
        if (imagePack){
            dCM.ImagePack.load(dCM.Configuration.resourceBase + imagePack, this.imagePackLoaded.bind(this), this.options.forceResourceSTAGRequest);
        }
    } else this.imagePackLoaded();
    /**
     * if skipBindingToServer then we will skip the initial RUOK call to the load balancer.
     */
    if (this.options.skipBindingToServer){

        /**
         * break closure of contructor scope so map can initiate in the app w/ setTimeout
         */
        setTimeout(function(){
            this.init();
        }.bind(this), 1);

    } else {        
        // First things first : RUOK request
        // then, we load more stuff
        dCM.JSRequest.init(function (resp) {
            if (resp.success){                
                this.init();
            } else {
                if(this.options.onError)this.options.onError(resp.msg)
                // raise exception if the user has not provided their own mechanism
                if(!typeof this.options.bindToServerCallback === 'function'){
                    dCM.Exception.raise(resp.msg)
                }
            }
            if(typeof this.options.bindToServerCallback === 'function'){
                this.options.bindToServerCallback(resp);
            }
        }.bind(this));
    }
}


dCM.Map.prototype = {

    /**
     * @private
     * So this one here creates the various props that you can use to listen for map events.
     * It iterates thru the eventmanager and creates a proxy funtion for that event.
     * so we will have map.click, map.doubleclick and so on so forth. how neat! weeee    
     */
    createListenProps: function(){
        var events = dCM.EventManager.eventNames;
        for (var event in events){
            //make the prop
            if (this[event]) {            
                event = 'on' + event;
            }
            
            this[event] = function(event, callback){                
                var listenerId = dCM.EventManager.listen(event, callback);
                return function(){
                    dCM.EventManager.stopListeningByIdx(event, listenerId);
                }
            }.bind(this, event)            
        }
    },
        
    /**
     * @private
     * new code
     */
    imagePackLoaded: function(){

        if (this.ready){
            this.doneControls();
        } else {
            //try again.
            setTimeout(this.imagePackLoaded.bind(this), 100);
        }
    },

    /**
	 * @private
	 */
    doneControls: function(){

        if (this.options.controls){
            for (var i = 0; i < this.options.controls.length; i++){
                this.addControl(this.options.controls[i], true);
            }
        }
        this.drawControls();
        this.resize();
        if (typeof this.options.onImagesLoaded === 'function') this.options.onImagesLoaded();
    },

    /**
     * Resize the map according to the new size of the containing element.
     * The map will adapt to fill 100% of the containing element when this function
     * is called
     */
    resize: function(){
        //if (!this.options.resizeable) return;
        //fix this
        var i = 0;

        if (this.options.mode == 'canvas'){
            this.width = this.canvas.width = parseFloat(this.containerElement.style.width);
            this.height = this.canvas.height = parseFloat(this.containerElement.style.height);
        } else {
            this.width = parseFloat(this.containerElement.style.width);
            this.height = parseFloat(this.containerElement.style.height);
      
            if (!this.width || !this.height){
                this.width = parseFloat(this.containerElement.clientWidth);
                this.height = parseFloat(this.containerElement.clientHeight);
            }                        
            
            this.canvas.style.width = this.width + 'px';            
            this.canvas.style.height = this.height + 'px';
                  
        }               
        
        /*this.controlElement.style.width = this.width + 'px';
        this.controlElement.style.height = this.height + 'px';*/

        this.tileGrid.resize(this.width, this.height);

        for (i = 0; i < this.layers.length; i++){
            this.layers[i].resize(this.width, this.height);
        }

        for (i = 0; i < this.controls.length; i++){
            this.controls[i].position();
        }

        dCM.EventManager.trigger('resize', {
            map: this,
            zoom: this.zoom,
            center: this.center,
            size: {
                width: this.width,
                height: this.height
            }
        });

        this.render();
    },

    /**
     * Returns the highest css z-index used by the map and it's control and overlay
	 * layers. This allows the user to place page elements above the map and all
	 * its layers.
     * @return {int} The highest z-index used by the map
     */
    getHighestZ: function(){

        var max = 0;
        try {
            //find highest layer z
            for (var i = 0; i < this.layers.length; i++){
                if (this.layers[i].options.zIndex) {
                    if (this.layers[i].options.zIndex > max) max = this.layers[i].options.zIndex;
                }
            }
        }catch (e) {
        //error
        }

        return dCM.Configuration.baseOvlZ + max;
    },

    /**
	 * @private
     * Completes map initialization after all resources have loaded.
     */
    init: function(){        
        var i = 0;
        // Set up a few variables
        this.baseZoom = this.zoom;
        this.lastTouchTime = 0;

        //add layers and controls
        if (!this.options.layers) {
            this.addLayer(new dCM.MapLayer({
                name: 'Map View',
                visible: true,
                tileStore: new dCM.StreetTileStore({
                    precache: !deCarta.Window.isMobile()
                })
            }));
        } else {
            for (i = 0; i < this.options.layers.length; i++){
                this.addLayer(this.options.layers[i]);
            }
        }
        
        if (!this.options.avoidEvents) {
            deCarta.Touch.attachListener('touchstart', this.canvas, this.touchStart.bind(this), true);
            deCarta.Touch.attachListener('touchmove', this.canvas, this.touchMove.bind(this), true);
            deCarta.Touch.attachListener('touchend', this.canvas, this.touchEnd.bind(this), true);
            deCarta.Touch.attachListener('doubleTap', this.canvas, this.doubleTap.bind(this), true);
            deCarta.Touch.attachListener('longTouch', this.canvas, this.longTouch.bind(this), true);
            deCarta.Touch.attachListener('tap', this.canvas, this.tap.bind(this), true);
            deCarta.Touch.attachListener('altTap', this.canvas, this.altTap.bind(this), true);
        }

        this.count = 0;

        dCM.EventManager.trigger('zoomEnd', {
            map: this,
            zoom: this.zoom,
            targetZoom: this.targetZoom
        });
                
        this.resize();
        //load modules if needed
        /*
        if (this.options.modules && this.options.modules.length > 0){

            var needLoading = this.options.modules.length;

            for (i = 0; i < this.options.modules.length; i++){
                dCM.loadModule(this.options.modules[i], function(){
                    needLoading --;
                    if (needLoading == 0) this._ready();
                }.bind(this));
            }
        } else {
            this._ready();
        }*/        
        setTimeout(function(){
            if(!deCarta.Window.isMobile() && this.options.scrollWheelEnabled) {new dCM.ZoomFramer(this);}
            this._ready()
            }.bind(this), 1);
    },

    /**
     * Add a layer (tile set) to the map. {@see dCM.MapLayer}
     * @param {dCM.MapLayer} layer The MapLayer object you wish to add.
     */
    addLayer: function(layer){

        if (!layer.render || !layer.resize){
            dCM.Exception.raise ('The layer you are trying to add does not support required methods "render" or "resize".');
        }

        layer.setOwner({
            owner: this,
            canvas: this.canvas
        });
        this.layers.push(layer);
        return layer;

    },
	
    /**
     * Removes a layer (tile set) from the map. {@see dCM.MapLayer}
     * @param: {dCM.MapLayer} layer The MapLayer object you wish to remove.
     */
    removeLayer: function(layer){
        for (var i = 0; i < this.layers.length; i++){
            if (this.layers[i] == layer) {
                this.layers.splice(i,1);
                return true;
            }
        }
        return false;
    },

    /**
	 * Adds a Map Overlay (which may contain things like Circles, Polylines, Images,
     * Pins, or Polygons) to the map
	 * {@see dCM.MapOverlay}
	 * {@see dCM.Circle}
	 * {@see dCM.Polyline}
	 * {@see dCM.Image}
	 * {@see dCM.Pin}
	 * {@see dCM.Polygon}
	 * @param {dCM.MapOverlay} overlay A Map Overlay to add
     */
    addOverlay: function(overlay){
        return this.addLayer(overlay);
    },

    /**
     * Removes a Map Overlay from the map.
	 * {@see dCM.MapOverlay}
	 * @param {dCM.MapOverlay} overlay A Map Overlay to remove
     */
    removeOverlay: function(overlay){
        return this.removeLayer(overlay);
    },

    /**
     * Sets the "draggable" attribute of the map
     * @param {boolean} value <em>true</em indicates that map is draggable
     */
    setDraggable: function(value){
        this.options.draggable = value;
    },

    /**
	 * Redraws/renders the map with the current map settings (such as center, size
	 * and zoom values), as well as any updated layers or overlays.
     * @param {boolean} skippable : set to <em>true</em> if this is not a required render.
     */
    render: function(skippable){
        var sinceLastRender;
        // if the render is skippable (renders triggered by tile loads are)
        // then don't process if there are already other renders coming up
        // which is going to happen if we are animating.

        if (skippable && this.animating()) return;

        this.rendering = true;
        try {
            // Here we do some checking to see if there has been a rendering within
            // the last (1000 / options.maxFps). If yes, then we delay the current
            // render request by the time required to make it happen on the next
            // frame. If any other request comes in before it can be executed,
            // it will be canceled.

            if (this.options.limitFps){

                var frameTime = 1000 / this.options.maxFps;

                if (!this.animating()){
                    sinceLastRender = (new Date().getTime() - this.lastRender);
                    if (this.renderTimeout) {
                        this.debugInfo.skippedRenders ++
                        clearTimeout(this.renderTimeout);
                    }
                    if (sinceLastRender < frameTime){
                        this.renderTimeout = setTimeout(this.render.bind(this), (frameTime - sinceLastRender));
                        this.rendering = false;
                        return;
                    }
                } else {
                    if (this.renderTimeout) {
                        clearTimeout(this.renderTimeout);
                    }
                }
            }
            this.debugInfo.renderings ++;

            this.checkBounds();
            
            // Let's remember when we rendered last
            this.lastRender = new Date().getTime();
            
            // **** This is the actual rendering. ****
            this.tileGrid.prepare(this.center, this.zoom);            

            for (var i = 0; i < this.layers.length; i++){
                this.layers[i].render(this.tileGrid);
            }

            // A bit of dbg info, and write to console
            sinceLastRender = (new Date().getTime() - this.lastRender);
            this.debugInfo.minFrameTime = frameTime;
            this.debugInfo.totalRenderTime += sinceLastRender;
            this.debugInfo.avgRenderTime = (this.debugInfo.totalRenderTime / this.debugInfo.renderings) + ' msec';
            this.debugInfo.animating = this.animating();
        } catch (e){
            this.debugInfo.renderError = e.toString();
        }
    //this.drawConsole();
    },
    
    /**
	 * Sets the map boundary using a {@link dCM.MapBoundary} object,
	 * which creates a polygon map boundary. The map will not display tiles outside
	 * of that polygon.
	 * @param {dCM.MapBoundary} bound An instance of a
	 * {@link dCM.MapBoundary} object that sets the map boundaries to
	 * an arbitrary polygon.
	 */
    setBoundary: function(bound){        
        this.boundary = bound;
    },

    /**
	 * @private
     * Used while rendering, checks the bounds of the map
     **/
    checkBounds: function(){
        /* Check boundaries */
        if (!this.boundary)
            if (!this.leftPosition || !this.rightPosition || !this.btmPosition || !this.topPosition) return;
   
        if (this.boundary){
            
            if (!this.boundary.checkPosition(this.center)){
                var betterCenter = this.boundary.getClosestPosition(this.center);
                var positionWin = new dCM.Position(betterCenter.getLat(), betterCenter.getLon());

                this.center = positionWin;
            }

        } else {

            var left = (this.leftPosition) ? this.leftPosition.getX(this.zoom) : null;
            var right = (this.rightPosition) ? this.rightPosition.getX(this.zoom) : null;
            var btm = (this.btmPosition) ? this.btmPosition.getY(this.zoom) :  null;
            var top = (this.topPosition) ? this.topPosition.getY(this.zoom) : null;

            if (this.options.boundaries.top){
                var topLimit = top - (this.height / 2);

                var centerY = this.center.getY(this.zoom);
                if (centerY > topLimit) centerY = topLimit;

                this.center.setXY(this.center.getX(this.zoom), centerY, this.zoom);
            }
            if (this.options.boundaries.bottom){
                var btmLimit = btm + (this.height / 2);

                var centerY = this.center.getY(this.zoom);
                if (centerY < btmLimit) centerY = btmLimit;

                this.center.setXY(this.center.getX(this.zoom), centerY, this.zoom);
            }
            if (this.options.boundaries.left){
                var leftLimit = left + (this.width / 2);

                var centerX = this.center.getX(this.zoom);
                if (centerX < leftLimit) centerX = leftLimit;

                this.center.setXY(centerX, this.center.getY(this.zoom), this.zoom);
            }
            if (this.options.boundaries.right){
                var rightLimit = right - (this.width / 2);

                var centerX = this.center.getX(this.zoom);
                if (centerX > rightLimit) centerX = rightLimit;

                this.center.setXY(centerX, this.center.getY(this.zoom), this.zoom);
            }
            if (this.options.boundaries.top && this.options.boundaries.bottom){

                var height = Math.abs(btm - top);

                if (height < this.height){
                    var centerY = (btm + top) / 2
                    this.center.setXY(this.center.getX(this.zoom), centerY, this.zoom);
                }
            }
            if (this.options.boundaries.left && this.options.boundaries.right){

                var width = Math.abs(right - left);

                if (width < this.width){
                    var centerX = (right + left) / 2;
                    this.center.setXY(centerX, this.center.getY(this.zoom), this.zoom);
                }
            }
        }

    },


    /**
	 * @private
     */
    drawConsole: function(){
        if (!this.console) return;
        var s = '';
        for (var info in this.debugInfo){
            s += info + ' : ' + this.debugInfo[info] + ' <br />';
        }
        this.console.innerHTML = s;
    },
    
    altTap: function(e){
        var fixedPos = this.positionFromXY(e.layerX, e.layerY);

        var ev = {
            position: fixedPos,
            center: this.center,
            zoom: this.zoom,
            map: this,
            originalEvent: e
        };
        dCM.EventManager.trigger('rightclick', ev);
    },
    
    tap: function(e){
        var fixedPos = this.positionFromXY(e.layerX, e.layerY);

        var ev = {
            position: fixedPos,
            center: this.center,
            zoom: this.zoom,
            map: this,
            originalEvent: e
        };
        dCM.EventManager.trigger('click', ev);
    },

    /**
	 * @private
     */
    doubleTap: function(e){
        
        if (!this.options.doubleTapZoom) return;
        var fixedPos = this.positionFromXY(e.layerX, e.layerY);

        var ev = {
            position: fixedPos,
            center: this.center,
            zoom: this.zoom,
            map: this,
            originalEvent: e
        };

        dCM.EventManager.trigger('doubletap', ev);        

        this.zoomIn(1, fixedPos);
        this.render();
    },

    /**
	 * @private
     */
    longTouch: function(e){
        var pos =  this.positionFromXY(e.layerX, e.layerY);

        dCM.EventManager.trigger('longtouch', {
            position: pos,
            center: this.center,
            zoom: this.zoom,
            map: this,
            originalEvent: e
        });
    },

    /**
	 * @private
     */
    touchStart: function(e, oe){

        if (!this.options.draggable) return;
        
        var pos =  this.positionFromXY(e.layerX, e.layerY);

        this.dragging = true;

        this.panVector.v = 0;

        this.lastMoveX = e.pageX;
        this.lastMoveY = e.pageY;


        dCM.EventManager.trigger('movestart', {
            position: pos,
            center: this.center,
            zoom: this.zoom,
            map: this,
            originalEvent: e
        });

        if (oe.preventDefault) oe.preventDefault();
        return false;
    },
    
    /**
	 * @private
     */
    touchEnd: function(e, oe){
        
        this.dragging = false;
        if (this.startZoom == this.zoom || !this.startZoom) this._ease();
        this.startZoom = null;

        if (oe.preventDefault) oe.preventDefault();
        return false;
    },

    /**
	 * @private
     */
    touchMove: function(e, oe){
        
        if (!this.dragging || !this.options.draggable) return false;
        this.debugInfo.tScale = e.scale;
        if (e.scale && e.scale != 1){

            if (!this.startZoom) this.startZoom = this.zoom;

            var curZoom = this.zoom;
            var tZoom = this.startZoom + ( (Math.log(e.scale)) / (Math.log(2)));

            var fixedPoint = this.positionFromXY(e.centerX, e.centerY);
            this.zoom = tZoom;

            this.center = dCM.Utilities.getCenterToFixPositionAtNewZoom(
                fixedPoint,
                this.center,
                curZoom,
                this.zoom
                )
            dCM.EventManager.trigger('zoomChange', {
                position: fixedPoint,
                map: this,
                zoom: this.zoom,
                targetZoom: this.zoom,
                originalEvent: e
            });

        } else {
            
            var dX = e.pageX - this.lastMoveX;
            var dY = e.pageY - this.lastMoveY;

            this.lastMoveX = e.pageX;
            this.lastMoveY = e.pageY;

            var centerX = this.center.getX(this.zoom);
            var centerY = this.center.getY(this.zoom);

            this.center.setXY(centerX - dX, centerY + dY, this.zoom);

            this.panVector.x = dX;
            this.panVector.y = dY;
            this.panVector.v = 1;            

            dCM.EventManager.trigger('move', {
                position: this.center,
                center: this.center,
                zoom: this.zoom,
                map: this,
                originalEvent: e                
            });
        }

        this.debugInfo.moveEvents ++;
        this.render();

        if (oe.preventDefault) oe.preventDefault();
        return false;
    },

    /**
     *  Zooms to a specific zoom level
     *  @param {int} z A valid zoom level (20=maxzoom, 1=minzoom)
     *  @param {dCM.Position} fixedPos A geographic position on the map 
	 *  which should maintain the same position in the viewport when the zoom is
	 *  complete.
     */
    zoomTo: function(z, fixedPos, instantaneous){
        if (z == this.zoom) return;
        if (Math.abs(z - this.zoom) < 4 && !instantaneous){
            this.targetZoom = z;
            if (!fixedPos) fixedPos = this.center;
            this._xzoom(this.targetZoom > this.zoom, fixedPos);
        } else {
            this.zoom = z;
            this.targetZoom = z;
            dCM.EventManager.trigger('zoomEnd', {
                position: fixedPos,
                map: this,
                zoom: this.zoom,
                targetZoom: this.targetZoom
            });
            this.render();
        }
    },

    /**
     *  Centers the map on a specific location.
     *  @param p (dCM.Position) new center position
     *  @param aniOptions (Object) animation options (Optional. Defaults: {animated: true, duration 500})
     */
    centerOn: function(p, aniOptions){
        
        if (!aniOptions)
            aniOptions = {
                animated: true,
                duration: 500
            };
        if (!aniOptions.duration)
            aniOptions.duration = 500;
        if (!aniOptions.onDraw)
            aniOptions.onDraw = null;                
        
        if (aniOptions.animated){
            this.targetCenter = new dCM.Position(p.getLat(), p.getLon());
            this.targetCenterTime = new Date().getTime() + aniOptions.duration;
            this._pan(aniOptions.onDraw);
        } else {
            delete this.center;
            this.center = new dCM.Position(p.getLat(), p.getLon());
            this.center.quantize(this.zoom);
            this.render();
            dCM.EventManager.trigger('moveend', {
                center: this.center,
                zoom: this.zoom,
                map: this
            });            
        }
    },
    
    pan: function(where, howMuch){        
        
        var pxPos = this.center.getPixelPoint(this.zoom);
        switch (where){
            case 'north':
                if (!howMuch) var howMuch = this.height / 2;                
                pxPos.y += howMuch;
                break;
            case 'east':
                if (!howMuch) var howMuch = this.width / 2;                
                pxPos.x += howMuch;
                break;
            case 'south':
                if (!howMuch) var howMuch = this.height / 2;
                pxPos.y -= howMuch;
                break;
            case 'west':
                if (!howMuch) var howMuch = this.width / 2;
                pxPos.x -= howMuch;
                break;
        }
        var p = new dCM.Position(0,0);
        p.setXY(pxPos.x, pxPos.y, this.zoom);
        
        this.centerOn(p, {
            animated: true,
            duration: 200
        });
    },

    /**
     * Zooms in by a specified amount.
     * @param d (float) delta to be added to the current zoom
     * @param fixedPos (dCM.Position) a position which should maintain
     *  the same position in the viewport when the zoom is complete.
     */
    zoomIn: function (d, fixedPos){
        if (this.zoom == this.maxZoom) return;
        var snap = false;
        if (!d) {
            d = 1;
            snap = true;
        }
        if (!fixedPos) fixedPos = this.center;
        if (this.zooming) return;
        this.zooming = true;

        this.targetZoom = this.zoom + d;
        if (snap) this.targetZoom = Math.round(this.targetZoom);

        if (this.targetZoom > this.maxZoom) this.targetZoom = this.maxZoom;

        this._xzoom(true, fixedPos);
    },
    /**
     * Zooms out by a specified amount.
     * @param d (float) delta to be subtracted from the current zoom
     * @param fixedPos (dCM.Position) a position which should maintain
     *  the same position in the viewport when the zoom is complete.
     */
    zoomOut: function(d, fixedPos){
        if (this.zoom == this.minZoom) return;
        var snap = false;
        if (!d) {
            d = 1;
            snap = true;
        }
        if (!fixedPos) fixedPos = this.center;
        if (this.zooming) return;
        this.zooming = true;

        this.targetZoom = this.zoom - d;
        if (snap) this.targetZoom = Math.round(this.targetZoom);

        if (this.targetZoom < this.minZoom) this.targetZoom = this.minZoom;

        this._xzoom(false, fixedPos);
    },

    /**
     * @private Performs the animated zoom.
     *
     * Changed to be based on timecode rather than frames, for prettyness.
     *
     * @param direction: boolean (true: zoom in, false: zoom out)
     * @param fixedPos : Position
     */
    _xzoom: function(direction, fixedPos){
        
        dCM.EventManager.trigger('zoomStart', {
            map: this,
            zoom: this.zoom,
            targetZoom: this.targetZoom
        });

        if (!this.options.digitalZoom){
            this.zoom = this.targetZoom;
            dCM.EventManager.trigger('zoomEnd', {
                map: this,
                zoom: this.zoom,
                targetZoom: this.targetZoom
            });
            this.zooming = false;
            this.render();
            return;
        }

        var duration = 300;

        var startTime = new Date().getTime();

        var startZoom = this.zoom;

        var startCenter = this.center;

        var curZoom = this.zoom;
        
        var easingFn = deCarta.Easing('cubicinout');

        var zoomstep = function(){
            
            var now = new Date().getTime();
            if (now >= startTime + duration){
                curZoom = this.zoom;
                this.zoom = this.targetZoom;
                this.center = dCM.Utilities.getCenterToFixPositionAtNewZoom(fixedPos, startCenter, startZoom, this.zoom);
                dCM.EventManager.trigger('zoomEnd', {
                    map: this,
                    zoom: this.zoom,
                    targetZoom: this.targetZoom
                });

                this.render();
                this.zooming = false;

                
                
            } else {
                
                curZoom = this.zoom;
                this.zoom = easingFn(now - startTime, startZoom, this.targetZoom - startZoom, duration);

 
                /*var zoomInc = (now - startTime) / duration;
                if (!direction) zoomInc = -zoomInc;
                curZoom = this.zoom;
                this.zoom = startZoom + zoomInc;*/
                dCM.EventManager.trigger('zoomChange', {
                    map: this,
                    zoom: this.zoom,
                    targetZoom: this.targetZoom
                });
                this.center = dCM.Utilities.getCenterToFixPositionAtNewZoom(fixedPos, this.center, curZoom, this.zoom);

                this.render();
                //trying out this new thing
                //setTimeout(zoomstep, 0);
                requestAnimFrame(zoomstep)
            }

        }.bind(this);

        zoomstep();
    },

    /**
     * @private Performs the easing animation.
     *
     * Change it to work with time, like zoom.
     *
     **/
    _ease: function(){
        
        if (!this.options.easing) {
            dCM.EventManager.trigger('moveend', {
                center: this.center,
                zoom: this.zoom,
                map: this
            });
            return;
        }

        this.easing = true;

        var fps = 33;
        var msPerFrame = 1000 / fps;

//        var friction = Math.sqrt(Math.pow(this.panVector.x,2) + Math.pow(this.panVector.y,2))/1000;
//        friction+=0.90;
//        friction = friction>0.97 ? 0.97 : friction ;
        var friction = 0.90;
        var easestep = function(){

            if (this.dragging) return;
            
            this.panVector.v *= friction;
            var dX = this.panVector.x * this.panVector.v;
            var dY = this.panVector.y * this.panVector.v;

            var centerX = this.center.getX(this.zoom);
            var centerY = this.center.getY(this.zoom);

            this.center.setXY(Math.round(centerX - dX), Math.round(centerY + dY), this.zoom);

            dCM.EventManager.trigger('move', {
                center: this.center,
                zoom: this.zoom,
                map: this
            });

            this.render();

            if (this.panVector.v > 0.05) {
                //setTimeout(easestep, msPerFrame);
                requestAnimFrame(easestep, null, msPerFrame);
            } else {
                dCM.EventManager.trigger('moveend', {
                    center: this.center,
                    zoom: this.zoom,
                    map: this
                });
                this.easing = false;
            }
        }.bind(this);

        easestep();
    },

    _pan: function(onDraw){
        //if (this.dragging) return;

        var centerX = this.center.getX(this.zoom);
        var centerY = this.center.getY(this.zoom);

        var tX = this.targetCenter.getX(this.zoom);
        var tY = this.targetCenter.getY(this.zoom);
        var timeLeft = this.targetCenterTime - new Date().getTime();
        var remainingFrames = Math.floor(timeLeft / (1000 / 20));
        
        if (remainingFrames > 0){

            /* var nX = Math.floor((centerX + tX) / 2);
            var nY = Math.floor((centerY + tY) / 2);*/

            var xStep = (tX - centerX) / remainingFrames;
            var yStep = (tY - centerY) / remainingFrames;
            var nX = centerX + xStep;
            var nY = centerY + yStep;

            this.center.setXY(nX, nY, this.zoom);
            if (onDraw) onDraw(this.center);

            this.render();
            /*setTimeout(function(){
                this._pan(onDraw)
            }.bind(this), 1000 / 20);*/
            
            requestAnimFrame(function(){
                this._pan(onDraw)
            }.bind(this), null, 1000 / 20);
            
        } else {            
            this.center.setXY(tX, tY, this.zoom);
            this.render();
        }
    },

    /**
     * @private Called when map is ready, everything is loaded and good to go
     */
    _ready: function(){
        
        this.ready = true;
        if (typeof this.options.onReady === 'function'){
            this.options.onReady(this);
        }

    },

    /**
     * Returns a boolean value indicating if the map is currently animating
     * @return (bool)
     */
    animating: function(){
        return (/*this.dragging ||*/this.easing || this.zooming);
    },

    /**
     * Returns the current zoom level
     */
    getZoom: function (){
        return this.zoom;
    },
    
    /**
     * Returns the map's center position (dCM.Position)
     */
    getCenter: function(){
        return this.center;
    },

    /**
     * Get the radius of the visible portion of the map (dCM.Radius)
     */
    getRadius: function(){
        //get the viewable radius of the map
        var topLeft = new dCM.Position(0,0);

        var x = this.center.getX(this.zoom) - (this.width / 2);
        var y = this.center.getY(this.zoom) - (this.height / 2);

        topLeft.setXY(x, y, this.zoom);

        var km = dCM.Utilities.getPointDistance(this.center, topLeft);

        return new dCM.Radius(km, 'KM');
    },

    /**
     * Returns the dCM.Position that corresponds to x,y pixels from the viewport's top left
     */
    positionFromXY: function(x,y){

        var centerX = this.center.getX(this.zoom);
        var centerY = this.center.getY(this.zoom);

        var fixedPos = new dCM.Position(0,0);

        var fpOfsX = (x -  (this.width / 2));
        var fpOfsY = (y -  (this.height / 2))

        fixedPos.setXY(centerX + fpOfsX, centerY - fpOfsY, this.zoom);

        return fixedPos;
    },
    
    /**
     * Returns an array of positions describing the visible area of the map. 
     */
    getVisibleRect: function(){
        var topLeft = new dCM.Position(0,0);

        var x = this.center.getX(this.zoom) - (this.width / 2);
        var y = this.center.getY(this.zoom) - (this.height / 2);
        
        topLeft.setXY(x, y, this.zoom);

        var topRight = new dCM.Position(0,0);

        var x = this.center.getX(this.zoom) + (this.width / 2);
        var y = this.center.getY(this.zoom) - (this.height / 2);
        
        topRight.setXY(x, y, this.zoom);
        
        var btmLeft = new dCM.Position(0,0);

        var x = this.center.getX(this.zoom) - (this.width / 2);
        var y = this.center.getY(this.zoom) + (this.height / 2);

        btmLeft.setXY(x, y, this.zoom);

        var btmRight = new dCM.Position(0,0);

        var x = this.center.getX(this.zoom) + (this.width / 2);
        var y = this.center.getY(this.zoom) + (this.height / 2);
        
        btmRight.setXY(x, y, this.zoom);
        
        return [   btmLeft, btmRight, topRight,topLeft ];
    },

    /**
     * Adds a dCM.MapControl object dynamically to the map
     * @param control (dCM.MapControl)
     */
    addControl: function(control, skipDraw){
        control.setOwner(this);
        this.controls.push(control);
        if (!skipDraw) this.drawControls();
    },

    /**
     * @private
     * Redraws the map controls if needed
     */
    drawControls: function(){
        for (var i = 0; i < this.controls.length; i++){            
            this.controls[i].setZ(this.options.controlZ);
            this.controls[i].render(this.containerElement);
        }
    },

    setTileSize: function(size){
        //constant, oh, so constant.
        dCM.Constants.TILE_SIZE = size;
    },

    suspendResizing: function(){
        this._wasResizeable = this.options.resizeable;
        this.options.resizeable = false;
    },

    resumeResizing: function(){
        if (typeof this._wasResizeable === 'undefined') return;
        this.options.resizeable = this._wasResizeable;
    },

    isResizeable: function(){
        return this.options.resizeable;
    },

    toJSON: function(){
        var mapJson = {
            center: this.center,
            zoom: this.zoom/*,
            /*options: this.options,
            layers: this.layers,
            controls: this.controls*/
        }      
       
        return JSON.stringify(mapJson);
    }

}

/**
 *  @class
 *  A MapLayer represents a tile set that can be displayed on the map.
 *  Tiles are addressed by their North, East and Zoom parameters.
 *  Map layers can be customized by setting a specific tile store to get the
 *  tiles from (a street view tile, a satellite tile, whatever you come up with)
 *
 *  There is no limit, other than performance, to the number of layers that can be
 *  added to a map.
 *
 *  @description A tile set that can be displayed on the map
 *
 *  @constructor
 *  @param {object} options
 *  Each layer is initilized with a set of options.
 *
 *  options:
 *  <pre>
 *  {
 *      tileStore : the tile store that will provide tiles for this layer. defaults to street.
 *      name: the layer's name
 *      visible: visibility attribute for the layer
 *  }
 *  </pre>
 *
 *  @see dCM.MapOverlay
 */
dCM.MapLayer = function MapLayer(options){
    
    this.options = {
        canvas: null,
        owner: null,
        name: 'Unnamed Layer',
        visible: true,
        tileStore: new dCM.StreetTileStore()
    }
    this.options = dCM.Utilities.extendObject(this.options, options);    

    this.ready = false;
}

dCM.MapLayer.prototype = {

    /**
     *  @private. Completes initialization.
     *
     */
    _initialize: function(){
        if (!this.options.canvas || !this.options.owner){
            dCM.Exception.raise('MapLayer requires a canvas and an owner for instantiation.');
        }

        this.owner = this.options.owner;
        this.canvas = this.options.canvas;
        this.name = this.options.name;
        this.visible = this.options.visible;
        
        this.options.tileStore.setOwner(this.owner);
        this.options.tileStore.startPrecaching();
                
        if (this.canvas.nodeName == 'CANVAS'){                        
            this.renderer = new dCM.CanvasRenderer(this.canvas);
        } else {            
            if (dCM.Configuration.useHardwareAcceleration && deCarta.Window.hasCSSTransforms()){
                this.renderer = new dCM.CSS3Renderer(this.canvas);
            } else {            
                this.renderer = new dCM.HTMLRenderer(this.canvas);
            }            
        }

        //console.log(this.renderer);

        this.resize();

        this.tileStore = this.options.tileStore;
        this.ready = true;
    },
    
    /**
    * Renders the map.
    * Should not be called directly. Renderings are controlled by the Map object.
    * @param: (dCM.TileGrid) grid
    */
    render: function(tileGrid){
        
        if (!this.visible) return;
        
        var renderingQueue = [];
        var tileSet = {};

        var grid = tileGrid.getGrid();
        var gridTiles = grid.tiles;

        for (var x = 0; x < gridTiles.length; x++){
            
            var tile = gridTiles[x];
            
            var tileImg = this.tileStore.getTile(tile.E,tile.N,tile.Z);
            
            if (!tileSet[tileImg.name]){

                var drawEntry = {
                    img : tileImg.img,
                    x: tile.dX + (tileImg.ofsX * tile.size),
                    y: tile.dY + (tileImg.ofsY * tile.size),
                    size: tile.size * tileImg.scale
                }

                if (!(drawEntry.x >= this.width || drawEntry.y  >= this.height || drawEntry.x + drawEntry.size < 0 || drawEntry.y + drawEntry.size < 0)) {
                    renderingQueue.push(drawEntry);
                }
                tileSet[tileImg.name] = true;
            }
			
        }

        this.tileStore.purgeLoadRequests(grid.centerTile, grid.zoom, Math.max(grid.width, grid.height));

        renderingQueue.sort(function (a, b){
            return b.size - a.size;
        });

        this.renderer.render(renderingQueue);

    },

    /**
     * @private
     * Registers an owner for this layer.
     * It should be a map. 
     */
    setOwner: function(ownerOpts){
        this.options.owner = ownerOpts.owner;
        this.options.canvas = ownerOpts.canvas;
        this._initialize();
    },

    /**
	 * @private
     * Notifies the layer of a map resize.
     * Should not be called directly. This is handled by the Map object. 
     * @param width (float)
     * @param height (float)
     */
    resize: function(width, height){
                   
        this.width = width;
        this.height = height;

        this.renderer.resize(width, height);
    },

    /**
     * Sets the layer as visible.
     */
    show: function(){
        this.visible = true;
        this.renderer.show();
    },

    /**
     * Hides the layer from view. 
     */
    hide: function(){
        this.visible = false;
        this.renderer.hide();
    },

    /**
	 * @private
	 */
    toJSON: function(){
        var layerObj = {
            name: this.options.name,
            visible: this.options.visible,
            tileStore: this.options.tileStore
        };        

        return layerObj;
    }
    
}
/**
 * @class
 * MapOverlays are containers for objects that can be drawn over a map.
 * These include pins, shapes, polylines and so on.
 * You may instantiate several MapOverlays, with different names,
 * to group objects together and have the
 * ability to show or hide sets of objects with a single call.
 * MapOverlays index data internally into tiles, to speed up retreival of the
 * necessary objects for display.
 * A MapOverlay is used to create a container for a set of positioned
 * objects on a map. Objects that can be added to the overlay are:
 * <ul>
 *  <li>Pins {@link dCM.Pin}</li>
 *  <li>Polylines {@link dCM.Polyline}</li>
 *  <li>Circles {@link dCM.Circle}</li>
 *  <li>Images {@link dCM.Image}</li>
 *  <li>Polygons {@link dCM.Polygon}</li>
 * </ul>
 * <h3>Clustering</h3>
 * Pins can be set to "clustering" mode. In this mode, when pins are too close to
 * be reliably selected by the user, they will be displayed as a single pin
 * with a number overlay indicating how many pins have been merged in a group.
 * You can specify a callback function that will be invoked when the cluster is
 * clicked. The function will be passed a single parameter (array of Pin objects)
 * containing the pins that belong to the cluster. <br />
 *
 * @description Class for managing a map overlay layer of pins or other graphic features
 *
 * @constructor
 * @param {object} options The options object can contain one or more of the
 * following properties:
 * <ul>
 *  <li>name : The name that will be assigned to the layer - default name is 'Unnamed Layer'</li>
 *  <li>visible: Boolean value to set initial visibility value</li>
 *  <li>clustering: Boolean value, <em>true</em> enables pin clustering</li>
 *  <li>onClusterClick: callback function invoked when a cluster is tapped. </li>
 * </ul>
 */

dCM.MapOverlay = function(options){


    this.options = {
        canvas: null, //not documented, internal use only
        owner: null, //not documented, internal use only
        name: 'Unnamed Layer',
        visible: true,
        zIndex: 0, //not documented, internal use only
        clustering: false,
        onClusterClick: function(cluster){}
    }

    this.options = dCM.Utilities.extendObject(this.options, options);

}

/*
 * Object collection organization
 *
 * Objects in collections are organized somehow.
 * Specifically, they are organized in an objects by zoom structure
 * which has a level of keys for zoom levels, and a second level
 * of keys which reference object handles in a spatial manner.
 *
 * For example :
 *
 * this.objects = [
 *     3: [
 *         'tile key': objectHandle
 *     ]
 * ]
 *
 * Objects that span more than 1 tile will have references in all the spanned 
 * tiles. When rendering, a TileGrid will be passed in and objects in that tile
 * grid will be added to a rendering queue. 
 * After deduplication, each object's renderer will be called and the generated 
 * elements added to the overlay.
 *
 *
 */



/*
 * This has been deprecated.
 * SVG elements:
 *
 * The layer builds an svg container which is the size of the map
 * All elements, when added, are positioned at full zoom.
 *
 * The viewBox attribute is then set to the size of the map at the current zoom level
 * at every zoom. This should make the browser do all the clipping
 * and scaling - generally speaking, all the real work.
 *
 * We'll see if this works.
 *
 * so basically
 *
 * <svg width="WIDTHOFMAPpx" height="HEIGHTOF MAPpx" version="1.1" viewBox="top left width height" at top zoom>
 *
 * IT WORKS.
 * This has been deprecated.
 */
dCM.MapOverlay.prototype = {

    /**
     * @private
     * Initialization function called when an owner is registered
     */
    _initialize: function(){

        if (!this.options.canvas || !this.options.owner){
            dCM.Exception.raise('MapOverlay requires a canvas and an owner for instantiation.');
        }
        this.owner = this.options.owner;
        this.canvas = this.options.canvas;
        this.name = this.options.name;

        //main object set
        this.objects = {};

        //object collections
        this.pins = [];
        this.shapes = [];
        this.images = [];
        this.videos = [];
        this.sounds = [];
        this.clusters = [];

        //on screen stuff
        this.visiblePins = {};
        this.visibleShapes = {};
        
        this.visible = this.options.visible;

        this.domElement = deCarta.crEl('div');
        this.domElement.id = 'deCarta-Mob-Ovl-' + Math.floor(Math.random() * 10000);
        this.domElement.style.position = 'absolute';
        this.domElement.style.top = 0;
        this.domElement.style.left = 0;

        this.canvas.appendChild(this.domElement);

        this.width = this.owner.width;
        this.height = this.owner.height;

        this.baseHandle = 0;

        this.lastFullZoom = this.currentZoom = this.owner.zoom;

        //this.updateSvg();

        dCM.EventManager.listen('zoomEnd', this._setZoom.bind(this));
        dCM.EventManager.listen('zoomChange', this._setZoom.bind(this));
        dCM.EventManager.listen('zoomStart', this._setZoom.bind(this));
        //dCM.EventManager.listen('move', this.updateSvg.bind(this));
    },

    /**
     * Adds an {@link dCM.OverlayObject} to the MapOverlay.
	 * Currently supported OverlayObjects are:
	 * {@link dCM.Pin}, {@link dCM.Polyline}, 
	 * {@link dCM.Circle}, and {@link dCM.Image}.
	 *
     * @param object: the {@link dCM.OverlayObject} to add
     * @return object handle
     */
    addObject: function(object){
        
        var type = object.type;

        object.setZIndex(dCM.Configuration.baseOvlZ + this.options.zIndex);

        var handle = this._genHandle();
        object.handle = handle;
        this.objects[handle] = object;

        switch (type.toLowerCase()){            
            case 'pin':            
                this.indexObject(this.pins, object, handle);
            break;
            case 'image':
            case 'shape':
                this.shapes.push(object);
            break;
            default:
                throw('Adding ' + type + ' to overlay is not yet supported. Also depending on what "' + type + '" is, it might never be');
            break;
        }
        object.registerOwner(this);
        return handle;
    },

    /**
     * @private
     * Adds an object to the spatial index for this overlay.
     * @param index : the index we weant the object in
     * @param object: the object we are adding
     * @param handle: handle to the object.
     */
    indexObject: function(index, object, handle){        

        var nZ = dCM.Utilities.normalizeZoom( this.currentZoom );

        if (!index[nZ]){
            index[nZ] = {};
        }

        if (this.options.clustering){            
            //check if this fits in a cluster
            //console.log('Clustering object :', object);
            //oh, wow ... Making special special STRONG codes.
            var added = false;
            for (var j = 0; j < this.clusters.length; j ++){
                if (this.clusters[j].addPin(object)){
                    added = true;
                    //console.log('Added to cluster : ', j, this.clusters[j]);
                    break;
                }
            }
            if (!added){
                var cluster = new dCM.ClusteredPin({
                    onClick: this.options.onClusterClick,
                    zoom: dCM.Utilities.normalizeZoom(this.currentZoom)
                });
                cluster.addPin(object);
                this.clusters.push(cluster);
                    
                var tile = cluster.getPosition().getTileAtZoom(nZ);
                var key = dCM.Utilities.getTileKey(tile.E, tile.N, this.currentZoom);
                if (!index[nZ][key]) index[nZ][key] = [];
                
                var handle = this._genHandle();
                cluster.handle = handle;
                this.objects[handle] = cluster;

                index[nZ][key].push(handle);

                // register as the pins owner so it can notify us of any useful
                // thing that happens to it.
                //console.log('Created cluster');
                cluster.registerOwner(this);                
            }

        } else {
        
            var tile = object.getPosition().getTileAtZoom(nZ);

            var key = dCM.Utilities.getTileKey(tile.E, tile.N, this.currentZoom);
            if (!index[nZ][key]) index[nZ][key] = [];
            index[nZ][key].push(handle);

            // register as the pins owner so it can notify us of any useful
            // thing that happens to it.
            object.registerOwner(this);
        }
    },

    /**
     * @private
     * Private method used to rebuild the spatial index when zoom levels change.
     *
     */
    refreshObjects: function(){
        /*
         * Very crude. Completely rebuilds the indexes - called when a position changes.
         * Considering the main bottleneck here is the rendering of the pins
         * this is not the end of the world, but it would be better to change it
         * into something *smart*.
         */
        this._deleteClusters(); //reset the clusters
        this.pins = [];
        for (var handle in this.objects){
            var object = this.objects[handle];
            if (object.type == 'pin')
                this.indexObject(this.pins, object, handle);
        }
    },

    /**
     * @private
     * Removes an object by handle
     * @param objectHandle Handle to the object.
     * <b>Not currently implemented</b>
     */
    removeObjectHandle: function(objectHandle){
        if (this.objects[objectHandle]) delete this.objects[objectHandle];
    },

    /**
     * Removes an object.
	 * @param {object} object An OverlayObject object to remove from the MapOverlay
	 * @param {bool} dontRefresh Set to <em>true</em> to prevent refresh
     */
    removeObject: function(object, dontRefresh){
        //console.log('Remove object of type : ' + object.type, ' Handle: ' + object.handle);
        this.removeObjectHandle(object.handle);
        try {
            if (!dontRefresh){                
                this.refreshObjects();
            }
        } catch (e) {

        }
    },

    /**
     * Set this MapOverlay as visible
     */
    show: function(){
        this.visible = true;
        this.domElement.style.display = 'block';
    },

    /**
     * Set this MapOverlay as hidden
     */
    hide: function(){
        this.visible = false;
        this.domElement.style.display = 'none';
    },

    /**
	 * @private
     * Iterates through elements and figures out which need rendering
     * This should not be called directly, rendering of the overlay objects is 
	 * handled by the map object.
     * @param {dCM.TileGrid} tileGrid The current tile grid that requires rendering
     */
    render: function(tileGrid){
        
        //if (this.currentZoom != dCM.Utilities.normalizeZoom(this.currentZoom)) return;

        if (!this.visible) return;                      

        var grid = tileGrid.getGrid();
        var tiles = grid.tiles;

        var gridX = grid.position.getX(this.currentZoom);
        var gridY = grid.position.getY(this.currentZoom);

        var screenX = gridX - grid.x;
        var screenY = gridY + grid.y;

        //var restore = dCM.Utilities.removeElementToReinsert(this.domElement);

        //this.domElement.innerHTML = null;

        this.renderShapes(screenX, screenY, tiles);        
        this.renderPins(screenX, screenY, tiles); 

        //restore();

    },

    /**
     * @private
     * Renders the various shapes (polylines)
     * shapes are also keyed by tile
     * */
    renderShapes: function(screenX, screenY, tiles){
        //ignore key for now, render all shapes.
        var keepList = {};
        for (var i = 0; i < this.shapes.length; i++){
            try {
                var obj = this.shapes[i];

                var pos = obj.getPosition();

                var x = pos.getX(this.currentZoom) - screenX;
                var y = screenY - pos.getY(this.currentZoom);

                var elem = this.shapes[i].render(x, y, this.currentZoom, tiles);
                if (elem) {
                    if (!elem.parentNode){
                        this.visibleShapes[elem.id] = elem;
                        keepList[elem.id] = true;
                        this.domElement.appendChild(elem);
                    } else {
                        keepList[elem.id] = true;
                    }
                }
            }catch(e) {
                console.log("Error rendering shape : ", obj, e);
            }
        }

        //remove old shapes
        for (var shapeId in this.visibleShapes){
            if (!keepList[shapeId]) {
                var shape = this.visibleShapes[shapeId];
                shape.parentNode.removeChild(shape);
                this.visibleShapes[shapeId] = null
                delete this.visibleShapes[shapeId];
            }
        }

    },

    /**
	 * @private
	 */
    renderPins: function(screenX, screenY, tiles){
        var keepList = {};
        var renderList = [];

        for (var i = 0; i < tiles.length; i ++){
            var key = dCM.Utilities.getTileKey(tiles[i].E, tiles[i].N, tiles[i].Z);
            renderList = renderList.concat(this.renderTilePins(key, screenX, screenY));
        }


        /* Sort the pins by y, then x*/
        renderList.sort(function(a, b){
            return (parseFloat(a.style.top) - parseFloat(b.style.top));
        });       

        for (i = 0; i < renderList.length; i++){
            if (!renderList[i].parentNode){
                this.visiblePins[renderList[i].id] = renderList[i];
                keepList[renderList[i].id] = true;
                this.domElement.appendChild(renderList[i]);
            } else {
                keepList[renderList[i].id] = true;
            }
        }

        //remove unused
        for (var pinId in this.visiblePins){
            if (!keepList[pinId]) {
                var pin = this.visiblePins[pinId];
                pin.parentNode.removeChild(pin);
                this.visiblePins[pinId] = null
                delete this.visiblePins[pinId];
            }
        }

    },

    /**
     * @private
     * renders all pins that fit on the tile
     */
    renderTilePins: function(key, screenX, screenY){        
        var count = 0;
        var normalizedZoom = dCM.Utilities.normalizeZoom(this.currentZoom);
        var appendList = [];
        var i = 0;
        
        if (this.pins[normalizedZoom]){
            if (this.pins[normalizedZoom][key]){
                for (i = 0; i < this.pins[normalizedZoom][key].length; i++){
                    
                    var elemKey = this.pins[normalizedZoom][key][i];
                    var obj = this.objects[elemKey];

                    var pos = obj.getPosition();

                    var x = pos.getX(this.currentZoom) - screenX;
                    var y = screenY - pos.getY(this.currentZoom);

                    var size = obj.getSize();
                   
                    if (x > this.owner.width || y > this.owner.height || x + size.width < 0 || y + size.height < 0) {
                      //  console.log('Pin draw skipped, out of bounds');
                    } else {
                        
                        var elem = obj.render(x, y);                        
                        appendList.push(elem);
                        count ++;
                    }
                    
                }
            }
        }


        return appendList;
    },

    /**
	 * @private
     * Recalculates layer positions and renderings on resize
     * Not to be called directly, the Map object handles this. 
     */
    resize: function(width, height){

        this.width = width;
        this.height = height;

        this.domElement.style.width = width + 'px';
        this.domElement.style.height = height + 'px';
    },

    /**
	 * @private
     * Called by the Map object when the overlay is added to it, so final
     * properties can be set and initialization completed. 
     *
     */
    setOwner: function(ownerOpts){
        this.options.owner = ownerOpts.owner;
        this.options.canvas = ownerOpts.canvas;
        this._initialize();
    },

    /**
     * Clears all OverlayObjects from this MapOverlay
     */
    clear: function(){
        this._clear();
    },

    /**
     * @private 
     * clears the whole layer carefully removing all objects and reclaiming memory
     */
    _clear: function(){
        this.objects = {};
        this.pins = [];
        this.shapes = [];
        this.images = [];
        this.videos = [];
        this.sounds = [];
        this.clusters = [];
    },

    /**
     * @private
     * Generates a unique handle for an object.
     *
     */
    _genHandle: function(){
        return 'dcO_' + this.name.replace(' ', '_') + '_' + (this.baseHandle ++).toString(16);
    },

    _deleteClusters: function(){

        //console.log('Deleting the clusters');

        for (var i = 0; i < this.clusters.length; i++){
            this.objects[this.clusters[i].handle] = null;
            delete this.objects[this.clusters[i].handle];
        }
        this.clusters = [];
    },

    /**
     * @private
     * Changes zoom levels, and switches indexes if necessary. 
     */
    _setZoom: function(ev){        
        if (ev.map != this.owner) return;
        this.currentZoom  = ev.zoom ;
        var nZ = dCM.Utilities.normalizeZoom( ev.zoom );
        
        
        if (this.lastFullZoom != nZ){

            //
            // Changing here to use refreshObjects instead of migrate since they do more or less the same thing
            // Also this is more practical for clustering
        
            this.refreshObjects();
            this.lastFullZoom = nZ;
        }


        for (var i = 0; i < this.shapes.length; i++){
            this.shapes[i].setZoom(ev.zoom);
        }        

    },

    /**
	 * @private
	 */
    toJSON: function(){
        var ovlObj = {};

        return ovlObj;
    }

}
/**
 * @class
 * The MapBoundary class defines an absolute boundary for the map {@link dCM.Map}.
 * As the user scrolls around the map, the map will not display tiles that
 * lie outside of this defined boundary.
 * The boundary is defined as a polygon, with the vertices set as an array of
 * {@link dCM.Position} objects.
 *
 * @description Object for defining the geographic boundary of the map.
 *
 * @see dCM.Map
 */

dCM.MapBoundary = function(){
    
    this.edges = [];
    

    this.Edge = function(a, b){

        this.lat = a;
        this.lon = b;

        this.scale = .000000011703344634137276992194;

        this.pos2point = function (pos){
            return {x: dCM.Utilities.lon2pix(pos.getLon(), this.scale), y: dCM.Utilities.lat2pix(pos.getLat(), this.scale)};
        }

        this.a = this.pos2point(a);
        this.b = this.pos2point(b);

        /* Checks if the ray from P to RIGHT INFINITY OF THE INFINITE insterscts. */
        this.rayIntersect = function(p){
            var p = this.pos2point(p);
            var a = this.a;
            var b = this.b;
            
            //http://www.youtube.com/watch?v=eB5VXJXxnNU SCIENCE!
            var FAKE_INFINITY = 999999999999109999999899999910; 

            if(a.y > b.y){
                a = this.b;
                b = this.a;
            }

            //avoid POINT ON VERTEX, move it up just a bit
            if (p.y == a.y || p.y == b.y) p.y += 0.0000001;

            if (p.y < a.y || p.y > b.y) return 0;

            if (p.x > Math.max(a.x, b.x)) return 0;

            if (p.x < Math.min(a.x, b.x)) return 1;

            if (a.x != b.x){
                var a1 = (b.y - a.y) / (b.x - a.x);
            } else {
                var a1 = FAKE_INFINITY;
            }

            if (a.x != p.x){
                var a2 = (p.y - a.y) / (p.x - a.x)
            } else {
                var a2 = FAKE_INFINITY;
            }

            return (a2 >= a1) ? 1 : 0;
        };
        
        this.pointDistance = function(p){
            
            var p = this.pos2point(p);
            
            var x0 = this.a.x;
            var y0 = this.a.y;
            var x1 = this.b.x;
            var y1 = this.b.y;
            var x = p.x;
            var y = p.y;

            //http://softsurfer.com/Archive/algorithm_0102/algorithm_0102.htm#Distance to 2-Point Line
            var d = Math.abs((((y0 - y1 ) * x) + ((x1 - x0) * y)  + ((x0 * y1) - (x1 * y0))) /
                        Math.sqrt(Math.pow(x1 - x0, 2) + Math.pow(y1 - y0, 2)));

            var slope = (y1 - y0) / (x1 - x0);

            //lame slope fix :
            if (slope > 99999999999999999999999999) slope = 99999999999999999999999999;
            if (slope == 0) slope = .000000000000000001;

            var orthoSlope = - ( 1 / slope);

            var b = (y1 - slope * x1);
            var c = y - (orthoSlope * x);

            var ix = (c - b) / (slope - orthoSlope) ;
            var iy = (orthoSlope * ix) + c;

            //is it within?

            var ly = Math.min(y0, y1);
            var hy = Math.max(y0, y1);
            var lx = Math.min(x0, x1);
            var hx = Math.max(x0, x1);

           // debugger;

            if ( ly <= iy && iy <= hy && lx <= ix && ix <= hx) {
               // console.log('Inside');
                //very well. 
            } else {                
                //find the nearest end of the segment, use it
                var p0d = Math.sqrt(Math.pow(x - x0, 2) + Math.pow(y - y0, 2));
                var p1d = Math.sqrt(Math.pow(x - x1, 2) + Math.pow(y - y1, 2));
                
                if (p0d < p1d){
                    d = p0d;
                    iy = y0;
                    ix = x0;
                } else {
                    d = p1d;
                    iy = y1;
                    ix = x1;
                }
            }

            var ipos = new dCM.Position(dCM.Utilities.pix2lat(iy, this.scale), dCM.Utilities.pix2lon(ix, this.scale));
            
            return {distance : d, position: ipos};
        };
        

    }

}

dCM.MapBoundary.prototype = {

    /**
	 * Sets this MapBoundary's boundaries from a {@link dCM.Polygon}
	 * @param {dCM.Polygon} poly The polygon to use for the Map Boundary
	 */
    fromPoly: function(poly){
        this.setPositions(poly.options.vertices);
    },

    /**
	 * Sets the MapBoundary's boundaries to a polygon defined by an array
	 * of {@link dCM.Position} objects
	 * @param {array} positions An array of {@link dCM.Position} objects
	 */
    setPositions: function(positions){
        this.edges = [];

        //might as well check
        if (positions.length < 3)
            throw ('I believe you need at least 3 vertices to define a polygon, and a MapBoundary happens to be a polygon.');

        for (var i = 0; i < positions.length; i ++){
            if (positions[i+1]){
                this.edges.push(new this.Edge(positions[i], positions[i+1]));
            } else {
                this.edges.push(new this.Edge(positions[i], positions[0])); //loop around loop around
            }
        }
    },

    /**
	 * @private
	 * Checks a position to see if it is inside the MapBoundary.
	 */
    checkPosition: function(position){

        var sum = 0;

        for (var i = 0; i < this.edges.length; i++){
            var edge = this.edges[i];
            sum += edge.rayIntersect(position);
        }

        return (sum % 2 == 1);
    },

    /**
	 * @private
	 */
    getClosestPosition: function(position){
        //get closest edge
        var minDist = parseFloat('Infinity');
        var p = null;
        
        for (var i = 0; i < this.edges.length; i++){
            //console.log('********************************************************');
            var edge = this.edges[i];
            //console.log('Checking edge ' + i + ' => '+edge.lat + ' , ' + edge.lon);
           // console.log('Point : ' +  position.lat + ',' + position.lon);

            var res = this.edges[i].pointDistance(position);
            //console.log('Result : ' + res.position.lat + ' , ' + res.position.lon);
            if (res.distance < minDist){
                minDist = res.distance;
                p = res.position;
            }
        }

        return p;
    }

}
/*
TESTING!!!!!
*/
/*
var mb = new deCarta.MapBoundary();


var p1 = new Position(19, -51);
var p2 = new Position(21, -51);
var p3 = new Position(21, -49);
var p4 = new Position(19, -49);

mb.setPositions([p1,p2,p3,p4]);
var tp = new Position(18, -50);

console.log(mb.checkPosition(tp));
var cp = mb.getClosestPosition(tp);

console.log(cp);
*/

/*
var tp = new Position(37, -115);

console.log(mb.checkPosition(tp));


var p1 = new Position(37, -122);
var p2 = new Position(39, -112);
var p3 = new Position(35, -112);
var p4 = new Position(36, -115);
var p5 = new Position(35, -117);

mb.setPositions([p1,p2,p3,p4,p5]);

*/
/*
var mb = new deCarta.MapBoundary();


var p1 = new Position(20, -51);
var p2 = new Position(21, -50);
var p3 = new Position(20, -49);
var p4 = new Position(19, -50);

mb.setPositions([p1,p2,p3,p4]);
var tp = new Position(19, -51);

console.log(mb.checkPosition(tp));
var cp = mb.getClosestPosition(tp);

console.log('FINAL', cp);
*/
/**
 * @private
 * The TileGrid class calculates the required tiles to cover an area of the map
 * given the center (a Position) the zoom level (float) and using the current
 * width and height of the map. 
 * The tiles are arranged in an array, ordered by the distance of each tile
 * from the center. 
 * The grid object is used by the Map and passed along to the Layers and Overlays
 * when a rendering is required.
 *
 * @description Class for calculating required tiles
 *
 */
dCM.TileGrid = function(){

    //the array of tiles
    this.tiles = [];

    this.zoom = 0;

    //width and eight of the grid
    this.width = this.height = 0;

}


dCM.TileGrid.prototype = {

    /**
     * Prepare a tile grid from the current width, height and the provided zoom and centerpoint.
     * @param {dCM.Position}center  the position around which we want to center the map
     * @param {float} zoom the current zoom level
     */
    prepare: function (center, zoom){

        this.zoom = zoom;

        var width = this.width;
        var height= this.height;        

        var centerX = center.getX(zoom);
        var centerY = center.getY(zoom);

        //how big are the tiles at this zoom level
        var tileSize = dCM.Utilities.tileSizeForZoom(zoom);

        //N and E of center tile on this grid
        var cE = Math.floor(centerX / tileSize);
        var cN = Math.floor(centerY / tileSize);        

        this.centerTile = {
            E: cE,
            N: cN,
            Z: zoom,
            lat: center.getLat(),
            lon: center.getLon()
        }

        //offset of center in tile
        var ofsX = centerX % tileSize;
        var ofsY = centerY % tileSize;        

        this.xTiles = Math.floor((width + (2 * tileSize)) / tileSize);
        this.yTiles = Math.floor((height + (2 * tileSize)) / tileSize);

        var centerTileGridX = Math.ceil(((width / 2) - ofsX - tileSize) / tileSize);
        var centerTileGridY = Math.ceil(((height / 2) + ofsY- tileSize) / tileSize);

        this.gridX = ((width / 2) - ofsX - tileSize) - (tileSize * centerTileGridX);
        this.gridY = ((height / 2) + ofsY- tileSize) - (tileSize * centerTileGridY);

        this.tiles = [];

        for (var x = 0; x < this.xTiles; x++){
            for (var y = 0; y < this.yTiles; y++){
                
                var tile = {}

                tile.size = tileSize;

                tile.E = cE - (centerTileGridX - x);
                tile.N = cN + (centerTileGridY - y);                
                tile.Z = zoom;

                //this is a hack. Why do i need it? if only i could figure it out. 
                if (cN < 0) tile.N += 1;
                if (cE >= 0) tile.E -= 1;

                tile.dX = this.gridX + (tileSize * x);
                tile.dY = this.gridY + (tileSize * y);

                if (y == 0 && x == 0){
                    //get the position for top left corner of grid
                    this.gridPosition = dCM.Utilities.getTilePosition(tile.E, tile.N, tile.Z);
                }


                this.tiles.push(tile);
            }
        }

        //sort tiles by distance from ctr
        this.tiles.sort(function(a, b){
            var distAfromCtr = Math.sqrt(Math.pow(a.E - cE, 2)  + Math.pow(a.N - cN, 2));
            var distBfromCtr = Math.sqrt(Math.pow(b.E - cE, 2)  + Math.pow(b.N - cN, 2));

            return distAfromCtr - distBfromCtr;
        });

        return;
    },
    
    /**
     * Get all tiles in the grid as an array 
     * @return {object} The files are returned in an object with the
	 * following structure:
	 * <pre>
     * {
     *      <b>tiles</b>: array of tiles
     *      <b>x</b>: x offset of the grid from the top left corner of the map
     *      <b>y</b>: y offest of the grid from the top left corner of the map
     *      <b>position</b>: the grids position
     *      <b>centerTile</b>: the tile on which the center is located
     *      <b>zoom</b>: current zoom
     *      <b>width</b>: width of the grid (in # of tiles)
     *      <b>height</b>: height of the grid. 
     * }</pre>
     */
    getGrid: function(){
        return {
            tiles: this.tiles,
            x: this.gridX,
            y: this.gridY,
            position: this.gridPosition,
            centerTile: this.centerTile,
            zoom: this.zoom,
            width: this.xTiles,
            height: this.yTiles
            };
    },

    /**
	 * @private
     * Called by the map when it is resized.
     * This should not be used directly. 
     * @param {float} width new width
     * @param {float} height new height
     */
    resize: function(width, height){
        this.width = width;
        this.height = height;
    }

}
/**
 * @class
 * The EventManager is a global object which is used to receive / issue
 * notifications regarding the status of the map.
 *
 * Events that are currently supported are : <br />
 * <ul>
 *      <li>'zoomChange'</li>
 *      <li>'zoomEnd'</li>
 *      <li>'moveStart'</li>
 *      <li>'move'</li>
 *      <li>'moveEnd'</li>
 *      <li>'doubleClick'</li>
 *      <li>'resize'</li>
 *      <li>'showPinText'</li>
 *      <li>'hidePinText'</li>
 *      <li>'tileLoad'</li>
 *      <li>'longTouch'</li>
 *      <li>'doubleTap'</li>
 * </ul>
 *
 * @description Implements Listen and Trigger methods for event notification.
 */
 
 //TODO : Add triggers to map for the new touch events. Document parameters that events receive from EventManager. 
dCM.EventManager = {

    /**
     * List of supported events
     */
    events: {
        'zoomstart': [],  //No event generated
        'zoomchange': [],
        'zoomend': [],
        'movestart': [],
        'move': [],
        'moveend': [],
        'click': [],  //No event generated
        'doubleclick': [],
        'rightclick': [],
        'resize': [],
        'showpintext': [],
        'hidepintext': [],
        'tileload': [],
        'longtouch': []        
    },
    
    eventNames: {
        'zoomstart': 'zoomstart',
        'zoomchange' : 'zoomchange',
        'zoomend': 'zoomend',
        'movestart': 'movestart',
        'move': 'move',
        'moveend': 'moveend',
        'click': 'click',
        'tap': 'click',
        'press': 'click',
        'doubleclick': 'doubleclick',
        'doubletap': 'doubleclick',
        'doublepress': 'doubleclick',
        'rightclick': 'rightclick',
        'alttap': 'rightclick',
        'rightpress': 'rightclick',
        'resize': 'resize',
        'showpintext': 'showpintext',
        'hidepintext': 'hidepintext',
        'tileload': 'tileload',
        'longtouch': 'longtouch',
        'longclick': 'longtouch',
        'longpress': 'longtouch'
    },

    /**
     * Registers a callback function with a specific event.
     * @param {string} event: the event you wish to listen for.
     * @param {function} callback: callback function that will be invoked when the event occurs
	 * When defining the callback function, the callback function takes a single parameter, the
	 * contents of which depends on the event being triggered. Here is a list of each
	 * type of event, and the data structure passed to the callback function for each:
	 *
     * <strong>zoomchange, zoomend</strong>
	 * <ul>
	 *   <li>{@link dCM.Map} map: A pointer to the map</li>
	 *   <li>(int) zoom: The starting zoom level</li>
	 *   <li>(int) targetZoom: The new zoom level</li>
	 * </ul>
     * <strong>movestart, move, moveend</strong>
	 * <ul>
	 *   <li>{@link dCM.Position} center: Geographic position at the center of the map at the start, during, or after a move operation (respectively)</li>
	 *   <li>(int) zoom: The current zoom level of the map</li>
	 *   <li>{@link dCM.Map} map: A pointer to the map</li>
	 * </ul>
     * <strong>resize</strong>
	 * <ul>
	 *   <li>{@link dCM.Map} map: A pointer to the map</li>
	 *   <li>(int) zoom: The current zoom level of the map</li>
	 *   <li>{@link dCM.Position} center: Geographic position at the center of the map</li>
	 *   <li>size:
	 *      <ul>
	 *         <li>(int) width: The new width of the map window after a resize
	 *              operation, in pixels</li>
	 *         <li>(int) height: The new height of the map window after a resize
	 *              operation, in pixels</li>
	 *      </ul>
	 *   </li>
	 * </ul>
     * <strong>showpintext, hidepintext</strong>
	 * <ul>
	 *   <li>{dCM.Pin} pin: A pointer to the pin object which is being shown or hidden</li>
	 * </ul>
     * <strong>longtouch</strong>
	 * <ul>
	 *   <li>{@link dCM.Position} position: Geographic position on which the user long-touched. This value, in turn, is comprised of:
	 *     <ul>
	 *       <li>(int) x: Latitude</li>
	 *       <li>(int) y: Longitude</li>
	 *     </ul>
	 *   </li>
	 *   <li>{@link dCM.Position} center: Geographic position at the center of the map</li>
	 *   <li>(int) zoom: The current zoom level of the map</li>
	 *   <li>{@link dCM.Map} map: A pointer to the map</li>
	 * </ul>
     * <strong>doubletap, doubleclick</strong>
	 * <ul>
	 *   <li>{@link dCM.Position} position: Geographic position on which the user clicked/tapped</li>
	 *   <li>{@link dCM.Position} center: Geographic position at the center of the map</li>
	 *   <li>(int) zoom: The current zoom level of the map after the doubletap has zoomed the map in</li>
	 *   <li>{@link dCM.Map} map: A pointer to the map</li>
	 * </ul>
     *
     * @throw Unsupported event exception.
     */
    listen: function(event, callback){
        //de-alias        
        event = this.eventNames[event.toLowerCase()];
                
        event = event.toLowerCase();
        if (this.events[event]){
            for (var i = 0; i < this.events[event].length; i++){
                if (this.events[event][i] == null){
                    this.events[event][i] = callback;
                    return i;
                }
            }
            this.events[event].push(callback);
            return this.events[event].length - 1;
        } else {
            throw('Event ' + event + ' is not supported');
        }
    },

    /**
     * Triggers an event, executing all callbacks registered for it
     * @param {string} event: the event you wish to trigger.
     * @param {object} params: an object which will be passed to the registered
     * callback with event parameters.
     * @throw Unsupported event exception
     */
    trigger: function(event, params){
        //event = event.toLowerCase();
        event = this.eventNames[event.toLowerCase()];
        params.eventType = event;
        if (!this.events[event]){
            throw('You are trying to trigger the event "' + event + '", but it does not exist.');
        }
        for (var i = 0; i < this.events[event].length; i ++){
            if (this.events[event][i]) this.events[event][i](params);
        }
    },
    
    stopListeningByIdx: function(event, i){
        this.events[event][i] = null;
    },
    
    stopListening: function(event, callback){
        for (var i = 0; i < this.events[event].length; i++){
            if (this.events[event][i] == callback) {
                this.events[event][i] = null;
                return;
            }
        }
    }

};
/**
 * @private
 * A collection of static functions used throughout the api for unit conversions
 * url parsing and DOM manipulations.
 *
 * @description Utility Functions
 */
dCM.Utilities = {

    /**
     * Returns true if the object passed as param is an array
	 * @return {bool}
     */
    isArray: function (array){
        return Object.prototype.toString.call(array) === '[object Array]';
    },
	
    /**
     * Returns an object wrapped in an array if it is not an array already
     **/
    makeArrayFix: function (obj){
        return dCM.Utilities.isArray(obj) ? obj : [obj];
    },

    /**
	 * @private
     * Given a latitude and a zoom level, returns a pixel value
     * Starting from top left of the world. 
     **/
    lat2pix: function (lat, zoom){
        var f = dCM.Utilities['lat2pix_' + dCM.Configuration.projection];
        if (!f) {            
            throw('Bad projection in the config! This is extremely bad.');
        }
        return f(lat, zoom);
    },
    
    lat2pix_EPSG3395: function(lat, zoom){
        
        var radPerPix = 2*Math.PI / (dCM.Utilities.tileSizeForZoom(zoom) * Math.pow(2, Math.floor(zoom)));

        var radLat = (parseFloat(lat) * (2 * Math.PI))/360;

        var ecc = 0.08181919084262157;

        var sinPhi = Math.sin(radLat);
        
        var eSinPhi = ecc * sinPhi;
        
        var retVal = Math.log(((1.0 + sinPhi) / (1.0 - sinPhi)) *
            Math.pow((1.0 - eSinPhi) / (1.0 + eSinPhi), ecc)) / 2.0;
        
        return (retVal / radPerPix);
        
    },
    
    lat2pix_EPSG3857 : function(lat, zoom){
        return dCM.Utilities.forwardMercator(lat, 0, zoom).y;
    },
    
    lat2pix_Spherical: function(lat,zoom)  { 
        return dCM.Utilities.forwardMercator(lat, 0, zoom).y;
    },
    
    forwardMercator: function(lat, lon, zoom) {       
        var wSize = (dCM.Utilities.tileSizeForZoom(zoom) * Math.pow(2, Math.floor(zoom - 1))); 
         
        var x = lon * wSize / 180;
        var y = Math.log(Math.tan((90 + lat) * Math.PI / 360)) / (Math.PI / 180);

        y = y * wSize / 180;                       
        
        return {x: x, y:y};
    },
    
    inverseMercator: function(x, y, zoom) {

        var wSize = (dCM.Utilities.tileSizeForZoom(zoom) * Math.pow(2, Math.floor(zoom - 1)));

        var lon = (x / wSize) * 180;
        var lat = (y / wSize) * 180;

        lat = 180/Math.PI * (2 * Math.atan(Math.exp(lat * Math.PI / 180)) - Math.PI / 2);
        
        return new dCM.Position(lat, lon);
    },

    /**
     * Given a longitude and a zoom level, returns a pixel value
     * Starting from top left of the world.
     **/
    lon2pix: function (lon, zoom){

        var radPerPix = 2 * Math.PI / (dCM.Utilities.tileSizeForZoom(zoom) * Math.pow(2, Math.floor(zoom)));
        return ((lon / 180) * Math.PI) / radPerPix;
    },
    
    /*lon2pixOL: function(lon,zoom) { 
        return (lon+180)/360*Math.pow(2,zoom) * (dCM.Utilities.tileSizeForZoom(zoom) * Math.pow(2, Math.floor(zoom))); 
    }, */    
    
    /**
     * Given a pixel value and a zoom level, returns the longitude
     */
    pix2lon: function (x, zoom) {
        var radPerPix = 2 * Math.PI / (dCM.Utilities.tileSizeForZoom(zoom) * Math.pow(2, Math.floor(zoom)));
        return ((x * radPerPix) * 180 / Math.PI );
    },

    /**
     * Given a pixel value and a zoom level, returns the latitude
     */
    pix2lat: function (y, zoom) {
        var f = dCM.Utilities['pix2lat_' + dCM.Configuration.projection];
        if (!f) {            
            throw('Bad projection in the config! This is extremely bad.');
        }
        return f(y, zoom);        
    },
    
    pix2lat_EPSG3395 : function(y, zoom){        
        
        var radPerPix = 2*Math.PI / (dCM.Utilities.tileSizeForZoom(zoom) * Math.pow(2, Math.floor(zoom)));

        var phiEpsilon = 1E-7;
        var phiMaxIter = 12;
        var t = Math.pow(Math.E, -y * radPerPix);
        var prevPhi = dCM.Utilities.mercatorUnproject(t);
        var newPhi = dCM.Utilities.findRadPhi(prevPhi, t);
        var iterCount = 0;
        while ( iterCount < phiMaxIter &&
            Math.abs(prevPhi - newPhi) > phiEpsilon) {
            prevPhi = newPhi;
            newPhi = dCM.Utilities.findRadPhi(prevPhi, t);
            iterCount++;
        }
        return newPhi*180/Math.PI;
        
    },
    
    pix2lat_EPSG3857 : function(y, zoom){
        return dCM.Utilities.inverseMercator(0, y, zoom).getLat();
    },    
    
    pix2lat_Spherical: function(y, zoom){
        return dCM.Utilities.inverseMercator(0, y, zoom).getLat();
    },

    /**
     * Given a position and zoom level, get how many meters per pixels there are
     * @param {dCM.Position} p
     * @param {float} z the zoom level
     */
    metersPerPixelAtZoom: function(p, z){
        var C = 156543.04;
        var scale = C * Math.cos(p.lat * (Math.PI / 180)) / (Math.pow(2, z));
        return scale;
    },

    /**
	 * @private
	 */
    mercatorUnproject: function (t) {
        return (Math.PI / 2) - 2 * Math.atan(t);
    },

    /**
	 * @private
	 */
    findRadPhi: function (phi, t) {
        var ecc = 0.08181919084262157;
        //var ecc = 0.998434489;
        var eSinPhi = ecc * Math.sin(phi);
        return 	(Math.PI / 2) -
        (2 * Math.atan (t * Math.pow((1 - eSinPhi) / (1 + eSinPhi), ecc / 2)));
    },

    /**
	 * @private
	 */
    deCartaToGXZoomLevel: function (zoomLevel) {
        // The following is the definition of a "gxZoom"
        var gxZoom = Math.abs(21 - parseInt(dCM.Utilities.normalizeZoom(zoomLevel), 10));
        return gxZoom;
    },

    /**
     * Returns the tile size for a zoom level
     * @param {float} zoom
     * @param {int} tile size
     * @return int
     */
    tileSizeForZoom: function(zoom, tileSize){

        var dpr = deCarta.Window.getDpr();//(window.devicePixelRatio) ? window.devicePixelRatio : 1;
        if (!tileSize) tileSize = dCM.Constants.TILE_SIZE / dpr ;
        var base = tileSize;        
        var zoomInc = zoom - Math.floor(zoom);        
        if (zoomInc < 0) {        
            return (base * (1 + (1 -Math.abs(zoomInc)))) / 2;
        } else {        
            return base * (1 + zoomInc);
        }        
    },

    /**
     * Get the tile position in lat lng from the e,n,z triple
     */
    getTilePosition: function(e, n, z){
        try {
            var llsize = dCM.Constants._ll_LUT[Math.floor(z)].split(',');

            var lng = (e) * llsize[1];

            //to get teh lat, i need to
            // find the # of pix from the equator. (tileSize * n)
            // find the lat with my handy utility func
            var latPx = dCM.Utilities.tileSizeForZoom(z) * (n + 1);
            var lat = dCM.Utilities.pix2lat(latPx, z);

            return new dCM.Position(lat, lng);

        }catch (ex) {
            console.log('GetTilePos', ex);
        }
    },

    /**
     * Get distance between two positions
     * @param {Position} Point1
     * @param {Position} Point2
     * @return distance in kilometers
     */
    getPointDistance: function(Point1, Point2){

        var lat1 = Point1.getLat();
        var lat2 = Point2.getLat();
        var lon1 = Point1.getLon();
        var lon2 = Point2.getLon();

        var R = 6378.137; // km - THIS IS THE RADIUS OF THE CURRENT PLANET! (Earth).

        var dLat = (lat2 - lat1).toRad();
        var dLon = (lon2 - lon1).toRad();
        var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
                Math.cos(lat1.toRad()) * Math.cos(lat2.toRad()) *
                Math.sin(dLon/2) * Math.sin(dLon/2);
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
        var d = R * c;

        return d;
    },
    /**
     * Returns the angle between the segment connecting Position 1 and Position 2
     * and the X axis.
     * @param {dCM.Position} Position1
     * @param {dCM.Position} Position2
     * @param {boolean} rad (optional) rturns angle in degrees
     *
     *
     */
    getAngle: function(Position1, Position2, rad){

        var x1 = Position1.getX(21);
        var y1 = Position1.getY(21);
        var x2 = Position2.getX(21);
        var y2 = Position2.getY(21);

        var r = Math.atan2(y2 - y1, x2 - x1);
        if (rad) return r;
        return ((r * 180 / Math.PI) + 360) % 360; //deg

    },

    /**
     * Given the current center, zoom level, new zoom level and a fixed position
     * return the value for a new center that will keep the fixed position
     * in the same spot.
     *
     */
    getCenterToFixPositionAtNewZoom: function(fixedPosition, currentCenter, originalZoom, newZoom){

        var center = new dCM.Position();

        var currentCenterX = currentCenter.getX(originalZoom);
        var currentCenterY = currentCenter.getY(originalZoom);

        var currentFpX = fixedPosition.getX(originalZoom);
        var currentFpY = fixedPosition.getY(originalZoom);

        var deltaX = currentFpX - currentCenterX;
        var deltaY = currentFpY - currentCenterY;

        center.setXY(fixedPosition.getX(newZoom) - deltaX, fixedPosition.getY(newZoom) - deltaY , newZoom);

        return center;

    },
	
	bestZoomForBB: function(map, topLeft, btmRight){
		for (var z = 20; z > 0; z --){
            
            var x1 = topLeft.getX(z);
            var y1 = topLeft.getY(z);
            var x2 = btmRight.getX(z);
            var y2 = btmRight.getY(z);
            
            var dX = Math.abs(x2 - x1);
            var dY = Math.abs(y2 - y1);

            if (dX <= map.width && dY <= map.height){
                return z;             
            }
        }
		return z;
	},

    /**
	 * @private
	 */
    getTileKey: function(x, y, z){
        return dCM.Utilities.normalizeZoom(z) + '_' + x + '_' + y;
    },

    /**
	 * @private
	 */
    splitTileKey: function(key){
        var split = key.split('_');
        return {x: split[1], y: split[2], z:split[0]};
    },

    /**
     * Given an X, Y and Z tile triple returns the corresponding
     * quadkey as defined in the Navteq documentation.
     */
    tripleToQuadKey: function (x, y, z){
        var key = '';
        for (var mask = (1 << (z-1)); mask > 0; mask = mask >> 1){
            var dg = 0;
            if ((x & mask) != 0) dg += 1;

            if ((y & mask) != 0) dg += 2;
            key += dg;
        }
        return key;
    },

    /**
	 * @private
	 */
    normalizeZoom: function(z){
        return Math.floor(z);
    },

    /**
	 * @private
	 */
    getRequestId: function(){
        return Math.floor(Math.random()*10000000);
    },

    /**
	 * @private
	 */
    urlParse: function (urlString){

        var result = {};
        var split = urlString.split('#')[0].split('?');
        result.baseUrl = split[0];
        result.queryParameters = {};

        var params = {};
        try {
            var queryParameters = split[1].split('&');
            for (var i = 0; i < queryParameters.length; i++){
                var val = queryParameters[i].split('=');
                params[val[0]] = val[1];
            }
        } catch (e) {}
        result.queryParameters = params;
        
        try {
            split = result.baseUrl.split('://');
            result.proto = split[0];
            var hp = split[1].split('/');
            
            result.host = hp[0];
            hp[0]='';
            result.path = hp.join('/');
        } catch (e) {
            result.proto = 'unknown';
        }
        
        return result;
    },

    /**
	 * @private
	 */
    urlCompose: function (urlObj){

        var resultUrl = urlObj.baseUrl + '?';
        var first = true;
        var params = urlObj.queryParameters;

        for (var param in params){
            if (!first) {
                resultUrl += '&';
            } else {
                first = false
            }
            resultUrl += param + '=' + params[param];
        }

        return resultUrl;
    },

    /**
	 * @private
	 */
    removeElementToReinsert: function (element){

        var parentNode = element.parentNode;
        var nextSibling = element.nextSibling;
        
        parentNode.removeChild(element);
        return function domRestoration() {
            if (nextSibling) {
                parentNode.insertBefore(element, nextSibling);
            } else {
                parentNode.appendChild(element);
            }
        };
    },
    
    /**
	 * @private
	 */
    setOpacity: function(elem, opacity){
        
        var xop = (opacity / 100);    
        var object = elem.style;
        object.opacity = xop;
        object.MozOpacity = (opacity / 100);
        object.KhtmlOpacity = (opacity / 100);
        object.filter = "alpha(opacity=" + opacity + ")";

        return true;       

    },        

    /**
	 * @private
	 */
    extendObject: function(dst, src){
        for (var elem in src){
            if (typeof dst[elem] == 'Array' || typeof dst[elem] == 'Object'){
                dst[elem] = dCM.Utilities.extendObject(dst[elem], src[elem]);
            }
            dst[elem] = src[elem];
        }
        return dst;
    },
    
	/**
	 * Used for implementing class inheritance
	 */
    inherit: function(dst, src){        
        for (var elem in src){
            if (!dst[elem]){
                if (typeof dst[elem] == 'Array' || typeof dst[elem] == 'Object'){
                    dst[elem] = dCM.Utilities.inherit(dst[elem], src[elem]);
                }
                dst[elem] = src[elem];
            }
        }
        return dst;
    },

    /**
	 * @private
	 */
    domPosition: function(obj){
        var curleft = 0;
        var curtop = 0;
        if (obj.offsetParent) {
            do {
                curleft += obj.offsetLeft;
                curtop += obj.offsetTop;
            } while (obj = obj.offsetParent);
        }
        return {top: curtop, left: curleft};
    },

    /**
	 * @private
	 */
    extendStyle: function(dst, src){        
        for (var elem in src){
            try {
                dst[elem] = src[elem];
            } catch (e){
                console.log(e);
            }
        }
        return dst;
    },
    
    /**
	 * @private
	 */
    fixEvent: function(e){
        var posx = 0;
        var posy = 0;
        if (!e) var e = window.event;
        if (e.pageX || e.pageY) {
          posx = e.pageX;
          posy = e.pageY;
        }
        else if (e.clientX || e.clientY) {
          e.pageX = posx = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
          e.pageY = posy = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
        }
        return e;
    },       

    /**
	 * @private
	 */
    getClassName: function(obj){
        // get classname abstracted from
        // constructor property
        var c = obj.constructor.toString();
        var start = c.indexOf('function ') + 9;
        var stop = c.indexOf('(');
        c = c.substring(start, stop);
        return c;
    },

    /**
	 * @private
	 */
    getObjectPosition: function(obj){

        var o = obj;

        var curleft = 0;
        if(obj.offsetParent)
            while(1)
            {
              curleft += obj.offsetLeft;
              if(!obj.offsetParent)
                break;
              obj = obj.offsetParent;
            }
        else if(obj.x)
            curleft += obj.x;

        obj = o;
        var curtop = 0;
        if(obj.offsetParent)
            while(1)
            {
              curtop += obj.offsetTop;
              if(!obj.offsetParent)
                break;
              obj = obj.offsetParent;
            }
        else if(obj.y)
            curtop += obj.y;


        return {x: curleft, y: curtop};
    },

    /**
	 * @private
	 */
    domRemove: function (el){
        el.parentNode.removeChild( el );
    },

    /**
	 * @private
	 */
    pixelDistance: function(p1, p2){
        return Math.sqrt(Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2));
    }

};//utilities

/* JS POLLUTANTS SHIMS AND OTHER SUCH DEVILRIES */
if (!Function.prototype.bind) {
    
	Function.prototype.bind = function(context){

		var slice = Array.prototype.slice;

		function update(array, args) {
			var arrayLength = array.length, length = args.length;
			while (length--) array[arrayLength + length] = args[length];
			return array;
		}

		function merge(array, args) {
			array = slice.call(array, 0);
			return update(array, args);
		}

		if (arguments.length < 2 && (typeof arguments[0] === 'Undefined')) return this;
		var __method = this, args = slice.call(arguments, 1);
		return function() {
			var a = merge(args, arguments);
			return __method.apply(context, a);
		}
    }
}

/** Convert numeric degrees to radians */
if (typeof(String.prototype.toRad) === "undefined") {
  Number.prototype.toRad = function() {
    return this * Math.PI / 180;
  }
}

if (!Array.prototype.indexOf)
	{
	  Array.prototype.indexOf = function(elt /*, from*/)
	  {
		var len = this.length >>> 0;

		var from = Number(arguments[1]) || 0;
		from = (from < 0)
			 ? Math.ceil(from)
			 : Math.floor(from);
		if (from < 0)
		  from += len;

		for (; from < len; from++)
		{
		  if (from in this &&
			  this[from] === elt)
			return from;
		}
		return -1;
	  };
	}

/*http://paulirish.com/2011/requestanimationframe-for-smart-animating/*/
window.requestAnimFrame = (function(){
    return  window.requestAnimationFrame       || 
            window.webkitRequestAnimationFrame || 
            window.mozRequestAnimationFrame    || 
            window.oRequestAnimationFrame      || 
            window.msRequestAnimationFrame     || 
            function(/* function */ callback, /* DOMElement */ element, time){
            if (!time) time =  1000 / 60;
            window.setTimeout(callback,time);
            };
})();


/**
 * @class
 * API Configuration parameters. This static object must be edited to add your credentials (your DDS Key from
 * from the deCarta DevZone) to use the API.
 * 
 * @description API Configuration parameters.
 */

dCM.Configuration = {
    /** The client name you were provided from the deCarta DevZone 
     *  for API access (String) */
    clientName: "Joust.co",
    /** The client password you were provided from the deCarta DevZone 
     *  for API access (String) */
    clientPassword: "cb683c43af90c694f4221abe6d331a1d",
    /** Url for DDS WebServices (String)*/
    url: "http://ws.decarta.com/openls/JSON",
    /** Localizer values */
    language: 'EN',
    /** Localizer values */
    country: 'US',
    /** Projection system, valid values are: EPSG3857 (Spherical) or EPSG3395 (ellipsoidal) */
    projection: /*'EPSG3857',*/'EPSG3395', 
    /** @private */
    metric: false,
    /** This flag can be used for debugging. By setting to <em>true</em>,
     *  all exceptions will be also displayed as alerts.
     */
    vocalExceptions: true,
    /** Base z-index for overlays (int). Use this to control the base css index
     * for any map overlays that are created. */
    baseOvlZ: 100,
    /** Array of tile serving hosts (Array of String) */
    streetTileHosts: ["http://ws.decarta.com"],
    /** Tile config used for standard resolution devices (String)*/
    defaultConfig: 'global-decarta',
    /** Tile config used for high res devices (String)*/
    defaultHighResConfig: 'global-decarta-hi-res',
    /** Resource base directory */
    resourceBase: 'resources/',
    /** Image packs to be loaded */
    baseImagePack: 'StdResImages.js',
    /** Hi res image packs to be loaded*/
    baseHiResImagePack: 'HiResImages.js',
    /** Additional Resources (Blocking) */
    additionalImagePacks: {
        hiRes: [],
        loRes: []
    },
    /** Resource timeout, milliseconds */
    resourceTimeout: 20000,
    /** Request timeout, milliseconds */
    requestTimeout: 15000,
    /** Key for digital globe access (String)*/
    digitalGlobeKey: '2hq3AwyaQsMahDA5vYh1iBTaCMlFojTxLtCuzcIT2Ip7dY5d04VLPJEZvSSQd8u9',
    /** Array of hosts for DigitalGlobe satellite imagery (Array of String)*/
    digitalGlobeHosts: [
            'http://www1.globexplorer.com',
            'http://www2.globexplorer.com',
            'http://www3.globexplorer.com'
        ],
    /** When <em>true</em>, the map will use hardware acceleration, if available */
    useHardwareAcceleration: false,
    /** Build info */
    buildDate: '2012/02/15 12:33',
    /** Version number */
    version: '1.0.beta.282'
}

dCM.ZoomFramer = function(map,options){
    this.map = map;
    this.dom;
    
    this.scrollWheeling = false;
    this.options = {
        stepsPerScroll : 3, // zoom levels per mouse wheel tick
        min : 20, // min size of cirlce
        max : 120 // max size of cirlce
    }
    this.options = dCM.Utilities.extendObject(this.options, options);
    this.init();
}

dCM.ZoomFramer.prototype = {

    /**
     * initializer called once from constructor
     */
    init : function(){

        // set up the dom
        this.dom = deCarta.crEl("div");
        this.map.containerElement.appendChild(this.dom);
        this.dom.style.zIndex=1000;
        this.dom.style.backgroundColor="#999";
        this.dom.style.border="2px solid #444";
        this.dom.style.borderRadius="100em";
        this.dom.style.display="block";
        this.dom.style.position="absolute";

        dCM.Utilities.setOpacity(this.dom, 20);

        /** DOMMouseScroll is for mozilla. */
        if(this.map.containerElement.addEventListener)
            this.map.containerElement.addEventListener('DOMMouseScroll', this.scrollWheel.bind(this), false);

        /** IE/Opera. */
        this.map.containerElement.onmousewheel = this.scrollWheel.bind(this);

        // set up listners for zoom events

        // zoom start
        this.map.zoomstart(function(opts){
            if(!this.scrollWheeling)return;
            this.steps=0;
            var size = (opts.zoom-opts.targetZoom<0) ? this.options.min : this.options.max;
            this.dom.style.height=size+"px";
            this.dom.style.width=size+"px";
            var t = parseFloat(this.dom.style.top);
            var l = parseFloat(this.dom.style.left);
            this.dom.style.top=t-(size/2)+"px";
            this.dom.style.left=l-(size/2)+"px";
            this.dom.style.display="block";

        }.bind(this));

        // zoom change
        this.map.zoomchange(function(opts){
            if(!this.scrollWheeling)return;
            this.steps++;
            var d = this.dom;
            var scale = (opts.zoom-opts.targetZoom<0) ? 1.2 : 0.6;
            var h = parseFloat(d.style.height);
            var w = parseFloat(d.style.width);
            var t = parseFloat(d.style.top);
            var l = parseFloat(d.style.left);
            var h1 = h*scale;
            var w1 = w*scale;
            d.style.height=h1+"px";
            d.style.width=w1+"px";
            d.style.top=t+((h-h1)/2)+"px";
            d.style.left=l+((w-w1)/2)+"px";
        }.bind(this));

        // zoom end
        this.map.zoomend( function(){
            this.scrollWheeling=false;
            //console.log(this.steps);
            this.dom.style.display="none";
        }.bind(this));

    },

    /**
     * event handler for the scroll wheel
     */
    scrollWheel: function(e){
        this.scrollWheeling=true;
        e = e ? e : window.event;
        var wheelData = e.detail ? e.detail : e.wheelDelta;
        var x = e.clientX - this.map.containerElement.offsetLeft;
        var y = e.clientY - this.map.containerElement.offsetTop;
        this.dom.style.top=y + this.map.containerElement.offsetTop+"px";
        this.dom.style.left=x + this.map.containerElement.offsetLeft+"px";
        this.dom.style.height="0px";
        this.dom.style.width="0px";
        var fixed = this.map.positionFromXY(x, y);
        if(wheelData > 0)
            this.map.zoomIn(this.options.stepsPerScroll,fixed,true);
        else
            this.map.zoomOut(this.options.stepsPerScroll,fixed,true);
    }
}

/* 
 * @private. Implements precaching for tiles. Useful for desktop onlehhh
 */


dCM.TilePrecacher = function(map, tileStore){
    this.maxRequests = 4;
    this.map = map;
    this.tileStore = tileStore;
    this.grid = new dCM.TileGrid();
    this.init();
    
}


dCM.TilePrecacher.prototype = {
    
    init: function(){
        //Start a precache poll
        this.precachePoll();                
    },
    
    precachePoll: function(){
        
        var skip = false;
        for (var p in this.tileStore.loadRequests){
            skip = true;
            break;
        }
        if (skip){
            //console.log('Load requests active, not caching', this.tileStore.loadRequests);            
        } else {
            var rCount = 0;
            this.grid.resize(this.map.width, this.map.height);
            //look at tiles we'd like to have. Load them. New poll for later. 
            //start at zoom level 0. repeat, on centerpoint, for every zoom level. 
            for (var z = 1; z < 21 && rCount < this.maxRequests; z+=5){
                //get a grid on the map center and at this zoom            
                this.grid.prepare(this.map.center, z);
                var grid = this.grid.getGrid();

                for (var i = 0; i < grid.tiles.length; i++){
                    var tile = grid.tiles[i];
                    var key = dCM.Utilities.getTileKey(tile.E,tile.N,tile.Z);
                    //do we have it? 
                    if (!this.tileStore.availableTiles[key]){
                        this.tileStore.getTile(tile.E,tile.N,tile.Z);
                        rCount ++;
                    }
                }
            }        
        }
        setTimeout(this.precachePoll.bind(this), 500);
    }    
    
}
/** TileStore
 *
 * @class
 * This class provides a base-class for implementing advanced functionality for making
 * your own tile layers for tile storage and retrieval.
 *
 * To create a new TileStore, extend this class overriding the getTileUrl
 * method, providing your own url for the triple x, y, z. (easting, northing and zoom)
 * See {@link dCM.StreetTileStore} and {@link dCM.SatelliteTileStore} for examples.
 *
 * @description Base class for tile storage
 *
 * @constructor
 * @param {object] opts Options to be passed to the TileStore. The options will be defined by subclass that is implemented.
 *
 * @see dCM.StreetTileStore
 * @see dCM.SatelliteTileStore
 */
dCM.TileStore = function(opts){
	
    this.opts = {
        baseConfig: 'global-decarta',
        hiResConfig: null,
        precache: false
    }

    this.opts = dCM.Utilities.extendObject(this.opts, opts);   

    this.tileTimeout = 10000;
    this.tileCacheSize = deCarta.Window.isMobile() ? 100 : 500;
    this.availableTiles = {};
    this.tileCount = 0;
    this.keyStack = [];
    this.loadingTiles = {};
    this.loadRequests = {};
    this.blankTiles = {};

    this.tileTimeouts = [];
    //data uri for blank tile img. 
    //this.blankTile = 'data:image/png;base64,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/GMzLdsAAAAgY0hSTQAAeiUAAICDAAD5/wAAgOkAAHUwAADqYAAAOpgAABdvkl/FRgAABABJREFUeNrt3bsJAkEARVHZhoxMrctABD+gbWmoiVakLYzZXvacYMOXXnYYmOn7p/f5eb0fx7/27du3b3+e+9MKgEUSAAABAEAAABAAAAQAAAEAIB+Az+V1e5zGv+v9Zrc9jH/t27dv3/489/0BADgCAkAAABAAAAQAAAEAQAAAaAbAvVr79u3bX+a+PwAAR0AACAAAAgCAAAAgAAAIAADNALhXa9++ffveAwDAERAAAgCAAAAgAAAIAAACAEAnAO7V2rdv3773AABwBASAAAAgAAAIAAACAIAAANAJgHu19u3bt+89AAAcAQEgAAAIAAACAIAAACAAAHQC4F6tffv27XsPAABHQAAIAAACAIAAACAAAAgAAJ0AuFdr3759+94DAMAREAACAIAAACAAAAgAAAIAQCcA7tXat2/fvvcAAHAEBIAAACAAAAgAAAIAgAAA0AmAe7X27du37z0AABwBASAAAAgAAAIAgAAAIAAAdALgXq19+/btew8AAEdAAAgAAAIAgAAAIAAACAAAnQC4V2vfvn373gMAwBEQAAIAgAAAIAAACAAAAgBAJwDu1dq3b9++9wAAcAQEgAAAIAAACAAAAgCAAADQCYB7tfbt27fvPQAAHAEBIAAACAAAAgCAAAAgAAB0AuBerX379u17DwAAR0AACAAAAgCAAAAgAAAIAACdALhXa9++ffveAwDAERAAAgCAAAAgAAAIAAACAEAnAO7V2rdv3773AABwBASAAAAgAAAIAAACAIAAANAJgHu19u3bt+89AAAcAQEgAAAIAAACAIAAACAAAHQC4F6tffv27XsPAABHQAAIAAACAIAAACAAAAgAAJ0AuFdr3759+94DAMAREAACAIAAACAAAAgAAAIAQCcA7tXat2/fvvcAAHAEBIAAACAAAAgAAAIAgAAA0AmAe7X27du37z0AABwBASAAAAgAAAIAgAAAIAAAdALgXq19+/btew8AAEdAAAgAAAIAgAAAIAAACAAAnQC4V2vfvn373gMAwBEQAAIAgAAAIAAACAAAAgBAJwDu1dq3b9++9wAAcAQEgAAAIAAACAAAAgCAAADQCYB7tfbt27fvPQAAHAEBIAAACAAAAgCAAAAgAAB0AuBerX379u17DwAAR0AACAAAAgCAAAAgAAAIAACdALhXa9++ffveAwDAERAAAgCAAAAgAAAIAAACAEAnAO7V2rdv3773AABwBASAAAAgAAAIAAACAIAAANAJgHu19u3bt+89AAAcAQEgAAAIAAACAIAAACAAAHQC4F6tffv27XsPAABHQAAIAAACAIAAACAAAAgAAJ0AuFdr3759+94DAMAREAACAIAAACAAAAgAAAIAQMYP9H33sLThVJQAAAAASUVORK5CYII=';
    //1px transparent gif. (saves space). We can then do stuff
    this.blankTile = 'data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==';
    this.blankTileImg = new Image();
    this.blankTileImg.src = this.blankTile;    
    
    dCM.EventManager.listen('zoomEnd', this.zoomEnd.bind(this));
}

dCM.TileStore.prototype  = {

    /**
	 * @private
	 */
    getKey : function(x,y,z){
        return dCM.Utilities.getTileKey(x,y,z);
    },

    /**
	 * @private
	 */
    getTile: function(x, y, z){       
   
        z = Math.floor(z);

        var key = this.getKey (x,y,z);
    
        if (this.availableTiles[key] && this.availableTiles[key].src) {
            var drawTile = {};
            drawTile.name = key;
            drawTile.img = this.availableTiles[key];
            drawTile.scale = 1;
            drawTile.ofsX = 0;
            drawTile.ofsY = 0;

            return drawTile;
        }
        if (this.loadingTiles[key]) {
            return this.getNextBestTile(x,y,z);
        }
        this.loadingTiles[key] = true;

        var tile = new Image();
        tile.key = key;        
        tile.store = this;
        tile.timeout = setTimeout(this.purgeRequest.bind(this, key), this.tileTimeout);
        tile.onload = function(t){
            
            clearTimeout(t.timeout);
            var now = new Date().getTime();
            t.loadTime = now;
            this.availableTiles[key] = t;
            this.keyStack.push(key);
            this.tileCount ++;
            delete this.loadingTiles[key];
            delete this.loadRequests[key];
            this.removeBlankTile(key);
            t.onload = null;
            if (this.tileCount > this.tileCacheSize){
                var k = this.keyStack.shift(key);
                delete this.availableTiles[k];
                this.tileCount --;                
            }	
            
            dCM.EventManager.trigger('tileLoad', t);
        }.bind(this, tile);
        tile.onerror = function(e){            
            this.purgeRequest(this.key);           
        }.bind(this)
        this.loadRequests[key] = tile;        
        
        tile.src = this.getTileUrl(x,y,z);        

        return this.getNextBestTile(x,y,z);
       
    },

    /**
     * @private
     * purges the load queue based on a center and a zoom level
     * basically goes through the load list and purges tiles that are
     * on different zoom or that are far away from the position.
     * radius is IN TILES
     */
    purgeLoadRequests: function(centerTile, zoom, radius){
        
        zoom = dCM.Utilities.normalizeZoom(zoom);        
        for (var key in this.loadRequests){
            var tInfo = dCM.Utilities.splitTileKey(key);
            if (tInfo.z != zoom){
                continue;
             /*   console.log('Purging : ' + key + ' since zoom is ' + zoom);
                this.purgeRequest(key);*/
            }
            //now check the distance of the tile
            var d = Math.floor(Math.sqrt(Math.pow(centerTile.E - tInfo.x,2) + Math.pow(centerTile.N - tInfo.y,2)));            
            if (d > (radius / 2) +1){
               // console.log('Purging: ' + key + ' its out of radius. ', d, radius);
                this.purgeRequest(key);
            }
        }
    },

    /**
	 * @private
	 */
    purgeRequest: function(key){        
        if (this.loadRequests[key]) {
            this.loadRequests[key].onload = null;
            this.loadRequests[key].src = null;
            delete this.loadRequests[key];
        }
        if (this.loadingTiles[key]) delete this.loadingTiles[key];        
    },

    /**
	 * @private
	 */
    zoomEnd: function(ev){
        
        this.currentZoom = ev.zoom;
        //return; //this is buggy, fix it then renable it.
        for (var k in this.loadRequests){
            var info = dCM.Utilities.splitTileKey(k);
            if (info.z != this.currentZoom){
                if (!this.availableTiles[k]){
                    this.purgeRequest(k);
                }
            }
        }
    },

    /**
	 * @private
	 */
    getTileUrl: function(){
        throw('This is a base class. Extend it and override this method. ');
    },

    /**
	 * @private
	 */
    getNextBestTile: function(x,y,z){
        //looks for the tile at a lower zoom level, returns it

        z = Math.round(z);
        for (var i = 1; i < 6; i++){
            var nz = z - i;

            var nx = x / Math.pow(2, i);
            var ny = y / Math.pow(2, i);

            if (nx < 0) nx = Math.floor(nx); else nx = Math.floor(nx);
            if (ny < 0) ny = Math.floor(ny); else ny = Math.floor(ny);

            var tx = nx * Math.pow(2, i);
            var ty = ny * Math.pow(2, i);

            var ox = tx - x;
            var oy = ty - y;

            var key = this.getKey (nx,ny,nz);
         
            if (this.availableTiles[key]) {

                var nTiles = Math.pow(2, i);
                oy = Math.abs(oy) - (nTiles - 1);// - oy;

                var drawTile = {};
                drawTile.name = key;
                drawTile.img = this.availableTiles[key];
                drawTile.scale = Math.pow(2, i); //if we went up 2 zoom levels, tile is x4 each side, and so on.
                drawTile.ofsX = ox; //likely wrong.
                drawTile.ofsY = oy;

                return drawTile;
            }
        }

        var key = this.getKey (x,y,z);
        drawTile = {};
        drawTile.name = 'empty_' + key;
        drawTile.img = this.getBlankTile(key);
        drawTile.img.empty = true;
        drawTile.scale = 1;
        drawTile.ofsX = 0;
        drawTile.ofsY = 0;

        return drawTile;
    },

    /**
	 * @private
	 */
    getBlankTile: function(k){
        if (this.blankTiles[k]) return this.blankTiles[k];
        this.blankTiles[k] = this.blankTileImg.cloneNode(true);
        this.blankTiles[k].id = 'empty_' + k;
        this.blankTiles[k].key = 'empty_' + k;
        return this.blankTiles[k];
    },

    /**
	 * @private
	 */
    removeBlankTile: function(k){
        if (this.blankTiles[k]){
            delete this.blankTiles[k];
        }
    },
    
    setOwner: function(owner){
        //console.log('Setting store owner;);');
        this.owner = owner;
    },
    
    startPrecaching: function(){
        //console.log('Starting to precache', this.opts.precache);
        if (!this.opts.precache) return;
        if (!this.precacher){               
            this.precacher = new dCM.TilePrecacher(this.owner, this);            
        }        
    },

    /**
	 * @private
	 */
    toJSON: function(){
        var obj = {
            opts: this.opts
        }

        return obj;
    }



}
/**
 * @class
 * StreetTileStore extends the base TileStore to provide a standard street
 * map.
 * The getTileUrl method is overridden to generate url that are address tiles
 * by using deCarta WS urls.
 *
 * @description Provides standard street view imagery
 *
 * @constructor
 * @param {object} opts Options (not currently used, for future expansion only)
 */

dCM.StreetTileStore = function(opt){
    dCM.TileStore.call(this, opt);
    //a look up table providing the correct LLMAX values per zoom level.
    this._ll_LUT = dCM.Constants._ll_LUT;
    this.hostIdx = 0;
}

//Define methods to extend StreetTileStore
dCM.StreetTileStore.prototype = {
	
    /**
	 * @private
     * Overrides the standard getTileUrl to provide deCarta Street Tiles. 
     */
    getTileUrl: function(x,y,z){
        
        var dpr =  deCarta.Window.getDpr(); //(window.devicePixelRatio) ? window.devicePixelRatio : 1;
        //var dpr = 1; //we are now flipping it over and
        // doing dpr in the size of the html elem in hopes of good luck.

        var config = (dpr > 1) ? dCM.Configuration.defaultHighResConfig : dCM.Configuration.defaultConfig;

        //console.log('dpr : ', dpr, config, dCM.Configuration);

        var url = dCM.Configuration.streetTileHosts[this.hostIdx] + '/openls/image-cache/TILE?'+
                   'LLMIN=0.0,0.0' +
                   '&LLMAX=' + this._ll_LUT[Math.round(z)] +
                   '&CACHEABLE=true' + 
                   '&DS=navteq-world' +
                   '&WIDTH=' + (256 /* * dpr*/) +
                   '&HEIGHT=' + (256 /* * dpr*/) +
                   '&CLIENTNAME=' + dCM.Configuration.clientName +
                   '&SESSIONID=' + dCM.JSRequest.sessionId +
                   '&FORMAT=PNG' +
                   '&CONFIG=' + config +
                   '&N=' + y +
                   '&E=' + x;
        
        this.hostIdx = (this.hostIdx + 1) % dCM.Configuration.streetTileHosts.length;

        return url;
	}

}; //end StreetTileStore prototype

//Extend the TileStore with the additional methods for StreetTileStore
dCM.StreetTileStore.prototype = dCM.Utilities.inherit(dCM.StreetTileStore.prototype, dCM.TileStore.prototype);

/**
 * @class
 * SatelliteTileStore extends the base TileStore to provide a DigitalGlobe satellite imagery. 
 * The getTileUrl method is overridden to generate urls that to DigitalGlobe tiles
 * You need to provide a DigitalGlobe key in the Configuration to use this. 
 *
 * @description Provides DigitalGlobe statellite imagery
 *
 * @constructor
 * @param {object} opts Options (not currently used, for future expansion only)
 */

dCM.SatelliteTileStore = function(opt){
    
    dCM.TileStore.call(this, opt);    
    //this.baseUrl = dCM.Utilities.urlParse("http://www3.globexplorer.com/tiles/decarta?key=2hq3AwyaQsMahDA5vYh1iBTaCMlFojTxLtCuzcIT2Ip7dY5d04VLPJEZvSSQd8u9&LL=37.774053,-122.421398&ZOOM=15&CACHEABLE=true&DS=navteq&WIDTH=256&HEIGHT=256&FORMAT=PNG&CLIENTNAME=map-sample-app&SESSIONID=9809958&CONFIG=transparent-tile&N=1&E=0");
    this.hosts = dCM.Configuration.digitalGlobeHosts;
    this.hostIdx = 0;
}

//Define methods to extend SatelliteTileStore
dCM.SatelliteTileStore.prototype = {
	
    /**
	 * @private
     * Overridden getTileUrl function
     */
    getTileUrl: function(x, y, z){

        /* get a fixed url LL and go from there, for example, let's use greenwich!*/

        //var dpr =  (window.devicePixelRatio) ? window.devicePixelRatio : 1;
        var dpr = 1; //unused remove me

        var pos = dCM.Utilities.getTilePosition(x, y, z);

        var lat = pos.getLat() % 180;
        var lon = pos.getLon() % 360;

        if (lon < -180) lon = 360 + lon;
        
        if (lon > 180) lon = lon - 360;
        
    /*    this.baseUrl.queryParameters.LL = lat + ',' + lon;
        this.baseUrl.queryParameters.N = 0;
		this.baseUrl.queryParameters.E = 0;
        this.baseUrl.queryParameters.ZOOM = z;

        this.baseUrl.queryParameters.WIDTH = 256 * dpr;
        this.baseUrl.queryParameters.HEIGHT = 256 * dpr;*/

        var url = this.hosts[this.hostIdx] + '/tiles/decarta' +
                  '?key=' + dCM.Configuration.digitalGlobeKey +
                  '&LL=' + lat + ',' + lon  +
                  '&ZOOM=' + z + 
                  '&CACHEABLE=true' +
                  '&DS=' + 'navteq' +
                  '&WIDTH=' + 256 +
                  '&HEIGHT=' + 256 +
                  '&FORMAT=PNG' +
                  '&CLIENTNAME=' + dCM.Configuration.clientName +
                  '&SESSIONID=9809958' +
                  '&CONFIG=transparent-tile' + 
                  '&N=0' +
                  '&E=0'

        return url;
		//return dCM.Utilities.urlCompose(this.baseUrl);
	}

}; //end SatelliteTileStore prototype

//Extend the TileStore with the additional methods for SatelliteTileStore
dCM.SatelliteTileStore.prototype = dCM.Utilities.inherit(dCM.SatelliteTileStore.prototype, dCM.TileStore.prototype);

/**
 * @class
 * A MapControl is a base class upon which to build custom map controls
 * This base class should be extended to provide the desired functionality
 * in your control.
 *
 * Some the following for some already-defined map controls:
 * {@link dCM.CopyrightControl}
 * {@link dCM.ZoomControl}
 *
 * @description Base Class for Map Controls
 *
 * @constructor
 * @param {object} options Options A list of options for the control, which will vary 
 * depending on the functionality the control offers. However, there is a set
 * of standard options every control should implement:
 * <ul>
 *  <li>(string) position: specifies how the control will be positioned on the map. can
 *  be one of 'topLeft', 'topRight', 'bottomLeft', 'bottomRight' or any other
 *  string your control will be able to interpret.</li>
 *  <li>(int) marginX: margin from the edge of the map (left OR right) on the X coordinate, in pixels (default=10)</li>
 *  <li>(int) marginY: margin from the edge of the map (top OR bottom) on the Y coordinate, in pixels (default=10) </li>
 * </ul>
 *
 * @see dCM.CopyrightControl
 * @see dCM.ZoomControl
 * @see dCM.Map
 **/

dCM.MapControl = function(options){

    this.options = {        
        position: 'topLeft', //position on the map : topLeft, topRight, bottomLeft, bottomRight, center, custom.
        marginX: 10, //margins from edge of map
        marginY: 10 
    }

    this.options = dCM.Utilities.extendObject(this.options, options);
    
    this.domElement = null;
}


dCM.MapControl.prototype = {
    /**
	 * You need to implement the render method in every map control so that
     * it produces a single HTML Dom Element containing the whole GUI for the control.
     * The render function should return this DOM Element to the caller so that it can
     * be placed on the map.
     *
     * The dom element should be created with the following css attributes :
     * <ul>
     *  <li>Position: absolute</li>
     *  <li>top (bottom): appropriate for the position specified in the options</li>
     *  <li>left (right): appropriate for the position specified in the options</li>
     * </ul>
     *
     * @return HTMLDomElement
     */
    render: function(){
        throw('You are rendering a base MapControl. It does NOTHING!');
    },
    
    /**
     * Controls the positioning of the control over the map.
	 * You might need to implement the position function in controls inherited from the base
	 * MapControl.
     */
    position: function(){
        switch (this.options.position){
            case 'topRight':
                this.domElement.style.left = this.options.map.width - this.width - this.options.marginX + 'px';                
                this.domElement.style.top = this.options.marginY + 'px';
                break;
            case 'bottomLeft':                
                this.domElement.style.left = this.options.marginX + 'px';                
                this.domElement.style.top = this.options.map.height - this.height - this.options.marginY + 'px';                
                break;
            case 'bottomRight':                
                this.domElement.style.left = this.options.map.width - this.width - this.options.marginX + 'px';                
                this.domElement.style.top = this.options.map.height - this.height - this.options.marginY + 'px';
                break;
            case 'topLeft':
            default:
                this.domElement.style.top = this.options.marginY + 'px';
                this.domElement.style.left = this.options.marginX + 'px';
                break;
        }
    },

    /**
     * @private
     */
    setOwner: function(map){
        this.options.map = map;
    },

    /**
	 * @private
	 */
    setZ: function(z){        
        if (this.domElement){            
            this.domElement.style.zIndex = z;
        }
        this.z = z;
    },

    /**
	 * @private
	 */
    toJSON: function(){
        
        var layerObj = {
            marginX: this.options.marginX,
            marginY: this.options.marginY,
            position: this.options.position
        };

        return layerObj;
    }


}
/**
 * @class ZoomControl - Add a zoom control to the map to present the user
 * with zoom in / zoom out buttons.
 * This class inherits from {@link dCM.MapControl}.
 *
 * @description Zoom Map Control
 *
 * @constructor
 * @param opt Options A list of options with which to initialize the ZoomControl.
 * Valid options are:
 * <ul>
 *   <li>(string) position: (Inherited from {@link dCM.MapControl}), which should
 *       be set to one of: 'topLeft', 'topRight', 'bottomLeft', 'bottomRight' (default='topLeft')</li>
 *   <li>(int) marginX: (Inherited from {@link dCM.MapControl}) margin from 
 *       the edge of the map (left OR right) on the X coordinate, in pixels (default=10)</li>
 *   <li>(int) marginY: (Inherited from {@link dCM.MapControl}) margin from
 *       the edge of the map (top OR bottom) on the Y coordinate, in pixels (default=10) </li>
 *   <li>(bool) continuousZoom: in case of desktop style, zoom will be continuous if the zoom handle is dragged. 
 *   Performance intensive. Use appropriately. </li>
 * </ul>
 * To replace the images used in this control, place them in the correct (std / hires)
 * pack in the resources directory. Read more about image packs in the docs index.
 *
 * @see dCM.MapControl
 * @see dCM.Map
 */

dCM.ZoomControl = function(opt){

    dCM.MapControl.call(this, opt);
/*    if (!this.options.style){
        if (deCarta.Window.isMobile()) this.options.style = 'mobile';
        else this.options.style = 'desktop';
    }*/
	
}


//Define methods to extend ZoomControl
dCM.ZoomControl.prototype = {

    /**
	 * @private
	 */
    ready: false,
	
    /**
	 * @private
	 */
    zoomLevels: 21,
	
    /**
	 * @private
	 */
    zoomOfs: 0,

    /**
	 * @private
	 */
    initElements: function(){
        
        this.domElement = deCarta.crEl('div');
        this.domElement.style.position = 'absolute';
        
        this.zoomIn = deCarta.crEl('div');
        this.zoomIn.style.position = 'absolute';
        this.zoomOut = deCarta.crEl('div');
        this.zoomOut.style.position = 'absolute';
        
        this.zoomLevels = this.options.map.maxZoom - this.options.map.minZoom +1; //[]
        this.zoomOfs = this.options.map.minZoom;
       
        if (this.options.style == 'auto'){
            if (deCarta.Window.isMobile()) this.options.style = 'mobile';
            else this.options.style = 'desktop';
        }
		

       
        if (this.options.style == 'desktop'){
            this.desktopStyle();
        } else {
            this.mobileStyle();
        }
        
        if (this.z) this.domElement.style.zIndex = this.z;


        this.zoomIn.onclick = function(){
            this.options.map.zoomIn();
        }.bind(this);

        this.zoomOut.onclick = function(){            
            this.options.map.zoomOut();
        }.bind(this);

        this.position();
        this.ready = true; 
    },
    
    /**
	 * @private
	 */
    mobileStyle: function(){
        this.zoomInImg = dCM.ImagePack.zoomin_unselected;
        this.zoomOutImg = dCM.ImagePack.zoomout_unselected;

        this.width = this.zoomInImg.width + this.zoomOutImg.width;
        this.height = Math.max(this.zoomOutImg.height, this.zoomInImg.height);
        
        this.zoomOut.style.cursor = this.zoomIn.style.cursor = 'pointer';

        this.zoomIn.style.left = parseFloat(this.zoomOutImg.width) + 'px';

        this.zoomIn.appendChild(this.zoomInImg);              
        this.zoomOut.appendChild(this.zoomOutImg);
        
        this.domElement.appendChild(this.zoomIn);
        this.domElement.appendChild(this.zoomOut);        
    },

    /**
     * @private
     * renders the control with a desktop look. 
     */
    desktopStyle: function(){
        this.positionCursor = function(){            
            this.cursor.style.top = (this.zoomLevels - this.options.map.zoom + this.zoomOfs - 1) * 10 + 'px';
        }.bind(this);
        
        dCM.EventManager.listen('zoomend', this.positionCursor);
        
        dCM.Utilities.extendStyle(this.zoomIn.style, {
            backgroundImage: 'url(resources/zoom_in.png)',            
            height: '20px',
            width: '20px',
            marginLeft: '4px',
            cursor: 'pointer'
        });
        
        dCM.Utilities.extendObject(this.zoomOut.style, {
            backgroundImage: 'url(resources/zoom_out.png)',
            height: '20px',
            width: '20px',
            marginLeft: '4px',
            cursor: 'pointer',
            position:'relative',
            top:'20px'
        });
        
        
        this.pillar = deCarta.crEl('div');
        this.pillar.unselectable = 'on';
        
        dCM.Utilities.extendObject(this.pillar.style, {
            backgroundImage: 'url(resources/zoom_rail.png)',
            height: (10 * this.zoomLevels)  + 'px',
            width: '28px',
            position:'relative',
            top:'20px',
            cursor: 'pointer'
        });

        this.cursor = deCarta.crEl('div');
        this.cursor.unselectable = 'on';
        dCM.Utilities.extendObject(this.cursor.style, {
            backgroundImage: 'url(resources/zoom_handle.png)',
            backgroundRepeat: 'no-repeat',
            height: '10px',
            lineHeight: '10px',
            width: '28px',
            position: 'absolute'
        });
        
        var pillarClick = function(e){                        
            if (this.cursorDragging) return;
            e = dCM.Utilities.fixEvent(e);            
            var y = e.pageY - dCM.Utilities.domPosition(this.domElement).top; 
            this.options.map.zoomTo(this.zoomLevels + this.zoomOfs - Math.floor(y / 10) + 1);
            e.returnValue = false;
        }.bind(this);

        deCarta.Touch.attachListener('tap', this.pillar, pillarClick, true);
        
        deCarta.Touch.attachListener('touchstart', this.cursor, function(ev){
            this.cursorDragging = true;           
        }.bind(this), true);
        
        deCarta.Touch.attachListener('touchmove', this.pillar, function(ev, oev){ 
            if (!this.cursorDragging) return;
            var y = oev.pageY - dCM.Utilities.domPosition(this.domElement).top;                             
            this.cursor.style.top = y - 20  + 'px';
            if (this.options.continuousZoom) {
                //console.log('Continuous zoom to : ', this.zoomLevels + this.zoomOfs - (y / 10) + 1, y);
                this.options.map.zoomTo(this.zoomLevels + this.zoomOfs - (y / 10) + 1, null, true);
            }
        }.bind(this), true);
        
        deCarta.Touch.attachListener('touchend', this.pillar, function (e){
            
            if (this.cursorDragging){                                
                this.cursorDragging = false;
                var y = parseInt(this.cursor.style.top) + 20;                
                this.options.map.zoomTo(this.zoomLevels + this.zoomOfs - Math.floor(y / 10) + 1);
            }
        }.bind(this), true);
		

        var out = function(e){
            if (!e.relatedTarget) e.relatedTarget = e.toElement;
            if (!(e.relatedTarget == this.cursor || e.relatedTarget == this.pillar)){                
                this.cursorDragging = false;

                var y = parseInt(this.cursor.style.top) + 20;                
                this.options.map.zoomTo(this.zoomLevels + this.zoomOfs - Math.floor(y / 10) + 1);
            }
			
        }.bind(this);
		
        if (deCarta.Window.isIe()) this.domElement.attachEvent('onmouseout', out);
        else this.domElement.addEventListener('mouseout', out, true);
        
        this.pillar.appendChild(this.cursor);
        
        this.domElement.appendChild(this.zoomIn);
        this.domElement.appendChild(this.pillar);
        this.domElement.appendChild(this.zoomOut);        
        
        this.positionCursor();                
    },

    /**
	 * This render method implements the render method from the 
	 * {@link dCM.MapControl} base class.
	 * It is responsible for rendering this control on the map,
	 * and produces a single HTML Dom Element containing the whole
	 * GUI for the control.
	 * @param {string} container The DOM element within which the control is rendered. 
	 */
    render: function(container){

        if (!this.ready) this.initElements();
        container.appendChild( this.domElement );
    },

    /**
	 * Overrides the {@link dCM.MapControl}:position() method
	 */
    position: function(){
        
        switch (this.options.position){
            case 'topRight':
                this.domElement.style.left = this.options.map.width - this.width - this.options.marginX + 'px';
                this.domElement.style.top = this.options.marginY + 'px';
                break;
            case 'bottomLeft':
                this.domElement.style.left = this.options.marginX + 'px';
                this.domElement.style.top = this.options.map.height - this.height - this.options.marginY + 'px';
                break;
            case 'bottomRight':
                this.domElement.style.left = this.options.map.width - this.width - this.options.marginX + 'px';
                this.domElement.style.top = this.options.map.height - this.height - this.options.marginY + 'px';       
                break;
            case 'topLeft':
            default:
                this.domElement.style.top = this.options.marginY + 'px';
                this.domElement.style.left = this.options.marginX + 'px';
                break;
        }
    }

}; //end ZoomControl prototype

//Extend the MapControl with the additional methods for ZoomControl
dCM.ZoomControl.prototype = dCM.Utilities.inherit(dCM.ZoomControl.prototype, dCM.MapControl.prototype);

/**
 * @private
 *
 * This control is not currently supported.
 *
 * The PanControl provides a control consisting of 4 arrows 
 * over the map that let you pan the map, and provide a GPS locate button in
 * the center of the arrows.
 * This class inherits from {@link dCM.MapControl}.
 * @param opt Options A list of options with which to initialize the PanControl.
 * Valid options are:
 * <ul>
 *   <li>(string) position: (Inherited from {@link dCM.MapControl}), which should
 *       be set to one of: 'topLeft', 'topRight', 'bottomLeft', 'bottomRight'
 *       (default='topLeft')</li>
 *   <li>(int) marginX: (Inherited from {@link dCM.MapControl}) 
 *       margin from the edge of the map (left OR right) on the X coordinate,
 *       in pixels (default=10)</li>
 *   <li>(int) marginY: (Inherited from {@link dCM.MapControl}) 
 *       margin from the edge of the map (top OR bottom) on the Y coordinate, 
 *       in pixels (default=10)</li>
 *   <li>(int) locateTimeout: Timeout, in milliseconds, for the GPS locate  
 *       operation</li>
 *   <li>(bool) locateHighAccuracy: If set to <em>true</em>, enables high-accuracy
 *       GPS (default=false)</li>
 *   <li>(int) locateMaxAge: Sets the maximum age (in milliseconds) of the cached GPS result that
 *       can be accepted. If the cached GPS is older than this value, the
 *       GPS locate button will not use the cached position.</li>
 * </ul>
 */
dCM.PanControl = function(opt){

    dCM.MapControl.call(this, opt);
/*    if (!this.options.style){
        if (deCarta.Window.isMobile()) this.options.style = 'mobile';
        else this.options.style = 'desktop';
    }*/
    this.locateTimeout = 10000;
    this.locateHighAccuracy = false;
    this.locateMaxAge = 1000 * 60 * 60 * 24;
	
}


//Define methods to extend PanControl
dCM.PanControl.prototype = {
        
        /**
		 * @private
	     */
        initElements: function(){
                       
            this.top = deCarta.crEl('div');
            this.top.style.textAlign = 'center';
            this.center = deCarta.crEl('div');
            this.center.style.textAlign = 'center';
            this.bottom = deCarta.crEl('div');            
            this.bottom.style.textAlign = 'center';
            
            this.panNorth = new Image();
            this.panNorth.src = 'resources/pan_north.png'
            this.panNorth.style.cursor = 'pointer';
            deCarta.Touch.attachListener('tap', this.panNorth, this.options.map.pan.bind(this.options.map, 'north', 50), true);
            this.panEast = new Image();
            this.panEast.src = 'resources/pan_east.png'
            this.panEast.style.cursor = 'pointer';
            deCarta.Touch.attachListener('tap', this.panEast, this.options.map.pan.bind(this.options.map, 'east', 50), true);
            this.panSouth = new Image();
            this.panSouth.src = 'resources/pan_south.png'
            this.panSouth.style.cursor = 'pointer';
            deCarta.Touch.attachListener('tap', this.panSouth, this.options.map.pan.bind(this.options.map, 'south', 50), true);
            this.panWest = new Image();
            this.panWest.src = 'resources/pan_west.png'
            this.panWest.style.cursor = 'pointer';
            deCarta.Touch.attachListener('tap', this.panWest, this.options.map.pan.bind(this.options.map, 'west', 50), true);
            this.locate = new Image();
            this.locate.src = 'resources/pan_center.png'
            this.locate.style.cursor = 'pointer';
            deCarta.Touch.attachListener('tap', this.locate, this.geoLocate.bind(this), true)
            
            
            this.top.appendChild(this.panNorth);
            this.center.appendChild(this.panWest);
            this.center.appendChild(this.locate);
            this.center.appendChild(this.panEast);
            this.bottom.appendChild(this.panSouth);
            
            this.domElement = deCarta.crEl('div');
            this.domElement.style.position = 'absolute';
            
            this.domElement.appendChild(this.top);
            this.domElement.appendChild(this.center);
            this.domElement.appendChild(this.bottom);
            
            this.ready = true;
            
        },
        
        /**
		 * @private
	     */
        geoLocate: function(){
            if (!navigator.geolocation) return;
            var map = this.options.map;
            var locateBtn = this.locate;
            locateBtn.src= 'resources/pan_spinner.gif';
            navigator.geolocation.getCurrentPosition(
                function(position){
                    var pos = new dCM.Position(position.coords.latitude, position.coords.longitude);
                    map.centerOn(pos);
                    locateBtn.src= 'resources/pan_center.png';
                },
                function(error){
                    //error error oh
                },
                {
                    timeout:this.locateTimeout,
                    maximumAge:this.locateMaxAge,
                    enableHighAccuracy:this.locateHighAccuracy
                }
            );
        },
        
       /**
	    * This render method implements the render method from the 
	    * {@link dCM.MapControl} base class.
	    * It is responsible for rendering this control on the map,
	    * and produces a single HTML Dom Element containing the whole
	    * GUI for the control.
	    * @param {HTMLDOMElement} container The container which holds this control
	    */
        render: function(container){
            if (!this.ready) this.initElements();
            container.appendChild( this.domElement );            
        }

}; //end PanControl prototype

//Extend the MapControl with the additional methods for PanControl
dCM.PanControl.prototype = dCM.Utilities.inherit(dCM.PanControl.prototype, dCM.MapControl.prototype);

/**
 * @class
 * Add a copyright string to the map.
 * This class inherits from {@link dCM.MapControl}.
 *
 * @description Copyright Map Control
 *
 * @constructor
 * @param opt Options A list of options with which to initialize the CopyrightControl.
 * Valid options are:
 * <ul>
 *   <li>(string) position: (Inherited from {@link dCM.MapControl}), which should
 *       be set to one of: 'topLeft', 'topRight', 'bottomLeft', 'bottomRight' (default='topLeft')</li>
 *   <li>(int) marginX: (Inherited from {@link dCM.MapControl}) margin from 
 *       the edge of the map (left OR right) on the X coordinate, in pixels (default=10)</li>
 *   <li>(int) marginY: (Inherited from {@link dCM.MapControl}) margin from
 *       the edge of the map (top OR bottom) on the Y coordinate, in pixels (default=10) </li>
 * </ul>
 * The control can also be styled with css using the class : deCarta-mobile-copyright.
 *
 * @see dCM.MapControl
 * @see dCM.Map
 */

dCM.CopyrightControl = function(opt){
    dCM.MapControl.call(this, opt);
}



//Define methods to extend CopyrightControl
dCM.CopyrightControl.prototype = {
	
    /**
	 * @private
	 */
    ready: false,

    /**
	 * @private
     */
    initElements: function(){   

        this.domElement = deCarta.crEl('div');
        this.domElement.style.position = 'absolute';
        this.domElement.className = 'deCarta-copyright';

        this.domElement.innerHTML = this.options.text;

        this.position();
        this.ready = true; 
        this.height = 20;
    },

    /**
	 * This render method implements the render method from the 
	 * {@link dCM.MapControl} base class.
	 * It is responsible for rendering this control on the map,
	 * and produces a single HTML Dom Element containing the whole
	 * GUI for the control.
	 * @param {string} container The DOM element within which the control is rendered. 
	 */
    render: function(container){

        if (!this.ready) this.initElements();
        container.appendChild( this.domElement );
    }

}; //end CopyrightControl prototype

//Extend the MapControl with the additional methods for CopyrightControl
dCM.CopyrightControl.prototype = dCM.Utilities.inherit(dCM.CopyrightControl.prototype, dCM.MapControl.prototype);

/**
 * @private
 *
 * This control is not currently supported.
 *
 * The OverviewControl map control provides a small window with a zoomed-out overview map as an overlay on the main map.
 * This class inherits from {@link dCM.MapControl}.
 * @param opt Options A list of options with which to initialize the OverviewControl.
 * Valid options are:
 * <ul>
 *   <li>(string) position: (Inherited from {@link dCM.MapControl}), which should
 *       be set to one of: 'topLeft', 'topRight', 'bottomLeft', 'bottomRight' (default='topLeft')</li>
 *   <li>(int) marginX: (Inherited from {@link dCM.MapControl}) margin from 
 *       the edge of the map (left OR right) on the X coordinate, in pixels (default=10)</li>
 *   <li>(int) marginY: (Inherited from {@link dCM.MapControl}) margin from
 *       the edge of the map (top OR bottom) on the Y coordinate, in pixels (default=10) </li>
 * </ul>
 */
dCM.OverviewControl = function(opt){
    dCM.MapControl.call(this, opt);
}


//Define methods to extend OverviewControl
dCM.OverviewControl.prototype = {

    /**
	 * @private
	 */
    ready: false,
	
    /**
	 * @private
	 */
    ZOOM_DIFF: 5,

    /**
	 * @private
	 */
    initElements: function(){   
        
        this.width = 120;
        this.height = 120;
        
        this.domElement = deCarta.crEl('div');
        this.domElement.style.position = 'absolute';
        this.domElement.className = 'deCarta-mapOverview';
        this.domElement.style.width = this.width;
        this.domElement.style.height = this.height;
        this.domElement.style.border = '2px solid gray';
        this.domElement.style.overflow = 'hidden';        
        
        this.mapControl = deCarta.crEl('div');
        this.mapControl.id = 'mapOverviewWindow';
        this.mapControl.style.width = '120px';
        this.mapControl.style.height = '120px';                
        this.domElement.appendChild(this.mapControl);
        
        var listener = this.sync.bind(this);
                              
        dCM.EventManager.listen('moveend', listener);
        if (!this.options.style == 'mobile') dCM.EventManager.listen('move', listener);
        dCM.EventManager.listen('zoomend', listener);
        this.position();        
        this.ready = true;         
    },
    
    /**
	 * This render method implements the render method from the 
	 * {@link dCM.MapControl} base class.
	 * It is responsible for rendering this control on the map,
	 * and produces a single HTML Dom Element containing the whole
	 * GUI for the control.
	 * @param {HTMLDOMElement} container The container which holds this control
	 */
    render: function(container){

        if (!this.ready) this.initElements();        
        this.position();
        container.appendChild( this.domElement );                
        
        if (!this.tinyMap) {
            var p = new dCM.Position(this.options.map.center.getLat(), this.options.map.center.getLon());
            
            this.tinyMap = new dCM.Map({
                id: this.mapControl.id,
                skipBindingToServer: true,
                skipResources: true,
                resizeable: false,
                draggable: this.options.style == 'mobile',
                doubleTapZoom: false,
                digitalZoom: false,
                easing: false,                
                center:  p,
                zoom: Math.max(1, this.options.map.zoom - this.ZOOM_DIFF),
                
                onReady: function(){
                    
                    this.tinyMap.addOverlay(this.areaOverlay);
                    this.areaOverlay.addObject(this.area);  

                }.bind(this)
            });
            
            this.areaOverlay = new dCM.MapOverlay({name : 'view'});
            this.area = new dCM.Polygon({
                vertices: this.options.map.getVisibleRect(),
                draggable: !(this.options.style == 'mobile'),
                scroll: this.tinyMap,
                onDrop: function(p){                    
                    this.preventRecenter = true;
                    this.options.map.centerOn(p);
                    this.tinyMap.centerOn(p);
                }.bind(this)
            });            

        }        
    },
    
    /**
	 * @private
	 */
    sync: function(param){
        //console.log('Event', param, param.map == this.tinyMap);
        if (param.map != this.tinyMap){
            this.area.setVertices(this.options.map.getVisibleRect());
            
            if (this.recenterFromMain) {
                this.recenterFromMain = false;
                return;
            }
                        
            if (param.center) this.tinyMap.centerOn(param.center, {animated: false});
            if (param.zoom) this.tinyMap.zoomTo(Math.max(1, param.zoom - this.ZOOM_DIFF));
        } else {
            if (this.preventRecenter) {
                this.preventRecenter = false;
                return;
            }
            this.recenterFromMain = true;
            if (param.center) this.options.map.centerOn(param.center, {animated : (this.options.style != 'mobile')});
        }
    }
	
	
}; //end OverviewControl prototype

//Extend the MapControl with the additional methods for OverviewControl
dCM.OverviewControl.prototype = dCM.Utilities.inherit(dCM.OverviewControl.prototype, dCM.MapControl.prototype);

/**
 * @class
 * OverlayObject is a base class that can be extended to create objects
 * suitable for display on a {@link dCM.MapOverlay}.
 * Pins {@link dCM.Pin}, Polylines {@link dCM.Polyline},
 * Circles {@link dCM.Circle}, Images {@link dCM.Image}, Polygons {@link dCM.Polygon} all extend this class.
 *
 * @description Base class for Map Overlay Objects
 *
 * @constructor
 * @param {options} opts Options are to be defined by the subclass.
 *
 * @see dCM.MapOverlay
 * @see dCM.Pin
 * @see dCM.Polyline
 * @see dCM.Circle
 * @see dCM.Image
 * @see dCM.Polygon
 */

dCM.OverlayObject = function(opts){
    
    this.useCSSTransforms = (dCM.Configuration.useHardwareAcceleration && deCarta.Window.hasCSSTransforms());
}


dCM.OverlayObject.prototype = {

    /**
     * Returns the object's position
     * @return dCM.Position
     */
    getPosition: function(){
        return this.options.position;
    },

    /**
     * Sets the css z-index of this overlay object. This allows the user to place
	 * page elements above or below this overlay.
	 * @param {int} z The css z-index
     */
    setZIndex: function(z){
        this.zIndex = z;
    },

    /**
     * Returns the size of the pin
     * @return object <pre>{width: int, height: int}</pre>
     */
    getSize: function(){
        if (!this.domElement) return {width: 0, height: 0};
        return {width: parseFloat(this.domElement.style.width), height: parseFloat(this.domElement.style.height)};
    },

    /**
     * Changes the position of the object. If the OverlayObject (or Pin)
	 * is registered with an overlay
     * it will also take care of having the MapOverlay update its spatial
     * indexes
     * @param {dCM.Position} position The new position.
     */
    setPosition: function(position){
        this.options.position = new dCM.Position(position.lat, position.lon);
        if (this.owner && this.owner.refreshObjects) this.owner.refreshObjects();
    },

    /**
     * Called by the subclass. Takes the domElement and positions it
     * either with regular css or css3 transforms based on the settings.
     */
    domPosition: function(x, y, element){   
        this.domX = x;
        this.domY = y;
        if (!element) element = this.domElement;
        x = Math.floor(x);
        y = Math.floor(y);

        if (!this.useCSSTransforms){
            element.style.top = y  + 'px';
            element.style.left = x  + 'px';
        } else {
            element.style.webkitTransform = "translate3d("+x+"px, "+y+"px, 0)";
            element.style.MozTransform = "translate3d("+x+"px, "+y+"px, 0)";
            element.style.OTransform = "translate3d("+x+"px, "+y+"px, 0)";
        }
    },
    
    /**
     * Called by the containing MapOverlay when a pin is added to it
     * Allows the overlay to be notified when a pin's position is changed
     * so it can rebuild its indexes.
     */
    registerOwner: function(owner){
        this.owner = owner;
    },

    /**
	 * @private
	 */
    setZoom: function(z){
        
    },

    /**
	 * Makes this OverlayObject visible
	 */
    show: function(){
        this.visible = true;
    },

    /**
	 * Makes this OverlayObject hidden
	 */
    hide: function(){
        this.visible = false;
    }


}
/**
 * @class
 * A Pin is used to graphically represent a position on the map.
 * It can have a custom image, and when clicked it can display some sort of custom text.
 * Add the pin to a map overlay using the {@link dCM.MapOverlay}:addObject()
 * method.
 * Pin extends {@link dCM.OverlayObject}.
 * 
 * @description An OverlayObject used to display a pin on a MapOverlay
 *
 * @constructor
 * @param options Options. May contain one or more of the following:
 * <ul>
 *  <li>(string) text: text diplayed on the pin label - optional, default=''</li>
 *  <li>{HTMLDOMElement} textElement: if this option is set, this will be an element that overrides the standard pin label</li>
 *  <li>{@link dCM.Position} position: the geographic position at which to place the pin, required</li>
 *  <li>(HTMLDOMElement) image: a DOM image element representing the pin</li>
 *  <li>(string) imageSrc: a string containing either the URI to an image or a base64 representation of the image</li>
 *  <li>(int) xOffset: Number of pixels to shift the pin to the left (set to half of the image width to center the image over the position on the map), optional, default=0</li>
 *  <li>(int) yOffset: Number of pixels to shift the pin up (set to the full height of the image to place the image above the position on the map), optional, default=0</li>
 *  <li>(function) onClick: a callback function that will be notified if the pin is clicked</li>
 *  <li>(function) onLabelClick: a callback that will be notified if the label is clicked</li>
 *  <li>(boolean) textVisible: Controls visibility of pin text. Default=false
 *      (click pin to toggle to true)</li>
 * </ul>
 *
 * @see dCM.OverlayObject
 * @see dCM.MapOverlay
 */

dCM.Pin = function(opts){
    dCM.OverlayObject.call(this, opts);

    /* Default option set b
     */
    this.options = {
        text: '',
        textElement: null,
        position: null,
        image: null,
        imageSrc: null,
        xOffset: 0,
        yOffset: 0,
        onClick: null,
        onLabelClick: null,
        textVisible: false,
        textBackground: '#EDEDED',
        textZIndex: 1000,
        textBorderColor: '#666666',
        textBorderWidth: 2
        
    }

    this.zIndex = 1;
    this.options = dCM.Utilities.extendObject(this.options, opts);

    this.type = 'pin';
    
    this.domElement = null; 

    this.textEnabled = true;

    dCM.EventManager.listen('showPinText', this.pinTextShown.bind(this));

}

//Define methods to extend Pin
dCM.Pin.prototype = {

    /**
     * Sets the image element that will be used for the pin
     * @param {Image} image the image
     * @param {int} xOffset Number of pixels to shift the image to the left of the pin position (use half the image width to center on position) (Optional, default=0)
     * @param {int} yOffset Number of pixels to shift the image upward (use the full image height to place image above position) (Optional, default=0)
     */
    setImage: function(image, xOffset, yOffset){
        this.options.image = image;
        if (xOffset) this.options.xOffset = xOffset;
        if (yOffset) this.options.yOffset = yOffset;
        if (this.domElement)
            this._render(parseFloat(this.domElement.style.left), parseFloat(this.domElement.style.top), true );
    },

    /**
     * Sets a src value for the pin's image
     * @param {HTMLDOMElement} imageSrc Source of the image (you can use imageSrc to convert from a URI or base64 string)
     * @param {int} xOffset The NEW Number of pixels to shift the image to the left of the pin position (use half the image width to center on position) (Optional, default=0)
     * @param {int} yOffset The NEW Number of pixels to shift the image upward (use the full image height to place image above position) (Optional, default=0)
     */
    setImageSrc: function(imageSrc, xOffset, yOffset){
        this.options.imageSrc = imageSrc;
        if (xOffset) this.options.xOffset = xOffset;
        if (yOffset) this.options.yOffset = yOffset;
        if (this.domElement)
            this._render(parseFloat(this.domElement.style.left), parseFloat(this.domElement.style.top), true );
    },

    /**
	 * Returns the current image for the pin
	 * @return {HTMLDOMElement} The HTML DOM Element of the image for the pin
	 */
    getImage: function(){

        return (this.options.image || this.options.imageSrc);
    },

    /** Sets the text to be displayed above the pin (when the pin is selected)
	 * @param {string} text String to associate with pin
	 */
    setText: function(text){
        this.options.text = text;
        this._render();
    },
    
	/** Sets the rotation angle of the pin
	 * @param {float} angle Angle to rotate the pin, counter-clockwise
	 */
    setRotation: function(angle){
                
        this.pinImage.style.MozTransform = 'rotate(-'+Math.round(angle)+'deg)';
        this.pinImage.style.webkitTransform = 'rotate(-'+Math.round(angle)+'deg)';
        this.pinImage.style.WebkitTransform = 'rotate(-'+Math.round(angle)+'deg)';
        this.pinImage.style.oTransform = 'rotate(-'+Math.round(angle)+'deg)';
        this.pinImage.style.OTransform = 'rotate(-'+Math.round(angle)+'deg)';        
    },

    /**
     * @private
	 * Callback function the pin registers with the EventManager for the
     * pinTextShown event. Allows the pin to hide it's infowindow when
     * another pin is opened.
     */
    pinTextShown: function(params){
        
        if (this == params.pin) return;
       
        if (this.textView) this.textView.style.display = 'none';
    },

    /**
	 * @private
     * Generates the necessary dom elements.
     * Returns the main element to the caller for insertion in the DOM.
     * @return HTMLDomElement
     */
    render: function(x, y){
        
        if (!this.domElement) this.domElement = this._render();
        this.domPosition(x, y);

        return this.domElement;
    },

    /**
	 * @private
     * Actual internal rendering. This *really* creates the elements. 
     */
    _render: function(x, y, skipListeners){

        if (typeof skipListeners === 'undefined') skipListeners = false;
        //get the x and y
        
        //create main element
        if (!this.domElement){
            this.domElement = deCarta.crEl('div');
            this.domElement.style.position = 'absolute';
            this.domElement.className = 'deCarta-Mobile-Pin';
            this.domElement.style.zIndex = this.zIndex;
            this.domElement.pin = this;
            this.domElement.id = ("deCarta-pin-" + Math.random()).replace(".", "");
        }

        
        //create the image        
        if (this.options.imageSrc){
            if (this.pinImage) {
                dCM.Utilities.domRemove(this.pinImage);
                delete this.pinImage;
            }
            
            this.pinImage = new Image();
            this.pinImage.style.display = 'none';
            this.pinImage.onload = function(){
                this.style.display = 'block'
                }
            this.pinImage.src = this.options.imageSrc;
        } else {
            if (this.options.image){                
                this.pinImage = this.options.image;
            } else {                
                this.pinImage = dCM.ImagePack.pinDefaultImage.cloneNode(true);
            }
        }       
        
        this.pinImage.style.position = 'absolute';
        this.pinImage.style.top = '-' + this.options.yOffset + 'px';
        this.pinImage.style.left = '-' + this.options.xOffset + 'px';

        if (this.options.text || this.options.textElement){
            try {
                if (this.textView) {
                    dCM.Utilities.domRemove(this.textView);
                    delete this.textView;
                }

                this.textView = deCarta.crEl('div');
                this.textView.style.cssText = 'background-color:'+this.options.textBackground+';'+
                'border:'+this.options.textBorderWidth+'px solid '+this.options.textBorderColor+';'+
                'font-size:12px;'+
                'line-height:1.3em;'+
                'margin:10px auto;'+
                'padding:5px;'+
                'position:absolute;'+
                'text-align:center;'+
                'z-index: ' + this.options.textZIndex + ';' +
                //'width:'+this.options.textWidth+'px;'+
                '-moz-border-radius:10px;'+
                '-webkit-border-radius:10px;'+
                'border-radius:10px;'+
                '-moz-box-shadow:0 0 5px #888888;'+
                '-webkit-box-shadow:0 0 5px #888888;'+
                'box-shadow:0 0 5px #888888;'+
                'font-family: Arial';

                if (this.options.text){
                    var t = deCarta.crEl('div');
                    t.style.color = '#222';
                    t.innerHTML = this.options.text;
                    this.options.textElement = t;
                } 
                if (this.options.textElement){
                    this.textView.appendChild(this.options.textElement);
                }

                this.arrowBorder = deCarta.crEl('div');
                this.arrowBorder.style.cssText = 'border-color: '+this.options.textBorderColor+' transparent transparent transparent;'+
                'border-style: solid;'+
                'border-width: 10px;'+
                'height:0;'+
                'width:0;'+
                'position:absolute;'+
                'bottom:-22px;'+
                'left:30px;';

                this.textArrow = deCarta.crEl('div');
                this.textArrow.style.cssText = 'border-color: '+this.options.textBackground+' transparent transparent transparent;'+
                'border-style: solid;'+
                'border-width: 10px;'+
                'height:0;'+
                'width:0;'+
                'position:absolute;'+
                'bottom:-19px;'+
                'left:30px;';

                this.textView.appendChild(this.arrowBorder);
                this.textView.appendChild(this.textArrow);

                if (typeof this.options.onLabelClick === 'function'){                   
                    deCarta.Touch.attachListener('tap', this.textView, this.options.onLabelClick, true);
                }
                this.textView.style.bottom = (this.options.yOffset ) + 'px';
                this.textView.style.display  = (!this.options.textVisible) ? 'none' : 'block';
                this.prepareInfoWin();
            } catch (e) {
                console.log('Pin', e);
            }
        }

        if (!skipListeners){        
            deCarta.Touch.attachListener('tap',this.domElement, function(ev){
                if (this.options.onClick){
                    if (!this.options.onClick(this, ev)) return;
                }
                if (this.textView){
                    if (this.textView.style.display == 'block'){                            
                        this.hideText();
                    } else {                            
                        this.showText();
                    }
                }
            }.bind(this), true);

        }

        //put image in main element,        
        this.domElement.appendChild(this.pinImage);

        if (this.textView) this.domElement.appendChild(this.textView);

        return this.domElement;
        

    },

    /**
	 * @private
	 */
    prepareInfoWin: function(){

        // if (!this.options.text) return;
        /*this.textView.style.width = '100px';
        */
        
        var w = this.options.textElement.clientWidth; //offsetWidth        
        
        if (w == 0) return;
                
        if (w < 80) w = 120;
        
        this.textView.style.width = w + 'px';
        this.textView.style.left = - (w / 2) - 5 + 'px';

        this.arrowBorder.style.left = (parseFloat(this.textView.style.width) - 10) / 2 + 'px';
        this.textArrow.style.left = (parseFloat(this.textView.style.width) - 10) / 2 + 'px';

    },

    /**
     * Hides the text for this pin
     */
    hideText: function(){       
        dCM.EventManager.trigger('hidePinText', {
            pin: this
        });
        this.textView.style.display = 'none';
    },

    /**
     * Unhides the text for this pin
     */
    showText: function(){

        if  (!this.textEnabled) return;
        dCM.EventManager.trigger('showPinText', {
            pin: this
        });
        this.textView.style.display = 'block';
        this.prepareInfoWin();
    },

    /**
     * Disables the text for this pin
	 * This both hides the text, and disables the text from appearing the 
	 * next time the pin is clicked.
     */
    disableText: function(){
        this.hideText();
        this.textEnabled = false;
    },

    /**
	 * Enables the text for this pin
	 * If the text was disabled, it will not appear when the pin is clicked.
	 * Enabling the text re-enables the appear-on-click functionality.
	 */
    enableText: function(){
        this.textEnabled = true;
    },
    
    /**
     * Defines a new callback for the click event. 
     */
    click: function(fn){
        this.options.onClick = fn;
    }

}; //end Pin prototype

//Extend the OverlayObject with the additional methods for Pin
dCM.Pin.prototype = dCM.Utilities.inherit(dCM.Pin.prototype, dCM.OverlayObject.prototype);

/**
 * @private
 * Used by the MapOverlay to cluster pins together. Not an end-user class. 
 */
dCM.ClusteredPin = function(opts){

    dCM.OverlayObject.call(this, opts);

    this.options = {
        threshold: 50,
        zoom: null,
        onClick: function(){}
    }

    this.options = dCM.Utilities.extendObject(this.options, opts);

    if (!this.options.zoom)
        deCarta.Exception.raise('You cannot instantiate a ClusteredPin without specifying the zoom');

    this.pin = null;
    this.cluster = null;
    this.point = null;
    this.threshold = 40;
    this.domElement = null;

}

dCM.ClusteredPin.prototype = {

    /**
     * Attempts to add a pin to the cluster.
     * returns true if successful, false if pin is outside cluster
     */
    addPin: function(pin){
        if (!this.cluster) {
            this.cluster = [];
            this.cluster.push(pin);
            
            this.options.position = pin.getPosition();
            this.centerPoint = this.options.position.getPixelPoint(this.options.zoom);
            
            return true;
        } else {
            var newPoint = pin.getPosition().getPixelPoint(this.options.zoom);
            if (dCM.Utilities.pixelDistance(this.centerPoint, newPoint) < this.options.threshold){
                this.cluster.push(pin);
                return true;
            } else {
                return false;
            }
        }
    },

    render: function(x, y){
        if (this.cluster.length == 1) return this.cluster[0].render(x, y);

        var zIndex = this.cluster[0].zIndex;

        if (!this.domElement){
            this.domElement = deCarta.crEl('div');
            this.domElement.className = 'deCarta-mob-pinCluster';
            this.domElement.style.zIndex = zIndex;
            this.domElement.id = ("deCarta-pin-" + Math.random()).replace(".", "");
            
            this.domElement.style.position = 'absolute';
            this.imgElement = this.chooseIcon();
            this.imgElement.style.position = 'absolute;'            

            this.labelElement = deCarta.crEl('div');
            this.labelElement.className = 'deCarta-mob-pinCluster-label';
            this.labelElement.style.cssText = 'text-align: center; \n\
                    width: 20px;\n\
                    height: 18px;\n\
                    border-radius: 10px; \n\
                    -moz-border-radius: 10px; \n\
                    position: absolute; \n\
                    top: -3px; \n\
                    left: -3px; \n\
                    padding: 0px; \n\
                    border: 2px solid white; \n\
                    background-color: #A00; \n\
                    color: #FFF; \n\
                    font-size: 12px; \n\
                    font-family: arial; \n\
                    font-weight: bold;\n\
                    background-image: -webkit-gradient(radial, 12 12, 12, 12 12, 2, from(#FC0505), to(#9C090E));\n\
                    background-image: -moz-radial-gradient(20% 20% 90deg,circle cover, #9C090E, #FC0505);\n\
                    text-shadow: 1px 1px 1px #333333;\n\
                    -moz-box-shadow: 2px 2px 2px #333;\n\
                    -webkit-box-shadow: 2px 2px 2px #333;\n\
                    box-shadow: 2px 2px 2px #333;\n\
                    padding-top: 2px';



            this.domElement.appendChild(this.imgElement);
            this.domElement.appendChild(this.labelElement);

            deCarta.Touch.attachListener('tap', this.domElement, this.onClick.bind(this), false);
        }

        var img = dCM.ImagePack.get('pinDefaultImage');

        var iHeight = parseFloat(img.style.height);
        var iWidth = parseFloat(img.style.width);

        this.domPosition(x - (iWidth / 2), y - iHeight);

        /*this.domElement.style.top  = y - iHeight + 'px';
        this.domElement.style.left = x - (iWidth / 2)+ 'px';*/


        this.labelElement.innerHTML = this.cluster.length;
        
        return this.domElement;
    },

    chooseIcon: function(){

        var candidate = this.cluster[0].getImage();


        for (var i = 1 ;i < this.cluster.length; i++){
            if (typeof candidate !== 'string') {
                if (this.cluster[i].getImage().src != candidate.src) return dCM.ImagePack.get('pinDefaultImage');
            } else {
                if (this.cluster[i].getImage() != candidate) return dCM.ImagePack.get('pinDefaultImage');
            }
        }

        var img = new Image();
        if (typeof candidate === 'string') {           
            img.src = candidate;            
        }
        else {
            img.src = candidate.src;
            img.style.width = candidate.style.width;
            img.style.height = candidate.style.height;
        }
        return img;
    },

    onClick: function(){
        this.options.onClick(this.cluster);
    },

    getList: function(){
        return this.cluster;
    }


}; //end ClusteredPin prototype

//Extend the OverlayObject with the additional methods for ClusteredPin
dCM.ClusteredPin.prototype = dCM.Utilities.inherit(dCM.ClusteredPin.prototype, dCM.OverlayObject.prototype);

 /**
 * @class
 * Polyline is a map overlay object used to draw a complex line
 * (such as a route) on the map.
 * It extends {@link dCM.OverlayObject}.
 * Use the {@link dCM.MapOverlay}:addObject() method to add 
 * this object to a map overlay.
 * (for example a route).
 * <p><b>POINT INDEXES AND THINNING</b></p>
 * <p>
 * When a line is rendered, all the points are indexed by the tile they
 * fall on  to, given the zoom level. On zoom level changes, a new
 * index is built.  
 *</p>
 *<p>
 * Creating the index is a linear operation, we look at each point and assign it
 * to a tile key. The index structure is an object with properties named as
 * tile keys which contain an array of indexes referring to the list of
 * positions that make up the polyline.
 *</p>
 * For example :
 *<pre>
 * var index = [
 *      10: {
 *          '10_-347_113' : [0, 34]
 *      }
 * ]
 *</pre>
 *<p>
 * <b>NOTE:</b> the indexes refer to the genGeom array, which contains (by zoom lev)
 * the generalized geometry (contiguous points). These indexes contain indexes into
 * the real geometry.
 *</p>
 *<p>
 * This means we have an index built for level 10, and tile 10, -347, 133 contains
 * points 0 and 34 of our positions array.
 *</p>
 * Points in the index have already undergone thinning (in fact it is part of
 * the same linear operation that builds the index) so they can simply be taken
 * and drawn on screen. 
 *
 * @description An OverlayObject used to display a polyline on a MapOverlay
 *
 * @constructor
 * @param {object} opts Options. May contain one or more of the following
 * <ul>
 *  <li>lineGeometry: Array of point geometry in string format - required</li>
 *  <li>fillColor: A polyline has thickness, and therefore has a fill color
 *      - optional, default '#000'</li>
 *  <li>strokeColor: Color hat will be used to stroke the line
 *      - optional, default '#0000FF'</li>
 *  <li>strokeSize: Size of the line, in pixels - optional, default 6</li>
 *  <li>strokeOpacity: Opacity of the line (1.0 = opaque, 0.0 = transparent)
 *      - optional, default 0.6</li>
 * </ul>
 *
 * @see dCM.OverlayObject
 * @see dCM.MapOverlay
 */

dCM.Polyline = function(opts){
    dCM.OverlayObject.call(this, opts);
    //check if lineGeomtry is an array of pos
    if (!opts.lineGeometry || opts.lineGeometry.length == 0)
        dCM.Exception.raise('You need to provide a lineGeometry to instantiate a polyline');

    this.options = {
        lineGeometry: null,
        fillColor: '#000',
        strokeColor: '#0000FF',
        strokeSize: 6,
        strokeOpacity: 0.6,
        granularity: 7 //not documented
    }

    this.pointIndex = [];
    this.genGeom = []; //array of generalized geometry, per zoom level 
    
    this.options = dCM.Utilities.extendObject(this.options, opts);

    this.positions = [];

    this.lastRenderedPointSet = null;

    for(var i = 0; i< this.options.lineGeometry.length; i++){
        var ll = this.options.lineGeometry[i].split(' ');
        tPos = new dCM.Position(ll[0], ll[1]);
        this.positions.push(tPos);
    }


    this.type = 'shape';

    this.svgRendering = document.implementation.hasFeature("http://www.w3.org/TR/SVG11/feature#BasicStructure", "1.1");    

    //dCM.App.map.debugInfo.polyLineRenderingMode = (this.svgRendering) ? 'SVG' : 'Canvas';

    this.padding = 5;

    this.findBounds();    

    this.svgElement = null;
}


//Define methods to extend Polyline
dCM.Polyline.prototype = {
    /**
     * Overrides the standard {@link dCM.OverlayObject}:getPosition() method
     * @return {dCM.Position} Returns the top left geographic position of the polyline's bounding rectangle
     */
    getPosition: function(){
        return this.topLeftPoint;
    },
  
    /**
     * Returns size of the polyline's bounding box at a given zoom level
     * @param {int} z zoom level (20=maxzoom, 1=minzoom)
     * @return {width|height} Size of the geographic bounding box of the polyline
     * */
    getSize: function(z){
        var top = this.topLeftPoint.getY(z);
        var left = this.topLeftPoint.getX(z);

        var bottom = this.btmRightPoint.getY(z);
        var right = this.btmRightPoint.getX(z);

        return {width: right - left ,height: top - bottom}
    },

    /**
     * Returns the best center (Position) and Zoom (int) to display this polyline
     * @param {dCM.Map} map The current map view
	 * @return {zoom|center} Ideal zoom level (1 to 20), and center position {@link dCM.Position}
     */
    getIdealCenterAndZoom: function(map){
        var res = {
            zoom: null,
            center: null
        };
        //i use the bounds i already have.
        //i suppose. ... .. .. ..
        //i will get the pixel dx and dy for the box
        //then i will go through the zoom levels and get
        //the pixel bounding box for the map at that level
        //compare, find the right one - have zoom
        for (var z = 20; z > 0; z --){
            
            var x1 = this.topLeftPoint.getX(z);
            var y1 = this.topLeftPoint.getY(z);
            var x2 = this.btmRightPoint.getX(z);
            var y2 = this.btmRightPoint.getY(z);
            
            var dX = Math.abs(x2 - x1);
            var dY = Math.abs(y2 - y1);

            if (dX <= map.width && dY <= map.height){
                res.zoom = z; 
                break;
            }
        }
        //then find the center point for the box
        //convert to latlong, have center.
        var x = (this.topLeftPoint.getX(res.zoom) + this.btmRightPoint.getX(res.zoom)) / 2;
        var y = (this.topLeftPoint.getY(res.zoom) + this.btmRightPoint.getY(res.zoom)) / 2;

        var center = new dCM.Position();
        center.setXY(x, y, res.zoom);
        res.center = center;        
        
        return res;
    },

    /**
     * @private
     */
   /* setZoom: function(z){
        var baseSize = 6;
        var baseZoom = 20;        
        var newSize = baseSize * Math.pow(2,(baseZoom - z));
        
     //   this.svgElement.setAttribute('style', "fill:none;stroke:blue;stroke-width:" + newSize);
    },*/
    
    /**
     * @private
     */
    render: function(x, y, z, tiles){

        if (this.svgRendering){
            return this.renderSVG(x, y, z, tiles);
        } else {
            return this.renderCanvas(x, y, z, tiles);
        }
    },

    /**
     * @private
     */
    renderSVG: function(x, y, z, tiles){

        if (!this.svgElement) {

            this.findBounds();
            this.svgElement = document.createElementNS("http://www.w3.org/2000/svg", "svg");
            this.svgElement.setAttribute("version", "1.1");
            this.svgElement.setAttribute("id", ("deCarta-shape-svg-" + Math.random()).replace(".", ""));
            this.svgElement.style.zIndex = this.zIndex;
        }

        if (!this.lineElement){
            this.lineElement = document.createElementNS("http://www.w3.org/2000/svg", "polyline");
            this.svgElement.appendChild(this.lineElement);
        }

        this.indexAndThinPoints(z);

        var nz = dCM.Utilities.normalizeZoom(z);
        

        var pStr = '';
        var dX = this.topLeftPoint.getX(z);
        var dY = this.topLeftPoint.getY(z);

        var points = this.preparePoints(z, dX, dY, tiles);

        //dCM.App.map.debugInfo.routePoints = points.length;

        //

        for (var i = 0; i < points.length; i++){
            var p = points[i];
            pStr += p.x + ',' + p.y + ' ';
        }
        this.lineElement.setAttribute('points', pStr);
        this.lineElement.setAttribute('style', "fill:none;stroke:"+this.options.strokeColor+";stroke-width:"+this.options.strokeSize+";stroke-opacity:"+this.options.strokeOpacity);

        var dim = this.getSize(z);

        this.svgElement.setAttribute('style', "position: absolute; width: " + (dim.width + 10) + "px; height: " + (dim.height + 10) + "px;");
        this.domPosition((x - 5),(y - 5), this.svgElement);
        //this.svgElement.setAttribute('style', "position: absolute; width: " + (dim.width + 10) + "px; height: " + (dim.height + 10) + "px; top: " + (y - 5) + "px; left: " + (x - 5) + "px;")

        return this.svgElement;
    },

    /**
     * @private
     */
    renderCanvas: function(x, y, z, tiles){

        if (!this.canvasElement){
            this.findBounds();
            this.canvasElement = deCarta.crEl('canvas');
            this.canvasElement.setAttribute("id", "deCarta-shape-canvas-" + new Date().getTime());
            this.canvasElement.style.zIndex = this.zIndex;
        }

        this.indexAndThinPoints(z);
                
        var dim = this.getSize(z);
        var topClip = 0;
        var leftClip = 0;

        //clipping .. otherwise this is terrible.

        if (x < 0) {
            leftClip = x;
            x = 0;
        }
        if (y < 0) {
            topClip = y;
            y = 0;
        }
        if (x + dim.width > window.innerWidth) dim.width = window.innerWidth - x;
        if (y + dim.height > window.innerHeight) dim.height = window.innerHeight - y;

        this.canvasElement.setAttribute('style', "position: absolute;");
        this.domPosition((x - this.padding), (y - this.padding), this.canvasElement);

//        this.canvasElement.setAttribute('style', "position: absolute; top: " + (y - this.padding) + "px; left: " + (x - this.padding) + "px;");

        //maybe we can skip this rendering? depends.
        if (z == this.lastZ &&
            leftClip == this.lastLeftClip &&
            topClip == this.lastTopClip &&
            dim.width == this.lastWidth &&
            dim.height == this.lastHeight){
            
            return this.canvasElement;

        }

        this.lastZ = z;
        this.lastLeftClip = leftClip;
        this.lastTopClip = topClip;
        this.lastWidth = dim.width;
        this.lastHeight = dim.height;

        this.canvasElement.width = dim.width + (this.padding*2);
        this.canvasElement.height = dim.height+ (this.padding*2);

        var dX = this.topLeftPoint.getX(z) - leftClip;
        var dY = this.topLeftPoint.getY(z) + topClip ;


        var ctx = this.canvasElement.getContext('2d');
        ctx.beginPath();        

        var points = this.preparePoints(z, dX, dY, tiles);

        //dCM.App.map.debugInfo.routePoints = points.length;

        var moved = false;
        
        for (var i = 0; i < points.length; i++){
            p = points[i];
            if (!moved) {
                ctx.moveTo(p.x, p.y);
                moved = true;
            }
            else ctx.lineTo(p.x, p.y);
        }

        ctx.strokeStyle = this.options.strokeColor;
        ctx.lineWidth = this.options.strokeSize;
        ctx.globalAlpha = this.options.strokeOpacity;
        ctx.lineCap = 'round';

        ctx.stroke();
        
        return this.canvasElement;

    },

    /**
     * @private
     */
    indexAndThinPoints: function(z){
        //Check the point index
        var nz = dCM.Utilities.normalizeZoom(z);
        if (!this.pointIndex[nz]){

            var tile = null;
            var key = null;
            var posLength = this.positions.length;
            //use these to thin out teh points.
            var lastPoint = null;
            var tx = 0;
            var ty = 0;
            var distance = null;

            this.pointIndex[nz] = {};
            this.genGeom[nz] = [];

            for (var i = 0; i < posLength; i++){
                var p = this.positions[i];

                tx = p.getX(z);
                ty = p.getY(z);

                if (lastPoint){
                    distance = Math.sqrt(Math.pow(tx - lastPoint.x, 2) + Math.pow(ty - lastPoint.y, 2));
                }

                if (distance > this.options.granularity || !lastPoint || i == (posLength - 1)){
                    tile = p.getTileAtZoom(nz);
                    key = dCM.Utilities.getTileKey(tile.E, tile.N, nz);
                    if (!this.pointIndex[nz][key]) this.pointIndex[nz][key] = [];

                    this.genGeom[nz].push(i);
                    //keep only a ref to the index here
                    // so this is an index into this.genGeom[nz] which is in turn
                    // an index into the geometry. just so u know.. 
                    this.pointIndex[nz][key].push( this.genGeom[nz].length - 1 );

                    lastPoint = {x: tx, y: ty};
                }
            }
        }
    },

    /**
     * @private
     */
    preparePoints: function(z, dX, dY, tiles){

        var points = [];
        var nz = dCM.Utilities.normalizeZoom(z);
        var p = null;
        var px = null;
        var py = null;

        for (var i = 0; i< tiles.length; i++){
            var key = dCM.Utilities.getTileKey(tiles[i].E, tiles[i].N, nz);
            if ( this.pointIndex[nz][key])
                for (var j= 0; j< this.pointIndex[nz][key].length; j++){

                    p = this.positions[this.genGeom[nz][this.pointIndex[nz][key][j]]];
                    px = p.getX(z) - dX + this.padding;                    
                    py = dY - p.getY(z) + this.padding;

                    points.push({x: px, y: py, i: this.pointIndex[nz][key][j]});
                }
        }

        points.sort(function(a,b){return a.i - b.i});

        /* THIS IS THE NEW SECTION
         *
         * Now for the crazy fun.
         * 1 - Divide into segments.
         * 2 - Add (if available) one point per side for each segment
         * 3 - sort by idx
         * 4 - ???
         * 5 - profit!!! */


        var lastAdded = null;
        var d = null;
        var additional = [];

        //anti copy-paste funtion.
        var padding = this.padding;
        function addToPoints(d, i){
            //return false;
            if (d) {
                px = d.getX(z) - dX + padding;
                py = dY - d.getY(z) + padding;

                additional.push({x: px, y: py, i: i});
            }
        }


  /*      var s = '';
        for (j = 0; j < points.length; j++){
            p = points[j];
            s += p.i + ', ';
        }
        console.log('Sequence : ', s, window.stopme);

        if (window.stopme) {
            console.log('YES!');
            debugger;
        }*/

        for (j = 0; j < points.length; j++){
            p = points[j];
            
            if (!lastAdded){
                if (p.i != 0){                    
                    //add the prev point
                    d = this.positions[this.genGeom[nz][p.i - 1]];
                    addToPoints(d, p.i - 1);
                }
            } else if (lastAdded < p.i - 1) {                
                //there is a gap. ah, a gap. add both sides
                d = this.positions[this.genGeom[nz][lastAdded + 1]];
                addToPoints(d, lastAdded + 1);

                d = this.positions[this.genGeom[nz][p.i - 1]];
                addToPoints(d, p.i - 1);
            }
            lastAdded = p.i;
        }

        //add the last point
        d = this.positions[this.genGeom[nz][lastAdded + 1]];
        addToPoints(d, lastAdded + 1);

        points = points.concat(additional);

        points.sort(function(a,b){return a.i - b.i});
/*
        s = '';
        for (j = 0; j < points.length; j++){
            p = points[j];
            s += p.i + ', ';
        }
        console.log('Sequence after additions: ', s);*/

        /* THIS IS THE END OF THE NEW METHOD */


        /* This is the old section. */

        /* SO :
         *
         * In case we have 0 points, we MIGHT have a situation where our points
         * are offscreen, but the segment is on screen. SO... we render the last
         * set of points we rendered, and see. Not sure this is good, but maybe. 
         *
         * */
     /*   if (points.length == 0){
            if (z > 10){ //maybe ?
                if (this.lastRenderedPointSet){                    
                    points = this.lastRenderedPointSet.slice(0);
                }
            }
        } else {
            this.lastRenderedPointSet = points.slice(0);
        }


        /* now sort, and then add first and last*/

        
/*
        //get first and last points, add a point beyond them (if we have such a point)
        if (points.length > 0){
            var firstIdx = points[0].i;
            var lastIdx = points[points.length - 1].i;

            if (this.positions[this.genGeom[nz][firstIdx - 1]]) {

                p = this.positions[this.genGeom[nz][firstIdx - 1]];
                px = p.getX(z) - dX + this.padding;
                py = dY - p.getY(z) + this.padding;

                points.unshift({x: px, y: py, i: firstIdx - 1});
            }

            if (this.positions[this.genGeom[nz][lastIdx + 1]]){

                p = this.positions[this.genGeom[nz][lastIdx + 1]];
                px = p.getX(z) - dX + this.padding;
                py = dY - p.getY(z) + this.padding;

                points.push({x: px, y: py, i: lastIdx + 1});
            }
        }*/


        /* This is the end of the old section*/

        return points;

    },

    /**
     * @private
     */
    findBounds: function(){

        this.topLeftPoint = null;
        this.btmRightPoint = null;

        var minX = null;
        var minY = null;
        var maxX = null;
        var maxY = null;

        for (var i = 0; i < this.options.lineGeometry.length; i++){
            var pt = new dCM.Position(this.options.lineGeometry[i]);
            
            var ptX = pt.getX(18);
            var ptY = pt.getY(18);

            if (ptX < minX || !minX) minX = ptX;
            if (ptY < minY || !minY) minY = ptY;

            if (ptX > maxX || !maxX) maxX = ptX;
            if (ptY > maxY || !maxY) maxY = ptY;

            delete pt;
        }

        this.topLeftPoint = new dCM.Position(0,0);
        this.btmRightPoint = new dCM.Position(0,0);

        this.topLeftPoint.setXY(minX, maxY, 18);
        this.btmRightPoint.setXY(maxX, minY, 18);
    }

}; //end Polyline prototype

//Extend the OverlayObject with the additional methods for Polyline
dCM.Polyline.prototype = dCM.Utilities.inherit(dCM.Polyline.prototype, dCM.OverlayObject.prototype);
 /**
 * @class
 *
 * Polygon is a map overlay object used to draw a polygon
 * on the map.
 * It extends {@link dCM.OverlayObject}.
 * Use the {@link dCM.MapOverlay}:addObject() method to add 
 * this object to a map overlay.
 *
 * @description An OverlayObject used to display a polygon on a MapOverlay
 *
 * @constructor
 * @param {object} options Options. May contain one or more of the following:
 * <ul>
 *  <li>(array of {@link dCM.Position}) vertices: Array of {@link dCM.Position}s comprising the vertices of the polygon</li>
 *  <li>(string) strokeColor: Color that will be used to stroke the line
 *      - optional, default '#0077D2'</li>
 *  <li>(int) strokeWidth: Size of the polygon border, in pixels - optional, default 2</li>
 *  <li>(string) fillColor: The fill color for the interior of the polygon
 *      - optional, default '#000'</li>
 *  <li>(float) opacity: Opacity of the line (1.0 = opaque, 0.0 = transparent)
 *      - optional, default 0.3</li>
 *  <li>(bool) draggable: <em>true</em> indicates that the polygon may be moved by the user - optional, default=false</li>
 * </ul>
 *
 * @see dCM.OverlayObject
 * @see dCM.MapOverlay
 */

dCM.Polygon = function(options){
    dCM.OverlayObject.call(this, options);
    
    this.options = {
        vertices: [],        
        strokeColor: '#0077D2',
        strokeWidth: 2,
        fillColor: '#0077D2',
        opacity: 0.3,
        draggable: false,
        scroll: null
    }

    this.options = dCM.Utilities.extendObject(this.options, options);

    this.type = 'shape';
    this.svgRendering = false; //document.implementation.hasFeature("http://www.w3.org/TR/SVG11/feature#BasicStructure", "1.1");
    this.svgElement = null;
    this.canvasElement = null;
    this.visible = true;

    this.padding = 5;

    if (this.options.vertices.length < 3)
        dCM.Exception.raise('Instantiating a polygon with too few vertices. I believe you need at least 3.');
    
    this.getPosition();
}


//Define methods to extend Polygon
dCM.Polygon.prototype = {
	
    /**
     * @private 
     */
    getPosition: function(){
        //if (this.position) return this.position;
        
        var lat = null;
        var lon = null;
        
        for (var i = 0; i < this.options.vertices.length; i++){
            
            var v = this.options.vertices[i];
            if (!lat || v.lat > lat) lat = v.lat;
            if (!lon || v.lon < lon) lon = v.lon;
            
        }
        
        this.position = new dCM.Position(lat,lon);
        
        
        return this.position;
    },
    
    /**
     * @private 
     */
    setPosition: function(p){
        
        var oPx = this.position.getPixelPoint();
        var nPx = p.getPixelPoint();
        
        var deltaX = oPx.x - nPx.x;
        var deltaY = oPx.y - nPx.y;               
        
        for (var i = 0; i < this.options.vertices.length; i++){
            var v = this.options.vertices[i];
            var vPx = v.getPixelPoint();
            vPx.x = vPx.x + deltaX;
            vPx.y = vPx.y + deltaY;
            v.setXY(vPx.x, vPx.y);
        }
        
        this.position = p;        
    },
    
    /**
     * @private 
     */
    getCenter: function(){
        var pos = this.getPosition().getPixelPoint();
        var size = this.getSize();
        var x = pos.x + (size.width / 2);
        var y = pos.y - (size.height / 2);
        var center = new dCM.Position(0,0);
        center.setXY(x,y,21);
        return center;        
    },
    
    /**
     * @private 
     */
    getSize: function(z){
        
        var pxPos = {x: null, y: null};
        
        for (var i = 0; i < this.options.vertices.length; i++){
            var v = this.options.vertices[i];
            var px = v.getPixelPoint(z);
            if (pxPos.x == null || pxPos.y == null) pxPos = px;
            if (pxPos.x < px.x) {
                pxPos.x = px.x;
            }
            if (pxPos.y > px.y) {                
                pxPos.y = px.y;
            }
        }
        
        var tlPx = this.position.getPixelPoint(z);
        
        return {width: pxPos.x - tlPx.x, height: tlPx.y - pxPos.y};
        
    },    
    
    /**
     * @private 
     */
    setVertices: function(verts){
        this.options.vertices = verts;
    },
    
    /**
     * @private 
     */
    startDrag: function(ev){
        this.dragging = true; 
        this.startDragX = ev.pageX;
        this.startDragY = ev.pageY;
        this.startDragPos = this.getPosition();
    },
    
    /**
     * @private 
     */
    stopDrag: function(ev){        
        this.dragging = false;
        if (this.options.onDrop) this.options.onDrop(this.getCenter());
    },
    
    /**
     * @private 
     */
    drag: function(ev){        
        if (!this.dragging) return;
        var deltaX = ev.pageX - this.startDragX;
        var deltaY = ev.pageY - this.startDragY;
        this.startDragX = ev.pageX;
        this.startDragY = ev.pageY;
        /*
        var posX = this.startDomX + deltaX;
        var posY = this.startDomY + deltaY;
        
        this.domPosition(posX, posY, this.canvasElement);*/
        
        var posPx = this.startDragPos.getPixelPoint(this.owner.owner.zoom)
        //find new position 
        //console.log(posPx, deltaX, deltaY, this.startDragPos);
        posPx.x -= deltaX;
        posPx.y += deltaY;
        var p = new dCM.Position(0,0);
        p.setXY(posPx.x, posPx.y, this.owner.owner.zoom);
        //console.log(p);
        this.setPosition(p);
        this.owner.owner.render();
        this.startDragPos = this.getPosition();
        
        
        if (this.options.scroll){        
            /* So, scroll is a map. uh. */
            /* if (posX < 0){
             //   this.options.scroll.pan('east', posX);
            }*/
        }
        
    },    
    
    /**
     * @private 
     */
    render: function(x, y, z, tiles){
        if (!this.visible) return;
        try {
            return this.renderCanvas(x, y, z, tiles);
        } catch (e){
            console.log('Error rendering poly : ', this, x, y, z);
        }
        
    },
    
    /**
     * @private 
     */
    renderCanvas: function(x, y, z, tiles){                
        
        if (!this.canvasElement){            
            this.canvasElement = deCarta.crEl('canvas');
            this.canvasElement.setAttribute("id", ("deCarta-shape-" + Math.random()).replace(".", ""));
            this.canvasElement.className = 'deCarta-polygon';
            this.canvasElement.style.zIndex = this.zIndex;
            this.canvasElement.style.position = 'absolute';
            
            /* Is it draggable? WHY */
            
            if (this.options.draggable){
                //attach listenators. 
                deCarta.Touch.attachListener('touchstart', this.canvasElement, this.startDrag.bind(this), true)
                deCarta.Touch.attachListener('touchend', this.canvasElement, this.stopDrag.bind(this), true)
                deCarta.Touch.attachListener('touchmove', this.canvasElement, this.drag.bind(this), true)
            }
            
        }
        
        var size = this.getSize(z);
        
        this.domPosition((x - this.padding), (y - this.padding), this.canvasElement);

        /* Now render the stuff whatever */
        
        var newW = size.width + (this.padding * 2);
        var newH = size.height + (this.padding * 2);
        
        if (newW != this.canvasElement.width || newH != this.canvasElement.height) {

            this.canvasElement.width = newW;
            this.canvasElement.height = newH;  

            var ctx = this.canvasElement.getContext("2d"); 

            ctx.strokeStyle = this.options.strokeColor;
            ctx.lineWidth = this.options.strokeWidth;
            ctx.fillStyle = this.options.fillColor;
            ctx.globalAlpha = this.options.opacity;

            ctx.beginPath();


            var absPos = this.getPosition().getPixelPoint(z);

            for (var i = 0; i < this.options.vertices.length; i++){
                var v = this.options.vertices[i];
                var pos = v.getPixelPoint(z);

                var dx = pos.x - absPos.x  + this.padding;
                var dy =  absPos.y - pos.y + this.padding;

                if (i == 0) ctx.moveTo(dx, dy);
                else ctx.lineTo(dx, dy);            

            }
            ctx.closePath();
            ctx.fill();
            ctx.stroke();
        }
        return this.canvasElement;
    },
    
    /**
     * @private 
     */
    renderSvg: function(){
        
    }
    
    
}; //end Polygon prototype

//Extend the OverlayObject with the additional methods for Polygon
dCM.Polygon.prototype = dCM.Utilities.inherit(dCM.Polygon.prototype, dCM.OverlayObject.prototype);

/**
 * @class
 * Circle is used to display a circle on the map.
 * It extends {@link dCM.OverlayObject}.
 * Use the {@link dCM.MapOverlay}:addObject() method to add
 * this object to a map overlay.
 *
 * @description A map overlay object used to draw a polygon
 *
 * @constructor
 * @param {object} options Options. May contain one or more of the following:
 * <ul>
 *  <li>{@link dCM.Position} position: The position of the center of the circle - required</li>
 *  <li>radius: The radius of the circle in meters - optional, default 500</li>
 *  <li>strokeColor: Color of the circle border - optional, default '#0077D2'</li>
 *  <li>strokeWidth: Thickness of the circle border, in pixels - optional, default 2</li>
 *  <li>fillColor: Fill color of the circle - optional, default '#0077D2'</li>
 *  <li>opacity: Opacity of the circle (1.0 = opaque, 0.0 = transparent) - optional, default 0.3</li>
 * </ul>
 *
 * @see dCM.OverlayObject
 * @see dCM.MapOverlay
 */

dCM.Circle = function(options){
    dCM.OverlayObject.call(this, options);
    this.options = {
        position: null,
        radius: 500, //radius is in meters 
        strokeColor: '#0077D2',
        strokeWidth: 2,
        fillColor: '#0077D2',
        opacity: 0.3
    }

    this.options = dCM.Utilities.extendObject(this.options, options);

    this.type = 'shape';
    this.svgRendering = false; //document.implementation.hasFeature("http://www.w3.org/TR/SVG11/feature#BasicStructure", "1.1");
    this.svgElement = null;
    this.canvasElement = null;
    this.visible = true;

    this.padding = 5;

    if (!this.options.position)
        dCM.Exception.raise('Instantiating a circle without a position. You can see how this would not work very well. Please pass the center position as one of the options, like this: new dCM.Circle({position: new Position(37, -122)});');
}

dCM.Circle.prototype = {
    /**
     * Dynamically set the radius of the circle. It will readjust accordingly.
     * @param {float} r the radius, in meters.
     */
    setRadius: function(r){
        this.options.radius = r;
    },
    
	/** Retrieve the radius of the circle.
	 * @return {float} Radius, in meters
	 */
    getRadius: function(){
        return this.options.radius;
    },

    /** Gets the radius of the circle, converted to pixels
	 * @param z {int} Zoom level for which we want the pixel dimension
	 * @return {int} Radius, in pixels
	 */
    getPixelRadius: function(z){
        return 1 / (dCM.Utilities.metersPerPixelAtZoom(this.options.position, z) * (1 / this.options.radius));
    },

    /**
     * @private
     */
    render: function(x, y, z, tiles){
        if (!this.visible) return;
        if (this.svgRendering){
            return this.renderSVG(x, y, z, tiles);
        } else {
            return this.renderCanvas(x, y, z, tiles);
        }
    },

    /**
     * @private
     */
    renderCanvas: function(x, y, z, tiles){
        if (!this.canvasElement){            
            this.canvasElement = deCarta.crEl('canvas');
            this.canvasElement.setAttribute("id", ("deCarta-shape-" + Math.random()).replace(".", ""));
            this.canvasElement.className = 'deCarta-circle';
            this.canvasElement.style.zIndex = this.zIndex;
            this.canvasElement.style.position = 'absolute';
        }

        //let's figure out if this is in view first
        var viewport = deCarta.Window.getViewport();
        var pxRadius = this.getPixelRadius(z);
        
        this.domPosition((x - this.padding - pxRadius), (y - this.padding - pxRadius), this.canvasElement);

        //this.canvasElement.setAttribute('style', "position: absolute; top: " + (y - this.padding - pxRadius) + "px; left: " + (x - this.padding - pxRadius) + "px;");

        if (x + pxRadius < 0 || y + pxRadius < 0 || x - pxRadius > viewport.width || y - pxRadius > viewport.height){
            return false;
        }

        var newWidth = (pxRadius * 2) + (this.padding * 2);
        var newHeight = (pxRadius * 2) + (this.padding * 2);

        if (this.canvasElement.width != newWidth || this.canvasElement.height != newHeight){
            //if we hare here, we are in view. So... what do we do
            this.canvasElement.width = (pxRadius * 2) + (this.padding * 2);
            this.canvasElement.height = (pxRadius * 2) + (this.padding * 2);

            var ctx = this.canvasElement.getContext("2d");

            //draw the circle
            ctx.beginPath();
            ctx.arc(pxRadius + this.padding, pxRadius + this.padding, pxRadius, 0, Math.PI*2, true);
            ctx.closePath();

            ctx.strokeStyle = this.options.strokeColor;
            ctx.lineWidth = this.options.strokeWidth;
            ctx.fillStyle = this.options.fillColor;
            ctx.globalAlpha = this.options.opacity;

            ctx.fill();
            ctx.stroke();
        }

        return this.canvasElement;
    },

    /**
     * @private
     */
    renderSvg: function(x, y, z, tiles){
        dCM.Exception.raise('SVG RENDERING is not yet implemented for circles. This should not be happening, since this function is never called. ');
    }
	
	
}; //end Circle prototype


//Extend the OverlayObject with the additional methods for circle
dCM.Circle.prototype = dCM.Utilities.inherit(dCM.Circle.prototype, dCM.OverlayObject.prototype);

/**
 * @class
 * Images (which are inherited from {@link dCM.OverlayObject}s can be added to map overlays
 * ({@link dCM.MapOverlay}). An Image defines two positions on the map: topLeft and bottomRight,
 * which indicate the corners of the image on the map.<br />
 * The image will scale when zoomed to maintain its position. <br />
 * You can also provide a range for valid zoom levels at which to display the image.<br />
 *
 * Example: 
 * <pre>
 *           
 *   var image = new dCM.Image({
 *       topLeft: new dCM.Position(37, -122),
 *       topRight: new dCM.Position(37.5, -122.5),
 *       minZoom: 10,
 *       maxZoom: 13,
 *       src: 'prettyImage.jpg'
 *   });
 *   
 *   //assuming mapOverlay is a mapOverlay object, attached to a map
 *   mapOverlay.addObject(image);
 *   
 *  </pre>
 *
 * @description An OverlayObject used to display an Image on a MapOverlay
 *
 * @constructor
 * @param {object} options Options. May contain one or more of the following:
 * <ul>
 *   <li>{@link dCM.Position} topLeft: Geographic position of the top-left of the image on the map - required</li>
 *   <li>{@link dCM.Position} btmRight: Geographic position of the bottom-right of the image on the map - required</li>
 *   <li>(int) minZoom: optional, default 1</li>
 *   <li>(int) maxZoom: optional, default 20</li>
 *   <li>(string) cssClass: css class that will be applied to the element</li>
 *   <li>(int) opacity: opacity of the image [0 (transparent) to 100 (opaque)]  default=75</li>
 *   <li>(string) src: the image src, can be a reference to an image file or a data URI</li>
 * </ul>
 *
 * @see dCM.MapOverlay
 * @see dCM.OverlayObject
 */

dCM.Image = function(opts){

    this.options = {        
        topLeft: null,
        btmRight: null,
        minZoom: 1,
        maxZoom: 21,
        width: 0,
        height: 0,
        cssClass: 'deCarta-Mob-ImgObj',
        opacity: 75
    }
    
    this.domElement = null;

    this.type = 'image';

    this.options = dCM.Utilities.extendObject(this.options, opts);    

}

//Define methods to extend Image
dCM.Image.prototype = {
	
	 /**
	  * @private
	  */
     render: function(x, y, z, tiles){
        if (z >= this.options.minZoom && z <= this.options.maxZoom){
            if (!this.domElement) {
                this.domElement = new Image();
                this.domElement.style.position = 'absolute';
                this.domElement.src = this.options.src;
                this.domElement.className = this.options.cssClass;
                dCM.Utilities.setOpacity(this.domElement, this.options.opacity);
            }
            
            this.domElement.style.top = y + 'px';
            this.domElement.style.left = x + 'px';
            
            //calc w and h            
            var width = dCM.Utilities.lon2pix(this.options.btmRight.getLon(), z) - dCM.Utilities.lon2pix(this.options.topLeft.getLon(), z);
            var height = dCM.Utilities.lat2pix(this.options.topLeft.getLat(), z) - dCM.Utilities.lat2pix(this.options.btmRight.getLat(), z);
            
            this.domElement.style.width = width + 'px';
            this.domElement.style.height = height + 'px';
            
            return this.domElement;
        }
    },

    /** Retrieve the geographic position  of the top-left
	 * corner of the image.
	 * @return {dCM.Position} Geographic position of the top-left corner of the image
	 */
    getPosition: function(){
        return this.options.topLeft;
    },

    /** Retrieves the size of the image, in meters
	 * @return {width|height} A structure containing width and height
	 */
    getSize: function(){
        var top = this.options.topLeft.getY(z);
        var left = this.options.topRight.getX(z);

        var bottom = this.options.bottomRight.getY(z);
        var right = this.options.bottomRight.getX(z);

        return {width: right - left ,height: top - bottom}
    },

    /** Sets the geographic position of the top-left
	 * corner of the image.
	 * @param {dCM.Position} position Position of the top-left corner of the image
	 */
    setPosition: function(position){
        this.options.position = new dCM.Position(position.lat, position.lon);
        if (this.owner && this.owner.refreshObjects) this.owner.refreshObjects();
    }

}; //end Image prototype

//Extend the OverlayObject with the additional methods for image
dCM.Image.prototype = dCM.Utilities.inherit(dCM.Image.prototype, dCM.OverlayObject.prototype);


/**
 * @class
 * Represents a geographic position as a pair of lat, lon values
 * Also provides methods to easily convert between geo positions (lat,lon) and
 * pixel coordinates (x,y) given a zoom level, and vice versa.
 *
 * @description
 * Represents a geographic position as a pair of lat, lon values
 *
 * @constructor
 * @param {float} lat The Latitude
 * @param {float} lon The Longitude
 */

dCM.Position = function(lat, lon){

    this.lat = 0;
    this.lon = 0;
    
    if (lat != null) {
        if (arguments.length == 1){

            var ll = lat.split(",");
            if (ll.length < 2) ll = lat.split(" ");
            this.lat = parseFloat(ll[0]);
            this.lon = parseFloat(ll[1]);

        } else if (arguments.length == 2){
            // The latitude
            this.lat = lat;
            // The longitude
            this.lon = lon;
        }
    }

    this.xz = [];
    this.yz = [];
}


dCM.Position.prototype = {

    /**
     * Returns clone of this position
     * @return {dCM.Position} pos
     */
    clone: function(){
        return new dCM.Position(this.lat, this.lon);
    },

    /**
     * Returns the latitude associated with this position
     * @return {float} Latitude
     */
    getLat: function(){
        return parseFloat(this.lat);
    },

    /**
     * Returns the longitude associated with this positon
     * @return {float} Longitude
     */
    getLon: function(){
        return parseFloat(this.lon);
    },

    /**
	 * Returns the horizontal position on the map window of this position, in pixels 
	 * @param {float} zoom Current zoom level (20=maxzoom, 1=minzoom)
     * @return {float} X coordinate of map window for this position
	 */
    getX: function(zoom){
        if (zoom == Math.round(zoom)){
            if (!this.xz[zoom])
                this.xz[zoom] = dCM.Utilities.lon2pix(this.lon, zoom);
            return this.xz[zoom];
        } else {
            return dCM.Utilities.lon2pix(this.lon, zoom);
        }
    },

    /**
	 * Returns the vertical position on the map window of this position, in pixels 
	 * @param {float} zoom Current zoom level (20=maxzoom, 1=minzoom)
     * @return {float} Y coordinate of map window for this position
	 */
    getY: function(zoom){
        if (zoom == Math.round(zoom)){
            if (!this.yz[zoom])                
                this.yz[zoom] = dCM.Utilities.lat2pix(this.lat, zoom);
            return this.yz[zoom];
        } else {
            return dCM.Utilities.lat2pix(this.lat, zoom);
        }
    },

    /**
     * Sets Lat and Lon from a pixel position and a zoom level
     * @param {int} x X coordinate of the pixel in the map window
     * @param {int} y Y coordinate of the pixel in the map window
     * @param {float} zoom Current zoom level (20=maxzoom, 1=minzoom)
     */
    setXY: function(x, y, zoom){
        if (!zoom) zoom = 21;
        this.lat = dCM.Utilities.pix2lat(y, zoom);
        this.lon = dCM.Utilities.pix2lon(x, zoom);        
        
        if (this.lon < -180) this.lon = this.lon + 360;
        if (this.lon > 180) this.lon = this.lon - 360;

        this.yz = [];
        this.xz = [];
    },

    /**
     * Returns an object with lat and lon in pixels
	 * @return {object} An object in the format {x: lat, y: lon}
     */
    getPixelPoint: function(z){
        if (!z) z = 21;
        return {
            x: this.getX(z),
            y: this.getY(z)
            };
    },

    /**
     * Returns a string representation of the position
     * @return {string} Space-separated string of the format 'lat lon'
     */
    toString: function(n){
        if (n) return this.lat.toFixed(n) + ' ' + this.lon.toFixed(n);
        return this.lat + " " + this.lon;
    },
    
    /**
     * Returns the N (North) and E (East) params of this position at a specific zoom
     * @param {float} zoom Current zoom level (20=maxzoom, 1=minzoom)
     * return {object} Object with the structure {N: Northing value, E: easting value}
     */
    getTileAtZoom: function(zoom){
        var x = this.getX(zoom);
        var y = this.getY(zoom);
        var tileSize = dCM.Utilities.tileSizeForZoom(zoom);

        //N and E of center tile on this grid
        var cE = Math.floor(x / tileSize);
        var cN = Math.floor(y / tileSize);

        return {
            N: cN,
            E: cE
        };
    },

    /**
     * @private
	 */
    quantize: function(z){
        this.setXY(Math.round(this.getX(z)), Math.round(this.getY(z)), z);
    },

    /**
     * @ private
	 */
    toJSON: function(){
        return this.lat + ', ' + this.lon;
    }
}
/**
 * @private
 */
dCM.Constants = {

    _ll_LUT: [
		"89.787438015348100000,360.00000000000000000",
		"85.084059050110410000,180.00000000000000000",
		"66.653475896509040000,90.00000000000000000",
		"41.170427238429790000,45.000000000000000000",
		"22.076741328793200000,22.500000000000000000",
		"11.251819676168665000,11.250000000000000000",
		"5.653589942659626000,5.625000000000000000",
		"2.830287664051185000,2.812500000000000000",
		"1.415581451872543800,1.406250000000000000",
		"0.707845460801532700,0.703125000000000000",
		"0.353929573271679340,0.351562500000000000",
		"0.176965641673330230,0.175781250000000000",
		"0.088482927761462040,0.087890625000000000",
		"0.044241477246363230,0.043945312500000000",
		"0.022120740293895182,0.021972656250000000",
		"0.011060370355776452,0.010986328125000000",
		"0.005530185203987857,0.005493164062500000",
		"0.002765092605263539,0.002746582031250000",
		"0.001382546303032519,0.001373291015625000",
		"0.000691272945568983,0.000686645507812500",
		"0.000345636472797214,0.000343322753906250"
    ],

    TILE_SIZE: 256,
    BLANKTILE: 'data:image/gif;base64,R0lGODlhAAEAAYABAJmZmf///yH/C1hNUCBEYXRhWE1QPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS4wLWMwNjAgNjEuMTM0Nzc3LCAyMDEwLzAyLzEyLTE3OjMyOjAwICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIiB4bWxuczpzdFJlZj0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlUmVmIyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ1M1IFdpbmRvd3MiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6RUI0MTgyQjczMzE1MTFFMDg5MTA5RTNDRDlERkUzMzMiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6RUI0MTgyQjgzMzE1MTFFMDg5MTA5RTNDRDlERkUzMzMiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDpFQjQxODJCNTMzMTUxMUUwODkxMDlFM0NEOURGRTMzMyIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDpFQjQxODJCNjMzMTUxMUUwODkxMDlFM0NEOURGRTMzMyIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PgH//v38+/r5+Pf29fTz8vHw7+7t7Ovq6ejn5uXk4+Lh4N/e3dzb2tnY19bV1NPS0dDPzs3My8rJyMfGxcTDwsHAv769vLu6ubi3trW0s7KxsK+urayrqqmo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'

}
/**
 * @class ImagePack
 * Allows dynamic loading of different image sets depending on resolution.
 *
 *
 * The ImagePack allows you to load a base64 encoded set of images (a "pack").
 * These are generated server-side, either statically with a build tool or
 * dynamically. The content of an imagePack is an object with the following structure
 *<pre>
 * {
 *      "image name" : {
 *          img : "base64 data",
 *          scale: (float)
 *      }
 * }
 *</pre>
 * Each image will be loaded and rescaled to screen size (depending on the DPR of the
 * device) according to the scale paramter. This allows you to load the same pack
 * for different ratios. For example, you could load a pack
 * containing images with a scale of 2. These images will contain *twice as many pixels*
 * as required for display (hence the 2 factor). When displayed on a regular screen
 * the extra data will be discarded, but when displayed on a ahigh res screen
 * they will utilize its full resolution. Of course this works the other way around
 * as well : you can load a pack of low res images with a scale setting of 1, and they
 * will be upscaled on high res screens to display the correct size.
 *
 * A Java tool to generate image packs is provided with the api. Please refer to the
 * documentation in the Tools section of the API distribution.
 * 
 * @description Tool for loading images
 */

dCM.ImagePack = {

    /**
     * Load a pack.
     * @param pack (string) relative of absolute uri
     * @param onComplete a callback function that will be notified when the pack is ready for use
     *
     */
    load: function(pack, onComplete, forceScript){

        if (typeof onComplete !== 'function')
            dCM.Exception.raise("Image pack loading requires a callback.");
        

        if (!forceScript && (pack.indexOf('http://') == -1 && window.location.protocol != 'file:' && !deCarta.Window.isIe())) {
            this.loadXHR(pack, onComplete);
        } else {            
            this.loadScript(pack, onComplete);
        }
    },

    loadScript: function(pack, onComplete){        
        var sTag = deCarta.crEl('script');
        var packName = pack.substring(pack.lastIndexOf('/') + 1, pack.lastIndexOf('.'));
        sTag.onload = function(){
            this.importLoadedPack(packName, onComplete);
            sTag.parentNode.removeChild(sTag);
        }.bind(this);

        sTag.onreadystatechange= function (sTag) {
            if (sTag.readyState == 'complete'){
                this.importLoadedPack(packName, onComplete);
                sTag.parentNode.removeChild(sTag);
            }
        }.bind(this, sTag);

        sTag.src = pack;
        document.body.appendChild(sTag);
    },

    loadXHR: function(pack, onComplete){
       /* try {
            netscape.security.PrivilegeManager.enablePrivilege("UniversalPreferencesWrite UniversalBrowserWrite UniversalPreferencesRead UniversalBrowserRead");
        } catch (e) {}*/

        var req = new XMLHttpRequest();
        req.open('GET', pack, true);
        req.onreadystatechange = function (aEvt) {
            if (req.readyState == 4) {
                if(req.status == 200){
                    (new Function(req.responseText + '; window.imagePacks = imagePacks'))();
                    //window.imagePacks = dCM.Utilities.extendObject(window.imagePacks, imagePacks);
                    var packName = pack.substring(pack.lastIndexOf('/') + 1, pack.lastIndexOf('.'));
                    dCM.ImagePack.importLoadedPack(packName, onComplete);
                }
                else
                    dCM.Exception.raise('Error loading resources');

            }
        };
        req.send();
    },

    /**
     * Get an image: returns a clone of the original image for use in the application
     * @param id is the name of the image in the pack
     */
    get: function(id){
        //console.log(id)
        try {
            return this[id].cloneNode(false);
        } catch (e){
            deCarta.App.streamlog('Failed Pin Load', {err: 'pin ' + id + ' is not here.'});
            return false;
        }
    },

    /**
     * @private. 
     */
    importLoadedPack: function(packName, onComplete){
        if (!imagePacks[packName]) {
            dCM.Exception.raise("Image pack " + packName + " contains no images, or is in the wrong format!");
        }

        var image = null;

        var imageCount = 0;
        for (image in imagePacks[packName]){
            imageCount ++;
        }

        for (image in imagePacks[packName]){

            this[image] = new Image();
            this[image].onload = function(img, packImg) {

                var scale = (packImg.scale) ? packImg.scale : 1;


                //using css pix because of opera
                img.style.width = (img.width / scale) + 'px';
                img.style.height = (img.height / scale) + 'px';

                imageCount --;

                if (imageCount == 0) onComplete();

            }.bind(this, this[image], imagePacks[packName][image]);
            this[image].src = imagePacks[packName][image].img;
        }

    }


}
/**
 * @private
 * @class Global object in the deCarta.Mobile namespace used to trigger exceptions
 * int the api.
 * @description Used in the deCarta Mobile Web api to trigger exceptions
 *
 */

dCM.Exception = {

    /**
     *
     * Throws a new exception.
     * If vocal exceptions are set in the config, it will also show an alert box.
     */
    raise: function raise(msg){
        var caller = this.getFunctionName(arguments.callee.caller);
        var s = '[' + caller + '] - ' + msg;
        if (dCM.Configuration.vocalExceptions) alert('Exception: ' + s);
        throw(s);
    },

    /**
     * @private returns the name of a function.
     * @param {function} func the function of which we want to knwo the name
     */
    getFunctionName: function getFunctionName( func ) {

        // Sort out the caller of this function
        // For Mozilla        
        if( func.name ) {
            return func.name;
        }

        // try to parse the function name from the defintion for other browsers
        var definition = func.toString();
        var name = definition.substring(definition.indexOf('function') + 8, definition.indexOf('('));
        if ( name.replace(/ /g, "") ) {
            return name.replace(/ /g, "");
        }

        // We made it here if the function is anonymous
        return "anonymous";
    }

}
/**
 * @class
 * When performing a POI search using the {@link dCM.POISearch}'s
 * execute() method, the search is performed by specifying a center point and
 * a search radius.
 * This Radius class defines the structure for that search radius, and has 
 * the following structure:
 * <pre>
 *   dCM.Radius = function(distance, uom){
 *       distance: float, //Radius distance
 *       uom: string //Unit of measure. valid values are : KM (Kilometers), M (Meters), MI (Miles), FT (Feet)
 *   }
 * </pre>
 *
 * @description A radius with distance and unit-of-measure.
 *
 * @constructor
 * @param {float} distance Radius distance
 * @param {string} uom Unit of measure. valid values are : KM (Kilometers), M (Meters), MI (Miles), FT (Feet)
 */
dCM.Radius = function(distance, uom){

    this.distance = distance;
    this.uom = uom;

}

/**
 * Returns a string representation of the radius, with both
 * distance and unit-of-measure.
 * @return {string} Space separated string in the format "distance uom"
 */
dCM.Radius.prototype.toString = function(){
    return this.distance+" "+this.uom;
};

/**
 * Localizes a distance by converting it from its current units
 * to either Imperial or Metric units.
 * @param {dCM.Locale} locale The target locale. If the country for the
 * target locale is 'US' or 'UK', units are converted to Imperial units. Otherwise,
 * units are converted to metric.
 * @return {dCM.Radius} This radius object, modified to be localized to the target locale
 */
dCM.Radius.prototype.localize = function(locale){
    if (!locale) dCM.Exception.raise('Locale is required to localize.');
    
    if (locale.country == 'US' || locale.country == 'UK'){
        this.toImperial();    
    } else {
        this.toMetric();
    }
    return this;
};

/**
 * Returns a string representation of the radius, localized to the target locale.
 * @param {dCM.Locale} locale The target locale. If the country for the
 * target locale is 'US' or 'UK', units are converted to Imperial units. Otherwise,
 * units are converted to metric.
 * @return {string} Space separated string in the format "distance uom", where the
 * distance and unit of measure have been converted based on locale
 */ 
dCM.Radius.prototype.toLocalizedString = function(locale){    
    
    return new dCM.Radius(this.distance, this.uom).localize(locale).toString();
};

/**
 * Adjusts the Radius object to use a better distance / uom combination for the 
 * current values. For example, 1000 meters would be converted to 1 km. 
 * 0.1 miles would be converted to 175 yards. 
 * @return {dCM.Radius} The modified current Radius, replacing units with better units
 */
dCM.Radius.prototype.autoFormat = function(){
    
    switch (this.uom){
        case 'KM':
            if (this.distance <= 0.5) {
                this.distance = this.distance.toFixed(1);
                this.uom = 'KM';
            } else {
                this.distance = (this.distance * 1000).toFixed(0);
                this.uom = 'M'
            }            
        break;
        case 'M':
            if (this.distance > 500) {
                this.distance = (this.distance / 1000).toFixed(1);
                this.uom = 'KM';
            } else {
                   this.distance = this.distance.toFixed(0);
                   this.uom = 'M';
            }                      
        break;
        case 'MI':
            if (this.distance < 0.3){
                this.distance = (1760 * this.distance).toFixed(0);
                this.uom = 'YDS';                
            } else {
                this.distance = this.distance.toFixed(1);
                this.uom = 'MI';                
            }
        break;
        case 'FT':
            if (this.distance > 300){
                if (this.distance > 1500){
                    this.distance = (this.distance * 0.000189393939).toFixed(1);
                    this.uom = 'MI';                    
                } else {
                    this.distance = (0.333333333 * this.distance).toFixed(0);
                    this.uom = 'YDS';
                }                
            } else {
                this.distance = this.distance.toFixed(0);
                this.uom = 'FT';                
            }
        break;
    }
    
    return this;
}

/**
 * @private
 */
dCM.Radius.prototype.getDegrees = function(){
    
    if(this.uom=="KM"){
        return this.distance/111.111;
    }else if(this.uom=="M"){
        return (this.distance/1000)/111.111;
    }else if(this.uom=="MI"){
        return (this.distance*1.609)/111.111;
    }else if(this.uom=="FT"){
        return ((this.distance/3.28)/1000)/111.111;
    }
    return 0;
}

/**
 * @private
 */
dCM.Radius.prototype.toMetric = function(){
    if (this.uom == 'KM' || this.uom == 'M') return;
    if (this.uom == 'MI'){
        this.distance *= 1.609344;
        this.uom = 'KM';
    }
    if (this.uom == 'FT'){
        this.distance *= 0.3048;
        this.uom = 'M';
    }
    return this;
}

/**
 * @private
 */
dCM.Radius.prototype.toImperial = function(){
    if (this.uom == 'MI' || this.uom == 'FT') return;
    if (this.uom == 'KM'){
        this.distance *= 0.621371192;
        this.uom = 'MI';
    }
    if (this.uom == 'M'){
        this.distance *= 3.2808399;
        this.uom = 'FT';
    }
    return this;
}

/**
 * Return the radius distance in miles
 * @return {float} Radius value, in miles
 */
dCM.Radius.prototype.getMiles = function(){
    switch (this.uom){
        case 'KM':
            return this.distance * 0.621371192;
        break;
        case 'M':
            return (this.distance / 1000) * 0.621371192;
        break;
        case 'MI':
            return this.distance;
        break;
        case 'FT':
            return this.distance * 0.000189393939;
        break;
        default:
            dCM.Exception.raise('Unknown UOM : ' + this.uom);
        break;
    }
}
/**
 * Return the radius distance in KM
 * @return {float} Radius value, in kilometers
 */
dCM.Radius.prototype.getKm = function(){
    switch (this.uom){
        case 'KM':
            return this.distance;
        break;
        case 'M':
            return (this.distance / 1000);
        break;
        case 'MI':
            return this.distance * 1.609344;
        break;
        case 'FT':
            return this.distance * 0.0003048;
        break;
        default:
            dCM.Exception.raise('Unknown UOM : ' + this.uom);
        break;
    }
}

/**
 * @class 
 * 
 * The Distance class describes a distance value.
 * This is simply an alias to {@link dCM.Radius}
 *
 * @description Distance (value and unit of measure)
 *
 * @see dCM.Radius
 *
 **/

dCM.Distance = dCM.Radius;
/**
 * @class
 * A Locale object represents a specific geographical, political, or
 * cultural region. An operation that requires a Locale to perform its task is
 * called locale-sensitive and uses the Locale to tailor information for the
 * user. Currently, Locales can be attached to a {@link dCM.FreeFormAddress} object
 * to aid in producing better results with a {@link dCM.Geocoder}:geocode().
 * <p>These pairs of language can be used to create a valid locale for use with
 * the Geocoder.</p>
 *
 * @description A language, country pair for localization
 *
 * @constructor
 * @param {String} language required A valid ISO Language Code. It is always an
 * upper case, two letter string. See the class description for valid language
 * and country code pairs.
 * @param {String} country required A valid ISO Country Code. It is always an
 * upper case, two letter string. See the class description for valid language
 * and country code pairs.
 *
 * @see dCM.FreeFormAddress
 * @see dCM.Geocoder
 */  
dCM.Locale = function( language, country ) {  
    /**
     * A valid ISO Language Code. It is always an upper case, two letter string.
     * See the class description for valid language and country code pairs.
     * @private
     * @type String
     */
    this.language = language.toUpperCase();
    /**
     * A valid ISO Country Code. It is always an upper case, two letter string.
     * See the class description for valid language and country code pairs.
     * @private
     * @type String
     */
    this.country = country.toUpperCase();
} // End Locale constructor



dCM.Locale.prototype = {
    /**
     * Retrieve the ISO Language Code for this locale
     * @return {String} language field of the Locale object
     */
    getLanguage: function() {
        return this.language;
    },

    /**
     * Set the ISO Language Code for this locale.
     * @param {String} language required A valid ISO Language Code. It is always an
     * upper case, two letter string. See the class description for valid language
     * and country code pairs.
     */
    setLanguage: function(language) {
        this.language = language.toUpperCase();
    },

    /**
     * Retrieve the ISO Country Code for this locale
     * @return {String} country field of the Locale object
     */
    getCountry: function() {
        return this.country;
    },

    /**
     * Set the ISO Country Code for this locale.
     * @param {String} country required country required A valid ISO Country Code.
     * It is always an upper case, two letter string. See the class description for
     * valid language and country code pairs.
     */
    setCountry: function(country) {
        this.country = country.toUpperCase();
    },

    /**
     * Concatenates the country and language fields, in that order and returns
     * that string.
     * @return {String} The Locale object as a single, underbar delimited string, ex: "en_US".
     */
    toString: function() {
        return  this.language  + "_" +  this.country;
    }
};

window.encodeURIComponentUTF8 = function(F){
        F=F+"";
        var K="0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz-_.~";
        var C="!*'();:@&=+$,/?%#[]";
        var I=K+C;
        var H="0123456789ABCDEFabcdef";
        function J(L){
            return "%"+H.charAt(L>>4)+H.charAt(L&15);
        }
        var D="";
        for(var E=0;E<F.length;E++){
            var B=F.charAt(E);
            if(K.indexOf(B)!=-1){
                D=D+B;
            }else{
                var G=F.charCodeAt(E);if(G<128){
                    D=D+J(G);
                }if(G>127&&G<2048){
                    D=D+J((G>>6)|192);D=D+J((G&63)|128);
                }if(G>2047&&G<65536){
                    D=D+J((G>>12)|224);D=D+J(((G>>6)&63)|128);D=D+J((G&63)|128);
                }if(G>65535){
                    D=D+J((G>>18)|240);D=D+J(((G>>12)&63)|128);D=D+J(((G>>6)&63)|128);D=D+J((G&63)|128);
                }
            }
        }
        return D;
    }

/**
 * @private
 * Performs JS Request to DDW Web Services APIs.
 *
 * This class is for advanced users, and is used to communicate directly with deCarta DDS Web Services
 * through XML requests. Just use .send(xml, onSuccess, onFail) with the desired XML 
 * and success / fail callbacks. 
 *
 * Requests are performed using Dynamic Script Tag mode.
 * @description
 * The deCarta JavaScript API communicates with the DDS Web Services via
 * XML-over-HTTP requests. Browser "domain of origin" security prevents any
 * JavaScript library (including the deCartaMobile.js library) from being
 * downloaded from one domain and used to send queries to a different domain.
 * Since most AJAX applications require accessing services from more than one
 * domain, there are two main methods used to work around the domain of origin
 * security. One method requires implementation of a proxy on the server to
 * redirect queries from the client to the DDS Web Services. The second, method
 * involves wrapping the XML sent to the DDS Web Services in a set of dynamic
 * script tags, and sending the XML over as a JSON request.
 *
 * The second method is simpler to use out of the box because it is directly
 * supported via the JSRequest object.
 *
 * @description Performs JS Request to DDW Web Services APIs.
 *
 */
dCM.JSRequest = {

    callbacks: {},
    timeouts: {},
    sessionId: Math.ceil((new Date().getTime()) * Math.random()),
    requestId: null,
    /**
     * This initializes the JSRequest object and
     * Performs the necessary authentication with DDS Web Services.
     */
    init: function(onInit){
        if (typeof onInit !== 'function'){
            dCM.Exception.raise('JSRequest.init needs a callback parameter');
        }
        var xmlRequest =
        "       <xls:Request version='1.0' requestID='1675192' methodName='RuokRequest'>" +
        "             <xls:RUOKRequest />" +
        "       </xls:Request>";

        var start = new Date().getTime();

        this.send(xmlRequest, function(res){
            var time = (new Date().getTime())-start;
            try {
                if (typeof res.XLS.ResponseHeader.ErrorList === 'object'){
                    onInit( {
                        success:false,
                        msg:res.XLS.ResponseHeader.ErrorList.Error.message,
                        exTime:time
                    })
                } else if (typeof res.XLS.Response.RUOKResponse === 'object'){
                    dCM.Configuration.url = 'http://' + res.XLS.Response.RUOKResponse.hostName + '/openls/JSON';
                    var maxHostAliases = res.XLS.Response.RUOKResponse.maxHostAliases ? parseInt(res.XLS.Response.RUOKResponse.maxHostAliases) : 0;
                    dCM.Configuration.streetTileHosts=[];
                    if(maxHostAliases){ 
                        for( var i=1;i<=maxHostAliases; i++){
                            var alias = 'http://' +res.XLS.Response.RUOKResponse.hostName.replace(/\./,"-0"+i+".");
                            dCM.Configuration.streetTileHosts.push(alias);
                        }
                    } else {
                        dCM.Configuration.streetTileHosts.push('http://' +res.XLS.Response.RUOKResponse.hostName);
                    }
                    // all is good!  party time...
                    onInit( {
                        success:true,
                        msg : "ok",
                        exTime: time
                    } );
                } 
            } catch (e) {
                onInit({
                    success:false,
                    msg:e.message,
                    exTime : time
                })
            }
        }.bind(this),
            function()  {
                var time = (new Date().getTime())-start;
                onInit({
                    success:false,
                    msg:"connection timeout",
                    exTime : time
                })
            }.bind(this));

    },

    /**
     * Send an XML request to DDS Web Services
     * @param {string} xml the XML to be sent to the server
     * @param {function} onSuccess the callback function that will receive the
     * results of the xml request
     * @param {function} onFailure the callback function that will be invoked in
     * the event of a failure.
     */
    send: function(xml, onSuccess, onFailure){

        //generate id
        var reqId = Math.ceil((new Date().getTime()) * Math.random());
        var elId = "deCarta-mob-req-" + reqId;
        var regEx = /requestID=[\'\"]([0-9]+)[\'\"]/;
        xml = xml.replace(regEx, 'requestID="' + reqId + '"');

        var data  = encodeURIComponentUTF8(this.getRequestHeader() + xml + this.getRequestFooter());

        this.callbacks[reqId] = function(response){
            var el = deCarta.geId(elId);
            clearTimeout(this.timeouts[reqId]);
            if(el){
                el.parentNode.removeChild(el);
                //dCM.timeLog({type: "jsRequest Complete", requestId: elId});
                onSuccess(response.response);
            }
        }.bind(this);

        this.timeouts[reqId] = setTimeout(function(elId){
            this.cancel(elId);
            //dCM.timeLog({type: "jsRequest Timeout", requestId: elId});
            if (typeof onFailure == 'function') onFailure({
                'err': 'timeout'
            });
        }.bind(this, elId, onFailure), dCM.Configuration.requestTimeout);

        var url = dCM.Configuration.url +
        '?reqID=' + reqId +
        '&chunkNo=1&numChunks=1' +
        '&callback=deCarta.Mobile.JSRequest.callbacks[' + reqId + ']'+
        '&data=' + data +
        '&responseFormat=JSON';
        var sTag = deCarta.crEl('script');
        sTag.id  = elId;
        sTag.src = url;

        //dCM.timeLog({type: "jsRequest", url: url, requestId: elId});

        document.body.appendChild(sTag);
        return elId;
    },
    
    /**
     * @private
     */
    getRequestHeader: function(){

        var header = '<?xml version="1.0"?>' +
        '<xls:XLS version="1" xls:lang="en" xmlns:xls="http://www.opengis.net/xls" rel="' +dCM.Configuration.apiVersion+'" xmlns:gml="http://www.opengis.net/gml">' +
        '<xls:RequestHeader clientName="' +dCM.Configuration.clientName+
        '" sessionID="' + this.sessionId +
        '" clientAPI="mobilejs'+
        '" clientPassword="'+dCM.Configuration.clientPassword+
        '" configuration="' + dCM.Configuration.defaultConfig +
        '"/>';
        return header;
    },

    /**
     * @private
     */
    getRequestFooter: function(){
        var footer = "</xls:XLS>";
        return footer;
    },

    /**
     * cancel request by ID
     * @return {boolean} result of cancelation attempt (true if canceled, false if response already processed)
     */
    cancel:function(elId){
        if(deCarta.geId(elId)){
            var el = deCarta.geId(elId);
            el.src=null;
            el.parentNode.removeChild(el);
            return true;
        } else {
            return false;
        }
    }

}



/**
 * @class
 * The POISearch class is a static object which provides a single
 * {@link #execute} method for searching for a point of interest using
 * the deCarta DDS Web Services.
 *
 * @description Static class for performing POI search
 */

dCM.POISearch = {

    /**
     * @private
     */
    getXML: function(criteria){
        /* Example XML
         *
         *
        <?xml version="1.0"?>
        <xls:XLS xmlns:xls="http://www.opengis.net/xls" xmlns:gml="http://www.opengis.net/gml" version="1" xls:lang="en" rel="4.5.1.sp02">
          <xls:RequestHeader clientName="map-sample-app" sessionID="8285826" clientPassword="letmein" configuration="global-decarta"/>
          <xls:Request maximumResponses="20" version="1.0" requestID="9132342" methodName="DirectoryRequest">
            <xls:DirectoryRequest database="search:decarta:tmo" sortDirection="Ascending" rankCriteria="Score">
              <xls:POILocation>
                <xls:WithinDistance>
                  <xls:POI ID="1">
                    <gml:Point>
                      <gml:pos>37.774053 -122.421398</gml:pos>
                    </gml:Point>
                  </xls:POI>
                  <xls:MinimumDistance value="0" uom="KM"/>
                  <xls:MaximumDistance value="1.9613978800000003" uom="KM"/>
                </xls:WithinDistance>
              </xls:POILocation>
              <xls:POIProperties>
                <xls:POIProperty value="foobar" name="POIName"/>
              </xls:POIProperties>
            </xls:DirectoryRequest>
          </xls:Request>
        </xls:XLS>
         **/


        var database = 'database="' + criteria.database + '"';
        var sortDirection = (criteria.sortDirection) ? 'sortDirection="' + criteria.sortDirection + '"' : '';
        var rankCriteria = (criteria.rankCriteria) ? 'rankCriteria="' + criteria.rankCriteria + '"' : '';

        var searchXml = '';
        if (criteria.routeId){
            //corridor search
            searchXml += "<xls:POILocation><xls:NearRoute>";
            if(criteria.corridorType==="distance"){
                searchXml += "<xls:distance value='"+criteria.corridorType+"' uom='M'/>";
            } else if(searchCriteria.type==="euclideanDistance"){
                searchXml += "<xls:euclideanDistance value='"+criteria.corridorType+"' uom='M'/>";
            } else {
                // TODO need to build in better
                searchXml += "<xls:drivetime>P0DT"+Math.floor(criteria.corridorType/60)+"H"+(criteria.corridorType%60)+"M0S</xls:drivetime>";
            }
            searchXml += "<xls:RouteID>"+criteria.routeId+"</xls:RouteID>";
            searchXml += "</xls:NearRoute></xls:POILocation>";
        } else {
            //regular search
            searchXml = '<xls:WithinDistance>' +
              '<xls:POI ID="1">' +
                '<gml:Point>' +
                  '<gml:pos>' + criteria.position.lat+ ' ' +criteria.position.lon + '</gml:pos>' +
                '</gml:Point>' +
              '</xls:POI>' +
              '<xls:MinimumDistance value="0" uom="KM"/>' +
              '<xls:MaximumDistance value="' + criteria.radius.distance + '" uom="' + criteria.radius.uom + '"/>' +
            '</xls:WithinDistance>'
        }
        
        var top =
              '<xls:Request maximumResponses=\'' + criteria.maximumResponses+ '\' version="1.0" requestID="0123456" methodName="DirectoryRequest">' +
                  '<xls:DirectoryRequest ' + database + ' ' +  sortDirection + ' ' + rankCriteria + '>' +
                  '<xls:POILocation>' +
                    searchXml+
                  '</xls:POILocation>' +
                  '<xls:POIProperties>';
       var bottom = 
                   '</xls:POIProperties>' +
                '</xls:DirectoryRequest>' +
              '</xls:Request>';
        var xml='';

        var crits = dCM.Utilities.makeArrayFix(criteria.properties);
        for(var i=0;i<crits.length;i++){
            for (var name in crits[i]){                
                if (typeof crits[i][name] == 'object'){
                    var s = ' ';
                    for (var prop in crits[i][name]){
                        s += prop + '="' + crits[i][name][prop] + '" ';                        
                    }
                    xml += top + '<xls:POIProperty name="' + name + '" '+ s +' />'+bottom;
                } else {
                    xml+= top+'<xls:POIProperty value="' + crits[i][name] + '" name="' + name + '"/>'+bottom;
                }
            }
        }
        return xml;
    },

    /**
     * Executes a POI search with the requested criteria
     * @param {dCM.SearchCriteria} Search criteria to be used for the
	 * search. This can be either an instance of a {@link dCM.SearchCriteria},
	 * or an inline object with the same structure, as follows:
     * <pre>
     *  SearchCriteriaObject: {
     *      queryString: null, //[Not yet defined]
     *      maximumResponses: int, //Max number of responses that will be returned
     *      database: string, //Database that will be queried for this search
     *      sortDirection: string, //Sort order for results ["Ascending", "descending"]
     *      sortCriteria: string, //Property results will be sorted by ["Distance", "Score"]
     *      rankCriteria: string, //Property by which results will be ranked [Distance, Score]
     *      allowAggregates: bool, //Allow Aggregates
     *      retrieveAll: bool, //retreive all values
     *      properties: { //Object describing search properties, contains ONE OF:
     *          CATEGORY: string, //If present, this will perform a category search on this value
     *      	KEYWORD: string, //If present, this will perform a Keyword search on this value
     *      	POIName: string //If present, this will perform a freeform POI Search on this value
     *      }
     *      position: dCM.Position, //Position where the search is centered
     *      radius: dCM.Radius, //Radius of the search
     *      routeId: int, //if routeId is set, the search will be performed along the route. 
     *      corridorType: //[Not yet defined]
     *      map: dCM.Map //Optionally pass Map instead of position+radius
     * </pre>
     * @param {function} callback Function that will be called when the POI search
	 *   response is received from the DDS Web Service.

     * @param {function} callback A user defined function that will receive
     * the respose to the query from the DDS Web Service. <br />
     * Function signature: <br />
     * function poiSearchResponseCallback(resultArray)<br />
	 * The callback function is passed a single object, which is an array of 
	 * objects, with each object in the array having the following
	 * structure:
     * <pre>
     *     resultArrayItem: { //A single item from the array
     *         Distance: { //A Distance object, composed of a unit of measure and a value
     *             uom: string, //Unit of measure for the distance. Valid values are: 'KM' (Kilometers), 'M' (Meters), 'MI' (Miles), 'FT' (Feet).
     *             value: int, //Value of the distance
     *         }
     *         POI: { //Actual POI info object (of type dCM.POIDetails)
     *             ID: string, //POI ID in the index
     *             POIName, string, //Name of the POI
     *             phoneNumber, string, //Phone number for the POI, if available
     *             Address: dCM.StructuredAddress, //StructuredAddress object
     *             Point: {
     *                 pos: string, //Latitude and longitude as a space separated string (ex: "lat lon")
     *             }
     *             POIAttributeList { //List of attributes for the POI
     *                 POIInfoList: {
     *                     POIInfo: []
     *                 }
     *             }
     *         }
     *     }
     * </pre>
     * @return {int} requestId which can be used to canceling long running requests
     */
    execute: function(criteria, callback){
        
        var defaults = new dCM.SearchCriteria();
        criteria = dCM.Utilities.extendObject(defaults, criteria);

        if(!callback) dCM.Exception.raise('You need to provide a search callback, or you will never know what was found');
        if (criteria.map){
            criteria.position = criteria.map.getCenter();
            if(!criteria.radiusOverride)
                criteria.radius = criteria.map.getRadius();
//            delete criteria.map;
        }

        if (!criteria.position){
            dCM.Exception.raise('A position is required to search. Please provide one in the search criteria');
        }
//        if (!criteria.properties.POIName && !criteria.properties.CATEGORY){
//            dCM.Exception.raise('Can\'t search : Provide either a search term or a category');
//        }

        return dCM.JSRequest.send(this.getXML(criteria), this.handleResponse.bind(this,callback), this.handleFailure.bind(this, callback));

    },
    
	/**
	 * @private
	 */
    handleResponse: function(callback, response){
        var poiContextObject;
        // multi
        try {
            if(dCM.Utilities.isArray(response.XLS.Response)){

                var pois = [];
                for(var i=0;i<response.XLS.Response.length;i++){
                    poiContextObject = response.XLS.Response[i].DirectoryResponse.POIContext;
                    if(poiContextObject){
                        var poiContext = dCM.Utilities.makeArrayFix(poiContextObject);
                        pois = pois.concat(poiContext);
                    }
                }
                callback(pois);
            } else { // single
                poiContextObject = response.XLS.Response.DirectoryResponse.POIContext;
                if(poiContextObject){
                    callback( dCM.Utilities.makeArrayFix(response.XLS.Response.DirectoryResponse.POIContext));
                } else {
                    callback([]);
                }
            }
        } catch (e){
            
            callback([], {message: e.message, param: response});
            //dCM.Exception.raise('Error executing search: ' + e.message);
        }
    },

    /**
	 * @private
	 */
    handleFailure: function(callback, param){
        //dCM.Exception.raise('Error executing search: Timeout');
        callback([], {param: param, message: 'Error executing search'});
    }

}
/**
 *  @class The Geocoder object is a static object that provides an interface
 * to execute Geocoding and Reverse Geocoding using deCarta's WebServices API.
 *  @description
 *  The Geocoder object has two specific functions:
 *  <ul>
 *    <li>{@link #geocode} - Used to perform
 *  geocoding (the translation of an address into a latitude and longitude
 *  coordinate)</li>
 *    <li>{@link #reverseGeocode} - Used to translate a
 *  latitude and longitude coordinate into an approximate address.</li>
 *  </ul>
 *
 * @description Static 
 *
 * @see dCM.FreeFormAddress
 * @see dCM.StructuredAddress
 */

dCM.Geocoder = {

    /**
     * @private
     * Get XML for a geocoding request
     */
    getGeocodeXML: function(address){


        if (address.type == 'freeForm'){
            var xml =
                '      <xls:Request maximumResponses="10" version="1.0" requestID="9132342" methodName="GeocodeRequest">' +
                '            <xls:GeocodeRequest returnFreeForm="false">' +
                                  address.toXML() +
                '            </xls:GeocodeRequest>' +
                '      </xls:Request>';

            

        } else {
            var xml =
            "      <xls:Request maximumResponses='10' version='1.0' requestID='4387206' methodName='GeocodeRequest'>"+
            "            <xls:GeocodeRequest returnFreeForm='false'>"+
            "                  <xls:Address countryCode='"+address.locale.country+"' language='"+address.locale.language+"'>";
        if (address.buildingNumber || address.street){
            xml +=  "           <xls:StreetAddress>" +
            "                              <xls:Building number='"+address.buildingNumber+"'/>"+
            "                              <xls:Street>"+address.street+"</xls:Street>" +
            "                        </xls:StreetAddress>";
        }

        if (address.municipality)  xml +=   "                        <xls:Place type='Municipality'>"+address.municipality+"</xls:Place>";
        if (address.municipalitySubdivision)  xml +=   "                        <xls:Place type='MunicipalitySubdivision'>"+address.municipalitySubdivision+"</xls:Place>";
        if (address.countrySubdivision)  xml +=    "                        <xls:Place type='CountrySubdivision'>"+address.countrySubdivision+"</xls:Place>";
        if (address.countrySecondarySubdivision)  xml +=    "                        <xls:Place type='CountrySecondarySubdivision'>"+address.countrySecondarySubdivision+"</xls:Place>";
        if (address.countryTertiarySubdivision)  xml +=    "                        <xls:Place type='CountryTertiarySubdivision'>"+address.countryTertiarySubdivision+"</xls:Place>";
        if (address.postalCode)  xml +=    "                        <xls:PostalCode>"+address.postalCode+"</xls:PostalCode>";

        xml += "                  </xls:Address>"+
            "            </xls:GeocodeRequest>"+
            "      </xls:Request>";
        }

        return xml;
/*
Free form


<xls:XLS version="1" xls:lang="en" xmlns:xls="http://www.opengis.net/xls" rel="4.5.1.sp02" xmlns:gml="http://www.opengis.net/gml">
      <xls:RequestHeader clientName="map-sample-app" sessionID="8285826" clientPassword="letmein" />
      <xls:Request maximumResponses="10" version="1.0" requestID="9132342" methodName="DirectoryRequest">
            <xls:GeocodeRequest returnFreeForm="false">
                  <xls:Address countryCode="US" language="EN">
                        <xls:freeFormAddress>409 tilton ave san mateo</xls:freeFormAddress>
                  </xls:Address>
            </xls:GeocodeRequest>
      </xls:Request>
</xls:XLS>


Structured:

<xls:XLS version='1' xls:lang='en' xmlns:xls='http://www.opengis.net/xls' rel='4.5.1.sp02' xmlns:gml='http://www.opengis.net/gml'>
      <xls:RequestHeader clientName='map-sample-app' sessionID='1380293' clientPassword='letmein' configuration='global-decarta'/>
      <xls:Request maximumResponses='10' version='1.0' requestID='4387206' methodName='GeocodeRequest'>
            <xls:GeocodeRequest returnFreeForm='false'>
                  <xls:Address countryCode='US' language='EN'>
                        <xls:StreetAddress>
                              <xls:Building number='409'/>
                              <xls:Street>Tilton</xls:Street>
                        </xls:StreetAddress>
                        <xls:Place type='Municipality'>san mateo</xls:Place>
                        <xls:PostalCode>94401</xls:PostalCode>
                  </xls:Address>
            </xls:GeocodeRequest>
      </xls:Request>
</xls:XLS>

*/

    },

    /**
     * @private
     * Get XML for a rev gecoding request
     */
    getRevGeocodeXML: function(pos){
/*
 <xls:XLS version='1' xls:lang='en' xmlns:xls='http://www.opengis.net/xls' rel='4.5.1.sp02' xmlns:gml='http://www.opengis.net/gml'>
      <xls:RequestHeader clientName='map-sample-app' sessionID='4212349' clientPassword='letmein' configuration='global-decarta'/>
      <xls:Request maximumResponses='10' version='1.0' requestID='5314108' methodName='ReverseGeocodeRequest'>
            <xls:ReverseGeocodeRequest>
                  <xls:Position>
                        <gml:Point>
                              <gml:pos>37.5 -112.5</gml:pos>
                        </gml:Point>
                  </xls:Position>
                  <xls:ReverseGeocodePreference>StreetAddress</xls:ReverseGeocodePreference>
            </xls:ReverseGeocodeRequest>
      </xls:Request>
</xls:XLS>
 */

        var xml = 
         "<xls:Request maximumResponses='10' version='1.0' requestID='0123456789' methodName='ReverseGeocodeRequest'>" +
                "<xls:ReverseGeocodeRequest>" +
                      "<xls:Position>"+
                            "<gml:Point>"+
                                  "<gml:pos>" + pos.getLat()  + " " + pos.getLon() + "</gml:pos>"+
                            "</gml:Point>"+
                      "</xls:Position>"+
                      "<xls:ReverseGeocodePreference>StreetAddress</xls:ReverseGeocodePreference>"+
                "</xls:ReverseGeocodeRequest>"+
          "</xls:Request>";

         return xml;

    },
	
    /**
     * Translate an address into a list of Positions (latitude and
	 * longitude coordinates).
     * Since user input may often be incomplete, it is important to be able to
     * accept the multiple matches that can be returned from a geocode request.
     * Geocoding is an asynchronous request made to the DDS Web Services, and thus
     * requires a callBack function to catch the returned results.
     * The application should provide a callBack function that has the following prototype:
     * <pre>
     * function geocodeCallBack(results)
     * </pre>
     * Where <pre>results</pre> is an array, with each element of the array
	 * having the following structure:
	 * 
     * <pre>
     * resultsItem = {
     *      Address: {
	 *          Place: {
	 *              0: {
     *                  content: string,
	 *                  type: string //A structured address field name, such 
	 *                               //as countryCode, Municipality, etc.
	 *              }
	 *              ...
	 *              N: {
     *                  content: string,
	 *                  type: string //A structured address field name, such 
	 *                               //as countryCode, Municipality, etc.
	 *              }
	 *          }
	 *          countryCode: string //Country, formatted as ISO 3166-1 alpha-2 (2 digit) country code.
	 *                              //See http://developer.decarta.com/docs/read/bada_api/Features
	 *                              //for supported countries.
	 *          StreetAddress: {
	 *              Street: string
	 *          }
	 *      },
	 *      BoundingBox: {
     *          pos: {
     *              0: string "lat lon",
	 *              1: string "lat lon"
     *          }
	 *      }
     *      GeocodeMatchCode: {
     *          accuracy: float,
     *          matchType: string
     *      },
	 *      LineString: {
	 *          pos: {
     *              0: string "lat lon",
	 *              ...
	 *              N: string "lat lon"
	 *          }
     *      Point: {
     *          pos: string "lat lon"
     *      }
     * }
     * </pre>
     *
     * @param {Address} address StructuredAddress or FreeFormAddress to be geocoded
	 * <p><strong>Note:</strong> This can be EITHER an instance of a
	 * {@link dCM.StructuredAddress} or
	 * {@link dCM.FreeFormAddress} class OR an equivalent structure
	 * created as an inline object.</p>
	 * <p>An inline StructuredAddress can be implemented by defining an inline object with one or more of these fields:</p>
	 * <ul>
     * <li>buildingNumber: (optional) Address number for this location.</li>
	 *   <li>countryCode: Country, formatted as ISO 3166-1 alpha-2 (2 digit) country code. 
	 *       See http://developer.decarta.com/docs/read/bada_api/Features for supported countries.</li>
     *   <li>countrySecondarySubdivision: (optional) County (or equivalent)
     *       for this location.</li>
     *   <li>countrySubdivision: (optional) Sub-country administrative
     *       division (ie the state, province, or region) for this location.</li>
	 *   <li>countryTertiarySubdivision: (optional) Additional subdivision (when relevant)</li>
	 *   <li>landmark</li>
	 *   <li>locale: Language, formatted as ISO 639 Language code.
	 *       See http://developer.decarta.com/docs/read/bada_api/Features for supported languages.</li>
     *   <li>municipality: (optional) City, town, village, or equivalent for
     *       this location.</li>
     *   <li>municipalitySubdivision: (optional) Recognized neighborhood,
     *       borough, or equivalent for this location.</li>
     *   <li>postalCode: (optional) Postal code, postcode, ZIP code, or
     *        equivalent numerical code for this location.</li>
	 *   <li>speedLimit: [Not currently documented]</li>
     *   <li>street: (optional) Name and designation of the street (ie Main
     *       St) for this location.</li>
	 *   <li>streetNameAndNumber: [Not currently documented]</li>
	 *   <li>type: Must be set to 'structured' to create an inline structured address object</li>
	 * </ul>
     *
	 * <p>An inline FreeFormAddress can be implemented by defining these fields:</p>
	 * <ul>
	 *   <li>(string) address: The free-form address</li>
	 *   <li>locale: Language, formatted as ISO 639 Language code.
	 *       See http://developer.decarta.com/docs/read/bada_api/Features for supported languages.</li>
	 *   <li>type: Must be set to 'freeForm' to create an inline Free Form address object</li>
	 * </ul>
     * <br />
     * @param {function} callback The callback function that will receive the results of the geocode operation
     * @throws {Exception} Invalid or missing address object passed as parameter
     * @throws {Exception} Invalid or missing callback function
     */
    geocode: function(address, callback){
        if (!address.type || !(address.type in {'freeForm': true, 'structured': true})) {
            dCM.Exception.raise('When using the geocode function, the first parameter must be an address object');
        }
        if (typeof callback !== 'function'){
            dCM.Exception.raise('When using the geocode function, the second parameter must be a callback function');
        }

        dCM.JSRequest.send(this.getGeocodeXML(address), this.handleResponse.bind(this, callback), this.handleFailure.bind(this, callback));

    },


    /**
     * Translate a Position (latitude, longitude coordinate) into an Address.
     * Reverse geocodes are always approximated to the best possible address
     * within the range of addresses available in the map data. Reverse geocoding
     * is an asynchronous request made to the DDS Web Services,
     * and thus requires a callBack function to catch the returned results.
     * The application should provide a callBack function that has the following
     * prototype:
     * <pre>
     *  function reverseGeocodeCallBack(result)
     * </pre>
     * If a valid reverse geocode can be made, the resulting position will be
	 * passed to the callBack in an result object. The structure of the result object
	 * is as follows:
     * <pre>
     * result = {
     *      Address: { //The complete address associated with the returned matching
	 *                 //position (original address may have been wrong or    
	 *                 //incomplete)
	 *          Place: {
	 *              0: {
     *                  content: string,
	 *                  type: string //A structured address field name, such 
	 *                               //as countryCode, Municipality, etc.
	 *              }
	 *              ...
	 *              N: {
     *                  content: string,
	 *                  type: string //A structured address field name, such 
	 *                               //as countryCode, Municipality, etc.
	 *              }
	 *          }
	 *          PostalCode: string,
	 *          countryCode: string, //Country, formatted as ISO 3166-1 alpha-2 (2 digit) country code.
	 *                               //See http://developer.decarta.com/docs/read/bada_api/Features
	 *                               //for supported countries.
	 *          StreetAddress: {
	 *              Street: string
	 *          }
	 *      },
	 *      Point: { //The geographic point corresponding to the requested address
	 *          pos: string "lat lon"
	 *      }
     * </pre>	 
     * A failed reverse geocode will return an empty Address (result.Address.toString() == "").
     * @param {dCM.Position} position The position to reverse geocode.
	 * This can be passed as an instance of a {@link dCM.Position} class,
	 * or as an inline-object with the following fields:
	 * <ul>
	 *   <li>{float} lat: Latitude of the position</li>
	 *   <li>{float} lat: Longitude of the position</li>
	 * </ul>
	 *
     * @param {function} callback Function that will handle the result of the reverse geocode.
     * @throws {Exception} Invalid or missing callback function
     *
     */
    reverseGeocode: function(position, callback){
        if (typeof callback !== 'function'){
            dCM.Exception.raise('When using the reverseGeocode function, the second parameter must be a callback function');
        }

        dCM.JSRequest.send(this.getRevGeocodeXML(position), this.handleRevResponse.bind(this, callback), this.handleFailure.bind(this, callback));
    },

    /**
     *@private
     */
    handleRevResponse: function(callback, response){
        var t = response.XLS.Response.ReverseGeocodeResponse.ReverseGeocodedLocation;
        var res = {};
        res.Address = new dCM.StructuredAddress();
        res.Address.fromWSResponse(t.Address);
        var sPos = t.Point.pos.split(" ");
        res.Position = new dCM.Position(sPos[0],sPos[1]);
        callback(res, t);
    },

    /**
     * @private
     */
    handleResponse: function(callback, response){
                var err = 'Unknown';

                try {
                    if (response.XLS.Response.ErrorList.Error.message){
                        callback({error: response.XLS.Response.ErrorList.Error.message});
                        return;
                    }
                } catch (e) {
                    //there is no such field forget it.
                }
		try {
			var t = response.XLS.Response.GeocodeResponse.GeocodeResponseList.GeocodedAddress;
			var res = null;
			if (typeof t == 'object' && !t.length){
				res = [];
				res.push(t);
			} else {
				res = t;
			}
			for (var i =0; i < res.length; i++){
				var add = new dCM.StructuredAddress();
				add.fromWSResponse(res[i].Address);
				res[i].Address = add;
				var sPos = res[i].Point.pos.split(" ");
				res[i].Position = new dCM.Position(sPos[0],sPos[1]);
			}
			callback(res, t);
		} catch (e){
                        try {
                            err = response.XLS.Response.ErrorList.Error.message;
                        } catch (e){}
                        dCM.Exception.raise('Error handling response: ' + err);
		}
                
    },

    /**
     * @private
     */
    handleFailure: function(){

    }

}


/**
 * @class
 * The Routing class is a static object which provides a single
 * {@link #execute} method for calculating a route using the deCarta DDS
 * Web Services.
 *
 * @description Static class with {@link #execute} method for calculating a route.
 *
 * @see dCM.RouteCriteria
 */

dCM.Routing = {

    /**
	 * @private
	 */
    getXML: function(criteria){
        /** Example XML
         *
<xls:XLS version='1' xls:lang='en' xmlns:xls='http://www.opengis.net/xls' rel='4.5.1.sp02' xmlns:gml='http://www.opengis.net/gml'>
      <xls:RequestHeader clientName='map-sample-app' sessionID='3768276' clientPassword='letmein' configuration='global-decarta'/>
      <xls:Request maximumResponses='10' version='1.0' requestID='3332721' methodName='DetermineRouteRequest'>
            <xls:DetermineRouteRequest distanceUnit='M' routeQueryType='RMAN' provideRouteHandle='true'>
                  <xls:RoutePlan>
                        <xls:RoutePreference>Fastest</xls:RoutePreference>
                        <xls:WayPointList>
                              <xls:StartPoint>
                                    <xls:Position>
                                          <gml:Point>
                                                <gml:pos>37.77875373897436 -122.43852122235107</gml:pos>
                                          </gml:Point>
                                    </xls:Position>
                              </xls:StartPoint>
                              <xls:EndPoint>
                                    <xls:Position>
                                          <gml:Point>
                                                <gml:pos>37.77544959070443 -122.42852194714357</gml:pos>
                                          </gml:Point>
                                    </xls:Position>
                              </xls:EndPoint>
                        </xls:WayPointList>
                  </xls:RoutePlan>
                  <xls:RouteInstructionsRequest providePoint='true' rules='maneuver-rules'/>
                  <xls:RouteGeometryRequest returnRouteIDOnly='false'/>
            </xls:DetermineRouteRequest>
      </xls:Request>
</xls:XLS>
         */

        var head =
              "<xls:Request maximumResponses='10' version='1.0' requestID='0123456789' methodName='DetermineRouteRequest'>" +
                    "<xls:DetermineRouteRequest distanceUnit='" + criteria.distanceUnit + "' routeQueryType='" + criteria.routeQueryType + "' provideRouteHandle='" + criteria.provideRouteHandle + "'>" +
                          "<xls:RoutePlan>" +
                                "<xls:RoutePreference>" + criteria.routePreference+ "</xls:RoutePreference>" +
                                "<xls:WayPointList>";

        var waypoints = '';
        //pop off start and end, we'll be left with the viapoints
        var start = criteria.waypoints.shift();
        var end = criteria.waypoints.pop();

        waypoints = "<xls:StartPoint><xls:Position><gml:Point><gml:pos>" + start.getLat() + " " + start.getLon() + "</gml:pos></gml:Point></xls:Position></xls:StartPoint>";
        for (var i = 0; i< criteria.waypoints.length; i++){
            var cur = criteria.waypoints[i];
            waypoints += "<xls:ViaPoint><xls:Position><gml:Point><gml:pos>" + cur.getLat() + " " + cur.getLon() + "</gml:pos></gml:Point></xls:Position></xls:ViaPoint>";
        }
        waypoints += "<xls:EndPoint><xls:Position><gml:Point><gml:pos>" + end.getLat() + " " + end.getLon() + "</gml:pos></gml:Point></xls:Position></xls:EndPoint>";


        var foot =              "</xls:WayPointList>" +
                          "</xls:RoutePlan>" +
                          "<xls:RouteInstructionsRequest providePoint='true' rules='"+criteria.instructionRules+"'/>" +
                          "<xls:RouteGeometryRequest returnRouteIDOnly='false'/>" +
                    "</xls:DetermineRouteRequest>" +
              "</xls:Request>";

            return head + waypoints + foot;
    },

    /**
     * Executes the routing query.
     * @param {dCM.RouteCriteria} criteria the route criteria to be used.
	 * This can be either an instance of a {@link dCM.RouteCriteria}
	 * object, or it can be an inline object with the same structure, as follows:
	 *
	 * <pre>
	 *   object: {
	 *       distanceUnit: string, //Unit for route distance measurement. 
	 *                             //Valid values are: 'KM' (Kilometers), 'M' (Meters), 'MI' (Miles), 'FT' (Feet).
	 *       instructionProvidePoint: bool, //[[Not yet defined]
	 *       instructionRules: string, //[Not yet defined]
	 *       provideRouteHandle: bool, //Provide a route Id for further operations on route
	 *       returnIdOnly: //<em>true</em> will cause route query to return a server route ID
	 *       routePreference: string, //"AvoidFreeways", "Easy", "Fastest", "MoreFreeways", "NoFreeways", "Pedestrian", "Shortest"
	 *       routeQueryType: string, //Type of DDS Query, 'RMAN' or 'RTXT' [Need to define valid values and what they indicate.]
	 *       waypoints: //Must include at least start and end points
	 *           0: {dCM.Position}
	 *           ...
	 *           N: {dCM.Position}
	 * </pre>
	 *
     * @param {function} callback A user defined function that will receive
     * the respose to the query from the DDS Web Service. <br />
     * Function signature: <br />
     * function routeResponseCallback(RouteReturnObject)<br />
	 * The callback function is passed a single object with the following structure:
 * <pre>
RouteReturnObject = {
    RouteGeometry:{ //Contains the route geometry
        LineString: { //Contains an array of positions
            pos:[] //Array of positions represented as space separated lat lon pairs (ex: "lat lon")
        }
    },
    RouteInstructionsList:{ //Instruction list for the route
        RouteInstruction:[ //Array of instruction objects
            {
                distance:{ //Distance along the route
                    value: 0 //Value of the distance object
                },
                duration: '', //Duration of the manouver
                description: '', //Description of the maneuver
                Instruction: '', //A human readable description of this route maneuver.
                tour: 0, //Which waypoint this maneuver is associated with in an optimized route.
                Point: '' //A lat long pair (space separated)
            },
        ],
        lang: '' //Language for this route
    },
    RouteSummary:{ //Summary of the route
        BoundingBox:{ //Contains positions describing a bounding box for the route
            pos: [{ //Array of two positions, top left amd bottom right
                content: '' //Content of each position, as a space separated lat long pair
            }]
        },
        TotalDistance:{ //Object representing the total distance covered by the route
            uom: '', //Unit of measure
            value: 0 //Value of the distance
        },
        TotalTime: '' //Total time required
    },
    RouteHandle:{ //Handle to the route (can be used for later queries)
        serviceID: '', //ServiceID
        routeID: '' //RouteID
    }
} 
 * </pre>	 
     *
     */
    execute: function(criteria, callback){

        if (!criteria.waypoints || criteria.waypoints.length < 2) {
            dCM.Exception.raise('At least two waypoints are required for routing. criteria.waypoints is not a valid array, or does not contain 2 waypoints.');
        }

        var defaults = new dCM.RouteCriteria();

        criteria = dCM.Utilities.extendObject(defaults, criteria);

        dCM.JSRequest.send(this.getXML(criteria), this.handleResponse.bind(this,callback), this.handleFailure.bind(this, callback));

    },

    /**
	 * @private
	 */
    handleResponse: function(callback, response){
		try {
			callback(response.XLS.Response.DetermineRouteResponse);
		} catch (e){
			callback({}, {message: 'Error executing request'});
		}
    },

    /**
	 * @private
	 */
    handleFailure: function(){
		callback({}, {message: 'Error executing request'});
    }
}
/**
 * @class The StructuredAddress class holds structured address information.
 * Structured address information is pre-parsed and assigned an appropriate field
 * within the class; there is no confusion over whether the number is a postal
 * code or a block address number. This class can be used to pass an address
 * to a {@link dCM.Geocoder}:geocode() request. It can also be used to
 * parse a response from a {@link dCM.Geocoder}:reverseGeocode() request,
 * by passing the return object from that request to the {@link #fromWSResponse}
 * method of this class.
 *
 * For the purposes of the {@link dCM.Geocoder}:geocode() function,
 * you can either create an instance of a StructuredAddress, or you can create an
 * inline object with the following structure:
 * <pre>
 *   object: {
 *       buildingNumber: string, //(optional) Address number for this location.
 *       countryCode: string, //(optional) Country, formatted as ISO 3166-1 alpha-2 (2 digit) country code.
 *                            //See http://developer.decarta.com/docs/read/bada_api/Features
 *                            //for supported countries.
 *       countrySecondarySubdivision: string, //(optional) County (or equivalent) for this location.
 *       countrySubdivision: string, //(optional) Sub-country administrative
 *       division (ie the state, province, or region) for this location.
 *       countryTertiarySubdivision: string, //(optional) Additional subdivision (when relevant)
 *       landmark: string, //(optional) 
 *       locale: string, //(optional) Language, formatted as ISO 639 Language code.
 *                       //See http://developer.decarta.com/docs/read/bada_api/Features
 *                       //for supported languages.
 *       municipality: string, //(optional) City, town, village, or equivalent for this location.
 *       municipalitySubdivision: string, //(optional) Recognized neighborhood, borough, or equivalent for this location.
 *       postalCode: string, //(optional) Postal code, postcode, ZIP code, or equivalent numerical code for this location.
 *       speedLimit: string, //(optional) [Not Yet Defined]
 *       street: string, //(optional) Name and designation of the street (ie Main St) for this location.
 *       streetNameAndNumber: string, //(optional) [Not Yet Defined]
 *       type: string //(required) Must be set to 'structured' to create an inline structured address object
 *   }
 * </pre>
 *
 * @description The StructuredAddress class holds structured address information for the Geocoder

 * @constructor
 * @param {Object} addressObj
 * An object containing any of the following fields:
 * <ul>
 *   <li>buildingNumber: (optional) Address number for this location.</li>
 *   <li>countryCode: Country, formatted as ISO 3166-1 alpha-2 (2 digit) country code.
 *       See http://developer.decarta.com/docs/read/bada_api/Features for supported countries.</li>
 *   <li>countrySecondarySubdivision: (optional) County (or equivalent)
 *       for this location.</li>
 *   <li>countrySubdivision: (optional) Sub-country administrative
 *       division (ie the state, province, or region) for this location.</li>
 *   <li>countryTertiarySubdivision: (optional) Additional subdivision (when relevant)</li>
 *   <li>landmark</li>
 *   <li>locale: Language, formatted as ISO 639 Language code.
 *       See http://developer.decarta.com/docs/read/bada_api/Features
 *       for supported languages.</li>
 *   <li>municipality: (optional) City, town, village, or equivalent for
 *       this location.</li>
 *   <li>municipalitySubdivision: (optional) Recognized neighborhood,
 *       borough, or equivalent for this location.</li>
 *   <li>postalCode: (optional) Postal code, postcode, ZIP code, or
 *        equivalent numerical code for this location.</li>
 *   <li>speedLimit: [Not Yet Defined]</li>
 *   <li>street: (optional) Name and designation of the street (ie Main
 *       St) for this location.</li>
 *   <li>streetNameAndNumber: [Not Yet Defined]</li>
 * </ul>
 * @param {dCM.Locale} locale optional What parsing rules should be used to improve
 * the address match rate. Default is equivalent to a Locale of "en" (English)
 * language and "US" (United States) country parsing.
 *
 * @see dCM.Geocoder
 * @see dCM.FreeFormAddress
 */
dCM.StructuredAddress = function(addressObj, locale){
    if (!addressObj) addressObj = {};
    //this.setAddress(addressObj);
    this.locale = locale || new dCM.Locale("en","US");


    // The building number could be 0, I guess
    if ( addressObj.buildingNumber || addressObj.buildingNumber == 0 ) {
        this.buildingNumber = addressObj.buildingNumber;
    } else {
        this.buildingNumber = "";
    }
    this.landmark = "";
    this.street = addressObj.street || "";
    this.streetNameAndNumber = "";
    this.speedLimit = "";
    this.countryCode = "";
    this.countrySubdivision = addressObj.countrySubdivision || "";
    this.countrySecondarySubdivision = addressObj.countrySecondarySubdivision || "";
    this.countryTertiarySubdivision = "";
    this.municipality = addressObj.municipality || "";
    this.postalCode = addressObj.postalCode || "";
    this.municipalitySubdivision = addressObj.municipalitySubdivision || "";

    this.type = 'structured';

}

dCM.StructuredAddress.prototype = {

    /**
	 * Provides the structured address as a single string, formatted ready for
	 * display to the user
	 * @return {string} String containing the address in a single string
	 */
    toString: function(){

        var retval = "";
        if ( this.buildingNumber != "" && typeof this.buildingNumber != 'object')
            retval += this.buildingNumber + " ";
        if ( this.street != "" && typeof this.street === 'string')
            retval += this.street + " ";
        if ((dCM.Configuration.country==='CH') && this.municipalitySubdivision != "" && typeof this.municipalitySubdivision === 'string'){
            retval += this.municipalitySubdivision + " ";
        }
        if ( this.municipality != "" && typeof this.municipality === 'string'){
            retval += this.municipality + " ";
        } else {
            if ( this.municipalitySubdivision != "" && typeof this.municipalitySubdivision === 'string'){
                retval += this.municipalitySubdivision + " ";  
            }
        }
        if ( this.countrySubdivision != "" && typeof this.countrySubdivision === 'string')
            retval += this.countrySubdivision + " ";
        if ( this.postalCode != "" && typeof this.postalCode === 'string')
            retval += this.postalCode;
        return retval;
    },

    /**
	 * @private
	 * Initializes the properties of this StructuredAddress class using
	 * the values returned from a {@link dCM.Geocoder}:reverseGeocode()
	 * function call in the result data structure passed to the callback function.
	 * @param {reverseGeocodeResult} r Value passed into the callback function
	 * of a {@link dCM.Geocoder}:reverseGeocode() request.
	 */
    fromWSResponse: function(r){
        if (r.StreetAddress){
            if (r.StreetAddress.Building){
                this.buildingNumber = r.StreetAddress.Building.number;
            }
            if (r.StreetAddress.Street) this.street = r.StreetAddress.Street;
        }
        if (r.countryCode) this.locale.country = r.countryCode;
        if (r.language) this.locale.language = r.language;
        if (r.Place)
            for (var i =0; i < r.Place.length; i++){
                var prop = r.Place[i].type.substring(0,1).toLowerCase() + r.Place[i].type.substring(1);
                this[prop] = r.Place[i].content;
            }
    },
    
	/**
	 * @private
	 */
    fromWSAddressResponse: function(r){
        for (var prop in this){
            if (this.hasOwnProperty(prop) && r[prop])
            this[prop] = r[prop];
        }
    },

    /**
     * @private
     */
    toXML: function(){

    },

    /**
	 * Generates a FreeFormAddress from this structured address
	 * @return {dCM.FreeFormAddress} A FreeFormAddress object containing the address in a single string
	 */
    toFreeForm: function(){
        return new dCM.FreeFormAddress(this.toString(), new dCM.Locale('EN', 'US'));
    }

}

/**
 * @class Represents a Free Form Address.
 * For the purposes of the {@link dCM.Geocoder}:geocode() function,
 * you can either create an instance of a FreeFormAddress, or you can create an
 * inline object with the following structure:
 * <pre>
 *   object: {
 *       address: string, //free form address
 *       locale: dCM.Locale, //a locale object
 *       type: string = 'freeForm'
 *   }
 * </pre>
 *
 * @description Free Form Address for use with Geocoder
 *
 * @constructor
 * @param {String} address The free-form address, containing a partial or complete 
 * address
 * @param {dCM.Locale} locale A Locale object
 * 
 * @see dCM.Geocoder
 * @see dCM.StructuredAddress
 */


dCM.FreeFormAddress = function(address, locale){
    this.address = address;
    this.locale = locale;
    this.type = 'freeForm';
}

dCM.FreeFormAddress.prototype = {

    /**
	 * @private
	 */
    toString: function(){

    },

    /**
     * Returns an XML Representation of the FreeFormAddress
     * @return {string} XML formatted address
     */
    toXML: function(){


        var xml =
        '<xls:Address countryCode="'+this.locale.getCountry()+'" language="'+this.locale.getLanguage()+'">' +
            '<xls:freeFormAddress>' + this.address + '</xls:freeFormAddress>' +
        '</xls:Address>';

        return xml;
    }
}
/**
 *  @class
 *  Data structure for POI request parameters, used with the
 *  {@link dCM.POISearch}:execute() method. The structure of the
 *  SearchCriteria class is as follows:
 * <pre>
 *  SearchCriteriaObject: {
 *      queryString: null, //[Not yet defined]
 *      maximumResponses: int, //Max number of responses that will be returned
 *      database: string, //Database that will be queried for this search
 *      sortDirection: string, //Sort order for results ["Ascending", "descending"]
 *      sortCriteria: string, //Property results will be sorted by ["Distance", "Score"]
 *      rankCriteria: string, //Property by which results will be ranked [Distance, Score]
 *      allowAggregates: bool, //Allow Aggregates
 *      retrieveAll: bool, //retreive all values
 *      properties: { //Object describing search properties, contains ONE OF:
 *          CATEGORY: string, //If present, this will perform a category search on this value
 *          KEYWORD: string, //If present, this will perform a Keyword search on this value
 *          POIName: string //If present, this will perform a freeform POI Search on this value
 *      }
 *      position: dCM.Position, //Position where the search is centered
 *      radius: dCM.Radius, //Radius of the search
 *      routeId: int, //if routeId is set, the search will be performed along the route. 
 *      corridorType: //[Not yet defined]
 *      map: dCM.Map //Optionally pass Map instead of position+radius
 * </pre>
 *
 * @description Data structure for POI request parameters.
 *
 * @see dCM.POISearch
 */

dCM.SearchCriteria=function(){}
dCM.SearchCriteria.prototype={
    /**
     *
     */
    queryString: null,
    /**
     * (int) Max number of responses that will be returned (default=10)
     */
    maximumResponses: 10,
    /**
     * (string) Database that will be queried for this search
	 * (default='search:decarta:poi')
     */
    database: 'search:decarta:poi',
    /**
     * (string) Sort order for results ["Ascending" (default), "descending"]
     */
    sortDirection: "Ascending",
    /**
     * (string) Property results will be sorted by ["Distance" (default), "Score"]
     */
    sortCriteria: "Distance",
    /**
     * (string) Property by which results will be ranked [Distance, Score (default)]
     */
    rankCriteria: "Score",
    /**
     * (bool) Allow Aggregates (default=false)
     */
    allowAggregates: false,
    /**
     * (bool) retreive all values (default=false)
     */
    retrieveAll: false,
    /**
     * Object describing search properties
     * Can contain one of the following:
     * <ul>
     *  <li>CATEGORY : "string". <br />This will perform a category search.</li>
     *  <li>KEYWORD : "string". <br />This will perform a Keyword search.</li>
     *  <li>POIName : "string". <br />This will perform a freeform POI Search.</li>
     * </ul>
     */
    properties: {},
    /**
     * {@link dCM.Position} Position where the search is centered
     */
    position: null,
    /**
     * {@link dCM.Radius} Radius of the search
     */
    radius: new dCM.Radius(5, 'km'),
    /**
     * (int) if routeId is set, the search will be performed along the route with
	 * that ID on the DDS WebServices server.
     */
    routeId: null,
    /**
     * [Not yet defined]
     */
    corridorType: null,
    /**
     * {@link dCM.Map} Instead of passing position and radius, you can
	 * pass a reference to your map and Position and Radius will be set according
	 * to the currently visible area on the map.
     */
    map: null

}

/**
 *  @class
 *  Data structure for route request parameters, used with the
 *  {@link dCM.Routing}:execute() method. The structure of the
 *  RouteCriteria class is as follows:
 * <pre>
 *   object: {
 *       distanceUnit: string, //Unit for route distance measurement. Valid values are: 'KM' (Kilometers), 'M' (Meters), 'MI' (Miles), 'FT' (Feet).
 *       instructionProvidePoint: bool, //[Not yet defined]
 *       instructionRules: string, //[Not yet defined]
 *       provideRouteHandle: bool, //Provide a route Id for further operations on route
 *       returnIdOnly: //<em>true</em> will cause route query to return a server route ID
 *       routePreference: string, //"AvoidFreeways", "Easy", "Fastest", "MoreFreeways", "NoFreeways", "Pedestrian", "Shortest"
 *       routeQueryType: string, //Type of DDS Query, 'RMAN' or 'RTXT' [Need to define valid values and what they indicate.]
 *       waypoints: //Must include at least start and end points
 *           0: {dCM.Position}
 *           ...
 *           N: {dCM.Position}
 * </pre>
 *
 * @description Data structure for setting route request parameters.
 *
 * @see dCM.Routing
 */
dCM.RouteCriteria = function(){};
dCM.RouteCriteria.prototype = {
    /**
     * Unit for route distance measurement. Valid values are: 'KM' (Kilometers), 'M' (Meters), 'MI' (Miles), 'FT' (Feet)
     */
    distanceUnit : 'M',
    /**
     * Type of DDS Query, 'RMAN' or 'RTXT' [Need to define valid values and what they indicate.]
     */
    routeQueryType: 'RMAN',
    /**
     * Provide a route Id for further operations on route
     */
    provideRouteHandle: 'true',
    /**
     * Route preferences.
     * <p>The various different routing styles are summarized below.</p>
     * <ul>
     * <li>"AvoidFreeways" = Return a vehicular route that avoids limited access
     * roads (e.g. freeways) as much as possible.</li>
     * <li>"Easy" = Return a vehicular route that attempts to make as few turns,
     * balancing this constraint with the shortest travel time.</li>
     * <li>"Fastest" = (DEFAULT) Return a vehicular route with the smallest, calculated
     * travel time. This is the standard, and default routing style.</li>
     * <li>"MoreFreeways" = Return a vehicular route that will attempt to use as
     * many limited access roads (e.g. freeways) as possible.</li>
     * <li>"NoFreeways" = Return a vehicular route that avoids limited access
     * roads (e.g. freeways) entirely. This route will take only surface street
     * and arterial roads to the destination.</li>
     * <li>"Pedestrian" = Return a route fit for Pedestrian traffic. Routes will
     * avoid limited access roads, ignore vehicular signage restrictions, obey
     * impassible physical restrictions (like grade separations), take the most
     * direct path possible, and utilize pedestrian only foot-traffic paths.</li>
     * <li>"Shortest" = Return a vehicular route with the shortest total distance
     * traveled.</li>
     * </ul>
     */
    routePreference: 'Fastest',
	
    /**
     * An array of {@link dCM.Position}s, from start-to-end of the
	 * route. Must include at least 2 (start and end).
     */
    waypoints: [],
	
    /**
     * [Not yet defined]
     */
    instructionProvidePoint: 'true',
	
    /**
     * [Not yet defined]
     */
    instructionRules: 'maneuver-rules',
	
    /**
     * If set to <em>true</em>, the route calculation will only return a route ID.
	 * Default=false
     */
    returnIdOnly: 'false'

}
/**
 * @class
 * <p>
 * PositionAnimator allows you to define a start and end position and it will
 * provide a sequence of interpolated positions suitable for an animation.
 * </p>
 * <p>A typical use case would be animating the map {@link dCM.Map} to
 * move smoothly from one center position to another one, or animating a map
 * overlay object {@link dCM.MapOverlay} to move
 * from a position to a different one</p>
 *
 * @description Used to animate a map or map overlay object.
 * 
 * @constructor
 * @param {object} opt Options, a structure with the following fields:
 * <ul>
 *   <li>start: {@link dCM.Position} the starting position</li>
 *   <li>end: {@link dCM.Position} the ending position</li>
 *   <li>start: {@link dCM.Position} the starting position</li>
 *   <li>duration: {int} duration of the animation in milliseconds, default: 300</li>
 *   <li>easing: {string} the easing function that will be used, default: linear <br />Available functions:
 *      <ul>
 *          <li>linear</li>
 *          <li>backin</li>
 *          <li>backout</li>
 *          <li>backinout</li>
 *          <li>bouncein</li>
 *          <li>bounceout</li>
 *          <li>bounceinout</li>
 *          <li>cubicin</li>
 *          <li>cubicout</li>
 *          <li>cubicinout</li>
 *          <li>elasticin</li>
 *          <li>elasticout</li>
 *          <li>elasticinout</li>
 *          <li>quadin</li>
 *          <li>quadout</li>
 *          <li>quadinout</li>
 *          <li>sinein</li>
 *          <li>sineout</li>
 *          <li>sineinout</li>
 *      </ul>
 *   </li>
 *   <li>onStep: function that will be called with the updated position every step of the animation<br />
 *   <pre>function getUpdatedPosition(dCM.Position)</pre>
 *   </li>
 *   <li>onEnd: function that will be called when the animation reaches the end position<br />
 *   <pre>function getUpdatedPosition(dCM.Position)</pre>
 *   </li>
 * </ul>
 *   
 */
dCM.PositionAnimator = function(opts){

    if (opts){
        this.animate(opts);
    }
}

dCM.PositionAnimator.prototype = {

    /**
     * @private
     * performs the animation
     *
     */
    animate: function(opts){

        var defaults = {
            start: null,
            end: null,
            duration: 300,
            easing: 'linear',
            onStep: null,
            onEnd: null
        }

        if (!opts.start || !opts.end || !opts.onStep)
                dCM.Exception.raise('You need to specify a start point, and end point and a callback for a position animation');

        opts = dCM.Utilities.extendObject(defaults,opts);

        this.start = opts.start;
        this.end = opts.end;
        this.duration = opts.duration;
        this.onStep = opts.onStep;
        this.onEnd = opts.onEnd;

        this.easingX = (opts.easingX) ? opts.easingX : (opts.easing) ? opts.easing : 'linear';
        this.easingY = (opts.easingY) ? opts.easingY : (opts.easing) ? opts.easing : 'linear';

        this.easingFnX = deCarta.Easing(this.easingX);
        this.easingFnY = deCarta.Easing(this.easingY);

        this.startTime = new Date().getTime();
        this.endTime = this.startTime + this.duration;
        
        this.step();

    },

    /**
     *@private
     *Calculates every new step
     */
    step: function(){
        var time = new Date().getTime() - this.startTime;
        var completion = 1 - ((this.endTime - new Date().getTime()) / this.duration);
        
        if (completion >= 0.99) {
            //position on end
            if (typeof this.onEnd === 'function') this.onEnd(this.end);
        } else {
            var pxStart = this.posToPix(this.start);
            var pxEnd = this.posToPix(this.end);

            var dX = pxEnd.x - pxStart.x;
            var dY = pxEnd.y - pxStart.y;

            var newPos = this.pixToPos({
                x: this.easingFnX(time, pxStart.x, dX, this.duration),
                y : this.easingFnY(time, pxStart.y, dY, this.duration)
            });

            if (typeof this.onStep === 'function') this.onStep(newPos);

            //setTimeout(this.step.bind(this), 20);
            requestAnimFrame(this.step.bind(this));
        }
    },


    /**
     * @private
     * Converts a position (lat, lon) to pixels at zoom lev 21.
     * Having the zoom level fixed at 21 allows for the highest
     * resolution required for animations.
     **/
    posToPix: function(pos){


        return {x: dCM.Utilities.lon2pix(pos.getLon(), 21) , y: dCM.Utilities.lat2pix(pos.getLat(), 21)}

        /*
        var scaleLevel = deCarta.App.zoom.getGXConvertedZoomLevel();
        var scale = Utilities.radsPerPixelAtZoom(deCarta.App.map.getTileSize(), scaleLevel);

        return {x: Utilities.lon2pix(pos.lon, scale) , y: Utilities.lat2pix(pos.lat, scale)}*/
    },

    pixToPos: function(pixPos){

        return new dCM.Position(dCM.Utilities.pix2lat(pixPos.y, 21), dCM.Utilities.pix2lon(pixPos.x, 21));

        /*
        var scaleLevel = deCarta.App.zoom.getGXConvertedZoomLevel();
        var scale = Utilities.radsPerPixelAtZoom(deCarta.App.map.getTileSize(), scaleLevel);

        return new Position(Utilities.pix2lat(pixPos.y,scale), Utilities.pix2lon(pixPos.x,scale));*/
    }
}


/**
 * Easing functions
 * 
 * sourced from Robert Penner's excellent work:
 * http://www.robertpenner.com/easing/
 * And the js port by http://www.tile5.org/
 * 
 * Functions follow the function format of fn(t, b, c, d, s) where:
 * - t = time
 * - b = beginning position
 * - c = change
 * - d = duration
 * - s = [not used]
 *
 * @param {string} type The string representing the name of the easing function to use
 */  
deCarta.Easing = function(type) {

    // define some constants
    var TWO_PI = Math.PI * 2,
        HALF_PI = Math.PI / 2;

    // define some function references
    var abs = Math.abs,
        pow = Math.pow,
        sin = Math.sin,
        asin = Math.asin,
        cos = Math.cos;

    var s = 1.70158;


    var easingFns = {
        linear: function(t, b, c, d) {
            return c*t/d + b;
        },

        backin: function(t, b, c, d) {
            return c*(t/=d)*t*((s+1)*t - s) + b;
        },

        backout: function(t, b, c, d) {
            return c*((t=t/d-1)*t*((s+1)*t + s) + 1) + b;
        },

        //this one is broken.
        backinout: function(t, b, c, d) {
            return ((t/=d/2)<1) ? c/2*(t*t*(((s*=(1.525))+1)*t-s))+b : c/2*((t-=2)*t*(((s*=(1.525))+1)*t+s)+2)+b;
        },

        bouncein: function(t, b, c, d) {
            return c - easingFns.bounceout(d-t, 0, c, d) + b;
        },

        bounceout: function(t, b, c, d) {
            if ((t/=d) < (1/2.75)) {
                return c*(7.5625*t*t) + b;
            } else if (t < (2/2.75)) {
                return c*(7.5625*(t-=(1.5/2.75))*t + 0.75) + b;
            } else if (t < (2.5/2.75)) {
                return c*(7.5625*(t-=(2.25/2.75))*t + 0.9375) + b;
            } else {
                return c*(7.5625*(t-=(2.625/2.75))*t + 0.984375) + b;
            }
        },

        bounceinout: function(t, b, c, d) {
            if (t < d/2) return easingFns.bouncein(t*2, 0, c, d) / 2 + b;
            else return easingFns.bounceout(t*2-d, 0, c, d) / 2 + c/2 + b;
        },

        cubicin: function(t, b, c, d) {
            return c*(t/=d)*t*t + b;
        },

        cubicout: function(t, b, c, d) {
            return c*((t=t/d-1)*t*t + 1) + b;
        },

        cubicinout: function(t, b, c, d) {
            if ((t/=d/2) < 1) return c/2*t*t*t + b;
            return c/2*((t-=2)*t*t + 2) + b;
        },

        elasticin: function(t, b, c, d, a, p) {
            var s;

            if (t==0) return b;  if ((t/=d)==1) return b+c;  if (!p) p=d*0.3;
            if (!a || a < abs(c)) { a=c; s=p/4; }
            else s = p/TWO_PI * asin (c/a);
            return -(a*pow(2,10*(t-=1)) * sin( (t*d-s)*TWO_PI/p )) + b;
        },

        elasticout: function(t, b, c, d, a, p) {
            var s;

            if (t==0) return b;  if ((t/=d)==1) return b+c;  if (!p) p=d*0.3;
            if (!a || a < abs(c)) { a=c; s=p/4; }
            else s = p/TWO_PI * asin (c/a);
            return (a*pow(2,-10*t) * sin( (t*d-s)*TWO_PI/p ) + c + b);
        },

        elasticinout: function(t, b, c, d, a, p) {
            var s;

            if (t==0) return b;  if ((t/=d/2)==2) return b+c;  if (!p) p=d*(0.3*1.5);
            if (!a || a < abs(c)) { a=c; s=p/4; }
            else s = p/TWO_PI * asin (c/a);
            if (t < 1) return -0.5*(a*pow(2,10*(t-=1)) * sin( (t*d-s)*TWO_PI/p )) + b;
            return a*pow(2,-10*(t-=1)) * sin( (t*d-s)*TWO_PI/p )*0.5 + c + b;
        },

        quadin: function(t, b, c, d) {
            return c*(t/=d)*t + b;
        },

        quadout: function(t, b, c, d) {
            return -c *(t/=d)*(t-2) + b;
        },

        quadinout: function(t, b, c, d) {
            if ((t/=d/2) < 1) return c/2*t*t + b;
            return -c/2 * ((--t)*(t-2) - 1) + b;
        },

        sinein: function(t, b, c, d) {
            return -c * cos(t/d * HALF_PI) + c + b;
        },

        sineout: function(t, b, c, d) {
            return c * sin(t/d * HALF_PI) + b;
        },

        sineinout: function(t, b, c, d) {
            return -c/2 * (cos(Math.PI*t/d) - 1) + b;
        }
    }

    return (easingFns[type]) ? easingFns[type] : easingFns['linear'];

}
/**
 * @private
 * @class HTMLRenderer is used to render a tile layer as a set of HTML elements
 * @description Renders a tile layer in an HTML element.
 *
 * @constructor
 * @param {HTMLDomElement} container : the HTML element that should be used for
 * rendering
 */

dCM.HTMLRenderer = function(container){

    this.container = container;
    this.imageWrapper = deCarta.crEl('div');

    this.imageWrapper.style.position = 'absolute';
    this.imageWrapper.style.overflow = 'hidden';
    this.imageWrapper.style.top = this.imageWrapper.style.left = 0;

    this.resize();

    this.container.appendChild(this.imageWrapper);

    this.images = [];

    this.bmark = {
        counts: 0,
        renderTime: 0
    }

    this.scale = deCarta.Window.getDpr();//(window.devicePixelRatio) ? 1 / window.devicePixelRatio : 1;
}

dCM.HTMLRenderer.prototype = {

    /**
     * Invoked by the MapLayer when a resize is necessary.
     *
     */
    resize: function(){        
        this.imageWrapper.style.width = this.container.style.width;
        this.imageWrapper.style.height = this.container.style.height;
    },

    /**
     * Invoked by the MapLayer when a rendering is necessary.
     * @param {array} renderingQueue renderingQueue of tiles as generated by the
     * MapLayer. Z-Ordered back to front.
     *
     */
    render: function(renderingQueue){    
        var start = new Date().getTime();
        this.renderReplace(renderingQueue);
        this.bmark.renderTime += new Date().getTime() - start;
        this.bmark.counts ++;
    },
    /**
     * @private
     */
    show: function(){
        this.imageWrapper.style.display = 'block';
    },

    /**
     * @private
     */
    hide: function(){
        this.imageWrapper.style.display = 'none';
    },
    
    renderRestore: function(renderingQueue){
        
        var restore = dCM.Utilities.removeElementToReinsert(this.imageWrapper);
        var newEl = this.imageWrapper;
        newEl.innerHTML = '';
        

        for (var i = 0; i < renderingQueue.length; i++){
            var draw = renderingQueue[i];

            draw.img.className = 'deCarta-mobile-tileImage';
            if (draw.img.empty) {
                draw.img.className += ' blank';                
                draw.img.src = dCM.Constants.BLANKTILE;
            }
            draw.img.style.position = 'absolute';

            draw.y = Math.floor(draw.y);
            draw.x = Math.floor(draw.x);
            draw.size = Math.ceil(draw.size);
            
            draw.img.style.top = draw.y + 'px';
            draw.img.style.left = draw.x + 'px';
            draw.img.style.width = draw.img.style.height = draw.size + 'px';
            
            newEl.appendChild(draw.img);            

        }

        restore();
    },
    
    renderReplace: function(renderingQueue){        
        
        var newEl = deCarta.crEl('div');                        

        for (var i = 0; i < renderingQueue.length; i++){
            var draw = renderingQueue[i];

            draw.img.className = 'deCarta-mobile-tileImage';
            if (draw.img.empty) {
                draw.img.className += ' blank';                
                draw.img.src = dCM.Constants.BLANKTILE;
            }
            draw.img.style.position = 'absolute';

            draw.y = Math.floor(draw.y);
            draw.x = Math.floor(draw.x);
            draw.size = Math.ceil(draw.size);
            
            draw.img.style.top = draw.y + 'px';
            draw.img.style.left = draw.x + 'px';
            draw.img.style.width = draw.img.style.height = draw.size + 'px';
            
            newEl.appendChild(draw.img);            

        }

        this.imageWrapper.parentNode.replaceChild(newEl, this.imageWrapper);
        this.imageWrapper = newEl;
        
    },
    
    renderString: function(renderingQueue){

        var newEl = deCarta.crEl('div');

        var string = '';

        for (var i = 0; i < renderingQueue.length; i++){
            var draw = renderingQueue[i];

            string += '<img src="'+draw.img.src+'" class="deCarta-mobile-tileImage ' + (draw.img.empty ? 'blank' : '') + '" style="position: absolute; top: '+Math.floor(draw.y)+'px; left: '+Math.floor(draw.x)+'px; width: '+Math.ceil(draw.size)+'px; height: '+Math.ceil(draw.size)+' " />';

        }
        newEl.innerHTML = string;
        //restore();
        this.imageWrapper.parentNode.replaceChild(newEl, this.imageWrapper);
        this.imageWrapper = newEl;

    }


}
/**
 * @private
 * @class CSS3Renderer is used to render a tile layer as a set of HTML elements
 * using css3 transforms. This enables hardware acceleration on the iOS platform (and chrome)
 * @description Renders a tile layer in an HTML element using CSS3 Transforms.
 *
 * @constructor
 * @param {HTMLDomElement} container : the HTML element that should be used for
 * rendering
 */

dCM.CSS3Renderer = function(container){
    
    this.container = container;
    this.imageWrapper = deCarta.crEl('div');

    this.imageWrapper.style.position = 'absolute';
    this.imageWrapper.style.overflow = 'hidden';
    this.imageWrapper.style.top = this.imageWrapper.style.left = 0;

    this.resize();

    this.container.appendChild(this.imageWrapper);

    this.images = [];
    this.visibleKeys = {};

    this.imageWrapper.id = 'deCarta-Mob-Renderer-' + Math.floor(Math.random() * 10000);
    this.id = 0;

    this.scale = deCarta.Window.getDpr();//(window.devicePixelRatio) ? 1 / window.devicePixelRatio : 1;    

}

dCM.CSS3Renderer.prototype = {

    /**
	 * @private
     * Invoked by the MapLayer when a resize is necessary.
     */
    resize: function(){        
        this.imageWrapper.style.width = this.container.style.width;
        this.imageWrapper.style.height = this.container.style.height;
    },

    /**
	 * @private
     * Invoked by the MapLayer when a rendering is necessary.
     * @param {array} renderingQueue renderingQueue of tiles as generated by the
     * MapLayer. Z-Ordered back to front.
     */
    render: function(renderingQueue){

        var keepKeys = {};

        for (var i = 0; i < renderingQueue.length; i++){
            var draw = renderingQueue[i];

            draw.img.className = 'deCarta-mobile-tileImage';
            if (draw.img.empty) {
                draw.img.className += ' blank';
                draw.img.src = dCM.Constants.BLANKTILE;
            }
            draw.img.style.position = 'absolute';

            /**
             * This code uses css transforms which are supposed to be fast.
             * They are but have some issues such as not working very well at all.
             * it can be uncommented and tried on various devices from time to time
             * it will be interesting to see the performance.
             */


            var scale = draw.size / draw.img.width;
            /*draw.y = Math.floor(draw.y);
            draw.x = Math.floor(draw.x);            */

            draw.img.style.webkitTransformOrigin = " 0 0 ";
            draw.img.style.webkitTransform = "translate3d("+draw.x+"px, "+draw.y+"px, 0) scale("+scale+") ";
            draw.img.style.MozTransform = "translate3d("+draw.x+"px, "+draw.y+"px, 0) scale("+scale+") ";
            draw.img.style.OTransform = "translate3d("+draw.x+"px, "+draw.y+"px, 0) scale("+scale+") ";


            if (!draw.img.parentNode){                
                draw.img.id = this.imageWrapper.id + '_' + this.id++;
                this.imageWrapper.appendChild(draw.img);
                this.visibleKeys[draw.img.key] = draw.img.id;
            
            } 
            keepKeys[draw.img.key] = draw.img.id;
        }

        //We have to manually figure out what's in and what's out. 
        for (var k in this.visibleKeys){            
            if (!keepKeys[k]){                
                try {                    
                    var el = deCarta.geId(this.visibleKeys[k]);                    
                    el.parentNode.removeChild(el);
                    this.visibleKeys[k] = false;
                    delete this.visibleKeys[k];
                } catch (e){
                    console.log('CSS3Renderer', e, keepKeys[k], k );
                }
            }
        }
    },
	
    /**
     * @private
     */
    show: function(){
        this.imageWrapper.style.display = 'block';
    },

    /**
     * @private
     */
    hide: function(){
        this.imageWrapper.style.display = 'none';
    }


}


    window.deCarta = deCarta;
    window._dM = deCarta.Mobile;
    window._dU = deCarta.Mobile.Utilities;
})(window);


jQuery.easing.jswing=jQuery.easing.swing;
jQuery.extend(jQuery.easing,{def:"easeOutQuad",swing:function(e,a,c,b,d){return jQuery.easing[jQuery.easing.def](e,a,c,b,d)},easeInQuad:function(e,a,c,b,d){return b*(a/=d)*a+c},easeOutQuad:function(e,a,c,b,d){return-b*(a/=d)*(a-2)+c},easeInOutQuad:function(e,a,c,b,d){if((a/=d/2)<1)return b/2*a*a+c;return-b/2*(--a*(a-2)-1)+c},easeInCubic:function(e,a,c,b,d){return b*(a/=d)*a*a+c},easeOutCubic:function(e,a,c,b,d){return b*((a=a/d-1)*a*a+1)+c},easeInOutCubic:function(e,a,c,b,d){if((a/=d/2)<1)return b/
2*a*a*a+c;return b/2*((a-=2)*a*a+2)+c},easeInQuart:function(e,a,c,b,d){return b*(a/=d)*a*a*a+c},easeOutQuart:function(e,a,c,b,d){return-b*((a=a/d-1)*a*a*a-1)+c},easeInOutQuart:function(e,a,c,b,d){if((a/=d/2)<1)return b/2*a*a*a*a+c;return-b/2*((a-=2)*a*a*a-2)+c},easeInQuint:function(e,a,c,b,d){return b*(a/=d)*a*a*a*a+c},easeOutQuint:function(e,a,c,b,d){return b*((a=a/d-1)*a*a*a*a+1)+c},easeInOutQuint:function(e,a,c,b,d){if((a/=d/2)<1)return b/2*a*a*a*a*a+c;return b/2*((a-=2)*a*a*a*a+2)+c},easeInSine:function(e,
a,c,b,d){return-b*Math.cos(a/d*(Math.PI/2))+b+c},easeOutSine:function(e,a,c,b,d){return b*Math.sin(a/d*(Math.PI/2))+c},easeInOutSine:function(e,a,c,b,d){return-b/2*(Math.cos(Math.PI*a/d)-1)+c},easeInExpo:function(e,a,c,b,d){return a==0?c:b*Math.pow(2,10*(a/d-1))+c},easeOutExpo:function(e,a,c,b,d){return a==d?c+b:b*(-Math.pow(2,-10*a/d)+1)+c},easeInOutExpo:function(e,a,c,b,d){if(a==0)return c;if(a==d)return c+b;if((a/=d/2)<1)return b/2*Math.pow(2,10*(a-1))+c;return b/2*(-Math.pow(2,-10*--a)+2)+c},
easeInCirc:function(e,a,c,b,d){return-b*(Math.sqrt(1-(a/=d)*a)-1)+c},easeOutCirc:function(e,a,c,b,d){return b*Math.sqrt(1-(a=a/d-1)*a)+c},easeInOutCirc:function(e,a,c,b,d){if((a/=d/2)<1)return-b/2*(Math.sqrt(1-a*a)-1)+c;return b/2*(Math.sqrt(1-(a-=2)*a)+1)+c},easeInElastic:function(e,a,c,b,d){e=1.70158;var f=0,g=b;if(a==0)return c;if((a/=d)==1)return c+b;f||(f=d*0.3);if(g<Math.abs(b)){g=b;e=f/4}else e=f/(2*Math.PI)*Math.asin(b/g);return-(g*Math.pow(2,10*(a-=1))*Math.sin((a*d-e)*2*Math.PI/f))+c},easeOutElastic:function(e,
a,c,b,d){e=1.70158;var f=0,g=b;if(a==0)return c;if((a/=d)==1)return c+b;f||(f=d*0.3);if(g<Math.abs(b)){g=b;e=f/4}else e=f/(2*Math.PI)*Math.asin(b/g);return g*Math.pow(2,-10*a)*Math.sin((a*d-e)*2*Math.PI/f)+b+c},easeInOutElastic:function(e,a,c,b,d){e=1.70158;var f=0,g=b;if(a==0)return c;if((a/=d/2)==2)return c+b;f||(f=d*0.3*1.5);if(g<Math.abs(b)){g=b;e=f/4}else e=f/(2*Math.PI)*Math.asin(b/g);if(a<1)return-0.5*g*Math.pow(2,10*(a-=1))*Math.sin((a*d-e)*2*Math.PI/f)+c;return g*Math.pow(2,-10*(a-=1))*Math.sin((a*
d-e)*2*Math.PI/f)*0.5+b+c},easeInBack:function(e,a,c,b,d,f){if(f==undefined)f=1.70158;return b*(a/=d)*a*((f+1)*a-f)+c},easeOutBack:function(e,a,c,b,d,f){if(f==undefined)f=1.70158;return b*((a=a/d-1)*a*((f+1)*a+f)+1)+c},easeInOutBack:function(e,a,c,b,d,f){if(f==undefined)f=1.70158;if((a/=d/2)<1)return b/2*a*a*(((f*=1.525)+1)*a-f)+c;return b/2*((a-=2)*a*(((f*=1.525)+1)*a+f)+2)+c},easeInBounce:function(e,a,c,b,d){return b-jQuery.easing.easeOutBounce(e,d-a,0,b,d)+c},easeOutBounce:function(e,a,c,b,d){return(a/=
d)<1/2.75?b*7.5625*a*a+c:a<2/2.75?b*(7.5625*(a-=1.5/2.75)*a+0.75)+c:a<2.5/2.75?b*(7.5625*(a-=2.25/2.75)*a+0.9375)+c:b*(7.5625*(a-=2.625/2.75)*a+0.984375)+c},easeInOutBounce:function(e,a,c,b,d){if(a<d/2)return jQuery.easing.easeInBounce(e,a*2,0,b,d)*0.5+c;return jQuery.easing.easeOutBounce(e,a*2-d,0,b,d)*0.5+b*0.5+c}});

/*
 * Loads the page with the map on it, starts initializing the map
 */
function get_map(trail, started)
{
	var email = document.getElementById('hidden_email').value;
	
	var ajax = new XMLHttpRequest();
	ajax.open("POST", "http://www.kenkochallenge.com/app/load_map", true);
	ajax.setRequestHeader("Content-type","application/x-www-form-urlencoded");
	ajax.send("email="+email+"&trail="+trail+"&started="+started);
	
	ajax.onreadystatechange=function(){
      if(ajax.readyState==4 && (ajax.status==200)){
           document.getElementById('main').innerHTML = ajax.responseText;
           // Initialize the map
           map_init(document.getElementById('mapCenterAddress').value);
      }
	  else {
		if (navigator.network.connection.type == Connection.NONE)
			{alert('Sorry, it looks like you are not connected to a network.');}
	  }
	}
}

/*
 * Initializes the map with the given address to have in the center
 */
function map_init(mapCenterAddress)
{
	document.getElementById('preloader').style.display = 'inline';
	var cityAddress = new deCarta.Mobile.FreeFormAddress(mapCenterAddress, new deCarta.Mobile.Locale('EN', 'US'));
	deCarta.Mobile.Geocoder.geocode(cityAddress, function (addressResults){
			var coords = addressResults[0].Point.pos.split(" "); // splits the coord string into an array with lat and long
			map_draw(coords);
	});
}

/*
 * Draws the map
 */
function map_draw(coords)
{
	if(window.hasOwnProperty('map'))
	{
		delete window.map;
	}
	
	window.map = new deCarta.Mobile.Map({ 
			id: "mapContainer",
			center: new deCarta.Mobile.Position(coords[0], coords[1]), // center set at lat and long from earlier address
			zoom: 12,
			controls: [
				new deCarta.Mobile.ZoomControl({position:'bottomLeft'})
			], 
			onReady: function(){calculate_route_points()}
			});
	
}

/*
 * Searches all the address inputs, then converts them to latitude and longitude coordinates and passes them in arrays
 * to the function that calculates the route
 */
function calculate_route_points()
{
	// removes pins if there are any pins
	if(window.hasOwnProperty('pinOverlay'))
	{
		window.pinOverlay.clear();
		window.map.removeOverlay(window.pinOverlay);
		delete window.pinOverlay;
	}
	
	// removes all routes if there are any
	if(window.hasOwnProperty('routeOverlay'))
	{
		window.routeOverlay.clear();
		window.map.removeOverlay(window.routeOverlay);
		delete window.routeOverlay;
	}
	
	// removes user pin if there is one
	if(window.hasOwnProperty('userOverlay'))
	{
		window.userOverlay.clear();
		window.map.removeOverlay(window.userOverlay);
		delete window.userOverlay;
	}
	
	// removes all addresses if there are any
	if(window.hasOwnProperty('deCartaAddresses'))
	{
		window.deCartaAddresses.length = 0;
	}
	
	// retrieves all of the inputs with addresses
	var points = document.getElementById('points').getElementsByTagName('input');
	//document.getElementById('test').innerHTML += "Point1: "+points[0].value;
	//console.log(points);
	
	var latitudes = new Array();
	var longitudes = new Array();
	
	// for each address, finds the lat and long and pushes those into arrays
	for (var iii = 0; iii < points.length; iii++)
	{
		//adds address to global array to send to the server later
		if(!window.hasOwnProperty('deCartaAddresses'))
		{window.deCartaAddresses = new Array();}
		
		window.deCartaAddresses.push(points[iii]);
	}
	
	calculate_route_points_in_order(points, latitudes, longitudes, 0);
	/*
		if (points[iii].value.indexOf("Lat:") !== -1)
		{	// it it is coordinates ...
			
			var coords = points[iii].split(" Lon: ");
			latitudes.push(coords[0].substr(5));
			longitudes.push(coords[1]);
			
			//console.log(latitudes);
			//console.log(longitudes);
			
			if (longitudes.length === points.length)
			{	// when we have all of the addresses, we send lat and long arrays to calculate the routes
				calculate_route(latitudes, longitudes);
			}
			
		}
		
		else { // if it is an address ...
			
			var address = new deCarta.Mobile.FreeFormAddress(points[iii].value, new deCarta.Mobile.Locale('EN', 'US'));
			deCarta.Mobile.Geocoder.geocode(address, function(addressResults){
				var coords = addressResults[0].Point.pos.split(" ");
				latitudes.push(coords[0]);
				longitudes.push(coords[1]);
				
				document.getElementById('test').innerHTML += "Pushed into lat & long "+iii+" ";
				
				if (longitudes.length === points.length)
				{	// when we have all of the addresses, we send lat and long arrays to calculate the routes
					calculate_route(latitudes, longitudes);
				}
			});
			
		}
	}
	*/
}

/*
 * This function calls itself, forcing the latitudes and longitudes arrays to fill in the order
 * of the points array, no matter how long it takes each to go through the geolocator function
 */
function calculate_route_points_in_order(points, latitudes, longitudes, iii)
{
	if (points[iii].value.search("Lat:") > -1)
	{ // if the point is latitude and longitude
		
		var coords = points[iii].value.split(" Lon: ");
			//console.log(coords);
			
			latitudes.push(coords[0].substr(5));
			longitudes.push(coords[1]);
			
			//console.log(latitudes);
			//console.log(longitudes);
			
			if (longitudes.length === points.length)
			{	// when we have all of the addresses, we send lat and long arrays to calculate the routes
				calculate_route(latitudes, longitudes);
			}
			else {
				iii++;
				calculate_route_points_in_order(points, latitudes, longitudes, iii);
			}
			
	}
	else { // if the point is an address
		var address = new deCarta.Mobile.FreeFormAddress(points[iii].value, new deCarta.Mobile.Locale('EN', 'US'));
			deCarta.Mobile.Geocoder.geocode(address, function(addressResults){
				var coords = addressResults[0].Point.pos.split(" ");
				latitudes.push(coords[0]);
				longitudes.push(coords[1]);
				//document.getElementById('test').innerHTML += " Rendered Address: "+points[iii].value;
				//document.getElementById('test').innerHTML += " Lat: "+coords[0]+" Lon: "+coords[1];
				if (longitudes.length === points.length)
				{	// when we have all of the addresses, we send lat and long arrays to calculate the routes
					calculate_route(latitudes, longitudes);
				}
				else {
					iii++;
					calculate_route_points_in_order(points, latitudes, longitudes, iii);
				}
			});
	}
}

/*
 * Calculates the route needed given the arrays of latitudes and longitudes, and sets pins in starting and ending points
 */
function calculate_route(latitudes, longitudes)
{
	//console.log(latitudes);
	//console.log(longitudes);
	//document.getElementById('test').innerHTML += " Lat #1: "+latitudes[0]+" Lon #1: "+longitudes[0];
	
	// we make an array of locations with the lats and longs
	var locations = new Array();
	for (var iii = 0; iii < latitudes.length; iii++)
	{
		var point = new deCarta.Mobile.Position(latitudes[iii], longitudes[iii]);
		locations.push(point);
	}
	
	//console.log(locations.count);
	//document.getElementById('test').innerHTML += "Location Count: "+locations.length+" ";
	
	// creates an overlay for the start and end pins (only if there isn't already one)
	if (!window.hasOwnProperty('pinOverlay'))
	{
		window.pinOverlay = new deCarta.Mobile.MapOverlay({
				name: "Pin Overlay"
			});
		
		window.map.addOverlay(window.pinOverlay);
	}
	//document.getElementById('test').innerHTML += "Pin overlay set. ";
	// creates a start pin from the first location
	var startpin = new deCarta.Mobile.Pin({
		position: locations[0],
		imageSrc: "http://www.kenkochallenge.com/img/map/startpin.png",
		text: "Start",
		xOffset: 20,
		yOffset: 25
	});
	
	window.pinOverlay.addObject(startpin);
	//document.getElementById('test').innerHTML += "Added Start Pin. ";
	// creates an end pin from the last location
	var endpin = new deCarta.Mobile.Pin({
		position: locations[(locations.length-1)],
		imageSrc: "http://www.kenkochallenge.com/img/map/endpin.png",
		text: "Finish",
		xOffset: 20,
		yOffset: 25
	});
	
	window.pinOverlay.addObject(endpin);
	// create a new overlay for the route line (only if there isn't already one)
	if (!window.hasOwnProperty('routeOverlay'))
	{
		window.routeOverlay = new deCarta.Mobile.MapOverlay({
				name: "Route Overlay"
			});
			
		window.map.addOverlay(window.routeOverlay);
	}
	
	// set some criteria for the route - has the locations specified, in miles, and walking path
	var routeCriteria = new deCarta.Mobile.RouteCriteria();
		routeCriteria.waypoints = locations;
		routeCriteria.distanceUnit = "MI";
		routeCriteria.routePreference = "Pedestrian";	
			
	// creates route		
	deCarta.Mobile.Routing.execute(routeCriteria, function(routeResults){
			
			//Retrieve the route geometry from the returned route
    		var routeGeometry = routeResults.RouteGeometry.LineString.pos;
    		
    		//Create a new Polyline, with the lineGeometry property
	        //of the Polyline set to the routeGeometry set to the
	        //route geometry of the Route.
	        var routeLine = new deCarta.Mobile.Polyline({lineGeometry:routeGeometry,strokeColor:'#006c2a'})
			
			//Add the Polyline to the route overlay
    		window.routeOverlay.addObject(routeLine);

    		//Refresh the map to show the route
    		window.map.render();
    		
    		/*
    		 * Here is where we start the phonegap geocode listener
    		 */
    		// create a new overlay for the user pin (only if there isn't already one)
			if (!window.hasOwnProperty('userOverlay'))
			{
				window.userOverlay = new deCarta.Mobile.MapOverlay({
						name: "User Overlay"
					});
					
				window.map.addOverlay(window.userOverlay);
			}
			
			window.startLat = latitudes[0];
			window.startLon = longitudes[0];
			//document.getElementById('test').innerHTML += " Final start lat: "+latitudes[0]+" Final start lon: "+longitudes[0];
			window.endLat = latitudes[latitudes.length-1];
			window.endLon = longitudes[longitudes.length-1];
    		
    		var geoWatchId = navigator.geolocation.watchPosition(geoFoundUser, geoLostUser,
                                                  { maximumAge: 3000, timeout: 5000, enableHighAccuracy: true });
    		
		});
}

/*
 * Function that is called whenever user's geolocation is returned
 */
function geoFoundUser(position)
{
	var uLatitude = position.coords.latitude;
	var uLongitude = position.coords.longitude;
	
	var uPoint = new deCarta.Mobile.Position(uLatitude, uLongitude);
	
	window.userOverlay.clear();
	
	var userpin = new deCarta.Mobile.Pin({
		position: uPoint,
		imageSrc: "http://www.kenkochallenge.com/img/map/userpin.png",
		text: "You!",
		xOffset: 20,
		yOffset: 25
	});
	
	window.userOverlay.addObject(userpin);
	window.map.render();
	document.getElementById('preloader').style.display = 'none';
	if(document.getElementById('trail_started').value == 'started')
	{
		if(window.hasOwnProperty('endLat'))
		{
			/*
			document.getElementById('test').innerHTML += "End Pos: "+window.endLat+", "+window.endLon+"<br/>";
			document.getElementById('test').innerHTML += "Current Pos: "+uLatitude+", "+uLongitude;
			*/
			if((Math.abs(window.endLat - uLatitude) < .01) && (Math.abs(window.endLon - uLongitude) < .01))
			//if((Math.abs(window.endLat - uLatitude) < 1) && (Math.abs(window.endLon - uLongitude) < 1))
			{
				var html = "<input type=\"button\" value=\"Finish!\" class=\"submit\" onclick=\"finish_walking();\" />";
				document.getElementById('start_and_finish').innerHTML = html;
			}
		}
	}
	else
	{
		if(window.hasOwnProperty('startLat'))
		{
			/*
			document.getElementById('test').innerHTML += "Start Pos: "+window.startLat+", "+window.startLon+"<br/>";
			document.getElementById('test').innerHTML += "End Pos: "+window.endLat+", "+window.endLon+"<br/>";
			document.getElementById('test').innerHTML += "Current Pos: "+uLatitude+", "+uLongitude;
			*/
			if((Math.abs(window.startLat - uLatitude) < .01) && (Math.abs(window.startLon - uLongitude) < .01))
			//if((Math.abs(window.startLat - uLatitude) < 1) && (Math.abs(window.startLon - uLongitude) < 1))
			{
				var html = "<input type=\"button\" value=\"Start!\" class=\"submit\" onclick=\"start_walking();\" />";
				document.getElementById('start_and_finish').innerHTML = html;
			}
		}
	}
	
}

/*
 * Function that is called whenever user's geolocation is not successfully returned
 */
function geoLostUser(error)
{
	document.getElementById('test').innerHTML += "Error: "+error;
}

/*
 * Function that fires when user clicks the start walking button
 * Sets the hidden input field "trail_started" to say started, and sends an ajax request that 
 * enters the game record as starting in the games records database
 */
function start_walking()
{
	var email = document.getElementById('hidden_email').value;
	var trail = document.getElementById('hidden_trail').value
	
	var ajax = new XMLHttpRequest();
	ajax.open("POST", "http://www.kenkochallenge.com/app/start_happy_trails", true);
	ajax.setRequestHeader("Content-type","application/x-www-form-urlencoded");
	ajax.send("email="+email+"&trail="+trail);
	
	ajax.onreadystatechange=function(){
      if(ajax.readyState==4 && (ajax.status==200)){
          document.getElementById('start_and_finish').innerHTML = "<p>Reach the finish point to get your points!</p>";
           
           document.getElementById('trail_started').value = 'started';
      }
	  else {
		if (navigator.network.connection.type == Connection.NONE)
			{alert('Sorry, it looks like you are not connected to a network.');}
	  }
	}
}

/*
 * Function that fires when the user clicks the finish walking button
 * Ajax that causes the walking trail to be complete in the database
 * and gives the user the option to take a picture or return to the main menu
 */
function finish_walking()
{
	var email = document.getElementById('hidden_email').value;
	var trail = document.getElementById('hidden_trail').value
	
	var ajax = new XMLHttpRequest();
	ajax.open("POST", "http://www.kenkochallenge.com/app/finish_happy_trails", true);
	ajax.setRequestHeader("Content-type","application/x-www-form-urlencoded");
	ajax.send("email="+email+"&trail="+trail);
	
	ajax.onreadystatechange=function(){
      if(ajax.readyState==4 && (ajax.status==200)){
           document.getElementById('main').innerHTML = ajax.responseText;
      }
	  else {
		if (navigator.network.connection.type == Connection.NONE)
			{alert('Sorry, it looks like you are not connected to a network.');}
	  }
	}
}

/*
 * This function sets up the camera for the happy trails game
 */
function take_happy_trails_picture()
{
	navigator.camera.getPicture(onHappyTrailsSuccess, onFail, { 
		quality: 50, 
		destinationType : Camera.DestinationType.FILE_URI,
		sourceType : Camera.PictureSourceType.CAMERA, 
		allow_edit: false,
		encodingType: Camera.EncodingType.JPEG,
  		targetWidth: 640,
  		targetHeight: 676  
		});
}

/*
 * Function called when camera successfully captures image
 * If camera fails, calls onFail function in js.js instead
 */
function onHappyTrailsSuccess(imageURI)
{
	var email = document.getElementById('hidden_email').value;
	
	var ajax = new XMLHttpRequest();
	ajax.open("POST", "http://www.kenkochallenge.com/app/happy_trails_confirm", true);
	ajax.setRequestHeader("Content-type","application/x-www-form-urlencoded");
	ajax.send("email="+email+"&imageURI="+imageURI);
	
	ajax.onreadystatechange=function(){
      if(ajax.readyState==4 && (ajax.status==200)){
           document.getElementById('main').innerHTML = ajax.responseText;
      }
	  else {
		if (navigator.network.connection.type == Connection.NONE)
			{alert('Sorry, it looks like you are not connected to a network.');}
	  }
	}
}

/*
 * Called when user submits photo and description for Happy Trails
 */
function submit_happy_trails()
{
	var email = document.getElementById('hidden_email').value;
	var description = document.getElementById('ht_description').value;
	var imageURI = document.getElementById('ht_imageURI').value;
	
	// !! Assumes variable fileURI contains a valid URI to a  text file on the device

	var win = function(r) {
	    console.log("Code = " + r.responseCode);
	    console.log("Response = " + r.response);
	    console.log("Sent = " + r.bytesSent);
	    document.getElementById('main').innerHTML = r.response;
	}
	
	var fail = function(error) {
	    alert("An error has occurred: Code = " + error.code);
	    console.log("upload error source " + error.source);
	    console.log("upload error target " + error.target);
	}
	
	var options = new FileUploadOptions();
	options.fileKey="userfile";
	//options.fileName=fileURI.substr(fileURI.lastIndexOf('/')+1);
	//options.mimeType="text/plain";
	options.chunkedMode = false;
	
	var params = new Object();
	params.email = email;
	params.description = description;
	params.imageURI = imageURI;
	
	options.params = params;
	
	var ft = new FileTransfer();
	ft.upload(imageURI, "http://www.kenkochallenge.com/app/happy_trails_upload", win, fail, options, true);
	
}


if (!imagePacks) var imagePacks={};imagePacks['StdResImages']={
deCartaLogo:{
	img:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIoAAAAiCAYAAACAyEHnAAATwklEQVR42u1cCVRUV5q2e3omnc5MpzOne0xMrAJc4hYXBBSUnZKtKFZZIuK+QIxG247tEk2icUnSxjYmJm4ogoKIUOwiqyigoKJsoiJoXArLHUFR8Zv/vbqQ60uxaEjHmcM75zvFu+t79//ef//lardudK3rY/F+mOmYsogRzjfCTZ007cKMg/TerAP9CcJcNGfFP/uOmtet63rxr696m0/fZ+WOeBtP7LNSYZ+lux6oEGvrgTgbD0SbuiCyvwMiDGwRYWiNcEMrBmvsorKoAQpEm7kiztYTsdRe6Kt3TJpLLdTT3ESWkC5JvOBXhJnTD0l23thjocTeUW4/xWg3xFi7I3KwI3bILbHTwBp7bVTYP2k6Di9ZgvwVy1FAOLR4MVKDpmCPpavYJszAClHGztTXQxxD39jCnMLcpGEuf9Zj+Mtd0niBrz3myjvxNl6I0fPVx9l6IdrEhQRvhT2mzsj7ZBmuFB5B3dUraO2688MFXC7Iw8EFHyJyiCPCBWKZKcWxpOMLcyYQUXaPdG1Y2dOkR5c0XmyiaBJtvRFr5fEjrD2htvdB1MAx2NXbFrmLFuLB3Ts6IlysEX9vVFVC7euHuxeqUXu8CPG+Abh/96ZYV197Vfy9/UMNsmbPETVM9BAnccyn5iEk2fkIRNGu6mny+s95j/79+v6Z8A7hj11S/SWIMkqlSXEYS/aCF9TWXmSreCOeBLrbwA4xZEdcPponCl1z7ChifXxwZPUK8T41aBI29RqGuks/oLb4BDb2GoKc+fPFuuy//RUJQeNws/K0eF+TlkKayRmRBvaIp7kEDRZPcwlzpir8QGTVrnrLpPszEuN/CJsJ2YRDhPMEENw6e41ozIGEhYQkwjFCMWE/YQ3BhfCb//dEiRaJ4icSJIGQOMYPkYb2SHT0xe3q82hqbETBsmUI72OJSGMHPLxfjwtZ6dhpaIm9vR1xj7SH9nQ5oowcsMvQBrUlxbh3vVas3zXQDkVfrAEeP4bmRBFizVXYY6AQ5xAJSUhV+BNR3J6HKH8ivE/IZwRphqITCfIqYRvhHjd+KaFSMudxwvBfW5b0DC/9YoPHjPbQpCkCkGjrg2Qnf+x92xGJirF4cEu3jRycMw9beg1HmJEFqpMSddrEMxBRRKbYIW64p7mC6xVliH3bRSzLnBQstinbvBmhvcxEFK9bJ5bdOn8OcRbkBQ1yQbKjv0jMA07vkufjqV351vDuz7k4/0a4wAnNppMW/S+EMm7clQI5JVomg6u/Sxj6K5IkhLDhF9NusZaemnQSVhJpFbUpGZgDnGkrOSYKtqG2Fo8a7uHY2i+ROXGmWHZyw9fYbWSDBBOyYwa5iRrlRmUF4nq7IMHMi+qscXp3BO4T0bJmvocqdazYT0vbk3BdzEzHXsMxSDD3RMqYAGS7TUTkCKX2szefjyhskXiB2XbSwidxY37eSptXCHVcO0HTvPIrkCSQza/uxDHlBNMfiWLlpclwDkSKY4AowNJvN4oCPfTBfMTZuePC/tSnvJqCJUsRO0KJfYZOtN3Y4S55OdqTJxDZywZxRi6Is1bh5LcbnupTsuEbRPWyR9Fnq8T7wk+WU1tnHKB5Y0yU+L63lXa13Ox5NcpvCVmdSRQaw5kb7zLh9220FTRNAeEws1/6/otJMo571o2dNOaHhB3s3XYS+neLs/LWZKsmQj1YhQPK8bqvPuOASAS1McVQjBTImjADj+rrnxL+lbxclG3bjIbrWpEsZaFboDle+FSbenKjU2iL2UtjJJiTKzzADbfKyvDofgNiyTXeZkSBugEOCO1vp11jYPZztp6cTiZK/LMsPrX5D8K/s9/f/ouJ8jH3rOs6YTx3Rvh5BF9hTEJEt2SFv+aw+1TxC6+K2SsKON1zAtS9XZHpPhlq0hIZvpOBJ09w/B9fIOf92biYloY7NdXAw8ctpHhU34Db586iKnovMiZPw+nwMDQ9bMQBl0CkvuOFXJ/piCXypU/RbWGH1nyGb3uaINrYFWGDHLSrDUy7d+AlhhCCCMEER648rz2iCMYme/nlzIOxaaXda4RL3Hi+nbD4QwnvET4lLCI4tNNeeAYHgiVXNoK9txfhvwg9CP0Iq7lnDSMYsPLBhO56xn6D4M2e5VO2bb3JfXTfETwEchCOsnWb1W3vSJUm1YS8j9G+ogBvnixGspEKma4TkOkchCQjN9Qk6ozYNMd3EdvLEUl9VEgc5o5UW180aK/h9tkzSLH2RspQsjv6Uaif2hz0ny72qdi8BTGGjthn7oGIQQps7mmOa+UlqNdcRWgfit72VhBRFLT1tE4U5n1sJ9RLvI0yFj/Z1BpRBC+IkMvqGpkd8YDdF0vdaUbGx9x4w34GQczZttTExjrPeVAlBCXX9iNCFfOgqnmbgwn0EfdMgvB2EzSE+1x5I5tDKL9NWC/RvOvZViq0vc45AVcJq7i5BG9yKVtXgZBruoUNVGjCZFbYH6QTbM68+YgmFzbdNQhpo/2x39QHd8hNvn26AukmvshRTkI2IY3Kk3u5kcCv4FZFORJ7KZE2YizSnccjhUi3r58L7l65hBpypUNloxDe2wHRw5XYJrNA/srl4lzxHuOwW26L8CGOrRKFqfND3GIcJExgVv4pQhHhgD6iCH9zC5zUHIxji7aLlQtCHMn1sebGutf8tT0HSQYzYYERz5SV/yfhJCsXiG/IyscTYiQfwkxGCkjgSrAg+DNbork8hWkDf7ZGzXP+TiAd124t95yLuXKhTy9CDRujH9PWX3eLHOKiiZDb4Oia1aLwYilKG9bTRhRqhMweMaM80NT0GCfWryeh2iHBygfxlt6IG6aiOIqTGM6/VnoKu6lt1DvO2DPMFdGE7T0tUU7eT921WuwxJtfZaAz2jXDHTpkNUgImiXPlfbQMu4goEUOd2iLKXO5FsvXUF0gW0ZaLs1xhZcKL/07S72VuiznR7FYKGoYbS/gy//ycdtNJbpwsSf0crm61pG4J722xgGI56+NHWMZ7I8K2wLX/spXnmSBZo9clgcsbrPwKKzMWbDPCN8ywfalb5FAXTZTcAZUx0bhz6SLCZZTQk1kSSeywWW5GGWBvUaj7J0zDd3Jj7CQShfW0Js0wCptlI0Rb5WrRUfrbFDuoX7jMFrt62mOT3IRC/4vEvjFDSJPIzbGLxtwhH02kciC3ux4nv9uIKLk9dg910UsUtuBnuBf01tNmWCtEGc+Vbe+AWz2Alfl2AlFeZQZxLtOGC1pxZwVEtVHXHMx7tY25lnJtN7XxseUxbZzIpznYB3WBiwUZcGv/WssgUYNdNDFkyFanJOPB7Zso3b4N5Tu2oyIsDKe2bqLwu849rk5OFO+FcgFloaEo2bYFjZQDqietIfxdsX07q98ptr2QnSH2PZ8QT/WbxfKy7aEoo/EFopRu24YY+RjKMlOuR2aijyhW3CJc17cNCGzn9vSWgBv9buXKrhEK2ZdZzmybExKBTGT9PLmyO8Ie/Twuezv1PBnjJXVTubrH7bnbEg30fSttftNG/1eYxgWLCQ3Rn+sZqtSo+yhRlZigc184T+bJ/Yc/+rqPm56+Jy8Ij5r0t2X3TY0/lj158Kil35NG3d+lW7cgVu5E25VSS9ljfUTh1eo5wV7pgHs8ipWncWWnmfEXyWEP4QvCChYvGMb6OXD9msQYQue7tHycJk5SN621Let5idKBMc63S5QYY5VGbeQqahQhMxxHB5jUVl4U0vdF9AgXHHx/nijU3FnzxPtEm7FIsB2LOEsPxFhQZPbSJVwvKcFeqhP6JVC90HfPCCcULP1Y7Js5OQQxI1zF8rjRHmIe6WH9PZSTVlLLXShhqGqNKLyhVdZGwC2TazeSlec8TyCK2ppJNI19JxDDmL1LCiNwVQeJsrmzicK8mPHM/c1iLvAjjiiD9YfwzTw18XJXVIRuR+O9OqjfISNVNgbq/nSwiGyX/cogXdxj9nzRQ4nvp0JcXyViZKQJZAoxe6wll1qwNfbJnBHXxw3xb6vISLVB0UqdgZxEXpDQVj1AJf4m2fih6dFjFK/9JxJp7hhTdyLK8O7t7L9lHYzMWrDydK7s8DMI1YBtOc19Z/8MglhJnk1IKO6VBPTaIsrWziIKy12t5UIM55nNsokzZlsnitrcW5Mod8PRxZ/o3OPxIYiTuSLNfhwS3/ag+Ii/GEmt2BqKWCJCmu04pFoHINnYBwlG7nT2RIMb5DrH93RDirmfWLefIIxRk5iEu5cvIYniNMkUdEuzDxTHKJi3UOf1zF6AFDkdsxxJSUGZXqIslGw9L7Wy9eTrsVFCJUbpa8/gsRRxfdXPSZIZEoK804oL3hZRQjuDKFQu4+wQAcGS+sp2iRI/ykeT1tsL6apJLEC2lYTsgnR7iocMp21kgLtIhFtnzyK5twfSRvojzfpdJBC59skdUfcDaZTiYjJKFSKxDhCR9lO8JWWQtxjev5ydjXi5Eqkj/XDAZpw4dk2Czh5KsfRH+gDaxsy9tZ/p1yiTuZfT6jMsmYdxjWtnx8qDJVvIhGcQ8gqun/C1/eUZSWLIgl9gan1oG/mZX5QogiEribV8pWf9LrZLlCQLX022RSDiKQJ763wVmhoakNzfE6lDfZBuG4gEmRvOhe8WBZvhNF70UlL6knYYHYBMvyl4cOM6bldVId1rAtJG+SOltydiKGB3MFB33KB07QYaQ4lMRRCS+3kizdxfLL+ckwM1aZ1DtpRnsiCivGWsjyi9JBFJZTueEe8e9+CEBWYXvNRBQb8umXf9MxKFJ/h1PfUfdSJR+FzPBj31f5RkuL0k9T2ZW9wOUUb5avJcpiGRCFH44TJRiMXLP6d7JXKcpiBZ5o5MpyA8unsXp7dsQ9GSj3Ht2LFWz8xeysxCwZwFqI5T4/716zhgQdHdgd7IVkwiLeSKyq07xHb50+ch2cAdBa4zEG8xVi9R2IskcC+ZqKf+oD6isLpFkrooIU/SQWHPlvSd0YFIrDP7O4DrJxBuINfuD1wgsDOIsqitOApzf3mNu0ZSv5Gra50oyaP9NUdcZiDLgrYMA0/crKggt/chskgDJNKWkdbHG4V/XfwUGW5WVqJ6TwxOrfiCbJRa3K2pQcmqtbioTqCt6GJLu8Zbt5DrOxOpMjobS2PljtUlBC9lZSOFCJhlE4RC55kgraZd0TpR+klOmIUL2wtBxQxWrWT/VUjU7i49+aEQFt4XbIUpLAJppGfudZK+guFnz/JLwpdqxELmze1yWb//liQW89gzBzFbiz9otV/PAaTmut0dIIoj1/5KcyKRxZde5vI3fFpiCnueKKZNbrWb20q1eldzxGkGDpL2OCDzwmHfEN0xgvRMHBoX0qI9Gm/cEH+Pz1+GlD6UECRBC8JvoOTezdJSJBmQASyjLWuQJ8r+8XVL7EW4qnZGIttpIm6SGy0azE6TkN7HBzmOU1DkGoJkS3/tijeHdW8n7nBeT85DiNr2ZeRpYl+vayvnK6r09OfPnPRs41DQcclWxAfEWjwrSUZ7pCSM39xeOGc7im2LTVJjmeV3mhgiOnge51vJ8z1geSY7zkAXApAPJc9znnl5QvT4Ceuj/0jnfptxmkKXYOQqpuAQQRB22ep1LVqhjuyPog8W4ZByqnh/YZ9abJNtPA5Zg+nk/TXKHleeQWZfP+QMDxTrruYeovJa8WhB2Zr1eFRX1zLeyYUrdIR0no4cxWScUL2PFKuANonC7bWCEbhKMMiEpJVE7dsye+VPrfR/mWmhvwk5ERZsE0Lb1s+QCQ5m+RfBo/qaeWXufO5E0uf3hElsrtXc1y48iw37qvvrsY/s2Pv0fQa7yIodo9jAjht8Kn0uYX7CJ2z9JnP5LROmKUe2ekIv3Xa85oTbLBweMw35ZC/kKaYiQ+aNc99t0x1iik0gwXoiyZDOq4Tu1GmV9xaJbXJNxqOBCHGHPKKDA96lMi+ULl2jM2KXf0nu8xhkycZCW6jTSmWr1on98okk+bTdCXOWuH9ALvU47fJ2iNJ1/cpXhm2Q5pT7HBLeDBSQvXBUFYI8y8migCu/+IbZGrdx/IPFyJR749apUtRVV4v1B2V+eEAu8J1z55Alp62kjz8ab95A7cHDyJB7oWTxSjTdfyAG10o/+lzsk28/DUfcQsS58mnLK/OYizSbQO2KHl1EeaGvTLuJmlLPeTjiHIxCshcEFLnPQqFTsEiEkzMWoe5cle7f9qRn43KiLkl4euVXyDDwQP2ly7hdUoZ0Q3dUb9VpnAu7Y3D9qO5Y5K2TJTgWMFccSxxbNatlHmHOcq/5FHsZ30WUF/3KdZx6RxBWoet7OKac1YLjHnPE3zzDQBwZNgnn136PRvJw+Otqui473ETnaWszs58+L3vhIs4sX4f8QUHI7xOI42SLHHef/dQcwpwV3n9Dlv2ke5/2GPpGlzRe4CvdfuLVM36LcJwEJxiWJ1Szn0Kxz1wcsw9GgSwQR00mo3zOp6jZuB3anMO4T8Spq7mAexcvouHKFdSmZ6H6660oDV6KI4MmoEAeiGOOISj2nvuTcYW5BLKc8VuMA3YTrn78xuA/dEnjBb6+7Wc9p3zs33E24COcHruA8Pen4bMAlQGLcNp/Icqc5qLEJBinBkxHqcV7KHedRxrhQ1R4fSj+XWoeglP9yEA1pS3FZZ7Yr5L6CWP8ZFya66z/Eghzbxpg3/V/pPxfuDYPcliYoZhSdUQ560a+S7CmTbiG6OA0U5NnN01z2GqqiDz7aZp8Z66+nXGEuTIVU6q3DR6ztEsCL/71vzzutWgsUr5IAAAAAElFTkSuQmCC",
	scale:1.0
},
pinDefaultImage:{
	img:"data:image/png;base64,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",
	scale:1.0
},
zoomin_unselected:{
	img:"data:image/png;base64,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",
	scale:1.0
},
zoomout_unselected:{
	img:"data:image/png;base64,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",
	scale:1.0
}
}

if (!imagePacks) var imagePacks={};imagePacks['HiResImages']={
pinDefaultImage:{
	img:"data:image/png;base64,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",
	scale:1.52
},
zoomin_unselected:{
	img:"data:image/png;base64,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",
	scale:1.52
},
zoomout_unselected:{
	img:"data:image/png;base64,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",
	scale:1.52
}
}
