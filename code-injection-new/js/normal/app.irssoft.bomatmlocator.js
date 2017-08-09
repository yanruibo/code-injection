
function onDeviceReady(){
    /*Back event handler for all pages navigation*/
    $(document).bind ('pageshow', function (e, data) {
        if ($.mobile.activePage.attr('id') == 'index') {
            document.addEventListener("backbutton", function () { 
                setTimeout( function() {navigator.app.exitApp();}, 100 );
            }, true);
        }
        else{
            document.addEventListener("backbutton", function () {
                setTimeout( function() {$.mobile.changePage("#index");}, 100 );
            }, true);
        }
    });
       
    $.mobile.allowCrossDomainPages = true;
       setTimeout(callSearch,1);
         /*City name autocomplete select event*/
       	 $(".citySuggestion li").live("click", function(){
       		$bnselect=$(this).text();
   		    $("#cityname").val($bnselect);
            $('#citysug').empty();
       		$cityName=$("#cityname").val();
            $("#atmlist").empty();
            $cityval=$("#cityname").val();
            $bank='BANK OF MAHARASHTRA';
            $url="http://m.allindiabanks.in/aib/atm-locator.php?action=atmlist&request=tempdata&bank="+$bank+"&citystr="+$cityval;
        	$.blockUI({ message: "Please Wait..." });
        	$.ajax({
                    url: $url,
        	    	dataType: 'jsonp',
        	    	jsonp: 'jsoncallback',
        	    	timeout: 5000,
        	    	success: function(data, status){
       	                $.unblockUI();
       	                $("#atmlist").append(data);
                        $.mobile.changePage($('#atmlistpage'));
                        $("#atmlistpage").trigger("pagecreate");
        	    	  }
            });
       	 });
         
        /*inner tabs creation for selected branch from the list view*/
        $(".branchli").live("click",function(){
            $branchval=$(this).children("h1").text();
            $bank='BANK OF MAHARASHTRA';
            $url="http://m.allindiabanks.in/aib/atm-locator.php?action=atmlocation&request=tempdata&bank="+$bank+"&branch="+$branchval;
        	$.blockUI({ message: "Please Wait..." });
        	$.ajax({
                    url: $url,
        	    	dataType: 'jsonp',
        	    	jsonp: 'jsoncallback',
        	    	timeout: 5000,
        	    	success: function(data, status){
       	                $.unblockUI();
                        $("#address").empty();
                        $("#address").append(data);
                        $.mobile.changePage($('#addrpage'));
                        $("#addrpage").trigger("pagecreate");
        	    	  }
            });
        });
}
function callSearch(){
    $('#cityname').keyup(function() {
       		 $cityNameValue=$("#cityname").val();
       		 $cityNameValue=$.trim($cityNameValue);
             $bank='BANK OF MAHARASHTRA';
       		 $url="http://m.allindiabanks.in/aib/atm-locator.php?action=cityname&request=tempdata&bank="+$bank+"&citystr="+$cityNameValue;             
       		if($cityNameValue.length>=3){
       			$.blockUI({ message: "Please Wait..." });
    			 $.ajax({
    	    	        url: $url,
    	    	        dataType: 'jsonp',
    	    	        jsonp: 'jsoncallback',
    	    	        timeout: 5000,
    	    	        success: function(data, status){
    	    	        	$("#citysug").empty();
    	    	        	$.unblockUI();
    	    	        	$("#citysug").html(data);
                            $("#index").trigger("pagecreate");
    	    	        }
    			 	});
    		 }else{
       			$("#citysug").empty();
                $("#resultLog").empty();
       		 }
       	 });
}
$(document).ready(function(){
    
});
/*exiting application in back press*/
function onOffLine(){
    alert("Please Connect to the Internet..");
}
$(document).bind('mobileinit',function(){
   $.mobile.selectmenu.prototype.options.nativeMenu = false;
});
/*Load Map Function*/
$('#mappage').live("pageshow", function () {
            $bankname=$('#addrpage table tr').find("td:first").eq(0).text();
            $branchname=$('#addrpage table tr').find("td:first").eq(1).text();
            $address=$('#addrpage table tr').find("td:first").eq(4).text();
            $city=$('#addrpage table tr').find("td:first").eq(5).text();
            $state=$('#addrpage table tr').find("td:first").eq(6).text();
            $str={'search':$bankname+', '+$branchname+''+', '+$city+', '+$state,'marker':$bankname+' '+$address};
    var geocoder;
    var map;
    geocoder = new google.maps.Geocoder();
    var latlng = new google.maps.LatLng(13.060422,80.249583);
    var myOptions = {
      zoom: 14,
      maxZoom:14,
      center: latlng,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    }
    map = new google.maps.Map(document.getElementById("map_canvas"), myOptions);
    geocoder.geocode( { 'address': $str.search}, function(results, status) {
        $latlong=results[0].geometry.location;
        if (status == google.maps.GeocoderStatus.OK) {
                map.setCenter(results[0].geometry.location);
                var marker = new google.maps.Marker({
                    map: map,
                    position: results[0].geometry.location,
                });
                var infowindow = new google.maps.InfoWindow({
                  content: $str.marker
                });
                infowindow.open(map, marker);
              } else {
                alert("Google Map was not Loading successful for the following reason: " + status);
              }
            });
});

/*exit application*/
$(".exitapp").live("click",function(){
    navigator.notification.confirm(
        'Do you want to quit', 
        onConfirmQuit, 
        'Branch / ATM Locator', 
        'OK,Cancel'  
    );
    function onConfirmQuit(button){
       if(button == "1"){
        navigator.app.exitApp(); 
    }
}
});
/*twitter link*/
$(".twapp").live("click",function(){
    window.plugins.childBrowser.showWebPage("https://mobile.twitter.com/irssoft", { showLocationBar: true });
});
/*facebook link*/
$(".fbapp").live("click",function(){
    window.plugins.childBrowser.showWebPage("http://www.facebook.com/pages/International-Research-and-Software/371431086225625", { showLocationBar: true });
});
/*google market link*/
$(".gpapp").live("click",function(){
    window.plugins.childBrowser.showWebPage("https://play.google.com/store/apps/details?id=app.irssoft.bomatmlocator", { showLocationBar: true });
});









     function onLoad(){
          document.addEventListener("deviceready", onDeviceReady, true);
          document.addEventListener("offline", onOffLine, false);
     }
  
