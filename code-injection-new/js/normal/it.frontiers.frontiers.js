
/**
 * Phonegap Web Intent plugin
 * Copyright (c) Boris Smus 2010
 *
 */
var WebIntent = function() { 

};

WebIntent.ACTION_SEND = "android.intent.action.SEND";
WebIntent.ACTION_VIEW= "android.intent.action.VIEW";
WebIntent.EXTRA_TEXT = "android.intent.extra.TEXT";
WebIntent.EXTRA_SUBJECT = "android.intent.extra.SUBJECT";
WebIntent.EXTRA_STREAM = "android.intent.extra.STREAM";
WebIntent.EXTRA_EMAIL = "android.intent.extra.EMAIL";

WebIntent.prototype.startActivity = function(params, success, fail) {
	return PhoneGap.exec(function(args) {
        success(args);
    }, function(args) {
        fail(args);
    }, 'WebIntent', 'startActivity', [params]);
};

WebIntent.prototype.hasExtra = function(params, success, fail) {
	return PhoneGap.exec(function(args) {
        success(args);
    }, function(args) {
        fail(args);
    }, 'WebIntent', 'hasExtra', [params]);
};

WebIntent.prototype.getUri = function(success, fail) {
	return PhoneGap.exec(function(args) {
        success(args);
    }, function(args) {
        fail(args);
    }, 'WebIntent', 'getUri', []);
};

WebIntent.prototype.getExtra = function(params, success, fail) {
	return PhoneGap.exec(function(args) {
        success(args);
    }, function(args) {
        fail(args);
    }, 'WebIntent', 'getExtra', [params]);
};


WebIntent.prototype.onNewIntent = function(callback) {
	return PhoneGap.exec(function(args) {
		callback(args);
    }, function(args) {
    }, 'WebIntent', 'onNewIntent', []);
};

WebIntent.prototype.sendBroadcast = function(params, success, fail) {
    return PhoneGap.exec(function(args) {
        success(args);
    }, function(args) {
        fail(args);
    }, 'WebIntent', 'sendBroadcast', [params]);
};

PhoneGap.addConstructor(function() {
	PhoneGap.addPlugin('webintent', new WebIntent());
});



  var device = null;























      document.addEventListener("deviceready", function() {
        Frontiers.mainLaunch();
      }, false);
      document.addEventListener("offline", onOffline);
      document.addEventListener("online", onOnline);
      document.addEventListener("resume", onResume);
      document.addEventListener("backbutton", onBackButton);
    

/**
 * 
 * Phonegap share plugin for Android
 * Kevin Schaul 2011
 *
 */

var Share = function() {};
            
Share.prototype.show = function(content, success, fail) {
    return cordova.exec( function(args) {
        success(args);
    }, function(args) {
        fail(args);
    }, 'Share', '', [content]);
};

cordova.addConstructor(function(){
    cordova.addPlugin('share', new Share());
});

/**
 * The Router maps local urls to controller and action pairs. This is used primarily 
 * for providing history support without reloading the page. Example usage:
 * 
 * Connects http://myapp.com/#home to the index controller's overview action
 * map.connect("home", {controller: 'index', action: 'overview'});
 * 
 * Connects urls like "images/myImage.jpg" to the images controller's show action, passing
 * "myImage.jpg" as the "url" property of the options object each controller action receives
 * map.connect("images/:url", {controller: 'images', action: 'show'});
 */
Ext.Router.draw(function(map) {
    //These are default fallback routes and can be removed if not needed
    map.connect(':controller/:action');
    map.connect(':controller/:action/:id');
});

Ext.Ajax.timeout = 90000;

var Frontiers, Ext;
var first_time = true;

function loadAll(loadRadio) {
  if (first_time) { // bug in phonegap 1.2
    first_time = false;
    return;
  }
  if (loadRadio) {
    Frontiers.stores.Radio.load();    
  }
  Frontiers.stores.Album.load();
  Frontiers.stores.News.load();
  Frontiers.stores.Fanzine.load();
  Frontiers.stores.Video.load();
  Frontiers.stores.Focus.load();
  Frontiers.stores.Distributor.load();
}

function closeDialogs() {
  var radioDialog = Ext.getCmp('radio-dialog');
  if (radioDialog)
    radioDialog.hide(true); 
  var albumView = Ext.getCmp('album-view');
  if (albumView) 
    albumView.hide(true);
}

function onBackButton() {
        closeDialogs();
      Ext.dispatch({controller: 'Main', action: 'index'});
}

function onOffline() {
  if (Frontiers == undefined || Frontiers.stores.Focus.getCount() == 0) {
    navigator.notification.alert("Please, go online to use the app",
                                 function() { }, "Frontiers");
  } else {
    navigator.notification.alert("Connection lost");
  }
  window.console.log('connection lost');
}

function onOnline() {
  loadAll(true);
}

function onResume() {
//  loadAll(false);
}

Ext.regApplication(
  {
    name: 'Frontiers',
    launched: false, 
    shown_album: null,
    showNews: true,
    lastUpdatedOn: null,
    radioPadOn: true,

    current_album: function() {
      var album = Frontiers.stores.Radio.getAt(0);
      if (!album) {
        return null;
      }
      var album_id = album.get('album_id');
      var albumStored = Frontiers.stores.Album.findRecord('album_id', album_id);
      if (!albumStored && album_id) {
        Frontiers.stores.Album.add(album.data);
      }
      return album;
    },

    launch: function() {
      this.launched = true;
      this.mainLaunch();
    },
    mainLaunch: function() {
      if (!this.launched) {
        return;
      };

      if (!device) {
        return;
      };

      if (navigator.network.connection.type == Connection.NODE) {
        navigator.notification.alert("Please go online to use the Frontiers App",
                                     function() {}, "Frontiers");
      } else {
        var states = {};
        states[Connection.UNKNOWN]  = 'Unknown connection';
        states[Connection.ETHERNET] = 'Ethernet connection';
        states[Connection.WIFI]     = 'WiFi connection';
        states[Connection.CELL_2G]  = 'Cell 2G connection';
        states[Connection.CELL_3G]  = 'Cell 3G connection';
        states[Connection.CELL_4G]  = 'Cell 4G connection';
        states[Connection.NONE]     = 'No network connection';
        console.log('Connection type: ' + states[navigator.network.connection.type]);
      }
      
      try {
        registerAPN();        
      } catch (e) {

      }
      
      this.viewport = new Frontiers.views.Viewport({ application: this } );
      Frontiers.radioMask = new Ext.LoadMask(Ext.getBody(), {msg:"Buffering..."});
      Frontiers.lastUpdatedOn = new Date();
      Ext.dispatch({controller: 'Main', action: 'index'});
    },

      /* TODO. Never called */
    radio_mask: function() {
      if (Ext.get('radio').dom.readyState < 4 && window.plugins.audioStream) {
        Frontiers.radioMask.show();
      } else {
        Frontiers.radioMask.hide();
      }
    }
  });


