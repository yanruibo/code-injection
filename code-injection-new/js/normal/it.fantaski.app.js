


	if(typeof(Storage)!=="undefined")
	  {
	  	// Yes! localStorage and sessionStorage support!
	  	//console.log('Localstorage supported!');
	  }
	else
	  {
	  	// Sorry! No web storage support..
	  	//console.log('Localstorage not supported!');
	  }

	function incSwipeTT(){
		if (localStorage.clickcount == undefined || localStorage.clickcount == null || localStorage.clickcount == NaN)
			localStorage.clickcount="0";
		localStorage.clickcount=Number(localStorage.clickcount)+1;
		//$('#tooltip_swipe').attr('title','Fai swipe della pagina per vedere le altre notizie (' + localStorage.clickcount + ')');
	}
	
	function delSwipeTT(){
		if (localStorage.clickcount == undefined || localStorage.clickcount == null || localStorage.clickcount == NaN)
			localStorage.clickcount="0";
		localStorage.clickcount=Number(localStorage.clickcount)-1;
		//$('#tooltip_swipe').attr('title','Fai swipe della pagina per vedere le altre notizie (' + localStorage.clickcount + ')');
	}	
	
	function getSwipeTT(){
		if (localStorage.clickcount == undefined || localStorage.clickcount == null || localStorage.clickcount == NaN)
			return "0";
		else	
			return localStorage.clickcount;
	}



(function($) {
		
		  $.formatRSSDate = function(timestamp) {
		  
		    var day = '';
		    var month = '';
		    var time = '';
		   
		    var formattedDate = '';
		    
		    timestamp.replace(',' , ' ');
		    timestamp.replace(/\+1\.00|GMT$/, ' ');
		    
		    var parts = timestamp.split(' ');
		    var part = parts[0].replace(',','');
		    
		    switch(part) {
		        case 'Mon':
				    day = 'Luned&igrave;';
		    	break;
		        case 'Tue':
		    		day = 'Marted&igrave;';
		    	break;
		        case 'Wed':
		    		day = 'Mercoled&igrave;';
		    	break;
		       	case 'Thu':
		            day = 'Gioved&igrave;';
		    	break;
		       	case 'Fri':
		             day = 'Venerd&igrave;';
		    	break;
		        case 'Sat':
		             day = 'Sabato';
		    	break;
		       	case 'Sun':
		              day = 'Domenica';
		        break;
		       	default:
		        break; 
		    }
		    
		    switch(parts[2]) {
		    
		    case 'Jan':
		        month = 'Gennaio';
		        break;
		    case 'Feb':
		        month = 'Febbraio';
		        break;
		    case 'Mar':
		        month = 'Marzo';
		        break;
		    case 'Apr':
		        month = 'Aprile';
		        break;
		    case 'May':
		        month = 'Maggio';
		        break;
		    case 'Jun':
		        month = 'Giugno';
		        break;
		    case 'Jul':
		        month = 'Luglio';
		        break;
		    case 'Aug':
		        month = 'Agosto';
		        break;
		    case 'Sep':
		        month = 'Settembre';
		        break;
		    case 'Oct':
		        month = 'Ottobre';
		        break;
		    case 'Nov':
		        month = 'Novembre';
		        break;
		    case 'Dec':
		        month = 'Dicembre';
		        break;
		    default:
		        break;
		    }
		    
		    time = parts[4].replace(/:\d{2}$/, '');
		    
		    formattedDate = day + ' ' + parts[1] + ' ' + month + ' ' + parts[3];
		    
		   return formattedDate;
		
		  };
		
		})(jQuery);
		
		
		
	function getShortDate(longDate){
		var monthNames = [ "Gen", "Feb", "Mar", "Apr", "Mag", "Giu", "Lug", "Ago", "Set", "Ott", "Nov", "Dic" ];
		myDate = new Date(longDate);
		return myDate.getDate() + " " + monthNames[myDate.getMonth()];
	}
	
	function getShortDateNumeric(longDate){
		myDate = new Date(longDate);
		return myDate.getDate() + "." + (myDate.getMonth()+1);
	}
	
	function calc_elapsed(last_tm){
	
		data = last_tm.split(" ")[0]
		ora = last_tm.split(" ")[1]
		
		year = parseInt(data.split("/")[2]);
		month = parseInt(data.split("/")[1]) - 1;
		day = parseInt(data.split("/")[0]);

		s = parseInt(ora.split(".")[2]);
		m = parseInt(ora.split(".")[1]);
		h = parseInt(ora.split(".")[0]);

		var end = new Date();
		var start = new Date(year, month, day, h, m, s);
		
		if (start>end){
			return ""
		}
		
		if (start==end){
			return "adesso..."
		}		
		
		var diff = new Date(end - start);
		
		var weeks = Math.round(diff/1000/60/60/24/7);		
		var days = Math.round(diff/1000/60/60/24);
		var hours = Math.round(diff/1000/60/60);		
		var minutes = Math.round(diff/1000/60);
		var seconds = Math.round(diff/1000);
		
		if (days>=1){
			if (days==1){
				return "un giorno fa...";
			}
			else{
				return days + " giorni fa...";
			}
		}
		else if (hours>=1){
			if (hours == 1){
				return "un'ora fa...";
			}
			else{
				return hours + " ore fa...";
			}
		}
		else if (minutes>=1){
			if (minutes==1){
				return "un minuto fa...";
			}
			else{
				return minutes + " minuti fa...";
			}
		}
		else if (seconds>=1){
			if (seconds==1){
				return "un secondo fa...";
			}
			else{
				return seconds + " secondi fa...";
			}
		}
		else if (seconds<1){
			return "un istante fa...";
		}
		else{
			return ""
		}
	}

	
	function go_dowload_all_json(){
	
		if (ALL_URLS_ARRAY.length == 0) return;
	
		url_diz = ALL_URLS_ARRAY.pop();

		if (localStorage.getItem(url_diz['tstamp']) != undefined){
			now = new Date();
			pre = new Date(localStorage.getItem(url_diz['tstamp'])); 
			diff = now - pre;
			diff_sec = diff / 1000;
			if (diff_sec < 60){
				if (DEBUG) console.log("Fantaski INFO - Non riscarico " + url_diz['tstamp']); 
				go_dowload_all_json();
			}
			else{
				if (DEBUG) console.log("Fantaski INFO - Download json su LS " + url_diz['url']);
			}
		}
	
		$.ajax({
		  type: 'GET',
		  url: url_diz['url'],
		  cache: false,
		  dataType: 'json',
		}).done(function(data) {
		}).error(function(data) {
			go_dowload_all_json();
		}).success(function(data) {
			localStorage.setItem(url_diz['storageName'], JSON.stringify(data));
			if (url_diz['tstamp'] != ''){ 
				localStorage.setItem(url_diz['tstamp'], JSON.stringify(new Date()));
				if (DEBUG) console.log( url_diz['tstamp'] + " --> " + localStorage.getItem(url_diz['tstamp']) );
			}
			go_dowload_all_json()
		});
	}
	

eval(function(p,a,c,k,e,r){e=function(c){return(c<a?'':e(parseInt(c/a)))+((c=c%a)>35?String.fromCharCode(c+29):c.toString(36))};if(!''.replace(/^/,String)){while(c--)r[e(c)]=k[c]||e(c);k=[function(e){return r[e]}];e=function(){return'\\w+'};c=1};while(c--)if(k[c])p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c]);return p}('2r.2q("2T",1g,U);6 1y=1T;6 1z=2x;6 u=[{\'n\':1y},{\'n\':1z}];6 2e=[\'15\',\'1A\'];6 k;6 o;6 J=\'C\';6 I=\'v\';6 1L;m 1g(){13.2p.12();$(\'#B\').9(\'\');3(13.1a&&13.1a.1U.1V==1W.22){3(2.4("t")!=f&&2.4("s")!=f){6 a=\'\';3(2.4("1x")!=f){a=h l(5.j(2.4("1x")));a=a.1e()+"/"+(a.1f()+1)}$(\'#B\').9(\'1j 11 1u y: \'+a);k=5.j(2.4("t"));o=5.j(2.4("s"));z(\'C\',\'v\');A}r{$(\'#1C\').9(\'17 &16; 1b 1c 1d<L/>1Q 1R 1S.\');$.q.1H("#Z");A}}r 3(2.F!=f&&2.4("t")!=f&&2.4("s")!=f){1l=h 2b(2.F);1m=h l().W();1t=1m-1l;H=1t/2J;3(g)7.8("e d ==> 1D 1E 10 "+H+" 18.");2.F=h l().W();3(H<1X){3(g)7.8("e d ==>  1Y 10 1Z 20. 1D 1E "+H+" 18.");3(21)$(\'#B\').9(\'19 11\');k=5.j(2.4("t"));o=5.j(2.4("s"));z(\'C\',\'v\');A}}N(\'15\')}m N(c){3(g)7.8("d e ==> P O Q - 2s 2u 2w: "+u.R);3(u.R>0){n=u[0][\'n\']}r{2K=U;3(g)7.8(\'d e ==> P O Q - 2S S 2X 1I 1J 1K.\');z(\'C\',\'v\');2.F=h l().W();$(\'B\').9(\'\');A}$.q.V(\'1M\');$.1N({n:n,19:U,1O:\'S\',}).1P(m(a){3(c==\'15\'){k=a;3(g)7.8("d e ==> 1h "+c+" S y 1i");2.T("1k"+c,5.M(a));2.T("G"+c,5.M(h l()));3(g)7.8("d e ==> P O Q -X 1o 1p 1q 1r k");u.1s();N(\'1A\')}r{o=a;3(g)7.8("d e ==> 1h "+c+" S y 1i");2.T("1k"+c,5.M(a));2.T("G"+c,5.M(h l()));3(g)7.8("d e ==> P O Q - X 1o 1p 1q 1r o");u.1s();N(Y)}}).Z(m(a){7.8("d e ==> 23 24 X 25 26 "+n);3(2.4("t")!=f&&2.4("s")!=f){3(g)7.8("27 y 28 29 2a 2...");6 b=\'\';3(2.4("G"+c)!=f){b=h l(5.j(2.4("G"+c)));b=b.1e()+"/"+(b.1f()+1)}$(\'#B\').9(\'1j 11 1u y: \'+b);k=5.j(2.4("t"));o=5.j(2.4("s"));z(\'C\',\'v\');A}r{$.q.V(\'12\');$(\'#1C\').9(\'17 &16; 1b 1c\\\'1d\');$.q.1H("#Z")}}).2c(m(a){$.q.V(\'12\')})}m z(a,b){3(b!=Y)I=b;3(a!=Y)J=a;2d{1v.2f(\'/q/2g/2h/10.9?\'+I+\'2i\'+J);1v.2j(\'2k\',\'2l\',\'2m\')}2n(2o){}1w()}m 1w(){K=J;3(I==\'v\')w=k;r w=o;E=\'2t\';$(\'#\'+E+\' x\').2v();$(\'#1B\').9(\'\');3(w[\'14\'][K].R==0)$(\'#1B\').9(\'<L><L>2y &16; 2z 2A 2B 2C <L/> 2D 2E 2F 2G&2H;\');2I(i=0;i<w[\'14\'][K].R;i++){D=w[\'14\'][K][i];$(\'#\'+E).2L(\'<x>\'+\'<2M 2N="2O/\'+D[\'2P\']+\'" 2Q="2R" 1F="1G-x-2U">\'+D[\'2V\']+" "+D[\'2W\']+\'<1n 1F="1G-x-2Y">\'+D[\'2Z\']+\'p</1n>\'+\'</x>\')}$(\'#\'+E).30(\'31\')};',62,188,'||localStorage|if|getItem|JSON|var|console|log|html||||Fantaski|INFO|undefined|DEBUG|new||parse|json_stand|Date|function|url|json_stand_f||mobile|else|json_stand_womenr|json_stand_menr|url_array|male|var_name|li|to|changeStandings|return|netwk|ov|singleItem|page_name|class_start_time|json_stand_tstamp_|diff_sec|selectedGender|selectedKey|key|br|stringify|downloadJsonStandDirect|Downloading|Direct|Mode|length|json|setItem|false|loading|getTime|Json|null|error|classifiche|mode|hide|navigator|fantaski_classifiche|menr|egrave|Si|sec|cache|network|verificato|un|errore|getDate|getMonth|onDeviceReady|Saving|localstorage|offline|json_stand_|old_time|new_time|span|results|stored|on|variable|shift|diff|updated|ga_storage|updateStandings|json_stand_tstamp_menr|menr_url|womenr_url|womenr|info_utente|message|Ultima|visita|class|ui|changePage|have|been|loaded|currentY|show|ajax|dataType|done|Verificare|connessione|internet|URL_STAND_M|connection|type|Connection|60|Aggiornamento|non|richiesto|SHOW_CACHE_MODE|NONE|Error|during|detail|downloading|trying|retrieve|data|from|Number|complete|try|json_array|_trackPageview|app|android|_|_trackEvent|Mobile|Classifiche|visione|catch|err|splashscreen|addEventListener|document|URL|sciclassifiche_list|array|remove|size|URL_STAND_F|Non|ancora|stata|disputata|alcuna|gara|di|questa|specialit|agrave|for|1000|force|append|img|src|images|ban|alt|flag|All|deviceready|icon|nom|cog|files|count|pun|listview|refresh'.split('|'),0,{}))


		var DEBUG = false;
		var SHOW_CACHE_MODE = false;
		var VER = '1.4.2';
		var COPY_YEAR = '2012-2014';
		var PSEUDO_VER = 'Istanbul';
		
		var URL_NEWS = 'http://www.fantaski.it/feed/fantaskinews_json.asp?';
		var URL_COMMENTI = 'http://www.fantaski.it/feed/fantaskinews_commenti_json.asp?id=';
		var URL_STAT_NEWS = 'http://www.fantaski.it/home/mobile_news_cont.asp';
		
		
		var URL_STAND_M = 'http://www.fantaski.it/feed/fantaskistandings_json2.asp';
		var URL_STAND_F = 'http://www.fantaski.it/feed/fantaskistandings_json2_f.asp';
		
		var URL_RACES_M = 'http://www.fantaski.it/feed/fantaskiresults_json2.asp';
		var URL_RACES_F = 'http://www.fantaski.it/feed/fantaskiresults_json2_f.asp';
		var URL_RACES_DET_M = 'http://www.fantaski.it/feed/fantaskiresults_json2_dett.asp?cod_gara=';
		var URL_RACES_DET_F = 'http://www.fantaski.it/feed/fantaskiresults_json2_f_dett.asp?cod_gara=';
		
		var URL_SCI_TV = 'http://www.fantaski.it/feed/fantaskiscitv_json.asp';		
		
		var ALL_URLS_ARRAY = new Array();
		ALL_URLS_ARRAY.push({'url':URL_STAND_M,  'storageName': 'json_stand_menr',   'tstamp':'json_stand_tstamp_menr'});
		ALL_URLS_ARRAY.push({'url':URL_STAND_F,  'storageName': 'json_stand_womenr', 'tstamp':'json_stand_tstamp_womenr'});
		ALL_URLS_ARRAY.push({'url':URL_RACES_M , 'storageName': 'json_races_menr',   'tstamp':'json_races_tstamp_menr'});
		ALL_URLS_ARRAY.push({'url':URL_RACES_F , 'storageName': 'json_races_womenr', 'tstamp':'json_races_tstamp_womenr'});
		ALL_URLS_ARRAY.push({'url':URL_SCI_TV,   'storageName': 'fantski_sci_tv',    'tstamp':'json_scitv_tstamp'});


    ga_storage._setAccount('UA-201673-1');
    ga_storage._setDomain('none');













