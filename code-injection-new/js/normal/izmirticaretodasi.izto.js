

//url4 = takvim
//url5 = e�itim
//url6 = meslek gruplari 
//url7 = görev
//url8 = tarihce,fuarduyurulari
//url9 = tescil
//url10 = meslekkomiteleriuyeleri
var haberSayisi = 7;
var duyuruSayisi = 7;
var egitimSayisi = 0;
var kruvazorSayisi = 7;
var eventSayisi = 0;

var tabIndex = 0;
var MeslekGrupSayisi = 0;
var FuarDuyuruSayisi=0;
var takvimDialog=0;
var zoomState=0;


var ArrayHaberBaslik = new Array();
var ArrayHaberIcerik = new Array();
var ArrayHaberResim = new Array();
var ArrayHaberDate = new Array();

var ArrayDuyuruBaslik = new Array();
var ArrayDuyuruIcerik = new Array();
var ArrayDuyuruResim = new Array();
var ArrayDuyuruDate = new Array();

var ArrayEgitimBaslik = new Array();
var ArrayEgitimIcerik = new Array();
var ArrayEgitimResim = new Array();

var ArrayKruvaziyerBaslik = new Array();
var ArrayKruvaziyerIcerik = new Array();
var ArrayKruvaziyerResim = new Array();

var ArrayEventBaslik = new Array();
var ArrayEventIcerik = new Array();
var ArrayEventStartDate = new Array();
var ArrayEventEndDate = new Array();
var ArrayEventSaatStart = new Array();
var ArrayEventSaatEnd = new Array();

var ArrayMeslekBaslik = new Array();
var ArrayMeslekIcerik = new Array();

var ArrayFuarDuyurulariBaslik = new Array();
var ArrayFuarDuyurulariIcerik = new Array();




var TakvimEvent = new Array();

// http://mobildata.izto.org.tr/Comittees.aspx?unit=7.%20Meslek%20Komitesi
// http://mobildata.izto.org.tr/Comittees.aspx?unitList=true

var contentKruvazor;
var asd = "";

