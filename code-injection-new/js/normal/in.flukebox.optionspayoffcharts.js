






/*******************************
 ***				         ***
 ***      Document Ready     ***
 ***				         ***
 *******************************/
var _FXQUEUE = _FXQUEUE || [];
var LOGGER_TYPES = {"DEBUG":0, "INFO":1, "WARN": 2, "ERROR":3};
var GLOBAL_LOGGER_TYPE = "DEBUG";
var GLOBAL_KEYBASE = "OPTION_PAYOFF_CHART_DATA"
var LOCAL_STORAGE = false;

var DEFAULT_STRATEGIES ={"Bull Put Spread":[{"stockname":"DLF","lotsize":1000,"numlots":1,"optiontype":"Put","optionprice":12,"strikeprice":250,"range":10,"step":3,"rangemax":275,"rangemin":225,"buy":false,"name":" Sold DLF (1x1000) Put, Strike = 250, Cost = 12","data":[[225,-13000],[228,-10000],[231,-7000],[234,-4000],[237,-1000],[238,0],[240,2000],[243,5000],[246,8000],[249,11000],[250,12000],[252,12000],[255,12000],[258,12000],[261,12000],[264,12000],[267,12000],[270,12000],[273,12000]],"xdata":[225,228,231,234,237,238,240,243,246,249,250,252,255,258,261,264,267,270,273]},{"stockname":"DLF","lotsize":1000,"numlots":1,"optiontype":"Put","optionprice":4,"strikeprice":230,"range":10,"step":2,"rangemax":253,"rangemin":207,"buy":true,"name":" Bought DLF (1x1000) Put, Strike = 230, Cost = 4","data":[[207,19000],[209,17000],[211,15000],[213,13000],[215,11000],[217,9000],[219,7000],[221,5000],[223,3000],[225,1000],[226,0],[227,-1000],[229,-3000],[230,-4000],[231,-4000],[233,-4000],[235,-4000],[237,-4000],[239,-4000],[241,-4000],[243,-4000],[245,-4000],[247,-4000],[249,-4000],[251,-4000],[253,-4000]],"xdata":[207,209,211,213,215,217,219,221,223,225,226,227,229,230,231,233,235,237,239,241,243,245,247,249,251,253]}],"Bull Call Spread":[{"stockname":"DLF","lotsize":1000,"numlots":1,"optiontype":"Call","optionprice":12,"strikeprice":250,"range":10,"step":3,"rangemax":275,"rangemin":225,"buy":true,"name":" Bought DLF (1x1000) Call, Strike = 250, Cost = 12","data":[[225,-12000],[228,-12000],[231,-12000],[234,-12000],[237,-12000],[240,-12000],[243,-12000],[246,-12000],[249,-12000],[250,-12000],[252,-10000],[255,-7000],[258,-4000],[261,-1000],[262,0],[264,2000],[267,5000],[270,8000],[273,11000]],"xdata":[225,228,231,234,237,240,243,246,249,250,252,255,258,261,262,264,267,270,273]},{"stockname":"DLF","lotsize":1000,"numlots":1,"optiontype":"Call","optionprice":4,"strikeprice":270,"range":10,"step":3,"rangemax":297,"rangemin":243,"buy":false,"name":" Sold DLF (1x1000) Call, Strike = 270, Cost = 4","data":[[243,4000],[246,4000],[249,4000],[252,4000],[255,4000],[258,4000],[261,4000],[264,4000],[267,4000],[270,4000],[273,1000],[274,0],[276,-2000],[279,-5000],[282,-8000],[285,-11000],[288,-14000],[291,-17000],[294,-20000],[297,-23000]],"xdata":[243,246,249,252,255,258,261,264,267,270,273,274,276,279,282,285,288,291,294,297]}],"Call Backspread":[{"stockname":"TATAMOTORS","lotsize":1000,"numlots":1,"optiontype":"Call","optionprice":15,"strikeprice":270,"range":10,"step":3,"rangemax":297,"rangemin":243,"buy":false,"name":" Sold TATAMOTORS (1x1000) Call, Strike = 270, Cost = 15","data":[[243,15000],[246,15000],[249,15000],[252,15000],[255,15000],[258,15000],[261,15000],[264,15000],[267,15000],[270,15000],[273,12000],[276,9000],[279,6000],[282,3000],[285,0],[288,-3000],[291,-6000],[294,-9000],[297,-12000]],"xdata":[243,246,249,252,255,258,261,264,267,270,273,276,279,282,285,288,291,294,297]},{"stockname":"TATAMOTORS","lotsize":1000,"numlots":2,"optiontype":"Call","optionprice":3,"strikeprice":290,"range":10,"step":3,"rangemax":319,"rangemin":261,"buy":true,"name":" Bought TATAMOTORS (2x1000) Call, Strike = 290, Cost = 3","data":[[261,-6000],[264,-6000],[267,-6000],[270,-6000],[273,-6000],[276,-6000],[279,-6000],[282,-6000],[285,-6000],[288,-6000],[290,-6000],[291,-4000],[293,0],[294,2000],[297,8000],[300,14000],[303,20000],[306,26000],[309,32000],[312,38000],[315,44000],[318,50000]],"xdata":[261,264,267,270,273,276,279,282,285,288,290,291,293,294,297,300,303,306,309,312,315,318]}],"Put Backspread":[{"stockname":"BHEL","lotsize":1000,"numlots":1,"optiontype":"Put","optionprice":10,"strikeprice":200,"range":10,"step":2,"rangemax":220,"rangemin":180,"buy":false,"name":" Sold BHEL (1x1000) Put, Strike = 200, Cost = 10","data":[[180,-10000],[182,-8000],[184,-6000],[186,-4000],[188,-2000],[190,0],[192,2000],[194,4000],[196,6000],[198,8000],[200,10000],[202,10000],[204,10000],[206,10000],[208,10000],[210,10000],[212,10000],[214,10000],[216,10000],[218,10000],[220,10000]],"xdata":[180,182,184,186,188,190,192,194,196,198,200,202,204,206,208,210,212,214,216,218,220]},{"stockname":"BHEL","lotsize":1000,"numlots":2,"optiontype":"Put","optionprice":2,"strikeprice":180,"range":10,"step":2,"rangemax":198,"rangemin":162,"buy":true,"name":" Bought BHEL (2x1000) Put, Strike = 180, Cost = 2","data":[[162,32000],[164,28000],[166,24000],[168,20000],[170,16000],[172,12000],[174,8000],[176,4000],[178,0],[180,-4000],[182,-4000],[184,-4000],[186,-4000],[188,-4000],[190,-4000],[192,-4000],[194,-4000],[196,-4000],[198,-4000]],"xdata":[162,164,166,168,170,172,174,176,178,180,182,184,186,188,190,192,194,196,198]}],"Bearish Synthetic Short":[{"stockname":"LICHSGFIN","lotsize":1000,"numlots":1,"optiontype":"Put","optionprice":10,"strikeprice":230,"range":10,"step":2,"rangemax":253,"rangemin":207,"buy":true,"name":" Bought LICHSGFIN (1x1000) Put, Strike = 230, Cost = 10","data":[[207,13000],[209,11000],[211,9000],[213,7000],[215,5000],[217,3000],[219,1000],[220,0],[221,-1000],[223,-3000],[225,-5000],[227,-7000],[229,-9000],[230,-10000],[231,-10000],[233,-10000],[235,-10000],[237,-10000],[239,-10000],[241,-10000],[243,-10000],[245,-10000],[247,-10000],[249,-10000],[251,-10000],[253,-10000]],"xdata":[207,209,211,213,215,217,219,220,221,223,225,227,229,230,231,233,235,237,239,241,243,245,247,249,251,253]},{"stockname":"LICHSGFIN","lotsize":1000,"numlots":1,"optiontype":"Call","optionprice":3,"strikeprice":230,"range":10,"step":2,"rangemax":253,"rangemin":207,"buy":false,"name":" Sold LICHSGFIN (1x1000) Call, Strike = 230, Cost = 3","data":[[207,3000],[209,3000],[211,3000],[213,3000],[215,3000],[217,3000],[219,3000],[221,3000],[223,3000],[225,3000],[227,3000],[229,3000],[230,3000],[231,2000],[233,0],[235,-2000],[237,-4000],[239,-6000],[241,-8000],[243,-10000],[245,-12000],[247,-14000],[249,-16000],[251,-18000],[253,-20000]],"xdata":[207,209,211,213,215,217,219,221,223,225,227,229,230,231,233,235,237,239,241,243,245,247,249,251,253]}],"Bullish Synthetic Long":[{"stockname":"NIFTY","lotsize":50,"numlots":1,"optiontype":"Call","optionprice":60,"strikeprice":5600,"range":10,"step":56,"rangemax":6160,"rangemin":5040,"buy":true,"name":" Bought NIFTY (1x50) Call, Strike = 5600, Cost = 60","data":[[5040,-3000],[5096,-3000],[5152,-3000],[5208,-3000],[5264,-3000],[5320,-3000],[5376,-3000],[5432,-3000],[5488,-3000],[5544,-3000],[5600,-3000],[5656,-200],[5660,0],[5712,2600],[5768,5400],[5824,8200],[5880,11000],[5936,13800],[5992,16600],[6048,19400],[6104,22200],[6160,25000]],"xdata":[5040,5096,5152,5208,5264,5320,5376,5432,5488,5544,5600,5656,5660,5712,5768,5824,5880,5936,5992,6048,6104,6160]},{"stockname":"NIFTY","lotsize":50,"numlots":1,"optiontype":"Put","optionprice":80,"strikeprice":5600,"range":10,"step":56,"rangemax":6160,"rangemin":5040,"buy":false,"name":" Sold NIFTY (1x50) Put, Strike = 5600, Cost = 80","data":[[5040,-24000],[5096,-21200],[5152,-18400],[5208,-15600],[5264,-12800],[5320,-10000],[5376,-7200],[5432,-4400],[5488,-1600],[5520,0],[5544,1200],[5600,4000],[5656,4000],[5712,4000],[5768,4000],[5824,4000],[5880,4000],[5936,4000],[5992,4000],[6048,4000],[6104,4000],[6160,4000]],"xdata":[5040,5096,5152,5208,5264,5320,5376,5432,5488,5520,5544,5600,5656,5712,5768,5824,5880,5936,5992,6048,6104,6160]}],"Covered Calls":[{"stockname":"JPASSOCIAT","lotsize":4000,"numlots":1,"optiontype":"Call","optionprice":3,"strikeprice":70,"range":15,"step":0.75,"rangemax":81,"rangemin":60,"buy":false,"name":" Sold JPASSOCIAT (1x4000) Call, Strike = 70, Cost = 3","data":[[60,12000],[60.75,12000],[61.5,12000],[62.25,12000],[63,12000],[63.75,12000],[64.5,12000],[65.25,12000],[66,12000],[66.75,12000],[67.5,12000],[68.25,12000],[69,12000],[69.75,12000],[70,12000],[70.5,10000],[71.25,7000],[72,4000],[72.75,1000],[73,0],[73.5,-2000],[74.25,-5000],[75,-8000],[75.75,-11000],[76.5,-14000],[77.25,-17000],[78,-20000],[78.75,-23000],[79.5,-26000],[80.25,-29000],[81,-32000]],"xdata":[60,60.75,61.5,62.25,63,63.75,64.5,65.25,66,66.75,67.5,68.25,69,69.75,70,70.5,71.25,72,72.75,73,73.5,74.25,75,75.75,76.5,77.25,78,78.75,79.5,80.25,81]},{"stockname":"JPASSOCIAT","lotsize":4000,"numlots":1,"optiontype":"Future","optionprice":71,"strikeprice":70,"range":15,"step":0.75,"rangemax":81,"rangemin":60,"buy":true,"name":" Bought JPASSOCIAT (1x4000) Future, Cost = 71","data":[[60,-44000],[60.75,-41000],[61.5,-38000],[62.25,-35000],[63,-32000],[63.75,-29000],[64.5,-26000],[65.25,-23000],[66,-20000],[66.75,-17000],[67.5,-14000],[68.25,-11000],[69,-8000],[69.75,-5000],[70.5,-2000],[71,0],[71.25,1000],[72,4000],[72.75,7000],[73.5,10000],[74.25,13000],[75,16000],[75.75,19000],[76.5,22000],[77.25,25000],[78,28000],[78.75,31000],[79.5,34000],[80.25,37000],[81,40000]],"xdata":[60,60.75,61.5,62.25,63,63.75,64.5,65.25,66,66.75,67.5,68.25,69,69.75,70.5,71,71.25,72,72.75,73.5,74.25,75,75.75,76.5,77.25,78,78.75,79.5,80.25,81]}],"Covered Put":[{"stockname":"JPASSOCIAT","lotsize":4000,"numlots":1,"optiontype":"Put","optionprice":3,"strikeprice":70,"range":15,"step":0.75,"rangemax":81,"rangemin":60,"buy":false,"name":" Sold JPASSOCIAT (1x4000) Put, Strike = 70, Cost = 3","data":[[60,-28000],[60.75,-25000],[61.5,-22000],[62.25,-19000],[63,-16000],[63.75,-13000],[64.5,-10000],[65.25,-7000],[66,-4000],[66.75,-1000],[67,0],[67.5,2000],[68.25,5000],[69,8000],[69.75,11000],[70,12000],[70.5,12000],[71.25,12000],[72,12000],[72.75,12000],[73.5,12000],[74.25,12000],[75,12000],[75.75,12000],[76.5,12000],[77.25,12000],[78,12000],[78.75,12000],[79.5,12000],[80.25,12000],[81,12000]],"xdata":[60,60.75,61.5,62.25,63,63.75,64.5,65.25,66,66.75,67,67.5,68.25,69,69.75,70,70.5,71.25,72,72.75,73.5,74.25,75,75.75,76.5,77.25,78,78.75,79.5,80.25,81]},{"stockname":"JPASSOCIAT","lotsize":4000,"numlots":1,"optiontype":"Future","optionprice":69,"strikeprice":70,"range":15,"step":0.75,"rangemax":81,"rangemin":60,"buy":false,"name":" Sold JPASSOCIAT (1x4000) Future, Cost = 69","data":[[60,36000],[60.75,33000],[61.5,30000],[62.25,27000],[63,24000],[63.75,21000],[64.5,18000],[65.25,15000],[66,12000],[66.75,9000],[67.5,6000],[68.25,3000],[69,0],[69.75,-3000],[70.5,-6000],[71.25,-9000],[72,-12000],[72.75,-15000],[73.5,-18000],[74.25,-21000],[75,-24000],[75.75,-27000],[76.5,-30000],[77.25,-33000],[78,-36000],[78.75,-39000],[79.5,-42000],[80.25,-45000],[81,-48000]],"xdata":[60,60.75,61.5,62.25,63,63.75,64.5,65.25,66,66.75,67.5,68.25,69,69.75,70.5,71.25,72,72.75,73.5,74.25,75,75.75,76.5,77.25,78,78.75,79.5,80.25,81]}],"Call Ratio Spread":[{"stockname":"NTPC","lotsize":1000,"numlots":1,"optiontype":"Call","optionprice":5,"strikeprice":140,"range":15,"step":1,"rangemax":161,"rangemin":119,"buy":true,"name":" Bought NTPC (1x1000) Call, Strike = 140, Cost = 5","data":[[119,-5000],[120,-5000],[121,-5000],[122,-5000],[123,-5000],[124,-5000],[125,-5000],[126,-5000],[127,-5000],[128,-5000],[129,-5000],[130,-5000],[131,-5000],[132,-5000],[133,-5000],[134,-5000],[135,-5000],[136,-5000],[137,-5000],[138,-5000],[139,-5000],[140,-5000],[141,-4000],[142,-3000],[143,-2000],[144,-1000],[145,0],[146,1000],[147,2000],[148,3000],[149,4000],[150,5000],[151,6000],[152,7000],[153,8000],[154,9000],[155,10000],[156,11000],[157,12000],[158,13000],[159,14000],[160,15000],[161,16000]],"xdata":[119,120,121,122,123,124,125,126,127,128,129,130,131,132,133,134,135,136,137,138,139,140,141,142,143,144,145,146,147,148,149,150,151,152,153,154,155,156,157,158,159,160,161]},{"stockname":"NTPC","lotsize":1000,"numlots":2,"optiontype":"Call","optionprice":2,"strikeprice":145,"range":15,"step":1,"rangemax":167,"rangemin":123,"buy":false,"name":" Sold NTPC (2x1000) Call, Strike = 145, Cost = 2","data":[[123,4000],[124,4000],[125,4000],[126,4000],[127,4000],[128,4000],[129,4000],[130,4000],[131,4000],[132,4000],[133,4000],[134,4000],[135,4000],[136,4000],[137,4000],[138,4000],[139,4000],[140,4000],[141,4000],[142,4000],[143,4000],[144,4000],[145,4000],[146,2000],[147,0],[148,-2000],[149,-4000],[150,-6000],[151,-8000],[152,-10000],[153,-12000],[154,-14000],[155,-16000],[156,-18000],[157,-20000],[158,-22000],[159,-24000],[160,-26000],[161,-28000],[162,-30000],[163,-32000],[164,-34000],[165,-36000],[166,-38000],[167,-40000]],"xdata":[123,124,125,126,127,128,129,130,131,132,133,134,135,136,137,138,139,140,141,142,143,144,145,146,147,148,149,150,151,152,153,154,155,156,157,158,159,160,161,162,163,164,165,166,167]}],"Put Ratio Spread":[{"stockname":"ITC","lotsize":1000,"numlots":1,"optiontype":"Put","optionprice":10,"strikeprice":300,"range":15,"step":3,"rangemax":345,"rangemin":255,"buy":true,"name":" Bought ITC (1x1000) Put, Strike = 300, Cost = 10","data":[[255,35000],[258,32000],[261,29000],[264,26000],[267,23000],[270,20000],[273,17000],[276,14000],[279,11000],[282,8000],[285,5000],[288,2000],[290,0],[291,-1000],[294,-4000],[297,-7000],[300,-10000],[303,-10000],[306,-10000],[309,-10000],[312,-10000],[315,-10000],[318,-10000],[321,-10000],[324,-10000],[327,-10000],[330,-10000],[333,-10000],[336,-10000],[339,-10000],[342,-10000],[345,-10000]],"xdata":[255,258,261,264,267,270,273,276,279,282,285,288,290,291,294,297,300,303,306,309,312,315,318,321,324,327,330,333,336,339,342,345]},{"stockname":"ITC","lotsize":1000,"numlots":2,"optiontype":"Put","optionprice":2,"strikeprice":280,"range":15,"step":3,"rangemax":322,"rangemin":238,"buy":false,"name":" Sold ITC (2x1000) Put, Strike = 280, Cost = 2","data":[[238,-80000],[241,-74000],[244,-68000],[247,-62000],[250,-56000],[253,-50000],[256,-44000],[259,-38000],[262,-32000],[265,-26000],[268,-20000],[271,-14000],[274,-8000],[277,-2000],[278,0],[280,4000],[283,4000],[286,4000],[289,4000],[292,4000],[295,4000],[298,4000],[301,4000],[304,4000],[307,4000],[310,4000],[313,4000],[316,4000],[319,4000],[322,4000]],"xdata":[238,241,244,247,250,253,256,259,262,265,268,271,274,277,278,280,283,286,289,292,295,298,301,304,307,310,313,316,319,322]}],"Long Strangle":[{"stockname":"HINDALCO","lotsize":1000,"numlots":1,"optiontype":"Call","optionprice":2,"strikeprice":100,"range":15,"step":1,"rangemax":115,"rangemin":85,"buy":true,"name":" Bought HINDALCO (1x1000) Call, Strike = 100, Cost = 2","data":[[85,-2000],[86,-2000],[87,-2000],[88,-2000],[89,-2000],[90,-2000],[91,-2000],[92,-2000],[93,-2000],[94,-2000],[95,-2000],[96,-2000],[97,-2000],[98,-2000],[99,-2000],[100,-2000],[101,-1000],[102,0],[103,1000],[104,2000],[105,3000],[106,4000],[107,5000],[108,6000],[109,7000],[110,8000],[111,9000],[112,10000],[113,11000],[114,12000],[115,13000]],"xdata":[85,86,87,88,89,90,91,92,93,94,95,96,97,98,99,100,101,102,103,104,105,106,107,108,109,110,111,112,113,114,115]},{"stockname":"HINDALCO","lotsize":1000,"numlots":1,"optiontype":"Put","optionprice":1,"strikeprice":80,"range":15,"step":1,"rangemax":92,"rangemin":68,"buy":true,"name":" Bought HINDALCO (1x1000) Put, Strike = 80, Cost = 1","data":[[68,11000],[69,10000],[70,9000],[71,8000],[72,7000],[73,6000],[74,5000],[75,4000],[76,3000],[77,2000],[78,1000],[79,0],[80,-1000],[81,-1000],[82,-1000],[83,-1000],[84,-1000],[85,-1000],[86,-1000],[87,-1000],[88,-1000],[89,-1000],[90,-1000],[91,-1000],[92,-1000]],"xdata":[68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89,90,91,92]}],"Short Strangle":[{"stockname":"HINDALCO","lotsize":1000,"numlots":1,"optiontype":"Call","optionprice":2,"strikeprice":100,"range":15,"step":1,"rangemax":115,"rangemin":85,"buy":false,"name":" Sold HINDALCO (1x1000) Call, Strike = 100, Cost = 2","data":[[85,2000],[86,2000],[87,2000],[88,2000],[89,2000],[90,2000],[91,2000],[92,2000],[93,2000],[94,2000],[95,2000],[96,2000],[97,2000],[98,2000],[99,2000],[100,2000],[101,1000],[102,0],[103,-1000],[104,-2000],[105,-3000],[106,-4000],[107,-5000],[108,-6000],[109,-7000],[110,-8000],[111,-9000],[112,-10000],[113,-11000],[114,-12000],[115,-13000]],"xdata":[85,86,87,88,89,90,91,92,93,94,95,96,97,98,99,100,101,102,103,104,105,106,107,108,109,110,111,112,113,114,115]},{"stockname":"HINDALCO","lotsize":1000,"numlots":1,"optiontype":"Put","optionprice":1,"strikeprice":80,"range":15,"step":1,"rangemax":92,"rangemin":68,"buy":false,"name":" Sold HINDALCO (1x1000) Put, Strike = 80, Cost = 1","data":[[68,-11000],[69,-10000],[70,-9000],[71,-8000],[72,-7000],[73,-6000],[74,-5000],[75,-4000],[76,-3000],[77,-2000],[78,-1000],[79,0],[80,1000],[81,1000],[82,1000],[83,1000],[84,1000],[85,1000],[86,1000],[87,1000],[88,1000],[89,1000],[90,1000],[91,1000],[92,1000]],"xdata":[68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89,90,91,92]}]};