/* Hide the load more button when no more pages are available */
Ext.override(Ext.plugins.ListPagingPlugin, 
{    
  onListUpdate : function() {
    if (this.list.store && this.list.store.data.length < (this.list.store.currentPage * this.list.store.pageSize)) {
      if (!this.rendered) {
        // do nothing
      } else if (!this.autoPaging) {
        this.el.removeCls('x-loading');
        //this.el.remove();
      } else {
        this.loading = false;
      }
    } else {
      if (!this.rendered) {
        this.render();
      }
      
      this.el.appendTo(this.list.getTargetEl());
      if (!this.autoPaging) {
        this.el.removeCls('x-loading');
      }
      this.loading = false;
    }
  }
});

Frontiers.stores.Video = new Ext.data.JsonStore(
  {
    currentPage: 1,
    autoLoad: true,
    remoteFilter: true,
    pageSize: 10,
    clearOnPageLoad: false,
        
    proxy: {
      type: 'ajax',
      startParam: 'start',
      limitParam: 'count',
      url: 'http://www.frontiers.it/videos.json',
      reader: {
        type: 'json',
        root: 'videos'
      }
    },

    fields: [
      'id',
      'title',
      'created_on',
      'body',
      'body_text',
      'url',
      'youtube_link'
    ]
});

Frontiers.stores.AlbumVideo = new Ext.data.JsonStore(
  {
    fields: [
      'id',
      'title',
      'created_on',
      'body',
      'body_text',
      'url',
      'youtube_link'
    ]
  }
);

Frontiers.stores.Focus = new Ext.data.JsonStore(
  {
    autoload: false,
    proxy: {
      type: 'ajax',
      url: 'http://www.frontiers.it/focus.json',
      reader: {
        type: 'json',
        root: 'focus'
      }
    },

    fields: [
      'title',
      'subtitle',
      'created_on',
      'body_text',
      'client_url',
      'type',
      'image_url',
      'genre',
      'price'
    ],
    getGroupString : function(record) {
        return record.get('type');
    }
});

Frontiers.stores.Radio = new Ext.data.JsonStore(
  {
    autoload: false,
    proxy: {
      type: 'ajax',
      url: 'http://www.frontiers.it/webradio.json',
      reader: {
        type: 'json',
        root: 'track_data'
      }
    },

    fields: [
      'track_title',
      'author',
      'title',
      'genre',
      'release_date',
      'usa_release_date',
      'short_description',
      'description',
      'short_description_text',
      'description_text',
      'url',
      'cover_url',
      'images',
      'videos',
      'supports',
      'paypal',
//      'itunes',
      'price'
    ]
});


Frontiers.stores.Album = new Ext.data.JsonStore(
  {
    currentPage: 1,
    autoLoad: true,
    remoteFilter: true,
    pageSize: 5,
    clearOnPageLoad: false,

    proxy: {
      type: 'ajax',
      startParam: 'start',
      limitParam: 'count',
      url: 'http://www.frontiers.it/releases.json',
      reader: {
        type: 'json',
        root: 'albums'
      }
    },

    getGroupString : function(record) {
      var category_descriptions = {
        'search' : 'Search',
        'all' : 'All Releases',
        'current' : 'Current Releases',
        'upcoming' : 'Upcoming Releases',
        'deals' : 'Special Offers',
        '2011' : '2011',
        '2010' : '2010',
        '2009' : '2009',
        '2008' : '2008',
        '2007' : '2007',
        '2006' : '2006',
        '2005' : '2005'
      };
      return category_descriptions[record.get('query_category')] + ' | Genre: ' + record.get('query_genre');
    },

    fields: [
      'id',
      'author',
      'title',
      'genre',
      'query_category',
      'query_genre',
      'release_date',
      'usa_release_date',
      'short_description',
      'description',
      'short_description_text',
      'description_text',
      'url',
      'cover_url',
      'images',
      'videos',
      'supports',
      'paypal',
//      'itunes',
      'is_ipad',
      'is_iphone',
      'price'
    ]
});



Frontiers.stores.News = new Ext.data.JsonStore(
  {
    currentPage: 1,
    autoLoad: true,
    remoteFilter: true,
    pageSize: 10,
    clearOnPageLoad: false,
        
    proxy: {
      type: 'ajax',
      startParam: 'start',
      limitParam: 'count',
      url: 'http://www.frontiers.it/news.json',
      reader: {
        type: 'json',
        root: 'posts'
      }
    },

    fields: [
      'id',
      'image_url',
      'title',
      'subtitle',
      'created_on',
      'body',
      'body_text',
      'url'
    ]
});

Frontiers.stores.Fanzine = new Ext.data.JsonStore(
  {
    currentPage: 1,
    autoLoad: true,
    remoteFilter: true,
    pageSize: 10,
    clearOnPageLoad: false,
        
    proxy: {
      type: 'ajax',
      startParam: 'start',
      limitParam: 'count',
      url: 'http://www.frontiers.it/fanzines.json',
      reader: {
        type: 'json',
        root: 'fanzines'
      }
    },

    fields: [
      'id',
      'image_url',
      'title',
      'subtitle',
      'created_on',
      'pdf_url',
      'body',
      'body_text',
      'url',
      'issuu_docid'
    ]
});

