


        $(document).bind("mobileinit", function(){
            if(navigator.userAgent.indexOf("Android")!= -1){
                trans = "none";
            }else{
                trans = "fade";
            }
            trans = "none";
            $.mobile.defaultPageTransition = trans;
            $.mobile.useFastClick  = false;
        });
        
















      
		

            var trans;
            if(navigator.userAgent.indexOf("Android")!= -1){
                trans = "none";
            }else{
                trans = "slide";
            }
            trans = "none";
            $(document).on("swipeleft", 'div.poi', function(){
				var nextpage = $(this).next('div.poi');
				// swipe using id of next page if exists
				if (nextpage.length > 0) {
					pushHistoryPage("#" + nextpage[0].id, {data:{}});
					$.mobile.changePage("#" + nextpage[0].id, {transition: trans, reverse: false});
				}
			});
            $(document).on("swiperight", 'div.poi', function(){
				var prevpage = $(this).prev('div.poi');
				// swipe using id of next page if exists
				if (prevpage.length > 0) {
					pushHistoryPage("#" + prevpage[0].id, {data:{}});
					$.mobile.changePage("#" + prevpage[0].id, {transition: trans, reverse: true});
				}
			});
			$(document).on("click", 'a.navForward', function(event){
				var nextpage = $(this).closest('div.poi').next('div.poi');
				// swipe using id of next page if exists
				if (nextpage.length > 0) {
					pushHistoryPage("#" + nextpage[0].id, {data:{}});
					$.mobile.changePage("#" + nextpage[0].id, {transition: trans, reverse: false});
				}
			});
			$(document).on("click", 'a.navBack', function(event){
				var prevpage = $(this).closest('div.poi').prev('div.poi');
				// swipe using id of next page if exists
				if (prevpage.length > 0) {
					pushHistoryPage("#" + prevpage[0].id, {data:{}});
					$.mobile.changePage("#" + prevpage[0].id, {transition: trans, reverse: true});
				}
			});
		

// Map global variables
var map = null;
var infoBox = null;
var markers = [];
var poiMarker, InfoBox;

// Local Store Tests
function LocalStore(a) {
if (typeof(localStorage) == 'undefined' ) {
    alert('Your browser does not support HTML5 localStorage. Try upgrading.');
}
else {
    switch (a) {
        case 'store':
            try {
            localStorage.setItem("name", "Local Storage Works"); //saves to the database, "key", "value"
            alert('Value Stored');
            } catch (e) {
                if (e == QUOTA_EXCEEDED_ERR) {
                alert('Quota exceeded!'); //data wasn't successfully saved due to quota exceed so throw an error
                }
            }
            break;
        case 'get':
            alert(localStorage.getItem("name")); //Hello World!
            break;
        case 'delete':
            if (localStorage.getItem("name") != null) {
                localStorage.removeItem("name"); //deletes the matching item from the database
                alert('Value deleted from local store');
            }
            else {alert('Value does not exist or already deleted');}
            break;
        }
    }
};
// Splash Screen
function init_Splash() {
    $('#splashImg').hide();
    var randomNum = Math.ceil(Math.random()*4); /* Pick random number between 1 and 2 */
    var rimg = '../images/splash_0' + randomNum + '.jpg';
    $('#splashImg').attr({
      src: rimg
    });
    $('#splashImg').fadeIn();
}
// Pages Initialization and Functions
// Positioning of Discovery Trails Content
$('.positionContent').live('pageshow', function (event, ui) {
    pos = (($('.positionContent').width() / 320) * 130) - 40;
    $('.positionContent .TrailsContent').css("margin-top", pos);
    // Recalculate when orientation changes
    $(window).resize(function() {
      pos = (($('.positionContent').width() / 320) * 130) - 40;
      $('.positionContent .TrailsContent').css("margin-top", pos);
    });
});
$('#aboutFraserApp').live('pageshow', function (event, ui) {
    pos = (($('#aboutFraserApp').width() / 320) * 170) - 40;
    $('#aboutFraserApp .AboutContent').css("margin-top", pos);
    // Recalculate when orientation changes
    $(window).resize(function() {
      pos = (($('#aboutFraserApp').width() / 320) * 170) - 40;
      $('#aboutFraserApp .AboutContent').css("margin-top", pos);
    });
});
$('#homePage').live('pagebeforehide',function(event, ui){
    $('#homePage .panel').hide();
});
$('#homePage').live('pageshow',function(event, ui){
    $('#homePage .panel').fadeIn('fast');
});

$('.trailPage').live('pagebeforehide',function(event, ui){
    $('.trailPage .panel').hide();
});
$('.trailPage').live('pageshow',function(event, ui){
    $('.trailPage .panel').fadeIn('slow');
});

// Override back button for android
function backKeyDown() {
	$('#lnkDefaultBack').click();
}

