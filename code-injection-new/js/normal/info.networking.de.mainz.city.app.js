


























            
			$( document ).ready(function() {
    		
				//DYNAMISCHE BILDSCHIRMANPASSUNG FÜR ANDROID
		        $(".rightArrow").css("left", (window.innerWidth - 25) + "px");
		        $(".sliderNavigation").css("padding-left", (window.innerWidth / 14.4) + "px");
		        
		        $(".kachel").css("height", (window.innerHeight / 4.22) + "px");
		        $(".kachel").css("width", (window.innerWidth / 2.37) + "px");
		        
		        $("#karte").css('width', window.innerWidth + 'px');
		        $("#karte").css('height', (window.innerHeight * 0.775) + 'px');
          	
    	});
        
        
        
            app.initialize();
            
            $.mobile.defaultPageTransition = 'none';
            
         
            
            
            //************************ Refresh ListView *************************//
            
            //LISTE GASTRO & SHOPS
            $('#shopGastroListPage').live("pagebeforeshow", function() {
                                          
                                          refreshList('#shopGastroList');
                                          
                                          });
                                          
                                          //Liste Events
                                          $('#eventsListPage').live("pagebeforeshow", function() {
                                                                    
                                                                    refreshList('#eventsSearch');
                                                                    
                                                                    });
                                                                    
                                                                    
                                                                    //Traffic
                                                                    $('#trafficListPage').live("pagebeforeshow", function() {
                                                                                               
                                                                                               refreshList('#trafficSearch');
                                                                                               
                                                                                               });
                                                                                               
                                                                                               //News Liste
                                                                                               $('#specialListPage').live("pagebeforeshow", function() {
                                                                                                                          
                                                                                                                          refreshList('#specialList');
                                                                                                                          
                                                                                                                          });
                                                                                                                          
                                                                                                                          //Radar Liste
                                                                                                                          $('#radarListPage').live("pagebeforeshow", function() {
                                                                                                                                                   
                                                                                                                                                   refreshList('#radarSearch');
                                                                                                                                                   
                                                                                                                                                   });
                                                                                                                                                   
                                                                                                                                                   //Insider Liste
                                                                                                                                                   $('#insiderListPage').live("pagebeforeshow", function() {
                                                                                                                                                                              
                                                                                                                                                                              refreshList('#listShopInsider');
                                                                                                                                                                              
                                                                                                                                                                              });
                                                                                                                                                                              
                                                                                                                                                                              function refreshList(id){
                                                                                                                                                                                  
                                                                                                                                                                                  $(id).listview('refresh');
                                                                                                                                                                              }
        
        
        /****************** WERBUNG ***********************/
        //main
        $('#mainPage').live("pagebeforeshow", function() {
                            
                            //wenn die Anwendung startet wird erst die Live Funktion aufgerufen und erst dann Phonegap somit muss beim Start die Werbung von Phonega gesetzt werden
                            if(advertise.firstTime){
                            
                            advertise.setAdMain();
                            }
                            
                            });
                            
                            
                            //Blitzer melden
                            $('#radarReport').live("pagebeforeshow", function() {
                                                   
                                                   advertise.setAdRadarReport();
                                                   
                                                   //autocompleteData.initRadarData();
                                                   
                                                   //autocompleteData.setRadarData();
                                                   });
                                                   
                                                   
                                                   //Parkenliste
                                                   $('#parking').live("pagebeforeshow", function() {
                                                                      refreshList('#parkingList');
                                                                      advertise.setAdParkingList();
                                                                      
                                                                      
                                                                      });
                                                                      
                                                                      //Stau Melden
                                                                      $('#trafficReportPage').live("pagebeforeshow", function() {
                                                                                                   
                                                                                                   advertise.setAdTrafficReport();
                                                                                                   });
                                                                                                   
                                                                                                   //Kirchen
                                                                                                   $('#kirchen').live("pagebeforeshow", function() {
                                                                                                                      
                                                                                                                      advertise.setAdKrichen();
                                                                                                                      });
                                                                                                                      
                                                                                                                      //Museen
                                                                                                                      $('#museen').live("pagebeforeshow", function() {
                                                                                                                                        
                                                                                                                                        advertise.setAdMuseen();
                                                                                                                                        });
                                                                                                                                        
                                                                                                                                        //Römisch Mainz
                                                                                                                                        $('#roemischesMainz').live("pagebeforeshow", function() {
                                                                                                                                                                   
                                                                                                                                                                   advertise.setAdRoemischMainz();
                                                                                                                                                                   });
                                                                                                                                                                   
                                                                                                                                                                   //Alstadt
                                                                                                                                                                   $('#altstadt').live("pagebeforeshow", function() {
                                                                                                                                                                                       
                                                                                                                                                                                       advertise.setAdAltstadt();
                                                                                                                                                                                       });
                                                                                                                                                                                       
                                                                                                                                                                                       $('#tanken').live("pagebeforeshow", function() {
                                                                                                                                                                                                         advertise.setAdTankenSubPage();
                                                                                                                                                                                                         });
                                                                                                                                                                                                         
                                                                                                                                                                                                         /************* EVENT DETAIL  *****/
                                                                                                                                                                                                         //ändert den Link so das er mit dem InAppBrowser geöffnet wird
                                                                                                                                                                                                         
                                                                                                                                                                                                         $('#eventsDetailPage').live("pagebeforeshow", function() {
                                                                                                                                                                                                                                     
                                                                                                                                                                                                                                     var element = $('#externerLink a');
                                                                                                                                                                                                                                     var link = element.attr('href');
                                                                                                                                                                                                                                     element.removeAttr('href');
                                                                                                                                                                                                                                     element.attr('onclick',"navi.showExternalPage('"+link +"')");
                                                                                                                                                                                                                                     
                                                                                                                                                                                                                                     });
                                                                                                                                                                                                                                     
                                                                                                                                                                                                                                     
                                                                                                                                                                                                                                     
                                                                                                                                                                                                                                     
                                                                                                                                                                                                                                     
                                                                                                                                                                                                                                     var conection = {
                                                                                                                                                                                                                                         
                                                                                                                                                                                                                                         internet: function(){
                                                                                                                                                                                                                                             
                                                                                                                                                                                                                                             //return true;
                                                                                                                                                                                                                                             
                                                                                                                                                                                                                                             
                                                                                                                                                                                                                                             var networkState =  navigator.connection.type;
                                                                                                                                                                                                                                             
                                                                                                                                                                                                                                             if(networkState == Connection.UNKNOWN || networkState == Connection.NONE){
                                                                                                                                                                                                                                                 
                                                                                                                                                                                                                                                 return false;
                                                                                                                                                                                                                                             }
                                                                                                                                                                                                                                             else{
                                                                                                                                                                                                                                                 
                                                                                                                                                                                                                                                 return true;
                                                                                                                                                                                                                                             }
                                                                                                                                                                                                                                             
                                                                                                                                                                                                                                                                                                                                                                                                                                                                             
                                                                                                                                                                                                                                         }
                                                                                                                                                                                                                                     };
        
                                                                                                                                                                                                                                     
                                                                                                                                                                                                                                     
                                                                                                                                                                                                                                     var plattform = { 
                                                                                                                                                                                                                                             
                                                                                                                                                                                                                                             isAndroidDevice: function(){
                                                                                                                                                                                                                                                 
                                                                                                                                                                                                                                                 if(device.platform == 'Android'){
                                                                                                                                                                                                                                                     return true;
                                                                                                                                                                                                                                                 }else{
                                                                                                                                                                                                                                                     return false;
                                                                                                                                                                                                                                                 }
                                                                                                                                                                                                                                             }
                                                                                                                                                                                                                                           }; 
        var navi = {
            index: 0,
            fromMain: false,
            fromMainToNaviPage: function(page,index){
                this.setComesFromMain(true);
                this.index = index;
                
                this.changeToPage(page);
                
            },
            changeToPage: function(page){
                $.mobile.changePage(page);
            },
            goBack: function(){
                history.back();
            },
            getIndex: function(){
                return this.index;
            },
            showExternalPage: function(url){
                
                
                printOnConsole("showPdf","showPdf: "+url);
                
                if(conection.internet()){
                    printOnConsole("showPdf","connection");
                    
                    if(url != '')
                    {
                     	
                    	if( plattform.isAndroidDevice() )
                    	{
                    		window.open(url, '_system', 'location=yes');
                    	}
                    	else
                    	{
                    		window.open(url, '_blank', 'EnableViewPortScale=yes', 'location=yes');	
                    	}
                    	
                        
                        
                    }
                    else{
                        ui.showDialog("Keine Informationen", "Zur Zeit sind keine Informationen vorhanden.", false);
                    }
                }
                else{
                    ui.showDialog("Keine Netzwerkverbindung", "Zur Anzeige benötigen Sie eine Netzwerkverbindung.", false);
                }
            },
            comesFromMain: function(){
                return this.fromMain;
            },
            setComesFromMain: function(from){
                this.fromMain = from;
            }
        }
        
        var events = {
            //Events Checkboxen -> alle außer der Kategorie "Alle Kategorien" auf false
            setKategoriesFalse: function(){
                
                $('#checkboxKultur').attr('checked', false).checkboxradio('refresh');
                $('#checkboxFesteMaerkte').attr('checked', false).checkboxradio('refresh');
                $('#checkboxParty').attr('checked', false).checkboxradio('refresh');
                $('#checkboxBildung').attr('checked', false).checkboxradio('refresh');
                $('#checkboxMesse').attr('checked', false).checkboxradio('refresh');
                $('#checkboxGesundheit').attr('checked', false).checkboxradio('refresh');
                $('#checkboxSonstiges').attr('checked', false).checkboxradio('refresh');
            },
            //Events Checkboxen -> setzt die Checkbock "Alle Kategorie" auf false
            setAllFalse: function(){
                $('#checkboxAlle').attr('checked', false).checkboxradio('refresh');
            }
            
            
        }
        
        
        //Autocomplete Texte für die Fromulare Blitzermelden und staumelden
        /*
         var autocompleteData = {
         
         radarCarArr: new Array(),
         radarPlaceArr: new Array(),
         
         initRadarData: function(){
         
         //radarCarArr = ;
         
         },
         setRadarData: function(){
         
         $("#radarMobile").autocomplete({
         source: new Array('blauer Ford','gelber Mustan')
         });
         
         }
         
         
         
         }*/
        
        function toMobile(mobileName){
            $("#radarMobileList").prev().find("input").val(mobileName);
            $("#radarMobileList").children("li").addClass("ui-screen-hidden");
        }
        
        function toStreet(streetName){
                $("#streetList").prev().find("input").val(streetName);
                $("#streetList").children("li").addClass("ui-screen-hidden");
        }
        
        function toTown(townName){
            $("#townList").prev().find("input").val(townName);
            $("#townList").children("li").addClass("ui-screen-hidden");
        }
        
        function toDistrict(districtName){
            $("#districtList").prev().find("input").val(districtName);
            $("#districtList").children("li").addClass("ui-screen-hidden");
        }
        
        

function playAudio(src){
	
	//nur beim ersten Start der ANwendung wird die Audiodatei abgespielt
	if(getAudioPlay()){
		
		//Audio wurde abgespiel
		setAudioPlay();
    
        // Create Media object from src
        my_media = new Media(src, onSuccessAudio, onErrorAudio);
    
        // Play audio
        my_media.play();
    }
    
    
}

// onSuccess Callback
function onSuccessAudio() {
    printOnConsole("onSuccessAudio","playAudio():Audio Success");
}

// onError Callback
function onErrorAudio(error) {
    printOnConsole("onErrorAudio",'code: '+ error.code  + ' message: ' + error.message);
}


var advertise ={
    DEFAULT_BANNER: "bilder/werbung/iAd_Default.png",
    AD_URL: "http://icon008.info-mainz.de/firmen/app/banner/",
    firstTime: false,
    setAdMain: function(){
        this.buildAd('#mainPageAd','0.php','0.png');

        firstTime = true;
    },
    buildAd: function(id,php,pic){
        
    	if(conection.internet()){
            
        	printOnConsole("Advertise","advertise: "+id);

            $(id).html(this.createLink(this.AD_URL+php, this.AD_URL+pic));
            
            /*
             $('<img class="adBanner" src="' + this.AD_URL+pic +  '" />"').load(function(response, status, xhr) {
                                        
                                        if (status == "error") {
                                                var msg = "Sorry but there was an error: ";
                                                alert(msg + xhr.status + " " + xhr.statusText);
                                        }else{
                                                //alert("asdad");
                                                $(id +' img').detach();
                                                $(this).appendTo(id);
                                        }
            });
                                                                          
            */
            printOnConsole("Advertise","advertise2");
            
        }
        else{
            printOnConsole("Advertise","advertise DEFAULT 1");
            
            $(id).html(this.createLink('',this.DEFAULT_BANNER));
            
            printOnConsole("Advertise","advertise DEFAULT 2");
            
        }

    },
    createLink: function(php,pic){
        
        
        printOnConsole("Advertise", + php +  "  "  + pic);
        
        return "<a  onClick=\"navi.showExternalPage('" + php +"')\"><img class=\"adBanner\" src=\" " + pic + " \" /></a>";
    },
    setAdPages: function(index){
        switch(index){
            case 0:
                this.setAdSehenswert();
                break;
            case 1:
                this.setAdShop();
                break;
            case 2:
                this.setAdGastro();
                break;
            case 3:
                this.setAdVerkehr();
                break;
            case 4:
                this.setAdSpecial();
                break;
            case 5:
                this.setAdEvent();
                break;
        }
    },
    setAdSubPages: function(index){
        
        switch(index){
            case 0: //blitzer
                this.setAdRadarSubPage();
                break;
            case 1: //stau
                this.setAdTrafficSubPage();
                break;
            case 2: //parken
                this.setAdParkingSubPage();
                break;
            case 3: //Shop Suche
                this.setAdShopSearch();
                break;
            case 4: //Gastro Suche
                this.setAdGastroSearch();
                break;
            case 5: //shops
                this.setAdShopsSubPage();
                break;
            case 6: //gastro
                this.setAdGastroSubPage();
                break;
            case 7: //Gastro Tipp
                this.setAdGastroTipp();
                break;
        }

        
    },
    setAdShopList: function(){
        this.buildAd('#shopGastroListAd','21.php','21.png');
    },
    setAdInsider: function(){
        this.buildAd('#shopGastroListAd','23.php','23.png');
    },
    setAdShopsSubPage: function(){
         this.buildAd('#naviPageAd','24.php','24.png');
    },
    setAdShopSearch: function(){
         this.buildAd('#naviPageAd','25.php','25.png');
    },
    setAdGastroList: function(){
        this.buildAd('#shopGastroListAd','41.php','41.png');
    },
    setAdShopDetail: function(){
        
        this.buildAd('#adDetailPage','22.php','22.png');
    },
    setAdGastroDetail: function(){
        
        this.buildAd('#adDetailPage','42.php','42.png');
    },
    setAdShop: function(){
        this.buildAd('#naviPageAd','2.php','2.png');
    },
    setAdGastro: function(){
        this.buildAd('#naviPageAd','4.php', '4.png');
    },
    setAdGastroTipp: function(){
        this.buildAd('#naviPageAd','7.php', '7.png');
    },
    setAdGastroTippRestaurantList: function(){
        this.buildAd('#shopGastroListAd','71.php', '71.png');
    },
    setAdGastroTippFruestueckList: function(){
        this.buildAd('#shopGastroListAd','73.php', '73.png');
    },
    setAdGastroTippRestaurantDetail: function(){
         this.buildAd('#adDetailPage','72.php', '72.png');
    },
    setAdGastroTippFruestueckDetail: function(){
        this.buildAd('#adDetailPage','74.php', '74.png');
    },
    setAdGastroSearch: function(){
        this.buildAd('#naviPageAd','45.php','45.png');
    },
    setAdGastroSubPage: function(){
        this.buildAd('#naviPageAd','44.php','44.png');
    },
    setAdVerkehr: function(){
        this.buildAd('#naviPageAd','3.php','3.png');
    },
    setAdRadarList: function(){
        this.buildAd('#radarListPageAd','31.php', '31.png');
    },
    setAdRadarReport: function(){
        this.buildAd('#radarReportAd', '32.php', '32.png');
    },
    setAdParkingList: function(){
        this.buildAd('#parkingListAd', '33.php', '33.png');
    },
    setAdTrafficSubPage: function(){
        this.buildAd('#naviPageAd','39.php', '39.png');
    },
    setAdRadarSubPage: function(){
        this.buildAd('#naviPageAd','38.php', '38.png');
    },
    setAdParkingSubPage: function(){
        this.buildAd('#naviPageAd','37.php', '37.png');
    },
    setAdTankenSubPage: function(){
        this.buildAd('#tankenAd','391.php', '391.png');
    },
    setAdMVGSubPage: function(){
        this.buildAd('#naviPageAd','392.php', '392.png');
    },
    setAdTrafficList: function(){
        this.buildAd('#trafficListPageAd','35.php', '35.png');
    },
    setAdTrafficReport: function(){
        this.buildAd('#trafficReportListPageAd', '36.php', '36.png');
    },
    setAdEvent: function(){
        this.buildAd('#naviPageAd', '6.php', '6.png');
    },
    setAdEventList: function(){
        this.buildAd('#eventsListPageAd', '61.php', '61.png');
    },
    setAdEventDetail: function(){
        this.buildAd('#eventsDetailPageAd', '62.php', '62.png');
    },
    setAdSpecial: function(){
         this.buildAd('#naviPageAd', '5.php', '5.png');
    },
    setAdNewsList: function(){
        this.buildAd('#specialListPageAd', '5.php', '5.png');
    },
    setAdNewsDetail: function(){
        this.buildAd('#specialDetailPageAd', '51.php','51.png');
    },
    setAdWeather: function(){
        this.buildAd('#weatherPageAd', '51.php','51.png');
    },
    setAdSehenswert: function(){
        this.buildAd('#naviPageAd', '1.php', '1.png');
    },
    setAdKrichen: function(){
        this.buildAd('#kirchenAd','11.php','11.png');
    },
    setAdMuseen: function(){
        this.buildAd('#museenAd', '12.php', '12.png');
    },
    setAdRoemischMainz: function(){
        this.buildAd('#roemischesMainzAd','13.php','13.png');
    },
    setAdAltstadt: function(){
        this.buildAd('#altstadtAd','14.php', '14.png');
    },
    setAdDetailSights: function(index){
        
        var pic = '';
        var php = '';
        
        switch(index){
            case 0:
                //Kirche
                pic = '11.png';
                php = '11.php';
                break;
            case 1:
                //Museen
                pic = '12.png';
                php = '12.php';
                break;
            case 2:
                //Römisch Mainz
                pic = '13.png';
                php = '13.php';
                break;
            case 3:
                //Altstadt
                pic = '14.png';
                php = '14.php';
                break;
            default:
                //Stadtführung
                pic = '15.png';
                php = '15.php';
                break;
                
        }
        
        this.buildAd('#detaiSightsAd', php, pic);
    },
    setAdOnMap: function(id){
        var pic = '';
        var php = '';
        
        if(id == 'shop'){
            //Shop
            pic = '22.png';
            php = '22.php';
        }
        else if(id == 'gastro'){
            //Gastro
            pic = '42.png';
            php = '42.php';
        }
        else if(id == 'parkhausListe'){
            //parkausliste
            pic = '33.png';
            php = '33.php';
        }
        else if(id == 'parkhaeuser'){
            //parkhäuser Map
            pic = '34.png';
            php = '34.php';
        }
        else{
            pic = '';
            php = '';
        }
        
        this.buildAd('#mapPageAd',  php, pic);
    },
}

function printOnConsole(where,text){
	
	//console.log(where+": "+text);
}

/************************ KONSTANTEN SUCHE ********************/
//XML URL
var XML_URL_SEARCH_CONFIG = "http://icon008.info-mainz.de/firmen/app/branchen.php?version=";
var XML_URL_LISTE = "http://icon008.info-mainz.de/firmen/app/firmen_liste.php";
var XML_URL_DETAIL = "http://icon008.info-mainz.de/firmen/app/firmen_detail.php?idx=";

//Suche Branche
var XML_URL_ELEMENT_BRANCHE = "branche=";
var XML_URL_ELEMENT_POSITION = "position=";
var XML_URL_ELEMENT_STADTGEBIET = "stadtgebiet=";

//Suche Sucgbegriff
var XML_URL_ELEMENT_SUCHBEGRIFF = "keyword=";
var XML_URL_ELEMENT_FIRMENNAME = "firmenname=";

//Element der XML SearchConfig
var XML_SC_BRANCHEN = "branchen";
var XML_SC_ATTRIBUTE_VERSION = "version";
var XML_SC_SHOPS = "shops";
var XML_SC_GASTRO = "gastro";
var XML_SC_BRANCHE = "branche";
var XML_SC_KATEGORIEN = "kategorien";
var XML_SC_KATEGORIE = "kategorie";
var XML_SC_NAME = "name";
var XML_SC_VERSION = "version";

//Attribute der XML Liste f�r Shop, Gastro, Events, Blitzer
var XML_LISTE_ATTRIBUTE_COUNT = "count";
var XML_LISTE_ATTRIBUTE_POSITION = "position";

//Elemente der XML Liste
var XML_LISTE_FIRMEN = "firmen";
var XML_LISTE_FIRMA = "firma";
var XML_LISTE_IDX = "idx";
var XML_LISTE_NAME = "name";
var XML_LISTE_STRASSE = "strasse";
var XML_LISTE_ORT = "ort";
var XML_LISTE_LOGO = "logo";
var XML_LISTE_LAT = "latitude";
var XML_LISTE_LONG = "longitude";

//Elemente der XML Detials
var XML_DETAIL_FIRMA = "firma";
var XML_DETAIL_GEBIET = "gebiet";
var XML_DETAIL_NAME = "name";
var XML_DETAIL_STRASSE = "strasse";
var XML_DETAIL_PLZ = "plz";
var XML_DETAIL_ORT = "ort";
var XML_DETAIL_STADTGEBIET = "stadtgebiet";
var XML_DETAIL_TELEFON = "telefon";
var XML_DETAIL_FAX = "telefax";
var XML_DETAIL_EMAIL = "email";
var XML_DETAIL_WEB = "homepage";
var XML_DETAIL_FACEBOOK = "facebook";
var XML_DETAIL_BESCHREIBUNG = "beschreibung";
var XML_DETAIL_OEFFUNGSZEITEN = "oeffnungszeiten";
var XML_DETAIL_ZUSATZ = "zusatz";
var XML_DETAIL_IMAGE_1 = "image_1";
var XML_DETAIL_IMAGE_2 = "image_2";
var XML_DETAIL_IMAGE_3 = "image_3";
var XML_DETAIL_IMAGE_4 = "image_4";
var XML_DETAIL_MARKEN = "marken";
var XML_DETAIL_PDF = "pdf";
var XML_DETAIL_PDF_TITLE = "pdf_titel";
var XML_DETAIL_VIDEO = "video";
var XML_DETAIL_VIDEO_TITLE = "video_titel";

//Unterscheidung welche Funktion nach den erfolgreichen ajaxaufruf aufgerufen wird
//GET-Request
var GET_SEARCH = 0;
var GET_DETAIL = 1;
var GET_EVENTS_DETAILS = 2;
var GET_RADAR_LISTE = 3;
var GET_NEWS_LISTE = 4;
var GET_NEWS_DETAILS = 5;
var GET_TRAFFIC_LIST = 6;
var GET_WEATHER = 7;

//POST-Request
var POST_LISTE_SECTOR = 0;
var POST_LISTE_KEYWORD = 1;
var POST_GASTRO_SECTOR = 2;
var POST_GASTRO_KEYWORD = 3;
var POST_INSIDER_GASTRO_LISTE = 4;
var POST_INSIDER_SHOP_LISTE = 5;
var POST_INSIDER_DETAIL = 6;
var POST_GASTRO_TIPPS = 7;


//liste Item Suche
var positionList = 0;
var brancheList = '';
var kategorieList = '';
var gebietList = '';
var postId = 0;
var ITEM_COUNT = 20;


/************************ KONSTANTEN EVENTS ********************/
var XML_URL_EVENTS = "http://icon008.info-mainz.de/firmen/app/VA-Today.php";
var PIC_URL = "http://icon008.info-mainz.de/firmen/app/showImage.php?img=http://195.145.244.209/dbimg/";
var PIC_URL_GROSS = "http://195.145.244.209/dbimg/";
var XML_URL_EVENTS_DETAILS = "http://icon008.info-mainz.de/firmen/app/VA-Details.php?id=";
var XML_URL_EVENTS_TERMIN_ID = "&termin=";

//ELemente der XML EVENTS Liste
var XML_EVENTS_VERANSTALTUNGEN = "veranstaltungen";
var XML_EVENTS_VERANSTALTUNG = "veranstaltung";
var XML_EVENTS_NAME = "name";
var XML_EVENTS_ID = "id";
var XML_EVENTS_STADT = "stadt";
var XML_EVENTS_BILD = "bild";
var XML_EVENTS_ORT = "veranstaltungsort";
var XML_EVENTS_TERMIN = "termin";
var XML_EVENTS_TERMIN_ID = "id";

//Elemente der XML EVENTS Details
var XML_EVENTS_DETAIL_MAINDATA = "maindata";
var XML_EVENTS_DETAIL_NAME = "name";
var XML_EVENTS_DETAIL_BES = "beschreibung";
var XML_EVENTS_DETAIL_BILD = "bild";
var XML_EVENTS_DETAIL_LINK = "externer_link";
var XML_EVENTS_DETAIL_TERMIN = "termin";
var XML_EVENTS_START_DATE = "start_date";
var XML_EVENTS_END_DATE = "end_date";
var XML_EVENTS_START_TIME = "start_time";
var XML_EVENTS_END_TIME = "end_time";

var XML_EVENTS_DETAIL_VERANSTALTUNGSORT ="veranstaltungsort";
var XML_EVENTS_DETAIL_STRASSE = "strasse";
var XML_EVENTS_DETAIL_ORT = "ort";
var XML_EVENTS_DETAIL_PLZ = "plz";
var XML_EVENTS_DETAIL_TEl = "tel";
var XML_EVENTS_DETAIL_FAX = "fax";
var XML_EVENTS_DETAIL_STOP = "haltestelle";

var XML_EVENTS_DETAIL_VERANSTALTER = "veranstalter";
var XML_EVENTS_DETAIL_EMAIL = "email";

var categorieEvents;

/************************ KONSTANTEN Blitzer ***************/
var XML_URL_RADAR = "http://icon008.info-mainz.de/firmen/app/blitzer_liste.php";

//ELemente der XML Blitzer Liste
var XML_RADAR_BLITZERLISTE = "blitzerliste";
var XML_RADAR_BLITZER = "blitzer";
var XML_RADAR_BLITZER_ID = "blitzer_id";
var XML_RADAR_BLITZER_FAHRZEUG = "blitzer_messfahrzeug";
var XML_RADAR_BLITZER_STRASSE = "blitzer_strasse";
var XML_RADAR_BLITZER_ORT = "blitzer_ort";
var XML_RADAR_BLITZER_STADTTEIL = "blitzer_stadtteil";
var XML_RADAR_BLITZER_POSITION = "blitzer_position";
var XML_RADAR_BLITZER_RICHTUNG = "blitzer_richtung";
var XML_RADAR_BLITZER_UPADATE = "blitzer_updated";
var XML_RADAR_BLITZER_REPORT = "blitzer_gemeldet_von";
/************************ KONSTANTEN Parken **************/



/************************ KONSTANTEN News ****************/
var XML_URL_NEWS = "http://icon008.info-mainz.de/firmen/app/news_liste.php";
var XML_URL_NEWS_DETAIL = "http://icon008.info-mainz.de/firmen/app/news_detail.php";

//Elemente der XML News Liste
var XML_NEWS_NEWSLISTE = "newsliste";
var XML_NEWS_NEWS = "news";
var XML_NEWS_ID = "news_id";
var XML_NEWS_ORT = "news_ort";
var XML_NEWS_TITEL = "news_titel";
var XML_NEWS_SUBTITEL = "news_subtitel";
var XML_NEWS_EILMELDUNG = "news_eilmeldung";
var XML_NEWS_DATUM = "news_datum";
var XML_NEWS_UHRZEIT = "news_uhrzeit";

//ELement der XML News Detail
var XML_NEWS_ARTIKEL = "news_artikel";

var newsPositionList = 0;
var NEWS_COUNT = 10;

/****************** VERKEHR  ******************/
var XML_URL_TRAFFIC = "http://icon008.info-mainz.de/firmen/app/verkehr_liste.php";

var XML_TRAFFIC_VERKEHR_LISTE = "verkehrliste";
var XML_TRAFFIC_VERKEHR = "verkehr";
var XML_TRAFFIC_VERKEHR_STRASSE = "verkehr_strasse";
var XML_TRAFFIC_VERKEHR_RICHTUNG = "verkehr_richtung";
var XML_TRAFFIC_VERKEHR_MELDUNG = "verkehr_meldung";
var XML_TRAFFIC_VERKEHR_GEMELDET = "verkehr_gemeldet_von";
var XML_TRAFFIC_VERKEHR_UPDATED = "verkehr_updated";

/*********************** WETTER ********************/
var XML_URL_WEATHER = "http://icon008.info-mainz.de/firmen/app/wetter.php";
var XML_WEATHER_WETTER_LIST = "wetterliste";
var XML_WEATHER_WETTER = "wetter";
var XML_WEATHER_MELDUNG = "wetter_meldung";
var XML_WEATHER_AKTUELL = "wetter_akt_temp";
var XML_WEATHER_MIN = "wetter_min_temp";
var XML_WEATHER_MAX = "wetter_max_temp";
var XML_WEATHER_SYMBOL = "wetter_symbol";

/******************* INSIDER *****************/
var XML_URL_INSIDER_SHOP = "https://icon008.info-mainz.de/firmen/app/insider_liste.php";
var XML_URL_INSIDER_DETAIL = "https://icon008.info-mainz.de/firmen/app/insider_detail.php?idx=";

