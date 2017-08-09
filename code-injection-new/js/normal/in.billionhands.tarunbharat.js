







document.addEventListener("deviceready", onDeviceReady, false);
record_position=0;
function onDeviceReady(){
	sidebar_menu();
	$("#coming_from").html(localStorage.coming_from);
	var division_no=parseInt(localStorage.record_position/5);
	var remainder=parseInt(localStorage.record_position%5);
	if(remainder==0){
		total_record=(division_no*5)-5;
	}else if(division_no==0){
		total_record=0
	}else{
		total_record=(division_no*5);
	}
	var i=0;
	if(remainder==0){
		record_start=localStorage.record_position-5;
	}else{
		record_start=localStorage.record_position-remainder;
	}
	mySwiper = new Swiper('.swiper-container', {
		speed:750,
		mode:'horizontal', 
		followFinger:false,
		onSlideChangeEnd : function() {//alert(1);
			record_position=record_start+$(mySwiper.currentSlide()).index();//alert(record_position);
			dataa=$("#news_title"+record_position).html();
			google_plus_data=encodeURI(dataa);
			dataa=encodeURI(dataa);
			dataa=dataa+' http://elections.tarunbharat.com/';
			facebook_url='https://m.facebook.com/dialog/feed?app_id=167472736745481&link=http://elections.tarunbharat.com/&picture=http://elections.tarunbharat.com/sites/default/files/logo_6.gif&name='+$("#news_title"+record_position).html()+'&caption= &description= &redirect_uri=https://m.facebook.com';
			facebook_url=encodeURI(facebook_url);
			//alert(facebook_url);
			$(".arrow-left").show();
			$(".arrow-right").show();
			if(record_position==1){
				$(".arrow-left").hide();
				$(".arrow-right").show();
			}else
			if(record_position==record_count){
				$(".arrow-left").show();
				$(".arrow-right").hide();
			}
			if($(mySwiper.currentSlide()).index()==0 && record_position!=0){
				show_prev_webservice(record_position-5);
			}else if($(mySwiper.currentSlide()).index()==6 && record_position<record_count){
				show_next_webservice(record_position-1);
			}else{
				$("#pagination").html(record_position+" of " +record_count);
				
				$('.swiper-container, .swiper-slide').height($(".news_details"+$(mySwiper.currentSlide()).index()).height());
				$('.swiper-container, .swiper-slide').height($("#wrapper").height());
				document.body.scrollTop = document.documentElement.scrollTop = 0;
				//alert($("#wrapper").height()+"-"+$(".news_details"+$(mySwiper.currentSlide()).index()).height());
			}
			if(record_position==0){
				mySwiper.swipeTo(1,10,true);
				return 0;
			}
			if(record_position>record_count){
				mySwiper.swipeTo(record_count,10,true);
				return 0;
			}	
		},
		onTouchEnd : function (){ //alert(11);
			$('.swiper-container, .swiper-slide').height($(".news_details"+$(mySwiper.currentSlide()).index()).height());
			$('.swiper-container, .swiper-slide').height($("#wrapper").height());
		}
	});
	head_foot_hide=1;
	$('#wrapper').click(function(e) {
		head_foot_hide++;
		twitter_flag=0;
		$("#share_menu").animate({"bottom": "-150px"},{
			duration: 500,
			specialEasing: {
				width: 'easeOutBounce',
				height: 'easeOutBounce'
			}
		});
		font_flag=0;
		$("#font_menu").animate({"bottom": "-295px"},{
			duration: 500,
			specialEasing: {
				width: 'easeOutBounce',
				height: 'easeOutBounce'
			}
		});
		

		if(head_foot_hide%2==0){
			$("#header_tr").hide();
			$("#footer_tr").hide();
		}else{
			$("#header_tr").show();
			$("#footer_tr").show();
		}
	});
	$('.arrow-left').click(function(e) { 
		e.preventDefault()
		mySwiper.swipePrev()
	});
	$('.arrow-right').click(function(e) {
		e.preventDefault()
		mySwiper.swipeNext()
	});
	var jqxhr = $.getJSON(webservice_url+"show_news_list.php?category_id="+localStorage.region_id+"&total_records="+total_record, function(data) {
	var i=0;
	var k=0;
	var newSlide = mySwiper.createSlide('<div class="news_details'+k+'"> </div>');
	newSlide.append();
	k++;
	record_count=data.record_count;
	$.each(data.all_data, function(key, val) {
		if(data.all_data[i].field_image_fid==null){
			var newSlide = mySwiper.createSlide('<div class="news_details'+k+'" style="padding: 15px 18px 15px 18px;font-size: 21px;"><b style="font-size: 27px;" id="news_title'+k+'" >'+data.all_data[i].title+'</b><br><div class="timestamp" >'+data.all_data[i].date_time+'</div><br>'+data.all_data[i].body_value+'</div>');
			newSlide.append();
		}else{
			var newSlide = mySwiper.createSlide('<div class="news_details'+k+'" style="padding: 15px 18px 15px 18px;font-size: 21px;"><b style="font-size: 27px;" id="news_title'+k+'" >'+data.all_data[i].title+'</b><br><div class="timestamp" >'+data.all_data[i].date_time+'</div><br><center><img  src="images/logo.jpg" data-original="'+data.all_data[i].image_url+'"  class="image_thumb"></center><br>'+data.all_data[i].body_value+'</div>');;
			newSlide.append();
		}
		i++;
		k++;
	});
	var newSlide = mySwiper.createSlide('<div class="news_details'+k+'"> </div>');
	newSlide.append();
	k++;
	var width  = $(window).width();
    $('.swiper-container, .swiper-slide').width(width);
	mySwiper.reInit();
	if(remainder==0){
		mySwiper.swipeTo(5,0);
	}else{
		mySwiper.swipeTo(remainder,0);
	}
	$('.swiper-container, .swiper-slide').height($(".news_details"+$(mySwiper.currentSlide()).index()).height());
	$('.swiper-container, .swiper-slide').height($("#wrapper").height()+102);
	//alert($(mySwiper.currentSlide()).index()+"-"+$("#wrapper").height()+"-"+$(".news_details"+$(mySwiper.currentSlide()).index()).height());
	$(".arrow-left").show();
	$(".arrow-right").show();
	if($(mySwiper.currentSlide()).index()==1){
		$(".arrow-left").hide();
		$(".arrow-right").show();
	}
	if($(mySwiper.currentSlide()).index()==record_count){
		$(".arrow-left").show();
		$(".arrow-right").hide();
	}
	mySwiper.reInit();
	$(window).resize(function(){
		var height = $(window).height();
		var width  = $(window).width();
		$('.swiper-container, .swiper-slide').height($(".news_details"+$(mySwiper.currentSlide()).index()).height());
		$('.swiper-container, .swiper-slide').height($("#wrapper").height()+32);
		$('.swiper-container, .swiper-slide').width(width);
		mySwiper.reInit();
	})
	$("img.image_thumb").lazyload();
	record_position=localStorage.record_position;
	dataa=$("#news_title"+record_position).html();
	google_plus_data=encodeURI(dataa);
	dataa=encodeURI(dataa);
	dataa=dataa+' http://elections.tarunbharat.com/';
	facebook_url='https://m.facebook.com/dialog/feed?app_id=167472736745481&link=http://elections.tarunbharat.com/&picture=http://elections.tarunbharat.com/sites/default/files/logo_6.gif&name='+$("#news_title"+record_position).html()+'&caption= &description= &redirect_uri=https://m.facebook.com';
	facebook_url=encodeURI(facebook_url);
	$("#pagination").html(localStorage.record_position+" of " +record_count);
	setTimeout(function(){
		stop_loading();
	},1000);
	//alert($("#wrapper").height()+"-"+$(".news_details"+$(mySwiper.currentSlide()).index()).height());
})
.error(function() {
	showAlert("Sorry! Could not communicate with Tarun Bharat Server.");
	setTimeout(function(){
		stop_loading();
	},1000);
})
.complete(function() {
	setTimeout(function(){
		stop_loading();
	},1000);
});
}
function show_prev_webservice(prev_record){
	start_loading('');
	var jqxhr = $.getJSON(webservice_url+"show_news_list.php?category_id="+localStorage.region_id+"&total_records="+prev_record, function(data) {
		mySwiper.removeAllSlides();
		var i=0;
		var k=0;
		var newSlide = mySwiper.createSlide('<div class="news_details'+k+'"> </div>');
		newSlide.append();
		k++;
		record_count=data.record_count;
		$.each(data.all_data, function(key, val) {
		if(data.all_data[i].field_image_fid==null){
			var newSlide = mySwiper.createSlide('<div class="news_details'+k+'" style="padding: 15px 18px 15px 18px;font-size: 21px;"><b style="font-size: 27px;" id="news_title'+k+'" >'+data.all_data[i].title+'</b><br><div class="timestamp" >'+data.all_data[i].date_time+'</div><br>'+data.all_data[i].body_value+'</div>');
			newSlide.append();
		}else{
			var newSlide = mySwiper.createSlide('<div class="news_details'+k+'" style="padding: 15px 18px 15px 18px;font-size: 21px;"><b style="font-size: 27px;" id="news_title'+k+'">'+data.all_data[i].title+'</b><br><div class="timestamp" >'+data.all_data[i].date_time+'</div><br><center><img  src="images/logo.jpg" data-original="'+data.all_data[i].image_url+'"  class="image_thumb"></center><br>'+data.all_data[i].body_value+'</div>');;
			newSlide.append();
		}
			i++;
			k++;
		});
		var newSlide = mySwiper.createSlide('<div class="news_details'+k+'"> </div>');
		newSlide.append();
		k++;
		var width  = $(window).width();
		$('.swiper-container, .swiper-slide').width(width);
		mySwiper.reInit();
		mySwiper.swipeTo(5,0);
		$('.swiper-container, .swiper-slide').height($(".news_details"+$(mySwiper.currentSlide()).index()).height());
		$('.swiper-container, .swiper-slide').height($("#wrapper").height());
		$(".arrow-left").show();
		$(".arrow-right").show();
		mySwiper.reInit();
		$(window).resize(function(){
			var height = $(window).height();
			var width  = $(window).width();
			$('.swiper-container, .swiper-slide').height($(".news_details"+$(mySwiper.currentSlide()).index()).height());
			$('.swiper-container, .swiper-slide').height($("#wrapper").height());
			$('.swiper-container, .swiper-slide').width(width);
			mySwiper.reInit();
		})
		$("img.image_thumb").lazyload();
		record_start=prev_record;
		$("#pagination").html(record_start+5+" of " +record_count);
		setTimeout(function(){
			stop_loading();
		},1000);
	})
	.error(function() {
		showAlert("Sorry! Could not communicate with Tarun Bharat Server.");
		setTimeout(function(){
			stop_loading();
		},1000);
	})
	.complete(function() {
		//alert("Request completed");
		setTimeout(function(){
			stop_loading();
		},1000);
	});
}
function show_next_webservice(next_record){
	start_loading('');
	var jqxhr = $.getJSON(webservice_url+"show_news_list.php?category_id="+localStorage.region_id+"&total_records="+next_record, function(data) {
	mySwiper.removeAllSlides();
		var i=0;
		var k=0;
		var newSlide = mySwiper.createSlide('<div class="news_details'+k+'"> </div>');
		newSlide.append();
		k++;
		record_count=data.record_count;
		$.each(data.all_data, function(key, val) {
		if(data.all_data[i].field_image_fid==null){
			var newSlide = mySwiper.createSlide('<div class="news_details'+k+'" style="padding: 15px 18px 15px 18px;font-size: 21px;"><b style="font-size: 27px;" id="news_title'+k+'" >'+data.all_data[i].title+'</b><br><div class="timestamp" >'+data.all_data[i].date_time+'</div><br>'+data.all_data[i].body_value+'</div>');
			newSlide.append();
		}else{
			var newSlide = mySwiper.createSlide('<div class="news_details'+k+'" style="padding: 15px 18px 15px 18px;font-size: 21px;"><b style="font-size: 27px;" id="news_title'+k+'" >'+data.all_data[i].title+'</b><br><div class="timestamp" >'+data.all_data[i].date_time+'</div><br><center><img  src="images/logo.jpg" data-original="'+data.all_data[i].image_url+'"  class="image_thumb"></center><br>'+data.all_data[i].body_value+'</div>');;
			newSlide.append();
		}
			i++;
			k++;
		});
		var newSlide = mySwiper.createSlide('<div class="news_details'+k+'"> </div>');
		newSlide.append();
		k++;
		var width  = $(window).width();
		$('.swiper-container, .swiper-slide').width(width);
		mySwiper.reInit();
		mySwiper.swipeTo(1,0);
		$('.swiper-container, .swiper-slide').height($(".news_details"+$(mySwiper.currentSlide()).index()).height());
		$('.swiper-container, .swiper-slide').height($("#wrapper").height());
		$(".arrow-left").show();
		$(".arrow-right").show();
		mySwiper.reInit();
		$(window).resize(function(){
			var height = $(window).height();
			var width  = $(window).width();
			$('.swiper-container, .swiper-slide').height($(".news_details"+$(mySwiper.currentSlide()).index()).height());
			$('.swiper-container, .swiper-slide').height($("#wrapper").height());
			$('.swiper-container, .swiper-slide').width(width);
			mySwiper.reInit();
		})
		$("img.image_thumb").lazyload();
		record_start=next_record;
		$("#pagination").html(next_record+1+" of " +record_count);
		setTimeout(function(){
			stop_loading();
		},1000);
	})
	.error(function() {
		showAlert("Sorry! Could not communicate with Tarun Bharat Server.");
		setTimeout(function(){
			stop_loading();
		},1000);
	})
	.complete(function() {
		setTimeout(function(){
			stop_loading();
		},1000);
	});
}
function FontSet(fontsize){
	$(".news_details"+$(mySwiper.currentSlide()).index()).css("font-size",fontsize+"px");
	$('.swiper-container, .swiper-slide').height($(".news_details"+$(mySwiper.currentSlide()).index()).height()+30);
	$('.swiper-container, .swiper-slide').height($("#wrapper").height());
	$("#font_menu").animate({"bottom": "-295px"},{
		duration: 500,
		specialEasing: {
			width: 'easeOutBounce',
			height: 'easeOutBounce'
		}
	});
	font_flag=0;
}
function htmlDecode(value){
    if (value){
		var str = $('<div />').html(value).text();
		str=str.replace(/&nbsp;/g,"");
        return str.replace(/(<([^>]+)>)/ig,"");
    }else{
        return '';
    }
}
google_plus_data="";
dataa="";
facebook_url="";









