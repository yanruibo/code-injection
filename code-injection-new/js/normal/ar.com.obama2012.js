










      // Initialize the Facebook SDK
      document.addEventListener('deviceready', function() {
          FB.init({
              appId: '165261990264326',
              nativeInterface: CDV.FB,
              useCachedDialogs: false
          });
      
          FB.getLoginStatus(handleStatusChange);
      
          authUser();
          updateAuthElements();
      });
  

//////////////////////////
//
// Config
// Set your app id here.
//
//////////////////////////

if (window.location.host == 'facebookmobileweb.com' || window.location.host == 'www.facebookmobileweb.com') {
  var gAppID = '147366981996453';
}
//Add your Application ID here
else {
  var gAppID = '269377779842002';
}

if (gAppID == 'enter_your_appid_here') {
  alert('You need to enter your App ID in js/_config.js on line 13.');
}

//Initialize the Facebook SDK
//See https://developers.facebook.com/docs/reference/javascript/
window.fbAsyncInit = function() {
  FB.init({ 
    appId: gAppID,
    status: true,
    cookie: true,
    xfbml: true,
    frictionlessRequests: true,
    useCachedDialogs: true,
    oauth: true
  });
  
  authUser();
  checkForCredits();
  updateAuthElements();
};

// Load the SDK Asynchronously
(function(d){
 var js, id = 'facebook-jssdk', ref = d.getElementsByTagName('script')[0];
 if (d.getElementById(id)) {return;}
 js = d.createElement('script'); js.id = id; js.async = true;
 js.src = "//connect.facebook.net/en_US/all.js";
 ref.parentNode.insertBefore(js, ref);
}(document));

//////////////////////////
//
// News Feed
// See the "News Feed" section on https://developers.facebook.com/mobile
//
//////////////////////////

//Publish a story to the user's own wall
function publishStory() {
  FB.ui({
    method: 'feed',
    name: 'I\'m using the Hackbook web app',
    caption: 'Hackbook for Mobile Web.',
    description: 'Check out Hackbook for Mobile Web to learn how you can make your web apps social using Facebook Platform.',
    link: 'http://apps.facebook.com/mobile-start/',
    picture: 'http://www.facebookmobileweb.com/hackbook/img/facebook_icon_large.png',
    actions: [{ name: 'Get Started', link: 'http://apps.facebook.com/mobile-start/' }],
  }, 
  function(response) {
    console.log('publishStory UI response: ', response);
  });
}

//Publish a story to the user's friend's wall
function publishStoryFriend() {
  randNum = Math.floor ( Math.random() * friendIDs.length ); 

  var friendID = friendIDs[randNum];
  
  console.log('Opening a dialog for friendID: ', friendID);
  
  FB.ui({
    method: 'feed',
    to: friendID,
    name: 'I\'m using the Hackbook web app',
    caption: 'Hackbook for Mobile Web.',
    description: 'Check out Hackbook for Mobile Web to learn how you can make your web apps social using Facebook Platform.',
    link: 'http://apps.facebook.com/mobile-start/',
    picture: 'http://www.facebookmobileweb.com/hackbook/img/facebook_icon_large.png',
    actions: [{ name: 'Get Started', link: 'http://apps.facebook.com/mobile-start/' }],
    user_message_prompt: 'Tell your friends about building social web apps.'
  }, 
  function(response) {
    console.log('publishStoryFriend UI response: ', response);
  });
}

/*

 UI assist functions
yo
*/

//show a loading screen when launched, until we get the user's session back
setAction("Loading Obama 2012", true);

//Swaps the pages out when the user taps on a choice
function openPage(pageName, ignoreHistoryPush) {
  window.scrollTo(0,1);

  var els = document.getElementsByClassName('page');
  
  for (var i = 0 ; i < els.length ; ++i) {
    els[i].style.display = 'none';
  }
  
  var page = document.getElementById('page-' + pageName);
  
  page.style.display = "block";
  
  title = (pageName == 'root') ? 'Obama 2012' : pageName.replace(/-/g, ' ');
  document.getElementById('title').innerHTML = title;
  
  if (ignoreHistoryPush != true) {
    window.history.pushState({page: pageName}, '', document.location.origin + document.location.pathname + "#" + pageName);
  }

  document.getElementById('back').style.display = (pageName == 'root') ? 'none' : 'block';
}

