



















































/**
 * This jQuery plugin displays pagination links inside the selected elements.
 *
 * @author Gabriel Birke (birke *at* d-scribe *dot* de)
 * @version 1.2
 * @param {int} maxentries Number of entries to paginate
 * @param {Object} opts Several options (see README for documentation)
 * @return {Object} jQuery Object
 */
jQuery.fn.pagination = function(maxentries, opts){
	opts = jQuery.extend({
		items_per_page:10,
		num_display_entries:4,
		current_page:0,
		num_edge_entries:1,
		link_to:"#",
		prev_text:"",
		next_text:"",
		ellipse_text:"...",
		prev_show_always:false,
		next_show_always:false,
		callback:loadCompanyContent
	},opts||{});
	
	return this.each(function() {
		/**
		 * Calculate the maximum number of pages
		 */
		function numPages() {
			return Math.ceil(maxentries/opts.items_per_page);
		}
		
		/**
		 * Calculate start and end point of pagination links depending on 
		 * current_page and num_display_entries.
		 * @return {Array}
		 */
		function getInterval()  {
			var ne_half = Math.ceil(opts.num_display_entries/2);
			var np = numPages();
			var upper_limit = np-opts.num_display_entries;
			var start = current_page>ne_half?Math.max(Math.min(current_page-ne_half, upper_limit), 0):0;
			var end = current_page>ne_half?Math.min(current_page+ne_half, np):Math.min(opts.num_display_entries, np);
			return [start,end];
		}
		
		/**
		 * This is the event handling function for the pagination links. 
		 * @param {int} page_id The new page number
		 */
		function pageSelected(page_id, evt){
			current_page = page_id;
			drawLinks();
			var continuePropagation = opts.callback(page_id, panel);
			if (!continuePropagation) {
				if (evt.stopPropagation) {
					evt.stopPropagation();
				}
				else {
					evt.cancelBubble = true;
				}
			}
			return continuePropagation;
		}
		
		/**
		 * This function inserts the pagination links into the container element
		 */
		function drawLinks() {
			panel.empty();
			var interval = getInterval();
			var np = numPages();
			// This helper function returns a handler function that calls pageSelected with the right page_id
			var getClickHandler = function(page_id) {
				return function(evt){ return pageSelected(page_id,evt); }
			}
			// Helper function for generating a single link (or a span tag if it's the current page)
			var appendItem = function(page_id, appendopts){
				page_id = page_id<0?0:(page_id<np?page_id:np-1); // Normalize page id to sane value
				appendopts = jQuery.extend({text:page_id+1, classes:""}, appendopts||{});
				if(page_id == current_page){
					var lnk = jQuery("<span class='current'>"+(appendopts.text)+"</span>");
				}
				else
				{
					var lnk = jQuery("<a>"+(appendopts.text)+"</a>")
						.bind("click", getClickHandler(page_id))
						.attr('href', opts.link_to.replace(/__id__/,page_id));
						
						
				}
				if(appendopts.classes){lnk.addClass(appendopts.classes);}
				panel.append(lnk);
			}
			// Generate "Previous"-Link
			if(opts.prev_text && (current_page > 0 || opts.prev_show_always)){
				appendItem(current_page-1,{text:opts.prev_text, classes:"prev"});
			}
			// Generate starting points
			if (interval[0] > 0 && opts.num_edge_entries > 0)
			{
				var end = Math.min(opts.num_edge_entries, interval[0]);
				for(var i=0; i<end; i++) {
					appendItem(i);
				}
				if(opts.num_edge_entries < interval[0] && opts.ellipse_text)
				{
					jQuery("<span>"+opts.ellipse_text+"</span>").appendTo(panel);
				}
			}
			// Generate interval links
			for(var i=interval[0]; i<interval[1]; i++) {
				appendItem(i);
			}
			// Generate ending points
			if (interval[1] < np && opts.num_edge_entries > 0)
			{
				if(np-opts.num_edge_entries > interval[1]&& opts.ellipse_text)
				{
					jQuery("<span>"+opts.ellipse_text+"</span>").appendTo(panel);
				}
				var begin = Math.max(np-opts.num_edge_entries, interval[1]);
				for(var i=begin; i<np; i++) {
					appendItem(i);
				}
				
			}
			// Generate "Next"-Link
			if(opts.next_text && (current_page < np-1 || opts.next_show_always)){
				appendItem(current_page+1,{text:opts.next_text, classes:"next"});
			}
		}
		
		// Extract current_page from options
		var current_page = opts.current_page;
		// Create a sane value for maxentries and items_per_page
		maxentries = (!maxentries || maxentries < 0)?1:maxentries;
		opts.items_per_page = (!opts.items_per_page || opts.items_per_page < 0)?1:opts.items_per_page;
		// Store DOM element for easy access from all inner functions
		var panel = jQuery(this);
		// Attach control functions to the DOM element 
		this.selectPage = function(page_id){ pageSelected(page_id);}
		this.prevPage = function(){ 
			if (current_page > 0) {
				pageSelected(current_page - 1);
				return true;
			}
			else {
				return false;
			}
		}
		this.nextPage = function(){ 
			if(current_page < numPages()-1) {
				pageSelected(current_page+1);
				return true;
			}
			else {
				return false;
			}
		}
		// When all initialisation is done, draw the links
		drawLinks();
        // call callback function
        opts.callback(current_page, this);
	});
}