document.addEventListener("deviceready", onDeviceReady, false);
function onDeviceReady(){
	sidebar_menu();//alert(webservice_url+"shown_news.php?category_id="+localStorage.region_id+"&total_records=0");
	var jqxhr = $.getJSON(webservice_url+"shown_news.php?category_id="+localStorage.region_id+"&total_records=0", function(data) {
	var i=0;
	$.each(data, function(key, val) {
		var image_url=data[i].field_image_fid;
		if(image_url==null){
			image_url='images/logo.jpg';
		}else{
			image_url=data[i].image_url;
		}
		var page_link='news_details.html';
		$("#thelist").append('<li id="'+data[i].nid+'" ><table width="100%" border=0 cellspacing="0" ><tr ><td class="trRows" width="39px" valign="middle" id="'+data[i].vid+'" onclick="pagetransition('+"'"+page_link+"'"+','+data[i].nid+','+data[i].vid+','+"'"+data[i].field_image_fid+"'"+","+"'"+data[i].record_position+"'"+')" ><img src="images/logo.jpg" data-original="'+image_url+'"   class="image_thumb"/></td><td valign="top" class="trRows" id="'+data[i].nid+'" onclick="pagetransition('+"'"+page_link+"'"+','+data[i].nid+','+data[i].vid+','+"'"+data[i].field_image_fid+"'"+","+"'"+data[i].record_position+"'"+')" style="padding-left: 6px;">'+data[i].title+'<div class="timestamp" >'+data[i].date_time+'</div></td><td align="center" valign="middle" class="trRows" style="width: 42px;display:none;"><img height="40px" src="images/favorite1.png" id="favorite'+data[i].nid+data[i].vid+'" onclick="add_to_favorite('+"'favorite"+data[i].nid+data[i].vid+"'"+')" /></td></tr></table></li>');
		i++;
	});
	if(i>0){
		$("#pullUp").show();
		pullup_event_initialize();
	}
	$("img.image_thumb").lazyload();
	setTimeout(function(){
		stop_loading();
	},1000);
})
.error(function() {
	showAlert("Sorry! Could not communicate with Tarun Bharat Server.");
	setTimeout(function(){
		stop_loading();
	},1000);
})
.complete(function() { 
//alert("Request completed"); 
setTimeout(function(){
	stop_loading();
},1000);
});
}
$(window).scroll(function () {
 //end_scroll();
});
function pullup_event_initialize(){
	$("#pullUp").click(function(){
		pullUpEl = document.getElementById('pullUp');
		pullUpEl.className = 'flip';
		pullUpEl.querySelector('.pullUpLabel').innerHTML = 'Release to refresh...';
		if (pullUpEl.className.match('flip')) {
			pullUpEl.className = 'loading';
			pullUpEl.querySelector('.pullUpLabel').innerHTML = 'Loading...';
		}
		pullDownAction();
	});
}
var total_records=0;
function pullDownAction () {
	setTimeout(function () {	// <-- Simulate network congestion, remove setTimeout from production!
		var el, li, i;
		el = document.getElementById('thelist');
		total_records=total_records+10;//alert(webservice_url+"shown_news.php?category_id="+localStorage.region_id+"&total_records="+total_records);
		var jqxhr = $.getJSON(webservice_url+"shown_news.php?category_id="+localStorage.region_id+"&total_records="+total_records, function(data) {
		var i=0;
		$.each(data, function(key, val) {
		var image_url=data[i].field_image_fid;
		if(image_url==null){
			image_url='images/logo.jpg';
		}else{
			image_url=data[i].image_url;
		}
		var page_link='news_details.html';
		$("#thelist").append('<li id="'+data[i].nid+'" ><table width="100%" border=0 cellspacing="0" ><tr ><td class="trRows" width="39px" valign="middle" id="'+data[i].vid+'" onclick="pagetransition('+"'"+page_link+"'"+','+data[i].nid+','+data[i].vid+','+"'"+data[i].field_image_fid+"'"+","+"'"+data[i].record_position+"'"+')" ><img src="images/logo.jpg" data-original="'+image_url+'"  class="image_thumb"/></td><td valign="top" class="trRows" id="'+data[i].nid+'" onclick="pagetransition('+"'"+page_link+"'"+','+data[i].nid+','+data[i].vid+','+"'"+data[i].field_image_fid+"'"+","+"'"+data[i].record_position+"'"+')" style="padding-left: 6px;">'+data[i].title+'<div class="timestamp" >'+data[i].date_time+'</div></td><td align="center" valign="middle" class="trRows" style="width: 42px;display:none;"><img height="40px" src="images/favorite1.png" id="favorite'+data[i].nid+data[i].vid+'" onclick="add_to_favorite('+"'favorite"+data[i].nid+data[i].vid+"'"+')" /></td></tr></table></li>');
			i++;
		});
		pullUpEl.className = '';
		pullUpEl.querySelector('.pullUpLabel').innerHTML = 'Click here to load more...';
		$("img.image_thumb").lazyload();
		if(i==0){
			$(".message").show();
			$("#pullUp").hide();
			setTimeout(function(){$(".message").hide();},3000);
		}
		})
		.error(function() { 
			showAlert("Sorry! Could not communicate with Tarun Bharat Server.");
			setTimeout(function(){
				stop_loading();
			},1000);
		})
		.complete(function() { 
			//alert("Request completed"); 
			setTimeout(function(){
				stop_loading();
			},1000);
		});
	}, 500);	// <-- Simulate network congestion, remove setTimeout from production!
}
function end_scroll(){
	if(document.body.scrollHeight== ($(window).scrollTop() +document.body.offsetHeight)){
		pullUpEl = document.getElementById('pullUp');
		pullUpEl.className = 'flip';
		pullUpEl.querySelector('.pullUpLabel').innerHTML = 'Release to refresh...';
		if (pullUpEl.className.match('flip')) {//showAlert(11);
			pullUpEl.className = 'loading';
			pullUpEl.querySelector('.pullUpLabel').innerHTML = 'Loading...';				
			pullDownAction();
		}
	}
}
function add_to_favorite(favorite_image_id){
	document.getElementById(favorite_image_id).src="images/favorite2.png";
}
function pagetransition(URL ,id1,id2,id3,record_position){
	localStorage.nid=id1;
	localStorage.vid=id2;
	localStorage.image_id=id3;
	localStorage.record_position=record_position;
	$("#"+id1).css({
		"background":"-webkit-gradient( linear, left top, left bottom, color-stop(0.05, #79bbff), color-stop(1, #378de5) )",
		"background":"-moz-linear-gradient( center top, #79bbff 5%, #378de5 100% )",
		"filter":"progid:DXImageTransform.Microsoft.gradient(startColorstr='#79bbff', endColorstr='#378de5')",
		"background-color":"#79bbff"
	});
	$("#"+id2).css({
		"background":"-webkit-gradient( linear, left top, left bottom, color-stop(0.05, #79bbff), color-stop(1, #378de5) )",
		"background":"-moz-linear-gradient( center top, #79bbff 5%, #378de5 100% )",
		"filter":"progid:DXImageTransform.Microsoft.gradient(startColorstr='#79bbff', endColorstr='#378de5')",
		"background-color":"#79bbff"
	});
	checkConnection();
	start_loading('');
	window.parent.location=URL;
}









