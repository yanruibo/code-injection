

            window.onerror = function(msg, url, lineNo) 
            {   
                console.log("Line "+lineNo+" in "+url+"\n"+msg);
                //alert("Line "+lineNo+" in "+url+"<br/>"+msg);
            }
        



//Cordova light :D
var cordova={
        fireDocumentEvent:function(boo){}
};

var froccsArray = [
//0
[
[1, 1, "kisfröccs", "small spritzer"]
],
//1
[
[1, 2, "hosszúlépés", "longstep"],
[2, 1, "nagyfröccs", "large spritzer"]
],
//2
[
[1, 4, "sportfröccs", "sport spritzer"],
[2, 3, "viceházmester", "vice-caretaker"],
[3, 2, "házmester", "caretaker"],
[4, 1, "bivalycsók", "buffalo’s kiss"]
],
//3
[
[1, 9, "távolugrás", "longjump"],
[4, 6, "alpolgármester", "vice-mayor"],
[5, 5, "maflás", "haymaker"],
[6, 4, "polgármester", "mayor"],
[7, 3, "avasi fröccs", "avas spritzer"],
[9, 1, "Krúdy fröccs", "Krúdy’s spritzer"]
]
];

var swipe = {
    currentX : 10000,
    currentY : 0,
    startX : 0,
    startY : 0,
    distanceX : 0,
    distanceY : 0,
    isVertical : false,
    /// is touch/move event active?
    isFlicking : false,
    verticalTreshold : 35,
    verticalTresholdBackjump: 100,
    /// is info screen active
    infoScreenActive : false,
    fadeTimeout : 0
};

var bottles = {
    //ratio for width/height
    ratio : 96 / 266,
    //divider width
    dividerWidth : 100,
    //size for bottles
    width : 0,
    height : 0,
    //full width with all the bottles
    slideWidth : 0,
    currentFroccsName : "",
    currentFroccs : 0,
    
    //foccs category
    froccsCategory : 1,
    
    //how many bottles are on the screen
    drinkAmount : -1
};

bottles.drinkAmount = froccsArray[bottles.froccsCategory][0][0] + froccsArray[bottles.froccsCategory][0][1];

var $$ = {};
var $ = $ || {};

function fixInfoScreenContent()
{
    $("#infoScreen").css({
        "height":$$.window.height(),
        "width":$$.window.width()
    })
    
    contNewH=$$.window.height();
    
   
   /*
    if (contNewH>$("#infoScreen div.cont p").height()+360){
        $("#infoScreen").addClass("hugeInfo");
        $("#infoScreen div.cont").css({
        "height": "auto"});
        
    }else{
    */
        $("#infoScreen").removeClass("hugeInfo");
        $("#infoScreen div.cont").css({
        "height": $$.window.height()-(75+66+12+8)
        });
    //}
    
}

/**
 * Return true if this is the first start of the application, otherwise false
 **/
function isThisFirstStart()
{
    //window.localStorage.clear();
    //for test only
    //return true;
    
    //otherwise
    var firstStart = window.localStorage.getItem("firstStart");
    
    if (firstStart=="was")
        return false;
    
     window.localStorage.setItem("firstStart", "was");
     return true;
}

/**
 * Toggle between info and froccs screen
 */
var infoToggleTimeout=null
function toggleInfo(e) {
    e.preventDefault();
    
    if (($("#splash1").is(":visible")) || ($("#splash2").is(":visible")))
        return;
    
    if (infoToggleTimeout!=null)
        {
            clearTimeout(infoToggleTimeout);
            infoToggleTimeout=null;
        }
    swipe.isFlicking=false;
    
    if (swipe.infoScreenActive === false) {
        //make sure its visible
        
        $("#icons").css("opacity",0);
        $("#rotatewrap").addClass("flippedsite");
        
        $$.infoScreen.show();
        fixInfoScreenContent();
        swipe.infoScreenActive= true;
    } else {
        //back to slider page
        $("#icons").css("opacity",1);
        
        $("#rotatewrap").removeClass("flippedsite");
        swipe.infoScreenActive= false;
    }
    
    return false;
}

/**
 * Update the win/soda pages with width
 **/
