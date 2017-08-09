




		$(document).bind("mobileinit", function(){
	  		$.mobile.touchOverflowEnabled = true;
		});
      




var pictureSource;   // picture source
    var destinationType; // sets the format of returned value 
	String.prototype.linkify_tweet = function() {
   var tweet = this.replace(/(^|\s)@(\w+)/g, "$1@<a href='http://www.twitter.com/$2' rel='external'>$2</a>");
   return tweet.replace(/(^|\s)#(\w+)/g, "$1#<a href='http://search.twitter.com/search?q=%23$2' rel='external'>$2</a>");
 };
 
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

    if (states[networkState] === 'No network connection') {
        alert('No network connection detected. Check settings.');
    } else {
       // alert('Connection type: ' + states[networkState]);
    }
}

function onDeviceReady() {
    document.addEventListener("offline", checkConnection, false);
    document.addEventListener("online", checkConnection, false);
	 $('body > *').css({minHeight: window.innerHeight + 'px !important'});
	 $.mobile.fixedToolbars.show(true);
	pictureSource=navigator.camera.PictureSourceType;
        destinationType=navigator.camera.DestinationType;
		
}

function init() {
    document.addEventListener("deviceready", onDeviceReady, false);
	$('.cancel').hide();
	$('.loginb').show();
	$('#homelogged').hide();
	$('#homenotlogged').show();
	$("#rotateButtonU").hide();
	$(".mypicsicon").attr("href", "#page-upload");
}
/*$('.clickPic').click(function() {
 $('#viewImage').remove();
 $('#viewImageContainer').prepend('<img id="viewImage" src="" />');
});**/
$('#page-upload').live('pageinit', function() {
    var oauth;
    var requestParams;
    var options = { 
          consumerKey: 'X10KKHCWvMFNqV0FFtNW1w',
            consumerSecret: 'A55Kbe6aHRHwpfiafbfBpgzjsr4yIP2XcZjt4dK98',
            callbackUrl: 'http://android.ipic.nu/doauth.php' };
    var mentionsId = 0;
    var localStoreKey = "13pf86";
    $('#stage-data').hide();
    $('#stage-auth').hide();
	 $('.cancel').hide();
	  //$('#navbar1').hide();
	  

    // Check for access token key/secret in localStorage
    var storedAccessData, rawData = localStorage.getItem(localStoreKey);
    if (rawData !== null) {
        storedAccessData = JSON.parse(rawData);                 
        options.accessTokenKey = storedAccessData.accessTokenKey;
        options.accessTokenSecret = storedAccessData.accessTokenSecret;
          
        console.log("AppLaudLog: Attemping oauth with stored token key/secret");           
        oauth = OAuth(options);
        oauth.get('https://api.twitter.com/1/account/verify_credentials.json?skip_status=true',
                function(data) {
                    var entry = JSON.parse(data.text);
                    console.log("AppLaudLog: Success getting credentials. screen_name: " + entry.screen_name);
                        
                    $('#confirm-user').live('click', function() {
                        $('#oauthStatus').html('<span style="color:green;">Success!</span>');
                        $('#userInfo').html('Current user: <strong>' + entry.screen_name + '</strong>');
						$('#twitteridhidden1').val(entry.id);
						 $.post('http://api.ipic.nu/recipes/register.php',
  {
    twitterid: entry.id,
	username: entry.screen_name,
	token: storedAccessData.accessTokenKey,
	secret: storedAccessData.accessTokenSecret,
	realname: entry.name,
	location: entry.location,
	bio: entry.description,
	avatar: entry.profile_image_url
  });
                        $('#stage-data').show();
						$('.loginb').hide();
						 $('.cancel').show();
						 	
	$('#homenotlogged').hide();
	$('#homelogged').show();
	$(".mypicsicon").attr("href", "#page-viewmyprofile");
						  //$('#navbar1').show();
                        $.mobile.changePage($('#page-home'), { reverse : true, changeHash: false });
                        return false;
                    });
                    $('#cancel-user').live('click', function() {
                        $('.cancel').trigger('click');
                        $.mobile.changePage($('#page-home'), { reverse : true, changeHash: false });
                        return false;
                    });

                    $('#dialog-confirm-text').html('<p>Twitter user: <strong>'
                         + entry.screen_name + '</strong><br> already authorized.<br>Continue as <strong>' 
                         + entry.screen_name + '</strong>?</p><p>Cancel to log in a different user.</p><hr>');
                    $('#stage-reading-local-store').hide();
                    $.mobile.changePage($('#page-dialog-confirm'), { role: 'dialog', changeHash: false });
                },
                function(data) { 
                    alert('Error with stored user data. Re-start authorization.');
                    options.accessTokenKey = '';
                    options.accessTokenSecret = '';
                    localStorage.removeItem(localStoreKey);
                    $('#stage-reading-local-store').hide();
                    $('#stage-auth').show();
                    console.log("AppLaudLog: No Authorization from localStorage data"); 
                }
        );
    } else {
        console.log("AppLaudLog: No localStorage data");
        $('#stage-reading-local-store').hide();
        $('#stage-auth').show();
    }

    /*function textCount() {
        var remaining = 112 - $('#tweettextarea').val().length;
        var color = (remaining < 0) ? 'red' : 'green';
        $('#textcount').html('<span style="color:' + color + ';">' + remaining + '</span> chars left for Tweet. Enter text:');
    }
    textCount();
    $('#tweettextarea').change(textCount);
    $('#tweettextarea').keyup(textCount);*/
  
    $('#startbutton').click(function() {       
        // Set childBrowser callback to detect our oauth_callback_url
        if (typeof window.plugins.childBrowser.onLocationChange !== "function") {
            window.plugins.childBrowser.onLocationChange = function(loc){
                console.log("AppLaudLog: onLocationChange : " + loc);
  
                // If user hit "No, thanks" when asked to authorize access
                if (loc.indexOf("http://android.ipic.nu/doauth.php?denied") >= 0) {
                    $('#oauthStatus').html('<span style="color:red;">User declined access</span>');
                    window.plugins.childBrowser.close();
                    return;
                }

                // Same as above, but user went to app's homepage instead
                // of back to app. Don't close the browser in this case.
                if (loc === "http://android.ipic.nu/") {
                    $('#oauthStatus').html('<span style="color:red;">User declined access</span>');
                    return;
                }
                
                // The supplied oauth_callback_url for this session is being loaded
                if (loc.indexOf("http://android.ipic.nu/doauth.php?") >= 0) {
                    var index, verifier = '';            
                    var params = loc.substr(loc.indexOf('?') + 1);
                    
                    params = params.split('&');
                    for (var i = 0; i < params.length; i++) {
                        var y = params[i].split('=');
                        if(y[0] === 'oauth_verifier') {
                            verifier = y[1];
                        }
                    }
               
                    // Exchange request token for access token
                    //oauth.get('https://api.twitter.com/oauth/access_token?oauth_verifier='+verifier+'&'+requestParams,
					oauth.get('https://api.twitter.com/oauth/access_token?oauth_verifier='+verifier+'&'+requestParams,
                            function(data) {               
                                var accessParams = {};
                                var qvars_tmp = data.text.split('&');
                                for (var i = 0; i < qvars_tmp.length; i++) {
                                    var y = qvars_tmp[i].split('=');
                                    accessParams[y[0]] = decodeURIComponent(y[1]);
                                }
                                console.log('AppLaudLog: ' + accessParams.oauth_token + ' : ' + accessParams.oauth_token_secret);
                                $('#oauthStatus').html('<span style="color:green;">Success!</span>');
                                $('#stage-auth').hide();
                                $('#stage-data').show();
								$('.loginb').hide();
								 $('.cancel').show();
								 $('#homenotlogged').hide();
	$('#homelogged').show();
		$(".mypicsicon").attr("href", "#page-viewmyprofile");
								  //$('#navbar1').show();
                                oauth.setAccessToken([accessParams.oauth_token, accessParams.oauth_token_secret]);
                                
                                // Save access token/key in localStorage
                                var accessData = {};
                                accessData.accessTokenKey = accessParams.oauth_token;
                                accessData.accessTokenSecret = accessParams.oauth_token_secret;
                                console.log("AppLaudLog: Storing token key/secret in localStorage");
                                localStorage.setItem(localStoreKey, JSON.stringify(accessData));

                                oauth.get('https://api.twitter.com/1/account/verify_credentials.json?skip_status=true',
                                        function(data) {
                                            var entry = JSON.parse(data.text);
                                            $('#userInfo').html('Current user: <strong>' + entry.screen_name + '</strong>');
											//$('#twitteridhidden1').html(entry.id);
											$('#twitteridhidden1').val(entry.id);
											
											 $.post('http://api.ipic.nu/recipes/register.php',
  {
    twitterid: entry.id,
	username: entry.screen_name,
	token: accessParams.oauth_token,
	secret: accessParams.oauth_token_secret,
	realname: entry.name,
	location: entry.location,
	bio: entry.description,
	avatar: entry.profile_image_url
  });
										
                                            console.log("AppLaudLog: screen_name: " + entry.screen_name);
                                        },
                                        function(data) { 
                                            alert('Error getting user credentials'); 
                                            console.log("AppLaudLog: Error " + data); 
                                            $('#oauthStatus').html('<span style="color:red;">Error getting user credentials</span>');
                                        }
                                );                          
								//$.mobile.changePage($('#page-home'), 'fade');               
                                window.plugins.childBrowser.close();
								
                        },
                        function(data) { 
                            alert('Twitter unavailable, please try again.'); 
                            console.log("AppLaudLog: 1 Error " + data); 
                            $('#oauthStatus').html('<span style="color:red;">Error during authorization</span>');
                        }
                    );
                }
            };  
        } // end if
        
        // Note: Consumer Key/Secret and callback url always the same for this app.        
        $('#oauthStatus').html('<span style="color:blue;">Getting authorization...</span>');
        oauth = OAuth(options);
        oauth.get('https://api.twitter.com/oauth/request_token',
                function(data) {
                    requestParams = data.text;
                    console.log("AppLaudLog: requestParams: " + data.text);
                    window.plugins.childBrowser.showWebPage('https://api.twitter.com/oauth/authorize?'+data.text, 
                            { showLocationBar : false });                    
                },
                function(data) { 
                    alert('Twitter unavailable, please try again.'); 
                    console.log("AppLaudLog: 2 Error " + data); 
                    $('#oauthStatus').html('<span style="color:red;">Error during authorization</span>');
                }
        );
        mentionsId = 0;
    });

// LOGOUT  LOGOUT LOGOUT LOGOUT LOGOUT LOGOUT LOGOUT LOGOUT LOGOUT LOGOUT LOGOUT LOGOUT LOGOUT LOGOUT LOGOUT LOGOUT LOGOUT LOGOUT LOGOUT
// LOGOUT  LOGOUT LOGOUT LOGOUT LOGOUT LOGOUT LOGOUT LOGOUT LOGOUT LOGOUT LOGOUT LOGOUT LOGOUT LOGOUT LOGOUT LOGOUT LOGOUT LOGOUT LOGOUT 
    $('.cancel').click(function() {
        $('#oauthStatus').html('<span style="color:red;">Cancelled by User</span>');
        $('#userInfo').empty();
        $('#twitterdata').empty();
        $('#stage-auth').show();
        $('#stage-data').hide();
		$('.loginb').show();
		 $('.cancel').hide();
		 $('#homelogged').hide();
	$('#homenotlogged').show();
	$(".mypicsicon").attr("href", "#page-upload");
		  //$('#navbar1').hide();
		  $.mobile.changePage("#page-home", "fade");
        localStorage.removeItem(localStoreKey);
        options.accessTokenKey = '';
        options.accessTokenSecret = '';
        oauth.post('http://api.twitter.com/1/account/end_session.json',
                {}, function(data) {
                    console.log("AppLaudLog: User ended session");
                }, function(data) {
                    console.log("AppLaudLog: Error: End session");
                });
    });
// TWITTER TIMELINE TWITTER TIMELINE  TWITTER TIMELINE  TWITTER TIMELINE  TWITTER TIMELINE  TWITTER TIMELINE  TWITTER TIMELINE  TWITTER TIMELINE  TWITTER TIMELINE 
// TWITTER TIMELINE TWITTER TIMELINE  TWITTER TIMELINE  TWITTER TIMELINE  TWITTER TIMELINE  TWITTER TIMELINE  TWITTER TIMELINE  TWITTER TIMELINE  TWITTER TIMELINE
    $('#homeTimeline').click(function() {
        oauth.get('https://api.twitter.com/1/statuses/home_timeline.json?count=10',
                function(data) {
                    var entries = JSON.parse(data.text);
                    var count = entries.length;
                    var data_html = '<h4>Home Timeline: 1 of ' + count + ' entries</h4>';

                    if (count >= 0) {
                        // Use count value to display all timelines
                        // for (var i = 0; i < count; i++) {
                        for (var i = 0; i < 1; i++) {
                            console.log("AppLaudLog: count: " + count);                            
                            data_html = data_html.concat('<div><img src="' 
                                + entries[i].user.profile_image_url + '">'
                                + entries[i].user.name + '</div>');
                            data_html = data_html.concat('<p>' + entries[i].text + '<br>' 
                                + entries[i].created_at + '</p>');
                        }
                    }
                    $('#twitterdata').prepend(data_html);
                },
                function(data) { 
                    alert('Error getting home timeline'); 
                    console.log("AppLaudLog: Error " + data); 
                    $('#oauthStatus').html('<span style="color:red;">Error getting home timeline</span>');
                }
        );          
    });        
// TWITTER MENTIONS TWITTER MENTIONS TWITTER MENTIONS TWITTER MENTIONS TWITTER MENTIONS TWITTER MENTIONS TWITTER MENTIONS TWITTER MENTIONS TWITTER MENTIONS
// TWITTER MENTIONS TWITTER MENTIONS TWITTER MENTIONS TWITTER MENTIONS TWITTER MENTIONS TWITTER MENTIONS TWITTER MENTIONS TWITTER MENTIONS TWITTER MENTIONS
    $('#mentions').click(function() {
        var mentionsParams = (mentionsId === 0) ? '' : ('?since_id=' + mentionsId);
        oauth.get('https://api.twitter.com/1/statuses/mentions.json' + mentionsParams,
                function(data) {
                    var entries = JSON.parse(data.text);
                    var count = entries.length;
                    var data_html = '<h4>Mentions: 1 of ' + count + ' entries</h4>';
                    
                    if (count > 0) {
                        // Use count value to display all mentions
                        // for (var i = 0; i < count; i++) {
                        for (var i = 0; i < 1; i++) {
                            console.log("AppLaudLog: count : " + count);
                            data_html = data_html.concat('<div><img src="' 
                                + entries[i].user.profile_image_url + '">'
                                + entries[i].user.name + '</div>');
                            data_html = data_html.concat('<p>' + entries[i].text + '<br>' 
                                + entries[i].created_at + '</p>');
                        }
                        mentionsId = entries[i-1].id;
                        console.log("AppLaudLog: mentionsId : " + mentionsId);
                    }
                    $('#twitterdata').prepend(data_html);
            },
            function(data) { 
                alert('Error getting mentions.'); 
                console.log("AppLaudLog: Error " + data);
                $('#oauthStatus').html('<span style="color:red;">Error getting mentions</span>');
            }
        );             
    });

    $('#tweet').click(function() {                       
        if ($('#tweettextarea').val().length === 0) {
            alert('You must enter text before tweeting.');
            return false;
        }
        var theTweet = $('#tweettextarea').val();
        $('#confirm-tweet').click(function() {
		
	// Make sure you use your own site!
           //oauth.post('https://api.twitter.com/1/statuses/update.json',
                   // { 'status' : theTweet,  // jsOAuth encodes for us
                     // 'trim_user' : 'true' },
                    //function(data) {
                        //var entry = JSON.parse(data.text);
                        //var data_html = '<h4>You Tweeted:</h4>';
                            
                        //console.log("AppLaudLog: Tweet id: " + entry.id_str + " text: " + entry.text);
                        //data_html = data_html.concat('<p>Id: ' + entry.id_str + '<br>Text: ' 
                                //+ entry.text + '</p>');
                       // $('#twitterdata').prepend(data_html);
                        //$('#tweettextarea').empty();
                        //$.mobile.changePage($('#page-home'), { reverse : true, changeHash: false });
                    //},
                    //function(data) { 
                     //   alert('Error Tweeting.'); 
                     //   console.log("AppLaudLog: Error during tweet " + data.text);
                       // $('#oauthStatus').html('<span style="color:red;">Error Tweeting</span>');                           
                        //$.mobile.changePage($('#page-home'), { reverse : true, changeHash: false });
                   // }
          //  );                  
        });
        $('#cancel-tweet').click(function() {
             console.log("AppLaudLog: tweet cancelled by user");
             $.mobile.changePage($('#page-home'), { reverse : true, changeHash: false });
        });

        $('#dialog-tweet-text').html('<p>Really tweet ' + $('#tweettextarea').val().length 
                 + ' characters?<br>Your status:<br>"' + theTweet + '"');
        $.mobile.changePage($('#page-dialog-tweet'), { role: 'dialog', changeHash: false });
    });
   
    $('#networkbutton').click(function() {
        checkConnection();
    });
});
	
 function onSendUpload() {
	 if ($('#twitteridhidden').val().length === 0) {
            alert('You did not select a photo or image.');
            return false;
        }
	$.mobile.showPageLoadingMsg();
		   //$('#loader').show();
		   $('#stage-data').hide();
   var options = new FileUploadOptions();
	options.fileKey="file";
	//options.fileName="newfile.txt";
	options.mimeType="image/jpeg";
	options.chunkedMode = false;
 
	var params = new Object();
	params.value1 = $('#twitteridhidden1').val();
	params.value2 = $('#tweettextarea').val();
	//params.value2 = 'test';
	//params.value3 = 'checked';
	params.value3 = $('#checkbox-1:checked').val();
 
	options.params = params;
 var imageURI2 = $('#twitteridhidden').val();
	var ft = new FileTransfer();
	ft.upload(imageURI2, "http://android.ipic.nu/upload.php", win, fail, options);
	// Make sure you use your own site!
  }
 
    // Called when a photo is successfully retrieved (taken with camera)
    function onPhotoDataSuccess(imageURI) {
		$.mobile.changePage("#page-upload", "fade");
	//alert("Your photo was taken successfully.");
	// Get image handle
	$("#rotateButtonU").show();
	var largeImage = document.getElementById('largeImage');
 
	// Unhide image elements
	largeImage.style.display = 'block';
 
	// Show the captured photo
	// The inline CSS rules are used to resize the image
	largeImage.src = imageURI;
		var editImage = document.getElementById('editImage');
 
	// Unhide image elements
	editImage.style.display = 'block';
 
	// Show the captured photo
	// The inline CSS rules are used to resize the image
	editImage.src = imageURI;
   
      $("#twitteridhidden").val(imageURI);
	  $('#capturebuttons').hide();			
    }
 
    // Called when a photo is successfully retrieved (out of the device's library)
    function onPhotoURISuccess(imageURI) {
 $.mobile.changePage("#page-upload", "fade");
	// Get image handle
	$("#rotateButtonU").show();
	var largeImage = document.getElementById('largeImage');
 
	// Unhide image elements
	largeImage.style.display = 'block';
 
	// Show the captured photo
	// The inline CSS rules are used to resize the image
	largeImage.src = imageURI;
	var editImage = document.getElementById('editImage');
 
	// Unhide image elements
	editImage.style.display = 'block';
 
	// Show the captured photo
	// The inline CSS rules are used to resize the image
	editImage.src = imageURI;
   
      $("#twitteridhidden").val(imageURI);
$('#capturebuttons').hide();
	
 
    }
 
    // Success reporting
    function win(r) {
        alert("Photo or image has been succesfully uploaded to iPic.nu.");
       // alert("Response = " + r.response);
        $('#checkbox-1').attr('checked','checked');
	    $.mobile.hidePageLoadingMsg();
		 $('#stage-data').show();
		 $("#rotateButtonU").hide();
		 $('#tweettextarea').val("");
		$('#tweettextarea').empty();
		$('#twitteridhidden').val("");
		var largeImage = document.getElementById('largeImage');
		largeImage.style.display = 'none';
		largeImage.src = "";
		$('#capturebuttons').show();
    }
    // Error reporting
    function fail(message) {
        alert('Failed because: ' + message);
    }
 
    function capturePhoto(source) {
	// Take picture using device camera and retrieve image as base64-encoded string
	navigator.camera.getPicture(onPhotoDataSuccess, fail, {
		quality: 30, 
		destinationType: destinationType.FILE_URI,
		sourceType: source
    });
	}
 
    function getPhoto(source) {
	// Retrieve image file location from specified source
	navigator.camera.getPicture(onPhotoURISuccess, fail, { 
		quality: 30, 
		destinationType: destinationType.FILE_URI,
		sourceType: source
	});
    }

