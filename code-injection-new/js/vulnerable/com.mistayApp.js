

















//initialize jQTouch and keep it in a var for future references
var baseURL = 'http://www.mistay.net/';
var ajaxURL = 'http://www.mistay.net/ajax/';

localStorage.clear();   
var myFav = []; 
var jQT=$.jQTouch({ 
	cacheGetRequests: false,
	addGlossToIcon	: true,
	fixedViewport:true,
}); 
function checkNetwok(){
navigator.network.isReachable("phonegap.com", reachableCallback, {});
}
function preventBehavior(e) {e.preventDefault(); };
	 function onLoad() {
	  // document.addEventListener("touchmove", preventBehavior, false);
	   document.addEventListener("deviceready", onDeviceReady, false);
    }
	function onDeviceReady() {
     navigator.network.isReachable("phonegap.com", reachableCallback, {});
    }

    // Check network status
    //
    function reachableCallback(reachability) {
        // There is no consistency on the format of reachability
	    var networkState = reachability.code || reachability;

        var states = {};
        states[NetworkStatus.NOT_REACHABLE]                      = 'No network connection';
        states[NetworkStatus.REACHABLE_VIA_CARRIER_DATA_NETWORK] = 'Carrier data connection';
        states[NetworkStatus.REACHABLE_VIA_WIFI_NETWORK]         = 'WiFi connection';
		if(states[networkState] == 'No network connection'){
			alert("You are not connected to Internet.");
		}      
    }
$(document).ready(function(){		
	new iScroll('scroller');
	$("#wrapperDesc").overscroll({ 
			 direction: 'vertical',
			 cursor: '',
			 cancelOn: '#moreInfo1,#moreInfo2,#favourite,#telAnchor,.infoPhoneDesc'		  
			});
	
	//new iScroll('scrollerDesc');
	initialize();	
 	document.addEventListener("deviceready", callTrack, false);
	$('.noThanks').click( function(){
    	$('.mainDiv').css('opacity','1.0');
	    $('.lightDiv').toggle(); 
    });
	$('#noThanksDesc').click( function(){
	   $('#mainDivDesc').css('opacity','1.0');
	   $('#lightDivDesc').toggle(); 
    });
	$('#noThanksGeo').click( function(){
	   $('#mainDivGeo').css('opacity','1.0');
	   $('#lightDivGeo').toggle(); 
    });	
	$('#feedCancel').click( function(){
		jQT.goTo('#hotelListScreen','slide');	 
    });
	
	$('#feedDone').click( function(){	
		var resAns = $('input:radio[name=res]:checked').val();
		var ques2Ans = $('input:radio[name=satisfy]:checked').val();
		var reasonAns=$('#ques1').val();
		var ques3Ans=$('#ans3').val();
		if(resAns == undefined){
			alert('Please select any answer');
			return false;
		}
		if(resAns == 'N'){
			if(reasonAns == 0){
				alert('Please provide any reason.')
				return false;
			}
		}if(resAns == 'Y') {
			if(ques2Ans == undefined){
				alert('Please provide your satisfaction.')
				return false;
			}
			if(ques3Ans == ''){
				alert('Please provide your suggestion.')
				return false;
			}
		}
		$.ajax({
			type:"POST",
			url:ajaxURL+"getfeedback.php",
			data: 'resAns='+resAns+'&ques2Ans='+ques2Ans+'&reasonAns='+reasonAns+'&ques3Ans='+ques3Ans,
			beforeSend: function(){
							$.blockUI({ message: null }); 
		  					$('#ajaxLoader').show();
						},						
				complete: function(){
						 $.unblockUI();
						 $('#ajaxLoader').hide();
						},
			success:function(data){
				if(data == 1){
					alert('Thanks for your feedback!')
					jQT.goTo('#searchScreen','slide'); }	 
	     		  }
		       });  
    		});	
		var $homeLoader = $('#home').find('.homeLoader');
		$homeLoader.show();	
		$('#loaderTitle').show();	
	
		// Ajax function for get list of city name			
		$('#city').bind('click', function() {
		setAutoComplete("city", "results", ajaxURL+"autocomplete.php");
	});	

	$('#emailFrom').bind('click', function() {
		setAutoContact("emailFrom", "listFrom","contactFromList");
	});	
	$('#emailCc').bind('click', function() {
		setAutoContact("emailCc", "listCc","contactCcList");
	});						
		$("#aboutButton").click(function() {	
			$('#city').val('');
		 	$.blockUI({ 
            	message: null, 
            	timeout: 100 
       	 	});
			jQT.goTo('#aboutus','slide');
			return false; 	
		});
	
	$(".hotelDesc").click(function(){   // GET HOTEL DESCRIPTIOMN BY PHONE ID 
		var phone = $('#phoneId').val();
		$('#testNew').empty();
		$.ajax({
			type:"POST",
			url:ajaxURL+"getHotelDesc.php",
			dataType:"json",
			data: 'phone='+phone,
			beforeSend: function(){
							$.blockUI({ message: null }); 
		  					$('#ajaxLoader').show();
							checkNetwok();
							
						},						
			complete: function(){
						 $.unblockUI();
						 $('#ajaxLoader').hide();
						},
			success:function(json){
				if(json != null){
					var countRecord = json.length;
					if(countRecord > 0){
											
						for(var i = 0; i < countRecord; ++i){
							try{
								var name 	= json[i].name;
								var icon	= json[i].icon;						
								var address = json[i].address;
								var newPhone = json[i].newPhone;
								var description = json[i].description;
								var amenties = json[i].amenties;
							}catch(e){
								name = '';
								icon = '';
								address = '';
								newPhone ='';
								description ='';
								amenties ='';
							}
               			 	if(name == undefined)
                    			name = '';
						 	if(icon == undefined)
                    			icon = '';
						 	if(address == undefined)
                    			address = '';
							if(description == undefined)
                    			description = '';	
							if(amenties == undefined)
                    			amenties = '';	
								
							if(description == ''){
								navigator.notification.alert('No Hotel Info Found.','','Info','Ok');
								return false;
							}
							var iconImage = '<img src="'+baseURL+icon+'" width="124px" height="95px" border="0" />';
     						var nameHotel = '<table style="padding-left:19px;" border="0"><tr><td align="left"  valign="top"><span style="font-size:19px;font-weight:bold;">'+name+'</span>&nbsp;<img id="favourite" onBlur="favStar('+phone+');" onClick="favStar('+phone+');" src="themes/mistay/img/star_i.png" border="0"><input type="hidden" name="star" id="star" value="0"/></td></tr><tr><td valign="bottom" align="left">'+address+'</td></tr><tr><td colspan="2"><div class="infoPhoneDesc"><a id="telAnchor"  href="tel:'+phone+'" rel="external" onClick="callInfoDesc();callTrack('+phone+');">Call '+newPhone+'</a></div></td></tr></table>';
											
							$('#phoneId').val(phone);
							
							var data ='<div style="background:url(themes/mistay/img/th-bg.png) no-repeat;"><div style="float:left" id="iconHotelDesc">'+iconImage+'</div><div id="nameHotelDesc">'+nameHotel+'</div></div><div style="margin-top:15px;position:absolute;clear:both;line-height:5px;white-space:nowrap">&nbsp;</div><div><table width="300" border="0" cellpadding="0" cellspacing="0"><tr><td width="9" align="left"><img src="themes/mistay/img/box-t-l-c.png" width="17" height="16" /></td><td background="themes/mistay/img/box-t-c-c.png"></td><td width="8" align="right"><img src="themes/mistay/img/box-t-r-c.png" width="17" height="16" /></td></tr><tr><td align="left" background="themes/mistay/img/box-m-l-line.png">&nbsp;</td><td bgcolor="#FEFEFC"><div id="hotelDesccription"><strong>Nearby Restaurants/Attractions</strong><br>';
							for(var k = 0; k < 3; ++k){
								
								if(json[i].description[k] !=undefined ){
								data +='<li style="list-style-image:url(themes/mistay/img/icon-small.png)">'+json[i].description[k]+'</li>';
								//$('#testNew').append(descHotel);
							
								}
								
							}
							for(var k = 3; k < 5; ++k){
								
								if(json[i].description[k] !=undefined ){
									data +='<li class="descInfo" style="list-style-image:url(themes/mistay/img/icon-small.png);display:none">'+json[i].description[k]+'</li>';
								
								
								}
								
							}
							if(json[i].description.length > 3 )
							data +='<div style="margin-top:10px;position:relative;clear:both;line-height:5px;white-space:nowrap">&nbsp;</div><a id="moreInfo1" onClick="moreDescInfo();" href="javascript:void(0);" style="text-decoration:underline;color:#FF0000;padding-top:10px;" >more info...</a></div><div style="background:url(themes/mistay/img/line.png) repeat-x;margin:10px 0px 0px 0px;">&nbsp;</div>';
							
							data +='<div id="hotelAmmenties">';
							if(amenties !=''){
								data +='<strong>Hotel Ammenties</strong><br>';
								for(var k = 0; k < 3; ++k){
									if(json[i].amenties[k] !=undefined ){
										data +='<li style="list-style-image:url(themes/mistay/img/icon-small.png)">'+json[i].amenties[k]+'</li>';
									
									}
								}
								for(var k = 3; k < 5; ++k){
								
									if(json[i].amenties[k] !=undefined ){
										data +='<li class="ammentInfo" style="list-style-image:url(themes/mistay/img/icon-small.png);display:none;">'+json[i].description[k]+'</li>';
										//$('#testNew').append(amentHotel);
									}
								
								}
								if(json[i].amenties.length > 3 )
							data +='<div style="margin-top:10px;position:relative;clear:both;line-height:5px;white-space:nowrap">&nbsp;</div><a id="moreInfo2" onClick="moreAmmentInfo();" href="javascript:void(0);" style="text-decoration:underline;color:#FF0000;padding-top:px;" >more info...</a><div>';
								
							} // END IF							
							data +='</td><td align="right" background="themes/mistay/img/box-m-r-line.png">&nbsp;</td></tr><tr><td align="left" valign="bottom"><img src="themes/mistay/img/box-b-l-c.png" width="17" height="19" /></td><td><img src="themes/mistay/img/box-b-m--bg.png" width="100%" height="19" /></td><td align="right" valign="bottom" ><img src="themes/mistay/img/box-b-r-c.png" width="17" height="19" /></td></tr></table></div>';					
							
						} // END OF FOR LOOP
						$('#testNew').append(data);
						
					} // END count record 
				} // END check null
				jQT.goTo('#hotelDescScreen','slide'); 
				return false; 			 
			}
		});
		return false;	
	});		
		}); // END OF FUNCTION 
	
	function moreDescInfo(){
	$('.descInfo').toggle();

}
 
function moreAmmentInfo(){
	$('.ammentInfo').toggle();

}
 
		
function returnHome(){
	var $homeLoader = $('#home').find('.homeLoader');
	$('#loaderTitle').hide();				
	$homeLoader.hide();
	$('.headerLogo').show();	
	jQT.goTo('#home','slide');
	return false; 	
} // END OF returnHome

function dothingswithsleep(){
	jQT.goTo('#searchScreen','slide');
	 $.blockUI({ 
            message: null, 
            timeout: 100 
	  });
	return false; 	
} // END OF dothingswithsleep

function favStar(phone){	
	var star	=	$('#star').val();
	if(star == 0){
		myFav.push(phone);
		localStorage.setItem("arrayStar",JSON.stringify(myFav));
		document.getElementById('star').value=1;
		document.getElementById('favourite').src='themes/mistay/img/star.png';
	}else{
		myFav.removeByValue(phone);		
		localStorage.setItem("arrayStar",JSON.stringify(myFav));
		document.getElementById('star').value=0;
		document.getElementById('favourite').src='themes/mistay/img/star_i.png';	
	}
} // END OF favStar

function favStarDetail(phone){	
	
	var star	=	$('#starDetail').val();
	if(star == 0){
		myFav.push(phone);
		localStorage.setItem("arrayStar",JSON.stringify(myFav));
		document.getElementById('starDetail').value=1;
		document.getElementById('favDetail').src='themes/mistay/img/star.png';
	}else{
		myFav.removeByValue(phone);		
		localStorage.setItem("arrayStar",JSON.stringify(myFav));
		document.getElementById('starDetail').value=0;
		document.getElementById('favDetail').src='themes/mistay/img/star_i.png';	
	}
} // END OF favStarDetail

Array.prototype.removeByValue = function(val) {
    for(var i=0; i<this.length; i++) {
        if(this[i] == val) {
            this.splice(i, 1);
            break;
        }
    }
}

function storeFavourites(){	
	var favHotel = localStorage.getItem("arrayStar");
	if(favHotel == null){
		alert('No Hotel in your Favorites.');
		return false; 	
	}else{
		favHotel = JSON.parse(favHotel);
		$('#FavData').empty();
		var lat = sessionStorage.getItem('searchLat');
		var lng  = sessionStorage.getItem('searchLng');	

		$.ajax({
			type:"POST",
			url:ajaxURL+"getHotelFavorites.php",
			dataType:"json",					
			data: 'favHotel='+favHotel+'&lat='+lat+'&lng='+lng,
			beforeSend: function(){
							
							$.blockUI({ message: null }); 
		  					$('#ajaxLoader').show();checkNetwok();
						},						
				complete: function(){
						 $.unblockUI();
						 $('#ajaxLoader').hide();
						},
			success:function(json){
				
				if(json != null){
					var countRecord = json.length;
					var textColour = 'listGreen';	
					if(countRecord > 0 ){
					for(var i = 0; i < countRecord; ++i){
					try{
						var phone 		= json[i].phone;
						var distance	= json[i].distance;
						var rates 		= json[i].rates;
						var icon 		= json[i].icon;
						var smoke 		= json[i].smoke;
						var pet 		= json[i].pet;
						var ext 		= json[i].ext;
						var int 		= json[i].int;
					}catch(e){
						phone = '';
						name = '';
						distance = '';
						rates = '';
						icon = '';
						smoke = 0;
						pet = 0;
						ext = 0;
						int = 0;
					}
					 if(phone == undefined)
						phone = '';
					 if(name == undefined)
						name = '';
					 if(distance == undefined)
						distance = '';
					 if(rates == undefined)
						rates = '';
					 if(icon == undefined)
						icon = '';
					 if(smoke == undefined)
						smoke = 0;
					 if(pet == undefined)
						pet = 0;
					 if(ext == undefined)
						ext = 0;
					 if(int == undefined)
						int = 0;
						
					var num = new Number(distance);
					var miles = num.toFixed(2);
						
					if(rates != ''){
												var num = new Number(rates);
												var numRate = '$'+num.toFixed(2);
												}
												else{
													var numRate = 'Call for Rate';
												}		
						
					if(smoke == 1){
						var iconSmoke='<img src="themes/mistay/img/images/sm-icon-s.png" border="0" />';																												                            }else{
						var iconSmoke='';
					}
					if(pet == 1){
						var iconPet='<img src="themes/mistay/img/images/animal-icon-s.png" border="0" />';							                        }else{
						var iconPet='';
					}
					if(ext == 1){
						var iconExt='<img src="themes/mistay/img/images/out-icon-s.png" border="0" />';	
					}else
					{
						var iconExt='';
					}
					if(int == 1){
						var iconInt='<img src="themes/mistay/img/images/in-icon-s.png" border="0" />';	
					}else
					{
						var iconInt='';
					}
													
					var data = '<li class="arrow"><a href="javascript:void(0)" onClick=hotelDetails('+phone+')><table width="100%"><tr><td width="25%" rowspan="2"><div style="background:url(themes/mistay/img/hotel--bg.png) no-repeat;height:47px;"><img src="'+baseURL+'brandIcon/'+icon+'" height="35"  width="35" style="margin:0px 0px 0px 10px" border="0"  /></div></td><td class="'+textColour+'"  width="40%">'+miles+' miles</td><td class="'+textColour+'"  width="25%">'+numRate+'</td></tr><tr><td align="left" colspan="2">'+iconSmoke+iconPet+iconExt+iconInt+'</td></tr></table></a></li>';
							
					$('#FavData').append(data);
					} // for loop
					jQT.goTo('#hotelFavScreen','slide');
					return false; 	 	
				  } // Count record
			   } // check null
		   }
		   
	 });
}
}

function searchList(){		
			$('#test').empty();
			var city 		=	$('#city').val();
			var zipcode 	=	$('#zipcode').val();
			var distance 	=	$('#distance').val();
			var filterValue = [];
	$('#filter :selected').each(function(i, selected) {
    	filterValue[i] = $(selected).val();
	});	
	var element = String(filterValue).split(","); 
	for(var i=0;i<element.length;i++){
		if(element[i]== 'smoke')
		var smoke='1';
		if(element[i]== 'pet')
		var pet='1';
		if(element[i]== 'int')
		var int='1';
		if(element[i]== 'ext')
		var ext='1';
	}
	 if(smoke == undefined)
		smoke = '';
	 if(pet == undefined)
		pet = '';
	 if(int == undefined)
		int = '';
 	 if(ext == undefined)
		ext = '';
			var lat,lng;
			
			sessionStorage.setItem('city',city );      // defining the session variable for city 
			sessionStorage.setItem('zipcode',zipcode); // defining the session variable for zipcode 
			
			var getCity = sessionStorage.getItem('city');
			var getZip  = sessionStorage.getItem('zipcode');
			var getLat  = sessionStorage.getItem('lat');
			var getLng  = sessionStorage.getItem('lng');
			
			if(getCity == 'Enter City' && getZip == 'Enter Zipcode'){
				alert('Please select atleast one search criteria.');
				return false;
			}
			if(getZip != '' && (getCity == '' || getCity == 'Enter City') ){
				$.blockUI({ message: null }); 
		  		$('#ajaxLoader').show();
				var geocoder = new google.maps.Geocoder();
				geocoder.geocode({address: getZip}, function(results, status) {
				
				if (status == google.maps.GeocoderStatus.OK) {
					lat =results[0].geometry.location.lat();
			 		lng =results[0].geometry.location.lng();
					sessionStorage.setItem('searchLat',lat ); 
					sessionStorage.setItem('searchLng',lng ); 
					$.ajax({
						type:"POST",
						url:ajaxURL+"getSearchResult.php",
						dataType:"json",
						beforeSend: function(){
							$.blockUI({ message: null }); 
		  					$('#ajaxLoader').show();
						},						
						complete: function(){
						 	$.unblockUI();
						 	$('#ajaxLoader').hide();
						},
						data: 'distance='+distance+'&orderBy=asc&'+'smoke='+smoke+'&pet='+pet+'&ext='+ext+'&int='+int+'&lat='+lat+'&lng='+lng,
						success:function(json){	
							if(json != null){
			 					var countRecord = json.length;
			 					if(countRecord > 0 && json !=null){
									for(var i = 0; i < countRecord; ++i)
									{
									 if(i < 3){
											var textColour = 'listGreen';	
										}else{
											var textColour = 'listYellow';	
										}
										try{
											var phone 		= json[i].phone;
											var distance	= json[i].distance;
											var rates 		= json[i].rates;
											var icon 		= json[i].icon;
											var smoke 		= json[i].smoke;
											var pet 		= json[i].pet;
											var ext 		= json[i].ext;
											var int 		= json[i].int;						
											}catch(e){
												phone = '';
												name = '';
												distance = '';
												rates = '';
												icon = '';
												smoke = 0;
												pet = 0;
												ext = 0;
												int = 0;								
										       }
											 	if(phone == undefined)
													phone = '';
											 	if(name == undefined)
													name = '';
											 	if(distance == undefined)
													distance = '';
											 	if(rates == undefined)
													rates = '';
												if(icon == undefined)
													icon = '';
												if(smoke == undefined)
													smoke = 0;
												if(pet == undefined)
													pet = 0;
												if(ext == undefined)
													ext = 0;
												if(int == undefined)
													int = 0;
												var num = new Number(distance);
												var miles = num.toFixed(2);	
												
												if(rates != ''){
												var num = new Number(rates);
												var numRate = '$'+num.toFixed(2);
												}
												else{
													var numRate = 'Call for Rate';
												}											
																						
												if(smoke == 1){
												var iconSmoke='<img src="themes/mistay/img/images/sm-icon-s.png" border="0"/>';																												                             					}else{
												var iconSmoke = '';
												}
												if(pet == 1){
												var iconPet='<img src="themes/mistay/img/images/animal-icon-s.png" border="0" />';							                                                }else{
												var iconPet = '';
												}
												if(ext == 1){
												var iconExt='<img src="themes/mistay/img/images/out-icon-s.png" border="0" />';	
												}else{
												var iconExt = '';
												}
												if(int == 1){
												var iconInt='<img src="themes/mistay/img/images/in-icon-s.png" border="0" />';	
												}else{
												var iconInt = '';
												}
										var data = '<li class="arrow"><a onClick=hotelDetails('+phone+')><table width="100%"><tr><td width="25%" rowspan="2"><div style="background:url(themes/mistay/img/hotel--bg.png) no-repeat;height:47px;"><img src="'+baseURL+'brandIcon/'+icon+'" height="38"  width="40" style="margin:0px 0px 0px 10px" border="0"  /></div></td><td class="'+textColour+'"  width="40%">'+miles+' miles</td><td class="'+textColour+'"  width="25%">'+numRate+'</td></tr><tr><td align="left" colspan="2">'+iconSmoke+iconPet+iconExt+iconInt+'</td></tr></table></a></li>';																		
				   				$('#test').append(data);
								}
								
							 }
			 				else{
								alert('There is no Hotel in search criteria,please try again!');
								$('#zipcode').val('');
								window.localStorage.removeItem("getZip");
								return false;
							 	} 
							}
			 				else{	
								alert('There is no Hotel in search criteria,please try again!');
								window.localStorage.removeItem("getZip");
								$('#zipcode').val('');
								return false;
			 				}
							jQT.goTo('#hotelListScreen','slide'); 
							return false; 		
			 			}
					 });
					} else {
						 $.unblockUI();
						 $('#ajaxLoader').hide();
						alert(zipcode + ' not found');
						return false;
					}
			 	});	 
			}
			else if(getCity != '' || getCity != 'Enter City') {
					if (getCity.match(/^[a-zA-Z, ]+$/)){ 
					$.blockUI({ message: null }); 
		  	$('#ajaxLoader').show();					
	  	 		var geocoder = new google.maps.Geocoder();
     			geocoder.geocode({address: getCity}, function(results, status) {
      			if (status == google.maps.GeocoderStatus.OK) {		
       			var center = results[0].geometry.location;
	   				lat =center.lat();
					lng =center.lng();
					sessionStorage.setItem('searchLat',lat ); 
		   			sessionStorage.setItem('searchLng',lng ); 
					$.ajax({
						type:"POST",
						url:ajaxURL+"getSearchResult.php",
						dataType:"json",
						beforeSend: function(){
							$.blockUI({ message: null }); 
		  					$('#ajaxLoader').show();
						},						
				complete: function(){
						 $.unblockUI();
						 $('#ajaxLoader').hide();
						},
						data: 'distance='+distance+'&orderBy=asc&'+'smoke='+smoke+'&pet='+pet+'&ext='+ext+'&int='+int+'&lat='+lat+'&lng='+lng,
						success:function(json){			
							if(json != null){
			 					var countRecord = json.length;
			 					if(countRecord > 0 && json !=null){
									for(var i = 0; i < countRecord; ++i){
										if(i < 3){
											var textColour = 'listGreen';	
										}else{
											var textColour = 'listYellow';	
										}				
										try{
											var phone 		= json[i].phone;
											var distance	= json[i].distance;
											var rates 		= json[i].rates;
											var icon 		= json[i].icon;
											var smoke 		= json[i].smoke;
											var pet 		= json[i].pet;
											var ext 		= json[i].ext;
											var int 		= json[i].int;									
										}catch(e){
											phone = '';
											name = '';
											distance = '';
											rates = '';
											icon = '';
											smoke = 0;
											pet = 0;
											ext = 0;
											int = 0;					
										}
										if(phone == undefined)
											phone = '';
										if(name == undefined)
											name = '';
										if(distance == undefined)
											distance = '';
										if(rates == undefined)
											rates = '';
										if(icon == undefined)
											icon = '';
										if(smoke == undefined)
											smoke = 0;
										if(pet == undefined)
											pet = 0;
										if(ext == undefined)
											ext = 0;
										if(int == undefined)
											int = 0;					
									var num = new Number(distance);
									var miles = num.toFixed(2);					
										if(rates != ''){
												var num = new Number(rates);
												var numRate = '$'+num.toFixed(2);
												}
												else{
													var numRate = 'Call for Rate';
												}	
					
									if(smoke == 1){
										var iconSmoke='<img src="themes/mistay/img/images/sm-icon-s.png" border="0" />';																												                             		}else{
										var iconSmoke='';
										}
									if(pet == 1)
									{
										var iconPet='<img src="themes/mistay/img/images/animal-icon-s.png" border="0" />';							                            		}else{
									var iconPet='';
									}									
									if(ext == 1){
										var iconExt='<img src="themes/mistay/img/images/out-icon-s.png" border="0" />';	
									}else{
										var iconExt='';
									}if(int == 1){
										var iconInt='<img src="themes/mistay/img/images/in-icon-s.png" border="0" />';	
									}else{
										var iconInt='';
									}
																			
					var data = '<li class="arrow"><a href="javascript:void(0)" onClick=hotelDetails('+phone+')><table width="100%"><tr><td width="25%" rowspan="2"><div style="background:url(themes/mistay/img/hotel--bg.png) no-repeat;height:47px;"><img src="'+baseURL+'brandIcon/'+icon+'" height="35"  width="35" style="margin:0px 0px 0px 10px" border="0"  /></div></td><td class="'+textColour+'"  width="40%">'+miles+' miles</td><td class="'+textColour+'"  width="25%">'+numRate+'</td></tr><tr><td align="left" colspan="2">'+iconSmoke+iconPet+iconExt+iconInt+'</td></tr></table></a></li>';
					 $('#test').append(data);
				
				}
			 } else{
				window.localStorage.removeItem("getCity");
				$('#city').val('');
				alert('There is no Hotel in search criteria,please try again!');
				return false;
			 	}		 
			 }else{
				window.localStorage.removeItem("getCity");
				$('#city').val('');
				alert('There is no Hotel in search criteria,please try again!');
				return false;
			 }			 
				jQT.goTo('#hotelListScreen','slide');
				return false; 	 	
			 }			 	
		   });	   
       } else {
          $.unblockUI();
		 $('#ajaxLoader').hide();
		 alert(getCity + ' not found');
		 $('#city').val('');
		 return false; 	
       }
     });	
	 		} else {
				alert('Invalid city name.');
				$('#city').val('');
				return false;
			}
   }
} // END OF  searchList
function hotelDetails( phone ){
		if(phone == '')	{
			var phone = $('#phoneId').val();
		}
			$('#roomHotel').empty();
			$('#iconHotel').empty();
			$('#nameHotel').empty();
			$('#infoPhone').empty();			
			$.ajax({
        		type:"POST",
				url:ajaxURL+"getHotelDetails.php",
				dataType:"json",
        		data: 'phone='+phone,
				beforeSend: function(){
							$.blockUI({ message: null }); 
		  					$('#ajaxLoader').show();
						},						
				complete: function(){
						 $.unblockUI();
						 $('#ajaxLoader').hide();
						},
        		success:function(json){
					if(json != null){
					 var countRecord = json.length;
					 if(countRecord > 0) {
           			 	for(var i = 0; i < countRecord; ++i){
							try{
                    		var name 	= json[i].name;
							var icon	= json[i].icon;
							var rate 	= json[i].rate;
							var type 	= json[i].type;
							var address = json[i].address;
							var newPhone = json[i].newPhone;
							var discount	= json[i].discount;
							}catch(e){
                    		name = '';
							icon = '';
							rate = '';
							type = '';
							address = '';
							newPhone ='';
							discount ='';
							}
               			 	if(name == undefined)
                    		name = '';
						 	if(icon == undefined)
                    		icon = '';
						 	if(rate == undefined)
                    		rate = '';
						 	if(type == undefined)
                    		type = '';
						 	if(address == undefined)
                    		address = '';
							if(newPhone == undefined)
                    		newPhone = '';
							if(discount == undefined)
                    		discount = '';
							
								if(rate != ''){
								var num = new Number(rate);
								var numRate = '$'+num.toFixed(2);
								var nameHotel = '<tr><td width="210" align="left" valign="top">'+type+' Beds Room</td><td valign="top" align="left">'+numRate+'</td></tr>';
							
							}
							else{
				
						var numRate = 'Please call hotel to get '+discount+'% discount off of the lowest room rate.<div align="left" style="font-size:9px;padding-top:10px;" >*Based on Availability</div>';
					var nameHotel = '<tr><td colspan="2" style="padding-top:20px;" width="210" align="center" valign="top">'+numRate+'</td></tr>';
				
							}
						   $('#roomHotel').append(nameHotel);
						}// for loop
						var iconImage = '<img src="'+baseURL+icon+'" width="124px" height="95px" border="0" />';
						$('#iconHotel').append(iconImage);
						var nameHotel = '<table style="padding-left:20px;" border="0"><tr><td align="left"  valign="top"><span style="font-size:19px;font-weight:bold;">'+name+'</span>&nbsp;<img id="favDetail" onClick="favStarDetail('+phone+');" src="themes/mistay/img/star_i.png" border="0"><input type="hidden" name="star" id="starDetail" value="0"/></td></tr><tr><td valign="bottom" align="left">'+address+'</td></tr></table>';
						$('#nameHotel').append(nameHotel);						
						$('#phoneId').val(phone);
						$('#infoPhone').append('<a onClick="callInfo();callTrack('+phone+');" href="tel:'+phone+'">Call '+newPhone+'</a>');
						
					   } // count record 
				    } // check null
					jQT.goTo('#hotelDetailScreen','slide');
					return false; 		 
	     		  }
		       });	
       	}	// END OF  hotelDetails	
		
function sortResult(orderName){	
	$('#test').empty();		
	if(orderName == 'distance'){
		document.getElementById('distanceImg').src='themes/mistay/img/Distance-on .png';
		document.getElementById('priceImg').src='themes/mistay/img/Price-off.png';
		document.getElementById('nameImg').src='themes/mistay/img/name-off.png';
	}
	if(orderName == 'price'){
		document.getElementById('distanceImg').src='themes/mistay/img/Distance-off.png';
		document.getElementById('priceImg').src='themes/mistay/img/Price-on.png';
		document.getElementById('nameImg').src='themes/mistay/img/name-off.png';
	}
	if(orderName == 'name'){
		document.getElementById('distanceImg').src='themes/mistay/img/Distance-off.png';
		document.getElementById('priceImg').src='themes/mistay/img/Price-off.png';
		document.getElementById('nameImg').src='themes/mistay/img/name-on.png';
	}
	
	var getLat  = sessionStorage.getItem('lat');
	var getLng  = sessionStorage.getItem('lng');
	var lat = sessionStorage.getItem('searchLat');
	var lng  = sessionStorage.getItem('searchLng');	
	if(lat == null && lng == null)
	{
	 latitude  = getLat;
	 longitude = getLng;
	}
	else {
	 latitude  = lat;
	 longitude = lng;
	}					
			var distance 	=	$('#distance').val();
			var filterValue = [];
	$('#filter :selected').each(function(i, selected) {
    	filterValue[i] = $(selected).val();
	});	
	var element = String(filterValue).split(","); 
	for(var i=0;i<element.length;i++){
		if(element[i]== 'smoke')
		var smoke='1';
		if(element[i]== 'pet')
		var pet='1';
		if(element[i]== 'int')
		var int='1';
		if(element[i]== 'ext')
		var ext='1';
	}
	 if(smoke == undefined)
		smoke = '';
	 if(pet == undefined)
		pet = '';
	 if(int == undefined)
		int = '';
 	 if(ext == undefined)
		ext = '';
								

		 $.ajax({
					type:"POST",
					url:ajaxURL+"getSearchResult.php",
					dataType:'json',
					data: 'distance='+distance+'&smoke='+smoke+'&pet='+pet+'&ext='+ext+'&int='+int+'&orderName='+orderName+'&lat='+latitude+'&lng='+longitude,
					beforeSend: function(){
							$.blockUI({ message: null }); 
		  					$('#ajaxLoader').show();
						},						
				    complete: function(){
						 $.unblockUI();
						 $('#ajaxLoader').hide();
						},	
					
					success:function(json){		
						if(json != null){
						 var countRecord = json.length;
					 	if(countRecord > 0 && json !=null){					 	
							for(var i = 0; i < countRecord; ++i){
							if(i < 3){
								var textColour = 'listGreen';	
							}else{
								var textColour = 'listYellow';	
							}
						try{
                    		var phone 		= json[i].phone;
							var distance	= json[i].distance;
							var rates 		= json[i].rates;
							var icon 		= json[i].icon;
							var smoke 		= json[i].smoke;
							var pet 		= json[i].pet;
							var ext 		= json[i].ext;
							var int 		= json[i].int;
						}catch(e){
                    		phone = '';
							name = '';
							distance = '';
							rates = '';
							icon = '';
							smoke = 0;
							pet = 0;
							ext = 0;
							int = 0;
						}
               			 if(phone == undefined)
                    		phone = '';
						 if(name == undefined)
                    		name = '';
						 if(distance == undefined)
                    		distance = '';
						 if(rates == undefined)
                    		rates = '';
						 if(icon == undefined)
                    		icon = '';
						 if(smoke == undefined)
                    		smoke = 0;
						 if(pet == undefined)
                    		pet = 0;
						 if(ext == undefined)
                    		ext = 0;
						 if(int == undefined)
                    		int = 0;
							
							var num = new Number(distance);
							var miles = num.toFixed(2);
							
								if(rates != ''){
												var num = new Number(rates);
												var numRate = '$'+num.toFixed(2);
												}
												else{
													var numRate = 'Call for Rate';
												}
							
							if(smoke == 1){
								var iconSmoke='<img src="themes/mistay/img/images/sm-icon-s.png" border="0" />';																												                            }else{
								var iconSmoke='';
							}
							if(pet == 1){
								var iconPet='<img src="themes/mistay/img/images/animal-icon-s.png" border="0" />';							                            }else
							{
								var iconPet='';
							}
							if(ext == 1){
								var iconExt='<img src="themes/mistay/img/images/out-icon-s.png" border="0" />';	
							}else
							{
								var iconExt='';
							}
							if(int == 1){
								var iconInt='<img src="themes/mistay/img/images/in-icon-s.png" border="0" />';	
							}else
							{
								var iconInt='';
							}
														
								  
								   var data = '<li class="arrow"><a href="javascript:void(0)" onClick=hotelDetails('+phone+')><table width="100%"><tr><td width="25%" rowspan="2"><div style="background:url(themes/mistay/img/hotel--bg.png) no-repeat;height:47px;"><img src="'+baseURL+'brandIcon/'+icon+'" height="35"  width="35" style="margin:0px 0px 0px 10px" border="0"  /></div></td><td class="'+textColour+'"  width="40%">'+miles+' miles</td><td class="'+textColour+'"  width="25%">'+numRate+'</td></tr><tr><td align="left" colspan="2">'+iconSmoke+iconPet+iconExt+iconInt+'</td></tr></table></a></li>';								
							$('#test').append(data);
								
						}	
						
					 }
					 else {
					 	alert('There is no Hotel in search criteria,please try again!');
								return false;
					 } 
				   }
				   else {
						alert('There is no Hotel in search criteria,please try again!');
								return false;
					 }			 
					 
				}
			});
		  }	// END OF  sortResult			
