





    // set overrides before we load jquery mobile
    $(document).bind("mobileinit", function(){
        $.mobile.defaultPageTransition = 'slide';
        $.mobile.allowCrossDomainPages = true;
        $.support.cors = true;
    });
    




            google.load("feeds", "1");
            function initialize() {
              var feed = new google.feeds.Feed("http://blogs.cofc.edu/news/feed/");
              feed.setNumEntries(10);
              feed.load(function(result) {
                
                if (!result.error) {
                    var container = document.getElementById("news-feed");
                    var news_detail = [];
                    for (var i = 0; i < result.feed.entries.length; i++) {
                      var entry = result.feed.entries[i];

                        var m_names = new Array("January", "February", "March", 
                        "April", "May", "June", "July", "August", "September", 
                        "October", "November", "December");

                        var d = new Date(entry.publishedDate);
                                            var curr_date = d.getDate();
                        var curr_month = d.getMonth();
                        var curr_year = d.getFullYear();
                        var pubdate = m_names[curr_month] + " " + curr_date + ", " + curr_year;
                        
                        news_detail.push(entry.content);

                      $('#news-feed').append("<li><a href='javascript:void(0)' onclick=\"window.plugins.childBrowser.showWebPage(\'"+entry.link+"\',{ showAddress: false }); return false;\" data-news-item='"+i+"'>"+ entry.title + "</a>" + '<p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' + pubdate + '</p></li>');

                
                    }
                }
              });
            
            }
            google.setOnLoadCallback(initialize);
            $('#news-feed').listview('refresh');
        
        



            google.load("feeds", "1");
            function initialize() {
              var feed = new google.feeds.Feed("http://www.cofcsports.com/rss.dbml?db_oem_id=14800&amp;media=news");
              feed.setNumEntries(10);
              feed.load(function(result) {
                
                if (!result.error) {
                    var container = document.getElementById("athletics-feed");
                    var news_detail = [];
                    for (var i = 0; i < result.feed.entries.length; i++) {
                      var entry = result.feed.entries[i];

                        var m_names = new Array("January", "February", "March", 
                        "April", "May", "June", "July", "August", "September", 
                        "October", "November", "December");

                        var d = new Date(entry.publishedDate);
               
                        var curr_date = d.getDate();
                        var curr_month = d.getMonth();
                        var curr_year = d.getFullYear();
                        var pubdate = m_names[curr_month] + " " + curr_date + ", " + curr_year;
                         news_detail.push(entry.content);

                      //$('#athletics-feed').append("<li><a href='"+entry.link+"' data-news-item='"+i+"'>"+ entry.title + "</a>" + '<p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' + pubdate + '</p></li>');
                      $('#athletics-feed').append("<li><a href='javascript:void(0)' onclick=\"window.plugins.childBrowser.showWebPage(\'"+entry.link+"\',{ showAddress: false }); return false;\" data-news-item='"+i+"'>"+ entry.title + "</a>" + '<p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' + pubdate + '</p></li>');

                    }
                        //         $("#athletics-feed a").on("click", function(event){
                       
                        //     var news_item = $(this).attr('data-news-item');
                    
                        //     $("#news-detail-content").html(news_detail[news_item]);
                        //     $.mobile.changePage($("#news-detail"));
                        //     return false;

              
                        // });
                }
              });
            
            }
            google.setOnLoadCallback(initialize);
            $('#athletics-feed').listview('refresh');
 
        


    $.ajaxSetup({
    // Disable caching of AJAX responses
    cache: false
    });
    
    function openExternalLink(url) { 
      if (device.platform.match(/Android/)) { 
        navigator.app.loadUrl(url, { openExternal:true }); 
      } else { 
        window.plugins.childBrowser.showWebPage(url,{ showAddress: false });; 
      } 
    } 


    // App URL Logic
    var api_url = 'https://mobileapps.battery.cofc.edu/mobileserver-1.3.0.275/rest/';

    var u = '';
    var p = '';
    localStorage.setItem("userInfo", false);
    localStorage.setItem("is_loggedin", false);

    $('#maps-link').on('click', function() { 
        openExternalLink('http://prosper.cofc.edu/~mobile/maps/');
        // window.plugins.childBrowser.showWebPage('http://prosper.cofc.edu/~mobile/maps/',{ showAddress: false });
        return false; 
    });

    $('#twitter-link').on('click', function() { 
        openExternalLink('http://www.twitter.com/cofc');
        //navigator.app.loadUrl('http://www.twitter.com/cofc', { openExternal:true } );
        //window.plugins.childBrowser.showWebPage('http://www.twitter.com/cofc',{ showAddress: false });
        return false; 
    });

    $('#facebook-link').on('click', function() { 
        openExternalLink('https://www.facebook.com/collegeofcharleston');
        // window.plugins.childBrowser.showWebPage('https://www.facebook.com/collegeofcharleston',{ showAddress: false });
        return false; 
    });

    $('#calendar-link').on('click', function() { 
        openExternalLink('http://calendar.cofc.edu');
        //window.plugins.childBrowser.showWebPage('http://calendar.cofc.edu',{ showAddress: false });
        return false; 
    });

    $('#community-link').on('click', function() { 
        openExternalLink('http://community.cofc.edu');
        //window.plugins.childBrowser.showWebPage('http://community.cofc.edu',{ showAddress: false });
        return false; 
    });

    $('#library-link').on('click', function() { 
        openExternalLink('http://mcat.library.cofc.edu');
        //window.plugins.childBrowser.showWebPage('http://mcat.library.cofc.edu',{ showAddress: false });
        return false; 
    });

    $('#orgsync-link').on('click', function() { 
        openExternalLink('https://orgsync.com/login/college-of-charleston/');
        //window.plugins.childBrowser.showWebPage('https://orgsync.com/login/college-of-charleston/',{ showAddress: false });
        return false; 
    });

    $('#laundryview-link').on('click', function() { 
        openExternalLink('http://m.laundryview.com/lvs.php?s=205');
        //navigator.app.loadUrl('http://m.laundryview.com/lvs.php?s=205', { openExternal:true } );
        //window.plugins.childBrowser.showWebPage('http://m.laundryview.com/lvs.php?s=205',{ showAddress: false });
        return false; 
    });

    $('#oaks-link').on('click', function() { 
        openExternalLink('https://lms.cofc.edu');
        //window.plugins.childBrowser.showWebPage('https://lms.cofc.edu',{ showAddress: false });
        return false; 
    });

    $('#explorance-link').on('click', function() { 
        openExternalLink('https://coursereview.cofc.edu/');
    	//navigator.app.loadUrl('https://coursereview.cofc.edu/', { openExternal:true } );
        //window.plugins.childBrowser.showWebPage('https://coursereview.cofc.edu/',{ showAddress: false });
        return false; 
    });

    $('#webcams-link').on('click', function() { 
    	navigator.app.loadUrl('http://prosper.cofc.edu/~mobile/webcams/', { openExternal:true } );
        //window.plugins.childBrowser.showWebPage('http://prosper.cofc.edu/~mobile/webcams/',{ showAddress: false });
        return false; 
    });

    $(document).on("pagechange",function() {
        var logged_in = localStorage.getItem("is_loggedin");
        if(logged_in == 'true'){
            $(".login-status .ui-btn-text").text('Logout');
            $(".login-status .ui-icon").removeClass('ui-icon-check');
            $(".login-status .ui-icon").addClass('ui-icon-delete');
            $(".login-status").prop('href','#logout');
        }else{
            $(".login-status .ui-btn-text").text('Login');
            $(".login-status .ui-icon").removeClass('ui-icon-delete');
            $(".login-status .ui-icon").addClass('ui-icon-check');
            $(".login-status").prop('href','#login');
            $("#username").val('');
            $("#password").val('');
            localStorage.setItem("is_loggedin", false);
        }
    });


    //
    // Logout Page Logic
    //
    $(document).on("pageinit","#logout" ,function() {
        var u = '';
        var p = '';
        localStorage.setItem("userInfo", false);
        localStorage.setItem("is_loggedin", false);
    });

    //
    // Login Page Logic
    //
    $(document).on("pageshow","#login",function() {
        $("#login-falied-alert").hide();
    });
    $(document).on("pageinit","#login" ,function() {
        $("#login-falied-alert").hide();

        $("#loginForm").on("submit",function(e) {

        u = $("#username", this).val();
        p = $("#password", this).val();
        //console.log(api_url+'security/getUserInfo');
        if(u != '' && p!= '') {
            
            $.ajax( {
                url : api_url+'security/getUserInfo',
                dataType : 'html',
                timeout: 5000,
                beforeSend : function(xhr) {
                      var bytes = u+ ":" + p;
                      var base64 = window.btoa(bytes);
                      xhr.setRequestHeader("Authorization", "Basic " + base64);
                      xhr.setRequestHeader("cache-control", "no-cache");
                      $.mobile.loading( 'show' );

                },
                complete : function() {$.mobile.loading( 'hide' );},
                error : function(xhr, ajaxOptions, thrownError) {
                    // console.log('login error');
                    //console.log(xhr);
                    // console.log(ajaxOptions);
                    // console.log(thrownError);
                    //clear local storage and variables
                    $.mobile.loading( 'hide' );
                    localStorage.setItem("userInfo", false);
                    localStorage.setItem("is_loggedin", false);
                    u = '';
                    p = '';

                    // Show Login failed and focus
                    $( "#login-failed" ).popup( "open" );
                    $('#loginform #username').focus();
                    $("#login-falied-alert").show();
                },
                success : function(response) {
                    $.mobile.loading( 'hide' );
                     //console.log(response);
                     //console.log('dgfdg');
                    if(response.status = 'success'){
                        //Set local storage
                        localStorage.setItem("userInfo", response);
                        localStorage.setItem("is_loggedin", true);
                        $("#login-falied-alert").hide();
                        $(".login-status .ui-btn-text").text('Log Out');
                        $(".login-status .ui-icon").removeClass('ui-icon-check');
                        $(".login-status .ui-icon").addClass('ui-icon-delete');

                        if(localStorage.getItem("last_viewed_page") != null){
                            $.mobile.changePage($('#'+ localStorage.getItem("last_viewed_page"))); 
                        }else{
                            $.mobile.changePage($('#home'));
                        }
                        
                    }else{
                        $( "#login-failed" ).popup( "open" );
                        $('#loginform #username').focus();
                        $("#login-falied-alert").show();
                        $.mobile.loading( 'hide' );
                    }  
                }
            });
        }
        return false;
        });
        
    }); //#login


    //
    // Get Terms Logic
    //
    function get_terms(){
        if(localStorage.getItem("userInfo") != 'false'){
            var user_obj = jQuery.parseJSON(localStorage.getItem("userInfo"));
            var user_id = user_obj.userId;
        }else{
            $.mobile.changePage($("#login"));
        }

        $.ajax( {
            url : api_url+'term/'+ user_id,
            dataType : 'json',
            beforeSend : function(xhr) {
                  var bytes = u+ ":" + p;
                  var base64 = window.btoa(bytes);
                  xhr.setRequestHeader("Authorization", "Basic " + base64);
                  xhr.setRequestHeader("cache-control", "no-cache");

            },
            error : function(xhr, ajaxOptions, thrownError) {
                //console.log('term loading error');
                $('#dumpr').html($('#dumpr').html() + '<br>' + xhr);
                $('#dumpr').html($('#dumpr').html() + '<br>' +ajaxOptions);
                $('#dumpr').html($('#dumpr').html() + '<br>' +thrownError);
                return false;
            },
            success : function(response) {
                var o = '';
                $.each(response, function(key, value) { 
                    var selected;
              
                        if(key == 0){
                            selected = 'selected=selected';
                        }else{
                            selected = '';
                        }
                        o = o + '<option value="'+value.id+'" '+selected+'>'+value.name+ '</option>';

                });
                $('#select-term').html(o).removeClass('ui-disabled').selectmenu('refresh');

                return true;
            }
        });
     
    }

    $(document).on("pageshow","#news-detail",function() {
        $('#news-detail-content .ui-link').live('click', function(e) { 
            e.stopImmediatePropagation();
            var thisUrl = $(this).attr('href'); 
            window.plugins.childBrowser.showWebPage(thisUrl,{ showAddress: false });
            return false; 
        }); 
    }); 


    //
    // Grades Page Logic
    //
    $(document).on("pageshow","#grades",function() {
        //console.log('fired');
        get_terms();
    });

    $("#get-terms").on("click",function(e) {
        get_terms();
    });

    $(document).on("pageinit","#grades",function() {
        localStorage.setItem("last_viewed_page", 'grades');
        var logged_in = localStorage.getItem("is_loggedin");
        if(logged_in == 'false'){
            $.mobile.changePage($('#login'));
        }
        $("#gradesForm").on("submit",function(e) {
            var logged_in = localStorage.getItem("is_loggedin");
            if(logged_in == 'false'){
                $.mobile.changePage($('#login'));
            }
            var term_id = $("#select-term",this).val();
            if(localStorage.getItem("userInfo") != null){
            var user_obj = jQuery.parseJSON(localStorage.getItem("userInfo"));
            var user_id = user_obj.userId;
            }else{
                $.mobile.changePage($("#login"));
            }

            $.mobile.loading('show');
            if(term_id != '') {
                $.ajax( {
                    url : api_url+'grade/'+ user_id +'/' + term_id,
                    dataType : 'json',
                    beforeSend : function(xhr) {$.mobile.loading( 'show' );

                
                      var bytes = u+ ":" + p;
                      var base64 = window.btoa(bytes);
                      xhr.setRequestHeader("Authorization", "Basic " + base64);
                      xhr.setRequestHeader("cache-control", "no-cache");

                
                    },
                    complete : function() {$.mobile.loading( 'hide' )},
                    error : function(xhr, ajaxOptions, thrownError) {
                        // console.log('grades error');
                        // console.log(ajaxOptions);
                        // console.log(thrownError);
                    
                        localStorage.setItem("userInfo", false);
                        localStorage.setItem("is_loggedin", false);
                        $.mobile.changePage($("#login"));
                    },
                    success : function(response) {
                        //console.log(response.grades.length);
                        
                        var o = '';
                        if(response.grades.length == 0){
                            o = o + '<li><h3>No Results</h3></li>';
                        }else{
                            $.each(response.grades, function(key, value) { 
                                    o = o + '<li><h3>'+value.courseTitle+ ' <span class="ui-li-count" style="font-size:22px">' + value.grade +'</span></h3><br><p><strong>Description:</strong> '+value.courseDescription+' <br><strong>Instructor: </strong>' + value.instructorname+' <br><strong>Credit Hours: </strong>'+value.creditHours+'</p></li>';
                            });
                        }
                        $('#grades-list').html(o);
                        $("#grades-list").listview("refresh");
                        $("#select-term").selectmenu('refresh');
                    }
                });
            }
        return false;
        });

        // Set Previous and Next Buttons
        $("#term-back").on("click",function(e) {
            if( document.getElementById('select-term').selectedIndex < document.getElementById('select-term').length-1 ){ document.getElementById('select-term').selectedIndex = document.getElementById('select-term').selectedIndex + 1; }
            $('#gradesForm').submit();
        });

        $("#term-next").on("click",function(e) {
            if( document.getElementById('select-term').selectedIndex > 0){ 
                document.getElementById('select-term').selectedIndex = document.getElementById('select-term').selectedIndex - 1; 
            }
            $('#gradesForm').submit();
        });

    }); //#grades


    //
    // Directory Page Logic
    //
    $(document).on("pageinit","#directory",function() {
        localStorage.setItem("last_viewed_page", 'directory');
        var logged_in = localStorage.getItem("is_loggedin");
        if(logged_in == 'false'){
            $.mobile.changePage($('#login'));
        }
        $("#directoryForm #radio-choice-1,#directoryForm #radio-choice-2").on('click',function(e) {
            //console.log('ttt');
             $('#directoryForm').trigger('submit');
        })
        $("#directoryForm").on("submit",function(e) {
            var logged_in = localStorage.getItem("is_loggedin");
            if(logged_in == 'false'){
                $.mobile.changePage($('#login'));
            }
            var q = $("#search-dir", this).val();
            var t = 'student';
            if($('#radio-choice-1').is(":checked")){
                t = 'student';
            }else if($('#radio-choice-2').is(":checked")){
                t = 'faculty';
            }
            $.mobile.loading('show');
            if(q != '') {
                $.ajax( {
                    url : api_url+'directory/search/query/'+q+'/type/'+t,
                    dataType : 'json',
                    beforeSend : function(xhr) {
                        $.mobile.loading( 'show' );
                        var bytes = u+ ":" + p;
                        var base64 = window.btoa(bytes);
                        xhr.setRequestHeader("Authorization", "Basic " + base64);
                        xhr.setRequestHeader("cache-control", "no-cache");
                    },
                    complete : function() {$.mobile.loading( 'hide' )},
                    error : function(xhr, ajaxOptions, thrownError) {
                        // console.log('dir error');
                        // console.log(ajaxOptions);
                        // console.log(thrownError);
                        $('#search-dir').focus();
                    },
                    success : function(response) {
                        var o = '';
                        if(response.entries.length == 0){
                            o = o + '<li><h3>No Results</h3></li>';
                        }else{
                        $.each(response.entries, function(key, value) { 
                            faculty = '';
                            if(value.type == 'faculty' && value.phone[0].area != null && value.phone[0].number != null){
                                faculty = '<p>'+value.phone[0].area +'-'+ value.phone[0].number+'</p>'
                            }


                            //phone = 
                            o = o + '<li><h3>'+value.firstName+' '+value.lastName+ '</h3><p><a href="mailto:'+value.email+'">'+value.email+'</a></p>'+faculty+'</li>';
                          //console.log(value.firstName);
                        });
                        }
                        $('#dir-list').html(o);
                        $("#dir-list").listview("refresh");
                    }
                });
            }
        return false;
        });
    }); //#directory


    //
    // Labstats Page Logic
    //
    $(document).on("pageshow","#labstats",function() {
        $.ajax( {
            url : 'http://prosper.cofc.edu/~mobile/computer-lab-solutions/json.php',
            dataType : 'json',
            beforeSend : function(xhr) {$.mobile.loading( 'show' );
                      var bytes = u+ ":" + p;
                      var base64 = window.btoa(bytes);
                      xhr.setRequestHeader("Authorization", "Basic " + base64);
                      xhr.setRequestHeader("cache-control", "no-cache");


            },
            complete : function() {$.mobile.loading( 'hide' )},
            error : function(xhr, ajaxOptions, thrownError) {
                // console.log('dir error');
                // console.log(ajaxOptions);
                // console.log(thrownError);
                $('#search-dir').focus();
            },
            success : function(response) {
                //console.log(response);
                var o = '';

                var lab0 = 0;
                var lab1 = 0;
                var lab2 = 0;
                var lab3 = 0;
                var lab4 = 0;
                var lab5 = 0;

                $.each(response, function(key, v) { 
                    if(v.groupName == 'REF' || v.groupName == 'Public' || v.groupName == 'LAB'){
                          lab0 = lab0 + v.availableCount;
                      }
                    if(v.groupName == 'ADL-120'){
                          lab1 = v.availableCount;
                      }
                    if(v.groupName == 'ADL-122'){
                          lab2 = v.availableCount;
                      }
                    if(v.groupName == 'Scanners'){
                          lab3 = v.availableCount;
                      }

                    if(v.groupName == 'Student Technology Center'){
                          lab4 = v.availableCount;
                      }

                    if(v.groupName == 'Air Laptops'){
                          lab5 = v.availableCount;
                      }
                });
                o = '<li>ADL-Lab: '+lab0 +' computers available</li>';
                o = o + '<li>ADL-120: '+lab1 +' computers available</li>';
                o = o + '<li>ADL-122: '+lab2 +' computers available</li>';
                o = o + '<li>Scanners: '+lab3 +' computers available</li>';
                o = o + '<li>Student Technology Center: '+lab4 +' computers available</li>';
                o = o + '<li>Air Laptops: '+lab5 +' computers available</li>';
                $('#labstats-list').html(o);
                $("#labstats-list").listview("refresh");
              
            }
        });
    }); //#labstats

    //
    // Schedule Page Logic
    //
    $(document).on("pageinit","#schedule",function() {
        localStorage.setItem("last_viewed_page", 'schedule');
        var logged_in = localStorage.getItem("is_loggedin");
        if(logged_in == 'false'){
            $.mobile.changePage($('#login'));
        }
        // Set Todays Date
        var nd = new Date();
        var startd = nd.getDate();
        var startm = nd.getMonth() + 1;
        var starty = nd.getFullYear();

        $('#start-choice-day').val(startd.toString());
        $('#start-choice-month').val(startm.toString());
        $('#start-choice-year').val(starty.toString());
        $('#end-choice-day').val(startd.toString());
        $('#end-choice-month').val(startm.toString());
        $('#end-choice-year').val(starty.toString());

        $("#start-choice-day,#start-choice-month,#start-choice-year,#end-choice-day,#end-choice-month,#end-choice-year").selectmenu('refresh');


        $("#scheduleForm").on("submit",function(e) {
            var logged_in = localStorage.getItem("is_loggedin");
            if(logged_in == 'false'){
                $.mobile.changePage($('#login'));
            }
         
            // Get Start and End Date
            var s_d = $("#start-choice-year",this).val()+"-"+$("#start-choice-month",this).val()+"-"+$("#start-choice-day",this).val();
            var e_d = $("#end-choice-year",this).val()+"-"+$("#end-choice-month",this).val()+"-"+$("#end-choice-day",this).val();

            // If user not logged in send them to the login page.
            if(localStorage.getItem("userInfo") != null){
                var user_obj = jQuery.parseJSON(localStorage.getItem("userInfo"));
                var user_id = user_obj.userId;
            }else{
                $.mobile.changePage($("#login"));
            }

            if(s_d != '' && e_d != '') {
                $.ajax( {
                    url : api_url+'schedule/'+user_id+'/' + s_d + '/'+ e_d,
                    dataType : 'json',
                    beforeSend : function(xhr) {$.mobile.loading( 'show' );

                      var bytes = u+ ":" + p;
                      var base64 = window.btoa(bytes);
                      xhr.setRequestHeader("Authorization", "Basic " + base64);
                      xhr.setRequestHeader("cache-control", "no-cache");
                },
                    complete : function() {$.mobile.loading( 'hide' )},
                    error : function(xhr, ajaxOptions, thrownError) {
                        //console.log('sched error');
                        // console.log(ajaxOptions);
                        // console.log(thrownError);
                        localStorage.setItem("userInfo", false);
                        localStorage.setItem("is_loggedin", false);
                        $.mobile.loading( 'hide' );
                        $.mobile.changePage($("#login"));
                    },
                    success : function(response) {
                        //console.log(response);
                        var o = '';

                        $.each(response.dates, function(key, value) { 
                            if(value.courses.length !== 0){
                                var n = value.date.split("-");
                                year = parseInt(n[0]);
                                month = parseInt(n[1]) - 1;
                                day = parseInt(n[2]);
                                ndate = new Date(year,month,day);
                                o = o + '<li data-role="list-divider">'+ndate.toLocaleDateString()+ '</li>';
                                $.each(value.courses, function(key1, value1) { 
                                    o = o + '<li><p class="ui-li-aside ui-li-desc"><strong>'+value1.startTime+' - '+value1.endTime+'</strong>PM</p><h3>'+value1.title+ '</h3><p class="ui-li-desc"><strong>'+value1.description+'</strong></p><p class="ui-li-desc"><strong>Location: </strong>'+value1.location+' <strong>Section: </strong>'+value1.section+' <br><strong>Instructor: </strong>'+value1.instructors[0]['firstName']+' '+value1.instructors[0]['lastName']+' <br><strong>Credit: </strong>'+value1.creditHours+'</p></li>';
                                });
                            }
                        });

                        if(o ==''){
                            o = '<li><h3>No Results</h3></li>';
                        }
                        $('#sched-list').html(o);
                        $("#sched-list").listview("refresh");
  
                    }
                });
            }
        return false;
        });


    }); //#schedule

    
