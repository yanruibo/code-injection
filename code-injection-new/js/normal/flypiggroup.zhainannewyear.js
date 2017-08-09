





$(document).ready(function(){
        $("#scrollDiv").textSlider({line:1,speed:500,timer:3000});
});









            var jQT = $.jQTouch({
                icon: 'icon.png',
                startupScreen: 'startup.png'
            });
            


// init db 

	persistence.store.websql.config(persistence, 'babydariy',
                                'babydariy made by flypiggroup', 5 * 1024 * 1024);
	
	
	var Node = persistence.define('Node', {
  title: "TEXT",
  content: "TEXT",
  status: "BOOL",
  has_vidoe:"BOOL",
  has_radio:"BOOL",
  has_pic:"BOOL",
  ts_date:"date"
});


var Profile = persistence.define('Profile', {
  profile_key: "TEXT",
  profile_value: "TEXT"
});

Node.hasMany('profile', Profile, 'node');
//Profile.hasMany('node', Node, 'profile');


persistence.schemaSync();



function reload_list()
{
 
 //var allNode = Node.all().prefetch("profile").limit(10);


//var n=new Node;
//var allNode = Node.all();
   
  // console.log($.dump(allNode));
 
//var all = Node.all().prefetch("profile").limit(10);
 //var all = Profile.all().prefetch("node").limit(10);
 //var all=Profile.all();
 
 var all=Node.all();
 all.list(null,function(results) {  
 //Node.all().list(null,function(results) {  //ok
 	results.forEach(function (r) {

/*
html=r.title+r.content;
 $('#view_list').append(html);
  */
  var row=$('#view_list_tpl').clone();
  row.removeAttr('id');
  row.removeAttr('style');
  row.addClass('entry');
  row.attr('id',r.id);
  
  // base data
  
  row.find('.k_title').text(r.title);
  row.find('.date').text(show_time(r.ts_date,1));
//  row.find('.content').text(r.content);
  
  
  //row.appendTo('#home ul');
row.insertAfter('#view_list_tpl');
//row.before('#view_list_tpl');

//$('#view_list_tpl').after(row.text());
    	   })
 	
 	});
 
	
}

 var node=new Node();                               
 
function save()
	{
	//	alert('ss');
	 	var title=$('#title').val();
	 	var content=$('#content').val();
	
	 	node.title=title;
	 	node.content=content;
	 	var date=new Date();
	 	node.ts_date=date.getTime();
	 	
	 	/*
	 	 var profile=new Profile();
	  profile.profile_key='movie-1';
	  profile.profile_value='movie-path';
	  
	  
	  node.profile.add(profile);
	  
	  	var profile1=new Profile();
	   profile1.profile_key='movie-2';
	  profile1.profile_value='movie-path-2';
	  node.profile.add(profile1);
	  */
	  
	  
	  persistence.add(node);
	  
	  persistence.flush();
	  
	  reload_list();
	 	jQT.goBack();
	 	
	 	return false;
	}
	
function profile_save(type,data)
{
 	var date=new Date();
	var ts=date.getTime();
	var profile=new Profile();
	//profile.profile_key='pic-'+ts;
	
	//profile.profile_value='video/fireworks.jpg';
	profile.profile_key=type+'-'+ts;
	profile.profile_value=data;
	node.profile.add(profile);
	node.has_pic=true;
	 	
}



function show_time(time,all){
var date = new Date(); //���ڶ���
var now = "";
 date.setTime(time);
now = date.getFullYear()+"-"; //��Ӣ�ľ�����
now = now + (date.getMonth()+1)+"-";//ȡ�µ�ʱ��ȡ���ǵ�ǰ��-1�����ȡ��ǰ��+1�Ϳ�����
now = now + date.getDate()+" ";

if(all)return now;
now = now + date.getHours()+":";
now = now + date.getMinutes()+":";
now = now + date.getSeconds()+"";
return now;
//document.getElementById("nowDiv").innerHTML = now; //div��html��now����ַ���
//setTimeout("show()",1000); //���ù�1000�������1�룬����show����
}

function show(id)
{
	//get id  bind data
	//var n=Profile.all().prefetch('node').filter('node_id','=',id).limit(1);
	
	//alert(id);

/*
  if($('#view').length<=0)
  {
    	$.get('k_view.html',function(data){
    		//alert(data);
    		$('#home').after(data);
    		} )
  }
*/
	
	var n=Node.all().filter('id','=',id).limit(1);
	n.list(null,function(results){
		
		//alert($.dump(results));
		results.forEach(function(r){
			//alert(r.title);
		
		/*	
			var d = new Date()
d.setTime(r.ts_date)
r.ts_date=d.toLocaleDateString();
*/

			$('#view .title').text(r.title);
			$('#view .date').text(show_time(r.ts_date));
			$('#view .content').text(r.content);
			})
		})
		
		
 	$('#view .profile').html('');		
  //get profile
  var p=Profile.all().filter('node','=',id);
  var tmpdata='';
  var tmp='';
	p.list(null,function(results){

		//alert($.dump(results));
		results.forEach(function(r){
			
			tmpdata=r.profile_key.split("-");
			//alert(tmpdata[0]);
			if(tmpdata[0]=='pic')
			{
				//tmp+="<img src='"+r.profile_value+"'>";
			  $('#view .profile').append("<img width='100%' height='100%' src='"+r.profile_value+"'>");
			}
			else if(tmpdata[0]=='video')
			{
				//tmp+="<video src='"+r.profile_value+"'>";
			  // $('#view .profile').append("<video src='"+r.profile_value+"'>");
				$('#view .profile').append(gen_player('vidoe',r.profile_value));
			}
			else if(tmpdata[0]=='audio')
			{
				//tmp+="<audio src='"+r.profile_value+"'>";
			  //$('#view .profile').append("<audio src='"+r.profile_value+"'>");
			  // 
			   //$('#view .profile').append("<a href='#' class='btn large' onclick=\"playAudio('" +r.profile_value+ "')\">play audio</a>");
				$('#view .profile').append(gen_player('audio',r.profile_value));
			}
			
			 //tmp+=r.profile_key+r.profile_value;
			//$('#view .profile').append(r.profile_key);
			//$('#view .profile').append(r.profile_value);
			
			})
		})
		
		//alert(tmp);
		//$('#view .profile').append(tmp);		
	 
	 
   jQT.goTo('#view','slideleft');	
   return false;
}