function getLatestPics() {
   $.mobile.showPageLoadingMsg();
$('#latestimages').empty();
	$.getJSON('http://api.ipic.nu/recipes/latest_pics.php?',
	{
    num: "10",
    format: "json"
  }, function(data) {
$.each(data.posts, function(i,post1){
	var imagesrc = post1.post.picid;
	var div_data =
'<a href="#page-view" onclick="viewImagePic(' + imagesrc + ')" class="clickPic"><img src="http://ipic.nu/uploads/thumbs/' + post1.post.thumb + '" width="100px" height="100px" border="0" style="padding:8px;"></a>';
$(div_data).appendTo("#latestimages");

/* $("#latestimages").append(
 '<img src="http://ipic.nu/uploads/thumbs/' + data[i].thumb + '" width="100px">' );*/
});
	$.mobile.hidePageLoadingMsg();			
});
	
}
function getPopularPics() {
   $.mobile.showPageLoadingMsg();
$('#popularimages').empty();
	$.getJSON('http://api.ipic.nu/recipes/popular_pics.php?',
	{
    num: "10",
    format: "json"
  }, function(data) {
$.each(data.posts, function(i,post1){
	var imagesrc = post1.post.picid;
	var div_data =
'<a href="#page-view" onclick="viewImagePic(' + imagesrc + ')" class="clickPic"><img src="http://ipic.nu/uploads/thumbs/' + post1.post.thumb + '" width="100px" height="100px" border="0" style="padding:8px;"></a>';
$(div_data).appendTo("#popularimages");

/* $("#latestimages").append(
 '<img src="http://ipic.nu/uploads/thumbs/' + data[i].thumb + '" width="100px">' );*/
});
	$.mobile.hidePageLoadingMsg();			
});
	
}
function viewImagePic(imageFullID) {
	// $('#imgloader').show();
	 //$('#viewImage').remove();
// $('<img id="viewImage" src="">').appendTo('#viewImageContainer');
	 //$("#viewImage").removeAttr("style");
	 $("#viewImage").attr('src', '');
	$("#viewPosterImage").attr('src', '');
	$('#viewpostername').empty();
	 $('#showViews').empty();
  $('#showDate').empty();
    $('#showDescription').empty();
	$.getJSON('http://api.ipic.nu/recipes/getpic.php?',
  {
    id: imageFullID,
    format: "json"
  }, function(data) {
$.each(data.posts, function(i,post1){
	$.getJSON('http://api.ipic.nu/recipes/userdetails.php?',
  {
    twitterid: post1.post.twitterid,
    format: "json"
  }, function(data) {
$.each(data.posts, function(i,post3){
	var imageFull = post3.post.avatar;
	var viewPosterImage = document.getElementById('viewPosterImage');
 
	// Unhide image elements
	viewPosterImage.style.display = 'block';
 
	// Show the captured photo
	// The inline CSS rules are used to resize the image
	viewPosterImage.src = imageFull;
	var usernameLink = '<a href="#page-profile" onclick="viewProfile(' + post3.post.twitterid + ');" data-role="button" data-theme="c" data-inline="true" style="float:right">' + post3.post.username + '</a>';
	$(usernameLink).appendTo('#viewpostername');
	$('#viewpostername').trigger('create');
	//$('#viewPosterName').html(post3.post.username);
	
	/**$('#page-latest').hide();
	$('#page-mypics').hide();
	$('#page-view').show();**/
  });

});

	var imageFull = post1.post.full;
	var viewImage = document.getElementById('viewImage');
 
	// Unhide image elements
	viewImage.style.display = 'block';
 
	// Show the captured photo
	// The inline CSS rules are used to resize the image
	viewImage.src = "http://iPic.nu/viewimg.php?width=290&image=/uploads/full/"+imageFull;
	 $('#showViews').html(post1.post.view);
  $('#showDate').html(post1.post.date);
  
    
var showDescription = post1.post.caption;
showDescription = showDescription.linkify_tweet();
  $('#showDescription').html(showDescription);
	/**$('#page-latest').hide();
	$('#page-mypics').hide();
	$('#page-view').show();**/
  });
 //$('#imgloader').hide();
   //$('#viewpostername').page();
});
    //$('#viewpostername').page();
}
function viewMyImagePic(imageFullID) {
	$('#myloader').show();
	$("#viewMyImage").attr('src', '');
	$("#viewPosterMyImage").attr('src', '');
	$('#viewpostermyname').empty();
	 $('#showMyViews').empty();
  $('#showMyDate').empty();
    $('#showMyDescription').empty();
	$.getJSON('http://api.ipic.nu/recipes/getpic.php?',
  {
    id: imageFullID,
    format: "json"
  }, function(data) {
$.each(data.posts, function(i,post1){
	$.getJSON('http://api.ipic.nu/recipes/userdetails.php?',
  {
    twitterid: post1.post.twitterid,
    format: "json"
  }, function(data) {
$.each(data.posts, function(i,post4){
	var imageFull2 = post4.post.avatar;
	var viewPosterMyImage = document.getElementById('viewPosterMyImage');
 
	// Unhide image elements
	viewPosterMyImage.style.display = 'block';
 
	// Show the captured photo
	// The inline CSS rules are used to resize the image
	viewPosterMyImage.src = imageFull2;
	var myusernameLink = '<a href="#page-viewmyprofile" onclick="viewMyProfile();" data-role="button" data-theme="c" data-inline="true" style="float:right">' + post3.post.username + '</a>';
	$(myusernameLink).appendTo('#viewpostermyname');
	$('#viewpostermyname').trigger('create');
	/**$('#page-latest').hide();
	$('#page-mypics').hide();
	$('#page-view').show();**/
  });
});
	var imageFull = post1.post.full;
	var viewMyImage = document.getElementById('viewMyImage');
 
	// Unhide image elements
	viewMyImage.style.display = 'block';
 $('#showMyViews').html(post1.post.view);
  $('#showMyDate').html(post1.post.date);
        
var showDescription = post1.post.caption;
showDescription = showDescription.linkify_tweet();
  $('#showDescription').html(showDescription);
	// Show the captured photo
	// The inline CSS rules are used to resize the image
	viewMyImage.src = "http://iPic.nu/viewimg.php?width=290&image=/uploads/full/"+imageFull;
	
	/**$('#page-latest').hide();
	$('#page-mypics').hide();
	$('#page-view').show();**/
  });
   $('#myloader').hide();
});
   
}

