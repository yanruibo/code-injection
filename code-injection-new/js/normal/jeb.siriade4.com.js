





            //change dynamic css
			var jQT = new $.jQTouch({
                                    slideSelector: '#jqt li a, .slide',
                                    icon: 'jqtouch.png',
                                    addGlossToIcon: false,
                                    startupScreen: 'jqt_startup.png',
                                    statusBar: 'black',
                                    preloadImages: [
                                                    'themes/jqt/img/back_button.png',
                                                    'themes/jqt/img/back_button_clicked.png',
                                                    'themes/jqt/img/button_clicked.png',
                                                    'themes/jqt/img/grayButton.png',
                                                    'themes/jqt/img/whiteButton.png',
                                                    'themes/jqt/img/loading.gif'
                                                    ]
                                    });
            // Some sample Javascript functions:
            $(function(){
              
              // Show a swipe event on swipe test
              $('#swipeme').swipe(function(evt, data) {
                                  $(this).html('You swiped <strong>' + data.direction + '/' + data.deltaX +':' + data.deltaY + '</strong>!');
                                  $(this).parent().after('<li>swiped!</li>')
                                  
                                  });
              $('#tapme').tap(function(){
                              $(this).parent().after('<li>tapped!</li>')
                              });
              // Page animation callback events
              $('#pageevents').
              bind('pageAnimationStart', function(e, info){ 
                   $(this).find('.info').append('Started animating ' + info.direction + '&hellip; ');
                   }).
              bind('pageAnimationEnd', function(e, info){
                   $(this).find('.info').append(' finished animating ' + info.direction + '.<br /><br />');
                   });
              // Page animations end with AJAX callback event, example 1 (load remote HTML only first time)
              $('#callback').bind('pageAnimationEnd', function(e, info){
                                  // Make sure the data hasn't already been loaded (we'll set 'loaded' to true a couple lines further down)
                                  if (!$(this).data('loaded')) {
                                  // Append a placeholder in case the remote HTML takes its sweet time making it back
                                  // Then, overwrite the "Loading" placeholder text with the remote HTML
                                  $(this).append($('<div>Loading</div>').load('ajax.html .info', function() {        
                                                                              // Set the 'loaded' var to true so we know not to reload
                                                                              // the HTML next time the #callback div animation ends
                                                                              $(this).parent().data('loaded', true);  
                                                                              }));
                                  }
                                  });
              // Orientation callback event
              $('#jqt').bind('turn', function(e, data){
                             $('#orient').html('Orientation: ' + data.orientation);
                             });
              $('#play_movie').bind('tap', function(){
                                    $('#movie').get(0).play();
                                    $(this).removeClass('active');
                                    });
              
              $('#video').bind('pageAnimationStart', function(e, info){
                               $('#movie').css('display', 'none');
                               }).bind('pageAnimationEnd', function(e, info){
                                       if (info.direction == 'in')
                                       {
                                       $('#movie').css('display', 'block');
                                       }
                                       });
              
              jQT.generateGallery("col",[
                                         {src:"img/gyneco/col/Slide01.jpg"},
                                         {src:"img/gyneco/col/Slide02.jpg"},
                                         {src:"img/gyneco/col/Slide03.jpg"},
                                         {src:"img/gyneco/col/Slide04.jpg"},
                                         {src:"img/gyneco/col/Slide05.jpg"},
                                         {src:"img/gyneco/col/Slide06.jpg"},
                                         {src:"img/gyneco/col/Slide07.jpg"},
                                         {src:"img/gyneco/col/Slide08.jpg"},
                                         {src:"img/gyneco/col/Slide09.jpg"},
                                         {src:"img/gyneco/col/Slide10.jpg"},
                                         {src:"img/gyneco/col/Slide11.jpg"},
                                         {src:"img/gyneco/col/Slide12.jpg"},
                                         {src:"img/gyneco/col/Slide13.jpg"},
                                         {src:"img/gyneco/col/Slide14.jpg"},
                                         {src:"img/gyneco/col/Slide15.jpg"},
                                         {src:"img/gyneco/col/Slide16.jpg"},
                                         {src:"img/gyneco/col/Slide17.jpg"},
                                         {src:"img/gyneco/col/Slide18.jpg"},
                                         {src:"img/gyneco/col/Slide19.jpg"},
                                         {src:"img/gyneco/col/Slide20.jpg"},
                                         {src:"img/gyneco/col/Slide21.jpg"},
                                         {src:"img/gyneco/col/Slide22.jpg"},
                                         {src:"img/gyneco/col/Slide23.jpg"},
                                         {src:"img/gyneco/col/Slide24.jpg"},
                                         {src:"img/gyneco/col/Slide25.jpg"},
                                         {src:"img/gyneco/col/Slide26.jpg"},
                                         {src:"img/gyneco/col/Slide27.jpg"},
                                         {src:"img/gyneco/col/Slide28.jpg"},
                                         {src:"img/gyneco/col/Slide29.jpg"},
                                         {src:"img/gyneco/col/Slide30.jpg"},
                                         {src:"img/gyneco/col/Slide31.jpg"},
                                         {src:"img/gyneco/col/Slide32.jpg"},
                                         {src:"img/gyneco/col/Slide33.jpg"}
                                         ]);
              
              jQT.generateGallery("colcc",[
                                           {src:"img/gyneco/colcc/Slide01.jpg"},
                                           {src:"img/gyneco/colcc/Slide02.jpg"},
                                           {src:"img/gyneco/colcc/Slide03.jpg"},
                                           {src:"img/gyneco/colcc/Slide04.jpg"},
                                           {src:"img/gyneco/colcc/Slide05.jpg"},
                                           {src:"img/gyneco/colcc/Slide06.jpg"},
                                           {src:"img/gyneco/colcc/Slide07.jpg"},
                                           {src:"img/gyneco/colcc/Slide08.jpg"},
                                           {src:"img/gyneco/colcc/Slide09.jpg"},
                                           {src:"img/gyneco/colcc/Slide10.jpg"},
                                           {src:"img/gyneco/colcc/Slide11.jpg"},
                                           {src:"img/gyneco/colcc/Slide12.jpg"},
                                           {src:"img/gyneco/colcc/Slide13.jpg"},
                                           {src:"img/gyneco/colcc/Slide14.jpg"},
                                           {src:"img/gyneco/colcc/Slide15.jpg"},
                                           {src:"img/gyneco/colcc/Slide16.jpg"},
                                           {src:"img/gyneco/colcc/Slide17.jpg"},
                                           {src:"img/gyneco/colcc/Slide18.jpg"},
                                           {src:"img/gyneco/colcc/Slide19.jpg"},
                                           {src:"img/gyneco/colcc/Slide20.jpg"}
                                           ]);
              
              jQT.generateGallery("endometre",[
                                               {src:"img/gyneco/endometre/Slide01.jpg"},
                                               {src:"img/gyneco/endometre/Slide02.jpg"},
                                               {src:"img/gyneco/endometre/Slide03.jpg"},
                                               {src:"img/gyneco/endometre/Slide04.jpg"},
                                               {src:"img/gyneco/endometre/Slide05.jpg"},
                                               {src:"img/gyneco/endometre/Slide06.jpg"},
                                               {src:"img/gyneco/endometre/Slide07.jpg"},
                                               {src:"img/gyneco/endometre/Slide08.jpg"},
                                               {src:"img/gyneco/endometre/Slide09.jpg"},
                                               {src:"img/gyneco/endometre/Slide10.jpg"},
                                               {src:"img/gyneco/endometre/Slide11.jpg"},
                                               {src:"img/gyneco/endometre/Slide12.jpg"},
                                               {src:"img/gyneco/endometre/Slide13.jpg"},
                                               {src:"img/gyneco/endometre/Slide14.jpg"},
                                               {src:"img/gyneco/endometre/Slide15.jpg"},
                                               {src:"img/gyneco/endometre/Slide16.jpg"},
                                               {src:"img/gyneco/endometre/Slide17.jpg"}
                                               ]);
              
              jQT.generateGallery("endometrecc",[
                                                 {src:"img/gyneco/endometrecc/Slide01.jpg"},
                                                 {src:"img/gyneco/endometrecc/Slide02.jpg"},
                                                 {src:"img/gyneco/endometrecc/Slide03.jpg"},
                                                 {src:"img/gyneco/endometrecc/Slide04.jpg"},
                                                 {src:"img/gyneco/endometrecc/Slide05.jpg"},
                                                 {src:"img/gyneco/endometrecc/Slide06.jpg"},
                                                 {src:"img/gyneco/endometrecc/Slide07.jpg"},
                                                 {src:"img/gyneco/endometrecc/Slide08.jpg"},
                                                 {src:"img/gyneco/endometrecc/Slide09.jpg"},
                                                 {src:"img/gyneco/endometrecc/Slide10.jpg"},
                                                 {src:"img/gyneco/endometrecc/Slide11.jpg"},
                                                 {src:"img/gyneco/endometrecc/Slide12.jpg"},
                                                 {src:"img/gyneco/endometrecc/Slide13.jpg"},
                                                 {src:"img/gyneco/endometrecc/Slide14.jpg"},
                                                 {src:"img/gyneco/endometrecc/Slide15.jpg"},
                                                 {src:"img/gyneco/endometrecc/Slide16.jpg"},
                                                 {src:"img/gyneco/endometrecc/Slide17.jpg"},
                                                 {src:"img/gyneco/endometrecc/Slide18.jpg"},
                                                 {src:"img/gyneco/endometrecc/Slide19.jpg"},
                                                 {src:"img/gyneco/endometrecc/Slide20.jpg"},
                                                 {src:"img/gyneco/endometrecc/Slide21.jpg"},
                                                 {src:"img/gyneco/endometrecc/Slide22.jpg"},
                                                 {src:"img/gyneco/endometrecc/Slide23.jpg"}
                                                 ]);
              
              jQT.generateGallery("sein1",[
                                           {src:"img/senologie/sein1/Slide01.jpg"},
                                           {src:"img/senologie/sein1/Slide02.jpg"},
                                           {src:"img/senologie/sein1/Slide03.jpg"},
                                           {src:"img/senologie/sein1/Slide04.jpg"},
                                           {src:"img/senologie/sein1/Slide05.jpg"},
                                           {src:"img/senologie/sein1/Slide06.jpg"},
                                           {src:"img/senologie/sein1/Slide07.jpg"},
                                           {src:"img/senologie/sein1/Slide08.jpg"},
                                           {src:"img/senologie/sein1/Slide09.jpg"},
                                           {src:"img/senologie/sein1/Slide10.jpg"},
                                           {src:"img/senologie/sein1/Slide11.jpg"},
                                           {src:"img/senologie/sein1/Slide12.jpg"},
                                           {src:"img/senologie/sein1/Slide13.jpg"},
                                           {src:"img/senologie/sein1/Slide14.jpg"},
                                           {src:"img/senologie/sein1/Slide15.jpg"},
                                           {src:"img/senologie/sein1/Slide16.jpg"},
                                           {src:"img/senologie/sein1/Slide17.jpg"},
                                           {src:"img/senologie/sein1/Slide18.jpg"},
                                           {src:"img/senologie/sein1/Slide19.jpg"},
                                           {src:"img/senologie/sein1/Slide20.jpg"},
                                           {src:"img/senologie/sein1/Slide21.jpg"},
                                           {src:"img/senologie/sein1/Slide22.jpg"},
                                           {src:"img/senologie/sein1/Slide23.jpg"},
                                           {src:"img/senologie/sein1/Slide24.jpg"},
                                           {src:"img/senologie/sein1/Slide25.jpg"},
                                           {src:"img/senologie/sein1/Slide26.jpg"},
                                           {src:"img/senologie/sein1/Slide27.jpg"},
                                           {src:"img/senologie/sein1/Slide28.jpg"},
                                           {src:"img/senologie/sein1/Slide29.jpg"},
                                           {src:"img/senologie/sein1/Slide30.jpg"},
                                           {src:"img/senologie/sein1/Slide31.jpg"},
                                           {src:"img/senologie/sein1/Slide32.jpg"}
                                           ]);
              
              jQT.generateGallery("seincc1",[
                                             {src:"img/senologie/seincc1/Slide01.jpg"},
                                             {src:"img/senologie/seincc1/Slide02.jpg"},
                                             {src:"img/senologie/seincc1/Slide03.jpg"},
                                             {src:"img/senologie/seincc1/Slide04.jpg"},
                                             {src:"img/senologie/seincc1/Slide05.jpg"},
                                             {src:"img/senologie/seincc1/Slide06.jpg"},
                                             {src:"img/senologie/seincc1/Slide07.jpg"},
                                             {src:"img/senologie/seincc1/Slide08.jpg"},
                                             {src:"img/senologie/seincc1/Slide09.jpg"},
                                             {src:"img/senologie/seincc1/Slide10.jpg"},
                                             {src:"img/senologie/seincc1/Slide11.jpg"},
                                             {src:"img/senologie/seincc1/Slide12.jpg"},
                                             {src:"img/senologie/seincc1/Slide13.jpg"},
                                             {src:"img/senologie/seincc1/Slide14.jpg"},
                                             {src:"img/senologie/seincc1/Slide15.jpg"},
                                             {src:"img/senologie/seincc1/Slide16.jpg"},
                                             {src:"img/senologie/seincc1/Slide17.jpg"},
                                             {src:"img/senologie/seincc1/Slide18.jpg"},
                                             {src:"img/senologie/seincc1/Slide19.jpg"},
                                             {src:"img/senologie/seincc1/Slide20.jpg"},
                                             {src:"img/senologie/seincc1/Slide21.jpg"},
                                             {src:"img/senologie/seincc1/Slide22.jpg"},
                                             {src:"img/senologie/seincc1/Slide23.jpg"},
                                             {src:"img/senologie/seincc1/Slide24.jpg"},
                                             {src:"img/senologie/seincc1/Slide25.jpg"},
                                             {src:"img/senologie/seincc1/Slide26.jpg"},
                                             {src:"img/senologie/seincc1/Slide27.jpg"},
                                             {src:"img/senologie/seincc1/Slide28.jpg"},
                                             {src:"img/senologie/seincc1/Slide29.jpg"},
                                             {src:"img/senologie/seincc1/Slide30.jpg"},
                                             {src:"img/senologie/seincc1/Slide31.jpg"},
                                             {src:"img/senologie/seincc1/Slide32.jpg"}
                                             ]);
              
              jQT.generateGallery("sein2",[
                                           {src:"img/senologie/sein2/Slide01.jpg"},
                                           {src:"img/senologie/sein2/Slide02.jpg"},
                                           {src:"img/senologie/sein2/Slide03.jpg"},
                                           {src:"img/senologie/sein2/Slide04.jpg"},
                                           {src:"img/senologie/sein2/Slide05.jpg"},
                                           {src:"img/senologie/sein2/Slide06.jpg"},
                                           {src:"img/senologie/sein2/Slide07.jpg"},
                                           {src:"img/senologie/sein2/Slide08.jpg"},
                                           {src:"img/senologie/sein2/Slide09.jpg"},
                                           {src:"img/senologie/sein2/Slide10.jpg"},
                                           {src:"img/senologie/sein2/Slide11.jpg"},
                                           {src:"img/senologie/sein2/Slide12.jpg"},
                                           {src:"img/senologie/sein2/Slide13.jpg"},
                                           {src:"img/senologie/sein2/Slide14.jpg"},
                                           {src:"img/senologie/sein2/Slide15.jpg"},
                                           {src:"img/senologie/sein2/Slide16.jpg"},
                                           {src:"img/senologie/sein2/Slide17.jpg"},
                                           {src:"img/senologie/sein2/Slide18.jpg"},
                                           {src:"img/senologie/sein2/Slide19.jpg"},
                                           {src:"img/senologie/sein2/Slide20.jpg"},
                                           {src:"img/senologie/sein2/Slide21.jpg"},
                                           {src:"img/senologie/sein2/Slide22.jpg"},
                                           {src:"img/senologie/sein2/Slide23.jpg"},
                                           {src:"img/senologie/sein2/Slide24.jpg"},
                                           {src:"img/senologie/sein2/Slide25.jpg"},
                                           {src:"img/senologie/sein2/Slide26.jpg"},
                                           {src:"img/senologie/sein2/Slide27.jpg"},
                                           {src:"img/senologie/sein2/Slide28.jpg"},
                                           {src:"img/senologie/sein2/Slide29.jpg"},
                                           {src:"img/senologie/sein2/Slide30.jpg"},
                                           {src:"img/senologie/sein2/Slide31.jpg"},
                                           {src:"img/senologie/sein2/Slide32.jpg"},
                                           {src:"img/senologie/sein2/Slide33.jpg"},
                                           {src:"img/senologie/sein2/Slide34.jpg"},
                                           {src:"img/senologie/sein2/Slide35.jpg"}
                                           ]);
              
              jQT.generateGallery("seincc2",[
                                             {src:"img/senologie/seincc2/Slide01.jpg"},
                                             {src:"img/senologie/seincc2/Slide02.jpg"},
                                             {src:"img/senologie/seincc2/Slide03.jpg"},
                                             {src:"img/senologie/seincc2/Slide04.jpg"},
                                             {src:"img/senologie/seincc2/Slide05.jpg"},
                                             {src:"img/senologie/seincc2/Slide06.jpg"},
                                             {src:"img/senologie/seincc2/Slide07.jpg"},
                                             {src:"img/senologie/seincc2/Slide08.jpg"},
                                             {src:"img/senologie/seincc2/Slide09.jpg"},
                                             {src:"img/senologie/seincc2/Slide10.jpg"},
                                             {src:"img/senologie/seincc2/Slide11.jpg"},
                                             {src:"img/senologie/seincc2/Slide12.jpg"},
                                             {src:"img/senologie/seincc2/Slide13.jpg"},
                                             {src:"img/senologie/seincc2/Slide14.jpg"},
                                             {src:"img/senologie/seincc2/Slide15.jpg"},
                                             {src:"img/senologie/seincc2/Slide16.jpg"},
                                             {src:"img/senologie/seincc2/Slide17.jpg"},
                                             {src:"img/senologie/seincc2/Slide18.jpg"},
                                             {src:"img/senologie/seincc2/Slide19.jpg"},
                                             {src:"img/senologie/seincc2/Slide20.jpg"},
                                             {src:"img/senologie/seincc2/Slide21.jpg"},
                                             {src:"img/senologie/seincc2/Slide22.jpg"},
                                             {src:"img/senologie/seincc2/Slide23.jpg"},
                                             {src:"img/senologie/seincc2/Slide24.jpg"},
                                             {src:"img/senologie/seincc2/Slide25.jpg"},
                                             {src:"img/senologie/seincc2/Slide26.jpg"},
                                             {src:"img/senologie/seincc2/Slide27.jpg"},
                                             {src:"img/senologie/seincc2/Slide28.jpg"},
                                             {src:"img/senologie/seincc2/Slide29.jpg"},
                                             {src:"img/senologie/seincc2/Slide30.jpg"},
                                             {src:"img/senologie/seincc2/Slide31.jpg"},
                                             {src:"img/senologie/seincc2/Slide32.jpg"},
                                             {src:"img/senologie/seincc2/Slide33.jpg"},
                                             {src:"img/senologie/seincc2/Slide34.jpg"},
                                             {src:"img/senologie/seincc2/Slide35.jpg"},
                                             {src:"img/senologie/seincc2/Slide36.jpg"}
                                             ]);
              
              jQT.generateGallery("sein3",[
                                           {src:"img/senologie/sein3/Slide01.jpg"},
                                           {src:"img/senologie/sein3/Slide02.jpg"},
                                           {src:"img/senologie/sein3/Slide03.jpg"},
                                           {src:"img/senologie/sein3/Slide04.jpg"},
                                           {src:"img/senologie/sein3/Slide05.jpg"},
                                           {src:"img/senologie/sein3/Slide06.jpg"},
                                           {src:"img/senologie/sein3/Slide07.jpg"},
                                           {src:"img/senologie/sein3/Slide08.jpg"},
                                           {src:"img/senologie/sein3/Slide09.jpg"},
                                           {src:"img/senologie/sein3/Slide10.jpg"},
                                           {src:"img/senologie/sein3/Slide11.jpg"},
                                           {src:"img/senologie/sein3/Slide12.jpg"},
                                           {src:"img/senologie/sein3/Slide13.jpg"},
                                           {src:"img/senologie/sein3/Slide14.jpg"},
                                           {src:"img/senologie/sein3/Slide15.jpg"},
                                           {src:"img/senologie/sein3/Slide16.jpg"},
                                           {src:"img/senologie/sein3/Slide17.jpg"},
                                           {src:"img/senologie/sein3/Slide18.jpg"},
                                           {src:"img/senologie/sein3/Slide19.jpg"},
                                           {src:"img/senologie/sein3/Slide20.jpg"},
                                           {src:"img/senologie/sein3/Slide21.jpg"},
                                           {src:"img/senologie/sein3/Slide22.jpg"},
                                           {src:"img/senologie/sein3/Slide23.jpg"},
                                           {src:"img/senologie/sein3/Slide24.jpg"},
                                           {src:"img/senologie/sein3/Slide25.jpg"},
                                           {src:"img/senologie/sein3/Slide26.jpg"},
                                           {src:"img/senologie/sein3/Slide27.jpg"},
                                           {src:"img/senologie/sein3/Slide28.jpg"},
                                           {src:"img/senologie/sein3/Slide29.jpg"},
                                           {src:"img/senologie/sein3/Slide30.jpg"},
                                           {src:"img/senologie/sein3/Slide31.jpg"},
                                           {src:"img/senologie/sein3/Slide32.jpg"},
                                           {src:"img/senologie/sein3/Slide33.jpg"}
                                           ]);
              
              jQT.generateGallery("seincc3",[
                                             {src:"img/senologie/seincc3/Slide01.jpg"},
                                             {src:"img/senologie/seincc3/Slide02.jpg"},
                                             {src:"img/senologie/seincc3/Slide03.jpg"},
                                             {src:"img/senologie/seincc3/Slide04.jpg"},
                                             {src:"img/senologie/seincc3/Slide05.jpg"},
                                             {src:"img/senologie/seincc3/Slide06.jpg"},
                                             {src:"img/senologie/seincc3/Slide07.jpg"},
                                             {src:"img/senologie/seincc3/Slide08.jpg"},
                                             {src:"img/senologie/seincc3/Slide09.jpg"},
                                             {src:"img/senologie/seincc3/Slide10.jpg"},
                                             {src:"img/senologie/seincc3/Slide11.jpg"},
                                             {src:"img/senologie/seincc3/Slide12.jpg"},
                                             {src:"img/senologie/seincc3/Slide13.jpg"},
                                             {src:"img/senologie/seincc3/Slide14.jpg"},
                                             {src:"img/senologie/seincc3/Slide15.jpg"},
                                             {src:"img/senologie/seincc3/Slide16.jpg"},
                                             {src:"img/senologie/seincc3/Slide17.jpg"},
                                             {src:"img/senologie/seincc3/Slide18.jpg"},
                                             {src:"img/senologie/seincc3/Slide19.jpg"},
                                             {src:"img/senologie/seincc3/Slide20.jpg"},
                                             {src:"img/senologie/seincc3/Slide21.jpg"},
                                             {src:"img/senologie/seincc3/Slide22.jpg"},
                                             {src:"img/senologie/seincc3/Slide23.jpg"},
                                             {src:"img/senologie/seincc3/Slide24.jpg"},
                                             {src:"img/senologie/seincc3/Slide25.jpg"},
                                             {src:"img/senologie/seincc3/Slide26.jpg"},
                                             {src:"img/senologie/seincc3/Slide27.jpg"},
                                             {src:"img/senologie/seincc3/Slide28.jpg"},
                                             {src:"img/senologie/seincc3/Slide29.jpg"},
                                             {src:"img/senologie/seincc3/Slide30.jpg"},
                                             {src:"img/senologie/seincc3/Slide31.jpg"},
                                             {src:"img/senologie/seincc3/Slide32.jpg"},
                                             {src:"img/senologie/seincc3/Slide33.jpg"},
                                             {src:"img/senologie/seincc3/Slide34.jpg"},
                                             {src:"img/senologie/seincc3/Slide35.jpg"}
                                             ]);
              
              
              jQT.generateGallery("oar",[
                                         {src:"img/oar/Slide1.jpg"},
                                         {src:"img/oar/Slide2.jpg"},
                                         {src:"img/oar/Slide3.jpg"},
                                         {src:"img/oar/Slide4.jpg"},
                                         {src:"img/oar/Slide5.jpg"},
                                         {src:"img/oar/Slide6.jpg"},
                                         {src:"img/oar/Slide7.jpg"}
                                         ]);
              
              jQT.generateGallery("orga",[
                                          {src:"img/orga/Slide1.jpg"},
                                          {src:"img/orga/Slide2.jpg"}
                                          ]);
              
              jQT.generateGallery("mentions",[
                                              {src:"img/mentions/Slide1.jpg"},
                                              {src:"img/mentions/Slide2.jpg"},
                                              {src:"img/mentions/Slide3.jpg"},
                                              {src:"img/mentions/Slide4.jpg"},
                                              {src:"img/mentions/Slide5.jpg"}
                                              ]);
              
              });
            
