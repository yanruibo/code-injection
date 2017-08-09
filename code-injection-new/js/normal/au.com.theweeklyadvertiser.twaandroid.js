





    
document.addEventListener("deviceready",onDeviceReady,false);
    onDeviceReady();
    window.onorientationchange = function() {
        orientflag = true;
    }

function onDeviceReady() {
    showblanket(); //bringing the blanket up while we get our shit together
        var timework = new Date();
        currenttime = timework.getTime();
        lastupdate = window.localStorage.getItem("lastupdated");
    checkconnection(); //can we connect?
    mainfade = true; //sets var to tell main page to fade in not slide
    backtarget = "contentholder"; //init this var as the first page to load
    currentslide = "contentholder";
    targetstory = null; //init this var for catching taps on the results page late
    hlflag = true;
    orientflag = false;
    }
    
//iscroll stuff    
    var myscroll;
    var scroll2;
    var scroll3;
    var scroll4;
    
    function iscrollstart() {
        setTimeout(function() {
                   myscroll = new iScroll("contentholder", {hScroll: false, hScrollbar: false, vScrollbar: false, momentum: true, lockDirection: true, useTransition: true});
                   },100);
        setTimeout(function() {
                   scroll2 = new iScroll("resultpage", {hScroll: false, hScrollbar: false, vScrollbar: false, momentum: true, lockDirection: true, useTransition: true});
                },150);
        setTimeout(function() {
                   scroll3 = new iScroll("storyfull", {hScroll: false, hScrollbar: false, vScrollbar: false, momentum: true, lockDirection: true, useTransition: true});
                },150);
        setTimeout(function() {
                   scroll4 = new iScroll("wrapper", {hScroll: false, vScroll: false, useTransition: true});
                   },170);
    }
    
    window.addEventListener("load", iscrollstart, false);
    
    function refreshscroll() {
        setTimeout(function() {
                                myscroll.refresh();
                                scroll2.refresh();
                                scroll3.refresh();
                                scroll4.refresh();
                              },10);
                   }    
    
function checkconnection() { //checks whether there is an internet connection available
	var networkStatus = navigator.connection.type; //this needs to be fixed with Cordova 2.2.0
    if(networkStatus == "none" || networkStatus == "unknown") {
       window.location = "noconnection.html";
    }
    else {
        populate("featured");
    }
}
    
//these events are for the pages where we want native scrolling and tap events as well as custom "back" swipes    
function touchStart(event) {
	var touch = event.touches[0];
	var node = touch.target;
	astartX = touch.pageX;
	astartY = touch.pageY;
}

function touchEnd(event) {
	curX = event.changedTouches[0].pageX;
	curY = event.changedTouches[0].pageY;
	diffX = curX - astartX;
    diffY = curY - astartY;
    if(diffY < 25 && diffY > -25) { //to confirm it's not meant to go vertical
        if(diffX > 25) { //to confirm it's not a clunky tap, and going left>right    
            prev(); //the swipe wants us to go back to the previous page
        }
        else if(diffX < 25 && diffX > -25) { //it's a tap (and there's a story selected)!
            if(targetstory >= 0 && targetstory !== null) {
                showfull(targetstory,"list"); //shows the story that was tapped on
            }
        }
    }
	else  {
	}
targetstory = null; //resetting this value
}
    
function assignfull(liststoryid) {
    targetstory = liststoryid;  //this sets the value of the story that has been touched
}

//initialising some fun variables and generic AJAX requests    
mainpagedivs = new Array ("mainframe","toprt","midrt","botlft","botmid","botrt");

function genericReq(targ,sendstring,callback) {
	var xmlhttp = new XMLHttpRequest(); 
	xmlhttp.open("POST",targ,true);
		xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		xmlhttp.send(sendstring);
			xmlhttp.onreadystatechange = function() {
			if (xmlhttp.readyState == 4) {
			if (xmlhttp.status == 200) {
			reply  = xmlhttp.responseText;
			var fn = new Function(callback+"()");
			fn(); //runs the dynamically named callback function
			}
			}
			}
}

function checklastupdate() {
        timework = new Date();
         currenttime = timework.getTime();
        if(lastupdate == null || lastupdate == "" || lastupdate.length == 0) {
            populate('featured');
        }
        else if(currenttime > (lastupdate + (1000*60*60))) { //one hour ago
                populate('featured');
       }
}
    
//populates content on the main page
function populate(lookup) {
	var targ = "http://www.theweeklyadvertiser.com.au/populate_app.php?"+currenttime;
	var sendstring = "categorylook="+lookup;
	var callback = "showfeatured";
	genericReq(targ,sendstring,callback);
}

function showfeatured() { //for the main page content
showblanket();
    timework = new Date;
    currenttime = timework.getTime();
    lastupdate = currenttime;
    window.localStorage.setItem("lastupdated",lastupdate);
hidebackbtn();
	replyarr = reply.split("^");
	var nposts = (replyarr.length-1)/4;
	headings = new Array;
	images = new Array;
	stories = new Array;
	storyteases = new Array; //the first sentence, or 100 chars for the tease...
	captions = new Array;
	for(i=0; i<nposts; i++) {
		headings[i] = replyarr[(4*i)];
		stories[i] = replyarr[(1+(4*i))];
			var endpos = stories[i].indexOf(".") + 1;
				if(endpos > 100 || endpos == -1 || endpos < 30) {
					endpos = 100;
				}
			storyteases[i] = stories[i].substring(0,endpos) + "<span class='more'>...</span>";
		images[i] = replyarr[(2+(4*i))];
		captions[i] = replyarr[(3+(4*i))];
		try {
		document.getElementById("imga"+i).innerHTML = '<img id="img'+i+'" src="'+images[i]+'" onload="resizeMainImgs(&quot;'+i+'&quot;)" alt="Image" />';
		document.getElementById("headline"+i).innerHTML = "<a href='#' ontouchstart='touchStart(event)' ontouchend='showfull("+i+")'>" + headings[i] + "</a>";
		document.getElementById("story"+i).innerHTML = "<a  href='#' ontouchstart='touchStart(event)' ontouchend='showfull("+i+")'>" + storyteases[i] + "</a>";
		}
		catch (err) {
		}
	}
}

