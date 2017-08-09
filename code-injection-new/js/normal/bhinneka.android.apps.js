

	$(document).delegate('#productDetailDetailPage', 'pageinit', function(){
		$("#productDetailDetailText").html(App.getPageParam('productDetailSpec'));
		});
    


	$(document).delegate('#productDetailInstallmentPage', 'pageinit', function(){
		$("#productDetailInstallmentPercentage").html(App.getPageParam('mob-installment-percentage'));
		var cicilanIDs = App.getPageParam('mob-installment-ids');
		var percentage = App.getPageParam('mob-installment-percentage').split('%')[0];
		var month = App.getPageParam("mob-installment-tenor");
		if (month > 1)
			monthstr = month + " months ";
		else monthstr =  "";
		$("#productDetailInstallmentPercentage").html("<center>" + monthstr + percentage + "%" + " Installment" + "</center>");
		App.doJsonp(Config.ciURL + "productController/loadMobileInstallmentImages", "cicilanIDs=" + cicilanIDs + "&percentage=" + percentage + "&tenor=" + month, function(result){
			var str = "";
			$.each(result, function(key, record){
				str += "<div class='whiteWrapper noPadding'>";
				str += "<img class='productDetailInstallmentImage' id='productDetailInstallment" + record.vPromoID + "' src='" + Config.webURL + record.ImageURL + "' /><br />";
				str += "</div>";
				loadImage($("#productDetailInstallment" + record.vPromoID), Config.webURL + record.ImageURL)
				});
			$("#productDetailCicilanText").html(str);
			});
		});
    


    $(document).delegate('#morePreferencesPage', 'pageinit', function(){
		$("#pushToggle").find('.ui-select').find("span").remove();
		$("#pushToggle").find(".ui-select").removeClass("ui-select");
		if (MobilePush.getStatus() == true){
			$("#pushToggleOn").attr('selected', 'selected');
			}
		else $("#pushToggleOff").attr('selected', 'selected');
		$("#pushToggleComboBox").change(function(event) {
            if (event.handled == true) return false;
			event.handled = true;
			var pushVal = $(this).val();
			if (pushVal == "on") {
				AndroidPreferences.set("pushStatus", "true"
					, function(){
						MobilePush.create();
					}, function(){
					
					});
			}
			else if (pushVal == "off") {
				AndroidPreferences.set("pushStatus", "false"
					, function(){
						MobilePush.destroy();
						}
					, function(){
					
					});
				MobilePush.destroy();
			}
			return false;
        });
	});
    


	$(document).delegate('#memberLogoutPage', 'pageinit', function(){
		App.onClick($("#logoutConfirmation"), function($self){
			Member.loginStatus(function(result){
				if (result.result == true)
					var deviceID = "-";
					var devicePlatform = "-";
					if (typeof (device) != 'undefined' && device != null){
						if (device.uuid) deviceID = device.uuid;
						if (device.platform) devicePlatform = device.platform;
						}
					Member.logout(deviceID, devicePlatform, function(){
						AndroidPreferences.set("memberSignature", ""
							, function(){
								App.changePage('memberLogin.html');						
								}
							, function(){
								});
					});
				})
		});
		App.onClick($("#cancelLogout"), function($self){
			App.changePage("memberWelcome.html");
		});
	});
	


	var start = 0, end = 0;
	showListReview(start, end);
	start = end;
	
	function showListReview(idxStart, idxEnd){
		BPost.loadList("ListReviews", function(review){
			var str = "";
			if(idxStart + Config.counter > review.length)
			{
				$("#btnNextListReview").hide();
			}
			else
			{
				$("#btnNextListReview").show();
			}
			if(idxStart == 0)
			{
				$("#btnPreviousListReview").hide();
			}
			else
			{
				$("#btnPreviousListReview").show();
			}
			
			if(idxEnd > review.length)
			{
				idxEnd = review.length;
			}
			else
			{
				idxEnd = idxStart + Config.counter;
			}
			for(i = idxStart; i < idxEnd; i++)
			{
				str += "<li class='listItemReview listItem clickable listItemBPost bordered'"
				   + "id='"+ review[i].id + "'"
				   + "mob-reviewID='" + review[i].id + "'"
				   + ">"
				   + "<b>" + review[i].title + "</b>"
				   + "<div class='categoryDate'>"
				   + review[i].creatorDateTime 
				   + "</div>"
				   + "</li>";
			}
			$("#reviewListUL").remove("li").html(str);
		});
	}
	



    $(document).delegate('#pushNotifDetailPage', 'pageinit', function(){
		$btnContinue = $("#btnContinue");
		$notifMessage = $("#notifMessage");
		try {
			pushMessage = App.getPageParam("pushMessage");
			$notifMessage.html(pushMessage);
			$btnContinue.attr('href', App.getPageParam("pushPageName"));
			}
		catch (ex){
			$btnContinue.attr('href', 'index.html');
			$notifMessage.html("Currently there is no notification.");
			}
		});
    


	$(document).delegate('#subSubCategoryPage', 'pageinit', function(){
		result = $.parseJSON(App.getPageParam('mob-subSubCategory'));
		var str = "";
		$("#subSubCategoryName").html(App.getPageParam('submenuname'));
		$.each(result,function(idx, record){
			str += "<li class='subSubCategoryListItem listItem clickable' mob-includeCatID='" 
					+ record.vCatID + "'>"
					+ record.vName
					+ "</li>";
			});
		$("#subSubCategoryListUL").remove("li").html(str);
	});		
    


		$(document).delegate("#freeShippingPage", "pageinit", function(){
			App.doJsonp(Config.ciURL + "appController/freeShipping", "", function(result){
				console.log(result);
				$("#freeShippingTnC").html(result.TnC);
				cities = JSON.parse(result.cities);
				$("#freeShippingCities").html("<div id='freeShippingCitiesHeader'>Saat ini Free Shipping berlaku ke kota-kota berikut:</div>" + cities[0].cities);
				});
			});
    


	$(document).delegate('#memberTransactionHistoryPage', 'pageinit', function(){
		Member.getTransactionHistory(function(result){
			var arr = result, record;
			var countTransaction = result.length;
			var str = "";
			for (i = 0; i < countTransaction; i++){
				record = arr[i];
				
				str += "<div class='whiteWrapper borderBottom'>";
				str += 	   "<div class='memberRow'>";
				str +=			"<div class='memberRowField'>KodeTrx</div>:";
				str +=			"<div class='memberRowValue'>" + record.kodeTrx + "</div>";
				str += 	   "</div>";
				str += 	   "<div class='memberRow'>";
				str +=			"<div class='memberRowField'>OrderDate</div>:";
				str +=			"<div class='memberRowValue'>" + record.orderDate + "</div>";
				str += 	   "</div>";
				str += 	   "<div class='memberRow'>";
				str +=			"<div class='memberRowField'>Method</div>:";
				str +=			"<div class='memberRowValue'>" + record.paymentMethodName + "</div>";
				str += 	   "</div>";
				str += 	   "<div class='memberRow'>";
				str +=			"<div class='memberRowField'>Amount</div>:";
				str +=			"<div class='memberRowValue'>" + "Rp. " + App.numberFormat(record.totalAmountIDR) + "</div>";
				str += 	   "</div>";
				str += 	   "<div class='memberRow'>";
				str +=			"<div class='memberRowField'>Payment</div>:";
				str +=			"<div class='memberRowValue'>" + record.paymentStatus + "</div>";
				str += 	   "</div>";								
				str += 	   "<div class='memberRow'>";
				str +=			"<div class='memberRowField'>Tracking</div>:";
				str +=			"<div class='memberRowValue txtLink divViewTracking' mob-kodeTrx='" + record.kodeTrx + "'>View Tracking</div>";
				str += 	   "</div>";
				str += "</div>";
			}
			$("#userTransactionHistory").html(str);
		});
	});		
	


    $(document).delegate("#noConnectionPage", "pageinit", function(){
		App.onClick($("#btnRetry"), function($self){
			App.changePage(App.getPageParam('currentPageName'));
			});
		});
    


		Category.loadSubCategory(App.getPageParam('menuid'), function(categories){
			var str = "";
			categories = $.parseJSON(categories);
			$("#selectedCategory").html(App.getPageParam("menuname"));
			$.each(categories, function(idx, cat){
				str += " <li class='subCategoryListItem listItem clickable' mob-includeCatID='" + cat.vCatID+"'>" 
						+ cat.vName
					+  "</li>";
				});
			$("#subCategoryListUL").remove("li").html(str);
			});		
    


	var start = 0, end = 0;
	showListNews(start, end);
	start = end;
	
	function showListNews(idxStart, idxEnd){
		BPost.loadList("ListNews", function(news){
			var str = "";
			if(idxStart + Config.counter > news.length)
			{
				$("#btnNextListNews").hide();
			}
			else
			{
				$("#btnNextListNews").show();
			}
			if(idxStart == 0)
			{
				$("#btnPreviousListNews").hide();
			}
			else
			{
				$("#btnPreviousListNews").show();
			}
			
			if(idxEnd > news.length)
			{
				idxEnd = news.length;
			}
			else
			{
				idxEnd = idxStart + Config.counter;
			}
			for(i = idxStart; i < idxEnd; i++)
			{
				str += "<li class='listItemNews listItem clickable listItemBPost bordered'"
				   + "id='"+ news[i].newsID + "'"
				   + "mob-newsID='" + news[i].newsID + "'"
				   + ">" 
				   + "<b>" + news[i].newsTitle + "</b>"
				   + "<div class='categoryDate'>"
				   + news[i].creatorDateTime 
				   + "</div>"
				   + "</li>";
			}
			$("#newsListUL").remove("li").html(str);
		});
	}
	


$(document).delegate('#productDetailWriteReviewPage', 'pageinit', function(){
	var $userTouch = $("#userRatingTouchArea");
	var $userRating = $("#userRating");
	var $userRatingScore = $("#userRatingScore");
	var screenWidth = window.screen.width;
	var imageRatingWidth = 34;
	var userRatingWidth = $userRating.width();
	// var originX = (screenWidth - userRatingWidth) / 2;
	var originX = 15;
	var clientX, deltaX;
	var ratingScore;
	var touched = false;
	
	$userRatingScore.css('width', '0px');
	$userTouch.bind('touchstart', function(event){
		var touch = event.originalEvent.touches[0];
		deltaX = touch.clientX - originX;
		if (deltaX < 0) deltaX = 0;
		if (deltaX > userRatingWidth) deltaX = userRatingWidth;
		ratingScore = Math.round(deltaX * 5 / $userRating.width());
		$userRatingScore.css('width', (ratingScore * imageRatingWidth) + 'px');			
		});
	$userTouch.bind('touchmove', function(event){
		var touch = event.originalEvent.touches[0];
		deltaX = touch.clientX - originX;
		if (deltaX < 0) deltaX = 0;
		if (deltaX > userRatingWidth) deltaX = userRatingWidth;
		ratingScore = Math.round(deltaX * 5 / $userRating.width());
		$userRatingScore.css('width', (ratingScore * imageRatingWidth) + 'px');	
		event.preventDefault();
		});
	$userTouch.bind('touchend', function(event){
		var touch = event.originalEvent.touches[0];	
		deltaX = touch.clientX - originX;
		if (deltaX < 0) deltaX = 0;
		if (deltaX > userRatingWidth) deltaX = userRatingWidth;
		ratingScore = Math.round(deltaX * 5 / $userRating.width());
		$userRatingScore.css('width', (ratingScore * imageRatingWidth) + 'px');	
		});
	App.onClick($("#btnSubmitReview"), function($self){
		var errMessage = "";
		var ratingScore = $userRatingScore.width() / imageRatingWidth;
		// validate
		if ($.trim($("#name").val()) == "") errMessage = "Masukkan nama Anda";
		else if ($.trim($("#email").val()) == "") errMessage = "Masukkan email Anda";
		else if ($("#email").val().search(/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}/)) errMessage = "Email yang Anda masukkan tidak tepat. Mohon isi kembali email Anda dengan tepat";
		else if ($.trim($("#title").val()) == "") errMessage = "Masukkan judul review Anda";
		else if (ratingScore == 0) errMessage = "Masukkan rating Anda";
		else if ($.trim($("#content").val()) == "") errMessage = "Masukkan isi review Anda";
		
		if (errMessage == ""){
			Product.submitReview({
					partID: App.getPageParam('productDetailPartID'),
					name: $.trim($("#name").val()),
					email: $.trim($("#email").val()),
					title: $.trim($("#title").val()),
					content: $.trim($("#content").val()),
					rating: ratingScore,
					isUser: $("#isUserComboBox").val()
				}, function(result){
					if (result.message)
						navigator.notification.alert("Thank you for your review", function(){}, "Message", "OK");
					$("#productDetailWriteReviewText").find("input").val("");
					$("#content").val("");
					$userRatingScore.css('width', '0px');
				});
			}
		else {
			navigator.notification.alert(errMessage, function(){}, "Message", "OK");
			}
		});
});	



	function emptyServiceTrackingResult(){
		$("#serviceTrackingResult").empty().addClass('hidden');		
		$("#serviceTrackingNote").removeClass('hidden');
		}
	function showServiceTrackingResult(result){
		var tracking, arr = [];
		if (result == "") arr.push("<div class='wrapper'>Maaf, servis produk Anda saat ini belum terdata. Silakan cek kembali beberapa saat kemudian atau hubungi teknisi yang melayani Anda.</div>");
		else {
			tracking = result[0];
			arr.push("<span class='trackingResultLabel'>No. TechLog: </span>");
			arr.push("<span class='trackingResultValue'>" + tracking.TechLogNo + "</span>");
			arr.push("<span class='trackingResultLabel'>Tanggal Service: </span>");
			arr.push("<span class='trackingResultValue'>" + tracking.ServiceDate + "</span>");
			arr.push("<span class='trackingResultLabel'>Status: </span>");
			arr.push("<span class='trackingResultValue'>" + tracking.Status + "</span>");
			arr.push("<span class='trackingResultLabel'>Tanggal Selesai: </span>");
			arr.push("<span class='trackingResultValue'>" + tracking.CompleteDate + "</span>");
		}
		$("#serviceTrackingNote").addClass('hidden');
		$("#serviceTrackingResult").empty().html(arr.join('')).removeClass("hidden");
		}
	$(document).delegate('#moreServiceTrackingPage', 'pageinit', function(){
		emptyServiceTrackingResult();			
		});
    