function onDeviceReady() {
	
            
			var pushNotification = window.plugins.pushNotification;
			pushNotification.register(successHandler, errorHandler,{"senderID":"372272373349","ecb":"onNotificationGCM"});
			function successHandler (result) {
				
			   
			}
			function errorHandler (error) {
			  
			}
		  
		
		
	
	 
	
	// $("#app-status-ul").append('<li>deviceready event received</li>');

			$.mobile.defaultPageTransition = "none";
		    $.mobile.defaultDialogTransition = 'none';
		    $.mobile.useFastClick = true; 
		    $.mobile.touchOverflowEnabled = true;
		    

			$("#Baskan").click(function() {
				
				//sendMessage();
				
				
				var baskaninMesaji = contentBaskan("http://mobildata.izto.org.tr/PresidentsMessage.aspx");
					
			});
	
	
	document.addEventListener("offline", function() {
	  //  alert("Uygulama, aktif internet bağlantısı gerektirmektedir. Lütfen internet bağlantınızı kontrol ediniz.");
		navigator.notification.alert(
			    'Uygulama, aktif internet bağlantısı gerektirmektedir. Lütfen internet bağlantınızı kontrol ediniz!',  // message
			    alertDismissed,         // callback
			    'Uyarı',            // title
			    'Tamam'                  // buttonName
			);
	}, false);
	


	$(".takvim").click(function() {
			$('.panelresim').hide();
			$.mobile.changePage($("#TakvimPage"), "none");
					});
	$(document).on('pageshow','#TakvimPage',function(e, data) {
		$('#TakvimPage').html(
				"<img src='img/izto_header.png' height=auto width=100% class='img2'  > <div id='calendar' style='width:100;padding-top:35%;'></div>");
		var xmlhttp4 = getXmlHttpObject();

		xmlhttp4.onreadystatechange = function() {

		 if (xmlhttp4.readyState == 4&& xmlhttp4.status == 200) {
			$.mobile.loading('hide');
            xmlParserTakvim(xmlhttp4.responseText);
            $('#calendar').fullCalendar(
			{
                eventClick : function(event) {
                	takvimDialog=1;
                	
				// alert(event.start);
				for ( var i = 0; i < eventSayisi; i++) {
				// alert(TakvimEvent[i].start);
		        // alert(TakvimEvent[i].start
			    // + "--" +
			    // event.start)
               if (event.tarihStart == ArrayEventStartDate[i])
				   asd = asd
					+ "Başlık&nbsp&nbsp: " + TakvimEvent[i].baslik+ "<br>"
					+ "Yer&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp: " +TakvimEvent[i].desc
					+ "<br>"
				    + "Saat&nbsp&nbsp&nbsp&nbsp&nbsp: " +TakvimEvent[i].saatStart
				+ " -"
				+ TakvimEvent[i].saatEnd
				+ "<div style='text-align:center;'<br><br> *** <br><br></div>";

					}
					$('#TakvimPage').simpledialog2(
			        {
						 mode : 'button',
						 buttonPrompt : asd,
						 buttons : {
						'Tamam' : {click : function() {
						 $('.home').fadeIn(1000);
						 $('.takvim').fadeIn(1000);
						 $('.phone').fadeIn(1000);
						takvimDialog=0;
						}
			        }
				}
			})

			$('.home').fadeOut(1000);
			$('.takvim').fadeOut(1000);
			$('.phone').fadeOut(1000);
           asd = "";
	return false;

}
});

								// calendar.fullCalendar('renderEvent', { title:
								// 'YOUR TITLE', start: "2013-06-05", allDay:
								// true }, true );
								// events.push( {title: 'asd',start:
								// '2013-06-05'});
								// TakvimEvent.push({title: 'asd',start:
								// '2013-06-06'});
								var tarih;
								tarih = ArrayEventStartDate[0];
								$("#calendar").fullCalendar("renderEvent",
										TakvimEvent[0], true);
								for ( var i = 1; i < eventSayisi; i++) {

									// alert(tarih + "--" +
									// ArrayEventStartDate[i]);
									if (tarih != ArrayEventStartDate[i]) {

										$("#calendar").fullCalendar(
												"renderEvent", TakvimEvent[i],
												true);
										tarih = ArrayEventStartDate[i];

									}

								}
								// $("#calendar").fullCalendar('rerenderEvents');
							}
						};

						var url4 = "http://mobildata.izto.org.tr/ChamberCalender.aspx?numberOfNews="+ eventSayisi;
						xmlhttp4.open("GET", url4, true);
						xmlhttp4.send();
						$.mobile.loading('show');

					});
	
	

	var xmlhttp5 = getXmlHttpObject();

	xmlhttp5.onreadystatechange = function() {

		if (xmlhttp5.readyState == 4 && xmlhttp5.status == 200) {
			// $.mobile.loading('hide');

			xmlParserEgitim(xmlhttp5.responseText);
		}
	};

	var url5 = "http://mobildata.izto.org.tr/Trainings.aspx?numberOfNews=999";
	xmlhttp5.open("GET", url5, true);
	xmlhttp5.send();
	// $.mobile.loading('show');
	var viewport = {
		width : $(window).width(),
		height : $(window).height()
	};

	if (viewport.width > 430) {

		$('#tab3').append('<br>'); // Tab3ün kaymamasası için
	}

	else if (viewport.width > 413 && viewport.width <= 430) {
		// $('#tab3').append('<br>');
	}


	document.addEventListener("backbutton", function(e) {
        if(takvimDialog==1)
        {  
        	$("#TakvimPage").simpledialog2('close');
        	takvimDialog=0;
        	$.mobile.changePage($("#TakvimPage"), "none");
        	$('.home').fadeIn(1000);
			$('.takvim').fadeIn(1000);
			$('.phone').fadeIn(1000);
        	
        }
        else if ($.mobile.activePage.is('#page1')) {
			e.preventDefault();
			navigator.app.exitApp();
		} else {
			$('.home').fadeOut(1000);
			$('.takvim').fadeOut(1000);
			$('.phone').fadeOut(1000);

			navigator.app.backHistory();

		}
	}, false);

	
	
	$(".home").click(function() {
	
		if (!$.mobile.activePage.is('#page1')) {
			$('.home').fadeOut(1000);
			$('.takvim').fadeOut(1000);
			$('.phone').fadeOut(1000);
		}

		$.mobile.changePage($("#page1"), "none");

	});
	
	$(".page").on("pageshow", function(event, ui) {
		var divId = $(this).attr('id');
		  $('.plus').unbind('click');
		  $('.minus').unbind('click');
		zoomState=0;
		 $("#" + divId).css("font-size", "100%");
		
		if (divId == "page1") {
			$('.panelresim').show();
			if (tabIndex == 0) {
				$('#tab1').addClass("ui-btn-active");
			} else if (tabIndex == 1) {
				$('#tab2').addClass("ui-btn-active");
			}
			var slider = $('#mainFlexSlider').data('flexslider');
			slider.pause();
			slider.play();
			var slider2 = $('#secondFlexSlider').data('flexslider');
			slider2.pause();
			slider2.play();
		}
	    $(".plus").click(function() {
	    
			if(zoomState==0)
			{
			
			   $("#" + divId).css("font-size", "125%");
			   $(".haberbaslik").css("font-size", "125%");
               zoomState++;
			 }
			else if(zoomState==1)
			{
			   $("#" + divId).css("font-size", "150%");
			   $(".haberbaslik").css("font-size", "150%");
			   zoomState++;
			 }
			else if(zoomState==2)
			{
			   $("#" + divId).css("font-size", "175%");
			   $(".haberbaslik").css("font-size", "175%");
			   zoomState++;
			 
			}
			else if(zoomState==3)
			{
			   $("#" + divId).css("font-size", "200%");
			   $(".haberbaslik").css("font-size", "200%");
			   zoomState++;
			 
			}
			else if(zoomState==4)
			{
			   $("#" + divId).css("font-size", "225%");
			   $(".haberbaslik").css("font-size", "225%");
			   zoomState++;
			 
			}
		});
	  
		$(".minus").click(function() {
			if(zoomState==1)
			{
			 $("#" + divId).css("font-size", "100%");
			 $(".haberbaslik").css("font-size", "100%");
			 zoomState--;
			 
			}
			else if(zoomState==2)
			{
			 $("#" + divId).css("font-size", "125%");
			 $(".haberbaslik").css("font-size", "125%");
			 zoomState--;
			 
			}
			else if(zoomState==3)
			{
			 $("#" + divId).css("font-size", "150%");
			 $(".haberbaslik").css("font-size", "150%");
			 zoomState--;
			 
			}
			else if(zoomState==4)
			{
			 $("#" + divId).css("font-size", "175%");
			 $(".haberbaslik").css("font-size", "175%");
			 zoomState--;
			 
			}
			else if(zoomState==5)
			{
			 $("#" + divId).css("font-size", "200%");
			 $(".haberbaslik").css("font-size", "200%");
			 zoomState--;
			 
			}
		});
		
		$('.home').fadeIn(1000);
		$('.takvim').fadeIn(1000);
		$('.phone').fadeIn(1000);

	});

	$(".link").click(function() {
        $('.panelresim').hide(); 
		$('.home').fadeOut(1000);
		$(".takvim").fadeOut(1000);
		$(".phone").fadeOut(1000);

	});
	$(".panelresim").touchwipe({
		wipeLeft : function() {
			$.mobile.activePage.find('#mypanel').panel("close");
		},
		wipeRight : function() {
			$.mobile.activePage.find('#mypanel').panel("open");
		},
		min_move_x : 20,
		min_move_y : 20,
		preventDefaultEvents : true
	});

	$("#mypanel").panel({
		beforeclose : function(event, ui) {
			$('.panelresim').removeClass('panelClicked');
			

			$(".panelresim").attr("src", "img/playopak.png");
			$(".panelresim").css("width", "14.5%");
			$(".panelresim").css("height", "auto");

		

			$(".coll").trigger('collapse');
			
			$(".home").show();
			$(".takvim").show();
			$(".phone").show();

		}
	});

	$("#mypanel").panel({
		beforeopen : function(event, ui) {
            $(".panelresim").attr("src", "img/playTers2.png");
			$(".panelresim").css("width", "22%");
			$(".panelresim").css("height", "auto");
			$('.panelresim').toggleClass('panelClicked');
			$(window).scrollTop(0);
			$(".home").hide();
		    $(".takvim").hide();
			$(".phone").hide();

		}
	});

	$(document).delegate('.phone', 'click', function() {
		// NOTE: The selector is the hidden DIV element.

		// $(".panelresim").css({ 'z-index' : '-1' });
		$('#inlinecontent').simpledialog2();

	})

	$("#tab1").click(function() {

		$('#listview1').children().remove('li');

		for ( var i = 0; i < duyuruSayisi; i++) {
			addDuyuru(ArrayDuyuruBaslik[i], i);
		}
		tabIndex = 0;
	});
	$("#tab2").click(function() {
		$('#listview1').children().remove('li');

		for ( var i = 0; i < egitimSayisi; i++) {
			addEgitim(ArrayEgitimBaslik[i], i);
		}
		tabIndex = 1;

	});
	$("#tab3").click(function() {
			$('.panelresim').hide();
			$.mobile.loading('show');
			var xmlhttp3 = getXmlHttpObject();
			xmlhttp3.onreadystatechange = function() {
			if (xmlhttp3.readyState == 4&& xmlhttp3.status == 200) {
				$.mobile.loading('hide');
				contentKruvazor = xmlParserKruvazor(xmlhttp3.responseText);
                $('#HaberIcerik').html(" <img src='img/izto_header.png' height=auto width=100% class='img2'  > ");
				$('#HaberIcerik').append("	<div data-role='controlgroup' class='zoomTab' data-type='horizontal'><a data-role='button' class='plus'> A + </a><a data-role='button' class='minus'> A - </a></div>");
				$('#HaberIcerik').append("<div align='justify' class='habercontent'>"+ contentKruvazor + "</div");
				$('#HaberIcerik').trigger('create');
				$('.doclinkKruvazor').click(function() {url = $(this).attr("href");
					navigator.app.loadUrl(url, {
					openExternal : true
					});

				
					});
					$.mobile.changePage($("#HaberIcerik"), "none");

				}
			};

		var url3 = "http://mobildata.izto.org.tr/Cruiser.aspx?numberOfNews=999";
		xmlhttp3.open("GET", url3, true);
		xmlhttp3.send();
		});
	


		var xmlhttp = getXmlHttpObject();
		xmlhttp.onreadystatechange = function() {

		if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
			$.mobile.loading('hide');

			xmlParser(xmlhttp.responseText, "haber", ArrayHaberBaslik,
					ArrayHaberIcerik, ArrayHaberResim,ArrayHaberDate, haberSayisi);
		
		
			$('#mainFlexSlider').flexslider({
				/*
				 * animation : "slide", animationLoop : true,
				 */
				slideshowSpeed : 6000

			});
			$('#secondFlexSlider').flexslider({
				/*
				 * animation : "slide", animationLoop : true,
				 */
				slideshowSpeed : 6000

			});
			$("#slide1").click(function() {
								$('.panelresim').hide();
								var slider = $('#mainFlexSlider').data('flexslider');
								index = slider.currentSlide;

								$('#HaberIcerik').html(" <img src='img/izto_header.png' height=auto width=100% class='img2'  > ");
								$('#HaberIcerik').append("	<div data-role='controlgroup' class='zoomTab' data-type='horizontal'><a data-role='button' class='plus'> A + </a><a data-role='button' class='minus'> A - </a></div>");
                                $('#HaberIcerik').append(ArrayHaberResim[index]);
                                $('#HaberIcerik').append("<div class ='tarih'>" + ArrayHaberDate[index] + "</div>");
                                
								$('#HaberIcerik').append(" <div class='haberbaslik'<strong><span id='HaberTitle' style='color:#2B7CA9'>"
														+ ArrayHaberBaslik[index]
														+ "<br><br> </span></strong></div>");
								$('#HaberIcerik').append(
										"<div align='justify' class='baskaninmesaji'>"
												+ ArrayHaberIcerik[index]
												+ "</div");
								$('#HaberIcerik').trigger('create');
								
								$('.doclinkDuyuru').click(function() {

									url = $(this).attr("href");
									navigator.app.loadUrl(url, {
										openExternal : true
									});

								

								});
								$.mobile.changePage($("#HaberIcerik"), "none");
								
								

							});

		}
	};

	var url = "http://mobildata.izto.org.tr/?NumberOfnews=" + haberSayisi+5;
	xmlhttp.open("GET", url, true);
	xmlhttp.send();
	$.mobile.loading('show');
	
	$("#tescildeistenenbelgeler").click(function() {

	    $.mobile.loading('show');

		var xmlhttp8 = getXmlHttpObject();

		xmlhttp8.onreadystatechange = function() {

	    if (xmlhttp8.readyState == 4&& xmlhttp8.status == 200) {
		  $.mobile.loading('hide');
		  xmlParserTescil(xmlhttp8.responseText);
		  }
		};
	     var url8 = "http://mobildata.izto.org.tr/RequestedDocuments.aspx?tabList=true";
		 xmlhttp8.open("GET", url8, true);
		 xmlhttp8.send();
	     });

		$("#tarihce").click(function() {
			$.mobile.loading('show');
	        var xmlhttp8 = getXmlHttpObject();
	        xmlhttp8.onreadystatechange = function() {

				if (xmlhttp8.readyState == 4 && xmlhttp8.status == 200) {
					$.mobile.loading('hide');
					xmlParserTarihceBaslik(xmlhttp8.responseText);
				}
			};
	        var url8 = "http://mobildata.izto.org.tr/History.aspx?tabNames=1";
			xmlhttp8.open("GET", url8, true);
			xmlhttp8.send();

		});

		$("#yonetimkurulu").click(function() {
			contentGorev("http://mobildata.izto.org.tr/Board.aspx?numberOfNews=999");
	    });

		$("#disiplinkurulu").click(function() {
			contentGorev("http://mobildata.izto.org.tr/DisciplinaryBoard.aspx?numberOfNews=999");
		});

		$("#meclisbaskanlikdivani").click(function() {
			contentGorev("http://mobildata.izto.org.tr/SpeakershipOffice.aspx?numberOfNews=999");
	    });
	    $("#meclisuyeleri").click(function() {
	        contentGorev("http://mobildata.izto.org.tr/Congressmen.aspx?numberOfNews=999");
	    });

		$("#meslekkomiteleriuyeleri").click(function() {

			$.mobile.loading('show');
	        var xmlhttp10 = getXmlHttpObject();
	        xmlhttp10.onreadystatechange = function() {
	            if (xmlhttp10.readyState == 4 && xmlhttp10.status == 200) {
					$.mobile.loading('hide');
					var maxKomiteSayisi= xmlhttp10.responseText;
					$('#KomitePage').append(" <img src='img/izto_header.png' height=auto width=100% class='img2'  > ");
					
					$('#listviewKomite').children().remove('li');

					for ( var i = 0; i < maxKomiteSayisi; i++) {

						addKomite(i + 1 + ". Meslek Komitesi", i);
					}
					if ($('#listviewKomite').hasClass('ui-listview')) {
						$('#listviewKomite').listview('refresh');
					} else {
						$('#listviewKomite').trigger('create');
					}
				
					$.mobile.changePage($("#KomitePage"), "none");
					
					$('#listviewKomite').on('click',' > li',function() {
						var Baslikindex = $(this).index() + 1;
				      //  $.mobile.loading('show');
				        
				        contentGorev("http://mobildata.izto.org.tr/Comittees.aspx?unit="+ Baslikindex + ". Meslek Komitesi");

				         });				
								
					            
					            
					            

					}
				};
			var url10 = "http://mobildata.izto.org.tr/Comittees.aspx?max=true";
			xmlhttp10.open("GET", url10, true);
			xmlhttp10.send();
			});

	$("#kalite").click(function() {
		contentAjax("http://mobildata.izto.org.tr/QualityPolicy.aspx?numberOfNews=20");
	});

	$("#uyelikislemleri").click(function() {
		contentAjax("http://mobildata.izto.org.tr/MembershipProcedures.aspx?numberOfNews=999");

	});
	$("#uyelikavantajlari").click(function() {
		contentAjax("http://mobildata.izto.org.tr/MembershipAdvantages.aspx?numberOfNews=999");

	});
	$("#uyelikucretleri").click(function() {
		contentAjax("http://mobildata.izto.org.tr/MembershipPrice.aspx?numberOfNews=999");
	});

	$("#2013Hizmet").click(function() {
		contentAjax("http://mobildata.izto.org.tr/MembershipFeeRate.aspx?numberOfNews=999");

	});
	$("#uyeyukumlulukler").click(function() {
		contentAjax("http://mobildata.izto.org.tr/MemberLiabilities.aspx?numberOfNews=999");

	});

	$("#meslekgruplari").click(function() {var xmlhttp6 = getXmlHttpObject();
    xmlhttp6.onreadystatechange = function() {
    if (xmlhttp6.readyState == 4 && xmlhttp6.status == 200) {
		$.mobile.loading('hide');
		xmlParserMeslekGruplariBaslik(xmlhttp6.responseText);
		$('#MeslekPage').append(" <img src='img/izto_header.png' height=auto width=100% class='img2'  > ");
		$('#listviewMeslek').children().remove('li');
		for ( var i = 0; i < MeslekGrupSayisi; i++) {
			addMeslek(ArrayMeslekBaslik[i], i);
		}
		if ($('#listviewMeslek').hasClass('ui-listview')) 
		{
		    $('#listviewMeslek').listview('refresh');
		} else 
		{
			$('#listviewMeslek').trigger('create');
		}
			$.mobile.changePage($("#MeslekPage"), "none");
			$('#listviewMeslek').on('click',' > li',function() {
			var Baslikindex = $(this).index() + 1;
			$.mobile.loading('show');
			var xmlhttp7 = getXmlHttpObject();
			xmlhttp7.onreadystatechange = function() {
              if (xmlhttp7.readyState == 4&& xmlhttp7.status == 200) {
			  $.mobile.loading('hide');
			  var meslek = xmlParserMeslekGruplari(xmlhttp7.responseText);
			  $('#HaberIcerik').html(" <img src='img/izto_header.png' height=auto width=100% class='img2'  > ");
		      $('#HaberIcerik').append("<div align='justify' class='listviewIcerik'>"+ meslek+ "</div");
			  $.mobile.changePage($("#HaberIcerik"),"none");
			  }
			 };
			 var url7 = "http://mobildata.izto.org.tr/OccupationalGroupDefinitions.aspx?index="+ Baslikindex;
			 xmlhttp7.open("GET", url7,true);
			 xmlhttp7.send();
         });

		}
		};
		    var url6 = "http://mobildata.izto.org.tr/OccupationalGroupDefinitions.aspx?tabList=true";
			xmlhttp6.open("GET", url6, true);
			xmlhttp6.send();
			$.mobile.loading('show');
		});

	$("#shengen").click(function() {

			contentAjax("http://mobildata.izto.org.tr/SchengenVisa.aspx?numberOfNews=20");
    });
	$("#onemlibilgiler").click(function() {
			contentAjax("http://mobildata.izto.org.tr/ImportantInfo.aspx?numberOfNews=20");

	});
	$("#yukumlulukler").click(function() {
			contentAjax("http://mobildata.izto.org.tr/VisaLiabilities.aspx?numberOfNews=20");

					});
	$("#vizeduyurulari").click(function() {
			contentAjax("http://mobildata.izto.org.tr/VisaAnnouncements.aspx?numberOfNews=20");

					});
	$("#vizeistemeyen").click(function() {
			contentAjax("http://mobildata.izto.org.tr/VisaNotRequiredCountries.aspx?numberOfNews=20");

					});

	$("#fuarkatilim").click(function() {
			contentAjax("http://mobildata.izto.org.tr/FairAttandenceGuide.aspx?numberOfNews=20");

					});

	$("#fuartesvik").click(function() {
			contentAjax("http://mobildata.izto.org.tr/FairPromotion.aspx?numberOfNews=20");

					});
	$("#fuarziyaret").click(function() {
			contentAjax("http://mobildata.izto.org.tr/FairVisiting.aspx?numberOfNews=20");

					});
	$("#fuarduyurular").click(function() {
			//contentAjax("http://mobildata.izto.org.tr/FairAnnouncement.aspx?numberOfNews=20");
		
		
		 $.mobile.loading('show');

			var xmlhttp8 = getXmlHttpObject();

			xmlhttp8.onreadystatechange = function() {

		    if (xmlhttp8.readyState == 4&& xmlhttp8.status == 200) {
			  $.mobile.loading('hide');
			  xmlParserFuarDuyurulariBaslik(xmlhttp8.responseText);
			  
			  
				$('#FuarPage').append(" <img src='img/izto_header.png' height=auto width=100% class='img2'  > ");
				$('#listviewFuar').children().remove('li');
				for ( var i = 0; i < FuarDuyuruSayisi; i++) {
					addFuarDuyurulari(ArrayFuarDuyurulariBaslik[i], i);
				}
				if ($('#listviewFuar').hasClass('ui-listview')) 
				{
				    $('#listviewFuar').listview('refresh');
				} else 
				{
					$('#listviewFuar').trigger('create');
				}
					$.mobile.changePage($("#FuarPage"), "none");
					
					
					
					$('#listviewFuar').on('click',' > li',function() {
						var Baslikindex = $(this).index();
						$.mobile.loading('show');
						var xmlhttp7 = getXmlHttpObject();
						xmlhttp7.onreadystatechange = function() {
			              if (xmlhttp7.readyState == 4&& xmlhttp7.status == 200) {
						  $.mobile.loading('hide');
						  var duyuruIcerik = xmlParserFuarDuyurularIcerik(xmlhttp7.responseText);
						  $('#HaberIcerik').html(" <img src='img/izto_header.png' height=auto width=100% class='img2'  > ");
						  $('#HaberIcerik').append("<div data-role='controlgroup' class='zoomTab' data-type='horizontal'><a data-role='button' id='plus2'> A + </a><a data-role='button' id='minus2'> A - </a></div>");
						  $('#HaberIcerik').append("<div class ='tarih'> <br><br>" + ArrayFuarDuyurulariBaslik[Baslikindex].substring(0,10) + "</div>");
					      $('#HaberIcerik').append("<div class='habercontent' align='justify'>"+duyuruIcerik+ "</div");
					      
					      var zoomState=0;
							 divId="HaberIcerik";
							   $("#plus2").click(function() {
								   
								    
									if(zoomState==0)
									{
									
									   $("#" + divId).css("font-size", "125%");
									   $(".haberbaslik").css("font-size", "125%");
						               zoomState++;
									 }
									else if(zoomState==1)
									{
									   $("#" + divId).css("font-size", "150%");
									   $(".haberbaslik").css("font-size", "150%");
									   zoomState++;
									 }
									else if(zoomState==2)
									{
									   $("#" + divId).css("font-size", "175%");
									   $(".haberbaslik").css("font-size", "175%");
									   zoomState++;
									 
									}
									else if(zoomState==3)
									{
									   $("#" + divId).css("font-size", "200%");
									   $(".haberbaslik").css("font-size", "200%");
									   zoomState++;
									 
									}
									else if(zoomState==4)
									{
									   $("#" + divId).css("font-size", "225%");
									   $(".haberbaslik").css("font-size", "225%");
									   zoomState++;
									 
									}
								});
							  
								$("#minus2").click(function() {
									if(zoomState==1)
									{
									 $("#" + divId).css("font-size", "100%");
									 $(".haberbaslik").css("font-size", "100%");
									 zoomState--;
									 
									}
									else if(zoomState==2)
									{
									 $("#" + divId).css("font-size", "125%");
									 $(".haberbaslik").css("font-size", "125%");
									 zoomState--;
									 
									}
									else if(zoomState==3)
									{
									 $("#" + divId).css("font-size", "150%");
									 $(".haberbaslik").css("font-size", "150%");
									 zoomState--;
									 
									}
									else if(zoomState==4)
									{
									 $("#" + divId).css("font-size", "175%");
									 $(".haberbaslik").css("font-size", "175%");
									 zoomState--;
									 
									}
									else if(zoomState==5)
									{
									 $("#" + divId).css("font-size", "200%");
									 $(".haberbaslik").css("font-size", "200%");
									 zoomState--;
									 
									}
								});
					  	  $('#HaberIcerik').trigger('create');	
						  $.mobile.changePage($("#HaberIcerik"),"none");
						  
						  $('.fuarlink').click(function() {url = $(this).attr("href");
							navigator.app.loadUrl(url, {
							openExternal : true
							});

						
							});
						  
						  
						  }
						 };
						 var url7 = "http://mobildata.izto.org.tr/FairAnnouncement.aspx?tabIndex="+ Baslikindex;
						 xmlhttp7.open("GET", url7,true);
						 xmlhttp7.send();
			         });
			  
			  }
			};
		     var url8 = "http://mobildata.izto.org.tr/FairAnnouncement.aspx?tabList=true";
			 xmlhttp8.open("GET", url8, true);
			 xmlhttp8.send();
		     });

					
	$("#fuararama").click(function() {
			contentAjax("http://mobildata.izto.org.tr/FairSearch.aspx?numberOfNews=20");

					});

	var xmlhttp2 = getXmlHttpObject();

	xmlhttp2.onreadystatechange = function() {

		if (xmlhttp2.readyState == 4 && xmlhttp2.status == 200) {
			// $.mobile.loading('hide');

			xmlParser(xmlhttp2.responseText, "duyuru", ArrayDuyuruBaslik,
					ArrayDuyuruIcerik, ArrayDuyuruResim,ArrayDuyuruDate, duyuruSayisi);

			for ( var i = 0; i < duyuruSayisi; i++) {
				addDuyuru(ArrayDuyuruBaslik[i], i);
			}

		}
	};

	var url2 = "http://mobildata.izto.org.tr/Announcements.aspx?numberOfNews=7";
	xmlhttp2.open("GET", url2, true);
	xmlhttp2.send();

	$('#listview1').on('click',' > li',function() {
						$('.panelresim').hide();
						var index = $(this).index();
						var control = $('#listview1').html();

						
						if (control.indexOf("duyuru") != -1) {
                            $('#HaberIcerik').html(" <img src='img/izto_header.png' height=auto width=100% class='img2'  > ");
							$('#HaberIcerik').append("	<div data-role='controlgroup' class='zoomTab' data-type='horizontal'><a data-role='button' class='plus'> A + </a><a data-role='button' class='minus'> A - </a></div>");
							$('#HaberIcerik').append("<div class ='tarih'> <br><br>" + ArrayDuyuruDate[index] + "</div>");
							$('#HaberIcerik').append("<div class ='haberbaslik'>" + ArrayDuyuruBaslik[index] + "</div>");
							$('#HaberIcerik').append("<div align='justify' class='habercontent'>"+ ArrayDuyuruIcerik[index]+ "</div");
							$('#HaberIcerik').trigger('create');	
							$.mobile.changePage($("#HaberIcerik"), "none");
						}
						if (control.indexOf("egitim") != -1) {

							$('#HaberIcerik').html(" <img src='img/izto_header.png' height=auto width=100% class='img2'  > ");
							$('#HaberIcerik').append("	<div data-role='controlgroup' class='zoomTab' data-type='horizontal'><a data-role='button' class='plus'> A + </a><a data-role='button' class='minus'> A - </a></div>");
							$('#HaberIcerik').append("<div align='justify' class='habercontent'>"+ ArrayEgitimIcerik[index]+ "</div");
							$('#HaberIcerik').trigger('create');
							$.mobile.changePage($("#HaberIcerik"), "none");
						}
						$('.doclinkDuyuru').click(function() {

							url = $(this).attr("href");
							navigator.app.loadUrl(url, {
								openExternal : true
							});

						

						});
					});

};
function contentGorev(siteurl) {

	var xmlhttp7 = getXmlHttpObject();

	xmlhttp7.onreadystatechange = function() {

		if (xmlhttp7.readyState == 4 && xmlhttp7.status == 200) {
			$.mobile.loading('hide');

			xmlParserGorevler(xmlhttp7.responseText);
		}
	};

	var url7 = siteurl;
	xmlhttp7.open("GET", url7, true);
	xmlhttp7.send();
	$.mobile.loading('show');

}
function contentAjax(siteurl) {
	var xmlhttp = getXmlHttpObject();

	xmlhttp.onreadystatechange = function() {

		if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
			$.mobile.loading('hide');
			var content = xmlParserContent(xmlhttp.responseText);
			$('#HaberIcerik').html(" <img src='img/izto_header.png' height=auto width=100% class='img2'  > ");
			$('#HaberIcerik').append("	<div data-role='controlgroup' class='zoomTab' data-type='horizontal'><a data-role='button' class='plus'> A + </a><a data-role='button' class='minus'> A - </a></div>");
			$('#HaberIcerik').append("<div align='justify' class='imghaber'>" + content+ "</div");
			$('#HaberIcerik').trigger('create');
			$.mobile.changePage($("#HaberIcerik"), "none");

			$(".doclink").click(function() {

				url = $(this).attr("href");
				navigator.app.loadUrl(url, {
					openExternal : true
				});

			});

		}
	};

	var url = siteurl;
	xmlhttp.open("GET", url, true);
	xmlhttp.send();
	$.mobile.loading('show');
}

