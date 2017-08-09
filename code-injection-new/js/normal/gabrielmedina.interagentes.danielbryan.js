








  function form_submit(){
    vname = $("#name").val();
    vemail = $("#email").val();
    vcomentario = $("#comentario").val(); 
    $.post(SERVER+'insert_board.php', {name : vname, email : vemail, comentario : vcomentario, app : APP}, function(data) {
      $("#content").html("<h3>Obrigado!</h3><p>Comentário enviado com sucesso.</p>");    
    });
  } 
  $(document).ready(function() {
    $('.news_list').html = "";
    $('#news').html = "";
    $.ajaxSetup({ cache: false });
    $('#loading').show();
    $.ajax({
      url: SERVER+'json_board.php',
      dataType: 'json',
      data: { app: APP },
      async: false,
      success: function(data) {
        $.each(data.result, function(key, value) {
          var news = "<li><font style='font-weight:bold;'>"+value.name+"</font><br>"+value.text+"</li>";
          $('.news_list').append(news);
        });
        $('#loading').hide();
      }
    });
  });    











var arrayTitle = ["Propostas Gabriel Medina"];
var arrayURL = ["http://gabrielmedina13.com.br/category/propostas-2/feed/"];
var arrayContent = ["value.encoded"];
$(document).ready(function() {
  $('#list').html = "";
  for (i=0;i<arrayTitle.length;i++){
    var title = arrayTitle[i];
    var content = arrayContent[i];
    var news_title = "<h2>"+title+"</h2>";
    $('#list').append(news_title);
    $('#list').append("<div class='tweets'>");
    $('#list').append("<ul class='news_list'>");
    $.ajaxSetup({ cache: false });
    $('#loading').show();
    $.ajax({  
      url: 'http://query.yahooapis.com/v1/public/yql?q=SELECT * FROM feed WHERE url=\''+arrayURL[i]+'\'&format=json',  
      dataType: 'json',    
      async: false,  
      success: function(data){     
        $.each(data, function(data_key, data_value) {            
          $.each(data_value.results.item, function(key, value) {          
            var news = "<li class='clearfix news_first tweet_odd'>";
            news += "    <span class='news_time'><a style='cursor:pointer;' onclick=\"javascript:open_rss(\'"+escape(value.title)+"\',\'"+escape(eval(content))+"\')\">"+value.title+"</a></span>";
            news += "    <span class='news_text'>"+value.description+"</span>";
            news += "</li>";    
            $('.news_list').append(news);      
          });
        });
        $('#loading').hide();
      }
    });      
    $('#list').append("</ul>");
    $('#list').append("</div>");
  }
});

function open_rss(vtitle, vtext){
  $('#full').html("");
  $('#backButt').html("<a style='cursor:pointer;' onclick=\"javascript:list_rss()\"><< Voltar</a>");
  $('#list').hide();
  $('#full').show();
  
  var news = "<h2>"+unescape(vtitle)+"</h2>";
  news += "<p>"+unescape(vtext)+"</p>";
  $('#full').append(news);
}

function list_rss(){
  $('#backButt').html("<a href='index.html'><< Voltar</a>");
  $('#full').html("");
  $('#full').hide();
  $('#list').show();
}





















$(document).ready(function() {
  $('.news_list').html = "";
  $('#news').html = "";
  $.ajaxSetup({ cache: false });
  $('#loading').show();
  $.ajax({
    url: SERVER+'json_news.php',
    dataType: 'json',
    data: { app: APP, section: 2 },
    async: false,
    success: function(data) {
    $.each(data.result, function(key, value) {    
          var news = "<li>";
          news += "    <a style='color:black;cursor:pointer;' onclick=\"javascript:open_news(\'"+escape(value.title)+"\',\'"+escape(value.text)+"\')\">"+value.title+"</a>";
          news += "</li>";   
      $('.news_list').append(news);
    });
    $('#loading').hide();
    }
  });
});

