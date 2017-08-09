






























    document.addEventListener('deviceready', function() {
        navigator.splashscreen.hide()

        //$('<p/>').text('PhoneGap ready!').appendTo($('body'))

        actionBarSherlockTabBar = cordova.require('cordova/plugin/actionBarSherlockTabBar');
        /*
        actionBarSherlockTabBar.setTabSelectedListener(function(tabTag) {
            
            goToTab("tab3",tabTag, false);
            
        })*/
    }, false)


var db;

function initDb(name){
	db=window.openDatabase("Database", "1.0", name, 9000000);	
}

function queryDb(sql_query, successHandler, errorHandler){
	if (!errorHandler) errorHandler=errorCB;
	logDisplay(sql_query);
	db.transaction(
		function(tx){
			tx.executeSql(sql_query,[],
				function(tx,res){
					var result=[];
					for (var i=0;i<res.rows.length;i++){
						result.push(res.rows.item(i));
					}
					logDisplay(result.length);
					successHandler(result);
				}, errorHandler)
		}
	);
}



function errorCB(err){
	logDisplay(err);
}



var Localization;

Localization = (function() {

  function Localization() {}

  Localization.initialize = function(dictionnary, fallback_language) {
    Localization.dictionnary = dictionnary;
	//logDisplay(JSON.encode(Localization.dictionnary));
    Localization.fallback_language = fallback_language;
    
    return navigator.globalization.getLocaleName(Localization.get_preferred_language_callback, Localization.get_preferred_language_error_callback);
  };

  Localization.get_preferred_language_callback = function(language) {
    Localization.language = language.value.substring(0,2);
    console.log("Phone language is " + Localization.language);
    if (Localization.language in Localization.dictionnary) {
      console.log("It is supported.");
    } else {
      Localization.language = Localization.fallback_language;
      console.log("It is unsupported, so we chose " + Localization.language + " instead.");
    }
    return Localization.apply_to_current_html();
  };

  Localization.get_preferred_language_error_callback = function() {
    Localization.language = Localization.fallback_language;
    console.log("There was an error determining the language, so we chose " + Localization.language + ".");
    return Localization.apply_to_current_html();
  };

  Localization.apply_to_current_html = function() {
    var key, value, _ref, _results;
    console.log("Localizing HTML file.");
    _ref = Localization.dictionnary[Localization.language];
    _results = [];
    for (key in _ref) {
      value = _ref[key];
      _results.push($(".l10n-" + key).html(value));
    }
    return _results;
  };

  Localization["for"] = function(key) {
	  //logDisplay(Localization.language+":"+key);
	if (typeof Localization.language=='undefined'){
		logDisplay("Localization.language is undefined, init from default lang:"+defaultLang);
		Localization.language=defaultLang;
	}
    return Localization.dictionnary[Localization.language][key];
  };

  return Localization;

})();

var gallery_paged=1;
var current_tab="";
var picture_category=1;
var upload_picture_category=1;
var pictureSource;   // picture source
var destinationType; // sets the format of returned value 
var news_lead = "";
var news_url = "";
var newstitle = "";
var picturefbshare = "";
function goToTab(id, page, scroll, trans){
	
    //logDisplay(id+":"+page+":"+scroll+"!!!!!!!!!!!!!!!!!!!!!!!!");
    //TODO analytics log
    
    if (user_data.user_name || page == "page_privacy_no_datas" || id == "tab50")
    	{
    
    switch (page){
	case "page_news_list":
	    listNews();
	    
	    break;
	case "page_gallery":
		var storage = window.localStorage;
		
	    showPictures(picture_category,$('#pictype').val());
	    
	    if (storage.getItem("first_gallery_view")!="1"){
			showMessage("Itt találod az általad, és mások által feltöltött fotókat, melyek célja, hogy elterelje a gondolataidat a dohányzásról. A fenti gombok segítségével kiválaszthatod, hogy \n\
	a legfrissebb, a legnépszerűbb, vagy a saját képeidet akarod látni. Ezen belül a jobb-felső sarokban található csúszkával szűrheted a listát, a + jelnél pozitív töltetű képeket, a - jelnél elrettentő fotókat találsz.\n\
	A 'Feltöltök egy képet' gombra nyomva egy általad készített képet adhatsz hozzá a saját képeidhez. A saját képeid közül a 'Megosztás' gombbal tudod megosztani a fotót a többiekkel. Amelyik képet nem osztod meg, azt a többi felhasználó nem látja!", "Súgó")
			storage.setItem("first_gallery_view","1");	    
		    }
	    break;
    }	
    hideMap();
    
    //alert(user_data.leszokas_datum+" - "+user_data.user_name);
    //if (!scroll && scroll!=false) scroll=false;
    
    window.plugins.analytics.trackPageView("/android/"+page, function(){}, function(){});
    
    $.mobile.changePage("#"+page, false, false, true);
    
    
    
    current_tab=id;
    	}
    else
    	{
    	

        // Show a custom alertDismissed
        //
        
            navigator.notification.alert(
                'Kérem továbblépés előtt töltse ki a hiányzó adatokat!',  // message
                alertDismissed,         // callback
                'Kérem adja meg adatait!',            // title
                'Rendben'                  // buttonName
            );
        

    	
    	
    	}

}

function onSwitchTab(tabTag) {
	
	switch (tabTag)
	{
		case "page_main":
			logDisplay("page_main");
			goToTab('tab1','page_main',false);  
			break;
		case "page_gallery":
			logDisplay("page_gallery");
			goToTab('tab2','page_gallery',false);  
			break;
		case "page_news_list":
			logDisplay("page_news_list");
			goToTab('tab3','page_news_list',false);  
			break;
		case "page_more":
			logDisplay("page_more");
			goToTab('tab4','page_more',false);  
			break;
	}
}


function saveUserData() {
						
    //logDisplay("saveUserData");
    if ($("#user_name").val()=="" || $("#smoke_start").val()=="" || $("#daily_smoke").val()=="Napi mennyiség (szál)*" || $("#box_price").val()=="1 doboz ára (Ft)*" || $("#daily_smoke").val()=="" || $("#box_price").val()==""){
    	showMessage("A *-al jelölt mezők kitöltése kötelező!","Hiba");
    	return false;
        }
    
    
    /*
     * Dátumok ellenőrzése
     * leszokás dátuma
     */
    var current_date = new Date();
    if ($("#smoke_end").val() <= current_date.toISOString().substr(0, 10)) {
        if ($("#smoke_end").val() >= $("#smoke_start").val()) {
            $("#smoke_end").val($("#smoke_end").val());
        } else {
        	showMessage("A leszokás dátuma nagyobb legyen, mint a dohányzás kezdete!","Hiba");
        	return false;
        }
        
    } else {
    	showMessage("A leszokás dátuma csak múltbeli dátum lehet!","Hiba");
    	return false;
    }
    
    /*
     * Dátum ellenőrzés
     * dohányzás kezdete kisebb legyen mint a leszokás
     */
    if ($("#smoke_start").val() <= $("#smoke_end").val()) {
        $("#smoke_start").val($("#smoke_start").val());
    } else {
    	showMessage("A dohányzás kezdete korábbi dátum legyen, mint a leszokás dátuma!","Hiba");
    	return false;
    }
    
    /*
     * Dátumok ellenőrzése vége
     */
    
    /*
     * Csak pozitív számok ellenőrzése
     */
    if ($("#box_price").val() <= 0) {
    	showMessage("Kérem adja meg a doboz árát!","Hiba");
    	return false;
    }
    if ($("#daily_smoke").val() <= 0) {
    	showMessage("Kérem adja meg a napi mennyiséget!","Hiba");
    	return false;
    }
    /*
     * Csak pozitív számok ellenőrzése vége
     */
    
    
    
    $.ajax({
							   
	url: siteUrl+'ajax/saveuser',
	type: 'POST',
	data: $("#profil_form").serialize(),
	cache: false,
	success: function(data) {
		
	    if (data){
							   
	    }
							   
	},
	beforeSend: function(xhr){
	    xhr.setRequestHeader('Securitycode','elsosegelymobil');
	    xhr.setRequestHeader('Passkey','wbelsosegely2012');
	},
	error:function(xhr,ajaxOptions, thrownError){
							   
							   
	}
							   
    });
    setUserDatas();
    return false;
						
				
}

function sendPicture(id) {						
	
    navigator.notification.confirm(
	'Biztosan meg akarod osztani a képet? Megosztás után a többi felhasználó is látni fogja a fotót!',
	function(buttonIndex){
	    if (buttonIndex==1){
		db.transaction(function(tx){
		    tx.executeSql("SELECT * FROM user_images WHERE id="+id,[],function(tx,results){
			//logDisplay("send picture to server");	    
			//logDisplay(window.localStorage.getItem(id));
			$.ajax({	
				timeout: 10000,
				url: siteUrl+'ajax/sendpicture',
			    type: 'POST',
			    data: {
				"user_id":device.uuid, 
				"filename":device.uuid+"_"+id+".jpg",
				"type":results.rows.item(0).type,
				"image_data":window.localStorage.getItem(id)
			    },
			    cache: false,
			    success: function(data) {
				//logDisplay(data);
				if (data){
							   
				}
							   
			    },
			    beforeSend: function(xhr){
				xhr.setRequestHeader('Securitycode','elsosegelymobil');
				xhr.setRequestHeader('Passkey','wbelsosegely2012');
			    },
			    error:function(xhr,ajaxOptions, thrownError){							   
			    }
							   
			});
	    
		    });  
		}, errorCB);		
	
	    }	    
	},
	'Biztos megosztod?',
	'Megosztom,Mégsem'
	);
}


function listNews(){
    queryDb("SELECT id, title FROM news WHERE 1", loadNewsList);
}

function loadNewsList(result){
    $("#news-list").html("");
    for (var i=0;i<result.length;i++){
	$("#news-list").append('<li class="list-element retina"><a href="#" class="list-element-a" onClick=\'showNews('+result[i].id+')\'>'+result[i].title+'</a></li>');		
    }	
		
}

function showNews(id){
    queryDb("SELECT * FROM news WHERE id="+id, loadNews);
}

