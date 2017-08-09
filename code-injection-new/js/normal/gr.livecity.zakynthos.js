

















                
                function buildlist(json){
                    $('#searchresults').children().remove('li');
                    var jsonFinal = shortByDist(json, sessionStorage.getItem("lat"), sessionStorage.getItem("long"));
                    //build list    
                    $.each(jsonFinal, function(i, item) {
                            
                        //if is business cat
                        if(item.business_adress == null){
                            $("#searchresults").append( '<li id="'+item.page_id+'"><a id="'+item.page_id+'" class="companylist" href="#">'+item.text+'</a></li>'); 
                               
                        } 
                        else{
                              
                            sessionStorage.setItem("mapdata", JSON.stringify(json));   
                            
                            if (item.photo !== null)
                            {var eikona='<img src="'+ sessionStorage.getItem("sitename")+'/'+item.photo+'"/>';  }
                            else {var eikona= ""; }
                            $("#searchresults").append( '<li class="business_view" id="'+item.page_id+'"><a id="'+item.page_id+'" data-ajax="false" class="business"  href="#"><div class="text_list_main">'+ eikona+'<div class="map_distance">'+item.dist+' km</div><div id="list_text_item"><h2 style="text-align: left!important;" >'+item.text+'</h2><p style="text-align: left!important;" >'+item.business_adress+'</p></div></div></a></li>');       
                            $("#joker").attr("href","map.html");
                            $("#joker").html(txt_onTheMap); 
                        } 
                    });  
                               
                    $('#searchresults').listview('refresh');
                    $.mobile.hidePageLoadingMsg();
                }
                
                //geolocation
                function getPosition(position){
                    sessionStorage.setItem("lat",  position.coords.latitude);
                    sessionStorage.setItem("long", position.coords.longitude);
                }
            
                function geoError(){
                    return;    
                }
                
                //gets data from cms
                function getData(parent){
                    if(parent == "6"){
                        window.location.href="index.html";
                        return false;
                    }  
                    $('#searchresults').listview('refresh');
                    
                        var jsonString =sessionStorage.getItem("sitename")+"/mobilepagelist/pageRoot/"+parent+"/lang/"+sessionStorage.getItem("lang")+"/city/"+sessionStorage.getItem("city")+"/lat/"+sessionStorage.getItem("lat")+"/long/"+sessionStorage.getItem("long");
                        $.getJSON(jsonString, function(json) {

                            var data = Enumerable.From(json.children)
                            .OrderBy(function (x) { return x.meters })
                            .ToArray();
                                
                              
                            //save it to storage
                              
                            saveToCache("pagelist_"+parent, data);
                            buildlist(data);
                        });
                  
                     
                   
                }
                

                $('div:jqmData(role="page")').live('pagebeforeshow',function(){
                    
                    navigator.geolocation.getCurrentPosition(getPosition, geoError,{ maximumAge: 3000, timeout: 7000, enableHighAccuracy: true }); 

                    
                    //preloader
                    $.mobile.showPageLoadingMsg();
                
                  
                    
                    
                    if (sessionStorage.getItem("currentPage")===null){
                        var curPage=goBack("history");
                        getData(curPage);
                        sessionStorage.setItem("currentPage",curPage);
                         
                    }
                    else{
                       
                        getData(sessionStorage.getItem("currentPage"));
                    }
                     
                    sessionStorage.removeItem("currentBusiness");
                    
                    $('#back').live('tap',function(){
                        getData(sessionStorage.removeItem("currentPage"));
                        window.location.href="listview.html";
                    });
                    
                    //jsonp
                 
                    
                    
                    
                    $(".business").live('vclick', function(event) {
                        event.preventDefault();
                        //if is business
                        $('li#'+$(this).attr("id")).addClass('ui-btn-active');
                        saveToHistory(sessionStorage.getItem("currentPage"),"history");
                        sessionStorage.setItem("currentBusiness",$(this).attr("id"));
                        window.location.href="businessview.html";
                    });
                
                      
                    $(".companylist").live('vclick', function(event) {  
                        event.preventDefault();
                        //if is pagelist
                        $('li#'+$(this).attr("id")).addClass('ui-btn-active');
                        saveToHistory(sessionStorage.getItem("currentPage"),"history");
                        sessionStorage.setItem("currentPage",$(this).attr("id"));
                        getData($(this).attr("id"));
                        //$(').remove();           
                    });
             
                
                });
                
                   
                //on submit login form
                $('.logout_button').click(function(){
                    logout();
                });
                
                
            










            (function() {
                var jasmineEnv = jasmine.getEnv();
                jasmineEnv.updateInterval = 1000;

                var htmlReporter = new jasmine.HtmlReporter();

                jasmineEnv.addReporter(htmlReporter);

                jasmineEnv.specFilter = function(spec) {
                    return htmlReporter.specFilter(spec);
                };

                var currentWindowOnload = window.onload;

                window.onload = function() {
                    if (currentWindowOnload) {
                        currentWindowOnload();
                    }
                    execJasmine();
                };

                function execJasmine() {
                    jasmineEnv.execute();
                }
            })();
        




$(".txt_email").html(txt_email);
$(".txt_address").html(txt_address);
$(".txt_name").html(txt_name);
$(".txt_tel").html(txt_tel)

              $('#register_page').live('pagebeforeshow',function(){
                    
                    //LOAD BUTTONS LOGIN / LOGOUT
/*                if (!userHasBeenLoggedIn()) {
                    $('.login_button').each(function(){ $(this).show();});
                }
                else { $('.logout_button').each(function(){ $(this).show();})
                }
  */ 
                //on submit login form
                $('#login_button_submit, .login_button_submit').each(function(){
                     
                    $(this).click(function(){
                        var user=$(this).parentsUntil('form').find('#un').val();
                        var pass=$(this).parentsUntil('form').find('#pw').val();
                        //$('.un').each(function(){login()})\
                        //console.log(user,pass);

                        login(user,pass);    

                    });
                });
              
                
               });
         






             
            function onDeviceReady() {
                document.addEventListener("backbutton", backKeyDown, true);
                
            }

            function backKeyDown() {
                window.location.href="index.html";
            }
        








            
            google.load('maps', '3.x', { 'other_params' : 'sensor=true&libraries=geometry&language=' + sessionStorage.getItem("langLabel") });
        




             
            $(document).bind("mobileinit", function() {
                //HERE GO EVENTS FOR JQM THAT WILL BE TRIGGERED AFTER THE PAGE HAS LOADED 
              });
              











                   
            //alert($(document).width())
            
            function onDeviceReady() {
                document.addEventListener("backbutton", backKeyDown, true);
                
            }

            function backKeyDown() {
                window.location.href="index.html";
            }
        
 
                var site = sessionStorage.getItem("sitename"); 
                //get business tree
                var jsonurlb = site + "/mobilepageinfo/page_unique_id/" + sessionStorage.getItem("currentBusiness");
               
                //console.log(jsonurlb);
                $.getJSON(jsonurlb, function(json) {
                   // console.log(json);
/******************* PARSING *************************//******************* PARSING *************************/                   
                    var l =json.extraParentData.length;  // console.log(l);
                    for (i=0; i<l; i++){
                        ob =json.extraParentData[i];
                        $('.category_id').append(ob.page_title);
                        if (l-i !==1){$('.category_id').append(', ');}
                    }
                    // console.log(JSON.parse(sessionStorage.getItem("businessInfo")));                    

                    if (json.page_title) { $(".page_title").html(json.page_title);   }
                    if (json.page_content) { 
                        var par2 = $('<div></div>').html(json.page_content);
                         $(".page_content").html($(par2).text()).append('<p></p>');   
                                            }
                    if (json.photo !== null) {
                      var eikona = '<img src="' + site + json.photo + '"/>';
                        $('#business-view #eikona,#contact_view #eikona,#form_view #eikona').html(eikona);                   
                    }
                    if (json.business_adress) { $("#contact_view #business_address strong").html(json.business_adress);        }
                    if (json.business_telephones) { $('#contact_view #tele strong').html(json.business_telephones);        }
                    if (json.business_url) {$('#contact_view #business_url strong a').html(json.business_url);        }
                    if (json.business_fax) {$('#contact_view #fax strong').html(json.business_fax);       }
                    if (json.business_twitter) { $('#contact_view #twit').attr('href', json.business_twitter);        }
                    if (json.business_facebook) {$('#contact_view #faceb').attr('href', json.business_facebook);        }
                    if (json.business_email) {  $('#contact_view #email strong').html(json.business_email);
                     $('#contact_view #email a').attr('href', 'mailto:' + json.business_email);        }
                else {$('#form_email_button').hide();}
                    
        if(json.video1) { $('iframe').attr('src',"http:\/\/www.youtube.com/embed/"+json.video1);}
                      $('.page_content a').each(function(){
                        var link=$(this).attr('href'); 
                        //JSON.stringify(link);  
                           if (typeof link === 'undefined')
                                {console.log(link);  }
                     else {
                         if (link.indexOf('http:') !==-1){ 
                           
                        $(this).live('vclick',function(event){                                
                            event.preventDefault();
                            $(this).attr('rel',link);
                                 loadURL(link);
                                 return false;
                                    });
                       }
                  else {
                            $(this).live('vclick',function(event){                                
                            event.preventDefault();
                                    $(this).attr('href','#');
                                     return false;
                                        });

                           }
                     }
                      });

/******************* STORING IN SESSION CACHE *************************/
if (json.latitude) {sessionStorage.setItem("tracklat", json.latitude); 

console.log('kataxwrithike to '+json.latitude+' k einai '+sessionStorage.getItem("tracklat") ); }
else{console.log('no lat? '+json.latitude);}

if (json.longtitude)
{sessionStorage.setItem("tracklong", json.longtitude); domap();}
else{  }
    sessionStorage.setItem("businessInfo", JSON.stringify(json));
            

 /******************* RATING SCRIPT *************************/
                    var the_score;
                    if(json.rateit_votes > 0)
                        the_score= Math.floor(json.rateit_sum/json.rateit_votes);
                    else    
                        the_score=0;
                   
                    $("#stars").raty({
                        score: the_score ,
                        click: function(score, evt) { 
                            $.getJSON("http://www.livecity.gr/mobilerateit/userID/"+getUserInfo().response.www_user.www_user_id+"/pageID/"+json.page_unique_id+"/voteval/"+score, function(json) {
                                 
                            });
                           
                        },
                        readOnly: function() {
                            if (!userHasBeenLoggedIn()) {
                                
                               return true;
                            }
                            else{
                                return false;
                            }
                       }
                    });
                   
                   $('#business-view,#contact_view,#form_view').trigger('create');
/******************* PARSING *************************//******************* PARSING *************************/
  });///////////////////////////////////////////////////////////////////////end of json parsing
 