Ext.regController("Main",
                  {
                    album: function(opts) {
                      var album = Frontiers.stores.Album.getById(parseInt(opts.id));
                      Ext.dispatch({controller: 'Main', action: 'show_album', album: album});
                    },

                    fanzine: function(opts) {
                      var fanzine = Frontiers.stores.Fanzine.getById(parseInt(opts.id));
                      var url = fanzine.get('pdf_url');
                      if (!window.plugins.audioStream) {
                        // url = 'http://docs.google.com/gview?embedded=true&url=' + url;                        
                        window.plugins.webintent.startActivity(
                          { action: WebIntent.ACTION_VIEW, url: url}, 
                          function() {}, 
                          function() {console.log('Failed to open URL via Android Intent');}
                        );
                      } else {
		                    window.plugins.childBrowser.showWebPage(url);
                      }
                    },

                    distributors: function() {
                      var controller = this;
                      if (!controller.distributorView) {
                        controller.distributorView = new Frontiers.views.DistributorView(); 
                      }
                      controller.distributorView.show();
                    },

                    show_album: function(opts) {
                      var controller = this;
                      if (!controller.albumView) {
                        controller.albumView = new Frontiers.views.AlbumView(); 
                      }
                      
                      if (opts.from_radio && !Ext.is.Tablet) {
                        controller.close_radio();
                        controller.albumView.fromRadio = true;
                      } else {
                        controller.albumView.fromRadio = false;
                      }


                      var album = opts.album;
                      Frontiers.shown_album = opts.album;

                      if (Ext.is.Tablet) {
                        window.plugins.childBrowser.showWebPage('http://www.frontiers.it' + album.get('url') + 'ipad');
                        return;
                      }

                  //console.log(album.data);

                      controller.albumView.show();
                      Ext.getCmp('album-info').update(album.data);
                      Ext.getCmp('album-bio').update(album.data);
                      Ext.getCmp('images-panel').currentImageIndex = 0;
                      Ext.getCmp('images-panel').fireEvent('activate');
                      Frontiers.stores.AlbumVideo.each(function(record) { Frontiers.stores.AlbumVideo.remove(record); });


                      var videos = album.get('videos');
                      for(var i = 0; i < videos.length; i++) {
                        Frontiers.stores.AlbumVideo.add(videos[i]);
                      }
                  var paypalBtn = Ext.getCmp('album-info-paypal-button');
                  var itunesBtn = Ext.getCmp('album-info-itunes-button');
                  var emailBtn = Ext.getCmp('shareemail2');
                  
                  
                  if (paypalBtn)
                  paypalBtn.check();
                  if (itunesBtn)
                  itunesBtn.check();
                  if (emailBtn) {
                          emailBtn.check();
                  }
                    },

                    show_news: function(opts) {
                      var controller = this;
                      if (!controller.postView) {
                        controller.postView = new Frontiers.views.PostView();
                      }
                      var news = Frontiers.stores.News.getById(parseInt(opts.id));
                      controller.postView.update(news.data);
                      controller.postView.show();                      
                    },

                    show_video: function(opts) {
                      var controller = this;
                      var video = Frontiers.stores.Video.getById(parseInt(opts.id));
                      window.plugins.childBrowser.showWebPage(video.get('url'));
                    },

                    close_radio: function() {
//                      controller.application.viewport.setActiveItem(controller.mainView);
                      Ext.getCmp('radio-dialog').hide(true); 
                    },

                    popup_radio: function() {
                      var controller = this;

                      if (Ext.is.Tablet) {
                        var radio = controller.mainView.dockedItems.getAt(1);
                        var button = controller.mainView.dockedItems.getAt(0).items.getAt(0);
                        if (Frontiers.radioPadOn) {
                          radio.hide();
                          button.setText('Show Radio');
                        } else {
                          radio.show();
                          button.setText('Hide Radio');
                        }
                        controller.mainView.doComponentLayout();
                        Frontiers.viewport.doComponentLayout();
                        Frontiers.radioPadOn = !Frontiers.radioPadOn;
                        return;
                      }

                      if(!controller.radioDialog) {
                        controller.radioDialog = new Frontiers.views.RadioDialog();
                        Frontiers.stores.Radio.on('load', function() { 
                                                    this.refreshRadioButtons(); 
                                                  }, this);
                        if (Frontiers.radio_loaded) {
                          controller._playBtn().enable();
                        }
                        controller.refreshRadioButtons();
                      }
//                      controller.application.viewport.setActiveItem(controller.radioDialog);
                      controller.radioDialog.show();
                    },

                    _playBtn: function() {
                      return Ext.getCmp('play-button');
                    },

                    _stopBtn: function() {
                      return Ext.getCmp('stop-button');
                    },

                    play: function(opts) {
                      var urlToStream = 'http://www.frontiers.it:8000/live.mp3';
                      this._playBtn().hide();
                      this._stopBtn().show();
                      if (window.plugins.audioStream) {
                        navigator.notification.activityStart();
                        Frontiers.radioMask.show();
                        window.plugins.audioStream.play(urlToStream);                        
                      } else {
                        this.androidMedia = new Media(urlToStream);
                        this.androidMedia.play();
                        Frontiers.radioMask.show();
                        var myMedia = this.androidMedia;
                        var progressTimer = setInterval(function() {
                                                          // get media position
                                                          myMedia.getCurrentPosition(
                                                            // success callback
                                                            function(position) {
                                                              if (position > 0) {
                                                                Frontiers.radioMask.hide();
                                                                clearInterval(progressTimer);
                                                              }
                                                            });
                                                        }, 1000);

                      }
                    },
                    stop: function(opts) {
                      this._playBtn().show();
                      this._stopBtn().hide();
                      if (window.plugins.audioStream) {
                        navigator.notification.activityStop();
                        window.plugins.audioStream.stop();                        
                      } else {
                        this.androidMedia.stop();
                      }
                    },

                    itunes: function(opts) {
                      var album = opts.album;
		      window.plugins.childBrowser.showWebPage(album.get('itunes'));
                    },
                  
                    paypal: function(opts) {
                            var album = opts.album;
		            window.plugins.childBrowser.showWebPage('http://www.frontiers.it' + album.get('url') + 'buy?mobile=1');
                            return;
                    },

                    refreshRadioButtons: function() {
                      var paypalBtn = Ext.getCmp('radio-paypal-button');
                      var itunesBtn = Ext.getCmp('radio-itunes-button');
                      var shareEmailBtn = Ext.getCmp('radio-shareEmail-button');
                      var shareBtn = Ext.getCmp('radio-share-button');
                      var infoBtn = Ext.getCmp('radio-info-button');
                      
                      if (paypalBtn)
                        paypalBtn.check();
                      if (itunesBtn)
                        itunesBtn.check();
                      if (shareEmailBtn)
                        shareEmailBtn.check();
                      if (shareBtn)
                        shareBtn.check();
                      if (infoBtn)
                        if (Frontiers.current_album() && Frontiers.current_album().get('url')) {
                          infoBtn.show();
                        } else {
                          infoBtn.hide();
                        }
                            var f = function(cmp, show) {
                                    if (Ext.getCmp(cmp)) 
                                            if (show) {
                                                    Ext.getCmp(cmp).show();
                                            } else  {
                                                    Ext.getCmp(cmp).hide();
                                            }
                            };
                      
                      if (!Frontiers.current_album().get('itunes')  && !Frontiers.current_album().get('price')) {
                              f('radio-buy-on-text', false);
                              f('radio-buy-on-text2', false);
                              f('radio-buy-on-text3', false);
                      } else {
                              f('radio-buy-on-text', true);                        
                              f('radio-buy-on-text2', true);
                              f('radio-buy-on-text3', true);
                      }
                      
                    },

                    share: function(opts) {
                      var album = opts.album;
                      var url = 'http://www.frontiers.it' + album.get('url');
                      var message = "I am listening to the album " + album.get('title') + ' by ' + album.get('author') + ' on the Frontiers Records webradio. Check it out.';
                      if (window.plugins.shareKit) {
                        window.plugins.shareKit.share(message, url);                        
                      } else {
                       window.plugins.share.show({
                                                   subject: message,
                                                   text: url},
                                                 function() {},
                                                 function() {alert('Share failed');}
                                                );
                       }
                    },

                    share_email: function(opts) {
                      var album = opts.album;
                      var subject = 'Frontiers Records';
                      var template = Ext.XTemplate.from(opts.template);
                      var body = template.apply(album.data);
                      if (window.plugins.emailComposer) {
                      window.plugins.emailComposer.showEmailComposer(subject,
                                                                     body,
                                                                     null,
                                                                     null,
                                                                     null,
                                                                     true);
                      } else {
                       window.plugins.share.show({
                                    subject: subject,
                                    text: body},
                                  function() {},
                                  function() {alert('Share failed');}
                                 );
                       }
                    },

                    pollingTask: null,
                    startPolling: function() {
                      var controller = this;
                      controller.pollingTask = new Ext.util.DelayedTask(function() { controller.polling(); });
                      controller.polling();
                    },
                
                    polling: function() {
                      var controller = this;
                      Frontiers.stores.Radio.load();
                      var now = new Date();
                      var secondsFromLastUpdate = (now - Frontiers.lastUpdatedOn) / 1000;
                      var period = 24 * 60 * 60;
                      if (secondsFromLastUpdate > period) {
                        Frontiers.lastUpdatedOn = new Date();
                        Frontiers.stores.News.load();
                        Frontiers.stores.Fanzine.load();
                        Frontiers.stores.Video.load();
                        Frontiers.stores.Focus.load();
                      }
                      controller.pollingTask.delay(10000);
                    },
                    index: function() {
                      var controller = this;
                      if (!controller.mainView) {
                        controller.mainView = new Frontiers.views.MainView();
                        controller.startPolling();
                      }
                      controller.application.viewport.setActiveItem(controller.mainView);
                      Frontiers.stores.Focus.load();
                    }
});


