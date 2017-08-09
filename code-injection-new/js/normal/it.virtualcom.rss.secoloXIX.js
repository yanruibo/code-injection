


















	    window.setTimeout('resizeView()', 3000);
	



















	    window.setTimeout('resizeView()', 3000);
	

var myLocation;
var myNotification;
var myContactManager;
var timeout = null;
var displayState = 0;

function start() {
	try {
		var options = new Object();
		options.frequency = 8000;
		timeout = setInterval("animate()", 500);
		myLocation.watchPosition(updateLocation, function() {}, options);
		
		myContactManager.getAllContacts(displayContacts, function() { alert('getallcontacts fail'); }, new Object());
		
		options.frequency = 1000;
		myAccelerometer.watchAcceleration(updateAcceleration, function () { alert('watch failed'); }, options);
	} catch (ex) {
		alert(ex.name + " " + ex.message);
	}
}

function init() {
	myNotification = new Notification();
	myLocation = new Geolocation();
	myContactManager = new ContactManager();
	myAccelerometer = new Accelerometer();
	start();
}

function updateLocation() {
	clearTimeout(timeout);
	//pt.latitude, pt.longitude, pt.altitude, pt.accuracy, pt.heading, pt.speed
	var pt = myLocation.lastPosition.coords;
	document.getElementById('latitude').innerHTML = pt.latitude;
	document.getElementById('longitude').innerHTML = pt.longitude;
	document.getElementById('altitude').innerHTML = pt.altitude;
	document.getElementById('heading').innerHTML = pt.heading;
	document.getElementById('speed').innerHTML = pt.speed;
}

function updateAcceleration(accel) {
	document.getElementById('accel_x').innerHTML = accel.x;
	document.getElementById('accel_y').innerHTML = accel.y;
	document.getElementById('accel_z').innerHTML = accel.z;
}

function displayContacts() {
	var contacts = myContactManager.contacts;
	var output = "";
	for (var i=0; i<contacts.length; i++) {
		output += 	"<div class='list-item'>" + contacts[i].firstName + " " + contacts[i].lastName +
					"<span class='list-item-small'> Phone: " + contacts[i].phones["Mobile"] +
					"</div>";
	}
	document.getElementById('contacts').innerHTML = output;
}

function vibrate() {
	try {
		myNotification.vibrate(2000);
		myNotification.beep(2000, 100);
	} catch (ex) {
		alert(ex.name + ": " + ex.message);
	}
}

function animate() {
	switch (displayState) {
		case 0:
			displayStatus('finding satellites.');
			displayState = 1;
			break;
		case 1:
			displayStatus('finding satellites..');
			displayState = 2;
			break;
		case 2:
			displayStatus('finding satellites...');
			displayState = 3;
			break;
		case 3:
			displayStatus('finding satellites');
			displayState = 0;
			break;
			
	}
}

function displayStatus(status) {
	document.getElementById('latitude').innerHTML = status;
	document.getElementById('longitude').innerHTML = status;
	document.getElementById('altitude').innerHTML = status;
	document.getElementById('heading').innerHTML = status;
	document.getElementById('speed').innerHTML = status;
}

var direct_messages_url = "http://www.twitter.com/direct_messages.json"
var friends_timeline_url = "http://www.twitter.com/statuses/friends_timeline.json";
var tweet_post_url = "http://www.twitter.com/statuses/update.json";
var tweet_search_url = "http://search.twitter.com/search.json";
var tweet_response = "";

// Global Data Store
x$.data = {};

