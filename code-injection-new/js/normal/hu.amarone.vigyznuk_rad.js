


































            app.initialize();
    









































		    document.addEventListener('deviceready', function() {
		        navigator.splashscreen.hide()
		
		        actionBarSherlockTabBar = cordova.require('cordova/plugin/actionBarSherlockTabBar');
		        
		    }, false);
		    
		

            app.initialize();
    



















var storage = window.localStorage;



var toBeDownloaded = new Array();
toBeDownloaded = [
	{filename: "aignews.json", url: "http://vigyazunkrad.webbeteg.hu/api/news?idarrays=true" + "&random=" + Math.round((Math.random() * 1000))},
	{filename: "aigbordaganat.json", url: "http://vigyazunkrad.webbeteg.hu/api/news?category=1&orderby=date_from" + "&random=" + Math.round((Math.random() * 1000))},
	{filename: "aigmegelozes.json", url: "http://vigyazunkrad.webbeteg.hu/api/news?category=2&orderby=date_from" + "&random=" + Math.round((Math.random() * 1000))},
	{filename: "aigmellrak.json", url: "http://vigyazunkrad.webbeteg.hu/api/news?category=3&orderby=date_from" + "&random=" + Math.round((Math.random() * 1000))},
	{filename: "aigmehnyakrak.json", url: "http://vigyazunkrad.webbeteg.hu/api/news?category=4&orderby=date_from" + "&random=" + Math.round((Math.random() * 1000))},
	{filename: "aigtest.json", url: "http://vigyazunkrad.webbeteg.hu/api/tests/1" + "?random=" + Math.round((Math.random() * 1000))},
	{filename: "aigpetefeszekdaganat.json", url: "http://vigyazunkrad.webbeteg.hu/api/news?category=5&orderby=date_from" + "&random=" + Math.round((Math.random() * 1000))}
];
var downloadIndex = 0;
var db_versionUrl = "http://vigyazunkrad.webbeteg.hu/api/options?name=DB_version" + "&random=" + Math.round((Math.random() * 1000));
var db_local_version = 135;
var pic_url = "http://vigyazunkrad.webbeteg.hu/api/pictures";
var index_pic_url="http://vigyazunkrad.webbeteg.hu/api/pictures_index"
//var pic_url = "http://vigyazunkrad.webbeteg.hu/api/pictures?deleted=0";

function database_sync(successHandler) {
	logDisplay("version check start: " + db_versionUrl);

	
	//storage.setItem("db_version", 1);
	$.getJSON(db_versionUrl, function(data) {
		logDisplay("version check success");
		
		if (storage.getItem("db_version") !== null) {
			db_local_version = storage.getItem("db_version");
			logDisplay("!!!!!!!!!!!!!!!!!!!!!!!!");
			
		}else{
			logDisplay("????????????????????????");
			get_pictures(pic_url, successHandler, parseInt(data[0].value),"", "image");
			get_pictures(index_pic_url, successHandler, parseInt(data[0].value),"index_", "image_index");			
		}
		
		logDisplay("local db version: " + parseInt(db_local_version) + " , remote db version: " + parseInt(data[0].value));
		if (parseInt(db_local_version) < parseInt(data[0].value)) {
			//frissítés
			logDisplay("DB REFRESH STARTED!");
			downloadFile(toBeDownloaded[0].filename, toBeDownloaded[0].url, successHandler, parseInt(data[0].value));
			get_pictures(pic_url, successHandler, parseInt(data[0].value),"", "image");
			get_pictures(index_pic_url, successHandler, parseInt(data[0].value),"index_", "image_index");
		} else {
			logDisplay("DB IS UPTODATE")
			successHandler();
		}
	});
}


function downloadFile(filename, url, successHandler, newDbVersion) {
	window.requestFileSystem(
			LocalFileSystem.PERSISTENT, 0,
			function onFileSystemSuccess(fileSystem) {
				logDisplay("--------------------------------------------------");
				logDisplay("getfile: " + filename);
				fileSystem.root.getFile(
						filename, {create: true, exclusive: false},
				function gotFileEntry(fileEntry) {
					logDisplay("gotfileentry: " + fileEntry.fullPath);
					var sPath = fileEntry.fullPath.replace(filename, "");
					
					if (device.platform == "Android" && filename.indexOf("jpg") > -1) {
						sPath = sPath+"aig/";
						storage.setItem("filepath", sPath);
					}
					if (device.platform == "iOS")
						{
						storage.setItem("filepath", sPath);
						}
					
					
					var fileTransfer = new FileTransfer();
					fileEntry.remove();
					fileTransfer.download(
							url,
							sPath + filename,
							function(theFile) {
								logDisplay("download complete: " + theFile.toURL());
								if (device.platform == "iOS") {
									theFile.setMetadata(file_success, file_fail, {"com.apple.MobileBackup": 1});
								}

								if (downloadIndex < toBeDownloaded.length - 1) {
									downloadIndex = downloadIndex + 1;
									downloadFile(toBeDownloaded[downloadIndex].filename, toBeDownloaded[downloadIndex].url, successHandler, newDbVersion);
								} else {
									logDisplay("new local db version: " + newDbVersion);
									
									storage.setItem("db_version", newDbVersion);
									
									
									//logDisplay("new local db version: " + storage.getItem("db_version"));
									successHandler();
								}
							},
							function(error) {
								logDisplay("download error source " + error.source);
								logDisplay("download error target " + error.target);
								logDisplay("upload error code: " + error.code);
							}
					);
				},
						file_fail);
			},
			file_fail);
}

function sync_finished() {

	logDisplay("DB SYNC FINISHED");

}

