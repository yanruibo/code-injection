















function MM_swapImgRestore() { //v3.0
  var i,x,a=document.MM_sr; for(i=0;a&&i<a.length&&(x=a[i])&&x.oSrc;i++) x.src=x.oSrc;
}
function MM_preloadImages() { //v3.0
  var d=document; if(d.images){ if(!d.MM_p) d.MM_p=new Array();
    var i,j=d.MM_p.length,a=MM_preloadImages.arguments; for(i=0; i<a.length; i++)
    if (a[i].indexOf("#")!=0){ d.MM_p[j]=new Image; d.MM_p[j++].src=a[i];}}
}

function MM_findObj(n, d) { //v4.01
  var p,i,x;  if(!d) d=document; if((p=n.indexOf("?"))>0&&parent.frames.length) {
    d=parent.frames[n.substring(p+1)].document; n=n.substring(0,p);}
  if(!(x=d[n])&&d.all) x=d.all[n]; for (i=0;!x&&i<d.forms.length;i++) x=d.forms[i][n];
  for(i=0;!x&&d.layers&&i<d.layers.length;i++) x=MM_findObj(n,d.layers[i].document);
  if(!x && d.getElementById) x=d.getElementById(n); return x;
}

function MM_swapImage() { //v3.0
  var i,j=0,x,a=MM_swapImage.arguments; document.MM_sr=new Array; for(i=0;i<(a.length-2);i+=3)
   if ((x=MM_findObj(a[i]))!=null){document.MM_sr[j++]=x; if(!x.oSrc) x.oSrc=x.src; x.src=a[i+2];}
}




