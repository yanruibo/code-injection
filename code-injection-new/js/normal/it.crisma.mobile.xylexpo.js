









			/*
				Variabili globali
			*/
			
			
			var bottomPageCallbackFuncitions = new Array();
			var richiestaAsincrona=false;			
			
			var languageSelect = 'it';
			var tsid = 62;
			var db;
			var device_id = '';
			var radio_ricerca = new Array();
			var cat = new Array();
			var cat_id = 0;
			var parent_cat = new Array();
			var brand_name = new Array();
			var cur_page = new Array();
			var search_key = new Array();
			
			var valore = new Array();
			var tipo = new Array();
			
			var backpress = false;
			var backpressDetail = false;
			var backpressEventi = false;
			var backpressServizi = false;
			var backpressPreferiti = false;
			var depth = 0;
			var depthDetail = 0;
			
			
			var delPreferito = 0;
			var filtroPreferito = '';
		
			var type_info = '';
			
			
			init();
		
			var back = false;
			
			function init() {
		        //alert(device.name);
		        //alert(device.phonegap); 
		        //alert(device.platform);
		        //alert(device.uuid); 
		        //alert(device.version);
				try {
				//alert(typeof (window['device']) + " " + typeof (window['DeviceInfo']));
				if(typeof (window['device']) === "undefined" && typeof (window['DeviceInfo']) === "undefined") {
					setTimeout(init, 100);
					// alert("richiamo");
					return;
				}
				else {
					if(typeof (window['device']) !== "undefined" && !device.uuid)
					{
						setTimeout(init, 100);
						return;
					}
					if(typeof (window['DeviceInfo']) !== "undefined" && !DeviceInfo.uuid)
					{
						setTimeout(init, 100);
						return;
					}
					if (typeof (window['device']) !== "undefined") device_id = device.uuid;
					if (typeof (window['DeviceInfo']) !== "undefined") device_id = DeviceInfo.uuid;
					
					
				}
				// alert(device_id);
				
				} catch (e) {
					alert(e.message);
					setTimeout(init, 100);
				}
		    }
			
		


















			// bottomPageCallbackFuncitions.clear();
			//bottomPageCallbackFuncitions.push("function");
		
			// Funzione che riconosce se siamo a fine pagina
			$(document).ready(function() {
			
				$(window).scroll(function(){
					
					//console.log("$(window).scrollTop():" + $(window).scrollTop() + "  $(document).height():" + $(document).height() +"   $(window).height():"+ $(window).height());
					//console.log("errore: " + ($(window).scrollTop() - $(document).height() - $(window).height()));
					//if ($(window).scrollTop() == $(document).height() - $(window).height()){
					if ($(window).scrollTop() >= $(document).height() - $(window).height() - ($(window).height()/2)){
						// Richiamo le funzioni registrate
						//console.log("Handler registrati: " + bottomPageCallbackFuncitions.length);
						for (var i = 0; i < bottomPageCallbackFuncitions.length; i++) {
							try {
								eval(bottomPageCallbackFuncitions[i]);
							} catch (e) {alert(e.message);}
						}
					}
				});
				
			});
		

		
			function clear() {
				radio_ricerca = new Array();
				cat = new Array();
				parent_cat = new Array();
				brand_name = new Array();
				cur_page = new Array();
				search_key = new Array();
				
				radio_ricerca[0] = "libera";
				search_key[0] = '';
				cat[0] = 0;
				cat_id = 0;
				parent_cat[0] = 0;
				brand_name[0] = '';
				cur_page[0] = 1
				
				depthDetail=0;
				depth = 0;
				backpress = false;
				backpressDetail = false;
				backpressEventi = false;
				backpressServizi = false;
				backpressPreferiti = false;
				// alert("clear");
			}
						
			function setSelect() {
				clear();
				if($('#radio-libera').attr('checked')) radio_ricerca[0] = "libera";
				else if($('#radio-categorie').attr('checked')) radio_ricerca[0] = "categorie";
				else  radio_ricerca[0] = "marchi";
				search_key[0] = $('#search_key').val();
				// alert(search_key[0]);
				//alert($('div:jqmData(role="content")[id="ric_espo_content"]:visible:visible > form > div > input[id="search_key"]').val());
				//search_key[0] = $('div:jqmData(role="content") > form > input[id="search_key"]').val();
				
				//alert(radio_ricerca[0]);
			}
		
			$('div:jqmData(role="page")[id="prima"]').live('pagebeforeshow',function(){
				clear();
				if (back != true) {
					onDeviceReady();
/* 					$('div:jqmData(role="content") > div[id="spashScreen"]').show();
					$('div:jqmData(role="content")[id="main"] > div[id="contentMain"] > table').hide();
					$('div:jqmData(role="header")').hide();
					setTimeout('hideSplashScreen()',3000); */
				}
			 });
			
/* 			function hideSplashScreen() {				
				$('div:jqmData(role="content") > div[id="spashScreen"]').hide();
				$('div:jqmData(role="content")[id="main"] > div[id="contentMain"] > table').show();
				$('div:jqmData(role="header")').show();
				fixgeometry();
				setTimeout('fixgeometry()',1000);
				back = true;
			} */
						
		    // PhoneGap is ready
		    //
		    function onDeviceReady() {
		        db = window.openDatabase("MacefMobileDb", "1.0", "Macef Mobile Db", 200000);
		        db.transaction(checkDB, errorCB);
			}
		    // Populate the database 
		    //
		    function checkDB(tx) {
		         //tx.executeSql('DROP TABLE IF EXISTS PREFERRED');
		         //tx.executeSql('CREATE TABLE IF NOT EXISTS PREFERRED (nid unique, name, type, padiglione)');
		         //tx.executeSql('SELECT nid, name, type, padiglione FROM PREFERRED');
		         tx.executeSql('SELECT nid, name, type, padiglione, stand, location, lang FROM PREFERRED', [] , querySuccess, errorCB);
		         //tx.executeSql('INSERT INTO PREFERRED (type) VALUES ("E")');
		    }
		    // Transaction error callback
		    //
		    function errorCB(tx, err) {
		    	//alert("Errore nell'apertura del db. Il db verrÅ• ricreato... "+err);
		    	tx.executeSql('DROP TABLE IF EXISTS PREFERRED');
		        tx.executeSql('CREATE TABLE IF NOT EXISTS PREFERRED (nid unique, name, type, padiglione, stand, location, lang)');
		    }
		    function querySuccess(tx, results) {}

		

			$('div:jqmData(role="page")[id="info-details"]').live('pagebeforeshow',function(){
				if($('div:jqmData(role="content") > div[id="page-wrap-info"]')) $('div:jqmData(role="content") > div[id="page-wrap-info"]').html('');
				if($("#titolo-info")) $("#titolo-info").text('');
				getInfoDetails();
				//setTimeout('fixgeometry()',1000);
			});
			
			$('div:jqmData(role="page")').live('pagehide',function(event, ui){				
				var page = jQuery(event.target);
				// alert(page.attr('id'));
				if(page.attr('id') != "prima"){
					page.remove();
					// alert("remove");
				}
			});
			$('div:jqmData(role="page")[id="list"]').live('pagebeforehide',function(event, ui){
				// console.log("hide list");
				richiestaAsincrona=false;
				bottomPageCallbackFuncitions.length = 0;
			});
				
/* 
			$('div:jqmData(role="page")[id="prima"]').live('pageshow',function(){
				setTimeout('fixgeometry()',1000);
			}); */
			
			$('div:jqmData(role="page")[id="prima"]').live('pageshow',function(){
				setTimeout('fixgeometry()',1000);
/* 				  var header = $('div:jqmData(role="header"):visible');
				  var footer = $('div:jqmData(role="footer"):visible');
				  var content = $('div:jqmData(role="content"):visible:visible');
		  		  var viewport_height = $(window).height();
		  			 
		  		  var content_height = viewport_height - header.outerHeight() - footer.outerHeight();
		  		  
		  		  //alert(content.outerHeight()+ " "  +header.outerHeight()+" "+footer.outerHeight() +" "+ viewport_height); */
			});			
			
			$('div:jqmData(role="page")[id="list"]').live('pagebeforeshow',function(){
				try{
					getXmlList();
				} catch(e) {
					alert(e.message);
				}
			});
			
			$('div:jqmData(role="page")[id="info"]').live('pagebeforeshow',function(){
				try{
					getInfoPageLists();
				} catch(e) {
					alert(e.message);
				}
			});
			
			$('div:jqmData(role="page")[id="list_servizi"]').live('pagebeforeshow',function(){
				if (cat_id) { getXmlListServizi(); }
				else getXmlListCategorieServizi();

			});
			
			$('div:jqmData(role="page")[id="list_eventi"]').live('pagebeforeshow',function(){
				getXmlListEventi();
			});
			
			$('div:jqmData(role="page")[id="detail_list"]').live('pagebeforeshow',function(){
				// alert("detail_list before");
				getItemDetails();
			});
			
			$('div:jqmData(role="page")[id="preferiti"]').live('pagebeforeshow',function(){
				//alert('This page it is going to be show.');
				updatePreferiti();
			});

			function backHeadler() {
				// alert($('div:jqmData(role="page") > div > table > tbody > tr > td > #backButton').attr('id'));
				$('div:jqmData(role="page") > div > table > tbody > tr > td > #backButton').trigger('click');
				
			}
			
/* 			$(document).bind("scrollstop", function() {
				$.fixedToolbars.show();
			});
			*/
			$(document).bind("pageshow", function() {
				setTimeout('fixgeometry()',500);
				// setTimeout('$.fixedToolbars.show();', 1000);
				/* try {
					$.fixedToolbars.setTouchToggleEnabled(false);
				} catch (e) {
					alert(e.message);
				} */
			});
			
			$(document).bind("pagebeforeshow", function() {
				if(languageSelect && languageSelect == 'en')
                	$('html').localize();
				// setTimeout('$.fixedToolbars.show();', 1000);
				/* try {
					$.fixedToolbars.setTouchToggleEnabled(false);
				} catch (e) {
					alert(e.message);
				} */
			}); 

		





var info_pageId = '';

function getInfoPageLists() {
	// alert("entrat????");
	$.ajax({
		   async: false,
		   type: "GET",
		   //url: "http://fieremobile/espositori-search-page?title=aaa&prodotto_tid=355&rand="+(new Date().getTime()),
		   url: URL_SERVER + "pagina-ricerca-nomi-info-pages?lang="+languageSelect+"&tsid="+tsid+"&rand="+(new Date().getTime()),
		   //url: "http://192.168.1.127/fieremobile/" + "page-info-page-names?lang="+languageSelect+"&tsid="+tsid+"&rand="+(new Date().getTime()),
		   dataType: "xml",
		   success: function(xml) {
		   $('div:jqmData(role="content") > ul[id="gio"]').html('');
		   $('div:jqmData(role="content") > ul[id="list-wrap"]').html('');
		   
		   $(xml).find('page').each(function(){
								   var name = $(this).find('name').text();
								   var nid = $(this).find('nid').text();
								   
								   $('<li data-theme="d" class="ui-btn ui-btn-icon-right ui-li ui-btn-up-d"><div class="ui-btn-inner ui-li"><div class="ui-btn-text"><a data-ajax="true" onclick="info_pageId='+nid+'" href="info-details.html?cat_id='+nid+'" class="ui-link-inherit2"><p class="list_row_single_line list-wrap"><b>'+name+'</b></p><span class="ui-icon ui-icon-arrow-r"></span></a></div></div></li>').appendTo('div:jqmData(role="content") > ul[id="list-wrap"]');
								   
								   });
		   fixgeometry();
		   },
		   
		   error: function(req, error) { 			
		   //$("#gio").html("Errore: " + error + "<br /><br /> " + req);
		   $("#gio").html("<b>Errore nel recupero informazioni. Prego controllare la connessione.</b>");
		   }
		   });
	
}

function getInfoDetails() {
	$.ajax({
		   async: false,
		   type: "GET",
		   //url: "http://fieremobile/espositori-search-page?title=aaa&prodotto_tid=355&rand="+(new Date().getTime()),
		   url: URL_SERVER + "page-info-page-contents?nid="+info_pageId+"&rand="+(new Date().getTime()),
		   //url: "http://192.168.1.127/fieremobile/" + "page-info-page-contents?nid="+info_pageId+"&rand="+(new Date().getTime()),
		   dataType: "xml",
		   success: function(xml) {
		   var res_c ='';
		   //var content = $(xml).find('Info').text();
		   var content = $(xml).find('page');
		   $("#titolo-info").text(content.find('name').text());
		   var prima = content.find('desc').text();
		   var dopo = content.find('dopo').text();
		   var img_url = content.find('image').text();
		   
		   //alert(content);
		   // se ci sono immagini al source devo aggiungere l'url del server
		   //			if (prima) prima = prima.replace("src=\"/FiereMobile/", "src=\"" + URL_SERVER);
		   //			if (dopo) dopo = dopo.replace("src=\"/FiereMobile/", "src=\"" + URL_SERVER);
		   if (prima) prima = ReplaceAll(prima, "src=\"/", "src=\"" + URL_SERVER);
		   if (dopo) dopo = ReplaceAll(dopo, "src=\"/", "src=\"" + URL_SERVER);
		   //alert(content);
		   //alert(prima);
		   
		   
		   /*var trovata_img = false;
			var start = content.indexOf("<img");
			var end = content.indexOf("/>", start)+2;
			if (start>-1 && end >-1) {
			trovata_img = true;
			var img_html = content.substring(start, end);
			alert("start: " + start + "  end:" + end + "   img_html:" + img_html);
			var start_src = img_html.indexOf("src=\"");
			var end_src = img_html.indexOf("\"", start_src+5);
			var img_src = img_html.substring(start_src+5, end_src);
			//alert("start: " + start_src + "  end:" + end_src + "   img_src:" + img_src)
			
			alert(img_src);
			
			content = content.substring(0,start) + 
			'<div style="overflow: hidden;">'+
			'<div id="viewer" style="width: 98%;height: 400px;border: 1px solid black;position: relative;"></div>' +
			'</div>' +
			content.substring(end);
			}*/
		   
		   
		   if (img_url && img_url!='') {
		   
		   img_url = URL_SERVER + img_url;
		   // alert(img_url);
		   
		   res_c += prima;
		   res_c += '<div style="overflow: hidden;" id="viewer-conteiner">'+
		   '<div id="viewer" style="width: 90%;height: 400px;border: 1px solid black;position: relative;"></div>' +
		   '</div>';
		   res_c += dopo;
		   }
		   else {
		   res_c += prima;
		   res_c += dopo;
		   }
		   
		   
		   
		   var res = "<div >";
		   //res = res + content;
		   res += res_c;
		   res = res + "</div>";
		   
		   $('div:jqmData(role="content") > div[id="page-wrap-info"]').html(res);
		   
		   
		   
		   
		   
		   
		   
		   
		   
		   //if (trovata_img) {
		   if (img_url && img_url!='') {
		   
		   try {
		   // alert($('div:jqmData(role="content")[id="info-details-content"] > div[id="page-wrap-info"] > div > div > div[id="viewer"]').attr('id'));
		   
		   $('div:jqmData(role="content")[id="info-details-content"] > div[id="page-wrap-info"] > div > div > div[id="viewer"]').iviewer(
			{
				//src: img_src + "?rand="+(new Date().getTime()),
				src: img_url + "?rand="+(new Date().getTime()),
				update_on_resize: false,
				// zoom: 100,
				initCallback: function ()
				{
					//	alert("ma si scemu");
					iviewer_obj = this;
					iviewer_obj.fit();
																																		 },
																																		 onFinishLoad: function() { iviewer_obj.setCoords(0,0); },
																																		 onMouseMove: function(object, coords) { },
																																		 onStartDrag: function(object, coords) { return true; }, //this image will be dragged
																																		 onDrag: function(object, coords) { },
																																		 //onBeforeDrag: function(coords) { return true; },
																																		 onFinishUpdate: function() {  },
																																		 });
		   }
		   catch(e) {
		   alert(e.message);
		   }
		   
		   
		   
		   $('div:jqmData(role="content") > div[id="page-wrap-info"] > div > div[id="viewer"]').live('swipeleft swiperight',function(event){
																									 });
		   $('div:jqmData(role="content") > div[id="page-wrap-info"] > div > div[id="viewer"]').live('swipeup',function(event){
																									 });
		   $('div:jqmData(role="content") > div[id="page-wrap-info"] > div > div[id="viewer"]').live('swipedown',function(event){
																									 });
		   $('div:jqmData(role="content") > div[id="page-wrap-info"] > div > div[id="viewer"]').live('scrollstop',function(event){
																									 });
		   
		   
		   }
		   
		   
		   
		   
		   
		   
		   
		   
		   
		   
		   },
		   
		   error: function(req, error) { 			
		   //$("#page-wrap-info").text("Errore: " + error);
		   $('div:jqmData(role="content") > div[id="page-wrap-info"]').html("<b>Errore nel recupero informazioni. Prego controllare la connessione.</b>");
		   }

	});
}

