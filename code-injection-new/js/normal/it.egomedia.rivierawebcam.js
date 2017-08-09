




   
    




        app.initialize();
    






    
    




        app.initialize();
    


loadLocations(
	[{"name":"alassio","label":"Alassio","inquadrature":[{"name":"capomele","label":"Capo Mele"},{"name":"torrione","label":"Torrione"},{"name":"cappelletta","label":"Cappelletta"},{"name":"levante","label":"Levante"},{"name":"ponente","label":"Ponente"},{"name":"spiaggia","label":"Spiaggia"}]},{"name":"albenga","label":"Albenga","inquadrature":[{"name":"centro","label":"Centro"},{"name":"torri","label":"Torri"},{"name":"piana","label":"Piana"},{"name":"panorama","label":"Panorama"}]},{"name":"albissola","label":"Albissola","inquadrature":[{"name":"panorama","label":"Panorama"},{"name":"albisolacapo","label":"Albisola Capo"}]},{"name":"andora","label":"Andora","inquadrature":[{"name":"panorama","label":"Panorama"},{"name":"spiaggia","label":"Spiaggia"},{"name":"molo","label":"Molo"}]},{"name":"borghettosantospirito","label":"Borghetto Santo Spirito","inquadrature":[{"name":"casello","label":"Casello Autostrada"},{"name":"approdoturistico","label":"Approdo turistico"},{"name":"autostrada","label":"Autostrada verso Albenga"}]},{"name":"borgio","label":"Borgio Verezzi","inquadrature":[{"name":"panorama","label":"Panorama"},{"name":"spiaggia","label":"Spiaggia"},{"name":"verezzi","label":"Verezzi"}]},{"name":"calizzano","label":"Calizzano","inquadrature":[{"name":"panorama","label":"Panorama"},{"name":"castello","label":"Castello"},{"name":"chiesa","label":"Chiesa"}]},{"name":"celleligure","label":"Celle Ligure","inquadrature":[{"name":"molo","label":"Molo"}]},{"name":"ceriale","label":"Ceriale","inquadrature":[{"name":"molo","label":"Molo"},{"name":"passeggiata","label":"Passeggiata"},{"name":"spiaggiagallinara","label":"Spiaggia - isola Gallinara"}]},{"name":"finaleligure","label":"Finale Ligure","inquadrature":[{"name":"caprazoppa","label":"Caprazoppa"},{"name":"castelfranco","label":"Castelfranco"},{"name":"monte","label":"Monte"},{"name":"passeggiata","label":"Passeggiata Ponente"},{"name":"spiaggia","label":"Spiaggia"}]},{"name":"garlenda","label":"Garlenda","inquadrature":[{"name":"castello","label":"Castello"},{"name":"chiesa","label":"Chiesa"},{"name":"panorama","label":"Panorama"}]},{"name":"loano","label":"Loano","inquadrature":[{"name":"battigia","label":"Battigia"},{"name":"isolagallinara","label":"Isola Gallinara"},{"name":"molo","label":"Molo"},{"name":"giardini","label":"Giardini"},{"name":"spiaggialevante","label":"Spiaggia verso Levante"},{"name":"spiaggiaponente","label":"Spiaggia verso Ponente"},{"name":"varigotti","label":"Varigotti"}]},{"name":"millesimo","label":"Millesimo","inquadrature":[{"name":"panorama","label":"Panorama"},{"name":"castello","label":"Castello"}]},{"name":"pietraligure","label":"Pietra Ligure","inquadrature":[{"name":"caprazoppa","label":"Caprazoppa"},{"name":"molo","label":"Molo"},{"name":"passeggiata","label":"Passeggiata"},{"name":"spiaggia","label":"Spiaggia"}]}]
	)

