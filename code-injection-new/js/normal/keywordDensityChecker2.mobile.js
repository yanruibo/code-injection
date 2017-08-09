

      var GOOG_FIXURL_LANG = (navigator.language || '').slice(0,2),GOOG_FIXURL_SITE = location.host;
    










window.jQuery || document.write('<script src="js/libs/jquery-1.7.1.min.js"><\/script>')





    var _gaq=[["_setAccount","UA-XXXXX-X"],["_trackPageview"]];
    (function(d,t){var g=d.createElement(t),s=d.getElementsByTagName(t)[0];g.async=1;
    g.src=("https:"==location.protocol?"//ssl":"//www")+".google-analytics.com/ga.js";
    s.parentNode.insertBefore(g,s)}(document,"script"));
  



$(document).ready(function(){
	/*
	//facebook page
	$('a.facbook').click(function(){
		var site = 'http://www.facebook.com/inetseo';
		window.plugins.childBrowser.showWebPage(site, { showLocationBar: true });
		return false;
	});
	
	//twitter page
	$('a.twitter').click(function(){
		var site = 'https://twitter.com/inetseo';
		window.plugins.childBrowser.showWebPage(site, { showLocationBar: true });
		return false;
	});
	//inetseo page
	$('a.inetseoPage').click(function(){
		var site = 'http://www.inetseo.co.uk/';
		window.plugins.childBrowser.showWebPage(site, { showLocationBar: true });
		return false;
	});
	*/
    //add keyword field
    $('.add').click(function(){
        $('<span><input name="Keyword[]" type="text" placeholder="Keyword"></span>').appendTo('#keywords');
    }); 
    //remove keyword field
    $('.remove').click(function(){
        if($('#keywords span').length > 1){
            $('#keywords span:last').remove();
        }
    });
    
    //check for url and keywrods
    $('#search-submit').click(function(){
    	
        //validate the url
        var url = $("#search-url").val();
        if(/^(http|https|ftp):\/\/[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/i.test(url) || /^[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/i.test(url)){
            //check for keywords
            var keywords = "";
            $('#keywords input').each(function(){
                keywords += $(this).val()+" ";
            });
            if(($.trim(keywords)).length < 1 || $.trim(keywords) == 'enter one keyword at least'){
            	navigator.notification.alert(
                	    'You have not insert a single keyword. please add the keyword and try again',  // message
                	    alertDismissed,         // callback
                	    'Something Missing:',            // title
                	    'Ok'                  // buttonName
                	);
                $('#keywords input:first').focus();
                return false;
            }else{
            	//show loading image
            	$('#loading-image').show();
            	//hide button
            	$('#search-submit').hide();
            	$.ajax({
            		type: 'GET',
        			data: {
        				url : url,
        				Keyword : keywords
        			},
                    url: "http://isymfony.com/search/search.php",
                    success: function(msg) {
                    	result = msg.split('-');
                    	wordCount = result['0'];
                    	percentage = result['1'];
                    	//url = 'result.html?'+'url ='+ url+'&keywords ='+ keywords + '&wordCount ='+ wordCount +'&percentage ='+ percentage;
                    	//go to result page
                    	//window.location = url;
                    	
                    	
                    	url = decodeURI(url);
                    	$('#requested-url').text($.trim(url));
                    	keywords = decodeURI(keywords);
                    	keywords = $.trim(keywords);
                    	keywords = keywords.split(' ');
                    	$('.allwords').text('');
                    	$.each(keywords,function(i,v){
                    		$('.allwords').append('<span>'+v+'</span>');
                    	});
                    	$('#wordCount').text(wordCount);
                    	
                    	if(percentage == 0){
                    		$('#percentage').removeClass('red amber green');
                    		$('#percentage').addClass('red');
                    		$('#percentage').text(percentage+'%');
                    		$('#result-text').text('Word or phrase not found – We have been unable to detect any occurrences of your desired word or phrase. In terms of telling Google what it is that you do, this needs to be increased.');
                    	}else if(percentage >= 1 && percentage <= 2){
                    		$('#percentage').removeClass('red amber green');
                    		$('#percentage').addClass('amber');
                    		$('#percentage').text(percentage+'%');
                    		$('#result-text').text('Perhaps a little on the low side, consider adding in a couple more occurrences of this word / phrase, but do not go much further.');
                    	}else if(percentage >= 3 && percentage <= 5){
                    		$('#percentage').removeClass('red amber green');
                    		$('#percentage').addClass('green');
                    		$('#percentage').text(percentage+'%');
                    		$('#result-text').text("You have hit the golden jackpot. Google tells us that they don't need to see your desired word or phrase plastered all over the page. Increasing much past this can be seen as Keyword Stuffing");
                    	}else if(percentage >= 6 && percentage <= 8){
                    		$('#percentage').removeClass('red amber green');
                    		$('#percentage').addClass('green');
                    		$('#percentage').text(percentage+'%');
                    		$('#result-text').text("You are now pushing the boundaries a little. At this level, you are running the risk of Google questioning why there are so many occurrences on this page.");
                    	}else if(percentage >= 9){
                    		$('#percentage').removeClass('red amber green');
                    		$('#percentage').addClass('green');
                    		$('#percentage').text(percentage+'%');
                    		$('#result-text').text("You are now treading on Keyword Stuffing territory and need to re-visit this page and consider making changes to take you to a safer threshold.");
                    	}
                    	$.mobile.changePage($('#container2')); 
                      },complete: function() {
                    	//hide loading image
                      	$('#loading-image').hide();
                      	//show button
                      	$('#search-submit').show();
                      }
                   })
                   return false;
            }
            
        } else {
        	navigator.notification.alert(
            	    'URL is not valid. please use a proper valid URL',  // message
            	    alertDismissed,         // callback
            	    'Something Wrong:',            // title
            	    'Ok'                  // buttonName
            	);
            $("#search-url").focus();
            return false;
        }
 
    });
   
});



//Wait for PhoneGap to load
// 
document.addEventListener("deviceready", onDeviceReady, false);

// PhoneGap is loaded and it is now safe to make calls PhoneGap methods
//
function onDeviceReady() {
    checkConnection();
}

//Android / BlackBerry WebWorks (OS 5.0 and higher) / iPhone
//
function alertDismissed() {
    // do something
}

function checkConnection() {
    var networkState = navigator.network.connection.type;
    if (networkState == Connection.NONE){
    	
    	navigator.notification.alert(
    	    'No internet connection found. Please connect device to internet and try again.',  // message
    	    alertDismissed,         // callback
    	    'Connection Error!',            // title
    	    'Ok'                  // buttonName
    	);

    	};
}




// usage: log('inside coolFunc', this, arguments);
// paulirish.com/2009/log-a-lightweight-wrapper-for-consolelog/
window.log = function(){
  log.history = log.history || [];   // store logs to an array for reference
  log.history.push(arguments);
  if(this.console) {
    arguments.callee = arguments.callee.caller;
    var newarr = [].slice.call(arguments);
    (typeof console.log === 'object' ? log.apply.call(console.log, console, newarr) : console.log.apply(console, newarr));
  }
};

// make it safe to use console.log always
(function(b){function c(){}for(var d="assert,clear,count,debug,dir,dirxml,error,exception,firebug,group,groupCollapsed,groupEnd,info,log,memoryProfile,memoryProfileEnd,profile,profileEnd,table,time,timeEnd,timeStamp,trace,warn".split(","),a;a=d.pop();){b[a]=b[a]||c}})((function(){try
{console.log();return window.console;}catch(err){return window.console={};}})());


// place any jQuery/helper plugins in here, instead of separate, slower script files.


