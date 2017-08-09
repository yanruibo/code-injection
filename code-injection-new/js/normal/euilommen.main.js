
var articles = null;
var curArticleIdx = -1;
var currentPage = 'm1-rss_reader';
var panelHt = 1;

var lastArticleDate = -1;
var lastArticleMonth = -1;
var lastArticleYear = -1;

var menuChoice = -1;

var menuHeaderCount = 0;

var linkUrl = '';

var videoUrl = '';

var facebookUrl = '';

/**
 * Notification that the UI is about to transition to a new page.
 * Perform custom prepage-transition logic here.
 * @param {String} currentPageId 
 * @param {String} targetPageId 
 * @returns {boolean} true to continue transtion; false to halt transition
 */
phoneui.prePageTransition = function(currentPageId,targetPageId) {
  // add custom pre-transition code here
  // return false to terminate transition

	if (currentPageId == '#m1-main' && targetPageId == '#m1-menu') {
		buildMenuPage();
	}else if (currentPageId == '#m1-story' && targetPageId == '#m1-menu'){
		$('#m1-menu-panel2-scroller').attr('data-layout-content-height', panelHt);
	}else if (targetPageId == '#m1-story') {
		var screenWidth = window.innerWidth;
		$('#m1-story-imagePanel').css('left',(screenWidth - 262) / 2);
		$('#m1-story-videoButton').css('left',(screenWidth - 100) / 2);
		$('#m1-story-header').css('width',screenWidth - 57);
		$('#m1-story-description').css('width',screenWidth - 10);
    }
  
	return true;
}

/**
 * Notification that the UI has transition to a new page.
 * 
 * @param {String} newPageId 
 */
phoneui.postPageTransition = function(newPageId) {
	if (newPageId == '#m1-menu') {
		//rebind all list-items to be selectable
		phoneui.preprocessDOM('#m1-menu');  
		$('#m1-menu-panel1-scroller').height(panelHt);
	}else if (newPageId == '#m1-main') {
		phoneui.hideActivityDialog();
	}
	
	currentPage = newPageId;
	
	
}

/**
 * Notification that device orientation has changed. 
 * 
 * @param {String} newOrientation 
 */
phoneui.postOrientationChange = function(newOrientation) {
    //var isLandscape = Math.abs(newOrientation) == 90;
	var screenWidth = window.innerWidth;
	$('#m1-story-imagePanel').css('left',(screenWidth - 262) / 2);
	$('#m1-story-videoButton').css('left',(screenWidth - 100) / 2);
	$('#m1-story-header').css('width',screenWidth - 57);
	$('#m1-story-description').css('width',screenWidth - 10);
}

/**
 * Called when document is loaded.
 */
phoneui.documentReadyHandler = function() {
   	$("head").append(
		$("<link rel='stylesheet' href='main_custom.css' type='text/css'/>"));

	//checkConnection();	 
	
	var listItemColor = '-webkit-gradient(linear, 0.0% 0.0%, 0.0% 100.0%, from(rgb(78,112,140)), to(rgb(4,52,92)))';
	
	$('#m1-menu-back1').css('background-color','rgb(4,52,92)');
	$('#m1-story-back1').css('background-color','rgb(4,52,92)');
	
	$('#m1-main-transPanel').css('border-width','0px 0px 2px 0px');
	//$('#m1-menu-transPanel').css('border-width','2px 0px 2px 0px');
}

function checkConnection(){
	var networkState = navigator.network.connection.type;
	var states = {};
	states[Connection.UNKNOWN] = 'Unknown connection';
	states[Connection.ETHERNET] = 'Ethernet connection';
	states[Connection.WIFI] = 'WiFi connection';
	states[Connection.CELL_2G] = 'Cell 2G connection';
	states[Connection.CELL_3G] = 'Cell 3G connection';
	states[Connection.CELL_4G] = 'Cell 4G connection';
	states[Connection.NONE] = 'No network connection';

	if (states[Connection.NONE]){
		alert('No Connection!');
	}
}
	
function buildMenuPage() {
	var numberSearch = $(event.srcElement).closest('li[data-action-click-id]').attr('id').match(/\d+/g);
	var selectedItem = numberSearch[1];
	
	menuChoice = parseInt(selectedItem);
	
	switch(menuChoice){
		case 1:
			$('#m1-menu-listHeader').text("EU i dagens medier");
			break;
		case 2:
			$('#m1-menu-listHeader').text("Indre marked  & økonomi");
			break;
		case 3:
			$('#m1-menu-listHeader').text("Erhverv & iværksætteri");
			break;
		case 4:
			$('#m1-menu-listHeader').text("Beskæftigelse");
			break;
		case 5:
			$('#m1-menu-listHeader').text("Klima, miljø & energi");
			break;
		case 6:
			$('#m1-menu-listHeader').text("Landbrug & fiskeri");
			break;
		case 7:
			$('#m1-menu-listHeader').text("Transport");
			break;
		case 8:
			$('#m1-menu-listHeader').text("Uddannelse & unge");
			break;
		case 9:
			$('#m1-menu-listHeader').text("EU-ministeren");
			break;
		case 10:
			$('#m1-menu-listHeader').text("Europaudvalget");
			break;
		case 11:
			$('#m1-menu-listHeader').text("EU-tilskud");
			break;
		case 12:
			$('#m1-menu-listHeader').text("EU-udbud");
			break;
		case 13:
			$('#m1-menu-listHeader').text("EU-job");
			break;
		case 14:
			$('#m1-menu-listHeader').text("EU-lov oversigt");
			break;
		case 15:
			$('#m1-menu-listHeader').text("Seneste videoer");
			break;
		default:
			$('#m1-menu-listHeader').text("ERROR");
			break;
	}
	
	loadRSS();

}

