







  
  var initialized = false;
  
  var Mfrm = new MobileFrm();
  /*
  $(document).bind('resume',function(){
	  Mfrm.init();
  });
  */
  $(document).bind('deviceready',function(){
  	//$(document).ready(function(){
  	Mfrm.init();
	  initApp();
	  $(":input[placeholder]").placeholder();
		enterCategories();
		
		$('.searchForm').on('submit', function(){

			if( $(this).find('.search-button').length > 0 ){
				$(this).find('.search-button').trigger('click');
			}else if( $(this).find('#advancedSearchButton').length > 0 ){
				$(this).find('#advancedSearchButton').trigger('click');
			}
			
			return false;

		});
		
		setTimeout(function(){
			Mfrm.hideSplashscreen();
		},1500);
		
		document.addEventListener("backbutton", function(e){
			
			if( Mfrm.goBack() == false ){
				
				if( confirm('Skutočne chcete ukončiť aplikáciu?') == true ){
			        e.preventDefault();
			        navigator.app.exitApp();
		  		}
				
			}
		  	
		}, false);
		
  });
  
  /*
  $(document).ready(function(){
	  Mfrm.init();
	  initApp();
		enterCategories();
  });*/
  

var currentPageId;
var apiListViewParams;

function initApp(){
	
	$(document).bind('pageChanged',function(event,data){
		if( data.toPage != 'subCategory' && data.toPage != 'listView' ){
			currentCategoryFindId = 0;
		}
		
		if( 'savedItems' == data.toPage ){
			Mfrm.showLoading();
			$('#savedItems').css('background','#FFF');
			var output = createListofSavedItems(userData.savedItems);
			$('#savedItems .content').html(output);
			Mfrm.hideLoading();
		}

		if( 'search' == data.toPage ){
			appendCateoryData();
		}
		
		if( data.toPage.search('referatDetail-') == -1 ){
			disableEmailButton();
		}
		
		if( $('#footerToolbar .item .item-content.'+data.toPage).length != 0 ){
			$('#footerToolbar .item').removeClass('selected');
			$('#footerToolbar .item .item-content.'+data.toPage).parent().addClass('selected');
		}else{
			$('#footerToolbar .item').removeClass('selected');
		}
		
	  });
	
	//custom checkboxes
	$('#search .content .checkbox').click(function(){
		$(this).toggleClass('checked');
	});
	
}

function apiCall(data,callback){
	/*
	console.log('params');
	console.log(data);
	*/
	data['zotriedit'] = 1;
	
	Mfrm.showLoading();
	
	$.ajax({
		url: config.apiUrl, 
		type: 'GET',
		dataType: 'json',
		data: data,
		complete: function(result){
			
			if(result.status == 200){
				
				//try{
					var parsedResult = jQuery.parseJSON(result.responseText);
					eval(callback)(parsedResult,data);
					/*
					console.log('result');
					console.log(parsedResult);
					*/
					Mfrm.hideLoading();
				//}catch(error){
					//alert('Nastala neočakávaná chyba. Skúste akciu zopakovať');
					//console(error);
				//}
				
			}else{
				alert('Nastala neočakávaná chyba. Skúste akciu zopakovať');
				Mfrm.hideLoading();
			}
			
			
		/*},
		error: function(error){
			alert(error.responseText);
			//$('#homePage .content').html(error.responseText);*/
		}
  })
}

function processMoreButton(){
	appendNextPage(apiListViewParams);
}

function enableEmailButton(body){
	console.log('emal: '+$('.send-email').length);
	$('.send-email').attr( 'href','mailto:?body='+escape( body )+'&subject=referaty.aktuality.sk' );
}

function disableEmailButton(){
	$('.send-email').attr('href','');
}

/***** calls ******/
var currentCategoryFindId = 0;

function enterCategories(data,params){
	
	if( Object.keys(catFullData).length == 0 ){
		apiCall({akcia:"kategorie"},'enterCategoriesCallback');
	}else if($('#savedItems .cat-list li').length == 0){
	 	makeCategories( catFullData );
	 	Mfrm.goTo( '#homePage', 'slide' );
	}else{
		Mfrm.goTo( '#homePage', 'slide' );
	}
	
}

function enterCategoriesCallback(data){
	makeCategories(data);
	Mfrm.goTo( '#homePage', 'slide' );
}