function viewMyProfile() {
	var twitterID5 = $('#twitteridhidden1').val();
	$("#viewMyAvatar").attr('src', '');
	$('#viewMyUserame').empty();
	 $('#viewMyRealname').empty();
  $('#viewMyBio').empty();
  $('#viewMyPhotos').empty();
    $('#viewMyFollowers').empty();
	$('#viewMyViews').empty();
	$.getJSON('http://api.ipic.nu/recipes/my_pics.php?',
  {
    twitterid: twitterID5,
    format: "json"
  }, function(data) {
	  
	  $('#viewMyPhotos').html(data.posts.length);

});
   $.getJSON('http://api.ipic.nu/recipes/userdetails.php?',
  {
    twitterid: twitterID5,
    format: "json"
  }, function(data) {
	 
$.each(data.posts, function(i,post4){
	var imageFull2 = post4.post.avatar;
	var viewMyAvatar = document.getElementById('viewMyAvatar');
 
	// Unhide image elements
	viewMyAvatar.style.display = 'block';
 
	// Show the captured photo
	// The inline CSS rules are used to resize the image
	viewMyAvatar.src = imageFull2;
	$('#viewMyUsername').html(post4.post.username);
	$('#viewMyBio').html(post4.post.bio);
	$('#viewMyRealname').html(post4.post.realname);
	
	var twitterusername = post4.post.username;
    $.getJSON('http://twitter.com/users/'+twitterusername+'.json?callback=?',
    function(data)
    {
        $('#viewMyFollowers').html(data.followers_count);
    });
	/**$('#page-latest').hide();
	
	$('#page-mypics').hide();
	$('#page-view').show();**/
  });
  
});
 $.getJSON('http://api.ipic.nu/recipes/totalviews.php?',
  {
    twitterid: twitterID5,
    format: "json"
  }, function(data) {
	  
	  $('#viewMyViews').html(data.views);
});
}