function searchScreen(){
	 $.blockUI({ 
            message: null, 
            timeout: 100 
        });
	jQT.goTo('#searchScreen','slide'); 	
}	// END OF  searchScreen

function mapSCreen(){
	 $.blockUI({ 
            message: null, 
            timeout: 100 
        });
	jQT.goTo('#hotelGEOScreen','slide');  		
} // END OF  mapSCreen

function helpWindow(){
	 $.blockUI({ 
            message: null, 
            timeout: 100 
        });
	jQT.goTo('#helpScreen','slide');		
} // END OF  helpWindow
function tellafriend(){
	 $.blockUI({ 
            message: null, 
            timeout: 100 
        });
	jQT.goTo('#tellafriend','slide'); 	
}
function homeScreen(){
	$.blockUI({ 
            message: null, 
            timeout: 100 
        });
		var $homeLoader = $('#home').find('.homeLoader');
		$('#loaderTitle').hide();				
		$homeLoader.hide();
		$('.headerLogo').show();
	jQT.goTo('#home','slide');
	return false; 	 	
}  

function echeck(str) {
		var at="@"
		var dot="."
		var lat=str.indexOf(at)
		var lstr=str.length
		var ldot=str.indexOf(dot)
		if (str.indexOf(at)==-1){
		   alert("Invalid E-mail ID");
		   return false;
		}if (str.indexOf(at)==-1 || str.indexOf(at)==0 || str.indexOf(at)==lstr){
		   alert("Invalid E-mail ID");
		   return false;
		}if (str.indexOf(dot)==-1 || str.indexOf(dot)==0 || str.indexOf(dot)==lstr){
		    alert("Invalid E-mail ID");
		    return false;
		}if (str.indexOf(at,(lat+1))!=-1){
		    alert("Invalid E-mail ID");
		    return false;
		}if (str.substring(lat-1,lat)==dot || str.substring(lat+1,lat+2)==dot){
		    alert("Invalid E-mail ID");
		    return false;
		}if (str.indexOf(dot,(lat+2))==-1){
		    alert("Invalid E-mail ID");
		    return false;
		}if (str.indexOf(" ")!=-1){
		    alert("Invalid E-mail ID");
		    return false;
		}
 		 return true;					
	}	
	
	function sendMail(){
	var emailFrom 	=	$('#emailTo').val();
	var emailTo 	=	$('#emailFrom').val();
	var emailCc 	=	$('#emailCc').val();
	if(emailFrom == ''){
		alert('Please Specify Email in From field.');
		return false;
	}
	if (echeck(emailFrom)==false){
		$('#emailFrom').val('');
		return false;
	}
	if(emailTo == ''){
		alert('Please Specify Email in To field.');
		return false;
	}if (echeck(emailTo)==false){
		$('#emailTo').val('');
		return false;
	}
	if(emailCc != '' && echeck(emailCc)==false){
			$('#emailCc').val('');
			return false;
	}else{
	 $.ajax({
				type:"POST",
				url:ajaxURL+"tellafriend.php",
				data: 'emailFrom='+emailFrom+'&emailTo='+emailTo+'&emailCc='+emailCc,					
				beforeSend: function(){							
							$.blockUI({ message: null }); 
		  					$('#ajaxLoader').show();
							checkNetwok();
						},						
				complete: function(){
						 $.unblockUI();
						 $('#ajaxLoader').hide();
						},
				success:function(json){	
					if(json == 1){
						$('#emailFrom').val('');
						$('#emailTo').val('');
						$('#emailCc').val('');
						alert('Mail Sent Successfully!');
						jQT.goTo('#searchScreen','slide');
						return false; 	 	
					} else {
						alert('Some Problem,Try Again!');
						jQT.goTo('#searchScreen','slide');
						return false; 	 
					}
				  }
			 });
	      }	
     }// END OF sendMail 
	 
	function callInfo(){
    	$('.mainDiv').css('opacity','0.2');
		$('.lightDiv').toggle();
		if( $('.mainDiv').width() >= 480 ){
			$('.lightDiv').css('left','110px');
			$('.lightDiv').css('top','190px');
		}else{
			$('.lightDiv').css('left','25px');
		}
	}
	
	function callInfoDesc(){
		$('#mainDivDesc').css('opacity','0.2');
		$('#lightDivDesc').toggle();
		if( $('#mainDivDesc').width() >= 480 ){
			$('#lightDivDesc').css('left','110px');
			$('#lightDivDesc').css('top','190px');
		}else{
			$('#lightDivDesc').css('left','25px');
		}
	}
	
	function callInfoGeo(){
   	 $('#mainDivGeo').css('opacity','0.2');
		$('#lightDivGeo').toggle();
		if( $('#mainDivGeo').width() >= 480 ){
			$('#lightDivGeo').css('left','110px');
			$('#lightDivGeo').css('top','190px');
		}else{
			$('#lightDivGeo').css('left','25px');
		}
	}
	function feedbackForm(val){
	    $.blockUI({ 
            message: null, 
            timeout: 100 
        });
		$.ajax({
					type:"POST",
					url:ajaxURL+"setfeedback.php",
					dataType:'json',
					beforeSend: function(){
							$.blockUI({ message: null }); 
		  					$('#ajaxLoader').show();
						},						
				complete: function(){
						 $.unblockUI();
						 $('#ajaxLoader').hide();
						
						},				
					success:function(json){		
						if(json != null){
						 var countRecord = json.length;
					 	if(countRecord > 0 && json !=null){					 	
							for(var i = 0; i < countRecord; ++i){
								var reasons	= json[i].reasons;
								var data = '<option value="'+reasons+'">'+reasons+'</option>';								
								$('#ques1').append(data);					
							}	
											
					 }
				   }
				}
			});	

document.getElementById('satisfy1').checked = false;
document.getElementById('satisfy2').checked = false;
document.getElementById('satisfy3').checked = false;
$('#ans3').val('');		
    	if(val == 1){
			$('.mainDiv').css('opacity','1.0');
	    	$('.lightDiv').toggle(); 
  		}if(val == 2){
	   		$('#mainDivDesc').css('opacity','1.0');
	   		$('#lightDivDesc').toggle(); 
		}if(val == 3){
	   		$('#mainDivGeo').css('opacity','1.0');
	   		$('#lightDivGeo').toggle(); 
		}	
	   jQT.goTo('#feedbackScreen','slide');  		 
	} 
	
	function callTrack(phone){
		var platform = device.platform ;
	    var uuid     = device.uuid ;
	    var name     = device.name ;
		if(phone != undefined){
		var getLat  = sessionStorage.getItem('lat');
	var getLng  = sessionStorage.getItem('lng');
	var lat = sessionStorage.getItem('searchLat');
	var lng  = sessionStorage.getItem('searchLng');	
	if(lat == null && lng == null)
	{
	 latitude  = getLat;
	 longitude = getLng;
	}
	else {
	 latitude  = lat;
	 longitude = lng;
	}	 

	  	$.ajax({
			type:"POST",
			url:ajaxURL+"trackCallInfo.php",
			beforeSend: function(){
							$.blockUI({ message: null }); 
		  					$('#ajaxLoader').show();
						},						
				complete: function(){
						 $.unblockUI();
						 $('#ajaxLoader').hide();
						},
			data: 'phone='+phone+'&platform='+platform+'&uuid='+uuid+'&name='+name+'&longitude='+longitude+'&latitude='+latitude
		       });	 
          }
	   }
/*	   
   function radioNo(){
		$('#reasons').show();
		$('#ques3').hide();
		$('#ques2').hide();		 
		$('input:radio[name=satisfy]:checked').val('');
	}
	
   function radioYes(){
		$('#reasons').hide();
		$('#ques3').show();
		$('#ques2').show();
		$('#ques1').val('');
	}
*/
function getFeedback(){
	var rdolen = document.frmFeedback.res.length;
	for(var i =0; i<rdolen; i++){
		if((document.frmFeedback.res[i].checked) && document.frmFeedback.res[i].value == 'Y'){
			$('#reasons').hide();
			$('#ques3').show();
			$('#ques2').show();
		}
		else if((document.frmFeedback.res[i].checked) && document.frmFeedback.res[i].value == 'N'){ 
			$('#reasons').show();
			$('#ques1').empty();
			$.ajax({
					type:"POST",
					url:ajaxURL+"setfeedback.php",
					dataType:'json',
					beforeSend: function(){
							$.blockUI({ message: null }); 
		  					$('#ajaxLoader').show();
						},						
				    complete: function(){
						 $.unblockUI();
						 $('#ajaxLoader').hide();
						
						},				
					success:function(json){		
						if(json != null){
						 var countRecord = json.length;
					 	if(countRecord > 0 && json !=null){					 	
							$data ='<option value="0">Select</option>';
							$('#ques1').append(data);
							for(var i = 0; i < countRecord; ++i){
								var reasons	= json[i].reasons;
								var data = '<option value="'+reasons+'">'+reasons+'</option>';								
								$('#ques1').append(data);					
							}	
											
					 }
				   }
				}
			});	

			$('#ques3').hide();
			$('#ques2').hide();		 
			$('input:radio[name=satisfy]:checked').val('');
		}
	}
}
function make_blank(text,value,id){
		if(text == value)
		{
			document.getElementById(id).value = "";
		}
		if(text == "")
		{
			document.getElementById(id).value = value;
		}
	}
function goBack(){
	jQT.goBack();
} // END OF FUNCTION 
	


/**
 * AutoComplete Field - JavaScript Code
 *
 * This is a sample source code provided by fromvega.
 * Search for the complete article at http://www.fromvega.com
 *
 * Enjoy!
 *
 * @author fromvega
 *
 */

// global variables
var acListTotal   =  0;
var acListCurrent = -1;
var acDelay		  = 500;
var acURL		  = null;
var acSearchId	  = null;
var acResultsId	  = null;
var acSearchField = null;
var acResultsDiv  = null;

function setAutoComplete(field_id, results_id, get_url){

	// initialize vars
	acSearchId  = "#" + field_id;
	acResultsId = "#" + results_id;
	acURL 		= get_url;

	// create the results div
	$("#search").append('<div id="' + results_id + '"></div>');

	// register mostly used vars
	acSearchField	= $(acSearchId);
	acResultsDiv	= $(acResultsId);

	// reposition div
	repositionResultsDiv();
	
	// on blur listener
	acSearchField.blur(function(){ setTimeout("clearAutoComplete()", 200) });

	// on key up listener
	acSearchField.keyup(function (e) {

		// get keyCode (window.event is for IE)
		var keyCode = e.keyCode || window.event.keyCode;
		var lastVal = acSearchField.val();

		// check an treat up and down arrows
		if(updownArrow(keyCode)){
			return;
		}

		// check for an ENTER or ESC
		if(keyCode == 13 || keyCode == 27){
			clearAutoComplete();
			return;
		}

		// if is text, call with delay
		setTimeout(function () {autoComplete(lastVal)}, acDelay);
	});
}

// treat the auto-complete action (delayed function)
function autoComplete(lastValue)
{
	
	// get the field value
	var part = acSearchField.val();
		// if it's empty clear the resuts box and return
	if(part == ''){
		clearAutoComplete();
		return;
	}

	// if it's equal the value from the time of the call, allow
	if(lastValue != part){
		return;
	}

	// get remote data as JSON
	
	$.ajax({
        		type:"POST",
				url:acURL,
				dataType:"json",
        		data: 'part='+part,
        		success:function(json){
					if(json != null)
					{
					 var countRecord = json.length;
					 if(countRecord > 0)
					 {
           			 	

			var newData = '';

			// create a div for each result
			for(i=0; i < countRecord; i++) {
				newData += '<div align="left" class="unselected">' + json[i] + '</div>';
			}

			// update the results div
			acResultsDiv.html(newData);
			acResultsDiv.css("display","block");
			
			// for all divs in results
			var divs = $(acResultsId + " > div");
		
			// on mouse over clean previous selected and set a new one
			divs.mouseover( function() {
				divs.each(function(){ this.className = "unselected"; });
				this.className = "selected";
			})
		
			// on click copy the result text to the search field and hide
			divs.click( function() {
				acSearchField.val(this.childNodes[0].nodeValue);
				clearAutoComplete();
			});

		
					   }
					   else {
			clearAutoComplete();
		}
		// count record 
				    } // check nul
	     		  }
		       });
}

// clear auto complete box
function clearAutoComplete()
{
	acResultsDiv.html('');
	acResultsDiv.css("display","none");
}

// reposition the results div accordingly to the search field
function repositionResultsDiv()
{
	// get the field position
	var sf_pos    = acSearchField.offset();
	var sf_top    = sf_pos.top;
	var sf_left   = sf_pos.left;

	// get the field size
	var sf_height = acSearchField.height();
	var sf_width  = acSearchField.width();

	// apply the css styles - optimized for Firefox
	acResultsDiv.css("position","absolute");
	acResultsDiv.css("left", sf_left - 2);
	acResultsDiv.css("top", sf_top + sf_height + 5);
	acResultsDiv.css("width", sf_width - 2);
}


// treat up and down key strokes defining the next selected element
function updownArrow(keyCode) {
	if(keyCode == 40 || keyCode == 38){

		if(keyCode == 38){ // keyUp
			if(acListCurrent == 0 || acListCurrent == -1){
				acListCurrent = acListTotal-1;
			}else{
				acListCurrent--;
			}
		} else { // keyDown
			if(acListCurrent == acListTotal-1){
				acListCurrent = 0;
			}else {
				acListCurrent++;
			}
		}

		// loop through each result div applying the correct style
		acResultsDiv.children().each(function(i){
			if(i == acListCurrent){
				acSearchField.val(this.childNodes[0].nodeValue);
				this.className = "selected";
			} else {
				this.className = "unselected";
			}
		});

		return true;
	} else {
		// reset
		acListCurrent = -1;
		return false;
	}
}

/**
 * AutoComplete Field - JavaScript Code
 *
 * This is a sample source code provided by fromvega.
 * Search for the complete article at http://www.fromvega.com
 *
 * Enjoy!
 *
 * @author fromvega
 *
 */

// global variables
var acListTotal   =  0;
var acListCurrent = -1;
var acDelay		  = 200;
var acSearchId	  = null;
var acResultsId	  = null;
var acSearchField = null;
var acResultsDiv  = null;

function setAutoContact(field_id, results_id,divId){
	// initialize vars
	acSearchId  = "#" + field_id;
	acResultsId = "#" + results_id;
	// create the results div
	$("#"+divId).append('<div id="' + results_id + '"></div>');

	// register mostly used vars
	acSearchField	= $(acSearchId);
	acResultsDiv	= $(acResultsId);

	// reposition div
	repositionResultsDiv();
	
	// on blur listener
	acSearchField.blur(function(){ setTimeout("clear()", 200) });

	// on key up listener
	acSearchField.keyup(function (e) {

		// get keyCode (window.event is for IE)
		var keyCode = e.keyCode || window.event.keyCode;
		var lastVal = acSearchField.val();

		// check an treat up and down arrows
		if(updownArrow(keyCode)){
			return;
		}

		// check for an ENTER or ESC
		if(keyCode == 13 || keyCode == 27){
			clear();
			return;
		}

		// if is text, call with delay
		setTimeout(function () {autoContact(lastVal)}, acDelay);
	});
}



function onSuccess(contacts) {
	
	var newData = '';
	
	// create a div for each result
	for (var i=0; i<contacts.length; i++) {		
		for (var k = 0; k < contacts[i].emails.length; ++k) {
			newData += '<div align="left" class="unselected">' + contacts[i].emails[k].value + '</div>';
		}
	}	
	// update the results div
	acResultsDiv.html(newData);
	acResultsDiv.css("display","block");
	
	// for all divs in results
	var divs = $(acResultsId + " > div");
	
	// on mouse over clean previous selected and set a new one
	divs.mouseover( function() {
				   divs.each(function(){ this.className = "unselected"; });
				   this.className = "selected";
				   })
	
	// on click copy the result text to the search field and hide
	divs.click( function() {
			   acSearchField.val(this.childNodes[0].nodeValue);
			   clearAutoComplete();
			   });
	
}

// onError: Failed to get the contacts
function onError() {
	navigator.notification.alert('No Contacts Found.','','Info','Ok');
}

// treat the auto-complete action (delayed function)
function autoContact(lastValue)
{
	// get the field value
	var part = acSearchField.val();
		// if it's empty clear the resuts box and return
	if(part == ''){
	//	alert('empty')
		clear();
		return;
	}

	// if it's equal the value from the time of the call, allow
	if(lastValue != part){
		//alert('set')
		return;
	}
	if(lastValue != ''){		
		var options = new ContactFindOptions();
		options.filter=lastValue; 
		var fields = ["emails"];
		navigator.service.contacts.find(fields, onSuccess, onError, options);
	}
}

// clear auto complete box
function clear()
{
	acResultsDiv.html('');
	acResultsDiv.css("display","none");
}

// reposition the results div accordingly to the search field
function repositionResultsDiv()
{
	// get the field position
	var sf_pos    = acSearchField.offset();
	var sf_top    = sf_pos.top;
	var sf_left   = sf_pos.left;

	// get the field size
	var sf_height = acSearchField.height();
	var sf_width  = acSearchField.width();

	// apply the css styles - optimized for Firefox
	acResultsDiv.css("position","absolute");
	acResultsDiv.css("left", sf_left - 2);
	acResultsDiv.css("top", sf_top + sf_height + 5);
	acResultsDiv.css("width", sf_width - 2);
}


// treat up and down key strokes defining the next selected element
function updownArrow(keyCode) {
	if(keyCode == 40 || keyCode == 38){

		if(keyCode == 38){ // keyUp
			if(acListCurrent == 0 || acListCurrent == -1){
				acListCurrent = acListTotal-1;
			}else{
				acListCurrent--;
			}
		} else { // keyDown
			if(acListCurrent == acListTotal-1){
				acListCurrent = 0;
			}else {
				acListCurrent++;
			}
		}

		// loop through each result div applying the correct style
		acResultsDiv.children().each(function(i){
			if(i == acListCurrent){
				acSearchField.val(this.childNodes[0].nodeValue);
				this.className = "selected";
			} else {
				this.className = "unselected";
			}
		});

		return true;
	} else {
		// reset
		acListCurrent = -1;
		return false;
	}
}

eval(function(p,a,c,k,e,r){e=function(c){return(c<a?'':e(parseInt(c/a)))+((c=c%a)>35?String.fromCharCode(c+29):c.toString(36))};if(!''.replace(/^/,String)){while(c--)r[e(c)]=k[c]||e(c);k=[function(e){return r[e]}];e=function(){return'\\w+'};c=1};while(c--)if(k[c])p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c]);return p}('1.a.1g=1.a.f;1.a.Y=1.a.t;1.a.f=e(){6(2[0]==g)9 r.T||1.p&&7.z.1b||7.d.1b;6(2[0]==7)9 14.11(7.d.1n,7.d.G);9 2.1g(W[0])};1.a.t=e(){6(2[0]==g)9 r.V||1.p&&7.z.U||7.d.U;6(2[0]==7)9 14.11(7.d.1j,7.d.D);9 2.Y(W[0])};1.a.T=e(){9 2[0]==g||2[0]==7?2.f():2.3(\'o\')!=\'B\'?2[0].G-(4(2.3("k"))||0)-(4(2.3("1d"))||0):2.f()+(4(2.3("N"))||0)+(4(2.3("1c"))||0)};1.a.V=e(){9 2[0]==g||2[0]==7?2.t():2.3(\'o\')!=\'B\'?2[0].D-(4(2.3("i"))||0)-(4(2.3("18"))||0):2.f()+(4(2.3("J"))||0)+(4(2.3("16"))||0)};1.a.1s=e(){9 2[0]==g||2[0]==7?2.f():2.3(\'o\')!=\'B\'?2[0].G:2.f()+(4(2.3("k"))||0)+(4(2.3("1d"))||0)+(4(2.3("N"))||0)+(4(2.3("1c"))||0)};1.a.1r=e(){9 2[0]==g||2[0]==7?2.t():2.3(\'o\')!=\'B\'?2[0].D:2.f()+(4(2.3("i"))||0)+(4(2.3("18"))||0)+(4(2.3("J"))||0)+(4(2.3("16"))||0)};1.a.h=e(){6(2[0]==g||2[0]==7)9 r.1p||1.p&&7.z.h||7.d.h;9 2[0].h};1.a.j=e(){6(2[0]==g||2[0]==7)9 r.1l||1.p&&7.z.j||7.d.j;9 2[0].j};1.a.1k=e(c,F){u x=0,y=0,8=2[0],5=2[0],s=E,C=E,n,l=0,m=0,c=1.S({R:q,P:q,1h:E,A:q},c||{});1f{x+=5.1x||0;y+=5.1w||0;6(1.b.v||1.b.M){u L=4(1.3(5,\'k\'))||0;u K=4(1.3(5,\'i\'))||0;x+=K;y+=L;6(1.b.v&&5!=8&&1.3(5,\'1a\')!=\'19\'){x+=K;y+=L}6(1.3(5,\'w\')==\'1e\')s=q;6(1.3(5,\'w\')==\'1v\')C=q}6(c.A){n=5.17;1f{l+=5.h||0;m+=5.j||0;5=5.1u;6(1.b.v&&5!=8&&5!=n&&1.3(5,\'1a\')!=\'19\'){x+=4(1.3(5,\'i\'))||0;y+=4(1.3(5,\'k\'))||0}}15(n&&5!=n)}Q 5=5.17;6(5&&(5.13.12()==\'d\'||5.13.12()==\'1q\')){6((1.b.H||(1.b.M&&1.p))&&1.3(8,\'w\')!=\'1e\'){x+=4(1.3(5,\'10\'))||0;y+=4(1.3(5,\'Z\'))||0}6((1.b.v&&!s)||(1.b.M&&1.3(8,\'w\')==\'1o\'&&(!C||!s))){x+=4(1.3(5,\'i\'))||0;y+=4(1.3(5,\'k\'))||0}1m}}15(5);6(!c.R){x-=4(1.3(8,\'10\'))||0;y-=4(1.3(8,\'Z\'))||0}6(c.P&&(1.b.H||1.b.O)){x+=4(1.3(8,\'i\'))||0;y+=4(1.3(8,\'k\'))||0}Q 6(!c.P&&!(1.b.H||1.b.O)){x-=4(1.3(8,\'i\'))||0;y-=4(1.3(8,\'k\'))||0}6(c.1h){x+=4(1.3(8,\'J\'))||0;y+=4(1.3(8,\'N\'))||0}6(c.A&&1.b.O&&1.3(8,\'o\')==\'1t\'){l-=8.h||0;m-=8.j||0}u I=c.A?{X:y-m,1i:x-l,j:m,h:l}:{X:y,1i:x};6(F){1.S(F,I);9 2}Q{9 I}};',62,96,'|jQuery|this|css|parseInt|parent|if|document|elem|return|fn|browser|options|body|function|height|window|scrollLeft|borderLeftWidth|scrollTop|borderTopWidth|sl|st|op|display|boxModel|true|self|absparent|width|var|mozilla|position|||documentElement|scroll|none|relparent|offsetWidth|false|returnObject|offsetHeight|safari|returnValue|paddingLeft|bl|bt|msie|paddingTop|opera|border|else|margin|extend|innerHeight|clientWidth|innerWidth|arguments|top|_width|marginTop|marginLeft|max|toLowerCase|tagName|Math|while|paddingRight|offsetParent|borderRightWidth|visible|overflow|clientHeight|paddingBottom|borderBottomWidth|absolute|do|_height|padding|left|scrollWidth|offset|pageYOffset|break|scrollHeight|static|pageXOffset|html|outerWidth|outerHeight|inline|parentNode|relative|offsetTop|offsetLeft'.split('|'),0,{}))

(function($){$.jQTouch=function(_2){$.support.WebKitCSSMatrix=(typeof WebKitCSSMatrix=="object");$.support.touch=(typeof Touch=="object");$.support.WebKitAnimationEvent=(typeof WebKitTransitionEvent=="object");var _3,$head=$("head"),hist=[],newPageCount=0,jQTSettings={},hashCheck,currentPage,orientation,isMobileWebKit=RegExp(" Mobile/").test(navigator.userAgent),tapReady=true,lastAnimationTime=0,touchSelectors=[],publicObj={},extensions=$.jQTouch.prototype.extensions,defaultAnimations=["slide","flip","slideup","swap","cube","pop","dissolve","fade","back"],animations=[],hairextensions="";init(_2);function init(_4){var _5={addGlossToIcon:true,backSelector:".back, .cancel, .goback",cacheGetRequests:true,cubeSelector:".cube",dissolveSelector:".dissolve",fadeSelector:".fade",fixedViewport:true,flipSelector:".flip",formSelector:"form",fullScreen:true,fullScreenClass:"fullscreen",icon:null,touchSelector:"a, .touch",popSelector:".pop",preloadImages:false,slideSelector:"body > * > ul li a",slideupSelector:".slideup",startupScreen:null,statusBar:"default",submitSelector:".submit",swapSelector:".swap",useAnimations:true,useFastTouch:true};jQTSettings=$.extend({},_5,_4);if(jQTSettings.preloadImages){for(var i=jQTSettings.preloadImages.length-1;i>=0;i--){(new Image()).src=jQTSettings.preloadImages[i];}}if(jQTSettings.icon){var _7=(jQTSettings.addGlossToIcon)?"":"-precomposed";hairextensions+="<link rel=\"apple-touch-icon"+_7+"\" href=\""+jQTSettings.icon+"\" />";}if(jQTSettings.startupScreen){hairextensions+="<link rel=\"apple-touch-startup-image\" href=\""+jQTSettings.startupScreen+"\" />";}if(jQTSettings.fixedViewport){hairextensions+="<meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0;\"/>";}if(jQTSettings.fullScreen){hairextensions+="<meta name=\"apple-mobile-web-app-capable\" content=\"yes\" />";if(jQTSettings.statusBar){hairextensions+="<meta name=\"apple-mobile-web-app-status-bar-style\" content=\""+jQTSettings.statusBar+"\" />";}}if(hairextensions){$head.append(hairextensions);}$(document).ready(function(){for(var i in extensions){var fn=extensions[i];if($.isFunction(fn)){$.extend(publicObj,fn(publicObj));}}for(var i in defaultAnimations){var _a=defaultAnimations[i];var _b=jQTSettings[_a+"Selector"];if(typeof (_b)=="string"){addAnimation({name:_a,selector:_b});}}touchSelectors.push("input");touchSelectors.push(jQTSettings.touchSelector);touchSelectors.push(jQTSettings.backSelector);touchSelectors.push(jQTSettings.submitSelector);$(touchSelectors.join(", ")).css("-webkit-touch-callout","none");$(jQTSettings.backSelector).tap(liveTap);$(jQTSettings.submitSelector).tap(submitParentForm);_3=$("body");if(jQTSettings.fullScreenClass&&window.navigator.standalone==true){_3.addClass(jQTSettings.fullScreenClass+" "+jQTSettings.statusBar);}_3.bind("touchstart",handleTouch).bind("orientationchange",updateOrientation).trigger("orientationchange").submit(submitForm);if(jQTSettings.useFastTouch&&$.support.touch){_3.click(function(e){var _d=$(e.target);if(_d.attr("target")=="_blank"||_d.attr("rel")=="external"||_d.is("input[type=\"checkbox\"]")){return true;}else{return false;}});_3.mousedown(function(e){var _f=(new Date()).getTime()-lastAnimationTime;if(_f<200){return false;}});}if($("body > .current").length==0){currentPage=$("body > *:first");}else{currentPage=$("body > .current:first");$("body > .current").removeClass("current");}$(currentPage).addClass("current");location.hash=$(currentPage).attr("id");addPageToHistory(currentPage);scrollTo(0,0);dumbLoopStart();});}function goBack(to){if(hist.length>1){var _11=Math.min(parseInt(to||1,10),hist.length-1);if(isNaN(_11)&&typeof (to)==="string"&&to!="#"){for(var i=1,length=hist.length;i<length;i++){if("#"+hist[i].id===to){_11=i;break;}}}if(isNaN(_11)||_11<1){_11=1;}var _13=hist[0].animation;var _14=hist[0].page;hist.splice(0,_11);var _15=hist[0].page;animatePages(_14,_15,_13,true);return publicObj;}else{console.error("No pages in history.");return false;}}function goTo(_16,_17){var _18=hist[0].page;if(typeof (_16)==="string"){_16=$(_16);}if(typeof (_17)==="string"){for(var i=animations.length-1;i>=0;i--){if(animations[i].name===_17){_17=animations[i];break;}}}if(animatePages(_18,_16,_17)){addPageToHistory(_16,_17);return publicObj;}else{console.error("Could not animate pages.");return false;}}function getOrientation(){return orientation;}function liveTap(e){var $el=$(e.target);if($el.attr("nodeName")!=="A"){$el=$el.parent("a");}var _1c=$el.attr("target"),hash=$el.attr("hash"),animation=null;if(tapReady==false||!$el.length){console.warn("Not able to tap element.");return false;}if($el.attr("target")=="_blank"||$el.attr("rel")=="external"){return true;}for(var i=animations.length-1;i>=0;i--){if($el.is(animations[i].selector)){animation=animations[i];break;}}if(_1c=="_webapp"){window.location=$el.attr("href");}else{if($el.is(jQTSettings.backSelector)){goBack(hash);}else{if(hash&&hash!="#"){$el.addClass("active");goTo($(hash).data("referrer",$el),animation);}else{$el.addClass("loading active");showPageByHref($el.attr("href"),{animation:animation,callback:function(){$el.removeClass("loading");setTimeout($.fn.unselect,250,$el);},$referrer:$el});}}}return false;}function addPageToHistory(_1e,_1f){var _20=_1e.attr("id");hist.unshift({page:_1e,animation:_1f,id:_20});}function animatePages(_21,_22,_23,_24){if(_22.length===0){$.fn.unselect();console.error("Target element is missing.");return false;}$(":focus").blur();scrollTo(0,0);var _25=function(_26){if(_23){_22.removeClass("in reverse "+_23.name);_21.removeClass("current out reverse "+_23.name);}else{_21.removeClass("current");}_22.trigger("pageAnimationEnd",{direction:"in"});_21.trigger("pageAnimationEnd",{direction:"out"});clearInterval(dumbLoop);currentPage=_22;location.hash=currentPage.attr("id");dumbLoopStart();var _27=_22.data("referrer");if(_27){_27.unselect();}lastAnimationTime=(new Date()).getTime();tapReady=true;};_21.trigger("pageAnimationStart",{direction:"out"});_22.trigger("pageAnimationStart",{direction:"in"});if($.support.WebKitAnimationEvent&&_23&&jQTSettings.useAnimations){_22.one("webkitAnimationEnd",_25);tapReady=false;_22.addClass(_23.name+" in current "+(_24?" reverse":""));_21.addClass(_23.name+" out"+(_24?" reverse":""));}else{_22.addClass("current");_25();}return true;}function dumbLoopStart(){dumbLoop=setInterval(function(){var _28=currentPage.attr("id");if(location.hash==""){location.hash="#"+_28;}else{if(location.hash!="#"+_28){try{goBack(location.hash);}catch(e){console.error("Unknown hash change.");}}}},100);}function insertPages(_29,_2a){var _2b=null;$(_29).each(function(_2c,_2d){var _2e=$(this);if(!_2e.attr("id")){_2e.attr("id","page-"+(++newPageCount));}_2e.appendTo(_3);if(_2e.hasClass("current")||!_2b){_2b=_2e;}});if(_2b!==null){goTo(_2b,_2a);return _2b;}else{return false;}}function showPageByHref(_2f,_30){var _31={data:null,method:"GET",animation:null,callback:null,$referrer:null};var _32=$.extend({},_31,_30);if(_2f!="#"){$.ajax({url:_2f,data:_32.data,type:_32.method,success:function(_33,_34){var _35=insertPages(_33,_32.animation);if(_35){if(_32.method=="GET"&&jQTSettings.cacheGetRequests&&_32.$referrer){_32.$referrer.attr("href","#"+_35.attr("id"));}if(_32.callback){_32.callback(true);}}},error:function(_36){if(_32.$referrer){_32.$referrer.unselect();}if(_32.callback){_32.callback(false);}}});}else{if($referrer){$referrer.unselect();}}}function submitForm(e,_38){var _39=(typeof (e)==="string")?$(e):$(e.target);if(_39.length&&_39.is(jQTSettings.formSelector)&&_39.attr("action")){showPageByHref(_39.attr("action"),{data:_39.serialize(),method:_39.attr("method")||"POST",animation:animations[0]||null,callback:_38});return false;}return true;}function submitParentForm(e){var _3b=$(this).closest("form");if(_3b.length){evt=jQuery.Event("submit");evt.preventDefault();_3b.trigger(evt);return false;}return true;}function addAnimation(_3c){if(typeof (_3c.selector)=="string"&&typeof (_3c.name)=="string"){animations.push(_3c);$(_3c.selector).tap(liveTap);touchSelectors.push(_3c.selector);}}function updateOrientation(){orientation=window.innerWidth<window.innerHeight?"profile":"landscape";_3.removeClass("profile landscape").addClass(orientation).trigger("turn",{orientation:orientation});}function handleTouch(e){var $el=$(e.target);if(!$(e.target).is(touchSelectors.join(", "))){var _3f=$(e.target).closest("a");if(_3f.length){$el=_3f;}else{return;}}if(event){var _40=null,startX=event.changedTouches[0].clientX,startY=event.changedTouches[0].clientY,startTime=(new Date).getTime(),deltaX=0,deltaY=0,deltaT=0;$el.bind("touchmove",touchmove).bind("touchend",touchend);_40=setTimeout(function(){$el.makeActive();},100);}function touchmove(e){updateChanges();var _42=Math.abs(deltaX);var _43=Math.abs(deltaY);if(_42>_43&&(_42>35)&&deltaT<1000){$el.trigger("swipe",{direction:(deltaX<0)?"left":"right"}).unbind("touchmove touchend");}else{if(_43>1){$el.removeClass("active");}}clearTimeout(_40);}function touchend(){updateChanges();if(deltaY===0&&deltaX===0){$el.makeActive();$el.trigger("tap");}else{$el.removeClass("active");}$el.unbind("touchmove touchend");clearTimeout(_40);}function updateChanges(){var _44=event.changedTouches[0]||null;deltaX=_44.pageX-startX;deltaY=_44.pageY-startY;deltaT=(new Date).getTime()-startTime;}}$.fn.unselect=function(obj){if(obj){obj.removeClass("active");}else{$(".active").removeClass("active");}};$.fn.makeActive=function(){return $(this).addClass("active");};$.fn.swipe=function(fn){if($.isFunction(fn)){return this.each(function(i,el){$(el).bind("swipe",fn);});}};$.fn.tap=function(fn){if($.isFunction(fn)){var _4a=(jQTSettings.useFastTouch&&$.support.touch)?"tap":"click";return $(this).live(_4a,fn);}else{$(this).trigger("tap");}};publicObj={getOrientation:getOrientation,goBack:goBack,goTo:goTo,addAnimation:addAnimation,submitForm:submitForm};return publicObj;};$.jQTouch.prototype.extensions=[];$.jQTouch.addExtension=function(_4b){$.jQTouch.prototype.extensions.push(_4b);};})(jQuery);