fcOnDeviceReady = function(){
	FC.utils.pageCacheSize = 30;
	
	// Load all images
	var data = { Images:[] };
	for (var k = 0; k < FC.data.trails.length; k++) {
		var trail = FC.data.trails[k];
		if (!trail.TrailID) return true;
		data.Images.push(trail.LargeImageUrl);
		data.Images.push(trail.HeroImageUrl);
		
		if (trail.TrailPathImageUrl) {
			data.Images.push(trail.TrailPathImageUrl);
		}
		
		for (var i = 0; i < trail.Deals.length; i++) {
			data.Images.push(trail.Deals[i].ImageUrl);
		}
		
		for (var i = 0; i < trail.POIs.length; i++) {
			data.Images.push(trail.POIs[i].ImageUrl)
			for (var j = 0; j < trail.POIs[i].Guides.length; j++) {
				data.Images.push(trail.POIs[i].Guides[j].ImageUrl);
			}
			if (trail.POIs[i].Reward)
				data.Images.push(trail.POIs[i].Reward.ImageUrl);
				
			for (var j = 0; j < trail.POIs[i].Images.length; j++) {
				data.Images.push(trail.POIs[i].Images[j].ImageUrl);
			}
		}
    }
	var imgHtml = ich.t_load_all_images(data);
	$(imgHtml).trigger('create');
	$('#loadAllImages').replaceWith(imgHtml).page();
	
	// All click events to tracked here
	// Needed to be done this way because of JQM bug. Info - http://scottwb.com/blog/2012/06/29/jquery-mobile-breaks-your-hrefs-on-ios-mobile-safari/
	$('a[href^="#"]').live('click', function(event) {
		var me, html, trail, trailId, back, page, href, data, myData;
		me = $(this);
		myData = Object({data:{}});
		href = typeof me.data("href") != "undefined" ? me.data("href") : me.attr("href");
						   
		if (href == "#back") {
			back = true;
			href = popHistoryPage(window.location.hash, myData);
		} else {
			back = false;
			myData.data = me.data();
		}
		
		if (myData.data.rel != "dialog" && href != "#" && href.indexOf("#cmd") == -1 && href.indexOf("javascript") == -1
		    && href.indexOf("tel:") == -1 && href.indexOf("http://") == -1)
			pushHistoryPage(href, myData);
		
		trailId = myData.data.trailId;
		
		if (typeof trailId != "undefined")
			trail = FC.utils.getTrailById(trailId);
			
		switch (href)
		{
			case "#trailMap":
				html = ich.t_trail_map(trail);
				page = href;
				break;
			case "#searchDialog":
				html = ich.t_search_dialog(trail);
				page = href;
				break;
			case "#trailDealCategories":
				var poiId = typeof myData.data.poiId != "undefined" ? myData.data.poiId : trail.POIs[0].PointOfInterestID;
				
				// Get deal categories
				var cats = [];
				$.each(trail.Deals, function(i, deal) {
					if (getObjects(cats, 'DealCategoryID', deal.DealCategoryID).length < 1)
						cats.push({ DealCategoryID: deal.DealCategoryID, DealCategoryName: deal.DealCategoryName });
				});

				// Build data
				data = {
					TrailID: trail.TrailID,
					Name: trail.Name,
					LargeImageUrl: trail.LargeImageUrl,
					PoiID: poiId,
					Categories: cats,
					DisplayMap: FC.data_on,
					DealCategoryID: function() {
					  return this.DealCategoryID;
					},
					DealCategoryName: function() {
					  return this.DealCategoryName;
					},
				};

				// Build html
				html = ich.t_trail_deal_category(data);
				page = href;
				break;
			case "#trailDealMap":
				// Build data
				if (typeof trail === "undefined") {
					data = {
						DisplayFooter: false,
						CategoryID: myData.data.catId
					};
				} else {
					var poiId = typeof myData.data.poiId != "undefined" ? myData.data.poiId : trail.POIs[0].PointOfInterestID;
					data = {
						TrailID: trail.TrailID,
						Name: trail.Name,
						PoiID: poiId,
						DisplayFooter: true,
						CategoryID: myData.data.catId
					};
				}

				// Build html
				html = ich.t_trail_deal_map(data);
				page = href;
				break;
			case "#trailDeals":
				// Build data
				var dealCat = getObjects(FC.data.trails, 'DealCategoryID', myData.data.catId);
				var dealCatName = dealCat.length > 0 ? dealCat[0].DealCategoryName : "";

				if (typeof trail === "undefined") {
					data = {
						TrailID: "0",
						CategoryID: myData.data.catId,
						CategoryName: dealCatName,
						DisplayFooter: false,
						DisplayMap: FC.data_on,
						Deals: function() {
							var deals = [];
							$.each(FC.data.trails, function(i, trail) {
								$.each(trail.Deals, function(i, deal) {
									if (deal.DealCategoryID == myData.data.catId) {
										var simDeals = getObjects(deals, 'Name', deal.Name);
										var simDeal = simDeals.length > 0 ? simDeals[0] : undefined;
										
										if (typeof simDeal === "undefined") {
											deals.push(deal);
										} else if (deal.Latitude != simDeal.Latitude &&
												   deal.Longitude != simDeal.Longitude &&
												   deal.NameOfVendor != simDeal.NameOfVendor &&
												   deal.PhoneNumberOfVendor != simDeal.PhoneNumberOfVendor) {
											deals.push(deal);
										}
									}
								});
							})	
							return deals;
						}
					};
				} else {
					var poiId = typeof myData.data.poiId != "undefined" ? myData.data.poiId : trail.POIs[0].PointOfInterestID;
					data = {
						TrailID: trail.TrailID,
						Name: trail.Name,
						CategoryID: myData.data.catId,
						CategoryName: dealCatName,
						PoiID: poiId,
						DisplayFooter: true,
						DisplayMap: FC.data_on,
						Deals: getObjects(trail.Deals, 'DealCategoryID', myData.data.catId)
					};		
				}

				// Build html
				html = ich.t_deal_list(data);
				page = href;
				break;
			case "#allDealCategories":
				// Get categories
				var allCats = [];
				$.each(FC.data.trails, function(i, trail) {
					$.each(trail.Deals, function(i, deal) {
						if (getObjects(allCats, 'DealCategoryID', deal.DealCategoryID).length < 1)
							allCats.push({ DealCategoryID: deal.DealCategoryID, DealCategoryName: deal.DealCategoryName });
					});
				});

				// Build data
				data = {
					Categories: allCats,
					DisplayMap: FC.data_on,
					DealCategoryID: function() {
					  return this.DealCategoryID;
					},
					DealCategoryName: function() {
					  return this.DealCategoryName;
					},
				};

				// Build html
				html = ich.t_all_deal_category(data);
				page = href;
				break;
			case "#trailDetail":
				/*FC.utils.cacheImage(trail.HeroImageUrl);
				
				if (trail.TrailPathImageUrl) {
					FC.utils.cacheImage(trail.TrailPathImageUrl);
				}
				
				for (var i = 0; i < trail.Images.length; i++) {
					FC.utils.cacheImage(trail.Images[i].ImageUrl)
				}
				
				for (var i = 0; i < trail.POIs.length; i++) {
					FC.utils.cacheImage(trail.POIs[i].ImageUrl)
					if (trail.POIs[i].Reward)
						FC.utils.cacheImage(trail.POIs[i].Reward.ImageUrl);
				}*/
				data = { 
					firstPOIID: trail.POIs[0].PointOfInterestID
				};
				$.extend(true, data, trail);
				html = ich.t_trail_detail(data);
				FC.utils.loadTrailPois(trail);
				page = href;
				break;
			case "#discoveryTrails":
				html = ich.t_trail(FC.data);
				page = href;
				break;
			case "#discoveryTrailsList":
				html = ich.t_trail_list(FC.data);
				page = href;
				break;
			case "#DealsRewards":
				html = ich.t_deals_rewards();
				page = href;
				break;
			case "#aboutFraserApp":
				html = ich.t_about_fraser_app();
				page = href;
				break;
			case "#comments":
				// Get poi
				var commPoi = FC.utils.getPOIById(trail, myData.data.poiId);

				// Build data
				data = {
					Name: "Explore <span>" + trail.Name + "</span>",
					FbCommentUrl: commPoi.Reward.Comments
				};

				// Build html
				html = ich.t_comments(data);
				page = href;
				break;
			case "#trailReward":
				// Get poi
				var poi = getObjects(trail, 'PointOfInterestID', myData.data.poiId);
				if (poi.length > 0) {
				   data = {poi:poi[0]};
				   data.Name = trail.Name;
				   data.TrailID = trail.TrailID;
					data.redeemed = store.get("reward_"+ data.poi.Reward.RewardID ) === FC.constants.REDEEMED;
					data.unlocked = store.get("reward_"+ data.poi.Reward.RewardID ) === FC.constants.UNLOCKED;
					if (!data.redeemed && !data.unlocked){
						data.not_unlocked_and_not_redeemed = true;
					}
					html = ich.t_reward(data);
					page = href;
				}
				break;
		   case "#cmdScanButton":
			   var rewardID;
			   if (!(window.plugins != null)) {
			   alert("Sorry not in phonegap");
			   break;
			   }
			   rewardID = myData.data.rewardId;
			   data = {poi : FC.utils.getPOIById(trail, myData.data.poiId)};
			   window.plugins.barcodeScanner.scan(function(obj) {
				  if (store.get(("reward_" + data.poi.Reward.RewardID) === (FC.constants.REDEEMED || FC.constants.UNLOCKED))) {
				  navigator.notification.alert("You have already unlocked this reward before!", null, 'Reward Unlock', 'OK');
				  return;
				  }
				  if (obj.text === rewardID) {
				  store.set("reward_" + data.poi.Reward.RewardID, FC.constants.UNLOCKED);
				  return navigator.notification.alert("Success you unlocked this reward!", function() {
													  href = "#trailReward";
													  data.unlocked = true;
													  data.Name = trail.Name;
													  data.TrailID = trail.TrailID;
													  html = ich.t_reward(data);
													  $(html).trigger('create');
													  $(href).replaceWith(html).page();
													  $.mobile.changePage(href);
													  }, 'Reward Unlock', 'OK');
				  } else {
				  return navigator.notification.alert("Sorry this isn't the right QR code for this reward!", null, 'Reward Unlock', 'OK');
				  }
				  },
				  function(fail) {
				  return console.log(fail);
				  });
			   break;
			case "#cmdPromptSubmit":
			   data = {TrailID : trail.TrailID};
			   data.Name = trail.Name;
			   data.redeem_form = true;
			   data.poi = FC.utils.getPOIById(trail, myData.data.poiId);
			   href = "#trailReward";
			   html = ich.t_reward(data);
			   $(html).trigger('create');
			   $(href).replaceWith(html).page();
			   $.mobile.changePage(href);
			   break;
			case "#cmdSubmitRedeem":
			   data = {TrailID : trail.TrailID};
			   data.poi = FC.utils.getPOIById(trail, myData.data.poiId);
			   var input = $('.rewardOverlay').find('input');
			   var email = $(input).val();
			   // checks that an input string looks like a valid email address.
			   var isEmail_re  = /^\s*[\w\-\+_]+(\.[\w\-\+_]+)*\@[\w\-\+_]+\.[\w\-\+_]+(\.[\w\-\+_]+)*\s*$/;
			   function isEmail (s) {
			   return String(s).search (isEmail_re) != -1;
			   }
			   if(!isEmail(email)){
				   navigator.notification.alert(
						"Your email appears invalid, please fix it and try again.",
						null,
						'Redeem Reward',
						'OK'
					);
			   }else{
				   FC.getData("RewardUnlocked",
						  {
						  RewardID: JSON.stringify(data.poi.Reward.RewardID),
						  Email: JSON.stringify(email),
						  UnlockedDate: JSON.stringify(new Date().toUTCString())
						  },
						  function(result) {
							  store.set("reward_"+ data.poi.Reward.RewardID, FC.constants.REDEEMED);
							  href = "#trailReward";
							  data.redeemed = true;
							  data.Name = trail.Name;
							  html = ich.t_reward(data);
							  $(html).trigger('create');
							  $(href).replaceWith(html).page();
							  $.mobile.changePage(href);
							  //$('a.btn_rewards').toggle();
						  }
				  );
			   }
			   break;
			case "#trailRewards":
				  var c, poi, rewards, unlocked, _i, _len, _ref;
				  var poiId = typeof myData.data.poiId != "undefined" ? myData.data.poiId : trail.POIs[0].PointOfInterestID;
				  rewards = [];
				  c = 1;
				  _ref = trail.POIs;
				  for (_i = 0, _len = _ref.length; _i < _len; _i++) {
					poi = _ref[_i];
					if (poi.Reward && poi.Reward.IsActive) {
					  unlocked = store.get("reward_" + poi.Reward.RewardID);
					  if (unlocked === FC.constants.REDEEMED) continue;
					  poi.Reward.poiID = poi.PointOfInterestID;
					  poi.Reward.position = c;
					  poi.Reward.unlocked = unlocked != null ? true : false;
					  rewards.push(poi.Reward);
					  FC.utils.cacheImage(poi.Reward.ImageUrl);
					  c += 1;
					}
				  }
				  data = { 
					rewards: rewards,
					PoiID: poiId
				  };
				  if (myData.data.loadPois)
					FC.utils.loadTrailPois(trail);
				  $.extend(true, data, trail);
				  html = ich.t_reward_list(data);
				  page = href;
				  break;
			case "#categoryDeals":
				  var category = myData.data.categoryId;
				  data = {
					Deals: FC.utils.dealsForCategory(category),
					category: category,
					category_name: FC.utils.categoryForID(category).Name
				  };
				  html = ich.t_deal_category_list(data);
				  page = href;
				  break;
			case "#searchResults":
				if (typeof myData.data.poiId != "undefined") {
				  var item, poi, _i, _len, _ref;
				  poi = FC.utils.getPOIById(trail, myData.data.poiId);
				  data = {
					show_search: false,
					trail_name: trail.Name,
					items: poi.Guides,
					"url": function() {
					  return this.MediaUrl;
					},
					"description": function() {
					  return "" + (this.MediaType.toTitleCase()) + " " + this.RunningTime;
					},
					"title": function() {
					  return this.Name;
					},
					"do_link_tag": true,
					"link_tag": function() {
					  return "" + this.MediaUrl;
					}
				  };
				  if ((typeof item !== "undefined" && item !== null) && item.isActive) {
					_ref = data.items;
					for (_i = 0, _len = _ref.length; _i < _len; _i++) {
					  item = _ref[_i];
					  data.items = item;
					}
				  }
				  html = ich.t_search_results(data);
				  page = href;
				} else {
					if (myData.data.cat != "") {
						FC.getData('GetProductsByCategory',
							{
								DestinationID: JSON.stringify(parseInt(myData.data.des)),
								CategoryID: JSON.stringify(myData.data.cat),
								SubCategoryID: JSON.stringify(myData.data.subCat)
							},
							function(result) {
								// Set product search results
								FC.atdwData = result.d;
								// Get trail
								//var trail = FC.utils.getTrailById(myData.data.trailId);
								// Create data
								data = {
									show_search: true,
									search_title: trail.Name,
									TrailID: trail.TrailID,
									items: result.d,
									"url": function() {
									  return "javascript:showAtdwProduct(" + trail.TrailID + ", "  + this.ATDWProductID + ");";
									},
									"description": function() {
									  return this.ShortDescription;
									},
									"title": function() {
									  return this.Name;
									},
									NonBlank: true
								};
								html = ich.t_search_results(data);
								$(html).trigger('create');
								$(href).replaceWith(html).page();
								$.mobile.changePage(href);
							}
						);
					} else {
						alert('Please select a type.');
					}
				}
				break;
			case "#cmdVideo":
				  var u, vid;
				  u = myData.data.url;
				  vid = u.split("/");
				  vid = vid[3];
				  if (navigator.userAgent.indexOf("Android") != -1){
					window.plugins.webintent.startActivity({
					  action: WebIntent.ACTION_VIEW,
					  url: "vnd.youtube://" + vid
					}, function() {}, function(error) {
					  console.log(error);
					  return alert('Failed to open URL via Android Intent');
					});
					return;
				 } else {
					  return window.plugins.childBrowser.showWebPage(u, {
						showLocationBar: true
					  });
				 }
				  break;
			case "#DealsRewardsCategory":
				  var c;
				  data = {
					categories: (function() {
					  var _i, _len, _ref, _results;
					  _ref = FC.data.categories;
					  _results = [];
					  for (_i = 0, _len = _ref.length; _i < _len; _i++) {
						c = _ref[_i];
						if (c.IsActive) _results.push(c);
					  }
					  return _results;
					})()
				  };
				  html = ich.t_deals_rewards_category(data);
				  page = href;
				  break;
			case "#discoveryTrailsCategory":
				if (typeof myData.data.categoryId != "undefined") {
				  var category, t, trails;
				  trails = FC.utils.trailsForCategoryID(myData.data.categoryId);
				  category = FC.utils.categoryForID(myData.data.categoryId);
				  data = {
					trails: (function() {
					  var _i, _len, _results;
					  _results = [];
					  for (_i = 0, _len = trails.length; _i < _len; _i++) {
						t = trails[_i];
						if (t.IsActive) _results.push(t);
					  }
					  return _results;
					})(),
					title: category.Name,
					backButton: true
				  };
				  html = ich.t_category_trail_list(data);
				  page = href;
				} else {
				  var poi, t, trails, _i, _j, _len, _len2, _ref, _ref2;
				  trails = [];
				  _ref = FC.data.trails;
				  for (_i = 0, _len = _ref.length; _i < _len; _i++) {
					t = _ref[_i];
					if (t.IsActive) {
					  _ref2 = t.POIs;
					  for (_j = 0, _len2 = _ref2.length; _j < _len2; _j++) {
						poi = _ref2[_j];
						if (poi.Reward != null) {
						  t.alternate_class = "rewards";
						  t.alternate_link = "trailRewards";
						  trails.push(t);
						  break;
						}
					  }
					}
				  }
				  data = {
					trails: trails,
					title: "Rewards for Trail"
				  };
				  html = ich.t_category_trail_list(data);
				  page = href;
				}
				break;
			case "#productDetail":
				  showDealProduct(trailId, myData.data.dealId);
				  break;
		   case "#loadAroundMeDialog":
				   html = ich.t_load_around_me_dialog();
				   page = href;
				   break;
			default:
				break;
		}
		
		if (typeof page != "undefined") {
			$(html).trigger('create');
			$(page).replaceWith(html).page();
		}
		
		if (back) {
			$.mobile.changePage(href);
		}
	});
	
	$('.btn_comments').live('click', function(event) {
		var cb = window.plugins.childBrowser;
		var _url = $(this).data('comments-url');
        cb.onLocationChange = function(loc){
			console.log("this is the url:", loc);
			if(loc.indexOf("https://www.facebook.com/connect/window_comm.php") === 0){
				console.log("Navigate back to the damn comments!");
				console.log(_url);
				cb.getPage(_url, {});
				console.log("After getPage");
			}
        };

        window.plugins.childBrowser.showWebPage($(this).data('comments-url'),
                                                { showLocationBar: true });

        return true;

		var name = "";
		var trailId = $(this).data('trail-id');

		if (typeof(trailId) != "undefined")
		{
			// Get trail
			var trail = FC.utils.getTrailById(trailId);

			// Set name
			name = "Explore <span>" + trail.Name + "</span>";
		} else {
			// Set name
			name = $(this).data('atdw-cat') + " <span>&#160;</span>";
		}

		// Build data
		var data = {
			Name: name,
			FbCommentUrl: $(this).data('comments-url')
		};

		// Build html
		var html = ich.t_comments(data);
		$(html).trigger('create');
		$('#comments').replaceWith(html).page();
	});
	$('a.photofold').live("click", function(event){
	  // $(this) point to the clicked .sponsorFlip element (caching it in elem for speed):
	  var elem = $(this).next('.trailElement');
	  // data('flipped') is a flag we set when we flip the element:
	  if(elem.data('flipped'))
	  {
	  // If the element has already been flipped, use the revertFlip method
	  // defined by the plug-in to revert to the default state automatically:
	  elem.revertFlip();
	  // Unsetting the flag:
	  elem.data('flipped',false)
	  }
	  else
	  {
	  // Using the flip method defined by the plugin:
	  elem.flip({
				direction:'lr',
				color: '#fff',
				speed: 200,
				onBefore: function(){
				// Insert the contents of the .sponsorData div (hidden
				// from view with display:none) into the clicked
				// .sponsorFlip div before the flipping animation starts:
				elem.height(elem.height()); // Fix height to current height
				elem.html(elem.siblings('.trailDescription').html());
				}
				});
	  // Setting the flag:
	  elem.data('flipped',true);
	  }
	});
	$('#loadAroundMeDialog').live('pageshow', function(event, ui) {
	  $('a[data-icon=delete]').hide();
	   $.mobile.showPageLoadingMsg();
		FC.utils.getLocation(
			 function(position) {
						 if (FC.data_on) {
						 FC.getData('GetTrailAroundMe',
									{
									//Lat: JSON.stringify('-26.395886753549664'),
									//Lng: JSON.stringify('153.05613802343737')
									Lat: JSON.stringify(position.coords.latitude),
									Lng: JSON.stringify(position.coords.longitude)
									},
									function(result) {
									var trailId = result.d;
									
									if (trailId > 0) {
									var href = "#trailDetail";
									var trail = FC.utils.getTrailById(trailId);
									pushHistoryPage(href, {data:{trailId:trailId}});
									
									var data = {
									firstPOIID: trail.POIs[0].PointOfInterestID
									};
									
									$.extend(true, data, trail);
									FC.utils.loadTrailPois(trail);
									
									var html = ich.t_trail_detail(data);
									$(html).trigger('create');
									$(href).replaceWith(html).page();
									$.mobile.changePage(href);
									} else {
									outOfRangeDialog();
									}
									}
									);
						 } else {
						 noNetworkDialog();
						 }
						 },
						 function() {
						 outOfRangeDialog();
						 }
						 );
    });
    $('#trailMap').live('pageshow', function(event, ui) {
		$(this).find('[data-role="content"] #map_trail').hide();
		var the_height = $(window).height() - $(this).find('[data-role="header"]').height() - $(this).find('[data-role="footer"]').height();
		$(this).find('[data-role="content"] #map_trail').height(the_height);
		$(this).find('[data-role="content"] #map_trail').show();

		var trailId = $(this).find('h1').data('trail-id');
		var trail = FC.utils.getTrailById(trailId);

		if (FC.data_on) {
			$('.mapFooterButtons li a').click(function() {
				$('.mapFooterButtons li a').removeClass('ui-disabled');
				$(this).addClass('ui-disabled');
			});
			executeMap(function() { loadMapTrail(trail); });
		} else {
			$('.searchButton').addClass('ui-disabled');
			$('.mapFooterButtons li a').addClass('ui-disabled');
			$(this).find('[data-role="content"] #map_trail').css({ "background-image": "url(" + trail.TrailPathImageUrl + ")", 'background-repeat': 'no-repeat'});
		}
    });
	$('#searchDialog').live('pageshow', function(event, ui) {
		if (infoBox) infoBox.setMap(null);
		$('#ddlSubCategory').selectmenu('disable');
		$.mobile.showPageLoadingMsg();
		$('a[data-icon=delete]').hide();
		FC.getData('GetCategories',
			{ },
			function(result) {
				var cat = $('#ddlCategory');
				cat.empty();
				cat.append('<option value="">Type</option>');
				$.each(result.d, function() {
					cat.append('<option value="' + this.ATDWCategoryID + '">' + this.Name + '</option>');
				});
				cat.selectmenu('refresh');
				$.mobile.hidePageLoadingMsg();
			}
		);
		$('#ddlCategory').detectChange(function() {
			$.mobile.showPageLoadingMsg();
			$('#cmdSubmit').data('cat', $(this).val());
			$('#ddlSubCategory').selectmenu('disable');
			FC.getData('GetSubCategories',
				{
					CategoryID: JSON.stringify($(this).val())
				},
				function(result) {
					var subCat = $('#ddlSubCategory');
					subCat.empty();
					subCat.append('<option value="">All Subtype</option>');
					$.each(result.d, function() {
						subCat.append('<option value="' + this.ATDWSubCategoryID + '">' + this.Name + '</option>');
					});
					subCat.selectmenu('refresh');
					subCat.selectmenu('enable');
					$.mobile.hidePageLoadingMsg();
				}
			);
			FC.getData('GetDestinations',
				{
					CategoryID: JSON.stringify($(this).val()),
					SubCategoryID: JSON.stringify('')
				},
				function(result) {
					var des = $('#ddlDestination');
					des.empty();
					des.append('<option value="0">All Locations</option>');
					$.each(result.d, function() {
						des.append('<option value="' + this.ATDWDestinationID + '">' + this.Name + '</option>');
					});
					des.selectmenu('refresh');
					$.mobile.hidePageLoadingMsg();
				}
			);
		});
		$('#ddlSubCategory').detectChange(function() {
			$.mobile.showPageLoadingMsg();
			$('#cmdSubmit').data('sub-cat', $(this).val());
			$('#ddlDestination').selectmenu('disable');
			FC.getData('GetDestinations',
				{
					CategoryID: JSON.stringify($('#ddlCategory').val()),
					SubCategoryID: JSON.stringify($(this).val())
				},
				function(result) {
					var des = $('#ddlDestination');
					des.empty();
					des.append('<option value="0">All Locations</option>');
					$.each(result.d, function() {
						des.append('<option value="' + this.ATDWDestinationID + '">' + this.Name + '</option>');
					});
					des.selectmenu('refresh');
					des.selectmenu('enable');
					$.mobile.hidePageLoadingMsg();
				}
			);
		});
		$('#ddlDestination').detectChange(function() {
			$('#cmdSubmit').data('des', $(this).val());
		});
	});
	$('#trailReward').live('pageshow', function(event, ui) {
		$(this).find('[data-role="content"] #map_reward').hide();
		var over_height = $(this).find('.rewardOverlay').height();
		var the_height = $(window).height() - $(this).find('[data-role="header"]').height() - $(this).find('[data-role="footer"]').height() - over_height;
		$(this).find('[data-role="content"] #map_reward').height(the_height);
		$(this).find('[data-role="content"] #map_reward').css('margin-top', over_height + 'px');
		$(this).find('[data-role="content"] #map_reward').show();

		var lat = $('#map_reward').data('reward-lat');
		var lng = $('#map_reward').data('reward-lng');
		
        if (FC.data_on) {
            executeMap(function() { loadMapReward(lat,lng); });
        }
	});
	$('#trailDealMap').live('pageshow', function(event, ui) {
		$(this).find('[data-role="content"] #map_deals').hide();
		var the_footer_height = $(this).find('[data-role="footer"]').length > 0 ? $(this).find('[data-role="footer"]').height() : 0;
		var the_height = $(window).height() - $(this).find('[data-role="header"]').height() - the_footer_height;
		$(this).find('[data-role="content"] #map_deals').height(the_height);
		$(this).find('[data-role="content"] #map_deals').show();

		// Get ids
		var trailId = $('#map_deals').data('trail-id');
		var catId = $('#map_deals').data('cat-id');

		executeMap(function() { loadMapDeals(trailId, catId); });
	});	
	$('#comments').live('pageshow', function(event, ui) {
		var the_height = $(window).height() - $(this).find('[data-role="header"]').height();
		$(this).find('[data-role="content"] iframe').height(the_height);
	});
	$('#homePage, #discoveryTrailsCategory, #discoveryTrails').live('pageshow', function(event, ui) {
		$('div.poi').remove();
		$('.trailPage').empty();
		$('#loadAllImages').remove();
	});
	$('div:not([class*="poi"], #homePage)').live('pagehide', function() {
		var page = $(this);
		var on_timeout = function() {
			page.empty();
		};
		var t = setTimeout(on_timeout, 3000); // 3secs
		page.bind('pagebeforeshow', {}, function() {
			clearTimeout(t);
		});
	});
	$('#outOfRangeDialog, #noNetworkDialog').live('pageshow', function(event, ui) {
		$('a[data-icon=delete]').hide();
	});
	$('#test-button').live('click', function(event) {
		//$.mobile.changePage('#loadAllImages');
		//$('#loadAllImages').remove();
		//store.set('last_update', (new Date().getTime() - (24 * 1000 * 60 * 2)));
	});
	
	if (navigator.userAgent.indexOf("Android") != -1){
		// Override back button for android
		navigator.app.overrideBackbutton(true);
		document.addEventListener("backbutton", backKeyDown, true);
	}
}