function viewProfile(twitterID6) {
	$('#myloader').show();
	$("#viewAvatar").attr('src', '');
	$('#profileImages').empty();
	$('#viewUserame').empty();
	 $('#viewRealname').empty();
  $('#viewBio').empty();
  $('#viewPhotos').empty();
    $('#viewFollowers').empty();
	$('#viewViews').empty();
	$.getJSON('http://api.ipic.nu/recipes/my_pics.php?',
  {
    twitterid: twitterID6,
    format: "json"
  }, function(data) {
	  
	  $('#viewPhotos').html(data.posts.length);
$.each(data.posts, function(i,post2){
	var imagesrc = post2.post.picid;
	//var imagesrc ='http://ipic.nu/uploads/thumbs/' + data1.thumb;
	var div_data =
'<div style="width:116px;height:116px;padding:0px;float:left"><a href="#page-view" onclick="viewImagePic(' + imagesrc + ')"><img src="http://ipic.nu/uploads/thumbs/' + post2.post.thumb + '" width="100px" height="100px" border="0" style="padding:8px;"></a></div>';
$(div_data).appendTo("#profileImages");

/* $("#latestimages").append(
 '<img src="http://ipic.nu/uploads/thumbs/' + data[i].thumb + '" width="100px">' );*/
  });
});
   $.getJSON('http://api.ipic.nu/recipes/userdetails.php?',
  {
    twitterid: twitterID6,
    format: "json"
  }, function(data) {
$.each(data.posts, function(i,post4){
	var imageFull2 = post4.post.avatar;
	var viewAvatar = document.getElementById('viewAvatar');
 
	// Unhide image elements
	viewAvatar.style.display = 'block';
 
	// Show the captured photo
	// The inline CSS rules are used to resize the image
	viewAvatar.src = imageFull2;
	$('#viewUsername').html(post4.post.username);
	$('#viewBio').html(post4.post.bio);
	$('#viewRealname').html(post4.post.realname);
	//$('#page-latest').hide();
	
	var twitterusername = post4.post.username;
    $.getJSON('http://twitter.com/users/'+twitterusername+'.json?callback=?',
    function(data)
    {
        $('#viewFollowers').html(data.followers_count);
    });
	/**
	$('#page-mypics').hide();
	$('#page-view').show();**/
  });
});
 $.getJSON('http://api.ipic.nu/recipes/totalviews.php?',
  {
    twitterid: twitterID6,
    format: "json"
  }, function(data) {
	  
	  $('#viewViews').html(data.views);
});
$('#myloader').hide();
}

