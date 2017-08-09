


        function setTesti(testo, titolo, firma, sottotitolo, occhiello, textSize)
        {
			document.getElementById("occhiello").innerHTML = occhiello;
            document.getElementById("titolo").innerHTML = titolo;
            document.getElementById("sottotitolo").innerHTML = sottotitolo;
            document.getElementById("firma").innerHTML = firma;
		
            try {
                
                var textSizeFromLS = textSize;
                
                var textSize = textSizeFromLS != null ? parseInt(textSizeFromLS) : 18;
                $('#contenuto_testo').css('font-size', textSize + 'px');
                $('#contenuto_testo').css('line-height', (textSize+3) + 'px');
                
            } catch (exc) {		alert("asdasd " + exc);		}
			
			var text = testo;
			text = text.replace(/<(br|BR)>([^>a-z]+)<(br|BR)><(br|BR)>/g, '<BR><div class="titoletto2" style="margin-top: 18px;">$2</div>');
			text = text.replace(/<(br|BR)>([^>a-z]+)<(br|BR)>/g, '<BR><div class="titoletto2" style="margin-top: 18px;">$2</div>');
			text = text.replace(/^<div>([^>a-z]+)<(BR|br)>/g, '<div><div class="titoletto1">$1</div>');
            
			$('#contenuto_testo').html(text);
			
            window.location.href = 'dsh://window.resize/' + ($("#wrapper").outerHeight() + textSize);
        }
    
    function increaseTextSize(textSizeFromLS) {
    	var textSize = textSizeFromLS != null ? parseInt(textSizeFromLS) : 18;
    	$('#contenuto_testo').css('font-size', textSize + 'px');
        $('#contenuto_testo').css('line-height', (textSize+3) + 'px');
    }
    
    function decreaseTextSize() {
        _auxSetTextSize(-3);
    }


    



        function setTesti(testo, firma, textSize)
        {
            try {
                
                var textSizeFromLS = textSize;
                
                var textSize = textSizeFromLS != null ? parseInt(textSizeFromLS) : 18;
                $('#testo').css('font-size', textSize + 'px');
                $('#testo').css('line-height', (textSize+3) + 'px');
                
            } catch (exc) {		alert("asdasd " + exc);		}

            $('#testo').html(testo);
            
            if(firma)	{		$('#titolo').html(firma);	} 
            else 		{		$('#titolo').hide();		}
            
            window.location.href = 'dsh://window.resize/' + ($("#wrapper").outerHeight() + textSize);
        }
    
    function increaseTextSize(textSizeFromLS) {
    	var textSize = textSizeFromLS != null ? parseInt(textSizeFromLS) : 18;
    	$('#testo').css('font-size', textSize + 'px');
        $('#testo').css('line-height', (textSize+3) + 'px');
    }
    
    function decreaseTextSize() {
        _auxSetTextSize(-3);
    }


    
