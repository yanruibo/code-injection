



      function onDeviceReady() {
        getDeviceDimention();
      }

      function getDeviceDimention() {
        console.log("Device Dimention using PhoneGap");
        console.log("Width = " + window.innerWidth);
        alert("Height = " + window.innerHeight);
      }
    

    //youtube URL (mandatory) -----------------------------
      var youTubeURL = "http://www.youtube.com/user/GreenvilleCollege"; 
      //optional parameters ---------------------------------
      var yuneroBorder = 0;
      //width and height of your widget
      var yuneroWidgetHeight = window.innerHeight - 200; 
      var yuneroWidgetWidth = window.innerWidth - 60; 
      var yuneroVideoHeight = window.innerHeight / 2; //works with plugin in download 2
    









!function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0],p=/^http:/.test(d.location)?'http':'https';if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src=p+"://platform.twitter.com/widgets.js";fjs.parentNode.insertBefore(js,fjs);}}(document,"script","twitter-wjs");







!function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0],p=/^http:/.test(d.location)?'http':'https';if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src=p+"://platform.twitter.com/widgets.js";fjs.parentNode.insertBefore(js,fjs);}}(document,"script","twitter-wjs");








  var iframeHeight = window.innerHeight - 200;
  document.write('<iframe src="http://ist.greenville.edu/gcss/dir.php" seamless width="100%" height="'+iframeHeight+'"></iframe>');








!function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0],p=/^http:/.test(d.location)?'http':'https';if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src=p+"://platform.twitter.com/widgets.js";fjs.parentNode.insertBefore(js,fjs);}}(document,"script","twitter-wjs");









    // Wait for device API libraries to load
    //
    document.addEventListener("deviceready", onDeviceReady, false);

    // device APIs are available
    //
    function onDeviceReady() {
        checkConnection();
    }

    function checkConnection() {
      var networkState = navigator.connection.type;

      var states = {};
      states[Connection.UNKNOWN]  = 'Unknown connection';
      states[Connection.ETHERNET] = 'Ethernet connection';
      states[Connection.WIFI]     = 'WiFi connection';
      states[Connection.CELL_2G]  = 'Cell 2G connection';
      states[Connection.CELL_3G]  = 'Cell 3G connection';
      states[Connection.CELL_4G]  = 'Cell 4G connection';
      states[Connection.CELL]     = 'Cell generic connection';
      states[Connection.NONE]     = 'No network connection';

            //alert('Connection type: ' + states[networkState]);
            //if (states[networkState]=="No network connection") {
      if (networkState == Connection.NONE) {
        alert('A network connection is required for this application.');
      }
    }

    

      if (device.platform == "Android") {
        document.write('<td><a class="btn btn-success" href="successtweets.html"><i class="icon-twitter"></i><br />success tweets</a></td>');
        document.write('<td><a class="btn btn-info" href="online.html"><i class="icon-desktop"></i><br />online learning</a></td>');
      } else {
        document.write('<td><a class="btn btn-success" onClick="window.plugins.childBrowser.showWebPage(\'http://ist.greenville.edu/gcss/successtweets.html\', { showAddress: false });" href="#"><i class="icon-twitter"></i><br />success tweets</a></td>');
        document.write('<td><a class="btn btn-info" onClick="window.plugins.childBrowser.showWebPage(\'http://learning.greenville.edu\', { showAddress: false });" href="#"><i class="icon-desktop"></i><br />online learning</a></td>');
      }
    

      if (device.platform == "Android") {
        document.write('<td><a class="btn" href="faq.html"><i class="icon-question-sign"></i><br />faq</a></td>');
      } else {
        document.write('<td><a class="btn" target="_blank" onClick="window.plugins.childBrowser.showWebPage(\'http://ist.greenville.edu/gcss/faq.html\', { showAddress: false });" href="#"><i class="icon-question-sign"></i><br />faq</a></td>');
      }
    

    if (device.platform == "Android") {
      document.write('<td><a class="btn btn-success" href="leadlifecalltweets.html"><i class="icon-money"></i><br />life calling</a></td>');
    } else {
      document.write('<td><a class="btn btn-success" onClick="window.plugins.childBrowser.showWebPage(\'http://ist.greenville.edu/gcss/leadlifecalltweets.html\', { showAddress: false });" href="#"><i class="icon-money"></i><br />life calling</a></td>');
    }
    

    if (device.platform == "Android") {
      document.write('<td><a class="btn btn-inverse" href="athletictweets.html"><i class="icon-trophy"></i><br />athletic</a></td>');
      document.write('<td><a class="btn" href="academictweets.html"><i class="icon-certificate"></i><br />academic</a></td>');
      document.write('<td><a class="btn btn-primary" href="cocurriculartweets.html"><i class="icon-fire"></i><br />co-curricular</a></td>');
    } else {
      document.write('<td><a class="btn btn-inverse" onClick="window.plugins.childBrowser.showWebPage(\'http://ist.greenville.edu/gcss/athletictweets.html\', { showAddress: false });" href="#"><i class="icon-trophy"></i><br />athletic</a></td>');
      document.write('<td><a class="btn" onClick="window.plugins.childBrowser.showWebPage(\'http://ist.greenville.edu/gcss/academictweets.html\', { showAddress: false });" href="#"><i class="icon-certificate"></i><br />academic</a></td>');
      document.write('<td><a class="btn btn-primary" onClick="window.plugins.childBrowser.showWebPage(\'http://ist.greenville.edu/gcss/cocurriculartweets.html\', { showAddress: false });" href="#"><i class="icon-fire"></i><br />co-curricular</a></td>');
    }
    