document.addEventListener("deviceready", onDeviceReady, false);
function onDeviceReady(){
	sidebar_menu();//alert(webservice_url+"shown_news.php?category_id="+localStorage.nid+"&total_records=0");
	if(localStorage.region_id=='belgao_vidhansabha'){
		URL=webservice_url+"shown_latest_news.php?total_records=0";
		localStorage.coming_from="बेळगांव विधानसभा";
	}else{
		URL=webservice_url+"shown_corporation_news.php?total_records=0";
		localStorage.region_id='karnataka_vidhansabha';
		localStorage.coming_from="कर्नाटक विधानसभा";
	}//alert(URL);
	if(!sessionStorage.is_first_time || sessionStorage.is_first_time==''){
	sessionStorage.is_first_time=1;
	start_loading('');
	}
	var jqxhr = $.getJSON(URL, function(data) {
	var i=0;
	$.each(data, function(key, val) {//alert(data[i].field_image_fid);
		var image_url=data[i].field_image_fid;
		if(image_url==null){
			image_url='images/logo.jpg';
		}else{
			image_url=data[i].image_url;
		}
		var page_link='news_details.html';
		$("#thelist").append('<li id="'+data[i].nid+'" ><table width="100%" border=0 cellspacing="0" ><tr ><td class="trRows" width="39px" valign="middle" id="'+data[i].vid+'" onclick="pagetransition('+"'"+page_link+"'"+','+data[i].nid+','+data[i].vid+','+"'"+data[i].field_image_fid+"'"+","+"'"+data[i].record_position+"'"+')" ><img  src="images/logo.jpg" data-original="'+image_url+'"  class="image_thumb"/></td><td valign="top" class="trRows" id="'+data[i].nid+'" onclick="pagetransition('+"'"+page_link+"'"+','+data[i].nid+','+data[i].vid+','+"'"+data[i].field_image_fid+"'"+","+"'"+data[i].record_position+"'"+')"  style="padding-left: 6px;" >'+data[i].title+'<div class="timestamp" >'+data[i].date_time+'</div></td><td align="center" valign="middle" class="trRows" style="width: 56px;display:none;"><img height="45px" src="images/favorite1.png" id="favorite'+data[i].nid+data[i].vid+'" onclick="add_to_favorite('+"'favorite"+data[i].nid+data[i].vid+"'"+')" /></td></tr></table></li>');
		i++;
	});
	if(i>0){
		$("#pullUp").show();
		pullup_event_initialize();
	}
	$("img.image_thumb").lazyload();
	setTimeout(function(){
		stop_loading();
	},1000);
})
.error(function() {
	showAlert("Sorry! Could not communicate with Tarun Bharat Server.") ;
	setTimeout(function(){
		stop_loading();
	},1000);
})
.complete(function() { 
	//alert("Request completed"); 
	setTimeout(function(){
		stop_loading();
	},1000);
});
}
$(window).scroll(function () {
// end_scroll();
});
function pullup_event_initialize(){
	$("#pullUp").click(function(){
		pullUpEl = document.getElementById('pullUp');
		pullUpEl.className = 'flip';
		pullUpEl.querySelector('.pullUpLabel').innerHTML = 'Release to refresh...';
		if (pullUpEl.className.match('flip')) {
			pullUpEl.className = 'loading';
			pullUpEl.querySelector('.pullUpLabel').innerHTML = 'Loading...';
		}
		pullDownAction();
	});
}
var total_records=0;
function pullDownAction () {
	setTimeout(function () {	// <-- Simulate network congestion, remove setTimeout from production!
		var el, li, i;
		el = document.getElementById('thelist');
		total_records=total_records+10;//alert(webservice_url+"shown_news.php?category_id="+localStorage.nid+"&total_records="+total_records);
		if(localStorage.region_id=='belgao_vidhansabha'){
			URL=webservice_url+"shown_latest_news.php?total_records="+total_records;
		}else{
			URL=webservice_url+"shown_corporation_news.php?total_records="+total_records;
			localStorage.region_id='karnataka_vidhansabha';
		}
		var jqxhr = $.getJSON(URL, function(data) {
		var i=0;
		$.each(data, function(key, val) {
			var image_url=data[i].field_image_fid;
			if(image_url==null){
				image_url='images/logo.jpg';
			}else{
				image_url=data[i].image_url;
			}
			var page_link='news_details.html';
			$("#thelist").append('<li id="'+data[i].nid+'" ><table width="100%" border=0 cellspacing="0" ><tr ><td class="trRows" width="39px" valign="middle" id="'+data[i].vid+'" onclick="pagetransition('+"'"+page_link+"'"+','+data[i].nid+','+data[i].vid+','+"'"+data[i].field_image_fid+"'"+","+"'"+data[i].record_position+"'"+')" ><img src="images/logo.jpg" data-original="'+image_url+'"  class="image_thumb"/></td><td valign="top" class="trRows" id="'+data[i].nid+'" onclick="pagetransition('+"'"+page_link+"'"+','+data[i].nid+','+data[i].vid+','+"'"+data[i].field_image_fid+"'"+","+"'"+data[i].record_position+"'"+')"  style="padding-left: 6px;" >'+data[i].title+'<div class="timestamp" >'+data[i].date_time+'</div></td><td align="center" valign="middle" class="trRows" style="width: 56px;display:none;"><img height="45px" src="images/favorite1.png" id="favorite'+data[i].nid+data[i].vid+'" onclick="add_to_favorite('+"'favorite"+data[i].nid+data[i].vid+"'"+')" /></td></tr></table></li>');
			i++;
		});
		pullUpEl.className = '';
		pullUpEl.querySelector('.pullUpLabel').innerHTML = 'Click here to load more...';
		$("img.image_thumb").lazyload();
		if(i==0){
			$(".message").show();
			$("#pullUp").hide();
			setTimeout(function(){$(".message").hide();},3000);
		}
		})
		.error(function() { 
			showAlert("Sorry! Could not communicate with Tarun Bharat Server.");
			setTimeout(function(){
				stop_loading();
			},1000);
		})
		.complete(function() { 
			//alert("Request completed"); 
			setTimeout(function(){
				stop_loading();
			},1000);
		});
	}, 500);
}
function end_scroll(){
	if(document.body.scrollHeight== ($(window).scrollTop() +document.body.offsetHeight)){
		pullUpEl = document.getElementById('pullUp');
		pullUpEl.className = 'flip';
		pullUpEl.querySelector('.pullUpLabel').innerHTML = 'Release to refresh...';
		if (pullUpEl.className.match('flip')) {//showAlert(11);
			pullUpEl.className = 'loading';
			pullUpEl.querySelector('.pullUpLabel').innerHTML = 'Loading...';				
			pullDownAction();
		}
	}
}
function add_to_favorite(favorite_image_id){
	document.getElementById(favorite_image_id).src="images/favorite2.png";
}
function pagetransition(URL ,id1,id2,id3,record_position){
	localStorage.nid=id1;
	localStorage.vid=id2;
	localStorage.image_id=id3;
	localStorage.record_position=record_position;
	$("#"+id1).css({
		"background":"-webkit-gradient( linear, left top, left bottom, color-stop(0.05, #79bbff), color-stop(1, #378de5) )",
		"background":"-moz-linear-gradient( center top, #79bbff 5%, #378de5 100% )",
		"filter":"progid:DXImageTransform.Microsoft.gradient(startColorstr='#79bbff', endColorstr='#378de5')",
		"background-color":"#79bbff"
	});
	$("#"+id2).css({
		"background":"-webkit-gradient( linear, left top, left bottom, color-stop(0.05, #79bbff), color-stop(1, #378de5) )",
		"background":"-moz-linear-gradient( center top, #79bbff 5%, #378de5 100% )",
		"filter":"progid:DXImageTransform.Microsoft.gradient(startColorstr='#79bbff', endColorstr='#378de5')",
		"background-color":"#79bbff"
	});
	checkConnection();
	start_loading('');
	window.parent.location=URL;
}



