




var mpq=[];mpq.push(["init","1a9242a84876a86c7adf76b3b69dbd1d"]);(function(){var b,a,e,d,c;b=document.createElement("script");b.type="text/javascript";b.async=true;b.src=(document.location.protocol==="https:"?"https:":"http:")+"//api.mixpanel.com/site_media/js/api/mixpanel.js";a=document.getElementsByTagName("script")[0];a.parentNode.insertBefore(b,a);e=function(f){return function(){mpq.push([f].concat(Array.prototype.slice.call(arguments,0)))}};d=["init","track","track_links","track_forms","register","register_once","identify","name_tag","set_config"];for(c=0;c<d.length;c++){mpq[d[c]]=e(d[c])}})();
    








































        // Use this statement for use on a mobile device
        //document.addEventListener("deviceready",wall.mainLaunch,false);
        
        // Use this statement for testing in a desktop browser
        //document.addEventListener("onload",wall.mainLaunch,false);
        
    




            // Use this statement for use on a mobile device
            document.addEventListener("deviceready",wall.mainLaunch,false);
            
            // Use this statement for testing in a desktop browser
            //document.addEventListener("onload",wall.mainLaunch,false);
            
            




















































var mpq=[];mpq.push(["init","1a9242a84876a86c7adf76b3b69dbd1d"]);(function(){var b,a,e,d,c;b=document.createElement("script");b.type="text/javascript";b.async=true;b.src=(document.location.protocol==="https:"?"https:":"http:")+"//api.mixpanel.com/site_media/js/api/mixpanel.js";a=document.getElementsByTagName("script")[0];a.parentNode.insertBefore(b,a);e=function(f){return function(){mpq.push([f].concat(Array.prototype.slice.call(arguments,0)))}};d=["init","track","track_links","track_forms","register","register_once","identify","name_tag","set_config"];for(c=0;c<d.length;c++){mpq[d[c]]=e(d[c])}})();
    








































        // Use this statement for use on a mobile device
        document.addEventListener("deviceready",wall.mainLaunch,false);
        
        // Use this statement for testing in a desktop browser
        //document.addEventListener("onload",wall.mainLaunch,false);
        
    

Ext.regApplication({
    name: 'wall',
    launch: function() {
       this.launched = true;
       this.mainLaunch();
    },
    mainLaunch: function() {
        //alert('in mainLaunch');
        // Comment out the following 'if' statement for testing in a desktop browser       
        if (!device || !this.launched) {return;}
        //alert('app 0');
        userRecord = new wall.models.User();
          
        // setup camera 
        pictureSource=navigator.camera.PictureSourceType;
        destinationType=navigator.camera.DestinationType;

        // setup gps
        //var options = {maximumAge: 3000, timeout: 5000, enableHighAccuracy: true};
        navigator.geolocation.watchPosition(onGpsSuccess, onGpsError,{maximumAge:5000,enableHighAccuracy: true, timeout:5000});
                   checkFence();
                   setInterval(checkFence, 2000);
                   
        // setup ChildBrowser
        //childBrowser=ChildBrowser.install();
                   
        // setup facebook
        try {
        //alert('calling FB.init');
                   FB.init({ appId: "271670512927387", nativeInterface: CDV.FB, useCachedDialogs: false });
                   //document.getElementById('data').innerHTML = "";
        } catch (e) {
        //alert(e);
        }
               
        this.views.viewport = new this.views.Viewport();
        //alert('app 1');
        Ext.dispatch({
            controller: wall.controllers.main,
            action: 'showHomeMenu',
            //action: 'testproxy',
            animation: {type: 'slide', direction: 'left'}
        });
    }
});

// Model for the List which links to each rss feed
Ext.regModel('wall.models.RssList',{
    fields: [
        {name: 'feedName', type: 'string'},
        {name: 'feedUrl', type: 'string'}
    ]
});

// Model for a single RSS feed, this is reused again and again
Ext.regModel('wall.models.RssFeed',{
    fields: [
        { name: 'title', type: 'string' },
        { name: 'description', type: 'string' }
    ]
});

// Contains the list of RSS feeds the component is initialized with
wall.stores.rssListStore = new Ext.data.Store({
    model: 'wall.models.RssList',
    data: [
        //{ feedName: 'NameToShowOnList', feedUrl: 'link_to_rss_feedx' },
        { feedName: 'Tumblr', feedUrl: 'http://coffeeapp.tumblr.com/rss' },
        { feedName: 'Drupal', feedUrl: 'http://www.melaniedoane.com/rss.xml' },
        { feedName: 'Facebook', feedUrl: 'http://www.facebook.com/feeds/page.php?id=113768065380209&format=atom10' },
        { feedName: 'Flickr', feedUrl: 'http://api.flickr.com/services/feeds/photoset.gne?set=72157627573220113&nsid=58926604@N02&lang=en-us&format=rss_200' },
        { feedName: 'Twitter', feedUrl: 'http://api.twitter.com/1/statuses/user_timeline.rss?screen_name=micayla_XO' },
        { feedName: 'FB Pipe', feedUrl: 'http://pipes.yahoo.com/pipes/pipe.run?_id=5106d44261ecbdb95ecaf6b662b4e517&_render=rss' },
        { feedName: 'YouTube', feedUrl: 'http://gdata.youtube.com/feeds/base/users/kitchenmistress/uploads?alt=rss&v=2&orderby=published&client=ytapi-youtube-profile' }, 
        { feedName: 'Yelp', feedUrl: 'http://www.yelp.com/syndicate/user/2Gfe12YWUlRhhqyKSlLFlw/rss.xml' }, 
        { feedName: 'Blog', feedUrl: 'http://thekitchenmistress.com/feed/' }, 
        { feedName: 'Pipes', feedUrl: 'http://pipes.yahoo.com/pipes/pipe.run?_id=9EFpbRhQ3hGkrb0d_w6H4A&_render=rss' }
    ]
});

// Loads the feed when the RSS item is tapped - contains only one feed at a time
wall.stores.rssFeedStore = new Ext.data.Store({
    model: 'wall.models.RssFeed'
});



//Model for each post
wall.models.WallPosts=Ext.regModel('wall.models.WallPosts', {
                                   fields: [{name: 'message',  type: 'string'},
                                            {name: 'timestamp',       convert: dtConverter},
                                            {name: 'userid', convert:fbPic},
                                            {name: 'urlL',  convert: noPic},
                                            {name: 'urlM',       convert: noPic},
                                            {name: 'urlS',       convert: noPic}]
                                   });

//Storage for data pulled from JSON
wall.stores.WallPostsStore= new Ext.data.Store({
                                              autoLoad: true,
                                              model: 'wall.models.WallPosts',
                                              //pageSize: 2,
                                              
                                              proxy: {
                                              type: 'ajax',
                                              url : 'http://arbdev.mine.nu/json3.php',
                                              extraParams: {
                                              application_name: wall_name, //This is passed to json3 to limit the wall
                                              
                                              },
                                              
                                              reader: {
                                              type: 'json'
                                              }
                                              },
                                              
                                              loadmask: true
                                              });


// Model for the Photo Table
wall.models.Photo = Ext.regModel('wall.models.Photo',{
    fields: [
        {name: 'photoId', type: 'string'}, // PK into photos
        {name: 'realName', type: 'string'},
        {name: 'hashO', type: 'string'},
        {name: 'hashL', type: 'string'},
        {name: 'hashM', type: 'string'},
        {name: 'hashS', type: 'string'},
    ],
    idProperty: 'photoId',
    proxy: {
        type: 'localstorage',
        id: 'theWallPhotos',
    },

});

// Store for the Photo Table
wall.stores.photoStore = new Ext.data.Store({
    model: 'wall.models.Photo'
});



Ext.data.ProxyMgr.registerType('contactstorage',
    Ext.extend(Ext.data.Proxy,{
              
        create: function(operation, callback, scope) {
        },

        read: function(operation, callback, scope) {
        var thisProxy = this;
        navigator.contacts.find(
            ['id', 'name', 'emails', 'phoneNumbers', 'addresses'],
            function(deviceContacts) {
                //success callback
                                var contacts = [];
                                for (var i = 0; i < deviceContacts.length; i++){
                                var deviceContact = deviceContacts[i];
                                var contact = new thisProxy.model({
                                      id: deviceContact.id,
                                      givenName: deviceContact.name.givenName,
                                      familyName: deviceContact.name.familyName,
                                      emails: deviceContact.emails,
                                      phoneNumbers: deviceContact.phoneNumbers
                                });
                                contact.deviceContact = deviceContact;
                                contacts.push(contact);
                                }
                                //return model instances in a result set
                                operation.resultSet = new Ext.data.ResultSet({
                                     records: contacts,
                                     total: contacts.length,
                                     loaded: true
                                });
                                //announce success
                                operation.setSuccessful();
                                operation.setCompleted();
                                //finish with callback
                                if (typeof callback == 'function') {
                                    callback.call(scope || thisProxy, operation);
                                }
            },
            function(e) {console.log('Error fetching contacts');},
            {multiple: true}
        );
        },

        update: function(operation, callback, scope) {
            operation.setStarted();
            //put model data back into deviceContact
            var deviceContact = operation.records[0].deviceContact;
            var contact = operation.records[0].data;
            deviceContact.name.givenName = contact.givenName;
            deviceContact.name.familyName = contact.familyName;
            //save back via PhoneGap
            var thisProxy = this;
            deviceContact.save(function() {
               //announce success
               operation.setCompleted();
               operation.setSuccessful();
               //finish with callback
               if (typeof callback == 'function') {
                   callback.call(scope || thisProxy, operation);
               }
            });
        },

        destroy: function(operation, callback, scope) {
        }
    })
);

wall.models.Contact = Ext.regModel('wall.models.Contact', {
                                  fields: [
                                           {name: 'id', type: 'int'},
                                           {name: 'givenName', type: 'string'},
                                           {name: 'familyName', type: 'string'},
                                           {name: 'emails', type: 'auto'},
                                           {name: 'phoneNumbers', type: 'auto'}
                                  ],
                                  proxy: {
                                      type: 'contactstorage'
                                  }
});

wall.stores.contacts = new Ext.data.Store({
                                         model: 'wall.models.Contact',
                                         sorters: 'familyName',
                                         getGroupString: function(record){
                                         return record.get('familyName')[0];
                                         }
});

userProxy = new Ext.data.Proxy({
    create: function(operation) {
        alert('user create');
                               console.log(operation);
        Ext.Ajax.request({
            //url: 'http://arbdev.mine.nu/user_modify.php',
            url: 'http://www.onenessportal.com/arbitragemobile/userproxy.php',
                         method: 'POST',
                         params: { userId: '0001'},
            success: function(e) {
                         console.log(e);
                //var obj = Ext.util.JSON.decode(e.responseText);
                //var guests = obj.guests;
                //if (guests) {
                //    var html = tpl.applyTemplate(guests);
                //    Ext.getCmp('recentTab').update(html);
                //}
            },
                         failure: function(response, options) {
                         console.log(response);
                         },
        });

    },
                                       
                                       read: function() {
                                       alert('user read');
                                       },
                                       
                                       update: function() {
                                       alert('user update');
                                       },
                                       
                                       destroy: function() {
                                       alert('user destroy');
                                       },
                                       
                               getById: function() {
                               alert('getById');
                               },
                                       
});


