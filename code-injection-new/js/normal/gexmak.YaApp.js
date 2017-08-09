



		$(document).bind("mobileinit", function()
		{
		   if (navigator.userAgent.indexOf("Android") != -1)
		   {
				$.mobile.defaultPageTransition = 'none';
				$.mobile.defaultDialogTransition = 'none';
		   }else {
				$.mobile.defaultPageTransition = 'slide';
				$.mobile.defaultPageTransition = 'slide';
		   }
		});
	




		
		$(document).bind('pagebeforechange',function(){
			$('.ui-loader').css('display', 'block');
		});
		$(document).bind('pagechange',function(){
			$('.ui-loader').css('display', 'none');
		});
	
		$(document).ready(function(){
			$('#date').live('click',function(e){
				gp('Days Months Seasons');
				return false;
			});
			$('#proverbs').live('click',function(e){
				gp('Proverbs');
				return false;
			});
			$('#time').live('click',function(e){
				gp('Time');
				return false;
			});
			$('#uep').live('click',function(e){
				gp('Useful Everyday Phrases');
				return false;
			});
			$('#numbers').live('click',function(e){
				gp('Numbers');
				return false;
			});
			$('#hotels').live('click',function(e){
				gp('Hotels');
				return false;
			});
			$('#taxi').live('click',function(e){
				gp('Taxi Travel');
				return false;
			});
			$('#drive').live('click',function(e){
				gp('Driving');
				return false;
			});
			$('#air').live('click',function(e){
				gp('Air Travel');
				return false;
			});
			$('#camp').live('click',function(e){
				gp('Camping');
				return false;
			});
			$('#rail').live('click',function(e){
				gp('Rail Boat Travel');
				return false;
			});
			$('#eat').live('click',function(e){
				gp('Eating Out');
				return false;
			});
			$('#health').live('click',function(e){
				gp('Health');
				return false;
			});
			$('#sport').live('click',function(e){
				gp('Sport');
				return false;
			});
			$('#shopping').live('click',function(e){
				gp('Shopping');
				return false;
			});
			$('#hair').live('click',function(e){
				gp('Hairdresser');
				return false;
			});
			$('#comm').live('click',function(e){
				gp('Communications');
				return false;
			});
			$('#flirt').live('click',function(e){
				gp('Flirting');
				return false;
			});
			$('#bank').live('click',function(e){
				gp('Banks');
				return false;
			});
			$('#students').live('click',function(e){
				gp('International Students');
				return false;
			});
			$('#censored').live('click',function(e){
				gp('Censored');
				return false;
			});
			$('#sightseeing').live('click',function(e){
				gp('Sightseeing');
				return false;
			});
			$('#alphabet').live('click',function(e){
				gp('Alphabet');
				return false;
			});
			$('.browselink').live('click',function(e){
				hideSearch();
				$.mobile.changePage("#super-categories",  {reverse:false, changeHash:true});
				
				return false;
			});
		});
	

		$('#usefulphrases').live('pagebeforeshow',function(){
			$('#usefulphrases-list').listview('refresh');
		});
		

var db;
var dbCreated = false;
var mywidth;
var cat;
var sbp;
$(document).bind('pageinit',function(){
	if(my_media){
	
		my_media.release();
	}
});
$('#home-page').live('pageinit',function(){
			get_width();
});
function wi(){
	mywidth = $(window).width();
	$('#myLogo-container').css('width',mywidth+'px');
	
	$('#home-page .ui-content').css('padding','0');
	
	$('#top-home').css('width',mywidth);
}
function get_width(){
	setTimeout(wi,200);
}

document.addEventListener("deviceready", onDeviceReady, false);