function updateSheet(forceRedraw) {
    bottles.drinkAmount = froccsArray[bottles.froccsCategory][0][0] + froccsArray[bottles.froccsCategory][0][1];
    if ((forceRedraw==false) && ($("#fixWine img").length==bottles.drinkAmount))
        return;
    
    fixInfoScreenContent();
    
    $("body").removeClass("afterTouchUp");

    //clear and add the bottles
    if ($("#fixWine img").length!=bottles.drinkAmount)
        {
            $$.fixWine.empty();
            $$.fixSoda.empty();
            for (i = 0; i < bottles.drinkAmount; i++) {
                $$.fixWine.append($("<img/>").attr("src","assets/wine.png"));
                $$.fixSoda.append($("<img/>").attr("src","assets/soda.png"));        
            }
        }


    //calculate bottle width and height and slideWidth
    windowWidth = $$.window.width();
    windowHeight = $$.window.height();

    bottles.width=windowWidth * 0.9 / bottles.drinkAmount;
    bottles.height = bottles.width / bottles.ratio;

    if (bottles.drinkAmount<5)
    {
        bottles.width=windowWidth * 0.9 / 5;
        bottles.height = bottles.width / bottles.ratio;
    }
    
    if (bottles.height>windowHeight*0.5)
    {
        bottles.height=windowHeight*0.5;
        bottles.width=bottles.height*bottles.ratio;
    }
    
    //rounding
    bottles.width=Math.round(bottles.width);
    bottles.slideWidth=bottles.width * bottles.drinkAmount;

    //fix width for wrapper elements
    $('#soda img, #wine img').css({
        'width' : bottles.width
    });
    
    sheetTop=Math.round ((windowHeight - bottles.height) * 0.50)
    $("#sheet").css({
        'top':sheetTop,
        'width':bottles.slideWidth
    });
    $("#soda").css({
        'height':bottles.height
    });
    $("#fixwine, #fixsoda").css({
        'width' : bottles.slideWidth
    });
    
    //fix divider
    margTop=Math.round ((windowHeight - bottles.height) * 0.42);
    $("#divider").css({
        'margin-top':margTop,
        'height':sheetTop+bottles.height-margTop+15
    });
    

    bottles.currentFroccs = findClosestSpritzer(swipe.currentX);
    
    //redraw guides
    reDrawGuides();
    
    //
    slidePosition(findClosestSpritzer(swipe.currentX)[1]);
        
    //set froccsname
    $('#froccsName').css('-webkit-transition', 'all .5s');
    setTimeout(showFroccsName, 500);
}

/**
 * Get the left position for idx nth bottle
 **/
function getBottlePos(idx) {
    //sheetLeft=$("#wine").offset().left;
    sheetLeft=($$.window.width()-bottles.slideWidth)/2;
    leftPos = bottles.width * idx + sheetLeft;
    return leftPos;
}

/**
 * Redraw vertical lines
 **/
function reDrawGuides() {    
    $('#guides').empty();

    for (i = 0; i < froccsArray[bottles.froccsCategory].length; i++) {
        $('#guides').append(
            $("<img/>").attr('src',"assets/guide.png").css({
                "left":getBottlePos(froccsArray[bottles.froccsCategory][i][0])
            })
            );
    }
}

/**
 * Update the slider texts using a rounded value
 **/ 
function updateSliderText(domWrapper,domAmount,domUnit,value)
{
    //if 0, hide wrapper
    
    if (value<=0)
    {
        domWrapper.css({
            "-webkit-transition":"-webkit-transform .5s",
            "-webkit-transform":'scale(0)'
        });
    }else
    {
        //show it
        domWrapper.css({
            "-webkit-transition":"none",
        });
        
        //if its a liter type
        if ((bottles.froccsCategory === 3) && (value>=bottles.drinkAmount)) {
            domUnit.text("l");
            domAmount.text("1");
        }else{
            domUnit.text("dl");
            domAmount.text(value+"");
        }
    }
}

/**
 * Update slider and wine visibility
 **/
function slidePosition(flickPosX) {
    //float value for bottle display
    wineDeciliter = ((flickPosX - getBottlePos(0)) / bottles.slideWidth) * bottles.drinkAmount;
    //normalize
    wineDeciliter=Math.min(bottles.drinkAmount,Math.max(0,wineDeciliter));
    sodaDeciliter = bottles.drinkAmount - wineDeciliter;
    
    //set label magnify
    magnifyWineAmount = 0.5+wineDeciliter / bottles.drinkAmount;
    magnifySodaAmount = 0.5+sodaDeciliter / bottles.drinkAmount;
    
    wineDeciliter=Math.round(wineDeciliter);
    sodaDeciliter=Math.round(sodaDeciliter);
    
    if (wineDeciliter==bottles.drinkAmount)
        sodaDeciliter=0;
    if (sodaDeciliter==bottles.drinkAmount)
        wineDeciliter=0;
    
    if (wineDeciliter!=0)
    {
        $(".dleft").css({
            "-webkit-transform":'scale(' + magnifyWineAmount + ')'
        });
    }

    if (sodaDeciliter!=0)
    {
        $(".dright").css({
            "-webkit-transform":'scale(' + magnifySodaAmount + ')'
        });
    }
        
    //proper position
    $$.divider.css('left', flickPosX - (bottles.dividerWidth / 2));
    
    //update texts
    updateSliderText($(".dleft"),$("#wineAmount"),$("#wineUnit"), wineDeciliter);
    updateSliderText($(".dright"),$("#sodaAmount"),$("#sodaUnit"), sodaDeciliter);
    
    //wine/sode visibility
    relativeVisibility=flickPosX-getBottlePos(0);
    relativeVisibility=Math.max(0, Math.min(relativeVisibility,bottles.slideWidth));
    
    $$.wine.css({
        'width':Math.round(relativeVisibility)
    });
    $$.soda.css({
        'width':Math.round(bottles.slideWidth-relativeVisibility)
    });
    
}

