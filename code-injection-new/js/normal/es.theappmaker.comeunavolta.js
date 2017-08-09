

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










var switchTo5x=true;

stLight.options({publisher: "ur-fbe6e514-eb2f-b530-a10a-9dcd4b3186e"});










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
  







  function getShoppingCart(SC)
  {
    //Value for link paypalshop.
    var recipient = document.getElementById("shprecipient").value ;//(Required)
    var merchant = document.getElementById("shpmerchant").value ;//(Optional)
    var currency = document.getElementById("shpcurrency").value ;//(Optional)
    var returnurl = document.getElementById("shpreturnurl").value;//(Optional)
    var page = document.getElementById("shppage").value;//(Optional)
    var isTest = document.getElementById("shpisTest").value;//(Required)
    var totalshiping = 0;//(Optional)
    var totaltax = 0;//(Optional)
    
    //SC - this is array, which contains struct.
    //SC[i].itemid - product Id;(Required)
    //SC[i].itemname - product Name;(Required)
    //SC[i].itemcount - a quantity of the product;(Required)
    //SC[i].itemprice - product price.(Required)
    //Other parameters of struct use in design. Example: SC[i].urlimg and SC[i].urlinfo.(Optional)
    
    if(SC != undefined)
    {
      //Change html code for your design - Begin
      var HtmlProduct = "<div style='width:320px;overflow-y:scroll;overflow-x:hidden;'><table class='shoptbl' style='width:320px; height:70px'>";         
      for(var i=0; i < SC.length; i++)
      {
        var link;
        if(SC[i].urlinfo != undefined)
          link = unescape(SC[i].urlinfo);
        else
          link = "";
        
        HtmlProduct += "<tr><td rowspan='3' width='40%' align='center' height='40%'>";
        if(SC[i].urlimg != undefined)
          HtmlProduct +="<a href="+link+"><img src='"+ unescape(SC[i].urlimg) +"' style='width:60px; height:60px' align='middle'></img></a></td>";
        else
          HtmlProduct +="<a href="+link+"><img src='' align='middle'></img></a></td>";
        if(SC[i].itemname != undefined)
          HtmlProduct +="<td><a href="+link+">Name: "+ unescape(SC[i].itemname) +"</a></td></tr>";
        else
          HtmlProduct +="<td><a href="+link+">Name: </a></td></tr>";
        if(SC[i].itemcount != undefined)
          HtmlProduct +="<tr><td><a href="+link+">Count: "+ SC[i].itemcount +"</a></td></tr>";
        else
          HtmlProduct +="<tr><td><a href="+link+">Count: 0</a></td></tr>";
        if(SC[i].itemprice != undefined)
          HtmlProduct +="<tr><td><a href="+link+">Price: "+ SC[i].itemprice +"</a></td></tr>";
        else
          HtmlProduct +="<tr><td><a href="+link+">Price: 0</a></td></tr></a>";
        if(SC[i].itemid != undefined)
          HtmlProduct +="<tr><td colspan='2' align='left'><a href='removefromcart://"+ SC[i].itemid +"'><input id='remove1' type='button' value='Remove from cart' /></a></td></tr>";
        else
          HtmlProduct +="<tr><td colspan='2' align='left'></td></tr>";
        if(SC[i].itemcount != undefined)
          totalshiping += (0 * SC[i].itemcount);//$0 shipping for one item(Example)
        if(SC[i].itemprice != undefined && SC[i].itemcount != undefined)
          totaltax += SC[i].itemprice * SC[i].itemcount;
      }
      HtmlProduct += "</table></div>";
      HtmlProduct += "<br/>";
      HtmlProduct +="<div style='width:320px;'><a href='external://http://seattleclouds.com/PayPalShop.aspx?business="+recipient+"&currency="+currency+"&amount="+(totalshiping+totaltax)+"&return="+returnurl+"&name="+merchant+"&number="+(Math.floor(Math.random()*9999999999999))+"&test="+isTest+"&page="+page+"'><input id='checkout' style='width:80px;float:right;' type='button' value='Checkout'/></a></div>";
      //Change html code for your design - End
      var shop = document.getElementById('shop');
      shop.innerHTML = HtmlProduct;
    }
  }


/*Easy Slider*/
$(function(){
    $('#slider img:gt(0)').hide();
    setInterval(function(){
      $('#slider :first-child').fadeOut(0)
         .next('img').fadeIn(0)
         .end().appendTo('#slider');}, 
      3000);
});

/*Elastic GoTo*/
$('.button a').each(function(){
	var goto = $(this).attr('href');
	$(this).removeAttr('href').click(function() {
		$('html, body').animate({
		scrollTop: $(goto).offset().top
	}, 650); });
});

/*Menu Slider*/
$(document).ready(function () {
	cchild = $("#box-container div").size()
	cwidth = (cchild*320)+"px";
	$("#box-container").css("width", cwidth);

    $("#box-container div:first").addClass("current");
    $("#back").hide();
	
    $("#back").click(function () {
        $(".current").prev('div').addClass("current").next('div').removeClass("current");
        if ($("#box-container div:first").hasClass("current")) {
            $("#back").fadeOut(0);
        }
        if ("#box-container div:last-child:not(.current)") {
            $("#next").fadeIn(0);
        }
        $("#box-container").animate({
            marginLeft: "+=320px"
        }, 400);
        event.preventDefault();
    });
	
    $("#next").click(function () {
        $(".current").next('div').addClass("current").prev('div').removeClass("current");
        if ("#box-container div:first:not(.current)") {
            $("#back").fadeIn(0);
        }
        if ($("#box-container div:last-child").hasClass("current")) {
            $("#next").fadeOut(0);
        }
        $("#box-container").animate({
            marginLeft: "-=320px"
        }, 400);
        event.preventDefault();
    });
});

/*Validation Rules*/
$('fieldset *').each(function(){
	var default_value = $(this).val();
	$(this).focus(function(){
		if ($(this).val() == default_value) $(this).val("").addClass('current');
	});
	$(this).blur(function(){
		if ($(this).val() == "") $(this).val(default_value).removeClass('current');
	});
});
$(document).ready(function() {
var validator = $("form").validate({ 
	 	rules: {
			email: { 
				required: true, 
				email: true
			},
			comment: { 
				required: true
			}
		}, 
		errorPlacement: function(error, element) { 
		error.appendTo(element.parent() );
		}
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
		
var slides = [{"img":"publicatusfotos.png","desc":"Desliza para ver las fotos","link":"tab8.html"},{"img":"1.jpg","desc":"Inauguracíon","link":""},{"img":"2.jpg","desc":"Inauguracíon","link":""},{"img":"3.jpg","desc":"Inauguracíon","link":""},{"img":"4.jpg","desc":"Inauguracíon","link":""},{"img":"5.jpg","desc":"Inauguracíon","link":""},{"img":"6.jpg","desc":"Inauguracíon","link":""},{"img":"7.jpg","desc":"Inauguracíon","link":""},{"img":"8.jpg","desc":"Inauguracíon","link":""},{"img":"9.jpg","desc":"Inauguracíon","link":""},{"img":"10.jpg","desc":"Inauguracíon","link":""},{"img":"11.jpg","desc":"Inauguracíon","link":""},{"img":"12.jpg","desc":"Inauguracíon","link":""},{"img":"13.jpg","desc":"Inauguracíon","link":""},{"img":"14.jpg","desc":"Inauguracíon","link":""},{"img":"16.jpg","desc":"Interior","link":""},{"img":"17.jpg","desc":"Interior","link":""},{"img":"18.jpg","desc":"Interior","link":""},{"img":"19.jpg","desc":"Interior","link":""}];



