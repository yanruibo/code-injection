


HYWEBAPP.addPage(HYWEBAPP.createPage("activityMap"));

HYWEBAPP.addRoute({
	"#activityMap(?:[?](.*))?" : {
				events: "bs",
				handler: function (eventType, match, ui) {
					
					HYWEBAPP.prevPage = ui.prevPage;
					HYWEBAPP.nextPage = ui.nextPage;
					
					
						var params = HYWEBAPP.getRouteParams(match[1]);
						
							if(params !== null){
								console.log("CtNode: "+params.CtNode);
								//HYWEBAPP.page("activityMap").addVar("CtNode", params.CtNode);
								HYWEBAPP.page("activityMap").variable("CtNode", params.CtNode);
							}else{
								console.log("No Params");
								//HYWEBAPP.page("activityMap").addVar("CtNode", "");
								HYWEBAPP.page("activityMap").variable("CtNode", "");
							}
						
							if(params !== null){
								console.log("xItem: "+params.xItem);
								//HYWEBAPP.page("activityMap").addVar("xItem", params.xItem);
								HYWEBAPP.page("activityMap").variable("xItem", params.xItem);
							}else{
								console.log("No Params");
								//HYWEBAPP.page("activityMap").addVar("xItem", "");
								HYWEBAPP.page("activityMap").variable("xItem", "");
							}
						
							if(params !== null){
								console.log("xq_xCat: "+params.xq_xCat);
								//HYWEBAPP.page("activityMap").addVar("xq_xCat", params.xq_xCat);
								HYWEBAPP.page("activityMap").variable("xq_xCat", params.xq_xCat);
							}else{
								console.log("No Params");
								//HYWEBAPP.page("activityMap").addVar("xq_xCat", "");
								HYWEBAPP.page("activityMap").variable("xq_xCat", "");
							}
						
							if(params !== null){
								console.log("startS: "+params.startS);
								//HYWEBAPP.page("activityMap").addVar("startS", params.startS);
								HYWEBAPP.page("activityMap").variable("startS", params.startS);
							}else{
								console.log("No Params");
								//HYWEBAPP.page("activityMap").addVar("startS", "");
								HYWEBAPP.page("activityMap").variable("startS", "");
							}
						
							if(params !== null){
								console.log("startE: "+params.startE);
								//HYWEBAPP.page("activityMap").addVar("startE", params.startE);
								HYWEBAPP.page("activityMap").variable("startE", params.startE);
							}else{
								console.log("No Params");
								//HYWEBAPP.page("activityMap").addVar("startE", "");
								HYWEBAPP.page("activityMap").variable("startE", "");
							}
						
							if(params !== null){
								console.log("endS: "+params.endS);
								//HYWEBAPP.page("activityMap").addVar("endS", params.endS);
								HYWEBAPP.page("activityMap").variable("endS", params.endS);
							}else{
								console.log("No Params");
								//HYWEBAPP.page("activityMap").addVar("endS", "");
								HYWEBAPP.page("activityMap").variable("endS", "");
							}
						
							if(params !== null){
								console.log("endE: "+params.endE);
								//HYWEBAPP.page("activityMap").addVar("endE", params.endE);
								HYWEBAPP.page("activityMap").variable("endE", params.endE);
							}else{
								console.log("No Params");
								//HYWEBAPP.page("activityMap").addVar("endE", "");
								HYWEBAPP.page("activityMap").variable("endE", "");
							}
						
					
					HYWEBAPP.page("activityMap").execHandler('pagebeforeshow');
				
					for(itemName in HYWEBAPP.page("activityMap").items()){
						var item = HYWEBAPP.page("activityMap").item(itemName);
						console.log(itemName + " Start Init!!");
						item.execHandler('pagebeforeshow');
					}
				}
	}
});

HYWEBAPP.addRoute({
	"#activityMap(?:[?](.*))?" : {
				events: "s",
				handler: function (eventType, match, ui) {
					
					HYWEBAPP.prevPage = ui.prevPage;
					HYWEBAPP.nextPage = ui.nextPage;
					
					HYWEBAPP.page("activityMap").execHandler('pageshow');
				
					for(itemName in HYWEBAPP.page("activityMap").items()){
						var item = HYWEBAPP.page("activityMap").item(itemName);
						console.log(itemName + " Show!!");
						item.execHandler('pageshow');
					}
				}
	}
});

HYWEBAPP.addRoute({
	"#activityMap(?:[?](.*))?" : {
				events: "bh",
				handler: function (eventType, match, ui) {
					HYWEBAPP.nextPage = ui.nextPage;
					HYWEBAPP.page("activityMap").execHandler('pagebeforehide');
				}
	}
});


	
		HYWEBAPP.addRoute({
			"#activityMap(?:[?](.*))?" : {
				events: "i",
				handler: function (eventType, match, ui) {
				
					HYWEBAPP.prevPage = ui.prevPage;
					HYWEBAPP.nextPage = ui.nextPage;
				
					
					
					HYWEBAPP.page("activityMap").execHandler('pageinit');
				
					for(itemName in HYWEBAPP.page("activityMap").items()){
						var item = HYWEBAPP.page("activityMap").item(itemName);
						item.execHandler('pageinit');
					}
				}
			}
		});
        

       				HYWEBAPP.page("activityMap").addDS(
       					HYWEBAPP.page("activityMap").createDS("mapLP", "json", 
       						
       								{
       									url: "http://vod.taichung.gov.tw:8080/hyAPPServer/hyAppDS",
       									data: { _action : "XDQLP.xml" , CtNode : "6648" , CtUnit : "3191" , BaseDSD : "62" , qpsubmit : "3364.751" , htx_topCat : 
			function(callbacks){
				var result = HYWEBAPP.page('activityMap').variable('xq_xCat');
				callbacks.success(result);
			}
		, htx_ActStartTime_S : 
			function(callbacks){
				var result = HYWEBAPP.page('activityMap').variable('startS');
				callbacks.success(result);
			}
		, htx_ActStartTime_E : 
			function(callbacks){
				var result = HYWEBAPP.page('activityMap').variable('startE');
				callbacks.success(result);
			}
		, htx_ActEndTime_S : 
			function(callbacks){
				var result = HYWEBAPP.page('activityMap').variable('endS');
				callbacks.success(result);
			}
		, htx_ActEndTime_E : 
			function(callbacks){
				var result = HYWEBAPP.page('activityMap').variable('endE');
				callbacks.success(result);
			}
		, pagesize : "20000" 
        									  },
        								options: 
	{
		
		cache: false,
		offline: false,
		context: HYWEBAPP.page("activityMap").ds("mapLP")
	}

       								}
       							
       					)
       				);
       			
    HYWEBAPP.page("activityMap").addItem(
		HYWEBAPP.page("activityMap").createItem("addressMap", "map")
	);    

	HYWEBAPP.page("activityMap").item("addressMap").setHandler('pageshow', function (eventType, match, ui) {
		
						HYWEBAPP.page("activityMap").item("addressMap").getContext().css('width', '100%').css('height', '300pX').css('min-height', '100%');
					
	});				

            		HYWEBAPP.page("activityMap").addEventHandler("pagebeforeshow", function(){
		       			
            
            		var startTime = new Date(),
            			endTime = new Date();
            		startTime.setDate(startTime.getDate() - 7);
            		endTime.setDate(endTime.getDate() + 7);
            		HYWEBAPP.page('activityMap').variable('startS', toDateString(startTime));
            		HYWEBAPP.page('activityMap').variable('startE', toDateString(endTime));
            		HYWEBAPP.page('activityMap').variable('endS', toDateString(startTime));
            		HYWEBAPP.page('activityMap').variable('endE', toDateString(endTime));
            			
            		HYWEBAPP.page('activityMap').ds('mapLP').getContent({
	            		success: function(result){
	            			var data = (!result.data.TopicList.Article)?[]:(result.data.TopicList.Article.length)?result.data.TopicList.Article:[result.data.TopicList.Article],
	            				map = [],
		           				xNode = result.data.TopicList._xNode;
		           				
		           			if(data.length === 0){ 
		           				navigator.notification.alert('無符合日期條件的活動資料（開始和結束日期於今日起前後一週內）。', null, '無符合條件資料', '確認'); 
		           			}
		           			
		           			HYWEBAPP.page('activityMap').item('addressMap').closeInfoWindow();
		           			HYWEBAPP.page('activityMap').item('addressMap').clear('markers');
		           			
		           			for(var i in data){
		           				var stitle = getArticleFieldValue(data[i].ArticleField, 'stitle'),
		           					xItem = data[i]._iCuItem,
		           					xq_xCat = HYWEBAPP.page('activityMap').variable('xq_xCat'),
		           					ctNode = xNode,
		           					address = getArticleFieldValue(data[i].ArticleField, 'xaddress');
		           				map.push({ stitle: stitle, xItem: xItem, xq_xCat: xq_xCat, ctNode: ctNode, address: address });
		           			}
		           			
		           			$.each(map, function(index, obj){
		           				HYWEBAPP.page('activityMap').item('addressMap').search(obj.address, function(results){
		            				HYWEBAPP.page('activityMap').item('addressMap').getContext().gmap('addMarker', {'position': results[0].geometry.location, 'bounds': true}).click(function(){
		            					HYWEBAPP.page('activityMap').item('addressMap').getContext().gmap('openInfoWindow', {'content': '<div class="map-info-window"><ul class="map-info-list"><li>' + obj.stitle + '</li><li>' + obj.address + '</li></ul><span class="map-info-link"><a href="#" onclick="javascript: HYWEBAPP.page(\'activityMap\').item(\'addressMap\').closeInfoWindow();">關閉</a></span><span class="map-info-link"><a href="#" onclick="javascript: HYWEBAPP.toPage(\'activityItem\', { xItem: \'' + obj.xItem + '\', CtNode: \'' + obj.ctNode + '\', xq_xCat: \'' + obj.xq_xCat + '\' });">詳細</a></span><span class="map-info-link"><a href="#" onclick="javascript: showDirection(HYWEBAPP.page(\'activityMap\').item(\'addressMap\'), \'' + this.getPosition() + '\');">規劃路徑</a></span></div>' }, this);
		            				});
		            			});
		           			});
	            		}
	            	});
            
        
		       		});
            	






























































HYWEBAPP.addPage(HYWEBAPP.createPage("search"));

HYWEBAPP.addRoute({
	"#search(?:[?](.*))?" : {
				events: "bs",
				handler: function (eventType, match, ui) {
					
					HYWEBAPP.prevPage = ui.prevPage;
					HYWEBAPP.nextPage = ui.nextPage;
					
					
						var params = HYWEBAPP.getRouteParams(match[1]);
						
							if(params !== null){
								console.log("xq_xCat: "+params.xq_xCat);
								//HYWEBAPP.page("search").addVar("xq_xCat", params.xq_xCat);
								HYWEBAPP.page("search").variable("xq_xCat", params.xq_xCat);
							}else{
								console.log("No Params");
								//HYWEBAPP.page("search").addVar("xq_xCat", "");
								HYWEBAPP.page("search").variable("xq_xCat", "");
							}
						
					
					HYWEBAPP.page("search").execHandler('pagebeforeshow');
				
					for(itemName in HYWEBAPP.page("search").items()){
						var item = HYWEBAPP.page("search").item(itemName);
						console.log(itemName + " Start Init!!");
						item.execHandler('pagebeforeshow');
					}
				}
	}
});

HYWEBAPP.addRoute({
	"#search(?:[?](.*))?" : {
				events: "s",
				handler: function (eventType, match, ui) {
					
					HYWEBAPP.prevPage = ui.prevPage;
					HYWEBAPP.nextPage = ui.nextPage;
					
					HYWEBAPP.page("search").execHandler('pageshow');
				
					for(itemName in HYWEBAPP.page("search").items()){
						var item = HYWEBAPP.page("search").item(itemName);
						console.log(itemName + " Show!!");
						item.execHandler('pageshow');
					}
				}
	}
});

HYWEBAPP.addRoute({
	"#search(?:[?](.*))?" : {
				events: "bh",
				handler: function (eventType, match, ui) {
					HYWEBAPP.nextPage = ui.nextPage;
					HYWEBAPP.page("search").execHandler('pagebeforehide');
				}
	}
});


	
		HYWEBAPP.addRoute({
			"#search(?:[?](.*))?" : {
				events: "i",
				handler: function (eventType, match, ui) {
				
					HYWEBAPP.prevPage = ui.prevPage;
					HYWEBAPP.nextPage = ui.nextPage;
				
					
					
					HYWEBAPP.page("search").execHandler('pageinit');
				
					for(itemName in HYWEBAPP.page("search").items()){
						var item = HYWEBAPP.page("search").item(itemName);
						item.execHandler('pageinit');
					}
				}
			}
		});
        

    HYWEBAPP.page("search").addItem(
		HYWEBAPP.page("search").createItem("keyWord", "text")
	);    

    HYWEBAPP.page("search").addItem(
		HYWEBAPP.page("search").createItem("searchField", "select")
	);    

    HYWEBAPP.page("search").addItem(
		HYWEBAPP.page("search").createItem("searchType", "select")
	);    

    HYWEBAPP.page("search").addItem(
		HYWEBAPP.page("search").createItem("activityStartS", "scroller")
	);    

	HYWEBAPP.page("search").item("activityStartS").setHandler('pagebeforeshow', function(){
		HYWEBAPP.page("search").item("activityStartS").getContext().scroller({
			headerText: false
			,dateFormat: 
								'yy/mm/dd'
							
			,dateOrder: 
								'yymmdd'
							
			,theme: 
							'jqm'
						
			,mode: 
							'scroller'
						
			,display: 
							'modal'
						
			,cancelText: 
							'取消'
						
			,setText: 
							'確定'
						
			,width: 
							80
						
						,preset: 'date'
					
		});
	});			

    HYWEBAPP.page("search").addItem(
		HYWEBAPP.page("search").createItem("activityStartE", "scroller")
	);    

	HYWEBAPP.page("search").item("activityStartE").setHandler('pagebeforeshow', function(){
		HYWEBAPP.page("search").item("activityStartE").getContext().scroller({
			headerText: false
			,dateFormat: 
								'yy/mm/dd'
							
			,dateOrder: 
								'yymmdd'
							
			,theme: 
							'jqm'
						
			,mode: 
							'scroller'
						
			,display: 
							'modal'
						
			,cancelText: 
							'取消'
						
			,setText: 
							'確定'
						
			,width: 
							80
						
						,preset: 'date'
					
		});
	});			

    HYWEBAPP.page("search").addItem(
		HYWEBAPP.page("search").createItem("activityEndS", "scroller")
	);    

	HYWEBAPP.page("search").item("activityEndS").setHandler('pagebeforeshow', function(){
		HYWEBAPP.page("search").item("activityEndS").getContext().scroller({
			headerText: false
			,dateFormat: 
								'yy/mm/dd'
							
			,dateOrder: 
								'yymmdd'
							
			,theme: 
							'jqm'
						
			,mode: 
							'scroller'
						
			,display: 
							'modal'
						
			,cancelText: 
							'取消'
						
			,setText: 
							'確定'
						
			,width: 
							80
						
						,preset: 'date'
					
		});
	});			

    HYWEBAPP.page("search").addItem(
		HYWEBAPP.page("search").createItem("activityEndE", "scroller")
	);    

	HYWEBAPP.page("search").item("activityEndE").setHandler('pagebeforeshow', function(){
		HYWEBAPP.page("search").item("activityEndE").getContext().scroller({
			headerText: false
			,dateFormat: 
								'yy/mm/dd'
							
			,dateOrder: 
								'yymmdd'
							
			,theme: 
							'jqm'
						
			,mode: 
							'scroller'
						
			,display: 
							'modal'
						
			,cancelText: 
							'取消'
						
			,setText: 
							'確定'
						
			,width: 
							80
						
						,preset: 'date'
					
		});
	});			

    HYWEBAPP.page("search").addItem(
		HYWEBAPP.page("search").createItem("queryBtn", "button")
	);    




HYWEBAPP.addPage(HYWEBAPP.createPage("index"));

HYWEBAPP.addRoute({
	"#index(?:[?](.*))?" : {
				events: "bs",
				handler: function (eventType, match, ui) {
					
					HYWEBAPP.prevPage = ui.prevPage;
					HYWEBAPP.nextPage = ui.nextPage;
					
					
					
					HYWEBAPP.page("index").execHandler('pagebeforeshow');
				
					for(itemName in HYWEBAPP.page("index").items()){
						var item = HYWEBAPP.page("index").item(itemName);
						console.log(itemName + " Start Init!!");
						item.execHandler('pagebeforeshow');
					}
				}
	}
});

HYWEBAPP.addRoute({
	"#index(?:[?](.*))?" : {
				events: "s",
				handler: function (eventType, match, ui) {
					
					HYWEBAPP.prevPage = ui.prevPage;
					HYWEBAPP.nextPage = ui.nextPage;
					
					HYWEBAPP.page("index").execHandler('pageshow');
				
					for(itemName in HYWEBAPP.page("index").items()){
						var item = HYWEBAPP.page("index").item(itemName);
						console.log(itemName + " Show!!");
						item.execHandler('pageshow');
					}
				}
	}
});

HYWEBAPP.addRoute({
	"#index(?:[?](.*))?" : {
				events: "bh",
				handler: function (eventType, match, ui) {
					HYWEBAPP.nextPage = ui.nextPage;
					HYWEBAPP.page("index").execHandler('pagebeforehide');
				}
	}
});


	
		HYWEBAPP.addRoute({
			"#index(?:[?](.*))?" : {
				events: "i",
				handler: function (eventType, match, ui) {
				
					HYWEBAPP.prevPage = ui.prevPage;
					HYWEBAPP.nextPage = ui.nextPage;
				
					
					
					HYWEBAPP.page("index").execHandler('pageinit');
				
					for(itemName in HYWEBAPP.page("index").items()){
						var item = HYWEBAPP.page("index").item(itemName);
						item.execHandler('pageinit');
					}
				}
			}
		});
        

    HYWEBAPP.page("index").addItem(
		HYWEBAPP.page("index").createItem("logo", "image")
	);    

    HYWEBAPP.page("index").addItem(
		HYWEBAPP.page("index").createItem("performanceIcon", "image")
	);    

       	HYWEBAPP.page("index").item("performanceIcon").addEventHandler('click',function(){
       		
       				HYWEBAPP.toPage('activityList', 
			{
				xq_xCat: '01', nowPage: '1'
			}
		);
       			
       	});
    
    HYWEBAPP.page("index").addItem(
		HYWEBAPP.page("index").createItem("forumIcon", "image")
	);    

       	HYWEBAPP.page("index").item("forumIcon").addEventHandler('click',function(){
       		
       				HYWEBAPP.toPage('activityList', 
			{
				xq_xCat: '02', nowPage: '1'
			}
		);
       			
       	});
    
    HYWEBAPP.page("index").addItem(
		HYWEBAPP.page("index").createItem("competitionIcon", "image")
	);    

       	HYWEBAPP.page("index").item("competitionIcon").addEventHandler('click',function(){
       		
       				HYWEBAPP.toPage('activityList', 
			{
				xq_xCat: '03', nowPage: '1'
			}
		);
       			
       	});
    
    HYWEBAPP.page("index").addItem(
		HYWEBAPP.page("index").createItem("exhibitionIcon", "image")
	);    

       	HYWEBAPP.page("index").item("exhibitionIcon").addEventHandler('click',function(){
       		
       				HYWEBAPP.toPage('activityList', 
			{
				xq_xCat: '04', nowPage: '1'
			}
		);
       			
       	});
    
    HYWEBAPP.page("index").addItem(
		HYWEBAPP.page("index").createItem("activitiesIcon", "image")
	);    

       	HYWEBAPP.page("index").item("activitiesIcon").addEventHandler('click',function(){
       		
       				HYWEBAPP.toPage('activityList', 
			{
				xq_xCat: '99', nowPage: '1'
			}
		);
       			
       	});
    
    HYWEBAPP.page("index").addItem(
		HYWEBAPP.page("index").createItem("favoritesIcon", "image")
	);    

       	HYWEBAPP.page("index").item("favoritesIcon").addEventHandler('click',function(){
       		
       				HYWEBAPP.toPage('myFavorite', 
			{
				
			}
		);
       			
       	});
    



HYWEBAPP.addPage(HYWEBAPP.createPage("searchResult"));

HYWEBAPP.addRoute({
	"#searchResult(?:[?](.*))?" : {
				events: "bs",
				handler: function (eventType, match, ui) {
					
					HYWEBAPP.prevPage = ui.prevPage;
					HYWEBAPP.nextPage = ui.nextPage;
					
					
						var params = HYWEBAPP.getRouteParams(match[1]);
						
							if(params !== null){
								console.log("xq_xCat: "+params.xq_xCat);
								//HYWEBAPP.page("searchResult").addVar("xq_xCat", params.xq_xCat);
								HYWEBAPP.page("searchResult").variable("xq_xCat", params.xq_xCat);
							}else{
								console.log("No Params");
								//HYWEBAPP.page("searchResult").addVar("xq_xCat", "");
								HYWEBAPP.page("searchResult").variable("xq_xCat", "");
							}
						
							if(params !== null){
								console.log("keyword: "+params.keyword);
								//HYWEBAPP.page("searchResult").addVar("keyword", params.keyword);
								HYWEBAPP.page("searchResult").variable("keyword", params.keyword);
							}else{
								console.log("No Params");
								//HYWEBAPP.page("searchResult").addVar("keyword", "");
								HYWEBAPP.page("searchResult").variable("keyword", "");
							}
						
							if(params !== null){
								console.log("field: "+params.field);
								//HYWEBAPP.page("searchResult").addVar("field", params.field);
								HYWEBAPP.page("searchResult").variable("field", params.field);
							}else{
								console.log("No Params");
								//HYWEBAPP.page("searchResult").addVar("field", "");
								HYWEBAPP.page("searchResult").variable("field", "");
							}
						
							if(params !== null){
								console.log("type: "+params.type);
								//HYWEBAPP.page("searchResult").addVar("type", params.type);
								HYWEBAPP.page("searchResult").variable("type", params.type);
							}else{
								console.log("No Params");
								//HYWEBAPP.page("searchResult").addVar("type", "");
								HYWEBAPP.page("searchResult").variable("type", "");
							}
						
							if(params !== null){
								console.log("startS: "+params.startS);
								//HYWEBAPP.page("searchResult").addVar("startS", params.startS);
								HYWEBAPP.page("searchResult").variable("startS", params.startS);
							}else{
								console.log("No Params");
								//HYWEBAPP.page("searchResult").addVar("startS", "");
								HYWEBAPP.page("searchResult").variable("startS", "");
							}
						
							if(params !== null){
								console.log("startE: "+params.startE);
								//HYWEBAPP.page("searchResult").addVar("startE", params.startE);
								HYWEBAPP.page("searchResult").variable("startE", params.startE);
							}else{
								console.log("No Params");
								//HYWEBAPP.page("searchResult").addVar("startE", "");
								HYWEBAPP.page("searchResult").variable("startE", "");
							}
						
							if(params !== null){
								console.log("endS: "+params.endS);
								//HYWEBAPP.page("searchResult").addVar("endS", params.endS);
								HYWEBAPP.page("searchResult").variable("endS", params.endS);
							}else{
								console.log("No Params");
								//HYWEBAPP.page("searchResult").addVar("endS", "");
								HYWEBAPP.page("searchResult").variable("endS", "");
							}
						
							if(params !== null){
								console.log("endE: "+params.endE);
								//HYWEBAPP.page("searchResult").addVar("endE", params.endE);
								HYWEBAPP.page("searchResult").variable("endE", params.endE);
							}else{
								console.log("No Params");
								//HYWEBAPP.page("searchResult").addVar("endE", "");
								HYWEBAPP.page("searchResult").variable("endE", "");
							}
						
							if(params !== null){
								console.log("htx_stitle: "+params.htx_stitle);
								//HYWEBAPP.page("searchResult").addVar("htx_stitle", params.htx_stitle);
								HYWEBAPP.page("searchResult").variable("htx_stitle", params.htx_stitle);
							}else{
								console.log("No Params");
								//HYWEBAPP.page("searchResult").addVar("htx_stitle", "");
								HYWEBAPP.page("searchResult").variable("htx_stitle", "");
							}
						
							if(params !== null){
								console.log("htx_ActPlayer: "+params.htx_ActPlayer);
								//HYWEBAPP.page("searchResult").addVar("htx_ActPlayer", params.htx_ActPlayer);
								HYWEBAPP.page("searchResult").variable("htx_ActPlayer", params.htx_ActPlayer);
							}else{
								console.log("No Params");
								//HYWEBAPP.page("searchResult").addVar("htx_ActPlayer", "");
								HYWEBAPP.page("searchResult").variable("htx_ActPlayer", "");
							}
						
							if(params !== null){
								console.log("htx_xaddress: "+params.htx_xaddress);
								//HYWEBAPP.page("searchResult").addVar("htx_xaddress", params.htx_xaddress);
								HYWEBAPP.page("searchResult").variable("htx_xaddress", params.htx_xaddress);
							}else{
								console.log("No Params");
								//HYWEBAPP.page("searchResult").addVar("htx_xaddress", "");
								HYWEBAPP.page("searchResult").variable("htx_xaddress", "");
							}
						
					
					HYWEBAPP.page("searchResult").execHandler('pagebeforeshow');
				
					for(itemName in HYWEBAPP.page("searchResult").items()){
						var item = HYWEBAPP.page("searchResult").item(itemName);
						console.log(itemName + " Start Init!!");
						item.execHandler('pagebeforeshow');
					}
				}
	}
});

HYWEBAPP.addRoute({
	"#searchResult(?:[?](.*))?" : {
				events: "s",
				handler: function (eventType, match, ui) {
					
					HYWEBAPP.prevPage = ui.prevPage;
					HYWEBAPP.nextPage = ui.nextPage;
					
					HYWEBAPP.page("searchResult").execHandler('pageshow');
				
					for(itemName in HYWEBAPP.page("searchResult").items()){
						var item = HYWEBAPP.page("searchResult").item(itemName);
						console.log(itemName + " Show!!");
						item.execHandler('pageshow');
					}
				}
	}
});

HYWEBAPP.addRoute({
	"#searchResult(?:[?](.*))?" : {
				events: "bh",
				handler: function (eventType, match, ui) {
					HYWEBAPP.nextPage = ui.nextPage;
					HYWEBAPP.page("searchResult").execHandler('pagebeforehide');
				}
	}
});


	
		HYWEBAPP.addRoute({
			"#searchResult(?:[?](.*))?" : {
				events: "i",
				handler: function (eventType, match, ui) {
				
					HYWEBAPP.prevPage = ui.prevPage;
					HYWEBAPP.nextPage = ui.nextPage;
				
					
					
					HYWEBAPP.page("searchResult").execHandler('pageinit');
				
					for(itemName in HYWEBAPP.page("searchResult").items()){
						var item = HYWEBAPP.page("searchResult").item(itemName);
						item.execHandler('pageinit');
					}
				}
			}
		});
        

       				HYWEBAPP.page("searchResult").addDS(
       					HYWEBAPP.page("searchResult").createDS("searchLP", "json", 
       						
       								{
       									url: "http://vod.taichung.gov.tw:8080/hyAPPServer/hyAppDS",
       									data: { _action : "XDQLP.xml" , CtNode : "6648" , CtUnit : "3191" , BaseDSD : "62" , qpsubmit : "3364.751" , htx_stitle : 
			function(callbacks){
				var result = HYWEBAPP.page('searchResult').variable('htx_stitle');
				callbacks.success(result);
			}
		, htx_topCat : 
			function(callbacks){
				var result = HYWEBAPP.page('searchResult').variable('type');
				callbacks.success(result);
			}
		, htx_ActPlayer : 
			function(callbacks){
				var result = HYWEBAPP.page('searchResult').variable('htx_ActPlayer');
				callbacks.success(result);
			}
		, htx_ActStartTime_S : 
			function(callbacks){
				var result = HYWEBAPP.page('searchResult').variable('startS');
				callbacks.success(result);
			}
		, htx_ActStartTime_E : 
			function(callbacks){
				var result = HYWEBAPP.page('searchResult').variable('startE');
				callbacks.success(result);
			}
		, htx_ActEndTime_S : 
			function(callbacks){
				var result = HYWEBAPP.page('searchResult').variable('endS');
				callbacks.success(result);
			}
		, htx_ActEndTime_E : 
			function(callbacks){
				var result = HYWEBAPP.page('searchResult').variable('endE');
				callbacks.success(result);
			}
		, htx_xaddress : 
			function(callbacks){
				var result = HYWEBAPP.page('searchResult').variable('htx_xaddress');
				callbacks.success(result);
			}
		, pagesize : "20000" 
        									  },
        								options: 
	{
		
		cache: false,
		offline: false,
		context: HYWEBAPP.page("searchResult").ds("searchLP")
	}

       								}
       							
       					)
       				);
       			
    HYWEBAPP.page("searchResult").addItem(
		HYWEBAPP.page("searchResult").createItem("itemList", "list")
	);    

            		HYWEBAPP.page("searchResult").addEventHandler("pagebeforeshow", function(){
		       			
            
            	var field = HYWEBAPP.page('searchResult').variable('field'),
            		keyword = encodeURIComponent(HYWEBAPP.page('searchResult').variable('keyword'));
            	if(field === 'activityTitle'){
            		HYWEBAPP.page('searchResult').variable('htx_stitle', keyword);
            	}else if(field === 'activityActor'){
            		HYWEBAPP.page('searchResult').variable('htx_ActPlayer', keyword);
            	}else if(field === 'activityAddress'){
            		HYWEBAPP.page('searchResult').variable('htx_xaddress', keyword);
            	}
            
            	HYWEBAPP.page('searchResult').ds('searchLP').getContent({
	           		success: function(result){
	           			var data = (result.data.TopicList.Article)?(result.data.TopicList.Article.length)?result.data.TopicList.Article:[result.data.TopicList.Article]:[],
	           				xNode = result.data.TopicList._xNode,
	           				liHtml = '';
	           			for(var i in data){
	           				var sTitle = getArticleFieldValue(data[i].ArticleField, 'stitle'),
	           					stime = getArticleFieldValue(data[i].ArticleField, 'ActStartTime'),
	           					etime = getArticleFieldValue(data[i].ArticleField, 'ActEndTime'),
	           					topCat = parseTopCat(getArticleFieldValue(data[i].ArticleField, 'xreftopCat')),
	           					address = getArticleFieldValue(data[i].ArticleField, 'xaddress');
	           				liHtml = liHtml + '<li><a href="javascript: HYWEBAPP.toPage(\'activityItem\', { xItem: \'' + data[i]._iCuItem + '\', CtNode: \'' + xNode + '\', xq_xCat: \'' + topCat + '\' });"><h3 class="ui-li-heading">' + sTitle + '</h3><p class="ui-li-desc">' + address + '</p><p class="ui-li-desc">' + stime + ' ~ ' + etime + '</p></a></li>';
	           			}
	           			HYWEBAPP.page('searchResult').item('itemList').getContext().html(liHtml);
	           			HYWEBAPP.page('searchResult').item('itemList').refresh();
	           			HYWEBAPP.page('searchResult').getContext().children('div[data-role=content]').eq(0).iscrollview('refresh');
	           			HYWEBAPP.page('searchResult').getContext().children('div[data-role=content]').eq(0).iscrollview('scrollTo', 0, 0, false);
	           		}
	           	});
            
        
		       		});
            	