function show_old(id)
{
	//get id  bind data
	//var n=Profile.all().prefetch('node').filter('node_id','=',id).limit(1);
	
	//alert(id);
	
	var n=Node.all().filter('id','=',id).limit(1);
	n.list(null,function(results){
		
		//alert($.dump(results));
		results.forEach(function(r){
			//alert(r.title);
			$('#view .title').text(r.title);
			$('#view .date').text(r.ts_date);
			$('#view .content').text(r.content);
			})
		})
		
		
 	$('#view .profile').html('');		
  //get profile
  var p=Profile.all().filter('node','=',id);
  var tmpdata='';
  var tmp='';
	p.list(null,function(results){

		//alert($.dump(results));
		results.forEach(function(r){
			
			tmpdata=r.profile_key.split("-");
			//alert(tmpdata[0]);
			if(tmpdata[0]=='pic')
			{
				//tmp+="<img src='"+r.profile_value+"'>";
			  $('#view .profile').append("<img width='100%' height='100%' src='"+r.profile_value+"'>");
			}
			else if(tmpdata[0]=='video')
			{
				//tmp+="<video src='"+r.profile_value+"'>";
			  // $('#view .profile').append("<video src='"+r.profile_value+"'>");
				$('#view .profile').append(gen_player('vidoe',r.profile_value));
			}
			else if(tmpdata[0]=='audio')
			{
				//tmp+="<audio src='"+r.profile_value+"'>";
			  //$('#view .profile').append("<audio src='"+r.profile_value+"'>");
			  // 
			   //$('#view .profile').append("<a href='#' class='btn large' onclick=\"playAudio('" +r.profile_value+ "')\">play audio</a>");
				$('#view .profile').append(gen_player('audio',r.profile_value));
			}
			
			 //tmp+=r.profile_key+r.profile_value;
			$('#view .profile').append(r.profile_key);
			$('#view .profile').append(r.profile_value);
			
			})
		})
		
		//alert(tmp);
		//$('#view .profile').append(tmp);		
	 
	 
   jQT.goTo('#view','slideleft');	
   return false;
}

function gen_player(type,src)
{
  if(type=='vidoe')
  {
	  ret="<a href='#' class='btn large' onclick=\"playVideo('" +src+ "')\">play  video</a>";
}
  else if(type=='audio')
	  {
	  ret="<a href='#' class='btn large' onclick=\"playAudio('" +src+ "')\">play audio</a>";
	  
	  }
	  
  return ret;
}

function save_pic(){
	
	 navigator.camera.getPicture(dump_pic, fail, {
        quality : 50,destinationType: Camera.DestinationType.FILE_URI 
    });
    

	
	}


function save_audio(){
	// start audio capture
navigator.device.capture.captureAudio(captureAudioSuccess, captureError, {limit:1});


	}

function save_video(){
	  navigator.device.capture.captureVideo(captureSuccess, captureError, {limit:1});
	//return profile_save('video','video/fireworks-iPhone.m4v');
	}


function dump_pic(data) {
	
	 return profile_save('pic',data);
	 /*
    var viewport = document.getElementById('viewport');
    console.log(data);
    viewport.style.display = "";
    viewport.style.position = "absolute";
    viewport.style.top = "10px";
    viewport.style.left = "10px";
   // document.getElementById("test_img").src = "data:image/jpeg;base64," + data;
    document.getElementById("test_img").src =  data;
   // alert(data);
   */
}

function fail(msg) {
    alert(msg);
}


// onSuccess Callback 
// 
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
	//  alert(src);
	 src=str_replace('/sdcard','', src);
	// alert(src);
	 
            my_media = new Media(src, onSuccess, onError);

            // Play audio
            my_media.play();

            // Update my_media position every second
            /*
            if (mediaTimer == null) {
                mediaTimer = setInterval(function() {
                    // get my_media position
                    my_media.getCurrentPosition(
                        // success callback
                        function(position) {
                            if (position > -1) {
                                setAudioPosition((position/1000) + " sec");
                            }
                        },
                        // error callback
                        function(e) {
                            console.log("Error getting pos=" + e);
                            setAudioPosition("Error: " + e);
                        }
                    );
                }, 1000);
            }
             */
            
        }
       
            
  function playVideo(src) {
 
src=str_replace('/sdcard','', src);
window.plugins.Kplugins.play(src);

  }
 
      

 // capture callback
    var captureSuccess = function(mediaFiles) {
        var i, path, len;
        for (i = 0, len = mediaFiles.length; i < len; i += 1) {
            path = mediaFiles[i].fullPath;
            //alert(mediaFiles[i].type);
            // do something interesting with the file
        }
        return profile_save('video',path);
        
        /*
        var viewport = document.getElementById('viewport');
        viewport.style.display = "";
      
        viewport.style.top = "100px";
        viewport.style.left = "100px";
       document.getElementById("movie").src = path;
        document.getElementById("movie").src ='file://'+  path;
     
        alert(path);
      */
      //return path;
        //Phonegap.exec(path) 
    };

    // capture error callback
    var captureError = function(error) {
        navigator.notification.alert('Error code: ' + error.code, null, 'Capture Error');
    };


// capture callback
var captureAudioSuccess = function(mediaFiles) {
    var i, path, len;
    for (i = 0, len = mediaFiles.length; i < len; i += 1) {
        path = mediaFiles[i].fullPath;
        // do something interesting with the file
    }
    
    	return profile_save('audio',path);
};



