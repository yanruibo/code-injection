
var question = [];
//たしざん
question[0] = [];
question[0][0] = [0,0,0];
question[0][1] = [0,1,0];
question[0][2] = [0,2,0];
question[0][3] = [0,3,0];
question[0][4] = [0,4,0];
question[0][5] = [0,5,0];
question[0][6] = [0,6,0];
question[0][7] = [0,7,0];
question[0][8] = [0,8,0];
question[0][9] = [0,9,0];
question[0][10] = [0,10,0];
question[0][11] = [1,0,0];
question[0][12] = [1,1,0];
question[0][13] = [1,2,0];
question[0][14] = [1,3,0];
question[0][15] = [1,4,0];
question[0][16] = [1,5,0];
question[0][17] = [1,6,0];
question[0][18] = [1,7,0];
question[0][19] = [1,8,0];
question[0][20] = [1,9,0];
question[0][21] = [2,0,0];
question[0][22] = [2,1,0];
question[0][23] = [2,2,0];
question[0][24] = [2,3,0];
question[0][25] = [2,4,0];
question[0][26] = [2,5,0];
question[0][27] = [2,6,0];
question[0][28] = [2,7,0];
question[0][29] = [2,8,0];
question[0][30] = [3,0,0];
question[0][31] = [3,1,0];
question[0][32] = [3,2,0];
question[0][33] = [3,3,0];
question[0][34] = [3,4,0];
question[0][35] = [3,5,0];
question[0][36] = [3,6,0];
question[0][37] = [3,7,0];
question[0][38] = [4,0,0];
question[0][39] = [4,1,0];
question[0][40] = [4,2,0];
question[0][41] = [4,3,0];
question[0][42] = [4,4,0];
question[0][43] = [4,5,0];
question[0][44] = [4,6,0];
question[0][45] = [5,0,0];
question[0][46] = [5,1,0];
question[0][47] = [5,2,0];
question[0][48] = [5,3,0];
question[0][49] = [5,4,0];
question[0][50] = [5,5,0];
question[0][51] = [6,0,0];
question[0][52] = [6,1,0];
question[0][53] = [6,2,0];
question[0][54] = [6,3,0];
question[0][55] = [6,4,0];
question[0][56] = [7,0,0];
question[0][57] = [7,1,0];
question[0][58] = [7,2,0];
question[0][59] = [7,3,0];
question[0][60] = [8,0,0];
question[0][61] = [8,1,0];
question[0][62] = [8,2,0];
question[0][63] = [9,0,0];
question[0][64] = [9,1,0];
question[0][65] = [10,0,0];

//ひきざん
question[1] = [];
question[1][0] = [10,0,1];
question[1][1] = [10,1,1];
question[1][2] = [10,2,1];
question[1][3] = [10,3,1];
question[1][4] = [10,4,1];
question[1][5] = [10,5,1];
question[1][6] = [10,6,1];
question[1][7] = [10,7,1];
question[1][8] = [10,8,1];
question[1][9] = [10,9,1];
question[1][10] = [10,10,1];
question[1][11] = [9,0,1];
question[1][12] = [9,1,1];
question[1][13] = [9,2,1];
question[1][14] = [9,3,1];
question[1][15] = [9,4,1];
question[1][16] = [9,5,1];
question[1][17] = [9,6,1];
question[1][18] = [9,7,1];
question[1][19] = [9,8,1];
question[1][20] = [9,9,1];
question[1][21] = [8,0,1];
question[1][22] = [8,1,1];
question[1][23] = [8,2,1];
question[1][24] = [8,3,1];
question[1][25] = [8,4,1];
question[1][26] = [8,5,1];
question[1][27] = [8,6,1];
question[1][28] = [8,7,1];
question[1][29] = [8,8,1];
question[1][30] = [7,0,1];
question[1][31] = [7,1,1];
question[1][32] = [7,2,1];
question[1][33] = [7,3,1];
question[1][34] = [7,4,1];
question[1][35] = [7,5,1];
question[1][36] = [7,6,1];
question[1][37] = [7,7,1];
question[1][38] = [6,0,1];
question[1][39] = [6,1,1];
question[1][40] = [6,2,1];
question[1][41] = [6,3,1];
question[1][42] = [6,4,1];
question[1][43] = [6,5,1];
question[1][44] = [6,6,1];
question[1][45] = [5,0,1];
question[1][46] = [5,1,1];
question[1][47] = [5,2,1];
question[1][48] = [5,3,1];
question[1][49] = [5,4,1];
question[1][50] = [5,5,1];
question[1][51] = [4,0,1];
question[1][52] = [4,1,1];
question[1][53] = [4,2,1];
question[1][54] = [4,3,1];
question[1][55] = [4,4,1];
question[1][56] = [3,0,1];
question[1][57] = [3,1,1];
question[1][58] = [3,2,1];
question[1][59] = [3,3,1];
question[1][60] = [2,0,1];
question[1][61] = [2,1,1];
question[1][62] = [2,2,1];
question[1][63] = [1,0,1];
question[1][64] = [1,1,1];
question[1][65] = [0,0,1];

//たしざん・ひきざん
question[2] = question[0].clone();
for (var i=0; i<question[1].length; i++) {
  question[2].push(question[1][i]);
}