function loadNews(result){
    $("#news_title").html(result[0].title);
    newstitle = result[0].title;
    $("#news_lead").html(result[0].lead);
    news_lead = result[0].lead;
    $("#news_content").html(result[0].content);
    
    
    //$("#news_twitter").attr("onClick","twitterShare(\""+result[0].web_url+"\"");
    $("#news_twitter").attr("rel",result[0].web_url);
    news_url = result[0].web_url;
    
    //$("#news_facebook").attr("onClick","facebookShare(\""+result[0].web_url+"\"");
    $("#news_facebook").attr("rel",result[0].web_url);
    
    
    
    goToTab("tab3","page_news_content",true);
}


function votePic(id, point){
    //logDisplay("votePic: "+id+":"+point+"   url: "+siteUrl+"ajax/votephoto/"+device.uuid+"/"+id+"/"+point);
    
    $.get(siteUrl+"ajax/votephoto/"+device.uuid+"/"+id+"/"+point,
	function(data){
	    if (point==1){
		$("#like_num").html(parseInt($("#like_num").html())+1);
	    }
	    if (point==-1){
		$("#unlike_num").html(parseInt($("#unlike_num").html())+1);
	    }
	}
	);
	
}

function showPictures(category, type){
    var cat_url="";
    picture_category=category;
    $(".gallery_picture").attr("onClick","");
    $(".gallery_picture").attr("like","");
    $(".gallery_picture").attr("unlike","");
    $(".gallery_picture").html("");
    
    if (category==3){
	if (gallery_paged==1){
	    $("#gallery_pager1").hide();
	}else{
	    $("#gallery_pager1").show();	
	}
	db.transaction(function(tx){
	    tx.executeSql("SELECT * FROM user_images WHERE type="+type,[],function(tx,results){
		if (gallery_paged==parseInt(results.rows.length/4)+1){
		    $("#gallery_pager2").hide();
		}else{
		    $("#gallery_pager2").show();	
		}	    
		

	    
	    });  
	}, errorCB);		
	db.transaction(function(tx){
	    tx.executeSql("SELECT * FROM user_images WHERE type="+type+" LIMIT "+((gallery_paged-1)*4)+", 4",[],function(tx,results){
		var image;
		for (var i=0;i<results.rows.length;i++){
		    image=window.localStorage.getItem(results.rows.item(i).id);
		    $("#picture_"+(i+1)).html("<img src='"+"data:image/jpeg;base64,"+image+"' style=\"max-width:100%;\">");
		    $("#picture_"+(i+1)).attr("onClick","getPicture("+(i+1)+","+results.rows.item(i).id+");");		    
		}	    
		

	    
	    });  
	}, errorCB);	
    
    }else{
    	
		if (gallery_paged==1){
		    $("#gallery_pager1").hide();
		}else{
		    $("#gallery_pager1").show();	
		}
		$.get(siteUrl+"ajax/getphotocount/"+type+"/"+(Math.random()*100),
		    function(data){
			
			if (gallery_paged>=data/4){
			    $("#gallery_pager2").hide();
			}else{
			    $("#gallery_pager2").show();	
			}		
		    }
		
		    ); 
		if (category==1){
		    cat_url="legfrissebb";
		}else{
		    cat_url="legnepszerubb";
		}
		//logDisplay(siteUrl+"ajax/getphoto/"+cat_url+"/4/"+gallery_paged+"/"+type);
	
		$.get(siteUrl+"ajax/getphoto/"+cat_url+"/4/"+gallery_paged+"/"+type+"/"+(Math.random()*100),
		    function(data){
			//logDisplay($("#picture_1 img").attr("src"));
			if (data){
			    var photos=data.split("#");
			    var photo_item=new Array();
			    //logDisplay(data+":"+photos.length);
			    for (var i=0;i<photos.length;i++){			
				photo_item=photos[i].split("|");
				//logDisplay(siteUrl+photo_item[1]);
				$("#picture_"+(i+1)).html("<img src='"+siteUrl+photo_item[1]+"' style=\"max-width:100%;\">");
				$("#picture_"+(i+1)).attr("onClick","getPicture("+(i+1)+","+photo_item[0]+");");
				$("#picture_"+(i+1)).attr("like",photo_item[2]); 
				$("#picture_"+(i+1)).attr("unlike",photo_item[3]);
			    }	
			}
		    });
	
    }
}

function getPicture(id,sid){
    //logDisplay("Load picture: "+id+":"+sid);
    if (picture_category==3){
	$("#like_num").hide();
	$("#unlike_num").hide();
	db.transaction(function(tx){
	    tx.executeSql("SELECT * FROM user_images WHERE id="+sid,[],function(tx,results){
		if (results.rows.item(0).shared==0){
		    $("#share_picture").show();
		    $("#share_picture").attr("onClick","sendPicture("+sid+")");
		}else{
		    $("#share_picture").hide();
		}
	    });  
	}, errorCB);			
    }else{
	$("#share_picture").hide();
	$("#like_num").show();
	$("#unlike_num").show();
    }
    $("#current_picture img").attr("src",$("#picture_"+id+" img").attr("src"));
    //TODO kezeknek, facebook-, email logónak kell id-t adni html-ben
    $("#like_num").html($("#picture_"+id).attr("like"));
    $("#like_num").attr("onClick","votePic("+sid+",1);");
    $("#unlike_num").html($("#picture_"+id).attr("unlike"));
    $("#unlike_num").attr("onClick","votePic("+sid+",-1);");
    
    //$("#picture_fb_share").attr("onClick","facebookShare(\""+$("#picture_"+id+" img").attr("src")+"\", \"Kell a dohány?\");");
    
    $("#picture_fb_share").attr("rel",$("#picture_"+id+" img").attr("src"));
    picturefbshare = $("#picture_"+id+" img").attr("src");
    //$("#picture_email_share").attr("onClick","emailSharePic(\""+$("#picture_"+id+" img").attr("src")+"\");");
    
    $("#picture_email_share").attr("rel",$("#picture_"+id+" img").attr("src"));
    
    //alert($("#picture_email_share").attr("rel"));
    
    goToTab('tab2','page_picture');
    
}

function doSearch(){
    //logDisplay("Patikakeresés");
    
    navigator.geolocation.getCurrentPosition(onSuccessLocationSearch, onErrorLocation,{
	maximumAge: 5000, 
	timeout: 5000, 
	enableHighAccuracy: true
    }); 	
    
}

function loadBanners(){
    $(".banner").each(function(index){
	getBanner($(this).attr("id"));
    });	
}

function getBanner(zone){
    $.post(siteUrl+"ajax/getBannerbyzone/"+zone,
	function(data){
	    if (data){
		//logDisplay(data);
	    	//logDisplay("SHOWED HTML: "+window.localStorage.getItem("showed_html"));
            if (zone=="banner_promo" && window.localStorage.getItem("showed_html")!=data){
                logDisplay("new promo banner");
                window.localStorage.setItem("showed","false");
                window.localStorage.setItem("showed_html",data);
            }
		$("#"+zone).html(data);
		$("#"+zone).css("display","block");
		
	    }
	}
	);
}

function getPhoto(source) {
    // Retrieve image file location from specified source
	//logDisplay("getphoto!!!!");
    navigator.camera.getPicture(onPhotoDataSuccess, onFail1, {
	quality: 80, 
	destinationType: destinationType.DATA_URL,
	sourceType: source
    });
    logDisplay("getphoto!!!! end");
}

function capturePhoto() {
    // Take picture using device camera and retrieve image as base64-encoded string
    //logDisplay("capture photo");
    navigator.camera.getPicture(onPhotoDataSuccess, onFail1, {
	quality: 80, 
	destinationType: destinationType.DATA_URL,
	targetWidth: 600,
	targetHeight: 600,
	mediaType:0,
	
	correctOrientation: true
    });
    //logDisplay("capture photo end ");	
}

function onFail1(message) {
    alert('Failed because: ' + message);
}
function onPhotoDataSuccess(imageData) {
    var image="data:image/jpeg;base64,"+imageData;
    var storage = window.localStorage;

    db.transaction(function(tx){
	tx.executeSql("INSERT INTO user_images (type, shared) VALUES ("+upload_picture_category+",0)",[],function(tx,results){
	    picture_category=3;
	    storage.setItem(results.insertId,imageData);
	    $("#current_picture img").attr("src","data:image/jpeg;base64,"+imageData);
	    $("#like_num").hide();
	    $("#unlike_num").hide();
	    $("#share_picture").show();
	    $("#share_picture").attr("onClick","sendPicture("+results.insertId+")");
	    goToTab('tab2','page_picture');    
	    
	});  
    }, errorCB);
	
}


function showCameraOptions() {
    
    navigator.notification.confirm(
	'Kérlek, válaszd ki, milyen jellegű képet szeretnél feltölteni!',
	function(buttonIndex){
	    if (buttonIndex==1){
		upload_picture_category=2;
	
	    }else{
		upload_picture_category=1;
	    } 
	    
	    navigator.notification.confirm(
	    		'Kérlek, válassz!',
	    		function(buttonIndex){
	    		    if (buttonIndex==1){
	    		    	capturePhoto();
	    		
	    		    }else{
	    		    	getPhoto(pictureSource.SAVEDPHOTOALBUM);
	    		    } 
	    		    
	    		},
	    		'Honnan akarsz képet hozzáadni?',
	    		'Kamera,Fotóalbumból'
	    		); 
	    
	    
	    
	    
	},
	'Milyen képet akarsz hozzáadni?',
	'Elrettentő,Pozitív'
	);    

};