HYWEBAPP.addPage(HYWEBAPP.createPage("myFavorite"));

HYWEBAPP.addRoute({
	"#myFavorite(?:[?](.*))?" : {
				events: "bs",
				handler: function (eventType, match, ui) {
					
					HYWEBAPP.prevPage = ui.prevPage;
					HYWEBAPP.nextPage = ui.nextPage;
					
					
					
					HYWEBAPP.page("myFavorite").execHandler('pagebeforeshow');
				
					for(itemName in HYWEBAPP.page("myFavorite").items()){
						var item = HYWEBAPP.page("myFavorite").item(itemName);
						console.log(itemName + " Start Init!!");
						item.execHandler('pagebeforeshow');
					}
				}
	}
});

HYWEBAPP.addRoute({
	"#myFavorite(?:[?](.*))?" : {
				events: "s",
				handler: function (eventType, match, ui) {
					
					HYWEBAPP.prevPage = ui.prevPage;
					HYWEBAPP.nextPage = ui.nextPage;
					
					HYWEBAPP.page("myFavorite").execHandler('pageshow');
				
					for(itemName in HYWEBAPP.page("myFavorite").items()){
						var item = HYWEBAPP.page("myFavorite").item(itemName);
						console.log(itemName + " Show!!");
						item.execHandler('pageshow');
					}
				}
	}
});