$(document).ready(function() {
	
	$("#larm")
   .bind("touchstart", function () {
     $(this).addClass("fake-active");
   })
	.bind("touchend",
	 function() {
		var $this = $(this);
		$this.removeClass("fake-active");
	 });
	
	$("#hitta")
	 .bind("touchstart", function () {
			 $(this).addClass("fake-active");
	 })
	.bind("touchend",
	 function() {
		var $this = $(this);
		$this.removeClass("fake-active");
	 });
	
	$("#info")
	 .bind("touchstart", function () {
			 $(this).addClass("fake-active");
	 })
	.bind("touchend",
	 function() {
		var $this = $(this);
		$this.removeClass("fake-active");
	 });
	
	$("#btn_back")
	 .bind("touchstart", function () {
			 $(this).addClass("fake-active");
	 })
	 .bind("touchend",
	 function() {
		var $this = $(this);
		$this.removeClass("fake-active");
	 });
	
	$("#btn_listv")
	 .bind("touchstart", function () {
			 $(this).addClass("fake-active");
	 })
	
	.bind("touchend",
	 function() {
		var $this = $(this);
		$this.removeClass("fake-active");
	 });
	
	$("#btn_karat")
	 .bind("touchstart", function () {
			 $(this).addClass("fake-active");
	 })
	
	.bind("touchend",
	 function() {
		var $this = $(this);
		$this.removeClass("fake-active");
	 });
	
	$("#btn_till")
	 .bind("touchstart", function () {
			 $(this).addClass("fake-active");
	 })
	
	.bind("touchend",
	 function() {
		var $this = $(this);
		$this.removeClass("fake-active");
	 });
	
	$("#btn_hem")
	 .bind("touchstart", function () {
			 $(this).addClass("fake-active");
	 })
	
	.bind("touchend",
	 function() {
		var $this = $(this);
		$this.removeClass("fake-active");
	 });
	
	$("#btn_alley")
	 .bind("touchstart", function () {
			 $(this).addClass("fake-active");
	 })
	
	.bind("touchend",
	 function() {
		var $this = $(this);
		$this.removeClass("fake-active");
	 });
	
	$("#btn_alleylist")
	 .bind("touchstart", function () {
			 $(this).addClass("fake-active");
	 })
	
	.bind("touchend",
	 function() {
		var $this = $(this);
		$this.removeClass("fake-active");
	 });
	
	$("#listcell")
	 .bind("touchstart", function () {
			 $(this).addClass("fake-active");
	 })
	
	.bind("touchend",
	 function() {
		var $this = $(this);
		$this.removeClass("fake-active");
	 });
	
	$("#BowlTips")
	 .bind("touchstart", function () {
			 $(this).addClass("fake-active");
	 })
	
	.bind("touchend",
	 function() {
		var $this = $(this);
		$this.removeClass("fake-active");
	 });
	
	$("#btn_fb")
	 .bind("touchstart", function () {
			 $(this).addClass("fake-active");
	 })
	
	.bind("touchend",
	 function() {
		var $this = $(this);
		$this.removeClass("fake-active");
	 });
 
	$('#searchmap').click(function () {
		//$(item).append("<p class='text'>"+text+"</p>");
		$("#listfor").val("map");
	});
	$('#text_field').click(function () {
		//$(item).append("<p class='text'>"+text+"</p>");
		$("#listfor").val("list");
	});
	$('#map').live( 'pageshow',function(event, ui){
  	initialize();
	});
	$('#listview').live( 'pageshow',function(event, ui){
  	initialize();
	});
		
	$.getJSON("http://app.columbird.se/gobowling/lar-mig-bowla/?json=1&callback=?",function(larmig) { 
		//$("#lmhead").html(larmig.page.title);
		$("#larmessage").html(larmig.page.content);
		$("#hideme").css('display','none');
		
	});
	$.getJSON("http://app.columbird.se/gobowling/info/?json=1&callback=?",function(info) { 
		//$("#lmhead").html(larmig.page.title);		
		$("#info_content1").html(info.page.content);
		$("#info_content2").html(info.page.content);
		$("#info_content3").html(info.page.content);
		$("#info_content4").html(info.page.content);
		$("#info_content5").html(info.page.content);									
	});
	

					
//-------------- facebook ---------------//
	$('#btn_fb').live("touchstart", function() {
		facebookWallPost();
	});
	

  if ((typeof cordova == 'undefined') && (typeof Cordova == 'undefined')) alert('Cordova variable does not exist. Check that you have included cordova.js correctly');
            if (typeof CDV == 'undefined') alert('CDV variable does not exist. Check that you have included cdv-plugin-fb-connect.js correctly');
            if (typeof FB == 'undefined') alert('FB variable does not exist. Check that you have included the Facebook JS SDK file.');
            
            FB.Event.subscribe('auth.login', function(response) {
                               alert('auth.login event');
                               });
            
            FB.Event.subscribe('auth.logout', function(response) {
                               alert('auth.logout event');
                               });
            
            FB.Event.subscribe('auth.sessionChange', function(response) {
                               alert('auth.sessionChange event');
                               });
            
            FB.Event.subscribe('auth.statusChange', function(response) {
                               alert('auth.statusChange event');
                               });
            
            function getLoginStatus() {
                FB.getLoginStatus(function(response) {
                                  if (response.status == 'connected') {
                                  alert('logged in');
                                  } else {
                                  alert('not logged in');
                                  }
                                  });
            }
            var friendIDs = [];
						var fdata;
            function me() {
                FB.api('/me/friends', { fields: 'id, name, picture' },  function(response) {
                       if (response.error) {
                       alert(JSON.stringify(response.error));
                       } else {
                       var data = document.getElementById('data');
					   fdata=response.data;
					   console.log("fdata: "+fdata);
                       response.data.forEach(function(item) {
                                             var d = document.createElement('div');
                                             d.innerHTML = "<img src="+item.picture+"/>"+item.name;
                                             data.appendChild(d);
                                             });
                       }
					var friends = response.data;
					console.log(friends.length); 
					for (var k = 0; k < friends.length && k < 200; k++) {
				        var friend = friends[k];
				        var index = 1;

				        friendIDs[k] = friend.id;
				        //friendsInfo[k] = friend;
					}
					console.log("friendId's: "+friendIDs);
                       });
            }
            
            function logout() {
                FB.logout(function(response) {
                          alert('logged out');
                          });
            }
            
            function login() {
                FB.login(
                         function(response) {
                         if (response.session) {
                         alert('logged in');
                         } else {
                         alert('not logged in');
                         }
                         },
                         { scope: "email" }
                         );
            }
			
			
			function facebookWallPost() {
			    console.log('Debug 1');
				var params = {
				    method: 'feed',
				    name: 'Lets go Bowling',
				    link: 'http://www.gobowling.se/',
				    picture: 'http://kund.columbird.se/sbhf/img_logo@2x.png',
				    caption: 'Lets go Bowling',
				    description: 'Jag använder Go Bowling appen för att hitta min närmsta bowlinghall, gör det du också. För mer information om appen besök www.gobowling.se.'
				  };
				console.log(params);
			    FB.ui(params, function(obj) { console.log(obj);});
			}
            
			function publishStoryFriend() {
				randNum = Math.floor ( Math.random() * friendIDs.length ); 

				var friendID = friendIDs[randNum];
				if (friendID == undefined){
					alert('please click the me button to get a list of friends first');
				}else{
			    	console.log("friend id: " + friendID );
			        console.log('Opening a dialog for friendID: ', friendID);
			        var params = {
			        	method: 'feed',
			            to: friendID.toString(),
			            name: 'Let\'s go Bowling',
			            link: 'http://www.svenskbowling.se/',
			            picture: 'http://kund.columbird.se/sbhf/img_logo@2x.png',
			            caption: 'Let\'s go Bowling',
			            description: 'Jag använder Go Bowling appen för att hitta min närmsta bowlinghall, gör det du också. För mer information om appen besök www.gobowling.se.'
			     	};
					FB.ui(params, function(obj) { console.log(obj);});
			    }
			}
            document.addEventListener('deviceready', function() {
							try {
							//alert('Device is ready! Make sure you set your app_id below this alert.');
							FB.init({ appId: "105688996226219", nativeInterface: CDV.FB, useCachedDialogs: false });
							//document.getElementById('data').innerHTML = "";
							} catch (e) {
							alert(e);
							}
							}, false);

});




