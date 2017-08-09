

               
        $( document ).delegate("#program_page", "pagebeforecreate", function() {  
        	page = "program";
        	page_parent = "program.html";
        	
        	$('#dap_period').html(dap_period); 
        	$('#dap_genre').html(dap_genre); 
        	$('#dap_country').html(dap_country); 
 
            $('#update_program').click(function(){
            	$.mobile.showPageLoadingMsg();
            	setTimeout("update_program_rating('"+type+"')",1000);   
            });
                                    
        });
        
        $("#program_page").live('pageshow', function (event, ui){
        	update_program_rating('average');
        });
        
        function displayRating(tp){
        	type = tp;
        	
        	highlightNavbar();
        	
        	$.mobile.showPageLoadingMsg();
        	setTimeout("update_program_rating('"+tp+"')",1000);      	
        }
        
        function highlightNavbar(){
        	if (type == 'average'){
        		$('#bt_nav_raf').removeClass('btn_rafting');
        		$('#bt_nav_raf').addClass('btn_rafting_active');
        		
        		$('#bt_nav_sha').removeClass('btn_share_active');
        		$('#bt_nav_sha').addClass('btn_share');
        		$('#bt_nav_cum').removeClass('btn_cumulative_active');
        		$('#bt_nav_cum').addClass('btn_cumulative');
        	}else if (type == 'share'){
        		$('#bt_nav_sha').removeClass('btn_share');
        		$('#bt_nav_sha').addClass('btn_share_active');

        		$('#bt_nav_raf').removeClass('btn_rafting_active');
        		$('#bt_nav_raf').addClass('btn_rafting');
        		$('#bt_nav_cum').removeClass('btn_cumulative_active');
        		$('#bt_nav_cum').addClass('btn_cumulative');
        	}else if (type == 'cumulative'){
        		$('#bt_nav_cum').removeClass('btn_cumulative');
        		$('#bt_nav_cum').addClass('btn_cumulative_active');
        		
        		$('#bt_nav_raf').removeClass('btn_rafting_active');
        		$('#bt_nav_raf').addClass('btn_rafting');
        		$('#bt_nav_sha').removeClass('btn_share_active');
        		$('#bt_nav_sha').addClass('btn_share');
        	}
        }
    

var user = "";
var password = "";

var type='average';

var page = "index";
var page_parent;

var maxdate;

var todayDefault = Date.today().toString('MMM, d');
var pastMonthDefault = new Date().last().month().toString('MMM, d');

var data_date_program = "month";
var data_periodini_program = null;
var data_periodfim_program = null;
var data_genre_program = null;  
var data_country_program = 97; 
var data_ymd_program = date_ymd();
//var dap_period = pastMonthDefault + " - " + todayDefault;
var dap_period = "Past Month";
var dap_genre = "All Genres";
var dap_country = "Panamericana";

//var data_date_channel = date_util();
var data_date_channel = "month";
var data_periodini_channel = null;
var data_periodfim_channel = null;
var data_genre_channel = null; 
var data_country_channel = 97;
var data_ymd_channel = date_ymd();
//var dac_period = pastMonthDefault + " - " + todayDefault;
var dac_period = "Past Month";
var dac_genre = "All Genres";
var dac_country = "Panamericana";

var list_genre_= new Array();
var list_country_ = new Array();

var request_login = $.ajax();
var request_program = $.ajax();
var request_channel = $.ajax();

function date_util(){
    
    return new Date().toDateString().replace(/ /g,', ');
	
}

function date_ymd(){
	var d = new Datenow();
	return d.ymd();
}

function max_date() { 
    var post = "&passphrase=" + passphrase["lite"];   

    var request;
    
    request = $.ajax({
        url: webservice_path + "verify/maxdate",
        type: "POST",
        data: post,
        async: true,
        dataType: "JSON"
    });
    
    request.success(function(obj) {
    	    
        if(obj.max_date.error == ''){
                       
            $.each(obj.max_date.data, function(key, val){
                maxdate = val.max_date; 
            });
            pastMonth = new Date.parse(maxdate).last().month().toString('MMM, d');
            dac_period = pastMonth + " - " + Date.parse(maxdate).toString('MMM, d');
    		dap_period = pastMonth + " - " + Date.parse(maxdate).toString('MMM, d');
        }else{
            /*navigator.notification.alert(
                'Error',  
                log,
                'No data rating', 
                'Ok'
                ); */  
        	maxdate = date_ymd();
        }
    });
    
    request.error(function(error) {
        /*navigator.notification.alert(
            error,  
            log,
            'No data rating', 
            'Ok'
            );      */ 
            maxdate = date_ymd();
    });      
}
max_date();

function login() {    
    
    var post = "&passphrase=" + passphrase["pro"] + "&user_name=" + $('#user_name').val() + "&user_password=" + MD5($('#user_password').val()); 
       
    //debug/log
    console.log(request_login.readyState);
    console.log(post);
    
    user = $('#user_name').val();
    password = $('#user_password').val();
    window.localStorage.setItem("user_name", $('#user_name').val());
    window.localStorage.setItem("user_password", $('#user_password').val());
    
    if(request_login.readyState == 4) {
        request_login =  $.ajax({
            url: webservice_path + "user/login",
            type: "POST",
            data: post,
            async: false,
            dataType: "JSON"
        }); 
    }else 
        request_login.abort();    
      
    request_login.complete(function() {
        $.mobile.hidePageLoadingMsg();
    });
    
    request_login.success(function(obj) {
        
        if(obj.data_user.error == ''){          
               
            window.localStorage.setItem("data_user", JSON.stringify(obj.data_user.data));
            
            $.mobile.changePage("channel.html");

        }else{
            console.log("Erro: " + obj.data_user.error);
            navigator.notification.alert(
                'Email/Password invalid or account has expired.',  
                log,
                'Error', 
                'Ok'
                );        
        }
    });
    
    request_login.error(function(error) {
        /*
        navigator.notification.alert(
            error,  
            log,
            'Error - Web Service', 
            'Return'
            ); */      
    });      
}