HYWEBAPP.addRoute({
	"#myFavorite(?:[?](.*))?" : {
				events: "bh",
				handler: function (eventType, match, ui) {
					HYWEBAPP.nextPage = ui.nextPage;
					HYWEBAPP.page("myFavorite").execHandler('pagebeforehide');
				}
	}
});


	
		HYWEBAPP.addRoute({
			"#myFavorite(?:[?](.*))?" : {
				events: "i",
				handler: function (eventType, match, ui) {
				
					HYWEBAPP.prevPage = ui.prevPage;
					HYWEBAPP.nextPage = ui.nextPage;
				
					
					
					HYWEBAPP.page("myFavorite").execHandler('pageinit');
				
					for(itemName in HYWEBAPP.page("myFavorite").items()){
						var item = HYWEBAPP.page("myFavorite").item(itemName);
						item.execHandler('pageinit');
					}
				}
			}
		});
        

    HYWEBAPP.page("myFavorite").addItem(
		HYWEBAPP.page("myFavorite").createItem("favoriteList", "list")
	);    

            		HYWEBAPP.page("myFavorite").addEventHandler("pagebeforeshow", function(){
		       			
            
            	var favoriteList = (HYWEBAPP.getLocalStorage('myfavorites') === null)?{}:JSON.parse(HYWEBAPP.getLocalStorage('myfavorites')),
            		liArtHtml = '';
            	for(var i in favoriteList){
            		liArtHtml = liArtHtml + '<li key="' + i + '"><a path="' + favoriteList[i].path + '" class="favorite" href="#"><h3 class="ui-li-heading">' + favoriteList[i].title + '</h3><p class="ui-li-desc">' + favoriteList[i].option.address + '</p><p class="ui-li-desc">' + favoriteList[i].option.time + '</p></a><a key="' + i + '" class="split-btn" href="#" data-icon="minus"></a></li>';
            	}
            	HYWEBAPP.page('myFavorite').item('favoriteList').getContext().html(liArtHtml);
       			HYWEBAPP.page('myFavorite').item('favoriteList').refresh();
       			HYWEBAPP.page('myFavorite').getContext().children('div[data-role=content]').eq(0).iscrollview('refresh');
       			HYWEBAPP.page('myFavorite').getContext().children('div[data-role=content]').eq(0).iscrollview('scrollTo', 0, 0, false);
       			
       			$('.favorite').each(function(){
       				$(this).unbind('click').bind('click', function(){
       					var result = parseUrl($(this).attr('path'));
       					HYWEBAPP.toPage(result.page, result.param);
       				});
       			});
       			
       			$('.split-btn').each(function(){
       				$(this).unbind('click').bind('click', function(){
       					var key = $(this).attr('key'),
       						that = $('li[key="' + key + '"]');
       					navigator.notification.confirm('確定要刪除嗎？',function(btnIndex){
	       					if(btnIndex === 1){
	       						deleteFromMyFavorite(key);
	       						that.remove();
	       						HYWEBAPP.page('myFavorite').item('favoriteList').refresh();
	       						HYWEBAPP.page('myFavorite').getContext().children('div[data-role=content]').eq(0).iscrollview('refresh');
       							HYWEBAPP.page('myFavorite').getContext().children('div[data-role=content]').eq(0).iscrollview('scrollTo', 0, 0, false);
	       					}
	       				},'刪除','確定,取消');
       				});
       			});
       			
       			function parseUrl(url){
            		var result = { page: "", param: {} },
            			pageID = "",
            			query;
            		if(url.indexOf('?') === -1){
            			pageID = url.substring(url.indexOf('#'));
            			result.page = pageID.replace(/#/g,'');
            		}else{
            			pageID = url.substring(url.indexOf('#'), url.indexOf('?'));
            			result.page = pageID.replace(/#/g,'');
            			query = url.substring(url.indexOf('?') + 1).split('&');
            			for(var i in query){
            				if(query[i] !== '' && query[i].indexOf('=') !== -1){
            					var paramItem = query[i].split('=');
            					if(paramItem[0] !== ''){
            						result.param[paramItem[0]] = decodeURIComponent(paramItem[1]);
            					}
            				}
            			}
            		}
            		return result;
            	}
            
        
		       		});
            	



HYWEBAPP.addPage(HYWEBAPP.createPage("activityList"));

HYWEBAPP.addRoute({
	"#activityList(?:[?](.*))?" : {
				events: "bs",
				handler: function (eventType, match, ui) {
					
					HYWEBAPP.prevPage = ui.prevPage;
					HYWEBAPP.nextPage = ui.nextPage;
					
					
						var params = HYWEBAPP.getRouteParams(match[1]);
						
							if(params !== null){
								console.log("xq_xCat: "+params.xq_xCat);
								//HYWEBAPP.page("activityList").addVar("xq_xCat", params.xq_xCat);
								HYWEBAPP.page("activityList").variable("xq_xCat", params.xq_xCat);
							}else{
								console.log("No Params");
								//HYWEBAPP.page("activityList").addVar("xq_xCat", "");
								HYWEBAPP.page("activityList").variable("xq_xCat", "");
							}
						
							if(params !== null){
								console.log("nowPage: "+params.nowPage);
								//HYWEBAPP.page("activityList").addVar("nowPage", params.nowPage);
								HYWEBAPP.page("activityList").variable("nowPage", params.nowPage);
							}else{
								console.log("No Params");
								//HYWEBAPP.page("activityList").addVar("nowPage", "");
								HYWEBAPP.page("activityList").variable("nowPage", "");
							}
						
							if(params !== null){
								console.log("totalPage: "+params.totalPage);
								//HYWEBAPP.page("activityList").addVar("totalPage", params.totalPage);
								HYWEBAPP.page("activityList").variable("totalPage", params.totalPage);
							}else{
								console.log("No Params");
								//HYWEBAPP.page("activityList").addVar("totalPage", "");
								HYWEBAPP.page("activityList").variable("totalPage", "");
							}
						
					
					HYWEBAPP.page("activityList").execHandler('pagebeforeshow');
				
					for(itemName in HYWEBAPP.page("activityList").items()){
						var item = HYWEBAPP.page("activityList").item(itemName);
						console.log(itemName + " Start Init!!");
						item.execHandler('pagebeforeshow');
					}
				}
	}
});

HYWEBAPP.addRoute({
	"#activityList(?:[?](.*))?" : {
				events: "s",
				handler: function (eventType, match, ui) {
					
					HYWEBAPP.prevPage = ui.prevPage;
					HYWEBAPP.nextPage = ui.nextPage;
					
					HYWEBAPP.page("activityList").execHandler('pageshow');
				
					for(itemName in HYWEBAPP.page("activityList").items()){
						var item = HYWEBAPP.page("activityList").item(itemName);
						console.log(itemName + " Show!!");
						item.execHandler('pageshow');
					}
				}
	}
});

HYWEBAPP.addRoute({
	"#activityList(?:[?](.*))?" : {
				events: "bh",
				handler: function (eventType, match, ui) {
					HYWEBAPP.nextPage = ui.nextPage;
					HYWEBAPP.page("activityList").execHandler('pagebeforehide');
				}
	}
});


	
		HYWEBAPP.addRoute({
			"#activityList(?:[?](.*))?" : {
				events: "i",
				handler: function (eventType, match, ui) {
				
					HYWEBAPP.prevPage = ui.prevPage;
					HYWEBAPP.nextPage = ui.nextPage;
				
					
						$('#activityList_content').live('iscroll_onpullup', function(e, d){
					        	console.log('page: activityList pull up to refresh!!');
					        	
					        			var callback = 
            
            	function(e, d){
            		console.log('pull up!!');
            		var nowPage = parseInt(HYWEBAPP.page('activityList').variable('nowPage'), 10),
            			totalPage = parseInt(HYWEBAPP.page('activityList').variable('totalPage'), 10),
            			nextPage = parseInt(HYWEBAPP.page('activityList').variable('nowPage'), 10) + 1,
            			xq_xCat = HYWEBAPP.page('activityList').variable('xq_xCat');
            			
            		if(nowPage === totalPage){
            			HYWEBAPP.page('activityList').getContext().children('div[data-role=content]').eq(0).iscrollview('refresh');
            			return;
            		}
            		
            		HYWEBAPP.page('activityList').variable('nowPage', nextPage);
            		HYWEBAPP.page('activityList').ds('activityLP').getContent({
		           		success: function(result){
		           			var data = (result.data.TopicList.Article)?(result.data.TopicList.Article.length)?result.data.TopicList.Article:[result.data.TopicList.Article]:[],
		           				xNode = result.data.TopicList._xNode,
		           				liHtml = '';
		           			for(var i in data){
		           				var sTitle = getArticleFieldValue(data[i].ArticleField, 'stitle'),
		           					stime = getArticleFieldValue(data[i].ArticleField, 'ActStartTime'),
		           					etime = getArticleFieldValue(data[i].ArticleField, 'ActEndTime'),
		           					address = getArticleFieldValue(data[i].ArticleField, 'xaddress');
		           				liHtml = liHtml + '<li><a href="javascript: HYWEBAPP.toPage(\'activityItem\', { xItem: \'' + data[i]._iCuItem + '\', CtNode: \'' + xNode + '\', xq_xCat: \'' + xq_xCat + '\' });"><h3 class="ui-li-heading">' + sTitle + '</h3><p class="ui-li-desc">' + address + '</p><p class="ui-li-desc">' + stime + ' ~ ' + etime + '</p></a></li>';
		           			}
		           			liHtml = HYWEBAPP.page('activityList').item('itemList').getContext().html() + liHtml;
		           			HYWEBAPP.page('activityList').item('itemList').getContext().html(liHtml);
		           			HYWEBAPP.page('activityList').item('itemList').refresh();
		           			HYWEBAPP.page('activityList').getContext().children('div[data-role=content]').eq(0).iscrollview('refresh');
		           		}
		           	});
            	}
            
        ;
					        			callback(e, d);
					        		
					    });
					
					
					HYWEBAPP.page("activityList").execHandler('pageinit');
				
					for(itemName in HYWEBAPP.page("activityList").items()){
						var item = HYWEBAPP.page("activityList").item(itemName);
						item.execHandler('pageinit');
					}
				}
			}
		});
        

       				HYWEBAPP.page("activityList").addDS(
       					HYWEBAPP.page("activityList").createDS("activityLP", "json", 
       						
       								{
       									url: "http://vod.taichung.gov.tw:8080/hyAPPServer/hyAppDS",
       									data: { _action : "XDBLP.xml" , CtNode : "6648" , CtUnit : "3191" , BaseDSD : "62" , xq_xCat : 
			function(callbacks){
				var result = HYWEBAPP.page('activityList').variable('xq_xCat');
				callbacks.success(result);
			}
		, nowPage : 
			function(callbacks){
				var result = HYWEBAPP.page('activityList').variable('nowPage');
				callbacks.success(result);
			}
		, pagesize : "10" 
        									  },
        								options: 
	{
		
		cache: false,
		offline: false,
		context: HYWEBAPP.page("activityList").ds("activityLP")
	}

       								}
       							
       					)
       				);
       			
    HYWEBAPP.page("activityList").addItem(
		HYWEBAPP.page("activityList").createItem("itemList", "list")
	);    

            		HYWEBAPP.page("activityList").addEventHandler("pagebeforeshow", function(){
		       			
            
            	var xq_xCat = HYWEBAPP.page('activityList').variable('xq_xCat');
            	HYWEBAPP.page('activityList').getContext().children("div[data-role='header']").first().children('h1').first().text(categoryName[xq_xCat]);
            
            	HYWEBAPP.page('activityList').ds('activityLP').getContent({
	           		success: function(result){
	           			var data = (result.data.TopicList.Article)?(result.data.TopicList.Article.length)?result.data.TopicList.Article:[result.data.TopicList.Article]:[],
	           				xNode = result.data.TopicList._xNode,
	           				liHtml = '';
	           			HYWEBAPP.page('activityList').variable('totalPage', result.totalPage);
	           			for(var i in data){
	           				var sTitle = getArticleFieldValue(data[i].ArticleField, 'stitle'),
	           					stime = getArticleFieldValue(data[i].ArticleField, 'ActStartTime'),
	           					etime = getArticleFieldValue(data[i].ArticleField, 'ActEndTime'),
	           					address = getArticleFieldValue(data[i].ArticleField, 'xaddress');
	           				liHtml = liHtml + '<li><a href="javascript: HYWEBAPP.toPage(\'activityItem\', { xItem: \'' + data[i]._iCuItem + '\', CtNode: \'' + xNode + '\', xq_xCat: \'' + xq_xCat + '\' });"><h3 class="ui-li-heading">' + sTitle + '</h3><p class="ui-li-desc">' + address + '</p><p class="ui-li-desc">' + stime + ' ~ ' + etime + '</p></a></li>';
	           			}
	           			HYWEBAPP.page('activityList').item('itemList').getContext().html(liHtml);
	           			HYWEBAPP.page('activityList').item('itemList').refresh();
	           			HYWEBAPP.page('activityList').getContext().children('div[data-role=content]').eq(0).iscrollview('refresh');
	           			HYWEBAPP.page('activityList').getContext().children('div[data-role=content]').eq(0).iscrollview('scrollTo', 0, 0, false);
	           		}
	           	});
            
        
		       		});
            	



HYWEBAPP.addPage(HYWEBAPP.createPage("activityItem"));

HYWEBAPP.addRoute({
	"#activityItem(?:[?](.*))?" : {
				events: "bs",
				handler: function (eventType, match, ui) {
					
					HYWEBAPP.prevPage = ui.prevPage;
					HYWEBAPP.nextPage = ui.nextPage;
					
					
						var params = HYWEBAPP.getRouteParams(match[1]);
						
							if(params !== null){
								console.log("CtNode: "+params.CtNode);
								//HYWEBAPP.page("activityItem").addVar("CtNode", params.CtNode);
								HYWEBAPP.page("activityItem").variable("CtNode", params.CtNode);
							}else{
								console.log("No Params");
								//HYWEBAPP.page("activityItem").addVar("CtNode", "");
								HYWEBAPP.page("activityItem").variable("CtNode", "");
							}
						
							if(params !== null){
								console.log("xItem: "+params.xItem);
								//HYWEBAPP.page("activityItem").addVar("xItem", params.xItem);
								HYWEBAPP.page("activityItem").variable("xItem", params.xItem);
							}else{
								console.log("No Params");
								//HYWEBAPP.page("activityItem").addVar("xItem", "");
								HYWEBAPP.page("activityItem").variable("xItem", "");
							}
						
							if(params !== null){
								console.log("xq_xCat: "+params.xq_xCat);
								//HYWEBAPP.page("activityItem").addVar("xq_xCat", params.xq_xCat);
								HYWEBAPP.page("activityItem").variable("xq_xCat", params.xq_xCat);
							}else{
								console.log("No Params");
								//HYWEBAPP.page("activityItem").addVar("xq_xCat", "");
								HYWEBAPP.page("activityItem").variable("xq_xCat", "");
							}
						
					
					HYWEBAPP.page("activityItem").execHandler('pagebeforeshow');
				
					for(itemName in HYWEBAPP.page("activityItem").items()){
						var item = HYWEBAPP.page("activityItem").item(itemName);
						console.log(itemName + " Start Init!!");
						item.execHandler('pagebeforeshow');
					}
				}
	}
});

HYWEBAPP.addRoute({
	"#activityItem(?:[?](.*))?" : {
				events: "s",
				handler: function (eventType, match, ui) {
					
					HYWEBAPP.prevPage = ui.prevPage;
					HYWEBAPP.nextPage = ui.nextPage;
					
					HYWEBAPP.page("activityItem").execHandler('pageshow');
				
					for(itemName in HYWEBAPP.page("activityItem").items()){
						var item = HYWEBAPP.page("activityItem").item(itemName);
						console.log(itemName + " Show!!");
						item.execHandler('pageshow');
					}
				}
	}
});

HYWEBAPP.addRoute({
	"#activityItem(?:[?](.*))?" : {
				events: "bh",
				handler: function (eventType, match, ui) {
					HYWEBAPP.nextPage = ui.nextPage;
					HYWEBAPP.page("activityItem").execHandler('pagebeforehide');
				}
	}
});


	
		HYWEBAPP.addRoute({
			"#activityItem(?:[?](.*))?" : {
				events: "i",
				handler: function (eventType, match, ui) {
				
					HYWEBAPP.prevPage = ui.prevPage;
					HYWEBAPP.nextPage = ui.nextPage;
				
					
					
					HYWEBAPP.page("activityItem").execHandler('pageinit');
				
					for(itemName in HYWEBAPP.page("activityItem").items()){
						var item = HYWEBAPP.page("activityItem").item(itemName);
						item.execHandler('pageinit');
					}
				}
			}
		});
        

       				HYWEBAPP.page("activityItem").addDS(
       					HYWEBAPP.page("activityItem").createDS("activityCP", "json", 
       						
       								{
       									url: "http://vod.taichung.gov.tw:8080/hyAPPServer/hyAppDS",
       									data: { _action : "XDCP.xml" , CtNode : 
			function(callbacks){
				var result = HYWEBAPP.page('activityItem').variable('CtNode');
				callbacks.success(result);
			}
		, xItem : 
			function(callbacks){
				var result = HYWEBAPP.page('activityItem').variable('xItem');
				callbacks.success(result);
			}
		
        									  },
        								options: 
	{
		
		cache: false,
		offline: false,
		context: HYWEBAPP.page("activityItem").ds("activityCP")
	}

       								}
       							
       					)
       				);
       			
    HYWEBAPP.page("activityItem").addItem(
		HYWEBAPP.page("activityItem").createItem("addressMap", "map")
	);    

	HYWEBAPP.page("activityItem").item("addressMap").setHandler('pageshow', function (eventType, match, ui) {
		
						HYWEBAPP.page("activityItem").item("addressMap").getContext().css('width', '100%').css('height', '300pX').css('min-height', '100%');
					
	});				

            		HYWEBAPP.page("activityItem").addEventHandler("pagebeforeshow", function(){
		       			
            
            	if(HYWEBAPP.prevPage.attr('id') === 'activityList' || HYWEBAPP.prevPage.attr('id') === 'myFavorite' || HYWEBAPP.prevPage.attr('id') === 'searchResult' || HYWEBAPP.prevPage.attr('id') === 'activityMap'){
            		var xq_xCat = HYWEBAPP.page('activityItem').variable('xq_xCat');
            		HYWEBAPP.page('activityItem').getContext().children("div[data-role='header']").first().children('h1').first().text(categoryName[xq_xCat]);
            		
            		HYWEBAPP.page('activityItem').ds('activityCP').getContent({
	            		success: function(result){
	            			var data = result.data.CP.MainArticle,
	            				stitle = getArticleFieldValue(data.MainArticleField, 'stitle'),
	            				address = getArticleFieldValue(data.MainArticleField, 'xaddress'),
	            				stime = getArticleFieldValue(data.MainArticleField, 'ActStartTime'),
	            				etime = getArticleFieldValue(data.MainArticleField, 'ActEndTime'),
	            				actor = '活動展演者：' +  getArticleFieldValue(data.MainArticleField, 'ActPlayer'),
	            				detailTime = (getArticleFieldValue(data.MainArticleField, 'ActDetailTime') !== null )?getArticleFieldValue(data.MainArticleField, 'ActDetailTime'):'無',
	            				place = '活動場地：' +  getArticleFieldValue(data.MainArticleField, 'ActPlace'),
	            				ticket = '票價：' +  getArticleFieldValue(data.MainArticleField, 'ActTicket'),
	            				xUrl = (getArticleFieldValue(data.MainArticleField, 'xurl') !== null)?'<a href="#" onclick="javascript: openWebPage(\'' + getArticleFieldValue(data.MainArticleField, 'xurl') + '\');">' + getArticleFieldValue(data.MainArticleField, 'xurl') + '</a>':'無',
	            				description = getArticleFieldValue(data.MainArticleField, 'xbody'),
	            				liHtml = '';
	            			
	            			$('#activityTitle').text(stitle);
	            			$('#activityAddress').text(address);
	            			$('#activityTime').text(stime + ' ~ ' + etime);
	            			$('#activityActor').text(actor);
	            			$('#activityDetailTime').text('詳細日期時間：' + detailTime);
	            			$('#activityPlace').html(place);
	            			$('#activityTicket').text(ticket);
	            			$('#activityURL').html('活動網址：' + xUrl);
	            			$('#activityDescription').html(description);
	            			HYWEBAPP.page('activityItem').item('addressMap').clear('markers');
	            			HYWEBAPP.page('activityItem').item('addressMap').search(address, function(results){
	            				var destination = results[0].geometry.location.Ya + ',' + results[0].geometry.location.Za;
	            				HYWEBAPP.page('activityItem').item('addressMap').getContext().gmap('addMarker', {'position': results[0].geometry.location, 'bounds': true}).click(function(){
	            					HYWEBAPP.page('activityItem').item('addressMap').getContext().gmap('openInfoWindow', {'content': '<div class="map-info-window"><ul class="map-info-list"><li>' + stitle + '</li><li>' + address + '</li></ul><span class="map-info-link"><a href="#" onclick="javascript: HYWEBAPP.page(\'activityItem\').item(\'addressMap\').closeInfoWindow();">關閉</a></span><span class="map-info-link"><a href="#" onclick="javascript: showDirection(HYWEBAPP.page(\'activityItem\').item(\'addressMap\'), \'' + this.getPosition() + '\');">規劃路徑</a></span></div>' }, this);
	            				});
			            		HYWEBAPP.page('activityItem').item('addressMap').option('zoom', 15);
			            		HYWEBAPP.page('activityItem').item('addressMap').option('center', results[0].geometry.location);
	            			});
	            			
	            			$('#saveActivityBtn').unbind('click').bind('click', function(){
	            				saveToMyFavorite(stitle, location.href, { 'time': stime + ' ~ ' + etime, 'address': address });
            				});
	            			
	            			$('.init-activity-tab').trigger('click');
	            		}
	            	});
            	}
            
        
		       		});
            	

(function(obj){
	
	this.parseLegendPosition = function(legend, pos) {
		if(pos === 'e'){
			legend.align = 'right';
			legend.verticalAlign = 'middle';
		}else if(pos === 'w'){
			legend.align = 'left';
			legend.verticalAlign = 'middle';
		}else if(pos === 's'){
			legend.align = 'center';
			legend.verticalAlign = 'bottom';
		}else if(pos === 'n'){
			legend.align = 'center';
			legend.verticalAlign = 'top';
		}else if(pos === 'ne'){
			legend.align = 'right';
			legend.verticalAlign = 'top';
		}else if(pos === 'nw'){
			legend.align = 'left';
			legend.verticalAlign = 'top';
		}else if(pos === 'se'){
			legend.align = 'right';
			legend.verticalAlign = 'bottom';
		}else if(pos === 'sw'){
			legend.align = 'left';
			legend.verticalAlign = 'bottom';
		}
	};
	
	this.settingEvents = function(eventsConfig, eventsObj){
		for(var i in eventsObj){
			eventsConfig[i] = eventsObj[i];
		}
	};
	
	this.settingAxis = function(axis, options) {
		if(typeof options.type !== 'undefined'){
			if(options.type === 'linear'){
				axis.type = "linear";
			}else if(options.type === 'log'){
				axis.type = "logarithmic";
			}else if(options.type === 'date'){
				axis.type = "datetime";
			}else if(options.type === 'category'){
				axis.type = "datetime";
			}
			if(typeof options.label !== 'undefined'){
				axis.title.text = options.label;
			}
			if(typeof options.titleAlign !== 'undefined'){
				axis.title.align = options.titleAlign;
			}
			if(typeof options.titleRotation !== 'undefined'){
				axis.title.rotation = parseInt(options.titleRotation, 10);
			}
			if(typeof options.titleMargin !== 'undefined'){
				axis.title.margin = parseInt(options.titleMargin, 10);
			}
			if(typeof options.titleOffset !== 'undefined'){
				axis.title.offset = parseInt(options.titleOffset, 10);
			}
			if(typeof options.titleY !== 'undefined'){
				axis.title.y = parseInt(options.titleY, 10);
			}
			if(typeof options.titleX !== 'undefined'){
				axis.title.x = parseInt(options.titleX, 10);
			}
			if(typeof options.tickAngle !== 'undefined'){
				axis.labels.rotation = parseInt(options.tickAngle, 10);
			}
			if(typeof options.formatter !== 'undefined'){
				axis.labels.formatter = options.formatter;
			}
			if(typeof options.overflow !== 'undefined'){
				axis.labels.overflow = options.overflow;
			}
			if(typeof options.xOffSet !== 'undefined'){
				axis.labels.x = parseInt(options.xOffSet, 10);
			}
			if(typeof options.yOffSet !== 'undefined'){
				axis.labels.y = parseInt(options.yOffSet, 10);
			}
			if(typeof options.tickInterval !== 'undefined'){
				axis.tickInterval = options.tickInterval;
			}
			if(typeof options.minRange !== 'undefined'){
				axis.minRange = options.minRange;
			}
			if(typeof options.minTickInterval !== 'undefined'){
				axis.minTickInterval = options.minTickInterval;
			}
			if(typeof options.categories !== 'undefined'){
				axis.categories = options.categories;
			}
		}
	};
	
	var hychart = function(item, options){
				
		var _CHART,
			initChart = function(item, options){
				var i, j, 
					seriesSize = options.dataSeries.length, 
					configs = { 
						chart: { renderTo: item.getRealID(), events: {}, reflow: false }, 
						title: { text: "" },
						subtitle: { },
						exporting: { enabled: false }, 
						credits: { 
							enabled: false
						}, 
						colors: ["blue","black","red"],
						tooltip: { crosshairs: true, shared: true } 
					};
				
				for(i=0;i<seriesSize;i++){
					if(typeof options.dataSeries[i].ds !== 'undefined'){
						HYWEBAPP.page(options.dataSeries[i].ds.page).ds(options.dataSeries[i].ds.id).getContent({
							success: function(data){
								var tmpPointArray = [],
									dataSize = data.length;
								for(j=0;j<dataSize;j++){
									var tmpPoint = [];
									tmpPoint.push(data[j][options.dataSeries[i].ds.x]);
									tmpPoint.push(data[j][options.dataSeries[i].ds.y]);
									tmpPointArray.push(tmpPoint);
								}
								delete options.dataSeries[i].ds;
								options.dataSeries[i].points = tmpPointArray;
								initChart(item, options);
								return;
							} 
						});
					}
				}
				
				if(typeof options.events !== 'undefined'){
					configs.chart.events = options.events;
				}
				
				if(typeof options.credits !== 'undefined'){
					configs.credits = options.credits;
				}
				
				if(typeof options.tooltip !== 'undefined'){
					configs.tooltip = options.tooltip;
				}
				
				if(typeof options.title !== 'undefined'){
					console.log('title: '+ options.title);
					configs.title.text = options.title;
				}
				
				if(typeof options.titleUseHTML !== 'undefined'){
					configs.title.useHTML = options.titleUseHTML;
				}
				
				if(typeof options.titleAlign !== 'undefined'){
					configs.title.align = options.titleAlign;
				}
				
				if(typeof options.subtitle !== 'undefined'){
					console.log('subtitle: '+ options.subtitle);
					configs.subtitle.text = options.subtitle;
				}
				
				if(typeof options.subtitleUseHTML !== 'undefined'){
					configs.subtitle.useHTML = options.subtitleUseHTML;
				}
				
				if(typeof options.subtitleAlign !== 'undefined'){
					configs.subtitle.align = options.subtitleAlign;
				}
				
				if(typeof options.legend !== 'undefined'){
					configs.legend = {};
					if(typeof options.legend.show !== 'undefined'){
						configs.legend.enabled = options.legend.show;
					}
					if(typeof options.legend.position !== 'undefined'){
						this.parseLegendPosition(configs.legend, options.legend.position);
					}
				}
				
				configs.events = {};
				if(typeof options.events !== 'undefined'){
					this.settingEvents(configs.events, options.events);
				}
				
				//configs.xAxis = [{ title: {}, labels: { overflow: 'justify' }, showLastLabel: true }];
				configs.xAxis = [{ title: {}, labels: { }, showLastLabel: true }];
				
				if(typeof options.xaxis !== 'undefined'){
					this.settingAxis(configs.xAxis[0], options.xaxis);
				}
				
				if(typeof options.x2axis !== 'undefined'){
					configs.xAxis.push({ opposite: true, title: {}, labels: {} });	
					this.settingAxis(configs.xAxis[1], options.x2axis);
				}
				
				configs.yAxis = [{ title: {}, labels: {}, lineWidth: 1 }];
				
				if(typeof options.yaxis !== 'undefined'){
					this.settingAxis(configs.yAxis[0], options.yaxis);
				}
				
				if(typeof options.y2axis !== 'undefined'){
					configs.yAxis.push({ opposite: true, title: {}, labels: {} });	
					this.settingAxis(configs.yAxis[1], options.y2axis);
				}
				
				configs.series = [];
				for(i=0;i<seriesSize;i++){
					var seriesConfig = {};
						
					if(typeof options.dataSeries[i].type !== 'undefined'){
						if(options.dataSeries[i].type === 'line'){
							seriesConfig.type = 'line'
						}else if(options.dataSeries[i].type === 'bar'){
							seriesConfig.type = 'bar'
						}else if(options.dataSeries[i].type === 'pie'){
							seriesConfig.type = 'pie'
						}
					}
					
					if(typeof options.dataSeries[i].xaxis !== 'undefined'){
						if(options.dataSeries[i].xaxis === 'x'){
							seriesConfig.xAxis = 0;
						}else if(options.dataSeries[i].xaxis === 'x2'){
							seriesConfig.xAxis = 1;
						}
					}else{
						seriesConfig.xAxis = 0;
					}
					
					if(typeof options.dataSeries[i].yaxis !== 'undefined'){
						if(options.dataSeries[i].yaxis === 'y'){
							seriesConfig.yAxis = 0;
						}else if(options.dataSeries[i].yaxis === 'y2'){
							seriesConfig.yAxis = 1;
						}
					}else{
						seriesConfig.yAxis = 0;
					}
					
					if(typeof options.dataSeries[i].label !== 'undefined'){
						seriesConfig.name = options.dataSeries[i].label;
					}
					
					if(typeof options.dataSeries[i].points !== 'undefined'){
						var seriesArray = [],
							pointsSize = options.dataSeries[i].points.length;
						for(j=0;j<pointsSize;j++){
							var pointArray = [];
							if(seriesConfig.xAxis === 0){
								if(configs.xAxis[0].type === 'datetime'){
									var d = new Date(options.dataSeries[i].points[j][0]);
									pointArray.push(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
								}else{
									pointArray.push(parseFloat(options.dataSeries[i].points[j][0]));
								}
							}else{
								if(configs.xAxis[1].type === 'datetime'){
									var d = new Date(options.dataSeries[i].points[j][0]);
									pointArray.push(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
								}else{
									pointArray.push(parseFloat(options.dataSeries[i].points[j][0]));
								}
							}
							if(typeof options.dataSeries[i].points[j][1] === 'string'){
								pointArray.push(parseFloat(options.dataSeries[i].points[j][1]));
							}else{
								pointArray.push(options.dataSeries[i].points[j][1]);
							}
							seriesArray.push(pointArray);
						}
						seriesConfig.data = seriesArray;
					} 	
					
					configs.series.push(seriesConfig);
				}
				
				console.log(JSON.stringify(configs));
				Highcharts.setOptions({
			        lang: {
			            numericSymbols: false
			        }
			    });
			    if(typeof options.global !== 'undefined'){
			    	Highcharts.setOptions({
				        global: options.global
				    });
			    }
				return new Highcharts.Chart(configs);
			};
		
		_CHART = initChart(item, options);
		
		item.registerProperty({
			name: 'width',
			getter: function(){
				item.getContext().css('width');
			},
			setter: function(obj){
				item.getContext().css('width', obj);
			}
		});
		
		item.registerProperty({
			name: 'height',
			getter: function(){
				item.getContext().css('height');
			},
			setter: function(obj){
				item.getContext().css('height', obj);
			}
		});
		
		return HYWEBAPP.extend({
			 getChartInstance: function(){
			 	return _CHART;
			 },
			 
			 get: function(id){
			 	return _CHART.get(id);
			 },
			 
			 getOptions: function(){
			 	return _CHART.options;
			 },
			 
			 getSelectedPoints: function(){
			 	return _CHART.getSelectedPoints();
			 },
			 
			 getSelectedSeries: function(){
			 	return _CHART.getSelectedSeries();
			 },
			 
			 addSeries: function(option, redraw, animation){
			 	_CHART.addSeries(option, redraw, animation);
			 },
			 
			 setSize: function(width, height){
			 	_CHART.setSize(width, height);
			 },
			 
			 redraw: function(){
			 	_CHART.redraw();
			 },
			 
			 destroy: function(){
			 	_CHART.destroy();
			 }
		},item);
	};
	
	obj._RENDERS['highchart'] =  hychart;
	
}(HYWEBAPP.ui));

(function(obj){
	
	var hychart = function(item, options){
				
		var _CHART,
			initChart = function(item, options){
				var i, j, 
					seriesSize = options.dataSeries.length, 
					xaxisType = 'linear', 
					x2axisType = 'linear', 
					yaxisType = 'linear', 
					y2axisType = 'linear',
					configs = {},
					series = [], 
					handlers = {
						dataClick: function(callback){
							item.getContext().bind('jqplotDataClick',
				            	function (ev, seriesIndex, pointIndex, data) {                
				                	callback(ev, seriesIndex, pointIndex, options.dataSeries[seriesIndex].points[pointIndex])
				            	}
				        	);
						}
					};
				
				for(i=0;i<seriesSize;i++){
					if(typeof options.dataSeries[i].ds !== 'undefined'){
						HYWEBAPP.page(options.dataSeries[i].ds.page).ds(options.dataSeries[i].ds.id).getContent({
							success: function(data){
								var tmpPointArray = [],
									dataSize = data.length;
								for(j=0;j<dataSize;j++){
									var tmpPoint = [];
									tmpPoint.push(data[j][options.dataSeries[i].ds.x]);
									tmpPoint.push(data[j][options.dataSeries[i].ds.y]);
									tmpPointArray.push(tmpPoint);
								}
								delete options.dataSeries[i].ds;
								options.dataSeries[i].points = tmpPointArray;
								initChart(item, options);
								return;
							} 
						});
					}
				}
				
				configs.axesDefaults = { tickRenderer: $.jqplot.CanvasAxisTickRenderer };
				configs.seriesColors = ["blue","black","red"];
				
				if(typeof options.title !== 'undefined'){
					configs.title = options.title;
				}
				
				if(typeof options.legend !== 'undefined'){
					configs.legend = {};
					if(typeof options.legend.show !== 'undefined'){
						configs.legend.show = options.legend.show;
					}
					if(typeof options.legend.position !== 'undefined'){
						configs.legend.location = options.legend.position;
					}
					if(typeof options.legend.placement !== 'undefined'){
						configs.legend.placement = options.legend.placement;
					}
				}
				
				if(typeof options.xaxis !== 'undefined'){
					if(typeof configs.axes === 'undefined'){ configs.axes = {}; }
					configs.axes.xaxis = {};
					if(typeof options.xaxis.type !== 'undefined'){
						xaxisType = options.xaxis.type;
						if(options.xaxis.type === 'linear'){
							configs.axes.xaxis.renderer = $.jqplot.LinearAxisRenderer;
						}else if(options.xaxis.type === 'log'){
							configs.axes.xaxis.renderer = $.jqplot.LogAxisRenderer;
							if(typeof options.xaxis.logBase !== 'undefined'){
								configs.axes.xaxis.base = options.xaxis.logBase;
							}
						}else if(options.xaxis.type === 'date'){
							configs.axes.xaxis.renderer = $.jqplot.DateAxisRenderer;
						}else if(options.xaxis.type === 'category'){
							configs.axes.xaxis.renderer = $.jqplot.CategoryAxisRenderer;
						}
						if(typeof options.xaxis.label !== 'undefined'){
							configs.axes.xaxis.label = options.xaxis.label;
							configs.axes.xaxis.labelRenderer = $.jqplot.CanvasAxisLabelRenderer;
						}
						if(typeof options.xaxis.tickAngle !== 'undefined'){
							configs.axes.xaxis.tickRenderer = $.jqplot.CanvasAxisTickRenderer;
							configs.axes.xaxis.tickOptions = {};
							configs.axes.xaxis.tickOptions.angle = options.xaxis.tickAngle;
						}
					}
				}
				
				if(typeof options.x2axis !== 'undefined'){
					if(typeof configs.axes === 'undefined'){ configs.axes = {}; }
					configs.axes.x2axis = {};
					if(typeof options.x2axis.type !== 'undefined'){
						x2axisType = options.x2axis.type;
						if(options.x2axis.type === 'linear'){
							configs.axes.x2axis.renderer = $.jqplot.LinearAxisRenderer;
						}else if(options.x2axis.type === 'log'){
							configs.axes.x2axis.renderer = $.jqplot.LogAxisRenderer;
							if(typeof options.x2axis.logBase !== 'undefined'){
								configs.axes.x2axis.base = options.x2axis.logBase;
							}
						}else if(options.x2axis.type === 'date'){
							configs.axes.x2axis.renderer = $.jqplot.DateAxisRenderer;
						}else if(options.x2axis.type === 'category'){
							configs.axes.x2axis.renderer = $.jqplot.CategoryAxisRenderer;
						}
						if(typeof options.x2axis.label !== 'undefined'){
							configs.axes.x2axis.label = options.x2axis.label;
							configs.axes.x2axis.labelRenderer = $.jqplot.CanvasAxisLabelRenderer;
						}
						if(typeof options.x2axis.tickAngle !== 'undefined'){
							configs.axes.x2axis.tickRenderer = $.jqplot.CanvasAxisTickRenderer;
							configs.axes.x2axis.tickOptions = {};
							configs.axes.x2axis.tickOptions.angle = options.x2axis.tickAngle;
						}
					}
				}
				
				if(typeof options.yaxis !== 'undefined'){
					if(typeof configs.axes === 'undefined'){ configs.axes = {}; }
					configs.axes.yaxis = {};
					if(typeof options.yaxis.type !== 'undefined'){
						yaxisType = options.yaxis.type;
						if(options.yaxis.type === 'linear'){
							configs.axes.yaxis.renderer = $.jqplot.LinearAxisRenderer;
						}else if(options.yaxis.type === 'log'){
							configs.axes.yaxis.renderer = $.jqplot.LogAxisRenderer;
							if(typeof options.yaxis.logBase !== 'undefined'){
								configs.axes.yaxis.base = options.yaxis.logBase;
							}
						}else if(options.yaxis.type === 'date'){
							configs.axes.yaxis.renderer = $.jqplot.DateAxisRenderer;
						}else if(options.yaxis.type === 'category'){
							configs.axes.yaxis.renderer = $.jqplot.CategoryAxisRenderer;
						}
						if(typeof options.yaxis.label !== 'undefined'){
							configs.axes.yaxis.label = options.yaxis.label;
							configs.axes.yaxis.labelRenderer = $.jqplot.CanvasAxisLabelRenderer;
						}
						if(typeof options.yaxis.tickAngle !== 'undefined'){
							configs.axes.yaxis.tickRenderer = $.jqplot.CanvasAxisTickRenderer;
							configs.axes.yaxis.tickOptions = {};
							configs.axes.yaxis.tickOptions.angle = options.yaxis.tickAngle;
						}
					}
				}
				if(typeof options.y2axis !== 'undefined'){
					if(typeof configs.axes === 'undefined'){ configs.axes = {}; }
					configs.axes.y2axis = {};
					if(typeof options.y2axis.type !== 'undefined'){
						y2axisType = options.y2axis.type;
						if(options.y2axis.type === 'linear'){
							configs.axes.y2axis.renderer = $.jqplot.LinearAxisRenderer;
						}else if(options.y2axis.type === 'log'){
							configs.axes.y2axis.renderer = $.jqplot.LogAxisRenderer;
							if(typeof options.y2axis.logBase !== 'undefined'){
								configs.axes.y2axis.base = options.y2axis.logBase;
							}
						}else if(options.y2axis.type === 'date'){
							configs.axes.y2axis.renderer = $.jqplot.DateAxisRenderer;
						}else if(options.y2axis.type === 'category'){
							configs.axes.y2axis.renderer = $.jqplot.CategoryAxisRenderer;
						}
						if(typeof options.y2axis.label !== 'undefined'){
							configs.axes.y2axis.label = options.y2axis.label;
							configs.axes.y2axis.labelRenderer = $.jqplot.CanvasAxisLabelRenderer;
						}
						if(typeof options.y2axis.tickAngle !== 'undefined'){
							configs.axes.y2axis.tickRenderer = $.jqplot.CanvasAxisTickRenderer;
							configs.axes.y2axis.tickOptions = {};
							configs.axes.y2axis.tickOptions.angle = options.y2axis.tickAngle;
						}
					}
				}
				
				if(typeof options.grid !== 'undefined'){
					configs.grid = {};
					configs.grid.renderer = $.jqplot.CanvasGridRenderer;
					if(typeof options.grid.drawLine !== 'undefined'){
						configs.grid.drawGridLines = options.grid.drawLine; 
					}
				}
				
				if(typeof options.eventHandlers !== 'undefined'){
					for(i in options.eventHandlers){
						if(typeof handlers[i] !== 'undefined'){
							handlers[i](options.eventHandlers[i]);
						}
					}
				}
				
				configs.series = [];
				for(i=0;i<seriesSize;i++){
					var xaxis = 'x',
						yaxis = 'y',
						seriesConfig = {};
						
					if(typeof options.dataSeries[i].type !== 'undefined'){
						if(options.dataSeries[i].type === 'line'){
							seriesConfig.renderer = $.jqplot.LineRenderer;
							seriesConfig.rendererOptions = {};
							if(typeof options.dataSeries[i].width !== 'undefined'){
								seriesConfig.rendererOptions.lineWidth = options.dataSeries[i].width; 
							}
						}else if(options.dataSeries[i].type === 'bar'){
							seriesConfig.renderer = $.jqplot.BarRenderer;
							seriesConfig.rendererOptions = {};
							if(typeof options.dataSeries[i].direction !== 'undefined'){
								seriesConfig.rendererOptions.barDirection = options.dataSeries[i].direction; 
							}
						}else if(options.dataSeries[i].type === 'pie'){
							seriesConfig.renderer = $.jqplot.PieRenderer;
							seriesConfig.rendererOptions = { showDataLabels: true };
							delete configs.axes;
							delete configs.grid;
						}
					}
					
					if(typeof options.dataSeries[i].fill !== 'undefined'){
						seriesConfig.fill = options.dataSeries[i].fill;
					}
					
					if(typeof options.dataSeries[i].marker !== 'undefined'){
						seriesConfig.markerRenderer = $.jqplot.MarkerRenderer;
						seriesConfig.markerOptions = {};
						if(typeof options.dataSeries[i].marker.show !== 'undefined'){
							seriesConfig.markerOptions.show = options.dataSeries[i].marker.show; 
						}
						if(typeof options.dataSeries[i].marker.type !== 'undefined'){
							seriesConfig.markerOptions.style = options.dataSeries[i].marker.type; 
						}
						if(typeof options.dataSeries[i].marker.size !== 'undefined'){
							seriesConfig.markerOptions.size = options.dataSeries[i].marker.size; 
						}
					}
					
					if(typeof options.dataSeries[i].pointLabel !== 'undefined'){
						seriesConfig.pointLabels = {};
						if(typeof options.dataSeries[i].pointLabel.show !== 'undefined'){
							seriesConfig.pointLabels.show = options.dataSeries[i].pointLabel.show; 
						}
						if(typeof options.dataSeries[i].pointLabel.position !== 'undefined'){
							seriesConfig.pointLabels.location = options.dataSeries[i].pointLabel.position; 
						}
					}
					
					if(typeof options.dataSeries[i].xaxis !== 'undefined'){
						xaxis = options.dataSeries[i].xaxis;
						if(options.dataSeries[i].xaxis === 'x'){
							seriesConfig.xaxis = 'xaxis';
						}else if(options.dataSeries[i].xaxis === 'x2'){
							seriesConfig.xaxis = 'x2axis';
						}
					}
					
					if(typeof options.dataSeries[i].yaxis !== 'undefined'){
						yaxis = options.dataSeries[i].yaxis;
						if(options.dataSeries[i].yaxis === 'y'){
							seriesConfig.yaxis = 'yaxis';
						}else if(options.dataSeries[i].yaxis === 'y2'){
							seriesConfig.yaxis = 'y2axis';
						}
					}
					
					if(typeof options.dataSeries[i].label !== 'undefined'){
						seriesConfig.label = options.dataSeries[i].label;
					}
					
					if(typeof options.dataSeries[i].points !== 'undefined'){
						var seriesArray = [],
							pointsSize = options.dataSeries[i].points.length;
						for(j=0;j<pointsSize;j++){
							var pointArray = [];
							if(xaxis === 'x'){
								if(xaxisType === 'date' || xaxisType === 'category' || options.dataSeries[i].type === 'pie'){
									pointArray.push(options.dataSeries[i].points[j][0]);
								}else{
									pointArray.push(parseFloat(options.dataSeries[i].points[j][0]));
								}
							}else{
								if(x2axisType === 'date' || x2axisType === 'category' || options.dataSeries[i].type === 'pie'){
									pointArray.push(options.dataSeries[i].points[j][0]);
								}else{
									pointArray.push(parseFloat(options.dataSeries[i].points[j][0]));
								}
							}
							if(typeof options.dataSeries[i].points[j][1] === 'string'){
								pointArray.push(parseFloat(options.dataSeries[i].points[j][1]));
							}else{
								pointArray.push(options.dataSeries[i].points[j][1]);
							}
							seriesArray.push(pointArray);
						}
						series.push(seriesArray);
					} 	
					
					configs.series.push(seriesConfig);
				}
				
				console.log(JSON.stringify(configs));
				var test = '[';
				for(i=0;i<series.length;i++){
					test = test + '[';
					for(j=0;j<series[i].length;j++){
						var k;
						test = test + '[';
						for(k=0;k<series[i][j].length;k++){
							test = test + series[i][j][k];
							if(k!=series[i][j].length-1){ test = test + ','; }
						}
						test = test + ']';
						if(j!=series[i].length-1){ test = test + ','; }
					}
					test = test + ']';
				}
				test = test + ']'
				console.log(test);
				return $.jqplot(item.getRealID(), series, configs);
			};
		
		_CHART = initChart(item, options);
		
		item.registerProperty({
			name: 'width',
			getter: function(){
				item.getContext().css('width');
			},
			setter: function(obj){
				item.getContext().css('width', obj);
			}
		});
		
		item.registerProperty({
			name: 'height',
			getter: function(){
				item.getContext().css('height');
			},
			setter: function(obj){
				item.getContext().css('height', obj);
			}
		});
		
		return HYWEBAPP.extend({
			 getChartInstance: function(){
			 	return _CHART;
			 },
			 
			 draw: function(){
			 	_CHART.draw();
			 },
			 
			 redraw: function(){
			 	_CHART.replot();
			 },
			 
			 destroy: function(){
			 	_CHART.destroy();
			 }
		},item);
	};
	
	obj._RENDERS['jqplot'] = hychart;
	
}(HYWEBAPP.ui));

/**
hyApp模組

@module APPGEN
**/

﻿var HYWEBAPP =
/**
hyApp 主類別

@class HYWEBAPP
@static
**/ 
(function(){
	var _PAGES = {},
		_ROUTER = new $.mobile.Router([], {}, { ajaxApp: true }),
		_NEXTPAGE, 
		_PREPAGE,
		_WATCH_ID = '',
		_LOCALSTORAGE = window.localStorage,
		_ORIENTATIONCHANGE = function(){
			console.log('orientation change at page: ' + $.mobile.activePage[0].id);
			var itemName, 
				pageid = $.mobile.activePage[0].id; 
			for(itemName in HYWEBAPP.page(pageid).items()){
				var item = HYWEBAPP.page(pageid).item(itemName);
				item.execHandler('orientationchange');
			}
		},
		_RESIZE = function(){
			console.log('resize at page: ' + $.mobile.activePage[0].id);
			var itemName, 
				pageid = $.mobile.activePage[0].id; 
			for(itemName in HYWEBAPP.page(pageid).items()){
				var item = HYWEBAPP.page(pageid).item(itemName);
				item.execHandler('resize');
			}
		};
	var _UTILS = {
		/**
		將XML格式的資料轉換成JSON格式。
		
		@method xmlToJson
		@param {XML} xml XML物件
		@return {JSON} JSON物件
		@example
			var jsonData = HYWEBAPP.xmlToJson(xmlData);
			var id = jsonData.user[0].id;
		**/
		xmlToJson : function(xml){ 
			return $.xmlToJSON(xml); 
		},
		
		/**
		由目前頁面前往至指定的頁面。
		
		@method toPage
		@param {String} url PAGE物件的ID，或是要前往的Url
		@param {Object} [params] 要帶入所前往頁面中的參數
		@example
			HYWEBAPP.toPage('detailPage');
		@example
			HYWEBAPP.toPage('infoPage',{id: 'admin', name: 'John'});
		@example
			HYWEBAPP.toPage('http://tw.yahoo.com');
		**/
		toPage : function(url, params, role){
			var obj;
			if(typeof url === "function"){
				url({
					success: function(result){
						console.log(result);
						HYWEBAPP.toPage(result, params);
					}
				});
				return;
			}
			if(typeof HYWEBAPP.page(url) === "undefined"){
				window.open(url);
				return;
			}
			for(obj in params){
				if (typeof params[obj] === 'function') {
					params[obj]({
						success: function(result){
									console.log(result);
									params[obj] = result;
									HYWEBAPP.toPage(url, params);
								}
					});
					return;
				}
			}
			url = "#" + url + "?";
			console.log("Params: " + JSON.stringify(params));
			for(obj in params){
				url = url + obj + "=" + encodeURIComponent(params[obj]) + "&";
			}
			if(role === 'dialog'){
				$.mobile.changePage(url, { role: 'dialog' });
			}else{
				$.mobile.changePage(url);
			}
		},
		
		/**
		取得目前裝置的連線狀態。
		
		@method checkConnection
		@return {String} 目前連線狀態
		@example
			var connStatus = HYWEBAPP.checkConnection();
		**/
		checkConnection: function(){
			//for debug, comment this line when pucblish
			if(typeof navigator.network === "undefined"){ return 'Cell 3G connection'; }
			var networkState = navigator.network.connection.type;
    		var states = {};
    		states[Connection.UNKNOWN]  = 'Unknown connection';
    		states[Connection.ETHERNET] = 'Ethernet connection';
    		states[Connection.WIFI]     = 'WiFi connection';
    		states[Connection.CELL_2G]  = 'Cell 2G connection';
    		states[Connection.CELL_3G]  = 'Cell 3G connection';
    		states[Connection.CELL_4G]  = 'Cell 4G connection';
    		states[Connection.NONE]     = 'No network connection';
    		return states[networkState];
		},
		
		checkPlatform: function(){
			devicePlatform = device.platform;
		    if(devicePlatform.substring(0, 6) == "iPhone") {
		        return 'ios';
		    }
		    return 'others';
		},
		
		/**
		依照key值由localStorage中取出對應的值。
		
		@method getLocalStorage
		@param {String} key Key值
		@return {String} localStorage中對應的值
		@example
			var result = HYWEBAPP.getLocalStorage('myResult');
		**/
		getLocalStorage: function(key){
			return _LOCALSTORAGE.getItem(key);
		},
		
		/**
		將物件存入localStorage中。
		
		@method setLocalStorage
		@param {String} key Key值
		@param {String} value 要存入的值
		@example
			HYWEBAPP.setLocalStorage('myResult', 'Test');
		**/
		setLocalStorage: function(key, value){
			return _LOCALSTORAGE.setItem(key, value);
		},
		
		/**
		依照key值將localStorage中對應的值刪除。
		
		@method removeLocalStorage
		@param {String} key Key值
		@example
			HYWEBAPP.removeLocalStorage('myResult');
		**/
		removeLocalStorage: function(key){
			return _LOCALSTORAGE.removeItem(key);
		},
		
		/**
		將localStorage中所有值刪除。
		
		@method clearLocalStorage
		@example
			HYWEBAPP.clearLocalStorage();
		**/
		clearLocalStorage: function(key){
			return _LOCALSTORAGE.clear();
		},
		
		/**
		取得目前GPS位置。
		
		@method getPosition
		@param {Object} callbacks 取得GPS位置後要執行的callback函式
		@example
			HYWEBAPP.getPosition({
				success: function(position){
					alert('Location: ' + position.coords.latitude + ',' + position.coords.longitude);
				}
			});
		**/
		getPosition: function(callbacks){
			navigator.geolocation.getCurrentPosition(callbacks.success, callbacks.error);
		},
		
		/**
		持續監看GPS位置。
		
		@method watchPosition
		@param {Object} callbacks 取得GPS位置後要執行的callback函式
		@param {Object} options 設定參數
		@return {String} Watch ID作為取消監看用
		@example
			var watchID = HYWEBAPP.watchPosition({
				success: function(position){
					alert('Location: ' + position.coords.latitude + ',' + position.coords.longitude);
				}
			}, { timeout: 30000 });
		**/
		watchPosition: function(callbacks, options){
			if(_WATCH_ID !== ''){ 
				navigator.geolocation.clearWatch(_WATCH_ID);
				_WATCH_ID = '';
			}
			_WATCH_ID = navigator.geolocation.watchPosition(callbacks.success, callbacks.error, options);
		},
		
		/**
		取消目前監看GPS函式。
		
		@method stopWatchPosition
		@example
			HYWEBAPP.stopWatchPosition();
		**/
		stopWatchPosition: function(){
			if(_WATCH_ID === ''){ return; }
			navigator.geolocation.clearWatch(_WATCH_ID);
			_WATCH_ID = '';
		},
		
		/**
		對指定的Url進行Ajax呼叫，並在取得回傳資料後執行Callback函式。
		
		@method ajaxCall
		@param {String} url 要送出Ajax Request的Url
		@param {String} type 回傳的資料型別
		@param {Object} data 要帶入的參數
		@param {Object} callbacks 取回資料後要執行的Callback函式
		@param {Object} options 其它相關設定，如Cache和Offline等
		@example
			HYWEBAPP.ajaxCall('http://www.test.com/getTestData', 'json', { id: "Aio", name: "Wei"}, {
							 	success: function(result){
							 		$("#telInfo").text(result.tel);
							 	}
							 }, { cache: "true" });
		**/
		ajaxCall : function(url, type, data, callbacks, options){
			for (pro in data) {
				if (typeof data[pro] === 'function') {
					data[pro]({
						success: function(result){
							data[pro] = result;
							HYWEBAPP.ajaxCall(url, type, data, callbacks, options);
						}
					});
					return;
				}
			}
			$.support.cors = true;
       		$.mobile.allowCrossDomainPages = true;
       		$.mobile.showPageLoadingMsg();
       		console.log("url: "+url);
       		$.ajax({
            	url: url,
            	type: 'GET',
            	dataType: type,
            	cache: false,
            	data: data,
            	error: function(jqXHR, textStatus, error) {
            		$.mobile.hidePageLoadingMsg();
                	console.log('Ajax ERROR!! '+textStatus);
                	if(typeof callbacks.error === 'function'){
                		callbacks.error(jqXHR, textStatus, error);
                	}else{
                		navigator.notification.alert('資料服務發生問題，請稍候再試', null, '錯誤', '確認');
                	}
            	},
            	success: function(result, textStatus, jqXHR) {
            		$.mobile.hidePageLoadingMsg();
            		console.log('Ajax SUCCESS!!');
            		if(typeof callbacks.success === 'function'){
            			if(type === 'xml'){
            				result = HYWEBAPP.xmlToJson(result);
            			}
            			callbacks.success(result);
            		}
            	}
        	});
		},
		
		/**
		將Parent物件中所有的屬性與方法，複製到Child物件中，並回傳Child物件。
		
		@method deepCopy
		@param parentObj 要被複製的Parent物件
		@param childObj Child物件
		@return {Object} 完成複製後的Child物件
		@example
			var parentObj = { 
					say : function(name){
						return "My name is " + name;
					} 
				}, 
				childObj = {};
			childObj = deepCopy(parentObj, childObj);
			childObj.say("Jimmy");
		@example
			var sourceObj = { 
					food : function(foodName){
						return "My favorite food is " + foodName;
					} 
				};
			targetObj = deepCopy(sourceObj);
			targetObj.food("Ice Cream");
		**/
		extend : function(parentObj, childObj){
			var pros;
			var toStr = Object.prototype.toString;
			var astr = "[object Array]";
			
			childObj = childObj || {};
			
			if(typeof parentObj !== "undefined"){
				for(pros in parentObj){
					if(parentObj.hasOwnProperty(pros)){
						if(typeof parentObj[pros] === "object"){
							childObj[pros] = (toStr.call(parentObj[pros]) === astr) ? [] : {};
							//HYWEBAPP.deepCopy(parentObj, childObj);
							HYWEBAPP.extend(parentObj, childObj);
						}else{
							childObj[pros] = parentObj[pros];
						}
					}
				}
			}
			
			return childObj;
		}
	};
	
	/**
	PAGE 類別

	@class PAGE
	@constructor
	@param {String} id PAGE物件的ID
	**/
	function PAGE(id){
		var _ID = id;
		var _DS = {}; 
		var _VARIABLES = {}; 
		var _ITEMS = {};
		var _HANDLERS = {};
		var _CONTEXT = function(){
			return $("#" + id);
		};
		
		/**
		DS 類別

		@class DS
		@constructor
		@param {String} id DS物件的ID
		@param {String} pageID 此DS物件所屬的PAGE物件ID
		@param {String} type 此DS物件所提供資料的型別
		@param {Object} config 設定值物件，亦可為XML或JSON格式的資料字串
		**/
		function DS(id, pageID, type, config){
       		var _ID = id;
       		var _PAGEID = pageID;
       		var _CACHE = {};
       		var _CONFIG = config;
       							
       		return {
       			/**
				取得DS物件的ID。
		
				@method getID
				@return {String} DS物件的ID
				@example
					var id = HYWEBAPP.page('index').ds('xmlDS').getID();
				**/
       			getID : function(){
       				return _ID;
       			},
       			
       			/**
				取得此DS物件所屬的PAGE物件ID。
		
				@method getPageID
				@return {String} PAGE物件ID
				@example
					var pageid = HYWEBAPP.page('index').ds('xmlDS').getPageID();
				**/					
       			getPageID : function(){
       				return _PAGEID;
       			},
       			
       			/**
				傳入Cache ID，取得對應的Cache值。
		
				@method cache
				@param {String} cacheID Cache ID
				@return {Object} 對應的Cache值
				@example
					var cacheValue = HYWEBAPP.page('index').ds('xmlDS').cache("{ id: "aio", name: "Wei" }");
				**/					
       			cache : function(cacheID){
       				return _CACHE[cacheID];
       			},
       			
       			/**
				指定Cache ID，將值存入Cache中。
		
				@method addCache
				@param {String} cacheID Cache ID
				@param {Object} cacheObj 欲存入Cache的值
				@example
					HYWEBAPP.page('index').ds('xmlDS').addCache("{ id: "aio", name: "Wei" }", { "tel": "0913123456", "job": "Engineer" });
				**/					
       			addCache : function(cacheID, cacheObj){
       				_CACHE[cacheID] = cacheObj;
       			},
       			
       			/**
				 清除所有Cache。
		
				@method clearCache
				@example
					HYWEBAPP.page('index').ds('xmlDS').clearCache();
				**/
       			clearCache : function(){
       				_CACHE = {};
       			},
       			
       			getConfig : function(){
       				return _CONFIG;
       			},
       			
       			setConfig : function(newConfig){
       				_CONFIG = newConfig;
       			}, 
       			
       			/**
				取用DS物件所提供的資料，並傳入Callback函式，在獲得資料時執行。
		
				@method getContent
				@param {Object} callbacks 當DS物件傳回資料時要執行的Callback函式
				@example
					HYWEBAPP.page('index').ds('jsonDS').getContent({
						success: function(data){
							$('#nameField').val(data.name);
						}
					});
				**/					
       			getContent : function(callbacks){
       				if(typeof _CONFIG.source !== "undefined"){
       					var result;
       					if(type === "json"){
       						 result = JSON.parse(_CONFIG.source);
       					}else if(type === "xml"){
       						 result = HYWEBAPP.xmlToJson(jQuery.parseXML(_CONFIG.source));
       					}
       					if(typeof _CONFIG.options.dataProcessor !== "undefined"){
							var iObj;
							for(iObj in result){
								_CONFIG.options.dataProcessor(result[iObj], iObj, _CONFIG.data);
							}
						}
						if(typeof _CONFIG.options.preProcessor !== "undefined"){
							result = _CONFIG.options.preProcessor(result, _CONFIG.data);
						}
       					callbacks.success(result);
       				}else if(typeof _CONFIG.url !== "undefined"){
       					if(_CONFIG.options.cache === true){
       						var cachekey = JSON.stringify(_CONFIG.data);
							if(typeof _CACHE[cachekey] !== "undefined"){
								console.log('Cache ACCESS!!');
								var cacheResult = _CACHE[cachekey];
								if(typeof _CONFIG.options.dataProcessor !== "undefined"){
									var iObj;
									for(iObj in cacheResult){
										_CONFIG.options.dataProcessor(cacheResult[iObj], iObj, _CONFIG.data);
									}
								}
								if(typeof _CONFIG.options.preProcessor !== "undefined"){
									cacheResult = _CONFIG.options.preProcessor(cacheResult, _CONFIG.data);
								}
								callbacks.success(cacheResult);
								return;
							}
       					}
       					if(HYWEBAPP.checkConnection() === "No network connection"){
							if(options.offline === true){
								var offlinekey = _PAGEID + "_" + _ID + JSON.stringify(_CONFIG.data);
								var offlineResult = _LOCALSTORAGE.getItem(offlinekey);
								if(typeof offlineResult !== "undefined"){
									console.log('Offline ACCESS!!');
									var offlineJsonResult = JSON.parse(offlineResult);
									if(typeof _CONFIG.options.dataProcessor !== "undefined"){
										var iObj;
										for(iObj in offlineJsonResult){
											_CONFIG.options.dataProcessor(offlineJsonResult[iObj], iObj, _CONFIG.data);
										}
									}
									if(typeof _CONFIG.options.preProcessor !== "undefined"){
										offlineJsonResult = _CONFIG.options.preProcessor(offlineJsonResult, _CONFIG.data);
									}
									callbacks.success(offlineJsonResult);
									return;
								}
							}
						}
						
       					HYWEBAPP.ajaxCall(_CONFIG.url, type, HYWEBAPP.extend(_CONFIG.data), {
       						success: function(result){
       							if(_CONFIG.options.cache === true){
       								var cachekey = JSON.stringify(_CONFIG.data);
            						_CACHE[cachekey] = result;
            						console.log('Cache SAVED!!');
       							}
       							if(_CONFIG.options.offline === true) { 
            						var offlinekey = _PAGEID + "_" + _ID + JSON.stringify(_CONFIG.data);
            						_LOCALSTORAGE.setItem(offlinekey, JSON.stringify(result));
            						console.log('Offline SAVED!!');
            					}
            					if(typeof _CONFIG.options.dataProcessor !== "undefined"){
									var iObj;
									for(iObj in result){
										_CONFIG.options.dataProcessor(result[iObj], iObj, _CONFIG.data);
									}
								}
								if(typeof _CONFIG.options.preProcessor !== "undefined"){
									result = _CONFIG.options.preProcessor(result, _CONFIG.data);
								}
            					callbacks.success(result);
       						},
       						error: callbacks.error
       					}, _CONFIG.options);
       				}
       			}
       		};
       							
       	}
       	
       	/**
		ITEM 類別

		@class ITEM
		@constructor
		@param {String} id ITEM物件的ID
		@param {String} pageid 此ITEM物件所屬的PAGE物件ID
		@param {String} type ITEM類型
		**/
       	function ITEM(id, pageid, type){
       		var _ID = id,
       			_PAGEID = pageid,
       			_TYPE = type,
       			_SUBSCRIBERS = { value: [] },
       			_PROPERTIES = [],
       			_HANDLERS = {},
       			_CONTEXT = function(){
       				return $("#" + _PAGEID + "_" + _ID);
       			},
       			itemObj = {
       				/**
					取得Item ID。
		
					@method getID
					@return {String} ITEM物件的ID
					@example
						var id = HYWEBAPP.page('index').getItem('text1').getID();
					**/
       				getID : function(){
       					return _ID;
       				},
       			
	       			getRealID : function(){
	       				return _PAGEID + "_" + _ID;
	       			},
       			
	       			/**
					取得Item型別。
			
					@method getType
					@return {String} Item的類型
					@example
						var itemType = HYWEBAPP.page('index').getITEM('text1').getType();
					**/
	       			getType : function(){
	       				return _TYPE;
	       			},
       			
	       			/**
					取得代表此UI元件的jQuery物件。
			
					@method getContext
					@return {jQuery} jQuery物件
					@example
						var text1Context = HYWEBAPP.page('index').item('text1').getContext();
					**/
	       			getContext : function(){
	       				return _CONTEXT();
	       			}, 
	       			
	       			property : function(propName, propValue){
	       				var i,
	       					propSize = _PROPERTIES.length;
	       				console.log("arguments length: " + arguments.length);
	       				console.log("property name :" + propName);
	       				if(arguments.length === 1){
	       					for(i=0;i<propSize;i++){
	       						if(_PROPERTIES[i].name === propName){
	       							console.log("getter: "+ _PROPERTIES[i].getter());
	       							return _PROPERTIES[i].getter();
	       						}
	       					}
	       					return;
	       				}
	       				for(i=0;i<propSize;i++){
       						if(_PROPERTIES[i].name === propName){
       							_PROPERTIES[i].setter(propValue);
       						}
       					}
	       			}, 
       			
	       			setHandler : function(eventType, func){
	       				if(typeof _HANDLERS[eventType] === "undefined"){
	       					_HANDLERS[eventType] = [];
	       				}
	       				_HANDLERS[eventType].push(func);
	       			},
       			
	       			execHandler : function(eventType){
	       				var i, 
	       					handlersSize = (typeof _HANDLERS[eventType] === "undefined")?0:_HANDLERS[eventType].length;
	       				for(i=0;i<handlersSize;i++){
	       					_HANDLERS[eventType][i]();
	       				}
	       			},
       			
	       			subscribers : function(attr){
	       				var subscriberArray = (typeof _SUBSCRIBERS[attr] === "undefined")?[]:_SUBSCRIBERS[attr];
	       				return subscriberArray;
	       			},
	       			
	       			addSubscriber : function(attr, subscriberObj){
	       				console.log("subscriber attr: " + attr);
	       				if(typeof _SUBSCRIBERS[attr] === "undefined"){
	       					_SUBSCRIBERS[attr] = [];
	       				}
	       				_SUBSCRIBERS[attr].push(subscriberObj);
	       			},
       			
	       			removeSubscriber : function(attr, index){
	       				if(typeof _SUBSCRIBERS[attr] !== "undefined"){
	       					_SUBSCRIBERS[attr].splice(index, 1);
	       				}
	       			},
	       			
	       			registerProperty : function(propObj){
	       				var i,
	       					propSize = _PROPERTIES.length;
	       				for(i=0;i<propSize;i++){
	       					if(_PROPERTIES[i].name === propObj.name){
	       						_PROPERTIES[i] = propObj;
	       						return;
	       					}
	       				}
	       				_PROPERTIES[i] = propObj;
	       			},
	       			
	       			removeProperty : function(propName){
	       				var i,
	       					propSize = _PROPERTIES.length;
	       				for(i=0;i<propSize;i++){
	       					if(_PROPERTIES[i].name === propName){
	       						_PROPERTIES.splice(i,1);
	       						return;
	       					}
	       				}
	       			},
	       			
	       			addEventHandler : function(eventName, handler) {
	       				_CONTEXT().live(eventName, handler);  
	       			}
       			};
       		
       		return HYWEBAPP.ui[_TYPE](itemObj);
       	}
	
		return {
			/**
			取得Page ID。
		
			@method getID
			@return {String} PAGE物件的ID
			@for PAGE
			@example
				var id = HYWEBAPP.page('index').getID();
			**/
			getID : function(){
				return _ID;
			},
		
			/**
			取得代表此頁面的jQuery物件。
		
			@method getContext
			@return {jQuery} jQuery物件
			@example
				var pageContext = HYWEBAPP.page('index').getContext();
			**/
			getContext : function(){
				return _CONTEXT();
			},
			
			refresh : function(){
				var context = _CONTEXT();
				context.trigger('pageinit');
				context.trigger('pagebeforeshow');
				context.trigger('pageshow');
			},
			
			setHandler : function(eventType, func){
   				if(typeof _HANDLERS[eventType] === "undefined"){
   					_HANDLERS[eventType] = [];
   				}
   				_HANDLERS[eventType].push(func);
   			},
		
   			execHandler : function(eventType){
   				var i, 
   					handlersSize = (typeof _HANDLERS[eventType] === "undefined")?0:_HANDLERS[eventType].length;
   				for(i=0;i<handlersSize;i++){
   					_HANDLERS[eventType][i]();
   				}
   			},
			
			clearCaches : function(){
				var dsObj
				for(dsObj in _DS){
					_DS[dsObj].clearCache();
				}
			},
			
			/**
			產生一個新的DS物件。
		
			@method createDS
			@param {String} dsID DS物件的ID
			@param {String} type 此DS物件所提供資料的型別
			@param {Object} config 設定值物件，亦可為XML或JSON格式的資料字串
			@return {DS} DS物件
			@example
				var newDS = HYWEBAPP.page('index').createDS('myDS','json',{ url: 'http://www.test.com/getJson', data: { id: 'aio' }, options: { cache: true } });
			@example
				var newDS = HYWEBAPP.page('index').createDS('myDS','json','[{ "name": "Wei", "tel": "0913234567" }, { "name": "Jojy", "tel": "0933123456" }]');
			**/
			createDS : function(dsID, type, config){
				return new DS(dsID, _ID, type, config);
			},
			
			/**
			加入一個DS物件。
		
			@method addDS
			@param {DS} dsObj 要加入的DS物件
			@example
				HYWEBAPP.page('index').addDS(newDS);
			**/
			addDS : function(dsObj){
				_DS[dsObj.getID()] = dsObj;
			},
		
			/**
			傳入Datasource ID，取得對應的DS物件。
		
			@method ds
			@param {String} dsID Datasource的ID
			@return {DS} DS物件
			@example
				var userDS = HYWEBAPP.page('index').ds('userInfo');
			**/
			ds : function(dsID){
				return _DS[dsID];
			},
		
			/**
			傳入Variable ID，取得對應的Variable值；或傳入Variable ID與值，設定該Variable物件的值。
		
			@method variable
			@param {String} varID Variable的ID
			@param {String} value Variable的值
			@return {Object} Variable的值
			@example
				var newLatitude = HYWEBAPP.page('map').variable('latitude');
			@example
				HYWEBAPP.page('map').variable('amount', '29300.56');
			**/
			variable : function(varID, value){
				if(arguments.length === 1){
					return _VARIABLES[varID];
				}else{
					_VARIABLES[varID] = value;
					return this;
				}
			},
			
			createItem : function(id, type){
				return new ITEM(id, _ID, type);
			},
		
			/**
			加入一個ITEM物件。
		
			@method addItem
			@param {ITEM} itemObj 要加入的ITEM物件
			@example
				HYWEBAPP.page('location').addItem(mapObj);
			**/
			addItem : function(itemObj){
				_ITEMS[itemObj.getID()] = itemObj;
			},
		
			/**
			傳入Item ID，取得對應的ITEM物件。
		
			@method item
			@param {String} itemID ITEM物件的ID
			@return {ITEM} ITEM物件
			@example
				var inputTel = HYWEBAPP.page('index').item('telField');
			**/
			item : function(itemID){
				return _ITEMS[itemID];
			},
		
			/**
			取得目前頁面上所有ITEM物件的集合。
		
			@method items
			@return {Object} ITEM物件集合
			@example
				var indexItems = HYWEBAPP.page('index').items();
			**/
			items : function(){
				return _ITEMS;
			},
			
			/**
			設定目前頁面的事件處理函式。
		
			@method addEventHandler
			@param {String} eventName 事件名稱
			@param {Object} handler 處理函式物件
			@example
				HYWEBAPP.page('index').addEventHandler('pageinit', function(){ console.log('page init!!'); });
			**/
			addEventHandler : function(eventName, handler) {
				if(eventName === "pageinit" || eventName === "pagebeforeshow" || eventName === "pageshow"){
					if(typeof _HANDLERS[eventName] === "undefined"){
	   					_HANDLERS[eventName] = [];
	   				}
	   				_HANDLERS[eventName].push(handler);
				}else{
					_CONTEXT().live(eventName, handler);
				}  
   			}
		};
	}
	
	return {
		/**
		傳入Page ID，取得對應的PAGE物件。
		
		@method page
		@param {String} pageID Page的ID
		@return {PAGE} PAGE物件
		@for HYWEBAPP
		@example
			var indexPage = HYWEBAPP.page('index');
		**/
		page : function(pageID){
			return _PAGES[pageID];
		},
		
		/**
		加入一個PAGE物件。
		
		@method addPage
		@param {PAGE} pageObj 要加入的PAGE物件
		@example
			HYWEBAPP.addPage(newPage);
		**/
		addPage : function(pageObj){
			_PAGES[pageObj.getID()] = pageObj;
		},
		
		/**
		加入一個ROUTE物件至ROUTER中。
		
		@method addRoute
		@param {ROUTE} routeObj 要加入的ROUTE物件
		@example
			HYWEBAPP.addRoute(newRoute);
		**/
		addRoute : function(routeObj){
			_ROUTER.add(routeObj);
		},
		
		/**
		解析Url中的Query String，並將結果組成一個Object回傳。
		
		@method getRouteParams
		@param {String} matchObj Query String字串
		@return {Object} Query String中各參數組成的物件
		@example
			var id = HYWEBAPP.getRouteParams(match).id;
		**/
		getRouteParams : function(matchObj){
			return _ROUTER.getParams(matchObj);
		}, 
		
		xmlToJson : _UTILS.xmlToJson,
		
		toPage : _UTILS.toPage,
	
		checkConnection : _UTILS.checkConnection,
		
		getLocalStorage : _UTILS.getLocalStorage,
		
		setLocalStorage : _UTILS.setLocalStorage,
		
		removeLocalStorage : _UTILS.removeLocalStorage,
		
		clearLocalStorage : _UTILS.clearLocalStorage,
	
		getPosition : _UTILS.getPosition,
		
		watchPosition : _UTILS.watchPosition,
		
		stopWatchPosition : _UTILS.stopWatchPosition,
	
		ajaxCall : _UTILS.ajaxCall,
		
		extend : _UTILS.extend,
		
		nextPage : _NEXTPAGE,
		
		prevPage : _PREPAGE,
		
		/**
		建立一個新的PAGE物件。
		
		@method createPage
		@param {String} id PAGE物件的ID
		@return {PAGE} 新的PAGE物件
		@example
			var newPage = HYWEBAPP.createPage("location");
		**/
		createPage : function(id){
			return new PAGE(id);
		},
		
		startUp : function(){
			var configs = $.getJSON('config/config.json', function(data){
				$.mobile.defaultPageTransition = data.transition;
				$.mobile.defaultDialogTransition = data.transition;
				$.mobile.loadingMessage = data.loadingMessage;
				$.mobile.loadingMessageTextVisible = data.loadingMessageTextVisible;
				document.addEventListener("deviceready", function(){ 
					$(window).bind('orientationchange', _ORIENTATIONCHANGE);
					$(window).bind('resize', _RESIZE);
					document.addEventListener("backbutton", function(e){
						if($.mobile.activePage.is('#' + data.startPage)){
					        e.preventDefault();
					        navigator.notification.confirm('是否關閉app', function(btnIndex){
					        	if(btnIndex === 1){ navigator.app.exitApp(); }
					        },'關閉app','確認,取消');
					    }
					    else {
					        navigator.app.backHistory();
					    }
					}, false);
					
					HYWEBAPP.toPage(data.startPage,{});
				}, false);
			});
		}
	};
	
}());

(function(obj){
	
	obj.chart = function(item){
		
		var _ITEM = item,
			_HYCHART = (function(){
				
				this.parseLegendPosition = function(legend, pos) {
					if(pos === 'e'){
						legend.align = 'right';
						legend.verticalAlign = 'middle';
					}else if(pos === 'w'){
						legend.align = 'left';
						legend.verticalAlign = 'middle';
					}else if(pos === 's'){
						legend.align = 'center';
						legend.verticalAlign = 'bottom';
					}else if(pos === 'n'){
						legend.align = 'center';
						legend.verticalAlign = 'top';
					}else if(pos === 'ne'){
						legend.align = 'right';
						legend.verticalAlign = 'top';
					}else if(pos === 'nw'){
						legend.align = 'left';
						legend.verticalAlign = 'top';
					}else if(pos === 'se'){
						legend.align = 'right';
						legend.verticalAlign = 'bottom';
					}else if(pos === 'sw'){
						legend.align = 'left';
						legend.verticalAlign = 'bottom';
					}
				};
				
				this.settingEvents = function(eventsConfig, eventsObj){
					for(var i in eventsObj){
						eventsConfig[i] = eventsObj[i];
					}
				};
				
				this.settingAxis = function(axis, options) {
					if(typeof options.type !== 'undefined'){
						if(options.type === 'linear'){
							axis.type = "linear";
						}else if(options.type === 'log'){
							axis.type = "logarithmic";
						}else if(options.type === 'date'){
							axis.type = "datetime";
						}else if(options.type === 'category'){
							axis.type = "datetime";
						}
						if(typeof options.label !== 'undefined'){
							axis.title.text = options.label;
						}
						if(typeof options.tickAngle !== 'undefined'){
							axis.labels.rotation = parseInt(options.tickAngle, 10);
						}
						if(typeof options.formatter !== 'undefined'){
							axis.labels.formatter = options.formatter;
						}
						if(typeof options.overflow !== 'undefined'){
							axis.labels.overflow = options.overflow;
						}
						if(typeof options.xOffSet !== 'undefined'){
							axis.labels.x = parseInt(options.xOffSet, 10);
						}
						if(typeof options.yOffSet !== 'undefined'){
							axis.labels.y = parseInt(options.yOffSet, 10);
						}
						if(typeof options.tickInterval !== 'undefined'){
							axis.tickInterval = options.tickInterval;
						}
						if(typeof options.minRange !== 'undefined'){
							axis.minRange = options.minRange;
						}
						if(typeof options.minTickInterval !== 'undefined'){
							axis.minTickInterval = options.minTickInterval;
						}
						if(typeof options.categories !== 'undefined'){
							axis.categories = options.categories;
						}
					}
				};
				
				var hychart = function(item, options){
				
					var _CHART,
						initChart = function(item, options){
							var i, j, 
								seriesSize = options.dataSeries.length, 
								configs = { 
									chart: { renderTo: item.getRealID(), events: {}, reflow: false }, 
									title: { text: "" },
									exporting: { enabled: false }, 
									credits: { 
										enabled: false
									}, 
									colors: ["blue","black","red"],
									tooltip: { crosshairs: true, shared: true } 
								};
							
							for(i=0;i<seriesSize;i++){
								if(typeof options.dataSeries[i].ds !== 'undefined'){
									HYWEBAPP.page(options.dataSeries[i].ds.page).ds(options.dataSeries[i].ds.id).getContent({
										success: function(data){
											var tmpPointArray = [],
												dataSize = data.length;
											for(j=0;j<dataSize;j++){
												var tmpPoint = [];
												tmpPoint.push(data[j][options.dataSeries[i].ds.x]);
												tmpPoint.push(data[j][options.dataSeries[i].ds.y]);
												tmpPointArray.push(tmpPoint);
											}
											delete options.dataSeries[i].ds;
											options.dataSeries[i].points = tmpPointArray;
											initChart(item, options);
											return;
										} 
									});
								}
							}
							
							if(typeof options.events !== 'undefined'){
								configs.chart.events = options.events;
							}
							
							if(typeof options.credits !== 'undefined'){
								configs.credits = options.credits;
							}
							
							if(typeof options.tooltip !== 'undefined'){
								configs.tooltip = options.tooltip;
							}
							
							if(typeof options.title !== 'undefined'){
								console.log('title: '+ options.title);
								configs.title.text = options.title;
							}
							
							if(typeof options.legend !== 'undefined'){
								configs.legend = {};
								if(typeof options.legend.show !== 'undefined'){
									configs.legend.enabled = options.legend.show;
								}
								if(typeof options.legend.position !== 'undefined'){
									this.parseLegendPosition(configs.legend, options.legend.position);
								}
							}
							
							configs.events = {};
							if(typeof options.events !== 'undefined'){
								this.settingEvents(configs.events, options.events);
							}
							
							//configs.xAxis = [{ title: {}, labels: { overflow: 'justify' }, showLastLabel: true }];
							configs.xAxis = [{ title: {}, labels: { }, showLastLabel: true }];
							
							if(typeof options.xaxis !== 'undefined'){
								this.settingAxis(configs.xAxis[0], options.xaxis);
							}
							
							if(typeof options.x2axis !== 'undefined'){
								configs.xAxis.push({ opposite: true, title: {}, labels: {} });	
								this.settingAxis(configs.xAxis[1], options.x2axis);
							}
							
							configs.yAxis = [{ title: {}, labels: {}, lineWidth: 1 }];
							
							if(typeof options.yaxis !== 'undefined'){
								this.settingAxis(configs.yAxis[0], options.yaxis);
							}
							
							if(typeof options.y2axis !== 'undefined'){
								configs.yAxis.push({ opposite: true, title: {}, labels: {} });	
								this.settingAxis(configs.yAxis[1], options.y2axis);
							}
							
							configs.series = [];
							for(i=0;i<seriesSize;i++){
								var seriesConfig = {};
									
								if(typeof options.dataSeries[i].type !== 'undefined'){
									if(options.dataSeries[i].type === 'line'){
										seriesConfig.type = 'line'
									}else if(options.dataSeries[i].type === 'bar'){
										seriesConfig.type = 'bar'
									}else if(options.dataSeries[i].type === 'pie'){
										seriesConfig.type = 'pie'
									}
								}
								
								if(typeof options.dataSeries[i].xaxis !== 'undefined'){
									if(options.dataSeries[i].xaxis === 'x'){
										seriesConfig.xAxis = 0;
									}else if(options.dataSeries[i].xaxis === 'x2'){
										seriesConfig.xAxis = 1;
									}
								}else{
									seriesConfig.xAxis = 0;
								}
								
								if(typeof options.dataSeries[i].yaxis !== 'undefined'){
									if(options.dataSeries[i].yaxis === 'y'){
										seriesConfig.yAxis = 0;
									}else if(options.dataSeries[i].yaxis === 'y2'){
										seriesConfig.yAxis = 1;
									}
								}else{
									seriesConfig.yAxis = 0;
								}
								
								if(typeof options.dataSeries[i].label !== 'undefined'){
									seriesConfig.name = options.dataSeries[i].label;
								}
								
								if(typeof options.dataSeries[i].points !== 'undefined'){
									var seriesArray = [],
										pointsSize = options.dataSeries[i].points.length;
									for(j=0;j<pointsSize;j++){
										var pointArray = [];
										if(seriesConfig.xAxis === 0){
											if(configs.xAxis[0].type === 'datetime'){
												var d = new Date(options.dataSeries[i].points[j][0]);
												pointArray.push(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
											}else{
												pointArray.push(parseFloat(options.dataSeries[i].points[j][0]));
											}
										}else{
											if(configs.xAxis[1].type === 'datetime'){
												var d = new Date(options.dataSeries[i].points[j][0]);
												pointArray.push(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
											}else{
												pointArray.push(parseFloat(options.dataSeries[i].points[j][0]));
											}
										}
										if(typeof options.dataSeries[i].points[j][1] === 'string'){
											pointArray.push(parseFloat(options.dataSeries[i].points[j][1]));
										}else{
											pointArray.push(options.dataSeries[i].points[j][1]);
										}
										seriesArray.push(pointArray);
									}
									seriesConfig.data = seriesArray;
								} 	
								
								configs.series.push(seriesConfig);
							}
							
							console.log(JSON.stringify(configs));
							Highcharts.setOptions({
						        lang: {
						            numericSymbols: false
						        }
						    });
						    if(typeof options.global !== 'undefined'){
						    	Highcharts.setOptions({
							        global: options.global
							    });
						    }
							return new Highcharts.Chart(configs);
						};
					
					_CHART = initChart(item, options);
					
					item.registerProperty({
						name: 'width',
						getter: function(){
							item.getContext().css('width');
						},
						setter: function(obj){
							item.getContext().css('width', obj);
						}
					});
					
					item.registerProperty({
						name: 'height',
						getter: function(){
							item.getContext().css('height');
						},
						setter: function(obj){
							item.getContext().css('height', obj);
						}
					});
					
					return HYWEBAPP.extend({
						 getChartInstance: function(){
						 	return _CHART;
						 },
						 
						 get: function(id){
						 	return _CHART.get(id);
						 },
						 
						 getOptions: function(){
						 	return _CHART.options;
						 },
						 
						 getSelectedPoints: function(){
						 	return _CHART.getSelectedPoints();
						 },
						 
						 getSelectedSeries: function(){
						 	return _CHART.getSelectedSeries();
						 },
						 
						 addSeries: function(option, redraw, animation){
						 	_CHART.addSeries(option, redraw, animation);
						 },
						 
						 setSize: function(width, height){
						 	_CHART.setSize(width, height);
						 },
						 
						 redraw: function(){
						 	_CHART.redraw();
						 },
						 
						 destroy: function(){
						 	_CHART.destroy();
						 }
					},item);
				};
				
			return{
				chart: function(options){
					return new hychart(_ITEM, options);
				}
			};
			
		}());
		
		return HYWEBAPP.extend(_HYCHART,_ITEM);
	};
	
}(HYWEBAPP.ui));

(function(obj){
	
	obj.chart = function(item){
		
		var _ITEM = item,
			_HYCHART = (function(){
			
				var hychart = function(item, options){
				
					var _CHART,
						initChart = function(item, options){
							var i, j, 
								seriesSize = options.dataSeries.length, 
								xaxisType = 'linear', 
								x2axisType = 'linear', 
								yaxisType = 'linear', 
								y2axisType = 'linear',
								configs = {},
								series = [], 
								handlers = {
									dataClick: function(callback){
										item.getContext().bind('jqplotDataClick',
							            	function (ev, seriesIndex, pointIndex, data) {                
							                	callback(ev, seriesIndex, pointIndex, options.dataSeries[seriesIndex].points[pointIndex])
							            	}
							        	);
									}
								};
							
							for(i=0;i<seriesSize;i++){
								if(typeof options.dataSeries[i].ds !== 'undefined'){
									HYWEBAPP.page(options.dataSeries[i].ds.page).ds(options.dataSeries[i].ds.id).getContent({
										success: function(data){
											var tmpPointArray = [],
												dataSize = data.length;
											for(j=0;j<dataSize;j++){
												var tmpPoint = [];
												tmpPoint.push(data[j][options.dataSeries[i].ds.x]);
												tmpPoint.push(data[j][options.dataSeries[i].ds.y]);
												tmpPointArray.push(tmpPoint);
											}
											delete options.dataSeries[i].ds;
											options.dataSeries[i].points = tmpPointArray;
											initChart(item, options);
											return;
										} 
									});
								}
							}
							
							configs.axesDefaults = { tickRenderer: $.jqplot.CanvasAxisTickRenderer };
							configs.seriesColors = ["blue","black","red"];
							
							if(typeof options.title !== 'undefined'){
								configs.title = options.title;
							}
							
							if(typeof options.legend !== 'undefined'){
								configs.legend = {};
								if(typeof options.legend.show !== 'undefined'){
									configs.legend.show = options.legend.show;
								}
								if(typeof options.legend.position !== 'undefined'){
									configs.legend.location = options.legend.position;
								}
								if(typeof options.legend.placement !== 'undefined'){
									configs.legend.placement = options.legend.placement;
								}
							}
							
							if(typeof options.xaxis !== 'undefined'){
								if(typeof configs.axes === 'undefined'){ configs.axes = {}; }
								configs.axes.xaxis = {};
								if(typeof options.xaxis.type !== 'undefined'){
									xaxisType = options.xaxis.type;
									if(options.xaxis.type === 'linear'){
										configs.axes.xaxis.renderer = $.jqplot.LinearAxisRenderer;
									}else if(options.xaxis.type === 'log'){
										configs.axes.xaxis.renderer = $.jqplot.LogAxisRenderer;
										if(typeof options.xaxis.logBase !== 'undefined'){
											configs.axes.xaxis.base = options.xaxis.logBase;
										}
									}else if(options.xaxis.type === 'date'){
										configs.axes.xaxis.renderer = $.jqplot.DateAxisRenderer;
									}else if(options.xaxis.type === 'category'){
										configs.axes.xaxis.renderer = $.jqplot.CategoryAxisRenderer;
									}
									if(typeof options.xaxis.label !== 'undefined'){
										configs.axes.xaxis.label = options.xaxis.label;
										configs.axes.xaxis.labelRenderer = $.jqplot.CanvasAxisLabelRenderer;
									}
									if(typeof options.xaxis.tickAngle !== 'undefined'){
										configs.axes.xaxis.tickRenderer = $.jqplot.CanvasAxisTickRenderer;
										configs.axes.xaxis.tickOptions = {};
										configs.axes.xaxis.tickOptions.angle = options.xaxis.tickAngle;
									}
								}
							}
							
							if(typeof options.x2axis !== 'undefined'){
								if(typeof configs.axes === 'undefined'){ configs.axes = {}; }
								configs.axes.x2axis = {};
								if(typeof options.x2axis.type !== 'undefined'){
									x2axisType = options.x2axis.type;
									if(options.x2axis.type === 'linear'){
										configs.axes.x2axis.renderer = $.jqplot.LinearAxisRenderer;
									}else if(options.x2axis.type === 'log'){
										configs.axes.x2axis.renderer = $.jqplot.LogAxisRenderer;
										if(typeof options.x2axis.logBase !== 'undefined'){
											configs.axes.x2axis.base = options.x2axis.logBase;
										}
									}else if(options.x2axis.type === 'date'){
										configs.axes.x2axis.renderer = $.jqplot.DateAxisRenderer;
									}else if(options.x2axis.type === 'category'){
										configs.axes.x2axis.renderer = $.jqplot.CategoryAxisRenderer;
									}
									if(typeof options.x2axis.label !== 'undefined'){
										configs.axes.x2axis.label = options.x2axis.label;
										configs.axes.x2axis.labelRenderer = $.jqplot.CanvasAxisLabelRenderer;
									}
									if(typeof options.x2axis.tickAngle !== 'undefined'){
										configs.axes.x2axis.tickRenderer = $.jqplot.CanvasAxisTickRenderer;
										configs.axes.x2axis.tickOptions = {};
										configs.axes.x2axis.tickOptions.angle = options.x2axis.tickAngle;
									}
								}
							}
							
							if(typeof options.yaxis !== 'undefined'){
								if(typeof configs.axes === 'undefined'){ configs.axes = {}; }
								configs.axes.yaxis = {};
								if(typeof options.yaxis.type !== 'undefined'){
									yaxisType = options.yaxis.type;
									if(options.yaxis.type === 'linear'){
										configs.axes.yaxis.renderer = $.jqplot.LinearAxisRenderer;
									}else if(options.yaxis.type === 'log'){
										configs.axes.yaxis.renderer = $.jqplot.LogAxisRenderer;
										if(typeof options.yaxis.logBase !== 'undefined'){
											configs.axes.yaxis.base = options.yaxis.logBase;
										}
									}else if(options.yaxis.type === 'date'){
										configs.axes.yaxis.renderer = $.jqplot.DateAxisRenderer;
									}else if(options.yaxis.type === 'category'){
										configs.axes.yaxis.renderer = $.jqplot.CategoryAxisRenderer;
									}
									if(typeof options.yaxis.label !== 'undefined'){
										configs.axes.yaxis.label = options.yaxis.label;
										configs.axes.yaxis.labelRenderer = $.jqplot.CanvasAxisLabelRenderer;
									}
									if(typeof options.yaxis.tickAngle !== 'undefined'){
										configs.axes.yaxis.tickRenderer = $.jqplot.CanvasAxisTickRenderer;
										configs.axes.yaxis.tickOptions = {};
										configs.axes.yaxis.tickOptions.angle = options.yaxis.tickAngle;
									}
								}
							}
							if(typeof options.y2axis !== 'undefined'){
								if(typeof configs.axes === 'undefined'){ configs.axes = {}; }
								configs.axes.y2axis = {};
								if(typeof options.y2axis.type !== 'undefined'){
									y2axisType = options.y2axis.type;
									if(options.y2axis.type === 'linear'){
										configs.axes.y2axis.renderer = $.jqplot.LinearAxisRenderer;
									}else if(options.y2axis.type === 'log'){
										configs.axes.y2axis.renderer = $.jqplot.LogAxisRenderer;
										if(typeof options.y2axis.logBase !== 'undefined'){
											configs.axes.y2axis.base = options.y2axis.logBase;
										}
									}else if(options.y2axis.type === 'date'){
										configs.axes.y2axis.renderer = $.jqplot.DateAxisRenderer;
									}else if(options.y2axis.type === 'category'){
										configs.axes.y2axis.renderer = $.jqplot.CategoryAxisRenderer;
									}
									if(typeof options.y2axis.label !== 'undefined'){
										configs.axes.y2axis.label = options.y2axis.label;
										configs.axes.y2axis.labelRenderer = $.jqplot.CanvasAxisLabelRenderer;
									}
									if(typeof options.y2axis.tickAngle !== 'undefined'){
										configs.axes.y2axis.tickRenderer = $.jqplot.CanvasAxisTickRenderer;
										configs.axes.y2axis.tickOptions = {};
										configs.axes.y2axis.tickOptions.angle = options.y2axis.tickAngle;
									}
								}
							}
							
							if(typeof options.grid !== 'undefined'){
								configs.grid = {};
								configs.grid.renderer = $.jqplot.CanvasGridRenderer;
								if(typeof options.grid.drawLine !== 'undefined'){
									configs.grid.drawGridLines = options.grid.drawLine; 
								}
							}
							
							if(typeof options.eventHandlers !== 'undefined'){
								for(i in options.eventHandlers){
									if(typeof handlers[i] !== 'undefined'){
										handlers[i](options.eventHandlers[i]);
									}
								}
							}
							
							configs.series = [];
							for(i=0;i<seriesSize;i++){
								var xaxis = 'x',
									yaxis = 'y',
									seriesConfig = {};
									
								if(typeof options.dataSeries[i].type !== 'undefined'){
									if(options.dataSeries[i].type === 'line'){
										seriesConfig.renderer = $.jqplot.LineRenderer;
										seriesConfig.rendererOptions = {};
										if(typeof options.dataSeries[i].width !== 'undefined'){
											seriesConfig.rendererOptions.lineWidth = options.dataSeries[i].width; 
										}
									}else if(options.dataSeries[i].type === 'bar'){
										seriesConfig.renderer = $.jqplot.BarRenderer;
										seriesConfig.rendererOptions = {};
										if(typeof options.dataSeries[i].direction !== 'undefined'){
											seriesConfig.rendererOptions.barDirection = options.dataSeries[i].direction; 
										}
									}else if(options.dataSeries[i].type === 'pie'){
										seriesConfig.renderer = $.jqplot.PieRenderer;
										seriesConfig.rendererOptions = { showDataLabels: true };
										delete configs.axes;
										delete configs.grid;
									}
								}
								
								if(typeof options.dataSeries[i].fill !== 'undefined'){
									seriesConfig.fill = options.dataSeries[i].fill;
								}
								
								if(typeof options.dataSeries[i].marker !== 'undefined'){
									seriesConfig.markerRenderer = $.jqplot.MarkerRenderer;
									seriesConfig.markerOptions = {};
									if(typeof options.dataSeries[i].marker.show !== 'undefined'){
										seriesConfig.markerOptions.show = options.dataSeries[i].marker.show; 
									}
									if(typeof options.dataSeries[i].marker.type !== 'undefined'){
										seriesConfig.markerOptions.style = options.dataSeries[i].marker.type; 
									}
									if(typeof options.dataSeries[i].marker.size !== 'undefined'){
										seriesConfig.markerOptions.size = options.dataSeries[i].marker.size; 
									}
								}
								
								if(typeof options.dataSeries[i].pointLabel !== 'undefined'){
									seriesConfig.pointLabels = {};
									if(typeof options.dataSeries[i].pointLabel.show !== 'undefined'){
										seriesConfig.pointLabels.show = options.dataSeries[i].pointLabel.show; 
									}
									if(typeof options.dataSeries[i].pointLabel.position !== 'undefined'){
										seriesConfig.pointLabels.location = options.dataSeries[i].pointLabel.position; 
									}
								}
								
								if(typeof options.dataSeries[i].xaxis !== 'undefined'){
									xaxis = options.dataSeries[i].xaxis;
									if(options.dataSeries[i].xaxis === 'x'){
										seriesConfig.xaxis = 'xaxis';
									}else if(options.dataSeries[i].xaxis === 'x2'){
										seriesConfig.xaxis = 'x2axis';
									}
								}
								
								if(typeof options.dataSeries[i].yaxis !== 'undefined'){
									yaxis = options.dataSeries[i].yaxis;
									if(options.dataSeries[i].yaxis === 'y'){
										seriesConfig.yaxis = 'yaxis';
									}else if(options.dataSeries[i].yaxis === 'y2'){
										seriesConfig.yaxis = 'y2axis';
									}
								}
								
								if(typeof options.dataSeries[i].label !== 'undefined'){
									seriesConfig.label = options.dataSeries[i].label;
								}
								
								if(typeof options.dataSeries[i].points !== 'undefined'){
									var seriesArray = [],
										pointsSize = options.dataSeries[i].points.length;
									for(j=0;j<pointsSize;j++){
										var pointArray = [];
										if(xaxis === 'x'){
											if(xaxisType === 'date' || xaxisType === 'category' || options.dataSeries[i].type === 'pie'){
												pointArray.push(options.dataSeries[i].points[j][0]);
											}else{
												pointArray.push(parseFloat(options.dataSeries[i].points[j][0]));
											}
										}else{
											if(x2axisType === 'date' || x2axisType === 'category' || options.dataSeries[i].type === 'pie'){
												pointArray.push(options.dataSeries[i].points[j][0]);
											}else{
												pointArray.push(parseFloat(options.dataSeries[i].points[j][0]));
											}
										}
										if(typeof options.dataSeries[i].points[j][1] === 'string'){
											pointArray.push(parseFloat(options.dataSeries[i].points[j][1]));
										}else{
											pointArray.push(options.dataSeries[i].points[j][1]);
										}
										seriesArray.push(pointArray);
									}
									series.push(seriesArray);
								} 	
								
								configs.series.push(seriesConfig);
							}
							
							console.log(JSON.stringify(configs));
							var test = '[';
							for(i=0;i<series.length;i++){
								test = test + '[';
								for(j=0;j<series[i].length;j++){
									var k;
									test = test + '[';
									for(k=0;k<series[i][j].length;k++){
										test = test + series[i][j][k];
										if(k!=series[i][j].length-1){ test = test + ','; }
									}
									test = test + ']';
									if(j!=series[i].length-1){ test = test + ','; }
								}
								test = test + ']';
							}
							test = test + ']'
							console.log(test);
							return $.jqplot(item.getRealID(), series, configs);
						};
					
					_CHART = initChart(item, options);
					
					item.registerProperty({
						name: 'width',
						getter: function(){
							item.getContext().css('width');
						},
						setter: function(obj){
							item.getContext().css('width', obj);
						}
					});
					
					item.registerProperty({
						name: 'height',
						getter: function(){
							item.getContext().css('height');
						},
						setter: function(obj){
							item.getContext().css('height', obj);
						}
					});
					
					return HYWEBAPP.extend({
						 getChartInstance: function(){
						 	return _CHART;
						 },
						 
						 draw: function(){
						 	_CHART.draw();
						 },
						 
						 redraw: function(){
						 	_CHART.replot();
						 },
						 
						 destroy: function(){
						 	_CHART.destroy();
						 }
					},item);
				};
				
			return{
				chart: function(options){
					return new hychart(_ITEM, options);
				}
			};
			
		}());
		
		return HYWEBAPP.extend(_HYCHART,_ITEM);
	};
	
}(HYWEBAPP.ui));

if(!window.plugins) {
    window.plugins = {};
}
if (!window.plugins.flurry) {
    window.plugins.flurry = (function(){
        return {
            logEvent: function(eventName, params, timed){
                cordova.exec(null, null, "Flurry", "logEvent", [eventName, params, timed]);
            },
            endTimedEvent: function(eventName){
                cordova.exec(null, null, "Flurry", "endTimedEvent", [eventName]);
            }
        };
    }());
}

var categoryName = {
		"01": "表演活動",
		"02": "講座研習",
		"03": "競賽徵選",
		"04": "展覽導覽",
		"05": "其他活動"
	},
	domainURL = {
		domain: "http://vod2.taichung.gov.tw/",
		publicData: "http://vod2.taichung.gov.tw/public/Data/",
		publicAttachment: "http://vod2.taichung.gov.tw/public/Attachment/"
	};

function clone(a){
	var b = {};
	for(var i in a){
		b[i] = a[i];
	}
	return b;
}

document.addEventListener("deviceready", myDeviceReady, false);

function myDeviceReady() {
    if(checkPlatform()){
        ChildBrowser.install();
    } 
}

function checkPlatform() {
    devicePlatform = device.platform;
    if(devicePlatform.substring(0, 6) == "iPhone") {
        return true;
    }
    return false;
}

function makeDataArray(result){
	if(typeof result.length === "undefined"){
		var itemArray = [],
			item = result;
		itemArray.push(item);
		result = itemArray;
	}
	return result;
}

function parseURL(url){
	var obj = {};
	if(url){
		url = url.toLowerCase().replace(/&amp;/g,'&');
		var hash, hashes = url.slice(url.indexOf('?') + 1).split('&');
	    for(var i = 0; i < hashes.length; i++)
	    {
	        hash = hashes[i].split('=');
	        obj[hash[0]] = hash[1];
	    }
	}
	return obj;
}

function getArticleFieldValue(ar, fieldName){
	var result = "";
	for(var i in ar){
		if(ar[i].fieldName === fieldName){
			result =  ar[i].Value;
			return result;
		}
	}
	return result;
}

function parseTopCat(catStr){
	var result = "";
	if(catStr.indexOf("表演活動") !== -1){
		result = "01";
	}else if(catStr.indexOf("講座研習") !== -1){
		result = "02";
	}else if(catStr.indexOf("競賽徵選") !== -1){
		result = "03";
	}else if(catStr.indexOf("展覽導覽") !== -1){
		result = "04";
	}else if(catStr.indexOf("其他活動") !== -1){
		result = "05";
	}
	return result;
}

function openWebPage(url){
	var cb = window.plugins.childBrowser;
	cb.openExternal(url);
}

function showDirection(mapObj, location){
	//**For testing on emulator
	//var position = { coords : { latitude : "24.178948", longitude : "120.646931" } };
	//mapObj.closeInfoWindow();
	//mapObj.clear('markers');
	//mapObj.path(position.coords.latitude + ',' + position.coords.longitude, location);
	
	var destination = location;
	mapObj.closeInfoWindow();
	mapObj.clear('markers');
	HYWEBAPP.getPosition({
		success: function(position){
			mapObj.path(position.coords.latitude + ',' + position.coords.longitude, destination);
		},
		error: function(){
			navigator.notification.alert('無法取得GPS位置', null, "", "確認");
		}
	});
}

function toDateString(dateObj){
	var result = "", 
		month = dateObj.getMonth() + 1;
	result = result + dateObj.getFullYear() + "/" + month + "/" + dateObj.getDate();
	console.log('date: '+result);
	return result;
}

function saveToMyFavorite(title, url, option){
	var myfavor = (HYWEBAPP.getLocalStorage('myfavorites') === null)?{}:JSON.parse(HYWEBAPP.getLocalStorage('myfavorites'));
	myfavor[encodeURI(url)] = { "title": title, "path": url, "option": option };
	HYWEBAPP.setLocalStorage('myfavorites', JSON.stringify(myfavor));
	navigator.notification.alert('加入成功', null, "我的最愛", "確認");
}

function deleteFromMyFavorite(key){
	console.log('key: '+key);
	var myfavor = (HYWEBAPP.getLocalStorage('myfavorites') === null)?{}:JSON.parse(HYWEBAPP.getLocalStorage('myfavorites')), 
		deletedFavorites = {};
	for(var i in myfavor){
		if(i !== key){
			deletedFavorites[i] = myfavor[i];
		}
	}
	HYWEBAPP.setLocalStorage('myfavorites', JSON.stringify(deletedFavorites));
}

(function(obj){
	obj._RENDERS = {};
	obj.chart = function(item){
		
		var _ITEM = item,
			_HYCHART = (function(){	
				
				return{
					chart: function(options, renderName){
						return new obj._RENDERS[renderName](_ITEM, options);
					}
				};
				
			}());
		
		return HYWEBAPP.extend(_HYCHART,_ITEM);
	};
	
}(HYWEBAPP.ui));

(function(obj){

	var uiExtend = function(type, item){
		var _ITEM = item,
			_TYPE = type,
			uiCommons = {
				
				attr: function(attrName, obj){
					if(arguments.length === 1){
						return _ITEM.getContext().attr(attrName);	
					}
					var i,
	       				subArray = _ITEM.subscribers(attrName),
	       				subArraySize = subArray.length;
	       			if(typeof obj === "function"){
	       				obj({ 
	       					success: function(value){
	       						console.log("Set " + attrName + ": " + value);
	       						_ITEM.getContext().attr(attrName, value);
	       						if(typeof _ITEM.refresh !== "undefined"){
	       							console.log('Item Refresh!!');
	       							_ITEM.refresh();
	       						}
	       						for(i=0;i<subArraySize;i++){
	       							subArray[i].handler(value);
	       							if(subArray[i].type === 'once'){
	       								subArray.splice(i,1);
	       							}
	       						}
	       					} 
	       				});
	       				return;
	       			}
	       			console.log("Set " + attrName + ": " + obj);
	       			_ITEM.getContext().attr(attrName, obj);
	       			if(typeof _ITEM.refresh !== "undefined"){
	       				console.log('Item Refresh!!');
	       				_ITEM.refresh();
	       			}
	       			for(i=0;i<subArraySize;i++){
	       				subArray[i].handler(obj);
	       				if(subArray[i].type === 'once'){
	       					subArray.splice(i,1);
	       				}
	       			}  
				},
				
				text: function(obj){
					if(arguments.length === 0){
						return _ITEM.getContext().text();
					}
	       			if(typeof obj === "function"){
	       				obj({ 
	       					success: function(value){
	       						console.log("Set Label: " + value);
	       						_ITEM.getContext().text(value);
	       					} 
	       				});
	       				return;
	       			}
	       			console.log("Set Label : " + obj);
	       			_ITEM.getContext().text(obj);
				},
				
				label: function(obj){
					if(arguments.length === 0){
						return $('label[for="' + _ITEM.getRealID() + '"]').text();
					}
	       			if(typeof obj === "function"){
	       				obj({ 
	       					success: function(value){
	       						console.log("Set Label: " + value);
	       						$('label[for="' + _ITEM.getRealID() + '"]').text(value);
	       					} 
	       				});
	       				return;
	       			}
	       			console.log("Set Label : " + obj);
	       			$('label[for="' + _ITEM.getRealID() + '"]').text(obj);
				}
			},
			uiContexts = {
				text: function(){
					_ITEM.registerProperty({
						name: 'value',
						getter: function(){
							return uiCommons.attr('value');
						},
						setter: function(obj){
							uiCommons.attr('value', obj);
						}
					});
					
					_ITEM.registerProperty({
						name: 'label',
						getter: function(){
							return uiCommons.label();
						},
						setter: function(obj){
							uiCommons.label(obj);
						}
					});
					
					return this;
				},
				
				textarea: function(){
					_ITEM.registerProperty({
						name: 'label',
						getter: function(){
							return uiCommons.label();
						},
						setter: function(obj){
							uiCommons.label(obj);
						}
					});
					
					_ITEM.registerProperty({
						name: 'text',
						getter: function(){
							return uiCommons.text();
						},
						setter: function(obj){
							uiCommons.text(obj);
						}
					});
					
					return this;
				},
				
				toggle: function(){
					_ITEM.registerProperty({
						name: 'label',
						getter: function(){
							return uiCommons.label();
						},
						setter: function(obj){
							uiCommons.label(obj);
						}
					});
					
					_ITEM.registerProperty({
						name: 'off-display',
						getter: function(){
							return _ITEM.getContext().children('option[value="0"]').text();
						},
						setter: function(obj){
							_ITEM.getContext().children('option[value="0"]').text(obj);
						}
					});
					
					_ITEM.registerProperty({
						name: 'on-display',
						getter: function(){
							return _ITEM.getContext().children('option[value="1"]').text();
						},
						setter: function(obj){
							_ITEM.getContext().children('option[value="1"]').text(obj);
						}
					});
					
					_ITEM.registerProperty({
						name: 'value',
						getter: function(){
							return _ITEM.getContext().val();
						},
						setter: function(obj){
							_ITEM.getContext().val(obj);
						}
					});
					
					return this
				}, 
				
				password: function(){
					_ITEM.registerProperty({
						name: 'value',
						getter: function(){
							return uiCommons.attr('value');
						},
						setter: function(obj){
							uiCommons.attr('value', obj);
						}
					});
					
					_ITEM.registerProperty({
						name: 'label',
						getter: function(){
							return uiCommons.label();
						},
						setter: function(obj){
							uiCommons.label(obj);
						}
					});
					
					return this;
				},
				
				search: function(){
					_ITEM.registerProperty({
						name: 'value',
						getter: function(){
							return uiCommons.attr('value');
						},
						setter: function(obj){
							uiCommons.attr('value', obj);
						}
					});
					
					_ITEM.registerProperty({
						name: 'label',
						getter: function(){
							return uiCommons.label();
						},
						setter: function(obj){
							uiCommons.label(obj);
						}
					});
					
					return this;
				},
				
				slider: function(){
					_ITEM.registerProperty({
						name: 'label',
						getter: function(){
							return uiCommons.label();
						},
						setter: function(obj){
							uiCommons.label(obj);
						}
					});
					
					_ITEM.registerProperty({
						name: 'value',
						getter: function(){
							return uiCommons.attr('value');
						},
						setter: function(obj){
							uiCommons.attr('value', obj);
						}
					});
					
					_ITEM.registerProperty({
						name: 'step',
						getter: function(){
							return uiCommons.attr('step');
						},
						setter: function(obj){
							uiCommons.attr('step', obj);
						}
					});
					
					_ITEM.registerProperty({
						name: 'min',
						getter: function(){
							return uiCommons.attr('min');
						},
						setter: function(obj){
							uiCommons.attr('min', obj);
						}
					});
					
					_ITEM.registerProperty({
						name: 'max',
						getter: function(){
							return uiCommons.attr('max');
						},
						setter: function(obj){
							uiCommons.attr('max', obj);
						}
					});
					
					this.refresh = function(){
						_ITEM.getContext().slider('refresh');
					};
					
					return this;
				},
				
				image: function(){
					_ITEM.registerProperty({
						name: 'src',
						getter: function(){
							return uiCommons.attr('src');
						},
						setter: function(obj){
							uiCommons.attr('src', obj);
						}
					});
					
					return this;
				},
				
				submit: function(){
					_ITEM.registerProperty({
						name: 'display',
						getter: function(){
							return uiCommons.text();
						},
						setter: function(obj){
							uiCommons.text(obj);
						}
					});
					
					return this;
				},
				
				button: function(){
					_ITEM.registerProperty({
						name: 'display',
						getter: function(){
							return uiCommons.text();
						},
						setter: function(obj){
							uiCommons.text(obj);
						}
					});
					
					_ITEM.registerProperty({
						name: 'icon',
						getter: function(){
							return uiCommons.attr('data-icon');
						},
						setter: function(obj){
							uiCommons.attr('data-icon', obj);
						}
					});
					
					_ITEM.registerProperty({
						name: 'iconpos',
						getter: function(){
							return uiCommons.attr('data-iconpos');
						},
						setter: function(obj){
							uiCommons.attr('data-iconpos', obj);
						}
					});
					
					_ITEM.registerProperty({
						name: 'link',
						getter: function(){
							return uiCommons.attr('href');
						},
						setter: function(obj){
							uiCommons.attr('href', obj);
						}
					});
					
					return this;
				},
				
				select: function(){
					_ITEM.registerProperty({
						name: 'label',
						getter: function(){
							return uiCommons.label();
						},
						setter: function(obj){
							uiCommons.label(obj);
						}
					});
					
					_ITEM.registerProperty({
						name: 'selectedValue',
						getter: function(){
							return _ITEM.getContext().val();
						},
						setter: function(obj){
							var oriValue = _ITEM.getContext().val();
			       			_ITEM.getContext().val(obj);
			       			if(oriValue !== obj){
			       				_ITEM.getContext().trigger('change');
			       			}
						}
					});
					
					this.refresh = function(){
						_ITEM.getContext().selectmenu('refresh');
					};
					
					this.getItems = function(){
						return _ITEM.getContext().children('option');
					};
					
					return this;
				},
				
				radio: function(){
					_ITEM.registerProperty({
						name: 'label',
						getter: function(){
							return _ITEM.getContext().children('legend').text();
						},
						setter: function(obj){
							_ITEM.getContext().children('legend').text(obj);
						}
					});
					
					_ITEM.registerProperty({
						name: 'checkedValue',
						getter: function(){
							return $('input[name="' + _ITEM.getRealID() + '"]:checked').val();
						},
						setter: function(obj){
							var checkItem = $('input[name="' + _ITEM.getRealID() + '"][value="' + obj + '"]'); 
							checkItem.attr('checked',true);
							$('input[name="' + _ITEM.getRealID() + '"]').each(function(){
								var label = $('label[for="' + $(this).attr('id') + '"]').removeClass('ui-btn-active');
							});
							$('label[for="' + checkItem.attr('id') + '"]').addClass('ui-btn-active');
						}
					});
				
					this.refresh = function(){
						_ITEM.getContext().trigger("create");
					};
					
					this.getItems = function(){
						return _ITEM.getContext().children('input[type="radio"]');
					};
					
					return this;
				},
				
				checkbox: function(){
					_ITEM.registerProperty({
						name: 'label',
						getter: function(){
							return _ITEM.getContext().children('legend').text();
						},
						setter: function(obj){
							_ITEM.getContext().children('legend').text(obj);
						}
					});
					
					_ITEM.registerProperty({
						name: 'checkedValue',
						getter: function(){
							var i,
								result = [];
							$('input[type="checkbox"][name="' + _ITEM.getRealID() + '"]:checked').each(function(){
								result.push($(this).val());
							});
							return result;
						},
						setter: function(obj){
							var item = $('input[type="checkbox"][value="' + obj + '"]');
							item.attr('checked',true);
							$('label[for="' + item.attr('id') + '"]').removeClass('ui-checkbox-off');
							$('label[for="' + item.attr('id') + '"]').addClass('ui-checkbox-on');
							$('label[for="' + item.attr('id') + '"] .ui-btn-inner .ui-icon').removeClass('ui-icon-checkbox-off');
							$('label[for="' + item.attr('id') + '"] .ui-btn-inner .ui-icon').addClass('ui-icon-checkbox-on');
						}
					});
				
					this.refresh = function(){
						var pageid = _ITEM.getRealID().substring(0, _ITEM.getRealID().indexOf('_'));
						HYWEBAPP.page(pageid).getContext().trigger("create");
					};
					
					this.clear = function(){
						$('input[type="checkbox"][name="' + _ITEM.getRealID() + '"]').each(function(){
							$(this).attr('checked', false);
							$('label[for="' + $(this).attr('id') + '"]').removeClass('ui-checkbox-on');
							$('label[for="' + $(this).attr('id') + '"]').addClass('ui-checkbox-off');
							$('label[for="' + $(this).attr('id') + '"] .ui-btn-inner .ui-icon').removeClass('ui-icon-checkbox-on');
							$('label[for="' + $(this).attr('id') + '"] .ui-btn-inner .ui-icon').addClass('ui-icon-checkbox-off');
						});
					};
					
					this.selectAll = function(){
						$('input[type="checkbox"][name="' + _ITEM.getRealID() + '"]').each(function(){
							$(this).attr('checked', true);
							$('label[for="' + $(this).attr('id') + '"]').removeClass('ui-checkbox-off');
							$('label[for="' + $(this).attr('id') + '"]').addClass('ui-checkbox-on');
							$('label[for="' + $(this).attr('id') + '"] .ui-btn-inner .ui-icon').removeClass('ui-icon-checkbox-off');
							$('label[for="' + $(this).attr('id') + '"] .ui-btn-inner .ui-icon').addClass('ui-icon-checkbox-on');
						});
					};
					
					this.getItems = function(){
						return _ITEM.getContext().children('input[type="checkbox"]');
					};
					
					return this;
				},
				
				carousel: function(){
					return this;
				},
				
				scroller: function(){
					_ITEM.registerProperty({
						name: 'value',
						getter: function(){
							return _ITEM.getContext().val();
						},
						setter: function(obj){
							_ITEM.getContext().val(obj);
						}
					});
					
					_ITEM.registerProperty({
						name: 'label',
						getter: function(){
							return uiCommons.label();
						},
						setter: function(obj){
							uiCommons.label(obj);
						}
					});
				
					return this;
				},
				
				datepicker: function(){
					_ITEM.registerProperty({
						name: 'mode',
						getter: function(){
							var datepickerMode = _ITEM.getContext().data('datebox').options.mode,
								result = "";
							if(datepickerMode === "calbox"){
								result = "calendar";
							}else if(datepickerMode === "datebox"){
								result = "date";
							}else if(datepickerMode === "flipbox"){
								result = "flip";
							}else if(datepickerMode === "slidebox"){
								result = "slide";
							}else if(datepickerMode === "timebox"){
								result = "time";
							}else if(datepickerMode === "timeflipbox"){
								result = "timeflip";
							}else if(datepickerMode === "durationbox"){
								result = "duration";
							}
							return result;
						},
						setter: function(obj){
							var datepickerMode = ''; 
							if(typeof obj === "function"){
			       				obj({ 
			       					success: function(value){
			       						if(value === "calendar"){
											datepickerMode = "calbox";
										}else if(value === "date"){
											datepickerMode = "datebox";
										}else if(value === "flip"){
											datepickerMode = "flipbox";
										}else if(value === "slide"){
											datepickerMode = "slidebox";
										}else if(value === "time"){
											datepickerMode = "timebox";
										}else if(value === "timeflip"){
											datepickerMode = "timeflipbox";
										}else if(value === "duration"){
											datepickerMode = "durationbox";
										}
			       						_ITEM.getContext().data('datebox').options.mode = datepickerMode;
			       					} 
			       				});
			       				return;
			       			}
			       			if(obj === "calendar"){
								datepickerMode = "calbox";
							}else if(obj === "date"){
								datepickerMode = "datebox";
							}else if(obj === "flip"){
								datepickerMode = "flipbox";
							}else if(obj === "slide"){
								datepickerMode = "slidebox";
							}else if(obj === "time"){
								datepickerMode = "timebox";
							}else if(obj === "timeflip"){
								datepickerMode = "timeflipbox";
							}else if(obj === "duration"){
								datepickerMode = "durationbox";
							}
			       			_ITEM.getContext().data('datebox').options.mode = datepickerMode;
						}
					});
					
					_ITEM.registerProperty({
						name: 'before-today',
						getter: function(){
							return _ITEM.getContext().data('datebox').options.beforeToday;
						},
						setter: function(obj){
							if(typeof obj === "function"){
			       				obj({ 
			       					success: function(value){
			       						_ITEM.getContext().data('datebox').options.beforeToday = value;
			       					} 
			       				});
			       				return;
			       			}
			       			_ITEM.getContext().data('datebox').options.beforeToday = obj;
						}
					});
					
					_ITEM.registerProperty({
						name: 'after-today',
						getter: function(){
							return _ITEM.getContext().data('datebox').options.afterToday;
						},
						setter: function(obj){
							if(typeof obj === "function"){
			       				obj({ 
			       					success: function(value){
			       						_ITEM.getContext().data('datebox').options.afterToday = value;
			       					} 
			       				});
			       				return;
			       			}
			       			_ITEM.getContext().data('datebox').options.afterToday = obj;
						}
					});
					
					_ITEM.registerProperty({
						name: 'not-today',
						getter: function(){
							return _ITEM.getContext().data('datebox').options.notToday;
						},
						setter: function(obj){
							if(typeof obj === "function"){
			       				obj({ 
			       					success: function(value){
			       						_ITEM.getContext().data('datebox').options.notToday = value;
			       					} 
			       				});
			       				return;
			       			}
			       			_ITEM.getContext().data('datebox').options.notToday = obj;
						}
					});
					
					_ITEM.registerProperty({
						name: 'min-days',
						getter: function(){
							return _ITEM.getContext().data('datebox').options.minDays;
						},
						setter: function(obj){
							if(typeof obj === "function"){
			       				obj({ 
			       					success: function(value){
			       						_ITEM.getContext().data('datebox').options.minDays = parseInt(value,10);
			       					} 
			       				});
			       				return;
			       			}
			       			_ITEM.getContext().data('datebox').options.minDays = parseInt(obj,10);
						}
					});
					
					_ITEM.registerProperty({
						name: 'max-days',
						getter: function(){
							return _ITEM.getContext().data('datebox').options.maxDays;
						},
						setter: function(obj){
							if(typeof obj === "function"){
			       				obj({ 
			       					success: function(value){
			       						_ITEM.getContext().data('datebox').options.maxDays = parseInt(value,10);
			       					} 
			       				});
			       				return;
			       			}
			       			_ITEM.getContext().data('datebox').options.maxDays = parseInt(obj,10);
						}
					});
					
					_ITEM.registerProperty({
						name: 'min-hour',
						getter: function(){
							return _ITEM.getContext().data('datebox').options.minHour;
						},
						setter: function(obj){
							if(typeof obj === "function"){
			       				obj({ 
			       					success: function(value){
			       						_ITEM.getContext().data('datebox').options.minHour = parseInt(value,10);
			       					} 
			       				});
			       				return;
			       			}
			       			_ITEM.getContext().data('datebox').options.minHour = parseInt(obj,10);
						}
					});
					
					_ITEM.registerProperty({
						name: 'max-hour',
						getter: function(){
							return _ITEM.getContext().data('datebox').options.maxHour;
						},
						setter: function(obj){
							if(typeof obj === "function"){
			       				obj({ 
			       					success: function(value){
			       						_ITEM.getContext().data('datebox').options.maxHour = parseInt(value,10);
			       					} 
			       				});
			       				return;
			       			}
			       			_ITEM.getContext().data('datebox').options.maxHour = parseInt(obj,10);
						}
					});
					
					_ITEM.registerProperty({
						name: 'show-clear',
						getter: function(){
							return _ITEM.getContext().data('datebox').options.useClearButton;
						},
						setter: function(obj){
							if(typeof obj === "function"){
			       				obj({ 
			       					success: function(value){
			       						_ITEM.getContext().data('datebox').options.useClearButton = value;
			       					} 
			       				});
			       				return;
			       			}
			       			_ITEM.getContext().data('datebox').options.useClearButton = obj;
						}
					});
					
					_ITEM.registerProperty({
						name: 'modal-popup',
						getter: function(){
							return _ITEM.getContext().data('datebox').options.dialogForce;
						},
						setter: function(obj){
							if(typeof obj === "function"){
			       				obj({ 
			       					success: function(value){
			       						_ITEM.getContext().data('datebox').options.dialogForce = value;
			       					} 
			       				});
			       				return;
			       			}
			       			_ITEM.getContext().data('datebox').options.dialogForce = obj;
						}
					});
					
					_ITEM.registerProperty({
						name: 'inline',
						getter: function(){
							return _ITEM.getContext().data('datebox').options.useInline;
						},
						setter: function(obj){
							if(typeof obj === "function"){
			       				obj({ 
			       					success: function(value){
			       						_ITEM.getContext().data('datebox').options.useInline = value;
			       						if(value === true){
						       				_ITEM.getContext().data('datebox').options.useImmediate = true;
						       				_ITEM.getContext().data('datebox').options.hideInput = true;
						       			}
			       					} 
			       				});
			       				return;
			       			}
			       			_ITEM.getContext().data('datebox').options.useInline = obj;
			       			if(obj === true){
			       				_ITEM.getContext().data('datebox').options.useImmediate = true;
			       				_ITEM.getContext().data('datebox').options.hideInput = true;
			       			}
						}
					});
					
					_ITEM.registerProperty({
						name: 'trigger',
						getter: function(){
							var isButton = _ITEM.getContext().data('datebox').options.useButton,
								isFocus = _ITEM.getContext().data('datebox').options.useFocus;
							if(isButton === true && isFocus === false){
								return "button";
							}
							if(isButton === false && isFocus === true){
								return "focus";
							}
							if(isButton === true && isFocus === true){
								return "both";
							}
						},
						setter: function(obj){
							if(typeof obj === "function"){
			       				obj({ 
			       					success: function(value){
			       						if(value === "button"){
						       				_ITEM.getContext().data('datebox').options.useButton = true;
						       				_ITEM.getContext().data('datebox').options.useFocus = false;
						       			}else if(value === "focus"){
						       				_ITEM.getContext().data('datebox').options.useButton = false;
						       				_ITEM.getContext().data('datebox').options.useFocus = true;
						       			}else if(value === "both"){
						       				_ITEM.getContext().data('datebox').options.useButton = true;
						       				_ITEM.getContext().data('datebox').options.useFocus = true;
						       			}
			       					} 
			       				});
			       				return;
			       			}
			       			if(obj === "button"){
			       				_ITEM.getContext().data('datebox').options.useButton = true;
			       				_ITEM.getContext().data('datebox').options.useFocus = false;
			       			}else if(obj === "focus"){
			       				_ITEM.getContext().data('datebox').options.useButton = false;
			       				_ITEM.getContext().data('datebox').options.useFocus = true;
			       			}else if(obj === "both"){
			       				_ITEM.getContext().data('datebox').options.useButton = true;
			       				_ITEM.getContext().data('datebox').options.useFocus = true;
			       			}
						}
					});
					
					this.getBlobkDates = function(){
						return (typeof _ITEM.getContext().data('datebox').options.blackDates === "undefined")?[]:_ITEM.getContext().data('datebox').options.blackDates;
					};
					
					this.getHighlightDates = function(){
						return (typeof _ITEM.getContext().data('datebox').options.highDates === "undefined")?[]:_ITEM.getContext().data('datebox').options.highDates;
					};
					
					this.refresh = function(){
						_ITEM.getContext().datebox('refresh');
					};
					
					return this;
				},
				
				accordion: function(){
					_ITEM.registerProperty({
						name: 'label',
						getter: function(){
							return uiCommons.label();
						},
						setter: function(obj){
							uiCommons.label(obj);
						}
					});
				
					this.getItems = function(){
						return _ITEM.getContext().children('div[data-role="collapsible"]');
					};
					
					return this;
				},
				
				photoviewer: function(){
					this.init = function(options){
						$('#' + _ITEM.getRealID() + ' li a').photoSwipe(options);
					};
					
					this.clear = function(){
						$('#' + _ITEM.getRealID() + ' li').remove();
					};
					
					return this;
				},
				
				list: function(){
					_ITEM.registerProperty({
						name: 'label',
						getter: function(){
							return uiCommons.label();
						},
						setter: function(obj){
							uiCommons.label(obj);
						}
					});
					
					this.getItems = function(){
						return _ITEM.getContext().children('li');
					};
					
					this.count = function(){
						var count = 0;
						_ITEM.getContext().children('li').each(function(){
							count++;
						});
						return count;
					};
					
					this.refresh = function(){
						_ITEM.getContext().listview("refresh");
					};
					
					this.removeSwipeButton = function(){
						$('.aSwipeBtn').animate({ width: 'toggle' }, 200, function(e) {
							$(this).remove();
						});
					};
					
					return this;
				},
				
				map: function(){
					_ITEM.registerProperty({
						name: 'width',
						getter: function(){
							_ITEM.getContext().css('width');
						},
						setter: function(obj){
							_ITEM.getContext().css('width', obj);
						}
					});
					
					_ITEM.registerProperty({
						name: 'height',
						getter: function(){
							_ITEM.getContext().css('height');
						},
						setter: function(obj){
							_ITEM.getContext().css('height', obj);
						}
					});
					
					this.option = function(optionName, optionValue){
						if(typeof optionValue === "function"){
		       				optionValue({ 
		       					success: function(value){
		       						_ITEM.getContext().gmap('option', optionName, value);
		       					} 
		       				});
		       				return;
		       			}
		       			_ITEM.getContext().gmap('option', optionName, optionValue);
					};
					
					this.closeInfoWindow = function(){
						_ITEM.getContext().gmap('closeInfoWindow');
					};
					
					this.clear = function(objName){
						_ITEM.getContext().gmap('clear', objName);
					};
					
					this.refresh = function(){
						_ITEM.getContext().gmap('refresh');
					};
					
					this.search = function(address, callback){
						if(typeof address === "function"){
		       				address({ 
		       					success: function(value){
		       						_ITEM.getContext().gmap('search', { 'address': value }, function(results, status) {
							        	if ( status === 'OK' ) {
							        		console.log(results[0].geometry.location.toString());
							        		if(callback){
							        			callback(results);
							       			}else{
							            		_ITEM.getContext().gmap('addMarker', {'position': results[0].geometry.location, 'bounds': true});
							            		_ITEM.getContext().gmap('option', 'zoom', 15);
							            		_ITEM.getContext().gmap('option', 'center', results[0].geometry.location);
							       			}
							            }
									});
		       					} 
		       				});
		       				return;
		       			}
						_ITEM.getContext().gmap('search', { 'address': address }, function(results, status) {
				        	if ( status === 'OK' ) {
				        		console.log(results[0].geometry.location.toString());
				        		if(callback){
				        			callback(results);
				       			}else{
				       				_ITEM.getContext().gmap('addMarker', {'position': results[0].geometry.location, 'bounds': true});
				            		_ITEM.getContext().gmap('option', 'zoom', 15);
				            		_ITEM.getContext().gmap('option', 'center', results[0].geometry.location);
				       			}
				            }
						});
					};
					
					this.path = function(pathStart, pathEnd){
						var origin, destination;
						if(typeof pathStart === "function"){
		       				pathStart({ 
		       					success: function(originValue){
		       						origin = originValue;
		       						if(typeof pathEnd === "function"){
		       							pathEnd({
		       								success: function(destinationValue){
		       									destination = destinationValue;
		       									_ITEM.getContext().gmap('displayDirections', {'origin': origin, 'destination': destination, 'travelMode': 'DRIVING'});
		       								}
		       							});
		       							return;
		       						}else{
		       							destination = pathEnd;
		       							_ITEM.getContext().gmap('displayDirections', {'origin': origin, 'destination': destination, 'travelMode': 'DRIVING'});
		       						}
		       					} 
		       				});
		       				return;
		       			}else{
		       				origin = pathStart;
		       				if(typeof pathEnd === "function"){
       							pathEnd({
       								success: function(destinationValue){
       									destination = destinationValue;
       									_ITEM.getContext().gmap('displayDirections', {'origin': origin, 'destination': destination, 'travelMode': 'DRIVING'});
       								}
       							});
       							return;
       						}else{
       							destination = pathEnd;
       							_ITEM.getContext().gmap('displayDirections', {'origin': origin, 'destination': destination, 'travelMode': 'DRIVING'});
       						}
		       			}
					};
					
					this.marker = function(location){
						if(typeof location === "function"){
		       				location({ 
		       					success: function(value){
		       						_ITEM.getContext().gmap('addMarker', {'position': value, 'bounds': true});
		       					} 
		       				});
		       				return;
		       			}
						_ITEM.getContext().gmap('addMarker', {'position': location, 'bounds': true});
					};
					
					return this;
				}
			};
		console.log("type: "+_TYPE);
		console.log("type of context: " +  typeof uiContexts[_TYPE]);	
		return HYWEBAPP.extend(uiContexts[_TYPE](), _ITEM);
	};
		
	obj.ui = {
		text: function(item){
			return uiExtend('text', item);
		},
		
		button: function(item){
			return uiExtend('button', item);
		},
		
		textarea: function(item){
			return uiExtend('textarea', item);
		},
		
		password: function(item){
			return uiExtend('password', item);
		},
		
		search: function(item){
			return uiExtend('search', item);
		},
		
		slider: function(item){
			return uiExtend('slider', item);
		},
		
		toggle: function(item){
			return uiExtend('toggle', item);
		},
		
		image: function(item){
			return uiExtend('image', item);
		},
		
		map: function(item){
			return uiExtend('map', item);
		},
		
		datepicker: function(item){
			return uiExtend('datepicker', item);
		},
		
		scroller: function(item){
			return uiExtend('scroller', item);
		},
		
		carousel: function(item){
			return uiExtend('carousel', item);
		},
		
		photoviewer: function(item){
			return uiExtend('photoviewer', item);
		},
		
		list: function(item){
			return uiExtend('list', item);
		},
		
		select: function(item){
			return uiExtend('select', item);
		},
		
		checkbox: function(item){
			return uiExtend('checkbox', item);
		},
		
		radio: function(item){
			return uiExtend('radio', item);
		},
		
		accordion: function(item){
			return uiExtend('accordion', item);
		},
		
		submit: function(item){
			return uiExtend('submit', item);
		}
	};
	
}(HYWEBAPP));

$(document).on("pageinit",":jqmData(role='page')", function(){
	
	//add by Wei for fixing the bug when the slidemenu is opened and user clicks the physic back button
	document.addEventListener("backbutton", function(e){
		$(":jqmData(slidemenu)").each(function(){
			var smb = $(this);
			var sm = $(smb.data('slidemenu'));
			var smw = $(smb.data('slidemenu')+"_wrapper");
			if(smb.data('slideopen')){
				slidemenu(sm, smb, smw, only_close);
			}
		});
	}, false);
	
	$(":jqmData(slidemenu)").each(function(){
		var smb = $(this);
		smb.addClass('slidemenu_btn');
		var sm = $(smb.data('slidemenu'));
		sm.addClass('slidemenu');
		var smw = $(smb.data('slidemenu')+"_wrapper");
		smw.addClass('slidemenu-wrapper');
		var scroller;
		
		if(smb.data('swipetrigger') === "true"){
			smb.parent(":jqmData(role='header')").parent(":jqmData(role='page')").on("swipeleft", function(event){
				event.stopImmediatePropagation();
				only_close = true;
				slidemenu(sm, smb, smw, only_close);
			});
			
			smb.parent(":jqmData(role='header')").parent(":jqmData(role='page')").on("swiperight", function(event){
				event.stopImmediatePropagation();
				slidemenu(sm, smb, smw);
			});
		}
		
		smb.on("click", function(event) {
			event.stopImmediatePropagation();
			slidemenu(sm, smb, smw);
			if(typeof scroller === "undefined") { scroller = new iScroll(sm.attr('id')); }
		});
		
	});
	
	$(document).on("click", "a:not(:jqmData(slidemenu))", function(e) {
		var smb = $(".ui-page-active").children(":jqmData(role='header')").first().children(".slidemenu_btn").first();
		var sm = $(smb.data('slidemenu'));
		var smw = $(smb.data('slidemenu') + "_wrapper");
		only_close = true;
		slidemenu(sm, smb, smw, only_close);
	});

	/*
	$(window).on('resize', function(){
		if ($(".ui-page-active").children(":jqmData(role='header')").first().children(":jqmData(slidemenu)").first().data('slideopen')) {
			var sm = $($(".ui-page-active").children(":jqmData(role='header')").first().children(":jqmData(slidemenu)").first().data('slidemenu'));
			var smw = $($(".ui-page-active").children(":jqmData(role='header')").first().children(":jqmData(slidemenu)").first().data('slidemenu') + "_wrapper");
			var w = '240px';

			sm.css('width', w);
			sm.height(viewport().height);

			$(".ui-page-active").css('left', w);
		}

	});
	*/

});

function slidemenu(sm, context, smw, only_close) {

	sm.height(viewport().height);
	if (!context.data('slideopen') && !only_close) {
		//add by Wei for fixing the slidemenu position bug when content scroll down and the header position is fixed 
		var top = $(".ui-page-active").children(":jqmData(role='header')").first().offset().top;
		sm.css('top', top + 'px');
		
		sm.show();
		var w = '240px';
		//sm.animate({width: w, avoidTransforms: false, useTranslate3d: true}, 'fast');
		//modified by Wei, to fix the animation bug after click the carousel image
		sm.css('width', w);
		$(".ui-page-active").css('left', w);
		context.data('slideopen', true);
		
		if ($(".ui-page-active").children(":jqmData(role='header')").first().data('position') === 'fixed') {
			context.css('margin-left', parseInt(w.split('px')[0]) + 10 + 'px');
			//add by Wei to hide the other buttons in header for avoiding buttons overlap problem
			$(".ui-page-active").children(":jqmData(role='header')").first().children('a').not('.slidemenu_btn').hide();
			$(".ui-page-active").children(":jqmData(role='header')").first().children('.ui-title').css('opacity', '0');
		} else {
			context.css('margin-left', '10px');
		}

	} else {
		var w = '0px';
		//sm.animate({width: w, avoidTransforms: false, useTranslate3d: true}, 'fast', function(){sm.hide()});
		//modified by Wei, to fix the animation bug after click the carousel image
		sm.css('width', w);
		sm.hide();
		$(".ui-page-active").css('left', w);
		context.data('slideopen', false);
		context.css('margin-left', '0px');
		//add by Wei to show the other buttons in header for avoiding buttons overlap problem
		$(".ui-page-active").children(":jqmData(role='header')").first().children('a').not('.slidemenu_btn').show();
		$(".ui-page-active").children(":jqmData(role='header')").first().children('.ui-title').css('opacity', '1');
	}
}

function viewport(){
	var e = window;
	var a = 'inner';
	if (!('innerWidth' in window)) {
		a = 'client';
		e = document.documentElement || document.body;
	}
	return { width : e[ a+'Width' ] , height : e[ a+'Height' ] };
}


(function(obj){
	
	obj.grid = function(item){
		
		var _ITEM = item,
			_HYGRID = (function(){
			
				var hygrid = function(item, options){
					var hCols = (typeof options.displayHorizontalColumns !== "undefined")?options.displayHorizontalColumns:options.displayColumns;
					options.pages = dataPager(options.fields, options.displayColumns);
					options.hpages = dataPager(options.fields, hCols);
					console.log('pages: '+JSON.stringify(options.pages));
					console.log('hpages: '+JSON.stringify(options.hpages));
					console.log(options);
					var _GRID,
						_BULLETS = '',
						_HBULLETS = '',
						_CONTAINER = options.container,
						_PER_PAGE_COLS = options.displayColumns,
						_PER_HPAGE_COLS = hCols,
						_PAGES = options.pages,
						_HPAGES = options.hpages,
						_PAGE_INDEX = 0,
						_NOMORE_PAGE = (options.noMorePage)?options.noMorePage:function(){},
						_SCROLL;
						
					options.fields = ($(window).width() < $(window).height())?adjustFieldsWidth(_PAGES[_PAGE_INDEX]):adjustFieldsWidth(_HPAGES[_PAGE_INDEX]);
					_GRID = dhx.ui(options);
					
					if(_PAGES.length > 1){
						for(var i=0;i<_PAGES.length;i++){
							var className = (i === 0)?'grid-active':'';
							_BULLETS = _BULLETS + '<li><a class="' + className + '">' + i + '</a></li>'
						}
					}
					
					if(_HPAGES.length > 1){
						for(var i=0;i<_HPAGES.length;i++){
							var className = (i === 0)?'grid-active':'';
							_HBULLETS = _HBULLETS + '<li><a class="' + className + '">' + i + '</a></li>'
						}
					}
					
					if($(window).width() < $(window).height()){
						item.getContext().before('<ol id="' + item.getRealID() + '_bullets" class="grid-control-nav grid-control-paging">' + _BULLETS + '</ol>');
					}else{
						item.getContext().before('<ol id="' + item.getRealID() + '_bullets" class="grid-control-nav grid-control-paging">' + _HBULLETS + '</ol>');
					}
					
					$('#'+_CONTAINER+' .datagrid-view2 .datagrid-body').attr('id', _CONTAINER+'_right_body');
					$('#'+_CONTAINER+' .datagrid-view2 .datagrid-header').attr('id', _CONTAINER+'_right_header');
					
					item.registerProperty({
						name: 'width',
						getter: function(){
							item.getContext().css('width');
						},
						setter: function(obj){
							item.getContext().css('width', obj);
						}
					});
					
					item.registerProperty({
						name: 'height',
						getter: function(){
							item.getContext().css('height');
						},
						setter: function(obj){
							item.getContext().css('height', obj);
						}
					});
					
					return HYWEBAPP.extend({
						 getGridInstance: function(){
						 	return _GRID;
						 },
						 
						 getBullets: function(){
						 	return $('#' + item.getRealID() + '_bullets');
						 },
						 
						 refresh: function(resetScroll){
						 	_GRID.refresh();
						 	if(resetScroll !== false){
						 		if(typeof _SCROLL !== "undefined"){ _SCROLL.destroy(); _SCROLL = null; }
					            _SCROLL = new iScroll4Grid(_CONTAINER,{
					    			useTransition:true,
					    			bounceLock: true, //當內容少於滾動是否有反彈效果
					    			momentum: true, //動量效果
					    			lockDirection: true,
					    			hScrollbar:false,
					    			vScrollbar:false,
					    			hScroll: false,
					    			y: 0,
					    			bounce: false //是否超過實際位置反彈
					    		});
						 	}
						 },
						 
						 scrollToElement: function(el, time){
						 	_SCROLL.scrollToElement(el, time);
						 	_SCROLL.refresh();
						 },
						 
						 scrollTo: function(x, y, time, relative){
						 	_SCROLL.scrollTo(x, y, time, relative);
						 	_SCROLL.refresh();
						 },
						 
						 destroy: function(){
						 	_GRID.destructor();
						 },
						 
						 clear: function(){
						 	$('#' + item.getRealID() + '_bullets').remove();
						 	item.getContext().empty();
						 },
						 
						 adjustPage: function(){
						 	$('#' + item.getRealID() + '_bullets li a.grid-active').removeClass('grid-active');
						 	_PAGE_INDEX = 0;
						 	if($(window).width() < $(window).height()){
						 		$('#' + item.getRealID() + '_bullets').html(_BULLETS);
						 		_GRID.define('fields', adjustFieldsWidth(_PAGES[_PAGE_INDEX]));
						 	}else{
						 		$('#' + item.getRealID() + '_bullets').html(_HBULLETS);
						 		_GRID.define('fields', adjustFieldsWidth(_HPAGES[_PAGE_INDEX]));
						 	}
						 	$('#' + item.getRealID() + '_bullets li a').eq(_PAGE_INDEX).addClass('grid-active');
						 },
						 
						 nextPage: function(){
						 	if($(window).width() < $(window).height()){
						 		if(_PAGES[_PAGE_INDEX + 1]){
							 		$('#' + item.getRealID() + '_bullets li a.grid-active').removeClass('grid-active');
							 		_PAGE_INDEX = _PAGE_INDEX + 1;
							 		_GRID.define('fields', adjustFieldsWidth(_PAGES[_PAGE_INDEX]));
							 		$('#' + item.getRealID() + '_bullets li a').eq(_PAGE_INDEX).addClass('grid-active');
							 	}else{
							 		_NOMORE_PAGE();
							 	}
						 	}else{
						 		if(_HPAGES[_PAGE_INDEX + 1]){
							 		$('#' + item.getRealID() + '_bullets li a.grid-active').removeClass('grid-active');
							 		_PAGE_INDEX = _PAGE_INDEX + 1;
							 		_GRID.define('fields', adjustFieldsWidth(_HPAGES[_PAGE_INDEX]));
							 		$('#' + item.getRealID() + '_bullets li a').eq(_PAGE_INDEX).addClass('grid-active');
							 	}else{
							 		_NOMORE_PAGE();
							 	}
						 	}
						 },
						 
						 prevPage: function(){
						 	if($(window).width() < $(window).height()){
						 		if(_PAGE_INDEX - 1 >= 0){
							 		$('#' + item.getRealID() + '_bullets li a.grid-active').removeClass('grid-active');
							 		_PAGE_INDEX = _PAGE_INDEX - 1;
							 		_GRID.define('fields', adjustFieldsWidth(_PAGES[_PAGE_INDEX]));
							 		$('#' + item.getRealID() + '_bullets li a').eq(_PAGE_INDEX).addClass('grid-active');
							 	}else{
							 		_NOMORE_PAGE();
							 	}
						 	}else{
						 		if(_PAGE_INDEX - 1 >= 0){
							 		$('#' + item.getRealID() + '_bullets li a.grid-active').removeClass('grid-active');
							 		_PAGE_INDEX = _PAGE_INDEX - 1;
							 		_GRID.define('fields', adjustFieldsWidth(_HPAGES[_PAGE_INDEX]));
							 		$('#' + item.getRealID() + '_bullets li a').eq(_PAGE_INDEX).addClass('grid-active');
							 	}else{
							 		_NOMORE_PAGE();
							 	}
						 	}
						 },
						 
						 setPage: function(index){
						 	if($(window).width() < $(window).height()){
						 		if(_PAGES[index]){
									$('#' + item.getRealID() + '_bullets li a.grid-active').removeClass('grid-active');
									_PAGE_INDEX = index;
									_GRID.define('fields', adjustFieldsWidth(_PAGES[_PAGE_INDEX]));
									$('#' + item.getRealID() + '_bullets li a').eq(_PAGE_INDEX).addClass('grid-active');
								}
						 	}else{
						 		if(_HPAGES[index]){
									$('#' + item.getRealID() + '_bullets li a.grid-active').removeClass('grid-active');
									_PAGE_INDEX = index;
									_GRID.define('fields', adjustFieldsWidth(_HPAGES[_PAGE_INDEX]));
									$('#' + item.getRealID() + '_bullets li a').eq(_PAGE_INDEX).addClass('grid-active');
								}
						 	}
						 },
						 
						 define: function(name, value){
						 	_GRID.define(name, value);
						 },
						 
						 adjust: function(){
						 	_GRID.adjust();
						 },
						 
						 attachEvent: function(name, callback, id){
						 	_GRID.attachEvent(name, callback, id);
						 },
						 
						 detachEvent: function(id){
						 	_GRID.detachEvent(id);
						 },
						 
						 getItemID: function(num){
						 	var id = _ITEM.getRealID(),
						 		item = $('#'+id+" .dhx_grid .dhx_grid_body .dhx_scroll_cont .dhx_grid_row:nth-child("+num+")");
						 	return item.attr('dhx_f_id');
						 },
						 
						 showItem: function(id){
						 	_GRID.showItem(id);
						 }
					},item);
				};
				
				return{
					grid: function(options){
						return new hygrid(_ITEM, options);
					}
				};
			
			}());
		
		return HYWEBAPP.extend(_HYGRID,_ITEM);
	};
	
}(HYWEBAPP.ui));

var screenOrientation = function() {}

screenOrientation.prototype.set = function(str, success, fail) {
    PhoneGap.exec(success, fail, "ScreenOrientation", "set", [str]);
};
navigator.screenOrientation = new screenOrientation();


/*
jquery.animate-enhanced plugin v0.91
---
http://github.com/benbarnett/jQuery-Animate-Enhanced
http://benbarnett.net
@benpbarnett
*/
(function(d,B,C){function G(a,b,h,c){if("d"!=h){var f=H.exec(b),e="auto"===a.css(h)?0:a.css(h),e="string"==typeof e?x(e):e;"string"==typeof b&&x(b);var c=!0===c?0:e,d=a.is(":hidden"),i=a.translation();"left"==h&&(c=parseInt(e,10)+i.x);"right"==h&&(c=parseInt(e,10)+i.x);"top"==h&&(c=parseInt(e,10)+i.y);"bottom"==h&&(c=parseInt(e,10)+i.y);!f&&"show"==b?(c=1,d&&a.css({display:"block",opacity:0})):!f&&"hide"==b&&(c=0);return f?(a=parseFloat(f[2]),f[1]&&(a=("-="===f[1]?-1:1)*a+parseInt(c,10)),a):c}}function I(a,
b,h,c,f,e,g,i){var j=a.data(q),j=j&&!u(j)?j:d.extend(!0,{},J),n=f;if(-1<d.inArray(b,y)){var o=j.meta,m=x(a.css(b))||0,l=b+"_o",n=f-m;o[b]=n;o[l]="auto"==a.css(b)?0+n:m+n||0;j.meta=o;g&&0===n&&(n=0-o[l],o[b]=n,o[l]=0)}return a.data(q,K(a,j,b,h,c,n,e,g,i))}function K(a,b,d,c,f,e,g,i,j){var n=!1,g=!0===g&&!0===i,b=b||{};b.original||(b.original={},n=!0);b.properties=b.properties||{};b.secondary=b.secondary||{};for(var i=b.meta,o=b.original,m=b.properties,q=b.secondary,p=l.length-1;0<=p;p--){var k=l[p]+
"transition-property",r=l[p]+"transition-duration",s=l[p]+"transition-timing-function",d=g?l[p]+"transform":d;n&&(o[k]=a.css(k)||"",o[r]=a.css(r)||"",o[s]=a.css(s)||"");q[d]=g?(!0===j||!0===z&&!1!==j)&&D?"translate3d("+i.left+"px, "+i.top+"px, 0)":"translate("+i.left+"px,"+i.top+"px)":e;m[k]=(m[k]?m[k]+",":"")+d;m[r]=(m[r]?m[r]+",":"")+c+"ms";m[s]=(m[s]?m[s]+",":"")+f}return b}function L(a){for(var b in a)if(("width"==b||"height"==b)&&("show"==a[b]||"hide"==a[b]||"toggle"==a[b]))return!0;return!1}
function u(a){for(var b in a)return!1;return!0}function x(a){v=a.match(/\D+$/);return parseFloat(a.replace(/px/i,""))}function M(a,b,h){var c=-1<d.inArray(a,N);if(("width"==a||"height"==a)&&b===parseFloat(h.css(a)))c=!1;return c}var N="top,right,bottom,left,opacity,height,width".split(","),y=["top","right","bottom","left"],l=["","-webkit-","-moz-","-o-"],O=["avoidTransforms","useTranslate3d","leaveTransforms"],H=/^([+-]=)?([\d+-.]+)(.*)$/,P=/([A-Z])/g,J={secondary:{},meta:{top:0,right:0,bottom:0,
left:0}},v="px",q="jQe",E=null,A=!1,t=(document.body||document.documentElement).style,w=void 0!==t.WebkitTransition?"webkitTransitionEnd":void 0!==t.OTransition?"oTransitionEnd":"transitionend",F=void 0!==t.WebkitTransition||void 0!==t.MozTransition||void 0!==t.OTransition||void 0!==t.transition,D="WebKitCSSMatrix"in window&&"m11"in new WebKitCSSMatrix,z=D;d.expr&&d.expr.filters&&(E=d.expr.filters.animated,d.expr.filters.animated=function(a){return d(a).data("events")&&d(a).data("events")[w]?!0:E.call(this,
a)});d.extend({toggle3DByDefault:function(){return z=!z},toggleDisabledByDefault:function(){return A=!A}});d.fn.translation=function(){if(!this[0])return null;var a=window.getComputedStyle(this[0],null),b={x:0,y:0};if(a)for(var d=l.length-1;d>=0;d--){var c=a.getPropertyValue(l[d]+"transform");if(c&&/matrix/i.test(c)){a=c.replace(/^matrix\(/i,"").split(/, |\)$/g);b={x:parseInt(a[4],10),y:parseInt(a[5],10)};break}}return b};d.fn.animate=function(a,b,h,c){var a=a||{},f=!(typeof a.bottom!=="undefined"||
typeof a.right!=="undefined"),e=d.speed(b,h,c),g=this,i=0,j=function(){i--;i===0&&typeof e.complete==="function"&&e.complete.apply(g[0],arguments)};return(typeof a.avoidCSSTransitions!=="undefined"?a.avoidCSSTransitions:A)===true||!F||u(a)||L(a)||e.duration<=0||d.fn.animate.defaults.avoidTransforms===true&&a.avoidTransforms!==false?B.apply(this,arguments):this[e.queue===true?"queue":"each"](function(){var b=d(this),c=d.extend({},e),g=function(){var c=b.data(q)||{original:{}},d={};if(a.leaveTransforms!==
true){for(var e=l.length-1;e>=0;e--)d[l[e]+"transform"]="";if(f&&typeof c.meta!=="undefined")for(var e=0,g;g=y[e];++e)d[g]=c.meta[g+"_o"]+v}b.unbind(w).css(c.original).css(d).data(q,null);a.opacity==="hide"&&b.css({display:"none",opacity:""});j.call(b)},h={bounce:"cubic-bezier(0.0, 0.35, .5, 1.3)",linear:"linear",swing:"ease-in-out",easeInQuad:"cubic-bezier(0.550, 0.085, 0.680, 0.530)",easeInCubic:"cubic-bezier(0.550, 0.055, 0.675, 0.190)",easeInQuart:"cubic-bezier(0.895, 0.030, 0.685, 0.220)",easeInQuint:"cubic-bezier(0.755, 0.050, 0.855, 0.060)",
easeInSine:"cubic-bezier(0.470, 0.000, 0.745, 0.715)",easeInExpo:"cubic-bezier(0.950, 0.050, 0.795, 0.035)",easeInCirc:"cubic-bezier(0.600, 0.040, 0.980, 0.335)",easeInBack:"cubic-bezier(0.600, -0.280, 0.735, 0.045)",easeOutQuad:"cubic-bezier(0.250, 0.460, 0.450, 0.940)",easeOutCubic:"cubic-bezier(0.215, 0.610, 0.355, 1.000)",easeOutQuart:"cubic-bezier(0.165, 0.840, 0.440, 1.000)",easeOutQuint:"cubic-bezier(0.230, 1.000, 0.320, 1.000)",easeOutSine:"cubic-bezier(0.390, 0.575, 0.565, 1.000)",easeOutExpo:"cubic-bezier(0.190, 1.000, 0.220, 1.000)",
easeOutCirc:"cubic-bezier(0.075, 0.820, 0.165, 1.000)",easeOutBack:"cubic-bezier(0.175, 0.885, 0.320, 1.275)",easeInOutQuad:"cubic-bezier(0.455, 0.030, 0.515, 0.955)",easeInOutCubic:"cubic-bezier(0.645, 0.045, 0.355, 1.000)",easeInOutQuart:"cubic-bezier(0.770, 0.000, 0.175, 1.000)",easeInOutQuint:"cubic-bezier(0.860, 0.000, 0.070, 1.000)",easeInOutSine:"cubic-bezier(0.445, 0.050, 0.550, 0.950)",easeInOutExpo:"cubic-bezier(1.000, 0.000, 0.000, 1.000)",easeInOutCirc:"cubic-bezier(0.785, 0.135, 0.150, 0.860)",
easeInOutBack:"cubic-bezier(0.680, -0.550, 0.265, 1.550)"},p={},h=h[c.easing||"swing"]?h[c.easing||"swing"]:c.easing||"swing",k;for(k in a)if(d.inArray(k,O)===-1){var r=d.inArray(k,y)>-1,s=G(b,a[k],k,r&&a.avoidTransforms!==true);a.avoidTransforms!==true&&M(k,s,b)?I(b,k,c.duration,h,r&&a.avoidTransforms===true?s+v:s,r&&a.avoidTransforms!==true,f,a.useTranslate3d===true):p[k]=a[k]}b.unbind(w);if((k=b.data(q))&&!u(k)&&!u(k.secondary)){i++;b.css(k.properties);var t=k.secondary;setTimeout(function(){b.bind(w,
g).css(t)})}else c.queue=false;if(!u(p)){i++;B.apply(b,[p,{duration:c.duration,easing:d.easing[c.easing]?c.easing:d.easing.swing?"swing":"linear",complete:j,queue:c.queue}])}return true})};d.fn.animate.defaults={};d.fn.stop=function(a,b,h){if(!F)return C.apply(this,[a,b]);a&&this.queue([]);this.each(function(){var c=d(this),f=c.data(q);if(f&&!u(f)){var e,g={};if(b){g=f.secondary;if(!h&&typeof f.meta.left_o!==void 0||typeof f.meta.top_o!==void 0){g.left=typeof f.meta.left_o!==void 0?f.meta.left_o:
"auto";g.top=typeof f.meta.top_o!==void 0?f.meta.top_o:"auto";for(e=l.length-1;e>=0;e--)g[l[e]+"transform"]=""}}else if(!u(f.secondary)){var i=window.getComputedStyle(c[0],null);if(i)for(var j in f.secondary)if(f.secondary.hasOwnProperty(j)){j=j.replace(P,"-$1").toLowerCase();g[j]=i.getPropertyValue(j);if(!h&&/matrix/i.test(g[j])){e=g[j].replace(/^matrix\(/i,"").split(/, |\)$/g);g.left=parseFloat(e[4])+parseFloat(c.css("left"))+v||"auto";g.top=parseFloat(e[5])+parseFloat(c.css("top"))+v||"auto";for(e=
l.length-1;e>=0;e--)g[l[e]+"transform"]=""}}}c.unbind(w).css(f.original).css(g).data(q,null)}else C.apply(c,[a,b])});return this}})(jQuery,jQuery.fn.animate,jQuery.fn.stop);

(function() {
// initializes touch and scroll events
        var supportTouch = $.support.touch,
                scrollEvent = "touchmove scroll",
                touchStartEvent = supportTouch ? "touchstart" : "mousedown",
                touchStopEvent = supportTouch ? "touchend" : "mouseup",
                touchMoveEvent = supportTouch ? "touchmove" : "mousemove";

 // handles swipeup and swipedown
        $.event.special.swipeupdown = {
            setup: function() {
                var thisObject = this;
                var $this = $(thisObject);

                $this.bind(touchStartEvent, function(event) {
                    var data = event.originalEvent.touches ?
                            event.originalEvent.touches[ 0 ] :
                            event,
                            start = {
                                time: (new Date).getTime(),
                                coords: [ data.pageX, data.pageY ],
                                origin: $(event.target)
                            },
                            stop;

                    function moveHandler(event) {
                        if (!start) {
                            return;
                        }

                        var data = event.originalEvent.touches ?
                                event.originalEvent.touches[ 0 ] :
                                event;
                        stop = {
                            time: (new Date).getTime(),
                            coords: [ data.pageX, data.pageY ]
                        };

                        // prevent scrolling
                        if (Math.abs(start.coords[1] - stop.coords[1]) > 10) {
                            event.preventDefault();
                        }
                    }

                    $this
                            .bind(touchMoveEvent, moveHandler)
                            .one(touchStopEvent, function(event) {
                        $this.unbind(touchMoveEvent, moveHandler);
                        if (start && stop) {
                            if (stop.time - start.time < 1000 &&
                                    Math.abs(start.coords[1] - stop.coords[1]) > 30 &&
                                    Math.abs(start.coords[0] - stop.coords[0]) < 75) {
                                start.origin
                                        .trigger("swipeupdown")
                                        .trigger(start.coords[1] > stop.coords[1] ? "swipeup" : "swipedown", [start, stop]);
                            }
                        }
                        start = stop = undefined;
                    });
                });
            }
        };

//Adds the events to the jQuery events special collection
        $.each({
            swipedown: "swipeupdown",
            swipeup: "swipeupdown"
        }, function(event, sourceEvent){
            $.event.special[event] = {
                setup: function(){
                    $(this).bind(sourceEvent, $.noop);
                }
            };
        });

    })();

(function(b){function k(a,f){function i(){var a=document.body,b=document.documentElement;return Math.max(a.scrollHeight,a.offsetHeight,b.clientHeight,b.scrollHeight,b.offsetHeight)}function o(a){g=b("li.dw-v",a).eq(0).index();c=b("li.dw-v",a).eq(-1).index();u=b("ul",x).index(a);e=h.height;q=j}function p(a){var b=h.headerText;return b?"function"==typeof b?b.call(D,a):b.replace(/{value}/i,a):""}function k(){j.temp=K&&null!==j.val&&j.val!=a.val()||null===j.values?h.parseValue(a.val()?a.val():"",j):j.values.slice(0);
j.setValue(!0)}function A(a,f,c,i,e){h.validate.call(D,x,c,a);b(".dww ul",x).each(function(i){var h=b(this),d=b('li[data-val="'+j.temp[i]+'"]',h),h=d.index(),g=d,d=h;if(!g.hasClass("dw-v")){for(var n=g,o=0,l=0;n.prev().length&&!n.hasClass("dw-v");)n=n.prev(),o++;for(;g.next().length&&!g.hasClass("dw-v");)g=g.next(),l++;(l<o&&l&&1==!e||!o||!n.hasClass("dw-v")||1==e)&&g.hasClass("dw-v")?d+=l:(g=n,d-=o);j.temp[i]=g.attr("data-val")}n=i==c||void 0===c;if(h!=d||n)j.scroll(b(this),d,n?a:0.2,f,i)});j.change(i)}
function E(){var a=0,f=0,c=b(window).width(),d=b(window).height(),e=b(window).scrollTop(),h=b(".dwo",x),j=b(".dw",x),g,n;b(".dwc",x).each(function(){g=b(this).outerWidth(!0);a+=g;f=g>f?g:f});g=a>c?f:a;j.width(g);g=j.outerWidth();n=j.outerHeight();j.css({left:(c-g)/2,top:e+(d-n)/2});h.height(0).height(i())}function H(a){var b=+a.data("pos")+1;t(a,b>c?g:b,1)}function P(a){var b=+a.data("pos")-1;t(a,b<g?c:b,2)}var j=this,D=a,a=b(D),F,h=b.extend({},B),O,x,N={},K=a.is("input"),L=!1;j.enable=function(){h.disabled=
!1;K&&a.prop("disabled",!1)};j.disable=function(){h.disabled=!0;K&&a.prop("disabled",!0)};j.scroll=function(a,b,f,c,i){var d=(O-b)*h.height;a.attr("style",(f?J+"-transition:all "+f.toFixed(1)+"s ease-out;":"")+(M?J+"-transform:translate3d(0,"+d+"px,0);":"top:"+d+"px;"));if(f&&void 0!==c){var e=0;clearInterval(N[i]);N[i]=setInterval(function(){e+=0.1;a.data("pos",Math.round((b-c)*Math.sin(e/f*(Math.PI/2))+c));e>=f&&(clearInterval(N[i]),a.data("pos",b).closest(".dwwl").removeClass("dwa"))},100)}else a.data("pos",
b)};j.setValue=function(b,f,c){var i=h.formatResult(j.temp);j.val=i;j.values=j.temp.slice(0);L&&b&&A(c);f&&K&&a.val(i).trigger("change")};j.validate=function(a,b,f,c){A(a,b,f,!0,c)};j.change=function(a){var f=h.formatResult(j.temp);"inline"==h.display?j.setValue(!1,a):b(".dwv",x).html(p(f));a&&h.onChange.call(D,f,j)};j.hide=function(){if(!1===h.onClose.call(D,j.val,j))return!1;b(".dwtd").prop("disabled",!1).removeClass("dwtd");a.blur();x&&x.remove();L=!1;b(window).unbind(".dw")};j.show=function(){if(h.disabled||
L)return!1;var f=h.height,c;thi=h.rows*f;k();for(var i='<div class="'+h.theme+'">'+("inline"==h.display?'<div class="dw dwbg dwi"><div class="dwwr">':'<div class="dwo"></div><div class="dw dwbg"><div class="dwwr">'+(h.headerText?'<div class="dwv"></div>':"")),e=0;e<h.wheels.length;e++){i+='<div class="dwc'+("scroller"!=h.mode?" dwpm":" dwsc")+(h.showLabel?"":" dwhl")+'"><div class="dwwc dwrc"><table cellpadding="0" cellspacing="0"><tr>';c=0;for(var d in h.wheels[e]){var i=i+('<td><div class="dwwl dwrc dwwl'+
c+'">'+("scroller"!=h.mode?'<div class="dwwb dwwbp" style="height:'+f+"px;line-height:"+f+'px;"><span>+</span></div><div class="dwwb dwwbm" style="height:'+f+"px;line-height:"+f+'px;"><span>&ndash;</span></div>':"")+'<div class="dwl">'+d+'</div><div class="dww dwrc" style="height:'+thi+"px;min-width:"+h.width+'px;"><ul>'),g;for(g in h.wheels[e][d])i+='<li class="dw-v" data-val="'+g+'" style="height:'+f+"px;line-height:"+f+'px;">'+h.wheels[e][d][g]+"</li>";i+='</ul><div class="dwwo"></div></div><div class="dwwol"></div></div></td>';
c++}i+="</tr></table></div></div>"}i+=("inline"!=h.display?'<div class="dwbc"><span class="dwbw dwb-s"><a href="#" class="dwb">'+h.setText+'</a></span><span class="dwbw dwb-c"><a href="#" class="dwb">'+h.cancelText+"</a></span></div>":'<div class="dwcc"></div>')+"</div></div></div>";x=b(i);A();"inline"!=h.display?x.appendTo("body"):a.is("div")?a.html(x):x.insertAfter(a);L=!0;F.init(x,j);"inline"!=h.display&&(b(".dwb-s a",x).click(function(){j.setValue(!1,!0);j.hide();h.onSelect.call(D,j.val,j);return!1}),
b(".dwb-c a",x).click(function(){j.hide();h.onCancel.call(D,j.val,j);return!1}),b("input,select").each(function(){b(this).prop("disabled")||b(this).addClass("dwtd")}),b("input,select").prop("disabled",!0),E(),b(window).bind("resize.dw",E));x.delegate(".dwwl","DOMMouseScroll mousewheel",function(a){if(!h.readonly){a.preventDefault();var a=a.originalEvent,a=a.wheelDelta?a.wheelDelta/120:a.detail?-a.detail/3:0,f=b("ul",this),i=+f.data("pos"),i=Math.round(i-a);o(f);t(f,i,a<0?1:2)}}).delegate(".dwb, .dwwb",
G,function(){b(this).addClass("dwb-a")}).delegate(".dwwb",G,function(a){if(!h.readonly&&!b(this).closest(".dwwl").hasClass("dwa")){a.preventDefault();a.stopPropagation();var f=b(this).closest(".dwwl").find("ul"),i=b(this).hasClass("dwwbp")?H:P;I=true;o(f);clearInterval(l);l=setInterval(function(){i(f)},h.delay);i(f)}}).delegate(".dwwl",G,function(a){if(!n&&!h.readonly&&!I){a.preventDefault();n=true;v=b("ul",this);v.closest(".dwwl").addClass("dwa");z=+v.data("pos");o(v);clearInterval(N[u]);C=r(a);
y=new Date;w=C;j.scroll(v,z)}});h.onShow.call(D,x,j)};j.init=function(i){F=b.extend({defaults:{},init:s},b.scroller.themes[i.theme?i.theme:h.theme]);b.extend(h,F.defaults,f,i);j.settings=h;O=Math.floor(h.rows/2);var c=b.scroller.presets[h.preset];a.unbind(".dw");c&&(c=c.call(D,j),b.extend(h,c,f,i),b.extend(d,c.methods));void 0!==a.data("dwro")&&(D.readOnly=m(a.data("dwro")));L&&j.hide();"inline"==h.display?j.show():(k(),K&&h.showOnFocus&&(a.data("dwro",D.readOnly),D.readOnly=!0,a.bind("focus.dw",
j.show)))};j.values=null;j.val=null;j.temp=null;j.init(f)}function E(a){for(var f in a)if(void 0!==A[a[f]])return!0;return!1}function r(a){return F?a.originalEvent?a.originalEvent.changedTouches[0].pageY:a.changedTouches[0].pageY:a.pageY}function m(a){return!0===a||"true"==a}function t(a,f,i,e,d){f=f>c?c:f;f=f<g?g:f;a=b("li",a).eq(f);q.temp[u]=a.attr("data-val");q.validate(e?f==d?0.1:Math.abs(0.1*(f-d)):0,d,u,i)}var p={},l,s=function(){},e,g,c,q,o=(new Date).getTime(),n,I,v,u,C,w,y,z,A=document.createElement("modernizr").style,
M=E(["perspectiveProperty","WebkitPerspective","MozPerspective","OPerspective","msPerspective"])&&"webkitPerspective"in document.documentElement.style,J=function(){var a=["Webkit","Moz","O","ms"],f;for(f in a)if(E([a[f]+"Transform"]))return"-"+a[f].toLowerCase();return""}(),F="ontouchstart"in window,G=F?"touchstart":"mousedown",H=F?"touchend":"mouseup",B={width:70,height:40,rows:3,delay:300,disabled:!1,readonly:!1,showOnFocus:!0,showLabel:!0,wheels:[],theme:"",headerText:"{value}",display:"modal",
mode:"scroller",preset:"",setText:"Set",cancelText:"Cancel",onShow:s,onClose:s,onSelect:s,onCancel:s,onChange:s,formatResult:function(a){for(var f="",b=0;b<a.length;b++)f+=(0<b?" ":"")+a[b];return f},parseValue:function(a,f){for(var b=f.settings.wheels,a=a.split(" "),c=[],e=0,d=0;d<b.length;d++)for(var g in b[d]){if(void 0!==b[d][g][a[e]])c.push(a[e]);else for(var n in b[d][g]){c.push(n);break}e++}return c},validate:s},d={init:function(a){void 0===a&&(a={});return this.each(function(){this.id||(o+=
1,this.id="scoller"+o);p[this.id]=new k(this,a)})},enable:function(){return this.each(function(){var a=p[this.id];a&&a.enable()})},disable:function(){return this.each(function(){var a=p[this.id];a&&a.disable()})},isDisabled:function(){var a=p[this[0].id];if(a)return a.settings.disabled},option:function(a,f){return this.each(function(){var b=p[this.id];if(b){var c={};"object"===typeof a?c=a:c[a]=f;b.init(c)}})},setValue:function(a,b,c){return this.each(function(){var d=p[this.id];d&&(d.temp=a,d.setValue(!0,
b,c))})},getInst:function(){return p[this[0].id]},getValue:function(){var a=p[this[0].id];if(a)return a.values},show:function(){var a=p[this[0].id];if(a)return a.show()},hide:function(){return this.each(function(){var a=p[this.id];a&&a.hide()})},destroy:function(){return this.each(function(){var a=p[this.id];a&&(a.hide(),b(this).unbind(".dw"),delete p[this.id],b(this).is("input")&&(this.readOnly=m(b(this).data("dwro"))))})}};b(document).bind(F?"touchmove":"mousemove",function(a){n&&(a.preventDefault(),
w=r(a),a=z+(C-w)/e,a=a>c+1?c+1:a,a=a<g-1?g-1:a,q.scroll(v,a))});b(document).bind(H,function(a){if(n){a.preventDefault();var f=new Date-y,a=z+(C-w)/e,a=a>c+1?c+1:a,a=a<g-1?g-1:a;300>f?(f=(w-C)/f,f=f*f/0.0012,0>w-C&&(f=-f)):f=w-C;t(v,Math.round(z-f/e),0,!0,Math.round(a));n=!1;v=null}I&&(clearInterval(l),I=!1);b(".dwb-a").removeClass("dwb-a")});b.fn.scroller=function(a){if(d[a])return d[a].apply(this,Array.prototype.slice.call(arguments,1));if("object"===typeof a||!a)return d.init.apply(this,arguments);
b.error("Unknown method")};b.scroller={setDefaults:function(a){b.extend(B,a)},presets:{},themes:{}}})(jQuery);(function(b){b.scroller.themes.android={defaults:{dateOrder:"Mddyy",mode:"clickpick",height:50}}})(jQuery);(function(b){var k=new Date,E={dateFormat:"mm/dd/yy",dateOrder:"mmddy",timeWheels:"hhiiA",timeFormat:"hh:ii A",startYear:k.getFullYear()-100,endYear:k.getFullYear()+1,monthNames:"January,February,March,April,May,June,July,August,September,October,November,December".split(","),monthNamesShort:"Jan,Feb,Mar,Apr,May,Jun,Jul,Aug,Sep,Oct,Nov,Dec".split(","),dayNames:"Sunday,Monday,Tuesday,Wednesday,Thursday,Friday,Saturday".split(","),dayNamesShort:"Sun,Mon,Tue,Wed,Thu,Fri,Sat".split(","),shortYearCutoff:"+10",
monthText:"Month",dayText:"Day",yearText:"Year",hourText:"Hours",minuteText:"Minutes",secText:"Seconds",ampmText:"&nbsp;",stepHour:1,stepMinute:1,stepSecond:1,separator:" "},k=function(r){function m(a,b,c){return void 0!==o[b]?+a[o[b]]:void 0!==c?c:A[n[b]]?A[n[b]]():n[b](A)}function t(a,b){return Math.floor(a/b)*b}function p(a){var b=m(a,"h",0);return new Date(m(a,"y"),m(a,"m"),m(a,"d",1),m(a,"ap")?b+12:b,m(a,"i",0),m(a,"s",0))}var l=b(this),s={},e;if(l.is("input")){switch(l.attr("type")){case "date":e=
"yy-mm-dd";break;case "datetime":e="yy-mm-ddTHH:ii:ssZ";break;case "datetime-local":e="yy-mm-ddTHH:ii:ss";break;case "month":e="yy-mm";s.dateOrder="mmyy";break;case "time":e="HH:ii:ss"}var g=l.attr("min"),l=l.attr("max");g&&(s.minDate=b.scroller.parseDate(e,g));l&&(s.maxDate=b.scroller.parseDate(e,l))}var c=b.extend({},E,s,r.settings),l=0,s=[],q=[],o={},n={y:"getFullYear",m:"getMonth",d:"getDate",h:function(a){a=a.getHours();a=y&&12<=a?a-12:a;return t(a,M)},i:function(a){return t(a.getMinutes(),J)},
s:function(a){return t(a.getSeconds(),F)},ap:function(a){return w&&11<a.getHours()?1:0}},k=c.preset,v=c.dateOrder,u=c.timeWheels,C=v.match(/D/),w=u.match(/a/i),y=u.match(/h/),z="datetime"==k?c.dateFormat+c.separator+c.timeFormat:"time"==k?c.timeFormat:c.dateFormat,A=new Date,M=c.stepHour,J=c.stepMinute,F=c.stepSecond,G=c.minDate,H=c.maxDate;e=e?e:z;if(k.match(/date/i)){b.each(["y","m","d"],function(a,b){a=v.search(RegExp(b,"i"));-1<a&&q.push({o:a,v:b})});q.sort(function(a,b){return a.o>b.o?1:-1});
b.each(q,function(a,b){o[b.v]=a});for(var g={},B=0;3>B;B++)if(B==o.y){l++;g[c.yearText]={};for(var d=G?G.getFullYear():c.startYear,a=H?H.getFullYear():c.endYear;d<=a;d++)g[c.yearText][d]=v.match(/yy/i)?d:(d+"").substr(2,2)}else if(B==o.m){l++;g[c.monthText]={};for(d=0;12>d;d++)g[c.monthText][d]=v.match(/MM/)?c.monthNames[d]:v.match(/M/)?c.monthNamesShort[d]:v.match(/mm/)&&9>d?"0"+(d+1):d+1}else if(B==o.d){l++;g[c.dayText]={};for(d=1;32>d;d++)g[c.dayText][d]=v.match(/dd/i)&&10>d?"0"+d:d}s.push(g)}if(k.match(/time/i)){q=
[];b.each(["h","i","s"],function(a,b){a=u.search(RegExp(b,"i"));-1<a&&q.push({o:a,v:b})});q.sort(function(a,b){return a.o>b.o?1:-1});b.each(q,function(a,b){o[b.v]=a});g={};for(B=0;3>B;B++)if(B==o.h){o.h=l++;g[c.hourText]={};for(d=0;d<(y?12:24);d+=M)g[c.hourText][d]=y&&0==d?12:u.match(/hh/i)&&10>d?"0"+d:d}else if(B==o.i){o.i=l++;g[c.minuteText]={};for(d=0;60>d;d+=J)g[c.minuteText][d]=u.match(/ii/)&&10>d?"0"+d:d}else if(B==o.s){o.s=l++;g[c.secText]={};for(d=0;60>d;d+=F)g[c.secText][d]=u.match(/ss/)&&
10>d?"0"+d:d}w&&(o.ap=l++,l=u.match(/A/),g[c.ampmText]={"0":l?"AM":"am",1:l?"PM":"pm"});s.push(g)}r.setDate=function(a,b,c){for(var d in o)this.temp[o[d]]=a[n[d]]?a[n[d]]():n[d](a);this.setValue(!0,b,c)};r.getDate=function(a){return p(a)};return{wheels:s,headerText:function(){return b.scroller.formatDate(z,p(r.temp),c)},formatResult:function(a){return b.scroller.formatDate(e,p(a),c)},parseValue:function(a){var d=new Date,g=[];try{d=b.scroller.parseDate(e,a,c)}catch(l){}for(var m in o)g[o[m]]=d[n[m]]?
d[n[m]]():n[m](d);return g},validate:function(a,d){var e=r.temp.slice(0),g={m:0,d:1,h:0,i:0,s:0,ap:0},l={m:11,d:31,h:t(y?11:23,M),i:t(59,J),s:t(59,F),ap:1},p=!0,q=!0;b.each(G||H?"y,m,d,ap,h,i,s".split(","):d==o.y||d==o.m||void 0===d?["d"]:[],function(d,i){if(void 0!==o[i]){var j=g[i],r=l[i],t=31,h=m(e,i),z=b("ul",a).eq(o[i]),k,s;"d"==i&&(k=m(e,"y"),s=m(e,"m"),r=t=32-(new Date(k,s,32)).getDate(),C&&b("li",z).each(function(){var a=b(this),d=a.data("val"),e=(new Date(k,s,d)).getDay();a.html(v.replace(/[my]/gi,
"").replace(/dd/,10>d?"0"+d:d).replace(/d/,d).replace(/DD/,c.dayNames[e]).replace(/D/,c.dayNamesShort[e]))}));p&&G&&(j=G[n[i]]?G[n[i]]():n[i](G));q&&H&&(r=H[n[i]]?H[n[i]]():n[i](H));if("y"!=i){var u=b('li[data-val="'+j+'"]',z).index(),w=b('li[data-val="'+r+'"]',z).index();b("li",z).removeClass("dw-v").slice(u,w+1).addClass("dw-v");"d"==i&&b("li",z).removeClass("dw-h").slice(t).addClass("dw-h");h<j&&(h=j);h>r&&(h=r)}p&&(p=h==j);q&&(q=h==r);if(c.invalid&&"d"==i){var A=[];c.invalid.dates&&b.each(c.invalid.dates,
function(a,b){b.getFullYear()==k&&b.getMonth()==s&&A.push(b.getDate()-1)});if(c.invalid.daysOfWeek){var y=(new Date(k,s,1)).getDay();b.each(c.invalid.daysOfWeek,function(a,b){for(var c=b-y;c<t;c=c+7)c>=0&&A.push(c)})}c.invalid.daysOfMonth&&b.each(c.invalid.daysOfMonth,function(a,b){b=(b+"").split("/");b[1]?b[0]-1==s&&A.push(b[1]-1):A.push(b[0]-1)});b.each(A,function(a,c){b("li",z).eq(c).removeClass("dw-v")})}e[o[i]]=h}})},methods:{getDate:function(a){var c=b(this).scroller("getInst");if(c)return c.getDate(a?
c.temp:c.values)},setDate:function(a,c,d){void 0==c&&(c=!1);return this.each(function(){var e=b(this).scroller("getInst");e&&e.setDate(a,c,d)})}}}};b.scroller.presets.date=k;b.scroller.presets.datetime=k;b.scroller.presets.time=k;b.scroller.formatDate=function(r,m,k){if(!m)return null;for(var k=b.extend({},E,k),p=function(b){for(var e=0;c+1<r.length&&r.charAt(c+1)==b;)e++,c++;return e},l=function(b,c,e){c=""+c;if(p(b))for(;c.length<e;)c="0"+c;return c},s=function(b,c,e,g){return p(b)?g[c]:e[c]},e=
"",g=!1,c=0;c<r.length;c++)if(g)"'"==r.charAt(c)&&!p("'")?g=!1:e+=r.charAt(c);else switch(r.charAt(c)){case "d":e+=l("d",m.getDate(),2);break;case "D":e+=s("D",m.getDay(),k.dayNamesShort,k.dayNames);break;case "o":e+=l("o",(m.getTime()-(new Date(m.getFullYear(),0,0)).getTime())/864E5,3);break;case "m":e+=l("m",m.getMonth()+1,2);break;case "M":e+=s("M",m.getMonth(),k.monthNamesShort,k.monthNames);break;case "y":e+=p("y")?m.getFullYear():(10>m.getYear()%100?"0":"")+m.getYear()%100;break;case "h":var q=
m.getHours(),e=e+l("h",12<q?q-12:0==q?12:q,2);break;case "H":e+=l("H",m.getHours(),2);break;case "i":e+=l("i",m.getMinutes(),2);break;case "s":e+=l("s",m.getSeconds(),2);break;case "a":e+=11<m.getHours()?"pm":"am";break;case "A":e+=11<m.getHours()?"PM":"AM";break;case "'":p("'")?e+="'":g=!0;break;default:e+=r.charAt(c)}return e};b.scroller.parseDate=function(k,m,t){var p=new Date;if(!k||!m)return p;for(var m="object"==typeof m?m.toString():m+"",l=b.extend({},E,t),s=l.shortYearCutoff,t=p.getFullYear(),
e=p.getMonth()+1,g=p.getDate(),c=-1,q=p.getHours(),p=p.getMinutes(),o=0,n=-1,I=!1,v=function(b){(b=y+1<k.length&&k.charAt(y+1)==b)&&y++;return b},u=function(b){v(b);b=m.substr(w).match(RegExp("^\\d{1,"+("@"==b?14:"!"==b?20:"y"==b?4:"o"==b?3:2)+"}"));if(!b)return 0;w+=b[0].length;return parseInt(b[0],10)},C=function(b,c,e){b=v(b)?e:c;for(c=0;c<b.length;c++)if(m.substr(w,b[c].length).toLowerCase()==b[c].toLowerCase())return w+=b[c].length,c+1;return 0},w=0,y=0;y<k.length;y++)if(I)"'"==k.charAt(y)&&
!v("'")?I=!1:w++;else switch(k.charAt(y)){case "d":g=u("d");break;case "D":C("D",l.dayNamesShort,l.dayNames);break;case "o":c=u("o");break;case "m":e=u("m");break;case "M":e=C("M",l.monthNamesShort,l.monthNames);break;case "y":t=u("y");break;case "H":q=u("H");break;case "h":q=u("h");break;case "i":p=u("i");break;case "s":o=u("s");break;case "a":n=C("a",["am","pm"],["am","pm"])-1;break;case "A":n=C("A",["am","pm"],["am","pm"])-1;break;case "'":v("'")?w++:I=!0;break;default:w++}100>t&&(t+=(new Date).getFullYear()-
(new Date).getFullYear()%100+(t<=("string"!=typeof s?s:(new Date).getFullYear()%100+parseInt(s,10))?0:-100));if(-1<c){e=1;g=c;do{l=32-(new Date(t,e-1,32)).getDate();if(g<=l)break;e++;g-=l}while(1)}q=new Date(t,e-1,g,-1==n?q:n&&12>q?q+12:!n&&12==q?0:q,p,o);if(q.getFullYear()!=t||q.getMonth()+1!=e||q.getDate()!=g)throw"Invalid date";return q}})(jQuery);(function(b){b.scroller.themes.ios={defaults:{dateOrder:"MMdyy",rows:5,height:30,width:55,headerText:!1,showLabel:!1}}})(jQuery);(function(b){b.scroller.themes.jqm={defaults:{jqmBody:"c",jqmHeader:"b",jqmWheel:"d",jqmClickPick:"c",jqmSet:"b",jqmCancel:"c"},init:function(k,E){var r=E.settings;b(".dw",k).removeClass("dwbg").addClass("ui-overlay-shadow ui-corner-all ui-body-a");b(".dwb-s a",k).attr("data-role","button").attr("data-theme",r.jqmSet);b(".dwb-c a",k).attr("data-role","button").attr("data-theme",r.jqmCancel);b(".dwwb",k).attr("data-role","button").attr("data-theme",r.jqmClickPick);b(".dwv",k).addClass("ui-header ui-bar-"+
r.jqmHeader);b(".dwwr",k).addClass("ui-body-"+r.jqmBody);b(".dwpm .dww",k).addClass("ui-body-"+r.jqmWheel);"inline"!=r.display&&b(".dw",k).addClass("pop in");k.trigger("create");b(".dwo",k).click(function(){E.hide()})}}})(jQuery);


/*
 * jQuery FlexSlider v2.1
 * Copyright 2012 WooThemes
 * Contributing Author: Tyler Smith
 */
;  (function(d){d.flexslider=function(i,k){var a=d(i),c=d.extend({},d.flexslider.defaults,k),e=c.namespace,r="ontouchstart"in window||window.DocumentTouch&&document instanceof DocumentTouch,s=r?"touchend":"click",l="vertical"===c.direction,m=c.reverse,h=0<c.itemWidth,q="fade"===c.animation,p=""!==c.asNavFor,f={};d.data(i,"flexslider",a);f={init:function(){a.animating=!1;a.currentSlide=c.startAt;a.animatingTo=a.currentSlide;a.atEnd=0===a.currentSlide||a.currentSlide===a.last;a.containerSelector=c.selector.substr(0,
 c.selector.search(" "));a.slides=d(c.selector,a);a.container=d(a.containerSelector,a);a.count=a.slides.length;a.syncExists=0<d(c.sync).length;"slide"===c.animation&&(c.animation="swing");a.prop=l?"top":"marginLeft";a.args={};a.manualPause=!1;var b=a,g;if(g=!c.video)if(g=!q)if(g=c.useCSS)a:{g=document.createElement("div");var n=["perspectiveProperty","WebkitPerspective","MozPerspective","OPerspective","msPerspective"],e;for(e in n)if(void 0!==g.style[n[e]]){a.pfx=n[e].replace("Perspective","").toLowerCase();
 a.prop="-"+a.pfx+"-transform";g=!0;break a}g=!1}b.transitions=g;""!==c.controlsContainer&&(a.controlsContainer=0<d(c.controlsContainer).length&&d(c.controlsContainer));""!==c.manualControls&&(a.manualControls=0<d(c.manualControls).length&&d(c.manualControls));c.randomize&&(a.slides.sort(function(){return Math.round(Math.random())-0.5}),a.container.empty().append(a.slides));a.doMath();p&&f.asNav.setup();a.setup("init");c.controlNav&&f.controlNav.setup();c.directionNav&&f.directionNav.setup();c.keyboard&&
 (1===d(a.containerSelector).length||c.multipleKeyboard)&&d(document).bind("keyup",function(b){b=b.keyCode;if(!a.animating&&(b===39||b===37)){b=b===39?a.getTarget("next"):b===37?a.getTarget("prev"):false;a.flexAnimate(b,c.pauseOnAction)}});c.mousewheel&&a.bind("mousewheel",function(b,g){b.preventDefault();var d=g<0?a.getTarget("next"):a.getTarget("prev");a.flexAnimate(d,c.pauseOnAction)});c.pausePlay&&f.pausePlay.setup();c.slideshow&&(c.pauseOnHover&&a.hover(function(){!a.manualPlay&&!a.manualPause&&
 a.pause()},function(){!a.manualPause&&!a.manualPlay&&a.play()}),0<c.initDelay?setTimeout(a.play,c.initDelay):a.play());r&&c.touch&&f.touch();(!q||q&&c.smoothHeight)&&d(window).bind("resize focus",f.resize);setTimeout(function(){c.start(a)},200)},asNav:{setup:function(){a.asNav=!0;a.animatingTo=Math.floor(a.currentSlide/a.move);a.currentItem=a.currentSlide;a.slides.removeClass(e+"active-slide").eq(a.currentItem).addClass(e+"active-slide");a.slides.click(function(b){b.preventDefault();var b=d(this),
 g=b.index();!d(c.asNavFor).data("flexslider").animating&&!b.hasClass("active")&&(a.direction=a.currentItem<g?"next":"prev",a.flexAnimate(g,c.pauseOnAction,!1,!0,!0))})}},controlNav:{setup:function(){a.manualControls?f.controlNav.setupManual():f.controlNav.setupPaging()},setupPaging:function(){var b=1,g;a.controlNavScaffold=d('<ol class="'+e+"control-nav "+e+("thumbnails"===c.controlNav?"control-thumbs":"control-paging")+'"></ol>');if(1<a.pagingCount)for(var n=0;n<a.pagingCount;n++)g="thumbnails"===
 c.controlNav?'<img src="'+a.slides.eq(n).attr("data-thumb")+'"/>':"<a>"+b+"</a>",a.controlNavScaffold.append("<li>"+g+"</li>"),b++;a.controlsContainer?d(a.controlsContainer).append(a.controlNavScaffold):a.append(a.controlNavScaffold);f.controlNav.set();f.controlNav.active();a.controlNavScaffold.delegate("a, img",s,function(b){b.preventDefault();var b=d(this),g=a.controlNav.index(b);b.hasClass(e+"active")||(a.direction=g>a.currentSlide?"next":"prev",a.flexAnimate(g,c.pauseOnAction))});r&&a.controlNavScaffold.delegate("a",
 "click touchstart",function(a){a.preventDefault()})},setupManual:function(){a.controlNav=a.manualControls;f.controlNav.active();a.controlNav.live(s,function(b){b.preventDefault();var b=d(this),g=a.controlNav.index(b);b.hasClass(e+"active")||(g>a.currentSlide?a.direction="next":a.direction="prev",a.flexAnimate(g,c.pauseOnAction))});r&&a.controlNav.live("click touchstart",function(a){a.preventDefault()})},set:function(){a.controlNav=d("."+e+"control-nav li "+("thumbnails"===c.controlNav?"img":"a"),
 a.controlsContainer?a.controlsContainer:a)},active:function(){a.controlNav.removeClass(e+"active").eq(a.animatingTo).addClass(e+"active")},update:function(b,c){1<a.pagingCount&&"add"===b?a.controlNavScaffold.append(d("<li><a>"+a.count+"</a></li>")):1===a.pagingCount?a.controlNavScaffold.find("li").remove():a.controlNav.eq(c).closest("li").remove();f.controlNav.set();1<a.pagingCount&&a.pagingCount!==a.controlNav.length?a.update(c,b):f.controlNav.active()}},directionNav:{setup:function(){var b=d('<ul class="'+
 e+'direction-nav"><li><a class="'+e+'prev" href="#">'+c.prevText+'</a></li><li><a class="'+e+'next" href="#">'+c.nextText+"</a></li></ul>");a.controlsContainer?(d(a.controlsContainer).append(b),a.directionNav=d("."+e+"direction-nav li a",a.controlsContainer)):(a.append(b),a.directionNav=d("."+e+"direction-nav li a",a));f.directionNav.update();a.directionNav.bind(s,function(b){b.preventDefault();b=d(this).hasClass(e+"next")?a.getTarget("next"):a.getTarget("prev");a.flexAnimate(b,c.pauseOnAction)});
 r&&a.directionNav.bind("click touchstart",function(a){a.preventDefault()})},update:function(){var b=e+"disabled";1===a.pagingCount?a.directionNav.addClass(b):c.animationLoop?a.directionNav.removeClass(b):0===a.animatingTo?a.directionNav.removeClass(b).filter("."+e+"prev").addClass(b):a.animatingTo===a.last?a.directionNav.removeClass(b).filter("."+e+"next").addClass(b):a.directionNav.removeClass(b)}},pausePlay:{setup:function(){var b=d('<div class="'+e+'pauseplay"><a></a></div>');a.controlsContainer?
 (a.controlsContainer.append(b),a.pausePlay=d("."+e+"pauseplay a",a.controlsContainer)):(a.append(b),a.pausePlay=d("."+e+"pauseplay a",a));f.pausePlay.update(c.slideshow?e+"pause":e+"play");a.pausePlay.bind(s,function(b){b.preventDefault();if(d(this).hasClass(e+"pause")){a.manualPause=true;a.manualPlay=false;a.pause()}else{a.manualPause=false;a.manualPlay=true;a.play()}});r&&a.pausePlay.bind("click touchstart",function(a){a.preventDefault()})},update:function(b){"play"===b?a.pausePlay.removeClass(e+
 "pause").addClass(e+"play").text(c.playText):a.pausePlay.removeClass(e+"play").addClass(e+"pause").text(c.pauseText)}},touch:function(){function b(b){j=l?d-b.touches[0].pageY:d-b.touches[0].pageX;p=l?Math.abs(j)<Math.abs(b.touches[0].pageX-e):Math.abs(j)<Math.abs(b.touches[0].pageY-e);if(!p||500<Number(new Date)-k)b.preventDefault(),!q&&a.transitions&&(c.animationLoop||(j/=0===a.currentSlide&&0>j||a.currentSlide===a.last&&0<j?Math.abs(j)/o+2:1),a.setProps(f+j,"setTouch"))}function g(){if(a.animatingTo===
 a.currentSlide&&!p&&null!==j){var h=m?-j:j,l=0<h?a.getTarget("next"):a.getTarget("prev");a.canAdvance(l)&&(550>Number(new Date)-k&&50<Math.abs(h)||Math.abs(h)>o/2)?a.flexAnimate(l,c.pauseOnAction):a.flexAnimate(a.currentSlide,c.pauseOnAction,!0)}i.removeEventListener("touchmove",b,!1);i.removeEventListener("touchend",g,!1);f=j=e=d=null}var d,e,f,o,j,k,p=!1;i.addEventListener("touchstart",function(j){a.animating?j.preventDefault():1===j.touches.length&&(a.pause(),o=l?a.h:a.w,k=Number(new Date),f=h&&
 m&&a.animatingTo===a.last?0:h&&m?a.limit-(a.itemW+c.itemMargin)*a.move*a.animatingTo:h&&a.currentSlide===a.last?a.limit:h?(a.itemW+c.itemMargin)*a.move*a.currentSlide:m?(a.last-a.currentSlide+a.cloneOffset)*o:(a.currentSlide+a.cloneOffset)*o,d=l?j.touches[0].pageY:j.touches[0].pageX,e=l?j.touches[0].pageX:j.touches[0].pageY,i.addEventListener("touchmove",b,!1),i.addEventListener("touchend",g,!1))},!1)},resize:function(){!a.animating&&a.is(":visible")&&(h||a.doMath(),q?f.smoothHeight():h?(a.slides.width(a.computedW),
 a.update(a.pagingCount),a.setProps()):l?(a.viewport.height(a.h),a.setProps(a.h,"setTotal")):(c.smoothHeight&&f.smoothHeight(),a.newSlides.width(a.computedW),a.setProps(a.computedW,"setTotal")))},smoothHeight:function(b){if(!l||q){var c=q?a:a.viewport;b?c.animate({height:a.slides.eq(a.animatingTo).height()},b):c.height(a.slides.eq(a.animatingTo).height())}},sync:function(b){var g=d(c.sync).data("flexslider"),e=a.animatingTo;switch(b){case "animate":g.flexAnimate(e,c.pauseOnAction,!1,!0);break;case "play":!g.playing&&
 !g.asNav&&g.play();break;case "pause":g.pause()}}};a.flexAnimate=function(b,g,n,i,k){p&&1===a.pagingCount&&(a.direction=a.currentItem<b?"next":"prev");if(!a.animating&&(a.canAdvance(b,k)||n)&&a.is(":visible")){if(p&&i)if(n=d(c.asNavFor).data("flexslider"),a.atEnd=0===b||b===a.count-1,n.flexAnimate(b,!0,!1,!0,k),a.direction=a.currentItem<b?"next":"prev",n.direction=a.direction,Math.ceil((b+1)/a.visible)-1!==a.currentSlide&&0!==b)a.currentItem=b,a.slides.removeClass(e+"active-slide").eq(b).addClass(e+
 "active-slide"),b=Math.floor(b/a.visible);else return a.currentItem=b,a.slides.removeClass(e+"active-slide").eq(b).addClass(e+"active-slide"),!1;a.animating=!0;a.animatingTo=b;c.before(a);g&&a.pause();a.syncExists&&!k&&f.sync("animate");c.controlNav&&f.controlNav.active();h||a.slides.removeClass(e+"active-slide").eq(b).addClass(e+"active-slide");a.atEnd=0===b||b===a.last;c.directionNav&&f.directionNav.update();b===a.last&&(c.end(a),c.animationLoop||a.pause());if(q)a.slides.eq(a.currentSlide).fadeOut(c.animationSpeed,
 c.easing),a.slides.eq(b).fadeIn(c.animationSpeed,c.easing,a.wrapup);else{var o=l?a.slides.filter(":first").height():a.computedW;h?(b=c.itemWidth>a.w?2*c.itemMargin:c.itemMargin,b=(a.itemW+b)*a.move*a.animatingTo,b=b>a.limit&&1!==a.visible?a.limit:b):b=0===a.currentSlide&&b===a.count-1&&c.animationLoop&&"next"!==a.direction?m?(a.count+a.cloneOffset)*o:0:a.currentSlide===a.last&&0===b&&c.animationLoop&&"prev"!==a.direction?m?0:(a.count+1)*o:m?(a.count-1-b+a.cloneOffset)*o:(b+a.cloneOffset)*o;a.setProps(b,
 "",c.animationSpeed);if(a.transitions){if(!c.animationLoop||!a.atEnd)a.animating=!1,a.currentSlide=a.animatingTo;a.container.unbind("webkitTransitionEnd transitionend");a.container.bind("webkitTransitionEnd transitionend",function(){a.wrapup(o)})}else a.container.animate(a.args,c.animationSpeed,c.easing,function(){a.wrapup(o)})}c.smoothHeight&&f.smoothHeight(c.animationSpeed)}};a.wrapup=function(b){!q&&!h&&(0===a.currentSlide&&a.animatingTo===a.last&&c.animationLoop?a.setProps(b,"jumpEnd"):a.currentSlide===
 a.last&&(0===a.animatingTo&&c.animationLoop)&&a.setProps(b,"jumpStart"));a.animating=!1;a.currentSlide=a.animatingTo;c.after(a)};a.animateSlides=function(){a.animating||a.flexAnimate(a.getTarget("next"))};a.pause=function(){clearInterval(a.animatedSlides);a.playing=!1;c.pausePlay&&f.pausePlay.update("play");a.syncExists&&f.sync("pause")};a.play=function(){a.animatedSlides=setInterval(a.animateSlides,c.slideshowSpeed);a.playing=!0;c.pausePlay&&f.pausePlay.update("pause");a.syncExists&&f.sync("play")};
 a.canAdvance=function(b,g){var d=p?a.pagingCount-1:a.last;return g?!0:p&&a.currentItem===a.count-1&&0===b&&"prev"===a.direction?!0:p&&0===a.currentItem&&b===a.pagingCount-1&&"next"!==a.direction?!1:b===a.currentSlide&&!p?!1:c.animationLoop?!0:a.atEnd&&0===a.currentSlide&&b===d&&"next"!==a.direction?!1:a.atEnd&&a.currentSlide===d&&0===b&&"next"===a.direction?!1:!0};a.getTarget=function(b){a.direction=b;return"next"===b?a.currentSlide===a.last?0:a.currentSlide+1:0===a.currentSlide?a.last:a.currentSlide-
 1};a.setProps=function(b,g,d){var e,f=b?b:(a.itemW+c.itemMargin)*a.move*a.animatingTo;e=-1*function(){if(h)return"setTouch"===g?b:m&&a.animatingTo===a.last?0:m?a.limit-(a.itemW+c.itemMargin)*a.move*a.animatingTo:a.animatingTo===a.last?a.limit:f;switch(g){case "setTotal":return m?(a.count-1-a.currentSlide+a.cloneOffset)*b:(a.currentSlide+a.cloneOffset)*b;case "setTouch":return b;case "jumpEnd":return m?b:a.count*b;case "jumpStart":return m?a.count*b:b;default:return b}}()+"px";a.transitions&&(e=l?
 "translate3d(0,"+e+",0)":"translate3d("+e+",0,0)",d=void 0!==d?d/1E3+"s":"0s",a.container.css("-"+a.pfx+"-transition-duration",d));a.args[a.prop]=e;(a.transitions||void 0===d)&&a.container.css(a.args)};a.setup=function(b){if(q)a.slides.css({width:"100%","float":"left",marginRight:"-100%",position:"relative"}),"init"===b&&a.slides.eq(a.currentSlide).fadeIn(c.animationSpeed,c.easing),c.smoothHeight&&f.smoothHeight();else{var g,n;"init"===b&&(a.viewport=d('<div class="'+e+'viewport"></div>').css({overflow:"hidden",
 position:"relative"}).appendTo(a).append(a.container),a.cloneCount=0,a.cloneOffset=0,m&&(n=d.makeArray(a.slides).reverse(),a.slides=d(n),a.container.empty().append(a.slides)));c.animationLoop&&!h&&(a.cloneCount=2,a.cloneOffset=1,"init"!==b&&a.container.find(".clone").remove(),a.container.append(a.slides.first().clone().addClass("clone")).prepend(a.slides.last().clone().addClass("clone")));a.newSlides=d(c.selector,a);g=m?a.count-1-a.currentSlide+a.cloneOffset:a.currentSlide+a.cloneOffset;l&&!h?(a.container.height(200*
 (a.count+a.cloneCount)+"%").css("position","absolute").width("100%"),setTimeout(function(){a.newSlides.css({display:"block"});a.doMath();a.viewport.height(a.h);a.setProps(g*a.h,"init")},"init"===b?100:0)):(a.container.width(200*(a.count+a.cloneCount)+"%"),a.setProps(g*a.computedW,"init"),setTimeout(function(){a.doMath();a.newSlides.css({width:a.computedW,"float":"left",display:"block"});c.smoothHeight&&f.smoothHeight()},"init"===b?100:0))}h||a.slides.removeClass(e+"active-slide").eq(a.currentSlide).addClass(e+
 "active-slide")};a.doMath=function(){var b=a.slides.first(),d=c.itemMargin,e=c.minItems,f=c.maxItems;a.w=a.width();a.h=b.height();a.boxPadding=b.outerWidth()-b.width();h?(a.itemT=c.itemWidth+d,a.minW=e?e*a.itemT:a.w,a.maxW=f?f*a.itemT:a.w,a.itemW=a.minW>a.w?(a.w-d*e)/e:a.maxW<a.w?(a.w-d*f)/f:c.itemWidth>a.w?a.w:c.itemWidth,a.visible=Math.floor(a.w/(a.itemW+d)),a.move=0<c.move&&c.move<a.visible?c.move:a.visible,a.pagingCount=Math.ceil((a.count-a.visible)/a.move+1),a.last=a.pagingCount-1,a.limit=1===
 a.pagingCount?0:c.itemWidth>a.w?(a.itemW+2*d)*a.count-a.w-d:(a.itemW+d)*a.count-a.w-d):(a.itemW=a.w,a.pagingCount=a.count,a.last=a.count-1);a.computedW=a.itemW-a.boxPadding};a.update=function(b,d){a.doMath();h||(b<a.currentSlide?a.currentSlide+=1:b<=a.currentSlide&&0!==b&&(a.currentSlide-=1),a.animatingTo=a.currentSlide);if(c.controlNav&&!a.manualControls)if("add"===d&&!h||a.pagingCount>a.controlNav.length)f.controlNav.update("add");else if("remove"===d&&!h||a.pagingCount<a.controlNav.length)h&&a.currentSlide>
 a.last&&(a.currentSlide-=1,a.animatingTo-=1),f.controlNav.update("remove",a.last);c.directionNav&&f.directionNav.update()};a.addSlide=function(b,e){var f=d(b);a.count+=1;a.last=a.count-1;l&&m?void 0!==e?a.slides.eq(a.count-e).after(f):a.container.prepend(f):void 0!==e?a.slides.eq(e).before(f):a.container.append(f);a.update(e,"add");a.slides=d(c.selector+":not(.clone)",a);a.setup();c.added(a)};a.removeSlide=function(b){var e=isNaN(b)?a.slides.index(d(b)):b;a.count-=1;a.last=a.count-1;isNaN(b)?d(b,
 a.slides).remove():l&&m?a.slides.eq(a.last).remove():a.slides.eq(b).remove();a.doMath();a.update(e,"remove");a.slides=d(c.selector+":not(.clone)",a);a.setup();c.removed(a)};f.init()};d.flexslider.defaults={namespace:"flex-",selector:".slides > li",animation:"fade",easing:"swing",direction:"horizontal",reverse:!1,animationLoop:!0,smoothHeight:!1,startAt:0,slideshow:!0,slideshowSpeed:7E3,animationSpeed:600,initDelay:0,randomize:!1,pauseOnAction:!0,pauseOnHover:!1,useCSS:!0,touch:!0,video:!1,controlNav:!0,
 directionNav:!0,prevText:"Previous",nextText:"Next",keyboard:!0,multipleKeyboard:!1,mousewheel:!1,pausePlay:!1,pauseText:"Pause",playText:"Play",controlsContainer:"",manualControls:"",sync:"",asNavFor:"",itemWidth:0,itemMargin:0,minItems:0,maxItems:0,move:0,start:function(){},before:function(){},after:function(){},end:function(){},added:function(){},removed:function(){}};d.fn.flexslider=function(i){void 0===i&&(i={});if("object"===typeof i)return this.each(function(){var a=d(this),c=a.find(i.selector?
 i.selector:".slides > li");1===c.length?(c.fadeIn(400),i.start&&i.start(a)):void 0===a.data("flexslider")&&new d.flexslider(this,i)});var k=d(this).data("flexslider");switch(i){case "play":k.play();break;case "pause":k.pause();break;case "next":k.flexAnimate(k.getTarget("next"),!0);break;case "prev":case "previous":k.flexAnimate(k.getTarget("prev"),!0);break;default:"number"===typeof i&&k.flexAnimate(i,!0)}}})(jQuery);

/* Modernizr 2.5.2 (Custom Build) | MIT & BSD
 * Build: http://www.modernizr.com/download/#-touch-mq-cssclasses-addtest-teststyles-prefixes-ie8compat-load
 */
;window.Modernizr=function(a,b,c){function x(a){j.cssText=a}function y(a,b){return x(m.join(a+";")+(b||""))}function z(a,b){return typeof a===b}function A(a,b){return!!~(""+a).indexOf(b)}function B(a,b,d){for(var e in a){var f=b[a[e]];if(f!==c)return d===!1?a[e]:z(f,"function")?f.bind(d||b):f}return!1}var d="2.5.2",e={},f=!0,g=b.documentElement,h="modernizr",i=b.createElement(h),j=i.style,k,l={}.toString,m=" -webkit- -moz- -o- -ms- ".split(" "),n={},o={},p={},q=[],r=q.slice,s,t=function(a,c,d,e){var f,i,j,k=b.createElement("div"),l=b.body,m=l?l:b.createElement("body");if(parseInt(d,10))while(d--)j=b.createElement("div"),j.id=e?e[d]:h+(d+1),k.appendChild(j);return f=["&#173;","<style>",a,"</style>"].join(""),k.id=h,m.innerHTML+=f,m.appendChild(k),l||g.appendChild(m),i=c(k,a),l?k.parentNode.removeChild(k):m.parentNode.removeChild(m),!!i},u=function(b){var c=a.matchMedia||a.msMatchMedia;if(c)return c(b).matches;var d;return t("@media "+b+" { #"+h+" { position: absolute; } }",function(b){d=(a.getComputedStyle?getComputedStyle(b,null):b.currentStyle)["position"]=="absolute"}),d},v={}.hasOwnProperty,w;!z(v,"undefined")&&!z(v.call,"undefined")?w=function(a,b){return v.call(a,b)}:w=function(a,b){return b in a&&z(a.constructor.prototype[b],"undefined")},Function.prototype.bind||(Function.prototype.bind=function(b){var c=this;if(typeof c!="function")throw new TypeError;var d=r.call(arguments,1),e=function(){if(this instanceof e){var a=function(){};a.prototype=c.prototype;var f=new a,g=c.apply(f,d.concat(r.call(arguments)));return Object(g)===g?g:f}return c.apply(b,d.concat(r.call(arguments)))};return e});var C=function(c,d){var f=c.join(""),g=d.length;t(f,function(c,d){var f=b.styleSheets[b.styleSheets.length-1],h=f?f.cssRules&&f.cssRules[0]?f.cssRules[0].cssText:f.cssText||"":"",i=c.childNodes,j={};while(g--)j[i[g].id]=i[g];e.touch="ontouchstart"in a||a.DocumentTouch&&b instanceof DocumentTouch||(j.touch&&j.touch.offsetTop)===9},g,d)}([,["@media (",m.join("touch-enabled),("),h,")","{#touch{top:9px;position:absolute}}"].join("")],[,"touch"]);n.touch=function(){return e.touch};for(var D in n)w(n,D)&&(s=D.toLowerCase(),e[s]=n[D](),q.push((e[s]?"":"no-")+s));return e.addTest=function(a,b){if(typeof a=="object")for(var d in a)w(a,d)&&e.addTest(d,a[d]);else{a=a.toLowerCase();if(e[a]!==c)return e;b=typeof b=="function"?b():b,g.className+=" "+(b?"":"no-")+a,e[a]=b}return e},x(""),i=k=null,e._version=d,e._prefixes=m,e.mq=u,e.testStyles=t,g.className=g.className.replace(/(^|\s)no-js(\s|$)/,"$1$2")+(f?" js "+q.join(" "):""),e}(this,this.document),function(a,b,c){function d(a){return o.call(a)=="[object Function]"}function e(a){return typeof a=="string"}function f(){}function g(a){return!a||a=="loaded"||a=="complete"||a=="uninitialized"}function h(){var a=p.shift();q=1,a?a.t?m(function(){(a.t=="c"?B.injectCss:B.injectJs)(a.s,0,a.a,a.x,a.e,1)},0):(a(),h()):q=0}function i(a,c,d,e,f,i,j){function k(b){if(!o&&g(l.readyState)&&(u.r=o=1,!q&&h(),l.onload=l.onreadystatechange=null,b)){a!="img"&&m(function(){t.removeChild(l)},50);for(var d in y[c])y[c].hasOwnProperty(d)&&y[c][d].onload()}}var j=j||B.errorTimeout,l={},o=0,r=0,u={t:d,s:c,e:f,a:i,x:j};y[c]===1&&(r=1,y[c]=[],l=b.createElement(a)),a=="object"?l.data=c:(l.src=c,l.type=a),l.width=l.height="0",l.onerror=l.onload=l.onreadystatechange=function(){k.call(this,r)},p.splice(e,0,u),a!="img"&&(r||y[c]===2?(t.insertBefore(l,s?null:n),m(k,j)):y[c].push(l))}function j(a,b,c,d,f){return q=0,b=b||"j",e(a)?i(b=="c"?v:u,a,b,this.i++,c,d,f):(p.splice(this.i++,0,a),p.length==1&&h()),this}function k(){var a=B;return a.loader={load:j,i:0},a}var l=b.documentElement,m=a.setTimeout,n=b.getElementsByTagName("script")[0],o={}.toString,p=[],q=0,r="MozAppearance"in l.style,s=r&&!!b.createRange().compareNode,t=s?l:n.parentNode,l=!!b.attachEvent,u=r?"object":l?"script":"img",v=l?"script":u,w=Array.isArray||function(a){return o.call(a)=="[object Array]"},x=[],y={},z={timeout:function(a,b){return b.length&&(a.timeout=b[0]),a}},A,B;B=function(a){function b(a){var a=a.split("!"),b=x.length,c=a.pop(),d=a.length,c={url:c,origUrl:c,prefixes:a},e,f,g;for(f=0;f<d;f++)g=a[f].split("="),(e=z[g.shift()])&&(c=e(c,g));for(f=0;f<b;f++)c=x[f](c);return c}function g(a,e,f,g,i){var j=b(a),l=j.autoCallback;j.url.split(".").pop().split("?").shift(),j.bypass||(e&&(e=d(e)?e:e[a]||e[g]||e[a.split("/").pop().split("?")[0]]||h),j.instead?j.instead(a,e,f,g,i):(y[j.url]?j.noexec=!0:y[j.url]=1,f.load(j.url,j.forceCSS||!j.forceJS&&"css"==j.url.split(".").pop().split("?").shift()?"c":c,j.noexec,j.attrs,j.timeout),(d(e)||d(l))&&f.load(function(){k(),e&&e(j.origUrl,i,g),l&&l(j.origUrl,i,g),y[j.url]=2})))}function i(a,b){function c(a,c){if(a){if(e(a))c||(j=function(){var a=[].slice.call(arguments);k.apply(this,a),l()}),g(a,j,b,0,h);else if(Object(a)===a)for(n in m=function(){var b=0,c;for(c in a)a.hasOwnProperty(c)&&b++;return b}(),a)a.hasOwnProperty(n)&&(!c&&!--m&&(d(j)?j=function(){var a=[].slice.call(arguments);k.apply(this,a),l()}:j[n]=function(a){return function(){var b=[].slice.call(arguments);a&&a.apply(this,b),l()}}(k[n])),g(a[n],j,b,n,h))}else!c&&l()}var h=!!a.test,i=a.load||a.both,j=a.callback||f,k=j,l=a.complete||f,m,n;c(h?a.yep:a.nope,!!i),i&&c(i)}var j,l,m=this.yepnope.loader;if(e(a))g(a,0,m,0);else if(w(a))for(j=0;j<a.length;j++)l=a[j],e(l)?g(l,0,m,0):w(l)?B(l):Object(l)===l&&i(l,m);else Object(a)===a&&i(a,m)},B.addPrefix=function(a,b){z[a]=b},B.addFilter=function(a){x.push(a)},B.errorTimeout=1e4,b.readyState==null&&b.addEventListener&&(b.readyState="loading",b.addEventListener("DOMContentLoaded",A=function(){b.removeEventListener("DOMContentLoaded",A,0),b.readyState="complete"},0)),a.yepnope=k(),a.yepnope.executeStack=h,a.yepnope.injectJs=function(a,c,d,e,i,j){var k=b.createElement("script"),l,o,e=e||B.errorTimeout;k.src=a;for(o in d)k.setAttribute(o,d[o]);c=j?h:c||f,k.onreadystatechange=k.onload=function(){!l&&g(k.readyState)&&(l=1,c(),k.onload=k.onreadystatechange=null)},m(function(){l||(l=1,c(1))},e),i?k.onload():n.parentNode.insertBefore(k,n)},a.yepnope.injectCss=function(a,c,d,e,g,i){var e=b.createElement("link"),j,c=i?h:c||f;e.href=a,e.rel="stylesheet",e.type="text/css";for(j in d)e.setAttribute(j,d[j]);g||(n.parentNode.insertBefore(e,n),m(c,0))}}(this,document),Modernizr.load=function(){yepnope.apply(window,[].slice.call(arguments,0))},Modernizr.addTest("ie8compat",function(){return!window.addEventListener&&document.documentMode&&document.documentMode===7});