//Liste
//nutze die gleichen ELemente wie die Liste
var XML_INSIDER_LISTE_HEADLINE = "tip_a_schlagzeile";
var XML_INSIDER_LISTE_HAS_TIP = "has_tip_a";
var XML_INSIDER_LISTE_DETAIL = "tip_a_detail";

//entscheidet ob die Seite "searchListPage" angezeigt wird oder ob die Liste auf der Seite "searchListPage" refresht wird
var showSearchListPage;
//entscheidet ob die Seite "eventsListPage" angezeigt wird oder ob die Liste auf der Seite "eventsListPage" refresht wird
var showEventsListPage;
//entscheidet ob die Seite "trafficListPage" angezeigt wird oder ob die Liste auf der Seite "trafficListPage" refresht wird
var showTrafficListPage;
//entscheidet ob die Seite "specialListPage" angezeigt wird oder ob die Liste auf der Seite "specialListPage" refresht wird
var showSpecialListPage;
//entscheidet ob die Seite "radarListPage" angezeigt wird oder ob die Liste auf der Seite "radarListPage" refresht wird
var showRadarListPage;
//entscheidet ob die Seite "insiderListPage" angezeigt wird oder ob die Liste auf der Seite "insiderListPage" refresht wird
var showInsiderListPage;

/******************** TANKEN ***************/
function fuelList(){
    
    
    if(conection.internet()){
        
        //var band_id = $('#selectMarke').val();
        var fuel_id = $('#selectSpritsorte').val();
        var radius = $('#searchRadius').val();
        //var plz = $('#inputPLZ').val();
        
        /* if(plz.length > 0){
         navi.showExternalPage('http://mehr-tanken.de/list?brand_id=0&fuel_id='+fuel_id+'&radius='+radius+'&lat=0&lon=0&plz='+ plz+'&city=&suche=Suche&result=mobile');
         }
         else{*/
        navi.showExternalPage('http://mehr-tanken.de/list?searchText=Mainz&brand=0&fuel='+fuel_id+'&range='+radius+'&suche=');
        
        //}
        //

    
    }else{
        ui.showDialog("Fehlermeldung","Um diese Funktion nutzen zu koennen, benoetigen Sie eine Netzwerkverbindung.",false);

    
    }
    

}




//ID auf welchen Seite vom SubMen� zur�ckgesprungen wird. WIchtig f�r den Slider
var backId;
var RESTAURANT = "restaurant";
var FRUESTUECK = "frühstück";
/************************ SUCHE ********************/
/**
 * Einstellung f�r die Suche bei Shop und Gastro
 */
function searchConfig(){
	
    printOnConsole("searchConfig","searchConfig");
    
    //Auslesen der Versionsnummer aus dem lokalen Speicher
	var version = getVersionBranche();
    if(version > 0){
        detectAndroidVersion(XML_URL_SEARCH_CONFIG + version,GET_SEARCH);
    }
    else{
        detectAndroidVersion('xml/new.xml',GET_SEARCH);
    }
}

//Suchanfrage f�r Breiche
function searchSector(sector, back, value){
    
    //alert("asdad");
    
    brancheList = '';
    kategorieList = '';
    gebietList = '';
    
    postId = setPostId(sector);
    
    if(postId > -1){
        
        showSearchListPage = true;
        
        backId = back;
        
        brancheList = value;
        
        printOnConsole("searchData","back: " + back + " PostId: " + postId + " BrancheList: " + brancheList);
        
        postXML(XML_URL_LISTE, false, postId, brancheList, kategorieList, positionList, gebietList);
        
        //searchData(element,'', postId);
    }
    
}

//Suchanfrage f�r alle Bereiche die kein SubMen� haben
/*function searchSectorWithoutSub(branche,sector,back){
    
    postId = setPostId(sector);

    if(postId > -1){
        
        showSearchListPage = true;
        
        kategorieList = '';
        gebietList = 'all';
        brancheList = branche;
        
        positionList = 0;
        
        //notl�sung -> f�r keine SubMen�s
        backId = back;

        postXML(XML_URL_LISTE, false, postId, brancheList, kategorieList, positionList, gebietList);
    }
}*/

//Unterscheidet welche PostId genommen werden soll
function setPostId(sector){
    
    switch(sector){
        case 'shop':
            return POST_LISTE_SECTOR;
            break;
        case 'gastro':
            return POST_GASTRO_SECTOR;
            break;
        case 'gastroKeyword':
            return POST_GASTRO_KEYWORD;
        case 'shopKeyword':
            return POST_LISTE_KEYWORD;
        default:
            return -1;
            break;
    }

}

//ermittelt die Daten des per id festgelegten SubMue
/*function searchData(id, categorie, gastoOrShop){

    showSearchListPage = true;
    
    brancheList = '';
    kategorieList = '';
    gebietList = '';
	
    printOnConsole("searchData","searchData");
    
    positionList = 0;
    
    var str = $(id).serialize();
    
    if(str.length > 0){
        
        var index = "checkboxCat=".length;
        
        str = decodeURIComponent(str)
        
        str = str.substr(index, str.length);
        
        str = str.replace(/\+/g, " ");
        //alert(str);
        brancheList = str.replace(/\&checkboxCat=/g, "_");
        
        //alert(brancheList);
        
        postXML(XML_URL_LISTE, false, gastoOrShop, brancheList, kategorieList, positionList, gebietList);
        
        
    }else{
        ui.showDialog("Achtung","Sie muessen mindesten eine Element auswaehlen",false);
    }


}*/

//Suchanfrage f�r Suchbegriffe
function searchKeyword(sector, inputId_1, inputId_2, select, back){
    
    showSearchListPage = true;

    printOnConsole("searchKeywordXML","searchKeywordXML");

    positionList = 0;
    gebietList = 'all';
    postId = setPostId(sector);
    backId = back;
    
	//Abfrage Branche
	brancheList = $(inputId_1).val();
    kategorieList = $(inputId_2).val();
    gebietList = $(select).val();
    
    if(gebietList == 'all'){
        
        //eins von beiden muss mindestens ausgew�hlt worden sein
        if(brancheList.length == 0 && kategorieList.length == 0){
            
            ui.showDialog("Fehler Suche", "Bitte waehlen Sie einen Namen oder einen Suchbegriff aus.", false);
            
        }else{
            
            printOnConsole("searchKeywordXML","************************* "+ gebietList );
            //alert(brancheList + ' ' + kategorieList);
            postXML(XML_URL_LISTE, false, postId, brancheList, kategorieList, positionList, gebietList);
            
        }
    }
    else{
        postXML(XML_URL_LISTE, false, postId, brancheList, kategorieList, positionList, gebietList);
    }
   
    
}

//Suchanfrage f�r GastroTipps
function searchGastroTipps(kind,back){

    postId = POST_GASTRO_TIPPS;
    showSearchListPage = true;
    positionList = 0;
    brancheList=  "gastro";
    backId = back;
    kategorieList = kind;
    postXML(XML_URL_LISTE,false,postId,brancheList,kategorieList,positionList,gebietList);
    
}

//n�chsten Elemente f�r die Liste
function nextSearchList(){

	positionList = positionList + ITEM_COUNT;
    
    printOnConsole("nextXML","Pos: "+positionList);
	
    postXML(XML_URL_LISTE,false,postId,brancheList,kategorieList,positionList,gebietList);
}

//vorrigen Elemente der Liste
function prevSearchList(){
	
	positionList = positionList - ITEM_COUNT;
	
	postXML(XML_URL_LISTE,false, postId, brancheList, kategorieList, positionList, gebietList);
}

/**
 * Erstellt die URL
 * @param sector - branche/CompanyName -> String
 * @param cat - Katorie/keyword -> String
 * @param pos - Position -> String
 * @param area - Gebiet -> String
 * @param kind -> Art der URL f�r Branche oder Suchbergriff -> String: sector,keyword 
 */
function buildURL(sector,cat,pos,area,kind){
	
    if(kind === 'sector'){
        var tmp = '';
        //URL zusammen bauen
    
        printOnConsole("buildURL","Branche: "+sector);
        printOnConsole("buildURL","Kategorie: "+cat);
        printOnConsole("buildURL","Gebiet: "+area);
    
    
        if(cat == 'all' || cat.length == 0){
            tmp = XML_URL_ELEMENT_BRANCHE + sector;
        }
        else{
            tmp = XML_URL_ELEMENT_BRANCHE + cat;
        }
	
        if(area.length == 0){
            area = 'all';
        }
    
        printOnConsole("buildURL","URL: "+XML_URL_LISTE + tmp + '&' + XML_URL_ELEMENT_STADTGEBIET + area + '&' + XML_URL_ELEMENT_POSITION + pos);
	
        return  XML_URL_LISTE + tmp + '&' + XML_URL_ELEMENT_STADTGEBIET + area + '&' + XML_URL_ELEMENT_POSITION + pos;
    }
    else if(kind === 'keyword' ){
    
       
        printOnConsole("buildURL","URL: "+XML_URL_LISTE + XML_URL_ELEMENT_FIRMENNAME + sector +'&' + XML_URL_ELEMENT_SUCHBEGRIFF + cat + '&' + XML_URL_ELEMENT_POSITION + pos);
        return  XML_URL_LISTE + XML_URL_ELEMENT_FIRMENNAME + sector +'&' + XML_URL_ELEMENT_SUCHBEGRIFF + cat + '&' + XML_URL_ELEMENT_POSITION + pos;
    
    
    }
    
    return '';
	
}

//Anfrage Detailansicht
function searchDetail(id){
	
	detectAndroidVersion(XML_URL_DETAIL+id,GET_DETAIL);
}

//Parser f�r die Listen XML genutzt von Shop und Gastro
var adressArray;
function listeXMLParser(xml){
    
    printOnConsole("listeXMLParser","listeXMLParser");
    
    adressArray = [];
    //Banner
    var source = '';
    //Insider
    var tipp = '';
    
    
    if(postId == POST_LISTE_SECTOR || postId == POST_LISTE_KEYWORD){
        //Banner Shop
        
        advertise.setAdShopList();
    }
    else if(postId == POST_GASTRO_SECTOR || postId == POST_GASTRO_KEYWORD){
        
        //werbung Gastro
        advertise.setAdGastroList();
    }
    else if(postId == POST_GASTRO_TIPPS){
        
        if(kategorieList == RESTAURANT){
            
            advertise.setAdGastroTippRestaurantList();
        }else{
            advertise.setAdGastroTippFruestueckList();
        }
    }
    
    //Back Button 
    //alert(backId);
    if(backId == 'noSubMenu'){
        $('#shopGastroBack').attr("onclick","navi.changeToPage('#naviPage')");
    }
    else{
        $('#shopGastroBack').attr("onclick","slider.goBackToSubMenu('" + backId + "')");
    }

    xmlDoc = $.parseXML(xml);
		
    
	$(xmlDoc).find(XML_LISTE_FIRMEN).each(function()
	{
		var count = parseInt($(this).attr(XML_LISTE_ATTRIBUTE_COUNT));
		
        if(count > 0){
             
            //printOnConsole("listeXMLParser","XML: "+xmlDoc);

                                          
            //printOnConsole("listeXMLParser","Count: "+count);
		
            positionList = parseInt($(this).attr(XML_LISTE_ATTRIBUTE_POSITION));
		
            //printOnConsole("listeXMLParser","positionList "+positionList);
                                          
            var listItem = '';
                                          
            //Bei der Such mittels Suchbegriff oder Name soll das erste List Element
            //ein eintrag auf die Karte enthalten.
            //klickt der User auf diese eintrage wird er auf die Karte weiter geleitet
            if(postId == POST_LISTE_KEYWORD || postId == POST_GASTRO_KEYWORD){
                                          
                listItem = '<li><a onClick="listMapXML()"><div class="listPic" ><img src="bilder/suche/Icon_ShowMap.png" /></div><div class="listWithPic"><h3 class="listTitle">Suchergebnisse</h3><div class="listText">auf der Karte anzeigen</div></div></a></li>';
            }
                                          
		
            $(this).find(XML_LISTE_FIRMA).each(function()
            {
                //Firmen Liste
                var id = $(this).find(XML_LISTE_IDX).text();
                var name = $(this).find(XML_LISTE_NAME).text();
                var street = $(this).find(XML_LISTE_STRASSE).text();
                var town = $(this).find(XML_LISTE_ORT).text();
                var picture = $(this).find(XML_LISTE_LOGO).text();
                var lat = $(this).find(XML_LISTE_LAT).text();
                var long = $(this).find(XML_LISTE_LONG).text();
                
                                               
                //printOnConsole("listeXMLParser","Tipp: "+tipp);
                
                //Insider liste
                tipp = $(this).find(XML_INSIDER_LISTE_HAS_TIP).text();
                var headline = $(this).find(XML_INSIDER_LISTE_HEADLINE).text();
                                               
                
                //printOnConsole("listeXMLParser","Tipp: "+tipp);
                
                //Daten f�r die Karte
                var marker_buffer = new Object();
                                                                                                              
                if(picture.length == 0){
                                               
                    marker_buffer['click'] = false;
                    marker_buffer['id'] = '';
                    //ohne bild
                    listItem = listItem + '<li data-icon="false"><a href=""><div>';
                                               
                                            
                }
                else{
                    
                    marker_buffer['click'] = true;
                    marker_buffer['id'] = id;
                    
                    //tipp nicht vorhanden
                    if(tipp == 'Y'){
                        //markierung insider
                        listItem = listItem + '<li  class="listInsiderImage">';
                                               
                    }else{
                       
                        //ohne Insider
                        listItem = listItem + '<li>';
                    }
                                               
                    listItem = listItem + '<a onClick="searchDetail(\'' + id + '\')"><div class="listPic" ><img src="' + picture + '" /></div><div class="listWithPic">';
                }
                                               
                                    
                marker_buffer['lat'] = lat;
                marker_buffer['long'] = long;
                //printOnConsole("listeXMLParser","lat und long"+lat + ' '+ long );
                
                 listItem = listItem + '<h3 class="listTitle">' + name + '</h3><div class="listText">' + street + '</div>';
                                               
                if(tipp == 'Y'){
                    
                    listItem = listItem +  '<div class="listText" style="color: red">Insider-Tipp:</div><div class="listText" style="white-space:normal;">' + headline + '</div>';
                
                }else{
                    listItem = listItem + '<div class="listText">' + town + '</div>';
                }
                                               
                listItem = listItem + '</div></a></li>';
                
                //Speichern der Daten f�r die anzeige der Daten auf der Karte
                adressArray.push(marker_buffer);
                               
            });
         
            $("#shopGastroList").html(listItem);
        
            //Navigation
            var naviButton = '';
       
            printOnConsole("listeXMLParser","positionList : "+listItem);
        
            //Zur�ck Button
            if(positionList > 0){
                                          
                $("#leftNavi").html('<a onClick="prevSearchList()" data-role="button" class="leftButton" data-inline="true">Zur&uuml;ck</a>');
            }else{
                $("#leftNavi").html('');
            }
                                          
            //Weiter Button
            var tmp = positionList + ITEM_COUNT;
        
            if(tmp < count){
                                          
                $("#rightNavi").html('<a onClick="nextSearchList()" class="rightButton" data-role="button" data-inline="true">Weiter</a>');
            }
            else{
                $("#rightNavi").html('');
            }
                                          
            $("#shopGastroListNavi").trigger("create");
            $.mobile.silentScroll(0);
                                          
                        
            ui.hideLoadingScreen();
            
            printOnConsole("listeXMLParser","firstTime: "+firstTime);
            
            //entweder wird die Page angezeigt oder die Listview refresht
            if(showSearchListPage){
                showSearchListPage = false;
                //wechsel auf die Ergebnisseite
                
                $.mobile.changePage("#shopGastroListPage");
            }else{
                //alert("asdasd");
                //funktion steht in index.html
                refreshList('#shopGastroList');
                
            }
                                          
        }else{
            
            ui.hideLoadingScreen();
            ui.showDialog("Keine Treffer","Ihre Suche ergab leider keine Treffer.",false);
        }                                    
   });
}

function listMapXML(){
    
    if(postId == POST_LISTE_SECTOR || postId == POST_LISTE_KEYWORD){
        showPositionsOnMap(adressArray,'shop');
    }
    else{
        showPositionsOnMap(adressArray,'gastro');
    }
}

//Hilfsvariablen f�r die Darstellung der Position auf der Karte
var nameDetail = '';
var streetDetail = '';
var zipcodeDetail = '';
var placeDetail = '';
function detailsXMLParser(xml){
    
    if(postId == POST_LISTE_SECTOR || postId == POST_LISTE_KEYWORD){
        //Banner Shop
        
        advertise.setAdShopDetail();
    }
    else if(postId == POST_GASTRO_SECTOR || postId == POST_GASTRO_KEYWORD){
        
        //werbung Gastro
       advertise.setAdGastroDetail();
    }
    else if(postId == POST_GASTRO_TIPPS){
        
        if(kategorieList == RESTAURANT){
            
            advertise.setAdGastroTippRestaurantDetail();
            
        }else{
            advertise.setAdGastroTippFruestueckDetail();
        }
    }
    
    
    
    printOnConsole("detailsXMLParser","Parser");
	
	xmlDoc = $.parseXML( xml );
	
	$(xmlDoc).find(XML_DETAIL_FIRMA).each(function()
	{
		var area = $(this).find(XML_DETAIL_GEBIET).text();
        nameDetail = $(this).find(XML_DETAIL_NAME).text();
        streetDetail = $(this).find(XML_DETAIL_STRASSE).text();  
        zipcodeDetail = $(this).find(XML_DETAIL_PLZ ).text();
        placeDetail = $(this).find(XML_DETAIL_ORT).text();
        var cityZone = $(this).find(XML_DETAIL_STADTGEBIET).text();
        var phone = $(this).find(XML_DETAIL_TELEFON).text();
        var fax = $(this).find(XML_DETAIL_FAX).text();
        var email = $(this).find(XML_DETAIL_EMAIL).text();
        var web = $(this).find(XML_DETAIL_WEB).text();
        var facebook = $(this).find(XML_DETAIL_FACEBOOK).text();
        var description = $(this).find(XML_DETAIL_BESCHREIBUNG).text();
        var businessHours = $(this).find(XML_DETAIL_OEFFUNGSZEITEN).text();
        var addition = $(this).find(XML_DETAIL_ZUSATZ).text();
        var image_1 = $(this).find(XML_DETAIL_IMAGE_1).text();
        var image_2 = $(this).find(XML_DETAIL_IMAGE_2).text();
        var image_3 = $(this).find(XML_DETAIL_IMAGE_3).text();
        var image_4 = $(this).find(XML_DETAIL_IMAGE_4).text();
        var pdfTitle = $(this).find(XML_DETAIL_PDF_TITLE).text();
        var pdf = $(this).find(XML_DETAIL_PDF).text();
        var trademark = $(this).find(XML_DETAIL_MARKEN).text();
                                          
        var video = $(this).find(XML_DETAIL_VIDEO).text();
        var videoTitle = $(this).find(XML_DETAIL_VIDEO_TITLE).text();

        
        var tipp_Headline = $(this).find(XML_INSIDER_LISTE_HEADLINE).text();
        var tipp_Detail = $(this).find(XML_INSIDER_LISTE_DETAIL).text();
        
        printOnConsole("detailsXMLParser","Parser1");
      
        //Titel und Beschreibung
        $("#detailText").html('<h1>'+ nameDetail +'</h1>'+ addition +'<br/>' + description);
        
        //if Gastro Bewertung
                                          
        if(tipp_Headline.length > 0 || tipp_Detail.length > 0){
            
            //Insider Tipps
            $("#detailsTipp").html('<img style="float: left;" src="bilder/insider/Tipp_left.png"  /><h1 style="color: red; font-size: 19px; padding-top: 10px;">Unser Insider Tipp</h1><div class="detailTitle" style="margin-top: 7px;">' + tipp_Headline + '</div><div class="detailText">' + tipp_Detail+ '</div>');
        
        }else{
            
            $("#detailsTipp").html('');
        }
        
            
        //Video
        if(video.length > 0){
            //var youtube = 'http://www.youtube.com/embed/yEMiChRhC_I';
            var youtube = 'http://www.youtube.com/embed/';
            
            $("#detailVideo").html('<div class="detailTitle videoTitle" >'+videoTitle+'</div><embed  src="' + youtube + video + '?version=3&loop=1&playlist=' + video +'" width="300" height="199"></embed><br/><br/>');
                                    
        }else{
            $("#detailVideo").html('');
        }
                                                                                    
        //Facebookbutton
        $("#detailFacebook").html('<a onClick="navi.showExternalPage(\'' + facebook + '\')"><img src="bilder/menu/detail/Button_facebook.png" /></a>');
      
        //Webbutton
        $("#detailWeb").html('<a onClick="navi.showExternalPage(\'' + web + '\')"><img src="bilder/menu/detail/Button_ShowMap.png" /></a>');
        
        //Emailbutton
        $("#detailEmail").html('<a href="mailto:' + email + '"><img src="bilder/menu/detail/Button_Mail.png" /></a>');
    	
        //Telefonbutton
        $("#detailPhone").html('<a href="tel:' + phone + '"><img src="bilder/menu/detail/Button_Call.png" /></a>');
        
        //PDF button
        if(pdf.length > 0) {
           $("#detailPdf").html('<div class="detailPDFTitle">'+pdfTitle+'</div><a onClick="navi.showExternalPage(\'' + pdf + '\')"><img src="bilder/menu/detail/Button_PDF.png" /></a><br/>');
        }
        else{
            $("#detailPdf").html('');
        }
        
        //�ffnungszeiten
        $("#detailBusinessHours").html('<h1>&Ouml;ffnungszeiten</h1>' + businessHours );
                             
        //Adresse
        $("#detailAddress").html('<h1>Anschrift</h1>' + nameDetail + '<br/>' + streetDetail + '<br/>' + zipcodeDetail + ' ' + placeDetail + '<br/>Stadtgebiet: '+ cityZone +'<br/>Telefon: ' + phone);
       
        
        var pictureDetail = '';
        if(image_1.length > 0){
            pictureDetail = pictureDetail + '<img class="sliderPictureDetails" src="'+ image_1 +'"/>';
                                         
        }
        
        if(image_2.length > 0){
            pictureDetail = pictureDetail + '<img class="sliderPictureDetails" src="'+ image_2 +'"/>';
                                         
        }
    
        if(image_3.length > 0){
            pictureDetail = pictureDetail + '<img class="sliderPictureDetails" src="'+ image_3 +'"/>';
                                         
        }
                                    
        if(image_4.length > 0){
            pictureDetail = pictureDetail + '<img class="sliderPictureDetails" src="'+ image_4 +'"/>';
                                        
        }
        printOnConsole("Bilder: ",pictureDetail);
  
                                          
        if(pictureDetail.length > 0){
            
            //Bilder anzeigen
            $("#detailPic").html(pictureDetail);
            //Formatierung der Bilder
            $("#detailPic").addClass("sliderDetail");
            
            $("#detailPicDots").addClass("pagingMyExample paging2");
            
        }
        else{
            //falls die Bilder einer anderen Detailansicht noch da sind
            $("#detailPic").html('');
            $("#detailPic").removeClass("sliderDetail");
            
            //keine Punkte mehr anzeigen
            $("#detailPicDots").removeClass("pagingMyExample paging2");
            //das der Titel angezeigt wird
            $("#testText").css("margin-top","40px");
        }
                                          
        printOnConsole("detailsXMLParser","Parser323"); 
        
	});
	
     ui.hideLoadingScreen();
   
    printOnConsole("detailsXMLParser","Parser3");
	$.mobile.changePage("#detailPage");
	
}

//da alle Versuche die NaviBar dynamisch zu erzeugen fehlgeschlagen sind wurde diese Hillfsfunktion eingef�hrt um die Karte mit den Adressdaten aufzurufen
function detailMapXML(){
    
    //Funktion aus Map.js
    //anzeige der Position auf einer Karte
     if(postId == POST_LISTE_SECTOR || postId == POST_LISTE_KEYWORD){
         showPosOnMap(placeDetail,streetDetail,zipcodeDetail, nameDetail + '<br/>' + streetDetail + '<br/>' + zipcodeDetail + ' ' + placeDetail + '<br/>','shop');
     }else{
         showPosOnMap(placeDetail,streetDetail,zipcodeDetail, nameDetail + '<br/>' + streetDetail + '<br/>' + zipcodeDetail + ' ' + placeDetail + '<br/>','gastro');
     }
}

//Parser Suchconfiga
function searchConfigXMLParser(xml){
    
	xmlDoc = $.parseXML(xml);
	
	$(xmlDoc).find(XML_SC_BRANCHEN).each(function()
    {
		
		//Version
        //Speichern der Versionsnummer im lokalen Speicher
        setVersionBranche($(this).attr(XML_SC_ATTRIBUTE_VERSION));
		
		var shop = $(this).children(XML_SC_SHOPS);
	  	var gastro = $(this).children(XML_SC_GASTRO);
        
        printOnConsole("configXMLParser",shop.length);
        
        if(shop.length > 0){
                                         
                printOnConsole("configXMLParser","Parser");
                //L�scht den Inhalt der Tabellen Shop
                deleteShopContent();
                                         
               
                //Shop
                shop.find(XML_SC_BRANCHE).each(function()
                {
                
                                       
                    var shopHK = $(this).children(XML_SC_NAME).text();
			  	    var kategorien = $(this).children(XML_SC_KATEGORIEN);
			    	    		
			  	    //Hauptkategorie - Insert
			  	    populateTableShopHK(shopHK);
			    	    		
			  	    kategorien.find(XML_SC_KATEGORIE).each(function()
			        {
                        $(this).find(XML_SC_NAME).each(function(){
			    	  			
                            //Unterkategorie - Insert
                            populateTableShopUK(shopHK,$(this).text());
			  		     });

                     });

                  });
                                         
        }
                                         
        if(gastro.length > 0){
            
            //L�scht den Inhalt der Tabellen gastro
            deleteGastroContent();
                                        
            //Gastro
            gastro.find(XML_SC_BRANCHE).each(function()
		    {

                var gastroHK = $(this).children(XML_SC_NAME).text();
                var kategorien = $(this).children(XML_SC_KATEGORIEN);
			    		
                //Hauptkategorie - Insert
                populateTableGastroHK(gastroHK);
			    		
                kategorien.find(XML_SC_KATEGORIE).each(function()
                {
                    $(this).find(XML_SC_NAME).each(function(){
			    	
                        //Unterkategorie - Insert
                        populateTableGastroUK(gastroHK,$(this).text());
                    });

                 });
			    	
            });
        }
	
                                         
    });
    
    ui.hideLoadingScreen();
    
}

/************************ INSIDER ********************/
function insiderShopList(){
    
    showInsiderListPage = true;
    
    printOnConsole("POSTXML","POST_GASTRO_KEYWORD");
    
    positionList = 0;
    
    //Kopf Shop -> f�r die Unterscheidung im Parser listeXMLInsider
    postId = POST_LISTE_SECTOR;
    
    printOnConsole("POSTXML","POST_GASTRO_KEYWORD");
    postXML(XML_URL_INSIDER_SHOP, false, POST_INSIDER_SHOP_LISTE, '', '', positionList,'');

}

function insiderGastroList(){
    
    positionList = 0;
    
    //Kopf Gastro -> f�r die Unterscheidung im Parser listeXMLInsider
    postId = POST_GASTRO_SECTOR;
    
    printOnConsole("insiderGastroList","insiderGastroList");
    
    postXML(XML_URL_INSIDER_SHOP, false, POST_INSIDER_GASTRO_LISTE, '', '', positionList,'');
}