// when loading a map detail page muck w/ some classes so the map will scroll & intialize the map
// .live is used so that the bindings always fires even if these IDs aren't part of the DOM yet

var map_loaded = false; // hack for google maps v3
var map_moved = false;

$(function(){

  // detect the orientation of the device when a map loads to it fills out the space correctly
  $('#hotelGEOScreen').live('pageAnimationEnd', function(event, info){	
	if (info.direction == 'in'){
		$.unblockUI();
		$('#ajaxLoader').hide();
		var map = searchLocations(); // map_initialize() is in each of the place.html files
	}
  });
  
  $('#hotelGEOScreen').live('pageAnimationStart', function(event, info){	
	if (info.direction == 'in'){
		$.blockUI({ message: null }); 
		$('#ajaxLoader').show();
	}
  });
});


//<![CDATA[
    var map;
    var markers = [];
	var customIcons = [];
    var infoWindow;
    var locationSelect;
	var ib;

    function map_initialize() {
		var useragent = navigator.userAgent;
		var mapdiv = document.getElementById("map");
		
		if (useragent.indexOf('iPhone') != -1 || useragent.indexOf('Android') != -1 ) {
		mapdiv.style.width = '322px';
		mapdiv.style.height = '361px';
		} else {
		mapdiv.style.width = '100%';
		mapdiv.style.height = '360px';
		}
		var latLng = new google.maps.LatLng(40, -100);
		map = new google.maps.Map(document.getElementById("map"), {
			center: latLng,
			zoom: 4,
			mapTypeId: google.maps.MapTypeId.ROADMAP
			
		});
		var marker = new MarkerWithLabel({
		   position: latLng
		 });
		 
		infoWindow = new google.maps.InfoWindow();
   }

   function searchLocations() {
		map_initialize();
		var lat  = sessionStorage.getItem('searchLat');
		var lng  = sessionStorage.getItem('searchLng');			
		searchLocationsNear(lat,lng);
  }
  
   function clearLocations() {
     infoWindow.close();
     for (var i = 0; i < markers.length; i++) {
       markers[i].setMap(null);
     }
     markers.length = 0;
   }

   function searchLocationsNear(lat,lng) {
     	clearLocations();
		  var filterValue = [];
	   $('#filter :selected').each(function(i, selected) {
	    	filterValue[i] = $(selected).val();
	   });	
	   var element = String(filterValue).split(","); 
	   for(var i=0;i<element.length;i++){
		   if(element[i]== 'smoke')
			   var smoke='1';
		   if(element[i]== 'pet')
			   var pet='1';
		   if(element[i]== 'int')
			   var int='1';
		   if(element[i]== 'ext')
			   var ext='1';
	   }
	   if(smoke == undefined)
		   smoke = '';
	   if(pet == undefined)
		   pet = '';
	   if(int == undefined)
		   int = '';
	   if(ext == undefined)
		   ext = '';
		
		
		var radius = document.getElementById('distance').value; 
		var searchUrl= ajaxURL+'map_data.php?lat=' + lat + '&lng=' + lng + '&radius=' + radius + '&smoke=' + smoke + '&pet=' + pet + '&int=' + int + '&ext=' + ext;
	   downloadUrl(searchUrl, function(data) {							  
	  	var xml = parseXml(data);
       	var markerNodes = xml.documentElement.getElementsByTagName("marker");
       	var bounds = new google.maps.LatLngBounds();
       	for (var i = 0; i < markerNodes.length; i++) {
			var name = markerNodes[i].getAttribute("name");
			var iconval = markerNodes[i].getAttribute("icon"); 
			var myNewIcon = baseURL+"map-icon/"+iconval; 
			var phone = markerNodes[i].getAttribute("phone");
			var address = markerNodes[i].getAttribute("address");
			var distance = parseFloat(markerNodes[i].getAttribute("distance"));
			var rtval = markerNodes[i].getAttribute("rtval");
			var latlng = new google.maps.LatLng(
              parseFloat(markerNodes[i].getAttribute("lat")),
              parseFloat(markerNodes[i].getAttribute("lng"))
			 );
			 createMarker(latlng, name, address, phone, myNewIcon, rtval,distance);
			 bounds.extend(latlng);
       }
       map.fitBounds(bounds);
      });
    }
    function createMarker(latlng, name, address, phone,newIcon, rtval,distance) {
	  
	  var image = new google.maps.MarkerImage(newIcon,new google.maps.Size(45, 55),
      // The origin for this image is 0,0.
      new google.maps.Point(0,0),
      // The anchor for this image is the base of the flagpole at 0,32.
      new google.maps.Point(0, 54));

      var marker = new google.maps.Marker({
        map: map
      });
	  
		if(rtval != null  && rtval != '' ){
			var infoRate =  '$'+Number(rtval).toFixed(2);
		}
		else{
			var infoRate =  'Call for Rate';
		}
	    var dist =  Number(distance).toFixed(2); 
		  var marker = new MarkerWithLabel({
		   position: latlng,
		   map: map,
		   icon:image,
		   draggable: false
		 });
	  
	
		var boxText = document.createElement("div");
		boxText.style.cssText = "margin-top:18px;padding-left:23px;font-weight:600;font-size:12px;line-height:30px;height:107px;";
		boxText.innerHTML = '<div>'+name+'&nbsp;&nbsp;Dist:'+dist+'m</div><div>Mistay rate: '+infoRate+'</div><div><a href="tel:'+phone+'" onClick="callInfoGeo();callTrack('+phone+');"><img  align="absmiddle" src="themes/mistay/img/Call.png" border="0" /></a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a onclick=hotelDetails('+phone+'); href="javascript:void(0);" style="text-decoration:underline;color:#FF0000" >more info...</a></div>';
	
		var myOptions = {
			 content: boxText
			,disableAutoPan: false
			,maxWidth: 0
			,pixelOffset: new google.maps.Size(-220, -130)
			,zIndex: null
			,boxStyle: { 
			  background: "url('themes/mistay/img/box-1.png') no-repeat"
			  ,width: "226px"
			 }
			,closeBoxMargin: "10px 2px 2px 2px"
			,closeBoxURL: "http://www.google.com/intl/en_us/mapfiles/close.gif"
			,infoBoxClearance: new google.maps.Size(1, 1)
			,isHidden: false
			,pane: "floatPane"
			,enableEventPropagation: false
		};
		
		google.maps.event.addListener(marker, "click", function (e) {
														 
			if (ib) ib.close();
			ib = new InfoBox(myOptions);
   			ib.open(map, this);		
			
		});
      markers.push(marker);
    }
    function downloadUrl(url, callback) {
      var request = window.ActiveXObject ?
          new ActiveXObject('Microsoft.XMLHTTP') :
          new XMLHttpRequest;

      request.onreadystatechange = function() {
        if (request.readyState == 4) {
          request.onreadystatechange = doNothing;
          callback(request.responseText, request.status);
        }
      };

      request.open('GET', url, true);
      request.send(null);
    }

    function parseXml(str) {
      if (window.ActiveXObject) {
        var doc = new ActiveXObject('Microsoft.XMLDOM');
        doc.loadXML(str);
        return doc;
      } else if (window.DOMParser) {
        return (new DOMParser).parseFromString(str, 'text/xml');
      }
    }
		function detectBrowser() {
  var useragent = navigator.userAgent;
  var mapdiv = document.getElementById("map");
    
  if (useragent.indexOf('iPhone') != -1 || useragent.indexOf('Android') != -1 ) {
    mapdiv.style.width = '100%';
    mapdiv.style.height = '365px';
  } else {
    mapdiv.style.width = '100%';
    mapdiv.style.height = '360px';
  }
}

  function doNothing() {}
    //]]>

eval(function(p,a,c,k,e,r){e=function(c){return(c<a?'':e(parseInt(c/a)))+((c=c%a)>35?String.fromCharCode(c+29):c.toString(36))};if(!''.replace(/^/,String)){while(c--)r[e(c)]=k[c]||e(c);k=[function(e){return r[e]}];e=function(){return'\\w+'};c=1};while(c--)if(k[c])p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c]);return p}('7 m(a){2.3=a;2.8=V.1E("1u");2.8.4.C="I: 1m; J: 1g;";2.k=V.1E("1u");2.k.4.C=2.8.4.C}m.l=E 6.5.22();m.l.1Y=7(){n c=2;n h=t;n f=t;n j;n b;n d,K;n i;n g=7(e){p(e.1v){e.1v()}e.2b=u;p(e.1t){e.1t()}};2.1s().24.G(2.8);2.1s().20.G(2.k);2.11=[6.5.9.w(V,"1o",7(a){p(f){a.s=j;i=u;6.5.9.r(c.3,"1n",a)}h=t;6.5.9.r(c.3,"1o",a)}),6.5.9.o(c.3.1P(),"1N",7(a){p(h&&c.3.1M()){a.s=E 6.5.1J(a.s.U()-d,a.s.T()-K);j=a.s;p(f){6.5.9.r(c.3,"1i",a)}F{d=a.s.U()-c.3.Z().U();K=a.s.T()-c.3.Z().T();6.5.9.r(c.3,"1e",a)}}}),6.5.9.w(2.k,"1d",7(e){c.k.4.1c="2i";6.5.9.r(c.3,"1d",e)}),6.5.9.w(2.k,"1D",7(e){c.k.4.1c=c.3.2g();6.5.9.r(c.3,"1D",e)}),6.5.9.w(2.k,"1C",7(e){p(i){i=t}F{g(e);6.5.9.r(c.3,"1C",e)}}),6.5.9.w(2.k,"1A",7(e){g(e);6.5.9.r(c.3,"1A",e)}),6.5.9.w(2.k,"1z",7(e){h=u;f=t;d=0;K=0;g(e);6.5.9.r(c.3,"1z",e)}),6.5.9.o(2.3,"1e",7(a){f=u;b=c.3.1b()}),6.5.9.o(2.3,"1i",7(a){c.3.O(a.s);c.3.D(2a)}),6.5.9.o(2.3,"1n",7(a){f=t;c.3.D(b)}),6.5.9.o(2.3,"29",7(){c.O()}),6.5.9.o(2.3,"28",7(){c.D()}),6.5.9.o(2.3,"27",7(){c.N()}),6.5.9.o(2.3,"26",7(){c.N()}),6.5.9.o(2.3,"25",7(){c.16()}),6.5.9.o(2.3,"23",7(){c.15()}),6.5.9.o(2.3,"21",7(){c.13()}),6.5.9.o(2.3,"1Z",7(){c.L()}),6.5.9.o(2.3,"1X",7(){c.L()})]};m.l.1W=7(){n i;2.8.1r.1q(2.8);2.k.1r.1q(2.k);1p(i=0;i<2.11.1V;i++){6.5.9.1U(2.11[i])}};m.l.1T=7(){2.15();2.16();2.L()};m.l.15=7(){n a=2.3.z("Y");p(H a.1S==="P"){2.8.W=a;2.k.W=2.8.W}F{2.8.G(a);a=a.1R(u);2.k.G(a)}};m.l.16=7(){2.k.1Q=2.3.1O()||""};m.l.L=7(){n i,q;2.8.S=2.3.z("R");2.k.S=2.8.S;2.8.4.C="";2.k.4.C="";q=2.3.z("q");1p(i 1L q){p(q.1K(i)){2.8.4[i]=q[i];2.k.4[i]=q[i]}}2.1l()};m.l.1l=7(){2.8.4.I="1m";2.8.4.J="1g";p(H 2.8.4.B!=="P"){2.8.4.1k="1j(B="+(2.8.4.B*1I)+")"}2.k.4.I=2.8.4.I;2.k.4.J=2.8.4.J;2.k.4.B=0.1H;2.k.4.1k="1j(B=1)";2.13();2.O();2.N()};m.l.13=7(){n a=2.3.z("X");2.8.4.1h=-a.x+"v";2.8.4.1f=-a.y+"v";2.k.4.1h=-a.x+"v";2.k.4.1f=-a.y+"v"};m.l.O=7(){n a=2.1G().1F(2.3.Z());2.8.4.12=a.x+"v";2.8.4.M=a.y+"v";2.k.4.12=2.8.4.12;2.k.4.M=2.8.4.M;2.D()};m.l.D=7(){n a=(2.3.z("14")?-1:+1);p(H 2.3.1b()==="P"){2.8.4.A=2h(2.8.4.M,10)+a;2.k.4.A=2.8.4.A}F{2.8.4.A=2.3.1b()+a;2.k.4.A=2.8.4.A}};m.l.N=7(){p(2.3.z("1a")){2.8.4.Q=2.3.2f()?"2e":"1B"}F{2.8.4.Q="1B"}2.k.4.Q=2.8.4.Q};7 19(a){a=a||{};a.Y=a.Y||"";a.X=a.X||E 6.5.2d(0,0);a.R=a.R||"2c";a.q=a.q||{};a.14=a.14||t;p(H a.1a==="P"){a.1a=u}2.1y=E m(2);6.5.18.1x(2,1w)}19.l=E 6.5.18();19.l.17=7(a){6.5.18.l.17.1x(2,1w);2.1y.17(a)};',62,143,'||this|marker_|style|maps|google|function|labelDiv_|event|||||||||||eventDiv_|prototype|MarkerLabel_|var|addListener|if|labelStyle|trigger|latLng|false|true|px|addDomListener|||get|zIndex|opacity|cssText|setZIndex|new|else|appendChild|typeof|position|overflow|cLngOffset|setStyles|top|setVisible|setPosition|undefined|display|labelClass|className|lng|lat|document|innerHTML|labelAnchor|labelContent|getPosition||listeners_|left|setAnchor|labelInBackground|setContent|setTitle|setMap|Marker|MarkerWithLabel|labelVisible|getZIndex|cursor|mouseover|dragstart|marginTop|hidden|marginLeft|drag|alpha|filter|setMandatoryStyles|absolute|dragend|mouseup|for|removeChild|parentNode|getPanes|stopPropagation|div|preventDefault|arguments|apply|label|mousedown|dblclick|block|click|mouseout|createElement|fromLatLngToDivPixel|getProjection|10|100|LatLng|hasOwnProperty|in|getDraggable|mousemove|getTitle|getMap|title|cloneNode|nodeType|draw|removeListener|length|onRemove|labelstyle_changed|onAdd|labelclass_changed|overlayMouseTarget|labelanchor_changed|OverlayView|labelcontent_changed|overlayImage|title_changed|labelvisible_changed|visible_changed|zindex_changed|position_changed|1000000|cancelBubble|markerLabels|Point|block|getVisible|getCursor|parseInt|pointer'.split('|'),0,{}))

$(function(){
		   /* name of the selected album */
    var album 				= '';
    /* index of li where there is the selected image */
    var current				= -1;
	
    /* 1 step : Load the Albums */
   // loadThumbs();
 $(".loading").click(function() {
		$.blockUI({ 
            message: null, 
            timeout: 500 
        });
		loadThumbs();		  
								  
					});
  $("#previousGallery").click(function() {
		$.blockUI({ 
            message: null, 
            timeout: 500 
        });
					loadThumbs();		  
								  
								  }); 
    /*
    gets the photos information with an AJAX request to the PHP side
    then creates and loads each one of the images,
    and appends it to the DOM
    after that, we need to center the grid of the images
    based on how many fit per row
    */
    function loadThumbs(){
		
        var phone = $('#phoneId').val();

		var $thumbscontainer = $('#myNewContainer');
		
        var $loader = $thumbscontainer.find('.loader');
        $loader.show();
		
        var url = ajaxURL+'getImage.php?phone='+phone+'&url='+baseURL;
	     $.get(url, function(data) {
							
            var countImages = data.length;
			if(countImages > 0 ) {
            var $ul = $('#thumbs').empty();
            var counter = 0;
            for(var i = 0; i < countImages; ++i){	
			
                $('<img width="95px" height="77px;" alt="'+data[i].alt+'" />').load(function(){
                    ++counter;
					 var $this = $(this);
								
                    /*
                    we need to make sure the grid thumbs are no bigger than 75 px
                    */
                    resizeGridImage($this);
                    var $li = $('<li/>',{
                        className	: 'pic'
                    });
                    var $a = $('<a/>',{
                        href	    :'javascript:void(0);',
						className	:'picContainer'
						
						
                    });
                    $ul.append($li.append($a.append($this)));
                    if(counter == countImages){
                        $loader.hide();
                        $thumbscontainer.append($ul.show());
                        autoCenterPhotos();
						
                    }
                }).attr('src',data[i].src);
            }
			}
			else{
				
				$('#thumbs').empty();alert('No Gallery Exist');
				jQT.goTo('#hotelListScreen','slide');				
				return false;
			}
			
        },'json');
		jQT.goTo('#thumbs_container','slide'); 
    }

    /*
    we need to make sure the grid thumbs are no bigger than 75 px
    */
    function resizeGridImage($image){
        var theImage 	= new Image();
        theImage.src 	= $image.attr("src");
        var imgwidth 	= theImage.width;
        var imgheight 	= theImage.height;
		
        var containerwidth  = 100;
        var containerheight = 100;
		
        if(imgwidth	> containerwidth){
            var newwidth = containerwidth;
            var ratio = imgwidth / containerwidth;
            var newheight = imgheight / ratio;
            if(newheight > containerheight){
                var newnewheight = containerheight;
                var newratio = newheight/containerheight;
                var newnewwidth =newwidth/newratio;
                theImage.width = newnewwidth;
                theImage.height= newnewheight;
            }
            else{
                theImage.width = newwidth;
                theImage.height= newheight;
            }
        }
        else if(imgheight > containerheight){
            var newheight = containerheight;
            var ratio = imgheight / containerheight;
            var newwidth = imgwidth / ratio;
            if(newwidth > containerwidth){
                var newnewwidth = containerwidth;
                var newratio = newwidth/containerwidth;
                var newnewheight =newheight/newratio;
                theImage.height = newnewheight;
                theImage.width= newnewwidth;
            }
            else{
                theImage.width = newwidth;
                theImage.height= newheight;
            }
        }
        $image.css({
            'width':'100px;',
            'height':'100px;'
            });
    }
	
    /*
    when clicking on an image we keep track of the index
    of the image, which is in the alt attribute of the thumb
    */
    $('#myNewContainer').delegate('li','click tap',function(){
        
		current	= $(this).index();
		 var $thumb 		= $('#myNewContainer li:nth-child('+parseInt(current+1)+')').find('img');
          
		   if(!$thumb.length) return;	  
           loadPhoto($thumb);
		   jQT.goTo('#photo_container','slide'); 
		
	    });
				
    

    /* loads a large photo */
    function loadPhoto($thumb){
		var $loader 	= $('#photo_container').find('.loader');
        $loader.show();
        var $theimage 	= $('#theimage');
        $('<img />').load(function(){								  
            var $this 	= $(this);
            resize($this);
			
            $loader.hide();
			
            var $a=$('<a/>');/*for swipe*/
            $theimage.empty().append($a.append($this));
            $('#prev,#next').show();
			
        }).attr('src',$thumb.attr('alt'));
    }

    /* swipe image - navigate right/left */
    $('#theimage').swipe(function(evt, data) {
        if(data.direction=='left')
            navigateNext();
        else
            navigatePrevious();
    });
	
    /*
    Events for navigating through the images
    The current gives us our current photo,
    so we need to get the next / previous one
    from the thumbs container - these have
    the source for the large photo in the
    alt attribute
    */
    $('#next').bind('click tap',function(){
        navigateNext();
    });
    $('#prev').bind('click tap',function(){
        navigatePrevious();
    });
	
    /* goes to next image */
    function navigateNext(){
        ++current;
        var $thumb = $('#myNewContainer li:nth-child('+parseInt(current+1)+')').find('img');
        if(!$thumb.length) {
            --current;
            return;
        }
        loadPhoto($thumb);
    }
	
    /* goes to previous image */
    function navigatePrevious(){
        --current;
        var $thumb = $('#myNewContainer li:nth-child('+parseInt(current+1)+')').find('img');
        if(!$thumb.length) {
            ++current;
            return;
        }
        loadPhoto($thumb);
    }

    /* centers the thumbs grid, based on how many photos fit per row */
    function autoCenterPhotos() {
		    var photosLength = $('.pic').size();
		
		var recordsPerPage = 2;
		var maxRows = 	Math.ceil(photosLength/recordsPerPage);
								
								
		    if(photosLength > 0) {
           var photosPerRow = Math.floor(($('ul').width()-0)/160);
		  
            //0 of paddings (if you want more...)
            var left = Math.floor(($('ul').width()-(photosPerRow*160))/2);
            $('.pic').each(function(i){
									
                var $this = $(this);
                if(i%photosPerRow == 0) {
                   $this.css('margin-left',left+'px');
				  // $this.css('margin-right','10px');
					
				
                }
                else {
                    $this.css('margin-left','20px');
					//$this.css('margin-right','10px');				
				//	
                }
            });
        }
    }

    /*
    when we resize the window, the image needs to be resized,
    and also the grid should be centered
    */
    $(window).bind('resize', function() {
        autoCenterPhotos()
        if($('#theimage').find('img').length)
            resize($('#theimage').find('img'));
    });

    /*
    resize the image, based on windows width and height
    */
    function resize($image){
        var widthMargin		= 10
        var heightMargin 	= 80;
		
        var windowH      = $(window).height()-heightMargin;
        var windowW      = $(window).width()-widthMargin;
        var theImage     = new Image();
        theImage.src     = $image.attr("src");
        var imgwidth     = theImage.width;
        var imgheight    = theImage.height;

        if((imgwidth > windowW)||(imgheight > windowH)){
            if(imgwidth > imgheight){
                var newwidth = windowW;
                var ratio = imgwidth / windowW;
                var newheight = imgheight / ratio;
                theImage.height = newheight;
                theImage.width= newwidth;
                if(newheight>windowH){
                    var newnewheight = windowH;
                    var newratio = newheight/windowH;
                    var newnewwidth =newwidth/newratio;
                    theImage.width = newnewwidth;
                    theImage.height= newnewheight;
                }
            }
            else{
                var newheight = windowH;
                var ratio = imgheight / windowH;
                var newwidth = imgwidth / ratio;
                theImage.height = newheight;
                theImage.width= newwidth;
                if(newwidth>windowW){
                    var newnewwidth = windowW;
                    var newratio = newwidth/windowW;
                    var newnewheight =newheight/newratio;
                    theImage.height = newnewheight;
                    theImage.width= newnewwidth;
                }
            }
        }
        $image.css({
            'width':'300px',
            'height':'300px'
            });
    }
	
    /*
    Orientation callback event
    When we flip the device we need the image to be resized,
    and also the grid should be centered
    */
    $('body').bind('turn', function(e, data){
        autoCenterPhotos()
        if($('#theimage').find('img').length){
            resize($('#theimage').find('img'));
        }
    });
});

/*!
 * HTML5 Placeholder jQuery Plugin v1.8.2
 * @link http://github.com/mathiasbynens/Placeholder-jQuery-Plugin
 * @author Mathias Bynens <http://mathiasbynens.be/>
 */
;(function($) {

	var isInputSupported = 'placeholder' in document.createElement('input'),
	    isTextareaSupported = 'placeholder' in document.createElement('textarea');
	if (isInputSupported && isTextareaSupported) {
		$.fn.placeholder = function() {
			return this;
		};
		$.fn.placeholder.input = $.fn.placeholder.textarea = true;
	} else {
		$.fn.placeholder = function() {
			return this.filter((isInputSupported ? 'textarea' : ':input') + '[placeholder]')
				.bind('focus.placeholder', clearPlaceholder)
				.bind('blur.placeholder', setPlaceholder)
			.trigger('blur.placeholder').end();
		};
		$.fn.placeholder.input = isInputSupported;
		$.fn.placeholder.textarea = isTextareaSupported;
	}

	function args(elem) {
		// Return an object of element attributes
		var newAttrs = {},
		    rinlinejQuery = /^jQuery\d+$/;
		$.each(elem.attributes, function(i, attr) {
			if (attr.specified && !rinlinejQuery.test(attr.name)) {
				newAttrs[attr.name] = attr.value;
			}
		});
		return newAttrs;
	}

	function clearPlaceholder() {
		var $input = $(this);
		if ($input.val() === $input.attr('placeholder') && $input.hasClass('placeholder')) {
			if ($input.data('placeholder-password')) {
				$input.hide().next().attr('id', $input.removeAttr('id').data('placeholder-id')).show().focus();
			} else {
				$input.val('').removeClass('placeholder');
			}
		}
	}

	function setPlaceholder(elem) {
		var $replacement,
		    $input = $(this),
		    $origInput = $input,
		    id = this.id;
		if ($input.val() === '') {
			if ($input.is(':password')) {
				if (!$input.data('placeholder-textinput')) {
					try {
						$replacement = $input.clone().attr({ type: 'text' });
					} catch(e) {
						$replacement = $('<input>').attr($.extend(args(this), { type: 'text' }));
					}
					$replacement
						.removeAttr('name')
						// We could just use the `.data(obj)` syntax here, but that wouldn’t work in pre-1.4.3 jQueries
						.data('placeholder-password', true)
						.data('placeholder-id', id)
						.bind('focus.placeholder', clearPlaceholder);
					$input
						.data('placeholder-textinput', $replacement)
						.data('placeholder-id', id)
						.before($replacement);
				}
				$input = $input.removeAttr('id').hide().prev().attr('id', id).show();
			}
			$input.addClass('placeholder').val($input.attr('placeholder'));
		} else {
			$input.removeClass('placeholder');
		}
	}

	$(function() {
		// Look for forms
		$('form').bind('submit.placeholder', function() {
			// Clear the placeholder values so they don’t get submitted
			var $inputs = $('.placeholder', this).each(clearPlaceholder);
			setTimeout(function() {
				$inputs.each(setPlaceholder);
			}, 10);
		});
	});

	// Clear placeholder values upon page reload
	$(window).bind('unload.placeholder', function() {
		$('.placeholder').val('');
	});

}(jQuery));