//2けたのたしざん
question[3] = [];
question[3][0] = [10,0,0];
question[3][1] = [10,1,0];
question[3][2] = [10,2,0];
question[3][3] = [10,3,0];
question[3][4] = [10,4,0];
question[3][5] = [10,5,0];
question[3][6] = [10,6,0];
question[3][7] = [10,7,0];
question[3][8] = [10,8,0];
question[3][9] = [10,9,0];
question[3][10] = [11,0,0];
question[3][11] = [11,1,0];
question[3][12] = [11,2,0];
question[3][13] = [11,3,0];
question[3][14] = [11,4,0];
question[3][15] = [11,5,0];
question[3][16] = [11,6,0];
question[3][17] = [11,7,0];
question[3][18] = [11,8,0];
question[3][19] = [12,0,0];
question[3][20] = [12,1,0];
question[3][21] = [12,2,0];
question[3][22] = [12,3,0];
question[3][23] = [12,4,0];
question[3][24] = [12,5,0];
question[3][25] = [12,6,0];
question[3][26] = [12,7,0];
question[3][27] = [13,0,0];
question[3][28] = [13,1,0];
question[3][29] = [13,2,0];
question[3][30] = [13,3,0];
question[3][31] = [13,4,0];
question[3][32] = [13,5,0];
question[3][33] = [13,6,0];
question[3][34] = [14,0,0];
question[3][35] = [14,1,0];
question[3][36] = [14,2,0];
question[3][37] = [14,3,0];
question[3][38] = [14,4,0];
question[3][39] = [14,5,0];
question[3][40] = [15,0,0];
question[3][41] = [15,1,0];
question[3][42] = [15,2,0];
question[3][43] = [15,3,0];
question[3][44] = [15,4,0];
question[3][45] = [16,0,0];
question[3][46] = [16,1,0];
question[3][47] = [16,2,0];
question[3][48] = [16,3,0];
question[3][49] = [17,0,0];
question[3][50] = [17,1,0];
question[3][51] = [17,2,0];
question[3][52] = [18,0,0];
question[3][53] = [18,1,0];
question[3][54] = [19,0,0];
question[3][55] = [0,10,0];
question[3][56] = [1,10,0];
question[3][57] = [2,10,0];
question[3][58] = [3,10,0];
question[3][59] = [4,10,0];
question[3][60] = [5,10,0];
question[3][61] = [6,10,0];
question[3][62] = [7,10,0];
question[3][63] = [8,10,0];
question[3][64] = [9,10,0];
question[3][65] = [0,11,0];
question[3][66] = [1,11,0];
question[3][67] = [2,11,0];
question[3][68] = [3,11,0];
question[3][69] = [4,11,0];
question[3][70] = [5,11,0];
question[3][71] = [6,11,0];
question[3][72] = [7,11,0];
question[3][73] = [8,11,0];
question[3][74] = [0,12,0];
question[3][75] = [1,12,0];
question[3][76] = [2,12,0];
question[3][77] = [3,12,0];
question[3][78] = [4,12,0];
question[3][79] = [5,12,0];
question[3][80] = [6,12,0];
question[3][81] = [7,12,0];
question[3][82] = [0,13,0];
question[3][83] = [1,13,0];
question[3][84] = [2,13,0];
question[3][85] = [3,13,0];
question[3][86] = [4,13,0];
question[3][87] = [5,13,0];
question[3][88] = [6,13,0];
question[3][89] = [0,14,0];
question[3][90] = [1,14,0];
question[3][91] = [2,14,0];
question[3][92] = [3,14,0];
question[3][93] = [4,14,0];
question[3][94] = [5,14,0];
question[3][95] = [0,15,0];
question[3][96] = [1,15,0];
question[3][97] = [2,15,0];
question[3][98] = [3,15,0];
question[3][99] = [4,15,0];
question[3][100] = [0,16,0];
question[3][101] = [1,16,0];
question[3][102] = [2,16,0];
question[3][103] = [3,16,0];
question[3][104] = [0,17,0];
question[3][105] = [1,17,0];
question[3][106] = [2,17,0];
question[3][107] = [0,18,0];
question[3][108] = [1,18,0];
question[3][109] = [0,19,0];

//2けたのひきざん
question[4] = [];
question[4][0] = [19,0,1];
question[4][1] = [19,1,1];
question[4][2] = [19,2,1];
question[4][3] = [19,3,1];
question[4][4] = [19,4,1];
question[4][5] = [19,5,1];
question[4][6] = [19,6,1];
question[4][7] = [19,7,1];
question[4][8] = [19,8,1];
question[4][9] = [19,9,1];
question[4][10] = [18,0,1];
question[4][11] = [18,1,1];
question[4][12] = [18,2,1];
question[4][13] = [18,3,1];
question[4][14] = [18,4,1];
question[4][15] = [18,5,1];
question[4][16] = [18,6,1];
question[4][17] = [18,7,1];
question[4][18] = [18,8,1];
question[4][19] = [17,0,1];
question[4][20] = [17,1,1];
question[4][21] = [17,2,1];
question[4][22] = [17,3,1];
question[4][23] = [17,4,1];
question[4][24] = [17,5,1];
question[4][25] = [17,6,1];
question[4][26] = [17,7,1];
question[4][27] = [16,0,1];
question[4][28] = [16,1,1];
question[4][29] = [16,2,1];
question[4][30] = [16,3,1];
question[4][31] = [16,4,1];
question[4][32] = [16,5,1];
question[4][33] = [16,6,1];
question[4][34] = [15,0,1];
question[4][35] = [15,1,1];
question[4][36] = [15,2,1];
question[4][37] = [15,3,1];
question[4][38] = [15,4,1];
question[4][39] = [15,5,1];
question[4][40] = [14,0,1];
question[4][41] = [14,1,1];
question[4][42] = [14,2,1];
question[4][43] = [14,3,1];
question[4][44] = [14,4,1];
question[4][45] = [13,0,1];
question[4][46] = [13,1,1];
question[4][47] = [13,2,1];
question[4][48] = [13,3,1];
question[4][49] = [12,0,1];
question[4][50] = [12,1,1];
question[4][51] = [12,2,1];
question[4][52] = [11,0,1];
question[4][53] = [11,1,1];
question[4][54] = [10,0,1];