function loadRSS() {	 
    //var url = "http://query.yahooapis.com/v1/public/yql?q=select%20channel.title%2Cchannel.link%2Cchannel.item.title%2Cchannel.item.link%2C%20channel.item.pubDate%2C%20channel.item.description%20from%20xml%20where%20url%3D%22http%3A%2F%2Fwww.usacycling.org%2Frss%2Fheadlines.rss%22&format=json&callback=?";
	//http://ec.europa.eu/news/hp_rss_en.rss
	//http://torybash.heliohost.org/new.rss
	//var url = "http://query.yahooapis.com/v1/public/yql?q=select%20channel.title%2Cchannel.link%2Cchannel.item.title%2Cchannel.item.link%2C%20channel.item.pubDate%2C%20channel.item.description%20from%20xml%20where%20url%3D%22http%3A%2F%2Fec.europa.eu%2Fnews%2Fhp_rss_en.rss%22&format=json&callback=?";
	//var url = "http://query.yahooapis.com/v1/public/yql?q=select%20channel.title%2Cchannel.link%2Cchannel.item.title%2Cchannel.item.link%2C%20channel.item.pubDate%2C%20channel.item.description%20from%20xml%20where%20url%3D%22http%3A%2F%2Ftorybash.heliohost.org%2Feutest.rss%22&format=json&callback=?";
	
	//WITH SOURCE
	switch(menuChoice){
		case 1:
		
		//http://euilommen.host-ed.me/rss/menu1.xml
			//var url = "http://query.yahooapis.com/v1/public/yql?q=select%20channel.title%2Cchannel.link%2Cchannel.item.title%2Cchannel.item.link%2C%20" + 
			//"channel.item.source%2C%20channel.item.pubDate%2C%20channel.item.description%20from%20xml%20where%20url%3D%22http%3A%2F%2Feuilommen.host%2Ded.me%2Fmedier.rss%22&format=json&callback=?";
			//var url = "http://query.yahooapis.com/v1/public/yql?q=select%20channel.title%2Cchannel.link%2Cchannel.item.title%2Cchannel.item.link%2C%20channel.item.pubDate%2C%20channel.item.description%20from%20xml%20where%20url%3D%22http%3A%2F%2Feuilommen.host-ed.me%2Frss%2Fmenu1.xml%22&format=json&callback=?";			
			var url = "http://query.yahooapis.com/v1/public/yql?q=select channel.title,channel.link,channel.item.title,channel.item.link,channel.item.imageLink,channel.item.videoLink,channel.item.deepLink,channel.item.pubDate,channel.item.description,channel.item.ats,channel.item.article from xml where url=%22http%3A%2F%2F87.116.31.26%2Fmagic94scripts%2Fmgrqispi94.dll%3Fappname%3DmServer%26prgname%3DMLIST%26TTS%3D1%22&format=json&callback=?";
			break;
		case 2:
			//var url = "http://query.yahooapis.com/v1/public/yql?q=select%20channel.title%2Cchannel.link%2Cchannel.item.title%2Cchannel.item.link%2C%20channel.item.source%2C%20channel.item.pubDate%2C%20channel.item.description,channel.item.ats%20from%20xml%20where%20url%3D%22http%3A%2F%2Fec.europa.eu%2Fnews%2Fhp_rss_en.rss%22&format=json&callback=?";
			//var url = "http://query.yahooapis.com/v1/public/yql?q=select%20channel.title%2Cchannel.link%2Cchannel.item.title%2Cchannel.item.link%2C%20" + 
			//"channel.item.source%2C%20channel.item.pubDate%2C%20channel.item.description%20from%20xml%20where%20url%3D%22http%3A%2F%2Feuilommen.host%2Ded.me%2Ftest.rss%22&format=json&callback=?";
			var url = "http://query.yahooapis.com/v1/public/yql?q=select channel.title,channel.link,channel.item.title,channel.item.link,channel.item.imageLink,channel.item.videoLink,channel.item.deepLink,channel.item.pubDate,channel.item.description,channel.item.ats,channel.item.article from xml where url=%22http%3A%2F%2F87.116.31.26%2Fmagic94scripts%2Fmgrqispi94.dll%3Fappname%3DmServer%26prgname%3DMLIST%26TTS%3D2%22&format=json&callback=?";
			break;
		case 3:
			var url = "http://query.yahooapis.com/v1/public/yql?q=select channel.title,channel.link,channel.item.title,channel.item.link,channel.item.imageLink,channel.item.videoLink,channel.item.deepLink,channel.item.pubDate,channel.item.description,channel.item.ats,channel.item.article from xml where url=%22http%3A%2F%2F87.116.31.26%2Fmagic94scripts%2Fmgrqispi94.dll%3Fappname%3DmServer%26prgname%3DMLIST%26TTS%3D3%22&format=json&callback=?";
			break;
		case 4:
			var url = "http://query.yahooapis.com/v1/public/yql?q=select channel.title,channel.link,channel.item.title,channel.item.link,channel.item.imageLink,channel.item.videoLink,channel.item.deepLink,channel.item.pubDate,channel.item.description,channel.item.ats,channel.item.article from xml where url=%22http%3A%2F%2F87.116.31.26%2Fmagic94scripts%2Fmgrqispi94.dll%3Fappname%3DmServer%26prgname%3DMLIST%26TTS%3D4%22&format=json&callback=?";
			break;
		case 5:
			var url = "http://query.yahooapis.com/v1/public/yql?q=select channel.title,channel.link,channel.item.title,channel.item.link,channel.item.imageLink,channel.item.videoLink,channel.item.deepLink,channel.item.pubDate,channel.item.description,channel.item.ats,channel.item.article from xml where url=%22http%3A%2F%2F87.116.31.26%2Fmagic94scripts%2Fmgrqispi94.dll%3Fappname%3DmServer%26prgname%3DMLIST%26TTS%3D5%22&format=json&callback=?";
			break;
		case 6:
			var url = "http://query.yahooapis.com/v1/public/yql?q=select channel.title,channel.link,channel.item.title,channel.item.link,channel.item.imageLink,channel.item.videoLink,channel.item.deepLink,channel.item.pubDate,channel.item.description,channel.item.ats,channel.item.article from xml where url=%22http%3A%2F%2F87.116.31.26%2Fmagic94scripts%2Fmgrqispi94.dll%3Fappname%3DmServer%26prgname%3DMLIST%26TTS%3D6%22&format=json&callback=?";
			break;
		case 7:
			var url = "http://query.yahooapis.com/v1/public/yql?q=select channel.title,channel.link,channel.item.title,channel.item.link,channel.item.imageLink,channel.item.videoLink,channel.item.deepLink,channel.item.pubDate,channel.item.description,channel.item.ats,channel.item.article from xml where url=%22http%3A%2F%2F87.116.31.26%2Fmagic94scripts%2Fmgrqispi94.dll%3Fappname%3DmServer%26prgname%3DMLIST%26TTS%3D7%22&format=json&callback=?";
			break;
		case 8:
			var url = "http://query.yahooapis.com/v1/public/yql?q=select channel.title,channel.link,channel.item.title,channel.item.link,channel.item.imageLink,channel.item.videoLink,channel.item.deepLink,channel.item.pubDate,channel.item.description,channel.item.ats,channel.item.article from xml where url=%22http%3A%2F%2F87.116.31.26%2Fmagic94scripts%2Fmgrqispi94.dll%3Fappname%3DmServer%26prgname%3DMLIST%26TTS%3D8%22&format=json&callback=?";
			break;
		case 9:
			var url = "http://query.yahooapis.com/v1/public/yql?q=select channel.title,channel.link,channel.item.title,channel.item.link,channel.item.imageLink,channel.item.videoLink,channel.item.deepLink,channel.item.pubDate,channel.item.description,channel.item.ats,channel.item.article from xml where url=%22http%3A%2F%2F87.116.31.26%2Fmagic94scripts%2Fmgrqispi94.dll%3Fappname%3DmServer%26prgname%3DMLIST%26TTS%3D9%22&format=json&callback=?";
			break;
		case 10:
			var url = "http://query.yahooapis.com/v1/public/yql?q=select channel.title,channel.link,channel.item.title,channel.item.link,channel.item.imageLink,channel.item.videoLink,channel.item.deepLink,channel.item.pubDate,channel.item.description,channel.item.ats,channel.item.article from xml where url=%22http%3A%2F%2F87.116.31.26%2Fmagic94scripts%2Fmgrqispi94.dll%3Fappname%3DmServer%26prgname%3DMLIST%26TTS%3D10%22&format=json&callback=?";
			break;
		case 11:
			var url = "http://query.yahooapis.com/v1/public/yql?q=select channel.title,channel.link,channel.item.title,channel.item.link,channel.item.imageLink,channel.item.videoLink,channel.item.deepLink,channel.item.pubDate,channel.item.description,channel.item.ats,channel.item.article from xml where url=%22http%3A%2F%2F87.116.31.26%2Fmagic94scripts%2Fmgrqispi94.dll%3Fappname%3DmServer%26prgname%3DMLIST%26TTS%3D11%22&format=json&callback=?";
			break;
		case 12:
			//http://87.116.31.26/magic94scripts/mgrqispi94.dll?appname=mServer&prgname=MLIST&TTS=1111111111111111
			var url = "http://query.yahooapis.com/v1/public/yql?q=select channel.title,channel.link,channel.item.title,channel.item.link,channel.item.imageLink,channel.item.videoLink,channel.item.deepLink,channel.item.pubDate,channel.item.description,channel.item.ats,channel.item.article from xml where url=%22http%3A%2F%2F87.116.31.26%2Fmagic94scripts%2Fmgrqispi94.dll%3Fappname%3DmServer%26prgname%3DMLIST%26TTS%3D12%22&format=json&callback=?";
			break;
		case 13:
			//var url = "http://query.yahooapis.com/v1/public/yql?q=select%20channel.title%2Cchannel.link%2Cchannel.item.title%2Cchannel.item.link%2C%20channel.item.source%2C%20channel.item.pubDate%2C%20channel.item.description%20from%20xml%20where%20url%3D%22http%3A%2F%2F87.116.31.26%2Fmagic94scripts%2Fmgrqispi94.dll?appname=mServer&prgname=MLIST&TTS=T20120807%2D183010%2D678%22&format=json&callback=?";
			var url = "http://query.yahooapis.com/v1/public/yql?q=select channel.title,channel.link,channel.item.title,channel.item.link,channel.item.imageLink,channel.item.videoLink,channel.item.deepLink,channel.item.pubDate,channel.item.description,channel.item.ats,channel.item.article from xml where url=%22http%3A%2F%2F87.116.31.26%2Fmagic94scripts%2Fmgrqispi94.dll%3Fappname%3DmServer%26prgname%3DMLIST%26TTS%3D13%22&format=json&callback=?";
			break;
		case 14:	
			var url = "http://query.yahooapis.com/v1/public/yql?q=select channel.title,channel.link,channel.item.title,channel.item.link,channel.item.imageLink,channel.item.videoLink,channel.item.deepLink,channel.item.pubDate,channel.item.description,channel.item.ats,channel.item.article from xml where url=%22http%3A%2F%2F87.116.31.26%2Fmagic94scripts%2Fmgrqispi94.dll%3Fappname%3DmServer%26prgname%3DMLIST%26TTS%3D14%22&format=json&callback=?";
			break
		case 15:	
			var url = "http://query.yahooapis.com/v1/public/yql?q=select channel.title,channel.link,channel.item.title,channel.item.link,channel.item.imageLink,channel.item.videoLink,channel.item.deepLink,channel.item.pubDate,channel.item.description,channel.item.ats,channel.item.article from xml where url=%22http%3A%2F%2F87.116.31.26%2Fmagic94scripts%2Fmgrqispi94.dll%3Fappname%3DmServer%26prgname%3DMLIST%26TTS%3D15%22&format=json&callback=?";
			break
		default:
			
			break;
	}

	//Initializing
	var lastArticleDate = -1;
	var lastArticleMonth = -1;
	var lastArticleYear = -1;
	
	var list = $('#m1-menu-list1');
	$(list).empty(); 
	
	phoneui.showActivityDialog('Henter data...');
	$.getJSON( url, function( data ){ 	
		articles = data.query.results.rss;
		menuHeaderCount = 0;
	
		$.each(articles, function(i, article){
			var dateString = article.channel.item.pubDate;
		
			//Proper Date-string:
			//var date = new Date(dateString);
		
			//Custom Date-string (dd/mm/yyyy)
			var date = parseDate(dateString);
		
			var articleDate = date.getDate();
			var articleMonth = date.getMonth() + 1;
			var articleYear = date.getFullYear();
		
			if (articleDate != lastArticleDate || articleMonth != lastArticleMonth || articleYear != lastArticleYear){
				menuHeaderCount += 1;
				var id = "m1-menu-listHeader1" ; 
				$(list).append(
				 '<li id="' + id + '" class="m1-list-header"' +
				 '	<label id="m1-menu-listHeader1-label" class="m1-font-3 m1-shadow-2">' + articleDate + '. ' + numberToMonth(articleMonth) + '</label> ' +
				 '</li>'); 
			}
			
			lastArticleDate = articleDate;
			lastArticleMonth = articleMonth;
			lastArticleYear = articleYear;
		
		
			var id = "m1-menu-listItem1" ; 
       		$(list).append(
             '<li id="' + id + '" class="' +
						(i == 0 ? 'm1-first' : '') + 
						(i == (articles.length - 1) ? 'm1-last' : '') + 
						' m1-clickable m1-article-listItem" ' +
						'articleIdx="' + i + '">' +  
			 '	<div id="m1-menu-listItem1-inner-div">'+
			 '		<div id="m1-menu-text1" class="m1-text m1-shadow-1 m1-font-2 m1-active-color-1">' + removeNL(article.channel.item.title) + 
			 '		</div>'+
			// '<img id="m1-menu-tableRowDisclosureIndicator1" class="m1-element m1-clickable" src' +
             //       '="res/images/001_tableRowDisclosureIndicator.png"/>' +
			 //'		<div id="m1-menu-date1" class="m1-text">' +  date.getDate() + '/' + articleMonth + //article.channel.item.pubDate +
			 //'		</div>' +
			// '		<img id="m1-menu-image1" src="images/minieu.jpg"/>'+
			 '	</div>'+
             '</li>'); 
     	}); 
     	
     	//add click handler to all list-items (articles)
     	var listItems = $(list).children(".m1-article-listItem");
     	$.each(listItems, function(i,listItem) {
     		$(listItem).click(function(e) {
				var idx = parseInt($(this).attr("articleIdx"));
				viewArticle(idx);
	 		}); 
	 	});

		panelHt = 40 + articles.length * 52 + menuHeaderCount * 20;
		$('#m1-menu-panel2-scroller').height(panelHt);
		
		
		phoneui.preprocessDOM(list);  
		phoneui.hideActivityDialog();
     	   	     	
	});  
};