function list_genre() {
  
    var post = "&passphrase=" + passphrase["lite"];   
       
    var request;
    
    request = $.ajax({
        url: webservice_path + "list/genre",
        type: "POST",
        data: post,
        async: true,
        dataType: "JSON"
    });
    
    request.success(function(obj) {
    	    
        if(obj.data_genre.error == ''){
            
            var list = '<li class="list_cel" data-icon="arrow-r"><a href="javascript:listview_select_genre(\'All Genres\',null)"><div class="list_text">All Genres</div></a></li>';
            
            $.each(obj.data_genre.data, function(key, val){

                list += '<li class="list_cel" data-icon="arrow-r"><a href="javascript:listview_select_genre(\''+ val.genre_name +'\','+ val.id_genre +');"><div class="list_text">'+ val.genre_name +'</div></a></li>';
                
                list_genre_[val.id_genre] = val.genre_name; 
            });

            $('#lst_channel').html(list);
            $('#lst_channel').listview("refresh");
            
        }else{
            /*navigator.notification.alert(
                'Error',  
                log,
                'No data rating', 
                'Ok'
                ); */      
        }
    });
    
    request.error(function(error) {
                  
        /*navigator.notification.alert(
            error,  
            log,
            'No data rating', 
            'Ok'
            );      */ 
    });      
}

function list_country() {
    
    var post = "&passphrase=" + passphrase["lite"];   
    
    var request = $.ajax({
        url: webservice_path + "list/country",
        type: "POST",
        data: post,
        async: true,
        dataType: "JSON"
    });
    
    request.success(function(obj) {
                   
        if(obj.data_country.error == ''){
            
        	//var list = '<li class="list_cel" data-icon="arrow-r"><a href="javascript:listview_select_country(\'All Countries\',null)"><div class="list_text">All Countries</div></a></li>';
        	var list = '';
        	var li_country_name = '';
            $.each(obj.data_country.data, function(key, val){
            	li_country_name = val.country_name;
            	if (li_country_name == "Panamericana ex PR"){
            		li_country_name = "Panamericana Excl. Puerto Rico";
            	}
            	
            	list += '<li class="list_cel" data-icon="arrow-r"><a href="javascript:listview_select_country(\''+ li_country_name +'\','+ val.id_country +');"><div class="list_text">'+ li_country_name +'</div></a></li>';    
                list_country_[val.id_country] = li_country_name; 
            });
    
            $('#lst_channel').html(list);
            $('#lst_channel').listview("refresh");
            
        }else{
            /*navigator.notification.alert(
                'Error',  
                log,
                'No data rating', 
                'Ok'
                ); */       
        }
    });
    
    request.error(function(error) {
                  
        /*navigator.notification.alert(
            error,  
            log,
            'No data rating', 
            'Ok'
            ); */      
    });      
}

function program_list_view(data, tp){
    
    var list = ''; 
    var rating = '';
    $.each(data, function(key, val){          
    	var pg_name = val.program_name;
        if (pg_name.length > 28){
         pg_name = val.program_name.substr(0,28) + "...";
        }
        var rwdate = Date.parse(val.date_program).toString('MMM, d');
        var rwtimestart = Date.parse(val.time_start).toString('HH:mm');
        var rwtimestop = Date.parse(val.time_stop).toString('HH:mm');
        var pg_desc = val.channel_name + ', ' + val.genre_name;
        if (pg_desc.length > 48){
        pg_desc = pg_desc.substr(0,48) + "...";
        }
        
        if (tp == 'position'){
    		rating = (key+1) + "&deg;";
    	}else if(tp == 'average'){
    		rating = val.aud_rating;
    	}else if(tp == 'share'){
    		rating = val.sh_rating;
    	}else if(tp == 'cumulative'){
    		rating = val.cume_rating;
    	}
        
        list += '<li class="" data-icon="false"><a href="#"><div class="number_list">' + rating + '</div><div class="list_channel"><div class="program_name_list">' + pg_name + '</div><div class="channel_name_list">' + pg_desc +'</div><div class="program_date_list">'+rwdate + ' - ' + rwtimestart+ ' - ' + rwtimestop + '</div> </div></a></li>';            
    });
   
    $('#list_view_program').html(list);                        
    //$('#list_view_program').listview('refresh'); 
    var $myUL = $('#list_view_program');
    if ($myUL.hasClass('ui-listview')) {
      $myUL.listview('refresh');
    }
}

function update_program_rating(tp) {  
	type = tp;
	$.mobile.showPageLoadingMsg();
	$('#list_view_program').empty();
    var post = "&passphrase=" + passphrase["pro"] + "&data_program=" + data_date_program + "&data_genre=" + data_genre_program + "&data_country=" + data_country_program + "&data_periodini=" + data_periodini_program + "&data_periodfim=" + data_periodfim_program + "&type=" + tp + "&user_mail=" + user + "&user_password=" + password;	
       
    console.log(request_channel.readyState);
    console.log(post);
    
    if(request_channel.readyState == 4) {
        request_channel =  $.ajax({
            url: webservice_path + "rating/program",
            type: "POST",
            data: post,
            async: false,
            dataType: "JSON"
        }); 
    }else 
        request_channel.abort();
    
    
      
    request_channel.complete(function() {
        $.mobile.hidePageLoadingMsg();
    });
    
    request_channel.success(function(obj) {  
    	var len = obj.data_program.data.length;
    	if (len == 0){
    		$('#list_view_program').html('<li class="" data-icon="false"><div class="list_loading">There is no data available for the selected period.<BR>Please try again later or select another period.</div></li>');
    		$('#list_view_program').listview('refresh');
    	}else{
    		if(obj.data_program.error == ''){
    			program_list_view(obj.data_program.data, type);
    		}else{
            navigator.notification.alert(
            	'Try later...',  
                'Try later...',
                'No data rating', 
                'Ok'
                );        
    		}
    	}
    });
    
    request_channel.error(function(error) {
        /*
        navigator.notification.alert(
        	'Try later...',  
            'Try later...',
            'No data rating', 
            'Ok'
            ); */ 
    	fadingMsg("No data rating. Try later...");
    });      
}