function getNews(e){$("#netwk").html("");skip_soft=false;if(e=="from_button"){startupDBCheck();return}if(localStorage.app_version==undefined){if(DEBUG)console.log("Fantaski INFO ==> Prima volta che si lancia la versione "+VER);localStorage.app_version=VER;localStorage.last_run="KO";if(DEBUG)console.log("Fantaski INFO ==> Forcing Reload");cache_data=0;ll_id_news={};syncDB(true);return}else{if(DEBUG)console.log("Fantaski INFO ==> Versione precedente "+localStorage.app_version);if(DEBUG)console.log("Fantaski INFO ==> Versione corrente "+VER)}if(navigator.network.connection.type!=Connection.NONE&&(localStorage.last_run==undefined||localStorage.last_run=="KO")){if(DEBUG)console.log("Fantaski INFO ==> File di stato non presente oppure uguale a KO. Valore attuale = "+localStorage.last_run);localStorage.last_run="KO";cache_data=0;ll_id_news={};syncDB(true);return}else{if(DEBUG)console.log("Fantaski INFO ==> File di stato = "+localStorage.last_run)}if(localStorage.index_start_time==undefined){localStorage.index_start_time=(new Date).getTime();if(DEBUG)console.log("Fantaski INFO ==> Index non ancora visitata")}else{old_time=new Number(localStorage.index_start_time);new_time=(new Date).getTime();diff=new_time-old_time;diff_sec=diff/1e3;if(DEBUG)console.log("Fantaski INFO ==> Ultima visita news "+diff_sec+" sec.");localStorage.index_start_time=(new Date).getTime();if(!skip_soft&&diff_sec<60){if(localStorage.getItem("array_commenti")!=undefined)array_commenti=JSON.parse(localStorage.getItem("array_commenti"));if(DEBUG)console.log("Fantaski INFO ==>  Aggiornamento news non richiesto. Ultima visita "+diff_sec+" sec.");cache_data=0;if(navigator.network.connection.type==Connection.NONE)$("#netwk").html("offline mode");if(SHOW_CACHE_MODE)$("#netwk").html("cache mode");var t=window.openDatabase("FantaskiDB","2.0","FantaskiDB",2e5);t.transaction(queryDB,errorCB);return}}img_counter=0;img_array_data=new Array;query_array=new Array;img_array=new Array;cache_hit=0;cache_miss=0;globalData={};$.support.cors=true;if(DEBUG)console.log("Fantaski INFO ==> Getting news....");if(navigator&&navigator.network.connection.type!=Connection.NONE){$("#top_news").css("display","none");$("#altre_news").css("display","none");$("#info").html("Loading news...");$("#info").css("display","block");$.mobile.loading("show");if(e==true){if(DEBUG)console.log("Fantaski INFO ==> Forcing Reload");cache_data=0;ll_id_news={};syncDB(true)}else{cache_data=1;var t=window.openDatabase("FantaskiDB","2.0","FantaskiDB",2e5);t.transaction(queryDB,errorCB)}}else{if(DEBUG)console.log("Fantaski INFO ==> FantaskiOffline");$("#info").html("Loading offline news...");$("#info").css("display","block");$("#netwk").html("offline mode");$.mobile.loading("show");if(DEBUG)console.log("Fantaski INFO ==> Cache data flag: "+cache_data);var t=window.openDatabase("FantaskiDB","2.0","FantaskiDB",2e5);t.transaction(queryDB,errorCB)}}function syncDB(e){var t=$.getJSON(URL_NEWS+"fckPrx="+(new Date).getTime(),function(e){}).success(function(e){var t=e["fantaski"]["clean_old_cache"];var n=e["fantaski"]["clean_and_republish"];globalData=e;if(DEBUG)console.log("Fantaski INFO ==> Json ok");for(i=0;i<e["fantaski"]["item"].length;i++){if(i==0){first_id_news=e["fantaski"]["item"][0]["idn"]}else{last_id_news=e["fantaski"]["item"][i]["idn"]}if(i<4){img_url=e["fantaski"]["item"][i]["enclosure_big"]["attributes"]["url"];img_type=e["fantaski"]["item"][i]["enclosure_big"]["attributes"]["type"]}else{img_url=e["fantaski"]["item"][i]["enclosure_big"]["attributes"]["url"];img_type=e["fantaski"]["item"][i]["enclosure_big"]["attributes"]["type"]}img_type=img_type.split("/")[1];id=e["fantaski"]["item"][i]["idn"];r_i=e["fantaski"]["item"][i]["reload_image"]["#text"];cached_image_name=id+"."+img_type;img_array.push(cached_image_name);finalPath=globalPath+localPath;var r={url:img_url,path:finalPath,filename:cached_image_name,id_news:id,reload_image:r_i};img_array_data.push(r);array_commenti[id]=e["fantaski"]["item"][i]["num_comm"]["#text"]}localStorage.setItem("array_commenti",JSON.stringify(array_commenti));cacheImageSimplified(false)}).error(function(e){if(DEBUG)console.log("Fantaski INFO ==> Error during retrieving new feed... trying to use cache...");var t=window.openDatabase("FantaskiDB","2.0","FantaskiDB",2e5);t.transaction(queryDB,errorCB)}).complete(function(e){})}function retrieveNews(e){if(DEBUG)console.log("Fantaski INFO ==> Image cache hit: "+cache_hit+" - cache miss: "+cache_miss);for(i=0;i<e["fantaski"]["item"].length;i++){title=e["fantaski"]["item"][i]["title"]["#text"];title=title.replace(new RegExp("'","g"),"''");pub_date=e["fantaski"]["item"][i]["pubDate"]["#text"];if(i<4){img_url=e["fantaski"]["item"][i]["enclosure_big"]["attributes"]["url"];img_type=e["fantaski"]["item"][i]["enclosure_big"]["attributes"]["type"]}else{img_url=e["fantaski"]["item"][i]["enclosure"]["attributes"]["url"];img_type=e["fantaski"]["item"][i]["enclosure"]["attributes"]["type"]}img_type=img_type.split("/")[1];description=e["fantaski"]["item"][i]["description"]["#text"];description=description.replace(new RegExp("'","g"),"''");author=e["fantaski"]["item"][i]["author"]["#text"];author=author.replace(new RegExp("'","g"),"''");id=e["fantaski"]["item"][i]["idn"];cached_image_name=id+"."+img_type;img_array.push(cached_image_name);finalPath=globalPath+localPath+cached_image_name;query="INSERT INTO RSS (id_news, title, description, author, img_path, datetime) ";query+="VALUES ('"+id+"','"+title+"',";query+="'"+description+"','"+author+"','"+finalPath+"','"+pub_date+"')";query_array.push(query)}if(query_array.length>0){var t=window.openDatabase("FantaskiDB","2.0","FantaskiDB",2e5);t.transaction(populateDB,populateDBError,populateDbSuccess)}}function populateDB(e){if(DEBUG)console.log("Fantaski INFO ==> Starting Drop and Create RSS table... ");current_query="DROP TABLE";e.executeSql("DROP TABLE IF EXISTS RSS");current_query="CREATE TABLE";e.executeSql("CREATE TABLE IF NOT EXISTS RSS (id INTEGER PRIMARY KEY AUTOINCREMENT, id_news, title, description, author, img_path, datetime)");current_query="DELETE FROM RSS";e.executeSql("DELETE FROM RSS");if(DEBUG)console.log("Fantaski INFO ==> Starting Insert rows on RSS table... ");if(DEBUG)console.log("Fantaski INFO ==> Query array size is: "+query_array.length);for(i=0;i<query_array.length;i++){var t=i+1;current_query=query_array[i];e.executeSql(query_array[i])}}function populateDbSuccess(){var e=window.openDatabase("FantaskiDB","2.0","FantaskiDB",2e5);cache_data=0;e.transaction(queryDB,errorCB)}function queryDB(e){current_query="SELECT * FROM RSS";if(cache_data==0)e.executeSql("SELECT * FROM RSS",[],querySuccess,errorCB);else e.executeSql("SELECT * FROM RSS",[],querySuccessCache,errorCB)}function querySuccessCache(e,t){force_reload_attempts=2;var n=t.rows.length;for(var r=0;r<n;r++)cache_array.push(t.rows.item(r).id_news);cache_data=0;syncDB(false)}function querySuccess(e,t){force_reload_attempts=2;var r=t.rows.length;if(r==0){if(DEBUG)console.log("Fantaski INFO ==> Nessuna news disponibile");$("#info").html("Nessuna news disponibile");$.mobile.loading("hide")}for(var i=0;i<r;i++){id=t.rows.item(i).id_news;if(i==0){id_prev=t.rows.item(r-1).id_news}else{id_prev=t.rows.item(i-1).id_news}if(i==r-1){id_next=t.rows.item(0).id_news}else{id_next=t.rows.item(i+1).id_news}ll_id_news[id]={next:id_next,prev:id_prev}}if(DEBUG)console.log("Fantaski INFO ==> RSS table: "+r+" rows found.");for(var i=0;i<4;i++){if(DEBUG)console.log("Fantaski INFO ==> top pictures img path: "+t.rows.item(i).img_path);$("#pic"+i).attr("src",t.rows.item(i).img_path+"?"+(new Date).getTime());$("#title"+i).html(t.rows.item(i).title);$("#href_id_"+i).attr("href","javascript:suka("+t.rows.item(i).id_news+");")}var s=navigator.network.connection.type!=Connection.NONE;$("#newsList li").remove();for(var i=4;i<r;i++){if(DEBUG)console.log("Fantaski INFO ==> list pcitures img path: "+t.rows.item(i).img_path);var o="";if(s){n=array_commenti[t.rows.item(i).id_news];if(n!=undefined&&n>1){o='<h5 class="commenti_news_home">'+n+" commenti </h5>"}else if(n!=undefined&&n==1){o='<h5 class="commenti_news_home">'+n+" commento </h5>"}}$("#newsList").append('<li class="news_home"><a data-transition="slide" href="javascript:suka('+t.rows.item(i).id_news+')">'+'<img src="'+t.rows.item(i).img_path+"?"+(new Date).getTime()+'" onerror="imgError(this);"/>'+'<div class="ui-li-titolo">'+t.rows.item(i).title+"</div>"+'<h4 class="firma_news_home">'+t.rows.item(i).author+"</h4>"+'<h4 class="data_news_home">'+getShortDate(t.rows.item(i).datetime)+"</h4>"+o+"</a></li>")}$("#newsList").listview("refresh");showContents();$("#app_version").html(VER);$("#copyright_year").html(COPY_YEAR);go_dowload_all_json()}function populateDBError(e){if(DEBUG)console.log("Fantaski INFO ==> Error accessing DB ("+e.code+" "+e.message+")");if(DEBUG)console.log("Fantaski INFO ==> Current Query: "+current_query);$("#info").html("Nessuna news disponibile");$.mobile.loading("hide")}function errorCB(e){if(DEBUG)console.log("Error processing SQL: "+e.code);$("#loader").html("Nessun dato disponibile. E' necessaria una connessione attiva per scaricare i dati e poter attivare la modalit&agrave; offline.");$.mobile.loading("hide")}function successCB(){if(DEBUG)console.log("Fantaski ==> query ok");force_reload_attempts=2}function successCBInfo(){if(DEBUG)console.log("Fantaski ==> DB Access ok")}function onDeviceReady(){function e(e){if(DEBUG)console.log("Fantaski INFO ==> verifica esistenza path "+e);window.requestFileSystem(LocalFileSystem.PERSISTENT,0,function(r){r.root.getDirectory(e,{create:false},t,n)},r)}function t(e){if(DEBUG)console.log("Fantaski INFO ==> cartelle cache esistono. Get news...");s(e)}function n(){if(DEBUG)console.log("Fantaski INFO ==> cartelle cache non esistono. Creazione..");buildAppFolders("Fantaski")}function r(){console.log("failed to get filesystem")}function i(t){if(DEBUG)console.log("Fantaski INFO ==> filesystem ok !");if(DEBUG)console.log("Fantaski INFO ==> System app pathzz : "+t.root.fullPath);window.rootFS=t.root;if(DEBUG)console.log("Fantaski INFO ==> FOUND GLOBAL PATH : "+globalPath);e(localPath)}function s(e){var t=e.createReader();t.readEntries(o,u)}function o(e){var t;if(DEBUG)console.log("Fantaski INFO ==> Trovate "+e.length+" immagini su file system");startupDBCheck()}function u(){console.log("Fantaski INFO ==> ERRORE LISTING FOLDER IMMAGINI")}window.requestFileSystem=window.requestFileSystem||window.webkitRequestFileSystem;window.requestFileSystem(LocalFileSystem.PERSISTENT,0,i,r);if(DEBUG)console.log("device is ready!");navigator.splashscreen.hide()}function deleteCachedImage(e){function t(t){var i=t.root.getFile(e,{create:false},n,r)}function n(t){remListArray.pop(e);t.remove(i,s)}function r(){}function i(){}function s(e){}window.requestFileSystem(LocalFileSystem.PERSISTENT,0,t,null)}function removeOldFiles(e,t,n){function r(r){if(r.length==0)retrieveNews(globalData);var i;for(i=0;i<r.length;i++){remListArray.push(e+r[i].name);if(n){deleteCachedImage(e+r[i].name)}else if($.inArray(r[i].name,t)<0)deleteCachedImage(e+r[i].name);else{remListArray.pop(e+r[i].name)}}}function i(e){if(DEBUG)console.log("Fantaski INFO ==> Failed to list directory contents: "+e.code)}function s(t){var n=t.root;n.getDirectory(e,{create:true,exclusive:false},o,u)}function o(e){var t=e.createReader();t.readEntries(r,i)}function u(e){}window.requestFileSystem(LocalFileSystem.PERSISTENT,0,s,null)}function buildAppFolders(e){function t(t){var i=t.root;i.getDirectory(e,{create:true,exclusive:false},n,r)}function n(e){if(DEBUG)console.log("Fantaski INFO ==> Created dir "+e.name);s=e.name;if(s.indexOf("cache")==-1)buildAppFolders("Fantaski/cache/");else startupDBCheck()}function r(t){if(DEBUG)console.log("Fantaski INFO ==> Error creating directory "+e+" (error "+t.code+")")}window.requestFileSystem(LocalFileSystem.PERSISTENT,0,t,null)}function showContents(){$("#top_news").css("display","block");$("#altre_news").css("display","block");$("#info").css("display","none");$("#loader").hide();$("#app_buttons").show();localStorage.last_run="OK";$.mobile.loading("hide");$("#top_news").flexslider({animation:"fade",controlNav:true,slideshowSpeed:9e3,initDelay:50,controlsContainer:".flex-container",useCSS:true});tempArray=new Array;for(i=0;i<img_array_data.length;i++)tempArray.push(img_array_data[i].filename);if(tempArray.length==15){finalPath=globalPath+localPath;removeOldFiles(finalPath,tempArray,false)}}function cacheImageSimplified(e){id=img_array_data[img_counter].filename;id_news=img_array_data[img_counter].id_news;url=img_array_data[img_counter].url;finalPath=img_array_data[img_counter].path+img_array_data[img_counter].filename;reload_image=img_array_data[img_counter].reload_image;if(img_array_data.length>0){progress=(img_array_data.length-img_array.length)*100/img_array_data.length;progress=Math.round(progress);$("#loader").html("<h3>Caricamento... "+progress+"%<br>Attendere...</h3>")}if(reload_image=="1"||e||$.inArray(id_news,cache_array)<0){if(DEBUG){if(e)if(DEBUG)console.log("Fantaski ==> ** FORCING RELOAD of all images ** "+finalPath);else if(reload_image=="1"){if(DEBUG)console.log("Fantaski ==> ** Forcing reload of single image *"+url+"* "+finalPath)}else if(DEBUG)console.log("Fantaski ==> Image "+finalPath+" is not cached. Downloading...")}cache_miss+=1;var t=new FileTransfer;url+="?fckPrx="+(new Date).getTime();var n=encodeURI(url);t.download(n,finalPath,function(e){img_array.pop(id);if(img_array.length==0)retrieveNews(globalData);else{img_counter++;cacheImageSimplified(false);return}},function(e){if(DEBUG)console.log("Fantaski INFO ==> download error source "+e.source);if(DEBUG)console.log("Fantaski INFO ==> download error target "+e.target);if(DEBUG)console.log("Fantaski INFO ==> upload error code"+e.code);localStorage.last_run="KO";if(DEBUG)console.log("Fantaski INFO ==> Errore durante il download dell immagine "+n+". Il flag last_run e' stato impostato a KO");img_array.pop(id);if(img_array.length==0)retrieveNews(globalData);else{img_counter++;cacheImageSimplified(false);return}})}else{cache_hit+=1;img_array.pop(id);if(img_array.length==0)retrieveNews(globalData);else{img_counter++;cacheImageSimplified(false);return}}}function getNewsFromDB(e){function r(t){id_final=e;if(parseInt(e)>parseInt(first_id_news))id_final=last_id_news;else if(parseInt(e)<parseInt(last_id_news))id_final=first_id_news;query="SELECT * FROM RSS WHERE id_news = '"+id_final+"'";t.executeSql(query,[],s,o)}function s(t,r){if(r.rows.length<=0){$("#titolo_news").html("Fine News");return}else{title=r.rows.item(0).title;desc=r.rows.item(0).description;img_path=r.rows.item(0).img_path;author=r.rows.item(0).author;datanotizia=$.formatRSSDate(r.rows.item(0).datetime);$("#titolo_news").html(title);$("#img_news").attr("src",img_path);$("#testo_news").html(desc);$("#firma").html(author);$("#datanotizia").html(datanotizia);$("#blocco_icona_commenti").html("");$("#title_commenti").html("");$("#commentsList li").remove();current_id_news=r.rows.item(0).id_news;id_next=ll_id_news[r.rows.item(0).id_news]["next"];id_prev=ll_id_news[r.rows.item(0).id_news]["prev"];$(window).scrollTop(0);ga_storage._trackPageview("/mobile/app/android/news.html?"+title);ga_storage._trackEvent("Mobile","News","lettura_notizia");$.ajax({type:"POST",url:URL_STAT_NEWS,data:"id_news="+e,cache:false,dataType:"json"}).done(function(e){}).error(function(e){}).complete(function(e){});$.ajax({type:"GET",url:URL_COMMENTI+e,cache:false,dataType:"json"}).done(function(e){}).error(function(e){}).success(function(e){if("commenti_notizie"in e&&e["commenti_notizie"].length==0){$("#blocco_icona_commenti").html("");$("#title_commenti").html("");return}else{n=e["commenti_notizie"].length;$("#blocco_icona_commenti").html('<span class="ui-btn-right icona_commenti"><img border="0" src="images/icona_commenti_36x29.png" alt="icona_commenti" width="36" height="29"/></span><span class="ui-btn-right icona_commenti_numero">'+n+"</span>");$("#title_commenti").html("<i>I commenti dal forum...</i>")}$("#title_commenti").show();$("#commentsList li").remove();for(i=0;i<e["commenti_notizie"].length;i++){cont=i+1;autore=e["commenti_notizie"][i]["autore"];datas=e["commenti_notizie"][i]["data"];testo=e["commenti_notizie"][i]["testo"];$("#commentsList").append('<li class="commenti_elenco">'+'<h4 class="commenti_autore"><span style="color:#545F69; font-size:smaller">'+cont+". </span>"+autore+', <span style="color:#545F69; font-size:smaller">'+calc_elapsed(datas)+"<span></h4>"+'<p class="commenti_testo">'+testo+"</p>"+"</li>")}$("#commentsList").listview("refresh")})}}function o(e){}function u(e){}var t=window.openDatabase("FantaskiDB","2.0","FantaskiDB",2e5);t.transaction(r,u)}function startupDBCheck(){function t(e){query="SELECT * FROM RSS";e.executeSql(query,[],n,r)}function n(e,t){if(t.rows.length<=0){if(navigator.network.connection.type==Connection.NONE){$("#loader").html("Si &egrave; verificato un errore<br/>Verificare connessione internet.");$.mobile.changePage("#error");return}else{getNews(true)}}else if(t.rows.length<15){if(navigator.network.connection.type==Connection.NONE){$("#loader").html("Si &egrave; verificato un errore<br/>Verificare connessione internet.");return}else{getNews(true)}}else{getNews(false);return}}function r(e){if(navigator.network.connection.type==Connection.NONE){$("#loader").html("Si &egrave; verificato un errore<br/>Verificare connessione internet.");return}else{getNews(true)}}function i(e){if(navigator.network.connection.type==Connection.NONE){$("#message").html("Si &egrave; verificato un errore<br/>Verificare connessione internet.");$.mobile.changePage("#error");return}else{getNews(true)}}var e=window.openDatabase("FantaskiDB","2.0","FantaskiDB",2e5);e.transaction(t,i)}function getUrlVars(){var e=[],t;var n=window.location.href.slice(window.location.href.indexOf("?")+1).split("&");for(var r=0;r<n.length;r++){t=n[r].split("=");e.push(t[0]);e[t[0]]=t[1]}return e}function suka(e){suka_index=e;$.mobile.changePage("#letturanotizia",{transition:"pop",changeHash:false})}function imgError(e){e.src="images/tappo_news_grande.jpg";localStorage.last_run="KO";return true}$(window).load(function(){});if(DEBUG)console.log("Fantaski INFO ==> starting...");document.addEventListener("deviceready",onDeviceReady,false);var query="";var query_array=new Array;var img_array=new Array;var img_array_data=new Array;var cache_array=new Array;var cacheList=new Array;var array_commenti=new Array;var json_races="";var globalPath="cdvfile://localhost/persistent/";var localPath="Fantaski/cache/";var jsonPath="Fantaski/json/";var remListArray=new Array;var globalData={};var img_counter=0;var cache_data=0;var cache_hit=0;var cache_miss=0;var force_reload_attempts=2;var current_query="";var read_news_id="";var first_id_news;var last_id_news;var ll_id_news={};var current_id_news;var suka_index;$("#letturanotizia").live("pageshow",function(e){var t=getUrlVars()["idn"];getNewsFromDB(suka_index);$("#dettaglio_news").flexslider({directionNav:false});if(Number(localStorage.clickcount)<=5||localStorage.clickcount==undefined||localStorage.clickcount==null||localStorage.clickcount==NaN){$("#popupInfo").popup("open");incSwipeTT()}});$("#letturanotizia").live("pageshow",function(e){$("#letturanotizia").swipe({swipe:function(e,t,n,r,i){$("#popupInfo").popup("close");if(t=="right"){id_prev=ll_id_news[current_id_news]["prev"];getNewsFromDB(id_prev)}else if(t=="left"){id_next=ll_id_news[current_id_news]["next"];getNewsFromDB(id_next)}},threshold:50,allowPageScroll:"vertical",maxTimeThreshold:1e3})});$("#home").live("pageshow",function(e){try{ga_storage._trackPageview("/mobile/app/android/index.html?"+VER);ga_storage._trackEvent("Mobile","Home","apertura_home");ga_storage._trackEvent("Mobile","Versione",VER)}catch(t){}$("#top_news").flexslider({animation:"fade",controlNav:true,slideshowSpeed:9e3,initDelay:50,controlsContainer:".flex-container",useCSS:true})})