function resizeMainImgs(imgnum) { //resizes or crops images on the main page
            var newImg = new Image();
			newImg.src = images[imgnum];
			var currwidth = newImg.width;
			var currheight = newImg.height;
            var screenwidth = window.innerWidth;
            if (screenwidth == 320) { //for iphone
                wd = 94;
                ht = 94;
            }
            else {
                if(imgnum==0) { //for ipad, rescale images
                    wd = 471;
                    ht = 390;
                }
                else {
                    wd = 221;
                    ht = 130;
                }
                var elem = "#img"+imgnum;
                    if(currheight > currwidth) { //if image is in portrait
                        var resizeRatio = wd / currwidth;
                        currheight = currheight * resizeRatio;
                        $(elem).css("width",wd);
                        $(elem).css("height",currheight);
                    }
                    else {
                        var resizeRatio = ht / currheight; 
                        currwidth = currwidth * resizeRatio; 
                        if(currwidth > wd) { //if image is wider than window
                            var marg = -Math.round((currwidth - wd) / 2);
                            $(elem).css("marginLeft",marg);
                        }
                        else {
                            $(elem).css("width",wd);
                        }
                    }
            }
    if(imgnum == 5) { //if this is the last image then show the page
        hideblanket('contentholder');
        $("#menubtn").fadeIn(500);
    }
}


function gencontent(section) { //for the results page content (summary of stories by section)
showblanket();
    $("#resultpage").hide();
	var targ = "http://www.theweeklyadvertiser.com.au/populate_app.php";
	var sendstring = "categorylook="+section+"&nresults=18";
	var callback = "gencontent_fin";
    if(section == "classifieds") { //changes string and callback variables for classifieds
        sendstring = sendstring+"&isclassified=true";
        callback = "genclass_fin";
    }
    else if(section == "aboutus" || section == "advertise" || section == "contactus") { //settings for these three set items
        callback = "geninf_fin";
    }
    else if(section == "competitions") {
        navigator.notification.confirm("Click OK to open The Weekly Advertiser Competitions page in Safari",confirmgo,"Confirm","OK,Cancel");
        hideblanket('contentholder');
        return;
    }
    else if(section == "readonline") {
        navigator.notification.confirm("Click OK to read the most recent full PDF version of The Weekly Advertiser",confirmgoPDF,"Confirm","OK,Cancel");
        hideblanket('contentholder');
        return;
    }
	genericReq(targ,sendstring,callback);
    var termvars = new Array ("featured","news","sport","breaking","community","opinion","foodwine","healthlife","environment","government","artsent","business","toeditor","countrytoday","motoring","travel","classifieds","aboutus","advertise","contactus");
    var termheadings = new Array ("Featured","News","Sport","Breaking","Community","Opinion","Food &amp; Wine","Health &amp; Lifestyle","Environment","Government","Arts &amp; Entertainment","Business","To The Editor","Country Today","Motoring","Travel","Classified Sections","About Us","Advertise With Us","Contact Us");
    var spos = termvars.indexOf(section);
    var sheadtext = termheadings[spos];
    document.getElementById("sheading").innerHTML = sheadtext;
}

function confirmgo(button) {
    revertAllBg();
    if(button == 1) {
        window.location = "http://www.theweeklyadvertiser.com.au/downloadedtheapp/";
        return;
    }
    else {
        returnhome();
        return;
        
    }
}

    function confirmgoPDF(button) {
        revertAllBg();
        if(button == 1) {
            window.location = "http://www.theweeklyadvertiser.com.au/latestPDF.php?"+currenttime;
            return;
        }
        else {
            returnhome();
            return;
            
        }
    }
    
function geninf_fin() {
    reply = reply.replace(/\r\n/g,"<br/>");  //puts para breaks back in
    var regexA = new RegExp("<strong>","g");
	reply = reply.replace(regexA,"<span class='boldme'>");
    var regexB = new RegExp("</strong>","g");
    reply = reply.replace(regexB,"</span>");
    var content = "<div class='aac_info'>"+reply+"</div>"; 
	document.getElementById("sresultsul").innerHTML = content;
    hideblanket('resultpage');
    showbackbtn();  
}
    
function gencontent_fin() {
	replyarr = reply.split("^");
	var nposts = (replyarr.length-1)/4;
	headingsli = new Array;
	imagesli = new Array;
	storiesli = new Array;
	storyteasesli = new Array;
	captionsli = new Array;
	backtarget = "contentholder";
	var content = ""; //resetting content to null
	for(i=0; i<nposts; i++) {
		headingsli[i] = replyarr[(4*i)];
		storiesli[i] = replyarr[(1+(4*i))];
				var endpos = storiesli[i].indexOf(".") + 1;
				if(endpos > 110 || endpos == -1 || endpos < 30) {
					endpos = 110;
				}
			storyteasesli[i] = storiesli[i].substring(0,endpos) + "<span class='more'>...</span>";
		imagesli[i] = replyarr[(2+(4*i))];
		captionsli[i] = replyarr[(3+(4*i))];
        content = content + '<li id="list'+i+'" class="resultli" ontouchstart="assignfull('+i+')" ontouchend="touchEnd(event)"><span class="shead sfull">'+headingsli[i]+'</span><span class="stease sfull">'+storyteasesli[i]+'</a></span></li>';
	}	
	document.getElementById("sresultsul").innerHTML = content;
hideblanket('resultpage');
showbackbtn();
}