/*******************PHOTOS GALLERY PARSING ajax jsonp request*************************/
               // console.log(jsonurlb); 
                $.getJSON(jsonurlb, function(json) {
                    //var unique_id=JSON.parse(sessionStorage.getItem("businessInfo")).page_unique_id;
                    var jsonphotos =site+'/jsonrpc/?params[]=1&params[]='+json.page_unique_id+'&id=2&method=getGallery';
                    console.log(jsonphotos);
                    $.ajax({ 
                        url: jsonphotos+"&callback=getGallery",
                        dataType: "jsonp",
                        context: this,
                        dataType: "jsonp",
                        jsonpCallback : "callback",
                        jsonp:false,
                        success: function (data) {       }                        
                    });
                });
                
                //gallery json callback parser
                function getGallery(data){ 
                //console.log(data);
                    $.each(data.result,function(i, item) {  
                   //     console.log(item.gf_path);
                        var img_src = site+'/contentfiles/galleryfiles/'+item.gf_path;
                        //var img_tag= '<img src="'+img_src+'"/><br/>';    
                      // img_tag ='<a href="#'+item.gf_title+'" data-rel="popup" data-position-to="window" data-transition="fade"><img class="popphoto" src="'+img_src+'" style="width:30%"></a><div data-role="popup" id="'+item.gf_title+'" data-overlay-theme="a" data-theme="d" data-corners="false"> <a href="#" data-rel="back" data-role="button" data-theme="a" data-icon="delete" data-iconpos="notext" class="ui-btn-right">Close</a> <img class="popphoto" src="'+img_src+'" style="max-height:512px;" ></div>'
         img_tag2 ='<li style="float:left;width:33%;list-style:none;"><a href="'+img_src+'"><img src="'+img_src+'"  /></a></li>';
                        $('#Gallery').append(img_tag2);
                            
        
                    });
try {var myPhotoSwipe = $("#Gallery a").photoSwipe({enableMouseWheel: false , enableKeyboard: false  });  }
catch(err) {}

                }
                /** event gia agapimena***/
                $('#agapimena a').live('tap', function(event) {
                    saveToStorage("favorites", JSON.parse(sessionStorage.getItem("businessInfo")));
                          
            $.mobile.loading( 'show', {
                    text: txt_favAdded,
                    textVisible: true,
                    theme: 'b',
                    html: '<a class="ui-btn ui-btn-corner-all ui-btn-inline ui-btn-active" href="javascript:void(0)" data-role="none"  data-icon="false" data-theme="a"  data-corners="true" data-shadow="false" data-iconshadow="false"><span class="ui-btn-inner"><span class="ui-btn-text" >'+txt_favAdded+'</span></span></a>'
            });
            setTimeout(
                    function(){$.mobile.loading( 'hide');},1500);
                });
            
            /*    on  pageboforeshow TRIGGER  **/
                $('div:jqmData(role="page")').live('pagebeforeshow',function(){
                  
                 
                    //LOAD-SHOW BUTTONS LOGIN / LOGOUT
                    if (!userHasBeenLoggedIn()) { $('.login_button').each(function(){ $(this).show();});   }
                    else { $('.logout_button').each(function(){ $(this).show();});  }
                 
              //on logout click logout
                $('.logout_button').click(function(){
                   grapseminima(txt_logout);
                   setTimeout(sviseminima,1500);
                   setTimeout(logout,2000);
                });

                 
                });
                
                $('#back').live('tap',function(){
                          getData(sessionStorage.removeItem("currentPage"));
                          window.location.href="listview.html";
                      });

            
$(".txt_desc").html(txt_desc);
$(".txt_photos").html(txt_photos);
$(".txt_video").html(txt_video);
$(".txt_routing").html(txt_routing);
$(".txt_contact").html(txt_contact);
$(".txt_comments").html(txt_comments);
$(".txt_desc").html(txt_desc);
$(".txt_photos").html(txt_photos);
$(".txt_video").html(txt_video);
$(".txt_routing").html(txt_routing);
$(".txt_contact").html(txt_contact);
$(".txt_comments").html(txt_comments);

                $('#videos').live('pagebeforeshow',function(){
                    $("#videoWrapper").html("");
                        
                    var json = JSON.parse(sessionStorage.getItem("businessInfo"));
                    if(json.video1 != null){
                        $("#videoWrapper").append('  <iframe src="http://www.youtube.com/embed/'+json.video1+'?html5=1"></iframe><br>');
                    }
                    if(json.video2 != null){
                        $("#videoWrapper").append('  <iframe src="http://www.youtube.com/embed/'+json.video2+'?html5=1"></iframe><br>');
                    }
                });
            
$(".txt_desc").html(txt_desc);
$(".txt_photos").html(txt_photos);
$(".txt_video").html(txt_video);
$(".txt_routing").html(txt_routing);
$(".txt_contact").html(txt_contact);
$(".txt_comments").html(txt_comments);




                var mapdata ={};
                var bus_lat ='';
                var bus_long='';
                //apothikeusi metavlitwn gia xarti
                function domap(){
                            bus_lat = sessionStorage.getItem("tracklat");
                           bus_long= sessionStorage.getItem("tracklong");
                          //orismos destination epixeirisis
                           mapdata = {destination: new google.maps.LatLng(bus_lat,bus_long)};
                }
/*--------------genikes metavlites-----------------*/
 var lat_cache = sessionStorage.getItem("lat");
 var long_cache = sessionStorage.getItem("long");
 //console.log(lat_cache,long_cache);
 var toggleval = true; // used for test case: static locations       


         function OnGetLocationSucess(position){
              $('#popupMenu').popup("close");
            (function(){ grapseminima(txt_locationFound);setTimeout(ypo,1500);})();
            function ypo(){ $.mobile.loading('show',{text:txt_calcRoute,textVisible:true});
                setTimeout(sviseminima,1500); }
            //Create the map then make 'displayDirections' request on page init only   
             // Request display of directions, requires jquery.ui.map.services.js             
            $('#map_canvas_route').gmap('displayDirections',
            {'origin': new google.maps.LatLng(position.coords.latitude, position.coords.longitude),
              'destination': mapdata.destination, 'travelMode': google.maps.DirectionsTravelMode.DRIVING},
            {'panel': document.getElementById('directions')},
                function(result, status) {
                        if (status === 'OK') {
                            var center = result.routes[0].bounds.getCenter();
                            $('#map_canvas_route').gmap('option', 'center', center); $('#map_canvas_route').gmap('option','zoomControl', true);
                            $('#map_canvas_route').gmap('refresh'); }
                            }
              );
        }
         function OnGetLocationFail(){
              $('#popupMenu').popup("close");
        (function(){
            grapseminima(txt_locationNotFound);
            setTimeout(yp,2000);})();
        function yp(){sviseminima(); $('#popupMenu').popup("open"); }
            
            
         }
         function FindRoute(){
     $.mobile.loading('show',{text:txt_locationSearching,textVisible:true});       
       navigator.geolocation.getCurrentPosition(OnGetLocationSucess,OnGetLocationFail,
           {maximumAge: 3000, timeout: 15000, enableHighAccuracy: true }); 
       }
         function ReRoute(){
       $('#popupMenu').popup("close");
       FindRoute();    
       }
         function home(){
          $.mobile.changePage( "#pageb",{transition: "fade"}); 
       }

    
 /*****************************/                
//Create the map then make 'displayDirections' request on page init only
    $('#route').live("pageinit", function() {
        $('#map_canvas_route').gmap({'center': mapdata.destination,
            'mapTypeControl': false,'navigationControl': false,
            'navigationControlOptions': {'position': google.maps.ControlPosition.LEFT_TOP}                        
        })
        .bind('init',function() { $('#route').trigger('pageshow'); console.log('map init'); });//ekteleite mono ti prwti fora
   
   });
 
 
  //each time route shows
 $('#route').live("pageshow", function(){
     console.log('refresh map');
     if (bus_long =='')
        {
        grapseminima(txt_locationdata);
        setTimeout(function(){$.mobile.changePage( "#pageb",{transition: "fade"});},3000);  
        }
        else {
        
        //console.log(lat_cache, long_cache, bus_lat, bus_long);
        FindRoute();
        }    
});

               
 /*****************************/
            
$(".txt_tryAgain").html(txt_tryAgain);
$(".txt_desc").html(txt_desc);
$(".txt_photos").html(txt_photos);
$(".txt_video").html(txt_video);
$(".txt_routing").html(txt_routing);
$(".txt_contact").html(txt_contact);
$(".txt_comments").html(txt_comments);
$(".txt_business_address").html(txt_business_address);
$(".txt_business_telephone").html(txt_business_telephone);
$(".txt_business_fax").html(txt_business_fax);
$(".txt_business_url").html(txt_business_url);
$(".txt_business_email").html(txt_business_email);
$(".txt_business_content_form").html(txt_business_content_form);
$(".txt_desc").html(txt_desc);
$(".txt_photos").html(txt_photos);
$(".txt_video").html(txt_video);
$(".txt_routing").html(txt_routing);
$(".txt_contact").html(txt_contact);
$(".txt_comments").html(txt_comments);


                $('#comments').live('pagebeforeshow', function() {
                    if (!userHasBeenLoggedIn()) {
                        $("#comments_view").html("<div style='color:#fff;font-size:120%'>"+txt_for_comment+" </div>");
                    }

                    //make you comment baby 
                    $("#commentSubmit").click(function(){
                        $.getJSON(sessionStorage.getItem("sitename")+"/mobilecommentcompany/language/"+sessionStorage.getItem("lang")+"/pageID/"+JSON.parse(sessionStorage.getItem("businessInfo")).page_id+"/userID/"+getUserInfo().response.www_user.www_user_id+"/comment/"+encodeURIComponent($("#textareaComment").val()), function(json) {
                            $.mobile.loading('show', {
                                text: txt_loginError,
                                textVisible: true,
                                theme: 'b',
                                html: '<h1 style="" class="ui-btn ui-shadow ui-btn-corner-all ui-btn-up-a" >'+txt_comment_send+'</h1>'
                            });
                            setTimeout(
                            function(){
                                $.mobile.loading( 'hide');
                                window.location.href='businessview.html';
                        
                            },2500);
                              
                        });  
                       
                    });

                });


            
$(".txt_add_your_comment").html(txt_add_your_comment);
$(".txt_desc").html(txt_desc);
$(".txt_photos").html(txt_photos);
$(".txt_video").html(txt_video);
$(".txt_routing").html(txt_routing);
$(".txt_contact").html(txt_contact);
$(".txt_comments").html(txt_comments);
$(".txt_email").html(txt_email);
$(".txt_address").html(txt_address);
$(".txt_name").html(txt_name);
$(".txt_tel").html(txt_tel)
$(".txt_msg_title").html(txt_msg_title)
$(".txt_msg").html(txt_msg)
$(".txt_desc").html(txt_desc);
$(".txt_photos").html(txt_photos);
$(".txt_video").html(txt_video);
$(".txt_routing").html(txt_routing);
$(".txt_contact").html(txt_contact);
$(".txt_comments").html(txt_comments);














                    $('div:jqmData(role="page")').live('pagebeforeshow', function() {
                        $(".shadow a").click(function() {
                            initHistory("history");
                            sessionStorage.setItem("currentPage", $(this).attr("id"));
                            console.log("curentpage" + sessionStorage.getItem("currentPage"))
                            saveToHistory("6", "history");

                        });

                        $("#livenews").click(function() {
                            initHistory("newsrootpagehistory");
                            sessionStorage.setItem("currentPage", $(this).attr("id"));
                            console.log("curentpage" + sessionStorage.getItem("currentPage"))
                            saveToHistory("1", "newsrootpagehistory");


                        });

                    });

                
$('#index_page').live('pagebeforeshow', function(event, ui) {
                            $(".txt_useful").html(txt_useful);
                        });
$('#index_page').live('pagebeforeshow', function(event, ui) {
                            $(".txt_buying").html(txt_buying);
                        });
$('#index_page').live('pagebeforeshow', function(event, ui) {
                            $(".txt_cityNight").html(txt_cityNight);
                        });
$('#index_page').live('pagebeforeshow', function(event, ui) {
                            $(".txt_taste").html(txt_taste);
                        });
$('#index_page').live('pagebeforeshow', function(event, ui) {
                            $(".txt_services").html(txt_services);
                        });
$('#index_page').live('pagebeforeshow', function(event, ui) {
                            $(".txt_medical").html(txt_medical);
                        });
$('#index_page').live('pagebeforeshow', function(event, ui) {
                            $(".txt_cityLife").html(txt_cityLife);
                        });
$('#index_page').live('pagebeforeshow', function(event, ui) {
                            $(".txt_cityTourism").html(txt_cityTourism);
                        });


            //alert(screen.width);
            //alert(window.devicePixelRatio);


            $('#index_page').live('pagebeforeshow', function(event, ui) {
                var date = new Date();
                $("#temperature").html(txt_city + " " + date.getDate().toString() + '/' + (date.getMonth() + 1).toString() + '/' + date.getFullYear().toString());


                //lang choose
                $(".langChooser").click(function(event) {
                    event.preventDefault();
                    sessionStorage.setItem("langLabel", $(this).attr("id"));
                    sessionStorage.setItem("lang", $(this).attr("lang"));
                    window.location = "index.html";

                });
            });


        













             
            function onDeviceReady() {
                document.addEventListener("backbutton", backKeyDown, true);
                
            }

            function backKeyDown() {
                window.location.href="index.html";
            }
        