function str_replace (search, replace, subject, count) {
    // Replaces all occurrences of search in haystack with replace  
    // 
    // version: 1109.2015
    // discuss at: http://phpjs.org/functions/str_replace
    // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +   improved by: Gabriel Paderni
    // +   improved by: Philip Peterson
    // +   improved by: Simon Willison (http://simonwillison.net)
    // +    revised by: Jonas Raoni Soares Silva (http://www.jsfromhell.com)
    // +   bugfixed by: Anton Ongson
    // +      input by: Onno Marsman
    // +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +    tweaked by: Onno Marsman
    // +      input by: Brett Zamir (http://brett-zamir.me)
    // +   bugfixed by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +   input by: Oleg Eremeev
    // +   improved by: Brett Zamir (http://brett-zamir.me)
    // +   bugfixed by: Oleg Eremeev
    // %          note 1: The count parameter must be passed as a string in order
    // %          note 1:  to find a global variable in which the result will be given
    // *     example 1: str_replace(' ', '.', 'Kevin van Zonneveld');
    // *     returns 1: 'Kevin.van.Zonneveld'
    // *     example 2: str_replace(['{name}', 'l'], ['hello', 'm'], '{name}, lars');
    // *     returns 2: 'hemmo, mars'
    var i = 0,
        j = 0,
        temp = '',
        repl = '',
        sl = 0,
        fl = 0,
        f = [].concat(search),
        r = [].concat(replace),
        s = subject,
        ra = Object.prototype.toString.call(r) === '[object Array]',
        sa = Object.prototype.toString.call(s) === '[object Array]';
    s = [].concat(s);
    if (count) {
        this.window[count] = 0;
    }
 
    for (i = 0, sl = s.length; i < sl; i++) {
        if (s[i] === '') {
            continue;
        }
        for (j = 0, fl = f.length; j < fl; j++) {
            temp = s[i] + '';
            repl = ra ? (r[j] !== undefined ? r[j] : '') : r[0];
            s[i] = (temp).split(f[j]).join(repl);
            if (count && s[i] !== temp) {
                this.window[count] += (temp.length - s[i].length) / f[j].length;
            }
        }
    }
    return sa ? s : s[0];
}




$(document).ready(function(){
	
	//$('#new form').submit(save);
	
		$('#post_save').live('click',
		function(){save();}
		);
		
	/*
	$('#save_pic').click(save_pic);
	$('#save_audio').click(save_audio);
	$('#save_video').click(save_video);
	*/
		$('#save_pic').live('click',
				function(){save_pic();}
				);	
		$('#save_audio').live('click',
				function(){save_audio();}
				);	
		$('#save_video').live('click',
				function(){save_video();}
				);	
		
		
		$('.entry').live('click',function(){id=this.id;show(id);});
  reload_list();
  
	})
	
	
	
	






    $(document).ready(function(){
        $("#news").Scroll({line:1,speed:500,timer:3000});
    });





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
   // document.getElementById("test_img").src = "data:image/jpeg;base64," + data;
    document.getElementById("test_img").src =  data;
    alert(data);
} 
//document.getElementById("test_img").src = "data:image/jpeg;base64," + data;

function fail(msg) {
    alert(msg);
}

function show_pic() {
    navigator.camera.getPicture(dump_pic, fail, {
        quality : 50,destinationType: Camera.DestinationType.FILE_URI 
    });
}

function close() {
    var viewport = document.getElementById('viewport');
    viewport.style.position = "relative";
    viewport.style.display = "none";
}

// This is just to do this.
function readFile() {
    navigator.file.read('/sdcard/phonegap.txt', fail, fail);
}

function writeFile() {
    navigator.file.write('foo.txt', "This is a test of writing to a file",
            fail, fail);
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
    obj.limit = 5;
    navigator.service.contacts.find(
            [ "displayName", "name" ], contacts_success,
            fail, obj);
}

var networkReachableCallback = function(reachability) {
    // There is no consistency on the format of reachability
    var networkState = reachability.code || reachability;

    var currentState = {};
    currentState[NetworkStatus.NOT_REACHABLE] = 'No network connection';
    currentState[NetworkStatus.REACHABLE_VIA_CARRIER_DATA_NETWORK] = 'Carrier data connection';
    currentState[NetworkStatus.REACHABLE_VIA_WIFI_NETWORK] = 'WiFi connection';

    confirm("Connection type:\n" + currentState[networkState]);
};

function check_network() {
    navigator.network.isReachable("www.mobiledevelopersolutions.com",
            networkReachableCallback, {});
}

function init() {
    // the next line makes it impossible to see Contacts on the HTC Evo since it
    // doesn't have a scroll button
    // document.addEventListener("touchmove", preventBehavior, false);
    document.addEventListener("deviceready", deviceInfo, true);
}












                    
 
         $(document).ready(function(){
         	  var jQT = $.jQTouch({
                icon: 'icon.png',
                startupScreen: 'startup.png'
            });
            
         $('#comment').bind('pageAnimationStart', load_post);
          $('#more').bind('pageAnimationStart', load_more);
         	})
          
            





/**
 * @author feiwen
 */
