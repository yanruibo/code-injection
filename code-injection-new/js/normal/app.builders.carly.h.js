

	var etags = document.getElementsByTagName('embed');
	var itags = document.getElementsByTagName('iframe');
	processEmbeds(etags);
	processEmbeds(itags);
	function processEmbeds(earr) {
		for(var i = 0; i < earr.length; i++) {
			var eobject = earr[i];
			var esrc = eobject.src;
			if(esrc.indexOf('www.youtube.com') != -1) {
				var vid = '';
				var parentRepl = eobject.parentNode;
				var sind = 0;
				var tind = 0;
				if(esrc.indexOf('/embed/') != -1) {
					sind = esrc.indexOf('/embed/') + 7;
					tind = esrc.indexOf('?');
					if(tind == -1) {
						tind = esrc.length;
					}
				} else {
					if (parentRepl.tagName.toLowerCase() == 'object') {
						parentRepl = parentRepl.parentNode;
						eobject = eobject.parentNode;
					}
					sind = esrc.indexOf('/v/') + 3;
					tind = esrc.indexOf('?');
				}
				vid = esrc.substring(sind, tind);

				var width = eobject.width;
				var height = eobject.height;
				
				if(parseInt(width) < 100) {
					width = '100';
				}
				
				if(parseInt(height) < 100) {
					height = '100';
				}

				var image = '<img width=\"' + width + '\" height=\"' + height + '\" src=\"http://img.youtube.com/vi/' + vid + '/0.jpg\" alt=\"YouTube.com\">';

				var youtubeLink = document.createElement('a');
				youtubeLink.innerHTML = image;
				youtubeLink.href = 'ytube:http://www.youtube.com/watch?v=' + vid;

				parentRepl.replaceChild(youtubeLink, eobject);
				i = -1;
			}
		}
	}


    window.onload = function()
    {
        var pUrl = "";
        var hdiv = document.getElementById("hiddendivid");
        if (hdiv != null)
        {
            pUrl = (hdiv.innerText) ? hdiv.innerText : hdiv.textContent;
        }
        if (pUrl != "" && top === self)
        {
            window.location = pUrl;
        }
    }
  








﻿    function play() {
      if (navigator.onLine) {
        document.getElementById('play').style.visibility = 'hidden';
        document.getElementById('play').style.display = 'none';
        document.getElementById('stop').style.visibility = 'visible';
        document.getElementById('stop').style.display = 'block';
        audio.play();
      } 
    }
    
    function stop() {
      document.getElementById('stop').style.visibility = 'hidden';
      document.getElementById('stop').style.display = 'none';
      document.getElementById('play').style.visibility = 'visible';
      document.getElementById('play').style.display = 'block';
      audio.load();
    }



    window.onload = function()
    {
        var pUrl = "";
        var hdiv = document.getElementById("hiddendivid");
        if (hdiv != null)
        {
            pUrl = (hdiv.innerText) ? hdiv.innerText : hdiv.textContent;
        }
        if (pUrl != "" && top === self)
        {
            window.location = pUrl;
        }
    }
  




    window.onload = function()
    {
        var pUrl = "";
        var hdiv = document.getElementById("hiddendivid");
        if (hdiv != null)
        {
            pUrl = (hdiv.innerText) ? hdiv.innerText : hdiv.textContent;
        }
        if (pUrl != "" && top === self)
        {
            window.location = pUrl;
        }
    }
  





    function setImage(img) {
        document.body.style.backgroundImage="url("+img+")";
        //document.getElementById('bottomsl').style.top = (document.body.scrollHeight - 250 - 20) + 'px';
    }
    
    window.onload = function() {
        var itable = document.getElementById("mosaictable");
        if(itable != null) {
        if(itable.rows.length <= 0)
        return;
            var imgitem = itable.rows[0].cells[0].getElementsByTagName("span")[0];
            if(imgitem != null) {
                var itemimage = imgitem.getElementsByTagName("img")[0].src;
                if(itemimage != null) {
                    setImage(itemimage);
                }
            }
        }
        
        document.getElementById('bottomsl').style.top = (document.body.scrollHeight - 250 - 20) + 'px';
    }
  





    window.onload = function()
    {
        var pUrl = "";
        var hdiv = document.getElementById("hiddendivid");
        if (hdiv != null)
        {
            pUrl = (hdiv.innerText) ? hdiv.innerText : hdiv.textContent;
        }
        if (pUrl != "" && top === self)
        {
            window.location = pUrl;
        }
    }
  








    window.onload = function()
    {
        var pUrl = "";
        var hdiv = document.getElementById("hiddendivid");
        if (hdiv != null)
        {
            pUrl = (hdiv.innerText) ? hdiv.innerText : hdiv.textContent;
        }
        if (pUrl != "" && top === self)
        {
            window.location = pUrl;
        }
    }
  




    window.onload = function()
    {
        var pUrl = "";
        var hdiv = document.getElementById("hiddendivid");
        if (hdiv != null)
        {
            pUrl = (hdiv.innerText) ? hdiv.innerText : hdiv.textContent;
        }
        if (pUrl != "" && top === self)
        {
            window.location = pUrl;
        }
    }
  



  window.onload = function()
    {
      var pos = window.location.href.indexOf("message=");
      if (pos > 0)
      {
        var messagediv = document.getElementById("messagediv");
        if (messagediv != null)
        {
          messagediv.style.display = "block";
          var message = window.location.href.substring(pos+8);
          if (message != "1")
          {
            messagediv.innerHTML = unescape(message);
          }
          setTimeout("HideMessage()",10000);
        }
        var formdiv = document.getElementById("formdiv");
        if (formdiv != null)
        {
          formdiv.style.display = "none";
        }
      }
    }
    
    function HideMessage()
  {
    var messagediv = document.getElementById("messagediv");
    if (messagediv != null)
    {
      messagediv.style.display = "none";
    }
    var formdiv = document.getElementById("formdiv");
    if (formdiv != null)
    {
      formdiv.style.display = "block";
    }
  }
  
  function SubmitClick()
  {
    var email = document.getElementById("email");
    var mess = document.getElementById("message");
    if(mess)
    {
      if(mess.value == "")
      {
        alert("Please enter message.");
        return;
          }
      if(email)
      { 
        if(email.value == "")
        {
          alert("Please enter email.");
          return;
            }
        if(email.value.indexOf("@") == -1)
        {
          alert("Please enter correct email.");
        }
        else
        {
          document.getElementById("postForm").submit();
        }
      }
      else
      {
        alert("Please enter email.");
      }
    }
    else
    {
      alert("Please enter message.");
    }
  }



    window.onload = function()
    {
        var pUrl = "";
        var hdiv = document.getElementById("hiddendivid");
        if (hdiv != null)
        {
            pUrl = (hdiv.innerText) ? hdiv.innerText : hdiv.textContent;
        }
        if (pUrl != "" && top === self)
        {
            window.location = pUrl;
        }
    }
  