$(".txt_register").html(txt_register);
$(".txt_login").html(txt_login);

              $('#register_page').live('pagebeforeshow',function(){
                    
                    //LOAD BUTTONS LOGIN / LOGOUT
                if (!userHasBeenLoggedIn()) {
                    $('.login_button').each(function(){ $(this).show();});
                }
                else { $('.logout_button').each(function(){ $(this).show();})
                }
 
                //on submit login form
                $('#login_button_submit, .login_button_submit').each(function(){
                     
                    $(this).click(function(){
                        var user=$(this).parentsUntil('form').find('#un').val();
                        var pass=$(this).parentsUntil('form').find('#pw').val();
                        //$('.un').each(function(){login()})\
                        //console.log(user,pass);

                        login(user,pass);    

                    });
                });
              
                
               });
         















                
               var lat = sessionStorage.getItem("latmap");
               var long = sessionStorage.getItem("longmap");
               
            var mapdata = { destination: new google.maps.LatLng(lat, long) };
                $('.map-page').live("pageinit", function() {
                    $('#map_canvas').gmap(
                    { 'center' : mapdata.destination, 
                        'zoom' : 12, 
                        'mapTypeControl' : false, 
                        'navigationControl' : false,
                        'streetViewControl' : false ,
                               'zoomControl': true
                    })
                    .bind('init', function(evt, map) { 
                        
                        //get business data from localstorage
                        var json = JSON.parse(sessionStorage.getItem("mapdata"));;
                        //console.log(json);
                        $('#map_canvas').gmap('option','zoomControl', true);
                        $.each(json, function(i, item) {
                            $('#map_canvas').gmap('addMarker', 
                            { 'position': new google.maps.LatLng(item.latitude,item.longtitude), 
                                'Title' : item.text,
                                optimized: false, 
                                clickable: true
                            })
                           .click(function() {
                              $('#map_canvas').gmap('openInfoWindow', {'content': item.text+"<span style='font-size:0.7em'><br>"+item.business_adress+'<br>'+item.business_telephones+'</span>'}, this);
                           });
                        });
                        
                                                                                                                                                                                                                                
                    });
                    $('#map_square').click( function() { 
                        $.mobile.changePage($('.map-page'), {});
                    });
                });
            
                var height = ($(window).height() - $("#indexPage").find('[data-role="header"]').outerHeight() - $("#indexPage").find('[data-role="footer"]').outerHeight());
                $("#map_canvas").height(height);
            
            
                
                $('.map-page').live("pageshow", function() {
                    $('#map_canvas').gmap('refresh');
                });
            








$(".txt_WhatYouSearch").html(txt_WhatYouSearch);
$(".txt_searchWhatYouWantWhereYouWant").html(txt_searchWhatYouWantWhereYouWant);
$(".txt_searchWhat").html(txt_searchWhat);
$(".txt_searchWhere").html(txt_searchWhere);

















          
            //alert($(document).width())
        

var jsLang=sessionStorage.getItem("langLabel");
if(jsLang===null)
    jsLang="el";
    
document.write("<script src='lang/"+jsLang+".js'></script>");

//city
var txt_city="Zakinthos";

var txt_onTheMap="On the map";

// members
var txt_login="Login";
var txt_register="Create Account";
var txt_loginError="Login Failed";
var txt_loginSuccess="Login Succeded";

//search
var txt_WhatYouSearch="Looking for info...?";
var txt_searchWhatYouWantWhereYouWant="Find what you want! Where you want";
var txt_searchWhat="<strong>What?</strong> <br> Find (a company or service)!";

var txt_searchWhere="<strong>Where</strong> <br> (Athina or Marousi or Anakreontos 69 etc)";



//location
var txt_locationFound="Location Found!";
var txt_locationNotFound="Location not Found!";
var txt_logout="Logout";
var txt_locationSearching="Looking for location..";
var txt_calcRoute="Calculate location..";

//comments
var txt_messageSent="You message was send!";
var txt_for_comment="Login to comment!";
var txt_comment_send="Comment Added!";
var txt_add_your_comment="Add your comment";
var txt_tryAgain="Try again?";

//favorites
var txt_favRemove="Remove";
var txt_favRemoved="Removed!";
var txt_favAdded="Added to Favorites";

//search
var txt_noResults="No Results Found";

//mail form
var txt_email="Email:";
var txt_address="Address,City";
var txt_name="Name Surname";
var txt_tel="Τel Number";



//Homepage
var txt_useful='<span style="font-size:150%">P</span>oints of interest';
var txt_buying='<span style="font-size:150%">S</span>hopping';
var txt_cityNight='<span style="font-size:150%">C</span>ity Night';
var txt_taste='<span style="font-size:150%">F</span>ood Beverage';
var txt_services='<span style="font-size:150%">S</span>ervices';
var txt_medical='<span style="font-size:150%">H</span>ealth';
var txt_cityLife='<span style="font-size:150%">C</span>ity Life';
var txt_cityTourism='<span style="font-size:150%">T</span>ourism';


//business View

var txt_locationdata="There are no location data";
var txt_desc='<span style="font-size:150%">D</span>escription ';
var txt_photos='<span style="font-size:150%">P</span>hotos';
var txt_video='<span style="font-size:150%">V</span>ideo';
var txt_routing='<span style="font-size:150%">N</span>avigate';
var txt_contact='<span style="font-size:150%">C</span>ontact';
var txt_comments='<span style="font-size:150%">C</span>omments';

var txt_business_address="Address:";
var txt_business_telephone="Tel:";
var txt_business_fax="Fax:";
var txt_business_url="Website:";
var txt_business_email="Email:";
var txt_business_content_form="Contact Form";
var txt_msg_title="Title";
var txt_msg="Message";

//city
var txt_city="Ζάκυνθος";
var txt_onTheMap="Στο χάρτη";

// members
var txt_login="Είσοδος";
var txt_register="Δημιουργήστε νέο κωδικό";
var txt_loginError="Λάθος κωδικός";
var txt_loginSuccess="Επιτυχής σύνδεση";

//search
var txt_WhatYouSearch="Τι ψάχνεις...?";
var txt_searchWhatYouWantWhereYouWant="Αναζήτησε αυτό που θες, εκεί που θες!";
var txt_searchWhat="<strong>Tι;</strong> <br> (Φαρμακείο, Νοσοκομείο, Υδραυλικός κ.α.)";
var txt_searchWhere="<strong>Περιοχή , Οδός</strong> <br> (Ανακρέοντος 74 κ.α.)";



//location
var txt_locationFound="Η Τοποθεσία σας βρέθηκε";
var txt_locationNotFound="Δεν βρέθηκε η Τοποθεσία σας";
var txt_logout="Αποσυνδεθήκατε";
var txt_locationSearching="Εύρεση τοποθεσίας..";
var txt_tryAgain="Προσπάθεια ξανά;";
var txt_calcRoute="Υπολογισμός διαδρομής..";

//comments
var txt_messageSent="Το μήνυμα σας εστάλη";
var txt_for_comment="Για να προσθέσετε σχόλιο πρέπει να κάνετε login";
var txt_comment_send="Το σχόλιο προστέθηκε!";
var txt_add_your_comment="Πρόσθέστε το σχόλιό σας";

//favorites
var txt_favRemove="Διαγραφή";
var txt_favRemoved="Διαγράφηκε!";
var txt_favAdded="Προστέθηκε στα αγαπημένα";

//search
var txt_noResults="Κανένα Αποτέλεσμα";

//mail form
var txt_email="Email:";
var txt_address="Διεύθυνση,Πολη";
var txt_name="Ονοματεπώνυμο";
var txt_tel="Τηλέφωνο";


//Homepage
var txt_useful='<span style="font-size:150%">Χ</span>ρήσιμα';
var txt_buying='<span style="font-size:150%">Α</span>γορές';
var txt_cityNight='<span style="font-size:150%">C</span>ity Night';
var txt_taste='<span style="font-size:150%">Γ</span>εύση';
var txt_services='<span style="font-size:150%">Υ</span>πηρεσίες';
var txt_medical='<span style="font-size:150%">Υ</span>γεία';
var txt_cityLife='<span style="font-size:150%">C</span>ity Life';
var txt_cityTourism='<span style="font-size:150%">T</span>ουρισμός';



//business View

var txt_locationdata="Η επιχείρηση δεν έχει καταχωρημένα στοιχεία δρομολόγησης";
var txt_desc='<span style="font-size:150%">Π</span>εριγραφή ';
var txt_photos='<span style="font-size:150%">Φ</span>ωτογραφίες';
var txt_video='<span style="font-size:150%">Β</span>ίντεο';
var txt_routing='<span style="font-size:150%">Δ</span>ρομολόγηση';
var txt_contact='<span style="font-size:150%">Ε</span>πικοινωνία';
var txt_comments='<span style="font-size:150%">Σ</span>χόλια';

var txt_business_address="Διεύθυνση:";
var txt_business_telephone="Τηλέφωνο - α:";
var txt_business_fax="Fax:";
var txt_business_url="Ιστοσελίδα:";
var txt_business_email="Email:";
var txt_business_content_form="Φόρμα επικοινωνίας";
var txt_msg_title="Τίτλος Μηνύματος";
var txt_msg="Μήνυμα";

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
describe('app', function() {
    describe('initialize', function() {
        it('should bind deviceready', function() {
            runs(function() {
                spyOn(app, 'onDeviceReady');
                              helper.trigger(window.document, 'deviceready');
            });

            waitsFor(function() {
                return (app.onDeviceReady.calls.length > 0);
            }, 'onDeviceReady should be called once', 500);

            runs(function() {
                expect(app.onDeviceReady).toHaveBeenCalled();
            });
        });
    });

    describe('onDeviceReady', function() {
        it('should report that it fired', function() {
            spyOn(app, 'receivedEvent');
            app.onDeviceReady();
            expect(app.receivedEvent).toHaveBeenCalledWith('deviceready');
        });
    });

    describe('receivedEvent', function() {
        beforeEach(function() {
            var el = document.getElementById('stage');
            el.innerHTML = ['<div id="deviceready">',
                            '    <p class="event listening">Listening</p>',
                            '    <p class="event received">Received</p>',
                            '</div>'].join('\n');
        });

        it('should hide the listening element', function() {
            app.receivedEvent('deviceready');
            var displayStyle = helper.getComputedStyle('#deviceready .listening', 'display');
            expect(displayStyle).toEqual('none');
        });

        it('should show the received element', function() {
            app.receivedEvent('deviceready');
            var displayStyle = helper.getComputedStyle('#deviceready .received', 'display');
            expect(displayStyle).toEqual('block');
        });
    });
});