(function($) {
  $.expander = {
    version: '1.4',
    defaults: {
      // the number of characters at which the contents will be sliced into two parts.
      slicePoint: 100,

      // whether to keep the last word of the summary whole (true) or let it slice in the middle of a word (false)
      preserveWords: true,

      // a threshold of sorts for whether to initially hide/collapse part of the element's contents.
      // If after slicing the contents in two there are fewer words in the second part than
      // the value set by widow, we won't bother hiding/collapsing anything.
      widow: 4,

      // text displayed in a link instead of the hidden part of the element.
      // clicking this will expand/show the hidden/collapsed text
      expandText: 'read more',
      expandPrefix: '&hellip; ',

      expandAfterSummary: false,

      // class names for summary element and detail element
      summaryClass: 'summary',
      detailClass: 'details',

      // class names for <span> around "read-more" link and "read-less" link
      moreClass: 'read-more',
      lessClass: 'read-less',

      // number of milliseconds after text has been expanded at which to collapse the text again.
      // when 0, no auto-collapsing
      collapseTimer: 0,

      // effects for expanding and collapsing
      expandEffect: 'fadeIn',
      expandSpeed: 250,
      collapseEffect: 'fadeOut',
      collapseSpeed: 200,

      // allow the user to re-collapse the expanded text.
      userCollapse: true,

      // text to use for the link to re-collapse the text
      userCollapseText: 'read less',
      userCollapsePrefix: ' ',


      // all callback functions have the this keyword mapped to the element in the jQuery set when .expander() is called

      onSlice: null, // function() {}
      beforeExpand: null, // function() {},
      afterExpand: null, // function() {},
      onCollapse: null // function(byUser) {}
    }
  };

  $.fn.expander = function(options) {
    var meth = 'init';

    if (typeof options == 'string') {
      meth = options;
      options = {};
    }

    var opts = $.extend({}, $.expander.defaults, options),
        rSelfClose = /^<(?:area|br|col|embed|hr|img|input|link|meta|param).*>$/i,
        rAmpWordEnd = /(&(?:[^;]+;)?|\w+)$/,
        rOpenCloseTag = /<\/?(\w+)[^>]*>/g,
        rOpenTag = /<(\w+)[^>]*>/g,
        rCloseTag = /<\/(\w+)>/g,
        rLastCloseTag = /(<\/[^>]+>)\s*$/,
        rTagPlus = /^<[^>]+>.?/,
        delayedCollapse;

    var methods = {
      init: function() {
        this.each(function() {
          var i, l, tmp, summTagLess, summOpens, summCloses, lastCloseTag, detailText,
              $thisDetails, $readMore,
              openTagsForDetails = [],
              closeTagsForsummaryText = [],
              defined = {},
              thisEl = this,
              $this = $(this),
              $summEl = $([]),
              o = $.meta ? $.extend({}, opts, $this.data()) : opts,
              hasDetails = !!$this.find('.' + o.detailClass).length,
              hasBlocks = !!$this.find('*').filter(function() {
                var display = $(this).css('display');
                return (/^block|table|list/).test(display);
              }).length,
              el = hasBlocks ? 'div' : 'span',
              detailSelector = el + '.' + o.detailClass,
              moreSelector = 'span.' + o.moreClass,
              expandSpeed = o.expandSpeed || 0,
              allHtml = $.trim( $this.html() ),
              allText = $.trim( $this.text() ),
              summaryText = allHtml.slice(0, o.slicePoint);

          // bail out if we've already set up the expander on this element
          if ( $.data(this, 'expander') ) {
            return;
          }
          $.data(this, 'expander', true);

          // determine which callback functions are defined
          $.each(['onSlice','beforeExpand', 'afterExpand', 'onCollapse'], function(index, val) {
            defined[val] = $.isFunction(o[val]);
          });

          // back up if we're in the middle of a tag or word
          summaryText = backup(summaryText);

          // summary text sans tags length
          summTagless = summaryText.replace(rOpenCloseTag, '').length;

          // add more characters to the summary, one for each character in the tags
          while (summTagless < o.slicePoint) {
            newChar = allHtml.charAt(summaryText.length);
            if (newChar == '<') {
              newChar = allHtml.slice(summaryText.length).match(rTagPlus)[0];
            }
            summaryText += newChar;
            summTagless++;
          }

          summaryText = backup(summaryText, o.preserveWords);

          // separate open tags from close tags and clean up the lists
          summOpens = summaryText.match(rOpenTag) || [];
          summCloses = summaryText.match(rCloseTag) || [];

          // filter out self-closing tags
          tmp = [];
          $.each(summOpens, function(index, val) {
            if ( !rSelfClose.test(val) ) {
              tmp.push(val);
            }
          });
          summOpens = tmp;

          // strip close tags to just the tag name
          l = summCloses.length;
          for (i = 0; i < l; i++) {
            summCloses[i] = summCloses[i].replace(rCloseTag, '$1');
          }

          // tags that start in summary and end in detail need:
          // a). close tag at end of summary
          // b). open tag at beginning of detail
          $.each(summOpens, function(index, val) {
            var thisTagName = val.replace(rOpenTag, '$1');
            var closePosition = $.inArray(thisTagName, summCloses);
            if (closePosition === -1) {
              openTagsForDetails.push(val);
              closeTagsForsummaryText.push('</' + thisTagName + '>');

            } else {
              summCloses.splice(closePosition, 1);
            }
          });

          // reverse the order of the close tags for the summary so they line up right
          closeTagsForsummaryText.reverse();

          // create necessary summary and detail elements if they don't already exist
          if ( !hasDetails ) {

            // end script if there is no detail text or if detail has fewer words than widow option
            detailText = allHtml.slice(summaryText.length);

            if ( detailText === '' || detailText.split(/\s+/).length < o.widow ) {
              return;
            }

            // otherwise, continue...
            lastCloseTag = closeTagsForsummaryText.pop() || '';
            summaryText += closeTagsForsummaryText.join('');
            detailText = openTagsForDetails.join('') + detailText;

          } else {
            // assume that even if there are details, we still need readMore/readLess/summary elements
            // (we already bailed out earlier when readMore el was found)
            // but we need to create els differently

            // remove the detail from the rest of the content
            detailText = $this.find(detailSelector).remove().html();

            // The summary is what's left
            summaryText = $this.html();

            // allHtml is the summary and detail combined (this is needed when content has block-level elements)
            allHtml = summaryText + detailText;

            lastCloseTag = '';
          }
          o.moreLabel = $this.find(moreSelector).length ? '' : buildMoreLabel(o);

          if (hasBlocks) {
            detailText = allHtml;
          }
          summaryText += lastCloseTag;

          // onSlice callback
          o.summary = summaryText;
          o.details = detailText;
          o.lastCloseTag = lastCloseTag;

          if (defined.onSlice) {
            // user can choose to return a modified options object
            // one last chance for user to change the options. sneaky, huh?
            // but could be tricky so use at your own risk.
            tmp = o.onSlice.call(thisEl, o);

          // so, if the returned value from the onSlice function is an object with a details property, we'll use that!
            o = tmp && tmp.details ? tmp : o;
          }

          // build the html with summary and detail and use it to replace old contents
          var html = buildHTML(o, hasBlocks);

          $this.html( html );

          // set up details and summary for expanding/collapsing
          $thisDetails = $this.find(detailSelector);
          $readMore = $this.find(moreSelector);
          $thisDetails.hide();
          $readMore.find('a').unbind('click.expander').bind('click.expander', expand);

          $summEl = $this.find('div.' + o.summaryClass);

          if ( o.userCollapse && !$this.find('span.' + o.lessClass).length ) {
            $this
            .find(detailSelector)
            .append('<span class="' + o.lessClass + '">' + o.userCollapsePrefix + '<a href="#">' + o.userCollapseText + '</a></span>');
          }

          $this
          .find('span.' + o.lessClass + ' a')
          .unbind('click.expander')
          .bind('click.expander', function(event) {
            event.preventDefault();
            clearTimeout(delayedCollapse);
            var $detailsCollapsed = $(this).closest(detailSelector);
            reCollapse(o, $detailsCollapsed);
            if (defined.onCollapse) {
              o.onCollapse.call(thisEl, true);
            }
          });

          function expand(event) {
            event.preventDefault();
            $readMore.hide();
            $summEl.hide();
            if (defined.beforeExpand) {
              o.beforeExpand.call(thisEl);
            }

            $thisDetails.stop(false, true)[o.expandEffect](expandSpeed, function() {
              $thisDetails.css({zoom: ''});
              if (defined.afterExpand) {o.afterExpand.call(thisEl);}
              delayCollapse(o, $thisDetails, thisEl);
            });
          }

        }); // this.each
      },
      destroy: function() {
        if ( !this.data('expander') ) {
          return;
        }
        this.removeData('expander');
        this.each(function() {
          var $this = $(this),
              o = $.meta ? $.extend({}, opts, $this.data()) : opts,
              details = $this.find('.' + o.detailClass).contents();

          $this.find('.' + o.moreClass).remove();
          $this.find('.' + o.summaryClass).remove();
          $this.find('.' + o.detailClass).after(details).remove();
          $this.find('.' + o.lessClass).remove();

        });
      }
    };

    // run the methods (almost always "init")
    if ( methods[meth] ) {
      methods[ meth ].call(this);
    }

    // utility functions
    function buildHTML(o, blocks) {
      var el = 'span',
          summary = o.summary;
      if ( blocks ) {
        el = 'div';
        // if summary ends with a close tag, tuck the moreLabel inside it
        if ( rLastCloseTag.test(summary) && !o.expandAfterSummary) {
          summary = summary.replace(rLastCloseTag, o.moreLabel + '$1');
        } else {
        // otherwise (e.g. if ends with self-closing tag) just add moreLabel after summary
        // fixes #19
          summary += o.moreLabel;
        }

        // and wrap it in a div
        summary = '<div class="' + o.summaryClass + '">' + summary + '</div>';
      } else {
        summary += o.moreLabel;
      }

      return [
        summary,
        '<',
          el + ' class="' + o.detailClass + '"',
        '>',
          o.details,
        '</' + el + '>'
        ].join('');
    }

    function buildMoreLabel(o) {
      var ret = '<span class="' + o.moreClass + '">' + o.expandPrefix;
      ret += '<a href="#">' + o.expandText + '</a></span>';
      return ret;
    }

    function backup(txt, preserveWords) {
      if ( txt.lastIndexOf('<') > txt.lastIndexOf('>') ) {
        txt = txt.slice( 0, txt.lastIndexOf('<') );
      }
      if (preserveWords) {
        txt = txt.replace(rAmpWordEnd,'');
      }
      return txt;
    }

    function reCollapse(o, el) {
      el.stop(true, true)[o.collapseEffect](o.collapseSpeed, function() {
        var prevMore = el.prev('span.' + o.moreClass).show();
        if (!prevMore.length) {
          el.parent().children('div.' + o.summaryClass).show()
            .find('span.' + o.moreClass).show();
        }
      });
    }

    function delayCollapse(option, $collapseEl, thisEl) {
      if (option.collapseTimer) {
        delayedCollapse = setTimeout(function() {
          reCollapse(option, $collapseEl);
          if ( $.isFunction(option.onCollapse) ) {
            option.onCollapse.call(thisEl, false);
          }
        }, option.collapseTimer);
      }
    }

    return this;
  };

  // plugin defaults
  $.fn.expander.defaults = $.expander.defaults;
})(jQuery);