document.addEventListener("deviceready", onDeviceReady, false);

function onDeviceReady() {
	if(navigator.onLine == false){
		$.jqDialog.alert("Denna applikation kräver en internetuppkoppling för att fungera optimalt. Tryck på OK för att fortsätta eller anslut till en fungerande uppkoppling.");
	}
	
	$('#BowlTips').live("touchstart", function() {
			var url= 'http://www.youtube.com/watch?v=6AirAVHMxs4';
				try {
					window.plugins.childBrowser.openExternal(url);
				}
				catch (err){
					alert(err);
				}
		});
		$('#scor').live("touchstart", function(){
			try {
				window.plugins.childBrowser.showWebPage(document.getElementById('scor').rel);
			}
			catch (err){
				alert(err);
			}
		});
		// booking link
		$('#bookon').live("touchstart", function(){
			try {
				window.plugins.childBrowser.showWebPage(document.getElementById('bookon').rel);
			}
			catch (err){
				alert(err);
			}
		});
		
		//open alley webpage
		$('#webad').live("touchstart", function(){
			try {
				window.plugins.childBrowser.showWebPage(document.getElementById('website').rel);
			}
			catch (err){
				alert(err);
			}
		});
		
		$('#hittainfo').live("touchstart", function(){
			try {
				window.plugins.childBrowser.openExternal($('#hittainfo').attr('rel'));
			}
			catch (err){
				alert(err);
			}
		});
	
	var title,id,visitingadress,zipcode,city,phone,fax,email,site,onlinebooking,onlinescoring,locationLat,locationLng;
	
	navigator.geolocation.getCurrentPosition(getLocation, unknownLocation);

  function getLocation(pos)
  {
    var latitde = pos.coords.latitude;
    var longitude = pos.coords.longitude;
	}
  function unknownLocation(){
    alert('Could not find location');
  }
}



	touchMove = function(event) {
	event.preventDefault();
	}



var myScroll;
var list;

function loaded() {
	myScroll = new iScroll('lmlist', { checkDOMChanges: true, hideScrollbar: true });
	myScrolla = new iScroll('info_contenta', { checkDOMChanges: true, hideScrollbar: true });
	myScrollb = new iScroll('info_contentb', { checkDOMChanges: true, hideScrollbar: true });
	myScrollc = new iScroll('info_contentc', { checkDOMChanges: true, hideScrollbar: true });
	myScrolld = new iScroll('info_contentd', { checkDOMChanges: true, hideScrollbar: true });
	myScrolle = new iScroll('info_contente', { checkDOMChanges: true, hideScrollbar: true });
	list = new iScroll('listbox', { checkDOMChanges: true, hideScrollbar: true });
}

document.addEventListener('DOMContentLoaded', loaded, false);