function viewArticle(idx) {
	
	
	$('#m1-story-image').attr('src', null);
	

	//http://87.116.31.26/magic94scripts/mgrqispi94.dll?appname=mServer&prgname=CREG&SID=hej&UI=NN&ORIG=W
	//window.open("http://87.116.31.26/magic94scripts/mgrqispi94.dll?appname=mServer&prgname=CREG&SID=hej&UI=NN&ORIG=W")

	curArticleIdx = idx;
	
	//ARTICLE-ITEM PROPERTIES	
	var title = articles[curArticleIdx].channel.item.title;
	var dateString = articles[curArticleIdx].channel.item.pubDate;
	var description = articles[curArticleIdx].channel.item.description;
	
	var link = articles[curArticleIdx].channel.item.link;
	
	var imageLink = articles[curArticleIdx].channel.item.imageLink;
	var videoLink = articles[curArticleIdx].channel.item.videoLink;
	var deepLink = articles[curArticleIdx].channel.item.deepLink;
	
	var ats = articles[curArticleIdx].channel.item.ats;
	
	var articleText = articles[curArticleIdx].channel.item.article;
	
	//ATS COUNTING
	var request = new XMLHttpRequest();
	request.open("GET", "http://87.116.31.26/magic94scripts/mgrqispi94.dll?appname=mServer&prgname=CREG&SID=" + ats + "&UI=NN&ORIG=W");
	request.send();
	
	//INSERTING STUFF
	//Proper Date-string:
	//var date = new Date(dateString);

	//Custom Date-string (dd/mm/yyyy)
	var date = parseDate(dateString);

	var articleMonth = date.getMonth() + 1;
	var formatedDate = date.getDate() + '. ' + numberToMonth(articleMonth);
	
	//$('#m1-story-header').text(title);
	//$('#m1-story-date').text(formatedDate);
	//$('#m1-story-description').text(description);
	
	
	//$('#m1-story-header').text("" + descriptionBlock.attr('data-layout-content-height'));
	var haveLink = false;
	if (link != null && link.length > 0){
		linkUrl = link;
		haveLink = true;
	}
	
	var haveFacebookLink = false;
	if (deepLink != null && deepLink.length > 0){
		//var testStuff 
		facebookUrl = "http://www.facebook.com/sharer.php?u=" + encodeURIComponent(deepLink) + "&t=" + encodeURIComponent(title);
		//facebookUrl = encodeURIComponent(testStuff);
		//facebookUrl = decodeURIComponent(testStuff);
		haveFacebookLink = true;
	}
	
	//var descriptionBlock = $('#m1-story-description');
	
	var storyPanel = $('#m1-story-panel2-scroller');
		
	$(storyPanel).empty();
	
	$(storyPanel).append('<div id="m1-story-header" class="m1-text m1-font-6">' + title + '</div>');

	$(storyPanel).append('<div id="m1-story-date" class="m1-text m1-font-8">' + formatedDate + '</div>');
	
	$(storyPanel).append('<div id="m1-story-imagePanel" class="m1-iscroll-wrapper m1-background-10">' +
         '<img id="m1-story-image" class="m1-clickable m1-image" src="images/example.jpg"/></div>');
	
	$(storyPanel).append('<div id="m1-story-videoButton" class="m1-clickable m1-button m1-font-5 m1-shadow-3 m1-btn-1 m1-btn-2" name=' +
         '"videoButton" data-action-click-id="playVideo();" onClick="playVideo();">Afspil video</div>');
		 //'"videoButton" data-action-click-id="playVideo()">Afspil video</div>');
	
	$(storyPanel).append('<div id="m1-story-description" class="m1-text m1-font-7">' + articleText + '</div>');

	if (haveLink){
		$(storyPanel).append('<div id="m1-story-readmore" class="m1-clickable m1-hyperlink-container">' +
			'<a class="m1-hyperlink m1-font-8 m1-active-color-2" href="' + linkUrl + '"  data-action-click-id="readmoreClicked();" onClick="readmoreClicked();">Læs mere..</a>' +
			'</div>');
	}
	
	if (haveFacebookLink){
		$(storyPanel).append('<div id="m1-story-facebookShare" class="m1-clickable m1-button m1-font-5 m1-shadow-3" ' +
                'name="facebookShare" data-action-click-id="shareOnFacebook()" onClick="shareOnFacebook();"></div>');
	}

	//              <div id="m1-story-readmore" class="m1-clickable m1-hyperlink-container">
     //           <a class="m1-hyperlink m1-font-8 m1-active-color-2" href="" data-action-click-id=
     //             "action3">Læs mere..</a>
      //        </div>
	
	
	phoneui.preprocessDOM(storyPanel);  

	if (imageLink != null && imageLink.length > 0){
		$('#m1-story-image').attr('src', imageLink);
		$('#m1-story-imagePanel').css('visibility', 'visible');
		if (videoLink != null && videoLink.length > 0){
			$('#m1-story-videoButton').css('visibility', 'visible');
			//$('#m1-story-imagePanel').css('top', -70);
			$('#m1-story-description').css('top', 5);
			$('#m1-story-readmore').css('top', 5);
			$('#m1-story-facebookShare').css('top', -5);
			
			videoUrl = videoLink;
		}else{
			$('#m1-story-videoButton').css('visibility', 'hidden');
			//$('#m1-story-imagePanel').css('top', -61);
			$('#m1-story-description').css('top', -20);
			$('#m1-story-readmore').css('top', -20);
			$('#m1-story-facebookShare').css('top', -15);
		}
		
		var storyPanelHt = 4000;
		$('#m1-story-panel2-scroller').attr('data-layout-content-height', storyPanelHt);
		
	}else{
		$('#m1-story-imagePanel').css('visibility', 'hidden');
		$('#m1-story-videoButton').css('visibility', 'hidden');
		$('#m1-story-description').css('top', -220);
		$('#m1-story-readmore').css('top', -220);
		$('#m1-story-facebookShare').css('top', -210);
		
		var storyPanelHt = 4000;
		$('#m1-story-panel2-scroller').attr('data-layout-content-height', storyPanelHt);
	}
	
	
	var screenWidth = window.innerWidth;
	$('#m1-story-imagePanel').css('left',(screenWidth - 262) / 2);
	$('#m1-story-videoButton').css('left',(screenWidth - 100) / 2);
	$('#m1-story-header').css('width',screenWidth - 57);
	$('#m1-story-description').css('width',screenWidth - 10);
	
	//TODO!!!
	//$("#m1-story").empty();
	//$("#m1-story").append($(description));
	//var storyPanelHt = 600;
	//$('#m1-story-panel2-scroller').attr('data-layout-content-height', storyPanelHt);
	
	
	//TODO!!!
//	twitterUrl = "http://twitter.com/home?status=http://www.eu-i-lommen.eu"


	phoneui.gotoPage("m1-story",phoneui.transitions.slideLeft);
}	

