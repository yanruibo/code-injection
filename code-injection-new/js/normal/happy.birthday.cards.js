


function lodu()
{
	 //alert('sd');
	 startTimeFirst();
	 vall=$(document).height()-$('.z_index').height()+"px"
	//alert($(window).height());
	//alert(vall);

  $(".z_index").css({"left":"1px","top":vall});
  	init(0);
	}
	function hsharearea()
	{
		$("#sharearea").hide();
	}
	function showshare()
	{
		//vall=$(document).width()/15+"px"
	   //alert($(window).height());
	   // alert(vall);
		//vall="222px"

       $(".share_menu").css({"left":10,"top":20});
		$("#sharearea").show();
		}
	var canvas;  
var ctx;
var WIDTH = 600;
var HEIGHT = 600; 
 var glbFunvar=0,dchG=1;
 var imgno=1;
 var imgid=1;
  var refreshIntervalId
  var cata="bd";
  var limit=20;
  $(document).ready(function(){
 // First, we load the URL into a variable
	
	 /* ........for full app only/////////////////////.............
	  varname="cataa";
	 varlimit="limitt";
  var url = window.location.href;
//alert(url);
  // Next, split the url by the ?
  var qparts = url.split("?");

  // Check that there is a querystring, return "" if not
 

  // Then find the querystring, everything after the ?
  var query = qparts[1];
  //alert(cata);

  // Split the query string into variables (separates by &s)
  var vars = query.split("&");

  // Initialize the value with "" as default
  //cata = "";

  // Iterate through vars, checking each one for varname
  for (i=0;i<vars.length;i++)
  {
    // Split the variable by =, which splits name and value
    var parts = vars[i].split("=");
    
    // Check if the correct variable
    if (parts[0] == varname)
    {
      // Load value into variable
      cata = parts[1];

      // End the loop
      //break;
    }
	if (parts[0] == varlimit)
    {
      // Load value into variable
      limit = parts[1];

      // End the loop
      //break;
    }
  }
 
  // Convert escape code
  cata = unescape(cata);
  limit = unescape(limit);
 //alert(cata);
 // alert(limit);
  // Convert "+"s to " "s
  cata.replace(/\+/g," ");
//alert(cata)
  // Return the value
  //return value;
  */
});
  
  ////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////
  /////////////////////////////////
  /////////////////////////
  //////////
  //
function draqImg(x,y,imgSr)
{
var imageObj = new Image();
//var imageObj = new I;
//alert(imgSr);
   imageObj.src = imgSr;
    ctx.drawImage(imageObj, x, y,WIDTH,HEIGHT);
	//var Ar = new Audio();
	// Ar.src = "1.mp3";
   // Ar.play();
	//ctx.rotate(Math.PI / 4);
	}



 
function clear() {
  //ctx.clearRect(0, 0, WIDTH, HEIGHT);
    var canvas = document.getElementById("canvas");
    var context = canvas.getContext("2d");
    context.clearRect(0, 0, canvas.width, canvas.height);
	//alert("hi");
}
function draw(path) {
  clear();
   
  //imgno=1
  //alert(cata);
  draqImg(0,0,""+cata+"1/"+path+"/"+imgno+".gif")
  //alert(""+cata+"1/"+path+"/"+imgno+".gif");
 // alert(imgno);
  imgno=imgno+1;
  if(imgno>1)
  {
  imgno=1;
  }
  //ctx.fillStyle = "#FAF7F8";
  //rect(0,0,WIDTH,HEIGHT);
  //ctx.fillStyle = "#33FF00";
  //var randomnumber=Math.floor(Math.random()*11)
 
 // drawStar(.5,-10,-10);
  //circle(x, y, 10);
//alert(randomnumber);
 // if (x + dx >(WIDTH-5) || x + dx < 5)
   // dx = -dx;
 // if (y + dy > HEIGHT-5 || y + dy < 5)
 //   dy = -dy;

 // x += dx;
 // y += dy;
 //document.getElementById('audiotag1').play();
}
function init(chg) {
  canvas = document.getElementById("canvas");
  ctx = canvas.getContext("2d");
 // alert(canvas.width);
  //alert(document.documentElement.clientWidth);
   WIDTH=ctx.canvas.width  = 230;
 HEIGHT=ctx.canvas.height = 260;//. WIDTH=ctx.canvas.width  = window.innerWidth;
// HEIGHT=ctx.canvas.height = window.innerHeight;
clearInterval(refreshIntervalId);
  //draw();
  //fullStar();
  imgid=imgid+chg;
 path=imgid;
// alert(path);
  $(".email").html('<a href="mailto:?body=Hi, You have a greeting card http://www.m99.in/g1n/?i='+imgid+'--'+cata+'"><span class="icon_span"><img src="images/email-bg.jpg" border="0" /></span>Email</a>');
  $(".sms").html('<a href="sms:1?body=Hi,  You have a greeting card http://www.m99.in/g1n/?i='+imgid+'--'+cata+'"><span class="icon_span"><img src="images/sms-bg.jpg" border="0" /></span>SMS</a>');
  ///////////////
$("#sharearea").html('<div class="share_menu"><div class="share_close_div" align="right"><a href="#" onclick="hsharearea()"><img src="images/close.jpg" border="0" /></a></div><div class="share_menu_link"><a href="http://www.facebook.com/sharer.php?u=http://www.m99.in/g1n/?i='+imgid+'--'+cata+'"><span class="share_icon_span"><img src="images/facebook.jpg" border="0" /></span>Facebook</a></div><div class="share_menu_link"><a href="http://twitter.com/home?status=Hi,  You have a greeting card http://www.m99.in/g1n/?i='+imgid+'--'+cata+' via @m99web"><span class="share_icon_span"><img src="images/twitter.jpg" border="0" /></span>Twitter</a></div><div class="share_menu_link"><a href="https://plusone.google.com/_/+1/confirm?hl=en&url=http://www.m99.in/g1n/?i='+imgid+'--'+cata+'"><span class="share_icon_span"><img src="images/google+.jpg" border="0" /></span>Google + </a></div></div>');
$("#sharearea").hide();
 // alert(imgid);
if(imgid==1)
  $("#divpre").hide();
  else
  $("#divpre").show();
  if(imgid>(limit-1))
  $("#divnext").hide();
  else
  $("#divnext").show();
  refreshIntervalId =setInterval("draw("+path+")", 330);
}
    

  function bconfirm(cmsg,callbac)
{
	$(".bmp_pp_9").remove();
	$("body").append('<div class="bmp_pp_9" style="width:250px"><div class="bmp_closnav" align="right"><div class="bmp_closbtn" id="con_close">x</div></div><div class="bmp_pp_9_li" style="font-size:18px" >'+cmsg+'</div><div class="bmp_pp_9_options"><div class="bmp_pp_9_options_li"  id="con_false">Cancel</div><div class="bmp_pp_9_options_li"  id="con_true">OK</div></div></div>');
	$(".bmp_pp_9").css("top",parseInt($(window).scrollTop()+(($(window).height()/2)-90)));
	$(".bmp_pp_9").css("left",parseInt(($(window).width()/2)-125));
	$("#con_false").click( function()
	{
		$(".bmp_pp_9").fadeOut(666);
		$(".z__fade_popup").remove();

		callbac(0);
		$(".bmp_pp_9").remove();
	});
	$("#con_close").click( function() 
	{
		$(".bmp_pp_9").fadeOut(666);
		$(".z__fade_popup").remove();
		callbac(2);
		$(".bmp_pp_9").remove();
	});
	$("#con_true").click( function() 
	{
		$(".bmp_pp_9").fadeOut(666);
		$(".z__fade_popup").remove();
		callbac(1);
		$(".bmp_pp_9").remove();
	});
}
  var n = 1;
