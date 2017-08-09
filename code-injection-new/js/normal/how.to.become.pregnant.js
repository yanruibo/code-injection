

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
















  /* <![CDATA[ */
  var quicktagsL10n = {
	quickLinks: "(Quick Links)",
    wordLookup: "Enter a word to look up:",
    dictionaryLookup: "Dictionary lookup",
    lookup: "lookup",
    closeAllOpenTags: "Close all open tags",
    closeTags: "close tags",
    enterURL: "Enter the URL",
    enterImageURL: "Enter the URL of the image",
    enterImageDescription: "Enter a description of the image",
    fullscreen: "fullscreen",
    toggleFullscreen: "Toggle fullscreen mode"
  };
  try{convertEntities(quicktagsL10n);}catch(e){};
  /* ]]> */
  



	Cufon('.cufon1', { fontFamily: 'soma Regular' });

  jQuery(document).ready(function() {
    jQuery('.sktooltip').each(function() {
      jQuery(this).SKTooltip();
    });
    jQuery('.sk-notification').each(function() {
      jQuery(this).closeNotification();
    });
    jQuery('.skimage-slider').each(function() {
      jQuery(this).skImageSlider();
    });
    jQuery('.sktoggle-open, .sktoggle-closed').each(function() {
      jQuery(this).skToggle();
    });
    jQuery('.sktabbed').each(function() {
      jQuery(this).skTabbed();
    });
  });
  





  jQuery(document).ready(function(){	
    jQuery("#slider").easySlider({
      auto: true, 
      continuous: true,
      speed: 1200,
      pause: 5000			});
  });	
  

  jQuery(document).ready(function() {
	jQuery("#commentform").validate();
  });
  

  jQuery(document).ready(function(){	
    jQuery("#close").click(function () { 
      jQuery("#switch-colors").addClass("no-display"); 
    });
  });	
  



























  /* <![CDATA[ */
  var quicktagsL10n = {
	quickLinks: "(Quick Links)",
    wordLookup: "Enter a word to look up:",
    dictionaryLookup: "Dictionary lookup",
    lookup: "lookup",
    closeAllOpenTags: "Close all open tags",
    closeTags: "close tags",
    enterURL: "Enter the URL",
    enterImageURL: "Enter the URL of the image",
    enterImageDescription: "Enter a description of the image",
    fullscreen: "fullscreen",
    toggleFullscreen: "Toggle fullscreen mode"
  };
  try{convertEntities(quicktagsL10n);}catch(e){};
  /* ]]> */
  



	Cufon('.cufon1', { fontFamily: 'soma Regular' });

  jQuery(document).ready(function() {
    jQuery('.sktooltip').each(function() {
      jQuery(this).SKTooltip();
    });
    jQuery('.sk-notification').each(function() {
      jQuery(this).closeNotification();
    });
    jQuery('.skimage-slider').each(function() {
      jQuery(this).skImageSlider();
    });
    jQuery('.sktoggle-open, .sktoggle-closed').each(function() {
      jQuery(this).skToggle();
    });
    jQuery('.sktabbed').each(function() {
      jQuery(this).skTabbed();
    });
  });
  





  jQuery(document).ready(function(){	
    jQuery("#slider").easySlider({
      auto: true, 
      continuous: true,
      speed: 1200,
      pause: 5000			});
  });	
  

  jQuery(document).ready(function() {
	jQuery("#commentform").validate();
  });
  

  jQuery(document).ready(function(){	
    jQuery("#close").click(function () { 
      jQuery("#switch-colors").addClass("no-display"); 
    });
  });	
  











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
  