﻿webservice_url='http://tarunbharat.billionhands.in/tbelection_webservicesNew/';
//webservice_url='http://localhost/bht/tbelection_webservices/';
//webservice_url='http://192.168.103.110/bht/tbelection_webservices/';
function checkConnection() {
	var networkState = navigator.connection.type;
    var states = {};
    states[Connection.UNKNOWN]  = 'Unknown connection';
    states[Connection.ETHERNET] = 'Ethernet connection';
    states[Connection.WIFI]     = 'WiFi connection';
    states[Connection.CELL_2G]  = 'Cell 2G connection';
    states[Connection.CELL_3G]  = 'Cell 3G connection';
    states[Connection.CELL_4G]  = 'Cell 4G connection';
    states[Connection.NONE]     = 'No network connection';
	if(states[networkState]=="Unknown connection" || states[networkState]=="No network connection"){
		showAlert("You are not connected to the internet. You need an Active Internet connection to use this application.");
	}
}
function start_loading(data){
	navigator.notification.activityStart('','Loading...');
	//navigator.notificationEx.loadingStart();
	//navigator.notificationEx.activityStart();
}
function stop_loading(){
	navigator.notification.activityStop();
	//navigator.notificationEx.loadingStop();
	//navigator.notificationEx.activityStop();
}
function alertDismissed() {
    // do something
}
function showAlert(msg) {
	navigator.notification.alert(
		msg,       // message
		alertDismissed,         // callback
		'Tarun Bharat'            // title
	);
}
function backpage(){
	start_loading();
	window.history.back();
}
function show_sidebar(){
	$("#full_screen").css("z-index","1000");
	if($(document).height()>$("#menu").height()){
		$("#menu").height($(window).height());
		$("#menu").animate({"left": "0px"},{
			duration: 500,
			specialEasing: {
				width: 'easeOutBounce',
				height: 'easeOutBounce'
			}
		});
		$("#full_screen").css("height",$(document).height()+"px");
	}else{
		$("#menu").animate({"left": "0px"},{
			duration: 500,
			specialEasing: {
				width: 'easeOutBounce',
				height: 'easeOutBounce'
			}
		});
	}
}
twitter_flag=0;
function twitter_bar(){
	twitter_flag++;
	if(twitter_flag%2==0){
		$("#share_menu").animate({"bottom": "-150px"},{
			duration: 500,
			specialEasing: {
				width: 'easeOutBounce',
				height: 'easeOutBounce'
			}
		});
	}else{
		$("#share_menu").animate({"bottom": "38px"},{
			duration: 500,
			specialEasing: {
				width: 'easeOutBounce',
				height: 'easeOutBounce'
			}
		});
	}
	$("#font_menu").animate({"bottom": "-295px"},{
		duration: 500,
		specialEasing: {
			width: 'easeOutBounce',
			height: 'easeOutBounce'
		}
	});
	font_flag=0;
}
font_flag=0;
function font_bar(){
	font_flag++;
	if(font_flag%2==0){
		$("#font_menu").animate({"bottom": "-295px"},{
			duration: 500,
			specialEasing: {
				width: 'easeOutBounce',
				height: 'easeOutBounce'
			}
		});
	}else{
		$("#font_menu").animate({"bottom": "38px"},{
			duration: 500,
			specialEasing: {
				width: 'easeOutBounce',
				height: 'easeOutBounce'
			}
		});
	}
	$("#share_menu").animate({"bottom": "-150px"},{
		duration: 500,
		specialEasing: {
			width: 'easeOutBounce',
			height: 'easeOutBounce'
		}
	});
	twitter_flag=0;
}
function hide_sidebar(){
$("#menu").animate({"left": "-253px"},{
    duration: 500,
		specialEasing: {
			width: 'easeInOutBounce',
			height: 'easeInOutBounce'
		}
	});
	
	$('#book').animate({
		width: 'toggle',
		height: 'toggle'
	}, {
    duration: 5000,
    specialEasing: {
		width: 'linear',
		height: 'easeOutBounce'
    }
	});
	$("#full_screen").css("z-index","10px");
	$("#full_screen").css("z-index","-2");
}