var lang;
var itemsData;
var companyIndex;
var currentTopic = 0;
var readMoreLbl;
var closeLbl;
var flag = false;

function setTopicProp(value,objId){
    if (value=="1"){
        $("#"+objId).removeClass("topicNotActiveProp").addClass("topicActiveProp");
    }
    else {
        $("#"+objId).removeClass("topicActiveProp").addClass("topicNotActiveProp");
    }
}
function showTopicInfo(topicId,companyId){
    $.ajax({
        url: "http://www.industrystock.mobi/jsonapi.php",
        data: 'JSONStr={"language":"'+lang+'","content":"lieferprogramm","companyId":'+companyId+',"topicId":'+topicId+'}',
        type: "POST",
        crossDomain: true,
        dataType: "json",
        success: function(data){
            $("#topicTitle").html(data.topicHeader);
            if (data.topicImageURL!="" && data.topicImageURL!=null){
                $("#topicImg").html('<img src="'+data.topicImageURL+'">');
            }
            else {
                $("#topicImg").html("");
            }
            setTopicProp(data.isHersteller,"manufacturer");
            setTopicProp(data.isHaendler,"trader");
            setTopicProp(data.isDienstleister,"serviceProvider");
            setTopicProp(data.isZulieferer,"supplier");
            if (data.topicContent!="" && data.topicContent!=null){
                $("#topicDesc").html('<div id="t'+topicId+'">'+data.topicContent+'</div>');
            }
            else {
                $("#topicDesc").html("");
            }
            $("#t"+topicId).expander({
                slicePoint: 150,
                expandText: "<br/>"+readMoreLbl,
                userCollapseText: closeLbl
            });
            
            if (data.specifications!=null){
                $("#specifications").css("display","block");
                var specificationsCnt = "<table width='100%'>";
                for (var spec in data.specifications){
                    specificationsCnt += "<tr><td valign='top'><img src='img/topicArrow.jpg' style='width:7px;height:11px;'></td><td valign='top'><a href='http://"+data.specifications[spec].specURL+"' target='foo'>"+data.specifications[spec].specDescr+"</a></td></tr>";
                }
                specificationsCnt += "</table>";
                $("#specificationsCnt").html(specificationsCnt);
                
            }
            else{
                $("#specifications").css("display","none");
                $("#specificationsCnt").html("");
            }
            
            $("#topic"+currentTopic).css("display","block");
            $("#topic"+topicId).css("display","none");
            if ($("#topic"+currentTopic).parent().children().length<3){
                $("#topic"+currentTopic).parent().css("display","block");
            }
            if ($("#topic"+topicId).parent().children().length<3){
                $("#topic"+topicId).parent().css("display","none");
            }
            if (flag){
                $.mobile.silentScroll($("#topicTitle").offset().top-5);
            }
            else {
                flag = true;
            }
            currentTopic = topicId;
        }
    });
}

