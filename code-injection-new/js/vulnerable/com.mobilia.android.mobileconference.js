
var deviceInfo = function() {
    document.getElementById("platform").innerHTML = device.platform;
    document.getElementById("version").innerHTML = device.version;
    document.getElementById("uuid").innerHTML = device.uuid;
    document.getElementById("name").innerHTML = device.name;
    document.getElementById("width").innerHTML = screen.width;
    document.getElementById("height").innerHTML = screen.height;
    document.getElementById("colorDepth").innerHTML = screen.colorDepth;
};

var getLocation = function() {
    var suc = function(p) {
        alert(p.coords.latitude + " " + p.coords.longitude);
    };
    var locFail = function() {
    };
    navigator.geolocation.getCurrentPosition(suc, locFail);
};

var beep = function() {
    navigator.notification.beep(2);
};

var vibrate = function() {
    navigator.notification.vibrate(0);
};

function roundNumber(num) {
    var dec = 3;
    var result = Math.round(num * Math.pow(10, dec)) / Math.pow(10, dec);
    return result;
}

var accelerationWatch = null;

function updateAcceleration(a) {
    document.getElementById('x').innerHTML = roundNumber(a.x);
    document.getElementById('y').innerHTML = roundNumber(a.y);
    document.getElementById('z').innerHTML = roundNumber(a.z);
}

var toggleAccel = function() {
    if (accelerationWatch !== null) {
        navigator.accelerometer.clearWatch(accelerationWatch);
        updateAcceleration({
            x : "",
            y : "",
            z : ""
        });
        accelerationWatch = null;
    } else {
        var options = {};
        options.frequency = 1000;
        accelerationWatch = navigator.accelerometer.watchAcceleration(
                updateAcceleration, function(ex) {
                    alert("accel fail (" + ex.name + ": " + ex.message + ")");
                }, options);
    }
};

var preventBehavior = function(e) {
    e.preventDefault();
};

function dump_pic(data) {
    var viewport = document.getElementById('viewport');
    console.log(data);
    viewport.style.display = "";
    viewport.style.position = "absolute";
    viewport.style.top = "10px";
    viewport.style.left = "10px";
    document.getElementById("test_img").src = "data:image/jpeg;base64," + data;
}

function fail(msg) {
    alert(msg);
}

function show_pic() {
    navigator.camera.getPicture(dump_pic, fail, {
        quality : 50
    });
}

function close() {
    var viewport = document.getElementById('viewport');
    viewport.style.position = "relative";
    viewport.style.display = "none";
}

function contacts_success(contacts) {
    alert(contacts.length
            + ' contacts returned.'
            + (contacts[2] && contacts[2].name ? (' Third contact is ' + contacts[2].name.formatted)
                    : ''));
}

function get_contacts() {
    var obj = new ContactFindOptions();
    obj.filter = "";
    obj.multiple = true;
    navigator.contacts.find(
            [ "displayName", "name" ], contacts_success,
            fail, obj);
}

function check_network() {
    var networkState = navigator.network.connection.type;

    var states = {};
    states[Connection.UNKNOWN]  = 'Unknown connection';
    states[Connection.ETHERNET] = 'Ethernet connection';
    states[Connection.WIFI]     = 'WiFi connection';
    states[Connection.CELL_2G]  = 'Cell 2G connection';
    states[Connection.CELL_3G]  = 'Cell 3G connection';
    states[Connection.CELL_4G]  = 'Cell 4G connection';
    states[Connection.NONE]     = 'No network connection';

    confirm('Connection type:\n ' + states[networkState]);
}

function init() {
    // the next line makes it impossible to see Contacts on the HTC Evo since it
    // doesn't have a scroll button
    // document.addEventListener("touchmove", preventBehavior, false);
    document.addEventListener("deviceready", deviceInfo, true);
}

















// JavaScript Document

 // Wait for PhoneGap to load
    //
    document.addEventListener("deviceready", onDeviceReady, false);

    // PhoneGap is ready
    //
    function onDeviceReady() {
      
    }


		function loadContacts(){
		
		 // search contacts, returning display name and phone numbers
				var options = new ContactFindOptions();
				options.filter="";
				options.multiple=true;  				
				filter = ["displayName","emails"];
				navigator.contacts.find(filter, onContactSuccess, onError, options);
					//setTimeout(stopLoader,60000);	
		}
		
		function inviteContacts(){
		
		 // search contacts, returning display name and phone numbers
				var options = new ContactFindOptions();
				options.filter="";
				options.multiple=true;  
				filter = ["displayName","emails"];
				navigator.contacts.find(filter, onContactSuccess2, onError, options);
					
		}
    
  function onContactSuccess(contacts) {
		
		
		

	
		var  data="";
		
		
		var conlength=contacts.length;
		if(conlength >=2){
			conlen=2;
			
		}
		else{
			conlen=contacts.length;
			
		}
	
		
        for (var i=0; i<conlen; i++) {
            // display phone numbers
			//showAlert("Contacts Discovered","Total Contacts discovered : "+contacts[i].phoneNumbers.length);
         //   for (var j=0; j<=contacts[i].phoneNumbers.length-1; j++) {
				
		try{
			email=contacts[i].emails[0].value;
			}
			catch(e){
			email="Not Available";
			}
			
			
			var name=contacts[i].displayName;
				//data=data+"<li data-corners='false' data-shadow='false' data-iconshadow='true' data-wrapperels='div' data-icon='arrow-r' data-iconpos='right' data-theme='c' class='ui-btn ui-btn-icon-right ui-li-has-arrow ui-li ui-btn-up-c'><p class='ui-li-aside ui-li-desc'><input type='checkbox' id='contact"+i+"' value='"+name+","+email+";'></p><div class='ui-btn-inner ui-li'><div class='ui-btn-text'><h3 class='ui-li-heading'>"+name+"</h3><br/><p style='font-size:11px'>"+email+"</p></div><span class='ui-icon ui-icon-arrow-r ui-icon-shadow'>&nbsp;</span></div></li>";
				if(i==0){
			data=data+"<li class='ui-li ui-li-static ui-body-c'><p class='ui-li-aside ui-li-desc'><input type='checkbox' id='contact"+i+"' value='"+email+"'></p><h3 class='ui-li-heading'><strong>"+name+"</strong></h3><p class='ui-li-desc'><strong>"+email+"</strong></p></li>";
				}
				else{
					data=data+"<li class='ui-li ui-li-static ui-body-c'><p class='ui-li-aside ui-li-desc'><input type='checkbox' id='contact"+i+"' value=',"+email+"'></p><h3 class='ui-li-heading'><strong>"+name+"</strong></h3><p class='ui-li-desc'><strong>"+email+"</strong></p></li>";
				}
			//jQuery("#conferencecontact").append("<li class='ui-li ui-li-static ui-body-c'><p class='ui-li-aside ui-li-desc'><input type='checkbox' id='contact"+i+"' value='"+name+","+email+";'  style='float:right'></p><h3 class='ui-li-heading'><strong>"+name+"</strong></h3><p class='ui-li-desc'><strong>"+email+"</strong></p></li>");
           	//jQuery("#conferencecontact").append("<tr><td><b style='float:left;'>Name:</b><i style='float:left;'>"+name+"</i><input type='checkbox' id='contact"+i+"' value='"+name+","+email+";'  style='float:right'><br/><b style='float:left;'>Email:</b><i style='float:left;'>"+email+"</i><br/></td></tr>");
				
	
			
			
          //  }
			
        }
		
			jQuery("#conferencecontact").append(data);
			
			if(conlength >=2){
			conlen=2;
			
		}
		else{
			conlen=contacts.length;
			
		}
			
	jQuery("#addconferencecontacts").css("display","block");
	hideWaiting();
    };
	


    function onContactSuccess2(contacts) {
		
			
		var  data="";
		var conlength=contacts.length;
		if(conlength >=2){
			conlen=2;
			
		}
		else{
			conlen=contacts.length;
			
		}
		
        for (var i=0; i<conlen; i++) {
            // display phone numbers
			//showAlert("Contacts Discovered","Total Contacts discovered : "+contacts[i].phoneNumbers.length);
          //  for (var j=0; j<=contacts[i].phoneNumbers.length-1; j++) {
			try{
			email=contacts[i].emails[0].value;
			}
			catch(e){
			email="Not Available";
			}
			
			
			var name=contacts[i].displayName;
			//data=data+"<li data-corners='false' data-shadow='false' data-iconshadow='true' data-wrapperels='div' data-icon='arrow-r' data-iconpos='right' data-theme='c' class='ui-btn ui-btn-icon-right ui-li-has-arrow ui-li ui-btn-up-c'><p class='ui-li-aside ui-li-desc'><input type='checkbox' id='invite"+i+"' value='"+name+","+email+";'></p><div class='ui-btn-inner ui-li'><div class='ui-btn-text'><h3 class='ui-li-heading'>"+name+"</h3><br/><p style='font-size:11px'>"+email+"</p></div><span class='ui-icon ui-icon-arrow-r ui-icon-shadow'>&nbsp;</span></div></li>";
			if(i==0){
			data=data+"<li class='ui-li ui-li-static ui-body-c'><p class='ui-li-aside ui-li-desc'><input type='checkbox' id='invite"+i+"' value='"+email+"'></p><h3 class='ui-li-heading'><strong>"+name+"</strong></h3><p class='ui-li-desc'><strong>"+email+"</strong></p></li>";
			}
			else{
				
				data=data+"<li class='ui-li ui-li-static ui-body-c'><p class='ui-li-aside ui-li-desc'><input type='checkbox' id='invite"+i+"' value=',"+email+"'></p><h3 class='ui-li-heading'><strong>"+name+"</strong></h3><p class='ui-li-desc'><strong>"+email+"</strong></p></li>";
			}
				//	jQuery("#invitecontact").append("<li class='ui-li ui-li-static ui-body-c'><p class='ui-li-aside ui-li-desc'><input type='checkbox' id='invite"+i+"' value='"+name+","+email+";'  style='float:right'></p><h3 class='ui-li-heading'><strong>"+name+"</strong></h3><p class='ui-li-desc'><strong>"+email+"</strong></p></li>");
			//jQuery("#invitecontact").append("<tr><td><b style='float:left;'>Name:</b><i style='float:left;'>"+name+"</i><input type='checkbox' id='invite"+i+"' value='"+name+","+email+";'  style='float:right'><br/><b style='float:left;'>Email:</b><i style='float:left;'>"+email+"</i><br/></td></tr>");
           	
	
			
			
			
          //  }
			
        }
		
		jQuery("#contactdata").append(data);
		jQuery("#invitephonebookcontacts").css("display","block");
		hideWaiting();
	
    };


    // onRemoveError: Failed to get the contacts
    //
    function onError(contactError) {
		
       showAlert("Error",contactError.code);
		
    }


// JavaScript Document
// handling document ready and phonegap deviceready
window.addEventListener('load', function () {
    document.addEventListener('deviceready', onDeviceReady, false);
}, false);

// Phonegap is loaded and can be used
function onDeviceReady(){
	var play_btn =  jQuery('#play');
	var pause_btn =  jQuery('#pause');
	var stop_btn =   jQuery('#stop');
	var rewind_btn =  jQuery('#rewind');
	var record_btn =  jQuery('#record');
	
	play_btn.click(function(){
							showWaiting();
		var srcurl=	jQuery("#recordingurl").val();
		if(srcurl==""){
			hideWaiting();
			showAlert("Status","Cannot determine location of media file");
			
		}
		playAudio(srcurl);
		
		play_btn.button('disable');
		pause_btn.button('enable');
	});
	
	pause_btn.click(function(){
		pauseAudio();
		
		pause_btn.button('disable');
		play_btn.button('enable');
	});
	
	stop_btn.click(function(){
		stopAudio();
		// reset slider
		jQuery('#timer').html("0:0 secs");
		jQuery('#slider').val(0);
		jQuery('#slider').slider('refresh');
		
	    pause_btn.button('disable');
		play_btn.button('enable');
	});
	
	rewind_btn.click(function(){
		stopAudio();
		playAudio("http://www.mobileconference.co/temp/sample.mp3");
		
	    play_btn.button('enable');
		pause_btn.button('disable');
	});
	
	record_btn.click(function(){
		stopAudio();
		record_btn.button('disable');
		play_btn.button('enable');
		pause_btn.button('disable');
		
		var recsec = 10;
		recordAudio('record.mp3');
		var rectxt = setInterval(function(){
			var recording = $('#recording');
			if(recsec == 0) {
				clearInterval(rectxt);
				recording.text('Play recording');
				record_btn.button('enable');
				playAudio('record.mp3');
			} else {
				recording.text('Stop recording in ' + recsec + ' seconds' );
				--recsec;
			}
		},1000);
	});
}

/* Audio player */
var audio = null;
var audioTimer = null;
var pausePos = 0;

/* play audio file */
function playAudio(file){
		jQuery('#statusbar').html("<img src='icons/loading.gif'>");
	try{
		
	audio = new Media(file, onSuccess, onError);
	
	audio.play();

   
	   
    // get audio duration
    var duration = audio.getDuration();
  
    // set slider data
    if( duration > 0 ){
		
	    jQuery('#slider').attr( 'max', Math.round(duration) );
	    jQuery('#slider').slider('refresh');
    }
    
    // play audio
 
    
    audio.seekTo(pausePos*1000);

    // update audio position every second
    if (audioTimer == null) {
        audioTimer = setInterval(function() {
            // get audio position
            audio.getCurrentPosition(
                function(position) { // get position success
                    if (position > -1) {
                        setAudioPosition(position);
                    }
                }, function(e) { // get position error
                    console.log("Error getting pos=" + e);
                    //setAudioPosition(duration);
                }
            );
        }, 1000);
    }
	}
	catch(e){
		alert(e);
	}
}

/* pause audio */
function pauseAudio() {
    if (audio) {
        audio.pause();
    }
}

/* stop audio */
function stopAudio() {
    if (audio) {
        audio.stop();
        audio.release();
    }
    clearInterval(audioTimer);
    audioTimer = null;
    pausePos = 0;
}

/* set audio position */
function setAudioPosition(position) {
	pausePos = position;
	position = Math.round(position);
	if(position > 0){
		hideWaiting();
	}
	displayTime=displayTimer(position);
	jQuery('#timer').html(displayTime+" secs");
    jQuery('#slider').val(position);
    jQuery('#slider').slider('refresh');
}