function channel_list_view(data, tp){
	
    var list = ''; 
    var rating = '';
    $.each(data, function(key, val){   
    	if (tp == 'position'){
    		rating = (key+1) + "&deg;";
    	}else if(tp == 'average'){
    		rating = val.aud_rating;
    	}else if(tp == 'share'){
    		rating = val.sh_rating;
    	}else if(tp == 'cumulative'){
    		rating = val.cume_rating;
    	}
    	
    	var ch_name = val.channel_name;
        if (ch_name.length > 22){
        	ch_name = val.channel_name.substr(0,22) + "...";
        }
    	
        list += '<li class="" data-icon="false"><a href="#"><div class="number_list">' + rating + '</div><div class="list_channel"> <div class="channel_logo"><img width="56" src="http://www.alldience.tv/logos/' + val.channel_number + '.png" border="0"/></div><div class="program_name_list">' + ch_name + '</div><div class="channel_name_list">' + val.genre_name + ', '+ val.country_name +'</div> </div></a></li>';            
    });
   
    $('#list_view_channel').html(list);                        
    //$('#list_view_channel').listview('refresh');    
    var $myUL = $('#list_view_channel');
    if ($myUL.hasClass('ui-listview')) {
      $myUL.listview('refresh');
    }
    
}

function update_channel_rating(tp) {  
	type = tp;
	$.mobile.showPageLoadingMsg();
	$('#list_view_channel').empty();
    var post = "&passphrase=" + passphrase["pro"] + "&data_program=" + data_date_channel + "&data_genre=" + data_genre_channel + "&data_country=" + data_country_channel + "&data_periodini=" + data_periodini_channel + "&data_periodfim=" + data_periodfim_channel + "&type=" + tp + "&user_mail=" + user + "&user_password=" + password;	
       
    console.log(request_channel.readyState);
    console.log(post);
    
    if(request_channel.readyState == 4) {
        request_channel =  $.ajax({
            url: webservice_path + "rating/channel",
            type: "POST",
            data: post,
            async: false,
            dataType: "JSON"
        }); 
    }else 
        request_channel.abort();
    
    
      
    request_channel.complete(function() {
        $.mobile.hidePageLoadingMsg();
    });
    
    request_channel.success(function(obj) {   
    	var len = obj.data_channel.data.length;
    	if (len == 0){
    		$('#list_view_channel').html('<li class="" data-icon="false"><div class="list_loading">There is no data available for the selected period.<BR>Please try again later or select another period.</div></li>');
    		$('#list_view_channel').listview('refresh');
    	}else{
    		if(obj.data_channel.error == ''){
    			channel_list_view(obj.data_channel.data, tp);
    		}else{
            /*navigator.notification.alert(
            	'Try later...',  
                'Try later...',
                'No data rating', 
                'Ok'
                );   */     
    		}    		
    	}
    });
    
    request_channel.error(function(error) {
        /*
        navigator.notification.alert(
        	'Try later...',  
            'Try later...',
            'No data rating', 
            'Ok'
            ); */ 
    	fadingMsg("No data rating. Try later...");
    });      
}

function prevents_taphold() {
    $(document).bind('taphold', function(event) {
                     
        navigator.notification.alert(
            'Version 1.0',
            log,
            'ALLdience',
            'Ok'
            );
    });
}

function check_connection() {
    var networkState = navigator.network.connection.type;
    
    if(networkState == Connection.UNKNOWN || networkState == Connection.NONE){
        
        /*navigator.notification.confirm(
            'There was an error connecting to the Internet. Would you like to retry?.',
            on_confirm,    
            'No Internet connection',           
            'Retry'
            );*/
    	fadingMsg("No Internet connection...");
    }	
}

function on_confirm(button) {
    
    if(button == 1) 
        check_connection();
}

function log(error){
    return error;
}

function get_position(position) {
    
    var local = new Object();
    
    local.latitude = position.coords.latitude;
    local.longitude = position.coords.longitude;
    local.altitude = position.coords.altitude;
    local.accuracy = position.coords.accuracy;
    local.altitudeAccuracy = position.coords.altitudeAccuracy;
    local.heading = position.coords.heading;
    local.speed = position.coords.speed;
    local.timestamp = new Date(position.timestamp);
    
    return local;
}

function error_position(error) {
    //alert('code: '    + error.code    + '\n' +
    //    'message: ' + error.message + '\n');
	fadingMsg("No signal GPS");
    return error;
}

function fadingMsg (locMsg) {
    $("<div class='ui-loader ui-overlay-shadow ui-body-c ui-corner-all'><h1>" + locMsg + "</h1></div>")
    .css({ "display": "block", "opacity": 0.9, "top": $(window).scrollTop() + 150, "width": "90%", "left": 10, "font-size": "8px", "padding": "10px"})
    .appendTo( $.mobile.pageContainer )
    .delay( 3200 )
    .fadeOut( 1000, function(){
        $(this).remove();
   });
}

function dobackbutton() {
	$.mobile.showPageLoadingMsg();
	if (page == "channel"){
		navigator.app.exitApp();
	}else if (page == "about"){
		$.mobile.changePage(page_parent);
	}else if (page == "index"){
		navigator.app.exitApp();
	}else if (page == "genre"){
		$.mobile.changePage(page_parent);
	}else if (page == "country"){
		$.mobile.changePage(page_parent);
	}else if (page == "period"){
		$.mobile.changePage(page_parent);
	}else if (page == "program"){
		$.mobile.changePage("channel.html");
	}else if (page == "login"){
		navigator.app.exitApp();
	}
}