function open_news(vtitle, vtext){
  $('#full').html("");
  $('#backButt').html("<a style='cursor:pointer;' onclick=\"javascript:list_rss()\"><< Voltar</a>");
  $('#list').hide();
  $('#full').show();
  
  var news = "<h2>"+unescape(vtitle)+"</h2>";
  news += "<p>"+unescape(vtext)+"</p>";
  $('#full').append(news);
}

function list_rss(){
  $('#backButt').html("<a href='index.html'><< Voltar</a>");
  $('#full').html("");
  $('#full').hide();
  $('#list').show();
}





















$(document).ready(function() {
  $('.news_list').html = "";
  $('#news').html = "";
  $.ajaxSetup({ cache: false });
  $('#loading').show();
  $.ajax({
    url: SERVER+'json_news.php',
    dataType: 'json',
    data: { app: APP, section: 3 },
    async: false,
    success: function(data) {
    $.each(data.result, function(key, value) {    
          var news = "<li>";
          news += "    <a style='color:black;cursor:pointer;' onclick=\"javascript:open_news(\'"+escape(value.title)+"\',\'"+escape(value.text)+"\')\">"+value.title+"</a>";
          news += "</li>";   
      $('.news_list').append(news);
    });
    $('#loading').hide();
    }
  });
});

function open_news(vtitle, vtext){
  $('#full').html("");
  $('#backButt').html("<a style='cursor:pointer;' onclick=\"javascript:list_rss()\"><< Voltar</a>");
  $('#list').hide();
  $('#full').show();
  
  var news = "<h2>"+unescape(vtitle)+"</h2>";
  news += "<p>"+unescape(vtext)+"</p>";
  $('#full').append(news);
}

function list_rss(){
  $('#backButt').html("<a href='index.html'><< Voltar</a>");
  $('#full').html("");
  $('#full').hide();
  $('#list').show();
}













$(document).ready(function() {
  $('.news_list').html = "";
  $('#news').html = "";
  $.ajaxSetup({ cache: false });
  $('#loading').show();
  $.ajax({
    url: SERVER+'json_news.php',
    dataType: 'json',
    data: { app: APP, section: 1 },
    async: false,
    success: function(data) {
    $.each(data.result, function(key, value) {    
          var news = "<li>";
          news += "    <a style='color:black;cursor:pointer;' onclick=\"javascript:open_news(\'"+escape(value.title)+"\',\'"+escape(value.text)+"\')\">"+value.title+"</a>";
          news += "</li>";   
      $('.news_list').append(news);
    });
    $('#loading').hide();
    }
  });
});

function open_news(vtitle, vtext){
  $('#full').html("");
  $('#backButt').html("<a style='cursor:pointer;' onclick=\"javascript:list_rss()\"><< Voltar</a>");
  $('#list').hide();
  $('#full').show();
  
  var news = "<h2>"+unescape(vtitle)+"</h2>";
  news += "<p>"+unescape(vtext)+"</p>";
  $('#full').append(news);
}

function list_rss(){
  $('#backButt').html("<a href='index.html'><< Voltar</a>");
  $('#full').html("");
  $('#full').hide();
  $('#list').show();
}












    function form_submit(){
      vname = $("#name").val();
      vemail = $("#email").val();
      vcelular = $("#celular").val();
      vfacebook = $("#facebook").val();
      vtwitter = $("#twitter").val();
      vyoutube = $("#youtube").val();
      vorkut = $("#orkut").val();
      vinstagram = $("#instagram").val();
      vflickr = $("#flickr").val();
      vlinkedin = $("#linkedin").val();
      vcomentario = $("#comentario").val(); 
      $('#loading').show();
      $.post(SERVER+'insert_contact.php', {name : vname, email : vemail, celular : vcelular, facebook : vfacebook, twitter : vtwitter, youtube : vyoutube, orkut : vorkut, instagram : vinstagram, flickr : vflickr, linkedin : vlinkedin, comentario : vcomentario, app : APP}, function(data) {        
        $("#content").html("<h3>Obrigado!</h3><p>Seu contato foi enviado com sucesso.</p>"); 
        $('#loading').hide();        
			});
    }      
    
$('#loading').hide();