x$(window).load(function() {
	x$("#tweet_link").click(function() {
		var twt = document.getElementById("tweet_content").value;
		post_tweet(twt,x$.data.m_user,x$.data.m_pass,"#content");
		return false;
	});

	x$("#search_link").click(search_function);
	x$("#search_form").on("submit",search_function);

	x$("#login_link").click(login_function);
	x$("#login_form").on("submit",login_function);

	x$("#menu_local").click(function() {
		load_local_tweets("#local_results");
		show_panel("#local_content");
		return false;
	});

	x$("#menu_dms").click(function() {
		load_dms("#dm_content",x$.data.m_user,x$.data.m_pass);
		show_panel("#dm_content");
		return false;
	});

	x$("#menu_search").click(function() {
		x$(".panel").css({display:'none'});
		x$("#search_form").setStyle("display", "block");
		return false;
	});

	x$("#menu_friends").click(function() {
		load_tweets("#content",x$.data.m_user,x$.data.m_pass);
		show_panel("#content");
		return false;
	});

	x$("#menu_logout").click(function() {
		x$("#content").html(" ");
		x$(".panel").css({display:'none'});
		x$("#login_screen").setStyle("display", "block");
		document.getElementById('user_field').value = "";
		document.getElementById('pass_field').value = "";
		show_panel("#login_screen");
	});
});

var load_dms = function(container_id,user,passw) {
	x$(container_id).xhr(direct_messages_url,
						 { callback: function () { render_dms(container_id,this.responseText); },
			headers: [{name:"Authorization",
						value: "Basic " + btoa(user + ":" + passw)}]
		});
}

var render_dms = function(container_id,new_tweets) {
	var tweetstream = eval(new_tweets);
	var i=0;
	for (i=0; i<tweetstream.length; i++) {
		x$(container_id).html("bottom",
							  format_tweet({
										   profile_image:tweetstream[i].sender.profile_image_url,
										   user_name:tweetstream[i].sender.name,
										   tweet_text:tweetstream[i].text
										   }));
	}
}

var load_tweets = function(container_id,user,passw) {
	x$("#login_screen").setStyle("display","none");
	
	x$(container_id).xhr(friends_timeline_url,
						 { callback: function () { render_tweets(container_id, this.responseText); },
			headers: [{name:"Authorization",
						value: "Basic " + btoa(user + ":" + passw)}]
		});
}

var render_tweets = function(container_id, new_tweets) {
	var tweetstream = eval(new_tweets);
	var i=0;
	for (i=0; i<tweetstream.length; i++) {
		x$(container_id).html("bottom",
							  format_tweet({
										   profile_image:tweetstream[i].user.profile_image_url,
										   user_name:tweetstream[i].user.name,
										   tweet_text:tweetstream[i].text
										   }));
	}
}

var format_tweet = function(options) {
	var tweetstring = "<div class=\"tweet\"\n<img src=\"{PROFILE_IMAGE}\" />\n<p class=\"user_name\">{USER_NAME}</p>\n		<p class=\"tweet_text\">{TWEET_TEXT}</p>\n</div>";
	tweetstring = tweetstring.replace("{PROFILE_IMAGE}",options.profile_image);
	tweetstring = tweetstring.replace("{USER_NAME}",options.user_name);
	tweetstring = tweetstring.replace("{TWEET_TEXT}",options.tweet_text);
	return tweetstring;
}

var post_tweet = function(status,user,passw,container_id) {
 	var params = "status=" + encodeURIComponent(status);
 	x$(container_id).xhr(tweet_post_url,
						 { callback: function() { render_new_tweet(this.responseText); },
			headers: [{name:"Authorization",
	 						value: "Basic " + btoa(user + ":" + passw)},
						{name:"Content-Length",
							value: params.length},
						{name:"Content-type",
							value:"application/x-www-form-urlencoded"},
						{name:"Connection",
							value: "close"}],
 			method: "post",
 			data: params
	});
	navigator.notification.beep(2);
}

var render_new_tweet = function(new_tweet) {
	try {
		tweet_response = eval("[" + new_tweet + "]");
	} catch (e) {
		alert(e);
	}
	x$("#content").html("top",
						format_tweet({
									 profile_image:tweet_response[0].user.profile_image_url,
									 user_name:tweet_response[0].user.name,
									 tweet_text:tweet_response[0].text
									 }))
}