function setArrayFromFile(variableName, toarray) {

	
	window.requestFileSystem(
			LocalFileSystem.PERSISTENT, 0,
			function onFileSystemSuccess(fileSystem) {
				logDisplay("-------------------------------------------");
				logDisplay("getfile to read: " + variableName + ".json");
				fileSystem.root.getFile(
						variableName + ".json", {create: true, exclusive: false},
				function gotFileEntry(fileEntry) {
					logDisplay("gotFileEntry: "+fileEntry.name);
					fileEntry.file(
							function gotFile(file) {
								logDisplay("gotFile: "+file.name);
								var reader = new FileReader();
								reader.onloadend = function(evt) {
									logDisplay("Reader onloadend: " +file.name);
									if (evt.target.result !== "") {
										eval(variableName + "_content=String('" + evt.target.result.replace(/\"/g, '\\"') + "');");
										//logDisplay("RESULT!!!!!: "+evt.target.result);
										if (toarray === true) {
											//logDisplay("TORARRAYTRUE "+String(evt.target.result.replace(/\"/g, '\\"')));
											
											eval(variableName + "_array=JSON.decode(String('" + evt.target.result.replace(/\"/g, '\\"') + "'),true);");
											
											//logDisplay("TORARRAYTRUE MÖGÖTTE");
										}
										//logDisplay(variableName+"="+eval(variableName+ "_content"));
									} else {
										logDisplay("Set of "+variableName+"_array");
										//eval("logDisplay("+variableName + "_content);");
										eval(variableName + "_array=JSON.decode(" + variableName + "_content,true);");
										logDisplay("Set of "+variableName+"_array is OK!");
									}
									//logDisplay(evt.target.result);
								};
								reader.onerror = function(FileError){
									logDisplay("Reader error");
								};
								reader.onloadstart= function (){
									logDisplay("Reader started: "+file.name);
								};
								reader.onabort= function (){
									logDisplay("Reader aborted");
								};
								reader.readAsText(file);
							}, file_fail);
				},
						file_fail);
			},
			file_fail);
}

function file_success() {
	logDisplay("file function ok");
}
function file_fail(evt) {
	logDisplay("error: " + evt.target.error.code);
}

function get_pictures(pic_url, successHandler, newDbVersion, fileprefix, imagecol)
{
	$.getJSON(pic_url, function(data) {
		logDisplay(pic_url);

		//logDisplay("képadat: "+data[0].id+"-----"+data[0].image);
		
		
		for (k = 0; k <= data.length - 1; k++) {
			
			logDisplay("kép: "+eval("data[k]."+imagecol));
			if (eval("data[k]."+imagecol) != "")
			{
				
				downloadFile(fileprefix+data[k].id + ".jpg", "http://vigyazunkrad.webbeteg.hu/" + eval("data[k]."+imagecol), successHandler, newDbVersion);
			}

		}

	});
}



var aigtest_content='{"id":"1","lead":"Vigy\u00e1zunk R\u00e1d Teszt","test_quest":[{"id":"2","question":"\u00c9letkorod?","test":"1","test_answer":[{"answer":"18-45","image":"","question":"2","pont":"5"},{"answer":"45+","image":"","question":"2","pont":"10"}]},{"id":"3","question":"El\u0151fordult m\u00e1r a csal\u00e1dodban daganatos megbeteged\u00e9s?","test":"1","test_answer":[{"answer":"Igen","image":"","question":"3","pont":"15"},{"answer":"Nem","image":"","question":"3","pont":"5"}]},{"id":"4","question":"Rendszeresen fogyasztasz alkoholt?","test":"1","test_answer":[{"answer":"Igen","image":"","question":"4","pont":"15"},{"answer":"Nem","image":"","question":"4","pont":"5"}]},{"id":"5","question":"Hetente legal\u00e1bb k\u00e9tszer v\u00e9gzel valamilyen testmozg\u00e1st?","test":"1","test_answer":[{"answer":"Igen","image":"","question":"5","pont":"5"},{"answer":"Nem","image":"","question":"5","pont":"15"}]},{"id":"6","question":"Odafigyelsz a t\u00e1pl\u00e1lkoz\u00e1sodra?","test":"1","test_answer":[{"answer":"Igen","image":"","question":"6","pont":"5"},{"answer":"Nem","image":"","question":"6","pont":"15"}]},{"id":"7","question":"V\u00e9ded a b\u0151r\u00f6d a nap k\u00e1ros sugarait\u00f3l, ker\u00fcl\u00f6d a le\u00e9g\u00e9st?","test":"1","test_answer":[{"answer":"Igen","image":"","question":"7","pont":"5"},{"answer":"Nem","image":"","question":"7","pont":"15"}]},{"id":"8","question":"Kapt\u00e1l m\u00e1r HPV elleni olt\u00e1st?","test":"1","test_answer":[{"answer":"Igen","image":"","question":"8","pont":"5"},{"answer":"Nem","image":"","question":"8","pont":"15"}]},{"id":"9","question":"Rendszeresen j\u00e1rsz n\u0151gy\u00f3gy\u00e1szati vizsg\u00e1latra?","test":"1","test_answer":[{"answer":"Igen","image":"","question":"9","pont":"5"},{"answer":"Nem","image":"","question":"9","pont":"20"}]},{"id":"10","question":"Doh\u00e1nyzol?","test":"1","test_answer":[{"answer":"Igen","image":"","question":"10","pont":"20"},{"answer":"Nem","image":"","question":"10","pont":"5"}]},{"id":"11","question":"Elv\u00e9gzed havonta melleid \u00f6nvizsg\u00e1lat\u00e1t?","test":"1","test_answer":[{"answer":"Igen","image":"","question":"11","pont":"5"},{"answer":"Nem","image":"","question":"11","pont":"15"}]},{"id":"12","question":"Rendszeresen j\u00e1rsz mammogr\u00e1fi\u00e1s vizsg\u00e1latra?","test":"1","test_answer":[{"answer":"Igen","image":"","question":"12","pont":"5"},{"answer":"Nem","image":"","question":"12","pont":"7"}]}],"test_ertekelesek":[{"ponthatar":"80","content":"<p> V&aacute;laszaid alapj&aacute;n neked k&uuml;l&ouml;n&ouml;s figyelmet kell ford&iacute;tanod a daganatos betegs&eacute;gek megel\u0151z&eacute;s&eacute;re! B&aacute;r az &ouml;r&ouml;kl&ouml;tt t&eacute;nyez\u0151k ellen nem lehet mit tenni, de az &eacute;letviteleden b&aacute;rmikor v&aacute;ltoztathatsz. Pr&oacute;b&aacute;lj meg v&aacute;ltoztatni &eacute;letm&oacute;dodon &eacute;s j&aacute;rj rendszeresen sz\u0171r\u0151vizsg&aacute;latokra! Ma m&aacute;r l&eacute;tezik n\u0151i daganatos betegs&eacute;gekre k&ouml;thet\u0151 biztos&iacute;t&aacute;s, ami p&oacute;tolja a kies\u0151 bev&eacute;teleket &eacute;s orvosi ell&aacute;t&aacute;sra is ig&eacute;nybe vehet\u0151. &Eacute;rdemes ilyen szempontb&oacute;l is biztos&iacute;tani a j&ouml;v\u0151d.<\/p> <p> <strong>&Eacute;letkor<\/strong>: vannak olyan rizik&oacute;t&eacute;nyez\u0151k, melyek t&ouml;bbf&eacute;le daganat kialakul&aacute;s&aacute;&eacute;rt felelnek, sajnos nagyr&eacute;sz&uuml;ket nem is tudjuk kiv&eacute;deni. Ilyen t&eacute;nyez\u0151 az &eacute;letkor: a b\u0151rr&aacute;k, a mellr&aacute;k &eacute;s a petef&eacute;szek-daganatok kialakul&aacute;s&aacute;ban is jelent\u0151s szerepet j&aacute;tszik. Ha a csal&aacute;dban m&aacute;r volt eml\u0151-, vastagb&eacute;l-, petef&eacute;szek- vagy m&eacute;htestr&aacute;k, javasolt a rendszeres sz\u0171r\u0151vizsg&aacute;laton val&oacute; r&eacute;szv&eacute;tel. N\u0151gy&oacute;gy&aacute;szati daganat kialakul&aacute;s&aacute;&eacute;rt felel\u0151s g&eacute;n sz&aacute;rmazhat az ap&aacute;t&oacute;l &eacute;s az any&aacute;t&oacute;l is!<\/p> <p> <strong>Alkoholfogyaszt&aacute;s<\/strong>: az alkoholfogyaszt&aacute;s r&ouml;vid t&aacute;v&uacute; negat&iacute;v hat&aacute;sai kell\u0151en nagy fogyaszt&aacute;s eset&eacute;n viszonylag hamar jelentkezhetnek. A v&eacute;rbe ker&uuml;lve az alkohol minden szerv&uuml;nkh&ouml;z eljut, &iacute;gy a k&ouml;zponti idegrendszerbe is, amelyre az egyik legnagyobb hat&aacute;st gyakorolja. Az alkoholfogyaszt&aacute;snak s&uacute;lyos k&ouml;vetkezm&eacute;nyei lehetnek: v&eacute;rszeg&eacute;nys&eacute;g, epilepszia. K&aacute;ros&iacute;thatja a hasny&aacute;lmirigyet is, amelyre er\u0151s f&aacute;jdalommal k&iacute;s&eacute;rt gyullad&aacute;sos elv&aacute;ltoz&aacute;sok utalnak, de kering&eacute;si panaszokat is okozhat, komoly hat&aacute;ssal lehet a sz&iacute;vm\u0171k&ouml;d&eacute;sre is, az alkoholfogyaszt&aacute;s legnagyobb vesz&eacute;lye legink&aacute;bb a k&uuml;l&ouml;nb&ouml;z\u0151 daganatok kialakul&aacute;sa miatt vesz&eacute;lyes: k&ouml;zismert, hogy a m&aacute;jzsugor &aacute;ltal a m&aacute;jr&aacute;k, a gyomorr&aacute;k, a nyel\u0151cs\u0151r&aacute;k &eacute;s a hasny&aacute;lmirigyr&aacute;k l&eacute;trej&ouml;tt&eacute;&eacute;rt felel\u0151s.<\/p> <p> <strong>Ha doh&aacute;nyzol (ha alkalomszer\u0171en is), pr&oacute;b&aacute;lj meg leszokni!<\/strong> Az iparilag fejlett orsz&aacute;gokban - k&ouml;zt&uuml;k Magyarorsz&aacute;gon - a doh&aacute;nyz&aacute;s felel\u0151s a hal&aacute;los kimenetel\u0171 r&aacute;kos megbeteged&eacute;sek mintegy harmad&aacute;&eacute;rt. A r&aacute;kos hal&aacute;loz&aacute;sok egyharmada teh&aacute;t puszt&aacute;n azzal megel\u0151zhet\u0151 lenne, ha kik&uuml;sz&ouml;b&ouml;ln&eacute;nk a doh&aacute;nyz&aacute;st. A doh&aacute;nyz&aacute;s k&aacute;ros hat&aacute;sai sokkal nagyobbak, mint kor&aacute;bban gondolt&aacute;k. A doh&aacute;nyz&aacute;s t&ouml;bb mint h&uacute;szf&eacute;le megbeteged&eacute;s kialakul&aacute;s&aacute;ban &eacute;s e megbeteged&eacute;sek okozta hal&aacute;loz&aacute;sban j&aacute;tszik fontos vezet\u0151 szerepet. A sz&iacute;v- &eacute;s &eacute;rbetegs&eacute;gek 25-30 sz&aacute;zal&eacute;ka, a kr&oacute;nikus h&ouml;rg\u0151gyullad&aacute;s &eacute;s t&uuml;d\u0151t&aacute;gulat okozta hal&aacute;loz&aacute;sok 75 sz&aacute;zal&eacute;ka, a t&uuml;d\u0151r&aacute;kos hal&aacute;loz&aacute;sok mintegy 90 sz&aacute;zal&eacute;ka tulajdon&iacute;that&oacute; k&ouml;zvetlen&uuml;l a doh&aacute;nyz&aacute;snak. K&uuml;l&ouml;n meg kell eml&iacute;teni a doh&aacute;nyz&aacute;s fogakra, &iacute;nyre gyakorolt hat&aacute;s&aacute;t: azon t&uacute;l, hogy a fogak elsz&iacute;nez\u0151dnek, a sz&aacute;j&uuml;regi daganatok kialakul&aacute;s&aacute;nak es&eacute;lye a t&ouml;bbsz&ouml;r&ouml;s&eacute;re emelkedik! A doh&aacute;nyz&aacute;s k&ouml;vetkezt&eacute;ben a b\u0151r gyorsabban &ouml;regszik, elvesz&iacute;ti rugalmass&aacute;g&aacute;t, r&aacute;ncosod&aacute;st okoz.<\/p> <p> <strong>Mozogj az eg&eacute;szs&eacute;g&eacute;rt:<\/strong> r&eacute;g&oacute;ta ismert, hogy a mozg&aacute;sszeg&eacute;ny &eacute;letm&oacute;d jelent\u0151sen n&ouml;veli egyes betegs&eacute;gek, p&eacute;ld&aacute;ul a 2-es t&iacute;pus&uacute; cukorbetegs&eacute;g vagy k&uuml;l&ouml;nf&eacute;le sz&iacute;v- &eacute;s &eacute;rrendszeri, valamint (az elh&iacute;z&aacute;s miatt) a k&uuml;l&ouml;nb&ouml;z\u0151 daganatos betegs&eacute;gek kialakul&aacute;s&aacute;nak kock&aacute;zat&aacute;t. Testmozg&aacute;ssal jelent\u0151sen cs&ouml;kkenthetj&uuml;k a rizik&oacute;t, &eacute;s nem felt&eacute;tlen&uuml;l a meger\u0151ltet\u0151 edz&eacute;sekre kell gondolnunk.<br \/> A s&eacute;ta, a ker&eacute;kp&aacute;roz&aacute;s, vagy a gyerekekkel, unok&aacute;kkal val&oacute; k&ouml;z&ouml;s j&aacute;t&eacute;k is el&eacute;g lehet - a fontos az, hogy rendszeres legyen. Akik enn&eacute;l intenz&iacute;vebb mozg&aacute;sform&aacute;t v&aacute;lasztanak, (pl. k&ouml;nny\u0171 fut&aacute;s, tenisz, &uacute;sz&aacute;s) m&aacute;r napi 30 perc mozg&aacute;ssal is sikeresen v&eacute;dekezik a s&uacute;lyfelesleg megjelen&eacute;se ellen. A mozg&aacute;s j&oacute;t tesz a testnek, de az kev&eacute;ss&eacute; ismert, hogy a l&eacute;leknek &eacute;s az elm&eacute;nek is val&oacute;s&aacute;gos csodaszer: fizikai aktivit&aacute;s el\u0151seg&iacute;ti azon agyi inger&uuml;let-&aacute;tviv\u0151knek a termel\u0151d&eacute;s&eacute;t, amelyek a j&oacute;kedv&eacute;rt felel\u0151sek &ndash; ezek az endorfinok.<\/p> <p> <strong>T&aacute;pl&aacute;lkoz&aacute;s<\/strong>: a magas zs&iacute;rtartalm&uacute; t&aacute;pl&aacute;lkoz&aacute;s fokozza eml\u0151- &eacute;s a vastag- &eacute;s v&eacute;gb&eacute;lr&aacute;k kialakul&aacute;s&aacute;nak kock&aacute;zat&aacute;t. Egyes tanulm&aacute;nyok szerint k&uuml;l&ouml;n&ouml;sen a tel&iacute;tett zs&iacute;rok fogyaszt&aacute;s&aacute;nak volna k&uuml;l&ouml;n&ouml;sen kock&aacute;zatn&ouml;vel\u0151 szerepe.<\/p>","title":"\u00c9rt\u00e9kel\u00e9s III."},{"ponthatar":"55","content":"<p> &Eacute;letm&oacute;dod kisebb-nagyobb m&eacute;rt&eacute;k\u0171 v&aacute;ltoztat&aacute;s&aacute;val sokat tehetsz az&eacute;rt, hogy megel\u0151zd a daganatos betegs&eacute;gek kialakul&aacute;s&aacute;t. Vedd komolyan a sz\u0171r\u0151vizsg&aacute;latokat! Ma m&aacute;r l&eacute;tezik n\u0151i daganatos betegs&eacute;gekre k&ouml;thet\u0151 biztos&iacute;t&aacute;s, ami p&oacute;tolja a kies\u0151 bev&eacute;teleket &eacute;s orvosi ell&aacute;t&aacute;sra is ig&eacute;nybe vehet\u0151. &Eacute;rdemes ilyen szempontb&oacute;l is biztos&iacute;tani a j&ouml;v\u0151d.<\/p> <p> <strong>&Eacute;letkor<\/strong>: vannak olyan rizik&oacute;t&eacute;nyez\u0151k, melyek t&ouml;bbf&eacute;le daganat kialakul&aacute;s&aacute;&eacute;rt felelnek, sajnos nagyr&eacute;sz&uuml;ket nem is tudjuk kiv&eacute;deni. Ilyen t&eacute;nyez\u0151 az &eacute;letkor: a b\u0151rr&aacute;k, a mellr&aacute;k &eacute;s a petef&eacute;szek-daganatok kialakul&aacute;s&aacute;ban is jelent\u0151s szerepet j&aacute;tszik. Ha a csal&aacute;dban m&aacute;r volt eml\u0151-, vastagb&eacute;l-, petef&eacute;szek- vagy m&eacute;htestr&aacute;k, javasolt a rendszeres sz\u0171r\u0151vizsg&aacute;laton val&oacute; r&eacute;szv&eacute;tel. N\u0151gy&oacute;gy&aacute;szati daganat kialakul&aacute;s&aacute;&eacute;rt felel\u0151s g&eacute;n sz&aacute;rmazhat az ap&aacute;t&oacute;l &eacute;s az any&aacute;t&oacute;l is!<\/p> <p> <strong>Alkoholfogyaszt&aacute;s<\/strong>: az alkoholfogyaszt&aacute;s r&ouml;vid t&aacute;v&uacute; negat&iacute;v hat&aacute;sai kell\u0151en nagy fogyaszt&aacute;s eset&eacute;n viszonylag hamar jelentkezhetnek. A v&eacute;rbe ker&uuml;lve az alkohol minden szerv&uuml;nkh&ouml;z eljut, &iacute;gy a k&ouml;zponti idegrendszerbe is, amelyre az egyik legnagyobb hat&aacute;st gyakorolja. Az alkoholfogyaszt&aacute;snak s&uacute;lyos k&ouml;vetkezm&eacute;nyei lehetnek: v&eacute;rszeg&eacute;nys&eacute;g, epilepszia. K&aacute;ros&iacute;thatja a hasny&aacute;lmirigyet is, amelyre er\u0151s f&aacute;jdalommal k&iacute;s&eacute;rt gyullad&aacute;sos elv&aacute;ltoz&aacute;sok utalnak, de kering&eacute;si panaszokat is okozhat, komoly hat&aacute;ssal lehet a sz&iacute;vm\u0171k&ouml;d&eacute;sre is, az alkoholfogyaszt&aacute;s legnagyobb vesz&eacute;lye legink&aacute;bb a k&uuml;l&ouml;nb&ouml;z\u0151 daganatok kialakul&aacute;sa miatt vesz&eacute;lyes: k&ouml;zismert, hogy a m&aacute;jzsugor &aacute;ltal a m&aacute;jr&aacute;k, a gyomorr&aacute;k, a nyel\u0151cs\u0151r&aacute;k &eacute;s a hasny&aacute;lmirigyr&aacute;k l&eacute;trej&ouml;tt&eacute;&eacute;rt felel\u0151s.<\/p> <p> <strong>Ha doh&aacute;nyzol<\/strong> (ha alkalomszer\u0171en is), pr&oacute;b&aacute;lj meg leszokni! Az iparilag fejlett orsz&aacute;gokban - k&ouml;zt&uuml;k Magyarorsz&aacute;gon - a doh&aacute;nyz&aacute;s felel\u0151s a hal&aacute;los kimenetel\u0171 r&aacute;kos megbeteged&eacute;sek mintegy harmad&aacute;&eacute;rt. A r&aacute;kos hal&aacute;loz&aacute;sok egyharmada teh&aacute;t puszt&aacute;n azzal megel\u0151zhet\u0151 lenne, ha kik&uuml;sz&ouml;b&ouml;ln&eacute;nk a doh&aacute;nyz&aacute;st. A doh&aacute;nyz&aacute;s k&aacute;ros hat&aacute;sai sokkal nagyobbak, mint kor&aacute;bban gondolt&aacute;k. A doh&aacute;nyz&aacute;s t&ouml;bb mint h&uacute;szf&eacute;le megbeteged&eacute;s kialakul&aacute;s&aacute;ban &eacute;s e megbeteged&eacute;sek okozta hal&aacute;loz&aacute;sban j&aacute;tszik fontos vezet\u0151 szerepet. A sz&iacute;v- &eacute;s &eacute;rbetegs&eacute;gek 25-30 sz&aacute;zal&eacute;ka, a kr&oacute;nikus h&ouml;rg\u0151gyullad&aacute;s &eacute;s t&uuml;d\u0151t&aacute;gulat okozta hal&aacute;loz&aacute;sok 75 sz&aacute;zal&eacute;ka, a t&uuml;d\u0151r&aacute;kos hal&aacute;loz&aacute;sok mintegy 90 sz&aacute;zal&eacute;ka tulajdon&iacute;that&oacute; k&ouml;zvetlen&uuml;l a doh&aacute;nyz&aacute;snak. K&uuml;l&ouml;n meg kell eml&iacute;teni a doh&aacute;nyz&aacute;s fogakra, &iacute;nyre gyakorolt hat&aacute;s&aacute;t: azon t&uacute;l, hogy a fogak elsz&iacute;nez\u0151dnek, a sz&aacute;j&uuml;regi daganatok kialakul&aacute;s&aacute;nak es&eacute;lye a t&ouml;bbsz&ouml;r&ouml;s&eacute;re emelkedik! A doh&aacute;nyz&aacute;s k&ouml;vetkezt&eacute;ben a b\u0151r gyorsabban &ouml;regszik, elvesz&iacute;ti rugalmass&aacute;g&aacute;t, r&aacute;ncosod&aacute;st okoz.<\/p> <p> <strong>Mozogj az eg&eacute;szs&eacute;g&eacute;rt<\/strong>: r&eacute;g&oacute;ta ismert, hogy a mozg&aacute;sszeg&eacute;ny &eacute;letm&oacute;d jelent\u0151sen n&ouml;veli egyes betegs&eacute;gek, p&eacute;ld&aacute;ul a 2-es t&iacute;pus&uacute; cukorbetegs&eacute;g vagy k&uuml;l&ouml;nf&eacute;le sz&iacute;v- &eacute;s &eacute;rrendszeri, valamint (az elh&iacute;z&aacute;s miatt) a k&uuml;l&ouml;nb&ouml;z\u0151 daganatos betegs&eacute;gek kialakul&aacute;s&aacute;nak kock&aacute;zat&aacute;t. Testmozg&aacute;ssal jelent\u0151sen cs&ouml;kkenthetj&uuml;k a rizik&oacute;t, &eacute;s nem felt&eacute;tlen&uuml;l a meger\u0151ltet\u0151 edz&eacute;sekre kell gondolnunk.<br \/> A s&eacute;ta, a ker&eacute;kp&aacute;roz&aacute;s, vagy a gyerekekkel, unok&aacute;kkal val&oacute; k&ouml;z&ouml;s j&aacute;t&eacute;k is el&eacute;g lehet - a fontos az, hogy rendszeres legyen. Akik enn&eacute;l intenz&iacute;vebb mozg&aacute;sform&aacute;t v&aacute;lasztanak, (pl. k&ouml;nny\u0171 fut&aacute;s, tenisz, &uacute;sz&aacute;s) m&aacute;r napi 30 perc mozg&aacute;ssal is sikeresen v&eacute;dekezik a s&uacute;lyfelesleg megjelen&eacute;se ellen. A mozg&aacute;s j&oacute;t tesz a testnek, de az kev&eacute;ss&eacute; ismert, hogy a l&eacute;leknek &eacute;s az elm&eacute;nek is val&oacute;s&aacute;gos csodaszer: fizikai aktivit&aacute;s el\u0151seg&iacute;ti azon agyi inger&uuml;let-&aacute;tviv\u0151knek a termel\u0151d&eacute;s&eacute;t, amelyek a j&oacute;kedv&eacute;rt felel\u0151sek &ndash; ezek az endorfinok.<\/p> <p> <strong>T&aacute;pl&aacute;lkoz&aacute;s<\/strong>: a magas zs&iacute;rtartalm&uacute; t&aacute;pl&aacute;lkoz&aacute;s fokozza eml\u0151- &eacute;s a vastag- &eacute;s v&eacute;gb&eacute;lr&aacute;k kialakul&aacute;s&aacute;nak kock&aacute;zat&aacute;t. Egyes tanulm&aacute;nyok szerint k&uuml;l&ouml;n&ouml;sen a tel&iacute;tett zs&iacute;rok fogyaszt&aacute;s&aacute;nak volna k&uuml;l&ouml;n&ouml;sen kock&aacute;zatn&ouml;vel\u0151 szerepe.<\/p>","title":"\u00c9rt\u00e9kel\u00e9s II."},{"ponthatar":"0","content":"<p style=\\"text-align: justify;\\"> L&aacute;that&oacute;an odafigyelsz magadra &eacute;s eg&eacute;szs&eacute;gedre, illetve nem magas az &ouml;r&ouml;kl&ouml;tt t&eacute;nyez\u0151k szerepe sem. Tartsd meg eg&eacute;szs&eacute;ges szok&aacute;saidat, ugyanakkor te se kock&aacute;ztass: j&aacute;rj rendszeresen sz\u0171r\u0151vizsg&aacute;latokra! Ma m&aacute;r l&eacute;tezik n\u0151i daganatos betegs&eacute;gekre k&ouml;thet\u0151 biztos&iacute;t&aacute;s, ami p&oacute;tolja a kies\u0151 bev&eacute;teleket &eacute;s orvosi ell&aacute;t&aacute;sra is ig&eacute;nybe vehet\u0151. &Eacute;rdemes ilyen szempontb&oacute;l is biztos&iacute;tani a j&ouml;v\u0151d.<\/p>","title":"\u00c9rt\u00e9kel\u00e9s"}]}';
var aignews_content='{"2":{"id":"2","title":"A mellr\u00e1k t\u00fcnetei","lead":"Az eml\u0151ben tapintott csom\u00f3k legnagyobb r\u00e9sze j\u00f3indulat\u00fa, ugyanakkor biztons\u00e1ggal csak szakorvosi vizsg\u00e1lattal lehet eld\u00f6nteni, hogy j\u00f3 vagy rosszindulat\u00fa folyamatr\u00f3l van sz\u00f3 \u00e9s sz\u00fcks\u00e9ges-e a kezel\u00e9s. Az \u00f6nvizsg\u00e1lat \u00e9letet menthet!","content":"<p> A legjellemz\u0151bb t&uuml;net, hogy csom&oacute; tapinthat&oacute; az eml\u0151ben. Az esetek 80 sz&aacute;zal&eacute;k&aacute;ban azonban ez nem jelent rosszindulat&uacute; elv&aacute;ltoz&aacute;st.<\/p> <p> A mellr&aacute;kra &aacute;ltal&aacute;ban jellemz\u0151, hogy a daganat n&ouml;veked&eacute;s&eacute;vel az eml\u0151 alakja &eacute;s m&eacute;rete megv&aacute;ltozik, ekkor azonban m&aacute;r nagy a baj, ez&eacute;rt a korai t&uuml;netek felismer&eacute;se (&ouml;nellen\u0151rz&eacute;s!) &eacute;s a rendszeres sz\u0171r&eacute;seken val&oacute; r&eacute;szv&eacute;tel (mammogr&aacute;fia, ultrahang) &eacute;letment\u0151 lehet.<\/p> <p> Az eml\u0151b\u0151l v&aacute;lad&eacute;k t&aacute;vozhat. Azokban az esetekben, ha a daganat b\u0151rrel kapaszkodik &ouml;ssze, akkor beh&uacute;z&oacute;d&aacute;sokat okozhat, az eml\u0151bimb&oacute;t befel&eacute; ford&iacute;thatja, &eacute;s helyzet&eacute;t &uacute;gy r&ouml;gz&iacute;ti. K&eacute;s\u0151bb a b\u0151r kifek&eacute;lyesedik. A f&aacute;jdalom nem jellemz\u0151, &eacute;s korai szakaszban csak az esetek kb. 10 sz&aacute;zal&eacute;k&aacute;ban jelentkezik.<\/p> <p> Nagyon fontos t&uuml;net a tapinthat&oacute;, jellegzetes sz&ouml;vett&ouml;bblet. A b\u0151rfelsz&iacute;n egyenetlens&eacute;ge, beh&uacute;z&oacute;d&aacute;sa, kidudorod&aacute;sa, kifek&eacute;lyesed&eacute;se, &eacute;s a duzzadt, kanyarg&oacute;s v&eacute;n&aacute;k megjelen&eacute;se az eml\u0151n szint&eacute;n figyelmeztet\u0151 jelek.<\/p> <p> K&eacute;s\u0151i st&aacute;dium&aacute;ban a t&uuml;neteket f\u0151k&eacute;nt az &aacute;tt&eacute;tek okozz&aacute;k (els\u0151dlegesek a nyirokcsom&oacute; &aacute;tt&eacute;tek, ut&aacute;na csont, t&uuml;d\u0151, m&aacute;j, idegrendszer, mell&eacute;kvese, petef&eacute;szek). A csont&aacute;tt&eacute;tek f&aacute;jdalmas t&ouml;r&eacute;sekkel j&aacute;rnak. A t&uuml;d\u0151 &aacute;tt&eacute;tei fokoz&oacute;d&oacute; l&eacute;gz&eacute;si &eacute;s kering&eacute;si el&eacute;gtelens&eacute;get v&aacute;ltanak ki. A t&uuml;d\u0151betegs&eacute;g el\u0151rehalad&aacute;s&aacute;t fel-fellobban&oacute; gyullad&aacute;sok, fert\u0151z&eacute;sek siettetik.<\/p>","category":"3","active":"1","date_from":"2013-06-19 08:52:30"},"3":{"id":"3","title":"A mellr\u00e1k kialakul\u00e1sa, rizik\u00f3faktorai","lead":"Napjainkra a mellr\u00e1kkal kapcsolatos sz\u00e1mos hajlamos\u00edt\u00f3 t\u00e9nyez\u0151t siker\u00fclt azonos\u00edtani.","content":"<p> Az eml\u0151r&aacute;k kialakul&aacute;s&aacute;nak es&eacute;lye a menopauz&aacute;ig (v&aacute;ltoz&oacute; kor, klimax), minden &eacute;vtizedben a k&eacute;tszeres&eacute;re n\u0151.<\/p> <p> A mellr&aacute;kok egy r&eacute;sz&eacute;nek kialakul&aacute;sa &eacute;s n&ouml;veked&eacute;se, f&uuml;gg a n\u0151i nemi hormonok, els\u0151sorban az &ouml;sztrog&eacute;n jelenl&eacute;t&eacute;t\u0151l &eacute;s szintj&eacute;t\u0151l. A szervezet magasabb &ouml;sztrog&eacute;nszintje, fogamz&aacute;sg&aacute;tl&oacute; hossz&uacute; ideig tart&oacute; szed&eacute;se fokozza a kock&aacute;zatot.<\/p> <p> A nem sz&uuml;lt n\u0151k, vagy azok a n\u0151k, akik nem szoptattak, szint&eacute;n nagyobb kock&aacute;zatnak vannak kit&eacute;ve.<\/p> <p> Az elh&iacute;z&aacute;s &eacute;s az alkoholizmus k&ouml;zvetve - a hormonrendszer befoly&aacute;sol&aacute;sa r&eacute;v&eacute;n - szint&eacute;n kock&aacute;zatn&ouml;vel\u0151 szerepet t&ouml;lt be.<\/p> <p> A helytelen t&aacute;pl&aacute;lkoz&aacute;si szok&aacute;sok is hajlamos&iacute;thatnak a mellr&aacute;k kialakul&aacute;s&aacute;ra. A k&eacute;sz&eacute;telek t&uacute;lzott m&eacute;rt&eacute;k\u0171 fogyaszt&aacute;sa, a z&ouml;lds&eacute;g- &eacute;s gy&uuml;m&ouml;lcsf&eacute;l&eacute;k alacsony ar&aacute;nya az &eacute;tkez&eacute;sben, a kev&eacute;s rostbevitel mind-mind kedvez a daganat kialakul&aacute;s&aacute;nak.<\/p> <p> Legl&eacute;nyegesebb eleme a rizik&oacute;faktoroknak az &ouml;r&ouml;kl\u0151d&eacute;s, a genetika szerepe. Azokn&aacute;l a n\u0151kn&eacute;l, akiknek rokonai k&ouml;r&eacute;ben fordult el\u0151 eml\u0151r&aacute;k, nagyobb a betegs&eacute;g kifejl\u0151d&eacute;s&eacute;nek a val&oacute;sz&iacute;n\u0171s&eacute;ge.<\/p> <p> A genetikai faktorok jelent\u0151s&eacute;g&eacute;t bizonyos g&eacute;nbeli elt&eacute;r&eacute;sek jelenl&eacute;te igazolja. A mellr&aacute;k&eacute;rt az &uacute;gynevezett BRCA-1 &eacute;s BRCA-2 nev\u0171 g&eacute;n v&aacute;ltoz&aacute;sa tehet\u0151 felel\u0151ss&eacute;. A bek&ouml;vetkez\u0151 k&aacute;rosod&aacute;s miatt a k&aacute;rosodott sejtek daganatosan &aacute;talakulnak, azaz k&oacute;ros &eacute;s korl&aacute;tlan szaporod&aacute;sra lesznek k&eacute;pesek. Az &iacute;gy keletkezett sejtszaporulat alkotja mag&aacute;t a rosszindulat&uacute; daganatot.<\/p>","category":"3","active":"1","date_from":"2013-06-19 08:52:45"},"4":{"id":"4","title":"A petef\u00e9szek-daganat kialakul\u00e1sa, rizik\u00f3faktorai","lead":"A petef\u00e9szek (ovarium) a n\u0151i ivarmirigy a kismedenc\u00e9ben, a m\u00e9h k\u00e9t oldal\u00e1n elhelyezked\u0151, szilva nagys\u00e1g\u00fa p\u00e1ros szerv, amely \u00f6sztrog\u00e9nt (t\u00fcsz\u0151hormont) \u00e9s progeszteront (s\u00e1rgatesthormont) termelve a n\u0151i hormonh\u00e1ztart\u00e1s\u00e9rt is felel.","content":"<p> Ennek k&ouml;sz&ouml;nhet\u0151en a petef&eacute;szek betegs&eacute;ge gyakran egy&uuml;tt j&aacute;r hormon&aacute;lis eredet\u0171 panaszokkal.<\/p> <p> <strong>Kiket fenyeget a betegs&eacute;g?<\/strong><\/p> <p> A petef&eacute;szekr&aacute;k d&ouml;nt\u0151en az 50 &eacute;v feletti n\u0151k betegs&eacute;ge: el\u0151fordul&aacute;sa az &eacute;letkor el\u0151rehaladt&aacute;val egyre n\u0151, de ritk&aacute;n fiatal n\u0151kn&eacute;l is el\u0151fordulhat.<\/p> <p> A betegs&eacute;gnek t&ouml;bb kock&aacute;zati t&eacute;nyez\u0151je van, a legmeghat&aacute;roz&oacute;bb az &eacute;letkor. A t&ouml;bbi rizik&oacute;faktorr&oacute;l kevesebbet lehet tudni. A hib&aacute;s g&eacute;n sz&aacute;rmazhat az ap&aacute;t&oacute;l &eacute;s az any&aacute;t&oacute;l is, ez&eacute;rt fontos a csal&aacute;di k&oacute;rel\u0151zm&eacute;ny felt&aacute;r&aacute;sa. Fontos, hogy m&eacute;g panaszmentess&eacute;g eset&eacute;n is t&ouml;rt&eacute;nj&eacute;k &eacute;venk&eacute;nti rendszeres n\u0151gy&oacute;gy&aacute;szati vizsg&aacute;lat.<\/p> <p> A bels\u0151 kock&aacute;zati t&eacute;nyez\u0151 a szervezet hormonh&aacute;ztart&aacute;s&aacute;nak zavara. A petef&eacute;szkeket &eacute;rint\u0151 minden folyamat n&ouml;veli a kock&aacute;zatot.<\/p>","category":"5","active":"1","date_from":"2013-06-16 00:00:00"},"5":{"id":"5","title":"A petef\u00e9szek-daganat diagnosztiz\u00e1l\u00e1sa","lead":"Petef\u00e9szekr\u00e1kra nincs \u00e1ltal\u00e1nosan alkalmazott sz\u0171r\u00e9si m\u00f3dszer, ugyanakkor a genetikai t\u00e9nyez\u0151k miatt \u00e9rdemes rendszeres orvosi vizsg\u00e1latokon r\u00e9szt venni\u00fck azoknak, akiknek a csal\u00e1dj\u00e1ban volt hasonl\u00f3 betegs\u00e9g.","content":"<p> A t&uuml;netmentess&eacute;g &eacute;s a sz\u0171r\u0151vizsg&aacute;latok hi&aacute;nya miatt a daganatos elv&aacute;ltoz&aacute;st ritk&aacute;n fedezik fel korai st&aacute;diumban.<\/p> <p> Mivel a petef&eacute;szekr&aacute;k kezdetben t&uuml;netmentes, n\u0151gy&oacute;gy&aacute;szati vizsg&aacute;lat sor&aacute;n v&eacute;gzett ultrahang vizsg&aacute;lat vetheti fel a gyan&uacute;t. Ezt tov&aacute;bb er\u0151s&iacute;theti a v&eacute;rb\u0151l meghat&aacute;rozott tumor marker pozitivit&aacute;sa.<\/p> <p> A petef&eacute;szekr&aacute;k pontos diagn&oacute;zisa a m\u0171t&eacute;t sor&aacute;n nyert sz&ouml;vettani vizsg&aacute;lattal lehets&eacute;ges. Amennyiben beigazol&oacute;dik a daganat jelenl&eacute;te, az &aacute;tt&eacute;tek kiz&aacute;r&aacute;sa vagy pontos behat&aacute;rol&aacute;sa miatt m&aacute;s vizsg&aacute;latok is sz&uuml;ks&eacute;gesek: ultrahang, CT, esetleg MR vizsg&aacute;lat.<\/p> <p> A kivizsg&aacute;l&aacute;st nem szabad halogatni: a gyan&uacute; felmer&uuml;l&eacute;s&eacute;vel azonnal meg kell kezdeni, hogy miel\u0151bb rendelkez&eacute;sre &aacute;lljon a kezel&eacute;st megalapoz&oacute;, pontos diagn&oacute;zis.<\/p>","category":"5","active":"1","date_from":"2013-06-18 00:00:00"},"6":{"id":"6","title":"A m\u00e9hnyakr\u00e1kos beteg kil\u00e1t\u00e1sai","lead":"A m\u00e9hnyakr\u00e1k n\u0151gy\u00f3gy\u00e1szati vizsg\u00e1lattal m\u00e1r korai st\u00e1diumban j\u00f3l felismerhet\u0151, \u00e9s megfelel\u0151 kezel\u00e9ssel ak\u00e1r v\u00e9gleges gy\u00f3gyul\u00e1s is el\u00e9rhet\u0151.","content":"<p> Ennek ellen&eacute;re a megbeteged&eacute;s napjainkban is kiemelked\u0151 helyet foglal el a hal&aacute;loz&aacute;si statisztik&aacute;kban.<\/p> <p> Magyarorsz&aacute;gon &eacute;vente mintegy 1200 &uacute;j esetet fedeznek fel, amely jelent\u0151s h&aacute;nyada ekkor m&aacute;r el\u0151rehaladott, gy&oacute;gy&iacute;thatatlan st&aacute;diumban van. A rossz statisztikai mutat&oacute;k annak k&ouml;sz&ouml;nhet\u0151k, hogy a m&eacute;hnyakr&aacute;k-sz\u0171r&eacute;s bevezet&eacute;se &eacute;s ki&eacute;p&iacute;t&eacute;se ellen&eacute;re a n\u0151k jelent\u0151s h&aacute;nyada sajnos nem vesz r&eacute;szt ezen vizsg&aacute;laton, noha id\u0151ben megkezdett kezel&eacute;ssel az esetek nagy r&eacute;sz&eacute;ben gy&oacute;gy&iacute;that&oacute;.<\/p> <p> A m&eacute;hnyakr&aacute;k leggyakrabban 35-65 &eacute;ves kor&uacute; n\u0151k k&ouml;r&eacute;ben fordul el\u0151, egyre gyakrabban figyelhet\u0151 meg azonban fiatalabb korban is. A m&eacute;hnyakr&aacute;k kialakul&aacute;s&aacute;ban a hum&aacute;n papilloma v&iacute;rus (HPV) egyes t&iacute;pusainak szerepe bizony&iacute;tott, ezen v&iacute;rusok ugyanis a daganatosan elfajult sz&ouml;vetek 80-90 sz&aacute;zal&eacute;k&aacute;ban kimutathat&oacute;k.<\/p> <p> A m&eacute;hnyakr&aacute;k majdnem sz&aacute;zsz&aacute;zal&eacute;kos biztons&aacute;ggal megel\u0151zhet\u0151 a sz\u0171r&eacute;s &eacute;s az olt&aacute;s egy&uuml;ttes alkalmaz&aacute;s&aacute;val. A hum&aacute;n papilloma v&iacute;rus (HPV) elleni vakcin&aacute;t a szexu&aacute;lis &eacute;let megkezd&eacute;se, a fert\u0151z&eacute;s el\u0151tt c&eacute;lszer\u0171 adni, amennyiben ez nem t&ouml;rt&eacute;nt meg, a szexu&aacute;lisan m&aacute;r akt&iacute;v fiatal n\u0151kn&eacute;l is &eacute;rdemes alkalmazni, de annak hat&eacute;konys&aacute;ga ilyenkor m&aacute;r kisebb.<\/p> <p> <strong>A m&eacute;hnyakr&aacute;k k&eacute;s\u0151i st&aacute;diuma <\/strong><\/p> <p> A daganat n&ouml;veked&eacute;se sor&aacute;n &aacute;tterjed a k&ouml;rnyezet&eacute;re, besz\u0171rheti a h&uuml;velyt, a m&eacute;htestet, a h&uacute;gyh&oacute;lyagot, a h&uacute;gyvezet\u0151ket, a v&eacute;gbelet, a k&ouml;rnyez\u0151 ereket &eacute;s idegeket is.<\/p> <p> El\u0151rehaladott st&aacute;diumban a m&eacute;hnyakr&aacute;k a t&uuml;d\u0151ben, a m&aacute;jban, a csontokban, valamint az agyban k&eacute;pez &aacute;tt&eacute;tet.<\/p>","category":"4","active":"1","date_from":"2013-06-19 08:56:40"},"7":{"id":"7","title":"A mellr\u00e1kos beteg kil\u00e1t\u00e1sai","lead":"Az eml\u0151r\u00e1k a magyar n\u0151kn\u00e9l mind el\u0151fordul\u00e1si mind hal\u00e1loz\u00e1si sz\u00e1mban az els\u0151 helyek egyik\u00e9n szerepel.","content":"<p> A betegs&eacute;g ann&aacute;l nagyobb es&eacute;llyel &eacute;s a beteg ann&aacute;l kisebb megterhel&eacute;s&eacute;vel kezelhet\u0151, min&eacute;l kor&aacute;bban felismerik, &eacute;s a kezel&eacute;st a diagn&oacute;zis ut&aacute;n mihamarabb el is kezdik.<\/p> <p> A rosszindulat&uacute; daganatos sejtek saj&aacute;toss&aacute;ga, hogy folyamatos n&ouml;veked&eacute;s&uuml;k sor&aacute;n egy bizonyos id\u0151pontban kiindul&aacute;si hely&uuml;kr\u0151l a k&ouml;rnyezet&uuml;kbe t&ouml;rnek, majd onnan a hajsz&aacute;l- &eacute;s nyirokerekbe hatolva a szervezet m&aacute;s ter&uuml;leteire sodr&oacute;dnak el. Ott megtapadnak, &eacute;s &uacute;jra szaporodva &uacute;jabb daganatos g&oacute;cokat alkotnak (&aacute;tt&eacute;t-k&eacute;pz\u0151d&eacute;s). A sz\u0171r&eacute;s c&eacute;lja az, hogy mihamarabb felfedezz&uuml;k a m&eacute;g kism&eacute;ret\u0171 daganatot, mely ilyenkor m&eacute;g panaszt nem okozva, &eacute;szrev&eacute;tlen&uuml;l b&uacute;jik meg. Kicsi, 5 mm-es eml\u0151r&aacute;k eset&eacute;n az &aacute;tt&eacute;t-k&eacute;pz\u0151d&eacute;s val&oacute;sz&iacute;n\u0171s&eacute;ge m&eacute;g 10 sz&aacute;zal&eacute;k alatt van, m&iacute;g egy elhanyagolt (35-50 mm-es) eml\u0151r&aacute;k eset&eacute;n m&aacute;r 75-80 sz&aacute;zal&eacute;k es&eacute;ly van arra, hogy valahol m&aacute;r &aacute;tt&eacute;t keletkezett!<\/p> <p> Sz\u0171r\u0151vizsg&aacute;latok n&eacute;lk&uuml;l sok id\u0151t vesztegethet&uuml;nk el a v&eacute;gleges gy&oacute;gyul&aacute;s lehet\u0151s&eacute;g&eacute;nek kock&aacute;ztat&aacute;s&aacute;val, hiszen a nagyobb daganat&aacute;tm&eacute;r\u0151 mellett gyorsan n\u0151 az &aacute;tt&eacute;t-k&eacute;pz\u0151d&eacute;s es&eacute;lye is. A nagyobb m&eacute;ret\u0171 daganat kezel&eacute;se j&oacute;val radik&aacute;lisabb beavatkoz&aacute;sokat ig&eacute;nyel: val&oacute;sz&iacute;n\u0171leg elker&uuml;lhetetlen a kiterjedtebb m\u0171t&eacute;t, a sug&aacute;rkezel&eacute;s &eacute;s a h&oacute;napokig tart&oacute; gy&oacute;gyszeres ut&oacute;kezel&eacute;s is.<\/p> <p> Noha Magyarorsz&aacute;gon k&eacute;t&eacute;vente sz\u0171r&eacute;sre h&iacute;vnak be minden 45-65 &eacute;v k&ouml;z&ouml;tti n\u0151t a lak&oacute;hely&uuml;k szerint kijel&ouml;lt k&ouml;zpontokba, sajnos csak a beh&iacute;vott n\u0151k mintegy fele jelenik meg rendszeresen, ez&eacute;rt Eur&oacute;p&aacute;ban az eml\u0151r&aacute;k t&uacute;l&eacute;l&eacute;si es&eacute;lye tekintet&eacute;ben haz&aacute;nk a legrosszabbak k&ouml;z&eacute; tartozik: csaknem 3 ezer n\u0151 hal meg &eacute;vente ebben a betegs&eacute;gben.<\/p>","category":"3","active":"1","date_from":"2013-06-19 08:53:49"},"8":{"id":"8","title":"A mellr\u00e1k diagnosztiz\u00e1l\u00e1sa","lead":"Az eml\u0151ben tapintott csom\u00f3k nagy r\u00e9sze j\u00f3indulat\u00fa, de biztons\u00e1ggal csak szakorvosi vizsg\u00e1lat d\u00f6ntheti el, sz\u00fcks\u00e9ges-e kezel\u00e9s vagy sem.","content":"<p> A kivizsg&aacute;l&aacute;s fizik&aacute;lis vizsg&aacute;lattal kezd\u0151dik, melynek fontos r&eacute;sze az eml\u0151k, a h&oacute;nalj &eacute;s a k&ouml;rnyez\u0151 nyirokcsom&oacute;k szakszer\u0171 &aacute;ttapint&aacute;sa.<\/p> <p> A diagn&oacute;zisalkot&aacute;s fontos eleme a k&eacute;palkot&oacute; vizsg&aacute;latok alkalmaz&aacute;sa. Ide tartozik a mammogr&aacute;fia, amely az eml\u0151k r&ouml;ntgenvizsg&aacute;lat&aacute;t jelenti &eacute;s az eml\u0151k ultrahang vizsg&aacute;lata. 30 &eacute;ves kor alatt mammogr&aacute;fia helyett ultrahang vizsg&aacute;latot v&eacute;geznek.<\/p> <p> A mellr&aacute;k diagn&oacute;zis&aacute;nak alapja a sz&ouml;vettani mintav&eacute;tel. A fizik&aacute;lis &eacute;s a mammogr&aacute;fi&aacute;s vizsg&aacute;lattal a gyan&uacute;s ter&uuml;leteket hat&aacute;rozz&aacute;k meg, ahonnan azut&aacute;n a sz&ouml;vettani mintav&eacute;tel t&ouml;rt&eacute;nik.<\/p> <p> A sz&ouml;vettani mintav&eacute;tel (biopszia) sor&aacute;n, egy hossz&uacute; t\u0171vel a b\u0151r&ouml;n kereszt&uuml;l k&ouml;zvetlen&uuml;l az el\u0151z\u0151leg meghat&aacute;rozott, gyan&uacute;s ter&uuml;letekb\u0151l veszik a mint&aacute;t &eacute;rz&eacute;stelen&iacute;t&eacute;s ut&aacute;n. A vizsg&aacute;lat ultrahangos ellen\u0151rz&eacute;s mellett t&ouml;rt&eacute;nik, &iacute;gy a t\u0171 &uacute;tja v&eacute;gig k&ouml;vethet\u0151, pontosabban ir&aacute;ny&iacute;that&oacute;. A mellr&aacute;k diagn&oacute;zis&aacute;nak fel&aacute;ll&iacute;t&aacute;s&aacute;ban d&ouml;nt\u0151 a sz&ouml;vettani eredm&eacute;ny.<\/p> <p> A kivizsg&aacute;l&aacute;s sor&aacute;n v&eacute;rv&eacute;telre &eacute;s egy&eacute;b k&eacute;palkot&oacute; elj&aacute;r&aacute;sok elv&eacute;gz&eacute;s&eacute;re is sor ker&uuml;l, melyek seg&iacute;ts&eacute;g&eacute;vel tiszt&aacute;zhat&oacute; a beteg &aacute;ltal&aacute;nos &aacute;llapota. Sz&uuml;ks&eacute;g szerint elv&eacute;gzett r&ouml;ntgen-, ultrahang (UH), komputertomogr&aacute;fia (CT), m&aacute;gneses rezonancia (MR) &eacute;s izot&oacute;pos (PET, SPECT) vizsg&aacute;latok igazolhatj&aacute;k az &aacute;tt&eacute;tek jelenl&eacute;t&eacute;t. Seg&iacute;ts&eacute;g&uuml;kkel azok pontos elhelyezked&eacute;se &eacute;s m&eacute;rete is meghat&aacute;rozhat&oacute;.<\/p>","category":"3","active":"1","date_from":"2013-06-19 08:53:55"},"9":{"id":"9","title":"A petef\u00e9szek-daganat t\u00fcnetei","lead":"Korai szakaszban a betegs\u00e9g t\u00fcnetszeg\u00e9ny, ezzel magyar\u00e1zhat\u00f3, hogy a petef\u00e9szekr\u00e1kot az esetek 70 sz\u00e1zal\u00e9k\u00e1ban sajnos m\u00e1r el\u0151rehaladott \u00e1llapotban fedezik fel.","content":"<p> Menopauza ut&aacute;n l&eacute;v\u0151 h&ouml;lgyek hasi panaszai h&aacute;tter&eacute;ben erre a betegs&eacute;gre is gondolni kell!<\/p> <p> A daganat el\u0151rehaladottabb szakasz&aacute;ban fell&eacute;p\u0151 t&uuml;netek sem l&aacute;tv&aacute;nyosak, &eacute;s f\u0151k&eacute;nt nem k&oacute;rjelz\u0151k. Ilyen t&uuml;netek lehetnek: hasi &eacute;s kismedencei f&aacute;jdalom, hask&ouml;rfogat n&ouml;veked&eacute;s (ami a k&ouml;ld&ouml;k el\u0151boltosul&aacute;st is eredm&eacute;nyezheti), &eacute;tkez&eacute;skor a szokatlanul kor&aacute;n bek&ouml;vetkez\u0151 j&oacute;llakotts&aacute;g &eacute;rz&eacute;se, gyomor- &eacute;s b&eacute;lpanaszok.<\/p> <p> El\u0151rehaladott &aacute;llapotban vizelet&uuml;r&iacute;t&eacute;si zavarok, sz&eacute;kreked&eacute;s &eacute;s alhasi nyom&aacute;s&eacute;rz&eacute;kenys&eacute;g, a has n&ouml;veked&eacute;se alakulhat ki.<\/p> <p> A n&ouml;vekv\u0151 daganat a petef&eacute;szek megnagyobbod&aacute;s&aacute;t eredm&eacute;nyezi, amely &eacute;szlelhet\u0151 a n\u0151gy&oacute;gy&aacute;szati &eacute;s a n\u0151gy&oacute;gy&aacute;szati ultrahang vizsg&aacute;lat sor&aacute;n. Fontos tudnod, hogy a megnagyobbodott petef&eacute;szek nem azonos a petef&eacute;szekr&aacute;k diagn&oacute;zis&aacute;val, hiszen a j&oacute;indulat&uacute; daganatok is a petef&eacute;szek-megnagyobbod&aacute;s&aacute;hoz vezethetnek, ez&eacute;rt panaszmentess&eacute;g eset&eacute;n is &eacute;vente l&aacute;togass el n\u0151gy&oacute;gy&aacute;szhoz!<\/p>","category":"5","active":"1","date_from":"2013-06-15 00:00:00"},"10":{"id":"10","title":"A petef\u00e9szekr\u00e1k kezel\u00e9se","lead":"A petef\u00e9szekr\u00e1k \u00f6sszes st\u00e1dium\u00e1ban a seb\u00e9szi kezel\u00e9s\u00e9 a vezet\u0151 szerep (melyet nagy gyakorlattal rendelkez\u0151 centrumokban \u00e9rdemes elv\u00e9geztetni).","content":"<p> A diagn&oacute;zis fel&aacute;ll&iacute;t&aacute;sa ut&aacute;n rendszerint hasi m\u0171t&eacute;ti metsz&eacute;s &uacute;tj&aacute;n elt&aacute;vol&iacute;tj&aacute;k a m&eacute;het, a k&eacute;t m&eacute;hk&uuml;rt&ouml;t &eacute;s a petef&eacute;szkeket is. A m\u0171t&eacute;t sor&aacute;n &aacute;tvizsg&aacute;lj&aacute;k a teljes has&uuml;reget &eacute;s ellen\u0151rzik a hasi nyirokcsom&oacute;kat is.<\/p> <p> A m\u0171t&eacute;tnek az el\u0151rehaladott st&aacute;dium&uacute; esetekben is fontos szerepe van, mert min&eacute;l t&ouml;bb daganatsz&ouml;vetet tudnak elt&aacute;vol&iacute;tani a m\u0171t&eacute;t sor&aacute;n, ann&aacute;l hosszabb a betegek t&uacute;l&eacute;l&eacute;se.<\/p> <p> A petef&eacute;szekr&aacute;k kezel&eacute;se a m\u0171t&eacute;ttel nem fejez\u0151dik be. Gyakran sz&uuml;ks&eacute;gess&eacute; v&aacute;lik a m\u0171t&eacute;t ut&aacute;ni kezel&eacute;s. Az esetek t&ouml;bbs&eacute;g&eacute;ben kombin&aacute;ci&oacute;s kemoter&aacute;pi&aacute;t alkalmaznak.<\/p> <p> Mivel a daganatok t&ouml;bbs&eacute;g&eacute;t el\u0151rehaladott st&aacute;diumban fedezik fel, a kemoter&aacute;pi&aacute;s kezel&eacute;s ellen&eacute;re gyakori a ki&uacute;jul&aacute;s, ez&eacute;rt a betegeket gyakori kontroll vizsg&aacute;latra h&iacute;vj&aacute;k vissza: n\u0151gy&oacute;gy&aacute;szati vizsg&aacute;lat, ultrahang, tumor marker- &eacute;s a CT-vizsg&aacute;lat.<\/p> <p> A betegs&eacute;g hat&eacute;konyabb kezel&eacute;s&eacute;nek eredm&eacute;nyek&eacute;nt az elm&uacute;lt &eacute;vtizedben jelent\u0151sen cs&ouml;kkent a petef&eacute;szekr&aacute;k miatti hal&aacute;loz&aacute;s.<\/p>","category":"5","active":"1","date_from":"2013-06-17 00:00:00"},"11":{"id":"11","title":"A melanoma t\u00fcnetei","lead":"Melanoma (rosszindulat\u00fa fest\u00e9kes daganat) eset\u00e9ben nem maga az els\u0151dleges elv\u00e1ltoz\u00e1s a legvesz\u00e9lyesebb, a f\u0151 vesz\u00e9lyt a bel\u0151le agressz\u00edven terjed\u0151, \u00e9s f\u0151k\u00e9pp a m\u00e1jban, az agyban \u00e9s a t\u00fcd\u0151ben megjelen\u0151 \u00e1tt\u00e9tek jelentik.","content":"<p> Fontos, hogy azonnal fordulj orvoshoz, amennyiben egy anyajegyed n\u0151ni kezd, illetve ha:<\/p> <ul> <li> az anyajegyed sz&iacute;ne, fest&eacute;ktartalma megv&aacute;ltozik, egyenetlenn&eacute; v&aacute;lik: k&uuml;l&ouml;nf&eacute;le &aacute;rnyalat&uacute; barna, fekete keveredhet pirosas, feh&eacute;res, r&oacute;zsasz&iacute;n elv&aacute;ltoz&aacute;sokkal;<\/li> <li> megv&aacute;ltozik a felsz&iacute;ne, kiemelkedik, g&ouml;b&ouml;ss&eacute; v&aacute;lik, megvastagszik;<\/li> <li> az alakja aszimmetrikuss&aacute; v&aacute;lik, esetleg &uacute;jabb aszimmetrikus anyajegy jelenik meg b\u0151r&ouml;d&ouml;n;<\/li> <li> megl&eacute;v\u0151 anyajegyednek megv&aacute;ltozik a hat&aacute;ra, n&ouml;veked&eacute;snek indul, terjedni kezd a b\u0151r&ouml;d felsz&iacute;n&eacute;n;<\/li> <li> &uacute;j, kisebb anyajegy jelenik meg a r&eacute;gi mellett, amelyek esetleg egym&aacute;sba mos&oacute;dnak;<\/li> <li> ha megl&eacute;v\u0151 anyajegyed &ouml;sszemegy, kifek&eacute;lyesedik, esetleg v&eacute;rezni kezd.<\/li> <\/ul>","category":"1","active":"1","date_from":"2013-06-15 00:00:00"},"12":{"id":"12","title":"A melanoma kialakul\u00e1sa, rizik\u00f3faktorai","lead":"B\u00e1r a melanoma k\u00fcl\u00f6nf\u00e9le t\u00edpusai a b\u0151rb\u0151l kiindul\u00f3 rosszindulat\u00fa daganatoknak csak kisebb r\u00e9sz\u00e9t teszik ki, m\u00e9gis ezek a legvesz\u00e9lyesebbek. A legfontosabb kock\u00e1zati t\u00e9nyez\u0151kr\u0151l olvashatsz.","content":"<p> A napf&eacute;nyk&aacute;rosod&aacute;s a legfontosabb ok a melanoma kialakul&aacute;sban. Dupl&aacute;j&aacute;ra n\u0151 a kock&aacute;zat a gyermekkori le&eacute;g&eacute;sek (legink&aacute;bb a t&ouml;bbsz&ouml;r&ouml;s &eacute;s h&oacute;lyagos le&eacute;g&eacute;s) miatt. Igen vesz&eacute;lyes az UV-B sug&aacute;rz&aacute;s (term&eacute;szetes &eacute;s mesters&eacute;ges egyar&aacute;nt).<\/p> <p> A b\u0151r t&iacute;pusa is meghat&aacute;roz&oacute;. A nagyon feh&eacute;r b\u0151r fokozott kock&aacute;zatot jelent. A gyorsan lebarnul&oacute; emberekn&eacute;l ritk&aacute;bban l&eacute;p fel a daganat.<\/p> <p> Fokozott kock&aacute;zatot jelentenek az anyajegyek (noha az esetek 70 sz&aacute;zal&eacute;k&aacute;ban a daganat &uacute;jonnan alakul ki), &iacute;gy azok b&aacute;rmilyen jelleg\u0171 megv&aacute;ltoz&aacute;sa (m&eacute;ret, sz&iacute;n, alak, vastags&aacute;g, stb.) eset&eacute;n azonnal fordulj b\u0151rgy&oacute;gy&aacute;szhoz! A szab&aacute;lytalan alak&uacute; anyajegyek is gyan&uacute;sak lehetnek: ezek jellemz\u0151en nagyok, 5 mm-n&eacute;l nagyobb &aacute;tm&eacute;r\u0151j\u0171ek, egyenetlen benn&uuml;k a fest&eacute;kmegoszl&aacute;s &eacute;s egyenetlen szeg&eacute;ly\u0171ek. Egy ilyen anyajegy jelenl&eacute;te k&eacute;tszeres kock&aacute;zatn&ouml;veked&eacute;st jelent.<\/p> <p> A b\u0151rr&aacute;k kialakul&aacute;s&aacute;nak es&eacute;ly&eacute;t n&ouml;veli a csal&aacute;di el\u0151fordul&aacute;s, valamint genetikai faktorok jelenl&eacute;te is.<\/p> <p> Az &eacute;letkor n&ouml;veked&eacute;s&eacute;vel a kock&aacute;zat is egyre n\u0151. Ahogy &ouml;regsz&uuml;nk, a b\u0151rre jut&oacute; napsug&aacute;rz&aacute;s &ouml;sszmennyis&eacute;ge n&ouml;vekszik &eacute;s, emelkedik a daganat kialakul&aacute;s&aacute;nak kock&aacute;zata.<\/p>","category":"1","active":"1","date_from":"2013-06-19 08:59:24"},"13":{"id":"13","title":"A melanoma kezel\u00e9se","lead":"A betegs\u00e9g lefoly\u00e1sa f\u00fcgg att\u00f3l, hogy milyen m\u00e9lyre terjed a tumor, \u00e9s vannak-e nyirokcsom\u00f3ban vagy m\u00e1shol \u00e1tt\u00e9tek.","content":"<p> A t&uacute;l&eacute;l&eacute;s es&eacute;lye ann&aacute;l rosszabb, min&eacute;l m&eacute;lyebbre terjed a daganat. Kezel&eacute;se a korai id\u0151szakban f\u0151k&eacute;nt a seb&eacute;szeti elt&aacute;vol&iacute;t&aacute;s, mely sok esetben teljes gy&oacute;gyul&aacute;shoz vezet. Ha a tumor nem terjedt &aacute;t a region&aacute;lis a nyirokcsom&oacute;kra, akkor j&oacute;k a gy&oacute;gyul&aacute;si es&eacute;lyek.<\/p> <p> A melanoma (rosszindulat&uacute; fest&eacute;kes daganat) kezel&eacute;s&eacute;ben legfontosabb a tumor m\u0171t&eacute;ti elt&aacute;vol&iacute;t&aacute;sa. A daganatot a tumor vastags&aacute;g&aacute;t&oacute;l f&uuml;gg\u0151en 1-3 centim&eacute;teres biztons&aacute;gi z&oacute;n&aacute;val t&aacute;vol&iacute;tj&aacute;k el. Ha a nyirokcsom&oacute;kban &aacute;tt&eacute;t alakult ki, a nyirokcsom&oacute;kat is el kell t&aacute;vol&iacute;tani.<\/p> <p> A seb&eacute;szi kezel&eacute;st immunter&aacute;pia eg&eacute;sz&iacute;ti ki. Nyirokcsom&oacute; &eacute;s t&aacute;voli &aacute;tt&eacute;tekn&eacute;l kemoter&aacute;pi&aacute;t &eacute;s immunter&aacute;pi&aacute;t alkalmaznak, m&iacute;g sug&aacute;rkezel&eacute;st nyirokcsom&oacute;, csont, l&aacute;gyr&eacute;sz, b\u0151r &eacute;s agyi &aacute;tt&eacute;tekn&eacute;l v&eacute;geznek.<\/p> <p> <strong>Gy&oacute;gyul&aacute;si es&eacute;lyek <\/strong><\/p> <p> A betegs&eacute;g kimenetele f&uuml;gg a tumor vastags&aacute;g&aacute;t&oacute;l. A t&uacute;l&eacute;l&eacute;s es&eacute;lye ann&aacute;l rosszabb, min&eacute;l m&eacute;lyebbre terjed a daganat a b\u0151r r&eacute;tegeiben. A t&ouml;rzs&ouml;n, fej-nyaki r&eacute;gi&oacute;ban, talpakon, tenyereken, k&ouml;r&ouml;m&aacute;gyban, k&ouml;r&ouml;m alatt elhelyezked\u0151 tumoroknak rosszabb a progn&oacute;zisuk, mint a v&eacute;gtagokon elhelyezked\u0151knek.<\/p> <p> Az anyajegyek megkisebbedhetnek, esetleg el is t\u0171nhetnek. A (leg)rosszabbak a kil&aacute;t&aacute;sok akkor, amikor &aacute;tt&eacute;tet &eacute;szlelnek a nyirokcsom&oacute;kban vagy t&aacute;voli szervekben.<\/p> <p> Az id\u0151ben felfedezett esetekben &aacute;tlagosan, 90 sz&aacute;zal&eacute;kos gy&oacute;gyul&aacute;shoz vezethet a kezel&eacute;s, nyirokcsom&oacute;-&aacute;tt&eacute;t est&eacute;n viszont az &ouml;t&eacute;ves t&uacute;l&eacute;l&eacute;s es&eacute;lye 40 sz&aacute;zal&eacute;k, t&aacute;voli &aacute;tt&eacute;t jelenl&eacute;te eset&eacute;n 5 sz&aacute;zal&eacute;k.<\/p>","category":"1","active":"1","date_from":"2013-06-19 08:59:30"},"14":{"id":"14","title":"A melanoma diagn\u00f3zisa","lead":"A melanoma kezel\u00e9se ak\u00e1r 95 sz\u00e1zal\u00e9kban sikeres lehet, ha kell\u0151en kor\u00e1n ismerik fel, miel\u0151tt \u00e1tt\u00e9tet k\u00e9pezett volna m\u00e1s szervekre.","content":"<p> A b\u0151rgy&oacute;gy&aacute;sz szakorvos megvizsg&aacute;lja a gyan&uacute;s foltot, anyajegyet a b\u0151r&ouml;n, &eacute;s a k&ouml;zel&eacute;ben l&eacute;v\u0151 nyirokcsom&oacute;kat is. Abban az esetben, ha felmer&uuml;l a melanoma (rosszindulat&uacute; fest&eacute;kes daganat) gyan&uacute;ja, biopszi&aacute;t v&eacute;gez, azaz mint&aacute;t vesz a n&ouml;ved&eacute;kb\u0151l &eacute;s sz&ouml;vettani vizsg&aacute;latra k&uuml;ldi. A biopszia gyors &eacute;s viszonylag egyszer\u0171 elj&aacute;r&aacute;s, amely helyi &eacute;rz&eacute;stelen&iacute;t&eacute;sben t&ouml;rt&eacute;nik.<\/p> <p> Ha a szakorvos &uacute;gy &iacute;t&eacute;li meg, ak&aacute;r a teljes ter&uuml;letet, teh&aacute;t a foltot, anyajegyet elt&aacute;vol&iacute;thatja ebben a f&aacute;zisban, &eacute;s ha ez sikeres volt, akkor az elv&aacute;ltoz&aacute;st eg&eacute;sz&eacute;ben kell elt&aacute;vol&iacute;tani esetleg helyi &eacute;rz&eacute;stelen&iacute;t&eacute;st alkalmazva.<\/p> <p> N&eacute;h&aacute;ny kieg&eacute;sz&iacute;t\u0151 vizsg&aacute;latra m&eacute;g sz&uuml;ks&eacute;g lehet (r&ouml;ntgen, ultrahang vizsg&aacute;lat, nyirokcsom&oacute;-biopszia vagy kimetsz&eacute;s), annak kimutat&aacute;s&aacute;ra, hogy l&eacute;trej&ouml;tt-e &aacute;tt&eacute;tk&eacute;pz\u0151d&eacute;s valamely m&aacute;s szervben.<\/p> <p> <strong>Melanoma gyan&uacute;ja eset&eacute;n az els\u0151dleges tumor elt&aacute;vol&iacute;t&aacute;sa seb&eacute;szi, amelynek alapelve a sz&eacute;les biztons&aacute;gi z&oacute;n&aacute;val t&ouml;rt&eacute;n\u0151 m\u0171t&eacute;t.<\/strong><\/p>","category":"1","active":"1","date_from":"2013-06-19 08:59:36"},"15":{"id":"15","title":"A m\u00e9hnyakr\u00e1k kialakul\u00e1sa, rizik\u00f3faktorai","lead":"A korai st\u00e1diumban felismert m\u00e9hnyakr\u00e1k j\u00f3l kezelhet\u0151 \u00e9s ak\u00e1r v\u00e9gleges gy\u00f3gyul\u00e1s is el\u00e9rhet\u0151, ennek ellen\u00e9re ez a megbeteged\u00e9s napjainkban is kiemelked\u0151 helyet foglal el a hal\u00e1loz\u00e1si statisztik\u00e1kban.","content":"<p> A m&eacute;hnyakr&aacute;k, a m&eacute;hnyak laph&aacute;msejtjeinek rosszindulat&uacute; elfajul&aacute;s&aacute;b&oacute;l kialakul&oacute; daganatf&eacute;les&eacute;g. A m&eacute;hnyakr&aacute;k &uacute;gynevezett daganatmegel\u0151z\u0151 &aacute;llapota a cervicalis intraepitelialis neoplasia (CIN). A CIN a r&aacute;ksz\u0171r&eacute;s sor&aacute;n diagnosztiz&aacute;lhat&oacute;, &eacute;s az idej&eacute;ben v&eacute;gzett beavatkoz&aacute;ssal gy&oacute;gy&iacute;that&oacute;.<\/p> <p> Haz&aacute;nkban &eacute;vente mintegy 1200-1300 &uacute;j m&eacute;hnyakr&aacute;kos esetet fedeznek fel, nagy r&eacute;sze ekkor m&aacute;r el\u0151rehaladott, gy&oacute;gy&iacute;thatatlan st&aacute;diumban van, ennek k&ouml;vetkezt&eacute;ben &eacute;vente kb. 600-an halnak meg. A rossz statisztikai mutat&oacute;k arra vezethet\u0151k vissza, hogy a m&eacute;hnyakr&aacute;ksz\u0171r&eacute;s bevezet&eacute;se &eacute;s ki&eacute;p&iacute;t&eacute;se ellen&eacute;re a n\u0151k jelent\u0151s h&aacute;nyada sajnos nem vesz r&eacute;szt ezen a vizsg&aacute;laton.<\/p> <p> A m&eacute;hnyakr&aacute;k leggyakrabban 35-65 &eacute;ves kor&uacute; n\u0151k k&ouml;r&eacute;ben fordul el\u0151, egyre gyakrabban figyelhet\u0151 meg azonban fiatalabb korban is.<\/p> <p> Kialakul&aacute;s&aacute;ban a hum&aacute;n papilloma v&iacute;rus (HPV) egyes t&iacute;pusainak szerepe bizony&iacute;tott, ezen v&iacute;rusok ugyanis a daganatosan elfajult sz&ouml;vetek 80-90 sz&aacute;zal&eacute;k&aacute;ban kimutathat&oacute;k. A HPV fert\u0151z&eacute;st nagyon k&ouml;nny\u0171 elkapni, ez&eacute;rt k&uuml;l&ouml;n&ouml;sen vesz&eacute;lyes!<\/p> <p> <strong>Mi j&aacute;tszhat k&ouml;zre?<\/strong><\/p> <ul> <li> A HPV r&aacute;kkelt\u0151 vari&aacute;ns&aacute;nak tart&oacute;s jelenl&eacute;te a szervezetben (legal&aacute;bb 6&ndash;12 h&oacute;napon kereszt&uuml;l)<\/li> <li> Genetikai t&eacute;nyez\u0151k<\/li> <li> Doh&aacute;nyz&aacute;s<\/li> <li> Az immunrendszer cs&ouml;kkent m\u0171k&ouml;d&eacute;se<\/li> <li> Sz&aacute;jon &aacute;t szedett fogamz&aacute;sg&aacute;tl&oacute;k folyamatos, tart&oacute;s &ndash; &ouml;t &eacute;vet meghalad&oacute; &ndash; haszn&aacute;lata<\/li> <li> T&ouml;bbsz&ouml;ri terhess&eacute;g<\/li> <li> Kor&aacute;n kezdett akt&iacute;v szexu&aacute;lis &eacute;let<\/li> <li> A testhigi&eacute;nia elhanyagol&aacute;sa<\/li> <li> Nemi &eacute;lettel terjed\u0151 betegs&eacute;gek<\/li> <li> A f&eacute;rfi szexu&aacute;lis partner(ek) HPV-fert\u0151z&ouml;tts&eacute;ge<\/li> <li> A szexu&aacute;lis partnerek gyakori v&aacute;ltogat&aacute;sa<\/li> <\/ul>","category":"4","active":"1","date_from":"2013-06-19 08:56:28"},"16":{"id":"16","title":"A m\u00e9hnyakr\u00e1k t\u00fcnetei","lead":"A betegs\u00e9g sajn\u00e1latos m\u00f3don kezdetben t\u00fcnetmentes, a t\u00fcnetek m\u00e1r csak el\u0151rehaladottabb st\u00e1diumban jelentkeznek, akkor sem minden esetben jellegzetesek, ez\u00e9rt fontos a rendszeres sz\u0171r\u00e9sen val\u00f3 r\u00e9szv\u00e9tel.","content":"<p> B&aacute;r korai st&aacute;diumban a daganat csak elv&eacute;tve okoz panaszokat, a sz\u0171r\u0151vizsg&aacute;lat sor&aacute;n m&aacute;r ilyenkor is l&aacute;that&oacute;k olyan k&oacute;ros elv&aacute;ltoz&aacute;sok, melyek tov&aacute;bbi vizsg&aacute;latokat ig&eacute;nyelnek.<\/p> <p> T&uuml;netek &aacute;ltal&aacute;ban csak az el\u0151rehaladott elv&aacute;ltoz&aacute;sokn&aacute;l jelentkeznek, ezek k&ouml;z&uuml;l a leggyakoribb a b\u0151vebb h&uuml;velyi foly&aacute;s, valamint a szexu&aacute;lis egy&uuml;ttl&eacute;t ut&aacute;n jelentkez\u0151 v&eacute;rz&eacute;s. Ilyenkor a mechanikai behat&aacute;s miatt keletkezik v&eacute;rz&eacute;s a tumor felsz&iacute;n&eacute;r\u0151l.<\/p> <p> A daganat n&ouml;veked&eacute;s&eacute;vel p&aacute;rhuzamosan m&aacute;r spont&aacute;n v&eacute;rz&eacute;s is kialakulhat. El\u0151rehaladott &aacute;llapotban szinte &aacute;lland&oacute; jelleggel b\u0171z&ouml;s, gennyes, v&eacute;res foly&aacute;s &eacute;szlelhet\u0151.<\/p> <p> Abban az esetben, ha a daganat a m&eacute;h&uuml;reget elz&aacute;rja, akkor er\u0151s alhasi f&aacute;jdalmat okozhat a menstru&aacute;ci&oacute;s v&aacute;lad&eacute;k m&eacute;h&uuml;regen bel&uuml;li felgy\u0171l&eacute;se &eacute;s szeptikus &aacute;llapotot eredm&eacute;nyezhet.<\/p> <p> A daganat n&ouml;veked&eacute;s&eacute;vel egyre gyakoribb a der&eacute;kt&aacute;ji f&aacute;jdalom, f&aacute;jdalmass&aacute; v&aacute;lik a k&ouml;z&ouml;s&uuml;l&eacute;s, a sz&eacute;klet- &eacute;s vizelet&uuml;r&iacute;t&eacute;s.<\/p>","category":"4","active":"1","date_from":"2013-06-19 08:56:17"},"17":{"id":"17","title":"Biztos\u00edt\u00e1s: jobb felk\u00e9sz\u00fclni","lead":"A n\u0151i r\u00e1kos megbeteged\u00e9sek vesz\u00e9ly\u00e9t rendszeres sz\u0171r\u0151vizsg\u00e1latokkal \u00e9s eg\u00e9szs\u00e9ges \u00e9letm\u00f3ddal cs\u00f6kkentheted.","content":"<p> A genetikai (csal&aacute;di) h&aacute;tt&eacute;r &eacute;s a k&ouml;rnyezeti &aacute;rtalmak miatt azonban sajnos kialakulhat daganatos megbeteged&eacute;s. Szinte mindannyiunk ismerets&eacute;gi k&ouml;r&eacute;ben akad valaki, aki ilyen betegs&eacute;gben szenved, vagy megk&uuml;zd&ouml;tt vele.<\/p> <p> Ha a baj megt&ouml;rt&eacute;nik, nem a p&eacute;nzzel akarunk foglalkozni, hanem els\u0151sorban a gy&oacute;gyul&aacute;sra szeretn&eacute;nk koncentr&aacute;lni.<\/p> <p> Amennyiben megbetegsz&uuml;nk, sz&aacute;mtalan anyagi k&eacute;rd&eacute;ssel kell szembes&uuml;ln&uuml;nk, a munk&aacute;b&oacute;l val&oacute; hi&aacute;nyz&aacute;s j&ouml;vedelemkies&eacute;ssel j&aacute;r &ndash; hacsak a biztos&iacute;t&aacute;s nem p&oacute;tolja.<\/p> <p> Kevesen tudj&aacute;k, hogy ma m&aacute;r rosszindulat&uacute; daganatos betegs&eacute;gek eset&eacute;re is lehet biztos&iacute;t&aacute;st k&ouml;tni, &iacute;gy &ndash; ha m&aacute;r be is k&ouml;vetkezik a baj &ndash; legal&aacute;bb anyagilag biztos&iacute;tott lehetsz, a munk&aacute;b&oacute;l val&oacute; hi&aacute;nyz&aacute;s okozta j&ouml;vedelem kies&eacute;s is &aacute;thidalhat&oacute;v&aacute; v&aacute;lik el\u0151sz&ouml;r diagnosztiz&aacute;lt rosszindulat&uacute; daganat eset&eacute;n.<\/p> <p> A betegs&eacute;gbiztos&iacute;t&aacute;s fontos r&eacute;sze az &ouml;ngondoskod&aacute;snak, de nem jelenti azt, hogy megtetted a sz&uuml;ks&eacute;ges l&eacute;p&eacute;seket a betegs&eacute;gmegel\u0151z&eacute;s &eacute;rdek&eacute;ben.<\/p>","category":"2","active":"1","date_from":"2013-06-19 09:00:05"},"18":{"id":"18","title":"R\u00e1kmegel\u0151z\u00e9s: b\u0151rv\u00e9delem","lead":"Megtudhatod, melyek azok az \u00e9letm\u00f3dbeli t\u00e9nyez\u0151k, amelyek seg\u00edtenek a melanoma (rosszindulat\u00fa fest\u00e9kes b\u0151rr\u00e1k) kialakul\u00e1s\u00e1nak elker\u00fcl\u00e9s\u00e9ben.","content":"<p> A legjobb m&oacute;dszer a b\u0151r v&eacute;delme a napsug&aacute;rz&aacute;st&oacute;l (a term&eacute;szetest\u0151l &eacute;s a &quot;mesters&eacute;gest\u0151l&quot; egyar&aacute;nt).<\/p> <p> A f\u0151 szempontok:<\/p> <ul> <li> Ne tedd ki b\u0151r&ouml;d intenz&iacute;v napsug&aacute;rz&aacute;snak 10 &eacute;s 16 &oacute;ra k&ouml;z&ouml;tt - azaz ebben az id\u0151szakban ne napozz!<\/li> <li> Haszn&aacute;lj megfelel\u0151 faktor&uacute; (15-&ouml;sn&eacute;l magasabb) naptejet - ak&aacute;r t&eacute;len is! A megfelel\u0151 naptej k&ouml;vetkezetes alkalmaz&aacute;sa m&eacute;g azokn&aacute;l is cs&ouml;kkenti a kock&aacute;zatot, akik kor&aacute;bban sorozatos komoly le&eacute;g&eacute;seket szenvedtek el.<\/li> <li> Ha sok anyajegyed van vagy nagyon feh&eacute;r a b\u0151r&ouml;d, haszn&aacute;lj min&eacute;l magasabb faktorsz&aacute;m&uacute; naptejet, ne tedd ki anyajegyeid s&eacute;r&uuml;l&eacute;svesz&eacute;lynek, ne irrit&aacute;ld \u0151ket (pl. durva anyag&uacute; ruh&aacute;k, s&eacute;r&uuml;l&eacute;svesz&eacute;lyes sportok)!<\/li> <li> Vizsg&aacute;ld meg rendszeresen anyajegyeid &aacute;llapot&aacute;t!<\/li> <li> B\u0151r&ouml;d szakorvossal t&ouml;rt&eacute;n\u0151 &aacute;tn&eacute;zet&eacute;se - f\u0151leg akkor, ha sok anyajegyed van - &eacute;vente akkor is aj&aacute;nlott, ha semmif&eacute;le panaszod nincs, vagy ha nem vett&eacute;l &eacute;szre magadon &uacute;j anyajegyet. A b\u0151rgy&oacute;gy&aacute;sz megvizsg&aacute;lja az anyajegyek szerkezet&eacute;t, s ki tudja sz\u0171rni azokat, amelyek k&eacute;s\u0151bb vesz&eacute;lyess&eacute; v&aacute;lhatnak. Ha id\u0151ben &eacute;szreveszik az elv&aacute;ltoz&aacute;st, akkor a melanoma eset&eacute;ben is igaz az, ami korai felismer&eacute;s eset&eacute;n szinte az &ouml;sszes r&aacute;kt&iacute;pusn&aacute;l: j&oacute; es&eacute;llyel lehet gy&oacute;gy&iacute;tani!<\/li> <\/ul>","category":"2","active":"1","date_from":"2013-06-19 09:00:22"},"19":{"id":"19","title":"R\u00e1kmegel\u0151z\u00e9s \u00e9letm\u00f3ddal","lead":"Minden harmadik r\u00e1kbetegs\u00e9g megel\u0151zhet\u0151 lenne, ez\u00e9rt nagyon fontos, hogy tiszt\u00e1ban legy\u00fcnk a helyes \u00e9letm\u00f3d alapjaival.","content":"<p> <strong>Sz\u0171r&eacute;sek fontoss&aacute;ga<\/strong><\/p> <p> Minden r&aacute;k ann&aacute;l eredm&eacute;nyesebben kezelhet\u0151, min&eacute;l kor&aacute;bbi st&aacute;diumban ker&uuml;l felismer&eacute;sre. A sz\u0171r\u0151vizsg&aacute;latokkal lehets&eacute;ges a r&aacute;kos megbeteged&eacute;s diagn&oacute;zisa, m&eacute;g a k&oacute;ros elv&aacute;ltoz&aacute;s korai &aacute;llapot&aacute;ban. A betegs&eacute;g kimenetele &iacute;gy sokkal kedvez\u0151bb, mint ha m&aacute;r csak a t&uuml;netek jelentkez&eacute;sekor ismert&eacute;k volna fel a k&oacute;rt.<\/p> <p> <strong>Az alkohol, a doh&aacute;nyz&aacute;s &eacute;s a r&aacute;k<\/strong><\/p> <p> Szakmai k&ouml;r&ouml;kben bizony&iacute;tottnak tekintik, hogy a t&uacute;lzott alkoholfogyaszt&aacute;s &eacute;s a doh&aacute;nyz&aacute;s egy&uuml;ttesen n&ouml;veli a mell-, sz&aacute;j&uuml;regi-, g&eacute;ge- nyel\u0151cs\u0151-, &eacute;s nyelvr&aacute;k kialakul&aacute;s&aacute;nak kock&aacute;zat&aacute;t. A r&aacute;kos hal&aacute;loz&aacute;sok egyharmada puszt&aacute;n a doh&aacute;nyz&aacute;s kik&uuml;sz&ouml;b&ouml;l&eacute;s&eacute;vel megel\u0151zhet\u0151 lenne.<\/p> <p> <strong>T&aacute;pl&aacute;lkoz&aacute;s &eacute;s a r&aacute;k<\/strong><\/p> <p> Sz&aacute;mos tanulm&aacute;ny szerint a gy&uuml;m&ouml;lcs&ouml;k, z&ouml;lds&eacute;gf&eacute;l&eacute;k &eacute;s durv&aacute;n h&aacute;ntolt, nem finomra \u0151r&ouml;lt gabonanem\u0171ek fogyaszt&aacute;sa - azok magas rosttartalma miatt - egyes r&aacute;kt&iacute;pusok kifejl\u0151d&eacute;s&eacute;vel szemben kifejezett v&eacute;delmet ny&uacute;jtanak. A k&uuml;l&ouml;nb&ouml;z\u0151 gy&uuml;m&ouml;lcs&ouml;kben &eacute;s z&ouml;lds&eacute;gf&eacute;l&eacute;kben magas koncentr&aacute;ci&oacute;kban el\u0151fordul&oacute; vitaminok &eacute;s nyomelemek szint&eacute;n fontosak ebb\u0151l a szempontb&oacute;l. R&eacute;g&oacute;ta ismert az orvostudom&aacute;nyban, hogy az elh&iacute;z&aacute;s amellett, hogy sz&aacute;mos m&aacute;s megbeteged&eacute;s gyakoribb el\u0151fordul&aacute;s&aacute;t eredm&eacute;nyezi, fokozott kock&aacute;zati t&eacute;nyez\u0151 egyes r&aacute;kf&eacute;les&eacute;gek kialakul&aacute;s&aacute;t illet\u0151en is.<\/p> <p> <strong>Stressz &eacute;s &eacute;letm&oacute;d<\/strong><\/p> <p> Vita t&aacute;rgya, hogy n&eacute;melyik rosszindulat&uacute; daganatos betegs&eacute;g el\u0151fordul&aacute;s&aacute;nak es&eacute;lye hosszantart&oacute; stressz &aacute;llapotokban fokoz&oacute;dik-e, viszont a lelki t&eacute;nyez\u0151knek - mint minden m&aacute;s betegs&eacute;gben - nagy szerepe van a betegs&eacute;gek lefoly&aacute;s&aacute;ban &eacute;s a betegek &eacute;letmin\u0151s&eacute;g&eacute;ben. A kiegyens&uacute;lyozott csal&aacute;di-, lelki- &eacute;s p&aacute;rkapcsolati h&aacute;tt&eacute;r fontos mind a megel\u0151z&eacute;s, mind a gy&oacute;gyul&aacute;s szempontj&aacute;b&oacute;l.<\/p>","category":"2","active":"1","date_from":"2013-06-19 09:00:27"},"20":{"id":"20","title":"A r\u00e1kellenes t\u00e1pl\u00e1lkoz\u00e1s","lead":"Kev\u00e9s s\u00f3, alkohol \u00e9s cukor, ann\u00e1l t\u00f6bb z\u00f6lds\u00e9g \u00e9s gy\u00fcm\u00f6lcs. A gyors\u00e9tkezd\u00e9ket pedig felejtsd el!","content":"<p> Maradj annyira v&eacute;kony, amennyire lehet, de ne vidd t&uacute;lz&aacute;sba: a testt&ouml;meg-index 21 &eacute;s 23 k&ouml;z&ouml;tt ide&aacute;lis.<\/p> <p> Ker&uuml;ld a cukortartalm&uacute; italokat, fogyassz ink&aacute;bb &aacute;sv&aacute;ny- vagy a csapvizet, &eacute;des&iacute;t\u0151szer n&eacute;lk&uuml;li gy&oacute;gyn&ouml;v&eacute;ny- vagy gy&uuml;m&ouml;lcste&aacute;t, gy&uuml;m&ouml;lcslevet. Fogyassz naponta legal&aacute;bb m&aacute;sf&eacute;l liter folyad&eacute;kot &eacute;s naponta legal&aacute;bb 30 gramm rostot: teljes ki\u0151rl&eacute;s\u0171 p&eacute;k&aacute;ruval &eacute;s h&uuml;velyesekkel (pl. z&ouml;ldbab, bors&oacute;) k&ouml;nnyen fedezheted sz&uuml;ks&eacute;gleted, igyekezz minden &eacute;tkez&eacute;skor enni ezekb\u0151l.<\/p> <p> A f&eacute;lk&eacute;sz, el\u0151k&eacute;sz&iacute;tett &eacute;s gyors(&eacute;ttermi) &eacute;lelmiszerek, rengeteg cukrot &eacute;s zs&iacute;rt tartalmaznak, melyek kedveznek a k&uuml;l&ouml;nb&ouml;z\u0151 r&aacute;kos betegs&eacute;gek kialakul&aacute;s&aacute;nak. Ker&uuml;ld a t&uacute;lzottan cs&iacute;p\u0151s &eacute;teleket, a zs&iacute;rad&eacute;kot ne hev&iacute;tsd t&uacute;l &eacute;s ne egy&eacute;l &eacute;gett &eacute;telt!<\/p> <p> Egy&eacute;l sok gy&uuml;m&ouml;lcs&ouml;t &eacute;s z&ouml;lds&eacute;get: a napi &ouml;t &eacute;tkez&eacute;s sor&aacute;n bevitt 650 g az optim&aacute;lis, p&eacute;ld&aacute;ul napi h&aacute;rom adag f\u0151tt z&ouml;lds&eacute;g, sal&aacute;tak&eacute;nt lehet nyers is, majd a m&aacute;sik k&eacute;t &eacute;tkez&eacute;s sor&aacute;n j&ouml;het a gy&uuml;m&ouml;lcs. T&aacute;pl&aacute;lkozz kiegyens&uacute;lyozottan: a term&eacute;szetes &eacute;lelmiszerekben l&eacute;v\u0151 t&aacute;panyagok sokkal hat&aacute;sosabbak, mint a nagy d&oacute;zisban bevitt mesters&eacute;ges vitaminok &eacute;s &aacute;sv&aacute;nyi anyagok.<\/p> <p> Legfeljebb 500 gramm h&uacute;st egy&eacute;l egy h&eacute;ten, a v&ouml;r&ouml;s h&uacute;sok (marha, sert&eacute;s) helyett v&aacute;laszd a baromfit. Ritk&aacute;n fogyassz kolb&aacute;szf&eacute;l&eacute;ket, ker&uuml;ld a s&oacute;zott, p&aacute;colt, f&uuml;st&ouml;lt h&uacute;sokat! Az &eacute;teleket lehet\u0151leg k&ouml;nny\u0171re k&eacute;sz&iacute;tsd el: alacsony h\u0151fokon, kev&eacute;s v&iacute;zzel &eacute;s zsirad&eacute;kkal.<\/p> <p> Cs&ouml;kkentsd a s&oacute;fogyaszt&aacute;st: &iacute;zes&iacute;ts ink&aacute;bb gy&oacute;gy- &eacute;s f\u0171szern&ouml;v&eacute;nyekkel! Ne fogyassz pen&eacute;szes &eacute;teleket, ugyanis a pen&eacute;szben l&eacute;v\u0151 gomb&aacute;k n&ouml;velik a m&aacute;jr&aacute;k kialakul&aacute;s&aacute;nak kock&aacute;zat&aacute;t!<\/p>","category":"2","active":"1","date_from":"2013-06-19 09:00:34"},"21":{"id":"21","title":"R\u00e1k megel\u0151z\u00e9se v\u00e9d\u0151olt\u00e1ssal","lead":"A daganatos betegs\u00e9gek t\u00falnyom\u00f3 t\u00f6bbs\u00e9g\u00e9\u00e9rt k\u00f6rnyezeti szennyez\u00e9s, eg\u00e9szs\u00e9gtelen t\u00e1pl\u00e1lkoz\u00e1s, illetve \u00f6r\u00f6kl\u00f6tt tulajdons\u00e1g felel.","content":"<p> Ugyanakkor bizonyos r&aacute;kfajt&aacute;k kialakul&aacute;s&aacute;&eacute;rt az esetek jelent\u0151s r&eacute;sz&eacute;ben k&oacute;rokoz&oacute;k tehet\u0151k felel\u0151ss&eacute;. Ellen&uuml;k v&eacute;d\u0151olt&aacute;ssal a legegyszer\u0171bb v&eacute;dekezni.<\/p> <p> <strong>Hepatitis-B elleni olt&aacute;s<\/strong><\/p> <p> A hepatitis-B v&iacute;rus (HBV) m&aacute;jgyullad&aacute;st (hepatitist) okoz. A hepatitis-B a vil&aacute;g egyik legelterjedtebb fert\u0151z\u0151 megbeteged&eacute;se. A HBV kr&oacute;nikus m&aacute;jbetegs&eacute;gek, a m&aacute;jzsugor &eacute;s a m&aacute;jr&aacute;k legf\u0151bb okoz&oacute;ja (a hepatitis-C v&iacute;rus mellett).<\/p> <p> A legbiztosabb v&eacute;delmet a HBV elleni v&eacute;d\u0151olt&aacute;s biztos&iacute;tja. A fert\u0151z&eacute;s szempontj&aacute;b&oacute;l fokozott vesz&eacute;lynek kitett egy&eacute;neknek (pl. orvosok, rendszeresen v&eacute;rk&eacute;sz&iacute;tm&eacute;nyt kap&oacute;k, HBV-hordoz&oacute; csal&aacute;dtagjai, intrav&eacute;n&aacute;s drogot haszn&aacute;l&oacute;k), az olt&aacute;s ingyenesen biztos&iacute;tott.<\/p> <p> Kiemelten fontos a HBV fert\u0151z&ouml;tt any&aacute;k &uacute;jsz&uuml;l&ouml;tteinek, k&ouml;zvetlen&uuml;l a sz&uuml;let&eacute;s ut&aacute;n t&ouml;rt&eacute;n\u0151 olt&aacute;sa, &iacute;gy az &uacute;jsz&uuml;l&ouml;ttek megbeteged&eacute;se az estek 90-95 sz&aacute;zal&eacute;k&aacute;ban kiv&eacute;dhet\u0151. Jelenleg k&ouml;telez\u0151, hetedik oszt&aacute;lyosokat oltanak.<\/p> <p> <strong>HPV elleni olt&aacute;s<\/strong><\/p> <p> A m&eacute;hnyakr&aacute;k a m&aacute;sodik leggyakoribb rosszindulat&uacute; daganat, &eacute;s a harmadik helyen &aacute;ll a n\u0151k daganatos hal&aacute;loz&aacute;s&aacute;ban a vil&aacute;gon. A HPV a m&eacute;hnyakr&aacute;k k&oacute;rokoz&oacute;ja, mely ellen l&eacute;tezik m&aacute;r v&eacute;d\u0151olt&aacute;s. A HPV elleni v&eacute;d\u0151olt&aacute;s sz&eacute;les k&ouml;rben javasolt, legide&aacute;lisabb esetben a szexu&aacute;lis &eacute;let megkezd&eacute;se el\u0151tt.<\/p> <p> HPV elleni v&eacute;d\u0151olt&aacute;s szexu&aacute;lisan akt&iacute;v n\u0151k sz&aacute;m&aacute;ra is adhat&oacute;, s\u0151t a HPV elleni olt&aacute;s minden szexu&aacute;lisan akt&iacute;v n\u0151nek aj&aacute;nlott, mivel minden nemi &eacute;letet &eacute;l\u0151 n\u0151 ki van t&eacute;ve a daganatkelt\u0151 HPV-vel t&ouml;rt&eacute;n\u0151 fert\u0151z&eacute;s vesz&eacute;ly&eacute;nek. Sajnos az is nyilv&aacute;nval&oacute;, hogy a daganatkelt\u0151 HPV-fert\u0151z&eacute;s tart&oacute;s megmarad&aacute;s&aacute;nak vesz&eacute;lye az &eacute;letkor el\u0151rehaladt&aacute;val n\u0151.<\/p>","category":"2","active":"1","date_from":"2013-06-19 09:00:38"},"22":{"id":"22","title":"A m\u00e9hnyakr\u00e1k diagnosztiz\u00e1l\u00e1sa","lead":"Rendszeres nemi \u00e9letet \u00e9l\u0151 n\u0151knek a sz\u0171r\u0151vizsg\u00e1laton val\u00f3 r\u00e9szv\u00e9tel \u00e9vente aj\u00e1nlott, egy egyszer\u0171 vizsg\u00e1lattal ugyanis a m\u00e9hnyakr\u00e1k kialakul\u00e1sa megel\u0151zhet\u0151!","content":"<p> A vizsg&aacute;lat sor&aacute;n a n\u0151gy&oacute;gy&aacute;sz el\u0151sz&ouml;r &aacute;ttekinti a k&uuml;ls\u0151 nemi szerveket, ezt k&ouml;vet\u0151en a h&uuml;vely felt&aacute;r&aacute;sa k&ouml;vetkezik. A h&uuml;velyfal &eacute;s a m&eacute;hsz&aacute;j &aacute;tvizsg&aacute;l&aacute;sa colposcoppal t&ouml;rt&eacute;nik, ennek sor&aacute;n &eacute;szlelhet\u0151 a norm&aacute;list&oacute;l elt&eacute;r\u0151 m&eacute;hsz&aacute;ji felsz&iacute;n, mely daganatos elfajul&aacute;sra utalhat.<\/p> <p> A m&eacute;hsz&aacute;j felsz&iacute;n&eacute;r\u0151l t&ouml;rt&eacute;n\u0151 kenetv&eacute;tellel nyert minta mikroszk&oacute;pos vizsg&aacute;lata (cytologia) sor&aacute;n elk&uuml;l&ouml;n&iacute;thet\u0151k az eg&eacute;szs&eacute;ges &eacute;s a k&oacute;ros sejtek. A rutin vizsg&aacute;lat ut&aacute;n a legt&ouml;bb rendel&eacute;sen h&uuml;velyi ultrahangvizsg&aacute;latot is v&eacute;geznek.<\/p> <p> K&oacute;ros m&eacute;hnyak-felsz&iacute;ni elv&aacute;ltoz&aacute;s eset&eacute;n tov&aacute;bbi diagnosztikus l&eacute;p&eacute;s sz&uuml;ks&eacute;ges annak eld&ouml;nt&eacute;s&eacute;re, hogy a l&aacute;tott elv&aacute;ltoz&aacute;s daganatmegel\u0151z\u0151 &aacute;llapot, vagy m&aacute;r kialakult a r&aacute;kos megbeteged&eacute;s. Ezt mintav&eacute;tellel, a conisatioval (a m&eacute;hnyak r&eacute;szleges elt&aacute;vol&iacute;t&aacute;s&aacute;val) lehet eld&ouml;nteni, mely r&ouml;vid, altat&aacute;sban v&eacute;gzett m\u0171t&eacute;t. Ennek sor&aacute;n a m&eacute;hnyakb&oacute;l egy k&uacute;p alak&uacute; r&eacute;szt metszenek ki. Az elt&aacute;vol&iacute;tott sz&ouml;vetdarabnak a sz&ouml;vettani vizsg&aacute;lati eredm&eacute;nye alapj&aacute;n d&ouml;nti el a n\u0151gy&oacute;gy&aacute;sz a tov&aacute;bbi beavatkoz&aacute;s sz&uuml;ks&eacute;gess&eacute;g&eacute;t.<\/p> <p> &Uacute;jabb m\u0171t&eacute;ti beavatkoz&aacute;sra nincs sz&uuml;ks&eacute;g abban az esetben, ha a kimetszett sz&ouml;vetdarabban csak a daganat megel\u0151z\u0151 &aacute;llapota l&aacute;that&oacute; &eacute;s\/vagy a k&oacute;ros elv&aacute;ltoz&aacute;s nem &eacute;ri el a minta sz&eacute;leit (ha el&eacute;ri a sz&eacute;leit akkor is van lehet\u0151s&eacute;g a m&eacute;het megk&iacute;m&eacute;l\u0151, kisebb m\u0171t&eacute;tre (is, ha id\u0151ben felismerik).<\/p> <p> Amennyiben kiterjedt rosszindulat&uacute; daganatot diagnosztiz&aacute;lnak, a m&eacute;helt&aacute;vol&iacute;t&aacute;s nem ker&uuml;lhet\u0151 el, tov&aacute;bbi vizsg&aacute;latokra van sz&uuml;ks&eacute;g annak meg&aacute;llap&iacute;t&aacute;s&aacute;ra, k&eacute;pz\u0151dtek-e &aacute;tt&eacute;tek.<\/p>","category":"4","active":"1","date_from":"2013-06-19 08:57:02"}}';
var aigbordaganat_content='[{"id":"11","title":"A melanoma t\u00fcnetei","lead":"Melanoma (rosszindulat\u00fa fest\u00e9kes daganat) eset\u00e9ben nem maga az els\u0151dleges elv\u00e1ltoz\u00e1s a legvesz\u00e9lyesebb, a f\u0151 vesz\u00e9lyt a bel\u0151le agressz\u00edven terjed\u0151, \u00e9s f\u0151k\u00e9pp a m\u00e1jban, az agyban \u00e9s a t\u00fcd\u0151ben megjelen\u0151 \u00e1tt\u00e9tek jelentik.","content":"<p> Fontos, hogy azonnal fordulj orvoshoz, amennyiben egy anyajegyed n\u0151ni kezd, illetve ha:_<\/p> <ul> <li> az anyajegyed sz&iacute;ne, fest&eacute;ktartalma megv&aacute;ltozik, egyenetlenn&eacute; v&aacute;lik: k&uuml;l&ouml;nf&eacute;le &aacute;rnyalat&uacute; barna, fekete keveredhet pirosas, feh&eacute;res, r&oacute;zsasz&iacute;n elv&aacute;ltoz&aacute;sokkal;<\/li> <li> megv&aacute;ltozik a felsz&iacute;ne, kiemelkedik, g&ouml;b&ouml;ss&eacute; v&aacute;lik, megvastagszik;<\/li> <li> az alakja aszimmetrikuss&aacute; v&aacute;lik, esetleg &uacute;jabb aszimmetrikus anyajegy jelenik meg b\u0151r&ouml;d&ouml;n;<\/li> <li> megl&eacute;v\u0151 anyajegyednek megv&aacute;ltozik a hat&aacute;ra, n&ouml;veked&eacute;snek indul, terjedni kezd a b\u0151r&ouml;d felsz&iacute;n&eacute;n;<\/li> <li> &uacute;j, kisebb anyajegy jelenik meg a r&eacute;gi mellett, amelyek esetleg egym&aacute;sba mos&oacute;dnak;<\/li> <li> ha megl&eacute;v\u0151 anyajegyed &ouml;sszemegy, kifek&eacute;lyesedik, esetleg v&eacute;rezni kezd.<\/li> <\/ul>","category":"1","active":"1","date_from":"2013-06-15 00:00:00"},{"id":"12","title":"A melanoma kialakul\u00e1sa, rizik\u00f3faktorai","lead":"B\u00e1r a melanoma k\u00fcl\u00f6nf\u00e9le t\u00edpusai a b\u0151rb\u0151l kiindul\u00f3 rosszindulat\u00fa daganatoknak csak kisebb r\u00e9sz\u00e9t teszik ki, m\u00e9gis ezek a legvesz\u00e9lyesebbek. A legfontosabb kock\u00e1zati t\u00e9nyez\u0151kr\u0151l olvashatsz.","content":"<p> A napf&eacute;nyk&aacute;rosod&aacute;s a legfontosabb ok a melanoma kialakul&aacute;sban. Dupl&aacute;j&aacute;ra n\u0151 a kock&aacute;zat a gyermekkori le&eacute;g&eacute;sek (legink&aacute;bb a t&ouml;bbsz&ouml;r&ouml;s &eacute;s h&oacute;lyagos le&eacute;g&eacute;s) miatt. Igen vesz&eacute;lyes az UV-B sug&aacute;rz&aacute;s (term&eacute;szetes &eacute;s mesters&eacute;ges egyar&aacute;nt).<\/p> <p> A b\u0151r t&iacute;pusa is meghat&aacute;roz&oacute;. A nagyon feh&eacute;r b\u0151r fokozott kock&aacute;zatot jelent. A gyorsan lebarnul&oacute; emberekn&eacute;l ritk&aacute;bban l&eacute;p fel a daganat.<\/p> <p> Fokozott kock&aacute;zatot jelentenek az anyajegyek (noha az esetek 70 sz&aacute;zal&eacute;k&aacute;ban a daganat &uacute;jonnan alakul ki), &iacute;gy azok b&aacute;rmilyen jelleg\u0171 megv&aacute;ltoz&aacute;sa (m&eacute;ret, sz&iacute;n, alak, vastags&aacute;g, stb.) eset&eacute;n azonnal fordulj b\u0151rgy&oacute;gy&aacute;szhoz! A szab&aacute;lytalan alak&uacute; anyajegyek is gyan&uacute;sak lehetnek: ezek jellemz\u0151en nagyok, 5 mm-n&eacute;l nagyobb &aacute;tm&eacute;r\u0151j\u0171ek, egyenetlen benn&uuml;k a fest&eacute;kmegoszl&aacute;s &eacute;s egyenetlen szeg&eacute;ly\u0171ek. Egy ilyen anyajegy jelenl&eacute;te k&eacute;tszeres kock&aacute;zatn&ouml;veked&eacute;st jelent.<\/p> <p> A b\u0151rr&aacute;k kialakul&aacute;s&aacute;nak es&eacute;ly&eacute;t n&ouml;veli a csal&aacute;di el\u0151fordul&aacute;s, valamint genetikai faktorok jelenl&eacute;te is.<\/p> <p> Az &eacute;letkor n&ouml;veked&eacute;s&eacute;vel a kock&aacute;zat is egyre n\u0151. Ahogy &ouml;regsz&uuml;nk, a b\u0151rre jut&oacute; napsug&aacute;rz&aacute;s &ouml;sszmennyis&eacute;ge n&ouml;vekszik &eacute;s, emelkedik a daganat kialakul&aacute;s&aacute;nak kock&aacute;zata.<\/p>","category":"1","active":"1","date_from":"2013-06-19 08:59:24"},{"id":"13","title":"A melanoma kezel\u00e9se","lead":"A betegs\u00e9g lefoly\u00e1sa f\u00fcgg att\u00f3l, hogy milyen m\u00e9lyre terjed a tumor, \u00e9s vannak-e nyirokcsom\u00f3ban vagy m\u00e1shol \u00e1tt\u00e9tek.","content":"<p> A t&uacute;l&eacute;l&eacute;s es&eacute;lye ann&aacute;l rosszabb, min&eacute;l m&eacute;lyebbre terjed a daganat. Kezel&eacute;se a korai id\u0151szakban f\u0151k&eacute;nt a seb&eacute;szeti elt&aacute;vol&iacute;t&aacute;s, mely sok esetben teljes gy&oacute;gyul&aacute;shoz vezet. Ha a tumor nem terjedt &aacute;t a region&aacute;lis a nyirokcsom&oacute;kra, akkor j&oacute;k a gy&oacute;gyul&aacute;si es&eacute;lyek.<\/p> <p> A melanoma (rosszindulat&uacute; fest&eacute;kes daganat) kezel&eacute;s&eacute;ben legfontosabb a tumor m\u0171t&eacute;ti elt&aacute;vol&iacute;t&aacute;sa. A daganatot a tumor vastags&aacute;g&aacute;t&oacute;l f&uuml;gg\u0151en 1-3 centim&eacute;teres biztons&aacute;gi z&oacute;n&aacute;val t&aacute;vol&iacute;tj&aacute;k el. Ha a nyirokcsom&oacute;kban &aacute;tt&eacute;t alakult ki, a nyirokcsom&oacute;kat is el kell t&aacute;vol&iacute;tani.<\/p> <p> A seb&eacute;szi kezel&eacute;st immunter&aacute;pia eg&eacute;sz&iacute;ti ki. Nyirokcsom&oacute; &eacute;s t&aacute;voli &aacute;tt&eacute;tekn&eacute;l kemoter&aacute;pi&aacute;t &eacute;s immunter&aacute;pi&aacute;t alkalmaznak, m&iacute;g sug&aacute;rkezel&eacute;st nyirokcsom&oacute;, csont, l&aacute;gyr&eacute;sz, b\u0151r &eacute;s agyi &aacute;tt&eacute;tekn&eacute;l v&eacute;geznek.<\/p> <p> <strong>Gy&oacute;gyul&aacute;si es&eacute;lyek <\/strong><\/p> <p> A betegs&eacute;g kimenetele f&uuml;gg a tumor vastags&aacute;g&aacute;t&oacute;l. A t&uacute;l&eacute;l&eacute;s es&eacute;lye ann&aacute;l rosszabb, min&eacute;l m&eacute;lyebbre terjed a daganat a b\u0151r r&eacute;tegeiben. A t&ouml;rzs&ouml;n, fej-nyaki r&eacute;gi&oacute;ban, talpakon, tenyereken, k&ouml;r&ouml;m&aacute;gyban, k&ouml;r&ouml;m alatt elhelyezked\u0151 tumoroknak rosszabb a progn&oacute;zisuk, mint a v&eacute;gtagokon elhelyezked\u0151knek.<\/p> <p> Az anyajegyek megkisebbedhetnek, esetleg el is t\u0171nhetnek. A (leg)rosszabbak a kil&aacute;t&aacute;sok akkor, amikor &aacute;tt&eacute;tet &eacute;szlelnek a nyirokcsom&oacute;kban vagy t&aacute;voli szervekben.<\/p> <p> Az id\u0151ben felfedezett esetekben &aacute;tlagosan, 90 sz&aacute;zal&eacute;kos gy&oacute;gyul&aacute;shoz vezethet a kezel&eacute;s, nyirokcsom&oacute;-&aacute;tt&eacute;t est&eacute;n viszont az &ouml;t&eacute;ves t&uacute;l&eacute;l&eacute;s es&eacute;lye 40 sz&aacute;zal&eacute;k, t&aacute;voli &aacute;tt&eacute;t jelenl&eacute;te eset&eacute;n 5 sz&aacute;zal&eacute;k.<\/p>","category":"1","active":"1","date_from":"2013-06-19 08:59:30"},{"id":"14","title":"A melanoma diagn\u00f3zisa","lead":"A melanoma kezel\u00e9se ak\u00e1r 95 sz\u00e1zal\u00e9kban sikeres lehet, ha kell\u0151en kor\u00e1n ismerik fel, miel\u0151tt \u00e1tt\u00e9tet k\u00e9pezett volna m\u00e1s szervekre.","content":"<p> A b\u0151rgy&oacute;gy&aacute;sz szakorvos megvizsg&aacute;lja a gyan&uacute;s foltot, anyajegyet a b\u0151r&ouml;n, &eacute;s a k&ouml;zel&eacute;ben l&eacute;v\u0151 nyirokcsom&oacute;kat is. Abban az esetben, ha felmer&uuml;l a melanoma (rosszindulat&uacute; fest&eacute;kes daganat) gyan&uacute;ja, biopszi&aacute;t v&eacute;gez, azaz mint&aacute;t vesz a n&ouml;ved&eacute;kb\u0151l &eacute;s sz&ouml;vettani vizsg&aacute;latra k&uuml;ldi. A biopszia gyors &eacute;s viszonylag egyszer\u0171 elj&aacute;r&aacute;s, amely helyi &eacute;rz&eacute;stelen&iacute;t&eacute;sben t&ouml;rt&eacute;nik.<\/p> <p> Ha a szakorvos &uacute;gy &iacute;t&eacute;li meg, ak&aacute;r a teljes ter&uuml;letet, teh&aacute;t a foltot, anyajegyet elt&aacute;vol&iacute;thatja ebben a f&aacute;zisban, &eacute;s ha ez sikeres volt, akkor az elv&aacute;ltoz&aacute;st eg&eacute;sz&eacute;ben kell elt&aacute;vol&iacute;tani esetleg helyi &eacute;rz&eacute;stelen&iacute;t&eacute;st alkalmazva.<\/p> <p> N&eacute;h&aacute;ny kieg&eacute;sz&iacute;t\u0151 vizsg&aacute;latra m&eacute;g sz&uuml;ks&eacute;g lehet (r&ouml;ntgen, ultrahang vizsg&aacute;lat, nyirokcsom&oacute;-biopszia vagy kimetsz&eacute;s), annak kimutat&aacute;s&aacute;ra, hogy l&eacute;trej&ouml;tt-e &aacute;tt&eacute;tk&eacute;pz\u0151d&eacute;s valamely m&aacute;s szervben.<\/p> <p> <strong>Melanoma gyan&uacute;ja eset&eacute;n az els\u0151dleges tumor elt&aacute;vol&iacute;t&aacute;sa seb&eacute;szi, amelynek alapelve a sz&eacute;les biztons&aacute;gi z&oacute;n&aacute;val t&ouml;rt&eacute;n\u0151 m\u0171t&eacute;t.<\/strong><\/p>","category":"1","active":"1","date_from":"2013-06-19 08:59:36"}]';
var aigmegelozes_content='[{"id":"17","title":"Biztos\u00edt\u00e1s: jobb felk\u00e9sz\u00fclni","lead":"A n\u0151i r\u00e1kos megbeteged\u00e9sek vesz\u00e9ly\u00e9t rendszeres sz\u0171r\u0151vizsg\u00e1latokkal \u00e9s eg\u00e9szs\u00e9ges \u00e9letm\u00f3ddal cs\u00f6kkentheted.","content":"<p> A genetikai (csal&aacute;di) h&aacute;tt&eacute;r &eacute;s a k&ouml;rnyezeti &aacute;rtalmak miatt azonban sajnos kialakulhat daganatos megbeteged&eacute;s. Szinte mindannyiunk ismerets&eacute;gi k&ouml;r&eacute;ben akad valaki, aki ilyen betegs&eacute;gben szenved, vagy megk&uuml;zd&ouml;tt vele.<\/p> <p> Ha a baj megt&ouml;rt&eacute;nik, nem a p&eacute;nzzel akarunk foglalkozni, hanem els\u0151sorban a gy&oacute;gyul&aacute;sra szeretn&eacute;nk koncentr&aacute;lni.<\/p> <p> Amennyiben megbetegsz&uuml;nk, sz&aacute;mtalan anyagi k&eacute;rd&eacute;ssel kell szembes&uuml;ln&uuml;nk, a munk&aacute;b&oacute;l val&oacute; hi&aacute;nyz&aacute;s j&ouml;vedelemkies&eacute;ssel j&aacute;r &ndash; hacsak a biztos&iacute;t&aacute;s nem p&oacute;tolja.<\/p> <p> Kevesen tudj&aacute;k, hogy ma m&aacute;r rosszindulat&uacute; daganatos betegs&eacute;gek eset&eacute;re is lehet biztos&iacute;t&aacute;st k&ouml;tni, &iacute;gy &ndash; ha m&aacute;r be is k&ouml;vetkezik a baj &ndash; legal&aacute;bb anyagilag biztos&iacute;tott lehetsz, a munk&aacute;b&oacute;l val&oacute; hi&aacute;nyz&aacute;s okozta j&ouml;vedelem kies&eacute;s is &aacute;thidalhat&oacute;v&aacute; v&aacute;lik el\u0151sz&ouml;r diagnosztiz&aacute;lt rosszindulat&uacute; daganat eset&eacute;n.<\/p> <p> A betegs&eacute;gbiztos&iacute;t&aacute;s fontos r&eacute;sze az &ouml;ngondoskod&aacute;snak, de nem jelenti azt, hogy megtetted a sz&uuml;ks&eacute;ges l&eacute;p&eacute;seket a betegs&eacute;gmegel\u0151z&eacute;s &eacute;rdek&eacute;ben.<\/p>","category":"2","active":"1","date_from":"2013-06-19 09:00:05"},{"id":"18","title":"R\u00e1kmegel\u0151z\u00e9s: b\u0151rv\u00e9delem","lead":"Megtudhatod, melyek azok az \u00e9letm\u00f3dbeli t\u00e9nyez\u0151k, amelyek seg\u00edtenek a melanoma (rosszindulat\u00fa fest\u00e9kes b\u0151rr\u00e1k) kialakul\u00e1s\u00e1nak elker\u00fcl\u00e9s\u00e9ben.","content":"<p> A legjobb m&oacute;dszer a b\u0151r v&eacute;delme a napsug&aacute;rz&aacute;st&oacute;l (a term&eacute;szetest\u0151l &eacute;s a &quot;mesters&eacute;gest\u0151l&quot; egyar&aacute;nt).<\/p> <p> A f\u0151 szempontok:<\/p> <ul> <li> Ne tedd ki b\u0151r&ouml;d intenz&iacute;v napsug&aacute;rz&aacute;snak 10 &eacute;s 16 &oacute;ra k&ouml;z&ouml;tt - azaz ebben az id\u0151szakban ne napozz!<\/li> <li> Haszn&aacute;lj megfelel\u0151 faktor&uacute; (15-&ouml;sn&eacute;l magasabb) naptejet - ak&aacute;r t&eacute;len is! A megfelel\u0151 naptej k&ouml;vetkezetes alkalmaz&aacute;sa m&eacute;g azokn&aacute;l is cs&ouml;kkenti a kock&aacute;zatot, akik kor&aacute;bban sorozatos komoly le&eacute;g&eacute;seket szenvedtek el.<\/li> <li> Ha sok anyajegyed van vagy nagyon feh&eacute;r a b\u0151r&ouml;d, haszn&aacute;lj min&eacute;l magasabb faktorsz&aacute;m&uacute; naptejet, ne tedd ki anyajegyeid s&eacute;r&uuml;l&eacute;svesz&eacute;lynek, ne irrit&aacute;ld \u0151ket (pl. durva anyag&uacute; ruh&aacute;k, s&eacute;r&uuml;l&eacute;svesz&eacute;lyes sportok)!<\/li> <li> Vizsg&aacute;ld meg rendszeresen anyajegyeid &aacute;llapot&aacute;t!<\/li> <li> B\u0151r&ouml;d szakorvossal t&ouml;rt&eacute;n\u0151 &aacute;tn&eacute;zet&eacute;se - f\u0151leg akkor, ha sok anyajegyed van - &eacute;vente akkor is aj&aacute;nlott, ha semmif&eacute;le panaszod nincs, vagy ha nem vett&eacute;l &eacute;szre magadon &uacute;j anyajegyet. A b\u0151rgy&oacute;gy&aacute;sz megvizsg&aacute;lja az anyajegyek szerkezet&eacute;t, s ki tudja sz\u0171rni azokat, amelyek k&eacute;s\u0151bb vesz&eacute;lyess&eacute; v&aacute;lhatnak. Ha id\u0151ben &eacute;szreveszik az elv&aacute;ltoz&aacute;st, akkor a melanoma eset&eacute;ben is igaz az, ami korai felismer&eacute;s eset&eacute;n szinte az &ouml;sszes r&aacute;kt&iacute;pusn&aacute;l: j&oacute; es&eacute;llyel lehet gy&oacute;gy&iacute;tani!<\/li> <\/ul>","category":"2","active":"1","date_from":"2013-06-19 09:00:22"},{"id":"19","title":"R\u00e1kmegel\u0151z\u00e9s \u00e9letm\u00f3ddal","lead":"Minden harmadik r\u00e1kbetegs\u00e9g megel\u0151zhet\u0151 lenne, ez\u00e9rt nagyon fontos, hogy tiszt\u00e1ban legy\u00fcnk a helyes \u00e9letm\u00f3d alapjaival.","content":"<p> <strong>Sz\u0171r&eacute;sek fontoss&aacute;ga<\/strong><\/p> <p> Minden r&aacute;k ann&aacute;l eredm&eacute;nyesebben kezelhet\u0151, min&eacute;l kor&aacute;bbi st&aacute;diumban ker&uuml;l felismer&eacute;sre. A sz\u0171r\u0151vizsg&aacute;latokkal lehets&eacute;ges a r&aacute;kos megbeteged&eacute;s diagn&oacute;zisa, m&eacute;g a k&oacute;ros elv&aacute;ltoz&aacute;s korai &aacute;llapot&aacute;ban. A betegs&eacute;g kimenetele &iacute;gy sokkal kedvez\u0151bb, mint ha m&aacute;r csak a t&uuml;netek jelentkez&eacute;sekor ismert&eacute;k volna fel a k&oacute;rt.<\/p> <p> <strong>Az alkohol, a doh&aacute;nyz&aacute;s &eacute;s a r&aacute;k<\/strong><\/p> <p> Szakmai k&ouml;r&ouml;kben bizony&iacute;tottnak tekintik, hogy a t&uacute;lzott alkoholfogyaszt&aacute;s &eacute;s a doh&aacute;nyz&aacute;s egy&uuml;ttesen n&ouml;veli a mell-, sz&aacute;j&uuml;regi-, g&eacute;ge- nyel\u0151cs\u0151-, &eacute;s nyelvr&aacute;k kialakul&aacute;s&aacute;nak kock&aacute;zat&aacute;t. A r&aacute;kos hal&aacute;loz&aacute;sok egyharmada puszt&aacute;n a doh&aacute;nyz&aacute;s kik&uuml;sz&ouml;b&ouml;l&eacute;s&eacute;vel megel\u0151zhet\u0151 lenne.<\/p> <p> <strong>T&aacute;pl&aacute;lkoz&aacute;s &eacute;s a r&aacute;k<\/strong><\/p> <p> Sz&aacute;mos tanulm&aacute;ny szerint a gy&uuml;m&ouml;lcs&ouml;k, z&ouml;lds&eacute;gf&eacute;l&eacute;k &eacute;s durv&aacute;n h&aacute;ntolt, nem finomra \u0151r&ouml;lt gabonanem\u0171ek fogyaszt&aacute;sa - azok magas rosttartalma miatt - egyes r&aacute;kt&iacute;pusok kifejl\u0151d&eacute;s&eacute;vel szemben kifejezett v&eacute;delmet ny&uacute;jtanak. A k&uuml;l&ouml;nb&ouml;z\u0151 gy&uuml;m&ouml;lcs&ouml;kben &eacute;s z&ouml;lds&eacute;gf&eacute;l&eacute;kben magas koncentr&aacute;ci&oacute;kban el\u0151fordul&oacute; vitaminok &eacute;s nyomelemek szint&eacute;n fontosak ebb\u0151l a szempontb&oacute;l. R&eacute;g&oacute;ta ismert az orvostudom&aacute;nyban, hogy az elh&iacute;z&aacute;s amellett, hogy sz&aacute;mos m&aacute;s megbeteged&eacute;s gyakoribb el\u0151fordul&aacute;s&aacute;t eredm&eacute;nyezi, fokozott kock&aacute;zati t&eacute;nyez\u0151 egyes r&aacute;kf&eacute;les&eacute;gek kialakul&aacute;s&aacute;t illet\u0151en is.<\/p> <p> <strong>Stressz &eacute;s &eacute;letm&oacute;d<\/strong><\/p> <p> Vita t&aacute;rgya, hogy n&eacute;melyik rosszindulat&uacute; daganatos betegs&eacute;g el\u0151fordul&aacute;s&aacute;nak es&eacute;lye hosszantart&oacute; stressz &aacute;llapotokban fokoz&oacute;dik-e, viszont a lelki t&eacute;nyez\u0151knek - mint minden m&aacute;s betegs&eacute;gben - nagy szerepe van a betegs&eacute;gek lefoly&aacute;s&aacute;ban &eacute;s a betegek &eacute;letmin\u0151s&eacute;g&eacute;ben. A kiegyens&uacute;lyozott csal&aacute;di-, lelki- &eacute;s p&aacute;rkapcsolati h&aacute;tt&eacute;r fontos mind a megel\u0151z&eacute;s, mind a gy&oacute;gyul&aacute;s szempontj&aacute;b&oacute;l.<\/p>","category":"2","active":"1","date_from":"2013-06-19 09:00:27"},{"id":"20","title":"A r\u00e1kellenes t\u00e1pl\u00e1lkoz\u00e1s","lead":"Kev\u00e9s s\u00f3, alkohol \u00e9s cukor, ann\u00e1l t\u00f6bb z\u00f6lds\u00e9g \u00e9s gy\u00fcm\u00f6lcs. A gyors\u00e9tkezd\u00e9ket pedig felejtsd el!","content":"<p> Maradj annyira v&eacute;kony, amennyire lehet, de ne vidd t&uacute;lz&aacute;sba: a testt&ouml;meg-index 21 &eacute;s 23 k&ouml;z&ouml;tt ide&aacute;lis.<\/p> <p> Ker&uuml;ld a cukortartalm&uacute; italokat, fogyassz ink&aacute;bb &aacute;sv&aacute;ny- vagy a csapvizet, &eacute;des&iacute;t\u0151szer n&eacute;lk&uuml;li gy&oacute;gyn&ouml;v&eacute;ny- vagy gy&uuml;m&ouml;lcste&aacute;t, gy&uuml;m&ouml;lcslevet. Fogyassz naponta legal&aacute;bb m&aacute;sf&eacute;l liter folyad&eacute;kot &eacute;s naponta legal&aacute;bb 30 gramm rostot: teljes ki\u0151rl&eacute;s\u0171 p&eacute;k&aacute;ruval &eacute;s h&uuml;velyesekkel (pl. z&ouml;ldbab, bors&oacute;) k&ouml;nnyen fedezheted sz&uuml;ks&eacute;gleted, igyekezz minden &eacute;tkez&eacute;skor enni ezekb\u0151l.<\/p> <p> A f&eacute;lk&eacute;sz, el\u0151k&eacute;sz&iacute;tett &eacute;s gyors(&eacute;ttermi) &eacute;lelmiszerek, rengeteg cukrot &eacute;s zs&iacute;rt tartalmaznak, melyek kedveznek a k&uuml;l&ouml;nb&ouml;z\u0151 r&aacute;kos betegs&eacute;gek kialakul&aacute;s&aacute;nak. Ker&uuml;ld a t&uacute;lzottan cs&iacute;p\u0151s &eacute;teleket, a zs&iacute;rad&eacute;kot ne hev&iacute;tsd t&uacute;l &eacute;s ne egy&eacute;l &eacute;gett &eacute;telt!<\/p> <p> Egy&eacute;l sok gy&uuml;m&ouml;lcs&ouml;t &eacute;s z&ouml;lds&eacute;get: a napi &ouml;t &eacute;tkez&eacute;s sor&aacute;n bevitt 650 g az optim&aacute;lis, p&eacute;ld&aacute;ul napi h&aacute;rom adag f\u0151tt z&ouml;lds&eacute;g, sal&aacute;tak&eacute;nt lehet nyers is, majd a m&aacute;sik k&eacute;t &eacute;tkez&eacute;s sor&aacute;n j&ouml;het a gy&uuml;m&ouml;lcs. T&aacute;pl&aacute;lkozz kiegyens&uacute;lyozottan: a term&eacute;szetes &eacute;lelmiszerekben l&eacute;v\u0151 t&aacute;panyagok sokkal hat&aacute;sosabbak, mint a nagy d&oacute;zisban bevitt mesters&eacute;ges vitaminok &eacute;s &aacute;sv&aacute;nyi anyagok.<\/p> <p> Legfeljebb 500 gramm h&uacute;st egy&eacute;l egy h&eacute;ten, a v&ouml;r&ouml;s h&uacute;sok (marha, sert&eacute;s) helyett v&aacute;laszd a baromfit. Ritk&aacute;n fogyassz kolb&aacute;szf&eacute;l&eacute;ket, ker&uuml;ld a s&oacute;zott, p&aacute;colt, f&uuml;st&ouml;lt h&uacute;sokat! Az &eacute;teleket lehet\u0151leg k&ouml;nny\u0171re k&eacute;sz&iacute;tsd el: alacsony h\u0151fokon, kev&eacute;s v&iacute;zzel &eacute;s zsirad&eacute;kkal.<\/p> <p> Cs&ouml;kkentsd a s&oacute;fogyaszt&aacute;st: &iacute;zes&iacute;ts ink&aacute;bb gy&oacute;gy- &eacute;s f\u0171szern&ouml;v&eacute;nyekkel! Ne fogyassz pen&eacute;szes &eacute;teleket, ugyanis a pen&eacute;szben l&eacute;v\u0151 gomb&aacute;k n&ouml;velik a m&aacute;jr&aacute;k kialakul&aacute;s&aacute;nak kock&aacute;zat&aacute;t!<\/p>","category":"2","active":"1","date_from":"2013-06-19 09:00:34"},{"id":"21","title":"R\u00e1k megel\u0151z\u00e9se v\u00e9d\u0151olt\u00e1ssal","lead":"A daganatos betegs\u00e9gek t\u00falnyom\u00f3 t\u00f6bbs\u00e9g\u00e9\u00e9rt k\u00f6rnyezeti szennyez\u00e9s, eg\u00e9szs\u00e9gtelen t\u00e1pl\u00e1lkoz\u00e1s, illetve \u00f6r\u00f6kl\u00f6tt tulajdons\u00e1g felel.","content":"<p> Ugyanakkor bizonyos r&aacute;kfajt&aacute;k kialakul&aacute;s&aacute;&eacute;rt az esetek jelent\u0151s r&eacute;sz&eacute;ben k&oacute;rokoz&oacute;k tehet\u0151k felel\u0151ss&eacute;. Ellen&uuml;k v&eacute;d\u0151olt&aacute;ssal a legegyszer\u0171bb v&eacute;dekezni.<\/p> <p> <strong>Hepatitis-B elleni olt&aacute;s<\/strong><\/p> <p> A hepatitis-B v&iacute;rus (HBV) m&aacute;jgyullad&aacute;st (hepatitist) okoz. A hepatitis-B a vil&aacute;g egyik legelterjedtebb fert\u0151z\u0151 megbeteged&eacute;se. A HBV kr&oacute;nikus m&aacute;jbetegs&eacute;gek, a m&aacute;jzsugor &eacute;s a m&aacute;jr&aacute;k legf\u0151bb okoz&oacute;ja (a hepatitis-C v&iacute;rus mellett).<\/p> <p> A legbiztosabb v&eacute;delmet a HBV elleni v&eacute;d\u0151olt&aacute;s biztos&iacute;tja. A fert\u0151z&eacute;s szempontj&aacute;b&oacute;l fokozott vesz&eacute;lynek kitett egy&eacute;neknek (pl. orvosok, rendszeresen v&eacute;rk&eacute;sz&iacute;tm&eacute;nyt kap&oacute;k, HBV-hordoz&oacute; csal&aacute;dtagjai, intrav&eacute;n&aacute;s drogot haszn&aacute;l&oacute;k), az olt&aacute;s ingyenesen biztos&iacute;tott.<\/p> <p> Kiemelten fontos a HBV fert\u0151z&ouml;tt any&aacute;k &uacute;jsz&uuml;l&ouml;tteinek, k&ouml;zvetlen&uuml;l a sz&uuml;let&eacute;s ut&aacute;n t&ouml;rt&eacute;n\u0151 olt&aacute;sa, &iacute;gy az &uacute;jsz&uuml;l&ouml;ttek megbeteged&eacute;se az estek 90-95 sz&aacute;zal&eacute;k&aacute;ban kiv&eacute;dhet\u0151. Jelenleg k&ouml;telez\u0151, hetedik oszt&aacute;lyosokat oltanak.<\/p> <p> <strong>HPV elleni olt&aacute;s<\/strong><\/p> <p> A m&eacute;hnyakr&aacute;k a m&aacute;sodik leggyakoribb rosszindulat&uacute; daganat, &eacute;s a harmadik helyen &aacute;ll a n\u0151k daganatos hal&aacute;loz&aacute;s&aacute;ban a vil&aacute;gon. A HPV a m&eacute;hnyakr&aacute;k k&oacute;rokoz&oacute;ja, mely ellen l&eacute;tezik m&aacute;r v&eacute;d\u0151olt&aacute;s. A HPV elleni v&eacute;d\u0151olt&aacute;s sz&eacute;les k&ouml;rben javasolt, legide&aacute;lisabb esetben a szexu&aacute;lis &eacute;let megkezd&eacute;se el\u0151tt.<\/p> <p> HPV elleni v&eacute;d\u0151olt&aacute;s szexu&aacute;lisan akt&iacute;v n\u0151k sz&aacute;m&aacute;ra is adhat&oacute;, s\u0151t a HPV elleni olt&aacute;s minden szexu&aacute;lisan akt&iacute;v n\u0151nek aj&aacute;nlott, mivel minden nemi &eacute;letet &eacute;l\u0151 n\u0151 ki van t&eacute;ve a daganatkelt\u0151 HPV-vel t&ouml;rt&eacute;n\u0151 fert\u0151z&eacute;s vesz&eacute;ly&eacute;nek. Sajnos az is nyilv&aacute;nval&oacute;, hogy a daganatkelt\u0151 HPV-fert\u0151z&eacute;s tart&oacute;s megmarad&aacute;s&aacute;nak vesz&eacute;lye az &eacute;letkor el\u0151rehaladt&aacute;val n\u0151.<\/p>","category":"2","active":"1","date_from":"2013-06-19 09:00:38"}]';
var aigmellrak_content='[{"id":"2","title":"A mellr\u00e1k t\u00fcnetei","lead":"Az eml\u0151ben tapintott csom\u00f3k legnagyobb r\u00e9sze j\u00f3indulat\u00fa, ugyanakkor biztons\u00e1ggal csak szakorvosi vizsg\u00e1lattal lehet eld\u00f6nteni, hogy j\u00f3 vagy rosszindulat\u00fa folyamatr\u00f3l van sz\u00f3 \u00e9s sz\u00fcks\u00e9ges-e a kezel\u00e9s. Az \u00f6nvizsg\u00e1lat \u00e9letet menthet!","content":"<p> A legjellemz\u0151bb t&uuml;net, hogy csom&oacute; tapinthat&oacute; az eml\u0151ben. Az esetek 80 sz&aacute;zal&eacute;k&aacute;ban azonban ez nem jelent rosszindulat&uacute; elv&aacute;ltoz&aacute;st.<\/p> <p> A mellr&aacute;kra &aacute;ltal&aacute;ban jellemz\u0151, hogy a daganat n&ouml;veked&eacute;s&eacute;vel az eml\u0151 alakja &eacute;s m&eacute;rete megv&aacute;ltozik, ekkor azonban m&aacute;r nagy a baj, ez&eacute;rt a korai t&uuml;netek felismer&eacute;se (&ouml;nellen\u0151rz&eacute;s!) &eacute;s a rendszeres sz\u0171r&eacute;seken val&oacute; r&eacute;szv&eacute;tel (mammogr&aacute;fia, ultrahang) &eacute;letment\u0151 lehet.<\/p> <p> Az eml\u0151b\u0151l v&aacute;lad&eacute;k t&aacute;vozhat. Azokban az esetekben, ha a daganat b\u0151rrel kapaszkodik &ouml;ssze, akkor beh&uacute;z&oacute;d&aacute;sokat okozhat, az eml\u0151bimb&oacute;t befel&eacute; ford&iacute;thatja, &eacute;s helyzet&eacute;t &uacute;gy r&ouml;gz&iacute;ti. K&eacute;s\u0151bb a b\u0151r kifek&eacute;lyesedik. A f&aacute;jdalom nem jellemz\u0151, &eacute;s korai szakaszban csak az esetek kb. 10 sz&aacute;zal&eacute;k&aacute;ban jelentkezik.<\/p> <p> Nagyon fontos t&uuml;net a tapinthat&oacute;, jellegzetes sz&ouml;vett&ouml;bblet. A b\u0151rfelsz&iacute;n egyenetlens&eacute;ge, beh&uacute;z&oacute;d&aacute;sa, kidudorod&aacute;sa, kifek&eacute;lyesed&eacute;se, &eacute;s a duzzadt, kanyarg&oacute;s v&eacute;n&aacute;k megjelen&eacute;se az eml\u0151n szint&eacute;n figyelmeztet\u0151 jelek.<\/p> <p> K&eacute;s\u0151i st&aacute;dium&aacute;ban a t&uuml;neteket f\u0151k&eacute;nt az &aacute;tt&eacute;tek okozz&aacute;k (els\u0151dlegesek a nyirokcsom&oacute; &aacute;tt&eacute;tek, ut&aacute;na csont, t&uuml;d\u0151, m&aacute;j, idegrendszer, mell&eacute;kvese, petef&eacute;szek). A csont&aacute;tt&eacute;tek f&aacute;jdalmas t&ouml;r&eacute;sekkel j&aacute;rnak. A t&uuml;d\u0151 &aacute;tt&eacute;tei fokoz&oacute;d&oacute; l&eacute;gz&eacute;si &eacute;s kering&eacute;si el&eacute;gtelens&eacute;get v&aacute;ltanak ki. A t&uuml;d\u0151betegs&eacute;g el\u0151rehalad&aacute;s&aacute;t fel-fellobban&oacute; gyullad&aacute;sok, fert\u0151z&eacute;sek siettetik.<\/p>","category":"3","active":"1","date_from":"2013-06-19 08:52:30"},{"id":"3","title":"A mellr\u00e1k kialakul\u00e1sa, rizik\u00f3faktorai","lead":"Napjainkra a mellr\u00e1kkal kapcsolatos sz\u00e1mos hajlamos\u00edt\u00f3 t\u00e9nyez\u0151t siker\u00fclt azonos\u00edtani.","content":"<p> Az eml\u0151r&aacute;k kialakul&aacute;s&aacute;nak es&eacute;lye a menopauz&aacute;ig (v&aacute;ltoz&oacute; kor, klimax), minden &eacute;vtizedben a k&eacute;tszeres&eacute;re n\u0151.<\/p> <p> A mellr&aacute;kok egy r&eacute;sz&eacute;nek kialakul&aacute;sa &eacute;s n&ouml;veked&eacute;se, f&uuml;gg a n\u0151i nemi hormonok, els\u0151sorban az &ouml;sztrog&eacute;n jelenl&eacute;t&eacute;t\u0151l &eacute;s szintj&eacute;t\u0151l. A szervezet magasabb &ouml;sztrog&eacute;nszintje, fogamz&aacute;sg&aacute;tl&oacute; hossz&uacute; ideig tart&oacute; szed&eacute;se fokozza a kock&aacute;zatot.<\/p> <p> A nem sz&uuml;lt n\u0151k, vagy azok a n\u0151k, akik nem szoptattak, szint&eacute;n nagyobb kock&aacute;zatnak vannak kit&eacute;ve.<\/p> <p> Az elh&iacute;z&aacute;s &eacute;s az alkoholizmus k&ouml;zvetve - a hormonrendszer befoly&aacute;sol&aacute;sa r&eacute;v&eacute;n - szint&eacute;n kock&aacute;zatn&ouml;vel\u0151 szerepet t&ouml;lt be.<\/p> <p> A helytelen t&aacute;pl&aacute;lkoz&aacute;si szok&aacute;sok is hajlamos&iacute;thatnak a mellr&aacute;k kialakul&aacute;s&aacute;ra. A k&eacute;sz&eacute;telek t&uacute;lzott m&eacute;rt&eacute;k\u0171 fogyaszt&aacute;sa, a z&ouml;lds&eacute;g- &eacute;s gy&uuml;m&ouml;lcsf&eacute;l&eacute;k alacsony ar&aacute;nya az &eacute;tkez&eacute;sben, a kev&eacute;s rostbevitel mind-mind kedvez a daganat kialakul&aacute;s&aacute;nak.<\/p> <p> Legl&eacute;nyegesebb eleme a rizik&oacute;faktoroknak az &ouml;r&ouml;kl\u0151d&eacute;s, a genetika szerepe. Azokn&aacute;l a n\u0151kn&eacute;l, akiknek rokonai k&ouml;r&eacute;ben fordult el\u0151 eml\u0151r&aacute;k, nagyobb a betegs&eacute;g kifejl\u0151d&eacute;s&eacute;nek a val&oacute;sz&iacute;n\u0171s&eacute;ge.<\/p> <p> A genetikai faktorok jelent\u0151s&eacute;g&eacute;t bizonyos g&eacute;nbeli elt&eacute;r&eacute;sek jelenl&eacute;te igazolja. A mellr&aacute;k&eacute;rt az &uacute;gynevezett BRCA-1 &eacute;s BRCA-2 nev\u0171 g&eacute;n v&aacute;ltoz&aacute;sa tehet\u0151 felel\u0151ss&eacute;. A bek&ouml;vetkez\u0151 k&aacute;rosod&aacute;s miatt a k&aacute;rosodott sejtek daganatosan &aacute;talakulnak, azaz k&oacute;ros &eacute;s korl&aacute;tlan szaporod&aacute;sra lesznek k&eacute;pesek. Az &iacute;gy keletkezett sejtszaporulat alkotja mag&aacute;t a rosszindulat&uacute; daganatot.<\/p>","category":"3","active":"1","date_from":"2013-06-19 08:52:45"},{"id":"7","title":"A mellr\u00e1kos beteg kil\u00e1t\u00e1sai","lead":"Az eml\u0151r\u00e1k a magyar n\u0151kn\u00e9l mind el\u0151fordul\u00e1si mind hal\u00e1loz\u00e1si sz\u00e1mban az els\u0151 helyek egyik\u00e9n szerepel.","content":"<p> A betegs&eacute;g ann&aacute;l nagyobb es&eacute;llyel &eacute;s a beteg ann&aacute;l kisebb megterhel&eacute;s&eacute;vel kezelhet\u0151, min&eacute;l kor&aacute;bban felismerik, &eacute;s a kezel&eacute;st a diagn&oacute;zis ut&aacute;n mihamarabb el is kezdik.<\/p> <p> A rosszindulat&uacute; daganatos sejtek saj&aacute;toss&aacute;ga, hogy folyamatos n&ouml;veked&eacute;s&uuml;k sor&aacute;n egy bizonyos id\u0151pontban kiindul&aacute;si hely&uuml;kr\u0151l a k&ouml;rnyezet&uuml;kbe t&ouml;rnek, majd onnan a hajsz&aacute;l- &eacute;s nyirokerekbe hatolva a szervezet m&aacute;s ter&uuml;leteire sodr&oacute;dnak el. Ott megtapadnak, &eacute;s &uacute;jra szaporodva &uacute;jabb daganatos g&oacute;cokat alkotnak (&aacute;tt&eacute;t-k&eacute;pz\u0151d&eacute;s). A sz\u0171r&eacute;s c&eacute;lja az, hogy mihamarabb felfedezz&uuml;k a m&eacute;g kism&eacute;ret\u0171 daganatot, mely ilyenkor m&eacute;g panaszt nem okozva, &eacute;szrev&eacute;tlen&uuml;l b&uacute;jik meg. Kicsi, 5 mm-es eml\u0151r&aacute;k eset&eacute;n az &aacute;tt&eacute;t-k&eacute;pz\u0151d&eacute;s val&oacute;sz&iacute;n\u0171s&eacute;ge m&eacute;g 10 sz&aacute;zal&eacute;k alatt van, m&iacute;g egy elhanyagolt (35-50 mm-es) eml\u0151r&aacute;k eset&eacute;n m&aacute;r 75-80 sz&aacute;zal&eacute;k es&eacute;ly van arra, hogy valahol m&aacute;r &aacute;tt&eacute;t keletkezett!<\/p> <p> Sz\u0171r\u0151vizsg&aacute;latok n&eacute;lk&uuml;l sok id\u0151t vesztegethet&uuml;nk el a v&eacute;gleges gy&oacute;gyul&aacute;s lehet\u0151s&eacute;g&eacute;nek kock&aacute;ztat&aacute;s&aacute;val, hiszen a nagyobb daganat&aacute;tm&eacute;r\u0151 mellett gyorsan n\u0151 az &aacute;tt&eacute;t-k&eacute;pz\u0151d&eacute;s es&eacute;lye is. A nagyobb m&eacute;ret\u0171 daganat kezel&eacute;se j&oacute;val radik&aacute;lisabb beavatkoz&aacute;sokat ig&eacute;nyel: val&oacute;sz&iacute;n\u0171leg elker&uuml;lhetetlen a kiterjedtebb m\u0171t&eacute;t, a sug&aacute;rkezel&eacute;s &eacute;s a h&oacute;napokig tart&oacute; gy&oacute;gyszeres ut&oacute;kezel&eacute;s is.<\/p> <p> Noha Magyarorsz&aacute;gon k&eacute;t&eacute;vente sz\u0171r&eacute;sre h&iacute;vnak be minden 45-65 &eacute;v k&ouml;z&ouml;tti n\u0151t a lak&oacute;hely&uuml;k szerint kijel&ouml;lt k&ouml;zpontokba, sajnos csak a beh&iacute;vott n\u0151k mintegy fele jelenik meg rendszeresen, ez&eacute;rt Eur&oacute;p&aacute;ban az eml\u0151r&aacute;k t&uacute;l&eacute;l&eacute;si es&eacute;lye tekintet&eacute;ben haz&aacute;nk a legrosszabbak k&ouml;z&eacute; tartozik: csaknem 3 ezer n\u0151 hal meg &eacute;vente ebben a betegs&eacute;gben.<\/p>","category":"3","active":"1","date_from":"2013-06-19 08:53:49"},{"id":"8","title":"A mellr\u00e1k diagnosztiz\u00e1l\u00e1sa","lead":"Az eml\u0151ben tapintott csom\u00f3k nagy r\u00e9sze j\u00f3indulat\u00fa, de biztons\u00e1ggal csak szakorvosi vizsg\u00e1lat d\u00f6ntheti el, sz\u00fcks\u00e9ges-e kezel\u00e9s vagy sem.","content":"<p> A kivizsg&aacute;l&aacute;s fizik&aacute;lis vizsg&aacute;lattal kezd\u0151dik, melynek fontos r&eacute;sze az eml\u0151k, a h&oacute;nalj &eacute;s a k&ouml;rnyez\u0151 nyirokcsom&oacute;k szakszer\u0171 &aacute;ttapint&aacute;sa.<\/p> <p> A diagn&oacute;zisalkot&aacute;s fontos eleme a k&eacute;palkot&oacute; vizsg&aacute;latok alkalmaz&aacute;sa. Ide tartozik a mammogr&aacute;fia, amely az eml\u0151k r&ouml;ntgenvizsg&aacute;lat&aacute;t jelenti &eacute;s az eml\u0151k ultrahang vizsg&aacute;lata. 30 &eacute;ves kor alatt mammogr&aacute;fia helyett ultrahang vizsg&aacute;latot v&eacute;geznek.<\/p> <p> A mellr&aacute;k diagn&oacute;zis&aacute;nak alapja a sz&ouml;vettani mintav&eacute;tel. A fizik&aacute;lis &eacute;s a mammogr&aacute;fi&aacute;s vizsg&aacute;lattal a gyan&uacute;s ter&uuml;leteket hat&aacute;rozz&aacute;k meg, ahonnan azut&aacute;n a sz&ouml;vettani mintav&eacute;tel t&ouml;rt&eacute;nik.<\/p> <p> A sz&ouml;vettani mintav&eacute;tel (biopszia) sor&aacute;n, egy hossz&uacute; t\u0171vel a b\u0151r&ouml;n kereszt&uuml;l k&ouml;zvetlen&uuml;l az el\u0151z\u0151leg meghat&aacute;rozott, gyan&uacute;s ter&uuml;letekb\u0151l veszik a mint&aacute;t &eacute;rz&eacute;stelen&iacute;t&eacute;s ut&aacute;n. A vizsg&aacute;lat ultrahangos ellen\u0151rz&eacute;s mellett t&ouml;rt&eacute;nik, &iacute;gy a t\u0171 &uacute;tja v&eacute;gig k&ouml;vethet\u0151, pontosabban ir&aacute;ny&iacute;that&oacute;. A mellr&aacute;k diagn&oacute;zis&aacute;nak fel&aacute;ll&iacute;t&aacute;s&aacute;ban d&ouml;nt\u0151 a sz&ouml;vettani eredm&eacute;ny.<\/p> <p> A kivizsg&aacute;l&aacute;s sor&aacute;n v&eacute;rv&eacute;telre &eacute;s egy&eacute;b k&eacute;palkot&oacute; elj&aacute;r&aacute;sok elv&eacute;gz&eacute;s&eacute;re is sor ker&uuml;l, melyek seg&iacute;ts&eacute;g&eacute;vel tiszt&aacute;zhat&oacute; a beteg &aacute;ltal&aacute;nos &aacute;llapota. Sz&uuml;ks&eacute;g szerint elv&eacute;gzett r&ouml;ntgen-, ultrahang (UH), komputertomogr&aacute;fia (CT), m&aacute;gneses rezonancia (MR) &eacute;s izot&oacute;pos (PET, SPECT) vizsg&aacute;latok igazolhatj&aacute;k az &aacute;tt&eacute;tek jelenl&eacute;t&eacute;t. Seg&iacute;ts&eacute;g&uuml;kkel azok pontos elhelyezked&eacute;se &eacute;s m&eacute;rete is meghat&aacute;rozhat&oacute;.<\/p>","category":"3","active":"1","date_from":"2013-06-19 08:53:55"}]';
var aigmehnyakrak_content='[{"id":"16","title":"A m\u00e9hnyakr\u00e1k t\u00fcnetei","lead":"A betegs\u00e9g sajn\u00e1latos m\u00f3don kezdetben t\u00fcnetmentes, a t\u00fcnetek m\u00e1r csak el\u0151rehaladottabb st\u00e1diumban jelentkeznek, akkor sem minden esetben jellegzetesek, ez\u00e9rt fontos a rendszeres sz\u0171r\u00e9sen val\u00f3 r\u00e9szv\u00e9tel.","content":"<p> B&aacute;r korai st&aacute;diumban a daganat csak elv&eacute;tve okoz panaszokat, a sz\u0171r\u0151vizsg&aacute;lat sor&aacute;n m&aacute;r ilyenkor is l&aacute;that&oacute;k olyan k&oacute;ros elv&aacute;ltoz&aacute;sok, melyek tov&aacute;bbi vizsg&aacute;latokat ig&eacute;nyelnek.<\/p> <p> T&uuml;netek &aacute;ltal&aacute;ban csak az el\u0151rehaladott elv&aacute;ltoz&aacute;sokn&aacute;l jelentkeznek, ezek k&ouml;z&uuml;l a leggyakoribb a b\u0151vebb h&uuml;velyi foly&aacute;s, valamint a szexu&aacute;lis egy&uuml;ttl&eacute;t ut&aacute;n jelentkez\u0151 v&eacute;rz&eacute;s. Ilyenkor a mechanikai behat&aacute;s miatt keletkezik v&eacute;rz&eacute;s a tumor felsz&iacute;n&eacute;r\u0151l.<\/p> <p> A daganat n&ouml;veked&eacute;s&eacute;vel p&aacute;rhuzamosan m&aacute;r spont&aacute;n v&eacute;rz&eacute;s is kialakulhat. El\u0151rehaladott &aacute;llapotban szinte &aacute;lland&oacute; jelleggel b\u0171z&ouml;s, gennyes, v&eacute;res foly&aacute;s &eacute;szlelhet\u0151.<\/p> <p> Abban az esetben, ha a daganat a m&eacute;h&uuml;reget elz&aacute;rja, akkor er\u0151s alhasi f&aacute;jdalmat okozhat a menstru&aacute;ci&oacute;s v&aacute;lad&eacute;k m&eacute;h&uuml;regen bel&uuml;li felgy\u0171l&eacute;se &eacute;s szeptikus &aacute;llapotot eredm&eacute;nyezhet.<\/p> <p> A daganat n&ouml;veked&eacute;s&eacute;vel egyre gyakoribb a der&eacute;kt&aacute;ji f&aacute;jdalom, f&aacute;jdalmass&aacute; v&aacute;lik a k&ouml;z&ouml;s&uuml;l&eacute;s, a sz&eacute;klet- &eacute;s vizelet&uuml;r&iacute;t&eacute;s.<\/p>","category":"4","active":"1","date_from":"2013-06-19 08:56:17"},{"id":"15","title":"A m\u00e9hnyakr\u00e1k kialakul\u00e1sa, rizik\u00f3faktorai","lead":"A korai st\u00e1diumban felismert m\u00e9hnyakr\u00e1k j\u00f3l kezelhet\u0151 \u00e9s ak\u00e1r v\u00e9gleges gy\u00f3gyul\u00e1s is el\u00e9rhet\u0151, ennek ellen\u00e9re ez a megbeteged\u00e9s napjainkban is kiemelked\u0151 helyet foglal el a hal\u00e1loz\u00e1si statisztik\u00e1kban.","content":"<p> A m&eacute;hnyakr&aacute;k, a m&eacute;hnyak laph&aacute;msejtjeinek rosszindulat&uacute; elfajul&aacute;s&aacute;b&oacute;l kialakul&oacute; daganatf&eacute;les&eacute;g. A m&eacute;hnyakr&aacute;k &uacute;gynevezett daganatmegel\u0151z\u0151 &aacute;llapota a cervicalis intraepitelialis neoplasia (CIN). A CIN a r&aacute;ksz\u0171r&eacute;s sor&aacute;n diagnosztiz&aacute;lhat&oacute;, &eacute;s az idej&eacute;ben v&eacute;gzett beavatkoz&aacute;ssal gy&oacute;gy&iacute;that&oacute;.<\/p> <p> Haz&aacute;nkban &eacute;vente mintegy 1200-1300 &uacute;j m&eacute;hnyakr&aacute;kos esetet fedeznek fel, nagy r&eacute;sze ekkor m&aacute;r el\u0151rehaladott, gy&oacute;gy&iacute;thatatlan st&aacute;diumban van, ennek k&ouml;vetkezt&eacute;ben &eacute;vente kb. 600-an halnak meg. A rossz statisztikai mutat&oacute;k arra vezethet\u0151k vissza, hogy a m&eacute;hnyakr&aacute;ksz\u0171r&eacute;s bevezet&eacute;se &eacute;s ki&eacute;p&iacute;t&eacute;se ellen&eacute;re a n\u0151k jelent\u0151s h&aacute;nyada sajnos nem vesz r&eacute;szt ezen a vizsg&aacute;laton.<\/p> <p> A m&eacute;hnyakr&aacute;k leggyakrabban 35-65 &eacute;ves kor&uacute; n\u0151k k&ouml;r&eacute;ben fordul el\u0151, egyre gyakrabban figyelhet\u0151 meg azonban fiatalabb korban is.<\/p> <p> Kialakul&aacute;s&aacute;ban a hum&aacute;n papilloma v&iacute;rus (HPV) egyes t&iacute;pusainak szerepe bizony&iacute;tott, ezen v&iacute;rusok ugyanis a daganatosan elfajult sz&ouml;vetek 80-90 sz&aacute;zal&eacute;k&aacute;ban kimutathat&oacute;k. A HPV fert\u0151z&eacute;st nagyon k&ouml;nny\u0171 elkapni, ez&eacute;rt k&uuml;l&ouml;n&ouml;sen vesz&eacute;lyes!<\/p> <p> <strong>Mi j&aacute;tszhat k&ouml;zre?<\/strong><\/p> <ul> <li> A HPV r&aacute;kkelt\u0151 vari&aacute;ns&aacute;nak tart&oacute;s jelenl&eacute;te a szervezetben (legal&aacute;bb 6&ndash;12 h&oacute;napon kereszt&uuml;l)<\/li> <li> Genetikai t&eacute;nyez\u0151k<\/li> <li> Doh&aacute;nyz&aacute;s<\/li> <li> Az immunrendszer cs&ouml;kkent m\u0171k&ouml;d&eacute;se<\/li> <li> Sz&aacute;jon &aacute;t szedett fogamz&aacute;sg&aacute;tl&oacute;k folyamatos, tart&oacute;s &ndash; &ouml;t &eacute;vet meghalad&oacute; &ndash; haszn&aacute;lata<\/li> <li> T&ouml;bbsz&ouml;ri terhess&eacute;g<\/li> <li> Kor&aacute;n kezdett akt&iacute;v szexu&aacute;lis &eacute;let<\/li> <li> A testhigi&eacute;nia elhanyagol&aacute;sa<\/li> <li> Nemi &eacute;lettel terjed\u0151 betegs&eacute;gek<\/li> <li> A f&eacute;rfi szexu&aacute;lis partner(ek) HPV-fert\u0151z&ouml;tts&eacute;ge<\/li> <li> A szexu&aacute;lis partnerek gyakori v&aacute;ltogat&aacute;sa<\/li> <\/ul>","category":"4","active":"1","date_from":"2013-06-19 08:56:28"},{"id":"6","title":"A m\u00e9hnyakr\u00e1kos beteg kil\u00e1t\u00e1sai","lead":"A m\u00e9hnyakr\u00e1k n\u0151gy\u00f3gy\u00e1szati vizsg\u00e1lattal m\u00e1r korai st\u00e1diumban j\u00f3l felismerhet\u0151, \u00e9s megfelel\u0151 kezel\u00e9ssel ak\u00e1r v\u00e9gleges gy\u00f3gyul\u00e1s is el\u00e9rhet\u0151.","content":"<p> Ennek ellen&eacute;re a megbeteged&eacute;s napjainkban is kiemelked\u0151 helyet foglal el a hal&aacute;loz&aacute;si statisztik&aacute;kban.<\/p> <p> Magyarorsz&aacute;gon &eacute;vente mintegy 1200 &uacute;j esetet fedeznek fel, amely jelent\u0151s h&aacute;nyada ekkor m&aacute;r el\u0151rehaladott, gy&oacute;gy&iacute;thatatlan st&aacute;diumban van. A rossz statisztikai mutat&oacute;k annak k&ouml;sz&ouml;nhet\u0151k, hogy a m&eacute;hnyakr&aacute;k-sz\u0171r&eacute;s bevezet&eacute;se &eacute;s ki&eacute;p&iacute;t&eacute;se ellen&eacute;re a n\u0151k jelent\u0151s h&aacute;nyada sajnos nem vesz r&eacute;szt ezen vizsg&aacute;laton, noha id\u0151ben megkezdett kezel&eacute;ssel az esetek nagy r&eacute;sz&eacute;ben gy&oacute;gy&iacute;that&oacute;.<\/p> <p> A m&eacute;hnyakr&aacute;k leggyakrabban 35-65 &eacute;ves kor&uacute; n\u0151k k&ouml;r&eacute;ben fordul el\u0151, egyre gyakrabban figyelhet\u0151 meg azonban fiatalabb korban is. A m&eacute;hnyakr&aacute;k kialakul&aacute;s&aacute;ban a hum&aacute;n papilloma v&iacute;rus (HPV) egyes t&iacute;pusainak szerepe bizony&iacute;tott, ezen v&iacute;rusok ugyanis a daganatosan elfajult sz&ouml;vetek 80-90 sz&aacute;zal&eacute;k&aacute;ban kimutathat&oacute;k.<\/p> <p> A m&eacute;hnyakr&aacute;k majdnem sz&aacute;zsz&aacute;zal&eacute;kos biztons&aacute;ggal megel\u0151zhet\u0151 a sz\u0171r&eacute;s &eacute;s az olt&aacute;s egy&uuml;ttes alkalmaz&aacute;s&aacute;val. A hum&aacute;n papilloma v&iacute;rus (HPV) elleni vakcin&aacute;t a szexu&aacute;lis &eacute;let megkezd&eacute;se, a fert\u0151z&eacute;s el\u0151tt c&eacute;lszer\u0171 adni, amennyiben ez nem t&ouml;rt&eacute;nt meg, a szexu&aacute;lisan m&aacute;r akt&iacute;v fiatal n\u0151kn&eacute;l is &eacute;rdemes alkalmazni, de annak hat&eacute;konys&aacute;ga ilyenkor m&aacute;r kisebb.<\/p> <p> <strong>A m&eacute;hnyakr&aacute;k k&eacute;s\u0151i st&aacute;diuma <\/strong><\/p> <p> A daganat n&ouml;veked&eacute;se sor&aacute;n &aacute;tterjed a k&ouml;rnyezet&eacute;re, besz\u0171rheti a h&uuml;velyt, a m&eacute;htestet, a h&uacute;gyh&oacute;lyagot, a h&uacute;gyvezet\u0151ket, a v&eacute;gbelet, a k&ouml;rnyez\u0151 ereket &eacute;s idegeket is.<\/p> <p> El\u0151rehaladott st&aacute;diumban a m&eacute;hnyakr&aacute;k a t&uuml;d\u0151ben, a m&aacute;jban, a csontokban, valamint az agyban k&eacute;pez &aacute;tt&eacute;tet.<\/p>","category":"4","active":"1","date_from":"2013-06-19 08:56:40"},{"id":"22","title":"A m\u00e9hnyakr\u00e1k diagnosztiz\u00e1l\u00e1sa","lead":"Rendszeres nemi \u00e9letet \u00e9l\u0151 n\u0151knek a sz\u0171r\u0151vizsg\u00e1laton val\u00f3 r\u00e9szv\u00e9tel \u00e9vente aj\u00e1nlott, egy egyszer\u0171 vizsg\u00e1lattal ugyanis a m\u00e9hnyakr\u00e1k kialakul\u00e1sa megel\u0151zhet\u0151!","content":"<p> A vizsg&aacute;lat sor&aacute;n a n\u0151gy&oacute;gy&aacute;sz el\u0151sz&ouml;r &aacute;ttekinti a k&uuml;ls\u0151 nemi szerveket, ezt k&ouml;vet\u0151en a h&uuml;vely felt&aacute;r&aacute;sa k&ouml;vetkezik. A h&uuml;velyfal &eacute;s a m&eacute;hsz&aacute;j &aacute;tvizsg&aacute;l&aacute;sa colposcoppal t&ouml;rt&eacute;nik, ennek sor&aacute;n &eacute;szlelhet\u0151 a norm&aacute;list&oacute;l elt&eacute;r\u0151 m&eacute;hsz&aacute;ji felsz&iacute;n, mely daganatos elfajul&aacute;sra utalhat.<\/p> <p> A m&eacute;hsz&aacute;j felsz&iacute;n&eacute;r\u0151l t&ouml;rt&eacute;n\u0151 kenetv&eacute;tellel nyert minta mikroszk&oacute;pos vizsg&aacute;lata (cytologia) sor&aacute;n elk&uuml;l&ouml;n&iacute;thet\u0151k az eg&eacute;szs&eacute;ges &eacute;s a k&oacute;ros sejtek. A rutin vizsg&aacute;lat ut&aacute;n a legt&ouml;bb rendel&eacute;sen h&uuml;velyi ultrahangvizsg&aacute;latot is v&eacute;geznek.<\/p> <p> K&oacute;ros m&eacute;hnyak-felsz&iacute;ni elv&aacute;ltoz&aacute;s eset&eacute;n tov&aacute;bbi diagnosztikus l&eacute;p&eacute;s sz&uuml;ks&eacute;ges annak eld&ouml;nt&eacute;s&eacute;re, hogy a l&aacute;tott elv&aacute;ltoz&aacute;s daganatmegel\u0151z\u0151 &aacute;llapot, vagy m&aacute;r kialakult a r&aacute;kos megbeteged&eacute;s. Ezt mintav&eacute;tellel, a conisatioval (a m&eacute;hnyak r&eacute;szleges elt&aacute;vol&iacute;t&aacute;s&aacute;val) lehet eld&ouml;nteni, mely r&ouml;vid, altat&aacute;sban v&eacute;gzett m\u0171t&eacute;t. Ennek sor&aacute;n a m&eacute;hnyakb&oacute;l egy k&uacute;p alak&uacute; r&eacute;szt metszenek ki. Az elt&aacute;vol&iacute;tott sz&ouml;vetdarabnak a sz&ouml;vettani vizsg&aacute;lati eredm&eacute;nye alapj&aacute;n d&ouml;nti el a n\u0151gy&oacute;gy&aacute;sz a tov&aacute;bbi beavatkoz&aacute;s sz&uuml;ks&eacute;gess&eacute;g&eacute;t.<\/p> <p> &Uacute;jabb m\u0171t&eacute;ti beavatkoz&aacute;sra nincs sz&uuml;ks&eacute;g abban az esetben, ha a kimetszett sz&ouml;vetdarabban csak a daganat megel\u0151z\u0151 &aacute;llapota l&aacute;that&oacute; &eacute;s\/vagy a k&oacute;ros elv&aacute;ltoz&aacute;s nem &eacute;ri el a minta sz&eacute;leit (ha el&eacute;ri a sz&eacute;leit akkor is van lehet\u0151s&eacute;g a m&eacute;het megk&iacute;m&eacute;l\u0151, kisebb m\u0171t&eacute;tre (is, ha id\u0151ben felismerik).<\/p> <p> Amennyiben kiterjedt rosszindulat&uacute; daganatot diagnosztiz&aacute;lnak, a m&eacute;helt&aacute;vol&iacute;t&aacute;s nem ker&uuml;lhet\u0151 el, tov&aacute;bbi vizsg&aacute;latokra van sz&uuml;ks&eacute;g annak meg&aacute;llap&iacute;t&aacute;s&aacute;ra, k&eacute;pz\u0151dtek-e &aacute;tt&eacute;tek.<\/p>","category":"4","active":"1","date_from":"2013-06-19 08:57:02"}]';
var aigpetefeszekdaganat_content='[{"id":"9","title":"A petef\u00e9szek-daganat t\u00fcnetei","lead":"Korai szakaszban a betegs\u00e9g t\u00fcnetszeg\u00e9ny, ezzel magyar\u00e1zhat\u00f3, hogy a petef\u00e9szekr\u00e1kot az esetek 70 sz\u00e1zal\u00e9k\u00e1ban sajnos m\u00e1r el\u0151rehaladott \u00e1llapotban fedezik fel.","content":"<p> Menopauza ut&aacute;n l&eacute;v\u0151 h&ouml;lgyek hasi panaszai h&aacute;tter&eacute;ben erre a betegs&eacute;gre is gondolni kell!<\/p> <p> A daganat el\u0151rehaladottabb szakasz&aacute;ban fell&eacute;p\u0151 t&uuml;netek sem l&aacute;tv&aacute;nyosak, &eacute;s f\u0151k&eacute;nt nem k&oacute;rjelz\u0151k. Ilyen t&uuml;netek lehetnek: hasi &eacute;s kismedencei f&aacute;jdalom, hask&ouml;rfogat n&ouml;veked&eacute;s (ami a k&ouml;ld&ouml;k el\u0151boltosul&aacute;st is eredm&eacute;nyezheti), &eacute;tkez&eacute;skor a szokatlanul kor&aacute;n bek&ouml;vetkez\u0151 j&oacute;llakotts&aacute;g &eacute;rz&eacute;se, gyomor- &eacute;s b&eacute;lpanaszok.<\/p> <p> El\u0151rehaladott &aacute;llapotban vizelet&uuml;r&iacute;t&eacute;si zavarok, sz&eacute;kreked&eacute;s &eacute;s alhasi nyom&aacute;s&eacute;rz&eacute;kenys&eacute;g, a has n&ouml;veked&eacute;se alakulhat ki.<\/p> <p> A n&ouml;vekv\u0151 daganat a petef&eacute;szek megnagyobbod&aacute;s&aacute;t eredm&eacute;nyezi, amely &eacute;szlelhet\u0151 a n\u0151gy&oacute;gy&aacute;szati &eacute;s a n\u0151gy&oacute;gy&aacute;szati ultrahang vizsg&aacute;lat sor&aacute;n. Fontos tudnod, hogy a megnagyobbodott petef&eacute;szek nem azonos a petef&eacute;szekr&aacute;k diagn&oacute;zis&aacute;val, hiszen a j&oacute;indulat&uacute; daganatok is a petef&eacute;szek-megnagyobbod&aacute;s&aacute;hoz vezethetnek, ez&eacute;rt panaszmentess&eacute;g eset&eacute;n is &eacute;vente l&aacute;togass el n\u0151gy&oacute;gy&aacute;szhoz!<\/p>","category":"5","active":"1","date_from":"2013-06-15 00:00:00"},{"id":"4","title":"A petef\u00e9szek-daganat kialakul\u00e1sa, rizik\u00f3faktorai","lead":"A petef\u00e9szek (ovarium) a n\u0151i ivarmirigy a kismedenc\u00e9ben, a m\u00e9h k\u00e9t oldal\u00e1n elhelyezked\u0151, szilva nagys\u00e1g\u00fa p\u00e1ros szerv, amely \u00f6sztrog\u00e9nt (t\u00fcsz\u0151hormont) \u00e9s progeszteront (s\u00e1rgatesthormont) termelve a n\u0151i hormonh\u00e1ztart\u00e1s\u00e9rt is felel.","content":"<p> Ennek k&ouml;sz&ouml;nhet\u0151en a petef&eacute;szek betegs&eacute;ge gyakran egy&uuml;tt j&aacute;r hormon&aacute;lis eredet\u0171 panaszokkal.<\/p> <p> <strong>Kiket fenyeget a betegs&eacute;g?<\/strong><\/p> <p> A petef&eacute;szekr&aacute;k d&ouml;nt\u0151en az 50 &eacute;v feletti n\u0151k betegs&eacute;ge: el\u0151fordul&aacute;sa az &eacute;letkor el\u0151rehaladt&aacute;val egyre n\u0151, de ritk&aacute;n fiatal n\u0151kn&eacute;l is el\u0151fordulhat.<\/p> <p> A betegs&eacute;gnek t&ouml;bb kock&aacute;zati t&eacute;nyez\u0151je van, a legmeghat&aacute;roz&oacute;bb az &eacute;letkor. A t&ouml;bbi rizik&oacute;faktorr&oacute;l kevesebbet lehet tudni. A hib&aacute;s g&eacute;n sz&aacute;rmazhat az ap&aacute;t&oacute;l &eacute;s az any&aacute;t&oacute;l is, ez&eacute;rt fontos a csal&aacute;di k&oacute;rel\u0151zm&eacute;ny felt&aacute;r&aacute;sa. Fontos, hogy m&eacute;g panaszmentess&eacute;g eset&eacute;n is t&ouml;rt&eacute;nj&eacute;k &eacute;venk&eacute;nti rendszeres n\u0151gy&oacute;gy&aacute;szati vizsg&aacute;lat.<\/p> <p> A bels\u0151 kock&aacute;zati t&eacute;nyez\u0151 a szervezet hormonh&aacute;ztart&aacute;s&aacute;nak zavara. A petef&eacute;szkeket &eacute;rint\u0151 minden folyamat n&ouml;veli a kock&aacute;zatot.<\/p>","category":"5","active":"1","date_from":"2013-06-16 00:00:00"},{"id":"10","title":"A petef\u00e9szekr\u00e1k kezel\u00e9se","lead":"A petef\u00e9szekr\u00e1k \u00f6sszes st\u00e1dium\u00e1ban a seb\u00e9szi kezel\u00e9s\u00e9 a vezet\u0151 szerep (melyet nagy gyakorlattal rendelkez\u0151 centrumokban \u00e9rdemes elv\u00e9geztetni).","content":"<p> A diagn&oacute;zis fel&aacute;ll&iacute;t&aacute;sa ut&aacute;n rendszerint hasi m\u0171t&eacute;ti metsz&eacute;s &uacute;tj&aacute;n elt&aacute;vol&iacute;tj&aacute;k a m&eacute;het, a k&eacute;t m&eacute;hk&uuml;rt&ouml;t &eacute;s a petef&eacute;szkeket is. A m\u0171t&eacute;t sor&aacute;n &aacute;tvizsg&aacute;lj&aacute;k a teljes has&uuml;reget &eacute;s ellen\u0151rzik a hasi nyirokcsom&oacute;kat is.<\/p> <p> A m\u0171t&eacute;tnek az el\u0151rehaladott st&aacute;dium&uacute; esetekben is fontos szerepe van, mert min&eacute;l t&ouml;bb daganatsz&ouml;vetet tudnak elt&aacute;vol&iacute;tani a m\u0171t&eacute;t sor&aacute;n, ann&aacute;l hosszabb a betegek t&uacute;l&eacute;l&eacute;se.<\/p> <p> A petef&eacute;szekr&aacute;k kezel&eacute;se a m\u0171t&eacute;ttel nem fejez\u0151dik be. Gyakran sz&uuml;ks&eacute;gess&eacute; v&aacute;lik a m\u0171t&eacute;t ut&aacute;ni kezel&eacute;s. Az esetek t&ouml;bbs&eacute;g&eacute;ben kombin&aacute;ci&oacute;s kemoter&aacute;pi&aacute;t alkalmaznak.<\/p> <p> Mivel a daganatok t&ouml;bbs&eacute;g&eacute;t el\u0151rehaladott st&aacute;diumban fedezik fel, a kemoter&aacute;pi&aacute;s kezel&eacute;s ellen&eacute;re gyakori a ki&uacute;jul&aacute;s, ez&eacute;rt a betegeket gyakori kontroll vizsg&aacute;latra h&iacute;vj&aacute;k vissza: n\u0151gy&oacute;gy&aacute;szati vizsg&aacute;lat, ultrahang, tumor marker- &eacute;s a CT-vizsg&aacute;lat.<\/p> <p> A betegs&eacute;g hat&eacute;konyabb kezel&eacute;s&eacute;nek eredm&eacute;nyek&eacute;nt az elm&uacute;lt &eacute;vtizedben jelent\u0151sen cs&ouml;kkent a petef&eacute;szekr&aacute;k miatti hal&aacute;loz&aacute;s.<\/p>","category":"5","active":"1","date_from":"2013-06-17 00:00:00"},{"id":"5","title":"A petef\u00e9szek-daganat diagnosztiz\u00e1l\u00e1sa","lead":"Petef\u00e9szekr\u00e1kra nincs \u00e1ltal\u00e1nosan alkalmazott sz\u0171r\u00e9si m\u00f3dszer, ugyanakkor a genetikai t\u00e9nyez\u0151k miatt \u00e9rdemes rendszeres orvosi vizsg\u00e1latokon r\u00e9szt venni\u00fck azoknak, akiknek a csal\u00e1dj\u00e1ban volt hasonl\u00f3 betegs\u00e9g.","content":"<p> A t&uuml;netmentess&eacute;g &eacute;s a sz\u0171r\u0151vizsg&aacute;latok hi&aacute;nya miatt a daganatos elv&aacute;ltoz&aacute;st ritk&aacute;n fedezik fel korai st&aacute;diumban.<\/p> <p> Mivel a petef&eacute;szekr&aacute;k kezdetben t&uuml;netmentes, n\u0151gy&oacute;gy&aacute;szati vizsg&aacute;lat sor&aacute;n v&eacute;gzett ultrahang vizsg&aacute;lat vetheti fel a gyan&uacute;t. Ezt tov&aacute;bb er\u0151s&iacute;theti a v&eacute;rb\u0151l meghat&aacute;rozott tumor marker pozitivit&aacute;sa.<\/p> <p> A petef&eacute;szekr&aacute;k pontos diagn&oacute;zisa a m\u0171t&eacute;t sor&aacute;n nyert sz&ouml;vettani vizsg&aacute;lattal lehets&eacute;ges. Amennyiben beigazol&oacute;dik a daganat jelenl&eacute;te, az &aacute;tt&eacute;tek kiz&aacute;r&aacute;sa vagy pontos behat&aacute;rol&aacute;sa miatt m&aacute;s vizsg&aacute;latok is sz&uuml;ks&eacute;gesek: ultrahang, CT, esetleg MR vizsg&aacute;lat.<\/p> <p> A kivizsg&aacute;l&aacute;st nem szabad halogatni: a gyan&uacute; felmer&uuml;l&eacute;s&eacute;vel azonnal meg kell kezdeni, hogy miel\u0151bb rendelkez&eacute;sre &aacute;lljon a kezel&eacute;st megalapoz&oacute;, pontos diagn&oacute;zis.<\/p>","category":"5","active":"1","date_from":"2013-06-18 00:00:00"}]';


var aigmellrak_array=JSON.decode(aigmellrak_content);

var logIt = 1;
var navBar = false;


function logDisplay(str) {
	if (logIt == 1)
		console.log(str);
}

function logEvent(name) {
	//logDisplay(name);
	//googleAnalytics.trackPageview("/ios/"+name);
	window.plugins.analytics.trackPageView("/android/" + name, function() {
		logDisplay("ok");
	}, function() {
		logDisplay("nem ok");
	});
}

$(".bottom-bar a").live("click", function(e) {
	logDisplay("banner click");
	window.open($(this).attr("href"), "_blank", "location=yes,EnableViewPortScale=yes");
	return false;
});


function onSwitchTab(tabTag) {

				switch (tabTag)
				{
					case "betegsegek":
						logDisplay("betegsegek");
						viewstack = new Moobile.ViewControllerStack;
						windowcontroller.setRootViewController(viewstack).getRootViewController().pushViewController(new ViewController.Diseases, new Moobile.ViewTransition.Fade);
						break;
					case "riziko":
						viewstack = new Moobile.ViewControllerStack;
						windowcontroller.setRootViewController(viewstack).getRootViewController().pushViewController(new ViewController.Riscfactors, new Moobile.ViewTransition.Fade);
						logDisplay("riziko");
						break;
					case "prevencio":
						logDisplay("prevencio");
						viewstack = new Moobile.ViewControllerStack;
						windowcontroller.setRootViewController(viewstack).getRootViewController().pushViewController(new ViewController.Prevention, new Moobile.ViewTransition.Fade);
						break;
					case "tovabbiak":
						logDisplay("Továbbiak");
						viewstack = new Moobile.ViewControllerStack;
						windowcontroller.setRootViewController(viewstack).getRootViewController().pushViewController(new ViewController.More, new Moobile.ViewTransition.Fade);
						break;
				}
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



function preventBehavior(e) {
	e.preventDefault();
}
;

$("input[type=text], textarea, input[type=tel],input[type=email] ").live("blur", function(e) {
	window.scrollTo(0, 0);
	
	
	/*
	pl: "betegsegek", "riziko", "prevencio"
	*/
	if (device.platform == "iOS") {
		if ($(this).val() == "") {
			$(this).val($(this).attr("rel"));
		}
	}
});
$("input[type=text], textarea, input[type=tel],input[type=email] ").live("focus", function(e) {
	 
	if (device.platform == "iOS") {
		if ($(this).val() == $(this).attr("rel")) {
			$(this).val("");
	
		}
	}
});

	

var viewstack;
var windowcontroller;
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
		//document.addEventListener("touchmove", preventBehavior, false);
		if (device.platform == "iOS") {
			//tf = cordova.require("cordova/plugin/testflightsdk");
			//tf.takeOff(win_tf, fail_tf, "31d3f427-f933-4449-bb9e-2a5319a48cfb");
			logDisplay("Phonegap ready")
		}
		/* database sync */
		setArrayFromFile("aignews", true);
		setArrayFromFile("aigmegelozes", true);
		setArrayFromFile("aigmellrak", true);
		setArrayFromFile("aigpetefeszekdaganat", true);
		setArrayFromFile("aigmehnyakrak", true);
		setArrayFromFile("aigbordaganat", true);


		
		
		
		database_sync(sync_finished);

		viewstack = new Moobile.ViewControllerStack;
		windowcontroller = new Moobile.WindowController();

		if (device.platform == "iOS") {
			showTabBar();
			// test account:
			//GAinit("UA-1802008-37");
			
			// production account:
			GAinit("UA-1802008-42");
		}
		if (device.platform == "Android")

		{
			//UA-1802008-37
			windowcontroller.setRootViewController(viewstack).getRootViewController().pushViewController(new ViewController.Diseases);
			cordova.addConstructor(function() {
				cordova.addPlugin('analytics', new Analytics());
			}, false);

			window.plugins.analytics.start(function() {
			}, function() {
			});

			document.addEventListener("backbutton", function(e) {
				e.preventDefault();
				viewstack.popViewController();
				//alert(viewstack.getViewControllerStack());
			}, true);

			document.addEventListener("menubutton", function(e) {
				//e.preventDefault();
				navigator.notification.confirm(
						'Biztosan ki szeretne lépni?',
						onConfirmQuit,
						'Kilépés',
						'Nem,Igen'
						);


			}, true);

			function onConfirmQuit(button) {
				if (button == "2") {

					window.plugins.closeApp.show();
					//device.exitApp(); 
					//window.MyCls.finish();
				}
			}

		}
	},
};