function listeXMLInsider(xml){
    
   
    adressArray = [];
    
    //Insider
    var tipp = '';
       
	xmlDoc = $.parseXML(xml);
    
    
	$(xmlDoc).find(XML_LISTE_FIRMEN).each(function()
    {
                                           
        var count = parseInt($(this).attr(XML_LISTE_ATTRIBUTE_COUNT));
                                          
        if(count > 0){
                                          
            printOnConsole("listeXMLInsider","Count: " + count);
                                          
            positionList = parseInt($(this).attr(XML_LISTE_ATTRIBUTE_POSITION));
                                          
            printOnConsole("listeXMLInsider","positionList "+positionList);
                                          
            var listItem = '';
                                          
            $(this).find(XML_LISTE_FIRMA).each(function()
            {
                //Firmen Liste
                var id = $(this).find(XML_LISTE_IDX).text();
                var name = $(this).find(XML_LISTE_NAME).text();
                var street = $(this).find(XML_LISTE_STRASSE).text();
                var town = $(this).find(XML_LISTE_ORT).text();
                var picture = $(this).find(XML_LISTE_LOGO).text();
                var lat = $(this).find(XML_LISTE_LAT).text();
                var long = $(this).find(XML_LISTE_LONG).text();
                                               
                printOnConsole("listeXMLInsider","Tipp: "+tipp);
                                                                             
                //Insider liste
                tipp = $(this).find(XML_INSIDER_LISTE_HEADLINE).text();
                                                                             
                printOnConsole("listeXMLInsider","Tipp: "+tipp);
                                                                             
                                                                             
                //Daten f�r die Karte
                var marker_buffer = new Object();
                    
                //kein Bildvorhanden
                if(picture.length == 0){
                                               
                    marker_buffer['click'] = false;
                    marker_buffer['id'] = '';
                    //ohne bild
                    listItem = listItem + '<li data-icon="false"><a href=""><img /><div>';
                                                                             
                }
                else{
                                                                             
                    marker_buffer['click'] = true;
                    marker_buffer['id'] = id;
                                                                             
                   
                    //markierung insider 
                    listItem = listItem + '<li class="listInsiderImage" ><a onClick="searchDetail(\'' + id + '\')"><div class="listPic"><img src="' + picture + '" /></div><div class="listWithPic">';
                }
                                                                             
                                           
                marker_buffer['lat'] = lat;
                marker_buffer['long'] = long;
                            
                printOnConsole("listeXMLInsider" , "lat und long " + lat + ' '+ long);
                
                                               
               
                listItem = listItem + '<h3 class="listTitle">' + name + '</h3><div class="listText">' + street + '</div><div class="listText" style="color: red">Insider-Tipp:</div>';
                                               
                if(tipp.length > 0){
                                               
                    listItem = listItem +  '<div class="listText" style="white-space:normal;">' + tipp + '</div>';
                }
                
                listItem = listItem + '</div></a></li>';
                                            
                //Speichern der Daten f�r die anzeige der Daten auf der Karte
                adressArray.push(marker_buffer);
                                                                             
            });
                                          
            printOnConsole("listeXMLInsider","listItem"+listItem);
            $("#listShopInsider").html(listItem);
            
           /* if( postId == POST_GASTRO_SECTOR){
                                          
                $("#listGastroInsider").html(listItem);
                refreshList('#listGastroInsider');
                                          
                                        
            }else{
                                          
                printOnConsole("if","listItem"+listItem);                            
                $("#listShopInsider").html(listItem);
                refreshList('#listShopInsider');
                
            }*/
            
            /*
            //Navigation
            var naviButton = '';
                                          
            printOnConsole("listeXMLInsider","positionList : "+positionList);
                                          
            //Zur�ck Button
            if(positionList > 0){
                                          
                $("#leftNavi").html('<a onClick="prevInsiderList()" data-role="button" class="leftButton" data-inline="true">Zur&uuml;ck</a>');
            }else{
                $("#leftNavi").html('');
            }
                                          
            //Weiter Button
            var tmp = positionList + ITEM_COUNT;
                                          
            if(tmp < count){
                                          
                $("#rightNavi").html('<a onClick="nextInsiderList()" class="rightButton" data-role="button" data-inline="true">Weiter</a>');
            }
            else{
                $("#rightNavi").html('');
            }
                                          
            $("#listNavi").trigger("create");
            */
            
            $.mobile.silentScroll(0);
            printOnConsole("listeXMLInsider","listItem1");                              
                                          
            ui.hideLoadingScreen();
            printOnConsole("listeXMLInsider","listItem2");
            
                                          
           // if(showInsiderListPage){
                                         
               // showInsiderListPage = false;
                //wechsel auf die Ergebnisseite
                $.mobile.changePage("#insiderListPage"); 
            //}else{
                
          //      refreshList('#listShopInsider'); //index.html
            //}
                                         
    
                                          
        }else{
                                          
            ui.hideLoadingScreen();
            ui.showDialog("Keine Tipps","Zurzeit sind leider keine Tipps vorhanden, versuchen Sie es spaeter noch einmal.",false);
        }
    });
    
    
}

function insiderDetail(id){

    getXML(XML_URL_INSIDER_DETAIL + "?idx="+id, false, detailsXMLParser);
    
}
           
function nextInsiderList(){
           
   
}           

function prevInsiderList(){
           
           
}

/************************ EVENTS *********************/
//XML mit den Events von Heute
function eventsList(){
    
    showEventsListPage = true;
    positionList = 0;
    categorieEvents = '';
    
    var all = false;

    if($('#checkboxAlle').prop('checked') == true)
    {
        
        categorieEvents = createCategorie(categorieEvents,"");
    }

    if($('#checkboxKultur').prop('checked') == true)
    {
        
        categorieEvents = createCategorie(categorieEvents,"Kultur");
    }
    
    if($("#checkboxFesteMaerkte").prop('checked') == true)
    {   
        categorieEvents = createCategorie(categorieEvents,"Feste & Maerkte");
    }
    
    if($("#checkboxParty").prop('checked') == true)
    {
        categorieEvents = createCategorie(categorieEvents,"Party");
    }
    
    if($("#checkboxBildung").prop('checked') == true)
    {
       categorieEvents = createCategorie(categorieEvents,"Bildung & Wissenschaft");
    }
    
    if($("#checkboxMesse").prop('checked') == true)
    {
        categorieEvents = createCategorie(categorieEvents,"Kongresse & Messen");
    }
    
    if($("#checkboxGesundheit").prop('checked') == true)
    {
         categorieEvents = createCategorie(categorieEvents,"Gesundheit");
    }
    
    if($("#checkboxSonstiges").prop('checked') == true)
    {
        categorieEvents = createCategorie(categorieEvents,"Sonstiges");
    }
    
    printOnConsole("eventsList","categeorieEvents: "+categorieEvents);
   
    postEventsCategorie(XML_URL_EVENTS,false,positionList,categorieEvents);

}

function createCategorie(cat,name){
    
    if(cat.length == 0 ){
        
        return name;
    }
    else{
        return cat + '_' + name;
    }
}

//DetailXMl eines Events
function eventsDetails(id,terminId){
    //printOnConsole("eventsDetails", XML_URL_EVENTS_DETAILS + id + XML_URL_EVENTS_TERMIN_ID + terminId);
    detectAndroidVersion(XML_URL_EVENTS_DETAILS + id + XML_URL_EVENTS_TERMIN_ID + terminId, GET_EVENTS_DETAILS);
}

function nextEventsList(){
    
    positionList = positionList + ITEM_COUNT;
    
    printOnConsole("nextEventsList","Pos: "+positionList);
	
	postEventsCategorie(XML_URL_EVENTS,false,positionList,categorieEvents);
}

function prevEventsList(){
    
    positionList = positionList - ITEM_COUNT;
    
    postEventsCategorie(XML_URL_EVENTS,false,positionList,categorieEvents);

}

//Parser f�r die Eventsliste
function listeXMLEvents(xml){
    
    
    printOnConsole("isteXMLEvents","isteXMLEvents1");
    
	xmlDoc = $.parseXML(xml);
    
    
	$(xmlDoc).find(XML_EVENTS_VERANSTALTUNGEN).each(function()
    {
        var count = parseInt($(this).attr(XML_LISTE_ATTRIBUTE_COUNT));
                                                    
        if(count > 0){
                                          
                printOnConsole("listeXMLEvents","Count: "+count);
                                          
                positionList = parseInt($(this).attr(XML_LISTE_ATTRIBUTE_POSITION));
                            
                printOnConsole("listeXMLEvents","positionList "+positionList);
                                          
                var listItem = '';
                                          
                $(this).find(XML_EVENTS_VERANSTALTUNG).each(function()
                {
                                                    
                    var name = $(this).find(XML_EVENTS_NAME).text();
                    var id = $(this).children(XML_EVENTS_ID).text();
                    var town = $(this).find(XML_EVENTS_STADT).text();
                    var picture = $(this).find(XML_EVENTS_BILD).text();
                    var place = $(this).find(XML_EVENTS_ORT).text();
                            
                    printOnConsole("listeXMLEvents","positionList "+id);
                                                    
                                       
                                                            
                    var time = '';
                    var terminID = '';
                                                            
                    $(this).find(XML_EVENTS_TERMIN).each(function(){
                        
                        terminID = $(this).find(XML_EVENTS_TERMIN_ID).text();
                                                         
                        var startDate = $(this).find(XML_EVENTS_START_DATE).text();
                        var endDate = $(this).find(XML_EVENTS_END_DATE).text();
                        var startTime = $(this).find(XML_EVENTS_START_TIME).text();
                        var endTime = $(this).find(XML_EVENTS_END_TIME).text();
                                                         
                        if(startDate == endDate){
                                                         
                            var startDateArray = startDate.split('-');
                            var startArray = startTime.split(':');
                            if(endTime == '00:00:00'){
                                                         
                                time = startDateArray[2] + "." + startDateArray[1] + "." + startDateArray[0] + " , " + startArray[0] + ":" + startArray[1];
                                                                                                 
                            }else{
                                var endArray = endTime.split(':');
                                                         
                                time = startDateArray[2] + "." + startDateArray[1] + "." + startDateArray[0] + " , " + startArray[0] + ":" + startArray[1] + ' - '  + endArray[0] + ":" + endArray[1]
                                                                                                 
                            }
                                                         
                        }else{
                            var startDateArray = startDate.split('-');
                            var endDateArray = endDate.split('-');
                            time = "" +  startDateArray[2] + "." + startDateArray[1] + "." + startDateArray[0] + " - " + endDateArray[2] + "." + endDateArray[1] + "." + endDateArray[0];
                        }
                                                         
                     });
                                                            
                    if(picture.length == 0){
                       listItem = listItem + '<li data-icon="false"><a href=""><img /><div>';
                    }
                    else{
                        listItem = listItem + '<li><a onClick="eventsDetails(\''+ id +'\',\''+ terminID +'\')"><div class="listPic"><img src="'+PIC_URL+picture+'" /></div><div class="listWithPic">';
                    }
                                        
                                                        
                    printOnConsole("listeXMLEvents","positionList "+time);
                                                            
                    listItem = listItem + '<div class="listDate">'+time+'</div><h3 class="listTitle">' + name + '</h3><div class="listText">Wo: ' + place + '</div><div class="listText">Stadt: '+ town +'</div></div></a></li>';
                                                    
                                                                                         
                });
                 
                printOnConsole("listeXMLEvents","listItem : "+listItem);
        
                $("#eventsSearch").html(listItem);
                                          
                //Navigation
                var naviButton = '';
                                          
                //Zur�ck Button
                if(positionList > 0){
                    $("#eventsLeftNavi").html('<a onClick="prevEventsList()" data-role="button" class="prevButton" data-inline="true">Zur&uuml;ck</a>');
                }else{
                    $("#eventsLeftNavi").html('');
                }
                                          
                //Weiter Button
                var tmp = positionList + ITEM_COUNT;
                                          
                if(tmp < count){
                    $("#eventsRightNavi").html('<a onClick="nextEventsList()" class="nextButton" data-role="button" data-inline="true">Weiter</a>');
                }
                else{
                    $("#eventsRightNavi").html('');
                }
                                        
                                        
                $("#eventsListNavi").trigger("create");
                $.mobile.silentScroll(0);
                                                    
                                                    
                                                    
                                
        ui.hideLoadingScreen();
        
        if(showEventsListPage){
            showEventsListPage = false;
            //wechsel auf die Ergebnisseite
            $.mobile.changePage("#eventsListPage");
        }else{
            refreshList('#eventsSearch');
        }
        
    
    }else{
        ui.hideLoadingScreen();
    
        ui.showDialog("Keine Treffer","Fuer Ihre Auswahl sind keine Veranstaltungen vorhanden.",false);
    }
                                                 
   });
}

//Parser f�r die Detailansicht
function detailsXMLEvents(xml){

	xmlDoc = $.parseXML( xml );
    
    printOnConsole("ddetailsXMLEvents","Parser1");        
	
	$(xmlDoc).find('veranstaltung').each(function()
    {
        printOnConsole("ddetailsXMLEvents","Parser2");
        var maindata = '';
        var time = '';
        var organizer = '';
        var eventPlace = '';
                                          
        $(this).find(XML_EVENTS_DETAIL_MAINDATA).each(function(){
                                           
            var name = $(this).find(XML_EVENTS_DETAIL_NAME).text();
            var town = $(this).find(XML_EVENTS_STADT).text();
            var desc = $(this).find(XML_EVENTS_DETAIL_BES).text();
            var pic =  $(this).find(XML_EVENTS_DETAIL_BILD).text();
            var link = $(this).find(XML_EVENTS_DETAIL_LINK).text();
                                                      
            maindata = '<div class="zentriert"><img class="detailPic" src="' + PIC_URL_GROSS + pic + '"/></div><p>'+ name +'</p><p>'+ desc +'</p><p> Wo: '+ town + '</p><p id="externerLink" class="detailLinkOptik">' + link + '</p>';
            
             
        });
        
        $(this).find(XML_EVENTS_DETAIL_TERMIN).each(function(){
                                                    
            var startDate = $(this).find(XML_EVENTS_START_DATE).text();
            var endDate = $(this).find(XML_EVENTS_END_DATE).text();
            var startTime = $(this).find(XML_EVENTS_START_TIME).text();
            var endTime = $(this).find(XML_EVENTS_END_TIME).text();
                                                                                     
            time = "<h1>Zeiten</h1>";
                                                    
            if(startDate == endDate){
                var startArray = startDate.split('-');
                //2012-12-17
                time = time + "Die Veranstaltung findet am " + startArray[2] + "." + startArray[1] + "." + startArray[0] + " statt.<br/>";
            }else{
                var startArray = startDate.split('-');
                var endArray = endDate.split('-');
                time = time + "Die Veranstalltung geht vom " +  startArray[2] + "." + startArray[1] + "." + startArray[0] + " bis zum " + endArray[2] + "." + endArray[1] + "." + endArray[0] + ".<br/>";
            }
            
            if(startTime == '00:00:00'){
                                                                                     
            }else{
                                                    
                if(endTime == '00:00:00'){
                    var startArray = startTime.split(':');
                    time = time + "Sie beginnt um " + startArray[0] + ":" + startArray[1] + " Uhr.";
                }
                else{
                    var startArray = startTime.split(':');
                    var endArray = endTime.split(':');
                    time = time + "Sie geht von " + startArray[0] + ":" + startArray[1] + " Uhr bis "+ endArray[0] + ":" + endArray[1] + " Uhr.";
                }
            }
                                                                                     
                                                                                     
         });
                                         
                                         
        printOnConsole("ddetailsXMLEvents","Parser3");                                 
        $(this).find(XML_EVENTS_DETAIL_VERANSTALTUNGSORT).each(function(){
                                                               
            var name = $(this).find(XML_EVENTS_DETAIL_NAME).text();
            var street = $(this).find(XML_EVENTS_DETAIL_STRASSE).text();
            var place = $(this).find(XML_EVENTS_DETAIL_ORT).text();
            var zipcode = $(this).find(XML_EVENTS_DETAIL_PLZ).text();
            var phone = $(this).find(XML_EVENTS_DETAIL_TEl).text();
            var fax = $(this).find(XML_EVENTS_DETAIL_FAX).text();
            var desc = $(this).find(XML_EVENTS_DETAIL_BES).text();
            var stop = $(this).find(XML_EVENTS_DETAIL_STOP).text();
                                                               
            eventPlace = '<h1>Veranstaltungsort</h1>' + name + '<br/>' + street + '<br/>' + zipcode + ' ' + place + '<br/>Tele: '+phone + '<br/>Fax: '+fax + '<br/>'+ desc+ '<br/>Haltestelle: '+stop;
                        
        });
                                          
          printOnConsole("ddetailsXMLEvents","Parser4");                                 
        $(this).find(XML_EVENTS_DETAIL_VERANSTALTER).each(function(){
            
            var name = $(this).find(XML_EVENTS_DETAIL_NAME).text();
            var street = $(this).find(XML_EVENTS_DETAIL_STRASSE).text();
            var place = $(this).find(XML_EVENTS_DETAIL_ORT).text();
            var zipcode = $(this).find(XML_EVENTS_DETAIL_PLZ).text();
            var phone = $(this).find(XML_EVENTS_DETAIL_TEl).text();
            var email = $(this).find(XML_EVENTS_DETAIL_EMAIL).text();
            
            organizer = '<h1>Veranstalter</h1>' + name + '<br/>' + street + '<br/>' + zipcode + ' ' + place + '<br/>Tele: '+phone + '<br/>E-Mail: ' + email;
        });
        
        
        printOnConsole("detailsXMLParser","Parser1");
        $("#eventDetailText").html(maindata);
        $("#eventDetailTermin").html(time);
        $("#eventDetailVeranstaltungsort").html(eventPlace);  
        $("#eventDetailVeranstalter").html(organizer);
                                 
                                                 
                                          
        printOnConsole("detailsXMLParser","Parser3");
                                          
    });
                       
	
    ui.hideLoadingScreen();
    
	//wechsel auf die Ergebnisseite
	$.mobile.changePage("#eventsDetailPage");

    
    
}

/******************** Parken *************************/

/******************** Apple Watch Blitzer *************************/
//function provideBlitzerListeForAppleWatch()
//{
//    $.ajax({
//           type: "GET",
//           url: XML_URL_RADAR,
//           dataType: "html",
//           success: function(data)
//           {
//               $(xmlDoc).find(XML_RADAR_BLITZERLISTE).each(function()
//               {
//                   $(this).find(XML_RADAR_BLITZER).each(function()
//                   {
//                        var car = $(this).find(XML_RADAR_BLITZER_FAHRZEUG).text();
//                        var street = $(this).children(XML_RADAR_BLITZER_STRASSE).text();
//                        var place = $(this).find(XML_RADAR_BLITZER_ORT).text();
//                        var district = $(this).find(XML_RADAR_BLITZER_STADTTEIL).text();
//                        var position = $(this).find(XML_RADAR_BLITZER_POSITION).text();
//                        var direction = $(this).find(XML_RADAR_BLITZER_RICHTUNG).text();
//                        var report = $(this).find(XML_RADAR_BLITZER_REPORT).text();
//                        var update = $(this).find(XML_RADAR_BLITZER_UPADATE).text();
//                   });
//               });
//           },
//           error: function()
//           {
//               ui.hideLoadingScreen();
//               ui.showDialog("Fehlermeldung","Um diese Funktion nutzen zu koennen, benoetigen Sie eine Netzwerkverbindung.",false);
//           }
//    });
//}

/********************* Blitzer ***********************/
//function showBlitzerListe()
//{
////    if(showRadarListPage)
////    {
////        showRadarListPage = false;
//        // wechsel auf die Ergebnisseite
//        blitzerListe();
//        $.mobile.changePage("#radarListPage");
////    }
////    else
////    {
//    
////    }
//}

function blitzerListe()
{
    showRadarListPage = true;
    detectAndroidVersion(XML_URL_RADAR,GET_RADAR_LISTE);
}

//Array zum Übertragen der Blitzer an die Watch

function blitzerListeParser(xml)
{
    
    printOnConsole("isteXMLEvents","isteXMLEvents1");
    
	xmlDoc = $.parseXML(xml);
    
	$(xmlDoc).find(XML_RADAR_BLITZERLISTE).each(function()
    {
        var count = parseInt($(this).attr(XML_LISTE_ATTRIBUTE_COUNT));
              
        if(count > 0)
        {
            printOnConsole("blitzerListeParser","Count: "+count);
                                                
//            positionList = parseInt($(this).attr(XML_LISTE_ATTRIBUTE_POSITION)); // fehler in dieser zeile
                                            
            printOnConsole("blitzerListeParser","positionList "+positionList);
                                                
            var listItem = '';

            $(this).find(XML_RADAR_BLITZER).each(function()
            {
                var car = $(this).find(XML_RADAR_BLITZER_FAHRZEUG).text();
                var street = $(this).children(XML_RADAR_BLITZER_STRASSE).text();
                var place = $(this).find(XML_RADAR_BLITZER_ORT).text();
                var district = $(this).find(XML_RADAR_BLITZER_STADTTEIL).text();
                var position = $(this).find(XML_RADAR_BLITZER_POSITION).text();
                var direction = $(this).find(XML_RADAR_BLITZER_RICHTUNG).text();
                var report = $(this).find(XML_RADAR_BLITZER_REPORT).text();
                var update = $(this).find(XML_RADAR_BLITZER_UPADATE).text();
                  
                listItem = listItem + '<li class="noMarginNoPadding" data-icon="false">';
                                                
                                            
                var test = '<table style="width: 100%;"><tr><td align="left">';
                if(car.length > 0){
                                                 
                    test = test+ '<h3 class="listTitle">Mobiler Blitzer: '+ car +'</h3>';
                }
                test = test + '</td><td align="right">';
                
                if(update.length > 0){
                    test = test+ '<div class="listDate" >'+ update +'</div>';
                }
                
                listItem = listItem + test + '</td></tr></table>';
                                                 
                var tmp = '';
                if(place.length > 0){
                                                 
                    tmp = tmp + place + ', ';
                }
                 
                if(district.length > 0){
                                                 
                    tmp = tmp + district +', ';
                }
                                                 
                if(street.length > 0){
                                                 
                    tmp = tmp + street + ', ';
                }
                                                 
                if(position.length > 0){
                                                 
                    tmp  = tmp  + position;
                }
                
                    listItem = listItem +'<div class="listText">Standort: --> ' + tmp;
                
                var tmp2 = '';
                if(direction.length > 0){
                                                 
                    tmp2  = tmp2  + ' - Richtung: '+ direction;
                }
                listItem = listItem  + tmp2 + '</div>';
                                                 
                var tmp3 = '';
                if(report.length > 0){
                    tmp3 = tmp3 + 'Gemeldet von: '+ report;
                }
                listItem = listItem + '<div class="listText">' + tmp3 + '</div>';
               
                                                                               
                listItem = listItem + '</li>';
                                                                                            
                                                                                            
            });
                                                
            printOnConsole("listeXMLEvents","listItem : "+listItem);
                                                
            $("#radarSearch").html(listItem);
                                                
            $.mobile.silentScroll(0);
                                                
            ui.hideLoadingScreen();
                                                
            if(showRadarListPage) {
           
                showRadarListPage = false;
                //wechsel auf die Ergebnisseite
                $.mobile.changePage("#radarListPage");
            }else{
                refreshList('#radarSearch');
            }
        }
        else{
                                                
            ui.hideLoadingScreen();
                                                
            var emptyArray = [];
//            applewatch.sendMessage(JSON.stringify(emptyArray), "requestedList")
                                                
//            ui.showDialog("Kein Blitzer","Zurzeit sind keine Blitzermeldungen vorhanden. Wir wuenschen gute Fahrt.", false);
            $("#radarSearch").html("<li style=\"color: red; margin: 10px 0px;\">Zurzeit sind keine Blitzermeldungen vorhanden. Wir wünschen gute Fahrt.</li>");
            if(showRadarListPage) {
                showRadarListPage = false;
                //wechsel auf die Ergebnisseite
                $.mobile.changePage("#radarListPage");
            }else{
                refreshList('#radarSearch');
            }
                                                
        }
    });
}

/********************* News **************************/
function newsList(){

    printOnConsole("newsList","newsList");
    showSpecialListPage = true;
    
    //Auslesen der Versionsnummer aus dem lokalen Speicher
	detectAndroidVersion(XML_URL_NEWS, GET_NEWS_LISTE);
    
}

function prevNewsList(){
    
    newsPositionList = newsPositionList - NEWS_COUNT;
    
    detectAndroidVersion(XML_URL_NEWS + '?position=' + newsPositionList, GET_NEWS_LISTE);
}

function nextNewsList(){

    newsPositionList = newsPositionList + NEWS_COUNT;
    
    detectAndroidVersion(XML_URL_NEWS +'?position=' + newsPositionList, GET_NEWS_LISTE);
}