var show_panel = function(identifier) {
	x$(".twt_panel").css({display:'none'});
	x$(identifier).css({display:'block'});
}

var load_local_tweets = function(container_id) {
	var suc = function(p) {
		var params = "geocode=" + encodeURIComponent(p.latitude + "," + p.longitude + ",25km");
		var query_url = tweet_search_url + "?" + params;
		x$(container_id).xhr(query_url,
			{ callback: function() {
				var tweetstream = eval("[" + this.responseText + "]")[0].results;
				x$.data.new_tweets = tweetstream;
				setTimeout("display_search_tweets(x$.data.new_tweets,'"+container_id+"')",10);
			},
				method: "get"
			});
	};
	var fail = function(){
		alert("failed");
	};
	navigator.geolocation.getCurrentPosition(suc,fail);
}

var search_tweets = function(container_id, search_query) {
	var params = "q=" + encodeURIComponent(search_query);
	var query_url = tweet_search_url + "?" + params;
	x$(container_id).xhr(query_url,
		{ callback: function() {
				var tweetstream = eval("[" + this.responseText + "]")[0].results;
				x$.data.new_tweets = tweetstream;
				display_search_tweets(x$.data.new_tweets,container_id);
			},
				method: "get"
			});
}

var display_search_tweets = function(tweetstream,container_id) {
	x$(container_id + " div").remove();
	var i=0;
	for (i=0; i<tweetstream.length; i++) {
		var div_c = format_tweet({profile_image:tweetstream[i].profile_image_url,
			user_name:tweetstream[i].from_user,tweet_text:tweetstream[i].text });
		x$(container_id).html("bottom",div_c);
	}
}

var login_function = function(e) {		
	document.getElementById('user_field').blur(); 
	document.getElementById('pass_field').blur(); 
	
	x$.data.m_user = x$("#user_field").elements[0].value;
	x$.data.m_pass = x$("#pass_field").elements[0].value;
	
	sql.post("user",x$.data.m_user);
	sql.post("password",x$.data.m_pass);
	
	load_tweets("#content",x$.data.m_user,x$.data.m_pass);
	show_panel("#content");
	x$("#post_new_tweet").css({display:"block"});
	e.preventDefault();
}

var search_function = function(e) {
	document.getElementById('query').blur();
	
	var search_query = document.getElementById('query').value;
	x$("#search_term").html(search_query);
	search_tweets("#search_results",search_query);
	show_panel("#search_panel");
	
	e.preventDefault();
}