var date = "";
$(document).ready(function() {
  $('.news_list').html = "";
  $('#news').html = "";
  $.ajaxSetup({ cache: false });
  $('#loading').show();
  $.ajax({
    url: SERVER+'json_agenda.php',
    dataType: 'json',
    data: { app: APP, section: 1 },
    async: false,
    success: function(data) {
      $.each(data.result, function(key, value) {    
          var news = "";
          if (date == value.eventdate){
            //same event
          }else{
            news += "<li style='color:#DA1C23;' id='list_date'>"+value.eventdate+"</li>";
          }     
          news += "<li>";
          news += "    <a style='color:black;cursor:pointer;' onclick=\"javascript:open_news(\'"+escape(value.title)+"\',\'"+escape(value.text)+"\')\">"+value.title+"</a>";
          news += "</li>";   
          date = value.eventdate;
var d = new Date()
var today = "";
if (d.getDate() > 9)
today += d.getDate();
else today += "0" + d.getDate();
today += "-";
if ((d.getMonth() + 1) > 9)
today += (d.getMonth() + 1);
else today += "0" + (d.getMonth() + 1);
today += "-";
today += d.getFullYear();
          if (date==today){
            alert(value.eventdate+"\n"+value.title);
          }          
      $('.news_list').append(news);
    });
    $('#loading').hide();    
    }
  });  
});

function open_news(vtitle, vtext){
  $('#full').html("");
  $('#backButt').html("<a style='cursor:pointer;' onclick=\"javascript:list_rss()\"><< Voltar</a>");
  $('#list').hide();
  $('#full').show();
  
  var news = "<h2>"+unescape(vtitle)+"</h2>";
  news += "<p>"+unescape(vtext)+"</p>";
  $('#full').append(news);
}

function list_rss(){
  $('#backButt').html("<a href='index.html'><< Voltar</a>");
  $('#full').html("");
  $('#full').hide();
  $('#list').show();
}






















var pictureSource;   // picture source
var destinationType; // sets the format of returned value 

var img;

document.addEventListener("deviceready",onDeviceReady,false);

function form_submit(){
vtitulo = $("#titulo").val(); 
vcomentario = $("#comentario").val(); 
$('#loading').show();
$.post(SERVER+'insert_image.php', {image: img, titulo : vtitulo, comentario : vcomentario, app : APP}, function(data) {
      $("#content").html("<h3>Obrigado!</h3><p>Imagem enviada com sucesso, assim que moderada estará disponível no canal 'Galeria de Imagens'.</p>");    
      $('#loading').hide();
});
}     

function onDeviceReady() {
pictureSource=navigator.camera.PictureSourceType;
destinationType=navigator.camera.DestinationType;
}

function onPhotoDataSuccess(imageData) {
img = imageData;
var picture = document.getElementById('picture');
picture.style.display = 'block';
picture.src = "data:image/jpeg;base64," + imageData;       
}

function onPhotoURISuccess(imageData) {
img = imageData;
var picture = document.getElementById('picture');
picture.style.display = 'block';
picture.src = "data:image/jpeg;base64," + imageData;        
}    

function capturePhoto() {
navigator.camera.getPicture(onPhotoDataSuccess, onFail, { quality: 50, destinationType : Camera.DestinationType.DATA_URL });
}

function getPhoto(source) {
navigator.camera.getPicture(onPhotoURISuccess, onFail, { quality: 50, destinationType: destinationType.DATA_URL, sourceType: source });
}

function onFail(message) {
//alert('Failed because: ' + message);
}


$('#loading').hide();










$(document).ready(function() {
  $('.news_list').html = "";
  $('#news').html = "";
  $.ajaxSetup({ cache: false });
  $('#loading').show();
  $.ajax({
    url: SERVER+'json_news.php',
    dataType: 'json',
    data: { app: APP, section: 4 },
    async: false,
    success: function(data) {
    $.each(data.result, function(key, value) {    
          var news = "<li>";
          news += "    <a style='color:black;cursor:pointer;' onclick=\"javascript:open_news(\'"+escape(value.title)+"\',\'"+escape(value.text)+"\')\">"+value.title+"</a>";
          news += "</li>";   
      $('.news_list').append(news);
    });
    $('#loading').hide();
    }
  });
});