function smoke(index){
	
	if (index == 0)
	{
		db.transaction(function(tx){
			tx.executeSql("UPDATE user_data SET visszaszokott_nap=visszaszokott_nap+1");

		    }, errorCB);  
		    var user_data_fake={};
		    user_data_fake=user_data;
		    user_data={};
		    user_data.dohanyzas_kezdete=user_data_fake.dohanyzas_kezdete;
		    user_data.napi_mennyiseg=user_data_fake.napi_mennyiseg;
		    user_data.doboz_ara=user_data_fake.doboz_ara;
		    user_data.leszokas_datum=user_data_fake.leszokas_datum;
		    user_data.user_name=user_data_fake.user_name;
		    user_data.user_email=user_data_fake.user_email;
		    user_data.visszaszokott_nap=user_data_fake.visszaszokott_nap+1;
		    user_data.eml_napitipp_ido_type=user_data_fake.eml_napitipp_ido_type;
		    user_data.eml_egeszseg=user_data_fake.eml_egeszseg;
		    user_data.db_date=user_data_fake.db_date;
		    user_data.eml_napitipp=user_data_fake.eml_napitipp;
		    user_data.eml_napitipp_ido_type=user_data_fake.eml_napitipp_ido_type;
		    //logDisplay(user_data.visszaszokott_nap);
		    showMessage("Adataidat egy nappal visszaállítottuk, kitartás! Már közel állsz a sikeres leszokáshoz! Folytasd a leszokást, kérj segítséget a többiektől, vagy szakembertől!","Megbotlottam, de folytatom!");
		    setSettings();
		
		
		goToTab('tab3','page_main',true);   
	    
	    
	}
	else if (index == 1)
	{
	    goToTab("tab4","page_search",false);
	}            
	else if (index == 2)
	{
	    goToTab(current_tab,"page_abandon",false);
	}   
	
    
}

function padNumber(str, length) {
    str=str.toString();
    while (str.length < length) {
	str = '0' + str;
    }
    //logDisplay(str);
    return str;
}

function alertDismissed() {
	//$.mobile.changePage("#page-datas", "slide", false, true);
}

function showpopup(oldal)
{
                var x = new Date();
                x.setFullYear(2013, 5, 1);
                var y = new Date();
                y.setFullYear(2013, 6, 31);
                var today = new Date();
                var showed = window.localStorage.getItem("showed");
                
                logDisplay("SHOWPOPUP: " + oldal + " : " + window.localStorage.getItem("showed") + " : " + today.toString());
                
                //if (x < today && y > today && !showed)
            	if (window.localStorage.getItem("showed")=="false")
                {
            		logDisplay("SHOW POPUP PAGE");    
                               $.mobile.changePage("#page_popup", {
                                               transition: 'fade'
                               });
                                window.localStorage.setItem("showed", true);
                               
                }
                else
                {
                	logDisplay("NO SHOW POPUP PAGE");
                               $.mobile.changePage("#" + oldal, {
                                               transition: 'fade'
                               });
                }
}




var siteUrl="http://leszokas.webbeteg.hu/";

/*
 * Fótós cucchoz
 */
var pictureSource;   // picture source
var destinationType; // sets the format of returned value 

//var storage;

document.addEventListener("deviceready", onDeviceReady, false);

function onDeviceReady() {
	   
	$('.nativedatepicker').click(function(event) {
       
				if ($(this).val() == $(this).attr("rel")) {
					$(this).val("");

				}
				var currentField = $(this);

				var myNewDate = Date.parse(currentField.val().replace("-", "/")) || new Date();

				if (typeof myNewDate === "number") {
					myNewDate = new Date(myNewDate);
				}

				// Same handling for iPhone and Android
				window.plugins.datePicker.show({
					date: myNewDate,
					mode: 'date', // date or time or blank for both
					allowOldDates: true
				}, function(returnDate) {
					var newDate = new Date(returnDate);

					var datum = returnDate.split("/");

					datum[1] = padNumber(datum[1], 2);
					datum[2] = padNumber(datum[2], 2);

					currentField.val(datum[0] + "-" + datum[1] + "-" + datum[2]);

					currentField.blur();
				});
    });
    
        $("#user_name").click(function() {   
    	window.scrollTo(0,300);
    });
    $("#user_email").click(function() {
    	window.scrollTo(0,400);
    });
    $("#box_price").click(function() {
    	window.scrollTo(0,200);
    	if ($(this).val()==0) {
    		$(this).val('');
    	}
    });
    $("#daily_smoke").click(function() { 	
    	if ($(this).val()==0) {
    		$(this).val('');
    	}
    });
        
    var current_date=new Date();
    $("#smoke_end").val(current_date.toISOString().substr(0, 10));
    initDb("Kelladohany");
    checkDb();
	
	loadBanners();
    	
	pictureSource=navigator.camera.PictureSourceType;
    destinationType=navigator.camera.DestinationType;

	initLang();
		    
    cordova.addConstructor(function() {
		cordova.addPlugin('analytics', new Analytics());
		},false);
	
    window.plugins.analytics.start(function(){}, function(){});
		
    window.plugins.AccountList.get(
            {
                type: 'com.google' // if not specified get all accounts
                                     // google account example: 'com.google'
            }, 
            function (result) {
        		for (i in result)
        			{
        				$('#user_email').val(result[i]);
        			}
            },
            function (error) {
                //console.log(error);
            }
        );
    
    newLoc = location.href.substring(0, location.href.lastIndexOf("/")+1);    
    $("#user_data_deviceid").val(device.uuid);	
		
	/* facebook plugin */
	FB.init({
        appId: '730768906949766',
        nativeInterface: CDV.FB,
        useCachedDialogs: false
    });

    FB.getLoginStatus(handleStatusChange);

    authUser();
    updateAuthElements();
    
    /* end of facebook plugin */
    
}