function testinfo2(id){
	$("#alyname").html(window.localStorage.getItem("title"+id));
	$("#aid").html(window.localStorage.getItem("visitingadress"+id));
	$("#zip").html(window.localStorage.getItem("zipcode"+id));
	$("#city").html(window.localStorage.getItem("city"+id));				
	$("#tel").html("Tel : <a href=\"tel:"+window.localStorage.getItem("phone"+id)+"\">"+window.localStorage.getItem("phone"+id)+"</a>");
	$("#fax").html("Fax : "+window.localStorage.getItem("fax"+id));
	$("#email").html("E-post : <a href=\"mailto:"+window.localStorage.getItem("email"+id)+"\">"+window.localStorage.getItem("email"+id)+"</a>");
	$("#webad").html(window.localStorage.getItem("site"+id));
	$('#webad').css('margin-top','15px');
	
	if(window.localStorage.getItem("onlinebooking"+id) == ""){
		var ele = document.getElementById("info_bok");	
		ele.style.display = "none";
	}else{
		var ele = document.getElementById("info_bok");	
		ele.style.display = "block";
	}
	
	if(window.localStorage.getItem("onlinescoring"+id) == ""){
		var eles = document.getElementById("info_scoring");	
		eles.style.display = "none";
	}else{
		var eles = document.getElementById("info_scoring");	
		eles.style.display = "block";
	}
	
	document.getElementById('bookon').rel = ""+window.localStorage.getItem("onlinebooking"+id)+"";
	document.getElementById('scor').rel = ""+window.localStorage.getItem("onlinescoring"+id)+"";
	$('#hittainfo').attr({rel: 'http://maps.google.com/maps?daddr='+window.localStorage.getItem("locationLat"+id)+','+window.localStorage.getItem("locationLng"+id)});

	document.getElementById('website').rel = "http://"+window.localStorage.getItem("site"+id)+"";
//	$('#emaillink').href = "mailto:"+window.localStorage.getItem("email"+id)+"";
									
	$("#smallmap").html("<img src='http://maps.google.com/staticmap?center="+window.localStorage.getItem("locationLat"+id)+","+window.localStorage.getItem("locationLng"+id)+"&zoom=15&size=273x111&maptype=mobile&markers="+window.localStorage.getItem("locationLat"+id)+","+window.localStorage.getItem("locationLng"+id)+",red&key=ABQIAAAAqQJ-gFBKUbBLaFN1HQF4KBQ_k2Fxd8XZtbWUsvz5Vrarxzf2SRSh7DRXLQmAZ-6XwtrmMhkINGT27A&sensor=false' />");
}

	
	function initialize() {

		if (navigator.geolocation) {
				navigator.geolocation.getCurrentPosition(function(position) {	
						
				var checkval = document.getElementById("chkv").value;	
						//alert(checkval);
																			
							var pos = new google.maps.LatLng(position.coords.latitude,position.coords.longitude);
							var myIcon = new google.maps.MarkerImage("imgs/Elements/img_mappin@2x.png",null,null,null,new google.maps.Size(32,41));
							var myOptions = {
							  zoom: 13,
							  center: new google.maps.LatLng(position.coords.latitude,position.coords.longitude),
							  mapTypeId: google.maps.MapTypeId.ROADMAP,
							  sensor: 'true'						  
							}						 
						var map = new google.maps.Map(document.getElementById("map_canvas"), myOptions);
				$('#btn_alley').click(function() {
					if (navigator.geolocation) {
						
						navigator.geolocation.getCurrentPosition(function(position) {								
						var poss = new google.maps.LatLng(position.coords.latitude,position.coords.longitude);			
							var myOptions = {
									zoom: 8,
									center: new google.maps.LatLng(position.coords.latitude,position.coords.longitude),
									mapTypeId: google.maps.MapTypeId.ROADMAP,
									sensor: 'true'						  
							}							
							var markere = new google.maps.Marker({
								map:map,
								position: poss								
							  });
							google.maps.event.addListener(markere, 'click');	
							map.setCenter(poss);						
						});					
					}
				});
				$('#btn_alleylist').click(function() {					
					if (navigator.geolocation) {
						navigator.geolocation.getCurrentPosition(function(position) {								
						var poss = new google.maps.LatLng(position.coords.latitude,position.coords.longitude);			
							
							var myOptions = {
									zoom: 13,
									center: new google.maps.LatLng(position.coords.latitude,position.coords.longitude),
									mapTypeId: google.maps.MapTypeId.ROADMAP,
									sensor: 'true'						  
							}							
							
							var markere = new google.maps.Marker({
								map:map,
								position: poss
							});			 
							
						google.maps.event.addListener(markere, 'click');
							google.maps.event.trigger(map, 'resize');
							map.setCenter(poss);						
						});					
					}
       		 		});
						//--------------------------------------------------------------------------------------------------------------------//											
						$.mobile.pageLoading(); 
						
							$.getJSON('http://www.sbhf.se/-feed/center?jsonp=?', function(data) {
								
								var titles = JSON.stringify(data.items);
							
							$('#searchmap').jsonSuggest(titles, {onSelect:callback});
							$('#text_field').jsonSuggest(titles, {onSelect:nullret});			

							function callback() {
								var lat = document.getElementById('lat').value;
								var lon = document.getElementById('lon').value;
								var posnew = new google.maps.LatLng(lat,lon);
								var myOptions = {
									zoom: 13,
									center: new google.maps.LatLng(position.coords.latitude,position.coords.longitude),
									mapTypeId: google.maps.MapTypeId.ROADMAP,
									sensor: 'true'
								}
								map.setCenter(posnew,13);
						 	}
						function nullret(){ }
						var infoBox;	
						//--------------------------------------------------------------------------------------------------------------------//
						$.each( data.items, function(i, marker) {
							var posi = new google.maps.LatLng(marker.locationLat, marker.locationLng);
							var iWindowHTML = "<a data-transition=\"pop\" href=\"index.html#hhd\" onClick=\"testinfo2("+marker.id+");\"><div id=\"infopos\" style=\"width:251px; height:59px; position:absolute\"><div id=\"backpopup\"><img src=\"imgs/Elements/img_mapinfosquare@2x.png\" width=\"251\" height=\"59\"></div><div id=\"smlogo\"></div><div id=\"namealy\">"+marker.title+"</div></div></a>"; 
							var marker = new google.maps.Marker({
								position: new google.maps.LatLng(marker.locationLat, marker.locationLng),
								map: map,
								icon:myIcon,
								id:marker.id
							});
							
							google.maps.event.addListener(marker, "click", function(e) {
								InfoBox.prototype.createElement = function() {
										var panes = this.getPanes();
										var div = this.div_;
										if (!div) {																		
										div = this.div_ = document.createElement("div");
										div.style.width = "251px";
										div.style.height = "59px";
										div.style.backgroundsize ="contain";
										var contentDiv = document.createElement("div");
										contentDiv.style.padding = "100px 0 0 0px"
										div.style.position = "absolute";
										contentDiv.innerHTML= this.html;
										var topDiv = document.createElement("div");
										topDiv.style.textAlign = "right";
									
										google.maps.event.addDomListener(map,'click', removeInfoBox(this));																	
											div.appendChild(topDiv);
											div.appendChild(contentDiv);
											panes.floatPane.appendChild(div);
											
										this.panMap();
										} else if (div.parentNode != panes.floatPane) {
											div.parentNode.removeChild(div);
										} else {
									}
							}
							removeInfoBox(this);									
							infoBox = new InfoBox({latlng:posi, map:map, html:iWindowHTML});													  
							});																							
						});						
						$.mobile.pageLoading(true);						
					});
					
					if(checkval == 'emty'){
						$.getJSON('http://www.sbhf.se/-feed/center?jsonp=?', function(data) {
							$.each( data.items, function(i, marker) {
							window.localStorage.setItem("id"+marker.id, marker.id);
							window.localStorage.setItem("title"+marker.id, marker.title);
							window.localStorage.setItem("visitingadress"+marker.id, marker.visitingadress);
							window.localStorage.setItem("zipcode"+marker.id, marker.zipcode);
							window.localStorage.setItem("phone"+marker.id, marker.phone);
							window.localStorage.setItem("fax"+marker.id, marker.fax);
							window.localStorage.setItem("email"+marker.id, marker.email);
							window.localStorage.setItem("site"+marker.id, marker.site);
							window.localStorage.setItem("onlinebooking"+marker.id, marker.onlinebooking);
							window.localStorage.setItem("onlinescoring"+marker.id, marker.onlinescoring);
							window.localStorage.setItem("locationLat"+marker.id, marker.locationLat);
							window.localStorage.setItem("locationLng"+marker.id, marker.locationLng);
							
							var namealy=marker.title.substr(0,32);
							$("#listing").append("<a href='#hhd' data-transition='none' onClick='testinfo2("+ marker.id +");'><div id='listcell'><div class='fontlistname'>"+namealy+"</div><div id='lstarrow'><img src='imgs/Elements/img_tabcellarrow@2x.png' width='29.5' height='27.5'></div></div></a>");
							});
						});
						document.getElementById("chkv").value = "visited";
					}else{						
					}
					var map = new google.maps.Map(document.getElementById("map_canvas"), myOptions);					
				});
			}
		}
						



	$('#popup').hide();
	$('#popup2').hide()
	$('#popup3').hide();
	$('#popup34').hide();
	$('#popup4').hide();

	$(".pop").live("touchstart", function () {
		$('#popup').toggle();
	});
	$(".closepop").live("touchstart", function () {
		$('#popup').hide();
	});
	$(".pop2").live("touchstart", function () {
		$('#popup2').toggle();
	});
	$(".closepop2").live("touchstart", function () {
		$('#popup2').hide();
	});

	$(".pop3").live("touchstart", function () {
		$('#popup3').toggle();
	});
	$(".closepop3").live("touchstart", function () {
		$('#popup3').hide();
	});

	$(".pop34").live("touchstart", function () {
		$('#popup34').toggle();
	});
	$(".closepop34").live("touchstart", function () {
		$('#popup34').hide();
	});

	$(".pop4").live("touchstart", function () {
		$('#popup4').toggle();
	});
	$(".closepop4").live("touchstart", function () {
		$('#popup4').hide();
	});
	