function displayTimer(position){
	time="";
	if(position>59){
		                          
		minVar = Math.floor(position/60);  
		secVar = position % 60; 
		if(secVar.length ==1){
			time=minVar+":0"+secVar;
		}
		else{		
		time=minVar+":"+secVar;		
		}
	}
	else{
		time="0:"+position;
	}
	
	return time;
}

/* record audio file */
function recordAudio(file){
	audioRec = new Media(file, onSuccess, onError);
    
    
    // start recording
    audioRec.startRecord();
    
    // stop recording after 10 seconds
    setTimeout(function(){
    	audioRec.stopRecord();
    	audioRec.release();
    }, 10000);
}


function onSuccess() {
           hideWaiting();
        }

        // onError Callback 
        //
        function onError(error) {
            alert('code: '    + error.code    + '\n' + 'message: ' + error.message + '\n');
        }


 // Wait for PhoneGap to load
    //
    document.addEventListener("deviceready", onDeviceReady, false);

    // PhoneGap is ready
    //
    function onDeviceReady() {
       
    }


		function loadContacts(){
		
		 // search contacts, returning display name and phone numbers
				var options = new ContactFindOptions();
				options.filter="";
				options.multiple=true;  
				filter = ["displayName","phoneNumbers","emails"];
				navigator.contacts.find(filter, onSuccess, onError, options);
					
		}
		
		function inviteContacts(){
		
		 // search contacts, returning display name and phone numbers
				var options = new ContactFindOptions();
				options.filter="";
				options.multiple=true;  
				filter = ["displayName","phoneNumbers","emails"];
				navigator.contacts.find(filter, onSuccess2, onError, options);
					
		}
    
    function onSuccess(contacts) {
		
		
		var  data="";
		try{
		
		jQuery("#conferencecontact").html("");
		}
		catch(e){
		//alert(e);	
		}
        for (var i=0; i<contacts.length; i++) {
            // display phone numbers
            for (var j=0; j<contacts[i].phoneNumbers.length; j++) {
				
			var email=contacts[i].emails[j].value;
			
			if(email==null){
					try{
					var email=contacts[i].email1[j].value;
					}
					catch(e){
					email="Not Available";
					}
			}
			
			try{
			var number=contacts[i].phoneNumbers[j].value;
			var name=contacts[i].displayName;
				if(name==null){
					try{
					var name=contacts[i].user1;
					}
					catch(e){
						name="no name";
					}
				}
			
			
			
			var type=contacts[i].phoneNumbers[j].type;
			
			
           	jQuery("#conferencecontact").append("<tr><td><b>Name</b> "+name+"<br/>"+type+"<br/><b>Phone</b>"+number+"<br/><b>Email</b>"+email+"<br/><b>Add</b><input type='checkbox' id='contact"+i+"' value="+name+","+number+","+email+";  style='float:right'></td></tr>");
				
		//jQuery('#invitecontact').find('ul').listview();
		//jQuery('#conferencecontact').find('ul').listview();
				// if(image==""){
//	   imageview="<img width='100px' height='100px' src='images/noimages.png' class='ui-li-thumb'>";
//   }
//   else{
//	   imageview="<img width='100px' height='100px' src='"+image+"' class='ui-li-thumb'>";
//   }

// imageview="<img width='100px' height='100px' src='images/noimages.png' class='ui-li-thumb'>";
// jQuery("#invitecontact").append("<tr><td><b>Name</b>"+contacts[i].displayName+"<br/>"+contacts[i].phoneNumbers[j].type +"</td><td>"+contacts[i].phoneNumbers[j].value+"</td><td>"+email+"</td></tr>");
        //   	jQuery("#conferencecontact").append("<tr><td><b>Name</b>"+contacts[i].displayName+"<br/>"+contacts[i].phoneNumbers[j].type +"</td><td>"+contacts[i].phoneNumbers[j].value+"</td><td>"+email+"</td></tr>");
			
			
		//	jQuery("#invitecontact").append("<tr><td>"+contacts[i].displayName+"</td><td>"+contacts[i].phoneNumbers[j].type +"</td><td>"+contacts[i].phoneNumbers[j].value+"</td><td>"+email+"</td></tr>");
           //  data=data+"<li data-theme='c' class='ui-btn ui-btn-icon-right ui-li-has-arrow ui-li ui-li-has-thumb ui-btn-up-c'><div class='ui-btn-inner ui-li' aria-hidden='true'><div class='ui-btn-text'><a href='#' class='ui-link-inherit'>"+imageview+"<h3 class='ui-li-heading'><b>Name:</b>"+contacts[i].displayName+"<br/><b>Type:</b>"+contacts[i].type+"<br/><b>Phone Number:</b>"+contacts[i].value+"<br/><b>Email:</b>"+email+"<br/></h3></a></div><span class='ui-icon ui-icon-arrow-r ui-icon-shadow'></span></div></li>";
			//jQuery("#contactdata").append(data);
			//jQuery("#conferencecontact").append(data);										
			//jQuery("#invitecontact").listview("refresh");											
			//jQuery("#conferencecontact").listview("refresh");
			}
			catch(e)
			{
			//alert(e);
			
			}
			
            }
        }
		
		
	
    };


    function onSuccess2(contacts) {
		
		
		var  data="";
		try{
		jQuery("#invitecontact").html("");
		
		}
		catch(e){
		//alert(e);	
		}
        for (var i=0; i<contacts.length; i++) {
            // display phone numbers
            for (var j=0; j<contacts[i].phoneNumbers.length; j++) {
			try{
			email=contacts[i].emails[j].value;
			}
			catch(e){
			email="Not Available";
			}
			try{
			var number=contacts[i].phoneNumbers[j].value;
			var name=contacts[i].displayName;
			var type=contacts[i].phoneNumbers[j].type;
			
			jQuery("#invitecontact").append("<tr class='odd'><td><b>Name</b> "+name+"<br/>"+type +"<br/><b>Phone</b>"+number+"<br/><b>Email</b>"+email+"<br/><b>Add</b><input type='checkbox' id='invite"+i+"' value="+name+","+number+","+email+"; style='float:right'></td></tr>");
           	
		//jQuery('#invitecontact').find('ul').listview();
		//jQuery('#conferencecontact').find('ul').listview();
				// if(image==""){
//	   imageview="<img width='100px' height='100px' src='images/noimages.png' class='ui-li-thumb'>";
//   }
//   else{
//	   imageview="<img width='100px' height='100px' src='"+image+"' class='ui-li-thumb'>";
//   }

// imageview="<img width='100px' height='100px' src='images/noimages.png' class='ui-li-thumb'>";
// jQuery("#invitecontact").append("<tr><td><b>Name</b>"+contacts[i].displayName+"<br/>"+contacts[i].phoneNumbers[j].type +"</td><td>"+contacts[i].phoneNumbers[j].value+"</td><td>"+email+"</td></tr>");
        //   	jQuery("#conferencecontact").append("<tr><td><b>Name</b>"+contacts[i].displayName+"<br/>"+contacts[i].phoneNumbers[j].type +"</td><td>"+contacts[i].phoneNumbers[j].value+"</td><td>"+email+"</td></tr>");
			
			
		//	jQuery("#invitecontact").append("<tr><td>"+contacts[i].displayName+"</td><td>"+contacts[i].phoneNumbers[j].type +"</td><td>"+contacts[i].phoneNumbers[j].value+"</td><td>"+email+"</td></tr>");
           //  data=data+"<li data-theme='c' class='ui-btn ui-btn-icon-right ui-li-has-arrow ui-li ui-li-has-thumb ui-btn-up-c'><div class='ui-btn-inner ui-li' aria-hidden='true'><div class='ui-btn-text'><a href='#' class='ui-link-inherit'>"+imageview+"<h3 class='ui-li-heading'><b>Name:</b>"+contacts[i].displayName+"<br/><b>Type:</b>"+contacts[i].type+"<br/><b>Phone Number:</b>"+contacts[i].value+"<br/><b>Email:</b>"+email+"<br/></h3></a></div><span class='ui-icon ui-icon-arrow-r ui-icon-shadow'></span></div></li>";
			//jQuery("#contactdata").append(data);
			//jQuery("#conferencecontact").append(data);										
			//jQuery("#invitecontact").listview("refresh");											
			//jQuery("#conferencecontact").listview("refresh");
			}
			catch(e)
			{
			//alert(e);
			
			}
			
            }
        }
		
		
	
    };


    // onRemoveError: Failed to get the contacts
    //
    function onError(contactError) {
        showAlert("Error",contactError.code);
		
    }