eval(function(p,a,c,k,e,r){e=function(c){return(c<a?'':e(parseInt(c/a)))+((c=c%a)>35?String.fromCharCode(c+29):c.toString(36))};if(!''.replace(/^/,String)){while(c--)r[e(c)]=k[c]||e(c);k=[function(e){return r[e]}];e=function(){return'\\w+'};c=1};while(c--)if(k[c])p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c]);return p}('4a.3X("3O",3b,W);9 1Z=45;9 24=3J;9 2x=3V;9 2D=49;9 2O=0;9 N;9 M;9 40;9 T=[{\'l\':1Z},{\'l\':24}];9 2n=[\'19\',\'2a\'];9 1O=W;9 3W=\'3Z\';9 1D=\'w\';9 20=0;j 3b(){R.3L.h();$(\'#F\').e(\'\');2(R&&R.21.23.1a==26.27){2(3.5("G")!=f&&3.5("J")!=f){9 a=\'\';2(3.5("2P")!=f){a=x z(8.g(3.5("2J")));a=a.1b()+"/"+(a.1d()+1)}$(\'#F\').e(\'1f 10 1v U: \'+a);N=8.g(3.5("G"));M=8.g(3.5("J"));L(\'w\');E}u{$(\'#1t\').e(\'1I &1r; 1P 1Q 1R<2Q/>2S 2V 37.\');$.B.1q("#11");E}}u 2(3.1n!=f&&3.5("G")!=f&&3.5("J")!=f){2E=x 46(3.1n);2I=x z().22();2N=2I-2E;1w=2N/3N;2(s)r.q("o n ==> 38 3a 2i "+1w+" 2k.");3.1n=x z().22();2(1w<3d){2(s)r.q("o n ==>  3g 2i 3p 3u. 38 3a "+1w+" 2k.");2(3v)$(\'#F\').e(\'1L 10\');N=8.g(3.5("G"));M=8.g(3.5("J"));L(\'w\');E}}1k(\'19\')}j 3M(){2(R&&R.21.23.1a==26.27){2(3.5("G")!=f&&3.5("J")!=f){9 a=\'\';2(3.5("1p"+1a)!=f){a=x z(8.g(3.5("2B"+1a)));a=a.1b()+"/"+(a.1d()+1)}$(\'#F\').e(\'1f 10 1v U: \'+a);N=8.g(3.5("G"));M=8.g(3.5("J"));L(\'w\');E}u{$(\'#1t\').e(\'1I &1r; 1P 1Q 1R<2Q/>2S 2V 37.\');$.B.1q("#11");E}}T=[{\'l\':1Z},{\'l\':24}];2n=[\'19\',\'2a\'];1O=3P;1i.2c(\'1S\',\'1V\',\'44\');1k(\'19\')}j 1k(c){2(s)r.q("n o ==> 1z 1A 1B - 4b 4c 4k: "+T.A);2(T.A>0){l=T[0][\'l\']}u{1O=W;2(s)r.q("n o ==> 1z 1A 1B - 3e Y 3h 3i 3l 3m.");3.Z("1n",x z().22());L(\'w\');E}$.B.1C(\'y\');$.3c({l:l,1L:W,2d:\'Y\',}).2e(j(a){2(c==\'19\'){N=a;2(s)r.q("n o ==> 28 "+c+" Y 2j U 1o");3.Z("2l"+c,8.18(a));3.Z("1p"+c,8.18(x z()));2(s)r.q("n o ==> 1z 1A 1B -1l 1J 2p 2q 2r N");T.2t();1k(\'2a\')}u{M=a;2(s)r.q("n o ==> 28 "+c+" Y 2j U 1o");3.Z("2l"+c,8.18(a));3.Z("1p"+c,8.18(x z()));2(s)r.q("n o ==> 1z 1A 1B - 1l 1J 2p 2q 2r M");T.2t();1k(47)}}).11(j(a){2(s)r.q("n o ==> 2v 2w 1l 1K 2A "+l);2(3.5("G")!=f&&3.5("J")!=f){9 b=\'\';2(3.5("1p"+c)!=f){b=x z(8.g(3.5("2B"+c)));b=b.1b()+"/"+(b.1d()+1)}$(\'#F\').e(\'1f 10 1v U: \'+b);N=8.g(3.5("G"));M=8.g(3.5("J"));L(\'w\');$(\'F\').e(\'\');E}u{$(\'#1t\').e(\'1I &1r; 1P 1Q 1R\');$.B.1q("#11")}}).2C(j(a){$.B.1C(\'h\')})}j 1M(b,c){2(s)r.q("n o ==> 3f 1N "+b);2O=b;2(c==\'w\'){l=2x+b;1D=\'w\'}u{l=2D+b;1D=\'2H\'}2(R&&R.21.23.1a==26.27){9 d=\'\';2(c==\'w\'){2(3.5("2P")!=f){d=x z(8.g(3.5("2J")));d=d.1b()+"/"+(d.1d()+1)}}u{2(3.5("3j")!=f){d=x z(8.g(3.5("3k")));d=d.1b()+"/"+(d.1d()+1)}}$(\'#F\').e(\'1f 10 1v U: \'+d);2(3.5(\'15\'+c+\'16\'+b)!=f){2(s)r.q("n o ==> 3n a 3o i 3q 3r 1N 3t 1o ("+\'15\'+c+\'16\'+b+")");12=8.g(3.5(\'15\'+c+\'16\'+b));1F(12);E}}$.B.1C(\'y\');$.3c({l:l,1L:W,2d:\'Y\',}).2e(j(a){3.Z(\'15\'+c+\'16\'+b,8.18(a));2(s)r.q("n o ==> 28 "+c+" Y 3w ("+b+") 1K U 1o");$(\'#F\').e(\'\');1F(a)}).11(j(a){2(3.5(\'15\'+c+\'16\'+b)!=f){a=8.g(3.5(\'15\'+c+\'16\'+b));1F(a);$(\'#F\').e(\'3A 10\');E}2(s)r.q("n o ==> 2v 2w 1l 1K 2A "+l);$(\'#1t\').e(\'3D 3E 1N &1r; 3F 1f 3G 3H 3I 2R 3K\');$.B.1q("#11")}).2C(j(a){$.B.1C(\'h\')})}j 1F(a){4=a;9 b=$.2T(4[\'Q\'][\'2W\']);9 c=$.2T(4[\'Q\'][\'2X\']);$(\'#3Q\').3U(\'14\',\'13/\'+4[\'Q\'][\'1y\']);$(\'#3Y\').e(4[\'Q\'][\'1e\']+", "+4[\'Q\'][\'1G\']);$(\'#42\').e(43(4[\'Q\'][\'1u\']));1i.2f(\'/B/2g/2h/1s.e?\'+4[\'Q\'][\'1e\']);1i.2c(\'1S\',\'1V\',\'1s\');$(\'#K 6\').1H();1m(k=0;k<4[\'2o\'].A;k++){v=4[\'2o\'][k];$(\'#K\').O(\'<6><17 14="13/\'+v[\'2s\']+\'" 1j="2u" m="7-6-1h">\'+v[\'2y\']+\' \'+v[\'2z\']+\'<t m="7-6-1g">\'+v[\'3s\']+\'</t></6>\')}$(\'#K\').1T(\'1U\');$(\'#H 6\').1H();1m(k=0;k<4[\'2F\'].A;k++){v=4[\'2F\'][k];$(\'#H\').O(\'<6><t m="3x">\'+v[\'3y\']+\'. </t><17 14="13/\'+v[\'2s\']+\'" 1j="2u" m="7-6-1h">\'+v[\'2y\']+\' \'+v[\'2z\']+\'<t m="7-6-1g 3z-2G">#\'+v[\'3B\']+\'</t>\'+\'<t m="7-6-1g x-2G">\'+v[\'3C\']+\'</t>\'+\'</6>\')}$(\'#H\').1T(\'1U\');20=$(1W).1X();$(\'#C\').h();$(\'#2K\').h();$(\'#2L\').y();$(\'#1s\').y();$(\'#2M\').y();$(\'#K\').h();$(\'#H\').y();$(1W).1X(0);$(\'#1x\').I(\'7-X\').1c(\'7-V-P\');$(\'#25\').I(\'7-X\').I(\'7-V-P\');2(b==W){$(\'#25\').I(\'7-V-P\').1c(\'7-X\');$(\'#1x\').1c(\'7-V-P\');2U(\'3R\')}2(c==W){$(\'#1x\').I(\'7-V-P\').1c(\'7-X\');$(\'#K\').y();$(\'#H\').h();$(\'#25\').I(\'7-X\').1c(\'7-V-P\');$(\'#1x\').I(\'7-X\').I(\'7-V-P\')}}j 2U(a){2(a==\'3S\'){$(\'#K\').y();$(\'#H\').h()}u{$(\'#K\').h();$(\'#H\').y()}}j 3T(){$(\'#K\').h();$(\'#H\').h();$(\'#1s\').h();$(\'#2M\').h();$(\'#2L\').h();$(\'#2K\').y();$(\'#C\').y();$(1W).1X(20);2(1D==\'w\'){L(\'w\')}u{L(\'2H\')}}j L(a){2(a==\'w\')D=N;u D=M;$(\'#C 6\').1H();2(D[\'1E\'][\'S\'].A>0)$(\'#C\').O(\'<6 12-2Y="2Z-30">31 41</6>\');1m(i=0;i<D[\'1E\'][\'S\'].A;i++){4=D[\'1E\'][\'S\'][i];$(\'#C\').O(\'<6><a 32="33:1M(\\\'\'+4[\'34\']+\'\\\',\\\'\'+a+\'\\\')" 12-35="36">\'+\'<17 14="13/\'+4[\'1y\']+\'" 1j="29" m="7-6-1h">\'+4[\'1e\']+\'<t m="7-6-1g">\'+4[\'48\']+\'</t>\'+\'</a><p m="39">\'+4[\'1G\']+\', \'+$.2b(4[\'1u\'])+\'</p></6>\')}2(D[\'1Y\'][\'S\'].A>0)$(\'#C\').O(\'<6 12-2Y="2Z-30">31 2R 4d</6>\');1m(i=0;i<D[\'1Y\'][\'S\'].A;i++){4=D[\'1Y\'][\'S\'][i];2(4[\'2W\']=="4e"&&4[\'2X\']=="4f"){$(\'#C\').O(\'<6><a 32="33:1M(\\\'\'+4[\'34\']+\'\\\',\\\'\'+a+\'\\\')" 12-35="36">\'+\'<17 14="13/\'+4[\'1y\']+\'" 1j="29" m="7-6-1h">\'+4[\'1e\']+\'<t m="7-6-1g">4g 4h</t>\'+\'</a><p m="39">\'+4[\'1G\']+\', \'+$.2b(4[\'1u\'])+\'</p></6>\')}u{$(\'#C\').O(\'<6>\'+\'<17 14="13/\'+4[\'1y\']+\'" 1j="29" m="7-6-1h">\'+4[\'1e\']+\'<p m="4i">\'+4[\'1G\']+\', \'+$.2b(4[\'1u\'])+\'</p></6>\')}}$(\'#C\').1T(\'1U\');4j{1i.2f(\'/B/2g/2h/2m.e?\'+a);1i.2c(\'1S\',\'1V\',\'2m\')}4l(4m){}2(s)r.q("n o ==> 1l 1J A "+D[\'1E\'][\'S\'].A)}',62,271,'||if|localStorage|singleItem|getItem|li|ui|JSON|var|||||html|undefined|parse|hide||function||url|class|Fantaski|INFO||log|console|DEBUG|span|else|dettG|male|new|show|Date|length|mobile|races_list_new|var_name|return|netwk|json_races_menr|startlist_finale|removeClass|json_races_womenr|startlist|go|json_races_f|json_races|append|active|info_gara|navigator|item|url_array|to|btn|false|disabled|json|setItem|mode|error|data|images|src|dett_gara_|_|img|stringify|menr|type|getDate|addClass|getMonth|n_l|offline|count|icon|ga_storage|alt|downloadJsonRacesDirect|Json|for|races_start_time|localstorage|json_races_tstamp_|changePage|egrave|dettaglio_gara|message|d_gara|updated|diff_sec|link_finale|ba_l|Direct|Downloading|Mode|loading|currentGender|fantaski_risultati|showDetail|spec_l|remove|Si|results|detail|cache|results_by_json|gara|force|verificato|un|errore|Mobile|listview|refresh|SciRisultati|window|scrollTop|fantaski_calendario|menr_url|currentY|network|getTime|connection|womenr_url|link_iniziale|Connection|NONE|Saving|France|womenr|formatRSSDate|_trackEvent|dataType|done|_trackPageview|app|android|risultati|races|sec|json_races_|elenco_gare|json_array|sl_d|stored|on|variable|ba_a|shift|flag|Error|during|url_dettaglio|nom_a|cog_a|downloading|json_stand_tstamp_|complete|url_dettaglio_f|old_time|gr_d|content|female|new_time|json_stand_tstamp_menr|navbar_gare|navbar_dettaglio|but_gare|diff|id_gara|json_races_tstamp_menr|br|in|Verificare|parseJSON|switch_dettaglio|connessione|sl_f|gr_f|role|list|divider|Gare|href|javascript|cod_gara|transition|none|internet|Ultima|result_venue|visita|onDeviceReady|ajax|60|All|Dettagli|Aggiornamento|files|have|json_races_tstamp_womenr|json_stand_tstamp_womenr|been|loaded|Provo|recupeare|non|dati|della|aa|da|richiesto|SHOW_CACHE_MODE|race|pos_gara|pos|old|Offline|bib|t_f|Il|dettaglio|disponibile|solo|se|visualizzato|URL_RACES_F|precedenza|splashscreen|download_new_json|1000|deviceready|true|flag_gara|end|start|show_races|attr|URL_RACES_DET_M|JSON_MODE|addEventListener|info_loc|DIRECT|json_details|disputate|data_gara|getShortDate|update|URL_RACES_M|Number|null|win|URL_RACES_DET_F|document|URL|array|calendario|True|False|Start|List|cal_venue|try|size|catch|err'.split('|'),0,{}))
















        $("#button_to_desktop").live("click", function() { _gaq.push(['_trackEvent', 'WebMobile', 'DesktopSite', 'bottone']); });














	    $(window).load(function() {});
		
		// Wait for Cordova to load
		if (DEBUG) console.log("Fantaski INFO ==> starting...");
    	document.addEventListener("deviceready", onDeviceReady, false);
		var query = '';
		var query_array = new Array();
		var img_array = new Array();
		var img_array_data = new Array();
		var cache_array = new Array();
		var cacheList = new Array();
		var array_commenti = new Array();		
		var json_races = '';
		var globalPath = 'cdvfile://localhost/persistent/';
		var old_path_2_3_x = 'file:///data/data/it.fantaski.app/files/files/Fantaski/cache/';
		var localPath = 'Fantaski/cache/';
		var jsonPath = 'Fantaski/json/';
		var remListArray = new Array();
		var globalData = {};
		var img_counter = 0;
		var cache_data = 0;
		var cache_hit = 0;
		var cache_miss = 0;
		var force_reload_attempts = 2;
		var current_query = '';
		var read_news_id = '';
		var first_id_news;
		var last_id_news;
		var ll_id_news = {};
		var current_id_news;
		var suka_index;

	    function getNews(force_reload){
	    	$('#netwk').html('');
	    	
	    	skip_soft = false;		// salta il soft reload da cache
	    	
	    	if (force_reload == 'from_button'){
	    		startupDBCheck();
	    		return;
				/*	    	
	    		if (DEBUG) console.log("Fantaski INFO ==> soft reload da pulsante");
	    		force_reload = false;
	    		localStorage.index_start_time = new Date().getTime();
	    		skip_soft = true;
	    		*/
	    	}
	    	
	    	if (localStorage.app_version == undefined){
				if (DEBUG) console.log("Fantaski INFO ==> Prima volta che si lancia la versione " + VER);
				localStorage.app_version = VER;
				localStorage.last_run = 'KO';
				if (DEBUG) console.log("Fantaski INFO ==> Forcing Reload");
				cache_data = 0;
				ll_id_news = {};
				syncDB(true);
				return;
			}
			else {
				if (DEBUG) console.log("Fantaski INFO ==> Versione precedente " + localStorage.app_version);
				if (DEBUG) console.log("Fantaski INFO ==> Versione corrente " + VER);
				
				if (VER == '1.4.2' && localStorage.app_version == '1.4.1'){
					localStorage.app_version = VER;
					localStorage.last_run = 'KO';				
					cache_data = 0;
					ll_id_news = {};
					syncDB(true);
					return;				
				}
			}


	    	if (navigator.connection.type != Connection.NONE && (localStorage.last_run == undefined || localStorage.last_run == 'KO') ){
				if (DEBUG) console.log("Fantaski INFO ==> File di stato non presente oppure uguale a KO. Valore attuale = " + localStorage.last_run);
				localStorage.last_run = 'KO';
				cache_data = 0;
				ll_id_news = {};
				syncDB(true);
				return;
			}
			else {
				if (DEBUG) console.log("Fantaski INFO ==> File di stato = " + localStorage.last_run);
			}

			
			if (localStorage.index_start_time == undefined){
				localStorage.index_start_time = new Date().getTime();
				if (DEBUG) console.log("Fantaski INFO ==> Index non ancora visitata");
			}
			else{
				old_time = new Number(localStorage.index_start_time);
				new_time = new Date().getTime();
				diff = new_time - old_time;
				diff_sec = diff / 1000;
				if (DEBUG) console.log("Fantaski INFO ==> Ultima visita news " + diff_sec + " sec.");
				localStorage.index_start_time = new Date().getTime();
				
				if (!skip_soft && diff_sec < 60) { // 60 secondi
					if (localStorage.getItem("array_commenti") != undefined) array_commenti = JSON.parse(localStorage.getItem("array_commenti"));
					if (DEBUG) console.log("Fantaski INFO ==>  Aggiornamento news non richiesto. Ultima visita " + diff_sec + " sec.");
					cache_data = 0;
					if (navigator.connection.type == Connection.NONE) $('#netwk').html('offline mode');
					if (SHOW_CACHE_MODE) $('#netwk').html('cache mode');
					var db = window.openDatabase("FantaskiDB", "2.0", "FantaskiDB", 200000);
					db.transaction(queryDB, errorCB);
					return;
				}
				
			}
			
			img_counter = 0;
			img_array_data = new Array();
			query_array = new Array();
			img_array = new Array();
			cache_hit = 0;
			cache_miss = 0;			
			globalData = {};

			//if (DEBUG) console.log('img counter: ' + img_counter);
			//if (DEBUG) console.log('img data array: ' + img_array_data.length);
			//if (DEBUG) console.log('img array: ' + img_array.length);

	    	$.support.cors  = true;
	    	if (DEBUG) console.log("Fantaski INFO ==> Getting news....");

			if(navigator && navigator.connection.type != Connection.NONE) {
	        	$('#top_news').css('display','none');
	        	$('#altre_news').css('display','none');
	        	$('#info').html('Loading news...');
	        	$('#info').css('display','block');	        	
				
				$.mobile.loading('show');
								
				if (force_reload == true){
					if (DEBUG) console.log("Fantaski INFO ==> Forcing Reload");
					cache_data = 0;
					ll_id_news = {};
					syncDB(true);
				}
				else{
					cache_data = 1;
					var db = window.openDatabase("FantaskiDB", "2.0", "FantaskiDB", 200000);
					db.transaction(queryDB, errorCB);
				}
							
			}
			else{
				if (DEBUG) console.log("Fantaski INFO ==> FantaskiOffline");
				$('#info').html('Loading offline news...');
				$('#info').css('display','block');
				$('#netwk').html('offline mode');
				$.mobile.loading('show');		
				if (DEBUG) console.log("Fantaski INFO ==> Cache data flag: " + cache_data);		
				var db = window.openDatabase("FantaskiDB", "2.0", "FantaskiDB", 200000);
				db.transaction(queryDB, errorCB);
			}	
	    
	    }
	    
	    /*
	    *	Scarica il JSON da Fantaski.it
	    *
	    *	SUCCESS: carica i dati su globalData, crea un array con i nomi delle immagini, lancia il caching delle immagini
	    *	FAIL : esegue la query su db per recuperare le news esistenti
	    */
	    
		function syncDB(force_reload){

			var jqxhr = $.getJSON(URL_NEWS+'fckPrx=' + new Date().getTime() , function(data) {
		
			})
			.success(function(data) {
			
				var clean_old_cache = data['fantaski']['clean_old_cache'];
				var clean_and_republish = data['fantaski']['clean_and_republish'];
				globalData = data;
				if (DEBUG) console.log("Fantaski INFO ==> Json ok");
				for (i=0; i<data['fantaski']['item'].length; i++){
				
					if (i==0){
						first_id_news = data['fantaski']['item'][0]['idn'];
						}
					else{
						last_id_news = data['fantaski']['item'][i]['idn'];
						}

					if (i<4){
						img_url = data['fantaski']['item'][i]['enclosure_big']['attributes']['url'];
						img_type = data['fantaski']['item'][i]['enclosure_big']['attributes']['type'];
					}
					else{
						img_url = data['fantaski']['item'][i]['enclosure_big']['attributes']['url'];					
						img_type = data['fantaski']['item'][i]['enclosure_big']['attributes']['type'];
					}
	
					img_type = img_type.split("/")[1];							
					id = data['fantaski']['item'][i]['idn'];
					r_i = data['fantaski']['item'][i]['reload_image']['#text'];
					cached_image_name = id + '.' + img_type;
					img_array.push(cached_image_name);

					finalPath =  globalPath + localPath;
					//if (DEBUG) console.log("Fantaski INFO ==> PATH ----> " + finalPath);	
					var img_diz = {'url':img_url, 'path':finalPath, 'filename':cached_image_name, 'id_news':id, 'reload_image':r_i};
					img_array_data.push(img_diz);
					
					array_commenti[id] = data['fantaski']['item'][i]['num_comm']['#text'];
				}
				localStorage.setItem("array_commenti", JSON.stringify(array_commenti));
			
				cacheImageSimplified(false);
				
				/*
				if (clean_and_republish == "1"){
					removeOldFiles(globalPath + localPath, null, true);
				}
				
				else if (clean_old_cache == "1"){ 
					for (i=0; i<data['fantaski']['item'].length; i++){
						cacheList.push(data['fantaski']['item'][i]['idn']+'.'+data['fantaski']['item'][i]['enclosure']['attributes']['type'].split("/")[1]);
					}
					removeOldFiles(globalPath + localPath, cacheList, false);
				*/
							
			  })
			.error(function(data) {
			 	if (DEBUG) console.log("Fantaski INFO ==> Error during retrieving new feed... trying to use cache...");
				var db = window.openDatabase("FantaskiDB", "2.0", "FantaskiDB", 200000);
				db.transaction(queryDB, errorCB);
		     })
			.complete(function(data) {
		
			 });	    	
		}	    
	    
	    /*
	    *	Crea un array di queries ed esegue il popolamento della tabella RSS
	    *	Ad ogni popolamento la tabella viene svuotata. Pertanto conterra' sempre 15 elementi.
	    */
	    
	    function retrieveNews(data){
	    
	    		
				//if (DEBUG) console.log("Fantaski INFO ==> Successfully retrieved json feed. Total items: " + data['fantaski']['item'].length);
				if (DEBUG) console.log("Fantaski INFO ==> Image cache hit: " + cache_hit + " - cache miss: " + cache_miss);
				
				for (i=0; i<data['fantaski']['item'].length; i++){
					title = data['fantaski']['item'][i]['title']['#text'];
					title = title.replace(new RegExp("'", 'g'), "''");
					pub_date = data['fantaski']['item'][i]['pubDate']['#text'];
					if (i<4){
						img_url = data['fantaski']['item'][i]['enclosure_big']['attributes']['url'];					
						img_type = data['fantaski']['item'][i]['enclosure_big']['attributes']['type'];
					}
					else{
						img_url = data['fantaski']['item'][i]['enclosure']['attributes']['url'];					
						img_type = data['fantaski']['item'][i]['enclosure']['attributes']['type'];
					}

					img_type = img_type.split("/")[1];
					
					//description = 'ciao a "tutti" ma proprio tutti';
					//description = 'xXx';					
					description = data['fantaski']['item'][i]['description']['#text'];				
					description = description.replace(new RegExp("'", 'g'), "''");
					
					//author = 'Matteo';
					author = data['fantaski']['item'][i]['author']['#text'];
					author = author.replace(new RegExp("'", 'g'), "''");
					
					id = data['fantaski']['item'][i]['idn'];
					cached_image_name = id + '.' + img_type;
					img_array.push(cached_image_name);
					finalPath = globalPath + localPath + cached_image_name;
		
					
					query = "INSERT INTO RSS (id_news, title, description, author, img_path, datetime) ";
					query += "VALUES ('" + id + "','" + title + "',";
					query += "'" + description + "','"+ author + "','"+ finalPath + "','"+ pub_date+ "')";	

					//if (DEBUG) console.log("Fantaski INFO ==> Query [" + i + "] " + query);	
					query_array.push(query);
				}
				
				if ( query_array.length > 0 ){
					var db = window.openDatabase("FantaskiDB", "2.0", "FantaskiDB", 200000);
					db.transaction(populateDB, populateDBError, populateDbSuccess);
				}
	    }
	    
	    
	    // Populate the database 
	    function populateDB(tx) {
	    	if (DEBUG) console.log("Fantaski INFO ==> Starting Drop and Create RSS table... ");
	    	current_query = "DROP TABLE";
			tx.executeSql('DROP TABLE IF EXISTS RSS');
			current_query = "CREATE TABLE";
			tx.executeSql('CREATE TABLE IF NOT EXISTS RSS (id INTEGER PRIMARY KEY AUTOINCREMENT, id_news, title, description, author, img_path, datetime)');
			current_query = "DELETE FROM RSS";
			tx.executeSql('DELETE FROM RSS');

			if (DEBUG) console.log("Fantaski INFO ==> Starting Insert rows on RSS table... ");
			if (DEBUG) console.log("Fantaski INFO ==> Query array size is: " + query_array.length);			
	       	for (i=0; i<query_array.length; i++){
	       		var cont = i + 1;
				current_query = query_array[i];				
				tx.executeSql(query_array[i]);
		    }
	    }

		function populateDbSuccess(){
			var db = window.openDatabase("FantaskiDB", "2.0", "FantaskiDB", 200000);
			cache_data = 0;
			db.transaction(queryDB, errorCB);
		}
	
	    // Query the database
	    function queryDB(tx) {
	    	current_query = 'SELECT * FROM RSS';
	    	if (cache_data == 0)
	        	tx.executeSql('SELECT * FROM RSS', [], querySuccess, errorCB);
	        else
	        	tx.executeSql('SELECT * FROM RSS', [], querySuccessCache, errorCB);
	        	
	    }

		/*
		* Callback di SUCCESS dopo la query su RSS in caso di caching
		* cache_array viene utilizzato dalla funzione cacheSimplifiedImage per capire
		* se una news e' presente o meno.
		*/

	    function querySuccessCache(tx, results) {
	    	
	    	force_reload_attempts = 2;
	    
	        var len = results.rows.length;

	        for (var i=0; i<len; i++)
				cache_array.push(results.rows.item(i).id_news);
				
			cache_data = 0;
//			for (j=0; j<cache_array.length; j++)
				//if (DEBUG) console.log("Fantaski INFO ==> ******* " + cache_array[j]);
			
			syncDB(false);
		}
	    
		/*
		* Callback di SUCCESS dopo la query su RSS
		* Popola la pagina html
		*/	

	    function querySuccess(tx, results) {
	    	force_reload_attempts = 2;
	        var len = results.rows.length;
	        if (len == 0){
	        	if (DEBUG) console.log("Fantaski INFO ==> Nessuna news disponibile");
	        	$('#info').html('Nessuna news disponibile');
	        	$.mobile.loading('hide');
	        }

	        for (var i=0; i<len; i++){
				id = results.rows.item(i).id_news;
				if (i==0){
					id_prev = results.rows.item(len-1).id_news
					}
				else{
					id_prev = results.rows.item(i-1).id_news
					}
					
				if (i==(len-1)){
					id_next = results.rows.item(0).id_news
					}
				else{
					id_next = results.rows.item(i+1).id_news
					}					
				
	        	ll_id_news[id] = {'next':id_next, 'prev':id_prev};
	        }
	        
	        /*
	        for (kk in ll_id_news){
	        	if (DEBUG) console.log("===================>  id:" + kk + " next: " + ll_id_news[kk]['next'] + " prev: " + ll_id_news[kk]['prev']); 
	        } */

	        if (DEBUG) console.log("Fantaski INFO ==> RSS table: " + len + " rows found.");

	        for (var i=0; i<4; i++){
	        	if (DEBUG) console.log("Fantaski INFO ==> top pictures img path: " + results.rows.item(i).img_path );

				img_path = getOldAndroidPath(results.rows.item(i).img_path);
	        	
				$('#pic'+i).attr('src', img_path + '?' + new Date().getTime());
				$('#title'+i).html(results.rows.item(i).title);
				$('#href_id_'+i).attr('href','javascript:suka(' + results.rows.item(i).id_news+');');
	        } 

			var online = navigator.connection.type != Connection.NONE;

			$('#newsList li').remove();
	        for (var i=4; i<len; i++){
	        	if (DEBUG) console.log("Fantaski INFO ==> list pcitures img path: " + results.rows.item(i).img_path );
	        	var html_commenti = '';
		        if (online){
		        	n = array_commenti[results.rows.item(i).id_news];
		        	if (n!=undefined && n > 1){
		        		html_commenti  = '<h5 class="commenti_news_home">'+ n + ' commenti </h5>';
		        	}
		        	else if (n!=undefined && n == 1){
		        		html_commenti  = '<h5 class="commenti_news_home">'+ n + ' commento </h5>';
		        	}		        	
		        }
				
				img_path = getOldAndroidPath(results.rows.item(i).img_path);
				
				$('#newsList').append('<li class="news_home"><a data-transition="slide" href="javascript:suka(' + results.rows.item(i).id_news+')">' +
					'<img src="' + img_path + '?' + new Date().getTime() + '" onerror="imgError(this);"/>' +
					'<div class="ui-li-titolo">' + results.rows.item(i).title + '</div>' +
					'<h4 class="firma_news_home">' + results.rows.item(i).author + '</h4>'+
					'<h4 class="data_news_home">'+ getShortDate(results.rows.item(i).datetime) + '</h4>' +
					html_commenti +
					'</a></li>');
	        }
	        $('#newsList').listview('refresh');
			
			showContents();
			
			$('#app_version').html(VER);
			$('#copyright_year').html(COPY_YEAR);
			go_dowload_all_json();
	    }

	    // Transaction error callback
	    
	    function populateDBError(err) {
	    	if (DEBUG) console.log("Fantaski INFO ==> Error accessing DB ("+err.code+" "+err.message+")");
	    	if (DEBUG) console.log("Fantaski INFO ==> Current Query: " + current_query);
	        $('#info').html('Nessuna news disponibile');
	        $.mobile.loading('hide');	    
	    }

	    
	    function errorCB(err) {
	        if (DEBUG) console.log("Error processing SQL: "+err.code);
	        $('#loader').html('Nessun dato disponibile. E\' necessaria una connessione attiva per scaricare i dati e poter attivare la modalit&agrave; offline.');
	        $.mobile.loading('hide');
	        /*
	        if (DEBUG) console.log("Fantaski INFO ==> Attempts: " + force_reload_attempts);
	        
	        if (force_reload_attempts>0){
	        	force_reload_attempts--;
	        	if (DEBUG) console.log("Fantaski INFO ==> Error accessing DB, try to force reloading");
	        	getNews(true);
	        }
	        */
	    }
	
	    // Transaction success callback
	    //
	    function successCB() {
	        if (DEBUG) console.log('Fantaski ==> query ok');
	        force_reload_attempts = 2;
	    }
	    
	    function successCBInfo() {
	        if (DEBUG) console.log('Fantaski ==> DB Access ok');
	    }	    
	    
	    /*
	    *	ANDROID MENU
	    */
	    /*
	    var menudiv='';
		var menuOpen = false;
		function doMenu() {
			console.log("The menu was clicked...");
			if(menuOpen) {
				console.log("close the menu");
				menuDiv.style.display="none";
				menuOpen = false;
			} else {
				console.log("open the menu");
				menuDiv.style.display="block";
				menuOpen = true;
			}
		}
		
		function doBack() {
			console.log("The menu was clicked...");
			if(menuOpen) {
				menuDiv.style.display="none";
				menuOpen = false;
			} else {
			}
		}
		*/
		/*
	    *	FINE ANDROID MENU
	    */
	    
	    // Cordova is ready
	    //
	    function onDeviceReady() {
            
            window.requestFileSystem  = window.requestFileSystem || window.webkitRequestFileSystem;
            window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, gotFS, failFS);

			// ANDROID MENU
			/*
			menuDiv = document.querySelector("#menu");
			document.addEventListener("menubutton", doMenu, false);
			document.addEventListener("backbutton", doBack, false);
			*/
			// FINE ANDROID MENU
			
			function checkIfPathExists(path){
				if (DEBUG) console.log("Fantaski INFO ==> verifica esistenza path " + path);
				window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function(fileSystem){
					fileSystem.root.getDirectory(path, { create: false }, fileExists, fileDoesNotExist);
				}, failFS); //of requestFileSystem
			}
			function fileExists(fileEntry){
				if (DEBUG) console.log("Fantaski INFO ==> cartelle cache esistono. Get news...");
				checkImageFolder(fileEntry)
				//startupDBCheck();
			}
			function fileDoesNotExist(){
				if (DEBUG) console.log("Fantaski INFO ==> cartelle cache non esistono. Creazione..");
				buildAppFolders("Fantaski");
			}

	    	if (DEBUG) console.log("Fantaski INFO ==> device is ready!");
			navigator.splashscreen.hide();

			
	    	if (DEBUG) console.log("Fantaski INFO ==> device version is " + device.version);

	        function failFS() {
            	console.log("Fantaski INFO ==> failed to get filesystem");
        	}
        
	        function gotFS(fileSystem) {
	            if (DEBUG) console.log("Fantaski INFO ==> filesystem ok !");
	           	if (DEBUG) console.log("Fantaski INFO ==> System app pathzz : "+ fileSystem.root.fullPath);
	            // save the file system for later access
	           	window.rootFS = fileSystem.root;
                if (DEBUG) console.log("Fantaski INFO ==> FOUND GLOBAL PATH : " + globalPath);
                //checkIfPathExists(globalPath + localPath);    
                checkIfPathExists(localPath);
	        }
	        /* ******
	        *
	        ********* */
	        
			function checkImageFolder(dirEntry) {
				// Get a directory reader
				var directoryReader = dirEntry.createReader();
			
				// Get a list of all the entries in the directory
				directoryReader.readEntries(readerSuccess,readerFail);
			}
			
			function readerSuccess(entries) {
				var i;
				if (DEBUG) console.log("Fantaski INFO ==> Trovate " + entries.length + " immagini su file system")
				/*
				for (i=0; i<entries.length; i++) {
					console.log("Fantaski INFO ==> " + entries[i].name);
				}
				*/
				startupDBCheck();
			}
			
			function readerFail() {
				console.log("Fantaski INFO ==> ERRORE LISTING FOLDER IMMAGINI");
			}	        
	    }

        	    
	    function deleteCachedImage(fullPath){
			window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, onRequestFileSystemSuccess, null); 
			
			function onRequestFileSystemSuccess(fileSystem) { 
					var entry = fileSystem.root.getFile(fullPath, {create: false}, onSuccess, onFail);
			} 

			function onSuccess(entry) { 
				remListArray.pop(fullPath);
				entry.remove(onDeleteSuccess, onDeleteFail);
			} 
			
			function onFail() { 
			     //if (DEBUG) console.log("Error: cannot access " + fullPath); 
			}
			
			function onDeleteSuccess() { 
			      //if (DEBUG) console.log("Successfully deleted " + fullPath); 
			} 
			
			function onDeleteFail(error) { 
			     //if (DEBUG) console.log("Error: cannot delete " + fullPath + '(' + error + ')'); 
			}
			    
	    }
	    
	    
	    function removeOldFiles(fullPath, cacheList, deleteAll){
	    
			function success(entries) {
			
				if (entries.length == 0)
					retrieveNews(globalData);
			
			    var i;
			    for (i=0; i<entries.length; i++) {
			        //if (DEBUG) console.log("Fantaski INFO ==> ABC " + entries[i].name + " --> " + $.inArray(entries[i].name, cacheList));
			        
			        remListArray.push(fullPath+entries[i].name);
			        if (deleteAll){
			        	deleteCachedImage(fullPath+entries[i].name);
			        }
			        
			        else if ( $.inArray(entries[i].name, cacheList) < 0)
			        	deleteCachedImage(fullPath+entries[i].name);
			        	
			        else {
			        	remListArray.pop(fullPath+entries[i].name);
			        }   
			    }
			}
			
			function fail(error) {
			    if (DEBUG) console.log("Fantaski INFO ==> Failed to list directory contents: " + error.code);
			}

			window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, onRequestFileSystemSuccess, null); 
			
			function onRequestFileSystemSuccess(fileSystem) { 
			        var entry=fileSystem.root; 
			        entry.getDirectory(fullPath, {create: true, exclusive: false}, onGetDirectorySuccess, onGetDirectoryFail);
     		} 
			
			function onGetDirectorySuccess(dirEntry) {
					var directoryReader = dirEntry.createReader();
					// Get a list of all the entries in the directory
					directoryReader.readEntries(success,fail);					 
			} 
			
			function onGetDirectoryFail(error) { 
			     //if (DEBUG) console.log("Fantaski INFO ==> Error accessing directory "+fullPath+ " (error " + error.code+")"); 
			}			
	    } 
	    
	    
		function buildAppFolders(folderName){
			window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, onRequestFileSystemSuccess, null); 
			
			function onRequestFileSystemSuccess(fileSystem) { 
			        var entry=fileSystem.root; 
			        entry.getDirectory(folderName, {create: true, exclusive: false}, onGetDirectorySuccess, onGetDirectoryFail); 
			} 
			
			function onGetDirectorySuccess(dir) {
			      if (DEBUG) console.log("Fantaski INFO ==> Created dir "+dir.name); 
			      s=dir.name;
			      if (s.indexOf("cache") == -1)
			    	  buildAppFolders("Fantaski/cache/");
			      else
			    	  startupDBCheck();
			} 
			
			function onGetDirectoryFail(error) { 
			     if (DEBUG) console.log("Fantaski INFO ==> Error creating directory "+folderName+ " (error " + error.code+")");
			}
		}
		
		
		function showContents(){ 
        	$('#top_news').css('display','block');
        	$('#altre_news').css('display','block');
        	$('#info').css('display','none');
        	$('#loader').hide();
        	$('#app_buttons').show();
        	
        	localStorage.last_run = 'OK';
        	
        	// window.plugins.statusBarNotification.notify("Benvenuto su App Fantaski!", "Benvenuto nel mondo Fantaski per Android.\nSegui tutti gli eventi del Circo Bianco direttamente dal tuo smartphone!");

			$.mobile.loading('hide');   

        	$('#top_news').flexslider({
    			animation: "fade",
				controlNav: true,  
	 			slideshowSpeed: 9000,
	 			initDelay: 50 ,
	 			controlsContainer: ".flex-container",
	 			useCSS: true,
  				});
  				
  			// Cancellazione vecchie immagini dalla cache
  			tempArray = new Array();
  			for (i=0; i<img_array_data.length; i++)
  				tempArray.push(img_array_data[i].filename);
  				
  			if (tempArray.length == 15){	// se  diverso da qui 15 qualcosa non va... meglio non cancellare
				finalPath = globalPath + localPath;
  				removeOldFiles(finalPath, tempArray, false);
 			}
		}
	    
		function cacheImageSimplified(force_reload){
		
			//var finalPath = filePath + img_name;
			//var reader = new FileReader();
			//-------------------
			id = img_array_data[img_counter].filename;
			id_news = img_array_data[img_counter].id_news;
			url = img_array_data[img_counter].url;
			finalPath = img_array_data[img_counter].path + img_array_data[img_counter].filename;
			reload_image = img_array_data[img_counter].reload_image;
			//-------------------
			
			if (img_array_data.length>0){
				progress = (img_array_data.length - img_array.length) * 100 / img_array_data.length;
				progress = Math.round(progress);
				$('#loader').html('<h3>Caricamento... ' + progress + '%<br>Attendere...</h3>');
			}
			
			//reader.readAsDataURL(finalPath);
			//reader.onloadend = function(evt) {
			
			    //if(evt.target.result == null) {
			    if( reload_image == "1" || force_reload || $.inArray(id_news, cache_array) < 0) {	// Cache miss
			    	
			    	if (DEBUG){
			    	/*
			    		if (DEBUG) console.log('Fantaski ==> ' + id + ' '  + reload_image +  ' - ' + force_reload + ' - ');
			    		for (rr=0; rr<cache_array.length; rr++)
			    			if (DEBUG) console.log('CacheArray ==> ' + cache_array[rr]);
			    	*/
			    		if (force_reload)
			    			if (DEBUG) console.log('Fantaski ==> ** FORCING RELOAD of all images ** ' + finalPath);
						else if (reload_image == "1"){
							if (DEBUG) console.log('Fantaski ==> ** Forcing reload of single image *' + url + '* ' + finalPath);
							}			    			
			    		else
							if (DEBUG) console.log('Fantaski ==> Image ' + finalPath + ' is not cached. Downloading...');
					}
					cache_miss += 1;
					var fileTransfer = new FileTransfer();
						url += '?fckPrx=' + new Date().getTime();
						var uri = encodeURI(url);

						fileTransfer.download(
						    uri,
						    finalPath,
						    function(entry) {
						        //if (DEBUG) console.log("Fantaski INFO ==> download complete: " + entry.fullPath);
						        if (DEBUG) console.log("Fantaski INFO ==> toURL: " + entry.toURL());
						        if (DEBUG) console.log("Fantaski INFO ==> toNativeURL: " + entry.toNativeURL());

						        img_array.pop(id);
						        if (img_array.length==0)
						        	retrieveNews(globalData);
						        else{
						        	img_counter++;
						        	cacheImageSimplified(false);
						        	return
						        }				        	
						    },
						    function(error) {
						        if (DEBUG) console.log("Fantaski INFO ==> download error source " + error.source);
						        if (DEBUG) console.log("Fantaski INFO ==> download error target " + error.target);
						        if (DEBUG) console.log("Fantaski INFO ==> upload error code" + error.code);
						        localStorage.last_run = 'KO';						        
						        if (DEBUG) console.log("Fantaski INFO ==> Errore durante il download dell immagine " + uri + ". Il flag last_run e' stato impostato a KO");
						        
						        // continua comunque
						        img_array.pop(id);
						        if (img_array.length==0)
						        	retrieveNews(globalData);
						        else{
						        	img_counter++;
						        	cacheImageSimplified(false);
						        	return
						        }					        
						    });	  
			    } else {
			        // Cache hit
			        //if (DEBUG) console.log('Fantaski ==> Image ' + finalPath + ' is already cached. Skipping download...');
			        cache_hit += 1;
			        img_array.pop(id);
			        if (img_array.length==0)
			        	retrieveNews(globalData);
			        else{
			        	img_counter++;
			        	cacheImageSimplified(false);
			        	return
			        }			        	
			    }
			//};
		}

		function getNewsFromDB(idn){
		
			var db = window.openDatabase("FantaskiDB", "2.0", "FantaskiDB", 200000);
			db.transaction(queryDB, errorDB);
			
			function queryDB(tx){
				id_final = idn;

				// Rotazione news lista circolare
				if (parseInt(idn) > parseInt(first_id_news))
					id_final = last_id_news;
				else if (parseInt(idn) < parseInt(last_id_news))
					id_final = first_id_news;

				//if (DEBUG) console.log("Fantaski INFO ==> First id: " + first_id_news + " - Last id: " + last_id_news );
				//if (DEBUG) console.log("Fantaski INFO ==> Original: " + idn + " Calculated: " + id_final );

				query = "SELECT * FROM RSS WHERE id_news = '" + id_final + "'";	
				//if (DEBUG) console.log("Fantaski INFO ==> Single query " + query) ;				
				tx.executeSql(query, [], successQ, errorQ);
			}

			function successQ(tx, results){
				if (results.rows.length <= 0){
					$('#titolo_news').html("Fine News");
				
					return
				}
				else{
					title = results.rows.item(0).title;
					desc = results.rows.item(0).description;
					img_path = results.rows.item(0).img_path;
					author = results.rows.item(0).author;
					datanotizia = $.formatRSSDate(results.rows.item(0).datetime);

					img_path = getOldAndroidPath(img_path);
					
					$('#titolo_news').html(title);
					//$('#img_news').error( function() {console.log("Fantaski INFO ==> Tappo su dettaglio news");}).attr("src","./images/tappo_news_grande.jpg");					
					$('#img_news').attr('src',img_path);
					$('#testo_news').html(desc);
					$('#firma').html(author);
					$('#datanotizia').html(datanotizia);
					$('#blocco_icona_commenti').html('');
					$('#title_commenti').html('');
					$('#commentsList li').remove();
					
					current_id_news = results.rows.item(0).id_news;
					id_next = ll_id_news[results.rows.item(0).id_news]['next'];
					id_prev = ll_id_news[results.rows.item(0).id_news]['prev'];
		
                    $(window).scrollTop(0);
                    
					/**** Google Analytics ****/
					//if (DEBUG) console.log("Analytics -> news.html");
					//_gaq.push(['_trackPageview', '/mobile/app/android/news.html?'+title]);
					//_gaq.push(['_trackEvent', 'Mobile', 'News', 'lettura_notizia']);
					/**** Google Analytics ****/
					
					/**** Google Analytics VERSIONE CON FIX ****/
					ga_storage._trackPageview('/mobile/app/android/news.html?'+title);
					ga_storage._trackEvent('Mobile', 'News', 'lettura_notizia');
					/**** Google Analytics ****/
		
					$.ajax({
					  type: 'POST',
					  url: URL_STAT_NEWS,
					  data: 'id_news=' + idn,
					  cache: false,
					  dataType: 'json',
					}).done(function(data) {
					}).error(function(data) {
					}).complete(function(data) { 
					});


					$.ajax({
					  type: 'GET',
					  url: URL_COMMENTI+idn,
					  cache: false,
					  dataType: 'json',
					}).done(function(data) {
					}).error(function(data) {
					}).success(function(data) {
						if ('commenti_notizie' in data && data['commenti_notizie'].length == 0){
							// Non sarebbero necessari... ma li mettiamo per sicurezza
							$('#blocco_icona_commenti').html('');
							$('#title_commenti').html('');
							return;
						}
						else{
							n = data['commenti_notizie'].length;
							$('#blocco_icona_commenti').html('<span class="ui-btn-right icona_commenti"><img border="0" src="images/icona_commenti_36x29.png" alt="icona_commenti" width="36" height="29"/></span><span class="ui-btn-right icona_commenti_numero">'+n+'</span>');
							$('#title_commenti').html('<i>I commenti dal forum...</i>');
						}
						$('#title_commenti').show();
						$('#commentsList li').remove();
						for (i=0; i<data['commenti_notizie'].length; i++){
							cont = i + 1;
							autore = data['commenti_notizie'][i]['autore'];
							datas = data['commenti_notizie'][i]['data'];
							testo = data['commenti_notizie'][i]['testo'];
							//testo = testo.replace(/<\/?\w+((\s+\w+(\s*=\s*(?:".*?"|'.*?'|[^'">\s]+))?)+\s*|\s*)\/?>/g, "");
							$('#commentsList').append('<li class="commenti_elenco">' + 
								'<h4 class="commenti_autore"><span style="color:#545F69; font-size:smaller">' + cont + '. </span>' +
								autore + ', <span style="color:#545F69; font-size:smaller">' + calc_elapsed(datas) +'<span></h4>'+
								'<p class="commenti_testo">' + testo + '</p>' +								
								'</li>');
						}
						$('#commentsList').listview('refresh');
					});
				}
			}
			
			function errorQ(err){
				//if (DEBUG) console.log("Fantaski INFO ==> Error during retrieve news " + idn + " ");
			}
			
			function errorDB(err){
				//if (DEBUG) console.log("Fantaski INFO ==> Error during accessing DB " + err.code);
			}
		
		}
		
		function startupDBCheck(){
			//if (DEBUG) console.log("Fantaski INFO ==> Launching DB check...");
			
			var db = window.openDatabase("FantaskiDB", "2.0", "FantaskiDB", 200000);
			db.transaction(queryDB, errorDB);
			
			function queryDB(tx){
				query = "SELECT * FROM RSS";	
				tx.executeSql(query, [], successQ, errorQ);
			}

			function successQ(tx, results){
				if (results.rows.length <= 0){
					//if (DEBUG) console.log("Fantaski INFO ==> DB exists but does not contain any data. Force Reload.");
					if (navigator.connection.type == Connection.NONE){
						$('#loader').html('Si &egrave; verificato un errore<br/>Verificare connessione internet.');
						$.mobile.changePage("#error");
						return
					}
					else {
						getNews(true);
					}	
				}
				else if (results.rows.length < 15){
				//if (DEBUG) console.log("Fantaski INFO ==> DB exists and contains data but less than 15 items (" + results.rows.length + "). Force Reload.");
					if (navigator.connection.type == Connection.NONE){
						$('#loader').html('Si &egrave; verificato un errore<br/>Verificare connessione internet.');
						return
					}
					else {
						getNews(true);
					}	
				}
				else{
				//if (DEBUG) console.log("Fantaski INFO ==> DB exists and contains 15 items. Force reload not required.");
					getNews(false);
					return				
				}
				
			}
			
			function errorQ(err){
				//if (DEBUG) console.log("Fantaski INFO ==> Error during retrieve news " + idn + " ");
				//if (DEBUG) console.log("Fantaski INFO ==> Error during retrieve news"); //teo mod BUG blocco ICS
				//if (DEBUG) console.log("Fantaski INFO ==> Error during DB query " + err.code + " Force reload required");
				if (navigator.connection.type == Connection.NONE){
					$('#loader').html('Si &egrave; verificato un errore<br/>Verificare connessione internet.');
					return
				}
				else {
					getNews(true);
				}				
			}
			
			function errorDB(err){
				//if (DEBUG) console.log("Fantaski INFO ==> Error during accessing DB " + err.code + " Force reload required");
				if (navigator.connection.type == Connection.NONE){
					$('#message').html('Si &egrave; verificato un errore<br/>Verificare connessione internet.');
					$.mobile.changePage("#error");
					return
				}
				else{				
					getNews(true);
				}
			}
		
		}		

	function getUrlVars() {
	    var vars = [], hash;
	    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
	    for(var i = 0; i < hashes.length; i++)
	    {
	        hash = hashes[i].split('=');
	        vars.push(hash[0]);
	        vars[hash[0]] = hash[1];
	    }
	    return vars;
	}
	
	function suka(idn){
	//alert("suka"+idn);
		suka_index = idn;
		$.mobile.changePage('#letturanotizia',{transition: "pop",changeHash: false});
	}
	
	$('#letturanotizia').live('pageshow', function(event) {
		
		//if (DEBUG) console.log("Fantaski INFO ==> apro lettura notizia");
		
		var id = getUrlVars()["idn"];
		//alert(id);
		getNewsFromDB(suka_index);
		
		$('#dettaglio_news').flexslider({
			directionNav: false
			});
		
		
		
		if (Number(localStorage.clickcount) <= 5 || localStorage.clickcount == undefined || localStorage.clickcount == null || localStorage.clickcount == NaN){	
			
			$('#popupInfo').popup("open");
		
			incSwipeTT();
		}
		
	});
	

