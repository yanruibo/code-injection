



            var jQT = new $.jQTouch({
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
                                  $(this).html('You swiped <strong>' + data.direction + '</strong>!');
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
                                  if (!$(this).data('loaded')) {                      // Make sure the data hasn't already been loaded (we'll set 'loaded' to true a couple lines further down)
                                  $(this).append($('<div>Loading</div>').         // Append a placeholder in case the remote HTML takes its sweet time making it back
                                                 load('ajax.html .info', function() {        // Overwrite the "Loading" placeholder text with the remote HTML
                                                      $(this).parent().data('loaded', true);  // Set the 'loaded' var to true so we know not to re-load the HTML next time the #callback div animation ends
                                                      }));
                                  }
                                  });
              // Orientation callback event
              $('body').bind('turn', function(e, data){
                             $('#orient').html('Orientation: ' + data.orientation);
                             });
              });
            


            
            
            // If you want to prevent dragging, uncomment this section
            /*
             function preventBehavior(e) 
             { 
             e.preventDefault(); 
             };
             document.addEventListener("touchmove", preventBehavior, false);
             */
            
            /* If you are supporting your own protocol, the var invokeString will contain any arguments to the app launch.
             see http://iphonedevelopertips.com/cocoa/launching-your-own-application-via-a-custom-url-scheme.html
             for more details -jm */
            /*
             function handleOpenURL(url)
             {
             // TODO: do something with the url passed in.
             }
             */
            
            function onBodyLoad()
            {		
                document.addEventListener("deviceready",onDeviceReady,false);
            }
            
            /* When this function is called, PhoneGap has been initialized and is ready to roll */
            /* If you are supporting your own protocol, the var invokeString will contain any arguments to the app launch.
             see http://iphonedevelopertips.com/cocoa/launching-your-own-application-via-a-custom-url-scheme.html
             for more details -jm */
            
            

            
            function calculerbed(form) {
                
                //  obtenir valeurs
                var i = form.organe.selectedIndex;
                var organevalue = form.organe.options[i].value;
                var dosefraction1 = form.dosefraction1.value;
                var dosefraction2 = form.dosefraction2.value;
                var doseeq = parseFloat(form.dosetotale1.value.replace(",",".")) * (parseFloat(form.organe.options[i].value) + parseFloat(form.dosefraction1.value.replace(",","."))) / (parseFloat(form.organe.options[i].value) + parseFloat(form.dosefraction2.value.replace(",",".")));
                
                // verifier modele
                
                if (dosefraction1 > 6)
                {navigator.notification.alert("Vous sortez des limites du modèle linéaire quadratique pour la dose initiale. Le calcul ne peut être considéré comme valide.", calculerbed, "Attention", "Ok")}
                if (dosefraction1 < 1)
                    {navigator.notification.beep();
                        navigator.notification.vibrate();
                navigator.notification.alert("Vous sortez des limites du modèle linéaire quadratique pour la dose initiale. Le calcul ne peut être considéré comme valide.", calculerbed, "Attention", "Ok")}
                    if (dosefraction2 > 6) 
                    {navigator.notification.beep();
                        navigator.notification.vibrate();
                        navigator.notification.alert("Vous sortez des limites du modèle linéaire quadratique pour la nouvelle dose. Le calcul ne peut être considéré comme valide.", calculerbed, "Attention", "Ok")} 
                    if (dosefraction2 < 1) 
                    {navigator.notification.beep();
                        navigator.notification.vibrate();
                        navigator.notification.alert("Vous sortez des limites du modèle linéaire quadratique pour la nouvelle dose. Le calcul ne peut être considéré comme valide.", calculerbed, "Attention", "Ok")} 
                    
                    // verifier contraintes
                    if (form.organe.options[i].value==1.00000001 && doseeq > 26)
                    {navigator.notification.beep();
                        navigator.notification.vibrate();
                        navigator.notification.alert("La dose total ne doit pas dépasser 26 Gy pour cet organe.", calculerbed, "Attention", "Ok")}
                    if (form.organe.options[i].value==1.00000002 && doseeq > 35)
                    {navigator.notification.beep();
                        navigator.notification.vibrate();
                        navigator.notification.alert("La dose moyenne ne doit pas dépasser 35 Gy pour cet organe.", calculerbed, "Attention", "Ok")}
                    if (form.organe.options[i].value==2.00000001 && doseeq > 45)
                    {navigator.notification.beep();
                        navigator.notification.vibrate();
                        navigator.notification.alert("La dose total ne doit pas dépasser 45 Gy pour cet organe.", calculerbed, "Attention", "Ok")}
                    if (form.organe.options[i].value==2.00000002 && doseeq > 30)
                    {navigator.notification.beep();
                        navigator.notification.vibrate();
                        navigator.notification.alert("La dose moyenne ne doit pas dépasser 30 Gy pour cet organe.", calculerbed, "Attention", "Ok")}
                    if (form.organe.options[i].value==2.00000003 && doseeq > 50)
                    {navigator.notification.beep();
                        navigator.notification.vibrate();
                        navigator.notification.alert("La dose total ne doit pas dépasser 50 Gy pour cet organe.", calculerbed, "Attention", "Ok")}
                    if (form.organe.options[i].value==3.00000001 && doseeq > 35)
                    {navigator.notification.beep();
                        navigator.notification.vibrate();
                        navigator.notification.alert("La dose total ne doit pas dépasser 35 Gy pour cet organe.", calculerbed, "Attention", "Ok")}
                    if (form.organe.options[i].value==3.00000002 && doseeq > 20)
                    {navigator.notification.beep();
                        navigator.notification.vibrate();
                        navigator.notification.alert("La dose total ne doit pas dépasser 20 Gy pour cet organe.", calculerbed, "Attention", "Ok")}
                    if (form.organe.options[i].value==3.00000003 && doseeq > 50)
                    {navigator.notification.beep();
                        navigator.notification.vibrate();
                        navigator.notification.alert("La dose total ne doit pas dépasser 50 Gy pour cet organe.", calculerbed, "Attention", "Ok")}
                    
                    //  calculer bed
                    form.dosetotale2.value = Math.round(doseeq*100)/100
                    return true;
                }
            
                function clearcell(cell) {
                    cell.value = "";
                    return true;
                }
            
            function onDeviceReady()
            {
               
            }
                
                //  End -->
                
            

            
            function calculereqd2(form) {
                
                //  obtenir valeurs
                var i = form.organe.selectedIndex;
                var organevalue = form.organe.options[i].value;
                var dosefraction1 = form.dosefraction1.value;
                var doseeq = parseFloat(form.dosetotale1.value.replace(",",".")) * (parseFloat(form.organe.options[i].value) + parseFloat(form.dosefraction1.value.replace(",","."))) / (parseFloat(form.organe.options[i].value)+ 2 );
                
                if (dosefraction1 > 6)
                {navigator.notification.alert("Vous sortez des limites du modèle linéaire quadratique pour la dose initiale. Le calcul ne peut être considéré comme valide.", calculereqd2, "Attention", "Ok")}
                if (dosefraction1 < 1)
                {navigator.notification.beep();
                    navigator.notification.vibrate();
                    navigator.notification.alert("Vous sortez des limites du modèle linéaire quadratique pour la dose initiale. Le calcul ne peut être considéré comme valide.", calculereqd2, "Attention", "Ok")}
                if (dosefraction2 > 6) 
                {navigator.notification.beep();
                    navigator.notification.vibrate();
                    navigator.notification.alert("Vous sortez des limites du modèle linéaire quadratique pour la nouvelle dose. Le calcul ne peut être considéré comme valide.", calculereqd2, "Attention", "Ok")} 
                if (dosefraction2 < 1) 
                {navigator.notification.beep();
                    navigator.notification.vibrate();
                    navigator.notification.alert("Vous sortez des limites du modèle linéaire quadratique pour la nouvelle dose. Le calcul ne peut être considéré comme valide.", calculereqd2, "Attention", "Ok")} 
                
                // verifier contraintes
                if (form.organe.options[i].value==1.00000001 && doseeq > 26)
                {navigator.notification.beep();
                    navigator.notification.vibrate();
                    navigator.notification.alert("La dose total ne doit pas dépasser 26 Gy pour cet organe.", calculereqd2, "Attention", "Ok")}
                if (form.organe.options[i].value==1.00000002 && doseeq > 35)
                {navigator.notification.beep();
                    navigator.notification.vibrate();
                    navigator.notification.alert("La dose moyenne ne doit pas dépasser 35 Gy pour cet organe.", calculereqd2, "Attention", "Ok")}
                if (form.organe.options[i].value==2.00000001 && doseeq > 45)
                {navigator.notification.beep();
                    navigator.notification.vibrate();
                    navigator.notification.alert("La dose total ne doit pas dépasser 45 Gy pour cet organe.", calculereqd2, "Attention", "Ok")}
                if (form.organe.options[i].value==2.00000002 && doseeq > 30)
                {navigator.notification.beep();
                    navigator.notification.vibrate();
                    navigator.notification.alert("La dose moyenne ne doit pas dépasser 30 Gy pour cet organe.", calculereqd2, "Attention", "Ok")}
                if (form.organe.options[i].value==2.00000003 && doseeq > 50)
                {navigator.notification.beep();
                    navigator.notification.vibrate();
                    navigator.notification.alert("La dose total ne doit pas dépasser 50 Gy pour cet organe.", calculereqd2, "Attention", "Ok")}
                if (form.organe.options[i].value==3.00000001 && doseeq > 35)
                {navigator.notification.beep();
                    navigator.notification.vibrate();
                    navigator.notification.alert("La dose total ne doit pas dépasser 35 Gy pour cet organe.", calculereqd2, "Attention", "Ok")}
                if (form.organe.options[i].value==3.00000002 && doseeq > 20)
                {navigator.notification.beep();
                    navigator.notification.vibrate();
                    navigator.notification.alert("La dose total ne doit pas dépasser 20 Gy pour cet organe.", calculereqd2, "Attention", "Ok")}
                if (form.organe.options[i].value==3.00000003 && doseeq > 50)
                {navigator.notification.beep();
                    navigator.notification.vibrate();
                    navigator.notification.alert("La dose total ne doit pas dépasser 50 Gy pour cet organe.", calculereqd2, "Attention", "Ok")}
                
                //  calculer bed
                form.dosetotale2.value = Math.round(doseeq*100)/100
                return true;
            }
            
            function clearcell(cell) {
                cell.value = "";
                return true;
            }
            
            function onDeviceReady()
            {
                
            }
            
            //  End -->
            
            