(function(a){function k(b,c){function j(){var a=document.body,b=document.documentElement;return Math.max(a.scrollHeight,a.offsetHeight,b.clientHeight,b.scrollHeight,b.offsetHeight)}function u(b){e=a("li.dw-v",b).eq(0).index();d=a("li.dw-v",b).eq(-1).index();g=i.height;G=m}function x(b){var a=i.headerText;return a?"function"==typeof a?a.call(B,b):a.replace(/{value}/i,b):""}function p(){m.temp=J&&null!==m.val&&m.val!=b.val()||null===m.values?i.parseValue(b.val()?b.val():"",m):m.values.slice(0);m.setValue(!0)}
function z(b,c,e,u,g){i.validate.call(B,y,e);a(".dww ul",y).each(function(u){var i=a(this),d=a('li[data-val="'+m.temp[u]+'"]',i),i=d.index(),f=d,d=i;if(!f.hasClass("dw-v")){for(var h=f,x=0,j=0;h.prev().length&&!h.hasClass("dw-v");)h=h.prev(),x++;for(;f.next().length&&!f.hasClass("dw-v");)f=f.next(),j++;j<x&&j&&1==!g||!x||!h.hasClass("dw-v")||1==g?d+=j:(f=h,d-=x);m.temp[u]=f.data("val")}if(i!=d||u==e||void 0===e)m.scroll(a(this),d,u==e?b:0,c,u)});m.change(u)}function k(){var b=0,c=0,u=a(window).width(),
e=a(window).height(),d=a(window).scrollTop(),i=a(".dwo",y),g=a(".dw",y),f,h;a(".dwc",y).each(function(){f=a(this).outerWidth(!0);b+=f;c=f>c?f:c});f=b>u?c:b;g.width(f);f=g.outerWidth();h=g.outerHeight();g.css({left:(u-f)/2,top:d+(e-h)/2});i.height(0).height(j())}function v(b){var a=+b.data("pos")+1;l(b,a>d?e:a,1)}function F(b){var a=+b.data("pos")-1;l(b,a<e?d:a,2)}var m=this,B=b,b=a(B),M,i=a.extend({},D),O,y,N={},P={},J=b.is("input"),K=!1;m.enable=function(){i.disabled=!1;J&&b.prop("disabled",!1)};
m.disable=function(){i.disabled=!0;J&&b.prop("disabled",!0)};m.scroll=function(b,a,c,u,e){var d=(O-a)*i.height;b.attr("style",(c?I+"-transition:all "+c.toFixed(1)+"s ease-out;":"")+(E?I+"-transform:translate3d(0,"+d+"px,0);":"top:"+d+"px;"));if(c){var f=0;clearInterval(N[e]);N[e]=setInterval(function(){f+=0.1;b.data("pos",Math.round((a-u)*Math.sin(f/c*(Math.PI/2))+u));f>=c&&(clearInterval(N[e]),b.data("pos",a))},100);clearTimeout(P[e]);P[e]=setTimeout(function(){"mixed"==i.mode&&!b.hasClass("dwa")&&
b.closest(".dwwl").find(".dwwb").fadeIn("fast")},1E3*c)}else b.data("pos",a)};m.setValue=function(a,c,e){var u=i.formatResult(m.temp);m.val=u;m.values=m.temp.slice(0);K&&a&&z(e);c&&J&&b.val(u).trigger("change")};m.validate=function(b,a,c,u){z(b,a,c,!0,u)};m.change=function(b){var c=i.formatResult(m.temp);"inline"==i.display?m.setValue(!1,b):a(".dwv",y).html(x(c));b&&i.onChange.call(B,c,m)};m.hide=function(){if(!1===i.onClose.call(B,m.val,m))return!1;a(".dwtd").prop("disabled",!1).removeClass("dwtd");
b.blur();y&&y.remove();K=!1;a(window).unbind(".dw")};m.show=function(){if(i.disabled||K)return!1;var c=i.height,e=i.rows*c;p();for(var d='<div class="'+i.theme+'">'+("inline"==i.display?'<div class="dw dwbg dwi"><div class="dwwr">':'<div class="dwo"></div><div class="dw dwbg"><div class="dwwr">'+(i.headerText?'<div class="dwv"></div>':"")),g=0;g<i.wheels.length;g++){var d=d+('<div class="dwc'+("scroller"!=i.mode?" dwpm":" dwsc")+(i.showLabel?"":" dwhl")+'"><div class="dwwc dwrc"><table cellpadding="0" cellspacing="0"><tr>'),
h;for(h in i.wheels[g]){var d=d+('<td><div class="dwwl dwrc">'+("scroller"!=i.mode?'<div class="dwwb dwwbp" style="height:'+c+"px;line-height:"+c+'px;"><span>+</span></div><div class="dwwb dwwbm" style="height:'+c+"px;line-height:"+c+'px;"><span>&ndash;</span></div>':"")+'<div class="dwl">'+h+'</div><div class="dww dwrc" style="height:'+e+"px;min-width:"+i.width+'px;"><ul>'),x;for(x in i.wheels[g][h])d+='<li class="dw-v" data-val="'+x+'" style="height:'+c+"px;line-height:"+c+'px;">'+i.wheels[g][h][x]+
"</li>";d+='</ul><div class="dwwo"></div></div><div class="dwwol"></div></div></td>'}d+="</tr></table></div></div>"}d+=("inline"!=i.display?'<div class="dwbc"><span class="dwbw dwb-s"><a href="#" class="dwb">'+i.setText+'</a></span><span class="dwbw dwb-c"><a href="#" class="dwb">'+i.cancelText+"</a></span></div>":'<div class="dwcc"></div>')+"</div></div></div>";y=a(d);z();"inline"!=i.display?y.appendTo("body"):b.is("div")?b.html(y):y.insertAfter(b);K=!0;M.init(y,m);"inline"!=i.display&&(a(".dwb-s a",
y).click(function(){m.setValue(!1,!0);m.hide();i.onSelect.call(B,m.val,m);return!1}),a(".dwb-c a",y).click(function(){m.hide();i.onCancel.call(B,m.val,m);return!1}),a("input,select").each(function(){a(this).prop("disabled")||a(this).addClass("dwtd")}),a("input,select").prop("disabled",!0),k(),a(window).bind("resize.dw",k));y.delegate(".dwwl","DOMMouseScroll mousewheel",function(b){if(!i.readonly){b.preventDefault();var b=b.originalEvent,b=b.wheelDelta?b.wheelDelta/120:b.detail?-b.detail/3:0,c=a("ul",
this),d=+c.data("pos"),d=Math.round(d-b);u(c);l(c,d,b<0?1:2)}}).delegate(".dwb, .dwwb",H,function(){a(this).addClass("dwb-a")}).delegate(".dwwb",H,function(b){if(!i.readonly){b.preventDefault();b.stopPropagation();var c=a(this).closest(".dwwl").find("ul");func=a(this).hasClass("dwwbp")?v:F;u(c);clearInterval(f);f=setInterval(function(){func(c)},i.delay);func(c)}}).delegate(".dwwl",H,function(b){if(!r&&i.mode!="clickpick"&&!i.readonly){b.preventDefault();r=true;s=a("ul",this).addClass("dwa");i.mode==
"mixed"&&a(".dwwb",this).fadeOut("fast");w=+s.data("pos");u(s);t=o(b);A=new Date;q=t;m.scroll(s,w)}});i.onShow.call(B,y,m)};m.init=function(c){M=a.extend({defaults:{},init:n},a.scroller.themes[c.theme?c.theme:i.theme]);a.extend(i,M.defaults,c);m.settings=i;O=Math.floor(i.rows/2);var d=a.scroller.presets[i.preset];b.unbind(".dw");d&&(d=d.call(B,m),a.extend(i,d,c),a.extend(C,d.methods));void 0!==b.data("dwro")&&(B.readOnly=h(b.data("dwro")));K&&m.hide();"inline"==i.display?m.show():(p(),J&&i.showOnFocus&&
(b.data("dwro",B.readOnly),B.readOnly=!0,b.bind("focus.dw",m.show)))};m.values=null;m.val=null;m.temp=null;m.init(c)}function v(b){for(var a in b)if(void 0!==z[b[a]])return!0;return!1}function o(b){return F?b.originalEvent?b.originalEvent.changedTouches[0].pageY:b.changedTouches[0].pageY:b.pageY}function h(b){return!0===b||"true"==b}function l(b,c,f,u,g){var h=b.closest(".dwwr").find("ul").index(b),c=c>d?d:c,c=c<e?e:c,b=a("li",b).eq(c);G.temp[h]=b.data("val");G.validate(u?c==g?0.1:Math.abs(0.1*(c-
g)):0,g,h,f)}var j={},f,n=function(){},g,e,d,G,p=(new Date).getTime(),r=!1,s=null,t,q,A,w,z=document.createElement(z).style,E=v(["perspectiveProperty","WebkitPerspective","MozPerspective","OPerspective","msPerspective"])&&"webkitPerspective"in document.documentElement.style,I=function(){var b=["Webkit","Moz","O","ms"],a;for(a in b)if(v([b[a]+"Transform"]))return"-"+b[a].toLowerCase();return""}(),F="ontouchstart"in window,H=F?"touchstart":"mousedown",L=F?"touchend":"mouseup",D={width:70,height:40,
rows:3,delay:300,disabled:!1,readonly:!1,showOnFocus:!0,showLabel:!0,wheels:[],theme:"",headerText:"{value}",display:"modal",mode:"scroller",preset:"",setText:"Set",cancelText:"Cancel",onShow:n,onClose:n,onSelect:n,onCancel:n,onChange:n,formatResult:function(b){for(var a="",d=0;d<b.length;d++)a+=(0<d?" ":"")+b[d];return a},parseValue:function(b,a){for(var d=a.settings.wheels,b=b.split(" "),e=[],g=0,f=0;f<d.length;f++)for(var h in d[f]){if(void 0!==d[f][h][b[g]])e.push(b[g]);else for(var j in d[f][h]){e.push(j);
break}g++}return e},validate:n},C={init:function(b){void 0===b&&(b={});return this.each(function(){this.id||(p+=1,this.id="scoller"+p);j[this.id]=new k(this,b)})},enable:function(){return this.each(function(){var b=j[this.id];b&&b.enable()})},disable:function(){return this.each(function(){var b=j[this.id];b&&b.disable()})},isDisabled:function(){var b=j[this[0].id];if(b)return b.settings.disabled},option:function(b,a){return this.each(function(){var d=j[this.id];if(d){var e={};"object"===typeof b?
e=b:e[b]=a;d.init(e)}})},setValue:function(b,a,d){return this.each(function(){var e=j[this.id];e&&(e.temp=b,e.setValue(!0,a,d))})},getInst:function(){return j[this[0].id]},getValue:function(){var b=j[this[0].id];if(b)return b.values},show:function(){var b=j[this[0].id];if(b)return b.show()},hide:function(){return this.each(function(){var b=j[this.id];b&&b.hide()})},destroy:function(){return this.each(function(){var b=j[this.id];b&&(b.hide(),a(this).unbind(".dw"),delete j[this.id],a(this).is("input")&&
(this.readOnly=h(a(this).data("dwro"))))})}};a(document).bind(F?"touchmove":"mousemove",function(b){r&&(b.preventDefault(),q=o(b),b=w+(t-q)/g,b=b>d+1?d+1:b,b=b<e-1?e-1:b,G.scroll(s,b))});a(document).bind(L,function(b){if(r){b.preventDefault();s.removeClass("dwa");var c=new Date-A,b=w+(t-q)/g,b=b>d+1?d+1:b,b=b<e-1?e-1:b;300>c?(c=(q-t)/c,c=c*c/0.0012,0>q-t&&(c=-c)):c=q-t;l(s,Math.round(w-c/g),0,!0,Math.round(b));r=!1;s=null}clearInterval(f);a(".dwb-a").removeClass("dwb-a")});a.fn.scroller=function(b){if(C[b])return C[b].apply(this,
Array.prototype.slice.call(arguments,1));if("object"===typeof b||!b)return C.init.apply(this,arguments);a.error("Unknown method")};a.scroller={setDefaults:function(b){a.extend(D,b)},presets:{},themes:{}}})(jQuery);(function(a){var k={inputClass:""};a.scroller.presets.select=function(v){var o=a.extend({},k,v.settings),h=a(this),l=this.id+"_dummy";a('label[for="'+this.id+'"]').attr("for",l);var j=a('label[for="'+l+'"]'),j=j.length?j.text():h.attr("name"),f=[],n=[{}];n[0][j]={};var g=n[0][j];a("option",h).each(function(){var d=a(this).attr("value");g[d]=a(this).text();a(this).prop("disabled")&&f.push(d)});a("#"+l).remove();var e=a('<input type="text" id="'+l+'" value="'+g[h.val()]+'" class="'+o.inputClass+'" readonly />').insertBefore(h);
o.showOnFocus&&e.focus(function(){v.show()});h.hide().closest(".ui-field-contain").trigger("create");return{width:200,wheels:n,headerText:!1,formatResult:function(a){return g[a[0]]},parseValue:function(){return[h.val()]},validate:function(d){a.each(f,function(e,f){a('li[data-val="'+f+'"]',d).removeClass("dw-v")})},onSelect:function(a,f){e.val(a);h.val(f.values[0]).trigger("change")},onChange:function(a,f){"inline"==o.display&&(e.val(a),h.val(f.temp[0]).trigger("change"))},onClose:function(){e.blur()}}}})(jQuery);(function(a){var k=new Date,v={dateFormat:"mm/dd/yy",dateOrder:"mmddy",timeWheels:"hhiiA",timeFormat:"hh:ii A",startYear:k.getFullYear()-100,endYear:k.getFullYear()+1,monthNames:"January,February,March,April,May,June,July,August,September,October,November,December".split(","),monthNamesShort:"Jan,Feb,Mar,Apr,May,Jun,Jul,Aug,Sep,Oct,Nov,Dec".split(","),dayNames:"Sunday,Monday,Tuesday,Wednesday,Thursday,Friday,Saturday".split(","),dayNamesShort:"Sun,Mon,Tue,Wed,Thu,Fri,Sat".split(","),shortYearCutoff:"+10",
monthText:"Month",dayText:"Day",yearText:"Year",hourText:"Hours",minuteText:"Minutes",secText:"Seconds",ampmText:"&nbsp;",stepHour:1,stepMinute:1,stepSecond:1,separator:" "},k=function(o){function h(b,a,c){return void 0!==p[a]?+b[p[a]]:void 0!==c?c:I[r[a]]?I[r[a]]():r[a](I)}function l(b,a){return Math.floor(b/a)*a}function j(b){var a=h(b,"h",0);return new Date(h(b,"y"),h(b,"m"),h(b,"d"),h(b,"ap")?a+12:a,h(b,"i",0),h(b,"s",0))}var f=a(this),n;if(f.is("input")){switch(f.attr("type")){case "date":n=
"yy-mm-dd";break;case "datetime":n="yy-mm-ddTHH:ii:ssZ";break;case "datetime-local":n="yy-mm-ddTHH:ii:ss";break;case "month":n="yy-mm";v.dateOrder="mmyy";break;case "time":n="HH:ii:ss"}var g=f.attr("min"),f=f.attr("max");g&&(v.minDate=a.scroller.parseDate(n,g));f&&(v.maxDate=a.scroller.parseDate(n,f))}var e=a.extend({},v,o.settings),d=0,g=[],k=[],p={},r={y:"getFullYear",m:"getMonth",d:"getDate",h:function(b){b=b.getHours();b=z&&12<=b?b-12:b;return l(b,F)},i:function(b){return l(b.getMinutes(),H)},
s:function(b){return l(b.getSeconds(),L)},ap:function(b){return w&&11<b.getHours()?1:0}},s=e.preset,t=e.dateOrder,q=e.timeWheels,A=t.match(/D/),w=q.match(/a/i),z=q.match(/h/),E="datetime"==s?e.dateFormat+e.separator+e.timeFormat:"time"==s?e.timeFormat:e.dateFormat,I=new Date,F=e.stepHour,H=e.stepMinute,L=e.stepSecond,D=e.minDate,C=e.maxDate;n=n?n:E;if(s.match(/date/i)){a.each(["y","m","d"],function(b,a){b=t.search(RegExp(a,"i"));-1<b&&k.push({o:b,v:a})});k.sort(function(b,a){return b.o>a.o?1:-1});
a.each(k,function(b,a){p[a.v]=b});for(var f={},b=0;3>b;b++)if(b==p.y){d++;f[e.yearText]={};for(var c=D?D.getFullYear():e.startYear,Q=C?C.getFullYear():e.endYear;c<=Q;c++)f[e.yearText][c]=t.match(/yy/i)?c:(c+"").substr(2,2)}else if(b==p.m){d++;f[e.monthText]={};for(c=0;12>c;c++)f[e.monthText][c]=t.match(/MM/)?e.monthNames[c]:t.match(/M/)?e.monthNamesShort[c]:t.match(/mm/)&&9>c?"0"+(c+1):c+1}else if(b==p.d){d++;f[e.dayText]={};for(c=1;32>c;c++)f[e.dayText][c]=t.match(/dd/i)&&10>c?"0"+c:c}g.push(f)}if(s.match(/time/i)){f=
{};if(q.match(/h/i)){p.h=d++;f[e.hourText]={};for(c=0;c<(z?12:24);c+=F)f[e.hourText][c]=z&&0==c?12:q.match(/hh/i)&&10>c?"0"+c:c}if(q.match(/i/)){p.i=d++;f[e.minuteText]={};for(c=0;60>c;c+=H)f[e.minuteText][c]=q.match(/ii/)&&10>c?"0"+c:c}if(q.match(/s/)){p.s=d++;f[e.secText]={};for(c=0;60>c;c+=L)f[e.secText][c]=q.match(/ss/)&&10>c?"0"+c:c}w&&(p.ap=d++,d=q.match(/A/),f[e.ampmText]={"0":d?"AM":"am",1:d?"PM":"pm"});g.push(f)}return{wheels:g,headerText:function(){return a.scroller.formatDate(E,j(o.temp),
e)},formatResult:function(b){return a.scroller.formatDate(n,j(b),e)},parseValue:function(b){var c=new Date,d=[];try{c=a.scroller.parseDate(n,b,e)}catch(f){}for(var g in p)d[p[g]]=c[r[g]]?c[r[g]]():r[g](c);return d},validate:function(b,c){var d=o.temp,f={m:0,d:1,h:0,i:0,s:0,ap:0},g={m:11,d:31,h:l(z?11:23,F),i:l(59,H),s:l(59,L),ap:1},j=!0,n=!0;a.each(D||C?"y,m,d,ap,h,i,s".split(","):c==p.y||c==p.m||void 0===c?["d"]:[],function(c,l){if(void 0!==p[l]){var o=f[l],i=g[l],z=31,k=h(d,l),s=a("ul",b).eq(p[l]),
q,x;"d"==l&&(q=h(d,"y"),x=h(d,"m"),i=z=32-(new Date(q,x,32)).getDate(),A&&a("li",s).each(function(){var b=a(this),c=b.data("val"),d=(new Date(q,x,c)).getDay();b.html(t.replace(/[my]/gi,"").replace(/dd/,10>c?"0"+c:c).replace(/d/,c).replace(/DD/,e.dayNames[d]).replace(/D/,e.dayNamesShort[d]))}));j&&D&&(o=D[r[l]]?D[r[l]]():r[l](D));n&&C&&(i=C[r[l]]?C[r[l]]():r[l](C));if("y"!=l){var v=a('li[data-val="'+o+'"]',s).index(),w=a('li[data-val="'+i+'"]',s).index();a("li",s).removeClass("dw-v").slice(v,w+1).addClass("dw-v");
"d"==l&&a("li",s).removeClass("dw-h").slice(z).addClass("dw-h");k<o&&(k=o);k>i&&(k=i)}j&&(j=k==o);n&&(n=k==i);if(e.invalid&&"d"==l){var E=[];e.invalid.dates&&a.each(e.invalid.dates,function(b,a){a.getFullYear()==q&&a.getMonth()==x&&E.push(a.getDate()-1)});if(e.invalid.daysOfWeek){var G=(new Date(q,x,1)).getDay();a.each(e.invalid.daysOfWeek,function(b,a){for(var c=a-G;c<z;c=c+7)c>=0&&E.push(c)})}e.invalid.daysOfMonth&&a.each(e.invalid.daysOfMonth,function(b,a){a=(a+"").split("/");a[1]?a[0]-1==x&&E.push(a[1]-
1):E.push(a[0]-1)});a.each(E,function(b,c){a("li",s).eq(c).removeClass("dw-v")})}}})},methods:{getDate:function(b){var c=a(this).scroller("getInst");if(c)return j(b?c.temp:c.values)},setDate:function(b,c,d){void 0==c&&(c=!1);return this.each(function(){var e=a(this).scroller("getInst");if(e){for(var f in p)e.temp[p[f]]=b[r[f]]?b[r[f]]():r[f](b);e.setValue(!0,c,d)}})}}}};a.scroller.presets.date=k;a.scroller.presets.datetime=k;a.scroller.presets.time=k;a.scroller.formatDate=function(o,h,l){if(!h)return null;
for(var l=a.extend({},v,l),j=function(a){for(var e=0;d+1<o.length&&o.charAt(d+1)==a;)e++,d++;return e},f=function(a,d,e){d=""+d;if(j(a))for(;d.length<e;)d="0"+d;return d},n=function(a,d,e,f){return j(a)?f[d]:e[d]},g="",e=!1,d=0;d<o.length;d++)if(e)"'"==o.charAt(d)&&!j("'")?e=!1:g+=o.charAt(d);else switch(o.charAt(d)){case "d":g+=f("d",h.getDate(),2);break;case "D":g+=n("D",h.getDay(),l.dayNamesShort,l.dayNames);break;case "o":g+=f("o",(h.getTime()-(new Date(h.getFullYear(),0,0)).getTime())/864E5,
3);break;case "m":g+=f("m",h.getMonth()+1,2);break;case "M":g+=n("M",h.getMonth(),l.monthNamesShort,l.monthNames);break;case "y":g+=j("y")?h.getFullYear():(10>h.getYear()%100?"0":"")+h.getYear()%100;break;case "h":var k=h.getHours(),g=g+f("h",12<k?k-12:0==k?12:k,2);break;case "H":g+=f("H",h.getHours(),2);break;case "i":g+=f("i",h.getMinutes(),2);break;case "s":g+=f("s",h.getSeconds(),2);break;case "a":g+=11<h.getHours()?"pm":"am";break;case "A":g+=11<h.getHours()?"PM":"AM";break;case "'":j("'")?g+=
"'":e=!0;break;default:g+=o.charAt(d)}return g};a.scroller.parseDate=function(k,h,l){var j=new Date;if(!k||!h)return j;for(var h="object"==typeof h?h.toString():h+"",f=a.extend({},v,l),l=j.getFullYear(),n=j.getMonth()+1,g=j.getDate(),e=-1,d=j.getHours(),j=j.getMinutes(),G=0,p=-1,r=!1,s=function(a){(a=w+1<k.length&&k.charAt(w+1)==a)&&w++;return a},t=function(a){s(a);a=h.substr(A).match(RegExp("^\\d{1,"+("@"==a?14:"!"==a?20:"y"==a?4:"o"==a?3:2)+"}"));if(!a)return 0;A+=a[0].length;return parseInt(a[0],
10)},q=function(a,d,e){a=s(a)?e:d;for(d=0;d<a.length;d++)if(h.substr(A,a[d].length).toLowerCase()==a[d].toLowerCase())return A+=a[d].length,d+1;return 0},A=0,w=0;w<k.length;w++)if(r)"'"==k.charAt(w)&&!s("'")?r=!1:A++;else switch(k.charAt(w)){case "d":g=t("d");break;case "D":q("D",f.dayNamesShort,f.dayNames);break;case "o":e=t("o");break;case "m":n=t("m");break;case "M":n=q("M",f.monthNamesShort,f.monthNames);break;case "y":l=t("y");break;case "H":d=t("H");break;case "h":d=t("h");break;case "i":j=
t("i");break;case "s":G=t("s");break;case "a":p=q("a",["am","pm"],["am","pm"])-1;break;case "A":p=q("A",["am","pm"],["am","pm"])-1;break;case "'":s("'")?A++:r=!0;break;default:A++}100>l&&(l+=(new Date).getFullYear()-(new Date).getFullYear()%100+(l<=f.shortYearCutoff?0:-100));if(-1<e){n=1;g=e;do{f=32-(new Date(l,n-1,32)).getDate();if(g<=f)break;n++;g-=f}while(1)}d=new Date(l,n-1,g,-1==p?d:p&&12>d?d+12:!p&&12==d?0:d,j,G);if(d.getFullYear()!=l||d.getMonth()+1!=n||d.getDate()!=g)throw"Invalid date";return d}})(jQuery);(function(a){a.scroller.themes.jqm={defaults:{jqmBody:"c",jqmHeader:"b",jqmWheel:"d",jqmClickPick:"c",jqmSet:"b",jqmCancel:"c"},init:function(k,v){var o=v.settings;a(".dw",k).removeClass("dwbg").addClass("ui-overlay-shadow ui-corner-all ui-body-a");a(".dwb-s a",k).attr("data-role","button").attr("data-theme",o.jqmSet);a(".dwb-c a",k).attr("data-role","button").attr("data-theme",o.jqmCancel);a(".dwwb",k).attr("data-role","button").attr("data-theme",o.jqmClickPick);a(".dwv",k).addClass("ui-header ui-bar-"+
o.jqmHeader);a(".dwwr",k).addClass("ui-body-"+o.jqmBody);a(".dwpm .dww",k).addClass("ui-body-"+o.jqmWheel);"inline"!=o.display&&a(".dw",k).addClass("pop in");k.trigger("create");a(".dwo",k).click(function(){v.hide()})}}})(jQuery);(function(a){a.scroller.themes.ios={defaults:{dateOrder:"MMdyy",rows:5,height:30,width:55,headerText:!1,showLabel:!1}}})(jQuery);(function(a){var k={defaults:{dateOrder:"Mddyy",mode:"mixed",rows:5,width:70,showLabel:!1}};a.scroller.themes["android-ics"]=k;a.scroller.themes["android-ics light"]=k})(jQuery);(function(a){a.scroller.themes.android={defaults:{dateOrder:"Mddyy",mode:"clickpick",height:50}}})(jQuery);


