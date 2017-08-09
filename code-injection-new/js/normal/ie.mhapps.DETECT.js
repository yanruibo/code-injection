
                    //var audioitem = new Audio('profocallaghanpodcast.mp3');
            
                     function getAudioElem() {
                    	var ua = navigator.userAgent;
                    	var elementToWrite = '<audio id="audio" src="DETECT_Niall.mp3" controls></audio>';
                    	if( ua.indexOf("Android") >= 0 )
                    	{
                    	  var androidversion = parseFloat(ua.slice(ua.indexOf("Android")+8)); 
                    	  if (androidversion < 2.3)
                    	  {
                    		  //alert("Android < 2.3 video needs work")
                    		  elementToWrite = '<video id="audio" width="0" height="0" src="DETECT_Niall.mp3"></video>';
                    	  } else {
                    		  //alert(">2.3 audio")
 
                    	  }
                    	} else {
                    		
                  		  	//alert("no android audio")
                   		
                    	}	
						return elementToWrite;
                    	
                    }
                   function play() {
                              //document.getElementById('audio').src="profocallaghanpodcast.mp3";
                              document.getElementById('audio').play();
                    }
            
                    function stop() {
                              document.getElementById('audio').pause();
                    }
            


















    














































            	document.write(getAudioElem());
            

































































                    //var audioitem = new Audio('profocallaghanpodcast.mp3');