function newsListParser(xml){
    
    printOnConsole("newsListParser","newsListParser");
    
	xmlDoc = $.parseXML(xml);
    
	$(xmlDoc).find(XML_NEWS_NEWSLISTE).each(function()
    {
        var count = parseInt($(this).attr(XML_LISTE_ATTRIBUTE_COUNT));
        
        if(count > 0){
                                            
            printOnConsole("newsListParser","Count: "+count);
                                                    
            newsPositionList = parseInt($(this).attr(XML_LISTE_ATTRIBUTE_POSITION));
                                                    
            printOnConsole("newsListParser","positionList " + newsPositionList);
                                                    
            var listItem = '';
                                                    
            $(this).find(XML_NEWS_NEWS).each(function()
            {
            
                var id = $(this).find(XML_NEWS_ID).text();
                var townNews = $(this).find(XML_NEWS_ORT).text();
                var titleNews = $(this).find(XML_NEWS_TITEL).text();
                var subTitleNews = $(this).find(XML_NEWS_SUBTITEL).text();
                var breakingNews = $(this).find(XML_NEWS_EILMELDUNG).text();
                var dateNews = $(this).find(XML_NEWS_DATUM).text();
                var timeNews = $(this).find(XML_NEWS_UHRZEIT).text();
        
                printOnConsole("newsListParser","id "+id);
                
                                         
                /*listItem = listItem + '<li class="noMarginNoPadding" data-icon="false"><a onClick="newsDetails(\'' + id + '\')">' +
                        '<table style="width: 100%;"><tr>'+
                        '<td align="left"><div class="specialListTitle" >'+ titleNews +'</div></td>'+
                        '<td align="right"><div class="specialListTime" >'+ dateNews +'</div></td></tr></table>'+
                        '<div class="specialListSubTitle">' + subTitleNews + '</div>'+
                        '<div class="specialListText">' + townNews + '</div></a></li>'*/
                
                //printOnConsole("newsListParser","breakingNews: " + titleNews.replace(/\"/g,"/\""));
                if(breakingNews === 'Y'){
                                         
                  
                                         
                    listItem = listItem + '<li class="noMarginNoPadding"><a onClick="newsDetails(\'' + id + '\',\'' + titleNews.replace(/\"/g,"") + '\',\'' + subTitleNews.replace(/\"/g,"") + '\',\''+ dateNews + '\',\'' + townNews + '\' )">' +
                                         '<div class="listSpecialTitle">*** Eilmeldung ***</div>'+
                                         '<h3 class="listTitle" >'+ titleNews + '</h3>'+
                                         '<div class="listSubTitle">' + subTitleNews + '</div>'+
                                         '<div class="listText">'+timeNews + ' ' + dateNews + ' ' + townNews + '</div></a></li>';
                }
                else{
                    
                    listItem = listItem + '<li ><a onClick="newsDetails(\'' + id + '\',\''+titleNews.replace(/\"/g,"") +'\',\''+ subTitleNews.replace(/\"/g,"") + '\',\''+ dateNews + '\',\'' + townNews + '\' )">' +
                                      '<h3  class="listTitle" >'+ titleNews +'</h3>'+
                                      '<div class="listSubTitle">' + subTitleNews + '</div>'+
                                      '<div class="listText">'+ dateNews + ' ' + townNews + '</div></a></li>';
                    }
            });
                                                    
            printOnConsole("listeXMLEvents","listItem : "+listItem);
                                            
            $("#specialList").html(listItem);
                                            
            //Navigation
            var naviButton = '';
                                                    
            //Zur�ck Button
            if(newsPositionList > 0){
                                                    
                $("#specialLeftNavi").html('<a onClick="prevNewsList()" data-role="button" class="prevButton" data-inline="true">Zur&uuml;ck</a>');
            }else{
                $("#specialLeftNavi").html('');
            }
                                                    
            //Weiter Button
            var tmp = newsPositionList + NEWS_COUNT;
                                                    
            if(tmp < count){
                                            
                $("#specialRightNavi").html('<a onClick="nextNewsList()" class="nextButton" data-role="button" data-inline="true">Weiter</a>');
            }
            else{
                $("#specialRightNavi").html('');
            }
                                            
                                            
            $("#specialListNavi").trigger("create");
            $.mobile.silentScroll(0);
                                            
            ui.hideLoadingScreen();
            
           
            if(showSpecialListPage){
                showSpecialListPage = false;
                //wechsel auf die Ergebnisseite
                $.mobile.changePage("#specialListPage");
            }else{
                refreshList('#specialList');                                                                                                                        
            }
        }else{
        
            ui.hideLoadingScreen();
                                            
            ui.showDialog("Keine News","Zurzeit sind keine News-Meldungen vorhanden.",false);
        }
                                            
                                                    
    });

}

//da die Daten aus der Liste auch in der Detailsansicht dargestellt werden sollen werden sie in globalen Variablen gespeichert damit m�ssen sie nicht nocht einmal �bertragen werden
var newsDetailsTitle = '';
var newsDetailsSubTitle = '';
var newsDetailsDate = '';
var newsDetailsTown = '';

function newsDetails(id, title, subtitle, date, town){

    newsDetailsTitle = title;
    newsDetailsSubTitle = subtitle;
    newsDetailsDate = date;
    newsDetailsTown = town;
    
    printOnConsole("newsDetails","newsDetails " +title );
    
    //Auslesen der Versionsnummer aus dem lokalen Speicher
	detectAndroidVersion(XML_URL_NEWS_DETAIL + '?id=' + id, GET_NEWS_DETAILS);
    
}

function newsDetailsParser(xml){

    printOnConsole("newsDEtailsParser","newsDEtailsParser");
    
	xmlDoc = $.parseXML(xml);
    
	$(xmlDoc).find(XML_NEWS_NEWSLISTE).each(function()
    {
                                                                                      
        var item = '<div class="detailTitle">'+ newsDetailsTitle +'</div><div class="detailSubTitle">' + newsDetailsSubTitle + '</div><div class="detailDate">' +  newsDetailsDate + ' ' + newsDetailsTown + '</div>';
        
        printOnConsole("newsDetailsParser","Item: "+item);
                                            
        $(this).find(XML_NEWS_NEWS).each(function()
        {
                                                                            
           var article = $(this).find(XML_NEWS_ARTIKEL).text();
                    
                                                                             
           item = item + '<div class="detailText">' + article +'</div>';
                                            
                                         
        });
                                            
        printOnConsole("newsDetailsParser","Item: "+item);                                   
        
        $("#newsDetailText").html(item);
                                            
     });
	
    ui.hideLoadingScreen();
    
	//wechsel auf die Ergebnisseite
	$.mobile.changePage("#specialDetailPage");
                                             
}
                                             
/****************** VERKEHR  ******************/
function trafficList(){
                                            
    showTrafficListPage = true;
    detectAndroidVersion(XML_URL_TRAFFIC,GET_TRAFFIC_LIST);                                         
                                        
}
                                             
function trafficListParser(xml){
                                             
    printOnConsole("trafficListParser","trafficListParser1");
                                             
    xmlDoc = $.parseXML(xml);
                                             
    $(xmlDoc).find(XML_TRAFFIC_VERKEHR_LISTE).each(function()
    {
        var count = parseInt($(this).attr(XML_LISTE_ATTRIBUTE_COUNT));
                                                                                            
        if(count > 0)
        {
            printOnConsole("trafficListParser","Count: "+count);
                                                                                            
            var listItem = '';
                                                                                            
            $(this).find(XML_TRAFFIC_VERKEHR).each(function()
            {
                var street = $(this).find(XML_TRAFFIC_VERKEHR_STRASSE).text();
                var direction = $(this).find(XML_TRAFFIC_VERKEHR_RICHTUNG).text();
                var report = $(this).find(XML_TRAFFIC_VERKEHR_MELDUNG).text();
                var reportBy = $(this).find(XML_TRAFFIC_VERKEHR_GEMELDET).text();
                var update = $(this).find(XML_TRAFFIC_VERKEHR_UPDATED).text();
                                                                                                                                   
                listItem = listItem + '<li class="noMarginNoPadding" data-icon="false"><table style="width: 100%;"><tr><td align="left"><h3 class="listTitle" >' + street + '</h3></td><td align="right">';
                                                                                                                                   
                if(update.length > 0){
                    listItem = listItem+ '<div class="listDate" >'+ update +'</div>';
                }
                                                                                                                                   
                listItem = listItem + '</td></tr></table>';
                                                                                                                                   
                if(direction.length > 0){
                    listItem = listItem +'<div class="listText">' + direction + '</div>';
                }
                                                                                                                                   
                                                                                                                                   
                if(report.length > 0){
                    listItem = listItem + '<div class="listText">' + report + '</div>';
                }
                                                                                                                                   
                                                                                                                                   
                if(reportBy.length > 0){
                    listItem = listItem + '<div class="listText">Gemeldet von: '+ reportBy + '</div>';
                }
                                                                                                                                   
                                                                                                                                   
                                                                                                                                   
                listItem = listItem + '</li>';
                                                                                                                                   
                                                                                                                                   
            });
                                                                                            
            printOnConsole("trafficListParser","listItem : "+listItem);
                                                                                            
            $("#trafficSearch").html(listItem);
                                                                                            
            $.mobile.silentScroll(0);
                                                                                            
            ui.hideLoadingScreen();
            
            if(showTrafficListPage){
                showTrafficListPage = false;
                //wechsel auf die Ergebnisseite
                $.mobile.changePage("#trafficListPage");
            }else{
                refreshList('#trafficSearch');
            }
            
                                                                                            
        }
        else{
                                                                                            
            ui.showDialog("Kein Stau","Zurzeit sind keine Staumeldungen vorhanden. Wir wunschen gute Fahrt.",false);
                                                                                            
        }
    });                                           
                                             
                                             
}
                                             

/********************* WETTER ************************/
function weather(){
  
    detectAndroidVersion(XML_URL_WEATHER,GET_WEATHER);  
  
}
                                             
                                             
function weatherParser(xml){
                                             
     
                                             
    xmlDoc = $.parseXML(xml);
   
    $(xmlDoc).find(XML_WEATHER_WETTER_LIST).each(function()
    {	
        var count = parseInt($(this).attr(XML_LISTE_ATTRIBUTE_COUNT));
        printOnConsole("weatherParser","Count: "+count);
                                                                                          
        if(count > 0)
        {
                printOnConsole("weatherParser","Count: "+count);
                                                                                          
                $(this).find(XML_WEATHER_WETTER).each(function()
                {
                        var report = $(this).find(XML_WEATHER_MELDUNG).text();
                        var current = $(this).find(XML_WEATHER_AKTUELL).text();
                        var min = $(this).find(XML_WEATHER_MIN).text();
                        var max = $(this).find(XML_WEATHER_MAX).text();
                        var pic = $(this).find(XML_WEATHER_SYMBOL).text();
                                                                                                                                
                        var element = '<tr>';
                                                                                                                                
                        if(pic.length > 0){
                            element = element + '<td id="weatherPic" ><img src="' + pic + '" class="weatherPic" /><td>';
                        }
                                                                                                                                
                        if(current.length > 0){
                                                                                                                                
                            element = element + '<td><div id="weatherNowText" class="weatherNowText">Aktuell:</div><div class="weatherNowNumber">' + current + ' Grad</div></td>';
                        }
                                                                                                                                
                        $("#weatherPicAndText").html(element + '</tr>');
                                                                                                                                
                        element = '';
                                                                                                                                
                        if(min.length > 0 || max.length > 0 ){
                                                      
                                                      element = '<div class="weatherToDayTitle">Heute erwartet:</div><div class="weatherToDayMin" >';
                                                      
                                                      if(min.length > 0){
                                                      
                                                      element = element + 'min: '+ min + ' Grad ';
                                                      }
                                                      
                                                      if(max.length > 0){
                                                      
                                                      element = element + 'max: '+ max + ' Grad ';
                                                      }
                                                      
                        }
                                                      
                        $("#weatherToDay").html(element);
                                                                                                                                
                        $("#weatherReport").html(report);
                                                                                                                                
                    });
                                                 
                    ui.hideLoadingScreen();
                                                                                          
                    //wechsel auf die Ergebnisseite
                    $.mobile.changePage("#weatherPage");
                                                                                          
            }
            else{
                                                 
                ui.showDialog("Kein Wetter Infos","Zurzeit sind keine Wettermeldungen vorhanden.",false);
            }
    });
}
                                             
                                             
    /*****************************************************/

/**
 * Ermittelt welche Android Version das Ger�t hat um zu entscheiden ob die XML mit Cache oder ohne geladen wird
 * @param url - Adresse von der die XML geladen werden soll - Datentyp: String
 */
function detectAndroidVersion(url,succesFunc){
	
    getXML(url,false,succesFunc);
}

/**
 * L�dt die XML vom Server
 * @param url - Adresse von der die XML geladen werden soll - Datentyp: String
 * @param useCache - benutzng des Cache des Parsers - Datentyp: Boolean -> true Chache ein, false Chache aus
 * @param succesFunc - welche Funktion nach dem Erfolgeichen Zugriff aufgerufen werden soll - Datentyp: int - 1: Suche, 2: Liste, 3: Detail
 */
function getXML(url,useCache,succesFunc){
	
	printOnConsole("getXMl","getXML: "+url + " "+useCache + " " + succesFunc);
	
    ui.showLoadingScreen("");
                                             
	switch(succesFunc){
		
        case GET_SEARCH://Such Config f�r Shop und Gastro
            $.ajax({
                   type: "GET",
                   cache: useCache,
                   url: url,
                   dataType: "html",
                   success: searchConfigXMLParser,
                   error: function(xhr, textStatus,error){
                         ui.hideLoadingScreen();
                   }
                });
			break;
		
        case GET_DETAIL: //Details eines Shops oder Gastro
            
            ui.showLoadingScreen("");
            
			$.ajax({
                   type: "GET",
                   cache: useCache,
                   url: url,
                   dataType: "html",
                   success: detailsXMLParser,
                   error: function(xhr, textStatus, error){
                        ui.hideLoadingScreen();
                        ui.showDialog("Fehlermeldung","Um diese Funktion nutzen zu koennen, benoetigen Sie eine Netzwerkverbindung.",false);
                   }
            });
            
			break;
        case GET_EVENTS_DETAILS: ////Details einer Veranstaltung
            
            ui.showLoadingScreen("");
            
			$.ajax({
                   type: "GET",
                   cache: useCache,
                   url: url,
                   dataType: "html",
                   success: detailsXMLEvents,
                   error: function(xhr, textStatus, error){
                        ui.hideLoadingScreen();
                        ui.showDialog("Fehlermeldung","Um diese Funktion nutzen zu koennen, benoetigen Sie eine Netzwerkverbindung.",false);
                   }
            });
            break;
        case GET_RADAR_LISTE:
            
            ui.showLoadingScreen("");
            
			$.ajax({
                   type: "GET",
                   cache: useCache,
                   url: url,
                   dataType: "html",
                   success: blitzerListeParser,
                   error: function(xhr, textStatus, error){
                        ui.hideLoadingScreen();
                        ui.showDialog("Fehlermeldung","Um diese Funktion nutzen zu koennen, benoetigen Sie eine Netzwerkverbindung.",false);
                   }
            });
            
            /*
            $('#radarSearch').ajaxComplete(function() {
                $('#radarSearch').listview('refresh');
            });
             */

            
            break;
        case GET_NEWS_LISTE:
            
            ui.showLoadingScreen("");
            
			$.ajax({
                   type: "GET",
                   cache: useCache,
                   url: url,
                   dataType: "html",
                   success: newsListParser,
                   error: function(xhr, textStatus, error){
                        ui.hideLoadingScreen();
                        ui.showDialog("Fehlermeldung","Um diese Funktion nutzen zu koennen, benoetigen Sie eine Netzwerkverbindung.",false);
                   }
            });
            /*
            $('#specialList').ajaxComplete(function() {
                $('#specialList').listview('refresh');
            });
            */
            break;
        case GET_NEWS_DETAILS:
            
            ui.showLoadingScreen("");
            
			$.ajax({
                   type: "GET",
                   cache: useCache,
                   url: url,
                   dataType: "html",
                   success: newsDetailsParser,
                   error: function(xhr, textStatus, error){
                        ui.hideLoadingScreen();
                        ui.showDialog("Fehlermeldung","Um diese Funktion nutzen zu koennen, benoetigen Sie eine Netzwerkverbindung.",false);
                   }
            });
            
            break;
        case GET_TRAFFIC_LIST:
                                             
            ui.showLoadingScreen("");
                                             
            $.ajax({
                    type: "GET",
                    cache: useCache,
                    url: url,
                    dataType: "html",
                    success: trafficListParser,
                    error: function(xhr, textStatus, error){
                            ui.hideLoadingScreen();
                            ui.showDialog("Fehlermeldung","Um diese Funktion nutzen zu koennen, benoetigen Sie eine Netzwerkverbindung.",false);
                        }
                                                    
            });
            
            /*
            $('#trafficSearch').ajaxComplete(function() {
                $('#trafficSearch').listview('refresh');
            });
             */
                                    
            break;
        case GET_WEATHER:
            ui.showLoadingScreen("");
                                             
            $.ajax({
                    type: "GET",
                    cache: useCache,
                    url: url,
                    dataType: "html",
                    success: weatherParser,
                    error: function(xhr, textStatus, error){
                            ui.hideLoadingScreen();
                            ui.showDialog("Fehlermeldung","Um diese Funktion nutzen zu koennen, benoetigen Sie eine Netzwerkverbindung.",false);
                    }
                   
            });
        break;
                                             
                                            

   
       	}
}

function errorGetXML(){

}

function sectorOrCategoire(sector,categorie){
	
	if(categorie == 'all' || categorie.length == 0){
        return  sector;
	}
	else{
		return categorie;
	}
}

function postXML(url,useCache,whichPost,sector,cat,pos,area){
	 
    printOnConsole("postXML","postXML");
	
    ui.showLoadingScreen('');
	var tmp = '';
	
    switch(whichPost){
	 	case POST_LISTE_SECTOR://Suche nach Branchen
	 		
	 		tmp = sectorOrCategoire(sector,cat);
	 		
            if(area.length == 0){
	 			area = 'all';
	 		}
	 		
            //printOnConsole("POSTXML",": Branche: "+tmp + " Pos: "+pos + " Area: " + area);
                                             
	 		$.ajax({
                   type: 'POST',
                   cache: useCache,
                   url: url,
                   data: { branche:  tmp, position: pos, stadtgebiet: area },
                   dataType: "html",
                   success: listeXMLParser,
                   error: function(xhr, textStatus, error){
                        ui.hideLoadingScreen();
                        ui.showDialog("Fehlermeldung","Um diese Funktion nutzen zu koennen, benoetigen Sie eine Netzwerkverbindung.",false);
                   }
            });
                                             
            
			break;
	 	case POST_LISTE_KEYWORD:
	 		
            $.ajax({
                   type: 'POST',
                   cache: useCache,
                   url: url,
                   data: { firmenname:  sector, position: pos, keyword: cat, stadtgebiet: area },
                   dataType: "html",
                   success: listeXMLParser,
                   error: function(xhr, textStatus, error){
                        ui.hideLoadingScreen();
                        ui.showDialog("Fehlermeldung","Um diese Funktion nutzen zu koennen, benoetigen Sie eine Netzwerkverbindung.",false);
                   }
            });
            
        
            
            break;
	 	case POST_GASTRO_SECTOR:
	 		
	 		tmp = sectorOrCategoire(sector,cat);
           
	 		if(area.length == 0){
	 			area = 'all';
	 		}
                                             
	 		
	 		$.ajax({
                   type: 'POST',
                   cache: useCache,
                   url: url,
                   data: { gastro: 1, branche:  tmp, position: pos, stadtgebiet: area },
                   dataType: "html",
                   success: listeXMLParser,
                   error: function(xhr, textStatus, error){
                        ui.hideLoadingScreen();
                        ui.showDialog("Fehlermeldung","Um diese Funktion nutzen zu koennen, benoetigen Sie eine Netzwerkverbindung.",false);
                   }
            });
            
          
            
            break;
        case POST_GASTRO_KEYWORD:
            printOnConsole("POSTXML","URL: " + url);
            printOnConsole("POSTXML",": Firma: " + sector + " Pos: "+pos + "keyword: " + cat + " Area: " + area);
	 		
	 		$.ajax({
                   type: 'POST',
                   cache: useCache,
                   url: url,
                   data: { gastro: 1, firmenname:  sector, position: pos, keyword: cat, stadtgebiet: area },
                   dataType: "html",
                   success: listeXMLParser,
                   error: function(xhr, textStatus, error){
                        ui.hideLoadingScreen();
                        ui.showDialog("Fehlermeldung","Um diese Funktion nutzen zu koennen, benoetigen Sie eine Netzwerkverbindung.",false);
                   }
            });
            
         
            
            break;
        case POST_INSIDER_GASTRO_LISTE:
                                             
            $.ajax({
                    type: 'POST',
                    cache: useCache,
                    url: url,
                    data: { gastro: 1,position: pos },
                    dataType: "html",
                    success: listeXMLInsider,
                    error: function(xhr, textStatus, error){
                            ui.hideLoadingScreen();
                            ui.showDialog("Fehlermeldung","Um diese Funktion nutzen zu koennen, benoetigen Sie eine Netzwerkverbindung.",false);
                    }
            });
     
                                             
            break;
        case POST_INSIDER_SHOP_LISTE:
                                             
            $.ajax({
                    type: 'POST',
                    cache: useCache,
                    url: url,
                    data: { position: pos },
                    dataType: "html",
                    success: listeXMLInsider,
                    error: function(xhr, textStatus, error){
                            ui.hideLoadingScreen();
                            ui.showDialog("Fehlermeldung","Um diese Funktion nutzen zu koennen, benoetigen Sie eine Netzwerkverbindung.",false);
                    }
            });
          
                                             
            break;
      case POST_GASTRO_TIPPS:
            
            printOnConsole("serach","*************************************** cat: "+cat + " position: "+pos + " area: "+area + "***************************************");
            
            $.ajax({
                    type: 'POST',
                    cache: useCache,
                    url: url,
                    data: { gastro: 1, kind: cat, position: pos, stadtgebiet: 'all' },
                    dataType: "html",
                    success: listeXMLParser,
                    error: function(xhr, textStatus, error){
                                    ui.hideLoadingScreen();
                                    ui.showDialog("Fehlermeldung","Um diese Funktion nutzen zu koennen, benoetigen Sie eine Netzwerkverbindung.",false);
                    }
            });
                                
                                       
    }
	
            
}

//EVENTS
/*
 * �bermittelt die Kategorien der Veranstaltungen per Post_Request an den Server
 */
function postEventsCategorie(url,useCache,pos,cat){
    
    printOnConsole("eventsXML","categeorieEvents: "+cat);
    ui.showLoadingScreen('');
        
    $.ajax({
        type: 'POST',
        cache: useCache,
        url: url,
        data: { kategorie:  cat, position: pos },
        dataType: "html",
        success: listeXMLEvents,
        error: function(xhr, textStatus, error){
           
           ui.hideLoadingScreen();
           ui.showDialog("Fehlermeldung","Um diese Funktion nutzen zu koennen, benoetigen Sie eine Netzwerkverbindung.",false);
        }
     });
    
    /*$('#eventsSearch').ajaxComplete(function() {
        $('#eventsSearch').listview('refresh');
    });*/
}




var ui = {
    back: false,
    // Ladeanmitation Anzeigen
    showLoadingScreen: function(){
        var msg = ""
        $.mobile.showPageLoadingMsg("b", msg);
    },
    // Ladeanmitation nicht mehr anzeigen
    hideLoadingScreen: function(){
        $.mobile.hidePageLoadingMsg();
    },
    showDialog: function(title, text, back){
        this.back = back;
        navigator.notification.alert(text,                 // message
                                     this.alertDismissed,       // callback
                                     title,                // title
                                     "OK"                  // buttonName
                                     );

    },
    alertDismissed: function(){
        
        if(this.back){
            navi.goBack();
        }
        
    },
    impressumsDialog: function(version) {
        
        navigator.notification.confirm(
                                       "Sie nutzen die App Mainz & More in der Version "+ version, // message
                                       this.impressumCallback,            // callback to invoke with index of button pressed
                                       'App Version',           // title
                                       'Schließen,Impressum'         // buttonLabels
                                       );

    },
    impressumCallback: function(buttonIndex){
        
        if(buttonIndex == 2){
            navi.showExternalPage('http://195.145.244.220/mainzundmore/impressum.php');
        }
    }
}

var DB_NAME = "blitzerDatabase";
var DB_VERSION = "1.0";
var DB_DISPLAY_NAME = "BlitzerDatenbankMainzandMore";
var DB_SIZE = 512000;
    
var TABLE_NAME = "blitzermeldungen";
var COLUMN_ID = "id";
var COLUMN_MOBILE = "mobile";
var COLUMN_STREET = "street";
var COLUMN_TOWN = "town";
var COLUMN_DISTRICT = "district";

var blitzer = {

resultArray: [],
mobileCounter: 0,
streetCounter: 0,
townCounter: 0,
districtCounter: 0,
mobilesArray: [],
streetsArray: [],
townsArray: [],
districtsArray: [],

// FUNKTION ZUM PARSEN DER LOKALEN XML
xmlParser: function(){
    $.ajax({
           url: "xml/blitzer.xml",
           dataType: "xml",
           success: function(results){
               blitzer.resultArray = results;
               $(blitzer.resultArray).find("mobile").each(function() { blitzer.mobileCounter++; });
               $(blitzer.resultArray).find("street").each(function() { blitzer.streetCounter++; });
               $(blitzer.resultArray).find("town").each(function() { blitzer.townCounter++; });
               $(blitzer.resultArray).find("district").each(function() { blitzer.districtCounter++; });
               blitzer.arrayMaker();
           }
    });
},
    
// FUNKTION ZUM ERSTELLEN DER ARRAYS AUS DEN GEPARSTEN DATEN
arrayMaker: function(){
    $(blitzer.resultArray).find("mobile").each(function(i) { blitzer.mobilesArray[i] = $(this).text(); });
    $(blitzer.resultArray).find("street").each(function(i) { blitzer.streetsArray[i] = $(this).text(); });
    $(blitzer.resultArray).find("town").each(function(i) { blitzer.townsArray[i] = $(this).text(); });
    $(blitzer.resultArray).find("district").each(function(i) { blitzer.districtsArray[i] = $(this).text(); });
    blitzer.openBlitzerDatabase();
},
    
openBlitzerDatabase: function(){
    var sdb = window.openDatabase(DB_NAME, DB_VERSION, DB_DISPLAY_NAME, DB_SIZE);
    sdb.transaction(blitzer.createDatabase, blitzer.errorOnOpening, blitzer.successOpening);
},
    
createDatabase: function(tx){
    tx.executeSql('DROP TABLE IF EXISTS ' + TABLE_NAME);
    tx.executeSql('CREATE TABLE IF NOT EXISTS ' + TABLE_NAME + ' (' + COLUMN_ID + ' INTEGER PRIMARY KEY AUTOINCREMENT, ' + COLUMN_MOBILE + ' TEXT, ' + COLUMN_STREET + ' TEXT, ' + COLUMN_TOWN + ' TEXT, ' + COLUMN_DISTRICT + ' TEXT)');
    for(var i = 0; i < blitzer.streetCounter; i++){
        tx.executeSql('INSERT INTO ' + TABLE_NAME + ' ( ' + COLUMN_MOBILE + ', ' + COLUMN_STREET + ', ' + COLUMN_TOWN + ', ' + COLUMN_DISTRICT + ' ) VALUES ( "' + blitzer.mobilesArray[i] + '", "' + blitzer.streetsArray[i] + '", "' + blitzer.townsArray[i] + '", "' + blitzer.districtsArray[i] + '" )');
    }
    tx.executeSql('SELECT * FROM ' + TABLE_NAME, [], blitzer.queryTable, blitzer.errorOnQuery);
},
    
queryTable: function(tx, results){
    for(var i = 0; i < blitzer.mobileCounter; i++){
        $("#radarMobileList").append('<li class="mobiles" onclick="toMobile(\'' + results.rows.item(i).mobile + '\')"><a href="">' + results.rows.item(i).mobile + '</a></li>');
    }
    for(var i = 0; i < blitzer.streetCounter; i++){
        $("#streetList").append('<li class="streets" onclick="toStreet(\'' + results.rows.item(i).street + '\')"><a href="">' + results.rows.item(i).street + '</a></li>');
    }
    for(var i = 0; i < blitzer.townCounter; i++){
        $("#townList").append('<li class="towns" onclick="toTown(\'' + results.rows.item(i).town + '\')"><a href="">' + results.rows.item(i).town + '</a></li>');
    }
    for(var i = 0; i < blitzer.districtCounter; i++){
        $("#districtList").append('<li class="districts" onclick="toDistrict(\'' + results.rows.item(i).district + '\')"><a href="">' + results.rows.item(i).district + '</a></li>');
    }
},

errorOnQuery: function(qE){
    console.log("Could not execute the query: " + qE);
},
    
errorOnOpening: function(e){
    console.log("Could not open the database: " + e);
},
    
successOpening: function(){
    console.log("Finished opening the database!");
}
};

/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    
    appGroupIdentifier: "group.de.info.networking.mainz.and.more",
    
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
        document.addEventListener('resume', this.onResume, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicity call 'app.receivedEvent(...);'
    onDeviceReady: function()
    {
        FastClick.attach(document.body);

        //setzt die Werbung auf der Hauptseite
        advertise.setAdMain();

        //audio abspielen
        if( plattform.isAndroidDevice() )
        {
        	playAudio('file:///android_asset/www/audio/APP.mp3');
        }
        else
        {
        	playAudio('audio/APP.mp3');
        }
        
        StatusBar.show();
    	
        //initialisiere das applewatch object auf jeden fall bevor die blitzer komplett
        //geparst wurden, um fehler zu vermeiden, da über das applewatch object die
        //blitzer an die watch verschickt werden
//        applewatch.init(function()
//                        {
//                            console.log("successfully initialized apple watch plugin");
//                        
//                            applewatch.registerNotifications(app.watchRegisterSuccess, app.watchRegisterFailure);
//
//                            applewatch.sendMessage("switchToNextInterface", "didStartApp");
//                        
//                            applewatch.addListener("watchRequest", function(message)
//                                                   {
//                                                       blitzerListe();
//                                                   }, function()
//                                                   {
//                                                   
//                                                   });
//                        
//                            applewatch.addListener("iphoneAppStatusRequest", function(message)
//                                                   {
//                                                       if (message == "awake")
//                                                       {
//                                                           applewatch.sendMessage("switchToNextInterface", "didStartApp");
//                                                       }
//                                                   }, function()
//                                                   {
//                                                   
//                                                   });
//                        },
//                        function()
//                        {
//                            console.log("failed to initialize apple watch plugin");
//                        },
//                        app.appGroupIdentifier);
        
        //ERSTELLE DIE KOMPLETTE DATENBANK
        blitzer.xmlParser();
        
        pushRegister();

        //WORKAROUND DES HEADER-FOOTER-BUMP BUGS
        $(document).on('blur', 'input, textarea', function() {
            setTimeout(function() {
                window.scrollTo(document.body.scrollLeft, document.body.scrollTop);
            }, 0);
        });
        
        //DYNAMISCHE BILDSCHIRMANPASSUNG FÜR ANDROID
       /*$(".rightArrow").css("left", (window.innerWidth - 25) + "px");
        $(".sliderNavigation").css("padding-left", (window.innerWidth / 14.4) + "px");
        
        $(".kachel").css("height", (window.innerHeight / 4.22) + "px");
        $(".kachel").css("width", (window.innerWidth / 2.37) + "px");
        
        $("#karte").css('width', window.innerWidth + 'px');
        $("#karte").css('height', (window.innerHeight * 0.8) + 'px');*/
    },
    
    onResume: function()
    {
//        blitzerListe();
//        applewatch.sendMessage("switchToNextInterface", "didStartApp");
    }
    
};

/******* Kirchen ******/
/*** DOM ST MARTIAN ***/
var domStMartinBild = "<img  src=\"bilder/sehenswert/kirchen/stMartinsDom/st.martinsdom_iphone_port.jpg\"/>";
var domStMartinTitel = "Dom St. Martin – 1000 Jahre Stadtgeschichte";
var domStMartinText_1 = "\"Dieser Dom über der Rheinebene wäre mir in all seiner Macht und Größe im Gedächtnis geblieben, wenn ich ihn auch nie wieder gesehen hätte\", schrieb die Schriftstellerin Anna Seghers. Der gewaltige Dom gibt auch tausend Jahre nach seiner Erbauung der Stadt ihr Gesicht."
var domStMartinBildGallery = "<img class=\"detailMinPic\" src=\"bilder/sehenswert/kirchen/stMartinsDom/iphone-dom1.jpg\" alt=\"\" />";
var domStMartinText_2 = "Mainz, am Schnittpunkt alter Völkerstraßen, wurde mit dem Wirken des heiligen Bonifatius ab 746/47 zum kirchlichen Zentrum nördlich der Alpen; es erhielt den Titel \"Heiliger Stuhl\", als Willigis (975-1011) in Mainz regierte.Willigis, Erzbischof und zugleich Erzkanzler des Deutschen Reiches, legte 975 den Grundstein für den Dom, geschaffen nach dem Vorbild von St. Peter in Rom. Sieben Königskrönungen fanden im Lauf der Jahrhunderte im Mainzer Dom statt. Allerdings überstand der Neubau den Tag der Weihe im August 1009 nicht - ein Brand zerstörte das Bauwerk, und der Dom konnte erst 1036 erneut genutzt werden. Willigis wurde deshalb in St. Stephan beigesetzt.";
var domStMartinText_3 = "<div class=\"detailSubSubTitle\">Standort:</div>55116 Mainz Markt 10<div class=\"detailSubSubTitle\"> Öffnungszeiten</div>1. März bis 31. Oktober:<br />Mo bis Fr: 9 bis 18.30 Uhr<br />Sa: 9 bis 16 Uhr<br />So: 12.45 bis 15 Uhr und 16 bis 18.30 Uhr<br />1. November bis 29. Februar:<br />Mo bis Fr; 9 bis 17 Uhr<br />Sa: 9 bis 16 Uhr<br />So: 12.45 bis 15 und 16 bis 17 Uhr<div class=\"detailSubSubTitle\" >Messen:</div>Mo bis Sa: 6.25 , 7.00 , 7.30 , 8.15 Uhr<br />So: 7.00, 8.00, 10.00, 11.30 Uhr";
var domStMartinText_4 = "";

/*** CHRISTUSKIRCHE ***/
var christusKircheBild = "<img src=\"bilder/sehenswert/kirchen/christuskirche/christuskirche_iPhone_port.jpg\"/>";
var christusKircheTitel = "Christuskirche - talienische Renaissance am Rhein";
var christusKircheText_1 = "Gedacht als repräsentatives Gegengewicht zum Dom, ragt die 80 Meter hohe Kuppel der Christuskirche architektonisch aus dem Ensemble der Kirchtürme in der Innenstadt heraus. Eng verbunden ist die Geschichte der Christuskirche mit der der Mainzer Protestanten."; 
var christusKircheBildGallery = "<img class=\"detailMinPic\" src=\"bilder/sehenswert/kirchen/christuskirche/iphone-christuskirche1.jpg\" alt=\"\" />";
var christusKircheText_2 = "1830 erwarb die damals nur rund 1200 Mitglieder zählende evangelische Gemeinde die Kirche St. Johannis. 100 Jahre später war bereits nahezu ein Drittel der Mainzer Bevölkerung evangelisch: über 30.000. Die Erweiterung der Stadt um die Neustadt Ende des 19. Jahrhunderts kam bei der Suche nach einer neuen Hauptkirche wie gerufen. Mit der Kaiserstraße entstand ein Prachtboulevard, in dessen Mitte die von Stadtbaumeister Eduard Kreyßig entworfene Kirche den Blick noch heute unweigerlich auf sich zieht.";
var christusKircheText_3 = "<div class=\"detailSubSubTitle\">Standort</div>Kaiserstraße 56, 55116 Mainz<div class=\"detailSubSubTitle\">Öffnungszeiten</div>unregelmäßig geöffnet<div class=\"detailSubSubTitle\">Gottesdienste:</div>Sonntag 8.30, 10 Uhr";
var christusKircheText_4 = "";

/*** ST PETER ***/
var stPeterBild = "<img   src=\"bilder/sehenswert/kirchen/stPeter/stpeter_iphone_port.jpg\"/>";
var stPeterTitel = "St. Peter - Kirche mit spätbarocker Eleganz";
var stPeterText_1 = "Alle Herrlichkeit des Rokoko scheint in St. Peter versammelt und glänzt in hellem Gold - frisch wie am ersten Tag. Mit gutem Grund: 1989 wurde die elegante Kirche mit den Zwiebelturmzwillingen nach mehr als zehnjähriger Restaurierung der Gemeinde wie neu zurückgegeben.";
var stPeterBildGallery = "<img class=\"detailMinPic\" src=\"bilder/sehenswert/kirchen/stPeter/iphone-stpeter1.jpg\"  alt=\"\" />";
var stPeterText_2 = "Zu entdecken sind dort nicht allein Kunstschätze vergangener Jahrhunderte, sondern auch Kunstfertigkeiten unserer Tage: Die farbenfrohe Ausmalung des Innenraums besorgten der bayerische Kunstmaler Karl Manninger und sein Schüler Hermenegild Peiker. Historisches Vorbild waren die im Krieg zerstörten Fresken von Joseph Appiani (entstanden zwischen 1752 und 1755). Die umfangreichen Malereien erzählen Leben und Legenden des Apostels Petrus. Erhalten ist noch ein Original hinter dem Eingang.";
var stPeterText_3 = "<div class=\"detailSubSubTitle\">Standort</div>Peterstraße 3, 55116 Mainz<div class=\"detailSubSubTitle\">Öffnungszeiten</div>täglich 9 – 18 Uhr (im Winter bis 17 Uhr)<div class=\"detailSubSubTitle\">Gottesdienste</div>Mittwoch, Freitag, Samstag 18 Uhr<br/>Sonntag 9.30 Uhr und 11.30 Uhr";
var stPeterText_4 = "";

/*** AUGUSTINERKIRCHE ***/
var augustinerKircheBild = "<img   src=\"bilder/sehenswert/kirchen/augustiner/augustiner_iphone_port.jpg\"/>";
var augustinerKircheTitel = "Augustinerkirche - Schmuckstück des Rokoko";
var augustinerKircheText_1 = "Hinter dem roten Sandsteinportal gibt ein moderner gläserner Eingang den Blick frei auf prachtvolle Rokoko-Ausschmückungen. Die Augustinerkirche inmitten der Altstadt blieb im Zweiten Weltkrieg nahezu unversehrt und zeigt eine für die Region außergewöhnliche Pracht im Originalzustand.";
var augustinerKircheBildGallery = "<img class=\"detailMinPic\" src=\"bilder/sehenswert/kirchen/augustiner/iphone-augustiner1.jpg\"  alt=\"\" />";
var augustinerKircheText_2 = "In der Augustinerstraße hatte der seit 1260 ansässige Bettelorden der Augustiner-Eremiten bis 1802 einen Konvent. Die Saalkirche wurde von 1768 bis 1772 samt Kloster neu erbaut. Seit 1805 befindet sich hier das Bischöfliche Priesterseminar.Die Ausstattung der Kirche ist so reich, weil Mäzene die Arbeit großzügig förderten: Der Kurfürst wollte keine „Bauernkirche“ in seiner Residenzstadt. Die Fassade zeigt die lebhaften Formen des mainfränkischen Barock und eine Marienkrönung des Mainzer Bildhauers Nikolaus Binterim.";
var augustinerKircheText_3 = "<div class=\"detailSubSubTitle\">Standort</div>Augustinerstraße 34, 55116 Mainz<div class=\"detailSubSubTitle\">Öffnungszeiten</div>Montag bis Freitag: 8 bis 17 Uhr<br/>Samstag/Sonntag keine festen Öffnungszeiten<div class=\"detailSubSubTitle\">Messe</div>Donnerstag 18.15 Uhr (während des Semesters)";
var augustinerKircheText_4 = "";

/*** ST CHRISTOPH ***/
var stChristophBild = "<img  src=\"bilder/sehenswert/kirchen/stChristoph/stchristoph_iphone_port.jpg\"/>";
var stChristophTitel = "St. Christoph - Taufkirche Gutenbergs";
var stChristophText_1 = "Als eindrucksvolles Mahnmal erhalten ist die 1945 zerstörte frühgotische Kirche St. Christoph. Zwischen 1292 und 1325 erbaut, besitzt die Ruine, deren Chorraum als Kapelle dient, noch ein spätgotisches Taufbecken. In ihm soll Johannes Gutenberg getauft worden sein.";
var stChristophBildGallery = "<img class=\"detailMinPic\" src=\"bilder/sehenswert/kirchen/stChristoph/stchristoph_iphone_port.jpg\" alt=\"\" />";
var stChristophText_2 = "";
var stChristophText_3 = "<div class=\"detailSubSubTitle\">Standort</div>Christofsstraße, 55116 Mainz<div class=\"detailSubSubTitle\">Messen</div>1. und 3. Sonntag im Monat 17 Uhr, Dienstag und Donnerstag 19 Uhr (katholische Gemeinde)<br/>Gottesdienste der alt-katholischen Gemeinde Mainz/Wiesbaden zweimal monatlich Samstags.";
var stChristophText_4 = "";

/*** ST IGNAZ***/
var stIgnazBild = "<img  src=\"bilder/sehenswert/kirchen/stIgnaz/stignaz_iphone_port.jpg\"/>";
var stIgnazTitel = "St. Ignaz - Spiel zwischen Barock und Klassizismus";
var stIgnazText_1 = "Inmitten der niedrigen Altstadthäuser der Kapuzinerstraße erhebt sich die rote Sandsteinfassade von St. Ignaz. Sie ist versehen mit grauen Sandsteinfiguren, unter anderem der des Kirchenpatrons und Märtyrers St. Ignatius von Antiochien (+ nach 110).";
var stIgnazBildGallery = "<img class=\"detailMinPic\" src=\"bilder/sehenswert/kirchen/stIgnaz/iphone-stignaz1.jpg\"  alt=\"\" />";
var stIgnazText_2 = "Zwischen 1763 und 1774 ist die Kirche nach Plänen von Johann Peter Jäger errichtet worden, und zwar anstelle der alten Kirche eines nach 1200 in die Mainzer Stadtmauer einbezogenen Vorortes.Die Kirche zeigt ein beeindruckendes Zusammenspiel von Barock als Ausdruck der Glaubensfreude und des Klassizismus als Ausdruck der Vernunft. Zwischen den strengen Linien des Klassizismus erscheinen üppige Stuckarbeiten und Putten. Deckengemälde erzählen vom Leben und Sterben des Hl. Ignatius. Sie stammen ursprünglich vom Barockmaler Johann Baptist Enderle, wurden später aber mehrmals nachgearbeitet.";
var stIgnazText_3 = "<div class=\"detailSubSubTitle\">Standort</div>Kapuzinerstraße 36, 55116 Mainz<div class=\"detailSubSubTitle\">Öffnungszeiten</div>täglich 9.30 bis 19 Uhr<div class=\"detailSubSubTitle\">Gottesdienste</div>Sonntag 9.30 Uhr, 11.30 Uhr (in Polnisch), 18.30 Uhr<br/>Montag 17.30 Uhr<br/>Mi 9 Uhr<br/>Donnerstag 17 Uhr<br/>Freitag 17.30 Uhr";
var stIgnazText_4 = "";

/*** ST STEPHAN ***/
var stStephanBild = "<img  src=\"bilder/sehenswert/kirchen/stStephan/ststephan_iphone_port.jpg\"/>";
var stStephanTitel = "St. Stephan - Chagalls Mystik des blauen Lichts";
var stStephanText_1 = "200 000 Besucher im Jahr zeigen: St. Stephan ist eine Attraktion! Touristen aus der ganzen Welt pilgern hinauf auf den Stephansberg, zu den blau leuchtenden Glasfenstern des Künstlers Marc Chagall";
var stStephanBildGallery = "<img class=\"detailMinPic\" src=\"bilder/sehenswert/kirchen/stStephan/iphone-ststephan1.jpg\"  alt=\"\" />";
var stStephanText_2 = "Wiederaufbau und Restaurierung der gotischen Kirche, die im Zweiten Weltkrieg fast völlig zerstört wurde, brachte zugleich ihre Neubelebung. Vor über tausend Jahren, im Jahr 990, hatte der Erzbischof von Mainz und Erzkanzler des Reiches, Willigis, hier ein Kollegiatsstift errichtet und die Kirche als \"Gebetsstätte des Reiches\" erbauen lassen. Der Erbauer des Doms fand in St. Stephan 1011 selbst seine letzte Ruhe. Der gotische Neubau wurde zwischen 1290 und 1335 errichtet. Er steht auf den Fundamenten der im ottonisch-vorromanischen Stil um 990 erbauten Basilika.";
var stStephanText_3 = "<div class=\"detailSubSubTitle\">Standort</div>Weißgasse 12, 55116 Mainz<div class=\"detailSubSubTitle\">Öffnungszeiten</div>Nov bis Feb:<br/>Mo bis Sa: 10 bis 16.30 Uhr<br/>So 12 bis 16.30 Uhr<br/>Mär bis Oktr:<br/>Mo bis Sa: 10 bis 17 Uhr<br/>So 12 bis 17 Uhr<div class=\"detailSubSubTitle\">Messen</div>Mo, Mi, Fr 18.30 Uhr<br/>Sa 18 Uhr<br/>So 11 Uhr<br/>1. Dienstag im Monat 15 Uhr<br/>übrige Dienstage 9 Uhr";
var stStephanText_4 = "";

/*** ST QUINTIN ***/
var stQuintinBild = "<img  src=\"bilder/sehenswert/kirchen/stQuintin/stquintin_iphone_port.jpg\"/>";
var stQuintinTitel = "St. Quintin - Auf den Grundfesten einer gotischen Hallenkirche";
var stQuintinText_1 = "1994 erhielt St. Quintin wieder einen hölzernen Turmhelm. Damit war auch die letzte Mainzer Kirche von Kriegsschäden befreit. Erstmals genannt wird St. Quintin bereits 774, der Bau entstand zwischen 1288 und 1330.";
var stQuintinBildGallery = "<img class=\"detailMinPic\" src=\"bilder/sehenswert/kirchen/stQuintin/iphone-quintin1.jpg\"  alt=\"\" />";
var stQuintinText_2 = "Neben dem Hochaltar von 1739 mit neuem Baldachin ist das große Altarbild von Franz Anton Maulbertsch (1724-1796) bemerkenswert. Ein Blickpunkt ist die restaurierte Kanzel, die ursprünglich aus St. Emmeran stammt.";
var stQuintinText_3 = "<div class=\"detailSubSubTitle\">Standort</div>Quintinsstraße 5, 55116 Mainz<div class=\"detailSubSubTitle\">Öffnungszeiten</div>täglich 10 – 18 Uhr<div class=\"detailSubSubTitle\">Messen</div>Dienstag und Freitag 18.45 Uhr<br/>Sonntag 10 Uhr, 17 Uhr (in Englisch)";
var stQuintinText_4 = "";

/*** ST ANTONIUS ***/
var stAntoniusBild = "<img  src=\"bilder/sehenswert/kirchen/stAntonius/stantonius_iphone_port.jpg\"/>";
var stAntoniusTitel = "St. Antonius - Relikte der Gotik in Mainz";
var stAntoniusText_1 = "St. Antonius, von den Antonitern 1331 erbaut und 1620 von den Armen Klarissen übernommen, erhielt von jenen auch den Namen \"Armklaren\". In der Antoniuskirche sind die einzigen in Mainz erhaltenen gotischen Deckenmalereien zu finden.";
var stAntoniusBildGallery = "<img class=\"detailMinPic\" src=\"bilder/sehenswert/kirchen/stAntonius/iphone-antonius1.jpg\" alt=\"\" />";
var stAntoniusText_2 = "Diese Malerien wurden erst 1948 entdeckt. Auf der großräumigen Nonnenempore steht eine Orgel, die das benachbarte Institut für Kirchenmusik für den Unterricht nutzt. Erhalten ist im Chor ein Dreisitz und ein Wandschrank aus der Gotik.";
var stAntoniusText_3 = "<div class=\"detailSubSubTitle\">Standort</div>Adolf-Kolping-Straße 6<br/>55116 Mainz<div class=\"detailSubSubTitle\">Öffnungszeiten</div>Dienstag bis Freitag: 10 bis 12 Uhr<div class=\"detailSubSubTitle\">Messe</div>Sonntag 10 Uhr (in Portugiesisch)<br/>11.45 Uhr (in Slowenisch)<br/>13.30 (in Kongolesisch)";
var stAntoniusText_4 = "";


function getKirche(index){

    switch(index){
    
        case 0:
            
            setData(domStMartinBild,domStMartinTitel,domStMartinBildGallery,domStMartinText_1,domStMartinText_2,domStMartinText_3,domStMartinText_4);
            
            break;
        case 1:
            
            setData(christusKircheBild,christusKircheTitel,christusKircheBildGallery,christusKircheText_1,christusKircheText_2,christusKircheText_3,christusKircheText_4);
            
            break;
        case 2:
            
            setData(stPeterBild,stPeterTitel,stPeterBildGallery,stPeterText_1, stPeterText_2, stPeterText_3, stPeterText_4);
        
            break;
        case 3:
            
            setData(augustinerKircheBild,augustinerKircheTitel,augustinerKircheBildGallery,augustinerKircheText_1, augustinerKircheText_2, augustinerKircheText_3, augustinerKircheText_4);
            
            break;
        case 4:
            
            setData(stChristophBild,stChristophTitel,stChristophBildGallery,stChristophText_1, stChristophText_2, stChristophText_3, stChristophText_4);
            
            break;
        case 5:
            
            setData(stIgnazBild,stIgnazTitel,stIgnazBildGallery,stIgnazText_1, stIgnazText_2, stIgnazText_3, stIgnazText_4);
        
            break;
        case 6:
            
            setData(stStephanBild,stStephanTitel,stStephanBildGallery,stStephanText_1, stStephanText_2, stStephanText_3, stStephanText_4);
            
            break;
        case 7:
            
            setData(stQuintinBild,stQuintinTitel,stQuintinBildGallery,stQuintinText_1, stQuintinText_2, stQuintinText_3, stQuintinText_4);
            
            break;
        case 8:
            
            setData(stAntoniusBild,stAntoniusTitel,stAntoniusBildGallery,stAntoniusText_1, stAntoniusText_2, stAntoniusText_3, stAntoniusText_4);
            
            break;
        
        
    }
    
    //Werbebanner Funtion stammt aus advertise.js
    advertise.setAdDetailSights(0);
    
    //wechsel zur Detailseite
    toDetail();
}

/******* Museen *******/
/****** Römisch Germanisches Museum **/
var romGermBild = "<img  src=\"bilder/sehenswert/museen/romGerm/roemgermmuseum_iphone_port.jpg\"/>";
var romGermTitel = "Römisch-Germanisches Zentralmuseum";
var romGermText_1 = "Weit über Deutschland hinaus genießt das Römisch-Germanische Zentralmuseum einen hervorragenden Ruf. Zuletzt wurden hier Funde des Südtiroler Gletschermannes konserviert, peruanische Entdeckungen eines Fürstengrabs restauriert und sogar eine Außenstelle im chinesischen Xian eingerichtet, wo Experten aus Mainz bedeutende Metallfunde unter die Lupe nehmen."
var romGermBildGallery = "<img class=\"detailMinPic\" src=\"bilder/sehenswert/museen/romGerm/roemgermmuseum_iphone_port.jpg\" alt=\"\" />";
var romGermText_2 = "Im Nordwestflügel des Kurfürstlichen Schlosses erwartet die Besucher eine nicht minder bedeutsame Palette spektakulärer Funde - eindrucksvoll wird ein Bogen von der Steinzeit bis zum frühen Mittelalter geschlagen.";
var romGermText_3 = "<div class=\"detailSubSubTitle\">Standort:</div>Kurfürstliches Schloß / Ernst-Ludwig-Platz 2<br/>55116 Mainz<div class=\"detailSubSubTitle\">Öffnungszeiten</div>Di bis So: 10.00 bis 18.00 Uhr<br/>Mo geschlossen<br/>Eintritt frei";
var romGermText_4 = "";

/******** Naturhistorisches Museum ***/
var naturHistoBild = "<img src=\"bilder/sehenswert/museen/naturhistorisch/naturmuseum_iphone_port.jpg\" />";
var naturHistoTitel = "Naturhistorisches Museum";
var naturHistoText_1 = "Das Naturhistorische Museum Mainz ist das größte und bedeutendste Naturkundemuseum in Rheinland-Pfalz. Seine Sammlungen und Ausstellungen dokumentieren Gesteine und Mineralien von Rheinland-Pfalz sowie die fossile Tier- und Pflanzenwelt dieses Gebietes."
var naturHistoBildGallery = "<img class=\"detailMinPic\" src=\"bilder/sehenswert/museen/naturhistorisch/naturmuseum_iphone_port.jpg\" alt=\"\" />";
var naturHistoText_2 = "Weiterer Sammlungsschwerpunkt sind gegenwärtige Pflanzen und Tiere der Region. In den Schauräumen werden die heimischen Tiere in ihren natürlichen Lebensgemeinschaften vorgeführt. Zu den wertvollen Besonderheiten des Museum gehören Stücke, wie z. B. der tasmanische Beutelwolf, das Java-Nashorn und die weltberühmte Quagga-Gruppe.";
var naturHistoText_3 = "<div class=\"detailSubSubTitle\">Standort</div>Mitternacht/Reichklarastraße 10<br/>55116 Mainz<div class=\"detailSubSubTitle\">Öffnungszeiten</div>Di: 10.00 bis 20.00 Uhr<br/>Mi: 10.00 bis 14.00 Uhr<br/<Do bis So: 10.00 bis 17.00 Uhr<br/>Mo geschlossen";
var naturHistoText_4 = "";

/********** Landesmuseum Mainz ************/
var landesMuseumBild = "<img  src=\"bilder/sehenswert/museen/landesmuseum/landesmuseum_iphone_port.jpg\" />";
var landesMuseumTitel = "Landesmuseum Mainz";
var landesMuseumText_1 = "Das Landesmuseum Mainz basiert mit seinen Anfängen u. a. auf einer Schenkung Napoleons aus dem Jahre 1803. Damit ist es eines der ältesten Museen Deutschlands. Es beherbergt die bedeutendste Kunstsammlung des Landes Rheinland-Pfalz."
var landesMuseumBildGallery = "<img class=\"detailMinPic\" src=\"bilder/sehenswert/museen/landesmuseum/landesmuseum_iphone_port.jpg\"  alt=\"\" />";
var landesMuseumText_2 = "Der Bestand des Landesmuseums umfasst neben römischen Steindenkmälern und ur- und frühgeschichtlichen Funden vom Mittelrhein Werke der Malerei, der Skulptur und des Kunsthandwerks vom Mittelalter bis zur Gegenwart. Darüber hinaus verfügt das Haus über die größte graphische Sammlung des Landes sowie über hervorragende Sammlungen von Jugendstilglas und Höchster Porzellan.Schließlich wird der Bestand ergänzt durch wechselnde Sonderausstellungen, und museumspädagogische Veranstaltungen für Kinder und Erwachsene.<br/>Das Landesmuseum wurde auch im Hinblick auf die Barrierefreiheit umgebaut. Das bedeutet, dass alle Abteilungen des Hauses barrierefrei über Rampen, Aufzüge und automatische Türen erreichbar sind. Darüber hinaus gibt es vielfältige Angebote für blinde, sehbehinderte sowie für gehörlose und hörbehinderte Besucher.";
var landesMuseumText_3 = "<div class=\"detailSubSubTitle\">Standort:</div>Große Bleiche 49 - 51<br/>55116 Mainz<div class=\"detailSubSubTitle\">Öffnungszeiten</div>Mo geschlossen<br/>Di 10.00 - 20.00 Uhr<br/>Mi bis So 10.00 - 17.00 Uhr";
var landesMuseumText_4 = "";

/**** Kunsthalle ***/
var kunsthalleBild = "<img  src=\"bilder/sehenswert/museen/kunsthalle/kunsthalle_iphone_port.jpg\"/>";
var kunsthalleTitel = "Kunsthalle Mainz";
var kunsthalleText_1 = "Die Kunsthalle Mainz im Mainzer Zollhafen ist ein Ort für Wechselausstellungen mit zeitgenössischer Kunst. Im März 2008 nahm sie mit der ersten Ausstellung ihre Aktivitäten auf. In Einzelpräsentationen, thematischen Gruppenausstellungen und ortsspezifischen Eingriffen werden künstlerische Positionen aus den gegenwärtigen Kunstgeschehen vorgestellt."
var kunsthalleBildGallery = "<img class=\"detailMinPic\" src=\"bilder/sehenswert/museen/kunsthalle/kunsthalle_iphone_port.jpg\" alt=\"\" />";
var kunsthalleText_2 = "Ein umfangreiches Vermittlungsprogramm für Erwachsene und Kinder begleitet jede Ausstellung. Ergänzende Veranstaltungen wie Vorträge oder Werkgespräche mit Künstlern vertiefen die Begegnung von Publikum mit Kunst und Kunstschaffenden und ermöglichen eine intensive Auseinandersetzung.";
var kunsthalleText_3 = "<div class=\"detailSubSubTitle\">Standort:</div>Am Zollhafen 3-5<br/>55118 Mainz<div class=\"detailSubSubTitle\">Öffnungszeiten</div>Di, Do und Fr: 10.00 bis 17.00 Uhr<br/>Mi: 10.00 bis 21.00 Uhr<br/>Sa und So: 11.00 bis 17.00 Uhr<br/>Mo geschlossen";
var kunsthalleText_4 = "";

/******* Gutenberg ******/
var gutenbergBild = "<img src=\"bilder/sehenswert/museen/gutenberg/gutenbergmuseum_iphone_port.jpg\"/>";
var gutenbergTitel = "Gutenberg-Museum";
var gutenbergText_1 = "Das Gutenberg-Museum der Stadt Mainz ist ein weltweit bekanntes und renommiertes Spezialmuseum der Schrift und der Druckkunst. Gegründet wurde es von Mainzer Bürgern im Jahre 1900 anlässlich des 500. Geburtstag Johannes Gutenbergs."
var gutenbergBildGallery = "<img class=\"detailMinPic\" src=\"bilder/sehenswert/museen/gutenberg/gutenbergmuseum_iphone_port.jpg\" alt=\"\" />";
var gutenbergText_2 = "Das Museum ist eine Hommage an den Erfinder der Druckkunst, seine weltberühmten 42-zeiligen Bibeln gehören zu den Kostbarkeiten des Hauses.Zu den Schätzen des Museums zählt eine Rekonstruktion der alten Druckerstube mit benutzbarer Presse. Wie vor 550 Jahren gedruckt wurde, wird in der Werkstatt \"live\" demonstriert. Auf 2700 Quadratmetern Ausstellungsfläche werden mittelalterliche Handschriften, historische Drucke, Graphiken, Druckpressen und Setzmaschinen früherer Epochen präsentiert und runden das faszinierende Spektrum dieses Museums ab.";
var gutenbergText_3 = "<div class=\"detailSubSubTitle\">Standort</div>Liebfrauenplatz 5<br/>55116 Mainz<div class=\"detailSubSubTitle\">Öffnungszeiten</div>Di bis Sa: 09.00 bis 17.00 Uhr<br/>So: 11.00 bis 17 Uhr<br/>Mo und an gesetzlichen Feiertagen geschlossen.";
var gutenbergText_4 = "";

/****  Fastnacht ****/
var fastnachtBild = "<img  src=\"bilder/sehenswert/museen/fastnacht/fastnacht_iphone_port.jpg\"/>";
var fastnachtTitel = "Mainzer Fastnachtsmuseum";
var fastnachtText_1 = "Was ist ein \"Scheierborzeler? Was ist eine \"Haubensitzung\"? Wer komponierte \"Humba, Humba, Tätärä\"? Eine Antwort auf diese Fragen und vieles Närrische mehr gibt es im Mainzer Fastnachtsmuseum zu entdecken: Orden, Narrenkappen und Zepter, Gardeuniformen und Kostüme, Sitzungsprotokolle, Programme und Liederhefte, historische Bild- und Tondokumente.";
var fastnachtBildGallery = "<img class=\"detailMinPic\" src=\"bilder/sehenswert/museen/fastnacht/fastnacht_iphone_port.jpg\" alt=\"\" />";
var fastnachtText_2 = "Ausschnitte aus den Fernsehsitzungen \"Mainz, wie es singt und lacht\" und \"Mainz bleibt Mainz\", Poltisches und \"Määnzer Kokolores\", \"Fraa Babbisch\" und \"Fraa Struwwelich\", Ernst Neger, Margit Sponheimer, Dr. Willi Scheu, Rolf Braun, Herbert Bonewitz und viele andere. Das Mainzer Fastnachtsmuseum lässt mehr als 160 Jahre Fastnachtsgeschichte Revue passieren und zeigt vieles, was für die fünfte Jahreszeit in Mainz typisch ist.";
var fastnachtText_3 = "<div class=\"detailSubSubTitle\">Standort</div>Romano-Guardini-Platz<br/>55116 Mainz<div class=\"detailSubSubTitle\">Öffnungszeiten</div>Di bis So: 11.00 bis 17.00 Uhr<br/>Mo: Ruhetag";
var fastnachtText_4 = "";

/*** Antike Schifffahrt ***/
var antschiffBild = "<img  src=\"bilder/sehenswert/museen/antikeSchifffahrt/antikeschiffe_iphone_port.jpg\" />";
var antschiffTitel = "Museum für antike Schifffahrt";
var antschiffText_1 = "Seit 1994 ist der Forschungsbereich Antike Schifffahrt des Römisch-Germanischen Zentralmuseums Mainz als eigenes Museum in der ehemaligen Markthalle am Rande der Altstadt beheimatet. Es präsentiert in einer deutschlandweit einmaligen Darstellung den Fund von fünf originalen Schiffswracks aus der Spätantike.";
var antschiffBildGallery = "<img class=\"detailMinPic\" src=\"bilder/sehenswert/museen/antikeSchifffahrt/antikeschiffe_iphone_port.jpg\" alt=\"\" />";
var antschiffText_2 = "Die 1981/82 bei Ausschachtungsarbeiten für den Erweiterungsbau des Mainz Hilton Hotels gefunden Wracks, lagen ca 7,5 Meter unter heutigem Straßenniveau, unmittelbar vor der Stadtmauer des römischen Mainz, offenbar in einem stillgelegten Teil des Hafens. Es handelte sich aufgrund ihrer charakteristischen Form um Militärschiffe, die nach der katastrophalen Niederlage der römischen Rheinarmee gegen einfallende Germanen 407 n. Chr. aufgegeben wurden.<br/>Bereits 260 n. Chr. waren die römischen Truppen aus dem rechtsrheinischen Teil Obergermaniens abgezogen worden, der Rhein bildete die -sehr gefährdete- Grenze. Die Militärschiffe dienten als Patrouillenboote, aber auch als schnelle Mannschaftstransporter. Aufgabe des Museums für Antike Schiffahrt ist die wissenschaftliche Bearbeitung aller Quellen zur römischen Schiffahrt. Dazu gehört auch die Rekonstruktion antiker Schiffstypen auf der Grundlage antiker Darstellungen und römischer Schiffsfunde aus ganz Europa.";
var antschiffText_3 = "<div class=\"detailSubSubTitle\">Standort</div>Neutorstraße 2b<br/>55116 Mainz<div class=\"detailSubSubTitle\">Öffnungszeiten</div>Dienstag bis Sonntag 10-18 Uhr<br/>Montags geschlossen";
var antschiffText_4 = "";

function getMuseen(index){

    switch(index){
            
        case 0:
            
            setData(fastnachtBild,fastnachtTitel,fastnachtBildGallery,fastnachtText_1,fastnachtText_2,fastnachtText_3,fastnachtText_4);
            
            break;
        case 1:
            
            setData(gutenbergBild,gutenbergTitel,gutenbergBildGallery,gutenbergText_1,gutenbergText_2,gutenbergText_3,gutenbergText_4);
        
            break;
        case 2:
            
            setData(kunsthalleBild,kunsthalleTitel,kunsthalleBildGallery,kunsthalleText_1,kunsthalleText_2,kunsthalleText_3,kunsthalleText_4);
            
            break;
        case 3:
            
            setData(landesMuseumBild,landesMuseumTitel,landesMuseumBildGallery,landesMuseumText_1,landesMuseumText_2,landesMuseumText_3,landesMuseumText_4);
            
            break;
        case 4:
            
            setData(naturHistoBild,naturHistoTitel,naturHistoBildGallery,naturHistoText_1,naturHistoText_2,naturHistoText_3,naturHistoText_4);
        
            break;
        case 5:
            
            setData(romGermBild,romGermTitel,romGermBildGallery,romGermText_1,romGermText_2,romGermText_3,romGermText_4);
            
            break;
        case 6:
            
            setData(antschiffBild,antschiffTitel,antschiffBildGallery,antschiffText_1,antschiffText_2,antschiffText_3,antschiffText_4);
            
            break;
    }
    
    //Werbebanner Funtion stammt aus advertise.js
    advertise.setAdDetailSights(1);
    
    //wechsel zur Detailseite
    toDetail();
}

/*** römisch Mainz ***/
/** Dativus-Victor-Bogen **/
var dvBogenBild = "<img  src=\"bilder/sehenswert/roemisch/dvBogen/datvicbogen_iphone_port.jpg\"/>";
var dvBogenTitel = "Der Dativius-Victor-Bogen";
var dvBogenText_1 = "Im 3.Jh. näherte sich die römische Herrschaft am Rhein langsam aber sicher ihrem Ende. Die rechtsrheinischen Limesgebiete wurden stark durch Germanen bedroht, und die Oberschicht dieser Gebiete siedelte sich in den sichereren Gefilden links des Flusses an. So tat es auch der Ratsherr Dativius Victor aus Nida.";
var dvBogenBildGallery = "<img class=\"detailMinPic\" src=\"bilder/sehenswert/roemisch/dvBogen/iphone-datvicbogen1.jpg\" alt=\"\" />";
var dvBogenText_2 ="Wohl aus Dank für die Aufnahme in ruhigeres Gebiet stiftete er den heute nach ihm benannten Bogen und eine Säulenhalle.Nahe dem Römisch-Germanischen Zentralmuseum steht eine Kopie des Bogens aus dem Jahre 1962, das Original findet sich im Landesmuseum. Über dem Bogenfries der Tierkreiszeichen thront in der Mitte das Herrscherpaar des antiken Götterhimmels, Jupiter und Juno.<br />Als die Bedrohung durch die Germanen auch für Mogontiacum größer wurde, errichtete man Mitte des 4.Jhs. eine neue Stadtmauer, für die - damit es schneller ging - bestehende Bauwerke wie Heiligtümer oder Grabanlagen verwendet wurden.<br/>Auf diese Weise wurden auch Quader des Dativius-Victor-Bogens in das Fundament der Stadtmauer versenkt.Von 1898 bis 1911 wurde das Original ausgegraben und zusammengetragen. Es stand wohl ehemals in der Nähe des heutigen Fichteplatzes.";
var dvBogenText_3 = "<div class=\"detailSubSubTitle\">Standort</div>Das Original ist in der Steinhalle des Landesmuseums zu sehen, die Kopie befindet sich auf dem Ernst-Ludwig-Platz in der Nähe des Römisch-Germanischen-Zentralmuseums.";
var dvBogenText_4 = "";

/** Drusussstein **/
var drusussteinBild = "<img  src=\"bilder/sehenswert/roemisch/drususstein/drususstein_iphone_port.jpg\"/>";
var drusussteinTitel = "Römischer Totenkult: Der Drususstein";
var drusussteinText_1 = "Eine mystische Atmosphäre liegt über dem nächtlichen Schauplatz im römischen Mainz. Römische Soldaten in voller Rüstung ziehen um das Feuer eines großen Scheiterhaufens und legen an dessen Fuß Beutegaben und Waffen ab.";
var drusussteinBildGallery = "<img class=\"detailMinPic\" src=\"bilder/sehenswert/roemisch/drususstein/iphone-drususstein1.jpg\" alt=\"\" />";
var drusussteinText_2 ="Totenklagen hallen durch die Luft, während das Flackern des Feuers unförmige Schatten auf das nahe Ehrenmal wirft... .So ähnlich könnte sich der jährliche Totenkult für General Drusus abgespielt haben. Aus Verehrung für den toten Feldherrn, der 9 v.Chr. auf dem Rückweg von einem Eroberungsfeldzug an der Elbe gestorben war, errichteten die in Mogontiacum stationierten Soldaten ein Ehrenmal, den Drususstein. Reste des Steins sind heute auf der Zitadelle zu sehen.<br/>Drusus, Stiefsohn des Kaisers Augustus, hatte 13 v.Chr. das Basislager gegenüber der Mainmündung gegründet, um von dort aus das germanische Gebiet jenseits des Rheins zu erobern. Der römische Geschichtsschreiber Cassius Dio beschreibt den erfolgreichen Eroberer als \"...einen Jüngling, begabt mit so vielen und so hohen Tugenden, wie nur immer die sterbliche Menschennatur sie in sich zu schließen, und Fleiß und Tüchtigkeit sie auszubilden vermag.\"<br/>Von 1898 bis 1911 wurde das Original ausgegraben und zusammengetragen. Es stand wohl ehemals in der Nähe des heutigen Fichteplatzes.Das Original ist in der Steinhalle des Landesmuseums zu sehen, die Kopie befindet sich auf dem Ernst-Ludwig-Platz in der Nähe des Römisch-Germanischen-Zentralmuseums.";
var drusussteinText_3 = "<div class=\"detailSubSubTitle\">Standort</div>Der Drususstein steht auf dem Gelände der historischen Zitadelle auf dem Jokobsberg unweit des antiken Bühnentheaters.";
var drusussteinText_4 = "";

/** Jupitaersäule **/
var jupiterBild = "<img  src=\"bilder/sehenswert/roemisch/jupitersaeule/jupitersaeule_iphone_port.jpg\"/>";
var jupiterTitel = "Lebendige Antike: Die Jupitersäule";
var jupiterText_1 = "Die über neun Meter hohe Jupitersäule ist ein gutes Beispiel dafür, wie lebendig antike Bauwerke von der Vergangenheit erzählen können. Die Inschrift am Fuß der Säule bringt Licht in ein bewegtes Kapitel römischer Geschichte zur Zeit Kaiser Neros. Hier sind schemenhaft die Worte „Nero“ und „pro salute“ zu entziffern, zusammen also „für das Heil Neros“";
var jupiterBildGallery = "<img class=\"detailMinPic\" src=\"bilder/sehenswert/roemisch/jupitersaeule/iphone-jupitersaeule1.jpg\"  alt=\"\" />";
var jupiterText_2 ="Die in mehr als 2000 Teile zerbrochene Säule fand man 1905 bei Bauarbeiten in der Nähe einer antiken Kaufmannsiedlung. Diese lag im Gebiet der heutigen Mainzer Neustadt. Mainzer Kaufleute stifteten die Säule zum Wohle des Kaisers. Doch nur dem Zufall ist es zu verdanken, dass man diesen Schluss heute überhaupt noch ziehen kann. Denn nach seinem Tode wurde Nero, der als Urheber des Brandes von Rom ausgemacht worden war, als Staatsfeind behandelt und geächtet. Natürlich konnte jetzt auch die Inschrift am Fuß der Mainzer Jupitersäule nicht bleiben. Also entfernte man sie - freilich unzureichend.<br/>Auch das Nebeneinander von römischem und germanischem Götterkult ist an der Säule beispielhaft abzulesen. 28 Reliefs zeigen römische und keltische Gottheiten. Ursprünglich krönte eine bronzene Jupiterstatue die Säule. Von ihr existieren jedoch nur noch ein Fuß, ein kleiner Finger sowie Teile des Blitzes.";
var jupiterText_3 = "<div class=\"detailSubSubTitle\">Standort</div>Die Kopie der Jupitersäule ist vor dem Landtag an der Großen Bleiche zu sehen, das Original befindet sich in der Steinhalle des Landesmuseums.";
var jupiterText_4 = "";

/** Römersteine **/
var roemersteineBild = "<img src=\"bilder/sehenswert/roemisch/roemersteine/roemersteine_iphone_port.jpg\"/>";
var roemersteineTitel = "Wie das Wasser zum Legionslager kam: Die Römersteine";
var roemersteineText_1 = "Wasser diente nicht zuletzt zur Sicherung des Lebensstandarts der Bevölkerung. Mit Hilfe eines Aquädukts konnte das wertvolle Nass über Kilometer in die Militärlager und Städte transportiert werden.";
var roemersteineBildGallery = "<img class=\"detailMinPic\" src=\"bilder/sehenswert/roemisch/roemersteine/iphone-roemerstein1.jpg\" alt=\"\" />";
var roemersteineText_2 ="Mit der Wasserleitung in Mainz verwirklichte die antike Besatzungsmacht geradezu einen architektonischen Superlativ: den höchsten Aquädukt nördlich der Alpen.Die „Römersteine“ im Stadtteil Zahlbach sind die Reste dieser Anlage.Von dem etwa neun Kilometer entfernten Quellgebiet im Stadtteil Finthen aus verlief die Leitung zunächst unterirdisch. Wegen des zunehmenden Gefälles führte sie dann aber oberirdisch weiter. Um den größten Höhenunterschied in Zahlbach zu überwinden, brauchten die Pfeiler eine Höhe von über 25 Metern. Heute sind von diesen Pfeilern nur noch Überreste vorhanden - die Römersteine.";
var roemersteineText_3 = "<div class=\"detailSubSubTitle\">Standort:</div>Die Pfeiler des Aquädukts befinden sich an der Unteren Zahlbacher Straße.";
var roemersteineText_4 = "";

/** Römertempel **/
var roemerTempelBild = "<img src=\"bilder/sehenswert/roemisch/roemertempel/isistempel_iphone_port.jpg\"/>";
var roemerTempelTitel = "Isis- und Mater Magna-Heiligtum";
var roemerTempelText_1 = "Öllampen werfen flackerndes Licht an die Wände des Tempels, der Duft von Räucherwerk und verbrannten Früchten hängt schwer in der Luft. Die Mainzer Erde hat ein wenig mehr Licht in den kultischen Alltag der Römer in Mogontiacum gebracht.";
var roemerTempelBildGallery = "<img class=\"detailMinPic\" src=\"bilder/sehenswert/roemisch/roemertempel/iphone-roemertempel1.jpg\" alt=\"\" />";
var roemerTempelText_2 ="Im Jahre 2000 stieß man auf Teile eines der altägyptischen Gottheit Isis und der orientalischen Mater Magna geweihten Tempels, der vermutlich bis ins 3.Jh. genutzt wurde. Aufsehenerregend sind neben den mehr als 300 rund um den Tempel gefundenen Öllämpchen auch die freigelegten Opfergaben: Neben Früchten wie Datteln und Feigen wurden Pinienkerne und Getreidekörner auf Altären verbrannt. Auch Tieropfer wurden dargebracht, wie zahllose Hühnerknochen belegen. Unter den geborgenen Statuetten finden sich ein eng umschlungenes Liebespaar, eine Venus, ein Stier mit einer Opferbinde und ein bronzener Merkur mit einem Geldsack in der Hand.<br/>Die Fundamente des römischen Heiligtums Isis und Mater Magna Tempel entdeckte man bei Aushubarbeiten für eine Einkaufspassage. Mauern, Steine und Fundstücke wurden drei Jahre sorgfältig eingelagert. Im Jahre 2003 wurde der Tempel im Präsentationsraum der \"Taberna archaeologica\" an ihrer Fundstelle wieder aufgebaut.Den Besucher erwartet auf seiner Zeitreise zurück in die Welt des kultischen Rom nun eine alle Sinne ansprechende Inszenierung des Heiligtums.";
var roemerTempelText_3 = "<div class=\"detailSubSubTitle\">Standort:</div>Römerpassage 1<br/>55116 Mainz<div class=\"detailSubSubTitle\">Öffnungszeiten</div>Montag bis Samstag: 10.00 bis 18.00 Uhr<br/>Eintritt frei";
var roemerTempelText_4 = "";

/** Römertheater **/
var roemerTheaterBild = "<img  src=\"bilder/sehenswert/roemisch/roemertheater/roemertheater_iphone_port.jpg\"/>";
var roemerTheaterTitel = "Platz für Zehntausend:<br />Das Bühnentheater von Mogontiacum";
var roemerTheaterText_1 = "Es war wohl keine Stadt im Römischen Reich so klein, dass sie nicht wenigstens ein Theater oder ein Amphitheater gehabt hätte. Was man allerdings Anfang des 20.Jhs. unterhalb der Zitadelle am Südbahnhof entdeckte, sprengte zunächst jede Vorstellungskraft.";
var roemerTheaterBildGallery = "<img class=\"detailMinPic\" src=\"bilder/sehenswert/roemisch/roemertheater/iphone-roemertheater1.jpg\" alt=\"\" />";
var roemerTheaterText_2 ="Das gigantische antike Bühnentheater war nördlich der Alpen das größte seiner Art und besaß einen Zuschauerraum, der 116 Meter breit war. Seine Bühne maß 42 Meter. Die Zuschauerreihen boten rund zehntausend Besuchern Platz - zehn Mal mehr als ins Mainzer Staatstheater passen. Die  freigelegten Stützpfeiler lassen die Architektur und die Ausmaße des Theaters erahnen. Genutzt wurde es wahrscheinlich als Versammlungsort für die zivilen Gedenkfeiern für den toten Feldherrn Drusus, dessen Ehrengrabmal nur rund 340 Meter entfernt auf der heutigen Zitadelle errichtet worden war.<br/>Hier trafen sich zu diesem Zweck die Repräsentanten der 60 gallischen Gebietskörperschaften. Mogontiacum - die Hauptstadt der römischen Provinz Obergermanien - war somit politischer Wallfahrtsort für Germanien und Gallien, an dem man jedes Jahr der gemeinsamen römischen Wurzeln gedachte.";
var roemerTheaterText_3 = "<div class=\"detailSubSubTitle\">Standort:</div>Das Bühnentheater befindet sich oberhalb des Bahnhofes Mainz Römisches Theater (ehemals Südbahnhof).";
var roemerTheaterText_4 = "";

function getRoemischMainz(index){
    
    switch(index){
            
        case 0:
            
            setData(dvBogenBild,dvBogenTitel,dvBogenBildGallery,dvBogenText_1,dvBogenText_2,dvBogenText_3,dvBogenText_4);
            break;
        case 1:
            setData(drusussteinBild,drusussteinTitel,drusussteinBildGallery,drusussteinText_1,drusussteinText_2,drusussteinText_3,drusussteinText_4);
            break;
        case 2:
            setData(jupiterBild,jupiterTitel,jupiterBildGallery,jupiterText_1,jupiterText_2,jupiterText_3,jupiterText_4);
            break;
        case 3:
            
            setData(roemersteineBild,roemersteineTitel,roemersteineBildGallery,roemersteineText_1,roemersteineText_2,roemersteineText_3,roemersteineText_4);
            
            break;
        case 4:
            setData(roemerTempelBild,roemerTempelTitel,roemerTempelBildGallery,roemerTempelText_1,roemerTempelText_2,roemerTempelText_3,roemerTempelText_4);
            break;
        case 5:
            
             setData(roemerTheaterBild,roemerTheaterTitel,roemerTheaterBildGallery,roemerTheaterText_1,roemerTheaterText_2,roemerTheaterText_3,roemerTheaterText_4);

            break;
    }
    
    //Werbebanner Funtion stammt aus advertise.js
    advertise.setAdDetailSights(2);
    
    //wechsel zur Detailseite
    toDetail();
       
    
}

/******* Altstadt ******/
/** Gutenberg **/
var gutenAltstadtBild = "<img  src=\"bilder/sehenswert/altstadt/gutenberg/sehenswert_iphone_portrait.jpg\" />";
var gutenAltstadtTitel = "Johannes Gutenberg";
var gutenAltstadtText_1 = "Johannes Gensfleisch von Sorgenloch, genannt Gutenberg (* um 1400 in Mainz; † 3. Februar 1468 ebenda), gilt als Erfinder des Buchdrucks mit beweglichen Metalllettern in Europa und der Druckerpresse. Die Verwendung von beweglichen Lettern revolutionierte die herkömmlichen Methoden der Buchproduktion und löste in Europa eine Medienrevolution aus.";
var gutenAltstadtBildGallery = "<img class=\"detailMinPic\" src=\"bilder/sehenswert/altstadt/gutenberg/sehenswert_iphone_portrait.jpg\" alt=\"\" />";
var gutenAltstadtText_2 ="Gutenbergs Buchdruck breitete sich schnell in Europa und später in der ganzen Welt aus und wird als ein Schlüsselelement der Renaissance betrachtet. Insbesondere sein Hauptwerk, die Gutenberg-Bibel, wird allgemein für ihre hohe ästhetische und technische Qualität gerühmt.Zu Gutenbergs zahlreichen Beiträgen zur Buchdruckerkunst gehören neben der Verwendung von beweglichen Lettern auch die Entwicklung einer besonders praktikablen Legierung aus Zinn, Blei und Antimon, einer ölhaltigen Tinte und eines Handgießinstruments.<br/>Zudem erfand er die Druckerpresse. Das besondere Verdienst Gutenbergs liegt darin, alle Komponenten zu einem effizienten Produktionsprozess zusammengeführt zu haben, der erstmals die maschinelle Massenproduktion von Büchern ermöglichte. 1997 wurde Gutenbergs Buchdruck vom US-Magazin Time-Life zur bedeutendsten Erfindung des zweiten Jahrtausends gewählt, und 1999 kürte das amerikanische A&E Network den Mainzer zum \"Mann des Jahrtausends\".";
var gutenAltstadtText_3 = "";
var gutenAltstadtText_4 = "";

/** Fastnachtsbrunnen **/
var fastBrunnenBild = "<img   src=\"bilder/sehenswert/altstadt/fastnachtsbrunnen/fastnachtsbrunnen_iphone_port.jpg\"/>";
var fastBrunnenTitel = "Fastnachtsbrunnen";
var fastBrunnenText_1 = "Weit über die Grenzen Deutschlands für ihre närrische fünfte Jahreszeit berühmt, hatte die Stadt lange Zeit kein einziges Denkmal vorzuweisen, in dem sich die Mainzer Fastnacht widerspiegelte. Dies sollte sich erst in den 60er Jahren ändern.";
var fastBrunnenBildGallery = "<img class=\"detailMinPic\" src=\"bilder/sehenswert/altstadt/fastnachtsbrunnen/fastnachtsbrunnen_iphone_port.jpg\"  alt=\"\" />";
var fastBrunnenText_2 ="Im Spätherbst 1963 trugen die Stadtväter einem kleinen Kreis Industrieller ihren Wunsch nach Errichtung eines Fastnachtbrunnens am südlichen Ende des Schillerplatzes vor. Elf Köpfe hat das Narrenschiff. Damit sollte zum einen zur Verschönerung des Stadtbildes beigetragen und zum anderen die typische Mainzer Lebensfreude plastisch manifestiert werden.Das bekannte Getränkeunternehmen Eckes aus Nieder-Olm erklärte sich bereit, den Fastnachtsbrunnen zu stiften und schrieb einen Wettbewerb aus, den schließlich der Münchner Professor Blasius Spreng und der Mainzer Architekt Helmut Gräf für sich entscheiden konnten.";
var fastBrunnenText_3 = "<div class=\"detailSubSubTitle\">Standort</div>Schillerplatz, Ecke Schillerstraße/Ludwigsstraße";
var fastBrunnenText_4 = "";

/** Zitadelle **/
var zitadelleBild = "<img   src=\"bilder/sehenswert/altstadt/zitadelle/zitadelle_iphone_port.jpg\"/>";
var zitadelleTitel = "Die Zitadelle";
var zitadelleText_1 = "Bereits die Römer wussten die herausragende Lage der Anhöhe am südlichen Stadtrand zu schätzen und errichteten ihrem Feldherrn Drusus ein Ehrenmal, dessen Kern noch heute als Drususstein erhalten ist. Den Namen Jakobsberg trägt die Anhöhe seit der Gründung des Benediktinerklosters 1055 durch den Mainzer Erzbischof Bardo.";
var zitadelleBildGallery = "<img class=\"detailMinPic\" src=\"bilder/sehenswert/altstadt/zitadelle/zitadelle_iphone_port.jpg\" alt=\"\" />";
var zitadelleText_2 ="Da das Kloster nur leicht umwallt außerhalb der Stadtmauern lag, ergab sich eine strategische Lücke im Schutzring der Stadt. Der Ausbau des Jakobsberges zur wehrhaften Festung begann 1620 unter Kurfürst Johann Schweickhardt von Kronberg, der unter der Leitung des Domkapitulars Adolph von Waldenburg eine vorwiegend aus Gräben und Wällen bestehende Festungsanlage bauen ließ. Doch schon 1631 wird Mainz im Laufe des 30jährigen Krieges von den Schweden besetzt.<br/>Der eigentliche Ausbau der heutigen Zitadelle mit ihrem regelmäßigen Grundriss und den vier Bastionen Alarm, Tacitus, Drusus und Germanikus begann 1655 unter Kurfürst Johann Philipp von Schönborn. Die über Mainz aufragende Festungsanlage konnte ihrem Zweck allerdings nicht lange gerecht werden, da der Stadt das Geld für eine schlagkräftige Festungsbesatzung fehlte. Französische Truppen nahmen denn auch im Pfälzischen Erbfolgekrieg die Stadt ein.<br/>Auch aus ökologischer Sicht ist das Zitadellengelände bedeutsam. Im Bereich der Zitadelle kommen über 300 Tier- und Pflanzenarten vor, wovon 33 Arten auf der Roten Listen der Bundesrepublik Deutschland und des Landes Rheinland-Pfalz stehen.";
var zitadelleText_3 = "<div class=\"detailSubSubTitle\">Standort:</div>Zitadellenweg<br/>55131 Mainz";
var zitadelleText_4 = "";

/** Holzturm **/
var holzturmBild = "<img  src=\"bilder/sehenswert/altstadt/holzturm/holzturm_iphone_port.jpg\"/>";
var holzturmTitel = "Holzturm";
var holzturmText_1 = "Der Holzturm in Mainz ist ein mittelalterlicher Stadtturm, dessen heutiges gotische Erscheinungsbild aus dem beginnenden 15. Jahrhundert stammt. Namensgebend für das Gebäude war der im direkten Umfeld am Rhein liegende Holzstapelplatz der Stadt Mainz.";
var holzturmBildGallery = "<img class=\"detailMinPic\" src=\"bilder/sehenswert/altstadt/holzturm/holzturm_iphone_port.jpg\" alt=\"\" />";
var holzturmText_2 ="Zusammen mit dem Eisenturm und dem Alexanderturm ist er einer der drei heute noch existierenden Stadttürme der Mainzer Stadtmauer.Der Holzturm diente - ebenso wie der Eisenturm - im Rahmen der Stadtbefestigung als Wachturm und Stadttor und später als Gefängnis. Im 2. Weltkrieg wurde er schwer beschädigt und 1961 zur 2000 Jahr-Feier der Stadt originalgetreu rekonstruiert. Heute beherbergt der Holzturm verschiedene Initiativen und Vereine.";
var holzturmText_3 = "<div class=\"detailSubSubTitle\">Standort</div>Holzstraße, Mainz";
var holzturmText_4 = "";

/** Leichhof **/
var leichhofBild = "<img  src=\"bilder/sehenswert/altstadt/leichhof/leichhof_iphone_port.jpg\"/>";
var leichhofTitel = "Leichhof";
var leichhofText_1 = "Der Leichhof war einst Domfriedhof. Fast in der Mitte des Platzes ist seit 1980 ein Brunnen mit hohem Becken. Die anschließende schmale Straße bildet mit der Augustinerstraße die Hauptachse der südlichen Altstadt. Hier gibt es noch einige Fachwerkhäuser.";
var leichhofBildGallery = "<img class=\"detailMinPic\" src=\"bilder/sehenswert/altstadt/leichhof/leichhof_iphone_port.jpg\"  alt=\"\" />";
var leichhofText_2 ="Kurz vor dem Kirschgarten beispielsweise das Haus \"Zum Spiegelberg\" mit interessanter Kerbschnittornamentik an den Balken.";
var leichhofText_3 = "<div class=\"detailSubSubTitle\">Standort</div>Leichhof, 55116 Mainz";
var leichhofText_4 = "";

/** Marktbrunnen **/
var marktBrunnenBild = "<img  src=\"bilder/sehenswert/altstadt/marktbrunnen/marktbrunnen_iphone_port.jpg\"/>";
var marktBrunnenTitel = "Der Mainzer Marktbrunnen";
var marktBrunnenText_1 = "1526 stiftet der Mainzer Erzbischof, Kardinal Albrecht von Brandenburg, den Bürgern seiner Stadt einen auffallend beeindruckenden Brunnen, der heute nicht nur der älteste, sondern wohl auch schönste Renaissancebrunnen Deutschlands ist. Im täglichen Leben der Neuzeit sind Brunnen von wesentlicher Bedeutung.";
var marktBrunnenBildGallery = "<img class=\"detailMinPic\" src=\"bilder/sehenswert/altstadt/marktbrunnen/marktbrunnen_iphone_port.jpg\" alt=\"\" />";
var marktBrunnenText_2 ="Eine zentrale Wasserversorgung, wie es sie zu Zeiten der Römer in Mainz gegeben hatte, existiert nicht mehr. Die Bevölkerung versorgt sich aus den vielen häusernah gelegenen Brunnen. Deren Grundwasser ist aber zumeist stark verschmutzt. Öffentliche Brunnen gibt es nur wenige. Sie führen allerdings sauberes Grundwasser, für dessen Qualität eigens \"Brunnenmeister\" verantwortlich sind. Überdem sind sie beliebte Treffpunkte für soziale Kontakte; Man geht Wasser holen, unterhält sich, klatscht und tauscht Informationen aus.<br/>Die Errichtung des farbenprächtigen und schön geschmückten Marktbrunnens erscheint daher auf den ersten Blick als großherzige Geste eines Kurfürsten, der um das Wohlergehen seiner Bürger sehr bemüht ist. Wirft man aber einen genaueren Blick auf das Kunstwerk und die geschichtlichen Ereignisse jener Zeit, erweist sich die noble Spende als ganz und gar nicht uneigennützig.";
var marktBrunnenText_3 = "<div class=\"detailSubSubTitle\">Standort</div>Marktplatz zu Füßen des Doms";
var marktBrunnenText_4 = "";

/** Markthäuser **/
var markthaeuserBild = "<img  src=\"bilder/sehenswert/altstadt/markthaeuser/markthaeuser_iphone_port.jpg\"/>";
var markthaeuserTitel = "Ein Kleinod mit<br />historischen Fassaden und modernem Gesicht";
var markthaeuserText_1 = "Die Markthäuser am Dom sind nicht mehr aus dem Herzen der Stadt wegzudenken. Eine Passage von der „modernen“ Gebäudeseite am Rebstockplatz bis hin zum Markt lädt mit ihren Geschäften in Parterre und Untergeschoss zum Einkaufsbummel und Verweilen ein.";
var markthaeuserBildGallery = "<img class=\"detailMinPic\" src=\"bilder/sehenswert/altstadt/markthaeuser/markthaeuser_iphone_port.jpg\"  alt=\"\" />";
var markthaeuserText_2 ="Und wer das Leben in der quirligen Innenstadt schätzt und liebt, sollte einfach mal bei der Wohnbau Mainz nachfragen, ob noch eine der hochmodernen Mietwohnungen mit gehobener Ausstattung hinter der alten Fassade zu haben ist. Der Domblick aus den Fenstern zum Marktplatz ist wirklich unschlagbar.";
var markthaeuserText_3 = "<div class=\"detailSubSubTitle\">Standort:</div>Marktplatz Mainz<br />";
var markthaeuserText_4 = "";


function getAltstadt(index){

    switch(index){
            
        case 0:
            
            setData(gutenAltstadtBild,gutenAltstadtTitel,gutenAltstadtBildGallery,gutenAltstadtText_1,gutenAltstadtText_2,gutenAltstadtText_3,gutenAltstadtText_4);
            break;
        case 1:
            
            setData(fastBrunnenBild,fastBrunnenTitel,fastBrunnenBildGallery,fastBrunnenText_1,fastBrunnenText_2,fastBrunnenText_3,fastBrunnenText_4);
            break;
        case 2:
            
            setData(zitadelleBild,zitadelleTitel,zitadelleBildGallery,zitadelleText_1,zitadelleText_2,zitadelleText_3,zitadelleText_4);
            break;
        case 3:
            setData(holzturmBild,holzturmTitel,holzturmBildGallery,holzturmText_1,holzturmText_2,holzturmText_3,holzturmText_4);
            break;
        case 4:
            
            setData(leichhofBild,leichhofTitel,leichhofBildGallery,leichhofText_1,leichhofText_2,leichhofText_3,leichhofText_4);
            break;
        case 5:
            
            setData(marktBrunnenBild,marktBrunnenTitel,marktBrunnenBildGallery,marktBrunnenText_1,marktBrunnenText_2,marktBrunnenText_3,marktBrunnenText_4);
            break;
        case 6:
            
            setData(markthaeuserBild,markthaeuserTitel,markthaeuserBildGallery,markthaeuserText_1,markthaeuserText_2,markthaeuserText_3,markthaeuserText_4);
            break;
    }
    
    //Werbebanner Funtion stammt aus advertise.js
    advertise.setAdDetailSights(3);
    
    //wechsel zur Detailseite
    toDetail();

}

/**  Stadtführung **/
var cityTourBild = "<img width=\"100%\" src=\"bilder/sehenswert/stadtfuehrung/iphone_portrait_fuehrung.jpg\"/>";
var cityTourTitel = "Allgemeine Führungen";
var cityTourText_1 = "Erleben Sie Mainz aus völlig neuen Perspektiven. Tauchen Sie ein in Kunst, Kultur und Geschichte der Stadt und lassen Sie sich verzaubern vom Reiz vergangener Epochen. Die Mainzer Stadtspaziergänge führen zu Stätten berühmter Baudenkmäler, folgen den Spuren bekannter Persönlichkeiten und faszinieren mit ungewöhnlichen Stadtansichten. Gern organisiert das Tourist Service Center in Zusammenarbeit mit dem Mainzer Gästeführerverband e.V.  Ihren ganz persönlichen Stadtrundgang oder wählen Sie Ihr Angebot aus den  Mainzer Erlebnistouren aus. Führungen für Einzelreisende sind ohne Voranmeldung möglich und dauern in der Regel 2 Stunden. Individuelle Führungen für große und kleine Gruppen können jederzeit mit Voranmeldung gebucht werden. Weitere Informationen zu den Führungsthemen, Preisen und Treffpunkten finden Sie unter <br/><a onclick=\"navi.showExternalPage('http://www.mainz-tourismus.com');\">www.mainz-tourismus.com</a>.";
var cityTourBildGallery = "";
var cityTourText_2 = "";
var cityTourText_3 = "Tourist Service Center Mainz<br/>Brückenturm am Rathaus<br/>55116 Mainz<br/>Telefon: <a href=\"tel:06131242827\" title=\"Call\">06131/242-827/ -888</a><br/>E-Mail: <a href=\"mailto:tourist@mainzplus.com\">tourist@mainzplus.com</a>";
var cityTourText_4 = "";

function getStadtfuehrung(index){
    
    switch(index){
            
        case 0:
            
            setData(cityTourBild,cityTourTitel,cityTourBildGallery,cityTourText_1,cityTourText_2,cityTourText_3,cityTourText_4);
            break;
    }
    
    //Werbebanner Funtion stammt aus advertise.js
    advertise.setAdDetailSights(4);
    
    //wechsel zur Detailseite
    toDetail();
    
}

function toDetail(){
    $.mobile.changePage("#detaiSights");
}

function setData(pic,title,picGallery,text_1,text_2,text_3,text_4 ){
    
    $("#pictureDetial").html(pic);
    $("#titelDetail").html(title);
    $("#textDetail_1").html(text_1);
    $("#galleryDetail").html(picGallery);
    $("#textDetail_2").html(text_2);
    $("#textDetail_3").html(text_3);
    $("#textDetail_4").html(text_4);
}

var VERSION = 'versionsNumber';
var AUDIO = 'audio';

/**
 * Speichert die Versionsnummer der Branchen XML im lokalen Speicher der Anwendung
 */
function setVersionBranche(versionNumber){
    window.localStorage.setItem(VERSION, versionNumber);

}

/**
 * Liest die Versionsnummer aus und gibt sie als String zur?ck
 */
function getVersionBranche(){
    
    var value = window.localStorage.getItem(VERSION);
    //keine Version gespeichert
    if(value == null){
        return '0';
    }
    else{
        return value;
    }
}


function getAudioPlay(){
	
	var value = window.localStorage.getItem(AUDIO);
    //keine Version gespeichert
    if(value == null){
        return true;
    }
    else{
        return false;
    }
}

function setAudioPlay(){
    window.localStorage.setItem(AUDIO, 1);
	
}

/***************** STAU ******************************/
var TRAFFIC_REPORT_URL = "http://195.145.244.220/antenne-mainz/verkehr/melden.php";

function sendTrafficReport(){
    
    //Daten aus dem Formular
    var trafficStreet = $("#trafficReportForm").find('input[name="trafficStreet"]').val();
    var trafficDirection = $("#trafficReportForm").find('input[name="trafficDirection"]').val();
    var trafficReport = $("#trafficReportForm").find('input[name="trafficReport"]').val();
    var trafficReportBy = $("#trafficReportForm").find('input[name="trafficReportBy"]').val();
    
    if(trafficStreet.length == 0 || trafficReport.length == 0){
        
        ui.showDialog("Bitte kontrollieren Sie Ihre Eingabe","Um einen Stau zu melden muss min. die Straße und eine Meldung angeben werden",false);
    }
    else{
        
        $.ajax({
               type: 'POST',
               url: TRAFFIC_REPORT_URL,
               data: {
                    verkehr_strasse: trafficStreet,
                    verkehr_richtung: trafficDirection,
                    verkehr_meldung: trafficReport,
                    verkehr_gemeldet_von: trafficReportBy,
                    verkehr_published: 'N',
                    verkehr_extern: 'Y'
               },
               success: function(msg){
                    ui.showDialog("Danke für Ihre Meldung","Ihre Stau Meldung ist bei uns eingegangen und wird von einem unser Mitarbeiter bearbeitet",false);
               },
               error: function(xhr, textStatus, error){
                    ui.showDialog("Fehlermeldung","Um diese Funktion nutzen zu koennen, benoetigen Sie eine Netzwerkverbindung.",false);
               }
        });
        
        
    }
}

/***************** BLITZER ***************************/


var RADAR_REPORT_URL = "http://195.145.244.220/antenne-mainz/blitzer/melden.php";

function sendRadarReport(){
 
    //Daten aus dem Formular
    var radarMobile = $("#radarMobileList").prev().find("input").val();
    var radarStreet = $("#streetList").prev().find("input").val();
    var radarTown = $("#townList").prev().find("input").val();
    var radarDistrict = $("#districstList").prev().find("input").val();
    var radarDirection = $("#radarReportForm").find('input[name="radarDirection"]').val();
    var radarDes = $("#radarReportForm").find('textarea[name="radarDescription"]').val();
    var radarReportBy = $("#radarReportForm").find('input[name="radarReportBy"]').val();

    if(radarMobile.length == 0 || radarTown.length == 0 || radarDes.length == 0 ){
    
        ui.showDialog("Bitte kontrollieren Sie Ihre Eingabe","Um einen Bitzer zu melden muss min. das Messfahrzeug, die Straße und Position/ Beschreibung angeben werden",false);
    
    }
    else{
        
        
        $.ajax({
               type: 'POST',
               url: RADAR_REPORT_URL,
               data: {
                    blitzer_messfahrzeug: radarMobile,
                    blitzer_strasse: radarStreet,
                    blitzer_ort: radarTown,
                    blitzer_stadtteil: radarDistrict,
                    blitzer_position: radarDes,
                    blitzer_richtung: radarDirection,
                    blitzer_gemeldet_von: radarReportBy,
                    blitzer_published: 'N',
                    blitzer_extern: 'Y'
               },
               success: function(msg){
                 ui.showDialog("Danke für Ihre Meldung","Ihre Blitzer Meldung ist bei uns eingegangen und wird von einem unser Mitarbeiter bearbeitet",false);
               },
               error: function(xhr, textStatus, error){
                  ui.showDialog("Fehlermeldung","Um diese Funktion nutzen zu koennen, benoetigen Sie eine Netzwerkverbindung.",false);
               }
        });
        
    
    }
}



function sendDialog(title,text){
    
    navigator.notification.alert(text,                 // message
                                 sendDialogDismissed,       // callback
                                 title,                // title
                                 "OK"                  // buttonName
                                 );
    
}

function sendDialogDismissed(){
    // do something
}


//Zentrum
var  center = new google.maps.LatLng(50.024 , 8.27);
//Google Maps Optionen
var mapOptions = {
        zoom: 6,
        center: center,
        navigationControl: true,
        navigationControlOptions: {style: google.maps.NavigationControlStyle.ZOOM_PAN},
        streetViewControl: false,
        mapTypeControl: true,
        mapTypeControlOptions: {style: google.maps.MapTypeControlStyle.SMALL},
        mapTypeId: google.maps.MapTypeId.ROADMAP
}
var mobileDemo = { 'center': '50.024,8.27', 'zoom': 10 };

//eine oder Mehre Position -> boolean
var onePos = false;
var morePos = false;
var oneParkingPos = false;

var town = '';
var street = '';
var zipCode = '';
var description = '';

var latCoordinate = 0;
var longCoordinate = 0;

var posArray;

//koordinaten über die Addresse
var geocoder = new google.maps.Geocoder();

/**
 * Darstellung dieser Position auf einer Karte
 * @param tow - Stadt -> String
 * @param str - Strasse -> String
 * @param zip - Postleitzahl -> String
 * @param des - Beschreibung für InfoDialog -> String
 * @param ad - Werbebanner -> String
 */
function showPosOnMap(tow,str,zip,des,ad){
    
    town = tow;
    street = str;
    zipCode = zip;
    description = des;
    
    setBoolean(true,false,false);
    
    //Auswahl der Werbung - Funktion stammt aus advertise.js
    advertise.setAdOnMap(ad);
    
    $.mobile.changePage("#mapPage");
}

/**
 * Darstellung meherer Positionen auf einer Karte
 * @param array - Feld mit den Daten -> Array
 */
function showPositionsOnMap(array, ad){
    
    posArray = array;
    
    setBoolean(false,true,false);
    
    //Auswahl der Werbung - Funktion stammt aus advertise.js
    advertise.setAdOnMap(ad);
    
    $.mobile.changePage("#mapPage");
}

/**
 * Darstellung der Position eines Parkhauses auf einer Karte
 * @param lat - Breitengrad -> float
 * @param lon - Längengrad -> float
 * @param name - Name des Parkhauses -> String
 * @param tow - Stadt in der das Parkhaus liegt -> String
 * @param places - Stellplätze normal -> String
 * @param handicapped - Stellplätze behindert -> String
 */
function showOneParkingStructureOnMap(lat,lon, name, tow, str ,places, handicapped ){
    
	latCoordinate = lat;
	
    longCoordinate = lon;
    
    description = createParkingDialogLayout(name, tow, str, places, handicapped);
    
    setBoolean(false,false,true);
    
    //Auswahl der Werbung - Funktion stammt aus advertise.js
    advertise.setAdOnMap('parkhausListe');
    
	
	$.mobile.changePage("#mapPage");
}



/**
 * Darstellung mehrer Positionen auf der Karte
 */
function showAllParkingStructureOnMap(){
    
    setBoolean(false,false,false);
    
    //Auswahl der Werbung - Funktion stammt aus advertise.js
    advertise.setAdOnMap('parkhaeuser');
    $.mobile.changePage("#mapPage");
}

/**
 * Setzt die Warheitswerte
 */
function setBoolean(one,more,parking){

    onePos = one;
    morePos = more;
    oneParkingPos = parking;
}

//ParkingGarageOnMap
$('#mapPage').live("pageshow", function() {
    
    $('#karte').gmap('refresh');
    
    //User Position
    navigator.geolocation.getCurrentPosition(geolocationSuccess,geolocationError);
    
    if(onePos){
        showOneAddressOnMap();
    }
    else if(morePos){
        showMoreAddressOnMap();
    }
    else if(oneParkingPos){
        oneParkingStructureOnMap();
    }
    else{
        printOnConsole("pageshow","allParkingStructureOnMap"); 
        allParkingStructureOnMap();
    }

                   
    printOnConsole("pageshow","pageshow");           
               
});

$('#mapPage').live("pageinit", function() {
        
        $('#karte').gmap(mapOptions);
});


$('#mapPage').live("pagebeforeshow", function() {
    
   if(conection.internet()){
      //mache nix
        
    }else{
                   
      ui.showDialog("Keine Netzwerkverbindung","Zur Anzeige benötigen Sie eine Netzwerkverbindung.",true);
      
    }
	
});


$('#mapPage').live('pagehide', function() {
        
    clean();
    
});



/**************** Position Benutzer *************************/
function geolocationSuccess(pos){

    var userPos = pos.coords.latitude + ' , ' + pos.coords.longitude;
    
    printOnConsole("geolocationSuccess","Pos: "+userPos);
    
    var $marker = $('#karte').gmap('addMarker', {'position': userPos,'icon':'bilder/marker/red-pin.png', 'bounds': true});
	
	
    
    $marker.click(function() {
        $('#karte').gmap('openInfoWindow', {'content': 'Hi Hallo User! das ist deine Position'}, this);
    });
    
}

function geolocationError(err){}
/*****************************************/
//navi
function backMap(){
   
    clean();
    history.back();

}

//navi
function homeMap(){
   
  clean();
  $.mobile.changePage("#main");
}

function clean(){
    $('#karte').gmap('clear', 'markers');
    $('#karte').gmap('closeInfoWindow');
    
    printOnConsole("showMoreAddressOnMap","llöschen!!!");
}

/*****************************************/
//Anzeige der Adresse von showOnePosOnMap
function showOneAddressOnMap(){
    
    geocoder.geocode( { 'address': zipCode + ' ' + town + ' , ' +  street + ' '}, function(results, status) {
                     
            if (status == google.maps.GeocoderStatus.OK) {
                     
                $('#karte').gmap('addMarker', { 'position': results[0].geometry.location,'bounds': true }).click(function() {
                    $('#karte').gmap('openInfoWindow', { 'content': description }, this);
                });
                    
            } else {
                alert("Geocode was not successful for the following reason: " + status);
            }
    });

}

function showMoreAddressOnMap(){
    
    
    var len = posArray.length;
    
    printOnConsole("showMoreAddressOnMap","len: "+len);
    
    
    
    for(i = 0; i < len; i++){
        
        var arr = posArray[i];
        //printOnConsole("showMoreAddressOnMap","Adress: "+arr['lat'] + ' , ' + arr['long']);
        $('#karte').gmap('addMarker', { 'position': arr['lat'] + ' , ' + arr['long'] ,'id': i, 'bounds': true }).click(function()
        {
            openDetails(this);
                                                                                                                  
        });
    }

}

function openDetails(marker) {
    
    var arr = posArray[marker.id];
    
    if(arr['click']){
        
        //aufruf der Detials XMl -> Funktion stammt aus der XML.js
        searchDetail(arr['id']);
    }
    else{
      alert("Für diese Auswahl ist leider keine Detailansicht verfügbar.");
    }
    
    
}

/**************** Parkhäuser *************************/
function oneParkingStructureOnMap(){
	
    $('#karte').gmap('addMarker', { 'position': latCoordinate + ',' + longCoordinate,'icon':'bilder/marker/Parken_Button_klein.png','bounds': true }).click(function() {
            $('#karte').gmap('openInfoWindow', { 'content': description }, this);
    });
    
}

//erstellt den Inhalt des Dialog
function createParkingDialogLayout(name, tow, str, place, handicapped){
    
    var des = '<div class="dialogMapName">' + name + '</div><div>' + tow + ', ' + str + '</div><div class="dialogMapText">Anzahl Stellplätze: '+ place + '</div>';
    
    if(handicapped.length > 0){
        
        des = des + '<div class="dialogMapText">Anzahl Behindertenstellplätze: ' + handicapped + '</div>';
    }
    
    return des;
}

//Daten für die Darstellung der Parkhäuser
var google_maps_marker_data = [];

var marker_buffer = new Object();
marker_buffer['lat'] = 50.000435;
marker_buffer['lng'] = 8.276573;
marker_buffer['name'] = 'Parkhaus Rathaus';
marker_buffer['street'] = 'Rheinstr. 66';
marker_buffer['town'] = ' 55116 Mainz / Rheingoldhalle';
marker_buffer['places'] = '545';
marker_buffer['handicapped'] = '6';
google_maps_marker_data.push(marker_buffer);

var marker_buffer = new Object();
marker_buffer['lat'] =  50.00211;
marker_buffer['lng'] = 8.27417;
marker_buffer['name'] = 'Parkhaus Löhrstraße';
marker_buffer['street'] = 'Einfahrt Löhrstraße';
marker_buffer['town'] = '55116 Mainz';
marker_buffer['places'] = '145';
marker_buffer['handicapped'] = '';
google_maps_marker_data.push(marker_buffer);

var marker_buffer = new Object();
marker_buffer['lat'] =  49.999316;
marker_buffer['lng'] = 8.265646;
marker_buffer['name'] = 'Parkhaus Schillerplatz';
marker_buffer['street'] = 'Einfahrt Schillerstraße';
marker_buffer['town'] = '55116 Mainz';
marker_buffer['places'] = '480';
marker_buffer['handicapped'] = '';
google_maps_marker_data.push(marker_buffer);

var marker_buffer = new Object();
marker_buffer['lat'] =  50.003424;
marker_buffer['lng'] = 8.266912;
marker_buffer['name'] = 'Parkhaus Bleiche';
marker_buffer['street'] = 'Einfahrt Balthasar-Maler-Gasse';
marker_buffer['town'] = '55116 Mainz';
marker_buffer['places'] = '227';
marker_buffer['handicapped'] = '2 im Untergeschoss';
google_maps_marker_data.push(marker_buffer);

var marker_buffer = new Object();
marker_buffer['lat'] =  50.00455;
marker_buffer['lng'] = 8.2712;
marker_buffer['name'] = 'Parkhaus Deutschhausplatz';
marker_buffer['street'] = 'Große Bleiche';
marker_buffer['town'] = '55116 Mainz';
marker_buffer['places'] = '190';
marker_buffer['handicapped'] = '';
google_maps_marker_data.push(marker_buffer);

var marker_buffer = new Object();
marker_buffer['lat'] =   50.006967;
marker_buffer['lng'] = 8.270554;
marker_buffer['name'] = 'Parkplatz Schloss';
marker_buffer['street'] = 'Ernst-Ludwig-Straße';
marker_buffer['town'] = '55116 Mainz';
marker_buffer['places'] = '122';
marker_buffer['handicapped'] = '5';
google_maps_marker_data.push(marker_buffer);

var marker_buffer = new Object();
marker_buffer['lat'] =   49.9928617;
marker_buffer['lng'] = 8.2472526;
marker_buffer['name'] = 'Parkhaus Theater ';
marker_buffer['street'] = 'Am Kronberger Hof';
marker_buffer['town'] = '55116 Mainz';
marker_buffer['places'] = '207';
marker_buffer['handicapped'] = '';
google_maps_marker_data.push(marker_buffer);

var marker_buffer = new Object();
marker_buffer['lat'] =   49.998203;
marker_buffer['lng'] = 8.257234;
marker_buffer['name'] = 'Parkhaus CityPort';
marker_buffer['street'] = 'Peter-Altmeier-Allee';
marker_buffer['town'] = '55116 Mainz';
marker_buffer['places'] = '497';
marker_buffer['handicapped'] = '8';
google_maps_marker_data.push(marker_buffer);

var marker_buffer = new Object();
marker_buffer['lat'] =   50.006745;
marker_buffer['lng'] = 8.270710;
marker_buffer['name'] = 'Parkhaus Rheinufer';
marker_buffer['street'] = 'Linsenberg, Augustusstraße';
marker_buffer['town'] = '55131 Mainz';
marker_buffer['places'] = '1105';
marker_buffer['handicapped'] = '20';
google_maps_marker_data.push(marker_buffer);

var marker_buffer = new Object();
marker_buffer['lat'] =   50.0020225;
marker_buffer['lng'] = 8.2660639;
marker_buffer['name'] = 'Parkhaus Römerpassage';
marker_buffer['street'] = 'Emmeransstraße';
marker_buffer['town'] = '55116 Mainz';
marker_buffer['places'] = '181';
marker_buffer['handicapped'] = '11';
google_maps_marker_data.push(marker_buffer);

var marker_buffer = new Object();
marker_buffer['lat'] =   50.0004628;
marker_buffer['lng'] = 8.2687309;
marker_buffer['name'] = 'Parkhaus Kronberger Hof';
marker_buffer['street'] = 'Am Kronberger Hof';
marker_buffer['town'] = '55116 Mainz';
marker_buffer['places'] = '495';
marker_buffer['handicapped'] = '4';
google_maps_marker_data.push(marker_buffer);

var marker_buffer = new Object();
marker_buffer['lat'] =   49.993695;
marker_buffer['lng'] = 8.278413;
marker_buffer['name'] = 'Parkhaus CineStar';
marker_buffer['street'] = 'Neutorstraße';
marker_buffer['town'] = '55116 Mainz';
marker_buffer['places'] = '459';
marker_buffer['handicapped'] = '8';
google_maps_marker_data.push(marker_buffer);

var marker_buffer = new Object();
marker_buffer['lat'] =   50.0048703;
marker_buffer['lng'] = 8.2483513;
marker_buffer['name'] = 'Parkhaus Wallstrasse';
marker_buffer['street'] = 'Wallstraße';
marker_buffer['town'] = '55122 Mainz';
marker_buffer['places'] = '303';
marker_buffer['handicapped'] = '';
google_maps_marker_data.push(marker_buffer);

var marker_buffer = new Object();
marker_buffer['lat'] =   50.0036575;
marker_buffer['lng'] = 8.2610027;
marker_buffer['name'] = 'Parkhaus Bonifazius Türme';
marker_buffer['street'] = 'Bonifaziusstraße';
marker_buffer['town'] = '55118 Mainz';
marker_buffer['places'] = '450';
marker_buffer['handicapped'] = '5';
google_maps_marker_data.push(marker_buffer);

var marker_buffer = new Object();
marker_buffer['lat'] =   49.99807;
marker_buffer['lng'] =  8.25169;
marker_buffer['name'] = 'Parkhaus Taubertsberg';
marker_buffer['street'] = 'Binger Str., Wallstr.';
marker_buffer['town'] = '55122 Mainz';
marker_buffer['places'] = '767';
marker_buffer['handicapped'] = '21';
google_maps_marker_data.push(marker_buffer);

var marker_buffer = new Object();
marker_buffer['lat'] =   50.00035;
marker_buffer['lng'] =  8.24754;
marker_buffer['name'] = 'Parkplatz Martin-Luther-King-Park';
marker_buffer['street'] = 'Dr. Martin-Luther-King-Weg';
marker_buffer['town'] = '55122 Mainz';
marker_buffer['places'] = '192';
marker_buffer['handicapped'] = '';
google_maps_marker_data.push(marker_buffer);

var marker_buffer = new Object();
marker_buffer['lat'] =   49.9937155;
marker_buffer['lng'] =  8.261362;
marker_buffer['name'] = 'Parkplatz Unikliniken Kerngelände';
marker_buffer['street'] = 'Langenbeckstraße, Am Linsenberg';
marker_buffer['town'] = '55131 Mainz';
marker_buffer['places'] = '669';
marker_buffer['handicapped'] = '10';
google_maps_marker_data.push(marker_buffer);

var marker_buffer = new Object();
marker_buffer['lat'] =   49.992868;
marker_buffer['lng'] =  8.260721;
marker_buffer['name'] = 'Parkhaus Unikliniken Urol./Ortho./Kons.';
marker_buffer['street'] = 'Langenbeckstraße, Am Linsenberg';
marker_buffer['town'] = '55131 Mainz';
marker_buffer['places'] = '617';
marker_buffer['handicapped'] = '';
google_maps_marker_data.push(marker_buffer);

var marker_buffer = new Object();
marker_buffer['lat'] =   49.992868;
marker_buffer['lng'] =  8.260721;
marker_buffer['name'] = 'Parkplatz Unikliniken Zahnklinik';
marker_buffer['street'] = 'Am Römerlager';
marker_buffer['town'] = '55131 Mainz';
marker_buffer['places'] = '104';
marker_buffer['handicapped'] = '';
google_maps_marker_data.push(marker_buffer);

var marker_buffer = new Object();
marker_buffer['lat'] =   49.9936896;
marker_buffer['lng'] =  8.2600588;
marker_buffer['name'] = 'Parkhaus Augustusplatz ';
marker_buffer['street'] = 'Am Römerlager';
marker_buffer['town'] = '55131 Mainz';
marker_buffer['places'] = '540';
marker_buffer['handicapped'] = '5 pro Ebene';
google_maps_marker_data.push(marker_buffer);

var marker_buffer = new Object();
marker_buffer['lat'] =   49.993465;
marker_buffer['lng'] =  8.277565;
marker_buffer['name'] = 'Parkhaus Römisches Theater';
marker_buffer['street'] = 'Holzhofstraße';
marker_buffer['town'] = '55116 Mainz';
marker_buffer['places'] = '436';
marker_buffer['handicapped'] = '10';
google_maps_marker_data.push(marker_buffer);

//Darstellung aller Parkäuser aus dem Feld google_maps_marker_data auf der Karte
function allParkingStructureOnMap(){
    
    var len = google_maps_marker_data.length;
    
    for(i = 0; i < len; i++){
        
        var arr = google_maps_marker_data[i];
        
        
        $('#karte').gmap('addMarker', { 'position': arr['lat'] + ',' + arr['lng'], 'icon':'bilder/marker/Parken_Button_klein.png','id': i ,'bounds': true }).click(function() {
            openDialog(this);
                                                                                                                                                          
        });
        
        
    }
    
     $('#karte').gmap('refresh');

}

//Dialog der Angzeigt wird wenn ein Parkhaus aus allParkingStructureOnMap angeklickt wird
function openDialog(marker) {
   
    var arr = google_maps_marker_data[marker.id];
    
    var des = createParkingDialogLayout(arr['name'], arr['town'], arr['street'], arr['places'], arr['handicapped']);
    
    $('#karte').gmap('openInfoWindow', { 'content': des }, marker);
}


/***************************** Position für Blitzermelden **************/
function geolocationBlitzerSuccess(lat,lon){
//    alert("aadas2");
    //pos.coords.latitude + ',' + pos.coords.longitude
    
    geocoder.geocode( { 'latlng': lat+','+lon }, function(results, status) {
                     
                     if (status == google.maps.GeocoderStatus.OK) {
                        alert(results);
                     //$('#karte').gmap('addMarker', { 'position': results[0].formatted_address,'bounds': true }).click(function() {
                     //$('#karte').gmap('openInfoWindow', { 'content': description }, this);
                     //});
                     
                     } else {
                        alert("Geocode was not successful for the following reason: " + status);
                     }
    });
    
    
}



//////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////
// Datenbank der Blitzer /////////////////////////////////////////
// Daten werden aus der xml/blitzer.xml Datei gezogen ////////////

var DB_NAME = "DBBlitzerMainz";
var DB_VERSION = "1.0";
var DB_DISPLAY_NAME = "BlitzerDatenbank";
var DB_SIZE = 512000;


var blitzerXML = {
		
		blitzerObjects: [],
		blitzerArray: [],
		count: 0,
		
		getBlitzerFromXML: function(){
			$.ajax({
				url: "xml/blitzer.xml",
				dataType: "xml",
				success: function(results){
					blitzerXML.blitzerObjects = results;
					$(blitzerXML.blitzerObjects).find("blitzer").each(function(){
						blitzerXML.count++;
					});
					$(blitzerXML.blitzerObjects).find("bezeichnung").each(function(i){
						blitzerXML.blitzerArray[i] = $(this).text();
					});
          			blitzerDB.openBlitzerDB();
				}
			});
		}
};

var blitzerDB = {
		
		blitzer: window.openDatabase(DB_NAME, DB_VERSION, DB_DISPLAY_NAME, DB_SIZE),
	
		openBlitzerDB: function(){
			blitzerDB.blitzer.transaction(blitzerDB.createTable, blitzerDB.failed, blitzerDB.success); //===============================
		},                                                                                                                            //
                                                                                                                                      //
		proofIfExists: function(tx){                                                                                                  //
			tx.executeSql('SELECT blitzertyp FROM blitzer', [], blitzerDB.insertIntoDialog, blitzerDB.failed);                        //
		},                                                                                                                            //
                                                                                                                                      //
		alreadyExists: function(tx, results){                                                                                         //
			console.log("Database already exists. Database not created / updated!");                                                  //
//			tx.executeSql("SELECT * FROM blitzer", [], blitzerDB.insertIntoDialog, blitzerDB.failed);                                 //
			blitzerDB.insertIntoDialog(tx, results);                                                                                  //
		},                                                                                                                            //
                                                                                                                                      //
		createTable: function(tx){//       <============================================================================================
            tx.executeSql('DROP TABLE IF EXISTS blitzer');
			tx.executeSql('CREATE TABLE IF NOT EXISTS blitzer (id INTEGER PRIMARY KEY AUTOINCREMENT, blitzertyp TEXT)');
			for(var i = 0; i < blitzerXML.count; i++){
				tx.executeSql('INSERT INTO blitzer ( blitzertyp ) VALUES ( "' + blitzerXML.blitzerArray[i] + '" )');
			}
			tx.executeSql('SELECT * FROM blitzer', [], blitzerDB.insertIntoDialog, blitzerDB.failed);
		},
		
		insertIntoDialog: function(tx, results){
			for(var j = 0; j < results.rows.length; j++){
                $("#radarMobileList").append('<li class="types" onclick="toMobile(\'' + results.rows.item(j).blitzertyp + '\')"><a href="">' + results.rows.item(j).blitzertyp + '</a></li>');
            }
		},
		
		success: function(){
			console.log("Successfully opened database");
		},
		
		failed: function(err){
			console.log("Could not read: " + err);
		}
		
};

////////////////////////////////////////
// Datenbank der Stra?ennamen
var DB_NAME = "DBStrassenMainz";
var DB_VERSION = "1.0";
var DB_DISPLAY_NAME = "Strassen Mainz and More";
var DB_SIZE = 512000;   //Gr??e in Byte => 512000 byte = 500 kb

var TABLE_NAME = "blitzermeldungen";
var TABLE_COLUMN_VER = "version";
var TABLE_COLUMN_MOBILE = "mobile";
var TABLE_COLUMN_STREET = "street";
var TABLE_COLUMN_TOWN = "town";
var TABLE_COLUMN_DIST = "district";


////////////////////////////////////////////////////
// Einlesen in die Datenbank ?ber XML
var xml = {

version: 0,
streets: [],
count: 0,
mobileArray: [],
streetArray: [],
townArray: [],
distArray: [],
    
parseXML: function(){
    $.ajax({
           url: "xml/blitzer.xml",
           dataType: "xml",
           success: function(results){
           xml.streets = results;
//               if(db.checkedVersion){
                   $(xml.streets).find("street").each(function(){
                                                    xml.count++;
                                                    });
/*                   $(results).find("streetNames").each(function(){
                                                       xml.version = parseFloat($(this).attr("version"));
                                               });*/
                   xml.makeArray();
//               }
           }
           });
},
    
makeArray: function(){
    $(xml.streets).find("mobile").each(function(i){
                                        xml.streetArray[i] = $(this).text();
                                        });
    $(xml.streets).find("street").each(function(i){
                                        xml.streetArray[i] = $(this).text();
                                        });
    $(xml.streets).find("town").each(function(i){
                                    xml.townArray[i] = $(this).text();
                                    });
    $(xml.streets).find("district").each(function(i){
                                         xml.distArray[i] = $(this).text();
                                         });
    openDB();
}
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Erstellen und ?ffnen der lokalen Datenbank

var sdb = window.openDatabase(DB_NAME,DB_VERSION,DB_DISPLAY_NAME,DB_SIZE);
var dbVersion = 0;

function openDB(){ //DATENBANK WIRD AN DIESER STELLE GE?FFNET; WEITER ZUR ERSTELLUNG
    sdb.transaction(createDB,errorCB,successCB);
}

function createDB(tx){ //FALLS DIE TABELLE NOCH NICHT EXISTIERT WIRD SIE HIER ERSTELLT; WEITER ZUM VERSIONS-CHECK
    tx.executeSql('DROP TABLE IF EXISTS ' + TABLE_NAME);
    tx.executeSql('CREATE TABLE IF NOT EXISTS '+TABLE_NAME+' (id INTEGER PRIMARY KEY  AUTOINCREMENT, '+TABLE_COLUMN_MOBILE+' TEXT, '+TABLE_COLUMN_VER+' REAL, '+TABLE_COLUMN_STREET+' TEXT, '+TABLE_COLUMN_TOWN+' TEXT, '+TABLE_COLUMN_DIST+' TEXT)');
//    checkDBVersion(tx); FUNKTION DIE EINGEBUNDEN WIRD SOBALD DIE VERSIONSABFRAGE UNTERST?TZT WIRD
    
    var addString;
    for(var i=0;i<xml.count;i++){
        addString = "INSERT INTO " + TABLE_NAME;
        addString = addString + " ( ";
        addString = addString + "id, " + TABLE_COLUMN_VER + ",, " + TABLE_COLUMN_MOBILE + ", " + TABLE_COLUMN_STREET + ", " + TABLE_COLUMN_TOWN + ", " + TABLE_COLUMN_PLZ + ", " + TABLE_COLUMN_DIST + " ) ";
        addString = addString + "VALUES ( " + i + ","+xml.version+",'"+xml.mobileArray[i]+"','"+xml.streetArray[i]+"','"+xml.townArray[i]+"','"+xml.distArray[i]+"'";
        addString = addString + " )";
        tx.executeSql(addString);
    }
    
    tx.executeSql('SELECT * FROM '+TABLE_NAME, [], querySuccess, errorCB);
}

function checkDBVersion(tx){ //HIER WIRD AUS DER TABELLE
    tx.executeSql('SELECT '+TABLE_COLUMN_VER+' FROM '+TABLE_NAME, [], versionQuery, errorVersionQuery);
}

function versionQuery(tx, results){ //PR?FE OB DIE SPALTE "VERSION" WERTE HAT; PR?FE ANSCHLIESSEND OB XML-VERSION AKTUELLER IST ALS DB-VERSION
    if(results.rows.length != 0){
        for(var i=0;i<results.rows.length;i++){
            dbVersion = parseFloat(results.rows.item(i).version);
        }
        if(xml.version > dbVersion){
            updateTable(tx);
        }
        else{
            queryDB(tx);
        }
    }
    else{
        fillTable(tx);
    }
}

function errorVersionQuery(tx, err){
    console.log("Error with version query: "+err.code+": "+err.message);
}

function fillTable(tx){
    /*var addString;
    for(var i=0;i<xml.count;i++){
        addString = "INSERT INTO " + TABLE_NAME;
        addString = addString + " ( ";
        addString = addString + "id, " + TABLE_COLUMN_VER + ",, " + TABLE_COLUMN_MOBILE + ", " + TABLE_COLUMN_STREET + ", " + TABLE_COLUMN_TOWN + ", " + TABLE_COLUMN_PLZ + ", " + TABLE_COLUMN_DIST + " ) ";
        addString = addString + "VALUES ( " + i + ","+xml.version+",'"+xml.mobileArray[i]+"','"+xml.streetArray[i]+"','"+xml.townArray[i]+"','"+xml.distArray[i]+"'";
        addString = addString + " )";
        tx.executeSql(addString);
    }
    queryDB(tx);*/
}

function updateTable(tx){
    var updateString;
    for(var i=0;i<xml.count;i++){
        updateString = "UPDATE "+TABLE_NAME+" ";
        updateString = updateString + "SET "+TABLE_COLUMN_VER+"="+xml.version+", ";
        updateString = updateString + TABLE_COLUMN_MOBILE+"='"+xml.mobileArray[i]+"', ";
        updateString = updateString + TABLE_COLUMN_STREET+"='"+xml.streetArray[i]+"', ";
        updateString = updateString + TABLE_COLUMN_TOWN+"='"+xml.townArray[i]+"', ";
        updateString = updateString + TABLE_COLUMN_DIST+"='"+xml.distArray[i]+"' ";
        updateString = updateString + "WHERE id="+i;
        tx.executeSql(updateString);
    }
    //queryDB(tx);
}

function querySuccess(tx, results){
    for(var i=0;i<results.rows.length;i++){
        $("#radarMobileList").append('<li class="mobiles" onClick="toMobile(\''+results.rows.item(i).mobile+'\')"><a href="">'+results.rows.item(i).mobile+'</a></li>');
    }
    for(var i=0;i<results.rows.length;i++){
        $("#streetList").append('<li class="streets" onClick="toStreet(\''+results.rows.item(i).street+'\')"><a href="">'+results.rows.item(i).street+'</a></li>');
    }
    for(var i=0;i<results.rows.length;i++){
            $("#townList").append('<li class="towns" onClick="toTown(\''+results.rows.item(i).town+'\')"><a href="">'+results.rows.item(i).town+'</a></li>');
    }
    for(var i=0;i<results.rows.length;i++){
        $("#districtList").append('<li class="districts" onClick="toDistrict(\''+results.rows.item(i).district+
          '\')"><a href="">'+results.rows.item(i).district+'</a></li>');
    }
}

function requestDB(){
    sdb.transaction(queryDB, errorCB, successCB);
}

function errorCB(err){
    console.log("There was an error: "+err.code+": "+err.message+" / "+err);
}

function successCB(){
    console.log("All processes of the database were successful");
}

function queryDB(tx){
    tx.executeSql('SELECT * FROM '+TABLE_NAME, [], querySuccess, errorCB);
}

//-------- FUNKTIONEN -------------//
var pushNotification = null;
var deviceID = "";
var url_to_push = "http://195.145.244.220/mainzandmore_phone_testpush/";
var DEVICETOKEN_URL_IOS = "push_device.php";
var PUSH_DIALOG_TITLE = "Mainz&more";
//Android
var DEVICETOKEN_URL_ANDROID = "push_device_android.php";
var SENDER_ID = "673580924962";

//Registriert das Gerät für den Empfang von Push Benachrichtigungen
function pushRegister()
{
    pushNotification = window.plugins.pushNotification;
    
    if(device.platform == 'Android') {
        pushNotification.register(successHandlerAndroid, errorHandlerAndroid, { "senderID":SENDER_ID, "ecb":"onNotificationGCM" });		// required!
    }
    else {
        pushNotification.register(tokenHandler, errorHandler,{"badge":"true","sound":"true","alert":"true","ecb":"onNotificationAPN"});	// required!
    }
    
}

/************************ ANDROID ******************/
function successHandlerAndroid (result) {
    printOnConsole("successHandlerAndroid",'success: '+ result);
}

function errorHandlerAndroid(error) {
    
    printOnConsole("errorHandler",'error: '+ result);
}

//Verarbeitet die GCM-Notifications
function onNotificationGCM(e) {
    
    switch( e.event )
    {
        case 'registered':
            
            if ( e.regid.length > 0 )
            {
                deviceID = "" + e.regid;
                
                $("#devID").text(deviceID.substr(0, 10));
                
                $("#deviceIDString").text("ID: " + deviceID.substr(0, 10));
                
                //versenden des Token
                $.ajax({			
                		url: url_to_push + DEVICETOKEN_URL_ANDROID, 
                		data: { token: deviceID, device_id: ""+device.uuid },
                		type: "POST",
                		success: function( data ) {
                			//alert("successfully registered with: " + data);
                		},
                		error: function(err) {
                			//alert("could not register device!" + err);
                		}
                });
            }
            break;
            
        case 'message':
            // if this flag is set, this notification happened while we were in the foreground.
            // you might want to play a sound to get the user's attention, throw up a dialog, etc.
            if (e.foreground)
            {
                
                //if the notification contains a soundname, play it.
                var my_media = new Media("file:///android_asset/www/js/push/audio/beep.wav");
                my_media.play();
            }
            else
            {
                // otherwise we were launched because the user touched a notification in the notification tray.
                if (e.coldstart)
                    printOnConsole("onNotificationGCM",'---- COLDSTART NOTIFICATION ----');
                else
                    printOnConsole("onNotificationGCMr",'------ BACKGROUND NOTIFICATION----');
            }
            
            ui.showDialog(PUSH_DIALOG_TITLE, e.payload.message);
            
            break;
            
        case 'error':
            deviceID = e.msg;
            break;
            
        default:
            printOnConsole("onNotificationGCM",'EVENT -> Unknown, an event was received and we do not know what it is');
            break;
    }
}



/************************* IOS ********************/

//Verarbeitet die APNS-Notifications
function onNotificationAPN(e) {
    
    if (e.alert)
    {
//        navigator.notification.alert(e.alert);
    }
    
    if (e.sound)
    {
        var snd = new Media(e.sound);
        snd.play();
    }
    
    if (e.badge)
    {
        pushNotification.setApplicationIconBadgeNumber(successHandler, e.badge);
    }
}

function successHandler(result) {
    
    printOnConsole("successHandler",'success: '+ result);
}


//erfolgreiche IOS Registration
function tokenHandler(result) {
    
    deviceID = result;
    
    $("#devID").text(deviceID.substr(0, 10));
    
    $("#deviceIDString").text("ID: " + deviceID.substr(0, 10));
    
    //versenden des Token
    $.post( url_to_push + DEVICETOKEN_URL_IOS, { token: deviceID, device: 'smartphone' },function( data ) {});
    
}

//Fehler bei der IOS Registration
function errorHandler(error)
{
    deviceID = error;
}

// Der Eventhandler für die Checkbox passt hier am Ehesten hin
//$("#blitzerNotificationsActive").change(function()
//                                        {
//                                            if ($(this).prop("checked") == true)
//                                            {
//                                                window.localStorage.setItem("pushAllowed", "true");
//                                            }
//                                            else
//                                            {
//                                                window.localStorage.setItem("pushAllowed", "false");
//                                            }
//                                        });

cordova.define("com.phonegap.plugins.PushPlugin.PushNotification", function(require, exports, module) { var PushNotification = function() {
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
PushNotification.prototype.unregister = function(successCallback, errorCallback, options) {
    if (errorCallback == null) { errorCallback = function() {}}

    if (typeof errorCallback != "function")  {
        console.log("PushNotification.unregister failure: failure parameter not a function");
        return
    }

    if (typeof successCallback != "function") {
        console.log("PushNotification.unregister failure: success callback parameter must be a function");
        return
    }

     cordova.exec(successCallback, errorCallback, "PushPlugin", "unregister", [options]);
};

    // Call this if you want to show toast notification on WP8
    PushNotification.prototype.showToastNotification = function (successCallback, errorCallback, options) {
        if (errorCallback == null) { errorCallback = function () { } }

        if (typeof errorCallback != "function") {
            console.log("PushNotification.register failure: failure parameter not a function");
            return
        }

        cordova.exec(successCallback, errorCallback, "PushPlugin", "showToastNotification", [options]);
    }
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

    cordova.exec(successCallback, errorCallback, "PushPlugin", "setApplicationIconBadgeNumber", [{badge: badge}]);
};

//-------------------------------------------------------------------

if(!window.plugins) {
    window.plugins = {};
}
if (!window.plugins.pushNotification) {
    window.plugins.pushNotification = new PushNotification();
}

if (typeof module != 'undefined' && module.exports) {
  module.exports = PushNotification;
}
});


var slider = {
    pages: new Array(),
    subPages: new Array(),
    index: 0,
    MIN_CATEGORIE: 0,
    MAX_CATEGORIE: 5,
    indexSubMenu: -1,
    ID_RADAR: 'blitzer',
    ID_TRAFFIC: 'stau',
    ID_PARKING: 'parken',
    ID_SEARCH_SHOP: 'sucheShop',
    ID_SEARCH_GASTRO: 'sucheGastro',
    ID_MODE: 'mode',
    ID_LEBENSMITTEL: 'lebensmittel',
    ID_KUNST: 'kunst',
    ID_SCHOENHEIT: 'schoenheit',
    ID_VERKEHR: 'verkehr',
    ID_HANDWERK: 'handwerk',
    ID_COMPUTER: 'computer',
    ID_MULTIMEDIA: 'multimedia',
    ID_BAU: 'bau',
    ID_EINRICHTUNG: 'einrichtung',
    ID_ARZT: 'arzt',
    ID_BILDUNG: 'bildung',
    ID_GELD: 'geld',
    ID_SHOP_SONSTIGES: 'sonstiges',
    ID_RESTAURANT: 'restaurant',
    ID_CAFE: 'cafe',
    ID_BIER: 'bier',
    ID_BAR: 'bar',
    ID_KIOSK: 'kiosk',
    ID_HOTEL: 'hotel',
    ID_GASTRO_TIPPS: 'gastroTipps',
    //Erstellt den Slider auf der naviPage
    initNaviSlider: function(){
        //310
        //210
        //160
        $('#navigation').boutique({
                              container_width:	window.innerWidth * 0.86,
                              front_img_width:	window.innerWidth * 0.7,
                              front_img_height:	window.innerHeight * 0.33,
                              frames: 3,
                              starter: 1,
                              speed:	 600,
                              behind_opacity: 0.6,
                              autoplay:	 false,
                              autoplay_interval:	4000,
                              freescroll:	 false,
                              text_front_only: false,
                              move_on_hover:	 false
        });
    
    
        //this.pages = $("#categoriePages .catPage").children();
        this.pages = $("#categoriePages .catPage");
        this.subPages = $("#categoriePages .catSubPage");
        
    },
    goToFrame:function(frameIndex){
    
        if(frameIndex > 0){
            this.index = frameIndex - 1;
        }else{
            this.index = 0;
        }
    
    
        $(this.pages[this.index]).show();
    
        //index begint hier mit 1
        navigation_goto(frameIndex);
    
    },
    hideLastFrame: function(){
        this.hideFrame(this.index);
    },
    hideFrame: function(index){
    
        $(this.pages[index]).hide();
    
    },
    showFrame: function(index){
        $(this.pages[index]).show();
    },
    getIndex: function(){
        return this.index;
    },
    setIndex: function(index){
        this.index = index;
    },
    swipeNaviSlider: function(){
    //#navigation
        $('.sliderNavigation').swipe({
                               
                               swipe:function(event, direction, distance, duration, fingerCount) {
                               
            
                                if(direction == 'left')
                                {
                               
                                    slider.nextCategorie();
                               
                                }
                                else if(direction == 'right')
                                {
                                    slider.prevCategorie();
                               
                                }
                            }
        });
    },
    nextCategorie: function(){
        
        if(this.indexSubMenu > -1){
            
            this.hideSubMenu();
        }
        
        var index = this.getIndex();
        
        this.hideFrame(index);
        
        var MIN = this.MIN_CATEGORIE;
        var MAX = this.MAX_CATEGORIE;
        
        if(index < MAX){
            //index = this.index + 1;
            var i = index + 1;
            this.setIndex(i);
            this.showFrame(i);
            
        }else{
            
            //index = MIN;
            this.setIndex(MIN);
            this.showFrame(MIN);
            
        }
        
        advertise.setAdPages(this.getIndex());
        
        navigation_next();
        
    },
    prevCategorie: function(){
        
        if(this.indexSubMenu > -1){
            
            this.hideSubMenu();
        }
        
        var index = slider.getIndex();
        
        slider.hideFrame(index);
        
        var MIN = this.MIN_CATEGORIE;
        var MAX = this.MAX_CATEGORIE;
        
        if(index > MIN){
            
            //index = index - 1
            this.setIndex(index - 1);
            this.showFrame(index - 1);
            
        }else{
            
            //index = MAX;
            this.setIndex(MAX)
            this.showFrame(MAX);
            
        }
        
        advertise.setAdPages(this.getIndex());
        navigation_previous();
    },
    //Einbelenden des SubMenü
    showSubMenu: function(id){
        
        var arr;
        
        switch(id){
        
            case this.ID_RADAR:
                this.indexSubMenu = 0;
                break;
            case this.ID_TRAFFIC:
                this.indexSubMenu = 1;
                break;
            case this.ID_PARKING:
                this.indexSubMenu = 2;
                break;
            case 'tanken':
                ui.showDialog("Achtung","Die Markttransparenzstelle für Kraftstoffe des Bundes-Kartellamtes wird in Kürze die Benzinpreise der 3 Sorten Super, E10 und Diesel in Echtzeit bereitstellen. Mainz & more wird an dieser Stelle die regionalen Benzinpreis aktuell anzeigen.");
                this.indexSubMenu =  - 1;
                break;
            case 'mvg':
                ui.showDialog("In Entwicklung","Öffentliche Verkehrsmittel folgt in nächster Zeit");
                this.indexSubMenu =  - 1;
                break;
            case this.ID_SEARCH_SHOP:
                this.indexSubMenu = 3;
                break;
            case this.ID_SEARCH_GASTRO:
                this.indexSubMenu = 4;
                break;
            case this.ID_MODE:
                this.indexSubMenu = 5;
                arr = new Array('Bekleidung &amp; Mode','Kinderbekleidung','Lederwaren','Mode &amp; Designer','Schmuckwaren und Uhren','Schuhhandel','Baby, Kind &amp; Spielen','Accessoires','Wäsche / Strümpfe','Hüte / Handschuhe','Sport &amp; Outdoor','Geschenke');
            
                break;
            case this.ID_LEBENSMITTEL:
                this.indexSubMenu = 5;
                arr = new Array('Feinkost','Lebensmittel / Märkte','Obst- und Gemüsehandel','Tabakwaren','Weine &amp; Spirituosen','Getränke-Vertrieb','Bäckereien','Metzgereien','Fleisch &amp; Fisch','Süsswaren','Kaffee / Tee','Bio-Natur','Sonstige Lebens- &amp; Genussmittel');
                
                break;
            case this.ID_KUNST:
                this.indexSubMenu = 5;
                arr = new Array('Ateliers','Filmproduktionen','Galerien','Kinos','Spielhallen und -kasinos','Theater / Bühnen','Sonst. Kunst &amp; Unterhaltung','Rundfunk- und Fernsehanstalten','Verlage / Musikverlage','Videoverleih','Buchhandel','Tanzen','Zeitungen &amp; Zeitschriften');
                
                break;
            case this.ID_SCHOENHEIT:
                this.indexSubMenu = 5;
                arr = new Array('Augenoptik & Brillen','Drogerien / Parfumerien','Kosmetik / Nagelstudio','Reformhäuser','Sport & Fitness','Apotheken','Fußpflege','Massagen','Sanitätshäuser','Sonst. Schönheit & Gesundheit','Hörgeräte Akustiker','Friseure');
                
                break;
            case this.ID_VERKEHR:
                this.indexSubMenu = 5;
                arr = new Array('Autohandel','Autozubehör','Autoreparatur-Werkstätten','Sonst. Verkehr und Reisen','Schifffahrt und Reedereien','Tankstellen','Transporte / Taxi','Fahrschulen','Reisebüros','Bike & Rad');
                
                
                break;
            case this.ID_HANDWERK:
                this.indexSubMenu = 5;
                arr = new Array('Schlüsseldienst','Schneidereien','Sonst. Handwerk &amp; Industrie','Dachdeckereien','Elektroinstallationen','Elektrotechnik / Fernsehen','Heizung-Lüftung-Sanitär','Maler und Lackierer','Schlossereien / Metallbau','Schreinereien','Schuhmachereien','Chem. Erzeugnisse und Präparate','Maschinenbau','Weingüter');
                
                break;
            case this.ID_COMPUTER:
                this.indexSubMenu = 5;
                arr = new Array('Computer','Datenverarbeitung EDV Beratung','Elektronik','Software','Telekommunikation','Fernsehgeräte','Fotohandlungen','Radio-Fernseh-Video','Sonstige Elektronik');
                
                break;
            case this.ID_MULTIMEDIA:
                this.indexSubMenu = 5;
                arr =  new Array('Fotoateliers','Journalisten','Designer','Mobile Computing','Internet-Services','Werbung','Sonst. Multimedia / Marketing');
               
                break;
            case this.ID_BAU:
                this.indexSubMenu = 5;
                arr = new Array('Architekten','Baubetreuung und Finanzierung','Baugeschäfte und -unternehmen','Baugesellschaften','Baustoffe / Baumärkte','Boden &amp; Fliesen','Gartenbaubetriebe','Hausverwaltung','Immobilien','Ingenieurbüros','Innenarchitekten','Glas- und Gebäudereinigung','Sonstige Bau / Wohnen','Raumausstattungen');
                break;
            case this.ID_EINRICHTUNG:
                this.indexSubMenu = 5;
                arr = new Array('Antiquitäten', 'Büroeinrichtungen &amp; Bedarf','Bilder &amp; Rahmen','Blumengeschäfte und -bindereien','Gardinen und Dekoration','Geschenkartikel','Küchen &amp; Kochen','Möbel','Raumausstattung','Teppiche und Teppichböden','Glas, Ton, Porzellan','Haushaltsgeräte','Sonstige Einrichtung');
                break;
            case this.ID_ARZT:
                this.indexSubMenu = 5;
                arr = new Array('Ärzte für Allgemeinmedizin','Ärzte für Augenheilkunde','Ärzte für Chirurgie','Ärzte für Frauenheilkunde und Geburtsh.','Ärzte für Hals-Nasen-Ohrenheilkunde','Ärzte für Haut- und Geschlechtskrankh.','Ärzte für Innere Medizin','Ärzte für Kinderheilkunde','Ärzte für Neurologie','Ärzte für Orthopädie','Ärzte für Psychiatrie','Ärzte sonstige Fachrichtung','Heilpraktiker','Krankenhäuser und Kliniken','Krankenkassen','Krankenpflege','Praktische Ärzte','Tierärzte','Zahnärzte','Ärzte für Urologie','Sonstige Ärzte');
                break;
            case this.ID_BILDUNG:
                this.indexSubMenu = 5;
                arr = new Array('Behörden / Verbände', 'Forschungsinstitute', 'Umweltschutz','Bildungseinrichtungen','Musikschulen und -unterricht','Schulen','Sprachschulen','Weiterbildung','Sonst. Bildung / Behörden');
                break;
            case this.ID_GELD:
                this.indexSubMenu = 5;
                arr = new Array('Beratungsbüros','Finanzwesen / Versicherungen','Rechtsanwälte &amp; Notare','Sachverständige','Steuerberater &amp; Buchhalter','Unternehmensberatung','Vermögensverwaltung','Wirtschaftsprüfer &amp; Wirtsch.Prüf.Ges.','Banken / Sparkassen','Bausparkassen','Finanzierungen','Versicherungen','Sonst. Geld &amp; Beratung');
                break;
            case this.ID_SHOP_SONSTIGES:
                this.indexSubMenu = 5;
                arr = new Array('Druckereien','Schreibbüros','Fotokopier-Betriebe','Kaufhäuser','Lotto-Toto','Zeitungen und Zeitschriften','Zoologische Handlungen','Chemische Reinigungen','Dienstleistungen','Entsorgung','Handelsgesellschaften','Handelsvertreter','Hausmeisterservice','Import und Export','Kurierdienst','Laboratorien','Mess- und Regeltechnik','Obstbau','Recycling','Schilder und Plakate','Sicherheitstechnik','Spielautomaten','Stempel und Schilder','Übersetzungen','Vermessungswesen und -büros','Verpackungen','Vertriebsgesellschaften','Verwaltungsgesellschaften','Wach- und Sicherheitsunternehmen','Wäschereien','Zahntechnische Laboratorien','Zeitarbeit','Bestattungsinstitute');
                break;
            case this.ID_RESTAURANT:
                this.indexSubMenu = 6;
                arr = new Array('Pizzerien','Italienisch','Asiatisch','Griechisch','Mexikanisch / Kubanisch','Türkisch / Arabisch','Indisch / Pakistanisch','Steakhäuser','Regionale Küche','Gourmet','Spanisch / Portugiesisch','Japanisch','Süd Amerika','Sonstige Restaurants');
                break;
            case this.ID_CAFE:
                this.indexSubMenu = 6;
                arr = new Array('Cafes und Konditoreien','Eiskonditoreien','Bistro/Café');
                break;
            case this.ID_BIER:
                this.indexSubMenu = 6;
                arr = new Array('Weinlokale','Straußwirtschaften','Biergärten / Terrassen','Kneipen');
                break;
            case this.ID_BAR:
                this.indexSubMenu = 6;
                arr = new Array('Discos','Bars','Clubs');
                break;
            case this.ID_KIOSK:
                this.indexSubMenu = 6;
                arr = new Array('Kioske','Schnellimbiss');
                break;
            case this.ID_GASTRO_TIPPS:
                this.indexSubMenu = 7;
                break;
            default:
                this.indexSubMenu =  - 1;
                break;
           
        }
        
        if(this.indexSubMenu > - 1){
            
            //SubMenü für Shops wird mit Daten gefüllt
            if(this.indexSubMenu == 5){
                ui.showLoadingScreen();
                var list = $('#listeSubShops');
                list.html(this.getListItem(arr,'shop',id));
                //$('#formShop').trigger('create');
                list.listview('refresh');
                
                //$('.sendButtonSubMenu').attr('onclick',"searchSector('#formShop','shop','"+ id +"')");
                
                ui.hideLoadingScreen();
                
            }
            
            //SubMenü für Gastro wird mit Daten gefüllt
            if(this.indexSubMenu == 6){
                ui.showLoadingScreen();
                var list = $('#listeSubGastro');
                list.html(this.getListItem(arr,'gastro',id));
                //$('#formGastro').trigger('create');
                list.listview('refresh');
                
                //$('.sendButtonSubMenu').attr('onclick',"searchSector('#formGastro','gastro','"+ id +"')");
                
                ui.hideLoadingScreen();
                
                
            }
            
            this.setNaviToCategorie();

            //hide frame von Pages
            this.hideLastFrame();
            
            //Werbung für die SubMenüs
            advertise.setAdSubPages(this.indexSubMenu);
            
            //anzeige Submenü
            $(this.subPages[this.indexSubMenu]).show();
        }
        
    },
    getListItem: function(arr, sector, id){
        
        var item = '';
        for(var index = 0; index < arr.length; index++){
            
          /* 
           item = item + '<li><a href="#" class="listLink" ><label class="listFirstLabel" data-corners="false" ><fieldset data-role="controlgroup" ><input type="checkbox" name="checkboxCat" value="'+ arr[index]+'" data-theme="c"/><label for="checkboxCat" class="listSecondLabel">'+ arr[index]+'</label></fieldset></label></a></li>';
           */
            
            item = item + "<li><a onclick=\"searchSector('" + sector + "','" + id + "','" + arr[index] + "')\">" + arr[index] + "</li>";
        }
        
        return item;
    },
    //das Aktuelle SubMenü wird ausgeblendet
    hideSubMenu: function(){
        
        $(this.subPages[this.indexSubMenu]).hide();
        
        this.indexSubMenu = -1;
        
        //Der Backbutton zeigt wieder auf die MainPage
        this.setNaviToMain();

    },
    //Zurücknavigation von SubMenu zur HauptCategorie
    goBackToCategorie: function(){
        
        //Ausblenden des SubMenüs
        this.hideSubMenu();
        
        //Anzeiged es letzten Frames der Hauptnavigation (Categorie)
        this.showFrame(this.index);
        
        //Werbung für die jeweilige Hauptseite setzen
        advertise.setAdPages(this.index);
        
    },
    //Zurücknavigation von Detail zum SubMenu
    goBackToSubMenu: function(id){
        
        navi.changeToPage('#naviPage');
        //index begint hier mit 1
        this.goToFrame(this.index+1);
        this.showSubMenu(id);
        
        
    },
    //Zurücknavigation von Detailseite auf NaviPage
    goBackToNaviPage: function(){
        
        this.showFrame(this.index);
        
        advertise.setAdPages(this.index);
        
    },
    //die Headernavigation(backbutton) wird auf die MainPage gesetzt
    setNaviToMain: function(){
        
        //Navigations Button zur MainPage (3 Streifen)
        $('#headerBack img').attr("src","bilder/kopf/Button_Menue.png");
        var headerBack = $('#headerBack');
        
        headerBack.attr("onclick","navi.changeToPage('#mainPage')");
    },
    //die Headernavigation(backbutton) wird auf die CatPage gesetzt
    setNaviToCategorie: function(){
        
        //Navigations Button zur CatPage (Pfeil)
        $('#headerBack img').attr("src","bilder/kopf/Button_Back.png");
        var headerBack = $('#headerBack');
        
        headerBack.removeAttr("data-rel");
        headerBack.attr("onclick","slider.goBackToCategorie()");
    },
    //erstellt den Slider auf der DetailPage
    initDetailSlider: function(){
        
        printOnConsole("Detyail","11111");
        
        var detailPic = $('#detailPic');
        
        var count = detailPic.children('img').length;
        
        if(count > 0){
            
            detailPic.theatre({
                              selector: 'img',
                              effect: 'fade',
                              paging: '.pagingDetail',
                              autoplay: 'false'
            });
            
            $('.pagingDetail').show();
            
            printOnConsole("Detyail","22222");
            
            this.stopDetailSlider();
            
            printOnConsole("Detyail","33333");
        
        }else{
            //alert("keine Bilder");
            //Wenn keine Bilder vorhanden sind wird der Punkt nicht angezeigt
            $('.pagingDetail').hide();
        }
        
    },
    swipeDetailSlider: function(){
        
        $('#detailPic').swipe({
                              
                              swipe:function(event, direction, distance, duration, fingerCount) {
                              
                                if(direction == 'left')
                                {
                                    $('#detailPic').theatre('next');
                                }
                                else if(direction == 'right')
                                {
                                    $('#detailPic').theatre('prev');
                                }
                                else if(direction == 'down')
                                {
                              
                                    $.mobile.silentScroll(200);
                                }
                                else if(direction == 'top')
                                {
                                    $.mobile.silentScroll(0);
                                }
                              
                              
                              }
        });
    },
    stopDetailSlider: function(){
        
        $('#detailPic').theatre('stop');
    }
}

function testIdex(){
    alert(slider.getIndex());
}

//Pfeile anzeigen
function move_callback(anchor, instance){
    $('#leftArrow').fadeIn();
    $('#rightArrow').fadeIn();
}
//Pfeile ausblenden
function pre_move_callback(anchor, instance){
    $('#leftArrow').fadeOut();
    $('#rightArrow').fadeOut();
}


/************************ CATEGORIEN **************/
$('#naviPage').live('pageinit', function() {
    slider.initNaviSlider();
});


$('#naviPage').live('pagebeforeshow', function() {
    
    if(navi.comesFromMain()){
        
        navi.setComesFromMain(false);
        
        slider.goToFrame(navi.getIndex());
                    
        slider.swipeNaviSlider();
        //setzt die Werbung auf der NaviPage wenn der User von der Main Seite kommt
        advertise.setAdPages((navi.getIndex()-1));
    }else{
        slider.goBackToNaviPage();
    }
    
                    
});

$('#naviPage').live('pagehide',function(){
                    
        slider.hideLastFrame();
});

/******************** DETAIL ************************/
$('#detailPage').live("pagebeforeshow", function() {
        
        //printOnConsole("Detyail","*****************");
        slider.initDetailSlider();
        //printOnConsole("Detyail","*****************2");
        slider.swipeDetailSlider();
        //printOnConsole("Detyail","*****************3");
                      
});


$('#detailPage').live("pagehide", function() {
                      
        slider.stopDetailSlider();
});




	
	  
$('#demo').theatre('stop');
    	
    $('#demo').swipe({
             
    	swipe:function(event, direction, distance, duration, fingerCount) {
              		
    		if(direction == 'left')
          	{
    			$('#demo').theatre('next');
          	}
            else if(direction == 'right')
            {
            	$('#demo').theatre('prev'); 
            }
           	else if(direction == 'down')
            {
           		
           		$.mobile.silentScroll(200);
           	}
            else if(direction == 'top')
            {
                $.mobile.silentScroll(0);
            }

                   
        }
    });
                      	 

//Detailseite

$('#detailPage').live("pagehide", function() {
    	
    $('#detailPic').theatre('stop');
});