/**
 * jQuery gMap
 *
 * @url		http://gmap.nurtext.de/
 * @author	Cedric Kastner <cedric@nur-text.de>
 * @version	1.1.0
 */
(function($)
{
	// Main plugin function
	$.fn.gMap = function(options)
	{
		// Check if the browser is compatible
		if (!window.GBrowserIsCompatible || !GBrowserIsCompatible()) return this;
		
		// Build main options before element iteration
		var opts = $.extend({}, $.fn.gMap.defaults, options);
    	
		// Iterate through each element
		return this.each(function()
		{
			// Create map and set initial options
			$gmap = new GMap2(this);
			
			// Create new object to geocode addresses
			$geocoder = new GClientGeocoder();
			
			// Check for address to center on
			if (opts.address)
			{ 
				// Get coordinates for given address and center the map
				$geocoder.getLatLng(opts.address, function(gpoint){ $gmap.setCenter(gpoint, opts.zoom); });
				
			}
			else
			{
				// Check for coordinates to center on
				if (opts.latitude && opts.longitude)
				{
					// Center map to coordinates given by option
					$gmap.setCenter(new GLatLng(opts.latitude, opts.longitude), opts.zoom);
					
				}
				else
				{
					// Check for a marker to center on (if no coordinates given)
					if ($.isArray(opts.markers) && opts.markers.length > 0)
					{
						// Check if the marker has an address
						if (opts.markers[0].address)
						{
							// Get the coordinates for given marker address and center
							$geocoder.getLatLng(opts.markers[0].address, function(gpoint){ $gmap.setCenter(gpoint, opts.zoom); });
							
						}
						else
						{
							// Center the map to coordinates given by marker
							$gmap.setCenter(new GLatLng(opts.markers[0].latitude, opts.markers[0].longitude), opts.zoom);
							
						}
						
						
					}
					else
					{
						// Revert back to world view
						$gmap.setCenter(new GLatLng(34.885931, 9.84375), opts.zoom);
						
					}
					
				}
				
			}
						
			// Set the preferred map type
			$gmap.setMapType(opts.maptype);
			
			// Check for map controls
			if (opts.controls.length == 0)
			{
				// Default map controls
				$gmap.setUIToDefault();
				
			}
			else
			{
				// Add custom map controls
				for (var i = 0; i < opts.controls.length; i++)
				{
					// Eval is evil
					eval('$gmap.addControl(new ' + opts.controls[i] + '());');
					
				}
				
			}
						
			// Check if scrollwheel should be enabled
			if (opts.scrollwheel == true && opts.controls.length != 0) { $gmap.enableScrollWheelZoom(); }
									
			// Loop through marker array
			for (var j = 0; j < opts.markers.length; j++)
			{
				// Get the options from current marker
				marker = opts.markers[j];
								
				// Create new icon
				gicon = new GIcon();
				
				// Set icon properties from global options
				gicon.image = opts.icon.image;
				gicon.shadow = opts.icon.shadow;
				gicon.iconSize = ($.isArray(opts.icon.iconsize)) ? new GSize(opts.icon.iconsize[0], opts.icon.iconsize[1]) : opts.icon.iconsize;
				gicon.shadowSize = ($.isArray(opts.icon.shadowsize)) ? new GSize(opts.icon.shadowsize[0], opts.icon.shadowsize[1]) : opts.icon.shadowsize;
				gicon.iconAnchor = ($.isArray(opts.icon.iconanchor)) ? new GPoint(opts.icon.iconanchor[0], opts.icon.iconanchor[1]) : opts.icon.iconanchor;
				gicon.infoWindowAnchor = ($.isArray(opts.icon.infowindowanchor)) ? new GPoint(opts.icon.infowindowanchor[0], opts.icon.infowindowanchor[1]) : opts.icon.infowindowanchor;
				
				if (marker.icon)
				{
					// Overwrite global options
					gicon.image = marker.icon.image;
					gicon.shadow = marker.icon.shadow;
					gicon.iconSize = ($.isArray(marker.icon.iconsize)) ? new GSize(marker.icon.iconsize[0], marker.icon.iconsize[1]) : marker.icon.iconsize;
					gicon.shadowSize = ($.isArray(marker.icon.shadowsize)) ? new GSize(marker.icon.shadowsize[0], marker.icon.shadowsize[1]) : marker.icon.shadowsize;
					gicon.iconAnchor = ($.isArray(marker.icon.iconanchor)) ? new GPoint(marker.icon.iconanchor[0], marker.icon.iconanchor[1]) : marker.icon.iconanchor;
					gicon.infoWindowAnchor = ($.isArray(marker.icon.infowindowanchor)) ? new GPoint(marker.icon.infowindowanchor[0], marker.icon.infowindowanchor[1]) : marker.icon.infowindowanchor;
					
				}
				
				// Check if address is available
				if (marker.address)
				{
					// Check for reference to the marker's address
					if (marker.html == '_address') { marker.html = marker.address; }
					
					// Get the point for given address
					$geocoder.getLatLng(marker.address, function(gicon, marker)
					{
						// Since we're in a loop, we need a closure when dealing with event handlers, return functions, etc.
						// See <http://www.mennovanslooten.nl/blog/post/62> for more information about closures
						return function(gpoint)
						{
							// Create marker
							gmarker = new GMarker(gpoint, gicon);
							
							// Set HTML and check if info window should be opened
							if (marker.html) { gmarker.bindInfoWindowHtml(opts.html_prepend + marker.html + opts.html_append); }
							if (marker.html && marker.popup) { gmarker.openInfoWindowHtml(opts.html_prepend + marker.html + opts.html_append); }
							
							// Add marker to map
							if (gmarker) { $gmap.addOverlay(gmarker); }
						}
						
					}(gicon, marker));
					
				}
				else
				{
					// Check for reference to the marker's latitude/longitude
					if (marker.html == '_latlng') { marker.html = marker.latitude + ', ' + marker.longitude; }
					
					// Create marker
					gmarker = new GMarker(new GPoint(marker.longitude, marker.latitude), gicon);
					
					// Set HTML and check if info window should be opened
					if (marker.html) { gmarker.bindInfoWindowHtml(opts.html_prepend + marker.html + opts.html_append); }
					if (marker.html && marker.popup) { gmarker.openInfoWindowHtml(opts.html_prepend + marker.html + opts.html_append); }
						
					// Add marker to map
					if (gmarker) { $gmap.addOverlay(gmarker); }
					
				}
				
			}
			
		});
		
	}
		
	// Default settings
	$.fn.gMap.defaults =
	{
		address:				'',
		latitude:				0,
		longitude:				0,
		zoom:					1,
		markers:				[],
		controls:				[],
		scrollwheel:			true,
		maptype:				G_NORMAL_MAP,
		html_prepend:			'<div class="gmap_marker">',
		html_append:			'</div>',
		icon:
		{
			image:				"http://www.google.com/mapfiles/marker.png",
			shadow:				"http://www.google.com/mapfiles/shadow50.png",
			iconsize:			[20, 34],
			shadowsize:			[37, 34],
			iconanchor:			[9, 34],
			infowindowanchor:	[9, 2]
			
		}
		
	}
	
})(jQuery);