function genclass_fin() { //covers our classified replies
    replyarr = reply.split("^");
    var nposts = (replyarr.length)/3;
    headingsli = new Array;
	linksli = new Array;
    storiesli = new Array;
    	imagesli = new Array; //just defining these now, not used here
    	captionsli = new Array; //just defining these now, not used here
	backtarget = "contentholder";
	var content = ""; //resetting content to null
	for(i=0; i<nposts; i++) {
		headingsli[i] = replyarr[(3*i)];
		linksli[i] = replyarr[(1+(3*i))];
        storiesli[i] = replyarr[(2+(3*i))];
        imagesli[i] = ""; //have to blank these out to avoid errors
        captionsli[i] = ""; //have to blank these out to avoid errors
        content = content + '<li id="list'+i+'" class="resultli_classi" ontouchstart="assignfull('+i+')" ontouchend="touchEnd(event)"><span class="shead sfull">'+headingsli[i]+'</span></li>';
	}	
	document.getElementById("sresultsul").innerHTML = content;
    hideblanket('resultpage');
    showbackbtn();
}
    
    
//for the full story page    
function showfull(storyid,source) {
    curX = event.changedTouches[0].pageX;
	curY = event.changedTouches[0].pageY;
	diffX = curX - astartX;
    diffY = curY - astartY;
    if(diffY < 25 && diffY > -25) { //to confirm it's not meant to go vertical
        if(diffX > 25) { //to confirm it's not a clunky tap, and going left>right    
            //this does nothing on this page
        }
        else if(diffX < 25 && diffX > -25) { //it's a tap (and there's a story selected)!
            if(storyid !== "") {
                showblanket();              
                if(source == "list") {
                    backtarget = "resultpage";
                    try {
                        document.getElementById("fullheadline").innerHTML = headingsli[storyid];
                        document.getElementById("phoneheadline").innerHTML = headingsli[storyid];
                        if(imagesli[storyid] != "") {
                            var captiontext = "";
                            if(captionsli[storyid] != "") {
                                captiontext = captionsli[storyid];
                            }
                            document.getElementById("fullimg").innerHTML = '<img id="imgfull" src="'+imagesli[storyid]+'" onload="doResize(&quot;'+imagesli[storyid]+'&quot;)" /><span class="cpn">'+captiontext+'</span>';
                            loadcheck = false;
                            setTimeout("checkload()",10000); //in case the image doesn't load, the story will show after ten seconds
                        }
                        else {
                            document.getElementById("fullimg").innerHTML = ""; //if no img exists for story
                            hideblanket('storyfull');
                        }
                        var storytext = storiesli[storyid].replace(/\r\n/g,"<br/><br/>");  //puts para breaks back in
                        document.getElementById("fullstorytext").innerHTML = storytext;
                    }
                    catch(err) {
                    }
                }
                else {
                    backtarget = "contentholder";
                    try {
                        document.getElementById("fullheadline").innerHTML = headings[storyid];
                        document.getElementById("phoneheadline").innerHTML = headings[storyid];
                        if(images[storyid] != "") {
                            var captiontext = "";
                            if(captions[storyid] != "") {
                                captiontext = captions[storyid];
                            }
                            document.getElementById("fullimg").innerHTML = '<img id="imgfull" src="'+images[storyid]+'" onload="doResize(&quot;'+images[storyid]+'&quot;)"/><span class="cpn">'+captiontext+'</span>';
                        }
                        else {
                            document.getElementById("fullimg").innerHTML = "";
                            hideblanket('storyfull');
                        }			
                        var storytext = stories[storyid].replace(/\r\n/g,"<br/><br/>");
                        document.getElementById("fullstorytext").innerHTML = storytext;
                    }
                    catch(err) {
                    }
                }
            }
            showbackbtn();
        } 
    }
}

    
function checkload() { //checks if the load happened successfully with the image, otherwise shows anyway without the image (to prevent hangs)
    if(loadcheck == false) {
        hideblanket('storyfull'); 
        loadcheck = true;
    }
}
    
function doResize(target) { //for the full story page, resize images that are portrait and make necessary css adjustments to change page layout
			var newImg = new Image();
			newImg.src = target;
			var currwidth = newImg.width;
			var currheight = newImg.height;
			
		if(currheight > currwidth) {
			$("#fullimg img").css("float","right").css("padding","10px 0 0 20px").css("width","50%"); 
            $(".cpn").addClass("cpnport");
			$("#fullheadline").css("margin","0 0 15px 3%");
		}
hideblanket('storyfull');
}

function returnhome() {
checklastupdate();
target = "contentholder";
mainfade = true;
hideblanket(target);
hidebackbtn();
}

function showblanket() {
    showblanketvar = true;
	setTimeout("actuallyShowBlanket()",300);
}
    
function actuallyShowBlanket() {
    if(showblanketvar == true) {    
    $("#blanket").show();
    }
    showblanketvar = false;
}

function resetPositions() {
    $("#contentholder").css("z-index","60").css("-webkit-transform","translate3d(0,0,0)").css("marginLeft","0");
    var screenwidth = window.innerWidth;
    var cssreset = "translate3d(0px,0,0)";
    $("#storyfull, #resultpage").css("z-index","50").css("-webkit-transform",cssreset).css("marginLeft",screenwidth);
    mainfade = false;
    revertAllBg();
}
    