var poloNid = 0;

	$('div:jqmData(role="page")[id="mob-details"]').live('pageshow',function(event, ui){
			var url_detail = '';
			if(poloNid == 0)
			{
				$.ajax({
					async: false,
					type: "GET",
					url: URL_SERVER + "tsidtopolo?tsid="+tsid+"&rand="+(new Date().getTime()),
					dataType: "xml",
					success: function(xml) {
						var content = $(xml).find('page');
						poloNid = content.find('nid').text();
						console.log("recuperato il nid del polo: " + poloNid);
					},
					error: function(req, error) { 			
						//$("#page-wrap-info").text("Errore: " + error);
						$('div:jqmData(role="content") > div[id="page-wrap-info"]').html("<b>Errore nel recupero informazioni. Prego controllare la connessione.</b>");
						console.log("errore nel recuperato del nid del polo: " + URL_SERVER + "tsidtopolo?tsid="+tsid+"&rand="+(new Date().getTime()));
					}
				});
			}
			url_detail =  URL_SERVER + "page-info-mobility-contents?polo_fieristico_nid="+poloNid+"&lang="+languageSelect+"&rand="+(new Date().getTime());
			console.log(url_detail);
			$("#titolo-info").text("Mobilità");
			//alert(url_detail);
			$.ajax({
				async: false,
				type: "GET",
				url: url_detail,
				dataType: "xml",
				success: function(xml) {

					var res_c ='';
					//var content = $(xml).find('Info').text();
					var content = $(xml).find('page');
					var prima = content.find('desc').text();
					var dopo = content.find('dopo').text();
					var img_url = content.find('image').text();
					
					//alert(content);
					// se ci sono immagini al source devo aggiungere l'url del server
//					if (prima) prima = prima.replace("src=\"/FiereMobile/", "src=\"" + URL_SERVER);
//					if (dopo) dopo = dopo.replace("src=\"/FiereMobile/", "src=\"" + URL_SERVER);
				   if (prima) prima = ReplaceAll(prima, "src=\"/", "src=\"" + URL_SERVER);
				   if (dopo) dopo = ReplaceAll(dopo, "src=\"/", "src=\"" + URL_SERVER);
				   //alert(content);
					//alert(prima);
					
					
					/*var trovata_img = false;
					var start = content.indexOf("<img");
					var end = content.indexOf("/>", start)+2;
					if (start>-1 && end >-1) {
						trovata_img = true;
						var img_html = content.substring(start, end);
						alert("start: " + start + "  end:" + end + "   img_html:" + img_html);
						var start_src = img_html.indexOf("src=\"");
						var end_src = img_html.indexOf("\"", start_src+5);
						var img_src = img_html.substring(start_src+5, end_src);
						//alert("start: " + start_src + "  end:" + end_src + "   img_src:" + img_src)
						
						alert(img_src);
						
						content = content.substring(0,start) + 
						'<div style="overflow: hidden;">'+
						'<div id="viewer" style="width: 98%;height: 400px;border: 1px solid black;position: relative;"></div>' +
						'</div>' +
						content.substring(end);
					}*/
					
					
					if (img_url && img_url!='') {
						
						img_url = URL_SERVER + img_url;
						console.log(img_url);
						
						res_c += prima;
						res_c += '<div style="overflow: hidden;" id="viewer-conteiner">'+
						'<div id="viewer" style="width: 90%;height: 400px;border: 1px solid black;position: relative;"></div>' +
						'</div>';
						res_c += dopo;
					}
					else {
						res_c += prima;
						res_c += dopo;
					}
					
					
					
					var res = "<div id=\"div_content\">";
					//res = res + content;
					res += res_c;
					res = res + "</div>";
					
					$('div:jqmData(role="content") > div[id="page-wrap-info"]').html(res);
					
					
					
					
					
					
					
					
					//if (trovata_img) {
					if (img_url && img_url!='') {

						try {
							// alert($('div:jqmData(role="content")[id="info-details-content"] > div[id="page-wrap-info"] > div > div > div[id="viewer"]').attr('id'));
							
							$('div:jqmData(role="content")[id="info-mob-content"] > div[id="page-wrap-info"] > div[id="div_content"] > div[id="viewer-conteiner"] > div[id="viewer"]').iviewer(
				                   {
				                   //src: img_src + "?rand="+(new Date().getTime()),
				                   src: img_url + "?rand="+(new Date().getTime()),
				                   update_on_resize: false,
				                   // zoom: 100,
				                   initCallback: function ()
				                   {
										//	alert("ma si scemu");
				                	   iviewer_obj = this;
				                	   iviewer_obj.fit();
				                   },
				                   onFinishLoad: function() { iviewer_obj.setCoords(0,0); },
				                   onMouseMove: function(object, coords) { },
				                   onStartDrag: function(object, coords) { return true; }, //this image will be dragged
				                   onDrag: function(object, coords) { },
				                   //onBeforeDrag: function(coords) { return true; },
				                   onFinishUpdate: function() {  },
				              });
						}
						catch(e) {
							alert(e.message);
						}
			
						
//						$('div:jqmData(role="content")[id="info-mob-content"] > div[id="page-wrap-info"] > div > div[id="viewer-conteiner"] > div[id="viewer"]').live('swipeleft swiperight',function(event){
//						});
//						$('div:jqmData(role="content")[id="info-mob-content"] > div[id="page-wrap-info"] > div > div[id="viewer-conteiner"] > div[id="viewer"]').live('swipeup',function(event){
//						});
//						$('div:jqmData(role="content")[id="info-mob-content"] > div[id="page-wrap-info"] > div > div[id="viewer-conteiner"] > div[id="viewer"]').live('swipedown',function(event){
//						});
//						$('div:jqmData(role="content")[id="info-mob-content"] > div[id="page-wrap-info"] > div > div[id="viewer-conteiner"] > div[id="viewer"]').live('scrollstop',function(event){
//						});
						
						
						$('div:jqmData(role="content")[id="info-mob-content"] > div[id="page-wrap-info"] > div[id="div_content"] > div[id="viewer-conteiner"] > div[id="viewer"]').live('swipeleft swiperight',function(event){
							//event.preventDefault();
							if (event.type == "swiperight") {
								//updatePointer();
							}
							if (event.type == "swipeleft") {
								//updatePointer();
							}
						});
						
						$('div:jqmData(role="content")[id="info-mob-content"] > div[id="page-wrap-info"] > div[id="div_content"] > div[id="viewer-conteiner"] > div[id="viewer"]').live('swipeup',function(event){
							//event.preventDefault();
							//updatePointer();
						});
						
						$('div:jqmData(role="content")[id="info-mob-content"] > div[id="page-wrap-info"] > div[id="div_content"] > div[id="viewer-conteiner"] > div[id="viewer"]').live('swipedown',function(event){
							//event.preventDefault();
							//updatePointer();
						});
						
						$('div:jqmData(role="content")[id="info-mob-content"] > div[id="page-wrap-info"] > div[id="div_content"] > div[id="viewer-conteiner"] > div[id="viewer"]').live('scrollstop',function(event){
							//event.preventDefault();
							// updatePointer();
						});
			
					}
					
					
				},
			
				error: function(req, error) { 			
					//$("#page-wrap-info").text("Errore: " + error);
					$('div:jqmData(role="content") > div[id="page-wrap-info"]').html("<b>Errore nel recupero informazioni. Prego controllare la connessione.</b>");
				}
			});
	});

//var URL_SERVER = "http://192.168.1.23/FiereMobile/"; // server
//var URL_SERVER = "http://192.168.1.127/fieremobile/"; // mio
//var URL_SERVER = "http://78.7.238.110/FiereMobile/"; // server remoto
//var URL_SERVER = "http://mobileapp.expopage.net/"; // server remoto
var URL_SERVER = "http://mobileapp.fieramilano.it/"; // server remoto produzione

//var URL_SERVER_EXP = "http://194.79.57.141/portal/tools/"; // Expopage (staging)
var URL_SERVER_EXP = "http://www.expopage.net/"; // Expopage (produzione)

var URL_SERVER_MAPS = "http://www.expopage.net/images/mapsimg/"; //Server mappe


var nid_preferred ='';
var name_preferred = '';
var type_preferred = '';
var padiglione_preferred = '';
var stand_preferred ='';
var location_preferred ='';