function makeCategories(data){
	
	currentCategoryFindId = 0;
	
	catFullData = data;
	
	if(typeof data.categories != 'undefined' ){
		
		var categories = data.categories;
		
		var output = '<ul class="cat-list">';
		var subcategoriesOutput = '';
		
		for(var row in categories){
			
			categoriesData[categories[row].idCategory] = categories[row];
			
			output += '<li><a onclick="enterCategory('+categories[row].idCategory+');"><h1>'+categories[row].name+'</h1></a></li>';
			
			if(typeof categories[row].subCategories != 'undefined'){
				subcategoriesOutput += '<ul class="cat-list subcat hidden" id="'+categories[row].idCategory+'">';
				for(var subrow in categories[row].subCategories){
					subCategoriesData[categories[row].subCategories[subrow].idCategory] = categories[row].subCategories[subrow];
					subcategoriesOutput += '<li><a onclick="beforeEnterList(\''+categories[row].subCategories[subrow].sefName+'\')" id="'+categories[row].subCategories[subrow].idCategory+'" rel="'+categories[row].subCategories[subrow].sefName+'"><h1>'+categories[row].subCategories[subrow].name+'</h1></a></li>';
				}
				subcategoriesOutput += '</ul>';
			}
		}
		output += '</ul>';
		
		$('#homePage .content').html(output);
		$('#subCategory .content').html(subcategoriesOutput);
		
	}
	
	localStorage.categoriesData = JSON.stringify(categoriesData);
	localStorage.subCategoriesData = JSON.stringify(subCategoriesData);
	localStorage.catFullData = JSON.stringify( data );
	
	appendCateoryData();
	
}

function enterCategory(id){
	currentCategoryFindId = id;
	$('.cat-list.subcat').hide();
	$('#'+id).show();
	Mfrm.goTo('#subCategory','slide');
	
}

var listAktualPage = 1;

function beforeEnterList(sef){
	//$('#listView .content').html('');
	listAktualPage = 1;
	var obj = {akcia:'referaty',kategoria: sef,strana:listAktualPage};
	apiCall(obj,"enterlistOfItems");
}

var lastFindData;

function enterlistOfItems(data,params){
	
	apiListViewParams = params;
	
	if( ( typeof params.reports == 'undefined' && params.akcia == 'hladaj' && typeof data.search != 'undefined' ) || ( typeof params.reports != 'undefined' && params.akcia == 'hladaj' && typeof data.search != 'undefined' ) ){
		data['reports'] = data.search;
	}
	
	if( typeof data == 'undefined' ){
		return null;
	}
	
	var output = '<ul class="cat-list items ">';
	
	var test = createListofItems(data);
	
	if( test == false ){
		return;
	}
	
	output += test;

	output += '</ul>';
	
	if( $('#listView .content .cat-list').length != 0 ){
		$('#listView .content .cat-list').remove();
	}
	$('#showMoreButton').before(output);
	Mfrm.goTo('#listView', 'slide');
	
}

function appendNextPage(params){
	
	if( typeof params.strana != 'undefined' ){
		params.strana = params.strana + 1;
	}
	
	listAktualPage++;
	var obj = params;
	apiCall(obj,"appendNextPageCallback");
}

function appendNextPageCallback(data,params){
	
	if( ( typeof params.reports == 'undefined' && params.akcia == 'hladaj' && typeof data.search != 'undefined' ) || ( typeof params.reports != 'undefined' && params.akcia == 'hladaj' && typeof data.search != 'undefined' ) ){
		data['reports'] = data.search;
	}
	
	apiListViewParams = params;
	
	if( typeof data == 'undefined' ){
		return '';
	}
	
	var output = '';
	
	var test = createListofItems(data);
	
	if( test == false ){
		return;
	}
	
	output += test;

	$('#listView .content .cat-list').append(output);
	
}