// History
function pushHistoryPage(url, data) {
	if (!FC.utils.historyPageList) {
		FC.utils.historyPageList = [];
		FC.utils.historyPageDataList = [];
	}
	
	FC.utils.historyPageList.push(url);
	FC.utils.historyPageDataList.push(data.data);
	
	if (FC.utils.historyPageList.length >= FC.utils.pageCacheSize){
		FC.utils.historyPageList.shift();
		FC.utils.historyPageDataList.shift();
	}
	//console.log(FC.utils.historyPageList);
}
function popHistoryPage(currentUrl, data) {
	var url ="";
	
	if (FC.utils.historyPageList.length > 0){
		url = FC.utils.historyPageList.pop();
		data.data = FC.utils.historyPageDataList.pop();
		
		while (currentUrl == url && currentUrl != "#homePage") {
			url = FC.utils.historyPageList.pop();
			data.data = FC.utils.historyPageDataList.pop();
		}
	} else {
		url = "#homePage";
		data.data = {};
	}
	
	return url
}


function outOfRangeDialog() {
	var html = ich.t_out_of_range_dialog();
	$(html).trigger('create');
	$('#outOfRangeDialog').replaceWith(html).page();
	$('#lnkOutOfDialog').click();
}

function noNetworkDialog() {
	var html = ich.t_no_network_dialog();
	$(html).trigger('create');
	$('#noNetworkDialog').replaceWith(html).page();
	$('#lnkNoNetworkDialog').click();
}