function open_news(vtitle, vtext){
  $('#full').html("");
  $('#backButt').html("<a style='cursor:pointer;' onclick=\"javascript:list_rss()\"><< Voltar</a>");
  $('#list').hide();
  $('#full').show();
  
  var news = "<h2>"+unescape(vtitle)+"</h2>";
  news += "<p>"+unescape(vtext)+"</p>";
  $('#full').append(news);
}

function list_rss(){
  $('#backButt').html("<a href='index.html'><< Voltar</a>");
  $('#full').html("");
  $('#full').hide();
  $('#list').show();
}














$(document).ready(function() {
  $.ajaxSetup({ cache: false });
  $('#loading').show();
  $.ajax({
    url: SERVER+'json_image.php',
    dataType: 'json',
    data: { app: APP },
    async: false,
    success: function(data) {
      $.each(data.result, function(key, value) {
        var news = "<li><div class='picContainer'><div><a href='"+SERVERIMG+"uploads/"+value.id+".jpg'><img style='width:75px;height:75px' src='"+SERVERIMG+"uploads/"+value.id+".jpg' alt='"+value.text+"'></a></div></div></li>";
        $('#Gallery').append(news);
      });    
      (function(window, $, PhotoSwipe){			
        $(document).ready(function(){				
          var options = {};        
          $("#Gallery a").photoSwipe(options);			
        });						
      }(window, window.jQuery, window.Code.PhotoSwipe)); 
      $('#loading').hide();
    }
  }); 
});











var arrayTitle = ["Apoios Gabriel Medina"];
var arrayURL = ["http://gabrielmedina13.com.br/category/apoios-2/feed/"];
var arrayContent = ["value.encoded"];
$(document).ready(function() {
  $('#list').html = "";
  for (i=0;i<arrayTitle.length;i++){
    var title = arrayTitle[i];
    var content = arrayContent[i];
    var news_title = "<h2>"+title+"</h2>";
    $('#list').append(news_title);
    $('#list').append("<div class='tweets'>");
    $('#list').append("<ul class='news_list'>");
    $.ajaxSetup({ cache: false });
    $('#loading').show();
    $.ajax({  
      url: 'http://query.yahooapis.com/v1/public/yql?q=SELECT * FROM feed WHERE url=\''+arrayURL[i]+'\'&format=json',  
      dataType: 'json',    
      async: false,  
      success: function(data){     
        $.each(data, function(data_key, data_value) {            
          $.each(data_value.results.item, function(key, value) {          
            var news = "<li class='clearfix news_first tweet_odd'>";
            news += "    <span class='news_time'><a style='cursor:pointer;' onclick=\"javascript:open_rss(\'"+escape(value.title)+"\',\'"+escape(eval(content))+"\')\">"+value.title+"</a></span>";
            news += "    <span class='news_text'>"+value.description+"</span>";
            news += "</li>";    
            $('.news_list').append(news);      
          });
        });
        $('#loading').hide();
      }
    });      
    $('#list').append("</ul>");
    $('#list').append("</div>");
  }
});

function open_rss(vtitle, vtext){
  $('#full').html("");
  $('#backButt').html("<a style='cursor:pointer;' onclick=\"javascript:list_rss()\"><< Voltar</a>");
  $('#list').hide();
  $('#full').show();
  
  var news = "<h2>"+unescape(vtitle)+"</h2>";
  news += "<p>"+unescape(vtext)+"</p>";
  $('#full').append(news);
}

function list_rss(){
  $('#backButt').html("<a href='index.html'><< Voltar</a>");
  $('#full').html("");
  $('#full').hide();
  $('#list').show();
}