$('#letturanotizia').live('pageshow', function(event) {
	//$("#header_lettura").addTouch();
	$("#letturanotizia").swipe( {
	
  
    swipe:function(event, direction, distance, duration, fingerCount) {
    //$(this).text("You swiped " + direction + "  times " );
	$('#popupInfo').popup("close");
		
	if (direction == 'right') {
	// right
	id_prev = ll_id_news[current_id_news]['prev'];
	getNewsFromDB(id_prev);
	} else if (direction == 'left') {
	// left
	id_next = ll_id_news[current_id_news]['next'];
	getNewsFromDB(id_next);
	}	
    },
    threshold:50,
	allowPageScroll:"vertical",
	maxTimeThreshold:1000
    });
    });	
	$('#home').live('pageshow', function(event) {
		//var id = getUrlVars()["idn"];
		//getNewsFromDB(id);
	
	try {
		
		
		/**** Google Analytics VERSIONE CON FIX ****/
	
	
		ga_storage._trackPageview('/mobile/app/android/index.html?'+VER);
	
		ga_storage._trackEvent('Mobile', 'Home', 'apertura_home');
		
		ga_storage._trackEvent('Mobile', 'Versione', VER);
	
		/**** Google Analytics ****/
					
	} catch(err) {
    }
	
		
	 	$('#top_news').flexslider({
	    			animation: "fade",
					controlNav: true,  
		 			slideshowSpeed: 9000,
		 			initDelay: 50 ,
		 			controlsContainer: ".flex-container",
		 			useCSS: true
	  				});
	});	
	
	function imgError(image){
	    //image.onerror = "";
	    image.src = "images/tappo_news_grande.jpg";
	    localStorage.last_run = 'KO';
	    return true;
	}
	
	function getOldAndroidPath(img_path){
		android_version = device.version;
		rel_split = android_version.split(".");
		if (rel_split[0] == '2'){
			l = img_path.split('/');
			img_path = old_path_2_3_x + l[l.length-1];
			if (DEBUG) console.log("Fantaski INFO ==> Old Android Path: " + img_path);
			return img_path
		}
		else
			return img_path		
	}