function sidebar_menu(){
	if(!sessionStorage.region_json || sessionStorage.region_json==''){ 
	var jqxhr = $.getJSON(webservice_url+"show_region.php", function(data) {
		var i=0;
		$("#side_bar_menu").append('<li onclick="open_menu_page('+"'latest_news_list.html'"+','+"'belgao_vidhansabha'"+')" ><table border="0" width="100%"><tbody><tr><td style="width: 25px;"><img src="images/85.png"  class="side_title_ico"/></td><td valign="middle"><span class="title_text" >बेळगांव विधानसभा</span></td><td valign="middle"><span class="right_ico"></span></td></tr></tbody></table></li>');
		$("#side_bar_menu").append('<li  onclick="open_menu_page('+"'latest_news_list.html'"+','+"'karnataka_vidhansabha'"+')" ><table border="0" width="100%"><tbody><tr><td style="width: 25px;"><img src="images/85.png"  class="side_title_ico"/></td><td valign="middle"><span class="title_text" >कर्नाटक विधानसभा</span></td><td valign="middle"><span class="right_ico"></span></td></tr></tbody></table></li>');
		sessionStorage.region_json=JSON.stringify(data);
		$.each(data, function(key, val) {
			$("#side_bar_menu").append('<li id="'+data[i].region_id+'"  onclick="open_menu_page('+"'news_list.html'"+','+data[i].region_id+')" ><table border="0" width="100%"><tbody><tr><td style="width: 25px;"><img src="images/85.png"  class="side_title_ico"/></td><td valign="middle"><span class="title_text" >'+data[i].region_title+'</span></td><td valign="middle"><span class="right_ico"></span></td></tr></tbody></table></li>');
			i++;
		});
		stop_loading('');
	})
	.error(function() { 
		showAlert("Sorry! Could not communicate with Tarun Bharat Server.");
	})
	.complete(function() { 
		//alert("Request completed"); 
	});
	}else{ //alert('cached');
		var category_json_data=jQuery.parseJSON(sessionStorage.region_json);
		var i=0;
		$("#side_bar_menu").append('<li onclick="open_menu_page('+"'latest_news_list.html'"+','+"'belgao_vidhansabha'"+','+"'बेळगांव विधानसभा'"+')" ><table border="0" width="100%"><tbody><tr><td style="width: 39px;"><img src="images/85.png"  class="side_title_ico"/></td><td valign="middle"><span class="title_text" >बेळगांव विधानसभा</span></td><td valign="middle"><span class="right_ico"></span></td></tr></tbody></table></li>');
		$("#side_bar_menu").append('<li  onclick="open_menu_page('+"'latest_news_list.html'"+','+"'karnataka_vidhansabha'"+','+"'कर्नाटक विधानसभा'"+')" ><table border="0" width="100%"><tbody><tr><td style="width: 39px;"><img src="images/85.png"  class="side_title_ico"/></td><td valign="middle"><span class="title_text" >कर्नाटक विधानसभा</span></td><td valign="middle"><span class="right_ico"></span></td></tr></tbody></table></li>');
		$.each(category_json_data, function(key, val) {
			$("#side_bar_menu").append('<li id="'+category_json_data[i].region_id+'"  onclick="open_menu_page('+"'news_list.html'"+','+category_json_data[i].region_id+","+"'"+category_json_data[i].region_title+"'"+')" ><table border="0" width="100%"><tbody><tr><td style="width: 39px;"><img src="images/85.png"  class="side_title_ico"/></td><td valign="middle"><span class="title_text" >'+category_json_data[i].region_title+'</span></td><td valign="middle"><span class="right_ico"></span></td></tr></tbody></table></li>');
			i++;
		});
	}
}
function open_menu_page(URL, region_id,coming_from){
	localStorage.region_id=region_id;
	localStorage.coming_from=coming_from;
	$("#"+region_id).css({
		"background":"-webkit-gradient( linear, left top, left bottom, color-stop(0.05, #79bbff), color-stop(1, #378de5) )",
		"background":"-moz-linear-gradient( center top, #79bbff 5%, #378de5 100% )",
		"filter":"progid:DXImageTransform.Microsoft.gradient(startColorstr='#79bbff', endColorstr='#378de5')",
		"background-color":"#79bbff"
	});
	checkConnection();
	start_loading('');
	window.parent.location=URL;
}