$(document).ready(function() {
  var news = "";  
  var column = 1;  
  $.ajaxSetup({ cache: false });
  $('#loading').show();
  $.ajax({
    url: SERVER+'json_videos.php',
    dataType: 'json',
    data: { app: APP },
    async: false,
    success: function(data) {
      $.each(data.result, function(key, value) {    
        if (column == 1){
          news += "<div class='twoColumn clearfix videos'>";
          news += "<div class='first cols'>";
        }
        else{
          news += "<div class='second cols'>";    
        }
        news += "<div class='colWrapper'>";
        news += "<div class='picContainer picLarge'>";
        news += "<div class='video'></div>";
        if (value.vimeo == "")
          news += "<div><a href='http://www.youtube.com/embed/"+value.youtube+"?autoplay=1' class='fvideo various iframe'> <img alt='image' src='http://img.youtube.com/vi/"+value.youtube+"/0.jpg'/> </a></div>";
        else news += "<div><a href='http://vimeo.com/"+value.vimeo+"' class='fvideo various iframe'><img alt='image' src='images/regular/0.jpg'/></a></div>";
        news += "</div>";
        news += "<p>"+value.title+"</p>";
        news += "</div>";
        if (column == 1){
          news += "</div>";
          column = 2;
        }
        else{
          news += "</div>";
          news += "</div>";
          column = 1;
        }
      })
      if (column == 2){
        news += "</div>";
      }  
      $('.news_list').append(news); 
      $('#loading').hide();
    }
  });
});


/**
 * jQuery.browser.mobile (http://detectmobilebrowser.com/)
 *
 * jQuery.browser.mobile will be true if the browser is a mobile device
 *
 **/
(function(a){jQuery.browser.mobile=/android.+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|e\-|e\/|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(di|rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|xda(\-|2|g)|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))})(navigator.userAgent||navigator.vendor||window.opera);