function getMyPics() {
	$('#myimages').empty();
	
	var twitterID1 = $('#twitteridhidden1').val();
	$.getJSON('http://api.ipic.nu/recipes/my_pics.php?',
  {
    twitterid: twitterID1,
    format: "json"
  }, function(data) {
$.each(data.posts, function(i,post2){
	var imagesrc = post2.post.picid;
	//var imagesrc ='http://ipic.nu/uploads/thumbs/' + data1.thumb;
	var div_data =
'<div style="width:116px;height:175px;padding:0px;float:left"><a href="#page-viewmy" onclick="viewMyImagePic(' + imagesrc + ')" class="clickPic"><img src="http://ipic.nu/uploads/thumbs/' + post2.post.thumb + '" width="100px" height="100px" border="0" style="padding:8px 8px 0 8px;"></a><br /><a href="#" onclick="deleteMyImagePic(' + imagesrc + ')" data-role="button" data-theme="a" data-icon="delete" data-inline="true" data-iconpos="left">Delete</a></div>';
$(div_data).appendTo("#myimages");


/* $("#latestimages").append(
 '<img src="http://ipic.nu/uploads/thumbs/' + data[i].thumb + '" width="100px">' );*/
  });
  $('#myimages').trigger('create');
});

}
function deleteMyImagePic(imageFullID) {
	$('#delete-image-id').val(imageFullID);
	$.getJSON('http://api.ipic.nu/recipes/getpic.php?',
  {
    id: imageFullID,
    format: "json"
  }, function(data) {
$.each(data.posts, function(i,post3){
	var imageThumb = post3.post.thumb;
	$('#dialog-delete-text').html('<p>Really delete this picture?<br /><img src="http://ipic.nu/uploads/thumbs/' + post3.post.thumb + '" width="100px" height="100px" border="0" style="padding:8px;">');
        $.mobile.changePage($('#page-dialog-delete'), { role: 'dialog', changeHash: false });
	/**$('#page-latest').hide();
	$('#page-mypics').hide();
	$('#page-view').show();**/
  });
});
	
	
   
}
function deleteMyImagePicYes() {
	 $.mobile.showPageLoadingMsg();
	var imageFullID2 = $('#delete-image-id').val();
	
	var twitterID2 = $('#twitteridhidden1').val();
	$.post('http://api.ipic.nu/recipes/delete.php',
  {
    id: imageFullID2,	
	twitterid: twitterID2,
	format: "json"
  });
   $('#delete-image-id').val("");
  $('#myimages').empty();
	var twitterID1 = $('#twitteridhidden1').val();
	$.getJSON('http://api.ipic.nu/recipes/my_pics.php?',
  {
    twitterid: twitterID1,
    format: "json"
  }, function(data) {
$.each(data.posts, function(i,post2){
	var imagesrc = post2.post.picid;
	//var imagesrc ='http://ipic.nu/uploads/thumbs/' + data1.thumb;
	var div_data =
'<div style="width:116px;height:146px;padding:0px;float:left"><a href="#page-viewmy" onclick="viewMyImagePic(' + imagesrc + ')"><img src="http://ipic.nu/uploads/thumbs/' + post2.post.thumb + '" width="100px" height="100px" border="0" style="padding:8px;"></a><br /><a href="#" onclick="deleteMyImagePic(' + imagesrc + ')" data-role="button" data-theme="a">Delete pic</a></div>';
$(div_data).appendTo("#myimages");

/* $("#latestimages").append(
 '<img src="http://ipic.nu/uploads/thumbs/' + data[i].thumb + '" width="100px">' );*/
  });
});
             $.mobile.changePage($('#page-mypics'), { reverse : true, changeHash: false });
			  $.mobile.hidePageLoadingMsg();
}
function deleteMyImagePicNo(imageFullID) {
	$('#delete-image-id').val("");
             $.mobile.changePage($('#page-mypics'), { reverse : true, changeHash: false });
       
        
   
}
// TWITTER FOLLOWERS



var pictureSource;   // picture source
    var destinationType; // sets the format of returned value 
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

    if (states[networkState] === 'No network connection') {
        alert('No network connection detected. Check settings.');
    } else {
       // alert('Connection type: ' + states[networkState]);
    }
}

function onDeviceReady() {
    document.addEventListener("offline", checkConnection, false);
    document.addEventListener("online", checkConnection, false);
	 $('body > *').css({minHeight: window.innerHeight + 'px !important'});
	pictureSource=navigator.camera.PictureSourceType;
        destinationType=navigator.camera.DestinationType;
		
}

function init() {
    document.addEventListener("deviceready", onDeviceReady, false);
}