function InfoBox(opts) {
	google.maps.event.addDomListener(opts.map, removeInfoBox(this));
	
  google.maps.OverlayView.call(this);
  this.latlng_ = opts.latlng;
  this.map_ = opts.map;
  this.offsetVertical_ = -195;
  this.offsetHorizontal_ = -120;
  this.height_ = 59;
  this.width_ = 251;
this.html = opts.html;
  var me = this;
  this.boundsChangedListener_ =
    google.maps.event.addListener(this.map_, "bounds_changed", function() {
      return me.panMap.apply(me);
    });

  // Once the properties of this OverlayView are initialized, set its map so
  // that we can display it.  This will trigger calls to panes_changed and
  // draw.
  this.setMap(this.map_);
}

//this.setMap(null);

/* InfoBox extends GOverlay class from the Google Maps API
 */
 
 
 
InfoBox.prototype = new google.maps.OverlayView();

/* Creates the DIV representing this InfoBox
 */
InfoBox.prototype.remove = function() {
  if (this.div_) {
    this.div_.parentNode.removeChild(this.div_);
    this.div_ = null;
  }
};

/* Redraw the Bar based on the current projection and zoom level
 */
InfoBox.prototype.draw = function() {
  // Creates the element if it doesn't exist already.
  this.createElement();
  if (!this.div_) return;

  // Calculate the DIV coordinates of two opposite corners of our bounds to
  // get the size and position of our Bar
  var pixPosition = this.getProjection().fromLatLngToDivPixel(this.latlng_);
  if (!pixPosition) return;

  // Now position our DIV based on the DIV coordinates of our bounds
  this.div_.style.width = this.width_ + "px";
  this.div_.style.left = (pixPosition.x + this.offsetHorizontal_) + "px";
  this.div_.style.height = this.height_ + "px";
  this.div_.style.top = (pixPosition.y + this.offsetVertical_) + "px";
  this.div_.style.display = 'block';
};