if(!window['googleLT_']){window['googleLT_']=(new Date()).getTime();}if (!window['google']) {
window['google'] = {};
}
if (!window['google']['loader']) {
window['google']['loader'] = {};
google.loader.ServiceBase = 'https://www.google.com/uds';
google.loader.GoogleApisBase = 'https://ajax.googleapis.com/ajax';
google.loader.ApiKey = 'notsupplied';
google.loader.KeyVerified = true;
google.loader.LoadFailure = false;
google.loader.Secure = true;
google.loader.GoogleLocale = 'www.google.com';
google.loader.ClientLocation = null;
google.loader.AdditionalParams = '';
(function() {var d=encodeURIComponent,g=window,h=document;function l(a,b){return a.load=b}var m="push",n="replace",q="charAt",r="indexOf",t="ServiceBase",u="name",v="getTime",w="length",x="prototype",y="setTimeout",z="loader",A="substring",B="join",C="toLowerCase";function D(a){return a in E?E[a]:E[a]=-1!=navigator.userAgent[C]()[r](a)}var E={};function F(a,b){var c=function(){};c.prototype=b[x];a.U=b[x];a.prototype=new c}
function G(a,b,c){var e=Array[x].slice.call(arguments,2)||[];return function(){var c=e.concat(Array[x].slice.call(arguments));return a.apply(b,c)}}function H(a){a=Error(a);a.toString=function(){return this.message};return a}function I(a,b){for(var c=a.split(/\./),e=g,f=0;f<c[w]-1;f++)e[c[f]]||(e[c[f]]={}),e=e[c[f]];e[c[c[w]-1]]=b}function J(a,b,c){a[b]=c}if(!K)var K=I;if(!L)var L=J;google[z].v={};K("google.loader.callbacks",google[z].v);var M={},N={};google[z].eval={};K("google.loader.eval",google[z].eval);
l(google,function(a,b,c){function e(a){var b=a.split(".");if(2<b[w])throw H("Module: '"+a+"' not found!");"undefined"!=typeof b[1]&&(f=b[0],c.packages=c.packages||[],c.packages[m](b[1]))}var f=a;c=c||{};if(a instanceof Array||a&&"object"==typeof a&&"function"==typeof a[B]&&"function"==typeof a.reverse)for(var k=0;k<a[w];k++)e(a[k]);else e(a);if(a=M[":"+f]){c&&(!c.language&&c.locale)&&(c.language=c.locale);c&&"string"==typeof c.callback&&(k=c.callback,k.match(/^[[\]A-Za-z0-9._]+$/)&&(k=g.eval(k),c.callback=
k));if((k=c&&null!=c.callback)&&!a.s(b))throw H("Module: '"+f+"' must be loaded before DOM onLoad!");k?a.m(b,c)?g[y](c.callback,0):a.load(b,c):a.m(b,c)||a.load(b,c)}else throw H("Module: '"+f+"' not found!");});K("google.load",google.load);
google.T=function(a,b){b?(0==O[w]&&(P(g,"load",Q),!D("msie")&&!D("safari")&&!D("konqueror")&&D("mozilla")||g.opera?g.addEventListener("DOMContentLoaded",Q,!1):D("msie")?h.write("<script defer onreadystatechange='google.loader.domReady()' src=//:>\x3c/script>"):(D("safari")||D("konqueror"))&&g[y](S,10)),O[m](a)):P(g,"load",a)};K("google.setOnLoadCallback",google.T);
function P(a,b,c){if(a.addEventListener)a.addEventListener(b,c,!1);else if(a.attachEvent)a.attachEvent("on"+b,c);else{var e=a["on"+b];a["on"+b]=null!=e?aa([c,e]):c}}function aa(a){return function(){for(var b=0;b<a[w];b++)a[b]()}}var O=[];google[z].P=function(){var a=g.event.srcElement;"complete"==a.readyState&&(a.onreadystatechange=null,a.parentNode.removeChild(a),Q())};K("google.loader.domReady",google[z].P);var ba={loaded:!0,complete:!0};function S(){ba[h.readyState]?Q():0<O[w]&&g[y](S,10)}
function Q(){for(var a=0;a<O[w];a++)O[a]();O.length=0}google[z].d=function(a,b,c){if(c){var e;"script"==a?(e=h.createElement("script"),e.type="text/javascript",e.src=b):"css"==a&&(e=h.createElement("link"),e.type="text/css",e.href=b,e.rel="stylesheet");(a=h.getElementsByTagName("head")[0])||(a=h.body.parentNode.appendChild(h.createElement("head")));a.appendChild(e)}else"script"==a?h.write('<script src="'+b+'" type="text/javascript">\x3c/script>'):"css"==a&&h.write('<link href="'+b+'" type="text/css" rel="stylesheet"></link>')};
K("google.loader.writeLoadTag",google[z].d);google[z].Q=function(a){N=a};K("google.loader.rfm",google[z].Q);google[z].S=function(a){for(var b in a)"string"==typeof b&&(b&&":"==b[q](0)&&!M[b])&&(M[b]=new T(b[A](1),a[b]))};K("google.loader.rpl",google[z].S);google[z].R=function(a){if((a=a.specs)&&a[w])for(var b=0;b<a[w];++b){var c=a[b];"string"==typeof c?M[":"+c]=new U(c):(c=new V(c[u],c.baseSpec,c.customSpecs),M[":"+c[u]]=c)}};K("google.loader.rm",google[z].R);google[z].loaded=function(a){M[":"+a.module].l(a)};
K("google.loader.loaded",google[z].loaded);google[z].O=function(){return"qid="+((new Date)[v]().toString(16)+Math.floor(1E7*Math.random()).toString(16))};K("google.loader.createGuidArg_",google[z].O);I("google_exportSymbol",I);I("google_exportProperty",J);google[z].a={};K("google.loader.themes",google[z].a);google[z].a.I="//www.google.com/cse/style/look/bubblegum.css";L(google[z].a,"BUBBLEGUM",google[z].a.I);google[z].a.K="//www.google.com/cse/style/look/greensky.css";L(google[z].a,"GREENSKY",google[z].a.K);
google[z].a.J="//www.google.com/cse/style/look/espresso.css";L(google[z].a,"ESPRESSO",google[z].a.J);google[z].a.M="//www.google.com/cse/style/look/shiny.css";L(google[z].a,"SHINY",google[z].a.M);google[z].a.L="//www.google.com/cse/style/look/minimalist.css";L(google[z].a,"MINIMALIST",google[z].a.L);google[z].a.N="//www.google.com/cse/style/look/v2/default.css";L(google[z].a,"V2_DEFAULT",google[z].a.N);function U(a){this.b=a;this.o=[];this.n={};this.e={};this.f={};this.j=!0;this.c=-1}
U[x].g=function(a,b){var c="";void 0!=b&&(void 0!=b.language&&(c+="&hl="+d(b.language)),void 0!=b.nocss&&(c+="&output="+d("nocss="+b.nocss)),void 0!=b.nooldnames&&(c+="&nooldnames="+d(b.nooldnames)),void 0!=b.packages&&(c+="&packages="+d(b.packages)),null!=b.callback&&(c+="&async=2"),void 0!=b.style&&(c+="&style="+d(b.style)),void 0!=b.noexp&&(c+="&noexp=true"),void 0!=b.other_params&&(c+="&"+b.other_params));if(!this.j){google[this.b]&&google[this.b].JSHash&&(c+="&sig="+d(google[this.b].JSHash));
var e=[],f;for(f in this.n)":"==f[q](0)&&e[m](f[A](1));for(f in this.e)":"==f[q](0)&&this.e[f]&&e[m](f[A](1));c+="&have="+d(e[B](","))}return google[z][t]+"/?file="+this.b+"&v="+a+google[z].AdditionalParams+c};U[x].t=function(a){var b=null;a&&(b=a.packages);var c=null;if(b)if("string"==typeof b)c=[a.packages];else if(b[w])for(c=[],a=0;a<b[w];a++)"string"==typeof b[a]&&c[m](b[a][n](/^\s*|\s*$/,"")[C]());c||(c=["default"]);b=[];for(a=0;a<c[w];a++)this.n[":"+c[a]]||b[m](c[a]);return b};
l(U[x],function(a,b){var c=this.t(b),e=b&&null!=b.callback;if(e)var f=new W(b.callback);for(var k=[],p=c[w]-1;0<=p;p--){var s=c[p];e&&f.B(s);if(this.e[":"+s])c.splice(p,1),e&&this.f[":"+s][m](f);else k[m](s)}if(c[w]){b&&b.packages&&(b.packages=c.sort()[B](","));for(p=0;p<k[w];p++)s=k[p],this.f[":"+s]=[],e&&this.f[":"+s][m](f);if(b||null==N[":"+this.b]||null==N[":"+this.b].versions[":"+a]||google[z].AdditionalParams||!this.j)b&&b.autoloaded||google[z].d("script",this.g(a,b),e);else{c=N[":"+this.b];
google[this.b]=google[this.b]||{};for(var R in c.properties)R&&":"==R[q](0)&&(google[this.b][R[A](1)]=c.properties[R]);google[z].d("script",google[z][t]+c.path+c.js,e);c.css&&google[z].d("css",google[z][t]+c.path+c.css,e)}this.j&&(this.j=!1,this.c=(new Date)[v](),1!=this.c%100&&(this.c=-1));for(p=0;p<k[w];p++)s=k[p],this.e[":"+s]=!0}});
U[x].l=function(a){-1!=this.c&&(X("al_"+this.b,"jl."+((new Date)[v]()-this.c),!0),this.c=-1);this.o=this.o.concat(a.components);google[z][this.b]||(google[z][this.b]={});google[z][this.b].packages=this.o.slice(0);for(var b=0;b<a.components[w];b++){this.n[":"+a.components[b]]=!0;this.e[":"+a.components[b]]=!1;var c=this.f[":"+a.components[b]];if(c){for(var e=0;e<c[w];e++)c[e].C(a.components[b]);delete this.f[":"+a.components[b]]}}};U[x].m=function(a,b){return 0==this.t(b)[w]};U[x].s=function(){return!0};
function W(a){this.F=a;this.q={};this.r=0}W[x].B=function(a){this.r++;this.q[":"+a]=!0};W[x].C=function(a){this.q[":"+a]&&(this.q[":"+a]=!1,this.r--,0==this.r&&g[y](this.F,0))};function V(a,b,c){this.name=a;this.D=b;this.p=c;this.u=this.h=!1;this.k=[];google[z].v[this[u]]=G(this.l,this)}F(V,U);l(V[x],function(a,b){var c=b&&null!=b.callback;c?(this.k[m](b.callback),b.callback="google.loader.callbacks."+this[u]):this.h=!0;b&&b.autoloaded||google[z].d("script",this.g(a,b),c)});V[x].m=function(a,b){return b&&null!=b.callback?this.u:this.h};V[x].l=function(){this.u=!0;for(var a=0;a<this.k[w];a++)g[y](this.k[a],0);this.k=[]};
var Y=function(a,b){return a.string?d(a.string)+"="+d(b):a.regex?b[n](/(^.*$)/,a.regex):""};V[x].g=function(a,b){return this.G(this.w(a),a,b)};
V[x].G=function(a,b,c){var e="";a.key&&(e+="&"+Y(a.key,google[z].ApiKey));a.version&&(e+="&"+Y(a.version,b));b=google[z].Secure&&a.ssl?a.ssl:a.uri;if(null!=c)for(var f in c)a.params[f]?e+="&"+Y(a.params[f],c[f]):"other_params"==f?e+="&"+c[f]:"base_domain"==f&&(b="http://"+c[f]+a.uri[A](a.uri[r]("/",7)));google[this[u]]={};-1==b[r]("?")&&e&&(e="?"+e[A](1));return b+e};V[x].s=function(a){return this.w(a).deferred};V[x].w=function(a){if(this.p)for(var b=0;b<this.p[w];++b){var c=this.p[b];if(RegExp(c.pattern).test(a))return c}return this.D};function T(a,b){this.b=a;this.i=b;this.h=!1}F(T,U);l(T[x],function(a,b){this.h=!0;google[z].d("script",this.g(a,b),!1)});T[x].m=function(){return this.h};T[x].l=function(){};T[x].g=function(a,b){if(!this.i.versions[":"+a]){if(this.i.aliases){var c=this.i.aliases[":"+a];c&&(a=c)}if(!this.i.versions[":"+a])throw H("Module: '"+this.b+"' with version '"+a+"' not found!");}return google[z].GoogleApisBase+"/libs/"+this.b+"/"+a+"/"+this.i.versions[":"+a][b&&b.uncompressed?"uncompressed":"compressed"]};
T[x].s=function(){return!1};var ca=!1,Z=[],da=(new Date)[v](),fa=function(){ca||(P(g,"unload",ea),ca=!0)},ga=function(a,b){fa();if(!(google[z].Secure||google[z].Options&&!1!==google[z].Options.csi)){for(var c=0;c<a[w];c++)a[c]=d(a[c][C]()[n](/[^a-z0-9_.]+/g,"_"));for(c=0;c<b[w];c++)b[c]=d(b[c][C]()[n](/[^a-z0-9_.]+/g,"_"));g[y](G($,null,"//gg.google.com/csi?s=uds&v=2&action="+a[B](",")+"&it="+b[B](",")),1E4)}},X=function(a,b,c){c?ga([a],[b]):(fa(),Z[m]("r"+Z[w]+"="+d(a+(b?"|"+b:""))),g[y](ea,5<Z[w]?0:15E3))},ea=function(){if(Z[w]){var a=
google[z][t];0==a[r]("http:")&&(a=a[n](/^http:/,"https:"));$(a+"/stats?"+Z[B]("&")+"&nc="+(new Date)[v]()+"_"+((new Date)[v]()-da));Z.length=0}},$=function(a){var b=new Image,c=$.H++;$.A[c]=b;b.onload=b.onerror=function(){delete $.A[c]};b.src=a;b=null};$.A={};$.H=0;I("google.loader.recordCsiStat",ga);I("google.loader.recordStat",X);I("google.loader.createImageForLogging",$);

}) ();google.loader.rm({"specs":["feeds","spreadsheets","gdata","visualization",{"name":"sharing","baseSpec":{"uri":"http://www.google.com/s2/sharing/js","ssl":null,"key":{"string":"key"},"version":{"string":"v"},"deferred":false,"params":{"language":{"string":"hl"}}}},"search","orkut","ads","elements",{"name":"books","baseSpec":{"uri":"http://books.google.com/books/api.js","ssl":"https://encrypted.google.com/books/api.js","key":{"string":"key"},"version":{"string":"v"},"deferred":true,"params":{"callback":{"string":"callback"},"language":{"string":"hl"}}}},{"name":"friendconnect","baseSpec":{"uri":"http://www.google.com/friendconnect/script/friendconnect.js","ssl":null,"key":{"string":"key"},"version":{"string":"v"},"deferred":false,"params":{}}},"identitytoolkit","ima",{"name":"maps","baseSpec":{"uri":"http://maps.google.com/maps?file\u003dgoogleapi","ssl":"https://maps-api-ssl.google.com/maps?file\u003dgoogleapi","key":{"string":"key"},"version":{"string":"v"},"deferred":true,"params":{"callback":{"regex":"callback\u003d$1\u0026async\u003d2"},"language":{"string":"hl"}}},"customSpecs":[{"uri":"http://maps.googleapis.com/maps/api/js","ssl":"https://maps.googleapis.com/maps/api/js","version":{"string":"v"},"deferred":true,"params":{"callback":{"string":"callback"},"language":{"string":"hl"}},"pattern":"^(3|3..*)$"}]},"payments","wave","annotations_v2","earth","language",{"name":"annotations","baseSpec":{"uri":"http://www.google.com/reviews/scripts/annotations_bootstrap.js","ssl":null,"key":{"string":"key"},"version":{"string":"v"},"deferred":true,"params":{"callback":{"string":"callback"},"language":{"string":"hl"},"country":{"string":"gl"}}}},"picker"]});
google.loader.rfm({":search":{"versions":{":1":"1",":1.0":"1"},"path":"/api/search/1.0/351077565dad05b6847b1f7d41e36949/","js":"default+en.I.js","css":"default+en.css","properties":{":JSHash":"351077565dad05b6847b1f7d41e36949",":NoOldNames":false,":Version":"1.0"}},":language":{"versions":{":1":"1",":1.0":"1"},"path":"/api/language/1.0/72dfd738bc1b18a14ab936bb2690a4f0/","js":"default+en.I.js","properties":{":JSHash":"72dfd738bc1b18a14ab936bb2690a4f0",":Version":"1.0"}},":feeds":{"versions":{":1":"1",":1.0":"1"},"path":"/api/feeds/1.0/e658fb253c8b588196cf534cc43ab319/","js":"default+en.I.js","css":"default+en.css","properties":{":JSHash":"e658fb253c8b588196cf534cc43ab319",":Version":"1.0"}},":spreadsheets":{"versions":{":0":"1",":0.4":"1"},"path":"/api/spreadsheets/0.4/87ff7219e9f8a8164006cbf28d5e911a/","js":"default.I.js","properties":{":JSHash":"87ff7219e9f8a8164006cbf28d5e911a",":Version":"0.4"}},":ima":{"versions":{":3":"1",":3.0":"1"},"path":"/api/ima/3.0/28a914332232c9a8ac0ae8da68b1006e/","js":"default.I.js","properties":{":JSHash":"28a914332232c9a8ac0ae8da68b1006e",":Version":"3.0"}},":wave":{"versions":{":1":"1",":1.0":"1"},"path":"/api/wave/1.0/3b6f7573ff78da6602dda5e09c9025bf/","js":"default.I.js","properties":{":JSHash":"3b6f7573ff78da6602dda5e09c9025bf",":Version":"1.0"}},":earth":{"versions":{":1":"1",":1.0":"1"},"path":"/api/earth/1.0/109c7b2bae7fe6cc34ea875176165d81/","js":"default.I.js","properties":{":JSHash":"109c7b2bae7fe6cc34ea875176165d81",":Version":"1.0"}},":annotations":{"versions":{":1":"1",":1.0":"1"},"path":"/api/annotations/1.0/bacce7b6155a1bbadda3c05d65391b22/","js":"default+en.I.js","properties":{":JSHash":"bacce7b6155a1bbadda3c05d65391b22",":Version":"1.0"}},":picker":{"versions":{":1":"1",":1.0":"1"},"path":"/api/picker/1.0/27b625d21ca34b09c89dcd3d22f65143/","js":"default.I.js","css":"default.css","properties":{":JSHash":"27b625d21ca34b09c89dcd3d22f65143",":Version":"1.0"}}});
google.loader.rpl({":scriptaculous":{"versions":{":1.8.3":{"uncompressed":"scriptaculous.js","compressed":"scriptaculous.js"},":1.9.0":{"uncompressed":"scriptaculous.js","compressed":"scriptaculous.js"},":1.8.2":{"uncompressed":"scriptaculous.js","compressed":"scriptaculous.js"},":1.8.1":{"uncompressed":"scriptaculous.js","compressed":"scriptaculous.js"}},"aliases":{":1.8":"1.8.3",":1":"1.9.0",":1.9":"1.9.0"}},":yui":{"versions":{":2.6.0":{"uncompressed":"build/yuiloader/yuiloader.js","compressed":"build/yuiloader/yuiloader-min.js"},":2.9.0":{"uncompressed":"build/yuiloader/yuiloader.js","compressed":"build/yuiloader/yuiloader-min.js"},":2.7.0":{"uncompressed":"build/yuiloader/yuiloader.js","compressed":"build/yuiloader/yuiloader-min.js"},":2.8.0r4":{"uncompressed":"build/yuiloader/yuiloader.js","compressed":"build/yuiloader/yuiloader-min.js"},":2.8.2r1":{"uncompressed":"build/yuiloader/yuiloader.js","compressed":"build/yuiloader/yuiloader-min.js"},":2.8.1":{"uncompressed":"build/yuiloader/yuiloader.js","compressed":"build/yuiloader/yuiloader-min.js"},":3.3.0":{"uncompressed":"build/yui/yui.js","compressed":"build/yui/yui-min.js"}},"aliases":{":3":"3.3.0",":2":"2.9.0",":2.7":"2.7.0",":2.8.2":"2.8.2r1",":2.6":"2.6.0",":2.9":"2.9.0",":2.8":"2.8.2r1",":2.8.0":"2.8.0r4",":3.3":"3.3.0"}},":swfobject":{"versions":{":2.1":{"uncompressed":"swfobject_src.js","compressed":"swfobject.js"},":2.2":{"uncompressed":"swfobject_src.js","compressed":"swfobject.js"}},"aliases":{":2":"2.2"}},":ext-core":{"versions":{":3.1.0":{"uncompressed":"ext-core-debug.js","compressed":"ext-core.js"},":3.0.0":{"uncompressed":"ext-core-debug.js","compressed":"ext-core.js"}},"aliases":{":3":"3.1.0",":3.0":"3.0.0",":3.1":"3.1.0"}},":webfont":{"versions":{":1.0.28":{"uncompressed":"webfont_debug.js","compressed":"webfont.js"},":1.0.27":{"uncompressed":"webfont_debug.js","compressed":"webfont.js"},":1.0.29":{"uncompressed":"webfont_debug.js","compressed":"webfont.js"},":1.0.12":{"uncompressed":"webfont_debug.js","compressed":"webfont.js"},":1.0.13":{"uncompressed":"webfont_debug.js","compressed":"webfont.js"},":1.0.14":{"uncompressed":"webfont_debug.js","compressed":"webfont.js"},":1.0.15":{"uncompressed":"webfont_debug.js","compressed":"webfont.js"},":1.0.10":{"uncompressed":"webfont_debug.js","compressed":"webfont.js"},":1.0.11":{"uncompressed":"webfont_debug.js","compressed":"webfont.js"},":1.0.2":{"uncompressed":"webfont_debug.js","compressed":"webfont.js"},":1.0.1":{"uncompressed":"webfont_debug.js","compressed":"webfont.js"},":1.0.0":{"uncompressed":"webfont_debug.js","compressed":"webfont.js"},":1.0.6":{"uncompressed":"webfont_debug.js","compressed":"webfont.js"},":1.0.19":{"uncompressed":"webfont_debug.js","compressed":"webfont.js"},":1.0.5":{"uncompressed":"webfont_debug.js","compressed":"webfont.js"},":1.0.18":{"uncompressed":"webfont_debug.js","compressed":"webfont.js"},":1.0.4":{"uncompressed":"webfont_debug.js","compressed":"webfont.js"},":1.0.17":{"uncompressed":"webfont_debug.js","compressed":"webfont.js"},":1.0.3":{"uncompressed":"webfont_debug.js","compressed":"webfont.js"},":1.0.16":{"uncompressed":"webfont_debug.js","compressed":"webfont.js"},":1.0.9":{"uncompressed":"webfont_debug.js","compressed":"webfont.js"},":1.0.21":{"uncompressed":"webfont_debug.js","compressed":"webfont.js"},":1.0.22":{"uncompressed":"webfont_debug.js","compressed":"webfont.js"},":1.0.25":{"uncompressed":"webfont_debug.js","compressed":"webfont.js"},":1.0.26":{"uncompressed":"webfont_debug.js","compressed":"webfont.js"},":1.0.23":{"uncompressed":"webfont_debug.js","compressed":"webfont.js"},":1.0.24":{"uncompressed":"webfont_debug.js","compressed":"webfont.js"}},"aliases":{":1":"1.0.29",":1.0":"1.0.29"}},":mootools":{"versions":{":1.3.1":{"uncompressed":"mootools.js","compressed":"mootools-yui-compressed.js"},":1.1.1":{"uncompressed":"mootools.js","compressed":"mootools-yui-compressed.js"},":1.3.0":{"uncompressed":"mootools.js","compressed":"mootools-yui-compressed.js"},":1.3.2":{"uncompressed":"mootools.js","compressed":"mootools-yui-compressed.js"},":1.1.2":{"uncompressed":"mootools.js","compressed":"mootools-yui-compressed.js"},":1.2.3":{"uncompressed":"mootools.js","compressed":"mootools-yui-compressed.js"},":1.2.4":{"uncompressed":"mootools.js","compressed":"mootools-yui-compressed.js"},":1.2.1":{"uncompressed":"mootools.js","compressed":"mootools-yui-compressed.js"},":1.2.2":{"uncompressed":"mootools.js","compressed":"mootools-yui-compressed.js"},":1.2.5":{"uncompressed":"mootools.js","compressed":"mootools-yui-compressed.js"},":1.4.0":{"uncompressed":"mootools.js","compressed":"mootools-yui-compressed.js"},":1.4.1":{"uncompressed":"mootools.js","compressed":"mootools-yui-compressed.js"},":1.4.2":{"uncompressed":"mootools.js","compressed":"mootools-yui-compressed.js"}},"aliases":{":1":"1.1.2",":1.11":"1.1.1",":1.4":"1.4.2",":1.3":"1.3.2",":1.2":"1.2.5",":1.1":"1.1.2"}},":jqueryui":{"versions":{":1.8.0":{"uncompressed":"jquery-ui.js","compressed":"jquery-ui.min.js"},":1.8.2":{"uncompressed":"jquery-ui.js","compressed":"jquery-ui.min.js"},":1.8.1":{"uncompressed":"jquery-ui.js","compressed":"jquery-ui.min.js"},":1.8.15":{"uncompressed":"jquery-ui.js","compressed":"jquery-ui.min.js"},":1.8.14":{"uncompressed":"jquery-ui.js","compressed":"jquery-ui.min.js"},":1.8.13":{"uncompressed":"jquery-ui.js","compressed":"jquery-ui.min.js"},":1.8.12":{"uncompressed":"jquery-ui.js","compressed":"jquery-ui.min.js"},":1.8.11":{"uncompressed":"jquery-ui.js","compressed":"jquery-ui.min.js"},":1.8.10":{"uncompressed":"jquery-ui.js","compressed":"jquery-ui.min.js"},":1.8.17":{"uncompressed":"jquery-ui.js","compressed":"jquery-ui.min.js"},":1.8.16":{"uncompressed":"jquery-ui.js","compressed":"jquery-ui.min.js"},":1.6.0":{"uncompressed":"jquery-ui.js","compressed":"jquery-ui.min.js"},":1.8.9":{"uncompressed":"jquery-ui.js","compressed":"jquery-ui.min.js"},":1.8.7":{"uncompressed":"jquery-ui.js","compressed":"jquery-ui.min.js"},":1.8.8":{"uncompressed":"jquery-ui.js","compressed":"jquery-ui.min.js"},":1.7.2":{"uncompressed":"jquery-ui.js","compressed":"jquery-ui.min.js"},":1.8.5":{"uncompressed":"jquery-ui.js","compressed":"jquery-ui.min.js"},":1.7.3":{"uncompressed":"jquery-ui.js","compressed":"jquery-ui.min.js"},":1.8.6":{"uncompressed":"jquery-ui.js","compressed":"jquery-ui.min.js"},":1.7.0":{"uncompressed":"jquery-ui.js","compressed":"jquery-ui.min.js"},":1.7.1":{"uncompressed":"jquery-ui.js","compressed":"jquery-ui.min.js"},":1.8.4":{"uncompressed":"jquery-ui.js","compressed":"jquery-ui.min.js"},":1.5.3":{"uncompressed":"jquery-ui.js","compressed":"jquery-ui.min.js"},":1.5.2":{"uncompressed":"jquery-ui.js","compressed":"jquery-ui.min.js"}},"aliases":{":1.8":"1.8.17",":1.7":"1.7.3",":1.6":"1.6.0",":1":"1.8.17",":1.5":"1.5.3",":1.8.3":"1.8.4"}},":chrome-frame":{"versions":{":1.0.2":{"uncompressed":"CFInstall.js","compressed":"CFInstall.min.js"},":1.0.1":{"uncompressed":"CFInstall.js","compressed":"CFInstall.min.js"},":1.0.0":{"uncompressed":"CFInstall.js","compressed":"CFInstall.min.js"}},"aliases":{":1":"1.0.2",":1.0":"1.0.2"}},":prototype":{"versions":{":1.7.0.0":{"uncompressed":"prototype.js","compressed":"prototype.js"},":1.6.0.2":{"uncompressed":"prototype.js","compressed":"prototype.js"},":1.6.1.0":{"uncompressed":"prototype.js","compressed":"prototype.js"},":1.6.0.3":{"uncompressed":"prototype.js","compressed":"prototype.js"}},"aliases":{":1.7":"1.7.0.0",":1.6.1":"1.6.1.0",":1":"1.7.0.0",":1.6":"1.6.1.0",":1.7.0":"1.7.0.0",":1.6.0":"1.6.0.3"}},":jquery":{"versions":{":1.6.2":{"uncompressed":"jquery.js","compressed":"jquery.min.js"},":1.3.1":{"uncompressed":"jquery.js","compressed":"jquery.min.js"},":1.6.1":{"uncompressed":"jquery.js","compressed":"jquery.min.js"},":1.3.0":{"uncompressed":"jquery.js","compressed":"jquery.min.js"},":1.6.4":{"uncompressed":"jquery.js","compressed":"jquery.min.js"},":1.6.3":{"uncompressed":"jquery.js","compressed":"jquery.min.js"},":1.3.2":{"uncompressed":"jquery.js","compressed":"jquery.min.js"},":1.6.0":{"uncompressed":"jquery.js","compressed":"jquery.min.js"},":1.2.3":{"uncompressed":"jquery.js","compressed":"jquery.min.js"},":1.7.0":{"uncompressed":"jquery.js","compressed":"jquery.min.js"},":1.7.1":{"uncompressed":"jquery.js","compressed":"jquery.min.js"},":1.2.6":{"uncompressed":"jquery.js","compressed":"jquery.min.js"},":1.4.3":{"uncompressed":"jquery.js","compressed":"jquery.min.js"},":1.4.4":{"uncompressed":"jquery.js","compressed":"jquery.min.js"},":1.5.1":{"uncompressed":"jquery.js","compressed":"jquery.min.js"},":1.5.0":{"uncompressed":"jquery.js","compressed":"jquery.min.js"},":1.4.0":{"uncompressed":"jquery.js","compressed":"jquery.min.js"},":1.5.2":{"uncompressed":"jquery.js","compressed":"jquery.min.js"},":1.4.1":{"uncompressed":"jquery.js","compressed":"jquery.min.js"},":1.4.2":{"uncompressed":"jquery.js","compressed":"jquery.min.js"}},"aliases":{":1.7":"1.7.1",":1.6":"1.6.4",":1":"1.7.1",":1.5":"1.5.2",":1.4":"1.4.4",":1.3":"1.3.2",":1.2":"1.2.6"}},":dojo":{"versions":{":1.3.1":{"uncompressed":"dojo/dojo.xd.js.uncompressed.js","compressed":"dojo/dojo.xd.js"},":1.3.0":{"uncompressed":"dojo/dojo.xd.js.uncompressed.js","compressed":"dojo/dojo.xd.js"},":1.6.1":{"uncompressed":"dojo/dojo.xd.js.uncompressed.js","compressed":"dojo/dojo.xd.js"},":1.1.1":{"uncompressed":"dojo/dojo.xd.js.uncompressed.js","compressed":"dojo/dojo.xd.js"},":1.3.2":{"uncompressed":"dojo/dojo.xd.js.uncompressed.js","compressed":"dojo/dojo.xd.js"},":1.6.0":{"uncompressed":"dojo/dojo.xd.js.uncompressed.js","compressed":"dojo/dojo.xd.js"},":1.2.3":{"uncompressed":"dojo/dojo.xd.js.uncompressed.js","compressed":"dojo/dojo.xd.js"},":1.7.2":{"uncompressed":"dojo/dojo.js.uncompressed.js","compressed":"dojo/dojo.js"},":1.7.0":{"uncompressed":"dojo/dojo.js.uncompressed.js","compressed":"dojo/dojo.js"},":1.7.1":{"uncompressed":"dojo/dojo.js.uncompressed.js","compressed":"dojo/dojo.js"},":1.4.3":{"uncompressed":"dojo/dojo.xd.js.uncompressed.js","compressed":"dojo/dojo.xd.js"},":1.5.1":{"uncompressed":"dojo/dojo.xd.js.uncompressed.js","compressed":"dojo/dojo.xd.js"},":1.5.0":{"uncompressed":"dojo/dojo.xd.js.uncompressed.js","compressed":"dojo/dojo.xd.js"},":1.2.0":{"uncompressed":"dojo/dojo.xd.js.uncompressed.js","compressed":"dojo/dojo.xd.js"},":1.4.0":{"uncompressed":"dojo/dojo.xd.js.uncompressed.js","compressed":"dojo/dojo.xd.js"},":1.4.1":{"uncompressed":"dojo/dojo.xd.js.uncompressed.js","compressed":"dojo/dojo.xd.js"}},"aliases":{":1.7":"1.7.2",":1":"1.6.1",":1.6":"1.6.1",":1.5":"1.5.1",":1.4":"1.4.3",":1.3":"1.3.2",":1.2":"1.2.3",":1.1":"1.1.1"}}});
}