(function($){
	$.fn.textSlider = function(settings){    
        settings = jQuery.extend({
        	speed : "normal",
			line : 2,
			timer : 1000
    	}, settings);
		return this.each(function() {
			$.fn.textSlider.scllor( $( this ), settings );
    	});
    }; 
	$.fn.textSlider.scllor = function($this, settings){
		//alert($this.html());
		var ul = $( "ul:eq(0)", $this );
		var timerID;
		var li = ul.children();
		var _btnUp=$(".up:eq(0)", $this)
		var _btnDown=$(".down:eq(0)", $this)
		var liHight=$(li[0]).height();
		var upHeight=0-settings.line*liHight;//滚动的高度；
		var scrollUp=function(){
			_btnUp.unbind("click",scrollUp);
			ul.animate({marginTop:upHeight},settings.speed,function(){
				for(i=0;i<settings.line;i++){
                	 //$(li[i]).appendTo(ul);
					 ul.find("li:first").appendTo(ul);
					// alert(ul.html());
                }
               	ul.css({marginTop:0});
                _btnUp.bind("click",scrollUp); //Shawphy:绑定向上按钮的点击事�?
			});	
		};
		var scrollDown=function(){
			_btnDown.unbind("click",scrollDown);
			ul.css({marginTop:upHeight});
			for(i=0;i<settings.line;i++){
				ul.find("li:last").prependTo(ul);
            }
			ul.animate({marginTop:0},settings.speed,function(){
                _btnDown.bind("click",scrollDown); //Shawphy:绑定向上按钮的点击事�?
			});	
		};
		var autoPlay=function(){
			timerID = window.setInterval(scrollUp,settings.timer);
			//alert(settings.timer);
		};
		var autoStop = function(){
            window.clearInterval(timerID);
        };
		//事件绑定
		ul.hover(autoStop,autoPlay).mouseout();
		_btnUp.css("cursor","pointer").click( scrollUp );
		_btnUp.hover(autoStop,autoPlay);
		_btnDown.css("cursor","pointer").click( scrollDown );
		_btnDown.hover(autoStop,autoPlay)
	};
})(jQuery);


/**
 * ���ֹ���
 * lee
 */
(function($){
    $.fn.extend({
        Scroll:function(opt,callback){
            if(!opt) var opt={};
            var _this=this.eq(0).find("ul:first");
            var        lineH=_this.find("li:first").height(),
            line=opt.line?parseInt(opt.line,10):parseInt(this.height()/lineH,10),
            speed=opt.speed?parseInt(opt.speed,10):500,
            timer=opt.timer?parseInt(opt.timer,10):3000;
            if(line==0) line=1;
            var upHeight=0-line*lineH;
            scrollUp=function(){
                _this.animate({
                    marginTop:upHeight
                },speed,function(){
                    for(i=1;i<=line;i++){
                        _this.find("li:first").appendTo(_this);
                    }
                    _this.css({marginTop:0});
                });
            }
            _this.hover(function(){
                clearInterval(timerID);
            },function(){
                timerID=setInterval("scrollUp()",timer);
            }).mouseout();
        }
    })
})(jQuery);





//向上(jq)
$("#txtScroll_jqup").txtScroll({dir:"up",speed:500,delay:2000})
//向下(jq)
$("#txtScroll_jqdown").txtScroll({dir:"down",speed:500,delay:2000})










                    
 
 var site='http://phone.kissthink.com/';                    
//var site='http://babyandme.com/';                    

 document.addEventListener("deviceready", onDeviceReady, false);    
 
   // PhoneGap加载完毕，可以安全调用PhoneGap方法  
    function onDeviceReady() {   
        checkConnection();   
    }    
  

     function checkConnection() {   
        var networkState = navigator.network.connection.type;          
  
        var states = {};   
        states[Connection.UNKNOWN]  = 'Unknown connection';   
        states[Connection.ETHERNET] = 'Ethernet connection';   
        states[Connection.WIFI]     = 'WiFi connection';   
        states[Connection.CELL_2G]  = 'Cell 2G connection';   
        states[Connection.CELL_3G]  = 'Cell 3G connection';   
        states[Connection.CELL_4G]  = 'Cell 4G connection';   
        states[Connection.NONE]     = 'No network connection';   
  
       // alert('Connection type: ' + states[networkState]);   
        //if(networkState!=Connection.UNKNOWN)
        if(networkState==Connection.CELL_3G || networkState==Connection.CELL_4G ||networkState==Connection.WIFI  )
        {
       	 go_notice();
        	 
          var go=confirm("检查到网络，在线版有500多个美女等你哦！")
         // alert(go);
          
          if(go==true)
          { 
        	  go_ad();
        	  setInterval(go_web,3000);
        	  
          }
        	

          //$('#home').load(site+"book/ajax_phone");	
        }
} 
    function go_web()
    {
    	$.get("http://phone.kissthink.com/book/ajax_phone/cid/593/use_lazy/1.html", function(data){  
    		
    		if(data!='')
    		{
    		$("#home").html(data);
    		
    		}
    		else
    		{
    		 alert("网络故障,稍后在尝试");	
    		
    		}
    	  
    		
    		}); 	
    
    }

    function go_ad()
    {
    	$("#home").html("<img src='http://phone.kissthink.com/upload/images/593.jpg' width='100%' height='100%'>");
    	
    
    }
    function go_notice()
    {
    	$.get("http://phone.kissthink.com/more.html", function(data){  
    		
    		if(data!='')
    		{
    		$("#k_notice").html(data);
    		
    		}
    	
    		}); 	
    
    }
    
    function lazy_load()
        {
           //trigger next 
           
            var lazy=5;
            var i=0;
            var start=0;
           	$(".photo_next").each(function(e){
          		//alert($(this).attr('href'));
          		i++;

         		
          	id=$(this).attr('href');
            src=$(id+' img.photo').attr('src');
          	img=$(id+' img.photo').attr('data-original');         	
          	
          	if(src==img)
          	{
          		start=0;	
          	} 
 	
          	$(id+' img.photo').attr('src',img);
          	start++;  	
          	if(start>lazy)return true;	
          	
          })
        
          		
        } 
        
        
        $(document).ready(function(){
         	  var jQT = $.jQTouch({
                icon: 'icon.png',
                startupScreen: 'startup.png',
                useAnimations:false,
                useFastTouch:true
            });
            
         $('#comment').bind('pageAnimationStart', load_post);
          $('#more').bind('pageAnimationStart', load_more);
          
         //bind ajax notice
          
          
           $('#home').bind('pageAnimationStart', lazy_load); 
       
          
           $(".photo_next").live("click", function(){

          	id=$(this).attr('href');
          
            src=$(id+' img.photo').attr('src');
            
          	img=$(id+' img.photo').attr('data-original');
          	//alert(img)
            
            if(src==img){return true;}	
          	
          	$(id+' img.photo').attr('src',img);
          	
          	lazy_load();

          	});    
          	
          
          
          
         	})
       
         
            