/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
 
 /*
  * Fix scroll for older version
  * http://jsfiddle.net/rH8K8/
  */
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
        document.addEventListener('online', this.onDeviceOnLine, false);
        document.addEventListener('offline', this.onDeviceOffLine, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicity call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        console.log('onDeviceReady: showAds');
        showAds();
        console.log(navigator.notification);
        app.receivedEvent('deviceready');
    },
    onDeviceOnLine: function() {
        console.log('>>>>>>>>> ONLINE');
    },
    onDeviceOffLine: function() {
        console.log('>>>>>>>>> OFFLINE');
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        if (parentElement) {
                
            var listeningElement = parentElement.querySelector('.listening');
            var receivedElement = parentElement.querySelector('.received');

            listeningElement.setAttribute('style', 'display:none;');
            receivedElement.setAttribute('style', 'display:block;');

            console.log('Received Event: ' + id);
        }
    }
};

var locations = null;

var mySwiper = null;

function checkOnline() {

}

function loadMenu(data) {
  var menuTemplate = Handlebars.compile($('#menu-template').html());
  $('#main-content').html(menuTemplate(data));
  $('.location-btn').click(function() {
    var id = $(this).data('location');
    loadLocation(id);
  });
  $('#btn-credits').click(function() {
      $(this).hide(0);
      showCredits();
  })
  checkOnline();
  shareButtonEnabled(false);
}

function loadLocation(id) {
  for (var i = 0; i < locations.length; i++) {
    if (locations[i].name == id) {
      var locationTemplate = Handlebars.compile($('#location-template-swiper').html());
      $('#main-content').html(locationTemplate(locations[i]));
      mySwiper = new Swiper('.swiper-container',{
        pagination: '.pagination',
        paginationClickable: true
      })
      $('.menu-btn').click(function() {
        loadMenu(locations);
      });
      checkOnline();
      shareButtonEnabled(true);
      document
        .querySelector('#mySlider')
        .addEventListener('slide', function(param) {
          $('#mySlider').data('slide', param.detail.slideNumber);
        })
      break;
    }
  }
  location.hash=id;
}

function loadLocations(data) {
  locations = data;
  loadMenu(locations);
}

function pushImages(location) {
  for (var i = 0; i < location.inquadrature.length; i++) {
    var url = 'http://webcam.provincia.savona.it/ws/immagini.php?comune=' + location.name + '&posizione=' + location.inquadrature[i].name;
    $.getJSON(url, function(data){
      console.log(data);
    })
  }
}

function shareButtonEnabled(status) {
  if (window.plugins && window.plugins.socialsharing) {
    if (status) {
      $('#btn-share').css({'display': 'inline'});
      $('#btn-credits').css({'display': 'none'});
    } else {
      $('#btn-share').css({'display': 'none'});
      $('#btn-credits').css({'display': 'inline'});
    }
  }
}

function shareWebcam() {
  console.log('Share clicked');
  if (window.plugins && window.plugins.socialsharing) {
    console.log('Open dialog');
    navigator.notification.prompt('Scrivi un messaggio', function(props) {
      console.log(JSON.stringify(props));
      var activeSlide = mySwiper.activeSlide();
      if (activeSlide) {
        var canvas = $(activeSlide).next().find('canvas');
        console.log('find ' + canvas.length + ' canvas');
        canvas = canvas[0];
        console.log('canvas [' + canvas.id + '] (' + canvas.width + ', ' + canvas.height + ')');
        var ctx = canvas.getContext('2d');
        var message = props.input1;
        var title = $('h1.title').text() + ', ' + $(activeSlide).find('.swiper-title').text();
        ctx.fillStyle = '#666';
        ctx.font = '40px RivieraWebcam';
        if (!message || message.trim().length == 0) {
          message = title;
        }
        if (message) {
          message = message.toUpperCase();
          if (message.length > 30) {
            message = message.substr(0, 30);
          } 
          var metrics = ctx.measureText(message);
          var textWidth = metrics.width;
          console.log(message + ': ' + textWidth);
          if (textWidth > 600) {
            console.log('Too long');
            ctx.textAlign = 'left';
            ctx.fillText(message, 20, 560);      
          } else {
            ctx.textAlign = 'center';
            ctx.fillText(message, 320, 560);      
          }
        }
        setTimeout(function() {
          var imageData = canvas.toDataURL('image/jpeg');
          if (imageData) {
            window.plugins.socialsharing.share(title + ' by @RivieraWebcam',
                                               null,
                                               imageData,
                                               null,
                                               function() {
              console.log('>>>>>>> share ok');
              shareButtonEnabled(true);
            }, function(errormsg) {
              console.log('>>>>>>> share fails');
              shareButtonEnabled(true);
            });
          } else {
            console.log('>>>>>>> no image data')
            shareButtonEnabled(true);
          }
        }, 2000);
      }
    })
  }
}