function initHistory(label){
     sessionStorage.removeItem(label);
    var history=[];
    sessionStorage.setItem(label,JSON.stringify(history));
}

function saveToHistory(value, label){
    var history = JSON.parse(sessionStorage.getItem(label));
    history.push(value);
    console.log("add"+history);
    sessionStorage.setItem(label,JSON.stringify(history));
}

function goBack(label){
    var history = JSON.parse(sessionStorage.getItem(label));
    console.log("delete"+history);
    var result = history.pop();
    history = jQuery.grep(history, function(value) {
        return value != result;
    });
    
    sessionStorage.setItem(label,JSON.stringify(history));
    return result;
}

function toRad(num) {
    return num * Math.PI / 180;
}


function distanceFromCurrent(georss, currLat, currLon) 
{  
    jQuery.trim(georss);
    var pointLatLon = georss.split(" ");
    var pointLat = parseFloat(pointLatLon[0]);
    var pointLon = parseFloat(pointLatLon[1]);

    var R = 6371;                   //Radius of the earth in Km             
    var dLat = toRad((pointLat - currLat));    //delta (difference between) latitude in radians
    var dLon = toRad((pointLon - currLon));    //delta (difference between) longitude in radians

    currLat = toRad(currLat);          //conversion to radians
    pointLat = toRad(pointLat);

    var a = Math.sin(dLat/2) * Math.sin(dLat/2) + Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(currLat) * Math.cos(pointLat);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));   //must use atan2 as simple arctan cannot differentiate 1/1 and -1/-1
    var distance = R * c;   //sets the distance

    distance = Math.round(distance*10)/10;      //rounds number to closest 0.1 km
    return distance;    //returns the distance
}

 
 $('#index_page').live('pagebeforeshow',function(){
     
      //-----------init configuration------------------------------------------
        sessionStorage.setItem("sitename", 'http://zakynthos.livecity.gr');
        sessionStorage.setItem("city", '45157');
        
        if(sessionStorage.getItem("lang")===null)
           sessionStorage.setItem("lang", '1');
       
        if(sessionStorage.getItem("langLabel")===null)
          sessionStorage.setItem("langLabel", 'el');
       
        sessionStorage.setItem("newsrootpage", '11');        
        sessionStorage.setItem("latmap","37.802189");
        sessionStorage.setItem("longmap","20.808105");

     
     
 });
 