var q=null;window.PR_SHOULD_USE_CONTINUATION=!0;
(function(){function L(a){function m(a){var f=a.charCodeAt(0);if(f!==92)return f;var b=a.charAt(1);return(f=r[b])?f:"0"<=b&&b<="7"?parseInt(a.substring(1),8):b==="u"||b==="x"?parseInt(a.substring(2),16):a.charCodeAt(1)}function e(a){if(a<32)return(a<16?"\\x0":"\\x")+a.toString(16);a=String.fromCharCode(a);if(a==="\\"||a==="-"||a==="["||a==="]")a="\\"+a;return a}function h(a){for(var f=a.substring(1,a.length-1).match(/\\u[\dA-Fa-f]{4}|\\x[\dA-Fa-f]{2}|\\[0-3][0-7]{0,2}|\\[0-7]{1,2}|\\[\S\s]|[^\\]/g),a=
[],b=[],o=f[0]==="^",c=o?1:0,i=f.length;c<i;++c){var j=f[c];if(/\\[bdsw]/i.test(j))a.push(j);else{var j=m(j),d;c+2<i&&"-"===f[c+1]?(d=m(f[c+2]),c+=2):d=j;b.push([j,d]);d<65||j>122||(d<65||j>90||b.push([Math.max(65,j)|32,Math.min(d,90)|32]),d<97||j>122||b.push([Math.max(97,j)&-33,Math.min(d,122)&-33]))}}b.sort(function(a,f){return a[0]-f[0]||f[1]-a[1]});f=[];j=[NaN,NaN];for(c=0;c<b.length;++c)i=b[c],i[0]<=j[1]+1?j[1]=Math.max(j[1],i[1]):f.push(j=i);b=["["];o&&b.push("^");b.push.apply(b,a);for(c=0;c<
f.length;++c)i=f[c],b.push(e(i[0])),i[1]>i[0]&&(i[1]+1>i[0]&&b.push("-"),b.push(e(i[1])));b.push("]");return b.join("")}function y(a){for(var f=a.source.match(/\[(?:[^\\\]]|\\[\S\s])*]|\\u[\dA-Fa-f]{4}|\\x[\dA-Fa-f]{2}|\\\d+|\\[^\dux]|\(\?[!:=]|[()^]|[^()[\\^]+/g),b=f.length,d=[],c=0,i=0;c<b;++c){var j=f[c];j==="("?++i:"\\"===j.charAt(0)&&(j=+j.substring(1))&&j<=i&&(d[j]=-1)}for(c=1;c<d.length;++c)-1===d[c]&&(d[c]=++t);for(i=c=0;c<b;++c)j=f[c],j==="("?(++i,d[i]===void 0&&(f[c]="(?:")):"\\"===j.charAt(0)&&
(j=+j.substring(1))&&j<=i&&(f[c]="\\"+d[i]);for(i=c=0;c<b;++c)"^"===f[c]&&"^"!==f[c+1]&&(f[c]="");if(a.ignoreCase&&s)for(c=0;c<b;++c)j=f[c],a=j.charAt(0),j.length>=2&&a==="["?f[c]=h(j):a!=="\\"&&(f[c]=j.replace(/[A-Za-z]/g,function(a){a=a.charCodeAt(0);return"["+String.fromCharCode(a&-33,a|32)+"]"}));return f.join("")}for(var t=0,s=!1,l=!1,p=0,d=a.length;p<d;++p){var g=a[p];if(g.ignoreCase)l=!0;else if(/[a-z]/i.test(g.source.replace(/\\u[\da-f]{4}|\\x[\da-f]{2}|\\[^UXux]/gi,""))){s=!0;l=!1;break}}for(var r=
{b:8,t:9,n:10,v:11,f:12,r:13},n=[],p=0,d=a.length;p<d;++p){g=a[p];if(g.global||g.multiline)throw Error(""+g);n.push("(?:"+y(g)+")")}return RegExp(n.join("|"),l?"gi":"g")}function M(a){function m(a){switch(a.nodeType){case 1:if(e.test(a.className))break;for(var g=a.firstChild;g;g=g.nextSibling)m(g);g=a.nodeName;if("BR"===g||"LI"===g)h[s]="\n",t[s<<1]=y++,t[s++<<1|1]=a;break;case 3:case 4:g=a.nodeValue,g.length&&(g=p?g.replace(/\r\n?/g,"\n"):g.replace(/[\t\n\r ]+/g," "),h[s]=g,t[s<<1]=y,y+=g.length,
t[s++<<1|1]=a)}}var e=/(?:^|\s)nocode(?:\s|$)/,h=[],y=0,t=[],s=0,l;a.currentStyle?l=a.currentStyle.whiteSpace:window.getComputedStyle&&(l=document.defaultView.getComputedStyle(a,q).getPropertyValue("white-space"));var p=l&&"pre"===l.substring(0,3);m(a);return{a:h.join("").replace(/\n$/,""),c:t}}function B(a,m,e,h){m&&(a={a:m,d:a},e(a),h.push.apply(h,a.e))}function x(a,m){function e(a){for(var l=a.d,p=[l,"pln"],d=0,g=a.a.match(y)||[],r={},n=0,z=g.length;n<z;++n){var f=g[n],b=r[f],o=void 0,c;if(typeof b===
"string")c=!1;else{var i=h[f.charAt(0)];if(i)o=f.match(i[1]),b=i[0];else{for(c=0;c<t;++c)if(i=m[c],o=f.match(i[1])){b=i[0];break}o||(b="pln")}if((c=b.length>=5&&"lang-"===b.substring(0,5))&&!(o&&typeof o[1]==="string"))c=!1,b="src";c||(r[f]=b)}i=d;d+=f.length;if(c){c=o[1];var j=f.indexOf(c),k=j+c.length;o[2]&&(k=f.length-o[2].length,j=k-c.length);b=b.substring(5);B(l+i,f.substring(0,j),e,p);B(l+i+j,c,C(b,c),p);B(l+i+k,f.substring(k),e,p)}else p.push(l+i,b)}a.e=p}var h={},y;(function(){for(var e=a.concat(m),
l=[],p={},d=0,g=e.length;d<g;++d){var r=e[d],n=r[3];if(n)for(var k=n.length;--k>=0;)h[n.charAt(k)]=r;r=r[1];n=""+r;p.hasOwnProperty(n)||(l.push(r),p[n]=q)}l.push(/[\S\s]/);y=L(l)})();var t=m.length;return e}function u(a){var m=[],e=[];a.tripleQuotedStrings?m.push(["str",/^(?:'''(?:[^'\\]|\\[\S\s]|''?(?=[^']))*(?:'''|$)|"""(?:[^"\\]|\\[\S\s]|""?(?=[^"]))*(?:"""|$)|'(?:[^'\\]|\\[\S\s])*(?:'|$)|"(?:[^"\\]|\\[\S\s])*(?:"|$))/,q,"'\""]):a.multiLineStrings?m.push(["str",/^(?:'(?:[^'\\]|\\[\S\s])*(?:'|$)|"(?:[^"\\]|\\[\S\s])*(?:"|$)|`(?:[^\\`]|\\[\S\s])*(?:`|$))/,
q,"'\"`"]):m.push(["str",/^(?:'(?:[^\n\r'\\]|\\.)*(?:'|$)|"(?:[^\n\r"\\]|\\.)*(?:"|$))/,q,"\"'"]);a.verbatimStrings&&e.push(["str",/^@"(?:[^"]|"")*(?:"|$)/,q]);var h=a.hashComments;h&&(a.cStyleComments?(h>1?m.push(["com",/^#(?:##(?:[^#]|#(?!##))*(?:###|$)|.*)/,q,"#"]):m.push(["com",/^#(?:(?:define|elif|else|endif|error|ifdef|include|ifndef|line|pragma|undef|warning)\b|[^\n\r]*)/,q,"#"]),e.push(["str",/^<(?:(?:(?:\.\.\/)*|\/?)(?:[\w-]+(?:\/[\w-]+)+)?[\w-]+\.h|[a-z]\w*)>/,q])):m.push(["com",/^#[^\n\r]*/,
q,"#"]));a.cStyleComments&&(e.push(["com",/^\/\/[^\n\r]*/,q]),e.push(["com",/^\/\*[\S\s]*?(?:\*\/|$)/,q]));a.regexLiterals&&e.push(["lang-regex",/^(?:^^\.?|[!+-]|!=|!==|#|%|%=|&|&&|&&=|&=|\(|\*|\*=|\+=|,|-=|->|\/|\/=|:|::|;|<|<<|<<=|<=|=|==|===|>|>=|>>|>>=|>>>|>>>=|[?@[^]|\^=|\^\^|\^\^=|{|\||\|=|\|\||\|\|=|~|break|case|continue|delete|do|else|finally|instanceof|return|throw|try|typeof)\s*(\/(?=[^*/])(?:[^/[\\]|\\[\S\s]|\[(?:[^\\\]]|\\[\S\s])*(?:]|$))+\/)/]);(h=a.types)&&e.push(["typ",h]);a=(""+a.keywords).replace(/^ | $/g,
"");a.length&&e.push(["kwd",RegExp("^(?:"+a.replace(/[\s,]+/g,"|")+")\\b"),q]);m.push(["pln",/^\s+/,q," \r\n\t\xa0"]);e.push(["lit",/^@[$_a-z][\w$@]*/i,q],["typ",/^(?:[@_]?[A-Z]+[a-z][\w$@]*|\w+_t\b)/,q],["pln",/^[$_a-z][\w$@]*/i,q],["lit",/^(?:0x[\da-f]+|(?:\d(?:_\d+)*\d*(?:\.\d*)?|\.\d\+)(?:e[+-]?\d+)?)[a-z]*/i,q,"0123456789"],["pln",/^\\[\S\s]?/,q],["pun",/^.[^\s\w"-$'./@\\`]*/,q]);return x(m,e)}function D(a,m){function e(a){switch(a.nodeType){case 1:if(k.test(a.className))break;if("BR"===a.nodeName)h(a),
a.parentNode&&a.parentNode.removeChild(a);else for(a=a.firstChild;a;a=a.nextSibling)e(a);break;case 3:case 4:if(p){var b=a.nodeValue,d=b.match(t);if(d){var c=b.substring(0,d.index);a.nodeValue=c;(b=b.substring(d.index+d[0].length))&&a.parentNode.insertBefore(s.createTextNode(b),a.nextSibling);h(a);c||a.parentNode.removeChild(a)}}}}function h(a){function b(a,d){var e=d?a.cloneNode(!1):a,f=a.parentNode;if(f){var f=b(f,1),g=a.nextSibling;f.appendChild(e);for(var h=g;h;h=g)g=h.nextSibling,f.appendChild(h)}return e}
for(;!a.nextSibling;)if(a=a.parentNode,!a)return;for(var a=b(a.nextSibling,0),e;(e=a.parentNode)&&e.nodeType===1;)a=e;d.push(a)}var k=/(?:^|\s)nocode(?:\s|$)/,t=/\r\n?|\n/,s=a.ownerDocument,l;a.currentStyle?l=a.currentStyle.whiteSpace:window.getComputedStyle&&(l=s.defaultView.getComputedStyle(a,q).getPropertyValue("white-space"));var p=l&&"pre"===l.substring(0,3);for(l=s.createElement("LI");a.firstChild;)l.appendChild(a.firstChild);for(var d=[l],g=0;g<d.length;++g)e(d[g]);m===(m|0)&&d[0].setAttribute("value",
m);var r=s.createElement("OL");r.className="linenums";for(var n=Math.max(0,m-1|0)||0,g=0,z=d.length;g<z;++g)l=d[g],l.className="L"+(g+n)%10,l.firstChild||l.appendChild(s.createTextNode("\xa0")),r.appendChild(l);a.appendChild(r)}function k(a,m){for(var e=m.length;--e>=0;){var h=m[e];A.hasOwnProperty(h)?window.console&&console.warn("cannot override language handler %s",h):A[h]=a}}function C(a,m){if(!a||!A.hasOwnProperty(a))a=/^\s*</.test(m)?"default-markup":"default-code";return A[a]}function E(a){var m=
a.g;try{var e=M(a.h),h=e.a;a.a=h;a.c=e.c;a.d=0;C(m,h)(a);var k=/\bMSIE\b/.test(navigator.userAgent),m=/\n/g,t=a.a,s=t.length,e=0,l=a.c,p=l.length,h=0,d=a.e,g=d.length,a=0;d[g]=s;var r,n;for(n=r=0;n<g;)d[n]!==d[n+2]?(d[r++]=d[n++],d[r++]=d[n++]):n+=2;g=r;for(n=r=0;n<g;){for(var z=d[n],f=d[n+1],b=n+2;b+2<=g&&d[b+1]===f;)b+=2;d[r++]=z;d[r++]=f;n=b}for(d.length=r;h<p;){var o=l[h+2]||s,c=d[a+2]||s,b=Math.min(o,c),i=l[h+1],j;if(i.nodeType!==1&&(j=t.substring(e,b))){k&&(j=j.replace(m,"\r"));i.nodeValue=
j;var u=i.ownerDocument,v=u.createElement("SPAN");v.className=d[a+1];var x=i.parentNode;x.replaceChild(v,i);v.appendChild(i);e<o&&(l[h+1]=i=u.createTextNode(t.substring(b,o)),x.insertBefore(i,v.nextSibling))}e=b;e>=o&&(h+=2);e>=c&&(a+=2)}}catch(w){"console"in window&&console.log(w&&w.stack?w.stack:w)}}var v=["break,continue,do,else,for,if,return,while"],w=[[v,"auto,case,char,const,default,double,enum,extern,float,goto,int,long,register,short,signed,sizeof,static,struct,switch,typedef,union,unsigned,void,volatile"],
"catch,class,delete,false,import,new,operator,private,protected,public,this,throw,true,try,typeof"],F=[w,"alignof,align_union,asm,axiom,bool,concept,concept_map,const_cast,constexpr,decltype,dynamic_cast,explicit,export,friend,inline,late_check,mutable,namespace,nullptr,reinterpret_cast,static_assert,static_cast,template,typeid,typename,using,virtual,where"],G=[w,"abstract,boolean,byte,extends,final,finally,implements,import,instanceof,null,native,package,strictfp,super,synchronized,throws,transient"],
H=[G,"as,base,by,checked,decimal,delegate,descending,dynamic,event,fixed,foreach,from,group,implicit,in,interface,internal,into,is,lock,object,out,override,orderby,params,partial,readonly,ref,sbyte,sealed,stackalloc,string,select,uint,ulong,unchecked,unsafe,ushort,var"],w=[w,"debugger,eval,export,function,get,null,set,undefined,var,with,Infinity,NaN"],I=[v,"and,as,assert,class,def,del,elif,except,exec,finally,from,global,import,in,is,lambda,nonlocal,not,or,pass,print,raise,try,with,yield,False,True,None"],
J=[v,"alias,and,begin,case,class,def,defined,elsif,end,ensure,false,in,module,next,nil,not,or,redo,rescue,retry,self,super,then,true,undef,unless,until,when,yield,BEGIN,END"],v=[v,"case,done,elif,esac,eval,fi,function,in,local,set,then,until"],K=/^(DIR|FILE|vector|(de|priority_)?queue|list|stack|(const_)?iterator|(multi)?(set|map)|bitset|u?(int|float)\d*)/,N=/\S/,O=u({keywords:[F,H,w,"caller,delete,die,do,dump,elsif,eval,exit,foreach,for,goto,if,import,last,local,my,next,no,our,print,package,redo,require,sub,undef,unless,until,use,wantarray,while,BEGIN,END"+
I,J,v],hashComments:!0,cStyleComments:!0,multiLineStrings:!0,regexLiterals:!0}),A={};k(O,["default-code"]);k(x([],[["pln",/^[^<?]+/],["dec",/^<!\w[^>]*(?:>|$)/],["com",/^<\!--[\S\s]*?(?:--\>|$)/],["lang-",/^<\?([\S\s]+?)(?:\?>|$)/],["lang-",/^<%([\S\s]+?)(?:%>|$)/],["pun",/^(?:<[%?]|[%?]>)/],["lang-",/^<xmp\b[^>]*>([\S\s]+?)<\/xmp\b[^>]*>/i],["lang-js",/^<script\b[^>]*>([\S\s]*?)(<\/script\b[^>]*>)/i],["lang-css",/^<style\b[^>]*>([\S\s]*?)(<\/style\b[^>]*>)/i],["lang-in.tag",/^(<\/?[a-z][^<>]*>)/i]]),
["default-markup","htm","html","mxml","xhtml","xml","xsl"]);k(x([["pln",/^\s+/,q," \t\r\n"],["atv",/^(?:"[^"]*"?|'[^']*'?)/,q,"\"'"]],[["tag",/^^<\/?[a-z](?:[\w-.:]*\w)?|\/?>$/i],["atn",/^(?!style[\s=]|on)[a-z](?:[\w:-]*\w)?/i],["lang-uq.val",/^=\s*([^\s"'>]*(?:[^\s"'/>]|\/(?=\s)))/],["pun",/^[/<->]+/],["lang-js",/^on\w+\s*=\s*"([^"]+)"/i],["lang-js",/^on\w+\s*=\s*'([^']+)'/i],["lang-js",/^on\w+\s*=\s*([^\s"'>]+)/i],["lang-css",/^style\s*=\s*"([^"]+)"/i],["lang-css",/^style\s*=\s*'([^']+)'/i],["lang-css",
/^style\s*=\s*([^\s"'>]+)/i]]),["in.tag"]);k(x([],[["atv",/^[\S\s]+/]]),["uq.val"]);k(u({keywords:F,hashComments:!0,cStyleComments:!0,types:K}),["c","cc","cpp","cxx","cyc","m"]);k(u({keywords:"null,true,false"}),["json"]);k(u({keywords:H,hashComments:!0,cStyleComments:!0,verbatimStrings:!0,types:K}),["cs"]);k(u({keywords:G,cStyleComments:!0}),["java"]);k(u({keywords:v,hashComments:!0,multiLineStrings:!0}),["bsh","csh","sh"]);k(u({keywords:I,hashComments:!0,multiLineStrings:!0,tripleQuotedStrings:!0}),
["cv","py"]);k(u({keywords:"caller,delete,die,do,dump,elsif,eval,exit,foreach,for,goto,if,import,last,local,my,next,no,our,print,package,redo,require,sub,undef,unless,until,use,wantarray,while,BEGIN,END",hashComments:!0,multiLineStrings:!0,regexLiterals:!0}),["perl","pl","pm"]);k(u({keywords:J,hashComments:!0,multiLineStrings:!0,regexLiterals:!0}),["rb"]);k(u({keywords:w,cStyleComments:!0,regexLiterals:!0}),["js"]);k(u({keywords:"all,and,by,catch,class,else,extends,false,finally,for,if,in,is,isnt,loop,new,no,not,null,of,off,on,or,return,super,then,true,try,unless,until,when,while,yes",
hashComments:3,cStyleComments:!0,multilineStrings:!0,tripleQuotedStrings:!0,regexLiterals:!0}),["coffee"]);k(x([],[["str",/^[\S\s]+/]]),["regex"]);window.prettyPrintOne=function(a,m,e){var h=document.createElement("PRE");h.innerHTML=a;e&&D(h,e);E({g:m,i:e,h:h});return h.innerHTML};window.prettyPrint=function(a){function m(){for(var e=window.PR_SHOULD_USE_CONTINUATION?l.now()+250:Infinity;p<h.length&&l.now()<e;p++){var n=h[p],k=n.className;if(k.indexOf("prettyprint")>=0){var k=k.match(g),f,b;if(b=
!k){b=n;for(var o=void 0,c=b.firstChild;c;c=c.nextSibling)var i=c.nodeType,o=i===1?o?b:c:i===3?N.test(c.nodeValue)?b:o:o;b=(f=o===b?void 0:o)&&"CODE"===f.tagName}b&&(k=f.className.match(g));k&&(k=k[1]);b=!1;for(o=n.parentNode;o;o=o.parentNode)if((o.tagName==="pre"||o.tagName==="code"||o.tagName==="xmp")&&o.className&&o.className.indexOf("prettyprint")>=0){b=!0;break}b||((b=(b=n.className.match(/\blinenums\b(?::(\d+))?/))?b[1]&&b[1].length?+b[1]:!0:!1)&&D(n,b),d={g:k,h:n,i:b},E(d))}}p<h.length?setTimeout(m,
250):a&&a()}for(var e=[document.getElementsByTagName("pre"),document.getElementsByTagName("code"),document.getElementsByTagName("xmp")],h=[],k=0;k<e.length;++k)for(var t=0,s=e[k].length;t<s;++t)h.push(e[k][t]);var e=q,l=Date;l.now||(l={now:function(){return+new Date}});var p=0,d,g=/\blang(?:uage)?-([\w.]+)(?!\S)/;m()};window.PR={createSimpleLexer:x,registerLangHandler:k,sourceDecorator:u,PR_ATTRIB_NAME:"atn",PR_ATTRIB_VALUE:"atv",PR_COMMENT:"com",PR_DECLARATION:"dec",PR_KEYWORD:"kwd",PR_LITERAL:"lit",
PR_NOCODE:"nocode",PR_PLAIN:"pln",PR_PUNCTUATION:"pun",PR_SOURCE:"src",PR_STRING:"str",PR_TAG:"tag",PR_TYPE:"typ"}})();


 // Wait for PhoneGap to load
    //
    document.addEventListener("deviceready", onDeviceReady, false);

    // PhoneGap is ready
    //
    function onDeviceReady() {
      
    }


		function loadContacts(){
		
		 // search contacts, returning display name and phone numbers
				var options = new ContactFindOptions();
				options.filter="";
				options.multiple=true;  				
				filter = ["displayName","emails"];
				navigator.contacts.find(filter, onContactSuccess, onError, options);
					//setTimeout(stopLoader,60000);	
		}
		
		function inviteContacts(){
		
		 // search contacts, returning display name and phone numbers
				var options = new ContactFindOptions();
				options.filter="";
				options.multiple=true;  
				filter = ["displayName","emails"];
				navigator.contacts.find(filter, onContactSuccess2, onError, options);
					
		}
    
  function onContactSuccess(contacts) {
		
		
		

	
		var  data="";
		
	
		
        for (var i=0; i<contacts.length; i++) {
			
			
            // display phone numbers
			//showAlert("Contacts Discovered","Total Contacts discovered : "+contacts[i].phoneNumbers.length);
         //   for (var j=0; j<=contacts[i].phoneNumbers.length-1; j++) {
				
		try{
			email=contacts[i].emails[0].value;
			}
			catch(e){
			email="Not Available";
			}
			
			
			var name=contacts[i].displayName;
				//data=data+"<li data-corners='false' data-shadow='false' data-iconshadow='true' data-wrapperels='div' data-icon='arrow-r' data-iconpos='right' data-theme='c' class='ui-btn ui-btn-icon-right ui-li-has-arrow ui-li ui-btn-up-c'><p class='ui-li-aside ui-li-desc'><input type='checkbox' id='contact"+i+"' value='"+name+","+email+";'></p><div class='ui-btn-inner ui-li'><div class='ui-btn-text'><h3 class='ui-li-heading'>"+name+"</h3><br/><p style='font-size:11px'>"+email+"</p></div><span class='ui-icon ui-icon-arrow-r ui-icon-shadow'>&nbsp;</span></div></li>";
				if(i==0){
			data=data+"<li class='ui-li ui-li-static ui-body-c'><p class='ui-li-aside ui-li-desc'><input type='checkbox' id='contact"+i+"' value='"+email+"'></p><h3 class='ui-li-heading'><strong>"+name+"</strong></h3><p class='ui-li-desc'><strong>"+email+"</strong></p></li>";
				}
				else{
					data=data+"<li class='ui-li ui-li-static ui-body-c'><p class='ui-li-aside ui-li-desc'><input type='checkbox' id='contact"+i+"' value=',"+email+"'></p><h3 class='ui-li-heading'><strong>"+name+"</strong></h3><p class='ui-li-desc'><strong>"+email+"</strong></p></li>";
				}
			//jQuery("#conferencecontact").append("<li class='ui-li ui-li-static ui-body-c'><p class='ui-li-aside ui-li-desc'><input type='checkbox' id='contact"+i+"' value='"+name+","+email+";'  style='float:right'></p><h3 class='ui-li-heading'><strong>"+name+"</strong></h3><p class='ui-li-desc'><strong>"+email+"</strong></p></li>");
           	//jQuery("#conferencecontact").append("<tr><td><b style='float:left;'>Name:</b><i style='float:left;'>"+name+"</i><input type='checkbox' id='contact"+i+"' value='"+name+","+email+";'  style='float:right'><br/><b style='float:left;'>Email:</b><i style='float:left;'>"+email+"</i><br/></td></tr>");
				
	
			
			
          //  }
			
        }
		
			jQuery("#conferencecontact").html(data);
	jQuery("#addconferencecontacts").css("display","block");
	jQuery("#addconferencecontacts2").css("display","block");
	hideWaiting();
    };
	


    function onContactSuccess2(contacts) {
		
			
		var  data="";
		
		
		for (var i=0; i<contacts.length; i++) {
		   
		  
            // display phone numbers
			//showAlert("Contacts Discovered","Total Contacts discovered : "+contacts[i].phoneNumbers.length);
          //  for (var j=0; j<=contacts[i].phoneNumbers.length-1; j++) {
			try{
			email=contacts[i].emails[0].value;
			}
			catch(e){
			email="Not Available";
			}
			
			
			var name=contacts[i].displayName;
			//data=data+"<li data-corners='false' data-shadow='false' data-iconshadow='true' data-wrapperels='div' data-icon='arrow-r' data-iconpos='right' data-theme='c' class='ui-btn ui-btn-icon-right ui-li-has-arrow ui-li ui-btn-up-c'><p class='ui-li-aside ui-li-desc'><input type='checkbox' id='invite"+i+"' value='"+name+","+email+";'></p><div class='ui-btn-inner ui-li'><div class='ui-btn-text'><h3 class='ui-li-heading'>"+name+"</h3><br/><p style='font-size:11px'>"+email+"</p></div><span class='ui-icon ui-icon-arrow-r ui-icon-shadow'>&nbsp;</span></div></li>";
			if(i==0){
			data=data+"<li class='ui-li ui-li-static ui-body-c'><p class='ui-li-aside ui-li-desc'><input type='checkbox' id='invite"+i+"' value='"+email+"'></p><h3 class='ui-li-heading'><strong>"+name+"</strong></h3><p class='ui-li-desc'><strong>"+email+"</strong></p></li>";
			}
			else{
				
				data=data+"<li class='ui-li ui-li-static ui-body-c'><p class='ui-li-aside ui-li-desc'><input type='checkbox' id='invite"+i+"' value=',"+email+"'></p><h3 class='ui-li-heading'><strong>"+name+"</strong></h3><p class='ui-li-desc'><strong>"+email+"</strong></p></li>";
			}
				//	jQuery("#invitecontact").append("<li class='ui-li ui-li-static ui-body-c'><p class='ui-li-aside ui-li-desc'><input type='checkbox' id='invite"+i+"' value='"+name+","+email+";'  style='float:right'></p><h3 class='ui-li-heading'><strong>"+name+"</strong></h3><p class='ui-li-desc'><strong>"+email+"</strong></p></li>");
			//jQuery("#invitecontact").append("<tr><td><b style='float:left;'>Name:</b><i style='float:left;'>"+name+"</i><input type='checkbox' id='invite"+i+"' value='"+name+","+email+";'  style='float:right'><br/><b style='float:left;'>Email:</b><i style='float:left;'>"+email+"</i><br/></td></tr>");
           	
	
			
			
			
          //  }
			
        }
		
		jQuery("#contactdata").html(data);
		jQuery("#invitephonebookcontacts").css("display","block");
		jQuery("#invitephonebookcontacts2").css("display","block");
		hideWaiting();
	
    };


    // onRemoveError: Failed to get the contacts
    //
    function onError(contactError) {
		
       showAlert("Error",contactError.code);
		
    }


var webserviceurl="http://www.mobileconference.co/webservice/indexa.cfm?"

document.addEventListener("deviceready", isLoggedIn, false);
//document.addEventListener("deviceready",block,true);



function block(){
	
jQuery(document).ajaxStart(jQuery.blockUI({css:{ border: 'none', padding: '15px', backgroundColor: '#bc0606','-webkit-border-radius': '10px', '-moz-border-radius': '10px', opacity: .5, color: '#fff' }})).ajaxStop(jQuery.unblockUI);	
	
}

function showWaiting(){
	jQuery.blockUI(
				   {message:'<img src="spinner.gif" width="50px" height="50px" />',
				   css:{ border: 'none', padding: '15px', backgroundColor: '#bc0606','-webkit-border-radius': '10px', '-moz-border-radius': '10px', opacity: .5, color: '#fff'
				   }
				   }
				   );
	 
	
}


function takingTooLong(){
	
	
	hideWaiting();
	showAlert("Status","Possibly an error occured while attempting this transaction.Please try again"); 
}

function hideWaiting(){
	
	jQuery.unblockUI();
}

    // PhoneGap is ready
    //
    function isLoggedIn() {
		//showTimer();
		
		
		
		
		
		
		
		document.addEventListener('touchmove', function(e) { e.preventDefault(); }, false);
		document.addEventListener("offline", onOffline, false);
           if(window.localStorage["email"] != undefined && window.localStorage["pin"] != undefined) {
			   location.href="#mainmenu";
		   }
		   else{
			   
			    location.href="#loginform";
		   }
    }

function onOffline() {
	showAlert("Error","Your device may not be connected to the internet");
    }
	
 function showAlert(title,msg) {
        navigator.notification.alert(
            msg,  // message
            alertDismissed,         // callback
            title,            // title
            'OK'                  // buttonName
        );
    }
	
	
	
	
	// process the confirmation dialog result
function onConfirm(button) {
  
}

// Show a custom confirmation dialog
//
function showConfirm(title,msg,func) {
	try{
    navigator.notification.confirm(
        msg,  // message
        func,              // callback to invoke with index of button pressed
        title,            // title
        'Yes,No'          // buttonLabels
    );
	}
	catch(e){
		showAlert("Error","Invalid Method "+e);
	}
}


	function alertDismissed(){
		
		
	}
	
	
	

	
	function createListPage(object,type){
	var data="";
	
	for (var i = 0; i < object.data.length; i++) { 
	
	
	
		
	if(type=="listconference"){
		
		id=object.data[i].id;
		room=object.data[i].room;
		subject=object.data[i].confsubject;
		entrydate=object.data[i].entrydate;
		confdate=object.data[i].confdate;
		expirydate=object.data[i].expirydate;
		confmsisdn=object.data[i].confmsisdn;
		telephone=confmsisdn;
		
	data=data+"<li data-corners='false' data-shadow='false' data-iconshadow='true' data-wrapperels='div' data-icon='arrow-r' data-iconpos='right' data-theme='c' class='ui-btn ui-btn-icon-right ui-li-has-arrow ui-li ui-btn-up-c'><div class='ui-btn-inner ui-li'><div class='ui-btn-text'><a href='#' class='ui-link-inherit' onclick=viewConferenceDetails("+id+");>"+subject+"</h3><br/><p style='font-size:11px'>Conference Number:"+confmsisdn+"<br/>Conference Date:"+confdate+"<br/>Conference Room:"+room+"</p></a></div><span class='ui-icon ui-icon-arrow-r ui-icon-shadow'>&nbsp;</span></div></li>";
	

}

if(type=="conferencehistory"){
		
		confid=object.data[i].confid;
		subject=object.data[i].subject;
		confdate=object.data[i].confdate;
		msisdn=object.data[i].msisdn;
		duration=object.data[i].duration;
		recording=object.data[i].recording;
		transcript=object.data[i].transcript;
		startrecording=object.data[i].startrecording;
	
	data=data+"<li data-corners='false' data-shadow='false' data-iconshadow='true' data-wrapperels='div' data-icon='arrow-r' data-iconpos='right' data-theme='c' class='ui-btn ui-btn-icon-right ui-li-has-arrow ui-li ui-btn-up-c'><div class='ui-btn-inner ui-li'><div class='ui-btn-text'><a href='#' class='ui-link-inherit' onclick=viewHistory("+recording+","+confid+","+transcript+");>Call ID:"+confid+" ("+startrecording+")</h3><br/><p style='font-size:11px'>Conference Number:"+msisdn+"<br/>Recording Time:"+duration+" seconds<br/></p></a></div><span class='ui-icon ui-icon-arrow-r ui-icon-shadow'>&nbsp;</span></div></li>";
	



}


if(type=="transcription"){
		
		id=object.data[i].id;
		speaker=object.data[i].speaker;
		spoken_text=object.data[i].spoken_text;
		date=object.data[i].date;
	
//	data=data+"<li data-corners='false' data-shadow='false' data-iconshadow='true' data-wrapperels='div' data-icon='arrow-r' data-iconpos='right' data-theme='c' class='ui-btn ui-btn-icon-right ui-li-has-arrow ui-li ui-btn-up-c'><div class='ui-btn-inner ui-li'><div class='ui-btn-text'><a href='#' class='ui-link-inherit' onclick=viewHistory("+recording+");>"+startrecording+"</h3><br/><p style='font-size:11px'>Conference Number:"+msisdn+"<br/>Recording Time:"+duration+" seconds<br/></p></a></div><span class='ui-icon ui-icon-arrow-r ui-icon-shadow'>&nbsp;</span></div></li>";
	data=data+"<li data-corners='false' data-shadow='false' data-iconshadow='true' data-wrapperels='div' data-icon='arrow-r' data-iconpos='right' data-theme='d' class='ui-btn ui-btn-icon-right ui-li-has-arrow ui-li ui-btn-up-d'><div class='ui-btn-inner ui-li'><div class='ui-btn-text'><p class='ui-li-aside ui-li-desc'><strong>"+date+"</strong>sec</p><h3 class='ui-li-heading'>"+speaker+"</h3><p class='ui-li-desc'></p><p class='ui-li-desc'>"+spoken_text+"</p></div></div></li>";



}








   
	}



return data;

}
	

	
	
function doAJAX(type,url,cfunc)
{
	try{
	checkNetwork();
	
	}
	catch(e){
	}
	
if (window.XMLHttpRequest)
  {// code for IE7+, Firefox, Chrome, Opera, Safari
  xmlhttp=new XMLHttpRequest();
  }
else
  {// code for IE6, IE5
  xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
  }
xmlhttp.onreadystatechange=cfunc;



xmlhttp.open(type,url,true);
xmlhttp.send();

}

function doAJAXPost(type,url,data,cfunc)
{
checkNetwork();

if (window.XMLHttpRequest)
  {// code for IE7+, Firefox, Chrome, Opera, Safari
  xmlhttp=new XMLHttpRequest();
  }
else
  {// code for IE6, IE5
  xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
  }
xmlhttp.onreadystatechange=cfunc;

xmlhttp.open(type,url,true);
xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
xmlhttp.send(data);


}



function populateConferenceFields(){
		var email= window.localStorage.getItem("email");
		var number= window.localStorage.getItem("number");
		var pin= window.localStorage.getItem("pin");
		jQuery("#confnumber").val(number);
		jQuery("#confpin").val(pin);
		jQuery("#confsubject").val("");
		jQuery("#confcontacts").val("");
		jQuery("#confdate").val("");
		jQuery("#conftime").val("");
	
}


function login(){
	

	
									
var email=jQuery("#email").val();
var password=jQuery("#password").val();
var url=webserviceurl+"action=login&email="+email+"&password="+password;

if(email==""){

	showAlert("Status","Enter your email");
	
	jQuery("#email").focus();
	return false;
}
else if(password==""){
	
	showAlert("Status","Enter your password");

	jQuery("#password").focus();
	return;
}


	
showWaiting();
	  
	  try{
	doAJAX("GET",url,function() {


          if (xmlhttp.readyState==4 && xmlhttp.status==200)
    {
	
	var output=xmlhttp.responseText;
 	
		var response=	eval('(' + output + ')')
			
					if(response.status=="ok"){


	  	
		//showAlert("Status","Login Successful");
	window.localStorage["number"] = response.msisdn;
	 window.localStorage["email"] = email;
	  window.localStorage["password"] = password;  
     window.localStorage["pin"] = response.pin;  
	 window.localStorage["sid"] = response.sid;  
	 location.href="#mainmenu";
	 hideWaiting();
  }
  else{
	  
	  showAlert("Status","Invalid number/pin.Please try again");
  
 hideWaiting();
  

  }

 }
      });  


 }
 catch(e){
  showAlert("Status",e);
 
 }
	
}


function viewConferenceDetails(id){
		showWaiting();
			var number= window.localStorage.getItem("number");
		var pin= window.localStorage.getItem("pin");
		var email= window.localStorage.getItem("email");
		var password= window.localStorage.getItem("password");
		var url=webserviceurl+"action=getbookingdetails&id="+id+"&password="+password+"&email="+email+"&number="+number+"&pin="+pin;
		
		
		  try{
	doAJAX("GET",url,function() {


          if (xmlhttp.readyState==4 && xmlhttp.status==200)
    {
	
	var output=xmlhttp.responseText;
 	
		var response= eval('(' + output + ')')
			
					if(response.status=="ok"){


	  	
	location.href="#conferencedetailview";

	
		jQuery("#bookingsubject").html(response.data[0].confsubject);
		jQuery("#bookingmsisdn").html("<a href='tel:"+response.data[0].confnumber+"'>"+response.data[0].confmsisdn+"<img src='icons/contact.png' width='40px' height='40px'/></a>");
		jQuery("#bookingpin").html(response.data[0].adminpin);
		jQuery("#bookingdate").html(response.data[0].confdate);
		if(response.data[0].status=="1"){
		jQuery("#bookingstatus").html("<img src='icons/yes.png' width='20px' height='20px' />");
		}
		else{
			jQuery("#bookingstatus").html("<img src='icons/no.png' width='20px' height='20px' />");
		}
		
	 hideWaiting();
  }
  else{
	  hideWaiting();
	  showAlert("Status","Invalid number/pin.Please try again");
  

  

  }

 }
      });  

		  }
		  catch(e){
			  hideWaiting();
			   showAlert("Status",e);
		  }
		
		
		
		
		
		
	}
	
	
	function viewHistory(id,confid,transid){
	
		showWaiting();
		var number= window.localStorage.getItem("number");
		var pin= window.localStorage.getItem("pin");
		var email= window.localStorage.getItem("email");
		var password= window.localStorage.getItem("password");
		var url=webserviceurl+"action=gethistorydetails&id="+id+"&password="+password+"&email="+email+"&number="+number+"&pin="+pin;
		
		  try{
	doAJAX("GET",url,function() {


          if (xmlhttp.readyState==4 && xmlhttp.status==200)
    {
	
	var output=xmlhttp.responseText;
 	
		var response= eval('(' + output + ')')
			
					if(response.status=="ok"){


	  	
	location.href="#historydetailview";
	jQuery("#historymsisdn").html("<a href='tel:+"+response.data[0].dialnum+"'>"+response.data[0].msisdn+"<img src='icons/contact.png' width='40px' height='40px'/></a>");
	jQuery("#historypin").html(response.data[0].pin);
	jQuery("#historybegin").html(response.data[0].startrecording);
	jQuery("#historyend").html(response.data[0].stoprecording);
	
	if(response.data[0].transordered=="1"){
		jQuery("#transordered").html("<img src='icons/yes.png' width='20px' height='20px' />");
		jQuery("#transcriptordered").val(1);
		}
		else{
			jQuery("#transordered").html("<img src='icons/no.png' width='20px' height='20px' />");
			jQuery("#transcriptordered").val(0);
		}
		if(response.data[0].authenticated=="1"){
		jQuery("#authenticated").html("<img src='icons/yes.png' width='20px' height='20px' />");
		jQuery("#transcriptauthenticated").val(1);
		}
		else{
			jQuery("#authenticated").html("<img src='icons/no.png' width='20px' height='20px' />");
			jQuery("#transcriptauthenticated").val(0);
		}
//	jQuery("#transordered").html(response.data[0].transordered);
	//jQuery("#authenticated").html(response.data[0].authenticated);
	jQuery("#confid").val(confid);
	jQuery("#can_transcribe").val(response.data[0].can_transcribe);
	jQuery("#historyduration").html(response.data[0].duration+" Seconds");
	jQuery("#recordingurl").val(response.data[0].recording);
	jQuery("#transcriptid").val(transid);
	jQuery("#conferenceid").val(response.data[0].id);
		hideWaiting();
	 
  }
  else{
	  hideWaiting();
	  showAlert("Status","Invalid number/pin.Please try again");
  

  

  }

 }
      });  

		  }
		  catch(e){
			  hideWaiting();
			   showAlert("Status",e);
		  }
		
		
		
		
		
	}

function sendTranscript(){
	
			var auth=	jQuery("#transcriptauthenticated").val();
	
if(auth=="0"){
	showAlert("Status","Sorry, the mobile number linked to this a/c was not present on the call. <br/> For security and Data Protection purposes details of this call are unavailable.");
	return false;
}


	location.href="#sendtranscriptview";
	
}


function sendTranscriptRequest(){
	showWaiting();
			var id=jQuery("#conferenceid").val();
			var sendto=jQuery("#sendtoemail").val();
			var number= window.localStorage.getItem("number");
			var pin= window.localStorage.getItem("pin");
			var email= window.localStorage.getItem("email");
			var password= window.localStorage.getItem("password");
			var url=webserviceurl+"action=sendtranscription&id="+id+"&password="+password+"&email="+email+"&number="+number+"&pin="+pin+"&sendto="+sendto;
		
		  try{
	doAJAX("GET",url,function() {


          if (xmlhttp.readyState==4 && xmlhttp.status==200)
    {
	
	var output=xmlhttp.responseText;
 	
		var response= eval('(' + output + ')')
			
					if(response.status=="ok"){



		
			hideWaiting();
			  showAlert("Status","Transcript sent successfully.");
				location.href="#conferencehistory";
	 
  }
  else{
	  hideWaiting();
	  showAlert("Status","Conference transcription not available");
  location.href="#conferencehistory";

  

  }

 }
      });  

		  }
		  catch(e){
			  hideWaiting();
			   showAlert("Status",e);
			   location.href="#conferencehistory";
		  }
		  
		  
	
	
}




function getTranscript(){
				var auth=	jQuery("#transcriptauthenticated").val();
				var ordered=	jQuery("#transcriptordered").val();
				var transid=	jQuery("#transcriptid").val();
				var cantranscribe=	jQuery("#can_transcribe").val();
				var confid=	jQuery("#confid").val();
				
	
if(auth=="0"){
	showAlert("Status","Sorry, the mobile number linked to this a/c was not present on the call. <br/> For security and Data Protection purposes details of this call are unavailable.");
	return false;
}


if(transid=="0" && ordered=="1"){
	showAlert("Status","Your transcript is being produced, please check back shortly");
	return false;
}


if(transid=="0" && ordered=="0" && cantranscribe=="0"){
	showAlert("Status","Sorry, this call does not meet the basic criteria for transcription.");
	return false;
}







	showWaiting();
	var id=jQuery("#transcriptid").val();
			var number= window.localStorage.getItem("number");
		var pin= window.localStorage.getItem("pin");
		var email= window.localStorage.getItem("email");
		var password= window.localStorage.getItem("password");
		var url=webserviceurl+"action=gettranscription&id="+id+"&confid="+confid+"&password="+password+"&email="+email+"&number="+number+"&pin="+pin;
		
		  try{
	doAJAX("GET",url,function() {


          if (xmlhttp.readyState==4 && xmlhttp.status==200)
    {
	
	var output=xmlhttp.responseText;
 	
		var response= eval('(' + output + ')')
			
					if(response.status=="ok"){



		if(response.code=="1"){
			hideWaiting();
			  showAlert("Status","Sorry, the mobile number linked to this a/c was not present on the call. <br/> For security and Data Protection purposes details of this call are unavailable.");
			
		}
		if(response.code=="2"){
			hideWaiting();
			 showAlert("Status","Your transcript is being produced, please check back shortly.");
		}
		if(response.code=="3"){
			hideWaiting();
			 showAlert("Status","Sorry, this call does not meet the basic criteria for transcription.");
		}
		if(response.code=="4"){
			hideWaiting();
			 showConfirm("Status","This call can be transcribed from"+response.start+" to "+response.stop+" for time of ["+response.duration+" seconds].  Do you wish to order a transcription of this call?",orderTranscript);
		}
		
		if(response.code=="5"){
				location.href="#viewconferencetranscriptions";
				var listconferencepage=createListPage(response,"transcription");
				jQuery("#conferencetranscriptionview").html(listconferencepage);
			
			hideWaiting();
		}
	
	
	 
  }
  else{
	  hideWaiting();
	  showAlert("Status","Conference transcription not available");
  

  

  }

 }
      });  

		  }
		  catch(e){
			  hideWaiting();
			   showAlert("Status",e);
		  }
		  
		  
	
	
}


function orderTranscript(button){

	
	if(button=="1"){
	var id=jQuery("#confid").val();
	 transcribe(id);
	}
	
	
}


function transcribe(id){
	showWaiting();
	
	var url=webserviceurl+"action=transcribe&id="+id;
	
  try{
	doAJAX("GET",url,function() {


          if (xmlhttp.readyState==4 && xmlhttp.status==200)
    {
	
	var output=xmlhttp.responseText;
 	
		var response=	eval('(' + output + ')')
			
					if(response.status=="OK"){
hideWaiting();
showAlert("Status","Your transcript is being produced, please check back shortly");

	  	
	 
  }
  else{
	 
hideWaiting();
showAlert("Status","Your transcript request failed. Please try again shortly");
  }

 }
      });  


 }
 catch(e){
	 hideWaiting();
showAlert("Status",e);
 
 }


}

function downloadFile(){
		var auth=	jQuery("#transcriptauthenticated").val();
	
if(auth=="0"){
	showAlert("Status","Sorry, the mobile number linked to this a/c was not present on the call. <br/> For security and Data Protection purposes details of this call are unavailable.");
	return false;
}

	var srcurl=	jQuery("#recordingurl").val();
	var d = new Date();
	var filePath=d.getUTCMilliseconds()+".mp3";
	
	
	
	
	window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function(fileSystem) {
            fileSystem.root.getFile(localFileName, {create: true, exclusive: false}, function(fileEntry) {
             
               
						try{
						var fileTransfer = new FileTransfer();
						showWaiting();
						fileTransfer.download(srcurl,filePath,
						function(entry) {
							hideWaiting();
						showAlert("Status","File "+filePath+" download completed.");
						},
						function(error) {
							hideWaiting();
						showAlert("Status","Download Failed.");
						}
						);
						}
						catch(e){
							hideWaiting();
						showAlert("Status","Device may not support file downloads.");
						}
            }, fail);
        }, fail);
	
	
	
	
}


	function loadPlayer(){
	var auth=	jQuery("#transcriptauthenticated").val();
	var transcriptordered=	jQuery("#transcriptauthenticated").val();
	var transcriptid=jQuery("#transcriptid").val();
if(auth=="0"){
	showAlert("Status","Sorry, the mobile number linked to this a/c was not present on the call. <br/> For security and Data Protection purposes details of this call are unavailable.");
	return false;
}

/**
if(transcriptordered=="1"){
	showAlert("Status","Your transcript is being produced, please check back shortly");
	return false;
}
**/

location.href="#recordingview";

		
	}


function goHome(){
	 isLoggedIn();
	
}


function loadProfile(){
	
		 showWaiting();	
		var number= window.localStorage.getItem("number");
		var pin= window.localStorage.getItem("pin");
		var email= window.localStorage.getItem("email");

		jQuery("#updatenumber").val(number);
		jQuery("#updateemail").val(email);
		jQuery("#updatepin").val(pin);
		 hideWaiting();
	
}


function stopLoader(){
	// showAlert("Status","Loading Details Failed");
	
}

function showConferenceContacts(){
		 showWaiting();
	location.href="#conferencecontacts";
		
	setTimeout(loadContacts,1000);
		
	
}


function inviteFriends(){

	location.href="#invitefriendsmenu";
	
	

}


function updateProfile(){
	
			showWaiting();
		var email = jQuery("#updateemail").val();
		var pin = jQuery("#updatepin").val();
	var password = jQuery("#updatepassword").val();
		var number = jQuery("#updatenumber").val();
		//&code="+code+"&divert="+divert+"
		window.localStorage["pin"] = pin;
	var url=webserviceurl+"action=updateprofile&password="+password+"&number="+number+"&pin="+pin+"&email="+email;
	
	
	  
	  try{
	doAJAX("GET",url,function() {

          if (xmlhttp.readyState==4 && xmlhttp.status==200)
    {
	
	var output=xmlhttp.responseText;
 	
	var response=eval('(' + output + ')')
			
					if(response.status=="ok"){
	  	
 		location.href="#mainmenu";
		hideWaiting();
	  showAlert("Status","Profile Saved Successfully");

	
		
	
	  
  }
  else{
	  hideWaiting();
	   showAlert("Status","Loading Details Failed");



  }

 }
      });  


 }
 catch(e){
	 hideWaiting();
 showAlert("Status",e);
 	
 }
	
	
}



function register(){
	

	
									
var email=jQuery("#regemail").val();
var pin=jQuery("#regpin").val();
var code=jQuery("#regcode").val();
var divert=jQuery("#regdivert").val();

if(email==""){
	alert("Enter your email");
	jQuery("#regemail").focus();
	return;
}
if(pin==""){
	alert("Enter your pin");
	jQuery("#regpin").focus();
	return;
}
if(code==""){
	alert("Enter your secret code");
	jQuery("#regcode").focus();
	return;
}
if(divert==""){
	alert("Enter your divert number");
	jQuery("#regdivert").focus();
	return;
}

var url=webserviceurl+"action=signup&email="+email+"&pin="+pin+"&code="+code+"&divert="+divert;


			
	

  
	  try{
	  doAJAX("GET",url,function() {

          if (xmlhttp.readyState==4 && xmlhttp.status==200)
    {
	
	var output=xmlhttp.responseText;
 	


	var response=eval('(' + output + ')')
			
					if(response.status=="ok"){
	  	

	 showAlert("Status","Registration Successful "+response.message);
	 location.href="#loginform";
  }
  else{
	   showAlert("Status","Invalid number/pin.Please try again");

 
  location.href="#registrationform";
  }

 }
      });  


 }
 catch(e){
 showAlert("Status",e);
 
 }
	
	
	
	
}

		


function logout(){
	
	 window.localStorage.removeItem("number");
	 window.localStorage.removeItem("pin");
	 window.localStorage.removeItem("sid");
	 location.href="#loginform";
}



function createConference(){

var contacts="";

	 jQuery("#conferencecontact input[type=checkbox]").each(function() {
	var boxid=this.id;
	
if(jQuery("#"+boxid).attr("checked")){
contacts = contacts+","+ this.value;

}


													});
	
	jQuery("#confcontacts").html(contacts);
	
var number = window.localStorage.getItem("number");
var pin= window.localStorage.getItem("pin");
var id=	window.localStorage.getItem("sid");
var confdate=jQuery("#confdate").val()+" "+jQuery("#conftime").val();
//var expirydate=jQuery("#expirydate").val();
	
var subject=jQuery("#confsubject").val();
contacts=jQuery("#confcontacts").val();
	var email= window.localStorage.getItem("email");

var url=webserviceurl+"action=createconference&pin="+pin+"&inviteremail="+email+"&number="+number+"&id="+id+"&confdate="+confdate+"&contacts="+contacts+"&subject="+subject;

var conferencedate=new Date(confdate);
var now= new Date();
var conferencetime=jQuery("#conftime").val();


if(subject==""){
	
	jQuery("#confsubject").focus();
	showAlert("Status","Please enter a name for the conference.");
	return false;
}

if(conferencetime==""){
	
	jQuery("#conftime").focus();
	showAlert("Status","Please pick a time for the conference.");
	return false;
}



if(conferencedate<=now){
	jQuery("#confdate").focus();
		showAlert("Status","You cannot set a conference in the past.");
	
	return false;
}

if(conferencedate==""){
	jQuery("#confdate").focus();
	showAlert("Status","Please enter a conference date.");
	return false;
}

if(contacts==""){
	
	jQuery("#confcontacts").focus();
	showAlert("Status","You have not added any conference participants.");
	return false;
}

			
		showWaiting();

	  try{
	  doAJAX("GET",url,function() {

          if (xmlhttp.readyState==4 && xmlhttp.status==200)
    {
	
	var output=xmlhttp.responseText;
 	


	var response=eval('(' + output + ')')
			
					if(response.status=="ok"){
	  			hideWaiting();

 showAlert("Status","Conference Created Successfully");
	 location.href="#myconference";
  }
  else{
	  	hideWaiting();
	   showAlert("Status","Unable to setup conference at the moment");
		
 location.href="#myconference";

  }

 }
      });  


 }
 catch(e){
	 	hideWaiting();
 showAlert("Status",e);
	
	location.href="#myconference";
 }
	
	
	
}



function loadActiveConference(){
	showWaiting();	
 var number = window.localStorage.getItem("number");
 var pin= window.localStorage.getItem("pin");
 var password= window.localStorage.getItem("password");	
	
	
	
var url=webserviceurl+"action=listconference&password="+password+"&pin="+pin+"&number="+number;


			
	

  
	  try{
		  
	  doAJAX("GET",url,function() {

          if (xmlhttp.readyState==4 && xmlhttp.status==200)
    {
	
	var output=xmlhttp.responseText;
 	


	var response=eval('(' + output + ')')
			
					if(response.status=="ok"){
						var listconferencepage=createListPage(response,"listconference");
						
						jQuery("#activeconferenceview").html(listconferencepage);
	 hideWaiting();	


	
  }
  else{
	  
	  location.href="#myconference";
	   hideWaiting();	
	   showAlert("Status","Unable to load active conferences at the moment");

 
  
	
  }

 }
      });  


 }
 catch(e){
	  hideWaiting();
 showAlert("Status",e);
	
 }
		
	
}


function loadConferenceHistory(){
	
	
		showWaiting();	
 var number = window.localStorage.getItem("number");
 var pin= window.localStorage.getItem("pin");
	 var password= window.localStorage.getItem("password");
	
	
	
var url=webserviceurl+"action=conferencehistory&password="+password+"&pin="+pin+"&number="+number;


	
	

  
	  try{
	  doAJAX("GET",url,function() {

          if (xmlhttp.readyState==4 && xmlhttp.status==200)
    {
	
	var output=xmlhttp.responseText;
 	


	var response=eval('(' + output + ')')
			
					if(response.status=="ok"){
						var listconferencepage=createListPage(response,"conferencehistory");
						jQuery("#conferencehistoryview").html(listconferencepage);
	  	hideWaiting();	


	 //location.href="#loginform";
  }
  else{
	   showAlert("Status","Unable to load history at this moment");
hideWaiting();	
 
 
  }

 }
      });  


 }
 catch(e){
 showAlert("Status",e);
 setTimeout(stopLoader,60000);	
 }
	
	
	
	
}





function loadConferenceTranscriptions(){
	
	
		showWaiting();	
 var number = window.localStorage.getItem("number");
 var pin= window.localStorage.getItem("pin");
	 var password= window.localStorage.getItem("password");
	
	
	
var url=webserviceurl+"action=conferencehistory&password="+password+"&pin="+pin+"&number="+number;


	
	

  
	  try{
	  doAJAX("GET",url,function() {

          if (xmlhttp.readyState==4 && xmlhttp.status==200)
    {
	
	var output=xmlhttp.responseText;
 	


	var response=eval('(' + output + ')')
			
					if(response.status=="ok"){
						var listconferencepage=createListPage(response,"conferencehistory");
						jQuery("#conferencetranscriptionview").html(listconferencepage);
	  	hideWaiting();		


	 //location.href="#loginform";
  }
  else{
	  hideWaiting();	
	   showAlert("Status","Unable to load history at this moment");
	
 
 
  }

 }
      });  


 }
 catch(e){
	  hideWaiting();
 showAlert("Status",e);

	
 }
	
	
	
	
}



function requestTranscription(id){
//jQuery(function(){
	var url="ajax/index.cfm?action=requesttranscription&id="+id;
	  try{
	doAJAX("GET",url,function() {


          if (xmlhttp.readyState==4 && xmlhttp.status==200)
    {
	
	var output=xmlhttp.responseText;
 	
		var response=	eval('(' + output + ')')
			
					if(response.status=="OK"){
					
					
					if(response.code=="1"){
						jQuery("#notification").html("");
					jQuery("#notification").html("Sorry, the mobile number linked to this a/c was not present on the call. <br/> For security and Data Protection purposes details of this call are unavailable.");
					jQuery("#notification").dialog({ modal: true, resizable: false, 
draggable: false});
jQuery("#notification").dialog("open");

					}
					
					if(response.code=="2"){
						jQuery("#notification").html("");
					jQuery("#notification").html("Your transcript is being produced, please check back shortly");
					jQuery("#notification").dialog({ modal: true, resizable: false, 
draggable: false});
jQuery("#notification").dialog("open");

					}
					
					if(response.code=="3"){
						jQuery("#notification").html("");
					jQuery("#notification").html("Sorry, this call does not meet the basic criteria for transcription.");
					jQuery("#notification").dialog({ modal: true, resizable: false, 
draggable: false});
jQuery("#notification").dialog("open");

					}
	  	
					 
					 if(response.code=="4"){
						 jQuery("#notification").html("");
				jQuery("#notification").html("This call can be transcribed from"+response.start+" to "+response.stop+" for time of ["+response.duration+" seconds].  Do you wish to order a transcription of this call?<br/><p style='margin-left:70px;margin-top:10px;'><input type='button' onClick='transcribe('"+id+"');' value='Yes' style='font-weight:bold; width:50px;'><input type='button' onClick='closeDialog();' value='No' style='font-weight:bold; width:50px;'></p>");
				jQuery("#notification").dialog({ modal: true, resizable: false, 
draggable: false});
jQuery("#notification").dialog("open");
	
					 }

 if(response.code=="5"){

location.href="requesttranscription.cfm?id="+response.id;

}


  }
  else{
	 

  
jQuery("#notification").html("Your request failed. Please try again shortly");
jQuery("#notification").dialog({ modal: true, resizable: false, 
draggable: false});
jQuery("#notification").dialog("open");
  }

 }
      });  


 }
 catch(e){
 jQuery("#notification").html("Error "+e);
jQuery("#notification").dialog({ modal: true, resizable: false, 
draggable: false});
jQuery("#notification").dialog("open");
 
 }
	
	// });  

	
}





function invitePhoneBookContacts(){
	showWaiting();
	var info =jQuery("#inviteemail").val();


 var number = window.localStorage.getItem("number");
 var pin= window.localStorage.getItem("pin");
	
	
	if(info==""){
		
		showAlert("Status","Please enter a contact to invite");	
		return false;
		
	}
	
	
var url=webserviceurl+"action=invitecontacts&pin="+pin+"&number="+number+"&email=noemail&contacts="+info;

	
	

  
	  try{
	  doAJAX("GET",url,function() {

          if (xmlhttp.readyState==4 && xmlhttp.status==200)
    {
	
	var output=xmlhttp.responseText;
 	


	var response=eval('(' + output + ')')
			
					if(response.status=="ok"){
						hideWaiting();
					showAlert("Status","Successfully sent invitation");	
	  	

	 //location.href="#loginform";
  }
  else{
	  hideWaiting();
	   showAlert("Status","Unable to invite contacts");

 
 
  }

 }
      });  


 }
 catch(e){
 hideWaiting();
 showAlert("Status",e);

 }
	
													
													}

function addConferenceContacts(){
	var i=0;
	var info ="";
 $("#conferencecontact input[type=checkbox]").each(function() {
													
var boxid=this.id;
if(jQuery("#"+boxid).attr("checked")){

		info = info+""+ this.value;
	
}

i++;
});
 
 jQuery("#confcontacts").html(info);


  
 location.href="#createconference";
 
													
													}
													
													
function showTimer(){
	try{
var devicePlatform = device.platform;
	}
	catch(e){
		var devicePlatform="";
	}
	
	

var mytheme='sense-ui';
if(devicePlatform=="Android"){
	var mytheme='android';
}

if(devicePlatform=="BlackBerry"){
	
	var mytheme='sense-ui';
}


if(devicePlatform=="iPhone"){
	
	var mytheme='ios';
}





var now = new Date();

    jQuery('#confdate').scroller({
      preset: 'datetime', 
		  
        minDate: new Date(now.getFullYear(), now.getMonth(), now.getDate()),
        theme: mytheme,
		
        display: 'modal',
        mode: 'scroller'
    });
	
	/**
	
	jQuery('#expirydate').scroller({
        preset: 'datetime',
        minDate: new Date(now.getFullYear(), now.getMonth(), now.getDate()),
        theme: mytheme,
        display: 'modal',
        mode: 'scroller'
    });
	*/
}
		
		
		
		function loadSettings(){
			
			
			
		}
		

jQuery(function(){


jQuery("#setupconference").click(function(){
						createConference();						  
												  
												  });

/**
jQuery("#invitephonebookcontacts").click(function(){
						invitePhoneBookContacts();						  
												  
												  });


jQuery("#addconferencecontacts").click(function(){
						addConferenceContacts();						  
												  
												  });

*/

jQuery("#login").click(function(){

login();

});

jQuery("#updatesave").click(function(){
updateProfile();
});

jQuery("#register").click(function(){

register();

});




jQuery("#invite").click(function(){

login();

});

jQuery("#signup").click(function(){
								 
showAlert("Signup","No LOGIN?  Send SMS to UK: 07924 77 0000 (standard carrier rates apply) - insert your email address and we'll email you a FREE user PIN and set up your a/c immediately. For details, T&C visit www.mobileconference.co");

});


});

function ResizePageContentHeight(page) {
	var $page = $(page),
		$content = $page.children( ".ui-content" ),
		hh = $page.children( ".ui-header" ).outerHeight() || 0,
		fh = $page.children( ".ui-footer" ).outerHeight() || 0,
		pt = parseFloat($content.css( "padding-top" )),
		pb = parseFloat($content.css( "padding-bottom" )),
		wh = window.innerHeight;
		
	$content.height(wh - (hh + fh) - (pt + pb));
}

$( ":jqmData(role='page')" ).live( "pageshow", function(event) {
	var $page = $( this );

	// For the demos that use this script, we want the content area of each
	// page to be scrollable in the 'y' direction.

	$page.find( ".ui-content" ).attr( "data-" + $.mobile.ns + "scroll", "y" );

	// This code that looks for [data-scroll] will eventually be folded
	// into the jqm page processing code when scrollview support is "official"
	// instead of "experimental".

	$page.find( ":jqmData(scroll):not(.ui-scrollview-clip)" ).each(function () {
		var $this = $( this );
		// XXX: Remove this check for ui-scrolllistview once we've
		//      integrated list divider support into the main scrollview class.
		if ( $this.hasClass( "ui-scrolllistview" ) ) {
			$this.scrolllistview();
		} else {
			var st = $this.jqmData( "scroll" ) + "",
				paging = st && st.search(/^[xy]p$/) != -1,
				dir = st && st.search(/^[xy]/) != -1 ? st.charAt(0) : null,

				opts = {
					direction: dir || undefined,
					paging: paging || undefined,
					scrollMethod: $this.jqmData("scroll-method") || undefined
				};

			$this.scrollview( opts );
		}
	});

	// For the demos, we want to make sure the page being shown has a content
	// area that is sized to fit completely within the viewport. This should
	// also handle the case where pages are loaded dynamically.

	ResizePageContentHeight( event.target );
});

$( window ).bind( "orientationchange", function( event ) {
	ResizePageContentHeight( $( ".ui-page" ) );
});