// jquery.tweet.js - See http://tweet.seaofclouds.com/ or https://github.com/seaofclouds/tweet for more info
// Copyright (c) 2008-2011 Todd Matthews & Steve Purcell
(function (factory) {
  if (typeof define === 'function' && define.amd)
    define(['jquery'], factory); // AMD support for RequireJS etc.
  else
    factory(jQuery);
}(function ($) {
  $.fn.tweet = function(o){
    var s = $.extend({
      username: null,                           // [string or array] required unless using the 'query' option; one or more twitter screen names (use 'list' option for multiple names, where possible)
      list: null,                               // [string]   optional name of list belonging to username
      favorites: false,                         // [boolean]  display the user's favorites instead of his tweets
      query: null,                              // [string]   optional search query (see also: http://search.twitter.com/operators)
      avatar_size: null,                        // [integer]  height and width of avatar if displayed (48px max)
      count: 3,                                 // [integer]  how many tweets to display?
      fetch: null,                              // [integer]  how many tweets to fetch via the API (set this higher than 'count' if using the 'filter' option)
      page: 1,                                  // [integer]  which page of results to fetch (if count != fetch, you'll get unexpected results)
      retweets: true,                           // [boolean]  whether to fetch (official) retweets (not supported in all display modes)
      intro_text: null,                         // [string]   do you want text BEFORE your your tweets?
      outro_text: null,                         // [string]   do you want text AFTER your tweets?
      join_text:  null,                         // [string]   optional text in between date and tweet, try setting to "auto"
      auto_join_text_default: "i said,",        // [string]   auto text for non verb: "i said" bullocks
      auto_join_text_ed: "i",                   // [string]   auto text for past tense: "i" surfed
      auto_join_text_ing: "i am",               // [string]   auto tense for present tense: "i was" surfing
      auto_join_text_reply: "i replied to",     // [string]   auto tense for replies: "i replied to" @someone "with"
      auto_join_text_url: "i was looking at",   // [string]   auto tense for urls: "i was looking at" http:...
      loading_text: null,                       // [string]   optional loading text, displayed while tweets load
      refresh_interval: null ,                  // [integer]  optional number of seconds after which to reload tweets
      twitter_url: "twitter.com",               // [string]   custom twitter url, if any (apigee, etc.)
      twitter_api_url: "api.twitter.com",       // [string]   custom twitter api url, if any (apigee, etc.)
      twitter_search_url: "search.twitter.com", // [string]   custom twitter search url, if any (apigee, etc.)
      template: "{avatar}{time}{join}{text}",   // [string or function] template used to construct each tweet <li> - see code for available vars
      comparator: function(tweet1, tweet2) {    // [function] comparator used to sort tweets (see Array.sort)
        return tweet2["tweet_time"] - tweet1["tweet_time"];
      },
      filter: function(tweet) {                 // [function] whether or not to include a particular tweet (be sure to also set 'fetch')
        return true;
      }
      // You can attach callbacks to the following events using jQuery's standard .bind() mechanism:
      //   "loaded" -- triggered when tweets have been fetched and rendered
    }, o);

    // See http://daringfireball.net/2010/07/improved_regex_for_matching_urls
    var url_regexp = /\b((?:[a-z][\w-]+:(?:\/{1,3}|[a-z0-9%])|www\d{0,3}[.]|[a-z0-9.\-]+[.][a-z]{2,4}\/)(?:[^\s()<>]+|\(([^\s()<>]+|(\([^\s()<>]+\)))*\))+(?:\(([^\s()<>]+|(\([^\s()<>]+\)))*\)|[^\s`!()\[\]{};:'".,<>?«»“”‘’]))/gi;

    // Expand values inside simple string templates with {placeholders}
    function t(template, info) {
      if (typeof template === "string") {
        var result = template;
        for(var key in info) {
          var val = info[key];
          result = result.replace(new RegExp('{'+key+'}','g'), val === null ? '' : val);
        }
        return result;
      } else return template(info);
    }
    // Export the t function for use when passing a function as the 'template' option
    $.extend({tweet: {t: t}});

    function replacer (regex, replacement) {
      return function() {
        var returning = [];
        this.each(function() {
          returning.push(this.replace(regex, replacement));
        });
        return $(returning);
      };
    }

    function escapeHTML(s) {
      return s.replace(/</g,"&lt;").replace(/>/g,"^&gt;");
    }

    $.fn.extend({
      linkUser: replacer(/(^|[\W])@(\w+)/gi, "$1@<a href=\"http://"+s.twitter_url+"/$2\">$2</a>"),
      // Support various latin1 (\u00**) and arabic (\u06**) alphanumeric chars
      linkHash: replacer(/(?:^| )[\#]+([\w\u00c0-\u00d6\u00d8-\u00f6\u00f8-\u00ff\u0600-\u06ff]+)/gi,
                         ' <a href="http://'+s.twitter_search_url+'/search?q=&tag=$1&lang=all'+((s.username && s.username.length == 1 && !s.list) ? '&from='+s.username.join("%2BOR%2B") : '')+'">#$1</a>'),
      capAwesome: replacer(/\b(awesome)\b/gi, '<span class="awesome">$1</span>'),
      capEpic: replacer(/\b(epic)\b/gi, '<span class="epic">$1</span>'),
      makeHeart: replacer(/(&lt;)+[3]/gi, "<tt class='heart'>&#x2665;</tt>")
    });

    function linkURLs(text, entities) {
      return text.replace(url_regexp, function(match) {
        var url = (/^[a-z]+:/i).test(match) ? match : "http://"+match;
        var text = match;
        for(var i = 0; i < entities.length; ++i) {
          var entity = entities[i];
          if (entity.url == url && entity.expanded_url) {
            url = entity.expanded_url;
            text = entity.display_url;
            break;
          }
        }
        return "<a href=\""+escapeHTML(url)+"\">"+escapeHTML(text)+"</a>";
      });
    }

    function parse_date(date_str) {
      // The non-search twitter APIs return inconsistently-formatted dates, which Date.parse
      // cannot handle in IE. We therefore perform the following transformation:
      // "Wed Apr 29 08:53:31 +0000 2009" => "Wed, Apr 29 2009 08:53:31 +0000"
      return Date.parse(date_str.replace(/^([a-z]{3})( [a-z]{3} \d\d?)(.*)( \d{4})$/i, '$1,$2$4$3'));
    }

    function relative_time(date) {
      var relative_to = (arguments.length > 1) ? arguments[1] : new Date();
      var delta = parseInt((relative_to.getTime() - date) / 1000, 10);
      var r = '';
      if (delta < 1) {
        r = 'just now';
      } else if (delta < 60) {
        r = delta + ' seconds ago';
      } else if(delta < 120) {
        r = 'a minute ago';
      } else if(delta < (45*60)) {
        r = (parseInt(delta / 60, 10)).toString() + ' minutes ago';
      } else if(delta < (2*60*60)) {
        r = 'an hour ago';
      } else if(delta < (24*60*60)) {
        r = '' + (parseInt(delta / 3600, 10)).toString() + ' hours ago';
      } else if(delta < (48*60*60)) {
        r = 'a day ago';
      } else {
        r = (parseInt(delta / 86400, 10)).toString() + ' days ago';
      }
      return 'about ' + r;
    }

    function build_auto_join_text(text) {
      if (text.match(/^(@([A-Za-z0-9-_]+)) .*/i)) {
        return s.auto_join_text_reply;
      } else if (text.match(url_regexp)) {
        return s.auto_join_text_url;
      } else if (text.match(/^((\w+ed)|just) .*/im)) {
        return s.auto_join_text_ed;
      } else if (text.match(/^(\w*ing) .*/i)) {
        return s.auto_join_text_ing;
      } else {
        return s.auto_join_text_default;
      }
    }

    function build_api_url() {
      var proto = ('https:' == document.location.protocol ? 'https:' : 'http:');
      var count = (s.fetch === null) ? s.count : s.fetch;
      var common_params = '&include_entities=1&callback=?';
      if (s.list) {
        return proto+"//"+s.twitter_api_url+"/1/"+s.username[0]+"/lists/"+s.list+"/statuses.json?page="+s.page+"&per_page="+count+common_params;
      } else if (s.favorites) {
        return proto+"//"+s.twitter_api_url+"/favorites/"+s.username[0]+".json?page="+s.page+"&count="+count+common_params;
      } else if (s.query === null && s.username.length == 1) {
        return proto+'//'+s.twitter_api_url+'/1/statuses/user_timeline.json?screen_name='+s.username[0]+'&count='+count+(s.retweets ? '&include_rts=1' : '')+'&page='+s.page+common_params;
      } else {
        var query = (s.query || 'from:'+s.username.join(' OR from:'));
        return proto+'//'+s.twitter_search_url+'/search.json?&q='+encodeURIComponent(query)+'&rpp='+count+'&page='+s.page+common_params;
      }
    }

    function extract_avatar_url(item, secure) {
      if (secure) {
        return ('user' in item) ?
          item.user.profile_image_url_https :
          extract_avatar_url(item, false).
            replace(/^http:\/\/[a-z0-9]{1,3}\.twimg\.com\//, "https://s3.amazonaws.com/twitter_production/");
      } else {
        return item.profile_image_url || item.user.profile_image_url;
      }
    }

    // Convert twitter API objects into data available for
    // constructing each tweet <li> using a template
    function extract_template_data(item){
      var o = {};
      o.item = item;
      o.source = item.source;
      o.screen_name = item.from_user || item.user.screen_name;
      o.avatar_size = s.avatar_size;
      o.avatar_url = extract_avatar_url(item, (document.location.protocol === 'https:'));
      o.retweet = typeof(item.retweeted_status) != 'undefined';
      o.tweet_time = parse_date(item.created_at);
      o.join_text = s.join_text == "auto" ? build_auto_join_text(item.text) : s.join_text;
      o.tweet_id = item.id_str;
      o.twitter_base = "http://"+s.twitter_url+"/";
      o.user_url = o.twitter_base+o.screen_name;
      o.tweet_url = o.user_url+"/status/"+o.tweet_id;
      o.reply_url = o.twitter_base+"intent/tweet?in_reply_to="+o.tweet_id;
      o.retweet_url = o.twitter_base+"intent/retweet?tweet_id="+o.tweet_id;
      o.favorite_url = o.twitter_base+"intent/favorite?tweet_id="+o.tweet_id;
      o.retweeted_screen_name = o.retweet && item.retweeted_status.user.screen_name;
      o.tweet_relative_time = relative_time(o.tweet_time);
      o.entities = item.entities ? (item.entities.urls || []).concat(item.entities.media || []) : [];
      o.tweet_raw_text = o.retweet ? ('RT @'+o.retweeted_screen_name+' '+item.retweeted_status.text) : item.text; // avoid '...' in long retweets
      o.tweet_text = $([linkURLs(o.tweet_raw_text, o.entities)]).linkUser().linkHash()[0];
      o.tweet_text_fancy = $([o.tweet_text]).makeHeart().capAwesome().capEpic()[0];

      // Default spans, and pre-formatted blocks for common layouts
      o.user = t('<a class="tweet_user" href="{user_url}">{screen_name}</a>', o);
      o.join = s.join_text ? t(' <span class="tweet_join">{join_text}</span> ', o) : ' ';
      o.avatar = o.avatar_size ?
        t('<a class="tweet_avatar" href="{user_url}"><span class="picContainer picInline left"> <span><img src="{avatar_url}" height="{avatar_size}" width="{avatar_size}" alt="{screen_name}\'s avatar" title="{screen_name}\'s avatar" border="0"/></span></span></a>', o) : '';
      o.time = t('<span class="tweet_time"><a href="{tweet_url}" title="view tweet on twitter">{tweet_relative_time}</a></span>', o);
      o.text = t('<span class="tweet_text">{tweet_text_fancy}</span>', o);
      o.reply_action = t('<a class="tweet_action tweet_reply" href="{reply_url}">reply</a>', o);
      o.retweet_action = t('<a class="tweet_action tweet_retweet" href="{retweet_url}">retweet</a>', o);
      o.favorite_action = t('<a class="tweet_action tweet_favorite" href="{favorite_url}">favorite</a>', o);
      return o;
    }

    return this.each(function(i, widget){
      var list = $('<ul class="tweet_list">');
      var intro = '<p class="tweet_intro">'+s.intro_text+'</p>';
      var outro = '<p class="tweet_outro">'+s.outro_text+'</p>';
      var loading = $('<p class="loading">'+s.loading_text+'</p>');

      if(s.username && typeof(s.username) == "string"){
        s.username = [s.username];
      }

      $(widget).unbind("tweet:load").bind("tweet:load", function(){
        if (s.loading_text) $(widget).empty().append(loading);
        $.getJSON(build_api_url(), function(data){
          $(widget).empty().append(list);
          if (s.intro_text) list.before(intro);
          list.empty();

          var tweets = $.map(data.results || data, extract_template_data);
          tweets = $.grep(tweets, s.filter).sort(s.comparator).slice(0, s.count);
          list.append($.map(tweets, function(o) { return "<li class='clearfix'>" + t(s.template, o) + "</li>"; }).join('')).
              children('li:first').addClass('tweet_first').end().
              children('li:odd').addClass('tweet_even').end().
              children('li:even').addClass('tweet_odd');

          if (s.outro_text) list.after(outro);
          $(widget).trigger("loaded").trigger((tweets.length === 0 ? "empty" : "full"));
          if (s.refresh_interval) {
            window.setTimeout(function() { $(widget).trigger("tweet:load"); }, 1000 * s.refresh_interval);
          }
        });
      }).trigger("tweet:load");
    });
  };
  $(".twitter_list li").last().css({borderBottom:"none"});
}));


var addToHomeConfig = {
	animationIn: 'bubble',
	animationOut: 'drop',
	lifespan:10000,//The amount of time the bubble will stay visible
	expire:5,//The amount of times before the add to homescreen bubble is shown again
	touchIcon:true,
	message:'Install this website on your <strong>%device</strong>. Tap `%icon` and then <strong>Add to Home Screen</strong>.'
};



SERVER = 'http://www.interagentes.net/mserver/';
SERVERIMG = 'http://www.interagentes.net/mserver/';
APP = '1345133202';
