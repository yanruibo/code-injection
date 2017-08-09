
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
    /*Load list page of branch name and address from city select*/
    $( "#sbi" ).live("change", function(e) {
        $("#branchlist").empty();
        $cityval=$("#sbi").val();
        $url="http://m.allindiabanks.in/aib/bank-locator-json.php?locator=hdfc&action=branchlist&city="+$cityval;
    	$.blockUI({ message: "Please Wait..." });
    	$.ajax({
                url: $url,
    	    	dataType: 'jsonp',
    	    	jsonp: 'jsoncallback',
    	    	timeout: 5000,
    	    	success: function(data, status){
   	                $.unblockUI();
   	                $("#branchlist").append(data);
                    $.mobile.changePage($('#listpage'));
                    $("#listpage").trigger("pagecreate");
    	    	  }
        });
    });
    /*inner tabs creation for selected branch from the list view*/
    $(".branchli").live("click",function(){
        $branchval=$(this).children("h1").text();
        $url="http://m.allindiabanks.in/aib/bank-locator-json.php?locator=hdfc&action=branchdetails&branch="+$branchval;
    	$.blockUI({ message: "Please Wait..." });
    	$.ajax({
                url: $url,
    	    	dataType: 'jsonp',
    	    	jsonp: 'jsoncallback',
    	    	timeout: 5000,
    	    	success: function(data, status){
   	                $.unblockUI();                  
                    $addrstr="<table width=100% cellspacing='0'><tr><th class='topth'>Bank Name</th><td class='toptd'>"+data.name+"</td></tr><tr><th>Branch Name</th><td>"+data.branch+"</td></tr><tr><th>IFSC Code</th><td>"+data.ifsccode+"</td></tr><tr><th>MICR Code</th><td>"+data.micrcode+"</td></tr><tr><th>Address</th><td>"+data.address+"</td></tr><tr><th>City</th><td>"+data.city+"</td></tr><tr><th>State</th><td>"+data.state+"</td></tr></table>";
                    $("#address").empty();
                    $("#address").append($addrstr);
                    $.mobile.changePage($('#addrpage'));
                    $("#addrpage").trigger("pagecreate");
    	    	  }
        });
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
    window.plugins.childBrowser.showWebPage("https://play.google.com/store/apps/details?id=app.irssoft.hdfcbranchlocator", { showLocationBar: true });
});









     function onLoad(){
          document.addEventListener("deviceready", onDeviceReady, true);
          document.addEventListener("offline", onOffLine, false);
     }
  