// Model for the User Profile
wall.models.User = Ext.regModel('wall.models.User',{
    fields: [
        {name: 'userId', type: 'int'}, // PK into user_profile
        {name: 'deviceId', type: 'string', defaultValue: ''},
        {name: 'userAcctStatus', type: 'string', defaultValue: 'U0'},
        {name: 'userFirstName', type: 'string'},
        {name: 'userLastName', type: 'string'},
        {name: 'userEmailAddress', type: 'string'},
        {name: 'userPassword', type: 'string'},
        {name: 'userPhoneNumber', type: 'string'},
        {name: 'userLocation', type: 'string'},
        {name: 'userGender', type: 'string', defaultValue: 'U'},
        {name: 'userAccountType', type: 'string', defaultValue: 'S'},
        {name: 'userSignedIn', type: 'boolean', defaultValue: false},
        {name: 'userDateCreated', type: 'string'},
        {name: 'userLastSignIn', type: 'string'},
        {name: 'photoId', type: 'string', defaultValue: '1'}, // FK into photos
        {name: 'userPhotoUrl', type: 'string'},
        {name: 'facebookConnectFlag', type: 'boolean', defaultValue: false},
        {name: 'facebookAccessToken', type: 'string'},
        {name: 'facebookAccessTokenSecret', type: 'string'},
        {name: 'sharePostsToFacebook', type: 'boolean', defaultValue: false},
        {name: 'twitterConnectFlag', type: 'boolean', defaultValue: false},
        {name: 'twitterAccessToken', type: 'string'},
        {name: 'twitterAccessTokenSecret', type: 'string'},
        {name: 'sharePostsToTwitter', type: 'boolean', defaultValue: false},
        {name: 'confirmationCode', type: 'string'},
    ],
    validations: [
                  {type: 'presence', 
                  field: 'userFirstName',
                  message: 'First Name is required.'},
                  
                  {type: 'presence', 
                  field: 'userEmailAddress',
                  message: 'Email Address is required.'},
                  
                  {type: 'presence', 
                  field: 'userPassword',
                  message: 'Password is required.'},
                  
                  {type: 'inclusion', field: 'userGender', list: ['U', 'F', 'M']},
                  
                  {type: 'format', 
                  field: 'userEmailAddress', 
                  matcher: /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/,
                  message: 'Must be a valid email address.'},

                  {type: 'format', 
                  field: 'userPhoneNumber', 
                  matcher: /^\(?([2-9][0-8][0-9])\)?[-. ]?([2-9][0-9]{2})[-. ]?([0-9]{4})$/,
                  message: 'Must be a valid phone number in the format (xxx) xxx-xxxx.'},
                  
    ],
    
    emailAddressAlreadyInUse: function(){
        var result = false;  // This email address is not used in any existing user accounts
        var tmpUserRecord = wall.stores.userStore.findRecord('userEmailAddress', this.get('userEmailAddress'));
        if (tmpUserRecord) {
            if (tmpUserRecord.get('userId') != this.get('userId')) {
                result = true; // A user account with already exists with this email address
            }
        }
        return result;
    },
    
    idProperty: 'userId',
    
    proxy: {
        type: 'rest',
        url: 'http://arbdev.mine.nu/102/userproxy.php',
        reader: {
            type: 'json',
            root: 'users',
            idProperty: 'userId',
            successProperty: 'success',
            totalProperty: 'total',
        },
        writer: {
            type: 'json',
            root: 'users',
        },
        id: 'theWallTestUsers',
    }

    /* * /
    proxy: {
        type: 'localstorage',
        id: 'theWallUsers',
    },
    /* */
});

// Store for the User Profile
wall.stores.userStore = new Ext.data.Store({
    model: 'wall.models.User',
    /*
    sorters: [{
        property: 'userFirstName',
        direction: 'ASC'
    }],
    */
    /*
                                           getById: function() {
                                           alert('getById');
                                           },
   */
/* 
    proxy: userProxy,
*/
 /* * /   
    proxy: {
        type: 'ajax',
        url: 'http://arbdev.mine.nu/user_modify.php',
        reader: {
           type: 'json',
           root: 'users',
           successProperty: 'success'
        },
        id: 'theWallUsers',
    }

 /* * /    
    proxy: {
        type: 'rest',
        //url: 'http://www.onenessportal.com/arbitragemobile/userproxy.php',
        url: 'http://arbdev.mine.nu/102/userproxy.php',
        //url: '/wall/lib/userproxy.php',
        reader: {
            type: 'json',
            root: 'users',
            idProperty: 'userId',
            successProperty: 'success',
            totalProperty: 'total',
        },
        writer: {
            type: 'json',
            root: 'users',

        },
        id: 'theWallTestUsers',
    }
/* */ 
     
         
                 
});

function userCallback(record, operation, controllerAction) {
    //alert('in userCallback');
    //console.log(record);
    //alert('1');
    //console.log(operation);
    //alert('2');
    //console.log(controllerAction);
    //alert(controllerAction);
    
    userProxyTimeout.cancel();
    
    Ext.dispatch({
                 controller: wall.controllers.main,
                 action: controllerAction,
                 record: record,
                 operation: operation,
                 });
    
    //alert('end userCallback');
}

userProxyTimeout = new Ext.util.DelayedTask( function() {
    // display error
    var hideNotification = new Ext.util.DelayedTask(function() {
                                                    wall.views.notificationOverlay.hide(
                                                                                        'fade'
                                                                                        );
                                                    });
    //wall.views.notificationOverlay.setSize({width: 10, height: 10});
    wall.views.notificationOverlay.update('Server taking too long to respond. Please try again.');
    wall.views.notificationOverlay.show();
    hideNotification.delay(2000);

                                            });



wall.models.ListMenu = Ext.regModel('wall.models.ListMenu', {
    fields: [
        {name: 'menuItem', type: 'string'},
        {name: 'menuAction', type: 'string'},
        {name: 'menuAllowedGroups', type: 'string', defaultValue: 'S'}
    ]
});

wall.stores.settingsMenuStore = new Ext.data.Store({
    model  : 'wall.models.ListMenu',
    data: [
        {menuItem: 'Account Settings', menuAction: 'showAccountSettingsMenu', menuAllowedGroups: 'S'},
        {menuItem: 'Sharing Settings', menuAction: 'showSharingSettingsForm', menuAllowedGroups: 'S'},
        {menuItem: 'Sign Out', menuAction: 'signOut', menuAllowedGroups: 'S,G'}
    ]
});

wall.stores.accountSettingsMenuStore = new Ext.data.Store({
    model  : 'wall.models.ListMenu',
    data: [
        {menuItem: 'User Profile', menuAction: 'showUserProfileForm'},
        {menuItem: 'Change Password', menuAction: 'showChangePasswordForm'},
        //{menuItem: 'Privacy Settings', menuAction: 'showPrivacySettingsForm'}
    ]
});


// Model for the List which links to each rss feed
Ext.regModel('wall.models.RssTwitterList',{
             fields: [
                      {name: 'feedTwitterName', type: 'string'},
                      {name: 'feedTwitterUrl', type: 'string'}
                      ]
             });

// Model for a single RSS feed, this is reused again and again
Ext.regModel('wall.models.RssTwitterFeed',{
             fields: [
                      { name: 'profile_image_url', type: 'string' },
                      { name: 'from_user', type: 'string' },
                      { name: 'text', type: 'string' },
                      ]
             });

// Contains the list of RSS feeds the component is initialized with
wall.stores.rssTwitterListStore = new Ext.data.Store({
                                              model: 'wall.models.RssTwitterList',
                                              data: [
                                                     //{ feedName: 'NameToShowOnList', feedUrl: 'link_to_rss_feedx' },
                                                     { feedName: 'Tumblr', feedUrl: 'http://coffeeapp.tumblr.com/rss' },
                                                     { feedName: 'Drupal', feedUrl: 'http://www.melaniedoane.com/rss.xml' },
                                                     { feedName: 'Facebook', feedUrl: 'http://www.facebook.com/feeds/page.php?id=113768065380209&format=atom10' },
                                                     { feedName: 'Flickr', feedUrl: 'http://api.flickr.com/services/feeds/photoset.gne?set=72157627573220113&nsid=58926604@N02&lang=en-us&format=rss_200' },
                                                     { feedName: 'Twitter', feedUrl: 'http://api.twitter.com/1/statuses/user_timeline.rss?screen_name=micayla_XO' },
                                                     { feedName: 'FB Pipe', feedUrl: 'http://pipes.yahoo.com/pipes/pipe.run?_id=5106d44261ecbdb95ecaf6b662b4e517&_render=rss' },
                                                     { feedName: 'YouTube', feedUrl: 'http://gdata.youtube.com/feeds/base/users/kitchenmistress/uploads?alt=rss&v=2&orderby=published&client=ytapi-youtube-profile' }, 
                                                     { feedName: 'Yelp', feedUrl: 'http://www.yelp.com/syndicate/user/2Gfe12YWUlRhhqyKSlLFlw/rss.xml' }, 
                                                     { feedName: 'Blog', feedUrl: 'http://thekitchenmistress.com/feed/' }, 
                                                     { feedName: 'Pipes', feedUrl: 'http://pipes.yahoo.com/pipes/pipe.run?_id=9EFpbRhQ3hGkrb0d_w6H4A&_render=rss' }
                                                     ]
                                              });

// Loads the feed when the RSS item is tapped - contains only one feed at a time
wall.stores.rssTwitterFeedStore = new Ext.data.Store({
                                              model: 'wall.models.RssTwitterFeed'
                                              });



// Model for Local Storage
wall.models.LocalStorage = Ext.regModel('wall.models.LocalStorage',{
    fields: [
        {name: 'userId', type: 'string'},
        {name: 'appId', type: 'string'},
        {name: 'userSignedIn', type: 'string'},
    ],
    proxy: {
        type: 'localstorage',
        id: 'theWall'
    }
});

// Store for Local Storage
wall.stores.localStorageStore = new Ext.data.Store({
    model: 'wall.models.LocalStorage'
});



// Model for the Application Table
wall.models.Application = Ext.regModel('wall.models.Application',{
    fields: [
        {name: 'appId', type: 'int'}, // PK into app_profile
        {name: 'appName', type: 'string'},
        {name: 'fqdnUrl', type: 'string'},
        {name: 'startDateTime', type: 'string'},
        {name: 'stopDateTime', type: 'string'},
        {name: 'rangeInMeters', type: 'int'},
        {name: 'facilityId', type: 'int'},
        {name: 'vendorId', type: 'int'},
    ],
    idProperty: 'appId',
    proxy: {
        type: 'localstorage',
        id: 'theWallApplications',
    },

});

// Store for the Application Table
wall.stores.applicationStore = new Ext.data.Store({
    model: 'wall.models.Application'
});