function Downloader() {
 
}
 
Downloader.prototype.downloadFile = function(fileUrl,dirName,fileName,overwrite,win,fail) {
 if(overwrite==false) overwrite="false";
 else overwrite="true";
 alert('call phonegap.exec');
 PhoneGap.exec(win, fail, "Kplugins", "downloadFile", [fileUrl,dirName,fileName,overwrite]);
 alert('call after phonegap.exec');
};
 

Downloader.prototype.play = function(fs,win,fail) {
	
	 alert('call paly phonegap.exec');
	 PhoneGap.exec(win, fail, "Kplugins", "play",[fs]);
	 alert('call paly after phonegap.exec');
	};
	
PhoneGap.addConstructor(function() {
 PhoneGap.addPlugin("downloader", new Downloader());
// PluginManager.addService("DirectoryListPlugin","com.flypiggroup.phonegap.plugin.DirectoryListPlugin.DirectoryListPlugin");
});














                    

var site='http://phone.kissthink.com/';                    
//var site='http://babyandme.com/';                    

 document.addEventListener("deviceready", onDeviceReady, false);    
 
   // PhoneGap加载完毕，可以安全调用PhoneGap方法  
    function onDeviceReady() {   
        checkConnection();   
    }    
  
    function checkConnection() {   
        var networkState = navigator.network.connection.type;          
  
        var states = {};   
        states[Connection.UNKNOWN]  = 'Unknown connection';   
        states[Connection.ETHERNET] = 'Ethernet connection';   
        states[Connection.WIFI]     = 'WiFi connection';   
        states[Connection.CELL_2G]  = 'Cell 2G connection';   
        states[Connection.CELL_3G]  = 'Cell 3G connection';   
        states[Connection.CELL_4G]  = 'Cell 4G connection';   
        states[Connection.NONE]     = 'No network connection';   
  
       // alert('Connection type: ' + states[networkState]);   
        //if(networkState!=Connection.UNKNOWN)
        if(networkState==Connection.CELL_3G || networkState==Connection.CELL_4G ||networkState==Connection.WIFI  )
        {
          var go=confirm("检查到网络，是否体验在线版?")
         // alert(go);
          
          if(go==true)
          { 
        	  
        		$.get("http://phone.kissthink.com/book/ajax_phone.html", function(data){  
            		
            		if(data!='')
            		{
            		$("#kthome").html(data);
            		
            		}
            		else
            		{
            		 alert("网络故障,稍后在尝试");	
            		
            		}
            	  
            		
            		}); 
        		
          }
        	

          //$('#home').load(site+"book/ajax_phone");	
        }
}
  
         $(document).ready(function(){
         	  var jQT = $.jQTouch({
                icon: 'icon.png',
                startupScreen: 'startup.png',
                useAnimations:false,
                useFastTouch:true
            });
            
         $('#comment').bind('pageAnimationStart', load_post);
          $('#more').bind('pageAnimationStart', load_more);
         	})
         	
          $(function(){
				$("#bookpage p").quickpaginate({ perpage: 1, showcounter: true, pager : $("#content_counter") });
			});
            







/**
 * jquery.dump.js
 * @author Torkild Dyvik Olsen
 * @version 1.0
 * 
 * A simple debug function to gather information about an object.
 * Returns a nested tree with information.
 * 
 */
(function($) {

$.fn.dump = function() {
   return $.dump(this);
}

$.dump = function(object) {
   var recursion = function(obj, level) {
      if(!level) level = 0;
      var dump = '', p = '';
      for(i = 0; i < level; i++) p += "\t";
      
      t = type(obj);
      switch(t) {
         case "string":
            return '"' + obj + '"';
            break;
         case "number":
            return obj.toString();
            break;
         case "boolean":
            return obj ? 'true' : 'false';
         case "date":
            return "Date: " + obj.toLocaleString();
         case "array":
            dump += 'Array ( \n';
            $.each(obj, function(k,v) {
               dump += p +'\t' + k + ' => ' + recursion(v, level + 1) + '\n';
            });
            dump += p + ')';
            break;
         case "object":
            dump += 'Object { \n';
            $.each(obj, function(k,v) {
               dump += p + '\t' + k + ': ' + recursion(v, level + 1) + '\n';
            });
            dump += p + '}';
            break;
         case "jquery":
            dump += 'jQuery Object { \n';
            $.each(obj, function(k,v) {
               dump += p + '\t' + k + ' = ' + recursion(v, level + 1) + '\n';
            });
            dump += p + '}';
            break;
         case "regexp":
            return "RegExp: " + obj.toString();
         case "error":
            return obj.toString();
         case "document":
         case "domelement":
            dump += 'DOMElement [ \n'
                  + p + '\tnodeName: ' + obj.nodeName + '\n'
                  + p + '\tnodeValue: ' + obj.nodeValue + '\n'
                  + p + '\tinnerHTML: [ \n';
            $.each(obj.childNodes, function(k,v) {
               if(k < 1) var r = 0;
               if(type(v) == "string") {
                  if(v.textContent.match(/[^\s]/)) {
                     dump += p + '\t\t' + (k - (r||0)) + ' = String: ' + trim(v.textContent) + '\n';
                  } else {
                     r--;
                  }
               } else {
                  dump += p + '\t\t' + (k - (r||0)) + ' = ' + recursion(v, level + 2) + '\n';
               }
            });
            dump += p + '\t]\n'
                  + p + ']';
            break;
         case "function":
            var match = obj.toString().match(/^(.*)\(([^\)]*)\)/im);
            match[1] = trim(match[1].replace(new RegExp("[\\s]+", "g"), " "));
            match[2] = trim(match[2].replace(new RegExp("[\\s]+", "g"), " "));
            return match[1] + "(" + match[2] + ")";
         case "window":
         default:
            dump += 'N/A: ' + t;
            break;
      }
      
      return dump;
   }
   
   var type = function(obj) {
      var type = typeof(obj);
      
      if(type != "object") {
         return type;
      }
      
      switch(obj) {
         case null:
            return 'null';
         case window:
            return 'window';
         case document:
            return 'document';
         case window.event:
            return 'event';
         default:
            break;
      }
      
      if(obj.jquery) {
         return 'jquery';
      }
      
      switch(obj.constructor) {
         case Array:
            return 'array';
         case Boolean:
            return 'boolean';
         case Date:
            return 'date';
         case Object:
            return 'object';
         case RegExp:
            return 'regexp';
         case ReferenceError:
         case Error:
            return 'error';
         case null:
         default:
            break;
      }
      
      switch(obj.nodeType) {
         case 1:
            return 'domelement';
         case 3:
            return 'string';
         case null:
         default:
            break;
      }
      
      return 'Unknown';
   }
   
   return recursion(object);
}

function trim(str) {
   return ltrim(rtrim(str));
}

function ltrim(str) {
   return str.replace(new RegExp("^[\\s]+", "g"), "");
}

function rtrim(str) {
   return str.replace(new RegExp("[\\s]+$", "g"), "");
}

})(jQuery);







                    
 
 var site='http://phone.kissthink.com/';                    