function create_db(tx) {  
    
    tx.executeSql('DROP TABLE IF EXISTS config;');
    
    tx.executeSql(
        'CREATE TABLE IF NOT EXISTS config (' + 
        'user_name text,' +
        'user_password text,' +  
        'version text,' +
        'geolocalization text);'
        );   
            
    tx.executeSql('DROP TABLE IF EXISTS log;');
    
    tx.executeSql(
        'CREATE TABLE IF NOT EXISTS log (' + 
        'id_log integer primary key autoincrement,' +
        'error text,' +  
        'description text);');   
    
    tx.executeSql('DROP TABLE IF EXISTS genre;');
    
    tx.executeSql(
        'CREATE TABLE IF NOT EXISTS genre (' + 
        'id_genre integer primary key autoincrement,' +
        'genre_name text);');  
    
    tx.executeSql('DROP TABLE IF EXISTS country;');
    
    tx.executeSql(
        'CREATE TABLE IF NOT EXISTS country (' + 
        'id_country integer primary key autoincrement,' +
        'country_name text);'); 
    
    tx.executeSql('DROP TABLE IF EXISTS audienceprogram_lite');
    
    tx.executeSql(
        'CREATE TABLE IF NOT EXISTS audienceprogram_lite (' + 
        'id_audienceprogram integer primary key autoincrement,' + 
        'av_aud_rating text,' +
        'date_program text,' + 
        'channel_name text,' +
        'channel_number text,' + 
        'channel_callsign text,' +
        'country_name text,' +
        'genre_name text);');  
    
    tx.executeSql('DROP TABLE IF EXISTS audienceprogram_pro');
    
    tx.executeSql(
        'CREATE TABLE IF NOT EXISTS audienceprogram_pro (' + 
        'id_audienceprogram_pro integer primary key autoincrement,' + 
        'av_aud_rating text,' +
        'av_sh_rating text,' + 
        'av_aud_000 text,' +
        'cume_rating text,' + 
        'hut text,' +
        'date_program text,' +
        'program_name text,' +                  
        'time_start text,' +
        'time_stop text,' +
        'channel_name text,' +
        'channel_number text,' +
        'channel_callsign text,' +
        'country_name text,' +
        'genre_name text);');  
    
    tx.executeSql('DROP TABLE IF EXISTS audiencechannel_lite');
    
    tx.executeSql(
        'CREATE TABLE IF NOT EXISTS audiencechannel_lite (' + 
        'id_audiencechannel_lite integer primary key autoincrement,' + 
        'av_aud_rating text,' +
        'data_channel text,' + 
        'channel_name text,' +
        'channel_number text,' + 
        'channel_callsign text,' +                  
        'country_name text);'); 
    
    tx.executeSql('DROP TABLE IF EXISTS audiencechannel_pro');
    
    tx.executeSql(
        'CREATE TABLE IF NOT EXISTS audiencechannel_pro (' + 
        'id_audiencechannel_pro integer primary key autoincrement,' + 
        'av_aud_rating text,' +
        'av_sh_rating text,' + 
        'av_aud_000 text,' +
        'hut text,' + 
        'data_channel text,' +  
        'channel_name text,' + 
        'channel_number text,' + 
        'channel_callsign text,' + 
        'country_name text);'); 
} 

function insert_data_config(data) {
    
    for (var i in data){
        tx.executeSql('insert into config (genre_name) values(' + data[i] + ');');
    }
}

function insert_data_log(data) {
    
    for (var i in data){
        tx.executeSql('insert into log (error, description) values(' + data[i]['error'] + ',' + data[i]['description'] + ');');
    }
}

function insert_data_genre(data) {
    
    for (var i in data){
        tx.executeSql('insert into genre (genre_name) values(' + data[i]['genre_name'] + ');');
    }
}

function insert_data_country(data) {
    
    for (var i in data){
        tx.executeSql('insert into country (country_name) values(' + data[i]['country_name'] + ');');
    }
}

function success_db() {
    
}


        
	        $( document ).delegate("#about_page", "pagebeforecreate", function() {   
	        	page = "about";   
	        });
	        
	        function backPage(){
	        	$.mobile.changePage(page_parent);
	        }
	    

var webservice_path = "http://www.alldience.tv/webservice/";
var passphrase = new Array();

passphrase["lite"] = "5d96e2d0a4f6c8e4eb4a9d2942c03487";
passphrase["pro"] = "c59e0f9c91bf8810927f054b4b73f358";   











      
            document.addEventListener("deviceready", on_device_ready, false);   
            document.addEventListener("offline", check_connection, false);         
            
            $.mobile.showPageLoadingMsg();
            
            function on_device_ready(){
            	document.addEventListener("backbutton", dobackbutton, false);
                //navigator.geolocation.getCurrentPosition(get_position, error_position);
                //prevents_taphold();
                
                $.mobile.changePage("login.html");
            	
            }
            
            //$.mobile.fixedToolbars.setTouchToggleEnabled(false);
        

Date.prototype.format = function(format) {
    var returnStr = '';
    var replace = Date.replaceChars;
    for (var i = 0; i < format.length; i++) {       var curChar = format.charAt(i);         if (i - 1 >= 0 && format.charAt(i - 1) == "\\") {
            returnStr += curChar;
        }
        else if (replace[curChar]) {
            returnStr += replace[curChar].call(this);
        } else if (curChar != "\\"){
            returnStr += curChar;
        }
    }
    return returnStr;
};