function createListofItems(data){
	
	console.log(data);
	
	if( typeof data == 'undefined' || data == null || typeof data.reports == 'undefined' || data.reports == null || typeof data.reports.reports == 'undefined' || data.reports.reports == null){
		alert('Pre dané vyhľadávanie sa nenašla žiadna položka');
		return false;
	}
	
	var output = '';
	
	for(var row in data.reports.reports){
		output += '<li id="item-'+data.reports.reports[row].idReport+'" ><a onclick="enterDeatail('+data.reports.reports[row].idReport+');">';
		output += '<h1>'+data.reports.reports[row].title+'</h1>';
		if( typeof categoriesData[data.reports.reports[row].idCategory] != 'undefined' ){
			output += '<div class="info">'+categoriesData[data.reports.reports[row].idCategory].name+'</div>';
		}else{
			output += '<div class="info">'+subCategoriesData[data.reports.reports[row].idCategory].name+'</div>';
		}
		
		var dateObj = new Date(data.reports.reports[row].createTime*1000);
		
		output += '<div class="time">'+dateObj.getDate()+'.'+(dateObj.getMonth()+1)+'.'+dateObj.getFullYear()+',</div>';
		
		if( typeof config.schools[data.reports.reports[row].idSchool] != 'undefined' ){
			output += '<div class="school">'+config.schools[data.reports.reports[row].idSchool]+'</div>';
		}
		
		output += '<div class="ratingWrapper"><div class="rating" style="width:'+(data.reports.reports[row].ranging*10)+'px"></div></div>';
		
		if( typeof userData.savedItems[data.reports.reports[row].idReport] == 'undefined' ){
			output += '<div class="favorite"></div>';
		}else{
			output += '<div class="favorite saved"></div>';
		}
		
		output += '<div class="tiny-clear"></div></a></li>';
	}
	
	return output;
	
}

function enterDeatail(id){
	var obj = {akcia:'referat',referat:id};
	
	if($('#referatDetail-'+id).legth != 0){
		$('#referatDetail-'+id).remove();
	}
	
	if($('.referatDetailCloned').length > 2){
		$('.referatDetailCloned:first').remove();
	}
	
	var tpl = $('#referatDetailTpl').clone();
	tpl.attr('id','referatDetail-'+id);
	tpl.attr('data-role',"page");
	tpl.addClass('referatDetailCloned');
	
	$('body').append(tpl);
	Mfrm.init();
	tpl.children('.content').html('');
	apiCall(obj,"enterDeatailCallback");
}

function enterDeatailFromSaved(id){
	
	var tpl = $('#referatDetailTpl').clone();
	if($('#referatDetail-'+id).legth != 0){
		$('#referatDetail-'+id).remove();
	}
	
	if($('.referatDetailCloned').length > 2){
		$('.referatDetailCloned:first').remove();
	}
	
	tpl.attr('id','referatDetail-'+id);
	tpl.attr('data-role',"page");
	tpl.addClass('referatDetailCloned');
	
	$('body').append(tpl);
	Mfrm.init();
	tpl.children('.content').html('');
	
	if( typeof userData.savedItems[id] != 'undefined' ){
		enterDeatailCallback( userData.savedItems[id] , true );
	}
	
}

function enterDeatailCallback(data,disableTransition){
	
	if( typeof data == 'undefined' || typeof data.report == 'undefined' || data.report == null || typeof data.report.text == 'undefined'){
		return '';
	}
	
	curentItemData = data;
	
	var images = '';
	
	if( typeof data.report.images != 'undefined' && data.report.images.length != 0){
		for(var row in data.report.images){
			images += '<a class="fullimg" target="_blank" href="'+data.report.images[row].detail+'"><img src="'+data.report.images[row].galery+'" /></a>';
		}
	}
	
	$('#referatDetail-'+data.report.idReport+' .content').html(data.report.text+images);
	$('#referatDetail-'+data.report.idReport+' .detailTitle').html(data.report.title);

	$('#referatDetail-'+data.report.idReport+' .favorite').attr('onClick','saveUnsaveItem('+data.report.idReport+')');
	
	if( typeof userData.savedItems[data.report.idReport] != 'undefined' ){
		$('#referatDetail-'+data.report.idReport+' .favorite').addClass('saved');
	}
	
	if( typeof subCategoriesData[data.report.idCategory] != 'undefined' ){
		$('#referatDetail-'+data.report.idReport+' .detailCategory').prepend(subCategoriesData[data.report.idCategory].name).attr('onClick','beforeEnterList(\''+subCategoriesData[data.report.idCategory].sefName+'\')');
	}else if( typeof categoriesData[data.report.idCategory] != 'undefined' ){
		$('#referatDetail-'+data.report.idReport+' .detailCategory').prepend(categoriesData[data.report.idCategory].name).attr('onClick','enterCategory('+data.report.idCategory+')');
	}
	
	var detailInfo = '';
	if( data.report.nick != '' ){
		detailInfo += '<span>pridal <b>'+data.report.nick+'</b></span><div class="sep"></div>';
	}
	detailInfo += '<span>'+config.schools[data.report.idSchool]+'</span><div class="sep"></div>';
	
	var dateObj = new Date(data.report.createTime*1000);
	
	var date = dateObj.getDate()+'.'+(dateObj.getMonth()+1)+'.'+dateObj.getFullYear();
	
	detailInfo += '<span>'+date+'</span><div class="sep"></div>';
	detailInfo += '<span>videné '+data.report.viewsCount+'x</span><div class="tiny-clear"></div>';
	
	$('#referatDetail-'+data.report.idReport+' .detailInfo').html( detailInfo );
	$('#referatDetail-'+data.report.idReport+' .rating').css('width', (data.report.ranging*10) + 'px');
	
	enableEmailButton( data.report.reportUrl );
	
	if( typeof disableTransition != 'undefined' ){
		Mfrm.goTo('#referatDetail-'+data.report.idReport, 'slide');
	}
	
}