wall.controllers.WallController = new Ext.Controller({

    showTheWall: function(options){
        
        
           wall.stores.WallPostsStore.load();                                                                                               
        wall.views.viewport.setActiveItem(wall.views.wallPanel, options.animation);
    },

    showDetailPanel: function(options){
        //alert('The Wall Detail 0');
        wall.views.detailPanel=new wall.views.DetailPanel(); 
        wall.views.detailPanel.update('<tpl for="."><div id="tweet_container"><div class="timestamp2">'+options.timestamp+'</div><div class="about_content">'+options.message+'</div><div class="postPicDetail">'+options.photo+'</div><div class="clear"></div></div></tpl>'/*'<tpl for="."><div class="wallitemDetail"><img src="'+options.userPic+'" class= "profilePicDetail"/><div class="timestampDetail">'+options.timestamp+'</div><div class="spacer"></div><div class="wallMSGDetail">'+options.message+'</div><div class="postPicDetail">'+options.photo+'</div></div><div class="clear"></div></tpl>'*/);
                                                      //dToolbar(options.userPic);
        wall.views.viewport.setActiveItem(wall.views.detailPanel, options.animation);
    },
                                                     
    showPhotoPanel: function(options){
        //alert('The Wall Detail 0');
        wall.views.photoPanel=new wall.views.PhotoPanel(); 
        wall.views.photoPanel.update('<div><img src="{'+options.photo+'}" width="300">');
        wall.views.viewport.setActiveItem(wall.views.photoPanel, options.animation);
    },


});

wall.controllers.main = new Ext.Controller({

   


    showHomeMenu: function(options){
        //wall.views.homeMenu = new wall.views.HomeMenu();
        wall.views.viewport.setActiveItem(wall.views.homeMenu, options.animation);
        //Ext.repaint();
        //Ext.Element.garbageCollect();
    },
                                           
   

                                           
    showAboutPanel: function(options){
        wall.views.aboutPanel = new wall.views.AboutPanel();
        wall.views.viewport.setActiveItem(wall.views.aboutPanel, options.animation);
    },

    showRssList: function(options){
        wall.views.rssList = new wall.views.RssList();
        wall.views.viewport.setActiveItem(wall.views.rssList, options.animation);
    },
                                           
    showRssFeed: function(options){
    
        wall.stores.rssFeedStore.setProxy({
            type: 'ajax',
            url: options.rssUrl,
            reader: {
                type: 'xml',
                root: 'channel',
                record: 'item'
            }
        });
        wall.stores.rssFeedStore.load();

// The rssFeed and rssDetail panels will persist until the user navigates back to the rssList panel. This allows the rssFeedStore to load only once.
        wall.views.rssFeed = new wall.views.RssFeed();
        wall.views.rssDetail = new wall.views.RssDetail();
        wall.views.rssFeed.getDockedItems()[0].setTitle(options.rssName);
        wall.views.rssDetail.getDockedItems()[0].setTitle(options.rssName);
        wall.views.viewport.add(wall.views.rssDetail);
        wall.views.viewport.setActiveItem(wall.views.rssFeed, options.animation);
    },
                                           
    showRssDetail: function(options){

        //wall.views.rssDetail = new wall.views.RssDetail();
        //wall.views.rssDetail.getDockedItems()[0].setTitle(options.rssDetailTitle);
        wall.views.rssDetail.update('<div id="tweet_container"><tpl for="."><div class="tweet_data"><div class="tweet_content">' + options.rssDetailDescription +/*+ options.rssDetailTitle +*/'</div><div class="clear"></div></div></tpl></div>');
        wall.views.viewport.setActiveItem(wall.views.rssDetail, options.animation);
    },
    
    backToRssFeed: function(options){
        wall.views.viewport.setActiveItem(wall.views.rssFeed, options.animation);
    },

    backToRssList: function(options){
// Remove the rssFeed and rssDetail panels from the viewport    
        wall.views.viewport.remove(wall.views.rssFeed);
        wall.views.viewport.remove(wall.views.rssDetail);
        this.showRssList({
                         animation: {type: 'slide', direction: 'right'}
                         });
    },

    backToHomeMenuFromRssFeed: function(options){
// Clear records from rssFeedStore
        wall.stores.rssFeedStore.setProxy({
            type: 'memory',
            url: null,
            data: [
                { name: 'loading...', type: '' },
            ],
            reader: {
                type: 'json',
                //root: 'channel',
                //record: 'item'
            }
        });
        wall.stores.rssFeedStore.load();
    
// Remove the rssFeed and rssDetail panels from the viewport    
        wall.views.viewport.remove(wall.views.rssFeed);
        wall.views.viewport.remove(wall.views.rssDetail);
        this.showHomeMenu({
            animation: {type: 'slide', direction: 'right'}
        });
    },
                                           

                                           showRssTwitterList: function(options){
                                           wall.views.rssTwitterList = new wall.views.RssTwitterList();
                                           wall.views.viewport.setActiveItem(wall.views.rssTwitterList, options.animation);
                                           },
                                           
                                           showRssTwitterFeed: function(options){
                                           
                                           wall.stores.rssTwitterFeedStore.setProxy({
                                                                             type: 'ajax',
                                                                             url: options.rssTwitterUrl,
                                                                             reader: {
                                                                             type: 'json',
                                                                             root: 'results',
                                                                             
                                                                             }
                                                                             });
                                           
                                           
                                           wall.stores.rssTwitterFeedStore.load();
                                           
                                           // The rssFeed and rssDetail panels will persist until the user navigates back to the rssList panel. This allows the rssFeedStore to load only once.
                                           wall.views.rssTwitterFeed = new wall.views.RssTwitterFeed();
                                           wall.views.rssTwitterDetail = new wall.views.RssTwitterDetail();
                                           wall.views.rssTwitterFeed.getDockedItems()[0].setTitle(options.rssName);
                                           wall.views.rssTwitterDetail.getDockedItems()[0].setTitle(options.rssName);
                                           wall.views.viewport.add(wall.views.rssTwitterDetail);
                                           wall.views.viewport.setActiveItem(wall.views.rssTwitterFeed, options.animation);
                                           },
                                           
                                           
                                           backToRssTwitterFeed: function(options){
                                           wall.views.viewport.setActiveItem(wall.views.rssTwitterFeed, options.animation);
                                           },
                                           
                                           backToRssTwitterList: function(options){
                                           // Remove the rssFeed and rssDetail panels from the viewport    
                                           wall.views.viewport.remove(wall.views.rssTwitterFeed);
                                           wall.views.viewport.remove(wall.views.rssTwitterDetail);
                                           this.showRssTwitterList({
                                                            animation: {type: 'slide', direction: 'right'}
                                                            });
                                           },
                                           showRssTwitterDetail: function(options){
                                           
                                           //wall.views.rssDetail = new wall.views.RssDetail();
                                           //wall.views.rssDetail.getDockedItems()[0].setTitle(options.rssDetailTitle);
                                           wall.views.rssTwitterDetail.update('<div id="tweet_container"><tpl for="."><div class="tweet_data"><div class="tweet_avatar"><img width="30" height="30" src="'+options.profile_image_url+'"/></div><div class="tweet_content"><div class="user">'+options.from_user+'</div>'+options.text+'</div><div class="clear"></div></div></tpl></div>');
                                           wall.views.viewport.setActiveItem(wall.views.rssTwitterDetail, options.animation);
                                           },
                                           
                                           backToHomeMenuFromRssTwitterFeed: function(options){
                                           // Clear records from rssFeedStore
                                           wall.stores.rssTwitterFeedStore.setProxy({
                                                                             type: 'memory',
                                                                             url: null,
                                                                             data: [
                                                                                    { name: 'loading...', type: '' },
                                                                                    ],
                                                                             reader: {
                                                                             type: 'json',
                                                                             //root: 'channel',
                                                                             //record: 'item'
                                                                             }
                                                                             });
                                           wall.stores.rssTwitterFeedStore.load();
                                           
                                           // Remove the rssFeed and rssDetail panels from the viewport    
                                           wall.views.viewport.remove(wall.views.rssTwitterFeed);
                                           wall.views.viewport.remove(wall.views.rssTwitterDetail);
                                           this.showHomeMenu({
                                                             animation: {type: 'slide', direction: 'right'}
                                                             });
                                           },

                                                                                      
                                           
});

wall.views.RssTwitterDetail = Ext.extend(Ext.Panel, {
                                  id: 'rssTwitterDetail',
                                  layout: 'fit',
                                  scroll: 'vertical',
                                  styleHtmlContent: true,
                                  initComponent: function(){
                                  Ext.apply(this, {
                                            dockedItems: [
                                                          {xtype: 'toolbar',
                                                          //id: 'RssDetailToolbar',
                                                          title: 'RSS Detail',
                                                          items: [{
                                                                  xtype: 'button',
                                                                  ui: 'back',
                                                                  text: 'Back',
                                                                  handler: function(){
                                                                  Ext.dispatch({
                                                                               controller: wall.controllers.main,
                                                                               action: 'backToRssTwitterFeed',
                                                                               animation: {type: 'slide', direction: 'right'}
                                                                               });
                                                                  }
                                                                  }]
                                                          }
                                                          ],
                                            });
                                  
                                  wall.views.RssTwitterDetail.superclass.initComponent.apply(this);
                                  }
                                  });




wall.views.NotificationOverlay = Ext.extend(Ext.Panel, {
                                            id: 'notificationOverlay',
                                            floating: true,
                                            modal: true,
                                            fullscreen: false,
                                            centered: true,
                                            //width: 100,
                                            //height: 50,
                                            scroll: 'vertical',
                                            styleHtmlContent: true,
                                            html: 'Notification Overlay'
});

wall.views.RssList = Ext.extend(Ext.Panel, {
    id: 'rssList',
    layout: 'fit',
    scroll: 'vertical',
    initComponent: function(){
        Ext.apply(this, {
            dockedItems: [
                {xtype: 'toolbar',
                //id: 'RssListToolbar',
                title: 'RSS List',
                items: [{
                    xtype: 'button',
                    ui: 'back',
                    text: 'Back',
                    handler: function(){
                        Ext.dispatch({
                            controller: wall.controllers.main,
                            action: 'showHomeMenu',
                            animation: {type: 'slide', direction: 'right'}
                        });
                    }
                }]
                }
            ],
            items: [
                {xtype: 'list',
                //id: 'RssList',
                store: wall.stores.rssListStore,
                itemTpl: rssTpl,
                listeners: {
                    itemtap: function (dataView, index, item, e) {
                        Ext.dispatch({
                            controller: wall.controllers.main,
                            action: 'showRssFeed',
                            animation: {type: 'slide', direction: 'left'},
                            rssName: dataView.store.getAt(index).data.feedName,
                            rssUrl: dataView.store.getAt(index).data.feedUrl,
                        });
                    }
                }
                }
            ]

        });

    wall.views.RssList.superclass.initComponent.apply(this);
    }
});