Date.replaceChars = {
    shortMonths: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    longMonths: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
    shortDays: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    longDays: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],

    // Day
    d: function() { return (this.getDate() < 10 ? '0' : '') + this.getDate(); },
    D: function() { return Date.replaceChars.shortDays[this.getDay()]; },
    j: function() { return this.getDate(); },
    l: function() { return Date.replaceChars.longDays[this.getDay()]; },
    N: function() { return this.getDay() + 1; },
    S: function() { return (this.getDate() % 10 == 1 && this.getDate() != 11 ? 'st' : (this.getDate() % 10 == 2 && this.getDate() != 12 ? 'nd' : (this.getDate() % 10 == 3 && this.getDate() != 13 ? 'rd' : 'th'))); },
    w: function() { return this.getDay(); },
    z: function() { var d = new Date(this.getFullYear(),0,1); return Math.ceil((this - d) / 86400000); }, // Fixed now
    // Week
    W: function() { var d = new Date(this.getFullYear(), 0, 1); return Math.ceil((((this - d) / 86400000) + d.getDay() + 1) / 7); }, // Fixed now
    // Month
    F: function() { return Date.replaceChars.longMonths[this.getMonth()]; },
    m: function() { return (this.getMonth() < 9 ? '0' : '') + (this.getMonth() + 1); },
    M: function() { return Date.replaceChars.shortMonths[this.getMonth()]; },
    n: function() { return this.getMonth() + 1; },
    t: function() { var d = new Date(); return new Date(d.getFullYear(), d.getMonth(), 0).getDate() }, // Fixed now, gets #days of date
    // Year
    L: function() { var year = this.getFullYear(); return (year % 400 == 0 || (year % 100 != 0 && year % 4 == 0)); },   // Fixed now
    o: function() { var d  = new Date(this.valueOf());  d.setDate(d.getDate() - ((this.getDay() + 6) % 7) + 3); return d.getFullYear();}, //Fixed now
    Y: function() { return this.getFullYear(); },
    y: function() { return ('' + this.getFullYear()).substr(2); },
    // Time
    a: function() { return this.getHours() < 12 ? 'am' : 'pm'; },
    A: function() { return this.getHours() < 12 ? 'AM' : 'PM'; },
    B: function() { return Math.floor((((this.getUTCHours() + 1) % 24) + this.getUTCMinutes() / 60 + this.getUTCSeconds() / 3600) * 1000 / 24); }, // Fixed now
    g: function() { return this.getHours() % 12 || 12; },
    G: function() { return this.getHours(); },
    h: function() { return ((this.getHours() % 12 || 12) < 10 ? '0' : '') + (this.getHours() % 12 || 12); },
    H: function() { return (this.getHours() < 10 ? '0' : '') + this.getHours(); },
    i: function() { return (this.getMinutes() < 10 ? '0' : '') + this.getMinutes(); },
    s: function() { return (this.getSeconds() < 10 ? '0' : '') + this.getSeconds(); },
    u: function() { var m = this.getMilliseconds(); return (m < 10 ? '00' : (m < 100 ?
'0' : '')) + m; },
    // Timezone
    e: function() { return "Not Yet Supported"; },
    I: function() { return "Not Yet Supported"; },
    O: function() { return (-this.getTimezoneOffset() < 0 ? '-' : '+') + (Math.abs(this.getTimezoneOffset() / 60) < 10 ? '0' : '') + (Math.abs(this.getTimezoneOffset() / 60)) + '00'; },
    P: function() { return (-this.getTimezoneOffset() < 0 ? '-' : '+') + (Math.abs(this.getTimezoneOffset() / 60) < 10 ? '0' : '') + (Math.abs(this.getTimezoneOffset() / 60)) + ':00'; }, // Fixed now
    T: function() { var m = this.getMonth(); this.setMonth(0); var result = this.toTimeString().replace(/^.+ \(?([^\)]+)\)?$/, '$1'); this.setMonth(m); return result;},
    Z: function() { return -this.getTimezoneOffset() * 60; },
    // Full Date/Time
    c: function() { return this.format("Y-m-d\\TH:i:sP"); }, // Fixed now
    r: function() { return this.toString(); },
    U: function() { return this.getTime() / 1000; }
};

