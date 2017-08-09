

               
        $( document ).delegate("#program_page", "pagebeforecreate", function() {  
        	page = "program";
        	page_parent = "program.html";
        	
        	$('#dap_period').html(dap_period); 
        	$('#dap_genre').html(dap_genre); 
        	$('#dap_country').html(dap_country); 
       
            $('#update_program').click(function(){
            	$.mobile.showPageLoadingMsg();
            	setTimeout("update_program_rating()",1000);  
            });
       
        });    
        
        $("#program_page").live('pageshow', function (event, ui){
        	update_program_rating();
        });
    

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

function program_list_view(data){
    
    var list = ''; 
  
    $.each(data, function(key, val){          
    	var pg_name = val.program_name;
        if (pg_name.length > 31){
         pg_name = val.program_name.substr(0,31) + "...";
        }
        var rwdate = Date.parse(val.date_program).toString('MMM, d');
        var rwtimestart = Date.parse(val.time_start).toString('HH:mm');
        var rwtimestop = Date.parse(val.time_stop).toString('HH:mm');
        var pg_desc = val.channel_name + ', ' + val.genre_name;
        if (pg_desc.length > 48){
        pg_desc = pg_desc.substr(0,48) + "...";
        }
        
        list += '<li class="" data-icon="false"><a href="#"><div class="number_list">' + (key+1) + '&deg;</div><div class="list_channel"><div class="program_name_list">' + pg_name + '</div><div class="channel_name_list">' + pg_desc +'</div><div class="program_date_list">'+rwdate + ' - ' + rwtimestart+ ' - ' + rwtimestop + '</div> </div></a></li>';            
    });
   
    $('#list_view_program').html(list);                        
    //$('#list_view_program').listview('refresh'); 
    var $myUL = $('#list_view_program');
    if ($myUL.hasClass('ui-listview')) {
      $myUL.listview('refresh');
    }
}

function update_program_rating() {  
	$.mobile.showPageLoadingMsg();
	$('#list_view_program').empty();
    var post = "&passphrase=" + passphrase["lite"] + "&data_program=" + data_date_program + "&data_genre=" + data_genre_program + "&data_country=" + data_country_program + "&data_periodini=" + data_periodini_program + "&data_periodfim=" + data_periodfim_program + "&type=null";	
       
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
    			program_list_view(obj.data_program.data);
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

function channel_list_view(data){
 	
    var list = '';
    
    $.each(data, function(key, val){   
    	var ch_name = val.channel_name;
        if (ch_name.length > 22){
        	ch_name = val.channel_name.substr(0,22) + "...";
        }
        list += '<li class="" data-icon="false"><a href="#"><div class="number_list">' + (key+1) + '&deg;</div><div class="list_channel"> <div class="channel_logo"><img width="56" src="http://www.alldience.tv/logos/' + val.channel_number + '.png" border="0"/></div><div class="program_name_list">' + ch_name + '</div><div class="channel_name_list">' + val.genre_name + '</div> </div></a></li>';            
    });
   
    $('#list_view_channel').html(list);                        
    //$('#list_view_channel').listview('refresh');    
    var $myUL = $('#list_view_channel');
    if ($myUL.hasClass('ui-listview')) {
      $myUL.listview('refresh');
    }
    
}

function update_channel_rating() {  
	$.mobile.showPageLoadingMsg();
	$('#list_view_channel').empty();
    var post = "&passphrase=" + passphrase["lite"] + "&data_program=" + data_date_channel + "&data_genre=" + data_genre_channel + "&data_country=" + data_country_channel + "&data_periodini=" + data_periodini_channel + "&data_periodfim=" + data_periodfim_channel;	
       
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
    			channel_list_view(obj.data_channel.data);
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
                
                $.mobile.changePage("channel.html");
            	
            }
            
            $.mobile.fixedToolbars.setTouchToggleEnabled(false);
        

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
            	setTimeout("update_channel_rating()",1000);  
            });
                       
        }); 
        
        $("#channel_page").live('pageshow', function (event, ui){
        	update_channel_rating();
        });
    

        
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
    