//COMMON FUNCTIONS
function padNumber(str, length) {
	str = str.toString();
	while (str.length < length) {
		str = '0' + str;
	}
	logDisplay(str);
	return str;
}

function alertDismissed() {
	// do something
}
function showMessage(message, title, buttonname)
{
	navigator.notification.alert(
			message, // message
			alertDismissed, // callback
			title, // title
			buttonname                  // buttonName
			);
}


var api_url = "http://vigyazunkrad.webbeteg.hu/api/";

var xmlhttp;

function rest_post(service, data) {
	execute('POST', api_url + service + "?random=" + Math.round((Math.random() * 1000)), data);
}

function rest_get(service, param, successhandler) {
	execute('GET', api_url + service + "?random=" + Math.round((Math.random() * 1000))+"&"+param,"", successhandler);
}

function execute(method, url, data, successhandler) {
	logDisplay(url);
	xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function()
	{
		if (xmlhttp.readyState == 4 && (xmlhttp.status == 200 || xmlhttp.status == 404 || xmlhttp.status == 500))
		{
			if (typeof successhandler != 'undefined')
				{
					successhandler(xmlhttp.responseText, xmlhttp.status);
				}
		}
	
	}	
	xmlhttp.open(method, url, true)
	xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
	xmlhttp.send(JSON.stringify(data));

} 