var iframeHeight = window.innerHeight - 180;
document.write('<iframe width="100%" height="'+iframeHeight+'" frameborder="0" scrolling="no" marginheight="0" marginwidth="0" src="https://www.google.com/calendar/embed?title=Tutor%20and%20Academic%20Coach%20schedules&amp;showTitle=0&amp;showDate=0&amp;showPrint=0&amp;showTabs=0&amp;showCalendars=0&amp;showTz=0&amp;mode=AGENDA&amp;height=600&amp;wkst=1&amp;bgcolor=%23000000&amp;src=t0csic14e6s50qi951aog5hvig%40group.calendar.google.com&amp;color=%23060D5E&amp;src=25quvld5td7jabpvtjnjl50jpc%40group.calendar.google.com&amp;color=%23BE6D00&amp;ctz=America%2FChicago" style=" border-width:0"></iframe>');








!function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0],p=/^http:/.test(d.location)?'http':'https';if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src=p+"://platform.twitter.com/widgets.js";fjs.parentNode.insertBefore(js,fjs);}}(document,"script","twitter-wjs");







!function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0],p=/^http:/.test(d.location)?'http':'https';if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src=p+"://platform.twitter.com/widgets.js";fjs.parentNode.insertBefore(js,fjs);}}(document,"script","twitter-wjs");








var iframeHeight = window.innerHeight - 110;
document.write('<iframe width="100%" height="'+iframeHeight+'" frameborder="0" scrolling="no" marginheight="0" marginwidth="0" src="https://maps.google.com/maps/ms?msa=0&amp;msid=214441194697971743740.0004a768898f80c01a35b&amp;ie=UTF8&amp;t=m&amp;ll=38.89459,-89.409592&amp;spn=0.005845,0.00912&amp;z=16&amp;output=embed"></iframe><br /><small>View the <a href="https://maps.google.com/maps/ms?msa=0&amp;msid=214441194697971743740.0004a768898f80c01a35b&amp;ie=UTF8&amp;t=m&amp;ll=38.89459,-89.409592&amp;spn=0.005845,0.00912&amp;z=16&amp;source=embed" style="color:#0000FF;text-align:left">GC Campus</a> in a larger map</small>');

















            // Wait for device API libraries to load
        //
        document.addEventListener("deviceready", onDeviceReady, false);

        // device APIs are available
        //
        function onDeviceReady() {
          window.plugins.childBrowser.openExternal('http://ist.greenville.edu/gcss/faq.html');
        }
        
      








            // Wait for device API libraries to load
        //
        document.addEventListener("deviceready", onDeviceReady, false);

        // device APIs are available
        //
        function onDeviceReady() {
          window.plugins.childBrowser.openExternal('http://learning.greenville.edu');
        }
        
      