$( document ).on("pageinit", "div#welcome", function( event, data ){
	logger("DEBUG", "pageinit, div#welcome!");

	/* Execute any queued function here */
	while(_FXQUEUE.length>0){
		_FXQUEUE.pop()();
	}
	
	/** init storage **/
	initStorage(GLOBAL_KEYBASE);
	 
	/** go to homepage **/
	$("button#home").on("click", function(e){
		$.mobile.changePage("#welcome");
	});

	/** open the panel **/
	$("button#add-position").on("click", function(e){
		$("div#panel-right").panel("open");
	});

	/** open the panel **/
	$("button#modify").on("click", function(e){
		$("div#panel-left").panel("open");
	});

	
	/** Attache handler for storage chagne event **/
	$(window).on("storage", function(e){
		logger("DEBUG", "Hey, storage event is called ;)"+e);
	});

	/** populate from default **/
	populateDefaultList();
	
	/** populate saved list **/
	populateSavedList();

	// checkbox radio
	$("input[name='callput'], input[name='buysell']").checkboxradio();
	
	
	/** list click on saved strategy **/
	$(document).on("click", "div#delete-page div:jqmData(role='content') a:nth-child(1)",  function(e){
		logger("DEBUG", "li>a in saved-strategy-list clicked !!!");
		var key = $(this).html();
		RestoreChart(key);		
	});

	/** list click on default strategy **/
	$(document).on("click", "div#default-page div:jqmData(role='content') a:nth-child(1)",  function(e){
		logger("DEBUG", "li>a in default-strategy-list clicked !!!");
		var key = $(this).html();
		RestoreChart(key, true);		
	});

	/** list click on saved strategy **/
	$(document).on("click", "div#delete-page div:jqmData(role='content') a.delete",  function(e){
		logger("DEBUG", "a.delete in div#delete-page clicked !!!");
	    // Show the confirmation popup
	    $("div#confirm").popup("open");
	    $("div#confirm").jqmData("index", $(this).parent("li").index());
	    $("div#confirm").jqmData("key", $(this).parent("li").find("a:eq(0)").html());
	});

    // Proceed when the user confirms
    $( "#confirm #yes" ).on( "click", function() {
    	var key = $("#confirm").jqmData("key");
    	var index = $("#confirm").jqmData("index");
		logger("DEBUG", "#confirm #yes with key'"+key+"', index='"+index+"' !!!");
    	deleteKey(key);
    	// remove from list 
    	$("div#delete-page div:jqmData(role='content') li:eq('"+index+"')").remove();
	    $("#confirm").popup( "close" );

		// refresh page
		$("div#saved-strategy-list ul").listview("refresh");
		
		if($("div#saved-strategy-list ul li").length<1){
			$("a#open-from-saved").addClass("ui-disabled");
		}
    
    });
    
    // Remove active state and unbind when the cancel button is clicked
    $( "#confirm #cancel" ).on( "click", function() {
	    $( "#confirm" ).popup( "close" );
    });
	
	/** bin reset click event **/
    $("div#inputform input#buy, div#inputform input#sell").on("click", function(){
		logger("DEBUG", "inputform clicked on "+$(this).attr("id")+" !!!");
    	/** validate **/
		var parent = "div#inputform";
    	var errmsg = validate(parent);
    	if(errmsg){
    		showErrorMsg(errmsg, parent);
    	}else{
    		// set from where it is called
			$("#chartpage").jqmData("called-from", "inputform");
    		$.mobile.changePage("#chartpage");
    	}
	});

    
    $("div#inputform input[name='callput']").on("change", function(e){
    	if($(this).val()=="Future"){
    		$($(this).parents("div:jqmData(role='content')")).find("input[name='strikeprice']").parents("div.ui-block-b").addClass("ui-disabled");
    	}else{
    		$($(this).parents("div:jqmData(role='content')")).find("input[name='strikeprice']").parents("div.ui-block-b").removeClass("ui-disabled");
    	}
    });

    $("div#panel-right input[name='callput']").on("change", function(e){
    	if($(this).val()=="Future"){
    		$($(this).parents("div:jqmData(role='panel')")).find("input[name='strikeprice']").addClass("ui-disabled");
    		$($(this).parents("div:jqmData(role='panel')")).find("input[name='strikeprice']").parent().prev().addClass("ui-disabled");
    	}else{
    		$($(this).parents("div:jqmData(role='panel')")).find("input[name='strikeprice']").removeClass("ui-disabled");
    		$($(this).parents("div:jqmData(role='panel')")).find("input[name='strikeprice']").parent().prev().removeClass("ui-disabled");
    	}
    });

    
    /** on show **/
	$("#chartpage").on("pageshow", function(e,d){
		logger("DEBUG", "#chartpage opened on event "+e+" !!!");
		/** add go-to-chart button and re-create page **/
		createGotoChartButton();

		// set from where it is called
		var calledFrom = $("#chartpage").jqmData("called-from");
		// clear the data
		$("#chartpage").jqmRemoveData("called-from");
		if(calledFrom && calledFrom == "inputform") {
			
			charting("Derivatives Pay Off Chart for " + $("input[name='stockname']", "div#inputform").val());
			chartRedraw("div#inputform", "div#panel-right");
		}else if(calledFrom && calledFrom == "restorechart") {
			var chartname = $("#chartpage").jqmData("chartname");
			var parent = $("div#chartpage");
			var chartdetails = $("#chartpage").jqmData("chartdetails");;
			charting("Derivatives Pay Off Chart for " +chartname +", Underlying Stock ('"+chartdetails[0].stockname+"')");	
			
			// fill up stock name in panel
			$("input[name='stockname']", parent).val(chartdetails[0].stockname);
			$("input[name='stockname']", parent).addClass("ui-disabled");	
			$("input[name='cost']", parent).val(chartdetails[0].optionprice);
			if(chartdetails[0].strikeprice){
				$("input[name='strikeprice']", parent).val(chartdetails[0].strikeprice);
			}
			$("select[name='lotsize']", parent).val(chartdetails[0].lotsize);
			$("select[name='numlots']", parent).val(chartdetails[0].numlots);
			$("select[name='step']", parent).val(chartdetails[0].step);
			$("input[name='range']", parent).val(chartdetails[0].range);

			// draw chart
			$.each(chartdetails, function(i, d){
				drawChartWithGivenData(d);
			});			
		}
	});

	/** redraw the chart **/
    $("div#chartpage input#pbuy, div#chartpage input#psell").on("click", function(){
		logger("DEBUG", "panel form clicked on "+$(this).attr("id")+" !!!");
		var parent = "div#chartpage";
    	var errmsg = validate(parent);
    	if(errmsg){
    		showErrorMsg(errmsg, parent);
    	}else{
    		chartRedraw("div#panel-right");
    	}
	});
	
    
    /** save chart clicked **/
    $("button#save").on("click", function(){
    	logger("DEBUG", "save clicked!!!");
    	$("div.strategyname-popup").popup("open");
    	
    });
    
    /** save chart with given name **/
    $("button#strategy-save").on("click", function(){
    	var strategyname = $("input#strategyname").val();
    	logger("DEBUG", "Saving strategy with name "+ strategyname);
    	if(strategyname){
        	$("div.strategyname-popup").popup("close");
    		SaveChart(strategyname);
    	}else{
    		var errmsg = "Strategy name can not be blank";
    		showErrorMsg(errmsg)
    	}
    });
	
    /** Attach  event to leg details selection **/
    $("div#chartpage div#panel-left fieldset").on( "change", "input[type='checkbox']",  function(e){
    	//update consolidate 
    	var cdata = UpdateOptionConsolidate1(chart.series.details.xdata, chart.series.details.consolidate.data,
    			$(this).is(":checked"), 
    			chart.series.details[$(this).attr("index")], chart.series.details.step, 
    			chart.series.details.rangemax, chart.series.details.rangemin);
    
    	// remove last consolidate series
		chart.series[0].remove();

    	chart.addSeries({
    		name: "Consolidated Payoff",
    		data: cdata
    	});

    	// Store consolidate chart details
    	chart.series.details.consolidate = {name:" Consolidated Payoff ", data:cdata}
    });
    
});