function getItemDetails() {
	if(backpressDetail == true) {
		//alert(backpressDetail);
		backpressDetail = false;
		depthDetail--;
	}
	else depthDetail++;
	if(!tipo[depthDetail - 1]) tipo[depthDetail - 1] = tipo[depthDetail - 2];
	if(!valore[depthDetail - 1]) valore[depthDetail - 1] = valore[depthDetail - 2];
	
	if (tipo[depthDetail-1]=='E'){ $('div:jqmData(role="page")[id="detail_list"] > div > table > tbody > tr > td[id="title"] > p > span').text("Dettaglio espositore"); }
	else if (tipo[depthDetail-1]=='V') $('div:jqmData(role="page")[id="detail_list"] > div > table > tbody > tr > td[id="title"] > p > span').text("Dettaglio evento");
	else if (tipo[depthDetail-1]=='S') $('div:jqmData(role="page")[id="detail_list"] > div > table > tbody > tr > td[id="title"] > p > span').text("Dettaglio servizio");
	else {
		//alert("errore nel passaggio dei parametri: tipo=" + tipo[depthDetail-1] + " depthDetail: " + depthDetail);
		return;
	}
	// alert("errore nel passaggio dei parametri: tipo=" + tipo[depthDetail-1] + " depthDetail: " + depthDetail); 
	getXmlDetails(tipo[depthDetail-1], valore[depthDetail-1]);
}
 
 
function getXmlDetails(tipo, nid) {
	
	// var device_id = getUrlVars()["deviceid"];
	// alert(device_id);
	
	var url_detail = "";
	if (tipo=='V') url_detail= URL_SERVER + "pagina-ricerca-eventi?nid="+nid+"&lang="+languageSelect+"&deviceid=" + device_id + "&rand="+(new Date().getTime());
	else if (tipo=='E') url_detail = URL_SERVER_EXP + "portal/tools/xmlSearchData.jsp?mode=eboothdetail&eboothid="+nid+"&languagecode="+languageSelect+"&deviceid=" + device_id + "&rand="+(new Date().getTime());
	else if (tipo=='S') url_detail = URL_SERVER + "pagina-ricerca-servizi?nid="+nid+"&lang="+languageSelect+"&deviceid=" + device_id + "&rand="+(new Date().getTime());
	//alert(url_detail);
	// alert("nid: " + nid + "tipo: " + tipo);
	
	$.ajax({
		async: false,
		type: "GET",
		url: url_detail,
		dataType: "xml",
		success: function(xml) {
		   $('div:jqmData(role="content") > div[id="contet_div"]').html('');
		   
			if (tipo=='V'){
				$(xml).find('evento').each(function(){
					var data = $(this).find('data').text();
					var ora = $(this).find('ora').text();
					var desc = $(this).find('desc').text();
					var name = $(this).find('name').text();
					var nid = $(this).find('nid').text();
					var padiglione = $(this).find('padiglione').text();
					var location = $(this).find('location').text();
					var stand = $(this).find('stand').text();
					
					var location_map = $(this).find('location_map').text();
					var posx = $(this).find('posy').text();
					var posy = $(this).find('posx').text();

					
					var res = "<div>";
					res = res + "<h1>"+name+"</h1>";
					res = res + "<p> </p>";
					res = res + "<h3>"+data;
					if (ora && ora!='') res = res + " - " + ora;
					res = res + "</h3>";
					res = res + "<p> </p>";
					
					
					
					
					
					res+="<ul style='margin-left:0px !important; padding-left:0px !important;'>";
					var posizione = "";
					if (padiglione && padiglione!='') posizione ='<span>Padiglione</span> ' + padiglione + ' ' + stand;
					if (location && location!='') posizione = location;
					if ((padiglione && padiglione!='' && posx!=null && posx!='' && posy!=null && posy!='') || (location && location!='' && location_map && location_map!='')) {
						//res = res + "<div class='esp_rete_div'><br /><br /><a class='button_font' href='stand_map.html?tsid="+tsid+"&pad="+pad+"&x="+x+"&y="+y+"' data-role='button' data-ajax='false' onclick='$.mobile.pageLoading();' data-rel='dialog'>Mappa esposizione stand</a></div>";
						pad_m = padiglione;
						x_m = posx;
						y_m = posy;
						location_m = location_map;
						res +='<li data-theme="d" class="ui-btn ui-btn-icon-right ui-li ui-btn-up-d"><div style="width:100% !important; padding-bottom: 0px !important; margin-bottom: 0px !important;" class="ui-btn-inner ui-li"><a data-ajax="true" href="stand_map.html" class="ui-link-inherit2"><p style="color:#000000 !important; font-size:14px !important;" class="list-wrap"><div style="width:100% !important" class="ui-btn-text"><b>'+posizione+'</b></p><span style="margin-top: -16px !important;" class="ui-icon ui-icon-arrow-r"></span></div></a></div></li>';
					}
					else res +='<li data-theme="d" class="ui-btn ui-btn-icon-right ui-li ui-btn-up-d"><div style="width:100% !important; padding-bottom: 0px !important; margin-bottom: 0px !important;" class="ui-btn-inner ui-li"><div style="width:100% !important" class="ui-btn-text"><p style="color:#000000 !important; font-size:14px !important;" class="list-wrap"><b>'+posizione+'</b></p></div></div></li>';
					res+="</ul>";
					
					res = res + "<div>"+desc+"</div>";
					res = res + "<br />";
					res = res + "</div>";
					
					$('div:jqmData(role="content") > div[id="contet_div"]').html(res);
										   
					name = ReplaceAll(name, "'", "\\'");

					var bar = "<div class='barra_espositore'>";
					bar += '<table style="width:100%;"><tr><td class="barra_espositore_td"><a href="#" onclick="addPreferred(\''+nid+'\', \''+name+'\', \'V\', \''+padiglione +'\',\'' + stand +'\', \''+location+'\');"><img src="img/buttons_espositore/button_preferiti.png" /></a></td></tr>';
					bar += "<tr><td class='barra_espositore_td'>Preferito</td></tr></table>";
					bar += "</div>";
					$('div:jqmData(role="footer") > div[id="footer_details"]').html(bar);
					
				});
			}


			else if (tipo=='E') {	
				
				$(xml).find('ebooth').each(function(){
					var id = $(this).attr('id');
					//var tsid = $(this).attr('tsid');
					var name = $(this).find('name').text();
					var nameshort = $(this).find('nameshort').text();
					var logo = $(this).find('logo').text();

					// Coords
					var coords = $(this).find('coords');
					var coord = $(coords).find('coord');
					var stand = $(coord).attr('stand');
					var pad = $(coord).attr('pad');
					var x = $(coord).attr('x');
					var y = $(coord).attr('y');

					var city = $(this).find('city').text();
					var state = $(this).find('state').text();
					var country = $(this).find('country').text();
					var address = $(this).find('address').text();
					var zipcode = $(this).find('zipcode').text();
					var phone = $(this).find('phone').text();
					if (phone) phone = phone.replace(",","");
					
					var fax = $(this).find('fax').text();
					var email = $(this).find('email').text();
					var website = $(this).find('website').text();

					// Azienda rappresentata
					var repby = $(this).find('repby').text();
					var repby_id = $(this).find('repby').attr('id');
					
					
					
					
					var res ="";
					
					res += '<ul class="ui-listview" data-role="listview">';
					res += '<li class="ui-li ui-li-divider ui-btn ui-bar-d ui-btn-up-undefined" data-role="list-divider" role="heading">'+name;
					
					
					if (logo && logo!='') {
						//res += "<div><div style='height:20px; width:99%'></div><br />";
						res += "<div class='dib_logo_esp'><center>";
						res += "<img src='"+URL_SERVER_EXP+logo+"' style='width:80%'/>";
						res += "</center></div>";
					}
					//res += "<br />";

					res += '</li>';
					
					res += '<li data-theme="d" class="ui-btn ui-btn-icon-right ui-li ui-btn-up-d"><div style="width:100% !important; padding-bottom: 0px !important;" class="ui-btn-inner ui-li"><div style="width:100% !important" class="ui-btn-text">'+
					'<p class="list-wrap"><b>'+address+ ' - '+zipcode + '</b></p>'+
					'<p class="list-wrap"><b>'+city+ ' '+state+ ' '+country + '</b></p>';
					if (phone && phone!='')	res += '<p style="color: #a6a6a6; padding-top: 0px !important; margin-top: 0px !important; line-height: 90%; font-size: 15px;" class="list-wrap"><span>Tel.</span>: '+phone+ '</p>';
					if (fax && fax!='')	res += '<p style="color: #a6a6a6; padding-top: 0px !important; margin-top: 0px !important; line-height: 90%;font-size: 15px;" class="list-wrap">Fax: ' +fax + '</p>';
					if (email && email!='')	 res += '<p style="color: #a6a6a6; padding-top: 0px !important; margin-top: 0px !important; line-height: 90%;font-size: 15px;" class="list-wrap">E-mail: ' + email + '</p>';
					if (website && website!='')	res += '<p style="color: #a6a6a6; padding-top: 0px !important; margin-top: 0px !important; line-height: 90%;font-size: 15px;" class="list-wrap">Web: ' + website + '</p>';
					res += '</div></div></li>';
					
					
					if (pad!=null && pad!='' && tsid!=null && tsid!='' && x!=null && x!='' && y!=null && y!='') {
						//res = res + "<div class='esp_rete_div'><br /><br /><a class='button_font' href='stand_map.html?tsid="+tsid+"&pad="+pad+"&x="+x+"&y="+y+"' data-role='button' data-ajax='false' onclick='$.mobile.pageLoading();' data-rel='dialog'>Mappa esposizione stand</a></div>";
						pad_m = pad;
						x_m = x;
						y_m = y;
						location_m = '';
						res +='<li data-theme="d" class="ui-btn ui-btn-icon-right ui-li ui-btn-up-d"><div style="width:95% !important; padding-bottom: 0px !important; margin-bottom: 0px !important;" class="ui-btn-inner ui-li"><a data-ajax="true" href="stand_map.html" class="ui-link-inherit2"><p style="color:#000000 !important; font-size:14px !important;" class="list-wrap"><div style="width:100% !important" class="ui-btn-text"><b><span>Padiglione</span> '+pad+', '+stand+'</b></p><span style="margin-top: -16px !important;" class="ui-icon ui-icon-arrow-r"></span></div></a></div></li>';
					}
					else res +='<li data-theme="d" class="ui-btn ui-btn-icon-right ui-li ui-btn-up-d"><div style="width:100% !important; padding-bottom: 0px !important; margin-bottom: 0px !important;" class="ui-btn-inner ui-li"><div style="width:100% !important" class="ui-btn-text"><p style="color:#000000 !important; font-size:14px !important;" class="list-wrap"><b>Padiglione '+pad+', '+stand+'</b></p></div></div></li>';
					
					
					if (repby && repby!='') {
						res += '<li class="ui-li ui-li-divider ui-btn ui-bar-d ui-btn-up-undefined" data-role="list-divider" role="heading"><span>Rappresentata da</span></li>';
						res +='<li data-theme="d" class="ui-btn ui-btn-icon-right ui-li ui-btn-up-d"><div style="width:90% !important; !important; padding-bottom: 0px !important; margin-bottom: 0px !important;" class="ui-btn-inner ui-li"><div style="width:100% !important" class="ui-btn-text"><a data-ajax="true" onclick="valore[depthDetail]='+repby_id+';tipo[depthDetail] = \'E\';" href="detail_list.html?valore='+repby_id+'&tipo=E&deviceid='+ device_id + '" class="ui-link-inherit2"><p style="color: #000000 !important; font-size:14px !important;" class="list-wrap"><b>'+repby+'</b></p><span style="margin-top: -16px !important;" class="ui-icon ui-icon-arrow-r"></span></a></div></div></li>';
					}
					
					// Marchi
					var ex_m = false;
					var res_m = '<li class="ui-li ui-li-divider ui-btn ui-bar-d ui-btn-up-undefined" data-role="list-divider" role="heading">Marchi:</li>';
					var brands = $(this).find('brands');
					$(brands).find('brand').each(function(){
						var brand_name = $(this).text();
						//var brand_id = $(this).attr('id');
						res_m +='<li data-theme="d" class="ui-btn ui-btn-icon-right ui-li ui-btn-up-d"><div style="width:100% !important; padding-bottom: 0px !important; margin-bottom: 0px !important;" class="ui-btn-inner ui-li"><div style="width:100% !important;" class="ui-btn-text"><p style="font-size:14px !important;" class="list-wrap"><b>'+brand_name+'</b></p></div></div></li>';
						ex_m = true;
					});
					if (ex_m) res += res_m;
					
					// Categorie
					var ex_c = false;
					var res_c = '<li class="ui-li ui-li-divider ui-btn ui-bar-d ui-btn-up-undefined" data-role="list-divider" role="heading">Categorie:</li>';
					var cat_s = $(this).find('categories');
					$(cat_s).find('cat').each(function(){
						var cat_name = $(this).text();
						var cat_id = $(this).attr('id');
						res_c +='<li data-theme="d" class="ui-btn ui-btn-icon-right ui-li ui-btn-up-d"><div style="width:100% !important; padding-bottom: 0px !important; margin-bottom: 0px !important;" class="ui-btn-inner ui-li"><div style="width:100% !important" class="ui-btn-text"><p style="font-size:14px !important;" class="list-wrap"><b>'+cat_name+'</b></p></div></div></li>';
						ex_c = true;
					});
					if (ex_c) res += res_c;
					
					// Aziende rappresentate
					var ex_r = false;
					var res_r = '<li class="ui-li ui-li-divider ui-btn ui-bar-d ui-btn-up-undefined" data-role="list-divider" role="heading"><span>Aziende rappresentate</span>:</li>';
					var repcompanies = $(this).find('repcompanies');
					$(repcompanies).find('rep').each(function(){
						var repc_name = $(this).text();
						var repc_id = $(this).attr('id');
						res_r +='<li data-theme="d" class="ui-btn ui-btn-icon-right ui-li ui-btn-up-d"><div style="width:100% !important; padding-bottom: 0px !important; margin-bottom: 0px !important;" class="ui-btn-inner ui-li"><div style="width:100% !important" class="ui-btn-text"><a data-ajax="true" onclick="valore[depthDetail]='+ repc_id+';tipo[depthDetail] = \'E\';" href="detail_list.html?valore='+repc_id+'&tipo=E&deviceid='+ device_id + '" class="ui-link-inherit2"><p style="color: #000000 !important; font-size:14px !important;" class="list-wrap"><b>'+repc_name +'</b></p><span style="margin-top: -16px !important;" class="ui-icon ui-icon-arrow-r"></span></a></div></div></li>';
						ex_r = true;
					});
					if (ex_r) res += res_r;
					
					res += '</ul>';	
					
					res += "<br /><br /><br />";
					res += "</div>";

					//res = res + "<br /><br />";
					$('div:jqmData(role="content") > div[id="contet_div"]').html(res);
										   
					name = ReplaceAll(name, "'", "\\'");
					
					var bar = "<div class='barra_espositore'>";
					//bar += '<table style="width:100%;"><tr><td class="barra_espositore_td"><a href="tel:'+phone+'"><img src="img/buttons_espositore/button_chiama.png" /></a></td><td class="barra_espositore_td"><a href="#" onclick="sendEmail(\''+ email +'\');"><img src="img/buttons_espositore/button_mail.png" /></a></td><td class="barra_espositore_td"><a href="#" onclick="addPreferred(\''+id+'\', \''+name+'\', \'E\', \''+pad+'\');"><img src="img/buttons_espositore/button_preferiti.png" /></a></td><td class="barra_espositore_td"><a href="#" onclick="saveContact(\''+id+'\', \''+ name +'\', \''+phone+'\');"><img src="img/buttons_espositore/button_contatto.png" /></a></td></tr>';
					//bar += "<tr><td class='barra_espositore_td'>Chiama</td><td class='barra_espositore_td'>Invia mail</td><td class='barra_espositore_td'>Preferito</td><td class='barra_espositore_td'>Salva contatto</td></tr></table>";
					bar += '<table style="width:100%;"><tr><td class="barra_espositore_td"><a href="tel:'+phone+'"><img src="img/buttons_espositore/button_chiama.png" /></a></td><td class="barra_espositore_td"><a href="#" onclick="sendEmail(\''+ email +'\');"><img src="img/buttons_espositore/button_mail.png" /></a></td><td class="barra_espositore_td"><a href="#" onclick="addPreferred(\''+id+'\', \''+name+'\', \'E\', \''+pad +'\',\'' + stand +'\', \'\');"><img src="img/buttons_espositore/button_preferiti.png" /></a></td></tr>';
					bar += "<tr><td class='barra_espositore_td'>Chiama</td><td class='barra_espositore_td'>Invia mail</td><td class='barra_espositore_td'>Preferito</td></tr></table>";
					bar += "</div>";	
					$('div:jqmData(role="footer") > div[id="footer_details"]').html(bar);
					
					
					
					
					
					
//					res += "<div class='barra_espositore'>";
//					res += "<table style='width:100%;'><tr><td class='barra_espositore_td'><a href='tel:"+phone+"'><img src='img/buttons_espositore/button_chiama.png' /></a></td><td class='barra_espositore_td'><a href='#' onclick='sendEmail(\""+ email +"\");'><img src='img/buttons_espositore/button_mail.png' /></a></td><td class='barra_espositore_td'><a href='#' onclick='addPreferred(\""+id+"\", \""+name+"\", \"E\", \""+pad+"\");'><img src='img/buttons_espositore/button_preferiti.png' /></a></td><td class='barra_espositore_td'><a href='#' onclick='saveContact(\""+id+"\", \""+ name +"\", \""+phone+"\");'><img src='img/buttons_espositore/button_contatto.png' /></a></td></tr>";
//					res += "<tr><td class='barra_espositore_td'>Chiama</td><td class='barra_espositore_td'>Invia mail</td><td class='barra_espositore_td'>Preferito</td><td class='barra_espositore_td'>Salva contatto</td></tr></table>";
//					res += "</div>";
//					$("#gio").html(res);
				});
			}
			else if (tipo=='S') {
				// SERVIZI
				
				$(xml).find('servizio').each(function(){
					var id = $(this).attr('nid');
					var name = $(this).find('name').text();

					// Coords
					var pad = $(this).find('padiglione').text();
					var x = $(this).find('posx').text();
					var y = $(this).find('posy').text();

					var orario = $(this).find('orario').text();
					var descrizione = $(this).find('desc').text();
					var categoria = $(this).find('categoria').text();
					var location = $(this).find('location').text();
					var location_map = $(this).find('location_map').text();
					
					
					var res = "<div><center>";
					res = res + "<center>";
					res = res + "<h3>"+name+"</h3><br />";
					// res = res + "<b>("+categoria+")</b><br />";
					res = res + "<b>"+orario+"</b><br />";
					//res = res + "<h4>Padiglione "+pad+"</h4><br /></center>";
					if (pad!=null && pad!='' && tsid!=null && tsid!='' && x!=null && x!='' && y!=null && y!='') {
						pad_m = pad;
						x_m = x;
						y_m = y;	
						res = res + "<div class='esp_rete_div'><br /><br /><a class='button_font' href='stand_map.html' data-role='button' data-ajax='true'><span>Padiglione</span> "+pad+"</a></div>";
						//res = res + "<a class='button_font' href='stand_map.html?tsid="+tsid+"&pad="+pad+"&x="+x+"&y="+y+"' data-role='button' data-ajax='false' data-rel='dialog' onclick='$.mobile.pageLoading();' >Mappa della posizione</a>";
						res = res + "<br /><br />";
						res = res + "</div>";
					}
					else if(pad!=null && pad!='') res = res + "<h4><span>Padiglione</span> "+pad+"</h4>";
					res = res + "</center>";
					
					res = res + "<br /><br />"+descrizione+"<br />";
					//res = res + "<br /><p>x:"+x+" y:"+y+"</p>";
					
					$('div:jqmData(role="footer")').addClass('footerMin');
					
					$('div:jqmData(role="content") > div[id="contet_div"]').html(res);
				});
			}
		},
	
		error: function(req, error) { 			
			//$("#gio").html("Errore: " + error);
			$('div:jqmData(role="content") > div[id="contet_div"]').html("<b>Errore nel recupero informazioni. Prego controllare la connessione.</b>");
		}
	});
		
}




function sendEmail(email) {	
	var temp_html_holder = 'mailto:' + email + '?subject=' + encodeURIComponent('Your Message!') + '&body=' + encodeURIComponent('test message........');
	document.location = temp_html_holder; 

}

function saveContact(id, name, number) {	
	
	try {
		var contact = navigator.service.contacts.create();
		//contact.name=name;
		contact.nickname = name;
		contact.displayName = name;
		
		var name_o = new ContactName();
		name_o.givenName = name;
		name_o.familyName = name;
		contact.name = name_o;

		
		contact.save(onSaveSuccess, onSaveError);
	} catch (e) {
		alert(e.message);
	}
	
	
	//var newContact = navigator.service.contacts.create({"id": id, "displayName": name});
	// store contact phone numbers in ContactField[]
	//var phoneNumbers = [1];
	//phoneNumbers[0] = new ContactField('work', number, true); // preferred number
	//phoneNumbers[1] = new ContactField('home', '203-555-7890', false);
	//newContact.phoneNumbers = phoneNumbers;

	// save the contact
	//newContact.save();
	
	
	//var contact = navigator.service.contacts.create({"displayName": 'gggggggggggggg'});
	//contact.save(onSaveSuccess, onSaveError);

	
//	//contact.id = id;
//    contact.displayName = name;
//    contact.nickname = name;       //specify both to support all devices
//    /*var name_c = new ContactName();
//    name_c.givenName = name;
//    name_c.familyName = name;
//    contact.name = name_c;*/
//
// // store contact phone numbers in ContactField[]
//	var phoneNumbers = [1];
//	phoneNumbers[0] = new ContactField('work', number, true); // preferred number
//	//phoneNumbers[1] = new ContactField('home', '203-555-7890', false);
//	contact.phoneNumbers = phoneNumbers;
//	
//    // save
//    contact.save(onSaveSuccess,onSaveError);
}
//onSaveSuccess: Get a snapshot of the current contacts
function onSaveSuccess(contacts) {
	alert("Contatto salvato! :" + contacts.length);
	for (var i=0; i<contacts.length; i++) {
		alert("Espositore "+ contacts[i].displayName +" aggiunto ai contatti.")
	}
}

function alertDismissed() {
    // do something
}


// onSaveError: Failed to get the contacts
function onSaveError(contactError) {
	if(languageSelect=='en') {
	    alert("Errore nell'inserimento contatti: " + contactError.code);
//	    navigator.notification.alert(
//	    	    "Errore nell'inserimento contatti: " + contactError.code,  // message
//	    	    alertDismissed,         // callback
//	    	    'Warning',            // title
//	    	    'OK'                  // buttonName
//	    );
	}else {
	    alert("Errore nell'inserimento contatti: " + contactError.code);
//		navigator.notification.alert(
//				"Errore nell'inserimento contatti: " + contactError.code,  // message
//	    	    alertDismissed,         // callback
//	    	    'Avviso',            // title
//	    	    'OK'                  // buttonName
//	    );
	}
}