function hideblanket(target) {
    var screenwidth = window.innerWidth;
    var negscreenwidth = -screenwidth;
    var newcurrentslide = "#"+currentslide;
    $(newcurrentslide).css("z-index","50");
	var newtarget = "#"+target;
    showblanketvar = false;
    $("#blanket").css("display","none");
    $(newtarget).css("display","block").css("z-index","60");
    
    if (mainfade === true && newtarget == "#contentholder") {
            resetPositions();
    }
    
    else if(newcurrentslide == "#contentholder" && newtarget == "#resultpage") {
        resetPositions();
        var cssslidein = "translate3d("+negscreenwidth+"px,0,0)";
        var cssslideout = "translate3d("+negscreenwidth+"px,0,0)";
        setTimeout(function() {
                   $(newtarget).css("-webkit-transform",cssslidein);
                   $(newcurrentslide).css("-webkit-transform",cssslideout);
                   revertAllBg();
                   },20);
    }
    
    else if (newcurrentslide == "#resultpage" && newtarget == "#storyfull") {
        var cssslidein = "translate3d("+negscreenwidth+"px,0,0)";
        var cssslideout = "translate3d("+(2*negscreenwidth)+"px,0,0)";
        setTimeout(function() {
                   $(newtarget).css("-webkit-transform",cssslidein);
                   $(newcurrentslide).css("-webkit-transform",cssslideout);
                   revertAllBg();
                   },20);
    }
    
    else if (newcurrentslide == "#contentholder" && newtarget == "#storyfull") {
        resetPositions();
        var cssslidein = "translate3d("+negscreenwidth+"px,0,0)";
        var cssslideout = "translate3d("+negscreenwidth+"px,0,0)";
        setTimeout(function() {
                   $(newtarget).css("-webkit-transform",cssslidein);
                   $(newcurrentslide).css("-webkit-transform",cssslideout);
                   revertAllBg();
                   },20);    
    }

    else if(newcurrentslide == "#storyfull" && newtarget == "#resultpage") {
        var cssslidein = "translate3d("+negscreenwidth+"px,0,0)";
        var cssslideoutfirst = "translate3d("+screenwidth+"px,0,0)";
        var cssslideout = "translate3d(0,0,0)";
        setTimeout(function() {
                   $(newtarget).css("-webkit-transform",cssslidein);
                   $(newcurrentslide).css("-webkit-transform",cssslideoutfirst);
                   setTimeout(function() { 
                              $(newcurrentslide).css("-webkit-transform",cssslideout);
                              },350);
                   revertAllBg();
                   },20);
    }   
    
    else if(newcurrentslide == "#contentholder" && newtarget == "#contentholder") { //first load
     $("#blanket").hide();
        $("#resultpage, #storyfull").hide().css("z-index","50");
        $("#contentholder").fadeIn(500).css("z-index","60");
        mainfade = false;
        revertAllBg();
        hidebackbtn();
    }
    
    else if (newcurrentslide == "#resultpage" && newtarget == "#resultpage") {
        revertAllBg();
    }
    
    loadcheck = true;
    
    if(orientflag == true) {
        setTimeout(function() {
                   resetPositions();
                   returnhome();
                    orientflag = false;
                   },50);
    }

    setTimeout(function() {
               scroll3.scrollTo(80,0,500);
               scroll2.scrollTo(80,0,500);
               },500);
    setTimeout(function() {
               refreshscroll();
               mainfade = false;
               currentslide = target;
               },600);
    $(newtarget).css("z-index","60");
}

function prev() { //to return to previous page with a slide
    var screenwidth = window.innerWidth;
    var negscreenwidth = -screenwidth;	
    mainfade = false;
    newcurrentslide = "#"+currentslide;
    
    if (newcurrentslide == "#resultpage" && backtarget == "contentholder") {
        var cssslidein = "translate3d(0,0,0)";
        var cssslideout = "translate3d(0,0,0)";
        setTimeout(function() {
                   $("#"+backtarget).css("-webkit-transform",cssslidein);
                   $(newcurrentslide).css("-webkit-transform",cssslideout);
               currentslide = backtarget;
                   hidebackbtn();
                   },20);   
        setTimeout("resetPositions()",650);
    }
    
    else if (newcurrentslide == "#storyfull" && backtarget == "contentholder") {
        var cssslidein = "translate3d(0,0,0)";
        var cssslideout = "translate3d(0,0,0)";
        setTimeout(function() {
                   $("#"+backtarget).css("-webkit-transform",cssslidein);
                   $(newcurrentslide).css("-webkit-transform",cssslideout);
                currentslide = backtarget;
                   hidebackbtn();
                   },20);   
        setTimeout("resetPositions()",650);        
    }
    
    else if (newcurrentslide == "#storyfull" && backtarget == "resultpage") {
        var cssslidein = "translate3d("+negscreenwidth+"px,0,0)";
        var cssslideout = "translate3d(0,0,0)";
        setTimeout(function() {
                   $("#"+backtarget).css("-webkit-transform",cssslidein);
                   $(newcurrentslide).css("-webkit-transform",cssslideout);
                   backtarget = "contentholder";
                   currentslide = "resultpage";
                   },20);  
    }
    
    if(orientflag == true) {
        setTimeout(function() {
                   resetPositions();
                   returnhome();
                    orientflag = false;
                   },50);
    }
    
    $("#"+backtarget).css("z-index","60");
    $(newcurrentslide).css("z-index","50");

    setTimeout(function() {
               refreshscroll();
               },550);
}

//menu stuff here    
function showmenu() {
    if($("#menuholder").css("opacity") > 0) {
        hidemenu();
    }
    else {
        $("#menuholder,#clearfix").css("opacity","1");
        $("#menuholder").css("zIndex","96");
        $("#clearfix").css("zIndex","95");
        document.getElementById("menuimg").src = "Menu_Btn_Selected.gif";
    }
}
    
function hidemenu() {
    $("#menuholder,#clearfix").css("opacity","0");
    setTimeout(function() {
               $("#menuholder,#clearfix").css("zIndex","-100");
               $(".menuitem").css("backgroundColor","#FFF").css("color","#444");
               $("#clearfix").css("backgroundColor","rgba(255,255,255,0.5)");
               },250);
    document.getElementById("menuimg").src = "Menu_Btn.gif";
}
 
function menuSelect(choice) {
    gencontent(choice);
    hidemenu();
}

function showbackbtn() {
    if($("#backdiv").css("display") == "none") {
        $("#backdiv").fadeIn(500);
    }
}
    
function hidebackbtn() {
    if($("#backdiv").css("display") == "block") {
        $("#backdiv").fadeOut(250);
    }
}
    
    bgcss = "-webkit-gradient(linear,left top,left bottom, color-stop(0.0, #00A0F8), color-stop(1.0, #0077EB))";
 
$(".resultli, .resultli_classi, #mainframe, #botrt, #botmid, #botlft, #toprt, #midrt, .menuitem").live({
    touchstart: function() {

    },
    touchmove: function() {
        hlflag = false;
    },
    touchend: function() {
        if(hlflag != false) {
            $(this).css("backgroundImage",bgcss).css("color","#FFF");
            $(this).find("a").css("color","#FFF");
            $(this).find(".shead").css("color","#FFF");
        }
        hlflag = true;
    },
})
    