//fases
    $('[data-role=page]').live('pagebeforeshow', function(event, ui) {
       
      $(this).find("#header-image header").css("background-image","url(\"./img/header-mobile-fasa-"+sessionStorage.getItem("langLabel")+".jpg\")");
    
    });


/************** GENIKES SYNARTHSEIS***********************/
//DETECTIONS
 /* detect device */
    var ua = navigator.userAgent,
    iphone = ~ua.indexOf('iPhone') || ~ua.indexOf('iPod'),
    ipad = ~ua.indexOf('iPad'),   //den einai 0 ean einai ipad
    ios = iphone || ipad,  
    android = ~ua.indexOf('Android');
//alert(ua);//console.log(ua);
//alert(ipad);//alert(android);
// alert(window.devicePixelRatio);

/*--------------genikes metavlites-----------------*/
 var lat_cache = sessionStorage.getItem("lat");
 
//AYTO HEIGHT
function calc(idpage) {
    console.log('auto height gia '+idpage);
  // alert('auto height gia '+idpage);     
     //ypologismos height twn header kai footer
       olataheight = 0;//midenismos height kathe fora       
        $('body').find('#header-image:first, #foot:first').each(function() {     
         //  console.log($(this).height());   
          //alert($(this).height());
            olataheight+= $(this).height();     
        });
            
     var conh = $(document).height()- olataheight;
    // alert($(window).height()+' ' + olataheight);
    // alert(conh);
    //efarmogi tou height se oles tis classes fullHeight
        $('body').find('.fullHeight').each(function(){
        // console.log($(this));
        $(this).height(conh);
    });
    //kane ta lis 12.5% 
     $('body').find('#index_page ul>li').css('height','12.5%');      
 
 }

    function getPosition(position){
            if (typeof lat_cache == 'object'){
                     grapseminima(txt_locationFound);
                    setTimeout(sviseminima,2500);  
                }
              //apothikeusi sti cache 
                sessionStorage.setItem("lat",  position.coords.latitude);
                sessionStorage.setItem("long", position.coords.longitude);                 
                             
            }
                
    function geoError(){
          if (typeof lat_cache == 'object') {  
                grapseminima(txt_locationNotFound);
                setTimeout(sviseminima,2500);
            }
            }

function grapseminima(minima){
$.mobile.loading('show', {
    text: ' ',
    textVisible: true,
    theme: 'none',
    html: '<a class="ui-btn ui-btn-corner-all ui-btn-inline ui-btn-active" href="javascript:void(0)" data-role="none"  data-icon="false" data-theme="a"  data-corners="true" data-shadow="false" data-iconshadow="false"><span class="ui-btn-inner"><span class="ui-btn-text">'+minima+'</span></span></a>'
     });
}
function sviseminima() {
    $.mobile.loading('hide');
    
}
 function loadURL(url){
    navigator.loadUrl(url, { openExternal:true });
         return false;
     } 

function loadbuttons(pageid){ 
  //LOAD BUTTONS LOGIN / LOGOUT
         console.log('fortosan koumpia sto '+pageid);        
       if (!userHasBeenLoggedIn()) {
                    $('.login_button').each(function(){ $(this).show();});
                }
                else { $('.logout_button').each(function(){ $(this).show();})
                }
 //on logout click logout
                $('.logout_button').click(function(){
                   grapseminima(txt_logout);
                   setTimeout(sviseminima,1500);
                   setTimeout(logout,2000);
                });
 
}


/**************************************/