/* Creates the DIV representing this InfoBox in the floatPane.  If the panes
 * object, retrieved by calling getPanes, is null, remove the element from the
 * DOM.  If the div exists, but its parent is not the floatPane, move the div
 * to the new pane.
 * Called from within draw.  Alternatively, this can be called specifically on
 * a panes_changed event.
 */


/* Pan the map to fit the InfoBox.
 */
InfoBox.prototype.panMap = function() {
  // if we go beyond map, pan map
  var map = this.map_;
  var bounds = map.getBounds();
  if (!bounds) return;

  // The position of the infowindow
  var position = this.latlng_;

  // The dimension of the infowindow
  var iwWidth = this.width_;
  var iwHeight = this.height_;

  // The offset position of the infowindow
  var iwOffsetX = this.offsetHorizontal_;
  var iwOffsetY = this.offsetVertical_;

  // Padding on the infowindow
  var padX = 20;
  var padY = 0;

  // The degrees per pixel
  var mapDiv = map.getDiv();
  var mapWidth = mapDiv.offsetWidth;
  var mapHeight = mapDiv.offsetHeight;
  var boundsSpan = bounds.toSpan();
  var longSpan = boundsSpan.lng();
  var latSpan = boundsSpan.lat();
  var degPixelX = longSpan / mapWidth;
  var degPixelY = latSpan / mapHeight;

  // The bounds of the map
  var mapWestLng = bounds.getSouthWest().lng();
  var mapEastLng = bounds.getNorthEast().lng();
  var mapNorthLat = bounds.getNorthEast().lat();
  var mapSouthLat = bounds.getSouthWest().lat();

  // The bounds of the infowindow
  var iwWestLng = position.lng() + (iwOffsetX - padX) * degPixelX;
  var iwEastLng = position.lng() + (iwOffsetX + iwWidth + padX) * degPixelX;
  var iwNorthLat = position.lat() - (iwOffsetY - padY) * degPixelY;
  var iwSouthLat = position.lat() - (iwOffsetY + iwHeight + padY) * degPixelY;

  // calculate center shift
  var shiftLng =
      (iwWestLng < mapWestLng ? mapWestLng - iwWestLng : 0) +
      (iwEastLng > mapEastLng ? mapEastLng - iwEastLng : 0);
  var shiftLat =
      (iwNorthLat > mapNorthLat ? mapNorthLat - iwNorthLat : 0) +
      (iwSouthLat < mapSouthLat ? mapSouthLat - iwSouthLat : 0);

  // The center of the map
  var center = map.getCenter();

  // The new map center
  var centerX = center.lng() - shiftLng;
  var centerY = center.lat() - shiftLat;

  // center the map to the new shifted center
  map.setCenter(new google.maps.LatLng(centerY, centerX),13);

  // Remove the listener after panning is complete.
  google.maps.event.removeListener(this.boundsChangedListener_);
  this.boundsChangedListener_ = null;
};