$(document).delegate('#moreStoreLocation', 'pageinit', function(){
    var str = "";
	$.each(Config.storeLocation, function(idx, record){
		str += "<li class='storeLI' mob-storeidx='" + idx + "'>" 
			+ "<b>" + record.title + "</b><br />" 
			+ "<span class='storeDetail'>" 
			+ record.address + "<br />";
		$.each(record.contactNo, function(idx, no){
			str += idx + ": " + no + "<br />";
			});
		str += "</span>";
		});
	$("#storeUL").html(str);
	str = "";
});		
    


	$(document).delegate('#productDetailSharePage', 'pageinit', function(){
		teks = App.getPageParam('productDetailName');
		namaProdukURL = teks.replace(/[^a-zA-Z0-9]/g, "_");
		url = encodeURIComponent(Config.webURL + 'products/' + $.trim(App.getPageParam('productDetailPartID')) + '/' + namaProdukURL + '.aspx');
				
		$("#facebookButton").attr('mob-href', 'http://www.facebook.com/sharer.php?u=' + url + '&t=' + teks);
		$("#twitterButton").attr('mob-href', 'http://twitter.com/share?url=' + url 
			+ '&text=' + teks 
			+ '&via=bhinnekacom');
		$("#gplusButton").attr('mob-href', 'http://www.plus.google.com/share?url=' + url);
				
		App.onClick($("#emailButton"), function($self){
			window.location.href = "mailto:?subject=" + teks + "&body=" + url;
			});
				
		});
    



	BPost.loadBPost("LatestNews", 5, function(news){
		var str = "";
		$("#bPostHeaderNews").html("<div class='postTitle'>" 
      		 + "<img src='css/bhinnekaImg/newsImg.jpg'" 
			 + "class='postImgHeader'>" 
        	 + "<span class='postCategoryHeader'>News</span>" 
      	 	 + "</div>");
		$.each(news, function(idx, berita){
			str += "<li class='listItemNewsDetail listItem clickable listItemBPost bordered'"
				   + "id='"+ berita.newsID + "'"
				   + "mob-newsID='" + berita.newsID + "'"
				   + ">"
				   + "<b>" + berita.newsTitle + "</b>"
				   + "<div class='categoryDate'>"
				   + berita.creatorDateTime
				   + "</div>"
				   + "</li>";
		});
		$("#listviewBPostNews").remove("li").html(str);
	});
	
	BPost.loadBPost("LatestReviews", 5, function(review){
		var str = "";
		$("#bPostHeaderReviews").html("<div class='postTitle'>" 
      		 + "<img src='css/bhinnekaImg/reviewImg.jpg'" 
			 + "class='postImgHeader'>" 
        	 + "<span class='postCategoryHeader'>Reviews</span>" 
      	 	 + "</div>");
		$.each(review, function(idx, ulasan){
			str += "<li class='listItemReviewDetail listItem clickable listItemBPost bordered'"
				   + "id='"+ ulasan.id + "'"
				   + "mob-reviewID='" + ulasan.id + "'"
				   + ">"
				   + "<b>" + ulasan.title + "</b>"
				   + "<div class='categoryDate'>"
				   + ulasan.creatorDateTime 
				   + "</div>"
				   + "</li>";
		});
		$("#listviewBPostReviews").remove("li").html(str);
	});
	
	BPost.loadDetail("ReviewDetail", App.getPageParam('reviewid'), function(review){
		if(!review.newerReviewTitle)
		{
			review.newerReviewTitle = "Ini adalah review pertama";
		}
		if(!review.olderReviewTitle)
		{
			review.olderReviewTitle = "Ini adalah review terakhir";
		}
		if(!!review.source2)
		{
			review.source2 = ", " + review.source2
		}
		if(!!review.uRL2)
		{
			review.uRL2 = ", " + review.uRL2
		}
		if(!review.reporter)
		{
			review.reporter = "n/a"
		}
		var str = "";
		str += "<div class='articlePad'>"
				   + "<div style='margin-top: 14px;'>"
				   + "<h1 class='articleTitle'>"
				   + "<span>" + review.title + "</span></h1></div>"
				   + "<div style='margin-top: -10px;'>"
            	   + "<span class='articleSubTitle'>Posted: " + review.creatorDateTime + "</span><br>"
            	   + "<span class='articleSubTitle'>Viewed: " + review.viewCount + "</span></div>"
				   + "<div style='margin-top: 7px;'><span>"
				   + review.content + "</span>";
				   if (review.links.length > 0)
				   		str += "<b>Link to Product(s):</b>";
				   $.each(review.links, function(idx, ulasan){
					   str += "<div style='height: 5px; overflow: hidden;'></div>"
					   			+ "<div class='reviewPartID articleSourceURL' mob-partID='" + ulasan.partID + "'>" 
								+ ulasan.productName + "</div>"
					   			+ "<div style='height: 5px; overflow: hidden;'></div>"
				   })
		str += "</div>"
				   + "<div class='articleSource'>"
                   + "<div class='articleSourceLabel'><b>Editor</b></div>"
                   + "<div class='articleSourceContent'>:&nbsp;<span>" + review.reporter + "</span></div></div>"
				   + "<div class='articleSource'>"
                   + "<div class='articleSourceLabel'><b>Source</b></div>"
				   + "<div class='articleSourceContent'>:&nbsp;<span>" + review.source + "</span>"
				   + "<span>" + review.source2 + "</span></div></div>"
				   + "<div class='articleSource'>"
                   + "<div class='articleSourceLabel'><b>URL</b></div>"
                   + "<div class='articleSourceContent'>:&nbsp;<a class='articleSourceURL' href='" + review.uRL + "'>"
				   + review.uRL + "</a>"
				   + "<a class='articleSourceURL' href='" + review.uRL2 + "'>" + review.uRL2 + "</a></div></div>"
				   + "<div style='margin: 14px 0;'></div></div><br />"
				   + "<div id='btnPreviousReviewDetail'" 
				   + "mob-reviewID='" + review.newerReviewID + "'"
				   + "class='listItemReviewDetail previousLink nextpreLink arrowPreLink clickable'>"
				   + "<b id='titlePrevious' style='padding-left:11px;'>Previous Review</b><div class='articleContentCode'>"
				   + review.newerReviewTitle + "</div></div>"
				   + "<div id='btnNextReviewDetail'"
				   + "mob-reviewID='" + review.olderReviewID + "'"
				   + "class='listItemReviewDetail nextLink nextpreLink arrowNxtLink clickable'>"
				   + "<b id='titleNext' style='padding-right:22px;'>Next Review</b><div class='articleContentCode'>"
				   + review.olderReviewTitle  + "</div></div>"

		$("#reviewDetailBody").html(str);
		
		if(review.newerReviewTitle == "Ini adalah review pertama")
		{
			jQuery("#btnPreviousReviewDetail").removeClass('clickable').addClass('articlePrevNextContent');
			jQuery("#btnPreviousReviewDetail").removeClass('listItemReviewDetail');
			jQuery("#titlePrevious").addClass('articlePrevNextContent');
		}
		if(review.olderReviewTitle == "Ini adalah review terakhir")
		{
			jQuery("#btnNextReviewDetail").removeClass('clickable').addClass('articlePrevNextContent');
			jQuery("#btnNextReviewDetail").removeClass('listItemReviewDetail');
			jQuery("#titleNext").addClass('articlePrevNextContent');
		}
	});
	
	


    $(document).delegate('#moreLegalInformationPage', 'pageinit', function(){
		var emailSubject = "";
		emailSubject += ", " + device.platform + " " + device.version;
		emailSubject += ", " + device.name;
		/*
		$("#feedback").attr('href', 'mailto:' + Config.feedbackEmailAddress 
			+ '?subject=' + Config.feedbackEmailSubject + escape(emailSubject));
		
		var current = new Date();
		$("#spnCurrentYear").html(current.getFullYear());
		*/
		App.onClick($("#feedback"), function($self){
			App.setPageParam("visitorEmailSubject", "Mobile App Feedback" + emailSubject);
			App.changePage("visitorEmail.html");	
			});	
	});
    







// jquery mobile init
$(document).bind('mobileinit', function(){
	$.mobile.allowCrossDomainPages = true;
	$.support.cors = true;
	$.mobile.defaultPageTransition="none"; // for faster performance	
	$.mobile.loadingMessage = "Loading...";
	$.mobile.loadingMessageTextVisible = true;
	redirect = window.localStorage.getItem('frontPageRedirect');
	window.localStorage.clear(); // remove all data except push status
	window.localStorage.setItem('frontPageRedirect', redirect);
});


















App.init();