Frontiers.views.AlbumFilter = Ext.extend(
  Ext.Button,
  {
    text: 'Search',
    handler: function(button) {
      var picker = new Ext.Picker(
        {
          useTitles: true,
          ui: 'dark',
          slots: [
            {
              name: 'category',
              title: 'Catalogue',
              data: [
                { text: 'Current Releases', value: 'current'  },
                { text: 'Upcoming Releases', value: 'upcoming'  },
                { text: 'Special Offers', value: 'deals'  },
                { text: 'All Releases', value: 'all'  },
                { text: '2011', value: '2011'  },
                { text: '2010', value: '2010'  },
                { text: '2009', value: '2009'  },
                { text: '2008', value: '2008'  },
                { text: '2007', value: '2007'  },
                { text: '2006', value: '2006'  },
                { text: '2005', value: '2005'  }
              ]
            },
            {
              name: 'genre',
              title: 'Genre',
              data: [
                { text: 'All Genres', value: 'all'},
                { text: 'AOR', value: 'AOR'},
                { text: 'Doom', value: 'Doom'},
                { text: 'Extreme Metal', value: 'Extreme Metal'},
                { text: 'Hard Rock', value: 'Hard Rock'},
                { text: 'Heavy Metal', value: 'Heavy Metal'},
                { text: 'Melodic Hard Rock', value: 'Melodic Hard Rock'},
                { text: 'Melodic Metal', value: 'Melodic Metal'},
                { text: 'Melodic Rock', value: 'Melodic Rock'},
                { text: 'Metal', value: 'Metal'},
                { text: 'Metal Progressive', value: 'Metal Progressive'},
                { text: 'Modern Rock', value: 'Modern Rock'},
                { text: 'Nu Breed', value: 'Nu Breed'},
                { text: 'Pop', value: 'Pop'},
                { text: 'Power Metal', value: 'Power Metal'},
                { text: 'Progressive rock', value: 'Progressive rock'},
                { text: 'Rock', value: 'Rock'},
                { text: 'Trash Metal', value: 'Trash Metal'}
              ]
            }
          ]
        });
      picker.on('change', function(picker, the, slot) { 
                  var searchField = Ext.getCmp('searchField');
                  if (searchField) {
                    searchField.reset();
                  }
                  Frontiers.stores.Album.clearFilter(false);
                  Frontiers.stores.Album.currentPage = 1;
                  Frontiers.stores.Album.filter([ 
                                                  { property: 'category', value: the.category},
                                                  { property: 'genre', value: the.genre }
                                                ]);
                  Ext.getCmp('catalogview').scroller.moveTo(0, Ext.getCmp('catalogview').scroller.getOffset());
                });
      var currentFilterValues = { category: 'current', genre: 'all' };
      
      var filters = Frontiers.stores.Album.filters;
      if(filters && filters.getCount() > 0) {
        currentFilterValues.category = filters.getAt(0).value;
        currentFilterValues.genre = filters.getAt(1).value;
      }

      picker.setValue(currentFilterValues, true);
      picker.show();
    }
  });

Frontiers.views.CatalogViewList = Ext.extend(
  Ext.List,
  {
    plugins: [ { ptype: 'listpaging', autoPaging: false } ],
    id: 'catalogview',
    loadingText: 'loading',
    grouped: true,
    emptyText: 'no albums found',
    store: Frontiers.stores.Album,
    itemSelector: 'div.album',
    itemTpl: [
      '<div class="album">',
      '<div class="album_cover">',
      '<img src=\"{cover_url}\" />',
      '</div>',
      '<div class="album_data">',
      '<div class="artist_name">{author}</div>',
      '<div class="title">{title}</div>',
      '<tpl if="is_ipad">',
      '<div class="data">Release Date EU: {release_date}</div>',
      '<tpl if="usa_release_date">',
      '<div class="data">Release Date USA: {usa_release_date}</div>',
      '</tpl>',
      '</tpl>',
      '<tpl if="is_iphone">',
      '<div class="data">Rel. Date EU: {release_date}</div>',
      '<tpl if="usa_release_date">',
      '<div class="data">Rel. Date USA: {usa_release_date}</div>',
      '</tpl>',
      '</tpl>',
      '<div class="data">Genre: {genre}</div>',
      '<tpl:if="price">',
      '<div class="price">Price: {price} EUR</div>',
      '</tpl>',
      '</div>',
      '</div>'
    ],
    singleSelect: true,
    listeners: {
      itemtap: function(dataview, index, item, event) {
        var record = dataview.getRecord(item);
        Ext.dispatch({controller: 'Main', action:'show_album', album: record});
      }
    }
  });

Ext.reg('catalogviewlist', Frontiers.views.CatalogViewList);

Frontiers.views.CatalogView = Ext.extend(
  Ext.Panel, 
  { 
    padding: 0,
    margin: 0,
    layout: 'vbox',
    align: 'stretch',
    defaults: {
      width: '100%'
    },
    items: [ 
      {
        flex: 1,
        xtype: 'searchfield',
        style: 'font-size: 80%',
        autoComplete: false,
        id: 'searchField',
        placeHolder: 'Album / Artist',
        listeners: {
          change: function(field, newValue, oldValue) {
            Frontiers.stores.Album.clearFilter(false);
            Frontiers.stores.Album.currentPage = 1;
            Frontiers.stores.Album.filter([ {property: 'query', value: newValue }]);
            Ext.getCmp('catalogview').scroller.moveTo(0, Ext.getCmp('catalogview').scroller.getOffset());
          }
        }
      },
      { xtype: 'catalogviewlist', flex: 7 }
    ]                                                 
  });
Ext.reg('catalogview', Frontiers.views.CatalogView);


Frontiers.views.RadioComponent = Ext.extend(Ext.List,
{
  height: 140,
  store: Frontiers.stores.Radio,
  itemSelector: 'div.radio',
  emptyText: 'Loading radio...',
  loadingText: null,
  ui: 'dark',
  id: 'track_data_container',
  scroll: false,
  itemTpl: [
    '<div class="radio">',
    '<div class="album_cover">',
    '<img src=\"{cover_url}\"/>',
    '</div>',
    '<div class="track_data">',
    '<h2>On Air</h2>',
    '<div class="track_title">&quot;{track_title}&quot;</div>',
    '<div class="artist_name">by {author}</div>',
    '<div class="album_title">from {title}</div>',
    '</div>',
    '</div>'
  ],
  singleSelect: true
});
Ext.reg('radiocomponentview', Frontiers.views.RadioComponent);