function showCompanyDP(labelData){
    var labelObj = jQuery.parseJSON(labelData);
    var companyLblData = labelObj.langvalue;
   
    readMoreLbl = companyLblData.mehr_lesen;
    closeLbl = companyLblData.close;
    
    var obj = itemsData[companyIndex];
    $.ajax({
        url: "http://www.industrystock.mobi/jsonapi.php",
        data: 'JSONStr={"language":"'+lang+'","content":"lieferprogramm","companyId":'+obj.companyId+'}',
        type: "POST",
        crossDomain: true,
        dataType: "json",
        success: function(data){
            var topics = data.topics;
            var company = "<table align='left' width='100%' border='0'>" +
            "<tr><td class='companyName' colspan='2'>"+obj.companyName+"</td></tr>" +
            "<tr><td class='companyImg' colspan='2'><img src='"+obj.iconURL+"'></td></tr>"+
            "<tr><td class='companyAddress' colspan='2'>"+obj.country+"</td></tr>" +
            "<tr><td class='companyAddress' colspan='2'>"+obj.street+"</td></tr>"+
            "<tr><td class='companyAddress' colspan='2'>"+obj.postCode+" "+obj.city+"</td></tr>"+
            "<tr><td class='companyAddress' style='width:15%'><b>"+companyLblData.mail_tel+":</b></td><td class='companyAddress'>"+obj.telphone+"</td></tr>" +
            "<tr><td class='companyAddress' style='width:15%'><b>"+companyLblData.h_fax+":</b></td><td class='companyAddress'>"+obj.fax+"</td></tr>" +
            "<tr><td class='companyAddress' colspan='2'><b>"+companyLblData.ver_korros+":</b></td></tr>"+
            "<tr><td class='companyAddress' colspan='2'>"+obj.supportLanguages+"</td></tr>"+
            "<tr><td class='companyAddress' colspan='2'><a id='contactBtn' data-role='button' data-ajax='false' href='contactCompany.html'>"+companyLblData.foot_kontakt+"</a></td></tr>"+
            "<tr><td colspan='2' class='companyAddress' valign='middle'><div class='productionLbl' id='topicTitle'></div>"+
            "<div id='topicCnt'><table><tr><td id='topicImg' valign='top' ></td><td id='topicProp' valign='top'><div id='manufacturer' class='topicNotActiveProp'><img src='img/topicArrow.jpg' style='width:7px;height:11px;'>"+companyLblData.produkt_hersteller+"</div><div id='trader' class='topicNotActiveProp'><img src='img/topicArrow.jpg' style='width:7px;height:11px;'>"+companyLblData.produkt_haendler+"</div><div id='serviceProvider' class='topicNotActiveProp'><img src='img/topicArrow.jpg' style='width:7px;height:11px;'>"+companyLblData.produkt_dienst+"</div><div id='supplier' class='topicNotActiveProp'><img src='img/topicArrow.jpg' style='width:7px;height:11px;'>"+companyLblData.produkt_zulieferer+"</div></td></tr>"+
            "<tr><td colspan='2'>&nbsp;</td></tr><tr><td colspan='2' id='topicDesc'></td></tr>"+
            "<tr><td colspan='2'><div id='specifications'>"+
            "<table width='100%'><tr><td><b>"+companyLblData.spezifikationen+"</b></td></tr><tr><td id='specificationsCnt'></td></tr></table></div></td></tr></table></div></td></tr>"
            "<tr><td colspan='2' class='companyAddress' valign='middle'><div class='productionLbl'>"+companyLblData.h_pul+"</div></td></tr>"+
            "<tr><td colspan='2'>&nbsp;</td></tr>";
            for(var letter in topics){
                company +="<tr><td colspan='2'><div id='topicLetter_"+letter+"'><div class='topicLetter'>"+letter+"</div>";
                var topicsArr = topics[letter];
                for(var i=0;i<topicsArr.length;i++){
                    if (currentTopic==0){
                        currentTopic = topicsArr[i].topicId;
                    }
                    if (topicsArr[i].description.toLowerCase()==window.localStorage.getItem("searchString").toLowerCase()){
                        currentTopic = topicsArr[i].topicId;
                    }
                    company +="<div id='topic"+topicsArr[i].topicId+"' class='topic' onClick='showTopicInfo("+topicsArr[i].topicId+","+obj.companyId+");'><img src='img/topicArrow.jpg' style='width:7px;height:11px;'>"+topicsArr[i].description+"</div>";
                }   
                company +="</div></td></tr>";
            } 
           if(data.companyInfo!=null && (data.companyInfo.handelsname!="" && data.companyInfo.rechtsform!="" && data.companyInfo.foundationYear!="")){
           company +="<tr><td colspan='2'><div id='companyInfo'><div class='productionLbl'>"+companyLblData.unternehmensinformationen+"</div>"+
              "<table class='companyInfo'><tr><td colspan='2'>"+
              "<tr><td><b>"+companyLblData.h_pul_handelsnamen+":</b></td><td>"+data.companyInfo.handelsname+"</td></tr>"+
              "<tr><td><b>"+companyLblData.h_pul_rechtsform+":</b></td><td>"+data.companyInfo.rechtsform+"</td></tr>"+
              "<tr><td><b>"+companyLblData.h_pul_jahr+":</b></td><td>"+data.companyInfo.foundationYear+"</td></tr>"+
              "</table></div></td></tr>";
           }
           if(data.aboutDescr!=null && data.aboutDescr!=""){
               company +="<tr><td colspan='2'><div class='productionLbl'>"+companyLblData.weaboutus+"</div></td></tr>"+
               "<tr><td colspan='2'><div id='aboutDescr' class='companyInfo'>"+data.aboutDescr+"</div></td></tr>";
           }
           company +="</table>";
           $("#content").append(company);
           if(data.aboutDescr!=null && data.aboutDescr!=""){
               $("#aboutDescr").expander({
                   slicePoint: 150,
                   expandText: "<br/>"+readMoreLbl,
                   userCollapseText: closeLbl
               });
           }
           $("#contactBtn").button();
           showTopicInfo(currentTopic,obj.companyId);
           hidePreloader();
        }
    });
    
}

$('#companyDP').live('pageinit',function(event){
   showPreloader();
   lang = getLang();
   
   var searchResultData = window.localStorage.getItem("searchResult");
   var localData = jQuery.parseJSON(searchResultData);
   itemsData = localData.items;
   companyIndex = window.localStorage.getItem("companyIndex");
 

   
   var deliveryCPLblData = window.localStorage.getItem("deliveryCPLblData");
   if (deliveryCPLblData==null){
   $.ajax({
       url: "http://www.industrystock.mobi/jsonapi.php",
       data: 'JSONStr={"language":"'+lang+'","content":"langvalue","data":["mail_tel","h_fax","ver_korros","email_erfolgreich_an","foot_impressum","foot_kontakt","h_pul","produkt_hersteller","produkt_haendler","produkt_dienst","produkt_zulieferer","mehr_lesen","close","spezifikationen","unternehmensinformationen","h_pul_handelsnamen","h_pul_rechtsform","h_pul_jahr","weaboutus"]}',
       type: "POST",
       crossDomain: true,
       dataType: "text",
       success: function(data){
           window.localStorage.setItem("deliveryCPLblData", data);
           showCompanyDP(data);
       }
   });
   }
   else {
       showCompanyDP(deliveryCPLblData);
   }
});

var itemsData;
var companyIndex;
var lang;
var sendSuccessMsg;
var inputDataErr;

