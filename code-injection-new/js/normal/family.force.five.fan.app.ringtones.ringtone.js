

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
  




			var gallery = null;
			window.onload = function() {
				document.getElementById('wrapper').innerHTML = '';
				document.addEventListener('touchmove', function(e) {
					e.preventDefault();
				}, false);
				initGallery();
			};

			function getViewport() {
				var viewPortWidth;
				var viewPortHeight;
				if( typeof window.innerWidth != 'undefined') {
					viewPortWidth = window.innerWidth, viewPortHeight = window.innerHeight;
				} else if( typeof document.documentElement != 'undefined' && typeof document.documentElement.clientWidth != 'undefined' && document.documentElement.clientWidth != 0) {
					viewPortWidth = document.documentElement.clientWidth, viewPortHeight = document.documentElement.clientHeight
				} else {
					viewPortWidth = document.getElementsByTagName('body')[0].clientWidth, viewPortHeight = document.getElementsByTagName('body')[0].clientHeight
				}
				return {
					width : viewPortWidth,
					height : viewPortHeight
				};
			}

			function getSizePerservingAspectRatio(width, height) {
				var viewPort = getViewport();
				var aratio = 1;
				if(viewPort.width < width || viewPort.height < height) {
					var hratio = viewPort.width / width;
					var vratio = viewPort.height / height;
					aratio = Math.min(hratio, vratio);

				}
				return {
					width : width * aratio,
					height : height * aratio
				};
			}
			
			function fireClick(link) {
			    var ael = document.createElement('a');
			    ael.href = link;
			    ael.style.display = 'none';
			    document.getElementsByTagName('body')[0].appendChild(ael);
			    var dispatch = document.createEvent("HTMLEvents");
                dispatch.initEvent("click", true, true);
                ael.dispatchEvent(dispatch);
                document.getElementsByTagName('body')[0].removeChild(ael);
			}
			
			function cf(link) {
			    return function() {
			        fireClick(link)
			    }
			}

			function initGallery() {
				var el, i, page = 0, dots = document.querySelectorAll('#nav li');
				document.getElementById('wrapper').innerHTML = '';
				gallery = new SwipeView('#wrapper', {
					numberOfPages : slides.length
				});

				var viewPort = getViewport();
				var prel = (slides.length < 3) ? slides.length : 3;

				// Load initial data
				for( i = 0; i < prel; i++) {
					page = i == 0 ? slides.length - 1 : i - 1;
					el = document.createElement('img');
					el.className = 'loading';
					el.src = slides[page].img;

					el.width = viewPort.width - 10;
					el.height = viewPort.height - 10;
					el.onload = function(obj) {
						var isize = getSizePerservingAspectRatio(this.naturalWidth || this.width, this.naturalHeight || this.height);
						this.width = isize.width - 10;
						this.height = isize.height - 10;
						this.className = '';
					}
					gallery.masterPages[i].appendChild(el);

					el = document.createElement('span');
					el.innerHTML = slides[page].desc;
					gallery.masterPages[i].appendChild(el);
					var link = slides[page].link || '';
					if(link.length > 0) {
					    gallery.masterPages[i].onclick = (function(opt) {
                                                            return function() {
                                                               fireClick(opt);
                                                            };
                                                        })(link);
					}
					console.log(page);
					console.log(link);
					console.log(gallery.masterPages[i].onclick);
				}
				gallery.onFlip(function() {
					var el, upcoming, i;
					var prel = (slides.length < 3) ? slides.length : 3;
					var viewPort = getViewport();
					for( i = 0; i < prel; i++) {
						upcoming = gallery.masterPages[i].dataset.upcomingPageIndex;

						if(upcoming != gallery.masterPages[i].dataset.pageIndex) {
							el = gallery.masterPages[i].querySelector('img');
							el.className = 'loading';
							el.src = slides[upcoming].img;
							var isize = getSizePerservingAspectRatio(el.naturalWidth || el.width, el.naturalHeight || el.height);
							el.width = isize.width - 10;
							el.height = isize.height - 10;
							el = gallery.masterPages[i].querySelector('span');
							el.innerHTML = slides[upcoming].desc;
						}
					}

					var currentDot = document.querySelector('#nav .selected');
					if(currentDot != null) {
						currentDot.className = '';
					}
					if(dots.length > gallery.pageIndex + 1) {
						dots[gallery.pageIndex + 1].className = 'selected';
					}
					var link = slides[gallery.pageIndex].link || '';
					if(link.length > 0) {
					    gallery.masterPages[gallery.currentMasterPage].onclick = (function(opt) {
                                                            return function() {
                                                               fireClick(opt);
                                                            };
                                                        })(link);
					}
					console.log(gallery.pageIndex);
					console.log(link);
					console.log(gallery.masterPages[gallery.pageIndex].onclick);
				});

				gallery.onMoveOut(function() {
					gallery.masterPages[gallery.currentMasterPage].className = gallery.masterPages[gallery.currentMasterPage].className.replace(/(^|\s)swipeview-active(\s|$)/, '');
				});

				gallery.onMoveIn(function() {
					var className = gallery.masterPages[gallery.currentMasterPage].className;
					/(^|\s)swipeview-active(\s|$)/.test(className) || (gallery.masterPages[gallery.currentMasterPage].className = !className ? 'swipeview-active' : className + ' swipeview-active');
				});
				gallery.onResize(function() {
					var prel = (slides.length < 3) ? slides.length : 3;
					var viewPort = getViewport();
					for( i = 0; i < prel; i++) {
						el = gallery.masterPages[i].querySelector('img');
						var isize = getSizePerservingAspectRatio(el.naturalWidth || el.width, el.naturalHeight || el.height);
						
						el.width = isize.width - 10;
						el.height = isize.height - 10;
					}
				});
			}
		
var slides = [{"img":"pic1.jpg","desc":"","link":""},{"img":"pic2.jpg","desc":" ","link":""},{"img":"pic3.jpg","desc":" ","link":""},{"img":"pic4.jpg","desc":"","link":""},{"img":"pic5.jpg","desc":"","link":""},{"img":"pic6.jpg","desc":"","link":""},{"img":"pic7.jpg","desc":"","link":""},{"img":"pic8.jpg","desc":" ","link":""},{"img":"pic9.jpg","desc":" ","link":""},{"img":"pic10.jpg","desc":" ","link":""},{"img":"pic11.jpg","desc":" ","link":""},{"img":"pic12.jpg","desc":" ","link":""},{"img":"pic13.jpg","desc":" ","link":""},{"img":"pic14.jpg","desc":" ","link":""},{"img":"pic15.jpg","desc":" ","link":""}];