function revertAllBg() {
    setTimeout(function() {
               $(".resultli, .resultli_classi, #mainframe, #botrt, #botmid, #botlft, #toprt, #midrt, .menuitem").css("backgroundImage","none").css("backgroundColor","#FFF").css("color","#222");
               $(".shead").css("color","#222");
               $("#mainframe a, #botrt a, #botmid a, #botlft a, #toprt a, #midrt a").css("color","#222");
               $("#story0 a, .story a").css("color","#666");
               },800);
    hlflag = true;
}
    
$("#backdiv").live({
    touchstart: function() {
        document.getElementById("backimg").src = "Back_Btn_Selected.gif";
    },
    touchend: function() {
        document.getElementById("backimg").src = "Back_Btn.gif";
    }
})
    








            (function() {
                var jasmineEnv = jasmine.getEnv();
                jasmineEnv.updateInterval = 1000;

                var htmlReporter = new jasmine.HtmlReporter();

                jasmineEnv.addReporter(htmlReporter);

                jasmineEnv.specFilter = function(spec) {
                    return htmlReporter.specFilter(spec);
                };

                var currentWindowOnload = window.onload;

                window.onload = function() {
                    if (currentWindowOnload) {
                        currentWindowOnload();
                    }
                    execJasmine();
                };

                function execJasmine() {
                    jasmineEnv.execute();
                }
            })();
        






window.onorientationchange = function() {
	orientflag = true;
	setTimeout(function() {
		screenwidth = window.innerWidth;
		$("#scrollwrap3").css("width",screenwidth)		
	},500); //delay this so that android has time to realise the new width
}

$(document).ready(function() {
	onDeviceReady();
});
	
function onDeviceReady() {
    showblanket(); //bringing the blanket up while we get things organised
    //    var timework = new Date();
     //   currenttime = timework.getTime();
    //    lastupdate = window.localStorage.getItem("lastupdated");
    //checkconnection(); //can we connect?
    backtarget = "contentholder"; //init this var as the first page to load
    currentslide = "contentholder";
    targetstory = null; //init this var for catching taps on the results page late
    hlflag = true;
    orientflag = false;
	screenwidth = window.innerWidth;
	populate("featured");
	navigator.splashscreen.hide();
}
  
function showblanket() {
    showblanketvar = true;
    $("#blanket").css("zIndex","100");
	actuallyShowBlanket();
}
    
function actuallyShowBlanket() {
    if(showblanketvar == true) { //confirm that the blanket isn't already displayed   
	$("#blanket").css("opacity","1");
    }
    showblanketvar = false;
}  
 
//populates content on the main page
function populate(lookup) {
	var targ = "http://www.theweeklyadvertiser.com.au/populate_app.php";
	var sendstring = "categorylook="+lookup;
	var callback = "showfeatured";
	genericReq(targ,sendstring,callback);
}

function showfeatured() { //for the main page content
	showblanket();
    timework = new Date;
    currenttime = timework.getTime();
    lastupdate = currenttime;
    window.localStorage.setItem("lastupdated",lastupdate);
	//hidebackbtn();
	replyarr = reply.split("^");
	var nposts = (replyarr.length-1)/4;
	headings = new Array;
	images = new Array;
	stories = new Array;
	storyteases = new Array; //the first sentence, or 100 chars for the tease...
	captions = new Array;
	for(i=0; i<nposts; i++) {
		headings[i] = replyarr[(4*i)];
		stories[i] = replyarr[(1+(4*i))];
			var endpos = stories[i].indexOf(".") + 1;
				if(endpos > 100 || endpos == -1 || endpos < 30) {
					endpos = 100;
				}
			storyteases[i] = stories[i].substring(0,endpos) + "<span class='more'>...</span>";
		images[i] = replyarr[(2+(4*i))];
		captions[i] = replyarr[(3+(4*i))];
		try {
			document.getElementById("imga"+i).innerHTML = '<img id="img'+i+'" src="'+images[i]+'" onload="resizeMainImgs(&quot;'+i+'&quot;)" alt="Image" />';
			document.getElementById("headline"+i).innerHTML = "<a href='#'>" + headings[i] + "</a>"; <!-- ontouchstart='touchStart(event)' ontouchend='showfull("+i+")'-->
			document.getElementById("story"+i).innerHTML = "<a href='#'>" + storyteases[i] + "</a>";<!-- ontouchstart='touchStart(event)' ontouchend='showfull("+i+")'-->
		}
		catch (err) {
		}
	}
}
 
function resizeMainImgs(imgnum) { //resizes or crops images on the main page
	var newImg = new Image();
	newImg.src = images[imgnum];
	var currwidth = newImg.width;
	var currheight = newImg.height;
	var screenwidth = window.innerWidth;
		wd = 94;
		ht = 94;
	var elem = "#img"+imgnum;
	if(currheight > currwidth) { //if image is in portrait
		var resizeRatio = wd / currwidth;
		currheight = currheight * resizeRatio;
		$(elem).css("width",wd);
		$(elem).css("height",currheight);
	}
	else {
		var resizeRatio = ht / currheight; 
		currwidth = currwidth * resizeRatio; 
		// if(currwidth > wd) { //if image is wider than window
			// var marg = -Math.round((currwidth - wd) / 2);
			// $(elem).css("marginLeft",marg);
		// }
		// else {
			// $(elem).css("width",wd);
		// }
	}
    if(imgnum == 5) { //if this is the last image then show the page
        hideblanket('contentholder');
    }
} 
 
//these events are for the pages where we want native scrolling and tap events as well as custom "back" swipes    
function touchStart(event) {
	// var touch = event.touches[0];
	// var node = touch.target;
	// astartX = touch.pageX;
	// astartY = touch.pageY;
}