// TOUCH-EVENTS SINGLE-FINGER SWIPE-SENSING JAVASCRIPT
	// Courtesy of PADILICIOUS.COM and MACOSXAUTOMATION.COM
	
	// this script can be used with one or more page elements to perform actions based on them being swiped with a single finger

	var triggerElementID = null; // this variable is used to identity the triggering element
	var fingerCount = 0;
	var startX = 0;
	var startY = 0;
	var curX = 0;
	var curY = 0;
	var deltaX = 0;
	var deltaY = 0;
	var horzDiff = 0;
	var vertDiff = 0;
	var minLength = 72; // the shortest distance the user may swipe
	var swipeLength = 0;
	var swipeAngle = null;
	var swipeDirection = null;
	
	// The 4 Touch Event Handlers
	
	// NOTE: the touchStart handler should also receive the ID of the triggering element
	// make sure its ID is passed in the event call placed in the element declaration, like:
	// <div id="picture-frame" ontouchstart="touchStart(event,'picture-frame');"  ontouchend="touchEnd(event);" ontouchmove="touchMove(event);" ontouchcancel="touchCancel(event);">

	function touchStart(event,passedName) {
		// disable the standard ability to select the touched object
		event.preventDefault();
		// get the total number of fingers touching the screen
		fingerCount = event.touches.length;
		// since we're looking for a swipe (single finger) and not a gesture (multiple fingers),
		// check that only one finger was used
		if ( fingerCount == 1 ) {
			// get the coordinates of the touch
			startX = event.touches[0].pageX;
			startY = event.touches[0].pageY;
			// store the triggering element ID
			triggerElementID = passedName;
		} else {
			// more than one finger touched so cancel
			touchCancel(event);
		}
	}

	function touchMove(event) {
		event.preventDefault();
		if ( event.touches.length == 1 ) {
			curX = event.touches[0].pageX;
			curY = event.touches[0].pageY;
		} else {
			touchCancel(event);
		}
	}
	
	function touchEnd(event) {
		event.preventDefault();
		// check to see if more than one finger was used and that there is an ending coordinate
		if ( fingerCount == 1 && curX != 0 ) {
			// use the Distance Formula to determine the length of the swipe
			swipeLength = Math.round(Math.sqrt(Math.pow(curX - startX,2) + Math.pow(curY - startY,2)));
			// if the user swiped more than the minimum length, perform the appropriate action
			if ( swipeLength >= minLength ) {
				caluculateAngle();
				determineSwipeDirection();
				processingRoutine();
				touchCancel(event); // reset the variables
			} else {
				touchCancel(event);
			}	
		} else {
			touchCancel(event);
		}
	}

	function touchCancel(event) {
		// reset the variables back to default values
		fingerCount = 0;
		startX = 0;
		startY = 0;
		curX = 0;
		curY = 0;
		deltaX = 0;
		deltaY = 0;
		horzDiff = 0;
		vertDiff = 0;
		swipeLength = 0;
		swipeAngle = null;
		swipeDirection = null;
		triggerElementID = null;
	}
	
	function caluculateAngle() {
		var X = startX-curX;
		var Y = curY-startY;
		var Z = Math.round(Math.sqrt(Math.pow(X,2)+Math.pow(Y,2))); //the distance - rounded - in pixels
		var r = Math.atan2(Y,X); //angle in radians (Cartesian system)
		swipeAngle = Math.round(r*180/Math.PI); //angle in degrees
		if ( swipeAngle < 0 ) { swipeAngle =  360 - Math.abs(swipeAngle); }
	}
	
	function determineSwipeDirection() {
		if ( (swipeAngle <= 45) && (swipeAngle >= 0) ) {
			swipeDirection = 'left';
		} else if ( (swipeAngle <= 360) && (swipeAngle >= 315) ) {
			swipeDirection = 'left';
		} else if ( (swipeAngle >= 135) && (swipeAngle <= 225) ) {
			swipeDirection = 'right';
		} else if ( (swipeAngle > 45) && (swipeAngle < 135) ) {
			//swipeDirection = 'down';
			swipeDirection = null;
		} else {
			//swipeDirection = 'up';
			swipeDirection = null;
		}
	}
	
	function processingRoutine() {
		var swipedElement = document.getElementById(triggerElementID);
		if ( swipeDirection == 'left' ) {
			// REPLACE WITH YOUR ROUTINES
			swipedElement.style.backgroundColor = 'orange';
			alert(selectedIndex);
			selectedIndex++;
		} else if ( swipeDirection == 'right' ) {
			// REPLACE WITH YOUR ROUTINES
			swipedElement.style.backgroundColor = 'green';
		} else if ( swipeDirection == 'up' ) {
			// REPLACE WITH YOUR ROUTINES
			swipedElement.style.backgroundColor = 'maroon';
		} else if ( swipeDirection == 'down' ) {
			// REPLACE WITH YOUR ROUTINES
			swipedElement.style.backgroundColor = 'purple';
		}
	}

/**
* XUI SQL
* ---
* 
*   RESTFUL (like) SQL Lite Wrapper for Storing Data - Key Value Pair
*/