window.onpopstate = function(e) {
  if (e.state != null) {
    console.log(e.state);
    openPage(e.state.page);
  }
  else {
    openPage('root', true);
  }
}

openPage('root', true);

//Shows a modal dialog when fetcing data from Facebook
function setAction(msg, hideBackground) {
  document.getElementById('action').style.display = 'block';
  
  if (hideBackground) {
    document.getElementById('action').style.opacity = '100';
  }
  else {
    document.getElementById('action').style.opacity = '.9';
  }
  
  document.getElementById('msg').innerHTML = msg;
  
  window.scrollTo(0, 1);
}

//Clears the modal dialog
function clearAction() {
  document.getElementById('msg').innerHTML = '';
  
  document.getElementById('action').style.display = 'none';
}

//Automatically scroll away the address bar
addEventListener("load", function() { setTimeout(hideURLbar, 0); }, false);

function hideURLbar() {
  window.scrollTo(0,1);
}

function hideButton(button) {
  button.style.display = 'none';
}


//////////////////////////
//
// Requests
// See the "Requests" section on https://developers.facebook.com/mobile
//
//////////////////////////

//Send a request to friends have have logged into the app in the past, as well as friends that haven't
function sendRequestBoth() {
  FB.ui({
    method: 'apprequests',
    message: 'Learn how to make your mobile web app social',
  }, 
  function(response) {
    console.log('sendRequestBoth response: ', response);
  });
}

//Send an invite to friends that haven't logged into the app yet
function sendRequestInvite() {
  FB.ui({
    method: 'apprequests',
    suggestions: nonAppFriendIDs,
    message: 'Learn how to make your mobile web app social',
  }, function(response) {
    console.log('sendRequestInvite UI response: ', response);
  });
}

//Send a request to friends that are already using the app
function sendRequest() {
  FB.ui({
    method: 'apprequests',
    suggestions: appFriendIDs,
    message: 'Learn how to make your mobile web app social',
  }, function(response) {
    console.log('sendRequest UI response: ', response);
  });
}

//Send a request to a single friend that is using the app
function sendRequestSingle() {
  randNum = Math.floor ( Math.random() * friendIDs.length ); 

  var friendID = friendIDs[randNum];

  FB.ui({
    method: 'apprequests',
    //Use the first friend returned
    to: friendID,
    message: 'Learn how to make your mobile web app social',
  }, function(response) {
    console.log('sendRequestSingle UI response: ', response);
  });
}

//////////////////////////
//
// Credits
// See https://developers.facebook.com/docs/creditsapi/
//
//////////////////////////

//Prompt the user to pay for a virtual good
function sendPay() {
  FB.ui({
      method: 'pay',
      credits_purchase: false,
      // This is the item ID defined in your game or app
      order_info: 'locket'
  },
  function(response) {
    console.log('sendPay response: ', response);
  });
}

//If Hackbook is running from within the Facebook iOS native app, disable Credits
function checkForCredits() {
  if (FB.UA.nativeApp()) {
    document.getElementById('credits-button').style.display = 'none';
  }
}

//////////////////////////
//
// Graph API
// See https://developers.facebook.com/docs/reference/api/
//
//////////////////////////

//Detect when Facebook tells us that the user's session has been returned
function updateAuthElements() {
  FB.Event.subscribe('auth.statusChange', function(session) {
    //If the user isn't logged in, set the body class so that we show/hide the correct elements
    if (!session.authResponse) {
      if (document.body.className != 'not_connected') {
        document.body.className = 'not_permissioned';
      }
    }
    //The user is logged in, so let's see if they've granted the check-in permission and pre-fetch some data
    //Depending on if they have or haven't, we'll set the body to reflect that so we show/hide the correct elements on the page
    else {
      preFetchData();
      
      FB.api({method: 'fql.query', query: 'SELECT user_checkins, publish_checkins FROM permissions WHERE uid = me()'}, function(response) {
        if (document.body.className != 'not_connected') {
        console.log("Reading permissions");
        console.log(response);
          //We couldn't get a check-in for the user, so they haven't granted the permission
          if (response[0].user_checkins == 1) {
            document.body.className = 'permissioned';
          }
          //We were able to get a check-in for the user, so they have granted the permission already
          else {
            document.body.className = 'not_permissioned';
          }
        }
      });
    }
  });
}

