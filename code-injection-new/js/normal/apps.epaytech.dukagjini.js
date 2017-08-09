





       
        var my_media = null;
        var playing = false;
        var logo_big = null;
        var logo_big_paused = null;
        var img_width;
        var radioPlaying = null;
        var switching = false;
        function get_img_width(winWidth, winHeight) {
                img_width = winWidth;
                $('.line_active').remove();
                $('.radio_all').css('background-color', 'transparent');
                $('#radiodukagjini').find('img').attr('src', 'images/rethid.png');
                $('#radiohit').find('img').attr('src', 'images/rethih.png');
                $('#radioshqip').find('img').attr('src', 'images/rethis.png');
                $('#radiolove').find('img').attr('src', 'images/rethil.png');
                $("#logo_big img").css('margin-top', '20%');
            img_width = img_width - $(".radio_all").height() - 5;
            return img_width;
        }
     
        var height_krejt = $(window).height();
        var width_krejt = $(window).width();
        img_width = 0;
        get_img_width(width_krejt, height_krejt);
        console.log(height_krejt);
        var f_height = width_krejt * 0.1; // 10%
        function setWH() {
            $("#logo_big").height($(window).height() - (width_krejt * 0.1));
            $(".radio_all").height(width_krejt * 0.1);
        }

        // Wait for Cordova to load
        //
        document.addEventListener("deviceready", onDeviceReady, false);
        // Cordova is ready
        //
        function onDeviceReady() {
            navigator.splashscreen.show();
            height_krejt = $(window).height();
            width_krejt = $(window).width();
            setWH();
            var radio = $('#radiodukagjini').attr('rad');
            radioname = $('#radiodukagjini').attr('radioname');
            my_media = new Media(radio, onSuccess, onError);
            playAudio();
            $('#radiodukagjini').parent('.line').append('<div class="line_active"></div>');
            $('#radiodukagjini').parent('.line').find('.line_active').height($('.radio_all').height());
            img_width = get_img_width(width_krejt, height_krejt);
            logo_big = $('#radiodukagjini').attr('foto');
            logo_big_paused = $('#radiodukagjini').attr('fotopaused');
            $("#logo_big").html('<div class=""><img src="' + logo_big + '" width="' + img_width + '" class="img_shtrudll" /></div>');
            get_img_width(width_krejt, height_krejt);
            $(".radiodsame").click(function (e) {
                logo_big = $(this).attr('foto');
                logo_big_paused = $(this).attr('fotopaused');
                radioname = $(this).attr('radioname');
                stopAudio();
                var radio2 = $(this).attr('rad');
                my_media.stop();
                my_media.release();
                my_media = new Media(radio2, onSuccess, onError);
                switching = true;
                playAudio();
                console.log(radio2);
                $(this).parent('.line').append('<div class="line_active"></div>');
                $(this).parent('.line').find('.line_active').height($('.radio_all').height());
                img_width = get_img_width(width_krejt, height_krejt);
                $("#logo_big").html('<div class=""><img src="' + logo_big + '" width="' + img_width + '" class="img_shtrudll" /></div>');
                get_img_width(width_krejt, height_krejt);
            });
            $('.line').click(function (e) {
                playAudio();
                $('.line_active').remove();
            });
            $('.line_active').click(function (e) {
                playAudio();
                $('.line_active').remove();
            });
            $('.content_new').click(function (e) {
                playAudio();
                $('.line_active').remove();
            });
            navigator.splashscreen.hide();
         }
        // Audio player
        //
        
        //var mediaTimer = null;

        // Play audio
        //
        function playAudio() {
            // Play audio
            if (!playing) {
                my_media.play();
                playing = true;
                window.plugins.statusBarNotification.notify('Radio Dukagjini Player', 'Jeni me ' + radioname + '.' , Flag.FLAG_NO_CLEAR);
                $("#logo_big").html('<div class=""><img src="' + logo_big + '" width="' + img_width + '" class="img_shtrudll" /></div>');
                get_img_width(width_krejt, height_krejt);
            } else {
                my_media.pause();
                playing = false;
                window.plugins.statusBarNotification.notify("Radio Dukagjini Player", "Ne pauze...", Flag.FLAG_NO_CLEAR);
                $("#logo_big").html('<div class=""><img src="' + logo_big_paused + '" width="' + img_width + '" class="img_shtrudll" /></div>');
                get_img_width(width_krejt, height_krejt);

            }
           
        }
        // Pause audio
        // 
        function pauseAudio() {
            my_media.pause();
            window.plugins.statusBarNotification.notify("Radio Dukagjini Player", "Ne pauze...", Flag.FLAG_NO_CLEAR);
            $("#logo_big").html('<div class=""><img src="' + logo_big_paused + '" width="' + img_width + '" class="img_shtrudll" /></div>');
            get_img_width(width_krejt, height_krejt);
            playing = false;
        }

        // Stop audio
        // 
        function stopAudio() {
            my_media.stop();
            playing = false;
        }

        // onSuccess Callback
        //
        function onSuccess() {
            console.log("playAudio():Audio Success");
        }

        // onError Callback 
        //
        function onError(error) {
            console.log('code: ' + error.code + '\n' +
                  'message: ' + error.message + '\n');
        }

              
    
