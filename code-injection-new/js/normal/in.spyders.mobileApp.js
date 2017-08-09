
$("#firstPage").live('pageinit', function(evt){
	$("#saveBtn").bind('tap', function(e){
	
	/* Network check code begins */	
	if(navigator.network.connection.type === Connection.UNKNOWN || navigator.network.connection.type === Connection.NONE){
		  alert("CHECK YOUR NETWORK CONNECTION");
		  return false;
	}		
	/* Network check code ends */	
	
		var dateEnum = $("#dateSelect").val();
		var qty1Val = parseInt($("#qty1").val(), 10);
		var qty2Val = parseInt($("#qty2").val(), 10);
		
		if( !(jQuery.isNumeric(qty1Val)) ){
			qty1Val = 0;
		}
		if( !(jQuery.isNumeric(qty2Val)) ){
			qty2Val = 0;
		}
		
		if((qty1Val == 0) && (qty2Val == 0)){
			alert("Please select quantities !");
			return false;
		}
		
		window.localStorage.date = dateEnum;
		window.localStorage.qty1 = qty1Val;	
		window.localStorage.qty2 = qty2Val;
		//$.mobile.showPageLoadingMsg();
                window.plugins.loadingIndicator.show('success',nativePluginResultHandler);
		jQuery.ajax({
					  url: "http://spyders.in/onamOnlineFinal/services/availabilityChecker.php",
					  dataType: 'text',
					  type: 'POST',
					  data: {"qty1": window.localStorage.qty1, "qty2":window.localStorage.qty2, "date":window.localStorage.date},
					  success: function(response){
					  	//$.mobile.hidePageLoadingMsg();
                                                window.plugins.loadingIndicator.hide('success',nativePluginResultHandler);
						if(response == "Available"){
							$.mobile.changePage("#secondPage");			
						}
						else{
							alert(response);
							return false;	
						}	
					  }
 					 });		
		
		
					
	});
});

$("#secondPage").live('pageinit pageshow pageload', function(evt){
	
	var qty1show = window.localStorage.qty1 + " L";
	var qty2show = window.localStorage.qty2 + " L";
	$("#qty1show").html(qty1show);
	$("#qty2show").html(qty2show);
	var total = parseInt(window.localStorage.qty1, 10) + parseInt(window.localStorage.qty2, 10);
	total = total*120;
	total = "Rs " + total;
	$("#costShow").html(total);
	
});

$("#thirdPage").live('pageshow', function(){
	$("#confirmBtn").removeClass('ui-disabled');
});

$("#thirdPage").live('pageinit', function(evt){
        document.addEventListener("backbutton", onBackKeyDownThird, false);
	$("#confirmBtn").bind('tap', function(e){
	  
	  if($("#addressBox").val() && $("#phoneBox").val().length === 10){
                $(this).addClass('ui-disabled');
		//$.mobile.showPageLoadingMsg();
                window.plugins.loadingIndicator.show('success',nativePluginResultHandler); 
		jQuery.ajax({
					  url: "http://spyders.in/onamOnlineFinal/services/addOrderNew.php",
					  dataType: 'json',
					  type: 'POST',
					  data: {"date":window.localStorage.date, "qty1": window.localStorage.qty1, "qty2":window.localStorage.qty2, "mobile":$("#phoneBox").val(), "place":$("#placeSelect").val(), "landmark": $("#landmarkBox").val(), "address": $("#addressBox").val(), "price": ((window.localStorage.qty1*120) + (window.localStorage.qty2*120)) },
					  success: function(response){
					  	//$.mobile.hidePageLoadingMsg();
                                                window.plugins.loadingIndicator.hide('success',nativePluginResultHandler);
					  	if(response){
							$.mobile.changePage("#fourthPage");			
						}
						else{
							$.mobile.changePage("#errorPage");	
						}	
					  }
 					 });
 	}
 	else{
                if(!($("#addressBox").val()))
                {
	 		alert("Required fields not filled. Please try again !");
	 		return false;
                } 
                else if(($("#phoneBox").val().length) >= 0 && ($("#phoneBox").val().length) < 10)
                {
                   alert("Please enter 10-digit Mobile Number!");
                   return false;
                }
 	}			 
	});
});

$("#fourthPage").live('pageinit', function(evt){
      document.addEventListener("backbutton", onBackKeyDownFourth, false);
	$("#exitBtn").bind('tap', function(e){
		navigator.app.exitApp(); 
	});
});

$("#errorPage").live('pageinit', function(evt){
   document.addEventListener("backbutton", onBackKeyDownError, false);
});

function onBackKeyDownThird(){
	navigator.app.exitApp();
}

function onBackKeyDownError(){
}

function onBackKeyDownFourth(){
  navigator.app.exitApp();
}







                          $(document).bind("mobileinit", function () {
			    $.mobile.ajaxEnabled = false;
                            $.mobile.defaultPageTransition = 'none';
			});
                        



if(!window.plugins) {
  window.plugins = {};
}

window.plugins.loadingIndicator = {
		
		show: function(options, callback){
			//alert("Coming in show");
			cordova.exec(
				callback, 
				null, 
				'LoadingIndicator', 
				'showLoading', 
				[options]
			);
			
		},
		
		
		hide: function(callback){
			
			cordova.exec(
				callback, 
				null, 
				'LoadingIndicator', 
				'hideLoading', 
				[]
			);
			
		}
		
	};

function nativePluginResultHandler (result) 
{
 //alert("SUCCESS callback");
}