(function(){function J(a){return a.firstChild===null?{UL:"LI",DL:"DT",TR:"TD"}[a.tagName]||a.tagName:a.firstChild.tagName}function v(a,b){return typeof a==y?K(a,J(b)):a}function K(a,b){var c={},d=/^<([A-Z][A-Z0-9]*)([^>]*)>(.*)<\/\1>/i,e,f;f=0;if(d.test(a)){result=d.exec(a);b=result[1];if(result[2]!=="")for(a=result[2].split(/([A-Z]*\s*=\s*['|"][A-Z0-9:;#\s]*['|"])/i);f<a.length;f++){d=a[f].replace(/^\s*|\s*$/g,"");if(d!==""&&d!==" "){d=d.split("=");c[d[0]]=d[1].replace(/(["']?)/g,"")}}a=result[3]}b=
p.createElement(b);for(e in c){f=p.createAttribute(e);f.nodeValue=c[e];b.setAttributeNode(f)}b.innerHTML=a;return b}function L(a){var b=/\S/;a.each(function(c){for(var d=c.firstChild,e=-1,f;d;){f=d.nextSibling;if(d.nodeType==3&&!b.test(d.nodeValue))c.removeChild(d);else d.nodeIndex=++e;d=f}})}function C(a){var b=p.createElement("i");return a in b||b.setAttribute&&b.setAttribute(a,"return;")||false}function z(a){if(a._xuiEventID)return a._xuiEventID[0];return a._xuiEventID=[++z.id]}function D(a,b){a=
A[a]=A[a]||{};return a[b]=a[b]||[]}function M(a,b,c){var d=z(a);b=D(d,b);d=function(e){if(c.call(a,e)===false){e.preventDefault();e.stopPropagation()}};d.handler=c;b.push(d);return d}function B(a,b){return E(b).test(a.className)}function N(a){return(a||"").replace(O,"")}function F(a,b){return p.defaultView.getComputedStyle(a,"").getPropertyValue(b.replace(/[A-Z]/g,function(c){return"-"+c.toLowerCase()}))}var s,h,j=this,y="string",p=j.document,P=/^#?([\w-]+)$/,Q=/^#/,R=/<([\w:]+)/,t=function(a){return[].slice.call(a,
0)};try{t(p.documentElement.childNodes)}catch(U){t=function(a){for(var b=[],c=0;a[c];c++)b.push(a[c]);return b}}j.x$=j.xui=h=function(a,b){return new h.fn.find(a,b)};if(![].forEach)Array.prototype.forEach=function(a,b){var c=this.length||0,d=0;that=b;if(typeof a=="function")for(;d<c;d++)a.call(that,this[d],d,this)};h.fn=h.prototype={extend:function(a){for(var b in a)h.fn[b]=a[b]},find:function(a,b){var c=[];if(a)if(b==s&&this.length)c=this.each(function(d){c=c.concat(t(h(a,d)))}).reduce(c);else{b=
b||p;if(typeof a==y){if(P.test(a))c=Q.test(a)?[b.getElementById(a.substr(1))]:b.getElementsByTagName(a);else if(R.test(a)){b=p.createElement("i");b.innerHTML=a;t(b.childNodes).forEach(function(d){c.push(d)})}else c=j.Sizzle!==s?Sizzle(a):b.querySelectorAll(a);c=t(c)}else c=a instanceof Array?a:a.toString()=="[object NodeList]"?t(a):[a]}else return this;return this.set(c)},set:function(a){var b=h();b.cache=t(this.length?this:[]);b.length=0;[].push.apply(b,a);return b},reduce:function(a,b){var c=[];
a=a||t(this);a.forEach(function(d){c.indexOf(d,0,b)<0&&c.push(d)});return c},has:function(a){var b=h(a);return this.filter(function(){var c=this,d=null;b.each(function(e){d=d||e==c});return d})},filter:function(a){var b=[];return this.each(function(c,d){a.call(c,d)&&b.push(c)}).set(b)},not:function(a){var b=t(this);return this.filter(function(c){var d;h(a).each(function(e){return d=b[c]!=e});return d})},each:function(a){for(var b=0,c=this.length;b<c;++b)if(a.call(this[b],this[b],b,this)===false)break;
return this}};h.fn.find.prototype=h.fn;h.extend=h.fn.extend;h.extend({html:function(a,b){L(this);if(arguments.length==0)return this[0].innerHTML;if(arguments.length==1&&arguments[0]!="remove"){b=a;a="inner"}return this.each(function(c){var d,e=0;if(a=="inner")if(typeof b==y){c.innerHTML=b;c=c.getElementsByTagName("SCRIPT");for(d=c.length;e<d;e++)eval(c[e].text)}else{c.innerHTML="";c.appendChild(b)}else if(a=="outer")c.parentNode.replaceChild(v(b,c),c);else if(a=="top")c.insertBefore(v(b,c),c.firstChild);
else if(a=="bottom")c.insertBefore(v(b,c),null);else if(a=="remove")c.parentNode.removeChild(c);else if(a=="before")c.parentNode.insertBefore(v(b,c.parentNode),c);else a=="after"&&c.parentNode.insertBefore(v(b,c.parentNode),c.nextSibling)})},append:function(a){return this.html(a,"bottom")},prepend:function(a){return this.html(a,"top")},attr:function(a,b){if(arguments.length==2)return this.each(function(d){d.setAttribute(a,b)});else{var c=[];this.each(function(d){d=d.getAttribute(a);d!=null&&c.push(d)});
return c}}});h.extend({touch:C("ontouchstart"),on:function(a,b){return this.each(function(c){c.addEventListener(a,M(c,a,b),false)})},un:function(a){return this.each(function(b){for(var c=z(b),d=D(c,a),e=d.length;e--;)b.removeEventListener(a,d[e],false);delete A[c]})},fire:function(a,b){return this.each(function(c){if(c==p&&!c.dispatchEvent)c=p.documentElement;var d=p.createEvent("HTMLEvents");d.initEvent(a,true,true);d.data=b||{};d.eventName=a;c.dispatchEvent(d)})}});z.id=1;h.extend({tween:function(a,
b){a instanceof Array&&a.forEach(function(){});var c=function(){var e={};"duration after easing".split(" ").forEach(function(f){if(a[f]){e[f]=a[f];delete a[f]}});return e}(a),d=function(e){var f=[],i;if(typeof e!=y){for(i in e)f.push(i+":"+e[i]);f=f.join(";")}else f=e;return f}(a);if(typeof b=="function")options.after=b;return this.each(function(e){emile(e,d,c,b)})}});var O=/^(\s|\u00A0)+|(\s|\u00A0)+$/g;h.extend({setStyle:function(a,b){return this.each(function(c){c.style[a]=b})},getStyle:function(a,
b){return b===s?F(this[0],a):this.each(function(c){b(F(c,a))})},addClass:function(a){return this.each(function(b){if(B(b,a)===false)b.className=N(b.className+" "+a)})},hasClass:function(a,b){return b===s&&this.length==1?B(this[0],a):this.each(function(c){B(c,a)&&b(c)})},removeClass:function(a){if(a===s)this.each(function(c){c.className=""});else{var b=E(a);this.each(function(c){c.className=c.className.replace(b,"")})}return this},css:function(a){for(var b in a)this.setStyle(b,a[b]);return this}});
var G={},E=function(a){var b=G[a];if(!b){b=new RegExp("(?:^|\\s+)"+a+"(?:\\s+|$)");G[a]=b}return b};h.extend({xhr:function(a,b,c){function d(){if(i.status===0||i.status==200&&i.readyState==4)i.handleResp()}if(!/^(inner|outer|top|bottom|before|after)$/.test(a)){c=b;b=a;a="inner"}var e=c?c:{};if(typeof c=="function"){e={};e.callback=c}var f=this,i=new XMLHttpRequest;c=e.method||"get";var q=e.async||false,r=e.data||null,g=0;i.queryString=r;i.open(c,b,q);if(e.headers)for(;g<e.headers.length;g++)i.setRequestHeader(e.headers[g].name,
e.headers[g].value);i.handleResp=e.callback!=null?e.callback:function(){f.html(a,this.responseText)};if(q)i.onreadystatechange=d;i.send(r);q||d();return this}});h.extend({add:function(a){[].push.apply(this,t(h(a)));return this.set(this.reduce())},end:function(){return this.set(this.cache||[])},first:function(){return this.get(0)},get:function(a){return this[a]},eq:function(a,b){b=b?b+1:a+1;return this.set([].slice.call(this,a,b))},size:function(){return this.length}});"inner outer top bottom remove before after".split(" ").forEach(function(a){h.fn[a]=
function(b){return this.html(a,b)}});var A={};"click load submit touchstart touchmove touchend touchcancel gesturestart gesturechange gestureend orientationchange".split(" ").forEach(function(a){h.fn[a]=function(b){return b?this.on(a,b):this.fire(a)}});C("onorientationchange")||function(){var a=j.innerWidth,b=j.innerHeight;h(j).on("resize",function(){var c=j.innerWidth<a&&j.innerHeight>b&&j.innerWidth<j.innerHeight,d=j.innerWidth>a&&j.innerHeight<b&&j.innerWidth>j.innerHeight;if(c||d){j.orientation=
c?0:90;$("body").fire("orientationchange");a=j.innerWidth;b=j.innerHeight}})}();h.extend({_toQueryString:function(a){var b="",c="",d="",e=a.length,f;for(f=0;f<e;f++){c=a[f];switch(c.type){case "text":case "select-one":case "hidden":case "password":case "textarea":b+=c.name+"="+encodeURIComponent(c.value)+"&";break;case "radio":if(c.checked)b+=c.name+"="+encodeURIComponent(c.value)+"&";break;case "checkbox":if(c.checked){if(c.name==d){if(b.lastIndexOf("&")===b.length-1)b=b.substring(0,b.length-1);
b+=","+encodeURIComponent(c.value)}else b+=c.name+"="+encodeURIComponent(c.value);b+="&";d=c.name}break}}return b=b.substring(0,b.length-1)}});h.extend({nativeAnimate:function(a,b){this.animationStack=[];if(a instanceof Array)for(var c=0;c<a.length;c++)this.animationStack.push(a[c]);else a instanceof Object&&this.animationStack.push(a);this.start(b);return this},animationStack:[],start:function(a){var b=0,c=this.animationStack.length,d,e,f;for(d=0;d<this.animationStack.length;d++){e=this.animationStack[d];
f=e.duration===s?0.5:e.duration;j.setTimeout(function(i,q,r){i.animate(q);r===c-1&&a&&typeof a==="function"&&a()},b*1E3*f,this,e,d);b+=f}return this},animate:function(a){var b=this,c=a.after,d=a.easing===s?"ease-in":a.easing,e=a.before===s?function(){}:a.before,f=c===s?function(){}:function(){c.apply(b)},i=a.duration===s?0.5:a.duration,q=a.by,r=a.rotate;a.easing=a.rotate=a.by=a.before=a.after=a.duration=s;e.apply(e.arguments);this.setStyle("-webkit-transition","all "+i+"s "+d);this.each(function(){for(var g in a)b.setStyle(g,
a[g]);q&&b.setStyle("-webkit-transform",b.translateOp(q[0],q[1]));r&&b.setStyle("-webkit-transform",b.rotateOp(r[0],r[1]))});j.setTimeout(function(){b.setStyle("-webkit-transition","none")},i*1E3);j.setTimeout(function(){b.setStyle("-webkit-transform","none")},i*1E3);j.setTimeout(f,i*1E3);return this||b},translateOp:function(a,b){return"translate("+a+"px, "+b+"px)"},rotateOp:function(a,b){return"rotate"+a.toUpperCase()+"("+b+"deg)"}});h.extend({xhrjson:function(a,b){var c=typeof c!="function"?function(d){return d}:
b.callback;b.callback=function(){var d=eval("("+this.responseText+")");for(var e in d)h(b.map[e]).html(c(d[e]))};this.xhr(a,b);return this}});(function(a,b){function c(g,o,m){return(g+(o-g)*m).toFixed(3)}function d(g,o,m){return g.substr(o,m||1)}function e(g,o,m){for(var n=2,k,l,u=[],w=[];k=3,l=arguments[n-1],n--;)if(d(l,0)=="r")for(l=l.match(/\d+/g);k--;)u.push(~~l[k]);else{if(l.length==4)l="#"+d(l,1)+d(l,1)+d(l,2)+d(l,2)+d(l,3)+d(l,3);for(;k--;)u.push(parseInt(d(l,1+k*2,2),16))}for(;k--;){n=~~(u[k+
3]+(u[k]-u[k+3])*m);w.push(n<0?0:n>255?255:n)}return"rgb("+w.join(",")+")"}function f(g){var o=parseFloat(g);g=g.replace(/^[\-\d\.]+/,"");return isNaN(o)?{v:g,f:e,u:""}:{v:o,f:c,u:g}}function i(g){var o={},m=r.length,n;q.innerHTML='<div style="'+g+'"></div>';for(g=q.childNodes[0].style;m--;)if(n=g[r[m]])o[r[m]]=f(n);return o}var q=p.createElement("div"),r="backgroundColor borderBottomColor borderBottomWidth borderLeftColor borderLeftWidth borderRightColor borderRightWidth borderSpacing borderTopColor borderTopWidth bottom color fontSize fontWeight height left letterSpacing lineHeight marginBottom marginLeft marginRight marginTop maxHeight maxWidth minHeight minWidth opacity outlineColor outlineOffset outlineWidth paddingBottom paddingLeft paddingRight paddingTop right textIndent top width wordSpacing zIndex".split(" ");
b[a]=function(g,o,m){g=typeof g=="string"?p.getElementById(g):g;m=m||{};var n=i(o);o=g.currentStyle?g.currentStyle:getComputedStyle(g,null);var k,l={},u=+new Date,w=m.duration||200,H=u+w,I,S=m.easing||function(x){return-Math.cos(x*Math.PI)/2+0.5};for(k in n)l[k]=f(o[k]);I=setInterval(function(){var x=+new Date,T=x>H?1:(x-u)/w;for(k in n)g.style[k]=n[k].f(l[k].v,n[k].v,S(T))+n[k].u;if(x>H){clearInterval(I);m.after&&m.after()}},10)}})("emile",this)})();


/**
 * Lawnchair
 * =========
 * A lightweight JSON document store.
 *
 */
var Lawnchair = function(opts) {
	this.init(opts);
}

Lawnchair.prototype = {
	
	init:function(opts) {
		var adaptors = {
			'webkit':window.WebkitSQLiteAdaptor,
			'gears':window.GearsSQLiteAdaptor,
			'dom':window.DOMStorageAdaptor,
			'cookie':window.CookieAdaptor,
			'air':window.AIRSQLiteAdaptor,
			'userdata':window.UserDataAdaptor,
			'air-async':window.AIRSQLiteAsyncAdaptor,
			'blackberry':window.BlackBerryPersistentStorageAdaptor,
            'couch':window.CouchAdaptor
		};
		this.adaptor = opts.adaptor ? new adaptors[opts.adaptor](opts) : new DOMStorageAdaptor(opts);
		
        // Check for native JSON functions.
        if (!JSON || !JSON.stringify) throw "Native JSON functions unavailable - please include http://www.json.org/json2.js or run on a decent browser :P";
	},
	
	// Save an object to the store. If a key is present then update. Otherwise create a new record.
	save:function(obj, callback) {this.adaptor.save(obj, callback)},
	
	// Invokes a callback on an object with the matching key.
	get:function(key, callback) {this.adaptor.get(key, callback)},

	// Returns whether a key exists to a callback.
	exists:function(callback) {this.adaptor.exists(callback)},
	
	// Returns all rows to a callback.
	all:function(callback) {this.adaptor.all(callback)},
	
	// Removes a json object from the store.
	remove:function(keyOrObj, callback) {this.adaptor.remove(keyOrObj, callback)},
	
	// Removes all documents from a store and returns self.
	nuke:function(callback) {this.adaptor.nuke(callback);return this},
	
	// Returns a page of results based on offset provided by user and perPage option
	paged:function(page, callback) {this.adaptor.paged(page, callback)},
	
	/**
	 * Iterator that accepts two paramters (methods or eval strings):
	 *
	 * - conditional test for a record
	 * - callback to invoke on matches
	 *
	 */
	find:function(condition, callback) {
		var is = (typeof condition == 'string') ? function(r){return eval(condition)} : condition
		  , cb = this.adaptor.terseToVerboseCallback(callback);
	
		this.each(function(record, index) {
			if (is(record)) cb(record, index); // thats hot
		});
	},


	/**
	 * Classic iterator.
	 * - Passes the record and the index as the second parameter to the callback.
	 * - Accepts a string for eval or a method to be invoked for each document in the collection.
	 */
	each:function(callback) {
		var cb = this.adaptor.terseToVerboseCallback(callback);
		this.all(function(results) {
			var l = results.length;
			for (var i = 0; i < l; i++) {
				cb(results[i], i);
			}
		});
	}
// --
};


/**
 * CouchAdaptor 
 * ============
 * Assumes http://localhost:5984/_utils/script/couch.js has been included. Not an unreasonable assumption.
 *
 */
var CouchAdaptor = function(options) {
	for (var i in LawnchairAdaptorHelpers) {
		this[i] = LawnchairAdaptorHelpers[i];
	}
	this.init(options);
};

// FIXME - should the constructor accept a callback? init of db could take a while..
CouchAdaptor.prototype = {
	init: function(options) {
        // TODO - make name required in all lawnchairs
        if (options.name == undefined)
            throw("name required for the couch adaptor. try: new Lawnchair({name:'store', adaptor:'couch'})");
        // FIXME - need to allow for running via CouchApp (rel path / no prefix)
        CouchDB.urlPrefix = "http://127.0.0.1:5984";         
        this.db = new CouchDB(options.name);
        // only create a db if it hasn't been
        if (CouchDB.allDbs().indexOf(options.name) == -1) 
            this.db.createDb();
	},

	save: function(obj, callback) {
        if (obj.key) obj._id = obj.key;
        var result = this.db.save(obj)
          , cb = this.terseToVerboseCallback(callback);
        if (cb)
            cb(obj);
	},
    
    get: function(keyOrObject, callback) {
        var key = typeof keyOrObject == 'object' ? keyOrObject.key : keyOrObject
          , cb  = this.terseToVerboseCallback(callback);
        cb(this.db.open(key));
    },

	all: function(callback) {
        var map = function(doc) {
            if (!doc.key) doc.key = doc._id;  
            emit(doc.key, doc);
          }
          , docs = this.db.query(map)
          , cb = this.terseToVerboseCallback(callback)
          , result = []
          // FIXME - seems inefficient 
          for (var i = 0, l = docs.rows.length; i < l; i++) {
             result.push(docs.rows[i].value);
          }
        if (cb)   
            cb(result);
	},

	remove: function(keyOrObj, callback) {
        var cb = this.terseToVerboseCallback(callback)
          , me = this;
        if (typeof keyOrObj == 'object') {
            this.db.deleteDoc(keyOrObj);
            if (cb) 
                cb();
        } else {
            this.get(keyOrObj, function(r){ 
                me.db.deleteDoc(r);
                if (cb) 
                    cb();
            });
        }
	},

	nuke: function(cb) {
        this.db.deleteDb();
        this.db.createDb();
        if (cb)
            cb();
	}, 
    // FIXME - not sure this is the right way to do this; would be useful for conditional code
    // that wants to check for capabilties on adaptor. (Eg, store.adaptor.db.replicate())
    toString: function() {
        return 'couch'
    }
};


/**
 * LawnchairAdaptorHelpers
 * =======================
 * Useful helpers for creating Lawnchair stores. Used as a mixin.
 *
 */
var LawnchairAdaptorHelpers = {
	// merging default properties with user defined args
	merge: function(defaultOption, userOption) {
		return (userOption == undefined || userOption == null) ? defaultOption: userOption;
	},

	// awesome shorthand callbacks as strings. this is shameless theft from dojo.
	terseToVerboseCallback: function(callback) {
		return (typeof arguments[0] == 'string') ?
		function(r, i) {
			eval(callback);
		}: callback;
	},

	// Returns current datetime for timestamps.
	now: function() {
		return new Date().getTime();
	},

	// Returns a unique identifier
	uuid: function(len, radix) {
		// based on Robert Kieffer's randomUUID.js at http://www.broofa.com
		var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');
		var uuid = [];
		radix = radix || chars.length;

		if (len) {
			for (var i = 0; i < len; i++) uuid[i] = chars[0 | Math.random() * radix];
		} else {
			// rfc4122, version 4 form
			var r;

			// rfc4122 requires these characters
			uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-';
			uuid[14] = '4';

			// Fill in random data.  At i==19 set the high bits of clock sequence as
			// per rfc4122, sec. 4.1.5
			for (var i = 0; i < 36; i++) {
				if (!uuid[i]) {
					r = 0 | Math.random() * 16;
					uuid[i] = chars[(i == 19) ? (r & 0x3) | 0x8: r];
				}
			}
		}
		return uuid.join('');
	},

	// Serialize a JSON object as a string.
	serialize: function(obj) {
		var r = '';
		r = JSON.stringify(obj);
		return r;
	},

	// Deserialize JSON.
	deserialize: function(json) {
		return eval('(' + json + ')');
	}
};


/**
 * WebkitSQLiteAdaptor
 * ===================
 * Sqlite implementation for Lawnchair.
 *
 */
var WebkitSQLiteAdaptor = function(options) {
	for (var i in LawnchairAdaptorHelpers) {
		this[i] = LawnchairAdaptorHelpers[i];
	}
	this.init(options);
};


WebkitSQLiteAdaptor.prototype = {
	init:function(options) {
		var that = this;
		var merge = that.merge;
		var opts = (typeof arguments[0] == 'string') ? {table:options} : options;

		// default properties
		this.name		= merge('Lawnchair', opts.name	  	);
		this.version	= merge('1.0',       opts.version 	);
		this.table 		= merge('field',     opts.table	  	);
		this.display	= merge('shed',      opts.display 	);
		this.max		= merge(65536,       opts.max	  	);
		this.db			= merge(null,        opts.db		);
		this.perPage    = merge(10,          opts.perPage   );

		// default sqlite callbacks
		this.onError = function(){};
		this.onData  = function(){};

		if("onError" in opts) {
			this.onError = opts.onError;
		}

		// error out on shit browsers
		if (!window.openDatabase)
			throw('Lawnchair, "This browser does not support sqlite storage."');

		// instantiate the store
		this.db = openDatabase(this.name, this.version, this.display, this.max);

		// create a default database and table if one does not exist
		this.db.transaction(function(tx) {
			tx.executeSql("SELECT COUNT(*) FROM " + that.table, [], function(){}, function(tx, error) {
				that.db.transaction(function(tx) {
					tx.executeSql("CREATE TABLE "+ that.table + " (id NVARCHAR(32) UNIQUE PRIMARY KEY, value TEXT, timestamp REAL)", [], function(){}, that.onError);
				});
			});
		});
	},
	save:function(obj, callback) {
		var that = this;
	
		var update = function(id, obj, callback) {
			that.db.transaction(function(t) {
				t.executeSql(
					"UPDATE " + that.table + " SET value=?, timestamp=? WHERE id=?",
					[that.serialize(obj), that.now(), id],
					function() {
						if (callback != undefined) {
							obj.key = id;
							that.terseToVerboseCallback(callback)(obj);
						}
					},
					that.onError
				);
			});
		};
		var insert = function(obj, callback) {
			that.db.transaction(function(t) {
				var id = (obj.key == undefined) ? that.uuid() : obj.key;
				delete(obj.key);
				t.executeSql(
					"INSERT INTO " + that.table + " (id, value,timestamp) VALUES (?,?,?)",
					[id, that.serialize(obj), that.now()],
					function() {
						if (callback != undefined) {
							obj.key = id;
							that.terseToVerboseCallback(callback)(obj);
						}
					},
					that.onError
				);
			});
		};
		if (obj.key == undefined) {
			insert(obj, callback);
		} else {
			this.get(obj.key, function(r) {
				var isUpdate = (r != null);
	
				if (isUpdate) {
					var id = obj.key;
					delete(obj.key);
					update(id, obj, callback);
				} else {
					insert(obj, callback);
				}
			});
		}
	},
	get:function(key, callback) {
		var that = this;
		this.db.transaction(function(t) {
			t.executeSql(
				"SELECT value FROM " + that.table + " WHERE id = ?",
				[key],
				function(tx, results) {
					if (results.rows.length == 0) {
						that.terseToVerboseCallback(callback)(null);
					} else {
						var o = that.deserialize(results.rows.item(0).value);
						o.key = key;
						that.terseToVerboseCallback(callback)(o);
					}
				},
				this.onError
			);
		});
	},
	all:function(callback) {
		var cb = this.terseToVerboseCallback(callback);
		var that = this;
		this.db.transaction(function(t) {
			t.executeSql("SELECT * FROM " + that.table, [], function(tx, results) {
				if (results.rows.length == 0 ) {
					cb([]);
				} else {
					var r = [];
					for (var i = 0, l = results.rows.length; i < l; i++) {
						var raw = results.rows.item(i).value;
						var obj = that.deserialize(raw);
						obj.key = results.rows.item(i).id;
						r.push(obj);
					}
					cb(r);
				}
			},
			that.onError);
		});
	},
	paged:function(page, callback) {
		var cb = this.terseToVerboseCallback(callback);
		var that = this;
		this.db.transaction(function(t) {
		    var offset = that.perPage * (page - 1); // a little offset math magic so users don't have to be 0-based
		    var sql = "SELECT * FROM " + that.table + " ORDER BY timestamp ASC LIMIT ? OFFSET ?";
			t.executeSql(sql, [that.perPage, offset], function(tx, results) {
				if (results.rows.length == 0 ) {
					cb([]);
				} else {
					var r = [];
					for (var i = 0, l = results.rows.length; i < l; i++) {
						var raw = results.rows.item(i).value;
						var obj = that.deserialize(raw);
						obj.key = results.rows.item(i).id;
						r.push(obj);
					}
					cb(r);
				}
			},
			that.onError);
		});
	},
	remove:function(keyOrObj, callback) {
		var that = this;
        if (callback)
            callback = that.terseToVerboseCallback(callback);
		this.db.transaction(function(t) {
			t.executeSql(
				"DELETE FROM " + that.table + " WHERE id = ?",
				[(typeof keyOrObj == 'string') ? keyOrObj : keyOrObj.key],
				callback || that.onData,
				that.onError
			);
		});
	},
	nuke:function(callback) {
		var that = this;
        if (callback)
            callback = that.terseToVerboseCallback(callback);
		this.db.transaction(function(tx) {
			tx.executeSql(
				"DELETE FROM " + that.table,
				[],
				callback || that.onData,
				that.onError
			);
		});
	}
};


/**
 * CookieAdaptor
 * ===================
 * Cookie implementation for Lawnchair for older browsers.
 *
 * Based on ppk's http://www.quirksmode.org/js/cookies.html
 *
 */
var CookieAdaptor = function(options) {
	for (var i in LawnchairAdaptorHelpers) {
		this[i] = LawnchairAdaptorHelpers[i];
	}
	this.init(options);
};

CookieAdaptor.prototype = {
	init:function(){
		this.createCookie = function(name, value, days) {
			if (days) {
				var date = new Date();
				date.setTime(date.getTime()+(days*24*60*60*1000));
				var expires = "; expires="+date.toGMTString();
			}
			else var expires = "";
			document.cookie = name+"="+value+expires+"; path=/";
		};
	},
	get:function(key, callback){
		var readCookie = function(name) {
			var nameEQ = name + "=";
			var ca = document.cookie.split(';');
			var len = ca.length;
			for (var i=0; i < len; i++) {
				var c = ca[i];
				while (c.charAt(0)==' ') c = c.substring(1,c.length);
				if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
			}
			return null;
		};
		var obj = this.deserialize(readCookie(key)) || null;
		if (obj) {
			obj.key = key;
		}
		if (callback)
            this.terseToVerboseCallback(callback)(obj);
	},
	save:function(obj, callback){
		var id = obj.key || this.uuid();
		delete obj.key;
		this.createCookie(id, this.serialize(obj), 365);
        obj.key = id;
		if (callback)
			this.terseToVerboseCallback(callback)(obj);
	},
	all:function(callback){
		var cb = this.terseToVerboseCallback(callback);
		var ca = document.cookie.split(';');
		var yar = [];
		var c,k,v,o;
		// yo ho yo ho a pirates life for me
		for (var i = 0, l = ca.length; i < l; i++) {
			c = ca[i].split('=');
			k = c[0];
			v = c[1];
			o = this.deserialize(v);
			if (o) {
				o.key = k;
				yar.push(o);
			}
		}
		if (cb)
			cb(yar);
	},
	remove:function(keyOrObj, callback) {
		var key = (typeof keyOrObj == 'string') ? keyOrObj : keyOrObj.key;
		this.createCookie(key, '', -1);
		if (callback)
		    this.terseToVerboseCallback(callback)();
	},
	nuke:function(callback) {
		var that = this;
		this.all(function(r){
			for (var i = 0, l = r.length; i < l; i++) {
				if (r[i].key)
					that.remove(r[i].key);
			}
            if (callback) {
                callback = that.terseToVerboseCallback(callback);
                callback(r);
            }
		});
	}
};


/**
 * BlackBerryPersistentStorageAdaptor
 * ===================
 * Implementation that uses the BlackBerry Persistent Storage mechanism. This is only available in PhoneGap BlackBerry projects
 * See http://www.github.com/phonegap/phonegap-blackberry
 *
 */
var BlackBerryPersistentStorageAdaptor = function(options) {
	for (var i in LawnchairAdaptorHelpers) {
		this[i] = LawnchairAdaptorHelpers[i];
	}
	this.init(options);
};

BlackBerryPersistentStorageAdaptor.prototype = {
	init:function() {
		// Check for the existence of the phonegap blackberry persistent store API
		if (!navigator.store)
			throw('Lawnchair, "This browser does not support BlackBerry Persistent Storage; it is a PhoneGap-only implementation."');
	},
	get:function(key, callback) {
		var that = this;
		navigator.store.get(function(value) { // success cb
			if (callback) {
				// Check if BBPS returned a serialized JSON obj, if so eval it.
				if (that.isObjectAsString(value)) {
					eval('value = ' + value.substr(0,value.length-1) + ',key:\'' + key + '\'};');
				}
				that.terseToVerboseCallback(callback)(value);
			}
		}, function() {}, // empty error cb
		key);
	},
	save:function(obj, callback) {
		var id = obj.key || this.uuid();
		delete obj.key;
		var that = this;
		navigator.store.put(function(){
			if (callback) {
				var cbObj = obj;
				cbObj['key'] = id;
				that.terseToVerboseCallback(callback)(cbObj);
			}
		}, function(){}, id, this.serialize(obj));
	},
	all:function(callback) {
		var that = this;
		navigator.store.getAll(function(json) { // success cb
			if (callback) {
				// BlackBerry store returns straight strings, so eval as necessary for values we deem as objects.
				var arr = [];
				for (var prop in json) {
					if (that.isObjectAsString(json[prop])) {
						eval('arr.push(' + json[prop].substr(0,json[prop].length-1) + ',key:\'' + prop + '\'});');
					} else {
						eval('arr.push({\'' + prop + '\':\'' + json[prop] + '\'});');
					}
				}
				that.terseToVerboseCallback(callback)(arr);
			}
		}, function() {}); // empty error cb
	},
	remove:function(keyOrObj, callback) {
		var key = (typeof keyOrObj == 'string') ? keyOrObj : keyOrObj.key;
		var that = this;
		navigator.store.remove(function() {
			if (callback)
		    	that.terseToVerboseCallback(callback)();
		}, function() {}, key);
	},
	nuke:function(callback) {
		var that = this;
		navigator.store.nuke(function(){
			if (callback)
		    	that.terseToVerboseCallback(callback)();
		},function(){});
	},
	// Private helper.
	isObjectAsString:function(value) {
		return (value != null && value[0] == '{' && value[value.length-1] == '}');
	}
};

/**
 * DOMStorageAdaptor
 * ===================
 * DOM Storage implementation for Lawnchair.
 *
 * - originally authored by Joseph Pecoraro
 * - window.name code courtesy Remy Sharp: http://24ways.org/2009/breaking-out-the-edges-of-the-browser
 *
 */
var DOMStorageAdaptor = function(options) {
	for (var i in LawnchairAdaptorHelpers) {
		this[i] = LawnchairAdaptorHelpers[i];
	}
	this.init(options);
};


DOMStorageAdaptor.prototype = {
	init:function(options) {
		var self = this;
		this.storage = this.merge(window.localStorage, options.storage);
		this.table = this.merge('field', options.table);
		
		if (!window.Storage) {
			this.storage = (function () {
				// window.top.name ensures top level, and supports around 2Mb
				var data = window.top.name ? self.deserialize(window.top.name) : {};
				return {
					setItem: function (key, value) {
						data[key] = value+""; // force to string
						window.top.name = self.serialize(data);
					},
					removeItem: function (key) {
						delete data[key];
						window.top.name = self.serialize(data);
					},
					getItem: function (key) {
						return data[key] || null;
					},
					clear: function () {
						data = {};
						window.top.name = '';
					}
				};
			})();
		};
	},

	save:function(obj, callback) {
		var id = this.table + '::' + (obj.key || this.uuid());
		delete obj.key;
		this.storage.setItem(id, this.serialize(obj));
		if (callback) {
		    obj.key = id.split('::')[1];
		    callback(obj);
		}
	},

    get:function(key, callback) {
        var obj = this.deserialize(this.storage.getItem(this.table + '::' + key))
          , cb = this.terseToVerboseCallback(callback);
        
        if (obj) {
            obj.key = key;
            if (callback) cb(obj);
        } else {
			if (callback) cb(null);
		}
    },

	all:function(callback) {
		var cb = this.terseToVerboseCallback(callback);
		var results = [];
		for (var i = 0, l = this.storage.length; i < l; ++i) {
			var id = this.storage.key(i);
			var tbl = id.split('::')[0]
			var key = id.split('::').slice(1).join("::");
			if (tbl == this.table) {
				var obj = this.deserialize(this.storage.getItem(id));
				obj.key = key;
				results.push(obj);
			}
		}
		if (cb)
			cb(results);
	},

	remove:function(keyOrObj, callback) {
		var key = this.table + '::' + (typeof keyOrObj === 'string' ? keyOrObj : keyOrObj.key);
		this.storage.removeItem(key);
		if(callback)
		  callback();
	},

	nuke:function(callback) {
		var self = this;
		this.all(function(r) {
			for (var i = 0, l = r.length; i < l; i++) {
				self.remove(r[i]);
			}
			if(callback)
			  callback();
		});
	}
};


// init.js directly included to save on include traffic
//
// Copyright 2007, Google Inc.
//
// Redistribution and use in source and binary forms, with or without
// modification, are permitted provided that the following conditions are met:
//
//	1. Redistributions of source code must retain the above copyright notice,
//		 this list of conditions and the following disclaimer.
//	2. Redistributions in binary form must reproduce the above copyright notice,
//		 this list of conditions and the following disclaimer in the documentation
//		 and/or other materials provided with the distribution.
//	3. Neither the name of Google Inc. nor the names of its contributors may be
//		 used to endorse or promote products derived from this software without
//		 specific prior written permission.
//
// THIS SOFTWARE IS PROVIDED BY THE AUTHOR ``AS IS'' AND ANY EXPRESS OR IMPLIED
// WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF
// MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO
// EVENT SHALL THE AUTHOR BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,
// SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO,
// PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS;
// OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY,
// WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR
// OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF
// ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
// Sets up google.gears.*, which is *the only* supported way to access Gears.
//
// Circumvent this file at your own risk!
//
// In the future, Gears may automatically define google.gears.* without this
// file. Gears may use these objects to transparently fix bugs and compatibility
// issues. Applications that use the code below will continue to work seamlessly
// when that happens.

(function() {
	// We are already defined. Hooray!
	if (window.google && google.gears) {
		return;
	}

	var factory = null;

	// Firefox
	if (typeof GearsFactory != 'undefined') {
		factory = new GearsFactory();
	} else {
		// IE
		try {
			factory = new ActiveXObject('Gears.Factory');
			// privateSetGlobalObject is only required and supported on IE Mobile on
			// WinCE.
			if (factory.getBuildInfo().indexOf('ie_mobile') != -1) {
				factory.privateSetGlobalObject(this);
			}
		} catch (e) {
			// Safari
			if ((typeof navigator.mimeTypes != 'undefined')
					 && navigator.mimeTypes["application/x-googlegears"]) {
				factory = document.createElement("object");
				factory.style.display = "none";
				factory.width = 0;
				factory.height = 0;
				factory.type = "application/x-googlegears";
				document.documentElement.appendChild(factory);
			}
		}
	}

	// *Do not* define any objects if Gears is not installed. This mimics the
	// behavior of Gears defining the objects in the future.
	if (!factory) {
		return;
	}

	// Now set up the objects, being careful not to overwrite anything.
	//
	// Note: In Internet Explorer for Windows Mobile, you can't add properties to
	// the window object. However, global objects are automatically added as
	// properties of the window object in all browsers.
	if (!window.google) {
		google = {};
	}

	if (!google.gears) {
		google.gears = {factory: factory};
	}
})();

/**
 * GearsSQLiteAdaptor
 * ===================
 * Gears flavored SQLite implementation for Lawnchair.
 *
 */
var GearsSQLiteAdaptor = function(options) {
	for (var i in LawnchairAdaptorHelpers) {
		this[i] = LawnchairAdaptorHelpers[i];
	}
	this.init(options);
};


GearsSQLiteAdaptor.prototype = {
	init:function(options) {
		var that = this;
		var merge = that.merge;
		var opts = (typeof arguments[0] == 'string') ? {table:options} : options;
		this.name = merge('Lawnchair', opts.name);
		this.table = merge('field', opts.table);
		this.db = google.gears.factory.create('beta.database');
		this.db.open(this.name);
		this.db.execute('create table if not exists ' + this.table + ' (id NVARCHAR(32) UNIQUE PRIMARY KEY, value TEXT, timestamp REAL)');
	},
	save:function(obj, callback) {
		var that = this;

		var insert = function(obj, callback) {
			var id = (obj.key == undefined) ? that.uuid() : obj.key;
			delete(obj.key);
	
			var rs = that.db.execute(
				"INSERT INTO " + that.table + " (id, value, timestamp) VALUES (?,?,?)",
				[id, that.serialize(obj), that.now()]
			);
			if (callback != undefined) {
				obj.key = id;
				callback(obj);
			}
		};
	
		var update = function(id, obj, callback) {
			that.db.execute(
				"UPDATE " + that.table + " SET value=?, timestamp=? WHERE id=?",
				[that.serialize(obj), that.now(), id]
			);
			if (callback != undefined) {
				obj.key = id;
				callback(obj);
			}
		};
	
		if (obj.key == undefined) {
			insert(obj, callback);
		} else {
			this.get(obj.key, function(r) {
				var isUpdate = (r != null);
	
				if (isUpdate) {
					var id = obj.key;
					delete(obj.key);
					update(id, obj, callback);
				} else {
					insert(obj, callback);
				}
			});
		}
	
	},
	get:function(key, callback) {
		var rs = this.db.execute("SELECT * FROM " + this.table + " WHERE id = ?", [key]);
	
		if (rs.isValidRow()) {
			// FIXME need to test null return / empty recordset
			var o = this.deserialize(rs.field(1));
			o.key = key;
			callback(o);
		} else {
			callback(null);
		}
		rs.close();
	},
	all:function(callback) {
		var cb	= this.terseToVerboseCallback(callback);
		var rs	= this.db.execute("SELECT * FROM " + this.table);
		var r		= [];
		var o;
	
		// FIXME need to add 0 len support
		//if (results.rows.length == 0 ) {
		//	cb([]);
	
		while (rs.isValidRow()) {
			o = this.deserialize(rs.field(1));
			o.key = rs.field(0);
				r.push(o);
				rs.next();
		}
		rs.close();
		cb(r);
	},
	remove:function(keyOrObj, callback) {
		this.db.execute(
			"DELETE FROM " + this.table + " WHERE id = ?",
			[(typeof keyOrObj == 'string') ? keyOrObj : keyOrObj.key]
		);
		if(callback)
		  callback();
	},
	nuke:function(callback) {
		this.db.execute("DELETE FROM " + this.table);
		if(callback)
		  callback();
		return this;
	}
};


/**
 * UserDataAdaptor
 * ===================
 * UserData implementation for Lawnchair for older IE browsers.
 *
 */
var UserDataAdaptor = function(options) {
    for (var i in LawnchairAdaptorHelpers) {
        this[i] = LawnchairAdaptorHelpers[i];
    }
    this.init(options);
};

UserDataAdaptor.prototype = {
	init:function(){
		var s = document.createElement('span');
		s.style.behavior = 'url(\'#default#userData\')';
		s.style.position = 'absolute';
		s.style.left = 10000;
		document.body.appendChild(s);
		this.storage = s;
		this.storage.load('lawnchair');
	},
	get:function(key, callback){
		
		var obj = this.deserialize(this.storage.getAttribute(key));
	        if (obj) {
	            obj.key = key;
	            
	        }
			if (callback)
	                callback(obj);
	},
	save:function(obj, callback){
		var id = obj.key || 'lc' + this.uuid();
	        delete obj.key;		
		this.storage.setAttribute(id, this.serialize(obj));
		this.storage.save('lawnchair');		
		if (callback){
			obj.key = id;
			callback(obj);
			}
	},
	all:function(callback){
		var cb = this.terseToVerboseCallback(callback);
		var ca = this.storage.XMLDocument.firstChild.attributes;
		var yar = [];
		var v,o;
		// yo ho yo ho a pirates life for me
		for (var i = 0, l = ca.length; i < l; i++) {
			v = ca[i];
			o = this.deserialize(v.nodeValue);
			if (o) {
				o.key = v.nodeName;
				yar.push(o);
			}
		}
		if (cb)
			cb(yar);
	},
	remove:function(keyOrObj,callback) {
		var key = (typeof keyOrObj == 'string') ?  keyOrObj : keyOrObj.key;		
		this.storage.removeAttribute(key);
		this.storage.save('lawnchair');
		if(callback)
		  callback();
	}, 
	nuke:function(callback) {
		var that = this;		  
		this.all(function(r){
			for (var i = 0, l = r.length; i < l; i++) {
				if (r[i].key)
					that.remove(r[i].key);
			}
			if(callback) 
				callback();
		});
	}
};


(function($){$.jQTouch=function(_2){$.support.WebKitCSSMatrix=(typeof WebKitCSSMatrix=="object");$.support.touch=(typeof Touch=="object");$.support.WebKitAnimationEvent=(typeof WebKitTransitionEvent=="object");var _3,$head=$("head"),hist=[],newPageCount=0,jQTSettings={},hashCheck,currentPage,orientation,isMobileWebKit=RegExp(" Mobile/").test(navigator.userAgent),tapReady=true,lastAnimationTime=0,touchSelectors=[],publicObj={},extensions=$.jQTouch.prototype.extensions,defaultAnimations=["slide","flip","slideup","swap","cube","pop","dissolve","fade","back"],animations=[],hairextensions="";init(_2);function init(_4){var _5={addGlossToIcon:true,backSelector:".back, .cancel, .goback",cacheGetRequests:true,cubeSelector:".cube",dissolveSelector:".dissolve",fadeSelector:".fade",fixedViewport:true,flipSelector:".flip",formSelector:"form",fullScreen:true,fullScreenClass:"fullscreen",icon:null,touchSelector:"a, .touch",popSelector:".pop",preloadImages:false,slideSelector:"body > * > ul li a",slideupSelector:".slideup",startupScreen:null,statusBar:"default",submitSelector:".submit",swapSelector:".swap",useAnimations:true,useFastTouch:true};jQTSettings=$.extend({},_5,_4);if(jQTSettings.preloadImages){for(var i=jQTSettings.preloadImages.length-1;i>=0;i--){(new Image()).src=jQTSettings.preloadImages[i];}}if(jQTSettings.icon){var _7=(jQTSettings.addGlossToIcon)?"":"-precomposed";hairextensions+="<link rel=\"apple-touch-icon"+_7+"\" href=\""+jQTSettings.icon+"\" />";}if(jQTSettings.startupScreen){hairextensions+="<link rel=\"apple-touch-startup-image\" href=\""+jQTSettings.startupScreen+"\" />";}if(jQTSettings.fixedViewport){hairextensions+="<meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0;\"/>";}if(jQTSettings.fullScreen){hairextensions+="<meta name=\"apple-mobile-web-app-capable\" content=\"yes\" />";if(jQTSettings.statusBar){hairextensions+="<meta name=\"apple-mobile-web-app-status-bar-style\" content=\""+jQTSettings.statusBar+"\" />";}}if(hairextensions){$head.append(hairextensions);}$(document).ready(function(){for(var i in extensions){var fn=extensions[i];if($.isFunction(fn)){$.extend(publicObj,fn(publicObj));}}for(var i in defaultAnimations){var _a=defaultAnimations[i];var _b=jQTSettings[_a+"Selector"];if(typeof (_b)=="string"){addAnimation({name:_a,selector:_b});}}touchSelectors.push("input");touchSelectors.push(jQTSettings.touchSelector);touchSelectors.push(jQTSettings.backSelector);touchSelectors.push(jQTSettings.submitSelector);$(touchSelectors.join(", ")).css("-webkit-touch-callout","none");$(jQTSettings.backSelector).tap(liveTap);$(jQTSettings.submitSelector).tap(submitParentForm);_3=$("body");if(jQTSettings.fullScreenClass&&window.navigator.standalone==true){_3.addClass(jQTSettings.fullScreenClass+" "+jQTSettings.statusBar);}_3.bind("touchstart",handleTouch).bind("orientationchange",updateOrientation).trigger("orientationchange").submit(submitForm);if(jQTSettings.useFastTouch&&$.support.touch){_3.click(function(e){var _d=$(e.target);if(_d.attr("target")=="_blank"||_d.attr("rel")=="external"||_d.is("input[type=\"checkbox\"]")){return true;}else{return false;}});_3.mousedown(function(e){var _f=(new Date()).getTime()-lastAnimationTime;if(_f<200){return false;}});}if($("body > .current").length==0){currentPage=$("body > *:first");}else{currentPage=$("body > .current:first");$("body > .current").removeClass("current");}$(currentPage).addClass("current");location.hash=$(currentPage).attr("id");addPageToHistory(currentPage);scrollTo(0,0);dumbLoopStart();});}function goBack(to){if(hist.length>1){var _11=Math.min(parseInt(to||1,10),hist.length-1);if(isNaN(_11)&&typeof (to)==="string"&&to!="#"){for(var i=1,length=hist.length;i<length;i++){if("#"+hist[i].id===to){_11=i;break;}}}if(isNaN(_11)||_11<1){_11=1;}var _13=hist[0].animation;var _14=hist[0].page;hist.splice(0,_11);var _15=hist[0].page;animatePages(_14,_15,_13,true);return publicObj;}else{console.error("No pages in history.");return false;}}function goTo(_16,_17){var _18=hist[0].page;if(typeof (_16)==="string"){_16=$(_16);}if(typeof (_17)==="string"){for(var i=animations.length-1;i>=0;i--){if(animations[i].name===_17){_17=animations[i];break;}}}if(animatePages(_18,_16,_17)){addPageToHistory(_16,_17);return publicObj;}else{console.error("Could not animate pages.");return false;}}function getOrientation(){return orientation;}function liveTap(e){var $el=$(e.target);if($el.attr("nodeName")!=="A"){$el=$el.parent("a");}var _1c=$el.attr("target"),hash=$el.attr("hash"),animation=null;if(tapReady==false||!$el.length){console.warn("Not able to tap element.");return false;}if($el.attr("target")=="_blank"||$el.attr("rel")=="external"){return true;}for(var i=animations.length-1;i>=0;i--){if($el.is(animations[i].selector)){animation=animations[i];break;}}if(_1c=="_webapp"){window.location=$el.attr("href");}else{if($el.is(jQTSettings.backSelector)){goBack(hash);}else{if(hash&&hash!="#"){$el.addClass("active");goTo($(hash).data("referrer",$el),animation);}else{$el.addClass("loading active");showPageByHref($el.attr("href"),{animation:animation,callback:function(){$el.removeClass("loading");setTimeout($.fn.unselect,250,$el);},$referrer:$el});}}}return false;}function addPageToHistory(_1e,_1f){var _20=_1e.attr("id");hist.unshift({page:_1e,animation:_1f,id:_20});}function animatePages(_21,_22,_23,_24){if(_22.length===0){$.fn.unselect();console.error("Target element is missing.");return false;}$(":focus").blur();scrollTo(0,0);var _25=function(_26){if(_23){_22.removeClass("in reverse "+_23.name);_21.removeClass("current out reverse "+_23.name);}else{_21.removeClass("current");}_22.trigger("pageAnimationEnd",{direction:"in"});_21.trigger("pageAnimationEnd",{direction:"out"});clearInterval(dumbLoop);currentPage=_22;location.hash=currentPage.attr("id");dumbLoopStart();var _27=_22.data("referrer");if(_27){_27.unselect();}lastAnimationTime=(new Date()).getTime();tapReady=true;};_21.trigger("pageAnimationStart",{direction:"out"});_22.trigger("pageAnimationStart",{direction:"in"});if($.support.WebKitAnimationEvent&&_23&&jQTSettings.useAnimations){_22.one("webkitAnimationEnd",_25);tapReady=false;_22.addClass(_23.name+" in current "+(_24?" reverse":""));_21.addClass(_23.name+" out"+(_24?" reverse":""));}else{_22.addClass("current");_25();}return true;}function dumbLoopStart(){dumbLoop=setInterval(function(){var _28=currentPage.attr("id");if(location.hash==""){location.hash="#"+_28;}else{if(location.hash!="#"+_28){try{goBack(location.hash);}catch(e){console.error("Unknown hash change.");}}}},100);}function insertPages(_29,_2a){var _2b=null;$(_29).each(function(_2c,_2d){var _2e=$(this);if(!_2e.attr("id")){_2e.attr("id","page-"+(++newPageCount));}_2e.appendTo(_3);if(_2e.hasClass("current")||!_2b){_2b=_2e;}});if(_2b!==null){goTo(_2b,_2a);return _2b;}else{return false;}}function showPageByHref(_2f,_30){var _31={data:null,method:"GET",animation:null,callback:null,$referrer:null};var _32=$.extend({},_31,_30);if(_2f!="#"){$.ajax({url:_2f,data:_32.data,type:_32.method,success:function(_33,_34){var _35=insertPages(_33,_32.animation);if(_35){if(_32.method=="GET"&&jQTSettings.cacheGetRequests&&_32.$referrer){_32.$referrer.attr("href","#"+_35.attr("id"));}if(_32.callback){_32.callback(true);}}},error:function(_36){if(_32.$referrer){_32.$referrer.unselect();}if(_32.callback){_32.callback(false);}}});}else{if($referrer){$referrer.unselect();}}}function submitForm(e,_38){var _39=(typeof (e)==="string")?$(e):$(e.target);if(_39.length&&_39.is(jQTSettings.formSelector)&&_39.attr("action")){showPageByHref(_39.attr("action"),{data:_39.serialize(),method:_39.attr("method")||"POST",animation:animations[0]||null,callback:_38});return false;}return true;}function submitParentForm(e){var _3b=$(this).closest("form");if(_3b.length){evt=jQuery.Event("submit");evt.preventDefault();_3b.trigger(evt);return false;}return true;}function addAnimation(_3c){if(typeof (_3c.selector)=="string"&&typeof (_3c.name)=="string"){animations.push(_3c);$(_3c.selector).tap(liveTap);touchSelectors.push(_3c.selector);}}function updateOrientation(){orientation=window.innerWidth<window.innerHeight?"profile":"landscape";_3.removeClass("profile landscape").addClass(orientation).trigger("turn",{orientation:orientation});}function handleTouch(e){var $el=$(e.target);if(!$(e.target).is(touchSelectors.join(", "))){var _3f=$(e.target).closest("a");if(_3f.length){$el=_3f;}else{return;}}if(event){var _40=null,startX=event.changedTouches[0].clientX,startY=event.changedTouches[0].clientY,startTime=(new Date).getTime(),deltaX=0,deltaY=0,deltaT=0;$el.bind("touchmove",touchmove).bind("touchend",touchend);_40=setTimeout(function(){$el.makeActive();},100);}function touchmove(e){updateChanges();var _42=Math.abs(deltaX);var _43=Math.abs(deltaY);if(_42>_43&&(_42>35)&&deltaT<1000){$el.trigger("swipe",{direction:(deltaX<0)?"left":"right"}).unbind("touchmove touchend");}else{if(_43>1){$el.removeClass("active");}}clearTimeout(_40);}function touchend(){updateChanges();if(deltaY===0&&deltaX===0){$el.makeActive();$el.trigger("tap");}else{$el.removeClass("active");}$el.unbind("touchmove touchend");clearTimeout(_40);}function updateChanges(){var _44=event.changedTouches[0]||null;deltaX=_44.pageX-startX;deltaY=_44.pageY-startY;deltaT=(new Date).getTime()-startTime;}}$.fn.unselect=function(obj){if(obj){obj.removeClass("active");}else{$(".active").removeClass("active");}};$.fn.makeActive=function(){return $(this).addClass("active");};$.fn.swipe=function(fn){if($.isFunction(fn)){return this.each(function(i,el){$(el).bind("swipe",fn);});}};$.fn.tap=function(fn){if($.isFunction(fn)){var _4a=(jQTSettings.useFastTouch&&$.support.touch)?"tap":"click";return $(this).live(_4a,fn);}else{$(this).trigger("tap");}};publicObj={getOrientation:getOrientation,goBack:goBack,goTo:goTo,addAnimation:addAnimation,submitForm:submitForm};return publicObj;};$.jQTouch.prototype.extensions=[];$.jQTouch.addExtension=function(_4b){$.jQTouch.prototype.extensions.push(_4b);};})(jQuery);

/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -  */
/*  Base64 class: Base 64 encoding / decoding (c) Chris Veness 2002-2009                          */
/*    note: depends on Utf8 class                                                                 */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -  */

var Base64 = {};  // Base64 namespace

Base64.code = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";

/**
 * Encode string into Base64, as defined by RFC 4648 [http://tools.ietf.org/html/rfc4648]
 * (instance method extending String object). As per RFC 4648, no newlines are added.
 *
 * @param {String} str The string to be encoded as base-64
 * @param {Boolean} [utf8encode=false] Flag to indicate whether str is Unicode string to be encoded 
 *   to UTF8 before conversion to base64; otherwise string is assumed to be 8-bit characters
 * @returns {String} Base64-encoded string
 */ 
Base64.encode = function(str, utf8encode) {  // http://tools.ietf.org/html/rfc4648
  utf8encode =  (typeof utf8encode == 'undefined') ? false : utf8encode;
  var o1, o2, o3, bits, h1, h2, h3, h4, e=[], pad = '', c, plain, coded;
  var b64 = Base64.code;
   
  plain = utf8encode ? Utf8.encode(str) : str;
  
  c = plain.length % 3;  // pad string to length of multiple of 3
  if (c > 0) { while (c++ < 3) { pad += '='; plain += '\0'; } }
  // note: doing padding here saves us doing special-case packing for trailing 1 or 2 chars
   
  for (c=0; c<plain.length; c+=3) {  // pack three octets into four hexets
    o1 = plain.charCodeAt(c);
    o2 = plain.charCodeAt(c+1);
    o3 = plain.charCodeAt(c+2);
      
    bits = o1<<16 | o2<<8 | o3;
      
    h1 = bits>>18 & 0x3f;
    h2 = bits>>12 & 0x3f;
    h3 = bits>>6 & 0x3f;
    h4 = bits & 0x3f;

    // use hextets to index into code string
    e[c/3] = b64.charAt(h1) + b64.charAt(h2) + b64.charAt(h3) + b64.charAt(h4);
  }
  coded = e.join('');  // join() is far faster than repeated string concatenation in IE
  
  // replace 'A's from padded nulls with '='s
  coded = coded.slice(0, coded.length-pad.length) + pad;
   
  return coded;
}

/**
 * Decode string from Base64, as defined by RFC 4648 [http://tools.ietf.org/html/rfc4648]
 * (instance method extending String object). As per RFC 4648, newlines are not catered for.
 *
 * @param {String} str The string to be decoded from base-64
 * @param {Boolean} [utf8decode=false] Flag to indicate whether str is Unicode string to be decoded 
 *   from UTF8 after conversion from base64
 * @returns {String} decoded string
 */ 
Base64.decode = function(str, utf8decode) {
  utf8decode =  (typeof utf8decode == 'undefined') ? false : utf8decode;
  var o1, o2, o3, h1, h2, h3, h4, bits, d=[], plain, coded;
  var b64 = Base64.code;

  coded = utf8decode ? Utf8.decode(str) : str;
  
  for (var c=0; c<coded.length; c+=4) {  // unpack four hexets into three octets
    h1 = b64.indexOf(coded.charAt(c));
    h2 = b64.indexOf(coded.charAt(c+1));
    h3 = b64.indexOf(coded.charAt(c+2));
    h4 = b64.indexOf(coded.charAt(c+3));
      
    bits = h1<<18 | h2<<12 | h3<<6 | h4;
      
    o1 = bits>>>16 & 0xff;
    o2 = bits>>>8 & 0xff;
    o3 = bits & 0xff;
    
    d[c/4] = String.fromCharCode(o1, o2, o3);
    // check for padding
    if (h4 == 0x40) d[c/4] = String.fromCharCode(o1, o2);
    if (h3 == 0x40) d[c/4] = String.fromCharCode(o1);
  }
  plain = d.join('');  // join() is far faster than repeated string concatenation in IE
  
  return utf8decode ? Utf8.decode(plain) : plain; 
}

/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -  */

/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -  */
/*  AES Counter-mode implementation in JavaScript (c) Chris Veness 2005-2009                      */
/*   - see http://csrc.nist.gov/publications/nistpubs/800-38a/sp800-38a.pdf                       */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -  */

Aes.Ctr = {};  // Aes.Ctr namespace: a subclass or extension of Aes

/** 
 * Encrypt a text using AES encryption in Counter mode of operation
 *
 * Unicode multi-byte character safe
 *
 * @param {String} plaintext Source text to be encrypted
 * @param {String} password  The password to use to generate a key
 * @param {Number} nBits     Number of bits to be used in the key (128, 192, or 256)
 * @returns {string}         Encrypted text
 */
Aes.Ctr.encrypt = function(plaintext, password, nBits) {
  var blockSize = 16;  // block size fixed at 16 bytes / 128 bits (Nb=4) for AES
  if (!(nBits==128 || nBits==192 || nBits==256)) return '';  // standard allows 128/192/256 bit keys
  plaintext = Utf8.encode(plaintext);
  password = Utf8.encode(password);
  //var t = new Date();  // timer
	
  // use AES itself to encrypt password to get cipher key (using plain password as source for key 
  // expansion) - gives us well encrypted key
  var nBytes = nBits/8;  // no bytes in key
  var pwBytes = new Array(nBytes);
  for (var i=0; i<nBytes; i++) {
    pwBytes[i] = isNaN(password.charCodeAt(i)) ? 0 : password.charCodeAt(i);
  }
  var key = Aes.cipher(pwBytes, Aes.keyExpansion(pwBytes));  // gives us 16-byte key
  key = key.concat(key.slice(0, nBytes-16));  // expand key to 16/24/32 bytes long

  // initialise counter block (NIST SP800-38A §B.2): millisecond time-stamp for nonce in 1st 8 bytes,
  // block counter in 2nd 8 bytes
  var counterBlock = new Array(blockSize);
  var nonce = (new Date()).getTime();  // timestamp: milliseconds since 1-Jan-1970
  var nonceSec = Math.floor(nonce/1000);
  var nonceMs = nonce%1000;
  // encode nonce with seconds in 1st 4 bytes, and (repeated) ms part filling 2nd 4 bytes
  for (var i=0; i<4; i++) counterBlock[i] = (nonceSec >>> i*8) & 0xff;
  for (var i=0; i<4; i++) counterBlock[i+4] = nonceMs & 0xff; 
  // and convert it to a string to go on the front of the ciphertext
  var ctrTxt = '';
  for (var i=0; i<8; i++) ctrTxt += String.fromCharCode(counterBlock[i]);

  // generate key schedule - an expansion of the key into distinct Key Rounds for each round
  var keySchedule = Aes.keyExpansion(key);
  
  var blockCount = Math.ceil(plaintext.length/blockSize);
  var ciphertxt = new Array(blockCount);  // ciphertext as array of strings
  
  for (var b=0; b<blockCount; b++) {
    // set counter (block #) in last 8 bytes of counter block (leaving nonce in 1st 8 bytes)
    // done in two stages for 32-bit ops: using two words allows us to go past 2^32 blocks (68GB)
    for (var c=0; c<4; c++) counterBlock[15-c] = (b >>> c*8) & 0xff;
    for (var c=0; c<4; c++) counterBlock[15-c-4] = (b/0x100000000 >>> c*8)

    var cipherCntr = Aes.cipher(counterBlock, keySchedule);  // -- encrypt counter block --
    
    // block size is reduced on final block
    var blockLength = b<blockCount-1 ? blockSize : (plaintext.length-1)%blockSize+1;
    var cipherChar = new Array(blockLength);
    
    for (var i=0; i<blockLength; i++) {  // -- xor plaintext with ciphered counter char-by-char --
      cipherChar[i] = cipherCntr[i] ^ plaintext.charCodeAt(b*blockSize+i);
      cipherChar[i] = String.fromCharCode(cipherChar[i]);
    }
    ciphertxt[b] = cipherChar.join(''); 
  }

  // Array.join is more efficient than repeated string concatenation in IE
  var ciphertext = ctrTxt + ciphertxt.join('');
  ciphertext = Base64.encode(ciphertext);  // encode in base64
  
  //alert((new Date()) - t);
  return ciphertext;
}

/** 
 * Decrypt a text encrypted by AES in counter mode of operation
 *
 * @param {String} ciphertext Source text to be encrypted
 * @param {String} password   The password to use to generate a key
 * @param {Number} nBits      Number of bits to be used in the key (128, 192, or 256)
 * @returns {String}          Decrypted text
 */
Aes.Ctr.decrypt = function(ciphertext, password, nBits) {
  var blockSize = 16;  // block size fixed at 16 bytes / 128 bits (Nb=4) for AES
  if (!(nBits==128 || nBits==192 || nBits==256)) return '';  // standard allows 128/192/256 bit keys
  ciphertext = Base64.decode(ciphertext);
  password = Utf8.encode(password);
  //var t = new Date();  // timer
  
  // use AES to encrypt password (mirroring encrypt routine)
  var nBytes = nBits/8;  // no bytes in key
  var pwBytes = new Array(nBytes);
  for (var i=0; i<nBytes; i++) {
    pwBytes[i] = isNaN(password.charCodeAt(i)) ? 0 : password.charCodeAt(i);
  }
  var key = Aes.cipher(pwBytes, Aes.keyExpansion(pwBytes));
  key = key.concat(key.slice(0, nBytes-16));  // expand key to 16/24/32 bytes long

  // recover nonce from 1st 8 bytes of ciphertext
  var counterBlock = new Array(8);
  ctrTxt = ciphertext.slice(0, 8);
  for (var i=0; i<8; i++) counterBlock[i] = ctrTxt.charCodeAt(i);
  
  // generate key schedule
  var keySchedule = Aes.keyExpansion(key);

  // separate ciphertext into blocks (skipping past initial 8 bytes)
  var nBlocks = Math.ceil((ciphertext.length-8) / blockSize);
  var ct = new Array(nBlocks);
  for (var b=0; b<nBlocks; b++) ct[b] = ciphertext.slice(8+b*blockSize, 8+b*blockSize+blockSize);
  ciphertext = ct;  // ciphertext is now array of block-length strings

  // plaintext will get generated block-by-block into array of block-length strings
  var plaintxt = new Array(ciphertext.length);

  for (var b=0; b<nBlocks; b++) {
    // set counter (block #) in last 8 bytes of counter block (leaving nonce in 1st 8 bytes)
    for (var c=0; c<4; c++) counterBlock[15-c] = ((b) >>> c*8) & 0xff;
    for (var c=0; c<4; c++) counterBlock[15-c-4] = (((b+1)/0x100000000-1) >>> c*8) & 0xff;

    var cipherCntr = Aes.cipher(counterBlock, keySchedule);  // encrypt counter block

    var plaintxtByte = new Array(ciphertext[b].length);
    for (var i=0; i<ciphertext[b].length; i++) {
      // -- xor plaintxt with ciphered counter byte-by-byte --
      plaintxtByte[i] = cipherCntr[i] ^ ciphertext[b].charCodeAt(i);
      plaintxtByte[i] = String.fromCharCode(plaintxtByte[i]);
    }
    plaintxt[b] = plaintxtByte.join('');
  }

  // join array of blocks into single plaintext string
  var plaintext = plaintxt.join('');
  plaintext = Utf8.decode(plaintext);  // decode from UTF8 back to Unicode multi-byte chars
  
  //alert((new Date()) - t);
  return plaintext;
}

/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -  */

/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -  */
/*  Utf8 class: encode / decode between multi-byte Unicode characters and UTF-8 multiple          */
/*              single-byte character encoding (c) Chris Veness 2002-2010                         */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -  */

/* changelog 
 * 2010-09-29: fixed decode order of operation to avoid falsely recognising decoded string as 3-byte 
 *             utf-8 charaacter
 */

var Utf8 = {};  // Utf8 namespace

/**
 * Encode multi-byte Unicode string into utf-8 multiple single-byte characters 
 * (BMP / basic multilingual plane only)
 *
 * Chars in range U+0080 - U+07FF are encoded in 2 chars, U+0800 - U+FFFF in 3 chars
 *
 * @param {String} strUni Unicode string to be encoded as UTF-8
 * @returns {String} encoded string
 */
Utf8.encode = function(strUni) {
  // use regular expressions & String.replace callback function for better efficiency 
  // than procedural approaches
  var strUtf = strUni.replace(
      /[\u0080-\u07ff]/g,  // U+0080 - U+07FF => 2 bytes 110yyyyy, 10zzzzzz
      function(c) { 
        var cc = c.charCodeAt(0);
        return String.fromCharCode(0xc0 | cc>>6, 0x80 | cc&0x3f); }
    );
  strUtf = strUtf.replace(
      /[\u0800-\uffff]/g,  // U+0800 - U+FFFF => 3 bytes 1110xxxx, 10yyyyyy, 10zzzzzz
      function(c) { 
        var cc = c.charCodeAt(0); 
        return String.fromCharCode(0xe0 | cc>>12, 0x80 | cc>>6&0x3F, 0x80 | cc&0x3f); }
    );
  return strUtf;
}

/**
 * Decode utf-8 encoded string back into multi-byte Unicode characters
 *
 * @param {String} strUtf UTF-8 string to be decoded back to Unicode
 * @returns {String} decoded string
 */
Utf8.decode = function(strUtf) {
  // note: decode 3-byte chars first as decoded 2-byte strings could appear to be 3-byte char!
  var strUni = strUtf.replace(
      /[\u00e0-\u00ef][\u0080-\u00bf][\u0080-\u00bf]/g,  // 3-byte chars
      function(c) {  // (note parentheses for precence)
        var cc = ((c.charCodeAt(0)&0x0f)<<12) | ((c.charCodeAt(1)&0x3f)<<6) | ( c.charCodeAt(2)&0x3f); 
        return String.fromCharCode(cc); }
    );
  strUni = strUni.replace(
      /[\u00c0-\u00df][\u0080-\u00bf]/g,                 // 2-byte chars
      function(c) {  // (note parentheses for precence)
        var cc = (c.charCodeAt(0)&0x1f)<<6 | c.charCodeAt(1)&0x3f;
        return String.fromCharCode(cc); }
    );
  return strUni;
}

/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -  */

/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -  */
/*  AES implementation in JavaScript (c) Chris Veness 2005-2010                                   */
/*   - see http://csrc.nist.gov/publications/PubsFIPS.html#197                                    */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -  */

var Aes = {};  // Aes namespace

/**
 * AES Cipher function: encrypt 'input' state with Rijndael algorithm
 *   applies Nr rounds (10/12/14) using key schedule w for 'add round key' stage
 *
 * @param {Number[]} input 16-byte (128-bit) input state array
 * @param {Number[][]} w   Key schedule as 2D byte-array (Nr+1 x Nb bytes)
 * @returns {Number[]}     Encrypted output state array
 */
Aes.cipher = function(input, w) {    // main Cipher function [§5.1]
  var Nb = 4;               // block size (in words): no of columns in state (fixed at 4 for AES)
  var Nr = w.length/Nb - 1; // no of rounds: 10/12/14 for 128/192/256-bit keys

  var state = [[],[],[],[]];  // initialise 4xNb byte-array 'state' with input [§3.4]
  for (var i=0; i<4*Nb; i++) state[i%4][Math.floor(i/4)] = input[i];

  state = Aes.addRoundKey(state, w, 0, Nb);

  for (var round=1; round<Nr; round++) {
    state = Aes.subBytes(state, Nb);
    state = Aes.shiftRows(state, Nb);
    state = Aes.mixColumns(state, Nb);
    state = Aes.addRoundKey(state, w, round, Nb);
  }

  state = Aes.subBytes(state, Nb);
  state = Aes.shiftRows(state, Nb);
  state = Aes.addRoundKey(state, w, Nr, Nb);

  var output = new Array(4*Nb);  // convert state to 1-d array before returning [§3.4]
  for (var i=0; i<4*Nb; i++) output[i] = state[i%4][Math.floor(i/4)];
  return output;
}

/**
 * Perform Key Expansion to generate a Key Schedule
 *
 * @param {Number[]} key Key as 16/24/32-byte array
 * @returns {Number[][]} Expanded key schedule as 2D byte-array (Nr+1 x Nb bytes)
 */
Aes.keyExpansion = function(key) {  // generate Key Schedule (byte-array Nr+1 x Nb) from Key [§5.2]
  var Nb = 4;            // block size (in words): no of columns in state (fixed at 4 for AES)
  var Nk = key.length/4  // key length (in words): 4/6/8 for 128/192/256-bit keys
  var Nr = Nk + 6;       // no of rounds: 10/12/14 for 128/192/256-bit keys

  var w = new Array(Nb*(Nr+1));
  var temp = new Array(4);

  for (var i=0; i<Nk; i++) {
    var r = [key[4*i], key[4*i+1], key[4*i+2], key[4*i+3]];
    w[i] = r;
  }

  for (var i=Nk; i<(Nb*(Nr+1)); i++) {
    w[i] = new Array(4);
    for (var t=0; t<4; t++) temp[t] = w[i-1][t];
    if (i % Nk == 0) {
      temp = Aes.subWord(Aes.rotWord(temp));
      for (var t=0; t<4; t++) temp[t] ^= Aes.rCon[i/Nk][t];
    } else if (Nk > 6 && i%Nk == 4) {
      temp = Aes.subWord(temp);
    }
    for (var t=0; t<4; t++) w[i][t] = w[i-Nk][t] ^ temp[t];
  }

  return w;
}

/*
 * ---- remaining routines are private, not called externally ----
 */
 
Aes.subBytes = function(s, Nb) {    // apply SBox to state S [§5.1.1]
  for (var r=0; r<4; r++) {
    for (var c=0; c<Nb; c++) s[r][c] = Aes.sBox[s[r][c]];
  }
  return s;
}

Aes.shiftRows = function(s, Nb) {    // shift row r of state S left by r bytes [§5.1.2]
  var t = new Array(4);
  for (var r=1; r<4; r++) {
    for (var c=0; c<4; c++) t[c] = s[r][(c+r)%Nb];  // shift into temp copy
    for (var c=0; c<4; c++) s[r][c] = t[c];         // and copy back
  }          // note that this will work for Nb=4,5,6, but not 7,8 (always 4 for AES):
  return s;  // see asmaes.sourceforge.net/rijndael/rijndaelImplementation.pdf
}

Aes.mixColumns = function(s, Nb) {   // combine bytes of each col of state S [§5.1.3]
  for (var c=0; c<4; c++) {
    var a = new Array(4);  // 'a' is a copy of the current column from 's'
    var b = new Array(4);  // 'b' is a•{02} in GF(2^8)
    for (var i=0; i<4; i++) {
      a[i] = s[i][c];
      b[i] = s[i][c]&0x80 ? s[i][c]<<1 ^ 0x011b : s[i][c]<<1;
    }
    // a[n] ^ b[n] is a•{03} in GF(2^8)
    s[0][c] = b[0] ^ a[1] ^ b[1] ^ a[2] ^ a[3]; // 2*a0 + 3*a1 + a2 + a3
    s[1][c] = a[0] ^ b[1] ^ a[2] ^ b[2] ^ a[3]; // a0 * 2*a1 + 3*a2 + a3
    s[2][c] = a[0] ^ a[1] ^ b[2] ^ a[3] ^ b[3]; // a0 + a1 + 2*a2 + 3*a3
    s[3][c] = a[0] ^ b[0] ^ a[1] ^ a[2] ^ b[3]; // 3*a0 + a1 + a2 + 2*a3
  }
  return s;
}

Aes.addRoundKey = function(state, w, rnd, Nb) {  // xor Round Key into state S [§5.1.4]
  for (var r=0; r<4; r++) {
    for (var c=0; c<Nb; c++) state[r][c] ^= w[rnd*4+c][r];
  }
  return state;
}

Aes.subWord = function(w) {    // apply SBox to 4-byte word w
  for (var i=0; i<4; i++) w[i] = Aes.sBox[w[i]];
  return w;
}

Aes.rotWord = function(w) {    // rotate 4-byte word w left by one byte
  var tmp = w[0];
  for (var i=0; i<3; i++) w[i] = w[i+1];
  w[3] = tmp;
  return w;
}

// sBox is pre-computed multiplicative inverse in GF(2^8) used in subBytes and keyExpansion [§5.1.1]
Aes.sBox =  [0x63,0x7c,0x77,0x7b,0xf2,0x6b,0x6f,0xc5,0x30,0x01,0x67,0x2b,0xfe,0xd7,0xab,0x76,
             0xca,0x82,0xc9,0x7d,0xfa,0x59,0x47,0xf0,0xad,0xd4,0xa2,0xaf,0x9c,0xa4,0x72,0xc0,
             0xb7,0xfd,0x93,0x26,0x36,0x3f,0xf7,0xcc,0x34,0xa5,0xe5,0xf1,0x71,0xd8,0x31,0x15,
             0x04,0xc7,0x23,0xc3,0x18,0x96,0x05,0x9a,0x07,0x12,0x80,0xe2,0xeb,0x27,0xb2,0x75,
             0x09,0x83,0x2c,0x1a,0x1b,0x6e,0x5a,0xa0,0x52,0x3b,0xd6,0xb3,0x29,0xe3,0x2f,0x84,
             0x53,0xd1,0x00,0xed,0x20,0xfc,0xb1,0x5b,0x6a,0xcb,0xbe,0x39,0x4a,0x4c,0x58,0xcf,
             0xd0,0xef,0xaa,0xfb,0x43,0x4d,0x33,0x85,0x45,0xf9,0x02,0x7f,0x50,0x3c,0x9f,0xa8,
             0x51,0xa3,0x40,0x8f,0x92,0x9d,0x38,0xf5,0xbc,0xb6,0xda,0x21,0x10,0xff,0xf3,0xd2,
             0xcd,0x0c,0x13,0xec,0x5f,0x97,0x44,0x17,0xc4,0xa7,0x7e,0x3d,0x64,0x5d,0x19,0x73,
             0x60,0x81,0x4f,0xdc,0x22,0x2a,0x90,0x88,0x46,0xee,0xb8,0x14,0xde,0x5e,0x0b,0xdb,
             0xe0,0x32,0x3a,0x0a,0x49,0x06,0x24,0x5c,0xc2,0xd3,0xac,0x62,0x91,0x95,0xe4,0x79,
             0xe7,0xc8,0x37,0x6d,0x8d,0xd5,0x4e,0xa9,0x6c,0x56,0xf4,0xea,0x65,0x7a,0xae,0x08,
             0xba,0x78,0x25,0x2e,0x1c,0xa6,0xb4,0xc6,0xe8,0xdd,0x74,0x1f,0x4b,0xbd,0x8b,0x8a,
             0x70,0x3e,0xb5,0x66,0x48,0x03,0xf6,0x0e,0x61,0x35,0x57,0xb9,0x86,0xc1,0x1d,0x9e,
             0xe1,0xf8,0x98,0x11,0x69,0xd9,0x8e,0x94,0x9b,0x1e,0x87,0xe9,0xce,0x55,0x28,0xdf,
             0x8c,0xa1,0x89,0x0d,0xbf,0xe6,0x42,0x68,0x41,0x99,0x2d,0x0f,0xb0,0x54,0xbb,0x16];

// rCon is Round Constant used for the Key Expansion [1st col is 2^(r-1) in GF(2^8)] [§5.2]
Aes.rCon = [ [0x00, 0x00, 0x00, 0x00],
             [0x01, 0x00, 0x00, 0x00],
             [0x02, 0x00, 0x00, 0x00],
             [0x04, 0x00, 0x00, 0x00],
             [0x08, 0x00, 0x00, 0x00],
             [0x10, 0x00, 0x00, 0x00],
             [0x20, 0x00, 0x00, 0x00],
             [0x40, 0x00, 0x00, 0x00],
             [0x80, 0x00, 0x00, 0x00],
             [0x1b, 0x00, 0x00, 0x00],
             [0x36, 0x00, 0x00, 0x00] ]; 

/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -  */

















//initialize jQTouch and keep it in a var for future references
var baseURL = 'http://www.mistay.net/';
var ajaxURL = 'http://www.mistay.net/ajax_dev/';

localStorage.clear();   
var myFav = []; 
var jQT=$.jQTouch({ 
	cacheGetRequests: false,
	addGlossToIcon	: false
}); 
function checkNetwok(){
navigator.network.isReachable("phonegap.com", reachableCallback, {});
}
function preventBehavior(e) {e.preventDefault(); };
	 function onLoad() {
	  // document.addEventListener("touchmove", preventBehavior, false);
	   document.addEventListener("deviceready", onDeviceReady, false);
    }
	function onDeviceReady() {
     navigator.network.isReachable("phonegap.com", reachableCallback, {});
    }

    // Check network status
    //
    function reachableCallback(reachability) {
        // There is no consistency on the format of reachability
	    var networkState = reachability.code || reachability;

        var states = {};
        states[NetworkStatus.NOT_REACHABLE]                      = 'No network connection';
        states[NetworkStatus.REACHABLE_VIA_CARRIER_DATA_NETWORK] = 'Carrier data connection';
        states[NetworkStatus.REACHABLE_VIA_WIFI_NETWORK]         = 'WiFi connection';
		if(states[networkState] == 'No network connection'){
			alert("You are not connected to Internet.");
		}      
    }
$(document).ready(function(){	
	new iScroll('scroller');
	new iScroll('scrollerDesc');
	initialize();	
 	document.addEventListener("deviceready", callTrack, false);
	$('.noThanks').click( function(){
    	$('.mainDiv').css('opacity','1.0');
	    $('.lightDiv').toggle(); 
    });
	$('#noThanksDesc').click( function(){
	   $('#mainDivDesc').css('opacity','1.0');
	   $('#lightDivDesc').toggle(); 
    });
	$('#noThanksGeo').click( function(){
	   $('#mainDivGeo').css('opacity','1.0');
	   $('#lightDivGeo').toggle(); 
    });	
	$('#feedCancel').click( function(){
		jQT.goTo('#hotelListScreen','slide');	 
    });
	
	$('#feedDone').click( function(){	
		var resAns = $('input:radio[name=res]:checked').val();
		var ques2Ans = $('input:radio[name=satisfy]:checked').val();
		var reasonAns=$('#ques1').val();
		var ques3Ans=$('#ans3').val();
		if(resAns == undefined){
			alert('Please select any answer');
			return false;
		}
		if(resAns == 'N'){
			if(reasonAns == 0){
				alert('Please provide any reason.')
				return false;
			}
		}if(resAns == 'Y') {
			if(ques2Ans == undefined){
				alert('Please provide your satisfaction.')
				return false;
			}
			if(ques3Ans == ''){
				alert('Please provide your suggestion.')
				return false;
			}
		}
		$.ajax({
			type:"POST",
			url:ajaxURL+"getfeedback.php",
			data: 'resAns='+resAns+'&ques2Ans='+ques2Ans+'&reasonAns='+reasonAns+'&ques3Ans='+ques3Ans,
			beforeSend: function(){
							$.blockUI({ message: null }); 
		  					$('#ajaxLoader').show();
						},						
				complete: function(){
						 $.unblockUI();
						 $('#ajaxLoader').hide();
						},
			success:function(data){
				if(data == 1){
					alert('Thanks for your feedback!')
					jQT.goTo('#searchScreen','slide'); }	 
	     		  }
		       });  
    		});	
		var $homeLoader = $('#home').find('.homeLoader');
		$homeLoader.show();	
		$('#loaderTitle').show();	
	
		// Ajax function for get list of city name			
		$('#city').bind('click', function() {
		setAutoComplete("city", "results", ajaxURL+"autocomplete.php");
	});	

	$('#emailFrom').bind('click', function() {
		setAutoContact("emailFrom", "listFrom","contactFromList");
	});	
	$('#emailCc').bind('click', function() {
		setAutoContact("emailCc", "listCc","contactCcList");
	});						
		$("#aboutButton").click(function() {	
			$('#city').val('');
		 	$.blockUI({ 
            	message: null, 
            	timeout: 100 
       	 	});
			jQT.goTo('#aboutus','slide');
			return false; 	
		});
	
	$(".hotelDesc").click(function(){   // GET HOTEL DESCRIPTIOMN BY PHONE ID 
		var phone = $('#phoneId').val();
		$('#testNew').empty();
		$.ajax({
			type:"POST",
			url:ajaxURL+"getHotelDesc.php",
			dataType:"json",
			data: 'phone='+phone,
			beforeSend: function(){
							$.blockUI({ message: null }); 
		  					$('#ajaxLoader').show();
							checkNetwok();
							
						},						
			complete: function(){
						 $.unblockUI();
						 $('#ajaxLoader').hide();
						},
			success:function(json){
				if(json != null){
					var countRecord = json.length;
					if(countRecord > 0){
											
						for(var i = 0; i < countRecord; ++i){
							try{
								var name 	= json[i].name;
								var icon	= json[i].icon;						
								var address = json[i].address;
								var newPhone = json[i].newPhone;
								var description = json[i].description;
								var amenties = json[i].amenties;
							}catch(e){
								name = '';
								icon = '';
								address = '';
								newPhone ='';
								description ='';
								amenties ='';
							}
               			 	if(name == undefined)
                    			name = '';
						 	if(icon == undefined)
                    			icon = '';
						 	if(address == undefined)
                    			address = '';
							if(description == undefined)
                    			description = '';	
							if(amenties == undefined)
                    			amenties = '';	
								
							if(description == ''){
								navigator.notification.alert('No Hotel Info Found.','','Info','Ok');
								return false;
							}
							var iconImage = '<img src="'+baseURL+icon+'" width="124px" height="95px" border="0" />';
     						var nameHotel = '<table style="padding-left:19px;" border="0"><tr><td align="left"  valign="top"><span style="font-size:19px;font-weight:bold;">'+name+'</span>&nbsp;<img id="favourite" onBlur ="favStar('+phone+');" onClick="favStar('+phone+');" src="themes/mistay/img/star_i.png" border="0"><input type="hidden" name="star" id="star" value="0"/></td></tr><tr><td valign="bottom" align="left">'+address+'</td></tr><tr><td colspan="2"><div class="infoPhoneDesc"><a  href="tel://'+phone+'" rel="external" onClick="callInfoDesc();callTrack('+phone+');">Call '+newPhone+'</a></div></td></tr></table>';
											
							$('#phoneId').val(phone);
							
							var data ='<div style="background:url(themes/mistay/img/th-bg.png) no-repeat;height:124px;"><div style="float:left" id="iconHotelDesc">'+iconImage+'</div><div id="nameHotelDesc">'+nameHotel+'</div></div><div style="padding-top:12px;"><table width="300" border="0" cellpadding="0" cellspacing="0"><tr><td width="9" align="left"><img src="themes/mistay/img/box-t-l-c.png" width="17" height="16" /></td><td background="themes/mistay/img/box-t-c-c.png"></td><td width="8" align="right"><img src="themes/mistay/img/box-t-r-c.png" width="17" height="16" /></td></tr><tr><td align="left" background="themes/mistay/img/box-m-l-line.png">&nbsp;</td><td bgcolor="#FEFEFC"><div id="hotelDesccription"><strong>Nearby Restaurants/Attractions</strong><br>';
							for(var k = 0; k < 3; ++k){
								
								if(json[i].description[k] !=undefined ){
								data +='<li style="list-style-image:url(themes/mistay/img/icon-small.png)">'+json[i].description[k]+'</li>';
								//$('#testNew').append(descHotel);
							
								}
								
							}
							for(var k = 3; k < 5; ++k){
								
								if(json[i].description[k] !=undefined ){
									data +='<li class="descInfo" style="list-style-image:url(themes/mistay/img/icon-small.png);display:none">'+json[i].description[k]+'</li>';
								
								
								}
								
							}
							if(json[i].description.length > 3 )
							data +='<a onClick="moreDescInfo();" href="javascript:void(0);" style="text-decoration:underline;color:#FF0000" >more info...</a></div><div style="background:url(themes/mistay/img/line.png) repeat-x;margin:10px 0px 0px 0px;">&nbsp;</div>';
							
							data +='<div id="hotelAmmenties">';
							if(amenties !=''){
								data +='<strong>Hotel Ammenties</strong><br>';
								for(var k = 0; k < 3; ++k){
									if(json[i].amenties[k] !=undefined ){
										data +='<li style="list-style-image:url(themes/mistay/img/icon-small.png)">'+json[i].amenties[k]+'</li>';
									
									}
								}
								for(var k = 3; k < 5; ++k){
								
									if(json[i].amenties[k] !=undefined ){
										data +='<li class="ammentInfo" style="list-style-image:url(themes/mistay/img/icon-small.png);display:none;">'+json[i].description[k]+'</li>';
										//$('#testNew').append(amentHotel);
									}
								
								}
								if(json[i].amenties.length > 3 )
							data +='<a onClick="moreAmmentInfo();" href="javascript:void(0);" style="text-decoration:underline;color:#FF0000" >more info...</a><div>';
								
							} // END IF							
							data +='</td><td align="right" background="themes/mistay/img/box-m-r-line.png">&nbsp;</td></tr><tr><td align="left" valign="bottom"><img src="themes/mistay/img/box-b-l-c.png" width="17" height="19" /></td><td><img src="themes/mistay/img/box-b-m--bg.png" width="100%" height="19" /></td><td align="right" valign="bottom" ><img src="themes/mistay/img/box-b-r-c.png" width="17" height="19" /></td></tr></table></div>';					
							
						} // END OF FOR LOOP
						$('#testNew').append(data);
						
					} // END count record 
				} // END check null
				jQT.goTo('#hotelDescScreen','slide'); 
				return false; 			 
			}
		});
		return false;	
	});		
		}); // END OF FUNCTION 
	
	function moreDescInfo(){
	$('.descInfo').toggle();

}
 
function moreAmmentInfo(){
	$('.ammentInfo').toggle();

}
 
		
function returnHome(){
	var $homeLoader = $('#home').find('.homeLoader');
	$('#loaderTitle').hide();				
	$homeLoader.hide();
	$('.headerLogo').show();	
	jQT.goTo('#home','slide');
	return false; 	
} // END OF returnHome

function dothingswithsleep(){
	jQT.goTo('#searchScreen','slide');
	 $.blockUI({ 
            message: null, 
            timeout: 100 
	  });
	return false; 	
} // END OF dothingswithsleep

function favStar(phone){	
	var star	=	$('#star').val();
	if(star == 0){
		myFav.push(phone);
		localStorage.setItem("arrayStar",JSON.stringify(myFav));
		document.getElementById('star').value=1;
		document.getElementById('favourite').src='themes/mistay/img/star.png';
	}else{
		myFav.removeByValue(phone);		
		localStorage.setItem("arrayStar",JSON.stringify(myFav));
		document.getElementById('star').value=0;
		document.getElementById('favourite').src='themes/mistay/img/star_i.png';	
	}
} // END OF favStar

function favStarDetail(phone){	
	var star	=	$('#starDetail').val();
	if(star == 0){
		myFav.push(phone);
		localStorage.setItem("arrayStar",JSON.stringify(myFav));
		document.getElementById('starDetail').value=1;
		document.getElementById('favDetail').src='themes/mistay/img/star.png';
	}else{
		myFav.removeByValue(phone);		
		localStorage.setItem("arrayStar",JSON.stringify(myFav));
		document.getElementById('starDetail').value=0;
		document.getElementById('favDetail').src='themes/mistay/img/star_i.png';	
	}
} // END OF favStarDetail

Array.prototype.removeByValue = function(val) {
    for(var i=0; i<this.length; i++) {
        if(this[i] == val) {
            this.splice(i, 1);
            break;
        }
    }
}

function storeFavourites(){	
	var favHotel = localStorage.getItem("arrayStar");
	if(favHotel == null){
		alert('No Hotel in your Favorites');
		return false; 	
	}else{	
		favHotel = JSON.parse(favHotel);
		$('#FavData').empty();
		var lat = sessionStorage.getItem('searchLat');
		var lng  = sessionStorage.getItem('searchLng');	
		$.ajax({
			type:"POST",
			url:ajaxURL+"getHotelFavorites.php",
			dataType:"json",
			beforeSend: function(){
							$.blockUI({ message: null }); 
		  					$('#ajaxLoader').show();
						},						
				complete: function(){
						 $.unblockUI();
						 $('#ajaxLoader').hide();
						},					
			data: 'favHotel='+favHotel+'&lat='+lat+'&lng='+lng,
			success:function(json){
				if(json != null){
					 var countRecord = json.length;
					 var textColour = 'listGreen';	
					 if(countRecord > 0 ){
					 for(var i = 0; i < countRecord; ++i){
						try{
                    		var phone 		= json[i].phone;
							var distance	= json[i].distance;
							var rates 		= json[i].rates;
							var icon 		= json[i].icon;
							var smoke 		= json[i].smoke;
							var pet 		= json[i].pet;
							var ext 		= json[i].ext;
							var int 		= json[i].int;
						}catch(e){
                    		phone = '';
							name = '';
							distance = '';
							rates = '';
							icon = '';
							smoke = 0;
							pet = 0;
							ext = 0;
							int = 0;
						}
               			 if(phone == undefined)
                    		phone = '';
						 if(name == undefined)
                    		name = '';
						 if(distance == undefined)
                    		distance = '';
						 if(rates == undefined)
                    		rates = '';
						 if(icon == undefined)
                    		icon = '';
						 if(smoke == undefined)
                    		smoke = 0;
						 if(pet == undefined)
                    		pet = 0;
						 if(ext == undefined)
                    		ext = 0;
						 if(int == undefined)
                    		int = 0;
							
							var num = new Number(distance);
							var miles = num.toFixed(2);
							
							var num = new Number(rates);
							var numRate = num.toFixed(2);	
							
							if(smoke == 1){
								var iconSmoke='<img src="themes/mistay/img/images/sm-icon-s.png" border="0" />';																												                            }else{
								var iconSmoke='';
							}
							if(pet == 1){
								var iconPet='<img src="themes/mistay/img/images/animal-icon-s.png" border="0" />';							                            }else
							{
								var iconPet='';
							}
							if(ext == 1){
								var iconExt='<img src="themes/mistay/img/images/out-icon-s.png" border="0" />';	
							}else
							{
								var iconExt='';
							}
							if(int == 1){
								var iconInt='<img src="themes/mistay/img/images/in-icon-s.png" border="0" />';	
							}else
							{
								var iconInt='';
							}
														
								   var data = '<li class="arrow"><a href="javascript:void(0)" onClick=hotelDetails('+phone+')><table width="100%"><tr><td width="25%" rowspan="2"><div style="background:url(themes/mistay/img/hotel--bg.png) no-repeat;height:47px;"><img src="'+baseURL+'brandIcon/'+icon+'" height="35"  width="35" style="margin:0px 0px 0px 10px" border="0"  /></div></td><td class="'+textColour+'"  width="40%">'+miles+' miles</td><td class="'+textColour+'"  width="25%">$'+numRate+'</td></tr><tr><td align="left" colspan="2">'+iconSmoke+iconPet+iconExt+iconInt+'</td></tr></table></a></li>';
								
							$('#FavData').append(data);
						} // for loop
						jQT.goTo('#hotelFavScreen','slide');
						return false; 	 	
					  } // Count record
				   } // check null
			   }
		 });
	}
} // END OF  storeFavourites

function searchList(){		
			$('#test').empty();
			var city 		=	$('#city').val();
			var zipcode 	=	$('#zipcode').val();
			var distance 	=	$('#distance').val();
			var filterValue = [];
	$('#filter :selected').each(function(i, selected) {
    	filterValue[i] = $(selected).val();
	});	
	var element = String(filterValue).split(","); 
	for(var i=0;i<element.length;i++){
		if(element[i]== 'smoke')
		var smoke='1';
		if(element[i]== 'pet')
		var pet='1';
		if(element[i]== 'int')
		var int='1';
		if(element[i]== 'ext')
		var ext='1';
	}
	 if(smoke == undefined)
		smoke = '';
	 if(pet == undefined)
		pet = '';
	 if(int == undefined)
		int = '';
 	 if(ext == undefined)
		ext = '';
			var lat,lng;
			
			sessionStorage.setItem('city',city );      // defining the session variable for city 
			sessionStorage.setItem('zipcode',zipcode); // defining the session variable for zipcode 
			
			var getCity = sessionStorage.getItem('city');
			var getZip  = sessionStorage.getItem('zipcode');
			var getLat  = sessionStorage.getItem('lat');
			var getLng  = sessionStorage.getItem('lng');
			
			if(getCity == 'Enter City' && getZip == 'Enter Zipcode'){
				alert('Please select atleast one search criteria.');
				return false;
			}
			if(getZip != '' && (getCity == '' || getCity == 'Enter City') ){
				$.blockUI({ message: null }); 
		  		$('#ajaxLoader').show();
				var geocoder = new google.maps.Geocoder();
				geocoder.geocode({address: getZip}, function(results, status) {
				
				if (status == google.maps.GeocoderStatus.OK) {
					lat =results[0].geometry.location.lat();
			 		lng =results[0].geometry.location.lng();
					sessionStorage.setItem('searchLat',lat ); 
					sessionStorage.setItem('searchLng',lng ); 
					$.ajax({
						type:"POST",
						url:ajaxURL+"getSearchResult.php",
						dataType:"json",
						beforeSend: function(){
							$.blockUI({ message: null }); 
		  					$('#ajaxLoader').show();
						},						
						complete: function(){
						 	$.unblockUI();
						 	$('#ajaxLoader').hide();
						},
						data: 'distance='+distance+'&orderBy=asc&'+'smoke='+smoke+'&pet='+pet+'&ext='+ext+'&int='+int+'&lat='+lat+'&lng='+lng,
						success:function(json){	
							if(json != null){
			 					var countRecord = json.length;
			 					if(countRecord > 0 && json !=null){
									for(var i = 0; i < countRecord; ++i)
									{
									 if(i < 3){
											var textColour = 'listGreen';	
										}else{
											var textColour = 'listYellow';	
										}
										try{
											var phone 		= json[i].phone;
											var distance	= json[i].distance;
											var rates 		= json[i].rates;
											var icon 		= json[i].icon;
											var smoke 		= json[i].smoke;
											var pet 		= json[i].pet;
											var ext 		= json[i].ext;
											var int 		= json[i].int;						
											}catch(e){
												phone = '';
												name = '';
												distance = '';
												rates = '';
												icon = '';
												smoke = 0;
												pet = 0;
												ext = 0;
												int = 0;								
										       }
											 	if(phone == undefined)
													phone = '';
											 	if(name == undefined)
													name = '';
											 	if(distance == undefined)
													distance = '';
											 	if(rates == undefined)
													rates = '';
												if(icon == undefined)
													icon = '';
												if(smoke == undefined)
													smoke = 0;
												if(pet == undefined)
													pet = 0;
												if(ext == undefined)
													ext = 0;
												if(int == undefined)
													int = 0;
												var num = new Number(distance);
												var miles = num.toFixed(2);	
												
												var num = new Number(rates);
												var numRate = num.toFixed(2);											
												if(smoke == 1){
												var iconSmoke='<img src="themes/mistay/img/images/sm-icon-s.png" border="0"/>';																												                             					}else{
												var iconSmoke = '';
												}
												if(pet == 1){
												var iconPet='<img src="themes/mistay/img/images/animal-icon-s.png" border="0" />';							                                                }else{
												var iconPet = '';
												}
												if(ext == 1){
												var iconExt='<img src="themes/mistay/img/images/out-icon-s.png" border="0" />';	
												}else{
												var iconExt = '';
												}
												if(int == 1){
												var iconInt='<img src="themes/mistay/img/images/in-icon-s.png" border="0" />';	
												}else{
												var iconInt = '';
												}
										var data = '<li class="arrow"><a onClick=hotelDetails('+phone+')><table width="100%"><tr><td width="25%" rowspan="2"><div style="background:url(themes/mistay/img/hotel--bg.png) no-repeat;height:47px;"><img src="'+baseURL+'brandIcon/'+icon+'" height="38"  width="40" style="margin:0px 0px 0px 10px" border="0"  /></div></td><td class="'+textColour+'"  width="40%">'+miles+' miles</td><td class="'+textColour+'"  width="25%">$'+numRate+'</td></tr><tr><td align="left" colspan="2">'+iconSmoke+iconPet+iconExt+iconInt+'</td></tr></table></a></li>';																		
				   				$('#test').append(data);
								}
								
							 }
			 				else{
								alert('There is no Hotel in search criteria,please try again!');
								$('#zipcode').val('');
								window.localStorage.removeItem("getZip");
								return false;
							 	} 
							}
			 				else{	
								alert('There is no Hotel in search criteria,please try again!');
								window.localStorage.removeItem("getZip");
								$('#zipcode').val('');
								return false;
			 				}
							jQT.goTo('#hotelListScreen','slide'); 
							return false; 		
			 			}
					 });
					} else {
						 $.unblockUI();
						 $('#ajaxLoader').hide();
						alert(zipcode + ' not found');
						return false;
					}
			 	});	 
			}
			else if(getCity != '' || getCity != 'Enter City') {
					if (getCity.match(/^[a-zA-Z, ]+$/)){ 
					$.blockUI({ message: null }); 
		  	$('#ajaxLoader').show();					
	  	 		var geocoder = new google.maps.Geocoder();
     			geocoder.geocode({address: getCity}, function(results, status) {
      			if (status == google.maps.GeocoderStatus.OK) {		
       			var center = results[0].geometry.location;
	   				lat =center.lat();
					lng =center.lng();
					sessionStorage.setItem('searchLat',lat ); 
		   			sessionStorage.setItem('searchLng',lng ); 
					$.ajax({
						type:"POST",
						url:ajaxURL+"getSearchResult.php",
						dataType:"json",
						beforeSend: function(){
							$.blockUI({ message: null }); 
		  					$('#ajaxLoader').show();
						},						
				complete: function(){
						 $.unblockUI();
						 $('#ajaxLoader').hide();
						},
						data: 'distance='+distance+'&orderBy=asc&'+'smoke='+smoke+'&pet='+pet+'&ext='+ext+'&int='+int+'&lat='+lat+'&lng='+lng,
						success:function(json){			
							if(json != null){
			 					var countRecord = json.length;
			 					if(countRecord > 0 && json !=null){
									for(var i = 0; i < countRecord; ++i){
										if(i < 3){
											var textColour = 'listGreen';	
										}else{
											var textColour = 'listYellow';	
										}				
										try{
											var phone 		= json[i].phone;
											var distance	= json[i].distance;
											var rates 		= json[i].rates;
											var icon 		= json[i].icon;
											var smoke 		= json[i].smoke;
											var pet 		= json[i].pet;
											var ext 		= json[i].ext;
											var int 		= json[i].int;									
										}catch(e){
											phone = '';
											name = '';
											distance = '';
											rates = '';
											icon = '';
											smoke = 0;
											pet = 0;
											ext = 0;
											int = 0;					
										}
										if(phone == undefined)
											phone = '';
										if(name == undefined)
											name = '';
										if(distance == undefined)
											distance = '';
										if(rates == undefined)
											rates = '';
										if(icon == undefined)
											icon = '';
										if(smoke == undefined)
											smoke = 0;
										if(pet == undefined)
											pet = 0;
										if(ext == undefined)
											ext = 0;
										if(int == undefined)
											int = 0;					
									var num = new Number(distance);
									var miles = num.toFixed(2);					
									var num = new Number(rates);
									var numRate = num.toFixed(2);		
					
									if(smoke == 1){
										var iconSmoke='<img src="themes/mistay/img/images/sm-icon-s.png" border="0" />';																												                             		}else{
										var iconSmoke='';
										}
									if(pet == 1)
									{
										var iconPet='<img src="themes/mistay/img/images/animal-icon-s.png" border="0" />';							                            		}else{
									var iconPet='';
									}									
									if(ext == 1){
										var iconExt='<img src="themes/mistay/img/images/out-icon-s.png" border="0" />';	
									}else{
										var iconExt='';
									}if(int == 1){
										var iconInt='<img src="themes/mistay/img/images/in-icon-s.png" border="0" />';	
									}else{
										var iconInt='';
									}
																			
					var data = '<li class="arrow"><a href="javascript:void(0)" onClick=hotelDetails('+phone+')><table width="100%"><tr><td width="25%" rowspan="2"><div style="background:url(themes/mistay/img/hotel--bg.png) no-repeat;height:47px;"><img src="'+baseURL+'brandIcon/'+icon+'" height="35"  width="35" style="margin:0px 0px 0px 10px" border="0"  /></div></td><td class="'+textColour+'"  width="40%">'+miles+' miles</td><td class="'+textColour+'"  width="25%">$'+numRate+'</td></tr><tr><td align="left" colspan="2">'+iconSmoke+iconPet+iconExt+iconInt+'</td></tr></table></a></li>';
					 $('#test').append(data);
				
				}
			 } else{
				window.localStorage.removeItem("getCity");
				$('#city').val('');
				alert('There is no Hotel in search criteria,please try again!');
				return false;
			 	}		 
			 }else{
				window.localStorage.removeItem("getCity");
				$('#city').val('');
				alert('There is no Hotel in search criteria,please try again!');
				return false;
			 }			 
				jQT.goTo('#hotelListScreen','slide');
				return false; 	 	
			 }			 	
		   });	   
       } else {
          $.unblockUI();
		 $('#ajaxLoader').hide();
		 alert(getCity + ' not found');
		 $('#city').val('');
		 return false; 	
       }
     });	
	 		} else {
				alert('Invalid city name.');
				$('#city').val('');
				return false;
			}
   }
} // END OF  searchList
function hotelDetails( phone ){
		if(phone == '')	{
			var phone = $('#phoneId').val();
		}
			$('#roomHotel').empty();
			$('#iconHotel').empty();
			$('#nameHotel').empty();
			$('#infoPhone').empty();			
			$.ajax({
        		type:"POST",
				url:ajaxURL+"getHotelDetails.php",
				dataType:"json",
        		data: 'phone='+phone,
				beforeSend: function(){
							$.blockUI({ message: null }); 
		  					$('#ajaxLoader').show();
						},						
				complete: function(){
						 $.unblockUI();
						 $('#ajaxLoader').hide();
						},
        		success:function(json){
					if(json != null){
					 var countRecord = json.length;
					 if(countRecord > 0) {
           			 	for(var i = 0; i < countRecord; ++i){
							try{
                    		var name 	= json[i].name;
							var icon	= json[i].icon;
							var rate 	= json[i].rate;
							var type 	= json[i].type;
							var address = json[i].address;
							var newPhone = json[i].newPhone;
							}catch(e){
                    		name = '';
							icon = '';
							rate = '';
							type = '';
							address = '';
							newPhone ='';
							}
               			 	if(name == undefined)
                    		name = '';
						 	if(icon == undefined)
                    		icon = '';
						 	if(rate == undefined)
                    		rate = '';
						 	if(type == undefined)
                    		type = '';
						 	if(address == undefined)
                    		address = '';
							if(newPhone == undefined)
                    		newPhone = '';
							
							var num = new Number(rate);
							var numRate = num.toFixed(2);
							var nameHotel = '<tr><td width="210" align="left" valign="top">'+type+' Beds Room</td><td valign="top" align="left">$'+numRate+'</td></tr>';
						   $('#roomHotel').append(nameHotel);
						}// for loop
						var iconImage = '<img src="'+baseURL+icon+'" width="124px" height="95px" border="0" />';
						$('#iconHotel').append(iconImage);
						var nameHotel = '<table style="padding-left:20px;" border="0"><tr><td align="left"  valign="top"><span style="font-size:19px;font-weight:bold;">'+name+'</span>&nbsp;<img id="favDetail" onClick="favStarDetail('+phone+');" src="themes/mistay/img/star_i.png" border="0"><input type="hidden" name="star" id="starDetail" value="0"/></td></tr><tr><td valign="bottom" align="left">'+address+'</td></tr></table>';
						$('#nameHotel').append(nameHotel);						
						$('#phoneId').val(phone);
						$('#infoPhone').append('<a onClick="callInfo();callTrack('+phone+');" href="tel://'+phone+'">Call '+newPhone+'</a>');
						
					   } // count record 
				    } // check null
					jQT.goTo('#hotelDetailScreen','slide');
					return false; 		 
	     		  }
		       });	
       	}	// END OF  hotelDetails	
		
function sortResult(orderName){	
	$('#test').empty();		
	if(orderName == 'distance'){
		document.getElementById('distanceImg').src='themes/mistay/img/Distance-on .png';
		document.getElementById('priceImg').src='themes/mistay/img/Price-off.png';
		document.getElementById('nameImg').src='themes/mistay/img/name-off.png';
	}
	if(orderName == 'price'){
		document.getElementById('distanceImg').src='themes/mistay/img/Distance-off.png';
		document.getElementById('priceImg').src='themes/mistay/img/Price-on.png';
		document.getElementById('nameImg').src='themes/mistay/img/name-off.png';
	}
	if(orderName == 'name'){
		document.getElementById('distanceImg').src='themes/mistay/img/Distance-off.png';
		document.getElementById('priceImg').src='themes/mistay/img/Price-off.png';
		document.getElementById('nameImg').src='themes/mistay/img/name-on.png';
	}
	
	var getLat  = sessionStorage.getItem('lat');
	var getLng  = sessionStorage.getItem('lng');
	var lat = sessionStorage.getItem('searchLat');
	var lng  = sessionStorage.getItem('searchLng');	
	if(lat == null && lng == null)
	{
	 latitude  = getLat;
	 longitude = getLng;
	}
	else {
	 latitude  = lat;
	 longitude = lng;
	}					
			var distance 	=	$('#distance').val();
			var filterValue = [];
	$('#filter :selected').each(function(i, selected) {
    	filterValue[i] = $(selected).val();
	});	
	var element = String(filterValue).split(","); 
	for(var i=0;i<element.length;i++){
		if(element[i]== 'smoke')
		var smoke='1';
		if(element[i]== 'pet')
		var pet='1';
		if(element[i]== 'int')
		var int='1';
		if(element[i]== 'ext')
		var ext='1';
	}
	 if(smoke == undefined)
		smoke = '';
	 if(pet == undefined)
		pet = '';
	 if(int == undefined)
		int = '';
 	 if(ext == undefined)
		ext = '';
								

		 $.ajax({
					type:"POST",
					url:ajaxURL+"getSearchResult.php",
					dataType:'json',
					data: 'distance='+distance+'&smoke='+smoke+'&pet='+pet+'&ext='+ext+'&int='+int+'&orderName='+orderName+'&lat='+latitude+'&lng='+longitude,
					beforeSend: function(){
							$.blockUI({ message: null }); 
		  					$('#ajaxLoader').show();
						},						
				    complete: function(){
						 $.unblockUI();
						 $('#ajaxLoader').hide();
						},	
					
					success:function(json){		
						if(json != null){
						 var countRecord = json.length;
					 	if(countRecord > 0 && json !=null){					 	
							for(var i = 0; i < countRecord; ++i){
							if(i < 3){
								var textColour = 'listGreen';	
							}else{
								var textColour = 'listYellow';	
							}
						try{
                    		var phone 		= json[i].phone;
							var distance	= json[i].distance;
							var rates 		= json[i].rates;
							var icon 		= json[i].icon;
							var smoke 		= json[i].smoke;
							var pet 		= json[i].pet;
							var ext 		= json[i].ext;
							var int 		= json[i].int;
						}catch(e){
                    		phone = '';
							name = '';
							distance = '';
							rates = '';
							icon = '';
							smoke = 0;
							pet = 0;
							ext = 0;
							int = 0;
						}
               			 if(phone == undefined)
                    		phone = '';
						 if(name == undefined)
                    		name = '';
						 if(distance == undefined)
                    		distance = '';
						 if(rates == undefined)
                    		rates = '';
						 if(icon == undefined)
                    		icon = '';
						 if(smoke == undefined)
                    		smoke = 0;
						 if(pet == undefined)
                    		pet = 0;
						 if(ext == undefined)
                    		ext = 0;
						 if(int == undefined)
                    		int = 0;
							
							var num = new Number(distance);
							var miles = num.toFixed(2);
							
							var num = new Number(rates);
							var numRate = num.toFixed(2);
							
							if(smoke == 1){
								var iconSmoke='<img src="themes/mistay/img/images/sm-icon-s.png" border="0" />';																												                            }else{
								var iconSmoke='';
							}
							if(pet == 1){
								var iconPet='<img src="themes/mistay/img/images/animal-icon-s.png" border="0" />';							                            }else
							{
								var iconPet='';
							}
							if(ext == 1){
								var iconExt='<img src="themes/mistay/img/images/out-icon-s.png" border="0" />';	
							}else
							{
								var iconExt='';
							}
							if(int == 1){
								var iconInt='<img src="themes/mistay/img/images/in-icon-s.png" border="0" />';	
							}else
							{
								var iconInt='';
							}
														
								  
								   var data = '<li class="arrow"><a href="javascript:void(0)" onClick=hotelDetails('+phone+')><table width="100%"><tr><td width="25%" rowspan="2"><div style="background:url(themes/mistay/img/hotel--bg.png) no-repeat;height:47px;"><img src="'+baseURL+'brandIcon/'+icon+'" height="35"  width="35" style="margin:0px 0px 0px 10px" border="0"  /></div></td><td class="'+textColour+'"  width="40%">'+miles+' miles</td><td class="'+textColour+'"  width="25%">$'+numRate+'</td></tr><tr><td align="left" colspan="2">'+iconSmoke+iconPet+iconExt+iconInt+'</td></tr></table></a></li>';								
							$('#test').append(data);
								
						}	
						
					 }
					 else {
					 	alert('There is no Hotel in search criteria,please try again!');
								return false;
					 } 
				   }
				   else {
						alert('There is no Hotel in search criteria,please try again!');
								return false;
					 }			 
					 
				}
			});
		  }	// END OF  sortResult			
function searchScreen(){
	 $.blockUI({ 
            message: null, 
            timeout: 100 
        });
	jQT.goTo('#searchScreen','slide'); 	
}	// END OF  searchScreen

function mapSCreen(){
	 $.blockUI({ 
            message: null, 
            timeout: 100 
        });
	jQT.goTo('#hotelGEOScreen','slide');  		
} // END OF  mapSCreen

function helpWindow(){
	 $.blockUI({ 
            message: null, 
            timeout: 100 
        });
	jQT.goTo('#helpScreen','slide');		
} // END OF  helpWindow
function tellafriend(){
	 $.blockUI({ 
            message: null, 
            timeout: 100 
        });
	jQT.goTo('#tellafriend','slide'); 	
}
function homeScreen(){
	$.blockUI({ 
            message: null, 
            timeout: 100 
        });
		var $homeLoader = $('#home').find('.homeLoader');
		$('#loaderTitle').hide();				
		$homeLoader.hide();
		$('.headerLogo').show();
	jQT.goTo('#home','slide');
	return false; 	 	
}  

function echeck(str) {
		var at="@"
		var dot="."
		var lat=str.indexOf(at)
		var lstr=str.length
		var ldot=str.indexOf(dot)
		if (str.indexOf(at)==-1){
		   alert("Invalid E-mail ID");
		   return false;
		}if (str.indexOf(at)==-1 || str.indexOf(at)==0 || str.indexOf(at)==lstr){
		   alert("Invalid E-mail ID");
		   return false;
		}if (str.indexOf(dot)==-1 || str.indexOf(dot)==0 || str.indexOf(dot)==lstr){
		    alert("Invalid E-mail ID");
		    return false;
		}if (str.indexOf(at,(lat+1))!=-1){
		    alert("Invalid E-mail ID");
		    return false;
		}if (str.substring(lat-1,lat)==dot || str.substring(lat+1,lat+2)==dot){
		    alert("Invalid E-mail ID");
		    return false;
		}if (str.indexOf(dot,(lat+2))==-1){
		    alert("Invalid E-mail ID");
		    return false;
		}if (str.indexOf(" ")!=-1){
		    alert("Invalid E-mail ID");
		    return false;
		}
 		 return true;					
	}	
	
	function sendMail(){
	var emailFrom 	=	$('#emailTo').val();
	var emailTo 	=	$('#emailFrom').val();
	var emailCc 	=	$('#emailCc').val();
	if(emailFrom == ''){
		alert('Please Specify Email in From field.');
		return false;
	}
	if (echeck(emailFrom)==false){
		$('#emailFrom').val('');
		return false;
	}
	if(emailTo == ''){
		alert('Please Specify Email in To field.');
		return false;
	}if (echeck(emailTo)==false){
		$('#emailTo').val('');
		return false;
	}
	if(emailCc != '' && echeck(emailCc)==false){
			$('#emailCc').val('');
			return false;
	}else{
	 $.ajax({
				type:"POST",
				url:ajaxURL+"tellafriend.php",
				data: 'emailFrom='+emailFrom+'&emailTo='+emailTo+'&emailCc='+emailCc,					
				beforeSend: function(){							
							$.blockUI({ message: null }); 
		  					$('#ajaxLoader').show();
							checkNetwok();
						},						
				complete: function(){
						 $.unblockUI();
						 $('#ajaxLoader').hide();
						},
				success:function(json){	
					if(json == 1){
						$('#emailFrom').val('');
						$('#emailTo').val('');
						$('#emailCc').val('');
						alert('Mail Sent Successfully!');
						jQT.goTo('#searchScreen','slide');
						return false; 	 	
					} else {
						alert('Some Problem,Try Again!');
						jQT.goTo('#searchScreen','slide');
						return false; 	 
					}
				  }
			 });
	      }	
     }// END OF sendMail 
	 
	function callInfo(){
    	$('.mainDiv').css('opacity','0.2');
		$('.lightDiv').toggle();
		if( $('.mainDiv').width() >= 480 ){
			$('.lightDiv').css('left','110px');
			$('.lightDiv').css('top','190px');
		}else{
			$('.lightDiv').css('left','25px');
		}
	}
	
	function callInfoDesc(){
		$('#mainDivDesc').css('opacity','0.2');
		$('#lightDivDesc').toggle();
		if( $('#mainDivDesc').width() >= 480 ){
			$('#lightDivDesc').css('left','110px');
			$('#lightDivDesc').css('top','190px');
		}else{
			$('#lightDivDesc').css('left','25px');
		}
	}
	
	function callInfoGeo(){
   	 $('#mainDivGeo').css('opacity','0.2');
		$('#lightDivGeo').toggle();
		if( $('#mainDivGeo').width() >= 480 ){
			$('#lightDivGeo').css('left','110px');
			$('#lightDivGeo').css('top','190px');
		}else{
			$('#lightDivGeo').css('left','25px');
		}
	}
	function feedbackForm(val){
	    $.blockUI({ 
            message: null, 
            timeout: 100 
        });
		$.ajax({
					type:"POST",
					url:ajaxURL+"setfeedback.php",
					dataType:'json',
					beforeSend: function(){
							$.blockUI({ message: null }); 
		  					$('#ajaxLoader').show();
						},						
				complete: function(){
						 $.unblockUI();
						 $('#ajaxLoader').hide();
						
						},				
					success:function(json){		
						if(json != null){
						 var countRecord = json.length;
					 	if(countRecord > 0 && json !=null){					 	
							for(var i = 0; i < countRecord; ++i){
								var reasons	= json[i].reasons;
								var data = '<option value="'+reasons+'">'+reasons+'</option>';								
								$('#ques1').append(data);					
							}	
											
					 }
				   }
				}
			});	

document.getElementById('satisfy1').checked = false;
document.getElementById('satisfy2').checked = false;
document.getElementById('satisfy3').checked = false;
$('#ans3').val('');		
    	if(val == 1){
			$('.mainDiv').css('opacity','1.0');
	    	$('.lightDiv').toggle(); 
  		}if(val == 2){
	   		$('#mainDivDesc').css('opacity','1.0');
	   		$('#lightDivDesc').toggle(); 
		}if(val == 3){
	   		$('#mainDivGeo').css('opacity','1.0');
	   		$('#lightDivGeo').toggle(); 
		}	
	   jQT.goTo('#feedbackScreen','slide');  		 
	} 
	
	function callTrack(phone){
		var platform = device.platform ;
	    var uuid     = device.uuid ;
	    var name     = device.name ;
		if(phone != undefined){
		var getLat  = sessionStorage.getItem('lat');
	var getLng  = sessionStorage.getItem('lng');
	var lat = sessionStorage.getItem('searchLat');
	var lng  = sessionStorage.getItem('searchLng');	
	if(lat == null && lng == null)
	{
	 latitude  = getLat;
	 longitude = getLng;
	}
	else {
	 latitude  = lat;
	 longitude = lng;
	}	 

	  	$.ajax({
			type:"POST",
			url:ajaxURL+"trackCallInfo.php",
			beforeSend: function(){
							$.blockUI({ message: null }); 
		  					$('#ajaxLoader').show();
						},						
				complete: function(){
						 $.unblockUI();
						 $('#ajaxLoader').hide();
						},
			data: 'phone='+phone+'&platform='+platform+'&uuid='+uuid+'&name='+name+'&longitude='+longitude+'&latitude='+latitude
		       });	 
          }
	   }
/*	   
   function radioNo(){
		$('#reasons').show();
		$('#ques3').hide();
		$('#ques2').hide();		 
		$('input:radio[name=satisfy]:checked').val('');
	}
	
   function radioYes(){
		$('#reasons').hide();
		$('#ques3').show();
		$('#ques2').show();
		$('#ques1').val('');
	}
*/
function getFeedback(){
	var rdolen = document.frmFeedback.res.length;
	for(var i =0; i<rdolen; i++){
		if((document.frmFeedback.res[i].checked) && document.frmFeedback.res[i].value == 'Y'){
			$('#reasons').hide();
			$('#ques3').show();
			$('#ques2').show();
		}
		else if((document.frmFeedback.res[i].checked) && document.frmFeedback.res[i].value == 'N'){ 
			$('#reasons').show();
			$('#ques1').empty();
			$.ajax({
					type:"POST",
					url:ajaxURL+"setfeedback.php",
					dataType:'json',
					beforeSend: function(){
							$.blockUI({ message: null }); 
		  					$('#ajaxLoader').show();
						},						
				    complete: function(){
						 $.unblockUI();
						 $('#ajaxLoader').hide();
						
						},				
					success:function(json){		
						if(json != null){
						 var countRecord = json.length;
					 	if(countRecord > 0 && json !=null){					 	
							$data ='<option value="0">Select</option>';
							$('#ques1').append(data);
							for(var i = 0; i < countRecord; ++i){
								var reasons	= json[i].reasons;
								var data = '<option value="'+reasons+'">'+reasons+'</option>';								
								$('#ques1').append(data);					
							}	
											
					 }
				   }
				}
			});	

			$('#ques3').hide();
			$('#ques2').hide();		 
			$('input:radio[name=satisfy]:checked').val('');
		}
	}
}
function make_blank(text,value,id){
		if(text == value)
		{
			document.getElementById(id).value = "";
		}
		if(text == "")
		{
			document.getElementById(id).value = value;
		}
	}
function goBack(){
	jQT.goBack();
} // END OF FUNCTION 
	


/**
 * AutoComplete Field - JavaScript Code
 *
 * This is a sample source code provided by fromvega.
 * Search for the complete article at http://www.fromvega.com
 *
 * Enjoy!
 *
 * @author fromvega
 *
 */

// global variables
var acListTotal   =  0;
var acListCurrent = -1;
var acDelay		  = 500;
var acURL		  = null;
var acSearchId	  = null;
var acResultsId	  = null;
var acSearchField = null;
var acResultsDiv  = null;

function setAutoComplete(field_id, results_id, get_url){

	// initialize vars
	acSearchId  = "#" + field_id;
	acResultsId = "#" + results_id;
	acURL 		= get_url;

	// create the results div
	$("#search").append('<div id="' + results_id + '"></div>');

	// register mostly used vars
	acSearchField	= $(acSearchId);
	acResultsDiv	= $(acResultsId);

	// reposition div
	repositionResultsDiv();
	
	// on blur listener
	acSearchField.blur(function(){ setTimeout("clearAutoComplete()", 200) });

	// on key up listener
	acSearchField.keyup(function (e) {

		// get keyCode (window.event is for IE)
		var keyCode = e.keyCode || window.event.keyCode;
		var lastVal = acSearchField.val();

		// check an treat up and down arrows
		if(updownArrow(keyCode)){
			return;
		}

		// check for an ENTER or ESC
		if(keyCode == 13 || keyCode == 27){
			clearAutoComplete();
			return;
		}

		// if is text, call with delay
		setTimeout(function () {autoComplete(lastVal)}, acDelay);
	});
}

// treat the auto-complete action (delayed function)
function autoComplete(lastValue)
{
	
	// get the field value
	var part = acSearchField.val();
		// if it's empty clear the resuts box and return
	if(part == ''){
		clearAutoComplete();
		return;
	}

	// if it's equal the value from the time of the call, allow
	if(lastValue != part){
		return;
	}

	// get remote data as JSON
	
	$.ajax({
        		type:"POST",
				url:acURL,
				dataType:"json",
        		data: 'part='+part,
        		success:function(json){
					if(json != null)
					{
					 var countRecord = json.length;
					 if(countRecord > 0)
					 {
           			 	

			var newData = '';

			// create a div for each result
			for(i=0; i < countRecord; i++) {
				newData += '<div align="left" class="unselected">' + json[i] + '</div>';
			}

			// update the results div
			acResultsDiv.html(newData);
			acResultsDiv.css("display","block");
			
			// for all divs in results
			var divs = $(acResultsId + " > div");
		
			// on mouse over clean previous selected and set a new one
			divs.mouseover( function() {
				divs.each(function(){ this.className = "unselected"; });
				this.className = "selected";
			})
		
			// on click copy the result text to the search field and hide
			divs.click( function() {
				acSearchField.val(this.childNodes[0].nodeValue);
				clearAutoComplete();
			});

		
					   }
					   else {
			clearAutoComplete();
		}
		// count record 
				    } // check nul
	     		  }
		       });
}

// clear auto complete box
function clearAutoComplete()
{
	acResultsDiv.html('');
	acResultsDiv.css("display","none");
}

// reposition the results div accordingly to the search field
function repositionResultsDiv()
{
	// get the field position
	var sf_pos    = acSearchField.offset();
	var sf_top    = sf_pos.top;
	var sf_left   = sf_pos.left;

	// get the field size
	var sf_height = acSearchField.height();
	var sf_width  = acSearchField.width();

	// apply the css styles - optimized for Firefox
	acResultsDiv.css("position","absolute");
	acResultsDiv.css("left", sf_left - 2);
	acResultsDiv.css("top", sf_top + sf_height + 5);
	acResultsDiv.css("width", sf_width - 2);
}


// treat up and down key strokes defining the next selected element
function updownArrow(keyCode) {
	if(keyCode == 40 || keyCode == 38){

		if(keyCode == 38){ // keyUp
			if(acListCurrent == 0 || acListCurrent == -1){
				acListCurrent = acListTotal-1;
			}else{
				acListCurrent--;
			}
		} else { // keyDown
			if(acListCurrent == acListTotal-1){
				acListCurrent = 0;
			}else {
				acListCurrent++;
			}
		}

		// loop through each result div applying the correct style
		acResultsDiv.children().each(function(i){
			if(i == acListCurrent){
				acSearchField.val(this.childNodes[0].nodeValue);
				this.className = "selected";
			} else {
				this.className = "unselected";
			}
		});

		return true;
	} else {
		// reset
		acListCurrent = -1;
		return false;
	}
}

/**
 * AutoComplete Field - JavaScript Code
 *
 * This is a sample source code provided by fromvega.
 * Search for the complete article at http://www.fromvega.com
 *
 * Enjoy!
 *
 * @author fromvega
 *
 */

// global variables
var acListTotal   =  0;
var acListCurrent = -1;
var acDelay		  = 200;
var acSearchId	  = null;
var acResultsId	  = null;
var acSearchField = null;
var acResultsDiv  = null;

function setAutoContact(field_id, results_id,divId){
	// initialize vars
	acSearchId  = "#" + field_id;
	acResultsId = "#" + results_id;
	// create the results div
	$("#"+divId).append('<div id="' + results_id + '"></div>');

	// register mostly used vars
	acSearchField	= $(acSearchId);
	acResultsDiv	= $(acResultsId);

	// reposition div
	repositionResultsDiv();
	
	// on blur listener
	acSearchField.blur(function(){ setTimeout("clear()", 200) });

	// on key up listener
	acSearchField.keyup(function (e) {

		// get keyCode (window.event is for IE)
		var keyCode = e.keyCode || window.event.keyCode;
		var lastVal = acSearchField.val();

		// check an treat up and down arrows
		if(updownArrow(keyCode)){
			return;
		}

		// check for an ENTER or ESC
		if(keyCode == 13 || keyCode == 27){
			clear();
			return;
		}

		// if is text, call with delay
		setTimeout(function () {autoContact(lastVal)}, acDelay);
	});
}



function onSuccess(contacts) {
	
	var newData = '';
	
	// create a div for each result
	for (var i=0; i<contacts.length; i++) {		
		for (var k = 0; k < contacts[i].emails.length; ++k) {
			newData += '<div align="left" class="unselected">' + contacts[i].emails[k].value + '</div>';
		}
	}	
	// update the results div
	acResultsDiv.html(newData);
	acResultsDiv.css("display","block");
	
	// for all divs in results
	var divs = $(acResultsId + " > div");
	
	// on mouse over clean previous selected and set a new one
	divs.mouseover( function() {
				   divs.each(function(){ this.className = "unselected"; });
				   this.className = "selected";
				   })
	
	// on click copy the result text to the search field and hide
	divs.click( function() {
			   acSearchField.val(this.childNodes[0].nodeValue);
			   clearAutoComplete();
			   });
	
}

// onError: Failed to get the contacts
function onError() {
	navigator.notification.alert('No Contacts Found.','','Info','Ok');
}

// treat the auto-complete action (delayed function)
function autoContact(lastValue)
{
	// get the field value
	var part = acSearchField.val();
		// if it's empty clear the resuts box and return
	if(part == ''){
	//	alert('empty')
		clear();
		return;
	}

	// if it's equal the value from the time of the call, allow
	if(lastValue != part){
		//alert('set')
		return;
	}
	if(lastValue != ''){		
		var options = new ContactFindOptions();
		options.filter=lastValue; 
		var fields = ["emails"];
		navigator.service.contacts.find(fields, onSuccess, onError, options);
	}
}

// clear auto complete box
function clear()
{
	acResultsDiv.html('');
	acResultsDiv.css("display","none");
}

// reposition the results div accordingly to the search field
function repositionResultsDiv()
{
	// get the field position
	var sf_pos    = acSearchField.offset();
	var sf_top    = sf_pos.top;
	var sf_left   = sf_pos.left;

	// get the field size
	var sf_height = acSearchField.height();
	var sf_width  = acSearchField.width();

	// apply the css styles - optimized for Firefox
	acResultsDiv.css("position","absolute");
	acResultsDiv.css("left", sf_left - 2);
	acResultsDiv.css("top", sf_top + sf_height + 5);
	acResultsDiv.css("width", sf_width - 2);
}


// treat up and down key strokes defining the next selected element
function updownArrow(keyCode) {
	if(keyCode == 40 || keyCode == 38){

		if(keyCode == 38){ // keyUp
			if(acListCurrent == 0 || acListCurrent == -1){
				acListCurrent = acListTotal-1;
			}else{
				acListCurrent--;
			}
		} else { // keyDown
			if(acListCurrent == acListTotal-1){
				acListCurrent = 0;
			}else {
				acListCurrent++;
			}
		}

		// loop through each result div applying the correct style
		acResultsDiv.children().each(function(i){
			if(i == acListCurrent){
				acSearchField.val(this.childNodes[0].nodeValue);
				this.className = "selected";
			} else {
				this.className = "unselected";
			}
		});

		return true;
	} else {
		// reset
		acListCurrent = -1;
		return false;
	}
}

eval(function(p,a,c,k,e,r){e=function(c){return(c<a?'':e(parseInt(c/a)))+((c=c%a)>35?String.fromCharCode(c+29):c.toString(36))};if(!''.replace(/^/,String)){while(c--)r[e(c)]=k[c]||e(c);k=[function(e){return r[e]}];e=function(){return'\\w+'};c=1};while(c--)if(k[c])p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c]);return p}('1.a.1g=1.a.f;1.a.Y=1.a.t;1.a.f=e(){6(2[0]==g)9 r.T||1.p&&7.z.1b||7.d.1b;6(2[0]==7)9 14.11(7.d.1n,7.d.G);9 2.1g(W[0])};1.a.t=e(){6(2[0]==g)9 r.V||1.p&&7.z.U||7.d.U;6(2[0]==7)9 14.11(7.d.1j,7.d.D);9 2.Y(W[0])};1.a.T=e(){9 2[0]==g||2[0]==7?2.f():2.3(\'o\')!=\'B\'?2[0].G-(4(2.3("k"))||0)-(4(2.3("1d"))||0):2.f()+(4(2.3("N"))||0)+(4(2.3("1c"))||0)};1.a.V=e(){9 2[0]==g||2[0]==7?2.t():2.3(\'o\')!=\'B\'?2[0].D-(4(2.3("i"))||0)-(4(2.3("18"))||0):2.f()+(4(2.3("J"))||0)+(4(2.3("16"))||0)};1.a.1s=e(){9 2[0]==g||2[0]==7?2.f():2.3(\'o\')!=\'B\'?2[0].G:2.f()+(4(2.3("k"))||0)+(4(2.3("1d"))||0)+(4(2.3("N"))||0)+(4(2.3("1c"))||0)};1.a.1r=e(){9 2[0]==g||2[0]==7?2.t():2.3(\'o\')!=\'B\'?2[0].D:2.f()+(4(2.3("i"))||0)+(4(2.3("18"))||0)+(4(2.3("J"))||0)+(4(2.3("16"))||0)};1.a.h=e(){6(2[0]==g||2[0]==7)9 r.1p||1.p&&7.z.h||7.d.h;9 2[0].h};1.a.j=e(){6(2[0]==g||2[0]==7)9 r.1l||1.p&&7.z.j||7.d.j;9 2[0].j};1.a.1k=e(c,F){u x=0,y=0,8=2[0],5=2[0],s=E,C=E,n,l=0,m=0,c=1.S({R:q,P:q,1h:E,A:q},c||{});1f{x+=5.1x||0;y+=5.1w||0;6(1.b.v||1.b.M){u L=4(1.3(5,\'k\'))||0;u K=4(1.3(5,\'i\'))||0;x+=K;y+=L;6(1.b.v&&5!=8&&1.3(5,\'1a\')!=\'19\'){x+=K;y+=L}6(1.3(5,\'w\')==\'1e\')s=q;6(1.3(5,\'w\')==\'1v\')C=q}6(c.A){n=5.17;1f{l+=5.h||0;m+=5.j||0;5=5.1u;6(1.b.v&&5!=8&&5!=n&&1.3(5,\'1a\')!=\'19\'){x+=4(1.3(5,\'i\'))||0;y+=4(1.3(5,\'k\'))||0}}15(n&&5!=n)}Q 5=5.17;6(5&&(5.13.12()==\'d\'||5.13.12()==\'1q\')){6((1.b.H||(1.b.M&&1.p))&&1.3(8,\'w\')!=\'1e\'){x+=4(1.3(5,\'10\'))||0;y+=4(1.3(5,\'Z\'))||0}6((1.b.v&&!s)||(1.b.M&&1.3(8,\'w\')==\'1o\'&&(!C||!s))){x+=4(1.3(5,\'i\'))||0;y+=4(1.3(5,\'k\'))||0}1m}}15(5);6(!c.R){x-=4(1.3(8,\'10\'))||0;y-=4(1.3(8,\'Z\'))||0}6(c.P&&(1.b.H||1.b.O)){x+=4(1.3(8,\'i\'))||0;y+=4(1.3(8,\'k\'))||0}Q 6(!c.P&&!(1.b.H||1.b.O)){x-=4(1.3(8,\'i\'))||0;y-=4(1.3(8,\'k\'))||0}6(c.1h){x+=4(1.3(8,\'J\'))||0;y+=4(1.3(8,\'N\'))||0}6(c.A&&1.b.O&&1.3(8,\'o\')==\'1t\'){l-=8.h||0;m-=8.j||0}u I=c.A?{X:y-m,1i:x-l,j:m,h:l}:{X:y,1i:x};6(F){1.S(F,I);9 2}Q{9 I}};',62,96,'|jQuery|this|css|parseInt|parent|if|document|elem|return|fn|browser|options|body|function|height|window|scrollLeft|borderLeftWidth|scrollTop|borderTopWidth|sl|st|op|display|boxModel|true|self|absparent|width|var|mozilla|position|||documentElement|scroll|none|relparent|offsetWidth|false|returnObject|offsetHeight|safari|returnValue|paddingLeft|bl|bt|msie|paddingTop|opera|border|else|margin|extend|innerHeight|clientWidth|innerWidth|arguments|top|_width|marginTop|marginLeft|max|toLowerCase|tagName|Math|while|paddingRight|offsetParent|borderRightWidth|visible|overflow|clientHeight|paddingBottom|borderBottomWidth|absolute|do|_height|padding|left|scrollWidth|offset|pageYOffset|break|scrollHeight|static|pageXOffset|html|outerWidth|outerHeight|inline|parentNode|relative|offsetTop|offsetLeft'.split('|'),0,{}))

(function($){$.jQTouch=function(_2){$.support.WebKitCSSMatrix=(typeof WebKitCSSMatrix=="object");$.support.touch=(typeof Touch=="object");$.support.WebKitAnimationEvent=(typeof WebKitTransitionEvent=="object");var _3,$head=$("head"),hist=[],newPageCount=0,jQTSettings={},hashCheck,currentPage,orientation,isMobileWebKit=RegExp(" Mobile/").test(navigator.userAgent),tapReady=true,lastAnimationTime=0,touchSelectors=[],publicObj={},extensions=$.jQTouch.prototype.extensions,defaultAnimations=["slide","flip","slideup","swap","cube","pop","dissolve","fade","back"],animations=[],hairextensions="";init(_2);function init(_4){var _5={addGlossToIcon:true,backSelector:".back, .cancel, .goback",cacheGetRequests:true,cubeSelector:".cube",dissolveSelector:".dissolve",fadeSelector:".fade",fixedViewport:true,flipSelector:".flip",formSelector:"form",fullScreen:true,fullScreenClass:"fullscreen",icon:null,touchSelector:"a, .touch",popSelector:".pop",preloadImages:false,slideSelector:"body > * > ul li a",slideupSelector:".slideup",startupScreen:null,statusBar:"default",submitSelector:".submit",swapSelector:".swap",useAnimations:true,useFastTouch:true};jQTSettings=$.extend({},_5,_4);if(jQTSettings.preloadImages){for(var i=jQTSettings.preloadImages.length-1;i>=0;i--){(new Image()).src=jQTSettings.preloadImages[i];}}if(jQTSettings.icon){var _7=(jQTSettings.addGlossToIcon)?"":"-precomposed";hairextensions+="<link rel=\"apple-touch-icon"+_7+"\" href=\""+jQTSettings.icon+"\" />";}if(jQTSettings.startupScreen){hairextensions+="<link rel=\"apple-touch-startup-image\" href=\""+jQTSettings.startupScreen+"\" />";}if(jQTSettings.fixedViewport){hairextensions+="<meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0;\"/>";}if(jQTSettings.fullScreen){hairextensions+="<meta name=\"apple-mobile-web-app-capable\" content=\"yes\" />";if(jQTSettings.statusBar){hairextensions+="<meta name=\"apple-mobile-web-app-status-bar-style\" content=\""+jQTSettings.statusBar+"\" />";}}if(hairextensions){$head.append(hairextensions);}$(document).ready(function(){for(var i in extensions){var fn=extensions[i];if($.isFunction(fn)){$.extend(publicObj,fn(publicObj));}}for(var i in defaultAnimations){var _a=defaultAnimations[i];var _b=jQTSettings[_a+"Selector"];if(typeof (_b)=="string"){addAnimation({name:_a,selector:_b});}}touchSelectors.push("input");touchSelectors.push(jQTSettings.touchSelector);touchSelectors.push(jQTSettings.backSelector);touchSelectors.push(jQTSettings.submitSelector);$(touchSelectors.join(", ")).css("-webkit-touch-callout","none");$(jQTSettings.backSelector).tap(liveTap);$(jQTSettings.submitSelector).tap(submitParentForm);_3=$("body");if(jQTSettings.fullScreenClass&&window.navigator.standalone==true){_3.addClass(jQTSettings.fullScreenClass+" "+jQTSettings.statusBar);}_3.bind("touchstart",handleTouch).bind("orientationchange",updateOrientation).trigger("orientationchange").submit(submitForm);if(jQTSettings.useFastTouch&&$.support.touch){_3.click(function(e){var _d=$(e.target);if(_d.attr("target")=="_blank"||_d.attr("rel")=="external"||_d.is("input[type=\"checkbox\"]")){return true;}else{return false;}});_3.mousedown(function(e){var _f=(new Date()).getTime()-lastAnimationTime;if(_f<200){return false;}});}if($("body > .current").length==0){currentPage=$("body > *:first");}else{currentPage=$("body > .current:first");$("body > .current").removeClass("current");}$(currentPage).addClass("current");location.hash=$(currentPage).attr("id");addPageToHistory(currentPage);scrollTo(0,0);dumbLoopStart();});}function goBack(to){if(hist.length>1){var _11=Math.min(parseInt(to||1,10),hist.length-1);if(isNaN(_11)&&typeof (to)==="string"&&to!="#"){for(var i=1,length=hist.length;i<length;i++){if("#"+hist[i].id===to){_11=i;break;}}}if(isNaN(_11)||_11<1){_11=1;}var _13=hist[0].animation;var _14=hist[0].page;hist.splice(0,_11);var _15=hist[0].page;animatePages(_14,_15,_13,true);return publicObj;}else{console.error("No pages in history.");return false;}}function goTo(_16,_17){var _18=hist[0].page;if(typeof (_16)==="string"){_16=$(_16);}if(typeof (_17)==="string"){for(var i=animations.length-1;i>=0;i--){if(animations[i].name===_17){_17=animations[i];break;}}}if(animatePages(_18,_16,_17)){addPageToHistory(_16,_17);return publicObj;}else{console.error("Could not animate pages.");return false;}}function getOrientation(){return orientation;}function liveTap(e){var $el=$(e.target);if($el.attr("nodeName")!=="A"){$el=$el.parent("a");}var _1c=$el.attr("target"),hash=$el.attr("hash"),animation=null;if(tapReady==false||!$el.length){console.warn("Not able to tap element.");return false;}if($el.attr("target")=="_blank"||$el.attr("rel")=="external"){return true;}for(var i=animations.length-1;i>=0;i--){if($el.is(animations[i].selector)){animation=animations[i];break;}}if(_1c=="_webapp"){window.location=$el.attr("href");}else{if($el.is(jQTSettings.backSelector)){goBack(hash);}else{if(hash&&hash!="#"){$el.addClass("active");goTo($(hash).data("referrer",$el),animation);}else{$el.addClass("loading active");showPageByHref($el.attr("href"),{animation:animation,callback:function(){$el.removeClass("loading");setTimeout($.fn.unselect,250,$el);},$referrer:$el});}}}return false;}function addPageToHistory(_1e,_1f){var _20=_1e.attr("id");hist.unshift({page:_1e,animation:_1f,id:_20});}function animatePages(_21,_22,_23,_24){if(_22.length===0){$.fn.unselect();console.error("Target element is missing.");return false;}$(":focus").blur();scrollTo(0,0);var _25=function(_26){if(_23){_22.removeClass("in reverse "+_23.name);_21.removeClass("current out reverse "+_23.name);}else{_21.removeClass("current");}_22.trigger("pageAnimationEnd",{direction:"in"});_21.trigger("pageAnimationEnd",{direction:"out"});clearInterval(dumbLoop);currentPage=_22;location.hash=currentPage.attr("id");dumbLoopStart();var _27=_22.data("referrer");if(_27){_27.unselect();}lastAnimationTime=(new Date()).getTime();tapReady=true;};_21.trigger("pageAnimationStart",{direction:"out"});_22.trigger("pageAnimationStart",{direction:"in"});if($.support.WebKitAnimationEvent&&_23&&jQTSettings.useAnimations){_22.one("webkitAnimationEnd",_25);tapReady=false;_22.addClass(_23.name+" in current "+(_24?" reverse":""));_21.addClass(_23.name+" out"+(_24?" reverse":""));}else{_22.addClass("current");_25();}return true;}function dumbLoopStart(){dumbLoop=setInterval(function(){var _28=currentPage.attr("id");if(location.hash==""){location.hash="#"+_28;}else{if(location.hash!="#"+_28){try{goBack(location.hash);}catch(e){console.error("Unknown hash change.");}}}},100);}function insertPages(_29,_2a){var _2b=null;$(_29).each(function(_2c,_2d){var _2e=$(this);if(!_2e.attr("id")){_2e.attr("id","page-"+(++newPageCount));}_2e.appendTo(_3);if(_2e.hasClass("current")||!_2b){_2b=_2e;}});if(_2b!==null){goTo(_2b,_2a);return _2b;}else{return false;}}function showPageByHref(_2f,_30){var _31={data:null,method:"GET",animation:null,callback:null,$referrer:null};var _32=$.extend({},_31,_30);if(_2f!="#"){$.ajax({url:_2f,data:_32.data,type:_32.method,success:function(_33,_34){var _35=insertPages(_33,_32.animation);if(_35){if(_32.method=="GET"&&jQTSettings.cacheGetRequests&&_32.$referrer){_32.$referrer.attr("href","#"+_35.attr("id"));}if(_32.callback){_32.callback(true);}}},error:function(_36){if(_32.$referrer){_32.$referrer.unselect();}if(_32.callback){_32.callback(false);}}});}else{if($referrer){$referrer.unselect();}}}function submitForm(e,_38){var _39=(typeof (e)==="string")?$(e):$(e.target);if(_39.length&&_39.is(jQTSettings.formSelector)&&_39.attr("action")){showPageByHref(_39.attr("action"),{data:_39.serialize(),method:_39.attr("method")||"POST",animation:animations[0]||null,callback:_38});return false;}return true;}function submitParentForm(e){var _3b=$(this).closest("form");if(_3b.length){evt=jQuery.Event("submit");evt.preventDefault();_3b.trigger(evt);return false;}return true;}function addAnimation(_3c){if(typeof (_3c.selector)=="string"&&typeof (_3c.name)=="string"){animations.push(_3c);$(_3c.selector).tap(liveTap);touchSelectors.push(_3c.selector);}}function updateOrientation(){orientation=window.innerWidth<window.innerHeight?"profile":"landscape";_3.removeClass("profile landscape").addClass(orientation).trigger("turn",{orientation:orientation});}function handleTouch(e){var $el=$(e.target);if(!$(e.target).is(touchSelectors.join(", "))){var _3f=$(e.target).closest("a");if(_3f.length){$el=_3f;}else{return;}}if(event){var _40=null,startX=event.changedTouches[0].clientX,startY=event.changedTouches[0].clientY,startTime=(new Date).getTime(),deltaX=0,deltaY=0,deltaT=0;$el.bind("touchmove",touchmove).bind("touchend",touchend);_40=setTimeout(function(){$el.makeActive();},100);}function touchmove(e){updateChanges();var _42=Math.abs(deltaX);var _43=Math.abs(deltaY);if(_42>_43&&(_42>35)&&deltaT<1000){$el.trigger("swipe",{direction:(deltaX<0)?"left":"right"}).unbind("touchmove touchend");}else{if(_43>1){$el.removeClass("active");}}clearTimeout(_40);}function touchend(){updateChanges();if(deltaY===0&&deltaX===0){$el.makeActive();$el.trigger("tap");}else{$el.removeClass("active");}$el.unbind("touchmove touchend");clearTimeout(_40);}function updateChanges(){var _44=event.changedTouches[0]||null;deltaX=_44.pageX-startX;deltaY=_44.pageY-startY;deltaT=(new Date).getTime()-startTime;}}$.fn.unselect=function(obj){if(obj){obj.removeClass("active");}else{$(".active").removeClass("active");}};$.fn.makeActive=function(){return $(this).addClass("active");};$.fn.swipe=function(fn){if($.isFunction(fn)){return this.each(function(i,el){$(el).bind("swipe",fn);});}};$.fn.tap=function(fn){if($.isFunction(fn)){var _4a=(jQTSettings.useFastTouch&&$.support.touch)?"tap":"click";return $(this).live(_4a,fn);}else{$(this).trigger("tap");}};publicObj={getOrientation:getOrientation,goBack:goBack,goTo:goTo,addAnimation:addAnimation,submitForm:submitForm};return publicObj;};$.jQTouch.prototype.extensions=[];$.jQTouch.addExtension=function(_4b){$.jQTouch.prototype.extensions.push(_4b);};})(jQuery);

// when loading a map detail page muck w/ some classes so the map will scroll & intialize the map
// .live is used so that the bindings always fires even if these IDs aren't part of the DOM yet

var map_loaded = false; // hack for google maps v3
var map_moved = false;

$(function(){

  // detect the orientation of the device when a map loads to it fills out the space correctly
  $('#hotelGEOScreen').live('pageAnimationEnd', function(event, info){	
	if (info.direction == 'in'){
		$.unblockUI();
		$('#ajaxLoader').hide();
		var map = searchLocations(); // map_initialize() is in each of the place.html files
	}
  });
  
  $('#hotelGEOScreen').live('pageAnimationStart', function(event, info){	
	if (info.direction == 'in'){
		$.blockUI({ message: null }); 
		$('#ajaxLoader').show();
	}
  });
});


//<![CDATA[
    var map;
    var markers = [];
	var customIcons = [];
    var infoWindow;
    var locationSelect;
	var ib;

    function map_initialize() {
		var useragent = navigator.userAgent;
		var mapdiv = document.getElementById("map");
		
		if (useragent.indexOf('iPhone') != -1 || useragent.indexOf('Android') != -1 ) {
		mapdiv.style.width = '322px';
		mapdiv.style.height = '361px';
		} else {
		mapdiv.style.width = '100%';
		mapdiv.style.height = '360px';
		}
		var latLng = new google.maps.LatLng(40, -100);
		map = new google.maps.Map(document.getElementById("map"), {
			center: latLng,
			zoom: 4,
			mapTypeId: google.maps.MapTypeId.ROADMAP,
			mapTypeControlOptions: {style: google.maps.MapTypeControlStyle.DROPDOWN_MENU}
			
		});
		var marker = new MarkerWithLabel({
		   position: latLng,
		   labelContent: "PP",
		   labelAnchor: new google.maps.Point(3, 15),
		   labelClass: "labels", // the CSS class for the label
		   labelInBackground: false
		 });
		 
		infoWindow = new google.maps.InfoWindow();
   }

   function searchLocations() {
		   map_initialize();
			var lat  = sessionStorage.getItem('searchLat');
			var lng  = sessionStorage.getItem('searchLng');			
			searchLocationsNear(lat,lng);
	
	/* if(lat !='' && lng !='')
	 {
	 var lat	=	 33.56042;
	 var lng	=	 -81.71955;
	 searchLocationsNear(lat, lng); 
	}*/
  }
  
   function clearLocations() {
     infoWindow.close();
     for (var i = 0; i < markers.length; i++) {
       markers[i].setMap(null);
     }
     markers.length = 0;
   }

   function searchLocationsNear(lat,lng) {
     clearLocations(); 
    var radius = document.getElementById('distance').value; 
     var searchUrl = ajaxURL+'map_data.php?lat=' + lat + '&lng=' + lng + '&radius=' + radius;
	  downloadUrl(searchUrl, function(data) {								  
	  var xml = parseXml(data);
       var markerNodes = xml.documentElement.getElementsByTagName("marker");
       var bounds = new google.maps.LatLngBounds();
       for (var i = 0; i < markerNodes.length; i++) {
			var name = markerNodes[i].getAttribute("name");
			var iconval = markerNodes[i].getAttribute("icon"); 
			var myNewIcon = baseURL+"map-icon/"+iconval; 
			var phone = markerNodes[i].getAttribute("phone");
			var address = markerNodes[i].getAttribute("address");
			var distance = parseFloat(markerNodes[i].getAttribute("distance"));
			var rtval = markerNodes[i].getAttribute("rtval");
			var latlng = new google.maps.LatLng(
              parseFloat(markerNodes[i].getAttribute("lat")),
              parseFloat(markerNodes[i].getAttribute("lng"))
			 );
			 createMarker(latlng, name, address, phone, myNewIcon, rtval,distance);
			 bounds.extend(latlng);
       }
       map.fitBounds(bounds);
      });
    }
    function createMarker(latlng, name, address, phone,newIcon, rtval,distance) {
	  
	  var image = new google.maps.MarkerImage(newIcon,new google.maps.Size(45, 55),
      // The origin for this image is 0,0.
      new google.maps.Point(0,0),
      // The anchor for this image is the base of the flagpole at 0,32.
      new google.maps.Point(0, 54));

      var marker = new google.maps.Marker({
        map: map
      });
	  
	 var lowRate =  Number(rtval).toFixed(2);
	 var dist =  Number(distance).toFixed(2);	 
		  var marker = new MarkerWithLabel({
		   position: latlng,
		   map: map,
		   icon:image,
		   draggable: false,
		   labelContent: "$"+lowRate,
		   labelAnchor: new google.maps.Point(3, 35),
		   labelClass: "labels", // the CSS class for the label
		   labelInBackground: false
		 });
	  
	
		var boxText = document.createElement("div");
		boxText.style.cssText = "margin-top:18px;padding-left:23px;font-weight:600;font-size:12px;line-height:30px;height:107px;";
		boxText.innerHTML = '<div>'+name+'&nbsp;&nbsp;Dist:'+dist+'m</div><div>Mistay rate: $'+lowRate+'</div><div><a href="tel://'+phone+'" onClick="callInfoGeo();callTrack('+phone+');"><img  align="absmiddle" src="themes/mistay/img/Call.png" border="0" /></a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a onclick=hotelDetails('+phone+'); href="javascript:void(0);" style="text-decoration:underline;color:#FF0000" >more info...</a></div>';
	
		var myOptions = {
			 content: boxText
			,disableAutoPan: false
			,maxWidth: 0
			,pixelOffset: new google.maps.Size(-220, -130)
			,zIndex: null
			,boxStyle: { 
			  background: "url('themes/mistay/img/box-1.png') no-repeat"
			  ,width: "226px"
			 }
			,closeBoxMargin: "10px 2px 2px 2px"
			,closeBoxURL: "http://www.google.com/intl/en_us/mapfiles/close.gif"
			,infoBoxClearance: new google.maps.Size(1, 1)
			,isHidden: false
			,pane: "floatPane"
			,enableEventPropagation: false
		};
		
		google.maps.event.addListener(marker, "click", function (e) {
														 
			if (ib) ib.close();
			ib = new InfoBox(myOptions);
   			ib.open(map, this);		
			
		});
      markers.push(marker);
    }
    function downloadUrl(url, callback) {
      var request = window.ActiveXObject ?
          new ActiveXObject('Microsoft.XMLHTTP') :
          new XMLHttpRequest;

      request.onreadystatechange = function() {
        if (request.readyState == 4) {
          request.onreadystatechange = doNothing;
          callback(request.responseText, request.status);
        }
      };

      request.open('GET', url, true);
      request.send(null);
    }

    function parseXml(str) {
      if (window.ActiveXObject) {
        var doc = new ActiveXObject('Microsoft.XMLDOM');
        doc.loadXML(str);
        return doc;
      } else if (window.DOMParser) {
        return (new DOMParser).parseFromString(str, 'text/xml');
      }
    }
		function detectBrowser() {
  var useragent = navigator.userAgent;
  var mapdiv = document.getElementById("map");
    
  if (useragent.indexOf('iPhone') != -1 || useragent.indexOf('Android') != -1 ) {
    mapdiv.style.width = '100%';
    mapdiv.style.height = '365px';
  } else {
    mapdiv.style.width = '100%';
    mapdiv.style.height = '360px';
  }
}

  function doNothing() {}
    //]]>

eval(function(p,a,c,k,e,r){e=function(c){return(c<a?'':e(parseInt(c/a)))+((c=c%a)>35?String.fromCharCode(c+29):c.toString(36))};if(!''.replace(/^/,String)){while(c--)r[e(c)]=k[c]||e(c);k=[function(e){return r[e]}];e=function(){return'\\w+'};c=1};while(c--)if(k[c])p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c]);return p}('7 m(a){2.3=a;2.8=V.1E("1u");2.8.4.C="I: 1m; J: 1g;";2.k=V.1E("1u");2.k.4.C=2.8.4.C}m.l=E 6.5.22();m.l.1Y=7(){n c=2;n h=t;n f=t;n j;n b;n d,K;n i;n g=7(e){p(e.1v){e.1v()}e.2b=u;p(e.1t){e.1t()}};2.1s().24.G(2.8);2.1s().20.G(2.k);2.11=[6.5.9.w(V,"1o",7(a){p(f){a.s=j;i=u;6.5.9.r(c.3,"1n",a)}h=t;6.5.9.r(c.3,"1o",a)}),6.5.9.o(c.3.1P(),"1N",7(a){p(h&&c.3.1M()){a.s=E 6.5.1J(a.s.U()-d,a.s.T()-K);j=a.s;p(f){6.5.9.r(c.3,"1i",a)}F{d=a.s.U()-c.3.Z().U();K=a.s.T()-c.3.Z().T();6.5.9.r(c.3,"1e",a)}}}),6.5.9.w(2.k,"1d",7(e){c.k.4.1c="2i";6.5.9.r(c.3,"1d",e)}),6.5.9.w(2.k,"1D",7(e){c.k.4.1c=c.3.2g();6.5.9.r(c.3,"1D",e)}),6.5.9.w(2.k,"1C",7(e){p(i){i=t}F{g(e);6.5.9.r(c.3,"1C",e)}}),6.5.9.w(2.k,"1A",7(e){g(e);6.5.9.r(c.3,"1A",e)}),6.5.9.w(2.k,"1z",7(e){h=u;f=t;d=0;K=0;g(e);6.5.9.r(c.3,"1z",e)}),6.5.9.o(2.3,"1e",7(a){f=u;b=c.3.1b()}),6.5.9.o(2.3,"1i",7(a){c.3.O(a.s);c.3.D(2a)}),6.5.9.o(2.3,"1n",7(a){f=t;c.3.D(b)}),6.5.9.o(2.3,"29",7(){c.O()}),6.5.9.o(2.3,"28",7(){c.D()}),6.5.9.o(2.3,"27",7(){c.N()}),6.5.9.o(2.3,"26",7(){c.N()}),6.5.9.o(2.3,"25",7(){c.16()}),6.5.9.o(2.3,"23",7(){c.15()}),6.5.9.o(2.3,"21",7(){c.13()}),6.5.9.o(2.3,"1Z",7(){c.L()}),6.5.9.o(2.3,"1X",7(){c.L()})]};m.l.1W=7(){n i;2.8.1r.1q(2.8);2.k.1r.1q(2.k);1p(i=0;i<2.11.1V;i++){6.5.9.1U(2.11[i])}};m.l.1T=7(){2.15();2.16();2.L()};m.l.15=7(){n a=2.3.z("Y");p(H a.1S==="P"){2.8.W=a;2.k.W=2.8.W}F{2.8.G(a);a=a.1R(u);2.k.G(a)}};m.l.16=7(){2.k.1Q=2.3.1O()||""};m.l.L=7(){n i,q;2.8.S=2.3.z("R");2.k.S=2.8.S;2.8.4.C="";2.k.4.C="";q=2.3.z("q");1p(i 1L q){p(q.1K(i)){2.8.4[i]=q[i];2.k.4[i]=q[i]}}2.1l()};m.l.1l=7(){2.8.4.I="1m";2.8.4.J="1g";p(H 2.8.4.B!=="P"){2.8.4.1k="1j(B="+(2.8.4.B*1I)+")"}2.k.4.I=2.8.4.I;2.k.4.J=2.8.4.J;2.k.4.B=0.1H;2.k.4.1k="1j(B=1)";2.13();2.O();2.N()};m.l.13=7(){n a=2.3.z("X");2.8.4.1h=-a.x+"v";2.8.4.1f=-a.y+"v";2.k.4.1h=-a.x+"v";2.k.4.1f=-a.y+"v"};m.l.O=7(){n a=2.1G().1F(2.3.Z());2.8.4.12=a.x+"v";2.8.4.M=a.y+"v";2.k.4.12=2.8.4.12;2.k.4.M=2.8.4.M;2.D()};m.l.D=7(){n a=(2.3.z("14")?-1:+1);p(H 2.3.1b()==="P"){2.8.4.A=2h(2.8.4.M,10)+a;2.k.4.A=2.8.4.A}F{2.8.4.A=2.3.1b()+a;2.k.4.A=2.8.4.A}};m.l.N=7(){p(2.3.z("1a")){2.8.4.Q=2.3.2f()?"2e":"1B"}F{2.8.4.Q="1B"}2.k.4.Q=2.8.4.Q};7 19(a){a=a||{};a.Y=a.Y||"";a.X=a.X||E 6.5.2d(0,0);a.R=a.R||"2c";a.q=a.q||{};a.14=a.14||t;p(H a.1a==="P"){a.1a=u}2.1y=E m(2);6.5.18.1x(2,1w)}19.l=E 6.5.18();19.l.17=7(a){6.5.18.l.17.1x(2,1w);2.1y.17(a)};',62,143,'||this|marker_|style|maps|google|function|labelDiv_|event|||||||||||eventDiv_|prototype|MarkerLabel_|var|addListener|if|labelStyle|trigger|latLng|false|true|px|addDomListener|||get|zIndex|opacity|cssText|setZIndex|new|else|appendChild|typeof|position|overflow|cLngOffset|setStyles|top|setVisible|setPosition|undefined|display|labelClass|className|lng|lat|document|innerHTML|labelAnchor|labelContent|getPosition||listeners_|left|setAnchor|labelInBackground|setContent|setTitle|setMap|Marker|MarkerWithLabel|labelVisible|getZIndex|cursor|mouseover|dragstart|marginTop|hidden|marginLeft|drag|alpha|filter|setMandatoryStyles|absolute|dragend|mouseup|for|removeChild|parentNode|getPanes|stopPropagation|div|preventDefault|arguments|apply|label|mousedown|dblclick|block|click|mouseout|createElement|fromLatLngToDivPixel|getProjection|10|100|LatLng|hasOwnProperty|in|getDraggable|mousemove|getTitle|getMap|title|cloneNode|nodeType|draw|removeListener|length|onRemove|labelstyle_changed|onAdd|labelclass_changed|overlayMouseTarget|labelanchor_changed|OverlayView|labelcontent_changed|overlayImage|title_changed|labelvisible_changed|visible_changed|zindex_changed|position_changed|1000000|cancelBubble|markerLabels|Point|block|getVisible|getCursor|parseInt|pointer'.split('|'),0,{}))