//2けたのたしざん・ひきざん
question[5] = question[3].clone();
for (var i=0; i<question[4].length; i++) {
  question[5].push(question[4][i]);
}








$(document).ready(function(){
  init(3);
})


        var nend_params = {"media":7838,"site":31147,"spot":55048,"type":1,"oriented":2};
        








$(document).ready(function(){
  init(1);
})


        var nend_params = {"media":7838,"site":31147,"spot":55048,"type":1,"oriented":2};
        


redirectMouseToTouch = function(type, originalEvent) 
{

    //stop propagation, and remove default behavior for everything but INPUT, TEXTAREA & SELECT fields
    // originalEvent.stopPropagation();
    if (originalEvent.target.tagName.toUpperCase().indexOf("SELECT") == -1 && 
    originalEvent.target.tagName.toUpperCase().indexOf("TEXTAREA") == -1 && 
    originalEvent.target.tagName.toUpperCase().indexOf("INPUT") == -1)  //SELECT, TEXTAREA & INPUT
    {
        //if(type != 'touchstart')
        //originalEvent.stopPropagation();//originalEvent.preventDefault();
        //else
        //originalEvent.preventDefault();
        originalEvent.stopPropagation();
    }
    
    var touchevt = document.createEvent("Event");
    touchevt.initEvent(type, true, true);
    touchevt.touches = new Array();
    touchevt.touches[0] = new Object();
    touchevt.touches[0].pageX = originalEvent.pageX;
    touchevt.touches[0].pageY = originalEvent.pageY;
    touchevt.touches[0].target = originalEvent.target;
    touchevt.changedTouches = touchevt.touches; //for jqtouch
    touchevt.targetTouches = touchevt.touches; //for jqtouch
    touchevt.target = originalEvent.target;
    originalEvent.target.dispatchEvent(touchevt);
    return touchevt;
}

emulateTouchEvents = function() 
{
    var ee = document;

    document.mouseMoving = false;
    
    
    document.addEventListener("mousedown", function(e) 
    {
        try 
        {
            this.mouseMoving = true;
            var touchevt = redirectMouseToTouch("touchstart", e);
            if (document.ontouchstart)
                document.ontouchstart(touchevt);
            if(e.target.ontouchstart)
                e.target.ontouchstart(e);
            
        } catch (e) {
        }
    });

    //ee[x].onmouseup=function(e)
    document.addEventListener("mouseup", function(e) 
    {
        try 
        {
            this.mouseMoving = false;

            var touchevt = redirectMouseToTouch("touchend", e);
            if (document.ontouchend)
                document.ontouchend(touchevt);
            if(e.target.ontouchend)
                e.target.ontouchend(e);
        } 
        catch (e) {
        }
    });
    //ee[x].onmousemove=function(e)
    document.addEventListener("mousemove", function(e) 
    {
        try 
        {
            if (!this.mouseMoving)
                return
            var touchevt = redirectMouseToTouch("touchmove", e);
            if (document.ontouchmove)
                document.ontouchmove(touchevt);
            if(e.target.ontouchmove)
                e.target.ontouchmove(e);
        } 
        catch (e) {
        }
    });
// }
}
emulateTouchEvents();
window.addEventListener("resize",function(){
var touchevt = document.createEvent("Event");
 touchevt.initEvent("orientationchange", true, true);
    document.dispatchEvent(touchevt);
},false);







$(document).ready(function(){
  init(2);
})


        var nend_params = {"media":7838,"site":31147,"spot":55048,"type":1,"oriented":2};
        


/* 0:たしざん,1:ひきざん,2:たしざん・ひきざん,3:2けたたしざん,4:2けたひきざん,5:2けたたしざん・ひきざん*/
var game_type = 0;
var finish_question = {};
var answer_count = 0;
var now_question = "";
var pinpoonMusic,buuMusic;
var answer = "";

function kekka(isMaru) {
  var src = "img/maru.png";
  if (!isMaru) {
    src = "img/batsu.png";
  }
  var maru = $("<img />")
    .attr({
      id: "kekka",
      src: src})
    .addClass("marubatsu");
  $("body").append(maru);
}

function kekka_hide() {
  $("#kekka").remove();
}

function calc_push(pAnswer) {
  all_btn_off();
  /*
  if (answer.length >= 2) {
    answer = answer.substring(answer.length-1, answer.length);
  }
  if (answer == '0') answer = '';
  answer = answer + pAnswer;
  */
  if (answer == "1") {
    answer = answer + pAnswer;
  } else {
    answer = pAnswer;
  }

  document.getElementById("answer").innerText = answer;
  all_btn_on();
}
function calc_clear() {
  all_btn_off();
  answer = '';
  document.getElementById("answer").innerText = answer;
  all_btn_on();
}
function calc_answer() {
  all_btn_off();
  if (parseInt(answer) == finish_question[get_key(now_question)]) {
    // 正解
    kekka(true);
    try {
      pinpoonMusic.stop();
      buuMusic.stop();
      pinpoonMusic.play();
    } catch (x) {}
    setTimeout(function(){
      kekka_hide();
      next_question();
    }, 1000);
  } else {
    // 不正解
    kekka(false);
    try {
      buuMusic.stop();
      pinpoonMusic.stop();
      buuMusic.play();
    } catch (x) {}
    setTimeout(function(){
      kekka_hide();
      reset_answer();
    }, 1000);
  }
}
function reset_answer() {
  all_btn_on();
  answer = '';
  document.getElementById("answer").innerText = "";
}
function end() {
  navigator.notification.confirm("ひとまわりしました。もういちどやりますか？", function(btn){
    if (btn == 1) {
      answer_count = 0;
      finish_question = {};
      next_question();
    } else {
      location.href="index.html";
    }
  }, "1回おわり", "つづける,やめる");
}
function next_question() {
  all_btn_on();
  reset_answer();
  answer_count++;
  if (answer_count >= question[game_type].length) {
    end();
  }
  var questionIndex;
  while (true) {
    questionIndex = Math.floor(Math.random() * question[game_type].length);
    if (typeof finish_question[get_key(question[game_type][questionIndex])] == 'undefined') {
      now_question = question[game_type][questionIndex];
      break;
	}
  }
  finish_question[get_key(now_question)] = calculation(now_question);
  render_question(now_question);
}
function get_key(questionData) {
  return ''+questionData[0]+((questionData[2]==0)?'+':'-')+questionData[1];
}
function calculation(questionData) {
  if (questionData[2] == 0) {
    return questionData[0]+questionData[1];
  } else {
    return questionData[0]-questionData[1];
  }
}
function render_question(questionData) {
  document.getElementById("question").innerText = get_key(questionData)+"=";
}

