

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


/*****************************************************
 TERMS OF USE
 You may freely use, distribute, and modify this code
 for any purpose, so long as you attribute the code as
 follows:
 Author:                              Matthew Congrove
 More Information:               mydailyphoto.com/blog
******************************************************/

var touching, dPrevious, dCurrent, dNext, oX;

// Whether or not the finger is touching the screen
touching = false;

// Original X-coordinate
oX = 0;

// Initial page numbers
dPrevious = 0;
dCurrent = 1;
dNext = 2;

// Apple iPhone Touch API events
document.addEventListener('touchstart', touchHandler, false);
document.addEventListener('touchmove', touchHandler, false);
document.addEventListener('touchend', touchHandler, false);
document.addEventListener('touchcancel', touchHandler, false);

var target_click;
var target_status = '';

function asClicked(event) {

	if (event.type == "touchstart") {
		target_status = 'start';
		target_click = event.touches[0].target.onclick;
	}
	else if (event.type == "touchmove") {
		target_status = 'moved';
	}
	else if (event.type == "touchend") {
		if (target_status == 'start') {
			target_click();
		}
	}
	
}

// The handler for all Apple iPhone Touch API events
function touchHandler(e) {
	// Prevent the default scrolling behaviour (notice: This disables vertical scrolling as well)
	e.preventDefault();
	
	asClicked(e);
	
	// If the user has started a touch event
	if (e.type == "touchstart") {
		touching = true;
		// If there's only one finger touching
		if (e.touches.length == 1) {
			var touch = e.touches[0];
			// The originating X-coord (point where finger first touched the screen)
			oX = touch.pageX;
			// Reset default values for current X-coord and scroll distance
			nX = 0;
			scrollX = 0;
		}
	}
	// If the user has touched the screen and moved the finger
	else if (e.type == "touchmove") {
		// If there's only one finger touching
		if (e.touches.length == 1) {
			var touch = e.touches[0];
			// The current X-coord of the users finger
			var nX = touch.pageX;

			// If the user moved the finger from the right to the left
			if (oX > nX) {
				// Find the scrolling distance
				var scrollX = oX-nX;
				// If the user scrolled more than 100 pixels
				if (scrollX > 100) {
					// If the next DIV exists then continue
					if (document.getElementById('Div'+dNext)) {
						// If this is still from the original touch
						if (touching == true)
						{
							// End the current touch
							touching = false;
							// Move in the next DIV
							switchNext(dCurrent,dNext);
							// Recalculate the pages
							dPrevious = dCurrent;
							dCurrent = dNext;
							dNext = dNext+1;
						}
					}
				}
			// If the user moved the finger from the left to the right
			} else {
				// Find the scrolling distance
				var scrollX = nX-oX;
				// If the user scrolled more than 100 pixels
				if (scrollX > 100) {
					// If the previous page isn't 0, in other words there's a previous page to the left
					if (dPrevious != 0) {
						// If this is still from the original touch
						if (touching == true) {
							// End the current touch
							touching = false;
							// Move in the previous DIV
							switchPrevious(dCurrent,dPrevious);
							// Recalculate the pages
							dNext = dCurrent;
							dCurrent = dPrevious;
							dPrevious = dPrevious-1;
						}
					}
				}
			}
		}
	}
	// If the user has removed the finger from the screen
	else if (e.type == "touchend" || e.type == "touchcancel") {
		// Defines the finger as not touching
		touching = false;
	}
	else {
		alert(e.type);
		// Prevent the default scrolling behaviour (notice: This disables vertical scrolling as well)
	}
	
}
// If the user requests the page to the right of the screen ('next' DIV)
function switchNext(divOut,divIn) {
	// Show the DIV to the right
	document.getElementById('Div'+divIn).style.display = 'block';
	// Move the currently displaying DIV from Center to Left
	document.getElementById('Div'+divOut).className = 'divCtL';
	// Move the requested DIV from the Right to Center
	document.getElementById('Div'+divIn).className = 'divRtC';
	// For some reason the animation doesn't stick after exiting this function, so force the off-screen location
	document.getElementById('Div'+divOut).style.left = '-320px';
	// For some reason the animation doesn't stick after exiting this function, so force the on-screen location
	document.getElementById('Div'+divIn).style.left = '0px';
}
// If the user requests the page to the left of the screen ('previous' DIV)
function switchPrevious(divOut,divIn) {
	// Show the DIV to the left
	document.getElementById('Div'+divIn).style.display = 'block';
	// Move the currently displaying DIV from Center to Right
	document.getElementById('Div'+divOut).className = 'divCtR';
	// Move the requested DIV from the Left to Center
	document.getElementById('Div'+divIn).className = 'divLtC';
	// For some reason the animation doesn't stick after exiting this function, so force the off-screen location
	document.getElementById('Div'+divOut).style.left = '320px';
	// For some reason the animation doesn't stick after exiting this function, so force the on-screen location
	document.getElementById('Div'+divIn).style.left = '0px';
}
/* Debug Results Display DIV */
function alertIt() {
	document.getElementById('divPrev').innerHTML = 'Previous Page: '+dPrevious;
	document.getElementById('divCurrent').innerHTML = 'Current Page: '+dCurrent;
	document.getElementById('divNext').innerHTML = 'Next Page: '+dNext;
}

function menu(target) {
	switch (dCurrent) {
		case (target - 1):
		case (target - 2):
		case (target - 3):
			switchNext(dCurrent, target);
			dPrevious = target - 1;
			dCurrent = target;
			dNext = target + 1;
			break;		
		case (target + 1):
		case (target + 2):
		case (target + 3):
			switchPrevious(dCurrent, target);
			dPrevious = target + 1;
			dCurrent = target;
			dNext = target - 1;
			break;
		case (target):
			break;
	}
}











  function suona() {
    if (navigator.onLine) {
      document.getElementById('suona').style.visibility = 'hidden';
      document.getElementById('suona').style.display = 'none';
      document.getElementById('stop').style.visibility = 'visible';
      document.getElementById('stop').style.display = 'block';
      document.getElementById('stop').setAttribute('class', 'pulsedbox');
      document.getElementById('riproduzione').style.visibility = 'visible';
      document.getElementById('riproduzione').style.display = 'block';
    } else {
      alert('Ops... Audio momentaneamente non disponibile. Controlla la tua connessione o riprova più tardi');
    }
  }
  
  function ferma() {
    document.getElementById('riproduzione').style.visibility = 'hidden';
    document.getElementById('riproduzione').style.display = 'none';
    document.getElementById('stop').style.visibility = 'hidden';
    document.getElementById('stop').style.display = 'none';
    document.getElementById('suona').style.visibility = 'visible';
    document.getElementById('suona').style.display = 'block';
    document.getElementById('suona').setAttribute('class', 'pulsedbox');
  }




function RssTableResize()
{  
    var rsstableElem= document.getElementById("rsstable");
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





