function outAdd()
{
	$(".bmp_pp_9").remove();
}
function callAdd2()
{
	startTime();
	 
 

if(n==1){
	n=2;
	
	 bconfirm("Download Best Shopping App",function(rr)
	{
		//alert("hi"+rr);
		if(rr==1)
		{
				window.location="https://play.google.com/store/apps/details?id=com.buymyprice.in";
		}
	});
	
	
	
	
}
else
if(n==2){
	n=3;
	$(".bmp_pp_9").remove();
	$('body').append('<div class="bmp_pp_9" style="left:319px; width:400px; height:600px; overflow:hidden; background-color:#ffffff "><div class="bmp_closnav" align="right"><div class="bmp_closbtn" id="con_close" onClick="outAdd()">x</div></div><div class="bmp_pp_9_options" align="center" style=" height:auto"><a href="https://play.google.com/store/apps/details?id=com.buymyprice.in" style="border:0px"><img src="http://www.buymyprice.in/asset/ad2_2.jpg" style="border:0px"></a></div><div class="bmp_pp_9_options" align="center" style=" height:auto"><a href="https://play.google.com/store/apps/details?id=com.buymyprice.in" style="border:0px"><img src="http://www.buymyprice.in/asset/ad2_1.jpg" style="border:0px"></a></div></div>');
			width=parseInt($(window).width());
		height=parseInt($(window).height());
		$(".bmp_pp_9").css('left','0px');
	//$('body').css('position','fixed');
		$('.bmp_pp_9').css('top','0px');
		$('.bmp_pp_9').css('width',width); 
		$('.bmp_pp_9').css('height',height);
		$('.bmp_pp_9').css('position','fixed');
} 
else
{
	n=1;
	$(".bmp_pp_9").remove();
	$('body').append('<div class="bmp_pp_9" style="left:319px; width:400px; height:600px; overflow:hidden; background-color:#fbd700"><div class="bmp_closnav" align="right"><div class="bmp_closbtn" id="con_close" onClick="outAdd()">x</div></div><div class="bmp_pp_9_options" align="center" style=" height:auto"><a href="https://play.google.com/store/apps/details?id=com.buymyprice.in" style="border:0px"><img src="http://www.buymyprice.in/asset/ad1_2.jpg" style="border:0px"></a></div><div class="bmp_pp_9_options" align="center" style=" height:auto"><a href="https://play.google.com/store/apps/details?id=com.buymyprice.in" style="border:0px"><img src="http://www.buymyprice.in/asset/ad1_1.jpg" style="border:0px"></a></div></div>');
			width=parseInt($(window).width());
		height=parseInt($(window).height());
		$(".bmp_pp_9").css('left','0px');
	//$('body').css('position','fixed');
		$('.bmp_pp_9').css('top','0px');
		$('.bmp_pp_9').css('width',width);
		$('.bmp_pp_9').css('height',height);
		$('.bmp_pp_9').css('position','fixed');
		 
} 


	

}
function startTime()  {
    t = setTimeout(function(){callAdd2()}, 10000);
}  
function startTimeFirst() {
	startTime();
  	callAdd2 ();
}


