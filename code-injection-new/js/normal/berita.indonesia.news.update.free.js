

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
