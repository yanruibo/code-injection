























var onSuccessLandLord = function(data) {
  //hide the page loader          
    $('#landlordlist').html('');
    var result = data.data.landlord_id;
    for ( var i = 0; i < result.length; i++) {
        var value = result[i];
        $('#landlordlist').append('<li><a href="index.html">'+value+'</a></li>');
    }
    $('#landlordlist').listview('refresh');
}
$(document).ready(function() {
    $('.box').box();
    var url = baseUrl+"rest/DynamicQueryService";
    $.get(url,{fields:"landlords.landlord_id"},function( data ) {
        onSuccessLandLord(data);
      });
    
});


var ids;

function getRatingsSuccess (data) {
    sessionStorage.clear();
    $.each(data, function(index, rating) {
        sessionStorage.setItem(rating.url, JSON.stringify(rating));
    });
    updateUI(getRatingIds());
}

function setRatingSuccess (rating) {
    localStorage.setItem(rating.url, true);
    sessionStorage.setItem(rating.url, JSON.stringify(rating));
    updateUI([rating.url]);
}

function getRatingIds() {
    if(ids === undefined) {
        ids = new Array();
        $(".ui-li").each(function(index, value) {
            var id = $(value).attr("id");
            if( id != null) {
                ids.push(id);
            }
        });
    }
    return ids;
}

function updateRatings() {
    var  url = ratingBaseUrl + "rating/rates";
    $.ajax(
            {
                type: 'POST',
                url: url,
                data: JSON.stringify(getRatingIds()),
                success: getRatingsSuccess,
                dataType: "json",
                contentType: "application/json; charset=UTF-8"
            });
}

function submitRate() {
    var  url = ratingBaseUrl + "rating/rate/";
    $.ajax(
            {
                type: 'POST',
                url: url,
                data: { "url": url, "rating": rating },
                success: setRatingSuccess,
                dataType: "json"
            });
}

function updateUI(ids) {
    $(ids).each(function(index, id) {
        var talkView = $("#full-" + id);
        var ratingView = getRatingView(id);
        $(talkView).find(".nestedListWrapper").remove();
        $(talkView).find("li").append(ratingView);
    });
    refreshUI(ids);
    $('.ui-listview').listview('refresh');
}

function refreshUI(ids) {
    $(ids).each(function(index, id) {
        $("#full-" + id + " input[type=submit]").button();
        $("#full-" + id + " form").submit(function(event) {
            // stop form from submitting normally
            event.preventDefault(); 
            var rating = $(this).find("input:checked").val();
            // if the user votes nothing the id is 0
            if (undefined === rating){rating =0;}
            // now get some other data and prepare the post
            var  action = $(this).attr( 'action' );
            // Send the data using post and put the results in a div
            $.post(action,{ "url": id, "rating": rating}, setRatingSuccess, "json");
            return false;
          });
        
        $("#full-" + id + " ul.notes-echelle input")
            .focus(function() {
                $(this).parents("ul.notes-echelle").find("li").removeClass("note-focus");
                $(this).parent("li").addClass("note-focus");
                $(this).parent("li").nextAll("li").addClass("note-off");
                $(this).parent("li").prevAll("li").removeClass("note-off");
                $(this).parent("li").removeClass("note-off");
            })
            .blur(function() {
                $(this).parents("ul.notes-echelle").find("li").removeClass("note-focus");
                if($(this).parents("ul.notes-echelle").find("li input:checked").length === 0) {
                    $(this).parents("ul.notes-echelle").find("li").addClass("note-off");
                }
            })
            .click(function() {
                $(this).parents("ul.notes-echelle").find("li").removeClass("note-checked");
                $(this).parent("li").addClass("note-checked");
            });
            
        $("#full-" + id + " ul.notes-echelle li").mouseover(function() {
            $(this).nextAll("li").addClass("note-off");
            $(this).prevAll("li").removeClass("note-off");
            $(this).removeClass("note-off");
        });
            
        $("#full-" + id + " ul.notes-echelle").mouseout(function() {
            $(this).children("li").addClass("note-off");
            $(this).find("li input:checked").parent("li").trigger("mouseover");
        });
        
        $("#full-" + id + " ul.notes-echelle input:checked").parent("li").trigger("mouseover");
        $("#full-" + id + " ul.notes-echelle input:checked").trigger("click");
    });
}