//Get the user's basic information
function getUserBasicInfo() {
  setAction('Getting your information', false);
  
  var markup = '<div class="data-header">Your information:</div>';
  
  //Update display of user name and picture
  if (document.getElementById('user-info')) {
    var profilePictureUrl = '';
    if (user.picture.data) {
      profilePictureUrl = user.picture.data.url;
    } else {
      profilePictureUrl = user.picture;
    }
    markup = markup + '<strong>User ID:</strong> ' + user.id + '<br />' + '<strong>Name:</strong> ' + user.name + '<br />' + '<strong>Profile picture URL:</strong> <a href="' + profilePictureUrl + '" target="_blank">' + profilePictureUrl + '</a><br />';
    document.getElementById('user-info').innerHTML = markup;
    
    clearAction();
  }
}

//Get the user's friends
function getUserFriends() {
  var markup = '<div class="data-header">Friends (capped at 25):</div>';
  
  for (var i=0; i < friendsInfo.length && i < 25; i++) {
    var profilePictureUrl = '';
    if (friendsInfo[i].picture.data) {
      profilePictureUrl = friendsInfo[i].picture.data.url;
    } else {
      profilePictureUrl = friendsInfo[i].picture;
    }
    markup = markup + '<img src="' + profilePictureUrl + '">' + friendsInfo[i].name + '<br />';
  }
  
  document.getElementById('user-friends').innerHTML = markup;
}

//Get the user's check-ins
function getCheckIns() {
  setAction('Getting check-ins', false);
  
  FB.api('/me/checkins', function(response) {
    console.log('Got your check-ins: ', response);
    
    clearAction();
    
    if (!response.error) {
      displayCheckIns(response.data, document.getElementById('checkins'));
    }
  });
}

//Display the user's check-ins
function displayCheckIns(checkins, dom) {
  var markup = '<div class="data-header">Your last five check-ins:</div>';
  
  for (var i=0; i < checkins.length && i < 5; i++) {
    var checkin = checkins[i];
    
    markup += '<div class="place">'
        + '<div class="picture"><img src="http://graph.facebook.com/' + checkin.place.id + '/picture"></div>'
        + '<div class="info">'
        + '  <div class="name">' + checkin.place.name + '</div>'
        + '  <div class="check-in-msg">' + (checkin.message || '') + '</div>'
        + '</div>'
      + '</div>';
  }
  
  dom.innerHTML = markup;
}

//Display the local places that the user can check into
function displayPlaces(places, dom) {
  var markup = '<div class="data-header">Nearby locations:</div>';
  
  for (var i=0; i < places.length && i < 5; i++) {
    var place = places[i];
    
    markup += '<div class="place">'
        + '<div class="picture"><img src="http://graph.facebook.com/' + place.id + '/picture"></div>'
        + '<div class="info">'
        + '  <div class="name">' + place.name + '</div>'
        + '  <div class="check-in-button"><input type="button" value="Check in" onclick="checkin(' + place.id + ')" /></div>'
        + '</div>'
      + '</div>';
  }
  
  dom.innerHTML = markup;
}

//Check the user into the place
function checkin(id) {
  setAction("Checking you in", false);
  
  var params = {
    method: 'POST',
    place: id,
    coordinates: {
      latitude: curLocation.coords.latitude,
      longitude: curLocation.coords.longitude
    },
    message: ''
  };

  console.log('Checking you into using the following params: ', params);
  
  FB.api('/me/checkins', params,
    function(response) {
      clearAction();
      
      console.log('Checked you into the place, here\'s the response: ', response);
      
      setAction("You've successfully checked in!", false);
      
      setTimeout('clearAction();', 2000);
    }
  );
}