$('#page-home').live('pageinit', function() {
    var oauth;
    var requestParams;
    var options = { 
          consumerKey: 'X10KKHCWvMFNqV0FFtNW1w',
            consumerSecret: 'A55Kbe6aHRHwpfiafbfBpgzjsr4yIP2XcZjt4dK98',
            callbackUrl: 'http://android.ipic.nu/doauth.php' };
    var mentionsId = 0;
    var localStoreKey = "13pf86";
    $('#stage-data').hide();
    $('#stage-auth').hide();
	 $('.cancel').hide();
	  $('#navbar1').hide();

    // Check for access token key/secret in localStorage
    var storedAccessData, rawData = localStorage.getItem(localStoreKey);
    if (rawData !== null) {
        storedAccessData = JSON.parse(rawData);                 
        options.accessTokenKey = storedAccessData.accessTokenKey;
        options.accessTokenSecret = storedAccessData.accessTokenSecret;
          
        console.log("AppLaudLog: Attemping oauth with stored token key/secret");           
        oauth = OAuth(options);
        oauth.get('https://api.twitter.com/1/account/verify_credentials.json?skip_status=true',
                function(data) {
                    var entry = JSON.parse(data.text);
                    console.log("AppLaudLog: Success getting credentials. screen_name: " + entry.screen_name);
                        
                    $('#confirm-user').live('click', function() {
                        $('#oauthStatus').html('<span style="color:green;">Success!</span>');
                        $('#userInfo').html('Current user: <strong>' + entry.screen_name + '</strong>');
						$('#twitteridhidden1').val(entry.id);
						 $.post('http://api.ipic.nu/recipes/register.php',
  {
    twitterid: entry.id,
	username: entry.screen_name,
	token: storedAccessData.accessTokenKey,
	secret: storedAccessData.accessTokenSecret,
	realname: entry.name,
	location: entry.location,
	bio: entry.description,
	avatar: entry.profile_image_url
  });
                        $('#stage-data').show();
						 $('.cancel').show();
						  $('#navbar1').show();
                        $.mobile.changePage($('#page-home'), { reverse : true, changeHash: false });
                        return false;
                    });
                    $('#cancel-user').live('click', function() {
                        $('.cancel').trigger('click');
                        $.mobile.changePage($('#page-home'), { reverse : true, changeHash: false });
                        return false;
                    });

                    $('#dialog-confirm-text').html('<p>Twitter user: <strong>'
                         + entry.screen_name + '</strong><br> already authorized.<br>Continue as <strong>' 
                         + entry.screen_name + '</strong>?</p><p>Cancel to log in a different user.</p><hr>');
                    $('#stage-reading-local-store').hide();
                    $.mobile.changePage($('#page-dialog-confirm'), { role: 'dialog', changeHash: false });
                },
                function(data) { 
                    alert('Error with stored user data. Re-start authorization.');
                    options.accessTokenKey = '';
                    options.accessTokenSecret = '';
                    localStorage.removeItem(localStoreKey);
                    $('#stage-reading-local-store').hide();
                    $('#stage-auth').show();
                    console.log("AppLaudLog: No Authorization from localStorage data"); 
                }
        );
    } else {
        console.log("AppLaudLog: No localStorage data");
        $('#stage-reading-local-store').hide();
        $('#stage-auth').show();
    }

    /*function textCount() {
        var remaining = 112 - $('#tweettextarea').val().length;
        var color = (remaining < 0) ? 'red' : 'green';
        $('#textcount').html('<span style="color:' + color + ';">' + remaining + '</span> chars left for Tweet. Enter text:');
    }
    textCount();
    $('#tweettextarea').change(textCount);
    $('#tweettextarea').keyup(textCount);*/
  
    $('#startbutton').click(function() {       
        // Set childBrowser callback to detect our oauth_callback_url
        if (typeof window.plugins.childBrowser.onLocationChange !== "function") {
            window.plugins.childBrowser.onLocationChange = function(loc){
                console.log("AppLaudLog: onLocationChange : " + loc);
  
                // If user hit "No, thanks" when asked to authorize access
                if (loc.indexOf("http://android.ipic.nu/doauth.php?denied") >= 0) {
                    $('#oauthStatus').html('<span style="color:red;">User declined access</span>');
                    window.plugins.childBrowser.close();
                    return;
                }

                // Same as above, but user went to app's homepage instead
                // of back to app. Don't close the browser in this case.
                if (loc === "http://android.ipic.nu/") {
                    $('#oauthStatus').html('<span style="color:red;">User declined access</span>');
                    return;
                }
                
                // The supplied oauth_callback_url for this session is being loaded
                if (loc.indexOf("http://android.ipic.nu/doauth.php?") >= 0) {
                    var index, verifier = '';            
                    var params = loc.substr(loc.indexOf('?') + 1);
                    
                    params = params.split('&');
                    for (var i = 0; i < params.length; i++) {
                        var y = params[i].split('=');
                        if(y[0] === 'oauth_verifier') {
                            verifier = y[1];
                        }
                    }
               
                    // Exchange request token for access token
                    //oauth.get('https://api.twitter.com/oauth/access_token?oauth_verifier='+verifier+'&'+requestParams,
					oauth.get('https://api.twitter.com/oauth/access_token?oauth_verifier='+verifier+'&'+requestParams,
                            function(data) {               
                                var accessParams = {};
                                var qvars_tmp = data.text.split('&');
                                for (var i = 0; i < qvars_tmp.length; i++) {
                                    var y = qvars_tmp[i].split('=');
                                    accessParams[y[0]] = decodeURIComponent(y[1]);
                                }
                                console.log('AppLaudLog: ' + accessParams.oauth_token + ' : ' + accessParams.oauth_token_secret);
                                $('#oauthStatus').html('<span style="color:green;">Success!</span>');
                                $('#stage-auth').hide();
                                $('#stage-data').show();
								 $('.cancel').show();
								  $('#navbar1').show();
                                oauth.setAccessToken([accessParams.oauth_token, accessParams.oauth_token_secret]);
                                
                                // Save access token/key in localStorage
                                var accessData = {};
                                accessData.accessTokenKey = accessParams.oauth_token;
                                accessData.accessTokenSecret = accessParams.oauth_token_secret;
                                console.log("AppLaudLog: Storing token key/secret in localStorage");
                                localStorage.setItem(localStoreKey, JSON.stringify(accessData));

                                oauth.get('https://api.twitter.com/1/account/verify_credentials.json?skip_status=true',
                                        function(data) {
                                            var entry = JSON.parse(data.text);
                                            $('#userInfo').html('Current user: <strong>' + entry.screen_name + '</strong>');
											//$('#twitteridhidden1').html(entry.id);
											$('#twitteridhidden1').val(entry.id);
											
											 $.post('http://api.ipic.nu/recipes/register.php',
  {
    twitterid: entry.id,
	username: entry.screen_name,
	token: accessParams.oauth_token,
	secret: accessParams.oauth_token_secret,
	realname: entry.name,
	location: entry.location,
	bio: entry.description,
	avatar: entry.profile_image_url
  });
										
                                            console.log("AppLaudLog: screen_name: " + entry.screen_name);
                                        },
                                        function(data) { 
                                            alert('Error getting user credentials'); 
                                            console.log("AppLaudLog: Error " + data); 
                                            $('#oauthStatus').html('<span style="color:red;">Error getting user credentials</span>');
                                        }
                                );                                         
                                window.plugins.childBrowser.close();
                        },
                        function(data) { 
                            alert('Error : No Authorization'); 
                            console.log("AppLaudLog: 1 Error " + data); 
                            $('#oauthStatus').html('<span style="color:red;">Error during authorization</span>');
                        }
                    );
                }
            };  
        } // end if
        
        // Note: Consumer Key/Secret and callback url always the same for this app.        
        $('#oauthStatus').html('<span style="color:blue;">Getting authorization...</span>');
        oauth = OAuth(options);
        oauth.get('https://api.twitter.com/oauth/request_token',
                function(data) {
                    requestParams = data.text;
                    console.log("AppLaudLog: requestParams: " + data.text);
                    window.plugins.childBrowser.showWebPage('https://api.twitter.com/oauth/authorize?'+data.text, 
                            { showLocationBar : false });                    
                },
                function(data) { 
                    alert('Error : No Authorization'); 
                    console.log("AppLaudLog: 2 Error " + data); 
                    $('#oauthStatus').html('<span style="color:red;">Error during authorization</span>');
                }
        );
        mentionsId = 0;
    });

    $('.cancel').click(function() {
        $('#oauthStatus').html('<span style="color:red;">Cancelled by User</span>');
        $('#userInfo').empty();
        $('#twitterdata').empty();
        $('#stage-auth').show();
        $('#stage-data').hide();
		 $('.cancel').hide();
		  $('#navbar1').hide();
		  $.mobile.changePage("#page-home", "fade");
        localStorage.removeItem(localStoreKey);
        options.accessTokenKey = '';
        options.accessTokenSecret = '';
        oauth.post('http://api.twitter.com/1/account/end_session.json',
                {}, function(data) {
                    console.log("AppLaudLog: User ended session");
                }, function(data) {
                    console.log("AppLaudLog: Error: End session");
                });
    });

    $('#homeTimeline').click(function() {
        oauth.get('https://api.twitter.com/1/statuses/home_timeline.json?count=10',
                function(data) {
                    var entries = JSON.parse(data.text);
                    var count = entries.length;
                    var data_html = '<h4>Home Timeline: 1 of ' + count + ' entries</h4>';

                    if (count >= 0) {
                        // Use count value to display all timelines
                        // for (var i = 0; i < count; i++) {
                        for (var i = 0; i < 1; i++) {
                            console.log("AppLaudLog: count: " + count);                            
                            data_html = data_html.concat('<div><img src="' 
                                + entries[i].user.profile_image_url + '">'
                                + entries[i].user.name + '</div>');
                            data_html = data_html.concat('<p>' + entries[i].text + '<br>' 
                                + entries[i].created_at + '</p>');
                        }
                    }
                    $('#twitterdata').prepend(data_html);
                },
                function(data) { 
                    alert('Error getting home timeline'); 
                    console.log("AppLaudLog: Error " + data); 
                    $('#oauthStatus').html('<span style="color:red;">Error getting home timeline</span>');
                }
        );          
    });        
        
    $('#mentions').click(function() {
        var mentionsParams = (mentionsId === 0) ? '' : ('?since_id=' + mentionsId);
        oauth.get('https://api.twitter.com/1/statuses/mentions.json' + mentionsParams,
                function(data) {
                    var entries = JSON.parse(data.text);
                    var count = entries.length;
                    var data_html = '<h4>Mentions: 1 of ' + count + ' entries</h4>';
                    
                    if (count > 0) {
                        // Use count value to display all mentions
                        // for (var i = 0; i < count; i++) {
                        for (var i = 0; i < 1; i++) {
                            console.log("AppLaudLog: count : " + count);
                            data_html = data_html.concat('<div><img src="' 
                                + entries[i].user.profile_image_url + '">'
                                + entries[i].user.name + '</div>');
                            data_html = data_html.concat('<p>' + entries[i].text + '<br>' 
                                + entries[i].created_at + '</p>');
                        }
                        mentionsId = entries[i-1].id;
                        console.log("AppLaudLog: mentionsId : " + mentionsId);
                    }
                    $('#twitterdata').prepend(data_html);
            },
            function(data) { 
                alert('Error getting mentions.'); 
                console.log("AppLaudLog: Error " + data);
                $('#oauthStatus').html('<span style="color:red;">Error getting mentions</span>');
            }
        );             
    });

    $('#tweet').click(function() {                       
        if ($('#tweettextarea').val().length === 0) {
            alert('You must enter text before tweeting.');
            return false;
        }
        var theTweet = $('#tweettextarea').val();
        $('#confirm-tweet').click(function() {
		
	// Make sure you use your own site!
           //oauth.post('https://api.twitter.com/1/statuses/update.json',
                   // { 'status' : theTweet,  // jsOAuth encodes for us
                     // 'trim_user' : 'true' },
                    //function(data) {
                        //var entry = JSON.parse(data.text);
                        //var data_html = '<h4>You Tweeted:</h4>';
                            
                        //console.log("AppLaudLog: Tweet id: " + entry.id_str + " text: " + entry.text);
                        //data_html = data_html.concat('<p>Id: ' + entry.id_str + '<br>Text: ' 
                                //+ entry.text + '</p>');
                       // $('#twitterdata').prepend(data_html);
                        //$('#tweettextarea').empty();
                        //$.mobile.changePage($('#page-home'), { reverse : true, changeHash: false });
                    //},
                    //function(data) { 
                     //   alert('Error Tweeting.'); 
                     //   console.log("AppLaudLog: Error during tweet " + data.text);
                       // $('#oauthStatus').html('<span style="color:red;">Error Tweeting</span>');                           
                        //$.mobile.changePage($('#page-home'), { reverse : true, changeHash: false });
                   // }
          //  );                  
        });
        $('#cancel-tweet').click(function() {
             console.log("AppLaudLog: tweet cancelled by user");
             $.mobile.changePage($('#page-home'), { reverse : true, changeHash: false });
        });

        $('#dialog-tweet-text').html('<p>Really tweet ' + $('#tweettextarea').val().length 
                 + ' characters?<br>Your status:<br>"' + theTweet + '"');
        $.mobile.changePage($('#page-dialog-tweet'), { role: 'dialog', changeHash: false });
    });
   
    $('#networkbutton').click(function() {
        checkConnection();
    });
});
	
 function onSendUpload() {
	 if ($('#twitteridhidden').val().length === 0) {
            alert('You did not select a photo or image.');
            return false;
        }
	
		   $('#loader').show();
		   $('#stage-data').hide();
   var options = new FileUploadOptions();
	options.fileKey="file";
	//options.fileName="newfile.txt";
	options.mimeType="image/jpeg";
	options.chunkedMode = false;
 
	var params = new Object();
	params.value1 = $('#twitteridhidden1').val();
	params.value2 = $('#tweettextarea').val();
	//params.value2 = 'test';
	//params.value3 = 'checked';
	params.value3 = $('#checkbox-1:checked').val();
 
	options.params = params;
 var imageURI2 = $('#twitteridhidden').val();
	var ft = new FileTransfer();
	ft.upload(imageURI2, "http://android.ipic.nu/upload.php", win, fail, options);
	// Make sure you use your own site!
  }
 
    // Called when a photo is successfully retrieved (taken with camera)
    function onPhotoDataSuccess(imageURI) {
		$.mobile.changePage("#page-home", "fade");
	//alert("Your photo was taken successfully.");
	// Get image handle
	var largeImage = document.getElementById('largeImage');
 
	// Unhide image elements
	largeImage.style.display = 'block';
 
	// Show the captured photo
	// The inline CSS rules are used to resize the image
	largeImage.src = imageURI;
   
      $("#twitteridhidden").val(imageURI);
	  $('#capturebuttons').hide();			
    }
 
    // Called when a photo is successfully retrieved (out of the device's library)
    function onPhotoURISuccess(imageURI) {
 $.mobile.changePage("#page-home", "fade");
	// Get image handle
	var largeImage = document.getElementById('largeImage');
 
	// Unhide image elements
	largeImage.style.display = 'block';
 
	// Show the captured photo
	// The inline CSS rules are used to resize the image
	largeImage.src = imageURI;
   
      $("#twitteridhidden").val(imageURI);
$('#capturebuttons').hide();
	
 
    }
 
    // Success reporting
    function win(r) {
        alert("Photo or image has been succesfully uploaded to iPic.nu.");
       // alert("Response = " + r.response);
	    $('#loader').hide();
		 $('#stage-data').show();
		$('#tweettextarea').empty();
		$('#twitteridhidden').val("");
		var largeImage = document.getElementById('largeImage');
		largeImage.style.display = 'none';
		largeImage.src = "";
		$('#capturebuttons').show();
    }
 
    // Error reporting
    function fail(message) {
        alert('Failed because: ' + message);
    }
 
    function capturePhoto(source) {
	// Take picture using device camera and retrieve image as base64-encoded string
	navigator.camera.getPicture(onPhotoDataSuccess, fail, {
		quality: 30, 
		destinationType: destinationType.FILE_URI,
		sourceType: source
    });
	}
 
    function getPhoto(source) {
	// Retrieve image file location from specified source
	navigator.camera.getPicture(onPhotoURISuccess, fail, { 
		quality: 30, 
		destinationType: destinationType.FILE_URI,
		sourceType: source
	});
    }