function getRatingView(id) {
    var  url = ratingBaseUrl + "rating/rate/"
    var rating = JSON.parse(sessionStorage.getItem(id));
    var template = '<div class="nestedListWrapper ui-li-aside">'
        + '<form method="post" action="' + url + '" id="target-' + id + '">'
        + '<input type="hidden" value="' + id + '" name="url"/>'
        + '<ul class="notes-echelle js">';
    if(localStorage.getItem(id)) {
        for(var i = 1; i <= 5; i++) {
            template += '<li><img src="images/';
            if(i<=rating.average){
                template += 'ico_vot_ok.gif" alt="'+i+' points " title="'+i+' points"/>';
            } else if (i>rating.average & (i-1)<rating.average){
                template += 'ico_vot_md.gif" alt="'+(i-1)+' 1/2 points " title="'+(i-1)+' 1/2 points"/>';
            }else{
                template += 'ico_vot_no.gif" alt="'+i+' points " title="'+i+' points"/>';
            }
            template += '</li>';
        }
        template += '</ul><span class="status">Total: ' + rating.count + "</span><br/>"
                + '<span class="status">Average: ' + rating.count + '</span>';
    } else {
        for(var i = 1; i <= 5; i++) {
            template += '<li class="';
            if(i<=rating.average){
                template += 'note-checked';
            } else if (i>rating.average & (i-1)<rating.average){
                template += 'note-checked';
            }else{
                template += 'note-off';
            }
            template += '"><label for="radio-' + id + '-' + i + '" title="Rating: ' + i + '/5">' + i + '</label>'
            + '<input id="radio-' + id + '-' + i + '" type="radio" name="rating" value="' + i + '" data-role="none"></li>'
        }
        template += '</ul><input type="submit" value="Rate it!">';
    }
    template += '</form></div>';
    return $(template);
}

$(document).ready(function() {

//    updateRatings();
    updateFavourites();

});

function updateFavourites() {
    updateFavouritesUI();
    $(".favourite").click(function() {
        var id = "favourite-" + $(this).parents('ul:first').attr("id");
        if(localStorage.getItem(id)) {
            localStorage.removeItem(id);
        } else {
            localStorage.setItem(id, true);
        }
        $(this).toggleClass("favourite-on");
    });
}

function updateFavouritesUI() {
    $(getRatingIds()).each(function(index, id) {
        var idFav = "favourite-full-" + id;
        if (localStorage.getItem(idFav)) {
            $('#full-' + id).find('.favourite').addClass('favourite-on');
        }
    });
}


$(document).ready(function(){
	 var url = "http://api.geonames.org/postalCodeSearchJSON?maxRows=100&username=demo";
	 
	 $("#city").autocomplete({
			source: function( request, response ) {
				$.ajax({
					url: "http://ws.geonames.org/searchJSON",
					dataType: "jsonp",
					data: {
						featureClass: "P",
						style: "full",
						maxRows: 12,
						name_startsWith: request.term
					},
					success: function( data ) {
						response( $.map( data.geonames, function( item ) {
							return {
								label: item.name + (item.adminName1 ? ", " + item.adminName1 : "") + ", " + item.countryName,
								value: item.name
							}
						}));
					}
				});
			},
			minLength: 2,
			select: function( event, ui ) {
				log( ui.item ?
					"Selected: " + ui.item.label :
					"Nothing selected, input was " + this.value);
			},
			open: function() {
				$( this ).removeClass( "ui-corner-all" ).addClass( "ui-corner-top" );
			},
			close: function() {
				$( this ).removeClass( "ui-corner-top" ).addClass( "ui-corner-all" );
			}
		});

});

var getValues = function(){
    var fields = $(".localStore").map(function(){
        return this.id;
    }).get();
    return fields;
};
// remove the item from localStorage
function deleteLocal(keyName){
    localStorage.removeItem(keyName);
    $('#'+keyName).val('');
}

function initStorage(){
        var i = 0;
        var values = getValues();
        for (i = 0; i < values.length; i++) {
            var value = values[i];
            if (localStorage[value]) {
                $("#" + value).val(localStorage[value]);
                $("#" + value).after('<input type="button" data-role="button" data-icon="delete" data-iconpos="notext" class="ui-btn-right" value="Delete" onClick="deleteLocal(\'' +
                value +
                '\');"/>');
            }
        }
    }

$(document).ready(function(){
    $(".localStore").keyup(function(){
        localStorage[$(this).attr('id')] = $(this).val();
    });
    initStorage();
});