Class.refactor(Moobile.ScrollView, {
	options: {
		scroller: 'IScroll'
	}
});


var ViewController = {
	Component: {},
	Event: {},

};







var logIt = 0;

window.onerror = function(message, url, lineNumber) {
	logDisplay("Error: " + message + " in " + url + " at line " + lineNumber);
}

var tabBar = null;
var navBar = null;
var tf = null;
function showTabBar() {

	tabBar = cordova.require("cordova/plugin/iOSTabBar");
	navBar = cordova.require("cordova/plugin/iOSNavigationBar");
	tabBar.init();
	navBar.init();
	tabBar.create({selectedImageTintColorRgba: "0,171,169, 255"});

	tabBar.createItem("betegsegek", "Betegségek", "tab1.png", {
		onSelect: function() {
			viewstack = new Moobile.ViewControllerStack;
			windowcontroller.setRootViewController(viewstack).getRootViewController().pushViewController(new ViewController.Diseases, new Moobile.ViewTransition.None);
		}
	});
	tabBar.createItem("riziko", "Rizikófaktorok", "tab2.png", {
		onSelect: function() {
			viewstack = new Moobile.ViewControllerStack;
			windowcontroller.setRootViewController(viewstack).getRootViewController().pushViewController(new ViewController.Riscfactors, new Moobile.ViewTransition.None);
		}
	});
	tabBar.createItem("prevencio", "Prevenció", "tab3.png", {
		onSelect: function() {
			viewstack = new Moobile.ViewControllerStack;
			windowcontroller.setRootViewController(viewstack).getRootViewController().pushViewController(new ViewController.Prevention, new Moobile.ViewTransition.None);
		}
	});
	tabBar.createItem("tovabbiak", "Továbbiak", "tab4.png", {
		onSelect: function() {
			viewstack = new Moobile.ViewControllerStack;
			windowcontroller.setRootViewController(viewstack).getRootViewController().pushViewController(new ViewController.More, new Moobile.ViewTransition.None);
		}
	});
	var buttonOptions={};
	buttonOptions.useImageAsBackground=1;
	buttonOptions.fixedMarginLeft=-40;
	navBar.create("Black", {tintColorRgba: '225,239,240,100'});
	navBar.setupLeftButton(null, "navbarback.png", function() {
		navBar.hideLeftButton();
		viewstack.popViewController();

	},buttonOptions);
	navBar.showLeftButton();
	navBar.hideRightButton();

	tabBar.show();
	navBar.show();
	tabBar.showItems("betegsegek", "riziko", "prevencio", "tovabbiak");
	tabBar.selectItem("betegsegek");
	window.addEventListener("resize", function() {
		tabBar.resize();
	}, false);
	logDisplay("Magasság: " + $(".window .window-content-wrapper").height());
	$(".window .window-content-wrapper").height($(".window .window-content-wrapper").height() - 93);
	logDisplay("Magasság: " + $(".window .window-content-wrapper").height());
	//$(".window .window-content").height($(".window .window-content").height()-113);
		window.plugins.banner.createBanner("45");
	//tf.passCheckpoint(successtf, fail_tf, 'Init OK!');
}