function touchEnd(event) {
	// curX = event.changedTouches[0].pageX;
	// curY = event.changedTouches[0].pageY;
	// diffX = curX - astartX;
    // diffY = curY - astartY;
    // if(diffY < 25 && diffY > -25) { //to confirm it's not meant to go vertical
        // if(diffX > 25) { //to confirm it's not a clunky tap, and going left>right    
            // prev(); //the swipe wants us to go back to the previous page
        // }
        // else if(diffX < 25 && diffX > -25) { //it's a tap (and there's a story selected)!
            // if(targetstory >= 0 && targetstory !== null) {
                // //showfull(targetstory,"list"); //shows the story that was tapped on
            // }
        // }
    // }
	// else  {
	// }
// targetstory = null; //resetting this value
}
    
function assignfull(liststoryid) {
    targetstory = liststoryid;  //this sets the value of the story that has been touched
}

//initialising some fun variables and generic AJAX requests    
mainpagedivs = new Array ("mainframe","toprt","midrt","botlft","botmid","botrt");

function genericReq(targ,sendstring,callback) {
	var xmlhttp = new XMLHttpRequest(); 
	xmlhttp.open("POST",targ,true);
	xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	xmlhttp.send(sendstring);
	xmlhttp.onreadystatechange = function() {
		if (xmlhttp.readyState == 4) {
			if (xmlhttp.status == 200) {
				reply  = xmlhttp.responseText;
				var fn = new Function(callback+"()");
				fn(); //runs the dynamically named callback function
			}
		}
	}
}

function checklastupdate() {
	timework = new Date();
	currenttime = timework.getTime();
	if(lastupdate == null || lastupdate == "" || lastupdate.length == 0) {
		populate('featured');
	}
	else if(currenttime > (lastupdate + (1000*60*60))) { //one hour ago
			populate('featured');
   }
}
    
function gencontent(section) { //for the results page content (summary of stories by section)
    $("#resultpage, #storyfull, #contentholder").hide();
	var targ = "http://www.theweeklyadvertiser.com.au/populate_app.php";
	//var targ = "populate_app.php";
	var sendstring = "categorylook="+section+"&nresults=18";
	var callback = "gencontent_fin";
    if(section == "classifieds") { //changes string and callback variables for classifieds
        sendstring = sendstring+"&isclassified=true";
        callback = "genclass_fin";
    }
    else if(section == "aboutus" || section == "advertise" || section == "contactus") { //settings for these three set items
        callback = "geninf_fin";
    }
    else if(section == "readonline") {
        //window.location = "http://www.theweeklyadvertiser.com.au/latestPDF.php?"+currenttime;
        navigator.app.loadUrl("http://www.theweeklyadvertiser.com.au/readonline/", { openExternal:true });
        hideblanket('contentholder');
        return false;
    }
	genericReq(targ,sendstring,callback);
    var termvars = new Array ("featured","news","sport","breaking","community","opinion","foodwine","healthlife","environment","government","artsent","business","toeditor","countrytoday","motoring","travel","classifieds","aboutus","advertise","contactus");
    var termheadings = new Array ("Featured","News","Sport","Breaking","Community","Opinion","Food &amp; Wine","Health &amp; Lifestyle","Environment","Government","Arts &amp; Entertainment","Business","To The Editor","Country Today","Motoring","Travel","Classified Sections","About Us","Advertise With Us","Contact Us");
    var spos = termvars.indexOf(section);
    var sheadtext = termheadings[spos];
    document.getElementById("sheading").innerHTML = sheadtext;
	hideblanket("resultpage");
}

function geninf_fin() {
    reply = reply.replace(/\r\n/g,"<br/>");  //puts para breaks back in
    var regexA = new RegExp("<strong>","g");
	reply = reply.replace(regexA,"<span class='boldme'>");
    var regexB = new RegExp("</strong>","g");
    reply = reply.replace(regexB,"</span>");
    var content = "<div class='aac_info'>"+reply+"</div>"; 
	document.getElementById("sresultsul").innerHTML = content;
    hideblanket('resultpage');
    //showbackbtn();  
}
    
function gencontent_fin() {
	replyarr = reply.split("^");
	var nposts = (replyarr.length-1)/4;
	headingsli = new Array;
	imagesli = new Array;
	storiesli = new Array;
	storyteasesli = new Array;
	captionsli = new Array;
	backtarget = "contentholder";
	var content = ""; //resetting content to null
	for(i=0; i<nposts; i++) {
		headingsli[i] = replyarr[(4*i)];
		storiesli[i] = replyarr[(1+(4*i))];
				var endpos = storiesli[i].indexOf(".") + 1;
				if(endpos > 110 || endpos == -1 || endpos < 30) {
					endpos = 110;
				}
			storyteasesli[i] = storiesli[i].substring(0,endpos) + "<span class='more'>...</span>";
		imagesli[i] = replyarr[(2+(4*i))];
		captionsli[i] = replyarr[(3+(4*i))];
        content = content + '<li id="list'+i+'" class="resultli" ontouchstart="assignfull('+i+')" onclick="showfull(targetstory,&apos;list&apos;)"><span class="shead sfull resultheadtext">'+headingsli[i]+'</span><span class="stease sfull">'+storyteasesli[i]+'</a></span></li>';
	}	
	document.getElementById("sresultsul").innerHTML = content;
hideblanket('resultpage');
//showbackbtn();
}