function onDeviceReady() {
    db = window.openDatabase("YaAppDB", "1.0", "YaApp Database", 1024000);
	if (!dbCreated)
		db.transaction(populateDB, transaction_error, populateDB_success);
	
}
function transaction_error(tx, error) {
    alert("Database Error: " + error);
}
function populateDB_success() {
	dbCreated = true;
  
}
function populateSearch(id){
	sbp = id;
}
function searchphrase(id){
	var tok = $('#'+id).val();
	hideSearch();
	db.transaction(function(tx){
		var sql = 'select * from phrases where id in (select phrase_id from search_tokens where token LIKE "'+tok+'")';
		tx.executeSql(sql,[],searchPhrase_success);
	});
}
function searchPhrase_success(tx,results){
	$('#searchedphrases-list').empty();
	 var len = results.rows.length;
	 if (len==0){
		$('#searchedphrases-list').append('<li data-role="listview-item"><span >There were no results</span></a></li>');
	 }
	 var i=0;
    for (i=0; i<len; i++) {
    	var phrase = results.rows.item(i);
	
		$('#searchedphrases-list').append('<li data-role="listview-item"><a href="#inside-page" data-icon="arrow-r" data-iconpos="right" data-theme="c" onclick="g1p('+phrase.id+');"><span>'+phrase.english_string+'</span></a></li>');
    }
	
	if (i>=1){
		cat = results.rows.item(i-1).category;
		get_count(cat);
	}
	$('#searchedphrases-list').listview('refresh');
	$('#searchme').val('');
	$('#searchedphrases #header-category-searched #left-top-button').attr('href','#'+sbp);
	$( "#searchedphrases" ).page( "destroy" ).page();
}
function get_count(cat){
	db.transaction(function(tx){
		var sql = 'select COUNT(*) as cnt from phrases where category="'+cat+'"';
		tx.executeSql(sql,[],get_random);
	});
}
function get_random(tx,results){
	var mycount = results.rows.item(0).cnt;
			
	var random = Math.floor(Math.random()*mycount);
	if (mycount-random<3){
		random+=2;
	}
	db.transaction(function(tx1){
		var sql = 'select id,english_string,category from phrases where category="'+cat+'" limit 3 offset '+random+'';
		tx1.executeSql(sql,[],function (tx1,results1){
			var leng = results1.rows.length;
			$('#randomphrases-list').empty();
			var y;
			for (y=0;y<leng;y++){
				var phrase1 = results1.rows.item(y);
				
				$('#randomphrases-list').append('<li data-role="listview-item"><a href="#inside-page" data-icon="arrow-r" data-iconpos="right" data-theme="c" onclick="g1p('+phrase1.id+');"><span>'+phrase1.english_string+'</span></a></li>');
			}
			$('#randomphrases-list').listview('refresh');
		})
	});
}
function gp(cat){
		db.transaction(function(tx){
			
			var sql = 'select id,english_string,category from phrases where category="'+cat+'"';
			tx.executeSql(sql, [], getPhrases_success);
		});

}
function g1p(p){
	db.transaction(function(tx){
	
		var sql = 'select * from phrases where id='+p;
		tx.executeSql(sql, [], getPhrase_success);
	});
}
function getPhrases(tx,cat) {
	var sql = 'select id,english_string,category from phrases where category="'+cat+'"';
	tx.executeSql(sql, [], getPhrases_success);
}
function getPhrases_success(tx,results){

	$('#usefulphrases-list').empty();
	
	 var len = results.rows.length;
    for (var i=0; i<len; i++) {
    	var phrase = results.rows.item(i);
	
		$('#usefulphrases-list').append('<li data-role="listview-item"><a href="#inside-page" data-theme="c" onclick="g1p('+phrase.id+');"><span>'+phrase.english_string+'</span></a></li>');
    }
	var p = results.rows.item(i-1);
	if (p.category == 'Days Months Seasons' || p.category == 'Time' || p.category == 'Numbers' || p.category =='Alphabet'){
		$('#usefulphrases #header-category-useful #left-top-button').attr('href','#basic_tools');
	}else if (p.category == 'Taxi Travel' || p.category == 'Driving' || p.category == 'Air Travel' || p.category == 'Rail Boat Travel'){
		$('#usefulphrases #header-category-useful #left-top-button').attr('href','#transports');
	}else if (p.category == 'Camping' || p.category =='Sport' || p.category =='Eating Out' || p.category=='Hotels' ){
		$('#usefulphrases #header-category-useful #left-top-button').attr('href','#accomodation');
	}else if (p.category == 'Communications' || p.category =='Hairdresser' || p.category=='Banks' || p.category == 'Health' || p.category=='International Students'){
		$('#usefulphrases #header-category-useful #left-top-button').attr('href','#services');
	}else if (p.category =='Useful Everyday Phrases' || p.category == 'Censored'){
		$('#usefulphrases #header-category-useful #left-top-button').attr('href','#everyday');
	}else if (p.category=='Proverbs' || p.category == 'Shopping' || p.category=='Flirting' || p.category =='Sightseeing'){
		$('#usefulphrases #header-category-useful #left-top-button').attr('href','#super-categories');
	}
	
	$.mobile.changePage("#usefulphrases",  {reverse:false, changeHash:true});
}
function getPhrase_success(tx,results){
	
	$('#inside-list2').empty();
	var len = results.rows.length;
	 for (var i=0; i<len; i++) {
		var phrase = results.rows.item(i);
		var src1=phrase.audio;
		$('#inside-list2').append('<li ><span>'+phrase.english_string+'</span></li><li><span>'+phrase.greek_string+'</span></li><li><span>'+phrase.greeklish_string+'</span></li>');
		$('#playbutton').unbind('click');
		$('#playbutton').bind('click',{src:src1},function(event){
				var src2=event.data.src;
				playStream(src2);
		});
		$('#playlink').unbind('click');
		$('#playlink').bind('click',{src:src1},function(event){
				var src2=event.data.src;
				playStream(src2);
		});
	 }
	 $('#inside-list2').listview('refresh');
}
function populateDB(tx) {
	
	tx.executeSql('DROP TABLE IF EXISTS phrases');
	tx.executeSql('DROP TABLE IF EXISTS search_tokens');
	var sql = 
		"CREATE TABLE IF NOT EXISTS phrases ( "+
		"id INTEGER PRIMARY KEY, " +
		"english_string VARCHAR(100), " +
		"greek_string VARCHAR(100), " +
		"greeklish_string VARCHAR(100), " +
		"category VARCHAR(40), " + 
		"audio VARCHAR(20))";
    tx.executeSql(sql);
	
	var sql1 = "CREATE TABLE IF NOT EXISTS search_tokens ("+
			"id INTEGER PRIMARY KEY, " +
			"phrase_id INTEGER ," +
			"token VARCHAR(40))";
	tx.executeSql(sql1);
	var inf = 'INTO phrases (id,english_string,greek_string,greeklish_string,category,audio) VALUES';
	var sf = 'INTO search_tokens (id,phrase_id,token) VALUES';
	tx.executeSql("INSERT "+inf+" (503,'Ω','ω','omega','Alphabet','24')");
	tx.executeSql("INSERT "+inf+" (502,'Ψ','ψ','psi','Alphabet','23')");
	tx.executeSql("INSERT "+inf+" (501,'Χ','χ','hi','Alphabet','22')");
	tx.executeSql("INSERT "+inf+" (500,'Φ','φ','fi','Alphabet','21')");
	tx.executeSql("INSERT "+inf+" (499,'Υ','υ','ipsilon','Alphabet','20')");
	tx.executeSql("INSERT "+inf+" (498,'Τ','τ','taf','Alphabet','19')");
	tx.executeSql("INSERT "+inf+" (497,'Σ','σ','sigma','Alphabet','18')");
	tx.executeSql("INSERT "+inf+" (496,'Ρ','ρ','ro','Alphabet','17')");
	tx.executeSql("INSERT "+inf+" (495,'Π','π','pi','Alphabet','16')");
	tx.executeSql("INSERT "+inf+" (494,'Ο','ο','omikron','Alphabet','15')");
	tx.executeSql("INSERT "+inf+" (493,'Ξ','ξ','ksi','Alphabet','14')");
	tx.executeSql("INSERT "+inf+" (492,'Ν','ν','ni','Alphabet','13')");
	tx.executeSql("INSERT "+inf+" (491,'Μ','μ','mi','Alphabet','12')");
	tx.executeSql("INSERT "+inf+" (490,'Λ','λ','lamda','Alphabet','11')");
	tx.executeSql("INSERT "+inf+" (489,'Κ','κ','kapa','Alphabet','10')");
	tx.executeSql("INSERT "+inf+" (488,'Ι','ι','yiota','Alphabet','9')");
	tx.executeSql("INSERT "+inf+" (487,'Θ','θ','thita','Alphabet','8')");
	tx.executeSql("INSERT "+inf+" (486,'Η','η','ita','Alphabet','7')");
	tx.executeSql("INSERT "+inf+" (485,'Ζ','ζ','zita','Alphabet','6')");
	tx.executeSql("INSERT "+inf+" (484,'Ε','ε','epsilon','Alphabet','5')");
	tx.executeSql("INSERT "+inf+" (483,'Δ','δ','delta','Alphabet','4')");
	tx.executeSql("INSERT "+inf+" (482,'Γ','γ','gamma','Alphabet','3')");
	tx.executeSql("INSERT "+inf+" (481,'Β','β','vita','Alphabet','2')");
	tx.executeSql("INSERT "+inf+" (480,'A','α','alfa','Alphabet','1')");
	
	tx.executeSql("INSERT "+inf+" (479,'1000000','ένα εκατομμύριο','ena ekatomirio','Numbers','134')");
	tx.executeSql("INSERT "+inf+" (478,'1000','χίλια','hilia','Numbers','133')");
	tx.executeSql("INSERT "+inf+" (477,'100','εκατό','ekato','Numbers','132')");
	tx.executeSql("INSERT "+inf+" (475,'80','ογδόντα','ogdonda','Numbers','131')");
	tx.executeSql("INSERT "+inf+" (474,'70','εβδομήντα','evdominda','Numbers','130')");
	tx.executeSql("INSERT "+inf+" (473,'60','εξήντα','exinda','Numbers','129')");
	tx.executeSql("INSERT "+inf+" (472,'50','πενήντα','peninda','Numbers','128')");
	tx.executeSql("INSERT "+inf+" (471,'40','σαράντα','saranda','Numbers','127')");
	tx.executeSql("INSERT "+inf+" (470,'30','τριάντα','trianda','Numbers','126')");
	tx.executeSql("INSERT "+inf+" (469,'21','είκοσι ένα','ikosi ena','Numbers','125')");
	tx.executeSql("INSERT "+inf+" (468,'20','είκοσι','ikosi','Numbers','124')");
	tx.executeSql("INSERT "+inf+" (467,'19','δεκαεννέα','dekaenea','Numbers','123')");
	tx.executeSql("INSERT "+inf+" (466,'18','δεκαοχτώ','dekaohto','Numbers','122')");
	tx.executeSql("INSERT "+inf+" (465,'17','δεκαεφτά','dekaefta','Numbers','121')");
	tx.executeSql("INSERT "+inf+" (464,'16','δεκαέξι','dekaexi','Numbers','120')");
	tx.executeSql("INSERT "+inf+" (463,'15','δεκαπέντε','dekapende','Numbers','119')");
	tx.executeSql("INSERT "+inf+" (462,'14','δεκατέσσερα','dekatesera','Numbers','118')");
	tx.executeSql("INSERT "+inf+" (461,'13','δεκατρία','dekatria','Numbers','117')");
	tx.executeSql("INSERT "+inf+" (460,'12','δώδεκα','dodeka','Numbers','116')");
	tx.executeSql("INSERT "+inf+" (459,'11','έντεκα','endeka','Numbers','115')");
	tx.executeSql("INSERT "+inf+" (458,'10','δέκα','deka','Numbers','114')");
	tx.executeSql("INSERT "+inf+" (457,'9','εννέα','enea','Numbers','113')");
	tx.executeSql("INSERT "+inf+" (456,'8','οχτώ','ohto','Numbers','112')");
	tx.executeSql("INSERT "+inf+" (455,'7','εφτά','efta','Numbers','111')");
	tx.executeSql("INSERT "+inf+" (454,'6','έξι','exi','Numbers','110')");
	tx.executeSql("INSERT "+inf+" (453,'5','πέντε','pende','Numbers','109')");
	tx.executeSql("INSERT "+inf+" (452,'4','τέσσερα','tesera','Numbers','108')");
	tx.executeSql("INSERT "+inf+" (451,'3','τρία','tria','Numbers','107')");
	tx.executeSql("INSERT "+inf+" (450,'2','δύο','dio','Numbers','106')");
	tx.executeSql("INSERT "+inf+" (449,'1','ένα','ena','Numbers','105')");
	
	tx.executeSql("INSERT "+inf+" (448,'One swallow does not make a Spring   ARISTOTLE','Χελιδων εαρ ου ποιει','helidon ear ou pi-i','Proverbs','104')");
	tx.executeSql("INSERT "+inf+" (447,'Who will rule the ruler?   PLUTARCH','Τις ουν αρξει του αρχοντος;','tis oun arxi tou arhondos','Proverbs','103')");
	tx.executeSql("INSERT "+inf+" (446,'Grey hairs are proof of age, but not of wisdom   MENANDER','Πολια χρονου μηνυσις, ου φρονησεως','polia hronou minisis, ou froniseos','Proverbs','102')");
	tx.executeSql("INSERT "+inf+" (445,'Man is the measure of the Universe   PROTAGORAS','Παντων χρηματων μετρον ανθρωπος','pandon hrimaton metron anthropos','Proverbs','101')");
	tx.executeSql("INSERT "+inf+" (444,'The crowd is the most unreliable and witless thing in the world   DEMOSTHENES','Οχλος ασταθμητοτατον πραγμα των απαντων και ασυνετωτατον','ohlos astathmitotaton pragma ton apandon ke asinetotaton','Proverbs','100')");
	tx.executeSql("INSERT "+inf+" (443,'Old things become new with the passage of time   NICOSTRATUS','Παλιν χρονω τ'' αρχαια καινα γινεται','palin hrono tarhaia kena ginete','Proverbs','99')");
	tx.executeSql("INSERT "+inf+" (442,'When all pay their share , the burden to each is light    DION CHRYSOSTOM','Όταν γαρ εξ απαντων συνεισφερηται, εκαστω κουφον γινεται το επιταγμα','otan gar ex apandon sinisferite, ekasto koufon ginete to epitagma','Proverbs','98')");
	tx.executeSql("INSERT "+inf+" (441,'Nature creats nothing without a purpose   ARISTOTLE','Ουδεν ματην η φυσις ποιει','ouden matin i fisis pi-i','Proverbs','97')");
	tx.executeSql("INSERT "+inf+" (440,'War is sweet to those who never tried it   PINDAR','Γλυκυ δ''απειροισι πολεμος','gliki dapirisi polemos','Proverbs','96')");
	tx.executeSql("INSERT "+inf+" (439,'It is harder to conquer a woman than to subdue any wild beast   ARISTOPHANES','Ουδεν εστο θηριον γυναικος αμαχωτερον','ouden esti  bthirion ginekos amahoteron','Proverbs','95')");
	tx.executeSql("INSERT "+inf+" (438,'The middle course is always the safest   MENANDER','Η μεσοτης εν πασιν ασφαλεστερον','i mesotis en pasin asfalesteron','Proverbs','94')");
	tx.executeSql("INSERT "+inf+" (437,'Whom the gods love die young   MENANDER','Ον οι θεοι φιλουσιν, αποθνησκει νεος ','on I thei filousin, apothiski neos','Proverbs','93')");
	tx.executeSql("INSERT "+inf+" (436,'Better do a little than a great deal badly   SOCRATES','Κρειττον γαρ που σμικρον ευ η πολύ μη ικανως περαναι','kriton gar pou smikron ef i poli mi ikanos perane','Proverbs','92')");
	tx.executeSql("INSERT "+inf+" (435,'Democracy is the worst form of despotism   ARISTOTLE','Η δημοκρατια η τελευταια τυραννις εστιν','i dimokratia i teleftea tiranis estin','Proverbs','91')");
	tx.executeSql("INSERT "+inf+" (434,'God is revolted by boasting   SOPHOCLES','Ζευς γαρ μεγαλης γλωσσης κομπους υπερεχθαιρει','zefs gar megalis glosis kobous ipereh-theri','Proverbs','90')");
	tx.executeSql("INSERT "+inf+" (433,'Action achieves more than words   EYRIPIDES','Λογος γαρ τουργον ου νικα ποτε','logos gar tourgon ou nika pote','Proverbs','89')");
	tx.executeSql("INSERT "+inf+" (432,'Keep a healthy mind in a healthy body   CLEBULUS','Ευ το σωμα εχειν και την ψυχην','ef to soma ehin ke tin psihin','Proverbs','88')");
	tx.executeSql("INSERT "+inf+" (431,'Sweetest is the life that is untroubled by thought   SOPHOCLES','Εν τω φρονειν μηδεν ηδιστος βιος','en to fronin miden idistos vios','Proverbs','87')");
	tx.executeSql("INSERT "+inf+" (430,'When an oak has fallen, every man becomes a woodcutter   MENANDER','Δρυος πεσουσης πας ανηρ ξυλευεται','drios pesousis pas anir xilevete','Proverbs','86')");
	tx.executeSql("INSERT "+inf+" (429,'The beginnings is half of the whole   HESIOD','Αρχη ημισυ παντος','arhi imisi pandos','Proverbs','85')");
	tx.executeSql("INSERT "+inf+" (428,'Give me leverage and I will move the Earth   ARCHIMEDES','Δος που στω και τον κοσμον κινησω','dos pou sto ke ton kosmon kiniso','Proverbs','84')");
	tx.executeSql("INSERT "+inf+" (427,'Poverty is the mother of the arts   THEOCRITUS','Η πενια τας τεχνας εγειρει','i penia tas tehnas egiri','Proverbs','83')");
	tx.executeSql("INSERT "+inf+" (426,'If all the laws were to be abolished, it would not make much difference to our way of life   ARISTIPPUS','Εάν παντες οι νομοι αναιρεθωσιν, ομοιως βιωσομεν','ean pandes i nomi anerethosin, omios viosomen','Proverbs','82')");
	tx.executeSql("INSERT "+inf+" (425,'The prosperty of a fool is a heavy burden to put up with   AESCHYLUS','βαρυ φορημ'', ανθρωπος ευτυχων αφρων','vari forim anthropos eftihon afron','Proverbs','81')");
	tx.executeSql("INSERT "+inf+" (424,'It is shameful for a young man to question an older one   HOMER','Είναι ντροπη ενας νεος να αμφισβητει την σοφιαν ενός γηραιου','ine dropi enas neos na amfisviti tin sofian enos gireou','Proverbs','80')");
	
	
	tx.executeSql("INSERT "+inf+" (423,'quarter to (ten)','δέκα παρά τέταρτο','deka para tetarto','Time','79')");
	tx.executeSql("INSERT "+inf+" (422,'quarter past (ten)','δέκα και τέταρτο','deka ke tetarto','Time','78')");
	tx.executeSql("INSERT "+inf+" (421,'half past (ten)','δέκα και μισή','deka ke misi','Time','77')");
	tx.executeSql("INSERT "+inf+" (420,'five past (ten)','δέκα και πέντε','deka ke pende','Time','76')");
	tx.executeSql("INSERT "+inf+" (419,'it''s (ten) o''clock','είναι δέκα η ώρα','ine deka i ora','Time','75')");
	tx.executeSql("INSERT "+inf+" (418,'what time is it?','τι ώρα είναι;','ti ora ine','Time','74')");
	tx.executeSql("INSERT "+inf+" (417,'year','χρόνος','hronos','Time','73')");
	tx.executeSql("INSERT "+inf+" (416,'month','μήνας','minas','Time','72')");
	tx.executeSql("INSERT "+inf+" (415,'fortnight','σε δύο εβδομάδες','se dio evdomades','Time','71')");
	tx.executeSql("INSERT "+inf+" (414,'week','εβδομάδα','evdomada','Time','70')");
	tx.executeSql("INSERT "+inf+" (413,'day','μέρα','mera','Time','69')");
	tx.executeSql("INSERT "+inf+" (412,'hour','ώρα','ora','Time','68')");
	tx.executeSql("INSERT "+inf+" (411,'three quarter of an hour','τρία τέταρτα της ώρας','tria tetarta tis oras','Time','67')");
	tx.executeSql("INSERT "+inf+" (410,'half an hour','μισή ώρα','misi ora','Time','66')");
	tx.executeSql("INSERT "+inf+" (409,'quarter of an hour','ένα τέταρτο','ena tetarto','Time','65')");
	tx.executeSql("INSERT "+inf+" (408,'ten minutes','δέκα λεπτά','deka lepta','Time','64')");
	tx.executeSql("INSERT "+inf+" (407,'minute','το λεπτό','to lepto','Time','63')");
	tx.executeSql("INSERT "+inf+" (406,'second','το δευτερόλεπτο','to defterolepto','Time','62')");
	tx.executeSql("INSERT "+inf+" (405,'at the moment','προς το παρόν','pros to paron','Time','61')");
	tx.executeSql("INSERT "+inf+" (404,'later on','αργότερα','argotera','Time','60')");
	tx.executeSql("INSERT "+inf+" (403,'soon','σύντομα','sindoma','Time','59')");
	tx.executeSql("INSERT "+inf+" (402,'early','νωρίς','noris','Time','58')");
	tx.executeSql("INSERT "+inf+" (401,'late','αργά','arga','Time','57')");
	tx.executeSql("INSERT "+inf+" (400,'three days ago','πριν τρεις μέρες','prin tris meres','Time','56')");
	tx.executeSql("INSERT "+inf+" (399,'in three days','σε τρεις μέρες','se tris meres','Time','55')");
	tx.executeSql("INSERT "+inf+" (398,'tomorrow night','αύριο το βράδυ','avrio to vradi','Time','54')");
	tx.executeSql("INSERT "+inf+" (397,'tomorrow morning','αύριο το πρωί','avrio to proi','Time','539')");
	tx.executeSql("INSERT "+inf+" (396,'last night','χτες τη νύχτα','htes ti nihta','Time','538')");
	tx.executeSql("INSERT "+inf+" (395,'yesterday afternoon','χτες το απόγευμα','htes to apoyevma','Time','537')");
	tx.executeSql("INSERT "+inf+" (508,'tonight','απόψε','apopse','Time','536')");
	tx.executeSql("INSERT "+inf+" (394,'this evening','το βράδυ','to vradi','Time','535')");
	tx.executeSql("INSERT "+inf+" (393,'this afternoon','το απόγευμα','to apoyevma','Time','534')");
	tx.executeSql("INSERT "+inf+" (392,'this morning','το πρωί','to proi','Time','533')");
	tx.executeSql("INSERT "+inf+" (391,'next week','την επόμενη εβδομάδα','tin epomeni evdomada','Time','532')");
	tx.executeSql("INSERT "+inf+" (390,'last week','την περασμένη εβδομάδα','tin perasmeni evdomada','Time','531')");
	tx.executeSql("INSERT "+inf+" (389,'this week','αυτή την εβδομάδα','afti tin evdomada','Time','530')");
	tx.executeSql("INSERT "+inf+" (388,'the day after tomorrow','μεθαύριο','methavrio','Time','529')");
	tx.executeSql("INSERT "+inf+" (387,'the day before yesterday','προχτές','prohtes','Time','528')");
	tx.executeSql("INSERT "+inf+" (386,'tomorrow','αύριο','avrio','Time','527')");
	tx.executeSql("INSERT "+inf+" (385,'yesterday','χτες','htes','Time','526')");
	tx.executeSql("INSERT "+inf+" (384,'today','σήμερα','simera','Time','525')");
	
	tx.executeSql("INSERT "+inf+" (383,'New Year Eve','παραμονή Πρωτοχρονιάς','paramoni protohronias','Days Months Seasons','53')");
	tx.executeSql("INSERT "+inf+" (382,'New Year','Πρωτοχρονιά','protohronia','Days Months Seasons','52')");
	tx.executeSql("INSERT "+inf+" (381,'Easter','Πάσχα','pasha','Days Months Seasons','51')");
	tx.executeSql("INSERT "+inf+" (380,'Good Friday','Μεγάλη Παρασκευή','megali paraskevi','Days Months Seasons','50')");
	tx.executeSql("INSERT "+inf+" (379,'Christmas Eve','παραμονή Χριστουγέννων','paramoni hristouyenon','Days Months Seasons','49')");
	tx.executeSql("INSERT "+inf+" (378,'Christmas','Χριστούγεννα','hristouyena','Days Months Seasons','48')");
	tx.executeSql("INSERT "+inf+" (377,'Winter','χειμώνας','himonas','Days Months Seasons','47')");
	tx.executeSql("INSERT "+inf+" (376,'Autumn','φθινόπωρο','fthinoporo','Days Months Seasons','46')");
	tx.executeSql("INSERT "+inf+" (375,'Summer','καλοκαίρι','kalokeri','Days Months Seasons','45')");
	tx.executeSql("INSERT "+inf+" (374,'Spring','άνοιξη','anixi','Days Months Seasons','44')");
	tx.executeSql("INSERT "+inf+" (373,'December','Δεκέμβριος','dekemvrios','Days Months Seasons','43')");
	tx.executeSql("INSERT "+inf+" (372,'November','Νοέμβριος','noemvrios','Days Months Seasons','42')");
	tx.executeSql("INSERT "+inf+" (371,'October','Οκτώβριος','octovrios','Days Months Seasons','41')");
	tx.executeSql("INSERT "+inf+" (370,'September','Σεπτέμβριος','septemvrios','Days Months Seasons','40')");
	tx.executeSql("INSERT "+inf+" (369,'August','Αύγουστος','avgoustos','Days Months Seasons','39')");
	tx.executeSql("INSERT "+inf+" (368,'July','Ιούλιος','ioulios','Days Months Seasons','38')");
	tx.executeSql("INSERT "+inf+" (367,'June','Ιούνιος','iounios','Days Months Seasons','37')");
	tx.executeSql("INSERT "+inf+" (366,'May','Μάιος','maios','Days Months Seasons','36')");
	tx.executeSql("INSERT "+inf+" (365,'April','Απρίλιος','aprilios','Days Months Seasons','35')");
	tx.executeSql("INSERT "+inf+" (364,'March','Μάρτιος','martios','Days Months Seasons','34')");
	tx.executeSql("INSERT "+inf+" (363,'February','Φεβρουάριος','fevruarios','Days Months Seasons','33')");
	tx.executeSql("INSERT "+inf+" (362,'January','Ιανουάριος','ianuarios','Days Months Seasons','32')");
	tx.executeSql("INSERT "+inf+" (361,'Saturday','Σάββατο','savato','Days Months Seasons','31')");
	tx.executeSql("INSERT "+inf+" (360,'Friday','Παρασκευή','paraskevi','Days Months Seasons','30')");
	tx.executeSql("INSERT "+inf+" (359,'Thursday','Πέμπτη','pempti','Days Months Seasons','29')");
	tx.executeSql("INSERT "+inf+" (358,'Wednesday','Τετάρτη','tetarti','Days Months Seasons','28')");
	tx.executeSql("INSERT "+inf+" (357,'Tuesday','Τρίτη','triti','Days Months Seasons','27')");
	tx.executeSql("INSERT "+inf+" (356,'Monday','Δευτέρα','deftera','Days Months Seasons','26')");
	tx.executeSql("INSERT "+inf+" (355,'Sunday','Κυριακή','kiriaki','Days Months Seasons','25')");
	
	tx.executeSql("INSERT "+inf+" (354,'What''s there to do in the evenings?','Τι μπορούμε να κάνουμε το βράδυ;','ti boroume na kanoume to vradi','Sightseeing','504')");
	tx.executeSql("INSERT "+inf+" (353,'Is there a discount for children?','Υπάρχει έκπτωση για παιδιά;','iparhi ekptosi ya pedia','Sightseeing','503')");
	tx.executeSql("INSERT "+inf+" (352,'What''s the admission charge?','Πόσο κοστίζει η είσοδος;','poso kostizi i isodos','Sightseeing','502')");
	tx.executeSql("INSERT "+inf+" (351,'What time does it close?','Τι ώρα κλείνει;','ti ora klini','Sightseeing','501')");
	tx.executeSql("INSERT "+inf+" (350,'What time does it open?','Τι ώρα ανοίγει;','ti ora anigi','Sightseeing','500')");
	tx.executeSql("INSERT "+inf+" (349,'How old is it?','Πόσο χρονώ είναι;','poso hrono ine','Sightseeing','499')");
	tx.executeSql("INSERT "+inf+" (348,'Who made it?','Ποιος το έκανε;','pios to ekane','Sightseeing','498')");
	tx.executeSql("INSERT "+inf+" (347,'What''s that?','Τι είναι εκείνο;','ti ine ekino','Sightseeing','497')");
	tx.executeSql("INSERT "+inf+" (346,'I''d like to see…','Θα ήθελα να δω…','tha ithela na do','Sightseeing','496')");
	tx.executeSql("INSERT "+inf+" (345,'I''d like a guidebook in English','Θα ήθελα έναν οδηγό στα αγγλικά','tha ithela enan odigo sta aglika','Sightseeing','505')");
	
	tx.executeSql("INSERT "+sf+"(1950,345,'view')");
	tx.executeSql("INSERT "+sf+"(1951,345,'sightseeing')");
	tx.executeSql("INSERT "+sf+"(1952,346,'view')");
	tx.executeSql("INSERT "+sf+"(1953,346,'sightseeing')");
	tx.executeSql("INSERT "+sf+"(1954,347,'view')");
	tx.executeSql("INSERT "+sf+"(1955,347,'sightseeing')");
	tx.executeSql("INSERT "+sf+"(1956,348,'view')");
	tx.executeSql("INSERT "+sf+"(1957,348,'sightseeing')");
	tx.executeSql("INSERT "+sf+"(1958,349,'view')");
	tx.executeSql("INSERT "+sf+"(1959,349,'sightseeing')");
	tx.executeSql("INSERT "+sf+"(1960,350,'view')");
	tx.executeSql("INSERT "+sf+"(1961,350,'sightseeing')");
	tx.executeSql("INSERT "+sf+"(1962,351,'view')");
	tx.executeSql("INSERT "+sf+"(1963,351,'sightseeing')");
	tx.executeSql("INSERT "+sf+"(1964,352,'view')");
	tx.executeSql("INSERT "+sf+"(1965,352,'sightseeing')");
	tx.executeSql("INSERT "+sf+"(1966,353,'view')");
	tx.executeSql("INSERT "+sf+"(1967,353,'sightseeing')");
	tx.executeSql("INSERT "+sf+"(1968,354,'view')");
	tx.executeSql("INSERT "+sf+"(1969,354,'sightseeing')");
	
	tx.executeSql("INSERT "+sf+"(485,354,'evening')");
	tx.executeSql("INSERT "+sf+"(484,353,'child')");
	tx.executeSql("INSERT "+sf+"(483,353,'discount')");
	tx.executeSql("INSERT "+sf+"(482,352,'charge')");
	tx.executeSql("INSERT "+sf+"(481,352,'admission')");
	tx.executeSql("INSERT "+sf+"(480,351,'close')");
	tx.executeSql("INSERT "+sf+"(479,350,'open')");
	tx.executeSql("INSERT "+sf+"(478,349,'old')");
	tx.executeSql("INSERT "+sf+"(477,348,'made')");
	tx.executeSql("INSERT "+sf+"(476,347,'that')");
	tx.executeSql("INSERT "+sf+"(475,347,'what')");
	tx.executeSql("INSERT "+sf+"(474,346,'see')");
	tx.executeSql("INSERT "+sf+"(473,345,'guidebook')");
	tx.executeSql("INSERT "+sf+"(472,345,'english')");
	
	tx.executeSql("INSERT "+inf+" (344,'You make me horny','Με ανάβεις','me anavis','Flirting','494')");
	tx.executeSql("INSERT "+inf+" (343,'Will you marry me?','Θα με παντρευτείς;','tha me pandreftis','Flirting','493')");
	tx.executeSql("INSERT "+inf+" (342,'Would you like to be my girlfriend?','Θέλεις να γίνεις  η κοπέλα μου','thelis na ginis i kopela mou','Flirting','492')");
	tx.executeSql("INSERT "+inf+" (341,'True love','Αληθινός έρωτας','alithinos erotas','Flirting','491')");
	tx.executeSql("INSERT "+inf+" (340,'A very handsome (and hot) guy','Ένας πολύ όμορφος (και καυτός) άνδρας','enas poli omorfos ke kaftos andras','Flirting','490')");
	tx.executeSql("INSERT "+inf+" (339,'A very pretty (and hot) girl','Μια πολύ όμορφη (και καυτή)κοπέλα','mia poli omorfi ke kafti kopela','Flirting','489')");
	tx.executeSql("INSERT "+inf+" (338,'I am going to miss you','Θα μου λείψεις','tha mou lipsis','Flirting','488')");
	tx.executeSql("INSERT "+inf+" (337,'I miss you (a lot)','Μου λείπεις πολύ','mou lipis poli','Flirting','487')");
	tx.executeSql("INSERT "+inf+" (336,'I want you','Σε θέλω','se thelo','Flirting','486')");
	tx.executeSql("INSERT "+inf+" (335,'Sweetheart','Καρδιά μου','kardia mou','Flirting','485')");
	tx.executeSql("INSERT "+inf+" (334,'I adore you','Σε λατρεύω','se latrevo','Flirting','484')");
	tx.executeSql("INSERT "+inf+" (333,'My first love','Ο πρώτος μου έρωτας','o protos mou erotas','Flirting','483')");
	tx.executeSql("INSERT "+inf+" (332,'I love you with all of my heart','Σε αγαπώ με όλη μου την καρδιά','se agapo me oli mou tin kardia','Flirting','482')");
	tx.executeSql("INSERT "+inf+" (331,'I am attracted to you','Είσαι ελκυστικός/η','ise elkistikos/i','Flirting','481')");
	tx.executeSql("INSERT "+inf+" (330,'You smell good','Μυρίζεις όμορφα','mirizis omorfa','Flirting','480')");
	tx.executeSql("INSERT "+inf+" (329,'Hug me','Αγκάλιασέ με','agaliase me','Flirting','470')");
	tx.executeSql("INSERT "+inf+" (328,'Kiss me','Φίλα με','fila me','Flirting','469')");
	tx.executeSql("INSERT "+inf+" (327,'Hugs and Kisses','Αγκαλιές και φιλιά','agalies ke filia','Flirting','468')");
	tx.executeSql("INSERT "+inf+" (326,'Hugs','Αγκαλιές','agalies','Flirting','467')");
	tx.executeSql("INSERT "+inf+" (325,'Kisses','Φιλάκια','filakia','Flirting','466')");
	tx.executeSql("INSERT "+inf+" (324,'My love','Αγάπη μου','agapi mou','Flirting','465')");
	tx.executeSql("INSERT "+inf+" (323,'Babe','Μωρό μου','moro mou','Flirting','464')");
	tx.executeSql("INSERT "+inf+" (322,'Honey','Γλυκιά μου','glikia mou','Flirting','463')");
	tx.executeSql("INSERT "+inf+" (321,'Love story','Ιστορία αγάπης','istoria agapis','Flirting','462')");
	tx.executeSql("INSERT "+inf+" (320,'I love you','Σε αγαπώ','se agapo','Flirting','461')");
	tx.executeSql("INSERT "+inf+" (319,'You are my prince','Είσαι ο πρίγκιπας μου','ise o prigipas mou','Flirting','460')");
	tx.executeSql("INSERT "+inf+" (318,'You are my princess','Είσαι η πριγκίπισσα μου','ise i prigipisa mou','Flirting','459')");
	tx.executeSql("INSERT "+inf+" (317,'You are spectacular','Είσαι απίστευτη','ise apistefti','Flirting','458')");
	tx.executeSql("INSERT "+inf+" (316,'I''m very lucky to know you','Είμαι τυχερη που σε γνώρισα','ime tiheri pou se gnorisa','Flirting','457')");
	tx.executeSql("INSERT "+inf+" (315,'You are very passionate','Είσαι πολύ ευαίσθητη','ise poli evesthiti','Flirting','456')");
	tx.executeSql("INSERT "+inf+" (314,'I like you a lot','Μου αρέσεις πολύ','mou aresis poli','Flirting','455')");
	tx.executeSql("INSERT "+inf+" (313,'I''m crazy for you','Είμαι τρελός για σένα','ime trelos ya sena','Flirting','454')");
	tx.executeSql("INSERT "+inf+" (312,'You drive me crazy','Με τρελαίνεις','me trelenis','Flirting','453')");
	tx.executeSql("INSERT "+inf+" (311,'You are amazing','Είσαι φανταστικός','ise fandastikos','Flirting','452')");
	tx.executeSql("INSERT "+inf+" (310,'You are the most wonderful person in the world','Είσαι το ομορφότερο πλάσμα του κόσμου','ise to omorfotero plasma tou kosmou','Flirting','451')");
	tx.executeSql("INSERT "+inf+" (309,'You have a lovely smile','Έχεις ωραίο χαμόγελο','ehis oreo hamogelo','Flirting','450')");
	tx.executeSql("INSERT "+inf+" (308,'You have the prettiest eyes in the world','Έχεις τα ομορφότερα μάτια του κόσμου ','ehis ta omorfotera matia tou kosmou','Flirting','449')");
	tx.executeSql("INSERT "+inf+" (307,'You are a godess','Είσαι θεά','ise thea','Flirting','448')");
	tx.executeSql("INSERT "+inf+" (306,'You''re very sexy','Είσαι πολύ σέξυ','ise poli sexi','Flirting','447')");
	tx.executeSql("INSERT "+inf+" (305,'Do you have a boyfriend?','Έχεις αγόρι;','ehis agori','Flirting','446')");
	tx.executeSql("INSERT "+inf+" (304,'Do you have a girlfriend?','Έχεις κοπέλα;','ehis kopela','Flirting','445')");
	tx.executeSql("INSERT "+inf+" (303,'Are you single?','Είσαι μόνη;','ise moni','Flirting','444')");
	tx.executeSql("INSERT "+inf+" (302,'You are very pretty','Είσαι πολύ όμορφη','ise poli omorfi','Flirting','443')");
	tx.executeSql("INSERT "+inf+" (301,'This is a love song','Αυτό είναι ένα ερωτικό τραγούδι','afto ine ena erotiko tragoudi','Flirting','442')");
	tx.executeSql("INSERT "+inf+" (300,'Shall we dance?','Χορεύουμε;','horevoume','Flirting','495')");
	
	tx.executeSql("INSERT "+sf+"(1800,300,'flirt')");
	tx.executeSql("INSERT "+sf+"(1801,300,'love')");
	tx.executeSql("INSERT "+sf+"(1802,300,'romance')");
	tx.executeSql("INSERT "+sf+"(1803,301,'flirt')");
	tx.executeSql("INSERT "+sf+"(1804,301,'love')");
	tx.executeSql("INSERT "+sf+"(1805,301,'romance')");
	tx.executeSql("INSERT "+sf+"(1806,302,'flirt')");
	tx.executeSql("INSERT "+sf+"(1807,302,'love')");
	tx.executeSql("INSERT "+sf+"(1808,302,'romance')");
	tx.executeSql("INSERT "+sf+"(1809,303,'flirt')");
	tx.executeSql("INSERT "+sf+"(1810,303,'love')");
	tx.executeSql("INSERT "+sf+"(1811,303,'romance')");
	tx.executeSql("INSERT "+sf+"(1812,304,'flirt')");
	tx.executeSql("INSERT "+sf+"(1813,304,'love')");
	tx.executeSql("INSERT "+sf+"(1814,304,'romance')");
	tx.executeSql("INSERT "+sf+"(1815,305,'flirt')");
	tx.executeSql("INSERT "+sf+"(1816,305,'love')");
	tx.executeSql("INSERT "+sf+"(1817,305,'romance')");
	tx.executeSql("INSERT "+sf+"(1818,306,'flirt')");
	tx.executeSql("INSERT "+sf+"(1819,306,'love')");
	tx.executeSql("INSERT "+sf+"(1820,306,'romance')");
	tx.executeSql("INSERT "+sf+"(1821,307,'flirt')");
	tx.executeSql("INSERT "+sf+"(1822,307,'love')");
	tx.executeSql("INSERT "+sf+"(1823,307,'romance')");
	tx.executeSql("INSERT "+sf+"(1824,308,'flirt')");
	tx.executeSql("INSERT "+sf+"(1825,308,'love')");
	tx.executeSql("INSERT "+sf+"(1826,308,'romance')");
	tx.executeSql("INSERT "+sf+"(1827,309,'flirt')");
	tx.executeSql("INSERT "+sf+"(1828,309,'love')");
	tx.executeSql("INSERT "+sf+"(1829,309,'romance')");
	tx.executeSql("INSERT "+sf+"(1830,310,'flirt')");
	tx.executeSql("INSERT "+sf+"(1831,310,'love')");
	tx.executeSql("INSERT "+sf+"(1832,310,'romance')");
	tx.executeSql("INSERT "+sf+"(1833,311,'flirt')");
	tx.executeSql("INSERT "+sf+"(1834,311,'love')");
	tx.executeSql("INSERT "+sf+"(1835,311,'romance')");
	tx.executeSql("INSERT "+sf+"(1836,312,'flirt')");
	tx.executeSql("INSERT "+sf+"(1837,312,'love')");
	tx.executeSql("INSERT "+sf+"(1838,312,'romance')");
	tx.executeSql("INSERT "+sf+"(1839,313,'flirt')");
	tx.executeSql("INSERT "+sf+"(1840,313,'love')");
	tx.executeSql("INSERT "+sf+"(1841,313,'romance')");
	tx.executeSql("INSERT "+sf+"(1842,314,'flirt')");
	tx.executeSql("INSERT "+sf+"(1843,314,'love')");
	tx.executeSql("INSERT "+sf+"(1844,314,'romance')");
	tx.executeSql("INSERT "+sf+"(1845,315,'flirt')");
	tx.executeSql("INSERT "+sf+"(1846,315,'love')");
	tx.executeSql("INSERT "+sf+"(1847,315,'romance')");
	tx.executeSql("INSERT "+sf+"(1848,316,'flirt')");
	tx.executeSql("INSERT "+sf+"(1849,316,'love')");
	tx.executeSql("INSERT "+sf+"(1850,316,'romance')");
	tx.executeSql("INSERT "+sf+"(1851,317,'flirt')");
	tx.executeSql("INSERT "+sf+"(1852,317,'love')");
	tx.executeSql("INSERT "+sf+"(1853,317,'romance')");
	tx.executeSql("INSERT "+sf+"(1854,318,'flirt')");
	tx.executeSql("INSERT "+sf+"(1855,318,'love')");
	tx.executeSql("INSERT "+sf+"(1856,318,'romance')");
	tx.executeSql("INSERT "+sf+"(1857,319,'flirt')");
	tx.executeSql("INSERT "+sf+"(1858,319,'love')");
	tx.executeSql("INSERT "+sf+"(1859,319,'romance')");
	tx.executeSql("INSERT "+sf+"(1860,320,'flirt')");
	tx.executeSql("INSERT "+sf+"(1861,320,'romance')");
	tx.executeSql("INSERT "+sf+"(1862,321,'flirt')");
	tx.executeSql("INSERT "+sf+"(1863,321,'romance')");
	tx.executeSql("INSERT "+sf+"(1864,322,'flirt')");
	tx.executeSql("INSERT "+sf+"(1865,322,'love')");
	tx.executeSql("INSERT "+sf+"(1866,322,'romance')");
	tx.executeSql("INSERT "+sf+"(1867,323,'flirt')");
	tx.executeSql("INSERT "+sf+"(1868,323,'love')");
	tx.executeSql("INSERT "+sf+"(1869,323,'romance')");
	tx.executeSql("INSERT "+sf+"(1870,324,'flirt')");
	tx.executeSql("INSERT "+sf+"(1871,324,'romance')");
	tx.executeSql("INSERT "+sf+"(1872,325,'flirt')");
	tx.executeSql("INSERT "+sf+"(1873,325,'love')");
	tx.executeSql("INSERT "+sf+"(1874,325,'romance')");
	tx.executeSql("INSERT "+sf+"(1875,326,'flirt')");
	tx.executeSql("INSERT "+sf+"(1876,326,'love')");
	tx.executeSql("INSERT "+sf+"(1877,326,'romance')");
	tx.executeSql("INSERT "+sf+"(1878,327,'flirt')");
	tx.executeSql("INSERT "+sf+"(1879,327,'love')");
	tx.executeSql("INSERT "+sf+"(1880,327,'romance')");
	tx.executeSql("INSERT "+sf+"(1881,328,'flirt')");
	tx.executeSql("INSERT "+sf+"(1882,328,'love')");
	tx.executeSql("INSERT "+sf+"(1883,328,'romance')");
	tx.executeSql("INSERT "+sf+"(1884,329,'flirt')");
	tx.executeSql("INSERT "+sf+"(1885,329,'love')");
	tx.executeSql("INSERT "+sf+"(1886,329,'romance')");
	tx.executeSql("INSERT "+sf+"(1887,330,'flirt')");
	tx.executeSql("INSERT "+sf+"(1888,330,'love')");
	tx.executeSql("INSERT "+sf+"(1889,330,'romance')");
	tx.executeSql("INSERT "+sf+"(1890,331,'flirt')");
	tx.executeSql("INSERT "+sf+"(1891,331,'love')");
	tx.executeSql("INSERT "+sf+"(1892,331,'romance')");
	tx.executeSql("INSERT "+sf+"(1893,332,'flirt')");
	tx.executeSql("INSERT "+sf+"(1894,332,'romance')");
	tx.executeSql("INSERT "+sf+"(1895,333,'flirt')");
	tx.executeSql("INSERT "+sf+"(1896,333,'romance')");
	tx.executeSql("INSERT "+sf+"(1897,334,'flirt')");
	tx.executeSql("INSERT "+sf+"(1898,334,'love')");
	tx.executeSql("INSERT "+sf+"(1899,334,'romance')");
	tx.executeSql("INSERT "+sf+"(1900,335,'flirt')");
	tx.executeSql("INSERT "+sf+"(1901,335,'love')");
	tx.executeSql("INSERT "+sf+"(1902,335,'romance')");
	tx.executeSql("INSERT "+sf+"(1903,336,'flirt')");
	tx.executeSql("INSERT "+sf+"(1904,336,'love')");
	tx.executeSql("INSERT "+sf+"(1905,336,'romance')");
	tx.executeSql("INSERT "+sf+"(1906,337,'flirt')");
	tx.executeSql("INSERT "+sf+"(1907,337,'love')");
	tx.executeSql("INSERT "+sf+"(1908,337,'romance')");
	tx.executeSql("INSERT "+sf+"(1909,338,'flirt')");
	tx.executeSql("INSERT "+sf+"(1910,338,'love')");
	tx.executeSql("INSERT "+sf+"(1911,338,'romance')");
	tx.executeSql("INSERT "+sf+"(1912,339,'flirt')");
	tx.executeSql("INSERT "+sf+"(1913,339,'love')");
	tx.executeSql("INSERT "+sf+"(1914,339,'romance')");
	tx.executeSql("INSERT "+sf+"(1915,340,'flirt')");
	tx.executeSql("INSERT "+sf+"(1916,340,'love')");
	tx.executeSql("INSERT "+sf+"(1917,340,'romance')");
	tx.executeSql("INSERT "+sf+"(1918,342,'flirt')");
	tx.executeSql("INSERT "+sf+"(1919,342,'love')");
	tx.executeSql("INSERT "+sf+"(1920,342,'romance')");
	tx.executeSql("INSERT "+sf+"(1921,341,'flirt')");
	tx.executeSql("INSERT "+sf+"(1922,341,'romance')");
	tx.executeSql("INSERT "+sf+"(1923,343,'flirt')");
	tx.executeSql("INSERT "+sf+"(1924,343,'love')");
	tx.executeSql("INSERT "+sf+"(1925,343,'romance')");
	tx.executeSql("INSERT "+sf+"(1926,344,'flirt')");
	tx.executeSql("INSERT "+sf+"(1927,344,'love')");
	tx.executeSql("INSERT "+sf+"(1928,344,'romance')");
	
	
	tx.executeSql("INSERT "+sf+"(471,344,'horny')");
	tx.executeSql("INSERT "+sf+"(470,343,'marry')");
	tx.executeSql("INSERT "+sf+"(469,342,'girlfriend')");
	tx.executeSql("INSERT "+sf+"(468,341,'love')");
	tx.executeSql("INSERT "+sf+"(467,340,'hot')");
	tx.executeSql("INSERT "+sf+"(466,340,'handsome')");
	tx.executeSql("INSERT "+sf+"(465,339,'hot')");
	tx.executeSql("INSERT "+sf+"(464,339,'pretty')");
	tx.executeSql("INSERT "+sf+"(463,338,'miss')");
	tx.executeSql("INSERT "+sf+"(462,337,'miss')");
	tx.executeSql("INSERT "+sf+"(461,336,'want')");
	tx.executeSql("INSERT "+sf+"(460,335,'sweetheart')");
	tx.executeSql("INSERT "+sf+"(459,334,'adore')");
	tx.executeSql("INSERT "+sf+"(458,333,'love')");
	tx.executeSql("INSERT "+sf+"(457,332,'heart')");
	tx.executeSql("INSERT "+sf+"(456,332,'love')");
	tx.executeSql("INSERT "+sf+"(455,331,'attracted')");
	tx.executeSql("INSERT "+sf+"(454,330,'smell')");
	tx.executeSql("INSERT "+sf+"(453,329,'hug')");
	tx.executeSql("INSERT "+sf+"(452,328,'kiss')");
	tx.executeSql("INSERT "+sf+"(451,327,'kisses')");
	tx.executeSql("INSERT "+sf+"(450,327,'hugs')");
	tx.executeSql("INSERT "+sf+"(449,326,'hugs')");
	tx.executeSql("INSERT "+sf+"(448,325,'kiss')");
	tx.executeSql("INSERT "+sf+"(447,325,'kisses')");
	tx.executeSql("INSERT "+sf+"(446,324,'love')");
	tx.executeSql("INSERT "+sf+"(445,323,'babe')");
	tx.executeSql("INSERT "+sf+"(444,322,'honey')");
	tx.executeSql("INSERT "+sf+"(443,321,'love')");
	tx.executeSql("INSERT "+sf+"(442,320,'love')");
	tx.executeSql("INSERT "+sf+"(441,319,'prince')");
	tx.executeSql("INSERT "+sf+"(440,318,'princess')");
	tx.executeSql("INSERT "+sf+"(439,317,'spectacular')");
	tx.executeSql("INSERT "+sf+"(438,316,'lucky')");
	tx.executeSql("INSERT "+sf+"(437,315,'passionate')");
	tx.executeSql("INSERT "+sf+"(436,314,'like')");
	tx.executeSql("INSERT "+sf+"(435,313,'crazy')");
	tx.executeSql("INSERT "+sf+"(434,312,'crazy')");
	tx.executeSql("INSERT "+sf+"(433,311,'amazing')");
	tx.executeSql("INSERT "+sf+"(432,310,'wonderful')");
	tx.executeSql("INSERT "+sf+"(431,310,'person')");
	tx.executeSql("INSERT "+sf+"(430,309,'smile')");
	tx.executeSql("INSERT "+sf+"(429,308,'eyes')");
	tx.executeSql("INSERT "+sf+"(428,307,'godess')");
	tx.executeSql("INSERT "+sf+"(427,306,'sexy')");
	tx.executeSql("INSERT "+sf+"(426,305,'boyfriend')");
	tx.executeSql("INSERT "+sf+"(425,304,'girlfriend')");
	tx.executeSql("INSERT "+sf+"(424,303,'single')");
	tx.executeSql("INSERT "+sf+"(423,302,'pretty')");
	tx.executeSql("INSERT "+sf+"(422,301,'song')");
	tx.executeSql("INSERT "+sf+"(421,300,'dance')");
	
	tx.executeSql("INSERT "+inf+" (299,'How can I issue Student''s Identity Card?','Πως μπορώ να εκδώσω φοιτητικό πάσο;','pos boro na ekdoso fititiko paso','International Students','440')");
	tx.executeSql("INSERT "+inf+" (298,'Is there Greek Language support lessons for international students?','Υπάρχoυν μαθήματα εκμάθησης ελληνικών για αλλοδαπούς φοιτητές;','iparhoun mathimata ekmathisis elinikon ya alodapous','International Students','439')");
	tx.executeSql("INSERT "+inf+" (297,'Is there an Orientation Programme for new international students?','Υπάρχει πρόγραμμα ένταξης για νέους φοιτητές;','iparhi programa entaxis ya neous fitites','International Students','438')");
	tx.executeSql("INSERT "+inf+" (296,'How can I get National Insurance?','Πως μπορώ να έχω ασφαλιστική κάλυψη; ','pos boro na eho asfalistiki kalipsi','International Students','437')");
	tx.executeSql("INSERT "+inf+" (295,'How do I open a bank account?','Πως ανοίγω τραπεζικό λογαριασμό;','pos anigo trapeziko logariasmo','International Students','436')");
	tx.executeSql("INSERT "+inf+" (294,'How do I apply for a scholarship?','Πως καταθέτω αίτηση για υποτροφία;','pos katatheto etisi ya ipotrofia','International Students','435')");
	tx.executeSql("INSERT "+inf+" (293,'How can I apply for University''s Residence Accommodation?','Πως καταθέτω αίτηση για να μείνω στην Εστία;','pos boro na katatheso etisi ya na mino stin estia','International Students','433')");
	tx.executeSql("INSERT "+inf+" (292,'Where is the Refectory?','Που είναι η Λέσχη;','pou ine i leshi','International Students','432')");
	tx.executeSql("INSERT "+inf+" (291,'Where is the lecture hall?','Που είναι το αμφιθέατρο;','pou ine to amfitheatro','International Students','431')");
	tx.executeSql("INSERT "+inf+" (290,'How do I select modules?','Πως μπορώ να δηλώσω μαθήματα;','pos boro na diloso mathimata','International Students','430')");
	tx.executeSql("INSERT "+inf+" (289,'Where is University''s Campus?','Που είναι η Πανεπιστημιούπολη;','pou ine i panepistimioupoli','International Students','429')");
	tx.executeSql("INSERT "+inf+" (288,'Where is the University''s Library?','Που είναι η Βιβλιοθήκη;','pou ine i vivliothiki','International Students','428')");
	tx.executeSql("INSERT "+inf+" (287,'Where is the Dean''s Office?','Που είναι η Πρυτανεία;','pou ine i pritania','International Students','427')");
	tx.executeSql("INSERT "+inf+" (286,'Where is University''s Secretary Office?','Που είναι η Γραμματεία;','pou ine i gramatia','International Students','426')");
	tx.executeSql("INSERT "+inf+" (285,'Where is the International Students'' Office?','Που είναι το Γραφείο Διασύνδεσης;','pou ine to grafio diasindesis','International Students','441')");
	
	
	
	tx.executeSql("INSERT "+sf+"(1700,285,'study')");
	tx.executeSql("INSERT "+sf+"(1701,285,'university')");
	tx.executeSql("INSERT "+sf+"(1702,285,'lesson')");
	tx.executeSql("INSERT "+sf+"(1703,286,'study')");
	tx.executeSql("INSERT "+sf+"(1704,286,'lesson')");
	tx.executeSql("INSERT "+sf+"(1705,287,'study')");
	tx.executeSql("INSERT "+sf+"(1706,287,'university')");
	tx.executeSql("INSERT "+sf+"(1707,287,'lesson')");
	tx.executeSql("INSERT "+sf+"(1708,288,'study')");
	tx.executeSql("INSERT "+sf+"(1709,288,'lesson')");
	tx.executeSql("INSERT "+sf+"(1710,289,'study')");
	tx.executeSql("INSERT "+sf+"(1711,289,'lesson')");
	tx.executeSql("INSERT "+sf+"(1712,290,'study')");
	tx.executeSql("INSERT "+sf+"(1713,290,'university')");
	tx.executeSql("INSERT "+sf+"(1714,290,'lesson')");
	tx.executeSql("INSERT "+sf+"(1715,291,'study')");
	tx.executeSql("INSERT "+sf+"(1716,291,'university')");
	tx.executeSql("INSERT "+sf+"(1717,291,'lesson')");
	tx.executeSql("INSERT "+sf+"(1718,292,'study')");
	tx.executeSql("INSERT "+sf+"(1719,292,'lesson')");
	tx.executeSql("INSERT "+sf+"(1720,293,'study')");
	tx.executeSql("INSERT "+sf+"(1721,293,'university')");
	tx.executeSql("INSERT "+sf+"(1722,293,'lesson')");
	tx.executeSql("INSERT "+sf+"(1723,294,'study')");
	tx.executeSql("INSERT "+sf+"(1724,294,'university')");
	tx.executeSql("INSERT "+sf+"(1725,294,'lesson')");
	tx.executeSql("INSERT "+sf+"(1726,295,'study')");
	tx.executeSql("INSERT "+sf+"(1727,295,'university')");
	tx.executeSql("INSERT "+sf+"(1728,295,'lesson')");
	tx.executeSql("INSERT "+sf+"(1729,296,'study')");
	tx.executeSql("INSERT "+sf+"(1730,296,'university')");
	tx.executeSql("INSERT "+sf+"(1731,296,'lesson')");
	tx.executeSql("INSERT "+sf+"(1732,297,'study')");
	tx.executeSql("INSERT "+sf+"(1733,297,'university')");
	tx.executeSql("INSERT "+sf+"(1734,297,'lesson')");
	tx.executeSql("INSERT "+sf+"(1735,298,'study')");
	tx.executeSql("INSERT "+sf+"(1736,298,'university')");
	tx.executeSql("INSERT "+sf+"(1737,298,'lesson')");
	tx.executeSql("INSERT "+sf+"(1738,299,'study')");
	tx.executeSql("INSERT "+sf+"(1739,299,'university')");
	tx.executeSql("INSERT "+sf+"(1740,299,'lesson')");
	
	tx.executeSql("INSERT "+sf+"(420,299,'student')");
	tx.executeSql("INSERT "+sf+"(419,299,'card')");
	tx.executeSql("INSERT "+sf+"(418,298,'student')");
	tx.executeSql("INSERT "+sf+"(417,298,'greek language')");
	tx.executeSql("INSERT "+sf+"(416,297,'student')");
	tx.executeSql("INSERT "+sf+"(415,297,'orientation')");
	tx.executeSql("INSERT "+sf+"(414,296,'insurance')");
	tx.executeSql("INSERT "+sf+"(413,296,'national')");
	tx.executeSql("INSERT "+sf+"(412,295,'account')");
	tx.executeSql("INSERT "+sf+"(411,295,'bank')");
	tx.executeSql("INSERT "+sf+"(410,294,'scholarship')");
	tx.executeSql("INSERT "+sf+"(409,293,'university')");
	tx.executeSql("INSERT "+sf+"(408,293,'accommodation')");
	tx.executeSql("INSERT "+sf+"(407,292,'refectory')");
	tx.executeSql("INSERT "+sf+"(406,291,'lecture')");
	tx.executeSql("INSERT "+sf+"(405,291,'hall')");
	tx.executeSql("INSERT "+sf+"(404,290,'modules')");
	tx.executeSql("INSERT "+sf+"(403,289,'university')");
	tx.executeSql("INSERT "+sf+"(402,289,'campus')");
	tx.executeSql("INSERT "+sf+"(401,288,'university')");
	tx.executeSql("INSERT "+sf+"(400,288,'library')");
	tx.executeSql("INSERT "+sf+"(399,287,'office')");
	tx.executeSql("INSERT "+sf+"(398,287,'dean')");
	tx.executeSql("INSERT "+sf+"(397,286,'university')");
	tx.executeSql("INSERT "+sf+"(396,286,'office')");
	tx.executeSql("INSERT "+sf+"(395,285,'student')");
	tx.executeSql("INSERT "+sf+"(394,285,'office')");
	
	tx.executeSql("INSERT "+inf+" (284,'Dummass','Χαζός','xazos','Censored','524')");
	tx.executeSql("INSERT "+inf+" (283,'Idiot','Ηλίθιος','ilithios','Censored','523')");
	tx.executeSql("INSERT "+inf+" (282,'Twat','Μουνάκι','mounaki','Censored','522')");
	tx.executeSql("INSERT "+inf+" (281,'Boobs','Βυζιά','vizia','Censored','521')");
	tx.executeSql("INSERT "+inf+" (280,'Blowjob','Πίπα','pipa','Censored','520')");
	tx.executeSql("INSERT "+inf+" (279,'Dyke','Λεσβία','lesvia','Censored','519')");
	tx.executeSql("INSERT "+inf+" (278,'Cocksucker','Τσιμπουκλού','tsibouklou','Censored','518')");
	tx.executeSql("INSERT "+inf+" (277,'Whore','Πόρνη','porni','Censored','517')");
	tx.executeSql("INSERT "+inf+" (276,'Wanker','Μαλάκας','malakas','Censored','516')");
	tx.executeSql("INSERT "+inf+" (275,'Dick','Πούτσος','poutsos','Censored','515')");
	tx.executeSql("INSERT "+inf+" (274,'Crap','Σίχαμα','sihama','Censored','514')");
	tx.executeSql("INSERT "+inf+" (273,'Pussy','Μουνί','mouni','Censored','513')");
	tx.executeSql("INSERT "+inf+" (272,'Bitch','Πουτάνα','poutana','Censored','512')");
	tx.executeSql("INSERT "+inf+" (271,'Asshole','Μαλάκα','malaka','Censored','511')");
	tx.executeSql("INSERT "+inf+" (270,'Ass','Κώλος','kolos','Censored','510')");
	tx.executeSql("INSERT "+inf+" (269,'Shit','Σκατά','skata','Censored','509')");
	tx.executeSql("INSERT "+inf+" (268,'Fuck off','Γαμήσου','gamisou','Censored','508')");
	tx.executeSql("INSERT "+inf+" (267,'Fucker','Γαμημένε','gamimene','Censored','507')");
	tx.executeSql("INSERT "+inf+" (266,'Fuck','Γαμώτο','gamoto','Censored','506')");
	
	tx.executeSql("INSERT "+sf+"(1600,266,'sex')");
	tx.executeSql("INSERT "+sf+"(1601,267,'sex')");
	tx.executeSql("INSERT "+sf+"(1602,267,'fuck')");
	tx.executeSql("INSERT "+sf+"(1603,268,'sex')");
	tx.executeSql("INSERT "+sf+"(1604,268,'fuck')");
	tx.executeSql("INSERT "+sf+"(1605,269,'sex')");
	tx.executeSql("INSERT "+sf+"(1606,269,'fuck')");
	tx.executeSql("INSERT "+sf+"(1607,270,'sex')");
	tx.executeSql("INSERT "+sf+"(1608,270,'fuck')");
	tx.executeSql("INSERT "+sf+"(1609,271,'sex')");
	tx.executeSql("INSERT "+sf+"(1610,271,'fuck')");
	tx.executeSql("INSERT "+sf+"(1611,272,'sex')");
	tx.executeSql("INSERT "+sf+"(1612,272,'fuck')");
	tx.executeSql("INSERT "+sf+"(1613,273,'sex')");
	tx.executeSql("INSERT "+sf+"(1614,273,'fuck')");
	tx.executeSql("INSERT "+sf+"(1615,274,'sex')");
	tx.executeSql("INSERT "+sf+"(1616,274,'fuck')");
	tx.executeSql("INSERT "+sf+"(1617,275,'sex')");
	tx.executeSql("INSERT "+sf+"(1618,276,'fuck')");
	tx.executeSql("INSERT "+sf+"(1619,277,'sex')");
	tx.executeSql("INSERT "+sf+"(1620,278,'fuck')");
	tx.executeSql("INSERT "+sf+"(1621,278,'sex')");
	tx.executeSql("INSERT "+sf+"(1622,279,'fuck')");
	tx.executeSql("INSERT "+sf+"(1623,280,'sex')");
	tx.executeSql("INSERT "+sf+"(1624,280,'fuck')");
	tx.executeSql("INSERT "+sf+"(1625,281,'sex')");
	tx.executeSql("INSERT "+sf+"(1626,281,'fuck')");
	tx.executeSql("INSERT "+sf+"(1627,282,'sex')");
	tx.executeSql("INSERT "+sf+"(1628,282,'fuck')");
	tx.executeSql("INSERT "+sf+"(1629,283,'sex')");
	tx.executeSql("INSERT "+sf+"(1630,283,'fuck')");
	tx.executeSql("INSERT "+sf+"(1631,284,'sex')");
	tx.executeSql("INSERT "+sf+"(1632,284,'fuck')");
	
	tx.executeSql("INSERT "+sf+"(393,284,'dummass')");
	tx.executeSql("INSERT "+sf+"(392,283,'idiot')");
	tx.executeSql("INSERT "+sf+"(391,282,'twat')");
	tx.executeSql("INSERT "+sf+"(390,281,'boobs')");
	tx.executeSql("INSERT "+sf+"(389,280,'blowjob')");
	tx.executeSql("INSERT "+sf+"(388,279,'dyke')");
	tx.executeSql("INSERT "+sf+"(387,278,'cocksucker')");
	tx.executeSql("INSERT "+sf+"(386,277,'whore')");
	tx.executeSql("INSERT "+sf+"(385,276,'wanker')");
	tx.executeSql("INSERT "+sf+"(384,275,'dick')");
	tx.executeSql("INSERT "+sf+"(383,274,'crap')");
	tx.executeSql("INSERT "+sf+"(382,273,'pussy')");
	tx.executeSql("INSERT "+sf+"(381,272,'bitch')");
	tx.executeSql("INSERT "+sf+"(380,271,'asshole')");
	tx.executeSql("INSERT "+sf+"(379,270,'ass')");
	tx.executeSql("INSERT "+sf+"(378,269,'shit')");
	tx.executeSql("INSERT "+sf+"(377,268,'fuck off')");
	tx.executeSql("INSERT "+sf+"(376,267,'fucker')");
	tx.executeSql("INSERT "+sf+"(375,266,'fuck')");
	
	tx.executeSql("INSERT "+inf+" (265,'Where is the nearest pharmacy?','Που είναι το πιο κοντινό φαρμακείο;','pou ine to kondino farmakio','Health','405')");
	tx.executeSql("INSERT "+inf+" (264,'Where is the nearest hospital?','Που είναι το πιο κοντινό νοσοκομείο;','pou ine to kondino nosokomio','Health','404')");
	tx.executeSql("INSERT "+inf+" (263,'Could you please help?','Μπορείς να βοηθήσεις παρακαλώ;','boris na voithisis parakalo','Health','403')");
	tx.executeSql("INSERT "+inf+" (262,'There''s been an accident','Έγινε ατύχημα','egine atihima','Health','402')");
	tx.executeSql("INSERT "+inf+" (261,'I have lost a filling','Μου έφυγε ένα σφράγισμα','mοu efiye ena sfrayisma','Health','401')");
	tx.executeSql("INSERT "+inf+" (260,'Do I need a prescription for…?','Χρειάζομαι συνταγή για…;','xriazome sindayi ya','Health','400')");
	tx.executeSql("INSERT "+inf+" (259,'Can you take these if you are pregnant?','Μπορείς να τα πάρεις εάν είσαι έγκυος;','boris na ta paris ean ise egios','Health','399')");
	tx.executeSql("INSERT "+inf+" (258,'I''m allergic to…','Είμαι αλλεργικός με…','ime alergikos me','Health','398')");
	tx.executeSql("INSERT "+inf+" (257,'I need a prescription for…','Χρειάζομαι συνταγή για…','hriazome sindayi ya','Health','397')");
	tx.executeSql("INSERT "+inf+" (256,'I''m… months pregnant','Είμαι… μηνών έγκυος','ime… minon egios','Health','396')");
	tx.executeSql("INSERT "+inf+" (255,'I have a temperature','Έχω πυρετό','eho pireto','Health','395')");
	tx.executeSql("INSERT "+inf+" (254,'It aches','Πονάει','ponaei','Health','394')");
	tx.executeSql("INSERT "+inf+" (253,'It stings','Τσούζει ','tsοuzi','Health','393')");
	tx.executeSql("INSERT "+inf+" (252,'It hurts more at night','Πονάει περισσότερο τη νύχτα','ponai perisotero ti nihta','Health','392')");
	tx.executeSql("INSERT "+inf+" (251,'It hurts when you touch it','Με πονάει όταν το ακουμπάς','me ponai otan to akοubas','Health','391')");
	tx.executeSql("INSERT "+inf+" (250,'It only hurts now and then','Με πονάει πότε-πότε','me ponai pote-pote','Health','390')");
	tx.executeSql("INSERT "+inf+" (249,'It hurts all the time','Πονάει συνέχεια','ponai sinehia','Health','389')");
	tx.executeSql("INSERT "+inf+" (248,'It''s a dull pain','Έχω ένα μικρό πόνο','eho ena mikro pono','Health','388')");
	tx.executeSql("INSERT "+inf+" (247,'It''s a sharp pain','Είναι δυνατός πόνος','ine dinatos ponos','Health','387')");
	tx.executeSql("INSERT "+inf+" (246,'It hurts here','Πονάει εδώ','ponai edo','Health','386')");
	tx.executeSql("INSERT "+inf+" (245,'I have a sore throat','Πονάει ο λαιμός μου','ponai o lemos mοu','Health','385')");
	tx.executeSql("INSERT "+inf+" (244,'I feel dizzy','Ζαλίζομαι','zalizome','Health','384')");
	tx.executeSql("INSERT "+inf+" (243,'I feel sick','Θα κάνω εμετό','tha kano emeto','Health','383')");
	tx.executeSql("INSERT "+inf+" (242,'I feel faint','Μου έρχεται λιποθυμία','mοu erhete lipothimia','Health','382')");
	tx.executeSql("INSERT "+inf+" (241,'I do not feel well','Δεν αισθάνομαι καλά','den esthanome kala','Health','381')");
	tx.executeSql("INSERT "+inf+" (240,'I have a pain in…','Έχω ένα πόνο στο…','eho ena pono sto','Health','406')");
	
	tx.executeSql("INSERT "+sf+"(1530,240,'feel')");
	tx.executeSql("INSERT "+sf+"(1531,240,'hurts')");
	tx.executeSql("INSERT "+sf+"(1532,241,'pain')");
	tx.executeSql("INSERT "+sf+"(1533,241,'hurts')");
	tx.executeSql("INSERT "+sf+"(1534,242,'feel')");
	tx.executeSql("INSERT "+sf+"(1535,242,'pain')");
	tx.executeSql("INSERT "+sf+"(1536,242,'hurts')");
	tx.executeSql("INSERT "+sf+"(1537,243,'feel')");
	tx.executeSql("INSERT "+sf+"(1538,243,'pain')");
	tx.executeSql("INSERT "+sf+"(1539,243,'hurts')");
	tx.executeSql("INSERT "+sf+"(1540,244,'feel')");
	tx.executeSql("INSERT "+sf+"(1541,244,'pain')");
	tx.executeSql("INSERT "+sf+"(1542,244,'hurts')");
	tx.executeSql("INSERT "+sf+"(1543,245,'feel')");
	tx.executeSql("INSERT "+sf+"(1544,245,'pain')");
	tx.executeSql("INSERT "+sf+"(1545,245,'hurts')");
	tx.executeSql("INSERT "+sf+"(1546,246,'feel')");
	tx.executeSql("INSERT "+sf+"(1547,246,'pain')");
	tx.executeSql("INSERT "+sf+"(1548,247,'hurts')");
	tx.executeSql("INSERT "+sf+"(1549,247,'feel')");
	tx.executeSql("INSERT "+sf+"(1550,248,'hurts')");
	tx.executeSql("INSERT "+sf+"(1551,248,'feel')");
	tx.executeSql("INSERT "+sf+"(1552,249,'feel')");
	tx.executeSql("INSERT "+sf+"(1553,249,'pain')");
	tx.executeSql("INSERT "+sf+"(1554,250,'feel')");
	tx.executeSql("INSERT "+sf+"(1555,250,'pain')");
	tx.executeSql("INSERT "+sf+"(1556,251,'feel')");
	tx.executeSql("INSERT "+sf+"(1557,251,'pain')");
	tx.executeSql("INSERT "+sf+"(1558,252,'feel')");
	tx.executeSql("INSERT "+sf+"(1559,252,'pain')");
	tx.executeSql("INSERT "+sf+"(1560,253,'feel')");
	tx.executeSql("INSERT "+sf+"(1561,253,'pain')");
	tx.executeSql("INSERT "+sf+"(1562,253,'hurts')");
	tx.executeSql("INSERT "+sf+"(1563,254,'feel')");
	tx.executeSql("INSERT "+sf+"(1564,254,'pain')");
	tx.executeSql("INSERT "+sf+"(1565,254,'hurts')");
	tx.executeSql("INSERT "+sf+"(1566,255,'feel')");
	tx.executeSql("INSERT "+sf+"(1567,255,'pain')");
	tx.executeSql("INSERT "+sf+"(1568,255,'hurts')");
	tx.executeSql("INSERT "+sf+"(1569,256,'feel')");
	tx.executeSql("INSERT "+sf+"(1570,256,'pain')");
	tx.executeSql("INSERT "+sf+"(1571,256,'hurts')");
	tx.executeSql("INSERT "+sf+"(1572,257,'feel')");
	tx.executeSql("INSERT "+sf+"(1573,257,'pain')");
	tx.executeSql("INSERT "+sf+"(1574,257,'hurts')");
	tx.executeSql("INSERT "+sf+"(1575,258,'feel')");
	tx.executeSql("INSERT "+sf+"(1576,258,'pain')");
	tx.executeSql("INSERT "+sf+"(1577,258,'hurts')");
	tx.executeSql("INSERT "+sf+"(1578,259,'feel')");
	tx.executeSql("INSERT "+sf+"(1579,259,'pain')");
	tx.executeSql("INSERT "+sf+"(1580,259,'hurts')");
	tx.executeSql("INSERT "+sf+"(1581,260,'feel')");
	tx.executeSql("INSERT "+sf+"(1582,260,'pain')");
	tx.executeSql("INSERT "+sf+"(1583,260,'hurts')");
	tx.executeSql("INSERT "+sf+"(1584,261,'feel')");
	tx.executeSql("INSERT "+sf+"(1585,261,'pain')");
	tx.executeSql("INSERT "+sf+"(1586,261,'hurts')");
	tx.executeSql("INSERT "+sf+"(1587,262,'feel')");
	tx.executeSql("INSERT "+sf+"(1588,262,'pain')");
	tx.executeSql("INSERT "+sf+"(1589,262,'hurts')");
	tx.executeSql("INSERT "+sf+"(1590,263,'feel')");
	tx.executeSql("INSERT "+sf+"(1591,263,'pain')");
	tx.executeSql("INSERT "+sf+"(1592,263,'hurts')");
	tx.executeSql("INSERT "+sf+"(1593,264,'feel')");
	tx.executeSql("INSERT "+sf+"(1594,264,'pain')");
	tx.executeSql("INSERT "+sf+"(1595,264,'hurts')");
	tx.executeSql("INSERT "+sf+"(1596,265,'feel')");
	tx.executeSql("INSERT "+sf+"(1597,265,'pain')");
	tx.executeSql("INSERT "+sf+"(1598,265,'hurts')");
	
	tx.executeSql("INSERT "+sf+"(374,265,'pharmacy')");
	tx.executeSql("INSERT "+sf+"(373,264,'hospital')");
	tx.executeSql("INSERT "+sf+"(372,263,'help')");
	tx.executeSql("INSERT "+sf+"(371,262,'accident')");
	tx.executeSql("INSERT "+sf+"(370,261,'filling')");
	tx.executeSql("INSERT "+sf+"(369,260,'prescription')");
	tx.executeSql("INSERT "+sf+"(368,259,'pregnant')");
	tx.executeSql("INSERT "+sf+"(367,258,'allergic')");
	tx.executeSql("INSERT "+sf+"(366,257,'prescription')");
	tx.executeSql("INSERT "+sf+"(365,256,'month')");
	tx.executeSql("INSERT "+sf+"(364,256,'pregnant')");
	tx.executeSql("INSERT "+sf+"(363,255,'temperature')");
	tx.executeSql("INSERT "+sf+"(362,254,'ach')");
	tx.executeSql("INSERT "+sf+"(361,254,'aches')");
	tx.executeSql("INSERT "+sf+"(360,253,'string')");
	tx.executeSql("INSERT "+sf+"(359,253,'stings')");
	tx.executeSql("INSERT "+sf+"(358,252,'hurts')");
	tx.executeSql("INSERT "+sf+"(357,251,'hurts')");
	tx.executeSql("INSERT "+sf+"(356,250,'hurts')");
	tx.executeSql("INSERT "+sf+"(355,249,'hurts')");
	tx.executeSql("INSERT "+sf+"(354,248,'pain')");
	tx.executeSql("INSERT "+sf+"(353,247,'pain')");
	tx.executeSql("INSERT "+sf+"(352,246,'hurts')");
	tx.executeSql("INSERT "+sf+"(351,245,'sore throat')");
	tx.executeSql("INSERT "+sf+"(350,244,'dizzy')");
	tx.executeSql("INSERT "+sf+"(349,243,'sick')");
	tx.executeSql("INSERT "+sf+"(348,242,'faint')");
	tx.executeSql("INSERT "+sf+"(347,241,'feel')");
	tx.executeSql("INSERT "+sf+"(346,240,'pain')");
	
	tx.executeSql("INSERT "+inf+" (239,'Hello, this is… speaking','Χαίρετε, είμαι ο/η…','herete, ime o/ i','Communications','356-1')");
	tx.executeSql("INSERT "+inf+" (238,'Speaking','Ο ίδιος','o idios','Communications','356-2')");
	tx.executeSql("INSERT "+inf+" (237,'I would like to speak to…','Θα ήθελα να μιλήσω στον…','tha ithela na miliso ston','Communications','357')");
	tx.executeSql("INSERT "+inf+" (236,'Extension…, please','Εσωτερικό… παρακαλώ','esoteriko… parakalo','Communications','358')");
	tx.executeSql("INSERT "+inf+" (235,'Please tell him… called','Παρακαλώ του λέτε ότι τηλεφώνησε ο/ η …','parakalo tu lete oti tilefonise o/ i','Communications','359')");
	tx.executeSql("INSERT "+inf+" (234,'Ask him to call me back, please','Πέστε του να με ξαναπάρει παρακαλώ','peste tu na me xanapari parakalo','Communications','360')");
	tx.executeSql("INSERT "+inf+" (233,'My number is…','Το τηλέφωνό μου είναι…','to tilefono mu ine','Communications','361')");
	tx.executeSql("INSERT "+inf+" (232,'Do you know where he is?','Ξέρετε που είναι;','xerete pu ine','Communications','362')");
	tx.executeSql("INSERT "+inf+" (231,'When will he be back?','Πότε θα επιστρέψει;','pote tha epistrepsi','Communications','363')");
	tx.executeSql("INSERT "+inf+" (230,'Could you leave him a message?','Μπορείτε να του αφήσετε ένα μηνύμα;','borite na tu afisete ena minima','Communications','364')");
	tx.executeSql("INSERT "+inf+" (229,'I''ll ring back later','Θα σε ξαναπάρω αργότερα','tha se xanaparo argotera','Communications','365')");
	tx.executeSql("INSERT "+inf+" (228,'Sorry, wrong number','Πήρατε λάθος αριθμό','pirate lathos arithmo','Communications','366')");
	tx.executeSql("INSERT "+inf+" (227,'Is there a telephone directory?','Υπάρχει κανένας τηλεφωνικός κατάλογος;','iparhi kanenas tilefonikos katalogos','Communications','367')");
	tx.executeSql("INSERT "+inf+" (226,'I would like the directory for…','Θα ήθελα τον κατάλογο για…','tha ithela ton katalogo ya','Communications','368')");
	tx.executeSql("INSERT "+inf+" (225,'Can I call abroad from here?','Μπορώ να τηλεφωνήσω στο εξωτερικό από εδώ;','boro na tilefoniso sto exoteriko apo edo','Communications','369')");
	tx.executeSql("INSERT "+inf+" (224,'How much is a call to…?','Πόσο στοιχίζει ένα τηλεφώνημα στο…;','poso stihizi ena tilefonima sto','Communications','370')");
	tx.executeSql("INSERT "+inf+" (223,'I would like a number in…','Θέλω ένα αριθμό στην …','thelo ena arithmo stin','Communications','371')");
	tx.executeSql("INSERT "+inf+" (222,'What''s your fax number?','Ποιος είναι ο αριθμός του φαξ','pios ine o arithmos tοu fax','Communications','372')");
	tx.executeSql("INSERT "+inf+" (221,'What''s your email address?','Ποια είναι η διεύθυνση του email σου;','pia ine I diefthinsi toy email soy','Communications','373')");
	tx.executeSql("INSERT "+inf+" (220,'Did you get my email?','Έλαβες το email μου;','elaves to email mοu','Communications','374')");
	tx.executeSql("INSERT "+inf+" (219,'Please resend your fax','Παρακαλώ ξαναστείλτε το φαξ','parakalo xanastilte to fax','Communications','375')");
	tx.executeSql("INSERT "+inf+" (218,'Can I send an email from here?','Μπορώ να στείλω email από εδώ;','boro na stilo email apo edo','Communications','376')");
	tx.executeSql("INSERT "+inf+" (217,'Can I use the photocopier?','Μπορώ να χρησιμοποιήσω το φωτοτυπικό μηχάνημα;','boro na hrismopiiso to fototipiko mihanima','Communications','377')");
	tx.executeSql("INSERT "+inf+" (216,'How do I get an outside line?','Πως παίρνω εξωτερική γραμμή;','pos perno exoteriki grammi','Communications','378')");
	tx.executeSql("INSERT "+inf+" (215,'I would like to reserve the charges','Θα ήθελα τα έξοδα να πληρωθούν εκεί','tha ithela ta exoda na plirothοun eki','Communications','379')");
	tx.executeSql("INSERT "+inf+" (214,'Where is the nearest phone booth?','Που είναι ο πλησιέστερος τηλεφωνικός θάλαμος;','pu ine o plisiesteros tilefonikos thalamos','Communications','380')");
	
	tx.executeSql("INSERT "+sf+"(1420,214,'speak')");
	tx.executeSql("INSERT "+sf+"(1421,214,'call')");
	tx.executeSql("INSERT "+sf+"(1422,215,'speak')");
	tx.executeSql("INSERT "+sf+"(1423,215,'call')");
	tx.executeSql("INSERT "+sf+"(1424,216,'speak')");
	tx.executeSql("INSERT "+sf+"(1425,216,'call')");
	tx.executeSql("INSERT "+sf+"(1426,217,'speak')");
	tx.executeSql("INSERT "+sf+"(1427,217,'call')");
	tx.executeSql("INSERT "+sf+"(1428,218,'speak')");
	tx.executeSql("INSERT "+sf+"(1429,218,'call')");
	tx.executeSql("INSERT "+sf+"(1430,219,'speak')");
	tx.executeSql("INSERT "+sf+"(1431,219,'call')");
	tx.executeSql("INSERT "+sf+"(1432,220,'speak')");
	tx.executeSql("INSERT "+sf+"(1433,220,'call')");
	tx.executeSql("INSERT "+sf+"(1434,221,'speak')");
	tx.executeSql("INSERT "+sf+"(1435,221,'call')");
	tx.executeSql("INSERT "+sf+"(1436,222,'speak')");
	tx.executeSql("INSERT "+sf+"(1437,222,'call')");
	tx.executeSql("INSERT "+sf+"(1438,223,'speak')");
	tx.executeSql("INSERT "+sf+"(1439,223,'call')");
	tx.executeSql("INSERT "+sf+"(1440,224,'speak')");
	tx.executeSql("INSERT "+sf+"(1441,225,'speak')");
	tx.executeSql("INSERT "+sf+"(1442,226,'speak')");
	tx.executeSql("INSERT "+sf+"(1443,226,'call')");
	tx.executeSql("INSERT "+sf+"(1444,227,'speak')");
	tx.executeSql("INSERT "+sf+"(1445,227,'call')");
	tx.executeSql("INSERT "+sf+"(1446,228,'speak')");
	tx.executeSql("INSERT "+sf+"(1447,228,'call')");
	tx.executeSql("INSERT "+sf+"(1448,229,'speak')");
	tx.executeSql("INSERT "+sf+"(1449,229,'call')");
	tx.executeSql("INSERT "+sf+"(1450,230,'speak')");
	tx.executeSql("INSERT "+sf+"(1451,230,'call')");
	tx.executeSql("INSERT "+sf+"(1452,231,'speak')");
	tx.executeSql("INSERT "+sf+"(1453,231,'call')");
	tx.executeSql("INSERT "+sf+"(1454,232,'speak')");
	tx.executeSql("INSERT "+sf+"(1455,232,'call')");
	tx.executeSql("INSERT "+sf+"(1456,233,'speak')");
	tx.executeSql("INSERT "+sf+"(1457,233,'call')");
	tx.executeSql("INSERT "+sf+"(1458,234,'speak')");
	tx.executeSql("INSERT "+sf+"(1459,235,'speak')");
	tx.executeSql("INSERT "+sf+"(1460,236,'speak')");
	tx.executeSql("INSERT "+sf+"(1461,236,'call')");
	tx.executeSql("INSERT "+sf+"(1462,237,'call')");
	tx.executeSql("INSERT "+sf+"(1463,238,'call')");
	tx.executeSql("INSERT "+sf+"(1464,239,'call')");
	tx.executeSql("INSERT "+sf+"(345,215,'charges')");
	tx.executeSql("INSERT "+sf+"(344,216,'line')");
	tx.executeSql("INSERT "+sf+"(343,217,'photocopier')");
	tx.executeSql("INSERT "+sf+"(342,218,'email')");
	tx.executeSql("INSERT "+sf+"(341,219,'fax')");
	tx.executeSql("INSERT "+sf+"(340,220,'email')");
	tx.executeSql("INSERT "+sf+"(339,221,'email')");
	tx.executeSql("INSERT "+sf+"(338,222,'fax')");
	tx.executeSql("INSERT "+sf+"(337,223,'number')");
	tx.executeSql("INSERT "+sf+"(336,224,'call')");
	tx.executeSql("INSERT "+sf+"(335,225,'call')");
	tx.executeSql("INSERT "+sf+"(334,226,'directory')");
	tx.executeSql("INSERT "+sf+"(333,227,'telephone')");
	tx.executeSql("INSERT "+sf+"(332,227,'directory')");
	tx.executeSql("INSERT "+sf+"(331,228,'number')");
	tx.executeSql("INSERT "+sf+"(330,229,'later')");
	tx.executeSql("INSERT "+sf+"(329,229,'ring')");
	tx.executeSql("INSERT "+sf+"(328,230,'message')");
	tx.executeSql("INSERT "+sf+"(327,231,'be back')");
	tx.executeSql("INSERT "+sf+"(326,232,'where')");
	tx.executeSql("INSERT "+sf+"(325,233,'number')");
	tx.executeSql("INSERT "+sf+"(324,234,'call')");
	tx.executeSql("INSERT "+sf+"(323,235,'call')");
	tx.executeSql("INSERT "+sf+"(322,235,'called')");
	tx.executeSql("INSERT "+sf+"(321,236,'extension')");
	tx.executeSql("INSERT "+sf+"(320,237,'speak')");
	tx.executeSql("INSERT "+sf+"(319,238,'speak')");
	tx.executeSql("INSERT "+sf+"(318,238,'speaking')");
	tx.executeSql("INSERT "+sf+"(317,239,'speak')");
	tx.executeSql("INSERT "+sf+"(316,239,'speaking')");
	tx.executeSql("INSERT "+sf+"(315,214,'booth')");
	tx.executeSql("INSERT "+sf+"(314,214,'phone')");
	
	tx.executeSql("INSERT "+inf+" (213,'Could you give me smaller notes?','Μπορείτε να μου δώσετε μικρότερα χαρτονομίσματα;','borite na mou dosete mikrotera hartonomismata','Banks','354')");
	tx.executeSql("INSERT "+inf+" (212,'Can I draw using this credit card?','Μπορώ να πάρω μετρητά με αυτή την πιστωτική κάρτα;','boro na paro metrita me afti tin pistotiki karta','Banks','353')");
	tx.executeSql("INSERT "+inf+" (211,'What is the exchange rate for the pound?','Ποια είναι η τιμή συναλλάγματος για τη στερλίνα;','pia ine i timi sinalagmatos ya ti sterlina','Banks','352')");
	tx.executeSql("INSERT "+inf+" (210,'Can I cash these traveller''s cheques?','Μπορώ να εξαργυρώσω αυτές τις ταξιδιωτικές επιταγές;','boro na exargiroso aftes tis taxidiotikes epitayes','Banks','351')");
	tx.executeSql("INSERT "+inf+" (209,'I''d like to change this into 20 euro notes','Θα ήθελα να το αλλάξω αυτό σε χαρτονόμισμα των είκοσι ευρώ','tha ithela na to alaxo afto se hartonomisma ton ikosi evro','Banks','350')");
	tx.executeSql("INSERT "+inf+" (208,'This is to go airmail?','Αυτό να πάει αεροπορικώς','afto na pai aeroporikos','Banks','349')");
	tx.executeSql("INSERT "+inf+" (207,'Is there any mail for me?','Υπάρχει κανένα γράμμα για μένα;','iparhi kanena grama ya mena','Banks','348')");
	tx.executeSql("INSERT "+inf+" (206,'Where can I post this?','Που μπορώ να ταχυδρομήσω αυτό;','pοu boro na tahidromiso afto','Banks','347')");
	tx.executeSql("INSERT "+inf+" (205,'How long does the post to…  take?','Πόσο κάνει να φτάσει στην …;','poso kani na ftasi stin','Banks','346')");
	tx.executeSql("INSERT "+inf+" (204,'I want to send this parcel to…','Θέλω να στείλω αυτό το δέμα στην …','thelo na stilo afto to dema stin','Banks','345')");
	tx.executeSql("INSERT "+inf+" (203,'I want to register this letter','Θέλω να στείλω αυτό το γράμμα συστημένο','thelo na stilo afto to grama sistimeno','Banks','344')");
	tx.executeSql("INSERT "+inf+" (202,'I would like three 50 cen stamps','Θα ήθελα τρία γραμματόσημα των πενήντα λεπτών','tha ithela tria gramatosima ton peninda lepton','Banks','355')");
	tx.executeSql("INSERT "+inf+" (201,'How much is a  postcard to…?','Πόσο κάνει το γραμματόσημο για  μία κάρτα για…;','poso kani to gramatosimo ya  mia karta','Banks','343')");
	
	tx.executeSql("INSERT "+sf+"(313,213,'notes')");
	tx.executeSql("INSERT "+sf+"(312,212,'credit card')");
	tx.executeSql("INSERT "+sf+"(311,211,'rate')");
	tx.executeSql("INSERT "+sf+"(310,211,'exchange')");
	tx.executeSql("INSERT "+sf+"(309,210,'traveller')");
	tx.executeSql("INSERT "+sf+"(308,210,'cheque')");
	tx.executeSql("INSERT "+sf+"(307,209,'note')");
	tx.executeSql("INSERT "+sf+"(306,209,'change')");
	tx.executeSql("INSERT "+sf+"(305,208,'airmail')");
	tx.executeSql("INSERT "+sf+"(304,207,'mail')");
	tx.executeSql("INSERT "+sf+"(303,206,'post')");
	tx.executeSql("INSERT "+sf+"(302,205,'post')");
	tx.executeSql("INSERT "+sf+"(301,204,'parcel')");
	tx.executeSql("INSERT "+sf+"(300,203,'register')");
	tx.executeSql("INSERT "+sf+"(299,203,'letter')");
	tx.executeSql("INSERT "+sf+"(298,202,'stamps')");
	tx.executeSql("INSERT "+sf+"(297,201,'postcard')");
	
	tx.executeSql("INSERT "+inf+" (200,'Can I fish here?','Μπορώ να ψαρέψω εδώ;','boro na psarepso edo','Sport','341')");
	tx.executeSql("INSERT "+inf+" (199,'Where can I hire…?','Που μπορώ να νοικιάσω;','pou boro na nikiaso','Sport','340')");
	tx.executeSql("INSERT "+inf+" (198,'I would like to take water -skiing lessons','Θα ήθελα να πάρω μαθήματα σκι','tha ithela na paro mathimata ski','Sport','339')");
	tx.executeSql("INSERT "+inf+" (197,'Am I allowed to camp here?','Επιτρέπεται να κατασκηνώσω εδώ;','epitrepete na kataskinoso edo','Sport','338')");
	tx.executeSql("INSERT "+inf+" (196,'How much does it cost per hour/ day?','Πόσο στοιχίζει την ώρα/ ημέρα;','poso stihizi tin ora/ imera','Sport','336-337')");
	tx.executeSql("INSERT "+inf+" (195,'Do I need a licence?','Χρειάζομαι δίπλωμα;','hriazome diploma','Sport','335')");
	tx.executeSql("INSERT "+inf+" (194,'Is it safe to swim here?','Είναι ασφαλές το κολύμπι εδώ;','ine asfales to kolibi edo','Sport','334')");
	tx.executeSql("INSERT "+inf+" (193,'Is there a swimming pool here?','Υπάρχει καμιά πισίνα εδώ;','iparhi kamia pisina edo','Sport','333')");
	tx.executeSql("INSERT "+inf+" (192,'How deep is the water here?','Πόσο βαθύ είναι το νερό εδώ;','poso vathi ine to nero edo','Sport','332')");
	tx.executeSql("INSERT "+inf+" (191,'How do I get to the beach?','Πως μπορώ να πάω στην παραλία;','pos boro na pao stin paralia','Sport','342')");
	
	tx.executeSql("INSERT "+sf+"(1419,200,'sport')");
	tx.executeSql("INSERT "+sf+"(1418,199,'sport')");
	tx.executeSql("INSERT "+sf+"(1417,198,'sport')");
	tx.executeSql("INSERT "+sf+"(1416,197,'sport')");
	tx.executeSql("INSERT "+sf+"(1415,196,'sport')");
	tx.executeSql("INSERT "+sf+"(1414,195,'sport')");
	tx.executeSql("INSERT "+sf+"(1413,194,'sport')");
	tx.executeSql("INSERT "+sf+"(1412,193,'sport')");
	tx.executeSql("INSERT "+sf+"(1411,192,'sport')");
	tx.executeSql("INSERT "+sf+"(1410,191,'sport')");
	tx.executeSql("INSERT "+sf+"(296,200,'fish')");
	tx.executeSql("INSERT "+sf+"(295,199,'hire')");
	tx.executeSql("INSERT "+sf+"(294,198,'lesson')");
	tx.executeSql("INSERT "+sf+"(293,198,'water-skiing ')");
	tx.executeSql("INSERT "+sf+"(292,197,'camp')");
	tx.executeSql("INSERT "+sf+"(291,196,'cost')");
	tx.executeSql("INSERT "+sf+"(290,195,'licence')");
	tx.executeSql("INSERT "+sf+"(289,194,'swim')");
	tx.executeSql("INSERT "+sf+"(288,193,'swimming')");
	tx.executeSql("INSERT "+sf+"(287,193,'pool')");
	tx.executeSql("INSERT "+sf+"(286,192,'water')");
	tx.executeSql("INSERT "+sf+"(285,192,'deep')");
	tx.executeSql("INSERT "+sf+"(284,191,'beach')");
	
	tx.executeSql("INSERT "+inf+" (190,'I''d like highlights','Θα ήθελα να κάνω ανταύγειες','tha ithela na kano antavgies','Hairdresser','330')");
	tx.executeSql("INSERT "+inf+" (189,'I''d like a perm','Θα ήθελα μία περμανάντ','tha ithela mia permanant','Hairdresser','329')");
	tx.executeSql("INSERT "+inf+" (188,'I''d like a cut and blow-dry','Θα ήθελα ένα κούρεμα και χτένισμα','tha ithela ena kourema ke htenisma','Hairdresser','328')");
	tx.executeSql("INSERT "+inf+" (187,'Just a trim, please','Πάρτε τα μου λίγο, παρακαλώ','parte ta mou ligo, parakalo','Hairdresser','327')");
	tx.executeSql("INSERT "+inf+" (186,'I''d like to make an appointment','Θα ήθελα να κλείσω ένα ραντεβού','tha ithela na kliso ena randevou','Hairdresser','331')");
	
	
	tx.executeSql("INSERT "+sf+"(1408,190,'appointment')");
	tx.executeSql("INSERT "+sf+"(1407,190,'hair')");
	tx.executeSql("INSERT "+sf+"(1406,189,'appointment')");
	tx.executeSql("INSERT "+sf+"(1405,189,'hair')");
	tx.executeSql("INSERT "+sf+"(1404,188,'appointment')");
	tx.executeSql("INSERT "+sf+"(1403,188,'hair')");
	tx.executeSql("INSERT "+sf+"(1402,187,'appointment')");
	tx.executeSql("INSERT "+sf+"(1401,187,'hair')");
	tx.executeSql("INSERT "+sf+"(1400,186,'hair')");
	
	tx.executeSql("INSERT "+sf+"(283,190,'highlights')");
	tx.executeSql("INSERT "+sf+"(282,189,'perm')");
	tx.executeSql("INSERT "+sf+"(281,188,'blow-dry')");
	tx.executeSql("INSERT "+sf+"(280,188,'cut')");
	tx.executeSql("INSERT "+sf+"(279,187,'trim')");
	tx.executeSql("INSERT "+sf+"(278,186,'appointment')");
	
	tx.executeSql("INSERT "+inf+" (185,'Can you lower the price?','Μπορείς να κατεβάσεις την τιμή;','boris na katevasis tin timi','Shopping','325')");
	tx.executeSql("INSERT "+inf+" (184,'It''s faulty','Είναι ελαττωματικό','ine elatomatiko','Shopping','324')");
	tx.executeSql("INSERT "+inf+" (183,'I''ll come back later','Θα επιστρέψω αργότερα','tha epistrepso argotera','Shopping','323')");
	tx.executeSql("INSERT "+inf+" (182,'I''m just looking','Απλώς κοιτάζω','aplos kitazo','Shopping','322')");
	tx.executeSql("INSERT "+inf+" (181,'Where do I pay?','Πού πληρώνω;','pou plirono','Shopping','321')");
	tx.executeSql("INSERT "+inf+" (180,'Can I try it (them) on?','Μπορώ να το (τα) δοκιμάσω;','boro na to dokimaso','Shopping','320')");
	tx.executeSql("INSERT "+inf+" (179,'Can I have a bag, please?','Μου δίνετε μία σακούλα, παρακαλώ;','mou dinete mia sakula, parakalo','Shopping','319')");
	tx.executeSql("INSERT "+inf+" (178,'Can I have a receipt?','Μου δίνετε μία απόδειξη;','mou dinete mia apodixi','Shopping','318')");
	tx.executeSql("INSERT "+inf+" (177,'Could you wrap it for me?','Μου το τυλίγετε;','mou to tiliyete','Shopping','317')");
	tx.executeSql("INSERT "+inf+" (176,'Does it come in the other colours?','Το έχετε σε άλλα χρώματα;','to ehete se ala hromata','Shopping','316')");
	tx.executeSql("INSERT "+inf+" (175,'Have you anything smaller?','Έχετε κανένα μικρότερο;','ehete kanena mikrotero','Shopping','315')");
	tx.executeSql("INSERT "+inf+" (174,'Have you anything larger?','Έχετε κανένα μεγαλύτερο;','ehete kanena megalitero','Shopping','314')");
	tx.executeSql("INSERT "+inf+" (173,'Have you anything cheaper?','Έχετε τίποτα φθηνότερο;','ehete tipota fthinotero','Shopping','313')");
	tx.executeSql("INSERT "+inf+" (172,'I''d like to change this, please','Θα ήθελα να το αλλάξω αυτό, παρακαλώ','tha ithela na to alaxo afto, parakalo','Shopping','312')");
	tx.executeSql("INSERT "+inf+" (171,'Do you have any more of these?','Έχετε κι άλλα απ'' αυτά;','ehete ki ala apafta','Shopping','311')");
	tx.executeSql("INSERT "+inf+" (170,'Where is the … department?','Που είναι το τμήμα των…;','pou ine to tmima ton','Shopping','310')");
	tx.executeSql("INSERT "+inf+" (169,'How much is this?','Πόσο κάνει αυτό;','poso kani afto','Shopping','309')");
	tx.executeSql("INSERT "+inf+" (168,'Do you have…?','Έχετε…;','ehete','Shopping','308')");
	tx.executeSql("INSERT "+inf+" (167,'I''d like…','Θα ήθελα…','tha ithela','Shopping','326')");
	
	tx.executeSql("INSERT "+sf+"(1318,185,'shopping')");
	tx.executeSql("INSERT "+sf+"(1317,184,'shopping')");
	tx.executeSql("INSERT "+sf+"(1316,183,'shopping')");
	tx.executeSql("INSERT "+sf+"(1315,182,'shopping')");
	tx.executeSql("INSERT "+sf+"(1314,181,'shopping')");
	tx.executeSql("INSERT "+sf+"(1313,180,'shopping')");
	tx.executeSql("INSERT "+sf+"(1312,179,'shopping')");
	tx.executeSql("INSERT "+sf+"(1311,178,'shopping')");
	tx.executeSql("INSERT "+sf+"(1310,177,'shopping')");
	tx.executeSql("INSERT "+sf+"(1309,176,'shopping')");
	tx.executeSql("INSERT "+sf+"(1308,175,'shopping')");
	tx.executeSql("INSERT "+sf+"(1307,174,'shopping')");
	tx.executeSql("INSERT "+sf+"(1306,173,'shopping')");
	tx.executeSql("INSERT "+sf+"(1305,172,'shopping')");
	tx.executeSql("INSERT "+sf+"(1304,171,'shopping')");
	tx.executeSql("INSERT "+sf+"(1303,170,'shopping')");
	tx.executeSql("INSERT "+sf+"(1302,169,'shopping')");
	tx.executeSql("INSERT "+sf+"(1301,168,'shopping')");
	tx.executeSql("INSERT "+sf+"(1300,167,'shopping')");
	tx.executeSql("INSERT "+sf+"(277,185,'lower')");
	tx.executeSql("INSERT "+sf+"(276,185,'price')");
	tx.executeSql("INSERT "+sf+"(275,184,'faulty')");
	tx.executeSql("INSERT "+sf+"(274,183,'come')");
	tx.executeSql("INSERT "+sf+"(273,183,'later')");
	tx.executeSql("INSERT "+sf+"(272,182,'looking')");
	tx.executeSql("INSERT "+sf+"(271,181,'pay')");
	tx.executeSql("INSERT "+sf+"(270,180,'try')");
	tx.executeSql("INSERT "+sf+"(269,179,'bag')");
	tx.executeSql("INSERT "+sf+"(268,178,'receipt')");
	tx.executeSql("INSERT "+sf+"(267,177,'wrap')");
	tx.executeSql("INSERT "+sf+"(266,176,'colour')");
	tx.executeSql("INSERT "+sf+"(265,176,'colours')");
	tx.executeSql("INSERT "+sf+"(264,175,'smaller')");
	tx.executeSql("INSERT "+sf+"(263,174,'larger')");
	tx.executeSql("INSERT "+sf+"(262,173,'cheaper')");
	tx.executeSql("INSERT "+sf+"(261,172,'change')");
	tx.executeSql("INSERT "+sf+"(260,171,'more')");
	tx.executeSql("INSERT "+sf+"(259,170,'department')");
	tx.executeSql("INSERT "+sf+"(258,169,'much')");
	tx.executeSql("INSERT "+sf+"(257,168,'have')");
	tx.executeSql("INSERT "+sf+"(256,167,'like')");
	
	tx.executeSql("INSERT "+inf+" (166,'What''s in that dish?','Τι περιέχει αυτό το φαγητό;','ti periehi afto to fagito','Eating Out','307')");
	tx.executeSql("INSERT "+inf+" (165,'Are you still serving food?','Σερβίρετε ακόμη φαγητό;','servirete akomi fagito','Eating Out','306')");
	tx.executeSql("INSERT "+inf+" (164,'Where would you go for a cheap meal?','Που θα πήγαινες για φθηνό γεύμα;','pou tha pigenes ya fthino yevma','Eating Out','305')");
	tx.executeSql("INSERT "+inf+" (163,'My compliments to the chef!','Τα συγχαρητήριά μου στο μάγειρα','ta sinharitiria mou sto mayira','Eating Out','304')");
	tx.executeSql("INSERT "+inf+" (162,'The meal was very good, thank you','Το φαγητό ήταν πολύ καλό, ευχαριστούμε','to fagito itan poli kalo, efharistoume','Eating Out','303')");
	tx.executeSql("INSERT "+inf+" (161,'May we have some more…?','Μπορούμε να έχουμε ακόμη λίγο…;','boroume na ehoume akomi ligo','Eating Out','302')");
	tx.executeSql("INSERT "+inf+" (160,'I didn''t order this','Δεν παράγγειλα αυτό','den paragila afto','Eating Out','301')");
	tx.executeSql("INSERT "+inf+" (159,'I only want a snack','Θέλω κάτι ελαφρύ','thelo kati elafri','Eating Out','300')");
	tx.executeSql("INSERT "+inf+" (158,'Can we have the bill, please?','Μας φέρνετε το λογαριασμό, παρακαλώ;','mas fernete to logariasmo, parakalo','Eating Out','299')");
	tx.executeSql("INSERT "+inf+" (157,'Waiter!','Γκαρσόν!','garson','Eating Out','298')");
	tx.executeSql("INSERT "+inf+" (156,'A kilo/ half a kilo of retsina','Ένα κιλό/ μισό κιλό ρετσίνα','ena kilo/ miso kilo retsina','Eating Out','297')");
	tx.executeSql("INSERT "+inf+" (155,'Just a cup of cofee, please','Μόνο ένα φλυτζάνι καφέ, παρακαλώ','mono ena flitzani kafe, parakalo','Eating Out','296-2')");
	tx.executeSql("INSERT "+inf+" (154,'I''d like…','Θα ήθελα…','tha ithela','Eating Out','296-1')");
	tx.executeSql("INSERT "+inf+" (153,'Is this suitable for vegetarians?','Είναι για χορτοφάγους;','ine ya hortofagous','Eating Out','295')");
	tx.executeSql("INSERT "+inf+" (152,'What would you recommend?','Τι θα προτείνατε;','ti tha protinate','Eating Out','294')");
	tx.executeSql("INSERT "+inf+" (151,'Is there a highchair?','Υπάρχει παιδική καρέκλα;','iparhi pediki karekla','Eating Out','293')");
	tx.executeSql("INSERT "+inf+" (150,'Can we see the wine list?','Μπορούμε να δούμε τον κατάλογο των κρασιών;','boroume na dume ton katalogo ton krasion','Eating Out','292')");
	tx.executeSql("INSERT "+inf+" (149,'Can we see the menu?','Μπορούμε να δούμε το μενού;','boroume na dume to menu','Eating Out','291')");
	tx.executeSql("INSERT "+inf+" (148,'A table for 1/2/3, please','Ένα τραπέζι για ένα/ δύο/ τρία άτομα, παρακαλώ','ena trapezi ya ena/ dio/ tria atoma parakalo','Eating Out','290')");
	
	tx.executeSql("INSERT "+sf+"(1237,166,'eat')");
	tx.executeSql("INSERT "+sf+"(1236,166,'restaurant')");
	tx.executeSql("INSERT "+sf+"(1235,165,'eat')");
	tx.executeSql("INSERT "+sf+"(1234,165,'restaurant')");
	tx.executeSql("INSERT "+sf+"(1233,164,'eat')");
	tx.executeSql("INSERT "+sf+"(1232,164,'restaurant')");
	tx.executeSql("INSERT "+sf+"(1231,163,'eat')");
	tx.executeSql("INSERT "+sf+"(1230,163,'restaurant')");
	tx.executeSql("INSERT "+sf+"(1229,162,'eat')");
	tx.executeSql("INSERT "+sf+"(1228,162,'restaurant')");
	tx.executeSql("INSERT "+sf+"(1227,161,'eat')");
	tx.executeSql("INSERT "+sf+"(1226,161,'restaurant')");
	tx.executeSql("INSERT "+sf+"(1225,160,'eat')");
	tx.executeSql("INSERT "+sf+"(1224,160,'restaurant')");
	tx.executeSql("INSERT "+sf+"(1223,159,'eat')");
	tx.executeSql("INSERT "+sf+"(1222,159,'restaurant')");
	tx.executeSql("INSERT "+sf+"(1221,158,'eat')");
	tx.executeSql("INSERT "+sf+"(1220,158,'restaurant')");
	tx.executeSql("INSERT "+sf+"(1219,157,'eat')");
	tx.executeSql("INSERT "+sf+"(1218,157,'restaurant')");
	tx.executeSql("INSERT "+sf+"(1217,156,'eat')");
	tx.executeSql("INSERT "+sf+"(1216,156,'restaurant')");
	tx.executeSql("INSERT "+sf+"(1215,155,'eat')");
	tx.executeSql("INSERT "+sf+"(1214,155,'restaurant')");
	tx.executeSql("INSERT "+sf+"(1213,154,'eat')");
	tx.executeSql("INSERT "+sf+"(1212,154,'restaurant')");
	tx.executeSql("INSERT "+sf+"(1211,153,'eat')");
	tx.executeSql("INSERT "+sf+"(1210,153,'restaurant')");
	tx.executeSql("INSERT "+sf+"(1209,152,'eat')");
	tx.executeSql("INSERT "+sf+"(1208,152,'restaurant')");
	tx.executeSql("INSERT "+sf+"(1207,151,'eat')");
	tx.executeSql("INSERT "+sf+"(1206,151,'restaurant')");
	tx.executeSql("INSERT "+sf+"(1205,150,'eat')");
	tx.executeSql("INSERT "+sf+"(1204,150,'restaurant')");
	tx.executeSql("INSERT "+sf+"(1203,149,'eat')");
	tx.executeSql("INSERT "+sf+"(1202,149,'restaurant')");
	tx.executeSql("INSERT "+sf+"(1201,148,'eat')");
	tx.executeSql("INSERT "+sf+"(1200,148,'restaurant')");

	tx.executeSql("INSERT "+sf+"(255,166,'dish')");
	tx.executeSql("INSERT "+sf+"(254,165,'food')");
	tx.executeSql("INSERT "+sf+"(253,165,'serve')");
	tx.executeSql("INSERT "+sf+"(252,164,'cheap')");
	tx.executeSql("INSERT "+sf+"(251,164,'meal')");
	tx.executeSql("INSERT "+sf+"(250,163,'compliment')");
	tx.executeSql("INSERT "+sf+"(249,163,'chef')");
	tx.executeSql("INSERT "+sf+"(248,162,'meal')");
	tx.executeSql("INSERT "+sf+"(247,161,'more')");
	tx.executeSql("INSERT "+sf+"(246,160,'order')");
	tx.executeSql("INSERT "+sf+"(245,159,'snack')");
	tx.executeSql("INSERT "+sf+"(244,158,'bill')");
	tx.executeSql("INSERT "+sf+"(243,157,'waiter')");
	tx.executeSql("INSERT "+sf+"(242,156,'kilo')");
	tx.executeSql("INSERT "+sf+"(241,156,'retsina')");
	tx.executeSql("INSERT "+sf+"(240,155,'cup')");
	tx.executeSql("INSERT "+sf+"(239,155,'coffee')");
	tx.executeSql("INSERT "+sf+"(238,154,'like')");
	tx.executeSql("INSERT "+sf+"(237,153,'vegeterians')");
	tx.executeSql("INSERT "+sf+"(236,153,'vegeterian')");
	tx.executeSql("INSERT "+sf+"(235,152,'recommend')");
	tx.executeSql("INSERT "+sf+"(234,151,'highchair')");
	tx.executeSql("INSERT "+sf+"(233,150,'list')");
	tx.executeSql("INSERT "+sf+"(232,150,'wine')");
	tx.executeSql("INSERT "+sf+"(231,149,'menu')");
	tx.executeSql("INSERT "+sf+"(230,148,'table')");
	
	tx.executeSql("INSERT "+inf+" (147,'I''d like a taxi at…','Θα ήθελα ένα ταξί στις…','tha ithela ena taxi stis','Taxi Travel','289')");
	tx.executeSql("INSERT "+inf+" (146,'How much do you charge for the luggage?','Πόσο χρεώνεις τις αποσκευές;','poso hreonis tis aposkeves','Taxi Travel','288')");
	tx.executeSql("INSERT "+inf+" (145,'How much is it to…?','Πόσο κάνει για…;','poso kani ya…','Taxi Travel','287')");
	tx.executeSql("INSERT "+inf+" (144,'Please the meter on','Παρακαλώ βάλε το ταξίμετρο','parakalo vale to taximetro','Taxi Travel','286')");
	tx.executeSql("INSERT "+inf+" (143,'Do I need to change?','Χρειάζεται να αλλάξω;','hriazete na alaxo','Taxi Travel','285')");
	tx.executeSql("INSERT "+inf+" (142,'Where''s the nearest metro station?','Που είναι ο πλησιέστερος σταθμός του μετρο;','pou ine o plisiesteros stathmos tou metro','Taxi Travel','284')");
	tx.executeSql("INSERT "+inf+" (141,'Which lines goes to the port?','Ποια γραμμή πηγαίνει στο λιμάνι;','pia grami pigeni sto limani','Taxi Travel','283')");
	tx.executeSql("INSERT "+inf+" (140,'A bunch of (10) tickets, please','Μία δέσμη από (δέκα) εισιτήρια, παρακαλώ','mia desmi apo (deka) isitiria, parakalo','Taxi Travel','282')");
	tx.executeSql("INSERT "+inf+" (139,'When does the last bus leave?','Πότε φεύγει το τελευταίο λεωφορείο;','pote fevyi to telefteo leoforio','Taxi Travel','281')");
	tx.executeSql("INSERT "+inf+" (138,'Could you help me get a ticket?','Μπορειτε να με βοηθήσετε να βγάλω ένα εισιτήριο;','borite na me voithisete na bgalo ena isitirio','Taxi Travel','280')");
	tx.executeSql("INSERT "+inf+" (137,'Please open/ close the window','Παρακαλώ, ανοίγετε/ κλείνετε το παράθυρο;','parakalo, aniyete/ klinete to parathiro','Taxi Travel','279')");
	tx.executeSql("INSERT "+inf+" (136,'Where can I buy a ticket?','Από πού μπορώ ν'' αγοράσω ένα εισιτήριο;','apo pou boro nagoraso ena isitirio','Taxi Travel','278')");
	tx.executeSql("INSERT "+inf+" (135,'Do you go near…?','Πάτε κοντά στο…;','pate konta sto','Taxi Travel','277')");
	tx.executeSql("INSERT "+inf+" (134,'I want to go to…','Θέλω να πάω στο…','thelo na pao sto','Taxi Travel','276')");
	tx.executeSql("INSERT "+inf+" (133,'Is it very far?','Είναι πολύ μακριά;','ine poli makria ','Taxi Travel','275')");
	tx.executeSql("INSERT "+inf+" (132,'How do you get to…?','Πως πάμε στο…;','pos pame sto','Taxi Travel','274')");
	tx.executeSql("INSERT "+inf+" (131,'Do I get off here?','Πρέπει να κατέβω εδώ;','prepi na katevo edo','Taxi Travel','273')");
	tx.executeSql("INSERT "+inf+" (130,'Would you tell me when we get to…?','Μπορείτε να μου πείτε πότε φτάνουμε στο…;','borite na mou pite pote ftanoume sto','Taxi Travel','272')");
	tx.executeSql("INSERT "+inf+" (129,'How often do the buses to… run?','Πόσο συχνά έχει λεωφορείο για…;','poso sihna ehi leoforio ya','Taxi Travel','271')");
	tx.executeSql("INSERT "+inf+" (128,'Which buses go to…?','Ποια λεωφορεία πάνε στο…;','pia leoforia pane sto','Taxi Travel','270')");
	tx.executeSql("INSERT "+inf+" (127,'Where is the bus stop?','Που είναι η στάση;','pou ine i stasi','Taxi Travel','269')");
	tx.executeSql("INSERT "+inf+" (126,'Where is the bus station?','Που είναι ο σταθμός των υπεραστικών λεωφορείων;','pou ine o stathmos ton iperastikon leoforion','Taxi Travel','268')");
	tx.executeSql("INSERT "+inf+" (125,'Where is the nearest underground station?','Που είναι ο πλησιέστερος σταθμός του ηλεκτρικού;','pou ine o plisiesteros stathmos tou ilektrikou','Taxi Travel','267')");
	
	tx.executeSql("INSERT "+sf+"(229,147,'taxi')");
	tx.executeSql("INSERT "+sf+"(228,146,'charge')");
	tx.executeSql("INSERT "+sf+"(227,146,'luggage')");
	tx.executeSql("INSERT "+sf+"(226,145,'much')");
	tx.executeSql("INSERT "+sf+"(225,144,'meter')");
	tx.executeSql("INSERT "+sf+"(224,143,'change')");
	tx.executeSql("INSERT "+sf+"(223,142,'metro')");
	tx.executeSql("INSERT "+sf+"(221,142,'station')");
	tx.executeSql("INSERT "+sf+"(220,141,'port')");
	tx.executeSql("INSERT "+sf+"(219,141,'line')");
	tx.executeSql("INSERT "+sf+"(218,140,'bunch')");
	tx.executeSql("INSERT "+sf+"(217,140,'ticket')");
	tx.executeSql("INSERT "+sf+"(216,139,'bus')");
	tx.executeSql("INSERT "+sf+"(215,138,'ticket')");
	tx.executeSql("INSERT "+sf+"(214,137,'window')");
	tx.executeSql("INSERT "+sf+"(213,136,'ticket')");
	tx.executeSql("INSERT "+sf+"(212,135,'near')");
	tx.executeSql("INSERT "+sf+"(211,134,'go')");
	tx.executeSql("INSERT "+sf+"(210,133,'far')");
	tx.executeSql("INSERT "+sf+"(209,132,'get')");
	tx.executeSql("INSERT "+sf+"(208,131,'get')");
	tx.executeSql("INSERT "+sf+"(207,130,'get')");
	tx.executeSql("INSERT "+sf+"(206,129,'bus')");
	tx.executeSql("INSERT "+sf+"(205,128,'bus')");
	tx.executeSql("INSERT "+sf+"(204,127,'stop')");
	tx.executeSql("INSERT "+sf+"(203,127,'bus')");
	tx.executeSql("INSERT "+sf+"(202,126,'bus')");
	tx.executeSql("INSERT "+sf+"(201,126,'station')");
	tx.executeSql("INSERT "+sf+"(200,125,'station')");
	tx.executeSql("INSERT "+sf+"(199,125,'underground')");
	
	tx.executeSql("INSERT "+inf+" (124,'That''s my seat','Αυτή η θέση είναι δική μου','afti i thesi ine diki mou','Air Travel','266')");
	tx.executeSql("INSERT "+inf+" (123,'Is this seat free?','Είναι αυτή η θέση ελεύθερη;','ine afti i thesi eleftheri','Air Travel','264')");
	tx.executeSql("INSERT "+inf+" (122,'How long will it be delayed?','Πόση ώρα θα καθυστερήσει;','posi ora tha kathisterisi','Air Travel','263')");
	tx.executeSql("INSERT "+inf+" (121,'I do not feel very well','Δεν αισθάνομαι καλά','den esthanome kala','Air Travel','262')");
	tx.executeSql("INSERT "+inf+" (120,'May I smoke now?','Επιτρέπετε να καπνίσω τώρα;','epitrepete na kapniso tora','Air Travel','261')");
	tx.executeSql("INSERT "+inf+" (119,'When do we arrive in…?','Πότε φτάνουμε;','pote ftanume','Air Travel','260')");
	tx.executeSql("INSERT "+inf+" (118,'Is this the right gate for the… flight?','Αυτή είναι η σωστή έξοδος για την πτήση;','afti ine i sosti exodos ya tin ptisi','Air Travel','259')");
	tx.executeSql("INSERT "+inf+" (117,'How long will the flight be delayed?','Πόσο θα καθυστερήσει η πτήση;','poso tha kathisterisi i ptisi','Air Travel','258')");
	tx.executeSql("INSERT "+inf+" (116,'I''d like a window seat, please','Θέλω μία θεση με παράθυρο, παρακαλώ','thelo mia thesi me parathiro, parakalo','Air Travel','257')");
	tx.executeSql("INSERT "+inf+" (115,'I''d like a non-smoking seat, please','Θέλω μία θέση στους μη καπνίζοντες, παρακαλώ','thelo mia thesi stous mi kapnizontes, parakalo','Air Travel','256')");
	tx.executeSql("INSERT "+inf+" (114,'I''d like a single/ return ticket to…','Θα ήθελα ένα απλό/ μετ'' επιστροφής εισιτήριο για…','tha ithela ena aplo/met epistrofis isitirio ya','Air Travel','255_1')");
	tx.executeSql("INSERT "+inf+" (113,'When do I have to check in?','Πότε πρέπει να δώσω τις αποσκευές μου;','pote prepi na doso tis aposkeves mou','Air Travel','254')");
	tx.executeSql("INSERT "+inf+" (112,'Do I have to change planes?','Πρέπει ν'' αλλάξω αεροπλάνο;','prepi nalaxo aeroplano','Air Travel','253')");
	tx.executeSql("INSERT "+inf+" (111,'Is it a direct flight?','Υπάρχει κατευθείαν πτήση;','iparhi katefthian ptisi','Air Travel','252')");
	tx.executeSql("INSERT "+inf+" (110,'What time does the flight to… leave?','Τι ώρα φεύγει η πτήση για…;','ti ora fevyi i ptisi ya','Air Travel','251')");
	tx.executeSql("INSERT "+inf+" (109,'When is there a flight to…?','Πότε έχει πτήση για…;','pote ehi ptisi ya','Air Travel','250')");
	
	tx.executeSql("INSERT "+sf+"(1116,124,'flight')");
	tx.executeSql("INSERT "+sf+"(1115,123,'flight')");
	tx.executeSql("INSERT "+sf+"(1114,122,'flight')");
	tx.executeSql("INSERT "+sf+"(1113,121,'flight')");
	tx.executeSql("INSERT "+sf+"(1112,120,'flight')");
	tx.executeSql("INSERT "+sf+"(1111,119,'flight')");
	tx.executeSql("INSERT "+sf+"(1110,118,'flight')");
	tx.executeSql("INSERT "+sf+"(1109,117,'flight')");
	tx.executeSql("INSERT "+sf+"(1108,116,'flight')");
	tx.executeSql("INSERT "+sf+"(1107,115,'flight')");
	tx.executeSql("INSERT "+sf+"(1106,114,'flight')");
	tx.executeSql("INSERT "+sf+"(1105,113,'flight')");
	tx.executeSql("INSERT "+sf+"(1104,112,'flight')");
	tx.executeSql("INSERT "+sf+"(1103,111,'flight')");
	tx.executeSql("INSERT "+sf+"(1102,110,'flight')");
	tx.executeSql("INSERT "+sf+"(1101,109,'flight')");
	
	tx.executeSql("INSERT "+sf+"(198,124,'seat')");
	tx.executeSql("INSERT "+sf+"(197,123,'free')");
	tx.executeSql("INSERT "+sf+"(196,123,'seat')");
	tx.executeSql("INSERT "+sf+"(195,122,'delay')");
	tx.executeSql("INSERT "+sf+"(194,122,'long')");
	tx.executeSql("INSERT "+sf+"(193,121,'well')");
	tx.executeSql("INSERT "+sf+"(192,120,'smoke')");
	tx.executeSql("INSERT "+sf+"(191,119,'arrive')");
	tx.executeSql("INSERT "+sf+"(190,118,'flight')");
	tx.executeSql("INSERT "+sf+"(189,118,'gate')");
	tx.executeSql("INSERT "+sf+"(188,117,'delay')");
	tx.executeSql("INSERT "+sf+"(187,117,'flight')");
	tx.executeSql("INSERT "+sf+"(186,116,'seat')");
	tx.executeSql("INSERT "+sf+"(185,116,'window')");
	tx.executeSql("INSERT "+sf+"(184,115,'non-smoking')");
	tx.executeSql("INSERT "+sf+"(183,115,'seat')");
	tx.executeSql("INSERT "+sf+"(182,114,'ticket')");
	tx.executeSql("INSERT "+sf+"(181,113,'check')");
	tx.executeSql("INSERT "+sf+"(180,112,'planes')");
	tx.executeSql("INSERT "+sf+"(179,111,'flight')");
	tx.executeSql("INSERT "+sf+"(178,110,'flight')");
	tx.executeSql("INSERT "+sf+"(177,109,'flight')");
	
	tx.executeSql("INSERT "+inf+" (108,'What island is this?','Ποιο νησί είναι αυτό;','pio nisi ine afto','Rail Boat Travel','249')");
	tx.executeSql("INSERT "+inf+" (107,'Can I have the ferry timetable?','Μπορώ να έχω το πρόγραμμα του φέρι;','boro nao to programa tou feri','Rail Boat Travel','248')");
	tx.executeSql("INSERT "+inf+" (106,'Where can we hire an uncrewed boat?','Που μπορώ να νοικιάσω μονο μια βάρκα;','pou boro na nikiaso mono mia varka','Rail Boat Travel','247')");
	tx.executeSql("INSERT "+inf+" (105,'Is there a restaurant car on this train?','Υπάρχει βαγόνι εστιατορίου σ'' αυτό το τραίνο;','iparxei vagoni estiatoriou se afto to treno','Rail Boat Travel','245')");
	tx.executeSql("INSERT "+inf+" (104,'Do we stop at…?','Σταματάμε στη…;','stamatame sti','Rail Boat Travel','244')");
	tx.executeSql("INSERT "+inf+" (103,'When do we arrive in…?','Πότε φτάνουμε στη…;','pote ftanoume sti','Rail Boat Travel','243')");
	tx.executeSql("INSERT "+inf+" (102,'May I open/ close the window?','Μπορώ ν'' ανοίξω/ κλείσω το παράθυρο;','boro nanixo/ kliso to parathiro','Rail Boat Travel','242')");
	tx.executeSql("INSERT "+inf+" (101,'I have reserved this seat','Έχω κλείσει αυτή τη θέση','eho klisi afti ti thesi','Rail Boat Travel','241')");
	tx.executeSql("INSERT "+inf+" (100,'This seat is taken','Αυτή η θέση είναι πιασμένη','afti i thesi ine piasmeni','Rail Boat Travel','240')");
	tx.executeSql("INSERT "+inf+" (99,'Is this seat free?','Είναι ελεύθερη αυτή η θέση;','ine eleftheri afti i thesi','Rail Boat Travel','239')");
	tx.executeSql("INSERT "+inf+" (98,'Is this a non- smoking compartment?','Είναι για τους μη καπνίζοντες;','ine ya tous mi kapnizondes','Rail Boat Travel','238')");
	tx.executeSql("INSERT "+inf+" (97,'Could you help me with my luggage, please?','Μπορείτε να με βοηθήσετε με τις αποσκευές μου, παρακαλώ;','borite na me voithisete me tis aposkeves mou','Rail Boat Travel','237')");
	tx.executeSql("INSERT "+inf+" (96,'Is the boat late?','Έχει καθυστέρηση το πλοίο;','ehi kathisterisi to plio','Rail Boat Travel','236')");
	tx.executeSql("INSERT "+inf+" (95,'Which platform for the … train?','Σε ποια πλατφόρμα για το τραίνο προς…;','se pia platforma ya to treno pros','Rail Boat Travel','235')");
	tx.executeSql("INSERT "+inf+" (94,'Is this the right platform for the... train?','Αυτή είναι η σωστή πλατφόρμα για το τραίνο προς…;','afti ine i sosti platforma ya to treno pros','Rail Boat Travel','234')");
	tx.executeSql("INSERT "+inf+" (93,'Is there a car ferry to…?','Υπάρχει φέρρυ-μπωτ για…;','iparhi feri-bot ya','Rail Boat Travel','231')");
	tx.executeSql("INSERT "+inf+" (92,'Is this the right boat for…?','Αυτό είναι το πλοίο για…;','afto ine to plio ya','Rail Boat Travel','230')");
	tx.executeSql("INSERT "+inf+" (91,'I''d like to reserve a seat','Θέλω να κλείσω μία θέση','thelo na kliso mia thesi','Rail Boat Travel','229')");
	tx.executeSql("INSERT "+inf+" (90,'A single/ return ticket to…, please','Ένα απλό/ μετ''  επιστροφής εισιτήριο για… παρακαλώ','metepistrofis isitirio ya… parakalo','Rail Boat Travel','228')");
	tx.executeSql("INSERT "+inf+" (89,'How long does it take to get to…?','Πόσες ώρες κάνει να φθάσει…;','poses ores kani na ftasi','Rail Boat Travel','227')");
	tx.executeSql("INSERT "+inf+" (88,'Does the boat/ train stop at…?','Σταματάει στη…;','stamatai sti','Rail Boat Travel','226')");
	tx.executeSql("INSERT "+inf+" (87,'Do I have to change?','Πρέπει ν'' αλλάξω;','prepi nalaxo','Rail Boat Travel','225')");
	tx.executeSql("INSERT "+inf+" (86,'Is there a reduction for children?','Υπάρχει μειωμένο εισιτήριο για παιδιά;','iparhi miomeno isitirio ya pedia','Rail Boat Travel','224')");
	tx.executeSql("INSERT "+inf+" (85,'What is the fare to…?','Πόσο κάνει το εισιτήριο για…;','poso kani to isitirio ya','Rail Boat Travel','223')");
	tx.executeSql("INSERT "+inf+" (84,'When is the next/ first/ last boat to…?','Πότε είναι το επόμενο/ πρώτο/ τελευταίο πλοίο για…;','pote ine to epomeno/ proto/ telefteo plio ya','Rail Boat Travel','222')");
	tx.executeSql("INSERT "+inf+" (83,'When does the train from… arrive?','Πότε έρχεται το τραίνο από…;','pote erhete to treno apo','Rail Boat Travel','221')");
	tx.executeSql("INSERT "+inf+" (82,'When does the boat for… leave?','Πότε φεύγει το πλοίο για…;','pote fev-yi to plio ya','Rail Boat Travel','220')");
	
	tx.executeSql("INSERT "+sf+"(176,97,'luggage')");
	tx.executeSql("INSERT "+sf+"(175,88,'train')");
	tx.executeSql("INSERT "+sf+"(174,108,'island')");
	tx.executeSql("INSERT "+sf+"(173,107,'timetable')");
	tx.executeSql("INSERT "+sf+"(172,107,'ferry')");
	tx.executeSql("INSERT "+sf+"(171,106,'boat')");
	tx.executeSql("INSERT "+sf+"(170,106,'hire')");
	tx.executeSql("INSERT "+sf+"(169,105,'train')");
	tx.executeSql("INSERT "+sf+"(168,105,'restaurant')");
	tx.executeSql("INSERT "+sf+"(167,104,'stop')");
	tx.executeSql("INSERT "+sf+"(166,103,'arrive')");
	tx.executeSql("INSERT "+sf+"(165,102,'close')");
	tx.executeSql("INSERT "+sf+"(164,102,'open')");
	tx.executeSql("INSERT "+sf+"(163,102,'window')");
	tx.executeSql("INSERT "+sf+"(162,101,'reserved')");
	tx.executeSql("INSERT "+sf+"(161,101,'seat')");
	tx.executeSql("INSERT "+sf+"(160,100,'taken')");
	tx.executeSql("INSERT "+sf+"(159,100,'seat')");
	tx.executeSql("INSERT "+sf+"(158,99,'free')");
	tx.executeSql("INSERT "+sf+"(157,99,'seat')");
	tx.executeSql("INSERT "+sf+"(156,98,'non-smoking')");
	tx.executeSql("INSERT "+sf+"(155,98,'compartment')");
	tx.executeSql("INSERT "+sf+"(154,96,'late')");
	tx.executeSql("INSERT "+sf+"(153,96,'boat')");
	tx.executeSql("INSERT "+sf+"(152,95,'train')");
	tx.executeSql("INSERT "+sf+"(151,95,'platform')");
	tx.executeSql("INSERT "+sf+"(150,94,'train')");
	tx.executeSql("INSERT "+sf+"(149,94,'platform')");
	tx.executeSql("INSERT "+sf+"(148,93,'ferry')");
	tx.executeSql("INSERT "+sf+"(147,93,'car')");
	tx.executeSql("INSERT "+sf+"(146,92,'right')");
	tx.executeSql("INSERT "+sf+"(145,92,'boat')");
	tx.executeSql("INSERT "+sf+"(144,91,'reserve')");
	tx.executeSql("INSERT "+sf+"(143,91,'seat')");
	tx.executeSql("INSERT "+sf+"(142,90,'ticket')");
	tx.executeSql("INSERT "+sf+"(141,90,'return')");
	tx.executeSql("INSERT "+sf+"(140,90,'single')");
	tx.executeSql("INSERT "+sf+"(139,89,'long')");
	tx.executeSql("INSERT "+sf+"(138,88,'stop')");
	tx.executeSql("INSERT "+sf+"(137,88,'boat')");
	tx.executeSql("INSERT "+sf+"(136,87,'change')");
	tx.executeSql("INSERT "+sf+"(135,86,'children')");
	tx.executeSql("INSERT "+sf+"(134,86,'reduction')");
	tx.executeSql("INSERT "+sf+"(133,85,'fare')");
	tx.executeSql("INSERT "+sf+"(132,84,'last')");
	tx.executeSql("INSERT "+sf+"(131,84,'first')");
	tx.executeSql("INSERT "+sf+"(130,84,'next')");
	tx.executeSql("INSERT "+sf+"(129,83,'arrive')");
	tx.executeSql("INSERT "+sf+"(128,83,'train')");
	tx.executeSql("INSERT "+sf+"(127,82,'leave')");
	tx.executeSql("INSERT "+sf+"(126,82,'boat')");
	
	tx.executeSql("INSERT "+inf+" (81,'I'' d like to hire a car','Θέλω να νοικιάσω ένα αυτοκίνητο','thelo na nikiaso ena aftokinito','Driving','219')");
	tx.executeSql("INSERT "+inf+" (80,'Can I park here?','Μπορώ να παρκάρω εδώ;','boro na parkaro edo','Driving','218')");
	tx.executeSql("INSERT "+inf+" (79,'Where can I park?','Που μπορώ να παρκάρω;','pou boro na parkaro','Driving','217')");
	tx.executeSql("INSERT "+inf+" (78,'I need a new tyre','Χρειάζομαι καινούριο λάστιχο','hriazome kenourio lastixo','Driving','216')");
	tx.executeSql("INSERT "+inf+" (77,'The brakes are binding','Τα φρένα κολλάνε','ta frena kolane','Driving','215')");
	tx.executeSql("INSERT "+inf+" (76,'The engine is overheating','Η μηχανή υπερθερμαίνεται','i mihani iperthemenete','Driving','214')");
	tx.executeSql("INSERT "+inf+" (75,'There is something wrong with the engine','Κάτι δεν πάει καλά με τη μηχανή','kati den pai kala me ti mihani','Driving','213')");
	tx.executeSql("INSERT "+inf+" (74,'How long will it take?','Πόσο θα κάνει;','poso tha kani','Driving','212')");
	tx.executeSql("INSERT "+inf+" (73,'Can you repair the clutch?','Μου φτιάχνετε το ντεμπραγιάζ;','mou ftiahnete to debrayaz','Driving','211')");
	tx.executeSql("INSERT "+inf+" (72,'Do you do repairs?','Κάνετε επισκευές;','kanete episkeves','Driving','210')");
	tx.executeSql("INSERT "+inf+" (71,'Would you check the tyres, please?','Ελέγχετε τα λάστιχα, παρακαλώ;','elenhete ta lastiha, parakalo','Driving','209')");
	tx.executeSql("INSERT "+inf+" (70,'Where is the nearest gas station?','Πού είναι το πλησιέστερο βενζινάδικο;','pou ine to plisi-estero venzinadiko','Driving','208')");
	tx.executeSql("INSERT "+inf+" (69,'is this the road to…?','Αυτός είναι ο δρόμος για…','aftos ine o dromos ya','Driving','207')");
	tx.executeSql("INSERT "+inf+" (68,'How do I get to…?','Πως μπορώ να πάω…;','pos boro na pao','Driving','206')");
	tx.executeSql("INSERT "+inf+" (67,'I'' d like 10 litres of petrol','Θέλω δέκα λίτρα βενζίνη','thelo deka litra venzini','Driving','205')");
	tx.executeSql("INSERT "+inf+" (66,'Fill it up, please','Το γεμίζετε παρακαλώ;','to yemizete, parakalo','Driving','204')");
	tx.executeSql("INSERT "+inf+" (65,'I'' d like some oil/ water','Θέλω λάδι/ νερό','thelo ladi/ nero','Driving','202-203')");
	tx.executeSql("INSERT "+inf+" (64,'I'' d like some petrol','Θέλω βενζίνη','thelo venzini','Driving','201')");
	
	
	tx.executeSql("INSERT "+sf+"(1042,81,'car')");
	tx.executeSql("INSERT "+sf+"(1041,80,'car')");
	tx.executeSql("INSERT "+sf+"(1040,79,'car')");
	tx.executeSql("INSERT "+sf+"(1039,78,'car')");
	tx.executeSql("INSERT "+sf+"(1038,77,'car')");
	tx.executeSql("INSERT "+sf+"(1037,76,'car')");
	tx.executeSql("INSERT "+sf+"(1036,75,'car')");
	tx.executeSql("INSERT "+sf+"(1035,74,'car')");
	tx.executeSql("INSERT "+sf+"(1034,73,'car')");
	tx.executeSql("INSERT "+sf+"(1033,72,'car')");
	tx.executeSql("INSERT "+sf+"(1032,71,'car')");
	tx.executeSql("INSERT "+sf+"(1031,70,'car')");
	tx.executeSql("INSERT "+sf+"(1030,69,'car')");
	tx.executeSql("INSERT "+sf+"(1029,68,'car')");
	tx.executeSql("INSERT "+sf+"(1028,67,'car')");
	tx.executeSql("INSERT "+sf+"(1027,66,'car')");
	tx.executeSql("INSERT "+sf+"(1026,65,'car')");
	tx.executeSql("INSERT "+sf+"(1025,64,'car')");
	
	tx.executeSql("INSERT "+sf+"(125,81,'hire')");
	tx.executeSql("INSERT "+sf+"(124,81,'car')");
	tx.executeSql("INSERT "+sf+"(123,80,'park')");
	tx.executeSql("INSERT "+sf+"(122,79,'park')");
	tx.executeSql("INSERT "+sf+"(121,78,'new')");
	tx.executeSql("INSERT "+sf+"(120,78,'tyre')");
	tx.executeSql("INSERT "+sf+"(119,77,'binding')");
	tx.executeSql("INSERT "+sf+"(118,77,'brakes')");
	tx.executeSql("INSERT "+sf+"(117,76,'overheating')");
	tx.executeSql("INSERT "+sf+"(116,76,'engine')");
	tx.executeSql("INSERT "+sf+"(115,75,'wrong')");
	tx.executeSql("INSERT "+sf+"(114,75,'engine')");
	tx.executeSql("INSERT "+sf+"(113,74,'long')");
	tx.executeSql("INSERT "+sf+"(112,73,'repair')");
	tx.executeSql("INSERT "+sf+"(111,73,'clutch')");
	tx.executeSql("INSERT "+sf+"(110,72,'repair')");
	tx.executeSql("INSERT "+sf+"(109,71,'check')");
	tx.executeSql("INSERT "+sf+"(108,71,'tyres')");
	tx.executeSql("INSERT "+sf+"(107,70,'station')");
	tx.executeSql("INSERT "+sf+"(106,70,'gas')");
	tx.executeSql("INSERT "+sf+"(105,70,'nearest')");
	tx.executeSql("INSERT "+sf+"(104,69,'road')");
	tx.executeSql("INSERT "+sf+"(103,68,'get')");
	tx.executeSql("INSERT "+sf+"(102,67,'petrol')");
	tx.executeSql("INSERT "+sf+"(101,67,'litres')");
	tx.executeSql("INSERT "+sf+"(100,66,'fill')");
	tx.executeSql("INSERT "+sf+"(99,65,'oil')");
	tx.executeSql("INSERT "+sf+"(98,65,'water')");
	tx.executeSql("INSERT "+sf+"(97,64,'petrol')");
	
	tx.executeSql("INSERT "+inf+" (63,'Is the water drinkable?','Είναι το νερό πόσιμο;','ine to nero posimo','Camping','200')");
	tx.executeSql("INSERT "+inf+" (62,'Is it coin-operated?','Λειτουργεί με κέρματα;','litourgi me kermata','Camping','199')");
	tx.executeSql("INSERT "+inf+" (61,'Is there drinking water here?','Υπάρχει πόσιμο νερό εδώ;','iparhi posimo nero edo','Camping','198')");
	tx.executeSql("INSERT "+inf+" (60,'where can I get…?','Που μπορώ να βρω… ;','pou boro na vro ','Camping','197')");
	tx.executeSql("INSERT "+inf+" (59,'Can I light a fire here?','Μπορώ ν'' ανάψω φωτιά εδώ;','boro na anapso fotia edo','Camping','196')");
	tx.executeSql("INSERT "+inf+" (58,'What facilities are there?','Τι ευκολίες υπάρχουν εκεί;','ti efkolies iparhoun eki','Camping','195')");
	tx.executeSql("INSERT "+inf+" (57,'What is the charge per night?','Πόσο στοιχίζει η διανυκτέρευση;','poso stihizi i dianikterefsi','Camping','194')");
	tx.executeSql("INSERT "+inf+" (56,'Where is the nearest campsite?','Που είναι το πλησιέστερο καμπινγκ;','pou ine to plisi-estero camping','Camping','193')");
	tx.executeSql("INSERT "+inf+" (55,'Can we park the caravan here?','Μπορούμε να παρκάρουμε το τροχόσπιτο εδώ;','boroume na parkaroume to trohospito edo','Camping','192')");
	tx.executeSql("INSERT "+inf+" (54,'Can I camp here?','Μπορώ να κατασκηνώσω εδώ;','boro na kataskinoso edo','Camping','191')");
	
	tx.executeSql("INSERT "+sf+"(96,63,'water')");
	tx.executeSql("INSERT "+sf+"(95,62,'coin')");
	tx.executeSql("INSERT "+sf+"(94,61,'drinking')");
	tx.executeSql("INSERT "+sf+"(93,61,'water')");
	tx.executeSql("INSERT "+sf+"(92,60,'get')");
	tx.executeSql("INSERT "+sf+"(91,59,'light')");
	tx.executeSql("INSERT "+sf+"(90,59,'fire')");
	tx.executeSql("INSERT "+sf+"(89,58,'facilities')");
	tx.executeSql("INSERT "+sf+"(88,57,'night')");
	tx.executeSql("INSERT "+sf+"(87,57,'charge')");
	tx.executeSql("INSERT "+sf+"(86,56,'nearest')");
	tx.executeSql("INSERT "+sf+"(85,56,'campsite')");
	tx.executeSql("INSERT "+sf+"(84,55,'park')");
	tx.executeSql("INSERT "+sf+"(83,55,'caravan')");
	tx.executeSql("INSERT "+sf+"(82,54,'camp')");
	
	tx.executeSql("INSERT "+inf+" (53,'Can you recommend another hotel?','Μπορείτε να μου προτείνετε κάποιο άλλο ξενοδοχείο;','borite na mou protinete kapio alo xenodohio','Hotels','190')");
	tx.executeSql("INSERT "+inf+" (52,'Can you get me a taxi?','Μου καλείτε ένα ταξί;','mou kalite ena taxi','Hotels','189')");
	tx.executeSql("INSERT "+inf+" (51,'Can I have the bill, please?','Το λογαριασμό παρακαλώ','to logariasmo parakalo','Hotels','188')");
	tx.executeSql("INSERT "+inf+" (50,'I''m leaving tomorrow','Φεύγω αύριο','fevgo avrio','Hotels','187')");
	tx.executeSql("INSERT "+inf+" (49,'My room number is…','Ο αριθμός του δωματίου μου είναι…','o arithmos tou domatiou mou ine ','Hotels','186')");
	tx.executeSql("INSERT "+inf+" (48,'I''ll be back at … o''clock','Θα επιστρέψω στις…','tha epistrepso stis…','Hotels','185')");
	tx.executeSql("INSERT "+inf+" (47,'Can I have breakfast in my room?','Μπορω να πάρω το πρωινό στο δωμάτιό μου;','boro na paro to proino sto domatio mou','Hotels','184')");
	tx.executeSql("INSERT "+inf+" (46,'Please call me at… o''clock','Παρακαλώ ειδοποιήστε με στις…','parakalo idopi-iste me stis…','Hotels','183')");
	tx.executeSql("INSERT "+inf+" (45,'Would you have my luggage brought up?','Θα μου φέρετε τις βαλίτσες μου;','tha mou ferete tis valitses mou','Hotels','182')");
	tx.executeSql("INSERT "+inf+" (44,'when is breakfast?','Πότε έχει πρωινό;','pote ehi proino','Hotels','181')");
	tx.executeSql("INSERT "+inf+" (43,'I don''t know yet how long I''ll stay','Δεν ξέρω ακόμα πόσο καιρό θα μείνω','den ksero akoma poso kero tha mino','Hotels','180')");
	tx.executeSql("INSERT "+inf+" (42,'What is the charge per night?','Πόσο στοιχίζει η διανυκτέρευση;','poso stihizi i dianikterefsi','Hotels','179')");
	tx.executeSql("INSERT "+inf+" (41,'I''d like a room for one night/three nights','Θα ήθελα ένα δωμάτιο για μία νύχτα/τρεις νύχτες','tha ithela ena domatio gia mia nixta/treis nixtes','Hotels','177-178')");
	tx.executeSql("INSERT "+inf+" (40,'Is there satelite TV in the rooms?','Τα δωμάτια έχουν δορυφορική τηλεόραση;','ta domatia ehoun doriforiki tileorasi','Hotels','176')");
	tx.executeSql("INSERT "+inf+" (39,'I''d like a room with a bathroom/balcony','Θα ήθελα ένα δωμάτιο με μπάνιο/μπαλκόνι','tha ithela ena domatio me banio/balkoni','Hotels','175')");
	tx.executeSql("INSERT "+inf+" (38,'I''d like a twin room','Θα ήθελα ένα δωμάτιο με δύο κρεβάτια','tha ithela ena domatio me dio krevatia','Hotels','174')");
	tx.executeSql("INSERT "+inf+" (37,'I''d like a double room','Θα ήθελα ένα δωμάτιο με διπλό κρεβάτι','tha ithela ena domatio me diplo krevati','Hotels','173')");
	tx.executeSql("INSERT "+inf+" (36,'I''d like a single room','Θα ήθελα ένα μονό δωμάτιο','tha ithela ena mono domatio','Hotels','172')");
	tx.executeSql("INSERT "+inf+" (35,'I have a reservation','Έχω κλείσει δωμάτιο','eho klisi domatio','Hotels','171')");
	tx.executeSql("INSERT "+inf+" (34,'Have you any vacancies?','Έχετε κενά δωμάτια;','ehete kena domatia','Hotels','170')");
	
	tx.executeSql("INSERT "+sf+"(531,53,'accomodation')");
	tx.executeSql("INSERT "+sf+"(530,53,'hotel')");
	tx.executeSql("INSERT "+sf+"(529,52,'accomodation')");
	tx.executeSql("INSERT "+sf+"(528,52,'hotel')");
	tx.executeSql("INSERT "+sf+"(527,51,'accomodation')");
	tx.executeSql("INSERT "+sf+"(526,51,'hotel')");
	tx.executeSql("INSERT "+sf+"(525,50,'accomodation')");
	tx.executeSql("INSERT "+sf+"(524,50,'hotel')");
	tx.executeSql("INSERT "+sf+"(523,49,'accomodation')");
	tx.executeSql("INSERT "+sf+"(522,49,'hotel')");
	tx.executeSql("INSERT "+sf+"(521,48,'accomodation')");
	tx.executeSql("INSERT "+sf+"(520,48,'hotel')");
	tx.executeSql("INSERT "+sf+"(519,47,'accomodation')");
	tx.executeSql("INSERT "+sf+"(518,47,'hotel')");
	tx.executeSql("INSERT "+sf+"(517,46,'accomodation')");
	tx.executeSql("INSERT "+sf+"(516,46,'hotel')");
	tx.executeSql("INSERT "+sf+"(515,45,'accomodation')");
	tx.executeSql("INSERT "+sf+"(514,45,'hotel')");
	tx.executeSql("INSERT "+sf+"(513,44,'accomodation')");
	tx.executeSql("INSERT "+sf+"(512,44,'hotel')");
	tx.executeSql("INSERT "+sf+"(511,43,'accomodation')");
	tx.executeSql("INSERT "+sf+"(510,43,'hotel')");
	tx.executeSql("INSERT "+sf+"(509,42,'accomodation')");
	tx.executeSql("INSERT "+sf+"(508,42,'hotel')");
	tx.executeSql("INSERT "+sf+"(507,41,'accomodation')");
	tx.executeSql("INSERT "+sf+"(506,41,'hotel')");
	tx.executeSql("INSERT "+sf+"(505,40,'accomodation')");
	tx.executeSql("INSERT "+sf+"(504,40,'hotel')");
	tx.executeSql("INSERT "+sf+"(503,39,'accomodation')");
	tx.executeSql("INSERT "+sf+"(502,39,'hotel')");
	tx.executeSql("INSERT "+sf+"(501,38,'accomodation')");
	tx.executeSql("INSERT "+sf+"(500,38,'hotel')");
	tx.executeSql("INSERT "+sf+"(532,37,'accomodation')");
	tx.executeSql("INSERT "+sf+"(499,37,'hotel')");
	tx.executeSql("INSERT "+sf+"(498,36,'accomodation')");
	tx.executeSql("INSERT "+sf+"(497,36,'hotel')");
	tx.executeSql("INSERT "+sf+"(496,35,'accomodation')");
	tx.executeSql("INSERT "+sf+"(495,35,'hotel')");
	tx.executeSql("INSERT "+sf+"(494,34,'accomodation')");
	tx.executeSql("INSERT "+sf+"(493,34,'hotel')");
	
	tx.executeSql("INSERT "+sf+"(81,53,'recommend')");
	tx.executeSql("INSERT "+sf+"(80,53,'hotel')");
	tx.executeSql("INSERT "+sf+"(79,52,'taxi')");
	tx.executeSql("INSERT "+sf+"(78,51,'bill')");
	tx.executeSql("INSERT "+sf+"(77,50,'leaving')");
	tx.executeSql("INSERT "+sf+"(76,50,'tomorrow')");
	tx.executeSql("INSERT "+sf+"(75,49,'number')");
	tx.executeSql("INSERT "+sf+"(74,49,'room')");
	tx.executeSql("INSERT "+sf+"(73,48,'o''clock')");
	tx.executeSql("INSERT "+sf+"(72,47,'room')");
	tx.executeSql("INSERT "+sf+"(71,47,'breakfast')");
	tx.executeSql("INSERT "+sf+"(70,46,'call')");
	tx.executeSql("INSERT "+sf+"(69,46,'o''clock')");
	tx.executeSql("INSERT "+sf+"(68,45,'luggage')");
	tx.executeSql("INSERT "+sf+"(67,44,'breakfast')");
	tx.executeSql("INSERT "+sf+"(66,43,'stay')");
	tx.executeSql("INSERT "+sf+"(65,43,'long')");
	tx.executeSql("INSERT "+sf+"(64,42,'night')");
	tx.executeSql("INSERT "+sf+"(63,42,'charge')");
	tx.executeSql("INSERT "+sf+"(62,41,'three')");
	tx.executeSql("INSERT "+sf+"(61,41,'one')");
	tx.executeSql("INSERT "+sf+"(60,41,'night')");
	tx.executeSql("INSERT "+sf+"(59,40,'room')");
	tx.executeSql("INSERT "+sf+"(58,40,'tv')");
	tx.executeSql("INSERT "+sf+"(57,40,'satellite')");
	tx.executeSql("INSERT "+sf+"(47,35,'reservation')");
	tx.executeSql("INSERT "+sf+"(48,36,'room')");
	tx.executeSql("INSERT "+sf+"(49,36,'single')");
	tx.executeSql("INSERT "+sf+"(50,37,'room')");
	tx.executeSql("INSERT "+sf+"(51,37,'double')");
	tx.executeSql("INSERT "+sf+"(52,38,'room')");
	tx.executeSql("INSERT "+sf+"(53,38,'twin')");
	tx.executeSql("INSERT "+sf+"(54,39,'room')");
	tx.executeSql("INSERT "+sf+"(55,39,'bathroom')");
	tx.executeSql("INSERT "+sf+"(56,39,'balcony')");
	tx.executeSql("INSERT "+sf+"(46,34,'vacancies')");
	
	tx.executeSql("INSERT "+inf+" (507,'Where can I get?','Που μπορώ να πάρω...;','pou boro na paro','Useful Everyday Phrases','161')");
	tx.executeSql("INSERT "+inf+" (506,'Is there...here?','Υπάρχει... εδώ;','iparxi... edo','Useful Everyday Phrases','159')");
	tx.executeSql("INSERT "+inf+" (505,'Do you speak German?','Μιλάτε Γερμανικά;','milate germanika','Useful Everyday Phrases','143')");
	tx.executeSql("INSERT "+inf+" (504,'Do you speak French?','Μιλάτε Γαλικά;','milate galika','Useful Everyday Phrases','142')");
	tx.executeSql("INSERT "+inf+" (31,'I would like','Θα ήθελα','tha ithela','Useful Everyday Phrases','158')");
	tx.executeSql("INSERT "+inf+" (30,'Can I have?','Μπορώ να έχω;','boro na eho','Useful Everyday Phrases','157')");
	tx.executeSql("INSERT "+inf+" (29,'Can you tell me?','Μου λέτε;','mou lete','Useful Everyday Phrases','156')");
    tx.executeSql("INSERT "+inf+" (28,'Goodbye','Αντίο','Andio','Useful Everyday Phrases','150')");
    tx.executeSql("INSERT "+inf+" (27,'I don''t understand','Δεν καταλαβαίνω','then katalaveno','Useful Everyday Phrases','140')");
	tx.executeSql("INSERT "+inf+" (26,'I can''t speak Greek','Δεν μιλάω ελληνικά','then milao elinika','Useful Everyday Phrases','144')");
	tx.executeSql("INSERT "+inf+" (25,'Do You Take Credit Cards?','Δέχεστε πιστωτικές κάρτες;','deheste pistotikes kartes','Useful Everyday Phrases','164')");
	tx.executeSql("INSERT "+inf+" (24,'I''m really sorry','Ειλικρινά, λυπάμαι','ilikrina, lipame','Useful Everyday Phrases','154')");
	tx.executeSql("INSERT "+inf+" (23,'Cheers!','Εις υγείαν!','is iyian','Useful Everyday Phrases','168')");
	tx.executeSql("INSERT "+inf+" (22,'Thank you','Ευχαριστώ','efharisto','Useful Everyday Phrases','137')");
	tx.executeSql("INSERT "+inf+" (21,'Good Morning','Καλημέρα','kalimera','Useful Everyday Phrases','147')");
	tx.executeSql("INSERT "+inf+" (20,'Good night','Καληνύχτα','kalinihta','Useful Everyday Phrases','149')");
	tx.executeSql("INSERT "+inf+" (19,'Good afternoon','Καλησπέρα','kalispera','Useful Everyday Phrases','148')");
	tx.executeSql("INSERT "+inf+" (18,'Do you speak English?','Μιλάτε Αγγλικά;','milate aglika','Useful Everyday Phrases','141')");
	tx.executeSql("INSERT "+inf+" (17,'Please write it down for me','Μου το γράφετε, παρακάλω;','mou to grafete, parakalo','Useful Everyday Phrases','146')");
	tx.executeSql("INSERT "+inf+" (16,'Can you help me?','Μπορείς να με βοηθήσεις;','mporis na me voithisis','Useful Everyday Phrases','155')");
	tx.executeSql("INSERT "+inf+" (15,'Can I pay by cheque?','Μπορώ να πληρώσω με επιταγή;','boro na pliroso me epitayi','Useful Everyday Phrases','165')");
	tx.executeSql("INSERT "+inf+" (14,'Yes','Ναι','ne','Useful Everyday Phrases','135')");
	tx.executeSql("INSERT "+inf+" (13,'No, thank you','Όχι, ευχαριστώ','ohi efharisto','Useful Everyday Phrases','138')");
	tx.executeSql("INSERT "+inf+" (12,'No','Όχι','ohi','Useful Everyday Phrases','136')");
	tx.executeSql("INSERT "+inf+" (11,'Please speak more slowly','Παρακαλώ μιλάτε πιο αργά;','parakalo, milate pio arga','Useful Everyday Phrases','145')");
	tx.executeSql("INSERT "+inf+" (10,'Please','Παρακαλώ','parakalo','Useful Everyday Phrases','139')");
	tx.executeSql("INSERT "+inf+" (9,'Go away!','Παράτα με!','paratame','Useful Everyday Phrases','169')");
	tx.executeSql("INSERT "+inf+" (8,'How much it is?','Πόσο κάνει;','poso kani','Useful Everyday Phrases','163')");
	tx.executeSql("INSERT "+inf+" (7,'Where are the toilets?','Που είναι οι τουαλέτες;','pou ine i toualetes','Useful Everyday Phrases','160')");
	tx.executeSql("INSERT "+inf+" (6,'I must go now','Πρέπει να πηγαίνω τώρα','prepi na piyeno tora','Useful Everyday Phrases','167')");
	tx.executeSql("INSERT "+inf+" (5,'Excuse me, please','Συγγνώμη, παρακαλώ','signomi, parakalo','Useful Everyday Phrases','152')");
	tx.executeSql("INSERT "+inf+" (4,'Sorry!','Συγγνώμη!','signomi','Useful Everyday Phrases','153')");
	tx.executeSql("INSERT "+inf+" (3,'How are you?','Τι κάνεις;','ti kanis','Useful Everyday Phrases','151')");
	tx.executeSql("INSERT "+inf+" (2,'What time is it?','Τι ώρα είναι;','ti ora ine','Useful Everyday Phrases','166')");
	tx.executeSql("INSERT "+inf+" (1,'Is there wheelchair access?','Υπάρχει πρόσβαση για αναπηρικό καροτσάκι;','iparhi prosvasi ya anapiriko karotsaki','Useful Everyday Phrases','162')");

	
	tx.executeSql("INSERT "+sf+"(1,1,'wheelchair')");
	tx.executeSql("INSERT "+sf+"(2,1,'access')");
	tx.executeSql("INSERT "+sf+"(3,2,'time')");
	tx.executeSql("INSERT "+sf+"(4,3,'how')");
	tx.executeSql("INSERT "+sf+"(5,3,'you')");
	tx.executeSql("INSERT "+sf+"(6,4,'sorry')");
	tx.executeSql("INSERT "+sf+"(7,5,'excuse')");
	tx.executeSql("INSERT "+sf+"(8,6,'go')");
	tx.executeSql("INSERT "+sf+"(9,7,'toilets')");
	tx.executeSql("INSERT "+sf+"(10,8,'much')");
	tx.executeSql("INSERT "+sf+"(11,9,'go')");
	tx.executeSql("INSERT "+sf+"(12,10,'please')");
	tx.executeSql("INSERT "+sf+"(13,11,'slowly')");
	tx.executeSql("INSERT "+sf+"(14,11,'speak')");
	tx.executeSql("INSERT "+sf+"(15,12,'no')");
	tx.executeSql("INSERT "+sf+"(16,13,'no')");
	tx.executeSql("INSERT "+sf+"(17,13,'thank')");
	tx.executeSql("INSERT "+sf+"(18,14,'yes')");
	tx.executeSql("INSERT "+sf+"(19,15,'cheque')");
	tx.executeSql("INSERT "+sf+"(20,15,'pay')");
	tx.executeSql("INSERT "+sf+"(21,16,'help')");
	tx.executeSql("INSERT "+sf+"(22,17,'write')");
	tx.executeSql("INSERT "+sf+"(23,18,'speak')");
	tx.executeSql("INSERT "+sf+"(24,18,'english')");
	tx.executeSql("INSERT "+sf+"(25,19,'good afternoon')");
	tx.executeSql("INSERT "+sf+"(26,19,'afternoon')");
	tx.executeSql("INSERT "+sf+"(27,20,'good night')");
	tx.executeSql("INSERT "+sf+"(28,20,'night')");
	tx.executeSql("INSERT "+sf+"(29,21,'good morning')");
	tx.executeSql("INSERT "+sf+"(30,21,'morning')");
	tx.executeSql("INSERT "+sf+"(31,22,'thank')");
	tx.executeSql("INSERT "+sf+"(32,23,'cheers')");
	tx.executeSql("INSERT "+sf+"(33,24,'sorry')");
	tx.executeSql("INSERT "+sf+"(34,25,'credit')");
	tx.executeSql("INSERT "+sf+"(35,25,'card')");
	tx.executeSql("INSERT "+sf+"(36,26,'greek')");
	tx.executeSql("INSERT "+sf+"(37,26,'speak')");
	tx.executeSql("INSERT "+sf+"(38,27,'understand')");
	tx.executeSql("INSERT "+sf+"(39,28,'goodbye')");
	tx.executeSql("INSERT "+sf+"(40,29,'tell')");
	tx.executeSql("INSERT "+sf+"(41,30,'have')");
	tx.executeSql("INSERT "+sf+"(42,31,'like')");
	tx.executeSql("INSERT "+sf+"(486,504,'speak')");
	tx.executeSql("INSERT "+sf+"(487,504,'french')");
	tx.executeSql("INSERT "+sf+"(488,505,'speak')");
	tx.executeSql("INSERT "+sf+"(489,505,'german')");
	tx.executeSql("INSERT "+sf+"(490,506,'here')");
	tx.executeSql("INSERT "+sf+"(491,507,'get')");
	tx.executeSql("INSERT "+sf+"(492,507,'can')");
}

var my_media=null;

function playStream(src){
	
	if (device.platform == 'Android') {
		
		src = '/android_asset/www/audio/'+src+'.m4a';
		
	}else{
		src='audio/'+src+'.m4a';
	}

	my_media = new Media(src,onSuccess, onError);
	my_media.play();
}
 function onSuccess() {

}
function onError(error) {
	alert('code: '    + error.code    + '\n' + 
		  'message: ' + error.message + '\n');
}
  function setAudioPosition(position) {
	document.getElementById('audio_position').innerHTML = position;
}
function toggleSearch(){
	if ($('#form-container').css('display')=='block'){
		$('#form-container').hide("fast");
		$('#submitSearch').hide("fast");
		$('#home_logo').attr('src','images/yaapp_home.png');
	}else {
		$('#form-container').show("fast");
		$('#submitSearch').show("fast");
		$('#home_logo').attr('src','images/yaapp_home_trans.png');
		sbp = 'home-page';
	}
}
function hideSearch(){
	if ($('#form-container').css('display')=='block'){
		$('#form-container').hide("fast");
		$('#submitSearch').hide("fast");
		$('#home_logo').attr('src','images/yaapp_home.png');
	}
}