function addPreferred(nid, name, type, padiglione, stand, location) {

	nid_preferred = nid;
	name_preferred = name;
	type_preferred = type;
	padiglione_preferred = padiglione;
	stand_preferred = stand;
	location_preferred = location;
    var db = window.openDatabase("MacefMobileDb", "1.0", "Macef Mobile Db", 200000);
    db.transaction(addPreferredToDB, errorAddPreferredToDB, successAddPreferredToDB);	
}
function addPreferredToDB(tx) {
     tx.executeSql('INSERT INTO PREFERRED (nid, name, type, padiglione, stand, location, lang) VALUES ("'+nid_preferred+'", "'+name_preferred+'", "'+type_preferred+'", "'+padiglione_preferred+'", "'+stand_preferred+'", "'+location_preferred+'", "'+languageSelect+'")');
}
function errorAddPreferredToDB(tx, err) {
	if(languageSelect=='en') {
	    alert("Already among the favorites!");
//	    navigator.notification.alert(
//	    		"Already among the favorites!",  // message
//	    	    alertDismissed,         // callback
//	    	    'Warning',            // title
//	    	    'OK'                  // buttonName
//	    );
	}else {
	    alert("Già presente tra i preferiti!");
//		navigator.notification.alert(
//				"Già presente tra i preferiti!",  // message
//	    	    alertDismissed,         // callback
//	    	    'Avviso',            // title
//	    	    'OK'                  // buttonName
//	    );
	}
    //alert("Già presente tra i preferiti!"+err);
}
function successAddPreferredToDB() {
	if(languageSelect=='en') {
		alert('Added to favorites!');
//	    navigator.notification.alert(
//	    	    'Added to favorites!',  // message
//	    	    alertDismissed,         // callback
//	    	    'Warning',            // title
//	    	    'OK'                  // buttonName
//	    );
	}else {
		alert("Aggiunto tra i Preferiti!");
//		navigator.notification.alert(
//				
//	    	    'Aggiunto tra i Preferiti!',  // message
//	    	    alertDismissed,         // callback
//	    	    'Avviso',            // title
//	    	    'OK'                  // buttonName
//	    );
	}

}




/*function getXmlDetails(valore) {
		$.ajax({
			async: false,
			type: "GET",
			url: "http://192.168.1.127/mobile/sites.php?rand="+(new Date().getTime()),
			dataType: "xml",
			success: function(xml) {
				$(xml).find('site').each(function(){
					var id = $(this).attr('id');
					
					if (valore==id) {
						var res = "<div>";
						var title = $(this).find('title').text();
						var url = $(this).find('url').text();
						res = res + "<h1>"+title+"</h1><br />";
						res = res + "<a href='"+url+"'>"+title+"</a><br />";
						$(this).find('desc').each(function(){
							var brief = $(this).find('brief').text();
							var long = $(this).find('long').text();
							res = res + "<p>"+brief+"</p><br />";
							res = res + "<p>"+long+"</p>";
						});
						res = res + "</div>";
						$("#gio").html(res);
					}
				});
				
			},
		
			error: function(req, error) { 			
				$("#gio").text("Errore: " + error);
			}
		});
		
	}*/

$(function() {
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

                	//alert($(event.target).attr('src'));
                	
                	//if ($(event.target).attr('src')) {
						   
					if ($(event.target).attr('rel') && $(event.target).attr('rel')== "iviewer") {
						   
                    var data = event.originalEvent.touches ?
                            event.originalEvent.touches[ 0 ] :
                            event,
                            start = {
                                time: (new Date).getTime(),
                                coords: [ data.pageX, data.pageY ],
                                origin: $(event.target)
                            },
                            stop;

                    var eeee = {pageX: data.pageX, pageY: data.pageY };
                    iviewer_obj.drag_start(eeee);
                            
                    
                    
                    
                    function moveHandler(event) {
                        if (!start) {
                            return;
                        }

                        
                        
                        
                        var data = event.originalEvent.touches ? event.originalEvent.touches[ 0 ] : event;
                                
                         
                        var eee = {pageX: data.pageX, pageY: data.pageY };
                        iviewer_obj.drag(eee);
                                
                                
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
                                        .trigger(start.coords[1] > stop.coords[1] ? "swipeup" : "swipedown");
                                
                                iviewer_obj.drag_end(event);
                            }
                        }
                        start = stop = undefined;
                    });
                    
                    
                    
                    
                    
                    
                    
                }
                    
                    
                    
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

    });


		var pad_m = '';
		var x_m = '';
		var y_m = '';
		var location_m = '';
	
		
		// Posizione puntatore
		function updatePointer() {
			
			var pointer = $('#pointer');
			if (x_m && x_m!='' && y_m && y_m!='') {
			
				//alert("width:" + iviewer_obj.settings.width + "    height:" + iviewer_obj.settings.height);
				
				//alert("x:" + x_m + "   y:"+ y_m + "    img_obj width:" + ggggg.img_object.orig_width + " orgheight:" + ggggg.img_object.orig_height);
				var offset = iviewer_obj.imageToContainer(x_m, y_m);
				
				if (offset.x<iviewer_obj.settings.width && offset.y<iviewer_obj.settings.height) { // Disegno il puntatore solo se è all'interno del container
					//alert("offset.x: " +offset.x + "    offset.y" + offset.y + "   width:" + iviewer_obj.settings.width + "    height:" + iviewer_obj.settings.height);
					//alert("img_object.x:" + ggggg.img_object.x + "         img_object.y:" + ggggg.img_object.y + "    1ox:" + offset.x + "   1oy:"+ offset.y);
					var containerOffset = iviewer_obj.container.offset();
					offset.x += containerOffset.left - 4; // 8
					offset.y += containerOffset.top - 23; //81
					pointer.css('display', 'block');
					pointer.css('left', offset.x+'px');
					pointer.css('top', offset.y+'px');
				}
				else {
					//alert("none");
					pointer.css('display', 'none');
				}
			}
			else pointer.css('display', 'none');
		}

		var iviewer_obj;
		var giaattivo = false;
		
		$('div:jqmData(role="page")[id="stand-map"]').live('pageshow',function(event, ui){
		//$('#stand-map').live('pageshow',function(event, ui){
			// alert("aaa: " + giaattivo);
			depthDetail++;
			fixgeometry();
			
			if (!giaattivo) {
				giaattivo=true;
				// alert($('div:jqmData(role="content")[id="page-wrap-map"] > div > div[id="viewer"]'));
				
				$('div:jqmData(role="content")[id="page-wrap-map"]').html('<div style="z-index: 0;color: black; position:absolute; top:100px; left:40px;" id="loading_msg"><b>Loading map ...</b></div>	<img id="pointer"  src=\'img/dot.png\' style="z-index: 2; position:absolute; display:none" /><div style="overflow: hidden;"><div id="viewer" style="width: 100%;height: 400px;border: 1px solid black;position: relative;"></div></div>');
				try {
				//alert(URL_SERVER_MAPS + pad_m +"_" + tsid_m+".jpg?rand="+(new Date().getTime()));
					
					var url_image = URL_SERVER_MAPS + pad_m +"_"+ tsid+".jpg?rand="+(new Date().getTime());
					if (location_m && location_m!='') url_image = URL_SERVER + location_m+"?rand="+(new Date().getTime());
					//alert("url_image:" + url_image);
					
					$('div:jqmData(role="content")[id="page-wrap-map"] > div > div[id="viewer"]').iviewer(
		                   {
		                   //src: URL_SERVER_MAPS + pad_m +"_" + tsid_m+".jpg?rand="+(new Date().getTime()),
		                   src: url_image,
						   update_on_resize: false,
						   zoom_min: 75,
		                   initCallback: function ()
		                   {
		                       iviewer_obj = this;
		                       /*$("#in").click(function(){ iviewer_obj.zoom_by(1);}); 
		                       $("#out").click(function(){ iviewer_obj.zoom_by(-1);}); 
		                       $("#fit").click(function(){ iviewer_obj.fit();}); 
		                       $("#orig").click(function(){ iviewer_obj.set_zoom(100); });*/  
		                       
		                   },
		                   onFinishLoad: function() {
		                	   //centro la mappa sul puntino
								if (x_m && x_m!='' && y_m && y_m!='') {
									iviewer_obj.setCoords((-Math.floor(x_m * iviewer_obj.current_zoom / 100) + Math.round(iviewer_obj.settings.width/2)) , (-Math.floor(y_m * iviewer_obj.current_zoom / 100) + Math.round(iviewer_obj.settings.height/2)));
								}
		           			
		           			
								updatePointer();
								//alert($('div:jqmData(role="content")[id="page-wrap-map"] > div[id="loading_msg"]'));
		                		$('div:jqmData(role="content")[id="page-wrap-map"] > div[id="loading_msg"]').css('display','none');
		                	},
		                   onMouseMove: function(object, coords) { },
		                   onStartDrag: function(object, coords) { return true; }, //this image will be dragged
		                   onDrag: function(object, coords) { },
		                   //onBeforeDrag: function(coords) { return true; },
		                   onFinishUpdate: function() { updatePointer(); },
		              });
				}
				catch(e) {
					alert(e.message);
				}
	
	
				
				$('div:jqmData(role="content")[id="page-wrap-map"] > div > div[id="viewer"]').live('swipeleft swiperight',function(event){
					//event.preventDefault();
					if (event.type == "swiperight") {
						//updatePointer();
					}
					if (event.type == "swipeleft") {
						//updatePointer();
					}
				});
				
				$('div:jqmData(role="content")[id="page-wrap-map"] > div > div[id="viewer"]').live('swipeup',function(event){
					//event.preventDefault();
					//updatePointer();
				});
				
				$('div:jqmData(role="content")[id="page-wrap-map"] > div > div[id="viewer"]').live('swipedown',function(event){
					//event.preventDefault();
					//updatePointer();
				});
				
				$('div:jqmData(role="content")[id="page-wrap-map"] > div > div[id="viewer"]').live('scrollstop',function(event){
					//event.preventDefault();
					updatePointer();
				});
	
	
				// Imposto Dimensioni del viewer
				var header = $("div[data-role='header']:visible");
				var footer = $("div[data-role='footer']:visible");
				var content = $("div[data-role='content']:visible:visible");
				var viewport_height = $(window).height();
				var content_height = viewport_height - header.outerHeight() - footer.outerHeight();
				content_height -= (content.outerHeight() - content.height() - 1);
				$('div:jqmData(role="content")[id="page-wrap-map"] > div > div[id="viewer"]').height(content_height);
				
			}
				
		});
		
		
		
		// Cambio orientamento
		var supportsOrientationChange = "onorientationchange" in window;
	    var orientationEvent = supportsOrientationChange ? "orientationchange" : "resize";
		window.addEventListener(orientationEvent, function() {
			
			if ($("#map_header").is(":visible")) {
				fixgeometry();
				
				// Imposto Dimensioni del viever
				var header = $("div[data-role='header']:visible");
				var footer = $("div[data-role='footer']:visible");
				var content = $("div[data-role='content']:visible:visible");
				var viewport_height = $(window).height();
				var content_height = viewport_height - header.outerHeight() - footer.outerHeight();
				content_height -= (content.outerHeight() - content.height() - 1);
				$('div:jqmData(role="content")[id="page-wrap-map"] > div > div[id="viewer"]').height(content_height);
			}
		}, false);
		
		


var num_pages = 0;
var loading_div_element = null;