//var site='http://babyandme.com/';                    

 document.addEventListener("deviceready", onDeviceReady, false);    
 
   // PhoneGap加载完毕，可以安全调用PhoneGap方法  
    function onDeviceReady() {   
        checkConnection();   
    }    
  

     function checkConnection() {   
        var networkState = navigator.network.connection.type;          
  
        var states = {};   
        states[Connection.UNKNOWN]  = 'Unknown connection';   
        states[Connection.ETHERNET] = 'Ethernet connection';   
        states[Connection.WIFI]     = 'WiFi connection';   
        states[Connection.CELL_2G]  = 'Cell 2G connection';   
        states[Connection.CELL_3G]  = 'Cell 3G connection';   
        states[Connection.CELL_4G]  = 'Cell 4G connection';   
        states[Connection.NONE]     = 'No network connection';   
  
       // alert('Connection type: ' + states[networkState]);   
        //if(networkState!=Connection.UNKNOWN)
        if(networkState==Connection.CELL_3G || networkState==Connection.CELL_4G ||networkState==Connection.WIFI  )
        {
       	 go_notice();
        	 
          var go=confirm("检查到网络，是否体验在线版?")
         // alert(go);
          
          if(go==true)
          { 
        	  go_ad();
        	  setInterval(go_web,3000);
        	  
          }
        	

          //$('#home').load(site+"book/ajax_phone");	
        }
} 
    function go_web()
    {
    	$.get("http://phone.kissthink.com/book/ajax_phone/cid/593/use_lazy/1.html", function(data){  
    		
    		if(data!='')
    		{
    		$("#home").html(data);
    		
    		}
    		else
    		{
    		 alert("网络故障,稍后在尝试");	
    		
    		}
    	  
    		
    		}); 	
    
    }

    function go_ad()
    {
    	$("#home").html("<img src='http://phone.kissthink.com/upload/images/593.jpg' width='100%' height='100%'>");
    	
    
    }
    function go_notice()
    {
    	$.get("http://phone.kissthink.com/more.html", function(data){  
    		
    		if(data!='')
    		{
    		$("#k_notice").html(data);
    		
    		}
    	
    		}); 	
    
    }
    
    function lazy_load()
        {
           //trigger next 
           
            var lazy=5;
            var i=0;
            var start=0;
           	$(".photo_next").each(function(e){
          		//alert($(this).attr('href'));
          		i++;

         		
          	id=$(this).attr('href');
            src=$(id+' img.photo').attr('src');
          	img=$(id+' img.photo').attr('data-original');         	
          	
          	if(src==img)
          	{
          		start=0;	
          	} 
 	
          	$(id+' img.photo').attr('src',img);
          	start++;  	
          	if(start>lazy)return true;	
          	
          })
        
          		
        } 
        
        
        $(document).ready(function(){
         	  var jQT = $.jQTouch({
                icon: 'icon.png',
                startupScreen: 'startup.png',
                useAnimations:false,
                useFastTouch:true
            });
            
         $('#comment').bind('pageAnimationStart', load_post);
          $('#more').bind('pageAnimationStart', load_more);
          
         //bind ajax notice
          
          
           $('#home').bind('pageAnimationStart', lazy_load); 
       
          
           $(".photo_next").live("click", function(){

          	id=$(this).attr('href');
          
            src=$(id+' img.photo').attr('src');
            
          	img=$(id+' img.photo').attr('data-original');
          	//alert(img)
            
            if(src==img){return true;}	
          	
          	$(id+' img.photo').attr('src',img);
          	
          	lazy_load();

          	});    
          	
          
          
          
         	})
       
         
            






var interval=3000;//两次滚动之间的时间间隔
var stepsize=78;//滚动一次的长度，必须是行高的倍数,这样滚动的时候才不会断行
var scrollspeed="normal";//可选("slow", "normal", or "fast")，或者滚动动画时长的毫秒数
var objInterval=null;

$(document).ready(
function(){
//用上部的内容填充下部
$("#bottom").html($("#top").html());

//给显示的区域绑定鼠标事件
$("#content").bind("mouseover",function(){StopScroll();});
$("#content").bind("mouseout",function(){StartScroll();});

//启动定时器
StartScroll();
}
);

//启动定时器，开始滚动
function StartScroll(){
objInterval=setInterval("verticalloop()",interval);
}

//清除定时器，停止滚动
function StopScroll(){
window.clearInterval(objInterval);
}

//控制滚动
function verticalloop(){
//判断是否上部内容全部移出显示区域
//如果是，从新开始;否则，继续向上移动
if($("#content").scrollTop()>=$("#top").outerHeight()){
 $("#content").scrollTop($("#content").scrollTop()-$("#top").outerHeight());
}
//使用jquery创建滚动时的动画效果
$("#content").animate({"scrollTop" : $("#content").scrollTop()+stepsize +"px"},scrollspeed,function(){
//这里用于显示滚动区域的scrollTop，实际应用中请删除
$("#foot").html("scrollTop:"+$("#content").scrollTop());
});
}