Frontiers.views.HomeView = Ext.extend(Ext.List,
{
    loadingText: "loading",
    emptyText: 'no data found',
    store: Frontiers.stores.Focus,
    grouped: true,
    itemSelector: 'div.focus',
    itemTpl: [      
     '<div class="focus">',
      '<div class="focus_image">',
      '<img src=\'{image_url}\'/>',
      '</div>',
      '<div class="focus_data">',
        '<div class="created_on">{created_on}',
        '<tpl if="genre">',
          '<span class="genre"> {genre}</span>',
        '</tpl>',
        '</div>',
        '<div class="title">{title}</div>',
        '<div class="subtitle">{subtitle}</div>',
        '<tpl if="price">',
          '<div class="price">{price} EUR</div>',
        '</tpl>',
      '</div>',
     '</div>'
    ],
    listeners: {
      itemtap: function(dataview, index, item, event) {
        var record = dataview.getRecord(item);
        Ext.dispatch(Ext.Router.recognize(record.get('client_url')));
      }
    }
});
Ext.reg('homeview', Frontiers.views.HomeView);

Frontiers.views.AlbumActionButton = Ext.extend(Ext.Button,
 {
  cls: 'image-text-button',
  getAlbum: function() {
    return Frontiers.shown_album || Frontiers.current_album();
  }
 });

Frontiers.views.PaypalButton = Ext.extend(Frontiers.views.AlbumActionButton,
{
  iconCls: 'paypal-button',
  width: 93,
  cls: 'paypal-container-button',

  handler: function(button) {
    var album = button.getAlbum();
    Ext.dispatch({controller: 'Main', action: 'paypal', album: album});
  },

  check: function() {
      var album = this.getAlbum();
      if(album.get('price')) {
        this.show();
      } else {
        this.hide();
      }
    }
});
Ext.reg('paypalbutton', Frontiers.views.PaypalButton);

Frontiers.views.ITunesButton = Ext.extend(Frontiers.views.AlbumActionButton,
{
  iconCls: 'itunes-button',
  cls: 'itunes-container-button',
  text: 'iTunes',
  handler: function(button) {
    var album = button.getAlbum();
    Ext.dispatch({controller: 'Main', action: 'itunes', album: album});
  },

  check: function() {
    var album = this.getAlbum();
    if(album.get('itunes') && window.plugins.audioStream) {
      this.show();
    } else {
      this.hide();
    }
  }
});
Ext.reg('itunesbutton', Frontiers.views.ITunesButton);

Frontiers.views.ShareAlbumButton = Ext.extend(Frontiers.views.AlbumActionButton,
{
  iconCls: 'action',
  iconMask: true,

  handler: function(button) {
    var album = button.getAlbum();
    Ext.dispatch({controller: 'Main', action: 'share', album: album});
  },

  check: function() {
      var album = this.getAlbum();
      if(album.get('url')) {
        this.show();
      } else {
        this.hide();
      }
    }
});
Ext.reg('sharealbumbutton', Frontiers.views.ShareAlbumButton);

Frontiers.views.ShareAlbumByEmailButton = Ext.extend(Frontiers.views.AlbumActionButton,
{
  iconCls: 'email2', 
  cls: 'share-by-email-button',
  handler: function(button) {
    var album = button.getAlbum();
    Ext.dispatch({controller: 'Main', action: 'share_email', album: album, template: button.template});
  },

  check: function() {
      var album = this.getAlbum();
      if(album.get('url')) {
        if (window.plugins.audioStream) {
                this.show();
        } else {
                this.hide();
        }
      } else {
        this.hide();
      }
    }
});
Ext.reg('sharealbumbyemailbutton', Frontiers.views.ShareAlbumByEmailButton);

Frontiers.views.RadioDialog = Ext.extend(Ext.Panel,
{
  floating: true,
  centered: true,
  modal: true,
  hideOnMaskTap: false,
  width: 320,
  height: 270,
  id: 'radio-dialog',
  layout: {type: 'vbox', pack: 'center'},
  cls: 'radio-dialog',
  dockedItems: [
    {
      dock: 'bottom',
      xtype: 'toolbar',
      items: [
        { html: 'Buy on', xtype: 'component', cls: 'buyon', id: 'radio-buy-on-text3' },
        { xtype:'itunesbutton', id: 'radio-itunes-button' },
        { xtype:'paypalbutton', id: 'radio-paypal-button' }
      ]
    },
    {
      dock: 'top',
      xtype: 'toolbar',
      cls: 'radio-action-toolbar',
      items: [
        { 
          iconCls: 'play-button',
          id: 'play-button',
          disabled: Frontiers.radio_loaded,
          cls: 'image-text-button',
          handler: function(button) {
            var album = Frontiers.current_album();
            Ext.dispatch({controller: 'Main', action: 'play', album: album});
          }
        },
        { 
          iconCls: 'stop-button', 
          hidden: true,
          id: 'stop-button',
          cls: 'image-text-button',
          handler: function(button) {
            var album = Frontiers.current_album();
            Ext.dispatch({controller: 'Main', action: 'stop', album: album});
          }
        },
        {
          iconCls: 'info',
          iconMask: true,
          id: 'radio-info-button',
          cls: 'image-text-button',
          handler: function(button) {
            var album = Frontiers.current_album();
            Ext.dispatch({controller: 'Main', action: 'show_album', album: album, from_radio: true});
          }
        },
        { xtype: 'sharealbumbyemailbutton', id: 'radio-shareEmail-button', template: 'email-radio-template' },
        { xtype: 'sharealbumbutton', id: 'radio-share-button' },
        { xtype: 'spacer' },
        { 
          iconCls: 'delete', 
          iconMask: true, 
          cls: 'image-text-button delete-button',
          handler: function(button) {
            Ext.dispatch({controller: 'Main', action: 'close_radio'});
          }
        }
      ]
    }
  ],
  items: { xtype: 'radiocomponentview', cls: '' }
});