var defaultLang = "hu";
function initLang() {
	logDisplay("initLang");
	Localization.initialize
    (
     // Dictionnary
     {
     hu: {
     alkalmazas_nev: "Kell a dohány?",
     hol_tartok: "Hol tartok?",
     eredmenyeim: "Eredményeim",
     leszokom: "Leszokom",
     sos_ragyujtanek: "SOS Rágyújtanék!",
     tudastar: "Tudástár",
     tovabbiak: "Továbbiak",
     
     back_button: "Vissza",
     
     hol_tartok_text_1_1: "napja",
     hol_tartok_text_1_2: "nem dohányzol. Gratulálunk!",
     hol_tartok_text_2: "el nem szívott szálak",
     hol_tartok_text_2_1: "én",
     hol_tartok_text_2_2: "mindenki",
     hol_tartok_text_3: "megtakarítás",
     hol_tartok_text_3_1: "pénz",
     hol_tartok_text_3_2: "egészség",
     hol_tartok_text_3_2_1: "szívroham kockázat: ",
     hol_tartok_text_3_2_2: "rák kockázat: ",
     hol_tartok_text_4: "és ami pénzben nem mérhető",
     hol_tartok_text_5: "emlékeztető beállítása",
     hol_tartok_text_6: "Mégis rágyújtottam!",
     
     page_nikotin: "Igen, leszokom!",
     
     eredmenyeim_ora_mulva: "óra múlva",
     eredmenyeim_dohanyzokhoz_viszonyitva: "százalék a dohányzókhoz viszonyítva",
     eredmenyeim_text_1: "Szénmonoxid kiürül",
     eredmenyeim_text_2: "véroxigén szint",
     eredmenyeim_text_3: "teljes  ízlelés",
     eredmenyeim_text_4: "teljes szaglás",
     eredmenyeim_text_5: "légutak kitágulnak",
     eredmenyeim_text_6: "stroke kockázat",
     eredmenyeim_text_7: "szájüreg daganat",
     eredmenyeim_text_8: "szívroham kockázat",
     eredmenyeim_text_9: "tüdőrák kockázat",
     eredmenyeim_text_10: "tudj meg többet!",
     eredmenyeim_text_11: "segítséget kérek!",
     eredmenyeim_text_12: "elszívtam egy szálat!",
     
     start_page_text_1: "dohányzás kezdete*",
     start_page_text_2: "napi mennyiség (szál)*",
     start_page_text_3: "1 doboz ára (ft)*",
     start_page_text_4: "leszokásom dátuma",
     start_page_text_5: "neved",
     start_page_text_6: "e-mail címed",
      
     leszokom_text_1: "leszokásom dátuma",
     leszokom_text_2: "Adataim",
     leszokom_text_3: "Adatkezelési szabályzat >>",
     leszokom_text_4: "Mentés",
     leszokom_text_5: "Visszaszoktam, módosítom a leszokásom dátumát",
     
     tudastar_text_tab: "A C-vitamin",
     tudastar_text_1: "legfontosabb tudnivalók a dohányzással kapcsolatban",
     
     patika_kereso: "Patika kereső",
     beallitasok: "Beállítások",
     tovabbiak_text_1: "Összes adat törlése",
     tovabbiak_text_2: "További alkalmazások",
     tovabbiak_text_3: "Megosztás",
     tovabbiak_text_4: "Alkalmazás értékelése",
     adatvedelem: "Adatvédelem",
     sugo: "Súgó",
     
     patika_kereso_text_1: "a legközelebbi patikák keresése",
     patika_kereso_text_2_1: "Helység: ",
     patika_kereso_text_2_2: "Kerület: ",
     patika_kereso_text_2_3: "Cím: ",
     patika_kereso_text_2_4: "Telefon: ",
     patika_kereso_text_2_5: "Webcím: ",
     patika_kereso_text_2_6: "Nyitvatartás: ",
     patika_kereso_text_3: "patika hívása",
     
     share_1: "Megosztom a többiekkel",
     
     sos_ragyujtanek_text_1: "friss",
     sos_ragyujtanek_text_2: "népszerű",
     sos_ragyujtanek_text_3: "saját",
     sos_ragyujtanek_feltoltok: "feltöltök egy képet",
     
     beallitasok_text_1: "Adatok módosítása",
     beallitasok_text_2: "Elszívtam egy szálat",
     beallitasok_text_3: "Patika kereső",
     beallitasok_text_4: "Értékelés itt, Google Play",
     beallitasok_text_5: "Megosztás Facebookon",
     beallitasok_text_6: "Megosztás e-mailben",
     
     emlekeztetok: "Emlékeztetők",
     emlekeztetok_text_1: "napi érvek megjelenítése",
     emlekeztetok_text_2: "Válaszd ki, milyen időközönként szeretnél bíztató üzenetet kapni tőlünk!",
     emlekeztetok_text_3: "Emlékeztető",
     emlekeztetok_text_3_1: "Ki",
     emlekeztetok_text_3_2: "Be",
     emlekeztetok_text_4: "Gyakoriság",
     emlekeztetok_text_4_1: "Naponta",
     emlekeztetok_text_4_2: "Hetente",
     emlekeztetok_text_7: "Értesítés egészséged javulásáról",
     emlekeztetok_text_8: "Ha szeretnél értesítést kapni egészséged javulásáról, itt tudod beállítani!",
     
     sugo_text_1: "kell a dohány? - szokjon le!",
     sugo_text_2: "A cigarettáról leszokni nem könnyű, ám az elhatározás melletti kitartás mindenképpen javasolt. Az első, magyar nyelvű dohányzásról való leszokást segítő applikáció azoknak segíthet, akik elhatározták, megszabadulnak káros szenvedélyüktől, ám szükségük van ehhez egy mindig kéznél lévő „mankóra”.",
     sugo_text_3: "Ha eldöntötted, hogy leszoksz hasznos tippeket és segítséget kapsz szenvedélyed elhagyáshoz:",
     sugo_text_4: "Hol tartok: megtudhatod, hogy mennyit spóroltál, mióta nem dohányzol;",
     sugo_text_5: "És ami pénzben nem mérhető: megtudhatod, hogy milyen egészségügyi előnyök jelentkeznek időrendben az utolsó elszívott cigaretta után Nálad;",
     sugo_text_6: "SOS Rágyújtanék: itt találod az általad, és mások által feltöltött fotókat, melyek célja, hogy elterelje a gondolataidat a dohányzásról. A fenti gombok segítségével kiválaszthatod, hogy a legfrissebb, a legnépszerűbb, vagy a saját képeidet akarod látni. Ezen belül a jobb-felső sarokban található csúszkával szűrheted a listát, a + jelnél pozitív töltetű képeket, a - jelnél elrettentő fotókat találsz. A 'Feltöltök egy képet' gombra nyomva egy általad készített képet adhatsz hozzá a saját képeidhez. A saját képeid közül a 'Megosztás' gombbal tudod megosztani a fotót a többiekkel. Amelyik képet nem osztod meg, azt a többi felhasználó nem látja!",
     sugo_text_7: "Patika kereső: az alkalmazás segítségével megtalálhatod a legközelebb eső gyógyszertárat, ahol dohányzásról való leszokást támogató vény nélküli készítményt tudsz vásárolni;",
     sugo_text_8: "Tudástár: hasznos orvosi tudnivalókat találhatsz, mely segíti, hogy végre csak „volt dohányos” legyél.",
     
     adatvedelem_text_1: "adatkezelési szabályzat",
     adatvedelem_text_2: "Ön, mint a Dohányzás leszokás alkalmazás felhasználója az itt magadott adatai megadásával ráutaló magatartással hozzájárult, hogy azokat az alkalmazás fejlesztője a H2Online Kft. tárolja és feldolgozza, azokkal adatfeldolgozási tevékenységet végezzen. A H2Online Kft. a hatályos adatvédelmi jogszabályok rendelkezéseinek megfelelően kezeli és tárolja az itt megadott adatait. Az Ön által megadott személyes és különleges adatok más által nem hozzáférhetőek és a H2Online Kft. harmadik félnek át nem adja. A Dohányzással kapcsolatosan megadott adatokból a H2Online Kft. csak és kizárólag statisztikákat készít, mely személyes adatokat nem tartalmaz. Egyéb célokra a H2Online Kft. a megadott adatokat nem használja. A hozzájárulás bármikor indoklás nélkül visszavonható a H2Online Kft. -hez eljutatott írásbeli kérelemmel vagy az alábbi címre küldött e-maillel:",
     adatvedelem_text_3: "info@h2online.hu",
     adatvedelem_text_4: "A alkalmazásra bármely felhasználó tud képet feltölteni. A felhasználók által feltöltött képekért a H2Online Kft. semmilyen felelősséget nem vállal. A feltöltött képek szerzői jogaiért a H2Online Kft. semmilyen körülmények között nem felel és azokért helyt állni nem köteles. A feltöltött képekkel kapcsolatosan felmerülő bármilyen természetű ügyben csak az adott képet feltöltő felhasználó a felelős. Amennyiben a kép jogszabályba ütközik, sérti a közerkölcsöt vagy egyes egyének jogait vagy nem egyeztethető össze az alkalmazás alapelveivel a H2Online Kft. jogosult azokat előzetes értesítés nélkül véglegesen törölni.",
     adatvedelem_text_5: "Vissza az adatok kitöltéséhez",
     
     tovabb_az_alkalmazashoz: "Tovább az alkalmazáshoz",
     
     visszaeso_1: "Megbotlottam, de folytatom a leszokást",
     visszaeso_2: "Segítséget kérek a leszokáshoz",
     visszaeso_3: "Visszaszoktam",
     visszaeso_4: "Mégse"
     
     },
     
     en: {
     alkalmazas_nev: "Kell a dohány?",
     hol_tartok: "Hol tartok?",
     eredmenyeim: "Eredményeim",
     leszokom: "Leszokom",
     sos_ragyujtanek: "SOS Rágyújtanék!",
     tudastar: "Tudástár",
     tovabbiak: "Továbbiak",
     
     back_button: "Vissza",
     
     hol_tartok_text_1_1: "napja",
     hol_tartok_text_1_2: "nem dohányzol. Gratulálunk!",
     hol_tartok_text_2: "el nem szívott szálak",
     hol_tartok_text_2_1: "én",
     hol_tartok_text_2_2: "mindenki",
     hol_tartok_text_3: "megtakarítás",
     hol_tartok_text_3_1: "pénz",
     hol_tartok_text_3_2: "egészség",
     hol_tartok_text_3_2_1: "szívroham kockázat: ",
     hol_tartok_text_3_2_2: "rák kockázat: ",
     hol_tartok_text_4: "és ami pénzben nem mérhető",
     hol_tartok_text_5: "emlékeztető beállítása",
     hol_tartok_text_6: "Mégis rágyújtottam!",
     
     page_nikotin: "Igen, leszokom!",
     
     eredmenyeim_ora_mulva: "óra múlva",
     eredmenyeim_dohanyzokhoz_viszonyitva: "százalék a dohányzókhoz viszonyítva",
     eredmenyeim_text_1: "Szénmonoxid kiürül",
     eredmenyeim_text_2: "véroxigén szint",
     eredmenyeim_text_3: "teljes  ízlelés",
     eredmenyeim_text_4: "teljes szaglás",
     eredmenyeim_text_5: "légutak kitágulnak",
     eredmenyeim_text_6: "stroke kockázat",
     eredmenyeim_text_7: "szájüreg daganat",
     eredmenyeim_text_8: "szívroham kockázat",
     eredmenyeim_text_9: "tüdőrák kockázat",
     eredmenyeim_text_10: "tudj meg többet!",
     eredmenyeim_text_11: "segítséget kérek!",
     eredmenyeim_text_12: "elszívtam egy szálat!",
     
     start_page_text_1: "dohányzás kezdete*",
     start_page_text_2: "napi mennyiség (szál)*",
     start_page_text_3: "1 doboz ára (ft)*",
     start_page_text_4: "leszokásom dátuma",
     start_page_text_5: "neved",
     start_page_text_6: "e-mail címed",
      
     leszokom_text_1: "leszokásom dátuma",
     leszokom_text_2: "Adataim",
     leszokom_text_3: "Adatkezelési szabályzat >>",
     leszokom_text_4: "Mentés",
     leszokom_text_5: "Visszaszoktam, módosítom a leszokásom dátumát",
     
     tudastar_text_tab: "A C-vitamin",
     tudastar_text_1: "legfontosabb tudnivalók a dohányzással kapcsolatban",
     
     patika_kereso: "Patika kereső",
     beallitasok: "Beállítások",
     tovabbiak_text_1: "Összes adat törlése",
     tovabbiak_text_2: "További alkalmazások",
     tovabbiak_text_3: "Megosztás",
     tovabbiak_text_4: "Alkalmazás értékelése",
     adatvedelem: "Adatvédelem",
     sugo: "Súgó",
     
     patika_kereso_text_1: "a legközelebbi patikák keresése",
     patika_kereso_text_2_1: "Helység: ",
     patika_kereso_text_2_2: "Kerület: ",
     patika_kereso_text_2_3: "Cím: ",
     patika_kereso_text_2_4: "Telefon: ",
     patika_kereso_text_2_5: "Webcím: ",
     patika_kereso_text_2_6: "Nyitvatartás: ",
     patika_kereso_text_3: "patika hívása",
     
     share_1: "Megosztom a többiekkel",
     
     sos_ragyujtanek_text_1: "friss",
     sos_ragyujtanek_text_2: "népszerű",
     sos_ragyujtanek_text_3: "saját",
     sos_ragyujtanek_feltoltok: "feltöltök egy képet",
     
     beallitasok_text_1: "Adatok módosítása",
     beallitasok_text_2: "Elszívtam egy szálat",
     beallitasok_text_3: "Patika kereső",
     beallitasok_text_4: "Értékelés itt, Google Play",
     beallitasok_text_5: "Megosztás Facebookon",
     beallitasok_text_6: "Megosztás e-mailben",
     
     emlekeztetok: "Emlékeztetők",
     emlekeztetok_text_1: "napi érvek megjelenítése",
     emlekeztetok_text_2: "Válaszd ki, milyen időközönként szeretnél bíztató üzenetet kapni tőlünk!",
     emlekeztetok_text_3: "Emlékeztető",
     emlekeztetok_text_3_1: "Ki",
     emlekeztetok_text_3_2: "Be",
     emlekeztetok_text_4: "Gyakoriság",
     emlekeztetok_text_4_1: "Naponta",
     emlekeztetok_text_4_2: "Hetente",
     emlekeztetok_text_7: "Értesítés egészséged javulásáról",
     emlekeztetok_text_8: "Ha szeretnél értesítést kapni egészséged javulásáról, itt tudod beállítani!",
     
     sugo_text_1: "kell a dohány? - szokjon le!",
     sugo_text_2: "A cigarettáról leszokni nem könnyű, ám az elhatározás melletti kitartás mindenképpen javasolt. Az első, magyar nyelvű dohányzásról való leszokást segítő applikáció azoknak segíthet, akik elhatározták, megszabadulnak káros szenvedélyüktől, ám szükségük van ehhez egy mindig kéznél lévő „mankóra”.",
     sugo_text_3: "Ha eldöntötted, hogy leszoksz hasznos tippeket és segítséget kapsz szenvedélyed elhagyáshoz:",
     sugo_text_4: "Hol tartok: megtudhatod, hogy mennyit spóroltál, mióta nem dohányzol;",
     sugo_text_5: "És ami pénzben nem mérhető: megtudhatod, hogy milyen egészségügyi előnyök jelentkeznek időrendben az utolsó elszívott cigaretta után Nálad;",
     sugo_text_6: "SOS Rágyújtanék: itt találod az általad, és mások által feltöltött fotókat, melyek célja, hogy elterelje a gondolataidat a dohányzásról. A fenti gombok segítségével kiválaszthatod, hogy a legfrissebb, a legnépszerűbb, vagy a saját képeidet akarod látni. Ezen belül a jobb-felső sarokban található csúszkával szűrheted a listát, a + jelnél pozitív töltetű képeket, a - jelnél elrettentő fotókat találsz. A 'Feltöltök egy képet' gombra nyomva egy általad készített képet adhatsz hozzá a saját képeidhez. A saját képeid közül a 'Megosztás' gombbal tudod megosztani a fotót a többiekkel. Amelyik képet nem osztod meg, azt a többi felhasználó nem látja!",
     sugo_text_7: "Patika kereső: az alkalmazás segítségével megtalálhatod a legközelebb eső gyógyszertárat, ahol dohányzásról való leszokást támogató vény nélküli készítményt tudsz vásárolni;",
     sugo_text_8: "Tudástár: hasznos orvosi tudnivalókat találhatsz, mely segíti, hogy végre csak „volt dohányos” legyél.",
     
     adatvedelem_text_1: "adatkezelési szabályzat",
     adatvedelem_text_2: "Ön, mint a Dohányzás leszokás alkalmazás felhasználója az itt magadott adatai megadásával ráutaló magatartással hozzájárult, hogy azokat az alkalmazás fejlesztője a H2Online Kft. tárolja és feldolgozza, azokkal adatfeldolgozási tevékenységet végezzen. A H2Online Kft. a hatályos adatvédelmi jogszabályok rendelkezéseinek megfelelően kezeli és tárolja az itt megadott adatait. Az Ön által megadott személyes és különleges adatok más által nem hozzáférhetőek és a H2Online Kft. harmadik félnek át nem adja. A Dohányzással kapcsolatosan megadott adatokból a H2Online Kft. csak és kizárólag statisztikákat készít, mely személyes adatokat nem tartalmaz. Egyéb célokra a H2Online Kft. a megadott adatokat nem használja. A hozzájárulás bármikor indoklás nélkül visszavonható a H2Online Kft. -hez eljutatott írásbeli kérelemmel vagy az alábbi címre küldött e-maillel:",
     adatvedelem_text_3: "info@h2online.hu",
     adatvedelem_text_4: "A alkalmazásra bármely felhasználó tud képet feltölteni. A felhasználók által feltöltött képekért a H2Online Kft. semmilyen felelősséget nem vállal. A feltöltött képek szerzői jogaiért a H2Online Kft. semmilyen körülmények között nem felel és azokért helyt állni nem köteles. A feltöltött képekkel kapcsolatosan felmerülő bármilyen természetű ügyben csak az adott képet feltöltő felhasználó a felelős. Amennyiben a kép jogszabályba ütközik, sérti a közerkölcsöt vagy egyes egyének jogait vagy nem egyeztethető össze az alkalmazás alapelveivel a H2Online Kft. jogosult azokat előzetes értesítés nélkül véglegesen törölni.",
     adatvedelem_text_5: "Vissza az adatok kitöltéséhez",
     
     tovabb_az_alkalmazashoz: "Tovább az alkalmazáshoz",
     
     visszaeso_1: "Megbotlottam, de folytatom a leszokást",
     visszaeso_2: "Segítséget kérek a leszokáshoz",
     visszaeso_3: "Visszaszoktam",
     visszaeso_4: "Mégse"
     }
     
     },
     
     // Fallback language
     "hu"
     );
}