function findClosestSpritzer(currPos) {
    var foundClosestSpritzer = 0;
    var foundClosestPos = getBottlePos(froccsArray[bottles.froccsCategory][0][0]);

    
    for (var i = 0; i < froccsArray[bottles.froccsCategory].length; i++) {
        var nextSpritzerPos = getBottlePos(froccsArray[bottles.froccsCategory][i][0]);
        if (Math.abs(currPos - nextSpritzerPos) < Math.abs(currPos - foundClosestPos)) {
            foundClosestSpritzer = i;
            foundClosestPos = nextSpritzerPos;
        }
    }
    return [foundClosestSpritzer, foundClosestPos];
}

/**
 * Grab x and y coordinates from any click/touch event
 **/
function grabCoordinates(event)
{
    if (event.type.substr(0,5)=="touch")
    {
        return {
            x:event.originalEvent.touches[0]['pageX'],
            y:event.originalEvent.touches[0]['pageY']
        };
    }else{
        //mouse
        return {
            x:event.pageX,
            y:event.pageY
        };
    }
}

function startFlick(e) {
    e.preventDefault();
                
    if (swipe.infoScreenActive == true)
        return;
    
    if (swipe.isFlicking == true)
        return;
                
    coords=grabCoordinates(e);
    if (coords==null)
        return;
    
    
    $('#wine,#soda').css('-webkit-transition', 'none');
    
    $('#sheet').css('opacity', 1);
    swipe.isFlicking = true;
    
    swipe.startY = coords.y;
    swipe.startX = coords.x;
                
    // horizontal slide
    clearTimeout(swipe.fadeTimeout);
    clearTimeout(sheetChange);
    showGuides();
                
    swipe.currentX = coords.x;
    $('#froccsName').css('-webkit-transition', 'none');
    $('#froccsName').css('opacity', 0);
                
    $("body").removeClass("afterTouchUp");
    $$.divider.css('opacity', 1);
    slidePosition(swipe.currentX);
    
    //check if splashscreen is active
    if (splashStep==1)
    {
        splashStep2();
    }
    
    if (splashStep==3)
    {
        splashStep4();
    }
                
}


/**
 * Move event handler (touch and mouse)
 */
function flick(e) {
    e.preventDefault();
	
    if ((!swipe.isFlicking) || (swipe.infoScreenActive == true))
        return;
        
    coords=grabCoordinates(e);
    if (coords==null)
        return;
            
    swipe.distanceY = swipe.startY - coords.y;
    swipe.distanceX = swipe.startX - coords.x;
        
    if ((splashStep!=2) &&
    (((Math.abs(swipe.distanceY) - Math.abs(swipe.distanceX)) > swipe.verticalTreshold) || swipe.isVertical)) {
        // vert swipe
        if (!swipe.isVertical) {
            hideGuides();
            hideSeparator();
            $('#sheet').css('-webkit-transition', 'all .05s');
        }
        swipe.isVertical = true;
        var swipeTranslate = -swipe.distanceY;
        $('#sheet').css('-webkit-transform', 'translate(0px,' + swipeTranslate + 'px)');
        $('#sheet').css('opacity', 1 - Math.abs(swipeTranslate / ($$.window.height() / 2)));
    } else {
        // horiz
        swipe.currentX = coords.x;
        slidePosition(swipe.currentX);
    }
}