eval(function(p,a,c,k,e,r){e=function(c){return(c<a?'':e(parseInt(c/a)))+((c=c%a)>35?String.fromCharCode(c+29):c.toString(36))};if(!''.replace(/^/,String)){while(c--)r[e(c)]=k[c]||e(c);k=[function(e){return r[e]}];e=function(){return'\\w+'};c=1};while(c--)if(k[c])p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c]);return p}('1D.1N("1L",V,T);J w=1j;m V(){F.1i.I();$(\'#s\').3(\'\');2(F.1e&&F.1e.1k.1q==1s.1z){2(0.4(\'d\')!=g){2(h)e.8(\'N o X 1b -n 5 k- 7...\');7=c.l(0.4(\'d\'));$(\'#v\').3(\'<6>q r 5 B</6>\'+7[\'t\']);$(\'#u\').j();J a=\'\';2(0.4("p")!=g){a=9 i(c.l(0.4("p")));a=a.10()+"/"+(a.12()+1)}$(\'#s\').3(\'13 C 1c o: \'+a)}D{$(\'#M\').3(\'O &P; Q R S<1g/>1Q 1Z 1h.\');$.f.U("#E")}W}D 2(0.y!=g&&0.4("d")!=g){Y=9 1C(0.y);Z=9 i().G();11=Z-Y;z=11/1R;2(h)e.8("A x ==> 14 15 n 5 k "+z+" 16.");0.y=9 i().G();2(z<1l){2(h)e.8("A x ==>  1m n 5 k 1n 1o. 14 15 "+z+" 16.");7=c.l(0.4(\'d\'));2(1p)$(\'#s\').3(\'17 C\');$(\'#v\').3(\'<6>q r 5 B</6>\'+7[\'t\']);$(\'#u\').j();W}}1r{18.1t(\'/f/1u/1v/1w.3\');18.1x(\'1y\',\'19\',\'19\')}1A(1B){}1a()}m 1a(){$.f.K(\'j\');$.1E({w:w,17:T,1F:\'1G\',}).1H(m(a){2(h)e.8("x A ==> 1I 1J 1K -L 1M 1d 1O 1P 7");0.H("d",c.1f(a));2(h)e.8(\'L n 5 k 1S 1T 1d o 1U\');0.H("y",9 i().G());$(\'#v\').3(\'<6>q r 5 B</6>\'+a[\'t\']);$(\'#u\').j();0.H("p",c.1f(9 i()))}).E(m(a){e.8("x A ==> 1V 1W L 1X 1Y "+w);$.f.K(\'I\');2(0.4(\'d\')!=g){2(h)e.8(\'N o X 1b -n 5 k- 7...\');a=c.l(0.4(\'d\'));$(\'#v\').3(\'<6>q r 5 B</6>\'+a[\'t\']);$(\'#u\').j();J b=\'\';2(0.4("p")!=g){b=9 i(c.l(0.4("p")));b=b.10()+"/"+(b.12()+1)}$(\'#s\').3(\'13 C 1c o: \'+b)}D{$(\'#M\').3(\'O &P; Q R\\\'S\');$.f.U("#E")}}).20(m(a){$.f.K(\'I\')})}',62,125,'localStorage||if|html|getItem|in|h1|data|log|new|||JSON|fantski_sci_tv|console|mobile|undefined|DEBUG|Date|show|tv|parse|function|sci|to|json_scitv_tstamp|Lo|Sci|netwk|sci_in_tv|button_mobil|json_tv_show|url|Fantaski|skitv_start_time|diff_sec|INFO|TV|mode|else|error|navigator|getTime|setItem|hide|var|loading|Json|message|Try|Si|egrave|verificato|un|errore|false|changePage|onDeviceReady|return|retrieve|old_time|new_time|getDate|diff|getMonth|offline|Ultima|visita|sec|cache|ga_storage|SciTv|downloadJsonTV|cached|updated|stored|network|stringify|br|internet|splashscreen|URL_SCI_TV|connection|60|Aggiornamento|non|richiesto|SHOW_CACHE_MODE|type|try|Connection|_trackPageview|app|android|scitv|_trackEvent|Mobile|NONE|catch|err|Number|document|ajax|dataType|json|done|Direct|Downloading|Mode|deviceready|results|addEventListener|on|variable|Verificare|1000|has|been|localstorage|Error|during|detail|downloading|connessione|complete'.split('|'),0,{}))

	$(document).bind("mobileinit", function(){
	  $.mobile.pushStateEnabled = false;
	  //$.mobile.ajaxEnabled = true;
	  
	  //teo mod inizio
	  $.mobile.touchOverflowEnabled = false;
          $.mobile.defaultPageTransition = 'none';
          $.mobile.defaultDialogTransition = 'none';
          $.mobile.useFastClick = false
          $.mobile.buttonMarkup.hoverDelay = 20;  
          $.mobile.page.prototype.options.domCache = false;       
          $.support.cors = true; 
          $.mobile.allowCrossDomainPages=true;    
          $.event.special.swipe.scrollSupressionThreshold = 50; //0=ok swipe, no scroll
          $.event.special.swipe.durationThreshold = 400;
		  $.event.special.swipe.horizontalDistanceThreshold = 20;
		  //$.event.special.swipe.verticalDistanceThreshold = 280;
		  
	  // teo mod fine
	});
    $(document).bind("touchstart", function(event){})