(function(){var e=window.PhoneGap||window.Cordova||window.cordova;NotificationEx=function(){};NotificationEx.prototype.loadingStart=function(t){e.exec(null,null,"NotificationEx","loadingStart",[t])};NotificationEx.prototype.loadingStop=function(){e.exec(null,null,"NotificationEx","loadingStop",[])};NotificationEx.prototype.activityStart=function(){e.exec(null,null,"NotificationEx","activityStart",[])};NotificationEx.prototype.activityStop=function(){e.exec(null,null,"NotificationEx","activityStop",[])};NotificationEx.install=function(){if(typeof navigator.notificationEx=="undefined"){navigator.notificationEx=new NotificationEx}};if(e&&e.addConstructor){e.addConstructor(NotificationEx.install)}else{console.log("NotificationEx Cordova Plugin could not be installed.");return null}})()

<!--//<![CDATA[
   document.MAX_ct0 ='INSERT_CLICKURL_HERE';

   var m3_u = (location.protocol=='https:'?'https://ad.billionhands.in/ads/www/delivery/ajs.php':'http://ad.billionhands.in/ads/www/delivery/ajs.php');
   var m3_r = Math.floor(Math.random()*99999999999);
   if (!document.MAX_used) document.MAX_used = ',';
   document.write ("<scr"+"ipt type='text/javascript' src='"+m3_u);
   document.write ("?zoneid=131&amp;charset=UTF-8");
   document.write ('&amp;cb=' + m3_r);
   if (document.MAX_used != ',') document.write ("&amp;exclude=" + document.MAX_used);
   document.write ('&amp;charset=UTF-8');
   document.write ("&amp;loc=" + escape(window.location));
   if (document.referrer) document.write ("&amp;referer=" + escape(document.referrer));
   if (document.context) document.write ("&context=" + escape(document.context));
   if ((typeof(document.MAX_ct0) != 'undefined') && (document.MAX_ct0.substring(0,4) == 'http')) {
       document.write ("&amp;ct0=" + escape(document.MAX_ct0));
   }
   if (document.mmm_fo) document.write ("&amp;mmm_fo=1");
   document.write ("'><\/scr"+"ipt>");
//]]>--><noscript><a href='http://ad.billionhands.in/ads/www/delivery/ck.php?n=a9156626&amp;cb=INSERT_RANDOM_NUMBER_HERE' target='_blank'><img src='http://ad.billionhands.in/ads/www/delivery/avw.php?zoneid=131&amp;charset=UTF-8&amp;cb=INSERT_RANDOM_NUMBER_HERE&amp;n=a9156626&amp;ct0=INSERT_CLICKURL_HERE' border='0' alt='' /></a></noscript>