function contentBaskan(siteurl) {
	var xmlhttp = getXmlHttpObject();

	xmlhttp.onreadystatechange = function() {

		if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
			$.mobile.loading('hide');
			var content = xmlParserContentBaskan(xmlhttp.responseText);
			$('#HaberIcerik').html(" <img src='img/izto_header.png' height=auto width=100% class='img2'  > ");
			$('#HaberIcerik').append("	<div data-role='controlgroup' class='zoomTab' data-type='horizontal'><a data-role='button' class='plus'> A + </a><a data-role='button' class='minus'> A - </a></div>");
			$('#HaberIcerik').append("<img src='http://www.izto.org.tr/portals/0/iztogorsel/baskanin-mesaji-22.jpg' height=auto width='90%' class='imghaber'>");
			$('#HaberIcerik').append("<div align='justify' class='imghaber'>" + content+ "</div");
			$('#HaberIcerik').trigger('create');
			$.mobile.changePage($("#HaberIcerik"), "none");

			$(".doclink").click(function() {

				url = $(this).attr("href");
				navigator.app.loadUrl(url, {
					openExternal : true
				});

			});

		}
	};

	var url = siteurl;
	xmlhttp.open("GET", url, true);
	xmlhttp.send();
	$.mobile.loading('show');
}

function xmlParserContentBaskan(data) {
	xml = data;

	var startURL = "http://www.izto.org";

	var haberTagStart = xml.indexOf("<haber>") + 7; // tag� almas�n diye +7
													// ekledim.
	var haberTagEnd = xml.indexOf("</haber>");
	var haber = xml.substring(haberTagStart, haberTagEnd);

	var contentTagStart = haber.indexOf("<Content>") + 9;
	var contentTagEnd = haber.indexOf("</Content>");
	var content = haber.substring(contentTagStart, contentTagEnd);
	
	var titleTagStart = haber.indexOf("<ModuleTitle>") + 13;
	var titleTagEnd = haber.indexOf("</ModuleTitle>");
	var title = haber.substring(titleTagStart, titleTagEnd);
	
	var tempContent = content;

	// TAM DEĞİL SORUN ÇÖZÜLECEK !!

	while (true) {
		var img = "";
		var imgTagStart = tempContent.indexOf("src=") + 4;

		if (imgTagStart == 3) {

			break;
		}

		if (imgTagStart != 3) // boşsa -1 dönüyor
		{
			tempContent = tempContent.substring(imgTagStart);
			var imgTagEnd = tempContent.indexOf("/>");
			img = tempContent.substring(0, imgTagEnd);
		
			var imgEski = img;

		}
		if (img.indexOf("http") == -1) {

			img = img.replace(/\"/g, "");

			img = "\"http://www.izto.org.tr" + img + "\"";
			
			content = content.replace(imgEski, img);

			

		}

	
	}

	var tempContent = content;
	// Imaegda yapılanların aynısı href etiketleri için yapılıyor,isimleri
	// değiştirmedim ama img=href diye düşün
	while (true) {
		var img = "";
		var imgTagStart = tempContent.indexOf("href=") + 5;

		if (imgTagStart == 4) {

			break;
		}

		if (imgTagStart != 4) // boşsa -1 dönüyor
		{
			tempContent = tempContent.substring(imgTagStart);
			var imgTagEnd = tempContent.indexOf("\">");
			img = tempContent.substring(0, imgTagEnd);
			
			var imgEski = img;
			
		}
		if (img.indexOf("Portals") < 5) // 2 aslında garanti olsun diye 5
										// verdim.
		{
			if (img.indexOf("Portals") == -1) {
				continue;
			}
			img = img.replace(/\"/g, "");

			// img="\"http://www.izto.org.tr" + img +"\"";
			img = "\"http://www.izto.org.tr" + img;
			// tempContent = tempContent.replace(imgEski,img);
			content = content.replace(imgEski, img);
		}

	
	}

	var linkTagStart = content.indexOf("<a href=\"") + 9;
	var linkTagEnd = content.indexOf("\">");
	var link = content.substring(linkTagStart, linkTagEnd);

	

	content = content.replace(/<a href/g,
			"<a onclick='return false' class=\"doclink\" href");
	
	content = content.replace(/target=_blank/g, "");
	//Printer imagelarını silmek için
    content = content.replace("<img src=\"http://www.izto.org.tr/images/action_print.gif alt=Print \"/>","");
    content = content.replace("<img alt=\"Print\" src=\"http://www.izto.org.tr/images/action_print.gif \"/>","");
    content = content.replace("<img src=\"/images/action_print.gif alt=Print \"/>","");
    content = content.replace("<div class=\"divPrint\" style=\"text-align: right; clear: both;\"><span class=\"PrintTitle\" style=\"float: left;\">","");
	title = "<h3><span class='demirtas'>" + title + "</span></h3>";
    content = title + content;

	return content;

}

function xmlParserContent(data) {
	xml = data;

	var startURL = "http://www.izto.org";

	var haberTagStart = xml.indexOf("<haber>") + 7; // tag� almas�n diye +7
													// ekledim.
	var haberTagEnd = xml.indexOf("</haber>");
	var haber = xml.substring(haberTagStart, haberTagEnd);

	var contentTagStart = haber.indexOf("<Content>") + 9;
	var contentTagEnd = haber.indexOf("</Content>");
	var content = haber.substring(contentTagStart, contentTagEnd);
	var tempContent = content;

	// TAM DEĞİL SORUN ÇÖZÜLECEK !!

	while (true) {
		var img = "";
		var imgTagStart = tempContent.indexOf("src=") + 4;

		if (imgTagStart == 3) {

			break;
		}

		if (imgTagStart != 3) // boşsa -1 dönüyor
		{
			tempContent = tempContent.substring(imgTagStart);
			var imgTagEnd = tempContent.indexOf("/>");
			img = tempContent.substring(0, imgTagEnd);
		
			var imgEski = img;

		}
		if (img.indexOf("http") == -1) {

			img = img.replace(/\"/g, "");

			img = "\"http://www.izto.org.tr" + img + "\"";
			
			content = content.replace(imgEski, img);

			

		}

	
	}

	var tempContent = content;
	// Imaegda yapılanların aynısı href etiketleri için yapılıyor,isimleri
	// değiştirmedim ama img=href diye düşün
	while (true) {
		var img = "";
		var imgTagStart = tempContent.indexOf("href=") + 5;

		if (imgTagStart == 4) {

			break;
		}

		if (imgTagStart != 4) // boşsa -1 dönüyor
		{
			tempContent = tempContent.substring(imgTagStart);
			var imgTagEnd = tempContent.indexOf("\">");
			img = tempContent.substring(0, imgTagEnd);
			
			var imgEski = img;
			
		}
		if (img.indexOf("Portals") < 5) // 2 aslında garanti olsun diye 5
										// verdim.
		{
			if (img.indexOf("Portals") == -1) {
				continue;
			}
			img = img.replace(/\"/g, "");

			// img="\"http://www.izto.org.tr" + img +"\"";
			img = "\"http://www.izto.org.tr" + img;
			// tempContent = tempContent.replace(imgEski,img);
			content = content.replace(imgEski, img);
		}

	
	}

	var linkTagStart = content.indexOf("<a href=\"") + 9;
	var linkTagEnd = content.indexOf("\">");
	var link = content.substring(linkTagStart, linkTagEnd);

	

	content = content.replace(/<a href/g,
			"<a onclick='return false' class=\"doclink\" href");
	
	content = content.replace(/target=_blank/g, "");
	//Printer imagelarını silmek için
    content = content.replace("<img src=\"http://www.izto.org.tr/images/action_print.gif alt=Print \"/>","");
    content = content.replace("<img alt=\"Print\" src=\"http://www.izto.org.tr/images/action_print.gif \"/>","");
    content = content.replace("<img src=\"/images/action_print.gif alt=Print \"/>","");
    content = content.replace("<div class=\"divPrint\" style=\"text-align: right; clear: both;\"><span class=\"PrintTitle\" style=\"float: left;\">","");
	

	return content;

}
function xmlParserKruvazor(data) {
	xml = data;
   
	var startURL = "http://www.izto.org";

	var haberTagStart = xml.indexOf("<haber>") + 7; // tag� almas�n diye +7
													// ekledim.
	var haberTagEnd = xml.indexOf("</haber>");
	var haber = xml.substring(haberTagStart, haberTagEnd);

	var contentTagStart = haber.indexOf("<Content>") + 9;
	var contentTagEnd = haber.indexOf("</Content>");
	var content = haber.substring(contentTagStart, contentTagEnd);
	var tempContent = content;

	// TAM DEĞİL SORUN ÇÖZÜLECEK !!

	while (true) {
		var img = "";
		var imgTagStart = tempContent.indexOf("src=") + 4;

		if (imgTagStart == 3) {

			break;
		}

		if (imgTagStart != 3) // boşsa -1 dönüyor
		{
			tempContent = tempContent.substring(imgTagStart);
			var imgTagEnd = tempContent.indexOf("/>");
			img = tempContent.substring(0, imgTagEnd);
			// alert(img);
			var imgEski = img;

			// img=img.replace("src=","editedsrc=");
		}
		if (img.indexOf("http") == -1) {

			img = img.replace(/\"/g, "");

			img = "\"http://www.izto.org.tr" + img + "\"";
			
			content = content.replace(imgEski, img);

		}


	}

	var tempContent = content;
	// Imaegda yapılanların aynısı href etiketleri için yapılıyor,isimleri
	// değiştirmedim ama img=href diye düşün
	while (true) {
		var img = "";
		var imgTagStart = tempContent.indexOf("href=") + 5;

		if (imgTagStart == 4) {

			break;
		}

		if (imgTagStart != 4) // boşsa -1 dönüyor
		{
			tempContent = tempContent.substring(imgTagStart);
			var imgTagEnd = tempContent.indexOf("\">");
			img = tempContent.substring(0, imgTagEnd);

			var imgEski = img;
			// alert(img.indexOf("Portals"));

			// img=img.replace("src=","editedsrc=");
		}
		if (img.indexOf("Portals") < 5) // 2 aslında garanti olsun diye 5
										// verdim.
		{
			if (img.indexOf("Portals") == -1) {
				continue;
			}
			img = img.replace(/\"/g, "");

			img = "\"http://www.izto.org.tr" + img + "\"";
		
			content = content.replace(imgEski, img);

		

		}

	
	}

	var linkTagStart = content.indexOf("<a href=\"") + 9;
	var linkTagEnd = content.indexOf("\">");
	var link = content.substring(linkTagStart, linkTagEnd);

	content = content.replace(/<a href/g,
			"<a onclick='return false' class=\"doclinkKruvazor\" href");
	
	content = content.replace(/target=_blank/g, "");



	return content;

}
function xmlParserEgitim(data) {
	xml = data;
	var i = 0;
	var ilk=0;
	// var startURL="http://www.izto.org";
	while (true) {
        if(ilk==0)
        {
        	ilk++;
        	xml = xml.replace("<haber>", "")
    		xml = xml.replace("</haber>", "")
    		continue;
        }
		var haberTagStart = xml.indexOf("<haber>") + 7; // tagı almasın diye +7
														// ekledim.
		if (haberTagStart == 6) {
			break;
		}
		var haberTagEnd = xml.indexOf("</haber>");
		var haber = xml.substring(haberTagStart, haberTagEnd);

		var moduleTitleTagStart = haber.indexOf("<ModuleTitle>") + 13;
		var moduleTitleTagEnd = haber.indexOf("</ModuleTitle>");
		var moduleTitle = haber.substring(moduleTitleTagStart,
				moduleTitleTagEnd);

		ArrayEgitimBaslik[i] = moduleTitle;

		var contentTagStart = haber.indexOf("<Content>") + 9;
		var contentTagEnd = haber.indexOf("</Content>");
		var content = haber.substring(contentTagStart, contentTagEnd);

		content = content.replace(/<a href/g,
				"<a onclick='return false' class=\"doclinkDuyuru\" href");
		ArrayEgitimIcerik[i] = content;

		xml = xml.replace("<haber>", "")
		xml = xml.replace("</haber>", "")
		i++;
	}

	egitimSayisi = i;

}

function xmlParser(data, divID, ArrayBaslik, ArrayIcerik, ArrayResim,ArrayDate,veriMiktari) {
	xml = data;
	var i=0;
	while(true) {
		
        if(i==veriMiktari)
        	break;
		var haberTagStart = xml.indexOf("<haber>") + 7; // tag� almas�n diye +7
														// ekledim.
		var haberTagEnd = xml.indexOf("</haber>");
		var haber = xml.substring(haberTagStart, haberTagEnd);
		
		var dateTagStart = haber.indexOf("<DatePublished>")+15;
		var dateTagEnd = haber.indexOf("</DatePublished>");
		var date = haber.substring(dateTagStart, dateTagEnd).trim();
		date = date.substring(0,10);
		

		var titleTagStart = haber.indexOf("<Title>");
		var titleTagEnd = haber.indexOf("</Title>");
		var title = haber.substring(titleTagStart, titleTagEnd);
		title = title.replace("<Title>", "");

		var bodyTagStart = haber.indexOf("<Body>") + 6;
		var bodyTagEnd = haber.indexOf("</Body>");
		var body = haber.substring(bodyTagStart, bodyTagEnd); // +5 sorun
																// ��kartabilir

		body = body.replace(/<a href/g,"<a onclick='return false' class=\"doclinkDuyuru\" href");
		

		var imgTagStart = body.indexOf("src=")+4;
		var imgTagEnd = body.indexOf("/>");
		var img = body.substring(imgTagStart, imgTagEnd);

		icerik = body.substring(imgTagEnd + 2);
	
		img = img.replace("src=", "");
		
		if (img.indexOf("http") == -1) {

			img = img.replace(/\"/g, "");
			img = "\"http://www.izto.org.tr" + img + "\"";
			
		}
	
		if (img.length < 28) {

		
			if (divID == "haber")
			{
			
			 xml = xml.replace("<haber>", "");
			 xml = xml.replace("</haber>", "");
			 
			 continue;
			}
			

		}
	
		ArrayBaslik[i] = title;
		
		
		ArrayResim[i] = "<img src=" + img + "class='imghaber2'" + "/>";
		ArrayDate[i] = date;
		
	


		if (divID == "haber") {
			var slider = $('#mainFlexSlider').data('flexslider');
			$('#slide1').append(
					
					"<li id='" + divID + i + "'>" + "<img " + " src=" + img
							+ "/>" + "<div align='center'><p>" + title
							+ "</p></div>" + "</li>");

		}
		tempContent = icerik;
		while (true) {
			var img = "";
			var imgTagStart = tempContent.indexOf("src=") + 4;

			if (imgTagStart == 3) {

				break;
			}

			if (imgTagStart != 3) 
			{
				tempContent = tempContent.substring(imgTagStart);
				var imgTagEnd = tempContent.indexOf("/>");
				img = tempContent.substring(0, imgTagEnd);
				
				var imgEski = img;

			
			}
			if (img.indexOf("http") == -1) {

				img = img.replace(/\"/g, "");

				img = "\"http://www.izto.org.tr" + img + "\"";
				
				
				icerik = icerik.replace(imgEski, img);

			}

		
			
		}
		
		ArrayIcerik[i] = icerik;
		xml = xml.replace("<haber>", "");
		xml = xml.replace("</haber>", "");
		i++;
	}
}
function xmlParserMeslekGruplariBaslik(data) {
	xml = data;
	var i = 0;
	while (true) {
        
		var haberTagStart = xml.indexOf("<TabName>") + 9; // tagı almasın diye
															// +9 ekledim.
		if (haberTagStart == 8) {
			break;
		}

		var haberTagEnd = xml.indexOf("</TabName>");
		var haber = xml.substring(haberTagStart, haberTagEnd);
     
		ArrayMeslekBaslik[i] = haber;

		xml = xml.replace("<TabName>", "");
		xml = xml.replace("</TabName>", "");
		i++;
	}
	MeslekGrupSayisi = i;

}

function xmlParserTarihceBaslik(data) {
	xml = data;
	var x = 0;
	$('#listviewTarihce').children().remove('li');

	$('#TarihcePage').append(" <img src='img/izto_header.png' height=auto width=100% class='img2'  > ");

	addTarihce("I. Kuruluş Dönemi", 0);
	addTarihce("II. İkinci Meşrutiyet Dönemi", 1);
	addTarihce("III. Cumhuriyet'in İlk Yılları", 2);
	addTarihce("IV. 1970'li Yıllar", 3);
	addTarihce("V. 1980'li Yılların İlk Yarısı", 4);
	addTarihce("VI. 1990'lı Yılları", 5);
	addTarihce("VII. Küreselleşme Süreci", 6);

	if ($('#listviewTarihce').hasClass('ui-listview')) {
		$('#listviewTarihce').listview('refresh');
	} else {
		$('#listviewTarihce').trigger('create');
	}
	$.mobile.changePage($("#TarihcePage"), "none");

	$('#listviewTarihce').on('click',' > li',function() {
		var Baslikindex = $(this).index() + 1;
		$.mobile.loading('show');
		var xmlhttp8 = getXmlHttpObject();
		xmlhttp8.onreadystatechange = function() {
		if (xmlhttp8.readyState == 4 && xmlhttp8.status == 200) {
			$.mobile.loading('hide');
			var tarih = xmlParserMeslekGruplari(xmlhttp8.responseText);
			$('#HaberIcerik').html(" <img src='img/izto_header.png' height=auto width=100% class='img2'  > ");
			$('#HaberIcerik').append("	<div data-role='controlgroup' class='zoomTab' data-type='horizontal'><a data-role='button' id='plus1'> A + </a><a data-role='button' id='minus1'> A - </a></div>");
			$('#HaberIcerik').append("<div align='justify' class='imghaber>"+ tarih + "</div");
			 var zoomState=0;
			 divId="HaberIcerik";
			   $("#plus1").click(function() {
				   
				    
					if(zoomState==0)
					{
					
					   $("#" + divId).css("font-size", "125%");
					   $(".haberbaslik").css("font-size", "125%");
		               zoomState++;
					 }
					else if(zoomState==1)
					{
					   $("#" + divId).css("font-size", "150%");
					   $(".haberbaslik").css("font-size", "150%");
					   zoomState++;
					 }
					else if(zoomState==2)
					{
					   $("#" + divId).css("font-size", "175%");
					   $(".haberbaslik").css("font-size", "175%");
					   zoomState++;
					 
					}
					else if(zoomState==3)
					{
					   $("#" + divId).css("font-size", "200%");
					   $(".haberbaslik").css("font-size", "200%");
					   zoomState++;
					 
					}
					else if(zoomState==4)
					{
					   $("#" + divId).css("font-size", "225%");
					   $(".haberbaslik").css("font-size", "225%");
					   zoomState++;
					 
					}
				});
			  
				$("#minus1").click(function() {
					if(zoomState==1)
					{
					 $("#" + divId).css("font-size", "100%");
					 $(".haberbaslik").css("font-size", "100%");
					 zoomState--;
					 
					}
					else if(zoomState==2)
					{
					 $("#" + divId).css("font-size", "125%");
					 $(".haberbaslik").css("font-size", "125%");
					 zoomState--;
					 
					}
					else if(zoomState==3)
					{
					 $("#" + divId).css("font-size", "150%");
					 $(".haberbaslik").css("font-size", "150%");
					 zoomState--;
					 
					}
					else if(zoomState==4)
					{
					 $("#" + divId).css("font-size", "175%");
					 $(".haberbaslik").css("font-size", "175%");
					 zoomState--;
					 
					}
					else if(zoomState==5)
					{
					 $("#" + divId).css("font-size", "200%");
					 $(".haberbaslik").css("font-size", "200%");
					 zoomState--;
					 
					}
				});
			$('#HaberIcerik').trigger('create');
			$.mobile.changePage($("#HaberIcerik"), "none");
		}
	};

	var url8 = "http://mobildata.izto.org.tr/History.aspx?index="+ Baslikindex;
	xmlhttp8.open("GET", url8, true);
	xmlhttp8.send();
	});

}
function xmlParserTescil(data) {
	xml = data;
	var x = 0;
	$('#TescilPage').append(" <img src='img/izto_header.png' height=auto width=100% class='img2'  > ");
	$('#listviewTescil').children().remove('li');
	while (true) {

		var titleTagStart = xml.indexOf("<TabName>") + 9;
		if (titleTagStart == 8) {
			break;
		}
		var titleTagEnd = xml.indexOf("</TabName>");
		var title = xml.substring(titleTagStart, titleTagEnd);

		xml = xml.replace("<TabName>", "")
		xml = xml.replace("</TabName>", "")

	

		addTescil(title, x);

		x++;
	}

	if ($('#listviewTescil').hasClass('ui-listview')) {
		$('#listviewTescil').listview('refresh');
	} else {
		$('#listviewTescil').trigger('create');
	}
	$.mobile.changePage($("#TescilPage"), "none");

	$('#listviewTescil').on('click',' > li',function() {
		var Baslikindex = $(this).index() + 1;
		$.mobile.loading('show');
		var xmlhttp9 = getXmlHttpObject();
		xmlhttp9.onreadystatechange = function() {
		if (xmlhttp9.readyState == 4&& xmlhttp9.status == 200) {
			$.mobile.loading('hide');
			var tescil = xmlParserMeslekGruplari(xmlhttp9.responseText);
			$('#HaberIcerik').html(" <img src='img/izto_header.png' height=auto width=100% class='img2'  > ");
			$('#HaberIcerik').append("	<div data-role='controlgroup' class='zoomTab' data-type='horizontal'><a data-role='button' id='plus3'> A + </a><a data-role='button' id='minus3'> A - </a></div>");
			$('#HaberIcerik').append("<div align='justify'>"+ tescil + "</div");
			 var zoomState=0;
			 divId="HaberIcerik";
			   $("#plus3").click(function() {
				   
				    
					if(zoomState==0)
					{
					
					   $("#" + divId).css("font-size", "125%");
					   $(".haberbaslik").css("font-size", "125%");
		               zoomState++;
					 }
					else if(zoomState==1)
					{
					   $("#" + divId).css("font-size", "150%");
					   $(".haberbaslik").css("font-size", "150%");
					   zoomState++;
					 }
					else if(zoomState==2)
					{
					   $("#" + divId).css("font-size", "175%");
					   $(".haberbaslik").css("font-size", "175%");
					   zoomState++;
					 
					}
					else if(zoomState==3)
					{
					   $("#" + divId).css("font-size", "200%");
					   $(".haberbaslik").css("font-size", "200%");
					   zoomState++;
					 
					}
					else if(zoomState==4)
					{
					   $("#" + divId).css("font-size", "225%");
					   $(".haberbaslik").css("font-size", "225%");
					   zoomState++;
					 
					}
				});
			  
				$("#minus3").click(function() {
					if(zoomState==1)
					{
					 $("#" + divId).css("font-size", "100%");
					 $(".haberbaslik").css("font-size", "100%");
					 zoomState--;
					 
					}
					else if(zoomState==2)
					{
					 $("#" + divId).css("font-size", "125%");
					 $(".haberbaslik").css("font-size", "125%");
					 zoomState--;
					 
					}
					else if(zoomState==3)
					{
					 $("#" + divId).css("font-size", "150%");
					 $(".haberbaslik").css("font-size", "150%");
					 zoomState--;
					 
					}
					else if(zoomState==4)
					{
					 $("#" + divId).css("font-size", "175%");
					 $(".haberbaslik").css("font-size", "175%");
					 zoomState--;
					 
					}
					else if(zoomState==5)
					{
					 $("#" + divId).css("font-size", "200%");
					 $(".haberbaslik").css("font-size", "200%");
					 zoomState--;
					 
					}
				});
			$('#HaberIcerik').trigger('create');
			$.mobile.changePage($("#HaberIcerik"), "none");
		}
			$('.tescillink').click(function() {
			url = $(this).attr("href");
			navigator.app.loadUrl(url, {
			openExternal : true
			});
		});
		};	var url9 = "http://mobildata.izto.org.tr/RequestedDocuments.aspx?tabindex="+ Baslikindex;
			xmlhttp9.open("GET", url9, true);
			xmlhttp9.send();
        });

}
function xmlParserMeslekGruplari(data) {
	xml = data;

	var haberTagStart = xml.indexOf("<haber>") + 7; // tagı almasın diye +7
													// ekledim.

	var haberTagEnd = xml.indexOf("</haber>");
	var haber = xml.substring(haberTagStart, haberTagEnd);

	var titleTagStart = haber.indexOf("<TabName>") + 9;
	var titleTagEnd = haber.indexOf("</TabName>");
	var title = haber.substring(titleTagStart, titleTagEnd);

	var bodyTagStart = haber.indexOf("<Content>") + 9;
	var bodyTagEnd = haber.indexOf("</Content>");
	var body = haber.substring(bodyTagStart, bodyTagEnd); // +5 sorun
															// ��kartabilir
    
	tempContent = body;
	while (true) {
		var img = "";
		var imgTagStart = tempContent.indexOf("src=") + 4;

		if (imgTagStart == 3) {

			break;
		}

		if (imgTagStart != 3) // boşsa -1 dönüyor
		{
			tempContent = tempContent.substring(imgTagStart);
			var imgTagEnd = tempContent.indexOf("/>");
			img = tempContent.substring(0, imgTagEnd);
			// alert(img);
			var imgEski = img;

			// img=img.replace("src=","editedsrc=");
		}
		if (img.indexOf("http") == -1) {

			img = img.replace(/\"/g, "");

			img = "\"http://www.izto.org.tr" + img + "\"";
			// tempContent = tempContent.replace(imgEski,img);
			body = body.replace(imgEski, img);

			// img=img.replace(" ","");

		}

		// content = content.replace("<Content>","");
		// var tempcontent = content;
	}

	var tempContent = body;
	// Imaegda yapılanların aynısı href etiketleri için yapılıyor,isimleri
	// değiştirmedim ama img=href diye düşün
//	while (true) {
//		var img = "";
//		var imgTagStart = tempContent.indexOf("href=") + 5;
//
//		if (imgTagStart == 4) {
//
//			break;
//		}
//
//		if (imgTagStart != 4) // boşsa -1 dönüyor
//		{
//			tempContent = tempContent.substring(imgTagStart);
//			var imgTagEnd = tempContent.indexOf("\">");
//			img = tempContent.substring(0, imgTagEnd);
//			
//			var imgEski = img;
//			// alert(img.indexOf("Portals"));
//            
//			// img=img.replace("src=","editedsrc=");
//		}
//		if (img.indexOf("Portals") < 5) // 2 aslında garanti olsun diye 5
//										// verdim.
//		{
//			if (img.indexOf("Portals") == -1) {
//				alert("Girdim");
//				continue;
//			}
//			img = img.replace(/\"/g, "");
//
//			// img="\"http://www.izto.org.tr" + img +"\"";
//			img = "\"http://www.izto.org.tr" + img;
//			// tempContent = tempContent.replace(imgEski,img);
//			
//			body = body.replace(imgEski, img);
//
//			// img=img.replace(" ","");
//
//		}
//
//	
//		
//	
//	}
	
	 body=body.replace(/\/Portals/g,"http://www.izto.org.tr/Portals" );
	body = body.replace(/<a href/g,
	"<a onclick='return false' class=\"tescillink\" href");

body = body.replace(/target=_blank/g, "");
body = body.replace(/target=\"_blank\"/g, "");

body = body.replace("<img src=\"http://www.izto.org.tr/images/action_print.gif alt=Print \"/>","");
body = body.replace("<img alt=\"Print\" src=\"http://www.izto.org.tr/images/action_print.gif \"/>","");
body = body.replace("<img src=\"/images/action_print.gif alt=Print \"/>","");
body = body.replace("<div class=\"divPrint\" style=\"text-align: right; clear: both;\"><span class=\"PrintTitle\" style=\"float: left;\">","");


	
	return body;

}

function addMeslek(text, idNumber) {

	$('#listviewMeslek').append($('<li/>', { // here appending `<li>`
		'data-theme' : 'c'
	}).append($('<a/>', { // here appending `<a>` into `<li>`
		// 'href' : link,
		'data-transition' : 'slide',
		'text' : text

	})));

}
function addKomite(text, idNumber) {

	$('#listviewKomite').append($('<li/>', { // here appending `<li>`
		'data-theme' : 'c'
	}).append($('<a/>', { // here appending `<a>` into `<li>`
		// 'href' : link,
		'data-transition' : 'slide',
		'text' : text

	})));

}
function addTarihce(text, idNumber) {

	$('#listviewTarihce').append($('<li/>', { // here appending `<li>`
		'data-theme' : 'c'
	}).append($('<a/>', { // here appending `<a>` into `<li>`
		// 'href' : link,
		'data-transition' : 'slide',
		'text' : text

	})));

}
function addTescil(text, idNumber) {

	$('#listviewTescil').append($('<li/>', { // here appending `<li>`
		'data-theme' : 'c'
	}).append($('<a/>', { // here appending `<a>` into `<li>`
		// 'href' : link,
		'data-transition' : 'slide',
		'text' : text

	})));

}
function addFuarDuyurulari(text, idNumber) {

	$('#listviewFuar').append($('<li/>', { // here appending `<li>`
		'data-theme' : 'c'
	}).append($('<a/>', { // here appending `<a>` into `<li>`
		// 'href' : link,
		'data-transition' : 'slide',
		'text' : text

	})));

}
function addDuyuru(text, idNumber) {

	$('#listview1').append($('<li id=duyuru' + idNumber + '/>', { // here
																	// appending
																	// `<li>`
		'data-theme' : 'c'
	}).append($('<a/>', { // here appending `<a>` into `<li>`
		// 'href' : link,
		'data-transition' : 'slide',
		'text' : text

	})));
	$('#listview1').listview('refresh');
}

function addEgitim(text, idNumber) {

	$('#listview1').append($('<li id=egitim' + idNumber + '/>', { // here
																	// appending
																	// `<li>`
		'data-theme' : 'c'
	}).append($('<a/>', { // here appending `<a>` into `<li>`
		// 'href' : link,
		'data-transition' : 'slide',
		'text' : text

	})));
	$('#listview1').listview('refresh');
}

function addKruvazor(link, text) {

	$('#listview1').append($('<li/>', { // here appending `<li>`
		'data-theme' : 'c'
	}).append($('<a/>', { // here appending `<a>` into `<li>`
		'href' : link,
		'data-transition' : 'slide',
		'text' : text

	})));
	$('#listview1').listview('refresh');

}

function getXmlHttpObject() {
	var xmlhttp;

	if (window.XMLHttpRequest)
		xmlhttp = new XMLHttpRequest();
	else
		xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");

	return xmlhttp;
}
// Kruvaziyer Turizmi Kaymasın Diye
function TablariAyarla() {
	var xmlhttp;

	if (window.XMLHttpRequest)
		xmlhttp = new XMLHttpRequest();
	else
		xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");

	return xmlhttp;
}
function init() {

	document.addEventListener("deviceready", onDeviceReady, false);

}

function xmlParserTakvim(data) {
	xml = data;
	var i=0;
	while (true) {
		


		var haberTagStart = xml.indexOf("<haber>") + 7; // tag� almas�n diye +7
														// ekledim.
		

		if (haberTagStart == 6) // Bulamama indeksi -1
		{
			break;
		}
		var haberTagEnd = xml.indexOf("</haber>");
		var haber = xml.substring(haberTagStart, haberTagEnd);

		var eventNameTagStart = haber.indexOf("<eventName>") + 11;
		var eventNameTagEnd = haber.indexOf("</eventName>");
		var eventName = haber.substring(eventNameTagStart, eventNameTagEnd);

		eventName = eventName.trim();

		ArrayEventBaslik[i] = eventName;

		var descriptionTagStart = haber.indexOf("<description>") + 13;
		var descriptionTagEnd = haber.indexOf("</description>");
		var description = haber.substring(descriptionTagStart,
				descriptionTagEnd);
		description = description.trim();

		ArrayEventIcerik[i] = description;
		// alert(ArrayEventIcerik[i]);

		var eventStartDateTagStart = haber.indexOf("<eventStartDate>") + 16;
		var eventStartDateTagEnd = haber.indexOf("</eventStartDate>");
		var eventStartDate = haber.substring(eventStartDateTagStart,
				eventStartDateTagEnd);
		eventStartDate = eventStartDate.trim();

		var parseString = eventStartDate.split(".");

		// alert(parseString[2]);
		ArrayEventSaatStart[i] = parseString[2].substring(4, 10);
		// alert(ArrayEventSaat[i]);
		parseString[2] = parseString[2].substring(0, 4);

		ArrayEventStartDate[i] = parseString[2] + "-" + parseString[1] + "-"
				+ parseString[0];

		// alert("."+ArrayEventStartDate[i]+".");

		var eventEndDateTagStart = haber.indexOf("<eventEndDate>") + 14;
		var eventEndDateTagEnd = haber.indexOf("</eventEndDate>");
		var eventEndDate = haber.substring(eventEndDateTagStart,
				eventEndDateTagEnd);
		eventEndDate = eventEndDate.trim();

		parseString = eventEndDate.split(".");
		ArrayEventSaatEnd[i] = parseString[2].substring(4, 10);

		parseString[2] = parseString[2].substring(0, 4);

		ArrayEventEndDate[i] = parseString[2] + "-" + parseString[1] + "-"
				+ parseString[0];

		// alert("."+ArrayEventEndDate[i]+".");

		TakvimEvent[i] = {
			title : "\n\n\n\n",
			baslik : ArrayEventBaslik[i],
			start : ArrayEventStartDate[i],
			end : ArrayEventEndDate[i],
			desc : ArrayEventIcerik[i],
			saatStart : ArrayEventSaatStart[i],
			saatEnd : ArrayEventSaatEnd[i],
			tarihStart : ArrayEventStartDate[i]
		}

		xml = xml.replace("<haber>", "")
		xml = xml.replace("</haber>", "")
		i++;
	}
	eventSayisi=i;

	// var linkTagStart = content.indexOf("<a href=");
	// var linkTagEnd = content.indexOf("target=");
	// var link = content.substring(linkTagStart+8,linkTagEnd);
	// while(link.length>0)
	// {
	// alert(link);
	// tempcontent = tempcontent.replace("<a href=","");
	// tempcontent = tempcontent.replace("target=","");
	// linkTagStart = tempcontent.indexOf("<a href=");
	// linkTagEnd = tempcontent.indexOf("target=");
	// link = tempcontent.substring(linkTagStart+8,linkTagEnd);
	//		
	//		
	// }

}
function xmlParserGorevler(data) {
	xml = data;
	var isKomite=0;
	$('#GorevPage')
			.html(
					" <img src='img/izto_header.png' height=auto width=100% class='img2'  > ");
	while (true) {
		var haberTagStart = xml.indexOf("<haber>") + 7; // tagı almasın diye +7
														// ekledim.
		if (haberTagStart == 6) // Bulamama indeksi -1
		{
			break;
		}
		var haberTagEnd = xml.indexOf("</haber>");
		var haber = xml.substring(haberTagStart, haberTagEnd);

		var FotoTagStart = haber.indexOf("<Foto>") + 6;
		var FotoTagEnd = haber.indexOf("</Foto>");
		var Foto = haber.substring(FotoTagStart, FotoTagEnd);

		var GorevAdiTagStart = haber.indexOf("<GorevAdi>") + 10;
		var GorevAdiTagEnd = haber.indexOf("</GorevAdi>");
		var GorevAdi = haber.substring(GorevAdiTagStart, GorevAdiTagEnd);

		var AdiTagStart = haber.indexOf("<Adi>") + 5;
		var AdiTagEnd = haber.indexOf("</Adi>");
		var Adi = haber.substring(AdiTagStart, AdiTagEnd);

		var SoyadiTagStart = haber.indexOf("<Soyadi>") + 8;
		var SoyadiTagEnd = haber.indexOf("</Soyadi>");
		var Soyadi = haber.substring(SoyadiTagStart, SoyadiTagEnd);

		var AdresTagStart = haber.indexOf("<Adres>") + 7;
		var AdresTagEnd = haber.indexOf("</Adres>");
		var Adres = haber.substring(AdresTagStart, AdresTagEnd);

		var TelefonTagStart = haber.indexOf("<Telefon>") + 9;
		var TelefonTagEnd = haber.indexOf("</Telefon>");
		var Telefon = haber.substring(TelefonTagStart, TelefonTagEnd);

		var FaksTagStart = haber.indexOf("<Faks>") + 6;
		var FaksTagEnd = haber.indexOf("</Faks>");
		var Faks = haber.substring(FaksTagStart, FaksTagEnd);

		var EmailTagStart = haber.indexOf("<Email>") + 7;
		var EmailTagEnd = haber.indexOf("</Email>");
		var Email = haber.substring(EmailTagStart, EmailTagEnd);
		
		
		var KomiteTagStart = haber.indexOf("<KomiteNo>") + 10;
		var KomiteTagEnd = haber.indexOf("</KomiteNo>");
		var Komite = haber.substring(KomiteTagStart, KomiteTagEnd);
		
		//Selahattin Altun için özel kod ( kaymaması için)
		
		
		
		if(KomiteTagStart!=9)
		{
			isKomite=1;
		}
		else
		{
			isKomite=0;
		}

		$('#GorevPage')
				.append("<div class='gorevHeader'>" + GorevAdi + "</div");
		$('#GorevPage').append(
				"<div class='gorevFoto'>" + "<img src='" + Foto + "'/>"
						+ "</div");
		$('#GorevPage').append(
				"<div class='gorevAdSoyad'>" + Adi + " " + Soyadi + "<br><br>"
						+ "</div>");
		if(isKomite==0)
		{
		$('#GorevPage').append(
				"<div class='gorevIcerik'>" + "Adres&nbsp;&nbsp;&nbsp;&nbsp;: "
						+ Adres + "<br>" + "Telefon&nbsp;:" + Telefon + "<br>"
						+ "Faks&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:" + Faks
						+ "<br>" + "Email&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:"
						+ Email + "<br>" + "</div");
		}
		else
		{
			$('#GorevPage').append(
					"<div class='gorevIcerik'>" + "Adres&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;: "
							+ Adres + "<br>" + "Telefon&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:" + Telefon + "<br>"
							+ "Faks&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:" + Faks
							+ "<br>" + "Email&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:"
							+ Email + "<br>" + 
	                       "Komite No&nbsp;:" + Komite + "</div");
		}
		// $('#GorevPage').append("<div class='gorevIcerik'>" + "Adres : " +
		// Adres + "</div");
		// $('#GorevPage').append("<div class='gorevIcerik'>" + "Telefon :" +
		// Telefon + "<br>" + "</div");
		// $('#GorevPage').append("<div class='gorevIcerik'>" + "Faks :" + Faks
		// + "<br>" + "</div");
		// $('#GorevPage').append("<div class='gorevIcerik'>" + "Email :" +
		// Email + "<br>" + "</div");

		xml = xml.replace("<haber>", "")
		xml = xml.replace("</haber>", "")
	}
	$.mobile.changePage($("#GorevPage"), "none");

}

function xmlParserFuarDuyurulariBaslik(data) {
	xml = data;
	var i = 0;
	while (true) {
        
		var haberTagStart = xml.indexOf("<haber>") + 7; // tagı almasın diye
															// +7 ekledim.
		if (haberTagStart == 6) {
			break;
		}

		var haberTagEnd = xml.indexOf("</haber>");
		var haber = xml.substring(haberTagStart, haberTagEnd);
		
		
		var titleTagStart = haber.indexOf("<Title>")+7;
		var titleTagEnd = haber.indexOf("</Title>");
		var title =haber.substring(titleTagStart, titleTagEnd);
		
		var dateTagStart =haber.indexOf("<DatePublished>") + 15;
		
		var dateTagEnd = haber.indexOf("</DatePublished>");
		var datePublish = haber.substring(dateTagStart, dateTagEnd);
		//alert(title);
		//alert(datePublish);
		datePublish = datePublish.trim();
		datePublish = datePublish.substring(0,10);
		ArrayFuarDuyurulariBaslik[i] = datePublish + " - "+ title;
        
		xml = xml.replace("<haber>", "");
		xml = xml.replace("</haber>", "");
		i++;
	}
	FuarDuyuruSayisi= i;

}

function xmlParserFuarDuyurularIcerik(data) {
	xml = data;
	var i = 0;
	while (true) {
        
		var haberTagStart = xml.indexOf("<haber>") + 7; // tagı almasın diye
															// +7 ekledim.
		if (haberTagStart == 6) {
			break;
		}

		var haberTagEnd = xml.indexOf("</haber>");
		var haber = xml.substring(haberTagStart, haberTagEnd);
		
		
		var bodyTagStart = haber.indexOf("<Body>")+6;
		var bodyTagEnd = haber.indexOf("</Body>");
		var body =haber.substring(bodyTagStart, bodyTagEnd);
		
		body = body.replace(/<a href/g,"<a onclick='return false' class=\"fuarlink\" href");

		
		xml = xml.replace("<haber>", "");
		xml = xml.replace("</haber>", "");
		
	}
	
   return body;
}
function alertDismissed() {
	  navigator.app.exitApp();
   
}
function alertDismissed2() {
	 return;
 
}
function onNotificationGCM(e) {
	
  //  $("#app-status-ul").append('<li>EVENT -> RECEIVED:' + e.event + '</li>');

    switch( e.event )
    {
        case 'registered':
        if ( e.regid.length > 0 )
        {
         //   $("#app-status-ul").append('<li>REGISTERED -> REGID:' + e.regid + "</li>");
            // Your GCM push server needs to know the regID before it can push to this device
            // here is where you might want to send it the regID for later use.
            console.log("regID = " + e.regid);
           
        
        		
        	     
        	var dev_id = device.uuid;
        	
      	    var data = "code=" + e.regid + "&dev_id=" + dev_id;

			$.ajax({
				type : "POST",
				url : "http://izto.deytek.com.tr/android_insert.php",
				data : data,
				crossDomain : true,
				success : function(result) {
					//	result = eval("(" + result + ")");
					
		           
				},
				error : function(result) {
					

					
				}
			});
        	
           
        }
        break;

        case 'message':
            // if this flag is set, this notification happened while we were in the foreground.
            // you might want to play a sound to get the user's attention, throw up a dialog, etc.
            if (e.foreground)
            {
            //    $("#app-status-ul").append('<li>--INLINE NOTIFICATION--' + '</li>');

                // if the notification contains a soundname, play it.
                var my_media = new Media("/android_asset/www/"+e.soundname);
                my_media.play();
            }
            else
            {   // otherwise we were launched because the user touched a notification in the notification tray.
                if (e.coldstart)
                	{
                	
                	}
             //       $("#app-status-ul").append('<li>--COLDSTART NOTIFICATION--' + '</li>');
                else
                	{
                	
                	}
            //    $("#app-status-ul").append('<li>--BACKGROUND NOTIFICATION--' + '</li>');
            }
            
        	navigator.notification.alert(
    			    e.payload.title,  // message
    			    alertDismissed2,         // callback
    			    e.payload.message,            // title
    			    'Tamam'                  // buttonName
    			);
           // alert(e.payload.title);
           // alert(e.payload.message);
          
         //   $("#app-status-ul").append('<li>MESSAGE -> MSG: ' + e.payload.message + '</li>');
         //   $("#app-status-ul").append('<li>MESSAGE -> MSGCNT: ' + e.payload.msgcnt + '</li>');
        break;

        case 'error':
        	
         //   $("#app-status-ul").append('<li>ERROR -> MSG:' + e.msg + '</li>');
        break;

        default:
        //    $("#app-status-ul").append('<li>EVENT -> Unknown, an event was received and we do not know what it is</li>');
        break;
    }
}



setTimeout('window.location.href="app.html"', 5000) /* 5 seconds */



var util = require('util');
var https = require('https');
var querystring = require('querystring');
var emitter = require('events').EventEmitter;
var retry = require('retry');

function GCM(apiKey) {
    if (apiKey) {
        this.apiKey = apiKey;
    } else {
        throw Error('No apiKey is given.');
    }
    this.gcmOptions = {
        host: 'android.googleapis.com',
        port: 443,
        path: '/gcm/send',
        method: 'POST',
        headers: {}
    };
}

util.inherits(GCM, emitter);

exports.GCM = GCM;

GCM.prototype.send = function(packet, cb) {
    var self = this;
    if (cb) this.once('sent', cb);

    var operation = retry.operation();

    operation.attempt(function(currentAttempt) {
        var postData = querystring.stringify(packet);
        var headers = {
            'Host': self.gcmOptions.host,
            'Authorization': 'key=' + self.apiKey,
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
            'Content-length': postData.length
        };
        self.gcmOptions.headers = headers;
        if (self.keepAlive)
            headers.Connection = 'keep-alive';

        var request = https.request(self.gcmOptions, function(res) {
            var data = '';

            if (res.statusCode == 503) {
                // If the server is temporary unavailable, the C2DM spec requires that we implement exponential backoff
                // and respect any Retry-After header
                if (res.headers['retry-after']) {
                    var retrySeconds = res.headers['retry-after'] * 1; // force number
                    if (isNaN(retrySeconds)) {
                        // The Retry-After header is a HTTP-date, try to parse it
                        retrySeconds = new Date(res.headers['retry-after']).getTime() - new Date().getTime();
                    }
                    if (!isNaN(retrySeconds) && retrySeconds > 0) {
                        operation._timeouts['minTimeout'] = retrySeconds;
                    }
                }
                if (!operation.retry('TemporaryUnavailable')) {
                    self.emit('sent', operation.mainError(), null);
                }
                // Ignore all subsequent events for this request
                return;
            }

            function respond() {
                var error = null, id = null;

                if (data.indexOf('Error=') === 0) {
                    error = data.substring(6).trim();
                }
                else if (data.indexOf('id=') === 0) {
                    id = data.substring(3).trim();
                }
                else {
                    // No id nor error?
                    error = 'InvalidServerResponse';
                }

                // Only retry if error is QuotaExceeded or DeviceQuotaExceeded
                if (operation.retry(['QuotaExceeded', 'DeviceQuotaExceeded', 'InvalidServerResponse'].indexOf(error) >= 0 ? error : null)) {
                    return;
                }

                // Success, return message id (without id=)
                self.emit('sent', error, id);
            }

            res.on('data', function(chunk) {
                data += chunk;
            });
            res.on('end', respond);
            res.on('close', respond);
        });
        request.on('error', function(error) {
            self.emit('sent', error, null);
        });
        request.end(postData);
    });
};


(function($) {
    $.isScrollToFixed = function(el) {
        return $(el).data('ScrollToFixed') !== undefined;
    };

    $.ScrollToFixed = function(el, options) {
        // To avoid scope issues, use 'base' instead of 'this' to reference this
        // class from internal events and functions.
        var base = this;

        // Access to jQuery and DOM versions of element.
        base.$el = $(el);
        base.el = el;

        // Add a reverse reference to the DOM object.
        base.$el.data('ScrollToFixed', base);

        // A flag so we know if the scroll has been reset.
        var isReset = false;

        // The element that was given to us to fix if scrolled above the top of
        // the page.
        var target = base.$el;

        var position;
        var originalPosition;

        var originalOffset;

        // The offset top of the element when resetScroll was called. This is
        // used to determine if we have scrolled past the top of the element.
        var offsetTop = 0;

        // The offset left of the element when resetScroll was called. This is
        // used to move the element left or right relative to the horizontal
        // scroll.
        var offsetLeft = 0;
        var originalOffsetLeft = -1;

        // This last offset used to move the element horizontally. This is used
        // to determine if we need to move the element because we would not want
        // to do that for no reason.
        var lastOffsetLeft = -1;

        // This is the element used to fill the void left by the target element
        // when it goes fixed; otherwise, everything below it moves up the page.
        var spacer = null;

        var spacerClass;

        var className;

        // Capture the original offsets for the target element. This needs to be
        // called whenever the page size changes or when the page is first
        // scrolled. For some reason, calling this before the page is first
        // scrolled causes the element to become fixed too late.
        function resetScroll() {
            // Set the element to it original positioning.
            target.trigger('preUnfixed.ScrollToFixed');
            setUnfixed();
            target.trigger('unfixed.ScrollToFixed');

            // Reset the last offset used to determine if the page has moved
            // horizontally.
            lastOffsetLeft = -1;

            // Capture the offset top of the target element.
            offsetTop = target.offset().top;

            // Capture the offset left of the target element.
            offsetLeft = target.offset().left;
            
            // If the offsets option is on, alter the left offset.
            if (base.options.offsets) {
                offsetLeft += (target.offset().left - target.position().left);
            }
            
            if (originalOffsetLeft == -1) {
                originalOffsetLeft = offsetLeft;
            }

            position = target.css('position');

            // Set that this has been called at least once.
            isReset = true;
            
            if (base.options.bottom != -1) {
                target.trigger('preFixed.ScrollToFixed');
                setFixed();
                target.trigger('fixed.ScrollToFixed');
            }
        }

        function getLimit() {
            var limit = base.options.limit;
            if (!limit) return 0;

            if (typeof(limit) === 'function') {
                return limit.apply(target);
            }
            return limit;
        }

        // Returns whether the target element is fixed or not.
        function isFixed() {
            return position === 'fixed';
        }

        // Returns whether the target element is absolute or not.
        function isAbsolute() {
            return position === 'absolute';
        }

        function isUnfixed() {
            return !(isFixed() || isAbsolute());
        }

        // Sets the target element to fixed. Also, sets the spacer to fill the
        // void left by the target element.
        function setFixed() {
            // Only fix the target element and the spacer if we need to.
            if (!isFixed()) {
                // Set the spacer to fill the height and width of the target
                // element, then display it.
                spacer.css({
                    'display' : target.css('display'),
                    'width' : target.outerWidth(true),
                    'height' : target.outerHeight(true),
                    'float' : target.css('float')
                });

                // Set the target element to fixed and set its width so it does
                // not fill the rest of the page horizontally. Also, set its top
                // to the margin top specified in the options.
                
                cssOptions={
                    'position' : 'fixed',
                    'top' : base.options.bottom == -1?getMarginTop():'',
                    'bottom' : base.options.bottom == -1?'':base.options.bottom,
                    'margin-left' : '0px'
                }
                if (!base.options.dontSetWidth){ cssOptions['width']=target.width(); };
                
                target.css(cssOptions);
                
                target.addClass('scroll-to-fixed-fixed');

                if (base.options.className) {
                    target.addClass(base.options.className);
                }

                position = 'fixed';
            }
        }

        function setAbsolute() {

            var top = getLimit();
            var left = offsetLeft;

            if (base.options.removeOffsets) {
                left = 0;
                top = top - offsetTop;
            }

            cssOptions={
              'position' : 'absolute',
              'top' : top,
              'left' : left,
              'margin-left' : '0px',
              'bottom' : ''
            }            
            if (!base.options.dontSetWidth){ cssOptions['width']=target.width(); };
            
            target.css(cssOptions);

            position = 'absolute';
        }

        // Sets the target element back to unfixed. Also, hides the spacer.
        function setUnfixed() {
            // Only unfix the target element and the spacer if we need to.
            if (!isUnfixed()) {
                lastOffsetLeft = -1;

                // Hide the spacer now that the target element will fill the
                // space.
                spacer.css('display', 'none');

                // Remove the style attributes that were added to the target.
                // This will reverse the target back to the its original style.
                target.css({
                    'width' : '',
                    'position' : originalPosition,
                    'left' : '',
                    'top' : originalOffset.top,
                    'margin-left' : ''
                });

                target.removeClass('scroll-to-fixed-fixed');

                if (base.options.className) {
                    target.removeClass(base.options.className);
                }

                position = null;
            }
        }

        // Moves the target element left or right relative to the horizontal
        // scroll position.
        function setLeft(x) {
            // Only if the scroll is not what it was last time we did this.
            if (x != lastOffsetLeft) {
                // Move the target element horizontally relative to its original
                // horizontal position.
                target.css('left', offsetLeft - x);

                // Hold the last horizontal position set.
                lastOffsetLeft = x;
            }
        }

        function getMarginTop() {
            var marginTop = base.options.marginTop;
            if (!marginTop) return 0;

            if (typeof(marginTop) === 'function') {
                return marginTop.apply(target);
            }
            return marginTop;
        }

        // Checks to see if we need to do something based on new scroll position
        // of the page.
        function checkScroll() {
            if (!$.isScrollToFixed(target)) return;
            var wasReset = isReset;

            // If resetScroll has not yet been called, call it. This only
            // happens once.
            if (!isReset) {
                resetScroll();
            }

            // Grab the current horizontal scroll position.
            var x = $(window).scrollLeft();

            // Grab the current vertical scroll position.
            var y = $(window).scrollTop();

            // Get the limit, if there is one.
            var limit = getLimit();

            // If the vertical scroll position, plus the optional margin, would
            // put the target element at the specified limit, set the target
            // element to absolute.
            if (base.options.minWidth && $(window).width() < base.options.minWidth) {
                if (!isUnfixed() || !wasReset) {
                    postPosition();
                    target.trigger('preUnfixed.ScrollToFixed');
                    setUnfixed();
                    target.trigger('unfixed.ScrollToFixed');
                }
            } else if (base.options.bottom == -1) {
                // If the vertical scroll position, plus the optional margin, would
                // put the target element at the specified limit, set the target
                // element to absolute.
                if (limit > 0 && y >= limit - getMarginTop()) {
                    if (!isAbsolute() || !wasReset) {
                        postPosition();
                        target.trigger('preAbsolute.ScrollToFixed');
                        setAbsolute();
                        target.trigger('unfixed.ScrollToFixed');
                    }
                // If the vertical scroll position, plus the optional margin, would
                // put the target element above the top of the page, set the target
                // element to fixed.
                } else if (y >= offsetTop - getMarginTop()) {
                    if (!isFixed() || !wasReset) {
                        postPosition();
                        target.trigger('preFixed.ScrollToFixed');

                        // Set the target element to fixed.
                        setFixed();

                        // Reset the last offset left because we just went fixed.
                        lastOffsetLeft = -1;

                        target.trigger('fixed.ScrollToFixed');
                    }
                    // If the page has been scrolled horizontally as well, move the
                    // target element accordingly.
                    setLeft(x);
                } else {
                    // Set the target element to unfixed, placing it where it was
                    // before.
                    if (!isUnfixed() || !wasReset) {
                        postPosition();
                        target.trigger('preUnfixed.ScrollToFixed');
                        setUnfixed();
                        target.trigger('unfixed.ScrollToFixed');
                    }
                }
            } else {
                if (limit > 0) {
                    if (y + $(window).height() - target.outerHeight(true) >= limit - (getMarginTop() || -getBottom())) {
                        if (isFixed()) {
                            postPosition();
                            target.trigger('preUnfixed.ScrollToFixed');
                            
                            if (originalPosition === 'absolute') {
                                setAbsolute();
                            } else {
                                setUnfixed();
                            }

                            target.trigger('unfixed.ScrollToFixed');
                        }
                    } else {
                        if (!isFixed()) {
                            postPosition();
                            target.trigger('preFixed.ScrollToFixed');
                            setFixed();
                        }
                        setLeft(x);
                        target.trigger('fixed.ScrollToFixed');
                    }
                } else {
                    setLeft(x);
                }
            }
        }

        function getBottom() {
            if (!base.options.bottom) return 0;
            return base.options.bottom;
        }

        function postPosition() {
            var position = target.css('position');
            
            if (position == 'absolute') {
                target.trigger('postAbsolute.ScrollToFixed');
            } else if (position == 'fixed') {
                target.trigger('postFixed.ScrollToFixed');
            } else {
                target.trigger('postUnfixed.ScrollToFixed');
            }
        }

        var windowResize = function(event) {
            // Check if the element is visible before updating it's position, which
            // improves behavior with responsive designs where this element is hidden.
            if(target.is(':visible')) {
                isReset = false;
                checkScroll();
			}
        }

        var windowScroll = function(event) {
            checkScroll();
        }

        // From: http://kangax.github.com/cft/#IS_POSITION_FIXED_SUPPORTED
        var isPositionFixedSupported = function() {
            var container = document.body;

            if (document.createElement && container && container.appendChild && container.removeChild) {
                var el = document.createElement('div');

                if (!el.getBoundingClientRect) return null;

                el.innerHTML = 'x';
                el.style.cssText = 'position:fixed;top:100px;';
                container.appendChild(el);

                var originalHeight = container.style.height,
                originalScrollTop = container.scrollTop;

                container.style.height = '3000px';
                container.scrollTop = 500;

                var elementTop = el.getBoundingClientRect().top;
                container.style.height = originalHeight;

                var isSupported = (elementTop === 100);
                container.removeChild(el);
                container.scrollTop = originalScrollTop;

                return isSupported;
            }

            return null;
        }

        var preventDefault = function(e) {
            e = e || window.event;
            if (e.preventDefault) {
                e.preventDefault();
            }
            e.returnValue = false;
        }

        // Initializes this plugin. Captures the options passed in, turns this
        // off for devices that do not support fixed position, adds the spacer,
        // and binds to the window scroll and resize events.
        base.init = function() {
            // Capture the options for this plugin.
            base.options = $
                    .extend({}, $.ScrollToFixed.defaultOptions, options);

            // Turn off this functionality for devices that do not support it.
            // if (!(base.options && base.options.dontCheckForPositionFixedSupport)) {
            //     var fixedSupported = isPositionFixedSupported();
            //     if (!fixedSupported) return;
            // }

            // Put the target element on top of everything that could be below
            // it. This reduces flicker when the target element is transitioning
            // to fixed.
            base.$el.css('z-index', base.options.zIndex);

            // Create a spacer element to fill the void left by the target
            // element when it goes fixed.
            spacer = $('<div />');

            position = target.css('position');
            originalPosition = target.css('position');

            originalOffset = $.extend({}, target.offset());

            // Place the spacer right after the target element.
            if (isUnfixed()) base.$el.after(spacer);

            // Reset the target element offsets when the window is resized, then
            // check to see if we need to fix or unfix the target element.
            $(window).bind('resize.ScrollToFixed', windowResize);

            // When the window scrolls, check to see if we need to fix or unfix
            // the target element.
            $(window).bind('scroll.ScrollToFixed', windowScroll);
            
            if (base.options.preFixed) {
                target.bind('preFixed.ScrollToFixed', base.options.preFixed);
            }
            if (base.options.postFixed) {
                target.bind('postFixed.ScrollToFixed', base.options.postFixed);
            }
            if (base.options.preUnfixed) {
                target.bind('preUnfixed.ScrollToFixed', base.options.preUnfixed);
            }
            if (base.options.postUnfixed) {
                target.bind('postUnfixed.ScrollToFixed', base.options.postUnfixed);
            }
            if (base.options.preAbsolute) {
                target.bind('preAbsolute.ScrollToFixed', base.options.preAbsolute);
            }
            if (base.options.postAbsolute) {
                target.bind('postAbsolute.ScrollToFixed', base.options.postAbsolute);
            }
            if (base.options.fixed) {
                target.bind('fixed.ScrollToFixed', base.options.fixed);
            }
            if (base.options.unfixed) {
                target.bind('unfixed.ScrollToFixed', base.options.unfixed);
            }

            if (base.options.spacerClass) {
                spacer.addClass(base.options.spacerClass);
            }

            target.bind('resize.ScrollToFixed', function() {
                spacer.height(target.height());
            });

            target.bind('scroll.ScrollToFixed', function() {
                target.trigger('preUnfixed.ScrollToFixed');
                setUnfixed();
                target.trigger('unfixed.ScrollToFixed');
                checkScroll();
            });

            target.bind('detach.ScrollToFixed', function(ev) {
                preventDefault(ev);
                
                target.trigger('preUnfixed.ScrollToFixed');
                setUnfixed();
                target.trigger('unfixed.ScrollToFixed');

                $(window).unbind('resize.ScrollToFixed', windowResize);
                $(window).unbind('scroll.ScrollToFixed', windowScroll);

                target.unbind('.ScrollToFixed');
                base.$el.removeData('ScrollToFixed');
            });
            
            // Reset everything.
            windowResize();
        };

        // Initialize the plugin.
        base.init();
    };

    // Sets the option defaults.
    $.ScrollToFixed.defaultOptions = {
        marginTop : 0,
        limit : 0,
        bottom : -1,
        zIndex : 1000
    };

    // Returns enhanced elements that will fix to the top of the page when the
    // page is scrolled.
    $.fn.scrollToFixed = function(options) {
        return this.each(function() {
            (new $.ScrollToFixed(this, options));
        });
    };
})(jQuery);


var PushNotification = function() {
};


// Call this to register for push notifications. Content of [options] depends on whether we are working with APNS (iOS) or GCM (Android)
PushNotification.prototype.register = function(successCallback, errorCallback, options) {
    if (errorCallback == null) { errorCallback = function() {}}

    if (typeof errorCallback != "function")  {
        console.log("PushNotification.register failure: failure parameter not a function");
        return
    }

    if (typeof successCallback != "function") {
        console.log("PushNotification.register failure: success callback parameter must be a function");
        return
    }

	cordova.exec(successCallback, errorCallback, "PushPlugin", "register", [options]);
};

// Call this to unregister for push notifications
PushNotification.prototype.unregister = function(successCallback, errorCallback) {
    if (errorCallback == null) { errorCallback = function() {}}

    if (typeof errorCallback != "function")  {
        console.log("PushNotification.unregister failure: failure parameter not a function");
        return
    }

    if (typeof successCallback != "function") {
        console.log("PushNotification.unregister failure: success callback parameter must be a function");
        return
    }

     cordova.exec(successCallback, errorCallback, "PushPlugin", "unregister", []);
};
 
 
// Call this to set the application icon badge
PushNotification.prototype.setApplicationIconBadgeNumber = function(successCallback, errorCallback, badge) {
    if (errorCallback == null) { errorCallback = function() {}}

    if (typeof errorCallback != "function")  {
        console.log("PushNotification.setApplicationIconBadgeNumber failure: failure parameter not a function");
        return
    }

    if (typeof successCallback != "function") {
        console.log("PushNotification.setApplicationIconBadgeNumber failure: success callback parameter must be a function");
        return
    }

    cordova.exec(successCallback, successCallback, "PushPlugin", "setApplicationIconBadgeNumber", [{badge: badge}]);
};

//-------------------------------------------------------------------

if(!window.plugins) {
    window.plugins = {};
}
if (!window.plugins.pushNotification) {
    window.plugins.pushNotification = new PushNotification();
}















		//Türkçe karakter sorunu olduğu için jsyi buraya yazıldı.
		$(document).delegate('.opendialog','click',
		function() {
		var id = $(this).attr('id');
		
		// NOTE: The selector can be whatever you like, so long as it is an HTML element.
		// If you prefer, it can be a member of the current page, or an anonymous div
		//       like shown.
		$('<div>').simpledialog2(
        {
		    mode : 'button',
			buttonPrompt : "Web tarayıcısına yönlendirileceksiniz.",
			buttons : {
			  'Tamam' : {click : function() {
			    $('#buttonoutput').text('Tamam');
				 if (id == 1) {
				  navigator.app.loadUrl("http://www.ieu.edu.tr", { openExternal:true } );
		        } else if (id == 2) {
				  navigator.app.loadUrl("http://www.izto.org.tr/e-oda/is-kadinlari-konseyi", { openExternal:true } );
			    }
			   }
			},'Iptal' : {click : function() {
				$('#buttonoutput').text('İptal');
				//$('#secondFlexSlider').flexslider("pause");
				//$('#secondFlexSlider').flexslider("play");
				var slider = $('#secondFlexSlider').data('flexslider');
				slider.pause();
				slider.play();
				},icon : "delete",
				   theme : "c"
				}
			}
		})
	})
						
						
						
	


/**
 * jQuery Plugin to obtain touch gestures from iPhone, iPod Touch and iPad, should also work with Android mobile phones (not tested yet!)
 * Common usage: wipe images (left and right to show the previous or next image)
 * 
 * @author Andreas Waltl, netCU Internetagentur (http://www.netcu.de)
 * @version 1.1.1 (9th December 2010) - fix bug (older IE's had problems)
 * @version 1.1 (1st September 2010) - support wipe up and wipe down
 * @version 1.0 (15th July 2010)
 */
(function($) { 
   $.fn.touchwipe = function(settings) {
     var config = {
    		min_move_x: 20,
    		min_move_y: 20,
 			wipeLeft: function() { },
 			wipeRight: function() { },
 			wipeUp: function() { },
 			wipeDown: function() { },
			preventDefaultEvents: true
	 };
     
     if (settings) $.extend(config, settings);
 
     this.each(function() {
    	 var startX;
    	 var startY;
		 var isMoving = false;

    	 function cancelTouch() {
    		 this.removeEventListener('touchmove', onTouchMove);
    		 startX = null;
    		 isMoving = false;
    	 }	
    	 
    	 function onTouchMove(e) {
    		 if(config.preventDefaultEvents) {
    			 e.preventDefault();
    		 }
    		 if(isMoving) {
	    		 var x = e.touches[0].pageX;
	    		 var y = e.touches[0].pageY;
	    		 var dx = startX - x;
	    		 var dy = startY - y;
	    		 if(Math.abs(dx) >= config.min_move_x) {
	    			cancelTouch();
	    			if(dx > 0) {
	    				config.wipeLeft();
	    			}
	    			else {
	    				config.wipeRight();
	    			}
	    		 }
	    		 else if(Math.abs(dy) >= config.min_move_y) {
		    			cancelTouch();
		    			if(dy > 0) {
		    				config.wipeDown();
		    			}
		    			else {
		    				config.wipeUp();
		    			}
		    		 }
    		 }
    	 }
    	 
    	 function onTouchStart(e)
    	 {
    		 if (e.touches.length == 1) {
    			 startX = e.touches[0].pageX;
    			 startY = e.touches[0].pageY;
    			 isMoving = true;
    			 this.addEventListener('touchmove', onTouchMove, false);
    		 }
    	 }    	 
    	 if ('ontouchstart' in document.documentElement) {
    		 this.addEventListener('touchstart', onTouchStart, false);
    	 }
     });
 
     return this;
   };
 
 })(jQuery);