$(document).delegate("#indexPage", "pageinit", function(){
	App.doJsonp(Config.ciURL + "gallery/frontPageAndroid/mobile", "width=" + window.innerWidth, function(result){
		function checkPageType(kodeArea, pageType){
			if (pageType=='address'){
				pageParam = result.androidImage[kodeArea].pageParam;
				customParam = pageParam.customParam.toString().split("##");
				$.each(customParam, function(idx, paramString){
					paramArr = paramString.split("=");
					if (paramArr.length == 2)
						App.setPageParam(paramArr[0], paramArr[1]);
					});
				App.changePage( result.androidImage[kodeArea].pageName );
			}
			else if (pageType=='productList'){
				var pageParam = [];
				pageParam = result.androidImage[kodeArea].pageParam;
				ProductList.removeFilter({
					includeCatID: '*',
					excludeCatID: '*',
					includeBrandID: '*',
					excludeBrandID: '*'
					});
				App.setPageParam("listFormat", "text");
				App.setPageParam("listValue",  pageParam.promoID);
				App.setPageParam("listType",   pageParam.promoType);
				App.setPageParam("listName",   pageParam.promoName);
				if (Config.cacheProductList) ProductList.isNew = true;
				App.changePage( result.androidImage[kodeArea].pageName );
			}else if(pageType=='productDetail'){
				var partID = result.androidImage[kodeArea].pageParam.partID;
				App.setPageParam('partID', partID);
				App.changePage( result.androidImage[kodeArea].pageName );
			}
		}
		
		loadImage($("#banner1"), Config.phpURL + escape(result.androidImage[0].image));
		loadImage($("#banner2"), Config.phpURL + escape(result.androidImage[1].image));
		loadImage($("#banner3"), Config.phpURL + escape(result.androidImage[2].image));
		
		App.onClick($(".homeBanner"), function($selected){
			var kodeArea = $selected.attr('mob-kodeArea');
			var pageType = result.androidImage[kodeArea].pageType;
			checkPageType(kodeArea, pageType);
		});
	});
	});



	$(document).delegate("#visitorEmailPage", "pageinit", function(){
		var name, companyName, address, phone, email, category, subject, message;
		Member.profile(function(result){
			if (result.verified == true){
				$("#txtName").val(result.firstName);
				$("#txtCompanyName").val(result.companyName);
				$("#txtAddress").val(result.address);
				$("#txtPhone").val(result.telephone);
				$("#txtEmail").val(Member.getEmail());
				}
			});
		App.doJsonp(Config.webServiceURL + "contactUs/email/category", "", function(result){
			var strEmailCategoryItem = "";
			if (result.result == true){
				strEmailCategories = result.message.split("##");
				strOptions = "<option value='-' disabled selected>- Choose One -</option>";
				$.each(strEmailCategories, function(idx, strEmailCategoryItem){
					if (strEmailCategoryItem != ""){
						strEmailCatArray = strEmailCategoryItem.split("=");
						strOptions += "<option value='" + strEmailCatArray[0] + "'" 
							+ ((strEmailCatArray[0] == App.getPageParam("visitorEmailCatID")) 
								? "selected" : "")
							+ ">"
							+ strEmailCatArray[1]
							+ "</option>";
						}
					});
				$("#cmbCategory").html(strOptions);
				if (App.getPageParam("visitorEmailCatID") != null && App.getPageParam("visitorEmailCatID") != 'undefined' && App.getPageParam("visitorEmailCatID") != ""){
					$("#txtSubject").val(App.getPageParam("visitorEmailSubject"));
					}
				if (App.getPageParam("visitorEmailSubject") != null && App.getPageParam("visitorEmailSubject") != 'undefined' && App.getPageParam("visitorEmailSubject") != ""){
					$("#txtSubject").val(App.getPageParam("visitorEmailSubject"));
					}
				}			
			});
		App.onClick($("#btnSubmitEmail"), function($self){
			errorMessage = "";
			$divResult = $("#visitorEmailResult");
			
			name = $.trim($("#txtName").val());
			companyName = $.trim($("#txtCompanyName").val());
			address = $.trim($("#txtAddress").val());
			phone = $.trim($("#txtPhone").val());
			email = $.trim($("#txtEmail").val());
			subject = $.trim($("#txtSubject").val());
			message = $.trim($("#txtMessage").val());
			categoryID = $("#cmbCategory").val();
			
			var queryString = [];
			
			if (name == "") errorMessage = "Masukkan Nama Anda";
			else if (phone == "") errorMessage = "Masukkan Nomor Telepon Anda";
			else if (phone.search(/^[0-9 ]+$/)) errorMessage = "Nomor Telepon Harus Berupa Angka";
			else if (email == "") errorMessage = "Masukkan Alamat Email Anda";
			else if (email.search(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/)) errorMessage = "Periksa Kembali Alamat Email Anda";
			else if (categoryID == "-") errorMessage = "Pilihlah Kategori Email";
			else if (subject == "") errorMessage = "Masukkan Subject Email Anda";
			else if (message == "") errorMessage = "Masukkan Isi Pesan Anda";
			
			if (errorMessage == ""){
				// submit Data
				queryString.push("visitorName=" + name);
				queryString.push("visitorEmail=" + email);
				queryString.push("visitorPhone=" + phone);
				queryString.push("visitorAddress=" + address);
				queryString.push("visitorCompany=" + companyName);
				queryString.push("emailCatID=" + categoryID);
				queryString.push("emailSubject=" + subject);
				queryString.push("emailMessage=" + message);
				App.doJsonp(Config.webServiceURL + "contactUs/email/send?" + queryString.join("&"), "", function(result){
					if (result.result == true){
						$divResult
							.removeClass("hidden")
							.removeClass("error")
							.addClass("success")
							.html("Terima kasih. Dalam situasi normal, Anda akan mendapatkan jawaban dari kami dalam waktu 24 jam. Jika Anda tidak mendapatkan jawaban dalam waktu tersebut, Anda dapat menhubungi kami <a class='hrefMenuItem txtLink' mob-href='moreContactUs.html'>di sini</a>.");						
						}
					else {
						$divResult
							.removeClass("hidden")
							.removeClass("success")
							.addClass("error")
							.html(result.message);						
						}
					});
				}
			else{
				$divResult
					.removeClass("hidden")
					.removeClass("success")
					.addClass("error")
					.html(errorMessage);
				}
			});
		});
	


	BPost.loadBPost("LatestNews", 5, function(news){
		var str = "";
		$("#bPostHeaderNews").html("<div class='postTitle'>" 
      		 + "<img src='css/bhinnekaImg/newsImg.jpg'" 
			 + "class='postImgHeader'>" 
        	 + "<span class='postCategoryHeader'>News</span>" 
      	 	 + "</div>");
		$.each(news, function(idx, berita){
			str += "<li class='listItemNews listItem clickable listItemBPost bordered'"
				   + "id='"+ berita.newsID + "'"
				   + "mob-newsID='" + berita.newsID + "'"
				   + ">"
				   + "<b>" + berita.newsTitle + "</b>"
				   + "<div class='categoryDate'>"
				   + berita.creatorDateTime
				   + "</div>"
				   + "</li>";
		});
		$("#listviewBPostNews").remove("li").html(str);
	});
	
	BPost.loadBPost("LatestReviews", 5, function(review){
		var str = "";
		$("#bPostHeaderReviews").html("<div class='postTitle'>" 
      		 + "<img src='css/bhinnekaImg/reviewImg.jpg'" 
			 + "class='postImgHeader'>" 
        	 + "<span class='postCategoryHeader'>Reviews</span>" 
      	 	 + "</div>");
		$.each(review, function(idx, ulasan){
			str += "<li class='listItemReview listItem clickable listItemBPost bordered'"
				   + "id='"+ ulasan.id + "'"
				   + "mob-reviewID='" + ulasan.id + "'"
				   + ">"
				   + "<b>" + ulasan.title + "</b>"
				   + "<div class='categoryDate'>"
				   + ulasan.creatorDateTime 
				   + "</div>"
				   + "</li>";
		});
		$("#listviewBPostReviews").remove("li").html(str);
	});
	



	$(document).delegate('#memberEditShippingAddressPage', 'pageinit', function(){
		var shippingAddressID = App.getPageParam("shippingAddressID");
		if (shippingAddressID != "NEW"){
			$("#txtAddress").val(App.getPageParam("address"));
			$("#txtProvince").val(App.getPageParam("province"));
			$("#txtCity").val(App.getPageParam("city"));
			$("#txtZipCode").val(App.getPageParam("zipCode"));
			if (App.getPageParam("isPreferred") == "1"){
				$("#chkPreferred").attr("checked", "checked");
				}
			}
				
		/*
		Member.getShippingAddress(shippingAddressID, function(result){
			alert("member.getShippingAddress result: " + JSON.stringify(result));
			$("#txtAddress").val(result.address);
			$("#txtProvince").val(result.province);
			$("#txtCity").val(result.city);
			$("#txtZipCode").val(result.zipCode);
			if (result.isPreferred == "1"){
				$("#chkPreferred").attr("checked", "checked");
				}
			});
		*/
		
		App.onClick($("#btnSubmitEditShippingAddress"), function($self){
			var $editShippingAddressResult = $("#editShippingAddressResult");
			var errMessage = "";
			var address = $.trim($("#txtAddress").val());
			var province = $.trim($("#txtProvince").val());
			var city = $.trim($("#txtCity").val());
			
			if (address == "") errMessage = "Please enter address";
			if (province == "") errMessage = "Please enter province";
			if (city == "") errMessage = "Please enter city";
			
			if (errMessage == ""){
				data = {};
				data.shippingAddressID = App.getPageParam("shippingAddressID");
				data.address = address;
				data.province = province;
				data.city = city;
				data.zipCode = $.trim($("#txtZipCode").val());
				if ($("#chkPreferred").attr('checked') == "checked"){
					data.isPreferred = "1";
					}
				else data.isPreferred = "0";
				Member.editShippingAddress(data, function(result){
					App.changePage("memberProfile.html");
					});
				}
			else {
				$editShippingAddressResult
					.removeClass("hidden")
					.addClass("error")
					.html(errMessage);
				}
			});
		});
	


		$(document).delegate("#landingPage", "pageinit", function(){
			var landingPageName = App.getPageParam("landingPageName");
			var landingPageDateTime = App.getPageParam("landingPageCreatorDateTime");
			
			var landingPageParam;
			if (landingPageDateTime == "") landingPageParam = "";
			else landingPageParam = "createDateTime=" + landingPageDateTime;
			
			if (landingPageName != null && landingPageName != ""){
				App.doJsonp(Config.ciURL + "landingPageController/" + landingPageName, landingPageParam, function(result){
					$("#landingPageContent").html(result.content);
				});	
			}	
		});
    


	$(document).delegate('#productDetailReviewPage', 'pageinit', function(){
		Product.loadReview(App.getPageParam('productDetailPartID'), function(resultstr){
			$("#productDetailReviewText").html(resultstr);
			});
		App.onClick($("#writeReviewButton"), function($self){
			App.changePage("writeReview.html");
			});
		});
    


	$(document).delegate('#memberEditOrderReceiverPage', 'pageinit', function(){
		var orderReceiverID = App.getPageParam("orderReceiverID");
		if (orderReceiverID != "NEW"){
			$("#txtName").val(App.getPageParam("name"));
			var phone = App.getPageParam("phone");
			var phoneArr = phone.split(" ");
			$("#txtTelephoneCodeArea").val(phoneArr[0]);
			$("#txtTelephone").val(phoneArr[1]);
			var mobile = App.getPageParam("mobile");
			var mobileArr = mobile.split(" ");
			$("#txtMobileCodeProvider").val(mobileArr[0]);
			$("#txtMobilePhone").val(mobileArr[1]);
			if (App.getPageParam("isPreferred") == "1")
				$("#chkPreferred").attr("checked", "checked");
			
			}
		/*
		Member.getOrderReceiver(orderReceiverID, function(result){
			alert("member.getorderreceiver: " + JSON.stringify(result));
			$("#txtName").val(result.name);
			var phone = result.phone;
			var phoneArr = phone.split(" ");
			$("#txtTelephoneCodeArea").val(phoneArr[0]);
			$("#txtTelephone").val(phoneArr[1]);
			var mobile = result.mobile;
			var mobileArr = mobile.split(" ");
			$("#txtMobileCodeProvider").val(mobileArr[0]);
			$("#txtMobilePhone").val(mobileArr[1]);
			if (result.isPreferred == "1")
				$("#chkPreferred").attr("checked", "checked");
			});
		*/
		App.onClick($("#btnSubmitEditOrderReceiver"), function($self){
			var $editOrderReceiverResult = $("#editOrderReceiverResult");
			var errMessage = "";
			
			var name = $.trim($("#txtName").val());
			var phoneArea = $.trim($("#txtTelephoneCodeArea").val());
			var phoneNumber = $.trim($("#txtTelephone").val());
			var mobileProvider = $.trim($("#txtMobileCodeProvider").val());
			var mobilePhoneNumber = $.trim($("#txtMobilePhone").val());
			
			if (name == "") errMessage = "Please insert receiver name";
			if ((phoneArea == "" && phoneNumber == "") && (mobileProvider == "" && mobilePhoneNumber == "")) errMessage = "Please insert receiver phone or mobile phone";
			
			if (errMessage == ""){
				data = {};
				data.orderReceiverID = orderReceiverID;
				data.name = name;
				data.phone = phoneArea + " " + phoneNumber;
				data.mobile = mobileProvider + " " + mobilePhoneNumber;
				if ($("#chkPreferred").attr('checked') == "checked"){
					data.isPreferred = "1";
					}
				else data.isPreferred = "0";
				Member.editOrderReceiver(data, function(){
					App.changePage("memberProfile.html");
					});
				}
			else {
				$editOrderReceiverResult
					.removeClass("hidden")
					.addClass("error")
					.html(errMessage);
				}
			});
		});
	


	$(document).delegate('#memberWelcomePage', 'pageinit', function(){
		$("#name").html("Hello, " + Member.getName());
	});
	


	$(document).delegate('#productDetailOverviewPage', 'pageinit', function(){
		$("#productDetailOverviewText").html(App.getPageParam('productDetailOverview'));
		});
    


	function loginUserValidate(){
		var errMessage	= "";
		
		var username	= $.trim($("#username").val());
		var pass	 	= $.trim($("#password").val());
		
		if (username == ""){
			errMessage = "Masukkan email Anda";
		}
		else if (username.search(/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}/)){
			errMessage = "Email yang Anda masukkan tidak tepat. Mohon isi kembali email Anda dengan tepat";
		}
		else if(pass == ""){
			errMessage = "Masukkan password Anda";
		}
		
		var deviceID = "-";
		var devicePlatform = "-";
		if (typeof (device) != 'undefined' && device != null){
			if (device.uuid) deviceID = device.uuid;
			if (device.platform) devicePlatform = device.platform;
			}
			
		var $loginResult = $("#loginResult");		
		if (errMessage == ""){
			Member.login( username, pass, deviceID, devicePlatform, function(result){
				if (result.result == true){
					AndroidPreferences.set("memberSignature", Member.getSignature()
						, function(){ console.log("Signature saved successfully"); }
						, function(){ console.log("Signature saved error"); });
					App.changePage("memberWelcome.html");
					}
				else {
					$loginResult
						.removeClass("hidden")
						.addClass("error")
						.html("Your username and/or password are invalid");
					}
			});
		}
		else {
			$loginResult
				.removeClass("hidden")
				.addClass("error")
				.html(errMessage);
		}
	};
	
	$(".loginValidate").keyup(function (e) {
		if(e.which == 13) {
			loginUserValidate();
		}
	});
	


	$(document).delegate('#memberProfilePage', 'pageinit', function(){
		Member.profile(function(result){
			if (result.verified == true){
				// $("#memberEmail").html(Member.getEmail());
				$("#memberFirstName").html(result.firstName);
				$("#memberLastName").html(result.lastName);
				$("#memberAddress").html(result.address);
				$("#memberPhone").html(result.telephone);
				$("#memberMobilePhone").html(result.mobilePhone);
				$("#memberProvince").html(result.province);
				$("#memberCity").html(result.city);
				$("#memberCountry").html(result.country);
				$("#memberZipCode").html(result.zipCode);
				$("#memberCompanyName").html(result.companyName);
				$("#memberCompanyAddress").html(result.companyAddress);
				App.getMonth(result.birthDateMM, function(month){
					$("#memberDOB").html(result.birthDateDD + " " + month + " " + result.birthDateYYYY);
				});
				App.getMonth(result.memberSinceMM, function(month){
					$("#memberSince").html(result.memberSinceDD + " " + month + " " + result.memberSinceYYYY);
				});
				$("#memberAllowSMS").html((result.allowSMS == true) ? "Yes" : "No");
				$("#memberAllowNewsLetter").html((result.allowNewsLetter == true) ? "Yes" : "No");
				//Shipping Address
				var shippingAddress = "";
				var shipping		= result.shippingAddress;
				if (shipping != null){
					var countShipping	= shipping.length;
					for (i=0; i<countShipping; i++){
						shippingAddress += "<div id='memberShippingAddress_" 
							+ shipping[i].shippingAddressID + "'>";
						shippingAddress += "<div class='memberData'>";
						if (shipping[i].isPreferred == "1")
							shippingAddress += " (alamat utama) ";
						shippingAddress += shipping[i].address + "<br />";
						shippingAddress += shipping[i].province + "<br />";
						shippingAddress += shipping[i].city + "<br />";
						shippingAddress += shipping[i].zipcode;
						shippingAddress += "</div>";
						shippingAddress += "<div class='memberIcon memberEdit memberShippingAddressEdit' mob-shippingAddressID='" + shipping[i].shippingAddressID + "'" 
							+ " mob-address='" + shipping[i].address + "'" 
							+ " mob-province='" + shipping[i].province + "'" 
							+ " mob-city='" + shipping[i].city + "'" 
							+ " mob-zipCode='" + shipping[i].zipcode + "'"
							+ " mob-isPreferred='" + shipping[i].isPreferred + "'"
							+ ">Edit</div>";
						shippingAddress += "<div class='memberIcon memberDelete memberShippingAddressDelete' mob-shippingAddressID='" + shipping[i].shippingAddressID + "'>Delete</div>";
						shippingAddress += "</div>";
						}	
					}
					if (shippingAddress == ""){
						shippingAddress += "<div>Same with customer data</div>";
						}
					shippingAddress += "<div id='memberShippingAddressNew' class='memberNew'>Add New</div>";
				$("#memberShippingAddress").html(shippingAddress);
				//Order Receiver
				var orderReceiver	= "";
				var receiver		= result.orderReceiver;
				if (receiver != null){
					var countReceiver	= receiver.length;
					for (i=0; i<countReceiver; i++){
						orderReceiver += "<div id='memberOrderReceiver_" + receiver[i].orderReceiverID + "'>";
						orderReceiver += "<div class='memberData'>";
						if (receiver[i].isPreferred == "1"){
							orderReceiver += " (penerima utama) ";
							}
						orderReceiver += receiver[i].name + "<br />";
						if ($.trim(receiver[i].phone) != "")
							orderReceiver += receiver[i].phone + "<br />";
						orderReceiver += receiver[i].mobile;
						orderReceiver += "</div>";
						orderReceiver += "<div class='memberIcon memberEdit memberOrderReceiverEdit' " 
							+ " mob-orderReceiverID='" + receiver[i].orderReceiverID + "'" 
							+ " mob-name='" + receiver[i].name + "'" 
							+ " mob-phone='" + receiver[i].phone + "'" 
							+ " mob-mobile='" + receiver[i].mobile + "'" 
							+ " mob-isPreferred='" + receiver[i].isPreferred + "'" 
							+ ">Edit</div>";
						orderReceiver += "<div class='memberIcon memberDelete memberOrderReceiverDelete' mob-orderReceiverID='" + receiver[i].orderReceiverID + "'>Delete</div>";
						orderReceiver += "</div>";
						}			
					}
					if (orderReceiver == ""){
						orderReceiver += "<div>Same with customer data</div>";
						}
					orderReceiver += "<div id='memberOrderReceiverNew' class='memberNew'>Add New</div>";
				$("#memberOrderReceiver").html(orderReceiver);
				}
			});
		});
	


	$(document).delegate('#moreKonfirmasiPembayaranPage', 'pageinit', function(){
		var bulan = ["January", "February", "March", "April"
				, "May", "June", "July", "August"
				, "September", "October", "November", "December"];
		var batasHari = [31, 28, 31, 30
					, 	 31, 30, 31, 31
					,	 30, 31, 30, 31];
		var hariIni = new Date();
		var batasTahun = hariIni.getFullYear();				
		var strbln = "", strtgl = "", strthn = "";
		for (i = 0; i < 12; i++){
			strbln += "<option value='" + i + "'>" + bulan[i] + "</option>";
			}
		for (i = 1; i <= 31; i++){
			strtgl += "<option value='" + i + "'>" + i + "</option>";
			}
		$("#tanggalPembayaranDiv").html(
			  "<select name='tanggalPembayaran' class='inputDate' id='tanggalPembayaran'>" 
			+ strtgl
			+ "</select>"
			+ "<select name='bulanPembayaran' class='inputDate' id='bulanPembayaran'>" 
			+ strbln
			+ "</select>"
			+ "<select name='tahunPembayaran' class='inputDate' id='tahunPembayaran'>" 
			+ "<option value='" + (batasTahun-1) + "'>" + (batasTahun-1) + "</option>"
			+ "<option value='" + batasTahun + "'>" + batasTahun + "</option>"
			+ "</select>"
			);
		$("#moreKonfirmasiPembayaranPage").find('.ui-select').find("span").remove();
		$("#moreKonfirmasiPembayaranPage").find(".ui-select").removeClass("ui-select");
		App.onClick($("#btnSubmitKonfirmasi"), function($self){
			var IDPesanan = $.trim($("#txtIDPesanan").val());
			var nilaiPembayaran = $.trim($("#txtNilaiPembayaran").val());
			var bln = $("#bulanPembayaran").val();
			var tgl = $.trim($("#tanggalPembayaran").val());
			var thn = $.trim($("#tahunPembayaran").val());
			var tglPembayaran;
			var errMessage = "", message = "", classname = "error";
			// validate
			if (IDPesanan == "") errMessage = "Masukkan ID Pesanan";
			else if (nilaiPembayaran == "") errMessage = "Masukkan Nilai Pembayaran";
			else if (IDPesanan.search(/^[0-9]+$/)) errMessage = "ID Pesanan harus berupa angka";
			else if (nilaiPembayaran.search(/^[0-9]+$/)) errMessage = "Nilai Pembayaran harus berupa angka";
			else if (parseInt(nilaiPembayaran, 10) == 0) errMessage = "Masukkan Nilai Pembayaran";
			else {				
				var ithn = parseInt(thn, 10);
				var itgl = parseInt(tgl, 10);
				var isLeap = false;
				
				if (batasTahun - ithn > 1) 
					errMessage = "Tahun Pembayaran antara " + (batasTahun - 1) + " s/d " + batasTahun;
				if ((ithn % 100 == 0 && i % 400 == 0) || i % 4 == 0) isLeap = true
				if (isLeap) batasHari[1] = 29;
				else batasHari[1] = 28;
				if (itgl < 1 || itgl > batasHari[bln])
					errMessage = "Tanggal Pembayaran antara 1 s/d " + batasHari[bln];
					
				tglPembayaran = new Date(ithn, bln, itgl);
				if (tglPembayaran > hariIni)
					errMessage = "Tanggal Pembayaran belum tiba. Periksa kembali tanggal pembayaran.";
				}
			if (errMessage != "") {
				$("#konfirmasiResult")
					.removeClass("hidden")
					.removeClass("success")
					.addClass("error")
					.html(errMessage);
			} else {  
				App.doJsonp(Config.ciURL + "trx/orderConfirm", 
					"txtIDPesanan=" + IDPesanan
					+ "&txtNilaiPembayaran=" + nilaiPembayaran
					+ "&txtTglPembayaran=" + tglPembayaran.getFullYear() 
						+ '-' + (tglPembayaran.getMonth() + 1) + '-' + tglPembayaran.getDate()
					, function(result){
					if (result[0].note == "success") {
						message = "Terima kasih atas pembayaran yang telah dilakukan. Setelah kami melakukan verifikasi atas pembayaran Anda, kami akan segera melakukan proses pengiriman produk pesanan Anda.";
						classname = "success";
					}
					else {
						classname = "error";
						message = result[0].note;
					}
					$("#konfirmasiResult")
						.removeClass("hidden")
						.removeClass("error")
						.removeClass("success")
						.addClass(classname)
						.html(message)
						;
					});
				}
			});
		});
    


	$(document).delegate('#productDetailFrontPage', 'pageinit', function(){
		// Button SMS
		// alert( JSON.stringify( Config.contactCenter[2].contactType ) );
		var imageSlider;
		var str="";
		str += "<a";
		str += " href='" + Config.contactCenter[2].contactType + ":" + Config.contactCenter[2].contactValue + "'";
		str += " target='_blank'";
		str += ">";
		str += "<div id='productDetailSMSButton'>SMS</div>";
		str += "</a>";
		$("#buttonSMS").html(str);
		
		App.onClick($("#productDetailMurahMaksimalIcon"), function($self){
			App.setPageParam("landingPageName", "murahMaksimal");
			App.setPageParam("landingPageCreatorDateTime", "20140502");
			App.changePage("landingPage.html");
			});
		App.onClick($("#freeShipping"), function($self){
			App.setPageParam("landingPageName", "freeShipping");
			App.changePage("landingPage.html");
			});
		App.onClick($(".productDetailCicilanMore"), function($self){
			//mob-installment-percentage, mob-installment-ids
			App.setPageParam('mob-installment-percentage', $self.attr('mob-installment-percentage'));
			App.setPageParam("mob-installment-tenor", $self.attr("mob-installment-tenor"));
			App.changePage("productDetailInstallment.html");
			});
		Product.loadImages(App.getPageParam("partID"), function(imagestr, totalImage){
			$("#productDetailImageContainer").html(imagestr);
			$("#productDetailImageContainer").css("width", (totalImage * 300) + 'px');
			if (totalImage == 1){
				$("#productDetailImageNavLeft").addClass("hidden");
				$("#productDetailImageNavRight").addClass("hidden");				
				}
			imageSlider = null;
			imageSlider = new Swipe(document.getElementById('productDetailImageFrame'));
			$("#productDetailImageNavLeftWrapper").die();
			$("#productDetailImageNavRightWrapper").die();
			App.onClick($("#productDetailImageNavLeftWrapper"), function($self){
				imageSlider.prev();
				});
			App.onClick($("#productDetailImageNavRightWrapper"), function($self){
				imageSlider.next();
				});
			});
		Product.loadDetail(App.getPageParam('partID'), function(record, overviewstr, specstr){
			var arrprice = [], coretText = "", productPrice;
			
			$("#productDetailTitle").html(record.productName);
			$("#productDetailCategory").html(record.categoryName);
			//$("#productDetailPartNo").html(record.partID);
			// $("#productDetailImage").attr('src', Config.imageProductURL + record.imgPath);
			$("#productDetailBrand").attr('src', Config.logoBrandURL + record.brandLogo);			
			$("#productDetailInformation").html("<b>Product Information </b><br>" 
				+ "<div class='partNo'>" + "Bhinneka Part No : <span id='productDetailPartNo'>" + record.partID + "</span></div><br>"
				+ "<div class='productDetailDesc'>" + record.productDesc + "</div>");	
			if (record.jaminanMurah == "0")
				$("#productDetailMurahMaksimalIcon").addClass("hidden");
			else 
				$("#productDetailMurahMaksimalIcon").removeClass("hidden");
			if (record.rating > 0){
				$("#productDetailRatingScore").css('width', (record.rating * 20) + '%');
				$("#productDetailRating").removeClass('hidden');
			}
			else $("#productDetailRating").addClass('hidden');
			if (record.totalReview > 0)
				$("#productDetailTotalReview").html("(" + record.totalReview + ")");
			
			$("#productDetailSMSButton").attr('mob-productID', App.getPageParam('partID'));
			productPrice = record.price;
			if ((record.specialPrice != null && record.specialPrice > 0) || record.promo.length > 0)
				coretText = "coretText";
			else coretText = "";
			
			// merchantID, merchantName, merchantPrice
			$("#productDetailProvidedBy").html("Dijual dan dikirim oleh <a class='txtBlue'>Bhinneka.Com</a>");
			var lowestMerchant = {
				merchantID: "",
				merchantName: "",
				merchantPrice: Number.MAX_VALUE
				};
			Mesh.loadMerchantOffer(App.getPageParam("partID"), function(merchantOffers){
				productPrice = record.price;
				if (record.price == "Out of Stock" || record.specialPrice == "Out of Stock" 
					|| record.price == "Call" || record.specialPrice == "Call"){
					
					$.each(merchantOffers, function(idx, offer){
						if (offer.merchantPrice < lowestMerchant.merchantPrice)
							lowestMerchant = offer;
						});	
					if (lowestMerchant.merchantID != ""){
						$("#productDetailProvidedBy").html("Dijual dan dikirim oleh " 
							+ "<a class='txtBlue'>" + lowestMerchant.merchantName + "</a>");	
						productPrice = lowestMerchant.merchantPrice;	
						$("#productDetailBuyButton").attr("mob-merchantID", lowestMerchant.merchantID);
						}	
					}
				if (productPrice == "Call" || productPrice == "Out of Stock")
					$("#productDetailBuyButton").addClass('hidden');
				else 
					$("#productDetailBuyButton")
						.removeClass('hidden')
						.attr('mob-productID', App.getPageParam('partID'));
				arrmerchant = [];
				$.each(merchantOffers, function(idx, offer){
					if (lowestMerchant.merchantID != offer.merchantID)
						arrmerchant.push("<div class='merchantOffer'>"
						+ "<div class='merchantName'>oleh <a class='txtBlue'>" + offer.merchantName + "</a></div>"
						+ "<div class='merchantPrice'>Rp. " + App.numberFormat(offer.merchantPrice) + "</div>"
						+ "<div mob-productID='" + App.getPageParam("partID") + "' mob-merchantID='" + offer.merchantID + "' class='productDetailBuyMerchantButton btn btnYellow'>BELI</div>"
						+ "</div>");
					});
				if (arrmerchant.length > 0)
					$("#productDetailMerchantOffer").html("<b>Harga dari penjual lainnya</b>:<br />" + arrmerchant.join(""));
				else $("#productDetailMerchantOffer").addClass("hidden");
				arrprice.push("<div class='productDetailBoxLeft'>Normal Price </div><div class='productDetailBoxCenter'>:</div><span class='productDetailBoxRight " + coretText + "' id='productDetailNormalPrice'>Rp. " + App.numberFormat(productPrice) + "</span>");
			if (record.specialPrice != null && record.specialPrice > 0){
				productPrice = record.specialPrice;
				arrprice.push("<div class='productDetailBoxLeft'>Special Price </div><div class='productDetailBoxCenter'>:</div><div  class='productDetailBoxRight' id='productDetailSpecialPrice'>Rp. " 
					+ App.numberFormat(record.specialPrice) 
					+ "</div>");
				arrprice.push("<div class='productDetailBoxLeft productDetailYouSave'>Save </div><div class='productDetailBoxCenter'>:</div><div  class='productDetailBoxRight productDetailYouSave'>Rp. " 
					+ App.numberFormat(record.price - record.specialPrice) 
					+ "</div>");
				}
				$.each(record.promo, function(idx, promorecord){
					soldOutClass = "";
					soldOutText = "";
					if (promorecord.remainingQty <= 0) {
						soldOutClass = "soldOut";
						soldOutText = "(Sold Out)";
					}
					if (promorecord.price < productPrice)
						productPrice = promorecord.price;
					arrprice.push("<div class='productDetailBoxLeft " + soldOutClass + "'>" 
						// + "<img src='" + Config.webURL + promorecord.imageURL + "' />"
						+ promorecord.promoName
						+ "</div>"
						+ "<div class='productDetailBoxCenter'>:</div>"
						+ "<span class='productDetailPromoPrice productDetailBoxRight " + soldOutClass + "'>Rp. " + App.numberFormat(promorecord.price) + " " + soldOutText + "</span>");
					arrprice.push("<div class='productDetailBoxLeft productDetailYouSave " + soldOutClass + "'>" 
						+ "Save"
						+ "</div>"
						+ "<div class='productDetailBoxCenter'>:</div>"
						+ "<span class='productDetailYouSave productDetailBoxRight " + soldOutClass + "'>Rp. " + App.numberFormat(record.price - promorecord.price) + "</span>");	
					if (promorecord.isQtyShown == "1"){
						arrprice.push("<div class='productDetailBoxLeft " + soldOutClass + "'>Remaining</div><div class='productDetailBoxCenter'>:</div><span class='productDetailBoxRight " + soldOutClass + "'>" 
						+ promorecord.remainingQty + " of " + promorecord.qty 
						+ "</span>");
						}
					});
				$("#productDetailPrice").html(arrprice.join(''));			
				});
			
			if (record.isVATincluded == 1){
				$("#productDetailPPN").html("Harga sudah termasuk PPN 10%");
				}
			if (record.cicilan.length > 0){
				$productDetailInstallmentPrice = $("#productDetailInstallmentPrice");
				$("#separatorHargaCicilan").removeClass('hidden');
				
				var strcicilan = "";
				var arrpercentage = [];
				var arrcicilan = [];
				var arrmonths = [];
				var installment0Percent3Months = [];
				var installment0Percent6Months = [];
				var installment0Percent12Months = [];
				var installment0Percent18Months = [];
				var installment0Percent24Months = [];
				var installmentOthers = [];
				
				$.each(record.cicilan, function(idx, cicilanrecord){
					arrcicilan.push(cicilanrecord.cicilanID);
					if (cicilanrecord.interestRate == 0.0){
						if (cicilanrecord.tenor == 3) 
							installment0Percent3Months.push(cicilanrecord.cicilanID);
						else if (cicilanrecord.tenor == 6) 
							installment0Percent6Months.push(cicilanrecord.cicilanID);
						else if (cicilanrecord.tenor == 12) 
							installment0Percent12Months.push(cicilanrecord.cicilanID);
						else if (cicilanrecord.tenor == 18)
							installment0Percent18Months.push(ciiclanrecord.cicilanID);
						else if (cicilanrecord.tenor == 24)
							installment0Percent24Months.push(cicilanrecord.cicilanID);
						}
					else installmentOthers.push({
						ID: cicilanrecord.cicilanID
						, interestRate: cicilanrecord.interestRate
						, tenor: cicilanrecord.tenor
						});
					});
				App.setPageParam("mob-installment-ids", arrcicilan.join(","));
				
				if (installment0Percent3Months.length > 0){
					strcicilan += "<div class='productDetailBoxLeft productDetailCicilanLabel'>" 
						+ "0% Installment" 
						+ "</div>"
						+ "<div class='productDetailBoxCenter'>:</div>"
						+ "<div class='productDetailBoxRight productDetailCicilanValue'>" 
						+ "3 x Rp. " + App.numberFormat(productPrice / 3) 
						+ "</div>"
						;
					strcicilan += "<div class='productDetailBoxLeft productDetailCicilanLabel'></div>";
					strcicilan += "<div class='productDetailBoxCenter'></div>";
					strcicilan += "<div class='productDetailBoxRight productDetailCicilanMore' mob-installment-tenor=3 mob-installment-percentage=0%>more &gt;</div>";
					}
				if (installment0Percent6Months.length > 0){
					if (installment0Percent3Months.length > 0){
						judulCicilan = "";
						titikDua = "";
						}
					else {
						judulCicilan = "0% Installment";
						titikDua = ":";
						}
					strcicilan += "<div class='productDetailBoxLeft productDetailCicilanLabel'>" 
						+ judulCicilan 
						+ "</div>"
						+ "<div class='productDetailBoxCenter'>" + titikDua + "</div>"
						+ "<div class='productDetailBoxRight productDetailCicilanValue'>" 
						+ "6 x Rp. " + App.numberFormat(productPrice / 6) 
						+ "</div>"
						;
					strcicilan += "<div class='productDetailBoxLeft productDetailCicilanLabel'></div>";
					strcicilan += "<div class='productDetailBoxCenter'></div>";
					strcicilan += "<div class='productDetailBoxRight productDetailCicilanMore' mob-installment-tenor=6 mob-installment-percentage=0%>more &gt;</div>";
					}
				if (installment0Percent12Months.length > 0){
					if (installment0Percent3Months.length > 0 || installment0Percent6Months.length > 0){
						judulCicilan = "";
						titikDua = "";
						}
					else {
						judulCicilan = "0% Installment";
						titikDua = ":";
						}
					strcicilan += "<div class='productDetailBoxLeft productDetailCicilanLabel'>" 
						+ judulCicilan 
						+ "</div>"
						+ "<div class='productDetailBoxCenter'>" + titikDua + "</div>"
						+ "<div class='productDetailBoxRight productDetailCicilanValue'>" 
						+ "12 x Rp. " + App.numberFormat(productPrice / 12) 
						+ "</div>"
						;
					strcicilan += "<div class='productDetailBoxLeft productDetailCicilanLabel'></div>";
					strcicilan += "<div class='productDetailBoxCenter'></div>";
					strcicilan += "<div class='productDetailBoxRight productDetailCicilanMore' mob-installment-tenor=12 mob-installment-percentage=0%>more &gt;</div>";
					}
				if (installment0Percent18Months.length > 0){
					if (installment0Percent3Months.length > 0 
						|| installment0Percent6Months.length > 0
						|| installment0Percent12Months.length > 0){
						judulCicilan = "";
						titikDua = "";
						}
					else {
						judulCicilan = "0% Installment";
						titikDua = ":";
						}
					strcicilan += "<div class='productDetailBoxLeft productDetailCicilanLabel'>" 
						+ judulCicilan 
						+ "</div>"
						+ "<div class='productDetailBoxCenter'>" + titikDua + "</div>"
						+ "<div class='productDetailBoxRight productDetailCicilanValue'>" 
						+ "18 x Rp. " + App.numberFormat(productPrice / 18) 
						+ "</div>"
						;
					strcicilan += "<div class='productDetailBoxLeft productDetailCicilanLabel'></div>";
					strcicilan += "<div class='productDetailBoxCenter'></div>";
					strcicilan += "<div class='productDetailBoxRight productDetailCicilanMore' mob-installment-tenor=18 mob-installment-percentage=0%>more &gt;</div>";
					}
				if (installment0Percent24Months.length > 0){
					if (installment0Percent3Months.length > 0
						|| installment0Percent6Months.length > 0
						|| installment0Percent12Months.length > 0
						|| installment0Percent18Months.length > 0){
						judulCicilan = "";
						titikDua = "";
						}
					else {
						judulCicilan = "0% Installment";
						titikDua = ":";
						}
					strcicilan += "<div class='productDetailBoxLeft productDetailCicilanLabel'>" 
						+ judulCicilan 
						+ "</div>"
						+ "<div class='productDetailBoxCenter'>" + titikDua + "</div>"
						+ "<div class='productDetailBoxRight productDetailCicilanValue'>" 
						+ "24 x Rp. " + App.numberFormat(productPrice / 24) 
						+ "</div>"
						;
					strcicilan += "<div class='productDetailBoxLeft productDetailCicilanLabel'></div>";
					strcicilan += "<div class='productDetailBoxCenter'></div>";
					strcicilan += "<div class='productDetailBoxRight productDetailCicilanMore' mob-installment-tenor=24 mob-installment-percentage=0%>more &gt;</div>";
					}
				if (installmentOthers.length > 0){
						$.each(installmentOthers, function(idx, recordInstallment){
							interestValue = productPrice * recordInstallment.interestRate / 100;
							interestRateString = ((recordInstallment.interestRate >= 1) 
										? (recordInstallment.interestRate) 
										: ("0" + recordInstallment.interestRate.toString())
										)
							if (recordInstallment.tenor == 0 || recordInstallment.tenor == 3)
								strcicilan += "<div class='productDetailBoxLeft productDetailCicilanLabel'>" 
									+ interestRateString + "% Installment"
									+ "</div>"
									+ "<div class='productDetailBoxCenter'>:</div>"
									+ "<div class='productDetailBoxRight productDetailCicilanValue'>" 
									+ "3 x Rp. " + App.numberFormat(productPrice / 3 + interestValue) 	
									+ "</div>"
									;
							if (recordInstallment.tenor == 0 || recordInstallment.tenor == 6)
								strcicilan += "<div class='productDetailBoxLeft productDetailCicilanLabel'>" 
									+ (recordInstallment.tenor == 6 ? (interestRateString + "% Installment") : "")
									+ "</div>"
									+ "<div class='productDetailBoxCenter'></div>"
									+ "<div class='productDetailBoxRight productDetailCicilanValue'>" 
									+ "6 x Rp. " + App.numberFormat(productPrice / 6 + interestValue) 	
									+ "</div>"
									;
							if (recordInstallment.tenor == 0 || recordInstallment.tenor == 12)
								strcicilan += "<div class='productDetailBoxLeft productDetailCicilanLabel'>" 
									+ (recordInstallment.tenor == 12 ? (interestRateString 	+ "% Installment") : "") 
									+ "</div>"
									+ "<div class='productDetailBoxCenter'></div>"
									+ "<div class='productDetailBoxRight productDetailCicilanValue'>" 
									+ "12 x Rp. " + App.numberFormat(productPrice / 12 + interestValue) 
									+ "</div>"
									;
							strcicilan += "<div class='productDetailBoxLeft productDetailCicilanLabel'>"
								+ ""
								+ "</div>";
							strcicilan += "<div class='productDetailBoxCenter'></div>"
								+ "<div class='productDetailBoxRight productDetailCicilanMore' "
								+ "mob-installment-tenor=" + recordInstallment.tenor + " mob-installment-percentage=" 
								+ interestRateString + ">more &gt;</div>";	
							});
						}
				$productDetailInstallmentPrice.html(strcicilan);
			}
			App.setPageParam('productDetailName', record.productName);
			App.setPageParam('productDetailCategory', record.categoryName);
			App.setPageParam('productDetailPartID', record.partID);
			App.setPageParam('productDetailRating', record.rating);
			App.setPageParam('productDetailOverview', overviewstr);
			App.setPageParam('productDetailSpec', specstr);
			});
		});
    


  		var now = new Date().getTime();
		var end = Config.endDate; 
  		var diff = end - now;
  		var milliseconds = diff * 1000;
		if (milliseconds < 0)
		{
			$('span[id="newSpan"]').remove();
		}

	


	ProductList.clear();
	Category.loadJSON(function(categories){
		var str = "";
		categories = $.parseJSON(categories);
		$.each(categories, function(idx, cat){
			var catIcon = "cat_black_" + cat.menuID + ".png"; // detect icon
			str += "<li class='categoryListMenuItem listItem clickable " + "'"
				   + " id='"+ cat.menuID + "'"
				   + " mob-menuid='" + cat.menuID + "'"
				   + " mob-includeBrandID='" + cat.includeBrandID + "'" 
				   + " mob-excludeBrandID='" + cat.excludeBrandID + "'" 
				   + " mob-includeCatID='" + cat.includeCatID + "'" 
				   + " mob-excludeCatID='" + cat.excludeCatID + "'" 
				   + ">"
				   + "<img src='css/bhinnekaImg/category/" + catIcon + "'"
				   + "id='categoryListIcon_" + cat.menuID + "'"
				   + ">"
				   + "<div class='categoryListTitle'>"
				   + cat.menuTitle
				   + "</div>"
				   + "</li>";
		});
		$("#categoryListUL").remove("li").html(str);
	});
    


	$(document).delegate('#memberEditProfilePage', 'pageinit', function(){
		Member.profile(function(result){
			if (result.verified == true){
				//prefix
				var mr = "", ms = "";
				if (result.prefix == "Mr."){ 
					mr="selected"; ms=""; 
				}
				else{ 
					mr=""; ms="selected"; 
				}
				var optionPrefix = "";
				optionPrefix += "<option " + mr + " value='Mr.'>Mr.</option>";
				optionPrefix += "<option " + ms + " value='Ms.'>Ms.</option>";
				$("#cmbPrefix").html(optionPrefix);
				
				//Allow sms
				if (result.allowSMS == true){ 
					$("#chkAllowSMS").attr({"checked":"checked"});
					}
				else { 
					$("#chkAllowSMS").removeAttr("checked"); 
				}		
				
				//Allow Newsletter
				if (result.allowNewsLetter == true){ 
					$("#chkReceiveNewsletter").attr({"checked":"checked"});
					} 
				else { 
					$("#chkReceiveNewsletter").removeAttr("checked"); 
				}
				
				//telephone
				var dataTelephone = result.telephone;
				var arr			  = dataTelephone.split(" ");
				var codeArea	  = arr[0];
				var telephone	  = arr[1];
				
				//mobilePhone
				var dataMobile	= result.mobilePhone;
				var arrMobile	= dataMobile.split(" ");
				var codeProvider= arrMobile[0];
				var mobilePhone	= arrMobile[1];
				
				//dob
				var birthDateDD = result.birthDateDD;
				var birthDateMM = result.birthDateMM;
				var birthDateYY = result.birthDateYYYY;
				var bulan       = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
				var batasHari   = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
				var hariIni     = new Date();
				var batasTahun  = hariIni.getFullYear();				
				var strbln      = "", strtgl = "", strthn = "";
				for (i = 1; i <= 31; i++){
					var selected="";
					if (i == birthDateDD) selected="selected";
					strtgl += "<option " + selected + " value='" + i + "'>" + i + "</option>";
				}
				for (i = 1; i <= 12; i++){
					var selected="";
					if (i == birthDateMM) selected="selected";
					strbln += "<option " + selected + " value='" + i + "'>" + bulan[i-1] + "</option>";
				}
				for (i = batasTahun; i != (batasTahun-100); i--){
					var selected="";
					if (i == birthDateYY) selected="selected"; 
					strthn += "<option " + selected + " value='" + i + "'>" + i + "</option>";
				}
				$("#divDOB").html(
					  "<select name='birthDateDD' class='inputDate' id='birthDateDD'>" 
					+ strtgl
					+ "</select>"
					+ "<select name='birthDateMM' class='inputDate' id='birthDateMM'>" 
					+ strbln
					+ "</select>"
					+ "<select name='birthDateYY' class='inputDate' id='birthDateYY'>" 
					+ strthn
					+ "</select>"
				);
				$("#txtFirstName").val(result.firstName);
				$("#prefix").html(optionPrefix);
				$("#txtLastName").val(result.lastName); 
				$("#txtAddress").val(result.address);
				$("#txtCountry").val(result.country); 
				$("#txtProvince").val(result.province); 
				$("#txtCity").val(result.city); 
				$("#txtZipCode").val(result.zipCode);
				$("#txtTelephoneCodeArea").val(codeArea); 
				$("#txtTelephone").val(telephone); 
				$("#txtMobileCodeProvider").val(codeProvider);
				$("#txtMobilePhone").val(mobilePhone); 
				$("#txtCompanyName").val(result.companyName); 
				$("#txtCompanyAddress").val(result.companyAddress);
			}
		});
	});
	


	BPost.loadBPost("LatestNews", 5, function(news){
		var str = "";
		$("#bPostHeaderNews").html("<div class='postTitle'>" 
      		 + "<img src='css/bhinnekaImg/newsImg.jpg'" 
			 + "class='postImgHeader'>" 
        	 + "<span class='postCategoryHeader'>News</span>" 
      	 	 + "</div>");
		$.each(news, function(idx, berita){
			str += "<li class='listItemNewsDetail listItem clickable listItemBPost bordered'"
				   + "id='"+ berita.newsID + "'"
				   + "mob-newsID='" + berita.newsID + "'"
				   + ">"
				   + "<b>" + berita.newsTitle + "</b>"
				   + "<div class='categoryDate'>"
				   + berita.creatorDateTime
				   + "</div>"
				   + "</li>";
		});
		$("#listviewBPostNews").remove("li").html(str);
	});
	
	BPost.loadBPost("LatestReviews", 5, function(review){
		var str = "";
		$("#bPostHeaderReviews").html("<div class='postTitle'>" 
      		 + "<img src='css/bhinnekaImg/reviewImg.jpg'" 
			 + "class='postImgHeader'>" 
        	 + "<span class='postCategoryHeader'>Reviews</span>" 
      	 	 + "</div>");
		$.each(review, function(idx, ulasan){
			str += "<li class='listItemReviewDetail listItem clickable listItemBPost bordered'"
				   + "id='"+ ulasan.id + "'"
				   + "mob-reviewID='" + ulasan.id + "'"
				   + ">"
				   + "<b>" + ulasan.title + "</b>"
				   + "<div class='categoryDate'>"
				   + ulasan.creatorDateTime 
				   + "</div>"
				   + "</li>";
		});
		$("#listviewBPostReviews").remove("li").html(str);
	});
	
	BPost.loadDetail("NewsDetail", App.getPageParam('newsid'), function(news){
		if(!news.newerNewsTitle)
		{
			news.newerNewsTitle = "Ini adalah berita pertama";
		}
		if(!news.olderNewsTitle)
		{
			news.olderNewsTitle = "Ini adalah berita terakhir";
		}
		if(!!news.source1)
		{
			news.source1 = ", " + news.source1
		}
		if(!!news.url1)
		{
			news.url1 = ", " + news.url1
		}
		var str = "";
		str += "<div class='articlePad'>"
				   + "<div style='margin-top: 14px;'>"
				   + "<h1 class='articleTitle'>"
				   + "<span>" + news.newsTitle + "</span></h1></div>"
				   + "<div style='margin-top: -10px;'>"
            	   + "<span class='articleSubTitle'>Posted: " + news.creatorDateTime + "</span><br>"
            	   + "<span class='articleSubTitle'>Viewed: " + news.viewCount + "</span></div>"
				   + "<div style='margin-top: 7px;'><span>"
				   + news.isi + "</span></div>"
				   + "<div class='articleSource'>"
                   + "<div class='articleSourceLabel'><b>Editor</b></div>"
                   + "<div class='articleSourceContent'>:&nbsp;<span>" + news.reporter + "</span></div></div>"
				   + "<div class='articleSource'>"
                   + "<div class='articleSourceLabel'><b>Source</b></div>"
                   + "<div class='articleSourceContent'>:&nbsp;<span>" + news.source + "</span>"
				   + "<span>" + news.source1 + "</span></div></div>"
				   + "<div class='articleSource'>"
                   + "<div class='articleSourceLabel'><b>URL</b></div>"
                   + "<div class='articleSourceContent'>:&nbsp;<a class='articleSourceURL' href='" + news.url + "'>"
				   + news.url + "</a>"
				   + "<a class='articleSourceURL' href='" + news.url1 + "'>" + news.url1 + "</a></div></div>"
				   + "<div style='margin: 14px 0;'></div></div>"
				   + "<div><div id='btnPreviousNewsDetail'" 
				   + "mob-newsID='" + news.newerNewsID + "'"
				   + "class='listItemNewsDetail previousLink nextpreLink arrowPreLink clickable'>"
				   + "<b id='titlePrevious' style='padding-left:11px;'>Previous Post</b><div class='articleContentCode'>"
				   + news.newerNewsTitle + "</div></div>"
				   + "<div id='btnNextNewsDetail'"
				   + "mob-newsID='" + news.olderNewsID + "'"
				   + "class='listItemNewsDetail nextLink nextpreLink arrowNxtLink clickable'>"
				   + "<b id='titleNext' style='padding-right:22px;'>Next Post</b><div class='articleContentCode'>"
				   + news.olderNewsTitle + "</div></div>"
		$("#newsDetailBody").html(str);
		
		if(news.newerNewsTitle == "Ini adalah berita pertama")
		{
			jQuery("#btnPreviousNewsDetail").removeClass('clickable').addClass('articlePrevNextContent');
			jQuery("#btnPreviousNewsDetail").removeClass('listItemNewsDetail');
			jQuery("#titlePrevious").addClass('articlePrevNextContent');
		}
		if(news.olderNewsTitle == "Ini adalah berita terakhir")
		{
			jQuery("#btnNextNewsDetail").removeClass('clickable').addClass('articlePrevNextContent');
			jQuery("#btnNextNewsDetail").removeClass('listItemNewsDetail');
			jQuery("#titleNext").addClass('articlePrevNextContent');
		}
	});
	


	function emptyOrderTrackingResult(){
		$("#orderTrackingResult").empty().addClass('hidden');
		$("#orderTrackingNote").removeClass('hidden');
		}
	function showOrderTrackingResult(result){
		var tracking, str = "";
		if (result == "") 
			str = "<div class='wrapper'>Maaf, order Anda saat ini belum terdata. Silakan cek kembali beberapa saat kemudian atau hubungi sales yang melayani Anda.</div>";
		else {
			tracking = result[0];
			str += "<span class='trackingResultLabel'>Tanggal Pesanan: </span>";
			str += "<span class='trackingResultValue'>" + tracking.OrderDate + "</span>";
			str += "<span class='trackingResultLabel'>No Sales Order: </span>";
			str += "<span class='trackingResultValue'>" + tracking.SalesOrderNo + "</span>";
			if (tracking.showSales){
				str += "<span class='trackingResultLabel'>Sales Officer: </span>";
				str += "<span class='trackingResultValue'>"; str += tracking.SalesName;
					str += "(<a href='mailto:"; str += tracking.SalesEmail; str += "'>";
						str += tracking.SalesEmail; 
					str += "</a>)";
				str += "</span>";
			}
			str += "<span class='trackingResultLabel'>Status Pembayaran: </span>";
			str += "<span class='trackingResultValue'>" + tracking.PaymentStatus + "</span>";
			str += "<span class='trackingResultLabel'>Status Pesanan: </span>";
			str += "<span class='trackingResultValue'>" + tracking.Status + "</span>";
			if (tracking.showEstimatedDeliveryDate){
				str += "<span class='trackingResultLabel'>Estimasi Pengiriman: </span>";
				str += "<span class='trackingResultValue'>"; 
				str += tracking.EstimatedDeliveryDate;
				str += "</span>";
				}
			if (tracking.showSentDate){
				str += "<span class='trackingResultLabel'>Tanggal Pengiriman: </span>";
				str += "<span class='trackingResultValue'>"; str += tracking.SentDate;
				if (tracking.Refference != '') {
					str += ", "; str += tracking.Refference;
				}
				str += "</span>";
				}
			if (tracking.showEstimatedArrivalDate){
				str += "<span class='trackingResultLabel'>Estimasi Sampai di Tujuan: </span>";
				str += "<span class='trackingResultValue'>"; 
				str += tracking.EstimatedArrivalDate;
				str += "</span>";
				}
			str += "<span class='trackingResultLabel'>Waktu Update Terakhir: </span>";
			str += "<span class='trackingResultValue'>" + tracking.LastUpdate + "</span>";
		}
		$("#orderTrackingNote").addClass('hidden');		
		$("#orderTrackingResult").html(str).removeClass("hidden");
		}
	$(document).delegate('#moreOrderTrackingPage', 'pageinit', function(){
		emptyOrderTrackingResult();		
		var idPesanan = App.getPageParam("mob-kodetrx");
		if (typeof (idPesanan) != 'undefined' && idPesanan != null && idPesanan != ""){
			$("#txtIDPesanan").val(idPesanan);
			App.doJsonp(Config.ciURL + "trx/orderTracking", "no=" + idPesanan, function(result){
					showOrderTrackingResult(result);
					App.setPageParam("mob-kodetrx", "");
					});
			}	
		});
    


	PromoList.load(function(result){
		var str = "";
		var arr = [];
		var promoImageURL = "";
		$.each(result, function(idx, record){
			if (record.mobImage == "" || record.mobImage == null)
				promoImageURL =  Config.webURL + escape(record.ImageURL);
			else
				promoImageURL = Config.fileURL + escape(record.mobImage);
			str += "<li class='promoListMenuItem listItem clickable' "
			+ " id='" + record.PromoID + "'" // Sf.
			+ " mob-promoImageID='" + record.PromoID + "'" // Sf.
			+ " mob-promoName='" + record.PromoName + "'"
			+ " mob-promoType='filteredPromo'"
			+ " mob-promoID='" + record.PromoID + "'"
			+ " mob-promoImage='" + promoImageURL + "'"
			+ ">" 
				+   "<img "
				+	"src='css/bhinnekaImg/transparent.png' "
				+	"style='background-image:url(" + promoImageURL + ")'"
				+	"/>"
				+ 	"<div class='promoListMenuText'>" + record.PromoName + "</div>"
			+ "</li>";
		});
		$("#promoListUL").html(str
			/**NEW ARRIVAL**/
			+ "<li class='promoListMenuItem listItem clickable' "
			+ " id='1'" // Sf.
			+ " mob-promoImageID='1'" // Sf.
			+ " mob-promoType='filteredHighlight'"
			+ " mob-promoID='1'"
			+ " mob-promoImage='" + Config.localImagesFolder + "promoList/promoIconNewArrival'" // img belum di sett
			+ ">"
			+	"<img "
			+	" src='css/bhinnekaImg/transparent.png' "
			+	" style='background-image:url(" + Config.localImagesFolder + "promoList/promoIconNewArrival_c.png)'" 
			+	" class='1 highlightInstallment'" 
			+	"/>"
			+	"<div class='promoListMenuText'>New Arrival</div>"
			+ "</li>"
			/**HOT ITEMS**/
			+ "<li class='promoListMenuItem listItem clickable' "
			+ " id='3'" // Sf.
			+ " mob-promoImageID='3'" // Sf.
			+ " mob-promoType='filteredHighlight'"
			+ " mob-promoID='3'"
			+ " mob-promoImage='" + Config.localImagesFolder + "promoList/promoIconHotItem'" // img belum di sett
			+ ">"
			+	"<img "
			+	" src='css/bhinnekaImg/transparent.png' "
			+	" style='background-image:url(" + Config.localImagesFolder + "promoList/promoIconHotItem_c.png)'" 
			+	" class='3 highlightInstallment'" 
			+	"/>"
			+	"<div class='promoListMenuText'>Hot Items</div>"
			+ "</li>"
			/**PROMOTION SALE**/
			+ "<li class='promoListMenuItem listItem clickable' "
			+ " id='2'" // Sf.
			+ " mob-promoImageID='2'" // Sf.
			+ " mob-promoType='filteredHighlight'"
			+ " mob-promoID='2'"
			+ " mob-promoImage='" + Config.localImagesFolder + "promoList/promoIconSale'"
			+ ">" 
			+	"<img "
			+	" src='css/bhinnekaImg/transparent.png' "
			+	" style='background-image:url(" + Config.localImagesFolder + "promoList/promoIconSale_c.png)'" 
			+	" class='2 highlightInstallment'" 
			+	"/>"
			+	"<div class='promoListMenuText'>Promotion Sale</div>"
			+ "</li>"
			/**LIMITED STOCK**/
			+ "<li class='promoListMenuItem listItem clickable' "
			+ " id='4'" // Sf.
			+ " mob-promoImageID='4'" // Sf.
			+ " mob-promoType='filteredHighlight'"
			+ " mob-promoID='4'"
			+ " mob-promoImage='" + Config.localImagesFolder + "promoList/promoIconLimited'"
			+ ">" 
			+   "<img "
			+	" src='css/bhinnekaImg/transparent.png' "
			+	" style='background-image:url(" + Config.localImagesFolder + "promoList/promoIconLimited_c.png)'" 
			+	" class='4 highlightInstallment'" 
			+	"/>"
			+ 	"<div class='promoListMenuText'>Limited Stock</div>"
			+ "</li>"
			/**INSTALLMENT**/
			+ "<li class='promoListMenuItem listItem clickable' "
			+ " id='0'" // Sf.
			+ " mob-promoImageID='0'" // Sf.
			+ " mob-promoType='filteredInstallment'"
			+ " mob-promoID=''"
			+ " mob-promoImage='" + Config.localImagesFolder + "promoList/promoIconInstallment'"
			+ ">" 
			+   "<img "
			+	" src='css/bhinnekaImg/transparent.png' "
			+	" style='background-image:url(" + Config.localImagesFolder + "promoList/promoIconInstallment_c.png)'" 
			+	" class='0 highlightInstallment'" 
			+	">"
			+ 	"<div class='promoListMenuText'>Installment</div>"
			+ "</li>"
		);
	});
    


	$(document).delegate('#moreContactUsPage', 'pageinit', function(){
		var str = "";
		$.each(Config.contactCenter, function(idx, contact){
			str += "<a href='" + contact.contactType + ":" + contact.contactValue + "'"
				+ " target='_blank' class='anchorList clickable " 
					+ contact.contactTypeClass + "List '>"
				+         "<div class='contactDisplayLabel'>" 
								+ contact.displayLabel 
						+ " </div> "
				+  		  "<div class='contactDisplayPhone'> " 
								+ contact.displayContact 
						+ "</div>"
				+  "</a>";
			});
		str += "<a href='#' id='contactCare'"
			+ " target='_blank' class='anchorList clickable " 
				+ "contactUsMailList '>"
			+         "<div class='contactDisplayLabel'>" 
							+ "Email" 
					+ " </div> "
			+  		  "<div class='contactDisplayPhone'> " 
							 
					+ "</div>"
			+  "</a>";
		$("#contactListDiv").html(str);
		str = "";
		App.onClick($("#contactCare"), function($self){
			App.changePage("visitorEmail.html");
			});
		});
    


	function loadBrands(){
		ProductList.loadBrands(App.getPageParam('listType'), App.getPageParam("listValue"), function(result){
			$brandComboBox = $("#brandComboBox");
			// save default brandID
			var str = "";
			if (result.length > 1){
				str = "<option value='' mob-brandName='- Select -'>Select</option>";
				}
			$.each(result, function(idx, record){
				str += "<option value='" + record.brandID + "' mob-brandName='" + record.brandName + "'>" + record.brandName + "</option>";
				});
			$brandComboBox.html(str);
			$brandComboBox.selectmenu("refresh");
			});
		}
	function showProductList(){
		/**GET STATUS**/
		var statusView	= App.getPageParam("statusView");
		var statusGrid	= App.getPageParam("statusGrid");
		var statusList	= App.getPageParam("statusList");
		
 		var  $ul = $("#productListUL")
		   , $ender = $("#ender")
		   , $title = $("#productListTitle")
		   , listType  = App.getPageParam('listType')
		   , listValue = App.getPageParam('listValue')
		   , listName  = App.getPageParam('listName')
		   ;
		if (listType == 'filteredHighlight'){
			/**NEW ARRIVAL**/
		 	if (listValue == 1){
				$title.html("New Arrival");
				$("#listName").css('display', 'none');
			/**HOT ITEMS**/
			}else if (listValue == 3){
				$title.html("Hot Items");
				$("#listName").css('display', 'none');				
			/**PROMOTION SALE**/
			}else if(listValue == 2){
				$title.html("Promotion Sale");
				$("#listName").css('display', 'none');	
			/**PROMOTION SALE**/
			}else if(listValue == 4){
				$title.html("Limited Stock");
				$("#listName").css('display', 'none');	
			}
		/**INSTALLMENT**/
		}else if (listType == 'filteredInstallment'){   
			$title.html("Installment");			
			$("#listName").css('display', 'none');    
		/**PROMO : HR, MD, SSP**/
		}else{
			$title.html(listName);	
			$("#listName").css('display', 'none'); // hidden icon
			if (listType == 'keyword'){
				$("#brandComboBoxWrapper").addClass('hidden');
				$("#sortComboBoxWrapper").addClass('hidden');
			}
		}
		// $ender.addClass('loader').html('Loading...');
		$ender.addClass('hidden');
		ProductList.loadInfo(listType, listValue, function(result, savedIDs, ender){
			var arr = [], arrprice = [], li;
			if (result != null && result.info != null){
				$.each(result.info, function(idx, record){
					if (record.r != null){							
						p		 = Product.parseRecord(record.r, record.s);
						arrID	 = savedIDs.indexOf(p.partID);					  
						arrprice = [];
						str 	 = "";
						soldOutClass = "available ";
						soldOutText  = "<div> </div>";
						if (p.remainingQty <= 0) {
							soldOutClass = "soldOut ";
							soldOutText  = "<div class='soldOutText'>(Sold Out)</div>";
						}
						/**PRODUCT PRICE**/
						if (p.specialPrice != '-' || p.hasPromo == true) {
							arrprice.push("<div class='priceLabel'>Normal Price </div><div class='priceEqual'>:</div>");
							arrprice.push("<div class='normalPrice coretText'>Rp." 
							+ App.numberFormat(p.price) 
							+ "</div><br />");
							/**PRODUCT PRICE**/
							if (p.specialPrice != '-'){
								arrprice.push("<div class='priceLabel '>Special Price </div><div class='priceEqual specialPrice'>:</div>");
								arrprice.push("<div class='specialPrice '>Rp." 
								+ App.numberFormat(p.specialPrice) 
								+ "</div><br />");
								arrprice.push("<div class='priceLabel youSave '>You Save </div><div class='priceEqual'>:</div>");
								arrprice.push("<div class='yousave'>Rp." 
								+ App.numberFormat(p.price - p.specialPrice) 
								+ "</div>");
								arrprice.push("<div> </div>");
							} 
							if (p.hasPromo == true) {
								//arrprice.push("<div class='imgLabel'><img src='" + Config.webURL + p.promoImage  + "' class='priceLabelImg'/></div>"
								arrprice.push("<div class='specialPrice'>Khusus Promo " + p.promoName + "</div>"
								+ "<div class='priceEqual specialPrice " + soldOutClass + "'>:</div>");
								arrprice.push("<div class='specialPrice " + soldOutClass  + "'>Rp. " 
								+ App.numberFormat(p.promoPrice)
								+ "</div>" + soldOutText);
								//arrprice.push("<br />");
								arrprice.push("<div class='priceLabel " + soldOutClass + " youSave '>You Save</div>"
								+ "<div class='priceEqual " + soldOutClass + "'>:</div>");
								arrprice.push("<div class='yousave " + soldOutClass + "'>Rp." 
								+ App.numberFormat(p.price - p.promoPrice) 
								+ "</div>");		
								if (p.isQtyShown == "1"){
									arrprice.push("<div> </div>");
									arrprice.push("<div class='priceLabel " + soldOutClass + "'>Remaining</div>");
									arrprice.push("<div class='remaining " + soldOutClass + "'>: " 
									+ p.remainingQty + " of " + p.qty 
									+ "</div>");	
									arrprice.push("<br />");
								}
							}
						}else{ 
							arrprice.push("<div class='normalPrice'>Rp. " 
							+ App.numberFormat(p.price) 
							+ "</div>");
						}
						/**PRODUCT RATE AND REVIEW**/
						productRating = "";
						productTotalReview = "";
						if (p.rating > 0){
							productRating 
								= "<div class='productRating'>" 
									+ "<div class='ratingScore' style='width:" 
									+ (p.rating * 20) + "%'></div>" 
								+ "</div>";
							productTotalReview = "<div class='productTotalReview'>(" + p.totalReview + " " + ((p.totalReview > 1) ? "reviews" : "review") + ")</div>";
							}
						
						/**PRODUCT CATEGORY**/
						highlightClass = (p.highlight == "New") ? "productLINew" 
							: (p.highlight == "Sales") ? "productLISale" 
							: (p.highlight == "Hot") ? "productLIHot" 
							: (p.highlight == "Limited Stock") ? "productLILimited" 
							: "";
						/**MURAH MAKSIMAL**/
						strMurahMaksimal = (p.murahMaksimal == "1") ? "<img class='productMurahMaksimal' src='css/bhinnekaImg/murahMaksimalIcon.png' />" : "";
						/*************/	
						/**LIST ITEM**/
						/*************/
						strLI  = "";
						strLI += "<li class='productLI clickable "; strLI += highlightClass;
						strLI += "' mob-productID='"; strLI += p.partID; 
						strLI += "' mob-highlightClass='"; strLI += highlightClass; // send highlightClass to js.
						strLI += "'>";
							  strLI += "<div class='rightArrow'>";
									//**PRODUCT IMAGE**
									strLI += "<img src='"; strLI += Config.thumbnailURL + p.image;
									strLI += "' onerror='this.src=\"css\/bhinnekaImg\/noProductThumbnail.jpg\"' ";
									strLI += "class='productImg' />";
									strLI += strMurahMaksimal;
									strLI += "<div class='wrapperNameRate'>";
										//**PRODUCT NAME**
										strLI += "<div class='productName'>";
										strLI += p.name;
										strLI += "</div>";
										//**PRODUCT CATEGORY**
										strLI += "<div class='productCat'>";
										strLI += p.category;
										strLI += "</div>";
										//**PRODUCT RATE**
										strLI += "<div class='productRate'>";
										strLI += productRating;
										strLI += "</div>";
										//**PRODUCT TOTAL REVIEW**
										strLI += "<div class='productTotalReview'>";
										strLI += productTotalReview;
										strLI += "</div>";
									strLI += "</div>";
									//**PRODUCT DESC**
									strLI += "<div class='productDesc'>";
									strLI += p.desc;
									strLI += "</div>";
									//**PRODUCT PRICE**
									strLI += "<div class='productPrice'>";
									strLI += arrprice.join('');
									strLI += "</div>";
							  strLI += "</div>";
						strLI += "</li>";
						arr[arrID] = strLI;
					  }
				});
			}
			$("#productViewGrid").attr({ "class": statusGrid }); 
			$("#productViewList").attr({ "class": statusList }); 
			$ul.attr({ "class": statusView });
			$ul.append(arr.join(''));
			//if ($ul.html() == '') $ul.append(arr.join('')).listview().listview('refresh');
			//else $ul.append(arr.join('')).listview('refresh');
			if ($ul.html() == '') ender = "No Result";
		  	$ender.empty().html(ender).removeClass('hidden').addClass('enderResult');
		});
	}
	function clearProductList(){
		listFormat = App.getPageParam("listFormat");
		if (listFormat == 'text')
			$("#listName").html(App.getPageParam("listName"));
		else if (listFormat == 'image') 
			$("#listName").html("<img src='" + App.getPageParam("listName") + "' />");
		ProductList.clear();
		$("#productListUL").empty();
		}
	$(document).delegate('#productListPage', 'pageinit', function(event){
		if (event.handled == true) return ;
		event.handled = true;
		
		$("#brandComboBox").live('change', function(brandEvent){
			if (brandEvent.handled == true) return ;
			brandEvent.handled = true;
			// remove all filter
			ProductList.removeFilter({
				includeBrandID: "*"
				});
			// save new brand
			ProductList.addFilter({
				includeBrandID: $(this).val()
				});
			$selectedOption = $("#brandComboBoxWrapper").find(":selected" );
			App.setPageParam('ProductList-selectedBrandID', $(this).val());
			App.setPageParam('ProductList-selectedBrandName', $selectedOption.attr('mob-brandName'));
			$("#brandComboBoxWrapper").find('.ui-btn-text').html($selectedOption.attr('mob-brandName'));
			clearProductList();
			showProductList();
			return ;
			});
		$("#sortComboBox").live('change', function(sortEvent){
			if (sortEvent.handled == true) return ;
			sortEvent.handled = true;
			var val = $(this).val();
		
			if (val == '')
				ProductList.setSort('', '');
			else {
				param = val.split("-");
				ProductList.setSort(param[0], param[1]);
				}
			$selectedOption = $("#sortComboBoxWrapper").find(":selected" );				
			App.setPageParam('ProductList-selectedSort', $(this).val());
			App.setPageParam('ProductList-selectedSortType', $selectedOption.attr('mob-sortType'));
			$("#sortComboBoxWrapper").find('.ui-btn-text').html($selectedOption.attr('mob-sortType'));
			clearProductList();
			showProductList();		
			return ;
			});
		
		if (Config.cacheProductList == true){
		 	if (ProductList.isNew && 
				(ProductList.loadFromCache != "" 
				|| ProductList.loadFromCache != null 
				|| ProductList.loadFromCache != undefined)){
				ProductList.isNew = false;
				loadBrands();
				}
			else {
				$("#productListContent").html(ProductList.loadFromCache());
				//$("#productListUL").listview();
				return ;
			}
		}
		clearProductList();
		showProductList();
		
		App.onClick($(".productMurahMaksimal"), function($self){
			ProductList.saveToCache($("#productListContent"));
			App.setPageParam("landingPageName", "murahMaksimal");
			App.setPageParam("landingPageCreatorDateTime", "20140502");
			App.changePage("landingPage.html");
			});
		return ;
		});
    