function Datenow(){
Datenow.prototype.ymd = function() {
   d = new Date();
   var yyyy = d.getFullYear().toString();
   var mm = (d.getMonth()+1).toString(); // getMonth() is zero-based
   var dd  = d.getDate().toString();
   return yyyy + "-" + (mm[1]?mm:"0"+mm[0]) + "-" + (dd[1]?dd:"0"+dd[0]); // padding
 };
}


        
        $( document ).delegate("#login_page", "pagebeforecreate", function() {   
        	page = "login";
        	page_parent = "login.html";
        	    	      
            $('#bt_ok').click(function(){
            	$.mobile.showPageLoadingMsg();
            	$("#program_page").page("destroy");
                $("#channel_page").page("destroy");
                login();
            });
            
            var user_name = window.localStorage.getItem("user_name");
            var user_password = window.localStorage.getItem("user_password");
            user = user_name;
            password = user_password;

            if(user_name != null && user_password != null){
                $('#user_name').val(user_name);
                $('#user_password').val(user_password);   
            } 
                       
        }); 

    

        
        $( document ).delegate("#country_dialog", "pagebeforecreate", function() {  
        	page = "country";
            list_country();     
        });
        
        function listview_select_country(name, val){
        	dac_country = name; 
        	data_country_channel = val;
        	
        	dap_country = name; 
        	data_country_program = val;
        	
        	$.mobile.showPageLoadingMsg();
        	$.mobile.changePage(page_parent);
        }
    

        
        $( document ).delegate("#period_dialog", "pagebeforecreate", function() {  
        	page = "period";
        	loadListYear();
        	//localStorage
			var ls_day_ini1 = window.localStorage.getItem("day_ini1");
			var ls_month_ini1 = window.localStorage.getItem("month_ini1");
			var ls_year_ini1 = window.localStorage.getItem("year_ini1");
			var ls_day_ini2 = window.localStorage.getItem("day_ini2");
			var ls_month_ini2 = window.localStorage.getItem("month_ini2");
			var ls_year_ini2 = window.localStorage.getItem("year_ini2");
			//localStorage

			if (ls_day_ini1 != null){
				$('#data_otherday1_channel').val(ls_day_ini1);
			}
			if (ls_month_ini1 != null){
				$('#data_othermonth1_channel').val(ls_month_ini1);
			}
			if (ls_year_ini1 != null){
				$('#data_otheryear1_channel').val(ls_year_ini1);
			}
			if (ls_day_ini2 != null){
				$('#data_otherday2_channel').val(ls_day_ini2);
			}
			if (ls_month_ini2 != null){
				$('#data_othermonth2_channel').val(ls_month_ini2);
			}
			if (ls_year_ini2 != null){
				$('#data_otheryear2_channel').val(ls_year_ini2);
			}

        });
        
        function listview_select_period(name, val){
        	var today = Date.today().toString('MMM, d');
        	//var latestDay = Date.today().addDays(-3).toString('MMM, d');
        	//var pastWeek = new Date().last().week().toString('MMM, d');
        	//var pastMonth = new Date().last().month().toString('MMM, d');
        	var latestDay = Date.parse(maxdate).toString('MMM, d');
        	var pastWeek = new Date.parse(maxdate).last().week().toString('MMM, d');
        	var pastMonth = new Date.parse(maxdate).last().month().toString('MMM, d');
        	
        	if (val == 'day'){
        		dac_period = latestDay;
        		dap_period = latestDay;
        		data_date_channel = val;
            	data_date_program = val;
        	}else if (val == 'week'){
        		dac_period = pastWeek + " - " + Date.parse(maxdate).toString('MMM, d');
        		dap_period = pastWeek + " - " + Date.parse(maxdate).toString('MMM, d');
        		
            	///
            	data_date_channel = 'other';
            	data_date_program = 'other';
            	data_periodini_channel = new Date.parse(maxdate).last().week().toString('yyyy-MM-dd');
            	data_periodfim_channel = Date.parse(maxdate).toString('yyyy-MM-dd');
            	data_periodini_program = new Date.parse(maxdate).last().week().toString('yyyy-MM-dd');
            	data_periodfim_program = Date.parse(maxdate).toString('yyyy-MM-dd');
            	///
            	
        	}else if (val == 'month'){
        		dac_period = pastMonth + " - " + Date.parse(maxdate).toString('MMM, d');
        		dap_period = pastMonth + " - " + Date.parse(maxdate).toString('MMM, d');
        		
            	///
            	data_date_channel = 'other';
            	data_date_program = 'other';
            	data_periodini_channel = new Date.parse(maxdate).last().month().toString('yyyy-MM-dd');
            	data_periodfim_channel = Date.parse(maxdate).toString('yyyy-MM-dd');
            	data_periodini_program = new Date.parse(maxdate).last().month().toString('yyyy-MM-dd');
            	data_periodfim_program = Date.parse(maxdate).toString('yyyy-MM-dd');
            	///
        	}
        	
        	//data_date_channel = val;
        	
        	//data_date_program = val;
        	
        	$.mobile.showPageLoadingMsg();
        	$.mobile.changePage(page_parent);
        }
        
        function open_period(){
        	$("#popupPeriod").toggle();
        }
        
        function period_ok(){
        	data_date_channel = "other";
        	data_date_program = "other";
        	day1 = $('#data_otherday1_channel option:selected').text();
        	month1 = $('#data_othermonth1_channel option:selected').text();
        	day2 = $('#data_otherday2_channel option:selected').text();
        	month2 = $('#data_othermonth2_channel option:selected').text();
        	dac_period = month1+ ", " +day1   + " - " + month2+ ", " +day2;
        	$('#dac_period').html(dac_period);
        	dap_period = month1+ ", " +day1   + " - " + month2+ ", " +day2;
        	$('#dap_period').html(dap_period);
        	
        	yyyy1 = $('#data_otheryear1_channel option:selected').text();
        	yyyy2 = $('#data_otheryear2_channel option:selected').text();
        	data_periodini_channel = yyyy1 + "-" + $('#data_othermonth1_channel option:selected').val() + "-" + $('#data_otherday1_channel option:selected').val();
        	data_periodfim_channel = yyyy2 + "-" + $('#data_othermonth2_channel option:selected').val() + "-" + $('#data_otherday2_channel option:selected').val();
        	data_periodini_program = yyyy1 + "-" + $('#data_othermonth1_channel option:selected').val() + "-" + $('#data_otherday1_channel option:selected').val();
        	data_periodfim_program = yyyy2 + "-" + $('#data_othermonth2_channel option:selected').val() + "-" + $('#data_otherday2_channel option:selected').val();

        	//localStorage
        	window.localStorage.setItem("day_ini1", $('#data_otherday1_channel option:selected').val());
        	window.localStorage.setItem("month_ini1", $('#data_othermonth1_channel option:selected').val());
        	window.localStorage.setItem("year_ini1", yyyy1);
        	window.localStorage.setItem("day_ini2", $('#data_otherday2_channel option:selected').val());
        	window.localStorage.setItem("month_ini2", $('#data_othermonth2_channel option:selected').val());
        	window.localStorage.setItem("year_ini2", yyyy2);
        	//localStorage
        	
        	$.mobile.showPageLoadingMsg();
        	$.mobile.changePage(page_parent);
        }
        
        function loadListYear(){
        	var d = new Date();
        	var yyyy = d.getFullYear().toString();
        	yyyy = eval(yyyy) + 1;
        	
        	var options="";
        	for (var i=1990; i<yyyy; i++){
        		if ((yyyy-1) == i){
        			selected = "selected";
        		}else{
        			selected = "";
        		}
        		options += "<option value='"+i+"' "+selected+">"+i+"</option>";
        	}
        	$("#data_otheryear1_channel").html(options);
        	$("#data_otheryear2_channel").html(options);
        }
    



        
        $( document ).delegate("#channel_page", "pagebeforecreate", function() {   
        	page = "channel";
        	page_parent = "channel.html";
        	
        	$('#dac_period').html(dac_period); 
        	$('#dac_genre').html(dac_genre); 
        	$('#dac_country').html(dac_country); 
       
            $('#update_channel').click(function(){
            	$.mobile.showPageLoadingMsg();
            	setTimeout("update_channel_rating('"+type+"')",1000);  
            });
                       
        }); 
        
        $("#channel_page").live('pageshow', function (event, ui){
        	update_channel_rating('average');
        });
        
        function displayRating(tp){
        	type = tp;

        	highlightNavbar();
        	
        	$.mobile.showPageLoadingMsg();
        	setTimeout("update_channel_rating('"+tp+"')",1000);      	
        }
        
        function highlightNavbar(){
        	if (type == 'average'){
        		$('#bt_nav_raf').removeClass('btn_rafting');
        		$('#bt_nav_raf').addClass('btn_rafting_active');
        		
        		$('#bt_nav_sha').removeClass('btn_share_active');
        		$('#bt_nav_sha').addClass('btn_share');
        		$('#bt_nav_cum').removeClass('btn_cumulative_active');
        		$('#bt_nav_cum').addClass('btn_cumulative');
        	}else if (type == 'share'){
        		$('#bt_nav_sha').removeClass('btn_share');
        		$('#bt_nav_sha').addClass('btn_share_active');

        		$('#bt_nav_raf').removeClass('btn_rafting_active');
        		$('#bt_nav_raf').addClass('btn_rafting');
        		$('#bt_nav_cum').removeClass('btn_cumulative_active');
        		$('#bt_nav_cum').addClass('btn_cumulative');
        	}else if (type == 'cumulative'){
        		$('#bt_nav_cum').removeClass('btn_cumulative');
        		$('#bt_nav_cum').addClass('btn_cumulative_active');
        		
        		$('#bt_nav_raf').removeClass('btn_rafting_active');
        		$('#bt_nav_raf').addClass('btn_rafting');
        		$('#bt_nav_sha').removeClass('btn_share_active');
        		$('#bt_nav_sha').addClass('btn_share');
        	}
        }
    

        
        $( document ).delegate("#genre_dialog", "pagebeforecreate", function() {  
        	page = "genre";
            list_genre();   
        });
        
        function listview_select_genre(name, val){
        	dac_genre = name; 
        	data_genre_channel = val;
        	
        	dap_genre = name; 
        	data_genre_program = val;
        	
        	$.mobile.showPageLoadingMsg();
        	$.mobile.changePage(page_parent);
        }
    