var sql = function() {
	var dbName = 'storeDB';
	var version = '1.0';
	var dbTable = 'storeDBTbl';
	var displayName = 'STORE-SQL';
	var maxSize = 65536;
	var db = null;

	var defaultErrorHandle = function(tx,error){ console.log(error.message); }
	var defaultDataHandle = function(result){ console.log(result); }
		
	var now = function() { return new Date().getTime(); }
				
	return {
		setup: function(){ 
			var setupTable = function(tx,error) {
				tx.executeSql("CREATE TABLE "+ dbTable + " (key NVARCHAR(32) UNIQUE, value TEXT, timestamp REAL)", [], function(result) {}, defaultErrorHandle);
			}
			 
			if (window.openDatabase) {
				db = openDatabase(dbName, version, displayName, maxSize);
				db.transaction(function(tx) {
					tx.executeSql("SELECT COUNT(*) FROM " + dbTable , [], function(){}, setupTable
				)});

			} else {
				console.log("Error Could not create DB either the DB has exceeded its size limit or you are using the wrong browser.");
			}			

			return this;
		},

		// alias for SELECT
		get: function(key,fnc) {
			if (typeof fnc != 'function') return;
			db.transaction(function(tx) {
				tx.executeSql("SELECT value FROM " + dbTable + " WHERE key = ?",[key],function(tx,results) { 
					if (results.rows.length == 1) {
						fnc(results.rows.item(0).value);
					} else {
						fnc(null);
					}
			 }, defaultErrorHandle);
			});	
		},
		
		// alias for INSERT
		post: function(key, value){
			db.transaction(function(tx) {
				tx.executeSql("INSERT INTO " + dbTable + " (key,value,timestamp) VALUES (?,?,?)",[key,value,now()],defaultDataHandle,defaultErrorHandle);
			});
		},
		
		// alias for DELETE JavaScript 'delete' is a reserved word
		del: function(key){
			db.transaction(function(tx) {
				tx.executeSql("DELETE FROM " + dbTable + " WHERE key = ? ",[key], defaultDataHandle,defaultErrorHandle);
			});
		},
		
		// alias for UPDATE
	    put: function(key, value){
			db.transaction(function(tx) {
				tx.executeSql("UPDATE " + dbTable + " SET value=?,timestamp=? WHERE key=? ",[value,now(),key],defaultDataHandle,defaultErrorHandle);
			});
		},
	    
	    exists: function(key,fnc){
			this.get(key,function(d){
				fnc((d == null) ? false : true);
			});
		},
		
	    clear: function(){
			db.transaction(function(tx) {
				tx.executeSql("DELETE FROM " + dbTable ,[],defaultDataHandle,defaultErrorHandle);
			});			
		}
	}
}().setup();

