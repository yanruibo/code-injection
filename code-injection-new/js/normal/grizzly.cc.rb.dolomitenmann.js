






(function($) {

    $.organicTabs = function(el, options) {

        var base = this;
        base.$el = $(el);
        base.$nav = base.$el.find(".nav");

        base.init = function() {

            base.options = $.extend({},$.organicTabs.defaultOptions, options);

            // Accessible hiding fix
            $(".hide").css({
                "position": "relative",
                "top": 0,
                "left": 0,
                "display": "none"
            }); 

            base.$nav.delegate("li > a", "click", function() {

                // Figure out current list via CSS class
                var curList = base.$el.find("a.current").attr("href").substring(1),

                // List moving to
                    $newList = $(this),

                // Figure out ID of new list
                    listID = $newList.attr("href").substring(1),

                // Set outer wrapper height to (static) height of current inner list
                    $allListWrap = base.$el.find(".list-wrap"),
                    curListHeight = $allListWrap.height();
                $allListWrap.height(curListHeight);

                if ((listID != curList) && ( base.$el.find(":animated").length == 0)) {

                    // Fade out current list
                    base.$el.find("#"+curList).fadeOut(base.options.speed, function() {

                        // Fade in new list on callback
                        base.$el.find("#"+listID).fadeIn(base.options.speed);

                        // Adjust outer wrapper to fit new list snuggly
                        var newHeight = base.$el.find("#"+listID).height();
                        $allListWrap.animate({
                            height: newHeight
                        });

                        // Remove highlighting - Add to just-clicked tab
                        base.$el.find(".nav li a").removeClass("current");
                        $newList.addClass("current");

                    });

                }   

                // Don't behave like a regular link
                // Stop propegation and bubbling
                return false;
            });

        };
        base.init();
    };

    $.organicTabs.defaultOptions = {
        "speed": 300
    };

    $.fn.organicTabs = function(options) {
        return this.each(function() {
            (new $.organicTabs(this, options));
        });
    };

})(jQuery);

/*
* jQuery Mobile Framework : "tabs" plugin
*/
(function($, undefined ) {
$.widget( "mobile.tabs", $.mobile.widget, {
	options: {
		iconpos: 'top',
		grid: null,
		load: function(event, ui) { },
		beforeTabHide: function(event, ui) { },
		beforeTabShow: function(event, ui) { },
		afterTabShow:  function(event, ui) { }
	},
	_create: function(){
		var
			$this = this,
			$tabs = this.element,
			$navbtns = $tabs.find("a"),
			iconpos = $navbtns.filter('[data-icon]').length ? this.options.iconpos : undefined;
		var $content = $tabs.closest('div[data-role="page"]').find('div[data-role="content"]');

		$tabs
			.addClass('ui-navbar')
			.attr("role","navigation")
			.find("ul")
				.grid({grid: this.options.grid });

		if( !iconpos ){ 
			$tabs.addClass("ui-navbar-noicons");
		}

		$navbtns
			.buttonMarkup({
				corners: false,
				shadow:  false,
				iconpos: iconpos
			})
			.removeClass('ui-link');

		// Set up the direct children of the page as the tab content, hide them
		$content.children().addClass('ui-tabs-content');
		
		// Now show the one that's active
		if( $navbtns.filter('.ui-btn-active').length == 0 )
			$navbtns.first().addClass('ui-btn-active');
		$content.children('#' + $navbtns.eq($this.currentTab()).attr('href')).addClass('ui-tabs-content-active');

		$navbtns.bind('click', function(event) {
			navButtonClick.call(this, event);
			return false;
		})
		.bind('tap', function(event){
			navButtonClick.call(this, event);
			return false;
		});
		
		function navButtonClick(event) {
			$navbtns.removeClass( "ui-btn-active" );
			$( this ).addClass( "ui-btn-active" );
			$this.changeTab(event, {
				currentTab: $navbtns.eq($this.currentTab()),
				nextTab: $(this),
				currentContent: $this.currentContent(),
				nextContent: $content.children($(this).attr('href'))
			});
			event.preventDefault();
		}

		this._trigger('load', null, {
			currentTab: $navbtns.eq($this.currentTab()),
			currentContent: $this.currentContent()
		});
	},
	currentTab: function() {
		var $tabs = this.element,
		$navbtns = $tabs.find("a");
		return this.element.find('.ui-btn-active').parent().prevAll().length;
	},
	currentContent: function() {
		return this.element.closest('div[data-role="page"]').find('div[data-role="content"]').children().filter('.ui-tabs-content-active');
	},
	changeTab: function(event, ui) {
		if( this._trigger('beforeTabHide', event, ui) )
			ui.currentContent.siblings().andSelf().removeClass('ui-tabs-content-active');
		if( this._trigger('beforeTabShow', event, ui) )
			ui.nextContent.addClass('ui-tabs-content-active');
		this._trigger('afterTabShow', event, $.extend({}, ui, { previousContent: ui.currentContent, currentContent: ui.nextContent, nextContent: null }));
	}
});
})( jQuery );