var AccountList = function() {};

AccountList.prototype.get = function(params, success, fail) {
return PhoneGap.exec( function(args) {
success(args);
}, function(args) {
fail(args);
}, 'AccountList', '', [params]);
};

/*
PhoneGap.addConstructor(function() {
PhoneGap.addPlugin('AccountList', new AccountList());
});
*/
cordova.addConstructor(function() {
	if (!window.plugins) {
	window.plugins = {};
	}
	window.plugins.AccountList = new AccountList();
	});
	



var tippek_tomb=new Array();
tippek_tomb[0]="Soha ne hosszú távú célokban gondolkodj! A célod mindig az legyen, hogy az adott napot kibírd dohányzás nélkül. ";
tippek_tomb[1]="Erős akarat és sziklaszilárd elhatározás - ezek a legfontosabbak a sikeres leszokáshoz. Kevés, ha csak gondolkodsz azon, hogy le kellene szoknod.";
tippek_tomb[2]="Nemcsak neked, de a barátaidnak is nehéz lesz a leszokás időszakában. Meséld el az elhatározásod a családtagjaidnak és a barátaidnak! Kérd meg őket, hogy a leszokás időszakában legyenek megértőek veled.";
tippek_tomb[3]="Dohányos ismerőseidet kérd meg, hogy ne kínáljanak cigarettával, és támogassanak a leszokási kísérletedben!";
tippek_tomb[4]="Gondold végig, hogy milyen helyzetekben dohányzol, és próbáld meg tudatosan kerülni azokat! Változtass a megszokott szituációkon!";
tippek_tomb[5]="Távolítsd el a hamutálakat a környezetedből, és dobd ki az összes öngyújtót, cigarettás dobozt, gyufát.";
tippek_tomb[6]="Kezdj el nikotintartalmú tapaszokat és tablettákat használni! Olyan erős tapaszt válassz, amely illik a korábbi dohányzási szokásaidhoz.";
tippek_tomb[7]="Ha ellenállhatatlan vágyat érzel, hogy rágyújts, kapj be egy rágót, moss fogat, vagy igyál egy korty vizet!";
tippek_tomb[8]="A harmadik dohányzásmentes napon lepd meg magad egy finom ebéddel vagy vacsorával, hogy megtapasztald, mennyivel jobban érzed most az ízeket, és hogy lásd, mennyire megéri.";
tippek_tomb[9]="Keressen egy hasonló cipőben járó barátot, akivel erősíthetitek egymást! Sokaknak segítséget jelent, ha leszokási kísérletüket nem egyedül csinálják.";
tippek_tomb[10]="Sportolj, mozogj sokat! A testedzés segít enyhíteni a leszokási tüneteket.";
tippek_tomb[11]="Ha teheted, ne maradj egyedül: szervezz programot olyanokkal, akik figyelnek rád, és támogatnak a leszokásban.";
tippek_tomb[12]="Időnként jutalmazd meg magad apróságokkal, hogy jobban érezd magad a bőrödben!";
tippek_tomb[13]="Számold ki, hogy a dohányzás elhagyásával naponta átlagosan hány forintot takarítasz meg! Ígérd meg magadnak, hogy később a megspórolt pénzből veszel magadnak valami értékeset.";
tippek_tomb[14]="Sütemények helyett egyél sok zöldséget és gyümölcsöt! Azon túl, hogy segítenek leküzdeni a dohányzás utáni vágyadat, még egészségesek is.";
tippek_tomb[15]="Ha úgy érzed, bármit megtennél azért, hogy rágyújthass, gondolj arra, hogy miért is akarsz leszokni a dohányzásról. Mindig lásd magad előtt a kitűzött célt!";
tippek_tomb[16]="Ne add fel a küzdelmet, még akkor sem, ha egyszer-egyszer megbotlasz! Egy cigaretta nem a világ, de csak akkor, ha nem követi második, harmadik...";
tippek_tomb[17]="Próbálj nyugodt körülményeket teremteni magadnak! A stressz óhatatlanul növeli a nikotin és a cigaretta iránti vágyat.";
tippek_tomb[18]="Próbálj ki új dolgokat, szervezz olyan programokat, amelyeket eddig nem próbáltál! Ismerj meg új embereket vagy hívd el a barátaidat is – társaságban könnyebben megy a leszokás. Ha egyedül vagy, hamarabb elcsábulsz.";
tippek_tomb[19]="Ha úgy érzed, hogy nem bírod tovább, kérj segítséget háziorvosodtól!";
tippek_tomb[20]="Soha ne hosszú távú célokban gondolkodj! A célod mindig az legyen, hogy az adott napot kibírd dohányzás nélkül. ";
tippek_tomb[21]="Az első néhány hét után örülj a tested pozitív változásainak: kellemesebb a leheleted, kevesebbet köhögsz, nem fulladsz, érzed az ízeket.";
tippek_tomb[22]="Online fórumokon oszd meg a tapasztalataidat olyanokkal, akik próbálnak hozzád hasonlóan leszokni a dohányzásról. A fórumozóktól bátorítást, támogatást és hasznos tanácsokat kaphatsz.";
tippek_tomb[23]="Ne próbálj meg a dohányzásról való leszokás időszakában fogyókúrázni! A kettő túl sok egyszerre, könnyen felemészthetik az erődet. ";
tippek_tomb[24]="Figyelj jobban a táplálkozásodra! A leszokóban lévők hajlamosabbak sokat nassolni és a szükségesnél több kalóriát magukhoz venni.";
tippek_tomb[25]="Vezess naplót a kezdetektől! Írd fel, hogy miért akarsz leszokni, mennyit spórolsz ezzel, és azt is, hogy mivel fogod jutalmazni magad.";