function logDisplay(str) {
	if (logIt == 1){
		console.log(str);
		if (tf){
			//tf.remoteLog(successtf, fail_tf, str);
		}
	}
}

$("#eletkor").live("click", function(e) {
	if ($(this).val() == $(this).attr("rel")) {
		$(this).val("");

	}
	$(".calculator-result").hide();	
	$(".eredmeny").html("");
	var items = new Array();
	var texts = new Array();
	for (var k = 16; k < 100; k++) {
		texts[k-16]=k;
	}
	for (var k = 0; k < texts.length; k++) {
		items[k] = {value: k, text: texts[k]};
	}	
	createPicker("eletkor", "Életkor", items, jQuery.inArray($(this).val(), texts), texts, inputSelected);
});

function createPicker(name, title, datas, currentvalue, texts, onSuccess) {
	var pickerView = window.plugins.pickerView;
	var slots = [
		{name: name, value: currentvalue, data: datas}
	];
	pickerView.create(slots, {
		style: 'black-opaque',
		doneButtonLabel: 'Kész',
		cancelButtonLabel: 'Mégsem'
	},
	function(selectedValues, buttonIndex) {
		onSuccess(name, texts[selectedValues[name]]);
	});
}
function inputSelected(id, value) {
	logDisplay("inputSelected: " + id + " : " + value);
	$("#" + id).val(value);
}