function endFlick(e) {
    e.preventDefault();
        
    if (swipe.infoScreenActive == true)
        return;
    
    if (swipe.isFlicking==false)
        return;
    
    $('#wine,#soda').css('-webkit-transition', 'width .25s');
        
    //vertical swipe
    if (swipe.isVertical) {
        if (Math.abs(swipe.distanceY) > swipe.verticalTresholdBackjump) {
            swipe.isVertical = false;
            var swipeTranslate;
            $('#sheet').css('-webkit-transition', 'all .3s');
            if (swipe.distanceY < 0) {
                swipeTranslate = $$.window.height();
            } else {
                swipeTranslate = -$$.window.height();
            }
            $('#sheet').css('-webkit-transform', 'translate(0px,' + swipeTranslate + 'px)');
            $('#sheet').css('opacity', 0);
            sheetChangeTimeout = setTimeout(sheetChange, 100);
            
            //check if splashscreen is active
           if (splashStep==4)
            {
                splashStep5();
            }
            
        } else {
            swipe.isVertical = false;
            updateSheet(false);
            $('#sheet').css('-webkit-transition', 'all .3s');
            $('#sheet').css('-webkit-transform', 'translate(0px,0px)');
            $('#sheet').css('opacity', 1);
            
            if (splashStep==4)
            {
                splashStepPrepare3();
            }
        }
    }else 
    // Horizontal swipe
    {
        bottles.currentFroccs = findClosestSpritzer(swipe.currentX);
		
        var snappedPos = bottles.currentFroccs[1];
        $("body").addClass("afterTouchUp");
		
        slidePosition(snappedPos);
        showFroccsName();
        hideGuides();
        swipe.fadeTimeout = setTimeout(hideSeparator, 1000);
        
        if (splashStep==2)
            {
                splashStepPrepare3();
            }
        if (splashStep==4)
            {
                splashStepPrepare3();
            }    
    }
        
    swipe.isFlicking = false;
}

function sheetChange() {
    var swipeTranslate;
    if (swipe.distanceY < 0) {
        swipeTranslate = -$$.window.height();
        bottles.froccsCategory--;
        if (bottles.froccsCategory < 0) {
            bottles.froccsCategory = 3
        }
    } else {
        swipeTranslate = $$.window.height();
        bottles.froccsCategory++;
        if (bottles.froccsCategory > 3) {
            bottles.froccsCategory = 0
        }
    }
    $('#sheet').css('-webkit-transition', 'none').css('-webkit-transform', 'translate(0px,' + swipeTranslate + 'px)');
    $('#sheet').css('opacity', 0);
    updateSheet(false);
    $('#sheet').css('-webkit-transition', 'all .3s');
    $('#sheet').css('-webkit-transform', 'translate(0px,0px)');
    $('#sheet').css('opacity', 1);
}

function hideSeparator() {
    // $$.divider.css('-webkit-transition', 'opacity .5s');
    $$.divider.css('opacity', 0);
}

function showFroccsName() {
    bottles.currentFroccsName = froccsArray[bottles.froccsCategory][bottles.currentFroccs[0]][2];
    $('#froccsName').html(bottles.currentFroccsName);
    $('#froccsName').css('-webkit-transition', 'opacity .5s');
    $('#froccsName').css('opacity', 1);
}

function showGuides() {
    $('#guides').css('-webkit-transition', 'opacity .5s');
    $('#guides').css('opacity', 1);
}

function hideGuides() {
    $('#guides').css('-webkit-transition', 'opacity .5s');
    $('#guides').css('opacity', 0);
}

/**
 * Bind events to DOM
 **/
function bindEvents()
{
    $$.window.resize(function () {
        //debugIt("resize");
        updateSheet(true);
    });
    
    //body events
    $("#froccsScreen").bind("touchmove",flick);
    $("#froccsScreen").bind("touchstart",startFlick);
    $("#froccsScreen").bind("touchend touchcancel",endFlick);
    
    //info button
    $("#informationButton").bind("touchstart",function(e){
        if (swipe.infoScreenActive === false) {
            toggleInfo(e);
    }});
    
    //$("button.css3button").bind("touchstart",function(){return false;});
    //$("button.css3button").bind("touchend mousedown",toggleInfo);
        
    //fix overcsroll crap
    $("#infoScreen").bind("touchmove mousemove",function(event){
        event.preventDefault();
    },false);

    var initialY = null;
    $("#infoScreen div.cont").bind("touchstart",function(e){
        coords=grabCoordinates(e);
        initialY = coords.y;
        return true;
    });
    
    $("#infoScreen div.cont").bind("touchcancel touchend",function(e){
        initialY = null;
       return false; 
    });
    
    $("#infoScreen div.cont").bind("touchmove",function(e){
        if(initialY !== null){
            
            coords=grabCoordinates(e);
            var direction   = coords.y - initialY;
            initialY= coords.y;
            var contentNode = $("#infoScreen div.cont");

            
            if((direction > 0) && (contentNode.scrollTop() <= 0)) {
                // The user is scrolling up, and the element is already scrolled to top
                e.preventDefault();
            } else if(direction < 0 && contentNode.scrollTop() >= contentNode[0].scrollHeight - contentNode[0].clientHeight) {
                // The user is scrolling down, and the element is already scrolled to bottom
                e.preventDefault();
            }else{
                contentNode.scrollTop(contentNode.scrollTop()-direction);
            }
            
        }
        return true;
    });
    
    //prevent from leaking to body
    $("#informationButton, #backButton").bind("touchstart",function(e){
        e.preventDefault();
        return false;
    });
    
    $("#backButton").bind("touchend",toggleInfo);

    //splashscreen forward
    $(".splashscreen").bind("touchstart",function(e){ 
        startFlick(e);
        return false;
    });
    $(".splashscreen").bind("touchmove",function(e){ 
        flick(e);
        return false;
    });
    $(".splashscreen").bind("touchend",function(e){ 
        endFlick(e);
        return false;
    });
}