// Detect Android Devices
if (navigator.userAgent.indexOf("Android") != -1)
{
    $("a").attr("data-transition", "none");
}

// Enable touchOverflow
$(document).bind("mobileinit", function(){
  //$.support.touchOverflow = true; // For Debugging
  //$.mobile.touchOverflowEnabled = true;
  $.mobile.transitionFallbacks.slideout = "none";
  $.mobile.transitionFallbacks.fade = "none";
});
 
 /*
 * Load map for rewards
 */
 function loadMapReward(lat, lng) {
	// Load map
	var latLng = new google.maps.LatLng(lat, lng);
	var options = { zoom: 14, mapTypeId: google.maps.MapTypeId.ROADMAP, center: latLng, streetViewControl: false };
	map = new google.maps.Map(document.getElementById('map_reward'), options);

	// Create marker image
	var mImg = new google.maps.MarkerImage('images/map-icons.png',
		new google.maps.Size(20, 34),
		new google.maps.Point(110,0),
		new google.maps.Point(10, 34));

	// Create marker shadow
	var mSha = new google.maps.MarkerImage('images/map-icons.png',
		new google.maps.Size(38, 34),
		new google.maps.Point(132,0),
		new google.maps.Point(6, 32));

	// Create marker
	var marker = new google.maps.Marker({
		position: latLng,
		map: map,
		shadow: mSha,
		icon: mImg,
		title:"Reward"
	});
}

 /*
 * Load map for deals
 */