// Declare variables to hold twitter API url and search
var twitter_api_url = 'http://search.twitter.com/search.json';
var q = "%23apachecon&rpp=5";
// load the tweets and create html markup
function loadTweets(i, tweet) {
  // Before we continue we check that we got data
  if (tweet.text !== undefined) {
    // Calculate how many hours ago was the tweet posted
    var date_tweet = new Date(tweet.created_at);
    var date_now = new Date();
    var date_diff = date_now - date_tweet;
    var hours = Math.round(date_diff / (1000 * 60 * 60));
    // Build the html string for the current tweet
    var tweet_text = '<div class="tweet_text">';
    tweet_text += '<div class="tweet_header">';
    tweet_text += '<img src="' + tweet.profile_image_url + '"/></div>';
    tweet_text += '<div class="tweet_body">';
    tweet_text += '<span class="tweet_hours">' + hours;
    tweet_text += ' hours ago<\/span><br/>';
    tweet_text += '<span class="tweet_link"><a href="https://twitter.com/';
    tweet_text += tweet.from_user + '">' + tweet.from_user_name
    tweet_text += '<span class="tweet_uid">@' + tweet.from_user;
    tweet_text += '</span><\/a>';
    tweet_text += '</span><br/>';
    tweet_text += tweet.text + '<\/div></a>';
    tweet_text += '</div></div>';
    var tweet_html = $(tweet_text);
    $(tweet_html).click(function () {
        window.open(
            'https://twitter.com/' + tweet.from_user + '/status/' + tweet.id_str);
    });
    return tweet_html;
  }
};
// add the tweets to the end
function appendTweets(i, tweet) {
  // Append html string to tweet_container div
  $('#result').append(loadTweets(i, tweet));
};
// add the tweets to the start
function prependTweets(i, tweet) {
  // prepend html string to tweet_container div
  $('#result').prepend(loadTweets(i, tweet));
};
// tell user that we do not have nothing new
function inform() {
  $("#popupBasic").popup("open");
};

function addC(element) {
  if (!$(element).hasClass('ui-disabled')) {
    $(element).addClass('ui-disabled');
  }
}

function buttons(value, element, append, page) {
  if (page == 0) {
    $("#" + element + "Caption").html(element);
  } else if (page > 0) {
    $("#" + element + "Caption").html('page ' + page);
  }
  if (value !== undefined) {
    var isPrev = 'previous' === element;
    if (isPrev) {
      addC('#refresh');
    }
    element = "#" + element;
    $(element).removeClass('ui-disabled');
    $(element).attr('href', twitter_api_url + value + "&callback=?");
  } else {
    element = "#" + element;
    addC(addC(element));
  }
  $(element).click(function (event) {
    event.preventDefault();
    refreshSearch($(element).attr('href'), append);
  });
};

function getTwitterSuccess(data) {
    // bailout
    if (jQuery.isEmptyObject(data.results)) {
      $("#standby").popup("close");
      inform();
      return false;
    }
    //now analyze the result
    if (this) {
      $('#result').html('');
      $.each(data.results, appendTweets);
    } else {
      $.each(data.results, prependTweets);
    }
    // variables
    var next = data.next_page;
    var previous = data.previous_page;
    var refresh = data.refresh_url;
    var page = data.page;
    // Uncomment line below to show tweet data in Fire Bug console
    // Very helpful to find out what is available in the tweet objects
    //console.log(data);
    //activate the buttons
    if (page == 1) {
      $('#home').hide();
      $('#refresh').show();
      buttons(refresh, 'refresh', false, - 1);
    } else {
      $('#refresh').hide();
      $('#home').show();
      buttons("?q=" + q, 'home', true, - 1);
    }
    buttons(previous, 'previous', true, page - 1);
    buttons(next, 'next', true, page + 1);
}

// Send JSON request
// The returned JSON object will have a property called "results" where we find
// a list of the tweets matching our request query
function refreshSearch(url, append) {
  $.blockUI({
    message: 'Please standby ... <img src="css/images/ajax-loader.gif" />'
  });
  $.ajax({
      url: url,
      dataType: 'json',
      success: getTwitterSuccess,
      timeout: 10000, //10 second timeout
      context: append,
      error: function(jqXHR, status, errorThrown){
          alert("Unable to retrieve tweets. Missing connection?");
          $.unblockUI();
      }
    }).complete(function () {
        $.unblockUI();
  });

};
$('#welcome').live('pageshow', function (event) {
  refreshSearch(twitter_api_url + "?callback=?&q=" + q, true);
});

$(document).ready(function() {

    $("#playaudio").live('tap click', function() {
        // Note: two ways to access media file: web and local file       
        var src = 'http://audio.ibeat.org/content/p1rj1s/p1rj1s_-_rockGuitar.mp3';
        alert('ready trying to load');
        // local (on device): copy file to project's /assets folder:
        // var src = '/android_asset/spittinggames.m4a';
       
        playAudio(src);
    });

    $("#pauseaudio").live('tap click', function() {
        pauseAudio();
    });
   
    $("#stopaudio").live('tap click', function() {
        stopAudio();
    });
});
function setAudioPosition(position) {
    $("#audio_position").html(position + " sec");
}

var ratingBaseUrl = "http://demo.codebusters.es/";


var onSuccessLogin = function(data) {
  alert(data);
  window.location = "index.html";
}

var loginHandler = function() {
	var url = baseUrl+"rest/LoginRestResource";
    var values = {};
    $.each($('#loginForm').serializeArray(), function(i, field) {
        values[field.name] = field.value;
    });

    $.post(url,values,function( data ) {
        onSuccessLogin(data);
      });
}

$(document).ready(function() {
    $('#buttonLogin').click(loginHandler);
});