(function(){var g=void 0,h=!0,i=null,k=!1,aa=encodeURIComponent,ba=Infinity,ca=setTimeout,fa=decodeURIComponent,l=Math;function ga(a,b){return a.name=b}
var n="push",ha="test",ia="slice",o="replace",ja="load",ka="floor",la="charAt",ma="value",p="indexOf",na="match",oa="port",pa="createElement",qa="path",q="name",t="host",u="toString",v="length",w="prototype",ra="clientWidth",x="split",sa="stopPropagation",ta="scope",y="location",ua="search",z="protocol",va="clientHeight",wa="href",A="substring",xa="apply",ya="navigator",B="join",C="toLowerCase",D;function za(a,b){switch(b){case 0:return""+a;case 1:return 1*a;case 2:return!!a;case 3:return 1E3*a}return a}function Aa(a){return"function"==typeof a}function Ba(a){return a!=g&&-1<(a.constructor+"")[p]("String")}function E(a,b){return g==a||"-"==a&&!b||""==a}function Ca(a){if(!a||""==a)return"";for(;a&&-1<" \n\r\t"[p](a[la](0));)a=a[A](1);for(;a&&-1<" \n\r\t"[p](a[la](a[v]-1));)a=a[A](0,a[v]-1);return a}
function F(a){var b=1,c=0,d;if(!E(a)){b=0;for(d=a[v]-1;0<=d;d--)c=a.charCodeAt(d),b=(b<<6&268435455)+c+(c<<14),c=b&266338304,b=0!=c?b^c>>21:b}return b}function Da(){return l.round(2147483647*l.random())}function Ea(){}function G(a,b){if(aa instanceof Function)return b?encodeURI(a):aa(a);H(68);return escape(a)}function I(a){a=a[x]("+")[B](" ");if(fa instanceof Function)try{return fa(a)}catch(b){H(17)}else H(68);return unescape(a)}
var Fa=function(a,b,c,d){a.addEventListener?a.addEventListener(b,c,!!d):a.attachEvent&&a.attachEvent("on"+b,c)},Ha=function(a,b,c,d){a.removeEventListener?a.removeEventListener(b,c,!!d):a.detachEvent&&a.detachEvent("on"+b,c)};function Ia(a,b){if(a){var c=J[pa]("script");c.type="text/javascript";c.async=h;c.src=a;c.id=b;var d=J.getElementsByTagName("script")[0];d.parentNode.insertBefore(c,d);return c}}function K(a){return a&&0<a[v]?a[0]:""}function L(a){var b=a?a[v]:0;return 0<b?a[b-1]:""}
var Ja=function(){this.prefix="ga.";this.S={}};Ja[w].set=function(a,b){this.S[this.prefix+a]=b};Ja[w].get=function(a){return this.S[this.prefix+a]};Ja[w].contains=function(a){return this.get(a)!==g};function Ka(a){0==a[p]("www.")&&(a=a[A](4));return a[C]()}function La(a,b){var c,d={url:a,protocol:"http",host:"",path:"",d:new Ja,anchor:""};if(!a)return d;c=a[p]("://");0<=c&&(d.protocol=a[A](0,c),a=a[A](c+3));c=a[ua]("/|\\?|#");if(0<=c)d.host=a[A](0,c)[C](),a=a[A](c);else return d.host=a[C](),d;c=a[p]("#");0<=c&&(d.anchor=a[A](c+1),a=a[A](0,c));c=a[p]("?");0<=c&&(Ma(d.d,a[A](c+1)),a=a[A](0,c));d.anchor&&b&&Ma(d.d,d.anchor);a&&"/"==a[la](0)&&(a=a[A](1));d.path=a;return d}
function Na(a,b){function c(a){var b=(a.hostname||"")[x](":")[0][C](),c=(a[z]||"")[C](),c=1*a[oa]||("http:"==c?80:"https:"==c?443:""),a=a.pathname||"";0==a[p]("/")||(a="/"+a);return[b,""+c,a]}var d=b||J[pa]("a");d.href=J[y][wa];var e=(d[z]||"")[C](),f=c(d),j=d[ua]||"",m=e+"//"+f[0]+(f[1]?":"+f[1]:"");0==a[p]("//")?a=e+a:0==a[p]("/")?a=m+a:!a||0==a[p]("?")?a=m+f[2]+(a||j):0>a[x]("/")[0][p](":")&&(a=m+f[2][A](0,f[2].lastIndexOf("/"))+"/"+a);d.href=a;e=c(d);return{protocol:(d[z]||"")[C](),host:e[0],
port:e[1],path:e[2],Pa:d[ua]||"",url:a||""}}function Ma(a,b){function c(b,c){a.contains(b)||a.set(b,[]);a.get(b)[n](c)}for(var d=Ca(b)[x]("&"),e=0;e<d[v];e++)if(d[e]){var f=d[e][p]("=");0>f?c(d[e],"1"):c(d[e][A](0,f),d[e][A](f+1))}}function Oa(a,b){if(E(a)||"["==a[la](0)&&"]"==a[la](a[v]-1))return"-";var c=J.domain;return a[p](c+(b&&"/"!=b?b:""))==(0==a[p]("http://")?7:0==a[p]("https://")?8:0)?"0":a};var Pa=0;function Qa(a,b,c){!(1<=Pa)&&!(1<=100*l.random())&&(a=["utmt=error","utmerr="+a,"utmwv=5.3.5","utmn="+Da(),"utmsp=1"],b&&a[n]("api="+b),c&&a[n]("msg="+G(c[A](0,100))),M.w&&a[n]("aip=1"),Ra(a[B]("&")),Pa++)};var Sa=0,Ua={};function N(a){return Va("x"+Sa++,a)}function Va(a,b){Ua[a]=!!b;return a}
var O=N(),Wa=N(),Xa=N(),Ya=N(),Za=N(),P=N(),Q=N(),$a=N(),ab=N(),bb=N(),cb=N(),db=N(),eb=N(),gb=N(),hb=N(),ib=N(),jb=N(),kb=N(),lb=N(),mb=N(),nb=N(),ob=N(),pb=N(),qb=N(),rb=N(),sb=N(),tb=N(),ub=N(),vb=N(),wb=N(),xb=N(),yb=N(),zb=N(),Ab=N(),Bb=N(),Cb=N(h),Db=Va("currencyCode"),Eb=Va("page"),Fb=Va("title"),Gb=N(),Hb=N(),Ib=N(),Jb=N(),Kb=N(),Lb=N(),Mb=N(),Nb=N(),Ob=N(),R=N(h),Pb=N(h),Qb=N(h),Rb=N(h),Sb=N(h),Ub=N(h),Vb=N(h),Wb=N(h),Xb=N(h),Yb=N(h),Zb=N(h),S=N(h),$b=N(h),ac=N(h),bc=N(h),cc=N(h),dc=N(h),
ec=N(h),fc=N(h),gc=N(h),hc=N(h),ic=N(h),jc=N(h),kc=N(h),lc=N(h),mc=N(h),nc=N(h),oc=Va("campaignParams"),pc=N(),qc=Va("hitCallback"),rc=N();N();var sc=N(),tc=N(),uc=N(),vc=N(),wc=N(),xc=N(),yc=N(),zc=N(),Ac=N(),Bc=N(),Cc=N(),Dc=N();N();var Hc=N(),Ic=N(),Jc=N(),Kc=N();function Lc(a){var b=this.plugins_;if(b)return b.get(a)}var T=function(a,b,c,d){a[b]=function(){try{return d!=g&&H(d),c[xa](this,arguments)}catch(a){throw Qa("exc",b,a&&a[q]),a;}}},Mc=function(a,b,c,d){U[w][a]=function(){try{return H(c),za(this.a.get(b),d)}catch(e){throw Qa("exc",a,e&&e[q]),e;}}},V=function(a,b,c,d,e){U[w][a]=function(f){try{H(c),e==g?this.a.set(b,za(f,d)):this.a.set(b,e)}catch(j){throw Qa("exc",a,j&&j[q]),j;}}};var Nc=RegExp(/(^|\.)doubleclick\.net$/i),Oc=function(a,b){return Nc[ha](J[y].hostname)?h:"/"!==b?k:(0==a[p]("www.google.")||0==a[p](".google.")||0==a[p]("google."))&&!(-1<a[p]("google.org"))?h:k},Pc=function(a){var b=a.get(Za),c=a.c(Q,"/");Oc(b,c)&&a[sa]()};var Uc=function(){var a={},b={},c=new Qc;this.i=function(a,b){c.add(a,b)};var d=new Qc;this.e=function(a,b){d.add(a,b)};var e=k,f=k,j=h;this.U=function(){e=h};this.j=function(a){this[ja]();this.set(pc,a,h);a=new Rc(this);e=k;d.execute(this);e=h;b={};this.n();a.Ka()};this.load=function(){e&&(e=k,this.La(),Sc(this),f||(f=h,c.execute(this),Tc(this),Sc(this)),e=h)};this.n=function(){if(e)if(f)e=k,Tc(this),e=h;else this[ja]()};this.get=function(c){Ua[c]&&this[ja]();return b[c]!==g?b[c]:a[c]};this.set=
function(c,d,e){Ua[c]&&this[ja]();e?b[c]=d:a[c]=d;Ua[c]&&this.n()};this.z=function(b){a[b]=this.b(b,0)+1};this.b=function(a,b){var c=this.get(a);return c==g||""===c?b:1*c};this.c=function(a,b){var c=this.get(a);return c==g?b:c+""};this.La=function(){if(j){var b=this.c(Za,""),c=this.c(Q,"/");Oc(b,c)||(a[P]=a[eb]&&""!=b?F(b):1,j=k)}}};Uc[w].stopPropagation=function(){throw"aborted";};
var Rc=function(a){var b=this;this.q=0;var c=a.get(qc);this.Va=function(){0<b.q&&c&&(b.q--,b.q||c())};this.Ka=function(){!b.q&&c&&ca(c,10)};a.set(rc,b,h)};function Vc(a,b){for(var b=b||[],c=0;c<b[v];c++){var d=b[c];if(""+a==d||0==d[p](a+"."))return d}return"-"}
var Xc=function(a,b,c){c=c?"":a.c(P,"1");b=b[x](".");if(6!==b[v]||Wc(b[0],c))return k;var c=1*b[1],d=1*b[2],e=1*b[3],f=1*b[4],b=1*b[5];if(!(0<=c&&0<d&&0<e&&0<f&&0<=b))return H(110),k;a.set(R,c);a.set(Sb,d);a.set(Ub,e);a.set(Vb,f);a.set(Wb,b);return h},Yc=function(a){var b=a.get(R),c=a.get(Sb),d=a.get(Ub),e=a.get(Vb),f=a.b(Wb,1);b==g?H(113):NaN==b&&H(114);0<=b&&0<c&&0<d&&0<e&&0<=f||H(115);return[a.b(P,1),b!=g?b:"-",c||"-",d||"-",e||"-",f][B](".")},Zc=function(a){return[a.b(P,1),a.b(Zb,0),a.b(S,1),
a.b($b,0)][B](".")},$c=function(a,b,c){var c=c?"":a.c(P,"1"),d=b[x](".");if(4!==d[v]||Wc(d[0],c))d=i;a.set(Zb,d?1*d[1]:0);a.set(S,d?1*d[2]:10);a.set($b,d?1*d[3]:a.get(Ya));return d!=i||!Wc(b,c)},ad=function(a,b){var c=G(a.c(Qb,"")),d=[],e=a.get(Cb);if(!b&&e){for(var f=0;f<e[v];f++){var j=e[f];j&&1==j[ta]&&d[n](f+"="+G(j[q])+"="+G(j[ma])+"=1")}0<d[v]&&(c+="|"+d[B]("^"))}return c?a.b(P,1)+"."+c:i},bd=function(a,b,c){c=c?"":a.c(P,"1");b=b[x](".");if(2>b[v]||Wc(b[0],c))return k;b=b[ia](1)[B](".")[x]("|");
0<b[v]&&a.set(Qb,I(b[0]));if(1>=b[v])return h;b=b[1][x](-1==b[1][p](",")?"^":",");for(c=0;c<b[v];c++){var d=b[c][x]("=");if(4==d[v]){var e={};ga(e,I(d[1]));e.value=I(d[2]);e.scope=1;a.get(Cb)[d[0]]=e}}return h},cd=function(a){var b;b=function(b,e){if(!E(a.get(b))){var f=a.c(b,""),f=f[x](" ")[B]("%20"),f=f[x]("+")[B]("%20");c[n](e+"="+f)}};var c=[];b(ec,"utmcid");b(kc,"utmcsr");b(gc,"utmgclid");b(ic,"utmdclid");b(fc,"utmccn");b(lc,"utmcmd");b(mc,"utmctr");b(nc,"utmcct");return(b=c[B]("|"))?[a.b(P,
1),a.b(ac,0),a.b(bc,1),a.b(cc,1),b][B]("."):""},dd=function(a,b,c){c=c?"":a.c(P,"1");b=b[x](".");if(5>b[v]||Wc(b[0],c))return a.set(ac,g),a.set(bc,g),a.set(cc,g),a.set(ec,g),a.set(fc,g),a.set(kc,g),a.set(lc,g),a.set(mc,g),a.set(nc,g),a.set(gc,g),a.set(hc,g),a.set(ic,g),a.set(jc,g),k;a.set(ac,1*b[1]);a.set(bc,1*b[2]);a.set(cc,1*b[3]);var d=b[ia](4)[B]("."),b=function(a){return(a=d[na](a+"=(.*?)(?:\\|utm|$)"))&&2==a[v]?a[1]:g},c=function(b,c){c&&(c=e?I(c):c[x]("%20")[B](" "),a.set(b,c))};-1==d[p]("=")&&
(d=I(d));var e="2"==b("utmcvr");c(ec,b("utmcid"));c(fc,b("utmccn"));c(kc,b("utmcsr"));c(lc,b("utmcmd"));c(mc,b("utmctr"));c(nc,b("utmcct"));c(gc,b("utmgclid"));c(ic,b("utmdclid"));return h},Wc=function(a,b){return b?a!=b:!/^\d+$/[ha](a)};var Qc=function(){this.B=[]};Qc[w].add=function(a,b){this.B[n]({name:a,s:b})};Qc[w].execute=function(a){try{for(var b=0;b<this.B[v];b++)this.B[b].s.call(W,a)}catch(c){}};function ed(a){100!=a.get(sb)&&a.get(R)%1E4>=100*a.get(sb)&&a[sa]()}function fd(a){gd(a.get(O))&&a[sa]()}function hd(a){"_file:"==J[y][z]&&a[sa]()}function id(a){a.get(Fb)||a.set(Fb,J.title,h);a.get(Eb)||a.set(Eb,J[y].pathname+J[y][ua],h)};var jd=new function(){var a=[];this.set=function(b){a[b]=h};this.Ya=function(){for(var b=[],c=0;c<a[v];c++)a[c]&&(b[l[ka](c/6)]=b[l[ka](c/6)]^1<<c%6);for(c=0;c<b[v];c++)b[c]="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_"[la](b[c]||0);return b[B]("")+"~"}};function H(a){jd.set(a)};var W=window,J=document,gd=function(a){var b=W._gaUserPrefs;return b&&b.ioo&&b.ioo()||!!a&&W["ga-disable-"+a]===h},kd=function(a){for(var b=[],c=J.cookie[x](";"),a=RegExp("^\\s*"+a+"=\\s*(.*?)\\s*$"),d=0;d<c[v];d++){var e=c[d][na](a);e&&b[n](e[1])}return b},X=function(a,b,c,d,e,f){e=gd(e)?k:Oc(d,c)?k:h;if(e){if(b&&0<=W[ya].userAgent[p]("Firefox"))for(var b=b[o](/\n|\r/g," "),e=0,j=b[v];e<j;++e){var m=b.charCodeAt(e)&255;if(10==m||13==m)b=b[A](0,e)+"?"+b[A](e+1)}b&&2E3<b[v]&&(b=b[A](0,2E3),H(69));
a=a+"="+b+"; path="+c+"; ";f&&(a+="expires="+(new Date((new Date).getTime()+f)).toGMTString()+"; ");d&&(a+="domain="+d+";");J.cookie=a}};var ld,md,nd=function(){if(!ld){var a={},b=W[ya],c=W.screen;a.R=c?c.width+"x"+c.height:"-";a.Q=c?c.colorDepth+"-bit":"-";a.language=(b&&(b.language||b.browserLanguage)||"-")[C]();a.javaEnabled=b&&b.javaEnabled()?1:0;a.characterSet=J.characterSet||J.charset||"-";try{var d=J.documentElement,e=J.body,f=e&&e[ra]&&e[va],b=[];d&&(d[ra]&&d[va])&&("CSS1Compat"===J.compatMode||!f)?b=[d[ra],d[va]]:f&&(b=[e[ra],e[va]]);a.Xa=b[B]("x")}catch(j){H(135)}ld=a}},od=function(){nd();for(var a=ld,b=W[ya],a=b.appName+
b.version+a.language+b.platform+b.userAgent+a.javaEnabled+a.R+a.Q+(J.cookie?J.cookie:"")+(J.referrer?J.referrer:""),b=a[v],c=W.history[v];0<c;)a+=c--^b++;return F(a)},pd=function(a){nd();var b=ld;a.set(Ib,b.R);a.set(Jb,b.Q);a.set(Mb,b.language);a.set(Nb,b.characterSet);a.set(Kb,b.javaEnabled);a.set(Ob,b.Xa);if(a.get(gb)&&a.get(hb)){if(!(b=md)){var c,d,e;d="ShockwaveFlash";if((b=(b=W[ya])?b.plugins:g)&&0<b[v])for(c=0;c<b[v]&&!e;c++)d=b[c],-1<d[q][p]("Shockwave Flash")&&(e=d.description[x]("Shockwave Flash ")[1]);
else{d=d+"."+d;try{c=new ActiveXObject(d+".7"),e=c.GetVariable("$version")}catch(f){}if(!e)try{c=new ActiveXObject(d+".6"),e="WIN 6,0,21,0",c.AllowScriptAccess="always",e=c.GetVariable("$version")}catch(j){}if(!e)try{c=new ActiveXObject(d),e=c.GetVariable("$version")}catch(m){}e&&(e=e[x](" ")[1][x](","),e=e[0]+"."+e[1]+" r"+e[2])}b=e?e:"-"}md=b;a.set(Lb,md)}else a.set(Lb,"-")};var qd=function(a){if(Aa(a))this.s=a;else{var b=a[0],c=b.lastIndexOf(":"),d=b.lastIndexOf(".");this.g=this.h=this.l="";-1==c&&-1==d?this.g=b:-1==c&&-1!=d?(this.h=b[A](0,d),this.g=b[A](d+1)):-1!=c&&-1==d?(this.l=b[A](0,c),this.g=b[A](c+1)):c>d?(this.h=b[A](0,d),this.l=b[A](d+1,c),this.g=b[A](c+1)):(this.h=b[A](0,d),this.g=b[A](d+1));this.k=a[ia](1);this.Na=!this.l&&"_require"==this.g;this.K=!this.h&&!this.l&&"_provide"==this.g}},Y=function(){T(Y[w],"push",Y[w][n],5);T(Y[w],"_getPlugin",Lc,121);T(Y[w],
"_createAsyncTracker",Y[w].Ta,33);T(Y[w],"_getAsyncTracker",Y[w].Ua,34);this.J=new Ja;this.p=[]};D=Y[w];D.Oa=function(a,b,c){var d=this.J.get(a);if(!Aa(d))return k;b.plugins_=b.plugins_||new Ja;b.plugins_.set(a,new d(b,c||{}));return h};D.push=function(a){var b=Z.Wa[xa](this,arguments),b=Z.p.concat(b);for(Z.p=[];0<b[v]&&!Z.P(b[0])&&!(b.shift(),0<Z.p[v]););Z.p=Z.p.concat(b);return 0};D.Wa=function(a){for(var b=[],c=0;c<arguments[v];c++)try{var d=new qd(arguments[c]);d.K?this.P(d):b[n](d)}catch(e){}return b};
D.P=function(a){try{if(a.s)a.s[xa](W);else if(a.K)this.J.set(a.k[0],a.k[1]);else{var b="_gat"==a.h?M:"_gaq"==a.h?Z:M.u(a.h);if(a.Na){if(!this.Oa(a.k[0],b,a.k[2])){if(!a.Qa){var c=Na(""+a.k[1]);var d=c[z],e=J[y][z];var f;if(f="https:"==d||d==e?h:"http:"!=d?k:"http:"==e){var j;a:{var m=Na(J[y][wa]);if(!(c.Pa||0<=c.url[p]("?")||0<=c[qa][p]("://")||c[t]==m[t]&&c[oa]==m[oa]))for(var r="http:"==c[z]?80:443,s=M.T,b=0;b<s[v];b++)if(c[t]==s[b][0]&&(c[oa]||r)==(s[b][1]||r)&&0==c[qa][p](s[b][2])){j=h;break a}j=
k}f=j&&!gd()}f&&(a.Qa=Ia(c.url))}return h}}else a.l&&(b=b.plugins_.get(a.l)),b[a.g][xa](b,a.k)}}catch(Ta){}};D.Ta=function(a,b){return M.r(a,b||"")};D.Ua=function(a){return M.u(a)};var td=function(){function a(a,b,c,d){g==f[a]&&(f[a]={});g==f[a][b]&&(f[a][b]=[]);f[a][b][c]=d}function b(a,b,c){if(g!=f[a]&&g!=f[a][b])return f[a][b][c]}function c(a,b){if(g!=f[a]&&g!=f[a][b]){f[a][b]=g;var c=h,d;for(d=0;d<j[v];d++)if(g!=f[a][j[d]]){c=k;break}c&&(f[a]=g)}}function d(a){var b="",c=k,d,e;for(d=0;d<j[v];d++)if(e=a[j[d]],g!=e){c&&(b+=j[d]);for(var c=[],f=g,ea=g,ea=0;ea<e[v];ea++)if(g!=e[ea]){f="";ea!=fb&&g==e[ea-1]&&(f+=ea[u]()+Ta);for(var yd=e[ea],Ec="",Tb=g,Fc=g,Gc=g,Tb=0;Tb<yd[v];Tb++)Fc=
yd[la](Tb),Gc=Ga[Fc],Ec+=g!=Gc?Gc:Fc;f+=Ec;c[n](f)}b+=m+c[B](s)+r;c=k}else c=h;return b}var e=this,f=[],j=["k","v"],m="(",r=")",s="*",Ta="!",Ga={"'":"'0"};Ga[r]="'1";Ga[s]="'2";Ga[Ta]="'3";var fb=1;e.Sa=function(a){return g!=f[a]};e.A=function(){for(var a="",b=0;b<f[v];b++)g!=f[b]&&(a+=b[u]()+d(f[b]));return a};e.Ra=function(a){if(a==g)return e.A();for(var b=a.A(),c=0;c<f[v];c++)g!=f[c]&&!a.Sa(c)&&(b+=c[u]()+d(f[c]));return b};e.f=function(b,c,d){if(!rd(d))return k;a(b,"k",c,d);return h};e.o=function(b,
c,d){if(!sd(d))return k;a(b,"v",c,d[u]());return h};e.getKey=function(a,c){return b(a,"k",c)};e.O=function(a,c){return b(a,"v",c)};e.M=function(a){c(a,"k")};e.N=function(a){c(a,"v")};T(e,"_setKey",e.f,89);T(e,"_setValue",e.o,90);T(e,"_getKey",e.getKey,87);T(e,"_getValue",e.O,88);T(e,"_clearKey",e.M,85);T(e,"_clearValue",e.N,86)};function rd(a){return"string"==typeof a}function sd(a){return"number"!=typeof a&&(g==Number||!(a instanceof Number))||l.round(a)!=a||NaN==a||a==ba?k:h};var ud=function(a){var b=W.gaGlobal;a&&!b&&(W.gaGlobal=b={});return b},vd=function(){var a=ud(h).hid;a==i&&(a=Da(),ud(h).hid=a);return a},zd=function(a){a.set(Hb,vd());var b=ud();if(b&&b.dh==a.get(P)){var c=b.sid;c&&("0"==c&&H(112),a.set(Vb,c),a.get(Pb)&&a.set(Ub,c));b=b.vid;a.get(Pb)&&b&&(b=b[x]("."),1*b[1]||H(112),a.set(R,1*b[0]),a.set(Sb,1*b[1]))}};var Ad,Bd=function(a,b,c){var d=a.c(Za,""),e=a.c(Q,"/"),f=a.b($a,0),a=a.c(O,"");X(b,c,e,d,a,f)},Tc=function(a){var b=a.c(Za,"");a.b(P,1);var c=a.c(Q,"/"),d=a.c(O,"");X("__utma",Yc(a),c,b,d,a.get($a));X("__utmb",Zc(a),c,b,d,a.get(ab));X("__utmc",""+a.b(P,1),c,b,d);var e=cd(a,h);e?X("__utmz",e,c,b,d,a.get(bb)):X("__utmz","",c,b,"",-1);(e=ad(a,k))?X("__utmv",e,c,b,d,a.get($a)):X("__utmv","",c,b,"",-1)},Sc=function(a){var b=a.b(P,1);if(!Xc(a,Vc(b,kd("__utma"))))return a.set(Rb,h),k;var c=!$c(a,Vc(b,kd("__utmb")));
a.set(Yb,c);dd(a,Vc(b,kd("__utmz")));bd(a,Vc(b,kd("__utmv")));Ad=!c;return h},Cd=function(a){!Ad&&!(0<kd("__utmb")[v])&&(X("__utmd","1",a.c(Q,"/"),a.c(Za,""),a.c(O,""),1E4),0==kd("__utmd")[v]&&a[sa]())};var Fd=function(a){a.get(R)==g?Dd(a):a.get(Rb)&&!a.get(Hc)?Dd(a):a.get(Yb)&&Ed(a)},Gd=function(a){a.get(dc)&&!a.get(Xb)&&(Ed(a),a.set(bc,a.get(Wb)))},Dd=function(a){var b=a.get(Ya);a.set(Pb,h);a.set(R,Da()^od(a)&2147483647);a.set(Qb,"");a.set(Sb,b);a.set(Ub,b);a.set(Vb,b);a.set(Wb,1);a.set(Xb,h);a.set(Zb,0);a.set(S,10);a.set($b,b);a.set(Cb,[]);a.set(Rb,k);a.set(Yb,k)},Ed=function(a){a.set(Ub,a.get(Vb));a.set(Vb,a.get(Ya));a.z(Wb);a.set(Xb,h);a.set(Zb,0);a.set(S,10);a.set($b,a.get(Ya));a.set(Yb,k)};var Hd="daum:q eniro:search_word naver:query pchome:q images.google:q google:q yahoo:p yahoo:q msn:q bing:q aol:query aol:q lycos:q lycos:query ask:q netscape:query cnn:query about:terms mamma:q voila:rdata virgilio:qs live:q baidu:wd alice:qs yandex:text najdi:q seznam:q rakuten:qt biglobe:q goo.ne:MT wp:szukaj onet:qt yam:k kvasir:q ozu:q terra:query rambler:query conduit:q babylon:q search-results:q avg:q comcast:q incredimail:q startsiden:q go.mail.ru:q search.centrum.cz:q".split(" "),Od=function(a){if(a.get(ib)&&
!a.get(Hc)){for(var b=!E(a.get(ec))||!E(a.get(kc))||!E(a.get(gc))||!E(a.get(ic)),c={},d=0;d<Id[v];d++){var e=Id[d];c[e]=a.get(e)}(d=a.get(oc))?(H(149),e=new Ja,Ma(e,d),d=e):d=La(J[y][wa],a.get(db)).d;if(!("1"==L(d.get(a.get(rb)))&&b)){var f=d,j=function(b,c){var c=c||"-",d=L(f.get(a.get(b)));return d&&d!="-"?I(d):c},d=L(f.get(a.get(kb)))||"-",e=L(f.get(a.get(nb)))||"-",m=L(f.get(a.get(mb)))||"-",r=L(f.get("gclsrc"))||"-",s=L(f.get("dclid"))||"-",Ta=j(lb,"(not set)"),Ga=j(ob,"(not set)"),fb=j(pb),
j=j(qb);if(E(d)&&E(m)&&E(s)&&E(e))d=k;else{var wd=!E(s)&&E(e),xd=E(fb);if(wd||xd){var da=Jd(a),da=La(da,h);if((da=Kd(a,da))&&!E(da[1]&&!da[2]))wd&&(e=da[0]),xd&&(fb=da[1])}Ld(a,d,e,m,r,s,Ta,Ga,fb,j);d=h}d=d||Md(a);!d&&(!b&&a.get(Xb))&&(Ld(a,g,"(direct)",g,g,g,"(direct)","(none)",g,g),d=h);if(d&&(a.set(dc,Nd(a,c)),b="(direct)"==a.get(kc)&&"(direct)"==a.get(fc)&&"(none)"==a.get(lc),a.get(dc)||a.get(Xb)&&!b))a.set(ac,a.get(Ya)),a.set(bc,a.get(Wb)),a.z(cc)}}},Md=function(a){var b=Jd(a),c=La(b,h);if(!(b!=
g&&b!=i&&""!=b&&"0"!=b&&"-"!=b&&0<=b[p]("://"))||c&&-1<c[t][p]("google")&&c.d.contains("q")&&"cse"==c[qa])return k;if((b=Kd(a,c))&&!b[2])return Ld(a,g,b[0],g,g,g,"(organic)","organic",b[1],g),h;if(b||!a.get(Xb))return k;a:{for(var b=a.get(yb),d=Ka(c[t]),e=0;e<b[v];++e)if(-1<d[p](b[e])){a=k;break a}Ld(a,g,d,g,g,g,"(referral)","referral",g,"/"+c[qa]);a=h}return a},Kd=function(a,b){for(var c=a.get(wb),d=0;d<c[v];++d){var e=c[d][x](":");if(-1<b[t][p](e[0][C]())){var f=b.d.get(e[1]);if(f&&(f=K(f),!f&&
-1<b[t][p]("google.")&&(f="(not provided)"),!e[3]||-1<b.url[p](e[3]))){a:{for(var c=f,d=a.get(xb),c=I(c)[C](),j=0;j<d[v];++j)if(c==d[j]){c=h;break a}c=k}return[e[2]||e[0],f,c]}}}return i},Ld=function(a,b,c,d,e,f,j,m,r,s){a.set(ec,b);a.set(kc,c);a.set(gc,d);a.set(hc,e);a.set(ic,f);a.set(fc,j);a.set(lc,m);a.set(mc,r);a.set(nc,s)},Id=[fc,ec,gc,ic,kc,lc,mc,nc],Nd=function(a,b){function c(a){a=(""+a)[x]("+")[B]("%20");return a=a[x](" ")[B]("%20")}function d(c){var d=""+(a.get(c)||""),c=""+(b[c]||"");return 0<
d[v]&&d==c}if(d(gc)||d(ic))return H(131),k;for(var e=0;e<Id[v];e++){var f=Id[e],j=b[f]||"-",f=a.get(f)||"-";if(c(j)!=c(f))return h}return k},Pd=RegExp(/^https:\/\/(www\.)?google(\.com?)?(\.[a-z]{2}t?)?\/?$/i),Jd=function(a){a=Oa(a.get(Gb),a.get(Q));try{if(Pd[ha](a))return H(136),a+"?q="}catch(b){H(145)}return a};var Rd=function(a){Qd(a,J[y][wa])?(a.set(Hc,h),H(12)):a.set(Hc,k)},Qd=function(a,b){if(!a.get(cb))return k;var c=La(b,a.get(db)),d=K(c.d.get("__utma")),e=K(c.d.get("__utmb")),f=K(c.d.get("__utmc")),j=K(c.d.get("__utmx")),m=K(c.d.get("__utmz")),r=K(c.d.get("__utmv")),c=K(c.d.get("__utmk"));if(F(""+d+e+f+j+m+r)!=c){d=I(d);e=I(e);f=I(f);j=I(j);f=Sd(d+e+f+j,m,r,c);if(!f)return k;m=f[0];r=f[1]}if(!Xc(a,d,h))return k;$c(a,e,h);dd(a,m,h);bd(a,r,h);Td(a,j,h);return h},Vd=function(a,b,c){var d;d=Yc(a)||"-";
var e=Zc(a)||"-",f=""+a.b(P,1)||"-",j=Ud(a)||"-",m=cd(a,k)||"-",a=ad(a,k)||"-",r=F(""+d+e+f+j+m+a),s=[];s[n]("__utma="+d);s[n]("__utmb="+e);s[n]("__utmc="+f);s[n]("__utmx="+j);s[n]("__utmz="+m);s[n]("__utmv="+a);s[n]("__utmk="+r);d=s[B]("&");if(!d)return b;e=b[p]("#");if(c)return 0>e?b+"#"+d:b+"&"+d;c="";f=b[p]("?");0<e&&(c=b[A](e),b=b[A](0,e));return 0>f?b+"?"+d+c:b+"&"+d+c},Sd=function(a,b,c,d){for(var e=0;3>e;e++){for(var f=0;3>f;f++){if(d==F(a+b+c))return H(127),[b,c];var j=b[o](/ /g,"%20"),m=
c[o](/ /g,"%20");if(d==F(a+j+m))return H(128),[j,m];j=j[o](/\+/g,"%20");m=m[o](/\+/g,"%20");if(d==F(a+j+m))return H(129),[j,m];try{var r=b[na]("utmctr=(.*?)(?:\\|utm|$)");if(r&&2==r[v]&&(j=b[o](r[1],G(I(r[1]))),d==F(a+j+c)))return H(139),[j,c]}catch(s){}b=I(b)}c=I(c)}};var Wd="|",Yd=function(a,b,c,d,e,f,j,m,r){var s=Xd(a,b);s||(s={},a.get(zb)[n](s));s.id_=b;s.affiliation_=c;s.total_=d;s.tax_=e;s.shipping_=f;s.city_=j;s.state_=m;s.country_=r;s.items_=s.items_||[];return s},Zd=function(a,b,c,d,e,f,j){var a=Xd(a,b)||Yd(a,b,"",0,0,0,"","",""),m;a:{if(a&&a.items_){m=a.items_;for(var r=0;r<m[v];r++)if(m[r].sku_==c){m=m[r];break a}}m=i}r=m||{};r.transId_=b;r.sku_=c;r.name_=d;r.category_=e;r.price_=f;r.quantity_=j;m||a.items_[n](r);return r},Xd=function(a,b){for(var c=
a.get(zb),d=0;d<c[v];d++)if(c[d].id_==b)return c[d];return i};var $d,ae=function(a){if(!$d){var b;b=J[y].hash;var c=W[q],d=/^#?gaso=([^&]*)/;if(c=(b=(b=b&&b[na](d)||c&&c[na](d))?b[1]:K(kd("GASO")))&&b[na](/^(?:[|!]([-0-9a-z.]{1,40})[|!])?([-.\w]{10,1200})$/i))Bd(a,"GASO",""+b),M._gasoDomain=a.get(Za),M._gasoCPath=a.get(Q),a=c[1],Ia("https://www.google.com/analytics/web/inpage/pub/inpage.js?"+(a?"prefix="+a+"&":"")+Da(),"_gasojs");$d=h}};var Td=function(a,b,c){c&&(b=I(b));c=a.b(P,1);b=b[x](".");!(2>b[v])&&/^\d+$/[ha](b[0])&&(b[0]=""+c,Bd(a,"__utmx",b[B](".")))},Ud=function(a,b){var c=Vc(a.get(P),kd("__utmx"));"-"==c&&(c="");return b?G(c):c};var ce=function(a,b){var c=l.min(a.b(Ac,0),100);if(a.b(R,0)%100>=c)return k;a:{if(c=(c=W.performance||W.webkitPerformance)&&c.timing){var d=c.navigationStart;if(0==d)H(133);else{c=[c.loadEventStart-d,c.domainLookupEnd-c.domainLookupStart,c.connectEnd-c.connectStart,c.responseStart-c.requestStart,c.responseEnd-c.responseStart,c.fetchStart-d];break a}}c=g}c||(W.top!=W?c=g:(d=(c=W.external)&&c.onloadT,c&&!c.isValidLoadTime&&(d=g),2147483648<d&&(d=g),0<d&&c.setPageReadyTime(),c=d==g?g:[d]));if(c==g)return k;
d=c[0];if(d==g||d==ba||isNaN(d))return k;if(0<d){a:{for(d=1;d<c[v];d++)if(isNaN(c[d])||c[d]==ba||0>c[d]){d=k;break a}d=h}d?b(be(c)):b(be(c[ia](0,1)))}else Fa(W,"load",function(){ce(a,b)},k);return h},ee=function(a,b,c,d){var e=new td;e.f(14,90,b[A](0,64));e.f(14,91,a[A](0,64));e.f(14,92,""+de(c));d!=g&&e.f(14,93,d[A](0,64));e.o(14,90,c);return e},de=function(a){return isNaN(a)||0>a?0:5E3>a?10*l[ka](a/10):5E4>a?100*l[ka](a/100):41E5>a?1E3*l[ka](a/1E3):41E5},be=function(a){for(var b=new td,c=0;c<a[v];c++)b.f(14,
c+1,""+de(a[c])),b.o(14,c+1,a[c]);return b};var U=function(a,b,c){function d(a){return function(b){if((b=b.get(Ic)[a])&&b[v])for(var c={type:a,target:e,stopPropagation:function(){throw"aborted";}},d=0;d<b[v];d++)b[d].call(e,c)}}var e=this;this.a=new Uc;this.get=function(a){return this.a.get(a)};this.set=function(a,b,c){this.a.set(a,b,c)};this.set(O,b||"UA-XXXXX-X");this.set(Xa,a||"");this.set(Wa,c||"");this.set(Ya,l.round((new Date).getTime()/1E3));this.set(Q,"/");this.set($a,63072E6);this.set(bb,15768E6);this.set(ab,18E5);this.set(cb,k);this.set(vb,
50);this.set(db,k);this.set(eb,h);this.set(gb,h);this.set(hb,h);this.set(ib,h);this.set(jb,h);this.set(lb,"utm_campaign");this.set(kb,"utm_id");this.set(mb,"gclid");this.set(nb,"utm_source");this.set(ob,"utm_medium");this.set(pb,"utm_term");this.set(qb,"utm_content");this.set(rb,"utm_nooverride");this.set(sb,100);this.set(Ac,1);this.set(Bc,k);this.set(tb,"/__utm.gif");this.set(ub,1);this.set(zb,[]);this.set(Cb,[]);this.set(wb,Hd[ia](0));this.set(xb,[]);this.set(yb,[]);this.C("auto");this.set(Gb,J.referrer);
a=this.a;try{var f=La(J[y][wa],k),j=fa(L(f.d.get("utm_referrer")))||"";j&&a.set(Gb,j);var m=fa(K(f.d.get("utm_expid")));m&&a.set(Kc,m)}catch(r){H(146)}this.set(Ic,{hit:[],load:[]});this.a.i("0",Rd);this.a.i("2",Fd);this.a.i("3",Od);this.a.i("5",Gd);this.a.i("6",d("load"));this.a.i("7",ae);this.a.e("A",fd);this.a.e("B",hd);this.a.e("C",Fd);this.a.e("D",ed);this.a.e("E",Pc);this.a.e("F",fe);this.a.e("G",Cd);this.a.e("H",id);this.a.e("I",pd);this.a.e("J",zd);this.a.e("K",d("hit"));this.a.e("L",ge);this.a.e("M",
he);0===this.get(Ya)&&H(111);this.a.U();this.I=g};D=U[w];D.m=function(){var a=this.get(Ab);a||(a=new td,this.set(Ab,a));return a};D.Ma=function(a){for(var b in a){var c=a[b];a.hasOwnProperty(b)&&this.set(b,c,h)}};D.L=function(a){if(this.get(Bc))return k;var b=this,c=ce(this.a,function(c){b.set(Eb,a,h);b.t(c)});this.set(Bc,c);return c};
D.Ga=function(a){a&&Ba(a)?(H(13),this.set(Eb,a,h)):"object"===typeof a&&a!==i&&this.Ma(a);this.I=a=this.get(Eb);if(1>=1E3*l.random())try{var b=J[y];this.a.set(Jc,b.hash[v]);-1!=b.hash[ua](/utm_/)&&H(137)}catch(c){H(134)}this.a.j("page");this.L(a)};D.G=function(a,b,c,d,e){if(""==a||(!rd(a)||""==b||!rd(b))||c!=g&&!rd(c)||d!=g&&!sd(d))return k;this.set(tc,a,h);this.set(uc,b,h);this.set(vc,c,h);this.set(wc,d,h);this.set(sc,!!e,h);this.a.j("event");return h};
D.Ia=function(a,b,c,d,e){var f=this.a.b(Ac,0);1*e===e&&(f=e);if(this.a.b(R,0)%100>=f)return k;c=1*(""+c);if(""==a||(!rd(a)||""==b||!rd(b)||!sd(c)||isNaN(c)||0>c||0>f||100<f)||d!=g&&(""==d||!rd(d)))return k;this.t(ee(a,b,c,d));return h};D.Ha=function(a,b,c,d){if(!a||!b)return k;this.set(xc,a,h);this.set(yc,b,h);this.set(zc,c||J[y][wa],h);d&&this.set(Eb,d,h);this.a.j("social");return h};D.Fa=function(){this.set(Ac,10);this.L(this.I)};D.Ja=function(){this.a.j("trans")};
D.t=function(a){this.set(Bb,a,h);this.a.j("event")};D.ja=function(a){this.v();var b=this;return{_trackEvent:function(c,d,e){H(91);b.G(a,c,d,e)}}};D.na=function(a){return this.get(a)};D.ya=function(a,b){if(a)if(Ba(a))this.set(a,b);else if("object"==typeof a)for(var c in a)a.hasOwnProperty(c)&&this.set(c,a[c])};D.addEventListener=function(a,b){var c=this.get(Ic)[a];c&&c[n](b)};D.removeEventListener=function(a,b){for(var c=this.get(Ic)[a],d=0;c&&d<c[v];d++)if(c[d]==b){c.splice(d,1);break}};D.ra=function(){return"5.3.5"};
D.C=function(a){this.get(eb);a="auto"==a?Ka(J.domain):!a||"-"==a||"none"==a?"":a[C]();this.set(Za,a)};D.wa=function(a){this.set(eb,!!a)};D.oa=function(a,b){return Vd(this.a,a,b)};D.link=function(a,b){if(this.a.get(cb)&&a){var c=Vd(this.a,a,b);J[y].href=c}};D.va=function(a,b){this.a.get(cb)&&(a&&a.action)&&(a.action=Vd(this.a,a.action,b))};
D.Aa=function(){this.v();var a=this.a,b=J.getElementById?J.getElementById("utmtrans"):J.utmform&&J.utmform.utmtrans?J.utmform.utmtrans:i;if(b&&b[ma]){a.set(zb,[]);for(var b=b[ma][x]("UTM:"),c=0;c<b[v];c++){b[c]=Ca(b[c]);for(var d=b[c][x](Wd),e=0;e<d[v];e++)d[e]=Ca(d[e]);"T"==d[0]?Yd(a,d[1],d[2],d[3],d[4],d[5],d[6],d[7],d[8]):"I"==d[0]&&Zd(a,d[1],d[2],d[3],d[4],d[5],d[6])}}};D.aa=function(a,b,c,d,e,f,j,m){return Yd(this.a,a,b,c,d,e,f,j,m)};D.Z=function(a,b,c,d,e,f){return Zd(this.a,a,b,c,d,e,f)};
D.Ba=function(a){Wd=a||"|"};D.fa=function(){this.set(zb,[])};D.xa=function(a,b,c,d){var e=this.a;if(0>=a||a>e.get(vb))a=k;else if(!b||!c||128<b[v]+c[v])a=k;else{1!=d&&2!=d&&(d=3);var f={};ga(f,b);f.value=c;f.scope=d;e.get(Cb)[a]=f;a=h}a&&this.a.n();return a};D.la=function(a){this.a.get(Cb)[a]=g;this.a.n()};D.sa=function(a){return(a=this.a.get(Cb)[a])&&1==a[ta]?a[ma]:g};D.Da=function(a,b,c){this.m().f(a,b,c)};D.Ea=function(a,b,c){this.m().o(a,b,c)};D.ta=function(a,b){return this.m().getKey(a,b)};
D.ua=function(a,b){return this.m().O(a,b)};D.ga=function(a){this.m().M(a)};D.ha=function(a){this.m().N(a)};D.ka=function(){return new td};D.X=function(a){a&&this.get(xb)[n](a[C]())};D.ca=function(){this.set(xb,[])};D.Y=function(a){a&&this.get(yb)[n](a[C]())};D.da=function(){this.set(yb,[])};D.$=function(a,b,c,d,e){if(a&&b){a=[a,b[C]()][B](":");if(d||e)a=[a,d,e][B](":");d=this.get(wb);d.splice(c?0:d[v],0,a)}};D.ea=function(){this.set(wb,[])};
D.ia=function(a){this.a[ja]();var b=this.get(Q),c=Ud(this.a);this.set(Q,a);this.a.n();Td(this.a,c);this.set(Q,b)};D.za=function(a,b){if(0<a&&5>=a&&Ba(b)&&""!=b){var c=this.get(Cc)||[];c[a]=b;this.set(Cc,c)}};D.W=function(a){a=""+a;if(a[na](/^[A-Za-z0-9]{1,5}$/)){var b=this.get(Dc)||[];b[n](a);this.set(Dc,b)}};D.v=function(){this.a[ja]()};D.Ca=function(a){a&&""!=a&&(this.set(Qb,a),this.a.j("var"))};var fe=function(a){"trans"!==a.get(pc)&&500<=a.b(Zb,0)&&a[sa]();if("event"===a.get(pc)){var b=(new Date).getTime(),c=a.b($b,0),d=a.b(Vb,0),c=l[ka](1*((b-(c!=d?c:1E3*c))/1E3));0<c&&(a.set($b,b),a.set(S,l.min(10,a.b(S,0)+c)));0>=a.b(S,0)&&a[sa]()}},he=function(a){"event"===a.get(pc)&&a.set(S,l.max(0,a.b(S,10)-1))};var ie=function(){var a=[];this.add=function(b,c,d){d&&(c=G(""+c));a[n](b+"="+c)};this.toString=function(){return a[B]("&")}},je=function(a,b){(b||2!=a.get(ub))&&a.z(Zb)},ke=function(a,b){b.add("utmwv","5.3.5");b.add("utms",a.get(Zb));b.add("utmn",Da());var c=J[y].hostname;E(c)||b.add("utmhn",c,h);c=a.get(sb);100!=c&&b.add("utmsp",c,h)},le=function(a,b){b.add("utmac",Ca(a.get(O)));a.get(Kc)&&b.add("utmxkey",a.get(Kc),h);a.get(sc)&&b.add("utmni",1);var c=a.get(Dc);c&&0<c[v]&&b.add("utmdid",c[B]("."));
var c=function(a,b){b&&d[n](a+"="+b+";")},d=[];c("__utma",Yc(a));c("__utmz",cd(a,k));c("__utmv",ad(a,h));c("__utmx",Ud(a));b.add("utmcc",d[B]("+"),h);M.w&&b.add("aip",1);b.add("utmu",jd.Ya());a.get(Jc)!=g&&b.add("utmhlen",a.get(Jc),h)},me=function(a,b){for(var c=a.get(Cc)||[],d=[],e=1;e<c[v];e++)c[e]&&d[n](e+":"+G(c[e][o](/%/g,"%25")[o](/:/g,"%3A")[o](/,/g,"%2C")));d[v]&&b.add("utmpg",d[B](","))},ne=function(a,b){a.get(gb)&&(b.add("utmcs",a.get(Nb),h),b.add("utmsr",a.get(Ib)),a.get(Ob)&&b.add("utmvp",
a.get(Ob)),b.add("utmsc",a.get(Jb)),b.add("utmul",a.get(Mb)),b.add("utmje",a.get(Kb)),b.add("utmfl",a.get(Lb),h))},oe=function(a,b){a.get(jb)&&a.get(Fb)&&b.add("utmdt",a.get(Fb),h);b.add("utmhid",a.get(Hb));b.add("utmr",Oa(a.get(Gb),a.get(Q)),h);b.add("utmp",G(a.get(Eb),h),h)},pe=function(a,b){for(var c=a.get(Ab),d=a.get(Bb),e=a.get(Cb)||[],f=0;f<e[v];f++){var j=e[f];j&&(c||(c=new td),c.f(8,f,j[q]),c.f(9,f,j[ma]),3!=j[ta]&&c.f(11,f,""+j[ta]))}!E(a.get(tc))&&!E(a.get(uc),h)&&(c||(c=new td),c.f(5,1,
a.get(tc)),c.f(5,2,a.get(uc)),e=a.get(vc),e!=g&&c.f(5,3,e),e=a.get(wc),e!=g&&c.o(5,1,e));c?b.add("utme",c.Ra(d),h):d&&b.add("utme",d.A(),h)},qe=function(a,b,c){var d=new ie;je(a,c);ke(a,d);d.add("utmt","tran");d.add("utmtid",b.id_,h);d.add("utmtst",b.affiliation_,h);d.add("utmtto",b.total_,h);d.add("utmttx",b.tax_,h);d.add("utmtsp",b.shipping_,h);d.add("utmtci",b.city_,h);d.add("utmtrg",b.state_,h);d.add("utmtco",b.country_,h);pe(a,d);ne(a,d);oe(a,d);(b=a.get(Db))&&d.add("utmcu",b,h);c||(me(a,d),
le(a,d));return d[u]()},re=function(a,b,c){var d=new ie;je(a,c);ke(a,d);d.add("utmt","item");d.add("utmtid",b.transId_,h);d.add("utmipc",b.sku_,h);d.add("utmipn",b.name_,h);d.add("utmiva",b.category_,h);d.add("utmipr",b.price_,h);d.add("utmiqt",b.quantity_,h);pe(a,d);ne(a,d);oe(a,d);(b=a.get(Db))&&d.add("utmcu",b,h);c||(me(a,d),le(a,d));return d[u]()},se=function(a,b){var c=a.get(pc);if("page"==c)c=new ie,je(a,b),ke(a,c),pe(a,c),ne(a,c),oe(a,c),b||(me(a,c),le(a,c)),c=[c[u]()];else if("event"==c)c=
new ie,je(a,b),ke(a,c),c.add("utmt","event"),pe(a,c),ne(a,c),oe(a,c),b||(me(a,c),le(a,c)),c=[c[u]()];else if("var"==c)c=new ie,je(a,b),ke(a,c),c.add("utmt","var"),!b&&le(a,c),c=[c[u]()];else if("trans"==c)for(var c=[],d=a.get(zb),e=0;e<d[v];++e){c[n](qe(a,d[e],b));for(var f=d[e].items_,j=0;j<f[v];++j)c[n](re(a,f[j],b))}else"social"==c?b?c=[]:(c=new ie,je(a,b),ke(a,c),c.add("utmt","social"),c.add("utmsn",a.get(xc),h),c.add("utmsa",a.get(yc),h),c.add("utmsid",a.get(zc),h),pe(a,c),ne(a,c),oe(a,c),me(a,
c),le(a,c),c=[c[u]()]):c=[];return c},ge=function(a){var b,c=a.get(ub),d=a.get(rc),e=d&&d.Va,f=0;if(0==c||2==c){var j=a.get(tb)+"?";b=se(a,h);for(var m=0,r=b[v];m<r;m++)Ra(b[m],e,j,h),f++}if(1==c||2==c){b=se(a);m=0;for(r=b[v];m<r;m++)try{Ra(b[m],e),f++}catch(s){s&&Qa(s[q],g,s.message)}}d&&(d.q=f)};var te=function(){return"https:"==J[y][z]||M.H?"https://ssl.google-analytics.com":"http://www.google-analytics.com"},ue=function(a){ga(this,"len");this.message=a+"-8192"},ve=function(a){ga(this,"ff2post");this.message=a+"-2036"},Ra=function(a,b,c,d){b=b||Ea;if(d||2036>=a[v]){var e=b,b=c||te()+"/__utm.gif?",f=new Image(1,1);f.src=b+a;f.onload=function(){f.onload=i;f.onerror=i;e()};f.onerror=function(){f.onload=i;f.onerror=i;e()}}else if(8192>=a[v]){var j=b;if(0<=W[ya].userAgent[p]("Firefox")&&![].reduce)throw new ve(a[v]);
var m,b=te()+"/p/__utm.gif";if(c=W.XDomainRequest)m=new c,m.open("POST",b);else if(c=W.XMLHttpRequest)c=new c,"withCredentials"in c&&(m=c,m.open("POST",b,h),m.setRequestHeader("Content-Type","text/plain"));m?(m.onreadystatechange=function(){4==m.readyState&&(j(),m=i)},m.send(a),b=h):b=g;b||we(a,j)}else throw new ue(a[v]);},we=function(a,b){if(J.body){a=aa(a);try{var c=J[pa]('<iframe name="'+a+'"></iframe>')}catch(d){c=J[pa]("iframe"),ga(c,a)}c.height="0";c.width="0";c.style.display="none";c.style.visibility=
"hidden";var e=J[y],e=te()+"/u/post_iframe.html#"+aa(e[z]+"//"+e[t]+"/favicon.ico"),f=function(){c.src="";c.parentNode&&c.parentNode.removeChild(c)};Fa(W,"beforeunload",f);var j=k,m=0,r=function(){if(!j){try{if(9<m||c.contentWindow[y][t]==J[y][t]){j=h;f();Ha(W,"beforeunload",f);b();return}}catch(a){}m++;ca(r,200)}};Fa(c,"load",r);J.body.appendChild(c);c.src=e}else ca(function(){we(a,b)},100)};var $=function(){this.H=this.w=k;this.D={};this.F=[];this.V=0;this.T=[["www.google-analytics.com","","/plugins/"]];this._gasoCPath=this._gasoDomain=g;var a=function(a,c,d){T($[w],a,c,d)};a("_createTracker",$[w].r,55);a("_getTracker",$[w].pa,0);a("_getTrackerByName",$[w].u,51);a("_getTrackers",$[w].qa,130);a("_anonymizeIp",$[w].ba,16);a("_forceSSL",$[w].ma,125);a("_getPlugin",Lc,120);a=function(a,c,d){T(U[w],a,c,d)};Mc("_getName",Xa,58);Mc("_getAccount",O,64);Mc("_visitCode",R,54);Mc("_getClientInfo",
gb,53,1);Mc("_getDetectTitle",jb,56,1);Mc("_getDetectFlash",hb,65,1);Mc("_getLocalGifPath",tb,57);Mc("_getServiceMode",ub,59);V("_setClientInfo",gb,66,2);V("_setAccount",O,3);V("_setNamespace",Wa,48);V("_setAllowLinker",cb,11,2);V("_setDetectFlash",hb,61,2);V("_setDetectTitle",jb,62,2);V("_setLocalGifPath",tb,46,0);V("_setLocalServerMode",ub,92,g,0);V("_setRemoteServerMode",ub,63,g,1);V("_setLocalRemoteServerMode",ub,47,g,2);V("_setSampleRate",sb,45,1);V("_setCampaignTrack",ib,36,2);V("_setAllowAnchor",
db,7,2);V("_setCampNameKey",lb,41);V("_setCampContentKey",qb,38);V("_setCampIdKey",kb,39);V("_setCampMediumKey",ob,40);V("_setCampNOKey",rb,42);V("_setCampSourceKey",nb,43);V("_setCampTermKey",pb,44);V("_setCampCIdKey",mb,37);V("_setCookiePath",Q,9,0);V("_setMaxCustomVariables",vb,0,1);V("_setVisitorCookieTimeout",$a,28,1);V("_setSessionCookieTimeout",ab,26,1);V("_setCampaignCookieTimeout",bb,29,1);V("_setReferrerOverride",Gb,49);V("_setSiteSpeedSampleRate",Ac,132);a("_trackPageview",U[w].Ga,1);a("_trackEvent",
U[w].G,4);a("_trackPageLoadTime",U[w].Fa,100);a("_trackSocial",U[w].Ha,104);a("_trackTrans",U[w].Ja,18);a("_sendXEvent",U[w].t,78);a("_createEventTracker",U[w].ja,74);a("_getVersion",U[w].ra,60);a("_setDomainName",U[w].C,6);a("_setAllowHash",U[w].wa,8);a("_getLinkerUrl",U[w].oa,52);a("_link",U[w].link,101);a("_linkByPost",U[w].va,102);a("_setTrans",U[w].Aa,20);a("_addTrans",U[w].aa,21);a("_addItem",U[w].Z,19);a("_clearTrans",U[w].fa,105);a("_setTransactionDelim",U[w].Ba,82);a("_setCustomVar",U[w].xa,
10);a("_deleteCustomVar",U[w].la,35);a("_getVisitorCustomVar",U[w].sa,50);a("_setXKey",U[w].Da,83);a("_setXValue",U[w].Ea,84);a("_getXKey",U[w].ta,76);a("_getXValue",U[w].ua,77);a("_clearXKey",U[w].ga,72);a("_clearXValue",U[w].ha,73);a("_createXObj",U[w].ka,75);a("_addIgnoredOrganic",U[w].X,15);a("_clearIgnoredOrganic",U[w].ca,97);a("_addIgnoredRef",U[w].Y,31);a("_clearIgnoredRef",U[w].da,32);a("_addOrganic",U[w].$,14);a("_clearOrganic",U[w].ea,70);a("_cookiePathCopy",U[w].ia,30);a("_get",U[w].na,
106);a("_set",U[w].ya,107);a("_addEventListener",U[w].addEventListener,108);a("_removeEventListener",U[w].removeEventListener,109);a("_addDevId",U[w].W);a("_getPlugin",Lc,122);a("_setPageGroup",U[w].za,126);a("_trackTiming",U[w].Ia,124);a("_initData",U[w].v,2);a("_setVar",U[w].Ca,22);V("_setSessionTimeout",ab,27,3);V("_setCookieTimeout",bb,25,3);V("_setCookiePersistence",$a,24,1);a("_setAutoTrackOutbound",Ea,79);a("_setTrackOutboundSubdomains",Ea,81);a("_setHrefExamineLimit",Ea,80)};D=$[w];
D.pa=function(a,b){return this.r(a,g,b)};D.r=function(a,b,c){b&&H(23);c&&H(67);b==g&&(b="~"+M.V++);a=new U(b,a,c);M.D[b]=a;M.F[n](a);return a};D.u=function(a){a=a||"";return M.D[a]||M.r(g,a)};D.qa=function(){return M.F[ia](0)};D.ba=function(){this.w=h};D.ma=function(){this.H=h};var xe=function(a){if("prerender"==J.webkitVisibilityState)return k;a();return h};var M=new $;var ye=W._gat;ye&&Aa(ye._getTracker)?M=ye:W._gat=M;var Z=new Y;var ze=function(){var a=W._gaq,b=k;if(a&&Aa(a[n])&&(b="[object Array]"==Object[w][u].call(Object(a)),!b)){Z=a;return}W._gaq=Z;b&&Z[n][xa](Z,a)};if(!xe(ze)){H(123);var Ae=k,Be=function(){!Ae&&xe(ze)&&(Ae=h,Ha(J,"webkitvisibilitychange",Be))};Fa(J,"webkitvisibilitychange",Be)};})();


(function(d){var l="left",k="right",c="up",r="down",b="in",s="out",i="none",o="auto",u="horizontal",p="vertical",f="all",e="start",h="move",g="end",m="cancel",a="ontouchstart" in window,t="TouchSwipe";var j={fingers:1,threshold:75,maxTimeThreshold:null,swipe:null,swipeLeft:null,swipeRight:null,swipeUp:null,swipeDown:null,swipeStatus:null,pinchIn:null,pinchOut:null,pinchStatus:null,click:null,triggerOnTouchEnd:true,allowPageScroll:"auto",fallbackToMouseEvents:true,excludedElements:"button, input, select, textarea, a, .noSwipe, "};d.fn.swipe=function(x){var w=d(this),v=w.data(t);if(v&&typeof x==="string"){if(v[x]){return v[x].apply(this,Array.prototype.slice.call(arguments,1))}else{d.error("Method "+x+" does not exist on jQuery.swipe")}}else{if(!v&&(typeof x==="object"||!x)){return q.apply(this,arguments)}}return w};d.fn.swipe.defaults=j;d.fn.swipe.phases={PHASE_START:e,PHASE_MOVE:h,PHASE_END:g,PHASE_CANCEL:m};d.fn.swipe.directions={LEFT:l,RIGHT:k,UP:c,DOWN:r,IN:b,OUT:s};d.fn.swipe.pageScroll={NONE:i,HORIZONTAL:u,VERTICAL:p,AUTO:o};d.fn.swipe.fingers={ONE:1,TWO:2,THREE:3,ALL:f};function q(v){if(v&&(v.allowPageScroll===undefined&&(v.swipe!==undefined||v.swipeStatus!==undefined))){v.allowPageScroll=i}if(!v){v={}}v=d.extend({},d.fn.swipe.defaults,v);return this.each(function(){var x=d(this);var w=x.data(t);if(!w){w=new n(this,v);x.data(t,w)}})}function n(J,R){var aj=(a||!R.fallbackToMouseEvents),ae=aj?"touchstart":"mousedown",K=aj?"touchmove":"mousemove",ac=aj?"touchend":"mouseup",I="touchcancel";var P=0;var E=null;var S=0;var af=0;var w=0;var U=1;var ak=0;var A=d(J);var F="start";var ai=0;var T=null;var B=0;var M=0;try{A.bind(ae,aa);A.bind(I,D)}catch(ag){d.error("events not supported "+ae+","+I+" on jQuery.swipe")}this.enable=function(){A.bind(ae,aa);A.bind(I,D);return A};this.disable=function(){H();return A};this.destroy=function(){H();A.data(t,null);return A};function aa(ao){if(L()){return}if(d(ao.target).closest(R.excludedElements,A).length>0){return}ao=ao.originalEvent;var an,am=a?ao.touches[0]:ao;F=e;if(a){ai=ao.touches.length}else{ao.preventDefault()}P=0;E=null;ak=null;S=0;af=0;w=0;U=1;T=al();if(!a||(ai===R.fingers||R.fingers===f)||W()){T[0].start.x=T[0].end.x=am.pageX;T[0].start.y=T[0].end.y=am.pageY;B=x();if(ai==2){T[1].start.x=T[1].end.x=ao.touches[1].pageX;T[1].start.y=T[1].end.y=ao.touches[1].pageY;af=w=N(T[0].start,T[1].start)}if(R.swipeStatus||R.pinchStatus){an=ah(ao,F)}}else{D(ao);an=false}if(an===false){F=m;ah(ao,F);return an}else{V(true);A.bind(K,G);A.bind(ac,O)}}function G(ap){ap=ap.originalEvent;if(F===g||F===m){return}var an,am=a?ap.touches[0]:ap;T[0].end.x=a?ap.touches[0].pageX:am.pageX;T[0].end.y=a?ap.touches[0].pageY:am.pageY;M=x();E=Z(T[0].start,T[0].end);if(a){ai=ap.touches.length}F=h;if(ai==2){if(af==0){T[1].start.x=ap.touches[1].pageX;T[1].start.y=ap.touches[1].pageY;af=w=N(T[0].start,T[1].start)}else{T[1].end.x=ap.touches[1].pageX;T[1].end.y=ap.touches[1].pageY;w=N(T[0].end,T[1].end);ak=X(T[0].end,T[1].end)}U=v(af,w)}if((ai===R.fingers||R.fingers===f)||!a){y(ap,E);P=z(T[0].start,T[0].end);S=C(T[0].start,T[0].end);if(R.swipeStatus||R.pinchStatus){an=ah(ap,F)}if(!R.triggerOnTouchEnd){var ao=!Y();if(Q()===true){F=g;an=ah(ap,F)}else{if(ao){F=m;ah(ap,F)}}}}else{F=m;ah(ap,F)}if(an===false){F=m;ah(ap,F)}}function O(at){at=at.originalEvent;if(at.touches&&at.touches.length>0){return true}at.preventDefault();M=x();if(af!=0){w=N(T[0].end,T[1].end);U=v(af,w);ak=X(T[0].end,T[1].end)}P=z(T[0].start,T[0].end);E=Z(T[0].start,T[0].end);S=C();if(R.triggerOnTouchEnd||(R.triggerOnTouchEnd===false&&F===h)){F=g;var ap=ad()||!W();var an=((ai===R.fingers||R.fingers===f)||!a);var am=T[0].end.x!==0;var ao=(an&&am&&ap);if(ao){var aq=Y();var ar=Q();if((ar===true||ar===null)&&aq){ah(at,F)}else{if(!aq||ar===false){F=m;ah(at,F)}}}else{F=m;ah(at,F)}}else{if(F===h){F=m;ah(at,F)}}A.unbind(K,G,false);A.unbind(ac,O,false);V(false)}function D(){ai=0;M=0;B=0;af=0;w=0;U=1;V(false)}function ah(ao,am){var an=undefined;if(R.swipeStatus){an=R.swipeStatus.call(A,ao,am,E||null,P||0,S||0,ai)}if(R.pinchStatus&&ad()){an=R.pinchStatus.call(A,ao,am,ak||null,w||0,S||0,ai,U)}if(am===m){if(R.click&&(ai===1||!a)&&(isNaN(P)||P===0)){an=R.click.call(A,ao,ao.target)}}if(am==g){if(R.swipe){an=R.swipe.call(A,ao,E,P,S,ai)}switch(E){case l:if(R.swipeLeft){an=R.swipeLeft.call(A,ao,E,P,S,ai)}break;case k:if(R.swipeRight){an=R.swipeRight.call(A,ao,E,P,S,ai)}break;case c:if(R.swipeUp){an=R.swipeUp.call(A,ao,E,P,S,ai)}break;case r:if(R.swipeDown){an=R.swipeDown.call(A,ao,E,P,S,ai)}break}switch(ak){case b:if(R.pinchIn){an=R.pinchIn.call(A,ao,ak||null,w||0,S||0,ai,U)}break;case s:if(R.pinchOut){an=R.pinchOut.call(A,ao,ak||null,w||0,S||0,ai,U)}break}}if(am===m||am===g){D(ao)}return an}function Q(){if(R.threshold!==null){return P>=R.threshold}return null}function Y(){var am;if(R.maxTimeThreshold){if(S>=R.maxTimeThreshold){am=false}else{am=true}}else{am=true}return am}function y(am,an){if(R.allowPageScroll===i||W()){am.preventDefault()}else{var ao=R.allowPageScroll===o;switch(an){case l:if((R.swipeLeft&&ao)||(!ao&&R.allowPageScroll!=u)){am.preventDefault()}break;case k:if((R.swipeRight&&ao)||(!ao&&R.allowPageScroll!=u)){am.preventDefault()}break;case c:if((R.swipeUp&&ao)||(!ao&&R.allowPageScroll!=p)){am.preventDefault()}break;case r:if((R.swipeDown&&ao)||(!ao&&R.allowPageScroll!=p)){am.preventDefault()}break}}}function C(){return M-B}function N(ap,ao){var an=Math.abs(ap.x-ao.x);var am=Math.abs(ap.y-ao.y);return Math.round(Math.sqrt(an*an+am*am))}function v(am,an){var ao=(an/am)*1;return ao.toFixed(2)}function X(){if(U<1){return s}else{return b}}function z(an,am){return Math.round(Math.sqrt(Math.pow(am.x-an.x,2)+Math.pow(am.y-an.y,2)))}function ab(ap,an){var am=ap.x-an.x;var ar=an.y-ap.y;var ao=Math.atan2(ar,am);var aq=Math.round(ao*180/Math.PI);if(aq<0){aq=360-Math.abs(aq)}return aq}function Z(an,am){var ao=ab(an,am);if((ao<=45)&&(ao>=0)){return l}else{if((ao<=360)&&(ao>=315)){return l}else{if((ao>=135)&&(ao<=225)){return k}else{if((ao>45)&&(ao<135)){return r}else{return c}}}}}function x(){var am=new Date();return am.getTime()}function H(){A.unbind(ae,aa);A.unbind(I,D);A.unbind(K,G);A.unbind(ac,O);V(false)}function W(){return R.pinchStatus||R.pinchIn||R.pinchOut}function ad(){return ak&&W()}function L(){return A.data(t+"_intouch")===true?true:false}function V(am){am=am===true?true:false;A.data(t+"_intouch",am)}function al(){var am=[];for(var an=0;an<=5;an++){am.push({start:{x:0,y:0},end:{x:0,y:0},delta:{x:0,y:0}})}return am}}})(jQuery);













eval(function(p,a,c,k,e,r){e=function(c){return(c<a?'':e(parseInt(c/a)))+((c=c%a)>35?String.fromCharCode(c+29):c.toString(36))};if(!''.replace(/^/,String)){while(c--)r[e(c)]=k[c]||e(c);k=[function(e){return r[e]}];e=function(){return'\\w+'};c=1};while(c--)if(k[c])p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c]);return p}(';(6($){$.15=6(h,k){o l=$(h),3=$.4s({},$.15.3j,k),8=3.8,19=("4q"3t 2p)||2p.3v&&2J 4g 3v,1M=(19)?"2u":"1H",L=3.C==="L",x=3.x,A=(3.1B>0),U=3.2f==="U",1a=3.2e!=="",n={};$.1x(h,"15",l);n={1c:6(){l.1f=q;l.7=3.3y;l.v=l.7;l.1J=(l.7===0||l.7===l.t);l.2v=3.18.4a(0,3.18.47(\' \'));l.9=$(3.18,l);l.K=$(l.2v,l);l.u=l.9.1e;l.2b=$(3.1y).1e>0;4(3.2f==="16")3.2f="3I";l.2N=(L)?"3S":"3Q";l.2a={};l.28=q;l.1L=!3.3L&&!U&&3.3M&&(6(){o a=2J.4l(\'1T\'),25=[\'3T\',\'3U\',\'3V\',\'3W\',\'3Y\'];3D(o i 3t 25){4(a.40[25[i]]!==1w){l.2s=25[i].41(\'42\',\'\').44();l.2N="-"+l.2s+"-4d";N r}}N q}());4(3.J!=="")l.J=$(3.J).1e>0&&$(3.J);4(3.1p!=="")l.1p=$(3.1p).1e>0&&$(3.1p);4(3.3x){l.9.4e(6(){N(Q.4i(Q.4j())-0.5)});l.K.3s().S(l.9)}l.1E();4(1a)n.1a.10();l.10("1c");4(3.p)n.p.10();4(3.B)n.B.10();4(3.3r&&($(l.2v).1e===1||3.3m)){$(2J).1o(\'4n\',6(a){o b=a.4o;4(!l.1f&&(b===39||b===37)){o c=(b===39)?l.12(\'z\'):(b===37)?l.12(\'T\'):q;l.M(c,3.1d)}})}4(3.2l){l.1o(\'2l\',6(a,b,c,d){a.11();o e=(b<0)?l.12(\'z\'):l.12(\'T\');l.M(e,3.1d)})}4(3.I)n.I.10();4(3.2r){4(3.3i){l.4t(6(){l.G()},6(){4(!l.28)l.H()})}(3.2w>0)?21(l.H,3.2w):l.H()}4(19&&3.19)n.19();4(!U||(U&&3.Y))$(2p).1o("2A 4v",n.2A);21(6(){3.1Z(l)},2F)},1a:{10:6(){l.1a=r;l.v=Q.2G(l.7/l.W);l.1z=l.7;l.9.X(8+"y-16").D(l.1z).V(8+"y-16");l.9.1H(6(e){e.11();o a=$(1k),R=a.1Y();4(!$(3.2e).1x(\'15\').1f&&!a.1Q(\'y\')){l.C=(l.1z<R)?"z":"T";l.M(R,3.1d,q,r,r)}})}},p:{10:6(){4(!l.1p){n.p.3f()}m{n.p.3e()}},3f:6(){o c=(3.p==="2m")?\'1W-4w\':\'1W-4x\',j=1,2q;l.1m=$(\'<3b 1G="\'+8+\'1W-1R \'+8+c+\'"></3b>\');4(l.E>1){3D(o i=0;i<l.E;i++){2q=(3.p==="2m")?\'<2n 4z="\'+l.9.D(i).4A("1x-4C")+\'"/>\':\'<a>\'+j+\'</a>\';l.1m.S(\'<O>\'+2q+\'</O>\');j++}}(l.J)?$(l.J).S(l.1m):l.S(l.1m);n.p.2B();n.p.y();l.1m.35(\'a, 2n\',1M,6(a){a.11();o b=$(1k),R=l.p.1Y(b);4(!b.1Q(8+\'y\')){l.C=(R>l.7)?"z":"T";l.M(R,3.1d)}});4(19){l.1m.35(\'a\',"1H 1S",6(a){a.11()})}},3e:6(){l.p=l.1p;n.p.y();l.p.34(1M,6(a){a.11();o b=$(1k),R=l.p.1Y(b);4(!b.1Q(8+\'y\')){(R>l.7)?l.C="z":l.C="T";l.M(R,3.1d)}});4(19){l.p.34("1H 1S",6(a){a.11()})}},2B:6(){o a=(3.p==="2m")?\'2n\':\'a\';l.p=$(\'.\'+8+\'1W-1R O \'+a,(l.J)?l.J:l)},y:6(){l.p.X(8+"y").D(l.v).V(8+"y")},F:6(a,b){4(l.E>1&&a==="29"){l.1m.S($(\'<O><a>\'+l.u+\'</a></O>\'))}m 4(l.E===1){l.1m.2H(\'O\').1g()}m{l.p.D(b).4D(\'O\').1g()}n.p.2B();(l.E>1&&l.E!==l.p.1e)?l.F(b,a):n.p.y()}},B:{10:6(){o c=$(\'<31 1G="\'+8+\'C-1R"><O><a 1G="\'+8+\'T" 30="#">\'+3.2Z+\'</a></O><O><a 1G="\'+8+\'z" 30="#">\'+3.2Y+\'</a></O></31>\');4(l.J){$(l.J).S(c);l.B=$(\'.\'+8+\'C-1R O a\',l.J)}m{l.S(c);l.B=$(\'.\'+8+\'C-1R O a\',l)}n.B.F();l.B.1o(1M,6(a){a.11();o b=($(1k).1Q(8+\'z\'))?l.12(\'z\'):l.12(\'T\');l.M(b,3.1d)});4(19){l.B.1o("1H 1S",6(a){a.11()})}},F:6(){o a=8+\'4N\';4(l.E===1){l.B.V(a)}m 4(!3.17){4(l.v===0){l.B.X(a).2Q(\'.\'+8+"T").V(a)}m 4(l.v===l.t){l.B.X(a).2Q(\'.\'+8+"z").V(a)}m{l.B.X(a)}}m{l.B.X(a)}}},I:{10:6(){o b=$(\'<1T 1G="\'+8+\'2R"><a></a></1T>\');4(l.J){l.J.S(b);l.I=$(\'.\'+8+\'2R a\',l.J)}m{l.S(b);l.I=$(\'.\'+8+\'2R a\',l)}n.I.F((3.2r)?8+\'G\':8+\'H\');l.I.1o(1M,6(a){a.11();4($(1k).1Q(8+\'G\')){l.G();l.28=r}m{l.H();l.28=q}});4(19){l.I.1o("1H 1S",6(a){a.11()})}},F:6(a){(a==="H")?l.I.X(8+\'G\').V(8+\'H\').2W(3.3J):l.I.X(8+\'H\').V(8+\'G\').2W(3.2V)}},19:6(){o b,1O,2h,1I,P,2d,2c=q;h.2K(\'1S\',32,q);6 32(e){4(l.1f){e.11()}m 4(e.1j.1e===1){l.G();1I=(L)?l.h:l.w;2d=2C(24 2y());2h=(A&&x&&l.v===l.t)?0:(A&&x)?l.1r-(((l.13+3.1n)*l.W)*l.v):(A&&l.7===l.t)?l.1r:(A)?((l.13+3.1n)*l.W)*l.7:(x)?(l.t-l.7+l.14)*1I:(l.7+l.14)*1I;b=(L)?e.1j[0].27:e.1j[0].1X;1O=(L)?e.1j[0].1X:e.1j[0].27;h.2K(\'3g\',2D,q);h.2K(\'2u\',2t,q)}}6 2D(e){P=(L)?b-e.1j[0].27:b-e.1j[0].1X;2c=(L)?(Q.1t(P)<Q.1t(e.1j[0].1X-1O)):(Q.1t(P)<Q.1t(e.1j[0].27-1O));4(!2c||2C(24 2y())-2d>4r){e.11();4(!U&&l.1L){4(!3.17){P=P/((l.7===0&&P<0||l.7===l.t&&P>0)?(Q.1t(P)/1I+2):1)}l.1b(2h+P,"2L")}}}6 2t(e){4(l.v===l.7&&!2c&&!(P===1P)){o a=(x)?-P:P,R=(a>0)?l.12(\'z\'):l.12(\'T\');4(l.2z(R)&&(2C(24 2y())-2d<4m&&Q.1t(a)>20||Q.1t(a)>1I/2)){l.M(R,3.1d)}m{l.M(l.7,3.1d,r)}}h.3p(\'3g\',2D,q);h.3p(\'2u\',2t,q);b=1P;1O=1P;P=1P;2h=1P}},2A:6(){4(!l.1f&&l.3q(\':1l\')){4(!A)l.1E();4(U){n.Y()}m 4(A){l.9.1q(l.1s);l.F(l.E);l.1b()}m 4(L){l.1V.1i(l.h);l.1b(l.h,"2P")}m{4(3.Y)n.Y();l.22.1q(l.1s);l.1b(l.1s,"2P")}}},Y:6(a){4(!L||U){o b=(U)?l:l.1V;(a)?b.23({"1i":l.9.D(l.v).1i()},a):b.1i(l.9.D(l.v).1i())}},1y:6(a){o b=$(3.1y).1x("15"),R=l.v;2x(a){Z"23":b.M(R,3.1d,q,r);1u;Z"H":4(!b.2o&&!b.1a){b.H()}1u;Z"G":b.G();1u}}},l.M=6(a,b,c,d,e){4(!l.1f&&(l.2z(a)||c)&&l.3q(":1l")){4(1a&&d){o f=$(3.2e).1x(\'15\');l.1J=a===0||a===l.u-1;f.M(a,r,q,r,e);l.C=(l.1z<a)?"z":"T";f.C=l.C;4(Q.3E((a+1)/l.1l)-1!==l.7&&a!==0){l.1z=a;l.9.X(8+"y-16").D(a).V(8+"y-16");a=Q.2G(a/l.1l)}m{l.1z=a;l.9.X(8+"y-16").D(a).V(8+"y-16");N q}}l.1f=r;l.v=a;3.2k(l);4(b)l.G();4(l.2b&&!e)n.1y("23");4(3.p)n.p.y();4(!A)l.9.X(8+\'y-16\').D(a).V(8+\'y-16\');l.1J=a===0||a===l.t;4(3.B)n.B.F();4(a===l.t){3.3G(l);4(!3.17)l.G()}4(!U){o g=(L)?l.9.2Q(\':2T\').1i():l.1s,2S,1K,26;4(A){2S=(3.1B>l.w)?3.1n*2:3.1n;26=((l.13+2S)*l.W)*l.v;1K=(26>l.1r&&l.1l!==1)?l.1r:26}m 4(l.7===0&&a===l.u-1&&3.17&&l.C!=="z"){1K=(x)?(l.u+l.14)*g:0}m 4(l.7===l.t&&a===0&&3.17&&l.C!=="T"){1K=(x)?0:(l.u+1)*g}m{1K=(x)?((l.u-1)-a+l.14)*g:(a+l.14)*g}l.1b(1K,"",3.1v);4(l.1L){4(!3.17||!l.1J){l.1f=q;l.7=l.v}l.K.3P("3O 3N");l.K.1o("3O 3N",6(){l.2i(g)})}m{l.K.23(l.2a,3.1v,3.1N,6(){l.2i(g)})}}m{l.9.D(l.7).3R(3.1v,3.1N);l.9.D(a).2O(3.1v,3.1N,l.2i)}4(3.Y)n.Y(3.1v)}},l.2i=6(a){4(!U&&!A){4(l.7===0&&l.v===l.t&&3.17){l.1b(a,"3K")}m 4(l.7===l.t&&l.v===0&&3.17){l.1b(a,"2U")}}l.1f=q;l.7=l.v;3.2M(l)},l.3H=6(){4(!l.1f)l.M(l.12("z"))},l.G=6(){3X(l.3F);l.2o=q;4(3.I)n.I.F("H");4(l.2b)n.1y("G")},l.H=6(){l.3F=3Z(l.3H,3.3C);l.2o=r;4(3.I)n.I.F("G");4(l.2b)n.1y("H")},l.2z=6(a){o b=(1a)?l.E-1:l.t;N(1a&&l.1z===0&&a===l.E-1&&l.C!=="z")?q:(a===l.7&&!1a)?q:(3.17)?r:(l.1J&&l.7===0&&a===b&&l.C!=="z")?q:(l.1J&&l.7===b&&a===0&&l.C==="z")?q:r},l.12=6(a){l.C=a;4(a==="z"){N(l.7===l.t)?0:l.7+1}m{N(l.7===0)?l.t:l.7-1}},l.1b=6(b,c,d){o e=(6(){o a=(b)?b:((l.13+3.1n)*l.W)*l.v,3B=(6(){4(A){N(c==="2L")?b:(x&&l.v===l.t)?0:(x)?l.1r-(((l.13+3.1n)*l.W)*l.v):(l.v===l.t)?l.1r:a}m{2x(c){Z"2P":N(x)?((l.u-1)-l.7+l.14)*b:(l.7+l.14)*b;Z"2L":N(x)?b:b;Z"3K":N(x)?b:l.u*b;Z"2U":N(x)?l.u*b:b;3A:N b}}}());N(3B*-1)+"43"}());4(l.1L){e=(L)?"3z(0,"+e+",0)":"3z("+e+",0,0)";d=(d!==1w)?(d/45)+"s":"46";l.K.1F("-"+l.2s+"-48-49",d)}l.2a[l.2N]=e;4(l.1L||d===1w)l.K.1F(l.2a)},l.10=6(a){4(!U){o b,2I;4(a==="1c"){l.1V=$(\'<1T 1G="\'+8+\'1V"></1T>\').1F({"4b":"4c","2j":"3w"}).4f(l).S(l.K);l.2g=0;l.14=0;4(x){2I=$.4h(l.9).x();l.9=$(2I);l.K.3s().S(l.9)}}4(3.17&&!A){l.2g=2;l.14=1;4(a!=="1c")l.K.2H(\'.1D\').1g();l.K.S(l.9.2T().1D().V(\'1D\')).3u(l.9.t().1D().V(\'1D\'))}l.22=$(3.18,l);b=(x)?l.u-1-l.7+l.14:l.7+l.14;4(L&&!A){l.K.1i((l.u+l.2g)*2F+"%").1F("2j","4k").1q("1U%");21(6(){l.22.1F({"3o":"3n"});l.1E();l.1V.1i(l.h);l.1b(b*l.h,"1c")},(a==="1c")?1U:0)}m{l.K.1q((l.u+l.2g)*2F+"%");l.1b(b*l.1s,"1c");21(6(){l.1E();l.22.1F({"1q":l.1s,"3l":"3k","3o":"3n"});4(3.Y)n.Y()},(a==="1c")?1U:0)}}m{l.9.1F({"1q":"1U%","3l":"3k","4p":"-1U%","2j":"3w"});4(a==="1c")l.9.D(l.7).2O(3.1v,3.1N);4(3.Y)n.Y()}4(!A)l.9.X(8+"y-16").D(l.7).V(8+"y-16")},l.1E=6(){o a=l.9.2T(),1h=3.1n,1C=3.1C,1A=3.1A;l.w=l.1q();l.h=a.1i();l.3h=a.4u()-a.1q();4(A){l.2E=3.1B+1h;l.3d=(1C)?1C*l.2E:l.w;l.3c=(1A)?1A*l.2E:l.w;l.13=(l.3d>l.w)?(l.w-(1h*1C))/1C:(l.3c<l.w)?(l.w-(1h*1A))/1A:(3.1B>l.w)?l.w:3.1B;l.1l=Q.2G(l.w/(l.13+1h));l.W=(3.W>0&&3.W<l.1l)?3.W:l.1l;l.E=Q.3E(((l.u-l.1l)/l.W)+1);l.t=l.E-1;l.1r=(l.E===1)?0:(3.1B>l.w)?((l.13+(1h*2))*l.u)-l.w-1h:((l.13+1h)*l.u)-l.w-1h}m{l.13=l.w;l.E=l.u;l.t=l.u-1}l.1s=l.13-l.3h},l.F=6(a,b){l.1E();4(!A){4(a<l.7){l.7+=1}m 4(a<=l.7&&a!==0){l.7-=1}l.v=l.7}4(3.p&&!l.1p){4((b==="29"&&!A)||l.E>l.p.1e){n.p.F("29")}m 4((b==="1g"&&!A)||l.E<l.p.1e){4(A&&l.7>l.t){l.7-=1;l.v-=1}n.p.F("1g",l.t)}}4(3.B)n.B.F()},l.4y=6(a,b){o c=$(a);l.u+=1;l.t=l.u-1;4(L&&x){(b!==1w)?l.9.D(l.u-b).2M(c):l.K.3u(c)}m{(b!==1w)?l.9.D(b).2k(c):l.K.S(c)}l.F(b,"29");l.9=$(3.18+\':3a(.1D)\',l);l.10();3.38(l)},l.4B=6(a){o b=(36(a))?l.9.1Y($(a)):a;l.u-=1;l.t=l.u-1;4(36(a)){$(a,l.9).1g()}m{(L&&x)?l.9.D(l.t).1g():l.9.D(a).1g()}l.1E();l.F(b,"1g");l.9=$(3.18+\':3a(.1D)\',l);l.10();3.33(l)},n.1c()},$.15.3j={8:"4E-",18:".9 > O",2f:"U",1N:"3I",C:"4F",x:q,17:r,Y:q,3y:0,2r:r,3C:4G,1v:4H,2w:0,3x:q,1d:r,3i:q,3M:r,19:r,3L:q,p:r,B:r,2Z:"4I",2Y:"4J",3r:r,3m:q,2l:q,I:q,2V:"4K",3J:"4L",J:"",1p:"",1y:"",2e:"",1B:0,1n:0,1C:0,1A:0,W:0,1Z:6(){},2k:6(){},2M:6(){},3G:6(){},38:6(){},33:6(){}},$.4M.15=6(b){4(b===1w)b={};4(2X b==="4O"){N 1k.4P(6(){o a=$(1k),18=(b.18)?b.18:".9 > O",$9=a.2H(18);4($9.1e===1){$9.2O(4Q);4(b.1Z)b.1Z(a)}m 4(a.1x(\'15\')===1w){24 $.15(1k,b)}})}m{o c=$(1k).1x(\'15\');2x(b){Z"H":c.H();1u;Z"G":c.G();1u;Z"z":c.M(c.12("z"),r);1u;Z"T":Z"4R":c.M(c.12("T"),r);1u;3A:4(2X b==="4S")c.M(b,r)}}}})(4T);',62,304,'|||vars|if||function|currentSlide|namespace|slides|||||||||||||else|methods|var|controlNav|false|true||last|count|animatingTo||reverse|active|next|carousel|directionNav|direction|eq|pagingCount|update|pause|play|pausePlay|controlsContainer|container|vertical|flexAnimate|return|li|dx|Math|target|append|prev|fade|addClass|move|removeClass|smoothHeight|case|setup|preventDefault|getTarget|itemW|cloneOffset|flexslider|slide|animationLoop|selector|touch|asNav|setProps|init|pauseOnAction|length|animating|remove|slideMargin|height|touches|this|visible|controlNavScaffold|itemMargin|bind|manualControls|width|limit|computedW|abs|break|animationSpeed|undefined|data|sync|currentItem|maxItems|itemWidth|minItems|clone|doMath|css|class|click|cwidth|atEnd|slideString|transitions|eventType|easing|startY|null|hasClass|nav|touchstart|div|100|viewport|control|pageX|index|start||setTimeout|newSlides|animate|new|props|calcNext|pageY|manualPause|add|args|syncExists|scrolling|startT|asNavFor|animation|cloneCount|offset|wrapup|position|before|mousewheel|thumbnails|img|playing|window|item|slideshow|pfx|onTouchEnd|touchend|containerSelector|initDelay|switch|Date|canAdvance|resize|set|Number|onTouchMove|itemT|200|floor|find|arr|document|addEventListener|setTouch|after|prop|fadeIn|setTotal|filter|pauseplay|margin|first|jumpStart|pauseText|text|typeof|nextText|prevText|href|ul|onTouchStart|removed|live|delegate|isNaN||added||not|ol|maxW|minW|setupManual|setupPaging|touchmove|boxPadding|pauseOnHover|defaults|left|float|multipleKeyboard|block|display|removeEventListener|is|keyboard|empty|in|prepend|DocumentTouch|relative|randomize|startAt|translate3d|default|posCalc|slideshowSpeed|for|ceil|animatedSlides|end|animateSlides|swing|playText|jumpEnd|video|useCSS|transitionend|webkitTransitionEnd|unbind|marginLeft|fadeOut|top|perspectiveProperty|WebkitPerspective|MozPerspective|OPerspective|clearInterval|msPerspective|setInterval|style|replace|Perspective|px|toLowerCase|1000|0s|search|transition|duration|substr|overflow|hidden|transform|sort|appendTo|instanceof|makeArray|round|random|absolute|createElement|550|keyup|keyCode|marginRight|ontouchstart|500|extend|hover|outerWidth|focus|thumbs|paging|addSlide|src|attr|removeSlide|thumb|closest|flex|horizontal|7000|600|Previous|Next|Pause|Play|fn|disabled|object|each|400|previous|number|jQuery'.split('|'),0,{}))

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
    // function, we must explicitly call 'app.receivedEvent(...);'
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

app.initialize();