function loadMapDeals(trailId, catId) {
	var deals = [];
	
	// Load map
	var bounds = new google.maps.LatLngBounds();
	var options = { zoom: 3, mapTypeId: google.maps.MapTypeId.ROADMAP, center: new google.maps.LatLng(-23.88583769986199, 133.9453125), streetViewControl: false };
	map = new google.maps.Map(document.getElementById('map_deals'), options);

	// Add deals
	if (typeof trailId === "undefined") {
		$.each(FC.data.trails, function(i, trail) {
			$.each(trail.Deals, function(i, deal) {
				if (deal.DealCategoryID == catId || typeof catId === "undefined") {
					var simDeals = getObjects(deals, 'Name', deal.Name);
					var simDeal = simDeals.length > 0 ? simDeals[0] : undefined;
					
					if (typeof simDeal === "undefined") {
						deals.push(deal);
					} else if (deal.Latitude != simDeal.Latitude &&
							   deal.Longitude != simDeal.Longitude &&
							   deal.NameOfVendor != simDeal.NameOfVendor &&
							   deal.PhoneNumberOfVendor != simDeal.PhoneNumberOfVendor) {
						deals.push(deal);
					}
				}
			});
		})	
	} else {
		var trail = FC.utils.getTrailById(trailId);
		deals = typeof catId === "undefined" ? trail.Deals : getObjects(trail.Deals, 'DealCategoryID', catId);
	}

	// Add deal marker
	$.each(deals, function(index, value) {
		loadMarker(value, trailId);
		bounds.extend(new google.maps.LatLng(value.Latitude, value.Longitude));
	});	
		
	// Sets map bounds
	map.fitBounds(bounds); 
}

/*
 * Load map for a single trial
 */