function getXmlList() {
	
	loading_div_element = $('div:jqmData(role="content") > div[id="loading_div"]');
	
	if(backpress == true) {
		backpress = false;
		depth--;
		cur_page[depth-1] = 1;
	}
	else if(backpressDetail == true) {
		backpressDetail = false;
		cur_page[depth-1] = 1;
	}
	else if(backpressEventi == true) {
		backpressEventi = false;
		cur_page[depth-1] = 1;
	}
	else if(backpressServizi == true) {
		backpressServizi = false;
		cur_page[depth-1] = 1;
	}
	else if(backpressPreferiti == true) {
		backpressServizi = false;
		cur_page[depth-1] = 1;
	}
	else if(!richiestaAsincrona) {
		depth++;
		cur_page[depth-1] = 1;
	}
	// se non ho settato la pagina allora la inizializzo a 1
	if(!cur_page[depth-1]) {
		cur_page[depth-1] = 1;
	}
	if(!radio_ricerca[depth]) {
		radio_ricerca[depth] = radio_ricerca[depth-1];
	}
	if(!search_key[depth]) {
		search_key[depth] = search_key[depth-1];
	}
	//alert(radio_ricerca);
	//alert(device_id); 
	// alert('Ricerca categorie per key:' + search_key[depth-1] + '\nparent_cat: ' + parent_cat[depth-1] + '\ncat: ' + cat[depth-1] + '\nradio ricerca ' + radio_ricerca[depth-1] + '\nbrand_name: ' + brand_name[depth-1] +'\ndepth: ' + depth + '\nback: ' + backpress + '\ncurpage: ' + cur_page[depth-1]);
	
	if (radio_ricerca[depth-1]=='libera') {

		// if (getUrlVars()["cur_page"] && getUrlVars()["cur_page"]!='') cur_page = getUrlVars()["cur_page"];
		
		var url_libera = "portal/tools/xmlSearchData.jsp?mode=search&tsid="+tsid+"&lang="+languageSelect+"&key="+search_key[depth-1]+"&page="+cur_page[depth-1] + "&deviceid="+ device_id + "&rand="+(new Date().getTime());
		if (cat[depth-1]) url_libera = 'portal/tools/xmlSearchData.jsp?mode=searchcat&catid='+cat[depth-1]+'&tsid='+tsid+'&page='+cur_page[depth-1]+'&deviceid='+ device_id + '&rand='+(new Date().getTime());
		if (brand_name[depth-1]) url_libera = 'portal/tools/xmlSearchData.jsp?mode=searchbrand&tsid='+tsid+'&key=' + brand_name[depth-1] +"&page="+cur_page[depth-1]+"&deviceid="+ device_id + "&rand="+(new Date().getTime());
		
		
		//alert("cur page: " +cur_page[depth-1]+ "    url:" +url_libera);
		
		$.ajax({
			async: richiestaAsincrona,
			type: "GET",
			url: URL_SERVER_EXP + url_libera,
			dataType: "xml",
			success: function(xml) {
			   
			    if (!richiestaAsincrona) {
			    	$('div:jqmData(role="content") > div[id="gio"]').html('');
			    	$('div:jqmData(role="content") > ul[id="list-wrap"]').html('');
			    }
			    //else loading_div_element.show();
				
			    var res_lineSlim;
				$(xml).find('eblist').each(function(){
					var num = $(this).attr('num');
					if (!num) num = '0';
					var desc_searc = '';
					if (!search_key[depth-1] && cat[depth-1]) desc_searc = '<span>espositori in questa categoria</span>';
					//else if (!search_key && getUrlVars()["brand_name"]) search_key = 'per il marchio "' + getUrlVars()["brand_name"] + '"';
					else if (!search_key[depth-1] && brand_name[depth-1]) desc_searc = '<span>espositori per questo marchio</span>'; 
					else {
						if (search_key[depth-1] && search_key[depth-1]!='') desc_searc = '<span>risultati per </span>"' + search_key[depth-1] + '"';
						else desc_searc = '<span>espositori trovati.</span>';
					}
					
					
					var int_num = parseInt(num);
					num_pages = int_num/30; // 30 risultati per pagina
					if ((num_pages-Math.round(num_pages)) > 0) num_pages = Math.round(num_pages)+1;
					else num_pages = Math.round(num_pages);

					//alert("Pagine totali:"+num_pages);
					
					//if (num_pages>1) {
						var params = 'search_key='+search_key[depth-1];
						if (getUrlVars()["cat_id"] && getUrlVars()["cat_id"]!='') params = 'cat_id='+getUrlVars()["cat_id"];
						if (getUrlVars()["brand_name"] && getUrlVars()["brand_name"]!='') params = 'brand_name='+ getUrlVars()["brand_name"];
						
//						var cur_page_n = cur_page[depth-1];
						var res_line = '<li data-theme="d" class="ui-btn ui-btn-icon-right ui-li ui-btn-up-d" style="border-bottom:1px solid black;"><div class="ui-btn-inner ui-li"><div class="ui-btn-text" style="color:gray;"><table width="100%"><tr><td colspan="3" style="text-align: center;">'+num + ' ' + desc_searc+'</td></tr><tr>';
//						if (cur_page_n>1) res_line+='<td width="1%"><a data-ajax="true" onclick="$.mobile.pageLoading();radio_ricerca['+depth+']=\'libera\';cat['+depth+']=cat['+(depth-1)+'];search_key['+depth+']=search_key['+(depth-1)+'];cur_page['+depth+']='+(cur_page_n-1)+'" href="list.html?radio-ricerca=libera&'+params+'&cur_page='+(cur_page_n-1)+ '&deviceid='+ device_id +'" class="ui-link-inherit2"><img src="img/arrow_l.png"/></a></td>';
//						res_line += '<td width="98%" style="text-align: center;">Pagina ' + cur_page[depth-1] + ' di ' + num_pages + '  ';
//						if (cur_page_n+1<=num_pages) res_line+='<td width="1%"><a data-ajax="true" onclick="$.mobile.pageLoading();radio_ricerca['+depth+']=\'libera\';cat['+depth+']=cat['+(depth-1)+'];search_key['+depth+']=search_key['+(depth-1)+'];cur_page['+depth+']='+(cur_page_n+1)+'" href="list.html?radio-ricerca=libera&'+params+'&cur_page='+(cur_page_n+1)+ '&deviceid='+ device_id + '" class="ui-link-inherit2"><img src="img/arrow_r.png"/></a></td>';
//						$(res_line+'</td></tr></table></div></div></li>').appendTo('div:jqmData(role="content") > ul[id="list-wrap"]');
						if (cur_page[depth-1]==1) $(res_line+'<td></td></tr></table></div></div></li>').appendTo('div:jqmData(role="content") > ul[id="list-wrap"]');
//										
//						res_lineSlim = '<li data-theme="d" class="ui-btn ui-btn-icon-right ui-li ui-btn-up-d" style="border-bottom:1px solid black;"><div class="ui-btn-inner ui-li"><div class="ui-btn-text" style="color:gray;"><table width="100%"><tr>';
//						if (cur_page_n>1) res_lineSlim+='<td width="1%"><a data-ajax="true" onclick="$.mobile.pageLoading();radio_ricerca['+depth+']=\'libera\';cat['+depth+']=cat['+(depth-1)+'];search_key['+depth+']=search_key['+(depth-1)+'];cur_page['+depth+']='+(cur_page_n-1)+'" href="list.html?radio-ricerca=libera&'+params+'&cur_page='+(cur_page_n-1)+ '&deviceid='+ device_id +'" class="ui-link-inherit2"><img src="img/arrow_l.png"/></a></td>';
//						res_lineSlim += '<td width="98%" style="text-align: center;">Pagina ' + cur_page[depth-1] + ' di ' + num_pages + '</td>'
//						if (cur_page_n+1<=num_pages) res_lineSlim+='<td width="1%"><a data-ajax="true" onclick="$.mobile.pageLoading();radio_ricerca['+depth+']=\'libera\';cat['+depth+']=cat['+(depth-1)+'];search_key['+depth+']=search_key['+(depth-1)+'];cur_page['+depth+']='+(cur_page_n+1)+'" href="list.html?radio-ricerca=libera&'+params+'&cur_page='+(cur_page_n+1)+ '&deviceid='+ device_id + '" class="ui-link-inherit2"><img src="img/arrow_r.png"/></a></td>';
					//}
					
					//$('<li data-theme="c" class="ui-btn ui-btn-icon-right ui-li ui-btn-up-c"><div class="ui-btn-inner ui-li"><div class="ui-btn-text">&nbsp;&nbsp;&nbsp;&nbsp;'+num+' risultati '+desc_searc+'</div></div></li>').appendTo('#list-wrap');
				});
				
	
				$(xml).find('ebooth').each(function(){
					var id = $(this).attr('id');
					var posizione = $(this).find('posizione').text();
					if (posizione =='') posizione = '<span>Pad</span>:';
					var name = $(this).find('nameshort').text();
					$('<li data-theme="d" class="ui-btn ui-btn-icon-right ui-li ui-btn-up-d"><div class="ui-btn-inner ui-li"><div class="ui-btn-text"><a data-ajax="true" onclick="richiestaAsincrona=false;depthDetail = 0;backpressDetail = false;valore[0]='+id+';tipo[0] = \'E\';" href="detail_list.html?valore='+id+'&tipo=E&deviceid='+ device_id + '" class="ui-link-inherit2"><p class="list_row list-wrap"><b>'+name+'</b></p><p class="list_subrow">'+posizione+'&nbsp;</p><span class="ui-icon ui-icon-arrow-r"></span></a></div></div></li>').appendTo('div:jqmData(role="content") > ul[id="list-wrap"]');
					//$('<li data-theme="c" class="ui-btn ui-btn-icon-right ui-li ui-btn-up-c"><div class="ui-btn-inner ui-li"><div class="ui-btn-text"><a data-ajax="true" href="detail_list.html?valore=95735&tipo=E" class="ui-link-inherit2">'+name+'<p>'+posizione+'</p></a></div><span class="ui-icon ui-icon-arrow-r"></span></div></li>').appendTo('#list-wrap');
				});
//				if(res_lineSlim) $(res_lineSlim+'</tr></table></div></div></li>').appendTo('div:jqmData(role="content") > ul[id="list-wrap"]');
				//alert("fix!!");
				//fixgeometry();
				// console.log("Exe list.js libera " + richiestaAsincrona);
			    if (!richiestaAsincrona) {
			    	bottomPageCallbackFuncitions.push("growList();");
			    	// console.log("Aggiungo handler di gestione del paginatore");
			    }
				espositoriInEsecuzione = false;
				//loading_div_element.hide();
			},
		
			error: function(req, error) { 			
				//$("#gio").html("Errore: " + error + "<br /><br /> " + req);
				$("#gio").html("<b>Errore nel recupero informazioni. Prego controllare la connessione.</b>");
			}
		});
	}
	else if (radio_ricerca[depth-1]=='categorie') {
		

		// var parent_cat = getUrlVars()["parent_cat"];
		
		var url_cat ='';
		if ((!search_key[depth-1] || search_key[depth-1]=='') && !parent_cat[depth-1]) url_cat = URL_SERVER_EXP + 'portal/tools/xmlSearchData.jsp?mode=listcattree&tsid='+tsid+'&deviceid='+ device_id + '&languagecode='+languageSelect+'&rand='+(new Date().getTime());
		if ((!search_key[depth-1] || search_key[depth-1]=='') && parent_cat[depth-1]) url_cat = URL_SERVER_EXP + 'portal/tools/xmlSearchData.jsp?mode=listcattree&tsid='+tsid+'&languagecode='+languageSelect+'&parentcode=' + parent_cat[depth-1] + "&deviceid="+ device_id + '&rand='+(new Date().getTime());
		if (search_key[depth-1] && search_key[depth-1]!='') url_cat = URL_SERVER_EXP + 'portal/tools/xmlSearchData.jsp?mode=searchkeycat&tsid='+tsid+'&languagecode='+languageSelect+'&key='+search_key[depth-1] + "&deviceid="+ device_id + '&rand='+(new Date().getTime());
		
		//alert(url_cat);
		
		
		$('div:jqmData(role="content") > div[id="gio"]').html('');
		$('div:jqmData(role="content") > ul[id="list-wrap"]').html('');

		$.ajax({
			async: false,
			type: "GET",
			url: url_cat,
			dataType: "xml",
			success: function(xml) {
				
				$(xml).find('cat').each(function(){
					var name = $(this).text();
					var id = $(this).attr('id');
					var has_son = $(this).attr('son');
					var num_esp = $(this).attr('exh');
					
					//$('<li id="link_'+tid+'"><a data-ajax="true" onclick="$.mobile.pageLoading();" href="list.html?parent_cat='+pid+'">'+name+'</a></li>').appendTo('#list-wrap');
					
					//var sub_link ='';
					//if (has_son && has_son=='y') sub_link = '<div class="ui-btn-text"><a data-ajax="true" onclick="$.mobile.pageLoading();" href="list.html?radio-ricerca=categorie&parent_cat='+id+'&deviceid='+ device_id + '" class="ui-link-inherit2"><img src="img/zoom_plus.png" />&nbsp;&nbsp;&nbsp;</a></div>'; 
					//$('<li data-theme="c" class="ui-btn ui-btn-icon-right ui-li ui-btn-up-c"><div class="ui-btn-inner ui-li"> ' + sub_link + ' <div class="ui-btn-text"><a data-ajax="truedata-ajax="true"" onclick="$.mobile.pageLoading();" href="list.html?radio-ricerca=libera&cat_id='+id+'&deviceid='+ device_id + '" class="ui-link-inherit2"><p class="list_row_single_line"><b>'+name+'</b></p></a></div><span class="ui-icon ui-icon-arrow-r"></span></div></li>').appendTo('#list-wrap');
					var sub_link  = '';
					var main_link ='';
					if (has_son && has_son=='y') {
						main_link = '<div class="ui-btn-text"><a data-ajax="true" onclick="$.mobile.pageLoading();radio_ricerca['+depth+']=\'categorie\'; parent_cat['+depth+']=\''+id+'\';" href="list.html?radio-ricerca=categorie&parent_cat='+id+'&deviceid='+ device_id + '" class="ui-link-inherit2"><p class="list_row_single_line list-wrap"><b>'+name+'</b></p><span class="ui-icon ui-icon-arrow-r"></span></a></div>';
						sub_link = '<a data-ajax="true" onclick="$.mobile.pageLoading();radio_ricerca['+depth+']=\'libera\'; search_key['+depth+']=\'\'; cat['+depth+']=\''+id+'\';cur_page['+depth+']=1;" href="list.html?radio-ricerca=libera&cat_id='+id+'&deviceid='+ device_id + '" class="ui-link-inherit2_sub"><p class="list_row_double_line"><b><span>Espositori</span>: '+num_esp+' &nbsp;&nbsp;&nbsp;&nbsp;&gt;</b></p></a>';
					}
					else {
						main_link = '<a data-ajax="true" onclick="$.mobile.pageLoading();radio_ricerca['+depth+']=\'libera\'; search_key['+depth+']=\'\'; cat['+depth+']=\''+id+'\';cur_page['+depth+']=1;" href="list.html?radio-ricerca=libera&cat_id='+id+'&deviceid='+ device_id + '" class="ui-link-inherit2_sub"><div class="ui-btn-text"><div style="padding-top:10px; padding-left:10px;" class="list-wrap"><b>'+name+'</b></p></div></div>';
						sub_link = '<p class="list_row_double_line"><b><span>Espositori</span>: '+num_esp+' &nbsp;&nbsp;&nbsp;&nbsp;&gt;</b></p></a>';
					}
					
					
					$('<li data-theme="c" class="ui-btn ui-btn-icon-right ui-li ui-btn-up-c"><div class="ui-btn-inner ui-li">'+main_link+'' + sub_link + '</div></li>').appendTo('div:jqmData(role="content") > ul[id="list-wrap"]');

				});

				loading_div_element.hide();
			},
		
			error: function(req, error) { 			
				//$("#gio").html("Errore: " + error + "<br /><br /> " + req);
				$("#gio").html("<b>Errore nel recupero informazioni. Prego controllare la connessione.</b>");
			}
		});
		
	}
	else if (radio_ricerca[depth-1]=='marchi') {
		
		// if (getUrlVars()["cur_page"] && getUrlVars()["cur_page"]!='') cur_page = getUrlVars()["cur_page"];
		
		var url_brand = URL_SERVER_EXP + 'portal/tools/xmlSearchData.jsp?mode=brandlist&tsid='+tsid+'&key='+search_key[depth-1]+ "&page="+cur_page[depth-1] + "&deviceid="+ device_id+ '&languagecode='+languageSelect+'&rand='+(new Date().getTime());
		
		 if (!richiestaAsincrona) {
			 $('div:jqmData(role="content") > div[id="gio"]').html('');
			 $('div:jqmData(role="content") > ul[id="list-wrap"]').html('');
		 }
		 //else loading_div_element.show();
		
		//alert('brand: ' + url_brand);

		$.ajax({
			async: richiestaAsincrona,
			type: "GET",
			url: url_brand,
			dataType: "xml",
			success: function(xml) {
				
				
			   var res_lineSlim = '';
				$(xml).find('brands').each(function(){
					var num = $(this).attr('num');
					if (!num) num = '0';
					
					var int_num = parseInt(num);
					num_pages = int_num/30; // 30 risultati per pagina
					if ((num_pages-Math.round(num_pages)) > 0) num_pages = Math.round(num_pages)+1;
					else num_pages = Math.round(num_pages);

					//alert("Pagine totali:"+num_pages);
					
					//if (num_pages>1) {
						var params = 'search_key='+search_key[depth-1];						
						var cur_page_n = cur_page[depth-1];
						
						var res_line = '<li data-theme="d" class="ui-btn ui-btn-icon-right ui-li ui-btn-up-d" style="border-bottom:1px solid black;"><div class="ui-btn-inner ui-li"><div class="ui-btn-text" style="color:gray;"><table width="100%"><tr><td colspan="3" style="text-align: center;">'+num+' <span>marchi trovati</span></td></tr><tr>';
//						if (cur_page_n>1) res_line += '<td width="1%"><a data-ajax="true" onclick="$.mobile.pageLoading();search_key['+depth+']=search_key['+(depth-1)+'];radio_ricerca['+depth+']=\'marchi\';cur_page['+depth+']='+(cur_page_n-1)+'" href="list.html?radio-ricerca=marchi&'+params+'&cur_page='+(cur_page_n-1)+ '&deviceid='+ device_id +'" class="ui-link-inherit2"><img src="img/arrow_l.png"/></a></td>';
//						res_line += '<td width="98%" style="text-align: center;">Pagina ' + cur_page[depth-1] + ' di ' + num_pages + '  ';
//						if (cur_page_n+1<=num_pages) res_line+='<td width="1%"><a data-ajax="true" onclick="$.mobile.pageLoading();search_key['+depth+']=search_key['+(depth-1)+'];radio_ricerca['+depth+']=\'marchi\';cur_page['+depth+']='+(cur_page_n+1)+'" href="list.html?radio-ricerca=marchi&'+params+'&cur_page='+(cur_page_n+1)+ '&deviceid='+ device_id + '" class="ui-link-inherit2"><img src="img/arrow_r.png"/></a></td>';
//						$(res_line+'</td></tr></table></div></div></li>').appendTo('div:jqmData(role="content") > ul[id="list-wrap"]');
						if (cur_page[depth-1]==1) $(res_line+'<td></td></tr></table></div></div></li>').appendTo('div:jqmData(role="content") > ul[id="list-wrap"]');
//						
//						res_lineSlim = '<li data-theme="d" class="ui-btn ui-btn-icon-right ui-li ui-btn-up-d" style="border-bottom:1px solid black;"><div class="ui-btn-inner ui-li"><div class="ui-btn-text" style="color:gray;"><table width="100%"><tr>';
//						if (cur_page_n>1) res_lineSlim+='<td width="1%"><a data-ajax="true" onclick="$.mobile.pageLoading();radio_ricerca['+depth+']=\'marchi\';search_key['+depth+']=search_key['+(depth-1)+'];cur_page['+depth+']='+(cur_page_n-1)+';brand_name['+depth+']=brand_name['+(depth-1)+'];" href="list.html?radio-ricerca=marchi&'+params+'&cur_page='+(cur_page_n-1)+ '&deviceid='+ device_id +'" class="ui-link-inherit2"><img src="img/arrow_l.png"/></a></td>';
//						res_lineSlim += '<td width="98%" style="text-align: center;">Pagina ' + cur_page[depth-1] + ' di ' + num_pages + '</td>';
//						if (cur_page_n+1<=num_pages) res_lineSlim+='<td width="1%"><a data-ajax="true" onclick="$.mobile.pageLoading();radio_ricerca['+depth+']=\'marchi\';search_key['+depth+']=search_key['+(depth-1)+'];cur_page['+depth+']='+(cur_page_n+1)+'" href="list.html?radio-ricerca=marchi&'+params+'&cur_page='+(cur_page_n+1)+ '&deviceid='+ device_id + '" class="ui-link-inherit2"><img src="img/arrow_r.png"/></a></td>';
					//}
					
				
				});
				
				
				$(xml).find('brand').each(function(){
					var name = $(this).text();
					var id = $(this).attr('id');

					$('<li data-theme="c" class="ui-btn ui-btn-icon-right ui-li ui-btn-up-c"><div class="ui-btn-inner ui-li"><div class="ui-btn-text"><a data-ajax="true" onclick="richiestaAsincrona=false;radio_ricerca['+depth+']=\'libera\'; brand_name['+depth+']=\''+name+'\';cat['+depth+'] = 0; cur_page['+depth+']=1;search_key['+depth+']=\'\';" href="list.html?radio-ricerca=libera&brand_name='+name+'&deviceid='+ device_id + '" class="ui-link-inherit2"><p class="list_row_single_line list-wrap"><b>'+name+'</b></p><span class="ui-icon ui-icon-arrow-r"></span></a></div></div></li>').appendTo('div:jqmData(role="content") > ul[id="list-wrap"]');
					
				});
//			    if(res_lineSlim)$(res_lineSlim+'</tr></table></div></div></li>').appendTo('div:jqmData(role="content") > ul[id="list-wrap"]');
			   
			    
			    if (!richiestaAsincrona) {
			    	bottomPageCallbackFuncitions.push("growList();");
			    	//console.log("Aggiungo handler di gestione del paginatore");
			    }
				espositoriInEsecuzione = false;
				//loading_div_element.hide();
				
			},
		
			error: function(req, error) { 			
				//$("#gio").html("Errore: " + error + "<br /><br /> " + req);
				$("#gio").html("<b>Errore nel recupero informazioni. Prego controllare la connessione.</b>");
			}
		});
		
		
	}

	
	if (cur_page[depth-1]+1>num_pages) {
		loading_div_element.hide();
	}
}