function getLatestPics() {
$('#latestimages').empty();
	$.getJSON('http://api.ipic.nu/recipes/latest_pics.php?',
  {
    num: "10",
    format: "json"
  }, function(data) {
$.each(data.posts, function(i,post1){
	//var imagesrc ='http://ipic.nu/uploads/thumbs/' + data1.thumb;
	var div_data =
'<img src="http://ipic.nu/uploads/thumbs/' + post1.post.thumb + '" width="100px" height="100px" border="0" style="padding:8px;">';
$(div_data).appendTo("#latestimages");

/* $("#latestimages").append(
 '<img src="http://ipic.nu/uploads/thumbs/' + data[i].thumb + '" width="100px">' );*/
  });
});
	
}
function getMyPics() {
	$('#myimages').empty();
	var twitterID1 = $('#twitteridhidden1').val();
	$.getJSON('http://api.ipic.nu/recipes/my_pics.php?',
  {
    twitterid: twitterID1,
    format: "json"
  }, function(data) {
$.each(data.posts, function(i,post2){
	//var imagesrc ='http://ipic.nu/uploads/thumbs/' + data1.thumb;
	var div_data =
'<img src="http://ipic.nu/uploads/thumbs/' + post2.post.thumb + '" width="100px" height="100px" border="0" style="padding:8px;">';
$(div_data).appendTo("#myimages");

/* $("#latestimages").append(
 '<img src="http://ipic.nu/uploads/thumbs/' + data[i].thumb + '" width="100px">' );*/
  });
});

}
	





		$(document).bind("mobileinit", function(){
	  		$.mobile.touchOverflowEnabled = true;
		});
      




   var viewImagePic = $_GET['img'];
   var viewImage = document.getElementById('viewImage');
 
	// Unhide image elements
	viewImage.style.display = 'block';
 
	// Show the captured photo
	// The inline CSS rules are used to resize the image
	viewImage.src = "http://iPic.nu/viewimg.php?width=320&image=/uploads/full/"+viewImagePic;

<!--
  // XHTML should not attempt to parse these strings, declare them CDATA.
  /* <![CDATA[ */
  window.googleAfmcRequest = {
    client: 'ca-mb-pub-8420798389736001',
    format: '320x50_mb',
    output: 'html',
    slotname: '7135858924',
  };
  /* ]]> */
//-->







		$(document).bind("mobileinit", function(){
	  		$.mobile.touchOverflowEnabled = true;
		});
      



<!--//<![CDATA[
   var m3_u = (location.protocol=='https:'?'https://ipic.nu/advertising/www/delivery/ajs.php':'http://ipic.nu/advertising/www/delivery/ajs.php');
   var m3_r = Math.floor(Math.random()*99999999999);
   if (!document.MAX_used) document.MAX_used = ',';
   document.write ("<scr"+"ipt type='text/javascript' src='"+m3_u);
   document.write ("?zoneid=12");
   document.write ('&amp;cb=' + m3_r);
   if (document.MAX_used != ',') document.write ("&amp;exclude=" + document.MAX_used);
   document.write (document.charset ? '&amp;charset='+document.charset : (document.characterSet ? '&amp;charset='+document.characterSet : ''));
   document.write ("&amp;loc=" + escape(window.location));
   if (document.referrer) document.write ("&amp;referer=" + escape(document.referrer));
   if (document.context) document.write ("&context=" + escape(document.context));
   if (document.mmm_fo) document.write ("&amp;mmm_fo=1");
   document.write ("'><\/scr"+"ipt>");
//]]>-->
<!--//<![CDATA[
   var m3_u = (location.protocol=='https:'?'https://ipic.nu/advertising/www/delivery/ajs.php':'http://ipic.nu/advertising/www/delivery/ajs.php');
   var m3_r = Math.floor(Math.random()*99999999999);
   if (!document.MAX_used) document.MAX_used = ',';
   document.write ("<scr"+"ipt type='text/javascript' src='"+m3_u);
   document.write ("?zoneid=12");
   document.write ('&amp;cb=' + m3_r);
   if (document.MAX_used != ',') document.write ("&amp;exclude=" + document.MAX_used);
   document.write (document.charset ? '&amp;charset='+document.charset : (document.characterSet ? '&amp;charset='+document.characterSet : ''));
   document.write ("&amp;loc=" + escape(window.location));
   if (document.referrer) document.write ("&amp;referer=" + escape(document.referrer));
   if (document.context) document.write ("&context=" + escape(document.context));
   if (document.mmm_fo) document.write ("&amp;mmm_fo=1");
   document.write ("'><\/scr"+"ipt>");