//Panel to input text and submit to php along with application_name, device_id, lat, and lng  		
/* 
height = 960
480
57
width variable by aspect ratio
/*
var selectFromLibrary = function() {
    alert('old selectFromLibrary');
    //mpq.track("Button clicked");
    actionSheet.hide();
    getPhoto(pictureSource.PHOTOLIBRARY);
};

var takePicture = function() {
    alert('old takePicture');
    //mpq.track("Button clicked");
    actionSheet.hide();
    capturePhoto();
};
*/
//var actionSheet = new Ext.ActionSheet({
wall.views.PictureActionSheet = Ext.extend(Ext.ActionSheet, {
    hideOnMaskTap: true,
    initComponent: function(){
        Ext.apply(this,{
                  selectFromLibrary: function(){
                  //alert('selectFromLibrary');
                  this.up('actionsheet').hide();
                  getPhoto(pictureSource.PHOTOLIBRARY);
                  },
                  
                  takePicture: function(){
                  //alert('takePicture');
                  this.up('actionsheet').hide();
                  capturePhoto();
                  }
        });

        Ext.apply(this,{
                 items: [
                         {
                         text: 'Select from Library',
                         handler: this.selectFromLibrary
                         },
                         {
                         text: 'Take Picture',
                         ui  : 'action',
                         handler: this.takePicture
                         },
                         {
                         text: 'Cancel',
                         ui  : 'decline',
                         handler: function() { this.up('actionsheet').hide(); }
                         }
                         ]
                 
                 });
                                           
        wall.views.PictureActionSheet.superclass.initComponent.apply(this);
    }
});

wall.views.DetailPanel = Ext.extend(Ext.Panel, {
                                    id: 'detailPanel',
                                    layout: 'fit',
                                    scroll: 'vertical',
                                    
                                    initComponent: function(){
                                    
                                    Ext.apply(this, {
                                              dockedItems: [
                                                            {xtype: 'toolbar',
                                                            
                                                            title: 'Message',
                                                            items: [{
                                                                    xtype: 'button',
                                                                    ui: 'back',
                                                                    text: 'Back',
                                                                    handler: function(){
                                                                    
                                                                    wall.stores.WallPostsStore.loadPage(0);
                                                                    
                                                                    Ext.dispatch({
                                                                                 controller: wall.controllers.WallController,
                                                                                 action: 'showTheWall',
                                                                                 animation: {type: 'slide', direction: 'right'}
                                                                                 
                                                                                 });
                                                                    }
                                                                    }]
                                                            }
                                                            ]
                                              
                                              
                                              
                                              });
                                    
                                    wall.views.DetailPanel.superclass.initComponent.apply(this);
                                    
                                    }
                                    
                                    });



wall.views.SignInForm = Ext.extend(Ext.form.FormPanel, {
//var signInForm = {
//    xtype: 'form',                                   
    id: 'signInForm',
    //fullscreen: true,
    //layout: 'fit',
    scroll: 'vertical',
    //defaultInstructions: 'Please enter the information above.',
    defaultInstructions: '',

    initComponent: function(){
    
        Ext.apply(this, {
                  
            dockedItems: [
                {xtype: 'toolbar',
                id: 'signInFormToolbar',
                title: 'Sign In',
                items: [{
                    xtype: 'button',
                    ui: 'back',
                    text: 'Back',
                    handler: this.onBackAction,
                }]
                },
                {
                xtype:'toolbar',
                dock: 'bottom',
                items: [
                    {xtype: 'spacer'},
                    {        
                    xtype: 'button',
                    ui: 'confirm',
                    text: 'Sign In',
                    handler: this.onSignInAction,
                    scope: this,
                    },
                ]
                },
            ],
            items: [{
                xtype: 'fieldset',
                id: 'signInFormFieldset',
                //title: 'Sign In Details',
                title: '',
                instructions: this.defaultInstructions,
                defaults: {
                    xtype: 'textfield',
                    labelAlign: 'left',
                    style: 'font-size: 80%',
                    useClearIcon: true,
                    required: false,
                },

                items: [
                    {xtype: 'emailfield',
                    name: 'userEmailAddress',
                    label: 'Email',
                    //labelWidth: '35%',
                    required: true
                    },
                        {
                        xtype: 'wall.views.ErrorField',
                        fieldname: 'userEmailAddress',
                        },
                    {xtype: 'passwordfield',
                    name: 'userPassword',
                    label: 'Password',
                    //labelWidth: '35%',
                    required: true
                    },
                        {
                        xtype: 'wall.views.ErrorField',
                        fieldname: 'userPassword',
                        },
                ]
            }],
            listeners: {
                deactivate: function() { this.resetForm() }
            }           
        });

        wall.views.SignInForm.superclass.initComponent.apply(this);
    },
    
    onBackAction: function() {
        Ext.dispatch({
            controller: wall.controllers.main,
            action: 'showSignInPanel',
            animation: {type: 'slide', direction: 'right'},
        });
    },
                                   
    onSignInAction: function(){
        Ext.dispatch({
            controller: wall.controllers.main,
            action: 'signIn',
            animation: {type: 'slide', direction: 'right'},
            data: this.getValues(),
            form: this,
        });
    },

    showErrors: function(errors){
        console.log(errors);
        //var fieldset = this.down('#signInFormFieldset');
        this.fields.each(function(field){
            var fieldErrors = errors.getByField(field.name);

            if (fieldErrors.length > 0) {
                var errorField = this.down('#' + field.name + 'ErrorField');
                //field.addCls('invalid-field');
                errorField.update(fieldErrors);
                errorField.show();
            } else {
                this.resetField(field);
            }
        }, this);
        //fieldset.setInstructions('Incorrect Email Address or Password. Please try again.');
    },

    resetForm: function(){
        //var fieldset = this.down('#signInFormFieldset');
        this.fields.each(function(field) {
            this.resetField(field);
        }, this);
        //fieldset.setInstructions(this.defaultInstructions);
        this.reset();
    },    

    resetField: function(field) {
        var errorField = this.down('#' + field.name + 'ErrorField');
        errorField.hide();
        //field.removeCls('invalid-field');
        return errorField;
    }
});
//};


wall.views.HomeMenu = Ext.extend(Ext.Panel,{
    id: 'homeMenu',
    layout: 'vbox',
    scroll: 'false',
    //html: 'This is the homeMenu',
    initComponent: function() {
    Ext.apply(this, {

    dockedItems: [
                 {
                 xtype: 'toolbar',
                 //id: 'homeMenuToolbar',
                 title: app_name
                  
                 },
    // Button Container 1
                {
                 //id: 'homeMenuButtonContainer1',
                 xtype: 'panel',
                 layout: {
                 type: 'hbox',
                 //pack: 'center',
                 //align: 'center'
                 },
                 //style: 'background-color: #FFBF00; color: white',
                 defaults: {xtype: 'button',
                 iconMask: 'false',
                 ui: 'plain',
                 pressedCls: 'menubtnp'
                 
                 },
                 items: [{
                         cls: 'theWallbutton',
                         html: '<p class="amhomebtntxt"><br /><br /><br />Chat</p>',
                         handler: function() {  
                         Ext.dispatch({
                                      controller: wall.controllers.WallController,
                                      action: 'showTheWall',
                                      animation: {type: 'slide', direction: 'left'}
                                      
                                      });                         }
                         },                      
                         {cls: 'newsbutton',
                         html: '<p class="amhomebtntxt"><br /><br /><br />News</p>',
                         handler: function() {
                         Ext.dispatch({
                                      controller: wall.controllers.main,
                                      action: 'showRssFeed',
                                      animation: {type: 'slide', direction: 'left'},
                                      rssName: 'News',
                                      rssUrl: newsFeedUrl,
                                      });
                         }
                         },
                         {cls: 'twitterbutton',
                         html: '<p class="amhomebtntxt"><br /><br /><br />Tweets</p>',
                         handler: function() {
                         Ext.dispatch({
                                      controller: wall.controllers.main,
                                      action: 'showRssTwitterFeed',
                                      animation: {type: 'slide', direction: 'left'},
                                      rssTwitterName: 'Tweets',
                                      rssTwitterUrl: twitterFeedUrl,
                                      });
                         
                         }
                         },
                         ]
                 },
    // End Button Container 1                                                         
    // Button Container 2
                {
                 //id: 'homeMenuButtonContainer2',
                 xtype: 'panel',
                 layout: {
                 type: 'hbox',
                 pack: 'center',
                 align: 'center'
                 },
                 //style: 'background-color: #FFBF00; color: white',
                 defaults: {xtype: 'button',
                 iconMask: 'false',
                 ui: 'plain',
                 pressedCls: 'menubtnp'
                 },
                  items: [
                          {cls: 'calendarbutton',
                          html: '<p class="amhomebtntxt"><br /><br /><br />Calendar</p>',
                       handler: function() {
                          Ext.dispatch({
                                       controller: wall.controllers.main,
                                       action: 'showRssFeed',
                                       animation: {type: 'slide', direction: 'left'},
                                       rssName: 'Calendar',
                                       rssUrl: calendarFeedUrl,
                                       });
                          
                          }
                          },
                          {cls: 'videobutton',
                          html: '<p class="amhomebtntxt"><br /><br /><br />Videos</p>',
                          handler: function(){
                          window.plugins.childBrowser.showWebPage("http://www.youtube.com/DenverRedRocks");
                          }
                          },
                          {cls: 'aboutbutton',
                          html: '<p class="amhomebtntxt"><br /><br /><br />About</p>',
                       handler: function(){
                          Ext.dispatch({
                                       controller: wall.controllers.main,
                                       action: 'showAboutPanel',
                                       animation: {type: 'slide', direction: 'left'}
                                       });
                          }
                          },
                         
                         ]
                 },
                  
                 
    // End Button Container 2   
                  
                  {
                  //id: 'homeMenuButtonContainer2',
                  xtype: 'toolbar',
                  dock:'bottom',
                  layout: {
                  type: 'hbox',
                dock: 'bottom',
                  },
                               
                  items: [{xtype:'spacer'},
                           {
                            xtype: 'button',
                           
                             text: 'Web',
                          handler: function(){
                           window.plugins.childBrowser.showWebPage(aboutWebPage);
                           },
                           
                           },
                           {
                           xtype: 'button',
                          
                            text: 'Log Into Facebook',
                         handler: function(){
                          login(); me();                        },
                          
                          },{xtype:'spacer'}
                           
                           ]
                  }
                 ]

     });
     
     wall.views.HomeMenu.superclass.initComponent.apply(this);
     
     }
});