var espositoriInEsecuzione = false;

function growList() {
	if (cur_page[depth-1]+1<=num_pages) {
		if (espositoriInEsecuzione == false) {
			espositoriInEsecuzione = true;
			richiestaAsincrona=true;
			cur_page[depth-1]=(cur_page[depth-1]+1);
	//		cur_page[depth]=(cur_page[depth-1]+1);
	//		
	//		if (radio_ricerca[depth-1]=='libera') {
	//			radio_ricerca[depth]='libera';
	//			cat[depth]=cat[(depth-1)];
	//			search_key[depth]=search_key[(depth-1)];
	//		}
	//		else if (radio_ricerca[depth-1]=='marchi') {
	//			search_key[depth]=search_key[(depth-1)];
	//			radio_ricerca[depth]='marchi';
	//			brand_name[depth]=brand_name[(depth-1)];
	//		}
			
			//console.log('growList carico pagina:' + cur_page[depth-1]+" ...");
			getXmlList();
		}
	}
	else loading_div_element.hide();
}


// Wait for PhoneGap to load
// 
document.addEventListener("deviceready", checkConnection, false);
//$(document).ready(function() {
//	
//});


function checkConnection() {
    var networkState = navigator.network.connection.type;

    var states = {};
    states[Connection.UNKNOWN]  = 'Unknown connection';
    states[Connection.ETHERNET] = 'Ethernet connection';
    states[Connection.WIFI]     = 'WiFi connection';
    states[Connection.CELL_2G]  = 'Cell 2G connection';
    states[Connection.CELL_3G]  = 'Cell 3G connection';
    states[Connection.CELL_4G]  = 'Cell 4G connection';
    states[Connection.NONE]     = 'No network connection';

    //alert('Connection type: ' + states[networkState]);
    if (networkState && networkState==Connection.NONE) alert("Sembra che il tuo dispositivo non sia connesso a internet. L'applicazione ha bisogno di una connessione attiva. Prego connettersi.");
}




function getXmlListEventi() {
	$.ajax({
		async: false,
		type: "GET",
		//url: "http://fieremobile/espositori-search-page?title=aaa&prodotto_tid=355&rand="+(new Date().getTime()),
		url: URL_SERVER + "pagina-ricerca-eventi?tsid="+tsid+"&lang="+ languageSelect +"&rand="+(new Date().getTime()),
		dataType: "xml",
		success: function(xml) {
		   
		   
		   $('div:jqmData(role="content") > div[id="gio"]').html('');
		   $('div:jqmData(role="content") > ul[id="list-wrap"]').html('');
			
			var data_prev = '';
			
//			var res = '';
//			var res_header = '';
//			var tot_sub = 0;
			
			$(xml).find('evento').each(function(){
				var data = $(this).find('data').text();
				var name = $(this).find('name').text();
				var nid = $(this).find('nid').text();
				var padiglione = $(this).find('padiglione').text();
				var location = $(this).find('location').text();
				var stand = $(this).find('stand').text();
				
				var posizione ='';
				if (padiglione && padiglione!='') posizione ='<span>Padiglione</span> ' + padiglione + ' ' + stand;
				if (location && location!='') posizione = location;
				
				if (data_prev=='' || data_prev!=data) {
//					if (res!='') {
//						res_header = res_header + '<span class="ui-li-count">'+tot_sub+'</span></li>';
//						$(res_header).appendTo('#list-wrap');
//						$(res).appendTo('#list-wrap');
//						res_header ='';
//						res ='';
//						tot_sub =0;
//					}
					data_prev = data;
					$('<li class="ui-li ui-li-divider ui-btn ui-bar-d ui-btn-up-undefined" data-role="list-divider" role="heading">'+data+'</li>').appendTo('div:jqmData(role="content") > ul[id="list-wrap"]');
					//$('<li data-role="list-divider">'+data+'</li>').appendTo('#list-wrap');
//					res_header = '<li data-role="list-divider">'+data';
				}
					$('<li data-theme="d" class="ui-btn ui-btn-icon-right ui-li ui-btn-up-d"><div class="ui-btn-inner ui-li"><div class="ui-btn-text"><a data-ajax="true" onclick="depthDetail=0;backpressDetail = false; valore[0]='+nid+';tipo[0]=\'V\';" href="detail_list.html?valore='+nid+'&tipo=V" class="ui-link-inherit2"><p class="list_row_single_line list-wrap"><b>'+name+'</b></p><p class="list_subrow">'+posizione +'</p><span class="ui-icon ui-icon-arrow-r"></span></a></div></div></li>').appendTo('div:jqmData(role="content") > ul[id="list-wrap"]');

				//$('<li id="link_'+nid+'"><a data-ajax="true" onclick="$.mobile.pageLoading();" href="detail_list.html?valore='+nid+'&tipo=V">'+name+'</a></li>').appendTo('#list-wrap');
//				res = res + '<li id="link_'+nid+'"><a data-ajax="true" href="detail_list.html?valore='+nid+'&tipo=Evento">'+name+'</a></li>';
//				tot_sub = tot_sub + 1;
			});
			fixgeometry();
			
		},
	
		error: function(req, error) { 			
			//$("#gio").html("Errore: " + error + "<br /><br /> " + req);
			$("#gio").html("<b>Errore nel recupero informazioni. Prego controllare la connessione.</b>");
		}
	});
	
}


function getXmlListCategorieServizi() {
	$.ajax({
		async: false,
		type: "GET",
		//url: "http://fieremobile/espositori-search-page?title=aaa&prodotto_tid=355&rand="+(new Date().getTime()),
		url: URL_SERVER + "lista-categorie-servizi?lang="+languageSelect+"&tsid="+tsid+"&rand="+(new Date().getTime()),
		dataType: "xml",
		success: function(xml) {
		   
		   $('div:jqmData(role="content") > ul[id="gio"]').html('');
		    $('div:jqmData(role="content") > ul[id="list-wrap"]').html('');
		   
			$(xml).find('cat').each(function(){
				var name = $(this).find('name').text();
				var nid = $(this).find('nid').text();
				
				$('<li data-theme="d" class="ui-btn ui-btn-icon-right ui-li ui-btn-up-d"><div class="ui-btn-inner ui-li"><div class="ui-btn-text"><a data-ajax="true" onclick="$.mobile.pageLoading();cat_id='+nid+'" href="list_servizi.html?cat_id='+nid+'" class="ui-link-inherit2"><p class="list_row_single_line list-wrap"><b>'+name+'</b></p><span class="ui-icon ui-icon-arrow-r"></span></a></div></div></li>').appendTo('div:jqmData(role="content") > ul[id="list-wrap"]');

			});
			fixgeometry();
		},
	
		error: function(req, error) { 			
			//$("#gio").html("Errore: " + error + "<br /><br /> " + req);
			$("#gio").html("<b>Errore nel recupero informazioni. Prego controllare la connessione.</b>");
		}
	});
	
}

function getXmlListServizi() {
	$.ajax({
		async: false,
		type: "GET",
		//url: "http://fieremobile/espositori-search-page?title=aaa&prodotto_tid=355&rand="+(new Date().getTime()),
		url: URL_SERVER + "pagina-ricerca-servizi?categoria_nid="+ cat_id +"&tsid="+tsid+"&lang="+ languageSelect +"&rand="+(new Date().getTime()),
		dataType: "xml",
		success: function(xml) {
		   
		   $('div:jqmData(role="content") > ul[id="gio"]').html('');
		   $('div:jqmData(role="content") > ul[id="list-wrap"]').html('');
			
			var data_prev = '';
			
//			var res = '';
//			var res_header = '';
//			var tot_sub = 0;
			$(xml).find('servizio').each(function(){
				var data = $(this).find('categoria').text();
				var name = $(this).find('name').text();
				var nid = $(this).find('nid').text();
				var padiglione = $(this).find('padiglione').text();
				var location = $(this).find('location').text();
				var x = $(this).find('posx').text();
				var y = $(this).find('posy').text();
				var location_map = $(this).find('location_map').text();
				
				var posizione ='';
				if (padiglione && padiglione!='') posizione ='Padiglione ' + padiglione;
				if (location && location!='') posizione = location;
				
				
				if (data_prev=='' || data_prev!=data) {
//					if (res!='') {
//						res_header = res_header + '<span class="ui-li-count">'+tot_sub+'</span></li>';
//						$(res_header).appendTo('#list-wrap');
//						$(res).appendTo('#list-wrap');
//						res_header ='';
//						res ='';
//						tot_sub =0;
//					}
					data_prev = data;
					//$('<li data-theme="d" data-role="list-divider">'+data+'</li>').appendTo('#list-wrap');
					$('<li class="ui-li ui-li-divider ui-btn ui-bar-d ui-btn-up-undefined" data-role="list-divider" role="heading">'+data+'</li>').appendTo('div:jqmData(role="content") > ul[id="list-wrap"]');
//					res_header = '<li data-role="list-divider">'+data';
				}
				
				
				


				if ((padiglione && padiglione!='' && x!=null && x!='' && y!=null && y!='') || (location && location!='' && location_map && location_map!='')) {

					// alert(location_map);
					$('<li data-theme="d" class="ui-btn ui-btn-icon-right ui-li ui-btn-up-d"><div style="width:100% !important; padding-bottom: 0px !important; margin-bottom: 0px !important;" class="ui-btn-inner ui-li"><a data-ajax="true" onclick="pad_m = \''+ padiglione+'\';x_m = \''+ x +'\';y_m = \''+y+'\';location_m = \''+location_map+'\';" href="stand_map.html" class="ui-link-inherit2"><p class="list_row list-wrap"><b>'+name+'</b></p><p class="list_subrow">'+posizione+'</p><span class="ui-icon ui-icon-arrow-r"></span></a></div></div></li>').appendTo('div:jqmData(role="content") > ul[id="list-wrap"]');
				}
				//else $('<li data-theme="d" class="ui-btn ui-btn-icon-right ui-li ui-btn-up-d"><div style="width:100% !important; padding-bottom: 0px !important; margin-bottom: 0px !important;" class="ui-btn-inner ui-li"><div style="width:100% !important" class="ui-btn-text"><p class="list_row list-wrap"><b>'+name+'</b></p><p class="list_subrow">'+posizione+'</p></div></div></li>').appendTo('div:jqmData(role="content") > ul[id="list-wrap"]');

				
				
				
				
				
				
				
				
				else $('<li data-theme="d" class="ui-btn ui-btn-icon-right ui-li ui-btn-up-d"><div class="ui-btn-inner ui-li"><div class="ui-btn-text"><a data-ajax="true" onclick="depthDetail=0;backpressDetail = false;valore[0]='+nid+';tipo[0] = \'S\';" href="detail_list.html?valore='+nid+'&tipo=S" class="ui-link-inherit2"><p class="list_row list-wrap"><b>'+name+'</b></p><p class="list_subrow">'+posizione+'</p><span class="ui-icon ui-icon-arrow-r"></span></a></div></div></li>').appendTo('div:jqmData(role="content") > ul[id="list-wrap"]');

				//$('<li data-theme="d" id="link_'+nid+'"><a data-ajax="true" onclick="$.mobile.pageLoading();" href="detail_list.html?valore='+nid+'&tipo=S"><p class="list_row"><b>'+name+'</b></p><p class="list_subrow">Padiglione '+padiglione+'</p></a></li>').appendTo('#list-wrap');
//				res = res + '<li id="link_'+nid+'"><a data-ajax="true" href="detail_list.html?valore='+nid+'&tipo=Evento">'+name+'</a></li>';
//				tot_sub = tot_sub + 1;
			});
			fixgeometry();
		},
	
		error: function(req, error) { 			
			//$("#gio").html("Errore: " + error + "<br /><br /> " + req);
			$("#gio").html("<b>Errore nel recupero informazioni. Prego controllare la connessione.</b>");
		}
	});
	
}



/*
function getXmlListMerceologie() {
	var parent_merceologia = getUrlVars()["parent_merceologia"];

	$.ajax({
		async: false,
		type: "GET",
		//url: "http://fieremobile/espositori-search-page?title=aaa&prodotto_tid=355&rand="+(new Date().getTime()),
		url: URL_SERVER + "get-prodotti-tassonomia?parent_term="+parent_merceologia+"&rand="+(new Date().getTime()),
		//url: "http://192.168.1.127/mobile/espositori.php?rand="+(new Date().getTime()),
		dataType: "xml",
		success: function(xml) {
			
			$(xml).find('product').each(function(){
				var name = $(this).find('name').text();
				var tid = $(this).find('tid').text();
				
				$('<li id="link_'+tid+'"><a data-ajax="true" onclick="$.mobile.pageLoading();" href="list_merceologie.html?parent_merceologia='+tid+'">'+name+'</a></li>').appendTo('#list-wrap');
			});
		},
	
		error: function(req, error) { 			
			//$("#gio").html("Errore: " + error + "<br /><br /> " + req);
			$("#gio").html("<b>Errore nel recupero informazioni. Prego controllare la connessione.</b>");
		}
	});
	
}




*/


/*function getXmlList() {
	$.ajax({
		async: false,
		type: "GET",
		url: "http://192.168.1.127/mobile/sites.php?rand="+(new Date().getTime()),
		dataType: "xml",
		success: function(xml) {
			
			$(xml).find('site').each(function(){
				var id = $(this).attr('id');
				var title = $(this).find('title').text();
				var url = $(this).find('url').text();
				
				$('<li id="link_'+id+'"><a data-ajax="true" href="test_list.html?valore='+id+'">'+title+'</a></li>').appendTo('#list-wrap');
				//$('<div class="items" id="link_'+id+'"></div>').html('<a href="'+url+'">'+title+'</a>').appendTo('#page-wrap');
*/				
				/*$(this).find('desc').each(function(){
					var brief = $(this).find('brief').text();
					var long = $(this).find('long').text();
					$('<div class="brief"></div>').html(brief).appendTo('#link_'+id);
					$('<div class="long"></div>').html(long).appendTo('#link_'+id);
				});*/