function readmoreClicked(){
	phoneui.showURL(linkUrl, '_blank');
}


function playVideo() {
	//TESTING:
	//	videoUrl = 'http://video.webmfiles.org/elephants-dream.webm';
	phoneui.showURL(videoUrl, '_blank');
}

function shareOnFacebook() {
	phoneui.showURL(facebookUrl, '_blank');
}

function shareOnTwitter() {
	phoneui.showURL(twitterUrl, '_blank');
}

	
function removeNL(s) { 
	return s.replace(/[\n\r\t]/g,""); 
}

function numberToMonth(number) {
	switch(number)
	{
		case 1:
			return 'Januar';
		case 2:
			return 'Februar';
		case 3:
			return 'Marts';
		case 4:
			return 'April';
		case 5:
			return 'Maj';
		case 6:
			return 'Juni';
		case 7:
			return 'Juli';
		case 8:
			return 'August';
		case 9:
			return 'September';
		case 10:
			return 'Oktober';
		case 11:
			return 'November';
		case 12:
			return 'December';
		default:
			return 'ERROR';
	}
}


// parse a date in yyyy-mm-dd format
function parseDate(input) {
  var parts = input.match(/(\d+)/g);
  // new Date(year, month [, date [, hours[, minutes[, seconds[, ms]]]]])
  return new Date(parts[2], parts[1]-1, parts[0]); // months are 0-based
}



