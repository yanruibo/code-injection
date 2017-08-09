
function isAndroid() {
	if (typeof(DEBUG_ANDROID_THEME) != 'undefined' && DEBUG_ANDROID_THEME) return true
	
	var ua = navigator.userAgent.toLowerCase()
	return ua.indexOf("android") > -1
}

$(function() {
	if (isAndroid()) {
		// add android class to body
		$('body').addClass('android')
	}
})








      
        // Audio player
        //
        var my_media = null;
        var mediaTimer = null;
		var sonando = false;
        // Play audio
        //
        function playAudio(src) {
            // Create Media object from src

            if (!my_media){

            	my_media = new Media(src, onSuccess, onError);
    				
            }
            if(!sonando)
            	{
            	my_media.play();
     			sonando = true;
     			$('#play').css('display','none');
     			$('#stop').fadeIn('slow');
                }
            // Play audio
          
        }

        // Pause audio
        //
        function pauseAudio() {
            if ((my_media)&&(sonando)) {
                my_media.pause();
                sonando = false;
                my_media = null;
            }
        }

        // Stop audio
        //
        function stopAudio() {
            if ((my_media)&&(sonando)) {
                my_media.pause();
                sonando = false;
     			$('#stop').css('display','none');
                $('#play').fadeIn('slow');

            }
        }

        // onSuccess Callback
        //
        function onSuccess() {

		}

        // onError Callback
        //
        function onError(error) {

           my_media.pause();
        }

        // Set audio position
        //
        function setAudioPosition(position) {
            document.getElementById('audio_position').innerHTML = position;
        }
        
        $(document).ready(function ()
        {
        	$( ".selector" ).bind( "change", function(event, ui) {
        		  
        		});
            $('#cabecera').css('height',($('body').height()/5)+'px');
            $('#micro').css('height',($('body').height()/3.5)+'px');
        })