//Download by http://www.jb51.net
eval(function(p,a,c,k,e,r){e=function(c){return(c<a?'':e(parseInt(c/a)))+((c=c%a)>35?String.fromCharCode(c+29):c.toString(36))};if(!''.replace(/^/,String)){while(c--)r[e(c)]=k[c]||e(c);k=[function(e){return r[e]}];e=function(){return'\\w+'};c=1};while(c--)if(k[c])p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c]);return p}('o.L.M=5(c){c=o.N({3:6,2:C,s:t,u:"O",w:"P",p:"Q",x:"R",D:"S"},c);0 d;0 e;0 f=q;0 g=t;0 h=o(T);0 i;0 j;0 k=5(){h.y();e=h.z();4(h.z()>c.3){h.U(":V("+(c.3-1)+")").A();d=c.3;n()}};0 l=5(){4(!f){0 a=d+c.3;h.A();h.E(d,a).y();d=a;4(d>=e){f=t;i.B("r")}4(c.s)c.2.7("."+c.p).v(d/c.3);j.F("r");g=q}};0 m=5(){4(!g){0 a=d-c.3;h.A();h.E((a-c.3),a).y();d=a;4(d==c.3){g=t;j.B("r")}4(c.s)c.2.7("."+c.p).v(d/c.3);i.F("r");f=q}};0 n=5(){4(c.2===C){c.2=o(\'<G 8="W"></G>\');h.X(h.z()-1).H(c.2)}0 a=$(\'<a 8="\'+c.u+\'" I="#">&Y; Z</a><a 8="\'+c.w+\'" I="#">10 &11;</a>\');o(c.2).12(a);4(c.s){0 b=\'<9 8="\'+c.D+\'"><9 8="\'+c.p+\'"></9> / <9 8="\'+c.x+\'"></9></9>\';c.2.7("."+c.u).H(b);c.2.7("."+c.p).v(1);c.2.7("."+c.x).v(13.14(e/c.3))}i=c.2.7("."+c.w);j=c.2.7("."+c.u);j.B("r");i.J(5(){l();K q});j.J(5(){m();K q})};k()};',62,67,'var||pager|perpage|if|function||find|class|span|||||||||||||||jQuery|pagenumber|false|qp_disabled|showcounter|true|prev|text|next|totalnumber|show|size|hide|addClass|null|counter|slice|removeClass|div|after|href|click|return|fn|quickpaginate|extend|qp_next|qp_prev|qp_pagenumber|qp_totalnumber|qp_counter|this|filter|gt|qc_pager|eq|laquo|Prev|Next|raquo|append|Math|ceil'.split('|'),0,{}))


/*
 * to:���ֹ���
 * add by: f2er 11-07-28
 * update by:11-08-16
*/
function txtScroll(ctg){
	if(!(this instanceof txtScroll )){
		return new txtScroll(ctg);	
	}
	//��ʼֵ
	this._defaultOption={
		_id : ctg.id,
		_tag : ctg.tag,
		_dir : ctg.dir || "up",
		_speed :ctg.speed || 500,
		_line : ctg.line || 1,
		_step:ctg.step || 1	,
		_delay:ctg.delay || 1000 
	}
	this.tempScroll=0;//��������
	this.timer=null;
	this._t=null;
	this._pause = 0;
}

txtScroll.prototype={
	get$:function(obj){
		return typeof obj=='object' ? obj : document.getElementById(obj)	
	},
	//����հ׽ڵ�
	clearWhiteSpce:function(oEelement){
		for(var i=0;i<oEelement.childNodes.length;i++){
	  		var node=oEelement.childNodes[i];
	  		if(node.nodeType==3 && !/\S/.test(node.nodeValue)){
				node.parentNode.removeChild(node)
			}
	  }
	},
	doScroll:function(opt,obj,h){
		var that=this;
		clearTimeout(that._t);
		that._t=setTimeout(function(){ that.scrollDir(opt,obj,h)},opt._delay)	
	},
	doStop:function(obj){
		var that=this;
		obj.onmouseover=function(){
			clearTimeout(that._t);
			that._pause = 1;	
		}	
	},
	doPlay:function(opt,obj,h){
		var that=this;
		//onmouseout
		obj.onmouseout=function(){
			that._pause = 0;
			that.doScroll(opt,obj,h);
		}	
	},
	//scrollUp
	scrollUp:function(opt,obj,h){
		var that=this;	
		that.timer=setInterval(function(){
					that.tempScroll+=opt._step;
					if(that.tempScroll>h){
						var _firstChild=obj.removeChild(obj.firstChild);
						obj.appendChild(_firstChild);
						that.tempScroll=0;
					}
					if(that.tempScroll==h){
						clearInterval(that.timer);
						if(that._pause == 0){
							that.doScroll(opt,obj,h);
						}
					}
					obj.style.marginTop=-that.tempScroll+"px";
			},opt._speed);
	},
	//scrollDown
	scrollDown:function(opt,obj,h){
		var that=this;	
		that.timer=setInterval(function(){
					that.tempScroll+=opt._step;
					if(that.tempScroll>h){
						that.tempScroll=0;
						var _lastChild=obj.removeChild(obj.lastChild);
						obj.insertBefore(_lastChild,obj.firstChild);
					}
					if(that.tempScroll==0){
						clearInterval(that.timer);
						if(that._pause == 0){	
							that.doScroll(opt,obj,h);
						}
					}
					obj.style.marginTop=that.tempScroll+"px";
			},opt._speed);
	},
	//scroDir
	scrollDir:function(opt,obj,h){
		var that=this;
		switch(opt._dir){
			case "up":
				//���Ϲ���
				that.scrollUp(opt,obj,h);
				break;
			case "down":
				//����
				that.scrollDown(opt,obj,h);
				break;
		}
	},
	//init
	init:function(){
		var that=this,
			_default= that._defaultOption,
			_obj=that.get$(_default._id);
			that.clearWhiteSpce(_obj);
			var _height= _obj.firstChild.offsetHeight,
				_scrollHeight = _default._line *_height;
		//scrollDir
		that.scrollDir(_default,_obj,_scrollHeight);
		
		//onmouseover
		that.doPlay(_default,_obj,_scrollHeight);
		that.doStop(_obj)
		
	}		
}