// JavaScript Document
var MobilePush = function(){
	var pushNotification, pushStatus;
	return {
		getStatus: function(){
			pushStatus = window.localStorage.getItem('pushStatus');
			if (pushStatus == null){
				window.localStorage.setItem('pushStatus', '1');
				pushStatus = '1';
			}
			return (pushStatus == '1') ? true : false;
			},
		setStatus: function(status){
			if (status == true){
				pushStatus = '1';
				}
			else {
				pushStatus = '0';
				}
			window.localStorage.setItem('pushStatus', pushStatus);
			},
		create: function(){
			pushNotification = window.plugins.pushNotification;
			pushNotification.onDeviceReady();
			
			pushNotification.registerDevice({
				projectid: Config.googleProjectID,
				appid: Config.pushWooshID,
				}, function(status){
					var pushToken = status;
					console.warn('pushToken: ' + pushToken);
					MobilePush.setStatus(true);
					// alert("register success");
				}, function(status){
					console.warn(JSON.stringify(['failed to register', status]));	
					// alert("register error");
				});
			
			document.addEventListener('push-notification', function(event){
				var title = event.notification.title;
				var userData = event.notification.userdata;
				if (typeof(userData) != "undefined"){
					console.warn('userData: ' + (userData));
					userData = JSON.parse(userData);
					console.warn ('pageName: ' + userData.pageName);
					console.warn ('pageParams: ' + userData.pageParams);
					}
				var pageName = userData.pageName;
				var pageParams = userData.pageParams.split("||");
				$.each(pageParams, function(idx, param){
					var p = param.split("=");
					App.setPageParam(p[0], p[1]);
					});
				App.changePage(pageName);
				// pushMessage = title.split("#")[0]; // deprecated
				// MobilePush.processNotification(title); // deprecated
				// MobilePush.log(event);
				}, false);
			},
		log: function(data){
			// App.setPageParam('pushMessage', JSON.stringify(data));
			// App.changePage("pushNotifDetail.html");
			alert(JSON.stringify(data));
			},
		destroy: function(){
			pushNotification.unregisterDevice(
				function(status){			
					// alert("unregister success");
				}, function(status){
					// alert("unregister error");				
				});
			MobilePush.setStatus(false);	
			},
		processNotification: function(data){
			try {		
				pushData = data.split("#"); // xxxxxxxxxxxxxxx #999
				pushID = pushData[1];
				if (typeof(pushID) == "undefined"){
					return ;
					}
				App.setPageParam('pushMessage', pushData[0]);
				App.setPageParam('pushID', pushData[1]);
				App.doJsonp(Config.ciURL + "appController/pushNotification/mobile"
					, "pushID=" + pushID, function(pushJSON){
					$.each(pushJSON, function(idx, rec){
						// paramName=paramValue|paramName=paramValue|...
						params = rec.pageParams.split('|');
						contentType = rec.pushType;
						par = [];
						$.each(params, function(idx, param){
							p = param.split('='); 
							par[p[0]] = p[1];
							});
						App.setPageParam('listFormat','text');
						App.setPageParam('listName', '');
			
						if (contentType == 'cat'){
							ProductList.isNew = true;
							ProductList.removeFilter({
								includeCatID: "*",
								excludeCatID: "*",
								includeBrandID: "*",
								excludeBrandID: "*"
								});
							ProductList.addFilter({
								includeCatID: par['includeCatID'],
								includeBrandID: par['includeBrandID']
								});
							
							App.setPageParam('listType', 'filter');
							App.setPageParam('listValue', '');
							}
						else if (contentType == 'promo'){
							ProductList.isNew = true;							
							App.setPageParam('listType', 'filteredPromo');
							App.setPageParam('listValue', par['promoID']);
							}
						else if (contentType == 'keyword'){
							ProductList.isNew = true;							
							App.setPageParam('listType', 'keyword');
							App.setPageParam('listValue', par['keyword']);
							}
						else if (contentType == 'partID'){
							App.setPageParam('partID', par['partID']);
							}
						App.setPageParam('pushPageName', rec.pageName);
						App.changePage("pushNotifDetail.html");
						return ;
						});
					});
			} catch(ex){
				alert(ex.name + "-" + ex.message);	
				}
			}
		}
	}();