/**
 * Debug function
 **/
function debugIt(msg)
{
    $("#debug").show();
    $("#debug").append($("<div></div>").html(msg));
    //console.log(msg);
}

var splashStep=0;
/**
 * Last step of splash
 **/
function splashStep5()
{
    splashStep=5;
    $("#splash2").hide();
    $("#icons").show();
}
function splashStep4(){
    $("#splash2").css("opacity",0);  
    splashStep=4;
}

function splashStepPrepare3(){
    $("#splash2").css("opacity",1);
    splashStep=3;
}
/**
 * First step of splash is done
 **/
function splashStep2(){
    $("#splash1").css("opacity",0);  
    splashStep=2;
    
    setTimeout(function(){
    $("#splash1").hide();
    },250);
    /*
    setTimeout(function(){
        $("#splash1").hide();
        $("#splash2").css("opacity",0.6);
    },250);
    */
}

/**
 * Show first splash
 **/
function splashStep1(){
    $("#splash1").css("opacity",1);  
    splashStep=1;
}

/**
 * Startup functions
 **/
$(document).ready(function () {
    //error handling
    /*
    window.onerror = function(msg, url, lineNo) 
    {   
        alert("Line "+lineNo+" in "+url+"<br/>"+msg);
        $("#debug").show();
        $("#debug").append($("<div></div>").html("Line "+lineNo+" in "+url+"<br/>"+msg));
        //var trace = printStackTrace();
        //$("#debug").append($("<div></div>").html(trace.join('<br/>')));
    }
       */
    //normal init
    
    $$.window = $(window);
        
    $$.divider = $('#divider');
    $$.froccsScreen = $("#froccsScreen");
    $$.infoScreen = $("#infoScreen");
    $$.wine = $('#wine');
    $$.soda = $('#soda');
    $$.fixSoda = $('#fixsoda');
    $$.fixWine = $('#fixwine');

    $$.divider.css('width', bottles.dividerWidth);
    $('.dleft').css('width', bottles.dividerWidth / 2);
    $('.dright').css('width', bottles.dividerWidth / 2);

    bindEvents();     
    updateSheet(true);
    
    //well, if this is the first start, show tutorial
    if (isThisFirstStart()==true)
        {
            $("#icons").hide();
            setTimeout(function(){
            splashStep1();
            },1500);
        }else{
            $("#splash1").hide();
            $("#splash2").hide();
        }
    
});

// Domain Public by Eric Wendelin http://eriwen.com/ (2008)
//                  Luke Smith http://lucassmith.name/ (2008)
//                  Loic Dachary <loic@dachary.org> (2008)
//                  Johan Euphrosine <proppy@aminche.com> (2008)
//                  Oyvind Sean Kinsey http://kinsey.no/blog (2010)
//                  Victor Homyakov <victor-homyakov@users.sourceforge.net> (2010)

/**
 * Main function giving a function stack trace with a forced or passed in Error
 *
 * @cfg {Error} e The error to create a stacktrace from (optional)
 * @cfg {Boolean} guess If we should try to resolve the names of anonymous functions
 * @return {Array} of Strings with functions, lines, files, and arguments where possible
 */
function printStackTrace(options) {
    options = options || {guess: true};
    var ex = options.e || null, guess = !!options.guess;
    var p = new printStackTrace.implementation(), result = p.run(ex);
    return (guess) ? p.guessAnonymousFunctions(result) : result;
}

printStackTrace.implementation = function() {
};