//Get locations near the user
function getNearby() {
  setAction("Getting nearby locations", false);
  
  // First use browser's geolocation API to obtain location
  navigator.geolocation.getCurrentPosition(function(location) {
    curLocation = location;
    console.log(location);

    // Use graph API to search nearby places
    var path = '/search?type=place&center=' + location.coords.latitude + ',' + location.coords.longitude + '&distance=1000';
    
    FB.api(path, function(response) {
      clearAction();
      console.log('Got some places near you: ', response);
      if (!response.error) {
        displayPlaces(response.data, document.getElementById('locations-nearby'));
      }
    });
  });
}

//Prompt the user to grant the check-in permission
function promptCheckInPermission() {
  FB.login(function(response) {
    if (response.authResponse) {
      //User granted permissions
      document.body.className = 'permissioned';
    } 
    else {
      //User didn't grant permissions
      alert('You need to grant the check-in permission before using this functionality.');
    }
  }, {scope:'user_checkins,publish_checkins'});
}

//Pre-fetch data, mainly used for requests and feed publish dialog
var nonAppFriendIDs = [];
var appFriendIDs = [];
var friendIDs = [];
var friendsInfo = [];

function preFetchData() {
  //First, get friends that are using the app
  FB.api({method: 'friends.getAppUsers'}, function(appFriendResponse) {
    appFriendIDs = appFriendResponse;
  
    //Now fetch all of the user's friends so that we can determine who hasn't used the app yet
    FB.api('/me/friends', { fields: 'id, name, picture' }, function(friendResponse) {
      friends = friendResponse.data;
      
      //limit to a 200 friends so it's fast
      for (var k = 0; k < friends.length && k < 200; k++) {
        var friend = friends[k];
        var index = 1;
        
        friendIDs[k] = friend.id;
        friendsInfo[k] = friend;
        
        for (var i = 0; i < appFriendIDs.length; i++) {
          if (appFriendIDs[i] == friend.id) {
            index = -1;
          }
        }       
        
        if (index == 1) { 
          nonAppFriendIDs.push(friend.id);
        }
      }
      
      console.log('Got your friend\'s that use the app: ', appFriendIDs);
      
      console.log('Got all of your friends: ', friendIDs);
      
      console.log('Got friends that are not using the app yet: ', nonAppFriendIDs);
    });
  });
}

//////////////////////////
//
// Authentication
// See "Logging the user in" on https://developers.facebook.com/mobile
//
//////////////////////////

var user = [];

//Detect when Facebook tells us that the user's session has been returned
function authUser() {
  FB.Event.subscribe('auth.statusChange', handleStatusChange);
}

function handleStatusChange(session) {
    console.log('Got the user\'s session: ', session);
    
    if (session.authResponse) {
        document.body.className = 'connected';
        
        //Fetch user's id, name, and picture
        FB.api('/me', {
          fields: 'name, picture'
        },
        function(response) {
          if (!response.error) {
            user = response;
            
            console.log('Got the user\'s name and picture: ');
            console.log(response);
            
            //Update display of user name and picture
            if (document.getElementById('user-name')) {
              document.getElementById('user-name').innerHTML = user.name;
            }
            if (document.getElementById('user-picture')) {
              if (user.picture.data) {
                  document.getElementById('user-picture').src = user.picture.data.url;
              } else {
                  document.getElementById('user-picture').src = user.picture;
              }
            }
          }
          
          clearAction();
        });
    } else {
      document.body.className = 'not_connected';
      
      clearAction();
    }
}

//Prompt the user to login and ask for the 'email' permission
function promptLogin() {
  FB.login(null, {scope: 'email'});
}

//This will prompt the user to grant you acess to their Facebook Likes
function promptExtendedPermissions() {
  FB.login(function() {
    setAction("The 'user_likes' permission has been granted.", false);
    
    setTimeout('clearAction();', 2000);
    
    document.body.className = 'permissioned';
  }, {scope: 'user_likes'});
}

//See https://developers.facebook.com/docs/reference/rest/auth.revokeAuthorization/
function uninstallApp() {
  FB.api({method: 'auth.revokeAuthorization'},
    function(response) {
     // window.location.reload();
     // To clear the local storage cache and native session, call logout
     logout();
    });
}

//See https://developers.facebook.com/docs/reference/javascript/FB.logout/
function logout() {
  FB.logout(function(response) {
    window.location.reload();
  });
}
