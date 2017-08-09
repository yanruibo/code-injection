



					$("#rss-news_02").on('pageshow', function() {
						
						function retrieveRSS() {
							
							$('body').addClass('ui-loading');
							$("#rss-feeds-news_02").rss("http://www.mairie-aixenprovence.fr/spip.php?page=backend_mobile&id_mot=240",
								{
									limit: 10,
									layoutTemplate: '<ul data-role="listview">{entries}</ul>',
									entryTemplate: '<li class="jsResizeThumbs"><a onclick="listLastScroll = $(window).scrollTop(); viewFeedDetail({index},\'02\', \'news\');">{teaserImage}<h3>{title}</h3><p>{shortBodyPlain}</p><span class="ui-li-aside entry-date">{date}</span></a></li><li class="detail_hidden" id="rss-news-content-02-{index}"><span class="feedContentTitle">{title}</span><br><span class="feedContentDate">{date}</span><br>{body}</li>'
								},
								function callback() {
									stopRSSTimeOut();
									$("#rss-feeds-news_02").trigger('create');
									resizeThumbs();
									$('body').removeClass('ui-loading');
								}
							);
							loadNews02 = false;
							
						}
						
						if(loadNews02 == true) {
							
							activateRSSTimeOut();
							retrieveRSS();
							
						}						
						
					});
				

					$(document).on('vclick', '#btnFeedContentBack-news_02', function(event) {
						viewFeedList('02', 'news');
						return false;
					});	
				


					$("#rss-agenda_04a").on('pageshow', function() {
						
						function retrieveRSS() {
							
							$('body').addClass('ui-loading');
							$("#rss-feeds-agenda_04a").rss("http://www.mairie-aixenprovence.fr/spip.php?page=backend_agenda&rub=3",
								{
									limit: 100,
									layoutTemplate: '<ul data-role="listview">{entries}</ul>',
									entryTemplate: '<li class="jsResizeThumbs"><a onclick="listLastScroll = $(window).scrollTop(); viewFeedDetail({index},\'04a\', \'agenda\');">{teaserImage}<h3>{title}</h3><p>{shortBodyPlain}</p><span class="ui-li-aside entry-date">{date}</span></a></li><li class="detail_hidden" id="rss-agenda-content-04a-{index}"><span class="feedContentTitle">{title}</span><br><span class="feedContentDate">{date}</span><br>{body}</li>'
								},
								function callback() {
									stopRSSTimeOut();
									$("#rss-feeds-agenda_04a").trigger('create');
									resizeThumbs();
									$('body').removeClass('ui-loading');
								}
							);
							loadAgenda04a = false;
							
						}
						
						if(loadAgenda04a == true) {
							
							activateRSSTimeOut();
							retrieveRSS();
							
						}						

					});
				

					$(document).on('vclick', '#btnFeedContentBack-agenda_04a', function(event) {
						viewFeedList('04a', 'agenda');
						return false;
					});	
				



					$("#rss-agenda_03").on('pageshow', function() {
						
						function retrieveRSS() {
							
							$('body').addClass('ui-loading');
							$("#rss-feeds-agenda_03").rss("http://www.mairie-aixenprovence.fr/spip.php?page=backend_agenda&rub=7",
								{
									limit: 40,
									layoutTemplate: '<ul data-role="listview">{entries}</ul>',
									entryTemplate: '<li class="jsResizeThumbs"><a onclick="listLastScroll = $(window).scrollTop(); viewFeedDetail({index},\'03\', \'agenda\');">{teaserImage}<h3>{title}</h3><p>{shortBodyPlain}</p><span class="ui-li-aside entry-date">{date}</span></a></li><li class="detail_hidden" id="rss-agenda-content-03-{index}"><span class="feedContentTitle">{title}</span><br><span class="feedContentDate">{date}</span><br>{body}</li>'
								},
								function callback() {
									stopRSSTimeOut();
									$("#rss-feeds-agenda_03").trigger('create');
									resizeThumbs();
									$('body').removeClass('ui-loading');
								}
							);
							loadAgenda03 = false;
							
						}
						
						if(loadAgenda03 == true) {
							
							activateRSSTimeOut();
							retrieveRSS();
							
						}						
						
					});
				

					$(document).on('vclick', '#btnFeedContentBack-agenda_03', function(event) {
						viewFeedList('03', 'agenda');
						return false;
					});	
				



					$("#rss-agenda_04c").on('pageshow', function() {
						
						function retrieveRSS() {
							
							$('body').addClass('ui-loading');
							$("#rss-feeds-agenda_04c").rss("http://www.mairie-aixenprovence.fr/spip.php?page=backend_agenda&rub=5",
								{
									limit: 30,
									layoutTemplate: '<ul data-role="listview">{entries}</ul>',
									entryTemplate: '<li class="jsResizeThumbs"><a onclick="listLastScroll = $(window).scrollTop(); viewFeedDetail({index},\'04c\', \'agenda\');">{teaserImage}<h3>{title}</h3><p>{shortBodyPlain}</p><span class="ui-li-aside entry-date">{date}</span></a></li><li class="detail_hidden" id="rss-agenda-content-04c-{index}"><span class="feedContentTitle">{title}</span><br><span class="feedContentDate">{date}</span><br>{body}</li>'
								},
								function callback() {
									stopRSSTimeOut();
									$("#rss-feeds-agenda_04c").trigger('create');
									resizeThumbs();
									$('body').removeClass('ui-loading');
								}
							);
							loadAgenda04c = false;
							
						}
						
						if(loadAgenda04c == true) {
							
							activateRSSTimeOut();
							retrieveRSS();
							
						}						

					});
				

					$(document).on('vclick', '#btnFeedContentBack-agenda_04c', function(event) {
						viewFeedList('04c', 'agenda');
						return false;
					});	
				




					$("#rss-agenda_05").on('pageshow', function() {
						
						function retrieveRSS() {
							
							$('body').addClass('ui-loading');
							$("#rss-feeds-agenda_05").rss("http://www.mairie-aixenprovence.fr/spip.php?page=backend_agenda&rub=2",
								{
									limit: 120,
									layoutTemplate: '<ul data-role="listview">{entries}</ul>',
									entryTemplate: '<li class="jsResizeThumbs"><a onclick="listLastScroll = $(window).scrollTop(); viewFeedDetail({index},\'05\', \'agenda\');">{teaserImage}<h3>{title}</h3><p>{shortBodyPlain}</p><span class="ui-li-aside entry-date">{date}</span></a></li><li class="detail_hidden" id="rss-agenda-content-05-{index}"><span class="feedContentTitle">{title}</span><br><span class="feedContentDate">{date}</span><br>{body}</li>'
								},
								function callback() {
									stopRSSTimeOut();
									$("#rss-feeds-agenda_05").trigger('create');
									resizeThumbs();
									$('body').removeClass('ui-loading');
								}
							);
							loadAgenda05 = false;
							
						}
						
						if(loadAgenda05 == true) {
							
							activateRSSTimeOut();
							retrieveRSS();
							
						}						
						
					});
				

					$(document).on('vclick', '#btnFeedContentBack-agenda_05', function(event) {
						viewFeedList('05', 'agenda');
						return false;
					});	
				


					$("#rss-news_01").on('pageshow', function() {
						
						function retrieveRSS() {
							
							$('body').addClass('ui-loading');
							$("#rss-feeds-news_01").rss("http://www.mairie-aixenprovence.fr/spip.php?page=backend_mobile&id_mot=239",
								{
									limit: 10,
									layoutTemplate: '<ul data-role="listview">{entries}</ul>',
									entryTemplate: '<li class="jsResizeThumbs"><a onclick="listLastScroll = $(window).scrollTop(); viewFeedDetail({index},\'01\', \'news\');">{teaserImage}<h3>{title}</h3><p>{shortBodyPlain}</p><span class="ui-li-aside entry-date">{date}</span></a></li><li class="detail_hidden" id="rss-news-content-01-{index}"><span class="feedContentTitle">{title}</span><br><span class="feedContentDate">{date}</span><br>{body}</li>'
								},
								function callback() {
									stopRSSTimeOut();
									$("#rss-feeds-news_01").trigger('create');
									resizeThumbs();
									$('body').removeClass('ui-loading');
								}
							);
							loadNews01 = false;	
							
						}
						
						if(loadNews01 == true) {
							
							activateRSSTimeOut();
							retrieveRSS();
							
						}						
						
					});
				

					$(document).on('vclick', '#btnFeedContentBack-news_01', function(event) {
						viewFeedList('01', 'news');
						return false;
					});	
				






					$("#rss-agenda_04b").on('pageshow', function() {
						
						function retrieveRSS() {
								
							$('body').addClass('ui-loading');
							$("#rss-feeds-agenda_04b").rss("http://www.mairie-aixenprovence.fr/spip.php?page=backend_agenda&rub=4",
								{
									limit: 120,
									layoutTemplate: '<ul data-role="listview">{entries}</ul>',
									entryTemplate: '<li class="jsResizeThumbs"><a onclick="listLastScroll = $(window).scrollTop(); viewFeedDetail({index},\'04b\', \'agenda\');">{teaserImage}<h3>{title}</h3><p>{shortBodyPlain}</p><span class="ui-li-aside entry-date">{date}</span></a></li><li class="detail_hidden" id="rss-agenda-content-04b-{index}"><span class="feedContentTitle">{title}</span><br><span class="feedContentDate">{date}</span><br>{body}</li>'
								},
								function callback() {
									stopRSSTimeOut();
									$("#rss-feeds-agenda_04b").trigger('create');
									resizeThumbs();
									$('body').removeClass('ui-loading');
								}
							);
							loadAgenda04b = false;
							
						}
						
						if(loadAgenda04b == true) {
							
							activateRSSTimeOut();
							retrieveRSS();
							
						}					
						
					});
				

					$(document).on('vclick', '#btnFeedContentBack-agenda_04b', function(event) {
						viewFeedList('04b', 'agenda');
						return false;
					});	
				













					
			google.load("feeds", "1"); //Load Google Ajax Feed API (version 1)
		







					// Adapting grid height to screen
					$('#home').live('pagecreate', function() {
						var screenH = $(window).height();
						if (screenH > 500) {
							$('#home .title-wrapper').height(screenH/6);
							$('#home div[class|=ui-grid]').height(screenH/3);
						}
					});
					
					$(window).bind("orientationchange resize", function() {
						var homeDisplay = $('#home').css('display');
						if (homeDisplay != 'none') {
							$('#home').trigger('pagecreate');
						}
					});
				

				$('#homefooter').fadeIn(3000);
			

					$(document).on('vclick', '#refresh_button-parkings', function(event) {
						$mapParking.width($(document).width());
						$mapParking.height(
							$(window).height()
							- $('#stationnement div.ui-footer').outerHeight()
							- $('#stationnement div.ui-header').outerHeight()
						);
						getParkingsRSS();
					});
				

					$(document).on('vclick', '#parkings_list_button', function(event) {
						$.mobile.changePage('index.html#list-parkings');
					});
				

					$(document).on('vclick', '#parkings_map_button', function(event) {
						$.mobile.changePage('index.html#stationnement');
					});
				

					$('#list-parkings').live('pageshow', function() {
						$('#list-parkings-newlist').listview('refresh');
						scrollTo(0,0);
					});
				

					$(document).on('vclick', '#reload_button-hospital', function(event) {
						$mapHospital.width($(document).width());
						$mapHospital.height(
							$(window).height()
							- $('#hospital div.ui-footer').outerHeight()
							- $('#hospital div.ui-header').outerHeight()
						);						
						retrievePositionLoadHospital();
					});
				

					$(document).on('vclick', '#reload_button-parks', function(event) {
						$mapParks.width($(document).width());
						$mapParks.height(
							$(window).height()
							- $('#parks div.ui-footer').outerHeight()
							- $('#parks div.ui-header').outerHeight()
						);
						initializeParks();
					});
				






			adaptHeaderPadding();
		

					
					var posterLinks = new Array();
					
					function retrieveMoviePosters() {
						var feed = new google.feeds.Feed("http://www.lescinemasaixois.com/feed");
						feed.setNumEntries(50); // Must be the same as the feed limit below
						feed.setResultFormat(google.feeds.Feed.MIXED_FORMAT);
						feed.load(function(result) {
							if (!result.error) {
								var xml = result.xmlDocument;
								parseLinks(xml);
								addMoviePosters();
							}
						});
					}
					
					function parseLinks(xml) {
						var posterTags = $(xml).find('link[rel="enclosure"]');

						for (var i = 0; i < posterTags.length; i++) {
							posterLinks[i] = posterTags.eq([i]).attr('href');
						}
					}
					
					function addMoviePosters() {
						$('#rss-feeds-agenda_02 img.ui-li-thumb').each(function(index) {
							$(this).attr('src', posterLinks[index]).attr('height', 70).attr('style', 'top:5px; left:20px;');
						});
						$('#rss-feeds-agenda_02 .movie-resume').each(function(index) {
							$(this).prepend('<img class="movie-content-poster" src="' + posterLinks[index] + '" />');
						});
					}

					function newWebsiteAddress() {
						$('#rss-feeds-agenda_02 li.detail_hidden').each(function() {
							var currentHref = $(this).find('.feedMovieSite-link').attr('href');
							var newHref = currentHref.replace( 'http://www.lescinemasaixois.com/', 'http://www.lescinemasaixois.com/mobile.php/' );
							$(this).find('.feedMovieSite-link').attr('href', newHref);
						});
					}


					$("#rss-agenda_02").on('pageshow', function() {
						
						function retrieveRSS() {
							
							$('body').addClass('ui-loading');
							$("#rss-feeds-agenda_02").rss("http://www.lescinemasaixois.com/feed",
								{
									limit: 50, // Must be the same as the feed limit above
									layoutTemplate: '<ul data-role="listview">{entries}</ul>',
									entryTemplate: '<li class="jsResizeThumbs"><a onclick="listLastScroll = $(window).scrollTop(); viewFeedDetail({index},\'02\', \'agenda\');"><img /><h3>{title}</h3><p>{shortBodyPlain}</p><span class="ui-li-aside entry-date">{date}</span></a></li><li class="detail_hidden" id="rss-agenda-content-02-{index}"><span class="feedContentTitle">{title}</span><br><br><span class="movie-resume">{body}</span><br><span class="feedMovieSite-mainWrapper"><p class="feedMovieSite-wrapper"><a class="feedMovieSite-link" href="{url}">Visiter la page web du film  \></a></p></span></li>'
								},
								function callback() {
									stopRSSTimeOut();
									retrieveMoviePosters();
									$("#rss-feeds-agenda_02").trigger('create');
									newWebsiteAddress();
									$('body').removeClass('ui-loading');
								}
							);
							loadAgenda02 = false;
							
						}
						
						if(loadAgenda02 == true) {
							
							activateRSSTimeOut();
							retrieveRSS();
							
						}						

					});
				

					$(document).on('vclick', '#btnFeedContentBack-agenda_02', function(event) {
						viewFeedList('02', 'agenda');
						return false;
					});	
				




					$("#rss-news_05").on('pageshow', function() {
						
						function retrieveRSS() {
							
							$('body').addClass('ui-loading');
							$("#rss-feeds-news_05").rss("http://www.mairie-aixenprovence.fr/spip.php?page=backend_mobile&id_mot=243",
								{
									limit: 10,
									layoutTemplate: '<ul data-role="listview">{entries}</ul>',
									entryTemplate: '<li class="jsResizeThumbs"><a onclick="listLastScroll = $(window).scrollTop(); viewFeedDetail({index},\'05\', \'news\');">{teaserImage}<h3>{title}</h3><p>{shortBodyPlain}</p><span class="ui-li-aside entry-date">{date}</span></a></li><li class="detail_hidden" id="rss-news-content-05-{index}"><span class="feedContentTitle">{title}</span><br><span class="feedContentDate">{date}</span><br>{body}</li>'
								},
								function callback() {
									stopRSSTimeOut();
									$("#rss-feeds-news_05").trigger('create');
									resizeThumbs();
									$('body').removeClass('ui-loading');
								}
							);
							loadNews05 = false;
							
						}
						
						if(loadNews05 == true) {
							
							activateRSSTimeOut();
							retrieveRSS();
							
						}						

					});
				

					$(document).on('vclick', '#btnFeedContentBack-news_05', function(event) {
						viewFeedList('05', 'news');
						return false;
					});	
				


					$("#rss-news_04").on('pageshow', function() {
						
						function retrieveRSS() {
							
							$('body').addClass('ui-loading');
							$("#rss-feeds-news_04").rss("http://www.mairie-aixenprovence.fr/spip.php?page=backend_mobile&id_mot=242",
								{
									limit: 10,
									layoutTemplate: '<ul data-role="listview">{entries}</ul>',
									entryTemplate: '<li class="jsResizeThumbs"><a onclick="listLastScroll = $(window).scrollTop(); viewFeedDetail({index},\'04\', \'news\');">{teaserImage}<h3>{title}</h3><p>{shortBodyPlain}</p><span class="ui-li-aside entry-date">{date}</span></a></li><li class="detail_hidden" id="rss-news-content-04-{index}"><span class="feedContentTitle">{title}</span><br><span class="feedContentDate">{date}</span><br>{body}</li>'
								},
								function callback() {
									stopRSSTimeOut();
									$("#rss-feeds-news_04").trigger('create');
									resizeThumbs();
									$('body').removeClass('ui-loading');
								}
							);
							loadNews04 = false;
							
						}
						
						if(loadNews04 == true) {
							
							activateRSSTimeOut();
							retrieveRSS();
							
						}						
						
					});
				

					$(document).on('vclick', '#btnFeedContentBack-news_04', function(event) {
						viewFeedList('04', 'news');
						return false;
					});	
				


					$("#rss-news_06").on('pageshow', function() {
						
						function retrieveRSS() {
							
							$('body').addClass('ui-loading');
							$("#rss-feeds-news_06").rss("http://www.mairie-aixenprovence.fr/spip.php?page=backend_mobile&id_mot=244",
								{
									limit: 10,
									layoutTemplate: '<ul data-role="listview">{entries}</ul>',
									entryTemplate: '<li class="jsResizeThumbs"><a onclick="listLastScroll = $(window).scrollTop(); viewFeedDetail({index},\'06\', \'news\');">{teaserImage}<h3>{title}</h3><p>{shortBodyPlain}</p><span class="ui-li-aside entry-date">{date}</span></a></li><li class="detail_hidden" id="rss-news-content-06-{index}"><span class="feedContentTitle">{title}</span><br><span class="feedContentDate">{date}</span><br>{body}</li>'
								},
								function callback() {
									stopRSSTimeOut();
									$("#rss-feeds-news_06").trigger('create');
									resizeThumbs();
									$('body').removeClass('ui-loading');
								}
							);
							loadNews06 = false;
							
						}
						
						if(loadNews06 == true) {
							
							activateRSSTimeOut();
							retrieveRSS();
							
						}						

					});
				

					$(document).on('vclick', '#btnFeedContentBack-news_06', function(event) {
						viewFeedList('06', 'news');
						return false;
					});	
				








					$("#rss-agenda_01").on('pageshow', function() {

						function retrieveRSS() {
							
							$('body').addClass('ui-loading');
							$("#rss-feeds-agenda_01").rss("http://www.mairie-aixenprovence.fr/spip.php?page=backend_agenda",
								{
									limit: 30,
									layoutTemplate: '<ul data-role="listview">{entries}</ul>',
									entryTemplate: '<li class="jsResizeThumbs"><a onclick="listLastScroll = $(window).scrollTop(); viewFeedDetail({index},\'01\', \'agenda\');">{teaserImage}<h3>{title}</h3><p>{shortBodyPlain}</p><span class="ui-li-aside entry-date">{date}</span></a></li><li class="detail_hidden" id="rss-agenda-content-01-{index}"><span class="feedContentTitle">{title}</span><br><span class="feedContentDate">{date}</span><br>{body}</li>'
								},
								function callback() {
									stopRSSTimeOut();
									$("#rss-feeds-agenda_01").trigger('create');
									resizeThumbs();
									$('body').removeClass('ui-loading');
								}
							);
							loadAgenda01 = false;
							
						}
						
						if(loadAgenda01 == true) {
							
							activateRSSTimeOut();
							retrieveRSS();
							
						}
						
					});
				

					$(document).on('vclick', '#btnFeedContentBack-agenda_01', function(event) {
						viewFeedList('01', 'agenda');
						return false;
					});	
				


					$("#rss-news_03").on('pageshow', function() {
						
						function retrieveRSS() {
							
							$('body').addClass('ui-loading');
							$("#rss-feeds-news_03").rss("http://www.mairie-aixenprovence.fr/spip.php?page=backend_mobile&id_mot=241",
								{
									limit: 10,
									layoutTemplate: '<ul data-role="listview">{entries}</ul>',
									entryTemplate: '<li class="jsResizeThumbs"><a onclick="listLastScroll = $(window).scrollTop(); viewFeedDetail({index},\'03\', \'news\');">{teaserImage}<h3>{title}</h3><p>{shortBodyPlain}</p><span class="ui-li-aside entry-date">{date}</span></a></li><li class="detail_hidden" id="rss-news-content-03-{index}"><span class="feedContentTitle">{title}</span><br><span class="feedContentDate">{date}</span><br>{body}</li>'
								},
								function callback() {
									stopRSSTimeOut();
									$("#rss-feeds-news_03").trigger('create');
									resizeThumbs();
									$('body').removeClass('ui-loading');
								}
							);
							loadNews03 = false;
							
						}
						
						if(loadNews03 == true) {
							
							activateRSSTimeOut();
							retrieveRSS();
							
						}						

					});
				

					$(document).on('vclick', '#btnFeedContentBack-news_03', function(event) {
						viewFeedList('03', 'news');
						return false;
					});	
				