function GAinit(id){
    if (id=="") return false;
    cordova.exec("GoogleAnalyticsPlugin.trackerWithTrackingId",id); 	
}

function logEvent(name){
    //logDisplay(name);
    //googleAnalytics.trackPageview("/ios/"+name);
    cordova.exec("GoogleAnalyticsPlugin.trackView","/ios/"+name);
}

function trackEvent(action, label, value){
    //logDisplay(name);
	//    NSString* action = [options valueForKey:@"action"];
    //NSString* label = [options valueForKey:@"label"];
    //NSNumber* value = [options valueForKey:@"value"];
    //googleAnalytics.trackPageview("/ios/"+name);
    cordova.exec("GoogleAnalyticsPlugin.trackEventWithCategory",{category:"ios",action: action, label:label, value: value});
}


function emailShare(){
    var args={};
    //subject,body,toRecipients,ccRecipients,bccRecipients,bIsHTML
    args.subject="Vigyázunk Rád!";
    args.body="Szeretném megosztani Veled Magyarország első, kifejezetten nőknek ajánlott átfogó daganatellenes prevenciós okostelefon-alkalmazását, mely ingyenesen letölthető!\n\
Innen tudod letölteni: <a href='http://vigyazunkrad.webbeteg.hu/mobilalkalmazas'>Vigyázunk Rád</a>";
    args.bIsHTML=true;
    cordova.exec(null, null, "EmailComposer", "showEmailComposer", [args]);
}