wall.views.RssFeed = Ext.extend(Ext.Panel, {
    id: 'rssFeed',
    layout: 'fit',
    scroll: 'vertical',
    initComponent: function(){
        Ext.apply(this, {
        dockedItems: [
            {xtype: 'toolbar',
            //id: 'RssFeedToolbar',
            title: 'RSS Feed',
            items: [{
                    xtype: 'button',
                    ui: 'back',
                    text: 'Back',
                    handler: function(){
                    Ext.dispatch({
                                 controller: wall.controllers.main,
                                 //action: 'backToRssList',
                                 action: 'backToHomeMenuFromRssFeed',
                                 animation: {type: 'slide', direction: 'right'}
                                 });
                    }
                    }]
            }
        ],
        items: [
            {xtype: 'list',
            //id: 'RssFeed',
            store: wall.stores.rssFeedStore,
                //style: 'background: #DDEEF6;',
            itemTpl: rssTpl,
                disableSelection: true,
                plugins: [{ptype: 'pullrefresh'}],
            listeners: {
                itemtap: function (dataView, index, item, e) {
                    Ext.dispatch({
                        controller: wall.controllers.main,
                        action: 'showRssDetail',
                        animation: {type: 'slide', direction: 'left'},
                        rssDetailTitle: dataView.store.getAt(index).data.title,
                        rssDetailDescription: dataView.store.getAt(index).data.description,
                    });
                }
            }
            }
        ]
              
        });

        wall.views.RssFeed.superclass.initComponent.apply(this);
    }
});


wall.views.PhotoPanel = Ext.extend(Ext.Panel, {
                                    id: 'photoPanel',
                                    layout: 'fit',
                                    scroll: 'vertical',
                                    initComponent: function(){
                                    Ext.apply(this, {
                                              dockedItems: [
                                                            {xtype: 'toolbar',
                                                            
                                                            
                                                            items: [{
                                                                    xtype: 'button',
                                                                    ui: 'back',
                                                                    text: 'Back',
                                                                    handler: function(){
                                                                    wall.stores.WallPostsStore.loadPage(0);
                                                                    
                                                                    Ext.dispatch({
                                                                                 controller: wall.controllers.WallController,
                                                                                 action: 'showDetailPanel',
                                                                                 animation: {type: 'slide', direction: 'right'}
                                                                                 
                                                                                 });
                                                                    }
                                                                    }]
                                                            },
                                                            ],
                                              items: [
                                                      {
                                                      xtype:'panel',
                                                      layout:'fit',
                                                      tpl: '<div><img src="{urlL}" width="200"><div class="message2">{message}</div></div>',
                                                      
                                                      
                                                      }
                                                      
                                                      
                                                      ]
                                              
                                              });
                                    
                                    wall.views.PhotoPanel.superclass.initComponent.apply(this);
                                    }
                                    });



wall.views.UserList = Ext.extend(Ext.Panel, {
                                 layout: 'fit',
                                 scroll: 'vertical',
                                 initComponent: function(){
                                 var addButton, titlebar, list;
                                 
                                 backButton = {
                                 xtype: 'button',
                                 ui: 'back',
                                 text: 'Back',
                                 handler: this.onBackAction,
                                 scope: this
                                 };
                                 
                                 titlebar = {
                                 dock: 'top',
                                 xtype: 'toolbar',
                                 title: 'Users',
                                 items: [ backButton, { xtype: 'spacer'}]
                                 };
                                 
                                 list = {
                                 xtype: 'list',
                                 itemTpl: '{userId},{userFirstName}, {userLastName}',
                                 store: wall.stores.userStore,
                                 listeners: {
                                 scope: this,
                                 itemtap: this.onItemtapAction
                                 }
                                 };
                                 
                                 Ext.apply(this, {
                                           html: 'placeholder',
                                           layout: 'fit',
                                           dockedItems: [titlebar],
                                           items: [list]
                                           });
                                 
                                 wall.views.UserList.superclass.initComponent.call(this);
                                 },
                                 
                                 onBackAction: function() {
                                 Ext.dispatch({
                                              controller: wall.controllers.main,
                                              action: 'showHomeMenu',
                                              animation: {type: 'slide', direction: 'right'}
                                              });
                                 },
                                 
                                 onItemtapAction: function(list, index, item, e) {
                                 var userId = list.store.getAt(index).data.userId;
                                 //alert('onItemtap userId:' + userId);
                                 //alert('onItemtap index:' + index);
                                 Ext.dispatch({
                                              controller: wall.controllers.main,
                                              action: 'showUserDetail',
                                              animation: {type: 'slide', direction: 'left'},
                                              userId: userId
                                              });
                                 }
                                 });


wall.views.RssTwitterFeed = Ext.extend(Ext.Panel, {
                                id: 'rssTwitterFeed',
                                layout: 'fit',
                                scroll: 'vertical',
                                
                                initComponent: function(){
                                Ext.apply(this, {
                                          dockedItems: [
                                                        {xtype: 'toolbar',
                                                        //id: 'RssFeedToolbar',
                                                        title: 'RSS Feed',
                                                        items: [{
                                                                xtype: 'button',
                                                                ui: 'back',
                                                                text: 'Back',
                                                                handler: function(){
                                                                Ext.dispatch({
                                                                             controller: wall.controllers.main,
                                                                             //action: 'backToRssList',
                                                                             action: 'backToHomeMenuFromRssTwitterFeed',
                                                                             animation: {type: 'slide', direction: 'right'}
                                                                             });
                                                                }
                                                                }]
                                                        }
                                                        ],
                                          items: [
                                                  {xtype: 'list',
                                                  //id: 'RssFeed',
                                                  store: wall.stores.rssTwitterFeedStore,
                                                  itemTpl: twitterTpl,
                                                  disableSelection: true,
                                                  layout: 'auto',
                                                  itemCls:'noBorder',
                                                  //style: 'background: #FF3300;',
                                                  listeners: {
                                                  itemtap: function (dataView, index, item, e) {
                                                  Ext.dispatch({
                                                               controller: wall.controllers.main,
                                                               action: 'showRssTwitterDetail',
                                                               animation: {type: 'slide', direction: 'left'},
                                                               profile_image_url:dataView.store.getAt(index).data.profile_image_url,
                                                               from_user:dataView.store.getAt(index).data.from_user,
                                                               text:dataView.store.getAt(index).data.text,
                                                                                                                              });
                                                  }
                                                  },
                                                  plugins: [{ptype: 'pullrefresh'}]
                                                  }
                                                  
                                                  ]
                                          
                                          });
                                
                                wall.views.RssTwitterFeed.superclass.initComponent.apply(this);
                                }
                                });


wall.views.AboutPanel = Ext.extend(Ext.Panel, {
                                   id: 'aboutPanel',
                                   layout: 'fit',
                                   scroll: 'vertical',
                                   //bodypadding: '10, 10, 10, 10',
                                   html: [aboutHTML],
                                  //cls: 'about_content',
                                   initComponent: function(){
                                   Ext.apply(this, {
                                             dockedItems: [{
                                                           xtype: 'toolbar',
                                                           id: 'aboutPanelToolbar',
                                                           title: 'About',
                                                           items: [{
                                                                   xtype: 'button',
                                                                   ui: 'back',
                                                                   text: 'Back',
                                                                   handler: function(){
                                                                   Ext.dispatch({
                                                                                controller: wall.controllers.main,
                                                                                action: 'showHomeMenu',
                                                                                animation: {type: 'slide', direction: 'right'}
                                                                                });
                                                                   },
                                                                   
                                                                   }]
                                                           },{
                                                           //id: 'homeMenuButtonContainer2',
                                                           xtype: 'toolbar',
                                                           dock:'bottom',
                                                           
                                                           items: [                                                                   
                                                                   ]
                                                          
                                                           }]
                                             
                                             });
                                   
                                   wall.views.AboutPanel.superclass.initComponent.apply(this);
                                   }
                                   });


wall.views.RssDetail = Ext.extend(Ext.Panel, {
    id: 'rssDetail',
    layout: 'fit',
    scroll: 'vertical',
    styleHtmlContent: true,
    initComponent: function(){
        Ext.apply(this, {
        dockedItems: [
            {xtype: 'toolbar',
            //id: 'RssDetailToolbar',
            title: 'RSS Detail',
            items: [{
                    xtype: 'button',
                    ui: 'back',
                    text: 'Back',
                    handler: function(){
                    Ext.dispatch({
                                 controller: wall.controllers.main,
                                 action: 'backToRssFeed',
                                 animation: {type: 'slide', direction: 'right'}
                                 });
                    }
                    }]
            }
        ],
        });

        wall.views.RssDetail.superclass.initComponent.apply(this);
    }
});