// Functions to modify top/content distance according to responsive header size
// Search for a css rule and delete it - Src: http://www.hunlock.com/blogs/Totally_Pwn_CSS_with_Javascript
function getCSSRule(ruleName, deleteFlag, cssNumber) {
	ruleName=ruleName.toLowerCase();
	var styleSheet=document.styleSheets[cssNumber];
	var ii=0;
	var cssRule=false;
	do {
		if (styleSheet.cssRules) {
			cssRule = styleSheet.cssRules[ii];
		} else {
			cssRule = styleSheet.rules[ii];
		}
		if (cssRule)  {
			if (cssRule.selectorText.toLowerCase()==ruleName) {
				if (deleteFlag=='delete') {
					if (styleSheet.cssRules) {
						styleSheet.deleteRule(ii);
					} else {
						styleSheet.removeRule(ii);
					}
					return true;
				} else {
					return cssRule;
				}
			}
		}
		ii++;
	} while (cssRule)
}
function killCSSRule(ruleName, cssNumber) {
	return getCSSRule(ruleName,'delete', cssNumber);
}
// Adapt banner padding depending on which image is loaded (we swap at 600+ px)
function adaptHeaderPadding(deleteCss) {
	if (document.styleSheets) {
		var screenWidth = $(window).width();
		if (screenWidth > 600) {
			var imgHeaderH = Math.round(screenWidth*0.08333) + 5 // We use the ratio of banner image used when screen width is > 600
		} else {
			var imgHeaderH = Math.round(screenWidth*0.1375) + 5 // The other banner image ratio
		}
		var stylesheetsNumber = document.styleSheets.length - 2;
		if (deleteCss == 'delete') {
			killCSSRule('.ui-page-header-fixed', stylesheetsNumber);
		}
		document.styleSheets[stylesheetsNumber].insertRule(".ui-page-header-fixed {padding-top:" + imgHeaderH + "px !important}", 0);
		//$('html, body, .ui-page').animate({ scrollTop: 0 }, 0);		
	}
}