function win_tf(){
	logDisplay(device.name+" "+device.uuid);
	//tf.setDeviceIdentifier(successtf, fail_tf, device.name+" "+device.uuid);
}

function successtf(){
	
}

function fail_tf(e){
	logDisplay(e.getMessage());
}




ViewController.Info = new Class({
	Extends: Moobile.ViewController,
	loadView: function() {
		this.view = Moobile.View.at('templates/views/info-view.html');
	},
	viewDidLoad: function() {
		logEvent("sugo");
	},
	viewWillEnter: function() {
		if (device.platform == "iOS"){
			navBar.showLeftButton();
			window.plugins.banner.hideBanner();
		}
	},
	destroy: function() {

		this.parent();
	}
});








ViewController.Risctest = new Class({
	Extends: Moobile.ViewController,
	options: {
		question: null,
		questionIndex: null,
		userPoints: null,
	},
	nextButton: null,
	question: null,
	list:null,
	loadView: function() {
		
		this.view = Moobile.View.at('templates/views/risctest-view.html');
		//logDisplay(this.options.question);
		logEvent("tesztkerdes/"+this.options.question);
		this.nextButton = this.view.getChildComponent('next-button');
		this.list = this.view.getChildComponent('list');
		this.list.addEvent('select', this.bound('onListSelect'));
		this.nextButton.addEvent('tap', this.bound('onNextButtonTap'));
		this.question = this.view.getChildComponent('question');
		this.question.setText((this.options.questionIndex + 1) + ". " + this.options.question.question);
		for (var k = 0; k <= this.options.question.test_answer.length - 1; k++) {
			var listItem = new Moobile.ListItem([], {styleName: "checked"});
			listItem.setLabel(this.options.question.test_answer[k].answer);
			listItem.setDetail(this.options.question.test_answer[k].pont);
			this.list.addItem(listItem);
		}
		if (this.options.questionIndex==0) {
			this.view.getChildComponent('warning').setText("A Rizikófaktor teszt kitöltése nem helyettesíti a tényleges szűrővizsgálaton való részvételt.");
		}
		this.nextButton.setDisabled(true);	
		rest_get("banners", "zone=Rizikófaktorok oldal", this.bound('bannerDownloaded'));
	},
	viewDidLoad: function() {

	},
	viewWillEnter: function() {
		if (device.platform == "iOS") {
			if (navBar) {
				navBar.showLeftButton();
			}
		}
	},
	destroy: function() {
		this.nextButton.removeEvent('tap', this.bound('onNextButtonTap'));
		this.nextButton = null;
		this.question = null;
		this.list.removeEvent('select', this.bound('onListSelect'));
		this.list=null;
		this.parent();
	},
	onNextButtonTap: function() {
		if (typeof aigtest_array.test_quest[this.options.questionIndex + 1] !== "undefined") {
			logDisplay("next question");			
			this.options.userPoints=parseInt(this.options.userPoints)+parseInt(this.list.getSelectedItem().getDetail().getText());
			viewstack.pushViewController(new ViewController.Risctest({question: aigtest_array.test_quest[this.options.questionIndex + 1], questionIndex: this.options.questionIndex + 1, userPoints: this.options.userPoints}), new Moobile.ViewTransition.Slide);
		}else{
			logDisplay("test result");
			this.options.userPoints=parseInt(this.options.userPoints)+parseInt(this.list.getSelectedItem().getDetail().getText());
			logDisplay(this.options.userPoints);
			viewstack.pushViewController(new ViewController.RisctestResult({userPoints: this.options.userPoints}), new Moobile.ViewTransition.Slide);			
		}
	},
	onListSelect: function(item) {
		if (this.nextButton.isDisabled()){
			this.nextButton.setDisabled(false);
		}
	},
	onListDeselect: function(item) {

	},
	bannerDownloaded: function(bannerjson, status) {
		if (status == 200) {
			var banner = JSON.decode(bannerjson, true);
			if (device.platform == "iOS") {
				if (banner.banner_text != "") {
					window.plugins.banner.showBanner(banner.banner_text);
				} else {
					window.plugins.banner.hideBanner();
				}
			}
			if (device.platform == "Android") {
				$(".bottombanner-test").html(banner.banner_text);	
			}
		} else {
			//if no banner found, or some internal server error in response
			if (device.platform == "iOS") {
				window.plugins.banner.hideBanner();

			}
		}
	}


});