function showCompany(labelData){
    var labelObj = jQuery.parseJSON(labelData);
    var companyLblData = labelObj.langvalue;
   
    var obj = itemsData[companyIndex];
    var parseUrl = $.mobile.path.parseUrl(obj.web);
    var weblink = obj.web;
    if(parseUrl.protocol=="") {
        weblink = "http://"+weblink;
    };
    
    var company = "<form id='form' action='contactCompany.html' method='post'>"+
    "<input type='hidden' name='content' value='sendRequestMail'>" +
    "<input type='hidden' name='language' value='"+lang+"'>" +
    "<input type='hidden' name='companyId' value='"+obj.companyId+"'>" +
    "<table align='left'>" +
    "<tr><td class='companyName' colspan='2'>"+obj.companyName+"</td></tr>" +
    "<tr><td class='companyImg' colspan='2'><img src='"+obj.iconURL+"'></td></tr>"+
    "<tr><td class='companyAddress' colspan='2'>"+obj.country+"</td></tr>" +
    "<tr><td class='companyAddress' colspan='2'>"+obj.street+"</td></tr>"+
    "<tr><td class='companyAddress' colspan='2'>"+obj.postCode+" "+obj.city+"</td></tr>"+
    "<tr><td class='companyAddress' style='width:15%'>"+companyLblData.mail_tel+":</td><td class='companyAddress'>"+obj.telphone+"</td></tr>" +
    "<tr><td class='companyAddress' style='width:15%'>"+companyLblData.h_fax+":</td><td class='companyAddress'>"+obj.fax+"</td></tr>" +
    "<tr><td class='companyAddress' style='width:15%'>"+companyLblData.ver_www+":</td><td class='companyAddress'><a href='"+weblink+"' rel='external' data-role='none' target='foo'>"+obj.web+"</a></td></tr>" +
    "<tr><td class='companyAddress' colspan='2'><b>"+companyLblData.ver_korros+"</b></td></tr>"+
    "<tr><td class='companyAddress' colspan='2'>"+obj.supportLanguages+"</td></tr>";
    if (obj.email){
        company +="<tr><td class='emailLbl' colspan='2'>"+companyLblData.mail_senden_an+"</td></tr>" +
        		"<tr><td class='companyAddress' colspan='2'>"+obj.companyName+"</td></tr>"+
        		"<tr><td class='formLbl' colspan='2'>"+companyLblData.mail_nachricht+"</td></tr>"+
        		"<tr><td colspan='2'><textarea id='message' name='message'></textarea></td></tr>"+
        		"<tr><td class='formLbl' colspan='2'>"+companyLblData.mail_antwortadresse+"</td></tr>"+
                "<tr><td colspan='2'><input type='text' id='mEmail' name='mEmail' /></td></tr>"+
                "<tr><td class='formLbl' colspan='2'>"+companyLblData.mail_firma+"</td></tr>"+
                "<tr><td colspan='2'><input type='text' id='mCompany' name='mCompany' /></td></tr>"+
                "<tr><td class='formLbl' colspan='2'>"+companyLblData.mail_name+"</td></tr>"+
                "<tr><td colspan='2'><input type='text' id='mName' name='mName' /></td></tr>"+
                "<tr><td class='formLbl' colspan='2'>"+companyLblData.mail_tel+"</td></tr>"+
                "<tr><td colspan='2'><input type='text' id='mTelephone' name='mTelephone' /></td></tr>"+
                "<tr><td colspan='2'>"+
//                        "<fieldset class='ui-grid-c'><div class='ui-block-a'><button id='cancel' type='button' data-theme='c'>"+companyLblData.abbrechen+"</button></div>"+
                        "<button id='send' type='submit' data-theme='c'>"+companyLblData.mail_senden+"</button>"+      
                    "</td></tr>";
    }
    company +="</table></form>";
    $("#companyInfo").append(company);
    $("#imprint").text(companyLblData.foot_impressum);
    $("button").button();
    
    sendSuccessMsg = companyLblData.email_erfolgreich_an;
    inputDataErr = companyLblData.produkt_fehler_fehlende_eingabe;
   
    
    $("#form").validate({
      submitHandler: function(form) {
          showPreloader();
          var formData = $("#form").serializeArray();
          var dataArr = new Array();
          for(var i=0;i<formData.length;i++){
              dataArr[i] = '"'+formData[i].name+'": "'+formData[i].value+'"';
          }
          var dataSrt = dataArr.join(", ");
          $.ajax({
              url: "http://www.industrystock.mobi/jsonapi.php",
              data: 'JSONStr={'+dataSrt+'}',
              type: "POST",
              crossDomain: true,
              dataType: "json",
              success: function(data){
                  if(data.status=="OK"){
                      hidePreloader();
                      showSearchMsg(sendSuccessMsg+" "+data.item.companyName,"Mail-Info");
                  };
              }
          });
      },
     
    invalidHandler: function(form, validator) {
        showSearchMsg(inputDataErr,"Mail-Info");
      },
      rules: {
        mEmail: {
          required: true,
          email: true
        },
        message : {
            required: true,
            minlength: 11
        },
        mCompany: {
            required: true,
            minlength: 3
        },
        mName: {
            required: true,
            minlength: 3
        },
        mTelephone: {
            required: true,
            minlength: 6
        }
        
      },
      messages: {
          mEmail: "",
          message: "",
          mCompany: "",
          mName: "",
          mTelephone: ""
      },
      errorClass: "invalid"
    });
    hidePreloader();
}

$('#contactCompany').live('pageinit',function(event){
    showPreloader();
    lang = getLang();
    
    var searchResultData = window.localStorage.getItem("searchResult");
    var localData = jQuery.parseJSON(searchResultData);
    itemsData = localData.items;
    companyIndex = window.localStorage.getItem("companyIndex");
    var obj = itemsData[companyIndex];
    
   
    var contactCompanyData = window.localStorage.getItem("contactCompanyData");
    if (contactCompanyData==null){
    $.ajax({
        url: "http://www.industrystock.mobi/jsonapi.php",
        data: 'JSONStr={"language":"'+lang+'","content":"langvalue","data":["mail_tel","h_fax","ver_www","ver_korros","mail_senden_an","mail_nachricht","mail_antwortadresse","mail_firma","mail_name","abbrechen","mail_senden","email_erfolgreich_an","produkt_fehler_fehlende_eingabe","ver_www","foot_impressum"]}',
        type: "POST",
        crossDomain: true,
        dataType: "text",
        success: function(data){
            window.localStorage.setItem("contactCompanyData", data);
            showCompany(data);
        }
    });
    }
    else {
        showCompany(contactCompanyData);
    }
});

var dataForDb = "";
var compIdForDb = "";
var compNameForDb = "";
var db;
var favouritesAddedSuccess = "";
var favouritesalertTitle = "";
var delId;

function populateDB(tx) {
     tx.executeSql('CREATE TABLE IF NOT EXISTS FAVOURITES (id unique, companyName, data)');
}
function addToDb(tx) {
    tx.executeSql('INSERT INTO FAVOURITES (id, companyName,data) VALUES ('+compIdForDb+', "'+escape(compNameForDb)+'", "'+escape(dataForDb)+'")');
}
function deleteFromDb(tx) {
    tx.executeSql('DELETE FROM FAVOURITES WHERE id='+delId);
}
function queryDB(tx) {
    tx.executeSql('SELECT * FROM FAVOURITES', [], querySuccess, errorCB);
}

function querySuccess(tx, results) {
    $("#favoritesList").html("");
    $("#favoritesPreloader").css("display","block");
    var favouritesData = new Object();
    for (var i=0;i<results.rows.length;i++){
        var id = results.rows.item(i).id;
        $("#favoritesList").append('<li><a data-ajax="false" id="'+id+'">'+unescape(results.rows.item(i).companyName)+'</a><a id="del'+id+'" href="#" data-role="button"></a></li>');
        $("#favoritesList").listview("refresh");
        favouritesData[id] = unescape(results.rows.item(i).data);
        $("#"+results.rows.item(i).id).click(function(){
            var cId = $(this).attr("id");
            window.localStorage.setItem("searchResult", favouritesData[cId]);
            window.localStorage.setItem("searchString", "");
            fireOnclick("searchCompany");
        });
        $("#del"+results.rows.item(i).id).click(function(){
            delId = $(this).attr("id").substring(3);
            db.transaction(deleteFromDb, errorCB);
            db.transaction(queryDB, errorCB);
        });
    }
    if (results.rows.length<5){
        var count = 5-results.rows.length;
        for (var i=0;i<count;i++){
            $("#favoritesList").append('<li data-theme="a">&nbsp;</li>');
            $("#favoritesList").listview("refresh");
        }
    }
    $("#favoritesPreloader").css("display","none");
}