function createGotoChartButton(){
	if($("a#go-to-current-chart").length<1){
		logger("DEBUG", "Creating a go-to-chart button on welcome page.");
		$("div#welcome div:jqmData(role='content') a:last").after('<a href="#chartpage" data-role="button" '
				+' id="go-to-current-chart">Go To Current Strategy</a>');
		$("div#welcome").trigger("create");
	}
}

/* Do Chartin here */
function charting(title){
	logger("DEBUG", "charting called with title="+title+" !!!");
	// if chart already exists, update it
	if(!(typeof chart === 'undefined')){
		logger("DEBUG", "updating title of the chart !!!");
		chart.setTitle({text:title});
		// remove chart details 
		delete chart.series.details
		// remove current series
		while(chart.series.length>0){
			chart.series[0].remove();
		}
		// clear leg details
		clearLegDetails();
	}else{
		logger("DEBUG", "chart not defined creating new chart !!!");
	    chart = new Highcharts.Chart({
	        chart: {
	            renderTo: 'container',
	            type: 'line'
	        },
	        title: {
	            text: title
	        },
	        xAxis: {
	        	gridwidth:1,
	            title: {
	                text: 'StockPrice'
	            }
	        },
	        yAxis: {
	        	gridwidth:1,
	            title: {
	                text: 'Payoff'
	            },
	        },
	        tooltip: {
                crosshairs: [{width:1, color:'blue'},{width:1, color:'blue'}],
                shared: true,
	        	formatter: function() {
                    var s = '<b> 	StockPrice : '+ Highcharts.numberFormat(this.x,2) +'</b><br/>';
                    $.each(this.points, function(i, point) {
                    	s +='<b>PayOff : '+Highcharts.numberFormat(this.y,2)+"</b>";
                    });
                    return s;
	            },
	        	valueDecimals:2
	        },
	    });
	}
}