function loadMapTrail(data) {
		
    // Load generic map of aus
    var options = { zoom: 3, mapTypeId: google.maps.MapTypeId.ROADMAP, center: new google.maps.LatLng(-23.88583769986199, 133.9453125), streetViewControl: false };
    map = new google.maps.Map(document.getElementById("map_trail"), options);
	google.maps.event.addListener(map, 'bounds_changed', function() {
		$('.mapFooterButtons li a').removeClass('ui-disabled');
	});

    // Add trail path
    if (data.TrailPath != "") {
        loadPath(data.TrailPath);
    }

    // Add trail POIs
    $.each(data.POIs, function(index, value) {
        loadMarker(value, data.TrailID);
    });
}

/*
 * Load path
 */
function loadPath(path) {
    var points = [];
    var bounds = new google.maps.LatLngBounds();

    // Create points
    $.each(path.split(";"), function(index, value) {
        points.push(new google.maps.LatLng(value.split(",")[0], value.split(",")[1]));
        bounds.extend(points[index]);
    });

    // Create trail polyline
    var trail = new google.maps.Polyline({
        path: points,
        strokeColor: '#bb143f',
        strokeOpacity: 0.8,
        strokeWeight: 4
    });

    // Insert polyline into map and sets map bounds
    trail.setMap(map);
    map.fitBounds(bounds);
}

/*
 * Load marker
 */
function loadMarker(data, trailID) {
	var html, mImg, mSha, marker, sprite_x;

    // Popup content
	if (data.PointOfInterestID) {
		html = '<div class="picCaption">' +
				'<span class="ncircle">' + data.SortOrder + '</span>' +
				data.Name + '</div>' +
				'<div class="trailFrame"><div class="picContainer">' +
				'<img src="' + data.ImageUrl + '" width="100%" alt="" />' +
				'</div></div>' +
				'<p>' + data.Description + '</p>' +
				'<div class="btn"><a href="#exploreTrail' + trailID + '-' + data.PointOfInterestID +
				'" data-role="button" data-inline="true" data-theme="fcrc" class="istays">View</a></div>';
	} else if (data.DealID) {
		html = '<div class="picCaption">' + data.Name + '</div>' +
				'<div class="trailFrame"><div class="picContainer">' +
				'<img src="' + data.ImageUrl + '" width="100%" alt="" />' +
				'</div></div>' +
				'<p>' + data.ShortDescription + '</p>' +
				'<div class="btn"><a href="javascript:showDealProduct(' + trailID + ', ' + data.DealID +
				');" data-role="button" data-inline="true" data-theme="fcrc" class="istays">View</a></div>';
	}else if (data.ATDWProductID) {
		html = '<div class="picCaption">' + data.Name + '</div>' +
				'<div class="trailFrame"><div class="picContainer">' +
				'<img src="' + data.ImageUrl + '" width="100%" alt="" />' +
				'</div></div>' +
				'<p>' + data.ShortDescription + '</p>' +
				'<div class="btn"><a href="javascript:showAtdwProduct(' + trailID + ', ' + data.ATDWProductID +
				');" data-role="button" data-inline="true" data-theme="fcrc" class="istays">View</a></div>';
	}

	// Set sprite location
	if (data.DealID) {
		switch (data.DealCategoryID) {
			case 1: sprite_x = 22; break;
			case 2: sprite_x = 44; break;
			case 3: sprite_x = 66; break;
			case 4: sprite_x = 88; break;
			default: sprite_x = 0; break;
		}
	} else if (data.ATDWProductID) {
		switch (data.Category) {
			case 'STAYS': sprite_x = 22; break;
			case 'EXPERIENCES': sprite_x = 44; break;
			case 'DINING': sprite_x = 66; break;
			case 'TRANSPORT': sprite_x = 88; break;
			default: sprite_x = 0; break;
		}
	} else {
		sprite_x = 0;
	}

	// Create marker image
	mImg = new google.maps.MarkerImage('images/map-icons.png',
		new google.maps.Size(20, 34),
		new google.maps.Point(sprite_x,0),
		new google.maps.Point(10, 34));

	// Create marker shadow
	mSha = new google.maps.MarkerImage('images/map-icons.png',
		new google.maps.Size(38, 34),
		new google.maps.Point(132,0),
		new google.maps.Point(6, 32));

    // Cretae marker
	if (data.PointOfInterestID) {
		marker = new poiMarker({
			position: new google.maps.LatLng(data.Latitude, data.Longitude),
			map: map,
			shadow: mSha,
			icon: mImg,
			html: data.SortOrder,
			title: data.Name
		});
	} else {
		marker = new google.maps.Marker({
			position: new google.maps.LatLng(data.Latitude, data.Longitude),
			map: map,
			shadow: mSha,
			icon: mImg,
			title: data.Name
		});
	}

    // Pop info on click
    google.maps.event.addListener(marker, 'click', function() {
		showHideControls(false);
		if (infoBox) infoBox.setMap(null);
		infoBox = new InfoBox({
			map: map,
            html: html
		});
    });

    // Add marker to list
    if (data.ATDWProductID) markers.push(marker);
}

/*
 * Gets products in map area for a given category
 */
function getProductsInArea(cat) {
    // Get map edges
    var area = map.getBounds().toUrlValue().split(",");
	FC.getData('GetProductsInArea',
		{
			SWLat: JSON.stringify(area[0]),
            SWLng: JSON.stringify(area[1]),
            NELat: JSON.stringify(area[2]),
            NELng: JSON.stringify(area[3]),
            Category: JSON.stringify(cat)
		},
        function(result) {

            // Removes markers in list from map and clear list
            for (i = 0; i < markers.length; i++) markers[i].setMap(null);
            markers = [];

			// Set product search results
			FC.atdwData = result.d;

            // Load markers from results
            for (i = 0; i < result.d.length; i++)
                loadMarker(result.d[i]);
        }
    );
}

/*
 * Show/hides map controls
 */
function showHideControls(show) {
	map.setOptions({mapTypeControl: show});
}

/*
 * Shows deal product
 */
function showDealProduct(trailId, dealId) {
	if (infoBox) infoBox.setMap(null);
	// Get deal
	var deal = getObjects(FC.data.trails, 'DealID', dealId)[0];

	// Build data
	var data = {
		Name: deal.Name,
		Category: deal.DealCategoryName,
		CategoryID: deal.DealCategoryID,
		TrailID: trailId,
		Description: deal.Description + "<br /><br /><b>Address:</b><br />" + deal.AddressOfVendor,
		ImageUrl: deal.ImageUrl,
		Phone: deal.PhoneNumberOfVendor
	};

	showProduct(data);
}

/*
 * Shows ATDW product
 */
function showAtdwProduct(trailId, atdwId) {
	if (infoBox) infoBox.setMap(null);
	var atdw = getObjects(FC.atdwData, 'ATDWProductID', atdwId);
	if (atdw.length > 0) {
		atdw[0].TrailID = trailId;
		showProduct(atdw[0]);
	}
}

/*
 * Show product page
 */
function showProduct(productData) {
	pushHistoryPage('#productDetail', {data:{}});
	var html = ich.t_product_detail(productData);
	$(html).trigger('create');
	$('#productDetail').replaceWith(html)
	.live('pageshow',function(event, ui){
		var pFrame = $(this).find('[data-role="content"] .picContainer');
		var pImg = $(this).find('[data-role="content"] .picContainer img');
		if (pImg.hasClass('landscape')) {
			pImg.width(pFrame.width())
			pFrame.height(pFrame.width() / 1.6)
		}
		else if (pImg.hasClass('portrait')) {
			pImg.height(210)
		}
	});
	$.mobile.changePage('#productDetail');
}

/*
 * Checks for map script and executes callback function
 */
 function executeMap(callback) {
	if ($("#gMapScript").length == 0) {
		window._mapScriptCallback = function(){ 
			loadGoogleOverlays();
			callback(); 
		};
		loadMapScript();
	} else {
		callback();
	}
 }
 