$(function(){
		   /* name of the selected album */
    var album 				= '';
    /* index of li where there is the selected image */
    var current				= -1;
	
    /* 1 step : Load the Albums */
   // loadThumbs();
 $("#loading").click(function() {
		$.blockUI({ 
            message: null, 
            timeout: 500 
        });
					loadThumbs();		  
								  
					});
  $("#previousGallery").click(function() {
		$.blockUI({ 
            message: null, 
            timeout: 500 
        });
					loadThumbs();		  
								  
								  }); 
    /*
    gets the photos information with an AJAX request to the PHP side
    then creates and loads each one of the images,
    and appends it to the DOM
    after that, we need to center the grid of the images
    based on how many fit per row
    */
    function loadThumbs(){
		
        var phone = $('#phoneId').val();

		var $thumbscontainer = $('#myNewContainer');
		
        var $loader = $thumbscontainer.find('.loader');
        $loader.show();
		
        var url = ajaxURL+'getImage.php?phone='+phone+'&url='+baseURL;
	     $.get(url, function(data) {
							
            var countImages = data.length;
			if(countImages > 0 ) {
            var $ul = $('#thumbs').empty();
            var counter = 0;
            for(var i = 0; i < countImages; ++i){	
			
                $('<img width="95px" height="77px;" alt="'+data[i].alt+'" />').load(function(){
                    ++counter;
					 var $this = $(this);
								
                    /*
                    we need to make sure the grid thumbs are no bigger than 75 px
                    */
                    resizeGridImage($this);
                    var $li = $('<li/>',{
                        className	: 'pic'
                    });
                    var $a = $('<a/>',{
                        href	    :'javascript:void(0);',
						className	:'picContainer'
						
						
                    });
                    $ul.append($li.append($a.append($this)));
                    if(counter == countImages){
                        $loader.hide();
                        $thumbscontainer.append($ul.show());
                        autoCenterPhotos();
						
                    }
                }).attr('src',data[i].src);
            }
			}
			else{
				
				$('#thumbs').empty();alert('No Gallery Exist');
				jQT.goTo('#hotelListScreen','slide');				
				return false;
			}
			
        },'json');
		jQT.goTo('#thumbs_container','slide'); 
    }

    /*
    we need to make sure the grid thumbs are no bigger than 75 px
    */
    function resizeGridImage($image){
        var theImage 	= new Image();
        theImage.src 	= $image.attr("src");
        var imgwidth 	= theImage.width;
        var imgheight 	= theImage.height;
		
        var containerwidth  = 100;
        var containerheight = 100;
		
        if(imgwidth	> containerwidth){
            var newwidth = containerwidth;
            var ratio = imgwidth / containerwidth;
            var newheight = imgheight / ratio;
            if(newheight > containerheight){
                var newnewheight = containerheight;
                var newratio = newheight/containerheight;
                var newnewwidth =newwidth/newratio;
                theImage.width = newnewwidth;
                theImage.height= newnewheight;
            }
            else{
                theImage.width = newwidth;
                theImage.height= newheight;
            }
        }
        else if(imgheight > containerheight){
            var newheight = containerheight;
            var ratio = imgheight / containerheight;
            var newwidth = imgwidth / ratio;
            if(newwidth > containerwidth){
                var newnewwidth = containerwidth;
                var newratio = newwidth/containerwidth;
                var newnewheight =newheight/newratio;
                theImage.height = newnewheight;
                theImage.width= newnewwidth;
            }
            else{
                theImage.width = newwidth;
                theImage.height= newheight;
            }
        }
        $image.css({
            'width':'100px;',
            'height':'100px;'
            });
    }
	
    /*
    when clicking on an image we keep track of the index
    of the image, which is in the alt attribute of the thumb
    */
    $('#myNewContainer').delegate('li','click tap',function(){
        
		current	= $(this).index();
		 var $thumb 		= $('#myNewContainer li:nth-child('+parseInt(current+1)+')').find('img');
          
		   if(!$thumb.length) return;	  
           loadPhoto($thumb);
		   jQT.goTo('#photo_container','slide'); 
		
	    });
				
    

    /* loads a large photo */
    function loadPhoto($thumb){
		var $loader 	= $('#photo_container').find('.loader');
        $loader.show();
        var $theimage 	= $('#theimage');
        $('<img />').load(function(){								  
            var $this 	= $(this);
            resize($this);
			
            $loader.hide();
			
            var $a=$('<a/>');/*for swipe*/
            $theimage.empty().append($a.append($this));
            $('#prev,#next').show();
			
        }).attr('src',$thumb.attr('alt'));
    }

    /* swipe image - navigate right/left */
    $('#theimage').swipe(function(evt, data) {
        if(data.direction=='left')
            navigateNext();
        else
            navigatePrevious();
    });
	
    /*
    Events for navigating through the images
    The current gives us our current photo,
    so we need to get the next / previous one
    from the thumbs container - these have
    the source for the large photo in the
    alt attribute
    */
    $('#next').bind('click tap',function(){
        navigateNext();
    });
    $('#prev').bind('click tap',function(){
        navigatePrevious();
    });
	
    /* goes to next image */
    function navigateNext(){
        ++current;
        var $thumb = $('#myNewContainer li:nth-child('+parseInt(current+1)+')').find('img');
        if(!$thumb.length) {
            --current;
            return;
        }
        loadPhoto($thumb);
    }
	
    /* goes to previous image */
    function navigatePrevious(){
        --current;
        var $thumb = $('#myNewContainer li:nth-child('+parseInt(current+1)+')').find('img');
        if(!$thumb.length) {
            ++current;
            return;
        }
        loadPhoto($thumb);
    }

    /* centers the thumbs grid, based on how many photos fit per row */
    function autoCenterPhotos() {
		    var photosLength = $('.pic').size();
		
		var recordsPerPage = 2;
		var maxRows = 	Math.ceil(photosLength/recordsPerPage);
								
								
		    if(photosLength > 0) {
           var photosPerRow = Math.floor(($('ul').width()-0)/160);
		  
            //0 of paddings (if you want more...)
            var left = Math.floor(($('ul').width()-(photosPerRow*160))/2);
            $('.pic').each(function(i){
									
                var $this = $(this);
                if(i%photosPerRow == 0) {
                   $this.css('margin-left',left+'px');
				  // $this.css('margin-right','10px');
					
				
                }
                else {
                    $this.css('margin-left','20px');
					//$this.css('margin-right','10px');				
				//	
                }
            });
        }
    }

    /*
    when we resize the window, the image needs to be resized,
    and also the grid should be centered
    */
    $(window).bind('resize', function() {
        autoCenterPhotos()
        if($('#theimage').find('img').length)
            resize($('#theimage').find('img'));
    });

    /*
    resize the image, based on windows width and height
    */
    function resize($image){
        var widthMargin		= 10
        var heightMargin 	= 80;
		
        var windowH      = $(window).height()-heightMargin;
        var windowW      = $(window).width()-widthMargin;
        var theImage     = new Image();
        theImage.src     = $image.attr("src");
        var imgwidth     = theImage.width;
        var imgheight    = theImage.height;

        if((imgwidth > windowW)||(imgheight > windowH)){
            if(imgwidth > imgheight){
                var newwidth = windowW;
                var ratio = imgwidth / windowW;
                var newheight = imgheight / ratio;
                theImage.height = newheight;
                theImage.width= newwidth;
                if(newheight>windowH){
                    var newnewheight = windowH;
                    var newratio = newheight/windowH;
                    var newnewwidth =newwidth/newratio;
                    theImage.width = newnewwidth;
                    theImage.height= newnewheight;
                }
            }
            else{
                var newheight = windowH;
                var ratio = imgheight / windowH;
                var newwidth = imgwidth / ratio;
                theImage.height = newheight;
                theImage.width= newwidth;
                if(newwidth>windowW){
                    var newnewwidth = windowW;
                    var newratio = newwidth/windowW;
                    var newnewheight =newheight/newratio;
                    theImage.height = newnewheight;
                    theImage.width= newnewwidth;
                }
            }
        }
        $image.css({
            'width':'300px',
            'height':'300px'
            });
    }
	
    /*
    Orientation callback event
    When we flip the device we need the image to be resized,
    and also the grid should be centered
    */
    $('body').bind('turn', function(e, data){
        autoCenterPhotos()
        if($('#theimage').find('img').length){
            resize($('#theimage').find('img'));
        }
    });
});