// Orientation events (can be bind to 'pageinit' too)
function geometrychanged() {

	var currentPage = $.mobile.activePage;
	if ( typeof( currentPage ) !== 'undefined' ) {
		var currentPageId = currentPage.attr( 'id' );
	}
	
	// Parkings map changes
	if ( ( typeof( currentPage ) !== 'undefined' ) && ( currentPageId == 'stationnement' ) ) {
		
		// Modifying Google Map size
		// The $map variables are defined in plugins/ui-map-v3/map-scripts.js
		$mapParking.width($(document).width());  
		$mapParking.height(
			$(window).height()
			- $('#stationnement div.ui-footer').outerHeight()
			- $('#stationnement div.ui-header').outerHeight()
			+ addIphoneAdressBarSize
		);

		// Reinitialize maps next time they're displayed (otherwise, they are rendered incorrectly)
		loadMapParking = true;

	}
	
	
	// Hospital map changes
	if ( ( typeof( currentPage ) !== 'undefined' ) && ( currentPageId == 'hospital' ) ) {
		
		// Modifying Google Map size
		// The $map variables are defined in plugins/ui-map-v3/map-scripts.js
		$mapHospital.width($(document).width());
		$mapHospital.height(
			$(window).height()
			- $('#hospital div.ui-footer').outerHeight()
			- $('#hospital div.ui-header').outerHeight()
			+ addIphoneAdressBarSize
		);

		// Reinitialize maps next time they're displayed (otherwise, they are rendered incorrectly)
		loadMapHospital = true;

	}
	
	
	// Parks map changes
	if ( ( typeof( currentPage ) !== 'undefined' ) && ( currentPageId == 'parks' ) ) {
		
		// Modifying Google Map size
		// The $map variables are defined in plugins/ui-map-v3/map-scripts.js
		$mapParks.width($(document).width());
		$mapParks.height(
			$(window).height()
			- $('#parks div.ui-footer').outerHeight()
			- $('#parks div.ui-header').outerHeight()
			+ addIphoneAdressBarSize
		);

		// Reinitialize maps next time they're displayed (otherwise, they are rendered incorrectly)
		loadMapParks = true;

	}
	
	
	// Modify banner image
	var new_width = $(window).width();
	var new_height = $(window).height();
	if((dpr = 1 && new_width > 600) || (dpr >= 1.5 && new_width > 300 && new_width > new_height)) {
		$('.banner').attr('src','img/bandeau-aix_paysage.png');
	} else {
		$('.banner').attr('src','img/bandeau-aix.png');
	}


	// Modify top/content distance according to responsive header size
	adaptHeaderPadding('delete');
	
}