function start() {
  try {
    pinpoonMusic = new Media(getBaseURL()+"music/pinpoon.aac", function(){});
    buuMusic = new Media(getBaseURL()+"music/buu.aac", function(){});
  } catch (x) {}
  next_question();
}

function init(type) {
  all_btn_off();
  finish_question = {};
  answer_count = 0;
  now_question = [];
  game_type = type;
  btn_set();
//start();
  // document.addEventListener("touchmove", preventBehavior, false);
  document.addEventListener("deviceready", start, true);
}

function btn_set() {
  $("#game_footer .back").each(function(){
    $(this).bind("touchend", function(){location.href="index.html"});
  });
}

function all_btn_on() {
  $("#calculator td").each(function(){
    if (!$(this).hasClass('answer') && !$(this).hasClass('clear')) {
      $(this).bind("touchstart", function(){calc_push(this.innerText);});
	}
    $(this).css("color", "#ffffff");
  });
}

function all_btn_off() {
  $("#calculator td").each(function(){
    $(this).unbind("touchstart");
    $(this).css("color", "#333333");
  });
}


if(!window.jq||typeof jq!=="function"){var jq=function(g){function x(a,c,b){var d=h.createDocumentFragment();if(b){for(b=a.length-1;b>=0;b--)d.insertBefore(a[b],d.firstChild);c.insertBefore(d,c.firstChild)}else{for(b=0;b<a.length;b++)d.appendChild(a[b]);c.appendChild(d)}}function u(a){return a in v?v[a]:v[a]=RegExp("(^|\\s)"+a+"(\\s|$)")}function q(a){for(var c=0;c<a.length;c++)a.indexOf(a[c])!=c&&(a.splice(c,1),c--);return a}function y(a,c){var b=[];if(a==f)return b;for(;a;a=a.nextSibling)a.nodeType==
1&&a!==c&&b.push(a);return b}function z(a,c){try{return c.querySelectorAll(a)}catch(b){return[]}}function p(){}function A(a,c){a.os={};a.os.webkit=c.match(/WebKit\/([\d.]+)/)?!0:!1;a.os.android=c.match(/(Android)\s+([\d.]+)/)||c.match(/Silk-Accelerated/)?!0:!1;a.os.androidICS=a.os.android&&c.match(/(Android)\s4/)?!0:!1;a.os.ipad=c.match(/(iPad).*OS\s([\d_]+)/)?!0:!1;a.os.iphone=!a.os.ipad&&c.match(/(iPhone\sOS)\s([\d_]+)/)?!0:!1;a.os.webos=c.match(/(webOS|hpwOS)[\s\/]([\d.]+)/)?!0:!1;a.os.touchpad=
a.os.webos&&c.match(/TouchPad/)?!0:!1;a.os.ios=a.os.ipad||a.os.iphone;a.os.ios6=a.os.ios&&c.match(/(OS)\s([6])/)?!0:!1;a.os.playbook=c.match(/PlayBook/)?!0:!1;a.os.blackberry=a.os.playbook||c.match(/BlackBerry/)?!0:!1;a.os.blackberry10=a.os.blackberry&&c.match(/Safari\/536/)?!0:!1;a.os.chrome=c.match(/Chrome/)?!0:!1;a.os.opera=c.match(/Opera Mobi/)?!0:!1;a.os.fennec=c.match(/fennec/i)?!0:!1;a.os.supportsTouch=g.DocumentTouch&&h instanceof g.DocumentTouch||"ontouchstart"in g;a.os.desktop=!(a.os.ios||
a.os.android||a.os.blackberry||a.os.opera||a.os.fennec||a.os.supportsTouch);a.feat={};a.feat.nativeTouchScroll=typeof h.documentElement.getElementsByTagName("head")[0].style["-webkit-overflow-scrolling"]!=="undefined"&&a.os.ios}function r(a){return a._jqmid||(a._jqmid=J++)}function K(a,c,b,d){c=B(c);if(c.ns)var e=RegExp("(?:^| )"+c.ns.replace(" "," .* ?")+"(?: |$)");return(j[r(a)]||[]).filter(function(a){return a&&(!c.e||a.e==c.e)&&(!c.ns||e.test(a.ns))&&(!b||a.fn==b||typeof a.fn==="function"&&typeof b===
"function"&&""+a.fn===""+b)&&(!d||a.sel==d)})}function B(a){a=(""+a).split(".");return{e:a[0],ns:a.slice(1).sort().join(" ")}}function C(a,c,b){e.isObject(a)?e.each(a,b):a.split(/\s/).forEach(function(a){b(a,c)})}function s(a,c,b,d,i){var f=r(a),g=j[f]||(j[f]=[]);C(c,b,function(b,c){var f=i&&i(c,b),l=f||c,h=function(b){var c=l.apply(a,[b].concat(b.data));c===!1&&b.preventDefault();return c},f=e.extend(B(b),{fn:c,proxy:h,sel:d,del:f,i:g.length});g.push(f);a.addEventListener(f.e,h,!1)})}function t(a,
c,b,d){var e=r(a);C(c||"",b,function(b,c){K(a,b,c,d).forEach(function(b){delete j[e][b.i];a.removeEventListener(b.e,b.proxy,!1)})})}function L(a){var c=e.extend({originalEvent:a},a);e.each(M,function(b,d){c[b]=function(){this[d]=N;return a[b].apply(a,arguments)};c[d]=O});return c}function D(a,c){if(c&&a.dispatchEvent){var b=e.Event("destroy",{bubbles:!1});a.dispatchEvent(b)}if((b=r(a))&&j[b]){for(var d in j[b])a.removeEventListener(j[b][d].e,j[b][d].proxy,!1);delete j[b]}}function E(a,c){if(a){var b=
a.childNodes;if(b&&b.length>0)for(var d in b)E(b[d],c);D(a,c)}}var f,h=g.document,n=[],F=n.slice,v=[],P=1,Q=/^\s*<(\w+)[^>]*>/,k={},o={},m=function(a,c){this.length=0;if(a)if(a instanceof m&&c==f)return a;else if(e.isFunction(a))return e(h).ready(a);else if(e.isArray(a)&&a.length!=f){for(var b=0;b<a.length;b++)this[this.length++]=a[b];return this}else if(e.isObject(a)&&e.isObject(c)){if(a.length==f)a.parentNode==c&&(this[this.length++]=a);else for(b=0;b<a.length;b++)a[b].parentNode==c&&(this[this.length++]=
a[b]);return this}else if(e.isObject(a)&&c==f)return this[this.length++]=a,this;else if(c!==f){if(c instanceof m)return c.find(a)}else c=h;else return this;if(b=this.selector(a,c))if(e.isArray(b))for(var d=0;d<b.length;d++)this[this.length++]=b[d];else this[this.length++]=b;return this},e=function(a,c){return new m(a,c)};e.is$=function(a){return a instanceof m};e.map=function(a,c){var b,d=[],i;if(e.isArray(a))for(i=0;i<a.length;i++)b=c(a[i],i),b!==f&&d.push(b);else if(e.isObject(a))for(i in a)a.hasOwnProperty(i)&&
(b=c(a[i],i),b!==f&&d.push(b));return e([d])};e.each=function(a,c){var b;if(e.isArray(a))for(b=0;b<a.length;b++){if(c(b,a[b])===!1)break}else if(e.isObject(a))for(b in a)if(a.hasOwnProperty(b)&&c(b,a[b])===!1)break;return a};e.extend=function(a){a==f&&(a=this);if(arguments.length===1){for(var c in a)this[c]=a[c];return this}else F.call(arguments,1).forEach(function(b){for(var c in b)a[c]=b[c]});return a};e.isArray=function(a){return a instanceof Array&&a.push!=f};e.isFunction=function(a){return typeof a===
"function"};e.isObject=function(a){return typeof a==="object"};e.fn=m.prototype={constructor:m,forEach:n.forEach,reduce:n.reduce,push:n.push,indexOf:n.indexOf,concat:n.concat,selector:function(a,c){var b,a=a.trim();a[0]==="#"&&a.indexOf(" ")===-1&&a.indexOf(">")===-1?b=c==h?c.getElementById(a.replace("#","")):[].slice.call(z(a,c)):a[0]==="<"&&a[a.length-1]===">"?(b=h.createElement("div"),b.innerHTML=a.trim(),b=[].slice.call(b.childNodes)):b=[].slice.call(z(a,c));return b},oldElement:f,slice:n.slice,
setupOld:function(a){if(a==f)return e();a.oldElement=this;return a},map:function(a){return e.map(this,function(c,b){return a.call(c,b,c)})},each:function(a){this.forEach(function(c,b){a.call(c,b,c)});return this},ready:function(a){(h.readyState==="complete"||h.readyState==="loaded")&&a();h.addEventListener("DOMContentLoaded",a,!1);return this},find:function(a){if(this.length===0)return f;for(var c=[],b,d=0;d<this.length;d++){b=e(a,this[d]);for(var i=0;i<b.length;i++)c.push(b[i])}return e(q(c))},html:function(a,
c){if(this.length===0)return f;if(a===f)return this[0].innerHTML;for(var b=0;b<this.length;b++)c!==!1&&e.cleanUpContent(this[b],!1,!0),this[b].innerHTML=a;return this},text:function(a){if(this.length===0)return f;if(a===f)return this[0].textContent;for(var c=0;c<this.length;c++)this[c].textContent=a;return this},css:function(a,c,b){b=b!=f?b:this[0];if(this.length===0)return f;if(c==f&&typeof a==="string")return g.getComputedStyle(b),b.style[a]?b.style[a]:g.getComputedStyle(b)[a];for(b=0;b<this.length;b++)if(e.isObject(a))for(var d in a)this[b].style[d]=
a[d];else this[b].style[a]=c;return this},empty:function(){for(var a=0;a<this.length;a++)e.cleanUpContent(this[a],!1,!0),this[a].innerHTML="";return this},hide:function(){if(this.length===0)return this;for(var a=0;a<this.length;a++)if(this.css("display",null,this[a])!="none")this[a].setAttribute("jqmOldStyle",this.css("display",null,this[a])),this[a].style.display="none";return this},show:function(){if(this.length===0)return this;for(var a=0;a<this.length;a++)if(this.css("display",null,this[a])==
"none")this[a].style.display=this[a].getAttribute("jqmOldStyle")?this[a].getAttribute("jqmOldStyle"):"block",this[a].removeAttribute("jqmOldStyle");return this},toggle:function(a){for(var c=a===!0?!0:!1,b=0;b<this.length;b++)g.getComputedStyle(this[b]).display!=="none"||a!==f&&c===!1?(this[b].setAttribute("jqmOldStyle",this[b].style.display),this[b].style.display="none"):(this[b].style.display=this[b].getAttribute("jqmOldStyle")!=f?this[b].getAttribute("jqmOldStyle"):"block",this[b].removeAttribute("jqmOldStyle"));
return this},val:function(a){if(this.length===0)return f;if(a==f)return this[0].value;for(var c=0;c<this.length;c++)this[c].value=a;return this},attr:function(a,c){if(this.length===0)return f;if(c===f&&!e.isObject(a))return this[0].jqmCacheId&&k[this[0].jqmCacheId][a]?this[0].jqmCacheId&&k[this[0].jqmCacheId][a]:this[0].getAttribute(a);for(var b=0;b<this.length;b++)if(e.isObject(a))for(var d in a)e(this[b]).attr(d,a[d]);else if(e.isArray(c)||e.isObject(c)||e.isFunction(c)){if(!this[b].jqmCacheId)this[b].jqmCacheId=
e.uuid();k[this[b].jqmCacheId]||(k[this[b].jqmCacheId]={});k[this[b].jqmCacheId][a]=c}else c==null&&c!==f?(this[b].removeAttribute(a),this[b].jqmCacheId&&k[this[b].jqmCacheId][a]&&delete k[this[b].jqmCacheId][a]):this[b].setAttribute(a,c);return this},removeAttr:function(a){for(var c=this,b=0;b<this.length;b++)a.split(/\s+/g).forEach(function(d){c[b].removeAttribute(d);c[b].jqmCacheId&&k[c[b].jqmCacheId][a]&&delete k[c[b].jqmCacheId][a]});return this},prop:function(a,c){if(this.length===0)return f;
if(c===f&&!e.isObject(a)){var b;return this[0].jqmCacheId&&o[this[0].jqmCacheId][a]?this[0].jqmCacheId&&o[this[0].jqmCacheId][a]:!(b=this[0][a])&&a in this[0]?this[0][a]:b}for(b=0;b<this.length;b++)if(e.isObject(a))for(var d in a)e(this[b]).prop(d,a[d]);else if(e.isArray(c)||e.isObject(c)||e.isFunction(c)){if(!this[b].jqmCacheId)this[b].jqmCacheId=e.uuid();o[this[b].jqmCacheId]||(o[this[b].jqmCacheId]={});o[this[b].jqmCacheId][a]=c}else c==null&&c!==f?e(this[b]).removeProp(a):this[b][a]=c;return this},
removeProp:function(a){for(var c=this,b=0;b<this.length;b++)a.split(/\s+/g).forEach(function(d){c[b][d]&&delete c[b][d];c[b].jqmCacheId&&o[c[b].jqmCacheId][a]&&delete o[c[b].jqmCacheId][a]});return this},remove:function(a){a=e(this).filter(a);if(a==f)return this;for(var c=0;c<a.length;c++)e.cleanUpContent(a[c],!0,!0),a[c].parentNode.removeChild(a[c]);return this},addClass:function(a){for(var c=0;c<this.length;c++){var b=this[c].className,d=[],e=this;a.split(/\s+/g).forEach(function(a){e.hasClass(a,
e[c])||d.push(a)});this[c].className+=(b?" ":"")+d.join(" ");this[c].className=this[c].className.trim()}return this},removeClass:function(a){for(var c=0;c<this.length;c++){if(a==f){this[c].className="";break}var b=this[c].className;a.split(/\s+/g).forEach(function(a){b=b.replace(u(a)," ")});this[c].className=b.length>0?b.trim():""}return this},replaceClass:function(a,c){for(var b=0;b<this.length;b++)if(a==f)this[b].className=c;else{var d=this[b].className;a.split(/\s+/g).concat(c.split(/\s+/g)).forEach(function(a){d=
d.replace(u(a)," ")});d=d.trim();this[b].className=d.length>0?(d+" "+c).trim():c}return this},hasClass:function(a,c){if(this.length===0)return!1;c||(c=this[0]);return u(a).test(c.className)},append:function(a,c){if(a&&a.length!=f&&a.length===0)return this;if(e.isArray(a)||e.isObject(a))a=e(a);var b;for(b=0;b<this.length;b++)if(a.length&&typeof a!="string")a=e(a),x(a,this[b],c);else{var d=Q.test(a)?e(a):f;if(d==f||d.length==0)d=h.createTextNode(a);d.nodeName!=f&&d.nodeName.toLowerCase()=="script"&&
(!d.type||d.type.toLowerCase()==="text/javascript")?g.eval(d.innerHTML):d instanceof m?x(d,this[b],c):c!=f?this[b].insertBefore(d,this[b].firstChild):this[b].appendChild(d)}return this},prepend:function(a){return this.append(a,1)},insertBefore:function(a,c){if(this.length==0)return this;a=e(a).get(0);if(!a||a.length==0)return this;for(var b=0;b<this.length;b++)c?a.parentNode.insertBefore(this[b],a.nextSibling):a.parentNode.insertBefore(this[b],a);return this},insertAfter:function(a){this.insertBefore(a,
!0)},get:function(a){a=a==f?0:a;a<0&&(a+=this.length);return this[a]?this[a]:f},offset:function(){if(this.length===0)return f;if(this[0]==g)return{left:0,top:0,right:0,bottom:0,width:g.innerWidth,height:g.innerHeight};else var a=this[0].getBoundingClientRect();return{left:a.left+g.pageXOffset,top:a.top+g.pageYOffset,right:a.right+g.pageXOffset,bottom:a.bottom+g.pageYOffset,width:a.right-a.left,height:a.bottom-a.top}},height:function(){return this.offset().height},width:function(){return this.offset().width},
parent:function(a){if(this.length==0)return f;for(var c=[],b=0;b<this.length;b++)this[b].parentNode&&c.push(this[b].parentNode);return this.setupOld(e(q(c)).filter(a))},children:function(a){if(this.length==0)return f;for(var c=[],b=0;b<this.length;b++)c=c.concat(y(this[b].firstChild));return this.setupOld(e(c).filter(a))},siblings:function(a){if(this.length==0)return f;for(var c=[],b=0;b<this.length;b++)this[b].parentNode&&(c=c.concat(y(this[b].parentNode.firstChild,this[b])));return this.setupOld(e(c).filter(a))},
closest:function(a,c){if(this.length==0)return f;var b=this[0],d=e(a,c);if(d.length==0)return e();for(;b&&d.indexOf(b)==-1;)b=b!==c&&b!==h&&b.parentNode;return e(b)},filter:function(a){if(this.length==0)return f;if(a==f)return this;for(var c=[],b=0;b<this.length;b++){var d=this[b];d.parentNode&&e(a,d.parentNode).indexOf(d)>=0&&c.push(d)}return this.setupOld(e(q(c)))},not:function(a){if(this.length==0)return f;for(var c=[],b=0;b<this.length;b++){var d=this[b];d.parentNode&&e(a,d.parentNode).indexOf(d)==
-1&&c.push(d)}return this.setupOld(e(q(c)))},data:function(a,c){return this.attr("data-"+a,c)},end:function(){return this.oldElement!=f?this.oldElement:e()},clone:function(a){a=a===!1?!1:!0;if(this.length==0)return f;for(var c=[],b=0;b<this.length;b++)c.push(this[b].cloneNode(a));return e(c)},size:function(){return this.length},serialize:function(a){if(this.length==0)return"";for(var c={},b=0;b<this.length;b++)this.slice.call(this[b].elements).forEach(function(a){var b=a.getAttribute("type");if(a.nodeName.toLowerCase()!=
"fieldset"&&!a.disabled&&b!="submit"&&b!="reset"&&b!="button"&&(b!="radio"&&b!="checkbox"||a.checked))c[a.getAttribute("name")]=a.value});return e.param(c,a)}};var G={type:"GET",beforeSend:p,success:p,error:p,complete:p,context:f,timeout:0,crossDomain:!1};e.jsonP=function(a){var c="jsonp_callback"+ ++P,b="",d=h.createElement("script");g[c]=function(f){clearTimeout(b);e(d).remove();delete g[c];a.success.call(void 0,f)};d.src=a.url.replace(/=\?/,"="+c);if(a.error)d.onerror=function(){clearTimeout(b);
a.error.call(void 0,"","error")};e("head").append(d);a.timeout>0&&(b=setTimeout(function(){a.error.call(void 0,"","timeout")},a.timeout));return{}};e.ajax=function(a){var c;try{var b=a||{},d;for(d in G)b[d]||(b[d]=G[d]);if(!b.url)b.url=g.location;if(!b.contentType)b.contentType="application/x-www-form-urlencoded";if(!b.headers)b.headers={};if(!("async"in b)||b.async!==!1)b.async=!0;if(b.dataType)switch(b.dataType){case "script":b.dataType="text/javascript, application/javascript";break;case "json":b.dataType=
"application/json";break;case "xml":b.dataType="application/xml, text/xml";break;case "html":b.dataType="text/html";break;case "text":b.dataType="text/plain";break;default:b.dataType="text/html";break;case "jsonp":return e.jsonP(a)}else b.dataType="text/html";if(e.isObject(b.data))b.data=e.param(b.data);b.type.toLowerCase()==="get"&&b.data&&(b.url+=b.url.indexOf("?")===-1?"?"+b.data:"&"+b.data);if(/=\?/.test(b.url))return e.jsonP(b);if(!b.crossDomain)b.crossDomain=/^([\w-]+:)?\/\/([^\/]+)/.test(b.url)&&
RegExp.$2!=g.location.host;if(!b.crossDomain)b.headers=e.extend({"X-Requested-With":"XMLHttpRequest"},b.headers);var f,l=b.context,h=/^([\w-]+:)\/\//.test(b.url)?RegExp.$1:g.location.protocol;c=new g.XMLHttpRequest;c.onreadystatechange=function(){var a=b.dataType;if(c.readyState===4){clearTimeout(f);var d,e=!1;if(c.status>=200&&c.status<300||c.status===0&&h=="file:"){if(a==="application/json"&&!/^\s*$/.test(c.responseText))try{d=JSON.parse(c.responseText)}catch(g){e=g}else d=c.responseText;c.status===
0&&d.length===0&&(e=!0);e?b.error.call(l,c,"parsererror",e):b.success.call(l,d,"success",c)}else e=!0,b.error.call(l,c,"error");b.complete.call(l,c,e?"error":"success")}};c.open(b.type,b.url,b.async);if(b.withCredentials)c.withCredentials=!0;if(b.contentType)b.headers["Content-Type"]=b.contentType;for(var j in b.headers)c.setRequestHeader(j,b.headers[j]);if(b.beforeSend.call(l,c,b)===!1)return c.abort(),!1;b.timeout>0&&(f=setTimeout(function(){c.onreadystatechange=p;c.abort();b.error.call(l,c,"timeout")},
b.timeout));c.send(b.data)}catch(k){console.log(k)}return c};e.get=function(a,c){return this.ajax({url:a,success:c})};e.post=function(a,c,b,d){typeof c==="function"&&(b=c,c={});d===f&&(d="html");return this.ajax({url:a,type:"POST",data:c,dataType:d,success:b})};e.getJSON=function(a,c,b){typeof c==="function"&&(b=c,c={});return this.ajax({url:a,data:c,success:b,dataType:"json"})};e.param=function(a,c){var b=[];if(a instanceof m)a.each(function(){b.push((c?c+"[]":this.id)+"="+encodeURIComponent(this.value))});
else for(var d in a){var f=c?c+"["+d+"]":d,g=a[d];b.push(e.isObject(g)?e.param(g,f):f+"="+encodeURIComponent(g))}return b.join("&")};e.parseJSON=function(a){return JSON.parse(a)};e.parseXML=function(a){return(new DOMParser).parseFromString(a,"text/xml")};A(e,navigator.userAgent);e.__detectUA=A;if(typeof String.prototype.trim!=="function")String.prototype.trim=function(){this.replace(/(\r\n|\n|\r)/gm,"").replace(/^\s+|\s+$/,"");return this};e.uuid=function(){var a=function(){return((1+Math.random())*
65536|0).toString(16).substring(1)};return a()+a()+"-"+a()+"-"+a()+"-"+a()+"-"+a()+a()+a()};var j={},J=1,R={};e.event={add:s,remove:t};e.fn.bind=function(a,c){for(var b=0;b<this.length;b++)s(this[b],a,c);return this};e.fn.unbind=function(a,c){for(var b=0;b<this.length;b++)t(this[b],a,c);return this};e.fn.one=function(a,c){return this.each(function(b,d){s(this,a,c,null,function(a,b){return function(){var c=a.apply(d,arguments);t(d,b,a);return c}})})};var N=function(){return!0},O=function(){return!1},
M={preventDefault:"isDefaultPrevented",stopImmediatePropagation:"isImmediatePropagationStopped",stopPropagation:"isPropagationStopped"};e.fn.delegate=function(a,c,b){for(var d=0;d<this.length;d++){var f=this[d];s(f,c,b,a,function(b){return function(c){var d,g=e(c.target).closest(a,f).get(0);if(g)return d=e.extend(L(c),{currentTarget:g,liveFired:f}),b.apply(g,[d].concat([].slice.call(arguments,1)))}})}return this};e.fn.undelegate=function(a,c,b){for(var d=0;d<this.length;d++)t(this[d],c,b,a);return this};
e.fn.on=function(a,c,b){return c===f||e.isFunction(c)?this.bind(a,c):this.delegate(c,a,b)};e.fn.off=function(a,c,b){return c===f||e.isFunction(c)?this.unbind(a,c):this.undelegate(c,a,b)};e.fn.trigger=function(a,c,b){typeof a=="string"&&(a=e.Event(a,b));a.data=c;for(c=0;c<this.length;c++)this[c].dispatchEvent(a);return this};e.Event=function(a,c){var b=h.createEvent(R[a]||"Events"),d=!0;if(c)for(var e in c)e=="bubbles"?d=!!c[e]:b[e]=c[e];b.initEvent(a,d,!0,null,null,null,null,null,null,null,null,null,
null,null,null);return b};e.bind=function(a,c,b){if(!a.__events)a.__events={};e.isArray(c)||(c=[c]);for(var d=0;d<c.length;d++)a.__events[c[d]]||(a.__events[c[d]]=[]),a.__events[c[d]].push(b)};e.trigger=function(a,c,b){var d=!0;if(!a.__events)return d;e.isArray(c)||(c=[c]);e.isArray(b)||(b=[]);for(var f=0;f<c.length;f++)if(a.__events[c[f]])for(var g=a.__events[c[f]],h=0;h<g.length;h++)e.isFunction(g[h])&&g[h].apply(a,b)===!1&&(d=!1);return d};e.unbind=function(a,c,b){if(!a.__events)return ret;e.isArray(c)||
(c=[c]);for(var d=0;d<c.length;d++)if(a.__events[c[d]])for(var g=a.__events[c[d]],h=0;h<g.length;h++)if(b==f&&delete g[h],g[h]==b){g.splice(h,1);break}};e.proxy=function(a,c,b){return function(){if(b)return a.apply(c,b);return a.apply(c,arguments)}};var S=function(a,c){for(var b=0;b<a.length;b++)E(a[b],c)};e.cleanUpContent=function(a,c,b){if(a){var d=a.childNodes;d&&d.length>0&&e.asap(S,{},[F.apply(d,[0]),b]);c&&D(a,b)}};var w=[],H=[],I=[];e.asap=function(a,c,b){if(!e.isFunction(a))throw"$.asap - argument is not a valid function";
w.push(a);H.push(c?c:{});I.push(b?b:[]);g.postMessage("jqm-asap","*")};g.addEventListener("message",function(a){a.source==g&&a.data=="jqm-asap"&&(a.stopPropagation(),w.length>0&&w.shift().apply(H.shift(),I.shift()))},!0);return e}(window);"$"in window||(window.$=jq);if(!window.numOnly)window.numOnly=function(g){if(g===void 0||g==="")return 0;if(isNaN(parseFloat(g)))if(g.replace)g=g.replace(/[^0-9.-]/,"");else return 0;return parseFloat(g)}};








$(document).ready(function(){
  init(4);
})


        var nend_params = {"media":7838,"site":31147,"spot":55048,"type":1,"oriented":2};
        












$(document).ready(function(){
  init(5);
})


        var nend_params = {"media":7838,"site":31147,"spot":55048,"type":1,"oriented":2};
        








$(document).ready(function(){
  init(0);
})


        var nend_params = {"media":7838,"site":31147,"spot":55048,"type":1,"oriented":2};
        


Array.prototype.clone = function(){
    return Array.apply(null,this)
}
function getBaseURL() {
	var str = location.pathname;
	var i = str.lastIndexOf('/');
	return str.substring(0,i+1);
}

