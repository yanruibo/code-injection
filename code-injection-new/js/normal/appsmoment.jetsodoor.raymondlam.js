

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
  