// JavaScript Document
var Config = function(){
	var
		/* local *//*
		platform = "android",
		appVersionCode = "1203",
		php = "http://apps.bhinneka.com/",
		web = "http://www.bhinneka.com/",
		mweb = "http://www.bhinneka.com/mobile/",
		gaID = "UA-31384543-1",
		pwID = "22B4F-9F54B", // "2E0CD-9677F", // android
		gpID = "729173091587",
		email = "benita.clarissa@bhinneka.com",
		inMobiID = "4028cba631d63df10131e1d3818b00cc",
		houseAdPath = "css/bhinnekaImg/houseAd.jpg",
		houseAdLink = "http://www.bhinneka.com/forum",
		wcf = "https://10.0.14.32/app/WCFService/mobService.svc/",
		wcfFolder = "https://www.bhinneka.com/app/WCFService/"
		; */
		 
		/*production */
		platform = "android",
		appVersionCode = "1203",
		php = "http://apps.bhinneka.com/",
		web = "http://www.bhinneka.com/",
		mweb = "http://www.bhinneka.com/mobile/",
		gaID = "UA-4593965-3",
		pwID = "9B91A-441CF",
		gpID = "940644195808", 
		email = "vensia@bhinneka.com",
		inMobiID = "c0e07df44b09457bb3e7d96b6c363ad5",
		houseAdPath = "css/bhinnekaImg/houseAd.jpg",
		houseAdLink = "http://www.bhinneka.com/forum",
		wcf = "https://www.bhinneka.com/app/WCFService/mobService.svc/",
		wcfFolder = "https://www.bhinneka.com/app/WCFService/"
		;
		 
	return {
		// web link
		phpURL: php,
		webURL: web,
		mobileWebURL: mweb,
		ciURL: php + "index.php/",
		fileURL: php + "file/",
		imagesURL: web + 'images/',
		thumbnailURL: web + 'data/thumbnail_product/',
		logoBrandURL: web + 'Data/logo_brand/',
		imageProductURL: web + 'Data/image_product/',
		imageProduct500x500URL: web + 'Data/image_product_500x500/',
		localImagesFolder: 'css/bhinnekaImg/',
		webServiceURL: wcf,
		webServiceFolderURL: wcfFolder,

		// feature
		appVersionCode: appVersionCode,		
		cacheProductList: true,
		platform: platform,
		
		// id
		analyticsID: gaID,
		pushWooshID: pwID,
		googleProjectID: gpID,
		
		//bPost
		counter: 10,
		endDate: new Date("December 31, 2014 23:59:59"),
		
		inMobiAppID: { // real
			"android": "c0e07df44b09457bb3e7d96b6c363ad5",
			"iOS": "605c2b15340f45299fcdd1876d108357",
			"WindowsPhone": "b289c58aebac4a3db0e0183a4deefbc4"
			},

		// ad config
		houseAd: '<a target="_top" href="' + houseAdLink + '"><img width="320" height="50" alt="Bhinneka.Com" src="' + houseAdPath + '"></a>',
		
		// email
		feedbackEmailAddress: email,
		feedbackEmailSubject: 'Mobile%20App%20Feedback',
		
		// contact type
		contactNumber: {
			email: {
				value: "care@bhinneka.com",
				text: "care@bhinneka.com"
				},
			sms: {
				value: "+628121238000",
				text: "0812-123-8000"
				},
			phone: {
				value: "+62212929828",
				text: "021-2929-2828"
				}	
		},
		
		// contact
		contactCenter: [
		{contactType: "tel",
		 displayLabel: "Contact Center",
		 displayContact: "021-2929-2828",
		 contactValue: "+62212929828",
		 contactTypeClass: "contactUsPhone"},

		{contactType: "tel",
		 displayLabel: "Service Center",
		 displayContact: "021-2929-2828",
		 contactValue: "+62212929828",
		 contactTypeClass: "contactUsService"},
		 
		{contactType: "sms",
		 displayLabel: "SMS Center",
		 displayContact: "0812-123-8000",
		 contactValue: "+628121238000",
		 contactTypeClass: "contactUsSMS"}
		 /*,
		{contactType: "mailto",
		 displayLabel: "Email",
		 displayContact: "care@bhinneka.com",
		 contactValue: "care@bhinneka.com",
		 contactTypeClass: "contactUsMail"}
		 */
		],
		
		storeLocation: [
		{"id": "1", 
		 "title": "Gunung Sahari HO",
		 "address":"Jl. Gunung Sahari Raya 73C #5-6 Jakarta 10610", 
		 "contactNo": {
			 "Phone": "(021)2929-2828",
			 "Fax": "(021)4257787"
			 },
		 "lat": "-6.165661", "lng": "106.839078", 
		 "icon": "css/bhinnekaImg/GunungSahari.jpg",
		 "info": "Jl. Gunung Sahari Raya 73C No. 5-6<br />GPS Waypoint: -6.165661 (latitude) & 106.839078 (longitude)<br />Phone: (021)2929-2828<br />Fax: (021) 4257787<br />Open: Mon-Fri (08.30-19.00 WIB), Sat(09.00-16.00 WIB)"},
		 {"id": "2", 
		 "title": "Photography Store by Bhinneka.Com",
		 "address":"Jl. Gunung Sahari Raya 73C #5-6 Jakarta 10610", 
		 "contactNo": {
			 "Phone": "(021) 42888-288",
			 "Fax": "(021)4257787"
			 },
		 "lat": "-6.165661", "lng": "106.839078", 
		 "icon": "css/bhinnekaImg/GunungSahari.jpg",
		 "info": "Jl. Gunung Sahari Raya 73C No. 5-6<br />GPS Waypoint: -6.165661 (latitude) & 106.839078 (longitude)<br />Phone: (021)42888-288<br />Fax: (021) 4257787<br />Open: Mon-Sun (09.45-18.45 WIB)"},
		{"id": "3", 
		 "title": "Mangga Dua Mall", 
		 "address": "Mangga Dua Mall Lt. 3 No. 48-49", 
		 "contactNo": {
			 "Telp": "(021)62301383 / 62202226",
			 "Fax": "(021)62301381"
			 },
		 "lat": "-6.13686", "lng": "106.82425", 
		 "icon": "css/bhinnekaImg/ManggaDuaMall.jpg",
		 "info": "Mangga Dua Mall Lt. 3 No. 48-49<br />GPS Waypoint: -6.136860 (latitude) & 106.824250 (longitude)<br />Telp: (021) 62301383 / 62202226   Fax: (021) 62301381<br />Open:  Mon-Sat (10.00-18.45 WIB), Sun (10.00-16.00 WIB)"}, 
		{"id": "4", 
		 "title": "Poins Square ", 
		 "address": "Poins Square Lt. 2 No. 88-89", 
		 "contactNo": {
			 "Telp": "(021)75909567",
			 "Fax": "(021)75909367"
			 },		 
		 "lat": "-6.288084", "lng": "106.777711", 
		 "icon": "css/bhinnekaImg/PoinsSquare.jpg",
		 "info": "Poins Square Lt. 2 No. 88-89<br />GPS Waypoint: -6.290174 (latitude) & 106.777464 (longitude)<br />Telp: (021) 75909567   Fax: (021) 75909367<br />Open: Mon-Sun (10.00-18.45 WIB)"}, 
		{"id": "5", 
		 "title": "Cibubur Junction", 
		 "address": "Cibubur Junction Lt. 2 No. 47-49", 
		 "contactNo": {
			 "Telp": "(021)87756770"
			 },		 
		 "lat": "-6.351469", "lng": "106.891479", 
		 "icon": "css/bhinnekaImg/CibuburJunction.jpg",
		 "info": "Cibubur Junction Lt. 2 No. 47-49<br />GPS Waypoint: -6.369851 (latitude) & 106.894355 (longitude)<br />Telp: (021) 87756770<br />Open: Mon-Sun (10.00-21.00 WIB)"},
		{"id": "6", 
		 "title": "HP Ratu Plaza", 
		 "address": "Ratu Plaza Lt. 1 No. 7A", 
		 "contactNo": {
			 "Telp": "(021)7203032"
			 },
		 "lat": "-6.226534", "lng": "106.801341", 
		 "icon": "css/bhinnekaImg/RatuPlaza.jpg",
		 "info": "Ratu Plaza Lt. 1 No. 7A<br />GPS Waypoint: -6.226534 (latitude) & 106.801341 (longitude)<br />Telp: (021) 7203032<br />Open: Mon-Sat (10.00-18.45 WIB), Sun Week 1 & 4 (10.00-16.00 WIB)"},
		{"id": "7", 
		 "title": "HP Store Mangga Dua Mall",
		 "address": "Mangga Dua Mall Lt. 2 No. 8B", 
		 "contactNo": {
			 "Telp": "(021)6126687"
			 },		 
		 "lat":"-6.136860", "lng":"106.824250", 
		 "icon": "css/bhinnekaImg/HPStoreM2M.jpg",
		 "info": "Mangga Dua Mall Lt. 2 No. 8B<br />GPS Waypoint: -6.136860 (latitude) & 106.824250 (longitude)<br />Telp: (021) 6126687<br />Open: Mon-Sat (10.00-18.45 WIB), Sun (10.00-16.00 WIB)"}
		]
		}
	}();