wall.views.UserForm = Ext.extend(Ext.form.FormPanel, {
    id: 'userForm',
    scroll: 'vertical',
    //defaultInstructions: 'Please enter the information above.',
    defaultInstructions: '',

    initComponent: function(){
    Ext.apply(this,{
           dockedItems: [
                         {
                         xtype: 'toolbar',
                         id: 'userFormToolbar',
                         title: 'User Profile',
                         items: [
                                 {
                                 xtype: 'button',
                                 ui: 'back',
                                 text: 'Back',
                                 handler: this.onBackAction,
                                 scope: this 
                                 }
                                 ],
                         },
                         {
                         xtype:'toolbar',
                         dock: 'bottom',
                         items: [
                                 {xtype: 'spacer'},
                                 {        
                                 xtype: 'button',
                                 id: 'userFormSaveButton',
                                 ui: 'confirm',
                                 text: 'button',
                                 handler: this.onSaveAction,
                                 scope: this
                                 },
                                 ]
                         },
                         ],

    });

    Ext.apply(this,{
        items: [{
            xtype: 'fieldset',
            id: 'userFormFieldset',
            //title: 'User Details',
            title: '',
            instructions: this.defaultInstructions,
            defaults: {
                xtype: 'textfield',
                labelAlign: 'left',
                style: 'font-size: 80%',
                useClearIcon: true,
                required: false,
            },
            items: [{
                xtype: 'button',
                id: 'userImageButton',
                //html: '<img src="' + this.getRecord().get('userPhotoUrl') + '" id="uploadPic"/>',
                html: '<img src="" id="uploadPic"/>',
                height: 100,
                width: 100,
                ui: 'plain',
                cls: 'amimagebutton',
                pressedCls: 'amimagebtnp',
                handler: function(){
                    wall.views.pictureActionSheet.show();
                    //this.update('<img src="lib/thewall/userimage.jpg" />');
                },
                },
                {
                name: 'userFirstName',
                label: 'First Name',
                required: true
                },
                    {
                        xtype: 'wall.views.ErrorField',
                        fieldname: 'userFirstName',
                    },
                {
                name: 'userLastName',
                label: 'Last Name',
                },
                    {
                    xtype: 'wall.views.ErrorField',
                    fieldname: 'userLastName',
                    },
                {
                xtype: 'emailfield',
                name: 'userEmailAddress',
                label: 'Email',
                required: true
                },
                    {
                    xtype: 'wall.views.ErrorField',
                    fieldname: 'userEmailAddress',
                    },
                {
                xtype: 'passwordfield',
                name: 'userPassword',
                id: 'userPassword',
                label: 'Password',
                required: true
                },
                    {
                    xtype: 'wall.views.ErrorField',
                    fieldname: 'userPassword',
                    },
                {
                //xtype: 'numberfield',
                name: 'userPhoneNumber',
                label: 'Phone',
                },
                    {
                    xtype: 'wall.views.ErrorField',
                    fieldname: 'userPhoneNumber',
                    },
                {
                name: 'userLocation',
                label: 'Location',
                },
                    {
                    xtype: 'wall.views.ErrorField',
                    fieldname: 'userLocation',
                    },
                {
                xtype: 'selectfield',
                name: 'userGender',
                label: 'Gender',
                options: [{
                         text: 'Not Selected',
                         value: 'U'
                 }, {
                         text: 'Female',
                         value: 'F',
                 }, {
                         text: 'Male',
                         value: 'M'
                }]
                },
                    {
                    xtype: 'wall.views.ErrorField',
                    fieldname: 'userGender',
                    },
            ],
        }],
            
        listeners: {
            beforeactivate: function() {
                //var deleteButton = this.down('#userFormDeleteButton'),
                var saveButton = this.down('#userFormSaveButton'),
                //titlebar = this.down('#userFormTitlebar'),
                model = this.getRecord();
                //alert('beforeactivate userId:' + model.get('userId'));

                if (model.phantom) {
                    //alert('phantom true');
                    //titlebar.setTitle('Create Account');
                    saveButton.setText('Create Account');
                    //deleteButton.hide();
                } else {
                    //alert('phantom false');
                    //titlebar.setTitle('Update Account');
                    saveButton.setText('Update Account');
                    var userPasswordField = this.down('#userPassword');
                    userPasswordField.hide();
                    formattedPhoneNumber = this.getValues()['userPhoneNumber'];
                    //alert('formattedPhoneNumber before:' + formattedPhoneNumber);
                    formattedPhoneNumber = formattedPhoneNumber.replace(phoneNumberRegExp, '($1) $2-$3');
                    //alert('formattedPhoneNumber after:' + formattedPhoneNumber);
                    this.setValues({
                        userPhoneNumber: formattedPhoneNumber
                    });
                    //alert('getValues userPhoneNumber:' + this.getValues()['userPhoneNumber']);
                    //deleteButton.show();
                }
            },
            deactivate: function() { this.resetForm() }
        }           
    });

    wall.views.UserForm.superclass.initComponent.apply(this);
    },
    
    onBackAction: function(){
        var model = this.getRecord();
        Ext.dispatch({
            controller: wall.controllers.main,
            action: (model.phantom ? 'showSignInPanel' : 'showAccountSettingsMenu'),
            //action: (model.phantom ? 'showSignInPanel' : 'showAccountSettingsMenu'),
            animation: {type: 'slide', direction: 'right'}
        });
    },

    onSaveAction: function(){
        var model = this.getRecord();
        //alert('onsaveaction userId:' + model.get('userId'));
                                 /*this.submit({
                                             params: {
                                             myparms: 'myparms'
                                             },
                                             success: this.onSubmitSuccess,
                                             failure: this.onSubmitFailure
                                 });*/
        Ext.dispatch({
            controller: wall.controllers.main,
            action: (model.phantom ? 'saveAccount' : 'updateAccount'),
            animation: {type: 'slide', direction: 'right'},
            data: this.getValues(),
            record: model,
            form: this
        });
    },

    onSubmitSuccess: function(form, result){
                                 alert('success!');
                                 alert(result);
        var hideNotification = new Ext.util.DelayedTask(function() {
                                                     wall.views.notificationOverlay.hide(
                                                                                         'fade'
                                                                                         );
                                                     });
        //wall.views.notificationOverlay.setSize({width: 10, height: 10});
        wall.views.notificationOverlay.update(result);
        wall.views.notificationOverlay.show();
        hideNotification.delay(5000);

    },

    onSubmitFailure: function(form, result){
                                 alert('failure!');
                                 alert(result);
                                 var hideNotification = new Ext.util.DelayedTask(function() {
                                     wall.views.notificationOverlay.hide(
                                         'fade'
                                     );
                                     });
                                 //wall.views.notificationOverlay.setSize({width: 10, height: 10});
                                 wall.views.notificationOverlay.update(result);
                                 wall.views.notificationOverlay.show();
                                 hideNotification.delay(5000);

    },
                                 
    showErrors: function(errors){
                                 console.log(errors);
        var fieldset = this.down('#userFormFieldset');
        this.fields.each(function(field){
            var fieldErrors = errors.getByField(field.name);

            if (fieldErrors.length > 0) {
                var errorField = this.down('#' + field.name + 'ErrorField');
                field.addCls('invalid-field');
                errorField.update(fieldErrors);
                errorField.show();
            } else {
                this.resetField(field);
            }
        }, this);
        fieldset.setInstructions('Please update the noted fields.');
    },
    
    resetForm: function(){
        var fieldset = this.down('#userFormFieldset');
        this.fields.each(function(field) {
            this.resetField(field);
        }, this);
        fieldset.setInstructions(this.defaultInstructions);
        this.reset();
    },    

    resetField: function(field) {
        var errorField = this.down('#' + field.name + 'ErrorField');
        errorField.hide();
        field.removeCls('invalid-field');
        return errorField;
    }
});

wall.views.SharingSettingsForm = Ext.extend(Ext.form.FormPanel, {
    id: 'sharingSettingsForm',
    scroll: 'vertical',
    initComponent: function(){
        Ext.apply(this,{
                  dockedItems: [
                                {xtype: 'toolbar',
                                id: 'sharingSettingsFormToolbar',
                                title: 'Sharing Settings',
                                style: 'font-size: 90%',
                                items: [{
                                        xtype: 'button',
                                        ui: 'back',
                                        text: 'Back',
                                        handler: function(){
                                        Ext.dispatch({
                                                     controller: wall.controllers.main,
                                                     action: 'showSettingsMenu',
                                                     animation: {type: 'slide', direction: 'right'}
                                                     });
                                        }
                                        }]
                                },
                                {
                                xtype:'toolbar',
                                dock: 'bottom',
                                items: [
                                        {xtype: 'spacer'},
                                        {        
                                        xtype: 'button',
                                        ui: 'confirm',
                                        text: 'Save Changes',
                                        handler: function(){
                                        Ext.dispatch({
                                                     controller: wall.controllers.main,
                                                     action: 'updateSharingSettings',
                                                     animation: {type: 'slide', direction: 'right'}
                                                     });
                                        }
                                        },
                                        ]
                                },
                                ],

        });

        Ext.apply(this,{
                  items: [
                          {xtype: 'fieldset',
                          title: 'Facebook',
                          style: 'font-size: 90%',
                          margin: '0 0 0 0',
                          border: '1px solid black',
                          padding: '0',
                          items: [
                                  /*{
                                   xtype: 'button',
                                   ui: 'action',
                                   text: 'Connect to Facebook',
                                   margin: '10 10 10 10',
                                   handler: function(){
                                   if (this.getText() == 'Connect to Facebook') {
                                   alert('connecting to facebook');
                                   this.setText('Disconnect from Facebook');
                                   } else {
                                   alert('disconnecting from facebook');
                                   this.setText('Connect to Facebook');
                                   }
                                   }
                                   },*/
                                  {xtype: 'checkboxfield',
                                  name: 'connectToFacebook',
                                  label: 'Connect to Facebook',
                                  labelWidth: '80%',
                                  listeners: {
                                      check: this.onConnectToFacebook,
                                      uncheck: this.onDisconnectFromFacebook,
                                  }
                                  },
                                  {xtype: 'checkboxfield',
                                  name: 'sharePostsToFacebook',
                                  label: 'Share my Posts to Facebook',
                                  labelWidth: '80%'
                                  },
                                  ]
                          },
                          {xtype: 'fieldset',
                          title: 'Twitter',
                          style: 'font-size: 90%',
                          margin: '0 0 0 0',
                          border: '1px solid black',
                          padding: '0',
                          items: [
                                  /*{
                                   xtype: 'button',
                                   ui: 'action',
                                   text: 'Connect to Twitter',
                                   margin: '10 10 10 10',
                                   handler: function(){
                                   if (this.getText() == 'Connect to Twitter') {
                                   alert('connecting to twitter');
                                   this.setText('Disconnect from Twitter');
                                   } else {
                                   alert('disconnecting from twitter');
                                   this.setText('Connect to Twitter');
                                   }
                                   }
                                   },*/
                                  {xtype: 'checkboxfield',
                                  name: 'connectToTwitter',
                                  label: 'Connect to Twitter',
                                  labelWidth: '80%'
                                  },
                                  {xtype: 'checkboxfield',
                                  name: 'sharePostsToTwitter',
                                  label: 'Share my Posts to Twitter',
                                  labelWidth: '80%'
                                  },
                                  ]
                          },
                          ]
                  
        });
                                            
        wall.views.SharingSettingsForm.superclass.initComponent.apply(this);
    },
    
    onConnectToFacebook: function() {
        alert('connect to facebook');
        login();
        me();
    },
    
    onDisconnectFromFacebook: function() {
        alert('disconnect from Facebook');
    }
});


// Is the detailPanel, which shows the description field
var rssDescriptionPanel = new Ext.Panel({
                                        id: 'rssDescriptionPanel',
                                        layout: {
                                        align: 'stretch'
                                        },
                                        scroll: 'vertical',
                                        styleHtmlContent: true
                                        });

// The list object showing the RSS feed items
var feedList = new Ext.List({
                            fullscreen: true,
                            itemTpl: '{title}',
                            store: wall.stores.rssFeedStore,
                            listeners: {
                            itemtap: function(view, index, record, event) {
                            var rec = view.getStore().getAt(index);
                            rssDescriptionPanel.update('<h2>' + rec.get('title') + '</h2><p>' + rec.get('description') + '</p>');
                            rssBackButton.setHandler(function() {
                                                     Ext.getCmp('rssMainView').setActiveItem(1, { type: 'slide', direction: 'right'});
                                                     this.setHandler(go_home);
                                                     });
                            Ext.getCmp('rssMainView').setActiveItem(2);
                            }
                            }
                            });

wall.views.RssList = Ext.extend(Ext.Panel, {
    //id: 'RssListPanel',
    layout: 'fit',
    scroll: 'vertical',
    initComponent: function(){
        Ext.apply(this, {
            dockedItems: [
                {xtype: 'toolbar',
                //id: 'RssListToolbar',
                title: 'RSS List',
                items: [{
                    xtype: 'button',
                    ui: 'back',
                    text: 'Back',
                    handler: function(){
                        Ext.dispatch({
                            controller: wall.controllers.main,
                            action: 'showHomeMenu',
                            animation: {type: 'slide', direction: 'right'}
                        });
                    }
                }]
                }
            ],
            items: [
                {xtype: 'list',
                //id: 'RssList',
                store: wall.stores.rssListStore,
                itemTpl: '{feedName}',
                listeners: {
                    itemtap: function (dataView, index, item, e) {
                        Ext.dispatch({
                            controller: wall.controllers.main,
                            action: 'showRssFeed',
                            animation: {type: 'slide', direction: 'left'},
                            rssName: dataView.store.getAt(index).data.feedName,
                            rssUrl: dataView.store.getAt(index).data.feedUrl,
                        });
                    }
                }
                }
            ]

        });

    wall.views.RssList.superclass.initComponent.apply(this);
    }
});