function searchInCategory(el){
	
	var params = new Object();
	if( currentCategoryFindId != 0 ){
		params.kategoria = currentCategoryFindId;
	}
	params.slovo = $('#'+el+' .simple-find').val();
	$('.simple-find,#search .input-search').val(params.slovo);
	params.akcia = 'hladaj';
	params.strana = 1;
	
	apiCall(params,"enterlistOfItems");
	
}


function saveUnsaveItem(id){
	
	if( typeof userData.savedItems[id] == 'undefined' ){
		userData.savedItems[id] = curentItemData;
		$('#listView #item-'+id+' .favorite').addClass('saved');
		$('#referatDetail-'+id+' .favorite').addClass('saved');
	}else{
		delete userData.savedItems[id];
		$('#listView #item-'+id+' .favorite').removeClass('saved');
		$('#referatDetail-'+id+' .favorite').removeClass('saved');
	}
	
	updateLocalstorage();
	
}

function updateLocalstorage(){
	localStorage.userData = JSON.stringify(userData);
}

function loadSavedItems(){
	
	Mfrm.showLoading();
	var output = createListofSavedItems(userData.savedItems);
	$('#savedItems .content').html(output);
	Mfrm.hideLoading();
	Mfrm.goTo('#savedItems','slide');
	
}

function createListofSavedItems(data){
	
	if(Object.keys(data).length == 0){
		return '<br /><br /><br /><center>Nemáš obľúbený žiaden referát.</center>';
	}
	
	var output = '<ul class="cat-list items ">';
	for( var row in data ){
		output += '<li id="item-'+data[row].report.idReport+'" ><a onclick="enterDeatailFromSaved('+data[row].report.idReport+');">';
		output += '<h1>'+data[row].report.title+'</h1>';
		if( typeof categoriesData[data[row].report.idCategory] != 'undefined' ){
			output += '<div class="info">'+categoriesData[data[row].report.idCategory].name+'</div>';
		}else{
			output += '<div class="info">'+subCategoriesData[data[row].report.idCategory].name+'</div>';
		}
		
		var dateObj = new Date(data[row].report.createTime*1000);
		
		output += '<div class="time">'+dateObj.getDate()+'.'+(dateObj.getMonth()+1)+'.'+dateObj.getFullYear()+',</div>';
		
		if( typeof config.schools[data[row].report.idSchool] != 'undefined' ){
			output += '<div class="school">'+config.schools[data[row].report.idSchool]+'</div>';
		}
		
		output += '<div class="ratingWrapper"><div class="rating" style="width:'+(data[row].report.ranging*10)+'px"></div></div>';
		
		output += '<div class="favorite saved"></div>';
		output += '<div class="tiny-clear"></div></a></li>';
	}
		
	
	output += '</ul>';
	
	return output;
}

function appendCateoryData(){
	
	if( $('#categoryselectbox .content li').length == 0 ){
		
		if(typeof catFullData.categories != 'undefined' ){
			
			var categories = catFullData.categories;
		
			var output = '<ul class="cat-list category"><li><a onclick="chooseCategory(\'\',\'Všetky\');">Všetky</a></li>';
			
			for( var row in categories ){
				output += '<li><a onclick="chooseCategory('+categories[row].idCategory+',\''+categories[row].name+'\');">'+categories[row].name+'</a></li>';
				
			}
			
			output += '</ul>';
			
			$('#categoryselectbox .content').html(output);
			
		}
	}
	
}