/**
 * Validate the chart input
 * @param parent
 * @returns
 */
function validate(parent){
	logger("DEBUG", "validate called !!!");
	var stockname = $("input[name='stockname']", parent).val();
	var optionprice = parseFloat($("input[name='cost']", parent).val());
	var strikeprice = parseFloat($("input[name='strikeprice']", parent).val());
	var optiontype = $("input[name='callput']:checked", parent).val();
	var index = 0;
	var errmsg = "Please fill up the details correctly.<br>";
	if(!stockname || stockname == "" ){
		errmsg += (++index) + ". Stockname can't be blank.<br>"
	}

	if(!optiontype){
		errmsg += (++index) + ". Please choose derivative type (Call/Put/Future) .<br>"
	}

	if(!optionprice || optionprice < 0.05){
		errmsg += (++index) + ". Cost can't be blank or less then 0.05 .<br>"
	}
		
	if(optiontype != "Future" && (!strikeprice || strikeprice < 1.0 )){
		errmsg += (++index) + ". Strikeprice can't be blank or less then 1 .<br>"
	}	
	return index>0?errmsg:null;
}

function fillDefaultValues(parent, parent_){
	/** put values in the panel **/
	$("input[name='stockname']", parent_).val($("input[name='stockname']", parent).val());
	$("input[name='stockname']", parent_).addClass("ui-disabled");	
	$("input[name='cost']", parent_).val(parseFloat($("input[name='cost']", parent).val()));
	if($("input[name='strikeprice']", parent).val()){
		$("input[name='strikeprice']", parent_).val(parseFloat($("input[name='strikeprice']", parent).val()));
	}
	$("select[name='lotsize']", parent_).val(parseInt($("select[name='lotsize']", parent).val()));
	$("select[name='numlots']", parent_).val(parseInt($("select[name='numlots']", parent).val()));
	$("select[name='step']", parent_).val(parseFloat($("select[name='step']", parent).val()));
	$("input[name='range']", parent_).val(parseFloat($("input[name='range']", parent).val()));
}




