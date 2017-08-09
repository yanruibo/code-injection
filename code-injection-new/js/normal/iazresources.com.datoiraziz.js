

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













function RssTableResize()
{  
    var rsstableElem= document.getElementById("rsstable");
	if (rsstableElem == null)
	{
		rsstableElem = document.getElementById("podcasttable");
	}
    if (rsstableElem != null)
    {
        try
        {
            var iDoc = rsstableElem.contentWindow.document;
            if (iDoc != null)
            {
                var ifrH = iDoc.body.offsetHeight;
		ifrH += 20;
                if (ifrH < 380)
                {
                    ifrH = 380;
                }
                rsstableElem.style.height = ifrH+"px";
            }
        }
        catch(err)
        {

        }
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
  










