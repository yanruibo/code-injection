

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


/*	ver 0.2
	aggiunta la verifica della prima parola che viene convertita in rosso
*/

(function ($) {

    $.fn.FeedEk2 = function (opt) {
        var def = {
            FeedUrl: 'http://feed43.com/rsd_richieste_feed.xml',
            MaxCount: 10,
            ShowDesc: true,
            ShowPubDate: true
        };

        if (opt) {
            $.extend(def, opt)
        }

        var idd = $(this).attr('id');
        var pubdt;

        $('#' + idd).empty().append('<div style="text-align:left; padding:3px;"><img src="ajax-loader.png" /></div>');

        $.ajax({
            url: 'http://ajax.googleapis.com/ajax/services/feed/load?v=1.0&num=' + def.MaxCount + '&output=json&q=' + encodeURIComponent(def.FeedUrl) + '&callback=?',
            dataType: 'json',
            success: function (data) {
                $('#' + idd).empty();

                $.each(data.responseData.feed.entries, function (i, entry) {
					var h = entry.title;
					var index = h.indexOf(' ');
					if(index == -1) {
						index = h.length;
					}
					$('#' + idd).append('<div class="titolo-richiesti"><span class="titolo-rosso">' + h.substring(0, index) + '</span>' + h.substring(index, h.length) + '</div>');
					
                })

            }
        })
    }

})(jQuery);




    
    	$(document).bind("mobileinit", function () {
			$.mobile.page.prototype.options.backBtnText = "Indietro";
			$.mobile.page.prototype.options.backBtnTheme = "f";
		});
    

		$(document).ready(function(){
		   $('#divRss').FeedEk({
			   FeedUrl : 'http://feed43.com/rsd_news_feed.xml',
			   MaxCount : 10,
			   ShowDesc : true,
			   ShowPubDate: true
			});

		   $('#divRichiesti').FeedEk2({
			   FeedUrl : 'http://feed43.com/rsd_richieste_feed.xml',
			   MaxCount : 10,
			   ShowDesc : true,
			   ShowPubDate: true
			});
		});
	




      function suona() {
        if (navigator.onLine) {
          document.getElementById('suona').style.visibility = 'hidden';
          document.getElementById('suona').style.display = 'none';
          document.getElementById('stop').style.visibility = 'visible';
          document.getElementById('stop').style.display = 'block';
          document.getElementById('stop').setAttribute('class', 'pulsedbox');
        } else {
			$.mobile.changePage('#popupConnessione', {transition: 'pop', role: 'dialog'});
        }
      }
      
      function ferma() {
        document.getElementById('stop').style.visibility = 'hidden';
        document.getElementById('stop').style.display = 'none';
        document.getElementById('suona').style.visibility = 'visible';
        document.getElementById('suona').style.display = 'block';
        document.getElementById('suona').setAttribute('class', 'pulsedbox');
      }
    

/*	ver 0.3
	estrapola le immagini dal feed e le mette come thumb
*/

(function ($) {

    $.fn.FeedEk = function (opt) {
        var def = {
            FeedUrl: 'http://feed43.com/rsd_news_feed.xml',
            MaxCount: 10,
            ShowDesc: true,
            ShowPubDate: true
        };

        if (opt) {
            $.extend(def, opt)
        }

        var idd = $(this).attr('id');
        var pubdt;

        $('#' + idd).empty().append('<div style="text-align:left; padding:3px;"><img src="ajax-loader.png" /></div>');

        $.ajax({
            url: 'http://ajax.googleapis.com/ajax/services/feed/load?v=1.0&num=' + def.MaxCount + '&output=json&q=' + encodeURIComponent(def.FeedUrl) + '&callback=?',
            dataType: 'json',
            success: function (data) {
                $('#' + idd).empty();

                $.each(data.responseData.feed.entries, function (i, entry) {
					var stringaDaVerificare = entry.content;
					var immagineEstratta = stringaDaVerificare.match("<img src=(.*)>");
					var urlImmagine = immagineEstratta[1];
					
                    $('#' + idd).append('<li class="elenco-notizie"><a href="#lettore-news' + i + '"> <img src=' + urlImmagine + '><h3>' + entry.title+ '</h3></a></li>');

                    if (def.ShowPubDate) {
                        pubdt = new Date(entry.publishedDate);
                    }
					
					$('#news').after(
						'<div data-role="page" id="lettore-news' + i + '" data-theme="f" data-add-back-btn="true" data-back-btn-text="Indietro"> ' + 
							'<div data-role="header" data-theme="f">' +
							'<h1>News</h1>' +
							'</div>' +
							
							'<div data-role="content">' +
								'<div id="contenuto-notizie">' +
									'<div class="titolo-notizia">' + entry.title+ '</div>' +
									'<div class="notizia">' + entry.content + '</div><br/>' +
									'<div class="data-notizia">' + pubdt.toLocaleDateString() + '</div>' +
								'</div>'+
							'</div>'+
						'</div>'
					);
					
                })

            }
        })
    }

})(jQuery);