/*			});
		},
	
		error: function(req, error) { 			
			$("#gio").text("Errore: " + error);
		}
	});
	
}*/



function ReplaceAll(Source,stringToFind,stringToReplace){
	var temp = Source;
    var index = temp.indexOf(stringToFind);
	while(index != -1){
		temp = temp.replace(stringToFind,stringToReplace);
		index = temp.indexOf(stringToFind, index + stringToReplace.length);
	}
	return temp;
}

// alert dialog dismissed
function alertDismissed() {
    // do something
}

// Show a custom alert
//
function showAlert(msg, title) {
    navigator.notification.alert(
        msg,  // message
        alertDismissed,         // callback
        title,            // title
        'OK'                  // buttonName
    );
}

/*
jQuery Localizer Plugin

Copyright (c) 2011 Sagi Mann
All rights reserved.

Redistribution and use in source and binary forms are permitted
provided that the above copyright notice and this paragraph are
duplicated in all such forms and that any documentation,
advertising materials, and other materials related to such
distribution and use acknowledge that the software was developed
by the <organization>.  The name of the
University may not be used to endorse or promote products derived
from this software without specific prior written permission.
THIS SOFTWARE IS PROVIDED ``AS IS'' AND WITHOUT ANY EXPRESS OR
IMPLIED WARRANTIES, INCLUDING, WITHOUT LIMITATION, THE IMPLIED
WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE.
*/

jQuery.fn.localize = function(stringsVar) {
	var stringRes = stringsVar || strings;
	if(!stringRes) return;
	this.find("*").contents().each(function() {
			if (typeof this.data == 'string') {
				var s = jQuery.trim(this.data);
				if (typeof s == 'string' && s.length > 0) {
					var s2 = stringRes[s];
					if (typeof s2 == 'string') {
						this.data = s2;
					}
				}
			}
			
			if (this.nodeName == "IMG") {
				// use the nodeValue instead of this.src because this.src is resolved to full path instead of the original value in the html, so it can't be known at coding time.
				var s2 = stringRes[this.attributes['src'].nodeValue];
				if (typeof s2 == 'string') {
					this.attributes['src'].nodeValue = s2;
				}
			}

			if (this.nodeName == "A") {
				// use the nodeValue instead of this.href because this.href is resolved to full path instead of the original value in the html, so it can't be known at coding time.
				var s2 = stringRes[this.attributes['href'].nodeValue];
				if (typeof s2 == 'string') {
					this.href = s2;
				}
			}
			return this;
	});
	
};

$(document).ready(function() {
	$("div:jqmData(role='page')[id='prima']").bind("orientationChanged orientationchange pageshow", fixgeometry);
	$("div:jqmData(role='page')[id='ricerca_espositori']").bind("orientationChanged orientationchange pageshow", fixgeometry);
	$(window).bind("orientationChanged orientationchange pageshow", fixgeometry);
});


var fixgeometry = function() {
	  try{
  	  /* Some orientation changes leave the scroll position at something
  	  * that isn't 0,0. This is annoying for user experience. */
  	  // scroll(0, 0);

  	  /* Calculate the geometry that our content area should take */
		  //alert("bo");
//  	  var header = $("div:jqmData(role='header')[id='header_1']");
//  	  var footer =$("div:jqmData(role='footer')[id='footer_1']");
  	  //alert(footer.is(":visible"));
	  //var content = '';
	  var i_viewer = $('div:jqmData(role="content")[id="page-wrap-map"] > div > div[id="viewer"]');
//  	  if (footer.is(":visible")) {
//		  if (!back) {
//			  content = $('#spashScreen');
//		  } else content = $("div[data-role='content']:visible:visible");
//		  var headerH = 0;
//		  if(header.is(":visible")) headerH = header.outerHeight();
//		  var viewport_height = $(window).height();
//		  if((content.outerHeight()+headerH+footer.outerHeight())<viewport_height) {
//			  //content_height -= (content.outerHeight() - content.height() + 1);
//			  var content_height = viewport_height - headerH - footer.outerHeight();
//			  content_height -= (content.outerHeight() - content.height() - 1);
//			  content.height(content_height);
//			  
//		  }
//  	  }
//  	  else 
	  // if(i_viewer.attr('id') == "viewer")
	  if(giaattivo)
	  {
  		  var header = $("div[data-role='header']:visible");
  		  var footer = $("div[data-role='footer']:visible");
  		  var content = $("div[data-role='content']:visible:visible");  		  
  		  var viewport_height = $(window).height();  			 
  		  var content_height = viewport_height - header.outerHeight() - footer.outerHeight();
  		  /* Trim margin/border/padding height */  		  
		  content_height -= (content.outerHeight() - content.height());
		  content.height(content_height);
		  i_viewer.height(content_height);
		  iviewer_obj.settings.height = content_height;
		  iviewer_obj.settings.width = $(window).width();
	  }
  	  else  {
		// 	alert("altre! id content: " + $('div:jqmData(role="content"):visible:visible').attr('id'));
		//	header = $("div[data-role='header']:visible");
		//	footer = $("div[data-role='footer']:visible");
		//	content = $("div[data-role='content']:visible:visible");
		  var header = $('div:jqmData(role="header"):visible');
		  var footer = $('div:jqmData(role="footer"):visible');
		  var content = $('div:jqmData(role="content"):visible:visible');
  		  var viewport_height = $(window).height();
  			 
  		  var content_height = viewport_height - header.outerHeight() - footer.outerHeight();
  		  /* Trim margin/border/padding height */
  		  var temp =(content.outerHeight()+header.outerHeight()+footer.outerHeight()); 
  		  if(temp<=viewport_height) {
  			  content_height -= (content.outerHeight() - content.height());
  			  content.height(content_height);
  			  // alert(content.height());
  		  }
  	  }
	}catch (e) {alert(e.message);}
	  }; 
	  
	  
//var fixgeometry = function() {
//	  /* Some orientation changes leave the scroll position at something
//	  * that isn't 0,0. This is annoying for user experience. */
//	  scroll(0, 0);
//
//	  /* Calculate the geometry that our content area should take */
//	  var header = $("div[data-role='header']:visible");
//	  //var header = $("#header_1");
//	  var footer = $("div[data-role='footer']:visible");
//	  //var footer = $("#footer_1");
//	  var content = $("div[data-role='content']:visible:visible");
//	  //var content = $("#main");
//	  
//	  //alert("header:" + header + "   footer:" + footer + "    content:" + content);
//
//	  var viewport_height = $(window).height();
//	  
//	  if((content.outerHeight()+header.outerHeight()+footer.outerHeight())<=viewport_height) {
//		  var content_height = viewport_height - header.outerHeight() - footer.outerHeight();
//		  content_height -= (content.outerHeight() - content.height() - 1);
//		  content.height(content_height);
//	  }
//}; 

	    function updatePreferiti() {
//	        var db = window.openDatabase("MacefMobileDb", "1.0", "Macef Mobile Db", 200000);
	        db.transaction(readPreferitiDB, errorCB);
	    }

	    // Read the database 
	    function readPreferitiDB(tx) {
	         //tx.executeSql('CREATE TABLE IF NOT EXISTS PREFERRED (nid unique, type)');
	         if(delPreferito) {
	        	 deletePref(tx, delPreferito);
	         }
	         else {
		         //var filtro = getUrlVars()["filtro"];
		         //alert(filtro);
		         //if (filtro && filtro!='') tx.executeSql('SELECT * FROM PREFERRED WHERE type="'+filtro+'" ORDER BY padiglione ASC', [], querySuccessPreferiti, errorCB);
		         //else tx.executeSql('SELECT * FROM PREFERRED ORDER BY padiglione ASC', [], querySuccessPreferiti, errorCB);
	        	 popolaListaPreferiti(tx);
	         }
	    }
	    
	    function popolaListaPreferiti(tx) {
			 // alert(filtroPreferito);
	         if (filtroPreferito && filtroPreferito!='') tx.executeSql('SELECT * FROM PREFERRED WHERE type="'+filtroPreferito+'" AND lang=\''+languageSelect+'\' ORDER BY padiglione, location ASC', [], querySuccessPreferiti, errorCB);
	         else tx.executeSql('SELECT * FROM PREFERRED WHERE lang=\''+languageSelect+'\' ORDER BY padiglione, location ASC', [], querySuccessPreferiti, errorCB);
	    }
	    
	    function deletePref(tx, id) {
	        // alert("Elimino preferito: "+id);
	        tx.executeSql('DELETE FROM PREFERRED WHERE nid="'+id+'"', [], deleteSuccess, errorCB);
			delPreferito = 0;
	    }
	    
	    function deleteSuccess(tx, results) {
	    	 popolaListaPreferiti(tx);
	    }
	    
	    // Transaction error callback
	    function errorCB(tx, err) {
	        alert("Errore nella gestione dei preferiti: "+err);
	    }
	    
	    
	    // Transaction success callback
	    function querySuccessPreferiti(tx, results) {
	        
	    	$('div:jqmData(role="content") > ul[id="list-wrap"]').html('');
	    	
	    	var len = results.rows.length;
	        //alert("PREFERRED table: " + len + " rows found.");
	        
	        var padiglione_prev = '#####'; // padiglione che non esiste ('' non va bene)
	        
	        for (var i=0; i<len; i++){
	        	var tipo_ev = '';
	        	if (results.rows.item(i).type=='E') tipo_ev = '<span>Espositore</span>';
	        	if (results.rows.item(i).type=='V') tipo_ev = '<span>Evento</span>';
	        	var posizione = '';
	        	if(results.rows.item(i).padiglione) posizione = "<span>Padiglione</span> "+results.rows.item(i).padiglione;
	        	else if(results.rows.item(i).location) posizione = results.rows.item(i).location;
	        	if (padiglione_prev=='#####' || padiglione_prev!=posizione) {
					padiglione_prev=posizione;
					//$('<li data-role="list-divider">'+padiglione_prev+'</li>').appendTo('#list-wrap');
					$('<li class="ui-li ui-li-divider ui-btn ui-bar-d ui-btn-up-undefined" data-role="list-divider" role="heading">'+padiglione_prev+'</li>').appendTo('div:jqmData(role="content") > ul[id="list-wrap"]');
				}
	        	if(results.rows.item(i).stand && results.rows.item(i).stand!='') posizione +=	", " + results.rows.item(i).stand;
	            //$('<li><a data-ajax="false" href="detail_list.html?valore='+results.rows.item(i).nid+'&tipo=Espositore">NID:'+results.rows.item(i).nid+'   TYPE:'+results.rows.item(i).type+'</a></li>').appendTo('#list-wrap');
	            $('<li data-theme="d" class="ui-btn ui-btn-icon-right ui-li ui-btn-up-d"><div class="ui-btn-inner ui-li"><div class="ui-btn-text"><a data-ajax="true" data-transition="fade" onclick="return conferma_eliminazione('+results.rows.item(i).nid+');" href="list_preferiti.html?rand='+(new Date().getTime())+'" class="ui-link-inherit2"><img style="margin-left:10px;margin-top:10px;" src="img/delete.gif" />&nbsp;&nbsp;&nbsp;</a><a data-ajax="true" onclick="depthDetail=0; backpressDetail= false; valore[0]='+results.rows.item(i).nid+';tipo[0]=\''+results.rows.item(i).type+'\';" href="detail_list.html?rand='+(new Date().getTime())+'" class="ui-link-inherit2"><p class="list_row list-wrap"><b>'+results.rows.item(i).name+'</b></p><br/><p class="list_subrow"><span>Tipo</span>: '+tipo_ev+',  '+posizione +'</p><span class="ui-icon ui-icon-arrow-r"></span></a></div></div></li>').appendTo('div:jqmData(role="content") > ul[id="list-wrap"]');
	        }
	        //alert("Preferiti letti!");
	        setTimeout('fixgeometry()', 1000);
			if(languageSelect && languageSelect == 'en'){
            	$('html').localize();
			}

	    }

	    
	    function conferma_eliminazione(id) {
	    	if (languageSelect=='en' ? confirm('Delete from favorites?') : confirm('Eliminare dai preferiti?')) {
	    		delPreferito = id;
	    		return true;
	    	} 
	    	return false;
	    }


var getUrlVars = (function() {
	var vars;
	return function() {
		if(vars !== undefined) return vars;
		vars = {};
		window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
			vars[key] = value;
		});
		return vars;
	}
})();