wall.views.ErrorField = Ext.extend(Ext.Component, {
                                  
    initComponent: function() {
        config = {
            xtype: 'component',
            id: this.fieldname + 'ErrorField',
            cls: 'errorfield',
            tpl: [
                '<tpl if="values.length &gt; 0">',
                '    <ul>',
                '        <tpl for=".">',
                //'            <li>{field} {message}</li>',
                '            <li>{message}</li>',
                '        </tpl>',
                '    </ul>',
                '</tpl>'
            ],
            hidden: true
        };

        Ext.apply(this, config);
        wall.views.ErrorField.superclass.initComponent.call(this);
    },

});
Ext.reg('wall.views.ErrorField', wall.views.ErrorField);

wall.views.Viewport = Ext.extend(Ext.Panel, {
    fullscreen: true,
    layout: 'card',
    cardSwitchAnimation: 'slide',
    listeners: {
        cardswitch: function(thisContainer, newCard, oldCard) {
            //alert('cardswitch');
            //alert(oldCard.getId());
            var persistentCards = 'homeMenu,rssFeed,rssDetail, wallPanel, rssTwitterFeed, rssTwitterDetail';
            if (oldCard) {
                if (persistentCards.indexOf(oldCard.getId()) < 0) {
                    //alert('remove');
                    this.remove(oldCard.getId(), true);
                    //alert('after remove');
                    //alert(oldCard.getId());
                }
            }
        },
    },
    initComponent: function() {
        //put instances of cards into wall.views namespace
                                 //console.log('Viewport 0');
                                 //alert('viewort 0');
                                 

        Ext.apply(wall.views, {
//                  signInPanel: new wall.views.SignInPanel(),
//                  signInForm: new wall.views.SignInForm(),
                  homeMenu: new wall.views.HomeMenu(),
                  wallPanel: new wall.views.WallPanel(),

//                  settingsMenu: new wall.views.SettingsMenu(),
//                  accountSettingsMenu: new wall.views.AccountSettingsMenu(),
//                  userForm: new wall.views.UserForm(),
//                  changePasswordForm: new wall.views.ChangePasswordForm(),
//                  sharingSettingsForm: new wall.views.SharingSettingsForm(),
//                  aboutPanel: new wall.views.AboutPanel(),
                  notificationOverlay: new wall.views.NotificationOverlay(),
                  pictureActionSheet: new wall.views.PictureActionSheet()
        });
        //put instances of cards into viewport
                                 //console.log('Viewport 1');
                                 //alert('viewport 1');
        Ext.apply(this, {
                  items: [
//                  wall.views.signInPanel,
//                  wall.views.signInForm,
                  wall.views.homeMenu,
//                  wall.views.settingsMenu,
//                  wall.views.accountSettingsMenu,
//                  wall.views.userForm,
//                  wall.views.changePasswordForm,
//                  wall.views.sharingSettingsForm,
//                  wall.views.aboutPanel,
                  ]
        });
    
                                 //alert('viewport 2');
        wall.views.Viewport.superclass.initComponent.apply(this, arguments);
    }
});

wall.views.ChangePasswordForm = Ext.extend(Ext.form.FormPanel, {
    id: 'changePasswordForm',
    scroll: 'vertical',
    //defaultInstructions: 'Please enter the information above.',
    defaultInstructions: '',

    initComponent: function(){
    Ext.apply(this, {
        dockedItems: [
            {xtype: 'toolbar',
            id: 'changePasswordFormToolbar',
            title: 'Change Password',
            style: 'font-size: 90%',
            items: [{
                xtype: 'button',
                ui: 'back',
                text: 'Back',
                handler: this.onBackAction,
                scope: this,
            }]
            },
            {
                xtype:'toolbar',
                dock: 'bottom',
                items: [
                    {xtype: 'spacer'},
                    {        
                    xtype: 'button',
                    ui: 'confirm',
                    text: 'Save Changes',
                    handler: this.onSaveAction,
                    scope: this,
                    },
                ]
            },
        ],

    });

    Ext.apply(this, {
        items: [{
            xtype: 'fieldset',
            id: 'changePasswordFieldset',
            //title: 'Change Password',
            title: '',
            instructions: this.defaultInstructions,
            defaults: {
                xtype: 'passwordfield',
                labelAlign: 'left',
                style: 'font-size: 80%',
                useClearIcon: true,
                required: true,
            },

            items: [
                {
                name: 'currentUserPassword',
                label: 'Current Password',
                required: true
                },
                    {
                    xtype: 'wall.views.ErrorField',
                    fieldname: 'currentUserPassword',
                    },
                {
                name: 'newUserPassword',
                label: 'New Password',
                required: true
                },
                    {
                    xtype: 'wall.views.ErrorField',
                    fieldname: 'newUserPassword',
                    },
                {
                name: 'confirmNewUserPassword',
                label: 'Confirm New Password',
                required: true
                },
                    {
                    xtype: 'wall.views.ErrorField',
                    fieldname: 'confirmNewUserPassword',
                    },
            ],
        }],
    });

    wall.views.ChangePasswordForm.superclass.initComponent.apply(this);
    },
    
    onBackAction: function() {
        Ext.dispatch({
            controller: wall.controllers.main,
            action: 'showAccountSettingsMenu',
            animation: {type: 'slide', direction: 'right'},
        });
    },

    onSaveAction: function() {
        //console.log(this);
        //console.log('onsaveaction');
        Ext.dispatch({
            controller: wall.controllers.main,
            action: 'changePassword',
            animation: {type: 'slide', direction: 'right'},
            data: this.getValues(),
            record: this.getRecord(),
            form: this
        });
    },

    showErrors: function(errors){
        //console.log(errors);
        var fieldset = this.down('#changePasswordFieldset');
        this.fields.each(function(field){
            var fieldErrors = errors.getByField(field.name);

            if (fieldErrors.length > 0) {
                var errorField = this.down('#' + field.name + 'ErrorField');
                field.addCls('invalid-field');
                errorField.update(fieldErrors);
                errorField.show();
            } else {
                this.resetField(field);
            }
        }, this);
        fieldset.setInstructions('Please update the noted fields.');
    },

    resetForm: function(){
        var fieldset = this.down('#changePasswordFieldset');
        this.fields.each(function(field) {
            this.resetField(field);
        }, this);
        fieldset.setInstructions(this.defaultInstructions);
        this.reset();
    },    

    resetField: function(field) {
        var errorField = this.down('#' + field.name + 'ErrorField');
        errorField.hide();
        field.removeCls('invalid-field');
        return errorField;
    }

});


wall.views.SettingsMenu = Ext.extend(Ext.Panel, {
    //id: 'settingsMenu',
    layout: 'fit',
    scroll: 'vertical',
    initComponent: function(){
    Ext.apply(this, {
              dockedItems: [
                            {xtype: 'toolbar',
                            //id: 'settingsMenuToolbar',
                            title: 'Settings',
                            items: [{
                                    xtype: 'button',
                                    ui: 'back',
                                    text: 'Back',
                                    handler: function(){
                                    Ext.dispatch({
                                                 controller: wall.controllers.main,
                                                 action: 'showHomeMenu',
                                                 animation: {type: 'slide', direction: 'right'}
                                                 });
                                    }
                                    }]
                            }
                            ],
              items: [
                      {xtype: 'list',
                      //id: 'settingsMenuList',
                      store: wall.stores.settingsMenuStore,
                      itemTpl: '{menuItem}',
                      listeners: {
                      itemtap: function (dataView, index, item, e) {
                      var nextMenuAction = dataView.store.getAt(index).data.menuAction;
                      Ext.dispatch({
                                   controller: wall.controllers.main,
                                   action: nextMenuAction,
                                   animation: {type: 'slide', direction: 'left'}
                                   });
                      }
                      }
                      }
                      ]

    });

    wall.views.SettingsMenu.superclass.initComponent.apply(this);
    }
});


wall.views.WallPanel = Ext.extend(Ext.Panel, {
            id: 'wallPanel',
            layout: 'fit',
            scroll: 'vertical',
            initComponent: function(){
            Ext.apply(this, {
                dockedItems: [{
                                xtype:'toolbar',
                                dock : 'top',                
                                id: 'wallToolbar',
                                //title: 'Post',
                                ui:'light',
                                layout: 'hbox',
                                items: [{
                                        xtype: 'button',
                                        ui: 'back',
                                        text: 'Back',
                                        handler: function(){
                                        Ext.dispatch({
                                                controller: wall.controllers.main,
                                                action: 'showHomeMenu',
                                                animation: {type: 'slide', direction: 'right'}
                                                    });
                                            }
                                            },{xtype: 'spacer'},
                                            {cls:'pic-button',
                                             text: '<img src="lib/thewall/icons/camera.png" id="uploadPic" />',
                                             ui: 'plain',
                                            style: 'margin:0;',
                                                                  border:0,
                                                                  padding:0,
                                                                  
                                                                  width:45,
                                                                  handler: function() {wall.views.pictureActionSheet.show();},},
                                                                  postButton
                                                                  ]
                                                          },{
                                                          xtype:'panel',
                                                          id:'wallView',
                                                          fullscreen: false,
                                                          dock:'bottom',
                                                          height:'65%',
                                                          scroll: false,
                                                          
                                                          items:[{
                                                                 xtype:'list',
                                                                 id:'wallPosts',
                                                                 fullscreen: false,
                                                                 dock:'bottom',
                                                                 height:300,
                                                                 scroll:true,
                                                                 itemTpl : tpl,
                                                                 layout: 'auto',
                                                                 itemCls:'noBorder',
                                                                 //style: 'background: #DDEEF6;',
                                                                 disableSelection: true,
                                                                 store: wall.stores.WallPostsStore,
                                    listeners: {
                                    itemtap: function (dataView, index, item, e) {
                                    Ext.dispatch({
                                                    controller: wall.controllers.WallController,
                                                    action: 'showDetailPanel',
                                                    animation: {type: 'slide', direction: 'left'},
                                                    userPic:dataView.store.getAt(index).data.userid,
                                                    timestamp:dataView.store.getAt(index).data.timestamp,
                                                    photo: dataView.store.getAt(index).data.urlM,
                                                    message: dataView.store.getAt(index).data.message,
                                                    });
                                                                 }
                                                                 },
                                                                 
                                                                
                                                                 
                                    plugins: [{ptype: 'pullrefresh'}]
                                                                 
                                                                 }]
                                                          }],
                                            items: [{
                                                    xtype:'formpanel',
                                                    id:'formbase',
                                                    scroll: false,
                                                    url   : 'http://arbdev.mine.nu/wall_post.php',
                                                    standardSubmit : false,
                                                    layout: 'vbox',
                                                    
                                                    ui:'light',
                                                    title: '',
                                                    items: [{
                                                            id:'field',
                                                            xtype: 'fieldset',
                                                            
                                                            title: '',
                                                            margin:0,
                                                            padding:0,
                                                            scroll:false,
                                                            height:'29%',
                                                            defaults: {
                                                            labelAlign: 'left',
                                                            labelWidth: '0%'
                                                            
                                                            },
                                                            items: [
                                                                    {
                                                                    id:'text',
                                                                    xtype: 'textareafield',
                                                                    name : 'message',
                                                                    
                                                                    placeHolder:'Post a message',
                                                                    width:275,
                                                                    align:'top',
                                                                    label: '',
                                                                    
                                                                    maxLength: 2048,
                                                                    maxRows: 10,
                                                                    height: 90
                                                                    },
                                                                    ]
                                                            }
                                                            ],
                                                    
                                                    
                                                    }]
                                            
                                            });
                                
                                wall.views.WallPanel.superclass.initComponent.apply(this);
                                }
                                });