function removeInfoBox(ib) {
								return function() {
									ib.setMap(null);
									//alert('hh');
								  };
								}
								
								
								

new function(a){var b=a.separator||"&";var c=a.spaces===false?false:true;var d=a.suffix===false?"":"[]";var e=a.prefix===false?false:true;var f=e?a.hash===true?"#":"?":"";var g=a.numbers===false?false:true;jQuery.query=new function(){var a=function(a,b){return a!=undefined&&a!==null&&(!!b?a.constructor==b:true)};var d=function(a){var b,c=/\[([^[]*)\]/g,d=/^([^[]+)(\[.*\])?$/.exec(a),e=d[1],f=[];while(b=c.exec(d[2]))f.push(b[1]);return[e,f]};var e=function(b,c,d){var f,g=c.shift();if(typeof b!="object")b=null;if(g===""){if(!b)b=[];if(a(b,Array)){b.push(c.length==0?d:e(null,c.slice(0),d))}else if(a(b,Object)){var h=0;while(b[h++]!=null);b[--h]=c.length==0?d:e(b[h],c.slice(0),d)}else{b=[];b.push(c.length==0?d:e(null,c.slice(0),d))}}else if(g&&g.match(/^\s*[0-9]+\s*$/)){var i=parseInt(g,10);if(!b)b=[];b[i]=c.length==0?d:e(b[i],c.slice(0),d)}else if(g){var i=g.replace(/^\s*|\s*$/g,"");if(!b)b={};if(a(b,Array)){var j={};for(var h=0;h<b.length;++h){j[h]=b[h]}b=j}b[i]=c.length==0?d:e(b[i],c.slice(0),d)}else{return d}return b};var h=function(a){var b=this;b.keys={};if(a.queryObject){jQuery.each(a.get(),function(a,c){b.SET(a,c)})}else{jQuery.each(arguments,function(){var a=""+this;a=a.replace(/^[?#]/,"");a=a.replace(/[;&]$/,"");if(c)a=a.replace(/[+]/g," ");jQuery.each(a.split(/[&;]/),function(){var a=decodeURIComponent(this.split("=")[0]||"");var c=decodeURIComponent(this.split("=")[1]||"");if(!a)return;if(g){if(/^[+-]?[0-9]+\.[0-9]*$/.test(c))c=parseFloat(c);else if(/^[+-]?[0-9]+$/.test(c))c=parseInt(c,10)}c=!c&&c!==0?true:c;if(c!==false&&c!==true&&typeof c!="number")c=c;b.SET(a,c)})})}return b};h.prototype={queryObject:true,has:function(b,c){var d=this.get(b);return a(d,c)},GET:function(b){if(!a(b))return this.keys;var c=d(b),e=c[0],f=c[1];var g=this.keys[e];while(g!=null&&f.length!=0){g=g[f.shift()]}return typeof g=="number"?g:g||""},get:function(b){var c=this.GET(b);if(a(c,Object))return jQuery.extend(true,{},c);else if(a(c,Array))return c.slice(0);return c},SET:function(b,c){var f=!a(c)?null:c;var g=d(b),h=g[0],i=g[1];var j=this.keys[h];this.keys[h]=e(j,i.slice(0),f);return this},set:function(a,b){return this.copy().SET(a,b)},REMOVE:function(a){return this.SET(a,null).COMPACT()},remove:function(a){return this.copy().REMOVE(a)},EMPTY:function(){var a=this;jQuery.each(a.keys,function(b,c){delete a.keys[b]});return a},load:function(a){var b=a.replace(/^.*?[#](.+?)(?:\?.+)?$/,"$1");var c=a.replace(/^.*?[?](.+?)(?:#.+)?$/,"$1");return new h(a.length==c.length?"":c,a.length==b.length?"":b)},empty:function(){return this.copy().EMPTY()},copy:function(){return new h(this)},COMPACT:function(){function b(c){var d=typeof c=="object"?a(c,Array)?[]:{}:c;if(typeof c=="object"){function e(b,c,d){if(a(b,Array))b.push(d);else b[c]=d}jQuery.each(c,function(c,f){if(!a(f))return true;e(d,c,b(f))})}return d}this.keys=b(this.keys);return this},compact:function(){return this.copy().COMPACT()},toString:function(){var d=0,e=[],g=[],h=this;var i=function(a){a=a+"";if(c)a=a.replace(/ /g,"+");return encodeURIComponent(a)};var j=function(b,c,d){if(!a(d)||d===false)return;var e=[i(c)];if(d!==true){e.push("=");e.push(i(d))}b.push(e.join(""))};var k=function(a,b){var c=function(a){return!b||b==""?[a].join(""):[b,"[",a,"]"].join("")};jQuery.each(a,function(a,b){if(typeof b=="object")k(b,c(a));else j(g,c(a),b)})};k(this.keys);if(g.length>0)e.push(f);e.push(g.join(b));return e.join("")}};return new h(location.search,location.hash)}}(jQuery.query||{})