function genclass_fin() { //covers our classified replies
    replyarr = reply.split("^");
    var nposts = (replyarr.length)/3;
    headingsli = new Array;
	linksli = new Array;
    storiesli = new Array;
    	imagesli = new Array; //just defining these now, not used here
    	captionsli = new Array; //just defining these now, not used here
	backtarget = "contentholder";
	var content = ""; //resetting content to null
	for(i=0; i<nposts; i++) {
		headingsli[i] = replyarr[(3*i)];
		linksli[i] = replyarr[(1+(3*i))];
        storiesli[i] = replyarr[(2+(3*i))];
        imagesli[i] = ""; //have to blank these out to avoid errors
        captionsli[i] = ""; //have to blank these out to avoid errors
        content = content + '<li id="list'+i+'" class="resultli_classi" ontouchstart="assignfull('+i+')" ontouchend="touchEnd(event)"><span class="shead sfull">'+headingsli[i]+'</span></li>';
	}	
	document.getElementById("sresultsul").innerHTML = content;
    hideblanket('resultpage');
    //showbackbtn();
}
    
    
//for the full story page    
function showfull(storyid,source) {
	showblanket(); 
	$("#resultpage").hide();
	window.scrollTo(0,0);
	setTimeout(function() {
		if(source == "list") {
			backtarget = "resultpage";
			try {
				document.getElementById("fullheadline").innerHTML = headingsli[storyid];
				document.getElementById("phoneheadline").innerHTML = headingsli[storyid];
				if(imagesli[storyid] != "") {
					var captiontext = "";
					if(captionsli[storyid] != "") {
						captiontext = captionsli[storyid];
					}
					document.getElementById("fullimg").innerHTML = '<img id="imgfull" src="'+imagesli[storyid]+'" onload="doResize(&quot;'+imagesli[storyid]+'&quot;)" /><span class="cpn">'+captiontext+'</span>';
					loadcheck = false;
					setTimeout("checkload()",10000); //in case the image doesn't load, the story will show after ten seconds
				}
				else {
					document.getElementById("fullimg").innerHTML = ""; //if no img exists for story
					hideblanket('storyfull');
				}
				var storytext = storiesli[storyid].replace(/\r\n/g,"<br/><br/>");  //puts para breaks back in
				document.getElementById("fullstorytext").innerHTML = storytext;
			}
			catch(err) {
			}
		}
		else {
			backtarget = "contentholder";
			try {
				$("#scrollwrap3").css("width",screenwidth).show();
				document.getElementById("fullheadline").innerHTML = headings[storyid];
				document.getElementById("phoneheadline").innerHTML = headings[storyid];
				if(images[storyid] != "") {
					var captiontext = "";
					if(captions[storyid] != "") {
						captiontext = captions[storyid];
					}
					document.getElementById("fullimg").innerHTML = '<img id="imgfull" src="'+images[storyid]+'" onload="doResize(&quot;'+images[storyid]+'&quot;)"/><span class="cpn">'+captiontext+'</span>';
				}
				else {
					document.getElementById("fullimg").innerHTML = "";
					setTimeout(function() {
						hideblanket('storyfull');
					},500);
				}			
				var storytext = stories[storyid].replace(/\r\n/g,"<br/><br/>");
				document.getElementById("fullstorytext").innerHTML = storytext;
			}
			catch(err) {
			}
		}
	},200);
}

function doResize(target) { //for the full story page, resize images that are portrait and make necessary css adjustments to change page layout
	var newImg = new Image();
	newImg.src = target;
	var currwidth = newImg.width;
	var currheight = newImg.height;
	if(currheight > currwidth) {
		$("#fullimg img").css("float","right").css("padding","10px 0 0 20px").css("width","50%"); 
		$(".cpn").addClass("cpnport");
		$("#fullheadline").css("margin","0 0 15px 3%");
	}
	setTimeout(function() {
		hideblanket('storyfull');
	},500);
}

function checkload() { //checks if the load happened successfully with the image, otherwise shows anyway without the image (to prevent hangs)
    if(loadcheck == false) {
        hideblanket('storyfull'); 
        loadcheck = true;
    }
}

function returnhome() {
	showblanket();
	checklastupdate();
	target = "contentholder";
	hidemenu();
	setTimeout(function() {
		hideblanket(target);
	},200);
	//hidebackbtn();
}

function resetPositions() {
    // $("#contentholder").css("z-index","60").css("-webkit-transform","translate3d(0,0,0)").css("marginLeft","0");
    // var screenwidth = window.innerWidth;
    // var cssreset = "translate3d(0px,0,0)";
    // $("#storyfull, #resultpage").css("z-index","50").css("-webkit-transform",cssreset).css("marginLeft",screenwidth);
    revertAllBg();
}
    
function hideblanket(target) {
    var screenwidth = window.innerWidth;
    var negscreenwidth = -screenwidth;
    var newcurrentslide = "#"+currentslide;
    $(newcurrentslide).css("z-index","50");
	var newtarget = "#"+target;
    showblanketvar = false;
    $("#blanket").css("opacity","0");
	setTimeout(function() {
		$("#blanket").css("zIndex","0");
		},500);
    $(newtarget).css("display","block").css("z-index","60");
    if (newtarget == "#contentholder") {
            resetPositions();
			$("#storyfull, #resultpage").hide();
			$("#contentholder").show();
    }
	else if(newtarget == "#resultpage") {
        revertAllBg();
		$("#storyfull, #contentholder").hide();
		setTimeout(function() {
			$("#resultpage").show();			
		},500);	
	}
	else if(newtarget == "#storyfull") {
		revertAllBg();
		$("#contentholder, #resultpage").hide();
        setTimeout(function() {
			$("#storyfull, #scrollwrap3").show();
		   revertAllBg();
		   },20);	
	}
  
    loadcheck = true;
    
    // if(orientflag == true) {
        // setTimeout(function() {
                   // resetPositions();
                   // returnhome();
                    // orientflag = false;
                   // },50);
    // }

    // setTimeout(function() {
               // scroll3.scrollTo(80,0,500);
               // scroll2.scrollTo(80,0,500);
               // },500);
    // setTimeout(function() {
               // refreshscroll();
               // mainfade = false;
               // currentslide = target;
               // },600);
    $(newtarget).css("z-index","60");
}

