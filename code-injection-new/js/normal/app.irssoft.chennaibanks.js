
function onDeviceReady(){
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
        /*bank name autocomplete request*/
       	 $('#bankname').keyup(function() {
       		 $banknameval=$("#bankname").val();
       		 $banknameval=$.trim($banknameval);
       		 $url="http://m.allindiabanks.in/aib/test.php?action=fbn&bquery="+$banknameval;
       		if($banknameval.length>=3){
       			$.blockUI({ message: "Please Wait..." });
    			 $.ajax({
    	    	        url: $url,
    	    	        dataType: 'jsonp',
    	    	        jsonp: 'jsoncallback',
    	    	        timeout: 5000,
    	    	        success: function(data, status){
    	    	        	$("#banksug").empty();
    	    	        	$.unblockUI();
    	    	        	$("#banksug").html(data);
                            $("#index").trigger("pagecreate");
    	    	        }
    			 	});
    		 }else{
       			$("#banksug").empty();
                $("#resultLog").empty();
       		 }
       	 });
         /*branch name autocomplete request*/
       	$('#branchname').keyup(function() {
      		 $banknameval=$("#bankname").val();
      		 $banknameval=$.trim($banknameval);
      		$branchnameval=$("#branchname").val();
     		 $branchnameval=$.trim($branchnameval);
      		 $url="http://m.allindiabanks.in/aib/test.php?action=fbb&bquery="+$branchnameval+"&bname="+$banknameval;
      		 if($branchnameval.length>=3){
    			 $.blockUI({ message: "Please Wait..." });
      			 $.ajax({
      	    	        url: $url,
      	    	        dataType: 'jsonp',
      	    	        jsonp: 'jsoncallback',
      	    	        timeout: 5000,
      	    	        success: function(data, status){
      	    	        	$("#branchsug").empty();
    	    	        	$.unblockUI();
      	    	        	$("#branchsug").html(data);
                            $("#index").trigger("pagecreate");
      	    	        }
      	    	    });
       }else{
       			$("#branchsug").empty();
                $("#resultLog").empty();
       		 }
      	 });
         /*bank name autocomplete select event*/
       	 $(".bnsuggestion li").live("click", function(){
       		$("#branchname").val("");
       		 $bnselect=$(this).text();
       		 $("#bankname").val($bnselect);
       		$("#resultLog").empty();
            $('#banksug').empty();
       		$branchname=$("#branchname").val();
       		if($branchname==""){
       			$srchbutton="<a href='#branchlistpage' data-role='button' id='branchsearch' >Search For Branches</a>";
       			$("#resultLog").append($srchbutton);
                $("#index").trigger("pagecreate");
       		}
       	 });
         /*branch name autocomplete selection and fetching bank details in individual pages*/
       	 $(".brsuggestion li").live("click", function(){
       		 $brselect=$(this).text();
       		 $("#branchname").val($brselect);
       		$("#resultLog").empty();
            $('#branchsug').empty();
       		$bankname=$("#bankname").val();
       		$branchname=$("#branchname").val();
       		if($bankname==""){
       			$srchbutton="<a href='#banklistpage' data-role='button' id='banksearch' >Search For Banks</a>";
       			$("#resultLog").append($srchbutton);
                $("#index").trigger("pagecreate");
       		}
       		if($bankname!="" && $branchname!=""){
       		   $url="http://m.allindiabanks.in/aib/test.php?action=bdetails&brname="+$brselect+"&bname="+$banknameval;
       		       $.blockUI({ message: "Please Wait..." });
          			 $.ajax({
          	    	        url: $url,
          	    	        dataType: 'jsonp',
          	    	        jsonp: 'jsoncallback',
          	    	        timeout: 5000,
          	    	        success: function(data, status){
          	    	            $addrstr="<table width=100% cellspacing='0'><tr><th class='topth'>Bank Name</th><td class='toptd'>"+data.name+"</td></tr><tr><th>Branch Name</th><td>"+data.branch+"</td></tr><tr><th>Address</th><td>"+data.address+"</td></tr><tr><th>City</th><td>"+data.city+"</td></tr><tr><th>District</th><td>"+data.district+"</td></tr><tr><th>State</th><td>"+data.state+"</td></tr></table>";
                                $("#address").empty();
                                $("#address").append($addrstr);
                                $micrstr="<table width=100% cellspacing='0'><tr><th class='topth'>Bank Name</th><td class='toptd'>"+data.name+"</td></tr><tr><th>Branch Name</th><td>"+data.branch+"</td></tr><tr><th>MICR CODE</th><td>"+data.micrcode+"</td></tr><tr></table>";
                                $("#micr").empty();
                                $("#micr").append($micrstr);
                                $ifscstr="<table width=100% cellspacing='0'><tr><th class='topth'>Bank Name</th><td class='toptd'>"+data.name+"</td></tr><tr><th>Branch Name</th><td>"+data.branch+"</td></tr><tr><th>IFSC CODE</th><td>"+data.ifsccode+"</td></tr><tr></table>";
                                $("#ifsc").empty();
                                $("#ifsc").append($ifscstr);
          	    	        	$("#resultLog").empty();
          	    	        	$.unblockUI();
          	    	        	$fixbutton="<a href='#addrpage' data-role='button'>Address</a><a href='#micrpage' data-role='button'>MICR Code</a><a href='#ifscpage' data-role='button'>IFSC Code</a><a href='#mappage' data-role='button'>Map Location</a>";
    		                    $("#resultLog").append($fixbutton);
                                $("#index").trigger("pagecreate");
          	    	        }
          	    	    });
       		}
       	 });
         /*branch search listview request*/
         $("#branchsearch").live("click",function(){
            $bankname=$("#bankname").val();
            $listr="";
            $url="http://m.allindiabanks.in/aib/test.php?action=brsearch&bname="+$bankname;
    			 $.blockUI({ message: "Please Wait..." });
      			 $.ajax({
      	    	        url: $url,
      	    	        dataType: 'jsonp',
      	    	        jsonp: 'jsoncallback',
      	    	        timeout: 5000,
      	    	        success: function(data, status){
      	    	        	$brsearchstr="<ul data-role='listview'  data-dividertheme='a'><li data-role='list-divider'>"+$bankname+" Branches in Chennai</li>";
                            $.each(data,function(){
                               $listr+="<li><a href='#' class='branchlist'>"+this+ "</a></li>";
                            });
                            $brsearchstr+=$listr+"</ul>";
                            $("#brlist").empty();
                            $("#brlist").append($brsearchstr);
                            $("#branchlistpage").trigger("pagecreate");
                            $.unblockUI();
      	    	        }
      	    	    });
         });
         /*bank search listview request*/
         $("#banksearch").live("click",function(){
            $branchname=$("#branchname").val();
            $listr="";
            $url="http://m.allindiabanks.in/aib/test.php?action=bsearch&brname="+$branchname;
    			 $.blockUI({ message: "Please Wait..." });
      			 $.ajax({
      	    	        url: $url,
      	    	        dataType: 'jsonp',
      	    	        jsonp: 'jsoncallback',
      	    	        timeout: 5000,
      	    	        success: function(data, status){
      	    	        	$brsearchstr="<ul data-role='listview'  data-dividertheme='a'><li data-role='list-divider'>Bank in "+$branchname+"</li>";
                            $.each(data,function(){
                               $listr+="<li><a href='#' class='banklist'>"+this+ "</a></li>";
                            });
                            $brsearchstr+=$listr+"</ul>";
                            $("#blist").empty();
                            $("#blist").append($brsearchstr);
                            $("#banklistpage").trigger("pagecreate");
                            $.unblockUI();
      	    	        }
      	    	    });
         });
         /*clicking search branches in branch list*/
         $(".branchlist").live("click",function(){
            $branchname=$(this).text();
            $bankname=$("#bankname").val();
            $("#branchname").empty();
            $("#branchname").val($branchname);
            $url="http://m.allindiabanks.in/aib/test.php?action=bdetails&brname="+$branchname+"&bname="+$bankname;
       		       $.blockUI({ message: "Please Wait..." });
          			 $.ajax({
          	    	        url: $url,
          	    	        dataType: 'jsonp',
          	    	        jsonp: 'jsoncallback',
          	    	        timeout: 5000,
          	    	        success: function(data, status){
          	    	            $addrstr="<table width=100% cellspacing='0'><tr><th class='topth'>Bank Name</th><td class='toptd'>"+data.name+"</td></tr><tr><th>Branch Name</th><td>"+data.branch+"</td></tr><tr><th>Address</th><td>"+data.address+"</td></tr><tr><th>City</th><td>"+data.city+"</td></tr><tr><th>District</th><td>"+data.district+"</td></tr><tr><th>State</th><td>"+data.state+"</td></tr></table>";
                                $("#address").empty();
                                $("#address").append($addrstr);
                                $micrstr="<table width=100% cellspacing='0'><tr><th class='topth'>Bank Name</th><td class='toptd'>"+data.name+"</td></tr><tr><th>Branch Name</th><td>"+data.branch+"</td></tr><tr><th>MICR CODE</th><td>"+data.micrcode+"</td></tr><tr></table>";
                                $("#micr").empty();
                                $("#micr").append($micrstr);
                                $ifscstr="<table width=100% cellspacing='0'><tr><th class='topth'>Bank Name</th><td class='toptd'>"+data.name+"</td></tr><tr><th>Branch Name</th><td>"+data.branch+"</td></tr><tr><th>IFSC CODE</th><td>"+data.ifsccode+"</td></tr><tr></table>";
                                $("#ifsc").empty();
                                $("#ifsc").append($ifscstr);
          	    	        	$("#resultLog").empty();
          	    	        	$.unblockUI();
          	    	        	$fixbutton="<a href='#addrpage' data-role='button'>Address</a><a href='#micrpage' data-role='button'>MICR Code</a><a href='#ifscpage' data-role='button'>IFSC Code</a><a href='#mappage' data-role='button'>Map Location</a>";
    		                    $("#resultLog").append($fixbutton);
                                $.mobile.changePage($("#addrpage"),"slide");
                                $("#index").trigger("pagecreate");
          	    	        }
          	    	    });
         });
         /*clicking search banks name in banks list*/
         $(".banklist").live("click",function(){
            $bankname=$(this).text();
            $branchname=$("#branchname").val();
            $("#bankname").empty();
            $("#bankname").val($bankname);
            $url="http://m.allindiabanks.in/aib/test.php?action=bdetails&brname="+$branchname+"&bname="+$bankname;
       		       $.blockUI({ message: "Please Wait..." });
          			 $.ajax({
          	    	        url: $url,
          	    	        dataType: 'jsonp',
          	    	        jsonp: 'jsoncallback',
          	    	        timeout: 5000,
          	    	        success: function(data, status){
          	    	            $addrstr="<table width=100% cellspacing='0'><tr><th class='topth'>Bank Name</th><td class='toptd'>"+data.name+"</td></tr><tr><th>Branch Name</th><td>"+data.branch+"</td></tr><tr><th>Address</th><td>"+data.address+"</td></tr><tr><th>City</th><td>"+data.city+"</td></tr><tr><th>District</th><td>"+data.district+"</td></tr><tr><th>State</th><td>"+data.state+"</td></tr></table>";
                                $("#address").empty();
                                $("#address").append($addrstr);
                                $micrstr="<table width=100% cellspacing='0'><tr><th class='topth'>Bank Name</th><td class='toptd'>"+data.name+"</td></tr><tr><th>Branch Name</th><td>"+data.branch+"</td></tr><tr><th>MICR CODE</th><td>"+data.micrcode+"</td></tr><tr></table>";
                                $("#micr").empty();
                                $("#micr").append($micrstr);
                                $ifscstr="<table width=100% cellspacing='0'><tr><th class='topth'>Bank Name</th><td class='toptd'>"+data.name+"</td></tr><tr><th>Branch Name</th><td>"+data.branch+"</td></tr><tr><th>IFSC CODE</th><td>"+data.ifsccode+"</td></tr><tr></table>";
                                $("#ifsc").empty();
                                $("#ifsc").append($ifscstr);
          	    	        	$("#resultLog").empty();
          	    	        	$.unblockUI();
          	    	        	$fixbutton="<a href='#addrpage' data-role='button'>Address</a><a href='#micrpage' data-role='button'>MICR Code</a><a href='#ifscpage' data-role='button'>IFSC Code</a><a href='#mappage' data-role='button'>Map Location</a>";
    		                    $("#resultLog").append($fixbutton);                         
                                $.mobile.changePage($("#addrpage"),"slide");
                                $("#index").trigger("pagecreate");
                                //$("#mappage").trigger("pagecreate");
                                
          	    	        }
          	    	    });
         });
         /*index page before show add clear button*/
         $( '#index' ).live( 'pagebeforeshow',function(){
            $branchname=$('#branchname').val();
            $bankname=$('#branchname').val();
            if($branchname!='' && $bankname!=''){
                $str="<a href='#' data-icon='delete' id='clearbtn' class='ui-btn-right'>Clear</a>";
                $('#indexheader h1').after($str);
                $("#index").trigger("pagecreate");
            }
            
            
         });
         
         /*clear input field and focus*/
         $('#clearbtn').live('click',function(){
            $('#bankname').val('');
            $('#branchname').val('');
            $('#bankname').focus();
            $('#resultLog').empty();
         });
         /*submit loan form*/
         $('#lsubmit').live('click',function(){
            $lname=$('#lname').val();
            $lcity=$('#lcity').val();
            $lcontact=$('#lcontact').val();
            $lamount=$('#lamount').val();
            $ltype=$('#ltype').val();
            $ltime=$('#ltime').val();
            $lname=$.trim($lname);
            $lcity=$.trim($lcity);
            $lcontact=$.trim($lcontact);
            $lamount=$.trim($lamount);
            $ltype=$.trim($ltype);
            $ltime=$.trim($ltime);
            if($lname!='' && $lcity!='' && $lcontact!='' && $ltime!='' && $lamount!='' && $ltype!=''){
                $url="http://m.allindiabanks.in/aib/test.php?action=loandetail&lname="+$lname+"&lcity="+$lcity+"&lcontact="+$lcontact+"&lamount="+$lamount+"&ltype="+$ltype+"&ltime="+$ltime;
                $.blockUI({ message: "Data Saving..." });
                $.ajax({
          	    	        url: $url,
          	    	        dataType: 'jsonp',
          	    	        jsonp: 'jsoncallback',
          	    	        timeout: 5000,
          	    	        success: function(data, status){
          	    	            alert('Thanks for Your Feedback. We will get back to you soon.');
          	    	        	$.unblockUI();                                
          	    	        }
          	    	    });
            }
            else{
                alert('Please Fill All the Details');
            }
         });
  }

/*exiting application in back press*/
function onOffLine(){
    alert("Please Connect to the Internet..");
}
/*Load Map Function*/
$('#mappage').live("pageshow", function () {
            $bankname=$('#addrpage table tr').find("td:first").eq(0).text();
            $branchname=$('#addrpage table tr').find("td:first").eq(1).text();
            $address=$('#addrpage table tr').find("td:first").eq(2).text();
            $city=$('#addrpage table tr').find("td:first").eq(3).text();
            $state=$('#addrpage table tr').find("td:first").eq(5).text();
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








     function onLoad(){
          document.addEventListener("deviceready", onDeviceReady, true);
          document.addEventListener("offline", onOffLine, false);
     }
  