$(window).on('orientationchange resize', geometrychanged);


// Preferred personal default options
$(document).on('mobileinit', function(){
	
	/* Specifities based on Android version */
	var ua = navigator.userAgent.toLowerCase();
	var isAndroid = ua.indexOf("android") > -1 && ua.indexOf("mobile");
	var androidVersion = parseFloat(ua.slice(ua.indexOf("android")+8));
	if(androidVersion >= 4) {
		/* Default transitions */
		$.mobile.defaultPageTransition = 'fade';
		/* Every link scroll to top in order to avoid the jumpy transitions (but this is buggy on Android <= 2.3) / Disable transitions on long pages because it's buggy as well */
		$(document).on('vclick', 'a:not(div[id^="rss"] a)', function() { // But do not do that for rss links, as it will result in a weird behavior
			var screenHeight = $(window).height();
			var contentHeight = $('.ui-page-active .ui-header').height() + $('.ui-page-active .ui-content').height() + $('.ui-page-active .ui-footer').height();
			if (contentHeight > screenHeight) {
				$(this).attr('data-transition', 'none');
			}
			//$.mobile.silentScroll(0);
		});
	} else {
		/* Default transitions */
		$.mobile.defaultPageTransition = 'none';
	}

	/* Reduce the 'hover' state latency to have a better feeling when taping */
	$.mobile.buttonMarkup.hoverDelay = 25;
	
	/* Minimum scrollback */
	$.mobile.minScrollBack = 500;
	
	/* Default themes - Src: http://stackoverflow.com/questions/4891906/jquery-mobile-default-data-theme */
	$.mobile.page.prototype.options.headerTheme = 'd';
	$.mobile.page.prototype.options.footerTheme = 'a';
	$.mobile.listview.prototype.options.theme = 'c';
	
	/* Back button on every page that has a previous history page */
	$.mobile.page.prototype.options.addBackBtn = true;
	$.mobile.page.prototype.options.backBtnTheme = 'a';
	
	/* Disable the disappearance of the toolbars */
	$.mobile.fixedtoolbar.prototype.options.tapToggle = false;
	
	/* Localization */
	//Global strings
	$.mobile.pageLoadErrorMessage = 'Erreur de chargement';
	//Widget strings
	$.mobile.page.prototype.options.backBtnText = 'Retour';
	$.mobile.dialog.prototype.options.closeBtnText = 'Fermer';
	$.mobile.collapsible.prototype.options.expandCueText = 'Cliquer pour afficher les contenus';
	$.mobile.collapsible.prototype.options.collapseCueText = 'Cliquer pour masquer les contenus';
	$.mobile.listview.prototype.options.filterPlaceholder = 'Filtrer...';
	$.mobile.selectmenu.prototype.options.closeText = 'Fermer';
	
	/* Configure page loading widget */
	$.mobile.loadingMessageTextVisible = false;
	$.mobile.loadingMessage = "chargement...";
	$.mobile.loadingMessageTheme = "a";
	
	/* Allow remote URL in PhoneGap */
	$.support.cors = true;
	$.mobile.allowCrossDomainPages = true;
	
	/* Avoid problems with URL management */
	$.mobile.pushState = false;

	// Change banner image if device is in landscape mode
	// The function will be called in all external files to avoid loading the portrait version
	$(document).live('pageinit', function() {
		var screen_width = $(window).width();
		if(screen_width > 600) {
			$('.banner').attr('src','img/bandeau-aix_paysage.png');
		}
	});	

});