/*
 * Load map script
 */
 function loadMapScript() {
	var script = document.createElement("script");
	script.id = "gMapScript";
	script.type = "text/javascript";
	script.src = "http://maps.googleapis.com/maps/api/js?key=AIzaSyDZvZANVxgAZJlmPrPTxjVGtk-nPGAWpWs&sensor=false&callback=_mapScriptCallback";
	document.body.appendChild(script);
 }
 
/*
 * Load custom overlays
 */
function loadGoogleOverlays() {
	// Custom info window
	InfoBox = function(opts) {
		google.maps.OverlayView.call(this);
		this.map_ = opts.map;
		this.html_ = opts.html;
		this.w_ = 290;
		this.h_ = 355;
		var me = this;
		this.setMap(this.map_);
	};

	InfoBox.prototype = new google.maps.OverlayView();

	InfoBox.prototype.remove = function() {
		if (this.div_) {
			this.div_.parentNode.removeChild(this.div_);
			this.div_ = null;
		}
	};

	InfoBox.prototype.draw = function() {
		this.createElement();
		if (!this.div_) return;
		var ne = this.getProjection().fromLatLngToDivPixel(this.map_.getBounds().getNorthEast());
		var sw = this.getProjection().fromLatLngToDivPixel(this.map_.getBounds().getSouthWest());
		this.div_.style.left = (sw.x + ((ne.x - sw.x) > this.w_ ? ((ne.x - sw.x) - this.w_) / 2 : 0)) + "px";
		this.div_.style.top = ne.y + "px";
		this.div_.style.display = 'block';
	};

	InfoBox.prototype.createElement = function() {
		var panes = this.getPanes();
		var div = this.div_;
		if (!div) {
			div = this.div_ = document.createElement("div");
			div.className = "mapOverlay";
			var contentDiv = document.createElement("div");
			contentDiv.innerHTML = this.html_;
			var close = document.createElement("span");
			close.className="closeBtn";
			close.innerHTML = "&#160;";
			function removeInfoBox(ib) {
				return function() {
					showHideControls(true);
					ib.setMap(null);
				};
			}
			google.maps.event.addDomListener(close, 'click', removeInfoBox(this));
			div.appendChild(close);
			div.appendChild(contentDiv);
			div.style.display = 'none';
			panes.floatPane.appendChild(div);
			$(div).trigger('create');
		} else if (div.parentNode != panes.floatPane) {
			div.parentNode.removeChild(div);
			panes.floatPane.appendChild(div);
		} else {

		}
	}

	// POI marker overlay
	poiMarker = function(opts) {
		google.maps.OverlayView.call(this);
		this.latlng_ = opts.position;
		this.map_ = opts.map;
		this.html_ = opts.html;
		this.shadow_ = opts.shadow;
		this.icon_ = opts.icon;
		this.title_ = opts.title;
		this.setMap(this.map_);
		this.div_ = document.createElement('div');
		this.divHtml_ = document.createElement('div');
		this.divShadow_ = document.createElement('div');
	};

	poiMarker.prototype = new google.maps.OverlayView;

	poiMarker.prototype.draw = function() {
		var pp = this.getProjection().fromLatLngToDivPixel(this.latlng_);

		this.div_.style.width = this.icon_.size.width + "px";
		this.div_.style.height = this.icon_.size.height + "px";
		this.div_.style.left = (pp.x - this.icon_.anchor.x) + "px";
		this.div_.style.top = (pp.y - this.icon_.anchor.y) + "px";
		this.div_.style.position = "absolute";
		this.div_.style.display = "block";
		this.div_.style.cursor = "pointer";
		this.div_.style.background = "url('" + this.icon_.url + "') no-repeat scroll -" + this.icon_.origin.x + "px -" + this.icon_.origin.y + "px transparent";

		this.divHtml_.style.textAlign = "center";
		this.divHtml_.style.width = "20px";
		this.divHtml_.style.font = "normal 10px/10px Arial,Helvetica,Serif";
		this.divHtml_.style.color = "#fff";
		this.divHtml_.style.display = "block";
		this.divHtml_.style.padding = "3px 0 0 0";
		this.divHtml_.innerHTML = this.html_;

		this.divShadow_.style.width = this.shadow_.size.width + "px";
		this.divShadow_.style.height = this.shadow_.size.height + "px";
		this.divShadow_.style.left = (pp.x - this.shadow_.anchor.x) + "px";
		this.divShadow_.style.top = (pp.y - this.shadow_.anchor.y) + "px";
		this.divShadow_.style.position = "absolute";
		this.divShadow_.style.display = "block";
		this.divShadow_.style.background = "url('" + this.shadow_.url + "') no-repeat scroll -" + this.shadow_.origin.x + "px -" + this.shadow_.origin.y + "px transparent";
	};

	poiMarker.prototype.onAdd = function() {
		this.getPanes().overlayShadow.appendChild(this.divShadow_);
		this.getPanes().overlayMouseTarget.appendChild(this.div_);
		this.div_.appendChild(this.divHtml_);
		var me = this;
		this.listeners_ = [
		   google.maps.event.addListener(this, 'position_changed', function() { me.draw(); }),
		   google.maps.event.addListener(this, 'text_changed', function() { me.draw(); }),
		   google.maps.event.addDomListener(this.div_, 'click', function() {
			   google.maps.event.trigger(me, 'click');
		   })
		];
	};

	poiMarker.prototype.onRemove = function() {
		this.div_.removeChild(this.divHtml_);
		this.div_.parentNode.removeChild(this.div_);
		this.divShadow_.parentNode.removeChild(this.divShadow_);
		this.divShadow_ = null;
		this.div_ = null;
		this.divHtml_ = null;
		
		for (var i = 0, I = this.listeners_.length; i < I; ++i) {
			google.maps.event.removeListener(this.listeners_[i]);
		}
	};
}

// Find json object
function getObjects(obj, key, val) {
    var objects = [];
    for (var i in obj) {
        if (!obj.hasOwnProperty(i)) continue;
        if (typeof obj[i] == 'object') {
            objects = objects.concat(getObjects(obj[i], key, val));
        } else if (i == key && obj[key] == val) {
            objects.push(obj);
        }
    }
    return objects;
}

$.fn.detectChange = function(event) {
    return this.each(function() {
        var el = this;
        el.sindex = el.selectedIndex;
        var int;
        function fireChange() {
            if (el.selectedIndex != el.sindex) {
                el.sindex = el.selectedIndex;
                event.apply(el);
            }
        }
        $(el).focus(function() {
            int = setInterval(fireChange, 100);
        }).blur(function() { window.clearInterval(int); })
        .change(fireChange); //also wire the change event in case the interval technique isn't supported (chrome on android)
    });
};

(function(c,n){var k="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==";c.fn.imagesLoaded=function(l){function m(){var b=c(h),a=c(g);d&&(g.length?d.reject(e,b,a):d.resolve(e));c.isFunction(l)&&l.call(f,e,b,a)}function i(b,a){b.src===k||-1!==c.inArray(b,j)||(j.push(b),a?g.push(b):h.push(b),c.data(b,"imagesLoaded",{isBroken:a,src:b.src}),o&&d.notifyWith(c(b),[a,e,c(h),c(g)]),e.length===j.length&&(setTimeout(m),e.unbind(".imagesLoaded")))}var f=this,d=c.isFunction(c.Deferred)?c.Deferred():
0,o=c.isFunction(d.notify),e=f.find("img").add(f.filter("img")),j=[],h=[],g=[];e.length?e.bind("load.imagesLoaded error.imagesLoaded",function(b){i(b.target,"error"===b.type)}).each(function(b,a){var e=a.src,d=c.data(a,"imagesLoaded");if(d&&d.src===e)i(a,d.isBroken);else if(a.complete&&a.naturalWidth!==n)i(a,0===a.naturalWidth||0===a.naturalHeight);else if(a.readyState||a.complete)a.src=k,a.src=e}):m();return d?d.promise(f):f}})(jQuery);