(function($){
    
    $.fn.iviewer  = function(o)
    {
        return this.each(function()
                        {
						   $(this).data('viewer', new $iv(this,o));
                        });
    }
    
    var defaults = {
        /**
        * start zoom value for image, not used now
        * may be equal to "fit" to fit image into container or scale in % 
        **/
        zoom: "fit",
        /**
        * base value to scale image
        **/
        zoom_base: 100,
        /**
        * maximum zoom
        **/
        zoom_max: 600,
        /**
        * minimum zoom
        **/
        zoom_min: 25,
        /**
        * base of rate multiplier.
        * zoom is calculated by formula: zoom_base * zoom_delta^rate
        **/
        zoom_delta: 1.4,
        /**
        * if true plugin doesn't add its own controls
        **/
        ui_disabled: false,
        /**
        * if false, plugin doesn't bind resize event on window and this must 
        * be handled manually
        **/
        update_on_resize: true,
        /**
        * event is triggered when zoom value is changed
        * @param int new zoom value
        * @return boolean if false zoom action is aborted
        **/
        onZoom: null,
        /**
        * callback is fired after plugin setup
        **/
        initCallback: null,
        /**
        * event is fired on drag begin
        * @param object coords mouse coordinates on the image
        * @return boolean if false is returned, drag action is aborted
        **/
        onStartDrag: null,
        /**
        * event is fired on drag action
        * @param object coords mouse coordinates on the image
        **/
        onDrag: null,
        /**
        * event is fired when mouse moves over image
        * @param object coords mouse coordinates on the image
        **/
        onMouseMove: null,
        /**
        * mouse click event
        * @param object coords mouse coordinates on the image
        **/
        onClick: null,
        /**
        * event is fired when image starts to load
        */
        onStartLoad: null,
        /**
        * event is fired, when image is loaded and initially positioned
        */
        onFinishLoad: null,
        /**
        * event is fired, when image is loaded and initially positioned
        */
        onFinishUpdate: null
    };
    
    $.iviewer = function(e,o)
    {
        var me = this;
        
        /* object containing actual information about image
        *   @img_object.object - jquery img object
        *   @img_object.orig_{width|height} - original dimensions
        *   @img_object.display_{width|height} - actual dimensions
        */
        this.img_object = {};

        this.zoom_object = {}; //object to show zoom status
        this.image_loaded = false;
        
        //drag variables
        this.dx = 0; 
        this.dy = 0;
        this.dragged = false;
        
        this.settings = $.extend({}, defaults, o || {});
        this.current_zoom = this.settings.zoom;
        
        if(this.settings.src === null){
            return;
        }
            
        this.container = $(e);
        this.update_container_info();

        //init container
        this.container.css("overflow","hidden");
         
        if(this.settings.update_on_resize == true)
        {
            $(window).resize(function()
            {
                me.update_container_info();
            });
        }
        
        this.img_object.x = 0;
        this.img_object.y = 0;
        
        //init object
        this.img_object.object = $("<img rel='iviewer'>").
        css({ position: "absolute", top :"0px", left: "0px"}). //this is needed, because chromium sets them auto otherwise
        //bind mouse events
//        mousedown(function(e){ alert("mousedown e:" + e.pageX + "  " +e.pageY ); return me.drag_start(e); }).
//        mousemove(function(e){ /*alert("mousemovee:" + e.pageX + "  " +e.pageY); */ return me.drag(e); alert("mousemove aft:" + this.dx + "  " +this.dy);}).
//        mouseup(function(e){ /*alert("mouseupe:" + e);*/ return me.drag_end(e)}).
        click(function(e){return me.click(e)}); /*.*/
//        mouseleave(function(e){ /* alert("mouseleave e:" + e);*/ return me.drag_end(e)}); /*.
        /*mousewheel(function(ev, delta)
        {
            //this event is there instead of containing div, because
            //at opera it triggers many times on div
            var zoom = (delta > 0)?1:-1;
            me.zoom_by(zoom);
            return false;
        }); */
        this.img_object.object.prependTo(me.container);
        this.loadImage(this.settings.src);
        
        if(!this.settings.ui_disabled)
        {
            this.createui();
        }
        
        if(this.settings.initCallback)
        {
            this.settings.initCallback.call(this);
        }
    }
    
    
    var $iv = $.iviewer;
    
    $iv.fn = $iv.prototype = {
        iviewer : "0.4.2"
    }
    $iv.fn.extend = $iv.extend = $.extend;
    
    $iv.fn.extend({

        loadImage: function(src)
        {
            this.current_zoom = this.settings.zoom;
            this.image_loaded = false;
            var me = this;
            
            if(this.settings.onStartLoad)
            {
               this.settings.onStartLoad.call(this);
            }

            this.img_object.object.unbind('load').
                removeAttr("src").
                removeAttr("width").
                removeAttr("height").
				css({ top: 0, left: 0 }).
                load(function(){
                    me.image_loaded = true;
                    me.img_object.display_width = me.img_object.orig_width = this.width;
                    me.img_object.display_height = me.img_object.orig_height = this.height;
                           
                    if(!me.container.hasClass("iviewer_cursor")){
                        me.container.addClass("iviewer_cursor");
                    }
    
                    if(me.settings.zoom == "fit"){
                        me.fit();
                    }
                    else {
                        me.set_zoom(me.settings.zoom);
                    }
                    
                    if(me.settings.onFinishLoad)
                    {
                       me.settings.onFinishLoad.call(me);
                    }
                
                //src attribute is after setting load event, or it won't work
            }).attr("src",src);
        },
                  
        /**
        * fits image in the container
        **/
        fit: function()
        {
            var aspect_ratio = this.img_object.orig_width / this.img_object.orig_height;
            var window_ratio = this.settings.width /  this.settings.height;
            var choose_left = (aspect_ratio > window_ratio);
            var new_zoom = 0;
    
            if(choose_left){
                new_zoom = this.settings.width / this.img_object.orig_width * 100;
            }
            else {
                new_zoom = this.settings.height / this.img_object.orig_height * 100;
            }

          this.set_zoom(new_zoom);
        },
        
        /**
        * center image in container
        **/
        center: function()
        {
            this.setCoords(-Math.round((this.img_object.display_height - this.settings.height)/2),
                           -Math.round((this.img_object.display_width - this.settings.width)/2));
        },
        
        /**
        *   move a point in container to the center of display area
        *   @param x a point in container
        *   @param y a point in container
        **/
        moveTo: function(x, y)
        {
            var dx = x-Math.round(this.settings.width/2);
            var dy = y-Math.round(this.settings.height/2);
            
            var new_x = this.img_object.x - this.dx;
            var new_y = this.img_object.y - this.dy;
            
            this.setCoords(new_x, new_y);
        },
        
        /**
        * set coordinates of upper left corner of image object
        **/
        setCoords: function(x,y)
        {
            //do nothing while image is being loaded
            if(!this.image_loaded)
            {
                return;
            }
            
            //check new coordinates to be correct (to be in rect)
            if(y > 0){
                y = 0;
            }
            if(x > 0){
                x = 0;
            }
            if(y + this.img_object.display_height < this.settings.height){
                y = this.settings.height - this.img_object.display_height;
            }
            if(x + this.img_object.display_width < this.settings.width){
                x = this.settings.width - this.img_object.display_width;
            }
            if(this.img_object.display_width <= this.settings.width){
                x = -(this.img_object.display_width - this.settings.width)/2;
            }
            if(this.img_object.display_height <= this.settings.height){
                y = -(this.img_object.display_height - this.settings.height)/2;
            }
            
            this.img_object.x = x;
            this.img_object.y = y;
            
            this.img_object.object.css("top",y + "px")
                             .css("left",x + "px");
        },
        
        
        /**
        * convert coordinates on the container to the coordinates on the image (in original size)
        *
        * @return object with fields x,y according to coordinates or false
        * if initial coords are not inside image
        **/
        containerToImage : function (x,y)
        {
            if(x < this.img_object.x || y < this.img_object.y ||
               x > this.img_object.x + this.img_object.display_width ||
               y > this.img_object.y + this.img_object.display_height)
            {
                return false;
            }
            
            return { x :  $iv.descaleValue(x - this.img_object.x, this.current_zoom),
                     y :  $iv.descaleValue(y - this.img_object.y, this.current_zoom)
            };
        },
        
        /**
        * convert coordinates on the image (in original size) to the coordinates on the container
        *
        * @return object with fields x,y according to coordinates or false
        * if initial coords are not inside image
        **/
        imageToContainer : function (x,y)
        {
            if(x > this.img_object.orig_width || y > this.img_object.orig_height)
            {
                return false;
            }
            
            //alert("$iv.scaleValue(x, this.current_zoom): " + $iv.scaleValue(x, this.current_zoom) + "   this.current_zoom:" + this.current_zoom);
            return { x : this.img_object.x + $iv.scaleValue(x, this.current_zoom),
                     y : this.img_object.y + $iv.scaleValue(y, this.current_zoom)
            };
        },
        
        /**
        * get mouse coordinates on the image
        * @param e - object containing pageX and pageY fields, e.g. mouse event object
        *
        * @return object with fields x,y according to coordinates or false
        * if initial coords are not inside image
        **/
        getMouseCoords : function(e)
        {
            var img_offset = this.img_object.object.offset();

            return { x : $iv.descaleValue(e.pageX - img_offset.left, this.current_zoom),
                     y : $iv.descaleValue(e.pageY - img_offset.top, this.current_zoom)
            };
        },
        
        /**
        * set image scale to the new_zoom
        * @param new_zoom image scale in % 
        **/
        set_zoom: function(new_zoom)
        {
            if(this.settings.onZoom && this.settings.onZoom.call(this, new_zoom) == false)
            {
            	//alert("false");
                return;
            }
            
            //do nothing while image is being loaded
            if(!this.image_loaded)
            {
            	//alert("ancora in load");
                return;
            }
            
            if(new_zoom <  this.settings.zoom_min)
            {
                new_zoom = this.settings.zoom_min;
            }
            else if(new_zoom > this.settings.zoom_max)
            {
                new_zoom = this.settings.zoom_max;
            }

            /* we fake these values to make fit zoom properly work */
            if(this.current_zoom == "fit")
            {
                var old_x = Math.round(this.settings.width/2 + this.img_object.orig_width/2);
                var old_y = Math.round(this.settings.height/2 + this.img_object.orig_height/2);
                this.current_zoom = 100;
            }
            else {
                var old_x = -parseInt(this.img_object.object.css("left"),10) +
                                            Math.round(this.settings.width/2);
                var old_y = -parseInt(this.img_object.object.css("top"),10) + 
                                            Math.round(this.settings.height/2);
            }

            var new_width = $iv.scaleValue(this.img_object.orig_width, new_zoom);
            var new_height = $iv.scaleValue(this.img_object.orig_height, new_zoom);
            var new_x = $iv.scaleValue( $iv.descaleValue(old_x, this.current_zoom), new_zoom);
            var new_y = $iv.scaleValue( $iv.descaleValue(old_y, this.current_zoom), new_zoom);

            new_x = this.settings.width/2 - new_x;
            new_y = this.settings.height/2 - new_y;
            
            this.img_object.object.attr("width",new_width)
                             .attr("height",new_height);
            this.img_object.display_width = new_width;
            this.img_object.display_height = new_height;
                               
            this.setCoords(new_x, new_y);

            this.current_zoom = new_zoom;
            this.update_status();
            
            
            
            
            if(this.settings.onFinishUpdate)
            {
            	this.settings.onFinishUpdate.call(this);
            }
            //alert("fine zoom...");
        },
        
        /**
        * changes zoom scale by delta
        * zoom is calculated by formula: zoom_base * zoom_delta^rate 
        * @param Integer delta number to add to the current multiplier rate number 
        **/
        zoom_by: function(delta)
        {
            var closest_rate = this.find_closest_zoom_rate(this.current_zoom);

            var next_rate = closest_rate + delta;
            var next_zoom = this.settings.zoom_base * Math.pow(this.settings.zoom_delta, next_rate)
            if(delta > 0 && next_zoom < this.current_zoom)
            {
                next_zoom *= this.settings.zoom_delta;
            }
            
            if(delta < 0 && next_zoom > this.current_zoom)
            {
                next_zoom /= this.settings.zoom_delta;
            }
            
            this.set_zoom(next_zoom);
        },
        
        /**
        * finds closest multiplier rate for value
        * basing on zoom_base and zoom_delta values from settings
        * @param Number value zoom value to examine
        **/
        find_closest_zoom_rate: function(value)
        {
            if(value == this.settings.zoom_base)
            {
                return 0;
            }
            
            function div(val1,val2) { return val1 / val2 };
            function mul(val1,val2) { return val1 * val2 };
            
            var func = (value > this.settings.zoom_base)?mul:div;
            var sgn = (value > this.settings.zoom_base)?1:-1;
            
            var mltplr = this.settings.zoom_delta;
            var rate = 1;
            
            while(Math.abs(func(this.settings.zoom_base, Math.pow(mltplr,rate)) - value) > 
                  Math.abs(func(this.settings.zoom_base, Math.pow(mltplr,rate+1)) - value))
            {
                rate++;
            }
            
            return sgn * rate;
        },
        
        /* update scale info in the container */
        update_status: function()
        {
            if(!this.settings.ui_disabled)
            {
                var percent = Math.round(100*this.img_object.display_height/this.img_object.orig_height);
                if(percent)
                {
                    this.zoom_object.html(percent + "%");
                }
            }   
        },
        
        update_container_info: function()
        {
            this.settings.height = this.container.height();
            this.settings.width = this.container.width();
        },
        
        /**
        *   callback for handling mousdown event to start dragging image
        **/
        drag_start: function(e)
        {
        	//alert("drag_start X:" + e.pageX + "  e.pageY"+ e.pageY);
            if(this.settings.onStartDrag && 
               this.settings.onStartDrag.call(this,this.getMouseCoords(e)) == false)
            {
                return false;
            }
            
            /* start drag event*/
            this.dragged = true;
            this.container.addClass("iviewer_drag_cursor");
    
            this.dx = e.pageX - this.img_object.x;
            this.dy = e.pageY - this.img_object.y;
            return false;
        },
        
        /**
        *   callback for handling mousmove event to drag image
        **/
        drag: function(e)
        {
        	//alert("drag X:" + e.pageX + "  e.pageY"+ e.pageY);
            this.settings.onMouseMove && 
                    this.settings.onMouseMove.call(this,this.getMouseCoords(e));
            
            if(this.dragged){
                this.settings.onDrag && 
                        this.settings.onDrag.call(this,this.getMouseCoords(e));
                        
                var ltop =  e.pageY -this.dy;
                var lleft = e.pageX -this.dx;
                
                this.setCoords(lleft, ltop);
                return false;
            }
        },
        
        /**
        *   callback for handling stop drag
        **/
        drag_end: function(e)
        {
        	//alert("drag_end");
            this.container.removeClass("iviewer_drag_cursor");
            this.dragged=false;
            
            
            /*if(this.settings.onFinishUpdate)
            {
            	this.settings.onFinishUpdate.call(this);
            }*/
            
        },
        
        click: function(e)
        {
            this.settings.onClick && 
                    this.settings.onClick.call(this,this.getMouseCoords(e));
        },
        
        /**
        *   create zoom buttons info box
        **/
        createui: function()
        {
            var me=this; 
            
            $("<div>").addClass("iviewer_zoom_in").addClass("iviewer_common").
            addClass("iviewer_button").
            mousedown(function(){me.zoom_by(1); return false;}).appendTo(this.container);
            
            $("<div>").addClass("iviewer_zoom_out").addClass("iviewer_common").
            addClass("iviewer_button").
            mousedown(function(){me.zoom_by(- 1); return false;}).appendTo(this.container);
            
            /*$("<div>").addClass("iviewer_zoom_zero").addClass("iviewer_common").
            addClass("iviewer_button").
            mousedown(function(){me.set_zoom(100); return false;}).appendTo(this.container);
            
            $("<div>").addClass("iviewer_zoom_fit").addClass("iviewer_common").
            addClass("iviewer_button").
            mousedown(function(){me.fit(this); return false;}).appendTo(this.container);
            */
            this.zoom_object = $("<div>").addClass("iviewer_zoom_status").addClass("iviewer_common").
            appendTo(this.container);
            
            this.update_status(); //initial status update
        }
    });
    
    $iv.extend({
        scaleValue: function(value, toZoom)
        {
            return value * toZoom / 100;
        },
        
        descaleValue: function(value, fromZoom)
        {
            return value * 100 / fromZoom;
        }
    });

 })(jQuery);


var strings = {
		'8-12 MAGGIO 2012' : '8-12 MAY 2012' ,
		'8-12 maggio 2012' : '8-12 may 2012' ,
		'Xylexpo Maggio' : 'Xylexpo May' ,
		'Altro' : 'Other' ,
		'ALTRO' : 'OTHER' ,
		'Aziende rappresentate' : 'Represented companies' ,
		'Biglietti' : 'Tickets' ,
		'BIGLIETTI' : 'TICKETS' ,
		'Categorie:' : 'Categories:' ,
		'Cerca' : 'Search' ,
		'Chiama' : 'Call' ,
		'Contatti' : 'Contacts' ,
		'CONTATTI' : 'CONTACTS' ,
		'Date e orari' : 'Dates and times' ,
		'DATE E ORARI' : 'DATES AND TIMES' ,
		'Dettaglio espositore' : 'Exhibitor detail' ,
		'Dettaglio evento' : 'Event detail' ,
		'Dettaglio servizio' : 'Service detail ' ,
		'Espositore' : 'Exhibitor' ,
		'Espositori' : 'Exhibitors' ,
		'espositori trovati.' : 'exhibitors found.' ,
		'espositori in questa categoria' : 'exhibitors in this category.' ,
		'espositori per questo marchio' : 'exhibitors with this brand.' ,
		'Evento' : 'Event' ,
		'Eventi' : 'Events' ,
		'Informazioni' : 'Information' ,
		'Invia mail' : 'Send mail' ,
		'Lista Eventi' : 'Event List' ,
		'Lista Preferiti' : 'Favourites List' ,
		'Lista Servizi' : 'Service List' ,
		'Mappa' : 'Map' ,
		'Mappa dei Padiglioni' : 'Map of the Pavilions' ,
		'MAPPA DEI PADIGLIONI' : 'MAP OF THE PAVILIONS' ,
		'Marchi:' : 'Brands:' ,
		'marchi trovati' : 'brands found' ,
		'Mobilità' : 'Mobility' ,
		'Pad' : 'Pav' ,
		'Padiglione' : 'Pavilion' ,
		'Porte' : 'Doors' ,
		'PORTE' : 'DOORS' ,
		'Preferiti' : 'Favorites' ,
		'Preferito' : 'Favorite' ,
		'Rappresentata da' : 'Represented by' ,
		'Ricerca Espositori' : 'Exhibitor Search' ,
		'Scegli il tuo criterio di ricerca:' : 'Choose your search criteria:' ,
		'Servizi' : 'Services' ,
		'Settori espositivi' : 'Exhibition sectors' ,
		'SETTORI ESPOSITIVI' : 'EXHIBITION SECTORS' ,
		'Tel.' : 'Phone' ,
		'Tipo' : 'Type' ,
		'tra gli espositori' : 'the exhibitors' ,
		'tra i marchi' : 'in brands' ,
		'tra le categorie merceologiche' : 'in merchandise categories' ,
		'Tutti' : 'All' ,
		'Espositori trovati' : 'Exhibitors found' ,
		'img/ricerca_button_bottom.png' : 'img/search_button_bottom.png',
		'img/eventi_button_bottom.png' : 'img/events_button_bottom.png',
		'img/preferiti_button_bottom.png' : 'img/favorites_button_bottom.png',
		'img/servizi_button_bottom.png' : 'img/services_button_bottom.png',
};