function MainDeviceInit() { 
/**********************------All LOGINS LOGOUT BUTTONS IN ALL PAGES-----PAGEINIT------*****************************************/
$('#index_page,#list_view_page,#livecity_page,#login_page,#offer_page,#livenews_page,#favourites_page,#searchformpage,#page_searchresults,#articleview_page').live('pageinit',function(){loadbuttons($(this).attr('id'));});

//$(document).on( "pageinit", "#indSex_page", function(e){ loadbuttons();} ); 
// Delegate
//$(document).on("pageinit", "#index_page, ", function( e ){ setTimeout(loadbuttons,100);} ); 
/*********************************------index MAIN PAGE-----PAGEINIT------*****************************************/
$('#index_page').live('pageinit',function(){
console.log('ekkinisi '+$(this).attr('id'));     
     
     //android or other
    if (ios ===0)
            { 
        //portrait only ypologismo autoheight 
          if ( $(window).height() >  $(window).width() ){            
         
            if (   $(window).height() > 700 ) {             
            $('#index_page').live('pageshow',function(){calc('main page');        });  
            
                } 
      }        
            }
      

$(window).bind('orientationchange', function(event){
if(event.orientation) {
    if(event.orientation == 'portrait') 
     { // alert('portr-ori-ev-'+$(window).width()); 
         //alert($(window).height());
         calc('mainpage-orient-changed-v'); 
      }                   
else if (event.orientation == 'landscape') 
        {
            //alert('landscape-event-changed!'); 
         //alert($(window).height());
           //ean einai 
     if ( ($(window).height() >800)  ||  ($(window).height()<480) ) {
     $('body').find('.fullHeight ul li').css('height','100px');
     $('body').find('.fullHeight').height('100%');
                }
          
                    
   } 
  }         
        else {
      // optional... PC-version javascript for example
       calc('main page-desktop-edition');
       }
      });
//--------------------------------------------------------------------------
 $(".shadow a").click(function(){
                    sessionStorage.setItem("currentPage", $(this).attr("id"));   
                    console.log("curentpage"+sessionStorage.getItem("currentPage"));
                    saveToHistory("6","history");
                   
                    
                });
                
       //GEO LOCATION SCRIPTS                  
    $('#index_page').live('pageshow',function(){
 navigator.geolocation.getCurrentPosition(getPosition, geoError,{ maximumAge: 3000, timeout: 10000, enableHighAccuracy: true });              
   //ean den yparxei stin session cache to latitude
   //ean yparxei tote einai type string
   if (typeof lat_cache == 'object'){$.mobile.loading('show',{text:txt_locationSearching,textVisible:true}); }                  
           
    });  
                
                
//-------------------------get page tapped and save it as current---------------------------------
        //init history
        initHistory("history");
        initHistory("newsrootpagehistory");       
 
    //sessionStorage.removeItem("currentPage");
         
});


/*********************************------articleview PAGE-----PAGEINIT------*****************************************/
$('#articleview_page').live('pageinit',function(){
    console.log('ekkinisi  ',$(this).attr('id'));
     //get business tree
                var jsonurlb = sessionStorage.getItem("sitename") + "/mobilepageinfo/page_unique_id/" + sessionStorage.getItem("currentPage");
                //console.log(jsonurlb);
                $.getJSON(jsonurlb, function(json) {
                   // console.log(json);
                    sessionStorage.setItem("businessInfo", JSON.stringify(json));
                    //parse data
                    if (json.page_title) {
                        $(".page_title").html(json.page_title);
                    }
                    if (json.page_content) {
                        var par2 = $('<div></div>').html(json.page_content);
                        $(".page_content").html($(par2).text()).append('<p></p>');
                    }
                    if (json.photo !== null) {
                        var eikona = '<img src="' + sessionStorage.getItem("sitename") + json.photo + '"/>';
                    }
                    else {
                        var eikona = "";
                    }
                    $('#business-view #eikona,#contact_view #eikona,#form_view #eikona').html(eikona);

                       $('.page_content a').each(function(){
                      
                        var link=$(this).attr('href'); 
                        //JSON.stringify(link);  
                        
                         if (typeof link === 'undefined')
                                {                             
                                  console.log(link);
                                  }
                     else {
                        
                if(link.indexOf('http:') !==-1){ 
                           
                        $(this).live('vclick',function(event){                                
                            event.preventDefault();
                            $(this).attr('rel',link);
                                 loadURL(link);
                                 return false;
                                    });
                       }
                  else {
                            $(this).live('vclick',function(event){                                
                            event.preventDefault();
                                    $(this).attr('href','#');
                                     return false;
                                        });

                           }
                   
                        
                       }
                 });     

                    sessionStorage.setItem("tracklat", json.latitude);
                    sessionStorage.setItem("tracklong", json.longtitude);
                });
          
});

/*************************   PAGE EVENTS  *******************************************/             
$.getScript("js/controllers/livenews.js");
$.getScript("js/controllers/livecity.js");
$.getScript("js/controllers/offers.js");
$.getScript("js/controllers/favourites.js");
$.getScript("js/controllers/login.js");
$.getScript("js/controllers/search.js");
$.getScript("js/controllers/searchresults.js");
//$.getScript("js/controllers/articleview.js");
$.getScript("js/controllers/businessview.js");

}

//seira ektelesis events
//pageinit 1fora mono trexei
//document ready 
//device ready 
//pageshow kathe fora

MainDeviceInit();
//try {MainDeviceInit(); }
//catch(err) {alert(err);}

//live equivalent on jq 1.7.1 +
//$(document).on( "pageinit", "#index_page", function( e ) {alert(e);} ); 

//document.addEventListener('deviceready', function(){MainDeviceInit();}, false);




//Ekinisi se browser
if (typeof navigator.connection === 'undefined')
{
    console.log('cordova active');
    //to pageinit kanei trigger prin ton document ready ara otan pas na fortoseis to document ready
    // k mesa exeis bind sto pageinit exei idi fortosei
    //$(document).ready(MainDeviceInit);
    //MainDeviceInit();
}

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
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicity call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
};

function saveToCache(id, json){
    sessionStorage.setItem(id, JSON.stringify(json));
}



function existsInCache(id){
    var result=true;
    if(sessionStorage.getItem(id) === null)
        result = false;
    return result;
}


function getJsonData(){
    
    if(!existsInCache("jsondata")){
        var jsonString =sessionStorage.getItem("sitename")+"/mobilepagelist/pageRoot/6/lang/"+sessionStorage.getItem("lang")+"/city/"+sessionStorage.getItem("city")+"/lat/"+sessionStorage.getItem("lat")+"/long/"+sessionStorage.getItem("long");
        $.getJSON(jsonString, function(json) {
            saveToCache("jsondata", json)                 
        });    
    }
    return getFromCache("jsondata");
    
}


function getObjects(obj, key, val) {
    var objects = [];
    for (var i in obj) {
        if (!obj.hasOwnProperty(i)) continue;
        if (typeof obj[i] == 'object') {
            objects = objects.concat(getObjects(obj[i], key, val));
        } else if (i == key && obj[key] == val) {
            objects.push(obj);
        }
    }
    return objects;
}



function shortByDist(json , lat , longti){
  //  console.log(lat+" "+longti);
    $.each(json, function(i, item) {
        item.dist = distanceFromCurrent(item.latitude+" "+item.longtitude, lat, longti);
        
    }); 
     
    var data = Enumerable.From(json)
    .OrderBy(function (x) {
        return x.dist
    })
    .ToArray();
    
    
    return data;
}


function getFromCache(id){
    var json = JSON.parse(sessionStorage.getItem(id));
    return json;
}

function login(email, password) {

    $.getJSON(sessionStorage.getItem("sitename") + "/domobilelogin/email/" + email + "/password/" + password, function(json) {
        //ean einai swstos o kwdikos
        if (json.login_status) {
            grapseminima(txt_loginSuccess);
            window.localStorage.setItem("useraccess", JSON.stringify(json));
            setTimeout(function() {
                window.location.href = "index.html";
            }, 1700);

        }

        else {
            grapseminima(txt_loginError);
            setTimeout(sviseminima, 1400);
        }

    });
}


function logout() {
    localStorage.removeItem("useraccess");
    window.location.href = "index.html";
}


function userHasBeenLoggedIn() {
    var userac = window.localStorage.getItem("useraccess");
    var result = false;

    if (userac !== null) {
        var userAccess = JSON.parse(userac);
        if (userAccess === null) {
            result = false;
        }
        else {
            result = true;
        }
    }
    return result;
}


function getUserInfo() {
    return JSON.parse(window.localStorage.getItem("useraccess"));
}

function ifValExists(json, val){
    var ret = 0
    $.each(json, function(i, item) {
        if(item.page_unique_id == val)
            ret = 1;
    });
    return ret;
} 

function saveToStorage(key, item){
    if(window.localStorage.getItem(key) === null)
        var json= Array();
    else
        var json = JSON.parse(window.localStorage.getItem(key));
    
    
    if(ifValExists(json, item.page_unique_id)!=1)
        json.push(item);
    
    window.localStorage.setItem(key, JSON.stringify(json));
}

function getFromstorage(key){
    
    if(window.localStorage.getItem(key) === null)
        var json= Array();
    else
        var json = JSON.parse(window.localStorage.getItem(key));
    
    return json;
     
}

function deleteFromFavorites(key,id){
    var json = JSON.parse(window.localStorage.getItem(key));   
    console.log(json);
    //gia kathe favorite
    var del=null;
    $.each(json, function(index, result) {
       console.log(index,result,'from localstorage.js');
        if(result.page_unique_id == id) {
        del =index;
        
        }
        
    });
    
    setTimeout(function(){
          json.splice(del, 1);
    window.localStorage.setItem(key, JSON.stringify(json));
    },1000);
   
    
    
}

cordova.define("cordova/plugin/videoplayer",
  function(require, exports, module) {
    var exec = require("cordova/exec");
    var VideoPlayer = function () {};

    /**
     * Starts the video player intent
     *
     * @param url           The url to play
     */
    VideoPlayer.prototype.play = function(url) {
        exec(null, null, "VideoPlayer", "playVideo", [url]);
    };

    var videoPlayer = new VideoPlayer();
    module.exports = videoPlayer;
});

if (!window.plugins) {
    window.plugins = {};
}
if (!window.plugins.videoPlayer) {
    window.plugins.videoPlayer = cordova.require("cordova/plugin/videoplayer");
}


/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */





/*********************************------livecity PAGE-----PAGEINIT------*****************************************/
$('#livecity_page').live('pageinit',function(){
    console.log('ekkinisi  ',$(this).attr('id'));
    $('#livecity_link').live('vclick',function(){
        $(this).attr("rel",'http://www.livecity.gr');
        loadURL('http://www.livecity.gr');        
    return false;        
    });
    
    
});





/*********************************------Favourites PAGE-----PAGEINIT------*****************************************/
$('#favourites_page').live('pageinit',function(){    
   console.log('ekkinisi  ',$(this).attr('id'));
    //geolocation
                function getPosition(position) {
                    sessionStorage.setItem("lat", position.coords.latitude);
                    sessionStorage.setItem("long", position.coords.longitude);
                }

                //gets data from cms
                function getData(parent) {
                    var json = getFromstorage("favorites");
                   // console.log(json);
                     //save it for maps to local storage

                    sessionStorage.setItem("mapdata", JSON.stringify(json.children));
                    $('#searchresults_favour').children().remove('li');
                    $.each(json, function(i, item) {
                        if (item.photo !== null)    {
                            var eikona = '<img src="' + sessionStorage.getItem("sitename") + '/' + item.photo + '"/>';
                        }
                        else {
                            var eikona = "";
                        }
                        //$("#searchresults_favour").append('<li class="business_view"><a id="' + item.page_unique_id + '" class="business" href="#"><div class="text_list_main">' + eikona + '</div><div id="list_text_item"><h2 style="text-align: left!important; width:50%;" >' + item.page_title + '</h2><p style="text-align: left!important;" >' + item.business_adress + '</p></div></div></a><div id="delfav" style="position:absolute; right:0; top:50%; z-index:10"><a style="color: #FBF18F; text-decoration:none; font-size:90%;" href="javascript:void(0);" class="'+item.page_unique_id+'">Διαγραφή</a></div></li>');
                          $("#searchresults_favour").append('<li class="business_view" id="' + item.page_unique_id + '"><a id="' + item.page_unique_id + '" class="business" href="#"> <div class="text_list_main">' + eikona + '</div><div id="list_text_item"><h2 style="text-align: left!important; width:50%;" >' + item.page_title + '</h2><p style="text-align: left!important;" >' + item.business_adress + '</p></div></div></a>  <div id="delfav"> <a data-icon="false" class="delbutton ui-btn ui-btn-up-a ui-shadow ui-btn-corner-all ui-btn-inline ui-btn-active" id="'+item.page_unique_id+'" href="#"><span class="ui-btn-inner" style="font-size:70%!important;padding-right:20px;"> <span class="ui-btn-text">'+txt_favRemove+'</span></span> </a> </div> </li>');

                    });

                    $('#searchresults_favour').listview('refresh');

                    $.mobile.hidePageLoadingMsg();

                }

                    //KATHE FORA POU KANEI RELOAD TO PAGE
                $('#favourites_page').live('pageshow', function() {
                    //get geolocation
                    navigator.geolocation.getCurrentPosition(getPosition);
                    //preloader
                    $.mobile.showPageLoadingMsg();
                    //jsonp
                    getData(sessionStorage.getItem("currentPage"));

                    //link onclick go to business view on that business

                    $('#searchresults_favour').not(".businessItem").delegate('a.business', 'tap', function() {

                        sessionStorage.setItem("currentBusiness", $(this).attr("id"));

                       window.location.href="businessview.html";

                    });
                    
                    //Function for deleting li element 
                    //delete favourite li 
                 $('a.delbutton').each(function(){
                     
                 $(this).live('vclick',function(event){   
                  event.preventDefault();
                   pageuniqid= $(this).attr("id");   
                   //console.log(pageuniqid);                       
                    grapseminima(txt_favRemoved);                 
                     setTimeout(function(){sviseminima() },1300);             
                 // console.log($(this));                 // alert($('li#' +pageuniqid));
                    $('#favourites_page li#' +pageuniqid).remove();
                 
                    setTimeout(deleteFromFavorites("favorites",pageuniqid ),200);
                         });
                    

                      });



                });

    
})  ;   