function processAdvanceSearch(){
	
	var params = new Object();
	
	params['akcia'] = 'hladaj';
	
	if( $('#search .input-search').val() != '' ){	params['slovo'] = $('#search .input-search').val();	}
	if( $('#search .select').attr('value') != '' ){	params['kategoria'] = $('#search .select').attr('value');	}
	if( $('#search .input-date-from').val() != '' ){	params['vytvorenyOd'] = $('#search .input-date-from').val();	}
	if( $('#search .input-date-to').val() != '' ){	params['vytvorenyDo'] = $('#search .input-date-to').val();	}
	if( $('#search .input-page-from').val() != '' ){	params['rozsahOd'] = $('#search .input-page-from').val();	}
	if( $('#search .input-page-to').val() != '' ){	params['rozsahDo'] = $('#search .input-page-to').val();	}
	if( $('#search .school-checkbox.checked').length > 0 ){
		params['skola'] = new Object();
		$('#search .school-checkbox.checked').each(function(){
			params['skola'][ $(this).attr('value')] = $(this).attr('value');
		})
	}
	if( $('#search .lang-checkbox.checked').length > 0 ){
		params['jazyk'] = new Object();
		$('#search .lang-checkbox.checked').each(function(){
			params['jazyk'][ $(this).attr('value')] = $(this).attr('value');
		})
	}
	
	params.strana = 1;
	var slovo = $('#search .input-search').val();
	$('.simple-find').val(slovo);
	
	apiCall(params,'enterlistOfItems');
	
}

function chooseCategory(id,name){
	$('#search .content .select').attr('value',id).html(name);
	Mfrm.goTo('#search','slideRight');
}




var config = {
	apiUrl: 'http://referaty.aktuality.sk/admin/api',
	//apiUrl: 'http://tahaky-api.solutions4web.sk/api/',
	schools: {1: 'ZŠ',2: 'SŠ', 3: 'VŠ'},
	version: 1.0,
	platform: "android",
}

var curentItemData;

if( typeof localStorage.userData == 'undefined' ){
	var userData = {
			savedItems: {},
		}
}else{
	//console.log( localStorage.userData );
	var userData = JSON.parse(localStorage.userData);
}

var categoriesData = new Object();
var subCategoriesData = new Object();
var catFullData = new Object();

if( typeof localStorage.categoriesData != 'undefined' ){
	var categoriesData = JSON.parse(localStorage.categoriesData);
}

if( typeof localStorage.categoriesData != 'undefined' ){
	subCategoriesData = JSON.parse(localStorage.subCategoriesData);
}

if( typeof localStorage.catFullData != 'undefined' ){
	catFullData = JSON.parse(localStorage.catFullData);
}

if( typeof localStorage.config == 'undefined' ){
	localStorage.config = JSON.stringify( config );
}