// Javascript Document
// Helper.js
function loadImage($element, imagePath){
	$element.attr("src", imagePath);
	ImgCache.isCached(imagePath, function(path, success){
	  if(success){
		// already cached
		ImgCache.useCachedFile($element);
	  } else {
		// not there, need to cache the image
		ImgCache.cacheFile(imagePath, function(){
		  ImgCache.useCachedFile($element);
		});
	  }
	});
	}
// Benita Clarissa - 2014 02 21


// JavaScript Document
var InMobi = function(){
	var url = Config.ciURL + "appController/showAd";
	var appID = Config.inMobiAppID[Config.platform];
	return {
		installAd: function(pageSelector, containerSelector){
			App.onClick($(containerSelector + " a"), function($self){
				App.openChildBrowser($self.attr('href'), '');
				});
			$(document).delegate(pageSelector, 'pageshow', function(){			
				$page = $(this);
				$adSlot = $page.find(containerSelector);
				if ($adSlot.length > 0)	{
					$adSlot.html(Config.houseAd);
					InMobi.loadAd($adSlot);
					}
				});
			},
		loadAd: function($container){
			$.ajax({
				url : url,
				type : "GET",
				data: 'appID=' + appID,
				cache: false,
				dataType: "jsonp",
				timeout: 7500,
				success : function(result){
					if (result){
						if (result.adAnchor != "") $container.html(result.adAnchor);
						}
				}
			});	
			}
		}
	}();

