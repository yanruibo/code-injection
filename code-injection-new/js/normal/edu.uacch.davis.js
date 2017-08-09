
function init() {
	document.addEventListener("deviceready", deviceReady, false);
	delete init;
}

function checkPreAuth() {
	console.log("checkPreAuth");
    var form = $("#loginForm");
    if(window.localStorage["username"] != undefined && window.localStorage["password"] != undefined) {
        $("#username", form).val(window.localStorage["username"]);
        $("#password", form).val(window.localStorage["password"]);
        handleLogin();
    }
}

function handleLogin() {
    var form = $("#loginForm");    
    //disable the button so we can't resubmit while we wait
    $("#submitButton",form).attr("disabled","disabled");
    var u = $("#username", form).val();
    var p = $("#password", form).val();
    if(u != '' && p!= '') {
		$.mobile.showPageLoadingMsg();
        $.post("http://www.uacch.edu/android/service.cfc?method=login&returnformat=json", {username:u,password:p}, function(res) {
            if(res == true) {
                //store
                window.localStorage["username"] = u;
                window.localStorage["password"] = p;             
                window.location.href="http://www.uacch.edu/android/index.cfm?akey=8707775722&username="+u+"&password="+p;
                $.mobile.hidePageLoadingMsg();
            } else {
                navigator.notification.alert("Your login failed", function() {});
                $.mobile.hidePageLoadingMsg();                
            }
         $("#submitButton").removeAttr("disabled");
        },"json");
    } else {
        navigator.notification.alert("You must enter a username and password", function() {});
        $("#submitButton").removeAttr("disabled");
    }
    return false;
}

function deviceReady() {
	console.log("deviceReady");
	$("#loginPage").on("pageinit",function() {
		console.log("pageinit run");
		$("#loginForm").one("submit",handleLogin);
		checkPreAuth();
	});
	$.mobile.changePage("#loginPage");
}

    
function showAlert() {        
		navigator.notification.alert(
		'Your login information is the same as what you use on the MyUACCH link on the UACCH college website. If you do not know your username or pin number, please visit http://mobileapps.uacch.edu for further instructions.',  // message            
		alertDismissed,         // callback            
		'Instructions',            // title            
		'OK'                  // buttonName        
		);    
}


function alertDismissed() {        
	// do something    
}






	 var DEBUG_ANDROID_THEME=true
	


    $("#loginPage").live("pageinit", function(e) {
		checkPreAuth();
	});


function init() {
 document.addEventListener("deviceready", deviceReady, true);
 delete init;
}


function checkPreAuth() {
    var form = $("#loginForm");
    if(window.localStorage["username"] != undefined && window.localStorage["password"] != undefined) {
        $("#username", form).val(window.localStorage["username"]);
        $("#password", form).val(window.localStorage["password"]);
        handleLogin();
    }
}

function handleLogin() {
    var form = $("#loginForm");    
    //disable the button so we can't resubmit while we wait
    $("#submitButton",form).attr("disabled","disabled");
    var u = $("#username", form).val();
    var p = $("#password", form).val();
    console.log("click");
    if(u != '' && p!= '') {
        $.post("http://www.uacch.edu/android/service.cfc?method=login&returnformat=json", {username:u,password:p}, function(res) {
            if(res == true) {
                //store
                window.localStorage["username"] = u;
                window.localStorage["password"] = p;             
                $.mobile.changePage("some.html");
            } else {
                navigator.notification.alert("Your login failed", function() {});
            }
         $("#submitButton").removeAttr("disabled");
        },"json");
    } else {
        //Thanks Igor!
        navigator.notification.alert("You must enter a username and password", function() {});
        $("#submitButton").removeAttr("disabled");
    }
    return false;
}

function deviceReady() {
    
 $("#loginForm").on("submit",handleLogin);

}
















































function isAndroid() {
	if (typeof(DEBUG_ANDROID_THEME) != 'undefined' && DEBUG_ANDROID_THEME) return true
	
	var ua = navigator.userAgent.toLowerCase()
	return ua.indexOf("android") > -1
}

$(function() {
	if (isAndroid()) {
		// add android class to body
		$('body').addClass('android')
	}
})