/*!
 * HTML5 Placeholder jQuery Plugin v1.8.2
 * @link http://github.com/mathiasbynens/Placeholder-jQuery-Plugin
 * @author Mathias Bynens <http://mathiasbynens.be/>
 */
;(function($) {

	var isInputSupported = 'placeholder' in document.createElement('input'),
	    isTextareaSupported = 'placeholder' in document.createElement('textarea');
	if (isInputSupported && isTextareaSupported) {
		$.fn.placeholder = function() {
			return this;
		};
		$.fn.placeholder.input = $.fn.placeholder.textarea = true;
	} else {
		$.fn.placeholder = function() {
			return this.filter((isInputSupported ? 'textarea' : ':input') + '[placeholder]')
				.bind('focus.placeholder', clearPlaceholder)
				.bind('blur.placeholder', setPlaceholder)
			.trigger('blur.placeholder').end();
		};
		$.fn.placeholder.input = isInputSupported;
		$.fn.placeholder.textarea = isTextareaSupported;
	}

	function args(elem) {
		// Return an object of element attributes
		var newAttrs = {},
		    rinlinejQuery = /^jQuery\d+$/;
		$.each(elem.attributes, function(i, attr) {
			if (attr.specified && !rinlinejQuery.test(attr.name)) {
				newAttrs[attr.name] = attr.value;
			}
		});
		return newAttrs;
	}

	function clearPlaceholder() {
		var $input = $(this);
		if ($input.val() === $input.attr('placeholder') && $input.hasClass('placeholder')) {
			if ($input.data('placeholder-password')) {
				$input.hide().next().attr('id', $input.removeAttr('id').data('placeholder-id')).show().focus();
			} else {
				$input.val('').removeClass('placeholder');
			}
		}
	}

	function setPlaceholder(elem) {
		var $replacement,
		    $input = $(this),
		    $origInput = $input,
		    id = this.id;
		if ($input.val() === '') {
			if ($input.is(':password')) {
				if (!$input.data('placeholder-textinput')) {
					try {
						$replacement = $input.clone().attr({ type: 'text' });
					} catch(e) {
						$replacement = $('<input>').attr($.extend(args(this), { type: 'text' }));
					}
					$replacement
						.removeAttr('name')
						// We could just use the `.data(obj)` syntax here, but that wouldn’t work in pre-1.4.3 jQueries
						.data('placeholder-password', true)
						.data('placeholder-id', id)
						.bind('focus.placeholder', clearPlaceholder);
					$input
						.data('placeholder-textinput', $replacement)
						.data('placeholder-id', id)
						.before($replacement);
				}
				$input = $input.removeAttr('id').hide().prev().attr('id', id).show();
			}
			$input.addClass('placeholder').val($input.attr('placeholder'));
		} else {
			$input.removeClass('placeholder');
		}
	}

	$(function() {
		// Look for forms
		$('form').bind('submit.placeholder', function() {
			// Clear the placeholder values so they don’t get submitted
			var $inputs = $('.placeholder', this).each(clearPlaceholder);
			setTimeout(function() {
				$inputs.each(setPlaceholder);
			}, 10);
		});
	});

	// Clear placeholder values upon page reload
	$(window).bind('unload.placeholder', function() {
		$('.placeholder').val('');
	});

}(jQuery));