// JavaScript Document
var Product = function(){
	var lastInformation, lastSpec, lastReview, lastOverview;
	function resetData(){
		lastInformation = null;
		lastSpec = "";
		lastReview = "";
		lastOverview = "";
		}
	return {
		partID: "",
		parseRecord: function(productStr, productStrS) {
			var arr = productStr.split('##');
			var obj = {};
			obj.partID	     = arr[0];
			obj.name	     = arr[1];
			obj.desc	     = arr[2];
			obj.image	     = arr[3];
			obj.highlight    = arr[4];
			obj.rating	     = arr[5];
			obj.ppn		     = arr[6];
			obj.price	     = arr[7];
			obj.specialPrice = arr[8];
			if (arr.length > 9){	
				obj.hasPromo     = true;
				obj.promoImage   = arr[9];
				obj.promoPrice   = arr[10];
				obj.remainingQty = arr[11];
				obj.qty          = arr[12];
				obj.isQtyShown   = arr[13];
				obj.promoName    = arr[14];
			}else obj.hasPromo   = false;
			
			//record S
			var arrS = productStrS.split('##'); 
			obj.category = arrS[0];
			obj.totalReview = arrS[1];
			obj.murahMaksimal = arrS[2];
			return obj;
			},
		loadDetail: function(partID, callback){
            if (Product.partID == partID && lastInformation != "" && lastOverview != "" && lastSpec != "") {
				callback(lastInformation, lastOverview, lastSpec);
				}
			else {
				App.doJsonp(Config.ciURL + "productController/loadInformationAndSpec", "partID=" + partID, function(result){
					if (Product.partID != partID){
						resetData();
						}
					Product.partID = partID;
					lastInformation = result.info;
					overviewstr = "";
					specstr = ""; 
					specName = ""; 
					li1 = ""; li2 = ""; li3 = ""; temp2 = "";
					helper1 = ""; helper2 = ""; helper3 = "";
					$.each(result.spec, function(idx, record){
							if (record.ParentID == " "){ // spec level 1
								// handle prev rec
								if (li1 != "" || li2 != "" || temp2 != "" || li3 != ""){
									str = li1;
									if (temp2 != "" && li3 != "")
										li2 += "<li>" + temp2 + "<ul>" + li3 + "</ul></li>";
									else if (temp2 != "") 
										li2 += "<li>" + temp2 + "</li>";
									temp2 = "";
									li3 = "";
									helper3 = "";

									if (li2 != "") 
										str += "<ul>" + li2 + "</ul>";

									helper1 = "";
									li1 = "";
									helper2 = "";
									li2 = "";
									
									if (specName == "Description"){
										overviewstr = str;
										if (overviewstr == "")
											overviewstr = "There is no overview for this product.";
										}
									else {
										// specstr += previous spec
											specstr += "<div class='productDetailSpec'>";
											specstr += "<div class='productDetailSpecLabel'>";
											specstr += specName;
											specstr += "</div>";
											specstr += "<div class='productDetailSpecValue'>";
											specstr += str;
											specstr += "</div>";
										specstr += "</div>";
									}
								}
								// handle current spec
								specName = record.Name;
								helper1 = record.Helper;
								li1 = record.Value;
								}
							else if (record.ParentID == helper1){ // spec level 2
								// handle prev rec (level 3)
								if (temp2 != "" && li3 != "")
									li2 += "<li>" + temp2 + "<ul>" + li3 + "</ul></li>";
								else if (temp2 != "") 
									li2 += "<li>" + temp2 + "</li>";
								li3 = "";
								helper3 = "";
								
								// handle current rec (level 2)
								helper2 = record.Helper;
								temp2 = record.Value;
								}
							else if (record.ParentID == helper2){ // spec level 3
								helper3 = record.Helper;
								li3 += "<li>" + record.Value + "</li>";
								}
						});
					// handle last rec
					if (li1 != "" || li2 != "" || temp2 != "" || li3 != ""){
						str = li1;
						if (temp2 != "" && li3 != "")
							li2 += "<li>" + temp2 + "<ul>" + li3 + "</ul></li>";
						else if (temp2 != "") 
							li2 += "<li>" + temp2 + "</li>";
						temp2 = "";
						li3 = "";
						helper3 = "";

						if (li2 != "") 
							str += "<ul>" + li2 + "</ul>";

						helper1 = "";
						li1 = "";
						helper2 = "";
						li2 = "";
						
						if (specName == "Description"){
							overviewstr = str;
							if (overviewstr == "")
								overviewstr = "There is no overview for this product.";
							}
						else {
							// specstr += previous spec
							specstr += "<div class='productDetailSpec'>";
							specstr += "<div class='productDetailSpecLabel'>";
							specstr += specName;
							specstr += "</div><br />";
							specstr += "<div class='productDetailSpecValue'>";
							specstr += str;
							specstr += "</div>";
							specstr += "</div>";
						}
					}
					if (overviewstr == ""){
						overviewstr = "There is no overview for this product";
						}
					if (specstr == ""){
						specstr = "<div class='productDetailSpec'>There is no detail for this product</div>";
						}
					lastOverview = overviewstr;
					lastSpec = specstr;
					callback(lastInformation, lastOverview, lastSpec);
					});
				}
			},
		loadImages: function(partID, callback){
			App.doJsonp(Config.ciURL + "productController/loadImages", "partID=" + partID, function(data){
				var str = "";
				$.each(data, function(idx, record){
					str += "<div class='productDetailImage'><img src='" + Config.imageProductURL + record.img + "' alt='" + partID + "' class='productDetailImage' /></div>";
					});
				callback(str, data.length);
				});
			},
		loadReview: function(partID, callback){
			if (Product.partID == partID && lastReview != '') callback(lastReview);
			else {
				App.doJsonp(Config.ciURL + 'store/productReview', 'product_id=' + partID, function(data){
					// ID, PartID, name, email, title, content, isverified, isnull(rating, 0) as rating, CreatorDateTime	
					var str = '', dstr = "", ratingstr = "";
					$.each (data, function(idx, review){
						dstr = "";
						if (review.CreatorDateTime != null){
							var d = new Date(review.CreatorDateTime.substr(0, 10));
							dstr = "on " + d.toLocaleDateString();
						}
						ratingstr = (review.rating > 0) ? 
							"<div class='reviewRating productRating'><div class='ratingScore' style='width:" 
								+ (review.rating * 20) + "%'></div></div>" 
							: "";
						str += "<div class='productReview whiteWrapper'>" +
								 "<div class='reviewTitle'>" + review.title + "</div>" +
								 //ratingstr +
								 "<div class='reviewName'>By " + review.name + ", " + dstr + " </div> " +
								 ratingstr + "<br>" +
								 "<div class='reviewContent'>" + review.content + "</div>" +
								 "<div class='reviewVote' align='right'>" +  
								 	review.voteYes + "<div class='reviewVoteYes'></div>" +
								  	review.voteNo + "<div class='reviewVoteNo'></div>" +
								  "</div>" + 
								  ((review.isFirst == 1) ? "<div class='reviewIsFirst'>First to Review</div>" : "") + 
								  ((review.isCertified == 1) ? "<div class='reviewIsCertified'>Certified Buyer</div>" : ((review.isUser == 1) ? "<div class='reviewIsUser'>I Own this Product</div>" : "")) + 
							   "</div>";
						}); 
					if (str == "") str = "<div class='whiteWrapper'>" + "No one has reviewed this product yet." + "</div>";
					
					if (Product.partID != partID) resetData();
					Product.partID = partID;
					lastReview = str;
					
					callback(str);
					});
				}
			},			
		submitReview: function(dataReview, callback){
			App.doJsonp(Config.ciURL + 'reviewController/submitReview'
				, dataReview
				, function(result){
					callback(result);
				});
			}
		}
	}();

// JavaScript Document
var BPost = function(){
	return{
		loadBPost : function (type, total, callback){
			App.doJsonp(Config.webServiceURL + "BPost/" + type + "?counter=" + total
			, "", function(result){
				callback(result);
			})
		},
		loadList : function (type, callback){
			App.doJsonp(Config.webServiceURL + "BPost/" + type, "", function(result){
				callback(result);
			})
		},
		loadDetail : function (type, id, callback){
			App.doJsonp(Config.webServiceURL + "BPost/" + type + "?id=" + id, "", function(result){
				callback(result);
			})
		}
	}
}();

/* Promo Item */
function PromoItem(){
	this.promoItemID = "";
	this.partID = "";
	this.imageURL = "";
	this.price = 0;
	this.qty = 0;
	this.remainingQty = 0;
	}

PromoItem.prototype.setAttribute = function(promoItemID, partID, promoImage, price, qty, remainingQty){
	this.promoItemID = promoItemID;
	this.partID = partID;
	this.imageURL = promoImage;
	this.price = price;
	this.qty = qty;
	this.remainingQty = remainingQty;
	}

PromoItem.prototype.updateRemainingQty = function(){
	App.doJsonp(Config.ciURL + "promoController/getRemainingQty", "promoItemID=" & this.promoItemID, 
		function(result){
			$.each(result, function(idx, record){
				this.remainingQty = record.remainingQty;
				});
			});
	}
/* Promo */
function Promo(){
	this.id = "";
	this.name = "";
	this.imageURL = "";
	this.startDate = "";
	this.endDate = "";
	}

Promo.prototype.setAttribute = function(id, name, img, start, end){
	this.id = id;
	this.name = name;
	this.imageURL = img;
	this.startDate = start;
	this.endDate = end;
	}

/* Promo List */
var PromoList = function(){
	var promoList = [];
	var promoItem = [];
	var promoListURL = "promoController/loadPromoList";
	
	return {
		load: function(callback){
			if (promoList.length == 0)
				App.doJsonp(Config.ciURL + promoListURL, "", function(result){
					$.each(result, function(idx, record){
						var p = new Promo;
						p.setAttribute(record.PromoID, record.PromoName, record.ImageURL, 
							record.StartDate, record.EndDate);
						promoList.push(p);
						
						App.doJsonp(Config.ciURL + "promoController/loadPromoProduct"
							, "promoID=" + record.PromoID, function(result){
							$.each(result, function(idx, record){
								var pItem = new PromoItem;								
								pItem.setAttribute(record.promoItemID
									, record.vPartID
									, p.imageURL
									, record.specialPriceIDR
									, record.qty
									, record.remainingQty);
								promoItem.push(pItem);
								});
							});

						});
					if (callback != null) callback(promoList);
					});
			else if (callback != null) callback(promoList);
			},
		isPromoItem: function(partID){
			result = $.grep(promoItem, function(e){
				return e.partID == partID;
				});
			return result;
			}
		}

	}();