/**
 *  Redraw the chart with given input 
 * @param parent
 */
function chartRedraw(parent, parent_){	
	logger("DEBUG", "chartRedraw called !!!");
	
	var stockname = $("input[name='stockname']", parent).val();
	var optiontype = $("input[name='callput']:checked", parent).val();
	var optionprice = parseFloat($("input[name='cost']", parent).val());
	var strikeprice = parseFloat($("input[name='strikeprice']", parent).val());
	var lotsize = parseInt($("select[name='lotsize']", parent).val());
	var numlots = parseInt($("select[name='numlots']", parent).val());
	var step = parseFloat($("input[name='step']", parent).val())*0.01;
	var range = parseFloat($("input[name='range']", parent).val());
	var buy =  $("input[name='buysell']:checked", parent).val() == "Buy";
	
	if( optiontype!="Future" ){
		step = step * strikeprice
	}else{
		step = step * optionprice
	}
	
	if(step>1) step = Math.round(step);
	else if(step<0.25) step=0.25;
	else if(step>0.25 && step<0.50) step = 0.50;
	else if(step>0.50 && step<0.75) step = 0.75; 
	else if(step>0.75 && step<1) step = 1;
	
	logger("DEBUG", "chartRedraw called step is ="+step+"!!!");
	
	var rangemin = Math.round(strikeprice?strikeprice*(1-range/100):optionprice*(1-range/100));
	var rangemax = Math.round(strikeprice?strikeprice*(1+range/100):optionprice*(1+range/100));
	
	
	var name = (buy?" Bought ":" Sold ")+stockname+" ("+numlots+"x"+lotsize+") "+optiontype+(optiontype!="Future"?", Strike = "+ strikeprice:"")+", Cost = "+optionprice;
	var xdata = xPoints(rangemin, rangemax, step, strikeprice, optiontype, optionprice);
	var data = Option(xdata, strikeprice, optionprice, step, optiontype, buy, numlots, lotsize);

	var details = {	
				"stockname":stockname, "lotsize":lotsize, "numlots":numlots,
				"optiontype":optiontype,"optionprice":optionprice, "strikeprice":strikeprice,
				"range":range, "step":step, "rangemax":rangemax, "rangemin":rangemin, "buy":buy,
				"name":name, "data": data, "xdata":xdata};
	
	// draw chart
	drawChartWithGivenData(details);

	// fill up the values if needed
	if(parent_) fillDefaultValues(parent, parent_);
	// remove buy/sell checked
	$("input[name='buysell']:checked").removeAttr("checked");
	$("input[name='buysell']").checkboxradio("refresh");

}


