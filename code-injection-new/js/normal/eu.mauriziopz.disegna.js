





    // Wait for PhoneGap to load
    //
    //document.addEventListener("deviceready", onDeviceReady, false);
	var countdown;

    
    function startCountdown(){
    	clearInterval(countdown);
    	if(jQuery('#startStop>span>span').html()=="Inizia conto alla rovescia"){
	    	var count = jQuery('#timeSelect option:selected').text();
    	    jQuery("#countdown> p").html(count);
    	    count--;
	    	jQuery('#startStop>span>span').html("Ferma conto alla rovescia");
	    	countdown = setInterval(function(){
	    	    jQuery("#countdown> p").html(count);
	    	    if (count == 0) {
	    	      alert("BOOM!");
	    	      clearInterval(countdown);  
	    	    }
	    	    count--;
	    	  }, 1000);
    	}else{
    		jQuery('#startStop>span>span').html("Inizia conto alla rovescia");
    	}
    }

    






	
    // Wait for PhoneGap to load
    //
    document.addEventListener("deviceready", onDeviceReady, false);

    // Populate the database 
    //
    function populateDB(tx) {
        tx.executeSql('DROP TABLE IF EXISTS CARD');
        tx.executeSql('CREATE TABLE IF NOT EXISTS CARD (id unique, object, ppa,action,difficult,mix)');
        tx.executeSql('INSERT INTO CARD (object,ppa,action,difficult,mix) VALUES ("Ponte levatoio","Europa","Rompere","Maschera da scherma","Banda")');
        tx.executeSql('INSERT INTO CARD (object,ppa,action,difficult,mix) VALUES ("Bustina di te\'","Pesciolino Rosso","Misurare","Il sole bacia i capelli","Campo da football")');
        tx.executeSql('INSERT INTO CARD (object,ppa,action,difficult,mix) VALUES ("Baguette","Sposo","Sbucciare","Fumare la pipa","Serra")');
        tx.executeSql('INSERT INTO CARD (object,ppa,action,difficult,mix) VALUES ("Luci natalizie","Fenicottero","Palleggiare","Partita di calcio","Nazione")');
        tx.executeSql('INSERT INTO CARD (object,ppa,action,difficult,mix) VALUES ("Megafono","Monte everest","Spaventare","Tirarsi su le maniche","Orto")');
        tx.executeSql('INSERT INTO CARD (object,ppa,action,difficult,mix) VALUES ("Grilletto","Cavaliere","Ripetere","Acqua","Fianco")');
        tx.executeSql('INSERT INTO CARD (object,ppa,action,difficult,mix) VALUES ("Scala a pioli","Negoziante","Colorare","Partire in quarta","Sfinge")');
        tx.executeSql('INSERT INTO CARD (object,ppa,action,difficult,mix) VALUES ("Molo","Villaggio","Fluttuare","Fuoristrada","Classe")');
        tx.executeSql('INSERT INTO CARD (object,ppa,action,difficult,mix) VALUES ("Ponte","Delfino","Irrigare","Bus a due piani","Principe")');
        tx.executeSql('INSERT INTO CARD (object,ppa,action,difficult,mix) VALUES ("Forbicine","Chiesa","Scavare","Perle ai porci","Dollaro")');
        tx.executeSql('INSERT INTO CARD (object,ppa,action,difficult,mix) VALUES ("Ago","Cyrano","Spennare","Piedi in testa","Festa")');
        tx.executeSql('INSERT INTO CARD (object,ppa,action,difficult,mix) VALUES ("Proiettore","Cappuccetto rosso","Unire","Mettere le mani avanti","Gara")');
        tx.executeSql('INSERT INTO CARD (object,ppa,action,difficult,mix) VALUES ("Piscina gonfiabile","Suora","Accorciare","Pollice verde","Fendinebbia")');
        tx.executeSql('INSERT INTO CARD (object,ppa,action,difficult,mix) VALUES ("Lattice","Agnello","Invertire","Abito da sera","Indirizzo")');
        tx.executeSql('INSERT INTO CARD (object,ppa,action,difficult,mix) VALUES ("Stop","Biancaneve","Truccarsi","Promessa da marinaio","Corona")');
        tx.executeSql('INSERT INTO CARD (object,ppa,action,difficult,mix) VALUES ("Salvadanaio","Lady D","Evidenziare","Pozzo di scienza","Cintura")');
        tx.executeSql('INSERT INTO CARD (object,ppa,action,difficult,mix) VALUES ("Vulcano","Parroco","Votare","Orecchie da mercante","Anello")');
        tx.executeSql('INSERT INTO CARD (object,ppa,action,difficult,mix) VALUES ("Palla da beach volley","Foresta nera","Chiamare","Pelle d\'oca","Alluce")');
        tx.executeSql('INSERT INTO CARD (object,ppa,action,difficult,mix) VALUES ("Grondaia","Agente immobiliare","Colpire","Quattro gatti","Sconfitta")');
        tx.executeSql('INSERT INTO CARD (object,ppa,action,difficult,mix) VALUES ("Croissant","Capitan uncino","Eruttare","Contare le pecore","Guanto")');
        tx.executeSql('INSERT INTO CARD (object,ppa,action,difficult,mix) VALUES ("Dentifricio","Cenerentola","Raggiungere","Ragazza della porta accanto","Terremoto")');
        tx.executeSql('INSERT INTO CARD (object,ppa,action,difficult,mix) VALUES ("Disco volante","Portiere","Spingere","Romanzo giallo","Stivale")');
        tx.executeSql('INSERT INTO CARD (object,ppa,action,difficult,mix) VALUES ("Ombrello","Saturno","Incollare","Aria condizionata","Pioggia")');
        tx.executeSql('INSERT INTO CARD (object,ppa,action,difficult,mix) VALUES ("Sentiero","Poliziotto","Scivolare","Rompere il ghiaccio","Ananas")');
        tx.executeSql('INSERT INTO CARD (object,ppa,action,difficult,mix) VALUES ("Tetto","Foca","pungere","Rotto della cuffia","Luna")');
        /*tx.executeSql('INSERT INTO CARD (object,ppa,action,difficult,mix) VALUES ("Tatuaggio","Sydney","Viaggiare","Rovescio della medaglia","Polmone")');
        tx.executeSql('INSERT INTO CARD (object,ppa,action,difficult,mix) VALUES ("Giacca a vento","Scimmia","Bilanciare","Sangue blu","Albero")');
        tx.executeSql('INSERT INTO CARD (object,ppa,action,difficult,mix) VALUES ("Cerniera","Gorilla","Sbadigliare","Strisce pedonali","Limone")');
        tx.executeSql('INSERT INTO CARD (object,ppa,action,difficult,mix) VALUES ("Sdraio","Asino","Abbronzarsi","Pecora nera","Polvere")');
        tx.executeSql('INSERT INTO CARD (object,ppa,action,difficult,mix) VALUES ("Orologio","Vongola","Dirigere","Negozio dell\'usato","E.T.")');
        tx.executeSql('INSERT INTO CARD (object,ppa,action,difficult,mix) VALUES ("Pistola","Zingaro","Bollire","Piangere come una fontana","Pugno")');
        tx.executeSql('INSERT INTO CARD (object,ppa,action,difficult,mix) VALUES ("Piuma","Pesce Volante","Giudicare","Pallone gonfiato","Tuorlo")');
        tx.executeSql('INSERT INTO CARD (object,ppa,action,difficult,mix) VALUES ("Scarponi da sci","Infermiera","Urlare","Scena muta","Narice")');
        tx.executeSql('INSERT INTO CARD (object,ppa,action,difficult,mix) VALUES ("Tagliaerba","Capo nord","Piangere","Scaldare la sedia","Internet")');
        tx.executeSql('INSERT INTO CARD (object,ppa,action,difficult,mix) VALUES ("Stufa","Soldato","Sudare","Ridere sotto i baffi","Maremoto")');
        tx.executeSql('INSERT INTO CARD (object,ppa,action,difficult,mix) VALUES ("Cuscino","Coniglio","Inchiodare","Pasto completo","Tarantella")');
        tx.executeSql('INSERT INTO CARD (object,ppa,action,difficult,mix) VALUES ("Portaombrelli","Astronauta","Fare il bagno","Puzza di bruciato","Video")');
        tx.executeSql('INSERT INTO CARD (object,ppa,action,difficult,mix) VALUES ("Annaffiatoio","Africa","Camminare","Salice piangente","Insonnia")');
        tx.executeSql('INSERT INTO CARD (object,ppa,action,difficult,mix) VALUES ("Anello di diamanti","Dracula","Aggrottare le ciglia","Una goccia nel mare","Spaventapasseri")');
        tx.executeSql('INSERT INTO CARD (object,ppa,action,difficult,mix) VALUES ("Nuvola","Miniera di carbone","Scaricare","Sorriso a 32 denti","Cactus")');
        tx.executeSql('INSERT INTO CARD (object,ppa,action,difficult,mix) VALUES ("Calcolatrice","Pesce martello","Indicare","Sogni d\'oro","Graffiti")');
        tx.executeSql('INSERT INTO CARD (object,ppa,action,difficult,mix) VALUES ("Papillon","Cinema","Baciare","Rompere le uova nel paniere","Treccia")');
        tx.executeSql('INSERT INTO CARD (object,ppa,action,difficult,mix) VALUES ("Motore","Struzzo","Mostrare","Prima visione","Gomitata")');
        tx.executeSql('INSERT INTO CARD (object,ppa,action,difficult,mix) VALUES ("Grattugia","Principe","Ruggire","Lotteria nazionale","Fiocco")');
        tx.executeSql('INSERT INTO CARD (object,ppa,action,difficult,mix) VALUES ("Cappello di paglia","Spagna","Mordere","Sordo come una campana","Collo")');
        tx.executeSql('INSERT INTO CARD (object,ppa,action,difficult,mix) VALUES ("Torta salata","Foresta amazzonica","Stendere","Guerre stellari","Punta")');
        tx.executeSql('INSERT INTO CARD (object,ppa,action,difficult,mix) VALUES ("Fioriera","Cameriere","Pesare","Spalle al muro","Bugia")');
        tx.executeSql('INSERT INTO CARD (object,ppa,action,difficult,mix) VALUES ("Chiavi dell\'auto","Capitano","Raffreddare","Spina nel fianco","Unghia")');
        tx.executeSql('INSERT INTO CARD (object,ppa,action,difficult,mix) VALUES ("Trampolino","Ruota panoramica","Slegare","Patata bollente","Drago")');
        tx.executeSql('INSERT INTO CARD (object,ppa,action,difficult,mix) VALUES ("Ambulanza","Parco divertimenti","Cuocere","Abbandonare la nave","Caviglia")');*/
        //tx.executeSql('INSERT INTO CARD (object,ppa,action,difficult,mix) VALUES ("","","","","")');
        
    }

    // Query the database
    //
    function queryDB(tx) {
        tx.executeSql('SELECT * FROM CARD', [], querySuccess, errorCB);
    }

    // Query the success callback
    //
    function querySuccess(tx, results) {
        var len = results.rows.length;
        var i = Math.floor(Math.random()*len);
        var word = Math.floor(Math.random()*5);
        
    	jQuery('#p-object').hide();
    	jQuery('#p-ppa').hide();
    	jQuery('#p-action').hide();
    	jQuery('#p-difficult').hide();
    	jQuery('#p-mix').hide();
        switch(word)
        {
        case 0:
        	jQuery('#p-object').show();
        	jQuery('#p-object > span > span').html(results.rows.item(i).object);
          	break;
        case 1:
        	jQuery('#p-ppa').show();
        	jQuery('#p-ppa > span > span').html(results.rows.item(i).ppa);
          	break;
        case 2:
        	jQuery('#p-action').show();
        	jQuery('#p-action > span > span').html(results.rows.item(i).action);
          	break;
        case 3:
        	jQuery('#p-difficult').show();
        	jQuery('#p-difficult > span > span').html(results.rows.item(i).difficult);
          	break;
        case 4:
        	jQuery('#p-mix').show();
        	jQuery('#p-mix > span > span').html(results.rows.item(i).mix);
          	break;
        default:
          	console.log("Non dovrebbe succedere");
        }
        
        
    }

    // Transaction error callback
    //
    function errorCB(err) {
        console.log("Error processing SQL: "+err.code);
    }

    // Transaction success callback
    //
    function successCB() {
        var db = window.openDatabase("Database", "1.0", "PhoneGap Demo", 200000);
        db.transaction(queryDB, errorCB);
        soma();
    }

    // PhoneGap is ready
    //
    function onDeviceReady() {
    	
    	var db = window.openDatabase("Database", "1.0", "PhoneGap Demo", 200000);
        db.transaction(populateDB, errorCB);
    }
    
    jQuery(function() {
    	/*debugger;
    	var i = document.createElement("script");
    	i.src = "http://adfonic.net/js/d68cf3ca-cee9-4831-8d75-60d33e4f9eba?s.test=1";
		alert(jQuery(i).html());
//		jQuery('#ad').html(i);
		alert(jQuery('#ad').html());*/
    });
	var countdown;
    function startCountdown(){
    	clearInterval(countdown);
    	if(jQuery('#startStop>span>span').html()=="Inizia conto alla rovescia"){
	    	var count = jQuery('#timeSelect option:selected').text();
    	    jQuery("#countdown> p").html(count);
    	    count--;
	    	jQuery('#startStop>span>span').html("Ferma conto alla rovescia");
	    	countdown = setInterval(function(){
	    	    jQuery("#countdown> p").html(count);
	    	    if (count == 0) {
	    	      clearInterval(countdown);
	    	      navigator.notification.beep(1);
	    	      navigator.notification.vibrate(500);

	    	    }
	    	    count--;
	    	  }, 1000);
    	}else{
    		jQuery('#startStop>span>span').html("Inizia conto alla rovescia");
    	}
    }
    function show(what){
    	jQuery('#wordBody').hide();
    	jQuery('#wordFooter').hide();
    	jQuery('#timerBody').hide();
    	jQuery('#timerFooter').hide();
    	jQuery('#scoreBody').hide();
    	jQuery('#scoreFooter').hide();

    	jQuery('#'+what+'Body').show();
    	jQuery('#'+what+'Footer').show();
    }
    
    function addPoint(what){
    	jQuery('#scores div:nth-child('+what+')').html(jQuery('#scores div:nth-child('+what+')').html()-0+1);	
    }
    function restartGame(){
    	jQuery('#scores div').html(0);
    }
    function soma(){
    	try{
    		jQuery('.smaatoad').attr("id","smaatoad");
    		jQuery('#smaatoad').html("");
	    	var request = new SomaRequest();
	    	request.adSpaceID = 65755393;
	    	request.publisherID = 923856753;
	    	SomaTag.requestAd(request);
    	}catch(err){
    		console.log("Error loading ad: "+err);
    	}
    }
    	
    





	
    // Wait for PhoneGap to load
    //
    document.addEventListener("deviceready", onDeviceReady, false);

    // Populate the database 
    //
    function populateDB(tx) {
        tx.executeSql('DROP TABLE IF EXISTS CARD');
        tx.executeSql('CREATE TABLE IF NOT EXISTS CARD (id unique, object, ppa,action,difficult,mix)');
        tx.executeSql('INSERT INTO CARD (object,ppa,action,difficult,mix) VALUES ("Ponte levatoio","Europa","Rompere","Maschera da scherma","Banda")');
        tx.executeSql('INSERT INTO CARD (object,ppa,action,difficult,mix) VALUES ("Bustina di tÃ¨","Pesciolino Rosso","Misurare","Il sole bacia i capelli","Campo da football")');
        tx.executeSql('INSERT INTO CARD (object,ppa,action,difficult,mix) VALUES ("Baguette","Sposo","Sbucciare","Fumare la pipa","Serra")');
        tx.executeSql('INSERT INTO CARD (object,ppa,action,difficult,mix) VALUES ("Luci natalizie","Fenicottero","Palleggiare","Partita di calcio","Nazione")');
        tx.executeSql('INSERT INTO CARD (object,ppa,action,difficult,mix) VALUES ("Megafono","Monte everest","Spaventare","Tirarsi su le maniche","Orto")');
        tx.executeSql('INSERT INTO CARD (object,ppa,action,difficult,mix) VALUES ("Grilletto","Cavaliere","Ripetere","Acqua","Fianco")');
        tx.executeSql('INSERT INTO CARD (object,ppa,action,difficult,mix) VALUES ("Scala a pioli","Negoziante","Colorare","Partire in quarta","Sfinge")');
        tx.executeSql('INSERT INTO CARD (object,ppa,action,difficult,mix) VALUES ("Molo","Villaggio","Fluttuare","Fuoristrada","Classe")');
        tx.executeSql('INSERT INTO CARD (object,ppa,action,difficult,mix) VALUES ("Ponte","Delfino","Irrigare","Bus a due piani","Principe")');
        tx.executeSql('INSERT INTO CARD (object,ppa,action,difficult,mix) VALUES ("Forbicine","Chiesa","Scavare","Perle ai porci","Dollaro")');
        tx.executeSql('INSERT INTO CARD (object,ppa,action,difficult,mix) VALUES ("Ago","Cyrano","Spennare","Piedi in testa","Festa")');
        tx.executeSql('INSERT INTO CARD (object,ppa,action,difficult,mix) VALUES ("Proiettore","Cappuccetto rosso","Unire","Mettere le mani avanti","Gara")');
        tx.executeSql('INSERT INTO CARD (object,ppa,action,difficult,mix) VALUES ("Piscina gonfiabile","Suora","Accorciare","Pollice verde","Fendinebbia")');
        tx.executeSql('INSERT INTO CARD (object,ppa,action,difficult,mix) VALUES ("Lattice","Agnello","Invertire","Abito da sera","Indirizzo")');
        tx.executeSql('INSERT INTO CARD (object,ppa,action,difficult,mix) VALUES ("Stop","Biancaneve","Truccarsi","Promessa da marinaio","Corona")');
        tx.executeSql('INSERT INTO CARD (object,ppa,action,difficult,mix) VALUES ("Salvadanaio","Lady D","Evidenziare","Pozzo di scienza","Cintura")');
        tx.executeSql('INSERT INTO CARD (object,ppa,action,difficult,mix) VALUES ("Vulcano","Parroco","Votare","Orecchie da mercante","Anello")');
        tx.executeSql('INSERT INTO CARD (object,ppa,action,difficult,mix) VALUES ("Palla da beach volley","Foresta nera","Chiamare","Pelle d\'oca","Alluce")');
        tx.executeSql('INSERT INTO CARD (object,ppa,action,difficult,mix) VALUES ("Grondaia","Agente immobiliare","Colpire","Quattro gatti","Sconfitta")');
        tx.executeSql('INSERT INTO CARD (object,ppa,action,difficult,mix) VALUES ("Croissant","Capitan uncino","Eruttare","Contare le pecore","Guanto")');
        tx.executeSql('INSERT INTO CARD (object,ppa,action,difficult,mix) VALUES ("Dentifricio","Cenerentola","Raggiungere","Ragazza della porta accanto","Terremoto")');
        tx.executeSql('INSERT INTO CARD (object,ppa,action,difficult,mix) VALUES ("Disco volante","Portiere","Spingere","Romanzo giallo","Stivale")');
        tx.executeSql('INSERT INTO CARD (object,ppa,action,difficult,mix) VALUES ("Ombrello","Saturno","Incollare","Aria condizionata","Pioggia")');
        tx.executeSql('INSERT INTO CARD (object,ppa,action,difficult,mix) VALUES ("Sentiero","Poliziotto","Scivolare","Rompere il ghiaccio","Ananas")');
        tx.executeSql('INSERT INTO CARD (object,ppa,action,difficult,mix) VALUES ("Tetto","Foca","pungere","Rotto della cuffia","Luna")');
        /*tx.executeSql('INSERT INTO CARD (object,ppa,action,difficult,mix) VALUES ("Tatuaggio","Sydney","Viaggiare","Rovescio della medaglia","Polmone")');
        tx.executeSql('INSERT INTO CARD (object,ppa,action,difficult,mix) VALUES ("Giacca a vento","Scimmia","Bilanciare","Sangue blu","Albero")');
        tx.executeSql('INSERT INTO CARD (object,ppa,action,difficult,mix) VALUES ("Cerniera","Gorilla","Sbadigliare","Strisce pedonali","Limone")');
        tx.executeSql('INSERT INTO CARD (object,ppa,action,difficult,mix) VALUES ("Sdraio","Asino","Abbronzarsi","Pecora nera","Polvere")');
        tx.executeSql('INSERT INTO CARD (object,ppa,action,difficult,mix) VALUES ("Orologio","Vongola","Dirigere","Negozio dell\'usato","E.T.")');
        tx.executeSql('INSERT INTO CARD (object,ppa,action,difficult,mix) VALUES ("Pistola","Zingaro","Bollire","Piangere come una fontana","Pugno")');
        tx.executeSql('INSERT INTO CARD (object,ppa,action,difficult,mix) VALUES ("Piuma","Pesce Volante","Giudicare","Pallone gonfiato","Tuorlo")');
        tx.executeSql('INSERT INTO CARD (object,ppa,action,difficult,mix) VALUES ("Scarponi da sci","Infermiera","Urlare","Scena muta","Narice")');
        tx.executeSql('INSERT INTO CARD (object,ppa,action,difficult,mix) VALUES ("Tagliaerba","Capo nord","Piangere","Scaldare la sedia","Internet")');
        tx.executeSql('INSERT INTO CARD (object,ppa,action,difficult,mix) VALUES ("Stufa","Soldato","Sudare","Ridere sotto i baffi","Maremoto")');
        tx.executeSql('INSERT INTO CARD (object,ppa,action,difficult,mix) VALUES ("Cuscino","Coniglio","Inchiodare","Pasto completo","Tarantella")');
        tx.executeSql('INSERT INTO CARD (object,ppa,action,difficult,mix) VALUES ("Portaombrelli","Astronauta","Fare il bagno","Puzza di bruciato","Video")');
        tx.executeSql('INSERT INTO CARD (object,ppa,action,difficult,mix) VALUES ("Annaffiatoio","Africa","Camminare","Salice piangente","Insonnia")');
        tx.executeSql('INSERT INTO CARD (object,ppa,action,difficult,mix) VALUES ("Anello di diamanti","Dracula","Aggrottare le ciglia","Una goccia nel mare","Spaventapasseri")');
        tx.executeSql('INSERT INTO CARD (object,ppa,action,difficult,mix) VALUES ("Nuvola","Miniera di carbone","Scaricare","Sorriso a 32 denti","Cactus")');
        tx.executeSql('INSERT INTO CARD (object,ppa,action,difficult,mix) VALUES ("Calcolatrice","Pesce martello","Indicare","Sogni d\'oro","Graffiti")');
        tx.executeSql('INSERT INTO CARD (object,ppa,action,difficult,mix) VALUES ("Papillon","Cinema","Baciare","Rompere le uova nel paniere","Treccia")');
        tx.executeSql('INSERT INTO CARD (object,ppa,action,difficult,mix) VALUES ("Motore","Struzzo","Mostrare","Prima visione","Gomitata")');
        tx.executeSql('INSERT INTO CARD (object,ppa,action,difficult,mix) VALUES ("Grattugia","Principe","Ruggire","Lotteria nazionale","Fiocco")');
        tx.executeSql('INSERT INTO CARD (object,ppa,action,difficult,mix) VALUES ("Cappello di paglia","Spagna","Mordere","Sordo come una campana","Collo")');
        tx.executeSql('INSERT INTO CARD (object,ppa,action,difficult,mix) VALUES ("Torta salata","Foresta amazzonica","Stendere","Guerre stellari","Punta")');
        tx.executeSql('INSERT INTO CARD (object,ppa,action,difficult,mix) VALUES ("Fioriera","Cameriere","Pesare","Spalle al muro","Bugia")');
        tx.executeSql('INSERT INTO CARD (object,ppa,action,difficult,mix) VALUES ("Chiavi dell\'auto","Capitano","Raffreddare","Spina nel fianco","Unghia")');
        tx.executeSql('INSERT INTO CARD (object,ppa,action,difficult,mix) VALUES ("Trampolino","Ruota panoramica","Slegare","Patata bollente","Drago")');
        tx.executeSql('INSERT INTO CARD (object,ppa,action,difficult,mix) VALUES ("Ambulanza","Parco divertimenti","Cuocere","Abbandonare la nave","Caviglia")');*/
        //tx.executeSql('INSERT INTO CARD (object,ppa,action,difficult,mix) VALUES ("","","","","")');
        
    }

    // Query the database
    //
    function queryDB(tx) {
        tx.executeSql('SELECT * FROM CARD', [], querySuccess, errorCB);
    }

    // Query the success callback
    //
    function querySuccess(tx, results) {
        var len = results.rows.length;
        var i = Math.floor(Math.random()*len);
        var word = Math.floor(Math.random()*5);
        
    	jQuery('#p-object').hide();
    	jQuery('#p-ppa').hide();
    	jQuery('#p-action').hide();
    	jQuery('#p-difficult').hide();
    	jQuery('#p-mix').hide();
        switch(word)
        {
        case 0:
        	jQuery('#p-object').show();
        	jQuery('#p-object > span > span').html(results.rows.item(i).object);
          	break;
        case 1:
        	jQuery('#p-ppa').show();
        	jQuery('#p-ppa > span > span').html(results.rows.item(i).ppa);
          	break;
        case 2:
        	jQuery('#p-action').show();
        	jQuery('#p-action > span > span').html(results.rows.item(i).action);
          	break;
        case 3:
        	jQuery('#p-difficult').show();
        	jQuery('#p-difficult > span > span').html(results.rows.item(i).difficult);
          	break;
        case 4:
        	jQuery('#p-mix').show();
        	jQuery('#p-mix > span > span').html(results.rows.item(i).mix);
          	break;
        default:
          	console.log("Non dovrebbe succedere");
        }
        
        
    }

    // Transaction error callback
    //
    function errorCB(err) {
        console.log("Error processing SQL: "+err.code);
    }

    // Transaction success callback
    //
    function successCB() {
        var db = window.openDatabase("Database", "1.0", "PhoneGap Demo", 200000);
        db.transaction(queryDB, errorCB);
    }

    // PhoneGap is ready
    //
    function onDeviceReady() {
        var db = window.openDatabase("Database", "1.0", "PhoneGap Demo", 200000);
        db.transaction(populateDB, errorCB);
    }
    
	var countdown;
    function startCountdown(){
    	clearInterval(countdown);
    	if(jQuery('#startStop>span>span').html()=="Inizia conto alla rovescia"){
	    	var count = jQuery('#timeSelect option:selected').text();
    	    jQuery("#countdown> p").html(count);
    	    count--;
	    	jQuery('#startStop>span>span').html("Ferma conto alla rovescia");
	    	countdown = setInterval(function(){
	    	    jQuery("#countdown> p").html(count);
	    	    if (count == 0) {
	    	      clearInterval(countdown);
	    	      navigator.notification.beep(1);
	    	      navigator.notification.vibrate(500);

	    	    }
	    	    count--;
	    	  }, 1000);
    	}else{
    		jQuery('#startStop>span>span').html("Inizia conto alla rovescia");
    	}
    }
    function show(what){
    	jQuery('#wordBody').hide();
    	jQuery('#wordFooter').hide();
    	jQuery('#timerBody').hide();
    	jQuery('#timerFooter').hide();
    	jQuery('#scoreBody').hide();
    	jQuery('#scoreFooter').hide();

    	jQuery('#'+what+'Body').show();
    	jQuery('#'+what+'Footer').show();
    }
    
    function addPoint(what){
    	jQuery('#scores div:nth-child('+what+')').html(jQuery('#scores div:nth-child('+what+')').html()-0+1);	
    }
    function restartGame(){
    	jQuery('#scores div').html(0);
    }
    

	var admob_vars = {
	 pubid: 'a14f099dcfd6ab6', // publisher id
	 bgcolor: '804296', // background color (hex)
	 text: 'FFFFFF', // font-color (hex)
	 test: true // test mode, set to false to receive live ads
	};
	








    // Wait for PhoneGap to load
    //
    document.addEventListener("deviceready", onDeviceReady, false);

    // Populate the database 
    //
    function populateDB(tx) {
        tx.executeSql('DROP TABLE IF EXISTS CARD');
        tx.executeSql('CREATE TABLE IF NOT EXISTS CARD (id unique, object, ppa,action,difficult,mix)');
        tx.executeSql('INSERT INTO CARD (object,ppa,action,difficult,mix) VALUES ("Ponte levatoio","Europa","Rompere","Maschera da scherma","Banda")');
        tx.executeSql('INSERT INTO CARD (object,ppa,action,difficult,mix) VALUES ("Bustina di tÃ¨","Pesciolino Rosso","Misurare","Il sole bacia i capelli","Campo da football")');
        tx.executeSql('INSERT INTO CARD (object,ppa,action,difficult,mix) VALUES ("Baguette","Sposo","Sbucciare","Fumare la pipa","Serra")');
        tx.executeSql('INSERT INTO CARD (object,ppa,action,difficult,mix) VALUES ("Luci natalizie","Fenicottero","Palleggiare","Partita di calcio","Nazione")');
        tx.executeSql('INSERT INTO CARD (object,ppa,action,difficult,mix) VALUES ("Megafono","Monte everest","Spaventare","Tirarsi su le maniche","Orto")');
        tx.executeSql('INSERT INTO CARD (object,ppa,action,difficult,mix) VALUES ("Grilletto","Cavaliere","Ripetere","Acqua","Fianco")');
        tx.executeSql('INSERT INTO CARD (object,ppa,action,difficult,mix) VALUES ("Scala a pioli","Negoziante","Colorare","Partire in quarta","Sfinge")');
        tx.executeSql('INSERT INTO CARD (object,ppa,action,difficult,mix) VALUES ("Molo","Villaggio","Fluttuare","Fuoristrada","Classe")');
        tx.executeSql('INSERT INTO CARD (object,ppa,action,difficult,mix) VALUES ("Ponte","Delfino","Irrigare","Bus a due piani","Principe")');
        tx.executeSql('INSERT INTO CARD (object,ppa,action,difficult,mix) VALUES ("Forbicine","Chiesa","Scavare","Perle ai porci","Dollaro")');
        tx.executeSql('INSERT INTO CARD (object,ppa,action,difficult,mix) VALUES ("Ago","Cyrano","Spennare","Piedi in testa","Festa")');
        tx.executeSql('INSERT INTO CARD (object,ppa,action,difficult,mix) VALUES ("Proiettore","Cappuccetto rosso","Unire","Mettere le mani avanti","Gara")');
        //tx.executeSql('INSERT INTO CARD (object,ppa,action,difficult,mix) VALUES ("","","","","")');
        
    }

    // Query the database
    //
    function queryDB(tx) {
        tx.executeSql('SELECT * FROM CARD', [], querySuccess, errorCB);
    }

    // Query the success callback
    //
    function querySuccess(tx, results) {
        var len = results.rows.length;
        var i = Math.floor(Math.random()*len);
        console.log("Row="+i);
        var word = Math.floor(Math.random()*5);
        console.log("Word="+word);
        
    	jQuery('#p-object').hide();
    	jQuery('#p-ppa').hide();
    	jQuery('#p-action').hide();
    	jQuery('#p-difficult').hide();
    	jQuery('#p-mix').hide();
        switch(word)
        {
        case 0:
        	jQuery('#p-object').show();
        	jQuery('#p-object > span > span').html(results.rows.item(i).object);
          	break;
        case 1:
        	jQuery('#p-ppa').show();
        	jQuery('#p-ppa > span > span').html(results.rows.item(i).ppa);
          	break;
        case 2:
        	jQuery('#p-action').show();
        	jQuery('#p-action > span > span').html(results.rows.item(i).action);
          	break;
        case 3:
        	jQuery('#p-difficult').show();
        	jQuery('#p-difficult > span > span').html(results.rows.item(i).difficult);
          	break;
        case 4:
        	jQuery('#p-mix').show();
        	jQuery('#p-mix > span > span').html(results.rows.item(i).mix);
          	break;
        default:
          	console.log("Non dovrebbe succedere");
        }
        
        
    }

    // Transaction error callback
    //
    function errorCB(err) {
        console.log("Error processing SQL: "+err.code);
    }

    // Transaction success callback
    //
    function successCB() {
        var db = window.openDatabase("Database", "1.0", "PhoneGap Demo", 200000);
        db.transaction(queryDB, errorCB);
    }

    // PhoneGap is ready
    //
    function onDeviceReady() {
        var db = window.openDatabase("Database", "1.0", "PhoneGap Demo", 200000);
        db.transaction(populateDB, errorCB);
    }

    