eval(function(p,a,c,k,e,r){e=function(c){return(c<a?'':e(parseInt(c/a)))+((c=c%a)>35?String.fromCharCode(c+29):c.toString(36))};if(!''.replace(/^/,String)){while(c--)r[e(c)]=k[c]||e(c);k=[function(e){return r[e]}];e=function(){return'\\w+'};c=1};while(c--)if(k[c])p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c]);return p}('(5($){5 L(a){a.3x.1F[a.3r]=3o(a.3n,10)+a.3l}6 j=5(a){3k({3i:"1E.1d.3d 3c 3b",38:a})};6 k=5(){7(/*@2S!@*/19&&(2Q 2N.1w.1F.2K==="2F"))};6 l={2C:[0,4,4],2B:[1u,4,4],2y:[1s,1s,2v],2u:[0,0,0],2t:[0,0,4],2s:[1q,1p,1p],2o:[0,4,4],2n:[0,0,B],2m:[0,B,B],2l:[1b,1b,1b],2j:[0,1c,0],2i:[2h,2g,1o],2e:[B,0,B],2d:[2c,1o,2b],2a:[4,1n,0],27:[24,21,20],1Z:[B,0,0],1Y:[1R,1P,1O],1N:[3s,0,Y],2f:[4,0,4],1Q:[4,2z,0],2E:[0,t,0],22:[26,0,28],29:[1u,1z,1n],2p:[2r,2w,1z],2x:[1h,4,4],2A:[1i,2G,1i],2L:[Y,Y,Y],2M:[4,2O,2W],33:[4,4,1h],34:[0,4,0],35:[4,0,4],36:[t,0,0],39:[0,0,t],3e:[t,t,0],3j:[4,1q,0],3m:[4,W,3t],1H:[t,0,t],1I:[t,0,t],1J:[4,0,0],1K:[W,W,W],1L:[4,4,4],1M:[4,4,0],9:[4,4,4]};6 m=5(a){U(a&&a.1j("#")==-1&&a.1j("(")==-1){7"1S("+l[a].1T()+")"}1U{7 a}};$.1V($.1W.1X,{w:L,x:L,u:L,v:L});$.1k.23=5(){7 V.1l(5(){6 a=$(V);a.1d(a.F(\'1m\'))})};$.1k.1d=5(i){7 V.1l(5(){6 c=$(V),3,$8,C,11,1f,1e=k();U(c.F(\'S\')){7 19}6 e={R:(5(a){2k(a){X"T":7"Z";X"Z":7"T";X"15":7"14";X"14":7"15";2q:7"Z"}})(i.R),y:m(i.A)||"#H",A:m(i.y)||c.z("12-A"),1r:c.N(),D:i.D||1t,Q:i.Q||5(){},K:i.K||5(){},P:i.P||5(){}};c.F(\'1m\',e).F(\'S\',1).F(\'2D\',e);3={s:c.s(),p:c.p(),y:m(i.y)||c.z("12-A"),1v:c.z("2H-2I")||"2J",R:i.R||"T",E:m(i.A)||"#H",D:i.D||1t,o:c.1x().o,n:c.1x().n,1y:i.1r||2P,9:"9",18:i.18||19,Q:i.Q||5(){},K:i.K||5(){},P:i.P||5(){}};1e&&(3.9="#2R");$8=c.z("16","2T").8(2U).F(\'S\',1).2V("1w").N("").z({16:"1g",2X:"2Y",n:3.n,o:3.o,2Z:0,30:31,"-32-1A-1B":"G G G #1C","-37-1A-1B":"G G G #1C"});6 f=5(){7{1D:3.9,1v:0,3a:0,w:0,u:0,v:0,x:0,M:3.9,O:3.9,I:3.9,J:3.9,12:"3f",3g:\'3h\',p:0,s:0}};6 g=5(){6 a=(3.p/1c)*25;6 b=f();b.s=3.s;7{"q":b,"1a":{w:0,u:a,v:a,x:0,M:\'#H\',O:\'#H\',o:(3.o+(3.p/2)),n:(3.n-a)},"r":{x:0,w:0,u:0,v:0,M:3.9,O:3.9,o:3.o,n:3.n}}};6 h=5(){6 a=(3.p/1c)*25;6 b=f();b.p=3.p;7{"q":b,"1a":{w:a,u:0,v:0,x:a,I:\'#H\',J:\'#H\',o:3.o-a,n:3.n+(3.s/2)},"r":{w:0,u:0,v:0,x:0,I:3.9,J:3.9,o:3.o,n:3.n}}};11={"T":5(){6 d=g();d.q.w=3.p;d.q.M=3.y;d.r.x=3.p;d.r.O=3.E;7 d},"Z":5(){6 d=g();d.q.x=3.p;d.q.O=3.y;d.r.w=3.p;d.r.M=3.E;7 d},"15":5(){6 d=h();d.q.u=3.s;d.q.I=3.y;d.r.v=3.s;d.r.J=3.E;7 d},"14":5(){6 d=h();d.q.v=3.s;d.q.J=3.y;d.r.u=3.s;d.r.I=3.E;7 d}};C=11[3.R]();1e&&(C.q.3p="3q(A="+3.9+")");1f=5(){6 a=3.1y;7 a&&a.1E?a.N():a};$8.17(5(){3.Q($8,c);$8.N(\'\').z(C.q);$8.13()});$8.1G(C.1a,3.D);$8.17(5(){3.P($8,c);$8.13()});$8.1G(C.r,3.D);$8.17(5(){U(!3.18){c.z({1D:3.E})}c.z({16:"1g"});6 a=1f();U(a){c.N(a)}$8.3u();3.K($8,c);c.3v(\'S\');$8.13()})})}})(3w);',62,220,'|||flipObj|255|function|var|return|clone|transparent||||||||||||||left|top|height|start|second|width|128|borderLeftWidth|borderRightWidth|borderTopWidth|borderBottomWidth|bgColor|css|color|139|dirOption|speed|toColor|data|0px|999|borderLeftColor|borderRightColor|onEnd|int_prop|borderTopColor|html|borderBottomColor|onAnimation|onBefore|direction|flipLock|tb|if|this|192|case|211|bt||dirOptions|background|dequeue|rl|lr|visibility|queue|dontChangeColor|false|first|169|100|flip|ie6|newContent|visible|224|144|indexOf|fn|each|flipRevertedSettings|140|107|42|165|content|245|500|240|fontSize|body|offset|target|230|box|shadow|000|backgroundColor|jquery|style|animate|purple|violet|red|silver|white|yellow|darkviolet|122|150|gold|233|rgb|toString|else|extend|fx|step|darksalmon|darkred|204|50|indigo|revertFlip|153||75|darkorchid|130|khaki|darkorange|47|85|darkolivegreen|darkmagenta|fuchsia|183|189|darkkhaki|darkgreen|switch|darkgrey|darkcyan|darkblue|cyan|lightblue|default|173|brown|blue|black|220|216|lightcyan|beige|215|lightgreen|azure|aqua|flipSettings|green|undefined|238|font|size|12px|maxHeight|lightgrey|lightpink|document|182|null|typeof|123456|cc_on|hidden|true|appendTo|193|position|absolute|margin|zIndex|9999|webkit|lightyellow|lime|magenta|maroon|moz|message|navy|lineHeight|error|plugin|js|olive|none|borderStyle|solid|name|orange|throw|unit|pink|now|parseInt|filter|chroma|prop|148|203|remove|removeData|jQuery|elem'.split('|'),0,{}))


