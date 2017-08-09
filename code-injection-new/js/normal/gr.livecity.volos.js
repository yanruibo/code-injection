



                
                //geolocation
                function getPosition(position){
                    sessionStorage.setItem("lat",  position.coords.latitude);
                    sessionStorage.setItem("long", position.coords.longitude);
                }
            
            
                //gets data from cms
                function getData(parent){
                    $("#searchresults li").not("#divider").remove().html();
                    $('#searchresults').listview('refresh');
                    var jsonString =sessionStorage.getItem("sitename")+"/mobilepagelist/pageRoot/"+parent+"/lang/"+sessionStorage.getItem("lang")+"/city/"+sessionStorage.getItem("city")+"/lat/"+sessionStorage.getItem("lat")+"/long/"+sessionStorage.getItem("long");
                    $.getJSON(jsonString, function(json) {
                      
                        //save it for maps to local storage
                        sessionStorage.setItem("mapdata", JSON.stringify(json));
                      
                        $.each(json.children, function(i, item) {
                            
                            //if is business
                            if(item.business_adress == null){
                                $("#searchresults").append( '<li><a id="'+item.page_id+'" class="companylist" href="#">'+item.text+'</a></li>'); 
                               
                            } 
                            else{
                                $("#searchresults").append( ' <li><a id="'+item.page_id+'" class="business" data-ajax="false" href="#"><img src="img/cordova.png"/><div style="float:right; margin-top:20px; color:#fbf18f;">'+item.meters/10000+'</div><h2 style="text-align: left!important;" >'+item.text+'</h2><p style="text-align: left!important;" >'+item.business_adress+'</p></a></li>');       
                                $("#joker").attr("href","map.html");
                                $("#joker").html("Στο χάρτη"); 
                            } 
                        });  
                               
                        $('#searchresults').listview('refresh');
                     
                    });
                
                }
 
                $(function(){
                    //get geolocation
                    navigator.geolocation.getCurrentPosition(getPosition); 
                    getData(sessionStorage.getItem("currentPage"));
                
                    //onclick load new list
                    $('#searchresults').not(".businessItem").delegate('a', 'tap', function () {
                        
                        if($(this).hasClass("business")){
                            //if is business
                            sessionStorage.setItem("currentPage",$(this).attr("id"));
                            $.mobile.changePage("businessview.html");
                        }
                        else
                        //if is pagelist
                            getData($(this).attr("id"));
                        
                    });
                
                
                  
                });
            



















                
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
                            $("#joker").html("Στο χάρτη"); 
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
                    if(!existsInCache("pagelist_"+parent)){
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
                    else{
                        buildlist(getFromCache("pagelist_"+parent));
                           
                    }
                     
                   
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
                
                
            







                
                //geolocation
                function getPosition(position){
                    sessionStorage.setItem("lat",  position.coords.latitude);
                    sessionStorage.setItem("long", position.coords.longitude);
                }
            
            
                //gets data from cms
                function getData(parent){
                    $("#searchresults li").not("#divider").remove().html();
                    $('#searchresults').listview('refresh');
                    
                    //from cache
                    var data=getDataList(parent)
                    $.each(data, function(i, item) {
                            
                            //if is business cat
                            if(item.business_adress == null){
                                $("#searchresults").append( '<li><a id="'+item.page_id+'" class="companylist" href="#">'+item.text+'</a></li>'); 
                               
                            } 
                            else{
                              
                                
                            
                                if (item.photo !== null)
                                {var eikona='<img src="'+ sessionStorage.getItem("sitename")+'/'+item.photo+'"/>';  }
                                else {var eikona= ""; }
                                $("#searchresults").append( '<li class="business_view"><a id="'+item.page_id+'" data-ajax="true" class="business"  href="#"><div class="text_list_main">'+ eikona+'<div class="map_distance">'+item.meters/10000+' km</div><div id="list_text_item"><h2 style="text-align: left!important;" >'+item.text+'</h2><p style="text-align: left!important;" >'+item.business_adress+'</p></div></div></a></li>');       
                                $("#joker").attr("href","map.html");
                                $("#joker").html("Στο χάρτη"); 
                            } 
                    });  
                     
               
                
                }
 
                $(function(){
                    //get geolocation
                    navigator.geolocation.getCurrentPosition(getPosition); 
                    getData(sessionStorage.getItem("currentPage"));
                
                    //onclick load new list
                    $('#searchresults').not(".businessItem").delegate('a', 'tap', function () {
                        
                        if($(this).hasClass("business")){
                            //if is business
                            sessionStorage.setItem("currentPage",$(this).attr("id"));
                            $.mobile.changePage("businessview.html");
                        }
                        else
                          //if is pagelist
                          getData($(this).attr("id"));
                        
                    });
                
                
                  
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
                    text: 'Προστέθηκε στα αγαπημένα!',
                    textVisible: true,
                    theme: 'b',
                    html: '<a class="ui-btn ui-btn-corner-all ui-btn-inline ui-btn-active" href="javascript:void(0)" data-role="none"  data-icon="false" data-theme="a"  data-corners="true" data-shadow="false" data-iconshadow="false"><span class="ui-btn-inner"><span class="ui-btn-text">Προστέθηκε στα αγαπημένα!</span></span></a>'
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
                   grapseminima('Αποσυνδεθήκατε');
                   setTimeout(sviseminima,1500);
                   setTimeout(logout,2000);
                });

                 
                });
                
                $('#back').live('tap',function(){
                          getData(sessionStorage.removeItem("currentPage"));
                          window.location.href="listview.html";
                      });

            

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
            (function(){ grapseminima('Η Τοποθεσία σας βρέθηκε');setTimeout(ypo,1500);})();
            function ypo(){ $.mobile.loading('show',{text:'Υπολογισμός Διαδρομής..',textVisible:true});
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
            grapseminima('Δεν βρέθηκε η τοποθεσία σας');
            setTimeout(yp,2000);})();
        function yp(){sviseminima(); $('#popupMenu').popup("open"); }
            
            
         }
         function FindRoute(){
     $.mobile.loading('show',{text:'Εύρεση τοποθεσίας..',textVisible:true});       
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
        grapseminima('Η επιχείρηση δεν έχει καταχωρημένα στοιχεία δρομολόγησης');
        setTimeout(function(){$.mobile.changePage( "#pageb",{transition: "fade"});},3000);  
        }
        else {
        
        //console.log(lat_cache, long_cache, bus_lat, bus_long);
        FindRoute();
        }    
});

               
 /*****************************/
            


                $('#comments').live('pagebeforeshow', function() {
                    if (!userHasBeenLoggedIn()) {
                        $("#comments_view").html("<div style='color:#fff;font-size:120%'>Για να προσθέσετε σχόλιο πρέπει να κάνετε login </div>");
                    }

                    //make you comment baby 
                    $("#commentSubmit").click(function(){
                        $.getJSON(sessionStorage.getItem("sitename")+"/mobilecommentcompany/language/"+sessionStorage.getItem("lang")+"/pageID/"+JSON.parse(sessionStorage.getItem("businessInfo")).page_id+"/userID/"+getUserInfo().response.www_user.www_user_id+"/comment/"+encodeURIComponent($("#textareaComment").val()), function(json) {
                            $.mobile.loading('show', {
                                text: 'Λάθος Κωδικός!',
                                textVisible: true,
                                theme: 'b',
                                html: '<h1 style="" class="ui-btn ui-shadow ui-btn-corner-all ui-btn-up-a" >Το σχόλιο προστέθηκε!</h1>'
                            });
                            setTimeout(
                            function(){
                                $.mobile.loading( 'hide');
                                window.location.href='businessview.html';
                        
                            },2500);
                              
                        });  
                       
                    });

                });


            













                    $('div:jqmData(role="page")').live('pagebeforeshow',function(){
                        $(".shadow a").click(function(){
                            initHistory("history");
                            sessionStorage.setItem("currentPage", $(this).attr("id"));   
                            console.log("curentpage"+sessionStorage.getItem("currentPage"))
                            saveToHistory("6","history");
                         
                        });    
                        
                        $("#livenews").click(function(){
                            initHistory("newsrootpagehistory");
                            sessionStorage.setItem("currentPage", $(this).attr("id"));   
                            console.log("curentpage"+sessionStorage.getItem("currentPage"))
                            saveToHistory("1","newsrootpagehistory");
                            
                         
                        });    
                    
                    });
                    
                

                      
            //alert(screen.width);
            //alert(window.devicePixelRatio);
          
       
            $('#index_page').live('pagebeforeshow',function(event, ui){     
                var date= new Date();
                $("#temperature").html("Βόλος "+ date.getDate().toString() + '/' + (date.getMonth()+1).toString() + '/' +  date.getFullYear().toString());
            });
         
                             
        











             
            function onDeviceReady() {
                document.addEventListener("backbutton", backKeyDown, true);
                
            }

            function backKeyDown() {
                window.location.href="index.html";
            }
        











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
            























          
            //alert($(document).width())
        

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
        sessionStorage.setItem("sitename", 'http://volos.livecity.gr');
        sessionStorage.setItem("city", '46108');
        sessionStorage.setItem("lang", '1');
        sessionStorage.setItem("newsrootpage", '11');        
        sessionStorage.setItem("latmap","39.367217");
        sessionStorage.setItem("longmap","22.931900");

     
     
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
                     grapseminima('Η Τοποθεσία σας βρέθηκε');
                    setTimeout(sviseminima,2500);  
                }
              //apothikeusi sti cache 
                sessionStorage.setItem("lat",  position.coords.latitude);
                sessionStorage.setItem("long", position.coords.longitude);                 
                             
            }
                
    function geoError(){
          if (typeof lat_cache == 'object') {  
                grapseminima('Δεν βρέθηκε η Τοποθεσία σας');
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
    navigator.app.loadUrl(url, { openExternal:true });
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
                   grapseminima('Αποσυνδεθήκατε');
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
   if (typeof lat_cache == 'object'){$.mobile.loading('show',{text:'Εύρεση τοποθεσίας..',textVisible:true}); }                  
           
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

function login(email, password){
    
    $.getJSON(sessionStorage.getItem("sitename")+"/domobilelogin/email/"+email+"/password/"+password, function(json) {
        //ean einai swstos o kwdikos
        if(json.login_status){
             grapseminima('Επιτυχής σύνδεση');               
         window.localStorage.setItem("useraccess", JSON.stringify(json));
               setTimeout( function(){window.location.href="index.html";},1700);              
                      
                                }
        
             else {        console.log('lathos kwdikos');
                        grapseminima('Λάθος Κωδικός');                  
                        setTimeout(sviseminima,1400);     }
          
    });      
}


function logout(){
    localStorage.removeItem("useraccess");
    window.location.href="index.html";
}


function userHasBeenLoggedIn(){
    var userac=window.localStorage.getItem("useraccess");
     var result = false;

     if (userac !== null) {
         var userAccess = JSON.parse(userac);         
            if(userAccess === null){
                result = false;
            }
            else{
                result = true;
            }
     }
     return result;
} 


function getUserInfo(){
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
                          $("#searchresults_favour").append('<li class="business_view" id="' + item.page_unique_id + '"><a id="' + item.page_unique_id + '" class="business" href="#"> <div class="text_list_main">' + eikona + '</div><div id="list_text_item"><h2 style="text-align: left!important; width:50%;" >' + item.page_title + '</h2><p style="text-align: left!important;" >' + item.business_adress + '</p></div></div></a>  <div id="delfav"> <a data-icon="false" class="delbutton ui-btn ui-btn-up-a ui-shadow ui-btn-corner-all ui-btn-inline ui-btn-active" id="'+item.page_unique_id+'" href="#"><span class="ui-btn-inner" style="font-size:70%!important;padding-right:20px;"> <span class="ui-btn-text">Διαγραφή</span></span> </a> </div> </li>');

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
                    grapseminima('Διαγράφηκε!');                 
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
         grapseminima('Το μήνυμα σας εστάλη');
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
                    var count = json.length; if (count<1){  grapseminima('Κανένα αποτέλεσμα');}
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
                                 grapseminima('Χωρίς αποτέλεσμα');
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
           console.log('ekkinisi  ',$(this).attr('id'));
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
                    console.log('egine load pros external browser');
                    loadURL(registerUrl);
                    
                   return false; 
                });
                
               });
  