//]]>-->
<!--//<![CDATA[
   var m3_u = (location.protocol=='https:'?'https://ipic.nu/advertising/www/delivery/ajs.php':'http://ipic.nu/advertising/www/delivery/ajs.php');
   var m3_r = Math.floor(Math.random()*99999999999);
   if (!document.MAX_used) document.MAX_used = ',';
   document.write ("<scr"+"ipt type='text/javascript' src='"+m3_u);
   document.write ("?zoneid=12");
   document.write ('&amp;cb=' + m3_r);
   if (document.MAX_used != ',') document.write ("&amp;exclude=" + document.MAX_used);
   document.write (document.charset ? '&amp;charset='+document.charset : (document.characterSet ? '&amp;charset='+document.characterSet : ''));
   document.write ("&amp;loc=" + escape(window.location));
   if (document.referrer) document.write ("&amp;referer=" + escape(document.referrer));
   if (document.context) document.write ("&context=" + escape(document.context));
   if (document.mmm_fo) document.write ("&amp;mmm_fo=1");
   document.write ("'><\/scr"+"ipt>");
//]]>-->
<!--//<![CDATA[
   var m3_u = (location.protocol=='https:'?'https://ipic.nu/advertising/www/delivery/ajs.php':'http://ipic.nu/advertising/www/delivery/ajs.php');
   var m3_r = Math.floor(Math.random()*99999999999);
   if (!document.MAX_used) document.MAX_used = ',';
   document.write ("<scr"+"ipt type='text/javascript' src='"+m3_u);
   document.write ("?zoneid=12");
   document.write ('&amp;cb=' + m3_r);
   if (document.MAX_used != ',') document.write ("&amp;exclude=" + document.MAX_used);
   document.write (document.charset ? '&amp;charset='+document.charset : (document.characterSet ? '&amp;charset='+document.characterSet : ''));
   document.write ("&amp;loc=" + escape(window.location));
   if (document.referrer) document.write ("&amp;referer=" + escape(document.referrer));
   if (document.context) document.write ("&context=" + escape(document.context));
   if (document.mmm_fo) document.write ("&amp;mmm_fo=1");
   document.write ("'><\/scr"+"ipt>");
//]]>-->
<!--//<![CDATA[
   var m3_u = (location.protocol=='https:'?'https://ipic.nu/advertising/www/delivery/ajs.php':'http://ipic.nu/advertising/www/delivery/ajs.php');
   var m3_r = Math.floor(Math.random()*99999999999);
   if (!document.MAX_used) document.MAX_used = ',';
   document.write ("<scr"+"ipt type='text/javascript' src='"+m3_u);
   document.write ("?zoneid=12");
   document.write ('&amp;cb=' + m3_r);
   if (document.MAX_used != ',') document.write ("&amp;exclude=" + document.MAX_used);
   document.write (document.charset ? '&amp;charset='+document.charset : (document.characterSet ? '&amp;charset='+document.characterSet : ''));
   document.write ("&amp;loc=" + escape(window.location));
   if (document.referrer) document.write ("&amp;referer=" + escape(document.referrer));
   if (document.context) document.write ("&context=" + escape(document.context));
   if (document.mmm_fo) document.write ("&amp;mmm_fo=1");
   document.write ("'><\/scr"+"ipt>");
//]]>-->
<!--//<![CDATA[
   var m3_u = (location.protocol=='https:'?'https://ipic.nu/advertising/www/delivery/ajs.php':'http://ipic.nu/advertising/www/delivery/ajs.php');
   var m3_r = Math.floor(Math.random()*99999999999);
   if (!document.MAX_used) document.MAX_used = ',';
   document.write ("<scr"+"ipt type='text/javascript' src='"+m3_u);
   document.write ("?zoneid=12");
   document.write ('&amp;cb=' + m3_r);
   if (document.MAX_used != ',') document.write ("&amp;exclude=" + document.MAX_used);
   document.write (document.charset ? '&amp;charset='+document.charset : (document.characterSet ? '&amp;charset='+document.characterSet : ''));
   document.write ("&amp;loc=" + escape(window.location));
   if (document.referrer) document.write ("&amp;referer=" + escape(document.referrer));
   if (document.context) document.write ("&context=" + escape(document.context));
   if (document.mmm_fo) document.write ("&amp;mmm_fo=1");
   document.write ("'><\/scr"+"ipt>");
//]]>-->
<!--//<![CDATA[
   var m3_u = (location.protocol=='https:'?'https://ipic.nu/advertising/www/delivery/ajs.php':'http://ipic.nu/advertising/www/delivery/ajs.php');
   var m3_r = Math.floor(Math.random()*99999999999);
   if (!document.MAX_used) document.MAX_used = ',';
   document.write ("<scr"+"ipt type='text/javascript' src='"+m3_u);
   document.write ("?zoneid=12");
   document.write ('&amp;cb=' + m3_r);
   if (document.MAX_used != ',') document.write ("&amp;exclude=" + document.MAX_used);
   document.write (document.charset ? '&amp;charset='+document.charset : (document.characterSet ? '&amp;charset='+document.characterSet : ''));
   document.write ("&amp;loc=" + escape(window.location));
   if (document.referrer) document.write ("&amp;referer=" + escape(document.referrer));
   if (document.context) document.write ("&context=" + escape(document.context));
   if (document.mmm_fo) document.write ("&amp;mmm_fo=1");
   document.write ("'><\/scr"+"ipt>");
//]]>-->
<!--//<![CDATA[
   var m3_u = (location.protocol=='https:'?'https://ipic.nu/advertising/www/delivery/ajs.php':'http://ipic.nu/advertising/www/delivery/ajs.php');
   var m3_r = Math.floor(Math.random()*99999999999);
   if (!document.MAX_used) document.MAX_used = ',';
   document.write ("<scr"+"ipt type='text/javascript' src='"+m3_u);
   document.write ("?zoneid=12");
   document.write ('&amp;cb=' + m3_r);
   if (document.MAX_used != ',') document.write ("&amp;exclude=" + document.MAX_used);
   document.write (document.charset ? '&amp;charset='+document.charset : (document.characterSet ? '&amp;charset='+document.characterSet : ''));
   document.write ("&amp;loc=" + escape(window.location));
   if (document.referrer) document.write ("&amp;referer=" + escape(document.referrer));
   if (document.context) document.write ("&context=" + escape(document.context));
   if (document.mmm_fo) document.write ("&amp;mmm_fo=1");
   document.write ("'><\/scr"+"ipt>");
//]]>-->
<!--//<![CDATA[
   var m3_u = (location.protocol=='https:'?'https://ipic.nu/advertising/www/delivery/ajs.php':'http://ipic.nu/advertising/www/delivery/ajs.php');
   var m3_r = Math.floor(Math.random()*99999999999);
   if (!document.MAX_used) document.MAX_used = ',';
   document.write ("<scr"+"ipt type='text/javascript' src='"+m3_u);
   document.write ("?zoneid=12");
   document.write ('&amp;cb=' + m3_r);
   if (document.MAX_used != ',') document.write ("&amp;exclude=" + document.MAX_used);
   document.write (document.charset ? '&amp;charset='+document.charset : (document.characterSet ? '&amp;charset='+document.characterSet : ''));
   document.write ("&amp;loc=" + escape(window.location));
   if (document.referrer) document.write ("&amp;referer=" + escape(document.referrer));
   if (document.context) document.write ("&context=" + escape(document.context));
   if (document.mmm_fo) document.write ("&amp;mmm_fo=1");
   document.write ("'><\/scr"+"ipt>");
//]]>-->
<!--//<![CDATA[
   var m3_u = (location.protocol=='https:'?'https://ipic.nu/advertising/www/delivery/ajs.php':'http://ipic.nu/advertising/www/delivery/ajs.php');
   var m3_r = Math.floor(Math.random()*99999999999);
   if (!document.MAX_used) document.MAX_used = ',';
   document.write ("<scr"+"ipt type='text/javascript' src='"+m3_u);
   document.write ("?zoneid=12");
   document.write ('&amp;cb=' + m3_r);
   if (document.MAX_used != ',') document.write ("&amp;exclude=" + document.MAX_used);
   document.write (document.charset ? '&amp;charset='+document.charset : (document.characterSet ? '&amp;charset='+document.characterSet : ''));
   document.write ("&amp;loc=" + escape(window.location));
   if (document.referrer) document.write ("&amp;referer=" + escape(document.referrer));
   if (document.context) document.write ("&context=" + escape(document.context));
   if (document.mmm_fo) document.write ("&amp;mmm_fo=1");
   document.write ("'><\/scr"+"ipt>");
//]]>-->