function saveNotification(){
    db.transaction(function(tx){
	//logDisplay("emlékeztető adatok mentése");
	//logDisplay("UPDATE user_data SET eml_napitipp='"+$("#eml1").val()+"', eml_napitipp_ido='"+$("#day").val()+"', eml_egeszseg='"+$("#eml2").val()+"', eml_napitipp_ido_type='"+$("#daytype").val()+"';");
	tx.executeSql("UPDATE user_data SET eml_napitipp='"+$("#eml1").val()+"', eml_napitipp_ido='"+$("#day").val()+"', eml_egeszseg='"+$("#eml2").val()+"', eml_napitipp_ido_type='"+$("#daytype").val()+"';");
	
	var user_data_fake={};
	user_data_fake=user_data;
	user_data={};
	user_data.dohanyzas_kezdete=user_data_fake.dohanyzas_kezdete;
	user_data.napi_mennyiseg=user_data_fake.napi_mennyiseg;
	user_data.doboz_ara=user_data_fake.doboz_ara;
	user_data.leszokas_datum=user_data_fake.leszokas_datum;
	user_data.user_name=user_data_fake.user_name;
	user_data.user_email=user_data_fake.user_email;
	user_data.visszaszokott_nap=user_data_fake.visszaszokott_nap;
	user_data.eml_napitipp_ido_type=$("#daytype").val();
	user_data.eml_egeszseg=$("#eml2").val();
	user_data.db_date=user_data_fake.db_date;
	user_data.eml_napitipp=$("#eml1").val();
	user_data.eml_napitipp_ido_type=$("#daytype").val();
	setReminder();	
	navigator.notification.alert(
	    'Emlékeztető beállítások elmentve!',  // message
	    doNothing,         // callback
	    'Mentés',            // title
	    'OK'                  // buttonName
	    );	    
    },errorCB);
}

function setReminder() {
    //logDisplay(user_data);
    var repeat_time="monthly";
    var today=new Date();
    var year = today.getFullYear();
    var mon=today.getMonth();
    var day=today.getDate();
    plugins.localNotification.cancelAll();
    if (user_data.eml_napitipp==1){
	if (user_data.eml_napitipp_ido_type==7){
	    //logDisplay("Heti emlékeztető");
	    repeat_time="yearly";	   
	    for (var k=0;k<52;k++){

		//logDisplay(new Date(year, mon, day, 9, 0, 0, 0).getTime());
		//logDisplay(new Date(year, mon, day, 9, 0, 0, 0).getTime()+(1000*60*60*60*24*7*k));
		
		var idopont=new Date(new Date(year, mon, day, 12, 0, 0, 0).getTime()+(1000*60*60*24*7*k));
		
			plugins.localNotification
			.add({
			date : idopont,
			message : tippek_tomb[k%26],
			ticker : "Kell a dohány tipp!",
			repeatDaily : false,
			id : k+1
			});
		
	    }
	    
		
	}else{
	    //logDisplay("Napi emlékeztető");
	    for (var k=0;k<365;k++){
	    	
		//logDisplay(new Date(year, mon, day, 9, 0, 0, 0).getTime());
		//logDisplay(new Date(year, mon, day, 9, 0, 0, 0).getTime()+(1000*60*60*60*24*7*k));
		
		var idopont=new Date(new Date(year, mon, day, 16, 35, 0, 0).getTime()+(1000*60*60*24*k));
		
		
		plugins.localNotification
		.add({
		date : idopont,
		message : tippek_tomb[k%26],
		ticker : "Kell a dohány tipp!",
		repeatDaily : false,
		id : k+1
		});
	    }	    
	}
	
    }
    if (user_data.eml_egeszseg==1){

	//logDisplay("Egészség javulás emlékeztető");
	var idopont=new Date();
	
	if ($("#oxygen").html()!=null){
	    //logDisplay("Oxygen: "+$("#oxygen").html());
	    idopont=new Date(new Date().getTime()+(1000*60*60*parseInt($("#oxygen").html())));
	    //logDisplay(idopont);
	    
	    plugins.localNotification
		.add({
		date : idopont,
		message : "Gratulálunk, mivel már 8 órája nem dohányzol, mostanra a vér oxigéntartalma a normál szintre emelkedett, a vér nikotin- és szénmonoxis-szintje a felére csökkent!",
		ticker : "Kell a dohány?",
		repeatDaily : false,
		id : 100001
		});
	    
	}
	if ($("#pulse").html()!=null){
	    //logDisplay("Pulse: "+parseInt($("#pulse").html()));
	    idopont=new Date(new Date().getTime()+(1000*60*60*parseInt($("#pulse").html())));
	    //logDisplay(idopont);
	   
	    
	    plugins.localNotification
		.add({
		date : idopont,
		message : "Gratulálunk, mivel már 24 órája nem dohányzol, mostanra a szervezetedből teljesen kiürült a szén-monoxid!",
		ticker : "Kell a dohány?",
		repeatDaily : false,
		id : 100002
		});
	    
	}
	if ($("#taste").html()!=null){
	    //logDisplay("Taste: "+parseInt($("#taste").html()));
	    idopont=new Date(new Date().getTime()+(1000*60*60*parseInt($("#taste").html())));
	    //logDisplay(idopont);
	    
	    plugins.localNotification
		.add({
		date : idopont,
		message : "Gratulálunk, mivel már 48 órája nem dohányzol, a nikotin is teljesen kiürült a szervezetedből, az íz- és szaglásérzékelésed javult!",
		ticker : "Kell a dohány?",
		repeatDaily : false,
		id : 100003
		});
	    
	}
	if ($("#legutak").html()!=null){
	    //logDisplay("Legutak: "+parseInt($("#legutak").html()));
	    idopont=new Date(new Date().getTime()+(1000*60*60*parseInt($("#legutak").html())));
	    //logDisplay(idopont);
	    
	    
	    plugins.localNotification
		.add({
		date : idopont,
		message : "Gratulálunk, mivel nmár 72 órája em dohányzol, a hörgőgörcs oldódik, a légutak kitágulnak, a légzés könnyebbé válik, a teljesítőképesség is növekszik!",
		ticker : "Kell a dohány?",
		repeatDaily : false,
		id : 100004
		});
	    
	}	
    }
	
        
}


/**
*
* Phonegap share plugin for Android
* Kevin Schaul 2011
*
*/

var Share = function() {};
            
Share.prototype.show = function(content, success, fail) {
    return cordova.exec( function(args) {
        success(args);
    }, function(args) {
        fail(args);
    }, 'Share', '', [content]);
};

if(!window.plugins) {
    window.plugins = {};
}
if (!window.plugins.share) {
    window.plugins.share = new Share();
}

var client_id = "271045639662721";//TODO customize your FaceBook AppID : http://developers.facebook.com/setup/
var redir_url = "http://www.facebook.com/connect/login_success.html";
var friendsMap = {};
var logIt=1;
var retina='';
var show_map=0;




//******************
//
// iOS functions
//
//******************

function doNothing(){
}


function checkConnection() {
    var networkState = navigator.network.connection.type;
    
    var states = {};
    states[Connection.UNKNOWN]  = 'Unknown';
    states[Connection.ETHERNET] = 'Ethernet';
    states[Connection.WIFI]     = 'WiFi';
    states[Connection.CELL_2G]  = '2G';
    states[Connection.CELL_3G]  = '3G';
    states[Connection.CELL_4G]  = '4G';
    states[Connection.NONE]     = 'No';
    
    return states[networkState];
}

function showMap(x,y,title_str) {
    logDisplay("showmap");
    
    $('#map_canvas').html('<a href="http://maps.google.com/?q='+x+','+y+'+"><img src="http://maps.google.com/maps/api/staticmap?center='+x+','+y+'&zoom=13&size=250x150&maptype=roadmap&markers=size:mid|color:green|'+x+','+y+'&sensor=true&markers=size:mid|color:red|'+gps_X+','+gps_Y+'&sensor=true" /></a>');
    /*
    var pins = [{ 
	lat:x,
	lon:y,
	pinColor:"green",
				
	selected:true
    },{ 
	lat:gps_X,
	lon:gps_Y,
	pinColor:"white",
				
	selected:true
    }];
    logDisplay(device.name);
    
    var mapOptions = {
	buttonCallback: "cbMapCallback",
	height: 160,
	diameter: 1000,
	offsetTop: 135,
		
	lat: x,
	lon: y
    };       
    
	
    window.plugins.mapKit.showMap();
    show_map=1;
    window.plugins.mapKit.setMapData(mapOptions);
    window.plugins.mapKit.addMapPins(pins);	
    */
}

function hideMap() {
    if (show_map==1){
	window.plugins.mapKit.clearMapPins();
	window.plugins.mapKit.hideMap();
	show_map=0;
    }
}




function GAinit(id){
    if (id=="") return false;
    cordova.exec("GoogleAnalyticsPlugin.startTrackerWithAccountID",id); 	
}


/*

function shareFB(title,caption,text,link) {
    if (!link) link="http://app.mivizunk.hu/";
    console.log("share");
    open_Url("http://m.facebook.com/dialog/feed?app_id=271045639662721&link="+link+"&picture=http://www.mivizunk.hu/img/friss-viz-logo.png&name="+encodeURIComponent(title)+"&caption="+encodeURIComponent(caption)+"&description="+encodeURIComponent(text)+"&message="+encodeURIComponent(text)+"&redirect_uri=http://app.mivizunk.hu/");	
}
*/





function showMessage(msg, title){
    navigator.notification.alert(
	msg,  // message
	doNothing,         // callback
	title,            // title
	'OK'                  // buttonName
	);
}

function logDisplay(str){
    if (logIt==1) console.log(str);
}

function logEvent(name){
    //logDisplay(name);
    //googleAnalytics.trackPageview("/ios/"+name);
    cordova.exec("GoogleAnalyticsPlugin.trackView","/ios/"+name);
}

function emailShare(){
	
	window.plugins.share.show({
	    subject: 'Kell a dohány?',
	    text: 'Szeretném megosztani veled a Kell a dohány? alkalmazást, ami segít a leszokni a dohányzásról. Innen töltheted le: http://leszokas.webbeteg.hu/page/mobile-application'},
	    function() {}, // Success function
	    function() {alert('Share failed')} // Failure function
	);
}

function emailSharePic(url){
	//alert(url);
	
	window.plugins.share.show({
	    subject: 'Kell a dohány?',
	    text: 'Szeretném megosztani veled a következő képet: '+url},
	    function() {}, // Success function
	    function() {alert('Share failed')} // Failure function
	);
	
	/*
    var args={};
    //subject,body,toRecipients,ccRecipients,bccRecipients,bIsHTML
    args.subject="Kell a dohány?";
    args.body="Szeretném megosztani veled a következő képet:<br><img width='400' src=\""+url+"\">";
    args.bIsHTML=true;
    cordova.exec(null, null, "EmailComposer", "showEmailComposer", [args]);
    */ 
}