wall.views.UserDetail = Ext.extend(Ext.form.FormPanel, {
    id: 'userDetail',
    scroll: 'vertical',

    initComponent: function(){
    Ext.apply(this,{
           dockedItems: [
                         {
                         xtype: 'toolbar',
                         id: 'userDetailToolbar',
                         title: 'User Profile',
                         items: [
                                 {
                                 xtype: 'button',
                                 ui: 'back',
                                 text: 'Back',
                                 handler: this.onBackAction,
                                 scope: this 
                                 }
                                 ],
                         },
                         {
                         xtype:'toolbar',
                         dock: 'bottom',
                         items: [
                                 {xtype: 'spacer'},
                                 {        
                                 xtype: 'button',
                                 id: 'userDetailDeleteButton',
                                 ui: 'decline',
                                 text: 'Delete',
                                 handler: this.onDeleteAction,
                                 scope: this
                                 },
                                 ]
                         },
                         ],

    });

    Ext.apply(this,{
           defaults: {
           xtype: 'textfield',
           labelAlign: 'left',
           style: 'font-size: 80%',
           required: false,
           },
                   tpl: [
                    'userId: {userId}<br />', 
                    'deviceId: {deviceId}<br />',
                    'userAcctStatus: {userAcctStatus}<br />',
                    'userFirstName: {userFirstName}<br />',
                    'userLastName: {userLastName}<br />',
                    'userEmailAddress: {userEmailAddress}<br />',
                    'userPassword: {userPassword}<br />',
                    'userPhoneNumber: {userPhoneNumber}<br />',
                    'userLocation: {userLocation}<br />',
                    'userGender: {userGender}<br />',
                    'userAccountType: {userAccountType}<br />',
                    'userSignedIn: {userSignedIn}<br />',
                    'userDateCreated: {userDateCreated}<br />',
                    'userLastSignIn: {userLastSignIn}<br />',
                    'userPhotoUrl: {userPhotoUrl}<br />',
                    'photosPhotoId: {photosPhotoId}<br />',
                    'facebookConnectFlag: {facebookConnectFlag}<br />',
                    'facebookAccessToken: {facebookAccessToken}<br />',
                    'facebookAccessTokenSecret: {facebookAccessTokenSecret}<br />',
                    'sharePostsToFacebook: {sharePostsToFacebook}<br />',
                    'twitterConnectFlag: {twitterConnectFlag}<br />',
                    'twitterAccessToken: {twitterAccessToken}<br />',
                    'twitterAccessTokenSecret: {twitterAccessTokenSecret}<br />',
                    'sharePostsToTwitter: {sharePostsToTwitter}<br />',
                    'confirmationCode: {confirmationCode}<br />',
                          ],
/*         items: [
                   {
                   xtype: 'button',
                   id: 'userImageButton',
                   html: '<img src="" id="userProfilePic"/>',
                   height: 100,
                   width: 100,
                   ui: 'plain',
                   cls: 'amimagebutton',
                   pressedCls: 'amimagebtnp',
                   handler: function(){
                   wall.views.pictureActionSheet.show();
                   //this.update('<img src="lib/thewall/userimage.jpg" />');
                   },
                   },
                   {
                   name: 'userFirstName',
                   label: 'First Name',
                   required: true
                   },
                   {
                   name: 'userLastName',
                   label: 'Last Name',
                   },
                   {
                   xtype: 'emailfield',
                   name: 'userEmailAddress',
                   label: 'Email',
                   required: true
                   },
                   {
                   xtype: 'passwordfield',
                   name: 'userPassword',
                   label: 'Password',
                   required: true
                   },
                   {
                   xtype: 'numberfield',
                   name: 'userPhoneNumber',
                   label: 'Phone',
                   },
                   {
                   name: 'userLocation',
                   label: 'Location',
                   },
                   {
                   xtype: 'selectfield',
                   name: 'userGender',
                   label: 'Gender',
                   options: [{
                             text: 'Not Selected',
                             value: 'U'
                     }, {
                             text: 'Female',
                             value: 'F',
                     }, {
                             text: 'Male',
                             value: 'M'
                   }]
                   }, 
                   ], */
/*            listeners: {
                beforeactivate: function() {
                    //var deleteButton = this.down('#userFormDeleteButton'),
                    var saveButton = this.down('#userFormSaveButton'),
                    //titlebar = this.down('#userFormTitlebar'),
                    model = this.getRecord();
                    //alert('beforeactivate userId:' + model.get('userId'));

                    if (model.phantom) {
                        //alert('phantom true');
                        //titlebar.setTitle('Create Account');
                        saveButton.setText('Create Account');
                        //deleteButton.hide();
                    } else {
                        //alert('phantom false');
                        //titlebar.setTitle('Update Account');
                        saveButton.setText('Update Account');
                        //deleteButton.show();
                    }
                },
                //deactivate: function() { this.resetForm() }
            } */          
           });

    wall.views.UserForm.superclass.initComponent.apply(this);
    },
    
    onBackAction: function(){
        var model = this.getRecord();
        Ext.dispatch({
            controller: wall.controllers.main,
            action: 'showUserList',
            //action: (model.phantom ? 'showSignInPanel' : 'showAccountSettingsMenu'),
            animation: {type: 'slide', direction: 'right'}
        });
    },

    onDeleteAction: function(){
        var model = this.getRecord();
        //alert('onsaveaction userId:' + model.get('userId'));
                                 /*this.submit({
                                             params: {
                                             myparms: 'myparms'
                                             },
                                             success: this.onSubmitSuccess,
                                             failure: this.onSubmitFailure
                                 });*/
        Ext.dispatch({
            controller: wall.controllers.main,
            action: 'deleteAccount',
            animation: {type: 'slide', direction: 'right'},
            //data: this.getValues(),
            record: model,
            //form: this
        });
    },

    onSubmitSuccess: function(form, result){
                                 alert('success!');
                                 alert(result);
        var hideNotification = new Ext.util.DelayedTask(function() {
                                                     wall.views.notificationOverlay.hide(
                                                                                         'fade'
                                                                                         );
                                                     });
        //wall.views.notificationOverlay.setSize({width: 10, height: 10});
        wall.views.notificationOverlay.update(result);
        wall.views.notificationOverlay.show();
        hideNotification.delay(5000);

    },

    onSubmitFailure: function(form, result){
                                 alert('failure!');
                                 alert(result);
                                 var hideNotification = new Ext.util.DelayedTask(function() {
                                                                                 wall.views.notificationOverlay.hide(
                                                                                                                     'fade'
                                                                                                                     );
                                                                                 });
                                 //wall.views.notificationOverlay.setSize({width: 10, height: 10});
                                 wall.views.notificationOverlay.update(result);
                                 wall.views.notificationOverlay.show();
                                 hideNotification.delay(5000);

    },
                                 
    
});

wall.views.SignInPanel = Ext.extend(Ext.Panel,{
//var signInPanel = {
//xtype: 'panel',

    id: 'signInPanel',
    fullscreen: true,
    layout: 'vbox',
    scroll: 'vertical',
    //showAnimation: {type: 'slide', direction: 'left'},
                                    //listeners: {
                                    //deactivate: function(thiscomponent) {
                                    //alert('deactivate SignInPanel');
                                    //thiscomponent.destroy();
                                    //delete wall.views.signInPanel;
                                    //    alert('after deactivate');
                                    //},
                                    //},
initComponent: function() {

    Ext.apply(this,{
    
              items: [
                      {xtype: 'spacer'},
                      {html: 'Already have an account?'},
                      {xtype: 'button',
                      ui: 'confirm',
                      text: 'Sign In',
                      margin: '10',
                      width: '240',
                      handler: function() {
                      Ext.dispatch({
                                   controller: wall.controllers.main,
                                   action: 'showSignInForm',
                                   animation: {type: 'slide', direction: 'left'}
                                   });
                      }
                      },
                      {html: 'Or'},
                      {xtype: 'button',
                      ui: 'normal',
                      text: 'Start Using App',
                      margin: '10',
                      width: '240',
                      handler: function() {
                      Ext.dispatch({
                                   controller: wall.controllers.main,
                                   action: 'signInAsGuest',
                                   animation: {type: 'slide', direction: 'left'}
                                   });
                      }
                      },
                      {xtype: 'spacer'},
                      {html: 'Need an account?'},
                      {xtype: 'button',
                      ui: 'confirm',
                      text: 'Create Account',
                      margin: '10',
                      width: '240',
                      handler: function() {
                      Ext.dispatch({
                                   controller: wall.controllers.main,
                                   action: 'createAccount',
                                   animation: {type: 'slide', direction: 'left'}
                                   });
                      }
                      },
                      {html: 'Or'},                               
                      {xtype: 'button',
                      ui: 'action',
                      text: 'Connect with Facebook',
                      margin: '10',
                      width: '240',
                      handler: function() { login(); me();mpq.track("Button clicked");},

                      },
                      {xtype: 'spacer'}                              
                      ],
              
              dockedItems: [{
                            xtype: 'toolbar',
                            id: 'signInPanelToolbar',
                            title: 'Sign In'
                            }] 
    
    
    
    });

    wall.views.SignInPanel.superclass.initComponent.apply(this);
}
});
//};


wall.views.AccountSettingsMenu = Ext.extend(Ext.Panel, {
    id: 'accountSettingsMenu',
    layout: 'fit',
    scroll: 'vertical',
    initComponent: function(){
    Ext.apply(this,{
              dockedItems: [
                            {xtype: 'toolbar',
                            id: 'accountSettingsMenuToolbar',
                            title: 'Account Settings',
                            style: 'font-size: 90%',
                            items: [
                                    {xtype: 'button',
                                    ui: 'back',
                                    text: 'Back',
                                    handler: function(){
                                    Ext.dispatch({
                                                 controller: wall.controllers.main,
                                                 action: 'showSettingsMenu',
                                                 animation: {type: 'slide', direction: 'right'}
                                                 });
                                    }
                                    }
                                    ]
                            }
                            ],
              items: [
                      {xtype: 'list',
                      store: wall.stores.accountSettingsMenuStore,
                      itemTpl: '{menuItem}',
                      listeners: {
                      itemtap: function (dataView, index, item, e) {
                      var nextMenuAction = dataView.store.getAt(index).data.menuAction;
                      Ext.dispatch({
                                   controller: wall.controllers.main,
                                   action: nextMenuAction,
                                   animation: {type: 'slide', direction: 'left'}
                                   });
                      }
                      }
                      }
                      ]

    });

    wall.views.AccountSettingsMenu.superclass.initComponent.apply(this);
    }
});