var MobileFrm = function(){
	
	myFrmObj = this;
	
	this.pageData = new Object();
	
	this.history = [];
	this.animationTime = 0.4;
	if( typeof localStorage.deviceWidth == 'undefined' ){ 
		this.width = window.innerWidth;
		localStorage.deviceWidth = window.innerWidth;
	}else{
		this.width = localStorage.deviceWidth;
	}
	
	if( typeof localStorage.deviceHeight == 'undefined' ){ 
		this.height = window.innerHeight;
		localStorage.deviceHeight = window.innerHeight;
	}else{
		this.height = localStorage.deviceHeight;
	}
	
	this.init = function(){
		
		var _pageHeight = this.height - ( $('#headerToolbar').outerHeight() + $('#footerToolbar').outerHeight());
		$('body, .page').css({width: this.width+'px'});
		$('.page:not(.current)').css({top: '0px',display:'none'}).css('-webkit-transform','translateX('+this.width+'px)');
		$('.page.current').css({position: 'relative'});
		$('#footerToolbar').css('top', ( this.height - $('#footerToolbar').outerHeight() ) + 'px' );

	}
	
	this.goTo = function( page , animation, back ){
		
		//console.log( animation );
		
		var _animation = 'none';
		if( typeof back == 'undefined' ){
			var _back = false;
		}else{
			var _back = true;
		}
		
		if( typeof animation != 'undefined' ){
			if( animation == 'slide' ){ _animation = 'slide';}
			if( animation == 'slideRight' ){ _animation = 'slideRight';}
			if( animation == 'slideUp' ){ _animation = 'slideUp';}
		}
		
		var _fromPage = $('.page.current');
		var _toPage = $(page);
		
		this.pageData.fromPage = _fromPage.attr('id');
		this.pageData.toPage = _toPage.attr('id');
		
		//console.log(this.pageData);
		
		if( _toPage.length != 0 && _fromPage.attr('id') != _toPage.attr('id') ){
			
			_fromPage.hide();
			$(document).scrollTop(0);
			
			if( _animation == 'none' ){
				
				$(document).trigger('changingPage', this.pageData );
				
				_toPage.css('-webkit-transform', 'translateX(0px)');
				_toPage.css({zIndex:'100',position:'relative',display:'block'}).css('-webkit-transition','all 0s ease-in-out').addClass('current');
				_fromPage.css({zIndex:'1',position:"absolute",display:'none'}).css('-webkit-transform','translateX('+this.width+'px)').removeClass('current');
				this.completeTransition(page, _animation, _back );
			}
			
			if( _animation == 'slide' ){
				
				$(document).trigger('changingPage', this.pageData );
				
				_time = this.animationTime;
				_wait = 10;
				
				_toPage.css('-webkit-transition','all '+_time+'s ease-in-out');
				_toPage.css({zIndex:'100',display:'block'});
				
				var width = this.width;
				
				setTimeout(function(){ _toPage.css('-webkit-transform', 'translateX(0px)');
				},_wait);
				
				setTimeout(function(){
					_toPage.css('-webkit-transition','all 0s ease-in-out');
					_toPage.css({position:'relative'}).addClass('current');
					_fromPage.css({zIndex:'1',position:"absolute",display:'none'})
						.css('-webkit-transform','translateX('+width+'px)')
						.removeClass('current');
					myFrmObj.completeTransition(page, _animation, _back );
				},( _time*1000 ) + ( _wait ) + 100 );
				
			}
			
			if( _animation == 'slideRight' ){
				
				$(document).trigger('changingPage', this.pageData );
				
				_time = this.animationTime;
				_wait = 10;
				
				_toPage.css('-webkit-transform','translateX(-'+this.width+'px)');
				_toPage.css({zIndex:'100',display:'block'});
				
				_toPage.css('-webkit-transition','all '+_time+'s ease-in-out');
				
				var height = this.height;
				var width = this.width;
				
				setTimeout(function(){ _toPage.css('-webkit-transform', 'translateX(0px)');
				},_wait);
				
				setTimeout(function(){
					_toPage.css('-webkit-transition','all 0s ease-in-out');
					_toPage.css({position:'relative'}).addClass('current');
					_fromPage.css({zIndex:'1',position:"absolute",display:'none'})
						.css('-webkit-transform','translateX('+width+'px) translateY(0px)')
						.removeClass('current');
					myFrmObj.completeTransition(page, _animation, _back );
				},( _time*1000 ) + ( _wait ) + 100 );
				
			}
			
			if( _animation == 'slideUp' ){
				
				$(document).trigger('changingPage', this.pageData );
				
				_toPage.css('-webkit-transform','translateY(-'+this.height+'px) translateX(0px)');
				_toPage.css({zIndex:'100',display:'block'});
				
				_time = this.animationTime;
				_wait = 10;
				
				_toPage.css('-webkit-transition','all '+_time+'s ease-in-out');
				
				var width = this.width;
				
				setTimeout(function(){ _toPage.css('-webkit-transform', 'translateY(0px)');
				},_wait);
				
				setTimeout(function(){
					_toPage.css('-webkit-transition','all 0s ease-in-out');
					_toPage.css({position:'relative'}).addClass('current');
					_fromPage.css({zIndex:'1',position:"absolute",display:'none'})
					.css('-webkit-transform','translateX('+width+'px) translateY(0px)')
					.removeClass('current');
					myFrmObj.completeTransition(page, _animation, _back );
				},( _time*1000 ) + ( _wait ) + 100 );
				
			}
			
		}
		
	}
	
	this.goBack = function(){
		
		if( this.history.length > 1 ){
			var _backPage = this.history[ this.history.length - 2 ];
			this.history.splice( this.history.length - 1, 1 );
			
			var _animation = undefined;
			if( _backPage['animation'] == 'slide' ){ _animation = 'slideRight'; }
			if( _backPage['animation'] == 'slideRight' ){ _animation = 'slide'; }
			
			this.goTo( _backPage['page'], _animation, true );
			
			return true;
		}else{
			return false;
		}
			
	}
	
	this.completeTransition = function( page, _animation , _back ){
		
		$(document).trigger('pageChanged', this.pageData );
		
		if( _back == false ){
			var historyObj = new Object();
			historyObj['page'] = page;
			historyObj['animation'] = _animation;
			this.history.push( historyObj );
			
		}
		
		//console.log(this.history);
	}
	
	this.showLoading = function(){
		$('#loadingBar').show();
	}
	
	this.hideLoading = function(){
		$('#loadingBar').hide();
	}
	
	this.hideSplashscreen = function(){
		$('#splashscreen').hide();
	}
}