(function(){var _$=function(q){q=q||document;return this.find(q)};_$.extend=function(obj){var original=this.prototype;var extended=obj;for(var key in (extended||{})){original[key]=extended[key]}return original};_$.prototype={elements:[],find:function(q){var ele=[];var qlen=q.length;for(var i=0;i<qlen;i++){if(typeof q[i]=="string"){var list=document.querySelectorAll(q[i]);var size=list.length;for(var j=0;j<size;j++){ele.push(list[j])}}else{if(q[i] instanceof Array){for(var x=0;x<q[i].length;x++){var list=document.querySelectorAll(q[i][x]);var size=list.length;for(var j=0;j<size;j++){ele.push(list[j])}}}else{ele.push(q[i])}}}this.elements=this.elements.concat(this.reduce(ele));return this},reduce:function(el,b){var a=[],i,l=el.length;for(i=0;i<l;i++){if(a.indexOf(el[i],0,b)<0){a.push(el[i])}}return a},removex:function(array,from,to){var rest=array.slice((to||from)+1||array.length);array.length=from<0?array.length+from:from;return array.push.apply(array,rest)},has:function(q){var t=[];this.each(function(el){x$(q).each(function(hel){if(hel==el){t.push(el)}})});this.elements=t;return this},not:function(q){var list=this.elements;for(var i=0;i<list.length;i++){x$(q).each(function(hel){if(list[i]==hel){this.elements=this.removex(list,list.indexOf(list[i]))}})}return this},add:function(q){this.find([q]);this.elements=this.reduce(this.elements);return this},first:function(){return this.elements[0]},each:function(fn){for(var i=0,len=this.elements.length;i<len;++i){fn.call(this,this.elements[i])}return this}};var Dom={inner:function(html){return this.html("inner",html)},outer:function(html){return this.html("outer",html)},top:function(html){return this.html("top",html)},bottom:function(html){return this.html("bottom",html)},remove:function(){return this.html("remove")},html:function(location,html){var getTag=function(el){if(el.firstChild==null){switch(el.tagName){case"UL":return"LI";break;case"DL":return"DT";break;case"TR":return"TD";break;default:return el.tagName}}return el.firstChild.tagName};var wrap=function(xhtml,tag){var attributes={};var re=/^<([A-Z][A-Z0-9]*)([^>]*)>(.*)<\/\1>/i;if(re.test(xhtml)){result=re.exec(xhtml);tag=result[1];if(result[2]!=""){var attrList=result[2].split(/([A-Z]*\s*=\s*['|"][A-Z0-9:;#\s]*['|"])/i);for(var i=0;i<attrList.length;i++){var attr=attrList[i].replace(/^\s*|\s*$/g,"");if(attr!=""&&attr!=" "){var node=attr.split("=");attributes[node[0]];attributes[node[0]]=node[1].replace(/(["']?)/g,"")}}}xhtml=result[3]}var element=document.createElement(tag);for(var x in attributes){var a=document.createAttribute(x);a.nodeValue=attributes[x];element.setAttributeNode(a)}element.innerHTML=xhtml;return element};this.clean();if(arguments.length==1&&arguments[0]!="remove"){html=location;location="inner"}this.each(function(el){switch(location){case"inner":if(typeof html=="string"){el.innerHTML=html;var list=el.getElementsByTagName("SCRIPT");var len=list.length;for(var i=0;i<len;i++){eval(list[i].text)}}else{el.innerHTML="";el.appendChild(html)}break;case"outer":if(typeof html=="string"){html=wrap(html,getTag(el))}el.parentNode.replaceChild(html,el);break;case"top":if(typeof html=="string"){html=wrap(html,getTag(el))}el.insertBefore(html,el.firstChild);break;case"bottom":if(typeof html=="string"){html=wrap(html,getTag(el))}el.insertBefore(html,null);break;case"remove":var parent=el.parentNode;parent.removeChild(el);break}});return this},clean:function(){var ns=/\S/;this.each(function(el){var d=el,n=d.firstChild,ni=-1;while(n){var nx=n.nextSibling;if(n.nodeType==3&&!ns.test(n.nodeValue)){d.removeChild(n)}else{n.nodeIndex=++ni}n=nx}});return this}};var Event={click:function(fn){return this.on("click",fn)},load:function(fn){return this.on("load",fn)},touchstart:function(fn){return this.on("touchstart",fn)},touchmove:function(fn){return this.on("touchmove",fn)},touchend:function(fn){return this.on("touchend",fn)},touchcancel:function(fn){return this.on("touchcancel",fn)},gesturestart:function(fn){return this.on("gesturestart",fn)},gesturechange:function(fn){return this.on("gesturechange",fn)},gestureend:function(fn){return this.on("gestureend",fn)},orientationchange:function(fn){return this.on("orientationchange",fn)},on:function(type,fn){var listen=function(el){if(window.addEventListener){el.addEventListener(type,fn,false)}};this.each(function(el){listen(el)});return this}};var Style={setStyle:function(prop,val){this.each(function(el){el.style[prop]=val});return this},getStyle:function(prop,callback){var gs=function(el,p){return document.defaultView.getComputedStyle(el,"").getPropertyValue(p)};if(callback==undefined){return gs(this.first(),prop)}this.each(function(el){callback(gs(el,prop))});return this},addClass:function(className){var that=this;var hasClass=function(el,className){var re=that.getClassRegEx(className);return re.test(el.className)};this.each(function(el){if(hasClass(el,className)==false){el.className+=" "+className}});return this},removeClass:function(className){if(className==undefined){this.each(function(el){el.className=""})}else{var re=this.getClassRegEx(className);this.each(function(el){el.className=el.className.replace(re," ")})}return this},css:function(o){var that=this;this.each(function(el){for(var prop in o){that.setStyle(prop,o[prop])}});return this||that},reClassNameCache:{},getClassRegEx:function(className){var re=this.reClassNameCache[className];if(!re){re=new RegExp("(?:^|\\s+)"+className+"(?:\\s+|$)");this.reClassNameCache[className]=re}return re}};var Fx={tween:function(options){if(options instanceof Array){for(var i=0;i<options.length;i++){this.animationStack.push(options[i])}}else{if(options instanceof Object){this.animationStack.push(options)}}this.start();return this},animationStack:[],start:function(){var t=0;for(var i=0;i<this.animationStack.length;i++){var options=this.animationStack[i];var duration=options.duration==undefined?0.5:options.duration;setTimeout(function(s,o){s.animate(o)},t*1000*duration,this,options);t+=duration}return this},animate:function(options){var that=this;var opt_after=options.after;var easing=(options.easing==undefined)?"ease-in":options.easing;var before=(options.before==undefined)?function(){}:options.before;var after=(opt_after==undefined)?function(){}:function(){opt_after.apply(that)};var duration=(options.duration==undefined)?0.5:options.duration;var translate=options.by;var rotate=options.rotate;options.easing=options.rotate=options.by=options.before=options.after=options.duration=undefined;before.apply(before.arguments);this.setStyle("-webkit-transition","all "+duration+"s "+easing);this.each(function(el){for(var prop in options){that.setStyle(prop,options[prop])}if(translate){that.setStyle("-webkit-transform",that.translateOp(translate[0],translate[1]))}});setTimeout(function(){that.setStyle("-webkit-transition","none")},duration*1000);setTimeout(function(){that.setStyle("-webkit-transform","none")},duration*1000);setTimeout(after,duration*1000);return this||that},translateOp:function(xPixels,yPixels){return"translate("+xPixels+"px, "+yPixels+"px)"},rotateOp:function(axis,degree){return"rotate"+axis+"("+degree+"deg)"}};var Xhr={xhr:function(url,options){if(options==undefined){var options={}}var that=this;var req=new XMLHttpRequest();var method=options.method||"get";var async=options.async||false;var params=options.data||null;req.open(method,url,async);if(options.headers){var i=0;for(i=0;i<options.headers.length;i++){req.setRequestHeader(options.headers[i].name,options.headers[i].value)}}req.onload=(options.callback!=null)?options.callback:function(){that.html(this.responseText)};req.send(params);return this},xhrjson:function(url,options){if(options==undefined){return this}var that=this;var cb=options.callback;if(typeof cb!="function"){cb=function(x){return x}}var callback=function(){var o=eval("("+this.responseText+")");for(var prop in o){x$(options.map[prop]).html(cb(o[prop]))}};options.callback=callback;this.xhr(url,options);return this}};var libs=[Dom,Event,Style,Fx,Xhr];for(var i=0,size=libs.length;i<size;i++){_$.extend(libs[i])}var xui=window.x$=function(){return new _$(arguments)}})();

function resizeView(){
	
	var windowWidth = window.innerWidth;
	var windowHeight = window.innerHeight;
	
	if(windowHeight<maxWindowHeight){
		
		document.getElementById('header').style.height = "40px";
		document.getElementById('header').style.paddingBottom = "0px";
		
		document.getElementById('feedName').style.height = "20px";
		document.getElementById('feedName').style.marginTop = "0px";
		
		document.getElementById('selectorTestata').style.marginBottom = "0px";
		document.getElementById('selectorTestata').style.marginLeft = "0px";
		document.getElementById('selectorTestata').style.marginRight = "0px";
		document.getElementById('selectorTestata').style.marginTop = "0px";
		
		document.getElementById('imgLogo').style.width = "60%";
		document.getElementById('imgLogo').style.maxWidth = "100px";
		document.getElementById('imgLogo').style.margin = "0px";
		document.getElementById('imgLogo').style.padding = "0px";
		document.getElementById('feedName').style.fontSize = "10pt";
		//document.getElementById('imgLogo').style.marginTop = "-20px";
		//document.getElementById('imgLogo').style.float = "left";
		
		document.getElementById('todaysDate').style.height = "15px";
		document.getElementById('todaysDate').style.marginTop = "2px";
		document.getElementById('todaysDate').style.fontSize = "7pt";
		
		
		document.getElementById('StackLayout').style.marginTop = "40px";
		
		document.getElementById('olderArticlesLabel').style.marginTop = "5px";
		
		document.getElementById('listRowTemplate').style.height = "40px";
		//document.getElementById('listRowTemplate').style.backgroundColor = "yellow";
		
		document.getElementById('headlineTitle').style.marginTop = "0px";
		document.getElementById('headlineTitle').style.bottom = "0px";
		document.getElementById('headlineTitle').style.top = "0px";
		document.getElementById('headlineTitle').style.fontSize = "10pt";
		document.getElementById('headlineTitle').style.height = "15px";
		//document.getElementById('headlineTitle').style.backgroundColor = "red";
		
		document.getElementById('arrow').style.top = "15px";
		
		document.getElementById('headlineDescription').style.top = "15px";
		document.getElementById('headlineDescription').style.height = "20px";
		document.getElementById('headlineDescription').style.fontSize = "7pt";
		//document.getElementById('headlineDescription').style.backgroundColor = "green";
		
		document.getElementById('secondHeadlines').style.height = "0px";
		document.getElementById('secondHeadlines').style.overflow = "hidden";
		
		document.getElementById('footer').style.minHeight = "0px";
		document.getElementById('footer').style.marginTop = "2px";
		document.getElementById('footer').style.fontSize = "7pt";
		
		document.getElementById('olderArticlesLabel').style.lineHeight = "0px";
		
		document.getElementById('listRowTemplate1').style.height = "0px";
		
		document.getElementById('secondHeadlineTitle').style.height = "0px";
		document.getElementById('secondHeadlineTitle').style.top = "0px";
		document.getElementById('secondHeadlineTitle').style.bottom = "0px";
		
		document.getElementById('arrow1').style.height = "0px";
		document.getElementById('arrow1').style.top = "0px";
		
		
		document.getElementById('secondHeadlineSplitter').style.top = "0px";
		
		
		
		document.getElementById('articleTitle').style.marginTop = "5px";
		document.getElementById('articleTitle').style.minHeight = "0px";
		document.getElementById('articleTitle').style.height = "15px";
		document.getElementById('articleTitle').style.fontSize = "9pt";
		
		document.getElementById('articleDescription').style.fontSize = "8pt";
		
		document.getElementById('navigation').style.height = "20px";
		document.getElementById('navigation').style.minHeight = "20px";
		
		
		document.getElementById('backToHeadlines').style.height = "20px";
		document.getElementById('image1').style.height = "100%";
		
		document.getElementById('share').style.height = "20px";
		document.getElementById('image2').style.height = "100%";
		
		document.getElementById('readLess').style.height = "20px";
		document.getElementById('image3').style.height = "100%";
		
		document.getElementById('readMore').style.height = "20px";
		document.getElementById('image4').style.height = "100%";
		
	
		
		
		
		
		
		
	
		document.getElementById('footer').style.marginTop = "0px";
		document.getElementById('footer').style.height = "15px";
	
	}
}