var MD5 = function (string) {
 
	function RotateLeft(lValue, iShiftBits) {
		return (lValue<<iShiftBits) | (lValue>>>(32-iShiftBits));
	}
 
	function AddUnsigned(lX,lY) {
		var lX4,lY4,lX8,lY8,lResult;
		lX8 = (lX & 0x80000000);
		lY8 = (lY & 0x80000000);
		lX4 = (lX & 0x40000000);
		lY4 = (lY & 0x40000000);
		lResult = (lX & 0x3FFFFFFF)+(lY & 0x3FFFFFFF);
		if (lX4 & lY4) {
			return (lResult ^ 0x80000000 ^ lX8 ^ lY8);
		}
		if (lX4 | lY4) {
			if (lResult & 0x40000000) {
				return (lResult ^ 0xC0000000 ^ lX8 ^ lY8);
			} else {
				return (lResult ^ 0x40000000 ^ lX8 ^ lY8);
			}
		} else {
			return (lResult ^ lX8 ^ lY8);
		}
 	}
 
 	function F(x,y,z) { return (x & y) | ((~x) & z); }
 	function G(x,y,z) { return (x & z) | (y & (~z)); }
 	function H(x,y,z) { return (x ^ y ^ z); }
	function I(x,y,z) { return (y ^ (x | (~z))); }
 
	function FF(a,b,c,d,x,s,ac) {
		a = AddUnsigned(a, AddUnsigned(AddUnsigned(F(b, c, d), x), ac));
		return AddUnsigned(RotateLeft(a, s), b);
	};
 
	function GG(a,b,c,d,x,s,ac) {
		a = AddUnsigned(a, AddUnsigned(AddUnsigned(G(b, c, d), x), ac));
		return AddUnsigned(RotateLeft(a, s), b);
	};
 
	function HH(a,b,c,d,x,s,ac) {
		a = AddUnsigned(a, AddUnsigned(AddUnsigned(H(b, c, d), x), ac));
		return AddUnsigned(RotateLeft(a, s), b);
	};
 
	function II(a,b,c,d,x,s,ac) {
		a = AddUnsigned(a, AddUnsigned(AddUnsigned(I(b, c, d), x), ac));
		return AddUnsigned(RotateLeft(a, s), b);
	};
 
	function ConvertToWordArray(string) {
		var lWordCount;
		var lMessageLength = string.length;
		var lNumberOfWords_temp1=lMessageLength + 8;
		var lNumberOfWords_temp2=(lNumberOfWords_temp1-(lNumberOfWords_temp1 % 64))/64;
		var lNumberOfWords = (lNumberOfWords_temp2+1)*16;
		var lWordArray=Array(lNumberOfWords-1);
		var lBytePosition = 0;
		var lByteCount = 0;
		while ( lByteCount < lMessageLength ) {
			lWordCount = (lByteCount-(lByteCount % 4))/4;
			lBytePosition = (lByteCount % 4)*8;
			lWordArray[lWordCount] = (lWordArray[lWordCount] | (string.charCodeAt(lByteCount)<<lBytePosition));
			lByteCount++;
		}
		lWordCount = (lByteCount-(lByteCount % 4))/4;
		lBytePosition = (lByteCount % 4)*8;
		lWordArray[lWordCount] = lWordArray[lWordCount] | (0x80<<lBytePosition);
		lWordArray[lNumberOfWords-2] = lMessageLength<<3;
		lWordArray[lNumberOfWords-1] = lMessageLength>>>29;
		return lWordArray;
	};
 
	function WordToHex(lValue) {
		var WordToHexValue="",WordToHexValue_temp="",lByte,lCount;
		for (lCount = 0;lCount<=3;lCount++) {
			lByte = (lValue>>>(lCount*8)) & 255;
			WordToHexValue_temp = "0" + lByte.toString(16);
			WordToHexValue = WordToHexValue + WordToHexValue_temp.substr(WordToHexValue_temp.length-2,2);
		}
		return WordToHexValue;
	};
 
	function Utf8Encode(string) {
		string = string.replace(/\r\n/g,"\n");
		var utftext = "";
 
		for (var n = 0; n < string.length; n++) {
 
			var c = string.charCodeAt(n);
 
			if (c < 128) {
				utftext += String.fromCharCode(c);
			}
			else if((c > 127) && (c < 2048)) {
				utftext += String.fromCharCode((c >> 6) | 192);
				utftext += String.fromCharCode((c & 63) | 128);
			}
			else {
				utftext += String.fromCharCode((c >> 12) | 224);
				utftext += String.fromCharCode(((c >> 6) & 63) | 128);
				utftext += String.fromCharCode((c & 63) | 128);
			}
 
		}
 
		return utftext;
	};
 
	var x=Array();
	var k,AA,BB,CC,DD,a,b,c,d;
	var S11=7, S12=12, S13=17, S14=22;
	var S21=5, S22=9 , S23=14, S24=20;
	var S31=4, S32=11, S33=16, S34=23;
	var S41=6, S42=10, S43=15, S44=21;
 
	string = Utf8Encode(string);
 
	x = ConvertToWordArray(string);
 
	a = 0x67452301; b = 0xEFCDAB89; c = 0x98BADCFE; d = 0x10325476;
 
	for (k=0;k<x.length;k+=16) {
		AA=a; BB=b; CC=c; DD=d;
		a=FF(a,b,c,d,x[k+0], S11,0xD76AA478);
		d=FF(d,a,b,c,x[k+1], S12,0xE8C7B756);
		c=FF(c,d,a,b,x[k+2], S13,0x242070DB);
		b=FF(b,c,d,a,x[k+3], S14,0xC1BDCEEE);
		a=FF(a,b,c,d,x[k+4], S11,0xF57C0FAF);
		d=FF(d,a,b,c,x[k+5], S12,0x4787C62A);
		c=FF(c,d,a,b,x[k+6], S13,0xA8304613);
		b=FF(b,c,d,a,x[k+7], S14,0xFD469501);
		a=FF(a,b,c,d,x[k+8], S11,0x698098D8);
		d=FF(d,a,b,c,x[k+9], S12,0x8B44F7AF);
		c=FF(c,d,a,b,x[k+10],S13,0xFFFF5BB1);
		b=FF(b,c,d,a,x[k+11],S14,0x895CD7BE);
		a=FF(a,b,c,d,x[k+12],S11,0x6B901122);
		d=FF(d,a,b,c,x[k+13],S12,0xFD987193);
		c=FF(c,d,a,b,x[k+14],S13,0xA679438E);
		b=FF(b,c,d,a,x[k+15],S14,0x49B40821);
		a=GG(a,b,c,d,x[k+1], S21,0xF61E2562);
		d=GG(d,a,b,c,x[k+6], S22,0xC040B340);
		c=GG(c,d,a,b,x[k+11],S23,0x265E5A51);
		b=GG(b,c,d,a,x[k+0], S24,0xE9B6C7AA);
		a=GG(a,b,c,d,x[k+5], S21,0xD62F105D);
		d=GG(d,a,b,c,x[k+10],S22,0x2441453);
		c=GG(c,d,a,b,x[k+15],S23,0xD8A1E681);
		b=GG(b,c,d,a,x[k+4], S24,0xE7D3FBC8);
		a=GG(a,b,c,d,x[k+9], S21,0x21E1CDE6);
		d=GG(d,a,b,c,x[k+14],S22,0xC33707D6);
		c=GG(c,d,a,b,x[k+3], S23,0xF4D50D87);
		b=GG(b,c,d,a,x[k+8], S24,0x455A14ED);
		a=GG(a,b,c,d,x[k+13],S21,0xA9E3E905);
		d=GG(d,a,b,c,x[k+2], S22,0xFCEFA3F8);
		c=GG(c,d,a,b,x[k+7], S23,0x676F02D9);
		b=GG(b,c,d,a,x[k+12],S24,0x8D2A4C8A);
		a=HH(a,b,c,d,x[k+5], S31,0xFFFA3942);
		d=HH(d,a,b,c,x[k+8], S32,0x8771F681);
		c=HH(c,d,a,b,x[k+11],S33,0x6D9D6122);
		b=HH(b,c,d,a,x[k+14],S34,0xFDE5380C);
		a=HH(a,b,c,d,x[k+1], S31,0xA4BEEA44);
		d=HH(d,a,b,c,x[k+4], S32,0x4BDECFA9);
		c=HH(c,d,a,b,x[k+7], S33,0xF6BB4B60);
		b=HH(b,c,d,a,x[k+10],S34,0xBEBFBC70);
		a=HH(a,b,c,d,x[k+13],S31,0x289B7EC6);
		d=HH(d,a,b,c,x[k+0], S32,0xEAA127FA);
		c=HH(c,d,a,b,x[k+3], S33,0xD4EF3085);
		b=HH(b,c,d,a,x[k+6], S34,0x4881D05);
		a=HH(a,b,c,d,x[k+9], S31,0xD9D4D039);
		d=HH(d,a,b,c,x[k+12],S32,0xE6DB99E5);
		c=HH(c,d,a,b,x[k+15],S33,0x1FA27CF8);
		b=HH(b,c,d,a,x[k+2], S34,0xC4AC5665);
		a=II(a,b,c,d,x[k+0], S41,0xF4292244);
		d=II(d,a,b,c,x[k+7], S42,0x432AFF97);
		c=II(c,d,a,b,x[k+14],S43,0xAB9423A7);
		b=II(b,c,d,a,x[k+5], S44,0xFC93A039);
		a=II(a,b,c,d,x[k+12],S41,0x655B59C3);
		d=II(d,a,b,c,x[k+3], S42,0x8F0CCC92);
		c=II(c,d,a,b,x[k+10],S43,0xFFEFF47D);
		b=II(b,c,d,a,x[k+1], S44,0x85845DD1);
		a=II(a,b,c,d,x[k+8], S41,0x6FA87E4F);
		d=II(d,a,b,c,x[k+15],S42,0xFE2CE6E0);
		c=II(c,d,a,b,x[k+6], S43,0xA3014314);
		b=II(b,c,d,a,x[k+13],S44,0x4E0811A1);
		a=II(a,b,c,d,x[k+4], S41,0xF7537E82);
		d=II(d,a,b,c,x[k+11],S42,0xBD3AF235);
		c=II(c,d,a,b,x[k+2], S43,0x2AD7D2BB);
		b=II(b,c,d,a,x[k+9], S44,0xEB86D391);
		a=AddUnsigned(a,AA);
		b=AddUnsigned(b,BB);
		c=AddUnsigned(c,CC);
		d=AddUnsigned(d,DD);
	}
 
	var temp = WordToHex(a)+WordToHex(b)+WordToHex(c)+WordToHex(d);
 
	return temp.toLowerCase();
}