function matchArrays(arr1, arr2){
	if(arr1.length!=arr2.length) return false;
	for(var i=0; i<arr1.length; i++){
		if(arr1[i]!=arr2[i]) return false;
	}
	return true;
}

/**
 * Draw chart with given details
 * @param details
 */
function drawChartWithGivenData(details){	
	logger("DEBUG", "drawChartWithGivenData called !!!");
	var cdata = details.data;
	var fullupdate  = 0;
	// add Leg Details 
	addLegDetails(details);

	// remove last consolidate series
	if(chart.series.length>0){
		fullupdate++;
		chart.series[0].remove();
		//update rangmin/max and setp
		if(chart.series.details.rangemin>details.rangemin){
			chart.series.details.rangemin=details.rangemin;
			fullupdate++;
		}
		if(chart.series.details.rangemax<details.rangemax){
			chart.series.details.rangemax=details.rangemax;
			fullupdate++;
		}
		if(chart.series.details.step>details.step){
			chart.series.details.step=details.step;
			fullupdate++;
		}		
		if(!matchArrays(chart.series.details.xdata, details.xdata)){
			fullupdate++;
		}
	}else{
		chart.series.details=[]
		chart.series.details.rangemin = details.rangemin
		chart.series.details.rangemax = details.rangemax
		chart.series.details.step = details.step
		chart.series.details.xdata = details.xdata
	}

	// push to details
	chart.series.details.push(details);

	if(fullupdate>1){
		// get xdata 
		chart.series.details.xdata = xPointsAll(chart.series.details, chart.series.details.step, 
				chart.series.details.rangemax, chart.series.details.rangemin);
		// consolidated data
		cdata = OptionConsolidate(chart.series.details.xdata, chart.series.details, 
				chart.series.details.step, chart.series.details.rangemax, chart.series.details.rangemin);

	}else if (fullupdate == 1){
		cdata = UpdateOptionConsolidate1(chart.series.details.xdata, chart.series.details.consolidate.data, true, details,
				 chart.series.details.step, chart.series.details.rangemax, chart.series.details.rangemin);
	}
	chart.addSeries({
		name: "Consolidated Payoff",
		data: cdata
	});

	// Store consolidate chart details
	chart.series.details.consolidate = {name:" Consolidated Payoff ", data:cdata}
}


function addLegDetails(details){
	var index =  $("div#chartpage div#panel-left fieldset input[type='checkbox']").length;
	$("div#chartpage div#panel-left fieldset").append('<label for="pcheckbox'+index+'">'+details.name+'</label>'
			+'<input type="checkbox" name="checkbox" id="pcheckbox'+index+'" index="'+index+'"data-mini="true" checked=true>');
	$("div#chartpage").trigger("create");
}