var m1Design = function() { m1Design = {}; (function() {var c="data-layout-content-height";var d="e0";var f="e1";var h="e10";var fa="e100";var ga="e101";var ha="e102";var i="e103";var j="e104";var k="e105";var ia="e106";var l="e107";var ja="e108";var ka="e11";var la="e117";var ma="e118";var na="e12";var oa="e13";var m="e16";var n="e17";var pa="e18";var qa="e19";var o="e2";var ra="e20";var p="e21";var q="e22";var sa="e23";var ta="e24";var ua="e25";var r="e26";var s="e27";var va="e28";var wa="e29";var t="e3";var xa="e30";var u="e31";var v="e32";var ya="e33";
var za="e34";var Aa="e35";var w="e36";var x="e37";var Ba="e38";var Ca="e39";var y="e4";var Da="e40";var z="e41";var A="e42";var Ea="e43";var Fa="e44";var Ga="e45";var B="e46";var C="e47";var Ha="e48";var Ia="e49";var D="e5";var Ja="e50";var E="e53";var F="e54";var Ka="e55";var La="e56";var Ma="e57";var G="e58";var H="e59";var Na="e6";var Oa="e60";var Pa="e61";var Qa="e62";var I="e65";var J="e66";var Ra="e67";var Sa="e68";var Ta="e69";var Ua="e7";var K="e70";var L="e71";var Va="e72";var Wa="e73";
var Xa="e74";var M="e75";var N="e76";var Ya="e77";var Za="e78";var $a="e79";var ab="e8";var O="e80";var P="e81";var bb="e82";var cb="e83";var db="e84";var eb="e85";var fb="e86";var gb="e87";var hb="e88";var Q="e89";var R="e9";var S="e90";var T="e91";var U="e92";var V="e93";var ib="e94";var jb="m1-";var kb="m1-images-preloader";var lb="m1-main-euFlagImage";var mb="m1-main-euText";var nb="m1-main-image1";var ob="m1-main-image10";var pb="m1-main-image11";var qb="m1-main-image12";var rb="m1-main-image13";
var sb="m1-main-image14";var tb="m1-main-image15";var ub="m1-main-image16";var vb="m1-main-image17";var wb="m1-main-image18";var xb="m1-main-image19";var yb="m1-main-image2";var zb="m1-main-image20";var Ab="m1-main-image21";var Bb="m1-main-image22";var Cb="m1-main-image23";var Db="m1-main-image24";var Eb="m1-main-image25";var Fb="m1-main-image26";var Gb="m1-main-image27";var Hb="m1-main-image28";var Ib="m1-main-image29";var Jb="m1-main-image30";var Kb="m1-main-image4";var Lb="m1-main-image5";
var Mb="m1-main-image6";var Nb="m1-main-image7";var Ob="m1-main-image8";var Pb="m1-main-image9";var Qb="m1-main-listItem1-inner-div";var Rb="m1-main-listItem10-inner-div";var Sb="m1-main-listItem11-inner-div";var Tb="m1-main-listItem12-inner-div";var Ub="m1-main-listItem13-inner-div";var Vb="m1-main-listItem14-inner-div";var Wb="m1-main-listItem15-inner-div";var Xb="m1-main-listItem2-inner-div";var Yb="m1-main-listItem3-inner-div";var Zb="m1-main-listItem4-inner-div";var $b="m1-main-listItem5-inner-div";
var ac="m1-main-listItem6-inner-div";var bc="m1-main-listItem7-inner-div";var cc="m1-main-listItem8-inner-div";var dc="m1-main-listItem9-inner-div";var ec="m1-main-panel1";var fc="m1-main-panel1-scroller";var gc="m1-main-text1";var hc="m1-main-text10";var ic="m1-main-text11";var jc="m1-main-text12";var kc="m1-main-text13";var lc="m1-main-text14";var mc="m1-main-text15";var nc="m1-main-text2";var oc="m1-main-text3";var pc="m1-main-text4";var qc="m1-main-text5";var rc="m1-main-text6";var sc="m1-main-text7";
var tc="m1-main-text8";var uc="m1-main-text9";var vc="m1-main-transPanel";var wc="m1-main-velkommenText";var xc="m1-menu-backButton";var yc="m1-menu-listHeader";var zc="m1-menu-navigation1";var Ac="m1-menu-panel1";var Bc="m1-menu-panel2";var Cc="m1-menu-panel2-scroller";var Dc="m1-menu-text2";var Ec="m1-menu-transPanel";var Fc="m1-story-backButton";var Gc="m1-story-navigation1";var Hc="m1-story-panel1";var Ic="m1-story-panel2";var Jc="m1-story-panel2-scroller";var Kc="m1-story-text1";var W="main";
var X="px";var Lc=function(e){return jb+e};
var Nc={"main":{"id":W,"anchor_id":"#m1-main","resize":function(e,g){var a;var b={};var Y;a=b[f]={w:e,h:g,py:0};try{a=b[d]={e:document.getElementById(ec),w:0,h:0,py:0,p:b[f]};a.w=Math.max(a.p.w,0);a.e.style.height=Math.max(a.p.h,0)+X;a.e.style.top=0-a.p.py+X;a.h=Math.max(a.p.h,0);a.p.py+=Math.max(0,a.p.h)}catch(Z){}try{a=b[o]={e:document.getElementById(fc),w:0,h:0,py:0,p:b[d]};a.conth=a.e.getAttribute(c);a.w=Math.max(a.p.w,0);a.e.style.height=(a.conth||Math.max(880,a.p.h))+X;a.e.style.top=0-a.p.py+
X;a.h=a.conth||Math.max(880,a.p.h);a.p.py+=Math.max(a.conth||Math.max(880,a.p.h),0)}catch($){}try{a=b[t]={w:0,h:0,py:0,p:b[o]};a.w=Math.max(a.p.w,0);a.h=768;a.p.py+=768}catch(aa){}try{a=b[y]={w:0,h:0,py:0,p:b[t]};a.w=Math.max(a.p.w-18,0);a.h=44;a.p.py+=44}catch(ba){}try{a=b[D]={e:document.getElementById(Qb),w:0,h:0,py:0,p:b[y]};a.w=Math.max(a.p.w- -20,0);a.e.style.height=Math.max(a.p.h,0)+X;a.e.style.top=0-a.p.py+X;a.h=Math.max(a.p.h,0);a.p.py+=Math.max(0,a.p.h)}catch(ca){}try{a=b[Na]={e:document.getElementById(gc),
w:0,h:0,py:0,p:b[D]};a.w=138;a.e.style.height=20+X;a.e.style.top=Math.max((a.p.h-20)*0.5,0)-a.p.py+X;a.h=20;a.p.py+=20}catch(da){}try{a=b[Ua]={e:document.getElementById(nb),w:0,h:0,py:0,p:b[D]};a.w=29;a.e.style.height=29+X;a.e.style.top=7-a.p.py+X;a.h=29;a.p.py+=29}catch(ea){}try{a=b[ab]={e:document.getElementById(tb),w:0,h:0,py:0,p:b[D]};a.w=10;a.e.style.height=13+X;a.e.style.top=15-a.p.py+X;a.h=13;a.p.py+=13}catch(Mc){}try{a=b[R]={w:0,h:0,py:0,p:b[t]};a.w=Math.max(a.p.w-18,0);a.h=44;a.p.py+=44}catch(Oc){}try{a=
b[h]={e:document.getElementById(Wb),w:0,h:0,py:0,p:b[R]};a.w=Math.max(a.p.w- -20,0);a.e.style.height=Math.max(a.p.h,0)+X;a.e.style.top=0-a.p.py+X;a.h=Math.max(a.p.h,0);a.p.py+=Math.max(0,a.p.h)}catch(Pc){}try{a=b[ka]={e:document.getElementById(mc),w:0,h:0,py:0,p:b[h]};a.w=118;a.e.style.height=20+X;a.e.style.top=Math.max((a.p.h-20)*0.5,0)-a.p.py+X;a.h=20;a.p.py+=20}catch(Qc){}try{a=b[na]={e:document.getElementById(Jb),w:0,h:0,py:0,p:b[h]};a.w=29;a.e.style.height=29+X;a.e.style.top=7-a.p.py+X;a.h=29;
a.p.py+=29}catch(Rc){}try{a=b[oa]={e:document.getElementById(Ib),w:0,h:0,py:0,p:b[h]};a.w=10;a.e.style.height=13+X;a.e.style.top=15-a.p.py+X;a.h=13;a.p.py+=13}catch(Sc){}try{a=b[m]={w:0,h:0,py:0,p:b[t]};a.w=Math.max(a.p.w-18,0);a.h=44;a.p.py+=44}catch(Tc){}try{a=b[n]={e:document.getElementById(Xb),w:0,h:0,py:0,p:b[m]};a.w=Math.max(a.p.w- -20,0);a.e.style.height=Math.max(a.p.h,0)+X;a.e.style.top=0-a.p.py+X;a.h=Math.max(a.p.h,0);a.p.py+=Math.max(0,a.p.h)}catch(Uc){}try{a=b[pa]={e:document.getElementById(nc),
w:0,h:0,py:0,p:b[n]};a.w=172;a.e.style.height=20+X;a.e.style.top=Math.max((a.p.h-20)*0.5,0)-a.p.py+X;a.h=20;a.p.py+=20}catch(Vc){}try{a=b[qa]={e:document.getElementById(yb),w:0,h:0,py:0,p:b[n]};a.w=29;a.e.style.height=29+X;a.e.style.top=7-a.p.py+X;a.h=29;a.p.py+=29}catch(Wc){}try{a=b[ra]={e:document.getElementById(ub),w:0,h:0,py:0,p:b[n]};a.w=10;a.e.style.height=13+X;a.e.style.top=15-a.p.py+X;a.h=13;a.p.py+=13}catch(Xc){}try{a=b[p]={w:0,h:0,py:0,p:b[t]};a.w=Math.max(a.p.w-18,0);a.h=44;a.p.py+=44}catch(Yc){}try{a=
b[q]={e:document.getElementById(Yb),w:0,h:0,py:0,p:b[p]};a.w=Math.max(a.p.w- -20,0);a.e.style.height=Math.max(a.p.h,0)+X;a.e.style.top=0-a.p.py+X;a.h=Math.max(a.p.h,0);a.p.py+=Math.max(0,a.p.h)}catch(Zc){}try{a=b[sa]={w:0,h:0,py:0,p:b[q]};a.w=29;a.h=29;a.p.py+=29}catch($c){}try{a=b[ta]={e:document.getElementById(oc),w:0,h:0,py:0,p:b[q]};a.w=167;a.e.style.height=20+X;a.e.style.top=Math.max((a.p.h-20)*0.5,0)-a.p.py+X;a.h=20;a.p.py+=20}catch(ad){}try{a=b[ua]={e:document.getElementById(vb),w:0,h:0,py:0,
p:b[q]};a.w=10;a.e.style.height=13+X;a.e.style.top=15-a.p.py+X;a.h=13;a.p.py+=13}catch(bd){}try{a=b[r]={w:0,h:0,py:0,p:b[t]};a.w=Math.max(a.p.w-18,0);a.h=44;a.p.py+=44}catch(cd){}try{a=b[s]={e:document.getElementById(Zb),w:0,h:0,py:0,p:b[r]};a.w=Math.max(a.p.w- -20,0);a.e.style.height=Math.max(a.p.h,0)+X;a.e.style.top=0-a.p.py+X;a.h=Math.max(a.p.h,0);a.p.py+=Math.max(0,a.p.h)}catch(dd){}try{a=b[va]={e:document.getElementById(pc),w:0,h:0,py:0,p:b[s]};a.w=102;a.e.style.height=20+X;a.e.style.top=Math.max((a.p.h-
20)*0.5,0)-a.p.py+X;a.h=20;a.p.py+=20}catch(ed){}try{a=b[wa]={e:document.getElementById(Kb),w:0,h:0,py:0,p:b[s]};a.w=29;a.e.style.height=29+X;a.e.style.top=7-a.p.py+X;a.h=29;a.p.py+=29}catch(fd){}try{a=b[xa]={e:document.getElementById(wb),w:0,h:0,py:0,p:b[s]};a.w=10;a.e.style.height=13+X;a.e.style.top=15-a.p.py+X;a.h=13;a.p.py+=13}catch(gd){}try{a=b[u]={w:0,h:0,py:0,p:b[t]};a.w=Math.max(a.p.w-18,0);a.h=44;a.p.py+=44}catch(hd){}try{a=b[v]={e:document.getElementById($b),w:0,h:0,py:0,p:b[u]};a.w=Math.max(a.p.w-
-20,0);a.e.style.height=Math.max(a.p.h,0)+X;a.e.style.top=0-a.p.py+X;a.h=Math.max(a.p.h,0);a.p.py+=Math.max(0,a.p.h)}catch(id){}try{a=b[ya]={e:document.getElementById(qc),w:0,h:0,py:0,p:b[v]};a.w=145;a.e.style.height=20+X;a.e.style.top=Math.max((a.p.h-20)*0.5,0)-a.p.py+X;a.h=20;a.p.py+=20}catch(jd){}try{a=b[za]={e:document.getElementById(Lb),w:0,h:0,py:0,p:b[v]};a.w=29;a.e.style.height=29+X;a.e.style.top=7-a.p.py+X;a.h=29;a.p.py+=29}catch(kd){}try{a=b[Aa]={e:document.getElementById(xb),w:0,h:0,py:0,
p:b[v]};a.w=10;a.e.style.height=13+X;a.e.style.top=15-a.p.py+X;a.h=13;a.p.py+=13}catch(ld){}try{a=b[w]={w:0,h:0,py:0,p:b[t]};a.w=Math.max(a.p.w-18,0);a.h=44;a.p.py+=44}catch(md){}try{a=b[x]={e:document.getElementById(ac),w:0,h:0,py:0,p:b[w]};a.w=Math.max(a.p.w- -20,0);a.e.style.height=Math.max(a.p.h,0)+X;a.e.style.top=0-a.p.py+X;a.h=Math.max(a.p.h,0);a.p.py+=Math.max(0,a.p.h)}catch(nd){}try{a=b[Ba]={e:document.getElementById(rc),w:0,h:0,py:0,p:b[x]};a.w=131;a.e.style.height=20+X;a.e.style.top=Math.max((a.p.h-
20)*0.5,0)-a.p.py+X;a.h=20;a.p.py+=20}catch(od){}try{a=b[Ca]={e:document.getElementById(Mb),w:0,h:0,py:0,p:b[x]};a.w=29;a.e.style.height=29+X;a.e.style.top=7-a.p.py+X;a.h=29;a.p.py+=29}catch(pd){}try{a=b[Da]={e:document.getElementById(zb),w:0,h:0,py:0,p:b[x]};a.w=10;a.e.style.height=13+X;a.e.style.top=15-a.p.py+X;a.h=13;a.p.py+=13}catch(qd){}try{a=b[z]={w:0,h:0,py:0,p:b[t]};a.w=Math.max(a.p.w-18,0);a.h=44;a.p.py+=44}catch(rd){}try{a=b[A]={e:document.getElementById(bc),w:0,h:0,py:0,p:b[z]};a.w=Math.max(a.p.w-
-20,0);a.e.style.height=Math.max(a.p.h,0)+X;a.e.style.top=0-a.p.py+X;a.h=Math.max(a.p.h,0);a.p.py+=Math.max(0,a.p.h)}catch(sd){}try{a=b[Ea]={e:document.getElementById(sc),w:0,h:0,py:0,p:b[A]};a.w=70;a.e.style.height=20+X;a.e.style.top=Math.max((a.p.h-20)*0.5,0)-a.p.py+X;a.h=20;a.p.py+=20}catch(td){}try{a=b[Fa]={e:document.getElementById(Nb),w:0,h:0,py:0,p:b[A]};a.w=29;a.e.style.height=29+X;a.e.style.top=7-a.p.py+X;a.h=29;a.p.py+=29}catch(ud){}try{a=b[Ga]={e:document.getElementById(Ab),w:0,h:0,py:0,
p:b[A]};a.w=10;a.e.style.height=13+X;a.e.style.top=15-a.p.py+X;a.h=13;a.p.py+=13}catch(vd){}try{a=b[B]={w:0,h:0,py:0,p:b[t]};a.w=Math.max(a.p.w-18,0);a.h=44;a.p.py+=44}catch(wd){}try{a=b[C]={e:document.getElementById(cc),w:0,h:0,py:0,p:b[B]};a.w=Math.max(a.p.w- -20,0);a.e.style.height=Math.max(a.p.h,0)+X;a.e.style.top=0-a.p.py+X;a.h=Math.max(a.p.h,0);a.p.py+=Math.max(0,a.p.h)}catch(xd){}try{a=b[Ha]={e:document.getElementById(tc),w:0,h:0,py:0,p:b[C]};a.w=140;a.e.style.height=20+X;a.e.style.top=Math.max((a.p.h-
20)*0.5,0)-a.p.py+X;a.h=20;a.p.py+=20}catch(yd){}try{a=b[Ia]={e:document.getElementById(Ob),w:0,h:0,py:0,p:b[C]};a.w=29;a.e.style.height=29+X;a.e.style.top=7-a.p.py+X;a.h=29;a.p.py+=29}catch(zd){}try{a=b[Ja]={e:document.getElementById(Bb),w:0,h:0,py:0,p:b[C]};a.w=10;a.e.style.height=13+X;a.e.style.top=15-a.p.py+X;a.h=13;a.p.py+=13}catch(Ad){}try{a=b[E]={w:0,h:0,py:0,p:b[t]};a.w=Math.max(a.p.w-18,0);a.h=44;a.p.py+=44}catch(Bd){}try{a=b[F]={e:document.getElementById(dc),w:0,h:0,py:0,p:b[E]};a.w=Math.max(a.p.w-
-20,0);a.e.style.height=Math.max(a.p.h,0)+X;a.e.style.top=0-a.p.py+X;a.h=Math.max(a.p.h,0);a.p.py+=Math.max(0,a.p.h)}catch(Cd){}try{a=b[Ka]={e:document.getElementById(uc),w:0,h:0,py:0,p:b[F]};a.w=101;a.e.style.height=20+X;a.e.style.top=Math.max((a.p.h-20)*0.5,0)-a.p.py+X;a.h=20;a.p.py+=20}catch(Dd){}try{a=b[La]={e:document.getElementById(Pb),w:0,h:0,py:0,p:b[F]};a.w=29;a.e.style.height=29+X;a.e.style.top=7-a.p.py+X;a.h=29;a.p.py+=29}catch(Ed){}try{a=b[Ma]={e:document.getElementById(Cb),w:0,h:0,py:0,
p:b[F]};a.w=10;a.e.style.height=13+X;a.e.style.top=15-a.p.py+X;a.h=13;a.p.py+=13}catch(Fd){}try{a=b[G]={w:0,h:0,py:0,p:b[t]};a.w=Math.max(a.p.w-18,0);a.h=44;a.p.py+=44}catch(Gd){}try{a=b[H]={e:document.getElementById(Rb),w:0,h:0,py:0,p:b[G]};a.w=Math.max(a.p.w- -20,0);a.e.style.height=Math.max(a.p.h,0)+X;a.e.style.top=0-a.p.py+X;a.h=Math.max(a.p.h,0);a.p.py+=Math.max(0,a.p.h)}catch(Hd){}try{a=b[Oa]={e:document.getElementById(hc),w:0,h:0,py:0,p:b[H]};a.w=113;a.e.style.height=20+X;a.e.style.top=Math.max((a.p.h-
20)*0.5,0)-a.p.py+X;a.h=20;a.p.py+=20}catch(Id){}try{a=b[Pa]={e:document.getElementById(ob),w:0,h:0,py:0,p:b[H]};a.w=29;a.e.style.height=29+X;a.e.style.top=7-a.p.py+X;a.h=29;a.p.py+=29}catch(Jd){}try{a=b[Qa]={e:document.getElementById(Db),w:0,h:0,py:0,p:b[H]};a.w=10;a.e.style.height=13+X;a.e.style.top=15-a.p.py+X;a.h=13;a.p.py+=13}catch(Kd){}try{a=b[I]={w:0,h:0,py:0,p:b[t]};a.w=Math.max(a.p.w-18,0);a.h=44;a.p.py+=44}catch(Ld){}try{a=b[J]={e:document.getElementById(Sb),w:0,h:0,py:0,p:b[I]};a.w=Math.max(a.p.w-
-20,0);a.e.style.height=Math.max(a.p.h,0)+X;a.e.style.top=0-a.p.py+X;a.h=Math.max(a.p.h,0);a.p.py+=Math.max(0,a.p.h)}catch(Md){}try{a=b[Ra]={e:document.getElementById(ic),w:0,h:0,py:0,p:b[J]};a.w=52;a.e.style.height=20+X;a.e.style.top=Math.max((a.p.h-20)*0.5,0)-a.p.py+X;a.h=20;a.p.py+=20}catch(Nd){}try{a=b[Sa]={e:document.getElementById(pb),w:0,h:0,py:0,p:b[J]};a.w=29;a.e.style.height=29+X;a.e.style.top=7-a.p.py+X;a.h=29;a.p.py+=29}catch(Od){}try{a=b[Ta]={e:document.getElementById(Eb),w:0,h:0,py:0,
p:b[J]};a.w=10;a.e.style.height=13+X;a.e.style.top=15-a.p.py+X;a.h=13;a.p.py+=13}catch(Pd){}try{a=b[K]={w:0,h:0,py:0,p:b[t]};a.w=Math.max(a.p.w-18,0);a.h=44;a.p.py+=44}catch(Qd){}try{a=b[L]={e:document.getElementById(Tb),w:0,h:0,py:0,p:b[K]};a.w=Math.max(a.p.w- -20,0);a.e.style.height=Math.max(a.p.h,0)+X;a.e.style.top=0-a.p.py+X;a.h=Math.max(a.p.h,0);a.p.py+=Math.max(0,a.p.h)}catch(Rd){}try{a=b[Va]={e:document.getElementById(jc),w:0,h:0,py:0,p:b[L]};a.w=47;a.e.style.height=20+X;a.e.style.top=Math.max((a.p.h-
20)*0.5,0)-a.p.py+X;a.h=20;a.p.py+=20}catch(Sd){}try{a=b[Wa]={e:document.getElementById(qb),w:0,h:0,py:0,p:b[L]};a.w=29;a.e.style.height=29+X;a.e.style.top=7-a.p.py+X;a.h=29;a.p.py+=29}catch(Td){}try{a=b[Xa]={e:document.getElementById(Fb),w:0,h:0,py:0,p:b[L]};a.w=10;a.e.style.height=13+X;a.e.style.top=15-a.p.py+X;a.h=13;a.p.py+=13}catch(Ud){}try{a=b[M]={w:0,h:0,py:0,p:b[t]};a.w=Math.max(a.p.w-18,0);a.h=44;a.p.py+=44}catch(Vd){}try{a=b[N]={e:document.getElementById(Ub),w:0,h:0,py:0,p:b[M]};a.w=Math.max(a.p.w-
-20,0);a.e.style.height=Math.max(a.p.h,0)+X;a.e.style.top=0-a.p.py+X;a.h=Math.max(a.p.h,0);a.p.py+=Math.max(0,a.p.h)}catch(Wd){}try{a=b[Ya]={e:document.getElementById(kc),w:0,h:0,py:0,p:b[N]};a.w=26;a.e.style.height=20+X;a.e.style.top=Math.max((a.p.h-20)*0.5,0)-a.p.py+X;a.h=20;a.p.py+=20}catch(Xd){}try{a=b[Za]={e:document.getElementById(rb),w:0,h:0,py:0,p:b[N]};a.w=29;a.e.style.height=29+X;a.e.style.top=7-a.p.py+X;a.h=29;a.p.py+=29}catch(Yd){}try{a=b[$a]={e:document.getElementById(Gb),w:0,h:0,py:0,
p:b[N]};a.w=10;a.e.style.height=13+X;a.e.style.top=15-a.p.py+X;a.h=13;a.p.py+=13}catch(Zd){}try{a=b[O]={w:0,h:0,py:0,p:b[t]};a.w=Math.max(a.p.w-18,0);a.h=44;a.p.py+=44}catch($d){}try{a=b[P]={e:document.getElementById(Vb),w:0,h:0,py:0,p:b[O]};a.w=Math.max(a.p.w- -20,0);a.e.style.height=Math.max(a.p.h,0)+X;a.e.style.top=0-a.p.py+X;a.h=Math.max(a.p.h,0);a.p.py+=Math.max(0,a.p.h)}catch(ae){}try{a=b[bb]={e:document.getElementById(lc),w:0,h:0,py:0,p:b[P]};a.w=90;a.e.style.height=20+X;a.e.style.top=Math.max((a.p.h-
20)*0.5,0)-a.p.py+X;a.h=20;a.p.py+=20}catch(be){}try{a=b[cb]={e:document.getElementById(sb),w:0,h:0,py:0,p:b[P]};a.w=29;a.e.style.height=29+X;a.e.style.top=7-a.p.py+X;a.h=29;a.p.py+=29}catch(ce){}try{a=b[db]={e:document.getElementById(Hb),w:0,h:0,py:0,p:b[P]};a.w=10;a.e.style.height=13+X;a.e.style.top=15-a.p.py+X;a.h=13;a.p.py+=13}catch(de){}try{a=b[eb]={e:document.getElementById(vc),w:0,h:0,py:0,p:b[o]};a.e.style.width=Math.max(a.p.w,0)+X;a.e.style.left=0+X;a.w=Math.max(a.p.w,0);a.h=85;a.p.py+=85}catch(ee){}try{a=
b[fb]={e:document.getElementById(mb),w:0,h:0,py:0,p:b[o]};a.e.style.width=Math.max((a.p.w-115)*0.8878,0)+X;a.e.style.left=115+X;a.w=Math.max((a.p.w-115)*0.8878,0);a.e.style.height=Math.max((a.p.h-39)*0.044,0)+X;a.e.style.top=39-a.p.py+X;a.h=Math.max((a.p.h-39)*0.044,0);a.p.py+=Math.max(0,(a.p.h-39)*0.044)}catch(fe){}try{a=b[gb]={e:document.getElementById(lb),w:0,h:0,py:0,p:b[o]};a.w=92;a.e.style.height=62+X;a.e.style.top=13-a.p.py+X;a.h=62;a.p.py+=62}catch(ge){}try{a=b[hb]={e:document.getElementById(wc),
w:0,h:0,py:0,p:b[o]};a.e.style.width=Math.max((a.p.w-116)*0.5392,0)+X;a.e.style.left=116+X;a.w=Math.max((a.p.w-116)*0.5392,0);a.e.style.height=Math.max((a.p.h-18)*0.0278,0)+X;a.e.style.top=18-a.p.py+X;a.h=Math.max((a.p.h-18)*0.0278,0);a.p.py+=Math.max(0,(a.p.h-18)*0.0278)}catch(he){}}},"menu":{"id":"menu","anchor_id":"#m1-menu","resize":function(e,g){var a;var b={};var Y;a=b[S]={w:e,h:g,py:0};try{a=b[Q]={e:document.getElementById(Ac),w:0,h:0,py:0,p:b[S]};a.w=Math.max(a.p.w,0);a.e.style.height=Math.max(a.p.h-
43,0)+X;a.e.style.top=43-a.p.py+X;a.h=Math.max(a.p.h-43,0);a.p.py+=Math.max(0,a.p.h-43)}catch(Z){}try{a=b[U]={e:document.getElementById(Bc),w:0,h:0,py:0,p:b[Q]};a.w=Math.max(a.p.w,0);a.e.style.height=Math.max(a.p.h-4,0)+X;a.e.style.top=1-a.p.py+X;a.h=Math.max(a.p.h-4,0);a.p.py+=Math.max(0,a.p.h-4)}catch($){}try{a=b[ib]={e:document.getElementById(Cc),w:0,h:0,py:0,p:b[U]};a.conth=a.e.getAttribute(c);a.w=Math.max(a.p.w,0);a.e.style.height=(a.conth||Math.max(416,a.p.h))+X;a.e.style.top=0-a.p.py+X;a.h=
a.conth||Math.max(416,a.p.h);a.p.py+=Math.max(a.conth||Math.max(416,a.p.h),0)}catch(aa){}try{a=b[V]={e:document.getElementById(Ec),w:0,h:0,py:0,p:b[Q]};a.e.style.width=Math.max(a.p.w,0)+X;a.e.style.left=0+X;a.w=Math.max(a.p.w,0);a.e.style.height=28+X;a.e.style.top=0-a.p.py+X;a.h=28;a.p.py+=28}catch(ba){}try{a=b[fa]={e:document.getElementById(yc),w:0,h:0,py:0,p:b[V]};a.e.style.width=Math.max((a.p.w-2)*0.239,0)+X;a.e.style.left=2+X;a.w=Math.max((a.p.w-2)*0.239,0);a.e.style.height=Math.max((a.p.h-2)*
0.8846,0)+X;a.e.style.top=2-a.p.py+X;a.h=Math.max((a.p.h-2)*0.8846,0);a.p.py+=Math.max(0,(a.p.h-2)*0.8846)}catch(ca){}try{a=b[T]={e:document.getElementById(zc),w:0,h:0,py:0,p:b[S]};a.w=Math.max(a.p.w,0);a.e.style.height=43+X;a.e.style.top=0-a.p.py+X;a.h=43;a.p.py+=43}catch(da){}try{a=b[ga]={e:document.getElementById(Dc),w:0,h:0,py:0,p:b[T]};a.e.style.width=122+X;a.e.style.left=Math.max((a.p.w-122)*0.5,0)+X;a.w=122;a.e.style.height=25+X;a.e.style.top=Math.max(a.p.h-34,0)-a.p.py+X;a.h=25;a.p.py+=25}catch(ea){}try{a=
b[ha]={e:document.getElementById(xc),w:0,h:0,py:0,p:b[T]};a.w=80;a.e.style.height=31+X;a.e.style.top=6-a.p.py+X;a.h=31;a.p.py+=31}catch(Mc){}}},"story":{"id":"story","anchor_id":"#m1-story","resize":function(e,g){var a;var b={};var Y;a=b[j]={w:e,h:g,py:0};try{a=b[i]={e:document.getElementById(Hc),w:0,h:0,py:0,p:b[j]};a.w=Math.max(a.p.w,0);a.e.style.height=Math.max(a.p.h-43,0)+X;a.e.style.top=43-a.p.py+X;a.h=Math.max(a.p.h-43,0);a.p.py+=Math.max(0,a.p.h-43)}catch(Z){}try{a=b[l]={e:document.getElementById(Ic),
w:0,h:0,py:0,p:b[i]};a.w=Math.max(a.p.w,0);a.e.style.height=Math.max(a.p.h-3,0)+X;a.e.style.top=1-a.p.py+X;a.h=Math.max(a.p.h-3,0);a.p.py+=Math.max(2,a.p.h-3)}catch($){}try{a=b[ja]={e:document.getElementById(Jc),w:0,h:0,py:0,p:b[l]};a.conth=a.e.getAttribute(c);a.w=Math.max(a.p.w-2,0);a.e.style.height=(a.conth||Math.max(427,a.p.h-2))+X;a.e.style.top=0-a.p.py+X;a.h=a.conth||Math.max(427,a.p.h-2);a.p.py+=Math.max(a.conth||Math.max(427,a.p.h-2),0)}catch(aa){}try{a=b[k]={e:document.getElementById(Gc),
w:0,h:0,py:0,p:b[j]};a.w=Math.max(a.p.w,0);a.e.style.height=43+X;a.e.style.top=0-a.p.py+X;a.h=43;a.p.py+=43}catch(ba){}try{a=b[la]={e:document.getElementById(Kc),w:0,h:0,py:0,p:b[k]};a.e.style.width=122+X;a.e.style.left=Math.max((a.p.w-122)*0.5,0)+X;a.w=122;a.e.style.height=25+X;a.e.style.top=Math.max(a.p.h-34,0)-a.p.py+X;a.h=25;a.p.py+=25}catch(ca){}try{a=b[ma]={e:document.getElementById(Fc),w:0,h:0,py:0,p:b[k]};a.w=80;a.e.style.height=31+X;a.e.style.top=6-a.p.py+X;a.h=31;a.p.py+=31}catch(da){}try{a=
b[ia]={e:document.getElementById(kb),w:0,h:0,py:0,p:b[j]};a.w=0;a.e.style.height=0+X;a.e.style.top=-3E3-a.p.py+X;a.h=0;a.p.py+=0}catch(ea){}}}};m1Design["css"]=Lc;m1Design["pages"]=Nc;m1Design["_resizing"]={};m1Design["softSpinnerEnabled"]=true;m1Design["shouldHideAddressBar"]=true;m1Design["root"]=function(){return W};})(); return m1Design; }();m1Design['actions']={'action1':function() { phoneui.back();
; },'action6':function() { phoneui.gotoPage('m1-menu', 'DEFAULT');
; },'action0':function() { phoneui.gotoPage('m1-story', 'DEFAULT');
; },'action2':function() { var ex; try { eval('playVideo()'); } catch (ex) { console.log(ex); };
; },'action3':function() { var ex; try { eval('readmoreClicked()'); } catch (ex) { console.log(ex); };
; },'action4':function() { var ex; try { eval('shareOnFacebook()'); } catch (ex) { console.log(ex); };
; }};m1Design['actions']['action7']=m1Design['actions']['action8']=m1Design['actions']['action9']=m1Design['actions']['action12']=m1Design['actions']['action11']=m1Design['actions']['action20']=m1Design['actions']['action10']=m1Design['actions']['action19']=m1Design['actions']['action18']=m1Design['actions']['action17']=m1Design['actions']['action16']=m1Design['actions']['action15']=m1Design['actions']['action14']=m1Design['actions']['action13']=m1Design['actions']['action6'];m1Design['actions']['action5']=m1Design['actions']['action1']