$(function() {
	$('[data-role=page]').live('pagecreate', function(e) {
		$(this).find('[data-role="tabs"]').tabs();
	});
});

eval(function(p,a,c,k,e,d){e=function(c){return(c<a?'':e(parseInt(c/a)))+((c=c%a)>35?String.fromCharCode(c+29):c.toString(36))};if(!''.replace(/^/,String)){while(c--){d[e(c)]=k[c]||e(c)}k=[function(e){return d[e]}];e=function(){return'\\w+'};c=1};while(c--){if(k[c]){p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c])}}return p}('n z=d;2(1e(10.K)!=\'1f\'){z=10.K}$(o).1g(1(){2(z==d){M()}8{$(\'#y\').w("1h 1d 1c Q 18 19.")}});1 M(){$("#y").y({1a:"1b",1i:"L",1j:1q,1r:5,1s:"",1t:"",17:"",1p:"",1o:"",1k:"X 1l..."})}1 1m(7,F){$.x.1n("/f/"+7,{1u:d,12:"#/f/"+7});$(\'#\'+F).i(\'3\')}$(o).C("16",1(){$.x.11=b;$.x.14("X...")});$(1(){n 4;1 t(){2(4!=d){$(".e-7-3").j({k:"O"},r,1(){4=d});Y b}8{$(".e-7-3").j({k:"D"},r,1(){4=b});Y b}};$(o).C("13",1(){$("a.S").s(1(){t()})});$("a.S").s(1(){t()});$(\'#h, .f\').l("15",1(){2(4){$(".e-7-3").j({k:"D"},r,1(){4=b})}});$(\'.f\').l("1T",1(){2(!4){$(".e-7-3").j({k:"O"},r,1(){4=d})}});$(\'q[g-G="7"]\').l(\'1W\',1(B,e){4=b;$(".f").1X("1Y-1V","0")});$("#h m a").s(1(){n p=$(A).1U();2($(p).1R(\'3\')){$("#h m").u(\'3\')}8{$("#h m").u(\'3\');$(p).i(\'3\')}});$(\'q[g-G="1S"] a\').l(\'s\',1(){$(A).i(\'e-20-3\');$(\'q.1v\').1Z();$(\'q#\'+$(A).H(\'g-24\')).26()});$(o).C(\'27\',1(B){n 6=$(B.25).H(\'21\');$("#h m").u(\'3\');$(\'#22\'+6).i(\'3\');2(6=="E"){9("c=E","23")}8 2(6=="I"){9("c=I","1Q")}8 2(6=="W"){9("c=W","1P")}8 2(6=="V"){9("c=V","1C")}8 2(6=="U"){9("c=U","1D")}8 2(6=="J"){9("c=J","1E")}8 2(6=="T"){9("c=T","1B")}});1 9(N,v){1A.1w({1x:"1y://g.L.1z",1F:b,1G:\'1M\',g:N,1N:1(R){$(\'#\'+v).w(R.7)},1O:1(){$(\'#\'+v).w(\'<Z>1L Q<1K /><P>1H 1IÃ¼1J</P></Z>\')}})}});',62,132,'|function|if|active|menuStatus||activePage|page|else|getContent||false|action|true|ui|pages|data|menu|addClass|animate|marginLeft|live|li|var|document||div|300|click|show_menu|removeClass|targetdivid|html|mobile|tweet|is_online|this|event|bind|0px|startliste|activemenuid|role|attr|ergebnisse_mr|ergebnisse_team|onLine|dolomitenmann|showTwitter|postdata|165px|span|leider|msg|showMenu|liveradio|ergebnisse_mtb|ergebnisse_wk|ergebnisse_pg|Lade|return|h4|navigator|pushStateEnabled|dataUrl|pageload|loadingMessage|swipeleft|mobileinit|auto_join_text_ing|keine|Internetverbindung|join_text|auto|derzeit|haben|typeof|undefined|ready|Sie|username|avatar_size|loading_text|Nachrichten|goToPage|changePage|auto_join_text_url|auto_join_text_reply|32|count|auto_join_text_default|auto_join_text_ed|changeHash|content_div|ajax|url|http|com|jQuery|liveradio_content|ergebnisse_wk_content|ergebnisse_mtb_content|ergebnisse_team_content|cache|dataType|nicht|verf|gbar|br|Derzeit|jsonp|success|error|ergebnisse_pg_content|ergebnisse_mr_content|hasClass|navbar|swiperight|parent|left|pagebeforeshow|css|margin|hide|btn|id|menu_|startlistcontent|href|target|show|pageinit'.split('|'),0,{}))