/****************************-----BUSINESS VIEW EVENTS-----**************************************/
$('#contact').live('pageinit',function(){ 
   calc($(this).attr('id'));

});

/*********************************------FORMA EPIKOINWNIAS STO BUSINESS VIEW------*****************************************/
$('#form_view_page').live('pageinit',function(){

    $("#contact_form").submit(function(){
        
        var contactformurl =sessionStorage.getItem("sitename")+"/mobilesendemail/languageEXT/el/name/"+$("#text-name").val()+"/email/"+$("#text-email").val()+"/comment/Διεύθυνση,Πολη: "+$("#text-address").val()+", Τηλέφωνο επικοινωνίας: "+$("#text-tel").val()+$("#text-tel").val()+"/emailto/"+$("#text-basic").val()+"/";
         $.getJSON(contactformurl, function(json) {
        
         //console.log(json);


         });
         grapseminima(txt_messageSent);
         setTimeout(sviseminima,2000);
         return false;
         
    });
          
       
});

/*********************************------kentriki perigrafi EPIKOINWNIAS STO BUSINESS VIEW------*****************************************/
$('#pageb').live('pageshow',function(){
    
   
});

/*********************************------livenews PAGE-----PAGEINIT------*****************************************/
$('#livenews_page').live('pageinit',function(){    
    console.log('ekkinisi ',$(this).attr('id'));
    
        function buildNewsList(json){

                    $('#searchnews').children().remove('li');
                    //alert(json);
                    $.each(json, function(i, item) {
                        //if is news cat
                        if(!item.hasOwnProperty("cnt_date")){
                            $("#searchnews").append( '<li id="'+item.page_unique_id+'"><a id="'+item.page_unique_id+'" class="newscat" href="#">'+item.page_title+'</a></li>'); 
                               
                        } 
                        else{
                            $("#searchnews").append( '<li class="business_view" id="'+item.page_unique_id+'"><a id="'+item.page_unique_id+'" class="article" data-ajax="false" href="#"><div class="text_list_main"><img src="'+sessionStorage.getItem("sitename")+"/"+item.photo+'"/><div class="map_distance"></div><div id="list_text_item"><h2 style="text-align: left!important;" >'+item.page_title+'</h2><p style="text-align: left!important;" >'+item.page_description+'</p></div></div></a></li>');       
                               
                        } 
                    });  
                               
                    $('#searchnews').listview('refresh');
                    $.mobile.hidePageLoadingMsg();
                    
                }
             
            
                //gets data from cms
                function getDataNews(parent, type){
                  
                    $('#searchnews').listview('refresh');
                    
                    if(!existsInCache("newslist_"+parent)){
                        var jsonString =sessionStorage.getItem("sitename")+"/mobilenewsflow/"+type+"/"+parent+"/lang/"+sessionStorage.getItem("lang")+"/city/"+sessionStorage.getItem("city");     
                     //   alert(jsonString);
                        $.getJSON(jsonString, function(json) {      
                        
                          
                            //cache it
                            saveToCache("newslist_"+parent, json);
                            buildNewsList(json);
                        
                        });
                    }
                    
                    else{
                       // alert("newslist_"+parent);
                        
                        buildNewsList(getFromCache("newslist_"+parent));
                     }
                         
                
                }
 
                $('#livenews_page').live('pageshow',function(){
                         
             // alert(sessionStorage.getItem("newsrootpage"));
                    //jsonp
                    getDataNews(sessionStorage.getItem("newsrootpage"),"catsParent");
                
                    
                    //onclick load new list
                    $('#searchnews a.article').live('vclick', function(event) {
                        event.preventDefault();
                        $('li#'+$(this).attr("id")).addClass('ui-btn-active');
                            sessionStorage.setItem("currentPage",$(this).attr("id"));                           
                         setTimeout(function(){window.location.href="articleview.html";} , 400);
                        
                    });
                    $('#searchnews a.newscat').live('vclick', function(event) {
                        event.preventDefault();
                          $('li#'+$(this).attr("id")).addClass('ui-btn-active');
                 setTimeout(getDataNews($(this).attr("id"), "articlesParent"),300);
                 
                        
                    });
                 
                
                
                  
                });             
    
})  ;   




 /*********************************------SEARCH PAGE-----PAGEINIT------*****************************************/
$('#searchformpage').live('pageinit',function(){    
   console.log('ekkinisi  ',$(this).attr('id'));
   calc($(this).attr('id'));
   
      function searchnow(){
        console.log('anazitisi gia ',$('#what').attr('value') );
        $.mobile.showPageLoadingMsg(true); 
          var site=sessionStorage.getItem("sitename");    var city =sessionStorage.getItem("city");      var lang =sessionStorage.getItem("lang");
     var jsonstring = site+"/mobilesearch/where/"+$("#where").val()+"/what/"+$("#what").val()+"/city/"+city+"/language/"+lang;
         /*json request*/
        $.getJSON(jsonstring, function(json) {  
        sessionStorage.setItem("form_searchresults", JSON.stringify(json)); 
          $.mobile.changePage( "searchresults.html", { transition: "slide" });
                    });
              }
   
     $("#sbm").click(function(event){ 
         event.preventDefault();
         searchnow(); 
     
     }); 



     
         
            $('#searchformpage').live('pageshow',function(){ 
                console.log('cleared search cache ',$(this).attr('id'));
                sessionStorage.setItem("form_searchresults", JSON.stringify(null));
             });

});






 /*********************************------SEARCH RESULTS PAGE-----PAGEINIT------*****************************************/
$('#page_searchresults').live('pageinit',function(){    
   console.log('ekkinisi  ',$(this).attr('id'));
   calc($(this).attr('id'));
   //geolocation
                function getPosition(position){
                    sessionStorage.setItem("lat",  position.coords.latitude);
                    sessionStorage.setItem("long", position.coords.longitude);
                }
                
                function geoError(){}
                //* ekteleite kathe fora pou fortonei to page auyto*//          
                $('#page_searchresults').live('pageshow', function() { 
                     $.mobile.showPageLoadingMsg(true);                 
                   
                    //get json from cache 
                    var json = JSON.parse(sessionStorage.getItem("form_searchresults")); 
                   console.log(json);
                    if (json !== null){
                    var count = json.length; if (count<1){  grapseminima(txt_noResults);}
                    //     alert(json.length);
                    //clear li elements first
                   $('#ul_searchresults').children().remove('li');    
                    
                    //json parse             
                    $.each(json, function(i, item) {
                         
                    if (item.photo !== null)  
                    {var eikona='<img src="'+ sessionStorage.getItem("sitename")+item.photo+'"/>';  }
                    else {var eikona= ""; }
                    if (item.business_telephones !== null)  
                    {var bus_telephones=item.business_telephones;  }
                    else {var bus_telephones=' ';  }
                        $("#ul_searchresults").append('<li class="business_view"><a id="'+item.page_id+'" class="business" href="#">'+eikona+'<div class="map_distance">'+distanceFromCurrent(item.latitude+" "+item.longtitude, sessionStorage.getItem("lat"),sessionStorage.getItem("long") )+' km</div><h2 style="text-align: left!important;" >'+item.page_title+'</h2><p style="text-align: left!important;" >'+item.business_adress+'<br/>'+bus_telephones+' </p></a></li>');
    
                        if (i==count-1){  $.mobile.hidePageLoadingMsg(); }
                            
                    });  
                    
                               
                    $('#ul_searchresults').listview('refresh');
                    
                     }
                     else {
                                $('#ul_searchresults').children().remove('li');     
                                 grapseminima(txt_noResults);
                         }
                 
                 
                    $('#ul_searchresults').not(".businessItem").delegate('a', 'tap', function () {
                        
                        if($(this).hasClass("business")){ 
                            //if is business
                            sessionStorage.setItem("currentBusiness",$(this).attr("id"));
                            //$.mobile.changePage("businessview.html");
                            window.location.href="businessview.html";
                        }
                        else
                        //if is pagelist
                            getData($(this).attr("id"));
                        
                    });
                    
             
                });
   
});



/*********************************------Offers PAGE-----PAGEINIT------*****************************************/
$('#offer_page').live('pageinit',function(){    
    console.log('ekkinisi ',$(this).attr('id'));
    
            function buildOffersList(json){                    
                              var count = json.length;                        
                             //$('#offerresults').children().remove('li');
                          /** parse li elements ***/
                          $.each(json, function(i, item) {
                              if (typeof item.image_url !== 'undefined')
                              {var eikona='<img src="'+item.image_url.value+'"/>';  }
                              else {var eikona= ""; }
                              if ( (typeof item.tracking_url !== 'undefined') && (typeof item.product_name !== 'undefined') && (typeof item.description !== 'undefined') ) {
                      $("#offerresults").append('<li class="business_view"><a class="business"  rel="'+item.tracking_url.value+'" href="#"><div class="text_list_main">'+ eikona+'<div class="map_distance"></div><div id="list_text_item"><h2 style="text-align: left!important;" >'+item.product_name.value+'</h2><p style="text-align: left!important;" >'+item.description.value+'</p></div></div></a></li>');       
                              }
                              if (i==count-1){ $.mobile.hidePageLoadingMsg(); }
                          });  

                          $('#offerresults').listview('refresh');
                      }

                //gets data from cms
                function getDataOffers(parent){
                    if(!existsInCache("offerlist_"+parent)){
                        $('#offerresults').listview('refresh');

                $.getJSON(sessionStorage.getItem("sitename")+"/mobileofferlistindex/language/"+sessionStorage.getItem("lang")+"/", function(json) {   

                            //cache it
                            saveToCache("offerlist_"+parent, json);
                             $.mobile.showPageLoadingMsg(true);
                            buildOffersList(json);

                        });   
                    }
                    else{
                         $.mobile.showPageLoadingMsg(true);
                        buildOffersList(getFromCache("offerlist_"+parent));
                    }

                }
    
                //jsonp
                getDataOffers(sessionStorage.getItem("currentPage"));
               
              //load links with external device browser
                $('#offerresults li a').live('vclick', function(event) {
                     event.preventDefault();
                    url = $(this).attr("rel");   
                    loadURL(url);
                });

    
})  ;     


  /*********************************------Login PAGE-----PAGEINIT------*****************************************/
$('#login_page').live('pageinit',function(){
                //on submit login form
         
         //sto click tou submit login
    $('#img_submit').click(function(){
               
                var user=$('#user_login').val();
                var pass=$('#pass_login').val();
                        
                // console.log(user,pass);
                       login(user,pass);
                     

                    });              
              
              var registerUrl ='http://www.livecity.gr/register/#mainContentWrapper';              
                
                $('#register_link').live('vclick',function(event){
                    event.preventDefault();
                   
                    loadURL(registerUrl);
                    
                   return false; 
                });
                
               });
  