function prev() { //to return to previous page with a slide
    var screenwidth = window.innerWidth;
    var negscreenwidth = -screenwidth;	
    newcurrentslide = "#"+currentslide;
    
    if (newcurrentslide == "#resultpage" && backtarget == "contentholder") {
        var cssslidein = "translate3d(0,0,0)";
        var cssslideout = "translate3d(0,0,0)";
        setTimeout(function() {
		   $("#"+backtarget).css("-webkit-transform",cssslidein);
		   $(newcurrentslide).css("-webkit-transform",cssslideout);
			currentslide = backtarget;
		   },20);   
        setTimeout("resetPositions()",650);
    }
    
    else if (newcurrentslide == "#storyfull" && backtarget == "contentholder") {
        var cssslidein = "translate3d(0,0,0)";
        var cssslideout = "translate3d(0,0,0)";
        setTimeout(function() {
		   $("#"+backtarget).css("-webkit-transform",cssslidein);
		   $(newcurrentslide).css("-webkit-transform",cssslideout);
			currentslide = backtarget;
		   },20);   
        setTimeout("resetPositions()",650);        
    }
    
    else if (newcurrentslide == "#storyfull" && backtarget == "resultpage") {
        var cssslidein = "translate3d("+negscreenwidth+"px,0,0)";
        var cssslideout = "translate3d(0,0,0)";
        setTimeout(function() {
                   $("#"+backtarget).css("-webkit-transform",cssslidein);
                   $(newcurrentslide).css("-webkit-transform",cssslideout);
                   backtarget = "contentholder";
                   currentslide = "resultpage";
                   },20);  
    }
    
    // if(orientflag == true) {
        // setTimeout(function() {
                   // resetPositions();
                   // returnhome();
                    // orientflag = false;
                   // },50);
    // }
    
    $("#"+backtarget).css("z-index","60");
    $(newcurrentslide).css("z-index","50");

    // setTimeout(function() {
               // refreshscroll();
               // },550);
}

//menu stuff here    
function showmenu() {
    if($("#menuholder").css("opacity") > 0) {
        hidemenu();
    }
    else {
        $("#menuholder,#clearfix").css("opacity","1");
        $("#menuholder").css("zIndex","96");
        $("#clearfix").css("zIndex","95");
        document.getElementById("menuimg").src = "Menu_Btn_Selected.gif";
    }
}
    
function hidemenu() {
    $("#menuholder,#clearfix").css("opacity","0");
    setTimeout(function() {
	   $("#menuholder,#clearfix").css("zIndex","-100");
	   $(".menuitem").css("backgroundColor","#FFF").css("color","#444");
	   $("#clearfix").css("backgroundColor","rgba(255,255,255,0.5)");
	   },250);
    document.getElementById("menuimg").src = "Menu_Btn.gif";
}

function menuSelect(choice) {
	// if(diffYY < 25 && diffYY > -25) { //to confirm it's not meant to go vertical
		// if(diffXX > 25) { //to confirm it's not a clunky tap, and going left>right    
			// //do nothing
		// }
		// else if(diffXX < 25 && diffXX > -25) { //it's a tap!
			showblanket();
			setTimeout(function() {
				gencontent(choice);
				hidemenu();
			},200);
		//}
	//}
}

// function showbackbtn() {
    // if($("#backdiv").css("display") == "none") {
        // $("#backdiv").fadeIn(500);
    // }
// }
    
// function hidebackbtn() {
    // if($("#backdiv").css("display") == "block") {
        // $("#backdiv").fadeOut(250);
    // }
// }
    
bgcss = "-webkit-gradient(linear,left top,left bottom, color-stop(0.0, #00A0F8), color-stop(1.0, #0077EB))";
 
$(".resultli, .resultli_classi, #mainframe, #botrt, #botmid, #botlft, #toprt, #midrt, .menuitem").live({
    touchstart: function() {
    },
    touchmove: function() {
		hlflag = false;
    },
    touchend: function() {
        if(hlflag != false) {
            $(this).css("backgroundImage",bgcss).css("color","#FFF");
            $(this).find("a").css("color","#FFF");
            $(this).find(".shead").css("color","#FFF");
        }
        hlflag = true;
    },
})
    
function revertAllBg() {
    setTimeout(function() {
	   $(".resultli, .resultli_classi, #mainframe, #botrt, #botmid, #botlft, #toprt, #midrt, .menuitem").css("backgroundImage","none").css("backgroundColor","#FFF").css("color","#222");
	   $(".shead").css("color","#222");
	   $("#mainframe a, #botrt a, #botmid a, #botlft a, #toprt a, #midrt a").css("color","#222");
	   $("#story0 a, .story a").css("color","#666");
	   },800);
    hlflag = true;
}
    
// $("#backdiv").live({
    // touchstart: function() {
        // document.getElementById("backimg").src = "Back_Btn_Selected.gif";
    // },
    // touchend: function() {
        // document.getElementById("backimg").src = "Back_Btn.gif";
    // }
// })
// //iscroll stuff    
    // var myscroll;
    // var scroll2;
    // var scroll3;
    // var scroll4;
    
//function iscrollstart() {
	// setTimeout(function() {
			   // myscroll = new iScroll("contentholder", {hScroll: false, hScrollbar: false, vScrollbar: false, momentum: true, lockDirection: true, useTransition: true});
			   // },100);
	// setTimeout(function() {
			   // scroll2 = new iScroll("resultpage", {hScroll: false, hScrollbar: false, vScrollbar: false, momentum: true, lockDirection: true, useTransition: true});
			// },150);
	// setTimeout(function() {
			   // scroll3 = new iScroll("storyfull", {hScroll: false, hScrollbar: false, vScrollbar: false, momentum: true, lockDirection: true, useTransition: true});
			// },150);
	// setTimeout(function() {
			   // scroll4 = new iScroll("wrapper", {hScroll: false, vScroll: false, useTransition: true});
			   // },170);
//}
    
// window.addEventListener("load", iscrollstart, false);

//function refreshscroll() {
	// setTimeout(function() {
							// myscroll.refresh();
							// scroll2.refresh();
							// scroll3.refresh();
							// scroll4.refresh();
						  // },10);
//}    
    
// function checkconnection() { //checks whether there is an internet connection available
    // var networkStatus = navigator.network.connection.type;
    // if(networkStatus == "none" || networkStatus == "unknown") {
        // window.location = "noconnection.html";
    // }
    // else {
        // populate("featured");
    // }
// }    


