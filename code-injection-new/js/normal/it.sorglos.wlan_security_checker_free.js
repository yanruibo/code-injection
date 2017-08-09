






// JavaScript Document

	function SprachenWeiterleitung() {
		if ((document.forms[0].sprache.options[document.forms[0].sprache.options.selectedIndex].value.length) >= 1) {
			window.location.href = document.forms[0].sprache.options[document.forms[0].sprache.options.selectedIndex].value + ".html";
		}
	}
	
	function AuswertungStarten() {
		var punkte = 0;
		if (document.forms[0].a1.options[document.forms[0].a1.options.selectedIndex].value == "nein"){
			punkte += -1000;
		} else {
			punkte += 1;
		}
		if (document.forms[0].a3.options[document.forms[0].a3.options.selectedIndex].value == "nein"){
			punkte += 0;
		} else {
			punkte += 1;
		}
		if (document.forms[0].a9.options[document.forms[0].a9.options.selectedIndex].value == "nein"){
			punkte += 0;
		} else {
			punkte += 1;
		}
		if (document.forms[0].a14.options[document.forms[0].a14.options.selectedIndex].value == "nein"){
			punkte += 1;
		} else {
			punkte += 0;
		}
		
		
		var ziel;
		if (punkte <= 0 ){
			ziel = "ampel_rot.html";
		} else if (punkte <= 19 ){
			ziel = "ampel_gelb.html";
		} else {
			ziel = "ampel_gruen.html";
		}
		window.location.href = ziel;
	}
	
	function BetriebsystemAuswahl() {
		switch (document.forms[0].betriebsystem.options[document.forms[0].betriebsystem.options.selectedIndex].value) {
		
		case "mac10":
			window.location.href = "mac10.html";
			break;
			
		case "win7":
			window.location.href = "win7.html";	
			break;
		
		case "winXP":
			window.location.href = "winXP.html";	
			break;
			
		default:
			break;
		}
	}
	
	function SSIDGenerator(ZeichenAnzahl){
		var buchstaben = new Array("a","b","c","d","e","f","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z","0","1","2","3","4","5","6","7","8","9");
		var min = 0;
		var max = 37;
		var x = 0;
		var passwort = "";
		
		for (var i = 0; i <= ZeichenAnzahl; i++) {
			x = parseInt((Math.random() * (max - min)) + min);
			passwort += buchstaben[x];
		}
		return passwort;
	}
	
		function PasswortGenerator(ZeichenAnzahl){
		var buchstaben = new Array("a","b","c","d","e","f","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z","A","B","C","D","E","F","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z","0","1","2","3","4","5","6","7","8","9","!","§","%","&","+","*",".",",",";",":","(",")","=","?","#");
		var min = 0;
		var max = 78;
		var x = 0;
		var passwort = "";
		
		for (var i = 0; i <= ZeichenAnzahl; i++) {
			x = parseInt((Math.random() * (max - min)) + min);
			passwort += buchstaben[x];
		}
		return passwort;
	}
	
	function GeneratortStarten(){
		document.forms[0].txtSsid.value = SSIDGenerator(9);	
		document.forms[0].txtWlanPasswort.value = PasswortGenerator(12);
		document.forms[0].txtRouterPasswort.value = PasswortGenerator(12);
	}

	function GeneratorShow(sprache){
		window.location.href = sprache + "_gen.html";
	}





