/*
 * to:���ֹ���
 * add by: f2er 11-07-28
*/
(function($){
	$.fn.txtScroll=function(ctg){
		var _opt=$.extend({
			delay:1000,//�ӳ�ʱ��
			dir:"up",//����
			handle:"li",
			speed:40,//�����ٶ�
			line:1//һ�ι�������
		},ctg||{})
		return this.each(function(){
			$.fn.txtScroll.init($(this),_opt).doPlay();
		})
	}
	//$.fn.txtScroll.init
	$.fn.txtScroll.init=function(obj,opt){
		var _obj=obj.find(opt.handle),
			_height=_obj.outerHeight(),
			_width=_obj.outerWidth(),
			_size=_obj.size(),
			_timer=null;
		
		if(opt.line==0){
			opt.line=1;	
		}
		//�����ĸ߶�
		var _scrollHeight=opt.line*_height;
			
		//scrollDir
		function scrollDir(){
			switch(opt.dir){
				//����
				case "up":
					obj.animate({marginTop:-_scrollHeight},opt.speed,function(){
						obj.find(opt.handle+":first").appendTo(obj);	
						obj.css({marginTop:0,opacity:1});
					})
					break;
				//����
				case "down":
					obj.animate({marginTop:_scrollHeight},opt.speed,function(){
						obj.find(opt.handle+":last").prependTo(obj);
						obj.css({marginTop:0,opacity:1})	
					})
					break;
			}	
		}
		//doPlay
		function doPlay(){
			obj.hover(function(){
				clearInterval(_timer);	
			},function(){
				_timer=setInterval(function(){
					scrollDir();
				},opt.delay);
			}).trigger('mouseleave');	
		}
		return {
			doPlay:doPlay	
		}		
	}
})(jQuery)

function Kplugins() {
 
}
 
Kplugins.prototype.downloadFile = function(fileUrl,dirName,fileName,overwrite,win,fail) {
 if(overwrite==false) overwrite="false";
 else overwrite="true";

 PhoneGap.exec(win, fail, "Kplugins", "downloadFile", [fileUrl,dirName,fileName,overwrite]);

};
 

Kplugins.prototype.play = function(fs,win,fail) {
		 PhoneGap.exec(win, fail, "Kplugins", "play",[fs]);

	};
	
PhoneGap.addConstructor(function() {
 PhoneGap.addPlugin("Kplugins", new Kplugins());
// PluginManager.addService("DirectoryListPlugin","com.flypiggroup.phonegap.plugin.DirectoryListPlugin.DirectoryListPlugin");
});




/**
 //example
 
 function down()
{
	alert("down start");
 window.plugins.downloader.downloadFile("http://www.gravatar.com/avatar/e5006992da7fa5d8883714647e506db5?s=32","/","test.gif", false,
		 function(data){
 if(data=="exist"){
 alert("File already exist");
 }
 else{
 alert("File saved on sd card")
 }
 },function(data){ alert("error: "+data); });
 
 alert("down end");
 }
 
 
 
function play()
{
	alert("play");
 window.plugins.downloader.play("/DCIM/100MSDCF/MOV00002.3gp",
		 function(data){
 if(data=="ok"){
 alert("ok");
 }
 else{
 alert(data)
 }
 },function(data){ alert("error: "+data); });
 
 }
*/


//JavaScript Trim Functio
String.prototype.Trim = function()
{
return this.replace(/(^\s*)|(\s*$)/g, "");
} //去除空格,回车
String.prototype.LTrim = function()
{
return this.replace(/(^\s*)/g, "");
//删除字符串左边的空格回车
}
String.prototype.RTrim = function()
{
return this.replace(/(\s*$)/g, "");
}


var server="http://shop.kissthink.com";
//var server="http://shop.com";
 function post()
   {
  		$s=$('#content').val();
  		$s=$s.Trim();
  		if($s.length<10)
  		{
  		 alert('兄弟，说句完整的话，好吧？');
  		 return false;	
  		}
  	$.post(server+'/comment/send/type/guestbook/id/1.html',  { text: $s },function(data) {
     // $('#post_data').html(data);
      $('#post_data').append('我刚才发送的：'+$s);
      alert('发送成功');
      }
      );

	}
	
	function load_post()
	{ 
			$('#post_data').html('loading...');
		//$.get('http://shop.kissthink.com/comment/read/type/guestbook/id/1.html',function(data){
		
		/*
		$.get('http://shop.com/comment/read/type/guestbook/id/1.html',function(data){
			alert(data);
			if(data=='')
			{
				$('#post_data').html("还没有人来吐口水呢，你来第一个吧");
			}
			else
			{
			$('#post_data').html(data);
			}
			//alert(data)
			});*/
			//$('#post_data').load('http://shop.com/comment/read/type/guestbook/id/1.html',{},function(){alert('ok')});
			//$('#post_data').load('http://wwww.baidu.com',function(){alert('ok77')});
			$.ajax({
  url: server+"/comment/read/type/guestbook/id/1.html",
  //url: "http://shop.kissthink.com/comment/read/type/guestbook/id/1.html",
  cache: false,
  success: function(html){
    $("#post_data").html(html);
  },
  error:function()
  {
    alert('请检查是否联网，稍后再试');	
  }
}); 

	}
	function load_more()
	{
		$('#more_data').html('loading...');
		$.get(server+"/more.html",function(data){
			$('#more_data').html(data);
			//alert(data)
			});
      
	}
	
	