function clearLegDetails(){
	$("div#chartpage div#panel-left fieldset div.ui-checkbox").remove();
}


function xPoints(rangemin, rangemax, step, strikeprice, optiontype, optionprice){
	(!strikeprice)? strikeprice = optionprice:"";
	var xdata = [];
	for(i=rangemin;i<=rangemax;i+=step){
		xdata.push(i);
	}
	// add breakeven point
	if(optiontype=="Call"){
		xdata.push(strikeprice);
		xdata.push(strikeprice+optionprice);
	}else if (optiontype=="Put"){
		xdata.push(strikeprice);
		xdata.push(strikeprice-optionprice);
	}else if (optiontype=="Future"){
		xdata.push(optionprice);
	}
	return sortUnique(xdata);
}

function xPointsAll(details, step, rangemax, rangemin){
	var xdata = [];
	for(i=rangemin;i<=rangemax;i+=step){
		xdata.push(i);
	}
	
	$.each(details, function(i,d){
		// add breakeven point
		if(d.optiontype=="Call"){
			xdata.push(d.strikeprice);
			xdata.push(d.strikeprice+d.optionprice);
		}else if (d.optiontype=="Put"){
			xdata.push(d.strikeprice);
			xdata.push(d.strikeprice-d.optionprice);
		}else if (d.optiontype=="Future"){
			xdata.push(d.optionprice);
		}
	});
	return sortUnique(xdata);
}

function sortUnique(arr) {
    arr = arr.sort(function (a, b) { return a*1 - b*1; });
    var ret = [arr[0]];
    for (var i = 1; i < arr.length; i++) { // start loop at 1 as element 0 can never be a duplicate
        if (arr[i-1] !== arr[i]) {
            ret.push(arr[i]);
        }
    }
    return ret;
}

/** 
 * Calculate Chart data for given input 
 * @param xdata
 * @param strikeprice
 * @param optionprice
 * @param step
 * @param rangemax
 * @param rangemin
 * @param optiontype
 * @param buy
 * @param numlots
 * @param lotsize
 * @returns {Array}
 */
function Option(xdata, strikeprice, optionprice, step, optiontype/**Call/Put/Future**/, buy/**sell**/, numlots, lotsize){
	logger("DEBUG", "Option called !!!");
	var data=[];
	$.each(xdata, function(idx, i){
		var payoff = 0;
		if(optiontype=="Call"){
			if(buy){
				payoff += (i-(strikeprice+optionprice) > -optionprice ? i-(strikeprice+optionprice) : -optionprice);
			}else{
				payoff -= (i-(strikeprice+optionprice) > -optionprice ? i-(strikeprice+optionprice) : -optionprice);
			}
		}else if (optiontype=="Put"){
			if(buy){
				payoff += ((strikeprice-optionprice)-i > -optionprice ? (strikeprice-optionprice)-i :-optionprice);
			}else{
				payoff -= ((strikeprice-optionprice)-i > -optionprice ? (strikeprice-optionprice)-i :-optionprice);
			}
		}else if (optiontype=="Future"){
			if(buy){
				payoff += i-optionprice;
			}else{
				payoff -= i-optionprice;
			}
		}
		data.push([i,payoff*numlots*lotsize]);
	});
	return data;
}

/**
 * Calculate consolidated chart data 
 */
function OptionConsolidate(xdata, details, step, rangemax, rangemin){
	logger("DEBUG", "OptionConsolidate called !!!");
	var data=[]
	$.each(xdata, function(idx, i){
		var payoff = 0;
		$.each(details, function(ix,d){
			if(d.optiontype == "Call"){
				if(d.buy){
					payoff += ( i-(d.strikeprice+d.optionprice) > -d.optionprice ? i-(d.strikeprice+d.optionprice) : -d.optionprice )*d.numlots*d.lotsize
				}else{
					payoff -= ( i-(d.strikeprice+d.optionprice) > -d.optionprice ? i-(d.strikeprice+d.optionprice) : -d.optionprice )*d.numlots*d.lotsize
				}
			}else if (d.optiontype=="Put"){
				if(d.buy){
					payoff += ((d.strikeprice-d.optionprice)-i > -d.optionprice ? (d.strikeprice-d.optionprice)-i :-d.optionprice)*d.numlots*d.lotsize
				}else{
					payoff -= ((d.strikeprice-d.optionprice)-i > -d.optionprice ? (d.strikeprice-d.optionprice)-i :-d.optionprice)*d.numlots*d.lotsize
				}
			}else if (d.optiontype=="Future"){
				if(d.buy){
					payoff += (i-d.optionprice)*d.numlots*d.lotsize
				}else{
					payoff -= (i-d.optionprice)*d.numlots*d.lotsize
				}
			}
		});
		data.push([i,payoff]);
	});
	return data;
}


function UpdateOptionConsolidate1(xdata, data, add, d, step, rangemax, rangemin){
	logger("DEBUG", "UpdateOptionConsolidate1 called !!!");
	return UpdateOptionConsolidate(xdata, data, add, d.strikeprice, d.optionprice, step, rangemax, rangemin, 
			d.optiontype, d.buy, d.numlots, d.lotsize);
}

/**
 * Calculate consolidated chart data 
 */
function UpdateOptionConsolidate(xdata, data, add, strikeprice, optionprice, step, rangemax, rangemin,  optiontype/**Call/Put/Future**/, buy/**sell**/, numlots, lotsize){
	logger("DEBUG", "UpdateOptionConsolidate called !!!");
	var j = 0;
	$.each(xdata, function(idx, i){
		var payoff = 0;
		if(optiontype=="Call"){
			if(buy){
				// payoff ==>> stockprice - (strikeprice+optionprice)
				payoff += (i-(strikeprice+optionprice) > -optionprice ? i-(strikeprice+optionprice) : -optionprice);
			}else{
				payoff -= (i-(strikeprice+optionprice) > -optionprice ? i-(strikeprice+optionprice) : -optionprice);
			}
		}else if (optiontype=="Put"){
			if(buy){
				payoff += ((strikeprice-optionprice)-i > -optionprice ? (strikeprice-optionprice)-i :-optionprice);
			}else{
				payoff -= ((strikeprice-optionprice)-i > -optionprice ? (strikeprice-optionprice)-i :-optionprice);
			}
		}else if (optiontype=="Future"){
			if(buy){
				payoff += i-optionprice;
			}else{
				payoff -= i-optionprice;
			}
		}
		if(data[j][0]==i){
			data[j]=[data[j][0], data[j][1]+payoff*numlots*lotsize*(add?1:-1) ]
		}else{
			logger("ERROR", "UpdateOptionConsolidate index are not matching j="+i+", data[j][0]="+data[j][0]);
		}
		j++;
	});
	return data;
}


/**
 * Populate saved list
 * @param parent
 */
