
/**
 * Notification that the UI is about to transition to a new screen.
 * Perform custom prescreen-transition logic here.
 * @param {String} currentScreenId 
 * @param {String} targetScreenId 
 * @returns {boolean} true to continue transtion; false to halt transition
 */
phoneui.prePageTransition = function(currentScreenId,targetScreenId) {
  // add custom pre-transition code here
  // return false to terminate transition
  return true;
}

/**
 * Notification that the UI has transitioned to a new screen.
 * 
 * @param {String} newScreenId 
 */
phoneui.postPageTransition = function(newScreenId) {
  
}

/**
 * Notification that device orientation has changed. 
 * 
 * @param {String} newOrientation 
 */
phoneui.postOrientationChange = function(newOrientation) {
  
}

/**
 * Called when document is loaded.
 */
phoneui.documentReadyHandler = function() {
	/* ilk yukleme */
	$("#m1-main-img_reklam").css("display","none");
	$("#m1-main-img_loading").css("display","none");
	$("#m1-main-eleman").css("display","none");
	$("#m1-main-push1").css("display","none");
	$("#m1-new-btngizli").css("display","none");
	
	/* reklami al */
	$.post("http://www.htmldizayn.com/android/sb118r/action.php",{hareket:'reklam'},function(x) {
		if(x=="yok"){
			$("#m1-main-img_reklam").css("display","none");
		}else{
			var reklam_parca = x.split("|");
			$("#m1-main-img_reklam").attr("src",reklam_parca[0]);
			$("#m1-main-img_reklam").css("display","block");
			
			$("#m1-main-img_reklam").click(function(){
				phoneui.showURL(reklam_parca[1], "_blank");
			});
		}
	});	
	
	
	/* arama kutusu change event */
	$("#m1-main-txt_search").change(function(){
		var aranan = $(this).val();
		if(aranan.length<3){return false;}
		if(aranan!=""){
			$("#m1-main-list1").html("");
			$("#m1-main-img_loading").css("display","block");
			$.post("http://www.htmldizayn.com/android/sb118r/action.php",{hareket:'liste',keyword:aranan},function(x) {
				$("#m1-main-list1").html(x);
				$("#m1-main-img_loading").css("display","none");
			});
		}
	});
	
	/* arama ikonu tik event */
	$("#m1-main-btn_icosearch").click(function(){
		var aranan = $("#m1-main-txt_search").val();
		if(aranan.length<3){return false;}
		if(aranan!=""){
			$("#m1-main-list1").html("");
			$("#m1-main-img_loading").css("display","block");
			$.post("http://www.htmldizayn.com/android/sb118r/action.php",{hareket:'liste',keyword:aranan},function(x) {
				$("#m1-main-list1").html(x);
				$("#m1-main-img_loading").css("display","none");
			});
		}
	});	
	
	
	/* toplam kayit al*/
	$.post("http://www.htmldizayn.com/android/sb118r/action.php",{hareket:'toplam',keyword:""},function(x) {
		$("#m1-main-txt_toplam").text("Toplam " + x + " kayıt.");
	});	
	
	/* kaydet butonu */
	$("#m1-new-btn_kaydet").click(function(){
		var yeni_isim = $("#m1-new-txt_isim").val();
		var yeni_sehir = $("#m1-new-txt_sehir").val();
		var yeni_tel1 = $("#m1-new-txt_tel1").val();
		var yeni_tel2 = $("#m1-new-txt_tel2").val();
		var yeni_tel3 = $("#m1-new-txt_tel3").val();
		var yeni_kangrup = $("#m1-new-txt_kangrup").text();
		var yeni_anahtar = $("#m1-new-txt_anahtar").val();
		$.post("http://www.htmldizayn.com/android/sb118r/action.php",{hareket:'yeni',post_isim:yeni_isim, post_sehir:yeni_sehir, post_tel1:yeni_tel1, post_tel2:yeni_tel2, post_tel3:yeni_tel3,post_kangrup:yeni_kangrup, post_anahtar:yeni_anahtar},function(x) {
			//eklendi burasi
			if(x=="var"){alert("Numara daha önceden eklenmiş.");return false;}
			if(x=="tamam"){phoneui.gotoScreen('m1-thanks', 'SLIDE_LEFT');}
		});			
	});

}

function Detay(n){
	$.post("http://www.htmldizayn.com/android/sb118r/action.php",{hareket:'detay',kayit_id:n},function(x) {
		parca = x.split("|");
		/* detaylari yazalim*/
		$("#m1-detail-txt_isim").text(parca[0]);
		$("#m1-detail-txt_sehir").text(parca[1]);
		$("#m1-detail-txt_tel1").text(parca[2]);
		$("#m1-detail-txt_tel2").text(parca[3]);
		$("#m1-detail-txt_tel3").text(parca[4]);
		$("#m1-detail-txt_kangrup").text(parca[5]);
		
		
		
		/* haritayi yapilandir */
		$('[id$=map1]').gmapready(function(gmap) {
			geocoder = new google.maps.Geocoder();
			geocoder.geocode({ 'address': parca[6] }, function(results, status) {
			  if (status == google.maps.GeocoderStatus.OK) {
				gmap.setCenter(results[0].geometry.location);
				var marker = new google.maps.Marker({
				gmap: map,
				position: results[0].geometry.location
				});
			  }
			});			
		});			
		
		/* arama butonlari */
		$("#m1-detail-img_call1").click(function(){phoneui.callPhone(parca[2]);});
		$("#m1-detail-img_call2").click(function(){phoneui.callPhone(parca[3]);});
		$("#m1-detail-img_call3").click(function(){phoneui.callPhone(parca[4]);});
		
		/* sms butonlari */
		$("#m1-detail-img_sms1").click(function(){phoneui.sendSms(parca[2]);});
		$("#m1-detail-img_sms2").click(function(){phoneui.sendSms(parca[3]);});
		$("#m1-detail-img_sms3").click(function(){phoneui.sendSms(parca[4]);});

	
		
		/* detayi ac*/
		phoneui.gotoScreen('m1-detail', 'SLIDE_LEFT');
	});	
}


var Viewer = (function(cordova){
	function Viewer() {
	}

	Viewer.showFile = function(url, mimetype, success, error) {
		cordova.exec(success, error, "Viewer", "showFile", [url, mimetype]);
	};
	
	cordova.addConstructor(function () {
	    if (cordova.addPlugin) {
	        cordova.addPlugin("viewer", Viewer);
	    } else {
	        if (!window.plugins) {
	            window.plugins = {};
	        }
	        window.plugins.viewer = Viewer;
	    }
	});	
	
	return Viewer;
})(window.cordova || window.Cordova || window.PhoneGap);






var Downloader = (function(cordova){
	function Downloader() {
	}

	Downloader.downloadFile = function(fileUrl, params, win, fail) {
		//Make params hash optional.
		if (!fail) win = params;
		cordova.exec(win, fail, "Downloader", "downloadFile", [fileUrl, params]);
	};
	
	cordova.addConstructor(function () {
	    if (cordova.addPlugin) {
	        cordova.addPlugin("downloader", Downloader);
	    } else {
	        if (!window.plugins) {
	            window.plugins = {};
	        }
	        window.plugins.downloader = Downloader;
	    }
	});	
	
	return Downloader;
})(window.cordova || window.Cordova || window.PhoneGap);