function errorCB(err) {
	if (err.code==1){
		showSearchMsg(favouritesAddedSuccess,favouritesalertTitle);
	}
	else {
		alert("Error processing SQL: "+err.message);
	}
}
function successAddCB(){
    showSearchMsg(favouritesAddedSuccess,favouritesalertTitle);
}
function successCB() {
    
}

function showPreloader()
{
	$("#content").css("display","none");
	$("#footer").css("display","none");
	$("#preloader").css("display","block");
}
function hidePreloader()
{
	$("#preloader").css("display","none");
	$("#footer").css("display","block");
	$("#content").css("display","block");
}

function getLang(){
    var lang = window.localStorage.getItem("lang");
    if (lang==null) {
        lang = "de";
    }
    return lang;
}
function showSearchMsg(alertMsg,alertTitle){
    var msg = alertMsg.replace(/<BR>/g,"");
    navigator.notification.alert(msg,null,alertTitle);
}
function fireOnclick(objID) {
var target=document.getElementById(objID);
if(document.dispatchEvent) { // W3C
    var oEvent = document.createEvent( "MouseEvents" );
    oEvent.initMouseEvent("click", true, true,window, 1, 1, 1, 1, 1, false, false, false, false, 0, target);
    target.dispatchEvent( oEvent );
    }
else if(document.fireEvent) { // IE
    target.fireEvent("onclick");
    }    
}


var searchType = "product";
var alertMsg = "";
var alertTitle = "";
var lang = getLang();

function showSearchPage(data){
	var obj = jQuery.parseJSON(data);
	var txtData = obj.langvalue;
    $("#product").parent().find('span').find('span').text(txtData.h_pul_produkte);
    $("#company").parent().find('span').find('span').text(txtData.ge_show_firma);
    $("#goSearch").parent().find('span').find('span').text(txtData.cn_index_jetzt_suchen);
    $("#imprint").text(txtData.foot_impressum);
    $("#favorites").html(txtData.merklisteTitle);
    alertMsg = txtData.produkt_kein_erg;
    alertTitle = txtData.hinweis;
    hidePreloader();
}

function setsearchPageBtn(){
	 $("#company").click(function(){
	        $("#product").parent().removeClass("ui-btn-up-c").addClass("ui-btn-up-a");
	        $("#company").parent().removeClass("ui-btn-up-a").addClass("ui-btn-up-c");
	        searchType = "company";
	    });
	    $("#product").click(function(){
	        $("#company").parent().removeClass("ui-btn-up-c").addClass("ui-btn-up-a");
	        $("#product").parent().removeClass("ui-btn-up-a").addClass("ui-btn-up-c");  
	        searchType = "product";
	    });
	    
	    $("#goSearch").click(function(){
	         var searchStr = $("#searchStr").val();
	         if (searchStr.replace(/^\s+|\s+$/, '').length==0){
	             showSearchMsg(alertMsg,alertTitle);
	         }
	         else {
	             if(searchType=="company"){
	                 searchCompany(searchStr);
	             }
	             else if(searchType=="product"){
	                 searchProducts(searchStr);
	             }
	         }
	    });
}

function searchCompany(searchString){
    $.ajax({
        url: "http://www.industrystock.mobi/jsonapi.php",
        data: 'JSONStr={"language":"'+lang+'","content":"searchOverView","searchType":"company","searchString":"'+searchString+'"}',
        type: "POST",
        crossDomain: true,
        dataType: "text",
        success: function(data){ 
            var obj = jQuery.parseJSON(data);
            if (obj.totalCount>0){
                window.localStorage.setItem("searchResult", data);
                window.localStorage.setItem("searchString", searchString);
                window.localStorage.setItem("searchType", "company");
                window.localStorage.setItem("activePage", "0");
                fireOnclick("searchCompany");
            }else{
                showSearchMsg(alertMsg,alertTitle);
            }
        }
    }); 
}

function searchProducts(searchString){
    $.ajax({
        url: "http://www.industrystock.mobi/jsonapi.php",
        data: 'JSONStr={"language":"'+lang+'","content":"searchOverView","searchType":"product","searchString":"'+searchString+'"}',
        type: "POST",
        crossDomain: true,
        dataType: "text",
        success: function(data){ 
            var obj = jQuery.parseJSON(data);
            if (obj.totalCount>0){
                window.localStorage.setItem("searchProductResult", data);
                window.localStorage.setItem("searchString", searchString);
                window.localStorage.setItem("searchType", "product");
                window.localStorage.setItem("activePage", "0");
                fireOnclick("searchProducts");
            }else{
                showSearchMsg(alertMsg,alertTitle);
            }
        }
    }); 
}

function clearLocalStorage(){
    window.localStorage.removeItem("searchResult");
    window.localStorage.removeItem("searchString");
    window.localStorage.removeItem("searchType");
    window.localStorage.removeItem("activePage");
}

document.addEventListener("deviceready", onDeviceReady, false);
function onDeviceReady() {
    db = window.openDatabase("industrystock", "1.0", "industrystock", 200000);
    db.transaction(populateDB, errorCB, successCB);
    db.transaction(queryDB, errorCB);
}

$('#searchPage').live('pageinit',function(event){
	showPreloader();
	clearLocalStorage();
	setsearchPageBtn();
    var searchPageData = window.localStorage.getItem("searchPage");
    if (searchPageData==null){
    $.ajax({
        url: "http://www.industrystock.mobi/jsonapi.php",
        data: 'JSONStr={"language":"'+lang+'","content":"langvalue","data":["h_pul_produkte","ge_show_firma","cn_index_jetzt_suchen","foot_impressum","merklisteTitle","hinweis","produkt_kein_erg"]}',
        type: "POST",
        crossDomain: true,
        dataType: "text",
        success: function(data){
        	window.localStorage.setItem("searchPage", data);
        	showSearchPage(data);
        }
    });  
    }
    else {
    	showSearchPage(searchPageData);
    }
});



document.addEventListener("deviceready", onDeviceReady, false);

function onDeviceReady() {
    checkConnection();
}
function alertDismissed() {
    device.exitApp();
}
function checkConnection() {
    var networkState = navigator.network.connection.type;
   
    if (networkState==null){
        navigator.notification.alert(
                'The Internet connection appears to be offline.', 
                alertDismissed,        
                'Error occured',            
                'Exit App'                  
            );
    }
    else {
        window.location = "home.html";
    }
}

function SortByName(a, b){   
   var aName = a.name.replace("\u010d","c").replace("\u65e5","\uf5e5").replace("\u0440","s");
   var bName = b.name.replace("\u010d","c").replace("\u65e5","\uf5e5").replace("\u0440","s");
   return ((aName < bName) ? -1 : ((aName > bName) ? 1 : 0));
}