Frontiers.views.RadioContainer = Ext.extend(Ext.Panel,
{
  height: 250,
  id: 'radio-pad',
  layout: {type: 'hbox', align: 'stretch', pack: 'center'}, 
  defaults: { flex: 4, padding: '5px 0' },
  items: [
    { flex: 7, xtype: 'component', html: '<img src="images/logowebradiobig.png"/>' },
    {
      flex: 12,
      xtype: 'container',
      layout: {type: 'vbox', align: 'center', pack: 'center'}, 
      items: [
        { 
          xtype: 'button',
          iconCls: 'play-button',
          text: 'Play',
          id: 'play-button',
          disabled: Frontiers.radio_loaded,
          cls: 'image-text-button',
          handler: function(button) {
            var album = Frontiers.current_album();
            Ext.dispatch({controller: 'Main', action: 'play', album: album});
          }
        },
        { 
          text: 'Stop',
          xtype: 'button',
          iconCls: 'stop-button', 
          hidden: true,
          id: 'stop-button',
          cls: 'image-text-button',
          handler: function(button) {
            var album = Frontiers.current_album();
            Ext.dispatch({controller: 'Main', action: 'stop', album: album});
          }
        },
        { xtype: 'radiocomponentview', cls: '' }
      ]
    },
    {
      xtype: 'container',
      layout: {type: 'vbox', align: 'center', pack: 'start'},
      defaults: { margin: '15px 0' },
      items: [
        { html: 'Buy on', xtype: 'component', cls: 'buyon', id: 'radio-buy-on-text2' },
        { xtype:'itunesbutton', id: 'radio-itunes-button' },
        { xtype:'paypalbutton', id: 'radio-paypal-button' }
      ]
    },
    {
      xtype: 'container',
      layout: {type: 'vbox', align: 'center', pack: 'start'},
      defaults: { margin: '15px 0' },
      items: [
        {
          xtype: 'button',
          iconCls: 'info',
          iconMask: true,
          id: 'radio-info-button',
          cls: 'image-text-button',
          text: 'Info',
          handler: function(button) {
            var album = Frontiers.current_album();
            Ext.dispatch({controller: 'Main', action: 'show_album', album: album, from_radio: true});
          }
        },
        { xtype: 'sharealbumbyemailbutton', 
          text: 'Send',
          id: 'radio-shareEmail-button', template: 'email-radio-template' },
        { xtype: 'sharealbumbutton', id: 'radio-share-button',
          text: 'Share'
        }
      ]
    }
  ]
});
Ext.reg('radiocontainer', Frontiers.views.RadioContainer);

Frontiers.views.QuitButton = Ext.extend(Ext.Button,
{
        xtype: 'button',
        text: 'Quit', 
        iconMask: 'delete',
        handler: function() {
                navigator.app.exitApp();
        } 
});
Ext.reg('quitbutton', Frontiers.views.QuitButton);

Frontiers.views.RadioButton = Ext.extend(Ext.Button,
{
  iconCls: 'radio-icon',
  handler: function(button) {
    Ext.dispatch({controller: 'Main', action: 'popup_radio'});
  }
});
Ext.reg('radiobutton', Frontiers.views.RadioButton);

Frontiers.views.RadioTeaser = Ext.extend(Ext.Component,
{
  tpl: 'Now playing on the radio: <span class="teaser-track">{track_title}</span> <tpl if="author">by <span class="teaser-author">{author}</span></tpl> <tpl if="title"> taken from <span class="teaser-album">{title}</span></tpl>',
  cls: 'radio-toolbar',
  data: {
    track_title: 'loading',
    artist_name: 'loading',
    album_title: 'loading'
  },
  initComponent: function() {
    var cmp = Frontiers.views.RadioTeaser.superclass.initComponent.apply(this, arguments);
    Frontiers.stores.Radio.on('load',
                              function() {
                                this.update(Frontiers.current_album().data);
                              }, this);
    return cmp;
  }
});

Ext.reg('radioteaser', Frontiers.views.RadioTeaser);

Frontiers.views.MainView = Ext.extend(Ext.TabPanel,
{
  tabBar: {
    dock: 'bottom',
    layout: { pack: 'center' },
    cls: 'mainDock' 
  },

  cardSwitchAnimation: { type: 'slide', cover: false },

  layout: { type: 'card' },

  dockedItems: [
    { xtype: 'toolbar', id: 'main-toolbar', dock: 'top', title: 'Home' }
    ],

  initComponent: function() {
    if(!Ext.is.Tablet) {
            this.dockedItems[0].items = [{ xtype: 'radiobutton', text: 'Radio' }];
          if (!window.plugins.audioStream) {
                  this.dockedItems[0].items.push({ xtype: 'spacer'});
                  this.dockedItems[0].items.push({ xtype: 'quitbutton'});
          }
      this.dockedItems.push({ xtype: 'radioteaser', dock: 'bottom', height: '30px' });
    } else {
      this.dockedItems[0].items = { xtype: 'radiobutton', text: 'Hide Radio' };
      this.dockedItems.push({ xtype: 'radiocontainer', dock: 'top' });
    }
    
    var cmp = Frontiers.views.MainView.superclass.initComponent.apply(this, arguments);
    return cmp;
  },

  listeners: {
    beforecardswitch: function(container, newCard, oldCard, index, animated) {
      var toolbar = container.dockedItems.getAt(0);
      var radio_button = new Frontiers.views.RadioButton();
      toolbar.removeAll();
      toolbar.add(radio_button);
      toolbar.add(new Ext.Spacer);

      if (!Ext.is.Tablet) {
        radio_button.setText('Radio');
      } else {
        if (Frontiers.radioPadOn) {
          radio_button.setText('Hide Radio');
        } else {
          radio_button.setText('Show Radio');
        }
      }

      var newTitle = 'Home';
      var button;
      switch(index) {
      case 0:
        newTitle = 'Home';
              if (!window.plugins.audioStream) {
                      toolbar.items.add(new Ext.Spacer());
                      toolbar.items.add(new Frontiers.views.QuitButton());
          }

        break;
      case 2:
        newTitle = 'Catalogue';
        toolbar.items.add(new Frontiers.views.AlbumFilter());
        break;
      case 1:
        button = new Frontiers.views.NewsSwitcher();
        if (!Frontiers.showNews) {
          newTitle = 'Fanzines';
          button.setText('News');
        } else {
          newTitle = 'News';
          button.setText('Fanzines');
        }
        toolbar.items.add(button);
        break;
      case 3:
        newTitle = 'Video';
        break;
      case 4:
        newTitle = 'About us';
        break;
      default:
        console.log(index);
      }
      toolbar.setTitle(newTitle);
      toolbar.doLayout();
      return true;
    }
  },

  items: [
    {
      title: 'Home',
      cls: 'home-card',
      iconCls: 'home',
      xtype: 'homeview'
      },
      {
        title: 'News',
        xtype: 'newsview',
        cls: 'news-card',
        iconCls: 'news-icon'
      },
      {
        title: 'Catalogue',
        xtype: 'catalogview',
        cls: 'catalog-card',
        iconCls: 'catalog-icon'
      },
      {
        title: 'Videos',
        xtype: 'videoview',
        cls: 'video-card',
        iconCls: 'video-icon'
      },
      {
        title: 'About us',
        xtype: 'aboutview',
        cls: 'about-card',
        iconCls: 'about-icon'
      }
    ]
}
);
Ext.reg('mainview', Frontiers.views.MainView);

Frontiers.views.NewsSwitcher = Ext.extend(Ext.Button,
{
  text: 'Fanzines',
  handler: function(button) {
    if (Frontiers.showNews) {
      Ext.getCmp('main-toolbar').setTitle('Fanzines');
      Ext.getCmp('news-list').bindStore(Frontiers.stores.Fanzine);
      button.setText('News');
    } else {
      Ext.getCmp('main-toolbar').setTitle('News');
      Ext.getCmp('news-list').bindStore(Frontiers.stores.News);
      button.setText('Fanzines');
    }
    Frontiers.showNews = !Frontiers.showNews;
  }
});