function populateSavedList(){
	logger("DEBUG", "populateSavedList called !!!");
	var keybase = deSerialize(localStorage.getItem(GLOBAL_KEYBASE));
	var html = "";
	var index = 0;
	$.each(keybase, function(k,v){
		html +='<li><a href="#">'+k+'</a><a href="#" key="'+k+'" class="delete">Delete</a></li>';
		index++;
	});
	$("div#saved-strategy-list ul").append(html);

	if(index<1){
		$("a#open-from-saved").addClass("ui-disabled");
	}
}

/**
 * Populate saved list
 * @param parent
 */
function populateDefaultList(){
	logger("DEBUG", "populateDefaultList called !!!");
	var html = "";
	var index = 0;
	$.each(DEFAULT_STRATEGIES, function(k,v){
		html +='<li><a href="#">'+k+'</a></li>';
		index++;
	});
	$("div#default-strategy-list ul").append(html);

	if(index<1){
		$("a#open-from-default").addClass("ui-disabled");
	}
}


/** 
 * Add to saved list 
 * @param parent
 */
function addToSavedList(chartname){
	logger("DEBUG", "addToSavedList called !!! ");
	$("div#saved-strategy-list ul").append('<li><a href="#">'+chartname+'</a><a href="#" key="'+chartname+'" class="delete">Delete</a></li>');

	// refresh page
	$("div#saved-strategy-list ul").listview("refresh");
	
	if($("a#open-from-saved").hasClass("ui-disabled")){
		$("a#open-from-saved").removeClass("ui-disabled");
	}
}


/**
 * Save chart as strategy
 * @param chartname
 */
function SaveChart(chartname){
	var parent = $("div#chartpage");
	var success = false;	
	logger("DEBUG", "SaveChart called !!!");
	
	// verify that chartname already doesn't exist in saved	
	if(!getKeyValue(chartname)){
		// get the chart data array which are to be saved
		var chartdata = [];
	    $("div#chartpage div#panel-left fieldset input[type='checkbox']").each(function(index){
	    	if($(this).is(":checked")){
	    		chartdata.push(chart.series.details[index]);
	    	}
    	});
		success = saveKeyValue(chartname, chartdata);
		// add to list also
		addToSavedList(chartname, "div#welcome");
	}else{
		showErrorMsg("Given chartname "+chartname+" already exist in saved.", parent)
	}
	
	if (success){
		showNotification("Successfully saved the chart with chartname "+chartname, parent);
	}else{
		showErrorMsg("Some problem saving chart with chartname "+chartname+" .", parent)
	}
}


/**
 * Restore chart from saved strategy
 */
function RestoreChart(chartname, fromdefault){
	logger("DEBUG", "RestoreChart called !!!");
	var parent = $("div#chartpage");
	var chartdetails = (!fromdefault)?getKeyValue(chartname):DEFAULT_STRATEGIES[chartname];

	if(chartdetails && chartdetails[0]){
		// move to chartpage and show chart
		$.mobile.changePage("#chartpage");
		$("#chartpage").jqmData("called-from", "restorechart");
		$("#chartpage").jqmData("chartname", chartname);
		$("#chartpage").jqmData("chartdetails", chartdetails);
	}else{
		showErrorMsg("Chart data does not exist with given name.", parent);
	}
}


/**
 * Show notification
 */ 
function showNotification(msg, parent){
	logger("DEBUG", "showNotification called !");
	$("div.successmsg p", parent).html(msg);
	$("div.successmsg", parent).popup("open");
}

/**
 * Show Error msg
 */
function showErrorMsg(msg, parent){
	logger("DEBUG", "showErrorMsg called !");
	$("div.errormsg p", parent).html(msg);
	$("div.errormsg", parent).popup("open");
}

/**
 * Show Success msg
 */
function showSuccessMsg(msg, parent){
	logger("DEBUG", "show success msg called !");
	$("div.successmsg p", parent).html(msg);
	$("div.successmsg", parent).popup("open");
}

/**
 * logger to log things
 * @param type
 * @param msg
 */

function logger(type, msg){
	// print only if needed
	if(LOGGER_TYPES[type] >=0 && LOGGER_TYPES[GLOBAL_LOGGER_TYPE]<=LOGGER_TYPES[type]){
		switch(LOGGER_TYPES[type]){
			case 3: console.error(msg); break;
			case 2: console.warn(msg); break;
			case 1: console.info(msg); break;
			case 0: console.debug(msg); break;
			default: console.log(msg);
		}
	}
}

/**
 * Serialize given object
 * @param obj
 * @returns
 */
function serialize(obj){
	return JSON.stringify(obj);
}

/**
 * DeSerialize given object
 * @param obj
 * @returns
 */
function deSerialize(obj){
	return JSON.parse(obj);
}

/**
 * initialize storage if there is any need to do so
 * @param keybase
 */
function initStorage(keybase){
	if(localStorage){
		if(localStorage.getItem(keybase)){
			logger("DEBUG", "initStorage:: storage already contain keybase");
		}else{
			logger("DEBUG", "initStorage:: storage does not contian keybase");
			localStorage.setItem(keybase,serialize({}));
		}
		LOCAL_STORAGE = true;
	}else{
		logger("DEBUG", "initStorage:: your browser does not support localStorage");
	}
}


/** 
 * delete given key  
 * @param key
 */
function deleteKey(key){
	logger("DEBUG", "deleteKey: deleting key='"+key+"'");
	if(LOCAL_STORAGE){
		var keybase = deSerialize(localStorage.getItem(GLOBAL_KEYBASE));
		if(keybase[key]){
			logger("DEBUG", "deleteKey:  delete key="+key);
			delete keybase[key];
			// save the keybase
			localStorage.setItem(GLOBAL_KEYBASE, serialize(keybase));
		}
	}
}


/** 
 * save given key value pair 
 * @param key
 * @param value
 */
function saveKeyValue(key, value){
	var success = false;
	if(LOCAL_STORAGE){
		var keybase = deSerialize(localStorage.getItem(GLOBAL_KEYBASE));
		if(keybase && !keybase[key]){
			keybase[key] = value;
			success = true
			logger("DEBUG", "saveKeyValue: successfully saved key="+key+", value="+value);
			// save the keybase
			localStorage.setItem(GLOBAL_KEYBASE, serialize(keybase));
		}
	}
	return success;
}

/**
 * 
 * @param key
 */
function getKeyValue(key){
	if(LOCAL_STORAGE){
		var keybase = deSerialize(localStorage.getItem(GLOBAL_KEYBASE));
		if(keybase[key]){
			logger("DEBUG", "getKeyValue: successfully got key="+key+", and value="+keybase[key]);
			return keybase[key];
		}else{
			logger("DEBUG", "getKeyValue: failure in getting key="+key);
		}
	}
}