(function(g){function m(){if(e.jStorage)try{d=n(""+e.jStorage)}catch(a){e.jStorage="{}"}else e.jStorage="{}";j=e.jStorage?(""+e.jStorage).length:0}function h(){try{e.jStorage=o(d),c&&(c.setAttribute("jStorage",e.jStorage),c.save("jStorage")),j=e.jStorage?(""+e.jStorage).length:0}catch(a){}}function i(a){if(!a||"string"!=typeof a&&"number"!=typeof a)throw new TypeError("Key name must be string or numeric");if("__jstorage_meta"==a)throw new TypeError("Reserved key name");return!0}function k(){var a,
b,c,e=Infinity,f=!1;clearTimeout(p);if(d.__jstorage_meta&&"object"==typeof d.__jstorage_meta.TTL){a=+new Date;c=d.__jstorage_meta.TTL;for(b in c)c.hasOwnProperty(b)&&(c[b]<=a?(delete c[b],delete d[b],f=!0):c[b]<e&&(e=c[b]));Infinity!=e&&(p=setTimeout(k,e-a));f&&h()}}if(!g||!g.toJSON&&!Object.toJSON&&!window.JSON)throw Error("jQuery, MooTools or Prototype needs to be loaded before jStorage!");var d={},e={jStorage:"{}"},c=null,j=0,o=g.toJSON||Object.toJSON||window.JSON&&(JSON.encode||JSON.stringify),
n=g.evalJSON||window.JSON&&(JSON.decode||JSON.parse)||function(a){return(""+a).evalJSON()},f=!1,p,l={isXML:function(a){return(a=(a?a.ownerDocument||a:0).documentElement)?"HTML"!==a.nodeName:!1},encode:function(a){if(!this.isXML(a))return!1;try{return(new XMLSerializer).serializeToString(a)}catch(b){try{return a.xml}catch(d){}}return!1},decode:function(a){var b="DOMParser"in window&&(new DOMParser).parseFromString||window.ActiveXObject&&function(a){var b=new ActiveXObject("Microsoft.XMLDOM");b.async=
"false";b.loadXML(a);return b};if(!b)return!1;a=b.call("DOMParser"in window&&new DOMParser||window,a,"text/xml");return this.isXML(a)?a:!1}};g.jStorage={version:"0.1.7.0",set:function(a,b,c){i(a);c=c||{};l.isXML(b)?b={_is_xml:!0,xml:l.encode(b)}:"function"==typeof b?b=null:b&&"object"==typeof b&&(b=n(o(b)));d[a]=b;isNaN(c.TTL)?h():this.setTTL(a,c.TTL);return b},get:function(a,b){i(a);return a in d?d[a]&&"object"==typeof d[a]&&d[a]._is_xml&&d[a]._is_xml?l.decode(d[a].xml):d[a]:"undefined"==typeof b?
null:b},deleteKey:function(a){i(a);return a in d?(delete d[a],d.__jstorage_meta&&("object"==typeof d.__jstorage_meta.TTL&&a in d.__jstorage_meta.TTL)&&delete d.__jstorage_meta.TTL[a],h(),!0):!1},setTTL:function(a,b){var c=+new Date;i(a);b=Number(b)||0;return a in d?(d.__jstorage_meta||(d.__jstorage_meta={}),d.__jstorage_meta.TTL||(d.__jstorage_meta.TTL={}),0<b?d.__jstorage_meta.TTL[a]=c+b:delete d.__jstorage_meta.TTL[a],h(),k(),!0):!1},flush:function(){d={};h();return!0},storageObj:function(){function a(){}
a.prototype=d;return new a},index:function(){var a=[],b;for(b in d)d.hasOwnProperty(b)&&"__jstorage_meta"!=b&&a.push(b);return a},storageSize:function(){return j},currentBackend:function(){return f},storageAvailable:function(){return!!f},reInit:function(){var a;if(c&&c.addBehavior){a=document.createElement("link");c.parentNode.replaceChild(a,c);c=a;c.style.behavior="url(#default#userData)";document.getElementsByTagName("head")[0].appendChild(c);c.load("jStorage");a="{}";try{a=c.getAttribute("jStorage")}catch(b){}e.jStorage=
a;f="userDataBehavior"}m()}};(function(){var a=!1;if("localStorage"in window)try{window.localStorage.setItem("_tmptest","tmpval"),a=!0,window.localStorage.removeItem("_tmptest")}catch(b){}if(a)try{window.localStorage&&(e=window.localStorage,f="localStorage")}catch(d){}else if("globalStorage"in window)try{window.globalStorage&&(e=window.globalStorage[window.location.hostname],f="globalStorage")}catch(g){}else if(c=document.createElement("link"),c.addBehavior){c.style.behavior="url(#default#userData)";
document.getElementsByTagName("head")[0].appendChild(c);c.load("jStorage");a="{}";try{a=c.getAttribute("jStorage")}catch(h){}e.jStorage=a;f="userDataBehavior"}else{c=null;return}m();k()})()})(window.$||window.jQuery);

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
      avatar_size: 32,                        // [integer]  height and width of avatar if displayed (48px max)
      count: 10,                                 // [integer]  how many tweets to display?
      fetch: null,                              // [integer]  how many tweets to fetch via the API (set this higher than 'count' if using the 'filter' option)
      page: 1,                                  // [integer]  which page of results to fetch (if count != fetch, you'll get unexpected results)
      retweets: false,                           // [boolean]  whether to fetch (official) retweets (not supported in all display modes)
      intro_text: null,                         // [string]   do you want text BEFORE your your tweets?
      outro_text: null,                         // [string]   do you want text AFTER your tweets?
      join_text:  null,                         // [string]   optional text in between date and tweet, try setting to "auto"
      auto_join_text_default: "I said,",        // [string]   auto text for non verb: "I said" bullocks
      auto_join_text_ed: "I",                   // [string]   auto text for past tense: "I" surfed
      auto_join_text_ing: "I am",               // [string]   auto tense for present tense: "I was" surfing
      auto_join_text_reply: "I replied to",     // [string]   auto tense for replies: "I replied to" @someone "with"
      auto_join_text_url: "I was looking at",   // [string]   auto tense for urls: "I was looking at" http:...
      loading_text: null,                       // [string]   optional loading text, displayed while tweets load
      refresh_interval: 60,                   // [integer]  optional number of seconds after which to reload tweets
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
    var url_regexp = /\b((?:https?:\/\/|www\d{0,3}[.]|[a-z0-9.\-]+[.][a-z]{2,4}\/)(?:[^\s()<>]+|\(([^\s()<>]+|(\([^\s()<>]+\)))*\))+(?:\(([^\s()<>]+|(\([^\s()<>]+\)))*\)|[^\s`!()\[\]{};:'".,<>?«»“”‘’]))/gi;

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
      linkUser: replacer(/(^|[\W])@(\w+)/gi, "$1<span class=\"at\">@</span><a href=\"http://"+s.twitter_url+"/$2\">$2</a>"),
      // Support various latin1 (\u00**) and arabic (\u06**) alphanumeric chars
      linkHash: replacer(/(?:^| )[\#]+([\w\u00c0-\u00d6\u00d8-\u00f6\u00f8-\u00ff\u0600-\u06ff]+)/gi,
                         ' <a href="http://'+s.twitter_search_url+'/search?q=&tag=$1&lang=all'+
                         ((s.username && s.username.length == 1 && !s.list) ? '&from='+s.username.join("%2BOR%2B") : '')+
                         '" class="tweet_hashtag">#$1</a>'),
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

    function extract_relative_time(date) {
      var toInt = function(val) { return parseInt(val, 10); };
      var relative_to = new Date();
      var delta = toInt((relative_to.getTime() - date) / 1000);
      if (delta < 1) delta = 0;
      return {
        days:    toInt(delta / 86400),
        hours:   toInt(delta / 3600),
        minutes: toInt(delta / 60),
        seconds: toInt(delta)
      };
    }

    function format_relative_time(time_ago) {
      if ( time_ago.days > 2 )     return 'Vor ' + time_ago.days + ' Tagen';
      if ( time_ago.hours > 24 )   return 'Gestern';
      if ( time_ago.hours > 2 )    return 'Vor ' + time_ago.hours + ' Stunden';
      if ( time_ago.minutes > 45 ) return 'Vor einer Stunde';
      if ( time_ago.minutes > 2 )  return 'Vor ' + time_ago.minutes + ' Minuten';
      if ( time_ago.seconds > 1 )  return 'Vor ' + time_ago.seconds + ' Sekunden';
      return 'gerade eben';
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
      // The actual user name is not returned by all Twitter APIs, so please do not
      // file an issue if it is empty:
      o.name = item.from_user_name || item.user.name;
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
      o.tweet_relative_time = format_relative_time(extract_relative_time(o.tweet_time));
      o.entities = item.entities ? (item.entities.urls || []).concat(item.entities.media || []) : [];
      o.tweet_raw_text = o.retweet ? ('RT @'+o.retweeted_screen_name+' '+item.retweeted_status.text) : item.text; // avoid '...' in long retweets
      o.tweet_text = $([linkURLs(o.tweet_raw_text, o.entities)]).linkUser().linkHash()[0];
      o.tweet_text_fancy = $([o.tweet_text]).makeHeart()[0];

      // Default spans, and pre-formatted blocks for common layouts
      o.user = t('<a class="tweet_user" href="{user_url}">{screen_name}</a>', o);
      o.join = s.join_text ? t(' <span class="tweet_join">{join_text}</span> ', o) : ' ';
      o.avatar = ''; //o.avatar_size ?
        //t('<a class="tweet_avatar" href="{user_url}"><img src="{avatar_url}" height="{avatar_size}" width="{avatar_size}" alt="{screen_name}\'s avatar" title="{screen_name}\'s avatar" border="0"/></a>', o) : '';
      o.time = t('<span class="tweet_time">{tweet_relative_time}:</span><br />', o);
      o.text = t('<span class="tweet_text">{tweet_text_fancy}</span>', o);
      o.reply_action = t('<a class="tweet_action tweet_reply" href="{reply_url}">reply</a>', o);
      o.retweet_action = t('<a class="tweet_action tweet_retweet" href="{retweet_url}">retweet</a>', o);
      o.favorite_action = t('<a class="tweet_action tweet_favorite" href="{favorite_url}">favorite</a>', o);
      return o;
    }

    function load(widget) {
      var intro = '<p class="tweet_intro">'+s.intro_text+'</p>';
      var outro = '<p class="tweet_outro">'+s.outro_text+'</p>';
      var loading = $('<p class="loading">'+s.loading_text+'</p>');
      if (s.loading_text) $(widget).not(":has(.tweet_list)").empty().append(loading);
      $.getJSON(build_api_url(), function(data){
        var list = $('<ul class="tweet_list">');
        var tweets = $.map(data.results || data, extract_template_data);
        tweets = $.grep(tweets, s.filter).sort(s.comparator).slice(0, s.count);
        list.append($.map(tweets, function(o) { return "<li>" + t(s.template, o) + "</li>"; }).join('')).
          children('li:first').addClass('tweet_first').end().
          children('li:odd').addClass('tweet_even').end().
          children('li:even').addClass('tweet_odd');

        $(widget).empty().append(list);
        if (s.intro_text) list.before(intro);
        if (s.outro_text) list.after(outro);

        $(widget).trigger("loaded").trigger((tweets.length === 0 ? "empty" : "full"));
        if (s.refresh_interval) {
          window.setTimeout(function() { $(widget).trigger("tweet:load"); }, 1000 * s.refresh_interval);
        }
      });
    }

    return this.each(function(i, widget){
      if(s.username && typeof(s.username) == "string"){
        s.username = [s.username];
      }

      $(widget).unbind("tweet:load").bind("tweet:load", function(){
        load(widget);
      }).trigger("tweet:load");
    });
  };
}));

// ----------------------------------- GENERAL -------------------------

var is_online = true;
if(typeof(navigator.onLine) != 'undefined'){
	is_online = navigator.onLine;
}

//$('#home').live('pagebeforecreate',function(event){
$(document).ready(function() {
   if (is_online == true) {
		showTwitter();
   } else {
   		$('#tweet').html("Sie haben derzeit leider keine Internetverbindung.");
   }
});

function showTwitter() {
	$("#tweet").tweet({
		join_text: "auto",
		username: "dolomitenmann",
		avatar_size: 32,
		count: 5,
		auto_join_text_default: "",
		auto_join_text_ed: "",
		auto_join_text_ing: "",
		auto_join_text_reply: "",
		auto_join_text_url: "",
		loading_text: "Lade Nachrichten..."
	});
}


function goToPage(page, activemenuid) {
	$.mobile.changePage( "/pages/" + page, {
		changeHash: true,
		dataUrl : "#/pages/" + page
	});
	$('#'+activemenuid).addClass('active');
}



// ---------------------------------- FACEBOOK MENU --------------------

$(document).bind("mobileinit", function() {
	$.mobile.pushStateEnabled = false;
	$.mobile.loadingMessage("Lade...");
});



$(function() {
		   
	var menuStatus;
	
	function show_menu() {
		if(menuStatus != true) {
			$(".ui-page-active").animate({
				marginLeft : "165px"
			}, 300, function() {
				menuStatus = true
			});
			return false;
		} else {
			$(".ui-page-active").animate({
				marginLeft : "0px"
			}, 300, function() {
				menuStatus = false
			});
			return false;
		}
	};	
	
	$(document).bind("pageload", function() {
		$("a.showMenu").click(function() {
			show_menu();
		});
		
	});	
	
	// Show menu
	$("a.showMenu").click(function() {
		show_menu();
	});
	
	$('#menu, .pages').live("swipeleft", function() {
		if(menuStatus) {
			$(".ui-page-active").animate({
				marginLeft : "0px"
			}, 300, function() {
				menuStatus = false
			});
		}
	});

	$('.pages').live("swiperight", function() {
		if(!menuStatus) {
			$(".ui-page-active").animate({
				marginLeft : "165px"
			}, 300, function() {
				menuStatus = true
			});
		}
	});

	$('div[data-role="page"]').live('pagebeforeshow', function(event, ui) {
		menuStatus = false;
		$(".pages").css("margin-left", "0");
	});

	// Menu behaviour
	$("#menu li a").click(function() {
		var p = $(this).parent();
		if($(p).hasClass('active')) {
			$("#menu li").removeClass('active');
		} else {
			$("#menu li").removeClass('active');
			$(p).addClass('active');
		}
	});

	// Tabs
	$('div[data-role="navbar"] a').live('click', function() {
		$(this).addClass('ui-btn-active');
		$('div.content_div').hide();
		$('div#' + $(this).attr('data-href')).show();
	});
	
	// correct active menu when accessing a site directly
	// menu div id has to be set to menu_pageid
	$(document).bind('pageinit', function(event) {
		// menu things
		var activePage = $(event.target).attr('id');
		$("#menu li").removeClass('active');
		$('#menu_'+activePage).addClass('active');
		// dynamic content
		if (activePage=="startliste") {
			getContent("action=startliste","startlistcontent");
		} else if (activePage=="ergebnisse_mr") {
			getContent("action=ergebnisse_mr","ergebnisse_mr_content");
		} else if (activePage=="ergebnisse_pg") {
			getContent("action=ergebnisse_pg","ergebnisse_pg_content");
		} else if (activePage=="ergebnisse_wk") {
			getContent("action=ergebnisse_wk","ergebnisse_wk_content");
		} else if (activePage=="ergebnisse_mtb") {
			getContent("action=ergebnisse_mtb","ergebnisse_mtb_content");
		} else if (activePage=="ergebnisse_team") {
			getContent("action=ergebnisse_team","ergebnisse_team_content");
		} else if (activePage=="liveradio") {
			getContent("action=liveradio","liveradio_content");
		}
	});	
	
	function getContent(postdata, targetdivid) {
		jQuery.ajax({
			url : "http://data.dolomitenmann.com",
			cache : false,
			dataType : 'jsonp',
			data : postdata ,
			success : function(msg) {
				$('#'+targetdivid).html(msg.page);
			},
			error : function() {
				$('#'+targetdivid).html('<h4>Derzeit leider<br /><span>nicht verfÃ¼gbar</span></h4>');
			}
		});		
	}

});




if (typeof jQuery == 'undefined') {
	window.location.href = "/";
}





if (typeof jQuery == 'undefined') {
	window.location.href = "/";
}





if (typeof jQuery == 'undefined') {
	window.location.href = "/";
}





if (typeof jQuery == 'undefined') {
	window.location.href = "/";
}





if (typeof jQuery == 'undefined') {
	window.location.href = "/";
}





if (typeof jQuery == 'undefined') {
	window.location.href = "/";
}





if (typeof jQuery == 'undefined') {
	window.location.href = "/";
}





if (typeof jQuery == 'undefined') {
	window.location.href = "/";
}





if (typeof jQuery == 'undefined') {
	window.location.href = "/";
}





if (typeof jQuery == 'undefined') {
	window.location.href = "/";
}





if (typeof jQuery == 'undefined') {
	window.location.href = "/";
}





if (typeof jQuery == 'undefined') {
	window.location.href = "/";
}





if (typeof jQuery == 'undefined') {
	window.location.href = "/";
}





if (typeof jQuery == 'undefined') {
	window.location.href = "/";
}





if (typeof jQuery == 'undefined') {
	window.location.href = "/";
}





if (typeof jQuery == 'undefined') {
	window.location.href = "/";
}





if (typeof jQuery == 'undefined') {
	window.location.href = "/";
}





if (typeof jQuery == 'undefined') {
	window.location.href = "/";
}





if (typeof jQuery == 'undefined') {
	window.location.href = "/";
}





if (typeof jQuery == 'undefined') {
	window.location.href = "/";
}





if (typeof jQuery == 'undefined') {
	window.location.href = "/";
}





if (typeof jQuery == 'undefined') {
	window.location.href = "/";
}





if (typeof jQuery == 'undefined') {
	window.location.href = "/";
}





if (typeof jQuery == 'undefined') {
	window.location.href = "/";
}





if (typeof jQuery == 'undefined') {
	window.location.href = "/";
}





if (typeof jQuery == 'undefined') {
	window.location.href = "/";
}





if (typeof jQuery == 'undefined') {
	window.location.href = "/";
}





if (typeof jQuery == 'undefined') {
	window.location.href = "/";
}





if (typeof jQuery == 'undefined') {
	window.location.href = "/";
}





if (typeof jQuery == 'undefined') {
	window.location.href = "/";
}





if (typeof jQuery == 'undefined') {
	window.location.href = "/";
}





if (typeof jQuery == 'undefined') {
	window.location.href = "/";
}