function showLangList(data){ 
    var obj = jQuery.parseJSON(data);
    obj.languages.sort(SortByName);
    for (var i in obj.languages){
        var languagesListObj = document.getElementById('languagesList');
        var liObj = document.createElement('li');
        var aObj = document.createElement('a');
        aObj.setAttribute('id', obj.languages[i].LKZ);
        aObj.setAttribute('data-ajax', false);
        
        var imgObj = document.createElement('img');
        imgObj.setAttribute('src',obj.languages[i].iconURL);
        aObj.appendChild(imgObj);
       
        var txtObj = document.createTextNode(obj.languages[i].name);
        aObj.appendChild(txtObj);
        liObj.appendChild(aObj);
        $("#languagesList").append(liObj);
        
        $("#"+obj.languages[i].LKZ).click(function(){
            var lang = getLang();
            if (lang!=$(this).attr("id")){
                window.localStorage.clear();
                window.localStorage.setItem("langList", data);
                window.localStorage.setItem("lang", $(this).attr("id"));
            }
            window.location = "search.html";
        });
    }
    $("#languagesList").listview("refresh");
    hidePreloader();
}

function loadLangListData()
{
   var langList = window.localStorage.getItem("langList");
   if (langList==null){
        $.ajax({
            url: "http://www.industrystock.mobi/jsonapi.php",
            type: "post",
            crossDomain: true,
            dataType: "text",
            success: function(data){ 
                window.localStorage.setItem("langList", data);
                showLangList(data);
            }
          });
    }
   else {
       showLangList(langList);
   }
}

$('#industrystock').live('pageinit',function(event){
   showPreloader();
   
   var imprintBottomData = window.localStorage.getItem("imprintBottom");
   if (imprintBottomData==null){
       var lang = getLang();
       $.ajax({
            url: "http://www.industrystock.mobi/jsonapi.php",
            data: 'JSONStr={"language":"'+lang+'","content":"langvalue","data":["foot_impressum"]}',
            type: "POST",
            crossDomain: true,
            dataType: "json",
            success: function(data){
                var txtData = data.langvalue;
                window.localStorage.setItem("imprintBottom", txtData.foot_impressum);
                $("#imprint").text(txtData.foot_impressum);
                loadLangListData();
            }
        });
   }
   else {
       $("#imprint").text(imprintBottomData);
       loadLangListData();
   }
});


var lang = getLang();
var alertMsg = "";
var alertTitle = "";

$('#searchProducts').live('pageinit',function(event){
    showPreloader();
 
    $.ajax({
        url: "http://www.industrystock.mobi/jsonapi.php",
        data: 'JSONStr={"language":"'+lang+'","content":"langvalue","data":["newSearch","foot_impressum","hinweis","produkt_kein_erg"]}',
        type: "POST",
        crossDomain: true,
        dataType: "json",
        success: function(data){
            var obj = data.langvalue;
            $("#imprint").text(obj.foot_impressum);
            $("#goSearch").parent().find('span').find('span').text(obj.newSearch);
            alertMsg = obj.produkt_kein_erg;
            alertTitle = obj.hinweis;
            
            var searchResultData = window.localStorage.getItem("searchProductResult");
            if (searchResultData!=null){
                var localData = jQuery.parseJSON(searchResultData);
                itemsData = localData.items;
                showProductsList(itemsData);
                $("#goSearch").click(function(){
                    window.location = "search.html";
                });
            }
        }
    });
});
function seachProductCompany(id,name){
    $.ajax({
        url: "http://www.industrystock.mobi/jsonapi.php",
        data: 'JSONStr={"language":"'+lang+'","content":"getItems","itemId":'+id+'}',
        type: "POST",
        crossDomain: true,
        dataType: "text",
        success: function(data){ 
            var obj = jQuery.parseJSON(data);
            if (obj.totalCount>0){
                window.localStorage.setItem("searchResult", data);
                window.localStorage.setItem("searchString", name);  
                window.localStorage.setItem("searchType", "product");
                window.localStorage.setItem("itemId", id);
                window.localStorage.setItem("activePage", "0");
                fireOnclick("searchCompany");
            }else{
                showSearchMsg(alertMsg,alertTitle);
            }
        }
    }); 
}
function showProductsList(itemsData){
    for (var i=0;i<itemsData.length;i++){
        
        var searchResultsObj = document.getElementById('searchResults');
        var liObj = document.createElement('li');
        var aObj = document.createElement('a');
        aObj.setAttribute('onClick', 'seachProductCompany("'+itemsData[i].itemId+'","'+itemsData[i].itemName+'");');
      
        var txtObj = document.createTextNode(itemsData[i].itemName);
        aObj.appendChild(txtObj);
        liObj.appendChild(aObj);
        $("#searchResults").append(liObj);
    }
    $("#searchResults").listview("refresh");
    hidePreloader();
}

var lang = getLang();
var addressBookLbl = "";
var favouritesLbl = "";
var contactLbl = "";
var itemsData;
var addressbookAddedSuccess ="";
var addressbookAddedNoSuccess ="";
var addressbookTitle = "";
var deliveryprogram = "";
var itemPerPage = 10;

document.addEventListener("deviceready", onDeviceReady, false);
function onDeviceReady() {
    db = window.openDatabase("industrystock", "1.0", "industrystock", 200000);
    db.transaction(populateDB, errorCB, successCB);
}

$('#searchCompany').live('pageinit',function(event){
    showPreloader();
    $.ajax({
        url: "http://www.industrystock.mobi/jsonapi.php",
        data: 'JSONStr={"language":"'+lang+'","content":"langvalue","data":["newSearch","foot_impressum","addMerkliste","addressbook","foot_kontakt","addressbookAddedSuccess","addressbookAddedNoSuccess","merklisteAddedSuccess","MerklistePopupTitle","h_lieferprogramm"]}',
        type: "POST",
        crossDomain: true,
        dataType: "JSON",
        success: function(data){ 
            var txtData = data.langvalue;
            $("#goSearch").parent().find('span').find('span').text(txtData.newSearch);
            $("#imprint").text(txtData.foot_impressum);
            $("#searchStr").text(window.localStorage.getItem("searchString"));   
            favouritesLbl = txtData.addMerkliste;
            addressBookLbl = txtData.addressbook;
            contactLbl = txtData.foot_kontakt;
            addressbookAddedSuccess = txtData.addressbookAddedSuccess;
            addressbookTitle = txtData.addressbook;
            addressbookAddedNoSuccess = txtData.addressbookAddedNoSuccess;
            favouritesAddedSuccess = txtData.merklisteAddedSuccess;
            favouritesalertTitle = txtData.addMerkliste;
            deliveryprogram = txtData.h_lieferprogramm;
           
            var searchResultData = window.localStorage.getItem("searchResult");
            if (searchResultData!=null){
                var localData = jQuery.parseJSON(searchResultData);
                $("#goSearch").click(function(){
                	window.location = "search.html";
                });
                if (window.localStorage.getItem("searchString")=="" && localData.totalCount==1){
                	window.localStorage.setItem("activePage",0);
                	$("#searchResults").html("");
                	$("#companyListPre").css("display","block");
                	showCompanies(searchResultData);
                }
                else{
	                var activePage = window.localStorage.getItem("activePage");
	                $("#pager").pagination(localData.totalCount,{current_page:activePage,items_per_page:itemPerPage});
                }
            }
            hidePreloader();
        }
    }); 
});