Frontiers.views.NewsFilter = Ext.extend(Ext.Button,
{
      text: 'Filter',
      handler: function(button) {
        var picker = new Ext.Picker(
          {
            useTitles: true,
            ui: 'dark',
            slots: [
              {
                name: 'category',
                title: 'Category',
                data: [
                  { text: 'All Categories', value: 'all'  },
                  { text: 'Articles', value: '1'  },
                  { text: 'Nuove uscite', value: '4'  },
                  { text: 'Recensioni', value: '3'  }
                ]
              },
              {
                name: 'year',
                title: 'Anno',
                data: [
                  { text: 'Latest', value: 'latest'},
                  { text: '2011', value: '2011'},
                  { text: '2010', value: '2010'},
                  { text: '2009', value: '2009'},
                  { text: '2008', value: '2008'},
                  { text: '2007', value: '2007'},
                  { text: '2006', value: '2006'},
                  { text: '2005', value: '2005'}
                ]
              }
            ]
          });
        picker.on('pick', function(picker, the, slot) { 
                    Frontiers.stores.News.clearFilter();
                    Frontiers.stores.News.filter([ 
                                                    { property: 'category', value: the.category},
                                                    { property: 'year', value: the.year }
                                                  ]);
                  });
        picker.show();
        }
});

Frontiers.views.NewsView = Ext.extend(Ext.List,
{
  plugins: [ {
               ptype: 'listpaging',
               autoPaging: false
             }
           ],
  loadingText: 'loading',
  emptyText: 'no news found',
  store: Frontiers.stores.News,
  id: 'news-list',
  itemSelector: 'div.news',
  itemTpl: [      '<div class="news">',
                  '<div class="album_cover">',
                     '<img src=\"{image_url}\" />',
                  '</div>',
                  '<div class="news_data">',
                  '<div class="title">{title}</div>',
                  '<div class="subtitle">{subtitle}</div>',
                  '<div class="body">{body_text}<br/><br/>',
                  '<span class="created_on">Posted on {created_on}</span></div>',
                  '</div>',
                  '</div>'
           ],
  listeners: {
    itemtap: function(dataview, index, item, event) {
      var record = dataview.getRecord(item);
      var news_id = record.getId();
      if (Frontiers.showNews) {
        Ext.dispatch({controller: 'Main', action:'show_news', id: news_id});        
      } else {
        Ext.dispatch({controller: 'Main', action:'fanzine', id: news_id});        
      }
    }
  }
});

Ext.reg('newsview', Frontiers.views.NewsView);

Frontiers.views.PostView = Ext.extend(Ext.Panel,
{
  layout: 'fit',
  floating: true,
  fullscreen: true,
  modal: true,
  cls: 'post',
  scroll: true,
  dockedItems: {
    xtype: 'toolbar',
    title: 'News',
    items: [
      {
        ui: 'back',
        text: 'Back',
        handler: function(button) {
          button.ownerCt.ownerCt.hide();
        }
      }
    ]
  },
  tpl: [
    "<h1>{title}</h1>",
    "<div class=\"post_view\">{body}</div>" 
  ],
  data: {
    
  }
});

Ext.reg('postview', Frontiers.views.PostView);

/**
 * @class Frontiers.views.Viewport
 * @extends Ext.Panel
 */
Frontiers.views.Viewport = Ext.extend(Ext.Panel,
{
  id        : 'viewport',
  layout    : 'card',
  fullscreen: true,
  ui: 'dark',
  cardSwitchAnimation: 'slide',

  listeners: {
    beforeorientationchange: function(viewport, orientation) {
      console.log('change orientation to ' + orientation);
      viewport.getEl().removeCls('x-landscape');
      viewport.getEl().removeCls('x-portrait');
      viewport.getEl().addCls('x-' + orientation);
    },
    orientationchange: function(viewport, orientation) {
      viewport.getEl().removeCls('x-landscape');
      viewport.getEl().removeCls('x-portrait');
      viewport.getEl().addCls('x-' + orientation);
    }
  }
});



Frontiers.views.AlbumView = Ext.extend(Ext.TabPanel,
{
  layout: 'card',
        id: 'album-view',
  cls: 'album-view',
  floating: true,
  scroll: true,
  modal: true,
  hideOnMaskTap: false,
  fullscreen: true,
  listeners: {
    show: function(dialog) {
      Ext.getCmp('album-info-paypal-button').check();
      Ext.getCmp('album-info-itunes-button').check();
      dialog.dockedItems.getAt(0).items.getAt(3).check();
      dialog.dockedItems.getAt(0).items.getAt(4).check();
    },
    beforehide: function() {
      Frontiers.shown_album = null;
    }
  },
  dockedItems: [
    {
      xtype: 'toolbar',
      items: [
        {
          ui: 'back',
          text: 'Back',
          handler: function(button) {
            var albumInfo = button.ownerCt.ownerCt;
            albumInfo.hide();
            if (albumInfo.fromRadio) {
              Ext.dispatch({controller: 'Main', action:'popup_radio'});
            }
          }
        },
        { xtype: 'spacer' },
        {
          text: 'Web',
          handler: function() {
            window.plugins.childBrowser.showWebPage('http://www.frontiers.it' + Frontiers.shown_album.get('url'));
          }
        },
              { xtype: 'sharealbumbyemailbutton', template: 'email-buy-template', id: 'shareemail2' },
        { xtype: 'sharealbumbutton' }
      ]
    }
  ],
  tabBar: {
    dock: 'bottom',
    layout: { pack: 'center' }
  },
  cardSwitchAnimation: { type: 'slide', cover: false },
  items: [
  {
    title: 'info',
    iconCls: 'info',
    xtype: 'container',
    cls: 'album-info',
    baseCls: 'x-toolbar-dark',
    layout: {type: 'vbox', align: 'center', pack: 'center'},
    items: [
      {
        xtype: 'component',
        id: 'album-info',
        initComponent: function() {
          var ret = Ext.Component.superclass.initComponent.apply(arguments);
          this.tpl = new Ext.XTemplate.from('album_info_template');
          return ret;
        }
      },
      { 
        xtype: 'paypalbutton',
        id: 'album-info-paypal-button'
      },
      { xtype: 'itunesbutton', id: 'album-info-itunes-button' }
    ]
  },
  {
    iconCls: 'user',
    title: 'bio',
    tpl: '{description}',
    scroll: true,
    id: 'album-bio',
    data: {
      description: 'No bio available for this album'
    }
  },
  {
    iconCls: 'bookmarks',
    title: 'images',
    xtype: 'panel',
    id: 'images-panel',
    listeners: {
      activate: function() {
        if (!this.items.getAt(0).getEl()) {
          return;
        }
        var carousel = this.items.getAt(0).getEl().child('img');
        carousel.dom.src = Frontiers.shown_album.get('images')[this.currentImageIndex];
        var num_images = Frontiers.shown_album.get('images').length;
        if (this.currentImageIndex == num_images - 1) {
          Ext.getCmp('next-image').disable();
        } else {
          Ext.getCmp('next-image').enable();
        }

        if (this.currentImageIndex == 0) {
          Ext.getCmp('prev-image').disable();
        } else {
          Ext.getCmp('prev-image').enable();
        }

        this.dockedItems.getAt(0).setTitle((this.currentImageIndex + 1) + ' / ' + num_images);
      }
    },
    dockedItems: {
      dock: 'bottom',
      xtype: 'toolbar',
      title: "1 / 1",
      layout: { type: 'hbox', align: 'center', pack: 'center'},
      items: [
        { 
          ui: 'back',
          text: 'Prev',
          id: 'prev-image',
          handler: function(button) {
            button.ownerCt.ownerCt.currentImageIndex = button.ownerCt.ownerCt.currentImageIndex - 1;
            button.ownerCt.ownerCt.fireEvent('activate');
          }
        },
        {
          xtype: 'spacer'
        },
        { 
          ui: 'forward',
          text: 'Next',
          id: 'next-image',
          handler: function(button) {
            button.ownerCt.ownerCt.currentImageIndex = button.ownerCt.ownerCt.currentImageIndex + 1;
            button.ownerCt.ownerCt.fireEvent('activate');
          }
        }
      ]
    },
    currentImageIndex: 0,
    items: {
      xtype: 'component',
      id: 'album-images',
      tpl: '<img src=\'{src}\'/>',
      data: { src: "" }
    }
  },
  {
    iconCls: 'video-icon',
    xtype: 'videoview',
    store: Frontiers.stores.AlbumVideo,
    loadingText: null,
    emptyText: 'No videos found',
    plugins: null,
    title: 'videos'
  }
  ]
});