function getAudioElem() {
                    	var ua = navigator.userAgent;
                    	var elementToWrite = '<audio id="audio" src="03_ciaran_firstep.mp3" controls></audio>';
                    	if( ua.indexOf("Android") >= 0 )
                    	{
                    	  var androidversion = parseFloat(ua.slice(ua.indexOf("Android")+8)); 
                    	  if (androidversion < 2.3)
                    	  {
                    		  //alert("Android < 2.3 video needs work")
                    		  elementToWrite = '<video id="audio" width="0" height="0" src="03_ciaran_firstep.mp3"></video>';
                    	  } else {
                    		  //alert(">2.3 audio")
 
                    	  }
                    	} else {
                    		
                  		  	//alert("no android audio")
                   		
                    	}	
						return elementToWrite;
                    	
                    }
           
                    function playAudio(which) {
                        var audioelem = document.getElementById('audio');
                    	if (which == 1) {
                            audioelem.src = "03_ciaran_firstep.mp3";
                    	} else if (which ==2) {
                            audioelem.src = "04_ciaran_depression.mp3";
                   		} else if (which ==3) {
                            audioelem.src = "05_ciaran_asking_psychosis.mp3";
                    	} else if (which ==4) {
                            audioelem.src = "06_psychiatrist_wrap_well.mp3";
                    	} else if (which ==5) {
                            audioelem.src = "07_ciaran_well.mp3";
                    	} else if (which ==6) {
                            audioelem.src = "08_ciaran_fin.mp3";
                    	}
                    	audioelem.load();
                    	audioelem.play();
                    }























            
            
            function initialize() {
                //alert("initialize");
                var mapOptions = {
                  center: new google.maps.LatLng(53.298724,-6.177482),
                  zoom: 16,
                  mapTypeId: google.maps.MapTypeId.ROADMAP
                };
                 var contentdiv = document;
                 var widthpt = contentdiv.width - 60;
                 var heightpt = contentdiv.height -80;
                //alert("width" + widthpt + "height" + heightpt);
                var canvas = document.getElementById("map_canvas");
                //var style = "width:"+ width + "pt; height:" + height + "pt";
                canvas.style.width = widthpt + "px";
                canvas.style.height = heightpt + "px";
                var map = new google.maps.Map(document.getElementById("map_canvas"),
                        mapOptions);
                var detect = new google.maps.LatLng(53.298724,-6.177482);
                addMarker(detect,map);
             }
 
            function addMarker(location,inmap) {
                marker = new google.maps.Marker({
                    position: location,
                    map: inmap,
                    title: "Detect"
                });
            }
          
            function setupTimer() {
                
                //alert("setupTimer");
            	var ua = navigator.userAgent;
            	if( ua.indexOf("Android") >= 0 )
            	{
                  setTimeout('initialize()', 500);
            	  var androidversion = parseFloat(ua.slice(ua.indexOf("Android")+8)); 
            	  if (androidversion < 2.3)
            	  {

            	  } else {


            	  }
            	} else {
            		//initialize();
                    setTimeout('initialize()', 500);

            	}	

            	
            }
            
            



		//initialize();
            setupTimer();
    
















































                    //var audioitem = new Audio('DETECT_Niall.mp3');
            
        function onSuccess() {
            console.log("playAudio():Audio Success");
        }

        // onError Callback 
        //
        function onError(error) {
            alert('code: '    + error.code    + '\n' + 
                  'message: ' + error.message + '\n');
        }
      
             function playAudio(src) {
            // Create Media object from src
            my_media = new Media(src, onSuccess, onError);

            
            // Play audio
            my_media.play();

            // Update my_media position every second
            if (mediaTimer == null) {
                mediaTimer = setInterval(function() {
                    // get my_media position
                    my_media.getCurrentPosition(
                        // success callback
                        function(position) {
                            if (position > -1) {
                                //setAudioPosition((position) + " sec");
                            }
                        },
                        // error callback
                        function(e) {
                            console.log("Error getting pos=" + e);
                            //setAudioPosition("Error: " + e);
                        }
                    );
                }, 1000);
            }
        }
             var my_media = null;
             var mediaTimer = null;

        // Pause audio
        // 
        function pauseAudio() {
            if (my_media) {
                my_media.pause();
            }
        }

        // Stop audio
        // 
        function stopAudio() {
            if (my_media) {
                my_media.stop();
            }
            clearInterval(mediaTimer);
            mediaTimer = null;
        }
       
                    
                    
                    
                     function getAudioElem() {
                    	var ua = navigator.userAgent;
                    	var elementToWrite = '<audio id="audio" src="DETECT_Niall.mp3" controls></audio>';
                    	if( ua.indexOf("Android") >= 0 )
                    	{
                    	  var androidversion = parseFloat(ua.slice(ua.indexOf("Android")+8)); 
                    	  if (androidversion < 2.3)
                    	  {
                    		  //alert("Android < 2.3 video needs work")
                    		  elementToWrite = '<video id="audio" width="0" height="0" src="DETECT_Niall.mp3"></video>';
                    	  } else {
                    		  //alert(">2.3 audio")
 								 elementToWrite = '';
                    	  }
                    	} else {
                    		
                  		  	//alert("no android audio")
                   		
                    	}	
						return elementToWrite;
                    	
                    }
                   function play() {
                   	var ua = navigator.userAgent;
                	if( ua.indexOf("Android") >= 0 )
                	{
                	  var androidversion = parseFloat(ua.slice(ua.indexOf("Android")+8)); 
                	  if (androidversion < 2.3)
                	  {
                		  stopAudio();
                    		playAudio("/android_asset/www/DETECT_Niall.mp3");

                	  } else {
                		  //alert(">2.3 audio")
               //           document.getElementById('audio').src="DETECT_Niall.mp3";
   //trying to fix 		  document.getElementById('audio').load();
               //           document.getElementById('audio').play();

                		  stopAudio();
                  		playAudio("/android_asset/www/DETECT_Niall.mp3");

                	  }
                	} else {
                		
              		  	//alert("no android audio")
                        document.getElementById('audio').src="DETECT_Niall.mp3";
              		  	document.getElementById('audio').load();
                        document.getElementById('audio').play();
              		
                	}	
 
                    }
            
                    function stop() {
                       	var ua = navigator.userAgent;
                    	if( ua.indexOf("Android") >= 0 )
                    	{
                    	  var androidversion = parseFloat(ua.slice(ua.indexOf("Android")+8)); 
                    	  if (androidversion < 2.3)
                    	  {
                    		  stopAudio();

                    	  } else {
                    		  //alert(">2.3 audio")
                    		  //document.getElementById('audio').pause();
                    		  stopAudio();

                    	  }
                    	} else {
                    		
                  		  	//alert("no android audio")
                    		document.getElementById('audio').pause();                  		
                    	}	
                    }
            
            

            	document.write(getAudioElem());
            























































            
            
            function initialize() {
                //alert("initialize");
                var mapOptions = {
                  center: new google.maps.LatLng(53.298724,-6.177482),
                  zoom: 16,
                  mapTypeId: google.maps.MapTypeId.ROADMAP
                };
                 var contentdiv = document;
                 var widthpt = contentdiv.width - 60;
                 var heightpt = contentdiv.height -80;
                //alert("width" + widthpt + "height" + heightpt);
                var canvas = document.getElementById("map_canvas");
                //var style = "width:"+ width + "pt; height:" + height + "pt";
                canvas.style.width = widthpt + "px";
                canvas.style.height = heightpt + "px";
                var map = new google.maps.Map(document.getElementById("map_canvas"),
                        mapOptions);
                var detect = new google.maps.LatLng(53.298724,-6.177482);
                addMarker(detect,map);
             }
 
            function addMarker(location,inmap) {
                marker = new google.maps.Marker({
                    position: location,
                    map: inmap,
                    title: "Detect"
                });
            }
          
            function setupTimer() {
                
                //alert("setupTimer");
            	var ua = navigator.userAgent;
            	if( ua.indexOf("Android") >= 0 )
            	{
                  setTimeout('initialize()', 500);
            	  var androidversion = parseFloat(ua.slice(ua.indexOf("Android")+8)); 
            	  if (androidversion < 2.3)
            	  {

            	  } else {


            	  }
            	} else {
            		//initialize();
                    setTimeout('initialize()', 500);

            	}	

            	
            }
            
            



		//initialize();
           setupTimer();
    
















































                function sendEmail(form) {
                    var email = escape(form.email.value);
                    if (email) {
                        email = "email=" + email + "::";
                    } else {
            
                    }
                    var phone = escape(form.phone.value);
                    if (phone) {
                        phone = "phone=" + phone + "::";
                    } else {
            
                    }
                    var enquiry = escape(form.enquiry.value);
                    if (enquiry) {
                        enquiry = "enquiry=" + enquiry ;
                    } else {
            
                    }
                    //alert("hello");
                    var address= escape("info@detect.ie");
                    var link = "mailto:" + address
                            + "?subject=" + escape("Detect App Enquiry")
                            + "&body=" + email 
                            + phone 
                            + enquiry;
                    //alert(link);
                    location.href = link;
                 }
            
                function callDetect(form) {
                    var number = "012791700";
                    var link = "tel:" + number;
                    location.href = link;
            
                }
            









































         	if (navigator.userAgent.toLowerCase().indexOf('webkit') > -1) {
         		
         	}  else {
         		document.write('<link href="nonwebkit.css" rel="stylesheet" media="screen" type="text/css" />');
         	}




                function sendEmail(form) {
                    var email = escape(form.email.value);
                    if (email) {
                        email = "email=" + email + "::";
                    } else {
            
                    }
                    var phone = escape(form.phone.value);
                    if (phone) {
                        phone = "phone=" + phone + "::";
                    } else {
            
                    }
                    var enquiry = escape(form.enquiry.value);
                    if (enquiry) {
                        enquiry = "enquiry=" + enquiry ;
                    } else {
            
                    }
                    //alert("hello");
                    var address= escape("info@detect.ie");
                    var link = "mailto:" + address
                            + "?subject=" + escape("Detect App Enquiry")
                            + "&body=" + email 
                            + phone 
                            + enquiry;
                    //alert(link);
                    location.href = link;
                 }
            
                function callDetect(form) {
                    var number = "012791700";
                    var link = "tel:" + number;
                    location.href = link;
            
                }
            





