ViewController.Calculator = new Class({
	Extends: Moobile.ViewController,
	calculateButton: null,
	loadView: function() {
		if (device.platform == "iOS")
		{
			this.view = Moobile.View.at('templates/views/calculator-view-ios.html');
		}
		if (device.platform == "Android")
		{
			this.view = Moobile.View.at('templates/views/calculator-view-android.html');
		}
		this.calculateButton = this.view.getChildComponent('calculate-button');
		this.calculateButton.addEvent('tap', this.bound('onCalculateButtonTap'));

	},
	viewDidLoad: function() {
		logEvent("kalkulator");
		if (device.platform == "iOS") {
			navBar.showLeftButton();
		}
		rest_get("banners", "zone=Kalkulátor oldal", this.bound('bannerDownloaded'));
	},
	viewWillEnter: function() {
		if (device.platform == "Android") {
			$('#eletkor').mobiscroll().select({
				theme: 'android',
				display: 'bottom',
				mode: 'scroller',
				inputClass: 'i-txt',
				width: 200
			});
		}
	},
	destroy: function() {
		this.calculateButton.removeEvent('tap', this.bound('onCalculateButtonTap'));
		this.calculateButton = null;

		this.parent();
	},
	onCalculateButtonTap: function() {
		if ($("#eletkor").val() != "" && $("#eletkor").val() != "Életkor") {
			logDisplay("kalkulál");
			var result = "";
			$(".calculator-result").hide();
			$(".eredmeny").html("<p>A nőgyógyászati rákszűrésnek, mint komplex vizsgálatnak az a lényege, hogy panaszmentes nőknél keressen olyan elváltozásokat, melyek a rákmegelőző állapotra utalva kockázatot jelenthetnek. A sikeres rákszűrésnek alapfeltétele, hogy panaszmentes időszakban kerüljön rá sor, azaz vérezgetés, folyás vagy alhasi fájdalom esetén nem végezhető el. Ugyancsak alapfeltétele a szűrésnek, hogy a menstruációs ciklus középideje körül, azaz a menstruáció utáni 10. - 23. nap valamelyikén kell sort keríteni rá.</p>");
			if (parseInt($("#eletkor").val()) >= 16 && parseInt($("#eletkor").val()) <= 20) {
				$(".calculator-result1").show();
			}
			if (parseInt($("#eletkor").val()) >= 21 && parseInt($("#eletkor").val()) <= 45) {
				$(".calculator-result2").show();
			}
			if (parseInt($("#eletkor").val()) >= 46) {
				$(".calculator-result3").show();
			}
		} else {
			navigator.notification.alert(
					'Kérjük, add meg az életkorodat!', // message
					function() {
						$("#eletkor").trigger('click');					
					}, // callback
					'Hiba', // title
					'OK'                  // buttonName
					);
		}

	},
	bannerDownloaded: function(bannerjson, status) {
		if (status == 200) {
			var banner = JSON.decode(bannerjson, true);
			if (device.platform == "iOS") {
				if (banner.banner_text != "") {
					window.plugins.banner.showBanner(banner.banner_text);
				} else {
					window.plugins.banner.hideBanner();
				}
			}
			if (device.platform == "Android") {
				$(".bottombanner").html(banner.banner_text);
			}
		} else {
			//if no banner found, or some internal server error in response
			if (device.platform == "iOS") {
				window.plugins.banner.hideBanner();

			}
		}
	}


});



ViewController.PreventionNews = new Class({
	Extends: Moobile.ViewController,
	list: null,

	loadView: function() {
		this.view = Moobile.View.at('templates/views/prevention-news-view.html');
		
		this.list = this.view.getChildComponent('list');
		this.list.addEvent('select', this.bound('onListSelect'));
		this.list.addEvent('deselect', this.bound('onListDeselect'));

	},
	viewDidLoad: function() {
		logEvent("betegsegek-lista");
		

		var listArray = eval("aigmegelozes_array;");
		this.loadNewsToList(listArray);
		
	},
	viewWillEnter: function() {
		if (device.platform == "iOS") {
			navBar.showLeftButton();			
		}
		this.list.clearSelectedItem();
		
	},
	destroy: function() {
		this.list.removeEvent('select', this.bound('onListSelect'));
		this.list.removeEvent('deselect', this.bound('onListDeselect'));
		this.list = null;
		this.parent();
	},
	onListSelect: function(item) {
		var news_id = item.getDetail().getText();
		logDisplay('load news id: ' + news_id);
		viewstack.pushViewController(new ViewController.PreventionShowNews({news: aigmegelozes_array[this.list.getSelectedItemIndex()]}), new Moobile.ViewTransition.None);

	},
	onListDeselect: function(item) {

	},
	loadNewsToList: function(listArray) {
		this.list.removeAllItems();
		for (var k = 0; k < listArray.length; k++) {
			var listItem = new Moobile.ListItem([], {styleName: "detailed"});
			listItem.setLabel(listArray[k].title);
			listItem.setImage(storage.getItem("filepath")+"index_"+listArray[k].id+".jpg");
			listItem.setDetail(listArray[k].lead);
			this.list.addItem(listItem);
		}
		listItem = null;

	}

});





ViewController.RisctestResult = new Class({
	Extends: Moobile.ViewController,
	options: {
		userPoints: null
	},
	nextButton: null,
	resultText: null,
	loadView: function() {
		
		this.view = Moobile.View.at('templates/views/risctest-result-view.html');
		logEvent("tesztertekeles");
		this.nextButton = this.view.getChildComponent('next-button');
		this.nextButton.addEvent('tap', this.bound('onNextButtonTap'));
		
		var actual=0;
		for (var k = 0; k <= aigtest_array.test_ertekelesek.length-1; k++) {
			logDisplay(k);
			if (this.options.userPoints>=aigtest_array.test_ertekelesek[k].ponthatar && aigtest_array.test_ertekelesek[k].ponthatar>=actual){
				this.resultText=aigtest_array.test_ertekelesek[k].content;
				actual=aigtest_array.test_ertekelesek[k].ponthatar;
			}
		}	
		logDisplay("--------- test result ---------- ");
		logDisplay("User point: "+this.options.userPoints);
		logDisplay("Limit reached: "+actual);
		logDisplay("Results: "+JSON.encode(aigtest_array.test_ertekelesek));
		logDisplay("--------- test result end ---------- ");
		this.view.getChildComponent('result').setText(this.resultText);
	},
	viewDidLoad: function() {

	},
	viewWillEnter: function() {
		if (device.platform == "iOS") {
			if (navBar) {
				navBar.showLeftButton();
			}
		}
		rest_get("banners", "zone=Rizikófaktorok oldal", this.bound('bannerDownloaded'));
	},
	destroy: function() {
		this.nextButton.removeEvent('tap', this.bound('onNextButtonTap'));
		this.nextButton = null;
		this.parent();
	},
	onNextButtonTap: function() {
		if (device.platform == "Android"){
			var b = 'prevencio';
			window.CustomNativeAccess.setTabBarSelected(b);
		}
		if (device.platform == "iOS"){
				tabBar.selectItem("prevencio");
		}			
		viewstack.pushViewController(new ViewController.Prevention, new Moobile.ViewTransition.Slide);
	},
	bannerDownloaded: function(bannerjson, status) {
		if (status == 200) {
			var banner = JSON.decode(bannerjson, true);
			if (device.platform == "iOS") {
				if (banner.banner_text != "") {
					window.plugins.banner.showBanner(banner.banner_text);
				} else {
					window.plugins.banner.hideBanner();
				}
			}
			if (device.platform == "Android") {
				$(".bottombanner-riscresult").html(banner.banner_text);	
			}
		} else {
			//if no banner found, or some internal server error in response
			if (device.platform == "iOS") {
				window.plugins.banner.hideBanner();

			}
		}
	}


});




ViewController.Diseases = new Class({
	Extends: Moobile.ViewController,
	list: null,
	category_buttons: null,
	menu: null,
	loadView: function() {
		this.view = Moobile.View.at('templates/views/diseases-view.html');
		this.menu = this.view.getChildComponent('menu');
		this.category_buttons = this.menu.getButtons('category-button');
		for (var k = 0; k < this.category_buttons.length; k++) {
			this.category_buttons[k].addEvent('tap', this.bound('onCategoryButtonTap'));
		}
		this.list = this.view.getChildComponent('list');
		this.list.addEvent('select', this.bound('onListSelect'));
		this.list.addEvent('deselect', this.bound('onListDeselect'));

	},
	viewDidLoad: function() {
		logEvent("betegsegek-lista");
		this.menu.setSelectedButtonIndex(0);
		if (device.platform == "iOS") {
			navBar.hideLeftButton();
		}
		rest_get("banners", "zone=Betegségek oldal", this.bound('bannerDownloaded'));
		this.loadNewsToList(aigmellrak_array);
	},
	viewWillEnter: function() {
		this.list.clearSelectedItem();

	},
	destroy: function() {
		this.list.removeEvent('select', this.bound('onListSelect'));
		this.list.removeEvent('deselect', this.bound('onListDeselect'));
		this.menu = null;
		this.list = null;
		this.parent();
	},
	bannerDownloaded: function(bannerjson, status) {
		if (status == 200) {
			var banner = JSON.decode(bannerjson, true);
			if (device.platform == "iOS") {
				if (banner.banner_text != "") {
					window.plugins.banner.showBanner(banner.banner_text);
				} else {
					window.plugins.banner.hideBanner();
				}
			}
			if (device.platform == "Android") {
				$(".bottombanner").html(banner.banner_text);	

			}
		} else {
			//if no banner found, or some internal server error in response
			if (device.platform == "iOS") {
				window.plugins.banner.hideBanner();

			}
		}
	},
	onCategoryButtonTap: function(e) {
		//logDisplay($("#category-button-"+this.menu.getSelectedButtonIndex()).attr("rel"));
		logDisplay($("#category-button-" + this.menu.getSelectedButtonIndex()).attr("rel") + "_array;");
		var listArray = eval($("#category-button-" + this.menu.getSelectedButtonIndex()).attr("rel") + "_array;");
		this.loadNewsToList(listArray);
	},
	onListSelect: function(item) {
		var news_id = item.getDetail().getText();
		logDisplay('load news id: ' + news_id);
		viewstack.pushViewController(new ViewController.News({news: aignews_array[news_id]}), new Moobile.ViewTransition.None);

	},
	onListDeselect: function(item) {

	},
	loadNewsToList: function(listArray) {
		this.list.removeAllItems();
		for (var k = 0; k < listArray.length; k++) {
			var listItem = new Moobile.ListItem([], {styleName: "disclosed"});
			listItem.setLabel(listArray[k].title);
			listItem.setDetail(listArray[k].id);
			this.list.addItem(listItem);
		}
		listItem = null;

	}

});







ViewController.Privacy = new Class({
	Extends: Moobile.ViewController,
	loadView: function() {
		this.view = Moobile.View.at('templates/views/privacy-view.html');
	},
	viewDidLoad: function() {
		logEvent("impresszum");
	},
	viewWillEnter: function() {
		if (device.platform == "iOS"){
			navBar.showLeftButton();
		}
		$(".openurl").click(function() {
			if (device.platform == "iOS") {
				window.open($(this).attr("rel"), '_blank', 'location=yes,EnableViewPortScale=yes');
			}
			if (device.platform == "Android") {
				window.open($(this).attr("rel"), '_blank', 'location=yes');
			}
		});
	},
	destroy: function() {

		this.parent();
	}
});





ViewController.More = new Class({
	Extends: Moobile.ViewController,
	list: null,
	loadView: function() {
		this.view = Moobile.View.at('templates/views/more-view.html');

	},
	viewDidLoad: function() {
		logEvent("tovabbiak");
		this.list = this.view.getChildComponent('list');
		this.list.addEvent('select', this.bound('onListSelect'));
		this.list.addEvent('deselect', this.bound('onListDeselect'));
		logDisplay("Továbbiak lista");
	},
	viewWillEnter: function() {
		if (device.platform == "iOS") {
			navBar.hideLeftButton();
			window.plugins.banner.hideBanner();
		}

		this.list.removeAllItems();
		var item;
		item = new Moobile.ListItem([], {styleName: "header"}, "header");
		item.setLabel("Továbbiak");
		this.list.addItem(item);
		for (k = 1; k <= 6; k++) {
			var slabel = "";
			var simage = "";
			var sitemname = "";
			var sstyle=null;
			switch (k)
			{
				case 1:
					sitemname = "orchidea_biztositas_item";
					slabel = "Orchidea Biztosítás";
					simage = "img/icon-more1.png";
					
					break;
				case 2:
					sitemname = "kerdezek_item";
					slabel = "Kérdezek";
					simage = "img/icon-more2.png";
					
					
					break;
				case 3:
					sitemname = "sugo_item";
					slabel = "Súgó";
					simage = "img/icon-more3.png";
					
					break;
				case 4:
					sitemname = "impresszum_item";
					slabel = "Impresszum";
					simage = "img/icon-more4.png";
					sstyle = "list-section-last";
					break;
				case 5:
					sitemname = "ertekeles_item";
					slabel = "Alkalmazás értékelése";
					simage = "img/icon-more5.png";
					sstyle = "list-section-first";
					break;
				case 6:
					sitemname = "megosztas_item";
					slabel = "Alkalmazás megosztása";
					simage = "img/icon-more6.png";
					
					break;

			}
			/* Lista elem: továbbiak */
			item = new Moobile.ListItem([], {styleName: "disclosed", className: sstyle}, sitemname);
			item.setLabel(slabel);
			item.setImage(simage);
			this.list.addItem(item);
		}


		logDisplay("tovabbiak willenter");
	},
	destroy: function() {
		this.list.removeEvent('select', this.bound('onListSelect'));
		this.list = null;
		this.parent();
	},
	onListDeselect: function(item) {
		if (item.getName()!=="header") {
			item.setImage(item.getImage().getSource().replace("-on.png", ".png"));
		}
	},
	onListSelect: function(item) {
		if (item.getName()!=="header") {
			item.setImage(item.getImage().getSource().replace(".png", "-on.png"));
		}
		switch (item.getName()) {
			case 'orchidea_biztositas_item':
				viewstack.pushViewController(new ViewController.Insurance, new Moobile.ViewTransition.Slide);
				break;
			case 'sugo_item':
				viewstack.pushViewController(new ViewController.Info, new Moobile.ViewTransition.Slide);
				break;
			case 'impresszum_item':
				viewstack.pushViewController(new ViewController.Privacy, new Moobile.ViewTransition.Slide);
				break;
			case 'tovabbi_item':
				logDisplay("tovabbi_item");
				if (device.platform == "iOS") {
					window.open("itms://itunes.apple.com/hu/artist/h2online/id552876376");
				}
				if (device.platform == "Android") {
					window.open("https://play.google.com/store/apps/developer?id=H2Online+Kft.", '_blank', 'location=yes');
				}
				break;
			case 'megosztas_item':
				logDisplay("megosztas_item");
				if (device.platform == "Android")
				{
					window.plugins.share.show({
						subject: 'Vigyázunk Rád!',
						text: "Szeretném megosztani Veled Magyarország első, kifejezetten nőknek ajánlott átfogó daganatellenes prevenciós okostelefon-alkalmazását, mely ingyenesen letölthető!\n\
Innen tudod letölteni: http://vigyazunkrad.webbeteg.hu/mobilalkalmazas"},
					function() {
					}, // Success function
							function() {
								alert('Sikertelen megosztás')
							} // Failure function
					);
				}
				if (device.platform == "iOS") {
					emailShare();
				}
				break;
			case 'ertekeles_item':
				logDisplay("ertekeles_item");
				if (device.platform == "iOS") {
					window.open("itms://itunes.apple.com/us/app/vigyazunk-rad/id677606727?ls=1&mt=8");
				}
				if (device.platform == "Android") {
					window.open("https://play.google.com/store/apps/details?id=hu.amarone.vigyznuk_rad", '_blank', 'location=yes');
				}
				break;
			case 'kerdezek_item':
				logDisplay("kerdezek_item");
				window.open('http://www.webbeteg.hu/orvos_valaszol', '_blank', 'location=yes,EnableViewPortScale=yes');
				break;
				
				

		}
	}

});



ViewController.News = new Class({
	Extends: Moobile.ViewController,
	options: {
		news: null
	},
	loadView: function() {
		logEvent("cikk/"+this.options.news.id);
		this.view = Moobile.View.at('templates/views/news-view.html');
		//this.data_array=JSON.decode(news_content, true);
		logDisplay(JSON.encode(this.options.news));


	},
	viewDidLoad: function() {
		logDisplay("cikk "+this.options.news.id);
		
	},
	viewWillEnter: function() {
		if (device.platform == "iOS") {
			navBar.showLeftButton();
		}
		$("#cikkcim").html(this.options.news.title);
		$("#cikklead").html(this.options.news.lead);
		$("#cikkcontent").html(this.options.news.content);
		$("#cikkimg").html("<img src='"+storage.getItem("filepath")+"/"+this.options.news.id+".jpg' class='cikk_kep' />");
		//alert("<img src='"+storage.getItem("filepath")+"/"+this.options.news.id+".jpg' class='cikk_kep' />");
	},
	destroy: function() {
		this.news = {};
		this.news = null;
		this.parent();
	}

});



ViewController.PreventionShowNews = new Class({
	Extends: Moobile.ViewController,
	options: {
		news: null
	},
	loadView: function() {
		logEvent("cikk");
		this.view = Moobile.View.at('templates/views/prevention-show-news-view.html');
		//this.data_array=JSON.decode(news_content, true);
		logDisplay(JSON.encode(this.options.news));

		
	},
	viewDidLoad: function() {

		//logDisplay("cikk "+this.options.news.id);

	},
	viewWillEnter: function() {
		if (device.platform=="iOS") {
			navBar.showLeftButton();
		}
		$("#prev-title").html(this.options.news.title);
		$("#prev-lead").html(this.options.news.lead);
		$("#prev-content").html(this.options.news.content);	
		if (this.options.news.id == 17)
			{
			$("#prev-content").append('<p><a href="javascript: void(0)" id="showbiztositas">Ha érdekel az Orchidea biztosítás, olvass róla bővebben és kérj még ma ajánlatot!</a></p>');
			}
		$("#cikkimg").html("<img src='"+storage.getItem("filepath")+"/"+this.options.news.id+".jpg' class='cikk_kep' />");
		$("#showbiztositas").click(function() {
			if (device.platform == "Android"){
				actionBarSherlockTabBar.selectItem("tovabbiak");
			}
			if (device.platform == "iOS"){
				tabBar.setSelectedItem("tovabbiak");
			}			
			viewstack.pushViewController(new ViewController.Insurance, new Moobile.ViewTransition.Slide);				
		});
	},
	destroy: function() {
		this.news={};
		this.news=null;
		this.parent();
	}

});





ViewController.OrderRequest = new Class({
	Extends: Moobile.ViewController,
	sendButton: null,
	callButton: null,
	loadView: function() {
		if (device.platform == "iOS") {
			this.view = Moobile.ScrollView.at('templates/views/order-request-view.html');
		}
		if (device.platform == "Android")
		{
			this.view = Moobile.ScrollView.at('templates/views/order-request-view-android.html');
		}

		this.sendButton = this.view.getChildComponent('send-button');
		this.callButton = this.view.getChildComponent('call-button');
		this.sendButton.addEvent('tap', this.bound('onSendButtonTap'));
		this.callButton.addEvent('tap', this.bound('onCallButtonTap'));
	},
	viewDidLoad: function() {
		logEvent("ajanlatkeres");
	},
	viewWillEnter: function() {
		$("#order-request-form").submit(function() {
			return false;
		});
		if (device.platform == "iOS") {
			navBar.showLeftButton();
		}
		if (device.platform == "Android")
		{
			$("#surname, #firstname").keyup(function() {
				var str = $(this).val();
				var val = "";
				val = str.substr(0, 1).toUpperCase() + str.substr(1).toLowerCase();
				$(this).val(val);
			});
		}
	},
	destroy: function() {
		this.sendButton.removeEvent('tap', this.bound('onSendButtonTap'));
		this.callButton.removeEvent('tap', this.bound('onCallButtonTap'));
		this.sendButton = null;
		this.callButton = null;
		this.parent();
	},
	onSendButtonTap: function() {
		//TODO: input validation
		logDisplay("send email request");
		if ($("#surname").val() == "" || $("#surname").val() == $("#surname").attr("rel") || $("#firstname").val() == "" || $("#firstname").val() == $("#firstname").attr("rel") || $("#phone").val() == "" || $("#phone").val() == $("#phone").attr("rel"))
		{
			showMessage("Kérjük, minden mezőt tölts ki!", "Hiba!", "Rendben");
		}
		else
		{
			rest_post("email", $("#order-request-form").serializeFormJSON());
			showMessage("Adataidat továbbítottuk az AIG ügyfélszolgálatának!", "Küldés sikeres", "Rendben");
		}

	},
	onCallButtonTap: function() {
		logDisplay("phone order-request");
		
		if (device.platform == "Android")
		{
			window.plugins.analytics.trackEvent("android", "telefonhivas", "phonecall", 1, function(){}, function(){});
		}
		if (device.platform == "iOS")
		{
			trackEvent("telefonhivas", "phonecall", 1);
		}		
		document.location.href = 'tel: 0640362362';
	}

});




ViewController.Prevention = new Class({
	Extends: Moobile.ViewController,
	list: null,
	loadView: function() {
		this.view = Moobile.View.at('templates/views/prevention-view.html');
		this.list = this.view.getChildComponent('list');
		this.list.addEvent('select', this.bound('onListSelect'));
	},
	viewDidLoad: function() {
		if (device.platform == "iOS") {
			navBar.hideLeftButton();
		}
	},
	viewWillEnter: function() {
		if (device.platform == "iOS") {
			window.plugins.banner.hideBanner();
		}
		this.list.clearSelectedItem();
	},
	destroy: function() {
		this.parent();
	},
	onListSelect: function(item) {
		switch (this.list.getSelectedItemIndex())
				{
				case 0:
						viewstack.pushViewController(new ViewController.Calculator, new Moobile.ViewTransition.None);
						break;
				case 1:
						viewstack.pushViewController(new ViewController.Selfcheck, new Moobile.ViewTransition.None);
						break;
				case 2:
						viewstack.pushViewController(new ViewController.PreventionNews, new Moobile.ViewTransition.None);
						break;
				}
	},
});




ViewController.Riscfactors = new Class({
	Extends: Moobile.ViewController,
	testButton: null,
	loadView: function() {
		this.view = Moobile.View.at('templates/views/riscfactors-view.html');
		this.testButton = this.view.getChildComponent('test-button');
		this.testButton.addEvent('tap', this.bound('onTestButtonTap'));
		
		
	},
	viewDidLoad: function() {
		logEvent("rizikofaktorok-teszt");
		
	},
	viewWillEnter: function() {
		setArrayFromFile("aigtest", true);
		if (device.platform == "iOS") {
			window.plugins.banner.hideBanner();
					navBar.hideLeftButton();
				}
		
	},
	destroy: function() {
		this.testButton.removeEvent('tap', this.bound('onTestButtonTap'));
		this.testButton = null;
		this.parent();
	},
	onTestButtonTap: function() {
		logDisplay("show test");
		
		viewstack.pushViewController(new ViewController.Risctest({question: aigtest_array.test_quest[0], questionIndex: 0, userPoints: 0}), new Moobile.ViewTransition.Slide);
	}

});







ViewController.Insurance = new Class({
	Extends: Moobile.ViewController,
	requestButton: null,
	loadView: function() {
		this.view = Moobile.View.at('templates/views/insurance-view.html');
		this.requestButton = this.view.getChildComponent('request-button');
		this.requestButton.addEvent('tap', this.bound('onRequestButtonTap'));
	},
	viewDidLoad: function() {
		logEvent("SCREEN: insurance");
	},
	viewWillEnter: function() {
		if (device.platform == "iOS"){
			navBar.showLeftButton();
		}
	},
	destroy: function() {
		this.requestButton.removeEvent('tap', this.bound('onRequestButtonTap'));
		this.requestButton = null;
		this.parent();
	},
	onRequestButtonTap: function() {
		logDisplay("goto order-request screen");
		viewstack.pushViewController(new ViewController.OrderRequest, new Moobile.ViewTransition.Slide);
	}
});





ViewController.Selfcheck = new Class({
	Extends: Moobile.ViewController,
	
	loadView: function() {
		this.view = Moobile.View.at('templates/views/selfcheck-view.html');
	},
	viewDidLoad: function() {
		logEvent("selfcheck");
		if (device.platform == "iOS") {
			navBar.showLeftButton();
		}
		rest_get("banners", "zone=Önellenőrzés képernyő", this.bound('bannerDownloaded'));
		
	},
	viewWillEnter: function() {
		
	},	
	bannerDownloaded: function(bannerjson, status) {
		if (status == 200) {
			var banner = JSON.decode(bannerjson, true);
			if (device.platform == "iOS") {
				if (banner.banner_text != "") {
					window.plugins.banner.showBanner(banner.banner_text);
				} else {
					window.plugins.banner.hideBanner();
				}
			}
			if (device.platform == "Android") {
				$(".bottombanner-selfcheck").html(banner.banner_text);	
			}
		} else {
			//if no banner found, or some internal server error in response
			if (device.platform == "iOS") {
				window.plugins.banner.hideBanner();

			}
		}
	},
	destroy: function() {
		
		this.parent();
	}
	

});