Ext.reg('albumview', Frontiers.views.AlbumView);

Frontiers.views.VideoView = Ext.extend(Ext.List,
{
    plugins: [ {
                 ptype: 'listpaging',
                 autoPaging: false
                 
               }
             ],
    loadingText: 'loading',
    emptyText: 'no video found',
    store: Frontiers.stores.Video,
    itemSelector: 'div.news',
    itemTpl: [      '<div class="news">',
                    '<div class="album_cover">',
        '<img src=\"http://i.ytimg.com/vi/{youtube_link}/2.jpg\" />',
      '</div>',

      '<div class="news_data">',
        '<div class="title">{title}</div>',
        '<div class="body2">{body_text}</div>',
        '<div class="created_on small">Posted on {created_on}</div>',
                    '</div>',
                    '</div>'
    ],
    listeners: {
      itemtap: function(dataview, index, item, event) {
        var record = dataview.getRecord(item);
        var video_id = record.getId();
        Ext.dispatch({controller: 'Main', action:'show_video', id: video_id});
      }
    }
});

Ext.reg('videoview', Frontiers.views.VideoView);

Frontiers.stores.Distributor = new Ext.data.JsonStore(
  {
    autoLoad: true,

    proxy: {
      type: 'ajax',
      url: 'http://www.frontiers.it/distributors.json',
      reader: {
        type: 'json',
        root: 'distributors'
      }
    },

    fields: [
      'id',
      'name',
      'logo_url',
      'nation',
      'link'
    ]
  });


Frontiers.views.DistributorView = Ext.extend(Ext.List,
{
    loadingText: 'loading',
    emptyText: 'error loading distributors',
    store: Frontiers.stores.Distributor,
    itemSelector: 'div.album',
    itemTpl: [
      '<div class="album distributor">',
      '<div class="album_cover">',
        '<img src=\"{logo_url}\" />',
      '</div>',
      '<div class="album_data">',
        '<div class="artist_name">{name}</div>',
        '<div class="title">{nation}</div>',
      '</div>',
      '</div>'
    ],
    singleSelect: true,
    listeners: {
      itemtap: function(dataview, index, item, event) {
        var record = dataview.getRecord(item);
        window.plugins.showWebPage(item.get('link'));
      }
    }
});

Ext.reg('distributorview', Frontiers.views.DistributorView);

Frontiers.views.AboutView = Ext.extend(Ext.TabPanel,
{
  tabBar: {
    dock: 'top',
    layout: { pack: 'center' }
  },
  ui: 'dark',
  cls: 'about x-toolbar-dark',
  defaults: {
          layout: { type: 'vbox', align: 'center' },
          xtype: 'panel',
          defaults: {
                  xtype: 'button',
                  height: 40,
                  margin: '10px 0',
                  iconMask: true
          }
  },
  items: [
    {
      cls: 'about-info x-toolbar-dark',
      title: 'Info',
      scroll: 'vertical',
      layout: {
        type: 'vbox',
              align: 'center',
              pack: 'start'
      },
      items: [
        {
          text: 'Website',
          iconCls: 'info',
          handler: function(button) {
            window.plugins.childBrowser.showWebPage('http://www.frontiers.it/home/');
          }
        },
        {
          text: 'Email us',
          iconCls: 'compose',
          handler: function(button) {
            window.plugins.emailComposer.showEmailComposer('Feedback from mobile',
                                                           '',
                                                           'info@frontiers.it',
                                                           null,
                                                           null,
                                                           true);
          }
        },
        {
          text: 'Where we are',
          iconCls: 'locate',
          handler: function(button) {
            window.plugins.childBrowser.showWebPage('http://maps.google.com/?output=mobile&q=Napoli,+via+Gonzaga+18');
          }
        },
        {
          text: 'Call us at +39-081-2399340',
          handler: function() {
            window.plugins.childBrowser.showWebPage('tel://+39-081-2399340');
          }
        }
      ]
    },
    {
            cls: ' x-toolbar-dark',
      title:'Connect',
      scroll: 'vertical',
      items: [
        {
          cls: 'connect',
          text: 'Subscribe to our Newsletter',
          iconCls: 'email2',
          height: 50,
          iconMask: false,
          handler: function(button) {
            Ext.Msg.prompt('Subscribe to our newsletter', '',
                           function(button, response) {
                             if (button == 'ok') 
                               Ext.Ajax.request({
                                                  url: 'http://www.frontiers.it/signup/?email=' + response,
                                                  success: function() {
                                                    navigator.notification.alert('Subscribed');
                                                  },
                                                  failure: function() {
                                                    navigator.notification.alert('Subscription failed');
                                                  }
                                                }
                                               );
                           }, this, false, '', {type: 'email'});
          }
        },
        { xtype: 'spacer' },
        {
          text: 'Social Channel',
          xtype: 'component',
          width: '90%',
          html: '<ul class="follows">' +
	    '<li id="follow-fb"><span><a target="_blank" href="http://www.facebook.com/frontiersrecordsofficial">Facebook</a></span></li>' +
	    '<li id="follow-ms"><span><a target="_blank" href="http://www.myspace.com/frontiersrecords">MySpace</a></span></li>' +
            '</ul><ul class="follows">' +
	    '<li id="follow-tw"><span><a target="_blank" href="http://www.twitter.com/FrontiersRec">Twitter</a></span></li>' +
	    '<li id="follow-yt"><span><a target="_blank" href="http://www.youtube.com/frontiersrecords">YouTube</a></span></li>'+
	    '</ul>'
        },
        { xtype: 'spacer' }
      ]
    },
    {
      title: 'Distribution',
      xtype: 'distributorview',
      cls: 'distributorview'
    }
  ]
});
Ext.reg('aboutview', Frontiers.views.AboutView);