function loadCompanyContent(pageIndex, jq){
	window.localStorage.setItem("activePage",pageIndex);
	$("#searchResults").html("");
	$("#companyListPre").css("display","block");
	var searchType = window.localStorage.getItem("searchType");
	if (searchType=="product"){
		var itemId = window.localStorage.getItem("itemId"); 
		$.ajax({
	        url: "http://www.industrystock.mobi/jsonapi.php",
	        data: 'JSONStr={"language":"'+lang+'","content":"getItems","itemId":'+itemId+',"start":"'+pageIndex*itemPerPage+'","length":'+itemPerPage+'}',
	        type: "POST",
	        crossDomain: true,
	        dataType: "text",
	        success: function(data){       	 
	        	 showCompanies(data);
	        }
	    }); 
	}
	else {
		var searchString = window.localStorage.getItem("searchString");
		$.ajax({
	        url: "http://www.industrystock.mobi/jsonapi.php",
	        data: 'JSONStr={"language":"'+lang+'","content":"searchOverView","searchType":"company","searchString":"'+searchString+'","start":'+pageIndex*itemPerPage+',"length":'+itemPerPage+'}',
	        type: "POST",
	        crossDomain: true,
	        dataType: "text",
	        success: function(data){ 
	        	showCompanies(data);
	        }
	    }); 
	}
}
function goToContact(index){
	window.localStorage.setItem("companyIndex", index);
    fireOnclick("contactCompany");
}
function goToCompanyDP(index){
	window.localStorage.setItem("companyIndex", index);
    fireOnclick("companyDP");
}
function addToFavourites(index){
	obj = itemsData[index];
	window.localStorage.setItem("activePage", "0");
    dataForDb = '{"totalCount":1,"items":['+JSON.stringify(obj)+']}';
    compIdForDb = obj.companyId;
    compNameForDb = obj.companyName;
    db.transaction(addToDb, errorCB, successAddCB);
}
function showCompanies(data){
	window.localStorage.setItem("searchResult",data);
	var jsonData = jQuery.parseJSON(data);
	itemsData = jsonData.items;
	if (itemsData!=null){
		for (var i=0;i<itemsData.length;i++){
			var obj = itemsData[i];
		    var company = "<div class='container'><table>" +
		            "<tr><td class='companyName' colspan='2'>"+obj.companyName+"</td></tr>" +
		            "<tr><td class='companyImg'><img src='"+obj.iconURL+"'></td><td id='companyAddressDiv' class='companyAddress'>"+obj.country+"<br/>"+obj.postCode+" "+obj.city+"<br/><br/><a id='companyDP"+obj.companyId+"' onClick='goToCompanyDP("+i+");' class='link' data-role='none' style='cursor:pointer'><img src='img/arrow.png' style='width:15px;height:15px'>"+deliveryprogram+"</a></td></tr>" +
		            "<tr><td colspan='2'><fieldset class='ui-grid-c'>" +
		            		"<div class='ui-block-c'><input type='button' onClick='saveContact("+i+");' data-theme='c' id='addressBookBtn"+obj.companyId+"' value='"+addressBookLbl+"'/></div><div class='ui-block-c'><input type='button' data-theme='c' id='contactBtn"+obj.companyId+"' onClick='goToContact("+i+");' value='"+contactLbl+"'/></div></td>" +
		            "</fieldset></tr>" +
		            "<tr><td colspan='2'><input type='button' data-theme='c' id='favouritesBtn"+obj.companyId+"' onClick='addToFavourites("+i+");'  value='"+favouritesLbl+"' /></td></tr>" +
		            "</table></div>";
		    $("#searchResults").append(company);
	    }
		$("[type='button']").button();
		$("#companyListPre").css("display","none");
	}
	else {
		$("#companyListPre").css("display","none");
	}
}

function saveContact(index){
	var obj = itemsData[index];
	// create a new contact object
	var contact = navigator.contacts.create();
	contact.displayName = obj.companyName;
	// populate some fields
	var name = new ContactName();
	name.givenName = obj.companyName;
	contact.name = name;
	//phone
	var phoneNumbers = [2];
    phoneNumbers[0] = new ContactField('work', obj.telphone, false);
    phoneNumbers[1] = new ContactField('fax', obj.fax, true); 
    contact.phoneNumbers = phoneNumbers;
    //address
	var addresses = [1]
	addresses[0] = new ContactAddress();
	addresses[0].streetAddress = obj.street;
	addresses[0].postalCode = obj.postCode;
	addresses[0].country = obj.country;
	contact.addresses = addresses;
	//save to device
	contact.save(onSuccess,onError);
}

function onSuccess(contact) {
    showSearchMsg(addressbookAddedSuccess,addressbookTitle);
};

function onError(contactError) {
    if(contactError.code==0) showSearchMsg(addressbookAddedSuccess,addressbookTitle);
    else showSearchMsg(addressbookAddedNoSuccess,addressbookTitle);
};

function showImprint(data){
    var obj = jQuery.parseJSON(data);
    
    var imprintData = obj.langvalue;
    //alert(imprintData.info_impressum_amtsgericht);
    var text = imprintData.imprint_companyname+"<br/><br/>";
    
    text += imprintData.imprint_gf+": "+imprintData.imprint_gf_value+"<br/>";
    text += imprintData.imprint_street_value+"<br/>";
    text += imprintData.imprint_plz_value+" "+imprintData.imprint_city_value+"<br/><br/>";
    
    text += imprintData.imprint_telefon+": "+imprintData.imprint_telefon_value+"<br/>";
    text += imprintData.imprint_fax+": "+imprintData.imprint_fax_value+"<br/>";
    text += imprintData.imprint_email+": "+imprintData.imprint_email_value+"<br/><br/>";
    
    text += imprintData.info_impressum_amtsgericht+"<br/>";
    text += imprintData.info_impressum_steuer_nr+": "+imprintData.imprint_steuernr_value+"<br/>";
    text += imprintData.info_impressum_ust_nr+": "+imprintData.imprint_ustnr_value+"<br/>";
    
    $("#content").append(text);
    hidePreloader();
}

$('#imprint').live('pageinit',function(event){
	showPreloader();
    var lang = getLang();
    var imprintData = window.localStorage.getItem("imprint");
    if (imprintData==null){
    $.ajax({
        url: "http://www.industrystock.mobi/jsonapi.php",
        data: 'JSONStr={"language":"'+lang+'","content":"langvalue","data":["imprint_companyname","imprint_gf","imprint_gf_value","imprint_street_value","imprint_plz_value","imprint_city_value","imprint_telefon","imprint_telefon_value","imprint_fax","imprint_fax_value","imprint_email","imprint_email_value","info_impressum_amtsgericht","info_impressum_steuer_nr","imprint_steuernr_value","info_impressum_ust_nr","imprint_ustnr_value"]}',
        type: "POST",
        crossDomain: true,
        dataType: "text",
        success: function(data){
            window.localStorage.setItem("imprint", data);
            showImprint(data);
        }
    });
    }
    else {
        showImprint(imprintData);
    }
});