function shareWebcamWithDownload() {
  if (window.plugins && window.plugins.socialsharing) {
    var activeSlide = mySwiper.activeSlide();
    if (activeSlide) {
      var slideImg = $(activeSlide).find('img').attr('src');
      if (slideImg) {
        var url = slideImg + '&url=1';
        var imageData = $(activeSlide).find('img').data('image');
        console.log('>>>>>>>>> SLIDE URL: ' + url);
        $.ajax({
          type: "GET",
          async: true,
          url: url,
          success: function(message,text,response) {
            window.plugins.socialsharing.share('Hello from @RivieraWebcam',
                                               null,
                                               response.text,
                                               null,
                                               function() {
                console.log('>>>>>>> share ok');
              }, function(errormsg) {
                console.log('>>>>>>> share fails');
              });
          }
        });
      }
    }
  }
}

function showAds() {

  var admob_ios_key = 'a151e6d43c5a28f';
  var admob_android_key = 'a152b47e35e9149';
  var adId = (navigator.userAgent.indexOf('Android') >=0) ? admob_android_key : admob_ios_key;
  if (AdMob) {
    var am = AdMob;
    am.createBanner({
      adId: adId, 
      position: AdMob.AD_POSITION.TOP_CENTER, 
      autoShow: true
    });
  } else if (window.plugins && window.plugins.AdMob) {
    var am = window.plugins.AdMob;
    am.createBanner({
      'publisherId': adId,
      'adSize': am.AD_SIZE.BANNER,
      'bannerAtTop': true
      }, function() {
        am.requestAd(
          { 'isTesting':false }, 
          function(){
              am.showAd( true );
          }, 
          function(){ console.log('failed to request ad'); }
        );
      }, 
      function() {
        console.log('failed to create banner view');
      }
    );
  } else {
    console.log('AdMob plugin not available/ready.');
  }
}

function imgLoaded(img, slideImg) {
  console.log("Loaded : " + img.src + "(" + img.width + "," + img.height + ")");
  /*
  var canvas = document.createElement('CANVAS');
  */
  var canvas = $(img).next();
  if (canvas && canvas.length > 0) {
    canvas = canvas[0];
  } else {
    canvas = document.createElement('CANVAS');
  }
  var ctx = canvas.getContext('2d');
  img.crossOrigin = 'Anonymous'; 
  canvas.height = 640; //img.height;
  canvas.width = 640; //img.width;
  // Footer
  ctx.fillStyle = 'white';
  ctx.fillRect(0, 0, 640, 640);
  // Riviera webcam logo
  var rwlogo = new Image();
  rwlogo.src = logo_rw; //'./img/logo-horiz-mini.png';
  ctx.drawImage(rwlogo, 20, 5);
  // Egomedia logo
  var egomedialogo = new Image();
  egomedialogo.src = logo_egomedia; //'./img/egomedia-mini.png';
  ctx.drawImage(egomedialogo, 520, 5);
  // Webcam
  ctx.drawImage(img, 20, 30, 600, 450);
  if (slideImg) {
    console.log('>>>>>>>>>>>>>>>> READY TO SHARE');
  }
  canvas = null;
}

function showCredits() {
  var creditsTemplate = Handlebars.compile($('#credits-template').html());
  $('#main-content').html(creditsTemplate());
  $('.menu-btn').click(function() {
    loadMenu(locations);
  });
}

$(function($) {

/*
  $.getJSON("data/alassio.json", function(data) {         
    loadLocation(data);
  });
*/
  $('#btn-share').click(function() {
      $(this).hide(0);
      shareWebcam();
  })
});

var logo_egomedia = 'data:image/png;base64,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';

var logo_rw = 'data:image/png;base64,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';