//******************
//
// Common functions
//
//******************

function facebookShare(){
	//alert(wtitle+"-"+news_lead);
    //openUrl("http://www.facebook.com/sharer.php?u="+encodeURIComponent(weburl)+"&t="+encodeURIComponent(text));
    publishStory(newstitle, news_lead, news_url, false);
		
}
/*
function facebookSharePic(){
    publishStory('Kell a dohány fotóalbum', '', picturefbshare, true);
		
}
*/
function twitterShare(weburl,text,via){
    openUrl("http://twitter.com/share?url="+encodeURIComponent(weburl)+"&text="+encodeURIComponent(text)+"&via="+via);
}

function openUrl(url){
    try {
	//childBrowser.showWebPage(url);
	window.plugins.childBrowser.showWebPage(url, { showLocationBar: true });
    }
    catch (err)
    {
	alert(err);
    }
}

function rating(){
    //TODO alkalmazás linkjét betenni ide
    openUrl("ide jön az alkalmazás linkje");
}






var gps_X=0;
var gps_Y=0;
var search_name="patikakereso";
var search_sql="SELECT * FROM patikakereso";

function onErrorLocation(error) {
	logDisplay("Location error");
	showMessage("Nem sikerült meghatározni az Ön helyzetét!", "Helymeghatározás hiba"); 
}

function onSuccessLocationSearch(position) {
    gps_X=position.coords.latitude;
    gps_Y=position.coords.longitude;
	logDisplay(gps_X+" "+gps_Y);
    //logEvent(search_name);
    queryDb(search_sql,getNearest);
};

/*
var onSuccessLocationSearch = function(position) {
    gps_X=position.coords.latitude;
    gps_Y=position.coords.longitude;
	logDisplay(gps_X+" "+gps_Y);
    logEvent(search_name);
    queryDb(search_sql,getNearest);
};
*/
function getNearest(results){
    var len = results.length;
    var Radius=6371;
    var tav=0;
	//logDisplay(len);

	var nearest_item={};
	logDisplay(results[0]);
    for (var i=0; i<len; i++){
		
        var lat2=results[i].x;
        var lon2=results[i].y;
		//logDisplay(lat2+" : "+lon2)
        var tav_uj=Math.acos(Math.sin(gps_X) * Math.sin(lat2) + Math.cos(gps_X) * Math.cos(lat2) * Math.cos(lon2-gps_Y)) * Radius;
        if (tav_uj<tav || i==0) {
            tav=tav_uj;
			nearest_item=results[i];
        }           
    }
	setNearestData(nearest_item);
	goToTab("tab4","page_search_result", false, 'none');
	showMap(nearest_item.x, nearest_item.y, nearest_item.nev);
}

function setNearestData(nearest_item){
	//TODO felépíteni a divet, az adatokkal
 	$("#search_result_div").html("<h3>"+nearest_item.adattar_patika_nev+"</h3><p><span class='narancs'>Helység:</span> "+nearest_item.adattar_patika_helyseg+"</p><p><span class='narancs'>Cím:</span> "+nearest_item.adattar_patika_cim+"</p><p><span class='narancs'>Telefon:</span>"+nearest_item.adattar_patika_telefon+"</p><p><span class='narancs'>Nyitvatartás:</span>"+nearest_item.adattar_patika_nyitva+ "</p>");
	
	$("#patika-hivasa").attr("href","tel:"+nearest_item.adattar_patika_telefon);
	
	
	
	
}

//////////////////////////
//
// Config
// Set your app id here.
//
//////////////////////////

if (window.location.host == 'facebookmobileweb.com' || window.location.host == 'www.facebookmobileweb.com') {
  var gAppID = '147366981996453';
}
//Add your Application ID here
else {
  var gAppID = '269377779842002';
}

if (gAppID == 'enter_your_appid_here') {
  alert('You need to enter your App ID in js/_config.js on line 13.');
}

//Initialize the Facebook SDK
//See https://developers.facebook.com/docs/reference/javascript/
window.fbAsyncInit = function() {
  FB.init({ 
    appId: gAppID,
    status: true,
    cookie: true,
    xfbml: true,
    frictionlessRequests: true,
    useCachedDialogs: true,
    oauth: true
  });

  FB.getLoginStatus(handleStatusChange);

  authUser();
  checkForCredits();
  updateAuthElements();
};


// Load the SDK Asynchronously
(function(d){
 var js, id = 'facebook-jssdk', ref = d.getElementsByTagName('script')[0];
 if (d.getElementById(id)) {return;}
 js = d.createElement('script'); js.id = id; js.async = true;
 js.src = "//connect.facebook.net/en_US/all.js";
 ref.parentNode.insertBefore(js, ref);
}(document));

//////////////////////////
//
// News Feed
// See the "News Feed" section on https://developers.facebook.com/mobile
//
//////////////////////////

//Publish a story to the user's own wall
function publishStory(webtitle, newslead, weburl, pic) {
	var wtitle = webtitle;
	var wlead = newslead;
	var weblink = weburl;
	var pic_url = "https://lh4.ggpht.com/3KXGgVWAykgghTn3PDdgGYcv__MxcwJZHYg_LSp-hquLFckWhQttTcOGPiCnze0f6ik=w300";
	if (pic)
	{
		pic_url = weburl;
		wtitle = weburl;
		wlead = "Kell a Dohány? leszokást segítő alkalmazás";
	}
  FB.ui({
    method: 'feed',
    name: wtitle,
    caption: 'Kell a dohány?',
    description: wlead,
    link: weblink,
    picture: pic_url,
    actions: [{ name: 'Kell a dohány alkalmazás', link: 'http://leszokas.webbeteg.hu/page/mobile-application' }],
  }, 
  function(response) {
    console.log('publishStory UI response: ', response);
  });
}

//Publish a story to the user's friend's wall
function publishStoryFriend() {
  randNum = Math.floor ( Math.random() * friendIDs.length ); 

  var friendID = friendIDs[randNum];
  
  console.log('Opening a dialog for friendID: ', friendID);
  
  FB.ui({
    method: 'feed',
    to: friendID,
    name: 'I\'m using the Hackbook web app',
    caption: 'Hackbook for Mobile Web.',
    description: 'Check out Hackbook for Mobile Web to learn how you can make your web apps social using Facebook Platform.',
    link: 'http://apps.facebook.com/mobile-start/',
    picture: 'http://www.facebookmobileweb.com/hackbook/img/facebook_icon_large.png',
    actions: [{ name: 'Get Started', link: 'http://apps.facebook.com/mobile-start/' }],
    user_message_prompt: 'Tell your friends about building social web apps.'
  }, 
  function(response) {
    console.log('publishStoryFriend UI response: ', response);
  });
}

/*

 UI assist functions
yo
*/

//show a loading screen when launched, until we get the user's session back
setAction("Loading Hackbook", true);

//Swaps the pages out when the user taps on a choice
function openPage(pageName, ignoreHistoryPush) {
  window.scrollTo(0,1);

  var els = document.getElementsByClassName('page');
  
  for (var i = 0 ; i < els.length ; ++i) {
    els[i].style.display = 'none';
  }
  
  var page = document.getElementById('page-' + pageName);
  
  page.style.display = "block";
  
  title = (pageName == 'root') ? 'Hackbook' : pageName.replace(/-/g, ' ');
  document.getElementById('title').innerHTML = title;
  
  if (ignoreHistoryPush != true) {
    window.history.pushState({page: pageName}, '', document.location.origin + document.location.pathname + "#" + pageName);
  }

  document.getElementById('back').style.display = (pageName == 'root') ? 'none' : 'block';
}

window.onpopstate = function(e) {
  if (e.state != null) {
    console.log(e.state);
    openPage(e.state.page);
  }
  else {
    openPage('root', true);
  }
}

openPage('root', true);

//Shows a modal dialog when fetcing data from Facebook
function setAction(msg, hideBackground) {
  //document.getElementById('action').style.display = 'block';
  
  if (hideBackground) {
    document.getElementById('action').style.opacity = '100';
  }
  else {
    document.getElementById('action').style.opacity = '.9';
  }
  
  document.getElementById('msg').innerHTML = msg;
  
  window.scrollTo(0, 1);
}

//Clears the modal dialog
function clearAction() {
  //document.getElementById('msg').innerHTML = '';
  
  document.getElementById('action').style.display = 'none';
}

//Automatically scroll away the address bar
addEventListener("load", function() { setTimeout(hideURLbar, 0); }, false);

function hideURLbar() {
  window.scrollTo(0,1);
}

function hideButton(button) {
  button.style.display = 'none';
}


//////////////////////////
//
// Requests
// See the "Requests" section on https://developers.facebook.com/mobile
//
//////////////////////////

//Send a request to friends have have logged into the app in the past, as well as friends that haven't
function sendRequestBoth() {
  FB.ui({
    method: 'apprequests',
    message: 'Learn how to make your mobile web app social',
  }, 
  function(response) {
    console.log('sendRequestBoth response: ', response);
  });
}

//Send an invite to friends that haven't logged into the app yet
function sendRequestInvite() {
  FB.ui({
    method: 'apprequests',
    suggestions: nonAppFriendIDs,
    message: 'Learn how to make your mobile web app social',
  }, function(response) {
    console.log('sendRequestInvite UI response: ', response);
  });
}

//Send a request to friends that are already using the app
function sendRequest() {
  FB.ui({
    method: 'apprequests',
    suggestions: appFriendIDs,
    message: 'Learn how to make your mobile web app social',
  }, function(response) {
    console.log('sendRequest UI response: ', response);
  });
}

//Send a request to a single friend that is using the app
function sendRequestSingle() {
  randNum = Math.floor ( Math.random() * friendIDs.length ); 

  var friendID = friendIDs[randNum];

  FB.ui({
    method: 'apprequests',
    //Use the first friend returned
    to: friendID,
    message: 'Learn how to make your mobile web app social',
  }, function(response) {
    console.log('sendRequestSingle UI response: ', response);
  });
}

//////////////////////////
//
// Credits
// See https://developers.facebook.com/docs/creditsapi/
//
//////////////////////////