// JavaScript Document










var iWebkit;

if (!iWebkit) {
	
	iWebkit = window.onload = function () {
			function fullscreen() {
				var a = document.getElementsByTagName("a");
				for (var i = 0; i < a.length;i++) {
					if (a[i].className.match("noeffect")) {
					}
				else {
						a[i].onclick = function () {
							window.location = this.getAttribute("href");
							return false;
						};
					}
				}
			}

			function hideURLbar() {
				window.scrollTo(0, 0.9);
			}
			iWebkit.init = function () {
				fullscreen();
				hideURLbar();
			};
			iWebkit.init();
		};
}












            
            function sendEmail(form) {
            	
            	var ua = navigator.userAgent;

            	
                var address= escape("noel.kehoe@sjog.ie");
                var link = "mailto:" + address
                        + "?subject=" + escape("CMS Main App Enquiry")
                        + "&body=" + "USERAGENT::" + ua
                        + "\n\fPlease enter comments\n\f--";
                //alert(link);
                location.href = link;
             }
           
            
            
            
            









































document.write('<meta content="yes" name="apple-mobile-web-app-capable" />');
document.write('<meta charset="utf-8"/>');
document.write('<meta content="minimum-scale=1.0, width=device-width, maximum-scale=0.6667, user-scalable=no" name="viewport" />');
document.write('<meta name="Description" content="Psychosis & Mental Health Services for the early Detection of psychosis and effective recovery" />');
document.write('<meta name="Keywords" content="psychosis, mental, health, schizophrenia, illness, nutjob, crazy, fruit cake, mad, hearing voices, delusions" />');

document.write('<link href="developer-style-edit.css" rel="stylesheet" media="screen" type="text/css" />');
document.write('<script src="developer-functions.js" type="text/javascript"></script>');
document.write('<script type="text/javascript" src="analytics.js"></script>');
document.write('<LINK REL="SHORTCUT ICON" href="favicon.ico">');
if (navigator.userAgent.toLowerCase().indexOf('webkit') > -1) {
         		
}  else {
	document.write('<link href="nonwebkit.css" rel="stylesheet" media="screen" type="text/css" />');
}

