printStackTrace.implementation.prototype = {
    /**
     * @param {Error} ex The error to create a stacktrace from (optional)
     * @param {String} mode Forced mode (optional, mostly for unit tests)
     */
    run: function(ex, mode) {
        ex = ex || this.createException();
        // examine exception properties w/o debugger
        //for (var prop in ex) {alert("Ex['" + prop + "']=" + ex[prop]);}
        mode = mode || this.mode(ex);
        if (mode === 'other') {
            return this.other(arguments.callee);
        } else {
            return this[mode](ex);
        }
    },

    createException: function() {
        try {
            this.undef();
        } catch (e) {
            return e;
        }
    },

    /**
     * Mode could differ for different exception, e.g.
     * exceptions in Chrome may or may not have arguments or stack.
     *
     * @return {String} mode of operation for the exception
     */
    mode: function(e) {
        if (e['arguments'] && e.stack) {
            return 'chrome';
        } else if (typeof e.message === 'string' && typeof window !== 'undefined' && window.opera) {
            // e.message.indexOf("Backtrace:") > -1 -> opera
            // !e.stacktrace -> opera
            if (!e.stacktrace) {
                return 'opera9'; // use e.message
            }
            // 'opera#sourceloc' in e -> opera9, opera10a
            if (e.message.indexOf('\n') > -1 && e.message.split('\n').length > e.stacktrace.split('\n').length) {
                return 'opera9'; // use e.message
            }
            // e.stacktrace && !e.stack -> opera10a
            if (!e.stack) {
                return 'opera10a'; // use e.stacktrace
            }
            // e.stacktrace && e.stack -> opera10b
            if (e.stacktrace.indexOf("called from line") < 0) {
                return 'opera10b'; // use e.stacktrace, format differs from 'opera10a'
            }
            // e.stacktrace && e.stack -> opera11
            return 'opera11'; // use e.stacktrace, format differs from 'opera10a', 'opera10b'
        } else if (e.stack) {
            return 'firefox';
        }
        return 'other';
    },

    /**
     * Given a context, function name, and callback function, overwrite it so that it calls
     * printStackTrace() first with a callback and then runs the rest of the body.
     *
     * @param {Object} context of execution (e.g. window)
     * @param {String} functionName to instrument
     * @param {Function} function to call with a stack trace on invocation
     */
    instrumentFunction: function(context, functionName, callback) {
        context = context || window;
        var original = context[functionName];
        context[functionName] = function instrumented() {
            callback.call(this, printStackTrace().slice(4));
            return context[functionName]._instrumented.apply(this, arguments);
        };
        context[functionName]._instrumented = original;
    },

    /**
     * Given a context and function name of a function that has been
     * instrumented, revert the function to it's original (non-instrumented)
     * state.
     *
     * @param {Object} context of execution (e.g. window)
     * @param {String} functionName to de-instrument
     */
    deinstrumentFunction: function(context, functionName) {
        if (context[functionName].constructor === Function &&
                context[functionName]._instrumented &&
                context[functionName]._instrumented.constructor === Function) {
            context[functionName] = context[functionName]._instrumented;
        }
    },

    /**
     * Given an Error object, return a formatted Array based on Chrome's stack string.
     *
     * @param e - Error object to inspect
     * @return Array<String> of function calls, files and line numbers
     */
    chrome: function(e) {
        var stack = (e.stack + '\n').replace(/^\S[^\(]+?[\n$]/gm, '').
          replace(/^\s+(at eval )?at\s+/gm, '').
          replace(/^([^\(]+?)([\n$])/gm, '{anonymous}()@$1$2').
          replace(/^Object.<anonymous>\s*\(([^\)]+)\)/gm, '{anonymous}()@$1').split('\n');
        stack.pop();
        return stack;
    },

    /**
     * Given an Error object, return a formatted Array based on Firefox's stack string.
     *
     * @param e - Error object to inspect
     * @return Array<String> of function calls, files and line numbers
     */
    firefox: function(e) {
        return e.stack.replace(/(?:\n@:0)?\s+$/m, '').replace(/^\(/gm, '{anonymous}(').split('\n');
    },

    opera11: function(e) {
        // "Error thrown at line 42, column 12 in <anonymous function>() in file://localhost/G:/js/stacktrace.js:\n"
        // "Error thrown at line 42, column 12 in <anonymous function: createException>() in file://localhost/G:/js/stacktrace.js:\n"
        // "called from line 7, column 4 in bar(n) in file://localhost/G:/js/test/functional/testcase1.html:\n"
        // "called from line 15, column 3 in file://localhost/G:/js/test/functional/testcase1.html:\n"
        var ANON = '{anonymous}', lineRE = /^.*line (\d+), column (\d+)(?: in (.+))? in (\S+):$/;
        var lines = e.stacktrace.split('\n'), result = [];

        for (var i = 0, len = lines.length; i < len; i += 2) {
            var match = lineRE.exec(lines[i]);
            if (match) {
                var location = match[4] + ':' + match[1] + ':' + match[2];
                var fnName = match[3] || "global code";
                fnName = fnName.replace(/<anonymous function: (\S+)>/, "$1").replace(/<anonymous function>/, ANON);
                result.push(fnName + '@' + location + ' -- ' + lines[i + 1].replace(/^\s+/, ''));
            }
        }

        return result;
    },

    opera10b: function(e) {
        // "<anonymous function: run>([arguments not available])@file://localhost/G:/js/stacktrace.js:27\n" +
        // "printStackTrace([arguments not available])@file://localhost/G:/js/stacktrace.js:18\n" +
        // "@file://localhost/G:/js/test/functional/testcase1.html:15"
        var lineRE = /^(.*)@(.+):(\d+)$/;
        var lines = e.stacktrace.split('\n'), result = [];

        for (var i = 0, len = lines.length; i < len; i++) {
            var match = lineRE.exec(lines[i]);
            if (match) {
                var fnName = match[1]? (match[1] + '()') : "global code";
                result.push(fnName + '@' + match[2] + ':' + match[3]);
            }
        }

        return result;
    },

    /**
     * Given an Error object, return a formatted Array based on Opera 10's stacktrace string.
     *
     * @param e - Error object to inspect
     * @return Array<String> of function calls, files and line numbers
     */
    opera10a: function(e) {
        // "  Line 27 of linked script file://localhost/G:/js/stacktrace.js\n"
        // "  Line 11 of inline#1 script in file://localhost/G:/js/test/functional/testcase1.html: In function foo\n"
        var ANON = '{anonymous}', lineRE = /Line (\d+).*script (?:in )?(\S+)(?:: In function (\S+))?$/i;
        var lines = e.stacktrace.split('\n'), result = [];

        for (var i = 0, len = lines.length; i < len; i += 2) {
            var match = lineRE.exec(lines[i]);
            if (match) {
                var fnName = match[3] || ANON;
                result.push(fnName + '()@' + match[2] + ':' + match[1] + ' -- ' + lines[i + 1].replace(/^\s+/, ''));
            }
        }

        return result;
    },

    // Opera 7.x-9.2x only!
    opera9: function(e) {
        // "  Line 43 of linked script file://localhost/G:/js/stacktrace.js\n"
        // "  Line 7 of inline#1 script in file://localhost/G:/js/test/functional/testcase1.html\n"
        var ANON = '{anonymous}', lineRE = /Line (\d+).*script (?:in )?(\S+)/i;
        var lines = e.message.split('\n'), result = [];

        for (var i = 2, len = lines.length; i < len; i += 2) {
            var match = lineRE.exec(lines[i]);
            if (match) {
                result.push(ANON + '()@' + match[2] + ':' + match[1] + ' -- ' + lines[i + 1].replace(/^\s+/, ''));
            }
        }

        return result;
    },

    // Safari, IE, and others
    other: function(curr) {
        var ANON = '{anonymous}', fnRE = /function\s*([\w\-$]+)?\s*\(/i, stack = [], fn, args, maxStackSize = 10;
        while (curr && curr['arguments'] && stack.length < maxStackSize) {
            fn = fnRE.test(curr.toString()) ? RegExp.$1 || ANON : ANON;
            args = Array.prototype.slice.call(curr['arguments'] || []);
            stack[stack.length] = fn + '(' + this.stringifyArguments(args) + ')';
            curr = curr.caller;
        }
        return stack;
    },

    /**
     * Given arguments array as a String, subsituting type names for non-string types.
     *
     * @param {Arguments} object
     * @return {Array} of Strings with stringified arguments
     */
    stringifyArguments: function(args) {
        var result = [];
        var slice = Array.prototype.slice;
        for (var i = 0; i < args.length; ++i) {
            var arg = args[i];
            if (arg === undefined) {
                result[i] = 'undefined';
            } else if (arg === null) {
                result[i] = 'null';
            } else if (arg.constructor) {
                if (arg.constructor === Array) {
                    if (arg.length < 3) {
                        result[i] = '[' + this.stringifyArguments(arg) + ']';
                    } else {
                        result[i] = '[' + this.stringifyArguments(slice.call(arg, 0, 1)) + '...' + this.stringifyArguments(slice.call(arg, -1)) + ']';
                    }
                } else if (arg.constructor === Object) {
                    result[i] = '#object';
                } else if (arg.constructor === Function) {
                    result[i] = '#function';
                } else if (arg.constructor === String) {
                    result[i] = '"' + arg + '"';
                } else if (arg.constructor === Number) {
                    result[i] = arg;
                }
            }
        }
        return result.join(',');
    },

    sourceCache: {},

    /**
     * @return the text from a given URL
     */
    ajax: function(url) {
        var req = this.createXMLHTTPObject();
        if (req) {
            try {
                req.open('GET', url, false);
                //req.overrideMimeType('text/plain');
                //req.overrideMimeType('text/javascript');
                req.send(null);
                //return req.status == 200 ? req.responseText : '';
                return req.responseText;
            } catch (e) {
            }
        }
        return '';
    },

    /**
     * Try XHR methods in order and store XHR factory.
     *
     * @return <Function> XHR function or equivalent
     */
    createXMLHTTPObject: function() {
        var xmlhttp, XMLHttpFactories = [
            function() {
                return new XMLHttpRequest();
            }, function() {
                return new ActiveXObject('Msxml2.XMLHTTP');
            }, function() {
                return new ActiveXObject('Msxml3.XMLHTTP');
            }, function() {
                return new ActiveXObject('Microsoft.XMLHTTP');
            }
        ];
        for (var i = 0; i < XMLHttpFactories.length; i++) {
            try {
                xmlhttp = XMLHttpFactories[i]();
                // Use memoization to cache the factory
                this.createXMLHTTPObject = XMLHttpFactories[i];
                return xmlhttp;
            } catch (e) {
            }
        }
    },

    /**
     * Given a URL, check if it is in the same domain (so we can get the source
     * via Ajax).
     *
     * @param url <String> source url
     * @return False if we need a cross-domain request
     */
    isSameDomain: function(url) {
        return typeof location !== "undefined" && url.indexOf(location.hostname) !== -1; // location may not be defined, e.g. when running from nodejs.
    },

    /**
     * Get source code from given URL if in the same domain.
     *
     * @param url <String> JS source URL
     * @return <Array> Array of source code lines
     */
    getSource: function(url) {
        // TODO reuse source from script tags?
        if (!(url in this.sourceCache)) {
            this.sourceCache[url] = this.ajax(url).split('\n');
        }
        return this.sourceCache[url];
    },

    guessAnonymousFunctions: function(stack) {
        for (var i = 0; i < stack.length; ++i) {
            var reStack = /\{anonymous\}\(.*\)@(.*)/,
                reRef = /^(.*?)(?::(\d+))(?::(\d+))?(?: -- .+)?$/,
                frame = stack[i], ref = reStack.exec(frame);

            if (ref) {
                var m = reRef.exec(ref[1]);
                if (m) { // If falsey, we did not get any file/line information
                    var file = m[1], lineno = m[2], charno = m[3] || 0;
                    if (file && this.isSameDomain(file) && lineno) {
                        var functionName = this.guessAnonymousFunction(file, lineno, charno);
                        stack[i] = frame.replace('{anonymous}', functionName);
                    }
                }
            }
        }
        return stack;
    },

    guessAnonymousFunction: function(url, lineNo, charNo) {
        var ret;
        try {
            ret = this.findFunctionName(this.getSource(url), lineNo);
        } catch (e) {
            ret = 'getSource failed with url: ' + url + ', exception: ' + e.toString();
        }
        return ret;
    },

    findFunctionName: function(source, lineNo) {
        // FIXME findFunctionName fails for compressed source
        // (more than one function on the same line)
        // TODO use captured args
        // function {name}({args}) m[1]=name m[2]=args
        var reFunctionDeclaration = /function\s+([^(]*?)\s*\(([^)]*)\)/;
        // {name} = function ({args}) TODO args capture
        // /['"]?([0-9A-Za-z_]+)['"]?\s*[:=]\s*function(?:[^(]*)/
        var reFunctionExpression = /['"]?([0-9A-Za-z_]+)['"]?\s*[:=]\s*function\b/;
        // {name} = eval()
        var reFunctionEvaluation = /['"]?([0-9A-Za-z_]+)['"]?\s*[:=]\s*(?:eval|new Function)\b/;
        // Walk backwards in the source lines until we find
        // the line which matches one of the patterns above
        var code = "", line, maxLines = Math.min(lineNo, 20), m, commentPos;
        for (var i = 0; i < maxLines; ++i) {
            // lineNo is 1-based, source[] is 0-based
            line = source[lineNo - i - 1];
            commentPos = line.indexOf('//');
            if (commentPos >= 0) {
                line = line.substr(0, commentPos);
            }
            // TODO check other types of comments? Commented code may lead to false positive
            if (line) {
                code = line + code;
                m = reFunctionExpression.exec(code);
                if (m && m[1]) {
                    return m[1];
                }
                m = reFunctionDeclaration.exec(code);
                if (m && m[1]) {
                    //return m[1] + "(" + (m[2] || "") + ")";
                    return m[1];
                }
                m = reFunctionEvaluation.exec(code);
                if (m && m[1]) {
                    return m[1];
                }
            }
        }
        return '(?)';
    }
};