// JavaScript Document
var Member = function(){
	var signature = "";
	var email = "", name = "";
	
	function hasData(val){
		if (val != null && val != 'undefined' && val != '')
			return true;
		return false;
		}
	function encrypt(string){
		return encodeURIComponent(string);
		}
	return {
		// before login
		register: function(email, firstName, lastName, password, callback){
			var encryptedEmail = encrypt(email);
			var encryptedPassword = encrypt(password);
			App.doJsonp(Config.webServiceURL + "member/register/" + encryptedEmail 
				+ "?firstName=" + firstName + "&lastName=" + lastName 
				+ "&password=" + encryptedPassword + "&birthYY=&birthMM=&birthDD="
				, "", function(result){
				callback(result);
				});
			},
		activate: function(email, activationCode, callback){
			var encryptedEmail = encrypt(email);
			App.doJsonp(Config.webServiceURL + "member/activate/" + encryptedEmail + "/" + activationCode
				, "", function(result){
					callback(result);
				});
			},
		forgetPassword: function(email, callback){
			var encryptedEmail = encrypt(email);
			App.doJsonp(Config.webServiceURL + "member/recoverPassword/" + encryptedEmail
					, "", function(result){
					callback(result);
					});
			},
		// all things that member can do
		login: function(username, password, deviceID, devicePlatform, callback){
			var encryptedUsername = encrypt(username);
			var encryptedPassword = encrypt(password);
			App.doJsonp(Config.webServiceURL + "member/login/" + encryptedUsername + "/" + encryptedPassword + "/" + deviceID + "/" + devicePlatform
				, "", function(result){
				if (result.result == true) {
					signature = result.message;
					email = username;
					Member.profile(function(profileResult){
						name = profileResult.firstName;
						callback(result);
						});
				}
				else callback(result);
				});
			},
		setSignature: function(savedSignature, callback){
			signature = savedSignature;
			Member.profile(function(profileResult){
				name = profileResult.firstName;
				callback();
				});
			},
		getSignature: function(){
			return signature;
			},
		logout: function(deviceID, devicePlatform, callback){
			App.doJsonp(Config.webServiceURL + "member/logout?sigID=" + signature
				+ "&deviceID=" + deviceID 
				+ "&devicePlatform=" + devicePlatform
				, "", function(result){
				if (result.result == true) {
					signature = "";
					email = "";
					name = "";
				}
				callback(result);
				});
			},
		getEmail: function(){
			return email;
			},
		getName: function(){
			return name;
			},
		hasSignature: function(){
			if (signature == "") return false;
			return true;
			},
		addSignatureToURL: function(url){
			var returnURL = "";
			if (Member.hasSignature()){
				if (url.indexOf("?") == -1)
					returnURL = url + "?sigID=" + signature;
				else returnURL = url + "&sigID=" + signature;
				}
			else returnURL = url;
			return returnURL;
			},
		loginStatus: function(callback){
			if (signature == ""){
				callback( { result: false, message: "" } );
				}
			else App.doJsonp(Config.webServiceURL + "member/loginStatus?sigID=" + signature, "", function(result){
				callback(result);
				});
			},
		changePassword: function(currentPassword, newPassword, callback){
			var encryptedCurrentPass = encrypt(currentPassword);
			var encryptedNewPass = encrypt(newPassword);
			App.doJsonp(Config.webServiceURL 
				+ "member/changePassword/" + encryptedCurrentPass + "/" + encryptedNewPass + "?sigID=" + signature
				  , "", function(result){
				  callback(result);
				  });
			},
		profile: function(callback){
			App.doJsonp(Config.webServiceURL + "member/profile?sigID=" + signature, "", function(result){
				callback(result);
				});
			},
		saveProfile: function(data, callback){
			var queryString = [];
			// receiveNewsletter={receiveNewsletter}&allowSMS={allowSMS}	
			queryString.push("sigID=" + signature);
			if (hasData(data.prefix)) queryString.push("prefix=" + data.prefix);
			if (hasData(data.firstName)) queryString.push("firstName=" + data.firstName);
			if (hasData(data.lastName)) queryString.push("lastName=" + data.lastName);
			if (hasData(data.birthDate.dd)) queryString.push("birthDateDD=" + data.birthDate.dd);
			if (hasData(data.birthDate.mm)) queryString.push("birthDateMM=" + data.birthDate.mm);			
			if (hasData(data.birthDate.yyyy)) queryString.push("birthDateYY=" + data.birthDate.yyyy);			
			if (hasData(data.address)) queryString.push("address=" + data.address);			
			if (hasData(data.city)) queryString.push("city=" + data.city);			
			if (hasData(data.province)) queryString.push("province=" + data.province);		
			if (hasData(data.country)) queryString.push("country=" + data.country);			
			if (hasData(data.zipCode)) queryString.push("zipCode=" + data.zipCode);			
			if (hasData(data.companyName)) queryString.push("companyName=" + data.companyName);			
			if (hasData(data.companyAddress)) queryString.push("companyAddress=" + data.companyAddress);			
			if (hasData(data.telephone)) queryString.push("telephone=" + data.telephone);			
			if (hasData(data.mobilePhone)) queryString.push("mobilePhone=" + data.mobilePhone);			
			if (hasData(data.facsimile)) queryString.push("facsimile=" + data.facsimile);			
			if (hasData(data.allowSMS)) queryString.push("allowSMS=" + data.allowSMS);			
			if (hasData(data.allowNewsLetter)) queryString.push("allowNewsLetter=" + data.allowNewsLetter);			
			
			App.doJsonp(Config.webServiceURL + "member/editProfile?" + queryString.join("&"), "", function(result){
				callback(result);
				});
			},
		getTransactionHistory: function(callback){
			App.doJsonp(Config.webServiceURL + "member/order?sigID=" + signature
				, "", function(result){
				callback(result);
				});
			},
		getShippingAddress: function(shippingAddressID, callback){
			App.doJsonp(Config.webServiceURL + "member/profile/shippingAddress?sigID=" + signature + "&shippingAddressID=" + shippingAddressID, function(result){
				callback(result);
				});
			},
		editShippingAddress: function(data, callback){
			var queryString = [];
			queryString.push("sigID=" + signature);
			if (hasData(data.shippingAddressID)) queryString.push("shippingAddressID=" + data.shippingAddressID);
			if (hasData(data.address)) queryString.push("address=" + data.address);
			if (hasData(data.province)) queryString.push("province=" + data.province);
			if (hasData(data.city)) queryString.push("city=" + data.city);
			if (hasData(data.zipCode)) queryString.push("zipCode=" + data.zipCode);
			if (hasData(data.isPreferred)) queryString.push("isPreferred=" + data.isPreferred);
			
			App.doJsonp(Config.webServiceURL + "member/profile/shippingAddress/edit?" + queryString.join("&"), "", function(result){
				callback(result);
				});
			},
		deleteShippingAddress: function(shippingAddressID, callback){
			App.doJsonp(Config.webServiceURL + "member/profile/shippingAddress/delete?sigID=" + signature + "&shippingAddressID=" + shippingAddressID, function(result){
				callback(result);
				});
			},
		getOrderReceiver: function(orderReceiverID, callback){
			App.doJsonp(Config.webServiceURL + "member/profile/orderReceiver?sigID=" + signature + "&orderReceiverID=" + orderReceiverID, function(result){
				callback(result);
				});
			},
		editOrderReceiver: function(data, callback){
			var queryString = [];
			queryString.push("sigID=" + signature);
			if (hasData(data.orderReceiverID)) queryString.push("orderReceiverID=" + data.orderReceiverID);
			if (hasData(data.name)) queryString.push("name=" + data.name);
			if (hasData(data.phone)) queryString.push("phone=" + data.phone);
			if (hasData(data.mobile)) queryString.push("mobile=" + data.mobile);
			if (hasData(data.isPreferred)) queryString.push("isPreferred=" + data.isPreferred);
			
			App.doJsonp(Config.webServiceURL + "member/profile/orderReceiver/edit?" + queryString.join("&"), "", function(result){
				callback(result);
				});
			},
		deleteOrderReceiver: function(orderReceiverID, callback){
			App.doJsonp(Config.webServiceURL + "member/profile/orderReceiver/delete?sigID=" + signature + "&orderReceiverID=" + orderReceiverID, function(result){
				callback(result);
				});
			}
		}
	}();


/*
	Benita Clarissa
	2013 09 23: member profile
	2014 08 20: member shipping address and order receiver
*/


var Product = function(){
	var path = "https://10.0.14.6/app/wcfservice/mobProductService.svc/";
	return {
		partID: "",
		parseRecord: function(productStr, productStrS) {
			var arr = productStr.split('##');
			var obj = {};
			obj.partID	     = arr[0];
			obj.name	     = arr[1];
			obj.desc	     = arr[2];
			obj.image	     = arr[3];
			obj.highlight    = arr[4];
			obj.rating	     = arr[5];
			obj.ppn		     = arr[6];
			obj.price	     = arr[7];
			obj.specialPrice = arr[8];
			if (arr.length > 9){	
				obj.hasPromo     = true;
				obj.promoImage   = arr[9];
				obj.promoPrice   = arr[10];
				obj.remainingQty = arr[11];
				obj.qty          = arr[12];
				obj.isQtyShown   = arr[13];
				obj.promoName    = arr[14];
			}else obj.hasPromo   = false;
			
			//record S
			var arrS = productStrS.split('##'); 
			obj.category = arrS[0];
			obj.totalReview = arrS[1];
			obj.murahMaksimal = arrS[2];
			return obj;
			},
		loadDetail: function(partID, callback){
			App.doJsonp(path + "product/detail/" + partID, "", function(result){
				console.log(result);
				callback(result);
				});
			},
		loadReviews: function(partID, callback){
			App.doJsonp(path + "product/review/" + partID, "", function(result){
				console.log(result);
				callback(result);
				});
			},
		submitReview: function(dataReview, callback){
			App.doJsonp(Config.ciURL + 'reviewController/submitReview'
				, dataReview
				, function(result){
					callback(result);
				});
			}
		}
	}();
	

// JavaScript Document
var Mesh = function(){
	return {
		loadMerchantOffer: function(partID, callback){
			path = Config.webServiceFolderURL + "/mobmeshservice.svc/" + "mesh/merchantOffer/";
			App.doJsonp(path + partID, "", function(result){
				callback(result);
				});
			}
		}
	}();

// JavaScript Document
var Category = function(){
	var menuCategoryURL = "menuController/getMenu",
		subMenuCategoryURL = "menuController/getSubMenu"; // param: menuid
		subSubMenuCategoryURL = "menuController/getSubSubMenu"; // param: menuid
		
	var menuCategoryKey = "menuCategoryJSON",
		subMenuCategoryKey = "subCategory",
		subSubMenuCategoryKey = "subSubCategory"; // menuid
	return {
		loadJSON: function(callback){
			if (window.localStorage.getItem(menuCategoryKey) == null){
				App.doJsonp(Config.ciURL + menuCategoryURL
					,  "platform=" + Config.platform 
					 + "&appVersionCode=" + Config.appVersionCode
					, function(data){
					window.localStorage.setItem(menuCategoryKey, JSON.stringify(data));
					if (callback != null) callback(window.localStorage.getItem(menuCategoryKey));
					}); 
			}
			else {
				if (callback != null) callback(window.localStorage.getItem(menuCategoryKey));
				}
			}, // end loadJSON
		loadSubCategory: function(menuid, callback){
			if (window.localStorage.getItem(subMenuCategoryKey + menuid) == null){
				App.doJsonp(Config.ciURL + subMenuCategoryURL, "menuid=" + menuid, function(data){
					window.localStorage.setItem(subMenuCategoryKey + menuid, JSON.stringify(data));
					if (callback != null) callback(window.localStorage.getItem(subMenuCategoryKey + menuid));
					});
				}
			else {
				if (callback != null) callback(window.localStorage.getItem(subMenuCategoryKey + menuid));
				}
			}, // end loadSubCategory
		loadSubSubCategory: function(includeCatID, excludeCatID, includeBrandID, excludeBrandID
			, callback){
			if (window.localStorage.getItem(subSubMenuCategoryKey + includeCatID) == null){
				App.doJsonp(Config.ciURL + subSubMenuCategoryURL
					, "includeCatID=" + includeCatID 
					+ "&excludeCatID=" + excludeCatID 
					+ "&includeBrandID=" + includeBrandID 
					+ "&excludeBrandID=" + excludeBrandID 
					, function(data){
					window.localStorage.setItem(subSubMenuCategoryKey + includeCatID
						, JSON.stringify(data));
					if (callback != null) 
						callback(window.localStorage.getItem(subSubMenuCategoryKey + includeCatID));
					});
				}
			else {
				if (callback != null) 
					callback(window.localStorage.getItem(subSubMenuCategoryKey + includeCatID));
				}
			}
		}
	}();


// JavaScript Document
var ProductList = function(){
	var idx = -1, start = -1, end = -1, numshow = 10, numload = 30;
	var listType, listValue, savedList = null, cachedList;
	var includeCatID, excludeCatID,
		includeBrandID, excludeBrandID;
	
	var sortBy, sortType;
	
	var productListURL = "productController/loadProductList";

	return {
		isNew: false, 
		clear: function(){
			savedList = null;
			idx = -1;
			start = -1;
			end = -1;
			listValue = "";
			listType = "";
			cachedList = "";
			},
		clearFilter: function(){
			includeCatID = [];
			excludeCatID = [];
			includeBrandID = [];
			excludeBrandID = [];
			ProductList.setSort("", "");			
			},
		getFilter: function(){
			return {
				includeCatID: includeCatID,
				excludeCatID: excludeCatID,
				includeBrandID: includeBrandID,
				excludeBrandID: excludeBrandID
				}
			},
		addFilter: function(options){
			if (options.includeCatID && options.includeCatID != '') 
				includeCatID.push(options.includeCatID);
			if (options.excludeCatID && options.excludeCatID != '') 
				excludeCatID.push(options.excludeCatID);
			if (options.includeBrandID && options.includeBrandID != '') 
				includeBrandID.push(options.includeBrandID);
			if (options.excludeBrandID && options.excludeBrandID != '') 
				excludeBrandID.push(options.excludeBrandID);
			},
		removeFilter: function(options){		
			if (options.includeCatID){
				if (options.includeCatID == "*") includeCatID = [];
				else {
					idx = includeCatID.indexOf(options.includeCatID);
					if (idx !== -1) includeCatID.splice(idx, 1);
					}
				}
			if (options.excludeCatID){
				if (options.excludeCatID == "*") excludeCatID = [];
				else {
					idx = excludeCatID.indexOf(options.excludeCatID);
					if (idx !== -1) excludeCatID.splice(idx, 1);
					}
				}
			if (options.includeBrandID){
				if (options.includeBrandID == "*") includeBrandID = [];
				else {				
					idx = includeBrandID.indexOf(options.includeBrandID);
					if (idx !== -1) includeBrandID.splice(idx, 1);
					}
				}
			if (options.excludeBrandID){
				if (options.excludeBrandID == "*") excludeBrandID = [];
				else {					
					idx = excludeBrandID.indexOf(options.excludeBrandID);
					if (idx !== -1) excludeBrandID.splice(idx, 1);
					}
				}
			},
		setSort: function(field, type){
			sortBy = field;
			sortType = type;
			},
		saveToCache: function($productListContent){ //?
			cachedList = $productListContent.html();
			},
		loadFromCache: function(){ // ?
			var temp = cachedList;
			cachedList = "";
			return temp;
			},
		loadBrands: function(type, value, callback){
			var url = Config.ciURL + "productController/loadProductBrands";
			var param = "";
			param += "includeCatID=";
			param += ((includeCatID !== undefined) ? includeCatID.join(",") : "");
			param += "&excludeCatID=";
			param += ((excludeCatID !== undefined) ? excludeCatID.join(",") : "");
			param += "&includeBrandID=";
			param += ((includeBrandID !== undefined) ? includeBrandID.join(",") : "");
			param += "&excludeBrandID=";
			param += ((excludeBrandID !== undefined) ? excludeBrandID.join(",") : "");
			param += "&filterType=" + type;
			param += "&filterID=" + value;
			
			var str = "";
			App.doJsonp(url, param, function(result){
				callback(result);
				});
			},
		loadInfo: function(type, value, callback){
            var param = "";
			var ender, partIDs = "";
			loadJSON = false;
            if (savedList == null || listType != type || listValue != value || start + idx >= end) {
                loadJSON = true;
            }
            endidx = idx + numshow;
			param = (loadJSON) ? "isLoadIDs=1" : "isLoadIDs=0" ;
            if (loadJSON) {
                listType = type;
                listValue = value;
                if (savedList == null) {
                    start = 0;
                } else {
                    start = end;
                }
				param += "&numshow=" + numshow;
                param += "&listType="; param += listType;
                param += "&listValue="; param += listValue;
                param += "&startIdx="; param += start;
                param += "&num="; param += numload;
                param += "&includeCatID=";
                param += ((includeCatID !== undefined) ? includeCatID.join(",") : "");
                param += "&excludeCatID=";
                param += ((excludeCatID !== undefined) ? excludeCatID.join(",") : "");
                param += "&includeBrandID=";
                param += ((includeBrandID !== undefined) ? includeBrandID.join(",") : "");
                param += "&excludeBrandID=";
                param += ((excludeBrandID !== undefined) ? excludeBrandID.join(",") : "");
				param += "&sortBy=";
				param += sortBy;
				param += "&sortType=";
				param += sortType;
            } 
			else {
				if (savedList.length == 0) {
                    ender = "No Result";
                    if (callback != null) {
					   callback (null, null, ender);
                    }
                    return;
                }
                endidx = idx + numshow;
                for (i = idx; i < endidx && i < end; i++) {
                    if (i != idx) {
                        partIDs += ",";
                    }
                    partIDs += savedList[i];
                }
                if (end < endidx) {
                    idx = end;
                } else {
                    idx = endidx;
                }
				param += "&partIDs="; param += partIDs;
            }
			App.doJsonp(Config.ciURL + productListURL, param, function(result){
				if (loadJSON){ // load product IDs
					savedList = result.partIDs;
        	        end = start + ((savedList.length < numload) ? savedList.length : numload);
            	    idx = 0;
  				    endidx = idx + numshow;
				}
				if (end < endidx) {
                    idx = end;
                } else {
                    idx = endidx;
                }
				if (idx == end && end < start + numload) {
                   ender = "End of Result";
                } else {
                   ender = "Tap for More Result";
				}   
				callback(result, savedList, ender);
				});	
			}
		}
	}();

/* Promo List */
var PromoList = function(){
	var promoListURL = "promoController/loadPromoList";
	var getPromoItemURL = "promoController/getPromoItem";
	
	return {
		load: function(callback){
				App.doJsonp(Config.ciURL + promoListURL, "", function(result){
					//record.PromoID, record.PromoName, record.ImageURL
					if (callback != null) callback(result);
					});
			},
		getPromoItem: function(partID, callback){
			App.doJsonp(Config.ciURL + getPromoItemURL, "partID=" + partID, function(result){
				record = result[0];
				if (record.promoItemID == null) callback(null);
				if (callback != null) callback(record);
				});
			},
		getPromoItems: function(partIDs, callback){
			App.doJsonp(Config.ciURL + getPromoItemURL, "partID=" + partIDs, function(result){
				if (callback != null) callback(result);
				});
			}
		}
	}();
	

var Analytics=function(){};Analytics.prototype.start=function(accountId,successCallback,failureCallback){return cordova.exec(successCallback,failureCallback,"GoogleAnalyticsTracker","start",[accountId]);};Analytics.prototype.trackPageView=function(key,successCallback,failureCallback){return cordova.exec(successCallback,failureCallback,"GoogleAnalyticsTracker","trackPageView",[key]);};Analytics.prototype.trackEvent=function(category,action,label,value,successCallback,failureCallback){return cordova.exec(successCallback,failureCallback,"GoogleAnalyticsTracker","trackEvent",[category,action,typeof label==="undefined"?"":label,(isNaN(parseInt(value,10)))?0:parseInt(value,10)]);};Analytics.prototype.setCustomVar=function(index,label,value,scope,successCallback,failureCallback){return cordova.exec(successCallback,failureCallback,"GoogleAnalyticsTracker","setCustomVariable",[(isNaN(parseInt(index,10)))?0:parseInt(index,10),label,value,(isNaN(parseInt(scope,10)))?0:parseInt(scope,10)]);};if(!window.plugins){window.plugins={};}if(!window.plugins.analytics){window.plugins.analytics=new Analytics();}

// JavaScript Document
var AndroidPreferences = function(){
	var libName;
	
	return {
		setPreferencesLibrary: function(preferencesLibName){
			libName = preferencesLibName;
			},
		set: function(name, value, successCallback, errorCallback){
			var message = {
				preferenceLib: libName,
				preferenceName: name,
				preferenceValue: value
				};
			return cordova.exec(successCallback, errorCallback, "AndroidPreferences", "set", [message]);
			},
		get: function(name, successCallback, errorCallback){
			var message = {
				preferenceLib: libName,
				preferenceName: name,
				preferenceValue: ""
				};
			return cordova.exec(successCallback, errorCallback, "AndroidPreferences", "get", [message]);
			}
		}
	}();
/*
if (!window.plugins) {
    window.plugins = {};
}
if (!window.plugins.prereferences) {
    window.plugins.preferences = new AndroidPreferences();
}
*/