eval(function(p,a,c,k,e,d){e=function(c){return c};if(!''.replace(/^/,String)){while(c--){d[c]=k[c]||c}k=[function(e){return d[e]}];e=function(){return'\\w+'};c=1};while(c--){if(k[c]){p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c])}}return p}('11(35==41||41==""||41=="38")3 41=117;11(35==42||42==""||42=="38")3 42=136;11(35==40||40==""||40=="38")3 40=138;3 13="";3 36="";16 98(){3 39="";11(18.32("21.22/66/")!=-1){11(18.32("?86")!=-1)13=18.73(18.32("21.22/66/")+17,18.32("?86"));47 13=18.73(18.32("21.22/66/")+17);39="58://111.21.22/110/104/133/"+13+"/135/?103=2&97=95"}47 11(18.32("21.22/105?109=")!=-1){36=18.73(18.32("21.22/105?109=")+26);39="58://111.21.22/110/104/121/"+36+"?103=2&97=95"}102 39}16 82(15){3 113=130.129(15/60);3 45=15%60;11(45<10)45="0"+45;3 112=113+":"+45;102 112}16 108(49){3 4;3 44;3 24;3 31;3 15;3 48;3 55;3 $9=$(\'#9\');$9.140();$9.28(\'<56 4="62" 19="100%" 76="" 20="\'+40+\'" 94="0"></56>\');$(\'#62\').79();11(35!=13&&13!=""&&13!="38")55=13;47 55=49.115.134;$9.28(\'<6 14="50:69; 50-139:137;"><56 94="0" 4="128" 125="119" 76="58://83.21.22/118?127=\'+55+\'" 14="90: 68; 20: 126; 27:#122; 23-87: 29; 23-88: 29;  19: 100%;"></56></6>\');$9.28(\'<6 4="51"></6>\');$51=$(\'#51\');12=49.115.131;123(3 5=0;5<12.124;5++){11(35!=36&&36!=""&&36!="38"){4=12[5].46.4;44=12[5].46.92.91;24=12[5].46.24;31=12[5].46.84;15=12[5].46.15}47 11(35!=13&&13!=""&&13!="38"){4=12[5].4;44=12[5].92.91;24=12[5].24;31=12[5].84;15=12[5].15}11(5%2==0)48=\'120\';47 48=\'101\';$51.28(\'<6 37="9-52" 4="\'+4+\'" 14="48:\'+48+\'; 27-44:96(\\\'\'+44+\'\\\'); 27-70:132; 64:34; 19:151; 20:178;"></6>\');$(\'#\'+4).28(\'<6 4="\'+4+\'-7" 37="7"><6 37="7-24">\'+24+\'</6><6 37="7-31">\'+31+\' <53 37="7-116-53">31</53></6><6 37="7-15">\'+82(15)+\'</6></6>\');$(\'#\'+4+\'-7\').79()}$(\'.9-52\').177(16(){$(\'#\'+71.4+\'-7\').81()});$(\'.9-52\').179(16(){$(\'#\'+71.4+\'-7\').79()});$(\'.9-52\').180(16(){$(\'#62\').176(\'76\',\'58://83.21.22/175/\'+71.4);$(\'#62\').81();$(\'#9\').170({169:0},\'171\')})}16 89(){3 14=\'<14>#9 {19:\'+42+\'85; 20:\'+41+\'85; 50:68 67;90:172 174 93(80,80,80);23-88:67;23-87:29;}#51 {19:141;50:68 67;}#173 {27-59:93(65,65,65);59:#182;183-20:190;}#191 {19:100%;}.9-52 {114:192;114:193;50:33;}.7 {59:188;27-59:189;184:0.8;19:100%;20:100%;23:29;74-186: 187;74-70: 168;72-77:167;}.7-24 {20:75%;43-149:33;43-34:33;43-78:33;23:29;}.7-31 {20:25%;19:60%;64:34;72-77:34;43-34:33;23:29;}.7-15 {20:30%;19:30%;64:34;72-77:78;43-78: 33;23:29;}.7-116-53 {74-70:69;}</14>\';$(\'57 > 99\').28(14);3 14=\'<14>::-63-61 {19: 69;}::-63-61-153 {148:101;}::-63-61-147-143 {27: #142}::-63-61-145 {27: #146}</14>\';$(\'57 > 99\').28(14);3 39=98();$.154({96:39,155:"163",164:165,166:\'162\',157:16(49){108(49)},156:16(57){158(57)},159:106});16 106(54){11(54&&54.107){54.107("160/161-144;152=150-8")}}}$(185).181(16(){89()});',10,194,'|||var|id|i|div|descriptor||yunero||if|itemArray|yuneroUser|style|duration|function||youTubeURL|width|height|youtube|com|overflow|title|||background|append|hidden||views|indexOf|5px|left|null|yuneroListId|class|undefined|apiURL|yuneroVideoHeight|yuneroWidgetHeight|yuneroWidgetWidth|padding|image|seconds|video|else|clear|response|margin|yuneroFeeds|feed|span|xhr|subscribtionUser|iframe|html|http|color||scrollbar|yuneroVideoFrame|webkit|float|242|user|auto|0px|10px|size|this|text|substring|font||src|align|right|hide|215|show|secondsToTime|www|viewCount|px|feature|x|y|loadYunero|border|sqDefault|thumbnail|rgb|frameborder|jsonc|url|alt|createAPI|head||none|return|v|api|playlist|setHeader|overrideMimeType|showWidget|list|feeds|gdata|time|minutes|cursor|data|view|400|subscribe_widget|no|both|playlists|FFF|for|length|scrolling|104px|p|fr|floor|Math|items|cover|users|author|uploads|280|2px|200|bottom|empty|260px|888|piece|son|thumb|eee|track|display|top|UTF|120px|charset|button|ajax|type|error|success|alert|beforeSend|application|j|json|GET|cache|false|dataType|center|12px|scrollTop|animate|slow|1px|yuneroFeedName|solid|embed|attr|mouseenter|90px|mouseleave|click|load|3b5998|line|opacity|window|family|Calibri|white|black|20px|yuneroVideoDiv|pointer|hand'.split('|'),0,{}))


$('a[rel=tooltip]').tooltip({
	'placement': 'bottom'
});


$('.navbar a, .subnav a').smoothScroll();


(function ($) {

	$(function(){

		// fix sub nav on scroll
		var $win = $(window),
				$body = $('body'),
				$nav = $('.subnav'),
				navHeight = $('.navbar').first().height(),
				subnavHeight = $('.subnav').first().height(),
				subnavTop = $('.subnav').length && $('.subnav').offset().top - navHeight,
				marginTop = parseInt($body.css('margin-top'), 10);
				isFixed = 0;

		processScroll();

		$win.on('scroll', processScroll);

		function processScroll() {
			var i, scrollTop = $win.scrollTop();

			if (scrollTop >= subnavTop && !isFixed) {
				isFixed = 1;
				$nav.addClass('subnav-fixed');
				$body.css('margin-top', marginTop + subnavHeight + 'px');
			} else if (scrollTop <= subnavTop && isFixed) {
				isFixed = 0;
				$nav.removeClass('subnav-fixed');
				$body.css('margin-top', marginTop + 'px');
			}
		}

	});

})(window.jQuery);