//Prompt the user to pay for a virtual good
function sendPay() {
  FB.ui({
      method: 'pay',
      credits_purchase: false,
      // This is the item ID defined in your game or app
      order_info: 'locket'
  },
  function(response) {
    console.log('sendPay response: ', response);
  });
}

//If Hackbook is running from within the Facebook iOS native app, disable Credits
function checkForCredits() {
  if (FB.UA.nativeApp()) {
    document.getElementById('credits-button').style.display = 'none';
  }
}

//////////////////////////
//
// Graph API
// See https://developers.facebook.com/docs/reference/api/
//
//////////////////////////

//Detect when Facebook tells us that the user's session has been returned
function updateAuthElements() {
  FB.Event.subscribe('auth.statusChange', function(session) {
    if (session.authResponse) { 
      //The user is logged in, so let's pre-fetch some data and check the current 
      //permissions to show/hide the proper elements.
      preFetchData();
      checkUserPermissions();
    }
  });
}

//Get the user's basic information
function getUserBasicInfo() {
  setAction('Getting your information', false);
  
  var markup = '<div class="data-header">Your information:</div>';
  
  //Update display of user name and picture
  if (document.getElementById('user-info')) {
    var profilePictureUrl = '';
    if (user.picture.data) {
      profilePictureUrl = user.picture.data.url;
    } else {
      profilePictureUrl = user.picture;
    }
    markup = markup + '<strong>User ID:</strong> ' + user.id + '<br />' + '<strong>Name:</strong> ' + user.name + '<br />' + '<strong>Profile picture URL:</strong> <a href="' + profilePictureUrl + '" target="_blank">' + profilePictureUrl + '</a><br />';
    document.getElementById('user-info').innerHTML = markup;
    
    clearAction();
  }
}

//Get the user's friends
function getUserFriends() {
  var markup = '<div class="data-header">Friends (capped at 25):</div>';
  
  for (var i=0; i < friendsInfo.length && i < 25; i++) {
    var profilePictureUrl = '';
    if (friendsInfo[i].picture.data) {
      profilePictureUrl = friendsInfo[i].picture.data.url;
    } else {
      profilePictureUrl = friendsInfo[i].picture;
    }
    markup = markup + '<img src="' + profilePictureUrl + '">' + friendsInfo[i].name + '<br />';
  }
  
  document.getElementById('user-friends').innerHTML = markup;
}

//Get the user's check-ins
function getCheckIns() {
  setAction('Getting check-ins', false);
  
  FB.api('/me/checkins', function(response) {
    console.log('Got your check-ins: ', response);
    
    clearAction();
    
    if (!response.error) {
      displayCheckIns(response.data, document.getElementById('checkins'));
    }
  });
}

//Display the user's check-ins
function displayCheckIns(checkins, dom) {
  var markup = '<div class="data-header">Your last five check-ins:</div>';
  
  for (var i=0; i < checkins.length && i < 5; i++) {
    var checkin = checkins[i];
    
    markup += '<div class="place">'
        + '<div class="picture"><img src="http://graph.facebook.com/' + checkin.place.id + '/picture"></div>'
        + '<div class="info">'
        + '  <div class="name">' + checkin.place.name + '</div>'
        + '  <div class="check-in-msg">' + (checkin.message || '') + '</div>'
        + '</div>'
      + '</div>';
  }
  
  dom.innerHTML = markup;
}

//Display the local places that the user can check into
function displayPlaces(places, dom) {
  var markup = '<div class="data-header">Nearby locations:</div>';
  
  for (var i=0; i < places.length && i < 5; i++) {
    var place = places[i];
    
    markup += '<div class="place">'
        + '<div class="picture"><img src="http://graph.facebook.com/' + place.id + '/picture"></div>'
        + '<div class="info">'
        + '  <div class="name">' + place.name + '</div>'
        + '  <div class="check-in-button"><input type="button" value="Check in" onclick="checkin(' + place.id + ')" /></div>'
        + '</div>'
      + '</div>';
  }
  
  dom.innerHTML = markup;
}

//Check the user into the place
function checkin(id) {
  setAction("Checking you in", false);
  
  var params = {
    method: 'POST',
    place: id,
    coordinates: {
      latitude: curLocation.coords.latitude,
      longitude: curLocation.coords.longitude
    },
    message: ''
  };

  console.log('Checking you into using the following params: ', params);
  
  FB.api('/me/checkins', params,
    function(response) {
      clearAction();
      
      console.log('Checked you into the place, here\'s the response: ', response);
      
      setAction("You've successfully checked in!", false);
      
      setTimeout('clearAction();', 2000);
    }
  );
}

//Get locations near the user
function getNearby() {
  setAction("Getting nearby locations", false);
  
  // First use browser's geolocation API to obtain location
  navigator.geolocation.getCurrentPosition(function(location) {
    curLocation = location;
    console.log(location);

    // Use graph API to search nearby places
    var path = '/search?type=place&center=' + location.coords.latitude + ',' + location.coords.longitude + '&distance=1000';
    
    FB.api(path, function(response) {
      clearAction();
      console.log('Got some places near you: ', response);
      if (!response.error) {
        displayPlaces(response.data, document.getElementById('locations-nearby'));
      }
    });
  });
}

//Pre-fetch data, mainly used for requests and feed publish dialog
var nonAppFriendIDs = [];
var appFriendIDs = [];
var friendIDs = [];
var friendsInfo = [];

function preFetchData() {
  //First, get friends that are using the app
  FB.api({method: 'friends.getAppUsers'}, function(appFriendResponse) {
    appFriendIDs = appFriendResponse;
  
    //Now fetch all of the user's friends so that we can determine who hasn't used the app yet
    FB.api('/me/friends', { fields: 'id, name, picture' }, function(friendResponse) {
      friends = friendResponse.data;
      
      //limit to a 200 friends so it's fast
      for (var k = 0; k < friends.length && k < 200; k++) {
        var friend = friends[k];
        var index = 1;
        
        friendIDs[k] = friend.id;
        friendsInfo[k] = friend;
        
        for (var i = 0; i < appFriendIDs.length; i++) {
          if (appFriendIDs[i] == friend.id) {
            index = -1;
          }
        }       
        
        if (index == 1) { 
          nonAppFriendIDs.push(friend.id);
        }
      }
      
      console.log('Got your friend\'s that use the app: ', appFriendIDs);
      
      console.log('Got all of your friends: ', friendIDs);
      
      console.log('Got friends that are not using the app yet: ', nonAppFriendIDs);
    });
  });
}

//////////////////////////
//
// Authentication
// See "Logging the user in" on https://developers.facebook.com/mobile
//
//////////////////////////

var user = [];

var permissions = ['user_status', 'publish_checkins', 'user_likes'];

//Detect when Facebook tells us that the user's session has been returned
function authUser() {
  FB.Event.subscribe('auth.statusChange', handleStatusChange);
}

// Handle status changes
function handleStatusChange(session) {
    console.log('Got the user\'s session: ' + JSON.stringify(session));
    
    if (session.authResponse) {
        //document.body.className = 'connected';
        
        //Fetch user's id, name, and picture
        FB.api('/me', {
          fields: 'name, picture'
        },
        function(response) {
          if (!response.error) {
            document.body.className = 'connected';

            user = response;
            
            console.log('Got the user\'s name and picture: ' + JSON.stringify(response));
            
            //Update display of user name and picture
            if (document.getElementById('user-name')) {
              document.getElementById('user-name').innerHTML = user.name;
            }
            if (document.getElementById('user-picture')) {
              document.getElementById('user-picture').src = user.picture.data.url;
            }
          } else {
            document.body.className = 'not_connected';
            console.log('Error getting user info: ' + JSON.stringify(response.error));
            // Check for errors due to app being unininstalled
            if (response.error.error_subcode && response.error.error_subcode == "458") {
              setTimeout(function() {
                alert("The app was removed. Please log in again.");
              }, 0);              
            }
            logout();         
          }
          
          clearAction();
        });
    }
    else  {
      document.body.className = 'not_connected';
    
      clearAction();
    }
}

//Check the current permissions to set the page elements.
//Pass back a flag to check for a specific permission, to
//handle the cancel detection flow.
function checkUserPermissions(permissionToCheck) {
  var permissionsFQLQuery = 'SELECT ' + permissions.join() + ' FROM permissions WHERE uid = me()';
  FB.api('/fql', { q: permissionsFQLQuery },
    function(response) {
      if (document.body.className != 'not_connected') {
          for (var i = 0; i < permissions.length; i++) {
            var perm = permissions[i];
            var enabledElementName = document.getElementById('enabled_perm_' + perm);
            var disabledElementName = document.getElementById('disabled_perm_' + perm);
            if (response.data[0][perm] == 1) {
              enabledElementName.style.display = 'block';
              disabledElementName.style.display = 'none';
            } else {
              enabledElementName.style.display = 'none';
              disabledElementName.style.display = 'block';
            }
          }
          if (permissionToCheck) {
            if (response.data[0][permissionToCheck] == 1) {
              setAction("The '" + permissionToCheck + "' permission has been granted.", false);
              setTimeout('clearAction();', 2000);
              return true;
            } else {
              setAction('You need to grant the ' + permissionToCheck + ' permission before using this functionality.', false);
              setTimeout('clearAction();', 2000);
            } return false;
          }
          return true;
      }
  });
}

//Prompt the user to login and ask for the 'email' permission
function promptLogin() {
  FB.login(null, {scope: 'email'});
}

//This will prompt the user to grant you acess to a given permission
function promptPermission(permission) {
  FB.login(function(response) {
    if (response.authResponse) {
      checkUserPermissions(permission)
    }
  }, {scope: permission});
}

//See https://developers.facebook.com/docs/reference/api/user/#permissions
function uninstallApp() {
  FB.api('/me/permissions', 'DELETE',
    function(response) {
      //window.location.reload();
      // For may instead call logout to clear
      // cache data, ex: using in a PhoneGap app
      console.log('APP Uninstalled');
      logout();
  });
}

//See https://developers.facebook.com/docs/reference/javascript/FB.logout/
function logout() {
  FB.logout(function(response) {
    window.location.reload();
  });
}
